/**
 * Module 1 · Section 6 · Subsection 4 — Accident investigation and lessons
 * learned.
 *
 * Unit 201 LO2 alignment:
 *   - AC 2.7: understand how accident investigation is used to identify
 *     root causes and prevent recurrence.
 *
 * Pedagogy:
 *   - Why we investigate at all (HSE HSG245 — to learn, not to blame).
 *   - The four stages: gather information → analyse → identify control
 *     measures → action plan.
 *   - Root cause vs immediate cause vs underlying cause.
 *   - 5 Whys as the apprentice-friendly root cause technique.
 *   - Bow-tie / Swiss cheese model — defence in depth.
 *   - Closing the loop: lessons learned, toolbox talks, RAMS updates.
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
  'Accident investigation and lessons learned | Level 2 Module 1.6.4 | Elec-Mate';
const DESCRIPTION =
  'Why incidents get investigated — root cause analysis, the 5 Whys, the difference between immediate and underlying causes, and how lessons learned actually change site behaviour.';

/* ── Inline check questions (wired into stats/streaks) ──────────────── */

const checks = [
  {
    id: 'investigation-purpose-check',
    question: 'What is the primary purpose of an accident investigation?',
    options: [
      'To identify who to blame and discipline',
      'To establish root cause and prevent it happening again',
      'To complete the insurance paperwork',
      'To satisfy the HSE inspector visiting next week',
    ],
    correctIndex: 1,
    explanation:
      'HSE HSG245 is explicit — the purpose of investigation is LEARNING, not blame. Blame-driven investigations push people to lie and hide near-misses, which destroys the data the company needs to actually improve. Find the cause, fix the system, share the lesson.',
  },
  {
    id: 'immediate-vs-root-check',
    question:
      'A spark gets a shock from a CU because the supply wasn’t locked off. What is the immediate cause vs the root cause?',
    options: [
      'Immediate cause = the shock; root cause = the spark’s carelessness',
      'Immediate cause = supply was live during work; root cause = no lock-off culture / no enforcement / no kit issued',
      'Immediate cause = the CU; root cause = the customer',
      'Immediate cause = bad luck; root cause = it was Friday',
    ],
    correctIndex: 1,
    explanation:
      'Immediate cause = what physically did the damage (live supply during work). Underlying cause = why it was live (no lock-off used). Root cause = WHY no lock-off — kit not issued, no enforcement, supervisor never checks, no consequence for skipping it. Fix the root cause and the immediate cause stops happening.',
  },
  {
    id: 'five-whys-check',
    question: 'When using the 5 Whys, when do you stop asking?',
    options: [
      'After exactly 5 questions, no more, no fewer',
      'When you reach a cause you can actually fix at a system level (not just blame an individual)',
      'When you reach the first reasonable answer',
      'When the casualty gets bored',
    ],
    correctIndex: 1,
    explanation:
      'The 5 in 5 Whys is a guideline — sometimes you need 3, sometimes 7. Stop when you reach a cause that points to a SYSTEM fix (process, training, kit, supervision) rather than just "Dave wasn’t paying attention". If your last answer is a person’s name, you haven’t finished — keep asking why that person was put in that position.',
  },
];

