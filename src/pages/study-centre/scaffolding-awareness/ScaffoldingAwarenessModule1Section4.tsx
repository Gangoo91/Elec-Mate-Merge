import {
  ArrowLeft,
  Users,
  CheckCircle,
  AlertTriangle,
  HardHat,
  ClipboardCheck,
  Shield,
  Ruler,
  Building2,
  FileText,
  MessageSquare,
  CreditCard,
  Handshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "scaffolding-awareness-m1s4-scaffolder-requirements",
    question:
      "What certification scheme must scaffolders hold to erect, alter, or dismantle scaffolds on UK construction sites?",
    options: [
      "CISRS (Construction Industry Scaffolders Record Scheme) card at the appropriate level",
      "Any general construction NVQ at Level 2 or above",
      "A CSCS Skilled Worker card in any trade discipline",
      "An employer-issued competence certificate signed by the site manager",
    ],
    correctIndex: 0,
    explanation:
      "Scaffolders must hold a valid CISRS card at the appropriate level (Trainee, Scaffolder, or Advanced Scaffolder). CISRS is the industry-recognised scheme that demonstrates competence in scaffold erection, alteration, and dismantling. General construction qualifications do not cover the specialist skills required for scaffolding work.",
  },
  {
    id: "scaffolding-awareness-m1s4-inspector-intervals",
    question:
      "Under the Work at Height Regulations 2005, how often must scaffolds be inspected by a competent person as a minimum?",
    options: [
      "Every 7 days, and after any event that could affect stability",
      "Every 14 days during normal use",
      "Monthly, with additional checks only if damage is reported",
      "Daily by the scaffold user, with no formal competent person inspection required",
    ],
    correctIndex: 0,
    explanation:
      "The Work at Height Regulations 2005 require scaffolds to be inspected by a competent person at intervals not exceeding 7 days, and after any event likely to have affected strength or stability (such as severe weather, accidental damage, or significant alteration). Each inspection must be recorded in a written report.",
  },
  {
    id: "scaffolding-awareness-m1s4-user-modify",
    question:
      "What is the correct action for a tradesperson who needs to remove a guard rail to fit a large component onto a scaffold platform?",
    options: [
      "Report the need to the scaffold supervisor and wait for a competent scaffolder to make the alteration safely",
      "Remove the guard rail themselves, complete the task, and replace it immediately afterwards",
      "Ask a colleague to hold the guard rail out of the way while the component is manoeuvred",
      "Remove the guard rail and attach a warning sign to alert other workers",
    ],
    correctIndex: 0,
    explanation:
      "Scaffold users must NEVER modify scaffolding themselves. Any alteration, including the temporary removal of guard rails, must be carried out by a competent CISRS-trained scaffolder. The correct action is to report the requirement through the proper channels and wait for the scaffolder to make the change safely, with appropriate measures in place to prevent falls.",
  },
];

