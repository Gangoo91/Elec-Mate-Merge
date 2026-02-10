import { ArrowLeft, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "report-contents",
    question:
      "A scaffold inspection report simply states 'Scaffold OK — no issues.' Does this meet the legal requirements of WAH Regs Schedule 7?",
    options: [
      "Yes — it confirms the scaffold has been inspected",
      "No — the report must include specific prescribed information such as location, date, who inspected, condition found, and any defects identified",
      "Yes — as long as the inspector signs it",
      "No — but only because it does not include a photograph",
    ],
    correctIndex: 1,
    explanation:
      "A generic statement such as 'Scaffold OK' does not meet Schedule 7 requirements. The report must include specific prescribed content: the location and description of the scaffold, the date and time of the inspection, the name and position of the inspector, details of any matters identified that could affect health and safety, any actions taken, and the inspector's signature. Without this detail, the report has no evidential value.",
  },
  {
    id: "retention-rule",
    question:
      "A scaffold inspection was carried out on 10 January. The next inspection takes place on 17 January. When is the earliest date the 10 January report can legally be destroyed?",
    options: [
      "17 January — when the next inspection replaces it",
      "10 February — one month after the inspection",
      "10 April — three months after the inspection",
      "10 July — six months after the inspection",
    ],
    correctIndex: 2,
    explanation:
      "WAH Regs Schedule 7 requires inspection records to be kept until the next inspection or for 3 months, whichever is later. The next inspection is on 17 January, but 3 months from the date of the report (10 April) is later. Therefore, the report cannot be destroyed before 10 April. In practice, many employers retain reports for the full duration of the project.",
  },
  {
    id: "hse-access",
    question:
      "An HSE inspector arrives on site and asks to see scaffold inspection records. The records exist but are stored at the company's head office, not on site. What is the likely outcome?",
    options: [
      "No issue — the inspector will wait for them to be posted",
      "The inspector will accept a verbal confirmation that inspections were carried out",
      "The employer may face enforcement action because records must be available at or near the workplace and producible promptly on request",
      "The inspector cannot ask for records without giving 24 hours' written notice",
    ],
    correctIndex: 2,
    explanation:
      "Regulation 12(6) of the WAH Regs requires that inspection reports are kept at the place where the work was carried out, or that they can be produced on demand. If records are stored off-site and cannot be retrieved quickly, the HSE may treat this as non-compliance. Best practice is to keep the current report at the scaffold and copies in a site office file that is accessible at all times.",
  },
];

