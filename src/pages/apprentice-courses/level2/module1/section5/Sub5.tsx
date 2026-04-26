/**
 * Module 1 · Section 5 · Subsection 5 — When safe isolation goes wrong
 *
 * Unit 201, LO3, AC 3.9 — apprentice has to be able to describe the
 * implications of NOT applying safe isolation: the failure modes, the
 * consequences, the legal liability, and the prevention strategies.
 *
 * Walks through the canonical failure modes from HSE prosecutions and
 * accident reports: backfeeds, the locked-off-but-live trap, common
 * procedural errors that show up in real prosecutions and near-misses.
 *
 * Cross-references: §5.1 (legal/penalty context), §5.2 (the procedure),
 * §5.3 (kit), §5.4 (multi-source scenarios), §1 (EAWR), §2 (shock
 * physiology). Final sub of section — leads into §6 (incidents).
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

const TITLE = 'When safe isolation goes wrong | Level 2 Module 1.5.5 | Elec-Mate';
const DESCRIPTION =
  'Backfeeds, locked-off-but-live, mis-labelled breakers, ‘two-minute jobs’ and the other ways safe isolation gets defeated. Real failure modes, real consequences, real prevention.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 's5-5-locked-off-but-live-check',
    question: 'A circuit is correctly switched off and locked off, but the conductor is still live. What is the most likely cause?',
    options: [
      'The padlock is faulty',
      'A second source (PV, UPS, generator, borrowed neutral) is feeding the conductor from somewhere else',
      'The lock-off device has failed',
      'The MCB is broken',
    ],
    correctIndex: 1,
    explanation:
      "‘Locked off but live’ almost always means there’s a SECOND supply path you didn’t isolate. PV inverter, UPS-fed essential ring, borrowed neutral from another circuit, generator backfeed, dual-incomer board with the other incomer still live. The lock-off worked perfectly — there was just more than one ‘main switch’ on the system.",
  },
  {
    id: 's5-5-near-miss-reporting-check',
    question: 'You discover a circuit you’d locked off was actually still live (PV backfeed). Nobody got hurt. What do you do?',
    options: [
      'Nothing — no harm done',
      'Report the near miss to your supervisor and via the company’s incident system, log it for learning',
      'Tell the customer only',
      'Mention it to your mate at the pub',
    ],
    correctIndex: 1,
    explanation:
      "Near misses are gold. Same root cause that gave you a near miss today kills someone next week if it’s not surfaced. Report it. Most firms have a near-miss reporting system; if yours doesn’t, write it down and email your supervisor. The HSE’s safety-management standards (HSG65) explicitly want near-miss reporting.",
  },
  {
    id: 's5-5-removing-someone-elses-lock-check',
    question: 'You arrive on Monday and find a lock-off and tag from a sparky who didn’t come back on Friday. The site needs the circuit back on. What’s the right process?',
    options: [
      'Cut the padlock off — you’re here, they’re not',
      "Don’t remove it. Contact the named person. If they genuinely cannot return, follow the formal lock removal process (usually requires manager + safety officer + recorded reason)",
      'Use a master key',
      'Wait a week',
    ],
    correctIndex: 1,
    explanation:
      "Personal lock-off is personal. The principle is: the only person who removes a padlock is the person who applied it. Where that genuinely cannot happen (illness, holiday, off-site), the formal removal process (usually two named people, a recorded reason, and confirmation that the work area is safe before re-energising) kicks in. NEVER cut a padlock off because it’s convenient.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'A common cause of "locked-off but still live" is:',
    options: [
      'The lock-off device failing',
      "A second source of supply (PV, generator, UPS, borrowed neutral) wasn’t identified at Step 1",
      'The padlock being too small',
      'The breaker being labelled',
    ],
    correctAnswer: 1,
    explanation:
      "The lock-off worked. The procedure failed at Step 1 (identify ALL sources). Almost every ‘locked-off but live’ incident in HSE reports comes back to a second supply that wasn’t recognised before isolation started.",
  },
  {
    id: 2,
    question: "Trusting the breaker label without proving dead is dangerous because:",
    options: [
      'Labels are usually written in pen',
      "Boards get re-arranged, spare ways re-used, labels mis-copied or never updated — the label may not match the actual circuit",
      'Labels are required to be removed by law',
      'Labels are only required on three-phase boards',
    ],
    correctAnswer: 1,
    explanation:
      "Labels are a clue, not a fact. Spare ways get re-used without updating the label. Boards get part-rewired. Labels are mis-copied from photocopies of older photocopies. Always cross-check by load-killing or circuit identifier, AND prove dead at the actual point of work.",
  },
  {
    id: 3,
    question: "Which of these is the riskiest moment for skipping safe isolation?",
    options: [
      'A planned CU change with a written method statement',
      "A ‘quick’ accessory swap that ‘only takes two minutes’",
      'A scheduled annual inspection',
      'A new-build first fix on a dead site',
    ],
    correctAnswer: 1,
    explanation:
      "Most fatal incidents happen on routine, ‘quick’ work — exactly because the procedure feels disproportionate to the job. The HSE’s analysis is consistent: it’s the £20 socket swap, the bulb change, the ‘quick look’ that kills people, not the planned major works.",
  },
  {
    id: 4,
    question: "You proved dead at Step 5 but skipped re-proving on the proving unit afterwards. What might have happened?",
    options: [
      "Nothing — if it read dead, it’s dead",
      "Your voltage indicator could have failed silently between proving and testing — your ‘dead’ reading might actually be a ‘can’t indicate anything’ reading",
      'You’ll get fined',
      'The MCB will trip',
    ],
    correctAnswer: 1,
    explanation:
      "The whole point of ‘prove – test – prove’ is to catch the case where the indicator works at the start, fails between proves, and so reads ‘dead’ on the circuit when the circuit is actually live. The second prove is the only way to know your reading was trustworthy.",
  },
  {
    id: 5,
    question: "Working live because ‘it’s only 230 V’ is:",
    options: [
      "Acceptable on small jobs",
      "An EAWR Reg 14 breach unless all three live-working tests are met (and ‘convenience’ is not one of them)",
      "Only OK in domestic work",
      "Allowed if you wear gloves",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 14 doesn’t scale with voltage. 230 V is where most UK fatalities happen. ‘Only 230’ is the sentence the HSE quotes back at duty-holders in court.",
  },
  {
    id: 6,
    question: "Sharing one padlock and one key between you and another sparky is:",
    options: [
      "Fine — saves on padlocks",
      "Wrong — each person needs their own padlock and key (multi-hasp if working on the same isolation)",
      "Allowed if you trust each other",
      "Required by company policy",
    ],
    correctAnswer: 1,
    explanation:
      "Personal control is the whole point. If you both work off one key, neither of you has guaranteed control over the isolation. Multi-hasp + one personal padlock per person = both keys must be removed before re-energisation.",
  },
  {
    id: 7,
    question: "The customer turned the main switch back on while you were eating lunch. What does that tell you about the isolation?",
    options: [
      "Nothing — customers can do what they want",
      "The isolation was inadequate — the device was either not locked off, or the lock-off was easily defeated, or there was no warning notice. All of those are procedural failures",
      "The customer broke the law",
      "It’s only a problem if you got hurt",
    ],
    correctAnswer: 1,
    explanation:
      "If a non-electrician can re-energise the circuit, the isolation wasn’t adequate. A properly applied personal lock + tag + warning notice should make it impossible (or very obviously wrong) for anyone uninvolved to re-energise. Customer ‘helpfully turning it back on’ is a textbook reason for proper lock-off.",
  },
  {
    id: 8,
    question: "After a near miss caused by skipped isolation, the most useful response is:",
    options: [
      "Forget about it",
      "Report it, investigate the root cause, share the lesson with the team — the same gap kills the next person if it isn’t closed",
      "Punish the person involved",
      "Only act if someone got hurt",
    ],
    correctAnswer: 1,
    explanation:
      "Near misses are pre-incidents. They reveal the same root causes that produce fatalities — except nobody died yet. Report, investigate, share, fix the gap. HSE HSG65 (Managing for health and safety) and the wider safety-culture literature are clear that near-miss reporting is one of the strongest predictors of low fatality rates.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "What if I pushed back on a corner-cut and the gaffer threatened my apprenticeship?",
    answer:
      "Two things to know. First: HASAWA s.7 puts a personal duty on YOU. ‘Following orders’ has never worked as a legal defence after an incident. Second: Section 44 of the Employment Rights Act 1996 protects workers from detriment (including dismissal, hours pulled, pay docked) for raising a genuine health and safety concern, or for refusing work that’s actually dangerous. Note dates, names, what was said. Escalate above the supervisor if needed — to a director, the principal contractor, the JIB or the union. The HSE also takes calls on its concerns line.",
  },
  {
    question: "How do I know if a near miss is worth reporting?",
    answer:
      "If something went wrong, or could have gone wrong, that involved electricity — report it. ‘Was it nothing?’ is for the investigator to decide, not for you on the day. Pattern-spotting only works when small events get logged. Most firms have an incident reporting form (paper or app); if not, an email to the supervisor that you keep a copy of is fine.",
  },
  {
    question: "What does the HSE actually do when they investigate an electrical incident?",
    answer:
      "They look at the company, the supervisor and the individual on the tools. They want: the safe isolation procedure (written), the test instrument records (calibration, last-prove), the RAMS for the job, the training records of the person involved, the permit-to-work (if any), and witness statements. Gaps in any of those become the prosecution case. Companies and individuals are usually charged together, not instead of each other.",
  },
  {
    question: "How long after a near miss should it be reported?",
    answer:
      "Same day. Memory degrades fast — colours of cables, the wording on labels, who said what. Write it down before you go home. If RIDDOR-reportable (covered in §6), the responsible person normally has to report within 10 days, but the HSE wants accurate detail and that needs same-day notes.",
  },
  {
    question: "Is there a single best ‘defensive’ habit I can build now to avoid all of this?",
    answer:
      "Yes. Treat every conductor as live until you have personally proved otherwise — at the actual point of work — using a GS38 indicator that you proved BEFORE and AFTER the test. That one mental rule, applied without exception, prevents almost every failure mode in this section. The rest is detail.",
  },
  {
    question: "What about ‘someone else just isolated it for me’ — can I trust their isolation?",
    answer:
      "Trust but verify. The other person’s isolation may be perfect, but YOUR liability under HASAWA s.7 doesn’t transfer just because they switched the breaker. Best practice: add YOUR padlock to their multi-hasp (or a hasp around their padlock), do your own prove – test – prove at the actual point of work, and treat that as the moment you’re sure. On permit-to-work sites this is formalised — you sign the permit accepting the isolation.",
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
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 1 · Section 5 · Subsection 5"
            title="When safe isolation goes wrong"
            description="The failure modes that show up over and over in HSE prosecutions: backfeeds, the locked-off-but-live trap, mis-labelled breakers, ‘quick look’ working, single-pole isolation of three-phase. Knowing them is half the defence."
            tone="emerald"
          />

          <TLDR
            points={[
              "‘Locked off but live’ almost always means there was a SECOND source nobody identified at Step 1 — PV, UPS, generator, borrowed neutral, dual incomer.",
              "‘Two-minute jobs’ kill more sparks than planned major works. The procedure doesn’t scale with how routine the task feels.",
              "Personal padlock, personal key. Sharing keys, removing other people’s padlocks, ‘the gaffer can re-energise if needed’ — all classic prosecution evidence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the canonical failure modes that cause ‘locked off but still live’ situations.",
              "Recognise the procedural errors that show up in HSE prosecutions: skipped proving, trusted labels, single-pole isolation, ‘quick look’ work.",
              "Explain why personal lock-off (your padlock, your key) is non-negotiable, and the formal process for removing someone else’s lock.",
              "Describe the legal and personal consequences of getting it wrong — for the apprentice, the supervisor, the company.",
              "Apply the near-miss reporting principle: same root cause that gave you a near miss today kills the next person if it isn’t surfaced.",
              "Build the ‘defensive habit’ — treat every conductor as live until personally proved dead at the point of work, with a proved indicator.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Backfeeds — the most common ‘locked-off but live’ cause</ContentEyebrow>

          <ConceptBlock
            title="The lock-off worked. The Step 1 identification didn’t."
            plainEnglish="If a circuit you locked off is still live, the failure was almost never the lock or the breaker — it was that a second supply was feeding the same conductor from somewhere else."
            onSite="Walk the supply chain on every unfamiliar site. Where does the power come from? Are there inverters, generators, UPS, batteries on the wall? Each one is a separate ‘main switch’ from your point of view."
          >
            <p>The classic backfeed paths:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                <strong>PV inverter</strong> feeding the AC bus while the panels see daylight.
                You isolated the DNO main switch — the inverter is still pushing.
              </li>
              <li>
                <strong>UPS-fed circuit</strong> staying live for the duration of the battery
                (5-30 minutes is common, sometimes hours). You took the DB off — the UPS is
                holding the essential bus up.
              </li>
              <li>
                <strong>Generator on auto-start.</strong> Mains failure (which is what your
                isolation looks like to the system) triggers the genset. Bus is back live a few
                seconds after you ‘isolated’.
              </li>
              <li>
                <strong>Borrowed neutral</strong> from another circuit. The neutral you proved
                dead L-N is actually carrying line voltage from the next ring downstairs.
                Catches you on N-E if you tested it; on the conductor if you didn’t.
              </li>
              <li>
                <strong>Dual-incomer board</strong> with the other incomer still live. You
                isolated incomer A, the bus tie is closed, incomer B is still feeding the
                board.
              </li>
              <li>
                <strong>EV chargers with V2G/V2H</strong> capability — increasingly common on
                fleet/commercial sites. The vehicle’s battery can push back into the AC bus.
              </li>
              <li>
                <strong>Capacitor banks</strong> (motor PFC, large industrial loads) — can
                hold a charge for tens of seconds after the supply is off, sometimes longer if
                discharge resistors have failed.
              </li>
            </ul>
            <p>
              The defensive habit: at Step 1 (identify), don’t just identify the device — identify
              every possible source of supply. Walk the install, read the schedule, ask the
              responsible person, look for warning labels at the CU (modern domestic PV installs
              get ‘DUAL SUPPLY’ stickers for exactly this reason).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG85 — Electricity at work: Safe working practices"
            clause="Where there is more than one source of supply to electrical equipment, all sources of supply should be isolated and proved to be dead before work commences. Reliance should not be placed on a single isolation when other sources of supply are present."
            meaning={
              <>
                Each source = its own isolation. ‘Single isolation when other sources are
                present’ is one of HSG85’s explicit warnings — it’s the most common contributing
                factor in ‘locked-off but live’ incidents the HSE investigates.
              </>
            }
            cite="Reference: HSE HSG85 (Edition 4) Chapter 4 — Safe working procedures"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Procedural errors that come up in court</ContentEyebrow>

          <ConceptBlock
            title="The mistakes the HSE keeps writing up in prosecution reports"
            plainEnglish="Read enough HSE incident reports and the same mistakes appear over and over. None of them are exotic. All of them are preventable by following the procedure as written."
          >
            <p>The greatest hits, in roughly the order they show up in fatal-incident analyses:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
              <li>
                <strong>Trusted the breaker label, didn’t prove dead.</strong> Label was wrong /
                outdated / re-used spare way. Conductor at the point of work was still live.
              </li>
              <li>
                <strong>Proved on the meter, then didn’t re-prove.</strong> Indicator failed
                silently between Step 4 and Step 6. ‘Dead’ reading was actually ‘can’t read
                anything’.
              </li>
              <li>
                <strong>Single-pole isolated a three-phase circuit.</strong> Switched off one
                phase, treated the contactor or bus as dead. Other two phases still live.
              </li>
              <li>
                <strong>Used a multimeter instead of a GS38 voltage indicator.</strong> Multimeter
                set to amps, or with leads in the wrong sockets, reads 0 V on a live conductor.
              </li>
              <li>
                <strong>Didn’t lock off (or shared a key).</strong> Customer / cleaner / other
                trade re-energised mid-job.
              </li>
              <li>
                <strong>Worked live ‘because it’s only 230 V’.</strong> EAWR Reg 14 breach. Often
                followed by a fatal hand-to-hand shock across the chest.
              </li>
              <li>
                <strong>Skipped N-E test on single-phase.</strong> Borrowed neutral hidden,
                conductor at line potential.
              </li>
              <li>
                <strong>Didn’t identify a second supply.</strong> PV, UPS, generator backfeed.
              </li>
            </ul>
            <p>
              No exotic failure mode in that list. Just the seven steps not followed. Every
              prosecution report ends the same way: ‘…had safe isolation been carried out
              correctly, the incident would not have occurred.’
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Working live because ‘it’s only 230 V’"
            whatHappens={
              <>
                The freezer’s full of stock and the customer doesn’t want it down for an hour.
                The job’s a faceplate change. The supervisor says ‘crack on, two-minute job, just
                be careful, it’s only 230 V’. You take the screws out live. Your screwdriver
                slips, bridges the line and earth terminals, and you take a hand-to-hand shock
                across the chest. You’re lucky — you get away with palpitations and a hospital
                visit. The HSE turns up the next morning.
              </>
            }
            doInstead={
              <>
                There’s no ‘only’ at 230 V. Hand-to-hand at 230 V is the textbook fibrillation
                path covered in §2.1. The customer’s freezer is not on the legal balance the way
                EAWR Reg 14 sets it up — convenience isn’t one of the three tests. Power down
                the relevant circuit for 10 minutes, do the work safely, the freezer will be
                fine. If you need to argue for it: ‘the law wants this dead, and I’m the one in
                court if it goes wrong.’
              </>
            }
          />

          <CommonMistake
            title="Trusting the breaker label without proving"
            whatHappens={
              <>
                CU labelled ‘RING — KITCHEN’. You want the kitchen ring off, you snap that
                breaker, see the kitchen sockets die on a plug-in tester, lock it off. Pull the
                back box out — get a shock. Turns out somebody re-used a spare way ten years ago
                to add a hob ignition supply, never updated the label, and the breaker labelled
                ‘kitchen ring’ also feeds a small JB above the units that you’ve just disturbed.
              </>
            }
            doInstead={
              <>
                Labels are starting points, not facts. Always prove dead at the actual point of
                work — every conductor, every combination — with a proved GS38 indicator. The
                label tells you which breaker to flip first; the proving unit + indicator tells
                you whether you got it right.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Personal control failures</ContentEyebrow>

          <ConceptBlock
            title="Sharing keys, removing other people’s locks, ‘gaffer can re-energise’"
            plainEnglish="Every variant on ‘someone else can take my padlock off’ defeats personal control. The whole point of personal lock-off is that ONLY the person who applied it can take it off."
            onSite="If your firm has a culture of ‘the supervisor keeps a master key, just in case’ — push back. Master keys defeat personal isolation by design. The only legitimate ‘someone else removed it’ is the formal removal process, which requires the work area to be confirmed safe BEFORE re-energisation."
          >
            <p>The rules, plainly:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Your padlock, your key.</strong> One key per person, kept on the person
                whose padlock it is. No shared rings. No keys in the meter cupboard.
              </li>
              <li>
                <strong>Multi-hasp for shared work.</strong> Two sparks on the same circuit?
                Multi-hasp on the lockout, one personal padlock per person. Circuit comes back
                live only when the LAST padlock is removed.
              </li>
              <li>
                <strong>Only the person who applied a padlock removes it.</strong> Not the
                supervisor. Not the gaffer. Not ‘a mate who has the same brand of key’.
              </li>
              <li>
                <strong>Formal lock removal process</strong> for genuine emergencies (the named
                person is unreachable AND the work needs to continue). Typically requires: a
                manager, a competent electrician to verify the work area is safe, written record
                of the reason, and notification of the original lock-applier. NEVER bypass this
                because it’s convenient.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG85 — Safe working practices on lock-off and key control"
            clause="Where personal isolation devices have been applied, only the person who applied them should remove them. Where this is genuinely not possible, a formal procedure should be in place to authorise removal, including verification that the equipment is safe to re-energise and notification of the person whose lock has been removed."
            meaning={
              <>
                The personal-lock principle is HSE’s official position, not just custom and
                practice. The formal removal procedure exists for genuine ‘person off sick on
                Monday and Friday’s lock is still on’ cases — not for ‘the customer wants it back
                on now’. If you find yourself wanting to cut a padlock off because it’s
                inconvenient, that’s the warning sign that you need to call the supervisor first.
              </>
            }
            cite="Reference: HSE HSG85 (Edition 4) Chapter 4 — Safe working procedures"
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The scenario you’ll meet</ContentEyebrow>

          <Scenario
            title="The customer turned the main switch back on while you were eating lunch"
            situation={
              <>
                You’re on a CU change in a small office. You isolated at the DNO main switch,
                but the lockout you had with you didn’t fit cleanly so you posted a paper sign on
                the CU door (‘DO NOT OPERATE’) and assumed the office manager would understand.
                Lunchtime. You walk to the van. The office manager comes back from a meeting,
                sees the door panel hanging loose, ‘helpfully’ snaps the main switch back on so
                the staff can use the kettle. Five minutes later you walk back in, open the CU
                door, and reach for a tail.
              </>
            }
            whatToDo={
              <>
                Right call: stop the moment something looks different from when you left.
                Re-prove dead at the point of work BEFORE any tool touches a conductor. If
                you’re standing in front of a CU you ‘know’ is dead but you’ve been off site for
                even five minutes — re-prove. Then deal with the cause: get a proper lockout
                that fits (ALL ways including the main switch should have a lockable means of
                isolation under BS 7671 537), apply your personal padlock, brief the office
                manager in person about what the sign means and that the circuit MUST stay off
                until you say otherwise.
              </>
            }
            whyItMatters={
              <>
                ‘Proved dead’ is a moment-in-time test. Every break in your physical presence
                (lunch, van trip, end of day, even a five-minute toilet) is a window where
                someone could re-energise. Either physically lock it off so they CAN’T (which is
                the law-compliant answer), or re-prove every time you come back to the work
                area. Both, ideally.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Consequences when it goes wrong</ContentEyebrow>

          <ConceptBlock
            title="What actually happens after an incident"
            plainEnglish="When the procedure fails and someone gets hurt, the response is well-rehearsed. There’s a predictable sequence: medical, RIDDOR, HSE investigation, prosecution, fines, prison, career end, civil claim, public record."
          >
            <p>The path after a serious electrical incident on a UK site:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-orange-400/70">
              <li>
                <strong>Immediate response:</strong> isolate (if safe), 999, first aid, preserve
                the scene. Don’t tidy up.
              </li>
              <li>
                <strong>RIDDOR notification:</strong> the responsible person notifies the HSE
                under the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations
                2013. Fatalities, specified injuries, &gt;7-day incapacities, and ‘dangerous
                occurrences’ all qualify.
              </li>
              <li>
                <strong>HSE investigation:</strong> inspector arrives, often within 24 hours for
                fatalities. They want the safe isolation procedure (written), test instrument
                records, RAMS, training records, the permit-to-work if any. Witness statements.
                Photos.
              </li>
              <li>
                <strong>Charging decision:</strong> HASAWA s.7 (employee duty), HASAWA s.2/s.3
                (employer duties), EAWR Reg 3 (named duty-holders), EAWR Reg 14 (live working).
                Companies AND individuals are usually charged.
              </li>
              <li>
                <strong>Court:</strong> magistrates (unlimited fine, 6 months) or Crown
                (unlimited fine, 2 years). If a death and gross negligence — manslaughter (life
                maximum). Sentencing Council guidelines tie fines to company turnover and harm
                level.
              </li>
              <li>
                <strong>Career impact:</strong> conviction stays on your DBS-equivalent record.
                JIB / ECS card revocation is common after serious convictions. End-of-trade for
                most.
              </li>
              <li>
                <strong>Civil claim:</strong> the injured person (or family) sues for damages.
                Insurance covers some of it, but not directors’ personal liability or criminal
                fines.
              </li>
            </ol>
            <p>
              And the bit nobody talks about: even if no charges follow, the incident sits in
              your head for the rest of your career. Sparks who’ve had a near miss describe it
              the same way years later — the moment, the smell, the silence. Worth ten extra
              seconds on the procedure.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Building the defence</ContentEyebrow>

          <ConceptBlock
            title="One mental rule that prevents almost every failure mode"
            plainEnglish="Treat every conductor as live until you have personally proved otherwise — at the actual point of work — using a GS38 indicator that you proved BEFORE and AFTER the test."
          >
            <p>
              That’s it. Read it back, slowly. Every word in that sentence is doing work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-emerald-400/70">
              <li>
                <strong>‘Treat every conductor as live’</strong> — not just the ones in the CU.
                Faceplates, JBs, terminals on accessories, neutrals, earths.
              </li>
              <li>
                <strong>‘Until you have personally proved’</strong> — not until someone TOLD
                you it’s dead. Personal control under HASAWA s.7.
              </li>
              <li>
                <strong>‘At the actual point of work’</strong> — not at the CU, not at the
                breaker. At the conductor your tools are about to touch.
              </li>
              <li>
                <strong>‘GS38 indicator’</strong> — not a multimeter, not a neon screwdriver.
                Two-pole, fixed leads, ≤4 mm tip, multiple indication modes.
              </li>
              <li>
                <strong>‘Proved BEFORE and AFTER’</strong> — the prove–test–prove sequence that
                catches a silent indicator failure.
              </li>
            </ul>
            <p>
              Apply that rule without exception and you’ve closed the door on basically every
              failure mode in this section. Add ‘identify all sources of supply at Step 1’ and
              you’ve closed the door on the rest. Everything else is detail and habit.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "‘Locked off but live’ is almost always Step 1 failure — a second source of supply (PV, UPS, generator, borrowed neutral, dual incomer) that wasn’t identified.",
              "Repeat-offender procedural errors: trusted label without proving, no re-prove on the proving unit, single-pole isolated three-phase, multimeter instead of VI, no lock-off, ‘only 230 V’.",
              "Personal padlock + personal key. No master keys, no shared keys, no removing someone else’s padlock without the formal process.",
              "Near misses are gold — same root cause that gave you a near miss today kills the next person if it isn’t reported and fixed.",
              "After-incident sequence is well-rehearsed: medical → RIDDOR → HSE investigation → prosecution of company AND individual → fines / prison / career end.",
              "One defensive rule: treat every conductor as live until YOU have personally proved otherwise, at the point of work, with a proved GS38 indicator. Apply without exception.",
            ]}
          />

          <Quiz title="When safe isolation goes wrong knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Safe isolation in different scenarios
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Types of workplace accidents
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
