import { ArrowLeft, Users, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "designer-definition",
    question: "Under CDM 2015, which of the following would be classed as a 'designer'?",
    options: [
      "An electrician who specifies a cable route and selects the distribution board layout",
      "A labourer who carries materials to the work area",
      "A client who commissions a new office fit-out",
      "A building occupant who reports a fault"
    ],
    correctIndex: 0,
    explanation: "Under CDM 2015, a designer is anyone who prepares or modifies a design — including drawings, specifications, and layouts. An electrician who specifies cable routes and selects distribution board layouts is making design decisions that affect health and safety, making them a designer under the regulations."
  },
  {
    id: "contractor-construction-phase",
    question: "Under Regulation 15, what must a contractor ensure BEFORE beginning work in the construction phase?",
    options: [
      "That the client is aware of their duties and a construction phase plan is in place",
      "That all workers hold a CSCS card",
      "That the principal designer has visited the site",
      "That a CDM co-ordinator has been appointed"
    ],
    correctIndex: 0,
    explanation: "Regulation 15(2) states that a contractor must not carry out construction work on a project unless satisfied that the client is aware of their duties under the regulations and that there is a construction phase plan (CPP) for the project. CSCS cards are not a legal requirement under CDM, and the role of CDM co-ordinator was replaced under CDM 2015."
  },
  {
    id: "worker-duties",
    question: "Under Regulation 14(2), which of the following is NOT a duty placed on workers?",
    options: [
      "Appointing a principal contractor for the project",
      "Reporting anything they believe is likely to endanger health or safety",
      "Cooperating with any person working on the project",
      "Not misusing anything provided for health, safety, or welfare"
    ],
    correctIndex: 0,
    explanation: "Appointing a principal contractor is a client duty under Regulation 5, not a worker duty. Workers must report dangerous conditions, cooperate with duty holders, not misuse anything provided for health and safety, and take reasonable care of their own safety and that of others who may be affected by their actions."
  }
];

