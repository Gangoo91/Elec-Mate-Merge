/**
 * Level 2 · Module 1 · Section 4.4 — Safe Working Practices on Site
 *
 * AC mapping:
 *   - Unit 201 LO3 AC 3.7 — describe safe practices when using equipment / on site
 *
 * Cross-refs:
 *   - §4.1 (PPE hierarchy of control)
 *   - §4.2 (insulated PPE — gloves and tools)
 *   - §4.3 (GS38 — test instruments + leads)
 *   - §1.1 (HASAWA s.7 personal duty)
 *   - Forward to §5.1 (safe isolation procedure)
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

const TITLE = 'Safe working practices on site | Level 2 Module 1.4.4 | Elec-Mate';
const DESCRIPTION =
  'Pre-use checks, lone working, fatigue, drugs and alcohol, mental fitness for work — the daily habits that turn the regs into actual safe working.';

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'pre-use-check-check',
    question: 'When should you carry out a pre-use inspection on power tools, ladders and PPE?',
    options: [
      'Once a week',
      'Before EVERY use, every shift, every time you pick it up after a break',
      "Only if it looks damaged",
      "Only if your gaffer asks",
    ],
    correctIndex: 1,
    explanation:
      "Before EVERY use. PUWER 1998 Reg 6 + the Work at Height Regs 2005 + PPER Reg 10 all require pre-use checks. ‘Looks fine’ isn’t an inspection — it’s a glance. Cracks, frayed cords, missing guards, loose handles: all stuff that develops between yesterday’s job and this morning’s.",
  },
  {
    id: 'lone-working-check',
    question: 'You’re sent to a vacant property to first-fix a CU. No-one else on site, no signal in the basement. What’s the safe-working baseline?',
    options: [
      "Crack on — you’re trained",
      'Have a check-in plan with the office (set times to call/text) AND avoid live work until someone’s with you',
      "Just text your gaffer when you’re done",
      "Take photos in case anything happens",
    ],
    correctIndex: 1,
    explanation:
      "Lone working isn’t banned but it raises the risk if anything goes wrong — no-one to call 999, no-one to isolate the supply if you’re unconscious. Standard safe practice: agreed check-in times, no live work alone, hostile environments (basements, confined spaces) get an extra person. HSE INDG73 covers it.",
  },
  {
    id: 'drugs-alcohol-check',
    question: 'You had three pints with dinner last night. You’re due on site at 8 am. Are you OK to work?',
    options: [
      "Yes — drinking the night before is fine",
      "Maybe — depends if you’re still over the drink-drive limit, AND whether you’re mentally / physically sharp enough for live work",
      "Yes, just have a coffee",
      "Only if you don’t drive",
    ],
    correctIndex: 1,
    explanation:
      "Alcohol stays in your system longer than you think — three pints can keep you over the drink-drive limit until late morning. HASAWA s.7 + most company policies: it’s ON YOU to turn up fit for work. ‘Hungover but not drunk’ on a live job is exactly the impairment that causes mistakes. If in doubt, flag it BEFORE you start, not after the incident.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Which regulation requires pre-use inspection of work equipment (drills, ladders, MFTs)?',
    options: [
      'BS 7671',
      'PUWER 1998 (Provision and Use of Work Equipment Regulations) — Regulation 6',
      'EAWR 1989',
      'COSHH 2002',
    ],
    correctAnswer: 1,
    explanation:
      "PUWER 1998 Reg 6 — work equipment must be inspected at suitable intervals and after any exceptional event (drop, knock, water ingress). For day-to-day kit, that means before each use. PPER Reg 10 covers PPE; WAH Regs cover ladders / MEWPs; PUWER is the umbrella for the rest.",
  },
  {
    id: 2,
    question: 'On a 110 V CTE construction site supply, your drill cord shows visible cuts in the outer sheath. What do you do?',
    options: [
      "Wrap it in insulating tape",
      "Take the drill out of service, label it, report it. Get a replacement",
      "Use it carefully",
      "Only use it for low-power tasks",
    ],
    correctAnswer: 1,
    explanation:
      "Cuts in the sheath = exposed inner conductors waiting to fault. PUWER + EAWR both make this a hard out-of-service. Tape doesn’t restore the original insulation rating. Label it ‘DO NOT USE — DAMAGED’, get it to the tool store / contracts manager, get a replacement.",
  },
  {
    id: 3,
    question: 'A 110 V centre-tap-earthed (CTE) supply on construction sites means:',
    options: [
      "230 V across line and neutral",
      "55 V to earth from each conductor — so a worst-case shock is 55 V, not 230 V",
      "110 V across both conductors with no earth",
      "A higher voltage to drive longer cable runs",
    ],
    correctAnswer: 1,
    explanation:
      "CTE = secondary winding centre-tapped to earth. Each conductor is 55 V to earth. If a fault drives a shock current to ground, the path is at 55 V max instead of 230 V — much less likely to fibrillate. That’s why CTE is the de facto rule for site-temporary supplies under BS 7671 Section 704.",
  },
  {
    id: 4,
    question: 'Lone working on electrical jobs is:',
    options: [
      "Banned outright",
      "Allowed for low-risk work but should be risk-assessed; generally avoided for live work",
      "Only allowed for time-served sparks",
      "Mandatory for first-year apprentices",
    ],
    correctAnswer: 1,
    explanation:
      "HSE INDG73: lone working isn’t illegal but the risk assessment must justify it. For low-risk dead work in occupied premises, fine. For live work, work at height, confined spaces, vacant premises — generally avoided OR backed up by a check-in routine + emergency plan. Apprentices specifically should not be lone-working without competent supervision available.",
  },
  {
    id: 5,
    question: "Why is fatigue an electrical safety issue and not just a comfort one?",
    options: [
      "Fatigued workers are slower",
      "Fatigue impairs reaction time, decision-making, and the ability to follow procedure — directly increasing the chance of skipped isolation steps or mis-identification",
      "Fatigue costs more in coffee",
      "It’s only an issue for drivers",
    ],
    correctAnswer: 1,
    explanation:
      "Fatigue is comparable to alcohol intoxication — research shows 17 hours awake equals roughly 0.05% blood alcohol (over the drink-drive limit in Scotland). That’s the level where you skip a prove-test-prove because ‘it’s fine, it must be off’. HASAWA s.2 + s.7 both apply: turning up unfit for work is YOUR breach as well as the boss’s.",
  },
  {
    id: 6,
    question: 'Misuse and Drugs Act / company policy aside — what’s the SAFETY reason you don’t go on site under the influence?',
    options: [
      "Annoying the gaffer",
      "Impaired judgment + reaction time means you’re more likely to make a fatal mistake on a live system; HASAWA s.7 makes it personally on you",
      "It’s expensive",
      "It looks unprofessional",
    ],
    correctAnswer: 1,
    explanation:
      "Live electrical work needs sharp judgment — ‘which breaker am I locking off?’, ‘did I prove the indicator?’, ‘which way did I document the existing wiring?’. Even mild impairment from cannabis, cocaine, prescription opioids, or hangover slows the bit of you that catches a mistake. HASAWA s.7 + company drugs/alcohol policies: positive test = sackable offence and personal liability if anything goes wrong.",
  },
  {
    id: 7,
    question: "Your friend at work seems off — quiet, not himself. Mentions he hasn’t slept properly in weeks. He’s about to climb a ladder to a roof junction box. What’s the right move?",
    options: [
      "Mind your own business",
      "Quietly suggest he takes the job tomorrow / get the supervisor involved — climbing tired is how falls happen",
      "Make a joke about it",
      "Wait and see if he says something",
    ],
    correctAnswer: 1,
    explanation:
      "HASAWA s.7 puts a duty on you to look out for your colleagues’ safety too. Mental health and fatigue are real safety issues — knackered, distracted, low-mood workers are statistically more likely to fall, miss isolation steps, or get injured. Speak up gently. Most companies have an Employee Assistance Programme — flag it to the supervisor without making it a drama.",
  },
  {
    id: 8,
    question: 'PUWER inspections must be:',
    options: [
      "Carried out only by the manufacturer",
      "Carried out by a competent person at suitable intervals AND a record kept where the equipment is used in conditions causing deterioration",
      "Done annually only",
      "Only when the equipment fails",
    ],
    correctAnswer: 1,
    explanation:
      "PUWER 1998 Reg 6: ‘competent person’ + ‘suitable intervals’. Records required where the equipment’s use can lead to deterioration (e.g. PAT testing of portable tools every 3-6 months on construction sites). The pre-use visual check is YOURS; the periodic formal inspection is the employer’s, by a competent person.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'How long does a pre-use check actually take?',
    answer:
      "On a typical drill / VI / extension lead — under 30 seconds each. Look it over: cracks, cuts, missing guards. Function check: does it spin, does it switch off when you release the trigger, does the LED light when probed. The whole pre-shift kit check should take maybe 5 minutes for everything in your bag. People who say ‘no time’ are the ones who eventually have a serious incident from a tool defect that was sitting there waiting to be found.",
  },
  {
    question: 'My gaffer wants me to do a job alone he wouldn’t do alone. Can I refuse?',
    answer:
      "If the lone-working risk is genuine, yes. HASAWA s.7 + s.44 of the Employment Rights Act 1996 protect you for raising real safety concerns. Don’t make it a fight — flag it: ‘the RAMS for this calls for two people because of X — can we reschedule, or have someone come with me?’. If they push you to do it anyway, log it (date, time, what was said) and escalate above them. Going ahead doesn’t transfer the blame back to them if it goes wrong.",
  },
  {
    question: "Can I work after a couple of pints at lunch?",
    answer:
      "No. Most construction sites have a zero-tolerance alcohol policy enforced by random testing — that’s not just being mean, it’s because alcohol impairment on a live electrical site is a fast route to a coroner’s court. Even one drink can dull reaction time. Save it for after the tools are back in the van.",
  },
  {
    question: "I’m on prescription medication that makes me drowsy — what should I do?",
    answer:
      "Tell your gaffer / supervisor BEFORE you start the shift. Most company drug policies treat prescription medication separately from recreational drugs — but the SAFETY issue is the same: drowsy workers near live conductors or up ladders is a foreseeable risk. They may put you on lower-risk tasks for a few days, or arrange supervision. Concealing it doesn’t help — if you have an incident and post-event tests show the medication, you’re in trouble for hiding it AS WELL as for the incident.",
  },
  {
    question: "Do mental health and stress count as ‘fitness for work’?",
    answer:
      "Yes, increasingly so. The HSE recognises stress and mental ill-health as workplace health issues under HASAWA. Severely stressed, sleep-deprived, or grieving workers make more mistakes — and on a live electrical job, mistakes can kill. Employers should have an Employee Assistance Programme; tap into it. There’s no shame in saying you need a couple of days off the live work — it’s the responsible HASAWA s.7 thing to do.",
  },
  {
    question: "What if I see a colleague doing something genuinely dangerous?",
    answer:
      "Speak up. HASAWA s.7 puts a duty on you to look after the safety of others affected by your acts AND omissions. Saying nothing when you see a workmate skip lock-off or climb a defective ladder is an OMISSION you can be on the hook for. Pull them aside quietly first; if it continues, tell the supervisor. Most companies treat this as the right thing to do, not snitching.",
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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 1 · Section 4 · Subsection 4"
            title="Safe working practices on site"
            description="Pre-use checks, lone working, fatigue, drugs and alcohol, mental fitness for work. The daily habits that turn the regs from a textbook into a safe working day."
            tone="emerald"
          />

          <TLDR
            points={[
              "Pre-use checks BEFORE every use — PUWER 1998 Reg 6. Tools, leads, ladders, PPE, test gear. 30 seconds each, finds the defect that would have hurt you.",
              "Lone working = risk-assess it. No live work alone, agreed check-in times, emergency plan if you’re hurt and can’t call for help. HSE INDG73.",
              "Fitness for work isn’t optional. Alcohol, drugs, fatigue, mental ill-health all impair the bit of you that catches mistakes. HASAWA s.7 makes it your duty to turn up fit.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Carry out pre-use inspections on tools, leads, ladders, PPE and test instruments — and explain the legal basis (AC 3.7).",
              "Explain when and why a 110 V CTE supply is used on construction sites and how it limits shock severity.",
              "Risk-assess lone working and explain when it should be avoided or backed up by a check-in routine.",
              "Recognise the impact of fatigue on safety-critical decisions — and when to flag it.",
              "Explain the safety reasons for drug/alcohol policies and the HASAWA s.7 personal duty to turn up fit for work.",
              "Identify mental health / stress as a safety issue and know what to do for yourself or a colleague.",
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
              Pre-use checks are the foundation safety habit. They’re what turn ‘the gaffer
              gave me a drill, must be fine’ into ‘I’ve confirmed this drill is safe before I
              power it on’. The legal basis is layered:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PUWER 1998 Reg 6</strong> — work equipment (drills, MFTs, conduit
                benders, etc.) must be inspected at suitable intervals + after exceptional
                events. ‘Suitable’ for daily-use kit means before each use.
              </li>
              <li>
                <strong>EAWR 1989 Reg 4(2) + (4)</strong> — equipment used in electrical
                work must be maintained and properly used. Test gear especially.
              </li>
              <li>
                <strong>WAH 2005</strong> — ladders, towers, MEWPs need pre-use checks before
                ascent + a more formal weekly inspection.
              </li>
              <li>
                <strong>PPER 2022 Reg 10</strong> — you have to check PPE before each use
                and report defects.
              </li>
            </ul>
            <p>
              The check itself is dead simple — visual top-to-bottom plus a function test
              where applicable. What matters is that you actually do it, every time, even
              when you’re tired or rushed. The day you skip it is the day the drill cord
              with the slow-developing cut finally arcs across your hand.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What ‘competent person’ means at your level"
            plainEnglish="The pre-use visual check is YOUR job. The periodic formal inspection (test, certify, document) is the employer’s job, done by a competent person — usually annual PAT for portable tools, more often on construction sites."
          >
            <p>
              PUWER + EAWR both reference ‘competent person’. As a Level 2 apprentice you’re
              competent to do a pre-use visual + function check. You’re NOT competent yet
              to formally inspect and certify electrical kit (e.g. issue a PAT pass label,
              calibrate an MFT). That comes with experience, additional training and the
              right test equipment.
            </p>
            <p>Typical inspection frequencies on a UK construction site:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pre-use visual check: every use, by you</li>
              <li>Formal user inspection: weekly or monthly, by you, signed off</li>
              <li>
                PAT test of 110 V tools: every 3 months on construction sites (per IET COP
                for In-Service Inspection)
              </li>
              <li>Calibration of MFT / multimeter: annual, by accredited lab</li>
              <li>
                Dielectric test of insulating gloves (IEC 60903): every 6 months — covered
                in §4.2
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="PUWER 1998 — Regulation 6 (Inspection)"
            clause="Every employer shall ensure that, where the safety of work equipment depends on the installation conditions, it is inspected after installation and before being put into service for the first time, or after assembly at a new site or in a new location, to ensure that it has been installed correctly and is safe to operate. Where work equipment is exposed to conditions causing deterioration which is liable to result in dangerous situations, every employer shall ensure that it is inspected at suitable intervals."
            meaning={
              <>
                Two parts: <strong>installation inspection</strong> (after a tool is set up
                somewhere new) AND <strong>periodic inspection</strong> at suitable
                intervals. For day-to-day portable kit, ‘suitable intervals’ means before
                each use as well as the formal periodic test. The duty is on the EMPLOYER —
                but you carrying out the daily check is how the employer discharges it.
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
              On a 230 V single-phase supply, a person making contact with the line conductor
              and earth gets up to 230 V across them. On a 110 V CTE supply, each conductor
              is only at 55 V relative to earth — half the system voltage. The same fault
              that would push a 230 V shock through someone now pushes a 55 V shock — well
              below the lethal current threshold for a typical shock duration.
            </p>
            <p>
              You’ll see CTE supplies on:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Construction sites — site transformer in the welfare cabin, yellow 16 A
                outlets distributed by yellow extension leads
              </li>
              <li>
                Demolition / refurb — same setup, often more aggressive environment
              </li>
              <li>
                Outdoor work near water — extra layer of protection on top of the 30 mA RCD
                requirement
              </li>
            </ul>
            <p>
              For final installs in occupied buildings you’ll usually be on the building’s
              normal 230 V supply via 30 mA RCD-protected sockets. For temporary site use,
              CTE is the standard. Don’t plug a 230 V tool into a CTE supply (won’t run
              right) or vice versa (yellow tools will damage on 230 V).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 704.410.3.10 (paraphrased)"
            clause="A circuit supplying a socket-outlet with a rated current up to and including 32 A and any other circuit supplying hand-held electrical equipment with rated current up to and including 32 A shall be protected by: (a) reduced low voltage (Regulation 411.8); or (b) automatic disconnection of supply (Section 411) with additional protection provided by an RCD having the characteristics specified in Regulation 415.1.1; or (c) electrical separation of circuits (Section 413), each socket-outlet and item of hand-held electrical equipment being supplied by an individual transformer or by a separate winding of a transformer; or (d) SELV or PELV (Section 414). NOTE: The reduced low voltage system is strongly preferred for the supply to portable handlamps for general use and portable hand tools and local lighting up to 2 kW."
            meaning={
              <>
                ‘Strongly preferred’ in BS 7671 = the default unless you can justify something
                else. For construction sites (Section 704), reduced LV = 110 V CTE for portable
                kit. The ‘adverse conditions’ wording covers wet, dusty, knocked-about worksite
                use — exactly where 230 V on portable kit becomes especially risky.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 7 Section 704 Regulation 704.410.3.10 for the full text."
          />

          <SectionRule />

          <ContentEyebrow>Lone working</ContentEyebrow>

          <ConceptBlock
            title="Working alone — when it’s OK and when it isn’t"
            plainEnglish="Lone working isn’t banned — but the moment something goes wrong, no-one’s there to call 999, kill the supply, or stop the bleeding. So the risk has to be assessed and managed."
            onSite="A spark on a maintenance call to a vacant office at 7 pm to fix a tripped breaker? Probably fine — but agreed check-in with the office, no live work, leave when done. A first-year apprentice sent alone to a tower block basement with no signal to first-fix a CU? Absolutely not — that’s an unsupervised live-supply environment with no rescue plan."
          >
            <p>The HSE’s INDG73 (‘Working alone — Health and safety guidance’) sets out:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Lone working isn’t illegal in itself — but the employer must risk-assess it
                under MHSWR 1999 Reg 3.
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
                Lower-risk lone work (e.g. dead-isolated final-fix in an occupied home with
                the customer present) is generally fine if:
                <ul className="space-y-1 list-disc pl-5 marker:text-elec-yellow/40 mt-1">
                  <li>The job is risk-assessed</li>
                  <li>Agreed check-in / check-out with someone (office, family)</li>
                  <li>Mobile signal or alternative emergency communication</li>
                  <li>Lone-worker alarm device for higher-risk environments</li>
                </ul>
              </li>
            </ul>
            <p>
              <strong>Apprentices specifically</strong> should not be lone-working without
              a competent person available — either on site or contactable. EAWR Reg 16
              ‘competence’ requirement effectively rules out unsupervised live-related work
              for an apprentice.
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
              Fatigue isn’t laziness or weakness — it’s a documented physiological state
              that impairs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reaction time (slower to pull a hand back)</li>
              <li>
                Decision-making (more likely to take the shortcut, skip a step, ‘assume’
                it’s off)
              </li>
              <li>
                Working memory (forgetting which breaker you locked off, which test you
                already did)
              </li>
              <li>
                Risk perception (the bit of you that goes ‘hold on, this looks wrong’ goes
                quiet)
              </li>
              <li>Fine motor control (slipping screwdrivers, dropped tools)</li>
            </ul>
            <p>
              On a live electrical job, every one of those failure modes can turn into an
              incident. HASAWA s.7 puts a duty on YOU to take reasonable care of yourself —
              that includes turning up rested. If you can’t, flag it. ‘Can I be on the
              dead-isolated stuff today, gaffer? I’m running on three hours’ sleep’ is the
              right conversation. ‘Crack on and hope’ is not.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Drugs and alcohol — why every site has zero tolerance"
            plainEnglish="Even mild impairment from alcohol, cannabis, cocaine or opioids slows the part of you that catches a mistake. On a live electrical site that translates directly into shock and arc-flash incidents. Most sites enforce it with random testing."
          >
            <p>
              The combination of impaired judgement + live electrical work is one of the
              recurring causes in HSE fatality reports. Specific issues:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Alcohol</strong> — stays in your system longer than people think.
                Three pints the night before can keep you over the legal drink-drive limit
                until late morning. Even legally ‘sober’, residual impairment on judgement
                lasts up to 24 hours.
              </li>
              <li>
                <strong>Cannabis</strong> — impairs reaction time, short-term memory and
                spatial awareness for hours. Detectable in saliva for hours, urine for days.
                Most sites test for both.
              </li>
              <li>
                <strong>Cocaine and stimulants</strong> — overconfidence + risk-taking +
                aggression. Specifically dangerous around live conductors where caution is
                the safety system.
              </li>
              <li>
                <strong>Prescription opioids / sedatives / antihistamines</strong> — many
                cause drowsiness or impair judgement. Disclose to your gaffer BEFORE the
                shift, not after the incident.
              </li>
            </ul>
            <p>
              Every UK construction site of any size has a drugs and alcohol policy
              backed by random testing. Positive test = sent off site, possible
              dismissal, possible loss of CSCS card. More importantly: HASAWA s.7 makes
              it personally on you — turning up impaired and having an incident transfers
              the legal exposure to YOU as well as to the employer.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Mental health is a safety issue"
            plainEnglish="Severely stressed, depressed, grieving or burnt-out workers are statistically more likely to have accidents. The HSE recognises this. Speaking up isn’t weakness — it’s the s.7 ‘take reasonable care of yourself’ duty in action."
            onSite="If a mate is clearly not himself — quiet, distracted, snappy, mentioning sleep problems or family stress — that’s the moment to have a quiet word. Most companies have an Employee Assistance Programme (EAP) — confidential, often phone-based counselling. Tap into it. Suggest your mate does too."
          >
            <p>
              The construction industry has historically high rates of stress-related illness
              and one of the highest male suicide rates in the UK economy. The HSE has been
              pushing recognition of mental health as an occupational health issue under
              HASAWA for years. From a SAFETY angle:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Distracted workers miss hazards
              </li>
              <li>
                Sleep-deprived workers make decision errors (see fatigue, above)
              </li>
              <li>
                Workers in crisis sometimes take risks they otherwise wouldn’t
              </li>
              <li>
                The ‘crack on, lads don’t complain’ culture stops people flagging legitimate
                fitness-for-work concerns
              </li>
            </ul>
            <p>
              HASAWA s.7 covers mental fitness as well as physical. If you’re in a place
              where you can’t safely do live work — say so. Your gaffer should put you on
              dead-isolated tasks, paperwork, deliveries, store work, until you’re right.
              That’s the responsible call, not the weak one.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HASAWA 1974 — section 7 (Duties on employees)"
            clause="It shall be the duty of every employee while at work to take reasonable care for the health and safety of himself and of other persons who may be affected by his acts or omissions at work."
            meaning={
              <>
                Same regulation we met in §1.1 — applied here to fitness for work.
                ‘Reasonable care’ INCLUDES turning up in a fit state to work safely. Drink,
                drugs, fatigue, mental crisis: all have the potential to compromise your
                ability to discharge the s.7 duty. Recognising it and flagging it before you
                start is the s.7 thing to do; concealing it and having an incident is the
                breach.
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
              Before you put a hand on a single conductor today, run through this — quietly,
              in your head, takes 60 seconds:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Am I fit for this?</strong> Slept enough? Sober? Not on impairing
                medication? Not in mental crisis? If any answer is no → flag it.
              </li>
              <li>
                <strong>Have I got the RAMS?</strong> Read it, signed it, understands what
                it says about PPE, isolation, lone working, emergency.
              </li>
              <li>
                <strong>Is the kit fit?</strong> Pre-use checks done on tools, leads,
                ladders, PPE, test gear. Anything dodgy → out of service.
              </li>
              <li>
                <strong>Am I working alone?</strong> If yes, is the lone-working plan in
                place — check-in times, comms, emergency. If higher-risk → reschedule with a
                second person.
              </li>
              <li>
                <strong>Do I have the right PPE for the actual hazard?</strong> Not just
                ‘some PPE’ — the right rating, fitted, in date.
              </li>
              <li>
                <strong>Have I got the GS38 kit + working proving unit?</strong> If you’ll
                touch test probes to a circuit, you need a confirmed-working VI and PU.
              </li>
            </ol>
            <p>
              Six questions. They cost a minute. They’re also the questions an HSE inspector
              will ask if anything goes wrong — much better to have answered them yourself
              before than under cross-examination after.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Skipping the pre-use check because you used the tool yesterday"
            whatHappens={
              <>
                ‘It was fine when I packed it in the van last night.’ Except overnight in a
                cold van, plastic gets brittle. Sharp metal stuff gets dropped on top of soft
                stuff. Battery contacts corrode. Cable insulation cracks at the cord-grip
                where it’s been flexed for 200 jobs. The 30 seconds you didn’t spend this
                morning is exactly when these things would have shown up. Then it goes bang
                in your hand at 11 am.
              </>
            }
            doInstead={
              <>
                Pre-use visual check, EVERY shift, EVERY tool. Function test where
                applicable (drill spins, RCD pop button works, VI proves on the PU). PUWER
                Reg 6 puts the legal duty on the employer; YOU running the daily check is
                how the employer discharges it. Build the habit so it’s automatic — bag
                opens, kit gets eyeballed, then it goes to work.
              </>
            }
          />

          <Scenario
            title="The tired apprentice on a lone-working job"
            situation={
              <>
                Friday afternoon, end of a long week. You’ve had bad sleep all week — second
                child just arrived, neither of you has had a full night in two weeks. The
                gaffer asks you to nip out and isolate + replace a faulty MCB at a vacant
                rental property an hour away. ‘Be in and out, easy job, save it for Monday
                otherwise’. You’re an L2 apprentice, 6 months in. The property is empty —
                no tenants in, you’ll be alone.
              </>
            }
            whatToDo={
              <>
                Push back, politely. Three flags here: (a) you’re an apprentice, lone
                working on live-supply environments isn’t appropriate for your competence
                level (EAWR Reg 16); (b) you’re fatigued enough that your reaction time and
                judgement are impaired (HASAWA s.7); (c) it’s a dead-supply environment
                until proven otherwise — you should have a competent person with you for
                the isolation. The right answer is: ‘can a senior come with me, or can it
                wait until Monday with someone else?’. Most decent gaffers will respect that
                — and the ones who don’t are the ones whose business eventually has a
                serious incident.
              </>
            }
            whyItMatters={
              <>
                This exact pattern — junior worker, end-of-week, ‘easy job’ alone, fatigued
                — shows up in HSE incident reports over and over. The combination is what
                makes it dangerous, not any single factor. Recognising it and pushing back
                is the s.7 duty in action. ‘Crack on’ in this scenario is exactly how
                first-year apprentices end up in A&E or worse.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Where this section closes — and what comes next</ContentEyebrow>

          <ConceptBlock
            title="Section 4 in one paragraph"
            plainEnglish="PPE is the LAST line (4.1). The specific PPE for sparks is rated, marked, fitted and replaced (4.2). Test gear has its own rules — GS38 — and prove-test-prove every time (4.3). All of it is held together by daily safe-working habits — pre-use checks, lone-working judgement, fitness for work (4.4)."
          >
            <p>
              Section 5 (next) ties this all together into the formal SAFE ISOLATION
              PROCEDURE — the standard sequence every UK sparky uses to take a circuit dead,
              prove it dead, lock it, and work on it safely. It uses the PPE from §4.2, the
              test gear from §4.3, and the daily habits from this subsection. Without those
              foundations, the safe-isolation procedure is just words on paper.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Pre-use checks on tools, leads, ladders, PPE, test gear EVERY use. PUWER 1998 Reg 6 + EAWR + WAH + PPER all require it.",
              "110 V CTE on construction sites: each conductor 55 V to earth, halves shock severity vs 230 V. BS 7671 Section 704.",
              "Lone working isn’t banned but must be risk-assessed. No live work alone. Apprentices need competent person available. HSE INDG73.",
              "Fatigue is comparable to alcohol impairment — 17 hours awake ≈ drink-drive limit. HASAWA s.7 makes turning up rested YOUR duty.",
              "Drugs/alcohol policies are about safety, not just discipline. Random testing on most sites. Disclose prescription medication BEFORE the shift.",
              "Mental health is a safety issue — distracted workers miss hazards. Tap into the EAP, look out for mates, swap to dead-only work if you’re not right.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Safe working practices knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section4/4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                GS38 — test instruments + leads
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section5/5-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Safe isolation procedures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
