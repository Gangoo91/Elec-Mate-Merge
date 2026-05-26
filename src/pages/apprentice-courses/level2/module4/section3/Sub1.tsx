/**
 * Module 4 · Section 3 · Sub 1 — Select materials from drawings
 * City & Guilds 2365-02 → Unit 204 → LO3 → AC 3.1
 *   AC 3.1 — "Select materials from drawings"
 *
 * The take-off Sub. Reading the cable schedule, accessory schedule, containment
 * schedule and CU schedule on a domestic / light-commercial drawing pack.
 * Cross-references between layout, schematic and schedules. Material allowances.
 * Ends on a 3-bed semi rewire walk-through for one ring final.
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
  'Select materials from drawings (3.1) | Level 2 Module 4.3.1 | Elec-Mate';
const DESCRIPTION =
  'Reading the cable, accessory, containment and consumer-unit schedules on a domestic drawing pack. Cross-checking against the layout and schematic, taking off quantities and applying allowances before you order materials.';

const checks = [
  {
    id: 'sched-vs-layout',
    question:
      'The cable schedule on a drawing pack lists "32 A radial — 4 mm² T&E — 22 m". The 1:50 layout shows the route is closer to 28 m once you measure it round the obstructions. Which figure do you order against?',
    options: [
      'Emotional regulation — the ability to manage strong feelings under pressure',
      'The measured layout figure (28 m) plus a routing allowance — the cable has to physically reach.',
      'Capacitors with series reactors to avoid resonance with system harmonics',
      'The branch of health care concerned with preventing and managing work-related ill health, disease, and injury',
    ],
    correctIndex: 1,
    explanation:
      'Schedules are a starting estimate, not the final length. The cable has to physically traverse the actual route, which always grows once you account for drops, rises, going around obstructions and reaching the back-box. Order against the measured layout figure plus 10-20 % for routing slack. If that puts you significantly over the schedule, flag it as a query before you cut, not after.',
  },
  {
    id: 'accessory-cross-check',
    question:
      'The accessory schedule lists 6 × twin sockets in the kitchen. The 1:50 layout drawing shows 5 socket symbols in the kitchen. The schematic shows the kitchen ring with 6 utilisation outlets. Which is the design intent?',
    options: [
      'Prospective fault current at the origin and the need for fault withstand capability',
      'Stop and raise an RFI (request for information) — the three documents disagree, only the designer can resolve it.',
      'To provide a continuous water supply for first-aid firefighting by trained building occupants',
      'Description of work performed, parts used, time taken, fault found, actions taken, any follow-up work required, and asset condition assessment',
    ],
    correctIndex: 1,
    explanation:
      'When schedule, layout and schematic disagree, you do not pick a winner — you flag the conflict to the designer. Raising an RFI takes ten minutes and protects you. Guessing wrong costs a remedial visit and a chase to get paid for the variation.',
  },
  {
    id: 'allowance-tally',
    question:
      'You measure 95 m of T&E across all the circuits on a small rewire. Your normal routing allowance is 15 % and you keep 10 % for offcuts/spares. How many metres do you order?',
    options: [
      '~120 m (15 % routing + 10 % spares stacked multiplicatively).',
      '95 m exactly.',
      '~119 m (95 × 1.25).',
      '~109 m (15 % only).',
    ],
    correctIndex: 2,
    explanation:
      'Routing and spares stack additively in everyday take-off practice — 95 × 1.25 ≈ 119 m. (Strictly 95 × 1.15 × 1.10 = 120 m if you compound them.) Either way you round up to the next standard drum size. Coming back to site for a 3 m offcut costs more than buying a whole 100 m drum.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'On a domestic rewire drawing pack, the cable schedule lists CSA, type, length and route. What does the accessory schedule list?',
    options: [
      '"All circuits were tested in accordance with BS 7671 and the results are recorded in the attached schedule"',
      'Back-boxes, faceplates, FCUs, sockets, switches, smoke alarms — everything that lands on a wall or ceiling.',
      'Is responsible for calling the emergency services and maintaining the first aid kit when a trained first aider is absent',
      'Provide the price but clearly define what "fully inclusive" means by listing all inclusions and exclusions',
    ],
    correctAnswer: 1,
    explanation:
      'The accessory schedule is the wall-end materials list — back-boxes (depth and metal/plastic), faceplates (white moulded, screwless, metalclad), FCUs, sockets, switches, ceiling roses, smoke/heat alarms, CO alarms, fan isolators. It is the document you take off your accessory order from.',
  },
  {
    id: 2,
    question:
      'The CU schedule (consumer-unit schedule) tells you everything except:',
    options: [
      'When circumstances change, after incidents, or periodically',
      'Percentage of time within comfort temperature band',
      'The 1:50 dimension from the kitchen window to the nearest socket.',
      'Both stay relatively constant as heat is absorbed',
    ],
    correctAnswer: 2,
    explanation:
      'The CU schedule lives in the panel — circuit names, way numbers, device types and ratings, RCD/RCBO/AFDD allocation. The 1:50 dimension is on the layout drawing, not the CU schedule. Each schedule answers a different question; never expect one to do the job of another.',
  },
  {
    id: 3,
    question:
      'Why do you typically add 10–20 % to the cable schedule length when you order?',
    options: [
      'The advance guardrail system must be lowered in the correct sequence before each frame section is removed, following the manufacturer\\\\\\\\\\\\\\\'s specific AGR dismantling procedure',
      'The collapse, overturning or failure of any scaffold (including a mobile access tower) from which a person could fall more than 2 metres',
      'Electrical hazards, working at height, manual handling, slips/trips, lone working, occupant disruption, and emergency arrangements',
      'Schedules are taken from the schematic without accounting for actual routing — drops, rises, obstructions and termination tails always add length.',
    ],
    correctAnswer: 3,
    explanation:
      'Schedules are calculated point-to-point or off the schematic line length. Real routing snakes around joists, drops down chases, climbs over noggins, and you need 200 mm of tail at every termination. 10-20 % is the rule of thumb that survives contact with the building. Tighter on a clean new build, looser on a chasing rewire.',
  },
  {
    id: 4,
    question:
      'BS 7671 Reg 514.9.2 (introduced in A4:2026) requires diagrams, charts and information notices to:',
    options: [
      'Comply with the applicable standards specified for them.',
      'To prevent total system failure from a single fault',
      'Adjusting the turns ratio to regulate output voltage',
      'Incorrectly identifying existing conductors',
    ],
    correctAnswer: 0,
    explanation:
      '514.9.2 (new in A4:2026) ties drawings, charts, schedules, instruction labels and warning notices to the relevant product or standards documents that govern them. In practice — your CU schedule must follow the conventions of BS EN 61439-3, your circuit chart must match the actual installation, and your safety/instruction notices must follow the BS standard for that label type.',
  },
  {
    id: 5,
    question:
      'The containment schedule shows 25 mm PVC conduit for the upstairs lighting drops. You discover the joist depth is only 100 mm and the conduit will not fit perpendicular through the joists. Correct first action?',
    options: [
      'At least every 14 months, or every 6 months for certain specified processes',
      'Stop and raise an RFI — joist depth is a structural constraint, the designer needs to resolve the route.',
      'Environmental conditions, usage frequency, instrument stability, regulatory requirements, and criticality of measurements',
      'It softens ligaments and increases joint laxity, making the spine and pelvis more vulnerable to injury from manual handling',
    ],
    correctAnswer: 1,
    explanation:
      'You do not modify structural timber and you do not unilaterally change containment sizes. Either fact could be a deal-breaker — joist holes have rules (BS 5268 / TRADA), and undersizing conduit changes the spacing-factor calc. The designer or building control resolves it; you note the constraint and wait.',
  },
  {
    id: 6,
    question:
      'You are taking off the kitchen ring final. Schedule says 4 sockets + 2 FCUs (washing machine + dishwasher). You measure the route at 35 m. What is the minimum back-box and accessory take-off for the kitchen ring?',
    options: [
      'A web-based tool that helps small businesses carry out COSHH assessments and identify control measures',
      'A spur, broken ring, or high-resistance joint at a socket — investigation required',
      '6 boxes + 4 socket plates + 2 FCU plates + ~42 m of 2.5 mm² T&E (35 m × 1.20 routing) + grommets, fixings, sleeving.',
      'The maximum concentration of an airborne substance averaged over a reference period',
    ],
    correctAnswer: 2,
    explanation:
      'Take-off has to be complete — boxes, plates, cable, grommets, brown sleeving, screws, knockouts, intumescent putty for fire-stopping if penetrating compartments. A take-off with cable but no fixings is not a take-off, it is a partial order that comes back as a "site supplied" extra you eat the cost of.',
  },
  {
    id: 7,
    question:
      'BS 7671 Reg 421.1.7 (A4:2026 wording) covers AFDDs (Arc Fault Detection Devices) on AC final circuits supplying socket-outlets ≤ 32 A in dwellings. The actual regulation language is:',
    options: [
      'Verify the reading manually against BS 7671 Table 41.6 at the actual conductor temperature, and record a C2 observation if it genuinely fails',
      'First 10 A at full demand + 30 percent of remaining nameplate + 5 A for the cooker socket if integrated. Result for a 7 kW (30 A) cooker = around 16 A typical demand.',
      'Alarm responses notify and may trigger corrective actions; safety shutdowns override normal operation to protect life and property',
      'Recommended (the regulation uses recommending language; it strengthens to a requirement only in Higher-Risk Residential Buildings under the Building Safety Act 2022 framework).',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 421.1.7 (A4:2026) recommends AFDDs for AC final circuits supplying socket-outlets ≤ 32 A in dwellings. The recommendation strengthens to a requirement in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 framework. In HMOs / Houses in Multiple Occupation, sleeping accommodation and care homes, supporting fire-safety guidance treats AFDDs as effectively required practice. The CU schedule must reflect the device choice — AFDD/RCBO combo devices are roughly twice the cost of plain RCBOs, so the take-off has to allow for them where they are specified.',
  },
  {
    id: 8,
    question:
      'The drawing pack includes a single-line schematic, a 1:50 floor-plan layout and four schedules. What is the right reading order for a take-off?',
    options: [
      'Schematic to understand circuit logic → layout to confirm physical route → schedules to confirm material specifics → cross-check all three for consistency before ordering.',
      '"At the secondary substation transformer at the end of your street, where 11 kV is converted to 400 V three-phase / 230 V single-phase, then a service cable feeds your cut-out"',
      'Corrosion — white deposits suggest zinc corrosion (galvanic), green deposits indicate copper oxidation in the presence of moisture',
      'Regularly throughout the apprenticeship to identify KSBs that lack sufficient evidence, allowing time to seek out appropriate activities',
    ],
    correctAnswer: 0,
    explanation:
      'Schematic gives you the topology — what feeds what. Layout gives you the geometry — where things actually live. Schedules give you the parts. You read them in that order to build the mental picture, then cross-check that all three agree. Discrepancies between them go on the RFI list, not into the install.',
  },
];

const faqs = [
  {
    question: 'What if there is no cable schedule, only a layout?',
    answer:
      'Common on small jobs and refurb. You become the take-off — measure the layout at scale (use the scale bar, do not assume), assume a sensible CSA per circuit type (1.0 mm² lighting, 2.5 mm² socket ring, 4-6 mm² radial / cooker, 10 mm² shower, 16 mm² sub-main), allow 15 % routing, allow 10 % offcut/spare, and write the schedule yourself. Issue it back to the customer or designer for sign-off before ordering. That signed take-off is your protection if quantities are queried later.',
  },
  {
    question: 'How much routing allowance is "right"?',
    answer:
      'Depends on the job. New-build with services voids and clean routes — 10 % is enough. Plaster chasing on a Victorian terrace with no two walls plumb — 20 % minimum, 25 % if you have ever worked on solid-brick lath-and-plaster. The cost of being slightly over is a small offcut; the cost of being a metre short is a second trip. Always round up to the next drum size.',
  },
  {
    question: 'Can I substitute a different brand of accessory if my wholesaler is out?',
    answer:
      'Only if it is genuinely like-for-like to the spec — same screw centres, same depth, same material spec, same compliance markings (BS EN 60669 for switches, BS 1363 for sockets). On a job with an architect or M&E specifier, brand substitution usually needs written approval — they may have selected a specific finish for a fit-out scheme. Quietly swapping in a different finish gets called out at handover and you do the job again.',
  },
  {
    question: 'When does a CU schedule need to specify AFDD vs RCBO?',
    answer:
      'BS 7671 A4:2026 Reg 421.1.7 RECOMMENDS AFDDs for AC final circuits supplying socket-outlets ≤ 32 A in dwellings. The recommendation strengthens to a requirement in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 framework. In HMOs / Houses in Multiple Occupation, sleeping accommodation and care homes, supporting fire-safety guidance treats them as effectively required practice. The CU schedule should show device type per way — RCBO Type AC vs Type A vs AFDD/RCBO combo — because the device cost gap is significant and an AFDD/RCBO is twice the cost of a plain RCBO. Where AFDDs are specified, missing them on take-off is a budget killer.',
  },
  {
    question: 'How do I take off conduit and trunking quantities?',
    answer:
      'Conduit — measure the route, add 10 % for cuts and bends, plus a count of boxes (round box every 10 m of straight or at every change of direction beyond two 90° bends, draw boxes for long pulls). Trunking — measure straight lengths in 3 m sticks (round up to whole sticks), plus end caps, internal/external corners, tees, and a percentage uplift on lid clips. Always count fixings separately — saddles for conduit, retaining clips for trunking. The fixings line is the one apprentices forget and supervisors curse about.',
  },
  {
    question: 'What is on the consumer-unit schedule that is NOT on the layout?',
    answer:
      'Way numbers, device types per way (MCB / RCBO / RCD / AFDD), Type B/C/D characteristic, kA breaking capacity, neutral arrangement (single-pole vs double-pole switching), bus-bar configuration, RCD groupings, and the cable size into each way. The layout shows where circuits go on the building; the CU schedule shows what protects them. You need both to order — wrong device on the right circuit is just as broken as right device on wrong circuit.',
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
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 1"
            title="Select materials from drawings"
            description="Reading the cable schedule, accessory schedule, containment schedule and CU schedule on a typical drawing pack. Cross-checking against the layout and schematic, taking off quantities, and applying allowances before you order. Get this right and the install runs; get it wrong and you spend the job chasing missing parts."
            tone="emerald"
          />

          <TLDR
            points={[
              'A drawing pack has four schedules (cable, accessory, containment, CU) plus a layout and a schematic. Read them all, in the right order, before ordering.',
              'Schedules are a starting estimate. Real routes always grow — add 10–20 % for routing, 10 % for spares, round up to the next drum size.',
              'When schedule, layout and schematic disagree, you raise an RFI. You never pick a winner unilaterally — that is how variations turn into disputes.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Select materials from drawings — verbatim AC 3.1 from City & Guilds 2365-02 Unit 204.',
              'Read a cable schedule and identify CSA, cable type, route, length, protective device and termination details for every circuit listed.',
              'Cross-reference cable schedule against the 1:50 layout drawing and the single-line schematic, identifying any discrepancies that require an RFI.',
              'Take off accessory quantities (back-boxes, faceplates, FCUs, fixings, grommets, sleeving) for a complete circuit, not just the visible end items.',
              'Apply routing and spares allowances correctly so that one site order delivers everything needed for the install — no second trip.',
              'Identify A4:2026-introduced requirements that affect the take-off — AFDDs recommended in dwellings under Reg 421.1.7 (strengthening to required in HRRBs and effectively required practice in HMOs / sleeping accommodation / care homes), labelling and diagrams (Reg 514.9.2), TN-C-S/PNB documentation.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The drawing pack — what you actually receive</ContentEyebrow>

          <ConceptBlock
            title="Six documents, four schedules, one install"
            plainEnglish="A typical drawing pack for a small electrical install has six pieces of paper. Three are pictures (schematic, layout, elevations). Four are tables (cable, accessory, containment, CU schedule). Together they describe the whole install — your job is to read them in the right order and turn them into a parts order."
            onSite="The schedules look intimidating the first few times. After you have done a couple of take-offs they read like a recipe — you scan a row, write down the parts, scan the next row. The skill is consistency, not speed."
          >
            <p>The standard pack:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-line schematic</strong> — circuit topology. Shows what feeds what,
                from incomer through CU through final circuits to outlets. No physical dimensions,
                just logic.
              </li>
              <li>
                <strong>1:50 floor-plan layout</strong> — physical positions of every accessory,
                cable route lines, datum dimensions for setting out. Sometimes a separate
                ceiling-plan layout for lighting.
              </li>
              <li>
                <strong>Cable schedule</strong> — one row per circuit. Columns: circuit name, CSA,
                cable type, route length, install method, terminations.
              </li>
              <li>
                <strong>Accessory schedule</strong> — every wall-end and ceiling-end fitting.
                Columns: ref, type, finish, location, fixings.
              </li>
              <li>
                <strong>Containment schedule</strong> — conduit sizes, trunking dimensions, basket
                runs, fire-stopping at compartment penetrations.
              </li>
              <li>
                <strong>Consumer-unit schedule</strong> — way-by-way breakdown of the CU. Circuit
                names, MCB/RCBO/AFDD ratings, RCD groupings, neutral arrangement.
              </li>
            </ul>
            <p>
              Smaller jobs (a kitchen rewire, a single-circuit alteration) often skip the
              schedules and just give you the layout. That is fine — but you become the
              schedule. Write it down, get it signed, then order.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Schematic first — get the topology in your head"
            plainEnglish="Open the single-line schematic before you do anything else. It shows what feeds what — incomer to meter, meter to CU, CU to final circuits, final circuits to accessories. Until you can describe the circuit topology in one sentence, you are not ready to take off materials."
            onSite="The schematic is the only document that shows the electrical logic of the install. Layouts show geometry, schedules show parts — only the schematic shows what protects what and what feeds what. Get the topology right and the rest follows."
          >
            <p>
              For a typical 3-bed semi rewire, the schematic shows: incomer (DNO cut-out) →
              meter tails (25 mm² typically) → consumer unit (often 14-18 way dual-RCD or
              all-RCBO) → 8-12 final circuits (lighting, sockets, cooker, shower, smoke alarm
              chain, fan, EV charger if specified, garden supply if any) → outlet positions.
            </p>
            <p>
              You should be able to look at the schematic and say "the kitchen ring is on
              way 6, RCBO Type A 32 A, feeds 6 utilisation outlets". If you cannot, slow down
              and re-read the schematic.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.9.2 (Diagrams, charts, instructions)"
            clause="Diagrams, charts, information notices and instruction notices shall comply with the applicable standards specified."
            meaning={
              <>
                Reg 514.9.2 (introduced A4:2026) ties every drawing, schedule, label and notice
                in the documentation pack to the relevant standard that governs it. The CU
                schedule has to follow BS EN 61439-3 conventions; warning notices have to
                follow the BS standard for that notice type; circuit charts have to match the
                actual installation. As a take-off exercise this means: trust the document, but
                also cross-check that the drawings actually look like compliant drawings —
                out-of-date templates or non-standard notation are a sign that the pack has
                not been updated to A4:2026.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 514.9.2 (introduced A4:2026)."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>The cable schedule</ContentEyebrow>

          <ConceptBlock
            title="One row per circuit — six columns to read"
            plainEnglish="Every cable schedule is laid out the same way. One row per circuit, columns for ref, name, CSA, cable type, route length, and install method. Sometimes a column for protective device and termination notes. Read every row before you start measuring — it forces you to spot inconsistencies."
            onSite="The two columns that catch people out are 'route length' (rarely accurate, always grows on site) and 'install method' (drives both the Reference Method for sizing AND the containment take-off)."
          >
            <p>The standard cable schedule columns:</p>
            <div className="space-y-2.5 sm:hidden">
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Circuit ref</div>
                <p className="text-[13px] text-white/85 mt-1">Way number on the CU. Cross-references the CU schedule.</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Circuit name</div>
                <p className="text-[13px] text-white/85 mt-1">"Kitchen ring", "Upstairs lights", "Shower", "EV charger".</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">CSA</div>
                <p className="text-[13px] text-white/85 mt-1">1.0 / 1.5 / 2.5 / 4 / 6 / 10 / 16 mm² typically.</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Cable type</div>
                <p className="text-[13px] text-white/85 mt-1">PVC T&E (6242Y), PVC singles, SWA, FP200, MICC, LSF/LSZH variants.</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Route length</div>
                <p className="text-[13px] text-white/85 mt-1">Designer&rsquo;s point-to-point estimate. Verify against layout. Add 10-20 %.</p>
              </div>
              <div className="rounded-xl bg-[hsl(0_0%_11%)] border border-white/[0.06] p-3.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-elec-yellow/85">Install method</div>
                <p className="text-[13px] text-white/85 mt-1">Method A/B/C/E/F/100/103 — drives the CCC calc and the containment.</p>
              </div>
            </div>
            <ul className="hidden sm:block space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Circuit ref</strong> — Way number on the CU. Cross-references the CU schedule.</li>
              <li><strong>Circuit name</strong> — "Kitchen ring", "Upstairs lights", "Shower", "EV charger".</li>
              <li><strong>CSA</strong> — 1.0 / 1.5 / 2.5 / 4 / 6 / 10 / 16 mm² typically.</li>
              <li><strong>Cable type</strong> — PVC T&E (6242Y), PVC singles, SWA, FP200, MICC, LSF/LSZH variants.</li>
              <li><strong>Route length</strong> — Designer&rsquo;s point-to-point estimate. Verify against layout. Add 10-20 %.</li>
              <li><strong>Install method</strong> — Method A/B/C/E/F/100/103 — drives the CCC calc and the containment.</li>
            </ul>
            <p>
              Some schedules add a "device" column (the MCB/RCBO/AFDD rating) and a
              "termination" column (loop in/out, ferrule type). Both are useful but
              redundant — if your CU schedule and cable schedule disagree on the device,
              you raise an RFI.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cross-checking schedule against layout"
            plainEnglish="The schedule says 22 m. You measure the layout with a scale rule and it is closer to 28 m. That is normal — the schedule was a designer&rsquo;s estimate, the layout is the actual route. Always verify."
            onSite="Three things change a route length on site: the route on the drawing was straight-line and the actual route snakes; the drops to back-boxes and rises to ceiling roses were not in the estimate; tails at every termination eat ~200 mm a piece. A 22 m schedule figure that lands at 28 m on the layout is not unusual."
          >
            <p>
              The verification is quick — get a scale rule, lay it on the layout, follow the
              cable run line, add a generous tail at each termination point, multiply for
              drops and rises. On a complex run with multiple changes of direction, a piece
              of string on the layout works better than a rule. Always round up.
            </p>
            <p>
              If your measured length is more than 10 % over the schedule, flag it. If it is
              more than 25 % over, raise an RFI before ordering — the route may have changed
              since the design was issued, or you may be missing a critical detail.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The accessory schedule</ContentEyebrow>

          <ConceptBlock
            title="Every wall-end, every ceiling-end, every fixing"
            plainEnglish="The accessory schedule is the wall-end and ceiling-end take-off. Sockets, switches, FCUs, ceiling roses, smoke alarms, fan isolators — everything that gets fixed somewhere visible. Plus the back-boxes that go behind them, plus the fixings."
            onSite="Apprentices order the visible items and forget the boxes. Every faceplate needs a back-box (or surface pattress). Every back-box needs the right depth (25/35/47 mm flush; surface where flush is impossible). Every back-box needs grommets on the cable entries. Every fixing needs the right plug for the substrate."
          >
            <p>The accessory schedule columns:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Item ref</strong> — sometimes a code (S1, S2 for socket variants).
                Cross-references the layout symbol.
              </li>
              <li>
                <strong>Type</strong> — twin socket / single socket / 13 A FCU / 20 A DP switch /
                grid switch / cooker switch / shower switch / smoke alarm.
              </li>
              <li>
                <strong>Finish</strong> — white moulded / white metalclad / black nickel /
                brushed steel / chrome / antique brass — finish drives wholesale unit cost
                significantly.
              </li>
              <li>
                <strong>Box depth</strong> — 25 mm for shallow stud-wall; 35 mm standard flush;
                47 mm for cooker switches and shower switches with thicker terminals.
              </li>
              <li>
                <strong>Quantity</strong> — count from the layout, never trust the schedule
                quantity in isolation.
              </li>
              <li>
                <strong>Mounting</strong> — flush in masonry / flush in stud / surface on
                pattress / dry-line box for plasterboard.
              </li>
            </ul>
            <p>
              Don&rsquo;t forget the consumables. Every back-box needs rubber or plastic grommets
              on the cable entries. Every line conductor in a switch needs brown sleeving on
              the neutral/blue conductor when used as a switch line. Every screw needs the
              right wall plug (frame fixings for masonry, plasterboard plugs for plasterboard,
              wood screws for timber). Add 10-20 % to every consumable count.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Electrical connections)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
            meaning={
              <>
                Reg 526.1 sets the standard every termination has to meet — durable, mechanically
                strong, protected. Selecting accessories from drawings is the upstream side of
                this. Specifying a 25 mm shallow box where a 35 mm box is needed means the
                T&E pinches against the back, the screw terminal cannot be properly torqued,
                and the connection eventually fails. The accessory choice is a 526.1 decision,
                not just a finish decision.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 526.1 (verbatim)."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>The containment schedule</ContentEyebrow>

          <ConceptBlock
            title="Conduit, trunking, basket — sizes, fittings, fire-stopping"
            plainEnglish="The containment schedule lists the runs of conduit, trunking, basket and tray that protect the cable. Each entry has a size, a length, fittings and fire-stopping detail. Take-off the lengths in standard stick sizes, count the fittings separately, and add a fire-stopping line for every compartment penetration."
            onSite="Containment is where take-off goes wrong fastest. Conduit comes in 3 m sticks — round up. Trunking comes in 2 or 3 m sticks — round up. Bends, tees, end-caps and saddle clips all count separately. Forgetting any one of them stops the install."
          >
            <p>For a typical small-commercial conduit run:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conduit length</strong> — measure run, divide by 3 m, round UP. A 7 m run
                = three 3 m sticks (you cannot join offcuts cleanly across a saddle).
              </li>
              <li>
                <strong>Bends</strong> — one per change of direction, plus draw boxes for any pull
                with more than two 90° bends or longer than ~10 m.
              </li>
              <li>
                <strong>Saddles / clips</strong> — typically every 1 m on horizontal PVC, every
                1.2 m on vertical, every 0.6 m next to a box. Steel conduit needs spacing
                bar saddles or P-clips at 1.2-1.5 m intervals.
              </li>
              <li>
                <strong>Bushes / locknuts</strong> — every box entry, both sides. Brass for
                steel conduit, plastic for PVC.
              </li>
              <li>
                <strong>Couplers</strong> — for joins between sticks. PVC solvent-weld, steel
                threaded.
              </li>
              <li>
                <strong>Fire-stopping</strong> — intumescent putty / pillow / mastic at every
                compartment penetration (cavity wall, floor void, fire-rated stud wall). One
                of the easiest things to forget on take-off and one of the most expensive
                to retrofit.
              </li>
            </ul>
            <p>
              For trunking, the same principle — measure straight lengths, round up to whole
              sticks, count corners (internal/external), tees, end caps, lid-clips per stick,
              and the cable retaining clips. Pre-formed copex/flexible conduit needs its own
              line for the entry fittings.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cable basket and tray — different beast"
            plainEnglish="Basket and tray come in 3 m sections (sometimes 2.5 m), with bend pieces, tee pieces, reducers, dropout fittings and a per-stick count of brackets. Take-off measures every section type separately."
            onSite="Cable basket take-offs run on a per-bracket basis — typical bracket spacing is 1.2-1.5 m on a horizontal run, tighter on verticals or at ends. The bracket order is half the cost of the basket itself; missing brackets means you end up with sections of basket sat on top of conduit because the brackets did not arrive."
          >
            <p>
              The standard pieces: straight section (3 m), 90° bend (radius matched to cable
              minimum bend radius), 45° bend, tee, cross, reducer, dropout, and the brackets
              themselves (cantilever, trapeze, channel). Every change of direction is a
              fitting; every bracket position is a count. The schedule should list these
              individually — if it does not, you take-off the layout drawing direct.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The consumer-unit schedule</ContentEyebrow>

          <ConceptBlock
            title="Way by way — devices, ratings, types"
            plainEnglish="The CU schedule is a table — one row per way of the consumer unit. Each row tells you the circuit, the device type (MCB/RCBO/AFDD), the rating (6/10/16/20/32/40/50 A), the characteristic (Type B/C/D), the RCD/RCBO group, and any extras. From this you order the consumer unit and every device that fits in it."
            onSite="A modern domestic CU is rarely all the same kit. A typical 14-way might have: 8 RCBOs Type A, 2 AFDD/RCBO combos (sockets and lighting in an HMO), 1 main switch, 1 surge protection device (SPD Type 2), bus-bar links, blanks for spare ways. Each line of the schedule is a separate part number on the order."
          >
            <p>The CU schedule columns:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Way</strong> — physical position in the CU, numbered left to right.
              </li>
              <li>
                <strong>Circuit name</strong> — matches the cable schedule.
              </li>
              <li>
                <strong>Device type</strong> — MCB, RCBO, AFDD/RCBO combo, blank.
              </li>
              <li>
                <strong>Rating (In)</strong> — 6, 10, 16, 20, 32, 40, 50, 63 A.
              </li>
              <li>
                <strong>Characteristic</strong> — Type B (most domestic), Type C (motors / fluo
                lighting), Type D (heavy inrush).
              </li>
              <li>
                <strong>RCD / RCBO type</strong> — Type AC (legacy, AC fault current only),
                Type A (most modern domestic, includes pulsating DC), Type F or B (EV chargers,
                solar PV, frequency-converter equipment).
              </li>
              <li>
                <strong>kA breaking capacity</strong> — typically 6 kA domestic, 10 kA commercial.
              </li>
              <li>
                <strong>Pole arrangement</strong> — single-pole switching standard; double-pole
                where N-isolation is required.
              </li>
            </ul>
            <p>
              The CU itself is also on this schedule — manufacturer (Hager, Wylex, Crabtree,
              Schneider), enclosure (metal under A4:2026 expectations), number of ways
              including 25 % spare capacity, surge protection device (SPD Type 2 strongly
              recommended, mandatory in some scenarios), main switch rating.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 changes that affect the CU schedule"
            plainEnglish="The A4:2026 amendment recommends AFDDs for AC final circuits supplying socket-outlets ≤ 32 A in dwellings, tightened SPD requirements, and clarified TN-C-S/PNB documentation. All of these affect what goes on the CU schedule and therefore what you order."
            onSite="If the CU schedule was drawn pre-A4:2026 it may be missing AFDDs that are now recommended (or effectively required in HRRBs / HMOs / sleeping accommodation / care homes). Check the issue date of the drawing pack — if it is older than 2026, raise an RFI to confirm AFDD coverage on socket-outlet and lighting circuits before ordering."
          >
            <p>The headline A4:2026 changes for take-off:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AFDDs (Reg 421.1.7)</strong> — RECOMMENDED for AC final circuits
                supplying socket-outlets ≤ 32 A in dwellings. The recommendation
                strengthens to a REQUIREMENT in Higher-Risk Residential Buildings (HRRBs)
                under the Building Safety Act 2022 framework. In HMOs / Houses in Multiple
                Occupation, sleeping accommodation and care homes, supporting fire-safety
                guidance treats them as effectively required practice. Combo AFDD/RCBO
                devices roughly double the per-way cost.
              </li>
              <li>
                <strong>SPDs (Section 443)</strong> — Type 2 SPD strongly recommended at the
                origin of installations supplying critical or vulnerable loads; Type 1+2 at
                the origin of installations with overhead supply or known lightning exposure.
              </li>
              <li>
                <strong>TN-C-S / PNB (Reg 411.4)</strong> — tighter documentation requirements
                for installations with combined neutral-earth supplies, including labelling
                of the PEN conductor and the bonding arrangement.
              </li>
              <li>
                <strong>Diagrams and notices (Reg 514.9.2)</strong> — every diagram, chart and
                notice must comply with the standard for that document type.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (Arc Fault Detection Devices)"
            clause="(Paraphrased — see BS 7671:2018+A4:2026 for full published text.) Arc Fault Detection Devices (AFDDs) conforming to BS EN 62606 are RECOMMENDED for the protection against fire of AC final circuits supplying socket-outlets with rated current not exceeding 32 A in dwellings. The recommendation strengthens to a requirement in Higher-Risk Residential Buildings (HRRBs) under the Building Safety Act 2022 framework. In HMOs (Houses in Multiple Occupation), sleeping accommodation and care homes, supporting fire-safety guidance treats AFDDs as effectively required practice."
            meaning={
              <>
                The A4:2026 wording for Reg 421.1.7 uses RECOMMENDING language for AFDDs on
                socket-outlet circuits ≤ 32 A in dwellings — not mandatory. The recommendation
                strengthens to a requirement only via supporting building-safety legislation
                (the Building Safety Act 2022 framework for HRRBs). In HMOs, sleeping
                accommodation and care homes, fire-safety guidance treats AFDDs as effectively
                required practice. This is still the single biggest CU-schedule change in the
                amendment — an AFDD/RCBO combo device is roughly twice the cost of a plain
                RCBO, and a typical 14-way HMO board carrying AFDDs needs 4-6 of them. Always
                check the issue date of the drawing pack and confirm AFDD allocation with the
                designer for any premises that may fall under 421.1.7 or HRRB legislation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 421.1.7 (paraphrased — see BS 7671:2018+A4:2026 published text)."
          />

          <SectionRule />

          <ContentEyebrow>Material allowances</ContentEyebrow>

          <ConceptBlock
            title="Routing, spares, breakage — three allowances, one order"
            plainEnglish="Cable schedule says 22 m. Real route is 28 m. You add 10 % for routing slack, 10 % for spares/offcuts, round up to the next drum size. Same idea applies to every line of the take-off — you never order exactly what the schedule says."
          >
            <p>The standard allowance percentages, from years of bitter experience:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable</strong> — 10 % new build, 15-20 % refurb / chasing rewire, 25 %
                if you have ever worked on lath-and-plaster or solid-brick Victorian walls.
                Always round up to the next standard drum size (50 m, 100 m, 200 m).
              </li>
              <li>
                <strong>Conduit / trunking</strong> — round up to whole 3 m sticks, then add
                10 % spare on top (offcuts, miscut bends, second pull if first one fails).
              </li>
              <li>
                <strong>Accessories</strong> — 5 % allowance for breakage and missed
                quantities. Faceplates crack when dropped, screws strip, sockets get scuffed.
              </li>
              <li>
                <strong>Consumables</strong> — 20 % allowance on grommets, brown sleeving,
                wall plugs, screws, tape, lubricant, intumescent putty. The cheap stuff you
                always run out of half a day before the wholesaler shuts.
              </li>
              <li>
                <strong>CU and devices</strong> — exact count on the devices, but always
                spec a CU with at least 25 % spare ways for future circuits.
              </li>
            </ul>
            <p>
              The total cost of "over-ordering" by 10-20 % is small. The total cost of
              stopping site to drive to a wholesaler at 11am on a Wednesday is huge — labour
              cost of two operatives standing around, plus the wholesaler markup on the
              one-off purchase, plus the loss of momentum.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Worked example — 3-bed semi rewire, kitchen ring</ContentEyebrow>

          <ConceptBlock
            title="Take-off walk-through for one circuit"
            plainEnglish="A real take-off, end to end, for one final circuit on a typical drawing pack. Use this pattern for every circuit on the schedule and you will never miss a part."
            onSite="The kitchen ring is the take-off most apprentices learn first. Six accessories typical (4 sockets + 2 FCUs for white goods), one CU way, ~30 m of T&E, all the supporting bits."
          >
            <p>
              <strong>The brief.</strong> Drawing pack for a 3-bed semi rewire. Cable schedule
              row 6: "Kitchen ring — 2.5 mm² T&E — 30 m — Method C clipped/Method 100 in stud
              wall — 32 A RCBO Type A". Layout: 4 twin sockets + 2 FCUs (washing machine and
              dishwasher) on the kitchen wall. CU schedule way 6: RCBO Type A, 32 A, Type B
              characteristic. Containment schedule: "Kitchen ring — clipped through floor
              void, in 32 mm chase down to FCUs at worktop level".
            </p>
            <p>
              <strong>Step 1 — verify the schedule against the layout.</strong> Scale-rule the
              route on the layout drawing. Out of CU, across upstairs floor void to kitchen
              corner (5 m), drop down inside stud wall to floor level (3 m), along floor void
              to first socket (4 m), then daisy-chain socket to socket to FCU to FCU back to
              CU (4 + 2 + 3 + 2 + 4 + 5 + 4 = 24 m). Total: 5 + 3 + 24 = 32 m. Schedule says
              30 m. Within tolerance, no RFI needed.
            </p>
            <p>
              <strong>Step 2 — apply allowances.</strong> 32 m × 1.20 (15 % routing + 5 %
              spare) = 38.4 m. Round up to next drum increment — buy a 50 m drum (you will
              use the rest on another circuit) or a 100 m if you are doing the whole rewire.
            </p>
            <p>
              <strong>Step 3 — accessory take-off.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>4 × twin 13 A switched socket, white moulded, BS 1363</li>
              <li>2 × 13 A switched FCU with neon, white moulded</li>
              <li>6 × 35 mm flush metal back-box, single gang for FCU, double gang for sockets (so 2 × single gang and 4 × double gang)</li>
              <li>Grommets — 12 minimum (2 per box for cable in/out), order 20</li>
              <li>Brown sleeving — 1 m (covers all switch lines and any conductor identification)</li>
              <li>Frame fixings 60 mm — 12 (2 per box), order 20 with plugs</li>
              <li>Plasterboard fixings — if any boxes land in stud wall sections, count separately</li>
            </ul>
            <p>
              <strong>Step 4 — containment take-off.</strong> 32 mm chase from floor level
              up to worktop height for the FCU drops — the schedule says channel/oval conduit
              for mechanical protection in the chase. 2 × 1 m of 32 mm oval PVC (one per FCU
              drop), plus capping for the chase fill, plus intumescent putty if any of the
              floor-void penetration is through a fire compartment.
            </p>
            <p>
              <strong>Step 5 — CU device.</strong> 1 × 32 A Type A RCBO Type B characteristic,
              matching the CU manufacturer (Hager NDN132A or equivalent). Already in the CU
              schedule total — just confirm it is on the order.
            </p>
            <p>
              <strong>Step 6 — write the line on the order.</strong> One row per item, with
              part number, description, quantity, supplier, expected delivery date. The
              accessories all come from one wholesaler in one delivery; the CU and devices
              come from another (you may bulk-order the CU and devices for the whole rewire
              together). The cable comes by the drum.
            </p>
            <p>
              That is one circuit. A 3-bed semi rewire has 8-12 circuits. The take-off for
              the whole job is the same exercise repeated 12 times, then totalled, then
              cross-checked against the schedule pages, then sent out for ordering. Allow
              half a day for a careful take-off on a small rewire — and the half day saves
              you three days of chasing missing parts on site.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it bites you on site</ContentEyebrow>

          <CommonMistake
            title="Trusting the schedule length without verifying against the layout"
            whatHappens={
              <>
                Schedule says "Upstairs lighting — 1.5 mm² T&E — 35 m". You order a 50 m
                drum. On site, the actual route through the joists, dropping at every
                ceiling rose, climbing up to switch positions and looping back to the CU,
                works out at 58 m. You finish 7 m short on the last drop, the wholesaler
                cannot deliver until tomorrow, and the plasterer walks off because he was
                expecting first-fix complete.
              </>
            }
            doInstead={
              <>
                Always scale-rule the layout to verify the schedule before ordering. Add
                15-20 % routing allowance over the verified figure, then round up to the next
                drum size. The cost of an extra 50 m drum you might not fully use is trivial
                compared to the cost of stopping site for a missing length of cable.
              </>
            }
          />

          <Scenario
            title="Customer adds an EV charger mid-job, no updated drawing"
            situation={
              <>
                You are halfway through a kitchen rewire. Materials are on site, take-off
                signed off, install proceeding. Customer phones the supervisor — they have
                just bought an EV and want a 7 kW charger added to the install. No updated
                drawing pack, just a verbal "can you fit it in".
              </>
            }
            whatToDo={
              <>
                Stop. An EV charger is not just a circuit — it is a 32 A radial that needs
                its own RCBO Type A or Type B (depending on the charger&rsquo;s integral
                protection), a separate cable run from the CU to the charger position
                (typically 6 mm² T&E or SWA), the OZEV / smart-charging compliance, possibly
                a CT clamp for load management, and possibly an SPD upgrade. None of that
                is on the take-off, and the CU may not have a spare way of the right type.
                Email the customer to confirm the request in writing. Raise the variation
                with the designer (or you, if you are also designing). Do a full take-off
                addendum — extra cable, extra device, possibly a larger CU. Order. Then
                install. Never just "fit it in" — that is how scope-creep turns into a
                callback.
              </>
            }
            whyItMatters={
              <>
                Take-off is not just a one-off exercise at the start of the job. Any change
                to the design triggers a take-off addendum. Customer-driven variations are
                where small jobs lose money — the labour for the variation is easy to
                quote, but the additional materials, the design time, and the rework to
                fit the new circuit into the existing CU are easy to forget.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.12 (Documentation)"
            clause="(Paraphrased.) The design of the installation shall be documented in such a way that the operator can install, operate and maintain the installation correctly. Documentation shall include the type and composition of every circuit (points supplied, conductor cross-sectional area, type of wiring, route length and protective device) and any information necessary for the identification and verification of every circuit."
            meaning={
              <>
                132.12 is the regulation behind every drawing pack you ever read. The pack
                must give the installer enough information to install the circuit correctly,
                and the same pack must give the future inspector enough information to verify
                the circuit at periodic inspection. If the pack you receive is missing any of
                points-supplied / CSA / wiring type / route length / protective device, raise
                an RFI — that is not a documentation gap, that is a 132.12 non-compliance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 132.12 (paraphrased)."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A drawing pack has six pieces of paper — schematic, layout, and four schedules (cable, accessory, containment, CU). Read them in that order.',
              'Schedules are estimates. Verify every length and quantity against the layout before ordering. RFI any disagreement — never pick a winner unilaterally.',
              'Add 10–20 % routing allowance on cable, 10 % spare, round up to standard drum size. Containment in whole 3 m sticks. Accessories +5 % breakage; consumables +20 %.',
              'CU schedule is the parts list for the panel — way, circuit, device type, rating, characteristic, RCD/RCBO type, kA, pole arrangement. A4:2026 Reg 421.1.7 RECOMMENDS AFDDs for AC final circuits supplying socket-outlets ≤ 32 A in dwellings (strengthening to required in HRRBs; effectively required practice in HMOs / sleeping accommodation / care homes) — significant cost impact where specified.',
              'Reg 514.9.2 (A4:2026) requires diagrams, charts and notices to comply with the applicable standards. Out-of-date templates are a sign the pack has not been updated.',
              'Reg 526.1 means accessory choice is a connection-quality decision, not just a finish decision. Wrong box depth = bad termination = 526.1 fail.',
              'Take-off is not a one-off — every variation triggers an addendum. Customer changes mid-job get logged, priced, ordered, then installed.',
              'Half a day of careful take-off saves three days of chasing missing parts. The skill is consistency, not speed.',
            ]}
          />

          <Quiz title="Selecting materials from drawings — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section2/2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.5 RAMS, toolbox talks, permit-to-work
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Marking out from drawings
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
