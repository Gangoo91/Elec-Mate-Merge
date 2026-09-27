/**
 * Ported from the English course, combining:
 *   level3/module4/section2/Sub1.tsx
 *   level2/module1/section4/Sub3.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

const checks = [
  {
    id: 'mod4-s2-sub1-tip',
    question:
      "GS38 (4th ed) specifies the maximum exposed metal tip on a test probe. What's the figure and why?",
    options: [
      '2 mm maximum exposed metal tip, the 4th edition having halved the old 4 mm figure to remove the phase-to-phase short-circuit risk from a probe slip entirely.',
      '4 mm maximum exposed metal tip. Older long tips could bridge two adjacent terminals on a UK board; the 4 mm limit removes the phase-to-phase short-circuit risk, achieved on modern probes via insulated shrouds or screw-on tip caps.',
      '8 mm maximum exposed metal tip, matching the typical terminal pitch on a UK distribution board so the probe seats fully into the terminal without slipping out.',
      "No fixed figure — GS38 leaves the exposed tip length to the operative's judgement, provided a finger barrier is fitted and the probe is used carefully on the day.",
    ],
    correctIndex: 1,
    explanation:
      'The 4 mm tip limit was the headline GS38 4th ed change. Most reputable probes have a snap-on cap that converts a fixed 4 mm tip to a momentary 19 mm reach for recessed terminals (still GS38-compliant when used appropriately).',
  },
  {
    id: 'mod4-s2-sub1-cat',
    question:
      'What CAT (measurement category) rating is the minimum for test instruments used at a domestic consumer unit?',
    options: [
      'CAT III 600 V minimum at the DB, and CAT IV 600 V on the supply tails or cut-out — using CAT II at a DB risks the inputs exploding with operator injury.',
      'CAT II 600 V is adequate at a domestic consumer unit, because the transient overvoltage downstream of the cut-out is low enough for branch-circuit-rated input protection.',
      "CAT I is the minimum, because a consumer unit is protected by upstream fuses assumed to clamp any transient overvoltage before it reaches the instrument's inputs.",
      'Any CAT rating is acceptable provided the working voltage marked on the instrument is at least 300 V, because the voltage marking governs safety rather than the category.',
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
      'The volt-stick is the GS38-compliant proving instrument because non-contact sensing removes any risk of bridging terminals, while the two-pole tester is only a useful first-look indicator.',
      'Both are GS38-compliant for proving dead, the only difference being that the two-pole tester also displays the actual voltage on a screen as well as indicating presence.',
      'The detector capacitively senses AC presence but cannot confirm absence of voltage, so it is not GS38-compliant for proving dead; the low-impedance two-pole indicator is the GS38 proving tool.',
      'The volt-stick is for high-voltage work only and the two-pole tester for low-voltage work only, both being equally valid for proving dead at their respective rated voltage.',
    ],
    correctIndex: 2,
    explanation:
      'Confusing the two has killed people. Apprentice waves a Fluke 1AC-A1 II at a cable, no beep, assumes dead, takes a shock from a high-impedance source the stick missed. GS38 explicitly requires low-impedance two-pole for proving dead.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "List the seven instruments in an apprentice's fault-diagnosis kit and what each is for.",
    options: [
      '(1) Two-pole tester. (2) Proving unit. (3) MFT. (4) Multimeter. (5) Battery drill. (6) Hammer. (7) Spirit level — the general site kit doubles as the fault-diagnosis kit, so no dedicated test instruments are needed beyond the MFT.',
      'GS38 two-pole tester (proving dead), proving unit (proves the tester), MFT (continuity, IR, EFLI, RCD, polarity), multimeter (measurement), clamp meter (load and earth-leakage current), socket tester (quick polarity check) and a VDE screwdriver set (IEC 60900 1000 V AC).',
      '(1) MFT only — the multifunction tester performs every test (continuity, IR, EFLI, RCD, voltage, current), so an MFT plus a set of leads is the complete fault-diagnosis kit and the other instruments are redundant.',
      '(1) Insulation tester. (2) Loop tester. (3) RCD tester. (4) Continuity tester. (5) PAT tester. (6) Earth electrode tester. (7) Phase rotation tester — seven separate single-function instruments, one for each BS 7671 test, with no two-pole tester or proving unit.',
    ],
    correctAnswer: 1,
    explanation:
      'The seven-instrument kit is the standard loadout. Each tool has one job — no overlap. Combined cost ~£1,500–2,000 for new midmarket; built up over 18 months.',
  },
  {
    id: 2,
    question: "Why can't a multimeter replace a GS38 two-pole tester for proving dead?",
    options: [
      'A multimeter cannot measure AC voltage at all, so it can never indicate whether a circuit is live or dead in the first place, let alone prove it dead.',
      'A multimeter has no fuse in its leads, so it is more likely to be damaged when proving dead than a two-pole tester, and so it fails the GS38 fused-lead requirement.',
      'High input impedance (10 MΩ) reads phantom voltages as real where a two-pole loads them to zero, the probe geometry fails GS38, and a single digit can be misread where lamp + LED + audible cannot.',
      'A multimeter reads in RMS while a two-pole reads peak voltage, so the multimeter under-reads on a live circuit and may show a dangerous circuit as dead during the proving-dead step.',
    ],
    correctAnswer: 2,
    explanation:
      "Each instrument is optimised for its job. Multimeter input impedance is a feature for measurement (doesn't load the circuit) but a bug for proving dead. Two-pole low impedance is a feature for proving dead but unusable for measurement.",
  },
  {
    id: 3,
    question:
      'Why are HRC fuses used in test lead assemblies (typically 500 mA F or 1 A FF) rather than glass cartridges?',
    options: [
      'HRC fuses are cheaper than glass cartridges, so manufacturers use them purely to keep the cost of the lead set down, with no real safety difference between the two.',
      'HRC fuses are physically smaller than glass cartridges and fit more neatly into the probe handle, with no safety difference between the two types in a test-lead application.',
      'Glass cartridges blow more slowly than HRC fuses, so HRC is chosen only to give a faster nuisance-trip response during routine testing rather than for any breaking-capacity reason.',
      'HRC fuses safely interrupt very high fault currents, whereas a glass cartridge (~35 A breaking) can rupture violently on a high-PSCC circuit, spraying glass and hot metal; the sand-filled HRC element does not.',
    ],
    correctAnswer: 3,
    explanation:
      'Fuse breaking capacity matters. HRC fuses (Bussmann KTK, Eaton FNQ-R, Mersen) are sand-filled and rated to 100 kA breaking; glass cartridges are not safe in test lead applications. Always replace blown lead fuses with HRC.',
  },
  {
    id: 4,
    question:
      "What's the practical use of a clamp meter (Fluke 376FC, Megger DCM340) in fault diagnosis?",
    options: [
      'Load current without breaking the circuit, earth-leakage by clamping L+N together so the imbalance is the leakage, and inrush capture of motor or compressor start-up to diagnose trips on undersized breakers.',
      'Its only use is measuring earth fault loop impedance more accurately than an MFT, by clamping around the earth conductor at the consumer unit during a fault investigation.',
      'It measures insulation resistance non-invasively by clamping around a cable and injecting a 500 V test signal through the jaw without breaking into the circuit.',
      'It is used purely to prove dead before work, replacing the two-pole tester by clamping around a conductor and indicating the presence of voltage on the display.',
    ],
    correctAnswer: 0,
    explanation:
      'The clamp meter is the most under-used fault-diagnosis instrument in apprentice kits. Non-invasive measurement during normal operation is its superpower — the fault is happening WHILE you measure.',
  },
  {
    id: 5,
    question:
      'Socket testers (Martindale CP501, Kewtech LOOPCHECK107) are widely used. What can they NOT tell you?',
    options: [
      'Nothing useful — a socket tester only lights up to confirm a socket is energised, giving no information about polarity, missing earth or connection state at all.',
      'It indicates the connection state of a 13 A socket (correct, reversed polarity, missing earth or neutral) but cannot give accurate EFLI / IR / continuity values or detect shared neutrals and intermittent faults.',
      'It cannot detect a missing earth or reversed polarity, but it does give an accurate measured EFLI value good enough to record directly on the installation certificate.',
      'It reads the insulation resistance and continuity values of the circuit accurately, but cannot indicate polarity, a missing earth or a missing neutral on the socket.',
    ],
    correctAnswer: 1,
    explanation:
      "Plug in, three lights, headline fault category, move on. They're not certification instruments. Use them for speed (30 sockets in 5 minutes) then characterise faults with the MFT.",
  },
  {
    id: 6,
    question:
      "What's the right way to handle a test instrument that's been dropped or suspected damaged?",
    options: [
      'Keep using it as long as it still powers on and gives a reading, because a drop only matters if the case is visibly cracked or the screen is damaged in the fall.',
      'Send it straight to landfill and order a replacement, because a dropped instrument can never be economically repaired or recalibrated back to a trustworthy standard.',
      "Stop using it, tag it 'DO NOT USE', and at base function-check it on a known live source against a reference instrument; send it for repair or re-calibration if anything fails.",
      'Carry on using it but reduce the insulation-resistance test voltage to 250 V, on the basis that a drop only affects the high-voltage test range and not the other functions.',
    ],
    correctAnswer: 2,
    explanation:
      "A dropped instrument is presumed unsafe. The danger isn't visible damage — it's hairline cracks in the input PCB that let fault current bypass protection on the next live test. Behaves normally for a while, then fails violently.",
  },
  {
    id: 7,
    question: 'Calibration intervals for the standard fault-diagnosis kit?',
    options: [
      'Every instrument in the kit must be calibrated weekly, regardless of type, to satisfy NICEIC and NAPIT audit requirements and keep the readings legally admissible.',
      'Calibration is only needed once, when the instrument is first bought; after that a function check at the start of each shift is sufficient for the whole working life.',
      'Only the MFT needs calibration; two-pole testers, multimeters and clamp meters are treated as non-drifting and exempt from any scheduled calibration interval at all.',
      'MFT annually (UKAS-traceable), two-pole tester every 24 months, multimeter and clamp annually, proving unit annually with the two-pole — tracked in a calibration register.',
    ],
    correctAnswer: 3,
    explanation:
      "Calibration is the bookkeeping that protects the certificate. An out-of-calibration instrument's readings are inadmissible — sign-offs based on them can be challenged in court. Register entry: instrument ID, date, lab, certificate number, next-due date.",
  },
  {
    id: 8,
    question:
      'What does a CAT IV 600 V instrument cost on average and which ones are typical apprentice purchases?',
    options: [
      'Two-pole testers ~£60–100, multimeters ~£200–400, MFTs ~£500–900 — apprentices typically buy a VI-13800 plus a Fluke 117, with the CAT IV kit firm-issued.',
      'CAT IV 600 V instruments are budget items at about £5–15 each, so apprentices typically buy the whole seven-instrument kit rated to CAT IV for under £100 in total.',
      'CAT IV 600 V instruments cost about £2,000–5,000 each and are firm-issued only, so apprentices never buy any personally and rely entirely on borrowed CAT II kit.',
      'CAT IV rating makes no difference to price, so a CAT II and a CAT IV from the same maker cost the same and apprentices simply choose on colour, feel and battery life.',
    ],
    correctAnswer: 0,
    explanation:
      "CAT IV adds cost for a reason — better input protection, beefier internal isolation, more conservative voltage clamps. Worth paying for if you'll be on supply-side work; the Fluke 117 is fine if you'll never go above the DB.",
  },
];

const faqs = [
  {
    question: "What's the minimum kit I need to start fault-diagnosis competence work?",
    answer:
      'Five at minimum: GS38 two-pole tester (Martindale VI-13800, ~£60), proving unit (Martindale GVD2, ~£40), MFT (Megger MFT1741+ or Kewtech KT64+ — typically firm-issued), multimeter (Fluke 117, ~£200), clamp meter (Fluke 376FC, ~£400 — typically firm-issued). Plus VDE screwdrivers and lock-off kit. By month six the full seven-instrument kit through firm-issue and personal purchase.',
  },
  {
    question: 'Can I use my Fluke 117 multimeter on the supply tails between cut-out and meter?',
    answer:
      'No. The Fluke 117 is rated CAT III 600 V — adequate for distribution circuits but not for the supply origin (CAT IV territory). The right instrument is a CAT IV 600 V — Fluke 87V or a dedicated supply-side instrument. CAT III on a CAT IV location risks instrument failure with operator injury.',
  },
  {
    question: "Why is GS38 so specific about 'low impedance' for proving-dead instruments?",
    answer:
      "Because high-impedance instruments (multimeters at 10 MΩ) draw negligible current and can't distinguish a real source from an induced ghost voltage. Two-pole testers at 1–5 kΩ load down ghosts to zero while real sources hold. The lamp + LED + audible indication makes the difference unambiguous. GS38's preference for low-impedance is a 30-year lesson written in operator-fatality reports.",
  },
  {
    question: 'How often should I get my instruments calibrated?',
    answer:
      'MFT — annually. Two-pole tester — every 24 months. Multimeter — annually. Clamp meter — annually. Proving unit — annually with the two-pole. Track in a calibration register and replace stickers on receipt back from the lab. Most NICEIC / NAPIT registration audits check the register.',
  },
  {
    question: 'Are cheap MFTs (Lutron, sub-£250) ever good enough for apprentice work?',
    answer:
      "No. Cheap MFTs typically lack UKAS-traceable calibration, accurate fast RCD trip-time measurement, reliable continuity nulling, robust enclosure, manufacturer support for re-calibration. The midmarket starting point is Kewtech KT64+ (~£450) — UKAS-calibrated, supports all the fault-diagnosis tests. Premium tier is Megger MFT1741+ (~£700). Don't buy below the Kewtech.",
  },
  {
    question: "What's the difference between IEC 60900 and EN 60900 markings on insulated tools?",
    answer:
      "IEC is international; EN is the European harmonised version. Functionally identical — both require 1000 V AC working voltage, 10 kV AC test voltage on every tool, double-triangle marking. Reputable manufacturers (Wera, Wiha, CK Dextra, Klein, Knipex VDE) mark to both. Cheap 'insulated' tools without the markings should be treated as suspect.",
  },
];

/* ── Inline check questions (preserved — wired into stats/streaks) ── */

