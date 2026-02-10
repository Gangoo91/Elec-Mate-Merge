import {
  ArrowLeft,
  CheckCircle,
  Scale,
  AlertTriangle,
  HardHat,
  Home,
  Zap,
  ClipboardList,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cdm-m1s4-single-contractor",
    question:
      "On a single contractor project, which duty holder roles are NOT required?",
    options: [
      "Client and contractor",
      "Principal designer and principal contractor",
      "Designer and worker",
      "Contractor and designer",
    ],
    correctIndex: 1,
    explanation:
      "On a single contractor project — where only one contractor will carry out the construction work — there is no requirement to appoint a principal designer (PD) or principal contractor (PC). The client still has duties, and the single contractor takes on additional responsibilities that would otherwise fall to the PC. This is the simplest CDM scenario and applies to many small electrical jobs where only one contracting firm is involved.",
  },
  {
    id: "cdm-m1s4-notifiable-threshold",
    question:
      "A project is notifiable to the HSE when it exceeds which of the following thresholds?",
    options: [
      "More than 10 working days with more than 5 workers at any one time",
      "More than 30 working days with more than 20 workers at any one time, OR more than 500 person-days",
      "More than 60 working days regardless of the number of workers",
      "Any project with a value exceeding £250,000",
    ],
    correctIndex: 1,
    explanation:
      "A project is notifiable to the HSE when it will last more than 30 working days AND have more than 20 workers working simultaneously at any point, OR when the project exceeds 500 person-days of construction work in total. The notification is made using an F10 form, which must be submitted to the HSE as soon as practicable before the construction phase begins. The F10 must also be displayed on site.",
  },
  {
    id: "cdm-m1s4-domestic-duties",
    question:
      "On a domestic project with a single contractor, who takes on the domestic client's CDM duties?",
    options: [
      "The Health and Safety Executive (HSE)",
      "The local authority building control officer",
      "The contractor carrying out the work",
      "The domestic client retains all duties regardless",
    ],
    correctIndex: 2,
    explanation:
      "Under CDM 2015, a domestic client's duties automatically transfer to the contractor on a single contractor project, or to the principal contractor where there are multiple contractors. This recognises that domestic clients (homeowners) cannot reasonably be expected to understand and discharge complex CDM duties. However, a domestic client can choose to appoint a principal designer in writing, in which case the PD takes on the client duties instead.",
  },
];

