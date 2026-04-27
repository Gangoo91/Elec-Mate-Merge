/**
 * Module 4 · Section 1 · Subsection 1 — Hand tools for different tasks
 * Maps to City & Guilds 2365-02 / Unit 204 / LO1 / AC 1.1
 *   AC 1.1 — "Identify hand tools for different tasks"
 *
 * Frame: the pouch and the tool roll an apprentice carries on shift. Walks
 * the eight categories of hand tool — cutting, forming, stripping,
 * terminating, measuring, marking, fixing, cable management — with
 * apprentice-grade brand realism and the PUWER 1998 hook for "right tool
 * for the job".
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
  'Hand tools for different tasks (1.1) | Level 2 Module 4.1.1 | Elec-Mate';
const DESCRIPTION =
  'The eight categories of hand tool an electrician carries — cutting, forming, stripping, terminating, measuring, marking, fixing and cable management — what each is for, when to reach for it and how PUWER 1998 frames "right tool for the job".';

/* ── Inline checks (wired into streaks/stats) ─────────────────────── */

const checks = [
  {
    id: 'mod4-s1-sub1-pliers',
    question:
      "You're forming a tight loop in a 1.5 mm² solid copper conductor to land it under a screw terminal on an old metal-clad switch. Which plier in your pouch does the cleanest job?",
    options: [
      'Side cutters — they grip and form in one go.',
      "Long-nose pliers — slim jaws let you wrap the conductor around the screw thread to form a clockwise loop without crushing the copper. Combination pliers are too bulky for the job; side cutters are for cutting only and will nick the strand if you try to form with them.",
      'Combination pliers — bigger is better.',
      "Whatever's nearest in the pouch.",
    ],
    correctIndex: 1,
    explanation:
      "Long-nose (sometimes called needle-nose) are the forming tool. The slim taper gets into a screw-terminal recess that combination jaws can't reach, and the smooth inner surface forms a clean loop without nicking the conductor. Side cutters are dedicated cutting tools and using them to grip will leave a crush mark that becomes a stress riser — that's where the conductor breaks six months later.",
  },
  {
    id: 'mod4-s1-sub1-stripper',
    question:
      "You've got a roll of 2.5 mm² T+E to first-fix a kitchen ring. The cores are solid copper PVC. What's the right stripping tool and why?",
    options: [
      'A Stanley knife — quick.',
      "An auto-adjusting wire stripper (Knipex 12 62 180 or similar) OR a preset-jaw stripper sized for 2.5 mm². Both grip the insulation cleanly, separate it from the conductor without scoring the copper, and leave a square shoulder for the terminal. Knife stripping a solid conductor scores the copper, creates a fracture point, and fails BS 7671 526.1 'durable mechanical strength' on first inspection.",
      'Side cutters held at an angle.',
      'Your teeth.',
    ],
    correctIndex: 1,
    explanation:
      "Auto-strippers and preset-jaw strippers are designed precisely for solid PVC-insulated conductors. They sense or are set to the conductor diameter and only cut the insulation, not the copper. Knife stripping is acceptable for the OUTER sheath of T+E (where the cores are protected) but is the wrong tool for the cores themselves. Score the copper and you've started a stress fracture that BS 7671 526.1 says shouldn't be there.",
  },
  {
    id: 'mod4-s1-sub1-screwdriver',
    question:
      "You're terminating into a Hager 6 kA RCBO in a domestic consumer unit. The terminal screw is captive and small. The senior electrician says 'use the right driver'. Which one and why?",
    options: [
      "Whatever cross-head you've got in the van.",
      "A VDE-insulated screwdriver of the size and tip type the manufacturer specifies (Hager terminal screws are typically Pozidriv #2). 'VDE' means the shaft is tested to 1000 V AC and the handle insulated — so if the supply gets re-energised you're protected. The right tip prevents cam-out (the slip that strips the screw and leaves you scrapping a £30 RCBO).",
      'A flat blade — quicker.',
      'A magnetised philips driver.',
    ],
    correctIndex: 1,
    explanation:
      "Two things matter — VDE insulation (in case the supply is energised by mistake, even though you've isolated) AND the correct tip profile. Hager / Schneider / Wylex DBs use Pozidriv (PZ2 mostly) in their terminals; using a Phillips (PH2) looks similar but the angle is wrong and it cams out, mangling the screw. Wera, Wiha, CK and Klein all do certified VDE sets — most apprentices end up with the Wera Kraftform 7-piece as a starter kit.",
  },
];

