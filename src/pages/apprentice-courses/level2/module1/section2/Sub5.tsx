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
  'Slips, Trips and Manual Handling | Level 2 Module 1.2.5 | Elec-Mate';
const DESCRIPTION =
  "The injuries that quietly write off more spark careers than electric shock — and how to keep yours intact.";

/* ── Inline check questions (wired into stats/streaks) ───────────── */

const checks = [
  {
    id: 'sub2-5-trip-cause-check',
    question: 'On a typical electrical fit-out, what causes the most trips?',
    options: [
      'Wet floors after cleaning',
      'Trailing extension leads and tools left in walkways',
      'Bad lighting in plant rooms',
      'Loose carpet edges',
    ],
    correctIndex: 1,
    explanation:
      "Trailing leads, drill cases and offcuts in the walkway are the classic spark trip. Cable management isn’t admin — it’s how you stop the next person going over.",
  },
  {
    id: 'sub2-5-tile-check',
    question: "TILE — what does the 'I' stand for?",
    options: [
      'Installation',
      'Individual',
      'Inspection',
      'Instruction',
    ],
    correctIndex: 1,
    explanation:
      "Individual — your own capability. Trained for it? Fit enough today? Carrying an old back injury? TILE forces you to be honest before you lift.",
  },
  {
    id: 'sub2-5-mhor-priority-check',
    question: 'Under MHOR 1992, what does the boss have to do FIRST?',
    options: [
      'Issue back-support belts',
      'Set a 25 kg weight limit for the site',
      'Avoid the manual handling where reasonably practicable',
      'Send everyone on a one-day lifting course',
    ],
    correctIndex: 2,
    explanation:
      "Reg 4 is a hierarchy: AVOID the lift if you can, ASSESS what you can’t avoid, REDUCE the risk to as low as reasonably practicable. Training and belts come well after 'do we even need to carry it?'.",
  },
];

/* ── End-of-page Quiz (wires into stats/streaks) ────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'Which regulation puts the legal duties on manual handling at work?',
    options: [
      'BS 7671',
      'EAWR 1989',
      'Manual Handling Operations Regulations 1992 (as amended)',
      'PUWER 1998',
    ],
    correctAnswer: 2,
    explanation:
      "MHOR 1992 (amended 2002) covers any lifting, lowering, pushing, pulling or carrying of a load by hand or bodily force — that’s most of what a spark does on a fit-out.",
  },
  {
    id: 2,
    question: "What does TILE stand for?",
    options: [
      'Time, Impact, Load, Equipment',
      'Task, Individual, Load, Environment',
      'Tools, Installation, Labour, Evaluation',
      'Training, Instruction, Lifting, Emergency',
    ],
    correctAnswer: 1,
    explanation:
      "Task, Individual, Load, Environment — the four headings HSE expects you to think through before any non-trivial lift. It’s the assessment, not just the lift.",
  },
  {
    id: 3,
    question: 'Under MHOR 1992 Reg 4, what is the FIRST duty on the employer?',
    options: [
      'Provide manual handling training',
      'Set a fixed weight limit for all employees',
      'Avoid hazardous manual handling so far as is reasonably practicable',
      'Issue lifting belts to all operatives',
    ],
    correctAnswer: 2,
    explanation:
      "AVOID first. Only if avoidance isn’t reasonably practicable do you then ASSESS the risk and REDUCE it. Skipping straight to 'wear a back belt' fails the regulation.",
  },
  {
    id: 4,
    question: 'HSE indicative guideline weight for a man lifting at waist height, close to the body, is around:',
    options: ['10 kg', '16 kg', '25 kg', '50 kg'],
    correctAnswer: 2,
    explanation:
      "The HSE figure is roughly 25 kg for men, 16 kg for women — IF the load is close to the body, at waist height, no twisting. Move it lower, higher, or away from your trunk and the safe figure drops sharply.",
  },
  {
    id: 5,
    question: 'A consumer unit weighs about 8 kg. Why is it still a manual handling risk?',
    options: [
      "It isn’t — only loads over 25 kg count",
      'Awkward shape, lifted overhead, often with twist — small weight, bad posture',
      'Because it has live parts',
      'Because the regs say anything electrical needs an assessment',
    ],
    correctAnswer: 1,
    explanation:
      "Weight is only one factor. Lifted above shoulder height, away from your body, while twisting to feed it onto a backing board — the load on your spine is many times the kit’s actual mass.",
  },
  {
    id: 6,
    question: 'Best single defence against a slip on a wet plant-room floor?',
    options: [
      'Walking faster to spend less time on it',
      'Non-slip safety footwear plus warning signage and clean-up',
      'High-vis vest',
      'Insulated gloves',
    ],
    correctAnswer: 1,
    explanation:
      "Slip-rated boots stop you going over, signage stops the next person walking into it, and cleaning the spill removes the hazard. Belt and braces — that’s how slip risk is actually controlled.",
  },
  {
    id: 7,
    question: 'Which of these is the MOST common trip hazard on a live electrical site?',
    options: [
      'Damaged floor tiles',
      'Loose carpet',
      'Trailing extension leads and tool flexes',
      'Stair edges',
    ],
    correctAnswer: 2,
    explanation:
      "Look at any second-fix snag list — leads everywhere, drill flexes draped across doorways. It’s the spark’s signature trip hazard. Use cable covers, route round the edge, lift them when you stop for a brew.",
  },
  {
    id: 8,
    question: 'You arrive to swap a 45 kg distribution board on your own in a tight cupboard. Right call?',
    options: [
      'Crack on — you can manage it with good technique',
      'Stop, do a TILE, get a second pair of hands or a board lifter',
      'Lift it once quickly so you minimise time under load',
      "Wear a back belt and it’ll be fine",
    ],
    correctAnswer: 1,
    explanation:
      "45 kg solo in a confined space is a textbook MHOR breach. TILE it, arrange a team lift or a mechanical aid, and put it in writing if anyone pressures you to push on alone.",
  },
];

/* ── FAQs (apprentice voice) ─────────────────────────────────────── */

