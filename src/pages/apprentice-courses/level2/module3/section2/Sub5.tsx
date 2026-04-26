/**
 * Module 3 · Section 2 · Subsection 5 — Reading a real installation drawing pack end-to-end
 * Maps to City & Guilds 2365-02 / Unit 203 / LO2 / AC 2.1, 2.2, 2.3, 2.4
 *   AC 2.1 — "State purpose of different sources of technical information"
 *   AC 2.2 — "Recognise different drawing types"
 *   AC 2.3 — "Recognise symbols used in drawings"
 *   AC 2.4 — "Convert scale from drawings to actual dimensions"
 *
 * SYNTHESIS Sub. Walks the apprentice through a complete domestic install
 * drawing pack (Plot 14, "The Hawthorn" — a 3-bed semi) sheet by sheet.
 * Every sheet ties back to a §2 Sub: Sub1 (sources), Sub2 (drawing types),
 * Sub3 (BS EN 60617 symbols), Sub4 (scale).
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
  'Reading a real installation drawing pack end-to-end (2.1, 2.2, 2.3, 2.4) | Level 2 Module 3.2.5 | Elec-Mate';
const DESCRIPTION =
  'Synthesis Sub — walking through a complete domestic drawing pack from front sheet to as-built. Floor plan, schematic, wiring diagram, schedule of accessories, cable schedule and scale legend, pulled together on one project.';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'm3-s2-sub5-reading-order',
    question:
      'You open a fresh drawing pack for a job you have never seen before. Which sheet do you read FIRST?',
    options: [
      'The cable schedule — so you can start ordering materials',
      'The wiring diagram for the busiest circuit — that tells you the most',
      'The front sheet (drawing register, revision history, scale legend, title block)',
      'The schedule of accessories — so you know what to buy',
    ],
    correctIndex: 2,
    explanation:
      'Front sheet first, every time. It tells you the project name, the revision you are looking at, what every sheet in the pack is for, the scale used and any general notes. Skip it and you risk working from a superseded revision or the wrong scale — both classic apprentice traps.',
  },
  {
    id: 'm3-s2-sub5-scale-derive',
    question:
      'On the 1:50 ground-floor plan you measure the run from the consumer unit to the kitchen ring "first socket" with a scale rule on the 1:50 face. The rule reads 4.6 m direct. The actual cable will follow the skirting and drop into a back-box. What do you write on the take-off?',
    options: [
      '4.6 m — exactly what the rule reads',
      '4.6 m × 50 = 230 m — multiply by the scale',
      'Around 5.5 m — add a sensible allowance for skirting follow, the back-box drop and a bit of slack at each end',
      '4.6 cm — drawings are in cm',
    ],
    correctIndex: 2,
    explanation:
      'The scale rule on the 1:50 face reads real metres directly — so 4.6 m is the straight-line wall distance. Real cable follows the route (skirting, vertical drop into the box, slack at terminations) so add a sensible margin. About 10-20% on a domestic radial run is the convention. Multiplying by 50 again is the classic double-conversion mistake — the rule has already done the maths.',
  },
  {
    id: 'm3-s2-sub5-rfi-trigger',
    question:
      'The floor plan shows six sockets along the kitchen wall. The schedule of accessories lists eight sockets for the same kitchen, one of them an FCU for the boiler. What do you do?',
    options: [
      'Install six — trust the floor plan, it is the visual one',
      'Install eight — trust the schedule, it is the detailed list',
      'Stop, raise an RFI in writing to the designer, work with whatever they confirm in writing',
      'Install seven — split the difference',
    ],
    correctIndex: 2,
    explanation:
      'Discrepancies between two designer-issued documents are an RFI (Request For Information), every time. You do not pick the one you prefer and carry on — you raise it in writing, wait for the written reply, and that reply becomes part of the project record. The cost of an extra back-box on day one is nothing compared to the cost of stripping out and rewiring at handover because you guessed wrong.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'You have been handed a drawing pack labelled "Rev C" and another print of the same drawing labelled "Rev D" sat on the foreman\'s desk. Which one do you work from?',
    options: [
      'Rev C — older drawings have been checked more',
      'Rev D — the higher revision letter is the most recent issue',
      'Whichever is on the cleaner paper',
      'Always the lowest revision until told otherwise',
    ],
    correctAnswer: 1,
    explanation:
      'Revisions go up alphabetically (or numerically). Rev D supersedes Rev C. Always work from the latest revision and physically destroy or clearly mark superseded copies "VOID" so nobody else picks them up by mistake. Working from a superseded drawing is one of the most common causes of expensive rework on a fit-out.',
  },
  {
    id: 2,
    question:
      'A floor plan shows a circle with a horizontal line through it and "FCU 13A" written next to it, positioned on the kitchen wall above worktop height. What is it and what does it feed?',
    options: [
      'A 13 A socket-outlet feeding general kitchen appliances',
      'A Fused Connection Unit, 13 A fuse — typically feeding a fixed appliance like a boiler, towel rail or extractor from the ring final or a radial',
      'A 13 A MCB on the consumer unit',
      'A 13 A indicator lamp',
    ],
    correctAnswer: 1,
    explanation:
      'FCU = Fused Connection Unit, holding a BS 1362 fuse (commonly 13 A, sometimes 3 A or 5 A). Switched and unswitched variants exist. It spurs off a ring final or radial to feed a fixed appliance and gives that appliance its own local fuse and (if switched) local isolation point.',
  },
  {
    id: 3,
    question:
      'On the 1:100 first-floor plan you measure a 38 mm distance from the landing light position to the airing-cupboard wall. Real distance?',
    options: ['0.38 m', '3.8 m', '38 m', '380 mm'],
    correctAnswer: 1,
    explanation:
      'At 1:100, paper × 100 = real. 38 mm × 100 = 3800 mm = 3.8 m. The mental shortcut for 1:100 is "1 cm paper = 1 m real" — 3.8 cm on paper, 3.8 m real, same answer.',
  },
  {
    id: 4,
    question:
      'The cable schedule says "Cct 4 — 2.5 mm² T&E, 32 A Type B RCBO, 30 mA". The board layout drawing shows Cct 4 protected by a "B20" device. Which do you trust?',
    options: [
      'Cable schedule — it is the more detailed document',
      'Board layout — the drawing wins',
      'Neither — raise an RFI, two designer documents disagreeing is an unresolved item',
      'Whichever was issued more recently',
    ],
    correctAnswer: 2,
    explanation:
      'Two designer-issued documents disagreeing is an RFI every time. You do not pick. The mismatch could be a typo on one document — but it could also signal the designer changed their mind and only updated one of the two. Get it confirmed in writing before anyone wires anything.',
  },
  {
    id: 5,
    question:
      'You are about to drill into a stud wall to fix a back-box. The original layout drawing was issued three years ago, before the kitchen was extended. There is no as-built drawing for the extension. What is the safe course of action?',
    options: [
      'Drill anyway — the drawing is the only reference you have',
      'Stop, ask the supervisor, do not drill into a wall the drawing pack does not cover until you have either an as-built or a cable detector confirms the area is clear',
      'Drill but use a smaller bit',
      'Drill at a different height — that always works',
    ],
    correctAnswer: 1,
    explanation:
      'Working from out-of-date drawings is one of the classic causes of unexpected contact with live cables. The drawing showing the wall as empty is from before the extension was wired. Stop, ask, and check with a cable/pipe detector before any drilling. The minute lost is nothing compared to a shock from an undocumented sub-main.',
  },
  {
    id: 6,
    question:
      'The drawing pack symbol legend is incomplete — there is a symbol on the kitchen layout that is not in the legend, and it does not match anything in BS EN 60617 / IEC 60617. What does Reg 514.9.2 (A4:2026) say about this?',
    options: [
      'Nothing — symbols are advisory',
      'Diagrams, charts and information notices shall comply with the applicable standards specified — non-standard symbols are a non-conformance the designer needs to fix',
      'It only applies to consumer-unit labelling',
      'It only applies to commercial drawings',
    ],
    correctAnswer: 1,
    explanation:
      '514.9.2 (introduced in A4:2026) requires diagrams, charts and notices to comply with the applicable standards — and IEC 60617 is the applicable standard for graphical symbols on UK electrical drawings. A non-standard symbol on an installation drawing is a regulation non-conformance, and the right response is an RFI to the designer.',
  },
  {
    id: 7,
    question:
      'The schedule of accessories specifies "MK Logic Plus white moulded, switched, 2-gang" for every socket. The merchant has only delivered Crabtree equivalents. What do you do?',
    options: [
      'Fit the Crabtree — they are equivalent',
      'Stop, raise an RFI / Technical Query in writing, install nothing until the designer or specifier confirms the substitution in writing',
      'Email the customer directly and ask',
      'Fit a mix — half MK, half Crabtree',
    ],
    correctAnswer: 1,
    explanation:
      'The spec is contractually binding. "Equivalent" is not a decision you take on site — that decision belongs to the designer, the specifier or the client. Raise an RFI, get a written variation, then fit. Verbal "yeah it is fine" from a foreman is worth nothing if the snag list rejects the substitution six weeks later.',
  },
  {
    id: 8,
    question:
      'You have walked the install with the drawing pack open, ticked off every accessory location, cross-checked the schedule of accessories against the layout, and checked the cable schedule against the board configuration. The pack is consistent. What is the LAST thing to check before you start lifting tools?',
    options: [
      'Nothing — the pack is consistent, you are good',
      "Confirm safe isolation procedure for the supply, check the RAMS for any site-specific hazards, and confirm with your supervisor what the day's priorities are",
      'Order all the materials',
      'Take photos for the as-built',
    ],
    correctAnswer: 1,
    explanation:
      "The drawing pack tells you WHAT goes where; the RAMS tells you HOW to do it safely on this specific site, and safe isolation is non-negotiable before any work on an existing supply. Confirming the day's priorities with your supervisor stops you starting on something the gang has already moved past. Drawing prep is one job; site prep is the next.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'What is actually IN a typical domestic drawing pack?',
    answer:
      'A standard pack for a 3-bed semi typically has: front sheet (drawing register + revision history + general notes), ground-floor layout (1:50), first-floor layout (1:50), single-line schematic of the consumer unit, schedule of circuits (every circuit, csa, OCPD rating, RCD type), schedule of accessories (every socket, switch, FCU, light fitting), cable schedule (run lengths and routing), symbol legend, and any manufacturer data sheets for non-standard equipment. Eight to twelve sheets is normal.',
  },
  {
    question: 'How do I know which revision of the drawing I should be working from?',
    answer:
      'The front sheet has a revision history table. The latest entry is the current revision. Every individual drawing also carries a revision letter or number in its title block. If you find two prints of the same drawing with different revisions, the higher revision wins and the older one should be marked "VOID" or destroyed. If you are unsure, ask the supervisor before you cut anything — never assume the print on the desk is the latest.',
  },
  {
    question: 'What is the difference between the schedule of accessories and the cable schedule?',
    answer:
      'Schedule of accessories lists every visible electrical fitting — sockets, switches, FCUs, light fittings, fans, smokes, doorbell. It tells you what to buy and where each goes. Cable schedule lists every cable run — circuit number, csa, type (T&E, SY, SWA), length, OCPD rating, RCD characteristics. It tells you what to wire with. They cross-reference: a socket on the schedule of accessories is fed by a cable on the cable schedule.',
  },
  {
    question: 'What if a manufacturer data sheet is missing from the pack?',
    answer:
      "Raise an RFI. Reg 526.1 makes following the manufacturer's instructions a regulation requirement (terminations, torques, mounting orientation, terminal capacities). Without the data sheet you cannot meet that requirement reliably. The designer or main contractor should issue the missing sheet — do not start commissioning the device without it.",
  },
  {
    question: 'I see "DO NOT SCALE FROM DRAWING" in the title block. Now what?',
    answer:
      'It means the drawing has probably been resized in printing (PDF "fit-to-page" or photocopy reduction) so scaling off it gives wrong answers. Use the named dimensions only — the small numbered measurement lines with arrows. Named dimensions are text and survive resizing. If a wall is labelled "4250" on the drawing and your scale rule reads 60 mm on a supposedly 1:100 print, trust the 4250.',
  },
  {
    question: 'Where do as-builts come into the pack?',
    answer:
      'They do not exist at the start of the job — that is the point. The drawing pack you start with is the "as-designed". As work progresses, every site variation (cable rerouted around a beam, socket moved 200 mm, additional FCU added) gets red-lined onto the working drawings. At handover, the red-lines are formally redrawn into clean as-builts and added to the O&M pack. Five years later when somebody adds a circuit, the as-built is what they will be reading.',
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 5"
            title="Reading a real installation drawing pack end-to-end"
            description="Walk through a real domestic install drawing pack — every piece of paper an electrician opens before lifting a tool. Front sheet to as-built, applying everything from Subs 2.1-2.4 on one project (Plot 14, 'The Hawthorn' — a 3-bed semi)."
            tone="emerald"
          />

          <TLDR
            points={[
              'Synthesis means reading the whole pack as one conversation — front sheet sets context, layouts show position, schedules detail the parts, schematics show the logic, manufacturer sheets tell you how to fit each device.',
              'There is a reading order. Front sheet, then schematic to understand the system, then layouts to walk the install, then the schedules to confirm parts and cables, then manufacturer sheets for anything non-standard.',
              'Discrepancies between any two designer documents (layout vs schedule, drawing vs spec, two prints with different revisions) are an RFI in writing — never a guess. Reg 132.12 (information to be provided) and Reg 514.9.2 (diagrams to comply with applicable standards) back you up when the pack is incomplete or non-compliant.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Recognise the standard contents of a UK domestic drawing pack and the reading order that lets you understand the install in under fifteen minutes.',
              'Identify each drawing type in the pack (block, schematic, wiring, layout, schedule, as-built) and what question each one answers — applied across one project.',
              'Read BS EN 60617 / IEC 60617 graphical symbols off a real layout drawing — sockets, switches, FCUs, lights, smoke detectors, MET, protective devices.',
              'Convert measurements off a 1:50 floor plan into real cable run distances using a scale rule, and add the right allowance for routing, drops and slack.',
              'Cross-reference the schedule of accessories, cable schedule and layout drawings to spot discrepancies and raise them as RFIs in writing before starting work.',
              'Apply Reg 514.9.2 (A4:2026 — diagrams shall comply with applicable standards) and Reg 526.1 (manufacturer instructions for terminations) when reviewing a drawing pack for completeness.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What you already know</ContentEyebrow>

          <ConceptBlock title="Four Subs in, you have the toolkit — this Sub puts it on a real pack">
            <p>
              Sub 2.1 mapped the document hierarchy — BS 7671, OSG, GN3, manufacturer instructions,
              spec, RAMS, scheme bulletins, drawings. Sub 2.2 introduced the six drawing types —
              block, schematic, wiring, circuit, layout, as-built — and what each one is for. Sub
              2.3 gave you the BS EN 60617 / IEC 60617 graphical symbol set, the visual alphabet for
              every UK installation drawing. Sub 2.4 covered scale notation and the conversion
              between paper and real dimensions, with the do-not-scale rule for resized prints.
            </p>
            <p>
              This Sub puts all four to work on a single project. We are walking through a real
              drawing pack for Plot 14, "The Hawthorn" — a typical UK 3-bed semi on a new-build
              estate. Eight sheets, all the document types you would expect, with a couple of
              deliberate wrinkles to show how an electrician handles real-world inconsistencies.
            </p>
            <p className="text-[13px] text-white/75 italic">
              Tool-bag thread: this is the prep that happens BEFORE you go to site. Two hours spent
              reading the pack properly saves a day on site. Skipping it is what makes first-fixes
              drag and drives the snag list at handover.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The pack — what arrives in the envelope</ContentEyebrow>

          <ConceptBlock
            title="Plot 14, 'The Hawthorn' — eight sheets in the pack"
            plainEnglish="A standard new-build 3-bed semi pack. Front sheet, two layouts, single-line schematic, three schedules, one manufacturer sheet."
            onSite="If your contractor sends you to site without all of these, raise it before you start. An incomplete pack is a project-management failure, not your problem to solve on the floor."
          >
            <p>The Hawthorn pack contains:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sheet 01 — Front sheet.</strong> Project name, plot number, drawing register
                (a list of every sheet in the pack), revision history table, scale legend, title
                block, general notes.
              </li>
              <li>
                <strong>Sheet 02 — Ground-floor layout.</strong> Scale 1:50. Every socket, switch,
                FCU, light, smoke detector, doorbell, CT clamp marked in BS EN 60617 symbols.
              </li>
              <li>
                <strong>Sheet 03 — First-floor layout.</strong> Scale 1:50. Same conventions as
                Sheet 02.
              </li>
              <li>
                <strong>Sheet 04 — Consumer unit single-line schematic.</strong> Shows the supply,
                the main switch, every protective device with its rating and trip curve, every
                circuit destination at top level.
              </li>
              <li>
                <strong>Sheet 05 — Schedule of accessories.</strong> Tabular list of every visible
                fitting in the install, with type, manufacturer reference, mounting height, IP
                rating and finish.
              </li>
              <li>
                <strong>Sheet 06 — Cable schedule.</strong> Tabular list of every circuit — circuit
                number, csa, cable type, OCPD rating + curve, RCD type + sensitivity, estimated run
                length, route notes.
              </li>
              <li>
                <strong>Sheet 07 — Symbol legend.</strong> The BS EN 60617 / IEC 60617 subset used
                across the pack, with each symbol named.
              </li>
              <li>
                <strong>Sheet 08 — Manufacturer data sheet for the consumer unit (CU).</strong>{' '}
                Type-tested CU manufacturer, board layout, terminal capacities, torque settings.
              </li>
            </ul>
            <p>
              Eight sheets. About 2-3 hours to read properly the first time, 30-40 minutes when you
              get fluent. The pages tell a single story: what is being built, where each part goes,
              what each part is and how the whole thing is wired and protected.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reading order — the front sheet first, every time</ContentEyebrow>

          <ConceptBlock
            title="Sheet 01 — front sheet, drawing register, revision history"
            plainEnglish="The front sheet sets the context. Read it first, every time. Skip it and you risk working from the wrong revision or the wrong scale."
            onSite="The most common cause of expensive rework on a fit-out is somebody working from a superseded drawing. Two minutes on the revision history saves it."
          >
            <p>The front sheet has five things you must look at before opening any other sheet:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Project name + plot reference.</strong> Confirms the pack matches the job
                you are on. "The Hawthorn / Plot 14 / Greenacres Phase 2" — does that match the site
                address you were given?
              </li>
              <li>
                <strong>Drawing register.</strong> A list of every sheet that should be in the pack.
                Count the sheets you have actually been handed. Missing one? Raise it before lifting
                tools.
              </li>
              <li>
                <strong>Revision history.</strong> A table showing every revision issued, the date,
                what changed and who approved it. The latest row is the current revision. Every
                individual sheet should match this revision letter in its own title block.
              </li>
              <li>
                <strong>Scale legend.</strong> Confirms which scale the layouts are at (1:50 here),
                and whether different sheets use different scales (sometimes a site plan is at 1:200
                alongside floor plans at 1:50).
              </li>
              <li>
                <strong>General notes.</strong> Project-specific instructions that apply across the
                whole pack — for example "all cables to be LSF", "all RCBOs to be Type A", "all
                socket-outlets at 450 mm to centre except where noted". Read every note.
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

          <ContentEyebrow>The schematic — understanding the system</ContentEyebrow>

          <ConceptBlock
            title="Sheet 04 — single-line consumer unit schematic"
            plainEnglish="Read the schematic next, before the layouts. It tells you how the install is split into circuits and protected — the system's logic."
            onSite="Two minutes on the schematic and you can answer 'what is on which way' for the whole house without ever looking at a layout."
          >
            <p>
              The Hawthorn CU schematic shows a TN-C-S supply (PME), a 100 A main switch, then
              twelve outgoing ways:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cct 1 — Lighting downstairs, 6 A Type B RCBO, 30 mA Type A.</li>
              <li>Cct 2 — Lighting upstairs, 6 A Type B RCBO, 30 mA Type A.</li>
              <li>Cct 3 — Sockets downstairs ring final, 32 A Type B RCBO, 30 mA Type A.</li>
              <li>Cct 4 — Sockets upstairs ring final, 32 A Type B RCBO, 30 mA Type A.</li>
              <li>Cct 5 — Kitchen ring final, 32 A Type B RCBO, 30 mA Type A.</li>
              <li>Cct 6 — Cooker / hob, 32 A Type B RCBO, 30 mA Type A.</li>
              <li>Cct 7 — Shower, 40 A Type B RCBO, 30 mA Type A.</li>
              <li>Cct 8 — Boiler / heating, 6 A Type B RCBO, 30 mA Type A.</li>
              <li>Cct 9 — Smoke detectors (mains-linked), 6 A Type B RCBO, 30 mA Type A.</li>
              <li>
                Cct 10 — EV charge point feed, 32 A Type B RCBO, 30 mA Type A + Type B (per spec).
              </li>
              <li>Cct 11 — Outdoor sockets / garden, 16 A Type B RCBO, 30 mA Type A.</li>
              <li>
                Cct 12 — Spare way (no circuit yet — common on new builds for future expansion).
              </li>
            </ul>
            <p>
              The schematic also shows the MET, the earthing conductor route to the cut-out, the
              main protective bonding conductors out to gas and water (10 mm² on PME), and any SPDs
              (surge protection devices). The single-line view tells you the WHOLE story of the
              board in one diagram. Memorise this layout before you start at the CU on day one.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The layouts — walking the install on paper</ContentEyebrow>

          <ConceptBlock
            title="Sheet 02 — ground-floor layout (1:50)"
            plainEnglish="The layout shows where every accessory physically sits in the building. Read it with the schematic next to you so you know which way feeds what."
            onSite="Walk the layout once with a highlighter. Mark each circuit a different colour as you trace it. By the time you are on site you should be able to picture every back-box position with your eyes shut."
          >
            <p>
              The ground floor shows: front door, hall, downstairs WC, lounge, kitchen-diner,
              utility, back door. On the layout you can see in BS EN 60617 symbols:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lounge:</strong> 4 twin sockets (one per wall), 1-gang 1-way switch by door,
                pendant ceiling rose centre, TV outlet next to chimney breast.
              </li>
              <li>
                <strong>Hall:</strong> 1-gang 2-way switch by front door (paired with switch at top
                of stairs), pendant rose, smoke detector ceiling-mounted, doorbell push by door, 1
                twin socket under stairs.
              </li>
              <li>
                <strong>Kitchen-diner:</strong> 5 twin sockets above worktops, 1 FCU 13 A switched
                for the boiler, 1 FCU 3 A switched for the extractor, cooker outlet (32 A radial),
                pendant rose over dining table, 6 downlighters over the kitchen run, 1-gang 2-way
                switch by each door (paired across the room).
              </li>
              <li>
                <strong>Utility:</strong> 1 twin socket, 1 FCU 13 A switched for the washing
                machine, 1 FCU 13 A switched for the dryer, 1-gang 1-way switch, single batten
                light.
              </li>
              <li>
                <strong>WC:</strong> No socket (BS 7671 Section 701), pull-cord 2-way switch,
                downlighter (IP-rated for zone), shaver socket on the wall.
              </li>
              <li>
                <strong>External:</strong> 1 IP-rated twin socket on the rear wall (Cct 11), EV
                charge point on the front wall (Cct 10), porch light over the front door.
              </li>
            </ul>
            <p>
              Cross-check each one against the schematic — every accessory should belong to one of
              the twelve circuits. Anything orphaned (a socket the schematic does not feed) is a red
              flag — raise an RFI.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Applying scale — measuring a real cable run off the layout"
            plainEnglish="Take the scale rule, set to the 1:50 face, lay it on the route — the rule reads real metres directly. Then add an allowance for the actual route, not the straight line."
          >
            <p>
              Worked example — Cct 5 (kitchen ring final, 32 A). On the 1:50 ground floor with the
              scale rule on the 1:50 face you measure:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                CU to first kitchen socket: <strong>4.6 m</strong>
              </li>
              <li>
                Socket 1 → Socket 2 (along worktop): <strong>1.2 m</strong>
              </li>
              <li>
                Socket 2 → Socket 3: <strong>1.6 m</strong>
              </li>
              <li>
                Socket 3 → FCU (boiler): <strong>0.8 m</strong>
              </li>
              <li>
                FCU → Socket 4: <strong>1.4 m</strong>
              </li>
              <li>
                Socket 4 → Socket 5 (return leg): <strong>2.4 m</strong>
              </li>
              <li>
                Socket 5 back to CU (closing the ring): <strong>5.2 m</strong>
              </li>
            </ul>
            <p>
              Sum: 4.6 + 1.2 + 1.6 + 0.8 + 1.4 + 2.4 + 5.2 = <strong>17.2 m</strong> straight-line
              wall distance. Add ~15% for skirting follow, vertical drops into back-boxes, slack at
              terminations and the route up over a doorframe: ~19.8 m. Round up to{' '}
              <strong>21 m</strong> on the take-off — gives a small safety margin. Repeat for every
              circuit and you have a full cable take-off in about an hour.
            </p>
            <p className="text-[13px] text-white/75 italic">
              Sanity check on the maths: 1:50 means 1 cm paper = 0.5 m real. 4.6 m direct from the
              CU to the first socket reads as 9.2 cm on the rule when set to the 1:50 face — and the
              rule's scale face has those numbers printed as real metres, not paper millimetres. The
              rule does the conversion for you. Multiplying by 50 again is the classic
              double-conversion mistake.
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

          <ContentEyebrow>The schedules — confirming parts and cables</ContentEyebrow>

          <ConceptBlock
            title="Sheet 05 — schedule of accessories. Sheet 06 — cable schedule."
            plainEnglish="The schedules turn the visual layouts into ordering lists. Cross-reference both against the layouts — every accessory should appear on both."
          >
            <p>
              <strong>Schedule of accessories</strong> (sheet 05) lists every visible fitting: type,
              manufacturer reference (per spec), mounting height, IP rating, finish. Example row:
            </p>
            <p className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-[13.5px]">
              <strong>K-S-03:</strong> Twin switched socket, MK Logic Plus white moulded, 450 mm to
              centre, IP2X, kitchen worktop wall, fed from Cct 5.
            </p>
            <p>
              <strong>Cable schedule</strong> (sheet 06) lists every cable run: circuit number, csa,
              type, OCPD rating, RCD type, estimated length, route notes. Example row:
            </p>
            <p className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-[13.5px]">
              <strong>Cct 5:</strong> Kitchen ring final. 2.5/1.5 mm² T&E flat twin and earth. 32 A
              Type B RCBO, 30 mA Type A. Estimated total length 21 m. Route: from CU through
              under-stair void → kitchen wall via skirting → loops through 5 sockets and 2 FCUs →
              returns to CU via same route.
            </p>
            <p>
              Cross-check rule: every accessory on the schedule should appear on the layout, and
              every accessory on the layout should appear on the schedule. Counts do not match? That
              is exactly the RFI in InlineCheck 3 below.
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

          <ContentEyebrow>The symbol legend — your translation key</ContentEyebrow>

          <ConceptBlock
            title="Sheet 07 — BS EN 60617 / IEC 60617 symbol legend"
            plainEnglish="The legend names every symbol used across the pack. If a symbol on a layout is not in the legend, raise it — it is a non-conformance under Reg 514.9.2."
            onSite="A complete legend is a sign of a competent design office. An incomplete or home-made-symbols legend is the first warning that the rest of the pack might be unreliable too."
          >
            <p>
              The Hawthorn legend covers about 25 symbols — the everyday set you met in Sub 2.3.
              Switches (1G/1W, 1G/2W, 2G/2W, intermediate, pull-cord), socket-outlets (single, twin,
              switched, FCU 13 A, FCU 3 A, cooker outlet, shaver), lighting (pendant rose,
              downlighter, batten, wall light, emergency luminaire), accessories (smoke detector,
              heat detector, doorbell push, MET), protective devices on the schematic only (MCB,
              RCD, RCBO with rating + trip curve markings).
            </p>
            <p>
              Read the legend BEFORE the layouts. It is faster than guessing every symbol the first
              time.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.9.2 (paraphrased — new in A4:2026)"
            clause="514.9.2 has been introduced to advise that all diagrams, charts, and information or instruction notices comply with the applicable standards specified."
            meaning={
              <>
                The regulation that anchors everything in this Sub. Drawings need to use the
                applicable standards — IEC 60617 for graphical symbols, BS EN 60073 / 60446 for
                notices. A drawing pack with home-made symbols, missing legend entries, or
                non-standard scale notation does not comply with 514.9.2 and is an RFI back to the
                designer. Your job on site is to spot that and flag it, not to guess.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Regulation 514.9.2 (paraphrased — full A4:2026 wording in the published amendment)"
          />

          <SectionRule />

          <ContentEyebrow>Manufacturer data sheets — the device-specific layer</ContentEyebrow>

          <ConceptBlock
            title="Sheet 08 — CU manufacturer data sheet"
            plainEnglish="The drawing pack tells you what circuits go where. The manufacturer sheet tells you how to fit the actual board — torque settings, terminal sizes, lacing, busbar limits."
          >
            <p>
              The CU manufacturer data sheet for the type-tested board on this plot will include:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Board layout — which way numbers go on which busbar segment.</li>
              <li>Terminal capacities — minimum and maximum csa each terminal accepts.</li>
              <li>Torque settings — line, neutral and earth terminals separately specified.</li>
              <li>
                RCBO compatibility list — which makes / models are compatible with this board.
              </li>
              <li>Maximum cable count per terminal — most are 1 or 2 conductors max.</li>
              <li>Conformity standards (BS EN 61439-3 typically for domestic CUs).</li>
            </ul>
            <p>
              Reg 526.1 makes following these terminal-specific instructions a regulation
              requirement. If the data sheet is missing from the pack — raise an RFI before you
              start terminating.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (terminations — manufacturer instructions)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection. The selection of the means of connection shall take account of, as appropriate: (a) the material of the conductor and its insulation; (b) the conductor class, the number and shape of the wires forming the conductor; (c) the cross-sectional area of the conductor; (d) the number of conductors to be connected together; (e) the temperature attained at the terminals in normal service; (f) the provision of adequate locking arrangements in situations subject to vibration or thermal cycling."
            meaning={
              <>
                The legal hook for following the manufacturer's installation instructions on every
                termination — torque, terminal type, conductor count, locking. Reading the data
                sheet for the CU before you wire it is what 526.1 expects of a competent person.
                Missing data sheet = RFI, not guesswork.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Regulation 526.1 (verbatim)"
          />

          <SectionRule />

          <ContentEyebrow>
            The discrepancy — what an apprentice does when paper does not match paper
          </ContentEyebrow>

          <ConceptBlock
            title="The kitchen socket count — layout says six, schedule says eight"
            plainEnglish="Two designer-issued documents disagreeing is an RFI in writing, every time. You do not pick. You ask, and you wait for written confirmation."
            onSite="Inspectors and assessors will side with you on a clear paper trail. They will not side with you on 'I assumed the schedule was right'."
          >
            <p>
              Real walk-through. You count six twin sockets on the ground-floor kitchen layout
              (sheet 02). You then open the schedule of accessories (sheet 05) and count rows for
              the kitchen — eight. One of the two extras is an FCU for the boiler (which you did
              spot on the layout — so the layout is missing one, or the schedule is double-counting
              the FCU). The other extra is a "twin socket for under-cupboard lighting transformer"
              that does not appear on the layout at all.
            </p>
            <p>
              You do NOT decide to fit eight, or six, or seven. You raise an RFI in writing to the
              designer / project manager:
            </p>
            <p className="bg-white/[0.04] border border-white/10 rounded-lg p-3 text-[13.5px] italic">
              "RFI 014 — The Hawthorn / Plot 14 / Cct 5 (Kitchen Ring). Drawing 02 Rev D shows 6
              twin sockets + 1 FCU 13 A (boiler) + 1 FCU 3 A (extractor). Schedule of accessories
              sheet 05 Rev D lists 6 twin sockets + 1 FCU 13 A (boiler) + 1 FCU 3 A (extractor) + 1
              additional twin socket described as 'under-cupboard transformer feed'. The additional
              socket does not appear on drawing 02. Please confirm whether the additional socket is
              required and, if so, the position. Awaiting written response before first-fix."
            </p>
            <p>
              The reply (whatever it is) becomes part of the project record. If it turns out the
              extra socket WAS supposed to be there and the layout was wrong, you have written proof
              you asked. If it turns out the schedule was wrong and there is no extra socket, you
              have written proof you did not over-install. Either way, the cost of the RFI is an
              email; the cost of guessing wrong is a strip-out at handover.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Working from a superseded revision"
            whatHappens={
              <>
                Two prints of the same drawing are sat on the foreman's desk — Rev C and Rev D. The
                apprentice grabs the cleaner-looking one (Rev C, because nobody has spilt coffee on
                it yet) and starts working from it. Rev D moved a sub-main and added a new circuit;
                the apprentice misses both. Two weeks later when the inspector walks the install,
                the discrepancy comes out and a chunk of the work has to be redone.
              </>
            }
            doInstead={
              <>
                Make checking the revision letter the first thing you do on every new sheet — front
                sheet revision history first, then each individual sheet's title block. Latest
                revision wins, every time. Mark older copies "VOID" or destroy them so nobody else
                picks them up. If you find a revision that postdates the front-sheet revision
                history, raise an RFI — the pack itself is inconsistent.
              </>
            }
          />

          <CommonMistake
            title="Using the scale rule on a 'fit-to-page' PDF print"
            whatHappens={
              <>
                The drawing has been printed at A4 from a PDF that was originally A1, with
                "fit-to-page" selected at the printer dialog. The scale rule reads 60 mm where the
                named dimension says 4250. The apprentice trusts the rule, orders cable based on the
                rule's reading, and ends up 30% short.
              </>
            }
            doInstead={
              <>
                When the rule disagrees with named dimensions, the print is the problem — trust the
                named dimensions. They are text and survive resizing. If the title block says "DO
                NOT SCALE FROM DRAWING", stop scaling immediately and use only named dimensions. If
                you really need to scale (no named dimensions for what you are measuring), get the
                drawing reprinted at full scale or check the same measurement against a known
                feature (a standard door is ~900 mm wide, a standard worktop is 600 mm deep —
                sanity-check against those).
              </>
            }
          />

          <Scenario
            title="Plot 14 day one — what the apprentice actually does"
            situation={
              <>
                You arrive on site on first-fix Monday morning at Plot 14. You have the full drawing
                pack you have been studying for the last two days. The plot is at first-fix
                carcassing stage — joists exposed on the upstairs ceiling, dot-and-dab not yet on
                the walls, supply available at the temporary builder's board near the cut-out. Your
                supervisor points at the kitchen and says "you do that today, ring final and the
                cooker, I'll be back at lunch."
              </>
            }
            whatToDo={
              <>
                Open the pack on the floor. Front sheet first — confirm Rev D matches the prints.
                Schematic next — confirm Cct 5 (kitchen ring) and Cct 6 (cooker) feed from RCBO ways
                5 and 6 on the CU schematic. Layout (sheet 02) — walk to each kitchen position and
                chalk the back-box centre on the wall (or stud) at the spec'd height (450 mm to
                centre). Schedule of accessories — confirm the make/finish you were told to use is
                what arrived from the merchant. Cable schedule — confirm 2.5 T&E for the ring, 6.0
                T&E for the cooker. Manufacturer data sheet — note the CU terminal torques and
                conductor capacity for when you get to second-fix. Discover the kitchen socket count
                discrepancy (six on layout vs eight on schedule), text or call the supervisor before
                chalking the extra back-box, raise an RFI in writing as soon as practical. Then
                start carcassing the runs you ARE confident about.
              </>
            }
            whyItMatters={
              <>
                Most of an apprentice's reputation in year one comes from the small things — not
                guessing, asking the right questions, leaving a paper trail. Reading the pack
                properly before you lift a tool is the single biggest thing you can do to separate
                yourself from the apprentices who arrive on Friday with a snag list because they did
                not read the schedules.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A typical UK domestic drawing pack is 8-12 sheets: front sheet, layouts (1:50), single-line schematic, schedules of accessories and cables, symbol legend, manufacturer data sheets. Read in that order.',
              'Front sheet first — every time. Project name, drawing register, revision history, scale legend, general notes. Skip it and you will work from the wrong revision.',
              "Schematic gives you the system's logic in one diagram. Layouts give you positions in BS EN 60617 / IEC 60617 symbols. Schedules turn both into ordering lists.",
              'Use a scale rule on the matching face — read real metres directly. Multiplying by the scale denominator on top of that is the classic double-conversion mistake.',
              'Discrepancies between any two designer documents are an RFI in writing, not a guess. The cost of asking is an email. The cost of guessing wrong is a strip-out at handover.',
              'Reg 514.9.2 (A4:2026) requires diagrams to comply with applicable standards. Reg 526.1 makes manufacturer terminal instructions a regulation requirement. Both back you up when you raise pack quality issues.',
            ]}
          />

          <Quiz title="Reading a drawing pack — synthesis check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section2/2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.4 Scale conversion
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 — Wiring systems theory
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
