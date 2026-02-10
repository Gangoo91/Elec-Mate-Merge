import { ArrowLeft, HardHat, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "cdm5s1-pc-core-duty",
    question:
      "Under Regulation 13 of CDM 2015, what four things must the principal contractor do during the construction phase?",
    options: [
      "Design, procure, build, and hand over the project",
      "Plan, manage, monitor, and coordinate the construction phase",
      "Appoint designers, notify the HSE, prepare the health and safety file, and close out the project",
      "Hire workers, order materials, supervise trades, and complete snagging",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 13 of CDM 2015 places a duty on the principal contractor to plan, manage, monitor, and coordinate the construction phase so that it is carried out without risks to the health or safety of any person. This is the PC's overriding statutory obligation throughout the entire construction phase. It is distinct from the client's duty to make suitable arrangements and the principal designer's duty to manage the pre-construction phase.",
  },
  {
    id: "cdm5s1-cpp-timing",
    question:
      "When must the construction phase plan (CPP) be in place under Regulation 12 of CDM 2015?",
    options: [
      "Within 14 days of the construction phase starting",
      "Before the construction phase begins",
      "At the point of practical completion",
      "Only when the HSE requests to see it during an inspection",
    ],
    correctIndex: 1,
    explanation:
      "Regulation 12(1) of CDM 2015 requires the construction phase plan to be drawn up before the construction phase begins. No construction work should commence until the CPP is in place. The plan does not need to be complete in every detail from day one — it should be proportionate to the project and developed further as design and planning progress — but the core arrangements for managing health and safety must be established before any work starts on site.",
  },
  {
    id: "cdm5s1-riddor-specified",
    question:
      "Under RIDDOR 2013, which of the following must be reported to the HSE as a 'specified injury'?",
    options: [
      "A minor cut treated with a plaster from the first aid kit",
      "A worker feeling dizzy and sitting down for 10 minutes",
      "A fracture sustained by a worker as a result of a construction site accident",
      "A near miss where a brick fell from scaffolding but no one was in the area",
    ],
    correctIndex: 2,
    explanation:
      "Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR), a fracture (other than to fingers, thumbs, or toes) is classified as a specified injury and must be reported to the HSE without delay. Other specified injuries include amputations, crush injuries to the head or torso, scalping, loss of consciousness caused by head injury or asphyxia, burns covering more than 10% of the body, and any injury requiring immediate admission to hospital for more than 24 hours.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "What is the difference between the construction phase plan (CPP) and the health and safety file?",
    answer:
      "The construction phase plan (CPP) is a live, working document that sets out how health and safety will be managed during the construction phase. It is prepared by the principal contractor before the construction phase begins and is updated throughout the project as circumstances change. The CPP covers site rules, arrangements for managing high-risk work, emergency procedures, welfare provisions, and the management structure. By contrast, the health and safety file is a document compiled by the principal designer for the client's benefit at the end of the project. It contains information about the completed structure that will be needed for future maintenance, repair, renovation, or demolition — such as as-built drawings, details of hidden services, structural design information, and hazardous materials present in the building. The CPP looks forward (how to build safely); the health and safety file looks backward (what future users need to know).",
  },
  {
    question:
      "Can a principal contractor delegate their CDM 2015 duties to a subcontractor?",
    answer:
      "No. Under CDM 2015, the principal contractor cannot delegate their statutory duties. While the PC can (and should) require subcontractors to manage the health and safety of their own work, and can appoint competent persons to carry out specific management tasks, the legal responsibility for planning, managing, monitoring, and coordinating the construction phase remains with the principal contractor at all times. Regulation 13 places the duty squarely on the PC. If a subcontractor fails to manage their work safely, the PC may still face enforcement action if they failed to adequately monitor and coordinate. The PC must ensure that arrangements are in place to check subcontractor compliance and intervene when standards fall below the required level.",
  },
  {
    question:
      "What is the difference between 'consultation' and 'engagement' under Regulation 14?",
    answer:
      "Under Regulation 14, the principal contractor must both consult and engage with workers. Consultation means giving workers the opportunity to raise concerns, ask questions, and contribute their views on health and safety matters before decisions are made. It is a two-way process — the PC must genuinely listen and take workers' views into account. Engagement is broader and includes all the ways the PC involves workers in health and safety, such as toolbox talks, safety briefings, safety committees, near-miss reporting schemes, and behavioural safety observations. The key distinction is that consultation is about decision-making (asking workers for input), while engagement is about building a safety culture (involving workers in the ongoing management of health and safety). Both are legal requirements, not optional extras.",
  },
  {
    question:
      "What records must a principal contractor keep during the construction phase?",
    answer:
      "The principal contractor should maintain comprehensive records throughout the construction phase. These include: the construction phase plan (CPP) and all revisions; induction records for every person who enters the site; training records and evidence of competence (CSCS cards, qualifications, certificates); risk assessments and method statements (RAMS) for all activities; permits to work and their associated documentation; inspection records (scaffolding inspections, excavation inspections, lifting equipment inspections as required by the relevant regulations); the accident book and records of all incidents, near misses, and dangerous occurrences; RIDDOR notifications submitted to the HSE; fire safety records; welfare facility inspection records; coordination meeting minutes; and contributions to the health and safety file. Good record keeping is not merely administrative — it demonstrates due diligence, supports enforcement defence, enables lessons to be learned, and ensures the health and safety file is complete at handover.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Under CDM 2015, who is responsible for preparing the construction phase plan?",
    options: [
      "The client",
      "The principal designer",
      "The principal contractor",
      "The HSE inspector",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 12(1) of CDM 2015 requires the principal contractor to draw up a construction phase plan (CPP) before the construction phase begins. The CPP must set out the arrangements for managing health and safety during construction, including site rules, specific measures for high-risk work, and the management structure. While the principal designer provides pre-construction information that feeds into the CPP, the responsibility for preparing and maintaining the CPP rests with the principal contractor.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT a required element of the construction phase plan under CDM 2015?",
    options: [
      "A description of the project and the management structure",
      "Arrangements for controlling significant site risks",
      "The architect's fee schedule and payment terms",
      "Site rules and emergency procedures",
    ],
    correctAnswer: 2,
    explanation:
      "The construction phase plan must include a description of the project, the management structure, health and safety aims, site rules, arrangements for managing significant risks, emergency procedures, and arrangements for monitoring and review. Financial information such as fee schedules and payment terms is a commercial matter and has no place in the CPP. The CPP must be proportionate to the project — a small, simple project needs a shorter, simpler plan than a large, complex one.",
  },
  {
    id: 3,
    question:
      "Before allowing a subcontractor to begin work on site, the principal contractor should ensure which of the following?",
    options: [
      "The subcontractor has provided suitable RAMS, evidence of competence, and attended a pre-start meeting",
      "The subcontractor has the cheapest quote",
      "The subcontractor has been on site before and knows the layout",
      "The subcontractor has agreed to work overtime if needed",
    ],
    correctAnswer: 0,
    explanation:
      "Before any subcontractor begins work, the principal contractor must verify their competence (appropriate qualifications, training, experience, and CSCS cards), review and approve their risk assessments and method statements (RAMS) for the specific work they will carry out, and conduct a pre-start meeting to discuss site rules, hazards, interfaces with other trades, and emergency procedures. This is part of the PC's duty under Regulation 13 to manage and coordinate the construction phase safely.",
  },
  {
    id: 4,
    question:
      "What must a site induction cover under CDM 2015?",
    options: [
      "Only the location of the site office and car park",
      "Site rules, hazards, emergency procedures, welfare facilities, reporting arrangements, and the individual's responsibilities",
      "A brief welcome speech from the site manager with no specific content requirements",
      "Only the working hours and break times",
    ],
    correctAnswer: 1,
    explanation:
      "A site induction must be comprehensive and cover all the information a worker needs to work safely on the site. This includes: site rules (PPE requirements, speed limits, exclusion zones), significant hazards on site, emergency procedures (fire evacuation, first aid, assembly points), welfare facility locations, accident and near-miss reporting procedures, the management structure, and the worker's own responsibilities. The induction must be delivered before the worker starts any construction work, and a record must be kept.",
  },
  {
    id: 5,
    question:
      "What is the difference between active monitoring and reactive monitoring of health and safety?",
    options: [
      "Active monitoring happens before incidents; reactive monitoring happens after incidents",
      "Active monitoring is carried out by the HSE; reactive monitoring is carried out by the PC",
      "There is no difference — they are the same thing",
      "Active monitoring involves installing CCTV; reactive monitoring involves reviewing CCTV footage",
    ],
    correctAnswer: 0,
    explanation:
      "Active monitoring involves proactive checks carried out before things go wrong — such as safety tours, planned inspections, RAMS compliance checks, scaffold inspections, and welfare facility audits. Reactive monitoring involves investigating and learning from events that have already occurred — such as accidents, incidents, near misses, dangerous occurrences, and ill health. Both types of monitoring are essential. Active monitoring helps prevent incidents; reactive monitoring ensures lessons are learned and similar incidents are prevented in future.",
  },
  {
    id: 6,
    question:
      "Under Regulation 14 of CDM 2015, what must the principal contractor do in relation to workers?",
    options: [
      "Only provide PPE and nothing else",
      "Consult and engage with workers on matters affecting their health, safety, and welfare",
      "Delegate all safety responsibilities to individual workers",
      "Only communicate with workers through their trade union representatives",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 14 of CDM 2015 requires the principal contractor to consult and engage with workers, and any person working in connection with the project who is a worker (or their representative). This means giving workers the opportunity to raise concerns, providing information about health and safety arrangements, and involving workers in decisions that affect their safety. The PC must also ensure that workers can inspect and be consulted upon any part of the construction phase plan relevant to their work.",
  },
  {
    id: 7,
    question:
      "Which of the following must be reported to the HSE under RIDDOR 2013?",
    options: [
      "A minor cut treated with a plaster from the first aid kit",
      "A worker feeling unwell and going home early",
      "A fracture sustained by a worker as a result of a construction site accident",
      "A near miss where no one was injured and no property was damaged",
    ],
    correctAnswer: 2,
    explanation:
      "Under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR), certain categories of incident must be reported to the HSE. These include: deaths, specified injuries (including fractures other than to fingers, thumbs, and toes), over-7-day incapacitation injuries, injuries to non-workers who are taken to hospital, certain occupational diseases, and dangerous occurrences listed in Schedule 2. A fracture is a specified injury and must be reported without delay. Minor injuries treated with first aid and workers feeling unwell do not require RIDDOR notification, although they should still be recorded internally.",
  },
  {
    id: 8,
    question:
      "What authority does any worker on a construction site have if they believe there is a serious and imminent danger?",
    options: [
      "No authority — only the site manager can stop work",
      "The authority to stop work and move to a place of safety without fear of disciplinary action",
      "The authority to leave the site permanently without notice",
      "The authority to issue a prohibition notice on behalf of the HSE",
    ],
    correctAnswer: 1,
    explanation:
      "Under the Management of Health and Safety at Work Regulations 1999 (Regulation 8), every worker has the right to stop work and move to a place of safety if they believe there is serious and imminent danger. The principal contractor must ensure that this right is communicated during induction and that workers understand they will not face disciplinary action for exercising it. Many principal contractors also operate formal stop-work authority policies that actively encourage workers to halt any activity they consider unsafe. This culture of empowerment is essential to effective safety management.",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

export default function CdmRegulationsModule5Section1() {
  useSEO({
    title:
      "Managing the Construction Phase | CDM Regulations Module 5.1",
    description:
      "How the principal contractor plans, manages, monitors, and coordinates the construction phase under CDM 2015 — including the construction phase plan, contractor management, site rules, monitoring, coordination, worker engagement, and incident response.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <HardHat className="h-10 w-10 text-blue-400 mx-auto mb-4" />
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 5 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Managing the Construction Phase
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            How the principal contractor plans, manages, monitors, and coordinates the
            construction phase &mdash; implementing the construction phase plan and
            managing subcontractors to ensure health and safety on site
          </p>
        </div>

        {/* ─── Quick Summary + Key Facts ─── */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          <div className="rounded-lg p-4 sm:p-5 bg-blue-500/10 border border-blue-500/30">
            <p className="font-semibold text-base text-blue-400 mb-3">Quick Summary</p>
            <ul className="text-sm text-white space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span>
                  The <strong>principal contractor (PC)</strong> holds the primary duty for managing
                  the construction phase under <strong>Regulation 13</strong> of CDM 2015.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span>
                  The PC must prepare the <strong>construction phase plan (CPP)</strong> before
                  work begins and keep it updated throughout the project.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span>
                  Effective management includes vetting subcontractors, delivering inductions,
                  monitoring compliance, coordinating trades, and engaging workers.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg p-4 sm:p-5 bg-white/5 border border-white/10">
            <p className="font-semibold text-base text-blue-400 mb-3">Key Facts</p>
            <ul className="text-sm text-white space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>Regulation 12</strong> &mdash; CPP must be in place before construction starts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>Regulation 13</strong> &mdash; PC must plan, manage, monitor, coordinate</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>Regulation 14</strong> &mdash; PC must consult and engage workers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span><strong>RIDDOR 2013</strong> &mdash; specified injuries must be reported without delay</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── Learning Outcomes ─── */}
        <div className="mb-12 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Learning Outcomes</h2>
          <p className="text-white/80 text-sm mb-3">By the end of this section, you will be able to:</p>
          <ul className="text-sm text-white space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Explain the principal contractor&rsquo;s core duty under Regulation 13 and how it differs from the client&rsquo;s and principal designer&rsquo;s duties</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Describe the required contents and purpose of the construction phase plan under Regulation 12</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Outline the process for managing subcontractors, including competence vetting, RAMS review, and performance monitoring</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Describe the requirements for site inductions, site rules, and toolbox talks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Distinguish between active and reactive monitoring and explain their importance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Explain the PC&rsquo;s duties under Regulation 14 regarding worker consultation and engagement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>Describe the incident response process, including RIDDOR reporting requirements and stop-work authority</span>
            </li>
          </ul>
        </div>

        {/* ─── Quick-Check Questions ─── */}
        <div className="mb-12 bg-white/5 border border-white/10 rounded-lg p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white mb-2">Before You Begin</h2>
          <p className="text-white/70 text-sm mb-4">
            Test your existing knowledge with these quick-check questions. Don&rsquo;t worry
            if you don&rsquo;t know the answers yet &mdash; you will by the end of this section.
          </p>
        </div>

        {/* ─── 01 The Principal Contractor's Core Duty ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400/80 text-sm font-normal">01</span>
            The Principal Contractor&rsquo;s Core Duty
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
              <p className="font-semibold text-base text-blue-400 mb-2">Regulation 13: The Four Pillars</p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Plan</strong> &mdash; the PC must establish the arrangements for managing health and
                    safety before work begins, setting out how work will be sequenced, resourced, and controlled
                    to avoid risks. This includes preparing the construction phase plan.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Manage</strong> &mdash; the PC must actively direct and oversee all construction work
                    to ensure it is carried out safely. This is not passive oversight; it requires hands-on
                    leadership, decision-making, and resource allocation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Monitor</strong> &mdash; the PC must check that health and safety standards are being
                    maintained, that the CPP is being implemented, and that subcontractors are complying with
                    their RAMS and site rules. Monitoring must be ongoing, not occasional.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Coordinate</strong> &mdash; the PC must ensure that the work of different contractors
                    does not create risks for one another. Where multiple trades operate simultaneously, the PC
                    must sequence and separate activities to prevent conflicts and shared hazards.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-blue-500/10 border-l-2 border-l-blue-500/50 border border-blue-500/30">
              <p className="font-semibold text-base text-blue-400 mb-2">Distinguishing Duties</p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Client&rsquo;s duty (Regulation 4)</strong> &mdash; the client must make suitable
                    arrangements for managing the project, ensure sufficient time and resources are allocated,
                    and ensure that the principal contractor fulfils their duties. The client sets the framework;
                    the PC operates within it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>Principal designer&rsquo;s duty (Regulation 11)</strong> &mdash; the PD manages
                    the pre-construction phase, coordinating design work and ensuring designers fulfil their
                    duties. The PD&rsquo;s primary focus is design risk management and pre-construction
                    information.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    <strong>PC&rsquo;s duty (Regulation 13)</strong> &mdash; the PC takes the lead during the
                    construction phase itself. Once construction begins, the PC is the primary duty holder for
                    on-site health and safety management. The PC&rsquo;s duties cannot be delegated, though
                    tasks can be assigned to competent persons.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>
                    The HSE expects the PC to demonstrate <strong>active management</strong>, not merely paper
                    compliance. Writing a CPP and filing it away is insufficient &mdash; the plan must be
                    implemented, communicated, monitored, and enforced. L153 provides detailed guidance.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 02 The Construction Phase Plan ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">02</span>
              The Construction Phase Plan
            </h2>
            <div className="space-y-4 text-white">
              <p>
                <strong>Regulation 12</strong> of CDM 2015 requires the principal contractor to draw up a
                construction phase plan (CPP) before the construction phase begins. The CPP is the central
                health and safety management document for the project. It is a <strong>living document</strong>{" "}
                that must be reviewed and updated as the project progresses, circumstances change, and lessons
                are learned.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">What the CPP Must Contain</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Project description:</strong> A clear description of the project, its location,
                      the type of construction work involved, the anticipated duration, and the key phases.
                      This provides context for all other elements of the plan.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Management structure:</strong> The organisational structure for managing the
                      project, including the names and roles of key personnel (site manager, safety adviser,
                      supervisors, first aiders, fire wardens). Lines of responsibility and communication
                      channels must be clearly defined.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Arrangements for health and safety:</strong> Specific measures for controlling
                      the significant risks identified in the pre-construction information and the project
                      risk assessments. This includes arrangements for high-risk activities such as work at
                      height, excavations, demolition, use of cranes, and work near live services.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Site rules:</strong> The rules that all persons on site must follow, covering
                      PPE requirements, speed limits, smoking restrictions, exclusion zones, permit-to-work
                      areas, and general conduct. Site rules must be communicated during induction and
                      prominently displayed.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Emergency procedures:</strong> Detailed procedures for fire evacuation, first
                      aid, rescue from height or confined spaces, severe weather response, structural
                      emergency, and environmental incidents. Emergency contacts, assembly points, and alarm
                      systems must all be specified.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Welfare arrangements:</strong> How Schedule 2 welfare requirements will be met,
                      including sanitary conveniences, washing facilities, drinking water, changing rooms,
                      rest areas, and facilities for heating food. These must be available from day one.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Proportionality</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The CPP must be <strong className="text-white">proportionate to the project</strong>. A
                  small, straightforward project (such as a domestic extension) needs a short, simple plan
                  covering the key risks and arrangements. A large, complex project (such as a multi-storey
                  commercial building) needs a detailed plan with appendices covering each phase, trade, and
                  high-risk activity. The HSE&rsquo;s guidance (L153) emphasises that the CPP should be a
                  practical, usable document &mdash; not a bureaucratic exercise. If the plan is so long that
                  nobody reads it, it has failed in its purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 03 Contractor Management ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">03</span>
              Contractor Management
            </h2>
            <div className="space-y-4 text-white">
              <p>
                On most construction projects, the principal contractor does not carry out all the work
                directly. Instead, the PC appoints and manages a chain of subcontractors. Managing this
                supply chain is one of the PC&rsquo;s most critical responsibilities. The PC must ensure
                that every subcontractor on site is competent, has adequate RAMS, understands the site
                rules, and is monitored throughout the duration of their work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Vetting Competence</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Pre-qualification:</strong> Before appointing a subcontractor, the PC should
                      assess their health and safety competence. This includes reviewing their health and
                      safety policy, past performance data (accident rates, enforcement history), insurance
                      certificates, relevant accreditations (CHAS, SafeContractor, Constructionline), and
                      evidence that they have the skills, knowledge, training, and experience for the
                      specific work involved.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>CSCS cards:</strong> All workers on site should hold a valid Construction
                      Skills Certification Scheme (CSCS) card appropriate to their trade and level of
                      competence. The PC should check cards at induction and periodically thereafter.
                      A valid CSCS card confirms that the holder has passed the relevant health and
                      safety test and holds a recognised qualification.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">RAMS Review &amp; Pre-Start Meetings</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Reviewing RAMS:</strong> The PC must review each subcontractor&rsquo;s risk
                      assessments and method statements before work begins. RAMS must be <strong>task-specific
                      and site-specific</strong> &mdash; generic RAMS that have not been tailored to the actual
                      project conditions should be rejected. The review should check that significant hazards
                      are identified, control measures are adequate, and the methodology is compatible with
                      the work of other trades on site.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Pre-start meetings:</strong> Before each subcontractor begins work, the PC
                      should hold a pre-start meeting to discuss the scope of work, specific hazards, site
                      rules, interfaces with other trades, access arrangements, permit requirements, and
                      emergency procedures. This is a critical opportunity to identify and resolve potential
                      conflicts before they become on-site problems.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">The Subcontractor Supply Chain</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Tier 1 subcontractors:</strong> Appointed directly by the principal contractor.
                      They have a direct contractual relationship with the PC and are the first point of
                      contact for management and coordination of their package of work.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Tier 2 subcontractors:</strong> Appointed by tier 1 subcontractors to carry
                      out specific elements of the work. The PC may not have a direct contractual
                      relationship, but the PC&rsquo;s duty to coordinate and monitor still applies.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Tier 3 and beyond:</strong> On large projects, the supply chain can extend
                      several tiers deep. The PC must ensure that the same standards of competence, RAMS
                      review, and monitoring extend through the entire chain. The PC should require
                      notification of all sub-subcontractor appointments and reserve the right to vet them.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Providing site-specific information:</strong> The PC must provide every
                      contractor with the information they need to plan and carry out their work safely.
                      This includes relevant extracts from the CPP, site-specific hazard information (such
                      as asbestos surveys, buried services records, and structural constraints), emergency
                      procedures, and details of other trades working in the same area.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Monitoring Performance</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The PC must <strong className="text-white">actively monitor</strong> subcontractor
                  performance throughout the construction phase. This includes regular site inspections,
                  checking that RAMS are being followed, observing working practices, and taking immediate
                  action when unsafe behaviour or conditions are identified. The frequency and depth of
                  monitoring should be proportionate to the level of risk. A subcontractor carrying out
                  high-risk work (such as demolition or work at height) requires closer and more frequent
                  monitoring than one carrying out lower-risk finishing work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Site Rules and Induction ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">04</span>
              Site Rules and Induction
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The principal contractor must establish clear, enforceable site rules and ensure that
                every person who enters the site receives a comprehensive induction before they begin
                work. Site rules and induction are the primary means by which the PC communicates health
                and safety standards to everyone on site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Establishing Site Rules</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>PPE requirements:</strong> The minimum personal protective equipment required
                      on site at all times (typically hard hat, hi-vis vest, safety boots, and safety
                      glasses). Additional PPE requirements for specific areas or tasks (hearing protection,
                      respiratory protection, fall protection) should be clearly defined.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Speed limits:</strong> Vehicle speed limits on site (typically 5&ndash;10 mph),
                      designated vehicle routes, pedestrian routes, and crossing points. Segregation of
                      vehicles and pedestrians is a key requirement.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Exclusion zones:</strong> Areas where access is restricted due to ongoing
                      high-risk activities (crane operations, demolition, deep excavations). These must
                      be clearly marked with barriers, signage, and where necessary, banksmen or
                      gatekeepers.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Permit-to-work areas:</strong> Activities and areas requiring formal permits
                      before work can begin (hot works, confined space entry, electrical isolation,
                      excavation near services). The permit system must be clearly explained and enforced.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>General conduct:</strong> Rules covering alcohol and drugs (zero tolerance),
                      smoking restrictions, mobile phone use, housekeeping, waste disposal, and respect
                      for other workers and the public. Site rules should also cover disciplinary
                      procedures for non-compliance.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Site Induction Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>When:</strong> Every worker must receive a site induction{" "}
                      <strong>before</strong> they start any construction work on the site. No exceptions.
                      Visitors and delivery drivers should receive a shortened safety briefing appropriate
                      to their access level.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Content of an effective induction:</strong> Project overview and current phase
                      of work; site rules and PPE requirements; significant hazards on site; emergency
                      procedures (fire alarm, assembly points, first aid locations); welfare facilities
                      (toilets, canteen, changing rooms); accident and near-miss reporting procedures;
                      management structure and who to report concerns to; CSCS card checks and competence
                      verification; sign-in/sign-out procedures.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Records:</strong> An induction record must be kept for every person inducted,
                      including their name, employer, date of induction, and confirmation of CSCS card
                      check. These records demonstrate compliance with the PC&rsquo;s duty to provide
                      information and are a key part of the site&rsquo;s due diligence documentation.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Ongoing Toolbox Talks</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Beyond the initial induction, the PC should arrange regular <strong className="text-white">
                  toolbox talks</strong> to address specific hazards relevant to the current phase of work.
                  Toolbox talks are short, focused safety briefings (typically 10&ndash;15 minutes) delivered
                  at the point of work. Topics might include working at height, manual handling, electrical
                  safety, fire prevention, or lessons learned from recent incidents. Attendance should be
                  recorded, and the content should be practical and relevant to the audience. Toolbox talks
                  are one of the most effective ways to maintain safety awareness and reinforce the messages
                  from the induction.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 05 Monitoring and Supervision ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">05</span>
              Monitoring and Supervision
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The principal contractor must continuously monitor health and safety performance on site.
                Monitoring is how the PC checks that the CPP is being implemented, that site rules are
                being followed, and that subcontractors are working in accordance with their RAMS.
                Effective monitoring combines both <strong>active</strong> (proactive) and{" "}
                <strong>reactive</strong> (after-the-event) approaches.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Active Monitoring</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Safety tours:</strong> Regular, informal walks around the site by senior
                      management and supervisors to observe conditions, talk to workers, identify hazards,
                      and demonstrate visible leadership. Safety tours should cover all areas of the site,
                      including welfare facilities, material storage areas, and the perimeter.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Planned inspections:</strong> Formal, documented inspections of specific
                      activities, plant, or areas. These include statutory inspections (scaffolding every
                      7 days, excavations at the start of each shift, lifting equipment under LOLER) and
                      general workplace inspections. Findings must be recorded and acted upon.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>RAMS compliance checks:</strong> Observing work in progress and comparing
                      it to the approved RAMS to verify that the control measures described in the method
                      statement are actually being implemented on the ground.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Welfare facility checks:</strong> Regular inspection of toilets, washing
                      facilities, rest areas, and drinking water to ensure they meet Schedule 2 standards
                      and are maintained in clean, functional condition.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Reactive Monitoring</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Incident investigation:</strong> When an accident, incident, near miss, or
                      dangerous occurrence happens, the PC must investigate to determine the root causes and
                      contributing factors. Investigation is not about blame &mdash; it is about understanding
                      what went wrong and preventing recurrence.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Trend analysis:</strong> Reviewing incident data, near-miss reports, and
                      inspection findings over time to identify patterns and trends. If the same type of
                      incident keeps occurring, the underlying controls or arrangements need to change.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Supervisory Competence &amp; KPIs</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Competent supervisors:</strong> The PC must ensure that all supervisors have
                      the skills, knowledge, and experience to monitor the work they are overseeing. A
                      supervisor who does not understand the risks of the activity they are supervising
                      cannot effectively monitor compliance. SSSTS (Site Supervisor Safety Training Scheme)
                      and SMSTS (Site Management Safety Training Scheme) qualifications are widely expected.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Key performance indicators (KPIs):</strong> The PC should establish both
                      leading indicators (number of inspections completed, toolbox talks delivered,
                      near-miss reports submitted, percentage of workforce inducted) and lagging indicators
                      (accident frequency rate, RIDDOR-reportable incidents, enforcement actions).
                      Leading indicators measure effort and prevention; lagging indicators measure outcomes.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Recording and action:</strong> All monitoring findings must be recorded.
                      Where deficiencies are identified, corrective actions must be assigned, tracked, and
                      closed out within a defined timescale. Monitoring without follow-up action is
                      pointless and may actually undermine credibility with the workforce.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 Health and Safety Coordination ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">06</span>
              Health and Safety Coordination
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Coordination is the process of ensuring that the activities of multiple contractors
                do not create risks for one another. On a busy construction site, several trades may
                be working in close proximity at the same time &mdash; bricklayers below scaffolders,
                electricians alongside plumbers, crane operations over pedestrian routes. The principal
                contractor must actively coordinate these activities to prevent clashes, shared hazards,
                and communication failures.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Coordination Mechanisms</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Weekly coordination meetings:</strong> Regular meetings attended by the
                      PC&rsquo;s site team and all active subcontractors. The agenda should cover the
                      look-ahead programme (what work is planned for the coming week), interfaces between
                      trades, access requirements, permit-to-work requirements, deliveries, crane lifts,
                      and any changes to the site layout or emergency procedures.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Look-ahead programmes:</strong> A rolling programme (typically 2&ndash;4
                      weeks ahead) showing which trades will be working where, when, and what plant and
                      access arrangements they need. The look-ahead programme allows the PC to identify
                      potential conflicts and plan separation or sequencing measures in advance.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Interface management:</strong> Where two or more trades must work in the
                      same area simultaneously, the PC must carry out a joint risk assessment and
                      establish specific coordination measures. For example, if electricians are second-fixing
                      while plasterers are working in the same room, arrangements must cover dust control,
                      access routes, and the sequence of work to avoid damage to each other&rsquo;s
                      installations.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Permit-to-work systems:</strong> Formal documented systems for controlling
                      high-risk activities (hot works, confined space entry, electrical isolation,
                      excavation near services). The permit provides a structured checkpoint to verify
                      that precautions are in place and that the work is coordinated with other activities
                      in the area.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Shared risk assessments:</strong> Where work activities interact, the PC
                      may require a shared or joint risk assessment involving all affected trades. This
                      ensures that each contractor understands the hazards created by the other&rsquo;s
                      work and that collective control measures are agreed.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <HardHat className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">The Site Health and Safety Adviser</h3>
                </div>
                <p className="text-white/80 text-sm">
                  On larger projects, the PC may appoint a dedicated <strong className="text-white">site
                  health and safety adviser</strong> to support the site management team. The adviser&rsquo;s
                  role is to provide competent health and safety advice, carry out inspections and audits,
                  assist with incident investigation, deliver toolbox talks, and act as a specialist resource
                  for the site team. However, the adviser does not replace the PC&rsquo;s management
                  responsibility &mdash; the PC remains the primary duty holder. The adviser&rsquo;s role
                  is advisory and supportive, not a substitute for management leadership on health and safety.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── 07 Worker Engagement and Consultation ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">07</span>
              Worker Engagement and Consultation
            </h2>
            <div className="space-y-4 text-white">
              <p>
                <strong>Regulation 14</strong> of CDM 2015 requires the principal contractor to consult
                and engage with workers on matters affecting their health, safety, and welfare. This is
                not optional &mdash; it is a legal requirement that reflects the fundamental principle
                that workers are the people most directly affected by health and safety decisions, and
                their knowledge and experience are invaluable resources for identifying and managing risks.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Consultation vs Engagement</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Consultation:</strong> A two-way process where the PC seeks workers&rsquo;
                      views on health and safety matters <strong>before decisions are made</strong>. The
                      PC must genuinely listen, consider workers&rsquo; input, and explain how it has been
                      taken into account. Consultation is about shared decision-making, not merely informing
                      workers after the fact.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Engagement:</strong> The broader process of involving workers in health and
                      safety on an ongoing basis. This includes toolbox talks, safety briefings, safety
                      notice boards, near-miss reporting schemes, behavioural safety observations, and
                      creating an environment where workers feel confident raising concerns without fear
                      of reprisal.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Methods of Worker Involvement</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Worker forums and safety committees:</strong> Regular meetings where
                      worker representatives can raise concerns, discuss safety issues, and contribute
                      to safety planning. On larger sites, a formal safety committee with elected worker
                      representatives provides a structured channel for consultation.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Safety representatives:</strong> Workers (or their trade unions) may appoint
                      safety representatives who have the right to investigate potential hazards, inspect
                      the workplace, and represent workers in consultations with the employer. The PC must
                      give safety representatives reasonable time and facilities to carry out their role.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Near-miss reporting:</strong> Encouraging workers to report near misses,
                      unsafe conditions, and unsafe acts is one of the most valuable forms of engagement.
                      Near-miss data provides leading indicator information about potential serious incidents
                      before they happen. The PC must create a <strong>just culture</strong> where reporting
                      is encouraged and rewarded, not punished.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Behavioural safety:</strong> Programmes that focus on observing and improving
                      safe behaviours (rather than just compliance with rules) can significantly improve
                      safety culture. Peer-to-peer safety observations, safety conversations, and positive
                      recognition of safe working practices all contribute to a culture where safety is
                      valued by everyone, not just the management team.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Why Worker Engagement Matters</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Research consistently shows that sites with high levels of worker engagement have
                  <strong className="text-white"> significantly lower accident rates</strong> than those
                  where management operates in isolation. Workers are the people closest to the hazards
                  &mdash; they see risks that management may miss, they understand the practical challenges
                  of the work, and they are the first to notice when conditions change. A site where workers
                  feel empowered to speak up, report concerns, and contribute to safety planning is
                  fundamentally safer than one where safety is imposed from above without worker input.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 When Things Go Wrong ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400/80 text-sm font-normal">08</span>
              When Things Go Wrong
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Despite the best planning and management, incidents can and do occur on construction
                sites. When they do, the principal contractor must respond effectively: providing
                immediate assistance, securing the scene, investigating the causes, reporting to the
                HSE where required, and implementing corrective actions to prevent recurrence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Incident Response</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Immediate response:</strong> The first priority is always the safety and
                      welfare of the injured or affected person. Administer first aid, call emergency
                      services if needed, and evacuate the area if there is ongoing danger. The site
                      manager should take charge of the immediate response in accordance with the
                      emergency procedures in the CPP.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Securing the scene:</strong> Once the immediate emergency is dealt with,
                      the scene of the incident must be preserved as far as reasonably practicable. This
                      means cordoning off the area, preventing unauthorised access, and preserving
                      physical evidence (positions of equipment, materials, barriers). Photographs and
                      videos should be taken as soon as possible. Scene preservation is essential for both
                      internal investigation and any subsequent HSE investigation.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">RIDDOR Reporting</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>What must be reported:</strong> Under the Reporting of Injuries, Diseases
                      and Dangerous Occurrences Regulations 2013 (RIDDOR), the PC must report: deaths;
                      specified injuries (fractures other than fingers/thumbs/toes, amputations, crush
                      injuries to head or torso, loss of consciousness from head injury or asphyxia,
                      burns covering &gt;10% of the body, scalping, loss of sight); over-7-day
                      incapacitation injuries; injuries to non-workers taken to hospital; certain
                      occupational diseases; and dangerous occurrences listed in Schedule 2 (such as
                      collapse of scaffolding, failure of lifting equipment, or uncontrolled explosion).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>How to report:</strong> RIDDOR reports are submitted online via the HSE&rsquo;s
                      reporting service at <strong>www.hse.gov.uk/riddor</strong>. Deaths and specified
                      injuries must be reported without delay (immediately by telephone, followed by a
                      written report within 10 days). Over-7-day injuries must be reported within 15
                      days. A copy of every RIDDOR report must be retained on the site file.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Who reports:</strong> On a construction site, the principal contractor is
                      typically the responsible person for RIDDOR reporting, as they are in control of the
                      premises (the construction site). Where a subcontractor&rsquo;s worker is injured,
                      the PC still has reporting responsibilities because the incident occurred on a site
                      under their control.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-blue-400 font-medium mb-3">Investigation &amp; Corrective Actions</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Root cause investigation:</strong> The PC should investigate all incidents
                      (not just RIDDOR-reportable ones) to identify the root causes, not just the immediate
                      causes. A worker falling from a ladder is the immediate cause; the root cause may be
                      inadequate access planning, poor supervision, time pressure, or failure to provide
                      suitable equipment. Investigation should use structured methods such as the &ldquo;5
                      Whys&rdquo; technique or a more formal root cause analysis.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Corrective actions:</strong> Investigation findings must lead to specific,
                      measurable corrective actions. These might include: revising the CPP, updating RAMS,
                      providing additional training, changing procedures, improving supervision, replacing
                      equipment, or disciplinary action where warranted. Actions must be assigned to named
                      individuals with clear deadlines and tracked to completion.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Learning from incidents:</strong> Lessons learned should be shared across
                      the project through toolbox talks, safety alerts, and updates to the CPP. On multi-site
                      organisations, lessons should be disseminated across all projects to prevent similar
                      incidents elsewhere.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-blue-300">Stop-Work Authority &amp; the HSE Inspector</h3>
                </div>
                <div className="text-white/80 text-sm space-y-3">
                  <p>
                    <strong className="text-white">Stop-work authority:</strong> Every worker on site
                    should understand that they have the right &mdash; and the duty &mdash; to stop work
                    if they believe there is a serious and imminent danger. The PC must actively communicate
                    this right during induction and create a culture where exercising stop-work authority
                    is seen as a positive safety action, never as a cause for disciplinary action.
                  </p>
                  <p>
                    <strong className="text-white">The HSE inspector:</strong> HSE inspectors have the
                    legal power to enter construction sites without notice, inspect work in progress,
                    take photographs, interview workers, examine documents, and take samples. Where they
                    find breaches, they can issue <strong className="text-white">improvement notices</strong>{" "}
                    (requiring the duty holder to remedy a contravention within a specified period) or{" "}
                    <strong className="text-white">prohibition notices</strong> (requiring work to stop
                    immediately where there is a risk of serious personal injury). In serious cases, the
                    HSE can prosecute. The PC should cooperate fully with HSE inspectors and treat
                    inspections as an opportunity to improve, not as an adversarial process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Construction Phase Management Cycle Diagram ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HardHat className="h-5 w-5 text-blue-400" />
            Construction Phase Management Cycle
          </h2>
          <p className="text-white/80 mb-6 text-sm">
            The principal contractor&rsquo;s management of the construction phase follows a continuous
            improvement cycle. Each step feeds into the next, creating a self-reinforcing system that
            drives ongoing improvement in health and safety performance throughout the project.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/30 p-5 sm:p-6 rounded-lg">
            {/* Cycle steps */}
            <div className="space-y-3">
              {/* Plan */}
              <div className="rounded-xl border-2 border-blue-500/40 bg-blue-500/10 overflow-hidden">
                <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-2.5">
                  <p className="text-blue-400 font-bold text-base">1. PLAN</p>
                </div>
                <div className="p-4 text-sm text-white/80">
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Prepare and update the construction phase plan (CPP)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Identify hazards, assess risks, and develop RAMS for each phase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Establish site rules, welfare provisions, and emergency procedures</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center"><div className="w-0.5 h-4 bg-blue-500/30" /></div>

              {/* Communicate */}
              <div className="rounded-xl border-2 border-blue-500/40 bg-blue-500/10 overflow-hidden">
                <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-2.5">
                  <p className="text-blue-400 font-bold text-base">2. COMMUNICATE</p>
                </div>
                <div className="p-4 text-sm text-white/80">
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Deliver site inductions, toolbox talks, and pre-start briefings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Share the CPP, site rules, and emergency procedures with all workers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Hold weekly coordination meetings with subcontractors</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center"><div className="w-0.5 h-4 bg-blue-500/30" /></div>

              {/* Monitor */}
              <div className="rounded-xl border-2 border-blue-500/40 bg-blue-500/10 overflow-hidden">
                <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-2.5">
                  <p className="text-blue-400 font-bold text-base">3. MONITOR</p>
                </div>
                <div className="p-4 text-sm text-white/80">
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Carry out safety tours, inspections, and RAMS compliance checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Investigate incidents, near misses, and dangerous occurrences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Track KPIs and analyse trends in safety performance data</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center"><div className="w-0.5 h-4 bg-blue-500/30" /></div>

              {/* Review */}
              <div className="rounded-xl border-2 border-blue-500/40 bg-blue-500/10 overflow-hidden">
                <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-2.5">
                  <p className="text-blue-400 font-bold text-base">4. REVIEW</p>
                </div>
                <div className="p-4 text-sm text-white/80">
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Evaluate the effectiveness of controls and management arrangements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Assess whether the CPP remains adequate for the current phase of work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Consult workers on what is working and what needs to change</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center"><div className="w-0.5 h-4 bg-blue-500/30" /></div>

              {/* Improve */}
              <div className="rounded-xl border-2 border-blue-500/40 bg-blue-500/10 overflow-hidden">
                <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-2.5">
                  <p className="text-blue-400 font-bold text-base">5. IMPROVE</p>
                </div>
                <div className="p-4 text-sm text-white/80">
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Implement corrective actions from investigations and reviews</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Update the CPP, RAMS, site rules, and procedures as needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Share lessons learned and feed improvements back into the Plan stage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cycle indicator */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-blue-500/30" />
              <p className="text-xs text-white/50 italic text-center">
                The cycle repeats continuously throughout the construction phase, driving ongoing improvement
              </p>
              <div className="h-px w-8 bg-blue-500/30" />
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-blue-400/80 text-sm font-normal">&nbsp;</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Quiz ─── */}
        <div className="mt-12">
          <Quiz
            title="Managing the Construction Phase Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* ─── Bottom Navigation ─── */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-blue-500 text-white hover:bg-blue-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cdm-regulations-module-5-section-2">
              Next: Section 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