/* ── End-of-page Quiz (wired into streaks/stats) ──────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "PUWER 1998 Regulation 4 requires work equipment to be 'suitable' for the work it's used for. For an electrician's hand tool, what does 'suitable' practically mean?",
    options: [
      'It belongs to the firm.',
      "Three things — fit for the task (right type and size — long-nose for forming, side cutters for cutting, VDE driver for live-near-terminal work), in good condition (not damaged, blunt or modified), and used in the way the manufacturer intended (no tin snips as can openers, no screwdrivers as chisels). Tools used outside any one of those three legs breach Reg 4.",
      'It has the firm logo on it.',
      "It was bought in the last six months.",
    ],
    correctAnswer: 1,
    explanation:
      "PUWER Reg 4 ('suitability of work equipment') is the umbrella duty — the right tool, in the right condition, used the right way. The HSE prosecutes a lot of 'wrong tool for the job' cases under Reg 4 alongside any specific injury offence. It's the regulation that sits behind every tool-related toolbox talk you'll ever sit through.",
  },
  {
    id: 2,
    question:
      "You're forming the end of an 8 mm² flexible bonding tail for a gas pipe clamp. Which combination of hand tools gives you a tidy, code-compliant termination?",
    options: [
      'A knife and combination pliers.',
      "Cable cutters (or T+E shears) to crop the tail square; a stripper sized for 6/10 mm² to remove the green/yellow PVC; long-nose pliers to form the conductor into the clamp aperture OR a ratchet crimper to fit a bootlace ferrule (red for 10 mm², blue for 6 mm²) before insertion. Squared cut + clean strip + correct termination = 526.1 compliant.",
      'Just a Stanley knife.',
      'A power drill.',
    ],
    correctAnswer: 1,
    explanation:
      "Three-tool sequence — cut, strip, terminate. For solid or stranded bonding tails the modern preference is a bootlace ferrule (sized to the conductor — covered in Sub 1.4) crimped with a ratchet crimper. That gives a clean cylindrical termination that the clamp can grip without splaying or crushing the strands. Long-nose forming is fine for solid conductors but ferrules are tidier and BS 7671 526.1 friendly.",
  },
  {
    id: 3,
    question:
      "Your supervisor tells you to mark out the position of a 47 mm metal-clad back box on a brick wall before chasing. What set of marking and measuring tools does a tidy first-fix use?",
    options: [
      'Best guess.',
      "Tape measure (5 m or 8 m, lockable), spirit level (a torpedo level for short runs, a 600 mm level for socket lines), pencil OR a chinagraph pencil for darker surfaces, and a marker square (or just the level on edge) to keep the back box parallel to the line of the wall. Centre-mark with a small cross so the chaser knows where the centre is, not just the outline.",
      'A laser level only.',
      'Just a tape measure.',
    ],
    correctAnswer: 1,
    explanation:
      "Setting out is one of the things that separates a tidy first-fix from a sloppy one. Tape + level + clean marker + a deliberate centre cross means the chaser doesn't have to guess where the back box really sits, and means the second-fix accessory lines up with the rest of the room. On a kitchen run with eight sockets in a line, getting the marking out tidy at first-fix saves an hour of arguing on second-fix.",
  },
  {
    id: 4,
    question:
      "A senior electrician shows you their tool roll and points out the difference between combination pliers, side cutters and long-nose pliers. Which job is each one BEST suited to?",
    options: [
      "They're interchangeable.",
      "Combination pliers — heavy-duty grip, twisting solid conductors, pulling cable through tight runs, light cutting of soft material. Side cutters (sometimes called diagonal cutters or 'snips') — flush cutting of insulated and bare conductor, trimming cable ends. Long-nose pliers — forming loops, reaching into recessed terminals, holding small components while you tighten. One job each, no overlap if you can help it.",
      'Combination for everything.',
      'Long-nose for cutting.',
    ],
    correctAnswer: 1,
    explanation:
      "Three different jaw geometries, three different jobs. Combination jaws are the workhorse — bulk twist and grip. Side cutters have a thin cutting edge that meets at a shallow angle for clean cuts. Long-nose taper to a slim point for reach and precision. Use the wrong one and you either damage the conductor (forming with side cutters) or damage the tool (cutting with long-nose). Carrying all three is non-negotiable; that's why every starter pouch comes with the trio.",
  },
  {
    id: 5,
    question:
      "You're under a kitchen unit running 6 mm² T+E to a cooker outlet plate. The cable needs to run through three joists and around a CH pipe. Which hand tool group helps you actually pull the cable through the route?",
    options: [
      'Power tools only.',
      "Cable management hand tools — fish tape (steel or fibreglass, 10–30 m for domestic), draw rope for longer pulls, cable lubricant for tight bends or full conduit runs, and a 'cable sock' or 'pulling grip' for SWA and larger flexes. The fish tape feeds in from the destination, you hook the cable on at the source and pull it through. Without fish tape and lube you'll end up pulling on the conductor itself, stretching the copper and failing 526.1.",
      'Just push the cable harder.',
      'A heat gun.',
    ],
    correctAnswer: 1,
    explanation:
      "Cable management is its own little category — fish tape (sometimes called a draw wire or rod-set), draw rope for longer or heavier pulls, lube for friction-sensitive runs (PVC conduit especially), and pulling grips for cables you can't safely pull on by the conductor. Apprentices who try to muscle cable through joists without these tools end up either ripping insulation, snapping conductors, or wasting an afternoon. The tools turn an awkward pull into a 30-second job.",
  },
  {
    id: 6,
    question:
      "BS 7671 Regulation 526.1 requires every connection to have 'durable electrical continuity and adequate mechanical strength'. How does your choice of stripping tool affect compliance?",
    options: [
      "It doesn't.",
      "Directly. A correctly-sized stripper removes only the insulation, leaving the copper undamaged — full cross-section preserved, full current-carrying capacity, full mechanical strength. A knife strip nicks the copper, reducing the cross-section and creating a stress-riser fracture point. A few months of thermal cycling and the conductor breaks at the nick — high resistance, hot terminal, eventual failure on EICR or worse, on fire alarm. The stripping tool is part of the 526.1 chain.",
      'Only the crimp matters.',
      'Only the screw matters.',
    ],
    correctAnswer: 1,
    explanation:
      "526.1 isn't just about the screw being tight — it's about the conductor being intact when it gets to the screw. A knife-stripped conductor with a quarter of its strands cut through has a quarter less cross-section and behaves like a deliberately-undersized cable. That's why preset or auto-strippers are the standard choice for cores — they physically cannot bite into the copper.",
  },
  {
    id: 7,
    question:
      "You're issued a tool kit on day one of your apprenticeship. The supervisor tells you to mark every tool with your initials. Why?",
    options: [
      'Vanity.',
      "Three reasons. Practical — site tools migrate; marking yours stops it disappearing into a sub-contractor's pouch. Insurance — if a tool causes an accident, the firm needs to know whose competent person was meant to be checking it. Accountability — under PUWER you're personally responsible for the tools you use; marking tells the supervisor (and the HSE if it ever gets there) that the tool was assigned to a named operative who had the duty of pre-use inspection.",
      'For decoration.',
      "It's not necessary.",
    ],
    correctAnswer: 1,
    explanation:
      "Sharpie or punch-mark on every handle, plus a tool ID label inside the lid of the pouch. Tools walk on busy sites — a Knipex stripper is a £35 item that goes missing the moment it leaves your roll. The accountability angle matters too: PUWER Reg 5 wants someone responsible for the maintenance of each tool, and 'this is John's stripper' is a much tidier answer than 'it's the firm's'.",
  },
  {
    id: 8,
    question:
      "Which categories together cover everything an apprentice does in their first month of installation work — first-fixing T+E and second-fixing accessories?",
    options: [
      'Power tools, paint, glue.',
      "Cutting (T+E shears, side cutters, hacksaw for trunking and conduit), stripping (auto-strippers and a sharp Stanley for outer sheath) and terminating (Pozidriv VDE drivers for accessory terminations, ratchet crimper for ferrules where used). Layered on top of that — measuring (tape, level), marking (pencil or chinagraph), and fixing (claw hammer for joist clips, club hammer for chasing). Six categories in two months.",
      'Just screwdrivers.',
      'Just pliers.',
    ],
    correctAnswer: 1,
    explanation:
      "Realistic categorisation of an apprentice's first-month work. The first-fix is mostly cutting and routing the cable, and pinning it to joists. The second-fix is stripping the cores and terminating into the accessory. Marking and measuring sit alongside both. Master those six and you've covered the bulk of the real work for the first quarter of your apprenticeship.",
  },
];

/* ── FAQs (apprentice voice) ───────────────────────────────────────── */

