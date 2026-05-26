/**
 * Module 1 · Section 6 · Subsection 3 — RIDDOR: what must be reported.
 *
 * Unit 201 LO2 alignment:
 *   - AC 2.4: know the legal requirements for reporting accidents and
 *     dangerous occurrences in the workplace.
 *
 * Pedagogy:
 *   - Anatomy of RIDDOR 2013 — duties, who reports, what counts.
 *   - The four buckets: deaths, specified injuries (Sched 1), over-7-day
 *     injuries, dangerous occurrences (Sched 2).
 *   - The clocks: 10 days for most, 15 days for over-7-day, immediate for
 *     death.
 *   - The accident book — internal record vs HSE notification.
 *   - F2508 form, online RIDDOR portal, telephone 0345 300 9923 for fatals.
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
  'RIDDOR — what must be reported | Level 2 Module 1.6.3 | Elec-Mate';
const DESCRIPTION =
  'The legal duty to report serious accidents and dangerous occurrences to the HSE — the four reportable buckets, the clocks, the F2508 form, and what happens if you’re late.';

/* ── Inline check questions (wired into stats/streaks) ──────────────── */

const checks = [
  {
    id: 'riddor-7-day-check',
    question:
      'A bricklayer slips on Tuesday. He’s off work the rest of that week and the following Monday. Does that hit the RIDDOR over-7-day threshold?',
    options: [
      'Switches faster, has no mechanical wear, but can only switch DC loads (for NPN/PNP types)',
      'High-frequency voltage pulses from a VSD inducing current through the motor bearings',
      'The fracture may be compressing or damaging nerves or blood vessels — this is an urgent sign',
      'Yes — anything over 7 consecutive days off normal duties (excluding the day of the accident)',
    ],
    correctIndex: 3,
    explanation:
      'Over-7-day means more than 7 consecutive days unable to do their normal work, NOT counting the day of the accident itself. Tuesday (excluded) + Wed–Mon = 6 days. Doesn’t hit RIDDOR yet. If he’s still off on the following Tuesday, that’s 7 days — still not over. He needs to be off into the day AFTER, then it’s reportable. Three-day injuries went out in 2012.',
  },
  {
    id: 'riddor-who-reports-check',
    question:
      'You witness a serious accident on site. Who is legally required to make the RIDDOR report?',
    options: [
      'Review existing documentation such as site plans, previous risk assessments and incident reports',
      'All parties who sign accept responsibility for their respective roles',
      'Study for 25 minutes, take a 5-minute break, repeat four times, then take a longer 15-30 minute break',
      'The "responsible person" — usually the employer, or the person in control of the premises',
    ],
    correctIndex: 3,
    explanation:
      'RIDDOR puts the duty on the "responsible person" — for an employee, that’s their employer; for self-employed working on someone else’s premises, the person in control of those premises; for the self-employed at their own gaff, themselves. Witnesses report it INTERNALLY (accident book, supervisor) — the employer does the legal RIDDOR notification.',
  },
  {
    id: 'riddor-deadline-check',
    question:
      'A worker breaks their wrist falling from a stepladder — definitely a specified injury. What’s the legal deadline to notify the HSE?',
    options: [
      'Gnaw marks and stripped insulation',
      'Within 10 days of the accident',
      '500W per m² or similar rules of thumb',
      'Circuit will not function as intended',
    ],
    correctIndex: 1,
    explanation:
      'For specified injuries (Schedule 1), notification is "without delay" and the report has to be in within 10 days. Over-7-day injuries get 15 days. Deaths must be reported by quickest practical means — usually phone — and confirmed in writing within 10 days. Late notification is itself a separate breach.',
  },
];

