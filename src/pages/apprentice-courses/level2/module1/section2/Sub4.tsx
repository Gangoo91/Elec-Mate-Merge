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
  'Working at Height and Confined Spaces | Level 2 Module 1.2.4 | Elec-Mate';
const DESCRIPTION =
  "Falls and bad atmospheres are still the biggest killers in our trade. The hierarchy, the kit, the permits and the standby person — apprentice-friendly walkthrough.";

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks = [
  {
    id: 'wahr-definition-check',
    question: 'How do the Work at Height Regulations 2005 define "working at height"?',
    options: [
      'Anything above two metres',
      'Anywhere you could fall a distance liable to cause personal injury',
      'Roof work and scaffold only',
      'Anything above your own head height',
    ],
    correctIndex: 1,
    explanation:
      "There’s no magic number. If you could fall and hurt yourself — even a metre off a podium step — the Regs apply. That’s why ladder falls in domestic jobs still get prosecuted.",
  },
  {
    id: 'hierarchy-check',
    question: 'What’s the order of the height hierarchy under WAHR 2005?',
    options: [
      'Plan, provide, train',
      'Avoid, prevent, mitigate',
      'Assess, isolate, protect',
      'Inspect, install, monitor',
    ],
    correctIndex: 1,
    explanation:
      "Avoid the work at height if you can. If you can’t, prevent the fall with collective kit (towers, MEWPs, edge protection). Only as last resort, mitigate the fall with personal kit (harness, lanyard).",
  },
  {
    id: 'confined-standby-check',
    question: 'A mate goes down a manhole to dress some cables. What’s the standby person’s job?',
    options: [
      'Go in with him in case he needs a hand',
      'Stay outside, keep contact, raise the alarm — don’t enter to rescue',
      'Wait at the van and check on the radio every 20 mins',
      'Test the atmosphere once at the start, then crack on with other work',
    ],
    correctIndex: 1,
    explanation:
      "Reg 5 of the Confined Spaces Regs requires emergency arrangements. The standby person stays out, keeps comms, raises the alarm. Most confined-space deaths are people who went in to rescue without proper kit.",
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'Under the Work at Height Regulations 2005, when do the Regs kick in?',
    options: [
      'Above 2 metres',
      'Above 1.8 metres on a ladder',
      'Anywhere a fall could cause personal injury',
      'Only on construction sites',
    ],
    correctAnswer: 2,
    explanation:
      "There’s no height threshold. If a fall could hurt someone, you’re working at height — even on a hop-up changing a downlight.",
  },
  {
    id: 2,
    question: 'What’s the correct hierarchy under WAHR 2005?',
    options: [
      'PPE first, then guardrails, then skip the work',
      'Avoid working at height → prevent the fall (collective) → mitigate the fall (personal)',
      'Assess → install → inspect',
      'Harness → helmet → high-vis',
    ],
    correctAnswer: 1,
    explanation:
      "Always start by asking 'do I even need to be up there?' Use poles, drop the fitting down, design out the work. If you must go up, use a tower or MEWP. Harness only when you can’t prevent the fall.",
  },
  {
    id: 3,
    question: 'What’s the right ladder angle, in trade terms?',
    options: [
      '1 out for every 3 up',
      '1 out for every 4 up (about 75°)',
      '1 out for every 5 up',
      'Bolt upright against the wall',
    ],
    correctAnswer: 1,
    explanation:
      "The 1:4 rule. Roughly 75°. Too shallow and the feet kick out. Too steep and the top falls back. Most modern ladders have an angle indicator on the stile — use it.",
  },
  {
    id: 4,
    question: 'A leaning ladder is being used for short, light work. How long is "short"?',
    options: [
      'Up to 5 minutes',
      'Up to 30 minutes',
      'Up to a full shift',
      'No time limit',
    ],
    correctAnswer: 1,
    explanation:
      "HSE’s LA455 guidance: max 30 minutes at one position for a leaning ladder. Anything longer needs a tower, podium or MEWP. If you’re halfway through and the kettle goes on, you’re probably over the limit.",
  },
  {
    id: 5,
    question: 'Which of these is a confined space under the 1997 Regulations?',
    options: [
      'Any room without windows',
      'Any space substantially enclosed where there’s a foreseeable specified risk',
      'Only sewers and tanks',
      'Anywhere below ground level',
    ],
    correctAnswer: 1,
    explanation:
      "Two parts to the test. Substantially enclosed AND a specified risk — fire/explosion, loss of consciousness from gas/fumes/lack of O—, drowning, asphyxiation from solids, or temperature. Cable risers, plant rooms and floor voids can all qualify.",
  },
  {
    id: 6,
    question: 'Normal air is about 21% oxygen. At what level does it become a danger?',
    options: [
      'Below 20.9%',
      'Below 19.5% (deficient) or above 23.5% (enriched)',
      'Below 15% only',
      'Only below 10%',
    ],
    correctAnswer: 1,
    explanation:
      "Below 19.5% you start to get drowsy and uncoordinated — well before you collapse. Above 23.5% normally non-flammable stuff catches fire dangerously easy. Multi-gas detectors alarm at both ends.",
  },
  {
    id: 7,
    question: 'What’s the law on ladder pre-use checks?',
    options: [
      'Inspected once a year by the gaffer',
      'Visual pre-use check by the user, plus a recorded detailed inspection at intervals (typically every 3–12 months)',
      'No check needed if it looks fine',
      'PAT-tested every 3 months',
    ],
    correctAnswer: 1,
    explanation:
      "WAHR Reg 12 plus PUWER 1998. You eyeball it before each use — stiles, rungs, feet, locking bars. The company keeps a recorded inspection log. No record = the gaffer can’t prove the kit was fit for use.",
  },
  {
    id: 8,
    question: 'Three of these are duties under the Confined Spaces Regs 1997. Which is NOT?',
    options: [
      'Avoid entry if the work can be done another way',
      'Have a safe system of work',
      'Have suitable emergency arrangements before entry',
      'Carry out the work alone to keep numbers down',
    ],
    correctAnswer: 3,
    explanation:
      "Regs 4, 4(2) and 5: avoid entry if you can, have a safe system if you can’t, and rescue arrangements ready BEFORE anyone goes in. Working alone in a confined space is a textbook bad idea — you need a standby person and comms.",
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs = [
  {
    question: 'I’m only changing a light fitting on a podium step — do all these regs really apply?',
    answer:
      "Yes. The Work at Height Regulations 2005 don’t care that it’s only a couple of metres or a quick job. If you could fall and hurt yourself, the duties apply: pre-use check, right kit for the job, plan, supervision, training. The good news is for low-risk work like that, the controls are usually simple and quick — a properly inspected podium plus three points of contact does the job.",
  },
  {
    question: 'When does a leaning ladder become not-ok and I should call for a tower?',
    answer:
      "Three triggers. (1) The job will take more than about 30 minutes at the same position. (2) You can’t maintain three points of contact — e.g. you need both hands free to land a heavy fitting. (3) You’re over-reaching, leaning beyond the stile. Any of those, get a tower or MEWP. The cost of hiring one is way less than the cost of falling.",
  },
  {
    question: 'Is a cable riser, plant room or false floor a confined space?',
    answer:
      "It can be. Apply the two-part test: substantially enclosed AND a foreseeable specified risk (oxygen depletion, gases, fire, fumes, engulfment). A small basement plant room with poor ventilation and a gas main could be one. A floor void where you’re crawling around with cable spools — same. If in doubt, treat it as one until a proper risk assessment says otherwise.",
  },
  {
    question: 'Can I just stick my head in to grab a cable end — surely that’s not ‘entry’?',
    answer:
      'Under the Confined Spaces Regs, ‘entry’ means breaking the plane of the opening with your head or upper body. If your head is in, you’re in — with all the duties that brings (atmosphere tested, standby person, rescue plan). Don’t try to play games with the definition; HSE inspectors and judges aren’t impressed.',
  },
  {
    question: 'What kit do I need for a quick atmosphere test before going down a manhole?',
    answer:
      "A multi-gas detector — four-gas as a minimum: oxygen (O—), carbon monoxide (CO), hydrogen sulphide (H—S) and lower explosive limit (LEL) for flammable gas. Bump-test it daily, calibrate it on schedule, and lower the probe through the opening BEFORE you put your head in. Test top, middle and bottom — some gases settle, others rise.",
  },
  {
    question: 'My foreman says we’ve always done it this way and the harness will do. What now?',
    answer:
      "The Regs put fall arrest (harness) BELOW collective protection (towers, MEWPs, edge protection) in the hierarchy. 'We’ve always done it' isn’t a defence. Politely ask why we’re not using the higher-tier control. If you’re still pushed, raise it up the chain and write it down — date, time, who said what. HASAWA s.7 puts the duty on you too.",
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2 · Subsection 4"
            title="Working at Height and Confined Spaces"
            description="Falls are still the biggest single killer on UK building sites. Bad atmospheres in confined spaces aren’t far behind. Two sets of regs, one mindset: don’t go up, in or down without thinking it through first."
            tone="emerald"
          />

          <TLDR
            points={[
              "Work at Height Regs 2005 apply ANY time you could fall and get hurt — there’s no '2-metre rule'.",
              "Hierarchy: avoid work at height → prevent the fall with collective kit (towers, MEWPs, edge protection) → mitigate it with personal kit (harness) only as a last resort.",
              "A confined space is enclosed AND has a foreseeable specified risk. Don’t enter without atmosphere testing, a permit, and a standby person who never goes in to rescue.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define working at height and a confined space using the actual statutory wording.",
              "Apply the WAHR 2005 hierarchy to a real on-site decision.",
              "Pick the right access equipment for the job — and know when a leaning ladder isn’t it.",
              "Run the four-step pre-entry routine for a confined space (test, ventilate, permit, standby).",
              "Recognise the electrical add-ons that make height and confined-space work harder than the textbook says.",
              "Know who carries the duty when something goes wrong — and what your s.7 obligation looks like in practice.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this section matters</ContentEyebrow>

          <ConceptBlock title="Falls and bad air kill more sparks than electricity does">
            <p>
              HSE figures every year tell the same story. Falls from height are the biggest single
              cause of fatal injury on construction sites — usually from low heights, doing routine
              jobs, on equipment that wasn’t right for the task. Confined-space fatalities are
              rarer but tend to come in pairs: the worker who collapses, and the mate who runs in
              to help without proper kit.
            </p>
            <p>
              Both are easy to underestimate. A podium step "isn’t really high". A floor void
              "isn’t really a confined space". That’s how people end up in court rooms and
              wheelchairs. The Regs exist because the trade kept finding new ways to fall and to
              suffocate.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The law on height work</ContentEyebrow>

          <ConceptBlock
            title="There’s no '2-metre rule' — there never was"
            plainEnglish="If a fall would hurt you, the Work at Height Regulations apply. Doesn’t matter if it’s 50cm off a hop-up or 5m up a tower."
            onSite="People still say things like 'it’s only a step ladder, the height regs don’t kick in'. That’s wrong. They’ve always applied to anywhere a fall could cause injury."
          >
            <p>
              The Work at Height Regulations 2005 (WAHR) replaced an older patchwork that did have
              height thresholds. The 2005 Regs binned the threshold and made it about{' '}
              <strong>risk of injury</strong>, not metres. A spark falling backwards off a
              two-rung hop-up onto a concrete floor breaks just as many bones as one falling off
              an extension ladder.
            </p>
            <p>
              The duty falls on whoever organises the work — your employer, the contractor,
              sometimes you if you’re self-employed — and on you personally under HASAWA s.7.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Work at Height Regulations 2005 — Regulation 6(3)"
            clause="Where work is carried out at height, every employer shall take suitable and sufficient measures to prevent, so far as is reasonably practicable, any person falling a distance liable to cause personal injury."
            meaning={
              <>
                One sentence does most of the work. The duty is to{' '}
                <strong>prevent the fall</strong>, not just pad the landing. That’s why the
                hierarchy puts towers and MEWPs ABOVE harnesses — preventing is better than
                catching. "Reasonably practicable" is the same balance you saw under HASAWA: the
                bigger the risk, the more you have to do.
              </>
            }
            cite="Reference: legislation.gov.uk — The Work at Height Regulations 2005 (SI 2005/735)"
          />

          <ConceptBlock
            title="The hierarchy: avoid → prevent → mitigate"
            onSite="Tutors love to grill apprentices on this. Memorise the three words and what each one means — it comes up in college, on AM2 and on real RAMS forms."
          >
            <p>WAHR Reg 6 lays out the order you have to think in:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Avoid.</strong> Can the job be done from the ground? Long poles for
                lighting, drop the fitting down to test it, design the cable run differently,
                pre-fab on a bench. If you don’t need to go up, don’t.
              </li>
              <li>
                <strong>2. Prevent the fall (collective).</strong> Scaffold towers, MEWPs (cherry
                pickers, scissor lifts), podium steps with guardrails, edge protection. These stop
                anyone falling, not just the person wearing the kit. They protect everyone on the
                platform at once.
              </li>
              <li>
                <strong>3. Mitigate the fall (personal).</strong> Harness with lanyard to a proper
                anchor, fall arrest nets, airbags. These don’t stop the fall — they reduce how
                badly it ends. Last resort, not first choice.
              </li>
            </ul>
            <p>
              The order matters legally. If something goes wrong and the HSE asks why you used a
              harness instead of a tower, "it was quicker" isn’t an answer they’re going to like.
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

          <ContentEyebrow>Picking the right access kit</ContentEyebrow>

          <ConceptBlock
            title="Ladders are for access and short, light work"
            plainEnglish="Ladders aren’t banned. They’re fine for getting up to a platform, or for a quick job where you can keep three points of contact. They’re not workshops."
            onSite="HSE’s 'LA455 — Safe use of ladders and stepladders' is the doc that gets quoted at inquests. Worth a 10-minute read."
          >
            <p>
              The trade myth that "ladders are illegal" came from the older Regs being scrapped.
              Ladders are still legal — but only if they’re the most suitable kit for the job, the
              job is short and light, and you can work safely from them.
            </p>
            <p>The HSE rules of thumb:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Time:</strong> max 30 minutes at one position for a leaning ladder. Longer
                = get a tower.
              </li>
              <li>
                <strong>Three points of contact:</strong> two feet and a hand, or two hands and a
                foot, on the ladder at all times. If the job needs both hands free, it’s the wrong
                kit.
              </li>
              <li>
                <strong>1:4 angle (about 75°):</strong> 1 unit out for every 4 units up.
                Modern Class 1 ladders have a sticker on the stile.
              </li>
              <li>
                <strong>Secure it.</strong> Tie the top to something solid, or use a stand-off
                bracket and a footer at the base.
              </li>
              <li>
                <strong>Pre-use check.</strong> Stiles straight, no missing rungs, feet not worn,
                locking bars on extension ladders engaged.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Towers, podiums and MEWPs — when each one earns its place">
            <p>
              <strong>Podium steps</strong> are the everyday upgrade from a stepladder for
              second-fix work. Guardrail platform, both hands free, stable. If you’re doing more
              than half an hour on a stepladder, the podium is almost always the right answer.
            </p>
            <p>
              <strong>Mobile scaffold towers</strong> (PASMA-trained erector required) are for
              longer work at moderate heights — long lighting runs in a warehouse, multiple
              ceiling points in a corridor. Wheels locked, outriggers out, guardrails up, never
              moved with anyone on board.
            </p>
            <p>
              <strong>MEWPs</strong> (cherry pickers, scissor lifts — IPAF card needed) are for
              high work, awkward angles, or when there’s no floor space for a tower. Always wear
              the harness IN the basket — not for falling out, but for being thrown out by a
              sudden movement.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Work at Height Regulations 2005 — Regulation 12(1)"
            clause="Every employer shall ensure that, where the safety of any work equipment depends on how it is installed or assembled, it is not used after installation or assembly unless it has been inspected in that position."
            meaning={
              <>
                In English: a tower has to be inspected (and the inspection recorded) before
                anyone goes on it, after any alteration, and at intervals of no more than 7 days
                if it stays up. The Scaffold Tag system on the bottom of the tower is how that
                gets recorded — if there’s no current tag, don’t use it.
              </>
            }
            cite="Reference: legislation.gov.uk — WAHR 2005 Reg 12; HSE INDG401 'Scaffold Inspection'"
          />

          <CommonMistake
            title="Using the top of a stepladder as a workbench"
            whatHappens={
              <>
                You’re balanced on the very top step (the one labelled "do not stand"), drilling
                into a ceiling, leaning sideways to reach the next downlight. The step rocks
                slightly. Your knee buckles. You go off the side, you don’t have time to grab
                anything, you land on the consumer unit you just installed.
              </>
            }
            doInstead={
              <>
                Top step is for the platform-style stepladders only — and only the ones designed
                for it (with a railed platform and side guards). For everything else, your knees
                should always be below the top of the steps. If you can’t reach without
                over-stretching, get a podium or a taller stepladder. Costs nothing to swap kit;
                costs everything to fall.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Confined spaces — the law</ContentEyebrow>

          <ConceptBlock
            title="What actually counts as a confined space"
            plainEnglish="Two-part test. First: is the space substantially enclosed? Second: is there a foreseeable specified risk — fire/explosion, gas, lack of oxygen, drowning, engulfment, or heat?"
          >
            <p>
              The Confined Spaces Regulations 1997 don’t list rooms by name. They give you a test:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Substantially enclosed:</strong> not necessarily fully sealed. A floor
                void with one access hatch counts. So does a partly open trench if it’s deep
                enough.
              </li>
              <li>
                <strong>Specified risk:</strong> at least one of — fire/explosion, loss of
                consciousness from gases/fumes/lack of O—, drowning, asphyxiation by free-flowing
                solids, dangerous heat.
              </li>
            </ul>
            <p>
              Sparks meet confined spaces all the time and don’t always clock it: cable risers,
              floor voids, basement plant rooms, manholes for street lighting, transformer rooms,
              ducts behind switchgear, lift pits. If both parts of the test are met, the Regs
              apply — full stop.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Confined Spaces Regulations 1997 — Regulation 4(1)"
            clause="No person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry."
            meaning={
              <>
                The first duty is to <strong>avoid entry</strong> if you can. Drop a fish tape
                instead of crawling in. Pre-fab the assembly outside. Use a remote camera. Only
                enter when there’s genuinely no other way — and document why.
              </>
            }
            cite="Reference: legislation.gov.uk — The Confined Spaces Regulations 1997 (SI 1997/1713)"
          />

          <ConceptBlock title="The four things that have to happen before anyone enters">
            <p>
              If avoidance isn’t reasonably practicable, the Regs (Reg 4(2) and Reg 5) require a
              safe system of work plus emergency arrangements. In practice that means:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Test the atmosphere.</strong> Multi-gas detector (O—, CO, H—S, LEL).
                Test top, middle, bottom — some gases sink, some rise. Bump-tested that day,
                calibrated on schedule.
              </li>
              <li>
                <strong>2. Ventilate.</strong> Mechanical ventilation in, fume extraction out.
                Continuous monitoring throughout the work. If readings drift, evacuate.
              </li>
              <li>
                <strong>3. Permit-to-work.</strong> Written authorisation by a competent person.
                States who, what, where, when, the controls, the rescue plan, the time limit.
                Signed in, signed out.
              </li>
              <li>
                <strong>4. Standby person.</strong> Stays outside the entry point. Maintains
                comms. Counts entrants in and out. Triggers the rescue plan if anything goes
                wrong. Never goes in to attempt rescue without proper kit and training.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Confined Spaces Regulations 1997 — Regulation 5(1)"
            clause="No person at work shall enter or carry out work in a confined space unless there have been prepared in respect of that confined space suitable and sufficient arrangements for the rescue of persons in the event of an emergency, whether or not arising out of a specified risk."
            meaning={
              <>
                Translation: rescue plan READY before entry, not invented when something goes
                wrong. That includes rescue equipment on standby (tripod and winch, BA sets,
                resus kit), a route for the casualty, and competent rescuers. The standby person
                isn’t the rescuer — they raise the alarm.
              </>
            }
            cite="Reference: legislation.gov.uk — Confined Spaces Regulations 1997; HSE L101 ACoP"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The electrical add-ons</ContentEyebrow>

          <ConceptBlock
            title="What makes height and confined-space work harder for sparks"
            plainEnglish="Wet, cramped, metal everywhere, often using power tools. The shock and arc-flash risks are higher than in a dry lounge."
          >
            <p>Two environments stack extra electrical risks on top of the obvious ones:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Damp + metal:</strong> body resistance drops sharply when you’re sweaty
                or kneeling on wet concrete in a basement. A shock that would just sting in
                ordinary conditions can stop your heart in a confined space.
              </li>
              <li>
                <strong>Reduced low-voltage (110V CTE) systems</strong> are required on construction
                sites and strongly recommended in confined spaces. The 55V to earth means a fault
                voltage is far less likely to be lethal.
              </li>
              <li>
                <strong>Battery tools where you can.</strong> No trailing leads to trip on,
                nothing to plug in, no extension reels to overheat in a hot, enclosed space.
              </li>
              <li>
                <strong>IP-rated lighting:</strong> festoons or task lights rated for the
                environment. Don’t use a domestic LED lamp on a flying lead in a flooded
                manhole.
              </li>
              <li>
                <strong>Isolation discipline:</strong> lock-off and prove dead are even more
                critical. You can’t step back if something goes live — there’s nowhere
                to go.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Underfloor heating fault in a refurb — the floor void calls"
            situation={
              <>
                You’re sent to fault-find an underfloor heating system in a converted Victorian
                house. The mat’s gone short somewhere under the kitchen. Access is via a hatch
                in the corner of the room — 1.2m drop, brick crawl space, single 600mm opening,
                old gas main running along one wall.
              </>
            }
            whatToDo={
              <>
                Stop. Apply the test: enclosed (yes), specified risk (gas main = potential
                fire/explosion + possible O— displacement = yes). It’s a confined space.
                Don’t go in until: gas detector deployed and reading clear, a permit raised,
                ventilation set up, a standby person at the hatch, and a means of getting you out
                if you collapse. Use a 110V or battery insulation tester from outside the void
                where possible.
              </>
            }
            whyItMatters={
              <>
                Refurb jobs are where this stuff bites — nobody talks about confined spaces in
                a kitchen, until you’re kneeling next to a 1960s steel gas pipe with a
                resistance meter. The Regs apply just the same as in a sewer.
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

          <ContentEyebrow>Competence and what happens if it goes wrong</ContentEyebrow>

          <ConceptBlock title="Who can do what — and what training looks like">
            <p>
              WAHR Reg 5 and Confined Spaces Reg 4(2) both put a competence duty on the employer.
              For us on the tools that means specific tickets:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PASMA</strong> for erecting and using mobile aluminium scaffold towers.
                Half-day course, valid 5 years.
              </li>
              <li>
                <strong>IPAF</strong> for MEWPs (cherry pickers, scissor lifts). Categories 1a,
                1b, 3a, 3b. PAL card valid 5 years.
              </li>
              <li>
                <strong>Confined Spaces — low/medium/high risk</strong> training (typically City
                & Guilds 6160 series). Higher risk = breathing apparatus + escape sets + extended
                rescue training.
              </li>
              <li>
                <strong>Working at Height Awareness</strong> (often delivered with safe ladder
                use and harness inspection — free or low-cost from CITB).
              </li>
            </ul>
            <p>
              You don’t have to hold all these as an apprentice — but you DO have to know what
              you’re not yet ticketed for, and not let yourself get pushed into doing it
              anyway.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Real penalties — not just for the boss"
            onSite="HSE prosecute under WAHR and the Confined Spaces Regs every year. They go after employers AND individual supervisors AND, less often, individual workers under HASAWA s.7."
          >
            <p>
              Sentencing Council guidelines tie fines to company turnover and seriousness. For
              a fall fatality, fines for the company can run into millions, with custodial
              sentences for directors. For workers found to have ignored the safe system of work
              — unlimited fine and up to 2 years inside under HASAWA s.7.
            </p>
            <p>
              The CSCS card system also bites: serious safety incidents can get your card
              suspended or pulled. No card, no site, no work.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "WAHR 2005 has no height threshold — if a fall could hurt you, the Regs apply.",
              "Hierarchy: AVOID work at height → PREVENT the fall (collective kit) → MITIGATE it (personal kit). Order matters in court.",
              "Leaning ladders — short, light work only (max 30 min at one position), 1:4 angle, three points of contact, secured.",
              "Confined space = substantially enclosed AND a foreseeable specified risk. Cable risers, voids and plant rooms can qualify.",
              "Before entry: test atmosphere, ventilate, permit-to-work, standby person who never enters to rescue.",
              "Electrical work adds extra risk in both environments — use 110V CTE or battery tools, IP-rated lighting, and obsessive isolation discipline.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz
            title="Working at Height & Confined Spaces knowledge check"
            questions={quizQuestions}
          />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fire hazards and explosive environments
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Slip, trip and manual handling risks
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