/* ── End-of-page Quiz (wires into stats/streaks) ─────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'According to HSE HSG245, the goal of accident investigation is:',
    options: [
      'Punishment of the responsible person',
      'Learning — identifying root cause and preventing recurrence',
      'Justifying compensation claims',
      'Proving the company was not at fault',
    ],
    correctAnswer: 1,
    explanation:
      'HSG245 is the HSE’s "Investigating accidents and incidents" guidance. The whole document frames investigation as a learning activity. Blame-driven investigations destroy the trust needed for honest near-miss reporting.',
  },
  {
    id: 2,
    question:
      'Which of the following is an example of an UNDERLYING cause of an accident?',
    options: [
      'Worker tripped on a trailing cable',
      'Worker fell and broke their wrist',
      'No site rule about cable management; supervisors don’t enforce; nowhere to coil cables off the floor',
      'It was raining outside',
    ],
    correctAnswer: 2,
    explanation:
      'Immediate cause = trip on cable. Underlying causes = the systemic conditions that allowed the trip hazard to exist — no rule, no enforcement, no provision. Fix those and trips stop. Just telling Dave to "watch where you’re going" doesn’t fix the system.',
  },
  {
    id: 3,
    question:
      'How many "whys" should you typically ask in a 5 Whys analysis?',
    options: [
      'Exactly 5, regardless of where it leads',
      'Until you reach a system-level cause that can be fixed',
      'As few as possible to close the case',
      'Until the casualty admits fault',
    ],
    correctAnswer: 1,
    explanation:
      '5 is a guideline. Stop when you reach a cause you can act on at a system level (process, training, kit, supervision). If your final answer is just a person’s name, you haven’t got there yet — ask why that person was in that position with that information and that kit.',
  },
  {
    id: 4,
    question: 'Which of these is the FIRST stage of a workplace accident investigation?',
    options: [
      'Decide on disciplinary action',
      'Gather information — facts, photos, statements, equipment state',
      'Submit the F2508 RIDDOR form',
      'Brief the rest of the workforce',
    ],
    correctAnswer: 1,
    explanation:
      'Stage 1 is information gathering. Photos before anything moves, witness statements while memory is fresh, equipment as found. Without good evidence the analysis is guesswork. RIDDOR, briefings and any actions come later — once you actually know what happened.',
  },
  {
    id: 5,
    question:
      'What is the "Swiss cheese" model of accident causation?',
    options: [
      'A bad sandwich',
      'A model showing that accidents happen when holes in multiple layers of defence (procedures, equipment, supervision, training) line up',
      'A tool for measuring fatigue',
      'A way of rating cheese quality at the canteen',
    ],
    correctAnswer: 1,
    explanation:
      'Reason’s Swiss cheese model. Each defence layer (RAMS, training, kit, supervision, individual judgement) has holes. Most days the holes don’t line up — the next layer catches it. Accidents happen when all the holes line up at once. Fix the layers, not just the one hole closest to the casualty.',
  },
  {
    id: 6,
    question:
      'After an investigation, the action plan identifies a need for new lock-off kit and revised site induction. Who owns the implementation?',
    options: [
      'The casualty',
      'The HSE inspector',
      'Named persons within the company, with target completion dates and follow-up checks',
      'Whoever happens to be in the office that day',
    ],
    correctAnswer: 2,
    explanation:
      'Action plans without named owners and dates are wish lists. Every action gets an owner (by name, not "the company"), a target date and a check-in date. Without these the plan rots. HSG245 is explicit on this.',
  },
  {
    id: 7,
    question:
      'You investigated a near-miss, identified the root cause, and the company implemented a fix. Six months later a similar near-miss happens. What does this tell you?',
    options: [
      'The investigation was a waste of time',
      'The fix didn’t address the actual root cause, OR the lesson hasn’t reached everyone yet',
      'Near-misses are unavoidable',
      'It’s the casualty’s fault again',
    ],
    correctAnswer: 1,
    explanation:
      'A repeat near-miss is a flag that either the original analysis missed the real root cause, or the fix didn’t propagate (toolbox talk skipped on the night shift, RAMS not updated for that crew, new starter induction missed it). Re-investigate. Lessons-learned only count if they reach everyone.',
  },
  {
    id: 8,
    question:
      'The HSE accident-causation iceberg suggests that for every fatal accident, there are roughly:',
    options: [
      'Just the fatal accident',
      'Several similar minor injuries',
      'Around 3,000 unsafe acts and conditions, hundreds of near-misses, and dozens of minor injuries',
      'One major and one minor injury',
    ],
    correctAnswer: 2,
    explanation:
      'The Heinrich / Bird ratio (roughly 1 : 30 : 300 : 3000 for fatal : major : minor : near-miss / unsafe act) is the foundation of why the HSE pushes near-miss reporting so hard. Every fatality sits on top of a much larger pyramid of warnings that were missed. Catch the warnings, the fatality never happens.',
  },
];

/* ── FAQs (apprentice voice) ─────────────────────────────────────────── */

