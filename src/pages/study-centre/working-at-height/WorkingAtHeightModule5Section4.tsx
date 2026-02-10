import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  HardHat,
  ClipboardCheck,
  Search,
  Shield,
  FileText,
  Clock,
  Eye,
  Camera,
  Database,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quickCheckQuestions = [
  {
    question:
      "A harness was last given a thorough examination 7 months ago. It has been used regularly and passes the daily visual check each morning. Is it legally compliant under LOLER?",
    options: [
      "Yes — the daily visual check is sufficient as long as it passes",
      "No — LOLER requires a thorough examination by a competent person at least every 6 months for equipment used for carrying persons",
      "Yes — LOLER only applies to cranes and hoists, not harnesses",
      "No — harnesses need a thorough examination every 3 months",
    ],
    correctIndex: 1,
    explanation:
      "Under LOLER 1998, harnesses, lanyards, and SRLs (self-retracting lifelines) used as part of a personal fall protection system require a thorough examination by a competent person at least every 6 months. At 7 months, this harness is overdue and must not be used until examined.",
  },
  {
    question:
      "A scaffold was last inspected on Monday. Today is the following Tuesday (8 days later). A worker asks if the scaffold is safe to use. What is the correct answer?",
    options: [
      "Yes — the 7-day inspection is just a guideline",
      "No — Schedule 7 of the Work at Height Regulations requires scaffold inspection at intervals not exceeding 7 days, so it is overdue",
      "Yes — the inspection is only required every 14 days",
      "No — but only if the scaffold is above 4 metres",
    ],
    correctIndex: 1,
    explanation:
      "Schedule 7 of the Work at Height Regulations 2005 requires that scaffolds are inspected at intervals not exceeding 7 days by a competent person, with the results recorded in writing. At 8 days, the scaffold is overdue for inspection and must not be used until inspected.",
  },
  {
    question:
      "An employer keeps scaffold inspection records in a digital system with photographs. After the scaffold is dismantled, how long must the records be retained?",
    options: [
      "They can be deleted immediately once the scaffold is removed",
      "For 3 months after the work at that location is completed",
      "For 2 years from the date of the inspection",
      "Permanently — they must never be deleted",
    ],
    correctIndex: 1,
    explanation:
      "Schedule 7 of the Work at Height Regulations 2005 requires that scaffold inspection reports are kept at the site where the inspection was carried out until the work is completed, and then retained for a period of 3 months after the work at that location is finished.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between a pre-use check and a thorough examination?",
    answer:
      "A pre-use check is a visual and basic functional inspection carried out by the user before each use — checking for obvious damage, wear, correct assembly, and safe condition. A thorough examination is a detailed, systematic inspection by a competent person (often an independent engineer) that may involve dismantling, testing, and detailed measurement. Thorough examinations are required at set intervals by LOLER 1998 (typically 6-monthly for person-carrying equipment) and must be formally reported in writing.",
  },
  {
    question:
      "Who can carry out a LOLER thorough examination?",
    answer:
      "A thorough examination must be carried out by a competent person — someone with sufficient practical and theoretical knowledge and experience of the equipment to detect defects and assess their importance. In practice, this is often a specialist engineer from an insurance company, an independent inspection body, or an in-house engineer with appropriate qualifications. The competent person must be sufficiently independent to make impartial judgements — they should not be the person who maintains the equipment.",
  },
  {
    question:
      "What happens if a thorough examination finds a defect?",
    answer:
      "If the competent person finds a defect that is or could become dangerous, they must notify the employer immediately and, if the defect involves an existing or imminent risk of serious personal injury, they must also notify the HSE (or relevant enforcing authority) directly. The equipment must be taken out of service until the defect is rectified and the equipment is re-examined. The employer must not allow the equipment to be used until it has been passed as safe.",
  },
  {
    question:
      "Can inspection records be kept digitally instead of on paper?",
    answer:
      "Yes. There is no legal requirement for records to be in a specific format. Digital records are fully acceptable and often preferred because they provide better searchability, audit trails, timestamped photographs, automatic reminders for upcoming inspections, and protection against loss or damage. The key requirement is that records are accessible, legible, and retained for the required periods. Many modern inspection systems use tablet-based apps that generate reports automatically with GPS location, date/time stamps, and photograph evidence.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "How often must scaffolds be inspected under Schedule 7 of the Work at Height Regulations 2005?",
    options: [
      "Daily, before each use",
      "At intervals not exceeding 7 days",
      "Monthly, by a competent person",
      "Every 6 months under LOLER",
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 7 requires scaffolds to be inspected by a competent person at intervals not exceeding 7 days. This is in addition to pre-use checks by the user. The inspection must be recorded in writing and the report kept on site.",
  },
  {
    id: 2,
    question:
      "Under LOLER 1998, how frequently must a harness used for personal fall protection be given a thorough examination?",
    options: [
      "Every 12 months",
      "Every 6 months",
      "Every 3 months",
      "Only when damage is noticed",
    ],
    correctAnswer: 1,
    explanation:
      "LOLER 1998 requires that lifting equipment used for carrying persons (including harnesses, lanyards, and SRLs when used as fall arrest) must receive a thorough examination at least every 6 months. Some manufacturers recommend more frequent examination.",
  },
  {
    id: 3,
    question:
      "Who should carry out a pre-use visual inspection of a ladder?",
    options: [
      "Only a CISRS-qualified inspector",
      "The user, before every use",
      "The site safety officer, once per week",
      "The ladder manufacturer's representative",
    ],
    correctAnswer: 1,
    explanation:
      "Pre-use checks are the responsibility of the user, carried out before every use. The user checks for obvious defects such as damaged rungs, cracked stiles, missing feet, and signs of wear. This is a visual and basic functional check, not a thorough examination.",
  },
  {
    id: 4,
    question:
      "A LOLER thorough examination report identifies an imminent risk of serious personal injury. What must the competent person do?",
    options: [
      "Record the defect and schedule a repair within 28 days",
      "Notify the employer and also report directly to the HSE",
      "Tell the user to be careful and continue using the equipment",
      "Return for a re-examination in 3 months",
    ],
    correctAnswer: 1,
    explanation:
      "When a thorough examination reveals an existing or imminent risk of serious personal injury, the competent person must notify the employer immediately AND send a report to the relevant enforcing authority (usually the HSE). The equipment must be taken out of service until the defect is rectified.",
  },
  {
    id: 5,
    question:
      "For how long must scaffold inspection reports be retained after the work at that location is completed?",
    options: [
      "They can be discarded immediately",
      "For 3 months",
      "For 12 months",
      "For 5 years",
    ],
    correctAnswer: 1,
    explanation:
      "Schedule 7 of the Work at Height Regulations 2005 requires that scaffold inspection reports are kept on site while the scaffold is in use, and then retained for 3 months after the work at that location is completed.",
  },
  {
    id: 6,
    question:
      "What information must an equipment register contain for each item?",
    options: [
      "Only the purchase price and supplier name",
      "Unique ID, date of first use, inspection history, thorough exam dates, and withdrawal date",
      "Only the manufacturer's name and model number",
      "Only the date it was last used",
    ],
    correctAnswer: 1,
    explanation:
      "An equipment register should contain: unique identification number, description (type, manufacturer, model), date of first use, complete inspection history, thorough examination dates and results, maintenance records, and date of withdrawal from service. This provides a complete lifecycle record for each item.",
  },
  {
    id: 7,
    question:
      "A scaffold has been exposed to severe weather (high winds and heavy rain) overnight. What must happen before it is used?",
    options: [
      "Nothing extra — the 7-day inspection covers weather events",
      "A pre-use visual check by the user is sufficient",
      "It must be inspected by a competent person before being used, as required by Schedule 7",
      "Only the base level needs checking",
    ],
    correctAnswer: 2,
    explanation:
      "Schedule 7 of the Work at Height Regulations 2005 requires inspection after any event likely to have affected the scaffold's strength or stability, including adverse weather. This is an additional inspection requirement beyond the standard 7-day cycle and must be carried out by a competent person before the scaffold is used.",
  },
  {
    id: 8,
    question:
      "How long must LOLER thorough examination reports be retained?",
    options: [
      "Until the next thorough examination",
      "Until the next thorough examination plus 2 years, or 2 years — whichever is longer",
      "For 6 months",
      "Permanently — they must never be discarded",
    ],
    correctAnswer: 1,
    explanation:
      "LOLER 1998 requires that thorough examination reports are kept until the next thorough examination is carried out, and then for an additional 2 years after that. If no further examination takes place (e.g., the equipment is withdrawn from service), the report must be kept for 2 years from the date of the last examination.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function WorkingAtHeightModule5Section4() {
  useSEO({
    title:
      "Inspection Regimes & Record Keeping | Module 5 | Working at Height",
    description:
      "Pre-use checks, 7-day scaffold inspections, LOLER thorough examinations, record keeping requirements, and equipment registers for working at height.",
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="min-h-[44px] min-w-[44px] text-white/70 hover:text-white hover:bg-white/10 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40">Module 5 {"\u2022"} Section 4</p>
            <h1 className="text-sm font-semibold text-white truncate">
              Inspection Regimes & Record Keeping
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-green-500/20 border border-amber-500/30 mb-4">
            <CalendarDays className="h-8 w-8 text-amber-500" />
          </div>
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-500 text-xs font-semibold">
                MODULE 5 &middot; SECTION 4
              </span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Inspection Regimes & Record Keeping
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the layered inspection system — from daily pre-use
            checks through to LOLER thorough examinations — and the record
            keeping requirements that underpin legal compliance
          </p>
        </div>

        {/* In 30 Seconds Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-6">
          <h3 className="text-base font-bold text-amber-400 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            In 30 Seconds
          </h3>
          <p className="text-white/80 text-base leading-relaxed">
            Equipment for work at height is subject to a layered inspection
            regime: daily pre-use checks by the user, 7-day scaffold inspections
            by a competent person, and 6-monthly LOLER thorough examinations for
            harnesses, lanyards, MEWPs, and SRLs. Each layer produces records
            that must be retained for specific periods. An equipment register
            tracks each item from first use to withdrawal. Without records, you
            cannot prove compliance — and in the event of an accident, missing
            records will count heavily against the employer.
          </p>
        </div>

        {/* Legal Framework Box */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mb-8">
          <h3 className="text-base font-bold text-blue-400 mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Key Legislation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/70">
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
              <span>
                <strong className="text-white">WAH Regs 2005, Schedule 7</strong>{" "}
                — 7-day scaffold inspections and reporting
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
              <span>
                <strong className="text-white">LOLER 1998</strong>{" "}
                — thorough examination of lifting equipment (6-monthly for person-carrying)
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
              <span>
                <strong className="text-white">PUWER 1998</strong>{" "}
                — general requirement to maintain work equipment in safe condition
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
              <span>
                <strong className="text-white">Management Regs 1999</strong>{" "}
                — general duty to monitor and review safety arrangements
              </span>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            Learning Outcomes
          </h3>
          <ul className="space-y-3">
            {[
              "Describe the purpose and scope of pre-use checks for ladders, scaffolds, harnesses, and MEWPs",
              "Explain the requirements for 7-day scaffold inspections under Schedule 7",
              "Outline LOLER 1998 requirements for 6-monthly thorough examinations",
              "List the legal retention periods for different types of inspection records",
              "Describe what an equipment register should contain",
              "Explain the advantages of digital record keeping for inspection and examination data",
              "State when additional inspections are required beyond the standard schedule",
            ].map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 01 — Pre-Use Checks                                  */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm">
              01
            </span>
            <h3 className="text-xl font-semibold text-white">
              Pre-Use Checks — Before Every Use
            </h3>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Pre-use checks are the first line of defence. They are carried out
              by the user before every use — every shift, every day. The purpose
              is to identify obvious defects, damage, or unsafe conditions that
              may have developed since the last formal inspection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Ladders */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-amber-400" />
                  Ladders & Stepladders
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Stiles straight, no bends, cracks, or corrosion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>All rungs present, secure, and not bent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Feet present and in good condition (rubber intact)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Locking mechanisms engage fully (stepladders)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>No paint, grease, or contamination on rungs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Identification label/sticker present and legible</span>
                  </li>
                </ul>
              </div>

              {/* Scaffolds */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-amber-400" />
                  Scaffolds & Towers
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>All guardrails, mid-rails, and toeboards in place</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Platforms fully boarded with no gaps exceeding 25mm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Safe access (ladder, stairway) in good condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Base plates on firm ground, castors locked (towers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Current inspection tag displayed (green = passed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>No obvious damage to tubes, couplers, or fittings</span>
                  </li>
                </ul>
              </div>

              {/* Harnesses */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-amber-400" />
                  Harnesses & Lanyards
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Webbing free from cuts, fraying, burns, or chemical damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>All buckles, D-rings, and connectors functioning correctly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Stitching intact — no pulled or broken threads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Labels legible — manufacturer, model, date of manufacture, CE/UKCA mark</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>NOT previously deployed in a fall (energy absorber indicators checked)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Within thorough examination date (check tag or register)</span>
                  </li>
                </ul>
              </div>

              {/* MEWPs */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-amber-400" />
                  MEWPs (Cherry Pickers, Scissor Lifts)
                </h4>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>All controls functioning correctly (ground and platform)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Emergency lowering system tested and operational</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Guardrails and gates secure, gate self-closing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>No hydraulic leaks visible on boom, rams, or hoses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Tyres in good condition, correct pressure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>Current LOLER thorough examination certificate displayed or available</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                If a Defect Is Found
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                If any defect is found during a pre-use check, the equipment
                must be taken out of service immediately. Tag it as defective,
                report it to the supervisor, and do not allow anyone to use it
                until the defect has been repaired and the equipment re-inspected
                by a competent person.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 02 — 7-Day Scaffold Inspections                      */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm">
              02
            </span>
            <h3 className="text-xl font-semibold text-white">
              7-Day Scaffold Inspections — Schedule 7
            </h3>
          </div>
          <div className="border-l-2 border-blue-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Schedule 7 of the Work at Height Regulations 2005 requires that
              scaffolding from which a person could fall 2 metres or more must
              be inspected by a competent person at the following times:
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3">
                When Inspection Is Required
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Before first use</strong> — after
                    initial erection, before anyone works from it
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">After any alteration</strong>{" "}
                    — any change to the scaffold structure
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">After any event likely to affect stability</strong>{" "}
                    — adverse weather, impact from a vehicle or load, ground
                    disturbance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">At intervals not exceeding 7 days</strong>{" "}
                    — from the date of the last inspection
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                What Must the Inspection Cover?
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Foundations and base plates — firm, level, and not undermined</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Standards (uprights) — vertical, undamaged, correctly spaced</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Ledgers, braces, and transoms — correctly fitted, couplers tight</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Ties — present, correctly positioned, secure to the building</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Platforms — fully boarded, boards secure, no excessive overhang</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Guardrails, mid-rails, and toeboards — correct heights, secure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Access points — ladders, stairways in good condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Loading — not overloaded, materials stored safely</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-400" />
                The Inspection Report
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The result of each inspection must be recorded in writing. The
                report must include the name and address of the person for whom
                the inspection was carried out, the location and description of
                the scaffold, the date and time of inspection, details of any
                matters that could give rise to a risk, and the name, signature,
                and position of the person who carried out the inspection. The
                report must be kept on site while the scaffold is in use.
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 1 */}
        <InlineCheck
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 03 — LOLER Thorough Examinations                     */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500/20 text-green-400 font-bold text-sm">
              03
            </span>
            <h3 className="text-xl font-semibold text-white">
              LOLER 1998 — Thorough Examinations
            </h3>
          </div>
          <div className="border-l-2 border-green-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              The Lifting Operations and Lifting Equipment Regulations 1998
              (LOLER) require that all lifting equipment — including MEWPs,
              harnesses, lanyards, and self-retracting lifelines (SRLs) — is
              given a thorough examination by a competent person at prescribed
              intervals.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-green-400" />
                Examination Intervals
              </h4>
              <div className="space-y-2">
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold min-w-[100px] text-xs flex-shrink-0">
                      6-Monthly
                    </span>
                    <span className="text-white/70 text-xs">
                      Equipment used for lifting persons — MEWPs, harnesses,
                      lanyards, SRLs, rescue descent devices, man-riding winches
                    </span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold min-w-[100px] text-xs flex-shrink-0">
                      12-Monthly
                    </span>
                    <span className="text-white/70 text-xs">
                      All other lifting equipment — cranes, hoists, lifting
                      accessories (slings, shackles) not used for carrying persons
                    </span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold min-w-[100px] text-xs flex-shrink-0">
                      As specified
                    </span>
                    <span className="text-white/70 text-xs">
                      Where a competent person determines that a shorter
                      interval is needed due to conditions of use, environment,
                      or manufacturer's recommendations
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                What Does a Thorough Examination Involve?
              </h4>
              <p className="text-white/70 text-sm leading-relaxed mb-3">
                A thorough examination is a detailed, systematic inspection that
                goes far beyond a visual check. It may include:
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Visual inspection of all components for wear, damage, corrosion, and deformation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Functional testing of all safety systems (limit switches, emergency stops, overload protection)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Measurement of critical dimensions (webbing width, wire rope diameter)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Non-destructive testing where required (ultrasonic, magnetic particle)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>Assessment of the equipment's suitability for continued use</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                The Examination Report
              </h4>
              <p className="text-white/70 text-sm leading-relaxed">
                The competent person must produce a written report (traditionally
                using HSE Form F91 Part III, but equivalent formats are
                acceptable). The report must record: equipment identification,
                date of examination, date of next examination due, description
                of any defects found, whether the defect is or could become
                dangerous, and the examiner's recommendation (safe to use,
                repair required, or withdraw from service).
              </p>
            </div>
          </div>
        </section>

        {/* InlineCheck 2 */}
        <InlineCheck
          question={quickCheckQuestions[1].question}
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 04 — Record Keeping Requirements                     */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-sm">
              04
            </span>
            <h3 className="text-xl font-semibold text-white">
              Record Keeping Requirements
            </h3>
          </div>
          <div className="border-l-2 border-purple-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Each type of inspection produces records that must be retained for
              specific periods. These records serve as evidence of compliance
              and are essential in the event of an HSE investigation following
              an incident.
            </p>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-400" />
                Legal Retention Periods
              </h4>
              <div className="space-y-2">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold min-w-[180px] text-xs flex-shrink-0">
                      LOLER Reports
                    </span>
                    <span className="text-white/70 text-xs leading-relaxed">
                      Retained until the next thorough examination is carried
                      out, plus 2 years after that. If no further examination
                      takes place, retained for 2 years from the date of the
                      last examination.
                    </span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold min-w-[180px] text-xs flex-shrink-0">
                      Scaffold Inspections
                    </span>
                    <span className="text-white/70 text-xs leading-relaxed">
                      Kept on site while the scaffold is in use, then retained
                      for 3 months after the work at that location is completed.
                    </span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold min-w-[180px] text-xs flex-shrink-0">
                      Training Records
                    </span>
                    <span className="text-white/70 text-xs leading-relaxed">
                      For the duration of the person's employment plus a
                      reasonable period afterwards (typically 3-6 years; some
                      recommend retaining permanently for asbestos and similar
                      records).
                    </span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold min-w-[180px] text-xs flex-shrink-0">
                      Risk Assessments
                    </span>
                    <span className="text-white/70 text-xs leading-relaxed">
                      Must be reviewed regularly and kept up to date. Previous
                      versions should be retained as a record of the
                      organisation's safety management — good practice is to
                      retain for at least 3 years.
                    </span>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold min-w-[180px] text-xs flex-shrink-0">
                      Pre-Use Check Logs
                    </span>
                    <span className="text-white/70 text-xs leading-relaxed">
                      No specific statutory retention period, but good practice
                      is to retain for at least 12 months or until the next
                      thorough examination, whichever is longer.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 05 — Equipment Registers                             */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 font-bold text-sm">
              05
            </span>
            <h3 className="text-xl font-semibold text-white">
              Equipment Registers
            </h3>
          </div>
          <div className="border-l-2 border-orange-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              An equipment register is a central record of all work-at-height
              equipment, tracking each item from first use to withdrawal from
              service. It provides a complete lifecycle history that is essential
              for managing inspection schedules and demonstrating compliance.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5">
              <h4 className="font-semibold text-white text-sm mb-3 flex items-center gap-2">
                <Database className="h-4 w-4 text-orange-400" />
                What the Register Should Contain
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Unique identification number</strong>{" "}
                    — each item must have a unique ID (engraved, tagged, or labelled)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Description</strong>{" "}
                    — type, manufacturer, model, serial number
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Date of manufacture</strong>{" "}
                    — from the manufacturer's label
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Date of first use</strong>{" "}
                    — when the item was first put into service
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Inspection history</strong>{" "}
                    — dates and results of all pre-use checks and inspections
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Thorough examination dates</strong>{" "}
                    — dates, results, and next due dates for LOLER examinations
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Maintenance records</strong>{" "}
                    — any repairs, replacements, or modifications
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Withdrawal from service</strong>{" "}
                    — date and reason (end of life, irreparable damage, obsolescence)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  SECTION 06 — Digital Record Keeping                          */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm">
              06
            </span>
            <h3 className="text-xl font-semibold text-white">
              Digital Record Keeping
            </h3>
          </div>
          <div className="border-l-2 border-cyan-500/40 pl-4 sm:pl-6 space-y-4">
            <p className="text-white/80 text-sm leading-relaxed">
              Digital record keeping systems offer significant advantages over
              paper-based systems. There is no legal requirement for records to
              be in any specific format — digital records are fully acceptable
              and increasingly preferred by both employers and enforcement bodies.
            </p>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <Camera className="h-4 w-4 text-cyan-400" />
                Advantages of Digital Systems
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Photo evidence</strong> —
                    photographs with date/time/GPS stamps provide irrefutable
                    evidence of condition at the time of inspection
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Automatic reminders</strong>{" "}
                    — the system alerts you when inspections or examinations
                    are due, preventing overdue items
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Audit trails</strong> —
                    digital records show exactly who entered data, when, and
                    whether any changes were made
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Searchability</strong> —
                    find any record instantly by equipment ID, date, inspector
                    name, or defect type
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Backup and resilience</strong>{" "}
                    — cloud-based systems protect against loss from fire,
                    theft, or damage
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Remote access</strong> —
                    managers can view inspection status across multiple sites
                    from anywhere
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck 3 */}
        <InlineCheck
          question={quickCheckQuestions[2].question}
          options={quickCheckQuestions[2].options}
          correctIndex={quickCheckQuestions[2].correctIndex}
          explanation={quickCheckQuestions[2].explanation}
        />

        {/* ------------------------------------------------------------ */}
        {/*  INSPECTION REGIME TIMELINE DIAGRAM                           */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            Inspection Regime Timeline
          </h3>
          <div className="bg-gradient-to-br from-amber-500/5 to-green-500/5 border border-amber-500/20 rounded-xl p-5">
            <p className="text-white/60 text-xs mb-4">
              The layered inspection system ensures equipment is checked at
              appropriate intervals — from daily pre-use checks through to
              annual thorough examinations.
            </p>

            {/* Timeline */}
            <div className="space-y-3">
              {/* Daily */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-16 h-10 rounded-lg bg-amber-500/20">
                    <span className="text-amber-400 font-bold text-xs">DAILY</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold text-sm">Pre-Use Visual Check</h5>
                    <p className="text-white/50 text-xs">By the user, before every use</p>
                  </div>
                </div>
                <div className="pl-[76px] text-xs text-white/60">
                  Ladders, scaffolds, harnesses, lanyards, MEWPs — visual and basic functional check for obvious defects
                </div>
              </div>

              {/* Weekly */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-16 h-10 rounded-lg bg-blue-500/20">
                    <span className="text-blue-400 font-bold text-xs">7 DAYS</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold text-sm">Scaffold Inspection (Schedule 7)</h5>
                    <p className="text-white/50 text-xs">By a competent person, recorded in writing</p>
                  </div>
                </div>
                <div className="pl-[76px] text-xs text-white/60">
                  Full structural inspection of all scaffold elements — foundations, standards, ledgers, braces, ties, platforms, guardrails, access
                </div>
              </div>

              {/* Monthly */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-16 h-10 rounded-lg bg-purple-500/20">
                    <span className="text-purple-400 font-bold text-xs">MONTHLY</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold text-sm">Detailed Harness Visual Inspection</h5>
                    <p className="text-white/50 text-xs">By a trained inspector (good practice, not statutory)</p>
                  </div>
                </div>
                <div className="pl-[76px] text-xs text-white/60">
                  More detailed than daily check — systematic inspection of all webbing, stitching, buckles, D-rings, and labels. Recorded in the equipment register.
                </div>
              </div>

              {/* 6-Monthly */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-16 h-10 rounded-lg bg-green-500/20">
                    <span className="text-green-400 font-bold text-xs">6 MTHS</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold text-sm">LOLER Thorough Examination</h5>
                    <p className="text-white/50 text-xs">By a competent person, formal written report</p>
                  </div>
                </div>
                <div className="pl-[76px] text-xs text-white/60">
                  MEWPs, harnesses, lanyards, SRLs, rescue devices — detailed examination, may include testing and measurement. Report produced (F91 Part III or equivalent).
                </div>
              </div>

              {/* Annual */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-16 h-10 rounded-lg bg-red-500/20">
                    <span className="text-red-400 font-bold text-xs">ANNUAL</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-semibold text-sm">Annual Thorough Examination</h5>
                    <p className="text-white/50 text-xs">For non-person-carrying lifting equipment</p>
                  </div>
                </div>
                <div className="pl-[76px] text-xs text-white/60">
                  Lifting equipment not used for carrying persons (hoists, pulleys, gin wheels) requires LOLER thorough examination at least every 12 months.
                </div>
              </div>
            </div>

            <p className="text-white/50 text-xs italic mt-4">
              Note: Additional inspections are required after any event likely
              to have affected equipment safety (adverse weather, impact,
              overload, suspected fall arrest deployment).
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Real-World Scenario                                          */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HardHat className="h-5 w-5 text-amber-400" />
            Real-World Scenario
          </h3>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-3">
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-amber-400">Scenario:</strong> An HSE
              inspector arrives on a construction site and asks to see the
              scaffold inspection records. The site manager says the records
              "are in the office" and cannot produce them on site. The inspector
              also asks to see the LOLER thorough examination report for a MEWP
              being used on site. The operator says "the hire company sorts all
              that" and has no documentation.
            </p>
            <div className="bg-black/20 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-2">
                What are the legal issues?
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Scaffold records:</strong>{" "}
                    Schedule 7 requires the inspection report to be kept{" "}
                    <em>on site</em> while the scaffold is in use. "In the
                    office" is not compliant if the office is not on site.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">LOLER report:</strong> The
                    employer (not the hire company) has the duty to ensure a
                    valid thorough examination is in place. If the report cannot
                    be produced, the MEWP should not be in use.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Likely outcome:</strong>{" "}
                    Prohibition notice on the MEWP (stop use immediately),
                    improvement notice for the scaffold records, and potential
                    prosecution if the situation is repeated.
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-white/60 text-xs italic">
              This scenario illustrates why records must be available on site,
              not just "somewhere in the system." When hiring equipment, always
              obtain copies of the current thorough examination report before
              the equipment arrives on site.
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Key Terminology                                              */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Key Terminology
          </h3>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">LOLER 1998</span>
                <span className="text-white/70">Lifting Operations and Lifting Equipment Regulations 1998 — requires thorough examination of lifting equipment at prescribed intervals</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">PUWER 1998</span>
                <span className="text-white/70">Provision and Use of Work Equipment Regulations 1998 — general duty to maintain work equipment in safe condition and inspect at suitable intervals</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">Schedule 7</span>
                <span className="text-white/70">Schedule 7 of the Work at Height Regulations 2005 — specifies the inspection requirements for scaffolding and related structures</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">F91 Part III</span>
                <span className="text-white/70">The traditional HSE form for recording the results of a LOLER thorough examination — equivalent formats are acceptable</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">Thorough Exam</span>
                <span className="text-white/70">A detailed, systematic inspection by a competent person that may include dismantling, testing, and measurement — far more comprehensive than a visual check</span>
              </div>
              <div className="flex items-start gap-3 bg-black/20 rounded-lg p-3">
                <span className="text-amber-400 font-bold min-w-[140px] flex-shrink-0">SRL</span>
                <span className="text-white/70">Self-Retracting Lifeline — a fall arrest device containing a spring-loaded retractable line that locks under sudden load, subject to LOLER thorough examination</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  FAQs                                                         */}
        {/* ------------------------------------------------------------ */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <h4 className="font-medium text-white mb-2 text-sm">
                  {faq.question}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/*  Quiz                                                         */}
        {/* ------------------------------------------------------------ */}
        <Quiz
          title="Section 4 — Inspection Regimes & Record Keeping"
          questions={quizQuestions}
        />

        {/* ------------------------------------------------------------ */}
        {/*  Navigation Footer                                            */}
        {/* ------------------------------------------------------------ */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-8 border-t border-white/10 mt-10">
          <Button
            variant="outline"
            className="min-h-[44px] border-white/20 text-black bg-white/90 hover:bg-white touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-5">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            className="min-h-[44px] bg-amber-500 hover:bg-amber-500/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-6">
              Next: Module 6
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