const faqs = [
  {
    question: "Who is legally responsible for ensuring scaffold inspection reports are completed?",
    answer:
      "The duty holder — typically the employer or the person who controls the way the scaffold work is carried out — is responsible for ensuring inspections are carried out and recorded. On a construction site under CDM 2015, this responsibility usually sits with the principal contractor. The principal contractor may delegate the practical task of inspection to a competent scaffolding contractor, but the legal duty to ensure it happens and that records exist remains with the principal contractor. If a scaffolding subcontractor carries out the inspection, the record must still be provided to the principal contractor.",
  },
  {
    question: "Can I use a digital app instead of paper forms for scaffold inspection reports?",
    answer:
      "Yes. The Work at Height Regulations require a 'written report' but do not mandate paper. Digital inspection records created using specialist apps (such as ScaffTag Inspection Manager, SMART Scaffolder, or bespoke company platforms) are fully acceptable provided they contain all the information prescribed by Schedule 7 and can be produced as a hard copy on demand. Digital records offer significant advantages: they are less likely to be lost or damaged, can be backed up automatically, support photo attachments, generate timestamped GPS-tagged entries, and can be shared instantly with site management and the principal contractor.",
  },
  {
    question: "What happens if an inspection reveals a serious defect but no one acts on it?",
    answer:
      "If a competent person identifies a defect that poses a risk to health and safety, the inspection report must record the defect AND the action taken. If the defect is serious enough to make the scaffold unsafe for use, the scaffold must be taken out of service immediately (red-tagged). If the defect is recorded but no corrective action is taken or documented, this is a regulatory failure. In the event of an accident, the inspection report itself becomes evidence that the hazard was known about but not addressed — which significantly increases the likelihood of prosecution and the severity of penalties.",
  },
  {
    question: "How long should scaffold inspection records be retained on a large, multi-phase construction project?",
    answer:
      "The statutory minimum is until the next inspection or 3 months from the date of the report, whichever is later. However, on large projects lasting months or years, best practice is to retain all scaffold inspection records for the full duration of the project plus a reasonable period afterwards (typically 3 to 6 years). This is because personal injury claims can be brought up to 3 years after an incident (Limitation Act 1980), and claims involving latent conditions may be brought later. Retaining records provides a complete audit trail and protects the employer in the event of legal proceedings.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Under WAH Regs Schedule 7, which of the following is NOT a required element of a scaffold inspection report?",
    options: [
      "The location and description of the scaffold",
      "The purchase cost and age of the scaffold materials",
      "Details of any matter identified that could pose a risk to health or safety",
      "The name and position of the person who carried out the inspection",
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 7 prescribes that inspection reports must include the location and description of the equipment, the date and time of inspection, details of matters affecting safety, actions taken, further actions needed, and the identity and position of the inspector. The purchase cost and age of scaffold materials are not required fields in the statutory inspection report.",
  },
  {
    id: 2,
    question:
      "How long must scaffold inspection records be retained as a minimum under the Work at Height Regulations 2005?",
    options: [
      "Until the scaffold is dismantled",
      "1 month from the date of the inspection",
      "Until the next inspection or 3 months, whichever is later",
      "6 months from the date of the inspection",
    ],
    correctAnswer: 2,
    explanation:
      "The WAH Regs specify that inspection records must be kept until the next inspection of the scaffold or for a period of 3 months from the date of the inspection, whichever is later. Many employers retain records for significantly longer as best practice, particularly on large or long-duration projects.",
  },
  {
    id: 3,
    question:
      "A competent person completes a scaffold inspection on Monday morning. By when should the written inspection report be completed?",
    options: [
      "Within 24 hours of the inspection",
      "Before the end of the working day on which the inspection was carried out",
      "Within 7 days, at the next inspection",
      "Before the scaffold is next used after the inspection",
    ],
    correctAnswer: 0,
    explanation:
      "The Work at Height Regulations require that the written report of an inspection is completed within 24 hours of the inspection being carried out. The report should ideally be written immediately at the scaffold to ensure accuracy, but the legal deadline is 24 hours. Leaving reports until the next inspection cycle is not compliant.",
  },
  {
    id: 4,
    question:
      "Who must receive a copy of the scaffold inspection report under the regulations?",
    options: [
      "Only the scaffolding contractor who erected the scaffold",
      "The person on whose behalf the inspection was carried out (the employer or principal contractor)",
      "The Health and Safety Executive within 7 days",
      "Every worker who uses the scaffold",
    ],
    correctAnswer: 1,
    explanation:
      "The inspection report must be provided to the person on whose behalf the inspection was carried out — typically the employer or the principal contractor on a CDM site. The HSE does not need to receive routine inspection reports, but they can demand to see them during a site visit. The report does not need to be distributed to every scaffold user, but it should be accessible at the scaffold location.",
  },
  {
    id: 5,
    question:
      "An HSE inspector visits a construction site and requests scaffold inspection records. The site manager says the records are kept at head office and will take two days to retrieve. What is the likely consequence?",
    options: [
      "The inspector will accept this and arrange to return in two days",
      "The inspector will issue a formal caution but take no further action",
      "The employer may face enforcement action for failure to keep records accessible at or near the workplace",
      "There is no consequence because the records exist",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 12(6) requires that inspection reports are kept at the place where the inspection was carried out until construction work is completed, or can be produced on demand. Failure to make records available promptly during an HSE visit can result in an Improvement Notice or Prohibition Notice. The existence of records elsewhere does not satisfy the requirement for accessibility at or near the workplace.",
  },
  {
    id: 6,
    question:
      "What information should be recorded in a scaffold register or log for each scaffold on site?",
    options: [
      "Only the scaffold's location and the date it was erected",
      "The scaffold location, type, design load, inspection dates, current status, and responsible person",
      "The names of all workers who have used the scaffold",
      "Only information about scaffolds that have failed inspection",
    ],
    correctAnswer: 1,
    explanation:
      "A scaffold register should provide a comprehensive record of every scaffold on site, including its location, type (independent, putlog, birdcage, etc.), design loading, date of erection, current inspection status, next inspection due date, tag colour, and the responsible person or contractor. This enables effective management of multiple scaffolds and ensures no scaffold is missed from the inspection cycle.",
  },
  {
    id: 7,
    question:
      "A scaffold inspection identifies that three guardrail clips are missing from one bay. The inspector fits replacement clips from stock. What must the inspection report record?",
    options: [
      "Nothing — the defect has been fixed so it does not need recording",
      "Only that the scaffold passed the inspection",
      "The defect found (three missing guardrail clips), the action taken (replacement clips fitted), and confirmation that the scaffold is now safe for use",
      "Only a note to check the same bay at the next inspection",
    ],
    correctAnswer: 2,
    explanation:
      "The inspection report must record the defect found AND the corrective action taken. Recording only a pass result conceals the fact that a defect existed and was remedied. The report should state: what was found (three missing guardrail clips in the identified bay), what action was taken (replacement clips fitted from stock), and the resulting condition (scaffold now safe for continued use). This creates a proper audit trail.",
  },
  {
    id: 8,
    question:
      "Which of the following is an advantage of digital scaffold inspection records over paper-based records?",
    options: [
      "Digital records do not need to include all the prescribed Schedule 7 information",
      "Digital records are automatically accepted by the HSE without further checks",
      "Digital records can be backed up automatically, support photo evidence, generate GPS-tagged entries, and be shared instantly with site management",
      "Digital records eliminate the need for a competent person to carry out the inspection",
    ],
    correctAnswer: 2,
    explanation:
      "Digital inspection records must still contain all the information prescribed by Schedule 7 — they do not get a reduced requirement. They do not eliminate the need for a competent inspector, and the HSE will still check that the content meets the legal standard. However, digital records offer significant practical advantages: automatic cloud backup reduces the risk of loss, photo attachments provide visual evidence of conditions and defects, GPS tagging confirms location, time-stamping proves when the inspection took place, and instant sharing means site management and principal contractors receive reports without delay.",
  },
];

export default function ScaffoldingAwarenessModule4Section4() {
  useSEO({
    title:
      "Inspection Records & Reporting | Scaffolding Awareness Module 4.4",
    description:
      "WAH Regs Schedule 7 inspection report requirements, record retention, scaffold registers, reporting to site management, HSE enforcement, and digital inspection records.",
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
            <Link to="../scaffolding-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500/20 to-slate-400/20 border border-slate-500/30 mb-4">
            <FileText className="h-7 w-7 text-slate-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 mb-3 mx-auto">
            <span className="text-slate-400 text-xs font-semibold">
              MODULE 4 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Inspection Records &amp; Reporting
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            WAH Regs Schedule&nbsp;7 report requirements, record retention,
            scaffold registers, reporting to site management, HSE enforcement,
            and digital inspection records
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Schedule 7:</strong> Prescribes exact content of
                inspection reports
              </li>
              <li>
                <strong>Report within:</strong> 24 hours of the inspection
              </li>
              <li>
                <strong>Retain for:</strong> Next inspection or 3 months
                (whichever is later)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-slate-500/5 border-l-2 border-slate-500/50">
            <p className="text-slate-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>HSE access:</strong> Records must be producible on
                demand
              </li>
              <li>
                <strong>Scaffold register:</strong> Track every scaffold on site
              </li>
              <li>
                <strong>Digital records:</strong> Fully accepted if they meet
                Schedule&nbsp;7
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
              "List the prescribed content of a scaffold inspection report under WAH Regs Schedule 7",
              "Explain the statutory retention period for scaffold inspection records",
              "Describe who must receive copies of inspection reports and when",
              "Understand the purpose and content of a scaffold register or log",
              "Explain reporting responsibilities to site management and the principal contractor",
              "Describe the HSE's powers to access and enforce scaffold inspection records",
              "Identify the advantages and requirements of digital inspection record systems",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-slate-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: WAH Regs Schedule 7 — What Inspection Reports Must Contain */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            WAH Regs Schedule 7 &mdash; What Inspection Reports Must Contain
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Work at Height Regulations 2005, Schedule&nbsp;7</strong>{" "}
                sets out the prescribed content that every scaffold inspection report
                must include. A vague statement such as &ldquo;scaffold checked &mdash;
                OK&rdquo; does not satisfy the legal requirement. The report must be a
                detailed, structured record providing evidence that a competent person
                carried out a thorough inspection and documented what was found.
              </p>

              <p>
                The purpose of these requirements is to create a{" "}
                <strong>defensible audit trail</strong>. If an incident occurs, the
                inspection report is among the first documents the HSE will request. It
                must demonstrate what was inspected, what condition was found, what
                defects were identified, and what action was taken.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Prescribed Report Content (Schedule 7)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Name and address of the person for whom the inspection
                        was carried out
                      </strong>{" "}
                      &mdash; This is the employer, principal contractor, or site
                      occupier who has the duty to ensure inspections take place. Not
                      the scaffolding subcontractor (unless they are the duty holder).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Location and description of the scaffold
                      </strong>{" "}
                      &mdash; Sufficient to identify the specific scaffold. Include the
                      building or area reference, scaffold type (independent tied,
                      putlog, birdcage, system scaffold), height, number of lifts,
                      number of bays, and any distinguishing features.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Date and time of the inspection
                      </strong>{" "}
                      &mdash; The actual date the inspection was carried out, not
                      &ldquo;week commencing&rdquo; or an approximate date. The time
                      should also be recorded, particularly where multiple inspections
                      occur on the same day.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Condition found
                      </strong>{" "}
                      &mdash; A description of the general condition of the scaffold.
                      This should confirm what was examined (foundations, standards,
                      ledgers, transoms, bracing, ties, platforms, guardrails, toe
                      boards, access) and the overall condition observed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Details of any defects identified
                      </strong>{" "}
                      &mdash; Specific defects must be described in sufficient detail
                      to identify them. &ldquo;Missing guardrail&rdquo; is not
                      sufficient &mdash; the report should state &ldquo;guardrail
                      missing from bay 3, second lift, south elevation&rdquo; so the
                      defect can be located and rectified.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Actions taken as a result of findings
                      </strong>{" "}
                      &mdash; What was done to address each defect. For example:
                      &ldquo;replacement guardrail fitted from stock&rdquo;,
                      &ldquo;scaffold red-tagged and taken out of service pending
                      repair&rdquo;, or &ldquo;loose base plate re-seated on sole
                      board&rdquo;.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Name, position, and signature of the inspector
                      </strong>{" "}
                      &mdash; The person who carried out the inspection must be
                      identifiable. Include their name, job title or position, their
                      employer, and a signature (handwritten or electronic). An
                      anonymous or unsigned report has no evidential value.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Remember:</strong> The
                  written report must be completed{" "}
                  <strong>within 24 hours</strong> of the inspection being
                  carried out. Ideally, it should be written at the scaffold
                  immediately after the inspection to ensure accuracy. Reports
                  written from memory days later are unreliable and may not
                  withstand scrutiny.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Inspection Report Template Fields */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">&nbsp;</span>
            Inspection Report Template &mdash; Required Fields
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="bg-[#111] border-2 border-slate-500/40 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <p className="text-xs text-slate-400 font-semibold mb-4 text-center tracking-widest uppercase">
                Schedule 7 &mdash; Scaffold Inspection Report
              </p>

              {/* Report header section */}
              <div className="border-2 border-slate-400/50 rounded-lg overflow-hidden mb-4">
                <div className="bg-slate-500/20 px-3 py-2 border-b border-slate-400/30">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 tracking-wide">
                    REPORT IDENTIFICATION
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 border border-slate-500/30 rounded p-2 bg-slate-500/5">
                      <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                        CLIENT / DUTY HOLDER
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/60">
                        Name &amp; address of person for whom inspection carried out
                      </span>
                    </div>
                    <div className="flex-1 border border-slate-500/30 rounded p-2 bg-slate-500/5">
                      <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                        SITE / PROJECT
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/60">
                        Site name, address, and project reference
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scaffold identification */}
              <div className="border-2 border-slate-400/50 rounded-lg overflow-hidden mb-4">
                <div className="bg-slate-500/20 px-3 py-2 border-b border-slate-400/30">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 tracking-wide">
                    SCAFFOLD IDENTIFICATION
                  </span>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2">
                  <div className="border border-slate-500/30 rounded p-2 bg-slate-500/5">
                    <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                      LOCATION
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      Building, elevation, grid ref
                    </span>
                  </div>
                  <div className="border border-slate-500/30 rounded p-2 bg-slate-500/5">
                    <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                      SCAFFOLD TYPE
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      Independent, putlog, system, etc.
                    </span>
                  </div>
                  <div className="border border-slate-500/30 rounded p-2 bg-slate-500/5">
                    <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                      HEIGHT / LIFTS
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      Overall height, number of lifts
                    </span>
                  </div>
                  <div className="border border-slate-500/30 rounded p-2 bg-slate-500/5">
                    <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                      TAG No. / REF
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      Unique scaffold identifier
                    </span>
                  </div>
                </div>
              </div>

              {/* Inspection details */}
              <div className="border-2 border-slate-400/50 rounded-lg overflow-hidden mb-4">
                <div className="bg-slate-500/20 px-3 py-2 border-b border-slate-400/30">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 tracking-wide">
                    INSPECTION DETAILS
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 border border-slate-500/30 rounded p-2 bg-slate-500/5">
                      <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                        DATE &amp; TIME
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/60">
                        Actual date and time of inspection
                      </span>
                    </div>
                    <div className="flex-1 border border-slate-500/30 rounded p-2 bg-slate-500/5">
                      <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                        REASON FOR INSPECTION
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/60">
                        7-day, post-weather, post-alteration, etc.
                      </span>
                    </div>
                  </div>
                  <div className="border border-slate-500/30 rounded p-2 bg-slate-500/5">
                    <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                      CONDITION FOUND
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      General condition of scaffold: foundations, standards,
                      ledgers, bracing, ties, platforms, guardrails, toe boards, access
                    </span>
                  </div>
                </div>
              </div>

              {/* Defects and actions */}
              <div className="border-2 border-red-400/40 rounded-lg overflow-hidden mb-4">
                <div className="bg-red-500/15 px-3 py-2 border-b border-red-400/30">
                  <span className="text-[10px] sm:text-xs font-bold text-red-300 tracking-wide">
                    DEFECTS &amp; ACTIONS
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  <div className="border border-red-400/30 rounded p-2 bg-red-500/5">
                    <span className="text-[9px] text-red-400 block mb-0.5 font-semibold">
                      DEFECTS IDENTIFIED
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      Specific description of each defect with location
                    </span>
                  </div>
                  <div className="border border-red-400/30 rounded p-2 bg-red-500/5">
                    <span className="text-[9px] text-red-400 block mb-0.5 font-semibold">
                      ACTIONS TAKEN
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      Corrective actions for each defect (repaired, replaced, out of service)
                    </span>
                  </div>
                  <div className="border border-red-400/30 rounded p-2 bg-red-500/5">
                    <span className="text-[9px] text-red-400 block mb-0.5 font-semibold">
                      FURTHER ACTION NEEDED
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      Outstanding actions, monitoring, next steps
                    </span>
                  </div>
                </div>
              </div>

              {/* Inspector signature */}
              <div className="border-2 border-slate-400/50 rounded-lg overflow-hidden">
                <div className="bg-slate-500/20 px-3 py-2 border-b border-slate-400/30">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 tracking-wide">
                    INSPECTOR DETAILS
                  </span>
                </div>
                <div className="p-3 flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 border border-slate-500/30 rounded p-2 bg-slate-500/5">
                    <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                      NAME &amp; POSITION
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      Inspector name, job title, employer
                    </span>
                  </div>
                  <div className="flex-1 border border-slate-500/30 rounded p-2 bg-slate-500/5">
                    <span className="text-[9px] text-slate-400 block mb-0.5 font-semibold">
                      SIGNATURE
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/60">
                      Handwritten or electronic signature
                    </span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-slate-500/30 border border-slate-400/50" />
                  <span className="text-[9px] text-white/50">Standard fields</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-red-500/20 border border-red-400/40" />
                  <span className="text-[9px] text-white/50">Defect &amp; action fields</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Record Retention Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Record Retention Requirements
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations specify how long scaffold
                inspection records must be retained. The rule is straightforward
                but frequently misunderstood: records must be kept{" "}
                <strong>
                  until the next inspection of the scaffold or for 3 months from
                  the date of the report, whichever is later
                </strong>.
              </p>

              <p>
                In practice, this means that for a scaffold inspected every
                7&nbsp;days, the 3-month rule almost always applies because the
                next inspection (7&nbsp;days later) is much earlier than
                3&nbsp;months. The record from the 7-day inspection must
                therefore be retained for a minimum of 3&nbsp;months regardless
                of whether later inspections have taken place.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Statutory Retention Periods
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">
                      Scaffold inspection reports (formal inspections)
                    </span>
                    <span className="text-slate-400 font-semibold">
                      Next inspection or 3 months (whichever later)
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">
                      Scaffold register / equipment log
                    </span>
                    <span className="text-slate-400 font-semibold">
                      Duration of scaffold on site + 3 months
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">
                      Risk assessments for scaffold work
                    </span>
                    <span className="text-slate-400 font-semibold">
                      Duration of work + review period
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">
                      RIDDOR reports (scaffold-related incidents)
                    </span>
                    <span className="text-slate-400 font-semibold">
                      Minimum 3 years
                    </span>
                  </div>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-[1fr,auto] gap-2 text-sm">
                    <span className="text-white">
                      Training records (scaffolding competence)
                    </span>
                    <span className="text-slate-400 font-semibold">
                      Employment + 3&ndash;5 years
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Best Practice Retention
                </p>
                <p className="text-sm text-white/80 mb-2">
                  The statutory minimum is the legal floor, not the
                  recommended standard. Many employers and industry bodies
                  advise keeping records for significantly longer:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Full project duration</strong>{" "}
                      &mdash; Retain all scaffold inspection records until the
                      project is complete and the scaffold has been dismantled
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">3&ndash;6 years post-project</strong>{" "}
                      &mdash; Personal injury claims under the Limitation Act
                      1980 can be brought up to 3 years after the date of injury;
                      retaining records beyond this provides protection in legal
                      proceedings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Company policy</strong>{" "}
                      &mdash; Many principal contractors require all inspection
                      records to be retained for 6 years as standard, regardless
                      of the statutory minimum
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Record Retention Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">&nbsp;</span>
            Record Retention &mdash; Timeline
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="bg-[#111] border-2 border-slate-500/40 rounded-xl p-4 sm:p-6 overflow-x-auto">
              <p className="text-xs text-slate-400 font-semibold mb-5 text-center tracking-widest uppercase">
                Retention Periods &mdash; Scaffold Inspection Report dated 10 January
              </p>

              {/* Timeline */}
              <div className="relative min-w-[320px]">
                {/* Horizontal line */}
                <div className="absolute top-[40px] left-0 right-0 h-[2px] bg-slate-500/30" />

                <div className="flex justify-between items-start relative">
                  {/* Point 1: Inspection date */}
                  <div className="flex flex-col items-center text-center w-1/4">
                    <span className="text-[9px] sm:text-[10px] text-white/50 mb-2 h-6 flex items-end">
                      Report date
                    </span>
                    <div className="w-4 h-4 rounded-full bg-slate-400 border-2 border-slate-300 z-10" />
                    <span className="text-[10px] sm:text-xs font-bold text-slate-300 mt-2">
                      10 Jan
                    </span>
                    <span className="text-[9px] text-white/40 mt-0.5">
                      Inspection carried out
                    </span>
                  </div>

                  {/* Point 2: Next inspection */}
                  <div className="flex flex-col items-center text-center w-1/4">
                    <span className="text-[9px] sm:text-[10px] text-white/50 mb-2 h-6 flex items-end">
                      Next inspection
                    </span>
                    <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-amber-300 z-10" />
                    <span className="text-[10px] sm:text-xs font-bold text-amber-300 mt-2">
                      17 Jan
                    </span>
                    <span className="text-[9px] text-white/40 mt-0.5">
                      7-day cycle
                    </span>
                  </div>

                  {/* Point 3: 3-month mark */}
                  <div className="flex flex-col items-center text-center w-1/4">
                    <span className="text-[9px] sm:text-[10px] text-red-400 mb-2 h-6 flex items-end font-semibold">
                      Earliest destroy date
                    </span>
                    <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-red-300 z-10" />
                    <span className="text-[10px] sm:text-xs font-bold text-red-300 mt-2">
                      10 Apr
                    </span>
                    <span className="text-[9px] text-white/40 mt-0.5">
                      3 months later
                    </span>
                  </div>

                  {/* Point 4: Best practice */}
                  <div className="flex flex-col items-center text-center w-1/4">
                    <span className="text-[9px] sm:text-[10px] text-green-400 mb-2 h-6 flex items-end font-semibold">
                      Best practice
                    </span>
                    <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-green-300 z-10" />
                    <span className="text-[10px] sm:text-xs font-bold text-green-300 mt-2">
                      Project end + 3&ndash;6 yrs
                    </span>
                    <span className="text-[9px] text-white/40 mt-0.5">
                      Full protection
                    </span>
                  </div>
                </div>

                {/* Bracket showing "whichever is later" */}
                <div className="mt-5 flex items-center justify-center gap-2">
                  <div className="h-[1px] flex-1 max-w-[80px] bg-amber-400/40" />
                  <span className="text-[9px] text-amber-400 font-semibold whitespace-nowrap">
                    17 Jan (next inspection) vs 10 Apr (3 months) &rarr; 10 Apr is later &rarr; keep until 10 Apr minimum
                  </span>
                  <div className="h-[1px] flex-1 max-w-[80px] bg-amber-400/40" />
                </div>
              </div>

              {/* Key note */}
              <div className="mt-4 bg-slate-500/10 border border-slate-500/30 rounded-lg p-3 text-center">
                <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
                  The 3-month retention period almost always applies because the
                  next 7-day inspection is always earlier than 3 months
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Making Records Available */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">03</span>
            Making Records Available
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                It is not sufficient simply to create and retain inspection
                records. The regulations require that records are{" "}
                <strong>accessible and available</strong> to the people who need
                them, when they need them. There are several groups who have a
                right or a need to see scaffold inspection reports.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Who Must Receive or Have Access to Reports
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        The duty holder (employer / principal contractor)
                      </strong>{" "}
                      &mdash; Must receive a copy of the report within 24 hours
                      of the inspection. This enables them to review findings,
                      monitor compliance, and take action on defects identified.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Site management
                      </strong>{" "}
                      &mdash; The site manager or construction manager needs
                      access to inspection records to manage scaffolding across
                      the project, prioritise remedial works, and ensure
                      compliance with the construction phase plan.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Scaffold users
                      </strong>{" "}
                      &mdash; While individual scaffold users do not receive
                      copies of the report, the current inspection status should
                      be visible at the scaffold via the tag system (green,
                      yellow, or red). A copy of the most recent report should be
                      available at the scaffold base or in the site office for
                      anyone who needs to check.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        HSE inspectors
                      </strong>{" "}
                      &mdash; An HSE inspector can request scaffold inspection
                      records at any time during a site visit. Records must be
                      producible promptly &mdash; within minutes, not hours or
                      days. Inability to produce records may result in
                      enforcement action.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Trade union safety representatives
                      </strong>{" "}
                      &mdash; Under the Safety Representatives and Safety
                      Committees Regulations 1977, appointed trade union safety
                      representatives have the right to inspect documents
                      relating to workplace health and safety, which includes
                      scaffold inspection records.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Where to Keep Records
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">At the scaffold</strong>{" "}
                      &mdash; Keep the most recent inspection report at the
                      scaffold base in a weatherproof wallet or document holder
                      attached to the scaffold
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Site office file</strong>{" "}
                      &mdash; Maintain a central file of all scaffold inspection
                      records, organised by scaffold identifier and date
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Digital backup</strong>{" "}
                      &mdash; If using paper forms, scan or photograph records
                      and store them digitally as a safeguard against loss or
                      damage from site conditions
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Scaffold Register / Log */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">04</span>
            Scaffold Register / Log
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>scaffold register</strong> (also called a scaffold
                log) is a central document that lists every scaffold on site and
                tracks its current status. While the WAH Regs do not explicitly
                require a separate register, it is considered{" "}
                <strong>industry best practice</strong> and is often mandated by
                principal contractors as a condition of working on their sites.
                On large sites with dozens or even hundreds of scaffolds, a
                register is the only practical way to ensure nothing is missed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What the Register Should Include
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Unique scaffold identifier
                      </strong>{" "}
                      &mdash; A tag number, reference number, or colour code
                      that uniquely identifies each scaffold on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Location</strong> &mdash;
                      Building, elevation, floor, grid reference, or other
                      positional reference
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Scaffold type and configuration
                      </strong>{" "}
                      &mdash; Independent, putlog, birdcage, system scaffold;
                      height, number of lifts, number of bays, loading class
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Date of erection
                      </strong>{" "}
                      &mdash; When the scaffold was erected and who erected it
                      (scaffolding contractor name)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Handover date
                      </strong>{" "}
                      &mdash; The date the scaffold was formally handed over to
                      the user by the scaffolding contractor, confirming it was
                      complete and safe
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Last inspection date
                      </strong>{" "}
                      &mdash; The date of the most recent formal inspection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Next inspection due
                      </strong>{" "}
                      &mdash; The date by which the next 7-day inspection must
                      be completed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Current tag status
                      </strong>{" "}
                      &mdash; Green (safe), yellow (restricted), or red (do not
                      use)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Responsible person
                      </strong>{" "}
                      &mdash; The named person or contractor responsible for the
                      scaffold
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Tip:</strong> On large
                  sites, use a colour-coded status system in the register:{" "}
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400 align-middle mx-0.5" />{" "}
                  green = inspected and current,{" "}
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 align-middle mx-0.5" />{" "}
                  amber = inspection due within 2 days,{" "}
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400 align-middle mx-0.5" />{" "}
                  red = overdue or out of service. This provides an
                  at-a-glance overview of compliance across the whole site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Reporting to Site Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">05</span>
            Reporting to Site Management
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The competent person who inspects the scaffold is responsible
                for producing the inspection report, but the{" "}
                <strong>
                  information must flow to site management promptly
                </strong>{" "}
                so that decisions can be made and action can be taken on any
                defects identified.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Reporting Workflow
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">
                        Immediate verbal report
                      </strong>{" "}
                      &mdash; If any serious defect is found that makes the
                      scaffold unsafe, the inspector must immediately notify the
                      site manager or principal contractor&rsquo;s
                      representative. The scaffold must be taken out of service
                      (red-tagged) without delay.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Written report within 24 hours
                      </strong>{" "}
                      &mdash; The formal written report must be completed and
                      provided to the duty holder within 24 hours of the
                      inspection. This applies whether the inspection found
                      defects or not.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Defect tracking
                      </strong>{" "}
                      &mdash; Defects identified in inspection reports should be
                      entered into a defect tracking system (which may be part
                      of the scaffold register) to ensure they are monitored
                      until resolved.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Management review
                      </strong>{" "}
                      &mdash; Site management should review all scaffold
                      inspection reports regularly (at least weekly) to identify
                      trends, recurring defects, and scaffolds that may need
                      additional attention or alteration.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Defects
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If a scaffold inspection reveals a defect that poses an{" "}
                  <strong className="text-white">
                    immediate risk to health and safety
                  </strong>
                  , the scaffold must be{" "}
                  <strong className="text-white">
                    taken out of service immediately
                  </strong>{" "}
                  and red-tagged. The inspector must not wait until the written
                  report is completed to take this action. Verbal notification
                  to the site manager must happen at the time the defect is
                  found. Work from the scaffold must stop until the defect is
                  rectified and the scaffold is re-inspected and cleared for
                  use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: HSE Enforcement and Access to Records */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">06</span>
            HSE Enforcement and Access to Records
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety Executive (HSE) has{" "}
                <strong>
                  broad powers to inspect, investigate, and enforce
                </strong>{" "}
                health and safety legislation on construction sites, including
                the Work at Height Regulations. Scaffold inspection records are
                a key part of any HSE site visit or investigation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  HSE Powers Regarding Scaffold Records
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Right of access
                      </strong>{" "}
                      &mdash; HSE inspectors can enter any workplace at any
                      reasonable time without prior notice. They can request to
                      see scaffold inspection records, scaffold registers, risk
                      assessments, method statements, and training records.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Power to require production of documents
                      </strong>{" "}
                      &mdash; Under Section 20 of the Health and Safety at Work
                      etc. Act 1974, an inspector can require any person to
                      produce any document which they have power to examine,
                      and to take copies.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Improvement Notices
                      </strong>{" "}
                      &mdash; If inspection records are incomplete, inadequate,
                      or not being maintained, the inspector can issue an
                      Improvement Notice requiring the duty holder to put the
                      matter right within a specified period.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prohibition Notices
                      </strong>{" "}
                      &mdash; If the inspector believes there is a risk of
                      serious personal injury and scaffolds are being used
                      without adequate inspection or records, they can issue a
                      Prohibition Notice stopping all work from the scaffold
                      immediately.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prosecution
                      </strong>{" "}
                      &mdash; Persistent or serious failures to inspect
                      scaffolds and maintain records can lead to prosecution
                      under the Health and Safety at Work etc. Act 1974 and/or
                      the Work at Height Regulations 2005. Penalties include
                      unlimited fines and, in the most serious cases,
                      imprisonment.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    No Records = No Defence
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If an HSE inspector asks to see scaffold inspection records
                  and they{" "}
                  <strong className="text-white">
                    do not exist, are incomplete, or cannot be produced
                  </strong>
                  , this is treated as a failure to comply with the
                  regulations. The duty holder cannot claim that inspections
                  were carried out if there is no written evidence. In the
                  event of an accident, the absence of records is treated as
                  strong evidence that inspections were{" "}
                  <strong className="text-white">not carried out at all</strong>.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  After an Accident
                </p>
                <p className="text-sm text-white/80 mb-2">
                  When the HSE investigates a scaffold-related accident, the
                  following records will typically be requested:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>All scaffold inspection reports for the scaffold involved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>The scaffold register showing the scaffold&rsquo;s history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>The scaffold design and loading calculation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>Risk assessments and method statements for the scaffold work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>Training records for the scaffold inspector and the scaffold users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>The scaffolding contractor&rsquo;s erection records and handover documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Digital Inspection Records */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">07</span>
            Digital Inspection Records
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations require a{" "}
                <strong>&ldquo;written report&rdquo;</strong> but do not
                prescribe paper. Digital inspection records created using
                specialist software or apps are{" "}
                <strong>fully acceptable</strong> provided they contain all the
                information prescribed by Schedule&nbsp;7 and can be{" "}
                <strong>produced as a hard copy on demand</strong>.
              </p>

              <p>
                Digital record-keeping is becoming increasingly common across
                the construction industry. Several purpose-built platforms exist
                for scaffold inspection records, and many principal contractors
                now require or encourage digital reporting.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Advantages of Digital Records
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Automatic backup
                      </strong>{" "}
                      &mdash; Cloud-based storage means records are backed up
                      automatically. Paper records at the scaffold base can be
                      damaged by rain, wind, or general site conditions; digital
                      records are protected against this.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Photo evidence
                      </strong>{" "}
                      &mdash; Digital apps allow photographs of defects,
                      scaffold configuration, and site conditions to be attached
                      directly to the inspection record. This provides powerful
                      visual evidence that is not available with paper forms.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        GPS and time-stamping
                      </strong>{" "}
                      &mdash; Digital entries are automatically tagged with the
                      geographic location and exact time of the inspection. This
                      confirms where and when the inspection was carried out,
                      which cannot be retrospectively altered.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Structured checklists
                      </strong>{" "}
                      &mdash; Apps guide the inspector through a structured
                      checklist covering all required inspection points,
                      reducing the risk of items being missed or fields left
                      blank.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Instant sharing
                      </strong>{" "}
                      &mdash; Completed reports can be shared instantly with
                      site management, the principal contractor, and the duty
                      holder via email or a shared platform. No need to
                      physically deliver paper copies.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Automated reminders
                      </strong>{" "}
                      &mdash; The system can alert the inspector and site
                      management when the next 7-day inspection is due,
                      reducing the risk of overdue inspections.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Report generation
                      </strong>{" "}
                      &mdash; Digital platforms can generate PDF reports that
                      meet Schedule&nbsp;7 requirements and can be printed as
                      hard copies if required by an HSE inspector.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Digital Platforms
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">ScaffTag Inspection Manager</strong>{" "}
                      &mdash; Purpose-built scaffold inspection app linked to
                      the ScaffTag scaffold tagging system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">SMART Scaffolder</strong>{" "}
                      &mdash; Digital scaffold management platform covering
                      design, inspection, and handover
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">iAuditor / SafetyCulture</strong>{" "}
                      &mdash; General inspection platform that can be configured
                      with scaffold-specific templates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Bespoke company systems</strong>{" "}
                      &mdash; Large contractors often develop or commission
                      their own digital inspection platforms integrated with
                      site management software
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">Important:</strong>{" "}
                  Digital records must still contain{" "}
                  <strong>all the prescribed Schedule&nbsp;7 information</strong>.
                  Using a digital app does not reduce the content requirements.
                  The app must also work offline on site (with synchronisation
                  when connectivity is available) because many construction
                  sites have poor or no mobile data coverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Practical Record-Keeping Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-slate-400/80 text-sm font-normal">08</span>
            Practical Record-Keeping Guidance
          </h2>
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even with the best systems in place, record-keeping can fall
                short if practical mistakes are made. The following guidance
                addresses the most common issues encountered on construction
                sites.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Recording Errors
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Vague findings
                      </strong>{" "}
                      &mdash; &ldquo;Scaffold OK&rdquo; or &ldquo;No
                      issues&rdquo; without confirming what was actually
                      checked. Even a clean inspection should confirm that
                      foundations, standards, ledgers, bracing, ties, platforms,
                      guardrails, and access were all examined and found
                      satisfactory.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Missing or approximate dates
                      </strong>{" "}
                      &mdash; &ldquo;Week commencing 6 January&rdquo; does not
                      satisfy the requirement for the actual date of
                      inspection. The report must state the specific date and
                      time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        No inspector identification
                      </strong>{" "}
                      &mdash; An unsigned or anonymous report has no evidential
                      value. The report must identify who carried out the
                      inspection, their position, and their employer.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Retrospective completion
                      </strong>{" "}
                      &mdash; Writing up inspection reports from memory days
                      later introduces errors and omissions. Reports should be
                      completed at the scaffold or immediately afterwards.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Actions not recorded
                      </strong>{" "}
                      &mdash; Finding a defect but not recording the corrective
                      action suggests the defect was identified and then
                      ignored. This is potentially more damaging than not
                      inspecting at all, because it shows the hazard was known
                      about.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Setting Up a Site Record-Keeping System
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">
                        Choose a recording method
                      </strong>{" "}
                      (paper or digital) and standardise it across the entire
                      site &mdash; do not mix methods
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">
                        Create a scaffold register
                      </strong>{" "}
                      before the first scaffold arrives on site, and assign
                      unique identifiers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">
                        Train all inspectors
                      </strong>{" "}
                      in how to complete inspection records correctly,
                      including what level of detail is expected
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      4
                    </span>
                    <span>
                      <strong className="text-white">
                        Designate a responsible person
                      </strong>{" "}
                      for managing scaffold documentation &mdash; collecting
                      reports, updating the register, and filing records
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      5
                    </span>
                    <span>
                      <strong className="text-white">
                        Set up a review schedule
                      </strong>{" "}
                      where site management reviews all inspection reports at
                      least weekly to identify trends and outstanding actions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-500/20 border border-slate-500/40 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-400">
                      6
                    </span>
                    <span>
                      <strong className="text-white">
                        Establish a backup system
                      </strong>{" "}
                      &mdash; keep copies both at the scaffold and in the site
                      office; if paper, scan and store digitally as well
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-slate-400">
                    HSE Inspector Visits:
                  </strong>{" "}
                  Be able to produce all scaffold inspection records{" "}
                  <strong>within minutes</strong>. Keep the scaffold register
                  up to date and accessible at all times. Ensure the competent
                  person who carried out each inspection can be identified from
                  the record. Have copies of scaffolding competence
                  certificates available for all inspectors.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