/* ── End-of-page Quiz (wires into stats/streaks) ─────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What does RIDDOR stand for?',
    options: [
      'Regulations for Industrial Death, Disease and Operating Risks',
      'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations',
      'Recording of Incidents, Diseases, Dangers and Outcome Reports',
      'Reporting of Industrial Damage and Operating Risks',
    ],
    correctAnswer: 1,
    explanation:
      'RIDDOR 2013 — Reporting of Injuries, Diseases and Dangerous Occurrences Regulations. UK statutory instrument, made under HASAWA, defines what types of incidents must be reported to the HSE.',
  },
  {
    id: 2,
    question: 'Who has the legal duty to make a RIDDOR report?',
    options: [
      'To ensure fire extinguishers, hoses, and equipment remain visible and accessible',
      'Claiming to have a growth mindset without genuinely embracing effort, struggle, and feedback',
      'The "responsible person" — typically the employer, self-employed person, or person in control of the premises',
      'Regular inspections, staged testing, compliance checks, and documented reviews',
    ],
    correctAnswer: 2,
    explanation:
      'The "responsible person" definition shifts depending on context — but it’s never the witness or the casualty themselves. Apprentices flag the incident INTERNALLY, the employer makes the legal notification.',
  },
  {
    id: 3,
    question: 'Which of the following is a Specified Injury under RIDDOR Schedule 1?',
    options: [
      'Icn = max interrupt (may damage), Ics = max without loss of performance',
      'V × I (the product of RMS voltage and current)',
      'The smallest change in voltage it can detect and display is 0.1 V',
      'A bone fracture (other than to fingers, thumbs and toes)',
    ],
    correctAnswer: 3,
    explanation:
      'Schedule 1 specified injuries include bone fractures (other than fingers/thumbs/toes), amputations, sight loss (temporary or permanent), serious burns, scalpings, loss of consciousness from head injury or asphyxia, crush injuries leading to internal organ damage, and 24-hour hospital admission for serious injuries.',
  },
  {
    id: 4,
    question:
      'An apprentice is off work for 9 consecutive days after a workplace injury. What category of RIDDOR report applies?',
    options: [
      'Over-7-day injury',
      'Specified injury',
      'Dangerous occurrence',
      'No report needed',
    ],
    correctAnswer: 0,
    explanation:
      'Over-7-day means more than 7 consecutive days (excluding the day of the accident) unable to perform their normal work. Reportable within 15 days. The old "over-3-day" threshold was replaced in 2012.',
  },
  {
    id: 5,
    question: 'Which of these is a Dangerous Occurrence under RIDDOR Schedule 2?',
    options: [
      'Simpler wiring using open/close signals without position feedback',
      'An overhead crane collapses, even though nobody is hurt',
      'Responding to changing technology and market conditions',
      'To provide additional connection points for sensors and actuators',
    ],
    correctAnswer: 1,
    explanation:
      'Dangerous occurrences are near-miss events with serious harm potential — collapse of lifting gear, electrical short causing fire/explosion, unintended collapse of scaffold over 5 m, accidental release of biological agents, etc. Reportable even when nobody is injured.',
  },
  {
    id: 6,
    question:
      'A worker is killed in a workplace accident. What is the legal reporting requirement?',
    options: [
      'Resistance at mid-point approximately equal to end-to-end values',
      'To provide a safe working environment, so far as is reasonably practicable',
      'Notify the HSE by quickest practical means (phone), confirmed in writing within 10 days',
      'Conservation requirements, structural limitations, access restrictions, and specialist techniques',
    ],
    correctAnswer: 2,
    explanation:
      'Fatalities must be reported by the quickest practical means — usually the HSE Incident Contact Centre on 0345 300 9923 — followed by an F2508 form within 10 days. Out-of-hours, the same number routes to a duty officer for a fatal incident.',
  },
  {
    id: 7,
    question:
      'You discover a worker fell ill 8 days ago and they’ve only just told you they were off normal duties for 9 days. The original incident was 17 days ago. What now?',
    options: [
      'Coordinating between employer, college, and apprentice to ensure learning progresses',
      'Test location, values, device ratings, and compliance status',
      'Use non-damaging, removable marking methods and seek conservation advice',
      'Submit the over-7-day RIDDOR report now and document why notification was late',
    ],
    correctAnswer: 3,
    explanation:
      'Late notifications still happen and are still better than no notification. Submit immediately. The HSE prefers a late report with an honest explanation over a missing one — but late notification IS a breach in itself, and persistent lateness can trigger an inspection.',
  },
  {
    id: 8,
    question:
      'What is the difference between the company accident book and a RIDDOR report?',
    options: [
      'The accident book is internal (every injury, near-miss, first-aid event); RIDDOR is the legal external report to the HSE for serious incidents only',
      'Identify hazards, decide who might be harmed, evaluate risks, record findings, implement controls, plan monitoring, provide information/training, review assessment',
      'Incomplete scaffolds must not be used and must be marked with appropriate warning signs to prevent inadvertent use',
      'Withdraw the harness from service as it has exceeded the 6-month formal inspection interval, obtain a currently inspected harness, and report the overdue inspection',
    ],
    correctAnswer: 0,
    explanation:
      'Accident book = internal record of EVERY injury / near-miss / first-aid event, kept under the Social Security (Claims and Payments) Regulations and used for internal trend-spotting and any future insurance/Industrial Injuries claims. RIDDOR = legal duty to notify the HSE of SERIOUS incidents only. Both must happen — they don’t replace each other.',
  },
];

/* ── FAQs (apprentice voice) ─────────────────────────────────────────── */

