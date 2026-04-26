/**
 * Module 1 · Section 3 · Subsection 4 — Working with RAMS on site
 * City &amp; Guilds 2365-02 → Unit 201
 *   • LO3 → AC 3.1 — state the procedure for producing risk assessments and
 *     method statements in accordance with their level of responsibility
 *     (live use, point-of-work checks, dynamic re-assessment).
 *   • LO3 → AC 3.7 — describe and demonstrate safe practices and procedures
 *     for the use of equipment and materials in the working environment.
 *   • LO2 → AC 2.7 — explain why it is important to report any hazards to the
 *     environment that arise from work procedures (near-miss reporting).
 *   • LO4 → AC 4.5 — explain practices and procedures for addressing hazards
 *     in the workplace.
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
  'Working with RAMS on site | Level 2 Module 1.3.4 | Elec-Mate';
const DESCRIPTION =
  "How RAMS gets used live on site — toolbox talks each morning, point-of-work checks throughout the day, and what to do when reality stops matching the plan.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'toolbox-talk-purpose-check',
    question: "What’s the actual purpose of a toolbox talk at the start of the shift?",
    options: [
      'Tick a box for the office',
      'Brief the team on the day’s hazards and controls so everyone’s working off the same plan',
      'Give the supervisor time to make tea',
      'Replace the RAMS document',
    ],
    correctIndex: 1,
    explanation:
      "Toolbox talks are short, focused briefings — usually 5-15 minutes — that cover the hazards and controls relevant to that shift’s work. They turn the RAMS document into shared, on-the-day understanding. Sign-on isn’t the box-tick; sign-on confirms YOU heard and understood.",
  },
  {
    id: 'pow-check-when',
    question: "When should you do a point-of-work risk assessment?",
    options: [
      'Once at the start of the job',
      'At the moment you reach a new task or hazard during the day — informal, quick, between you and the work',
      'Only on Mondays',
      'Only when a supervisor tells you to',
    ],
    correctIndex: 1,
    explanation:
      "POW (also called dynamic risk assessment) is the live, in-the-moment check you do as conditions change. New room. New piece of kit. Something you didn’t expect. Stop, think, decide if the existing controls still work. Takes seconds. Stops accidents.",
  },
  {
    id: 'rams-mismatch-check',
    question: "You spot something on site that doesn’t match the RAMS — different layout, extra hazard, missing kit. What’s your duty?",
    options: [
      'Crack on, sort it out later',
      'Stop, raise it with the supervisor or RAMS author, get the document amended before continuing',
      'Just adjust your work and don’t mention it',
      'Take a photo for evidence',
    ],
    correctIndex: 1,
    explanation:
      "MHSWR Reg 3(3) and HASAWA s.7 both apply. The RAMS is no longer 'suitable and sufficient' if reality has diverged. Your duty as a worker is to stop, raise it, and get it sorted. Carrying on quietly is a personal s.7 breach if anything later goes wrong.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: "Toolbox talk this morning covered isolation procedure for the CU change. Two hours in, the architect adds a new circuit you weren’t expecting. What’s the right move?",
    options: [
      "Just isolate the new circuit the same way",
      "Stop, treat it as a Step 5 trigger — assess the new circuit (different OCPD, different load, possibly different RCD requirement), brief the team, then continue",
      "Crack on without changing anything",
      "Go home for the day",
    ],
    correctAnswer: 1,
    explanation:
      "The morning’s toolbox talk only covered what was known at 8am. New work = new hazards = fresh thinking required. Don’t assume same-as-before. Quick point-of-work assessment, quick brief to the team, then proceed. That’s how the system stays alive.",
  },
  {
    id: 2,
    question: "You sign the toolbox-talk attendance sheet without listening. Three hours later something on the talk would have warned you about goes wrong. Where’s the legal exposure?",
    options: [
      "Only on the supervisor who delivered the talk",
      "On you personally under HASAWA s.7 (you confirmed you’d been briefed and ignored it), as well as the firm",
      "Nowhere — accidents happen",
      "Only on the firm’s insurance",
    ],
    correctAnswer: 1,
    explanation:
      "Your signature on the attendance sheet is evidence that you were briefed. If you weren’t actually listening, you can’t un-sign that. HASAWA s.7 catches workers who don’t cooperate with the safety system. Personal prosecution is real — electricians have gone down for less.",
  },
  {
    id: 3,
    question: "What’s a 'point-of-work risk assessment' (also called dynamic risk assessment)?",
    options: [
      "A formal written document for every individual task",
      "A live, in-the-moment check you do as you reach a new task or hazard — quick, informal, but it stops you walking into surprises",
      "The same as a toolbox talk",
      "A type of permit-to-work",
    ],
    correctAnswer: 1,
    explanation:
      "POW assessments are the in-the-moment, on-the-spot version of the five-step process. New room: scan for hazards. Unexpected condition: stop and think. They aren’t formal documents (usually) — they’re a habit. They’re what closes the gap between the written RAMS and what’s actually in front of you.",
  },
  {
    id: 4,
    question: "You arrive at a job and there’s no toolbox talk. The supervisor just hands out tasks. What’s the right response?",
    options: [
      "Crack on — toolbox talks are optional",
      "Ask for the briefing — even five minutes covering the day’s hazards, controls and emergency arrangements is required for a safe system of work",
      "Refuse to work without a 30-minute talk",
      "Email the HSE",
    ],
    correctAnswer: 1,
    explanation:
      "Briefings aren’t legally named in MHSWR by the term 'toolbox talk', but Reg 10 (information for employees) and HASAWA s.2(2)(c) (instruction and supervision) make them effectively unavoidable for any non-trivial job. 'Can we run through what we’re doing today and any hazards I should know about?' is a polite, professional ask.",
  },
  {
    id: 5,
    question: "Mid-job, you notice the lock-off you applied this morning has been removed by someone else. What do you do?",
    options: [
      "Just put your lock back on and crack on",
      "Stop ALL work that depends on that isolation, find out who removed it and why, re-prove dead before re-isolating, and treat it as a serious safety incident",
      "Ignore it",
      "Lock yourself out of the site",
    ],
    correctAnswer: 1,
    explanation:
      "An unauthorised lock removal means the system you trusted is no longer trustworthy. Stop, investigate, prove dead again, re-establish the isolation properly. This is a HASAWA s.8 breach by whoever removed your lock — never assume it’s harmless. Could have been re-energised since.",
  },
  {
    id: 6,
    question: "You spot a near miss — your mate nearly drilled into a buried cable that wasn’t marked on the RAMS. Nobody got hurt. What should happen next?",
    options: [
      "Forget about it — no harm done",
      "Stop work, log the near miss, trigger a Step 5 review of the RAMS, brief the team on the new hazard, and add the buried cable to the records",
      "Tell your mate to be more careful next time",
      "Mention it to the supervisor when you see them",
    ],
    correctAnswer: 1,
    explanation:
      "Near misses are gifts — they tell you about a hazard before it causes an injury. MHSWR Reg 3(3) explicitly lists significant changes (which include unrecorded hazards being discovered) as a review trigger. Logging near misses also catches patterns over time. Many companies treat near-miss culture as a leading indicator of safety performance.",
  },
  {
    id: 7,
    question: "You’re asked to take part in delivering a toolbox talk to your apprentices below you. What’s the structure of a useful talk?",
    options: [
      "Read out the whole RAMS document",
      "Cover today’s scope, the significant hazards relevant to today’s work, the controls in place, the emergency arrangements, and check understanding by asking questions back",
      "Tell jokes for 15 minutes",
      "Hand out the RAMS to read in silence",
    ],
    correctAnswer: 1,
    explanation:
      "Useful TBT structure: scope of today’s work, significant hazards (not all hazards — the relevant ones), controls expected, emergency arrangements, then check-back questions. 'Where’s the first-aider?' 'Where’s the muster point?' 'What’s the isolation point for the work we’re doing this morning?' Confirms understanding, not just attendance.",
  },
  {
    id: 8,
    question: "You finish your part of the job 30 minutes early and the supervisor’s left site. There’s no other task in the RAMS for you. What do you do?",
    options: [
      "Pick a new task you think looks straightforward and start it",
      "Do something productive that’s within scope and competence (tidy up, document the work, prep for tomorrow), and wait for instruction before starting any unassessed task",
      "Go home early without telling anyone",
      "Ask another sub-contractor to give you something",
    ],
    correctAnswer: 1,
    explanation:
      "If a task isn’t in the RAMS, it hasn’t been assessed and you don’t have authorisation. Picking up a new task off your own bat is exactly how unassessed work happens. Stay productive within scope, wait for proper instruction. Sub-contractors can’t formally authorise you either — your firm has to.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: "How long should a toolbox talk actually be?",
    answer:
      "Five to fifteen minutes for most jobs, daily. Longer for new starts on site, longer when significant hazards are coming up, longer after an incident. Shorter daily reminders for ongoing routine work. The bar is 'long enough to cover what matters today, short enough that people are still listening at the end'.",
  },
  {
    question: "Do I have to ATTEND every toolbox talk if it’s a job I’ve done a hundred times?",
    answer:
      "Yes. The talk isn’t about whether YOU know the work — it’s about today’s specific conditions: who else is on site, what other trades are doing, where the muster point is, what changed since yesterday. Even on routine work, things move — and the talk is when those changes get communicated.",
  },
  {
    question: "What’s the difference between a toolbox talk and a method-statement briefing?",
    answer:
      "Method-statement briefing is at the start of a piece of work — once, covers the whole MS, makes sure everyone understands the plan. Toolbox talks are recurring (usually daily) and focus on what’s relevant for THAT shift. On a long job you’ll have one MS briefing at the start and many TBTs as it runs.",
  },
  {
    question: "Point-of-work check sounds informal — is it actually required?",
    answer:
      "It’s not named by that term in any single regulation, but it’s the practical expression of MHSWR Reg 3(3) (review when no longer valid) and HASAWA s.7 (cooperate with the system). The HSE’s expectation is that workers continually check conditions against what was assumed in the assessment, and stop if they diverge. Big firms formalise this with mid-job sign-offs; smaller firms expect it as habit.",
  },
  {
    question: "What if my supervisor never does toolbox talks?",
    answer:
      "Politely ask. 'Can we run through today’s plan and the main hazards before we start?' is a normal, professional request. If they refuse repeatedly, that’s an issue you can raise with the firm’s safety lead, the principal contractor (on a CDM site), or your training provider. Working without briefings is working without a safe system of work — which puts YOU on the hook under HASAWA s.7 if anything goes wrong.",
  },
  {
    question: "If I refuse to work because the RAMS doesn’t match the site, can I be sacked?",
    answer:
      "No — and you have specific legal protection. Section 44 of the Employment Rights Act 1996 protects you from detriment (sacking, loss of hours, disciplinary) for raising a genuine health and safety concern OR refusing work that you reasonably believe is unsafe. Note dates, names, what was said. Most disputes never get that far — most supervisors, when properly approached, will fix the issue.",
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
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3 · Subsection 4"
            title="Working with RAMS on site"
            description="How RAMS gets used live on site — toolbox talks each morning, point-of-work checks throughout the day, near-miss reporting, and what to do when reality stops matching the plan. The bit that turns paperwork into actual safety."
            tone="emerald"
          />

          <TLDR
            points={[
              "RAMS only protects you if it’s LIVE — read every morning at the toolbox talk, checked every time conditions change, updated whenever reality diverges from the plan.",
              "Point-of-work risk assessment = the in-the-moment check you do as you hit a new task or hazard. Takes seconds. Stops accidents.",
              "When the RAMS doesn’t match the site, your legal duty under HASAWA s.7 is to STOP and raise it — not to crack on quietly. 'I noticed but didn’t say' is the apprentice version of negligence.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain the purpose and structure of a useful toolbox talk.",
              "Carry out a point-of-work (dynamic) risk assessment when you reach a new task or hazard.",
              "Recognise when reality has diverged from the RAMS — and the action this triggers.",
              "Report a near miss properly and understand why near misses matter as much as incidents.",
              "State your personal duties as a worker under HASAWA s.7 and MHSWR Reg 14 — and the protection you have under ERA 1996 s.44 if you refuse unsafe work.",
              "Apply 'stop the job' authority appropriately — the moment when polite escalation isn’t enough.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this subsection exists</ContentEyebrow>

          <ConceptBlock title="The gap between the RAMS in the office and the work on the floor">
            <p>
              You’ve learnt what a risk assessment is for (Sub 1), the five-step method to
              produce one (Sub 2), and how method statements and safe systems of work turn
              controls into a sequence of work (Sub 3). All of that is preparation. This
              subsection is where it meets the floor.
            </p>
            <p>
              Most safety incidents in UK electrical work don’t happen because someone didn’t
              have RAMS. They happen because the RAMS was on a clipboard somewhere while the
              job changed underneath it. New trades arrive. Walls come down. The kit doesn’t
              show up. The weather turns. The architect adds three sockets. Reality moves; the
              paperwork doesn’t.
            </p>
            <p>
              Your job — every day, on every site — is to keep the gap between paperwork and
              reality small enough that nobody falls through it. That’s what toolbox talks,
              point-of-work checks and near-miss reporting are for.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Toolbox talks — the morning briefing</ContentEyebrow>

          <ConceptBlock
            title="Five to fifteen minutes that turn the RAMS into shared understanding"
            plainEnglish="A toolbox talk is a short, focused briefing — usually at the start of the shift — covering the day’s scope, the significant hazards, the controls in place and the emergency arrangements. It’s how the written RAMS becomes shared awareness."
            onSite="The phrase comes from old industrial sites where workers literally gathered round the toolbox at the start of the shift. Modern TBTs serve the same purpose. The supervisor or competent person walks the team through the plan, takes questions, confirms everyone’s on the same page. Sign-on at the end is evidence of attendance — but the value is in actually listening."
          >
            <p>Useful TBT structure (most firms have a similar template):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scope of today’s work</strong> — what we’re doing, which area, who’s on which task.
              </li>
              <li>
                <strong>Significant hazards</strong> — the three or four things that could realistically
                hurt someone today. Not the full RAMS list — just what’s live for THIS shift.
              </li>
                <li>
                <strong>Controls in place</strong> — isolation arrangements, lock-off, RCDs,
                permits, supervision, PPE required, exclusion zones.
              </li>
              <li>
                <strong>Other trades / site-wide hazards</strong> — what else is happening, where
                the deliveries are coming, where the scaffolders are working overhead.
              </li>
              <li>
                <strong>Emergency arrangements</strong> — first-aider on shift, AED location, muster
                point, fire warden, ambulance access. Restated daily because day-one
                inductions fade.
              </li>
              <li>
                <strong>Check-back questions</strong> — supervisor asks 2-3 questions to confirm
                understanding. 'Where’s the muster point?' 'What’s the isolation point for the
                CU change?' 'Who’s the first-aider today?'
              </li>
              <li>
                <strong>Sign-on</strong> — every attendee signs to confirm they were briefed and
                understood. The signature is evidence — both of attendance AND of personal
                acceptance of the plan.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="MHSWR 1999 — Regulation 10 (Information for employees)"
            clause="Every employer shall provide his employees with comprehensible and relevant information on the risks to their health and safety identified by the assessment, the preventive and protective measures, the procedures referred to in regulation 8(1)(a), the identity of those persons nominated by him in accordance with regulation 8(1)(b), and the risks notified to him in accordance with regulation 11(1)(c)."
            meaning={
              <>
                The legal hook for toolbox talks. The employer has to give workers
                'comprehensible and relevant information' about the hazards, the controls and
                who’s responsible for what. A pile of RAMS dropped on a desk doesn’t meet that
                test. A daily briefing in language the team understands does.
              </>
            }
            cite="Reference: HSE — Management of Health and Safety at Work Regulations 1999, Regulation 10"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Point-of-work risk assessment — the live check</ContentEyebrow>

          <ConceptBlock
            title="Stop. Look. Think. Then proceed (or escalate)."
            plainEnglish="POW (or 'dynamic') risk assessment is what you do at the moment you reach a new task or hazard. Not a form, not a meeting — a habit. Stop. Scan the area. Check the controls listed in the RAMS are still appropriate. If yes, proceed. If no, stop and escalate."
            onSite="Five-second version: 'Has anything changed since the last assessment? Are the controls still right for what’s in front of me? If a senior tradesperson walked up right now, would I be comfortable explaining what I’m about to do?' Three yeses = crack on. Any no = stop."
          >
            <p>
              The HSE doesn’t name 'point-of-work assessment' as a specific document type, but
              it’s the practical expression of MHSWR Reg 3(3) (review when no longer valid) and
              HASAWA s.7 (workers cooperate with the system). It catches the things the
              morning toolbox talk couldn’t have foreseen.
            </p>
            <p>When to do a POW check:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Moving to a new room or area not covered in the morning brief.</li>
              <li>Starting a new task or activity within the day’s scope.</li>
              <li>Encountering an unexpected condition (open ceiling, exposed wiring, water leak).</li>
              <li>Other trades unexpectedly working in your space.</li>
              <li>Equipment you didn’t bring (someone else’s test gear, borrowed kit).</li>
              <li>Anything that triggers a 'hmm, that’s odd' reaction. Don’t ignore the gut.</li>
            </ul>
            <p>
              The check itself takes seconds. Look up, look down, look around. Identify hazards
              you didn’t expect. Decide if existing controls handle them. If not, stop, raise
              it, get the RAMS amended (Step 5), then carry on. The few seconds you spend on
              the check are the cheapest insurance you’ll ever buy.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>When the RAMS doesn’t match the site</ContentEyebrow>

          <ConceptBlock
            title="Reality has moved. The paperwork hasn’t. Now what?"
            plainEnglish="The moment you spot a divergence — extra hazard, missing kit, different layout, new occupants — the RAMS is no longer 'suitable and sufficient'. Continuing to work to it is working without a valid safe system of work. Your duty is to STOP and raise it."
            onSite="This happens constantly. It’s not unusual or dramatic. Floor plan slightly different to the drawing. Supervisor hadn’t mentioned the new circuit. Cable route blocked by something that wasn’t there yesterday. The point isn’t to be paranoid — it’s to be calibrated. Small mismatches: flag them, get them noted, often the RAMS just gets a one-line addition. Big mismatches: stop, escalate, full Step 5 review."
          >
            <p>The mismatch action sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stop the relevant work</strong> (you don’t have to stop the whole site if
                only one task is affected — but stop the affected work).
              </li>
              <li>
                <strong>Make safe</strong> — if anything’s already partially started, leave it in a
                known safe state (isolated, bonded, barriered, signed).
              </li>
              <li>
                <strong>Raise it</strong> — supervisor first, then RAMS author or competent person if
                the supervisor can’t resolve it.
              </li>
              <li>
                <strong>Trigger a Step 5 review</strong> — assessment of the new hazard, controls
                added, RAMS amended, brief back to the team.
              </li>
              <li>
                <strong>Document</strong> — note what you spotted, when, what was changed in the
                RAMS, who signed off the amendment.
              </li>
              <li>
                <strong>Resume</strong> — under the amended system of work, with the team aware of
                the change.
              </li>
            </ol>
            <p>
              The whole sequence might take fifteen minutes. Compare that to the consequences
              of NOT doing it. The HSE’s investigation files are full of incidents that began
              with 'and then we just carried on'.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HASAWA 1974 — Section 7"
            clause="It shall be the duty of every employee while at work to take reasonable care for the health and safety of himself and of other persons who may be affected by his acts or omissions at work; and as regards any duty or requirement imposed on his employer or any other person by or under any of the relevant statutory provisions, to co-operate with him so far as is necessary to enable that duty or requirement to be performed or complied with."
            meaning={
              <>
                Two duties on you, personally. First: don’t be reckless or careless — including
                <em> omissions</em>, things you didn’t do. Second: cooperate with the safety
                system. Spotting a mismatch and saying nothing is a textbook s.7 omission. So
                is signing a TBT attendance sheet without listening. Personal liability is
                real.
              </>
            }
            cite="Reference: HSE — Health and Safety at Work etc. Act 1974, Section 7"
          />

          <RegsCallout
            source="MHSWR 1999 — Regulation 14 (Employees’ duties)"
            clause="Every employee shall use any machinery, equipment, dangerous substance, transport equipment, means of production or safety device provided to him by his employer in accordance both with any training in the use of the equipment concerned which has been received by him and the instructions respecting that use which have been provided to him by the said employer in compliance with the requirements and prohibitions imposed upon the employer by or under the relevant statutory provisions. Every employee shall inform his employer or any other employee of his employer with specific responsibility for the health and safety of his fellow employees of any work situation which a person with the first-mentioned employee’s training and instruction would reasonably consider represented a serious and immediate danger to health and safety; and any matter which a person with the first-mentioned employee’s training and instruction would reasonably consider represented a shortcoming in the employer’s protection arrangements for health and safety, in so far as that situation or matter either affects the health and safety of that first-mentioned employee or arises out of or in connection with his own activities at work, and has not previously been reported to his employer or to any other such employee of that employer in accordance with the requirements of this regulation.'"
            meaning={
              <>
                Reg 14 is the worker-side bookend to the employer’s Reg 3 duty. You have a
                positive duty to TELL someone when you spot a serious and immediate danger or a
                shortcoming in the safety arrangements. Spotting a mismatch and staying quiet
                isn’t neutral — it’s a Reg 14 breach.
              </>
            }
            cite="Reference: HSE — Management of Health and Safety at Work Regulations 1999, Regulation 14"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Near misses — the gift that prevents the next one</ContentEyebrow>

          <ConceptBlock
            title="The accident that nearly happened is more useful than one that didn’t"
            plainEnglish="A near miss is an unplanned event that didn’t result in injury or damage but easily could have. Logging them turns lucky escapes into learning — and stops the same hazard catching the next person who isn’t lucky."
            onSite="Industry research consistently shows that for every serious accident, there are dozens of minor injuries and hundreds of near misses with the same root cause. Catch the near miss early and you stop the serious injury later. Most firms have a near-miss form that takes 60 seconds to fill in."
          >
            <p>
              Examples of near misses on electrical work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Drill nearly went into a buried cable that wasn’t shown on the drawings.</li>
              <li>Voltage indicator showed dead but you hadn’t function-tested it that morning — turned out it was faulty.</li>
              <li>Lock-off was found removed by someone unauthorised; you spotted before re-energising.</li>
              <li>Step ladder slipped but you caught yourself.</li>
              <li>You felt a mild tingle off a metal enclosure that should have been at earth potential.</li>
            </ul>
            <p>
              None of those caused injury. All of them could have. Logging them lets the firm
              spot patterns (the same supplier’s voltage indicators failing repeatedly, the
              same drawings being inaccurate on every job) and act before someone gets hurt.
              RIDDOR doesn’t require near misses to be reported externally (with one exception
              — 'dangerous occurrences' as defined in Schedule 2), but internal logging is best
              practice and increasingly mandated by client safety standards.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>'Stop the job' authority — and the protection that backs it</ContentEyebrow>

          <ConceptBlock
            title="You have the authority. The law backs you. Use it when you need to."
            plainEnglish="If you reasonably believe the work is unsafe, you can stop it — and the law protects you from being punished for stopping it. The first time you do it can be intimidating. After that it becomes just part of being a competent worker."
            onSite="Most stop-the-job moments are not dramatic — they’re a polite 'I’m not happy with this, can we sort it before I carry on'. Less than 1% escalate to formal disputes. Calibrate accordingly: stop the job for genuine safety concerns, not for things that just don’t suit you. But when it’s real, stop. Don’t self-talk yourself into 'it’ll probably be fine'."
          >
            <p>
              Two things back you up legally when you refuse unsafe work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>HASAWA s.7</strong> — your duty to take reasonable care of yourself and
                others. Doing unsafe work because you were told to is a personal s.7 breach.
              </li>
              <li>
                <strong>Employment Rights Act 1996, s.44</strong> — protection from detriment for
                raising health and safety concerns or refusing genuinely unsafe work. Your
                employer cannot lawfully sack you, cut your hours, or discipline you for
                refusing work you reasonably believed to be dangerous.
              </li>
            </ul>
            <p>
              That second one matters. Apprentices sometimes hesitate to push back because
              they’re worried about being seen as awkward or losing their position. The law is
              explicit: you’re protected. Note dates, names and what was said in case the
              dispute escalates — but most don’t. Most supervisors, when properly approached
              ('I’m not happy with this for X reason — can we sort it before I carry on?'),
              will fix the issue.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Signing the toolbox-talk attendance sheet without actually listening"
            whatHappens={
              <>
                Standard morning. Five electricians crowd round the supervisor in the cabin. The talk
                covers six items including 'isolation point for the kitchen ring is in DB-3,
                tagged red, key with the supervisor'. You’re half-asleep, you nod, you sign.
                Three hours later you’re in the kitchen, you assume the local lighting circuit
                is dead because it looks dead, you don’t check DB-3 or ask for the key, you
                cut a cable. There’s a flash. You’re lucky — only lost an eyebrow. The
                investigation pulls the TBT sheet. Your signature. Your s.7 problem.
              </>
            }
            doInstead={
              <>
                Treat your signature on the TBT sheet exactly the same as your signature on
                the RAMS. It’s evidence you were briefed. If you weren’t listening, that’s on
                you. Two minutes of attention saves you from a catalogue of trouble. If
                something in the talk was unclear, ask BEFORE signing. 'Just to confirm —
                isolation for the kitchen is DB-3, key with supervisor?' is a perfect
                check-back.
              </>
            }
          />

          <CommonMistake
            title="Spotting a mismatch and staying quiet because you don’t want to be 'that apprentice'"
            whatHappens={
              <>
                Day three on a fit-out. You notice the RAMS lists a single isolation point for
                the area you’re working in — but on site there are clearly two DBs, both
                feeding the area. You think 'somebody must know' and crack on. You isolate the
                one the supervisor pointed at. The other one is still live, feeding a circuit
                you’re working on. You touch a 'dead' conductor that isn’t. Best case: you
                jump. Worst case: front page of the local paper.
              </>
            }
            doInstead={
              <>
                Speak up the moment you spot it. 'I’ve noticed there are two DBs feeding this
                area — does the RAMS need updating?' is a five-second sentence. Apprentices
                catch things experienced electricians have stopped seeing precisely BECAUSE they’re
                experienced. Your fresh eyes are a safety asset. The senior who tells you 'do
                less talking and more working' isn’t a senior — they’re a problem. Note that
                conversation in case anything later goes wrong.
              </>
            }
          />

          <Scenario
            title="Toolbox talk says 'isolate before drilling' — supervisor says 'just crack on, it’s only a sub-board'"
            situation={
              <>
                You’re on a small commercial fit-out, week two. This morning’s toolbox talk was
                clear: any drilling near electrical equipment requires the local DB to be
                isolated and proved dead first. You’re fitting trunking and need to drill
                through a partition near a sub-DB. You’re setting up the lock-off when the
                site supervisor walks past and says 'leave it, don’t bother with that, it’s
                only a sub-board, just crack on. We’re behind schedule and that drill bit
                couldn’t reach anything live anyway.'
              </>
            }
            whatToDo={
              <>
                Don’t crack on. The verbal override doesn’t change the safe system of work
                that was agreed at this morning’s TBT. Your reply: 'I get the time pressure,
                but the morning brief said isolate first — happy to do this either way but
                I’m not happy doing it without isolation. If we want to change the approach
                can we update the RAMS / get the supervisor to authorise it formally?' If they
                push, escalate above them — your own employer, the principal contractor,
                whoever signs your timesheet. While you wait, do something productive within
                scope (prep the next pull, sort the cable, tidy). Note the conversation: time,
                name, what was said.
              </>
            }
            whyItMatters={
              <>
                If you drill into a live cable because you ignored the toolbox-talk briefing on
                someone else’s say-so, the HSE prosecution lands on YOU under HASAWA s.7
                (knowingly breached the safe system you’d been briefed on) AND the supervisor
                (who instructed you to). Both go down. 'He told me to' is not a defence under
                s.7. The TBT briefing — and your signature on it — is evidence of what you
                knew. The RAMS is the agreed plan; verbal contradictions on the floor don’t
                change it. ERA 1996 s.44 protects you against any comeback for refusing the
                unsafe instruction.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where this sits in the safety stack</ContentEyebrow>

          <ConceptBlock
            title="Section 3 closes — and Section 5 is where it gets specific"
            plainEnglish="You’ve now done the full RAMS journey. Why we do it (Sub 1). The five-step method (Sub 2). Method statements and safe systems of work (Sub 3). Live use on site (this Sub). The next major section drills into PPE — the last layer of the hierarchy of control. Section 5 covers safe isolation in detail — the single most-used control in any electrical RAMS."
          >
            <p>
              Risk assessment is the planning. Method statements are the sequence. Toolbox
              talks and point-of-work checks are how the plan stays alive on the floor. All
              four together are how an electrical job runs without anyone getting hurt.
            </p>
            <p>
              Section 4 (next) covers PPE — the bottom rung of the hierarchy of control, but
              the layer that catches the consequences when everything above has failed.
              Section 5 then takes you into safe isolation — the procedure that turns the most
              common control measure ('eliminate the hazard') from a phrase in the RAMS into
              the actual sequence of switches, padlocks, warning notices and prove-dead checks
              on the day.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Toolbox talks turn the RAMS into shared on-the-day understanding. Five to fifteen minutes covering scope, hazards, controls, emergency arrangements, with check-back questions.",
              "Point-of-work risk assessment = the in-the-moment, in-the-head check you do whenever conditions change. Takes seconds. Stops accidents.",
              "Mismatch between RAMS and reality = STOP, raise it, get the RAMS amended (Step 5), then continue. Carrying on quietly is a HASAWA s.7 omission AND an MHSWR Reg 14 breach.",
              "Near misses are the gift that prevents the next accident. Log them. Pattern-spotting on near misses catches root causes before they injure someone.",
              "You have stop-the-job authority. ERA 1996 s.44 protects you from sacking, demotion or detriment for refusing genuinely unsafe work. Use it calibrated — most stops are polite resets, not dramatic stand-offs.",
              "Your signature on the TBT attendance sheet is evidence you were briefed. If you weren’t listening, that’s on you under s.7. Two minutes of attention saves you from a career’s worth of trouble.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Working with RAMS on site knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section3/3-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Method statements and safe systems of work
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section4/4-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Personal protective equipment (PPE)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