const faqs = [
  {
    question: "I’m 19 and fit — do these weight limits really apply to me?",
    answer:
      "Yes. The HSE indicative figures (25 kg for men, 16 kg for women, close to the body at waist height) are an upper guide for an average healthy worker — not a target. Your back doesn’t get tougher with age, it gets weaker. The damage you do at 19 dragging a cable drum solo is what stops you working at 50.",
  },
  {
    question: "What if my supervisor says 'just lift it, you’ll be fine'?",
    answer:
      "Politely point at MHOR Reg 4 — avoid first, then assess. Ask for a second person, a sack truck, a board lifter, or a re-plan. Make a note (date, who said what). Section 7 of HASAWA puts the duty on YOU not to be reckless, even if someone above you is pushing. The supervisor’s pressure isn’t a defence in court.",
  },
  {
    question: "What’s actually wrong with a back-support belt?",
    answer:
      "HSE guidance is clear: there’s no good evidence belts prevent injury, and people wearing them often think they can lift more than they should. The fix is to remove or reduce the lift — lighter packs, mechanical aids, team lifts, better posture — not to strap your spine up and crack on.",
  },
  {
    question: 'Do I need a written risk assessment for every lift?',
    answer:
      "No. MHOR wants a 'suitable and sufficient' assessment for any handling that involves a risk of injury. A 5 kg coil of T&E across a clear floor doesn’t need a form. A 30 kg motor up a stepladder in a plant room does — that ends up as a RAMS line on the job, not a one-off lift you eyeball.",
  },
  {
    question: 'The Workplace Regulations come up a lot — what bit covers slips and trips?',
    answer:
      "Workplace (Health, Safety and Welfare) Regulations 1992, Regulation 12 — floors and traffic routes. They have to be suitable, kept free of obstruction, and not slippery enough to cause a risk. Reg 8 covers lighting (enough to do the job safely). Most slip / trip prosecutions cite Reg 12.",
  },
  {
    question: "Slips and trips sound minor compared to a shock. Are they really worth a whole subsection?",
    answer:
      "HSE figures put slips, trips and falls on the same level as the biggest single cause of major injury at work — about a third of reported injuries in construction. Manual handling is the biggest single cause of long-term sickness absence. They’re the injuries that quietly take sparks off the tools for months — or for good.",
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2 · Subsection 5"
            title="Slips, trips and manual handling"
            description="Not as dramatic as a 230 V belt, but these are the injuries that quietly write off more spark careers than shock ever does. Worth ten minutes — your back will thank you in twenty years."
            tone="emerald"
          />

          <TLDR
            points={[
              "Slips, trips and manual handling are the biggest cause of long-term injury on site — bigger than electric shock by a long way.",
              "MHOR 1992 says AVOID the lift first, then ASSESS what you can’t avoid, then REDUCE the risk. TILE is how you assess.",
              "HSE indicative limit is roughly 25 kg (men) / 16 kg (women) close to the body — but posture, distance and twist matter more than the number on the box.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain why slips, trips and manual handling injuries dominate the HSE statistics for construction.",
              "Apply the TILE method to a real lift on site (Task, Individual, Load, Environment).",
              "Recall the MHOR 1992 hierarchy — avoid, assess, reduce — and what counts as 'reasonably practicable'.",
              "Know the HSE indicative weight figures and why posture and distance change them.",
              "Spot the classic spark trip hazards (trailing leads, tool cases, offcuts) and fix them at source.",
              "Refuse a lift that breaches MHOR without losing your job — and document why.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this subsection exists</ContentEyebrow>

          <ConceptBlock title="The injuries that actually take sparks off the tools">
            <p>
              Ask any second-year apprentice what’s going to hurt them and they’ll say
              electric shock. Look at HSE’s annual injury figures and the picture flips:
              slips, trips and falls on the same level account for around a third of
              reportable construction injuries. Handling, lifting and carrying is the
              biggest single cause of long-term work-related sickness — back, shoulder,
              knee.
            </p>
            <p>
              Shock kills the unlucky few. Bad lifting and a wet floor end careers
              steadily, year after year. By the time a spark in their forties starts
              telling you "my back’s gone", that’s three decades of small, ignored
              injuries finally cashing in. The point of this subsection is to keep your
              back, knees and shoulders working until you decide to stop using them.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The law on lifting</ContentEyebrow>

          <ConceptBlock
            title="Manual Handling Operations Regulations 1992"
            plainEnglish="If you’re using your body to move a load — lift, lower, push, pull, carry — MHOR applies. Doesn’t matter if it’s a coil of cable or a person."
            onSite="Sat in a fit-out van, MHOR is in everything: lifting boards, dragging drums, hoisting cable trays, manhandling consumer units onto backing boards."
          >
            <p>
              MHOR 1992 (amended 2002) was put in place because handling injuries were
              eating UK industry alive — back then, more than one in four reportable
              injuries came from manual handling. The Regulations apply to any lifting,
              lowering, pushing, pulling or carrying of a load by hand or bodily force,
              animate or inanimate.
            </p>
            <p>
              The duty isn’t "lift correctly". It’s a strict three-step hierarchy on the
              employer in Reg 4. You’ll see it again and again in RAMS — it’s the spine
              of every manual-handling assessment.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="MHOR 1992 — Regulation 4(1)"
            clause={
              <>
                Each employer shall — (a) so far as is reasonably practicable, avoid
                the need for his employees to undertake any manual handling operations
                at work which involve a risk of their being injured; or (b) where it is
                not reasonably practicable to avoid the need for his employees to
                undertake any manual handling operations at work which involve a risk of
                their being injured — (i) make a suitable and sufficient assessment of
                all such manual handling operations to be undertaken by them, … (ii)
                take appropriate steps to reduce the risk of injury to those employees
                arising out of their undertaking any such manual handling operations to
                the lowest level reasonably practicable …
              </>
            }
            meaning={
              <>
                Three steps in order: <strong>AVOID</strong> the lift,{' '}
                <strong>ASSESS</strong> what you can’t avoid,{' '}
                <strong>REDUCE</strong> the risk. Notice what’s NOT on the list — there
                is no "give them a back belt and crack on". If avoidance hasn’t been
                considered first, the regulation has been breached, full stop.
              </>
            }
            cite="Source: HSE — Manual Handling at Work (L23). Verbatim from SI 1992/2793."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How you assess a lift — TILE</ContentEyebrow>

          <ConceptBlock
            title="TILE: Task, Individual, Load, Environment"
            onSite="If your supervisor only lets you tick boxes on a paper TILE, fine — but think it through. The piece of paper isn’t the assessment. Your honest answer is."
          >
            <p>
              TILE is HSE’s plain-English way of doing a manual handling assessment
              under MHOR Reg 4. Four headings, asked in order. If any one of them flags
              an issue, the lift gets re-planned — different person, different kit,
              different route, mechanical aid, or split the load.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>T — Task.</strong> What’s the lift? How far, how high, how
                often? Twisting involved? Reaching above shoulder? Carrying down stairs?
                The further the load is from your spine, the more it loads your back —
                exponentially.
              </li>
              <li>
                <strong>I — Individual.</strong> You. Trained for this? Carrying an old
                injury? Tired at the end of a long week? Pregnant? New to the trade and
                the technique isn’t second nature yet? Be honest — nobody else can do
                that for you.
              </li>
              <li>
                <strong>L — Load.</strong> Weight is the obvious bit, but shape, grip,
                stability and contents shifting matter just as much. A 15 kg coil of
                SWA with sharp ends behaves nothing like a 15 kg neat box.
              </li>
              <li>
                <strong>E — Environment.</strong> Floor surface, lighting, space to
                manoeuvre, temperature, weather. A consumer unit going onto a backing
                board in a tight airing cupboard is a totally different lift from the
                same unit on a workshop bench.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The 25 kg figure — and why it lies"
            plainEnglish="HSE’s number is for an average healthy worker, lift held close to the body, at waist height, no twist. Move the load away from you, up high or down low, and the safe weight drops fast — sometimes to a quarter of the headline figure."
          >
            <p>
              You’ll see "25 kg for men, 16 kg for women" thrown around as if it’s a
              hard limit. It isn’t. HSE publishes a graphic showing how the
              <em> indicative</em> safe weight changes with hand position relative to
              the body. At full arm’s reach above shoulder height, the figure for a man
              drops to around 5 kg. That’s the difference between a coil of 1.5 mm² and
              a small downlight.
            </p>
            <p>
              For electrical work the implication is simple. Anything overhead — cable
              tray, lighting, fire alarm sounders, smoke detectors — is a high-load lift
              even when the kit is light. Anything in a confined cupboard with a twist
              is a high-load lift. Anything down low (below knee) is a high-load lift.
              "It’s only 10 kg" isn’t an answer.
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

          <ContentEyebrow>Slips and trips — the actual law</ContentEyebrow>

          <ConceptBlock
            title="Workplace Regulations Reg 12 covers floors and walkways"
            onSite="Walking onto a site at induction, the floors and routes you can see are someone’s Reg 12 duty. If you make them worse — leaving leads, dropping offcuts — you’re undoing their compliance and creating yours under HASAWA s.7."
          >
            <p>
              The Workplace (Health, Safety and Welfare) Regulations 1992 are the
              quiet workhorse behind every clean walkway on site. Reg 12 puts duties on
              the employer about the construction and condition of floors and traffic
              routes — they have to be suitable, properly maintained and kept free of
              obstructions and substances likely to cause a slip, trip or fall.
            </p>
            <p>
              Reg 8 covers lighting — enough to allow people to work and move about
              safely. Most spark slip/trip incidents come back to one of these two
              regulations on the prosecution paperwork.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Workplace (Health, Safety and Welfare) Regulations 1992 — Regulation 12(3)"
            clause="So far as is reasonably practicable, every floor in a workplace and the surface of every traffic route in a workplace shall be kept free from obstructions and from any article or substance which may cause a person to slip, trip or fall."
            meaning={
              <>
                "Every floor". Every traffic route. Not just the main ones. The
                walkway you’ve left a drill case in counts. The corridor full of
                cable offcuts counts. The leads you’ve draped across the apprentices'
                route to the welfare cabin count. If someone goes over, the
                investigation follows the leads back to whose kit it was.
              </>
            }
            cite="Verbatim from SI 1992/3004 — see HSE.gov.uk/workplace for full text."
          />

          <ConceptBlock title="The four spark trip hazards you’ll see today">
            <p>
              Same four show up on almost every site. They’re worth recognising on
              sight because the fix is in your hands — none of them needs a meeting.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Trailing leads.</strong> Extension reels and 110 V flexes
                routed across doorways and corridors. Fix: route round the perimeter,
                tape down where you can’t, use cable covers (drop-over rubber tracks)
                where pedestrians cross.
              </li>
              <li>
                <strong>Tools and cases left in walkways.</strong> Drill case open on
                the floor, impact driver under a stair tread. Fix: tools go back in the
                bag the second you’re not using them. Habit, not effort.
              </li>
              <li>
                <strong>Offcuts and packaging.</strong> Trunking ends, tray offcuts,
                pulled-back cardboard — slips when wet, trips when dry. Fix: skip
                trips throughout the day, not just at end-of-shift.
              </li>
              <li>
                <strong>Loose floor sections during second-fix.</strong> Lifted boards
                in a riser, lifted carpet in an office. Fix: warning tape, edge
                protection, never leave the area without making it safe.
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

          <SectionRule />

          <ContentEyebrow>Slips — the wet floor problem</ContentEyebrow>

          <ConceptBlock
            title="Three layers of slip prevention"
            plainEnglish="Stop the spill. If you can’t, mark it. If you can’t mark it fast enough, your boots have to take the hit."
          >
            <p>
              Slip control on site is layered. Best is to remove the source — drips
              from a leaking pipe, condensation from a chiller, water tracked in from
              outside. Next best is to contain it — mat at the door, drip tray under
              the leak. Then mark it — wet floor signs, barriers. Last line of
              defence is what’s on your feet.
            </p>
            <p>
              Site-spec safety boots should carry an SRC slip rating where you’re
              working on smooth or wet surfaces. They’re not waterproof boots, they’re
              slip-resistant boots — the sole is graded against tile + soap and steel +
              glycerol. If your boots are bald or the tread is packed with mud, the
              rating means nothing.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating manual handling like a strength test"
            whatHappens={
              <>
                You’re 19, you can lift it, so you do. Solo, no aid, twisting onto a
                backing board. Nothing happens that day. Or that month. Three years
                later you wake up with a bulged disc and a doctor signing you off the
                tools for six weeks. Your boss’s insurance investigates — no TILE, no
                team lift requested, no record. The injury claim falls flat.
              </>
            }
            doInstead={
              <>
                Manual handling is a planning test, not a strength test. If a lift
                fails TILE on any of the four headings, ask for a second person, a
                board lifter, a sack truck, or a re-plan. The strongest spark on site
                is the one still on the tools at 55 — not the one who can dead-lift a
                consumer unit at 19.
              </>
            }
          />

          <Scenario
            title="The 45 kg distribution board in a tight cupboard"
            situation={
              <>
                You’re sent to swap a TP&N distribution board in a basement plant
                cupboard. You arrive — it’s a 45 kg board, the cupboard is barely
                shoulder-width, lighting is one fluorescent tube, and the floor’s damp
                from a recent leak. Your supervisor isn’t on site. Just you and a
                second-year.
              </>
            }
            whatToDo={
              <>
                Stop. TILE it on the spot. Task: high lift, twist, awkward access.
                Individual: two of you, one a second-year. Load: 45 kg, well over the
                indicative figure even for ideal conditions. Environment: wet floor,
                poor light, confined space. Phone the supervisor. Ask for a board
                lifter or strap kit, an extra body, a temporary task light, and the
                leak dealt with before you go in. Note the call.
              </>
            }
            whyItMatters={
              <>
                MHOR Reg 4 doesn’t ask whether you <em>could</em> do it. It asks
                whether the risk of injury has been reduced to as low as reasonably
                practicable. Cracking on without raising it puts you in breach of
                HASAWA s.7 as well — "the supervisor wasn’t here" doesn’t transfer the
                blame.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Good housekeeping — boring, important</ContentEyebrow>

          <ConceptBlock
            title="Housekeeping is safety, not appearance"
            onSite="The 'clean as you go' poster on the welfare wall isn’t aesthetic — it’s the cheapest control measure on site. Walkway clear, no skip dive, no trip claim."
          >
            <p>
              Housekeeping looks like a soft topic until you read the prosecutions.
              The vast majority of slip/trip claims come down to a walkway someone
              didn’t clear, a spill someone didn’t mop, or a cable nobody routed
              properly. None of it needs equipment or training — just a habit of
              putting things away as you go.
            </p>
            <p>
              The crew habits that matter most: clear leads back to the reel at every
              break, sweep cuttings into a rubble bag at the end of each section of
              work, never leave a tool case open in a corridor, and any time you
              create a temporary hazard (lifted board, opened CU front, extension lead
              across a route), you own it until it’s safe.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HASAWA 1974 — section 7"
            clause="It shall be the duty of every employee while at work to take reasonable care for the health and safety of himself and of other persons who may be affected by his acts or omissions at work …"
            meaning={
              <>
                Housekeeping is a section 7 duty for you personally. Leaving leads
                across a walkway is an "act". Walking past a spill without flagging
                it is an "omission". Both put you in scope of s.7 if someone goes over
                because of it — the boss having a tidy site policy doesn’t take that
                off you.
              </>
            }
            cite="Reference: HSE — Health and Safety at Work etc. Act 1974"
          />

          <SectionRule />

          <ContentEyebrow>Mechanical aids — use them</ContentEyebrow>

          <ConceptBlock
            title="The kit that takes the strain off your back">
            <p>
              MHOR’s preferred fix for a heavy or awkward lift isn’t a stronger spark
              — it’s a piece of kit. The common ones on electrical jobs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sack truck / barrow.</strong> Cable drums, motors, switchgear,
                anything wheel-able down a corridor. Plates the load on its wheels
                instead of on your spine.
              </li>
              <li>
                <strong>Board lifter / panel jack.</strong> Specialist for distribution
                boards, especially commercial TP&N units. Lifts and holds the board on
                the wall while you fix it. Hire kit, not stocked in every van — but
                cheap to hire for the day.
              </li>
              <li>
                <strong>Cable drum stand and roller.</strong> Lets you pull cable off
                the drum without lifting the drum itself. Saves you and stops the cable
                kinking.
              </li>
              <li>
                <strong>Genie lift / pump-up lifter.</strong> For overhead trunking,
                cable tray, lighting bars. Replaces the "pass it up the stepladder"
                fight.
              </li>
              <li>
                <strong>Team-lift straps.</strong> When you can’t avoid two people
                lifting, straps share the load and force good posture (load close, back
                straight, knees doing the work).
              </li>
            </ul>
            <p>
              The boss’s job under MHOR Reg 4(1)(b)(ii) is to take "appropriate steps
              to reduce the risk of injury … to the lowest level reasonably
              practicable". If a £40 hire stops a £40,000 back-injury claim, the
              "reasonably practicable" call is obvious.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What good lifting looks like</ContentEyebrow>

          <ConceptBlock
            title="If you have to lift it, lift it like this"
            plainEnglish="Close to your body, knees doing the work, no twist. Lead with the legs, not the back."
          >
            <p>
              When the lift can’t be avoided and the kit isn’t available, the
              technique still matters. The HSE method, in plain English:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan it.</strong> Where’s it going? Route clear? Place to set
                it down? Don’t pick anything up you haven’t already worked out where to
                set down.
              </li>
              <li>
                <strong>Stable base.</strong> Feet shoulder-width apart, one slightly
                forward for balance.
              </li>
              <li>
                <strong>Bend the knees, not the back.</strong> Squat to the load.
                Spine in its natural curve.
              </li>
              <li>
                <strong>Get a firm grip.</strong> Both hands. Test the weight by
                rocking it before committing.
              </li>
              <li>
                <strong>Lift smoothly.</strong> Drive up with the legs. Keep the load
                close to your trunk — the further out, the more force on your spine.
              </li>
              <li>
                <strong>Don’t twist.</strong> If you need to turn, move your feet.
                Twisting under load is what wrecks discs.
              </li>
              <li>
                <strong>Set down the same way.</strong> Knees, not back. Don’t drop the
                last few inches.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Slips, trips and manual handling injure more sparks long-term than electric shock — by a long way.",
              "MHOR 1992 Reg 4 hierarchy: AVOID the lift, ASSESS what you can’t avoid, REDUCE the risk to as low as reasonably practicable.",
              "TILE is your assessment: Task, Individual, Load, Environment. If any one fails, re-plan.",
              "HSE indicative figures (25 kg / 16 kg) assume close-to-body, waist-height, no twist. Overhead, low or away from your trunk, the safe weight drops sharply.",
              "Workplace Regulations Reg 12 covers floors and routes — leaving leads or offcuts in walkways breaches it (and HASAWA s.7 puts you personally on the hook).",
              "Mechanical aids and team lifts aren’t weakness — they’re the regulation working. The strongest spark is the one still on the tools at 55.",
            ]}
          />

          <Quiz title="Slips, trips and manual handling knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section2/2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Working at height and confined spaces
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Risk assessment and method statements
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