const checks2 = [
  {
    id: 'gs38-probe-tip-check',
    question: 'GS38 says the exposed metal tip of a test probe should be no more than:',
    options: [
      '10 mm — measured from the tip of the finger guard',
      '20 mm — enough to reach into a terminal',
      '4 mm — measured from the tip of the finger guard',
      'There is no limit as long as a finger guard is fitted',
    ],
    correctIndex: 2,
    explanation:
      'GS38 (4th edition) recommends max 4 mm of exposed tip — and lots of UK industry now uses 2 mm or spring-loaded retractable tips. The whole point: short enough that you can’t accidentally bridge two phases or short to earth with a slip.',
  },
  {
    id: 'prove-test-prove-check',
    question: 'You’ve used a voltage indicator to confirm a circuit is dead. Are you done?',
    options: [
      'No — you also need to PROVE the indicator was working before AND after the test',
      'Yes — once the indicator reads dead, the job is done',
      'No — you also need to lock off the circuit after testing',
      'Yes — provided you proved the indicator before the test',
    ],
    correctIndex: 0,
    explanation:
      'Prove → test → prove. Use a known live source (proving unit OR a confirmed live circuit) BEFORE the test and AFTER. If the indicator was broken / the battery was flat / a fuse blew during your test, the second prove is what catches it. A ‘dead’ reading from a broken instrument looks identical to a real dead circuit.',
  },
  {
    id: 'voltmeter-vs-vi-check',
    question:
      'Why is a voltage indicator (VI) generally preferred over a multimeter for proving dead?',
    options: [
      'A VI also measures resistance and continuity as well as voltage',
      'A VI is cheaper and lighter than a multimeter to carry around',
      'A VI gives a more precise numerical voltage reading on its display',
      'A VI has no range to select, has fused shrouded leads, and can’t misread',
    ],
    correctIndex: 3,
    explanation:
      'A VI is a SINGLE-PURPOSE instrument: dead vs. live, no range to select, no maths to do, no possibility of leaving it on milliamps and bridging the line conductor. GS38 strongly favours dedicated VIs over multimeters for proving dead — a wrongly-set multimeter has been the root cause of multiple UK electrical fatalities.',
  },
];