const faqs = [
  {
    question: "Can a scaffold inspector also be the scaffolder who erected the scaffold?",
    answer:
      "While there is no absolute legal prohibition, it is strongly recommended that the inspector is independent of the erection team. Best practice, as outlined in NASC guidance, is for the inspector to be a different person from the scaffolder who erected or last altered the scaffold. This provides an independent check and reduces the risk of familiarity blindness, where someone who built the scaffold may overlook issues they are accustomed to. Many principal contractors require independent inspection as part of their site rules.",
  },
  {
    question: "What happens if a scaffold has no tag or the tag is out of date?",
    answer:
      "If a scaffold has no tag or the tag is out of date, it must NOT be used. A missing or expired tag means the scaffold has not been confirmed as safe by a competent inspector within the required timeframe. Any tradesperson encountering this situation should stop work on the scaffold immediately, report it to their supervisor or the site manager, and not return to work on the scaffold until it has been inspected and a valid tag (green) is displayed. Working on an untagged scaffold is a serious safety breach and a potential criminal offence under the Work at Height Regulations 2005.",
  },
  {
    question: "Who is responsible if a scaffold collapse injures a worker — the scaffolder, the inspector, or the principal contractor?",
    answer:
      "Liability in a scaffold collapse depends on the circumstances and can fall on multiple parties simultaneously. Under CDM 2015, the principal contractor has overall responsibility for scaffold safety on site. However, the scaffolder is responsible for erecting the scaffold correctly, the inspector is responsible for identifying defects during inspection, and the scaffold designer is responsible for ensuring the design is adequate. In practice, enforcement agencies (typically the HSE) will investigate the root cause and may prosecute any party whose failure contributed to the incident. Multiple prosecutions arising from a single collapse are not uncommon.",
  },
  {
    question: "Does the scaffold user need any specific training before working on scaffolds?",
    answer:
      "Yes. While scaffold users do not need CISRS scaffolding qualifications, they must receive adequate training and instruction on how to use scaffolds safely. This includes understanding scaffold tags, checking platform conditions and guard rails before use, knowing what constitutes a defect, understanding loading limits, and knowing how to report issues. This training is typically delivered through site inductions and toolbox talks. Under CDM 2015, the principal contractor must ensure all workers using scaffolds have received appropriate information, instruction, and training.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What does CISRS stand for, and what is its purpose in the scaffolding industry?",
    options: [
      "Construction Industry Scaffolders Record Scheme — the recognised competence scheme for scaffolders in the UK",
      "Certified Independent Scaffold Review System — the national scaffold inspection framework",
      "Construction Industry Safety Rating Standard — a site safety benchmarking tool",
      "Competent Inspector Scaffold Registration Scheme — the register of scaffold inspectors",
    ],
    correctAnswer: 0,
    explanation:
      "CISRS stands for Construction Industry Scaffolders Record Scheme. It is the industry-recognised competence scheme for scaffolders in the UK, managed by CISRS Ltd with support from the NASC. It provides a structured training and assessment pathway from Trainee through to Advanced Scaffolder, ensuring scaffolders have the knowledge and skills to erect, alter, and dismantle scaffolds safely.",
  },
  {
    id: 2,
    question:
      "Under the Work at Height Regulations 2005, when must a scaffold be inspected by a competent person? Select the MOST complete answer.",
    options: [
      "Before first use, at intervals not exceeding 7 days, and after any event likely to have affected stability",
      "Before first use and then monthly during continued use",
      "Only after severe weather events or reported damage",
      "Weekly during the first month, then fortnightly if no defects are found",
    ],
    correctAnswer: 0,
    explanation:
      "The Work at Height Regulations 2005 (Schedule 7) require scaffold inspections before first use, at intervals not exceeding 7 days during continued use, and after any event likely to have affected strength or stability (such as severe weather, accidental damage, or significant modifications). All inspections must be carried out by a competent person and recorded in writing.",
  },
  {
    id: 3,
    question:
      "When is a scaffold designer required instead of relying on TG20 compliance sheets?",
    options: [
      "When the scaffold falls outside the scope of TG20 — for example, unusual geometry, heavy loading, or complex tie arrangements",
      "Only when the scaffold exceeds 50 metres in height",
      "Whenever the scaffold will be used for more than 6 months",
      "A scaffold designer is always required regardless of scaffold type",
    ],
    correctAnswer: 0,
    explanation:
      "A scaffold designer is required whenever the scaffold falls outside the scope of TG20 (the NASC guidance for tube and fitting scaffolds). This includes non-standard configurations, unusual geometries, heavy or concentrated loads, complex tie arrangements, cantilevers, loading bays, and any scaffold where a TG20 compliance sheet cannot be produced. The designer — typically a structural engineer or NASC-qualified designer — produces bespoke design drawings and calculations.",
  },
  {
    id: 4,
    question:
      "What must a scaffold user check BEFORE stepping onto a scaffold each time they use it?",
    options: [
      "Green tag displayed and valid, platform complete with no gaps, guard rails in place, no visible damage, and no obvious overloading",
      "Only that the scaffold tag is present — all other checks are the inspector's responsibility",
      "That the scaffold has been erected in the last 7 days",
      "That the scaffolder is still on site in case modifications are needed",
    ],
    correctAnswer: 0,
    explanation:
      "Before each use, scaffold users must carry out a visual check: confirm a green (safe to use) tag is displayed and within date, check the platform is complete with no gaps or missing boards, verify guard rails and toe boards are in place, look for any visible damage or defects, and check there is no obvious overloading. If any of these checks fail, the scaffold must not be used and the defect must be reported immediately.",
  },
  {
    id: 5,
    question:
      "What is the role of the Temporary Works Coordinator in relation to scaffolding under CDM 2015?",
    options: [
      "Overseeing all temporary works including scaffolding, ensuring designs are checked, reviewing erection sequences, and managing handover",
      "Physically erecting and dismantling all temporary works on site",
      "Carrying out the 7-day scaffold inspections required by the Work at Height Regulations",
      "Designing all scaffolds on site regardless of whether they fall within TG20 scope",
    ],
    correctAnswer: 0,
    explanation:
      "The Temporary Works Coordinator (TWC) has a management and oversight role under CDM 2015. They oversee all temporary works including scaffolding, ensure designs are properly checked and approved, review erection sequences, manage the handover process from the scaffolder to the user, and maintain the temporary works register. They do not physically erect scaffolds or carry out routine inspections — those are the scaffolder's and inspector's roles respectively.",
  },
  {
    id: 6,
    question:
      "Under CDM 2015, what are the principal contractor's key responsibilities regarding scaffold safety on site?",
    options: [
      "Ensuring scaffolds are inspected, managing scaffold permits and tags, ensuring only competent scaffolders erect scaffolds, and coordinating between trades",
      "Personally inspecting every scaffold on site at least once per week",
      "Designing all scaffolds and producing TG20 compliance sheets",
      "Providing all scaffold materials and equipment from their own stock",
    ],
    correctAnswer: 0,
    explanation:
      "The principal contractor has overall responsibility for scaffold safety on site under CDM 2015. This includes ensuring scaffolds are inspected at the required intervals, managing scaffold permit and tag systems, ensuring only competent (CISRS-carded) scaffolders erect, alter, or dismantle scaffolds, coordinating between different trades using scaffolds, and ensuring all scaffold users have received appropriate information, instruction, and training.",
  },
  {
    id: 7,
    question:
      "What does the scaffold handover process involve, and why is it important?",
    options: [
      "A formal transfer from the scaffolder to the user including verbal and written confirmation that the scaffold is complete, safe, and fit for its intended purpose",
      "Simply removing the scaffolder's tools from the platform so users can access it",
      "The scaffolder leaving site after completing the build — no formal process is needed",
      "The inspector issuing a green tag, which automatically constitutes handover to all trades",
    ],
    correctAnswer: 0,
    explanation:
      "Scaffold handover is a formal process where the scaffolder confirms to the user (or their representative) that the scaffold is complete, has been erected in accordance with the design or TG20, is safe, and is fit for its intended purpose and specified loading. It includes verbal briefing, written handover documentation, entry in the scaffold register, and — where applicable — a permit-to-load. Proper handover ensures the user understands any limitations or special conditions.",
  },
  {
    id: 8,
    question:
      "What duties does CDM 2015 place on the client in relation to scaffolding?",
    options: [
      "Allowing adequate time and resources for scaffold design and erection, appointing competent contractors, and ensuring pre-construction information includes scaffold requirements",
      "The client has no duties regarding scaffolding — all responsibility falls on the principal contractor",
      "Personally approving every scaffold design before erection can begin",
      "Providing all scaffold materials and equipment directly to the scaffolding contractor",
    ],
    correctAnswer: 0,
    explanation:
      "Under CDM 2015, the client must make suitable arrangements for managing their project, which includes allowing adequate time and resources for scaffold design and erection, appointing competent contractors (including scaffolding contractors), and ensuring pre-construction information includes relevant details about scaffold requirements, site conditions, and any constraints. The client's duties are management and procurement duties — they do not need to approve individual designs but must ensure the right people and resources are in place.",
  },
];