const faqs = [
  {
    question: "Can an electrician really be a 'designer' under CDM?",
    answer: "Yes — and this is one of the most common misunderstandings in the industry. Under CDM 2015, a designer is anyone who prepares or modifies a design in relation to a structure, or who arranges for or instructs someone else to do so. If you specify cable routes, select equipment, plan distribution board layouts, produce layout drawings, or choose the positioning of accessories such as sockets and switches, you are making design decisions that affect health and safety. That makes you a designer under the regulations, with all the duties that come with it — regardless of whether 'designer' appears in your job title."
  },
  {
    question: "Do I need a CSCS or ECS card to work on a construction site under CDM?",
    answer: "CDM 2015 does not specifically require CSCS, ECS, or any other competence card. The regulations require that anyone carrying out work has the right skills, knowledge, experience, and (where relevant) organisational capability for the task. In practice, most principal contractors and clients require CSCS/ECS cards as evidence of competence and will not permit access to site without one. The cards are therefore a widely accepted industry standard for demonstrating competence, but they are not a legal requirement under CDM itself. What CDM does require is that you are genuinely competent — the card is evidence, not proof."
  },
  {
    question: "What happens if one person holds multiple CDM roles?",
    answer: "CDM 2015 explicitly recognises that one person or organisation can hold more than one duty holder role. The most common example is a design-and-build contractor, who acts as both designer and contractor (and often principal contractor as well). When this happens, the person or organisation must fulfil ALL of the duties attached to EACH role they hold. The duties do not merge or reduce — they stack. A design-and-build contractor who is also the principal contractor must meet the designer duties under Regulation 9, the contractor duties under Regulation 15, AND the principal contractor duties under Regulation 13. This can be a significant burden, which is why larger organisations often have different teams or individuals responsible for each role internally."
  },
  {
    question: "What is the difference between a contractor and a sub-contractor under CDM?",
    answer: "In practical terms, CDM 2015 draws no distinction between the two. The definition of 'contractor' in the regulations covers anyone who carries out, manages, or controls construction work — whether they are the main contractor, a sub-contractor, a sub-sub-contractor, or a self-employed tradesperson. All contractors have the same duties under Regulation 15 regardless of their position in the contractual chain. The only difference in CDM terms is between a contractor and the principal contractor, who has additional coordination and management duties. If there is only one contractor on the project, that contractor must fulfil the principal contractor duties as well."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under CDM 2015, which of the following activities would make a person a 'designer'?",
    options: [
      "Preparing a specification for cable types and containment routes",
      "Sweeping the workshop floor",
      "Ordering materials from a supplier's catalogue without specifying anything",
      "Driving a delivery van to site"
    ],
    correctAnswer: 0,
    explanation: "A designer is anyone who prepares or modifies a design relating to a structure, including drawings, design details, specifications, and bills of quantities. Preparing a specification for cable types and containment routes is a design activity because the decisions made affect health and safety during construction and maintenance."
  },
  {
    id: 2,
    question: "Regulation 9 requires designers to follow a hierarchy when preparing or modifying a design. What is the correct order?",
    options: [
      "Eliminate foreseeable risks → reduce remaining risks → provide information about residual risks",
      "Provide information about all risks → then try to reduce them → then eliminate what is left",
      "Reduce risks first → eliminate what cannot be reduced → ignore residual risks",
      "Report all risks to the HSE → wait for guidance → proceed with the original design"
    ],
    correctAnswer: 0,
    explanation: "Regulation 9 sets out a clear hierarchy: first eliminate foreseeable risks so far as is reasonably practicable, then reduce remaining risks that cannot be eliminated, and finally provide information about any residual risks so that other duty holders can manage them. This mirrors the general principles of prevention."
  },
  {
    id: 3,
    question: "An electrician designs a cable route that passes through a confined space requiring crawling access. Under Regulation 9, what should the electrician consider FIRST?",
    options: [
      "Whether the cable route can be redesigned to avoid the confined space entirely",
      "What PPE the installer should wear in the confined space",
      "How to provide ventilation in the confined space",
      "Whether a confined space permit is available"
    ],
    correctAnswer: 0,
    explanation: "The first step in the designer's hierarchy is to eliminate the risk. If the cable route can be redesigned to avoid the confined space entirely — for example by routing through an accessible void, trunking, or alternative pathway — that eliminates the confined space hazard. PPE, ventilation, and permits are all risk reduction or management measures, which come later in the hierarchy if elimination is not reasonably practicable."
  },
  {
    id: 4,
    question: "Which of the following statements about contractor duties under CDM 2015 is correct?",
    options: [
      "A contractor must plan, manage, and monitor their own work to ensure it is carried out without risks to health and safety",
      "A contractor's duties only apply to the main contractor, not to sub-contractors",
      "Contractors are only responsible for the safety of their own employees, not other workers on site",
      "Contractor duties under CDM apply only to projects with more than five workers"
    ],
    correctAnswer: 0,
    explanation: "Under Regulation 15, every contractor — including sub-contractors and the self-employed — must plan, manage, and monitor construction work carried out by them or under their control so that it is carried out without risks to health and safety so far as is reasonably practicable. The duties apply to ALL contractors on ALL projects regardless of size."
  },
  {
    id: 5,
    question: "Under Regulation 14(2), workers on a construction project must do all of the following EXCEPT:",
    options: [
      "Prepare the construction phase plan for the project",
      "Report anything they believe is likely to endanger their own or others' health and safety",
      "Cooperate with any person working on the project to enable compliance with CDM",
      "Not misuse anything provided in the interests of health, safety, or welfare"
    ],
    correctAnswer: 0,
    explanation: "Preparing the construction phase plan is a duty of the principal contractor (Regulation 12), not an individual worker. Workers must report dangerous conditions, cooperate with duty holders, not interfere with or misuse H&S provisions, and take reasonable care of their own safety and the safety of others affected by their work."
  },
  {
    id: 6,
    question: "A design-and-build contractor takes on a project where they are also appointed as principal contractor. Which duties must they fulfil?",
    options: [
      "Designer duties under Regulation 9, contractor duties under Regulation 15, AND principal contractor duties under Regulation 13",
      "Only the principal contractor duties, because these override the other roles",
      "Only the designer duties, because design comes first in the project timeline",
      "They can choose which set of duties to follow based on their company's risk assessment"
    ],
    correctAnswer: 0,
    explanation: "CDM 2015 is clear that duties stack — they do not merge or override each other. A design-and-build contractor who is also the principal contractor must fulfil ALL the duties attached to EACH role: designer duties (Regulation 9), contractor duties (Regulation 15), and principal contractor duties (Regulation 13). There is no option to pick and choose."
  },
  {
    id: 7,
    question: "CDM 2015 requires that people carrying out construction work are competent. What does 'competent' mean in this context?",
    options: [
      "Having the necessary skills, knowledge, experience, and (for organisations) organisational capability for the work",
      "Holding a valid CSCS or ECS card",
      "Having completed a CDM awareness course in the last twelve months",
      "Being registered with the Health and Safety Executive"
    ],
    correctAnswer: 0,
    explanation: "CDM 2015 defines competence in terms of skills, knowledge, experience, and — for organisations — the organisational capability to carry out the work safely. There is no requirement for a specific qualification or card. CSCS/ECS cards are widely used as evidence of competence, but they are not mandatory under the regulations themselves."
  },
  {
    id: 8,
    question: "A contractor must appoint workers in writing under CDM 2015. Which of the following is also required when appointing a contractor?",
    options: [
      "The appointment must be in writing and the person appointing must be satisfied the contractor has the skills, knowledge, experience, and organisational capability for the work",
      "The contractor must hold professional indemnity insurance of at least one million pounds",
      "The appointment must be registered with the local authority building control department",
      "The contractor must provide a copy of their CSCS card to the principal designer"
    ],
    correctAnswer: 0,
    explanation: "Under CDM 2015, anyone who appoints a designer or contractor must satisfy themselves that the appointee has the right skills, knowledge, experience, and organisational capability (for organisations) to carry out the work in a way that secures health and safety. The appointment should be in writing. There is no requirement for a specific insurance level, local authority registration, or CSCS card under CDM."
  }
];