/* ── End-of-page Quiz (preserved — wires into stats/streaks) ──────── */

const quizQuestions2 = [
  {
    id: 1,
    question: 'What does GS38 stand for?',
    options: [
      'A BS 7671 regulation covering test instrument accuracy',
      'HSE Guidance Note GS38 — Electrical test equipment for use on low voltage electrical systems',
      'A British Standard for the construction of consumer units',
      'The grade of safety glasses rated for live electrical work',
    ],
    correctAnswer: 1,
    explanation:
      'HSE Guidance Note GS38, currently in its 4th edition. Not a regulation in itself, but recognised by HSE as the way to comply with EAWR 1989 Reg 4(4) — that any equipment used in work on or near live conductors must be suitable.',
  },
  {
    id: 2,
    question: 'GS38 sets the maximum exposed metal at the tip of a test probe at:',
    options: [
      '12 mm or less (with finger guards)',
      '8 mm or less (with finger guards)',
      '4 mm or less (with finger guards)',
      '25 mm or less (with finger guards)',
    ],
    correctAnswer: 2,
    explanation:
      'Maximum 4 mm of exposed tip, with finger guards. Many modern probes use 2 mm or spring-loaded retractable tips. Long fully-exposed probes (the old screwdriver-style) are NOT GS38-compliant and will get you a hard stop on a competent site.',
  },
  {
    id: 3,
    question: 'The fuses inside GS38-compliant test leads are there to:',
    options: [
      'Protect the meter’s internal display from over-voltage damage',
      'Allow the leads to carry much higher currents for measurement',
      'Make the leads more flexible and easier to coil up after use',
      'Limit fault current so the lead can’t turn into a glowing wire',
    ],
    correctAnswer: 3,
    explanation:
      'HRC (high-rupturing-capacity) fuses inside the lead — typically 500 mA. If you accidentally short L-N or L-E across an LV system, the fuse blows almost instantly, limiting the prospective fault current and stopping the lead from melting / causing an arc. Without internal fusing, a leadshort can produce a serious arc flash at the user’s hands.',
  },
  {
    id: 4,
    question: 'A "proving unit" is used to:',
    options: [
      'Generate a known voltage to prove that a voltage indicator is working before and after a dead-test',
      'Measure the insulation resistance of a dead circuit',
      'Confirm the polarity of a socket once power is restored',
      'Test the trip time of an RCD on a live circuit',
    ],
    correctAnswer: 0,
    explanation:
      'A handheld unit that produces a known voltage (typically 230 V or 400 V AC depending on model). You touch your VI probes to it before testing the circuit dead, and AGAIN after — if the indicator lights up both times, you know it was working throughout the test. Prove → test → prove.',
  },
  {
    id: 5,
    question:
      'You proved the VI on the proving unit, tested the circuit, got 0 V. Then you tried to prove again — and the VI didn’t light up. What does this mean?',
    options: [
      'The circuit is confirmed dead — the VI has simply run out of battery',
      'The VI failed during the test — the ‘0 V’ reading is unreliable, treat as live',
      'The proving unit is flat — just replace its battery and carry on working',
      'Nothing to worry about here — the second prove is optional anyway',
    ],
    correctAnswer: 1,
    explanation:
      'Classic prove-test-prove failure scenario. Maybe the VI’s internal fuse blew during the test, the battery died, the leads broke. Whatever — the ‘0 V’ reading is now unreliable. Treat the circuit as live, retest with a confirmed-working instrument BEFORE touching it.',
  },
  {
    id: 6,
    question: 'GS38 says test leads should have:',
    options: [
      'Long exposed probe tips so they reach deep into the terminals',
      'Detachable crocodile clips fitted as standard for hands-free testing',
      'Insulated shrouded plugs and probes, finger guards, fused tips, CAT-rated insulation',
      'A coiled stretchy lead that extends to at least three metres long',
    ],
    correctAnswer: 2,
    explanation:
      'All five together. Insulated plugs, shrouded probes, finger guards, internal HRC fuses, and CAT III / CAT IV insulation rated for the system voltage. The complete set is what makes the lead GS38-compliant — leaving any one off is a non-compliance.',
  },
  {
    id: 7,
    question: 'Which is the SAFEST instrument for proving dead on a 230 V circuit?',
    options: [
      'A neon screwdriver that lights up only when the circuit is genuinely live',
      'A non-contact ‘pen’ tester held near the conductor to detect a field',
      'A digital multimeter carefully set to the AC volts measurement range',
      'A two-pole voltage indicator — single function, GS38 leads, prove-test-prove',
    ],
    correctAnswer: 3,
    explanation:
      'Two-pole VI is the GS38-recommended tool. Neon screwdrivers rely on body capacitance, give false negatives, and are explicitly NOT GS38 compliant — banned on most UK sites. ‘Pen’ non-contact testers can give false negatives near shielded cables. Multimeters work but the wrong-range risk makes a dedicated VI safer.',
  },
  {
    id: 8,
    question: 'The CAT rating on a multimeter (e.g. CAT III 600 V) tells you:',
    options: [
      'What category of electrical environment the meter is rated to use safely on, and the max voltage in that category',
      'The calibration interval in months before the next service',
      'The maximum current the meter can measure on its amps range',
      'The IP rating for dust and water ingress into the meter case',
    ],
    correctAnswer: 0,
    explanation:
      'CAT II = appliance-side circuits (cord-connected). CAT III = fixed installation final circuits + DBs (most electrician work). CAT IV = origin of installation, supply side of main fuse. The voltage is the max line-to-earth in that category. Using a CAT II meter at the origin of an installation = transient overvoltage could blow it up in your hand.',
  },
];

/* ── FAQs (apprentice voice) ──────────────────────────────────────── */

