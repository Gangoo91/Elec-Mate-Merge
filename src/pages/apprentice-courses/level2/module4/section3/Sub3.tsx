/**
 * Module 4 · Section 3 · Sub 3 — Fix accessories to dimensions from drawings
 * City & Guilds 2365-02 → Unit 204 → LO3 → AC 3.3
 *   AC 3.3 — "Fix accessories to dimensions from drawings"
 *
 * Back-box selection (galv steel, plastic, surface), flush mounting in masonry
 * vs stud, fixings by substrate, levelling and flushness, common errors.
 * Worked example: chasing a flush back-box for a new socket on existing
 * plastered wall.
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
  'Fix accessories to dimensions (3.3) | Level 2 Module 4.3.3 | Elec-Mate';
const DESCRIPTION =
  'Back-box selection, flush mounting in masonry and stud, fixings by substrate, levelling and flushness, the small details that make the faceplate sit right.';

const checks = [
  {
    id: 'box-depth-pick',
    question:
      'You are mounting a 13 A switched FCU on a stud wall with 12.5 mm plasterboard. The terminals on the back of the FCU are deeper than a standard 16 mm shallow box can accommodate. Which back-box do you use?',
    options: [
      '16 mm metal flush back-box.',
      '25 mm metal flush back-box (next size up).',
      '35 mm metal flush back-box.',
      'Surface pattress.',
    ],
    correctIndex: 2,
    explanation:
      'A 13 A FCU has chunky terminals plus the integral fuse carrier — a 35 mm flush box is the standard depth. 25 mm is too shallow, the terminals foul the back of the box, the cable pinches and you risk a 526.1 termination failure. 16 mm shallow boxes are for low-profile sockets only. When in doubt, go deeper — the faceplate hides the back of the box.',
  },
  {
    id: 'fixing-by-substrate',
    question:
      'A 35 mm metal flush back-box is being fixed into a solid brick wall, chased to the right depth. What fixing do you use through the back-box knockout fixing holes?',
    options: [
      'Plasterboard plugs.',
      'Frame fixings or wood-style screws into nylon wall plugs sized for the screw.',
      'Self-tappers straight into the brick.',
      'Foam.',
    ],
    correctIndex: 1,
    explanation:
      'Solid brick takes a wall plug + screw, or a frame fixing for heavier accessories. Plasterboard plugs do nothing in solid masonry. Self-tappers strip out of brick. Frame fixings (combined plug + screw with a knurled shaft) are the modern choice for back-boxes in masonry — quick, secure, no separate plug needed. For lighter accessories a #8 brass or zinc-plated screw into a 6 mm nylon plug works fine.',
  },
  {
    id: 'flushness-check',
    question:
      'You have just fixed a back-box flush in a chased masonry wall. The face of the box is sitting 3 mm proud of the surrounding plaster. What happens at second fix?',
    options: [
      'Nothing — the faceplate covers it.',
      'The faceplate sits on the box and tilts slightly proud of the wall, the screws pinch the cable behind, and the faceplate edge gaps from the wall.',
      'The faceplate is fine if the screws are over-tightened.',
      'The plasterer can skim over it later.',
    ],
    correctIndex: 1,
    explanation:
      'A back-box proud of the plaster makes the faceplate sit proud and tilted. The screws then have to pull the plate down hard, which compresses the conductors against the back of the box (526.1 risk) and the gap around the faceplate is visible. Either chase deeper to set the box flush, or knock out the box and reset. Proud boxes are second-fix problems, and the cure is at first-fix only.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 25 mm flush metal back-box has knockouts on which faces?',
    options: [
      'Front face only.',
      'Back face and side faces; some boxes have a deeper rear knockout for cable entry.',
      'Bottom face only.',
      'No knockouts — you drill them yourself.',
    ],
    correctAnswer: 1,
    explanation:
      'Standard flush back-boxes have knockouts on the back (for rear cable entry from the chase or floor void) and on the sides (top/bottom/left/right). Each knockout has a defined diameter to suit a 20 mm or 25 mm grommet or conduit entry. Always fit the grommet — a sharp knockout edge will damage the cable insulation over time.',
  },
  {
    id: 2,
    question:
      'Plasterboard back-boxes (dry-line boxes) are fixed by:',
    options: [
      'Wall plugs into the plasterboard.',
      'Spring-loaded jaws that hinge out behind the plasterboard and grip when the front screws are tightened.',
      'Glue.',
      'Stainless self-tappers into the plasterboard.',
    ],
    correctAnswer: 1,
    explanation:
      'Dry-line / cavity boxes have integrated spring-loaded jaws (or a screw-actuated grip plate) that hinge out behind the board once the box is pushed through the cut hole. Tightening the front screws clamps the board between the jaws and the box face. Far more reliable than plasterboard plugs around the perimeter, which strip out under the side-load of plugging in a heavy charger.',
  },
  {
    id: 3,
    question:
      'A surface back-box (pattress) is mounted because:',
    options: [
      'It is cheaper than a flush box.',
      'The substrate cannot be chased (solid concrete, structural steel, glass) or the install is intended to be visible/temporary.',
      'It is a faster install in every situation.',
      'BS 7671 requires it.',
    ],
    correctAnswer: 1,
    explanation:
      'Surface boxes go where flush is impossible (solid concrete plant rooms, structural steel, glass walls, asbestos surveys uncertain) or where the install is intentionally surface (industrial/agricultural, dado trunking on offices, garage and workshop). Wylex and MK metalclad pattress boxes plus a metalclad faceplate is the typical industrial finish. Flush is preferred where the substrate allows because it looks better and is harder to damage.',
  },
  {
    id: 4,
    question:
      'You are fixing a 47 mm deep back-box for a 45 A cooker switch. The brick wall is chased but the chase is only 42 mm deep. What do you do?',
    options: [
      'Force the box in and hope the plasterer covers the proud face.',
      'Cut the box flange to make it shallower.',
      'Stop and chase deeper to 50 mm so the box sits 3 mm below the finished plaster line.',
      'Surface mount it.',
    ],
    correctAnswer: 2,
    explanation:
      'You always set the box slightly RECESSED below the finished plaster line (typically 1-3 mm), so the plaster skims up to the rim and the faceplate sits flat on the plaster, not on the box edge. A box that lands proud is a second-fix problem. The fix is at chasing — go deeper now, not later.',
  },
  {
    id: 5,
    question:
      'A back-box is being mounted into a stud wall but the stud lies right behind the box position. Best response?',
    options: [
      'Chisel the stud away to fit the box.',
      'Move the box ±50 mm sideways to clear the stud, or use a dry-line box with a side-fixing flange that catches the stud.',
      'Use a smaller back-box.',
      'Surface mount instead.',
    ],
    correctAnswer: 1,
    explanation:
      'Never weaken a structural stud to fit electrical kit. Either move the accessory sideways within the design tolerance (up to ±50 mm is usually acceptable, more requires an RFI), or use a side-fix dry-line box that grabs the stud from one side. Some makes (Appleby, Hager) have boxes specifically designed to land on a stud or in a stud bay.',
  },
  {
    id: 6,
    question:
      'You are fixing a row of 6 dado trunking outlet boxes. The trunking has been pre-installed and is level. To get the boxes level with each other you should:',
    options: [
      'Spirit-level each box independently against the wall behind.',
      'Snap the boxes onto the dado trunking using its integral mounting clips/plates — the trunking sets the level.',
      'Use a laser level on each box.',
      'Fix them by eye.',
    ],
    correctAnswer: 1,
    explanation:
      'Dado trunking has integral mounting points or accessory plates designed to clip the box to the trunking face. Once the trunking is level, every accessory mounted on it is level by definition. Don&rsquo;t fight the trunking — use it as the reference. Fixing the boxes to the wall behind the trunking and then aligning to the trunking face is double work and prone to error.',
  },
  {
    id: 7,
    question:
      'BS 7671 Reg 522.8 sets requirements for protection against mechanical stress. For a flush back-box this primarily means:',
    options: [
      'Box must be earthed.',
      'Cable entries must be grommeted, the box must be deep enough that the cable does not pinch, and the box must be securely fixed so movement does not stress the conductors.',
      'Box must be metal.',
      'Box must be fire-rated.',
    ],
    correctAnswer: 1,
    explanation:
      '522.8 covers mechanical stress on cables — sharp edges, pinching, vibration, weight. A back-box satisfies it by being deep enough for the cable not to pinch, having grommets on every cable entry, being securely fixed so it does not work loose, and presenting no sharp internal edges. Box choice and fixing are part of cable protection.',
  },
  {
    id: 8,
    question:
      'You discover a back-box you fixed yesterday is sitting 5 mm twisted (one corner higher than the diagonally opposite corner). Best fix?',
    options: [
      'Loosen one fixing, tap to level, retighten.',
      'Loosen both fixings, re-set the box flat, verify level and twist with a small spirit level, retighten.',
      'Leave it — the faceplate will hide it.',
      'Pull the box out completely and start again.',
    ],
    correctAnswer: 1,
    explanation:
      'A twisted box gives a twisted faceplate, which screws unevenly and shows a gap on one corner. The proper fix is to loosen the fixings completely, reset the box flat using a small spirit level (or by eye against the surrounding plaster), then retighten evenly. Tapping a partially fixed box rarely cures the twist — usually it just changes which corner is high.',
  },
];

const faqs = [
  {
    question: 'Galvanised steel back-box or plastic — when do I use each?',
    answer:
      'Galv steel for industrial, agricultural, commercial, and any installation where mechanical robustness matters or where conduit is screwing into the box. Plastic (PVC) for plasterboard dry-line work, surface installations on a finished wall, and most domestic flush-mount where T&E enters from a chase. Modern domestic practice is increasingly steel-flush throughout for the longer-term durability — plastic boxes crack more easily under retrofit work. The drawing pack should specify; if not, default to steel for masonry, plastic dry-line for plasterboard.',
  },
  {
    question: 'How deep should a back-box sit relative to the finished plaster line?',
    answer:
      '1 to 3 mm RECESSED below the finished plaster line is the standard. The plaster skims up to the rim of the box; the faceplate then sits flat on the plaster surface, not on the rim of the box. A box flush with the plaster line is acceptable; a box proud of the plaster line is a defect that you cure at first fix, not at second. The plasterer needs to know your box depths so they can skim cleanly to the rim.',
  },
  {
    question: 'What fixings do I use for plasterboard back-boxes?',
    answer:
      'Use a dry-line box (sometimes called a cavity box, plasterboard box, or "sucker" box) with integral spring-loaded jaws or a screw-actuated grip plate. The jaws hinge out behind the board once the box is pushed through the cut hole, and the front screws clamp the board between the jaws and the box face. Plasterboard plugs around the perimeter of a normal box are a hack that works for very light accessories but fails on anything that takes side load (chargers, plug-in devices). Always use the right tool for the job.',
  },
  {
    question: 'Can I use a 16 mm shallow back-box for a switch?',
    answer:
      'For a low-profile single switch with shallow terminals, yes — 16 mm shallow boxes were designed for that purpose. They are NOT suitable for switched FCUs (deeper terminals), 13 A sockets with backed cabling (terminals foul the box), or anything with a fuse carrier. When in doubt, use the next depth up. The faceplate hides the back of the box; nobody penalises a deeper-than-needed box, but a too-shallow box that pinches the cable is a 526.1 fail.',
  },
  {
    question: 'Why does the back-box have multiple knockouts I do not need?',
    answer:
      'Manufacturers ship a generic box with knockouts on every face, so the same box works for cable-entry from the back, top, bottom or sides. You only knock out the entries you are using. The unused knockouts stay in place and protect the integrity of the box. If you accidentally knock out an extra entry, fit a blanking grommet or seal it (especially for IP-rated installations or bathroom-zone work where the box envelope matters).',
  },
  {
    question: 'How do I fix a back-box into a stud wall when the stud is in the way?',
    answer:
      'Three options. (1) Move the accessory ±50 mm sideways within design tolerance — usually acceptable for sockets, less so for switches at architectural alignment positions. (2) Use a dry-line box that catches the stud as a side-fixing — Appleby and Hager make boxes specifically for this. (3) Move the accessory to the next stud bay if the position is critical, raise an RFI for the layout change. Never chisel or notch a structural stud — that is the carpenter&rsquo;s rule, and it applies to electricians too.',
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 3"
            title="Fix accessories to dimensions from drawings"
            description="Back-boxes, surface pattresses, dado trunking, dry-line boxes — fixed plumb, level, flush and at the height the drawing specifies. The detail is in box depth, fixings by substrate, and knowing when to chase deeper rather than force a proud box."
            tone="emerald"
          />

          <TLDR
            points={[
              'Back-box depth depends on the accessory — 16 mm shallow for low-profile switches, 25 mm for sockets, 35 mm for FCUs, 47 mm for cooker/shower switches.',
              'Set the box 1-3 mm RECESSED below the finished plaster line so the faceplate sits flat on the plaster, not on the rim of the box.',
              'Fixings change with substrate — frame fixings into masonry, dry-line jaws into plasterboard, wood screws into stud, side-clip into dado trunking.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Fix accessories to dimensions from drawings — verbatim AC 3.3 from City & Guilds 2365-02 Unit 204.',
              'Select the correct back-box type and depth for the accessory and substrate (galv steel flush, plastic dry-line, surface pattress, dado-mounted).',
              'Fix back-boxes flush, level and plumb in masonry, plasterboard stud and surface installations using the correct fixings for each substrate.',
              'Set box depth 1-3 mm recessed below the finished plaster line so the faceplate fits flush at second fix.',
              'Identify when to move an accessory within tolerance to avoid a structural conflict (stud, joist, service void) versus when to raise an RFI.',
              'Apply Reg 522.8 protection against mechanical stress through correct box selection, grommeting and fixing security.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Back-box selection — material and depth</ContentEyebrow>

          <ConceptBlock
            title="Steel, plastic, surface — the three families"
            plainEnglish="Three back-box families. Galvanised steel flush — the workhorse for masonry chases. Plastic dry-line — for plasterboard stud walls. Surface pattress — where flush is impossible. Each has its place; using the wrong one for the substrate makes the install harder and the result worse."
            onSite="Modern domestic practice is increasingly all-steel flush in masonry rooms (kitchens, bathrooms, halls) and all dry-line in stud-wall rooms (bedrooms, lofts). Mixing steel and plastic in the same room looks scrappy and signals that the installer ran out of one type and substituted."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Galvanised steel flush back-box</strong> — Stamped steel, knockouts on
                every face, lugs on top and bottom for screw fixings. Standard depths 16,
                25, 35, 47 mm. Used in chased masonry. Robust, screws in well, takes conduit
                entries cleanly.
              </li>
              <li>
                <strong>Plastic dry-line / cavity box</strong> — PVC or polycarbonate with
                integrated spring jaws or grip plates. For plasterboard stud installations.
                Lighter than steel, cheaper, but cracks under retrofit chiselling.
              </li>
              <li>
                <strong>Surface pattress</strong> — Mounted on the wall surface, accessory
                mounts on the front of the pattress. Steel (industrial / agricultural / wet
                areas) or plastic (light commercial, dado fronts). For installs where chasing
                is impossible or the design is intentionally surface.
              </li>
              <li>
                <strong>Dado trunking accessory plate</strong> — Mounts directly onto the
                front of a 50/100/170 mm dado trunking. The trunking sets the level; the
                plate clips onto the trunking face. Used in commercial fit-outs.
              </li>
              <li>
                <strong>Floor-box (recessed)</strong> — A specialist surface box recessed into
                a screed floor for desk power feeds. Comes with a hinged lid and gasket.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Box depth — match the accessory, allow for the cable"
            plainEnglish="The accessory dictates the minimum box depth. A flat-back switch with shallow terminals fits in a 16 mm box. A 13 A switched FCU with a fuse carrier needs 35 mm. A 45 A cooker switch with chunky terminals and large CSA cables needs 47 mm. Always go to the next size up if there is any doubt."
            onSite="The faceplate hides the back of the box — nobody can see whether you used 25 mm or 35 mm. The cable, however, knows. A pinched cable in a too-shallow box overheats over time and fails the next IR test or thermography survey."
          >
            <p>The standard depths and what they fit:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>16 mm</strong> — Shallow boxes for low-profile single light switches.
                Tight on cable space; not for sockets or FCUs.
              </li>
              <li>
                <strong>25 mm</strong> — Standard flush depth for 13 A sockets and most twin
                sockets with rear-loaded terminals. Adequate for 1.5 / 2.5 mm² T&E.
              </li>
              <li>
                <strong>35 mm</strong> — FCUs, dimmers, fan controllers, anything with deeper
                terminals or integral fuse carriers. The "if in doubt" depth.
              </li>
              <li>
                <strong>47 mm</strong> — Cooker switches, shower switches, larger CSAs (6+ mm²),
                grid switches with multiple modules.
              </li>
            </ul>
            <p>
              Cable space inside the box matters as much as terminal space. A 25 mm box with
              4 cables landing in it is tight; a 35 mm box gives room for the conductors to
              fold rather than pinch. Going one size deeper is rarely wrong.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.8.1 (Wiring system mechanical stress)"
            clause="A wiring system shall be selected and erected to avoid during installation, use or maintenance, damage to the sheath or insulation of cables and their terminations. The use of any lubricants that can have a detrimental effect on the cable or wiring system are not permitted."
            meaning={
              <>
                Reg 522.8.1 is what stands behind back-box choice. A box that is too shallow
                pinches the cable and damages the insulation; a box without grommets exposes
                the cable to the sharp knockout edge; a box that is loose stresses the
                conductor terminations. Box selection and fixing are part of how you comply
                with 522.8.1, not separate concerns. Get either wrong and you have a
                522.8.1 failure waiting to be found.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 522.8.1 (verbatim)."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Fixings by substrate</ContentEyebrow>

          <ConceptBlock
            title="The right fixing for each wall type"
            plainEnglish="Substrate dictates fixing. Masonry takes a wall plug or frame fixing. Plasterboard takes a dry-line box with integral jaws (or a hollow-wall fixing for accessories not in a box). Timber takes a wood screw. Steel takes self-tappers or rivnut. Get this wrong and the box pulls out of the wall the first time someone plugs in a heavy charger."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solid brick / block / concrete</strong> — Frame fixing (combined plug
                + screw) is the modern standard for back-boxes. Faster than separate plug
                + screw, no risk of mismatched sizes. Use 60 mm length for standard back-box
                lugs through the chase.
              </li>
              <li>
                <strong>Cavity / aerated block</strong> — Specialised cavity wall plugs that
                expand inside the cavity (Fischer SX, Rawl R-LX). Avoid frame fixings in
                aerated block — the plug crumbles the soft block.
              </li>
              <li>
                <strong>Plasterboard stud wall</strong> — Use a dry-line box (jaws clamp the
                board), not separate plasterboard plugs around a flush box. For non-box
                accessories (cable cleats, brackets) use spring-toggle or self-drive
                plasterboard fixings rated for the load.
              </li>
              <li>
                <strong>Timber stud (the box lands on a stud)</strong> — Wood screws (#8 × 25
                or 30 mm), straight into the stud. Pilot-drill if the stud is hardwood.
              </li>
              <li>
                <strong>Steel stud / partition framing</strong> — Self-drilling self-tapping
                screws designed for the stud gauge, OR a dry-line box that clamps the
                stud face.
              </li>
              <li>
                <strong>Surface mounting on any substrate</strong> — Surface pattress fixed
                with the appropriate fixing for the substrate behind. Pattress flange has
                fixing holes at corners; usually 4 fixings per box.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Frame fixings vs separate plug + screw"
            plainEnglish="A frame fixing is a single unit — knurled-shaft screw inside an integrated nylon plug. You drill the hole through the back-box and the wall behind in one shot, push the frame fixing through the box hole into the wall, and tighten. The plug expands as the screw tightens, locking the box in. Faster than separate components and no risk of pairing the wrong plug with the wrong screw."
            onSite="A box of 100 frame fixings (60 mm × 6 mm) lives in every electrician&rsquo;s van for masonry box-fixing. They are forgiving of slightly oversized holes and they work well in re-used holes from previous installs."
          >
            <p>
              The legacy method — drill, push in a separate plug, then drive a screw through
              the box into the plug — still works fine. It needs a steady hand to keep the
              plug from spinning and a matching screw size for the plug. Frame fixings
              eliminate both potential failure modes. Either method is acceptable; frame
              fixings are faster.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Flush mounting in masonry — chasing depth and box setting</ContentEyebrow>

          <ConceptBlock
            title="Chase depth — set so the box face sits 1-3 mm below the plaster line"
            plainEnglish="The chase needs to be deep enough that, when the box is mortared or screwed in place, the front face of the box sits 1-3 mm BELOW the finished plaster surface. Then the plasterer skims up to the box rim and the faceplate sits flat on the plaster. Chase too shallow and the box stands proud; chase too deep and the box rattles in the void."
            onSite="Standard chasing depth for a 35 mm flush box on a wall destined for a 12 mm skim coat: chase ~50 mm deep (35 mm box + 12 mm skim + 3 mm recess + small allowance). For thicker plaster (lath and plaster, render coat) recalculate. The chase tool depth gauge or an off-cut of cable as a depth probe both work."
          >
            <p>
              Standard chase depth maths:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Box depth (16 / 25 / 35 / 47 mm)</li>
              <li>+ plaster skim coat thickness (typically 8-15 mm for skim)</li>
              <li>+ 1-3 mm recess for box face below plaster line</li>
              <li>+ small allowance for unevenness in the chase floor</li>
              <li>= total chase depth</li>
            </ul>
            <p>
              For a 35 mm box on a wall that will get a 12 mm finish: 35 + 12 + 2 + 1 = ~50 mm.
              Chase to ~50 mm and verify with the box dry-fitted before you mortar or fix.
              The chase floor needs to be flat enough that the box sits without rocking — clean
              out loose mortar and brick fragments before fitting.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Levelling and plumb — small spirit level on the box face"
            plainEnglish="A back-box has to be plumb (vertical edge true) and level (horizontal edge true). A small torpedo spirit level on the box front face does both at once. The box also needs to be square to the wall — not twisted. If the chase floor is not square, use shims or a thin layer of bonding to level the box before final fixing."
            onSite="A twisted box gives a twisted faceplate, which screws unevenly and shows a corner gap. Two minutes spent levelling at first fix saves twenty minutes of remedial faceplate-shimming at second fix."
          >
            <p>
              The check sequence for every box: dry-fit, check vertical (small level on left
              edge), check horizontal (level on top edge), check square to wall (eye it from
              the side, look for any tilt), check depth (faceplate edge or plaster gauge), then
              fix. The whole sequence takes 30 seconds per box and pays back many-fold in
              second fix quality.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.1.1 (Workmanship and proper materials)"
            clause="(Paraphrased.) Good workmanship by competent persons or persons under their supervision and proper materials shall be used in the erection of every electrical installation."
            meaning={
              <>
                Reg 134.1.1 is the workmanship regulation that sits behind every back-box
                that goes in a wall. A flush box that is plumb, level, recessed to the right
                depth, and securely fixed is good workmanship; a box that is twisted, proud,
                or loose is a 134.1.1 failure that propagates through the rest of the install.
                Take the time at first fix and the second-fix electrician (often you, weeks
                later) thanks you.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.1.1 (paraphrased)."
          />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Plasterboard / stud wall mounting</ContentEyebrow>

          <ConceptBlock
            title="Dry-line boxes — purpose-built for plasterboard"
            plainEnglish="Plasterboard wants a dry-line box (also called a cavity box or plasterboard box). The box has spring-loaded jaws or a screw-actuated grip plate that expand behind the board once the box is pushed through the cut hole. Tightening the front screws clamps the board between the jaws and the box flange. Job done in 60 seconds, no plug, no chase, no fuss."
            onSite="Marathon, Appleby and Hager all make popular dry-line ranges. Stocks are usually held at the wholesaler for 35 mm depth single and double gang, plus shallow (25 mm) for switches. Always cut the plasterboard hole accurately — too big and the jaws have nothing to grip; too small and the box will not seat."
          >
            <p>
              The cut sequence for a dry-line box:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mark the box outline on the plasterboard (use the box itself or a template).</li>
              <li>Cut with a jab saw or a plasterboard cut-out tool. Cut just inside the line; you can always shave more, you cannot put it back.</li>
              <li>Test-fit the box. The face flange should sit flat on the plasterboard; the jaws should clear the cut.</li>
              <li>Pull cable through the back of the box.</li>
              <li>Push the box into the hole. The jaws fold flat to enter, then spring out behind the board.</li>
              <li>Tighten the front screws evenly. The jaws pull the board against the flange.</li>
              <li>Verify level and plumb before final tightening.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="When the stud is in the way"
            plainEnglish="Plasterboard stud walls have a stud every 400 or 600 mm. Sometimes the box position you marked lands directly on a stud. Three responses, in priority order: move sideways within tolerance, use a side-fix dry-line box, or move to the next stud bay. Never chisel or notch the stud — that is the carpenter&rsquo;s rule and it applies to electricians too."
            onSite="A stud detector (cheap, battery-powered, accurate to ±5 mm) catches stud positions before you cut the plasterboard. Spend £15 once and avoid the nightmare of cutting into a stud and discovering halfway through that the box will not fit."
          >
            <p>
              The decision tree:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Box centre lands within 50 mm of a stud edge</strong> — move the
                accessory ±50 mm sideways into the bay. Architecturally invisible unless
                aligned to a feature.
              </li>
              <li>
                <strong>Box position is critical (aligned to a feature)</strong> — use a
                side-fix dry-line box that grabs the stud as one of its fixing points.
                Appleby Type B ("stud-side") boxes do this.
              </li>
              <li>
                <strong>Move not possible, side-fix not available</strong> — raise an RFI
                with the designer. The accessory may need to move to the next stud bay,
                with the cable route adjusted accordingly.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Surface and dado-mounted accessories</ContentEyebrow>

          <ConceptBlock
            title="Surface boxes — pattress on the wall, fixings through the flange"
            plainEnglish="Surface boxes mount on the wall surface, with the accessory mounting on the front of the pattress. Used where the substrate cannot be chased (solid concrete plant rooms, structural steel, glass walls, asbestos uncertain) or where the design is intentionally surface (industrial / agricultural / dado runs in commercial offices)."
            onSite="Industrial surface boxes (Wylex, MK Metalclad) take metalclad faceplates and accept conduit entries direct. The combination is mechanically robust and impact-resistant — the right kit for a workshop, a plant room, an agricultural building."
          >
            <p>
              The fix sequence for a steel surface pattress on a masonry wall:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mark the four corner fixing-hole positions through the pattress flange.</li>
              <li>Drill the wall to the plug size, fit plugs.</li>
              <li>Knock out the cable entry knockout(s) you need.</li>
              <li>Fit grommets to the cable entries.</li>
              <li>Pull cable through.</li>
              <li>Offer the pattress up, screw the four fixings in finger-tight.</li>
              <li>Spirit-level the pattress and tighten evenly.</li>
              <li>Verify the box is square and not pulling out of the wall.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Dado trunking accessory mounting"
            plainEnglish="Dado trunking carries multiple cables (mains + data + fibre) along a wall at desk-height in offices and small commercial. Accessory plates clip directly onto the front face of the trunking. The trunking sets the level; the plates inherit it."
          >
            <p>
              Dado mounting sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm the trunking is level along its full length.</li>
              <li>Mark the centre of each accessory position on the trunking front.</li>
              <li>Cut the trunking front-face aperture for each accessory plate (most dado systems have a pre-cut module that pops out).</li>
              <li>Bring cable through the back of the trunking to the aperture.</li>
              <li>Snap the accessory plate onto the trunking face.</li>
              <li>Wire the accessory.</li>
              <li>Snap the cover on. Visible row of plates is automatically aligned because the trunking is straight.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example — chasing in a flush back-box on existing plaster</ContentEyebrow>

          <Scenario
            title="New socket on an existing plastered wall — sequence and finish"
            situation={
              <>
                Customer wants a new twin socket added on an existing plastered wall. The
                wall is solid brick with a 12 mm finishing plaster coat on top. You have
                already set out the height and centre, marked a 75 × 75 mm square outline
                for a 25 mm deep flush double-gang box, and you have a route from the floor
                void up to the box position via a chase.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1.</strong> Score the plaster around the marked outline with a
                Stanley knife — gives a clean edge and stops the plaster cracking outside
                the chase.
                <br /><br />
                <strong>Step 2.</strong> Chase out the box pocket using a wall chaser (clean,
                dust-extracted) or a hammer drill + cold chisel (slower, dustier). Target
                depth ~40 mm (25 mm box + 12 mm plaster + 3 mm recess). Verify with the
                box dry-fitted — face should sit ~3 mm below the plaster line.
                <br /><br />
                <strong>Step 3.</strong> Chase the cable route from the box down to the
                floor void in a straight vertical line (Reg 522.6.202 safe zones —
                vertical above and below an accessory). Depth ~30 mm to allow capping or
                conduit + plaster cover.
                <br /><br />
                <strong>Step 4.</strong> Pull cable up through the chase. Knock out the
                bottom rear knockout of the box, fit a grommet, push the cable through with
                ~200 mm tail in the box.
                <br /><br />
                <strong>Step 5.</strong> Check the chase floor is clean and flat under the
                box. Frame-fix the box through the lugs into the brick (60 mm × 6 mm frame
                fixings). Snug, do not over-tighten.
                <br /><br />
                <strong>Step 6.</strong> Verify with a small spirit level: box face is plumb
                vertically, level horizontally, and ~3 mm below plaster line all the way
                round.
                <br /><br />
                <strong>Step 7.</strong> Fit cable capping (or oval conduit) over the cable
                in the chase, clipped or pinned in place.
                <br /><br />
                <strong>Step 8.</strong> Leave for the plasterer. They will fill the chase
                with bonding coat, then skim up to the box rim. The plate goes on at second
                fix; if the box is set right, the plate sits flat on the plaster with no
                gap.
              </>
            }
            whyItMatters={
              <>
                The chase depth and box setting determine the second-fix quality. A box set
                3 mm proud, or twisted, or with no recess, becomes a 30-minute remedial
                faceplate fight at second fix — and the customer can see the gap. A box set
                right disappears once the plate is on. The hidden craft is what shows.
              </>
            }
          />

          <CommonMistake
            title="Box not flush — back-box sat 4 mm proud after plastering"
            whatHappens={
              <>
                The chase was a touch shallow, you fixed the box anyway "because the
                plasterer can build round it". The plasterer skims to the wall surface and
                the box stands 4 mm proud. At second fix the faceplate sits on the box
                rim, tilted forward, with a visible gap between the plate edge and the wall
                all the way round. The screws have to be over-tightened to pull the plate
                down, which compresses the cable against the back of the box (526.1 risk).
                The customer notices. The plate is rocked back and forth trying to find
                position. None of it is right.
              </>
            }
            doInstead={
              <>
                Always verify chase depth with the box dry-fitted before mortaring or
                fixing. The face of the box should sit 1-3 mm BELOW the line of the
                surrounding plaster. If the chase is too shallow, deepen it now — five
                more minutes of chasing saves twenty minutes of second-fix fight. If you
                discover the box is proud after plastering, the only good fix is to knock
                the box out, deepen the chase, refit, and ask the plasterer to make-good.
                Living with a proud box is a bodge that the customer or inspector will
                always notice.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Three back-box families: galv steel flush (masonry), plastic dry-line (plasterboard), surface pattress (where flush is impossible). Match the family to the substrate.',
              'Box depth matches the accessory — 16 mm shallow switch, 25 mm socket, 35 mm FCU/dimmer, 47 mm cooker/shower switch. Go deeper if in doubt — faceplate hides the back.',
              'Chase deep enough that the box face sits 1-3 mm RECESSED below the finished plaster line. Plaster skims to the rim; faceplate sits flat on the plaster.',
              'Frame fixings (combined plug + screw) for masonry; dry-line jaws for plasterboard; wood screws into stud; never chisel or notch a structural stud.',
              'A twisted, proud, or loose box is a 134.1.1 / 522.8.1 fail — workmanship and mechanical-stress regulations both apply.',
              'When a stud is in the way: move sideways within tolerance, use a side-fix box, or RFI to move accessory to the next bay.',
              'Always grommet every cable entry. The sharp knockout edge will damage the cable insulation over time without one.',
              'Verify level, plumb and depth at first fix. Two minutes of checking saves twenty minutes of second-fix remedial.',
            ]}
          />

          <Quiz title="Fixing accessories to dimensions — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.2 Marking out from drawings
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Installing wiring systems and supports
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