const faqs = [
  {
    question: 'I broke my finger at work. Is that RIDDOR?',
    answer:
      'Schedule 1 specified injuries cover bone fractures OTHER THAN to fingers, thumbs and toes. So a broken finger by itself isn’t a specified injury. BUT — if you’re off normal duties for more than 7 consecutive days because of it, you become an over-7-day injury and that IS RIDDOR. So a broken finger you can keep working with = no RIDDOR; broken finger that puts you out for 8 days = RIDDOR. The accident book entry happens either way.',
  },
  {
    question: 'Why does the HSE care about near-misses (dangerous occurrences)?',
    answer:
      'Because near-misses are leading indicators. For every fatality there are typically thousands of near-misses with the same root cause. Reporting them lets the HSE spot patterns — a rash of crane collapses, a faulty model of switchgear, an industry-wide bad practice — and act before the next near-miss becomes a death. Schedule 2 lists 27 specific dangerous occurrences that must be reported.',
  },
  {
    question: 'What’s the F2508 form?',
    answer:
      'The legacy paper form — F2508 for injuries, F2508A for diseases. Mostly replaced now by the HSE’s online RIDDOR portal, which generates an F2508 report when you submit. The form ID still gets used as shorthand for "I’m doing the RIDDOR notification". Fatals can also go by phone first.',
  },
  {
    question: 'What happens if the company doesn’t report when it should?',
    answer:
      'Late or missing RIDDOR reports are themselves a breach of HASAWA, prosecutable in their own right. The HSE looks at reporting history when deciding whether to escalate after a serious incident — a clean reporting record helps; a pattern of "we forgot" gets the company put on the high-priority inspection list. Persistent failure can trigger an Improvement or Prohibition Notice and ultimately court.',
  },
  {
    question: 'Are diseases reportable?',
    answer:
      'Yes — Part 7 of RIDDOR covers occupational diseases. For electricians, the relevant ones include carpal tunnel syndrome (from heavy hand-tool use), HAVS (vibration white finger from prolonged power-tool use), occupational dermatitis (from solvents, cement dust, certain insulation), and severe upper-limb cramp / tendinitis. Diagnosed in writing by a doctor + linked to work = reportable.',
  },
  {
    question: 'Do I report when an apprentice is the casualty?',
    answer:
      'Same rules — apprentices count as employees for RIDDOR. Trainees on work experience also count, even when unpaid. Volunteers can count too depending on the arrangement. Self-employed sub-contractors are trickier but generally count as their own "responsible person" if they’re injured on someone else’s site.',
  },
];