const faqs = [
  {
    question:
      "Does CDM apply to a simple like-for-like socket replacement in a commercial property?",
    answer:
      "Yes. CDM 2015 applies to ALL construction projects with no minimum size or threshold. A like-for-like socket replacement in a commercial property is construction work, and CDM applies. However, the regulations are applied proportionately — for a simple task like this, the requirements are minimal. The client must provide pre-construction information, and the contractor must plan, manage, and monitor the work to ensure it is carried out safely. There is no requirement for a written construction phase plan for such a straightforward task, but the contractor must still manage the risks appropriately.",
  },
  {
    question:
      "What happens if the client fails to appoint a PD and PC on a multi-contractor project?",
    answer:
      "If the client fails to make the required appointments on a project involving more than one contractor, the client is in breach of CDM 2015. The HSE can take enforcement action against the client, which may include improvement notices, prohibition notices, or prosecution. Crucially, the duties that should have been allocated to the PD and PC do not simply disappear — they default back to the client, who must then discharge them. This often means the client unknowingly carries significant legal liabilities. Contractors and designers working on such projects should raise the issue with the client and, if necessary, refuse to proceed until proper appointments are made.",
  },
  {
    question:
      "Can a verbal appointment of a principal designer be considered valid?",
    answer:
      "No. CDM 2015 explicitly requires that the appointments of the principal designer and principal contractor must be made IN WRITING. A verbal appointment is not legally valid under the regulations. The written appointment should clearly identify the role, the scope of the appointment, and when it takes effect. This requirement exists so there is no ambiguity about who holds these critical safety roles, and so the arrangement can be evidenced in the event of an investigation or enforcement action.",
  },
  {
    question:
      "As an electrician, do I need to worry about CDM if I am just a subcontractor?",
    answer:
      "Absolutely. Every contractor working on a construction project has duties under CDM 2015, regardless of whether they are the main contractor or a subcontractor. As a contractor, you must: plan, manage, and monitor your own work to ensure it is carried out safely; provide workers with appropriate information, instruction, and training; not begin work unless satisfied that the client is aware of their duties; cooperate with the principal contractor and other contractors; and comply with any directions given by the principal contractor. Ignorance of CDM is never a defence — every electrician should understand how the regulations affect their day-to-day work.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "CDM 2015 applies to which of the following?",
    options: [
      "Only commercial construction projects valued over £10,000",
      "Only projects lasting more than 30 working days",
      "All construction projects, regardless of size, duration, or value",
      "Only projects where more than one contractor is involved",
    ],
    correctAnswer: 2,
    explanation:
      "CDM 2015 applies to ALL construction projects with no minimum size, duration, or value threshold. From hanging a single door to building a skyscraper, CDM applies. The key principle is proportionate application — the level of planning, management, and documentation required is proportionate to the size, complexity, and risk of the project.",
  },
  {
    id: 2,
    question:
      "On a project with more than one contractor, who must the client appoint IN WRITING before the construction phase begins?",
    options: [
      "A CDM coordinator and a site safety officer",
      "A principal designer and a principal contractor",
      "A health and safety consultant and an architect",
      "A project manager and a clerk of works",
    ],
    correctAnswer: 1,
    explanation:
      "On any project involving more than one contractor, the client must appoint a principal designer (PD) and a principal contractor (PC) in writing. These appointments must be made as soon as practicable and before the construction phase begins. The PD coordinates health and safety during the pre-construction phase, while the PC manages health and safety during the construction phase. Failure to make these appointments is a breach of CDM 2015.",
  },
  {
    id: 3,
    question: "Which form is used to notify the HSE about a notifiable project?",
    options: [
      "Form F2508 (RIDDOR report)",
      "Form F10 (CDM notification)",
      "Form F9 (asbestos notification)",
      "Form EIC (Electrical Installation Certificate)",
    ],
    correctAnswer: 1,
    explanation:
      "The F10 form is used to notify the HSE about a notifiable construction project. It must be submitted as soon as practicable before the construction phase begins and must include details such as the project address, client details, PD and PC details, start date, planned duration, and the estimated maximum number of workers. A copy of the F10 notification must be displayed on site throughout the construction phase.",
  },
  {
    id: 4,
    question:
      "A project involves 25 workers on site for 35 working days. Is this project notifiable?",
    options: [
      "No — it does not meet either notification threshold",
      "Yes — it exceeds 30 working days with more than 20 workers at any one time",
      "Only if the project value exceeds £500,000",
      "Only if the work involves demolition",
    ],
    correctAnswer: 1,
    explanation:
      "This project IS notifiable because it meets the first threshold: more than 30 working days (35 days) with more than 20 workers working simultaneously at any point (25 workers). Remember, the thresholds are: >30 working days with >20 workers at any one time, OR >500 person-days total. Only ONE threshold needs to be exceeded for the project to be notifiable.",
  },
  {
    id: 5,
    question:
      "On a domestic project with multiple contractors, who takes on the domestic client's CDM duties?",
    options: [
      "The principal designer",
      "The principal contractor",
      "The local building control inspector",
      "The domestic client retains all duties",
    ],
    correctAnswer: 1,
    explanation:
      "On a domestic project with multiple contractors, the domestic client's duties automatically transfer to the principal contractor. This recognises that domestic clients cannot reasonably be expected to understand and discharge CDM duties. The exception is where the domestic client chooses to appoint a principal designer in writing — in that case, the PD takes on the client duties instead of the PC.",
  },
  {
    id: 6,
    question:
      "An electrician is rewiring a house as a sole contractor. Which statement is correct?",
    options: [
      "CDM does not apply because it is a domestic property",
      "CDM applies, the electrician is the sole contractor and takes on additional duties, and the domestic client's duties transfer to the electrician",
      "CDM applies but only if the rewire takes more than 30 days",
      "CDM only applies if the electrician employs more than 5 workers",
    ],
    correctAnswer: 1,
    explanation:
      "CDM applies to ALL construction work, including domestic properties. As the sole contractor on a domestic project, the electrician takes on additional contractor duties AND the domestic client's duties automatically transfer to them. This means the electrician is responsible for planning, managing, and monitoring the work safely, ensuring adequate welfare facilities are available, and preparing a proportionate construction phase plan. CDM does not require the work to exceed any duration or worker threshold to apply.",
  },
  {
    id: 7,
    question: "Which of the following is a common mistake regarding CDM compliance?",
    options: [
      "Appointing the PD and PC at the start of the project",
      "Submitting the F10 notification before the construction phase begins",
      "Assuming CDM does not apply to small works or maintenance tasks",
      "Providing pre-construction information to designers and contractors",
    ],
    correctAnswer: 2,
    explanation:
      "One of the most common CDM mistakes is assuming the regulations do not apply to small works or maintenance tasks. CDM 2015 applies to ALL construction projects with no minimum size. Other common mistakes include failing to appoint PD/PC in writing, making appointments too late (after construction has started), not notifying the HSE when thresholds are exceeded, and treating CDM as a paperwork exercise rather than genuinely managing health and safety risks.",
  },
  {
    id: 8,
    question:
      "A maintenance contract involves a team of 4 electricians working across 15 commercial sites over 12 months. How does CDM apply?",
    options: [
      "CDM does not apply because it is maintenance, not construction",
      "CDM applies to the overall contract but each site visit is assessed individually for PD/PC and notification requirements",
      "CDM only applies if each site visit lasts more than 30 days",
      "The client only needs to appoint a PD — no PC is required for maintenance",
    ],
    correctAnswer: 1,
    explanation:
      "CDM applies to maintenance work because it falls within the definition of construction work under the regulations. For a multi-site maintenance contract, CDM applies to the overall arrangement, but each individual site or project within the contract must be assessed on its own merits for PD/PC appointments and notification requirements. If any individual site involves more than one contractor, PD and PC appointments are needed for that site. The overall client must still provide pre-construction information for each site.",
  },
];