export default function CdmRegulationsModule2Section4() {
  useSEO({
    title: "Designers, Contractors & Workers | CDM Regulations Module 2.4",
    description: "Designer duties under Regulation 9, contractor duties under Regulation 15, worker duties under Regulation 14(2), electricians as designers, multiple CDM roles, competence and training under CDM 2015.",
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
            <Link to="../cdm-regulations-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/20 border border-blue-500/30 mb-4">
            <Users className="h-7 w-7 text-blue-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-400 text-xs font-semibold">MODULE 2 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Designers, Contractors &amp; Workers
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Who counts as a designer, what contractors must do, and the duties every worker carries on a CDM project &mdash; including when electricians become designers
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Designer:</strong> Anyone who prepares or modifies a design</li>
              <li><strong>Contractor:</strong> Anyone who carries out or manages construction work</li>
              <li><strong>Worker:</strong> Must cooperate, report hazards, take care</li>
              <li><strong>Multiple roles:</strong> One person can hold several CDM roles</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Know your role:</strong> You may be a designer without realising it</li>
              <li><strong>Plan first:</strong> Never start construction work without a plan</li>
              <li><strong>Speak up:</strong> Report unsafe conditions immediately</li>
              <li><strong>Competence:</strong> Ensure you have the skills for the task</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define who is a designer under CDM 2015 and give examples",
              "Explain the designer's duty hierarchy under Regulation 9",
              "Identify when an electrician becomes a designer under CDM",
              "Describe contractor duties under Regulation 15",
              "List worker duties under Regulation 14(2)",
              "Explain how multiple CDM roles can apply to one person or organisation",
              "Understand what competence means under CDM 2015",
              "Describe how CSCS/ECS cards relate to CDM competence requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Who Is a Designer? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">01</span>
            Who Is a Designer?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 defines a designer very broadly. A <strong>designer is any person
                (including a client, contractor, or other person referred to in the
                regulations) who in the course of a business prepares or modifies a design
                relating to a structure</strong>, or who arranges for or instructs any person
                under their control to do so.
              </p>

              <p>
                The word &ldquo;design&rdquo; in the regulations includes <strong>drawings,
                design details, specifications, and bills of quantities</strong> (including
                the specification of articles or substances) relating to a structure. This is
                deliberately wide &mdash; it captures far more people than just architects
                and chartered engineers.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">People Who Can Be Designers Under CDM</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Architects</strong> &mdash; who design the overall building layout and form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Structural engineers</strong> &mdash; who design foundations, steelwork, and load-bearing elements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Building services engineers</strong> &mdash; who design heating, ventilation, electrical, and plumbing systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Electricians</strong> &mdash; who specify cable routes, equipment layouts, and distribution board configurations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Interior designers</strong> &mdash; who specify materials, finishes, and layouts that affect the structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Quantity surveyors</strong> &mdash; when they specify particular materials or products in bills of quantities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Temporary works coordinators</strong> &mdash; who design scaffolding, formwork, and temporary supports</span>
                  </li>
                </ul>
              </div>

              <p>
                The key test is whether a person <strong>makes decisions about a design that
                could affect health and safety</strong>. It does not matter whether
                &ldquo;designer&rdquo; appears in their job title. A tradesperson who decides
                where to run a cable, which fixings to use, or how to configure a system is
                making design decisions &mdash; and CDM treats them as a designer.
              </p>

              {/* Designer Decision Flowchart */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-blue-400">Designer Decision Flowchart &mdash; Am I a Designer?</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">1</span>
                    <div className="text-sm text-white/80">
                      <p className="text-white font-medium">Do you prepare or modify drawings, specifications, details, or bills of quantities?</p>
                      <p className="mt-1">If <strong className="text-green-400">YES</strong> &rarr; proceed to step 2. If <strong className="text-red-400">NO</strong> &rarr; you are probably not a designer.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                    <div className="text-sm text-white/80">
                      <p className="text-white font-medium">Does the work relate to a structure (building, civil engineering work, or temporary works)?</p>
                      <p className="mt-1">If <strong className="text-green-400">YES</strong> &rarr; proceed to step 3. If <strong className="text-red-400">NO</strong> &rarr; CDM does not apply.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">3</span>
                    <div className="text-sm text-white/80">
                      <p className="text-white font-medium">Are you doing this in the course of a business (not a domestic client doing their own DIY)?</p>
                      <p className="mt-1">If <strong className="text-green-400">YES</strong> &rarr; proceed to step 4. If <strong className="text-red-400">NO</strong> &rarr; you are not a designer under CDM.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">4</span>
                    <div className="text-sm text-white/80">
                      <p className="text-white font-medium">Could your design decisions affect health and safety during construction or maintenance?</p>
                      <p className="mt-1">If <strong className="text-green-400">YES</strong> &rarr; <strong className="text-blue-400">You are a designer under CDM 2015.</strong> Regulation 9 duties apply to you.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Key Point:</strong> The definition is
                  deliberately broad. CDM does not only apply to people with &ldquo;designer&rdquo;
                  in their job title. If you make decisions that shape how construction work is
                  carried out, you have designer responsibilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Designer Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">02</span>
            Designer Duties
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation 9</strong> sets out the duties of designers. The core
                principle is that designers must take account of the <strong>general
                principles of prevention</strong> when preparing or modifying a design.
                This means thinking about health and safety from the very start &mdash; not
                treating it as an afterthought once the design is finished.
              </p>

              <p>
                When preparing or modifying a design, a designer must follow a
                <strong> three-step hierarchy</strong>:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Designer&rsquo;s Hierarchy (Regulation 9)</p>
                <div className="space-y-4 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Eliminate Foreseeable Risks</p>
                      <p>So far as is reasonably practicable, <strong className="text-white">eliminate hazards</strong> that could give rise to risks to health and safety. This is always the first and best option. Can the design be changed so the hazard does not exist at all?</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Reduce Remaining Risks</p>
                      <p>Where risks cannot be eliminated, <strong className="text-white">reduce them</strong> so far as is reasonably practicable by incorporating features or measures into the design. For example, specifying pre-fabricated components that reduce the amount of work at height.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Provide Information About Residual Risks</p>
                      <p>Where risks cannot be eliminated or adequately reduced by design alone, <strong className="text-white">provide information</strong> to other duty holders (the client, principal designer, contractors) about the remaining risks so they can plan appropriate control measures.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">General Principles of Prevention</p>
                <p className="text-sm text-white/80 mb-3">
                  Designers must take account of the general principles of prevention set out in
                  Schedule 1 of the Management of Health and Safety at Work Regulations 1999. These include:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Avoiding risks altogether where possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Evaluating risks that cannot be avoided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Combating risks at source</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Adapting work to the individual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Adapting to technical progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Replacing the dangerous with the non-dangerous or less dangerous</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Giving collective protective measures priority over individual ones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>Giving appropriate instructions to workers</span>
                  </li>
                </ul>
              </div>

              <p>
                Designers must also take into account the <strong>workplace provisions</strong>
                in Schedule 2 of CDM 2015 (stability, lighting, weather protection, ventilation,
                etc.) where the design relates to a workplace that will be used by people. This
                means thinking about health and safety not only during construction but also
                during the <strong>future use and maintenance</strong> of the building.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Common Misconception</p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Designer duties do not require zero risk.</strong> The
                  test is &ldquo;so far as is reasonably practicable&rdquo; (SFAIRP). Designers must
                  balance the risk against the cost, time, and difficulty of eliminating or reducing it.
                  A design that requires working at height is not automatically a failure &mdash; but a
                  design that requires working at height when there is a practical alternative at ground
                  level would be a breach of Regulation 9.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Electricians as Designers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">03</span>
            Electricians as Designers
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most significant &mdash; and frequently overlooked &mdash; aspects
                of CDM 2015 is that <strong>electricians regularly act as designers</strong>
                without realising it. Whenever an electrician makes a decision that shapes how
                electrical work will be installed, they are preparing or modifying a design
                under the regulations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">When Is an Electrician a Designer?</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Designing Cable Routes</p>
                      <p>Deciding where cables will run &mdash; through voids, along cable trays, in trunking, through walls or floors. These decisions affect who needs to work in confined spaces, at height, or near existing services.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Specifying Equipment</p>
                      <p>Choosing which distribution boards, protective devices, accessories, and containment systems to use. The weight, size, and installation requirements of equipment affect manual handling and working-at-height risks.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Planning Distribution Board Layouts</p>
                      <p>Configuring the layout of circuits, protective devices, and connections within a distribution board. A poorly planned layout can create long-term maintenance hazards and increase the risk of electrical faults.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Producing Layout Drawings</p>
                      <p>Creating drawings showing the positions of sockets, switches, luminaires, and other accessories. These drawings are &ldquo;designs&rdquo; within the meaning of CDM and carry designer duties.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-white font-medium">Specifying Installation Methods</p>
                      <p>Deciding how cables will be fixed, what type of containment to use, and how connections will be made. These decisions directly affect installation safety and future maintainability.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">Practical Implications for Electricians</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Think about buildability:</strong> When you design a cable route, consider whether it can be installed safely. Does it require working at height? Could the route be changed to avoid confined spaces or hazardous areas?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Think about maintenance:</strong> Will future electricians be able to access the installation safely for testing, fault-finding, and modifications? A cable route through a difficult-to-reach void may be easy to install now but dangerous to maintain later.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Document your decisions:</strong> If you identify residual risks that cannot be eliminated or reduced by your design, communicate them. Note them on drawings, in specifications, or in the health and safety file.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Cooperate with the principal designer:</strong> On notifiable projects, the principal designer coordinates design health and safety. Share information about your design decisions and any risks you have identified.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Example: Designing Out Risk</p>
                <p className="text-sm text-white/80">
                  An electrician is asked to install new lighting in a warehouse with a 10-metre
                  ceiling. The original plan calls for luminaires mounted directly to the ceiling,
                  requiring a mobile elevated work platform (MEWP) for installation and every future
                  lamp change. By redesigning the installation to use <strong className="text-white">
                  winch-lowerable luminaires</strong>, the electrician eliminates the need for
                  work at height during maintenance. This is &ldquo;designing out risk&rdquo; under
                  Regulation 9 &mdash; and it is exactly what CDM expects designers to do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Who Is a Contractor? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">04</span>
            Who Is a Contractor?
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under CDM 2015, a <strong>contractor is any person who, in the course or
                furtherance of a business, carries out, manages, or controls construction
                work</strong>. Like the definition of &ldquo;designer&rdquo;, this is
                deliberately broad.
              </p>

              <p>
                The definition includes:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Main contractors</strong> &mdash; the organisation with the primary contract to carry out the construction work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Sub-contractors</strong> &mdash; organisations or individuals engaged by the main contractor or another sub-contractor to carry out specific packages of work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Self-employed tradespeople</strong> &mdash; individuals working on their own account who carry out construction work</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Labour-only sub-contractors</strong> &mdash; individuals or agencies who supply workers to carry out construction work</span>
                  </div>
                </div>
              </div>

              <p>
                CDM draws <strong>no distinction between the main contractor and
                sub-contractors</strong> when it comes to contractor duties. All contractors
                have the same legal obligations under Regulation 15, regardless of where they
                sit in the contractual chain.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">Appointment Requirements</p>
                <p className="text-sm text-white/80 mb-3">
                  Under CDM 2015, the appointment of a contractor must be <strong className="text-white">in writing</strong>. The person making the appointment (whether the client, the principal contractor, or another contractor further down the chain) must satisfy themselves that the contractor has the:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Skills</strong> &mdash; the practical abilities needed for the work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Knowledge</strong> &mdash; understanding of the risks and how to manage them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Experience</strong> &mdash; relevant track record in similar work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Organisational capability</strong> &mdash; for organisations, the capacity to manage the work safely (sufficient resources, management systems, supervision)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Single Contractor Projects</p>
                </div>
                <p className="text-sm text-white/80">
                  If there is only <strong className="text-white">one contractor</strong> on a
                  project, that contractor must fulfil the <strong className="text-white">principal
                  contractor duties</strong> as well as the standard contractor duties. This
                  applies to many smaller electrical projects where the electrician is the only
                  person carrying out construction work. Understanding this is crucial &mdash;
                  you may have more responsibilities than you think on a small job.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Contractor Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">05</span>
            Contractor Duties
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation 15</strong> sets out the duties that apply to every
                contractor on a CDM project. These duties apply to <strong>all contractors,
                all sub-contractors, and all self-employed people</strong> carrying out
                construction work &mdash; regardless of the size of the project.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Contractor Duties Under Regulation 15</p>
                <div className="space-y-4 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Plan, Manage &amp; Monitor</p>
                      <p>Plan, manage, and monitor construction work carried out by them or under their control so that it is carried out without risks to health and safety, so far as is reasonably practicable.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Client Awareness &amp; CPP</p>
                      <p>Not carry out construction work on a project unless satisfied that the client is aware of their duties and that a <strong className="text-white">construction phase plan (CPP)</strong> is in place for the project.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Information, Instructions &amp; Training</p>
                      <p>Provide each worker under their control with appropriate <strong className="text-white">supervision, instructions, and information</strong> so that construction work can be carried out without risks to health and safety.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Not Begin Without a Plan</p>
                      <p>Ensure that no work is started unless there are <strong className="text-white">reasonable steps</strong> to prevent access by unauthorised persons to the construction site.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-white font-medium">Welfare Facilities</p>
                      <p>Ensure that adequate <strong className="text-white">welfare facilities</strong> are provided for workers from the start of and throughout the construction phase. This includes toilets, washing facilities, rest areas, and drinking water.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-white font-medium">Cooperate &amp; Coordinate</p>
                      <p>Cooperate with the principal contractor (on projects with more than one contractor), comply with directions given by the principal contractor or principal designer, and comply with parts of the CPP relevant to their work.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Important:</strong> The duty to check
                  that the client is aware of their responsibilities and that a CPP exists
                  applies to <strong>every contractor</strong>, not just the principal
                  contractor. If you arrive on site and discover there is no construction
                  phase plan, you have a duty not to begin work until one is in place.
                </p>
              </div>

              <p>
                Contractors must also ensure that any <strong>worker under their control</strong>
                who needs training is given it. This is not limited to formal classroom training
                &mdash; it includes <strong>toolbox talks, site-specific inductions, task
                briefings, and on-the-job instruction</strong>. The training must be
                proportionate to the risk and the worker&rsquo;s existing level of competence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Contractor Checklist Before Starting Work</p>
                <p className="text-sm text-white/80">Before starting construction work on any project, ask yourself:</p>
                <ul className="text-sm text-white/80 space-y-1.5 mt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Is the client aware of their CDM duties?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Is there a construction phase plan for the project?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Have I planned, or can I plan, my own work safely?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Do my workers have the right information, instruction, and training?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Are adequate welfare facilities available?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Is the site secured against unauthorised access?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Worker Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">06</span>
            Worker Duties
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation 14(2)</strong> places specific duties on every worker
                involved in a construction project. These duties apply to
                <strong> all workers</strong> &mdash; whether they are employees,
                sub-contractors, self-employed, or agency workers. The duties are personal
                and cannot be delegated.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Worker Duties Under Regulation 14(2)</p>
                <div className="space-y-4 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Report Dangerous Conditions</p>
                      <p>A worker must report to the person on whose behalf they are working anything which they are aware is likely to <strong className="text-white">endanger their own health or safety or that of others</strong>. This includes unsafe conditions, defective equipment, near misses, and any situation that could lead to harm.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Cooperate with Duty Holders</p>
                      <p>A worker must <strong className="text-white">cooperate</strong> with any person working on the project who is carrying out duties under CDM or any other health and safety legislation. This means following reasonable instructions, attending briefings, and working constructively with site management.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Not Misuse Anything Provided for H&amp;S</p>
                      <p>A worker must not <strong className="text-white">interfere with or misuse</strong> anything provided in the interests of health, safety, or welfare. This includes PPE, safety barriers, warning signs, fire extinguishers, first aid equipment, and welfare facilities.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Take Reasonable Care</p>
                      <p>A worker must take <strong className="text-white">reasonable care</strong> of their own health and safety and that of others who may be affected by their actions or omissions at work. This is a personal duty &mdash; you cannot blame someone else for your own unsafe behaviour.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Personal Liability</p>
                </div>
                <p className="text-sm text-white/80">
                  Worker duties are <strong className="text-white">personal</strong>. An individual
                  worker can be prosecuted by the HSE for failing to comply with these duties. The
                  defence &ldquo;my employer told me to do it&rdquo; is not sufficient if you knew or
                  ought to have known that the action was dangerous. If you are instructed to carry out
                  work that you believe is unsafe, you have a <strong className="text-white">duty to
                  refuse and report it</strong>, not a duty to comply.
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Good Practice:</strong> Many of the most
                  effective safety improvements on construction sites come from workers
                  reporting issues &mdash; a loose scaffold fitting, a missing edge
                  protection board, a blocked fire exit. CDM formalises what good
                  tradespeople have always done: look out for each other and speak up when
                  something is not right.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Multiple Roles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">07</span>
            Multiple Roles
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 explicitly recognises that <strong>one person or organisation can
                hold more than one duty holder role</strong> on a project. This is common
                in practice, particularly on smaller projects and in design-and-build
                procurement.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Multiple-Role Scenarios</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Design-and-Build Contractor</p>
                      <p>Acts as both <strong className="text-white">designer</strong> and <strong className="text-white">contractor</strong>. If they are also the only or main contractor on a multi-contractor project, they may also be the <strong className="text-white">principal contractor</strong>. Three sets of duties apply.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Sole Electrician on a Small Project</p>
                      <p>An electrician who designs the installation, carries out the work, and is the only contractor on the project acts as <strong className="text-white">designer</strong>, <strong className="text-white">contractor</strong>, and <strong className="text-white">principal contractor</strong> (since there is only one contractor).</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Architect as Principal Designer and Designer</p>
                      <p>An architect appointed as principal designer also has designer duties for their own design work. They must fulfil <strong className="text-white">principal designer duties</strong> (Regulation 11) and <strong className="text-white">designer duties</strong> (Regulation 9) concurrently.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Client Who Also Carries Out the Work</p>
                      <p>A client (e.g., a property developer) who also has their own construction workforce acts as both <strong className="text-white">client</strong> and <strong className="text-white">contractor</strong>. Both sets of duties apply simultaneously.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CDM Roles Relationship Map */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-blue-400">CDM Roles Relationship Map</p>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Client at top */}
                    <div className="flex justify-center">
                      <div className="rounded-lg border-2 border-blue-500/40 bg-blue-500/10 px-4 py-2 text-center">
                        <p className="text-sm font-bold text-blue-400">Client</p>
                        <p className="text-xs text-white/60">Appoints all other duty holders</p>
                      </div>
                    </div>
                    {/* Arrow down */}
                    <div className="flex justify-center">
                      <div className="text-white/30 text-sm">&darr; appoints &darr;</div>
                    </div>
                    {/* PD and PC */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border-2 border-purple-500/40 bg-purple-500/10 px-3 py-2 text-center">
                        <p className="text-sm font-bold text-purple-400">Principal Designer</p>
                        <p className="text-xs text-white/60">Coordinates pre-construction</p>
                      </div>
                      <div className="rounded-lg border-2 border-orange-500/40 bg-orange-500/10 px-3 py-2 text-center">
                        <p className="text-sm font-bold text-orange-400">Principal Contractor</p>
                        <p className="text-xs text-white/60">Coordinates construction phase</p>
                      </div>
                    </div>
                    {/* Arrows down */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-center">
                        <div className="text-white/30 text-sm">&darr; coordinates &darr;</div>
                      </div>
                      <div className="flex justify-center">
                        <div className="text-white/30 text-sm">&darr; manages &darr;</div>
                      </div>
                    </div>
                    {/* Designers and Contractors */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border-2 border-green-500/40 bg-green-500/10 px-3 py-2 text-center">
                        <p className="text-sm font-bold text-green-400">Designers</p>
                        <p className="text-xs text-white/60">Eliminate &amp; reduce risk by design</p>
                      </div>
                      <div className="rounded-lg border-2 border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-center">
                        <p className="text-sm font-bold text-yellow-400">Contractors</p>
                        <p className="text-xs text-white/60">Plan, manage &amp; monitor work</p>
                      </div>
                    </div>
                    {/* Arrow to workers */}
                    <div className="flex justify-center">
                      <div className="text-white/30 text-sm">&darr; supervise &darr;</div>
                    </div>
                    {/* Workers */}
                    <div className="flex justify-center">
                      <div className="rounded-lg border-2 border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-center">
                        <p className="text-sm font-bold text-cyan-400">Workers</p>
                        <p className="text-xs text-white/60">Cooperate, report hazards, take care</p>
                      </div>
                    </div>
                    {/* Overlap note */}
                    <div className="mt-3 bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                      <p className="text-xs text-white/80 text-center">
                        <strong className="text-blue-400">Roles can overlap:</strong> A design-and-build contractor may be Designer + Contractor + Principal Contractor simultaneously. An electrician on a small project may be Designer + Contractor + Principal Contractor. All duties stack.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-blue-400">Critical Point:</strong> When duties
                  stack, they do <strong>not</strong> merge, cancel each other out, or reduce.
                  Every duty attached to every role must be fulfilled in full. A
                  design-and-build principal contractor has the <em>most</em> duties of any
                  party on the project, because they hold three roles simultaneously.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Competence & Training */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-500/80 text-sm font-normal">08</span>
            Competence &amp; Training
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                CDM 2015 requires that anyone appointed to carry out work on a construction
                project has the <strong>skills, knowledge, experience, and (where relevant)
                organisational capability</strong> necessary for the work. This applies to
                designers, contractors, principal designers, and principal contractors alike.
              </p>

              <p>
                Crucially, the regulations <strong>do not specify particular qualifications
                or competence schemes</strong>. There is no list of required certificates,
                no mandatory card scheme, and no prescribed training course. Instead, CDM
                takes a <strong>outcomes-based approach</strong>: the question is whether
                the person is genuinely capable of doing the work safely, not whether they
                hold a particular piece of paper.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Four Elements of Competence Under CDM</p>
                <div className="space-y-4 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white font-medium">Skills</p>
                      <p>The practical abilities needed for the work. For an electrician, this includes the hands-on skills to carry out wiring, testing, and commissioning safely and correctly. Skills are typically developed through formal training and practice.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white font-medium">Knowledge</p>
                      <p>Understanding of the relevant regulations, standards, risks, and control measures. For CDM purposes, this includes knowledge of the specific hazards associated with the type of construction work being undertaken &mdash; not just general health and safety awareness.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white font-medium">Experience</p>
                      <p>A relevant track record in similar work. A newly qualified person may have the skills and knowledge but lack the experience to recognise unusual risks or make sound judgements in unfamiliar situations. Experience can be built through supervised work and mentoring.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[28px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white font-medium">Organisational Capability</p>
                      <p>For organisations (not individuals), the capacity to manage the work safely. This includes having adequate resources (people, equipment, time), management systems for health and safety, supervision arrangements, and procedures for dealing with emergencies.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">CSCS/ECS Cards &mdash; The Reality</p>
                <p className="text-sm text-white/80 mb-3">
                  The <strong className="text-white">Construction Skills Certification Scheme (CSCS)</strong>
                  and the <strong className="text-white">Electrotechnical Certification Scheme (ECS)</strong>
                  are widely used across the UK construction industry as evidence of competence. Most
                  principal contractors require workers to hold a valid card before they will be permitted
                  on site. However, the legal position is clear:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Not mandatory under CDM</strong> &mdash; the regulations do not require any specific card or certification scheme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Evidence, not proof</strong> &mdash; holding a card provides evidence of competence but does not guarantee it. A worker who holds a card but lacks the specific skills for the task at hand is not competent for that work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Industry standard</strong> &mdash; while not a legal CDM requirement, cards are a de facto requirement on most commercial construction sites. The Major Contractors Group and Build UK both require CSCS cards for site access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Part of the picture</strong> &mdash; a CSCS/ECS card should be considered alongside references, qualifications, method statements, and previous work history when assessing competence</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Continuing Professional Development (CPD)</p>
                <p className="text-sm text-white/80 mb-3">
                  Competence is not a one-off achievement &mdash; it must be <strong className="text-white">
                  maintained and developed</strong> throughout a person&rsquo;s career. Regulations,
                  standards, materials, techniques, and technology all change over time. A person who
                  was competent five years ago may not be competent today if they have not kept their
                  knowledge and skills up to date.
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Formal CPD</strong> &mdash; structured courses, seminars, conferences, and qualifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">Informal CPD</strong> &mdash; reading trade publications, attending manufacturer briefings, learning from colleagues, self-study</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">On-the-job learning</strong> &mdash; exposure to new types of work, mentoring, supervised practice on unfamiliar tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span><strong className="text-white">ECS card renewal</strong> &mdash; requires evidence of CPD and a current health and safety test, helping to ensure ongoing competence</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Duty on the Appointer</p>
                </div>
                <p className="text-sm text-white/80">
                  The duty to check competence falls on <strong className="text-white">the person
                  making the appointment</strong>, not on the person being appointed. If a client
                  appoints a contractor who turns out to be incompetent, the client has failed in
                  their duty. If a principal contractor appoints a sub-contractor who lacks the
                  necessary skills, the principal contractor has failed. Asking for a CSCS card is
                  not enough &mdash; the appointer must make <strong className="text-white">reasonable
                  enquiries</strong> to satisfy themselves that the appointee is genuinely capable.
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
          title="Section 4 Knowledge Check"
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
            <Link to="../cdm-regulations-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Principal Contractor
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-3">
              Next: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
