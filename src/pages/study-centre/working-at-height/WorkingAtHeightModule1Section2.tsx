import { ArrowLeft, Scale, CheckCircle, AlertTriangle, Shield, FileText, BookOpen, Gavel } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wah-hierarchy-principle",
    question: "What is the correct order of the hierarchy of control required by the Work at Height Regulations 2005?",
    options: [
      "Mitigate, prevent, avoid",
      "Prevent, avoid, mitigate",
      "Avoid, prevent, mitigate",
      "Avoid, mitigate, prevent"
    ],
    correctIndex: 2,
    explanation: "The correct hierarchy is Avoid > Prevent > Mitigate. First, avoid working at height wherever reasonably practicable. If it cannot be avoided, prevent falls using collective protection measures. If falls cannot be entirely prevented, mitigate the distance and consequences of any fall."
  },
  {
    id: "wah-hasawa-duty",
    question: "Under the Health and Safety at Work Act 1974, what is the general duty of an employer?",
    options: [
      "To eliminate all workplace risks completely",
      "To ensure, so far as is reasonably practicable, the health, safety, and welfare of employees",
      "To provide personal protective equipment for every task",
      "To carry out risk assessments every week"
    ],
    correctIndex: 1,
    explanation: "Section 2(1) of the Health and Safety at Work Act 1974 places a general duty on every employer to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. This is the overarching duty from which all other health and safety obligations flow."
  },
  {
    id: "wah-cdm-duty",
    question: "Under CDM 2015, which duty holder must ensure that designs avoid foreseeable risks where possible, including risks from working at height?",
    options: [
      "The client",
      "The principal contractor",
      "The principal designer",
      "The designer"
    ],
    correctIndex: 3,
    explanation: "Under CDM 2015, designers have a specific duty to avoid foreseeable risks in their designs, including risks from working at height. This means designing out the need for work at height wherever possible — for example, specifying pre-wired modular lighting systems that can be assembled at ground level."
  }
];