const faqs = [
  {
    question: 'Doesn’t investigation just mean someone gets the blame?',
    answer:
      'Bad investigation does. Good investigation looks for system fixes — better kit, clearer procedures, more supervision, different working hours. The HSE explicitly distances itself from blame culture in HSG245 because blame drives near-misses underground. Companies that investigate well report MORE near-misses (not fewer), because workers trust the system to fix the problem instead of pointing fingers.',
  },
  {
    question: 'What’s the difference between an investigation and a RIDDOR report?',
    answer:
      'RIDDOR is the legal notification — what happened, where, who, what injury (covered in §6.3). Investigation is the internal process of working out WHY it happened and what to change. RIDDOR is mandatory for the four serious buckets; investigation is mandatory for ALL incidents and near-misses if the company actually wants to learn from them. Most decent firms investigate every accident book entry above a baseline.',
  },
  {
    question: 'What’s a "5 Whys" analysis?',
    answer:
      'You start with the immediate cause and ask "why?" Each answer becomes the next question. Five rounds usually gets you from the immediate physical cause to a system-level root cause. Example: "Spark got shocked." Why? "Cable was live." Why? "Lock-off wasn’t used." Why? "No kit issued." Why? "Stores never re-stocked after the last one was lost." Why? "No process for replacing it." Now you’ve got something fixable.',
  },
  {
    question: 'Who actually runs an investigation?',
    answer:
      'For minor incidents, the supervisor or H&S officer. For serious ones (specified injury, dangerous occurrence, fatal) it’ll be a more senior H&S manager, sometimes with external consultants. For RIDDOR-reportable fatals, the HSE may run their own parallel investigation under HSWA s.20. The internal one happens regardless of whether the HSE turns up.',
  },
  {
    question: 'Should I keep my own notes if I’m involved in an incident?',
    answer:
      'Yes — always. Time, location, what was happening, who was around, what state the equipment was in, what was said. Don’t wait for the official statement — memory degrades fast and badly. A page in your notebook the same day is gold for any later investigation, civil claim, or RIDDOR report. Stick to facts; avoid speculation about why.',
  },
  {
    question: 'What’s a "lessons learned" briefing?',
    answer:
      'A short toolbox talk shared after an incident or near-miss explaining what happened, what the root cause was, and what’s changed (process, kit, training). Often anonymised. The whole point is to spread the lesson beyond just the immediate crew so the same thing doesn’t happen on another site next month. Ignore them at your peril — they’re there because someone’s already paid the price.',
  },
];