const faqs = [
  {
    question: "Do I really need to spend £200+ on Knipex / Wera / Wiha kit, or are budget tools fine?",
    answer:
      "Budget tools work fine for some categories (claw hammer, tape measure, spirit level — a £15 unit is functionally identical to a £40 one) but not for others. Pliers, strippers, VDE drivers and ratchet crimpers are jobs where the £35 Knipex strips more cleanly than the £8 alternative for years longer. Most apprentices start with a midmarket kit (CK or Draper Expert), upgrade to Knipex / Wera / Wiha for the high-use items as they earn, and end up with a roll that's 70% midmarket and 30% premium by end of year two.",
  },
  {
    question: "VDE drivers — do I need them if I always isolate properly?",
    answer:
      "Yes. Safe isolation is your primary defence; insulated tools are your secondary defence. The whole point of layered safety is that one layer can fail (isolation lifted by another trade, supply re-energised by mistake, induced voltage on parallel circuits) and the next layer still keeps you alive. VDE-rated drivers (1000 V AC, marked with the double-triangle and the IEC 60900 logo) are cheap insurance against the moment the isolation you trusted turns out not to have held.",
  },
  {
    question: "How do I know when a hand tool needs replacing rather than re-using?",
    answer:
      "Insulation cracked or split (any VDE driver — replace immediately), jaws or cutting edges chipped or rolled (pliers, cutters, snips — re-grind if you know how, or replace), tape measure with a blade that won't retract or has the first 100 mm bent (replace — you can't trust the dimension), spirit level dropped and now reading off vertical (replace — a level that lies isn't a level). Sub 1.3 covers the inspection routine in detail; the test is 'would I be happy for the supervisor to do a pre-use check on this tool right now?'.",
  },
  {
    question: "Why do some screws on consumer units take Pozidriv and others take Phillips? They look the same.",
    answer:
      "They're not the same. Phillips (PH) and Pozidriv (PZ) have different head geometry — Phillips is designed to cam out at high torque (a feature for assembly-line use, not an electrical-terminal feature). Pozidriv has additional radial ribs at 45° that grip more positively and resist cam-out. UK and European DB manufacturers (Hager, Schneider, Wylex, MK) almost universally use Pozidriv on terminal screws for that reason. A PH driver in a PZ screw will work for half a turn then strip the screw — and you've just scrapped a working RCBO. Carry both, learn to spot the four extra ribs.",
  },
  {
    question: "Is it worth buying my own tape measure or do I use whatever's on the van?",
    answer:
      "Buy your own. A 5 m or 8 m Stanley FatMax or Tajima with a magnetic hook is £15 and lasts years. Tape measures live in your back pocket — sharing one across the firm means it's never where you need it, and shared tapes get dropped. The other reason: your apprenticeship competence record will eventually want sign-off on dimensional setting-out and your tutor will ask whose tape it was. 'Mine' is a tidier answer than 'whoever's was nearest'.",
  },
  {
    question: "What's the difference between cable shears and side cutters? They both cut cable.",
    answer:
      "Different jaw geometry for different jobs. T+E shears (Knipex 95 02 165 or similar) have a curved, scissor-style jaw designed to cut sheathed cable cleanly without crushing the cores inside — the cut comes out square. Side cutters have a flat, anvil-style jaw designed for individual conductors — they will cut T+E but they crush it as they go, leaving a flattened end that's awkward to strip. Most apprentices carry both: shears for cropping cable runs, side cutters for trimming conductors at the terminal.",
  },
];