export default function ScaffoldingAwarenessModule1Section4() {
  useSEO({
    title: "Who Does What? | Scaffolding Awareness Module 1.4",
    description:
      "Scaffold roles and responsibilities: scaffolder, scaffold inspector, scaffold designer, scaffold user, temporary works coordinator, principal contractor, client duties, and handover processes under CDM 2015.",
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
            <Link to="../scaffolding-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <Users className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">MODULE 1 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Who Does What?
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Roles and responsibilities in scaffolding &mdash; from the scaffolder who builds it, to the inspector who checks it, the designer who specifies it, and every tradesperson who works on it
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">Key Roles</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Scaffolder:</strong> CISRS-trained, erects &amp; dismantles</li>
              <li><strong>Inspector:</strong> Competent person, 7-day checks</li>
              <li><strong>Designer:</strong> Non-standard scaffold calculations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400/90 text-base font-medium mb-2">Key Duties</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>User:</strong> Check before use, never modify</li>
              <li><strong>TWC:</strong> Oversees all temporary works</li>
              <li><strong>Principal Contractor:</strong> Overall site scaffold safety</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the CISRS card levels and explain what each level permits a scaffolder to do",
              "Identify the competent person requirements for scaffold inspection under the Work at Height Regulations 2005",
              "Explain when a scaffold designer is required and what they produce",
              "List the checks a scaffold user must carry out before working on a scaffold",
              "Describe the role of the Temporary Works Coordinator in managing scaffolding",
              "Outline the principal contractor's and client's duties regarding scaffold safety under CDM 2015",
              "Explain the scaffold handover process and why it is critical for safe working",
              "Describe how communication and coordination between roles prevents scaffold incidents",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Scaffolder */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            The Scaffolder
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The scaffolder is the skilled operative responsible for the <strong>safe erection, alteration, and dismantling</strong> of scaffolding structures on construction sites. In the United Kingdom, scaffolders must be trained and certificated through the <strong>Construction Industry Scaffolders Record Scheme (CISRS)</strong>, which is the industry-recognised competence framework managed by CISRS Ltd in partnership with the National Access and Scaffolding Confederation (NASC).
              </p>

              <p>
                CISRS certification is not merely a recommendation &mdash; it is the accepted standard across the UK construction industry. Most principal contractors, local authorities, and commercial clients will not allow scaffolders on site without a valid CISRS card. The scheme provides a structured progression from trainee level through to advanced scaffolder, with each level unlocking additional capabilities and responsibilities.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">CISRS Card Levels</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The CISRS scheme operates a tiered card system reflecting increasing levels of competence and responsibility:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">CISRS Labourer Card</strong> &mdash; for scaffold labourers who assist scaffolders but do not erect scaffold structures themselves; requires CISRS scaffold labourer training and a valid CITB HS&amp;E test pass</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">CISRS Trainee Scaffolder Card</strong> &mdash; for individuals who have completed Part 1 scaffolder training; allows them to work under direct supervision of a qualified scaffolder while gaining site experience towards their Part 2 assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">CISRS Scaffolder Card</strong> &mdash; for operatives who have completed Part 1 and Part 2 scaffolder training plus the required on-site experience and NVQ Level 2 in Accessing Operations and Rigging (Scaffolding); qualified to erect, alter, and dismantle standard scaffolds within the scope of TG20</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">CISRS Advanced Scaffolder Card</strong> &mdash; for experienced scaffolders who have completed advanced training and hold NVQ Level 3; qualified to erect complex and non-standard scaffolds including system scaffolds, suspended scaffolds, and bespoke structures</span>
                  </li>
                </ul>
              </div>

              <p>
                Regardless of card level, every scaffolder must <strong>follow the design</strong> when erecting a scaffold. For standard scaffolds within TG20 scope, this means following the relevant TG20 compliance sheet. For non-standard scaffolds, the scaffolder must follow the bespoke design drawings and calculations provided by the scaffold designer. Deviating from the design without authorisation is a serious safety breach.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Scaffolder Responsibilities</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Erect, alter, and dismantle scaffolds <strong className="text-white">safely and in accordance with the design</strong> or TG20 compliance sheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Ensure all <strong className="text-white">components are in good condition</strong> before use &mdash; reject damaged tubes, fittings, or boards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Install <strong className="text-white">guard rails, toe boards, and brick guards</strong> as required to prevent falls and falling objects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Install <strong className="text-white">ties at the specified pattern and intervals</strong> to ensure lateral stability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Carry out work in accordance with the <strong className="text-white">method statement and risk assessment</strong> for the scaffold erection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Participate in the <strong className="text-white">handover process</strong> &mdash; confirm the scaffold is complete and safe before handing over to users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Report any <strong className="text-white">site conditions that prevent safe erection</strong> &mdash; such as poor ground, obstructions, or overhead hazards</span>
                  </li>
                </ul>
              </div>

              {/* CISRS Card Levels Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-4 text-center">CISRS Card Levels &mdash; Trainee Through Advanced</p>

                <div className="space-y-3 max-w-2xl mx-auto">
                  {/* Labourer */}
                  <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-7 rounded bg-yellow-600/80 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">LAB</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Scaffold Labourer</p>
                        <p className="text-xs text-white/50">Yellow card</p>
                      </div>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1 ml-[52px]">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Assists scaffolders with material handling and site preparation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Does NOT erect, alter, or dismantle scaffold structures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Requires CISRS labourer training + HS&amp;E test pass</span>
                      </li>
                    </ul>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-slate-500/30" />
                  </div>

                  {/* Trainee */}
                  <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-7 rounded bg-red-600/80 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">TRN</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Trainee Scaffolder</p>
                        <p className="text-xs text-white/50">Red card &mdash; Part 1 complete</p>
                      </div>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1 ml-[52px]">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Works under direct supervision of a qualified scaffolder</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Gaining practical site experience towards Part 2</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Must complete on-site assessment and NVQ to progress</span>
                      </li>
                    </ul>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-slate-500/30" />
                  </div>

                  {/* Scaffolder */}
                  <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-7 rounded bg-blue-600/80 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">SCF</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Scaffolder</p>
                        <p className="text-xs text-white/50">Blue card &mdash; Part 1 + Part 2 + NVQ L2</p>
                      </div>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1 ml-[52px]">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Qualified to erect, alter, and dismantle standard scaffolds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Must work within TG20 scope for standard configurations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Holds NVQ Level 2 in Accessing Operations and Rigging</span>
                      </li>
                    </ul>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-0.5 h-4 bg-slate-500/30" />
                  </div>

                  {/* Advanced */}
                  <div className="bg-slate-500/15 border border-slate-400/40 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-7 rounded bg-slate-400/80 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-black">ADV</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Advanced Scaffolder</p>
                        <p className="text-xs text-white/50">Gold card &mdash; Advanced training + NVQ L3</p>
                      </div>
                    </div>
                    <ul className="text-xs text-white/80 space-y-1 ml-[52px]">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Qualified for complex and non-standard scaffolds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>System scaffolds, suspended scaffolds, bespoke structures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                        <span>Holds NVQ Level 3 &mdash; highest operative qualification</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4">
                  All CISRS cards require a valid CITB HS&amp;E test pass and must be renewed before expiry
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Scaffold Inspector */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            The Scaffold Inspector
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The scaffold inspector is the <strong>competent person</strong> responsible for carrying out formal inspections of scaffolds as required by the <strong>Work at Height Regulations 2005</strong>. The regulations specify that scaffolds must be inspected by a competent person before first use, at intervals not exceeding 7 days during continued use, and after any event likely to have affected the scaffold's strength or stability.
              </p>

              <p>
                The term &ldquo;competent person&rdquo; is not defined by a specific qualification in the regulations, but industry guidance from the NASC and HSE makes clear that the inspector must have <strong>sufficient training, experience, and knowledge</strong> to identify defects and assess whether a scaffold is safe for use. In practice, this means the inspector should hold a recognised scaffold inspection qualification.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Inspection Triggers</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Under Schedule 7 of the Work at Height Regulations 2005, scaffold inspections must take place:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Before first use</strong> &mdash; after initial erection is complete, before any tradesperson accesses the scaffold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">At intervals not exceeding 7 days</strong> &mdash; measured from the date of the last inspection, not from the day the scaffold was erected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">After any event likely to have affected stability</strong> &mdash; severe weather (high winds, heavy rain, snow, ice), accidental impact (vehicle strikes, crane contact), significant alteration, or any other event that could compromise the scaffold</span>
                  </li>
                </ul>
              </div>

              <p>
                Each inspection must result in a <strong>written inspection report</strong> prepared on the same day as the inspection. The report must include the date, location, description of the scaffold, name and position of the inspector, details of any defects found, and confirmation of whether the scaffold is safe for use. These reports must be retained on site and made available to the HSE on request.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Scaffold Tags</p>
                <p className="text-sm text-white/80 mb-3">
                  Following inspection, the inspector applies a <strong className="text-white">scaffold tag</strong> to communicate the scaffold&rsquo;s status to all site personnel:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span><strong className="text-green-400">Green tag</strong> &mdash; scaffold is safe to use; includes the date of inspection and the next inspection due date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span><strong className="text-amber-400">Amber/yellow tag</strong> &mdash; scaffold has restrictions; may be usable with specific limitations (e.g., reduced loading, restricted areas); details of restrictions must be clearly stated on the tag</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                    <span><strong className="text-red-400">Red tag</strong> &mdash; scaffold is NOT safe to use; do not access under any circumstances; scaffold requires remedial work by a competent scaffolder before re-inspection</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Inspector Qualifications</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Recognised scaffold inspection training includes:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">CISRS Scaffold Inspection Training Scheme (SITS)</strong> &mdash; the industry-standard course specifically for scaffold inspectors, covering inspection methodology, defect identification, and report writing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">CISRS Advanced Scaffold Inspection</strong> &mdash; for inspectors dealing with complex or non-standard scaffolds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Relevant experience</strong> &mdash; the inspector should have practical understanding of scaffold construction, common defects, and loading requirements</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Inspector&rsquo;s Key Duties</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Carry out <strong className="text-white">thorough visual and physical inspections</strong> covering foundations, standards, ledgers, braces, ties, platforms, guard rails, toe boards, and access points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Prepare a <strong className="text-white">written inspection report</strong> on the same working day as the inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Apply the <strong className="text-white">appropriate scaffold tag</strong> (green, amber, or red) based on findings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Communicate <strong className="text-white">defects to the responsible person</strong> so remedial action can be taken promptly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Ensure <strong className="text-white">unsafe scaffolds are taken out of service</strong> immediately by applying a red tag and informing site management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Scaffold Designer */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">03</span>
            The Scaffold Designer
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The scaffold designer is required when a scaffold falls <strong>outside the scope of TG20</strong> &mdash; meaning it cannot be covered by a standard TG20 compliance sheet. TG20 (published by the NASC) provides pre-calculated solutions for common tube and fitting scaffold configurations up to certain heights, with standard loading and tie arrangements. Any scaffold that exceeds these parameters requires a bespoke design.
              </p>

              <p>
                Scaffold designers are typically <strong>structural engineers</strong> or individuals who hold <strong>NASC-recognised scaffold design qualifications</strong>. They have specialist knowledge of structural analysis, load calculations, wind loading, and the behaviour of scaffold systems under various conditions. Their work is essential for ensuring that non-standard scaffolds are structurally adequate and safe.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">When Is a Designer Required?</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  A scaffold designer is needed whenever the scaffold cannot be covered by TG20. Common triggers include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Height exceeding TG20 limits</strong> &mdash; scaffolds above the maximum height covered by TG20 compliance sheets for the particular configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Heavy or concentrated loads</strong> &mdash; such as masonry loading bays, materials hoists, crane landing platforms, or scaffolds supporting formwork</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Unusual geometry</strong> &mdash; curved scaffolds, scaffolds on sloping ground, scaffolds bridging gaps, or scaffolds with irregular plan shapes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Complex tie arrangements</strong> &mdash; where standard tie patterns cannot be achieved due to building features, openings, or cladding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Cantilever or suspended scaffolds</strong> &mdash; scaffolds that are not supported from the ground in the conventional manner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Temporary roofs or encapsulation</strong> &mdash; scaffold structures supporting sheeting or temporary roof systems that create additional wind loading</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What the Designer Produces</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Design drawings</strong> &mdash; detailed drawings showing the scaffold layout, dimensions, lift heights, bay lengths, bracing arrangement, and all components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Structural calculations</strong> &mdash; demonstrating that the scaffold can safely support all applied loads including self-weight, imposed loads, wind loads, and any special loads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Tie pattern specification</strong> &mdash; the precise location, type, and capacity of ties required to resist horizontal forces and provide lateral stability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Foundation requirements</strong> &mdash; specifying sole board sizes, base plate types, and any special foundation requirements based on ground conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Loading schedule</strong> &mdash; clearly stating the maximum permitted loads on each platform level and any load restrictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Special instructions</strong> &mdash; any specific requirements for erection sequence, material specification, or limitations on use</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Design Check Requirement</p>
                </div>
                <p className="text-sm text-white/80">
                  Under good practice and NASC guidance, scaffold designs should be subject to an <strong className="text-white">independent design check</strong> by a suitably qualified person other than the original designer. This is particularly important for complex or high-risk scaffolds. The Temporary Works Coordinator is responsible for ensuring the design check is carried out before erection begins. Any design changes during erection must be referred back to the designer for approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Scaffold User */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">04</span>
            The Scaffold User
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The scaffold user is <strong>every tradesperson who works on or from a scaffold</strong> &mdash; bricklayers, electricians, painters, plumbers, cladders, window fitters, and any other operative who accesses a scaffolded area to carry out their work. Although scaffold users do not erect or formally inspect scaffolds, they have critical responsibilities that directly affect their own safety and the safety of everyone on site.
              </p>

              <p>
                The single most important rule for scaffold users is: <strong>you must NEVER modify the scaffold</strong>. Removing a guard rail, moving boards, removing ties, adding unauthorised loads, or making any other change to the scaffold structure is strictly prohibited. Only a competent, CISRS-trained scaffolder may alter a scaffold. Unauthorised modifications are one of the leading causes of scaffold-related accidents and fatalities in the UK.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Pre-Use Checks &mdash; Every Time</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Before stepping onto any scaffold, every user must carry out a quick visual check:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Green tag displayed and in date</strong> &mdash; confirm the scaffold has been inspected within the last 7 days and the tag shows it is safe to use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Platform condition</strong> &mdash; boards are complete with no gaps exceeding 25mm, boards are not damaged, split, or bowed, and the platform is free of debris and trip hazards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Guard rails in place</strong> &mdash; main guard rail at approximately 950mm, intermediate guard rail (or equivalent protection), and toe boards at platform edge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Safe access</strong> &mdash; ladders are tied, access gates are functioning, and the access route is clear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">No visible damage</strong> &mdash; no bent tubes, missing fittings, damaged bracing, or signs of impact damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">No obvious overloading</strong> &mdash; no excessive materials stacked on platforms beyond what is needed for the immediate task</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">Critical &mdash; Never Modify the Scaffold</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The following actions by scaffold users are <strong className="text-white">strictly prohibited</strong>:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Removing guard rails, toe boards, or brick guards for any reason</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Moving or removing scaffold boards or platform decking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Removing or loosening ties, braces, or structural fittings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Using the scaffold for purposes it was not designed for (e.g., as a crane base or for vehicle access)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Overloading platforms beyond the specified maximum load</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                    <span>Climbing the outside of the scaffold instead of using the designated access</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Reporting Defects</p>
                <p className="text-sm text-white/80 mb-3">
                  If a scaffold user identifies any defect, they must:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Stop work immediately</strong> and leave the scaffold if the defect presents an immediate danger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Report the defect</strong> to their supervisor, the site manager, or the scaffolding contractor as soon as possible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Warn others</strong> &mdash; alert colleagues who may also be using or about to use the scaffold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Do not attempt to fix the defect</strong> &mdash; only a competent scaffolder should carry out repairs or modifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Do not return to the scaffold</strong> until the defect has been remedied by a competent scaffolder and the scaffold has been re-inspected</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The Temporary Works Coordinator */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">05</span>
            The Temporary Works Coordinator
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Temporary Works Coordinator (TWC) is a role established under <strong>CDM 2015</strong> and described in detail in <strong>BS 5975 (Code of Practice for Temporary Works)</strong>. The TWC oversees <strong>all temporary works on a construction project</strong>, which includes scaffolding, formwork, falsework, shoring, propping, temporary hoarding, and any other structure that is needed during construction but does not form part of the permanent works.
              </p>

              <p>
                The TWC is a <strong>management and coordination role</strong>, not an operative role. They do not physically erect scaffolds, carry out inspections, or produce designs. Instead, they ensure that the correct processes are followed throughout the lifecycle of every temporary works item &mdash; from initial design briefing through to final dismantling and removal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">TWC Responsibilities for Scaffolding</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Ensure designs are produced and checked</strong> &mdash; for non-standard scaffolds, the TWC ensures a bespoke design is prepared by a competent designer and subjected to an independent design check before erection begins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Review erection sequence</strong> &mdash; the TWC reviews method statements for scaffold erection to ensure the proposed sequence is safe and practical, particularly for complex scaffolds where the order of operations is critical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Manage the permit process</strong> &mdash; the TWC oversees scaffold permits, ensuring that scaffolds are formally handed over from the scaffolder to the user, and that any load permits are in place before loading commences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Maintain the temporary works register</strong> &mdash; a formal log of all temporary works on site, including scaffolds, their current status, design references, inspection dates, and any permits issued</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Manage design changes</strong> &mdash; if site conditions require changes to a scaffold design, the TWC ensures these are referred back to the designer for approval rather than being made ad hoc on site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Oversee dismantling</strong> &mdash; the TWC ensures scaffolds are dismantled safely and in the correct sequence, particularly where early removal could affect other temporary or permanent works</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">The Temporary Works Register</p>
                </div>
                <p className="text-sm text-white/80">
                  The temporary works register is a <strong className="text-white">live document</strong> maintained by the TWC that tracks every temporary works item on the project. For scaffolds, it typically records: scaffold reference number, location, type, design reference (TG20 sheet or bespoke design number), date of erection, handover date, inspection dates and results, any permits issued, date of dismantling, and current status. The register provides a single point of reference for the status of all scaffolding on site and is essential for demonstrating compliance during audits or HSE inspections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: The Principal Contractor */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">06</span>
            The Principal Contractor
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under <strong>CDM 2015</strong>, the principal contractor has <strong>overall responsibility for scaffold safety on site</strong>. This does not mean the principal contractor must personally erect, inspect, or design scaffolds &mdash; but they must ensure that effective management systems are in place so that all scaffolding work is carried out safely and in compliance with the law.
              </p>

              <p>
                The principal contractor&rsquo;s role is one of <strong>coordination, management, and enforcement</strong>. They must ensure that different contractors working on site do not create risks for each other, and that scaffold safety is integrated into the overall site management system. On large projects with multiple scaffolding contractors, this coordination role is particularly critical.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Principal Contractor&rsquo;s Scaffold Duties</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Ensure scaffolds are inspected</strong> at the intervals required by the Work at Height Regulations 2005 (before first use, every 7 days, and after events affecting stability)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Manage scaffold permit and tag systems</strong> &mdash; implement and enforce a scaffold tagging regime so that all site personnel can immediately see whether a scaffold is safe to use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Ensure only competent scaffolders erect scaffolds</strong> &mdash; verify that all scaffolders hold valid CISRS cards at the appropriate level for the work being undertaken</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Coordinate between trades</strong> &mdash; manage the interface between scaffolding operations and other site activities to prevent conflicts, such as ensuring scaffolders are not working above unprotected operatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Provide information, instruction, and training</strong> &mdash; ensure all workers who use scaffolds have received appropriate scaffold awareness training, typically through site inductions and toolbox talks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Monitor compliance</strong> &mdash; carry out regular checks to verify that scaffold management procedures are being followed, that inspection reports are up to date, and that tags are current</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Take enforcement action</strong> &mdash; stop work, issue warnings, or remove individuals from site if scaffold safety rules are breached</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Liability</p>
                </div>
                <p className="text-sm text-white/80">
                  If a scaffold incident occurs on site, the principal contractor may face enforcement action from the HSE if it can be shown that their management systems were inadequate. Under CDM 2015, the principal contractor has a <strong className="text-white">non-delegable duty</strong> to plan, manage, and monitor construction work to ensure it is carried out safely. This means they cannot simply pass responsibility to a scaffolding subcontractor and claim ignorance if something goes wrong. The principal contractor must actively manage and oversee scaffold safety as part of their overall site management duties.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: The Client's Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">07</span>
            The Client&rsquo;s Duties
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under <strong>CDM 2015</strong>, the client is the organisation or individual for whom the construction project is being carried out. The client has specific legal duties that apply to scaffolding, even though they are unlikely to be directly involved in scaffold erection or inspection. These duties are <strong>management and procurement duties</strong> &mdash; ensuring the right conditions exist for scaffolding to be done safely.
              </p>

              <p>
                Many clients, particularly those who do not regularly commission construction work, are unaware of their duties under CDM 2015. However, ignorance is not a defence. The regulations place clear responsibilities on the client, and failure to meet these duties can result in enforcement action by the HSE.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Client&rsquo;s Key Duties Regarding Scaffolding</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Allow adequate time</strong> for scaffold design and erection &mdash; compressed programmes that do not allow sufficient time for proper scaffold design, procurement, and erection create pressure that leads to shortcuts and unsafe practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Allocate adequate resources</strong> &mdash; the client must ensure sufficient budget is available for safe scaffolding, including design fees, competent scaffolders, quality materials, and proper inspection regimes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Appoint competent contractors</strong> &mdash; the client must take reasonable steps to ensure that the scaffolding contractor is competent, which in practice means checking CISRS registration, NASC membership, insurance, and track record</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Provide pre-construction information</strong> &mdash; the client must ensure that relevant information is provided to the principal designer and principal contractor, including details that affect scaffold requirements such as building condition, underground services, access restrictions, and any known hazards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Make suitable arrangements</strong> for managing the project &mdash; this includes ensuring appropriate management structures are in place for scaffold safety, not just relying on the cheapest tender</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Cost vs. Safety</p>
                </div>
                <p className="text-sm text-white/80">
                  Clients who award scaffold contracts based solely on the lowest price often end up with inadequate scaffolding that requires costly remedial work, delays the project, and creates safety risks. Under CDM 2015, the client must ensure that their <strong className="text-white">procurement decisions do not compromise safety</strong>. This means evaluating scaffold tenders on competence, quality, and safety record &mdash; not just price. The HSE has specifically highlighted client pressure on costs as a contributing factor in scaffold incidents.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Pre-Construction Information &mdash; Scaffold-Relevant Items</p>
                <p className="text-sm text-white/80 mb-3">
                  The client should ensure the following information is available to scaffold designers and contractors:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Building structure and condition</strong> &mdash; information about the fa&ccedil;ade, wall ties, structural integrity, and suitability for scaffold ties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Ground conditions</strong> &mdash; soil type, underground services, drainage runs, and any ground contamination that affects scaffold foundations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Access restrictions</strong> &mdash; site boundaries, neighbouring properties, public footpaths, road closures required for scaffold erection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Overhead hazards</strong> &mdash; power lines, overhead cables, crane paths, and any other above-ground obstructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Previous scaffold arrangements</strong> &mdash; if the building has been scaffolded before, information about what worked and any issues encountered</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Communication & Handover */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Communication &amp; Handover
          </h2>
          <div className="border-l-2 border-slate-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective communication between all scaffold roles is <strong>essential for preventing incidents</strong>. Scaffold accidents frequently occur not because individuals lack competence in their own role, but because information fails to flow between roles. A scaffolder who does not communicate a limitation, a designer whose instructions are not passed to the erection team, or a user who does not report a defect &mdash; each represents a communication failure that can have fatal consequences.
              </p>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Handshake className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">The Scaffold Handover Process</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Scaffold handover is the formal process by which the completed scaffold is transferred from the scaffolder to the user. It is a critical safety step that should never be skipped or treated as a formality:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Verbal handover</strong> &mdash; the scaffolder (or scaffold supervisor) briefs the user (or their supervisor) on the scaffold&rsquo;s configuration, any limitations, maximum loading per platform, access arrangements, and any special conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Written handover</strong> &mdash; a handover certificate or form is completed and signed by both the scaffolder and the receiving party, confirming the scaffold is complete, safe, and fit for its intended purpose</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Scaffold register entry</strong> &mdash; the scaffold is entered into the site scaffold register with all relevant details including reference number, location, type, design reference, handover date, and intended use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Tag applied</strong> &mdash; following the initial inspection, a green tag is applied to confirm the scaffold is safe for use</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-slate-400" />
                  <p className="text-sm font-medium text-slate-400">Permit-to-Load Systems</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  On many sites, a <strong className="text-white">permit-to-load</strong> system operates alongside the scaffold tag system. This is particularly important for scaffolds designed for specific loading conditions:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>The permit specifies the <strong className="text-white">maximum load</strong> that may be placed on each platform level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>It defines <strong className="text-white">what types of materials</strong> may be stored on the scaffold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>It states <strong className="text-white">how materials should be distributed</strong> across the platform to avoid concentrated point loads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Loading beyond the permitted limit requires a <strong className="text-white">new design check or scaffold modification</strong> before additional load is applied</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Communication of Alterations</p>
                <p className="text-sm text-white/80 mb-3">
                  When a scaffold is altered after initial handover &mdash; for example, to add an additional lift, modify access, or accommodate a change in the building works &mdash; a clear communication process must be followed:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">All users must be notified</strong> before the alteration begins &mdash; they must vacate the scaffold during the modification work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>The scaffold must be <strong className="text-white">re-tagged as red</strong> (unsafe) during the alteration to prevent access by non-scaffold workers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>Once the alteration is complete, the scaffold must be <strong className="text-white">re-inspected</strong> by a competent person before users can return</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>A <strong className="text-white">new handover</strong> must take place covering the altered scaffold, including any changes to loading, access, or limitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span>The <strong className="text-white">scaffold register must be updated</strong> to reflect the alteration, new inspection date, and revised handover</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Multi-Trade Coordination</p>
                <p className="text-sm text-white/80 mb-3">
                  On busy construction sites, multiple trades may need to use the same scaffold at different times, or scaffolding work may need to be coordinated with other activities. Effective multi-trade coordination includes:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Scheduling scaffold access</strong> to prevent overcrowding and overloading &mdash; not all trades should be on the same scaffold level simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Coordinating scaffold modifications</strong> with trade requirements &mdash; ensuring scaffolders alter the scaffold to suit the next phase of work before the new trade arrives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Preventing conflicting operations</strong> &mdash; for example, scaffolders should not be dismantling scaffold above a level where other trades are working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Regular communication meetings</strong> &mdash; toolbox talks, coordination meetings, and daily briefings that include scaffold status updates so all trades are aware of the current situation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-slate-400" />
                    <span><strong className="text-white">Clear reporting channels</strong> &mdash; every worker on site must know who to report scaffold concerns to and be confident that reports will be acted upon promptly</span>
                  </li>
                </ul>
              </div>

              {/* Scaffold Roles & Responsibilities Matrix */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-slate-400 mb-4 text-center">Scaffold Roles &amp; Responsibilities Matrix (RACI)</p>
                <p className="text-xs text-white/50 text-center mb-4">
                  R = Responsible (does the work) &nbsp;&middot;&nbsp; A = Accountable (ultimately answerable) &nbsp;&middot;&nbsp; C = Consulted &nbsp;&middot;&nbsp; I = Informed
                </p>

                <div className="overflow-x-auto -mx-2">
                  <div className="min-w-[600px] px-2">
                    {/* Header Row */}
                    <div className="grid grid-cols-7 gap-1 mb-1">
                      <div className="bg-slate-500/20 border border-slate-500/30 rounded p-2">
                        <p className="text-[10px] font-bold text-slate-300 text-center">Activity</p>
                      </div>
                      <div className="bg-slate-500/20 border border-slate-500/30 rounded p-2">
                        <p className="text-[10px] font-bold text-slate-300 text-center">Scaffolder</p>
                      </div>
                      <div className="bg-slate-500/20 border border-slate-500/30 rounded p-2">
                        <p className="text-[10px] font-bold text-slate-300 text-center">Inspector</p>
                      </div>
                      <div className="bg-slate-500/20 border border-slate-500/30 rounded p-2">
                        <p className="text-[10px] font-bold text-slate-300 text-center">Designer</p>
                      </div>
                      <div className="bg-slate-500/20 border border-slate-500/30 rounded p-2">
                        <p className="text-[10px] font-bold text-slate-300 text-center">User</p>
                      </div>
                      <div className="bg-slate-500/20 border border-slate-500/30 rounded p-2">
                        <p className="text-[10px] font-bold text-slate-300 text-center">TWC</p>
                      </div>
                      <div className="bg-slate-500/20 border border-slate-500/30 rounded p-2">
                        <p className="text-[10px] font-bold text-slate-300 text-center">Prin. Con.</p>
                      </div>
                    </div>

                    {/* Data Rows */}
                    {[
                      { activity: "Design (non-standard)", vals: ["I", "C", "R", "I", "A", "A"] },
                      { activity: "Erection", vals: ["R", "I", "C", "I", "C", "A"] },
                      { activity: "7-Day Inspection", vals: ["C", "R", "I", "I", "C", "A"] },
                      { activity: "Tag Application", vals: ["I", "R", "—", "I", "C", "A"] },
                      { activity: "Pre-Use Check", vals: ["—", "—", "—", "R", "I", "A"] },
                      { activity: "Defect Reporting", vals: ["C", "C", "C", "R", "C", "A"] },
                      { activity: "Handover", vals: ["R", "R", "C", "I", "A", "A"] },
                      { activity: "Alteration", vals: ["R", "R", "C", "I", "A", "A"] },
                      { activity: "Dismantling", vals: ["R", "I", "C", "I", "A", "A"] },
                      { activity: "Register Maintenance", vals: ["I", "I", "I", "I", "R", "A"] },
                    ].map((row, i) => (
                      <div key={i} className={`grid grid-cols-7 gap-1 mb-1 ${i % 2 === 0 ? "" : ""}`}>
                        <div className="bg-white/5 border border-white/5 rounded p-2">
                          <p className="text-[10px] text-white/80 font-medium">{row.activity}</p>
                        </div>
                        {row.vals.map((val, j) => (
                          <div key={j} className={`rounded p-2 text-center border ${
                            val === "R" ? "bg-blue-500/15 border-blue-500/30" :
                            val === "A" ? "bg-slate-500/15 border-slate-500/30" :
                            val === "C" ? "bg-amber-500/10 border-amber-500/20" :
                            val === "I" ? "bg-white/5 border-white/5" :
                            "bg-white/[0.02] border-white/5"
                          }`}>
                            <p className={`text-[10px] font-bold ${
                              val === "R" ? "text-blue-400" :
                              val === "A" ? "text-slate-300" :
                              val === "C" ? "text-amber-400" :
                              val === "I" ? "text-white/40" :
                              "text-white/20"
                            }`}>{val}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4">
                  Multiple parties may share accountability depending on contractual arrangements &mdash; this matrix shows the typical allocation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Navigation — Back to Module 1 / Next: Module 2 */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pb-8 border-b border-white/10 mb-10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

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

        {/* Repeated Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-2">
              Next: Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