const faqs2 = [
  {
    question: 'My company gave me a multimeter, not a VI. Can I just use that?',
    answer:
      'You CAN, if it has GS38-compliant leads and you’re properly trained on it. But for proving dead, a dedicated two-pole VI is genuinely safer — no range to select, no possibility of leaving it on amps and shorting the supply. UK industry guidance (HSE GS38, IET Wiring Matters) leans hard toward VIs for proving dead. If you can carry both, do — VI for proving dead, multimeter for actual measurements.',
  },
  {
    question: 'Why are neon screwdrivers banned?',
    answer:
      'They use your body as the return path for a tiny current to light the neon — so if anything between you and earth has decent resistance (rubber-soled boots, dry surface), it gives a FALSE NEGATIVE. People have been killed mistaking a glowing neon for ‘safely off’ when the circuit was live. They’re not GS38-compliant and most UK sites will treat them as a fail-and-disposal item.',
  },
  {
    question: 'Do I need to prove the indicator if I’m only doing a quick test?',
    answer:
      'Yes. Every time. The whole reason for prove-test-prove is that an indicator can fail SILENTLY — battery, fuse, broken lead. ‘Quick test’ is exactly when complacency kills. The proving unit is in your tool bag; it takes 4 seconds to use. No exception is worth a shock.',
  },
  {
    question: 'What if I haven’t got a proving unit on me?',
    answer:
      'You can prove on a known live source — e.g. an adjacent socket on a different circuit you’ve already confirmed is live. But that means you have to find one that’s genuinely live, which on a partly-isolated install isn’t always easy — and you’re relying on someone else’s prior test. A pocket-size proving unit is £30 and lives on your tool belt for years. Get one. Use it.',
  },
  {
    question: 'What’s the difference between CAT III and CAT IV?',
    answer:
      'Different points in the installation. CAT II = appliance-side (cord-connected). CAT III = fixed installation final circuits and DBs — most apprentice work. CAT IV = the supply origin (main fuse, meter tails, service head). The higher the CAT number, the more energy is potentially available in a fault, so the instrument needs more robust insulation. Working on the cut-out side of the meter with a CAT III meter is asking for trouble — buy CAT IV-rated kit if you’ll work that far up the supply.',
  },
  {
    question: 'Do GS38 rules apply to MY OWN tester I bought online?',
    answer:
      'Yes. EAWR 1989 Reg 4(4) says any test equipment must be suitable for the work and properly maintained — applies whoever owns it. If your supervisor-issued kit is unsuitable, your apprentice-bought kit is ALSO unsuitable. ‘Personal’ test gear must still be GS38-compliant, properly fused, CAT-rated, and ideally calibrated. Cheap unmarked stuff online is often none of those.',
  },
];