export default function Sub3() {
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 1 · Section 6 · Subsection 3"
            title="RIDDOR — what must be reported"
            description="The legal duty to report serious accidents to the HSE. The four reportable buckets, the clocks, who reports, the F2508 form, and what happens if you’re late."
            tone="emerald"
          />

          <TLDR
            points={[
              "RIDDOR 2013 = the law that says certain accidents at work must be reported to the HSE — not just written in the accident book.",
              "Four buckets: Deaths, Specified Injuries (Sched 1), Over-7-day injuries, and Dangerous Occurrences (Sched 2 near-misses with serious potential).",
              "The clocks: deaths phoned through immediately; specified injuries reported within 10 days; over-7-day injuries within 15 days. Late = a separate breach.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Name what RIDDOR stands for and which Act it sits under.",
              "Identify which of the four reportable categories an incident falls into.",
              "Apply the correct reporting clock (immediately / 10 days / 15 days).",
              "Tell the difference between the accident book (internal) and a RIDDOR notification (external to HSE).",
              "Recognise common Schedule 1 specified injuries and Schedule 2 dangerous occurrences.",
              'Explain who the "responsible person" is for an apprentice, an employee, a sub-contractor, and a self-employed worker.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What it is and where it sits</ContentEyebrow>

          <ConceptBlock title="RIDDOR is a regulation made under HASAWA — not a separate law">
            <p>
              The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013
              are a statutory instrument under HASAWA. They set out a legal duty on the
              "responsible person" to notify the HSE — or in some sectors the local authority
              — when certain serious workplace incidents happen.
            </p>
            <p>
              The point isn’t paperwork. It’s pattern-spotting. The HSE uses RIDDOR data to
              direct inspections, publish industry guidance, push enforcement against persistent
              offenders, and decide where to focus resources. A scaffolding firm with three
              fall-from-height RIDDORs in a year is an inspection target. A switchgear range
              with multiple electrical-burn RIDDORs across the country is a manufacturer
              call-in.
            </p>
            <p>
              For you as an apprentice, RIDDOR almost never lands on your desk personally — but
              you will witness incidents, and you have to know what triggers a report so you
              can flag it to the supervisor while there’s still time on the clock.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="RIDDOR 2013 — Regulation 4(1)"
            clause="Where any person dies as a result of a work-related accident, the responsible person must follow the reporting procedure."
            meaning={
              <>
                Reg 4 starts with the worst case and walks down. Death = phone the HSE Incident
                Contact Centre at the earliest practical moment (0345 300 9923 in hours, same
                number out-of-hours routes to a duty officer), confirm in writing on F2508
                within 10 days. Reg 5 covers specified injuries, Reg 6 over-7-day, Reg 7
                dangerous occurrences, Reg 8 occupational diseases, Reg 9 gas-related.
              </>
            }
            cite="Reference: RIDDOR 2013 SI 1471, Regulations 4–9."
          />

          <SectionRule />

          <ContentEyebrow>The four reportable buckets</ContentEyebrow>

          <ConceptBlock
            title="Bucket 1 — Deaths from work-related accidents"
            plainEnglish="Anyone (worker, contractor, member of the public) killed by a workplace accident — fatal at the time, or where the injury later causes death within a year."
          >
            <p>
              This bucket also includes deaths caused by acts of physical violence at work, and
              the death of any self-employed person killed working on someone else’s premises.
              Reporting is by quickest practical means — phone — followed by F2508 within 10
              days.
            </p>
            <p>
              <strong>HSE Incident Contact Centre:</strong> 0345 300 9923 (Mon–Fri 8.30–17.00).
              Out-of-hours fatals route to a duty officer via the same number.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Bucket 2 — Specified Injuries (Schedule 1)"
            plainEnglish="A defined list of serious injuries. Not minor cuts, not bruises — proper damage."
          >
            <p>
              Schedule 1 of RIDDOR 2013 lists eight categories of specified injury. The big
              ones for electrical work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Bone fractures</strong> other than to fingers, thumbs and toes.
              </li>
              <li>
                <strong>Amputation</strong> of an arm, hand, finger, thumb, leg, foot or toe.
              </li>
              <li>
                <strong>Permanent loss of sight</strong> or reduction of sight, or temporary
                blindness from an arc flash.
              </li>
              <li>
                <strong>Crush injuries</strong> to the head or torso causing damage to the
                brain or internal organs.
              </li>
              <li>
                <strong>Serious burns</strong> covering more than 10% of the body, or causing
                significant damage to the eyes, respiratory system or other vital organs.
              </li>
              <li>
                <strong>Scalpings</strong> (loss of skin from the scalp) requiring hospital
                treatment.
              </li>
              <li>
                <strong>Loss of consciousness</strong> caused by head injury or asphyxia
                (including from electric shock).
              </li>
              <li>
                Any other injury arising from work in an enclosed space leading to
                <strong>hypothermia, heat-induced illness</strong> or requiring resuscitation
                or admission to hospital for more than 24 hours.
              </li>
            </ul>
            <p>
              Specified injuries are reported "without delay" and the F2508 must be in within
              10 days.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Bucket 3 — Over-7-day injuries"
            plainEnglish="Worker is incapacitated for more than 7 consecutive days (excluding the day of the accident) — unable to perform their normal work."
            onSite="The clock starts the day AFTER the accident. So a Monday accident, off Tuesday through to the following Tuesday = 7 days off, NOT yet over-7-day. Off into Wednesday = 8 days = reportable."
          >
            <p>
              The "over-7-day" threshold replaced the old "over-3-day" rule in October 2012.
              "Incapacitated" means unable to do their normal range of duties — so an electrician on
              light alternative duties (filing paperwork instead of climbing ladders) is still
              counted as incapacitated for RIDDOR.
            </p>
            <p>
              Over-7-day injuries report on the F2508 within 15 days of the accident. The
              extra 5 days vs specified injuries is to give time for it to become clear the
              casualty isn’t coming back to normal work quickly.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Bucket 4 — Dangerous Occurrences (Schedule 2)"
            plainEnglish="Near-misses — incidents with the POTENTIAL to cause serious harm, even if nobody actually got hurt this time."
            onSite="The point of reporting near-misses is that the HSE can spot a pattern across the country. A switchgear that explodes in three different sites that week is a recall, not just three flukes."
          >
            <p>
              Schedule 2 lists 27 specific dangerous occurrences. The ones most relevant to
              electrical work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Electrical short or overload</strong> causing fire or explosion that
                stops plant for more than 24 hours OR has the potential to cause death.
              </li>
              <li>
                <strong>Collapse, overturning or failure of load-bearing parts of lifts or
                lifting equipment.</strong>
              </li>
              <li>
                <strong>Unintended collapse</strong> of any building or structure under
                construction (or part of one) involving a fall of more than 5 tonnes of
                material.
              </li>
              <li>
                <strong>Unintended explosion</strong> of pressure vessels.
              </li>
              <li>
                <strong>Accidental release of biological agents</strong> capable of causing
                severe human disease.
              </li>
              <li>
                <strong>Unintentional release of any substance</strong> liable to cause harm to
                the public.
              </li>
            </ul>
            <p>
              Dangerous occurrences are reportable WITHIN 10 DAYS. They report on the F2508
              same as specified injuries.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Who reports — the "responsible person"</ContentEyebrow>

          <ConceptBlock
            title="The responsible person isn’t always who you’d guess"
            plainEnglish={`RIDDOR doesn’t put the duty on the casualty, the witness or the first aider. It puts it on the "responsible person" — and that definition shifts depending on the work setup.`}
          >
            <p>For a typical UK electrical job:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Employee injured at their employer’s site:</strong> the EMPLOYER is the
                responsible person. The boss reports.
              </li>
              <li>
                <strong>Employee injured on a third party’s premises:</strong> still the
                EMPLOYER. The fact you were on a customer’s premises doesn’t shift the duty.
              </li>
              <li>
                <strong>Self-employed electrician working on someone else’s premises:</strong> the
                PERSON IN CONTROL of those premises is the responsible person. Usually the
                principal contractor or site owner.
              </li>
              <li>
                <strong>Self-employed electrician working on their own premises:</strong> THEMSELVES.
              </li>
              <li>
                <strong>Member of the public injured by a work activity:</strong> the EMPLOYER
                or person in control of the work activity.
              </li>
            </ul>
            <p>
              As an apprentice, you’re an employee — your employer is the responsible person,
              even when you’re on a customer’s site. Your job is to flag the incident
              internally fast enough that the boss can hit the legal clock.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How a report actually gets in</ContentEyebrow>

          <ConceptBlock
            title="The F2508 form and the online RIDDOR portal"
            plainEnglish="In practice, almost every RIDDOR report now goes via the HSE’s online portal. It walks the responsible person through the right questions and generates an F2508 in the background."
          >
            <p>The two routes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Online portal:</strong> hse.gov.uk/riddor → "Report an incident". Different
                form for each bucket (injury, dangerous occurrence, gas, disease). Generates
                an F2508 reference number on submission. This is the route to use for
                everything except fatals.
              </li>
              <li>
                <strong>Telephone for fatals:</strong> HSE Incident Contact Centre, 0345 300
                9923. Used to be the route for everything urgent — now mainly for fatals.
                Followed by the online F2508 within 10 days.
              </li>
            </ul>
            <p>
              The form needs: details of the responsible person, the casualty (where there is
              one), the location and time, what happened, what caused it, what the injury was,
              what the outcome was, and details of any witnesses. Keep notes from the day so
              this can be filled in accurately later.
            </p>
            <p>
              <strong>Keep a copy of the report for at least three years.</strong> Required by
              RIDDOR Reg 12.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="RIDDOR 2013 — Regulation 12 (records)"
            clause="The responsible person must keep a record of any reportable death, injury, occupational disease or dangerous occurrence which is required to be reported under these Regulations, for a period of at least three years from the date on which it was made."
            meaning={
              <>
                The HSE can ask to see RIDDOR records during an inspection — usually as part
                of investigating a later incident. Three years is the minimum, but most
                companies keep them indefinitely as part of the company H&S file. Keep your
                own personal copy of any incident you’re a witness or casualty for — useful
                if a civil claim arises later.
              </>
            }
            cite="Reference: RIDDOR 2013 SI 1471, Regulation 12."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Accident book vs RIDDOR — they’re not the same</ContentEyebrow>

          <ConceptBlock
            title="Two records, two different jobs"
            plainEnglish="Accident book = internal log of EVERY incident, no matter how small. RIDDOR = legal external notification to the HSE for SERIOUS incidents only. You do both."
          >
            <p>
              The company accident book (BI 510 form is the standard) is required by the Social
              Security (Claims and Payments) Regulations. It’s an internal record of every
              workplace accident — first-aid only events, near-misses, the lot. Used for
              internal trend-spotting, supervisor sign-off, and any later insurance or
              Industrial Injuries claim by the casualty.
            </p>
            <p>
              The RIDDOR report is a separate, EXTERNAL legal notification to the HSE. Only the
              four serious buckets (death / specified injury / over-7-day / dangerous
              occurrence) trigger one.
            </p>
            <p>
              <strong>Sequence:</strong> accident → first aid → accident book entry IMMEDIATELY
              → supervisor briefed → if it hits a RIDDOR bucket, employer files F2508 within
              the relevant window. The book entry happens for everything; the F2508 only for
              the serious stuff.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Reporting to RIDDOR after 11 days for an over-7-day injury — the late-notification trap"
            whatHappens={
              <>
                Apprentice falls off a stepladder Monday. Sprained wrist, off Tuesday and the
                rest of the week. Over the following weekend it’s clear he’s not going to be
                back in normal duties this week either. Now you’re into day 8, day 9, day 10
                of incapacity. By the time someone clocks "ah, this is RIDDOR territory" and
                starts the form, it’s already 11–12 days since the original accident. The
                15-day clock for over-7-day injuries doesn’t care that you only realised it was
                reportable last Friday — it started ticking on Tuesday. File late and you’re
                also breaching Reg 6.
              </>
            }
            doInstead={
              <>
                Treat any "off normal duties" injury as a candidate RIDDOR from day 1. The
                appointed person should diary a check at day 7 — if the casualty isn’t back to
                normal duties by then, prep the F2508 in case it tips over. If they recover
                early, you bin the prep — no harm done. If they don’t, the report goes in on
                day 8 not day 12.
              </>
            }
          />

          <Scenario
            title="Did that 4-day off-work injury hit RIDDOR? (Spoiler: no — but...)"
            situation={
              <>
                Your supervisor asks: "the labourer who tripped on the cable on Wednesday — he was
                off Thursday, Friday, didn’t work the weekend, came back Monday but on light
                duties only. Is that one a RIDDOR?"
              </>
            }
            whatToDo={
              <>
                Walk through the buckets. Death? No. Specified injury (Sched 1)? No — it was a
                bruise, no fracture, no unconsciousness. Over-7-day? Day of accident
                (Wednesday) excluded. Days off normal duties: Thu, Fri (didn’t work weekend so
                Sat/Sun don’t count — he wasn’t SCHEDULED to work them), Mon on light duties =
                still incapacitated for over-7-day purposes. So that’s 3 days incapacitated
                so far. Not yet over 7. Dangerous occurrence? No. <strong>Not RIDDOR yet.</strong>{' '}
                BUT: accident book entry is mandatory regardless. AND if the labourer is still
                on light duties through to next Wednesday/Thursday, he tips over the
                seven-day mark and IT BECOMES RIDDOR. Diary it. Check on day 7. The 15-day
                clock will already be running by then.
              </>
            }
            whyItMatters={
              <>
                The numbers seem fiddly until they bite you. The over-7-day rule is the most
                commonly under-reported RIDDOR category in the UK because supervisors think
                "the casualty is back at work, no big deal" without realising "back on light
                duties" still counts as incapacitated. When the HSE digs into a workplace later
                they will absolutely cross-check accident book entries against RIDDOR
                submissions and ask why the gap.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The personal angle</ContentEyebrow>

          <ConceptBlock title="What you do as an apprentice in the system">
            <p>
              You’re unlikely to be the person submitting the F2508. Your job in the RIDDOR
              chain is:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Witness an incident → tell the supervisor immediately.</strong> Don’t
                wait for end-of-day, don’t wait for the casualty to recover, don’t wait to "see
                if it gets worse". Every clock starts from the time of the incident.
              </li>
              <li>
                <strong>Make sure the accident book entry happens.</strong> If you’re the
                casualty, write it up yourself (BI 510 form, or the company digital
                equivalent). If you witnessed it, prompt the casualty / supervisor.
              </li>
              <li>
                <strong>Note details while they’re fresh.</strong> Time, location, what was
                being done, what was used, who was there, what state the equipment was in. A
                page in the back of your notebook beats relying on memory two weeks later.
              </li>
              <li>
                <strong>Cooperate with any investigation.</strong> HASAWA s.7 (covered in §1.1)
                obliges you to. Be honest, don’t embellish, don’t cover for anyone.
              </li>
              <li>
                <strong>Get your own copy of any RIDDOR report you’re named in.</strong> If a
                civil claim or workplace dispute happens later, it’s yours to refer back to.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "RIDDOR 2013 is a regulation under HASAWA — legal duty to report serious incidents to the HSE.",
              "Four buckets: deaths (immediate phone), specified injuries Sched 1 (10 days), over-7-day injuries (15 days), dangerous occurrences Sched 2 (10 days).",
              "Over-7-day = more than 7 consecutive days unable to do normal work, EXCLUDING the day of the accident. Light duties still counts as incapacitated.",
              'The "responsible person" reports — typically the employer for an employee, the person in control of premises for a self-employed contractor.',
              "Accident book = internal record of EVERYTHING. RIDDOR = external legal notification of SERIOUS stuff only. Both happen, neither replaces the other.",
              "Reports go in via the online portal at hse.gov.uk/riddor (generates an F2508). Fatals phone first — 0345 300 9923 — then F2508 within 10 days.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="RIDDOR knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                First aid for electrical injuries
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Accident investigation & lessons learned
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