const faqs = [
  {
    question: "What is the difference between the Work at Height Regulations 2005 and the Health and Safety at Work Act 1974?",
    answer: "The Health and Safety at Work Act 1974 is primary legislation — it sets out the overarching legal framework for all workplace health and safety in Great Britain. It establishes general duties on employers, employees, and the self-employed. The Work at Height Regulations 2005 are secondary legislation (regulations) made under the Act — they provide specific, detailed requirements for the particular hazard of working at height. The WAH Regulations sit within the framework established by the Act, and breaching either can result in prosecution."
  },
  {
    question: "Do the Work at Height Regulations apply to self-employed workers?",
    answer: "Yes. The Work at Height Regulations 2005 apply to all work at height where there is a risk of a fall liable to cause personal injury. This includes self-employed workers. A self-employed electrician working on their own must comply with the regulations just as an employed electrician must. The duties to plan, assess, avoid where possible, and use appropriate equipment apply equally to the self-employed."
  },
  {
    question: "What are Approved Codes of Practice (ACOPs) and are they legally binding?",
    answer: "Approved Codes of Practice are documents approved by the Health and Safety Executive under Section 16 of the Health and Safety at Work Act 1974. They give practical guidance on how to comply with the law. ACOPs are not directly legally binding in the same way as regulations, but they have a special legal status: if you are prosecuted for a breach of health and safety law and it is shown that you did not follow the relevant ACOP, a court will find you at fault unless you can demonstrate that you complied with the law in some other equally effective way."
  },
  {
    question: "What is LOLER 1998 and when does it apply to working at height?",
    answer: "LOLER (the Lifting Operations and Lifting Equipment Regulations 1998) applies whenever lifting equipment is used to lift people as well as loads. In the context of working at height, LOLER applies to mobile elevating work platforms (MEWPs), mast climbers, suspended access platforms, and other equipment used to raise or lower people. LOLER requires that such equipment is thoroughly examined by a competent person at specified intervals — every 6 months for equipment used to lift people, and every 12 months for other lifting equipment."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Work at Height Regulations 2005 are an example of:",
    options: [
      "Primary legislation",
      "Secondary legislation (regulations)",
      "An Approved Code of Practice",
      "HSE guidance"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 (SI 2005/735) are secondary legislation — regulations made under the Health and Safety at Work Act 1974. They provide specific, detailed requirements for the hazard of working at height."
  },
  {
    id: 2,
    question: "Which Act of Parliament provides the overarching legal framework for workplace health and safety in Great Britain?",
    options: [
      "The Factories Act 1961",
      "The Construction (Design and Management) Regulations 2015",
      "The Health and Safety at Work Act 1974",
      "The Work at Height Regulations 2005"
    ],
    correctAnswer: 2,
    explanation: "The Health and Safety at Work Act 1974 (HASAWA) is the primary legislation that provides the overarching legal framework for all workplace health and safety in England, Wales, and Scotland. All other health and safety regulations are made under this Act."
  },
  {
    id: 3,
    question: "Under the Management of Health and Safety at Work Regulations 1999, employers must:",
    options: [
      "Only assess risks in the construction industry",
      "Carry out a suitable and sufficient assessment of all workplace risks",
      "Delegate all risk assessment duties to employees",
      "Only assess risks when an accident has occurred"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3 of the Management of Health and Safety at Work Regulations 1999 requires every employer to carry out a suitable and sufficient assessment of the risks to the health and safety of their employees, and of anyone else who may be affected by their undertaking. This applies to all workplaces and all work activities, not just construction."
  },
  {
    id: 4,
    question: "Under CDM 2015, which duty holder is responsible for planning, managing, monitoring, and coordinating health and safety during the construction phase?",
    options: [
      "The client",
      "The principal designer",
      "The principal contractor",
      "The designer"
    ],
    correctAnswer: 2,
    explanation: "Under CDM 2015, the principal contractor is responsible for planning, managing, monitoring, and coordinating the health and safety of the construction phase. This includes managing risks from working at height, ensuring that access equipment is suitable, and coordinating the activities of all contractors on site."
  },
  {
    id: 5,
    question: "How often must a MEWP used to lift people be thoroughly examined under LOLER 1998?",
    options: [
      "Every 3 months",
      "Every 6 months",
      "Every 12 months",
      "Every 24 months"
    ],
    correctAnswer: 1,
    explanation: "Under LOLER 1998, any lifting equipment used to lift people must be thoroughly examined by a competent person at least every 6 months. For lifting equipment used only to lift loads (not people), the interval is 12 months. A current report of thorough examination must be available before the equipment is used."
  },
  {
    id: 6,
    question: "PUWER 1998 requires that work equipment provided for use at height is:",
    options: [
      "The cheapest available option",
      "Suitable for its intended purpose, maintained, and inspected",
      "Only inspected when it breaks",
      "Certified by the manufacturer every year"
    ],
    correctAnswer: 1,
    explanation: "PUWER 1998 (the Provision and Use of Work Equipment Regulations) requires that all work equipment is suitable for its intended purpose, properly maintained, and inspected at appropriate intervals. For work at height equipment such as ladders, scaffolds, and harnesses, this means regular inspection, maintenance, and replacement when damaged."
  },
  {
    id: 7,
    question: "BS EN 131 is a standard that applies to:",
    options: [
      "Safety harnesses",
      "Scaffold boards",
      "Ladders and stepladders",
      "Safety nets"
    ],
    correctAnswer: 2,
    explanation: "BS EN 131 is the British and European standard for ladders and stepladders. It covers design, construction, testing, and labelling requirements. Ladders used at work should comply with BS EN 131 and carry the appropriate markings."
  },
  {
    id: 8,
    question: "Which of the following correctly describes the legislation hierarchy from highest to lowest authority?",
    options: [
      "Guidance > ACOPs > Regulations > Acts of Parliament",
      "Acts of Parliament > Regulations > ACOPs > Guidance",
      "Regulations > Acts of Parliament > Guidance > ACOPs",
      "ACOPs > Acts of Parliament > Regulations > Guidance"
    ],
    correctAnswer: 1,
    explanation: "The correct hierarchy is: Acts of Parliament (primary legislation, e.g. HASAWA 1974) > Regulations (secondary legislation, e.g. WAH Regs 2005) > Approved Codes of Practice (ACOPs, which have special legal status) > HSE Guidance (which provides practical advice but is not legally binding in itself)."
  }
];

export default function WorkingAtHeightModule1Section2() {
  useSEO({
    title: "The Legal Framework | Working at Height Module 1.2",
    description: "WAH Regulations 2005, HASAWA 1974, CDM 2015, LOLER 1998, PUWER 1998, BS EN standards, and the hierarchy of legislation for working at height in the UK.",
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
            <Link to="../working-at-height-module-1">
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
            <Scale className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Legal Framework
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The Acts, Regulations, Approved Codes of Practice, and standards that govern working at height in the United Kingdom
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Primary law:</strong> Health and Safety at Work Act 1974</li>
              <li><strong>Key regs:</strong> WAH Regs 2005, CDM 2015, LOLER 1998, PUWER 1998</li>
              <li><strong>Risk assessment:</strong> Required by Management Regs 1999</li>
              <li><strong>Hierarchy:</strong> Avoid &rarr; Prevent &rarr; Mitigate</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400 text-base font-medium mb-2">Key Standards</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>BS EN 131:</strong> Ladders and stepladders</li>
              <li><strong>BS EN 361:</strong> Full body harnesses</li>
              <li><strong>BS EN 354/355:</strong> Lanyards and energy absorbers</li>
              <li><strong>BS EN 795:</strong> Anchor devices</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the primary and secondary legislation governing work at height",
              "Explain the general duties under the Health and Safety at Work Act 1974",
              "Describe the key requirements of the Work at Height Regulations 2005",
              "Outline the role of CDM 2015 in managing work at height on construction projects",
              "Explain when LOLER 1998 and PUWER 1998 apply to work at height equipment",
              "Identify the relevant British and European Standards for work at height equipment"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-amber-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Legislation Hierarchy Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">&mdash;</span>
            Legislation Hierarchy
          </h2>
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <p className="text-sm text-white/60 mb-6 text-center">UK health and safety law operates in a clear hierarchy of authority</p>

            {/* Level 1: Primary Legislation */}
            <div className="max-w-md mx-auto space-y-3">
              <div className="bg-amber-500/20 border-2 border-amber-500/50 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-amber-400 mb-1">LEVEL 1 &mdash; PRIMARY LEGISLATION</p>
                <p className="text-sm font-semibold text-white">Acts of Parliament</p>
                <p className="text-xs text-white/60 mt-1">Health and Safety at Work Act 1974</p>
                <p className="text-[10px] text-white/40 mt-0.5">Highest legal authority &mdash; sets overarching duties</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-amber-500/30" />
              </div>

              {/* Level 2: Secondary Legislation */}
              <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-blue-400 mb-1">LEVEL 2 &mdash; SECONDARY LEGISLATION</p>
                <p className="text-sm font-semibold text-white">Regulations (Statutory Instruments)</p>
                <div className="text-xs text-white/60 mt-1 space-y-0.5">
                  <p>Work at Height Regulations 2005</p>
                  <p>Management of H&amp;S at Work Regulations 1999</p>
                  <p>CDM 2015 &bull; LOLER 1998 &bull; PUWER 1998</p>
                </div>
                <p className="text-[10px] text-white/40 mt-1">Legally binding &mdash; specific duties and requirements</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-blue-500/30" />
              </div>

              {/* Level 3: ACOPs */}
              <div className="bg-purple-500/15 border-2 border-purple-500/40 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-purple-400 mb-1">LEVEL 3 &mdash; APPROVED CODES OF PRACTICE</p>
                <p className="text-sm font-semibold text-white">ACOPs</p>
                <p className="text-xs text-white/60 mt-1">L5 &mdash; Managing Health and Safety at Work</p>
                <p className="text-[10px] text-white/40 mt-1">Special legal status &mdash; not following an ACOP can be used as evidence in court</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-purple-500/30" />
              </div>

              {/* Level 4: Guidance */}
              <div className="bg-green-500/15 border-2 border-green-500/40 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-green-400 mb-1">LEVEL 4 &mdash; GUIDANCE</p>
                <p className="text-sm font-semibold text-white">HSE Guidance &amp; Industry Publications</p>
                <div className="text-xs text-white/60 mt-1 space-y-0.5">
                  <p>INDG401 &mdash; Working at Height: A Brief Guide</p>
                  <p>HSG33 &mdash; Safety in Roof Work</p>
                  <p>Industry guidance from trade bodies</p>
                </div>
                <p className="text-[10px] text-white/40 mt-1">Advisory &mdash; practical advice on compliance, not legally binding per se</p>
              </div>
            </div>

            <p className="text-center text-white/40 text-xs mt-4">
              Higher levels take precedence over lower levels in the event of conflict
            </p>
          </div>
        </section>

        {/* Section 01: Health and Safety at Work Act 1974 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">01</span>
            Health and Safety at Work Act 1974
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Health and Safety at Work etc. Act 1974</strong> (HASAWA or HSWA) is
                the primary piece of legislation governing workplace health and safety in
                England, Wales, and Scotland. It is an Act of Parliament &mdash; the highest
                form of UK law &mdash; and it provides the overarching framework within which
                all other health and safety regulations operate.
              </p>

              <p>
                The Act was a landmark piece of legislation when it was introduced, replacing a
                fragmented system of industry-specific laws with a single, comprehensive statute
                that applies to <strong>all work activities, all employers, all employees, and
                all workplaces</strong>. It operates on the principle that those who create
                workplace risks are best placed to manage them.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-amber-500 mb-3">Key Sections for Working at Height</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[60px] h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">S.2(1)</span>
                    <div>
                      <p className="text-white font-medium">General duty to employees</p>
                      <p>Every employer must ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. This includes providing safe systems of work, safe equipment, and adequate training for working at height.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[60px] h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">S.3</span>
                    <div>
                      <p className="text-white font-medium">Duty to non-employees</p>
                      <p>Every employer must conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks. This covers members of the public, visitors, and other contractors on shared sites.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[60px] h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">S.7</span>
                    <div>
                      <p className="text-white font-medium">Employee duties</p>
                      <p>Every employee has a duty to take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions. They must also cooperate with their employer on health and safety matters.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[60px] h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">S.33</span>
                    <div>
                      <p className="text-white font-medium">Offences</p>
                      <p>It is a criminal offence to fail to comply with the Act or any regulations made under it. Penalties include unlimited fines and up to 2 years&rsquo; imprisonment for individuals.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">&ldquo;So Far as Is Reasonably Practicable&rdquo;</p>
                <p className="text-sm text-white/80 leading-relaxed">
                  This phrase appears throughout health and safety law and is central to understanding
                  how duties work in practice. It means that an employer must weigh the risk of harm
                  against the cost (in time, money, and effort) of the measures needed to eliminate
                  or reduce that risk. If the risk is significant and the cost of prevention is
                  reasonable, then the prevention measures must be taken. The burden of proof falls
                  on the employer to demonstrate that it was not reasonably practicable to do more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Work at Height Regulations 2005 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">02</span>
            Work at Height Regulations 2005
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Work at Height Regulations 2005</strong> (SI 2005/735) are the
                principal regulations governing all work at height activities. They came into
                force on 6 April 2005 and replaced a number of older regulations, including
                parts of the Construction (Health, Safety and Welfare) Regulations 1996.
              </p>

              <p>
                The regulations apply to <strong>all work at height</strong> where there is a
                risk of a fall liable to cause personal injury, regardless of the industry or
                the type of work being carried out. They apply equally to a roofer on a new
                build, an electrician on a stepladder, a window cleaner on an access platform,
                or a warehouse worker on a forklift truck.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Key Regulations</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div>
                    <p className="text-white font-medium">Regulation 4 &mdash; Organisation and Planning</p>
                    <p>All work at height must be properly planned by a competent person, appropriately supervised, and carried out in a manner that is, so far as is reasonably practicable, safe. The plan must include weather considerations, emergency and rescue procedures, and selection of appropriate work equipment.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 5 &mdash; Competence</p>
                    <p>No person shall engage in any activity related to work at height (including organisation, planning, and supervision) unless they are competent to do so, or, if being trained, they are supervised by a competent person.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 6 &mdash; Avoidance of Risks from Work at Height</p>
                    <p>The duty holder must: (a) avoid work at height where reasonably practicable; (b) where work at height cannot be avoided, use work equipment or other measures to prevent falls; (c) where the risk of a fall cannot be entirely eliminated, use work equipment or other measures to minimise the distance and consequences of any fall.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 7 &mdash; Selection of Work Equipment</p>
                    <p>The duty holder must select work equipment for working at height that gives collective protection priority over personal protection, and takes account of the working conditions, the risks to safety, the distance and consequences of any potential fall, the duration and frequency of use, and the need for easy and timely evacuation in an emergency.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 8 &mdash; Requirements for Particular Work Equipment</p>
                    <p>Schedules 1 to 6 of the regulations set detailed requirements for specific types of work equipment: existing places of work and means of access (Schedule 1), guardrails and toe boards (Schedule 2), working platforms (Schedule 3), ladders (Schedule 4), scaffolding (Schedule 5), and rope access (Schedule 6).</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 9 &mdash; Fragile Surfaces</p>
                    <p>No person shall pass across, near, or work on, from, or near a fragile surface unless that is the only reasonably practicable way of carrying out the work, and suitable and sufficient platforms, coverings, or other means of support are provided. Warning notices must be displayed at approaches to fragile surfaces.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 10 &mdash; Falling Objects</p>
                    <p>Suitable and sufficient steps must be taken to prevent any person being struck by a falling object, including securing tools and materials, providing toe boards, and establishing exclusion zones below work at height.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 12 &mdash; Inspection of Work Equipment</p>
                    <p>Work equipment from which a person could fall 2 metres or more must be inspected after assembly in any position, at suitable intervals, and after exceptional circumstances (e.g. severe weather). Inspection results must be recorded.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">The Core Hierarchy</p>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                    <p className="text-green-400 text-xs font-bold">STEP 1</p>
                    <p className="text-white font-semibold">AVOID</p>
                    <p className="text-xs text-white/60">Do not work at height if there is a safer alternative</p>
                  </div>
                  <div className="flex justify-center"><div className="w-0.5 h-4 bg-white/20" /></div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center">
                    <p className="text-amber-400 text-xs font-bold">STEP 2</p>
                    <p className="text-white font-semibold">PREVENT</p>
                    <p className="text-xs text-white/60">Use collective protection to prevent falls (guardrails, platforms)</p>
                  </div>
                  <div className="flex justify-center"><div className="w-0.5 h-4 bg-white/20" /></div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                    <p className="text-red-400 text-xs font-bold">STEP 3</p>
                    <p className="text-white font-semibold">MITIGATE</p>
                    <p className="text-xs text-white/60">Minimise fall distance and consequences (nets, airbags, harnesses)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Management Regulations, CDM, LOLER, PUWER */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">03</span>
            Supporting Regulations
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 do not operate in isolation. Several other
                sets of regulations interact with and support the WAH Regs, creating a
                comprehensive legal framework. Understanding these supporting regulations is
                essential for full compliance.
              </p>

              {/* Management Regs */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Management of Health and Safety at Work Regulations 1999</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Regulation 3 &mdash; Risk Assessment:</strong> Every employer must carry out a suitable and sufficient assessment of the risks to employees and others affected by their undertaking. For work at height, this means a specific risk assessment for every task involving a risk of falling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Regulation 4 &mdash; Principles of Prevention:</strong> Employers must implement preventive and protective measures based on the general principles of prevention set out in Schedule 1 (which mirrors the hierarchy: avoid, combat risks at source, collective over individual, etc.).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Regulation 13 &mdash; Capabilities and Training:</strong> Employers must take into account the capabilities of employees when entrusting tasks to them. Employees must receive adequate health and safety training, including specific training for work at height.</span>
                  </li>
                </ul>
              </div>

              {/* CDM 2015 */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Construction (Design and Management) Regulations 2015</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  CDM 2015 applies to all construction projects in Great Britain. For projects with
                  more than one contractor, a <strong className="text-white">principal designer</strong> and
                  <strong className="text-white"> principal contractor</strong> must be appointed.
                  CDM 2015 creates specific duties on multiple parties:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-blue-400 text-xs font-semibold mb-1">Client</p>
                    <p className="text-white/80 text-xs">Must make suitable arrangements for managing the project, including allocating sufficient time and resources for work at height to be carried out safely. Must ensure adequate welfare facilities.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-blue-400 text-xs font-semibold mb-1">Designer</p>
                    <p className="text-white/80 text-xs">Must avoid foreseeable risks in designs, including risks from working at height. For example, specifying equipment that can be maintained from ground level, or designing out the need for work on roofs.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-blue-400 text-xs font-semibold mb-1">Principal Designer</p>
                    <p className="text-white/80 text-xs">Must plan, manage, and monitor the pre-construction phase, coordinate health and safety matters, and prepare or update the health and safety file.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-blue-400 text-xs font-semibold mb-1">Principal Contractor</p>
                    <p className="text-white/80 text-xs">Must plan, manage, monitor, and coordinate the construction phase, including all work at height activities. Must prepare the construction phase plan and ensure site inductions address work at height risks.</p>
                  </div>
                </div>
              </div>

              {/* LOLER */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gavel className="h-5 w-5 text-green-400" />
                  <p className="text-sm font-medium text-green-400">Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  LOLER applies whenever lifting equipment is used to lift or lower people. In the
                  context of working at height, this includes MEWPs (cherry pickers, scissor lifts),
                  mast climbers, suspended access platforms, and cradles.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Thorough examination:</strong> Equipment used to lift people must be thoroughly examined by a competent person at least every <strong className="text-white">6 months</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Planning:</strong> Every lifting operation must be properly planned, appropriately supervised, and carried out safely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Reports:</strong> A current report of thorough examination must be available before the equipment is used</span>
                  </li>
                </ul>
              </div>

              {/* PUWER */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Provision and Use of Work Equipment Regulations 1998 (PUWER)</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  PUWER applies to all work equipment, including equipment used for working at
                  height such as ladders, scaffolds, tower scaffolds, harnesses, and MEWPs.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Suitability:</strong> Equipment must be suitable for its intended purpose and the conditions in which it will be used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Maintenance:</strong> Equipment must be maintained in an efficient state, in efficient working order, and in good repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Information and training:</strong> Users must receive adequate information, instruction, and training in the safe use of the equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span><strong className="text-white">Inspection:</strong> Equipment must be inspected at suitable intervals and after exceptional circumstances</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: BS EN Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">04</span>
            British &amp; European Standards
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In addition to the legislation and regulations, a range of <strong>British and
                European Standards</strong> (BS EN standards) set technical requirements for
                the design, manufacture, testing, and use of work at height equipment. While
                standards are not legislation in themselves, they are referenced in guidance and
                ACOPs, and compliance with relevant standards is strong evidence of meeting
                legal duties.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Standards for Working at Height</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-xs mb-1">BS EN 131 &mdash; Ladders</p>
                    <p className="text-xs text-white/80">Covers the design, construction, testing, and marking of portable ladders and stepladders. All ladders used at work should comply with this standard. Look for the EN 131 marking and the duty rating (Class 1 for industrial/professional use weighing up to 150kg).</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-xs mb-1">BS EN 361 &mdash; Full Body Harnesses</p>
                    <p className="text-xs text-white/80">Specifies the requirements for full body harnesses used in personal fall protection systems. Harnesses must have dorsal (back) and/or sternal (chest) attachment points and be CE/UKCA marked.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-xs mb-1">BS EN 354 &mdash; Lanyards</p>
                    <p className="text-xs text-white/80">Covers connecting lanyards used as part of a personal fall protection system. Lanyards must not exceed 2 metres in length (before energy absorber deployment).</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-xs mb-1">BS EN 355 &mdash; Energy Absorbers</p>
                    <p className="text-xs text-white/80">Specifies requirements for energy absorbers that are integral to or connected to a lanyard. Energy absorbers limit the arrest force on the body to a maximum of 6 kN during a fall.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-xs mb-1">BS EN 360 &mdash; Retractable Type Fall Arresters</p>
                    <p className="text-xs text-white/80">Covers self-retracting lifeline (SRL) devices that automatically take up and release a connecting line as the user moves, and lock in the event of a fall.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-amber-400 font-semibold text-xs mb-1">BS EN 795 &mdash; Anchor Devices</p>
                    <p className="text-xs text-white/80">Specifies requirements for anchor devices and structural anchors used for attaching personal fall protection equipment. Anchors must be rated for the loads imposed during fall arrest (minimum 12 kN for a single user).</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-500">Practical tip:</strong> When selecting or
                  inspecting work at height equipment, always check for the appropriate CE/UKCA
                  markings, the relevant BS EN standard number, the date of manufacture, and
                  the serial number. Equipment without these markings should not be used.
                  Harnesses and lanyards also have a limited service life (typically 5&ndash;10
                  years from first use, depending on manufacturer guidance) and must be withdrawn
                  from service at the appropriate time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Duties on Employers, Employees, and the Self-Employed */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">05</span>
            Duties on Different Parties
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The legal framework places duties on multiple parties. It is important to
                understand that health and safety is not solely the employer&rsquo;s
                responsibility &mdash; employees and the self-employed also have significant
                legal obligations.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-amber-400 font-semibold text-sm mb-2">Employer Duties</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Plan, organise, and supervise all work at height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Carry out risk assessments for work at height tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Provide suitable and sufficient work equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Ensure workers are competent or supervised</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Provide training, information, and instruction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Inspect and maintain equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Plan for emergencies and rescue</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-blue-400 font-semibold text-sm mb-2">Employee Duties</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Take reasonable care for own health and safety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Take reasonable care not to endanger others</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Cooperate with employer on health and safety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Use equipment in accordance with training</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Report hazards, defects, and unsafe conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Not interfere with or misuse safety provisions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Refuse work they are not competent to carry out safely</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-green-400 font-semibold text-sm mb-2">Self-Employed Duties</p>
                <p className="text-sm text-white/80 mb-3">
                  Self-employed workers owe the same duties as employers in relation to their own
                  safety and the safety of others affected by their work. A self-employed
                  electrician must:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>Carry out their own risk assessments for work at height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>Select and use appropriate work equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>Ensure they are competent to carry out the work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>Inspect and maintain their own equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>Follow the avoid &rarr; prevent &rarr; mitigate hierarchy</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Important</p>
                </div>
                <p className="text-sm text-white/80">
                  Both employers and employees can be prosecuted for breaching health and safety
                  law. An employee who deliberately ignores safety procedures, misuses equipment,
                  or removes safety measures can be prosecuted personally under Section 7 and
                  Section 8 of HASAWA 1974. &ldquo;My boss told me to do it&rdquo; is not a
                  defence if you knowingly carried out unsafe work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has provided a comprehensive overview of the legal framework
                governing work at height in the UK. The key points to remember are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">HASAWA 1974:</strong> The overarching Act sets general duties on employers (S.2), duties to non-employees (S.3), and duties on employees (S.7)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">WAH Regs 2005:</strong> The principal regulations for all work at height &mdash; plan, avoid, prevent, mitigate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Management Regs 1999:</strong> Require risk assessment and the application of preventive principles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">CDM 2015:</strong> Creates duties on clients, designers, principal designers, and principal contractors to manage work at height on construction projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">LOLER 1998:</strong> Requires thorough examination every 6 months for equipment used to lift people (MEWPs, mast climbers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">PUWER 1998:</strong> Requires all work equipment to be suitable, maintained, and inspected</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">BS EN Standards:</strong> Technical standards for ladders (131), harnesses (361), lanyards (354/355), SRLs (360), and anchors (795)</span>
                </li>
              </ul>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-500">Next:</strong> In Section 3, we will put
                  the legal framework into practice by examining the risk assessment process for
                  working at height &mdash; how to identify hazards, evaluate risks, and record
                  your findings.
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
            <Link to="../working-at-height-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: What Is Working at Height?
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-amber-500 text-white hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-1-section-3">
              Next: Risk Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