export default function Sub1() {
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 1"
            title="Hand tools for different tasks"
            description="The eight categories of hand tool an electrician carries — cutting, forming, stripping, terminating, measuring, marking, fixing and cable management. Which one fits which job, the brand-realism around what apprentices actually inherit, and how PUWER 1998 frames 'right tool for the job' as a legal duty."
            tone="emerald"
          />

          <TLDR
            points={[
              "Hand tools fall into eight working categories — cutting, forming, stripping, terminating, measuring, marking, fixing and cable management. Each category exists because no single tool does the whole job well.",
              "PUWER 1998 Reg 4 makes 'right tool for the job' a legal duty. The wrong tool isn't just clumsy — it's a regulatory breach the HSE will pin on the firm AND the operative.",
              "Premium kit (Knipex, Wera, Wiha, CK, Klein) earns its money on the high-use items — pliers, strippers, VDE drivers, ratchet crimpers. Budget kit is fine for tape measures, levels and hammers.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify the eight working categories of electrician's hand tool — cutting, forming, stripping, terminating, measuring, marking, fixing and cable management.",
              "Match a specific hand tool (combination pliers, long-nose pliers, side cutters, auto-strippers, VDE driver, ratchet crimper) to the task it is designed for.",
              "Recognise the BS 7671 526.1 link between stripping technique and durable termination — and why the wrong tool fails the regulation.",
              "Identify VDE-rated insulated hand tools (IEC 60900 / 1000 V AC double-triangle marking) and know when they are required.",
              "Apply PUWER 1998 Reg 4 'suitability' duty to a real tool-selection decision on site.",
              "Distinguish Pozidriv from Phillips at sight on a UK distribution-board terminal screw and know why the difference matters.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this Sub matters</ContentEyebrow>

          <ConceptBlock
            title="Eight categories — every job is some combination of them"
            plainEnglish="An electrician's pouch is never one tool — it's a small collection that maps to the operations the work actually needs. Cutting cable, forming the end, stripping the insulation, terminating to a screw or clamp, measuring out distances, marking positions, fixing back boxes and accessories, and managing the cable through its route. Eight categories. Every first-fix and second-fix is some sequence of those eight."
            onSite="On a typical second-fix you'll touch six of the eight categories on a single socket — cut the loose end, strip the cores, form or ferrule them, terminate into the back of the socket, measure that the face is flush, mark up the test certificate. Three minutes of work, six categories of tool. That's why nothing in the pouch is optional."
          >
            <p>
              The eight categories that sit behind almost everything an apprentice does on installation work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cutting</strong> — side cutters, T+E shears, jacket-cutting knife, hacksaw (for trunking and conduit), aviation snips (for tray and ducting).
              </li>
              <li>
                <strong>Forming</strong> — combination pliers, long-nose pliers, side-cutter pliers (for grip-and-twist tasks).
              </li>
              <li>
                <strong>Stripping</strong> — auto-adjusting strippers, preset-jaw strippers, jacket cutters for outer sheath, knife for sheath only.
              </li>
              <li>
                <strong>Terminating</strong> — VDE-insulated screwdrivers (Pozidriv, Phillips, slotted, Torx), torque drivers, ratchet crimpers, hex die crimpers for compression lugs.
              </li>
              <li>
                <strong>Measuring</strong> — tape measure (5 m / 8 m), scale rule, spirit level (torpedo + 600 mm), plumb bob, laser level for longer runs.
              </li>
              <li>
                <strong>Marking</strong> — pencil, chinagraph (waxy marker for dark or oily surfaces), scriber for metal, centre punch for drilling pilots.
              </li>
              <li>
                <strong>Fixing</strong> — claw hammer (joist clips, cable clips), club hammer (chasing brick / breaking out), bolster (chasing), chisel set.
              </li>
              <li>
                <strong>Cable management</strong> — fish tape (steel or fibreglass), draw rope, cable lubricant, pulling grips, cable rollers for heavy SWA.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The legal hook — PUWER 1998 Reg 4</ContentEyebrow>

          <ConceptBlock
            title="Why 'wrong tool for the job' is a regulatory issue, not just a moan"
            plainEnglish="The Provision and Use of Work Equipment Regulations 1998 (PUWER) are made under HASAWA. Reg 4 is the headline duty — 'every employer shall ensure that work equipment is so constructed or adapted as to be suitable for the purpose for which it is used or provided'. That binds the firm. The same regs through other limbs bind the supervisor and the operative."
            onSite="The HSE doesn't tend to prosecute 'used a side cutter to form a loop' on its own — but every tool-related injury investigation starts with PUWER Reg 4. If the wrong tool was in your hand when you got hurt, that's the first paragraph of the witness statement. Tidy operatives reach for the right tool first time, every time, because PUWER says so AND because it's faster."
          >
            <p>
              Reg 4 has three limbs in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Suitability of design</strong> — the tool must be the right type for the job (long-nose for forming, side cutters for cutting).
              </li>
              <li>
                <strong>Suitability of condition</strong> — the tool must be in working order, not damaged or modified.
              </li>
              <li>
                <strong>Suitability of use</strong> — the tool must be used in the way the manufacturer intended (no screwdrivers as chisels, no spanners as hammers, no tin snips as can openers).
              </li>
            </ul>
            <p>
              Layered on top of Reg 4 is Reg 5 (maintenance — covered properly in Sub 1.3) and Reg 9 (training — the supervisor's duty to make sure you know how to use the tool before handing it to you). Together they form the everyday backbone of how site work equipment is managed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Provision and Use of Work Equipment Regulations 1998 — Reg 4"
            clause={
              <>
                <p className="mb-2">
                  <strong>Reg 4(1)</strong> &mdash; &quot;Every employer shall ensure that work
                  equipment is so constructed or adapted as to be suitable for the purpose for which
                  it is used or provided.&quot;
                </p>
                <p>
                  <strong>Reg 4(3)</strong> &mdash; &quot;Every employer shall ensure that work
                  equipment is used only for operations for which, and under conditions for which,
                  it is suitable.&quot;
                </p>
              </>
            }
            meaning={
              <>
                Two duties — equipment must BE suitable, AND must only be USED for what it&apos;s
                suitable for. A perfectly good Stanley knife is suitable equipment under Reg 4(1)
                but using it to strip solid copper conductor breaches Reg 4(3) because that&apos;s
                not what the knife is for. Both legs of the Reg are tested at any HSE
                investigation.
              </>
            }
            cite="Source: Provision and Use of Work Equipment Regulations 1998 (S.I. 1998/2306), Reg 4 — verbatim from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Cutting tools</ContentEyebrow>

          <ConceptBlock
            title="The dedicated cutters — and why a knife isn't one of them"
            onSite="Every apprentice's first cut on a job will be cropping a length of T+E off the drum. Reach for T+E shears or side cutters first, not a Stanley. The shears give a square cut, the cutters trim flush, the knife crushes the sheath and bleeds the cores out the end. First impressions on site come down to small details like a clean cable end."
          >
            <p>
              The cutting category breaks into four jobs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cropping cable runs</strong> — T+E shears (Knipex 95 02 165) for sheathed cable; cable cutters (rotary or scissor-style) for SWA and larger cables. Square, clean cut without crushing the cores inside.
              </li>
              <li>
                <strong>Trimming conductors</strong> — side cutters (Knipex Cobra or generic 160 mm). Flush cut at the screw terminal so no whisker pokes out past the insulation.
              </li>
              <li>
                <strong>Slitting outer sheath</strong> — jacket-cutting knife (CK Dextra, Knipex ErgoStrip) OR a Stanley with a fresh blade used carefully along the length of the sheath. Apprentices learn the &apos;score and snap&apos; method early — score the sheath without going deep enough to touch the cores, then flex it open.
              </li>
              <li>
                <strong>Cutting trunking, conduit, tray</strong> — junior hacksaw (32 TPI blade for thin-wall conduit, 24 TPI for trunking and tray). Aviation snips (red / yellow / green for left / straight / right) for sheet tray and basket.
              </li>
            </ul>
            <p>
              The single rule that unifies the category — the cutting edge is for cutting, not gripping. Side cutters used as pliers will roll the edge in a week. T+E shears used to grip a stuck cable end will spring the pivot. Each tool earns its keep doing one job; using it for another wastes the tool and breaches PUWER Reg 4(3).
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

          <ContentEyebrow>Forming tools — the three pliers</ContentEyebrow>

          <ConceptBlock
            title="Combination, long-nose, side-cutter — three jaws, three jobs"
            plainEnglish="Pliers are the most-used tool in the pouch and the easiest to misuse. Each of the three has a different jaw geometry and a different job. Combination pliers grip and twist. Long-nose form loops and reach into recesses. Side cutters cut. Use the wrong one and you either damage the conductor or damage the tool."
          >
            <p>
              Walk through each:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Combination pliers</strong> (Knipex 03 02 180) — workhorse. Heavy-duty grip on the flat jaws for twisting solid conductors, a serrated grip below for round stock, a side-cutting edge near the pivot for occasional cutting of soft material. NOT for forming small loops (jaws too thick) and not for fine cutting (rough edge).
              </li>
              <li>
                <strong>Long-nose / needle-nose pliers</strong> (Knipex 25 02 160) — slim tapered jaws. The forming tool. Wraps a conductor around a screw thread, reaches into a deep recess, holds a small terminal nut while you tighten. NOT for cutting (jaws too narrow, will spring) and not for heavy gripping.
              </li>
              <li>
                <strong>Side cutters / diagonal cutters</strong> (Knipex 70 02 160) — flat jaw, cutting edge. The dedicated cutting tool for individual conductors. Flush-cuts so no whisker projects beyond the insulation. NOT for forming, not for gripping.
              </li>
            </ul>
            <p>
              Most apprentices carry the three Knipex (or Wera Kraftform / CK Redline equivalent) as the core of their pouch, plus a fourth pair — water pump (slip-joint) pliers for gland nuts, locknuts and the occasional pipework fitting on bonding work.
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

          <ContentEyebrow>Stripping tools — and the BS 7671 link</ContentEyebrow>

          <ConceptBlock
            title="Strippers exist because knives ruin conductors"
            plainEnglish="The single most important hand-tool decision an apprentice makes is what they use to strip insulation off cores. Get it wrong and you nick the copper, which reduces the cross-section, which becomes a stress fracture, which fails BS 7671 526.1 (durable mechanical strength) on the first thermal cycle."
            onSite="The senior electrician will hand you an auto-stripper or a preset-jaw stripper at the start of your second-fix and tell you to put your knife away for cores. That's not them being precious — that's them protecting the firm from a future EICR call-back when the terminal lets go six months from now."
          >
            <p>
              Three families of stripping tool:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Auto-adjusting strippers</strong> (Knipex 12 62 180, CK 495002, Stanley
                FatMax) — single tool handles 0.5 mm² to 6 mm². Senses conductor diameter and only
                cuts insulation. Fast for varied work; the standard apprentice choice.
              </li>
              <li>
                <strong>Preset-jaw strippers</strong> (Knipex 11 06 160, Klein 11061) — fixed
                stations sized 0.5 / 0.75 / 1.0 / 1.5 / 2.5 / 4.0 mm². Slightly cleaner cut than
                auto-strippers if you&apos;re only working one or two sizes. Common for repeat work
                like a panel build.
              </li>
              <li>
                <strong>Jacket-cutting knives and rotary cable strippers</strong> — for the OUTER
                sheath of T+E, SWA armour, and conduit-type cables. Stanley with a fresh blade is
                fine for the T+E sheath. SWA needs a dedicated armour-cutting tool (covered in Sub
                1.4).
              </li>
            </ul>
            <p>
              The general rule: knives are for sheaths, dedicated strippers are for cores. Apprentices who default to knives for everything end up with a string of failed terminations — and the supervisor signs them off the test schedule until they switch tools.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A2:2022 — Reg 526.1"
            clause={
              <>
                &quot;Every connection between conductors or between a conductor and other equipment
                shall provide durable electrical continuity and adequate mechanical strength and
                protection.&quot;
              </>
            }
            meaning={
              <>
                Three requirements packed into one sentence — durable continuity, mechanical
                strength, protection. The stripping tool affects the second leg directly. A nicked
                conductor doesn&apos;t have full mechanical strength; thermal cycling pulls the
                stress riser apart and continuity fails. The terminal screw can be perfectly
                tightened and the connection can still fail 526.1 because of what happened upstream
                at the stripping stage.
              </>
            }
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Chapter 52, Reg 526.1 — verbatim from the bs7671_regulations dataset."
          />

          <SectionRule />

          <ContentEyebrow>Terminating — drivers, crimpers, torque tools</ContentEyebrow>

          <ConceptBlock
            title="Pozidriv, Phillips, slotted — and why VDE matters"
            onSite="UK consumer units almost universally use Pozidriv on terminal screws. American kit (Klein, Milwaukee) sometimes ships with Phillips drivers as the primary set — those don't fit Hager / Schneider / Wylex / MK terminal heads cleanly and will cam out and strip the screw. Carry a PZ1 + PZ2 + PZ3 set and a slotted set, both VDE-insulated."
          >
            <p>
              The terminating category covers everything that secures a conductor to a piece of equipment:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VDE-insulated screwdrivers</strong> (Wera Kraftform 7-piece, Wiha SoftFinish, CK Dextro). Look for the IEC 60900 double-triangle and &quot;1000 V&quot; marking on the shaft. Tip types: Pozidriv (PZ1 / PZ2 / PZ3), Phillips (PH1 / PH2), slotted (3.5 / 5.5 / 6.5 mm), Torx (T15 / T20 / T25 — common on industrial control gear).
              </li>
              <li>
                <strong>Torque screwdrivers</strong> — preset (Wera 7440 Click-Torque, Wiha torqueVario) for site work, dial-set for workshop. Apprentices typically inherit a 1.2 Nm preset for class-2 control equipment and a 3.5 Nm preset for distribution-board terminations. Torque tools are covered in detail in Sub 1.4.
              </li>
              <li>
                <strong>Crimpers</strong> — ratchet crimpers for bootlace ferrules and small lugs (red 1.0 / grey 0.75 / black 1.5 / blue 2.5 / yellow 4 / red 6 mm² ferrules), hex-die crimpers for compression lugs above 6 mm², hydraulic crimpers above 50 mm². Sub 1.4 unpacks the colour codes and dies in detail.
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

          <ContentEyebrow>Measuring and marking</ContentEyebrow>

          <ConceptBlock
            title="Tidy first-fix is 80% measuring and marking"
            plainEnglish="The actual cutting and chasing on a first-fix is 20% of the time. The other 80% is figuring out where the back boxes go, marking the level, getting the centres consistent across a wall of sockets. The tools for that bit are simple but must be in your pouch."
          >
            <p>
              The measuring and marking kit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tape measure</strong> — 5 m for short work, 8 m for whole rooms. Stanley FatMax or Tajima with a magnetic hook. Always your own (sharing tapes never works).
              </li>
              <li>
                <strong>Spirit levels</strong> — 200 mm torpedo level for back-boxes, 600 mm for socket lines, 1.2 m for panel installs. Magnetic base for steelwork is worth the extra fiver.
              </li>
              <li>
                <strong>Plumb bob</strong> — for vertical drops where a level can&apos;t reach. Mostly replaced by laser cross-line levels on bigger jobs but still a pouch staple.
              </li>
              <li>
                <strong>Pencil</strong> — soft (HB or 2B) for plaster and timber, harder pencil for blockwork. Carpenter&apos;s flat pencil holds an edge longer than a round one.
              </li>
              <li>
                <strong>Chinagraph</strong> — waxy marker that writes on dark / oily / dusty surfaces where pencil won&apos;t. Standard for marking up trunking covers, panel internals, switchgear.
              </li>
              <li>
                <strong>Scriber and centre punch</strong> — scriber for metalwork (back-of-trunking marking), centre punch for drilling pilot dimples on steel.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Fixing — hammers, bolster, chisel</ContentEyebrow>

          <ConceptBlock
            title="The fixing tools an electrician actually uses"
            onSite="An electrician's claw hammer is for cable clips, joist clips, and the occasional tap on a stuck back box. It's not a framing hammer — keep it small (16 oz / 450 g). The club hammer + bolster combo is for chasing brick, knocking out blockwork for back boxes, and breaking the corner off a brick when you need to clear a route. Both live in the toolbox, not the pouch."
          >
            <p>
              The fixing tools:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Claw hammer</strong> — 16 oz for general work. Cable clips, masonry nails for clipping, joist staples. The claw is for pulling crooked nails, not for chasing.
              </li>
              <li>
                <strong>Club hammer (lump hammer)</strong> — 1.1 kg / 2.5 lb. The driving force behind the bolster and chisel for chasing. Always paired with a bolster, never used directly on plaster.
              </li>
              <li>
                <strong>Bolster</strong> — wide flat blade for chasing brick and lifting back boxes out of pre-formed pockets. Always with a hand-guard (the rubber donut around the shaft).
              </li>
              <li>
                <strong>Cold chisel set</strong> — narrow chisel for splitting brick on a chase, masonry chisel for blockwork. Less used than the bolster but in the toolbox for the awkward chases.
              </li>
            </ul>
            <p>
              Modern alternative — the SDS hammer drill on a chiselling setting (covered in Sub 1.2) replaces a lot of bolster work. Most apprentices still learn the manual route first because the SDS isn&apos;t always to hand and the wrist control you build with a bolster transfers to the SDS later.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cable management</ContentEyebrow>

          <ConceptBlock
            title="Fish tape, draw rope, lube — the unglamorous heroes"
            plainEnglish="When the cable won't go through the joist or up the wall cavity, the answer is rarely 'pull harder'. It's a fish tape (or rod set) fed in from the destination, hooked onto the cable at the source, and pulled through. Add lube for tight runs in conduit. The whole category is cheap and turns 30-minute battles into 30-second pulls."
          >
            <p>
              The kit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fish tape</strong> — flat steel tape on a winder (CK MightyRod, Klein flat tape) or fibreglass rod set (CK MightyRod PRO, Super Rod CRSGS). Steel for shorter runs (10–20 m); fibreglass rods for longer pulls and for runs through conduit where the rod has to push as well as pull.
              </li>
              <li>
                <strong>Draw rope</strong> — heavier-duty pull for SWA and bigger cables. Polypropylene or pre-spliced nylon, 3 mm or 5 mm diameter, on a winder. Pre-installed in a duct as a draw cable for future pulls.
              </li>
              <li>
                <strong>Cable lubricant</strong> — water-based gel (Polywater J, Klein 51010) for friction-sensitive runs in conduit. Doesn&apos;t damage PVC insulation. Essential for full-fill conduits and tight bends.
              </li>
              <li>
                <strong>Pulling grips / cable socks</strong> — woven steel mesh sleeves that grip a cable along its length so you can pull on the cable without pulling on the conductor. Standard for SWA and larger flexes where pulling on the conductor risks stretching the copper.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Using a Stanley knife to strip individual conductor cores"
            whatHappens={
              <>
                Apprentice runs out of patience with the auto-stripper, picks up a Stanley knife
                and circumferentially cuts the insulation around a 1.5 mm² conductor. Knife goes
                4&ndash;5 strands deep into the copper. Termination tightens fine. Six months later
                the supervisor is back on the job because a socket on the ring final won&apos;t
                pass an EICR R1+R2 test &mdash; the conductor has fractured at the nick under
                thermal cycling and the ring is now a radial. The whole socket has to come off, the
                cable end has to be re-cropped past the damage, and the customer&apos;s warranty
                conversation is awkward.
              </>
            }
            doInstead={
              <>
                Use auto-strippers (Knipex 12 62 180) or preset-jaw strippers (Knipex 11 06 160)
                for ALL conductor cores. The Stanley is for the OUTER sheath of T+E only, used
                with the &apos;score and snap&apos; method &mdash; score the sheath, never the
                cores. If you must strip a core in an emergency without strippers to hand,
                circumferential ring-cuts with side cutters at the right depth are safer than a
                knife &mdash; but the right answer is &apos;never strip cores with a knife&apos;.
              </>
            }
          />

          <CommonMistake
            title="Using a Phillips driver in a Pozidriv consumer-unit terminal"
            whatHappens={
              <>
                Apprentice has a PH2 driver in their pouch and tries to terminate into a Hager
                RCBO (Pozidriv PZ2 terminals). PH2 looks like it fits but the angle is shallower
                and there are no engaging ribs. Half a turn in, the driver cams out and chews the
                head of the screw. Terminal can&apos;t now grip cleanly; either the RCBO has to be
                replaced (£30+), or the supervisor has to extract a damaged screw with mole grips.
                Either way the apprentice has to explain why the firm just lost an hour and a part.
              </>
            }
            doInstead={
              <>
                Carry a Pozidriv set (PZ1, PZ2, PZ3) AND a Phillips set (PH1, PH2) and learn to
                spot the difference at sight. Pozidriv has four extra ribs at 45&deg; to the main
                cross; Phillips has only the cross. UK domestic and commercial DBs (Hager,
                Schneider, Wylex, MK, Crabtree) are almost universally Pozidriv. American gear
                (Square D US, some Klein products) is more often Phillips. Match the tip to the
                screw and the cam-out problem disappears.
              </>
            }
          />

          <Scenario
            title="First job — &apos;go and prep the kitchen ring&apos;"
            situation={
              <>
                You&apos;re first day on a refurb. The senior electrician hands you a drum of 2.5
                mm&sup2; T+E and says &quot;crack on with the kitchen ring &mdash; eight sockets,
                run already chased, just clip and fit&quot;. You open your tool roll and check
                what you&apos;ve got. What&apos;s essential and what would slow you down if it was
                missing?
              </>
            }
            whatToDo={
              <>
                Essential kit for that job: T+E shears (cropping cable lengths), side cutters
                (trimming cores at terminals), auto-stripper (stripping the cores), VDE Pozidriv
                drivers (terminating into the back of MK / Crabtree / BG sockets), claw hammer
                (clipping cable to chases), tape measure (centring back boxes), spirit level
                (levelling each box), pencil (marking cable runs and back-box positions). If
                you&apos;re missing the auto-stripper you&apos;ll waste 30 seconds per termination
                using a knife badly. If you&apos;re missing the VDE drivers you&apos;re working
                without your secondary safety layer. Either is a stop-and-borrow moment with the
                supervisor &mdash; not a &quot;crack on regardless&quot; moment.
              </>
            }
            whyItMatters={
              <>
                The first day&apos;s work is what the supervisor uses to gauge how much
                hand-holding you need on the rest of the job. A tidy first kitchen ring with
                clean cuts, square strips, neat terminations and level back boxes earns trust
                that lets you onto the more interesting work earlier. A sloppy job with knife
                strips and crooked boxes earns supervision on every single termination for the
                next month. The tools you carry are what makes the difference.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Hand tools fall into eight working categories — cutting, forming, stripping, terminating, measuring, marking, fixing and cable management. Master the categories first, then learn the brand variations within each.",
              "PUWER 1998 Reg 4 makes 'right tool for the job' a legal duty on the firm AND the operative. Reg 4(1) — equipment must BE suitable. Reg 4(3) — equipment must only be USED for what it's suitable for.",
              "BS 7671 526.1 is directly affected by stripping technique. Auto-strippers and preset-jaw strippers protect conductor cross-section; knives nick copper, create stress risers, and fail durable mechanical strength on thermal cycling.",
              "Pliers — combination for grip, long-nose for forming, side cutters for cutting. Three jaw geometries, three jobs, no overlap. Using one for another either damages the conductor or damages the tool.",
              "VDE-insulated drivers (IEC 60900, 1000 V AC, double-triangle marking) are the secondary safety layer when isolation is the primary. Match the tip — Pozidriv PZ2 for UK consumer units, never Phillips.",
              "Premium kit (Knipex, Wera, Wiha, CK, Klein) earns its money on the high-use items — pliers, strippers, drivers, ratchet crimpers. Budget kit is fine for tape measures, levels, hammers.",
              "Cable management tools (fish tape, draw rope, lube, pulling grips) turn 30-minute pulling battles into 30-second jobs and protect the conductor from being stretched at the source.",
              "Mark every tool with your initials. PUWER Reg 5 expects a named person responsible for maintenance; insurance and supervisor accountability both want to know whose tool was in whose hand at the moment something went wrong.",
            ]}
          />

          <Quiz title="Hand tools knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section1/1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 Power tools
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