export default function Sub4() {
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 1 · Section 6 · Subsection 4"
            title="Accident investigation & lessons learned"
            description="Why incidents get investigated — to LEARN, not to blame. Root cause analysis, the 5 Whys, the four-stage HSE model, and how lessons learned actually change site behaviour."
            tone="emerald"
          />

          <TLDR
            points={[
              "Investigation is for LEARNING, not blame. HSE HSG245 is the guide. Blame-driven investigations push near-misses underground and destroy your safety data.",
              "Three layers of cause: IMMEDIATE (what physically did damage), UNDERLYING (the conditions that let it happen), ROOT (the system gap behind those conditions).",
              "5 Whys gets you from the physical event to a system fix. If your final answer is a person’s name, you haven’t got there yet.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain why workplace accidents are investigated and what good investigation produces.",
              "Describe the four stages of HSE-aligned investigation: gather → analyse → control measures → action plan.",
              "Distinguish immediate, underlying and root causes — and apply 5 Whys to find them.",
              "Use the Swiss cheese / defence-in-depth model to explain how layered safety usually catches single failures.",
              "Recognise the accident-causation iceberg (1 : 30 : 300 : 3000) and the implication for near-miss reporting.",
              "Describe how lessons learned propagate via toolbox talks, RAMS updates and induction changes.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why we investigate at all</ContentEyebrow>

          <ConceptBlock title="Investigation is a learning tool, not a punishment exercise">
            <p>
              The HSE’s "Investigating accidents and incidents" (HSG245) is the canonical UK
              guide. It frames investigation as a way for an organisation to learn from what
              went wrong so that it doesn’t happen again — not as a way to identify the person
              to discipline.
            </p>
            <p>
              That distinction matters because the moment investigations are perceived as
              blame-hunts, near-misses stop being reported. People hide them because they don’t
              want to be the one in the meeting room. The company loses its early-warning
              system. The next near-miss becomes an incident; the incident becomes a fatality.
            </p>
            <p>
              Good investigations are matter-of-fact. They look at what happened, work out
              WHY, and produce a list of changes — to procedures, kit, training, supervision —
              that make the same thing harder to repeat. The casualty’s name barely features in
              the recommendations.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG245 — Investigating accidents and incidents"
            clause="Investigations are about learning lessons. Their purpose is not to apportion blame, but to identify the underlying causes of the incident and prevent recurrence."
            meaning={
              <>
                If your workplace’s investigation process feels like a witch-hunt, that’s a
                cultural problem worth flagging. The HSE’s default position is that blame
                cultures kill workers — because they kill the reporting that catches the next
                near-miss. Companies that investigate well typically report MORE near-misses,
                not fewer.
              </>
            }
            cite="Reference: HSE HSG245 — Investigating accidents and incidents in the workplace."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four-stage process</ContentEyebrow>

          <ConceptBlock
            title="HSG245 — gather, analyse, identify, plan"
            plainEnglish="The four stages aren’t magic. They just stop you from jumping to conclusions before you’ve actually looked at what happened."
          >
            <p>The HSE’s four stages of investigation:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gather information.</strong> Photographs (before anything moves),
                witness statements (while memory is fresh — within hours, ideally), the state
                of the equipment as found, environmental conditions (weather, lighting, noise),
                relevant documents (RAMS, permits, training records, equipment maintenance
                logs).
              </li>
              <li>
                <strong>Analyse the information.</strong> Identify the immediate cause (what
                physically did the damage), the underlying causes (the conditions that allowed
                it), and the root cause(s) (the system-level gaps). Tools: 5 Whys, fishbone /
                Ishikawa diagram, fault-tree analysis for serious cases.
              </li>
              <li>
                <strong>Identify control measures.</strong> What changes will stop this
                happening again? Apply the hierarchy of control: eliminate → substitute →
                engineer out → administrative (procedure / training) → PPE. Engineering
                changes always beat procedural changes because they don’t rely on human
                memory.
              </li>
              <li>
                <strong>Action plan and implementation.</strong> Each control measure gets a
                named owner, a target date and a check-in date. Without these, the plan rots.
                Re-audit at the check-in date. Update the RAMS, brief the workforce, change
                the induction.
              </li>
            </ol>
            <p>
              For a minor accident this might take an hour and result in a tweak to the RAMS.
              For a fatal it could take months and produce a wholesale change in working
              practices. Same four stages, scaled to severity.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Three layers of cause</ContentEyebrow>

          <ConceptBlock
            title="Immediate, underlying, root — and why it matters which one you fix"
            plainEnglish="If you only fix the immediate cause, the underlying conditions stay in place and a different version of the same accident happens next week with a different person."
            onSite={`The cliché root-cause clue: if your fix is "tell Dave to be more careful", you’ve found a name, not a cause. Keep digging.`}
          >
            <p>The three layers, with an electrical example:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Immediate cause:</strong> Spark received a shock from a live conductor.
              </li>
              <li>
                <strong>Underlying causes:</strong> Lock-off kit wasn’t used. The supply was
                still live during work. The voltage indicator wasn’t proved before/after. The
                spark was working alone with no second-set-of-eyes check.
              </li>
              <li>
                <strong>Root causes:</strong> Lock-off kit was never issued to that crew. The
                supervisor doesn’t routinely check lock-off compliance. The site induction
                doesn’t cover lock-off. There’s informal pressure from the gaffer to "crack on"
                that overrides safe-isolation procedure on tight jobs.
              </li>
            </ul>
            <p>
              <strong>Fix the immediate cause</strong> ("isolate the supply for that job") and
              the next job has the same problem. <strong>Fix the underlying cause</strong>
              ("everyone uses lock-off this week") and it slides back next month when the
              pressure’s on. <strong>Fix the root cause</strong> (kit issued + induction
              updated + supervisor accountable + visible compliance metric) and the behaviour
              actually changes.
            </p>
            <p>
              The deeper you go, the more it costs to fix — but the more permanent the fix
              becomes. Most companies under-invest in root-cause fixes because the immediate
              cost is visible and the avoided-future-incidents cost isn’t.
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

          <ContentEyebrow>The 5 Whys — apprentice-friendly root cause</ContentEyebrow>

          <ConceptBlock
            title="Five rounds, one structured conversation"
            plainEnglish={`Start with what physically happened. Ask "why?" Take the answer, ask "why?" again. Keep going until you reach a cause you can fix at a system level.`}
          >
            <p>A worked example:</p>
            <div className="rounded-lg bg-[hsl(0_0%_10%)] border border-white/[0.08] p-4 my-2">
              <p className="text-[13.5px] text-white mb-2">
                <strong>Event:</strong> Apprentice took a 230 V shock from a CU.
              </p>
              <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70 text-[13.5px] text-white">
                <li>
                  <strong>Why?</strong> Because the supply was live when he opened the
                  enclosure.
                </li>
                <li>
                  <strong>Why was it live?</strong> Because the breaker hadn’t been tripped
                  and locked off.
                </li>
                <li>
                  <strong>Why hadn’t it been locked off?</strong> Because no lock-off kit was
                  on the van.
                </li>
                <li>
                  <strong>Why was no kit on the van?</strong> Because the last padlock was lost
                  three weeks ago and never replaced.
                </li>
                <li>
                  <strong>Why was it never replaced?</strong> Because there’s no process for
                  reporting / re-stocking missing safety kit on the vans.
                </li>
              </ol>
              <p className="text-[13.5px] text-white mt-2">
                <strong>Root cause:</strong> No process to keep safety kit replenished on the
                vans. <strong>Fix:</strong> add a weekly van H&S check, with named owner, and a
                same-day re-supply route. Plus tighten the supervisor sign-off so jobs can’t
                start without confirmation that lock-off kit is on board.
              </p>
            </div>
            <p>
              Note that the answer never settled on "the apprentice was careless" — that
              would be Why-1 stopping point. The real cause sits at Why-5, in the company’s
              system. Fix THAT and the apprentice has the kit he needs next time.
            </p>
            <p>
              <strong>5 is a guideline, not a rule.</strong> Sometimes you reach a system
              cause in three. Sometimes it takes seven. Stop when the answer is something the
              company can act on — never when the answer is just a person’s name.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Defence in depth</ContentEyebrow>

          <ConceptBlock
            title="The Swiss cheese model — why most days nothing bad happens"
            plainEnglish="Imagine your safety system as a stack of slices of Swiss cheese. Each slice is a defence layer (RAMS, training, kit, supervision, individual judgement). Each slice has holes — none of them is perfect. Most days the holes don’t line up — the next slice catches it. An accident happens when all the holes line up at once."
            onSite="The implication for investigation: don’t just plug the hole closest to the casualty. Look at every layer that should have caught the problem and didn’t — that’s where the real fixes live."
          >
            <p>
              For a typical electrical job, the layers might be:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RAMS</strong> — written safe system of work for the task.
              </li>
              <li>
                <strong>Permit-to-work</strong> — formal authorisation for higher-risk tasks.
              </li>
              <li>
                <strong>Training and competence</strong> — the worker has the right
                qualifications and current refreshers.
              </li>
              <li>
                <strong>Equipment</strong> — fit for purpose, calibrated, maintained.
              </li>
              <li>
                <strong>Supervision</strong> — appropriate to the experience level of the
                worker.
              </li>
              <li>
                <strong>Site discipline</strong> — toolbox talks, peer challenge, near-miss
                reporting culture.
              </li>
              <li>
                <strong>Individual judgement and behaviour</strong> — the spark on the day.
              </li>
            </ul>
            <p>
              When all of these are working, even a moment of poor judgement gets caught by the
              other layers. When they all degrade together — RAMS not read, no permit, lapsed
              training, dodgy kit, absent supervisor, no toolbox talks — the holes line up and
              an accident happens. Fix the layers, not just the moment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The accident-causation iceberg</ContentEyebrow>

          <ConceptBlock
            title="1 : 30 : 300 : 3000 — the warnings nobody bothered to count"
            plainEnglish="For every fatality at work, there are roughly 30 major injuries, 300 minor injuries, and around 3,000 unsafe acts and conditions that didn’t cause anything (yet). The fatality is the visible tip of an enormous pyramid of warnings."
          >
            <p>
              The Heinrich (1931) and Bird (1969) ratios are the classic accident-pyramid
              figures, refined over decades but broadly still standing. The numbers vary by
              industry and study — but the shape is what matters: most of the data sits in the
              "near-miss / unsafe condition" base, not in the rare fatal at the top.
            </p>
            <p>
              The implication is the foundation of modern safety practice: <strong>most
              fatalities are preventable IF the pyramid below them is being acted on</strong>.
              That’s why companies push so hard on near-miss reporting (covered in §6.5). Each
              near-miss is a free lesson — the casualty is hypothetical, the data is real, the
              fix is cheap.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Closing the loop</ContentEyebrow>

          <ConceptBlock
            title="Lessons learned only count if they reach everyone"
            plainEnglish="An action plan that sits in a folder doesn’t change anything. The plan only works when the lesson reaches the people doing the work."
            onSite={`The toolbox talk on Monday morning where the gaffer says "right, listen up, this happened on a sister site last week, this is what we’re changing" — that’s lessons learned in action. If you’ve been through a year on the tools without one of those, ask why.`}
          >
            <p>The mechanisms for spreading lessons learned:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Toolbox talks.</strong> Short (5–15 min), focused, ideally with the
                actual incident sketched out (anonymised). Delivered by the supervisor at the
                start of a shift. Signed attendance sheet so the company can prove it happened.
              </li>
              <li>
                <strong>RAMS updates.</strong> The Risk Assessment / Method Statement gets a
                new control measure added. New jobs use the updated version; existing crews
                get re-briefed.
              </li>
              <li>
                <strong>Site induction changes.</strong> New starters get the lesson built into
                their first-day brief.
              </li>
              <li>
                <strong>Bulletins / safety alerts.</strong> Industry-wide alerts (e.g. from a
                manufacturer, the HSE, an industry body) covering equipment defects or
                emerging risks. Worth subscribing to.
              </li>
              <li>
                <strong>Equipment changes.</strong> The most permanent fix — engineer the
                hazard out so the procedural lesson isn’t even needed (e.g. install lockable
                main switches as standard, replace old non-lockable CUs).
              </li>
              <li>
                <strong>Supervisory metrics.</strong> What gets measured gets done. If lock-off
                compliance is on the supervisor’s monthly report, supervisors check.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating the action plan as the end of the investigation"
            whatHappens={
              <>
                Plan written, names attached, dates noted. Folder closed. Six months later the
                same near-miss happens because nobody checked whether the actions were actually
                done — kit on the vans, induction updated, supervisor checks happening. The
                plan was paperwork, not action.
              </>
            }
            doInstead={
              <>
                Every action gets a CHECK-IN DATE as well as a target date. At the check-in,
                someone (named, accountable) verifies the action is actually in place — not
                just signed off. Close-out happens on evidence (kit photo, induction screenshot,
                supervisor’s checklist signed) — not on the action-owner’s word.
              </>
            }
          />

          <Scenario
            title="The third near-miss in six months — what does it tell you?"
            situation={
              <>
                Your firm’s done three RIDDORs and a string of internal investigations on
                near-misses involving a particular brand of MCB that’s tripping unexpectedly
                under load. After the first investigation, the action plan said "brief sparks
                to monitor and report further incidents". The brief was done. Six months later
                it’s happened again on a different site, same MCB type, this time someone
                falling off a ladder when the lights dropped.
              </>
            }
            whatToDo={
              <>
                The pattern says the original investigation found the immediate cause (faulty
                MCB type) but stopped short of fixing it. "Brief and monitor" is a documentation
                action, not a control measure — it doesn’t take the bad MCBs out of service.
                Re-investigate with a 5 Whys focus on why the original action was so weak.
                Likely root causes: nobody had authority to scrap a whole batch of stock; cost
                concerns blocked replacement; manufacturer hadn’t issued a recall so legally it
                was "good kit". Real fix: take the affected MCBs out of stock now, write to
                the manufacturer, raise it with the HSE for a potential industry alert, brief
                the workforce on identification and replacement during scheduled visits.
              </>
            }
            whyItMatters={
              <>
                Repeat near-misses are the loudest possible warning a system can give you. They
                indicate either that the original investigation didn’t find the root cause, or
                that the action plan was paperwork rather than action. Either way it’s a
                second chance — taking it can prevent the fourth incident becoming the first
                fatality.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>The personal angle for an apprentice</ContentEyebrow>

          <ConceptBlock title="Your role isn’t to lead the investigation — it’s to enable a good one">
            <p>
              You’re very unlikely to be running an investigation yourself in your first
              couple of years. What you ARE expected to do:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Preserve the scene.</strong> Don’t tidy up. Don’t move tools. Don’t
                re-energise. Lock-off stays in place. Photos are gold.
              </li>
              <li>
                <strong>Give an honest, factual statement</strong> while memory is fresh — same
                day if at all possible. Stick to what you saw, not what you think happened.
                Don’t embellish, don’t cover for anyone.
              </li>
              <li>
                <strong>Read the lessons-learned briefings</strong> when they come round.
                Apprentices are statistically more likely to be the next casualty — the
                lessons are aimed at you.
              </li>
              <li>
                <strong>Report near-misses.</strong> Every single one. The data goes into the
                pyramid base. Your near-miss this week is the brief that stops next month’s
                accident.
              </li>
              <li>
                <strong>Push back on weak action plans.</strong> If your supervisor says "right,
                we’ve been told to be more careful with X", that’s not a control measure.
                Politely ask what’s actually being changed in the kit / process / supervision.
                You’re in your rights under HASAWA s.7 to ask.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Investigation is for LEARNING, not blame. HSE HSG245 is the canonical guide.",
              "Four stages: gather → analyse → identify control measures → action plan with named owners and dates.",
              "Three layers of cause: immediate (what did damage), underlying (the conditions), root (the system gap). Fix the root.",
              "5 Whys is the apprentice-friendly root-cause technique. Stop when the answer points to a system fix, not a person’s name.",
              "Swiss cheese model: defences are layered, each layer has holes, accidents happen when holes line up. Fix every layer.",
              "Lessons learned only work if they reach everyone — toolbox talks, RAMS updates, induction changes, equipment changes.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Accident investigation knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                RIDDOR — what must be reported
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fire emergency procedures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
