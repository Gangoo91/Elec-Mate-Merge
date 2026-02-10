import { ArrowLeft, Scale, CheckCircle, AlertTriangle, ClipboardCheck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ───────────────────────── Quick-check questions ───────────────────────── */

const quickCheckQuestions = [
  {
    id: "wah-schedule2-guardrails",
    question:
      "Under Schedule 2 of the Work at Height Regulations 2005, what is the minimum height for a top guard rail on a scaffold working platform?",
    options: [
      "At least 950 mm above the platform edge",
      "At least 750 mm above the platform edge",
      "At least 1,100 mm above the platform edge",
      "At least 500 mm above the platform edge",
    ],
    correctIndex: 0,
    explanation:
      "Schedule 2, Part 1 of the Work at Height Regulations 2005 requires that the top guard rail on a scaffold working platform is at least 950 mm above the edge of the working platform. This provides an adequate barrier to prevent workers falling from height. An intermediate guard rail or other suitable means must also be fitted so that no unprotected gap exceeds 470 mm.",
  },
  {
    id: "wah-reg12-inspection",
    question:
      "Under Regulation 12 of the Work at Height Regulations 2005, how often must a scaffold that remains erected on a construction site be inspected at minimum?",
    options: [
      "Every 7 days",
      "Every 14 days",
      "Every 28 days",
      "Monthly",
    ],
    correctIndex: 0,
    explanation:
      "Regulation 12 requires that a scaffold on a construction site is inspected at intervals not exceeding 7 days. Inspections must also take place before first use, after any event likely to have affected stability (such as high winds or an impact), and after any substantial addition, dismantling, or alteration. The inspection must be carried out by a competent person and the results recorded.",
  },
  {
    id: "wah-collective-protection",
    question:
      "The Work at Height Regulations 2005 establish a hierarchy of control measures. Which type of protection must always be prioritised over personal protection?",
    options: [
      "Collective protection (e.g. guard rails, toe boards)",
      "Personal protection (e.g. harnesses, lanyards)",
      "Administrative controls (e.g. permits, signage)",
      "Elimination of height (e.g. ground-level assembly)",
    ],
    correctIndex: 0,
    explanation:
      "The WAH Regulations establish a clear hierarchy: first avoid work at height where possible, then use work equipment or measures to prevent falls (collective protection such as guard rails and working platforms), then use measures to minimise the distance and consequences of a fall (collective then personal). Collective protection always takes priority over personal protection because it safeguards everyone in the area without relying on individual behaviour or equipment fit.",
  },
];

/* ──────────────────────────────── FAQs ─────────────────────────────────── */

const faqs = [
  {
    question:
      "Do the Work at Height Regulations 2005 apply to scaffolding erected on private domestic property?",
    answer:
      "Yes. The Work at Height Regulations apply wherever work at height is carried out as part of a work activity, regardless of the location. If a scaffolding contractor erects a scaffold on a domestic property for maintenance or building work, the full requirements of the regulations apply. This includes the duty to plan, organise, and supervise the work, provide suitable equipment, carry out risk assessments, and ensure inspections are completed by a competent person. The only work excluded is work carried out by a householder on their own home that is not done as part of a business.",
  },
  {
    question:
      "What is the difference between Schedule 2 and Schedule 3 of the Work at Height Regulations 2005?",
    answer:
      "Schedule 2 deals specifically with the requirements for guard rails, toe boards, barriers, and similar collective fall protection. It sets out minimum dimensions such as the 950 mm top guard rail height and the requirement that no unprotected gap exceeds 470 mm. Schedule 3 deals with the requirements for working platforms more broadly, covering matters such as surface condition, structural adequacy, dimensions sufficient for safe passage and safe use of equipment, and protection against falls of materials. In practical terms, Schedule 2 tells you what edge protection must look like, while Schedule 3 tells you what the platform itself must provide.",
  },
  {
    question:
      "Who qualifies as a 'competent person' for scaffold inspection under the Work at Height Regulations?",
    answer:
      "The regulations do not prescribe a specific qualification, but a competent person must have sufficient training, practical and theoretical knowledge, and experience to carry out the inspection effectively. For scaffolding, this typically means someone who holds a recognised scaffold inspection qualification such as CISRS Scaffold Inspection (formerly the Advanced Scaffolder card with inspection endorsement), or an equivalent industry-recognised competence. The person must be able to identify defects, understand structural loading, recognise unsafe conditions, and know the relevant standards (TG20, BS EN 12811). In practice, many duty holders rely on CISRS-qualified scaffolders or independent scaffold inspectors.",
  },
  {
    question:
      "How long must scaffold inspection records be kept under the Work at Height Regulations?",
    answer:
      "Regulation 12(6) requires that inspection reports for scaffolds on construction sites are kept until the next inspection report is made, or for a period of 3 months after the date of the inspection, whichever is the later. However, best practice (and many principal contractors' site rules) is to retain all inspection records for the full duration of the project and for a reasonable period afterwards. If there is an accident or HSE investigation, having a complete history of inspections will be essential evidence. Many organisations retain records for at least 6 years in line with general limitation periods.",
  },
];

/* ──────────────────────────── Quiz questions ───────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "The Work at Height Regulations 2005 apply to which of the following?",
    options: [
      "Only scaffolding above 2 metres",
      "All work at height where there is a risk of a fall liable to cause personal injury",
      "Only construction sites with more than five workers",
      "Only work carried out by scaffolding contractors",
    ],
    correctAnswer: 1,
    explanation:
      "The Work at Height Regulations 2005 apply to all work at height where there is a risk of a fall liable to cause personal injury, regardless of the height involved. There is no minimum height threshold. The regulations apply across all industries, not just construction, and cover every person who works at height or who organises, plans, or supervises such work.",
  },
  {
    id: 2,
    question:
      "Schedule 1 of the Work at Height Regulations 2005 sets out requirements for existing places of work and means of access at height. Which of the following is a Schedule 1 requirement?",
    options: [
      "Every scaffold must be painted a high-visibility colour",
      "Every existing workplace at height must be stable and of sufficient strength for its purpose",
      "All scaffolds must have powered hoists for material delivery",
      "Ladders must be replaced with scaffolding after 30 minutes of use",
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 1 requires that every existing workplace at height is stable, has sufficient strength and rigidity for its purpose, and is kept in a safe condition. It must not be overloaded or used in conditions (such as weather) that could cause a risk to health or safety. These are fundamental requirements that apply to all scaffolds and other existing work-at-height structures.",
  },
  {
    id: 3,
    question:
      "Under Schedule 2, what is the maximum permitted unprotected gap in scaffold edge protection?",
    options: [
      "470 mm",
      "500 mm",
      "600 mm",
      "300 mm",
    ],
    correctAnswer: 0,
    explanation:
      "Schedule 2, Part 1 requires that guard rails, intermediate guard rails, or other suitable barriers are arranged so that no unprotected gap exceeds 470 mm. This is measured as the vertical distance between the top guard rail and any intermediate rail, or between an intermediate rail and the toe board or platform surface. The 470 mm limit is designed to prevent a person from falling or sliding through the gap.",
  },
  {
    id: 4,
    question:
      "What is the minimum toe board height required under Schedule 2 of the Work at Height Regulations?",
    options: [
      "100 mm",
      "150 mm",
      "200 mm",
      "250 mm",
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 2 requires toe boards to be at least 150 mm in height, measured from the surface of the working platform. Toe boards prevent tools, materials, and debris from falling off the edge of the platform onto people working below. They also provide a visual boundary that helps workers stay within the safe working area.",
  },
  {
    id: 5,
    question:
      "Which regulation within the Work at Height Regulations 2005 specifically requires the inspection of work equipment for working at height?",
    options: [
      "Regulation 8",
      "Regulation 10",
      "Regulation 12",
      "Regulation 14",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 12 sets out the requirements for inspection of work equipment for working at height, including scaffolding. It requires inspections before first use, at intervals not exceeding 7 days for scaffolds on construction sites, and after any event likely to have affected strength or stability. The inspection must be carried out by a competent person and the results recorded in a written report.",
  },
  {
    id: 6,
    question:
      "Under the Work at Height Regulations, what is the first step in the hierarchy of control for managing risks from work at height?",
    options: [
      "Provide collective protection measures such as guard rails",
      "Issue personal fall protection equipment such as harnesses",
      "Avoid work at height altogether where it is reasonably practicable to do so",
      "Carry out a risk assessment and prepare a method statement",
    ],
    correctAnswer: 2,
    explanation:
      "Regulation 6 establishes a clear hierarchy: the first priority is to avoid work at height altogether where it is reasonably practicable to do so. If work at height cannot be avoided, the duty holder must use work equipment or other measures to prevent falls (collective protection). Only where falls cannot be prevented should measures be taken to minimise the distance and consequences of a fall. Risk assessment underpins the entire process but is not itself the first step in the control hierarchy.",
  },
  {
    id: 7,
    question:
      "A scaffold inspection report under Regulation 12 must include which of the following details?",
    options: [
      "The name and hourly rate of the scaffolder who erected it",
      "The location and description of the equipment, the date and time of inspection, and details of any defect found",
      "The insurance policy number of the scaffolding contractor",
      "A photograph of every individual scaffold component",
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 7 of the Work at Height Regulations sets out the required contents of an inspection report. This includes the name and address of the person for whom the inspection was carried out, the location and description of the work equipment, the date and time of inspection, details of any matter identified that could give rise to a risk to health or safety, and the name and position of the person who carried out the inspection. Photographs are good practice but are not a statutory requirement.",
  },
  {
    id: 8,
    question:
      "Under the Work at Height Regulations, who has the primary duty to plan, organise, and supervise scaffold work so that it is carried out safely?",
    options: [
      "The scaffolder who erects the scaffold",
      "The person on whose behalf the work is carried out (the duty holder / employer)",
      "The HSE inspector assigned to the site",
      "The local authority building control officer",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 4 places the primary duty on every employer, self-employed person, or person who controls the work of others to ensure that work at height is properly planned, appropriately supervised, and carried out in a manner that is safe. While scaffolders must be competent and follow safe working practices, the overarching duty sits with the person on whose behalf the work is being done. This duty cannot be delegated away simply by appointing a contractor.",
  },
];

/* ──────────────── Schedule requirements diagram data ───────────────────── */

const scheduleRequirements = [
  {
    schedule: "Schedule 1",
    title: "Existing Places of Work at Height",
    colour: "slate",
    items: [
      "Must be stable, of sufficient strength and rigidity for the purpose",
      "Must not be overloaded beyond safe working load",
      "Surface conditions must not create a risk of slipping, tripping, or falling",
      "Weather conditions must not endanger the safety of any person",
      "Must be maintained in a safe condition at all times",
    ],
  },
  {
    schedule: "Schedule 2",
    title: "Guard Rails, Toe Boards & Barriers",
    colour: "slate",
    items: [
      "Top guard rail at least 950 mm above platform edge",
      "No unprotected gap exceeding 470 mm",
      "Toe boards at least 150 mm in height",
      "Must be of sufficient strength and rigidity to prevent falls",
      "Must include suitable protection to prevent materials rolling or being kicked off the edge",
    ],
  },
  {
    schedule: "Schedule 3",
    title: "Working Platforms",
    colour: "slate",
    items: [
      "Suitable and sufficient for the work to be carried out safely",
      "Sufficient dimensions for safe passage and safe use of equipment",
      "No gap through which a person could fall",
      "Surface must not give rise to risk of slipping, tripping, or falling",
      "Must bear the load to be imposed, including dynamic loading from persons and materials",
    ],
  },
];

/* ──────────── Inspection timeline diagram data ─────────────────────────── */

const inspectionTimeline = [
  {
    trigger: "Before First Use",
    detail: "After erection and before any person works from the scaffold",
    icon: "setup",
  },
  {
    trigger: "Every 7 Days",
    detail: "At intervals not exceeding 7 days while the scaffold remains erected on a construction site",
    icon: "calendar",
  },
  {
    trigger: "After Adverse Weather",
    detail: "Following exposure to conditions likely to have affected strength or stability (e.g. high winds, heavy rain, frost)",
    icon: "weather",
  },
  {
    trigger: "After Alteration",
    detail: "Following any substantial addition, dismantling, or other alteration to the scaffold",
    icon: "change",
  },
  {
    trigger: "After Impact / Event",
    detail: "Following any event likely to have affected the stability or structural integrity of the scaffold",
    icon: "impact",
  },
];

/* ═══════════════════════════ COMPONENT ═══════════════════════════════════ */

const ScaffoldingAwarenessModule2Section1 = () => {
  useSEO({
    title:
      "Work at Height Regulations 2005 | Scaffolding Awareness Module 2 Section 1",
    description:
      "Understand the Work at Height Regulations 2005 as they apply to scaffolding, including Schedule requirements for guard rails and working platforms, inspection duties under Regulation 12, competent person requirements, and collective protection hierarchy.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ─── Article ─── */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ─── Hero ─── */}
        <div className="mb-12 text-center">
          <Scale className="h-10 w-10 text-slate-400 mx-auto mb-4" />
          <span className="inline-block bg-slate-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Work at Height Regulations 2005
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            How the WAH Regulations apply specifically to scaffolding &mdash; Schedule requirements,
            inspection duties, competent person obligations, and the collective protection hierarchy
          </p>
        </div>

        {/* ─── 01 Overview ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-slate-400/80 text-sm font-normal">01</span>
            Overview &mdash; The WAH Regulations &amp; Scaffolding
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-slate-500/10 border-l-2 border-l-slate-500/50 border border-slate-500/30">
              <p className="font-semibold text-base text-slate-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    The <strong>Work at Height Regulations 2005 (SI 2005/735)</strong> are the primary UK
                    regulations governing all work at height.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    They apply to <strong>all scaffolding work</strong> &mdash; erection, use, alteration,
                    and dismantling.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>No minimum height threshold</strong> &mdash; if there is a risk of a fall liable
                    to cause personal injury, the regulations apply.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    Made under the <strong>Health and Safety at Work etc. Act 1974</strong> and implement EU
                    Directive 2001/45/EC on temporary work at height.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-slate-500/10 border-l-2 border-l-slate-500/50 border border-slate-500/30">
              <p className="font-semibold text-base text-slate-400 mb-2">Why It Matters for Scaffolding</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    Falls from scaffolds remain one of the <strong>leading causes of workplace death and
                    serious injury</strong> in the UK construction industry.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    The regulations set out <strong>specific Schedule requirements</strong> for guard rails,
                    toe boards, and working platforms on scaffolds.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    <strong>Regulation 12</strong> mandates 7-day inspections by a competent person for
                    scaffolds on construction sites.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>
                    Breach of these regulations can result in <strong>HSE enforcement action</strong>,
                    including prohibition notices, unlimited fines, and imprisonment.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 02 Learning Outcomes ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-slate-400/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain the scope and purpose of the Work at Height Regulations 2005 as they apply to
                scaffolding
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Describe the requirements of Schedule 1 (existing places of work at height), Schedule 2
                (guard rails and toe boards), and Schedule 3 (working platforms)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                State the inspection requirements under Regulation 12, including frequency, triggers, and
                record-keeping
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Define what constitutes a competent person for scaffold inspection and explain their duties
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Apply the hierarchy of control measures, with collective protection taking priority over
                personal protection
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
              <span>
                Outline the record-keeping requirements for scaffold inspections and identify who is
                responsible for retaining them
              </span>
            </li>
          </ul>
        </section>

        {/* ─── 03 Schedule Requirements Diagram ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">03</span>
              WAH Regulations &mdash; Schedule Requirements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Work at Height Regulations 2005 contain three Schedules that set out specific
                requirements for scaffold structures. These Schedules translate the general duty to provide
                safe work-at-height equipment into measurable, enforceable standards. Every scaffold must
                comply with all three.
              </p>

              {/* Schedule diagram cards */}
              <div className="space-y-4">
                {scheduleRequirements.map((sched) => (
                  <div
                    key={sched.schedule}
                    className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">
                        {sched.schedule}
                      </span>
                      <h3 className="text-slate-300 font-semibold">{sched.title}</h3>
                    </div>
                    <ul className="text-white space-y-2 text-sm">
                      {sched.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Key dimensions callout */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="bg-slate-500/15 border border-slate-500/30 p-4 rounded-lg text-center">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Top Guard Rail
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    950 mm
                  </p>
                  <p className="text-white/60 text-sm">
                    minimum height above platform edge
                  </p>
                </div>
                <div className="bg-slate-500/15 border border-slate-500/30 p-4 rounded-lg text-center">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Max Unprotected Gap
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    470 mm
                  </p>
                  <p className="text-white/60 text-sm">
                    between guard rails / toe board
                  </p>
                </div>
                <div className="bg-slate-500/15 border border-slate-500/30 p-4 rounded-lg text-center">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Toe Board Height
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    150 mm
                  </p>
                  <p className="text-white/60 text-sm">
                    minimum height from platform surface
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-slate-300">Practical Note</h3>
                </div>
                <p className="text-white/80 text-sm">
                  These are <strong className="text-white">minimum requirements</strong>. Many principal
                  contractors and scaffold design specifications exceed these minimums. For example, TG20
                  compliance guidance and NASC best practice may specify higher guard rails or additional
                  intermediate rails. Always check the scaffold design and the site-specific requirements
                  before assuming the statutory minimums are sufficient.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 04 Schedule 1 &mdash; Existing Scaffolds ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">04</span>
              Schedule 1 &mdash; Requirements for Existing Scaffolds
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Schedule 1 of the Work at Height Regulations sets out the conditions that must be met for
                any existing place of work at height, including a scaffold that has already been erected and
                is in use. The requirements apply throughout the life of the scaffold, not just at the point
                of erection.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">Core Schedule 1 Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Stability:</strong> The scaffold must be stable at all times. This means
                      adequate ties to the building, properly seated base plates and sole boards, and bracing
                      that has not been removed or displaced.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Strength and rigidity:</strong> The scaffold must have sufficient strength and
                      rigidity for its intended purpose. Loading must not exceed the design capacity, and
                      components must not be damaged, corroded, or bent beyond acceptable limits.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Safe condition:</strong> The scaffold must be maintained so that it does not
                      present a risk to the health or safety of any person. Boards must be secure, fittings
                      tightened, and access routes kept clear.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Surface conditions:</strong> The surface of every working platform, access
                      route, and ladder must not give rise to a risk of any person slipping, tripping, or
                      being caught between any moving part and a fixed structure.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Weather conditions:</strong> The scaffold must not be used in weather conditions
                      that could endanger the health or safety of any person. High winds, ice, heavy rain,
                      and snow can all affect scaffold stability and the safety of those using it.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-slate-300">On-Site Reality</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Schedule 1 requirements are often breached when scaffold users make unauthorised
                  modifications &mdash; removing boards, taking out ties, overloading platforms with
                  materials, or continuing to use the scaffold in high winds. If you notice that a scaffold
                  does not meet these requirements, you must <strong className="text-white">not use it</strong>{" "}
                  and <strong className="text-white">report the defect immediately</strong> to the site
                  supervisor or scaffold coordinator. Never assume someone else has already reported it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ─── 05 Schedule 2 &mdash; Guard Rails & Toe Boards ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">05</span>
              Schedule 2 &mdash; Guard Rails, Toe Boards &amp; Barriers
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Schedule 2 provides the detailed technical requirements for edge protection on scaffolds.
                Guard rails, intermediate rails, and toe boards form the primary collective fall protection
                system. These requirements apply to every scaffold working platform where there is a risk of
                a person or materials falling.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">Guard Rail Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Top guard rail:</strong> Must be positioned at a height of at least{" "}
                      <strong>950 mm</strong> above the edge of the working platform. This is the primary
                      barrier preventing a person from falling off the scaffold.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Intermediate guard rail:</strong> Where the gap between the top guard rail and
                      the toe board (or platform surface) exceeds 470 mm, an intermediate guard rail must be
                      fitted. This prevents a person from slipping or rolling through the gap beneath the
                      top rail.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>470 mm rule:</strong> No unprotected gap in the edge protection may exceed
                      470 mm. This applies to the gap between the top rail and the intermediate rail, and
                      the gap between the intermediate rail and the toe board or platform.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Strength:</strong> Guard rails must be of sufficient strength and rigidity to
                      prevent any person from falling and to withstand the forces likely to be applied to
                      them, including a person leaning against or bumping into the rail.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">Toe Board Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Minimum height:</strong> Toe boards must be at least <strong>150 mm</strong>{" "}
                      in height, measured from the surface of the working platform.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Purpose:</strong> Toe boards prevent tools, materials, and debris from falling
                      from the scaffold platform onto persons below. They also provide a visual and physical
                      boundary at the edge of the platform.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Continuous protection:</strong> Toe boards must be fitted along the full length
                      of any open edge of the platform. Gaps at corners, returns, and ladder access points
                      must be minimised and controlled.
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual edge protection diagram */}
              <div className="bg-slate-500/10 border border-slate-500/30 p-5 rounded-lg">
                <h3 className="text-slate-300 font-semibold mb-4 text-centre">
                  Edge Protection &mdash; Minimum Dimensions
                </h3>
                <div className="relative max-w-md mx-auto">
                  {/* Scaffold edge diagram using CSS */}
                  <div className="relative border-l-4 border-slate-400 ml-8 pl-6 space-y-0">
                    {/* Top guard rail */}
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-full h-1 bg-slate-400 rounded" />
                      <span className="text-slate-300 text-xs font-semibold whitespace-nowrap">Top Rail</span>
                    </div>
                    {/* Dimension label */}
                    <div className="text-centre text-xs text-white/60 py-1">
                      &le; 470 mm gap
                    </div>
                    {/* Intermediate guard rail */}
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-full h-1 bg-slate-400/60 rounded" />
                      <span className="text-slate-400 text-xs font-semibold whitespace-nowrap">Mid Rail</span>
                    </div>
                    {/* Dimension label */}
                    <div className="text-centre text-xs text-white/60 py-1">
                      &le; 470 mm gap
                    </div>
                    {/* Toe board */}
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-full h-3 bg-slate-500/80 rounded" />
                      <span className="text-slate-400 text-xs font-semibold whitespace-nowrap">Toe Board (&ge;150 mm)</span>
                    </div>
                    {/* Platform */}
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-full h-2 bg-white/20 rounded" />
                      <span className="text-white/60 text-xs font-semibold whitespace-nowrap">Platform</span>
                    </div>
                  </div>
                  {/* Overall height label */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center justify-center">
                    <div className="h-full w-px bg-white/20" />
                    <span className="absolute top-1/2 -translate-y-1/2 -rotate-90 text-xs text-slate-300 font-semibold whitespace-nowrap bg-[#1a1a1a] px-1">
                      &ge; 950 mm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 06 Schedule 3 &mdash; Working Platforms ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">06</span>
              Schedule 3 &mdash; Working Platforms
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Schedule 3 sets out the requirements for working platforms, including scaffold platforms.
                While Schedule 2 focuses on what happens at the edge, Schedule 3 focuses on the platform
                itself &mdash; its dimensions, surface, structural adequacy, and suitability for the work
                being carried out.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">Platform Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Suitable and sufficient:</strong> The platform must be suitable and sufficient
                      for the purpose for which it is intended. A platform used for bricklaying, for
                      example, must accommodate the materials, the mortar, and the working space needed by
                      the bricklayer, as well as safe passage along its length.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Dimensions:</strong> The platform must be wide enough for safe passage of
                      persons and for the safe use of any equipment or materials. For a general-purpose
                      scaffold, a minimum of 600 mm clear width is typically required, but wider platforms
                      are needed where materials are stacked or where specific trades require additional space.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>No dangerous gaps:</strong> Boards must be close-butted or arranged so that no
                      gap exists through which a person could fall or through which tools and materials could
                      drop onto those below. The maximum gap between boards is generally accepted as 25 mm.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Surface condition:</strong> The platform surface must not give rise to a risk of
                      any person slipping, tripping, or being caught. Boards must be in good condition, free
                      from excessive bowing, splits, or projecting nails.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Load-bearing capacity:</strong> The platform must be capable of bearing the
                      loads imposed on it, including the static weight of persons and materials and any
                      dynamic loading from movement, stacking, or impact. The design load must be clearly
                      communicated (often via scaffold signage or the scaffold register).
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-slate-300">Board Overhang</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Scaffold boards must be supported at centres that prevent excessive deflection and must
                  not overhang their support by more than <strong className="text-white">four times the board
                  thickness</strong> (typically a maximum of 150 mm for a standard 38 mm board). Excessive
                  overhang creates a tipping hazard when a person steps near the unsupported end. Boards
                  must also be secured against uplift by wind or displacement by movement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ─── 07 Regulation 12 &mdash; Inspection Requirements ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">07</span>
              Regulation 12 &mdash; Inspection Requirements
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Regulation 12 is one of the most critical regulations for scaffolding on construction sites.
                It establishes when scaffolds must be inspected, who may carry out the inspection, and what
                must be recorded. Failure to comply with Regulation 12 is one of the most common breaches
                found by HSE inspectors during site visits.
              </p>

              {/* Inspection timeline diagram */}
              <div className="bg-slate-500/10 border border-slate-500/30 p-5 rounded-lg">
                <h3 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-slate-400" />
                  Inspection Timeline
                </h3>
                <div className="space-y-0 relative">
                  {/* Vertical connector line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-500/30" />

                  {inspectionTimeline.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 py-3 relative">
                      <div className="w-8 h-8 rounded-full bg-slate-500/20 border-2 border-slate-500/40 flex items-center justify-center flex-shrink-0 z-10 bg-[#1a1a1a]">
                        <span className="text-slate-400 text-xs font-bold">{idx + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 font-semibold text-sm">{item.trigger}</p>
                        <p className="text-white/70 text-sm mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">What the Inspection Must Cover</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Foundations:</strong> Base plates seated properly on firm ground or sole boards;
                      no settlement, undermining, or displacement.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Standards (uprights):</strong> Plumb, adequately braced, spigot joints properly
                      engaged, and free from visible damage or deformation.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Ledgers and transoms:</strong> Level, properly connected with correct fittings,
                      and capable of supporting the platform boards and imposed loads.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Bracing:</strong> Diagonal and plan bracing in place as per the design; not
                      removed, displaced, or damaged.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Ties:</strong> All ties to the structure present and secure; tie pattern
                      matching the design requirements; reveal ties, through ties, or proprietary ties in
                      good condition.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Platforms:</strong> Boards in good condition, fully supported, close-butted,
                      not overhanging excessively, and secured against displacement.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Edge protection:</strong> Guard rails, intermediate rails, and toe boards all
                      in place and meeting Schedule 2 requirements.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Access:</strong> Ladders or stair towers properly secured, extending
                      sufficiently above the platform, and positioned at suitable intervals.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">Inspection Report Contents (Schedule 7)</h3>
                <p className="text-white/80 text-sm mb-3">
                  Schedule 7 of the Work at Height Regulations specifies what every scaffold inspection
                  report must include:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>Name and address of the person for whom the inspection was carried out</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>Location and description of the work equipment inspected</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>Date and time of the inspection</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>Details of any matter identified that could give rise to a risk to health or safety</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>Details of any action taken as a result of matters identified</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>Details of any further action considered necessary</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>Name and position of the person carrying out the inspection</div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Common Inspection Failures</h3>
                </div>
                <p className="text-white/80 text-sm">
                  The HSE frequently identifies the following failures during scaffold inspections:{" "}
                  <strong className="text-white">missing or incomplete inspection reports</strong>,{" "}
                  <strong className="text-white">inspections not carried out within 7 days</strong>,{" "}
                  <strong className="text-white">reports not signed or not available on site</strong>, and{" "}
                  <strong className="text-white">defects identified but not acted upon</strong>. Any of
                  these can result in enforcement action. The inspection report must be available on site
                  for the HSE inspector to view at any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 08 Competent Person & Collective Protection ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">08</span>
              Competent Person Duties &amp; Collective Protection Hierarchy
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The Work at Height Regulations place significant emphasis on two overarching principles:
                that work at height must be supervised and inspected by a <strong>competent person</strong>,
                and that <strong>collective protection</strong> must always be prioritised over personal
                protection. Both principles are central to scaffold safety.
              </p>

              {/* Competent person */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">The Competent Person</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-white/80">
                    A competent person for scaffold inspection must possess:
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Sufficient training:</strong> Formal, recognised training in scaffold
                      inspection, typically demonstrated by holding a CISRS Scaffold Inspection Training
                      Scheme (SITS) card or equivalent.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Practical experience:</strong> Hands-on experience of scaffold erection, use,
                      and inspection in a variety of situations and configurations.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Theoretical knowledge:</strong> Understanding of the relevant regulations,
                      standards (TG20, BS EN 12811), structural behaviour, loading, and the types of defects
                      that can occur.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Ability to detect defects:</strong> The person must be capable of identifying
                      defects and assessing whether the scaffold is safe to use, requires remedial work, or
                      must be taken out of service.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">Competent Person Duties</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      Carry out inspections at the required intervals (before first use, every 7 days, and
                      after triggering events)
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      Prepare a written report for every inspection in accordance with Schedule 7
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      Provide the report to the person on whose behalf the inspection was carried out within
                      24 hours
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      Identify and record any defect that could give rise to a risk to health or safety
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      Recommend that the scaffold be taken out of service if it is unsafe to use until
                      defects are remedied
                    </div>
                  </div>
                </div>
              </div>

              {/* Hierarchy of control */}
              <div className="bg-slate-500/10 border border-slate-500/30 p-5 rounded-lg">
                <h3 className="text-slate-300 font-semibold mb-4">
                  Hierarchy of Control for Work at Height
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Regulation 6 establishes a strict hierarchy that must be followed when planning and
                  managing work at height. Each level must be considered in order &mdash; you cannot skip
                  to personal protection without first showing that collective protection is not reasonably
                  practicable.
                </p>

                <div className="space-y-3">
                  {/* Level 1 */}
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 text-xs font-bold flex-shrink-0">1</span>
                      <div>
                        <p className="text-green-300 font-semibold text-sm">Avoid Work at Height</p>
                        <p className="text-white/70 text-xs mt-0.5">
                          Can the work be done at ground level? Prefabricate components, use extending tools,
                          design out the need for height.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Level 2 */}
                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                      <div>
                        <p className="text-blue-300 font-semibold text-sm">Prevent Falls &mdash; Collective Protection</p>
                        <p className="text-white/70 text-xs mt-0.5">
                          Guard rails, working platforms, scaffold edge protection, safety nets. Protects
                          everyone in the area without relying on individual behaviour.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Level 3 */}
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0">3</span>
                      <div>
                        <p className="text-amber-300 font-semibold text-sm">Minimise Consequences &mdash; Collective Then Personal</p>
                        <p className="text-white/70 text-xs mt-0.5">
                          Safety nets and airbags (collective) before harnesses and lanyards (personal).
                          Personal fall protection is always the last resort.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-slate-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-slate-300">Why Collective Protection Comes First</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Collective protection (such as scaffold guard rails and working platforms) is always
                  prioritised because it protects <strong className="text-white">every person</strong> in
                  the area without relying on each individual wearing and correctly using their own
                  equipment. A guard rail works whether you are paying attention or not. A harness only
                  works if it is correctly fitted, attached to a suitable anchor, inspected, and the
                  wearer does not detach it. In scaffolding terms, this means the scaffold itself &mdash;
                  with its platforms, guard rails, and toe boards &mdash; is the primary fall protection
                  system. Harnesses are only needed during erection and dismantling (the &ldquo;leading
                  edge&rdquo;) before collective protection is fully in place.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ─── Record Keeping ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">&nbsp;</span>
              Record Keeping
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Proper record keeping is a legal requirement under the Work at Height Regulations and is
                essential for demonstrating compliance. Records also provide vital evidence in the event of
                an accident investigation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-slate-400 font-medium mb-3">Key Record-Keeping Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Inspection reports:</strong> Must be prepared for every inspection and kept
                      until the next inspection report is made, or for 3 months after the inspection date,
                      whichever is the later (Regulation 12(6)).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Availability:</strong> A copy of the most recent inspection report must be kept
                      at the site where the scaffold is erected and be available for inspection by any person
                      on whose behalf an inspection was carried out, or by an HSE or local authority
                      inspector.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>24-hour rule:</strong> The competent person must provide the inspection report
                      to the person on whose behalf the inspection was carried out within 24 hours of
                      completing the inspection.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Scaffold register:</strong> While not specifically required by the WAH
                      Regulations, most sites maintain a scaffold register that records every scaffold on
                      site, its inspection status, permitted loading, and any restrictions. This is
                      considered best practice and is often a principal contractor requirement.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                    <div>
                      <strong>Best practice retention:</strong> Although the regulations require retention
                      for 3 months or until the next report, best practice is to keep all records for the
                      duration of the project and for at least 6 years afterwards. If an accident occurs,
                      having the full inspection history will be essential evidence.
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-500/15 border border-slate-500/30 p-4 rounded-lg text-center">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Statutory Minimum Retention
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">3 Months</p>
                  <p className="text-white/60 text-sm">
                    or until next inspection report, whichever is later
                  </p>
                </div>
                <div className="bg-slate-500/15 border border-slate-500/30 p-4 rounded-lg text-center">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Report Delivery Deadline
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">24 Hours</p>
                  <p className="text-white/60 text-sm">
                    from completion of the inspection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Key Takeaways ─── */}
        <section className="mb-10">
          <div className="border-l-2 border-slate-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-slate-400/80 text-sm font-normal">&nbsp;</span>
              Key Takeaways
            </h2>
            <div className="space-y-4 text-white">
              <div className="bg-slate-500/10 border border-slate-500/30 p-4 rounded-lg">
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>Work at Height Regulations 2005</strong> are the primary UK law governing
                      scaffold safety. There is no minimum height &mdash; they apply wherever there is a risk
                      of a fall liable to cause personal injury.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Schedule 1</strong> requires scaffolds to be stable, strong, and maintained in
                      a safe condition throughout their life.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Schedule 2</strong> sets minimum dimensions for edge protection: 950 mm top
                      guard rail, 470 mm maximum unprotected gap, 150 mm toe board height.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Schedule 3</strong> requires working platforms to be suitable, sufficient,
                      free from dangerous gaps, and capable of bearing the imposed loads.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Regulation 12</strong> mandates scaffold inspections before first use, every 7
                      days, and after triggering events, carried out by a competent person with a written
                      report.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The <strong>hierarchy of control</strong> requires avoiding work at height first, then
                      collective protection, then personal protection as a last resort.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Inspection reports</strong> must be delivered within 24 hours, retained for at
                      least 3 months (best practice: 6+ years), and available on site for HSE inspection.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQs ─── */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-slate-400/80 text-sm font-normal">&nbsp;</span>
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
            title="Work at Height Regulations 2005 Quiz"
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
            <Link to="../scaffolding-awareness-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-slate-500 text-white hover:bg-slate-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../scaffolding-awareness-module-2-section-2">
              Next: NASC Guidance &amp; TG20
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default ScaffoldingAwarenessModule2Section1;