export default function Lesson317E_3_3() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        HSE GS38 4th edition in detail — probe geometry, finger barriers, fused leads, low
        impedance for proving dead, CAT II/III/IV ratings — applied to choosing the right
        instrument for each fault-diagnosis task with named brand realism.
      </p>

      <TLDR
        points={[
          'GS38 (4th ed) sets four headline rules: 4 mm max exposed tip, finger barriers, robust insulated leads, low-impedance for proving dead. Plus fused leads for high-PSCC work.',
          'CAT II for sockets, CAT III for DB / distribution, CAT IV for cut-out / supply origin. Always match or exceed the CAT for the work location.',
          'Seven-instrument kit: two-pole tester, proving unit, MFT, multimeter, clamp, socket tester, VDE screwdrivers. Each has a specific job; no overlap means you can drop one.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the GS38 4th edition probe and lead requirements — 4 mm tip, finger barriers, fused leads where needed, robust insulation.',
          'Distinguish CAT II / CAT III / CAT IV measurement-category ratings and select the right CAT for the work location.',
          'Distinguish a voltage detector (volt-stick, non-contact) from a voltage indicator (two-pole, GS38-compliant for proving dead).',
          'Specify the seven-instrument apprentice fault-diagnosis kit and the technical reason no instrument is interchangeable.',
          "Identify HRC fused test leads and explain why they're required on high-PSCC measurement.",
          'Apply tag-and-isolate discipline to dropped or suspect instruments to protect the next user.',
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
          <li>
            <strong>Maximum exposed metal tip — 4 mm.</strong> Older 19 mm tips can bridge across
            two adjacent terminals.
          </li>
          <li>
            <strong>Finger barriers</strong> — moulded shroud at the back of the probe shaft that
            stops your finger sliding forward onto the tip.
          </li>
          <li>
            <strong>Robust insulated leads</strong> — silicone or PVC sheathing rated for system
            voltage; no exposed conductor.
          </li>
          <li>
            <strong>Fused leads</strong> where prospective fault current is high — typical inline
            500 mA F or 1 A FF HRC fuse.
          </li>
          <li>
            <strong>Low-impedance instrument</strong> for proving dead — typically 1–5 kΩ; loads
            down induced/ghost voltages so they don't masquerade as real sources.
          </li>
          <li>
            <strong>Lamp + LED + audible</strong> on voltage indicators — single-mode is
            unreliable; multi-mode confirms the result.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="HSE Guidance Note GS38 (4th ed) — Probe design"
        clause={
          <>
            "The instrument’s probes should incorporate a finger barrier and an insulated tip
            with a maximum length of metal exposed of 4 mm or, where this is not practicable, an
            insulating shroud reducing the exposed metal tip to 4 mm or less."
          </>
        }
        meaning={
          <>
            The 4 mm rule is the headline. Manufacturers provide tip-caps that allow occasional
            reach-in to recessed terminals (some MK / Wylex DBs have deep recesses) without
            permanently exposing more metal.
          </>
        }
        cite="Source: HSE GS38 (4th ed) — Electrical test equipment for use by electricians."
      />

      <InlineCheck {...checks[0]} />

      <SectionRule />

      <ContentEyebrow>CAT ratings — match instrument to location</ContentEyebrow>

      <ConceptBlock
        title="CAT II / III / IV — what they mean and where they apply"
        plainEnglish="The CAT (measurement-category) rating tells you how much transient overvoltage the instrument’s input protection can survive. The further upstream the work, the higher the prospective transient — and the higher the CAT rating you need."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>CAT II</strong> — appliances, plug-and-cord-connected. Multimeter for socket
            measurement. NOT adequate for DB work.
          </li>
          <li>
            <strong>CAT III</strong> — fixed installation, distribution circuits. DB measurements,
            branch circuits, motor controllers. Most fault diagnosis lives here.
          </li>
          <li>
            <strong>CAT IV</strong> — origin of installation. Cut-out, supply tails, overhead
            lines.
          </li>
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
        onSite="Apprentices reach for the volt-stick (Fluke 1AC-A1 II, Knipex VoltagePen) because it’s quick. It IS quick, and it has a legitimate role — first-pass cable identification. But it is NEVER the instrument that confirms a circuit is dead. The two-pole tester is."
      >
        <p>The technical difference:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Volt-stick (voltage detector)</strong> — non-contact, capacitive sensing of AC
            voltage in the cable’s electric field. Convenient. Inconsistent — depends on cable
            shielding, sensor angle, battery, sensitivity setting. Misses high-impedance sources
            entirely.
          </li>
          <li>
            <strong>Two-pole tester (voltage indicator)</strong> — direct contact, low-impedance,
            dedicated indicator with lamp + LED + audible. GS38-compliant for proving dead. Loads
            down induced voltages; reads real sources reliably.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks[2]} />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 651.3"
        clause={
          <>
            "Measuring instruments and monitoring equipment and methods shall be chosen in
            accordance with the relevant parts of BS EN 61557. If other measuring equipment is
            used, it shall provide no less a degree of performance and safety."
          </>
        }
        meaning={
          <>
            BS 7671 nails instrument selection to a specific standard &mdash; BS EN 61557 &mdash;
            because a tester that doesn&apos;t meet it can&apos;t be relied on for safety-critical
            measurements. When you compare a Fluke 1664 FC to a budget eBay clone, BS EN 61557 is
            the line that separates them. Anything you use on a fault-diagnosis job has to either
            carry that mark or demonstrate equivalence.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 651.3, verbatim."
      />

      <SectionRule />

      <ContentEyebrow>The seven-instrument apprentice kit</ContentEyebrow>

      <ConceptBlock
        title="What sits in an fault-diagnosis toolbox"
        onSite="Each instrument has one job it does better than any other. There’s no overlap that means you can drop one. Build the kit over 18 months."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1. GS38 two-pole tester</strong> — Martindale VI-13800 (~£60), Fluke T130
            (~£100), Kewtech KT1780 (~£70).
          </li>
          <li>
            <strong>2. Proving unit</strong> — Martindale GVD2 (~£40), Drummond Lo-Z (~£35).
          </li>
          <li>
            <strong>3. MFT</strong> — Megger MFT1741+ (~£700), Kewtech KT64+ (~£450), Fluke 1664FC
            (~£900).
          </li>
          <li>
            <strong>4. Multimeter</strong> — Fluke 117 (~£200), Fluke 87V (~£400) for CAT IV
            inclusion.
          </li>
          <li>
            <strong>5. Clamp meter</strong> — Fluke 376FC (~£400), Megger DCM340 (~£200).
          </li>
          <li>
            <strong>6. Socket tester</strong> — Martindale CP501 (~£25), Kewtech LOOPCHECK107
            (~£150 with EFLI).
          </li>
          <li>
            <strong>7. VDE screwdriver set</strong> — Wera Kraftform Plus 7-piece (~£60), Wiha
            SoftFinish 7-piece (~£70), CK Dextro 8-piece (~£50).
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard {...videos.multimeter} topic="Using a multimeter" />

      <RegsCallout
        source="BS EN 61010-1 — Measurement category definitions"
        clause={
          <>
            "Equipment shall be suitable for the measurement category of the circuit at the point
            of measurement, taking account of the prospective transient overvoltage at that
            point."
          </>
        }
        meaning={
          <>
            The CAT rating isn’t a marketing claim — it’s a safety-rated specification under BS
            EN 61010-1. CAT II in a CAT III location is a real injury risk. Match or exceed.
          </>
        }
        cite="Source: BS EN 61010-1 — Safety requirements for electrical equipment for measurement, control, and laboratory use."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Using a CAT III multimeter at the cut-out"
        whatHappens={
          <>
            Apprentice probes incoming phase to neutral at the cut-out tails with a Fluke 117 (CAT
            III 600 V). The 117’s input protection isn’t rated for the CAT IV transient
            overvoltage at the supply origin. Inputs explode, molten metal sprays from the case,
            eye injury. The 117 was the wrong instrument for that location.
          </>
        }
        doInstead={
          <>
            Match CAT to location. CAT II for sockets, CAT III for DB, CAT IV for cut-out. Fluke
            87V (CAT IV 600 V) and Martindale VI-13800 (CAT IV 600 V) cover most work.
          </>
        }
      />

      <CommonMistake
        title="Trusting a non-contact volt-stick to confirm dead"
        whatHappens={
          <>
            Apprentice waves a Fluke 1AC-A1 II over an isolated cable. No beep. They grab the
            cable bare-handed. The cable has a borrowed neutral and is at 230 V on the neutral.
            The volt-stick missed it because the apprentice waved from the wrong side and the
            cable’s sheath shielded the capacitive coupling. 230 V shock, fall from ladder,
            broken arm.
          </>
        }
        doInstead={
          <>
            Volt-stick is first-look only — ‘might be voltage here’. Proving dead requires a
            low-impedance two-pole tester (Martindale, Fluke T130) proved on a known live source
            before AND after, applied directly to the conductor between L–N, L–E and N–E.
          </>
        }
      />

      <Scenario
        title="Building the kit on a starter wage"
        situation={
          <>
            You’re three months into your apprenticeship. The firm has issued you an MFT
            (Kewtech KT64+) and a multimeter (Fluke 117). You need to supply your own two-pole
            tester, proving unit, VDE screwdrivers and basic PPE. Take-home pay is £1,400/month.
          </>
        }
        whatToDo={
          <>
            Month 1 (~£200): Martindale VI-13800 (£60), Martindale GVD2 (£40), Wera Kraftform Plus
            7-piece VDE set (£60), Brady safety lockout padlock + tag (£30). Month 2–3: socket
            tester (£25), Class 0 insulated gloves (£40), arc-rated long-sleeve top (£50),
            high-vis (£10). Month 6: upgrade VDE drivers (Wera Kraftform Plus 15-piece £130),
            Fluke T6-1000 contactless meter (£200). Year 2: personal MFT if firm doesn’t issue
            (~£500 second-hand Kewtech KT64+).
          </>
        }
        whyItMatters={
          <>
            The right tools at the right time keep you safe AND productive. Skipping the GS38
            two-pole to save £60 means you can’t legally prove dead, can’t safely do the work,
            are a liability on site. Tools are an investment in employability — apprentices with
            their own kit get sent solo (under remote supervision) sooner.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>CAT ratings — input protection of measurement instruments</ContentEyebrow>

      <ConceptBlock
        title="CAT II / III / IV — choosing an instrument that survives a transient"
        plainEnglish="The CAT (Measurement Category) rating defines the transient overvoltage an instrument can survive. Plug-in appliances are CAT II; fixed installation circuits are CAT III; cut-out / supply origin is CAT IV. A CAT III instrument used at a CAT IV location can be destroyed by a single switching transient — usually with the test leads exploding in the operative's hand."
        onSite="Fault investigation routinely lives at CAT III (DBs, distribution boards, fixed wiring) and sometimes CAT IV (cut-out work). Standard kit: Fluke 117 (CAT III 600 V), Fluke 87V (CAT III 1000 V / CAT IV 600 V), Megger MFT1741+ (CAT IV 600 V), Martindale VI-13800 (CAT IV 600 V), Kewtech KT64+ (CAT IV 600 V). Cheap CAT II multimeters from a generic toolbox have no place on a fault-diagnosis job."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>CAT II 600 V</strong> — plug-in appliances, single-phase loads downstream of a
            socket. Most consumer multimeters.
          </li>
          <li>
            <strong>CAT III 600 V</strong> — fixed installation, sub-DBs, single-phase
            distribution. Most professional multimeters.
          </li>
          <li>
            <strong>CAT III 1000 V / CAT IV 600 V</strong> — three-phase fixed installation,
            primary supply circuits. Professional MFTs and clamp meters.
          </li>
          <li>
            <strong>CAT IV 1000 V</strong> — cut-out, supply origin, overhead lines. Specialist
            test equipment.
          </li>
          <li>
            <strong>Lead matching</strong> — the test leads have their own CAT rating. A CAT IV
            meter with CAT II leads = the leads' rating limits the system. Match leads to
            instrument rating.
          </li>
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
          <li>
            <strong>Martindale VI-13800</strong> — UK industry standard. Lamp + LED + buzzer.
            Pairs with Martindale GVD2 proving unit.
          </li>
          <li>
            <strong>Fluke T130</strong> — backlit LCD shows actual voltage. Built-in continuity
            test. Pricier (~£180) but adds measurement capability.
          </li>
          <li>
            <strong>Kewtech KT1780</strong> — built-in continuity, single-pole AC indication, GS38
            compliant. Mid-price (~£110).
          </li>
          <li>
            <strong>Drummond MD-906</strong> — older industry standard, still in widespread use.
            Lamps only.
          </li>
          <li>
            <strong>Proving units</strong> — Martindale GVD2, Megger MTB7671, Kewtech KEWPROVE3.
          </li>
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
          <li>
            <strong>Megger MFT1741+</strong> — full BS 7671 643 test suite, AutoRCD, Hi-Z
            (no-trip) loop mode, EV charger test mode, downloadable to PowerSuite Pro.
          </li>
          <li>
            <strong>Fluke 1664FC</strong> — Insulation PreTest, Auto-Test sequence, FlukeView
            Forms wireless transfer.
          </li>
          <li>
            <strong>Kewtech KT64+</strong> — full BS 7671 643 suite, integrated null-button for
            accurate Zs, Bluetooth to KT64Print app.
          </li>
          <li>
            <strong>Metrel MI3155</strong> — popular on commercial 3-phase, includes 3-phase loop
            impedance and rotation test.
          </li>
          <li>
            <strong>Special-feature MFTs</strong> — Megger MFT1845 (high-current loop for PSCC),
            Megger DET14C (intrinsically safe for ATEX), Fluke 1654-DLT (data-logging variant).
          </li>
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
          <li>
            <strong>Daily inspection</strong> — pre-job: bend, flex, visual on every lead.
            Post-job: same.
          </li>
          <li>
            <strong>Probe condition</strong> — finger guard intact, 4 mm exposed tip, no chips in
            moulded insulation.
          </li>
          <li>
            <strong>Crocodile clip leads</strong> — for hands-free testing inside a DB. Must have
            Kelvin-clip design that grips firmly without bridging adjacent terminals.
          </li>
          <li>
            <strong>Wander leads</strong> — long single-conductor leads for R1+R2 testing across
            long radials. Megger WL10 (10 m), WL20 (20 m).
          </li>
          <li>
            <strong>Storage</strong> — leads coiled in figure-8, stored in instrument case. Tight
            loops crack the insulation.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'GS38 4th edition: 4 mm max exposed tip, finger barriers, robust insulated leads, low-impedance for proving dead, fused leads for high-PSCC work, lamp + LED + audible indication.',
          'CAT II for sockets, CAT III for DBs and branch circuits, CAT IV for cut-out and supply-side. Match or exceed the CAT for the location.',
          'Voltage detector (volt-stick) is first-look only. Voltage indicator (two-pole tester) is the GS38-compliant proving-dead instrument.',
          'Seven-instrument kit: two-pole tester, proving unit, MFT, multimeter, clamp meter, socket tester, VDE screwdrivers. Each has a specific job; no overlap.',
          'Calibration intervals: MFT and multimeter annually, two-pole tester every 24 months. Track in calibration register; replace stickers on receipt.',
          'Fused HRC test leads (500 mA F or 1 A FF) limit energy in a probe-slip incident. Required for high-PSCC; recommended for all live work.',
          'Dropped instruments are presumed unsafe — tag and isolate, function-check on a known live source before re-use.',
          'VDE-rated insulated tools (IEC 60900, 1000 V AC, double-triangle marking) are the secondary safety layer when isolation is the primary.',
        ]}
      />

      <Quiz title="GS38 + instrument selection — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The HSE guidance that defines what makes a tester safe for live work. Probes, fuses,
        finger guards, CAT ratings, and the prove-test-prove rule that catches a broken indicator
        before it kills you.
      </p>

      <TLDR
        points={[
          'GS38 = HSE Guidance Note for test equipment on LV systems. Covers probes, leads, fuses, indicators. Recognised method of complying with EAWR Reg 4(4).',
          'Probes: max 4 mm exposed tip, finger guards, shrouded plugs, internal HRC fuses, CAT-rated insulation. Neon screwdrivers are NOT compliant.',
          'Always PROVE → TEST → PROVE on a known live source (proving unit). A broken VI gives 0 V on a live circuit — the second prove catches it.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what GS38 is and how it relates to EAWR 1989 Reg 4(4).',
          'Identify a GS38-compliant probe set (probe tip, finger guard, shroud, fuse, CAT rating).',
          'Choose between a voltage indicator (VI), multimeter, and proving unit — and explain why a VI is preferred for proving dead.',
          'Carry out the prove-test-prove procedure on a real LV circuit and explain why the second prove is non-negotiable.',
          'Read and apply CAT II / III / IV ratings to the right point in an installation.',
          'Spot non-compliant test gear (neon screwdrivers, non-fused leads, exposed probe tips) and refuse to use it.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>What GS38 actually is</ContentEyebrow>

      <ConceptBlock
        title="HSE Guidance Note GS38 — the rulebook for electrician test gear"
        plainEnglish="GS38 is HSE’s detailed advice on what makes a test instrument and its leads safe for live work. Not a law on its own — but treated as THE recognised way to meet EAWR Reg 4(4). Following it = compliant. Ignoring it = HSE will ask why."
        onSite="When your supervisor hands you a multimeter or VI, the first thing to check is whether the probes, leads and instrument all meet GS38. The GS38 booklet itself is on the HSE website, free to download — worth keeping a PDF on your phone."
      >
        <p>
          GS38 is currently in its 4th edition, last updated 2015. It’s aimed specifically at
          electrical test equipment used on systems up to 1000 V AC (Low Voltage). It covers:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>The construction of test probes (tips, finger guards, shrouds)</li>
          <li>The construction of test leads (insulation, internal fuses, plugs)</li>
          <li>Voltage indicators vs multimeters vs neon testers</li>
          <li>The prove-test-prove principle</li>
          <li>Periodic inspection and care of test equipment</li>
        </ul>
        <p>
          It exists because, historically, a lot of "easy" jobs went wrong because the test gear
          itself was the cause — a non-fused lead shorted, a long screwdriver probe bridged two
          phases, a neon tester gave a false negative. GS38 is the accumulated lesson from those
          incidents.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="EAWR 1989 — Regulation 4(4)"
        clause="Any equipment provided under these Regulations for the purpose of protecting persons at work on or near electrical equipment shall be suitable for the use for which it is provided, be maintained in a condition suitable for that use, and be properly used."
        meaning={
          <>
            Test equipment counts as "equipment for protecting persons" under Reg 4(4). It has to
            be <strong>suitable</strong>, <strong>maintained</strong>, and
            <strong> properly used</strong>. GS38 is HSE’s detailed view of what "suitable" means
            in practice. A non-GS38 setup IS a Reg 4(4) breach if someone gets hurt.
          </>
        }
        cite="Reference: HSE GS38 (4th ed.) — Electrical test equipment for use on low voltage electrical systems"
      />

      <SectionRule />

      <ContentEyebrow>The probe</ContentEyebrow>

      <ConceptBlock
        title="GS38-compliant probes — short tips, finger guards, fused leads"
        onSite="Pull a probe out of your tool bag. The metal tip should be barely there — 4 mm max, often 2 mm. Behind that, a moulded finger guard you can’t accidentally slide your hand past. Behind that, a fully insulated body. If any of that is missing, the probe is not GS38."
      >
        <p>The GS38-recommended construction has five mandatory features:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Maximum 4 mm exposed metal tip.</strong> Many modern probes use 2 mm or
            spring-loaded retractable tips. The whole point: short enough that you can’t bridge
            two adjacent terminals with one slip.
          </li>
          <li>
            <strong>Finger guard / barrier.</strong> A moulded ring or flange that stops your
            finger sliding forward onto the live tip. Compulsory under GS38.
          </li>
          <li>
            <strong>Fully insulated body.</strong> No exposed metal anywhere except the tip
            itself. Insulation rated for the system voltage with appropriate CAT category.
          </li>
          <li>
            <strong>Internal HRC fuse in the lead.</strong> Typically 500 mA. If you accidentally
            short L-N or L-E, the fuse blows in milliseconds — limits the prospective fault
            current, prevents the lead becoming a fuse itself.
          </li>
          <li>
            <strong>Shrouded plug at the instrument end.</strong> No exposed banana-plug metal
            where the lead joins the meter. Insulated up to the actual contact.
          </li>
        </ol>
        <p>
          Old-school probes that had a long fully-exposed metal pin (essentially a screwdriver
          shaft as the tip) are <strong>explicitly non-compliant</strong>. Same for unfused leads.
          They’ll get a hard stop on any competent UK site, and if used in an incident, they’re
          what the HSE inspector will look at first.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="HSE GS38 (4th edition, 2015) — Section 4 (Test Probes) (paraphrased)"
        clause="Probes should be designed and constructed so as to limit the exposed metal tip to a maximum of 4 mm. Where probes are likely to come into contact with live parts that could give rise to short-circuit currents in excess of approximately 1 kA, additional protection should be provided to the user, e.g. by means of finger guards or barriers."
        meaning={
          <>
            4 mm max tip, finger guards mandatory whenever the prospective short-circuit current
            is high (which is essentially every fixed installation in a UK building). Read
            straight off the document — this isn’t opinion, it’s the published HSE recommendation.
          </>
        }
        cite="Verbatim wording paraphrased — see HSE GS38 (4th ed.) Section 4 and Annex A for the full text."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The instrument</ContentEyebrow>

      <ConceptBlock
        title="Voltage indicator (VI) vs multimeter vs neon tester"
        plainEnglish="A VI does ONE job: shows live or dead. A multimeter measures lots of things if you set it right. A neon tester relies on you and is essentially banned. For proving dead, the VI is what you want."
        onSite="Two-pole VIs (Martindale, Drummond, Fluke T-series, Megger 1731) are the standard UK kit. They show LEDs or a series of bars at common voltages — 12, 50, 120, 230, 400, 690 V. No range knob, no display you can misread, no chance of the wrong setting."
      >
        <p>The three options, side by side:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Two-pole voltage indicator (VI).</strong> Single-purpose. Probes wired
            directly into the unit. LED or LCD shows step voltages. GS38-preferred for proving
            dead. Doesn’t need batteries for the basic indicator function on most models — driven
            by the measured voltage itself. <em>What you should use.</em>
          </li>
          <li>
            <strong>Digital multimeter (DMM).</strong> Versatile. CAT III or IV rated,
            GS38-compliant leads, internal HRC fuses on the current ranges. Useful for actual
            measurements (voltage, current, resistance, continuity). Risk: wrong-range error — set
            to amps, touched across L-N, becomes a dead short with a small fuse. Used widely but
            the wrong-range risk makes it the second choice for proving dead.
          </li>
          <li>
            <strong>Neon screwdriver / non-contact ‘pen’ tester.</strong>{' '}
            <strong>Banned in practice.</strong> Neon types use your body as a return path — false
            negative if you’re well-insulated from earth. Pen testers can miss shielded cables.
            NEITHER is GS38-compliant. Toss them.
          </li>
        </ul>
        <p>
          GS38 doesn’t formally outlaw multimeters or pen testers — but it makes clear that the VI
          is the safest dedicated tool for confirming dead state. Best practice on most UK
          competent sites: VI for prove-test-prove, multimeter for everything else.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The CAT rating — and why it matters where on the install you’re working"
        plainEnglish="The CAT number = how high up the supply chain the meter is safe to use. Higher CAT = more potential energy in a fault = more robust insulation needed inside the meter."
      >
        <p>Defined in IEC/EN 61010-1, you’ll see CAT II, III or IV on every quality meter:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>CAT II</strong> — appliance-side. Cord-connected loads (kettles, lamps, AV
            gear). Generally avoided on fixed installation work.
          </li>
          <li>
            <strong>CAT III</strong> — fixed installation final circuits, distribution boards,
            ring finals, hard-wired motors.{' '}
            <strong>The standard ‘electrician-everyday’ rating.</strong> Most electrician
            multimeters and VIs are CAT III 600 V or 1000 V.
          </li>
          <li>
            <strong>CAT IV</strong> — origin of installation. Service head, meter tails, main
            switch. Higher transient overvoltages possible from lightning / network faults.
            Required for any work upstream of the consumer unit. CAT IV 600 V kit is more
            expensive but essential if you’ll touch the cut-out side.
          </li>
        </ul>
        <p>
          The number after CAT (e.g. 600 V, 1000 V) is the max line-to-earth voltage in that
          category. Using a CAT II 600 V meter on a CAT IV environment isn’t just ‘not ideal’ — it
          can literally blow the meter up in your hand if a transient hits during your test.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="HSE GS38 (4th edition, 2015) — Section 5 (Test Instruments) (paraphrased)"
        clause="Where the test or measurement requires a meter that can have current flow through the leads (e.g. for measurement of low resistance, current measurement, etc.), the leads should incorporate a high-rupturing-capacity (HRC) fuse with a current rating not exceeding 500 mA, or a current-limiting resistor."
        meaning={
          <>
            The 500 mA HRC fuse in the test lead is what stops your meter becoming a small bomb
            when you accidentally touch line-to-earth on the amps range. Lead-mounted, NOT on the
            instrument — so even if you swap a probe between two meters, the fuse goes with the
            lead. Buy GS38 leads, check the fuse rating, replace fuses with the same HRC type (NOT
            random fuses from a drawer).
          </>
        }
        cite="Verbatim wording paraphrased — see HSE GS38 (4th ed.) Section 5 for the full text."
      />

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The procedure that catches the failure</ContentEyebrow>

      <ConceptBlock
        title="Prove → test → prove (the bit that saves you)"
        plainEnglish="Use a known live source to confirm the indicator works BEFORE you test the circuit. Then test the circuit. Then go back to the known live source and confirm the indicator STILL works."
        onSite="Order on the bench: VI in one hand, proving unit in the other. Touch probes to PU, see all the bars/LEDs light. Walk to the circuit, touch probes to the test point, confirm 0 V (dead). Walk back to PU, touch probes again, see all the bars/LEDs light. NOW you can trust the dead reading. Takes 30 seconds."
      >
        <p>
          The reason the second prove is non-negotiable: if the indicator failed silently DURING
          your test (battery died, fuse blew, lead got pulled out internally), the second prove
          will fail too. Without the second prove, you can’t tell a real dead reading apart from a
          broken instrument reading.
        </p>
        <p>
          Documented UK fatalities have come from exactly this — electrician proves the VI, tests
          the supposedly-isolated cable, gets 0 V, removes the cable termination, gets a fatal
          shock. Post-incident: the VI’s internal lead had broken open between the proving and the
          test. The second prove would have shown that and the death would have been a very
          different outcome.
        </p>
        <p>
          <strong>What counts as a ‘known live source’?</strong> Best: a dedicated proving unit
          (PU). Acceptable: another circuit on the same install that you’ve already independently
          confirmed is energised (e.g. a known-live socket).
          <strong> Not acceptable:</strong> a battery, an ELV signal, or anything that tests at a
          voltage well below your circuit voltage — a VI working at 12 V is no proof it’ll work at
          230 V.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="HSE GS38 (4th edition, 2015) — Section 6 (Test procedures) (paraphrased)"
        clause="Before and after the test, the operation of the test instrument should be checked using a proving unit or other known live source. This ‘prove-test-prove’ procedure is essential to confirm that the indicator was functioning correctly during the test."
        meaning={
          <>
            Plain-English HSE guidance. The two proves are <em>essential</em> — not "recommended",
            not "best practice" — essential. If you can’t prove the VI worked both before AND
            after the test, you cannot rely on the dead reading. Treat the circuit as live until
            proved otherwise with confirmed-working equipment.
          </>
        }
        cite="Verbatim wording paraphrased — see HSE GS38 (4th ed.) Section 6 and the IET Code of Practice for Electrical Safety Management for the full text."
      />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Inspection + maintenance</ContentEyebrow>

      <ConceptBlock title="Looking after the test gear">
        <p>
          EAWR Reg 4(4) requires test equipment to be MAINTAINED in a suitable condition. In
          practice, that means:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Pre-use visual check</strong> — every time. Cracks in the moulding, damaged
            probe tips, frayed leads, missing finger guards, swollen battery compartment, water
            ingress.
          </li>
          <li>
            <strong>Function check before each test session</strong> — prove the VI on the PU. If
            it doesn’t prove, don’t use it.
          </li>
          <li>
            <strong>Periodic calibration</strong> for measurement instruments — multimeters, MFTs,
            clamp meters. Annual is the typical interval. Check the calibration cert sticker on
            the instrument; if it’s out of date, the readings can’t be trusted for certification
            work.
          </li>
          <li>
            <strong>Replace the lead fuse with the EXACT specified type.</strong> Not "a 500 mA
            fuse from a drawer". HRC fuses with the right interrupting rating — anything less can
            fail-open under fault and let the arc through.
          </li>
          <li>
            <strong>Out-of-service the instrument and its leads</strong> if any defect is found.
            Report it. Get a replacement. Don’t patch and continue.
          </li>
        </ul>
      </ConceptBlock>

      <CommonMistake
        title="Skipping prove-test-prove because ‘the breaker is off’"
        whatHappens={
          <>
            You isolate the circuit at the breaker, lock it off, get to the test point. The VI
            shows 0 V. ‘Job done — start working.’ Halfway through removing the terminations, the
            screwdriver bridges line-CPC and the world flashes white. Post-incident analysis: the
            VI’s internal lead had a hairline break, you were testing a live circuit and the
            indicator just couldn’t show it. The second prove would have told you straight away.
          </>
        }
        doInstead={
          <>
            EVERY test, EVERY time: PROVE the indicator on a known live source → TEST the circuit
            → PROVE the indicator AGAIN. The fact that the breaker is off isn’t evidence the
            conductor is dead — wrong breaker, mis-labelled DB, somebody else energising
            elsewhere. The indicator IS the evidence. The indicator only works if it’s actually
            working. Hence the prove-test-prove.
          </>
        }
      />

      <CommonMistake
        title="Using a multimeter set to the wrong range to ‘prove dead’"
        whatHappens={
          <>
            Multimeter accidentally left on the 10 A current range from a previous test. You touch
            the probes across L-N expecting a voltage reading, instead create a near-dead-short
            across the supply. Best case: the meter’s internal HRC fuse blows immediately, no harm
            done. Worst case: the fuse is wrong-rated or missing, the supply prospective fault
            current is 6 kA, the meter and your hand find out together how arc-flash works.
          </>
        }
        doInstead={
          <>
            Use a dedicated voltage indicator for proving dead — no range to set, no possibility
            of being on the wrong setting. If you must use a multimeter, CHECK the dial before
            every probe-touch. AND make sure the leads have GS38-compliant 500 mA HRC fuses —
            they’re what stops you finding out the hard way.
          </>
        }
      />

      <Scenario
        title="The first time prove-test-prove saves you"
        situation={
          <>
            Cap-off on a small distribution board to add a new circuit. You isolate the whole
            board, lock it off, walk back to the bench, prove your VI on the proving unit (LEDs
            all light), walk back, touch probes to the incoming tail terminals — 0 V. You start to
            relax. But you remember the routine: walk back to the proving unit, touch the probes
            to it, expecting the LEDs again… and nothing. No light. No voltage reading.
          </>
        }
        whatToDo={
          <>
            STOP. The VI failed sometime between the first prove and now. Your ‘0 V’ reading on
            the tails is unreliable — the tails could still be live and the indicator just isn’t
            telling you. Don’t touch the conductors. Get a different VI (or borrow your
            supervisor’s), prove that one on the PU, retest the tails. If those are dead too —
            proceed, but bin the failed VI and report the incident. If the second VI shows live —
            you’ve just discovered a wrong-breaker isolation and the prove-test-prove rule has
            saved your life.
          </>
        }
        whyItMatters={
          <>
            This isn’t a hypothetical — exactly this scenario plays out across the UK multiple
            times a year. The investigation reports list "test instrument failure" as a
            contributing cause again and again. The single thing that turns it from an injury into
            a near-miss is the discipline of proving the indicator after the test. Build it into
            your hands so you do it without thinking.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>How GS38 connects to everything else</ContentEyebrow>

      <ConceptBlock
        title="GS38 + insulated PPE + safe isolation = the layered defence"
        plainEnglish="GS38 makes sure your test gear isn’t the cause of the incident. Insulated PPE protects you if something else goes wrong. Safe isolation removes the live state in the first place. All three together = the safety system."
      >
        <p>
          Looking at the bigger picture: the lesson on personal protective equipment made the
          point that PPE is the LAST line of defence, and set out the specific PPE for
          electricians. This lesson is about making sure the TEST INSTRUMENT itself isn’t a source
          of risk — because you’ll spend more of your career holding test gear than holding
          insulated tools, and a non-GS38 setup turns a routine dead-test into the incident.
        </p>
        <p>
          The lesson on the safe isolation procedure covers how all of this is used together:
          lock-off the supply, post warning notices, use GS38-compliant kit to PROVE dead state,
          then work. Each step is dependent on the next. GS38 underpins the whole thing.
        </p>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'GS38 = HSE Guidance Note for LV test equipment. Recognised method of meeting EAWR Reg 4(4).',
          'Probes: max 4 mm exposed tip, finger guards, shrouded plugs, internal HRC fuses (500 mA), CAT-rated insulation.',
          'Voltage indicators (VIs) are GS38-preferred for proving dead — single-purpose, no range to set, no wrong-setting risk.',
          'Neon screwdrivers + non-contact pens = NOT GS38, banned on competent sites. Bin them.',
          'PROVE → TEST → PROVE on a known live source EVERY time. The second prove is what catches a silently failed indicator.',
          'CAT III for fixed-installation final circuits + DBs (most electrician work). CAT IV needed upstream of the consumer unit.',
        ]}
      />

      {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

      <Quiz title="GS38 knowledge check" questions={quizQuestions2} />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