export default function CdmRegulationsModule1Section4() {
  useSEO({
    title: "When CDM Applies | CDM Regulations Module 1.4",
    description:
      "When CDM 2015 applies, project types, single and multiple contractor scenarios, notifiable projects, domestic projects, electrical work under CDM, worked examples, and common mistakes.",
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
            <Link to="../cdm-regulations-module-1">
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
            <Scale className="h-7 w-7 text-blue-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 mx-auto">
            <span className="text-blue-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            When CDM Applies
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding which projects CDM applies to, single and multiple contractor scenarios,
            notification thresholds, domestic projects, and how CDM affects everyday electrical work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>CDM applies to ALL projects</strong> &mdash; no minimum size</li>
              <li><strong>&gt;1 contractor:</strong> Must appoint PD + PC in writing</li>
              <li><strong>Notifiable:</strong> &gt;30 days/20 workers OR &gt;500 person-days</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
            <p className="text-blue-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Domestic:</strong> Client duties transfer to contractor/PC</li>
              <li><strong>Electrical:</strong> Rewires, new installs &amp; maintenance all count</li>
              <li><strong>F10 form:</strong> Notify HSE &amp; display on site</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why CDM applies to all construction projects regardless of size",
              "Describe the requirements for single contractor projects",
              "Identify when a principal designer and principal contractor must be appointed",
              "State the thresholds that make a project notifiable to the HSE",
              "Explain how domestic client duties transfer under CDM 2015",
              "Apply CDM requirements to common electrical work scenarios",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: CDM Applies to ALL Construction Projects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            CDM Applies to ALL Construction Projects
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important things to understand about CDM 2015 is that it applies to
                <strong> every construction project</strong>, without exception. There is no minimum size,
                no minimum duration, no minimum number of workers, and no minimum cost. From hanging a
                single door to building a skyscraper, CDM applies.
              </p>

              <p>
                This is a deliberate design principle of the 2015 regulations. The previous CDM 2007
                regulations had a notification threshold but still applied to all projects &mdash; CDM 2015
                simply made this explicit and removed any ambiguity. The regulations are intended to be
                applied <strong>proportionately</strong>, meaning the level of planning, management, and
                documentation expected is scaled to match the size, complexity, and risk of the project.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Proportionate Application</p>
                </div>
                <p className="text-sm text-white/80">
                  &ldquo;Proportionate&rdquo; means the effort and formality of CDM compliance should match
                  the risk. A full rewire of a commercial building requires detailed planning, a written
                  construction phase plan, and formal appointments. Replacing a light fitting in a small
                  office still requires CDM awareness, but the &ldquo;plan&rdquo; may simply be the
                  electrician&rsquo;s own mental assessment of the risks and the steps to control them.
                  <strong className="text-white"> The regulations never require disproportionate bureaucracy
                  for low-risk work.</strong>
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Counts as Construction Work?</p>
                <p className="text-sm text-white/60 mb-3">
                  As covered in Section 3, &ldquo;construction work&rdquo; under CDM 2015 includes:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "New builds, extensions, and conversions",
                    "Renovation, repair, and refurbishment",
                    "Installation of mechanical and electrical services",
                    "Maintenance of structures (including electrical systems)",
                    "Demolition and dismantling",
                    "Site clearance and preparation",
                    "Painting and decorating",
                    "Temporary works (scaffolding, formwork)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-2">The Key Principle</p>
                <p className="text-sm text-white/80">
                  If the work falls within the definition of construction work &mdash; and virtually all
                  electrical installation, maintenance, and repair work does &mdash; then CDM applies. The
                  question is never <em>&ldquo;Does CDM apply?&rdquo;</em> but rather
                  <em>&ldquo;What level of CDM compliance is proportionate to this project?&rdquo;</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Single Contractor Projects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">02</span>
            Single Contractor Projects
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The simplest CDM scenario is a project where only <strong>one contractor</strong> carries
                out the construction work. This is common in electrical work &mdash; a single electrical
                contractor engaged to rewire a property, install a new distribution board, or carry out
                periodic testing and maintenance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Single Contractor Project Structure</p>
                <div className="flex flex-col items-center gap-0 max-w-sm mx-auto">
                  <div className="w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-blue-300">Client</p>
                    <p className="text-xs text-white/60">Commissions the project</p>
                  </div>

                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-blue-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-400/60" />
                  </div>

                  <div className="w-full bg-blue-500/15 border border-blue-500/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-blue-300">Single Contractor</p>
                    <p className="text-xs text-white/60">Plans, manages &amp; carries out the work</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                      <span className="text-[10px] text-blue-300 font-medium">Takes on additional duties</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/40 text-center mt-4">
                  No PD or PC appointment required
                </p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-2">What the Single Contractor Must Do</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Plan, manage, and monitor the construction work to ensure it is carried out safely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Ensure adequate welfare facilities are available for workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Prepare a proportionate <strong className="text-white">construction phase plan</strong> (CPP) before work begins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Provide workers with appropriate information, instruction, and training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Not begin work until satisfied the client is aware of their duties</span>
                  </li>
                </ul>
              </div>

              <p>
                Because there is only one contractor, there is no need to appoint a principal designer
                or principal contractor &mdash; those roles only exist to coordinate multiple duty holders.
                The single contractor effectively absorbs the coordination responsibilities.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Projects with More Than One Contractor */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">03</span>
            Projects with More Than One Contractor
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a construction project involves <strong>more than one contractor</strong>, the
                complexity increases significantly. Multiple trades working on the same site creates
                interface risks &mdash; one contractor&rsquo;s work can create hazards for another. CDM 2015
                addresses this by requiring the client to appoint two key coordination roles.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Mandatory Written Appointments</p>
                </div>
                <p className="text-sm text-white/80">
                  The client <strong className="text-white">must</strong> appoint a <strong className="text-white">principal
                  designer (PD)</strong> and a <strong className="text-white">principal contractor (PC)</strong> in
                  writing. These appointments must be made <strong className="text-white">as soon as practicable
                  and before the construction phase begins</strong>. A verbal appointment is not valid.
                </p>
              </div>

              {/* Multi-contractor project structure diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-4 text-center">Multi-Contractor Project Structure</p>

                <div className="flex flex-col items-center gap-0 max-w-md mx-auto">
                  {/* Client */}
                  <div className="w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-blue-300">Client</p>
                    <p className="text-xs text-white/60">Appoints PD &amp; PC in writing</p>
                  </div>

                  {/* Branch arrows */}
                  <div className="flex w-full justify-center gap-16 sm:gap-24 py-1">
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-blue-400/40" />
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-400/60" />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-blue-400/40" />
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-400/60" />
                    </div>
                  </div>

                  {/* PD and PC side by side */}
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="bg-blue-500/15 border border-blue-500/40 rounded-lg p-3 text-center">
                      <p className="text-sm font-medium text-blue-300">Principal Designer</p>
                      <p className="text-xs text-white/60">Pre-construction phase coordination</p>
                    </div>
                    <div className="bg-blue-500/15 border border-blue-500/40 rounded-lg p-3 text-center">
                      <p className="text-sm font-medium text-blue-300">Principal Contractor</p>
                      <p className="text-xs text-white/60">Construction phase coordination</p>
                    </div>
                  </div>

                  {/* Arrow down from PC */}
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-blue-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-400/60" />
                  </div>

                  {/* Contractors row */}
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-xs font-medium text-white/80">Contractor A</p>
                      <p className="text-[10px] text-white/50">e.g. Electrician</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-xs font-medium text-white/80">Contractor B</p>
                      <p className="text-[10px] text-white/50">e.g. Plumber</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                      <p className="text-xs font-medium text-white/80">Contractor C</p>
                      <p className="text-[10px] text-white/50">e.g. Builder</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4">
                  PD coordinates design risk &mdash; PC coordinates on-site health &amp; safety
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Requirements for Multi-Contractor Projects</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>PD and PC must be appointed <strong className="text-white">in writing</strong> &mdash; verbal appointments are not valid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Appointments must be made <strong className="text-white">before the construction phase begins</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The PD must be an organisation or individual with <strong className="text-white">sufficient knowledge, experience, and ability</strong> for the role</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>The PC must have <strong className="text-white">the skills, knowledge, experience, and organisational capability</strong> to manage the construction phase safely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>All contractors must <strong className="text-white">cooperate</strong> with the PC and comply with site rules</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Notifiable Projects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">04</span>
            Notifiable Projects
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Certain larger projects must be <strong>notified to the Health and Safety Executive (HSE)</strong> before
                the construction phase begins. Notification is triggered when the project exceeds specific
                thresholds for duration and workforce size.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">Notification Thresholds</p>
                <p className="text-sm text-white/60 mb-3">
                  A project is notifiable if <strong className="text-white">EITHER</strong> threshold is exceeded:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-400">Threshold 1</p>
                    <p className="text-sm text-white mt-2">
                      More than <strong>30 working days</strong> with more than <strong>20 workers</strong> working simultaneously at any one time
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-400">Threshold 2</p>
                    <p className="text-sm text-white mt-2">
                      More than <strong>500 person-days</strong> of construction work in total
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Is a Person-Day?</p>
                <p className="text-sm text-white/80 mb-3">
                  A person-day is one individual working for one normal working day. For example:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>10 workers for 50 days = 500 person-days (notifiable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>5 workers for 100 days = 500 person-days (notifiable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>3 workers for 80 days = 240 person-days (not notifiable under this threshold)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">The F10 Notification</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The notification is made using an <strong className="text-white">F10 form</strong>, submitted
                  to the HSE as soon as practicable before the construction phase begins. The F10 must include:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Project address and description of the work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Client name and contact details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Principal designer and principal contractor details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Planned start date and expected duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Estimated maximum number of workers on site at any one time</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Site Display Requirement</p>
                </div>
                <p className="text-sm text-white/80">
                  A copy of the F10 notification (or the details contained within it) must be
                  <strong className="text-white"> displayed on site</strong> throughout the construction phase.
                  This is typically posted in the site office or on the health and safety notice board where
                  all workers can see it. The F10 can now be submitted electronically via the HSE website.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Domestic Projects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">05</span>
            Domestic Projects
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>domestic client</strong> is anyone who has construction work carried out on their
                own home (or the home of a family member) and who does not do so in connection with a
                business. Most homeowners commissioning electrical work are domestic clients. CDM 2015
                still applies to domestic projects, but the regulations recognise that homeowners cannot
                reasonably be expected to understand and fulfil complex CDM duties.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Automatic Transfer of Duties</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  On domestic projects, the client&rsquo;s CDM duties <strong className="text-white">automatically
                  transfer</strong> to the professionals carrying out the work:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-300 mb-1">Single Contractor</p>
                    <p className="text-xs text-white/70">
                      Client duties transfer to the <strong className="text-white">contractor</strong>
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-300 mb-1">Multiple Contractors</p>
                    <p className="text-xs text-white/70">
                      Client duties transfer to the <strong className="text-white">principal contractor</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Exception: Appointing a PD in Writing</p>
                <p className="text-sm text-white/80 mb-3">
                  A domestic client can choose to appoint a <strong className="text-white">principal designer in
                  writing</strong>. If they do so, the client duties transfer to the PD instead of the
                  contractor or PC. This is the only way a domestic client can redirect the transfer of
                  duties. Common scenarios where this occurs include:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Large domestic extensions managed by an architect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Complex renovations with a project manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>New-build domestic properties with a design team</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Practical Impact for Electricians</p>
                </div>
                <p className="text-sm text-white/80">
                  When you are the sole electrical contractor working on a domestic property, the
                  homeowner&rsquo;s CDM duties transfer to <strong className="text-white">you</strong>. This
                  means you are responsible for planning, managing, and monitoring the work safely. You
                  should still communicate risks to the homeowner and ensure they understand any
                  restrictions during the work (e.g. areas of the house that must not be accessed).
                  You are also responsible for ensuring adequate welfare facilities are available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Electrical Work Under CDM */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">06</span>
            Electrical Work Under CDM
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical installation, maintenance, and repair work falls squarely within the
                CDM definition of &ldquo;construction work&rdquo;. This means virtually every task an
                electrician carries out is subject to CDM 2015. Understanding how CDM applies to
                common electrical scenarios is essential for compliance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Common Electrical Scenarios</p>
                </div>

                <div className="space-y-4">
                  {/* Rewires */}
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-300 mb-2">Full Rewires</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Always construction work under CDM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>If you are the sole contractor: no PD/PC needed, but you hold all contractor duties plus transferred client duties (if domestic)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>If other trades are involved (plasterer, decorator): PD and PC must be appointed in writing</span>
                      </li>
                    </ul>
                  </div>

                  {/* New installations */}
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-300 mb-2">New Installations (Part of a Larger Project)</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Typically part of a multi-contractor project (new build, extension, refurbishment)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>PD and PC must already be appointed by the client</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>As a contractor, you must cooperate with the PC and follow site rules</span>
                      </li>
                    </ul>
                  </div>

                  {/* Maintenance */}
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-300 mb-2">Maintenance &amp; Periodic Testing</p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Maintenance of electrical systems IS construction work under CDM</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Periodic inspection and testing: CDM applies, but proportionately &mdash; a brief risk assessment and safe system of work is usually sufficient</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Ongoing maintenance contracts: each site visit is assessed individually</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">When Are PD/PC Appointments Needed for Electrical Work?</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] text-green-400 font-bold">NO</span>
                    </div>
                    <div className="text-sm text-white/80">
                      <strong className="text-white">Single electrical contractor only</strong> &mdash; you are the only firm on the project. No PD or PC needed.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] text-red-400 font-bold">YES</span>
                    </div>
                    <div className="text-sm text-white/80">
                      <strong className="text-white">You plus any other contractor</strong> &mdash; e.g. electrician + plumber, electrician + builder, electrician + decorator. PD and PC must be appointed in writing.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">07</span>
            Worked Examples
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Applying CDM correctly requires understanding how the requirements map to real-world
                projects. The following worked examples illustrate how CDM 2015 applies to a range of
                common scenarios that electricians encounter.
              </p>

              <div className="space-y-4">
                {/* Example 1: Office Refurbishment */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HardHat className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Example 1: Office Refurbishment</p>
                  </div>
                  <p className="text-sm text-white/60 mb-3">
                    A landlord is refurbishing 3 floors of a commercial office building. The project involves
                    an electrical contractor, a plumbing contractor, a joinery firm, and a painting contractor.
                    The work will take 8 weeks with up to 15 workers on site at any time.
                  </p>
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg space-y-2">
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">CDM applies:</strong> Yes &mdash; construction work</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Multiple contractors:</strong> Yes &mdash; PD and PC must be appointed in writing</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Notifiable:</strong> No &mdash; 40 working days but only 15 workers (needs &gt;20 for threshold 1), and 15 &times; 40 = 600 person-days &mdash; wait, this IS notifiable under threshold 2 (&gt;500 person-days)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Actions:</strong> Client appoints PD + PC in writing, submits F10 to HSE, PC prepares construction phase plan, F10 displayed on site</span>
                    </div>
                  </div>
                </div>

                {/* Example 2: House Extension */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Example 2: House Extension</p>
                  </div>
                  <p className="text-sm text-white/60 mb-3">
                    A homeowner is having a single-storey kitchen extension built. The project involves a
                    builder, an electrician, and a plumber. The work will take 6 weeks with up to 5 workers.
                  </p>
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg space-y-2">
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">CDM applies:</strong> Yes</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Domestic client:</strong> Yes &mdash; duties transfer to PC</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Multiple contractors:</strong> Yes &mdash; PD and PC must be appointed in writing (likely the builder as PC)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Notifiable:</strong> No &mdash; 30 working days and 5 workers (5 &times; 30 = 150 person-days)</span>
                    </div>
                  </div>
                </div>

                {/* Example 3: New Build Commercial */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HardHat className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Example 3: New Build Commercial Unit</p>
                  </div>
                  <p className="text-sm text-white/60 mb-3">
                    A developer is building a new retail unit. Multiple trades over 6 months, up to 30 workers
                    on site at peak times.
                  </p>
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg space-y-2">
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">CDM applies:</strong> Yes</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Multiple contractors:</strong> Yes &mdash; PD and PC appointed in writing</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Notifiable:</strong> Yes &mdash; exceeds both thresholds (&gt;30 days with &gt;20 workers, and well over 500 person-days)</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Full CDM:</strong> F10 submitted, health and safety file maintained, detailed construction phase plan, site inductions for all workers</span>
                    </div>
                  </div>
                </div>

                {/* Example 4: Maintenance Contract */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Example 4: Electrical Maintenance Contract</p>
                  </div>
                  <p className="text-sm text-white/60 mb-3">
                    An electrical contractor holds a maintenance contract for 20 commercial properties.
                    A single electrician attends each site for periodic testing and minor repairs.
                  </p>
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg space-y-2">
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">CDM applies:</strong> Yes &mdash; maintenance IS construction work</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Single contractor per site:</strong> No PD/PC needed at each site</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Notifiable:</strong> No &mdash; individual site visits are short with one worker</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Proportionate:</strong> Risk assessment, safe system of work, pre-construction information from each client</span>
                    </div>
                  </div>
                </div>

                {/* Example 5: Emergency Repair */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">Example 5: Emergency Repair</p>
                  </div>
                  <p className="text-sm text-white/60 mb-3">
                    A factory calls out an electrician to repair a failed distribution board that has shut
                    down production. The work is urgent and completed in one day.
                  </p>
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg space-y-2">
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">CDM applies:</strong> Yes &mdash; even emergency work is construction work</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Proportionate:</strong> Dynamic risk assessment, safe isolation, permit to work if required</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Key point:</strong> Urgency does not remove CDM obligations &mdash; safety must not be compromised because the work is &ldquo;urgent&rdquo;</span>
                    </div>
                  </div>
                </div>

                {/* Example 6: Demolition */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HardHat className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Example 6: Demolition Project</p>
                  </div>
                  <p className="text-sm text-white/60 mb-3">
                    An electrician is engaged to disconnect and make safe all electrical services before
                    a building is demolished. A demolition contractor will carry out the demolition.
                  </p>
                  <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg space-y-2">
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">CDM applies:</strong> Yes &mdash; demolition is specifically listed as construction work</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">Multiple contractors:</strong> Yes &mdash; electrician + demolition contractor, so PD and PC required</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle className="h-4 w-4 text-blue-400/70 mt-0.5 flex-shrink-0" />
                      <span><strong className="text-white">High risk:</strong> Demolition work requires detailed planning, sequencing, and a construction phase plan that specifically addresses the demolition methodology and service disconnections</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-blue-400/80 text-sm font-normal">08</span>
            Common Mistakes
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Despite CDM 2015 being in force for over a decade, many of the same mistakes are repeated
                across the construction industry. Understanding these common pitfalls helps you avoid them
                and ensure genuine compliance rather than a tick-box approach.
              </p>

              <div className="space-y-4">
                {/* Mistake 1 */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Failing to Appoint PD/PC in Writing</p>
                  </div>
                  <p className="text-sm text-white/80">
                    The most common breach is clients failing to appoint a principal designer and principal
                    contractor in writing on multi-contractor projects. Verbal agreements, assumptions, and
                    &ldquo;I thought the builder was doing that&rdquo; are not valid. The appointment must be
                    a clear, written document identifying the role, the appointee, and the scope. Without
                    written appointments, duties default back to the client, who often has no idea they are
                    carrying them.
                  </p>
                </div>

                {/* Mistake 2 */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Late Appointments</p>
                  </div>
                  <p className="text-sm text-white/80">
                    The PD and PC must be appointed <strong className="text-white">before the construction phase
                    begins</strong>. Appointing them after work has started &mdash; or worse, retrospectively
                    when an HSE inspector visits &mdash; is a breach. The PD needs to be involved during the
                    design phase to influence design decisions and coordinate pre-construction information.
                    Appointing them after design is complete defeats the purpose.
                  </p>
                </div>

                {/* Mistake 3 */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Assuming CDM Doesn&rsquo;t Apply to Small Works</p>
                  </div>
                  <p className="text-sm text-white/80">
                    &ldquo;It&rsquo;s only a small job&rdquo; is never a valid reason to ignore CDM. The
                    regulations apply to <strong className="text-white">all</strong> construction projects.
                    Many electricians incorrectly believe CDM only applies to large commercial projects or
                    projects that are notifiable. The proportionate approach means small jobs need less
                    paperwork, but the fundamental duties still apply. Even replacing a single socket in a
                    commercial property triggers CDM &mdash; the compliance is simply proportionate to the risk.
                  </p>
                </div>

                {/* Mistake 4 */}
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Not Notifying the HSE</p>
                  </div>
                  <p className="text-sm text-white/80">
                    When a project exceeds the notification thresholds, the F10 must be submitted to the
                    HSE before the construction phase begins. Failure to notify is an offence. Common errors
                    include: not calculating person-days correctly, forgetting to count all contractors and
                    subcontractors towards the worker threshold, and not updating the F10 when project details
                    change (e.g. the PC is replaced, or the duration extends significantly).
                  </p>
                </div>

                {/* Mistake 5 */}
                <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">Paperwork Without Substance</p>
                  </div>
                  <p className="text-sm text-white/80">
                    Perhaps the most insidious mistake is treating CDM as a <strong className="text-white">paperwork
                    exercise</strong> rather than a genuine health and safety management system. Having a
                    construction phase plan that sits in a folder, a health and safety file that nobody reads,
                    and PD/PC appointments that are made but never acted upon provides no real protection.
                    CDM is about <strong className="text-white">actively managing risks</strong> &mdash; the
                    documents should reflect real planning, real communication, and real coordination.
                    An inspector will quickly identify whether compliance is genuine or merely documentary.
                  </p>
                </div>
              </div>

              {/* CDM Application Decision Flowchart */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-4 text-center">CDM Application Decision Flowchart</p>

                <div className="flex flex-col items-center gap-0 max-w-sm mx-auto">
                  {/* Start */}
                  <div className="w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-blue-300">Is it construction work?</p>
                    <p className="text-xs text-white/60">(Installation, maintenance, repair, demolition, etc.)</p>
                  </div>

                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-4 bg-blue-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-400/60" />
                    <span className="text-[10px] text-green-400 font-medium">YES</span>
                  </div>

                  <div className="w-full bg-blue-500/15 border border-blue-500/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-blue-300">CDM applies</p>
                    <p className="text-xs text-white/60">How many contractors?</p>
                  </div>

                  {/* Branch */}
                  <div className="grid grid-cols-2 gap-3 w-full mt-2">
                    {/* Single contractor path */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-white/50">1 contractor</span>
                      <div className="w-0.5 h-3 bg-blue-400/40" />
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-blue-400/60" />
                      <div className="w-full bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-green-300">No PD/PC needed</p>
                        <p className="text-[10px] text-white/50">Contractor takes on additional duties</p>
                      </div>
                    </div>

                    {/* Multiple contractor path */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-white/50">&gt;1 contractor</span>
                      <div className="w-0.5 h-3 bg-blue-400/40" />
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-blue-400/60" />
                      <div className="w-full bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-red-300">PD + PC required</p>
                        <p className="text-[10px] text-white/50">Appointed in writing by client</p>
                      </div>
                    </div>
                  </div>

                  {/* Notification check */}
                  <div className="flex flex-col items-center py-2 mt-2">
                    <div className="w-0.5 h-4 bg-blue-400/40" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-400/60" />
                  </div>

                  <div className="w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-blue-300">Exceeds notification thresholds?</p>
                    <p className="text-xs text-white/60">&gt;30 days/20 workers OR &gt;500 person-days</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full mt-2">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-white/50">NO</span>
                      <div className="w-0.5 h-3 bg-blue-400/40" />
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-blue-400/60" />
                      <div className="w-full bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-green-300">Not notifiable</p>
                        <p className="text-[10px] text-white/50">CDM still applies proportionately</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-white/50">YES</span>
                      <div className="w-0.5 h-3 bg-blue-400/40" />
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-blue-400/60" />
                      <div className="w-full bg-orange-500/10 border border-orange-500/30 rounded-lg p-2 text-center">
                        <p className="text-xs font-medium text-orange-300">Notifiable</p>
                        <p className="text-[10px] text-white/50">Submit F10 to HSE &amp; display on site</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4">
                  CDM always applies &mdash; the question is what level of compliance is proportionate
                </p>
              </div>

              {/* Project Type Requirements Comparison Table */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-blue-500/10 border-b border-white/10 p-3">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Project Type Requirements Comparison</p>
                  </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-4 gap-0 border-b border-white/10 text-xs font-semibold">
                  <div className="p-2 sm:p-3 text-white/60">Requirement</div>
                  <div className="p-2 sm:p-3 text-center text-green-400 border-l border-white/10">
                    Single<br />
                    <span className="text-white/40 font-normal">Contractor</span>
                  </div>
                  <div className="p-2 sm:p-3 text-center text-amber-400 border-l border-white/10">
                    Multi<br />
                    <span className="text-white/40 font-normal">Contractor</span>
                  </div>
                  <div className="p-2 sm:p-3 text-center text-red-400 border-l border-white/10">
                    Notifiable<br />
                    <span className="text-white/40 font-normal">Project</span>
                  </div>
                </div>

                {/* Table Rows */}
                {[
                  { item: "CDM applies", single: "Yes", multi: "Yes", notifiable: "Yes" },
                  { item: "Client duties", single: "Yes", multi: "Yes", notifiable: "Yes" },
                  { item: "Contractor duties", single: "Yes", multi: "Yes", notifiable: "Yes" },
                  { item: "PD appointment", single: "No", multi: "Yes (written)", notifiable: "Yes (written)" },
                  { item: "PC appointment", single: "No", multi: "Yes (written)", notifiable: "Yes (written)" },
                  { item: "Construction phase plan", single: "Yes*", multi: "Yes", notifiable: "Yes (detailed)" },
                  { item: "F10 notification to HSE", single: "No", multi: "Only if thresholds met", notifiable: "Yes" },
                  { item: "F10 displayed on site", single: "No", multi: "Only if notifiable", notifiable: "Yes" },
                  { item: "Health and safety file", single: "No**", multi: "Yes (PD maintains)", notifiable: "Yes (PD maintains)" },
                  { item: "Pre-construction information", single: "Yes", multi: "Yes", notifiable: "Yes" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-4 gap-0 text-xs sm:text-sm ${i % 2 === 0 ? "bg-white/[0.02]" : ""} ${i < 9 ? "border-b border-white/5" : ""}`}
                  >
                    <div className="p-2 sm:p-3 text-white/80">{row.item}</div>
                    <div className="p-2 sm:p-3 text-center text-white/70 border-l border-white/5">{row.single}</div>
                    <div className="p-2 sm:p-3 text-center text-white/70 border-l border-white/5">{row.multi}</div>
                    <div className="p-2 sm:p-3 text-center text-white/70 border-l border-white/5">{row.notifiable}</div>
                  </div>
                ))}

                <div className="p-3 border-t border-white/10">
                  <p className="text-[10px] text-white/40">
                    * Proportionate &mdash; may be a simple method statement for low-risk work<br />
                    ** A health and safety file is only required when there is a PD appointed to create and maintain it
                  </p>
                </div>
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
            <Link to="../cdm-regulations-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Key Definitions &amp; Scope
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
