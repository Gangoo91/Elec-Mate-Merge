/**
 * Ported from the English course, combining:
 *   level2/module1/section4/Sub4.tsx
 *   level3/module1/section3/Sub5.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'pre-use-check-check',
    question: 'When should you carry out a pre-use inspection on power tools, ladders and PPE?',
    options: [
      'Before EVERY use, every shift, every time you pick it up after a break',
      'Once a week, when the formal inspection is signed off',
      'Only when the tool has obviously been dropped or damaged',
      'At the annual PAT test, which covers it for the year',
    ],
    correctIndex: 0,
    explanation:
      'Before EVERY use. PUWER 1998 Reg 6 + the Work at Height Regs 2005 + PPER Reg 10 all require pre-use checks. ‘Looks fine’ isn’t an inspection — it’s a glance. Cracks, frayed cords, missing guards, loose handles: all stuff that develops between yesterday’s job and this morning’s.',
  },
  {
    id: 'lone-working-check',
    question:
      'You’re sent to a vacant property to first-fix a CU. No-one else on site, no signal in the basement. What’s the safe-working baseline?',
    options: [
      'Crack on alone — first-fixing a CU is dead work, so it’s fine',
      'Wait outside until someone else happens to arrive on site',
      'Have a check-in plan with the office (set times to call/text) AND avoid live work until someone’s with you',
      'Prop the basement door open and shout if anything goes wrong',
    ],
    correctIndex: 2,
    explanation:
      'Lone working isn’t banned but it raises the risk if anything goes wrong — no-one to call 999, no-one to isolate the supply if you’re unconscious. Standard safe practice: agreed check-in times, no live work alone, hostile environments (basements, confined spaces) get an extra person. HSE INDG73 covers it.',
  },
  {
    id: 'drugs-alcohol-check',
    question:
      'You had three pints with dinner last night. You’re due on site at 8 am. Are you OK to work?',
    options: [
      'Yes — a full night’s sleep clears alcohol from your system completely',
      'No — three pints means you’re banned from any site for a full 48 hours',
      'Maybe — depends if you’re over the limit and sharp enough for live work',
      'Yes — as long as you feel basically fine in yourself, you’re fit to work',
    ],
    correctIndex: 2,
    explanation:
      'Alcohol stays in your system longer than you think — three pints can keep you over the drink-drive limit until late morning. HASAWA s.7 + most company policies: it’s ON YOU to turn up fit for work. ‘Hungover but not drunk’ on a live job is exactly the impairment that causes mistakes. If in doubt, flag it BEFORE you start, not after the incident.',
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'Which regulation requires pre-use inspection of work equipment (drills, ladders, MFTs)?',
    options: [
      'RIDDOR 2013 — Regulation 4',
      'PUWER 1998 (Provision and Use of Work Equipment Regulations) — Regulation 6',
      'BS 7671 Regulation 621 — periodic inspection',
      'COSHH 2002 — Regulation 7',
    ],
    correctAnswer: 1,
    explanation:
      'PUWER 1998 Reg 6 — work equipment must be inspected at suitable intervals and after any exceptional event (drop, knock, water ingress). For day-to-day kit, that means before each use. PPER Reg 10 covers PPE; WAH Regs cover ladders / MEWPs; PUWER is the umbrella for the rest.',
  },
  {
    id: 2,
    question:
      'On a 110 V CTE construction site supply, your drill cord shows visible cuts in the outer sheath. What do you do?',
    options: [
      'Wrap the cut in insulation tape and carry on using it',
      'Use it for the rest of the day, then bin it tonight',
      'Take the drill out of service, label it, report it. Get a replacement',
      'Keep using it but avoid touching the damaged section',
    ],
    correctAnswer: 2,
    explanation:
      'Cuts in the sheath = exposed inner conductors waiting to fault. PUWER + EAWR both make this a hard out-of-service. Tape doesn’t restore the original insulation rating. Label it ‘DO NOT USE — DAMAGED’, get it to the tool store / contracts manager, get a replacement.',
  },
  {
    id: 3,
    question: 'A 110 V centre-tap-earthed (CTE) supply on construction sites means:',
    options: [
      'The whole supply runs at 55 V instead of 110 V',
      '110 V between line and earth, halving the shock risk',
      'Each conductor sits at 110 V to earth, the same as line-to-line',
      '55 V to earth from each conductor — so a worst-case shock is 55 V, not 230 V',
    ],
    correctAnswer: 3,
    explanation:
      'CTE = secondary winding centre-tapped to earth. Each conductor is 55 V to earth. If a fault drives a shock current to ground, the path is at 55 V max instead of 230 V — much less likely to fibrillate. That’s why CTE is the de facto rule for site-temporary supplies under BS 7671 Section 704.',
  },
  {
    id: 4,
    question: 'Lone working on electrical jobs is:',
    options: [
      'Allowed for low-risk work if risk-assessed; generally avoided for live work',
      'Completely banned for everyone under the Electricity at Work Regulations',
      'Always fine — an electrician is competent to work alone on anything at all',
      'Only ever permitted if a written permit-to-work is issued each and every time',
    ],
    correctAnswer: 0,
    explanation:
      'HSE INDG73: lone working isn’t illegal but the risk assessment must justify it. For low-risk dead work in occupied premises, fine. For live work, work at height, confined spaces, vacant premises — generally avoided OR backed up by a check-in routine + emergency plan. Apprentices specifically should not be lone-working without competent supervision available.',
  },
  {
    id: 5,
    question: 'Why is fatigue an electrical safety issue and not just a comfort one?',
    options: [
      'It only makes you uncomfortable — it has no real effect on your safety',
      'It impairs reaction time and judgement, so isolation steps get skipped',
      'It just slows you down a bit, so the work simply takes a little longer',
      'It only matters for work at height, not for any electrical work at all',
    ],
    correctAnswer: 1,
    explanation:
      'Fatigue is comparable to alcohol intoxication — research shows 17 hours awake equals roughly 0.05% blood alcohol (over the drink-drive limit in Scotland). That’s the level where you skip a prove-test-prove because ‘it’s fine, it must be off’. HASAWA s.2 + s.7 both apply: turning up unfit for work is YOUR breach as well as the boss’s.',
  },
  {
    id: 6,
    question:
      'Misuse and Drugs Act / company policy aside — what’s the SAFETY reason you don’t go on site under the influence?',
    options: [
      'It’s only about being fair to the other workers on the site',
      'It’s purely a disciplinary matter for the firm, not a safety one',
      'Impaired judgement makes a fatal live-system mistake more likely — s.7 is on you',
      'It mainly just affects your timekeeping and daily productivity',
    ],
    correctAnswer: 2,
    explanation:
      'Live electrical work needs sharp judgment — ‘which breaker am I locking off?’, ‘did I prove the indicator?’, ‘which way did I document the existing wiring?’. Even mild impairment from cannabis, cocaine, prescription opioids, or hangover slows the bit of you that catches a mistake. HASAWA s.7 + company drugs/alcohol policies: positive test = sackable offence and personal liability if anything goes wrong.',
  },
  {
    id: 7,
    question:
      'Your friend at work seems off — quiet, not himself. Mentions he hasn’t slept properly in weeks. He’s about to climb a ladder to a roof junction box. What’s the right move?',
    options: [
      'Say nothing at all — it’s his own business, not really yours to raise',
      'Tell him to just push through it and crack on with the job in hand',
      'Report him straight to the supervisor as unfit and have him sent home',
      'Quietly suggest he takes the job tomorrow and get the supervisor involved',
    ],
    correctAnswer: 3,
    explanation:
      'HASAWA s.7 puts a duty on you to look out for your colleagues’ safety too. Mental health and fatigue are real safety issues — knackered, distracted, low-mood workers are statistically more likely to fall, miss isolation steps, or get injured. Speak up gently. Most companies have an Employee Assistance Programme — flag it to the supervisor without making it a drama.',
  },
  {
    id: 8,
    question: 'PUWER inspections must be:',
    options: [
      'Carried out by a competent person at suitable intervals, with a record kept',
      'Carried out only once, before the equipment first enters service for use',
      'Carried out by anyone who happens to be on site, with no record needed',
      'Carried out annually, by the original manufacturer, on every single tool',
    ],
    correctAnswer: 0,
    explanation:
      'PUWER 1998 Reg 6: ‘competent person’ + ‘suitable intervals’. Records required where the equipment’s use can lead to deterioration (e.g. PAT testing of portable tools every 3-6 months on construction sites). The pre-use visual check is YOURS; the periodic formal inspection is the employer’s, by a competent person.',
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'How long does a pre-use check actually take?',
    answer:
      'On a typical drill / VI / extension lead — under 30 seconds each. Look it over: cracks, cuts, missing guards. Function check: does it spin, does it switch off when you release the trigger, does the LED light when probed. The whole pre-shift kit check should take maybe 5 minutes for everything in your bag. People who say ‘no time’ are the ones who eventually have a serious incident from a tool defect that was sitting there waiting to be found.',
  },
  {
    question: 'My supervisor wants me to do a job alone he wouldn’t do alone. Can I refuse?',
    answer:
      'If the lone-working risk is genuine, yes. HASAWA s.7 + s.44 of the Employment Rights Act 1996 protect you for raising real safety concerns. Don’t make it a fight — flag it: ‘the RAMS for this calls for two people because of X — can we reschedule, or have someone come with me?’. If they push you to do it anyway, log it (date, time, what was said) and escalate above them. Going ahead doesn’t transfer the blame back to them if it goes wrong.',
  },
  {
    question: 'Can I work after a couple of pints at lunch?',
    answer:
      'No. Most construction sites have a zero-tolerance alcohol policy enforced by random testing — that’s not just being mean, it’s because alcohol impairment on a live electrical site is a fast route to a coroner’s court. Even one drink can dull reaction time. Save it for after the tools are back in the van.',
  },
  {
    question: 'I’m on prescription medication that makes me drowsy — what should I do?',
    answer:
      'Tell your supervisor / supervisor BEFORE you start the shift. Most company drug policies treat prescription medication separately from recreational drugs — but the SAFETY issue is the same: drowsy workers near live conductors or up ladders is a foreseeable risk. They may put you on lower-risk tasks for a few days, or arrange supervision. Concealing it doesn’t help — if you have an incident and post-event tests show the medication, you’re in trouble for hiding it AS WELL as for the incident.',
  },
  {
    question: 'Do mental health and stress count as ‘fitness for work’?',
    answer:
      'Yes, increasingly so. The HSE recognises stress and mental ill-health as workplace health issues under HASAWA. Severely stressed, sleep-deprived, or grieving workers make more mistakes — and on a live electrical job, mistakes can kill. Employers should have an Employee Assistance Programme; tap into it. There’s no shame in saying you need a couple of days off the live work — it’s the responsible HASAWA s.7 thing to do.',
  },
  {
    question: 'What if I see a colleague doing something genuinely dangerous?',
    answer:
      'Speak up. HASAWA s.7 puts a duty on you to look after the safety of others affected by your acts AND omissions. Saying nothing when you see a workmate skip lock-off or climb a defective ladder is an OMISSION you can be on the hook for. Pull them aside quietly first; if it continues, tell the supervisor. Most companies treat this as the right thing to do, not snitching.',
  },
];

const checks2 = [
  {
    id: 'l3-m1-s3-sub5-toolbox',
    question: "What's a toolbox talk and why does it matter?",
    options: [
      'A short, informal on-site briefing on a specific safety topic relevant to the current work.',
      'A full-day classroom training course that operatives must complete before being allowed on site.',
      'A written record of every tool issued to an operative, signed for at the start of each shift.',
      "A formal annual review of an operative's competence carried out by the firm's training lead.",
    ],
    correctIndex: 0,
    explanation:
      'Typically 10-15 minutes, required under MHSWR Reg 13 (information), it shows ongoing engagement with safety, and the attendance log is the evidence after an incident that the topic was communicated. L3 supervisors increasingly deliver them on topics such as the hazard of the week, a near-miss lesson, a regulation refresh or an equipment update.',
  },
  {
    id: 'l3-m1-s3-sub5-intervention',
    question: "You see a colleague about to do something unsafe. What's the L3-grade response?",
    options: [
      'Say nothing — it is their job and their responsibility, so let them get on with it.',
      'Wait to see if anything actually goes wrong, then raise it with the supervisor afterwards.',
      'Intervene immediately, politely but clearly, correct the method, document it, and escalate if refused.',
      'Report them to the office immediately without speaking to them, so management can deal with it.',
    ],
    correctIndex: 2,
    explanation:
      "Say \"stop, that's not safe — let's do it differently\" rather than waiting for an incident, and record the intervention and corrected method. Intervention is part of the L3 supervisor's s.7(b) cooperation duty; the peer-to-peer challenge is harder than boss-to-worker but is what stops near-misses becoming incidents.",
  },
  {
    id: 'l3-m1-s3-sub5-observe',
    question:
      'You observe an L2 mate consistently skipping the prove-test-prove step on safe isolation. What do you do?',
    options: [
      'Ignore it as long as the mate has not yet had an accident doing it.',
      'Stop them safely, coach the correct procedure on the spot, document it, notify the lead and follow up.',
      'Take over the isolation yourself every time so the mate never has to do it.',
      'Mention it casually at the next team meeting without identifying the individual.',
    ],
    correctIndex: 1,
    explanation:
      "The sequence is observation + intervention + documentation + follow-up: stop and coach on the spot, record the observation, notify the firm's training/supervision lead so the L2's competence record is updated, then observe future jobs to confirm the correction held. Repeated non-compliance escalates to formal training intervention. Coaching is one of the most valuable and lowest-effort prevention activities.",
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'What’s the legal source of the "safe practices" duty?',
    options: [
      'BS 7671, which is the statutory standard for safe systems of work in electrical installations.',
      'HASAWA s.2(2)(a), backed by EAWR Reg 4, MHSWR Reg 5 and the activity-specific regulations.',
      'The JIB Working Rule Agreement, which sets out the safe practices required of all electricians.',
      'The Construction (Design and Management) Regulations 2015 alone, which apply only to construction sites.',
    ],
    correctAnswer: 1,
    explanation:
      'HASAWA s.2(2)(a) requires "the provision and maintenance of plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health", and the daughter regs (PUWER, COSHH, Work at Height, etc) apply it to each activity. Safe practices are required across the regulatory regime.',
  },
  {
    id: 2,
    question: "What's a Safe System of Work (SSoW)?",
    options: [
      'A list of every tool and material needed for a job, prepared before work starts.',
      'A computer program that automatically generates risk assessments from site photographs.',
      "A formal procedure that identifies a task's hazards and defines safe methods to control them.",
      'A guarantee given to the client that the work will be completed without any accidents.',
    ],
    correctAnswer: 2,
    explanation:
      'It results from systematic examination of the task and is documented in the Method Statement portion of RAMS. Permits-to-work are a specific form of SSoW for high-hazard activity. The SSoW is required under HASAWA s.2(2)(a) and embedded in MHSWR Reg 5 arrangements.',
  },
  {
    id: 3,
    question: "What's a permit-to-work?",
    options: [
      'A licence from the local authority allowing electrical work to be carried out in a dwelling.',
      'A card carried by an operative confirming they are competent to work on a particular site.',
      'A document the client signs to give the contractor access to the premises.',
      'A formal written authorisation defining the work, hazards, controls, authorised people and time period.',
    ],
    correctAnswer: 3,
    explanation:
      'It also sets the sign-off conditions, and is used for high-hazard activity (live working, hot work, confined space, work on safety-critical systems). The issuing authority issues it, the operative signs on, and it is signed off when complete. The L3 operative may be the named person on a permit while the issuing authority signs off the conditions.',
  },
  {
    id: 4,
    question: "What's the role of toolbox talks in the safety system?",
    options: [
      'An ongoing, short, on-site, topic-specific safety communication mechanism with attendance logged.',
      'A formal disciplinary process used when an operative has breached a safety rule.',
      'A one-off induction given to a worker when they first arrive on a new site.',
      'A written test operatives must pass before being issued with their PPE.',
    ],
    correctAnswer: 0,
    explanation:
      'Required under MHSWR Reg 13 (information), topics often respond to recent near-misses, regulation changes, equipment updates or seasonal risks. They turn the abstract safety policy into concrete, recent, relevant communication, and the attendance log is the evidence the topic was delivered.',
  },
  {
    id: 5,
    question: "What's the L3 supervisor's observation duty?",
    options: [
      'To watch the customer to make sure they do not interfere with the work.',
      'To observe operatives, identify and correct unsafe practices, document them and follow up.',
      'To record the time each operative starts and finishes work for payroll purposes.',
      'To inspect the finished installation only, after all the work has been completed.',
    ],
    correctAnswer: 1,
    explanation:
      'The supervisor intervenes immediately, coaches to the correct method, documents and follows up. This is not a "checking up" exercise but part of the firm’s monitoring under MHSWR Reg 5 — the M (Monitor) in the POCMR cycle, and how the firm’s system actually functions in practice.',
  },
  {
    id: 6,
    question: 'How is intervention different from "telling on" a colleague?',
    options: [
      'There is no difference — both mean reporting a colleague to management.',
      'Intervention means staying silent, while "telling on" means raising it with the supervisor.',
      'Intervention is immediate and in-the-moment, focused politely on the unsafe act and its correction.',
      'Intervention is a formal written report, while "telling on" is a casual verbal mention.',
    ],
    correctAnswer: 2,
    explanation:
      'Intervention documents the act and the correction without embarrassing or punishing, and is followed up if the issue recurs; the HSE expects a strong intervention culture in firms with mature safety systems. Intervention is operational and "telling on" is escalation — the L3 supervisor uses intervention first.',
  },
  {
    id: 7,
    question: 'What’s "near-miss culture"?',
    options: [
      'A culture where only serious injuries are recorded, since near-misses are too minor to track.',
      'A culture where the worker responsible for a near-miss is disciplined to deter repeat events.',
      'A culture where near-misses are kept confidential to avoid alarming the rest of the workforce.',
      'A culture in which near-misses are reported, analysed, learned from and used to improve the system.',
    ],
    correctAnswer: 3,
    explanation:
      "It is typically supported by no-blame reporting, structured analysis (e.g. 5-whys), feedback to the team and visible changes in practice. Heinrich's pyramid frames near-misses as the leading indicator of major incidents, and firms with strong near-miss reporting have lower major-incident rates over time.",
  },
  {
    id: 8,
    question: "What's the L3 supervisor's sign-off role on RAMS / SSoW?",
    options: [
      'To verify the RAMS matches the site, brief operatives, confirm understanding and sign as responsible supervisor.',
      'Sign the RAMS without reading it, since it was already approved by a competent person.',
      'Leave the RAMS unsigned until the job is finished, then sign to confirm completion.',
      'Sign the RAMS only if an incident occurs, to confirm the document was in place.',
    ],
    correctAnswer: 0,
    explanation:
      "The signature is evidence the handover was done, and increasingly the L3 contributes to writing RAMS for routine jobs. Sign-off is a verification act, not a formality — the supervisor takes ownership for the day's work plan being safe.",
  },
];

const faqs2 = [
  {
    question: 'Are toolbox talks the same as inductions?',
    answer:
      'No — induction = first-time entry briefing (CDM Reg 13). Toolbox talk = ongoing topic-specific briefing during the work. Both are required mechanisms.',
  },
  {
    question: 'Who can deliver a toolbox talk?',
    answer:
      "Any competent person on the topic — usually supervisor / contracts manager / H&S manager. Increasingly L3 operatives deliver toolbox talks on routine topics they're competent in.",
  },
  {
    question: 'How often should toolbox talks happen?',
    answer:
      'Frequency varies. Common rhythm: weekly on bigger sites, fortnightly otherwise; topic-driven (after near-miss, equipment change, regulation change). Records kept.',
  },
  {
    question: "What's the difference between intervention and bullying?",
    answer:
      'Intervention is task-focused, immediate, polite, focused on the unsafe act and the safe alternative. Bullying targets the person, is repeated, may be aggressive. The HSE actively encourages intervention; ACAS guidance distinguishes from bullying.',
  },
  {
    question: 'How do I document an intervention?',
    answer:
      "Brief note in the job pack — what was happening, what I said, the correction, the follow-up. Doesn't need to be punitive; the focus is the safety improvement, not the colleague's reputation.",
  },
  {
    question: 'What if my intervention is rebuffed by the colleague?',
    answer:
      "Document and escalate. The intervention discharged your s.7(b) duty; the colleague's response is now a separate issue for the supervisor / firm to address. Don't engage in a confrontation; let the system handle the next step.",
  },
  {
    question: 'How is a RAMS different from a SSoW?',
    answer:
      'RAMS (Risk Assessment + Method Statement) is the document; SSoW (Safe System of Work) is the procedure RAMS describes. A RAMS sets out the assessed risks and the method that controls them; the SSoW is what operatives actually follow on the day. Same thing viewed differently — the paperwork and the practice.',
  },
  {
    question: 'What goes wrong when toolbox talks are scripted from a generic template?',
    answer:
      'Operatives switch off because the content is not relevant to their work this week; the attendance log records the talk happened but the firm has not actually communicated anything. Inspectors increasingly probe for engagement after near-misses — what did the talk cover, did operatives understand, what changed. A scripted talk that operatives cannot recall is treated as evidence of culture problem, not as defence.',
  },
  {
    question: "Should the L3 supervisor write the firm's RAMS?",
    answer:
      'L3 increasingly contributes to RAMS for routine jobs and reviews / adapts firm-level RAMS for specific sites. Drafting from scratch is usually a contracts-manager or H&S-manager role on larger firms, but the L3 supervisor on site sees the gaps and feeds them back into the document. The shared authorship is part of the L2 → L3 step.',
  },
  {
    question: 'What does "stop the job" authority mean and who has it?',
    answer:
      'Stop-job authority is the right of any operative to halt work if they see an unsafe condition, without needing permission from a senior. Mature safety cultures actively encourage it; the firm publicly backs the operative who stops, not the production target. The L3 supervisor models this by stopping jobs proactively when they see a serious enough hazard, and by visibly supporting other operatives who do the same.',
  },
  {
    question: 'How long should toolbox-talk records be kept?',
    answer:
      'Common retention is 6 years or the duration of relevant employee employment plus 6 years, whichever is longer. The HSE may request records spanning the period of any incident under investigation. Records of training (Reg 13) are typically kept longer than records of talks (Reg 10 information) because the training duty has a more durable evidentiary requirement.',
  },
];

export default function Lesson303_3_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Pre-use checks, lone working, fatigue, drugs and alcohol, mental fitness for work. The
        daily habits that turn the regs from a textbook into a safe working day.
      </p>

      <TLDR
        points={[
          'Pre-use checks BEFORE every use — PUWER 1998 Reg 6. Tools, leads, ladders, PPE, test gear. 30 seconds each, finds the defect that would have hurt you.',
          'Lone working = risk-assess it. No live work alone, agreed check-in times, emergency plan if you’re hurt and can’t call for help. HSE INDG73.',
          'Fitness for work isn’t optional. Alcohol, drugs, fatigue, mental ill-health all impair the bit of you that catches mistakes. HASAWA s.7 makes it your duty to turn up fit.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Carry out pre-use inspections on tools, leads, ladders, PPE and test instruments — and explain the legal basis.',
          'Explain when and why a 110 V CTE supply is used on construction sites and how it limits shock severity.',
          'Risk-assess lone working and explain when it should be avoided or backed up by a check-in routine.',
          'Recognise the impact of fatigue on safety-critical decisions — and when to flag it.',
          'Explain the safety reasons for drug/alcohol policies and the HASAWA s.7 personal duty to turn up fit for work.',
          'Identify mental health / stress as a safety issue and know what to do for yourself or a colleague.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Pre-use inspections</ContentEyebrow>

      <ConceptBlock
        title="The 30-second check that catches the thing that would have hurt you"
        plainEnglish="Before you pick up any tool, lead, ladder, harness or piece of test gear today, look it over. Cracks, cuts, missing guards, frayed cords, dodgy switches. If anything’s wrong, it goes out of service, not into your hand."
        onSite="Pull the drill out of the bag. Spin the chuck — does it run free? Squeeze the trigger — does it stop instantly when released? Look at the cord head-to-tail — any nicks, exposed copper, melted plastic? PAT test sticker still in date? 30 seconds. Then move to the next thing."
      >
        <p>
          Pre-use checks are the foundation safety habit. They’re what turn ‘the supervisor gave
          me a drill, must be fine’ into ‘I’ve confirmed this drill is safe before I power it on’.
          The legal basis is layered:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>PUWER 1998 Reg 6</strong> — work equipment (drills, MFTs, conduit benders,
            etc.) must be inspected at suitable intervals + after exceptional events. ‘Suitable’
            for daily-use kit means before each use.
          </li>
          <li>
            <strong>EAWR 1989 Reg 4(2) + (4)</strong> — equipment used in electrical work must be
            maintained and properly used. Test gear especially.
          </li>
          <li>
            <strong>WAH 2005</strong> — ladders, towers, MEWPs need pre-use checks before ascent +
            a more formal weekly inspection.
          </li>
          <li>
            <strong>PPER 2022 Reg 10</strong> — you have to check PPE before each use and report
            defects.
          </li>
        </ul>
        <p>
          The check itself is dead simple — visual top-to-bottom plus a function test where
          applicable. What matters is that you actually do it, every time, even when you’re tired
          or rushed. The day you skip it is the day the drill cord with the slow-developing cut
          finally arcs across your hand.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="What ‘competent person’ means at your level"
        plainEnglish="The pre-use visual check is YOUR job. The periodic formal inspection (test, certify, document) is the employer’s job, done by a competent person — usually annual PAT for portable tools, more often on construction sites."
      >
        <p>
          PUWER + EAWR both reference ‘competent person’. At this stage you’re competent
          to do a pre-use visual + function check. You’re NOT competent yet to formally inspect
          and certify electrical kit (e.g. issue a PAT pass label, calibrate an MFT). That comes
          with experience, additional training and the right test equipment.
        </p>
        <p>Typical inspection frequencies on a UK construction site:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Pre-use visual check: every use, by you</li>
          <li>Formal user inspection: weekly or monthly, by you, signed off</li>
          <li>
            PAT test of 110 V tools: every 3 months on construction sites (per IET COP for
            In-Service Inspection)
          </li>
          <li>Calibration of MFT / multimeter: annual, by accredited lab</li>
          <li>
            Dielectric test of insulating gloves (IEC 60903): every 6 months — covered in §4.2
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="PUWER 1998 — Regulation 6 (Inspection)"
        clause="Every employer shall ensure that, where the safety of work equipment depends on the installation conditions, it is inspected after installation and before being put into service for the first time, or after assembly at a new site or in a new location, to ensure that it has been installed correctly and is safe to operate. Where work equipment is exposed to conditions causing deterioration which is liable to result in dangerous situations, every employer shall ensure that it is inspected at suitable intervals."
        meaning={
          <>
            Two parts: <strong>installation inspection</strong> (after a tool is set up somewhere
            new) AND <strong>periodic inspection</strong> at suitable intervals. For day-to-day
            portable kit, ‘suitable intervals’ means before each use as well as the formal
            periodic test. The duty is on the EMPLOYER — but you carrying out the daily check is
            how the employer discharges it.
          </>
        }
        cite="Reference: PUWER 1998 Reg 6 + HSE L22 ACOP"
      />

      <InlineCheck
        id={checks[0].id}
        question={checks[0].question}
        options={checks[0].options}
        correctIndex={checks[0].correctIndex}
        explanation={checks[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The site supply itself</ContentEyebrow>

      <ConceptBlock
        title="Why construction sites use 110 V centre-tap-earthed (CTE)"
        plainEnglish="A reduced-voltage system. The transformer secondary is centre-tapped to earth, so each conductor is only 55 V to earth — much less likely to fibrillate than a 230 V shock."
        onSite="The yellow 110 V tools, the yellow extension leads with the round 16 A connectors, the bright yellow site transformers. All driven by BS 7671 Section 704 — which makes 110 V CTE the recommended supply for portable handheld and movable equipment on construction sites."
      >
        <p>
          On a 230 V single-phase supply, a person making contact with the line conductor and
          earth gets up to 230 V across them. On a 110 V CTE supply, each conductor is only at 55
          V relative to earth — half the system voltage. The same fault that would push a 230 V
          shock through someone now pushes a 55 V shock — well below the lethal current threshold
          for a typical shock duration.
        </p>
        <p>You’ll see CTE supplies on:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Construction sites — site transformer in the welfare cabin, yellow 16 A outlets
            distributed by yellow extension leads
          </li>
          <li>Demolition / refurb — same setup, often more aggressive environment</li>
          <li>
            Outdoor work near water — extra layer of protection on top of the 30 mA RCD
            requirement
          </li>
        </ul>
        <p>
          For final installs in occupied buildings you’ll usually be on the building’s normal 230
          V supply via 30 mA RCD-protected sockets. For temporary site use, CTE is the standard.
          Don’t plug a 230 V tool into a CTE supply (won’t run right) or vice versa (yellow tools
          will damage on 230 V).
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 704.410.3.10 (paraphrased)"
        clause="A circuit supplying a socket-outlet with a rated current up to and including 32 A and any other circuit supplying hand-held electrical equipment with rated current up to and including 32 A shall be protected by: (a) reduced low voltage (Regulation 411.8); or (b) automatic disconnection of supply (Section 411) with additional protection provided by an RCD having the characteristics specified in Regulation 415.1.1; or (c) electrical separation of circuits (Section 413), each socket-outlet and item of hand-held electrical equipment being supplied by an individual transformer or by a separate winding of a transformer; or (d) SELV or PELV (Section 414). NOTE: The reduced low voltage system is strongly preferred for the supply to portable handlamps for general use and portable hand tools and local lighting up to 2 kW."
        meaning={
          <>
            ‘Strongly preferred’ in BS 7671 = the default unless you can justify something else.
            For construction sites (Section 704), reduced LV = 110 V CTE for portable kit. The
            ‘adverse conditions’ wording covers wet, dusty, knocked-about worksite use — exactly
            where 230 V on portable kit becomes especially risky.
          </>
        }
        cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 7 Section 704 Regulation 704.410.3.10 for the full text."
      />

      <SectionRule />

      <ContentEyebrow>Lone working</ContentEyebrow>

      <ConceptBlock
        title="Working alone — when it’s OK and when it isn’t"
        plainEnglish="Lone working isn’t banned — but the moment something goes wrong, no-one’s there to call 999, kill the supply, or stop the bleeding. So the risk has to be assessed and managed."
        onSite="An electrician on a maintenance call to a vacant office at 7 pm to fix a tripped breaker? Probably fine — but agreed check-in with the office, no live work, leave when done. A first-year apprentice sent alone to a tower block basement with no signal to first-fix a CU? Absolutely not — that’s an unsupervised live-supply environment with no rescue plan."
      >
        <p>The HSE’s INDG73 (‘Working alone — Health and safety guidance’) sets out:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Lone working isn’t illegal in itself — but the employer must risk-assess it under
            MHSWR 1999 Reg 3.
          </li>
          <li>
            Higher-risk lone work that should be AVOIDED:
            <ul className="space-y-1 list-disc pl-5 marker:text-elec-yellow/40 mt-1">
              <li>Live electrical work (always two-person minimum)</li>
              <li>Confined space entry</li>
              <li>Work at height above 2 m</li>
              <li>Work with high-risk materials (asbestos, lead, isocyanates)</li>
              <li>Vacant / hostile premises with no rescue plan</li>
            </ul>
          </li>
          <li>
            Lower-risk lone work (e.g. dead-isolated final-fix in an occupied home with the
            customer present) is generally fine if:
            <ul className="space-y-1 list-disc pl-5 marker:text-elec-yellow/40 mt-1">
              <li>The job is risk-assessed</li>
              <li>Agreed check-in / check-out with someone (office, family)</li>
              <li>Mobile signal or alternative emergency communication</li>
              <li>Lone-worker alarm device for higher-risk environments</li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>Apprentices specifically</strong> should not be lone-working without a competent
          person available — either on site or contactable. EAWR Reg 16 ‘competence’ requirement
          effectively rules out unsupervised live-related work for an apprentice.
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

      <ContentEyebrow>Fitness for work</ContentEyebrow>

      <ConceptBlock
        title="Fatigue — the impairment that nobody admits to"
        plainEnglish="Tired, hungover, sleep-deprived workers make the mistakes that kill people on live electrical jobs. ‘Pushing through’ is the wrong call. Speak up before you start, not after the incident."
        onSite="Two consecutive nights of broken sleep + an early start = your reaction time and judgement are measurably worse. Not by a tiny amount — research compares 17 hours awake to roughly the legal drink-drive limit. That’s the level where you skip a prove-test-prove because ‘it must be off’ and find out it wasn’t."
      >
        <p>
          Fatigue isn’t laziness or weakness — it’s a documented physiological state that impairs:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Reaction time (slower to pull a hand back)</li>
          <li>
            Decision-making (more likely to take the shortcut, skip a step, ‘assume’ it’s off)
          </li>
          <li>
            Working memory (forgetting which breaker you locked off, which test you already did)
          </li>
          <li>
            Risk perception (the bit of you that goes ‘hold on, this looks wrong’ goes quiet)
          </li>
          <li>Fine motor control (slipping screwdrivers, dropped tools)</li>
        </ul>
        <p>
          On a live electrical job, every one of those failure modes can turn into an incident.
          HASAWA s.7 puts a duty on YOU to take reasonable care of yourself — that includes
          turning up rested. If you can’t, flag it. ‘Can I be on the dead-isolated stuff today,
          supervisor? I’m running on three hours’ sleep’ is the right conversation. ‘Crack on and
          hope’ is not.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Drugs and alcohol — why every site has zero tolerance"
        plainEnglish="Even mild impairment from alcohol, cannabis, cocaine or opioids slows the part of you that catches a mistake. On a live electrical site that translates directly into shock and arc-flash incidents. Most sites enforce it with random testing."
      >
        <p>
          The combination of impaired judgement + live electrical work is one of the recurring
          causes in HSE fatality reports. Specific issues:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Alcohol</strong> — stays in your system longer than people think. Three pints
            the night before can keep you over the legal drink-drive limit until late morning.
            Even legally ‘sober’, residual impairment on judgement lasts up to 24 hours.
          </li>
          <li>
            <strong>Cannabis</strong> — impairs reaction time, short-term memory and spatial
            awareness for hours. Detectable in saliva for hours, urine for days. Most sites test
            for both.
          </li>
          <li>
            <strong>Cocaine and stimulants</strong> — overconfidence + risk-taking + aggression.
            Specifically dangerous around live conductors where caution is the safety system.
          </li>
          <li>
            <strong>Prescription opioids / sedatives / antihistamines</strong> — many cause
            drowsiness or impair judgement. Disclose to your supervisor BEFORE the shift, not
            after the incident.
          </li>
        </ul>
        <p>
          Every UK construction site of any size has a drugs and alcohol policy backed by random
          testing. Positive test = sent off site, possible dismissal, possible loss of CSCS card.
          More importantly: HASAWA s.7 makes it personally on you — turning up impaired and having
          an incident transfers the legal exposure to YOU as well as to the employer.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Mental health is a safety issue"
        plainEnglish="Severely stressed, depressed, grieving or burnt-out workers are statistically more likely to have accidents. The HSE recognises this. Speaking up isn’t weakness — it’s the s.7 ‘take reasonable care of yourself’ duty in action."
        onSite="If a mate is clearly not himself — quiet, distracted, snappy, mentioning sleep problems or family stress — that’s the moment to have a quiet word. Most companies have an Employee Assistance Programme (EAP) — confidential, often phone-based counselling. Tap into it. Suggest your mate does too."
      >
        <p>
          The construction industry has historically high rates of stress-related illness and one
          of the highest male suicide rates in the UK economy. The HSE has been pushing
          recognition of mental health as an occupational health issue under HASAWA for years.
          From a SAFETY angle:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Distracted workers miss hazards</li>
          <li>Sleep-deprived workers make decision errors (see fatigue, above)</li>
          <li>Workers in crisis sometimes take risks they otherwise wouldn’t</li>
          <li>
            The ‘crack on, lads don’t complain’ culture stops people flagging legitimate
            fitness-for-work concerns
          </li>
        </ul>
        <p>
          HASAWA s.7 covers mental fitness as well as physical. If you’re in a place where you
          can’t safely do live work — say so. Your supervisor should put you on dead-isolated
          tasks, paperwork, deliveries, store work, until you’re right. That’s the responsible
          call, not the weak one.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="HASAWA 1974 — section 7 (Duties on employees)"
        clause="It shall be the duty of every employee while at work to take reasonable care for the health and safety of himself and of other persons who may be affected by his acts or omissions at work."
        meaning={
          <>
            Same regulation we met in §1.1 — applied here to fitness for work. ‘Reasonable care’
            INCLUDES turning up in a fit state to work safely. Drink, drugs, fatigue, mental
            crisis: all have the potential to compromise your ability to discharge the s.7 duty.
            Recognising it and flagging it before you start is the s.7 thing to do; concealing it
            and having an incident is the breach.
          </>
        }
        cite="Reference: HASAWA 1974 s.7; HSE Stress at Work guidance"
      />

      <InlineCheck
        id={checks[2].id}
        question={checks[2].question}
        options={checks[2].options}
        correctIndex={checks[2].correctIndex}
        explanation={checks[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Putting it all together</ContentEyebrow>

      <ConceptBlock title="The before-you-start mental checklist">
        <p>
          Before you put a hand on a single conductor today, run through this — quietly, in your
          head, takes 60 seconds:
        </p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Am I fit for this?</strong> Slept enough? Sober? Not on impairing medication?
            Not in mental crisis? If any answer is no → flag it.
          </li>
          <li>
            <strong>Have I got the RAMS?</strong> Read it, signed it, understands what it says
            about PPE, isolation, lone working, emergency.
          </li>
          <li>
            <strong>Is the kit fit?</strong> Pre-use checks done on tools, leads, ladders, PPE,
            test gear. Anything dodgy → out of service.
          </li>
          <li>
            <strong>Am I working alone?</strong> If yes, is the lone-working plan in place —
            check-in times, comms, emergency. If higher-risk → reschedule with a second person.
          </li>
          <li>
            <strong>Do I have the right PPE for the actual hazard?</strong> Not just ‘some PPE’ —
            the right rating, fitted, in date.
          </li>
          <li>
            <strong>Have I got the GS38 kit + working proving unit?</strong> If you’ll touch test
            probes to a circuit, you need a confirmed-working VI and PU.
          </li>
        </ol>
        <p>
          Six questions. They cost a minute. They’re also the questions an HSE inspector will ask
          if anything goes wrong — much better to have answered them yourself before than under
          cross-examination after.
        </p>
      </ConceptBlock>

      <CommonMistake
        title="Skipping the pre-use check because you used the tool yesterday"
        whatHappens={
          <>
            ‘It was fine when I packed it in the van last night.’ Except overnight in a cold van,
            plastic gets brittle. Sharp metal stuff gets dropped on top of soft stuff. Battery
            contacts corrode. Cable insulation cracks at the cord-grip where it’s been flexed for
            200 jobs. The 30 seconds you didn’t spend this morning is exactly when these things
            would have shown up. Then it goes bang in your hand at 11 am.
          </>
        }
        doInstead={
          <>
            Pre-use visual check, EVERY shift, EVERY tool. Function test where applicable (drill
            spins, RCD pop button works, VI proves on the PU). PUWER Reg 6 puts the legal duty on
            the employer; YOU running the daily check is how the employer discharges it. Build the
            habit so it’s automatic — bag opens, kit gets eyeballed, then it goes to work.
          </>
        }
      />

      <Scenario
        title="The tired apprentice on a lone-working job"
        situation={
          <>
            Friday afternoon, end of a long week. You’ve had bad sleep all week — second child
            just arrived, neither of you has had a full night in two weeks. The supervisor asks
            you to nip out and isolate + replace a faulty MCB at a vacant rental property an hour
            away. ‘Be in and out, easy job, save it for Monday otherwise’. You’re an L2
            apprentice, 6 months in. The property is empty — no tenants in, you’ll be alone.
          </>
        }
        whatToDo={
          <>
            Push back, politely. Three flags here: (a) you’re an apprentice, lone working on
            live-supply environments isn’t appropriate for your competence level (EAWR Reg 16);
            (b) you’re fatigued enough that your reaction time and judgement are impaired (HASAWA
            s.7); (c) it’s a dead-supply environment until proven otherwise — you should have a
            competent person with you for the isolation. The right answer is: ‘can a senior come
            with me, or can it wait until Monday with someone else?’. Most decent supervisors will
            respect that — and the ones who don’t are the ones whose business eventually has a
            serious incident.
          </>
        }
        whyItMatters={
          <>
            This exact pattern — junior worker, end-of-week, ‘easy job’ alone, fatigued — shows up
            in HSE incident reports over and over. The combination is what makes it dangerous, not
            any single factor. Recognising it and pushing back is the s.7 duty in action. ‘Crack
            on’ in this scenario is exactly how first-year apprentices end up in A&E or worse.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Where this section closes — and what comes next</ContentEyebrow>

      <ConceptBlock
        title="PPE, test gear and safe working habits in one paragraph"
        plainEnglish="PPE is the LAST line. The specific PPE for electricians is rated, marked, fitted and replaced. Test gear has its own rules — GS38 — and prove-test-prove every time. All of it is held together by daily safe-working habits — pre-use checks, lone-working judgement, fitness for work."
      >
        <p>
          The formal SAFE ISOLATION PROCEDURE ties this all together — the standard sequence every
          UK electrician uses to take a circuit dead, prove it dead, lock it, and work on it
          safely. It uses the PPE and the test gear covered above, and the daily habits from this
          lesson. Without those foundations, the safe-isolation procedure is just words on paper.
        </p>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Pre-use checks on tools, leads, ladders, PPE, test gear EVERY use. PUWER 1998 Reg 6 + EAWR + WAH + PPER all require it.',
          '110 V CTE on construction sites: each conductor 55 V to earth, halves shock severity vs 230 V. BS 7671 Section 704.',
          'Lone working isn’t banned but must be risk-assessed. No live work alone. Apprentices need competent person available. HSE INDG73.',
          'Fatigue is comparable to alcohol impairment — 17 hours awake ≈ drink-drive limit. HASAWA s.7 makes turning up rested YOUR duty.',
          'Drugs/alcohol policies are about safety, not just discipline. Random testing on most sites. Disclose prescription medication BEFORE the shift.',
          'Mental health is a safety issue — distracted workers miss hazards. Tap into the EAP, look out for mates, swap to dead-only work if you’re not right.',
        ]}
      />

      {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

      <Quiz title="Safe working practices knowledge check" questions={quizQuestions} />

      {/* ── Prev / next nav ─────────────────────────────────── */}

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        {
          'Remember from L2 — follow safe practices. At L3 you start running the safety system on a small site — toolbox talks, RAMS sign-off, observation, intervention, near-miss culture.'
        }
      </p>

      <TLDR
        points={[
          'Safe System of Work (SSoW) is the documented safe procedure for a task. RAMS is the typical expression. Permits-to-work formalise SSoW for high-hazard activity.',
          'Toolbox talks (MHSWR Reg 13 information duty) are the ongoing on-site safety communication mechanism. L3 increasingly delivers them.',
          "Observation + intervention + documentation + follow-up is the L3 supervisor's safety-system contribution. Near-miss culture is the high-impact preventive practice.",
          "Behavioural safety addresses why operatives don't follow procedure even when they know it — time pressure, peer pressure, complacency, fatigue, optimism bias.",
          'Incident investigation uses 5-whys, fishbone or Swiss-cheese frameworks; output is system change, not blame allocation.',
          'Heinrich pyramid: ~300 near-misses : 30 minor : 1 serious. Near-miss reporting is the master leading indicator predicting everything else.',
        ]}
      />
      <LearningOutcomes
        outcomes={[
          'Describe and demonstrate safe practices and procedures for use of equipment and materials in electrical-trade work environments.',
          'Identify the legal sources — HASAWA s.2(2)(a), EAWR Reg 4, MHSWR Reg 5, daughter regs.',
          'Apply the Safe System of Work concept and identify when permits-to-work are appropriate.',
          'Deliver and record toolbox talks per MHSWR Reg 13 information duty.',
          "Apply the L3 supervisor's observation and intervention practice on site.",
          'Recognise the value of near-miss reporting and analysis culture.',
          'Apply the HSG65 POCMR management cycle and identify the L3 contribution to each layer.',
          'Apply the statutory hierarchy of control (MHSWR Reg 4 + Schedule 1) and treat PPE as a last resort.',
          'Map daily site activities to the regulations they discharge and articulate the safety case in regulation language.',
          'Recognise common behavioural failure modes and apply behavioural-safety interventions.',
          'Conduct 5-whys / fishbone / Swiss-cheese analyses of near-misses and incidents.',
          'Distinguish leading from lagging safety indicators and weight near-miss reporting as the master leading indicator.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Safe System of Work (SSoW)</ContentEyebrow>
      <ConceptBlock
        title="The documented safe procedure"
        plainEnglish="A SSoW is a procedure resulting from systematic examination of a task — what are the hazards, what are the controls, what's the safe sequence, who's authorised. RAMS is the typical documented expression. Permits-to-work formalise SSoW for high-hazard activity (live working, hot work, confined space)."
        onSite="Every job has a SSoW even if not formally written down. The L3 supervisor's job is to make sure the SSoW is documented (RAMS), briefed (toolbox), followed (observation) and signed off (sign-on/sign-off where permits apply)."
      >
        <p>Common electrical-trade SSoWs:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Safe isolation</strong> — prove-test-prove + lock-off + tag-out (EAWR Reg 13).
          </li>
          <li>
            <strong>Live working</strong> — Reg 14 three-test + permit-to-work + insulating PPE +
            second person.
          </li>
          <li>
            <strong>Confined space entry</strong> — risk assessment + permit + atmosphere
            monitoring + rescue plan + standby person.
          </li>
          <li>
            <strong>Hot work</strong> — permit + fire watch + extinguisher + cooling-off period.
          </li>
          <li>
            <strong>Working at height</strong> — WAH risk assessment + collective protection +
            harness as last resort.
          </li>
          <li>
            <strong>Excavation / underground services</strong> — service detection + safe digging
            method + permits if appropriate.
          </li>
          <li>
            <strong>Manual handling of heavy items</strong> — TILE assessment (Task, Individual,
            Load, Environment); mechanical aid preferred; team lift defined.
          </li>
          <li>
            <strong>Cable pulling through voids</strong> — sometimes a confined-space SSoW
            depending on void geometry and atmospheric risk.
          </li>
          <li>
            <strong>Hot-work near combustible materials</strong> — fire watch retained for at
            least 30 minutes after work ceases; CO2 extinguisher present.
          </li>
          <li>
            <strong>Working on or near live HV plant</strong> — Senior Authorised Person regime;
            HSE HSG230 / G39 / industry-specific SAP procedures.
          </li>
          <li>
            <strong>Work in occupied premises</strong> — public protection arrangements, signage,
            scheduling, communication with occupants.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The Reg 14 three-test in writing — why each limb matters separately"
        plainEnglish="Where live working is genuinely proposed under EAWR Reg 14, all three limbs of the test must be addressed and recorded in writing. (a) it is unreasonable in all the circumstances for the equipment to be dead; (b) it is reasonable in all the circumstances for the operative to be at work on or near it while it is live; (c) suitable precautions are taken to prevent injury. The HSE reads each limb as a separate gate. Failing any one means dead working is required."
        onSite="Practical drafting: each limb gets its own short paragraph in the permit. (a) describes why isolation is impractical (diagnostic test that requires energised system; safety-critical service that cannot be interrupted; etc). (b) describes why the operative’s exposure is justified (skill level, equipment in place, supervision). (c) lists the precautions (insulating PPE, insulated tools, second person, restricted approach, fire watch). Drafting in this structured way creates the defence narrative if the work is later challenged."
      >
        <p>Reg 14 three-test in practice:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Limb (a) — unreasonable to be dead</strong> — work cannot reasonably be done
            with the equipment isolated. Diagnostic / fault-finding sometimes meets; routine
            install almost never.
          </li>
          <li>
            <strong>Limb (b) — reasonable to be live</strong> — risk justified by benefit;
            customer convenience alone does not justify.
          </li>
          <li>
            <strong>Limb (c) — suitable precautions</strong> — insulating PPE, insulated tools,
            second person, permit, restricted access, fire watch — all controls actually in place
            not just specified.
          </li>
          <li>All three required; failing any limb means dead working is required.</li>
          <li>
            Documentation of the three-test reasoning is the principal defence if challenged.
          </li>
          <li>
            Reg 14 sits inside the wider EAWR regime — Reg 4 (system safe), Reg 13 (isolation
            precautions), Reg 16 (competence).
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="HASAWA 1974 — s.2(2)(a)"
        clause={
          <>
            "Without prejudice to the generality of an employer’s duty under the preceding
            subsection, the matters to which that duty extends include in particular — (a) the
            provision and maintenance of plant and systems of work that are, so far as is
            reasonably practicable, safe and without risks to health."
          </>
        }
        meaning={
          <>
            The legal source of the SSoW duty. &quot;Systems of work&quot; is the umbrella term
            for the documented safe procedures. SFAIRP applies — the duty is to make them as safe
            as reasonably practicable.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.2."
      />

      <InlineCheck {...checks2[0]} />

      <SectionRule />
      <ContentEyebrow>Toolbox talks and information duty</ContentEyebrow>
      <ConceptBlock
        title="MHSWR Reg 13 — the information duty operationalised"
        plainEnglish="Reg 13 requires the employer to provide employees with comprehensible and relevant information on H&S risks identified by the assessment, the preventive and protective measures, and procedures referred to in MHSWR Reg 8. Toolbox talks are the standard delivery mechanism."
        onSite="A 10-minute talk before work starts on Monday morning, on the topic most relevant to the week's work (silica dust this week, working at height next week, near-miss from last week's job the week after). Attendance log signed; topic noted; any actions captured."
      >
        <p>Effective toolbox-talk topics for an electrical contractor:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Recent near-miss from this team / firm.</li>
          <li>Seasonal hazards (winter — slip, ice, dark; summer — heat in lofts).</li>
          <li>Equipment update (new RCD tester, new harness model).</li>
          <li>Regulation change (BS 7671 amendment, BSA 2022 update).</li>
          <li>Specific high-hazard activity due this week.</li>
          <li>Customer / client-specific procedures (hospital site, school site).</li>
          <li>
            Refresh on basics that are showing slippage (PPE compliance, near-miss reporting).
          </li>
          <li>Lessons from a recent HSE prosecution in the trade.</li>
          <li>Mental-health / fatigue / wellbeing topic.</li>
          <li>Customer-specific safety induction reminder.</li>
          <li>Drug and alcohol policy reminder where appropriate.</li>
          <li>Travelling-worker hazards (vehicle defects, route planning).</li>
          <li>New tool training — manufacturer&apos;s instructions and pre-use checks2.</li>
          <li>Substance changes — new product introduced, old product withdrawn.</li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="MHSWR 1999 — Reg 13(1) (Capabilities and training)"
        clause={
          <>
            "Every employer shall, in entrusting tasks to his employees, take into account their
            capabilities as regards health and safety. Every employer shall ensure that his
            employees are provided with adequate health and safety training — (a) on their being
            recruited into the employer’s undertaking; and (b) on their being exposed to new or
            increased risks because of — (i) their being transferred or given a change of
            responsibilities within the employer’s undertaking, (ii) the introduction of new work
            equipment into or a change respecting work equipment already in use within the
            employer’s undertaking, (iii) the introduction of new technology into the employer’s
            undertaking, or (iv) the introduction of a new system of work into or a change
            respecting a system of work already in use within the employer’s undertaking."
          </>
        }
        meaning={
          <>
            Reg 13 is the training duty (companion to the information duty in Reg 10). Toolbox
            talks discharge ongoing training as work changes. The capability assessment under Reg
            13(1) is what the L3 supervisor does informally every time they brief a team.
          </>
        }
        cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 13."
      />

      <InlineCheck {...checks2[1]} />

      <SectionRule />
      <ContentEyebrow>Observation, intervention and near-miss culture</ContentEyebrow>
      <ConceptBlock
        title="Eyes on site = system in practice"
        plainEnglish="The L3 supervisor's observation is what turns the written safety policy into actual on-site protection. Watch operatives at work; spot unsafe practices; intervene immediately; coach to the safe method; document; follow up. Not surveillance — operational monitoring under MHSWR Reg 5 (the M in POCMR)."
        onSite="The L3 supervisor's value isn't issuing PPE or signing RAMS; it's the moment-to-moment intervention that prevents the next incident. Polite, immediate, focused on the act and the safe alternative. Builds the team's habit of noticing."
      >
        <p>Intervention in practice:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            See the unsafe act → speak immediately, calmly: &quot;stop, that&apos;s not safe —
            let&apos;s do it this way&quot;.
          </li>
          <li>Coach the safe method on the spot — show, don&apos;t just tell.</li>
          <li>Confirm the operative understood and will continue safely.</li>
          <li>Note in the job pack: time, situation, intervention, correction.</li>
          <li>If the issue is likely to recur, follow up next day / next week.</li>
          <li>
            If repeated non-compliance, escalate to the firm&apos;s training / H&amp;S lead for
            formal action.
          </li>
          <li>
            Recognise the operative who challenged themselves (self-correction) without prompting
            — visible appreciation builds the habit.
          </li>
          <li>
            Use the intervention as a learning moment for the wider team where appropriate —
            generalise the lesson while protecting the individual.
          </li>
          <li>
            Maintain calibration with the firm&apos;s expectations — what counts as a stop-the-job
            vs a coach-and-continue?
          </li>
          <li>
            Avoid the &apos;perfection trap&apos; — prioritise interventions on the highest-risk
            acts; don&apos;t exhaust the team with constant minor corrections.
          </li>
          <li>
            Watch for the &apos;observer effect&apos; — operatives behave differently when they
            know they are watched; vary timing and approach.
          </li>
          <li>
            Triangulate observations with records and operative self-reports for the fullest
            picture.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Near-miss culture"
        plainEnglish="Near-misses (events that could have caused injury but didn't) are the leading indicator of where the next incident will happen. Reporting, analysing and learning from them is the highest-impact preventive practice. Heinrich's pyramid (300:30:1 near-misses to minor to serious) frames the proportionality."
        onSite="L3 supervisors model the behaviour: report your own near-misses, encourage colleagues to report theirs, treat reports without blame, feed back lessons to the team, visibly change practice when learning emerges. The culture is built one report at a time."
      >
        <p>Elements of a strong near-miss culture:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>No-blame reporting environment.</li>
          <li>Easy reporting mechanism (form, app, verbal-then-logged).</li>
          <li>Structured analysis (5-whys, simple root-cause).</li>
          <li>Feedback to the team — &quot;here&apos;s what we learned&quot;.</li>
          <li>Visible changes in practice driven by lessons.</li>
          <li>Celebrate reporting (the report, not the near-miss itself).</li>
          <li>Trend tracking — what categories are emerging?</li>
          <li>Confidential reporting channel for sensitive issues.</li>
          <li>Reports closed-out with a recorded outcome — not left as unresolved entries.</li>
          <li>Periodic review of unresolved trends with the firm&apos;s H&amp;S manager.</li>
          <li>
            Operatives can see the rate of reporting and the response time as a published metric.
          </li>
          <li>Supervisor reports own near-misses publicly to model the behaviour.</li>
          <li>Discipline reserved for wilful breach not for honest reports.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks2[2]} />

      <SectionRule />
      <ContentEyebrow>Permits, behavioural safety and incident learning</ContentEyebrow>
      <ConceptBlock
        title="Permit-to-work — formalising the SSoW for high-hazard activity"
        plainEnglish="A permit is a written authorisation that defines work scope, hazards, controls, named personnel, time period and sign-off conditions. Used for live working (EAWR Reg 14), confined space, hot work, work on safety-critical systems, multi-source isolation. Issued by the Issuing Authority; signed-on by the operative; signed-off when complete and safe to restore."
        onSite="The L3 may be the named operative on a permit. Read it carefully before sign-on; query anything unclear; refuse to sign if the conditions don’t match the actual site. The permit is the legal record; signing accepts the conditions."
      >
        <p>Permit components:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Work description</strong> — precise scope; what&apos;s in, what&apos;s out.
          </li>
          <li>
            <strong>Location</strong> — specific equipment / area.
          </li>
          <li>
            <strong>Hazards identified</strong> — energy sources, substances, environmental.
          </li>
          <li>
            <strong>Isolation / control measures</strong> — what&apos;s done, by whom, when.
          </li>
          <li>
            <strong>Named personnel</strong> — operatives authorised; competence verified.
          </li>
          <li>
            <strong>PPE specified</strong> — required kit for this work.
          </li>
          <li>
            <strong>Time period</strong> — start, end, validity (often shift-bounded).
          </li>
          <li>
            <strong>Issuing Authority</strong> — competent person who controls the permit.
          </li>
          <li>
            <strong>Sign-on</strong> — operative confirms understanding and acceptance.
          </li>
          <li>
            <strong>Sign-off</strong> — work complete; equipment safe to restore.
          </li>
          <li>
            <strong>Unique reference number</strong> — for the firm&apos;s permit register and
            traceability.
          </li>
          <li>
            <strong>Cross-references</strong> — to RAMS, isolation certificates, related permits
            where work is multi-discipline.
          </li>
          <li>
            <strong>Emergency procedures</strong> — what to do if conditions change; how to
            contact the Issuing Authority outside hours.
          </li>
          <li>
            <strong>Standby / safety observer</strong> — second competent person named where the
            activity demands.
          </li>
          <li>
            <strong>Retention</strong> — typically 3+ years; longer for permits relating to
            safety-critical or fatal-injury-risk activity.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Behavioural safety — the ’just do it’ layer above procedure"
        plainEnglish="Procedure tells you WHAT to do; behavioural safety addresses WHY operatives sometimes don’t do it. Time pressure, peer pressure, complacency from familiarity, fear of looking incompetent, fatigue. Mature safety cultures address behaviour as well as procedure."
        onSite="The L3 supervisor has more behavioural influence than they realise. Visibly modelling safe behaviour, calling out shortcuts (your own and others’), treating safety as the first priority not the ’tick after I get the work done’ — all shape what the team does when no-one’s watching."
      >
        <p>Common behavioural failure modes:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Time pressure</strong> — &quot;skip step to make the deadline&quot;.
          </li>
          <li>
            <strong>Peer pressure</strong> — &quot;everyone else is doing it this way&quot;.
          </li>
          <li>
            <strong>Complacency</strong> — &quot;done this 1000 times, it&apos;s fine&quot;.
          </li>
          <li>
            <strong>Fear of looking incompetent</strong> — won&apos;t ask, won&apos;t check.
          </li>
          <li>
            <strong>Fatigue</strong> — late shift, long week, judgement degraded.
          </li>
          <li>
            <strong>Goal conflict</strong> — production targets vs safety conscience.
          </li>
          <li>
            <strong>Optimism bias</strong> — &quot;won&apos;t happen to me&quot;.
          </li>
          <li>
            <strong>Authority bias</strong> — &quot;the supervisor said it&apos;s fine&quot;
            over-riding own judgement.
          </li>
          <li>
            <strong>Sunk-cost fallacy</strong> — &quot;I&apos;ve nearly finished, may as well
            crack on&quot;.
          </li>
          <li>
            <strong>Diffusion of responsibility</strong> — &quot;someone else will spot it&quot;.
          </li>
          <li>
            <strong>Normalisation of deviance</strong> — small shortcuts accepted over time until
            they feel routine.
          </li>
          <li>
            <strong>Availability bias</strong> — recent vivid event over-weights perceived
            likelihood of recurrence; old hazards under-weighted.
          </li>
          <li>
            <strong>Confirmation bias</strong> — looking for evidence the work is going well;
            ignoring evidence it isn&apos;t.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Incident investigation — root cause and lessons learned"
        plainEnglish="After any incident or significant near-miss, structured investigation. Not blame-finding — fact-finding and learning. Common methods: 5-whys (drill down through causation chain), fishbone diagram (Ishikawa, multiple contributing categories), Swiss cheese model (multiple barrier failures aligned). Output: lessons learned, action plan, system change."
        onSite="The L3 supervisor often contributes to investigations as the closest competent observer. Provide contemporaneous account; participate in 5-whys; help identify the system change that prevents recurrence. The lessons should travel through the firm — not just stay in the file."
      >
        <p>5-whys example for a near-miss:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>What happened</strong> — operative received shock from supposedly-isolated
            circuit.
          </li>
          <li>
            <strong>Why 1</strong> — circuit was live when operative touched it.
          </li>
          <li>
            <strong>Why 2</strong> — voltage indicator gave false dead reading.
          </li>
          <li>
            <strong>Why 3</strong> — indicator&apos;s battery was low; second-prove step skipped.
          </li>
          <li>
            <strong>Why 4</strong> — operative under time pressure; &quot;just one circuit&quot;
            mindset.
          </li>
          <li>
            <strong>Why 5</strong> — supervisor brief framed the day&apos;s plan as &quot;quick
            run-through&quot; setting wrong tone.
          </li>
          <li>
            <strong>Action</strong> — reframe brief language; reinforce procedure non-negotiables;
            battery check on indicators issued.
          </li>
          <li>
            <strong>Verification</strong> — re-audit at 4 weeks and 12 weeks; confirm new
            behaviour embedded.
          </li>
          <li>
            <strong>Communication</strong> — anonymised lesson shared across all teams via toolbox
            talk and firm intranet.
          </li>
          <li>
            <strong>Closure</strong> — investigation report signed and dated; actions tracked to
            completion; recurrence monitored.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Heinrich’s pyramid and the leading-indicator principle"
        plainEnglish="Heinrich’s 1931 study suggested a ratio of ~300 near-misses : 30 minor injuries : 1 serious / fatal. The exact numbers debated since; the principle stands — near-misses are leading indicators, fatal incidents are lagging. Acting on near-misses prevents the rarer events."
        onSite="Firms that focus only on lost-time injury statistics miss the leading indicators. The L3 supervisor encouraging near-miss reporting (and the firm’s response to those reports) is what shifts the safety culture from reactive to preventive."
      >
        <p>Leading vs lagging indicators:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Leading (predictive)</strong> — near-misses, observation findings,
            intervention rates, training currency, audit scores.
          </li>
          <li>
            <strong>Lagging (reactive)</strong> — lost-time injuries, RIDDOR reports,
            prosecutions, claim costs.
          </li>
          <li>Mature safety systems track both; lead with leading indicators.</li>
          <li>Reporting culture is THE leading indicator that predicts everything else.</li>
          <li>
            Heinrich&apos;s exact ratios disputed; the principle (frequent low-severity events
            precede rare serious ones) holds.
          </li>
          <li>
            Reporting rate over time is itself a measurable trend — sudden drops in reporting
            often signal cultural change, not actual reduction in events.
          </li>
          <li>
            Insurance loss ratios are a useful lagging indicator for the commercial side of safety
            performance.
          </li>
          <li>
            Toolbox-talk attendance and engagement are intermediate indicators between leading and
            lagging.
          </li>
          <li>
            HSG65 explicitly advocates leading-indicator focus as part of mature safety
            management.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Provision and Use of Work Equipment Regulations 1998 — Reg 4(1)"
        clause={
          <>
            "Every employer shall ensure that work equipment is so constructed or adapted as to be
            suitable for the purpose for which it is used or provided."
          </>
        }
        meaning={
          <>
            PUWER Reg 4 sits behind every SSoW that involves work equipment. The L3 supervisor
            verifying that the access platform, the cable puller, the rotary hammer, the
            multi-function tester or the test lead set is suitable for THIS job is discharging Reg
            4 in practice. Suitability covers initial selection (Reg 4), ergonomic position (Reg
            4(3)), specific risks (Reg 7), instructions (Reg 8) and inspection (Reg 6) — all
            converging in the toolbox-talk and pre-use check.
          </>
        }
        cite="Source: Provision and Use of Work Equipment Regulations 1998 (SI 1998/2306), Reg 4."
      />

      <SectionRule />
      <CommonMistake
        title="Watching unsafe practice and not intervening"
        whatHappens={
          <>
            L3 supervisor sees an L2 mate skipping safe-isolation steps; doesn&apos;t intervene
            because &quot;they&apos;ll learn&quot;. Two weeks later the L2 has a shock from a
            circuit they assumed was isolated. HSE prosecution; firm under EAWR Reg 13/16; L3
            supervisor under HASAWA s.7 (failure to intervene where they had the duty to do so).
          </>
        }
        doInstead={
          <>
            Intervene immediately. Coaching is part of the s.7(b) co-operation duty. Failure to
            intervene where you saw the unsafe act AND had the responsibility to act is a personal
            s.7 failure.
          </>
        }
      />

      <CommonMistake
        title="Treating toolbox talks as a tick-box exercise"
        whatHappens={
          <>
            Firm runs &quot;toolbox talk&quot; by reading out a generic page from a folder; no
            engagement; no Q&amp;A; attendance signed but no understanding tested. Inspector
            reviews after near-miss; sees the talks happened on paper but operatives can&apos;t
            recall content; concludes information duty not effectively discharged.
          </>
        }
        doInstead={
          <>
            Make talks relevant — recent near-miss, this week&apos;s work, recent regulation
            change. Encourage Q&amp;A. Test understanding informally (&quot;so what would you do
            if X?&quot;). Records reflect what was actually discussed.
          </>
        }
      />

      <Scenario
        title="Running the safety system on a small fit-out"
        situation={
          <>
            You're leading a team of two L2 apprentices and one mate on a 5-day commercial
            small-power install. Day 1 you arrive on site with the customer-issued construction
            phase plan and your firm’s RAMS. The customer’s site induction is complete. You need
            to run the safety system for the project.
          </>
        }
        whatToDo={
          <>
            Day 1: 15-minute briefing — walk through RAMS with the team, identify the day&apos;s
            tasks, brief on key hazards (cable pulls through tight ceiling void today), confirm
            everyone has the right PPE, brief location of first-aid kit and AED, brief emergency
            procedure. Document attendance. Day 1 end: 5-minute debrief — anything go wrong today?
            Any near-miss? What&apos;s tomorrow look like? Day 2: short toolbox talk topic
            relevant to the day&apos;s work (working at height because tomorrow involves the
            upper-level cable runs) — 10 minutes; then on with the work. Throughout the day:
            observation. Spot the L2 reaching for tools without checking the platform was stable;
            intervene calmly; coach. Document. Mid-week: review of any near-misses; brief the team
            on lessons. End of week: written close-out summary feeding back to firm&apos;s safety
            system. Throughout: maintain attendance logs, RAMS sign-offs, near-miss log entries.
            The system runs through you, not despite you.
          </>
        }
        whyItMatters={
          <>
            This is what L3 supervisor work actually looks like in practice. The RAMS, toolbox
            talks, observation, intervention and documentation aren&apos;t separate activities —
            they&apos;re one integrated system that the L3 supervisor runs. Each individual
            element is small (5-15 minutes); together they are how the firm&apos;s safety policy
            becomes actual on-site protection. The HSE inspector reviewing your project records
            months later sees the integrated system or sees a paper trail with no substance behind
            it.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>Permit-to-work in depth — the live working defence</ContentEyebrow>

      <ConceptBlock
        title="The Reg 14 permit — paperwork that protects everyone in the chain"
        plainEnglish="When EAWR Reg 14 live working is genuinely justified, the permit-to-work is the documentary heart of the defence. It records that the three-test was applied, by whom; lists the specific precautions in place; names the operatives authorised; states the time window; provides sign-on and sign-off. A live-working incident without a permit is a Reg 14 breach almost automatically; an incident with a properly-executed permit puts the dutyholder in a much stronger position."
        onSite="The L3 supervisor as named operative on a Reg 14 permit reads every line before signing. If a precaution isn’t in place, or the working time has passed, or the named issuing authority isn’t on site, refuse to sign and escalate. Signing accepts the responsibility for the conditions described. Most permits are issued by the firm’s technical manager or a director with electrical authority."
      >
        <p>What a Reg 14 permit-to-work contains:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Permit number and issue date</strong> — unique reference for the firm&apos;s
            records.
          </li>
          <li>
            <strong>Three-test reasoning</strong> — explicit justification for each of the Reg
            14(a), (b), (c) limbs.
          </li>
          <li>
            <strong>Description of the work</strong> — precise scope; specific circuits or
            equipment.
          </li>
          <li>
            <strong>Hazards identified</strong> — voltage, current, arc-flash energy, proximity
            hazards, environmental factors.
          </li>
          <li>
            <strong>Precautions in place</strong> — insulating mat, insulated tools, arc-flash
            PPE, second person, restricted access cordon, fire watch.
          </li>
          <li>
            <strong>Named operatives</strong> — competence verified; signed sign-on.
          </li>
          <li>
            <strong>Standby / safety observer</strong> — second person identified and competent.
          </li>
          <li>
            <strong>Time period</strong> — start, end, validity (typically shift-bounded).
          </li>
          <li>
            <strong>Issuing authority</strong> — named senior person with authority to issue and
            revoke.
          </li>
          <li>
            <strong>Sign-on by operatives</strong> — accepting the conditions.
          </li>
          <li>
            <strong>Sign-off on completion</strong> — work complete, equipment safe to restore,
            permit closed.
          </li>
          <li>
            <strong>Retention</strong> — typically 3+ years with the firm&apos;s safety records.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Electricity at Work Regulations 1989 — Reg 13"
        clause={
          <>
            &quot;Adequate precautions shall be taken to prevent electrical equipment, which has
            been made dead in order to prevent danger while work is carried out on or near that
            equipment, from becoming electrically charged during that work if danger may thereby
            arise.&quot;
          </>
        }
        meaning={
          <>
            Reg 13 — the isolation duty. &quot;Adequate precautions&quot; in practice means the
            prove-test-prove sequence, lock-off, tag-out, named-operative accountability, and
            procedure for restoration. The phrase &quot;during that work&quot; covers the entire
            period of exposure — not just the moment of isolation. Any inadvertent re-energisation
            during the work is a Reg 13 failure regardless of how careful the initial isolation
            was.
          </>
        }
        cite="Source: Electricity at Work Regulations 1989 (SI 1989/635), Reg 13."
      />

      <SectionRule />
      <ContentEyebrow>Confined Spaces — separate regs, separate competence</ContentEyebrow>

      <ConceptBlock
        title="Why a switchroom can be a ’confined space’ under the 1997 Regulations"
        plainEnglish="The Confined Spaces Regulations 1997 define confined space by reasonably foreseeable specified risk — risk of serious injury from fire / explosion, loss of consciousness, drowning, asphyxiation due to gas / vapour / dust or oxygen deficiency. A space doesn’t have to be a tank or a sewer — a small switchroom with insufficient ventilation during a fault arc, a transformer chamber, a cable-pulling pit, an underfloor void below a server room can all qualify. Once a space is confined, work cannot proceed without (a) avoidance where reasonably practicable, (b) safe system of work with emergency arrangements, (c) competent personnel."
        onSite="At L3 the most common confined-space exposure is cable pulling in service voids and pit work. The reflex on any unfamiliar enclosed space: ask whether the reasonably foreseeable specified risk is present. If yes, the work needs a competent risk assessment, a confined-space permit, gas testing where indicated, harness and tripod recovery arrangements, and a competent emergency response plan. Walking in casually is the failure mode the HSE has prosecuted repeatedly."
      >
        <p>What the Confined Spaces Regulations require:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Reg 4 — duty to avoid entry where reasonably practicable</strong> — cable pull
            from outside, remote inspection, redesign the work.
          </li>
          <li>
            <strong>Reg 4(2) — safe system of work where entry unavoidable</strong> — risk
            assessment, ventilation, atmospheric testing, communication.
          </li>
          <li>
            <strong>Reg 5 — emergency arrangements</strong> — rescue plan, equipment, trained
            personnel, communication; not reliant on fire and rescue service.
          </li>
          <li>
            <strong>Competence</strong> — operative trained in confined-space entry; attendant
            outside; rescue team available.
          </li>
          <li>
            <strong>Permit-to-work</strong> — typical for any confined-space entry; names
            personnel, controls, time window.
          </li>
          <li>
            <strong>Gas testing</strong> — before entry and during; portable multi-gas detector
            with O₂, LEL, CO, H₂S minimum.
          </li>
          <li>
            <strong>Ventilation</strong> — mechanical where natural inadequate.
          </li>
          <li>
            <strong>Recovery equipment</strong> — harness + lanyard + tripod / davit; never expect
            to physically lift an unconscious casualty out by hand.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Swiss-cheese model — why most incidents are multiple-barrier failures"
        plainEnglish="James Reason’s Swiss-cheese model frames every incident as a sequence of barriers (defences) with holes. Holes appear because of latent conditions (poor design, inadequate training, resource gaps) and active failures (an operative’s error). An incident occurs when the holes line up. The implication is that almost no serious incident is the fault of a single operative — there are always multiple barriers in place, and the operative’s error is the final hole, not the only hole. Investigation that focuses on the operative misses the latent conditions that allowed the hole to appear. Investigation that surfaces the latent conditions allows them to be fixed, reducing the chance of the next alignment."
        onSite="The L3 supervisor applies this thinking to every near-miss and incident. The operative who skipped the second prove on a voltage indicator is the active failure; the latent conditions might include unclear training, time-pressured briefings, an indicator design that doesn’t signal low battery, a culture that tolerates shortcuts. Each latent condition is a hole to be closed. Closing them is what reduces risk across the firm, not just at this single jobsite."
      >
        <p>Swiss-cheese model elements:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Barriers / defences</strong> — design controls, engineering controls,
            procedures, training, supervision, PPE.
          </li>
          <li>
            <strong>Holes</strong> — gaps, weaknesses, missing or degraded controls.
          </li>
          <li>
            <strong>Latent conditions</strong> — long-standing issues that create holes; not
            visible until an incident reveals them.
          </li>
          <li>
            <strong>Active failures</strong> — the operative&apos;s error or shortcut that
            triggers the event.
          </li>
          <li>
            <strong>Alignment</strong> — incident occurs when holes line up across barriers.
          </li>
          <li>
            <strong>Defence-in-depth</strong> — multiple barriers so any single alignment does not
            produce the event.
          </li>
          <li>
            <strong>Investigation focus</strong> — find and close latent holes, not punish active
            failure.
          </li>
          <li>
            <strong>Resilience</strong> — barriers degrade over time; periodic review refreshes
            them.
          </li>
          <li>
            <strong>Culture</strong> — the meta-barrier; affects every other barrier&apos;s
            effectiveness.
          </li>
        </ul>
      </ConceptBlock>

      <Scenario
        title="Running a 5-whys investigation after a near-miss"
        situation={
          <>
            One of your team has reported a near-miss: while ascending a step-up to terminate
            cables at a high-level cable tray, the step-up shifted under their weight. They caught
            themselves on the tray and avoided a fall. No injury, no damage. The operative
            reported it the same afternoon. You are the L3 supervisor and the firm&apos;s H&amp;S
            manager has asked you to run an initial 5-whys analysis at the end of the working day.
          </>
        }
        whatToDo={
          <>
            Gather the operative who reported, the operative who was working alongside, and the
            supervisor who briefed the team. Quiet space, 15-20 minutes. Open with the principle —
            this is a no-blame review aimed at preventing recurrence; no-one is being disciplined.
            State the event: &apos;step-up shifted while operative was ascending&apos;. Start the
            5-whys. Why 1 — the step-up shifted. Why? Because one of the rubber feet had worn and
            the step-up was unstable on the polished concrete floor. Why 2 — the rubber foot was
            worn. Why? Because the equipment had not been inspected before issue to the operative
            this morning. Why 3 — pre-use inspection had not been done. Why? Because the
            firm&apos;s policy assigns pre-use inspection to the operative but the operative had
            not been briefed on what to check for on this specific step-up model. Why 4 —
            operative not briefed. Why? Because the firm&apos;s induction covered ladders but not
            step-ups specifically and the operative had assumed they were equivalent. Why 5 —
            induction gap. Why? Because the induction content had not been updated when step-ups
            were added to the firm&apos;s standard kit list last year. Root causes identified:
            induction content gap (system); pre-use inspection scope ambiguity (system); equipment
            condition (asset). Actions: update induction to cover step-ups specifically; issue
            pre-use inspection checklist with photos showing what good and bad look like for the
            foot wear; audit current step-up inventory for similar wear; brief team at next
            toolbox talk. Document the analysis, name the actions and owners, set review date.
            Feed back to firm H&amp;S manager. Close out the report.
          </>
        }
        whyItMatters={
          <>
            The 5-whys process keeps drilling down past the immediate cause (step-up worn) to the
            system causes (induction gap, inspection scope, asset condition). System causes get
            system fixes. Stopping at &apos;the operative should have checked the step-up&apos;
            just blames the operative and doesn&apos;t prevent the next person from making the
            same mistake on a different piece of equipment. The fact that the operative reported
            the near-miss the same afternoon is a sign of a healthy reporting culture; the worst
            outcome would have been a fall plus no report and a recurrence next month. The
            investigation rewards the reporting by visibly acting on the lessons.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>The HSG65 management cycle — POCMR in practice</ContentEyebrow>

      <ConceptBlock
        title="How HSG65 frames the L3 supervisor as the operational layer of the firm’s safety management"
        plainEnglish="HSE guidance HSG65 ’Managing for Health and Safety’ sets out the framework for occupational health and safety management. The core cycle is sometimes summarised as Plan-Do-Check-Act (PDCA) and sometimes more specifically as POCMR — Policy, Organisation, Control, Monitoring, Review. The L3 supervisor sits inside the Control and Monitoring layers operationally. Policy is set by the directors; Organisation defines roles and responsibilities; Control delivers the safe systems of work on site; Monitoring measures whether the controls are actually achieving what they are supposed to achieve; Review feeds the lessons back into Policy and Organisation. The L3 supervisor on site contributes to Control (delivers the SSoW, briefs the team, intervenes on unsafe acts) and to Monitoring (observation, near-miss reporting, audit input). The system only works when the layers stay connected — Policy that never reaches the site fails, and Monitoring that never feeds back to Policy fails too."
        onSite="Practical L3 contribution: when you brief the team at the start of the day, you are delivering Control; when you observe and intervene during the day, you are also delivering Control; when you log an observation finding or report a near-miss to the H&S manager, you are feeding Monitoring; when you participate in an incident investigation, you are contributing to Review. Each touchpoint matters because the firm’s safety system is the sum of these contributions, not a separate thing that lives in head-office filing cabinets. HSE inspectors evaluating a firm look for evidence of all five layers operating in connection."
      >
        <p>HSG65 POCMR layers and L3 contributions:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Policy</strong> — directors set the firm&apos;s safety policy; the written
            safety policy under HSWA s.2(3) where 5+ employees; the L3 reads it and understands
            the commitments it makes.
          </li>
          <li>
            <strong>Organisation</strong> — roles, responsibilities, competences, arrangements;
            the L3 sits at the operational supervision layer within this structure.
          </li>
          <li>
            <strong>Control (delivery)</strong> — risk assessments translated into SSoW, briefed
            and supervised; permits issued where appropriate; the L3 is the primary operational
            delivery point.
          </li>
          <li>
            <strong>Monitoring (active)</strong> — observation, inspection, audit; the L3
            walk-rounds and interventions are the active monitoring layer.
          </li>
          <li>
            <strong>Monitoring (reactive)</strong> — near-miss reporting, incident investigation,
            accident statistics; the L3 contributes contemporaneous accounts and observations.
          </li>
          <li>
            <strong>Review</strong> — periodic assessment of whether the policy and arrangements
            are working; the L3 contributes data and observed reality.
          </li>
          <li>
            <strong>Feedback loops</strong> — Review modifies Policy and Organisation; Monitoring
            data drives changes to Control; the L3 is part of the loop, not outside it.
          </li>
          <li>
            <strong>Documentation</strong> — each layer leaves a paper trail; absent paper trail
            at any layer signals the layer is missing in practice.
          </li>
          <li>
            <strong>Continuous improvement</strong> — Plan-Do-Check-Act version of the same cycle;
            either framing emphasises that safety management is dynamic, not static.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>Hierarchy of control applied — design out before PPE in</ContentEyebrow>

      <ConceptBlock
        title="Why the hierarchy of control is a legal requirement not just good practice"
        plainEnglish="MHSWR 1999 Reg 4 plus Schedule 1 set out the principles of prevention in priority order. They are statutory, not advisory. The hierarchy reads: avoid the risk, evaluate unavoidable risks, combat at source, adapt work to the individual, adapt to technical progress, replace dangerous with less dangerous, develop a coherent prevention policy, give collective protective measures priority over individual, give appropriate instructions. In shorthand the hierarchy is Eliminate → Substitute → Engineer → Administer → PPE, with PPE explicitly as the last resort because it depends on individual operative compliance and provides protection only to the wearer. The L3 supervisor reading a RAMS that proposes PPE as the primary control without first considering elimination, substitution and engineering is reading a deficient assessment."
        onSite="Practical L3 application across common electrical tasks. Eliminate: do you have to do this live? Could the work be done at a different time when the system is off? Substitute: could a different method or product remove the hazard? Engineer: cable trays instead of fixed cable runs that need future hot work; LEV at source for solder fume; on-tool dust extraction rather than respirator-only for chasing. Administer: permits, training, supervision. PPE: ATPV-rated kit for the residual arc-flash risk; FFP3 for residual dust risk after engineering. Each task should be walked through the hierarchy and the controls applied at the highest practical level. The HSE inspector reviewing a job will work down the hierarchy and ask why each higher option was not taken — ’we always wear gloves’ is not an answer to ’could you have eliminated the contact?’"
      >
        <p>Hierarchy of control with electrical-trade examples at each level:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Eliminate (avoid the risk)</strong> — do not do the activity at all; redesign
            so the activity is unnecessary; isolate so the hazard is not present.
          </li>
          <li>
            <strong>Substitute</strong> — change the substance, equipment or method for one that
            presents less hazard (water-based cleaner for solvent; cordless tools for
            mains-powered in wet locations).
          </li>
          <li>
            <strong>Engineering controls</strong> — physical changes that reduce exposure; local
            exhaust ventilation, on-tool extraction, guarding, interlocks, arc-resistant
            switchgear, remote racking.
          </li>
          <li>
            <strong>Signage, warnings and administrative controls</strong> — permit-to- work,
            restricted approach, training, supervision, job rotation, time limits, communication.
          </li>
          <li>
            <strong>Personal Protective Equipment</strong> — last line of defence; addresses
            residual risk after higher controls; depends on individual fit, inspection and use.
          </li>
          <li>
            <strong>Why PPE is last</strong> — protects only the wearer; effectiveness depends on
            correct selection, fit, condition, use, maintenance; failure of higher controls falls
            back to PPE which is the least reliable layer.
          </li>
          <li>
            <strong>Collective over individual</strong> — Schedule 1 explicitly requires
            collective measures (scaffold with guardrail) preferred over individual (harness
            only).
          </li>
          <li>
            <strong>Cumulative effect</strong> — multiple controls at multiple levels provide
            defence-in-depth; no single control is the sole barrier between hazard and harm.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="HSWA 1974 — s.2(3) (Written safety policy)"
        clause={
          <>
            &quot;Except in such cases as may be prescribed, it shall be the duty of every
            employer to prepare and as often as may be appropriate revise a written statement of
            his general policy with respect to the health and safety at work of his employees and
            the organisation and arrangements for the time being in force for carrying out that
            policy, and to bring the statement and any revision of it to the notice of all of his
            employees.&quot;
          </>
        }
        meaning={
          <>
            The written safety policy duty under s.2(3). Applies where 5+ employees. The policy is
            the head document for the firm&apos;s safety arrangements; the Organisation layer of
            HSG65 POCMR; the document the L3 supervisor reads on joining and re-reads on
            promotion. Failure to have a current written policy is a routinely-prosecuted Reg 2(3)
            breach, separate from the substantive duty breach that triggered the prosecution. The
            policy must be brought to the notice of all employees — induction is the usual
            delivery mechanism plus periodic refresh.
          </>
        }
        cite="Source: Health and Safety at Work etc Act 1974 (1974 c.37), s.2(3)."
      />

      <RegsCallout
        source="MHSWR 1999 — Reg 5 (Health and safety arrangements)"
        clause={
          <>
            &quot;Every employer shall make and give effect to such arrangements as are
            appropriate, having regard to the nature of his activities and the size of his
            undertaking, for the effective planning, organisation, control, monitoring and review
            of the preventive and protective measures. Where the employer employs five or more
            employees, he shall record the arrangements referred to in paragraph (1).&quot;
          </>
        }
        meaning={
          <>
            Reg 5 is the operational management duty. The five words &apos;planning, organisation,
            control, monitoring and review&apos; are the legal source of the POCMR framework that
            HSG65 elaborates. Reg 5 makes management of safety a statutory activity, not an HR
            niceness. The 5+ employee threshold for recording matches the s.2(3) policy threshold.
          </>
        }
        cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 5."
      />

      <SectionRule />
      <ContentEyebrow>Cross-reference — regulation and the daily safety routine</ContentEyebrow>

      <ConceptBlock
        title="How the day’s small actions map to specific regulations the inspector will read"
        plainEnglish="The L3 supervisor’s daily routine — start-of-day brief, RAMS sign-off, observation, intervention, end-of-day debrief — each activity discharges a specific regulatory duty. Knowing which regulation each activity maps to lets the supervisor articulate the safety case in regulation language when needed. It also helps anchor the activity as legally required not optional, and signals to operatives that the supervisor is operating from a defined framework rather than personal preference."
        onSite="When a colleague asks ’why do we have to do the morning briefing again, we did it yesterday’ the answer is ’because MHSWR Reg 13 requires the firm to provide information on the day’s specific hazards and Reg 5 requires arrangements for effective implementation’. The conversation goes more easily when the supervisor names the regulation rather than appealing to personal authority."
      >
        <p>Daily L3 activities and the regulations they discharge:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Start-of-day brief / toolbox talk</strong> — MHSWR Reg 10 (information) and
            Reg 13 (capabilities and training).
          </li>
          <li>
            <strong>RAMS sign-off and team briefing</strong> — HSWA s.2(2)(a) safe systems of
            work; MHSWR Reg 5 (arrangements); CDM Reg 8 (general duties).
          </li>
          <li>
            <strong>Observation walk-round</strong> — MHSWR Reg 5 (arrangements including
            monitoring); employer&apos;s s.2 duty to supervise.
          </li>
          <li>
            <strong>Intervention on an unsafe act</strong> — HSWA s.7(b) co-operation duty for the
            supervisor; discharges the firm&apos;s s.2 duty.
          </li>
          <li>
            <strong>Permit issue / sign-on</strong> — EAWR Reg 13/14 where applicable; MHSWR Reg 5
            arrangements; specific permit conditions.
          </li>
          <li>
            <strong>Equipment pre-use check</strong> — PUWER Reg 6 (inspection); PUWER Reg 7
            (specific risks); EAWR Reg 4 (system maintained safely).
          </li>
          <li>
            <strong>Safe isolation</strong> — EAWR Reg 13 (precautions to prevent
            re-energisation).
          </li>
          <li>
            <strong>PPE issue / inspection</strong> — PPE at Work Regs 1992 / 2022; PUWER for PPE
            that includes work equipment elements.
          </li>
          <li>
            <strong>Manual handling assessment</strong> — Manual Handling Operations Regs 1992 Reg
            4.
          </li>
          <li>
            <strong>Substance check / SDS available</strong> — COSHH Reg 6 (assessment) and Reg 12
            (information).
          </li>
          <li>
            <strong>End-of-day debrief and near-miss capture</strong> — MHSWR Reg 5 (monitoring);
            feeds firm-level review.
          </li>
          <li>
            <strong>Incident response if required</strong> — RIDDOR 2013 reporting in addition to
            the immediate first-aid response.
          </li>
          <li>
            <strong>Records and documentation</strong> — MHSWR Reg 3 (significant findings
            recorded); each daughter reg has its own retention requirements.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <FAQ items={faqs2} />
      <SectionRule />
      <KeyTakeaways
        points={[
          'Remember from L2 — follow safe practices. At L3 you run the system.',
          'HASAWA s.2(2)(a) requires safe systems of work. RAMS is the typical documented expression. Permits-to-work formalise SSoW for high-hazard.',
          'Common electrical SSoWs: safe isolation, live working (Reg 14 permit), confined space, hot work, working at height, excavation.',
          'Toolbox talks (MHSWR Reg 13) are the ongoing safety communication mechanism. L3 increasingly delivers them.',
          "Observation + intervention + documentation + follow-up is the L3 supervisor's safety-system contribution.",
          'Near-miss culture is the high-impact preventive practice. No-blame reporting, structured analysis, feedback, visible changes.',
          'RAMS sign-off is a verification act — confirm fit to site, brief team, sign as responsible supervisor.',
          'The system runs through you, not despite you. Each element is small; together they ARE the safety system in practice.',
          'HSG65 POCMR — Policy, Organisation, Control, Monitoring, Review. L3 sits in Control and Monitoring; feeds back into Review.',
          'Hierarchy of control is statutory (MHSWR Reg 4 + Schedule 1). Eliminate → Substitute → Engineer → Administer → PPE.',
          'PPE is last because it depends on individual compliance and protects only the wearer.',
          'Behavioural safety addresses the why of non-compliance — time pressure, peer pressure, complacency, fatigue, optimism bias.',
          'Daily activities each map to specific regulations — name them in conversation to anchor the safety case.',
          'Leading indicators (near-miss rate, observation findings) predict; lagging indicators (RIDDOR, claims) measure.',
        ]}
      />
      <Quiz title="Safe practices and procedures — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
