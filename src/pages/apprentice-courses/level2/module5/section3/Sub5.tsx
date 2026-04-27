/**
 * Module 5 · Section 3 · Sub 5 — Site diary and time sheets
 * Synthesis Sub — extends LO2 / AC 2.2 (purpose of workplace information).
 * Not directly mapped to a single 210 AC. The apprentice's daily paper
 * trail — diary, time sheet, JIB grading, NVQ portfolio, off-the-job
 * training log, monthly review forms.
 *
 * Frame: each record has a different purpose. Time sheet = pay. Diary =
 * dispute evidence. NVQ entry = portfolio for end-point assessment.
 * Off-the-job log = apprenticeship standards compliance (20% minimum).
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Site diary and time sheets | Level 2 Module 5.3.5 | Elec-Mate';
const DESCRIPTION =
  "The apprentice's daily paper trail — site diary, time sheet, JIB grading, NVQ portfolio, off-the-job training log, monthly review forms. What each one is for and what happens if it's blank.";

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s3-sub5-friday',
    question:
      "It's Friday afternoon and you've been keeping the site diary blank all week, planning to fill it in from memory before you submit the time sheet. What goes wrong with that approach?",
    options: [
      "Nothing — Friday catch-up is normal practice.",
      "You'll forget the detail. By Friday you can roughly remember Monday's hours but not which circuits you worked on, who you were with, what materials you used, or what variations came up. The diary is a contemporaneous record — its evidential value depends on it being written close to the event. Write daily; the five minutes at the end of each shift saves the Friday panic and produces a record that's actually useful in dispute.",
      "The diary fills itself from the firm's app.",
      "The supervisor will write it for you.",
    ],
    correctIndex: 1,
    explanation:
      "The strength of a site diary as evidence — for pay disputes, customer disputes, NVQ portfolio entries — depends entirely on it being contemporaneous (written at or close to the time of the events). A diary written from memory on Friday afternoon is much weaker evidence than one written daily. Detail is lost: you'll remember the shape of the week but not the names of the circuits, the materials, the conversations. Five minutes at the end of each shift is the discipline.",
  },
  {
    id: 'mod5-s3-sub5-otj',
    question:
      "Your apprenticeship standard requires at least 20% off-the-job training over the duration of the programme. You've been on site full-time for three months without recording any off-the-job hours. What's the consequence?",
    options: [
      "Nothing — only the college tutor needs to track it.",
      "The apprenticeship can be at risk. Apprenticeship standards (gov.uk) require evidence of at least 20% off-the-job training across the full programme. If your log shows no off-the-job hours for an extended period, the training provider's audit will flag it and the funding rules around the apprenticeship may not be met. Off-the-job includes day-release at college, online learning, shadowing in unfamiliar work areas, and structured study at home.",
      "Just lie on the log.",
      'It is automatically calculated from your time sheet.',
    ],
    correctIndex: 1,
    explanation:
      "The 20% off-the-job training requirement is a core element of the English apprenticeship standards. It's audited periodically by the training provider and by the Education and Skills Funding Agency (ESFA). A log that shows zero off-the-job hours over months is a flag that the apprenticeship isn't compliant. Off-the-job is a broad category — day-release, online courses, structured study time, shadowing — all count if recorded. The apprentice is responsible for keeping the log; the training provider audits it.",
  },
  {
    id: 'mod5-s3-sub5-saturday',
    question:
      "Six months from now there's a dispute with your employer about whether you worked overtime on a particular Saturday. What's the strongest evidence in your favour?",
    options: [
      "Your memory of the day.",
      "A daily site diary entry for that Saturday plus the employer-signed time sheet for that week. The diary records what you did and who you were with; the time sheet records the hours and is countersigned by the employer. The two together form a contemporaneous, independently witnessed record. Without them, the dispute is your word against the firm's — and that's a position you don't want to be in.",
      "A WhatsApp screenshot from the time.",
      'You can\'t prove it without HR being involved at the time.',
    ],
    correctIndex: 1,
    explanation:
      "The combination of a self-maintained contemporaneous diary and an employer-countersigned time sheet is the strongest evidence in a pay or hours dispute. Each on its own is good evidence; together they're hard to challenge. The diary establishes what you were doing; the time sheet establishes the hours and is signed by someone other than you. Six months on, this combination beats memory, beats WhatsApp, beats post-hoc reconstruction.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "Which records make up the apprentice's day-to-day paper trail?",
    options: [
      "Just the time sheet — that's what gets you paid.",
      "Daily site diary, weekly time sheet, NVQ portfolio entries (evidence for the End-Point Assessment), off-the-job training log (apprenticeship standards), monthly apprentice review forms (you + employer + tutor), JIB grading entries where applicable, and any required H&S sign-on records (RAMS sign-on, toolbox talk attendance).",
      "Anything you remember at the end of the week.",
      'Whatever the firm asks for.',
    ],
    correctAnswer: 1,
    explanation:
      "The apprentice's records aren't a single document — they're a chain that runs through the day, the week, the month and the qualification. Each record has a different audience and a different purpose. The discipline is keeping all of them current; the cost of letting any one slip is felt later (in pay disputes, in a weak portfolio, in an apprenticeship standards audit failure).",
  },
  {
    id: 2,
    question:
      "What is the specific purpose of the daily site diary, separate from the time sheet?",
    options: [
      "It is a duplicate of the time sheet.",
      "The diary is your detailed contemporaneous record of what you did, who you worked with, what materials you used, what variations came up, what unusual events occurred. The time sheet records the hours; the diary records the substance. The diary is your evidence in any later dispute (pay, customer, NVQ portfolio, employer review) and is the source from which NVQ portfolio entries are written up.",
      "It is for the customer.",
      "It is for HMRC.",
    ],
    correctAnswer: 1,
    explanation:
      "The site diary is a different kind of record from the time sheet. The time sheet is a hours-and-pay document; the diary is a what-happened document. The diary's value is in its detail — circuit numbers, materials used, customer conversations, variations to the scope, unusual events. By year three you'll be writing your NVQ portfolio entries from the diary; without it you're reconstructing from memory.",
  },
  {
    id: 3,
    question:
      "Why does the apprenticeship off-the-job training log matter to your apprenticeship status?",
    options: [
      "It does not — only on-the-job hours count.",
      "Apprenticeship standards (gov.uk) require evidence of at least 20% of the apprenticeship being off-the-job training. The log records day-release at college, online courses, structured study time, shadowing in unfamiliar areas, and any other learning activity outside normal productive work. Without it, the apprenticeship may not meet the standards required for the End-Point Assessment to be funded and certified.",
      "Only college tutors maintain it.",
      "It is purely advisory.",
    ],
    correctAnswer: 1,
    explanation:
      "The 20% off-the-job training requirement is a statutory feature of English apprenticeship standards funded under the apprenticeship levy. It's audited by the training provider and by the ESFA. The apprentice is responsible for the log — typically a digital record on the training provider's portal or a paper log countersigned weekly. A log that shows substantial gaps will trigger a compliance investigation.",
  },
  {
    id: 4,
    question:
      "What's the link between the daily site diary and your NVQ portfolio for the End-Point Assessment?",
    options: [
      "There is no link.",
      "The diary is the source from which NVQ portfolio entries are written up. The portfolio needs evidence of competence against specific units and learning outcomes — circuit installs, fault-finding, testing, customer interaction. The diary is where the contemporaneous record of those activities lives, with the level of detail needed to write up a portfolio entry months later. Portfolio entries written from a thin diary tend to be thin themselves.",
      "The portfolio is filled in by the college only.",
      'The diary is just for the firm.',
    ],
    correctAnswer: 1,
    explanation:
      "The NVQ portfolio is the evidence base for the End-Point Assessment (EPA) at the end of the apprenticeship. It needs detailed, dated, witnessed evidence of the apprentice's competence. The diary is the upstream source — the day-by-day detail that gets curated and written up into portfolio entries. A weak diary leads to a weak portfolio leads to a weak EPA.",
  },
  {
    id: 5,
    question:
      "What's the function of the monthly apprentice review meeting and the form that comes out of it?",
    options: [
      "It is a disciplinary meeting.",
      "The monthly review brings together the apprentice, the employer (or supervisor) and the training provider's tutor or assessor. The review discusses progress on the apprenticeship standards, on-the-job competence, off-the-job training hours, any concerns from any side, and actions for the next month. The form is a record of the review and is part of the audit trail for the apprenticeship's compliance with the standards.",
      "It is just a casual chat.",
      "It only happens at the end of the apprenticeship.",
    ],
    correctAnswer: 1,
    explanation:
      "The monthly (or sometimes 6-weekly) review is the formal mechanism for tracking apprenticeship progress. It's a three-way meeting (apprentice, employer, training provider) and the form that records it is part of the apprenticeship paperwork. Regular reviews are how slippage gets spotted and addressed before it becomes a compliance issue. Apprentices who treat the reviews as 'a chat' tend to miss the chance to raise concerns formally.",
  },
  {
    id: 6,
    question:
      "What does JIB grading have to do with the apprentice's records?",
    options: [
      "Nothing — JIB is for qualified electricians only.",
      "The JIB Apprentice Grading scheme tracks an apprentice's progress through training and uses recorded competence (often drawn from the diary, portfolio and review forms) to support grade progression. JIB grades are tied to industry-standard pay rates under the JIB Working Rules; progressing through the grades requires evidence, and the diary is part of the evidence chain.",
      "JIB is purely a pay scheme with no link to records.",
      'JIB grading is automatic with time served.',
    ],
    correctAnswer: 1,
    explanation:
      "The JIB (Joint Industry Board) operates an apprentice grading scheme alongside its post-qualification grading scheme. Apprentice grades progress with documented competence and time served, and the documentary evidence draws on the apprenticeship records. Apprentices working under a JIB-affiliated employer should know which grade they're on and what evidence is needed to progress.",
  },
  {
    id: 7,
    question:
      "Why is digital recording (apps such as Tradify, Powered Now, Procore mobile) becoming common for apprentice records?",
    options: [
      "It isn't — paper is still standard.",
      "Apps reduce the friction of recording — entries can be made on the phone in the moment, photos and locations can be attached automatically, the data is searchable later. They also make sharing with the supervisor and the training provider easier. Paper diaries still work fine if maintained; digital tools just lower the barrier to actually keeping them current.",
      "Apps are mandatory under apprenticeship standards.",
      'Paper records are no longer accepted.',
    ],
    correctAnswer: 1,
    explanation:
      "Digital tools (Tradify, Powered Now, Procore mobile, Yunex, etc.) are increasingly common in the trade because they reduce the activation energy required to keep records current. Photo evidence with embedded timestamps and locations is much harder to dispute than handwritten notes. The format doesn't matter to the apprenticeship standards — paper or digital both work — but the discipline of recording does.",
  },
  {
    id: 8,
    question:
      "What's the principal contractor's responsibility under CDM 2015 Reg 13 in relation to records of who's on site?",
    options: [
      "None — the PC doesn't keep records.",
      "CDM 2015 Reg 13(1)(a) requires the principal contractor to plan, manage and monitor the construction phase. In practice this includes site sign-in / sign-out registers, attendance at toolbox talks, RAMS sign-on records, and any permit records. These records combine with the apprentice's own records to form a full picture of who was on site doing what when. The records are commonly required after any incident or in any later dispute.",
      "Only after an incident.",
      'Records are voluntary.',
    ],
    correctAnswer: 1,
    explanation:
      "CDM 2015 Reg 13 places the planning, managing and monitoring duty on the principal contractor on notifiable construction sites. Site attendance records are part of how the PC monitors the site. From the apprentice's perspective, the PC's records (sign-in, toolbox talk attendance, RAMS sign-on) supplement the apprentice's own records (diary, time sheet) and form a fuller, mutually reinforcing record set.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Is the site diary really worth the five minutes a day?",
    answer:
      "Yes — the diary is the cheapest insurance you have. It's the source for your NVQ portfolio, the evidence in any pay or customer dispute, the input to your monthly apprentice review, and the basis for JIB grading evidence. Five minutes a day for four years is a few hundred hours; the value of the resulting record across the same period is enormous. Most experienced electricians will tell you the apprentices who kept good diaries are the ones who progressed fastest.",
  },
  {
    question: "What should actually go in the diary entry for a typical day?",
    answer:
      "Date, site address, hours worked (start, end, breaks), who you worked with, what circuits / accessories / boards you worked on, materials used, any variations to the scope, any incidents or near-misses, any customer conversations of substance, anything you learnt or were taught. Five to ten lines is enough for most days. The point is enough detail to reconstruct the day six months later.",
  },
  {
    question: "Do I have to fill in the off-the-job training log if my training provider doesn't ask for it?",
    answer:
      "Yes. The 20% off-the-job training requirement is a statutory feature of English apprenticeship standards — it applies regardless of whether a particular tutor is actively chasing the log. The Education and Skills Funding Agency audits training providers periodically; a log that shows zero hours over months is the kind of finding that triggers wider investigation. Keep the log current; the cost is minimal, the cost of not doing it is much higher.",
  },
  {
    question: "Who actually signs off the time sheet — me, the customer, the supervisor?",
    answer:
      "Standard practice is the apprentice fills the time sheet in (hours, dates, jobs) and the supervisor or employer countersigns weekly. On commercial fit-outs the principal contractor's site manager often also countersigns to confirm attendance on their site. Customer countersigning is rare for employed apprentices but common for self-employed work. The countersignature is what makes the time sheet evidentially strong.",
  },
  {
    question: "What if my employer doesn't have a formal time sheet system?",
    answer:
      "Keep your own. A weekly spreadsheet, an app, even a paper notebook works — date, start, end, breaks, location, supervisor name. If a dispute later arises you have something contemporaneous. Most apprenticeship standards expect time records to exist somewhere in the system — if your employer doesn't maintain them, your training provider will and you should at least be the source for the data they're recording. Don't rely on memory months after the fact.",
  },
  {
    question: "What happens to the diary at the end of the apprenticeship?",
    answer:
      "The diary itself usually stays with you — it's your personal professional record. Portfolio entries drawn from the diary are submitted to the training provider for the EPA. Time sheets stay with the employer for HMRC and JIB compliance reasons (typically retained for at least six years). After qualifying, many electricians keep a similar daily record going under different names — service-call log, jobs-completed register — because the discipline of recording continues to pay off long after the apprenticeship ends.",
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 5"
            title="Site diary and time sheets — the apprentice's paper trail"
            description="Daily diary, weekly time sheet, NVQ portfolio, off-the-job training log, monthly review forms. What each record is for, who reads it, and what happens if it is blank."
            tone="emerald"
          />

          <TLDR
            points={[
              "The apprentice's paper trail is a chain — daily site diary, weekly time sheet, NVQ portfolio entries, off-the-job training log, monthly review forms, JIB grading entries, H&S sign-on records. Each record has a different purpose and a different audience.",
              "Time sheet = pay. Diary = evidence in dispute. NVQ portfolio = end-point assessment. Off-the-job log = apprenticeship standards compliance (20% minimum). Monthly review = progress audit. JIB grading = pay grade progression.",
              "Records are only as strong as their contemporaneous nature. Friday catch-up loses the detail; daily entries five minutes at end of shift retain it. Apps (Tradify, Powered Now, Procore mobile) lower the barrier — paper still works if maintained.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO2 / AC 2.2 (purpose of workplace information). Not directly mapped to a single 210 AC. Maintaining apprentice records is a Level 2 personal-discipline skill that runs across the entire qualification.",
              "Identify the records that make up the apprentice's daily and weekly paper trail — site diary, time sheet, NVQ portfolio entries, off-the-job training log, monthly review forms, JIB grading entries, H&S sign-on records.",
              "State the specific purpose of each record — pay, evidence, portfolio, apprenticeship standards compliance, progress audit, pay grade progression — and why missing any one of them is a problem.",
              "Identify the apprenticeship standards requirement (gov.uk) for at least 20% off-the-job training over the duration of the apprenticeship, and the apprentice's responsibility to maintain the log.",
              "Recognise the link between a contemporaneous site diary and the NVQ portfolio entries that feed into the End-Point Assessment.",
              "Apply the rule of contemporaneous recording — five minutes at the end of each shift, not Friday catch-up — and the evidential strength that comes with it.",
              "Recognise the role of digital tools (Tradify, Powered Now, Procore mobile) in lowering the friction of record-keeping while not replacing the underlying discipline.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The chain of records</ContentEyebrow>

          <ConceptBlock
            title="Different documents, different audiences, one apprentice"
            plainEnglish="The apprentice's records are a chain that runs through the day, the week, the month, the year and the qualification. Each link in the chain is a different document, with a different audience, and a different consequence if it's missing. The discipline is keeping all of them current — the cost of letting any one slip is felt later, often when it's hard to fix retrospectively."
            onSite="Apprentices who treat records as administrative noise tend to find out the cost three or four years in — when an EPA portfolio is thin, a JIB grade application is rejected, an off-the-job audit fails, or a pay dispute can't be substantiated. By contrast, apprentices who build the recording habit early carry it through their whole career and are visibly more professional than peers who don't."
          >
            <p>
              The full chain you'll be expected to maintain:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Daily site diary</strong> — your contemporaneous record of what you did,
                who you worked with, what materials, what events. Source for the portfolio.
              </li>
              <li>
                <strong>Weekly time sheet</strong> — hours worked, signed by you and
                countersigned by the supervisor or employer. The basis of pay.
              </li>
              <li>
                <strong>NVQ portfolio entries</strong> — written-up evidence against specific
                qualification units. The evidence base for the End-Point Assessment.
              </li>
              <li>
                <strong>Off-the-job training log</strong> — record of all training activity
                outside normal productive work. Apprenticeship standards audit basis.
              </li>
              <li>
                <strong>Monthly apprentice review forms</strong> — record of the three-way
                meeting (you + employer + tutor / assessor). Progress audit.
              </li>
              <li>
                <strong>JIB grading entries</strong> — evidence of competence and time served
                supporting JIB Apprentice Grading progression.
              </li>
              <li>
                <strong>H&amp;S sign-on records</strong> — RAMS sign-on, toolbox talk attendance,
                permit records. Often kept by the principal contractor but you should know
                they exist.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Each record's purpose — and what's at risk if it's missing"
            plainEnglish="The records aren't interchangeable — each does a job that no other does. Knowing what each is for makes it obvious why you can't skip any of them. Below is the same chain, this time read through the lens of 'what happens if you don't keep it'."
            onSite="The thing that connects all of these records is that they're hard to reconstruct from memory months later. Contemporaneous = strong evidence. Reconstructed = weak evidence. The five-minutes-a-day discipline is what keeps every record in the chain on the strong side of that line."
          >
            <div className="space-y-3">
              {/* Desktop table */}
              <div className="hidden sm:block overflow-hidden rounded-2xl border border-white/[0.08]">
                <table className="w-full text-[13px]">
                  <thead className="bg-white/[0.04] text-white/80 text-left">
                    <tr>
                      <th className="px-3 py-2 font-medium">Record</th>
                      <th className="px-3 py-2 font-medium">Purpose</th>
                      <th className="px-3 py-2 font-medium">Risk if missing</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/85">
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Time sheet</td>
                      <td className="px-3 py-2">Pay calculation</td>
                      <td className="px-3 py-2">Underpayment, pay dispute</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Site diary</td>
                      <td className="px-3 py-2">Detailed daily record</td>
                      <td className="px-3 py-2">Weak evidence in dispute, thin portfolio</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">NVQ portfolio</td>
                      <td className="px-3 py-2">EPA evidence</td>
                      <td className="px-3 py-2">Failed or delayed End-Point Assessment</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Off-the-job log</td>
                      <td className="px-3 py-2">Standards compliance (20%)</td>
                      <td className="px-3 py-2">Apprenticeship audit failure</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">Monthly review form</td>
                      <td className="px-3 py-2">Progress tracking</td>
                      <td className="px-3 py-2">Slippage missed, concerns unresolved</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">JIB grading</td>
                      <td className="px-3 py-2">Pay grade progression</td>
                      <td className="px-3 py-2">Stuck on lower grade longer</td>
                    </tr>
                    <tr className="border-t border-white/[0.06]">
                      <td className="px-3 py-2 font-medium">H&amp;S sign-on</td>
                      <td className="px-3 py-2">Briefing evidence</td>
                      <td className="px-3 py-2">No defence in incident investigation</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile card list */}
              <div className="sm:hidden space-y-2">
                {[
                  {
                    record: 'Time sheet',
                    purpose: 'Pay calculation',
                    risk: 'Underpayment, pay dispute',
                  },
                  {
                    record: 'Site diary',
                    purpose: 'Detailed daily record',
                    risk: 'Weak evidence in dispute, thin portfolio',
                  },
                  {
                    record: 'NVQ portfolio',
                    purpose: 'EPA evidence',
                    risk: 'Failed or delayed End-Point Assessment',
                  },
                  {
                    record: 'Off-the-job log',
                    purpose: 'Standards compliance (20%)',
                    risk: 'Apprenticeship audit failure',
                  },
                  {
                    record: 'Monthly review form',
                    purpose: 'Progress tracking',
                    risk: 'Slippage missed, concerns unresolved',
                  },
                  {
                    record: 'JIB grading',
                    purpose: 'Pay grade progression',
                    risk: 'Stuck on lower grade longer',
                  },
                  {
                    record: 'H&S sign-on',
                    purpose: 'Briefing evidence',
                    risk: 'No defence in incident investigation',
                  },
                ].map((row) => (
                  <div
                    key={row.record}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
                  >
                    <div className="text-[13px] font-semibold text-white">{row.record}</div>
                    <div className="mt-1 text-[12px] text-white/75">
                      Purpose: {row.purpose}
                    </div>
                    <div className="mt-0.5 text-[11.5px] text-orange-300/80">
                      If missing: {row.risk}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Daily site diary — five minutes at end of shift</ContentEyebrow>

          <ConceptBlock
            title="Contemporaneous, detailed, dated — the three properties of a useful diary"
            plainEnglish="A useful site diary has three properties — it's contemporaneous (written close to the event), detailed (enough to reconstruct the day months later), and dated (clear date and location on every entry). Miss any of those and the diary's evidential value drops sharply. The five-minutes-at-end-of-shift discipline is what keeps all three properties intact."
            onSite="The diary is your personal professional record — kept by you, owned by you, and (for employed apprentices) generally not the firm's property. The firm has its time sheet records, its job records, its quality records; the diary is yours. Many qualified electricians keep one going for years after the apprenticeship for the same reason — it's a working professional record."
          >
            <p>
              What a typical daily diary entry should include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Date and site address</strong> — non-negotiable on every entry.
              </li>
              <li>
                <strong>Hours</strong> — start, end, breaks. Cross-reference to the weekly time
                sheet.
              </li>
              <li>
                <strong>Personnel</strong> — who you worked with (supervisor, second-year, other
                trades), who briefed you on what.
              </li>
              <li>
                <strong>Tasks and circuits</strong> — what you actually did, in detail.
                &quot;Worked on lighting&quot; isn&apos;t enough; &quot;first-fixed lighting
                circuits L1, L2, L3 in upstairs bedrooms, terminated at the consumer unit&quot;
                is.
              </li>
              <li>
                <strong>Materials</strong> — what you used, in particular anything unusual or
                not on the original spec.
              </li>
              <li>
                <strong>Variations or scope changes</strong> — the customer asked for an
                additional socket; the supervisor authorised an extra circuit.
              </li>
              <li>
                <strong>Incidents and near-misses</strong> — anything that should be flagged,
                even if minor.
              </li>
              <li>
                <strong>Learning</strong> — what you learnt or were taught (this feeds into
                portfolio entries and off-the-job hours).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <ConceptBlock
            title="Writing diary entries that pass the 'six months later' test"
            plainEnglish="The test of a good diary entry is whether it would still be useful six months from now. Vague entries — 'worked on lighting' — fail the test. Specific entries — 'first-fixed lighting circuits L1 and L2 in plot 14, terminated at the dual-RCD board, 1.5 mm² T&E, supervised by Tom on AC final-fix sequence' — pass. The discipline is detail."
            onSite="A useful entry doesn't have to be long. Five to ten lines per day is plenty if every line carries information. The point is concrete detail — names, circuit numbers, materials, conversations — not flowery prose. Most experienced electricians can read their old diaries and reconstruct the day in seconds; that's the standard you're aiming for."
          >
            <p>
              The diary entry quality test &mdash; would it still be useful six months from now?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Are circuits, accessories and equipment named specifically (model number,
                circuit reference, location) rather than generically?
              </li>
              <li>
                Are the people you worked with named (supervisor, second-year, other trades)
                with their role?
              </li>
              <li>
                Are conversations of substance recorded (customer asked for additional socket,
                supervisor authorised variation, principal contractor flagged a hazard)?
              </li>
              <li>
                Are timings recorded for anything significant (start and end of overtime,
                isolation in / isolation out, induction time)?
              </li>
              <li>
                Are unusual events flagged (near-misses, customer disputes, equipment
                failures, deliveries delayed)?
              </li>
              <li>
                Is anything you learnt or were taught captured (this feeds straight into NVQ
                portfolio entries and off-the-job training hours)?
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Time sheet — the basis of pay</ContentEyebrow>

          <ConceptBlock
            title="Filled by you, countersigned by the supervisor or employer"
            plainEnglish="The time sheet is the document the firm uses to calculate your pay. Standard practice is that you complete it weekly (date, hours, location, jobs) and the supervisor or employer countersigns to confirm attendance. The countersignature is what makes the time sheet evidentially strong — it's a record produced by you and witnessed by someone with a different interest."
            onSite="Don't rely on the firm to maintain time records on your behalf. Even if your employer has a sophisticated system, keep your own copy of what you submit each week — a photo of the signed sheet, an export from the app, or your own spreadsheet. If a dispute later arises about hours or overtime, your own copy is the evidence."
          >
            <p>
              What a standard weekly time sheet captures:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Week ending date.
              </li>
              <li>
                Daily start time, end time and unpaid break duration.
              </li>
              <li>
                Site / job reference for each day.
              </li>
              <li>
                Overtime hours separately recorded (any time outside standard contracted hours).
              </li>
              <li>
                Travel time where the JIB rules or your contract treats this as paid.
              </li>
              <li>
                Lodging or expenses claims where applicable.
              </li>
              <li>
                Apprentice signature and supervisor / employer countersignature.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="NVQ portfolio entries — turning the diary into evidence"
            plainEnglish="The NVQ portfolio is the evidence base for the End-Point Assessment at the end of the apprenticeship. Each entry maps a piece of work you did to a specific learning outcome in the qualification framework. Portfolio entries are written up periodically (usually monthly) drawing on the daily diary as the source. A weak diary leads to a weak portfolio — there's no shortcut around it."
            onSite="The portfolio entry format varies by training provider but typically includes: date, site, the work done, the units / learning outcomes evidenced, the equipment / materials used, the supervisor's countersignature, and any photo / video / certificate evidence attached. Building portfolio entries up monthly is much easier than trying to write them at year three from memory."
          >
            <p>
              How a portfolio entry typically gets built:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Source from diary</strong> &mdash; identify the day(s) on which the
                relevant work happened. Pull the detail from the diary entries.
              </li>
              <li>
                <strong>Map to learning outcomes</strong> &mdash; identify which qualification
                units / ACs the work evidences. Most training providers supply a mapping
                template.
              </li>
              <li>
                <strong>Write the narrative</strong> &mdash; describe the work, your role, what
                you did, what you learnt. Specific and concrete.
              </li>
              <li>
                <strong>Attach evidence</strong> &mdash; photos of the completed work, copies
                of any certificates produced, supervisor or assessor sign-off.
              </li>
              <li>
                <strong>Submit for review</strong> &mdash; through the training
                provider&apos;s portal (OneFile, Smart Apprentices, similar). The assessor
                reviews and either accepts or asks for amendments.
              </li>
              <li>
                <strong>Repeat monthly</strong> &mdash; build the portfolio steadily across the
                full apprenticeship. Last-minute portfolio compilation in year three is
                visible to the EPA assessor and weakens the result.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Off-the-job training log — the 20% rule</ContentEyebrow>

          <ConceptBlock
            title="A statutory feature of English apprenticeships"
            plainEnglish="English apprenticeship standards require at least 20% of the apprenticeship to be off-the-job training. Off-the-job is broadly defined — day-release at college, online courses, structured study time, shadowing in unfamiliar work areas, attending exhibitions or trade events, manufacturer training. The apprentice is responsible for keeping the log; the training provider audits it and reports against it."
            onSite="The 20% requirement is calculated across the duration of the apprenticeship — not week by week. So a heavy site week with no off-the-job hours is fine if balanced by college days or study weeks elsewhere. But a months-long stretch with zero off-the-job hours will trigger a flag. The log captures everything that counts so the calculation is straightforward."
          >
            <p>
              What counts as off-the-job training:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Day-release at college</strong> — formal classroom and workshop time.
              </li>
              <li>
                <strong>Online learning</strong> — recorded courses, study modules, e-learning
                platforms.
              </li>
              <li>
                <strong>Structured study time</strong> — homework, revision, NVQ portfolio
                writing-up time.
              </li>
              <li>
                <strong>Shadowing</strong> — accompanying a more senior operative on a task
                outside your normal work area for learning purposes.
              </li>
              <li>
                <strong>Manufacturer training</strong> — Hager / Schneider / Wylex CPD courses,
                product launch events.
              </li>
              <li>
                <strong>Industry events</strong> — Elex, ELECSA / NICEIC events, JIB events.
              </li>
              <li>
                <strong>Mentoring and coaching</strong> — formal sessions with a tutor or
                assessor.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Apprenticeship Standards (gov.uk) — off-the-job training requirement"
            clause={
              <>
                English apprenticeship standards require at least 20% of the apprentice&apos;s
                contracted hours to be spent on off-the-job training across the duration of the
                apprenticeship. Off-the-job training is defined as &quot;learning that takes
                place outside the normal day-to-day working environment and leads towards the
                achievement of an apprenticeship&quot;. The apprentice and employer are jointly
                responsible for ensuring the requirement is met; the training provider is
                responsible for monitoring and reporting.
              </>
            }
            meaning={
              <>
                The 20% rule is funded under the apprenticeship levy and audited by the
                Education and Skills Funding Agency (ESFA). A log that shows substantial gaps
                triggers compliance action against the training provider, which feeds back to
                the employer and ultimately puts the apprenticeship at risk. As an apprentice
                your job is to keep the log current and to flag any month where off-the-job
                hours are clearly insufficient.
              </>
            }
            cite="Source: paraphrased from gov.uk apprenticeship standards funding rules. The current rules and definitions are maintained by the Department for Education and the Education and Skills Funding Agency."
          />

          <RegsCallout
            source="JIB Working Rules (jib.org.uk) — apprentice grading and time records"
            clause={
              <>
                The JIB (Joint Industry Board) Working Rules set the industry-standard grading,
                pay rates, overtime, travel time and lodging arrangements for the electrical
                contracting industry in England and Wales. The Apprentice Grading scheme tracks
                progression from year 1 through year 4 with grade-specific rates. Time sheets,
                portfolio evidence and JIB grading entries form the documentary basis for grade
                progression where the JIB rules apply.
              </>
            }
            meaning={
              <>
                Most reputable electrical contracting firms reference the JIB Working Rules in
                their apprentice contracts even where they aren&apos;t formal JIB members. The
                Apprentice Grading scheme is the industry-standard pay framework for
                apprentices. Keeping your records current is part of how you progress through
                the grades on time and at the right pay.
              </>
            }
            cite="Source: paraphrased from JIB Handbook and JIB Working Rules, available at jib.org.uk."
          />

          <RegsCallout
            source="Construction (Design and Management) Regulations 2015 — Reg 13(1)"
            clause={
              <>
                &quot;The principal contractor must — (a) plan, manage and monitor the
                construction phase and coordinate matters relating to health and safety during
                the construction phase to ensure that, so far as is reasonably practicable,
                construction work is carried out without risks to health or safety ...&quot;
              </>
            }
            meaning={
              <>
                CDM 2015 Reg 13(1) places the planning, management and monitoring duty on the
                principal contractor on notifiable construction sites. In practice this includes
                site sign-in / sign-out registers, attendance at toolbox talks, RAMS sign-on
                records and permit records. From the apprentice&apos;s perspective these PC
                records supplement and reinforce your own (diary, time sheet) and form a fuller,
                mutually corroborating record set.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 (SI 2015/51), Reg 13(1) — verbatim from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Digital tools and the format-vs-discipline distinction</ContentEyebrow>

          <ConceptBlock
            title="Apps lower the friction; the discipline still has to be yours"
            plainEnglish="Many firms now use mobile apps (Tradify, Powered Now, Procore mobile, Yunex, Trade Point Apprentice) to streamline records — diary entries, time sheets, photos, sign-ons. The apps lower the activation energy required to maintain records (you can fill in the diary on the phone in the moment) but they don't replace the underlying discipline. The format doesn't matter to the apprenticeship standards or the JIB; the discipline does."
            onSite="The advantage of digital tools is that they capture data automatically (timestamp, GPS location, photos with EXIF data) that's much harder to dispute than handwritten notes. The disadvantage is that they're easy to ignore — an unopened app is the same as a blank diary. Pick a system, stick with it, fill it in daily."
          >
            <p>
              Common digital tools used by UK electrical firms:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tradify</strong> — job management, time tracking, photo records.
              </li>
              <li>
                <strong>Powered Now</strong> — quotes, invoices, time tracking, simple diary.
              </li>
              <li>
                <strong>Procore mobile</strong> — full construction management; common on
                larger commercial fit-outs.
              </li>
              <li>
                <strong>Sypol / Alcumus</strong> — COSHH register, RAMS sign-on, training
                records.
              </li>
              <li>
                <strong>Training-provider portals</strong> — typically include a portfolio
                builder and off-the-job training log (e.g. OneFile, Smart Apprentices).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Leaving the diary blank because 'I'll catch up Friday'"
            whatHappens={
              <>
                Apprentice has a busy week on a domestic rewire. Each evening they tell themselves
                they&apos;ll fill in the diary on Friday afternoon when things calm down. By
                Friday the days have blurred together &mdash; they remember roughly what they
                did, but not which specific circuits, not the materials they used, not the
                conversation with the customer about the extra socket, not the near-miss with
                the loose joist. The Friday entry becomes a vague summary that&apos;s useless
                for the portfolio and weak as evidence in any later dispute. Repeated weekly,
                this produces a thin diary across the entire apprenticeship and a thin portfolio
                at the EPA.
              </>
            }
            doInstead={
              <>
                Five minutes at the end of every shift &mdash; in the van before you drive home,
                in the kitchen with a cup of tea on arrival, on the phone in the moment.
                Whatever the format (paper notebook, app, voice memo transcribed later), the
                discipline is daily, not weekly. The detail you capture in those five minutes is
                what makes the diary worth having; the detail you lose by Friday is what makes
                the catch-up version useless. By year three the daily habit is automatic.
              </>
            }
          />

          <Scenario
            title="Six months after a disputed Saturday — what saves you?"
            situation={
              <>
                Six months ago you worked an unscheduled Saturday on an emergency call-out. The
                supervisor asked you to come in, you went, you worked the day, you went home.
                Time sheet was submitted normally and pay arrived as expected. Now there&apos;s
                an HR review at the firm and a question has been raised about overtime
                authorisation that day. The supervisor who asked you in has since left the firm
                and is denying he ever authorised it. The firm is suggesting your overtime that
                day was unauthorised and may need to be clawed back.
              </>
            }
            whatToDo={
              <>
                Three pieces of contemporaneous evidence save you. First: your daily site diary
                entry for that Saturday &mdash; date, address, hours, supervisor name, what you
                did, who else was there. Second: the weekly time sheet for that week with
                Saturday hours recorded and the supervisor&apos;s countersignature on the sheet.
                Third: any digital trail (text message from the supervisor asking you in,
                WhatsApp confirmation, call log on your phone, app entry from the firm&apos;s
                job system). Combine the three and the dispute resolves quickly &mdash; the
                evidence is contemporaneous, witnessed, and corroborated across multiple
                sources. Without them, you&apos;re relying on memory against the firm&apos;s
                position. The HR review is exactly the situation the records exist for. Submit
                them in writing through the firm&apos;s grievance procedure.
              </>
            }
            whyItMatters={
              <>
                Pay disputes after the fact are one of the harder situations an apprentice can
                end up in. The Employment Rights Act 1996 protects you from detriment for
                raising the issue, but you still need evidence of what actually happened. The
                site diary, the countersigned time sheet and the digital trail are the
                evidence. Apprentices who keep them current are protected; apprentices who
                don&apos;t end up arguing from memory and losing.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "The apprentice's paper trail is a chain of records — daily site diary, weekly time sheet, NVQ portfolio entries, off-the-job training log, monthly review forms, JIB grading entries, H&S sign-on records.",
              "Each record has a different purpose. Time sheet = pay. Diary = evidence in dispute and source for portfolio. NVQ portfolio = end-point assessment. Off-the-job log = apprenticeship standards compliance.",
              "Apprenticeship standards (gov.uk) require at least 20% off-the-job training across the duration of the apprenticeship. The log is the apprentice's responsibility; gaps trigger ESFA audit findings.",
              "The diary's evidential value depends on it being contemporaneous (written close to the event), detailed (enough to reconstruct the day months later) and dated. Friday catch-up loses all three properties.",
              "The time sheet's evidential value depends on it being countersigned by the supervisor or employer. Keep your own copy of every submitted time sheet — a photo, an export, your own spreadsheet.",
              "Monthly apprentice review meetings are the formal three-way mechanism (apprentice + employer + tutor) for tracking progress against apprenticeship standards. Treat them as formal, not casual.",
              "Digital tools (Tradify, Powered Now, Procore mobile) lower the friction of recording but don't replace the discipline. The format doesn't matter to the standards or the JIB; the daily habit does.",
              "Five minutes at the end of every shift is the discipline. By year three it's automatic. Apprentices who build the habit early carry it through their whole career; apprentices who don't argue from memory and lose.",
            ]}
          />

          <Quiz
            title="Site diary and time sheets — knowledge check"
            questions={quizQuestions}
          />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section3/3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.4 Manufacturer instructions
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section4/4-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.1 Customer information
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
