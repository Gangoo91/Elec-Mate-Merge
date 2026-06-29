/**
 * Module 4 · Section 2 · Subsection 1 — GS38 and selecting test instruments
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.3
 *   AC 4.3 — "select the appropriate test instruments for fault diagnosis work"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 4.3 — selecting correct test
 * instruments in accordance with HSE GS 38.
 *
 * Frame: HSE GS38 4th ed sets the requirements for test instruments used on
 * LV systems — probe geometry, finger barriers, lead robustness, fused leads,
 * low impedance for proving dead. CAT II/III/IV ratings. Walks through the
 * practical L3 instrument-selection decisions with named brand realism.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'GS38 + selecting test instruments (2.1) | Level 3 Module 4.2.1 | Elec-Mate';
const DESCRIPTION =
  'HSE GS38 4th edition in detail — probe geometry, finger barriers, fused leads, low-impedance for proving dead, CAT II/III/IV ratings — applied to instrument selection for L3 fault diagnosis.';

const checks = [
  {
    id: 'mod4-s2-sub1-tip',
    question:
      "GS38 (4th ed) specifies the maximum exposed metal tip on a test probe. What's the figure and why?",
    options: [
      "2 mm maximum exposed metal tip, the 4th edition having halved the old 4 mm figure to remove the phase-to-phase short-circuit risk from a probe slip entirely.",
      "4 mm maximum exposed metal tip. Older long tips could bridge two adjacent terminals on a UK board; the 4 mm limit removes the phase-to-phase short-circuit risk, achieved on modern probes via insulated shrouds or screw-on tip caps.",
      "8 mm maximum exposed metal tip, matching the typical terminal pitch on a UK distribution board so the probe seats fully into the terminal without slipping out.",
      "No fixed figure — GS38 leaves the exposed tip length to the operative's judgement, provided a finger barrier is fitted and the probe is used carefully on the day.",
    ],
    correctIndex: 1,
    explanation:
      "The 4 mm tip limit was the headline GS38 4th ed change. Most reputable probes have a snap-on cap that converts a fixed 4 mm tip to a momentary 19 mm reach for recessed terminals (still GS38-compliant when used appropriately).",
  },
  {
    id: 'mod4-s2-sub1-cat',
    question:
      "What CAT (measurement category) rating is the minimum for test instruments used at a domestic consumer unit?",
    options: [
      "CAT III 600 V minimum at the DB, and CAT IV 600 V on the supply tails or cut-out — using CAT II at a DB risks the inputs exploding with operator injury.",
      "CAT II 600 V is adequate at a domestic consumer unit, because the transient overvoltage downstream of the cut-out is low enough for branch-circuit-rated input protection.",
      "CAT I is the minimum, because a consumer unit is protected by upstream fuses assumed to clamp any transient overvoltage before it reaches the instrument's inputs.",
      "Any CAT rating is acceptable provided the working voltage marked on the instrument is at least 300 V, because the voltage marking governs safety rather than the category.",
    ],
    correctIndex: 0,
    explanation:
      "CAT ratings come from IEC 61010 and they're not optional. Always meet OR exceed the CAT rating for the work location: CAT II for sockets, CAT III for DB and distribution, CAT IV for supply origin.",
  },
  {
    id: 'mod4-s2-sub1-volt-stick',
    question:
      "What's the GS38 distinction between a voltage detector (volt-stick) and a voltage indicator (two-pole tester)?",
    options: [
      "The volt-stick is the GS38-compliant proving instrument because non-contact sensing removes any risk of bridging terminals, while the two-pole tester is only a useful first-look indicator.",
      "Both are GS38-compliant for proving dead, the only difference being that the two-pole tester also displays the actual voltage on a screen as well as indicating presence.",
      "The detector capacitively senses AC presence but cannot confirm absence of voltage, so it is not GS38-compliant for proving dead; the low-impedance two-pole indicator is the GS38 proving tool.",
      "The volt-stick is for high-voltage work only and the two-pole tester for low-voltage work only, both being equally valid for proving dead at their respective rated voltage.",
    ],
    correctIndex: 2,
    explanation:
      "Confusing the two has killed people. Apprentice waves a Fluke 1AC-A1 II at a cable, no beep, assumes dead, takes a shock from a high-impedance source the stick missed. GS38 explicitly requires low-impedance two-pole for proving dead.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "List the seven instruments in an L3 apprentice's fault-diagnosis kit and what each is for.",
    options: [
      "(1) Two-pole tester. (2) Proving unit. (3) MFT. (4) Multimeter. (5) Battery drill. (6) Hammer. (7) Spirit level — the general site kit doubles as the fault-diagnosis kit, so no dedicated test instruments are needed beyond the MFT.",
      "GS38 two-pole tester (proving dead), proving unit (proves the tester), MFT (continuity, IR, EFLI, RCD, polarity), multimeter (measurement), clamp meter (load and earth-leakage current), socket tester (quick polarity check) and a VDE screwdriver set (IEC 60900 1000 V AC).",
      "(1) MFT only — the multifunction tester performs every test (continuity, IR, EFLI, RCD, voltage, current), so an MFT plus a set of leads is the complete fault-diagnosis kit and the other instruments are redundant.",
      "(1) Insulation tester. (2) Loop tester. (3) RCD tester. (4) Continuity tester. (5) PAT tester. (6) Earth electrode tester. (7) Phase rotation tester — seven separate single-function instruments, one for each BS 7671 test, with no two-pole tester or proving unit.",
    ],
    correctAnswer: 1,
    explanation:
      "The seven-instrument kit is the standard L3 loadout. Each tool has one job — no overlap. Combined cost ~£1,500–2,000 for new midmarket; built up over 18 months.",
  },
  {
    id: 2,
    question: "Why can't a multimeter replace a GS38 two-pole tester for proving dead?",
    options: [
      "A multimeter cannot measure AC voltage at all, so it can never indicate whether a circuit is live or dead in the first place, let alone prove it dead.",
      "A multimeter has no fuse in its leads, so it is more likely to be damaged when proving dead than a two-pole tester, and so it fails the GS38 fused-lead requirement.",
      "High input impedance (10 MΩ) reads phantom voltages as real where a two-pole loads them to zero, the probe geometry fails GS38, and a single digit can be misread where lamp + LED + audible cannot.",
      "A multimeter reads in RMS while a two-pole reads peak voltage, so the multimeter under-reads on a live circuit and may show a dangerous circuit as dead during the proving-dead step.",
    ],
    correctAnswer: 2,
    explanation:
      "Each instrument is optimised for its job. Multimeter input impedance is a feature for measurement (doesn't load the circuit) but a bug for proving dead. Two-pole low impedance is a feature for proving dead but unusable for measurement.",
  },
  {
    id: 3,
    question: "Why are HRC fuses used in test lead assemblies (typically 500 mA F or 1 A FF) rather than glass cartridges?",
    options: [
      "HRC fuses are cheaper than glass cartridges, so manufacturers use them purely to keep the cost of the lead set down, with no real safety difference between the two.",
      "HRC fuses are physically smaller than glass cartridges and fit more neatly into the probe handle, with no safety difference between the two types in a test-lead application.",
      "Glass cartridges blow more slowly than HRC fuses, so HRC is chosen only to give a faster nuisance-trip response during routine testing rather than for any breaking-capacity reason.",
      "HRC fuses safely interrupt very high fault currents, whereas a glass cartridge (~35 A breaking) can rupture violently on a high-PSCC circuit, spraying glass and hot metal; the sand-filled HRC element does not.",
    ],
    correctAnswer: 3,
    explanation:
      "Fuse breaking capacity matters. HRC fuses (Bussmann KTK, Eaton FNQ-R, Mersen) are sand-filled and rated to 100 kA breaking; glass cartridges are not safe in test lead applications. Always replace blown lead fuses with HRC.",
  },
  {
    id: 4,
    question: "What's the practical use of a clamp meter (Fluke 376FC, Megger DCM340) in fault diagnosis?",
    options: [
      "Load current without breaking the circuit, earth-leakage by clamping L+N together so the imbalance is the leakage, and inrush capture of motor or compressor start-up to diagnose trips on undersized breakers.",
      "Its only use is measuring earth fault loop impedance more accurately than an MFT, by clamping around the earth conductor at the consumer unit during a fault investigation.",
      "It measures insulation resistance non-invasively by clamping around a cable and injecting a 500 V test signal through the jaw without breaking into the circuit.",
      "It is used purely to prove dead before work, replacing the two-pole tester by clamping around a conductor and indicating the presence of voltage on the display.",
    ],
    correctAnswer: 0,
    explanation:
      "The clamp meter is the most under-used fault-diagnosis instrument in apprentice kits. Non-invasive measurement during normal operation is its superpower — the fault is happening WHILE you measure.",
  },
  {
    id: 5,
    question: "Socket testers (Martindale CP501, Kewtech LOOPCHECK107) are widely used. What can they NOT tell you?",
    options: [
      "Nothing useful — a socket tester only lights up to confirm a socket is energised, giving no information about polarity, missing earth or connection state at all.",
      "It indicates the connection state of a 13 A socket (correct, reversed polarity, missing earth or neutral) but cannot give accurate EFLI / IR / continuity values or detect shared neutrals and intermittent faults.",
      "It cannot detect a missing earth or reversed polarity, but it does give an accurate measured EFLI value good enough to record directly on the installation certificate.",
      "It reads the insulation resistance and continuity values of the circuit accurately, but cannot indicate polarity, a missing earth or a missing neutral on the socket.",
    ],
    correctAnswer: 1,
    explanation:
      "Plug in, three lights, headline fault category, move on. They're not certification instruments. Use them for speed (30 sockets in 5 minutes) then characterise faults with the MFT.",
  },
  {
    id: 6,
    question: "What's the right way to handle a test instrument that's been dropped or suspected damaged?",
    options: [
      "Keep using it as long as it still powers on and gives a reading, because a drop only matters if the case is visibly cracked or the screen is damaged in the fall.",
      "Send it straight to landfill and order a replacement, because a dropped instrument can never be economically repaired or recalibrated back to a trustworthy standard.",
      "Stop using it, tag it 'DO NOT USE', and at base function-check it on a known live source against a reference instrument; send it for repair or re-calibration if anything fails.",
      "Carry on using it but reduce the insulation-resistance test voltage to 250 V, on the basis that a drop only affects the high-voltage test range and not the other functions.",
    ],
    correctAnswer: 2,
    explanation:
      "A dropped instrument is presumed unsafe. The danger isn't visible damage — it's hairline cracks in the input PCB that let fault current bypass protection on the next live test. Behaves normally for a while, then fails violently.",
  },
  {
    id: 7,
    question: "Calibration intervals for the standard L3 fault-diagnosis kit?",
    options: [
      "Every instrument in the kit must be calibrated weekly, regardless of type, to satisfy NICEIC and NAPIT audit requirements and keep the readings legally admissible.",
      "Calibration is only needed once, when the instrument is first bought; after that a function check at the start of each shift is sufficient for the whole working life.",
      "Only the MFT needs calibration; two-pole testers, multimeters and clamp meters are treated as non-drifting and exempt from any scheduled calibration interval at all.",
      "MFT annually (UKAS-traceable), two-pole tester every 24 months, multimeter and clamp annually, proving unit annually with the two-pole — tracked in a calibration register.",
    ],
    correctAnswer: 3,
    explanation:
      "Calibration is the bookkeeping that protects the certificate. An out-of-calibration instrument's readings are inadmissible — sign-offs based on them can be challenged in court. Register entry: instrument ID, date, lab, certificate number, next-due date.",
  },
  {
    id: 8,
    question: "What does a CAT IV 600 V instrument cost on average and which ones are typical L3 apprentice purchases?",
    options: [
      "Two-pole testers ~£60–100, multimeters ~£200–400, MFTs ~£500–900 — apprentices typically buy a VI-13800 plus a Fluke 117, with the CAT IV kit firm-issued.",
      "CAT IV 600 V instruments are budget items at about £5–15 each, so apprentices typically buy the whole seven-instrument kit rated to CAT IV for under £100 in total.",
      "CAT IV 600 V instruments cost about £2,000–5,000 each and are firm-issued only, so apprentices never buy any personally and rely entirely on borrowed CAT II kit.",
      "CAT IV rating makes no difference to price, so a CAT II and a CAT IV from the same maker cost the same and apprentices simply choose on colour, feel and battery life.",
    ],
    correctAnswer: 0,
    explanation:
      "CAT IV adds cost for a reason — better input protection, beefier internal isolation, more conservative voltage clamps. Worth paying for if you'll be on supply-side work; the Fluke 117 is fine if you'll never go above the DB.",
  },
];

const faqs = [
  {
    question: "What's the minimum kit I need to start L3 fault-diagnosis competence work?",
    answer:
      "Five at minimum: GS38 two-pole tester (Martindale VI-13800, ~£60), proving unit (Martindale GVD2, ~£40), MFT (Megger MFT1741+ or Kewtech KT64+ — typically firm-issued), multimeter (Fluke 117, ~£200), clamp meter (Fluke 376FC, ~£400 — typically firm-issued). Plus VDE screwdrivers and lock-off kit. By month six the full seven-instrument kit through firm-issue and personal purchase.",
  },
  {
    question: "Can I use my Fluke 117 multimeter on the supply tails between cut-out and meter?",
    answer:
      "No. The Fluke 117 is rated CAT III 600 V — adequate for distribution circuits but not for the supply origin (CAT IV territory). The right instrument is a CAT IV 600 V — Fluke 87V or a dedicated supply-side instrument. CAT III on a CAT IV location risks instrument failure with operator injury.",
  },
  {
    question: "Why is GS38 so specific about 'low impedance' for proving-dead instruments?",
    answer:
      "Because high-impedance instruments (multimeters at 10 MΩ) draw negligible current and can't distinguish a real source from an induced ghost voltage. Two-pole testers at 1–5 kΩ load down ghosts to zero while real sources hold. The lamp + LED + audible indication makes the difference unambiguous. GS38's preference for low-impedance is a 30-year lesson written in operator-fatality reports.",
  },
  {
    question: "How often should I get my instruments calibrated?",
    answer:
      "MFT — annually. Two-pole tester — every 24 months. Multimeter — annually. Clamp meter — annually. Proving unit — annually with the two-pole. Track in a calibration register and replace stickers on receipt back from the lab. Most NICEIC / NAPIT registration audits check the register.",
  },
  {
    question: "Are cheap MFTs (Lutron, sub-£250) ever good enough for L3 apprentice work?",
    answer:
      "No. Cheap MFTs typically lack UKAS-traceable calibration, accurate fast RCD trip-time measurement, reliable continuity nulling, robust enclosure, manufacturer support for re-calibration. The midmarket starting point is Kewtech KT64+ (~£450) — UKAS-calibrated, supports all the fault-diagnosis tests. Premium tier is Megger MFT1741+ (~£700). Don't buy below the Kewtech.",
  },
  {
    question: "What's the difference between IEC 60900 and EN 60900 markings on insulated tools?",
    answer:
      "IEC is international; EN is the European harmonised version. Functionally identical — both require 1000 V AC working voltage, 10 kV AC test voltage on every tool, double-triangle marking. Reputable manufacturers (Wera, Wiha, CK Dextra, Klein, Knipex VDE) mark to both. Cheap 'insulated' tools without the markings should be treated as suspect.",
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
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 1"
            title="GS38 + selecting test instruments"
            description="HSE GS38 4th edition in detail — probe geometry, finger barriers, fused leads, low impedance for proving dead, CAT II/III/IV ratings — applied to choosing the right instrument for each fault-diagnosis task with named brand realism."
            tone="emerald"
          />

          <TLDR
            points={[
              "GS38 (4th ed) sets four headline rules: 4 mm max exposed tip, finger barriers, robust insulated leads, low-impedance for proving dead. Plus fused leads for high-PSCC work.",
              "CAT II for sockets, CAT III for DB / distribution, CAT IV for cut-out / supply origin. Always match or exceed the CAT for the work location.",
              "Seven-instrument L3 kit: two-pole tester, proving unit, MFT, multimeter, clamp, socket tester, VDE screwdrivers. Each has a specific job; no overlap means you can drop one.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the GS38 4th edition probe and lead requirements — 4 mm tip, finger barriers, fused leads where needed, robust insulation.",
              "Distinguish CAT II / CAT III / CAT IV measurement-category ratings and select the right CAT for the work location.",
              "Distinguish a voltage detector (volt-stick, non-contact) from a voltage indicator (two-pole, GS38-compliant for proving dead).",
              "Specify the seven-instrument L3 apprentice fault-diagnosis kit and the technical reason no instrument is interchangeable.",
              "Identify HRC fused test leads and explain why they're required on high-PSCC measurement.",
              "Apply tag-and-isolate discipline to dropped or suspect instruments to protect the next user.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>GS38 — the rulebook</ContentEyebrow>

          <ConceptBlock
            title="HSE GS38 (4th ed) — what every fault-diagnosis instrument must satisfy"
            plainEnglish="GS38 is the HSE's guidance document on electrical test equipment for use on LV systems. Four pages, every line matters. The 4th edition (2015) tightened the requirements after a series of operator injuries from inadequate probes and fragile leads."
            onSite="Reputable test instruments now ship with GS38-compliant probes by default. Compliance is assessed against the probe + lead set together — buying non-compliant probes to fit a compliant tester voids it. Stick with manufacturer-supplied or specifically GS38-marked aftermarket leads."
          >
            <p>The GS38 4th edition rules:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Maximum exposed metal tip — 4 mm.</strong> Older 19 mm tips can bridge across two adjacent terminals.</li>
              <li><strong>Finger barriers</strong> — moulded shroud at the back of the probe shaft that stops your finger sliding forward onto the tip.</li>
              <li><strong>Robust insulated leads</strong> — silicone or PVC sheathing rated for system voltage; no exposed conductor.</li>
              <li><strong>Fused leads</strong> where prospective fault current is high — typical inline 500 mA F or 1 A FF HRC fuse.</li>
              <li><strong>Low-impedance instrument</strong> for proving dead — typically 1–5 kΩ; loads down induced/ghost voltages so they don't masquerade as real sources.</li>
              <li><strong>Lamp + LED + audible</strong> on voltage indicators — single-mode is unreliable; multi-mode confirms the result.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="HSE Guidance Note GS38 (4th ed) — Probe design"
            clause={<>"The instrument\'s probes should incorporate a finger barrier and an insulated tip with a maximum length of metal exposed of 4 mm or, where this is not practicable, an insulating shroud reducing the exposed metal tip to 4 mm or less."</>}
            meaning={<>The 4 mm rule is the headline. Manufacturers provide tip-caps that allow occasional reach-in to recessed terminals (some MK / Wylex DBs have deep recesses) without permanently exposing more metal.</>}
            cite="Source: HSE GS38 (4th ed) — Electrical test equipment for use by electricians."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>CAT ratings — match instrument to location</ContentEyebrow>

          <ConceptBlock
            title="CAT II / III / IV — what they mean and where they apply"
            plainEnglish="The CAT (measurement-category) rating tells you how much transient overvoltage the instrument\'s input protection can survive. The further upstream the work, the higher the prospective transient — and the higher the CAT rating you need."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CAT II</strong> — appliances, plug-and-cord-connected. Multimeter for socket measurement. NOT adequate for DB work.</li>
              <li><strong>CAT III</strong> — fixed installation, distribution circuits. DB measurements, branch circuits, motor controllers. Most fault diagnosis lives here.</li>
              <li><strong>CAT IV</strong> — origin of installation. Cut-out, supply tails, overhead lines.</li>
            </ul>
            <p>Common L3-relevant ratings:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fluke 117 — CAT III 600 V (DB work, NOT supply-side).</li>
              <li>Fluke 87V — CAT III 1000 V / CAT IV 600 V.</li>
              <li>Martindale VI-13800 — CAT IV 600 V (suitable for cut-out work).</li>
              <li>Megger MFT1741+ — CAT IV 300 V / CAT III 600 V.</li>
              <li>Kewtech KT200 — CAT IV 600 V.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Volt-stick vs two-pole — first-look vs proving</ContentEyebrow>

          <ConceptBlock
            title="The non-contact tester is a first-look tool, not a proving instrument"
            onSite="Apprentices reach for the volt-stick (Fluke 1AC-A1 II, Knipex VoltagePen) because it\'s quick. It IS quick, and it has a legitimate role — first-pass cable identification. But it is NEVER the instrument that confirms a circuit is dead. The two-pole tester is."
          >
            <p>The technical difference:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Volt-stick (voltage detector)</strong> — non-contact, capacitive sensing of AC voltage in the cable\'s electric field. Convenient. Inconsistent — depends on cable shielding, sensor angle, battery, sensitivity setting. Misses high-impedance sources entirely.</li>
              <li><strong>Two-pole tester (voltage indicator)</strong> — direct contact, low-impedance, dedicated indicator with lamp + LED + audible. GS38-compliant for proving dead. Loads down induced voltages; reads real sources reliably.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.3"
            clause={
              <>
                "Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no less a degree of performance and safety."
              </>
            }
            meaning={
              <>
                BS 7671 nails instrument selection to a specific standard &mdash; BS EN 61557 &mdash; because a tester that doesn&apos;t meet it can&apos;t be relied on for safety-critical measurements. When you compare a Fluke 1664 FC to a budget eBay clone, BS EN 61557 is the line that separates them. Anything you use on a fault-diagnosis job has to either carry that mark or demonstrate equivalence.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.3, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>The seven-instrument apprentice kit</ContentEyebrow>

          <ConceptBlock
            title="What sits in an L3 fault-diagnosis toolbox"
            onSite="Each instrument has one job it does better than any other. There\'s no overlap that means you can drop one. Build the kit over 18 months."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. GS38 two-pole tester</strong> — Martindale VI-13800 (~£60), Fluke T130 (~£100), Kewtech KT1780 (~£70).</li>
              <li><strong>2. Proving unit</strong> — Martindale GVD2 (~£40), Drummond Lo-Z (~£35).</li>
              <li><strong>3. MFT</strong> — Megger MFT1741+ (~£700), Kewtech KT64+ (~£450), Fluke 1664FC (~£900).</li>
              <li><strong>4. Multimeter</strong> — Fluke 117 (~£200), Fluke 87V (~£400) for CAT IV inclusion.</li>
              <li><strong>5. Clamp meter</strong> — Fluke 376FC (~£400), Megger DCM340 (~£200).</li>
              <li><strong>6. Socket tester</strong> — Martindale CP501 (~£25), Kewtech LOOPCHECK107 (~£150 with EFLI).</li>
              <li><strong>7. VDE screwdriver set</strong> — Wera Kraftform Plus 7-piece (~£60), Wiha SoftFinish 7-piece (~£70), CK Dextro 8-piece (~£50).</li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.multimeter.url}
            title={videos.multimeter.title}
            channel={videos.multimeter.channel}
            duration={videos.multimeter.duration}
            topic={videos.multimeter.topic}
          />

          <RegsCallout
            source="BS EN 61010-1 — Measurement category definitions"
            clause={<>"Equipment shall be suitable for the measurement category of the circuit at the point of measurement, taking account of the prospective transient overvoltage at that point."</>}
            meaning={<>The CAT rating isn\'t a marketing claim — it\'s a safety-rated specification under BS EN 61010-1. CAT II in a CAT III location is a real injury risk. Match or exceed.</>}
            cite="Source: BS EN 61010-1 — Safety requirements for electrical equipment for measurement, control, and laboratory use."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Using a CAT III multimeter at the cut-out"
            whatHappens={<>Apprentice probes incoming phase to neutral at the cut-out tails with a Fluke 117 (CAT III 600 V). The 117\'s input protection isn\'t rated for the CAT IV transient overvoltage at the supply origin. Inputs explode, molten metal sprays from the case, eye injury. The 117 was the wrong instrument for that location.</>}
            doInstead={<>Match CAT to location. CAT II for sockets, CAT III for DB, CAT IV for cut-out. Fluke 87V (CAT IV 600 V) and Martindale VI-13800 (CAT IV 600 V) cover most L3 work.</>}
          />

          <CommonMistake
            title="Trusting a non-contact volt-stick to confirm dead"
            whatHappens={<>Apprentice waves a Fluke 1AC-A1 II over an isolated cable. No beep. They grab the cable bare-handed. The cable has a borrowed neutral and is at 230 V on the neutral. The volt-stick missed it because the apprentice waved from the wrong side and the cable\'s sheath shielded the capacitive coupling. 230 V shock, fall from ladder, broken arm.</>}
            doInstead={<>Volt-stick is first-look only — \'might be voltage here\'. Proving dead requires a low-impedance two-pole tester (Martindale, Fluke T130) proved on a known live source before AND after, applied directly to the conductor between L–N, L–E and N–E.</>}
          />

          <Scenario
            title="Building the kit on a starter wage"
            situation={<>You\'re three months into your L3 apprenticeship. The firm has issued you an MFT (Kewtech KT64+) and a multimeter (Fluke 117). You need to supply your own two-pole tester, proving unit, VDE screwdrivers and basic PPE. Take-home pay is £1,400/month.</>}
            whatToDo={<>Month 1 (~£200): Martindale VI-13800 (£60), Martindale GVD2 (£40), Wera Kraftform Plus 7-piece VDE set (£60), Brady safety lockout padlock + tag (£30). Month 2–3: socket tester (£25), Class 0 insulated gloves (£40), arc-rated long-sleeve top (£50), high-vis (£10). Month 6: upgrade VDE drivers (Wera Kraftform Plus 15-piece £130), Fluke T6-1000 contactless meter (£200). Year 2: personal MFT if firm doesn\'t issue (~£500 second-hand Kewtech KT64+).</>}
            whyItMatters={<>The right tools at the right time keep you safe AND productive. Skipping the GS38 two-pole to save £60 means you can\'t legally prove dead, can\'t safely do the work, are a liability on site. Tools are an investment in employability — apprentices with their own kit get sent solo (under remote supervision) sooner.</>}
          />

          <SectionRule />

          <ContentEyebrow>CAT ratings — input protection of measurement instruments</ContentEyebrow>

          <ConceptBlock
            title="CAT II / III / IV — choosing an instrument that survives a transient"
            plainEnglish="The CAT (Measurement Category) rating defines the transient overvoltage an instrument can survive. Plug-in appliances are CAT II; fixed installation circuits are CAT III; cut-out / supply origin is CAT IV. A CAT III instrument used at a CAT IV location can be destroyed by a single switching transient — usually with the test leads exploding in the operative's hand."
            onSite="L3 fault investigation routinely lives at CAT III (DBs, distribution boards, fixed wiring) and sometimes CAT IV (cut-out work). Standard kit: Fluke 117 (CAT III 600 V), Fluke 87V (CAT III 1000 V / CAT IV 600 V), Megger MFT1741+ (CAT IV 600 V), Martindale VI-13800 (CAT IV 600 V), Kewtech KT64+ (CAT IV 600 V). Cheap CAT II multimeters from a generic toolbox have no place on a fault-diagnosis job."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CAT II 600 V</strong> — plug-in appliances, single-phase loads downstream of a socket. Most consumer multimeters.</li>
              <li><strong>CAT III 600 V</strong> — fixed installation, sub-DBs, single-phase distribution. Most professional multimeters.</li>
              <li><strong>CAT III 1000 V / CAT IV 600 V</strong> — three-phase fixed installation, primary supply circuits. Professional MFTs and clamp meters.</li>
              <li><strong>CAT IV 1000 V</strong> — cut-out, supply origin, overhead lines. Specialist test equipment.</li>
              <li><strong>Lead matching</strong> — the test leads have their own CAT rating. A CAT IV meter with CAT II leads = the leads' rating limits the system. Match leads to instrument rating.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Two-pole tester families</ContentEyebrow>

          <ConceptBlock
            title="Martindale, Fluke, Kewtech — the three two-pole testers you'll meet"
            plainEnglish="The two-pole tester (sometimes called a 'voltage indicator' or 'Drummond tester') is the GS38-compliant instrument for proving dead. Three brands dominate the UK market and each has subtly different features."
            onSite="All three brands give lamp + LED + audible indication. All three are CAT IV 600 V minimum. Differences: Martindale VI-13800 has the brightest lamps; Fluke T130 has a backlit LCD that shows the actual voltage; Kewtech KT1780 has a built-in continuity test mode."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Martindale VI-13800</strong> — UK industry standard. Lamp + LED + buzzer. Pairs with Martindale GVD2 proving unit.</li>
              <li><strong>Fluke T130</strong> — backlit LCD shows actual voltage. Built-in continuity test. Pricier (~£180) but adds measurement capability.</li>
              <li><strong>Kewtech KT1780</strong> — built-in continuity, single-pole AC indication, GS38 compliant. Mid-price (~£110).</li>
              <li><strong>Drummond MD-906</strong> — older industry standard, still in widespread use. Lamps only.</li>
              <li><strong>Proving units</strong> — Martindale GVD2, Megger MTB7671, Kewtech KEWPROVE3.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>MFT selection — Megger / Fluke / Kewtech / Metrel</ContentEyebrow>

          <ConceptBlock
            title="The Multifunction Tester — your primary fault-diagnosis instrument"
            plainEnglish="The MFT does continuity, insulation resistance, loop impedance, RCD trip-time, and (on newer models) RCD ramp test, earth electrode resistance, and three-phase rotation. One instrument, one button rotation, one set of leads."
            onSite="Megger MFT1741+ is the UK gold standard. Fluke 1664FC adds Bluetooth data logging. Kewtech KT64+ is the budget-conscious choice with strong feature set. Metrel MI3155 is the European entrant on commercial work. All four are CAT IV 600 V."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Megger MFT1741+</strong> — full BS 7671 643 test suite, AutoRCD, Hi-Z (no-trip) loop mode, EV charger test mode, downloadable to PowerSuite Pro.</li>
              <li><strong>Fluke 1664FC</strong> — Insulation PreTest, Auto-Test sequence, FlukeView Forms wireless transfer.</li>
              <li><strong>Kewtech KT64+</strong> — full BS 7671 643 suite, integrated null-button for accurate Zs, Bluetooth to KT64Print app.</li>
              <li><strong>Metrel MI3155</strong> — popular on commercial 3-phase, includes 3-phase loop impedance and rotation test.</li>
              <li><strong>Special-feature MFTs</strong> — Megger MFT1845 (high-current loop for PSCC), Megger DET14C (intrinsically safe for ATEX), Fluke 1654-DLT (data-logging variant).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Lead and probe management</ContentEyebrow>

          <ConceptBlock
            title="Test leads kill more electricians than the instruments they connect to"
            plainEnglish="The test lead is the weakest link in the GS38 chain. A nicked insulation, an exposed conductor where the probe meets the cable, a frayed strain-relief at the plug — any of these can put live voltage on the operative's hand. Daily inspection is non-negotiable."
            onSite="Every two-pole tester and MFT comes with manufacturer-supplied leads that meet GS38. Replacement leads MUST also meet GS38. Standard inspection: bend the lead 360 degrees along its length, look for cracks; flex the strain reliefs; visually check the probe insulation."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Daily inspection</strong> — pre-job: bend, flex, visual on every lead. Post-job: same.</li>
              <li><strong>Probe condition</strong> — finger guard intact, 4 mm exposed tip, no chips in moulded insulation.</li>
              <li><strong>Crocodile clip leads</strong> — for hands-free testing inside a DB. Must have Kelvin-clip design that grips firmly without bridging adjacent terminals.</li>
              <li><strong>Wander leads</strong> — long single-conductor leads for R1+R2 testing across long radials. Megger WL10 (10 m), WL20 (20 m).</li>
              <li><strong>Storage</strong> — leads coiled in figure-8, stored in instrument case. Tight loops crack the insulation.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "GS38 4th edition: 4 mm max exposed tip, finger barriers, robust insulated leads, low-impedance for proving dead, fused leads for high-PSCC work, lamp + LED + audible indication.",
              "CAT II for sockets, CAT III for DBs and branch circuits, CAT IV for cut-out and supply-side. Match or exceed the CAT for the location.",
              "Voltage detector (volt-stick) is first-look only. Voltage indicator (two-pole tester) is the GS38-compliant proving-dead instrument.",
              "Seven-instrument L3 kit: two-pole tester, proving unit, MFT, multimeter, clamp meter, socket tester, VDE screwdrivers. Each has a specific job; no overlap.",
              "Calibration intervals: MFT and multimeter annually, two-pole tester every 24 months. Track in calibration register; replace stickers on receipt.",
              "Fused HRC test leads (500 mA F or 1 A FF) limit energy in a probe-slip incident. Required for high-PSCC; recommended for all live work.",
              "Dropped instruments are presumed unsafe — tag and isolate, function-check on a known live source before re-use.",
              "VDE-rated insulated tools (IEC 60900, 1000 V AC, double-triangle marking) are the secondary safety layer when isolation is the primary.",
            ]}
          />

          <Quiz title="GS38 + instrument selection — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section1-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">1.4 Safe working procedures</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">2.2 Confirming fit-for-purpose</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
