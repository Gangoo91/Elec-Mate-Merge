/**
 * Module 4 · Section 3 · Sub 9 — Cable pulling and dressing techniques
 * Synthesis / supplementary Sub.
 *
 * Pre-pull prep, draw rope, lubrication, pulling tension limits, pulling grips
 * vs pulling eyes (NEVER pull on conductor), bending radius, long-pull tactics
 * (intermediate boxes, 30 m draw points), cable dressing on tray/basket.
 * Worked example: 6 × 2.5 mm² T&E through 25 mm conduit, 10 m, 3 × 90° bends.
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
  'Cable pulling and dressing techniques (3.9) | Level 2 Module 4.3.9 | Elec-Mate';
const DESCRIPTION =
  'Pre-pull prep, draw rope, lubrication, pulling tension limits, pulling grips vs pulling eyes, bending radius, long-pull tactics, dressing cable on tray and basket. The mechanical craft side of installation.';

const checks = [
  {
    id: 'pull-where',
    question:
      'You are pulling 6 × 2.5 mm² T&E through 10 m of 25 mm PVC conduit with 3 × 90° bends. The cable jams partway through the second bend. Best response:',
    options: [
      'Stop. Reverse the pull (back the cable out), check for blockages, add more lubricant, consider adding a pulling box at the worst bend, then re-attempt.',
      'The storage container must be within a secondary containment system (bund) capable of holding 110% of the container\\\\\\\\\\\\\\\'s capacity',
      'That all persons and loose materials have been removed from the platform, and the tower height does not exceed the safe height-to-base ratio',
      'BSR (always); residents (rights under BSA 2022); contractors working on the building (so they can integrate their work safely); fire and rescue service (RRFSO 2005 powers).',
    ],
    correctIndex: 0,
    explanation:
      'Forcing a jammed pull damages the cable. The right response is stop-reverse-investigate-reattempt. Reverse to free the cable, identify why it jammed (insufficient lube, undersized conduit, sharp internal edge, too many bends), fix the underlying cause, then re-pull. If the conduit run is genuinely under-sized for the cable count, an intermediate draw box is the right cure — splits the pull into two manageable segments.',
  },
  {
    id: 'pulling-grip-vs-eye',
    question:
      'You need to pull a 6 mm² T&E onto a tray run of ~30 m. The right method to attach the cable to the pulling rope is:',
    options: [
      'A platform-independent, secure, standard interface for data exchange between automation systems, MES, and enterprise IT systems',
      'Mechanically protected (capping/conduit), OR enclosed in earthed metallic covering, OR provided with 30mA RCD additional protection',
      'The defect must be recorded in the report and the machine must be taken out of service immediately, as a cracked boom weld is a critical structural defect that could lead to catastrophic failure',
      'Use a pulling grip ("Chinese finger trap") that grips the cable&rsquo;s OUTER SHEATH evenly along its length, distributing the pull force without stressing the conductor.',
    ],
    correctIndex: 3,
    explanation:
      'Pulling grips (sometimes called "Chinese finger traps" or "stockings") wrap around the cable&rsquo;s outer sheath and tighten as the rope pulls — distributing the pulling force evenly along ~150-300 mm of cable. The conductor inside is never stressed. Pulling on the conductor directly (with rope or crimp) damages the conductor at the eye and causes IR / continuity failures later. Tape gives way at the first hard bend.',
  },
  {
    id: 'bend-radius-pull',
    question:
      'You are about to pull SWA cable through a route with one tight bend that does not respect the cable&rsquo;s 8× OD minimum bend radius. The right action is:',
    options: [
      'By verifying that they have the skills, knowledge, training, experience, and organisational capability to carry out the work safely',
      'Add a draw box at the tight bend so the pull is split into two segments and the cable can be re-routed in two straight pulls; OR re-route the cable to avoid the tight bend entirely.',
      'An Insulated-Gate Bipolar Transistor — used in industrial inverters, EV chargers and VFDs to switch hundreds of volts at hundreds of amps.',
      'Segregate WEEE from general waste, store in suitable conditions, transfer only to authorised facilities under a Waste Transfer Note, and keep records for at least 2 years',
    ],
    correctIndex: 1,
    explanation:
      'A bend tighter than the manufacturer minimum kinks the cable, damages the insulation invisibly, and the cable fails IR or continuity tests months later. Pulling more slowly does not help; lube does not help. The cure is mechanical — either add a draw box so the pull is split into two segments and the cable enters/exits the box in two straight pulls, OR re-route to eliminate the tight bend. Both are first-fix decisions; once the cable is installed and stuck, the only fix is replacement.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Maximum pulling tension for stranded copper conductors using a stocking grip (Chinese-finger trap) is approximately:',
    options: [
      'Take their concern seriously as a potential warning sign, ask directly if they are thinking of suicide, encourage them to tell a trusted person or professional, and consider means restriction by suggesting they give excess medication to someone for safekeeping',
      'Approximately 50 N/mm² (≈ 5 kg per mm² of conductor CSA) per the published manufacturer / IET Electrical Installation Design Guide figure when pulling via a stocking grip on the cable sheath. Pulling on the conductor itself (rather than via a grip) drops this to ~30 N/mm². Many sites use a conservative 1.5-2 kg/mm² no-thinking-required field rule.',
      'Three tests, ALL of which must be satisfied: (a) it is unreasonable in all the circumstances for the conductor to be dead, AND (b) it is reasonable in all the circumstances for the work to be carried out live, AND (c) suitable precautions are taken to prevent injury. All three — not any one. Most fault diagnosis live working passes test (a) (you need voltage to measure) but tests (b) and (c) are where most risk-assessment failures sit.',
      'Stop, locate the SDS for both products (manufacturer website, the firm\\\\\\\\\\\\\\\'s COSHH register, or in the product packaging), read at least Section 2 (hazards), Section 4 (first aid) and Section 8 (exposure controls / PPE). Confirm you have the right PPE for both products. Only then start. COSHH 2002 Reg 6 requires the assessment to happen BEFORE exposure, not after.',
    ],
    correctAnswer: 1,
    explanation:
      'Maximum pulling tension per conductor is ~50 N/mm² (≈5 kg per mm² of conductor CSA) for copper using a stocking grip (Chinese-finger trap). Pulling on the conductor itself rather than via a grip drops this to ~30 N/mm². See cable manufacturer data + IET Electrical Installation Design Guide for the formal figure. Many sites use a conservative 1.5-2 kg/mm² as a no-thinking-required field rule because it is easier to remember and gives a generous margin. Pulling-tension meters (and many electric cable pullers) measure the force directly so you can verify in real time.',
  },
  {
    id: 2,
    question:
      'Cable pulling lubricant should be:',
    options: [
      'Separation of busbars from functional units, and separation of functional units from each other, including separation of their terminals',
      'Plan the apprentice\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2019s involvement to maximise learning, match the tasks to NVQ units, and coordinate with the college for theory support',
      'A purpose-formulated cable-pulling lubricant — wax-free for plastic conduit (some lubes attack PVC), and PVC-compatible. Polywater is a common brand.',
      'Any person who controls the work of others, including employers, the self-employed and those who control others\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\' work',
    ],
    correctAnswer: 2,
    explanation:
      'Use a proper cable-pulling lube (Polywater, Yellow 77, equivalent). Wax-free for PVC conduit (waxes can chemically react with PVC and degrade it). Compatible with the cable&rsquo;s outer sheath. Slow-evaporating so it stays slick during a long pull. Generic oils, WD-40, soap, washing-up liquid all either degrade PVC, dry out fast, or leave residues that attract dust and create future problems.',
  },
  {
    id: 3,
    question:
      'Long-pull tactics — for a pull longer than ~30 m or with multiple bends:',
    options: [
      'CW type for outdoor, BW type for indoor — but for SWA cable entering steel enclosures, a CW gland with an earthing tag is typically used',
      'Insufficient maintenance resources, poor planning, or too many reactive tasks consuming planned maintenance time',
      'Work with asbestos that does NOT need a licence — the basic precautions and which task sheets (a1–a40) cover specific jobs.',
      'Use intermediate pulling boxes / draw boxes every ~30 m or at any complex set of bends; pull cable into one box, then start the next pull from that box.',
    ],
    correctAnswer: 3,
    explanation:
      'Long pulls split into shorter ones at intermediate draw boxes — each box becomes a starting / ending point for a manageable pull. ~30 m is the typical maximum for a single pull through standard conduit; tighter bends or higher cable count reduces it. Plan draw box positions at the design stage; retrofitting a draw box mid-install is much harder.',
  },
  {
    id: 4,
    question:
      'Cable dressing on a basket / tray run should be:',
    options: [
      'Cables laid parallel to the run, segregated by service type (mains separate from data separate from fire alarm), spaced for thermal dissipation per Reg 522.6 grouping factors, secured periodically with metal cable ties.',
      'The total generation capacity exceeds 3.68 kW per phase (16 A per phase), requiring formal application to the DNO for connection approval before installation',
      'A legitimate complaint identifies a genuine failure to meet agreed standards; an unreasonable complaint seeks outcomes beyond what was agreed or what is fair',
      'Check the light curtain alignment, clean the lenses, inspect for environmental contaminants (dust, coolant mist), verify the safety relay status, check wiring connections, review the maintenance history for recurring issues, and ensure the safety distance calculation is still valid',
    ],
    correctAnswer: 0,
    explanation:
      'Cable dressing matters for both performance and aesthetics. Parallel laying minimises crossings. Segregation by service type meets BS separation requirements (BS 6701 for data, BS 5839 for fire alarm). Spacing for thermal dissipation respects the OSG grouping correction factor Cg. Metal cable ties at intervals (per A4:2026 Reg 521.10.202) keep the dressing in place. Bundling tightly increases the effective grouping count and reduces every cable&rsquo;s rated current.',
  },
  {
    id: 5,
    question:
      'A draw rope is left in a conduit run after a cable is pulled because:',
    options: [
      'Inspection records provide evidence of the scaffold\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s condition and whether it was properly maintained',
      'It is the next person&rsquo;s draw rope — leaves a path through the conduit for future cable additions without re-roding.',
      'Strategies that involve escaping from or denying the stressor rather than addressing it, such as substance use or withdrawal',
      'National Grid Electricity Transmission (NGET) — the transmission owner. The independent operator is now the National Energy System Operator (NESO).',
    ],
    correctAnswer: 1,
    explanation:
      'Leaving a draw rope in the conduit after every pull is professional practice. The next person who needs to add a cable to the run finds a rope already in place and pulls the new cable straight in — no need to re-rod the conduit, no need to dismantle anything. The 50 p of polyester rope you leave in is a courtesy that compounds across years of building maintenance.',
  },
  {
    id: 6,
    question:
      'BS 7671 Reg 522.8.1 covers:',
    options: [
      'It establishes BS 7671 as a means of demonstrating compliance with EAWR — meaning a court will treat following BS 7671 as strong evidence of having met the EAWR duty, and ignoring it as strong evidence of not having met it. BS 7671 itself remains non-statutory.',
      'The amount you pay towards each claim before the insurer pays. Higher excess = lower premium and vice versa. Some policies have separate excesses for different claim types (e.g. theft excess higher than damage excess).',
      'Wiring system mechanical stress — selection and erection to avoid damage to the sheath or insulation of cables and their terminations during installation, use or maintenance. Lubricants that damage the cable are not permitted.',
      'Heat-pump-ready electrical infrastructure (typically a 16-32 A radial spare way), EV charging provision (Approved Document S), PV and battery enabling (capped cables, suitably sized supply), and zero gas connections from 2025 in many new builds.',
    ],
    correctAnswer: 2,
    explanation:
      'Verbatim Reg 522.8.1 — wiring system selected and erected to avoid damage to sheath, insulation and terminations during installation, use OR maintenance. Forbids the use of lubricants that damage the cable. The pulling-tension limit and the bend-radius minimum are both expressions of 522.8.1 — they are mechanical stress limits to protect the cable during installation.',
  },
  {
    id: 7,
    question:
      'A "pulling eye" is:',
    options: [
      'Washing facilities must include a supply of hot and cold (or warm) running water, soap or other suitable means of cleaning, and towels or other suitable means of drying',
      'Frequency starts to dip slightly. NESO automatically calls on reserve generation (gas peakers, pumped storage, interconnector imports) to balance demand. If unbalanced for too long, frequency excursions trigger automatic load shedding.',
      'The total greenhouse gas emissions associated with the manufacture, transport, installation, maintenance, and end-of-life disposal of building materials and components',
      'A factory-fitted (or field-installed) loop / ring at the end of large cable that the pulling rope attaches to — distributing the pulling force across the cable&rsquo;s mechanical termination, never the conductor directly.',
    ],
    correctAnswer: 3,
    explanation:
      'Pulling eyes are factory-fitted loops on large SWA, MV and HV cables — a specifically engineered termination that connects the pulling rope to the cable without stressing the conductor. The pulling force goes through the eye to the cable&rsquo;s mechanical termination (compression on the armour, the bedding, the sheath) — never directly on the conductor. For smaller cables you make a field-installed pulling grip from braided wire mesh that grips the outer sheath.',
  },
  {
    id: 8,
    question:
      'Conduit fill (spacing factor) limits how much cable you can pull through. Typical maximum fill for cable installation is:',
    options: [
      'Approximately 40-45 % — allows the cables to slide past each other during the pull and provides some thermal dissipation room.',
      'Allocate roughly 15 minutes for reading/planning, 60 minutes for calculations and working, 30 minutes for writing the report, and 15 minutes for checking',
      'To the Main Earthing Terminal (MET) — directly, with a continuous run of suitably sized conductor.',
      'The laptop must be password-protected, the data encrypted, and the electrician must be able to demonstrate what data they hold and why',
    ],
    correctAnswer: 0,
    explanation:
      'IET On-Site Guide and BS 7671 Appendix 5 give the spacing factor for cable installation in conduit and trunking. ~40-45 % maximum fill is the install limit; this allows cables to slide past each other during the pull and gives room for thermal dissipation in service. Tighter fills cause pulls to jam (in the worst case, you cannot get the cable through at all) and reduce the cables&rsquo; rated current via thermal grouping.',
  },
];

const faqs = [
  {
    question: 'How much pulling force can I safely apply?',
    answer:
      'The published manufacturer / IET Electrical Installation Design Guide figure is ~50 N/mm² (≈ 5 kg per mm² of conductor CSA) for copper using a stocking grip (Chinese-finger trap). Pulling on the conductor itself rather than via a grip drops this to ~30 N/mm². Many sites use a conservative 1.5-2 kg/mm² as a no-thinking-required field rule because it gives a generous safety margin and is easier to remember. For a 4-core 16 mm² SWA (4 × 16 = 64 mm² total) the formal limit is ~320 kg with stocking grip; the 1.5 kg/mm² field rule gives ~96 kg — well below the limit. For 6 × 2.5 mm² T&E (6 × 2 × 2.5 = 30 mm² total assuming line+CPC) the formal limit is ~150 kg, the field rule ~45 kg. Above ~100 kg use a pulling tension meter or a powered cable puller with a torque limit; above ~500 kg a hydraulic puller with a calibrated tension display is required.',
  },
  {
    question: 'What lubricant should I actually use?',
    answer:
      'A proper cable-pulling lubricant — Polywater J, Yellow 77, Greenlee Winter-Grade, or equivalent. Available in tubs, bottles or trigger sprays. Wax-free for PVC compatibility. Slow-evaporating so it stays slick during a long pull. Apply liberally at the entry of the conduit and at every bend; the cable carries the lube along the run as it pulls. Costs ~£15-30 per tub; a tub does several jobs. Never WD-40 (degrades PVC), never washing-up liquid (dries fast and leaves residue), never engine oil.',
  },
  {
    question: 'When should I add an intermediate draw box?',
    answer:
      'Plan draw boxes during design wherever the route exceeds ~10 m with bends, ~30 m straight, or includes more than two 90° changes of direction in a row. Each draw box becomes a pull-end and pull-start, splitting a long route into manageable pulls. Common installations — every 30 m on a service riser, at every change-of-direction junction in a complex commercial fit-out, at every floor penetration on a multi-storey building. The draw box also serves as a future maintenance access point.',
  },
  {
    question: 'What is the right way to pull a draw rope through new conduit?',
    answer:
      'Two methods. (1) Conduit rod / drawing tape — push a flexible plastic rod through the conduit run, attach the draw rope to the leading end, pull the rod back through with the rope following. Standard for conduit up to ~25 m without too many bends. (2) Mouse + line — feed a small fabric "mouse" with a string attached into one end of the conduit, blow with compressed air or gravity-feed it through to the far end, then use the string to pull the heavier draw rope through. Standard for longer or more complex runs. After the pull, leave a draw rope in for the next person.',
  },
  {
    question: 'How tight is too tight on the bend during a pull?',
    answer:
      'The cable manufacturer&rsquo;s minimum bend radius — typically 6× OD for unarmoured cable (T&E, FP200), 8× OD for SWA, 12× OD for MICC. For a single-cable pull this is the LIVE bend radius (during the pull); the installed bend can be tighter only if it would still satisfy the regulation 522.8.3 in service. In practice, design the route so the installed bends already meet or exceed the pull-time radius — that way the pull is always within tolerance.',
  },
  {
    question: 'How do I dress cables tidily on a tray run after pulling?',
    answer:
      'Lay cables parallel to the run direction. Segregate by service type — mains in one zone, data / fire alarm / extra-low-voltage in another zone, with a barrier or tray division between. Space for thermal dissipation per OSG grouping factors. Secure with metal cable ties (per A4:2026 Reg 521.10.202) at ~600 mm intervals on horizontal, ~400 mm on vertical. Neat dressing also makes future inspection / additions much easier — a knotted bundle of unsegregated cables is impossible to add to without disturbing every existing cable.',
  },
];

export default function Sub9() {
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
            eyebrow="Module 4 · Section 3 · Subsection 9"
            title="Cable pulling and dressing techniques"
            description="The mechanical craft side of installation. Pre-pull prep, draw rope, lubricant, pulling tension limits, pulling grips and eyes, bending radius management, long-pull tactics with intermediate boxes, cable dressing on tray and basket. The supplementary Sub on the skill that turns first-fix planning into installed circuits."
            tone="emerald"
          />

          <TLDR
            points={[
              'Pre-pull prep is everything — route survey, draw rope in, lubricant ready, pulling grip or eye attached. A thirty-second prep saves a thirty-minute jam.',
              'Pull on the cable&rsquo;s outer sheath via a pulling grip or eye — NEVER on the conductor directly. Conductor pulls damage the conductor at the eye and cause IR failures later.',
              'Pulling tension limit ~50 N/mm² (≈ 5 kg/mm²) for copper with stocking grip per published manufacturer / IET Electrical Installation Design Guide; ~30 N/mm² if pulling on the conductor itself. Many sites use a conservative 1.5-2 kg/mm² field rule. Bend radius 6× OD unarmoured / 8× SWA / 12× MICC — at PULL time, not just installed.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Supplementary content — extends LO3 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding of cable pulling and dressing as a craft skill that turns first-fix planning into installed circuits.',
              'Plan a cable pull — route survey, conduit fill check, intermediate draw box positions, draw rope installation, lubricant choice.',
              'Apply pulling tension limits (~50 N/mm² ≈ 5 kg/mm² copper with stocking grip per published manufacturer / IET Electrical Installation Design Guide; conservative 1.5-2 kg/mm² no-thinking-required field rule on most sites) and recognise the warning signs of an over-tensioned pull.',
              'Use pulling grips and pulling eyes correctly so that pulling force is applied to the cable&rsquo;s sheath and mechanical termination, never directly to the conductor.',
              'Maintain bend radius minimums during the pull and in the installed run (6× OD unarmoured, 8× OD SWA, 12× OD MICC).',
              'Dress cables on tray, basket and ladder runs — parallel, segregated by service, spaced for thermal dissipation, secured with non-combustible metal ties per A4:2026 Reg 521.10.202.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Pre-pull preparation</ContentEyebrow>

          <ConceptBlock
            title="Survey the route before you start the pull"
            plainEnglish="Walk the route end to end before pulling any cable. Note every bend, every junction box, every change of containment, every place the cable might catch. Confirm the conduit is clear (rod through, draw rope in, no debris). Confirm the bend radius at every change of direction is within the cable manufacturer minimum. Five minutes of survey saves five hours of jammed pulls."
          >
            <p>
              The pre-pull survey checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Conduit / trunking complete, ends finished, no internal sharp edges.</li>
              <li>All boxes / junctions in place, lids removable for the pull.</li>
              <li>Rod through the conduit / draw rope already pulled in.</li>
              <li>Every bend respects the cable&rsquo;s minimum bend radius (6× OD unarmoured, 8× SWA, 12× MICC).</li>
              <li>Conduit fill within the IET / OSG limit (~40-45 % typically).</li>
              <li>Lubricant on hand — proper cable-pulling lube, wax-free for PVC conduit.</li>
              <li>Pulling grip or eye sized for the cable.</li>
              <li>Pulling rope rated for the expected force (typically 6 mm polyester, 200-300 kg breaking).</li>
              <li>Power cable puller / hand puller available if the run is long or heavy.</li>
              <li>Second person at the feeding end if the pull is long or large CSA.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Draw rope, draw tape, conduit rod — getting a line through"
            plainEnglish="Before you can pull the cable, you need a line through the conduit. Three methods. (1) Conduit rod (steel or fibreglass push-rod) — push through, attach the draw rope, pull back. (2) Draw tape (plastic / metal flat tape on a reel) — feed through, attach rope, pull back. (3) Mouse and line (small fabric cone with string, blown through with compressed air or gravity) — feed through, use the string to pull a heavier rope through. Each suits different run lengths and bend complexities."
          >
            <p>
              Method selection:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Short, simple run (under ~10 m, &lt;2 bends)</strong> — conduit
                rod or fibreglass tape. Push from one end, attach rope, pull back.
              </li>
              <li>
                <strong>Medium run with bends (10-25 m, 3-4 bends)</strong> — fibreglass
                conduit tape (more flexible than steel rod). Sometimes needs lubricating
                the rod itself to get through tight bends.
              </li>
              <li>
                <strong>Long or complex run (&gt;25 m or 5+ bends)</strong> — mouse and line
                method. The mouse is a small fabric or foam cone with a thin string
                attached. Drop it in the entry, blow compressed air through, the mouse
                rides the air flow to the far end. Use the string to pull a heavier rope.
              </li>
              <li>
                <strong>Run that already has cable in it</strong> — use the existing draw
                rope (left from the previous pull) to pull the new cable AND a new draw
                rope for next time.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Pulling tension and force</ContentEyebrow>

          <ConceptBlock
            title="Pulling tension limit — ~50 N/mm² (≈ 5 kg/mm²) for copper with stocking grip"
            plainEnglish="The cable manufacturer specifies a maximum pulling tension. The published figure (per cable manufacturer data + IET Electrical Installation Design Guide) is ~50 N/mm² (≈ 5 kg per mm² of conductor CSA) for copper using a stocking grip (Chinese-finger trap). Pulling on the conductor itself rather than via a grip drops this to ~30 N/mm². Many sites use a conservative 1.5-2 kg/mm² as a no-thinking-required field rule. Exceed the limit and the conductors stretch at the eye, individual strands break, the insulation cracks. The cable then fails IR or continuity testing."
          >
            <p>
              How to apply the limit in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Calculate the limit before pulling</strong> — sum the conductor
                CSAs (e.g. 4 × 16 mm² = 64 mm²), multiply by ~50 N/mm² (≈ 5 kg/mm²) for
                the published stocking-grip limit (~320 kg). Use the conservative
                1.5-2 kg/mm² (≈ 100-130 kg for the same cable) as the field rule for a
                generous safety margin.
              </li>
              <li>
                <strong>Use a pulling tension meter</strong> on heavy pulls (electric
                cable pullers usually have one built in; standalone meters available for
                manual pulls).
              </li>
              <li>
                <strong>Set the puller torque limit</strong> if using a powered cable
                puller — most modern pullers have an adjustable torque cut-off.
              </li>
              <li>
                <strong>Listen for warning signs</strong> — manual pull becoming "stuck";
                cable visibly stretching at the entry; mechanical groaning from the
                rope/grip system. Stop immediately if any of these appear.
              </li>
              <li>
                <strong>Add intermediate draw boxes</strong> — splits a long pull into
                shorter ones, each within the tension limit by definition.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pulling grip vs pulling eye — never pull on the conductor"
            plainEnglish="The pulling rope MUST attach to the cable&rsquo;s outer sheath (via a pulling grip) or to the cable&rsquo;s mechanical termination (via a pulling eye). Pulling on the conductor itself — by tying the rope around bare conductors, by crimping the rope onto a stripped end, or by relying on tape — damages the conductor at the attachment point and causes failure."
            onSite="A pulling grip (also called a Chinese finger trap or stocking) is a braided wire mesh tube that wraps around the cable and tightens as the rope pulls — distributing the force evenly along ~150-300 mm of cable sheath. The grip costs ~£15-25, sized to the cable OD, and is reusable across many pulls. Pulling eyes are factory-fitted on large SWA, MV and HV cables — a specifically engineered loop that connects the rope to the cable&rsquo;s mechanical termination."
          >
            <p>
              Attachment options by cable type:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>T&E and small unarmoured cable</strong> — pulling grip sized for
                the OD, slipped over the cable end and tightened with the rope.
              </li>
              <li>
                <strong>SWA up to ~25 mm²</strong> — pulling grip sized for the armour OD;
                grip wraps the outer sheath, force transmits through to the armour.
              </li>
              <li>
                <strong>SWA above 25 mm²</strong> — factory-fitted pulling eye if specified;
                otherwise field-installed pulling grip rated for the cable diameter and
                weight.
              </li>
              <li>
                <strong>MV / HV cable</strong> — always factory-fitted pulling eye, often
                a swivel between the rope and the eye to prevent twist.
              </li>
              <li>
                <strong>Multiple cables in one pull</strong> — pulling grip large enough
                to wrap all cables together, OR pull cables individually if the
                accumulated force exceeds the grip rating.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Bend radius management</ContentEyebrow>

          <ConceptBlock
            title="The minimum bend radius rule, applied at pull time"
            plainEnglish="The cable manufacturer specifies a minimum bend radius — typically 6× OD for unarmoured cable, 8× OD for SWA, 12× OD for MICC. This applies BOTH during the pull AND in the installed configuration. A bend tighter than the minimum kinks the cable, damages the insulation invisibly, and the cable fails IR or continuity testing months later — long after the original install team has left site."
          >
            <p>
              Practical bend radius management:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design the route to respect the radius</strong> — pre-formed
                conduit elbows, basket bend pieces, gentle corners. Never specify a
                bend tighter than the cable&rsquo;s minimum.
              </li>
              <li>
                <strong>Add draw boxes at any tight corner</strong> — the box becomes a
                pull-end on each side of the corner, so the cable enters/exits in two
                straight pulls and the bend in the box itself is gentler.
              </li>
              <li>
                <strong>Use cable rollers at any tight bend during a long pull</strong> —
                the rollers reduce friction and keep the cable on the bend radius even
                under tension.
              </li>
              <li>
                <strong>Inspect the installed cable after pulling</strong> — visible kink,
                flat spot, or bulge in the sheath at any bend means the cable is damaged
                and should be replaced before energising.
              </li>
              <li>
                <strong>Insulation resistance test before terminating</strong> — confirms
                the cable survived the pull electrically. ≥1.0 MΩ at 500 V dc minimum.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.8.1 (Wiring system mechanical stress during installation)"
            clause="A wiring system shall be selected and erected to avoid during installation, use or maintenance, damage to the sheath or insulation of cables and their terminations. The use of any lubricants that can have a detrimental effect on the cable or wiring system are not permitted."
            meaning={
              <>
                Reg 522.8.1 is the regulation that sits behind every aspect of cable
                pulling. The cable must be selected and installed to avoid damage during
                installation — pulling within the tension limit (avoids stretching the
                conductor), respecting the bend radius (avoids kinking the sheath), using
                a pulling grip or eye (avoids damaging the conductor at the rope
                attachment), and using compatible lubricant (the explicit prohibition on
                damaging lubricants like WD-40 on PVC conduit). A pulled cable that has
                been damaged during the pull is a 522.8.1 fail.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 522.8.1 (verbatim)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.8.3 (Bend radius)"
            clause="The radius of every bend in a wiring system shall be such that conductors or cables do not suffer damage and terminations are not stressed."
            meaning={
              <>
                Reg 522.8.3 is the bend-radius regulation. "Conductors or cables do not
                suffer damage" — the bend radius respects the manufacturer minimum.
                "Terminations are not stressed" — the bend at the termination is gentle
                enough not to load the connection. The 6× / 8× / 12× OD figures from
                cable manufacturer data exist to satisfy this regulation. Tighter than
                minimum at pull time damages the cable. Tighter than minimum after
                installation stresses the conductor in service.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 52, Regulation 522.8.3 (verbatim)."
          />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Long-pull tactics</ContentEyebrow>

          <ConceptBlock
            title="Intermediate draw boxes — splitting the pull into manageable segments"
            plainEnglish="A pull of more than ~30 m, or with more than 2-3 changes of direction, becomes too much for a single operation — the cumulative friction exceeds the pulling tension limit, and the cable jams. The fix is intermediate draw boxes — accessible junction boxes at intervals along the route. Each draw box is a pull-end and a pull-start, splitting the long route into manageable segments."
          >
            <p>
              Draw box positioning:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Every ~30 m on a long straight run.</li>
              <li>At any change-of-direction beyond two 90° bends in series.</li>
              <li>At every floor penetration on a multi-storey service riser.</li>
              <li>At every change of containment type (conduit to trunking transition).</li>
              <li>At every junction with a branch circuit going off the main run.</li>
              <li>Anywhere maintenance access will be needed in future for cable additions.</li>
            </ul>
            <p>
              Plan draw box positions at the design stage. Adding a draw box mid-install
              means breaking into the conduit, fitting a new junction box, re-routing
              the cable in two segments — much harder than getting the position right
              at the start.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The pull team — feeding end, puller end, communication"
            plainEnglish="A long or heavy pull is a two-person operation. One person at the feeding end (where the cable comes off the drum, into the conduit / containment); one person at the puller end (where the rope pulls the cable through). Both communicate continuously — the feeder paces the cable into the conduit, the puller takes up the slack, neither rushes ahead of the other. Phone, radio, or shouting depending on the route — but constant contact."
          >
            <p>
              The pull team roles:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Feeder end</strong> — paces cable off the drum, applies lubricant
                at the conduit entry, watches for kinks, monitors cable damage as it
                feeds in.
              </li>
              <li>
                <strong>Puller end</strong> — takes up rope slack, applies pulling force,
                monitors tension, watches for cable arriving (don&rsquo;t over-pull the cable
                out of the conduit).
              </li>
              <li>
                <strong>Intermediate watcher</strong> — for very long pulls, a third
                person at a critical bend or draw box to monitor cable behaviour and
                signal stop / continue.
              </li>
              <li>
                <strong>Communication</strong> — radio / phone / pre-arranged signals.
                "Stop", "continue", "slack", "snag" — common terms. Hand signals only
                work for line-of-sight pulls.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cable dressing — after the pull</ContentEyebrow>

          <ConceptBlock
            title="Tray, basket, ladder — parallel, segregated, secured"
            plainEnglish="Once cables are on the tray / basket / ladder, dressing them tidily is a craft skill that pays back across years. Parallel laying along the run direction. Segregation by service type (mains in one zone, data in another, fire alarm in a third). Spacing for thermal dissipation per OSG grouping factors. Secured with metal cable ties at intervals. Crossings minimised."
          >
            <p>
              The dressing principles:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Parallel layout</strong> — cables run along the length of the
                tray/basket, not zig-zagging across.
              </li>
              <li>
                <strong>Segregation by service</strong> — mains cables together, data
                cables together, fire alarm cables together. Use a tray divider strip
                for compartmented separation in commercial work; respect BS 6701 (data)
                and BS 5839 (fire alarm) separation requirements.
              </li>
              <li>
                <strong>Thermal spacing</strong> — apply OSG grouping factor Cg by
                spacing cables one-diameter apart where the cable schedule depends on
                a Cg less than 1.0. Bundling tightly increases Cg and reduces every
                cable&rsquo;s rated current.
              </li>
              <li>
                <strong>Securing</strong> — metal cable ties (per A4:2026 Reg 521.10.202)
                at ~600 mm horizontal, ~400 mm vertical. Tighten enough to hold but not
                deform the sheath.
              </li>
              <li>
                <strong>Bend radius at the tray edge</strong> — where cable drops off the
                tray to a luminaire or accessory below, respect the cable&rsquo;s minimum
                bend radius at the drop.
              </li>
              <li>
                <strong>Labelling</strong> — every cable labelled at every change of
                direction, every junction box, every termination — circuit name and CU
                way number minimum. Heat-shrink printable labels work better than tape
                in service.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Leave a draw rope for the next person"
            plainEnglish="After completing the pull, leave a polyester draw rope in the conduit / trunking for the next person who needs to add a cable. Costs 50 p of rope; saves the next electrician 30 minutes of re-rodding. Professional courtesy that compounds across the building&rsquo;s lifetime — the third or fourth cable addition years later still benefits from the rope you left in on day one."
          >
            <p>
              The standard practice — feed a fresh ~6 mm polyester draw rope through
              the conduit alongside the new cable as you pull. Leave both ends
              accessible (in junction boxes, behind blanking plates, or coiled in the
              accessory enclosure). Some installers tape a small cardboard tag to one
              end with the date and the company name — a simple courtesy that the
              next trade remembers.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Worked example — 6 × 2.5 mm² T&E through 10 m of 25 mm conduit, 3 × 90° bends</ContentEyebrow>

          <Scenario
            title="Pulling six 2.5 mm² T&E circuits through a single 25 mm PVC conduit run with multiple bends"
            situation={
              <>
                Industrial unit conversion to office. Single 25 mm PVC conduit run from
                the main DB to a 6-way distribution panel in the lab area. Run is 10 m
                with 3 × 90° bends (DB out, around a structural column, into the lab
                ceiling, drop down to the panel). You need to pull six separate 2.5 mm²
                T&E circuits — five sockets and one lighting. The conduit is in place,
                ends terminated, draw rope already pulled in.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 — fill check using OSG cable factors (NOT raw
                cross-sectional area).</strong> Conduit fill calculations don&rsquo;t use
                cross-sectional area directly — UK practice uses tabulated cable factors
                that account for cable shape, sheath, bend radius and pulling friction.
                T&E in particular is FLAT, not round, so π × r² gives the wrong answer.
                Look up the correct factors in OSG Appendix C / Table H1.
                {' '}
                <strong>Worked example:</strong> 2.5 mm² T&E factor = 18 (per OSG Table H1,
                Method C clipped direct — the cable factor for a single 2.5 mm² T&E in
                conduit). Six cables × 18 = 108. Conduit factor for 25 mm steel conduit
                straight run ≈ 333 (Table H1 conduit factor — varies with conduit length
                and number of bends). Fill ratio = 108 / 333 = 32 % — comfortably under
                the conventional 45 % maximum. The pull is achievable with this conduit;
                no upsize required for a straight short run.
                <br /><br />
                The 45 % maximum fill is the conventional design threshold (some specs
                allow up to 53 % for short straight runs; bends and length tighten the
                limit by reducing the conduit factor in Table H1). See OSG Appendix C /
                Table H1 for the lookup tables — both the cable factor (per cable type
                / CSA) and the conduit factor (per conduit OD / length / number of bends).
                For three 90° bends in a 10 m run, the conduit factor drops significantly,
                so re-check the fill against the de-rated conduit factor before the pull.
                <br /><br />
                <strong>Step 2 — re-check after derating for bends.</strong> Three 90°
                bends across a 10 m run reduce the effective conduit factor from the
                straight-run figure of 333 down to roughly 260-280 (per OSG Table H1
                conduit-factor adjustments for bends). Recompute: 108 / 270 ≈ 40 %.
                Still under the 45 % maximum, but only just. If the run had a fourth
                bend or if a longer run dropped the factor further, this would tip
                over the limit and the design would need revisiting.
                <br /><br />
                <strong>Step 3 — pulling tension calc.</strong> Maximum pulling tension
                per conductor ≈ 50 N/mm² (≈ 5 kg per mm² of conductor CSA) for copper
                using a stocking grip (Chinese-finger trap). For 6 × 2.5 mm² T&E,
                pulling on the 6 outer sheaths via a single grip distributes the force
                across all six cables. Conservative field rule for the bundle:
                6 cables × 2 conductors × 2.5 mm² = 30 mm² total copper, × 1.5-2 kg/mm²
                no-thinking-required field figure = ~45-60 kg estimated pulling load.
                Easily within manual pull range; well within the 50 N/mm² manufacturer
                limit. (See cable manufacturer data + IET Electrical Installation
                Design Guide for the formal figure; the 1.5-2 kg/mm² site rule is the
                common conservative default.)
                <br /><br />
                <strong>Step 4 — pre-pull prep.</strong> Lubricant ready (Polywater J in
                a tub at the conduit entry). Pulling grip sized for the 6-cable bundle
                (single grip wrapped around all 6 cables together, OR pull cables in
                pairs if the bundle is too large for one grip). Draw rope pulled in
                already. Two-person team — feeder at DB end, puller at panel end.
                Phone connection between them.
                <br /><br />
                <strong>Step 5 — start the pull.</strong> Lubricate the conduit entry.
                Feeder paces the cables into the conduit at a steady rate. Puller
                applies steady pulling force on the rope, watching for the cable
                arriving at the far end. Communication continuous — "good", "easy
                pull", "feels harder at the second bend", "almost through".
                <br /><br />
                <strong>Step 6 — at the bends.</strong> The 3 × 90° bends are the friction
                hotspots. If the pull becomes hard at a bend, STOP. Reverse slightly to
                free the cable. Add lubricant at the conduit entry (the lube travels with
                the cable along the conduit). Re-attempt. If still hard, consider adding
                a draw box at the worst bend — splits the pull into two manageable
                segments.
                <br /><br />
                <strong>Step 7 — emerge at the far end.</strong> Cables arrive at the
                panel end. Puller stops pulling. Feeder confirms cable count exiting the
                conduit matches what went in. Cut cables to the right length at each end,
                with ~250 mm tail for termination at both DB and panel.
                <br /><br />
                <strong>Step 8 — leave a draw rope.</strong> Feed a fresh polyester draw
                rope through the conduit alongside the just-installed cables — for the
                next person who needs to add a cable.
                <br /><br />
                <strong>Step 9 — IR test.</strong> Insulation resistance test at 500 V
                dc on each circuit before terminating. ≥1.0 MΩ minimum confirms the
                cable survived the pull electrically. Below that, the cable was damaged
                during the pull and must be replaced.
                <br /><br />
                <strong>Step 10 — terminate.</strong> Strip, prep, ferrule (where
                needed), torque to spec at both ends. Sub 5 covers the termination
                detail. Test certificate completed.
              </>
            }
            whyItMatters={
              <>
                The fill calculation in step 1 is the most-skipped check in install
                practice — apprentices assume that if six T&E cables fit in their hand
                they will fit through the conduit. They will not always. Done correctly
                using OSG Appendix C / Table H1 cable factors (NOT raw π × r²
                cross-section, which gives the wrong answer for flat T&E) the fill is
                a defendable design figure. Pulling tension limit per the manufacturer
                is ≈ 50 N/mm² (5 kg/mm²) for copper with a stocking grip — many sites
                use a more conservative 1.5-2 kg/mm² field rule. The full ten-step
                sequence is what good cable installation looks like; short-cutting any
                step is what bad installs look like.
              </>
            }
          />

          <CommonMistake
            title="Kinking SWA at a tight corner because no draw box was included in the design"
            whatHappens={
              <>
                You pull a 25 mm² SWA cable through a long route with a tight bend at
                a structural column — no draw box, no roller, no draw point. You force
                the cable round the bend during the pull because there is no other
                option. The SWA visibly kinks at the bend; you straighten it as best
                you can after pulling. Two years later the cable fails an IR test on a
                periodic inspection — the kinked sheath has cracked, the bedding has
                been compressed past its fatigue limit, and a moisture pathway has
                developed at the bend. Replacement requires breaking out the wall
                construction at the column.
              </>
            }
            doInstead={
              <>
                Design draw boxes into every long or complex route AT THE DESIGN STAGE,
                before the conduit is even installed. Any change-of-direction beyond
                two 90° bends in series, any straight pull longer than ~30 m, any
                tight corner that cannot accept the cable&rsquo;s minimum bend radius — all
                of these need a draw box. The cost of an extra junction box during
                first-fix is ~£20-30. The cost of replacing a damaged cable two years
                later is ~£2000-5000 in remedial work and customer disruption. The
                economics make themselves.
              </>
            }
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Pre-pull prep — survey the route, confirm fill, install draw rope, ready the lubricant, attach pulling grip / eye. Five minutes of prep saves five hours of jammed pull.',
              'Pull on the cable&rsquo;s outer sheath via a pulling grip OR on the cable&rsquo;s mechanical termination via a pulling eye. NEVER on the conductor directly.',
              'Pulling tension limit ~50 N/mm² (≈ 5 kg/mm²) for copper with stocking grip per published manufacturer / IET Electrical Installation Design Guide (~30 N/mm² if pulling on the conductor itself). Many sites use a conservative 1.5-2 kg/mm² no-thinking-required field rule. Calculate before pulling, use a tension meter on heavy pulls, listen for warning signs.',
              'Bend radius minimums apply BOTH during the pull AND in the installed run — 6× OD unarmoured, 8× SWA, 12× MICC. Tighter = damaged cable.',
              'Long pulls split into shorter segments at intermediate draw boxes — every ~30 m, at every complex bend, at every floor penetration.',
              'Use proper cable-pulling lubricant (Polywater, Yellow 77) — wax-free for PVC compatibility. Never WD-40, never engine oil, never washing-up liquid.',
              'Reg 522.8.1 forbids damaging lubricants and requires installation without damage to sheath / insulation / terminations. The pull is part of the regulation.',
              'After the pull — IR test at 500 V dc to confirm cable integrity. Dress cables on tray / basket parallel, segregated, spaced for thermal, secured with metal ties.',
              'Always leave a draw rope for the next person. 50 p of rope saves a day of re-rodding years later.',
            ]}
          />

          <Quiz title="Cable pulling and dressing — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section3/3-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.8 Wiring system selection deep dive
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section4/4-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.1 Identify cable sizes for main bonding
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
