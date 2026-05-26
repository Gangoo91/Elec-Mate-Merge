/**
 * Module 4 · Section 3 · Sub 2 — Mark out dimensions on work areas from drawings
 * City & Guilds 2365-02 → Unit 204 → LO3 → AC 3.2
 *   AC 3.2 — "Mark out dimensions on work areas from drawings"
 *
 * Datums (FFL, structural grid), socket / switch / fire-alarm heights,
 * setting out tools (chalk line, laser, plumb), reading 1:50 vs 1:100,
 * tolerances, marking media by substrate. Worked example — kitchen wall
 * with 6 sockets evenly spaced from FFL.
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
  'Mark out dimensions from drawings (3.2) | Level 2 Module 4.3.2 | Elec-Mate';
const DESCRIPTION =
  'Datums, FFL, socket and switch heights, chalk-line and laser-level setting out, scale reading 1:50 / 1:100, tolerances, and the marking media that work on each substrate. Translating a 1:50 layout into chalk on the wall.';

const checks = [
  {
    id: 'ffl-vs-floor',
    question:
      'A drawing shows socket centres at 450 mm. The screed is not in yet. What height do you mark from?',
    options: [
      'Customer premises equipment converting optical to electrical signals in PON',
      'Check the toaster for a series arc fault (loose terminal, broken element strand) using IR test on the appliance lead and visual inspection',
      'From the FFL (floor finish level) — the top of the finished floor as it will be when the customer walks in.',
      'Because self-employed income is more variable and they have no sick pay or redundancy protection',
    ],
    correctIndex: 2,
    explanation:
      'Setting out always references the FFL — the height the customer will perceive once the floor is laid. Mark from the slab and you end up with sockets that look low after the screed and finish go in. Take the FFL from the architect&rsquo;s drawing or set it out with the principal contractor before you mark anything.',
  },
  {
    id: 'scale-reading',
    question:
      'A 1:50 drawing shows a wall 80 mm long on paper. What is the real-world wall length?',
    options: [
      '4.0 m',
      '8.0 m',
      '0.16 m',
      '0.8 m',
    ],
    correctIndex: 0,
    explanation:
      '1:50 means 1 mm on paper = 50 mm in real life. 80 × 50 = 4000 mm = 4.0 m. Always use the scale bar on the drawing as a sense-check; scales get overridden when drawings are reduced for printing, and the dimensions on the paper become unreliable. The numbered dimensions on the drawing always trump scaled measurements.',
  },
  {
    id: 'marking-media',
    question:
      'You need to mark a chalk line for back-box centres on a smooth, recently plastered wall. What is the right marking medium?',
    options: [
      'Chinagraph pencil — it bonds to the plaster.',
      'Pencil (HB or 2B), or low-tack masking tape with a Sharpie line on it.',
      'Sharpie marker — it is permanent and visible.',
      'Centre punch directly into the plaster.',
    ],
    correctIndex: 1,
    explanation:
      'On smooth plaster you use pencil (light, easy to remove) or masking tape with a marker (lifts off cleanly without ghosting). Sharpie direct on plaster bleeds through paint and the painter will hate you. Centre punch into plaster cracks the surface. Different substrate, different medium — that is the whole skill.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The standard mounting height for a domestic light switch (centre of switch) is approximately:',
    options: [
      '450 mm',
      '1200 mm',
      '900 mm',
      '1500 mm',
    ],
    correctAnswer: 1,
    explanation:
      'Approximately 1200 mm to centre is the long-standing UK domestic standard for light switches, set out from FFL. Approved Document M (accessible buildings) often specifies 900-1200 mm to suit reach from a wheelchair, with 1200 mm being the common compromise. New build always references FFL, never the slab.',
  },
  {
    id: 2,
    question:
      'Approved Document M (accessibility) typically requires socket centres in new dwellings to be set at:',
    options: [
      'High circuit impedance that may affect device operation',
      'Set artificial earlier deadlines to increase efficiency',
      'Between 450 mm and 1200 mm above FFL — the "reach range".',
      'To prevent electric shock and equipment damage',
    ],
    correctAnswer: 2,
    explanation:
      'Approved Doc M (volume 1, dwellings) specifies the accessible reach range of 450-1200 mm from FFL for sockets, switches and other controls. Common practice is 450 mm centres for sockets in habitable rooms (replacing the older 150 mm centres). Above worktops you mount roughly 150 mm above the worktop surface, which usually lands above the 1200 mm upper limit and is acceptable as a worktop-fitted accessory.',
  },
  {
    id: 3,
    question:
      'A datum line is best described as:',
    options: [
      'Equipment with rated current up to 16 A per phase (Class A, B, C, D equipment)',
      'To physically prevent the switching device from being operated and ensure it cannot be inadvertently re-energised',
      'That the route is clear of obstructions, well lit, and fire doors are operational',
      'A reference line on the wall at a known height (typically 1 m above FFL) from which other heights are measured.',
    ],
    correctAnswer: 3,
    explanation:
      'A datum is your reference line — set at a known height above FFL (1 m is a common choice because it is easy to measure up or down from). All other heights on the wall are then dimensioned from the datum. Setting one good datum line per room lets you mark every accessory accurately without re-measuring from the floor each time.',
  },
  {
    id: 4,
    question:
      'For a long horizontal run (>5 m) of accessory centres at the same height, the most accurate setting-out tool is:',
    options: [
      'A laser level (rotary or cross-line) projected onto the wall.',
      'A chalk line snapped between two pre-marked end points.',
      'A spirit level — repeatedly leap-frogged.',
      'A tape measure off the floor at each socket position.',
    ],
    correctAnswer: 0,
    explanation:
      'Over more than ~5 m the cumulative error in leap-frogging a spirit level becomes significant. A laser level projects a single horizontal reference across the whole wall in one operation, so every socket is set to the same plane. Chalk line is acceptable as a backup where two end points have already been precisely set out.',
  },
  {
    id: 5,
    question:
      'Why mark with chinagraph (wax pencil) on concrete or block, rather than a regular HB pencil?',
    options: [
      'A purpose-formulated cable-pulling lubricant — wax-free for plastic conduit (some lubes attack PVC), and PVC-compatible. Polywater is a common brand.',
      'HB pencil leaves a graphite line that washes away with water-based marking and barely shows on rough textured surfaces; chinagraph is wax-bound and stays visible on dust, oil and rough mineral surfaces.',
      'Compassionate empathy combines understanding (cognitive), feeling (emotional), AND being moved to take appropriate action to help — making it the most complete and practically useful form because it translates empathic awareness into constructive behaviour',
      'Below-minimum or above-maximum values indicate a fault that prevents the protective measure from operating as designed — risking shock, fire, or equipment damage',
    ],
    correctAnswer: 1,
    explanation:
      'Chinagraph (also called china marker / grease pencil) is wax-based and writes on dusty, oily, smooth or porous surfaces where graphite gives nothing. On concrete and rough block you need that visibility. On smooth plaster use HB pencil or masking tape — chinagraph is a nightmare for the painter to cover.',
  },
  {
    id: 6,
    question:
      'Tolerances on accessory positioning. The drawing says 450 mm centres. Acceptable tolerance for first fix:',
    options: [
      'Continuously throughout the task, and whenever conditions change or something does not seem right',
      'Heat mapping and aggregated counting without personal identification',
      '±10 mm typically; tighter for visible runs of accessories where misalignment shows.',
      'The downstream device must limit I²t to less than the upstream device\\\\\\\\\\\\\\\'s pre-arcing I²t',
    ],
    correctAnswer: 2,
    explanation:
      '±10 mm is the common rule of thumb for first-fix setting out — that is what you can achieve consistently with chalk-line and pencil. Where accessories run in a visible bank (4 sockets across one wall, 6 grid switches in a bedroom), tolerance tightens because the human eye spots a 5 mm misalignment in a row of identical plates. Spec or architect drawings sometimes call out tighter tolerances for fit-out scheme reasons.',
  },
  {
    id: 7,
    question:
      'A scale rule is graduated for both 1:50 and 1:100. You read a wall on the 1:100 scale and get 25 mm. What is the real-world dimension?',
    options: [
      '0.25 m',
      '1.25 m',
      '25 m',
      '2.5 m',
    ],
    correctAnswer: 3,
    explanation:
      '1:100 means 1 mm = 100 mm. 25 × 100 = 2500 mm = 2.5 m. Read the scale bar on the drawing first to confirm what scale is in use — printed drawings often get reduced from A1 to A3 and the original scale becomes wrong; the printed dimensions always take precedence over scaled values for that reason.',
  },
  {
    id: 8,
    question:
      'You need to mark out a vertical line for a switch drop on a stud wall. The wall has a slight bow in it. Best tool:',
    options: [
      'Plumb bob (gravity-true vertical) or a self-levelling laser plumb.',
      'Understanding normal operation and basic troubleshooting',
      'Verifying correct pull-in and drop-out operation',
      'Measure end-to-end resistance of each conductor (L, N, E)',
    ],
    correctAnswer: 0,
    explanation:
      'A plumb bob is gravity-true and ignores any bow or twist in the wall — it gives you the true vertical regardless of what the surface is doing. Self-levelling laser plumbs do the same job faster on a long drop. A spirit level held against a bowed surface measures the surface, not gravity. The switch drop must be true vertical or the cable will not sit in the chase straight.',
  },
];

const faqs = [
  {
    question: 'What height do I mount sockets — 150 mm or 450 mm?',
    answer:
      'For new build the answer is 450 mm minimum (Approved Document M — accessibility, dwellings). 150 mm has been the legacy "skirting plus 50 mm" standard for decades and you still see it on rewires of older properties where the customer specifically wants it. Rule of thumb: new dwelling = 450 mm minimum to centre; period property rewire matching existing = whatever the customer signs off, usually 150-300 mm. Above worktops it is roughly 150 mm above the worktop surface.',
  },
  {
    question: 'What is FFL and why does it matter so much?',
    answer:
      'FFL is "Floor Finish Level" — the height of the finished floor as it will exist when the customer walks in, including screed, underlay, carpet, tile, vinyl, whatever the finish is. On site you may be standing on raw concrete slab; FFL might be 80 mm higher once the screed and tiles go in. Setting out from the slab gives sockets that look 80 mm low after fit-out. The architect&rsquo;s general arrangement drawing always quotes FFL — that is the number you mark from.',
  },
  {
    question: 'Should I use a laser level for everything?',
    answer:
      'No — over-tooling a small job kills momentum. Laser is the right tool for long horizontal runs (>5 m), large rooms with multiple banks of accessories, and any visible commercial fit-out where alignment is part of the spec. For a single room of domestic sockets, a spirit level and a chalk line is faster and just as accurate. Use the right tool for the scale of the job.',
  },
  {
    question: 'How do I deal with a wall that is not square or not plumb?',
    answer:
      'Two strategies. (1) Set out from a single agreed datum on each wall — pick a corner that the architect has dimensioned from, set the datum line off it, mark everything from that datum, even if the wall ends up bowed. The accessories are then aligned to each other, which is what the eye sees. (2) For very poor walls, build a temporary timber batten true and plumb to the architect&rsquo;s grid, mark off the batten, then remove. Never try to make a bowed wall&rsquo;s accessories follow the bow — they look wrong.',
  },
  {
    question: 'Do I have to mark out fire alarm devices to a specific height?',
    answer:
      'Yes — BS 5839-6 (domestic and similar fire detection) gives detector positioning rules. Smoke detectors at high level (300 mm minimum from any wall, on the ceiling, or on the wall ≥150 mm down from the ceiling). Heat detectors in kitchens at high level. Manual call points at 1400 mm to centre, on the escape route, no further than the manufacturer&rsquo;s reset distance from the panel. The drawing pack should give you the exact positions; you set them out from FFL or from the ceiling depending on the device type.',
  },
  {
    question: 'Why are tolerances tighter on a bank of accessories?',
    answer:
      'The eye spots misalignment between identical objects much more readily than misalignment of one object against the wall. A row of 6 identical white socket plates 5 mm out of line on the bottom edge looks instantly wrong; the same 5 mm error on a single socket nobody would notice. For visible banks (kitchen sockets, grid-switch panels, intercom plates, AV outlets) tighten your tolerance to ±3 mm and use a long laser line or a temporary batten as the reference for every box in the bank.',
  },
];

export default function Sub2() {
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
            eyebrow="Module 4 · Section 3 · Subsection 2"
            title="Mark out dimensions on work areas from drawings"
            description="Translating dimensions on the layout into chalk lines, datum points and centre marks on the actual wall. Datums, FFL, socket and switch heights, scale reading, tolerances, and the marking media that work on each substrate. Get the setting-out right and the install almost installs itself."
            tone="emerald"
          />

          <TLDR
            points={[
              'All accessory heights reference FFL (floor finish level), not the slab. Mark from the wrong reference and the install looks low after fit-out.',
              'Set one datum line per wall (typically 1 m above FFL) and dimension everything else from it. One good datum saves 30 measurements off the floor.',
              'Marking media changes by substrate — pencil on smooth plaster, chinagraph on concrete/block, masking tape + Sharpie on finished surfaces, centre punch on metal.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Mark out dimensions on work areas from drawings — verbatim AC 3.2 from City & Guilds 2365-02 Unit 204.',
              'Set up a wall datum from FFL using a tape, spirit level or laser, and dimension all accessory heights from that single datum.',
              'Apply standard UK accessory heights (sockets 450 mm to centre per Approved Doc M; switches 1200 mm; fire alarm devices per BS 5839-6) to a typical room layout.',
              'Read 1:50, 1:100 and 1:200 scale drawings using a scale rule, with the printed dimensions taking precedence over scaled measurements.',
              'Choose the correct marking medium for each substrate — pencil, chinagraph, Sharpie on tape, or centre punch — without damaging the finish.',
              'Apply realistic tolerances (±10 mm typical, ±3 mm for visible banks of accessories) and verify alignment with a laser or string line before drilling.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Datums and FFL — the foundation of setting out</ContentEyebrow>

          <ConceptBlock
            title="Why every height on the drawing is FFL"
            plainEnglish="Every accessory height on a layout drawing is dimensioned from FFL (floor finish level) — the height the floor will be once it is fully laid. On site you might be standing on bare slab. Mark from the slab and your sockets end up 50-80 mm low after the floor goes in."
            onSite="The architect&rsquo;s general arrangement drawing always shows FFL on every section. Get that number, transfer it to the wall as a horizontal mark, and that is your zero. Every socket, switch, junction box and fire alarm height comes off FFL."
          >
            <p>
              FFL is the surface the customer perceives — top of the carpet, top of the tile,
              top of the vinyl. Below FFL there might be acoustic underlay, screed, insulation,
              membrane, slab — possibly 80-120 mm of buildup in a domestic floor, more in
              commercial. None of that exists from the customer&rsquo;s point of view; what they
              see is a finished floor at FFL, and a socket centred 450 mm above it.
            </p>
            <p>
              On a job with a wet trade still to come (screed, tiling), set the FFL by marking
              it on every wall before the wet trade arrives. A pencil cross 1 m above FFL on
              every wall, dated and signed, becomes the permanent reference for every trade
              that follows.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The 1 m datum line — set once, mark everything from it"
            plainEnglish="The 1 m datum is a horizontal line marked on every wall at exactly 1 m above FFL. Once you have that line, every other height in the room is just an addition or subtraction from 1 m. You measure once, mark once, and reference everything from there."
            onSite="The 1 m datum is universal across UK construction — every other trade uses it too, so if it is already on the wall when you arrive, use it (after sense-checking with a tape from FFL). If not, set it for everyone."
          >
            <p>
              Standard offsets from a 1 m datum:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sockets at 450 mm centre = 550 mm BELOW datum.</li>
              <li>Sockets above worktop (worktop ~900 mm) = 50 mm ABOVE datum.</li>
              <li>Light switches at 1200 mm = 200 mm ABOVE datum.</li>
              <li>Cooker switch at 1400 mm above worktop (~2300 mm from FFL) = 1300 mm above datum.</li>
              <li>Fire alarm manual call point at 1400 mm = 400 mm above datum.</li>
              <li>Smoke detector on ceiling = depends on ceiling height; reference from the ceiling, not the datum.</li>
            </ul>
            <p>
              The point of the datum is consistency — every accessory in the room references
              the same horizontal line, so a row of sockets is genuinely level even if the
              floor and ceiling are not.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Standard UK accessory heights</ContentEyebrow>

          <ConceptBlock
            title="The numbers you should know without looking them up"
            plainEnglish="UK domestic and light-commercial work has a standard set of accessory heights. They come from Approved Document M (accessibility) for new build, BS 5839-6 (fire detection), and decades of conventional practice for legacy work. Memorise them and you stop measuring twice."
            onSite="The figures below are typical defaults — the drawing pack always overrides them, and for accessibility-spec work the reach range of 450-1200 mm above FFL applies to all controls in habitable rooms."
          >
            <div className="space-y-2.5 sm:hidden">
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Socket — habitable room</div>
                <p className="text-[13px] text-white/85 mt-1">450 mm to centre, FFL (Approved Doc M new build). 150-300 mm common on rewires matching existing.</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Socket — above worktop</div>
                <p className="text-[13px] text-white/85 mt-1">~150 mm above worktop surface (worktop typically 900 mm = socket centre ~1050 mm).</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Light switch</div>
                <p className="text-[13px] text-white/85 mt-1">1200 mm to centre, FFL (Approved Doc M reach range upper limit). 1350-1500 mm legacy common.</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Cooker switch / shower switch</div>
                <p className="text-[13px] text-white/85 mt-1">~1400 mm above worktop, or 300 mm above ceiling for ceiling-pull shower. Drawing always specifies.</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Manual call point (fire)</div>
                <p className="text-[13px] text-white/85 mt-1">1400 mm to centre, on escape route. BS 5839-1 (commercial) and BS 5839-6 (domestic).</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Smoke / heat detector</div>
                <p className="text-[13px] text-white/85 mt-1">Ceiling-mounted, 300 mm minimum from any wall, away from corners. BS 5839-6.</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Bathroom shaver socket</div>
                <p className="text-[13px] text-white/85 mt-1">Above sink height, typically 1500 mm to centre. Outside zones 0/1, ideally outside zone 2.</p>
              </div>
            </div>
            <ul className="hidden sm:block space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Socket — habitable room</strong> — 450 mm to centre, FFL (Approved Doc M new build).</li>
              <li><strong>Socket — above worktop</strong> — ~150 mm above worktop surface.</li>
              <li><strong>Light switch</strong> — 1200 mm to centre, FFL (Approved Doc M reach range upper limit).</li>
              <li><strong>Cooker switch / shower switch</strong> — ~1400 mm above worktop, drawing-specified.</li>
              <li><strong>Manual call point (fire)</strong> — 1400 mm to centre, on escape route. BS 5839-1/-6.</li>
              <li><strong>Smoke / heat detector</strong> — Ceiling-mounted, 300 mm min from walls. BS 5839-6.</li>
              <li><strong>Bathroom shaver socket</strong> — ~1500 mm to centre, outside Zones 0/1.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Approved Document M (Access to and use of buildings) — Volume 1: dwellings (paraphrased)"
            clause="In every new dwelling, switches, sockets and other controls in habitable rooms shall be located in a 'reach range' between 450 mm and 1200 mm above finished floor level, so that they can be reached and operated by people in a wheelchair or with limited mobility."
            meaning={
              <>
                Approved Doc M is why the modern UK socket height moved from 150 mm to 450 mm.
                The 450-1200 mm reach range applies to every control in habitable rooms — not
                just sockets and switches, but also TV outlets, intercom plates, thermostats
                and door entry. Above-worktop accessories are an accepted exception because
                worktop sockets follow the worktop, not the floor. The drawing pack should
                show all heights compliant with this range; if it does not, raise an RFI.
              </>
            }
            cite="Source: Approved Document M, Building Regulations 2010 (England), Volume 1 (dwellings) — see legislation.gov.uk for the full text."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Setting-out tools</ContentEyebrow>

          <ConceptBlock
            title="Spirit level, chalk line, plumb bob, laser — pick the right one"
            plainEnglish="The right tool depends on the distance and the accuracy needed. Short runs (<2 m) — spirit level. Long horizontal runs (>5 m) — laser level. Vertical drops on a bowed wall — plumb bob or laser plumb. Marking a row of centres on a wall — chalk line. The skill is not having every tool, it is knowing which one to use when."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Spirit level (600 mm or 1200 mm)</strong> — short horizontals up to about
                2 m; quick checks on a single accessory. Cumulative error grows fast on
                leap-frogged measurements over longer runs.
              </li>
              <li>
                <strong>Chalk line (snap line)</strong> — long straight reference line between
                two pre-marked end points. Ideal for marking a row of socket centres on a
                long wall. Blue chalk on plaster wipes off; red is more permanent (used
                outdoors / on rough surfaces only).
              </li>
              <li>
                <strong>Plumb bob</strong> — true vertical reference, gravity-true, ignores any
                bow in the wall surface. Cheap, reliable, slow.
              </li>
              <li>
                <strong>Self-levelling cross-line laser</strong> — projects horizontal and
                vertical lines onto walls. Massive time-saver on commercial fit-outs and
                multi-room domestic. Worth investing in if you do this work weekly. Works
                best in shaded conditions; in bright sunlight you need the laser detector
                receiver.
              </li>
              <li>
                <strong>Rotary laser</strong> — horizontal line projected 360° at a fixed height.
                The right tool for setting one datum across a whole large room or floor.
              </li>
              <li>
                <strong>Tape measure</strong> — every job. 5 m for room work, 8 m for larger.
                Class II accuracy is fine for setting out; Class I if you are working to
                tight commissioning tolerances.
              </li>
              <li>
                <strong>Scale rule</strong> — six-sided rule with 1:20, 1:50, 1:100, 1:200,
                1:500, 1:1250 markings. Use the scale that matches the drawing.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reading 1:50 vs 1:100 vs 1:200"
            plainEnglish="Scale tells you what 1 mm on the paper means in real life. 1:50 = 1 mm = 50 mm. 1:100 = 1 mm = 100 mm. 1:200 = 1 mm = 200 mm. Always read the scale bar on the drawing first to confirm what scale was actually printed."
            onSite="Drawings get reduced for printing all the time. An A1 drawing at 1:50 reduced to A3 becomes effectively 1:100 — but the scale notation often does not get updated. The scale bar on the drawing is the only reliable measurement reference; printed numerical dimensions always trump scaled measurements."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1:20</strong> — detail drawings (a single socket position with dimensions).</li>
              <li><strong>1:50</strong> — most domestic and small commercial floor plans.</li>
              <li><strong>1:100</strong> — larger commercial floor plans, full house plans on a single sheet.</li>
              <li><strong>1:200</strong> — site plans, multi-floor commercial.</li>
              <li><strong>1:500 / 1:1250</strong> — site context drawings, planning drawings, services routing on a development scale.</li>
            </ul>
            <p>
              Printed dimensions on the drawing always override scaled measurements. If a
              wall is dimensioned "4500" on the drawing but scales to 4400, you build to
              4500. Scaling is for sense-checking, not for setting out.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Marking media — substrate-specific</ContentEyebrow>

          <ConceptBlock
            title="The right pencil for the right wall"
            plainEnglish="Different surfaces take different marking media. Smooth plaster takes pencil. Concrete takes chinagraph. Painted finish takes masking tape with a marker. Steel needs a centre punch. Get this wrong and you either cannot see your marks (HB on rough block) or you damage the finish (chinagraph on white painted plaster — bleeds through paint)."
            onSite="A roll of low-tack masking tape and a thick Sharpie is the most versatile combination — sticks to almost any surface, takes a clear bold line, lifts off without ghosting. For permanent marks where another trade needs to see them after first fix, chinagraph or pencil direct on the substrate."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Smooth plaster (skim coat, brand new)</strong> — HB or 2B pencil. Light,
                clear, easy to remove or paint over. Never Sharpie — it bleeds through
                emulsion and the painter has to seal-coat it.
              </li>
              <li>
                <strong>Painted plaster (existing rewire)</strong> — masking tape + Sharpie line
                on the tape. Lifts off cleanly without disturbing the existing finish. Pencil
                works on light colours; not visible on dark.
              </li>
              <li>
                <strong>Concrete, block, brick</strong> — chinagraph (wax pencil). Visible on
                rough mineral surfaces. Stays put through dust. Marker pen also works for
                bold marks; carpenter&rsquo;s pencil for fine.
              </li>
              <li>
                <strong>Plasterboard (unpainted)</strong> — pencil. Sharpie is permanent and
                will need scuff-sanding before painting.
              </li>
              <li>
                <strong>Timber (joists, studs)</strong> — pencil or carpenter&rsquo;s pencil for
                drilling reference. Centre punch where you want a hole started.
              </li>
              <li>
                <strong>Metal (steel conduit, trunking, back-boxes)</strong> — centre punch
                for hole positions; chinagraph for layout marks.
              </li>
              <li>
                <strong>Tile, glass, polished surface</strong> — masking tape + Sharpie on the
                tape. Never directly on the surface — risk of permanent staining or
                scratching the finish.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Common marking-out errors and how to avoid them"
            plainEnglish="Most marking-out mistakes fall into a handful of repeating patterns. Knowing them ahead of time stops you from making them — every one of these has been the cause of a remedial visit on someone&rsquo;s job."
            onSite="Review this list before you start marking on every new room. Five seconds of reflection can save you 30 minutes of pulling boxes out and re-cutting plaster."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Marking from the slab when the screed is still to come</strong> —
                socket centres land 50-80 mm low after fit-out. Always confirm FFL before
                marking.
              </li>
              <li>
                <strong>Trusting a printed scale on a reduced drawing</strong> — A1 → A3
                printing changes the effective scale. Use the scale bar AND the printed
                dimensions; printed dimensions always win.
              </li>
              <li>
                <strong>Sharpie direct on plaster</strong> — bleeds through emulsion. The
                painter has to seal-coat over it. Use pencil or masking tape + Sharpie on
                the tape.
              </li>
              <li>
                <strong>Leap-frogging a 600 mm spirit level over a 5 m wall</strong> —
                cumulative error grows fast. Use a chalk line between two pre-marked end
                points, or a laser line for anything &gt;5 m.
              </li>
              <li>
                <strong>Ignoring the Approved Doc M reach range</strong> — sockets at
                150 mm on a new build = non-compliance. New build = 450 mm minimum to
                centre, FFL.
              </li>
              <li>
                <strong>Setting out a row of accessories without a single datum</strong> —
                each box measured independently from the floor → cumulative error → bank
                of sockets visibly out of line. Set ONE datum per wall, dimension
                everything off it.
              </li>
              <li>
                <strong>Forgetting to verify before drilling</strong> — once the hole is
                cut, the position is locked. Run a long level or laser across the marked
                centres before the first drill bit goes in.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Tolerances and verification</ContentEyebrow>

          <ConceptBlock
            title="±10 mm is fine for hidden work; ±3 mm for visible banks"
            plainEnglish="Setting-out tolerance depends on whether the result will be visible. A back-box that is 7 mm out of position and gets covered by a faceplate is invisible. A row of six identical sockets where the bottom edges are 7 mm out of line catches the eye instantly. Tighten your tolerance for visible runs."
          >
            <p>
              Standard tolerances:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single accessory in isolation</strong> — ±10 mm vertically and
                horizontally is the typical first-fix tolerance. The faceplate covers the
                box and small misalignment does not show.
              </li>
              <li>
                <strong>Bank of identical accessories on one wall</strong> — ±3 mm. The eye
                spots horizontal misalignment in a row much more readily than position
                error against the wall.
              </li>
              <li>
                <strong>Accessories aligned to architectural features</strong> (centred on a
                window, centred between two cabinets) — ±5 mm. The architect or interior
                designer set those positions for a reason and the tolerance follows the
                visual intent.
              </li>
              <li>
                <strong>Surface-mounted accessories on visible runs</strong> (dado trunking,
                surface conduit) — ±3 mm vertically and horizontally; the tolerance is on
                the trunking/conduit, not on the accessory in isolation.
              </li>
            </ul>
            <p>
              Verify before drilling. Run a long spirit level (or a laser line) across the
              row of marked centre points and adjust before any cutting starts. A 30-second
              check before the first hole saves a 30-minute rework after.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 134.1.1 (Workmanship)"
            clause="(Paraphrased from the regulation requiring good workmanship and proper materials.) Good workmanship by competent persons or persons under their supervision and proper materials shall be used in the erection of every electrical installation. Equipment shall be installed in accordance with the instructions provided by the manufacturer."
            meaning={
              <>
                Reg 134.1.1 is the regulation that sits behind setting out. Marking accessories
                accurately on the wall is workmanship — sloppy marking gives sloppy install
                gives a 134.1.1 finding at periodic inspection. The standard you set during
                setting-out propagates through every subsequent stage of the install. Take it
                seriously and the rest of the install reflects that.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.1.1 (paraphrased)."
          />

          <SectionRule />

          <ContentEyebrow>Worked example — kitchen wall, 6 sockets evenly spaced</ContentEyebrow>

          <Scenario
            title="6 sockets across a 4.2 m kitchen wall, evenly spaced from FFL"
            situation={
              <>
                Customer-spec kitchen rewire. The kitchen wall is 4.2 m end to end. The
                drawing pack shows 6 twin sockets evenly spaced across the wall, 150 mm
                above the worktop (worktop top at 900 mm above FFL, so socket centres at
                1050 mm above FFL). You are first-fix and need to set out 6 back-box
                positions.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1.</strong> Confirm FFL with the kitchen fitter — kitchen units
                arrive at 900 mm to worktop top, but the floor finish (LVT, vinyl, tile)
                might add 8-12 mm. Get the screed level and the floor finish confirmed in
                writing before marking.
                <br /><br />
                <strong>Step 2.</strong> Set a 1 m datum line across the full 4.2 m wall using
                a laser level (or a long spirit level with chalk line). Mark with a pencil
                every ~500 mm so the line is visible after the chalk fades.
                <br /><br />
                <strong>Step 3.</strong> Socket centre height = 1050 mm above FFL = 50 mm above
                the 1 m datum. Mark the height line as a second chalk line, 50 mm above the
                datum, full wall length.
                <br /><br />
                <strong>Step 4.</strong> Calculate horizontal centres. 6 sockets evenly
                spaced across 4200 mm with equal margins each end. Total wall = 4200 mm.
                Divide into 7 equal gaps (6 sockets create 7 spaces — left margin, 5
                between-socket gaps, right margin). 4200 / 7 = 600 mm. So the first socket
                centre is 600 mm from the left wall, then 600 mm to the next, and so on.
                Mark every 600 mm along the height line with a centre cross.
                <br /><br />
                <strong>Step 5.</strong> Verify. Stand back. Run a tape end to end and
                confirm the centres are at 600, 1200, 1800, 2400, 3000, 3600 mm from the
                left wall. Confirm all 6 centres land on the height line (laser-check or
                long spirit level).
                <br /><br />
                <strong>Step 6.</strong> Cut the back-box holes. Each box centred on the
                cross. Tolerance ±3 mm on this run because it is a visible bank of 6
                identical sockets.
              </>
            }
            whyItMatters={
              <>
                A row of 6 sockets is the most visible setting-out task in a kitchen rewire.
                The customer sees them every time they walk in. Get the spacing wrong by
                ±10 mm on each box and the row looks staggered; tighten to ±3 mm and the
                install looks professional. Same time, same materials, dramatically better
                end result.
              </>
            }
          />

          <CommonMistake
            title="Setting out from the slab when the screed is still to come"
            whatHappens={
              <>
                You measure socket centres at 450 mm from the slab on a new build. Six weeks
                later the screed goes in (60 mm) and the floor finish (12 mm vinyl). The
                socket centres are now 378 mm above FFL — visibly low compared to other
                rooms set out properly. The customer notices. The site manager wants the
                boxes moved. Two days of remedial work plus plastering reinstatement.
              </>
            }
            doInstead={
              <>
                Always confirm FFL before marking. Get it from the architect&rsquo;s drawing or
                set it with the principal contractor. Mark a permanent FFL reference cross
                on every wall before any vertical setting-out happens. If FFL is not yet
                fixed (early-stage shell), wait until it is. A two-day delay is cheaper than
                a two-day rework.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'FFL (Floor Finish Level) is the only reliable height reference — never measure from the slab if the floor finish is still to come.',
              'Set one datum line per wall (typically 1 m above FFL). Every other height comes off that one datum, not off the floor each time.',
              'Standard heights: sockets 450 mm centres (Approved Doc M new build), 150 mm above worktop, switches 1200 mm, fire alarm devices per BS 5839-6.',
              'Right tool for the distance — spirit level <2 m, chalk line for marked end points, laser for >5 m, plumb bob for vertical drops on bowed walls.',
              'Read 1:50 / 1:100 / 1:200 with a scale rule; printed dimensions ALWAYS override scaled measurements; reduced drawings are scale-unreliable.',
              'Marking media by substrate — pencil on smooth plaster, chinagraph on concrete/block, masking tape + Sharpie on finished surfaces, centre punch on metal.',
              'Tolerances ±10 mm typical, ±3 mm for visible banks of accessories. Verify with a long level or laser before drilling.',
              'Reg 134.1.1 (workmanship) sits behind every setting-out decision. Sloppy marks give sloppy install gives 134.1.1 findings.',
            ]}
          />

          <Quiz title="Marking out from drawings — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.1 Selecting materials from drawings
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 Fixing accessories to dimensions
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
