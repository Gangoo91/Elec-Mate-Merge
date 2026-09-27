/**
 * Ported from the English course, combining:
 *   level3/module4/section4/Sub2.tsx
 *   level3/module4/section6/Sub2.tsx
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
    id: 'mod4-s4-sub2-supply',
    question:
      'How do you identify whether a domestic supply is TN-S, TN-C-S or TT, and why does it matter for fault diagnosis?',
    options: [
      'You ask the customer which supply they have and take their word for it. Householders always know their earthing arrangement because it is on the meter certificate, so a quick question identifies TN-S, TN-C-S or TT without any inspection or measurement.',
      'You read the rating of the main fuse. A 60 A cut-out is always TN-S, an 80 A cut-out is always TN-C-S, and a 100 A cut-out is always TT, so the main-fuse size tells you the earthing arrangement directly without looking at the earth path.',
      "Visual inspection of the cut-out and main earth: TN-S has a separate earth conductor from the cut-out, TN-C-S (PME) has a combined neutral-earth separated at the cut-out, TT has no incoming earth and relies on the customer's own electrode. It matters because each has different fault characteristics, protection requirements and L–E behaviour.",
      'It makes no difference to fault diagnosis which supply you have — the tests and the limits are identical for TN-S, TN-C-S and TT. So you skip supply identification entirely and apply the same Zs limits to every property regardless of earthing arrangement.',
    ],
    correctIndex: 2,
    explanation:
      "Supply arrangement is foundational knowledge. TN-S has a separate green/yellow earth tail from the cut-out back to the substation (older / rural); TN-C-S (PME) combines neutral and earth in the PEN, separated at the cut-out, and is the most common modern arrangement with open-PEN risk; TT has no incoming earth and the customer's electrode is the only earth path, needing an RCD at the origin. Each gives a different Ze, expected Zs and fault-current path. The MFT measures Ze and tells you the order of magnitude (TN-S/TN-C-S ~0.35–1.0 Ω; TT 1–200+ Ω); visual confirms it. BS 7671 Chapters 31 and 41 cover the per-system protection; A4:2026 added significant TN-C-S Open PEN requirements.",
  },
  {
    id: 'mod4-s4-sub2-fault-seq',
    question:
      'How does the BS 7671 643 test sequence differ when applied to FAULT DIAGNOSIS vs commissioning?',
    options: [
      'There is no difference — fault diagnosis runs the full commissioning sequence on every circuit, every time. You isolate the whole installation, dead-test and live-test every circuit in order, and the fault reveals itself somewhere in the readings. Targeting tests to the symptom is not permitted.',
      'Commissioning runs the full sequence systematically on every circuit; fault diagnosis runs a targeted subset driven by the symptom and hypothesis, escalating to the dead-test sequence only when the quicker live diagnosis is inconclusive. It goes that deep only when needed, saving customer time and money.',
      'Fault diagnosis runs the tests in reverse order — live tests first, then dead tests — whereas commissioning runs dead before live. The reversed order is what distinguishes a fault investigation from a commissioning test; the same tests are run on every circuit either way.',
      'Fault diagnosis uses only insulation-resistance testing and commissioning uses only loop testing. The two activities each rely on a single test type, so a fault investigation is just a whole-installation IR test and a commissioning is just a whole-installation Zs test.',
    ],
    correctIndex: 1,
    explanation:
      'Targeted testing is the fault-diagnosis approach. Worked example for an RCD nuisance trip on a kitchen circuit: clamp the RCD output (live, no isolation) to confirm cumulative leakage; if a single appliance spikes, disconnect and retest; only if the live diagnosis is inconclusive escalate to the dead-test sequence (isolate, IR-test the suspect circuit, EFLI to verify protection). Commissioning is exhaustive — verifying every aspect of a new install — while fault diagnosis is hypothesis-driven. Knowing when to dead-test vs live-test is part of the competence.',
  },
  {
    id: 'mod4-s4-sub2-pnb',
    question: "What's a PNB (protective neutral bonding) installation and how is it identified?",
    options: [
      "PNB (Protective Neutral Bonding) is a type of RCD that bonds the neutral to the protective conductor whenever it detects an earth fault. It sits in the consumer unit alongside the main switch and is identified by a 'PNB' label on the device front. It is unrelated to the supply earthing arrangement.",
      "PNB is the bonding conductor that links the consumer's gas and water pipes together. It is identified by the green/yellow main bonding clamps at the incoming services and has nothing to do with the neutral; the 'N' in the abbreviation stands for 'network', not neutral.",
      "PNB stands for 'Phase-Neutral Balance' — a three-phase arrangement where the loads are balanced across phases to keep the neutral current near zero. It is identified by measuring the neutral current at the origin; a near-zero reading confirms a PNB installation.",
      "PNB (Protective Neutral Bonding) is a TN-C-S arrangement where neutral and earth are bonded at a single defined point on the consumer's premises (the main earthing terminal), unlike PME where bonding can be at multiple network points. Identify it by a single deliberately-located, often-labelled bonding link from incoming neutral to the main earthing terminal at the cut-out.",
    ],
    correctIndex: 3,
    explanation:
      "PNB is one of the A4:2026 emphasis areas. It is a TN-C-S arrangement where the neutral-earth bond sits at a single defined point on the consumer's premises, whereas in PME the bonding can be at multiple points along the network. Wrong identification leads to wrong fault diagnosis on what becomes a 'TT-like' fault path under open-PEN conditions. EV chargers on TN-C-S installations need careful supply-side coordination — S-type RCD upstream, PNB bond, and Type B RCD at the charger. The apprentice's role is to recognise PNB on supply identification and apply the correct fault-diagnosis approach.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the typical Ze (earth fault loop impedance at origin) for each common UK supply arrangement?",
    options: [
      'TN-S, TN-C-S and TT all have the same Ze of around 0.35 Ω at the origin, because Ze is set by the supply transformer, not the earthing arrangement. The reading therefore cannot tell you which supply you have; only a visual inspection can.',
      'TN-S 0.5–1.0 Ω, TN-C-S/PME 0.35–0.65 Ω (the PEN gives a low-impedance return), TT 50–200+ Ω depending on soil and electrode, IT undefined. The Ze reading immediately tells you the arrangement, the available fault current and the protective measures needed, so always measure it at the origin first.',
      'TT has the lowest Ze (under 0.35 Ω) because the earth electrode gives a direct path to ground, while TN-C-S has the highest (50–200 Ω) because the PEN adds impedance. The reading is the reverse of what most apprentices expect, which is why TT properties clear faults fastest.',
      'Ze is always exactly 0.8 Ω on every UK supply, because that is the maximum the DNO is permitted to declare. Any reading above 0.8 Ω means a fault on the supply, so the Ze test is really a pass/fail check rather than a way of identifying the arrangement.',
    ],
    correctAnswer: 1,
    explanation:
      'Ze values are the fingerprint of the supply arrangement. The MFT (Megger MFT1741+) reads Ze at the origin in a few seconds; the value confirms the arrangement and tells you what to expect for downstream Zs values. Always read Ze at the start of any fault investigation to establish the baseline.',
  },
  {
    id: 2,
    question: 'Why does an OPEN PEN on TN-C-S create such a serious fault situation?',
    options: [
      'Because an open PEN immediately trips every RCD in the property. The loss of the combined neutral-earth conductor injects a large residual current that all the RCDs detect at once, so the whole installation goes dead. The danger is the sudden total loss of supply, not a shock risk.',
      'Because an open PEN doubles the supply voltage to 460 V across every circuit. With the PEN broken the phase voltage adds to itself, so appliances are over-driven and burn out; the hazard is equipment damage rather than electric shock, and an RCD clears it normally.',
      "On TN-C-S, neutral and earth share the PEN. If it breaks upstream, the customer's bonded metalwork (taps, radiators, EV charger chassis) rises toward phase voltage relative to true earth. The RCD sees no residual current so doesn't trip; the first sign is a tingle on metal taps or a 30+ V N–E reading at the cut-out.",
      'Because an open PEN only affects the lighting circuits. The neutral for power is separate from the neutral for lighting on TN-C-S, so a broken PEN simply leaves the lights dim while sockets work normally; it is an inconvenience rather than a serious hazard.',
    ],
    correctAnswer: 2,
    explanation:
      "Open PEN is the canonical L3-grade hazard on TN-C-S installations. The neutral and protective earth share the PEN between transformer and cut-out; if it breaks upstream the customer's neutral floats relative to the transformer star point and all the bonded metalwork lifts toward phase voltage. The RCD doesn't see it because the lifted-neutral voltage flows through the bonding network as an L–E volt-drop, not as imbalance. Protection is supply-side (DNO PEN maintenance) plus customer-side detection (Open PEN devices in modern EV chargers, smart meters, some new CUs), with A4:2026 adding explicit requirements in Reg 411.3.3. Always check N–E voltage at the cut-out at the start of any TN-C-S investigation.",
  },
  {
    id: 3,
    question:
      "What's the test procedure for diagnosing a fault on a TT installation, and how does it differ from TN-S/TN-C-S?",
    options: [
      'There is no difference — a TT installation is tested exactly like TN-S. The same Zs limits from Table 41.3 apply, overcurrent devices clear the earth faults, and the earth electrode plays no part in the test, so you can use your usual TN test plan unchanged.',
      "On TT you skip the earth tests entirely because the customer's electrode is the DNO's responsibility, not yours. Just IR-test the circuits at 500 V and check polarity; the loop and RCD tests are omitted because there is no reliable earth to test against.",
      'TT differs only in that you measure Zs and expect a very low reading — under 0.35 Ω — because the earth rod gives a direct path to ground. If the reading is high the electrode is fine and the fault is elsewhere; the RCD at the origin is optional on TT.',
      'On TT the earth electrode is the only return path — measure its resistance (typically 50–200 Ω, degrading over years) and rely on the 30 mA RCD at origin rather than overcurrent for earth-fault clearance. EFLI/Zs values are much higher than TN and bonding is stricter, so the diagnostic approach differs from TN throughout.',
    ],
    correctAnswer: 3,
    explanation:
      'TT installations have different fault characteristics from TN. The earth electrode is the only return path — measure its resistance with a dedicated tester (Megger DET3TC) or MFT earth-stake adaptor (typically 50–200 Ω, rising over years from drying and corrosion). Reg 411.5 requires a 30 mA RCD at origin (S-type if downstream RCDs are also 30 mA), so the origin RCD trip-time test replaces the overcurrent reliance of TN. EFLI/Zs values are much higher and are checked against the TT limit (often RA × IΔn ≤ 50 V), and bonding is stricter because the bonding network is the only fault path. The apprentice meets TT mainly on rural / older properties.',
  },
  {
    id: 4,
    question: "What's the difference between IT and TN-S supply arrangements?",
    options: [
      'IT has the neutral isolated from earth (or connected via high impedance), so a single earth fault gives no significant fault current — alarm only, used where one fault must not stop a process (chemical plants, hospital theatres). TN-S distributes neutral and earth separately from the transformer and clears faults normally via overcurrent / RCD.',
      "IT is the standard UK domestic supply where the earth and neutral are combined, and TN-S is the rural supply with an earth electrode. The 'I' in IT stands for 'Identical', meaning earth and neutral are the same conductor, the opposite of TN-S where they are separate.",
      'IT means the supply is single-phase and TN-S means it is three-phase. The letters describe the number of phases rather than the earthing, so an IT supply is what you find in a house and a TN-S supply is what you find on an industrial site.',
      'IT is a supply with no neutral at all — only three phases and an earth — while TN-S has a neutral. On IT you take all your loads phase-to-phase at 400 V, which is why it is used in factories; on TN-S you have a neutral for 230 V single-phase loads.',
    ],
    correctAnswer: 0,
    explanation:
      "IT systems are specialist. Hospital operating theatres, ITUs, certain industrial process plants. Single-fault tolerance is the IT design feature — you can have a single L–E fault on the system and continue operating, with an alarm prompting investigation. The apprentice doesn't normally work on IT but should know the system exists.",
  },
  {
    id: 5,
    question: "When investigating a fault on a circuit, what's the typical SEQUENCE of tests?",
    options: [
      'Fixed order regardless of symptom: isolate the whole installation, IR-test every circuit, then live-test every circuit, then re-energise. You never target the tests to the fault; the same exhaustive sequence runs on every job, which is why a simple flicker takes three hours to diagnose.',
      'Hypothesis-driven and escalating: visual + interview, then quick live tests (clamp, voltage at the suspect point), then — only if inconclusive — isolate for the dead tests and EFLI, and finally a PQ analyser. It runs from quick/cheap/safe to slow/expensive only as needed, and many faults solve in the first few steps.',
      'Always live tests first because they are quickest. Run Zs and RCD trip-time on the suspect circuit straight away, and only if those pass do you isolate for the dead tests. Starting live saves time and the dead tests are just a formality afterwards.',
      'Start at the furthest accessory and work back to the board, testing each point in turn. The fault is always at the end of the circuit under the most stress, so testing from the far end inwards finds it fastest, regardless of what the customer reported or any hypothesis.',
    ],
    correctAnswer: 1,
    explanation:
      "Hypothesis-driven test sequencing is the efficiency. A simple HRJ on the supply tail can be diagnosed in 10 minutes with thermal imaging + clamp meter + customer interview. Running the full BS 7671 643 sequence on every circuit takes 3 hours and finds the same fault. The faster route requires the discipline to know when 'enough' testing has confirmed the hypothesis.",
  },
  {
    id: 6,
    question: "What's a 'continuity proving' test and how is it different from R1+R2?",
    options: [
      "They are two names for the same test. 'Continuity proving' is the trade slang and 'R1+R2' is the formal term, but both produce the same precise loop-resistance figure on the MFT, so you can use either result on the certificate interchangeably.",
      'Continuity proving is done live and R1+R2 is done dead. The difference is purely whether the circuit is energised — continuity proving injects a test current with the supply on, while R1+R2 needs the circuit isolated; both give the same loop resistance.',
      "Continuity proving is a quick low-current (~200 mA) yes/no check that a connection exists, while R1+R2 is a precise measurement of a circuit's line + protective conductor loop resistance. You prove continuity to verify an isolation has fully disconnected a circuit; you measure R1+R2 to characterise it against expected design values.",
      'Continuity proving measures the insulation resistance between conductors, while R1+R2 measures the resistance through the conductors. One tells you the conductors are apart, the other that they are joined; together they confirm the circuit is wired correctly.',
    ],
    correctAnswer: 2,
    explanation:
      "Continuity proving (sometimes 'continuity check') is the quick yes/no test — a low-current 200 mA test on the MFT or multimeter continuity range that confirms a connection exists without giving a precise figure. R1+R2 is the precise loop-resistance measurement of a complete circuit. The MFT does both: use continuity proving for verification (is this circuit isolated? — supply-to-load reads OPEN), and R1+R2 for characterisation (does the loop match the expected design value?). Both have their place at different stages of fault work.",
  },
  {
    id: 7,
    question:
      'When testing EFLI, why must you confirm the supply is energised AND the protective device is in the ON position?',
    options: [
      'Because EFLI is a dead test that needs the circuit isolated. You switch the supply off and the protective device off so no current flows while the meter measures the loop resistance; energising the circuit during the test would damage the MFT.',
      "Because the energised supply charges the MFT's internal battery during the test. The meter draws its operating power from the live circuit, so the supply and protective device must be on simply to power the instrument, not because current needs to flow through the loop.",
      'Because the protective device must be ON so that it trips during the EFLI test and proves it works. The purpose of the test is to operate the breaker, so leaving it ON and the supply live lets you confirm disconnection at the same time as reading the impedance.',
      'Because EFLI is a LIVE test — the MFT injects a small fault current through the loop and reads the impedance from the response. With the supply off no current flows; with the protective device off the loop is broken upstream of the test point. Either way the meter shows OPEN or undefined, so both conditions are pre-requisites for a meaningful reading.',
    ],
    correctAnswer: 3,
    explanation:
      "Live-test pre-requisites are easy to forget. EFLI injects a small fault current through the loop and derives the impedance from the response; if the supply is off no current flows, and if the protective device is off the loop is broken upstream of the test point — both give an OPEN or undefined reading. The MFT (Megger MFT1741+) typically warns 'NO VOLTAGE' or 'CIRCUIT OPEN', but the discipline is to check upfront — supply on, device on, leads on the right test point, RCD-protected mode if needed — rather than waiting for the warning.",
  },
  {
    id: 8,
    question:
      "What's the apprentice's role when supply identification reveals an unusual or unexpected arrangement (e.g. TT in a built-up area, or three-phase supply you weren't expecting)?",
    options: [
      'Stop and verify before testing. An unexpected arrangement means the test plan no longer matches the installation, so update it to the actual supply, escalate to supervisor if unsure, revise the RAMS and brief the customer if scope changes — never push ahead with the plan you arrived with.',
      "Convert the supply to what you expected. If a built-up property turns out to be TT, install a connection to the supplier's earth to make it TN-C-S so your standard test plan applies; the conversion is a quick job the apprentice does on the spot.",
      'Carry on with the test plan you arrived with. The supply arrangement does not change the tests or the limits, so an unexpected TT or three-phase supply is irrelevant; record the readings against your usual TN references and report any failures.',
      'Refuse the job and rebook. An apprentice can only work on the exact supply described in the booking, so if you find anything different you must leave site and ask the office to send a fully qualified electrician instead.',
    ],
    correctAnswer: 0,
    explanation:
      "Supply identification is the first technical check on any fault-diagnosis visit. An unusual arrangement suggests either a genuinely TT property (rural, older, or specifically designed) needing a different approach, or an installation that isn't what the booking described (e.g. an older commercial site with an unbriefed three-phase supply). Either way the test plan must match the actual supply, with supervisor escalation if unsure and a customer brief if scope changes. Pausing-and-verifying when reality doesn't match expectations is part of safe working — unchecked assumptions become hazards.",
  },
];

const faqs = [
  {
    question: 'How do I tell TN-S from TN-C-S just by looking at the cut-out?',
    answer:
      'TN-S has a SEPARATE earth conductor leaving the cut-out — usually a separate green/yellow tail that goes to the main earth terminal. TN-C-S has the earth and neutral COMBINED at the cut-out side; the separation happens INSIDE the cut-out via a PEN bond, and the earth tail leaves the cut-out alongside the neutral. Modern installations are mostly TN-C-S; older urban / suburban properties may be TN-S. The MFT Ze reading tells you regardless of visual.',
  },
  {
    question: 'Can I test EFLI without RCDs tripping?',
    answer:
      "Yes — use the Hi-Z (no-trip) mode on the MFT. The Hi-Z mode injects a sequence of low-current pulses that statistically don't accumulate enough residual current to trip a 30 mA RCD. Slightly slower (1.5–2 seconds vs ~0.5 second for standard mode) and slightly less accurate (lower test current = lower signal-to-noise) but doesn't trip. Standard mode is for non-RCD circuits only. Megger MFT1741+ calls it 'Loop No-Trip' or 'Hi-Z'; Fluke and Kewtech have similar modes.",
  },
  {
    question: "What's the practical workflow for the first 10 minutes of a fault visit?",
    answer:
      '(1) Customer interview (3–5 minutes) — six questions framework. (2) Visual inspection of CU + main supply (1–2 minutes) — supply arrangement, signs of past faults, RCBO type, age estimate. (3) Ze measurement at origin (1 minute) — confirms supply arrangement, baseline. (4) Voltage measurement L–N, L–E, N–E at cut-out (1 minute) — checks for Open PEN signs. (5) Hypothesis formulation (1–2 minutes mental) — what fault types match the symptoms? Plan next 30–60 minutes of investigation. The first 10 minutes set up the rest of the visit.',
  },
  {
    question: "What if the customer doesn't know what kind of supply they have?",
    answer:
      "Most customers don't. You identify it visually + with the MFT. If the customer asks during the work, give a plain-English summary: 'You're on TN-C-S, which is the most common modern UK supply' or 'You're on TT, which means the property has its own earth electrode rather than relying on the supplier's'. The customer doesn't need the technical detail; the brief overview helps them understand any unusual aspects of the diagnosis.",
  },
  {
    question: 'Can a domestic property have a mixed supply arrangement?',
    answer:
      'Yes, occasionally. Examples: TT for the main installation but a separate TN-C-S supply for a granny annex; TN-C-S house with a TT-converted EV charger circuit (older A4 interpretation). The apprentice should map ALL supply arrangements on a multi-supply site at the start of fault diagnosis. Each supply has its own Ze, its own protection requirements, and its own fault characteristics.',
  },
  {
    question: "What happens if I run an EFLI test on a circuit that's not energised?",
    answer:
      "Modern MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) will detect the absence of supply voltage and refuse to run the test, displaying 'NO VOLTAGE' or 'NO SUPPLY' or similar. Older MFTs may run the test and produce an OPEN reading; the apprentice has to recognise OPEN means 'not actually a Zs reading'. Either way, the practical answer is the same: no useful test result without a live circuit. Always confirm the supply and protective device are both ON before pressing TEST.",
  },
];

const checks2 = [
  {
    id: 'mod4-s6-sub2-broken-ring',
    question:
      "You've measured a kitchen ring final at the DB and the end-to-end continuity reading on the line conductors is open-circuit (the L1-L2 reading shows 'OL' on the Megger MFT1741). The ring is broken somewhere. What's the correction technique?",
    options: [
      'Replace the entire ring cable — pull a fresh cable for the whole ring back to the consumer unit, the only reliable fix for an open conductor.',
      'Convert the ring into a radial — leave the open end disconnected and re-rate the protective device for radial operation, removing the fault without finding it.',
      'Increase the size of the protective device — fit a larger MCB so current flows past the high-resistance section and the symptom clears.',
      'Locate the break by half-split, access the affected accessory, re-terminate locally, then verify continuity is restored.',
    ],
    correctIndex: 3,
    explanation:
      "Most breaks are at accessory terminations (loose screw, fatigued conductor at a much-rewired socket), so the correction is to find the break with the half-split diagnostic, open the affected back-box/junction box, re-make the connection with the right method (manufacturer-torque screw, lever Wago, or crimp ferrule), and verify continuity (R1+R2 and end-to-end no longer open). Replacing the whole cable is wasteful; leaving it as a radial exceeds the cable's capacity; up-rating the MCB leaves the cable under-protected.",
  },
  {
    id: 'mod4-s6-sub2-light-driver',
    question:
      "A kitchen LED downlight has stopped working. The other downlights on the same circuit work. You've isolated, removed the failed downlight, tested at the connector — 230 V present at the connector when energised. What's the next move?",
    options: [
      'The LED chip has burnt out — fit a new GU10 LED bulb into the existing fitting and the job is done.',
      '230 V present means a polarity fault reversing line and neutral at the fitting — replace the connector with correct polarity to restore the LED.',
      'The driver has likely failed — replace the whole fitting (or just the driver where the model allows), matched to the run.',
      '230 V confirms an overheated fitting — wire a generic spare driver from the van across the LED module to get it working.',
    ],
    correctIndex: 2,
    explanation:
      'LED downlight failure is overwhelmingly driver failure (electrolytic capacitors degrade under heat) — not the LED chip, not polarity, not an overheat needing an improvised driver. The correction is to replace the whole fitting (most modern units have sealed integral drivers; some Aurora/Collingwood/Ansell allow a separate driver), matched for colour temperature and beam angle, verified under load before closing the ceiling. Mixing a non-matched generic driver risks wrong drive current and breaches BS 7671 134.1.1.',
  },
  {
    id: 'mod4-s6-sub2-shower-trip',
    question:
      "A 9.5 kW electric shower is tripping its 40 A RCBO under load. Diagnosis confirms the RCBO is healthy and the cable is sound. What's the most common cause and the correction?",
    options: [
      'The 40 A RCBO is undersized for a 9.5 kW shower, so it overloads and trips — fit a 50 A RCBO and the problem clears.',
      'Limescale build-up in the shower head is restricting flow and overheating the unit — descale the head and reset.',
      'A loose neutral at the pull-cord isolator is arcing under load — re-terminate the isolator to clear the trip.',
      'A degraded element with insulation breakdown under heat — earth leakage rises hot; replace the element.',
    ],
    correctIndex: 3,
    explanation:
      "The RCBO is tripping on residual current under load, not on overload, so up-rating it (a 9.5 kW shower draws ~41 A, marginal but not the issue here) would mask an earth-leakage fault; limescale trips the shower's own thermal cut-out, and a loose neutral gives heat/intermittent operation, not a clean RCD trip. The classic cause is element insulation breakdown: IR is acceptable cold but drops below 1 MΩ hot. Confirm with a cold-vs-hot IR test at 500 V; replace the element to the shower model and verify IR over 1 MΩ cold and hot.",
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question:
      "What's the half-split method for finding a broken-ring fault on a 32 A ring final and why is it efficient?",
    options: [
      'Open every socket on the ring at once and test them all together, then pick the faulty one — one trip round the circuit.',
      'At each step eliminate half the remaining circuit by testing at the mid-point, narrowing to the break in log&#8322;n measurements.',
      'Start at the socket nearest the consumer unit and work outward one socket at a time until you hit the break, never skipping a socket.',
      'Measure the total ring resistance and divide it by two to find the distance to the break — a single quick calculation.',
    ],
    correctAnswer: 1,
    explanation:
      "Half-split (binary search) eliminates half the remaining circuit per measurement: open the ring roughly mid-way, test each leg from the DB, the leg reading OL contains the break, repeat at that half's mid-point. A 12-socket ring locates the break in 4 measurements (log&#8322;12 ≈ 3.6) versus ~6 walking sequentially. Opening every socket at once is slow; working sequentially is the linear method half-split improves on; dividing the loop resistance does not locate a discrete break.",
  },
  {
    id: 2,
    question:
      "A two-way lighting circuit (landing light controlled from upstairs and downstairs switches) has a fault — the upstairs switch operates the light correctly, the downstairs switch does nothing. What's the diagnostic and correction?",
    options: [
      "The lamp itself has failed — one switch 'working' is coincidental, and a new bulb will restore control from both switches.",
      'The downstairs switch is wired as a one-way switch by mistake and can never work in a two-way circuit, so the whole circuit must be rewired.',
      'A strapper between the switches is broken or wrongly terminated — continuity-test the strappers, re-terminate the faulty connection, functional-test.',
      'The downstairs switch has lost its CPC, which disables its switching function until the earth is restored.',
    ],
    correctAnswer: 2,
    explanation:
      'Two-way wiring uses two strapper cables between the switches plus a common to the lamp; if one strapper is broken or wrongly terminated, one switch becomes inoperative. The lamp is sound (the other switch works) and the CPC is a protective conductor, not part of the switching path, so neither is the cause; a full rewire is unnecessary. Isolate, prove dead, continuity-test the strappers (near zero ohms when sound), re-terminate the loose terminal, then functional-test all switch combinations.',
  },
  {
    id: 3,
    question:
      'A 7.5 kW immersion heater has been replaced and the customer reports the new element is tripping the RCBO within minutes of switching on. What are the diagnostic possibilities?',
    options: [
      'The new element is faulty out of the box — modern elements fail often, so keep swapping elements until one holds.',
      'The thermostat is set too high, so the element overshoots and the over-temperature cut-out drops the supply.',
      'The cylinder is too small for a 7.5 kW element, so the water boils and the steam shorts the terminals.',
      'Dry-firing, a wiring mismatch, or upstream cable damage — check the element, the terminations and the cable IR in order.',
    ],
    correctAnswer: 3,
    explanation:
      'A brand-new element tripping immediately points to installation error or an upstream fault, not faulty stock, a thermostat setting (which affects cut-out at temperature, not an instant residual trip) or cylinder volume. Check in order: element dry-fired (cylinder not refilled — scorch marks, replace and refill before energising); wiring mismatch (wrong terminal/rating or polarity — re-terminate to instructions); upstream cable insulation damage exposed by the new load (IR-test the run with the element disconnected, then repair the affected section).',
  },
  {
    id: 4,
    question:
      "A workshop extractor fan motor with a 16 µF run capacitor has stopped running. The motor hums but doesn't start. What's the diagnostic and correction?",
    options: [
      'Run capacitor failure — discharge it safely, measure it with the MFT capacitance function, and replace like-for-like.',
      "The motor windings have burnt out — a humming motor that won't turn means an open winding, so the whole motor needs rewinding or replacing.",
      'The supply has lost a phase — single-phasing on a three-phase motor makes it hum without turning.',
      'The thermal overload has tripped and latched, holding the motor off — reset the overload and it will run.',
    ],
    correctAnswer: 0,
    explanation:
      "The run capacitor provides the phase shift that creates the starting field; when it degrades the motor energises but can't start — it draws stalled-rotor current, hums, and trips on overload after 10–30 s. It is a single-phase motor (no third phase to lose), the symptom is not a burnt winding, and a latched overload would stop it energising at all. Isolate, prove dead, discharge the cap through a 5–10 kΩ resistor, measure with the MFT (within ±10% of marked value), and replace same µF and voltage.",
  },
  {
    id: 5,
    question:
      "A high-resistance joint (HRJ) on a 32 A ring final has been diagnosed at a back-of-socket termination — the cable conductor has darkened, the screw is loose, the surrounding plastic is heat-marked but not melted. What's the correction technique?",
    options: [
      'Re-tighten the loose screw to the correct torque and leave the existing conductor in place — once the screw grips again the joint is sound.',
      'Re-make the termination — cut back the heat-affected copper, replace any damaged accessory, re-terminate to torque and re-test.',
      'Smear the darkened conductor with petroleum jelly to stop further oxidation, then re-terminate it into the same socket.',
      'Wrap the heat-marked conductor in extra insulation tape and move the connection to the spare terminal on the same socket.',
    ],
    correctAnswer: 1,
    explanation:
      'The darkened conductor has surface oxidation and partially-annealed copper that keep the contact resistance high, so re-tightening, greasing or shifting to another terminal all leave the failure mechanism in place and the fault returns in months. Cut back the conductor 10–15 mm, strip fresh insulation, replace the back-box/socket if melted, re-terminate to manufacturer torque (1.2 Nm typical for MK Logic Plus 2.5 mm²), then IR-test, R1+R2 and Zs on the affected leg.',
  },
  {
    id: 6,
    question:
      "A circuit is RCD-protected and the RCD is tripping intermittently — sometimes when an appliance starts, sometimes overnight when nothing is in use. What's the correction strategy?",
    options: [
      'Replace the RCD with a higher-rated 100 mA device so the small leakage no longer trips it, clearing the nuisance trips in one step.',
      'Disconnect the CPC on the affected circuit so there is no earth path for leakage current to flow and trip the RCD.',
      'Rule out a faulty RCD, then find the leakage — measure standing leakage with a clamp meter and isolate the leaky appliance.',
      "Wire the RCD's test button into the circuit so the customer can reset it remotely whenever it trips, avoiding repeat call-outs.",
    ],
    correctAnswer: 2,
    explanation:
      'A 100 mA RCD removes the 30 mA shock protection and is non-compliant; disconnecting the CPC is dangerous; rigging the test button defeats the protective function. Work it in order: confirm the RCD trips within spec at IΔn (300 ms) and 5×IΔn (40 ms); measure cumulative standing leakage with a clamp meter (should be well under 9 mA, ~30% of IΔn); disconnect appliances one at a time to find the leaky one (kitchen appliances are common); then repair the appliance or split the load across two RCDs.',
  },
  {
    id: 7,
    question:
      "An EICR has flagged a 'no main equipotential bonding to gas service' as a C2 — the cable is missing entirely. What's the correction technique?",
    options: [
      "Fit a 2.5 mm² G/Y conductor from the nearest socket's earth terminal to the gas pipe anywhere convenient, held with a jubilee clip.",
      'Bond the gas pipe to the water pipe with a 6 mm² conductor so the two services share a potential; no connection to the MET is needed.',
      'Run a 4 mm² conductor from the gas pipe to a separate earth electrode driven outside, creating an independent earth for the gas service.',
      'Run a 10 or 16 mm² G/Y bonding conductor from the MET to a BS 951 clamp within 600 mm of the gas meter, labelled and continuity-verified.',
    ],
    correctAnswer: 3,
    explanation:
      "Main protective bonding runs from the MET (not a socket earth, not service-to-service, not a separate electrode), sized against the main earthing conductor — 10 mm² or 16 mm² G/Y. Clamp it within 600 mm of the gas meter on the consumer's side, after the meter and before any branch (BS 7671 544.1.2), using a BS 951 clamp with the 'Safety Electrical Connection — Do Not Remove' label (514.13.1). Verify continuity from MET to clamp (under ~0.05 Ω), then issue the MWC + Schedule of Remedial Works closing the C2.",
  },
  {
    id: 8,
    question:
      "What's the verification routine after ANY rectification, regardless of which circuit?",
    options: [
      'The full BS 7671 Part 6 643 sequence — continuity, IR, polarity, R1+R2, Zs, RCD trip-time, functional test — recorded on the certificate.',
      'Just re-energise and check the appliance works — if the light comes on or the socket powers a load, the rectification is proven and no testing is needed.',
      "Carry out only an insulation-resistance test at 500 V — that single test confirms the wiring is sound and is all that's needed after a repair.",
      'Compare the new readings against the original EIC and only record them if they differ — matching readings need not be re-documented.',
    ],
    correctAnswer: 0,
    explanation:
      "BS 7671 Part 6 643 requires the full sequence on every worked-on circuit: continuity of CPC and conductors, IR at 500 V (250 V if electronics can't be isolated), polarity, R1+R2, Zs at the furthest point, RCD trip-time at IΔn where protected (300 ms; 40 ms at 5×IΔn), functional test, all recorded on the cert. A functional check or IR alone misses the other verifications, and every result must be recorded regardless of whether it matches historic values.",
  },
];

const faqs2 = [
  {
    question: "Why can't I just use a Wago in a junction box for every break I find?",
    answer:
      "You can use Wago 221 / 222 / 223 connectors at any joint that BS 7671 526.1 permits — but the box has to be MAINTENANCE-FREE if it's not accessible (BS 7671 526.3 for buried or otherwise inaccessible joints). Wago push-wire connectors with the lever (221, 222) installed in an enclosed junction box ARE permitted as maintenance-free under BS 7671 526.3 (the IET has confirmed this in published guidance). The technique is fine; the discipline is the box selection (BS 5733 / BS EN 60670-22 fire-rated for above-ceiling) and the location (don't bury in plaster unless the box is approved for that). The apprentice's mistake is to use a Wago on bare wire under a floorboard with no enclosure — that's a 526.3 breach regardless of the connector quality.",
  },
  {
    question: "How do I know the manufacturer's torque without the data sheet?",
    answer:
      'Approximate guidance for common sizes: 2.5 mm² into a typical UK socket terminal (MK, Crabtree, BG, Hager) — 1.0–1.5 Nm. 1.0 mm² into a typical lighting accessory — 0.5–0.8 Nm. 6 mm² into a 32 A immersion isolator — 2.0–2.5 Nm. 16 mm² into a CU main switch — 2.5–4.0 Nm. DIN-rail RCBO / MCB terminals (Hager, Schneider, ABB) — 2.0–3.0 Nm typical. These are starting points; for the actual job, look up the exact value on the manufacturer page (5 seconds on the phone). A torque screwdriver (Wera 7440, Wiha TorqueVario, Felo 100) is essential kit.',
  },
  {
    question: 'When is replacing a whole accessory better than re-terminating?',
    answer:
      "Three triggers. (1) HEAT DAMAGE — if the back-box plastic is melted, the front plate is heat-marked, or the contacts are pitted from arcing, replace the whole accessory. Plastic that's been heated past its softening point (typically 80–100 °C for ABS, higher for thermoset) won't recover its mechanical properties. (2) AGE / WEAR — accessories more than 25–30 years old are typically due for replacement when accessed for any work; the cost is small and the future reliability gain is significant. (3) UPGRADE OPPORTUNITY — moving from older non-RCD-protected to current spec, switching from 13 A to USB-A/USB-C combo socket, fitting screwless flatplate. Customer's choice but worth offering. Re-termination is fine when the accessory is sound and only the connection has degraded; replacement is right when the accessory itself shows damage or wear.",
  },
  {
    question: "What's the difference between a screw terminal, a Wago, and a crimp ferrule?",
    answer:
      'Three connection methods, each suited to different conductor / environment combinations. SCREW TERMINAL — direct conductor under a screw, manufacturer torque applied. Best for solid conductor 1.0–6.0 mm² into accessories where space is limited. WAGO 221 / 222 LEVER-ACTUATED — push-wire connector with a lever that releases for re-termination. Best for solid OR fine-stranded 0.2–4.0 mm² in junction boxes or above-ceiling joints. Maintenance-free when installed in an enclosure. CRIMP FERRULE — bootlace / pin terminal crimped onto a stranded conductor before insertion into a screw terminal. Best for stranded conductor (typically tri-rated control cable) into a screw terminal designed for solid (e.g. RCBO terminals, isolator terminals). Each method has a place; using the wrong method for the conductor type causes high-resistance joints.',
  },
  {
    question: 'How long does a typical fault correction take from arrival to leaving?',
    answer:
      "Domestic single-circuit rectification — typically 1.5–2.5 hours from arrival. Breakdown: 15 minutes greet + brief + access; 30 minutes diagnostic confirmation (re-run yesterday's diagnosis to verify nothing has changed); 30–60 minutes physical correction (depending on access difficulty); 20–30 minutes BS 7671 Part 6 verification testing; 20 minutes documentation (MWC + Schedule + customer hand-back). Small-commercial single-circuit — add 30–60 minutes for the larger DB, the more thorough customer brief, the additional safety isolation procedures. Three-phase or specialised systems (motor controls, fire alarm, EV) can extend significantly. The apprentice's plan accounts for all phases, not just the physical correction.",
  },
  {
    question: "What if I can't find the fault in the planned visit time?",
    answer:
      "STOP, escalate, don't push past your time budget. Three responses. (1) RE-BRIEF the customer — explain progress, what's been ruled out, what's outstanding. (2) ESCALATE to the supervisor — phone call describing what's been done; supervisor decides whether to send additional resource, leave the work for another visit, or change strategy. (3) MAKE-SAFE — if you've opened the installation and need to leave it, ensure the affected circuit is safely isolated, the DB is closed and locked, the customer's other circuits are working, and there's no exposed live or hazard. Coming back is normal; pushing past your time budget into late-evening tired-mistake territory is the cause of incidents. The apprentice's competence is to know when to stop, not to grind on hoping for a breakthrough.",
  },
];

export default function Lesson318E_4_4() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Identifying supply arrangement (TN-S, TN-C-S, TT, IT, PNB) for fault-diagnosis context;
        the BS 7671 643 test procedure adapted for fault investigation rather than commissioning;
        A4:2026 Open PEN and PNB protection layer.
      </p>

      <TLDR
        points={[
          'Supply identification is the first technical step. Visual + Ze measurement confirms TN-S / TN-C-S / TT / IT / PNB. Each has different fault characteristics.',
          "Open PEN on TN-C-S is the hazard RCDs don't catch. A4:2026 added Reg 411.3.3 Open PEN protection, particularly for EV chargers.",
          'Fault-diagnosis testing is hypothesis-driven and targeted; commissioning is exhaustive. Run only the tests that distinguish the candidate causes.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify common UK supply arrangements (TN-S, TN-C-S/PME, TT, IT, PNB) by visual inspection and Ze measurement.',
          'Recognise Open PEN risk on TN-C-S installations and apply the appropriate diagnostic check (N–E voltage at cut-out).',
          'Apply the BS 7671 643 test procedure in fault-diagnosis mode — targeted, hypothesis-driven, escalating from quick / live to thorough / dead only as needed.',
          'Distinguish continuity proving (yes/no) from R1+R2 measurement (precise loop resistance).',
          'Use Hi-Z (no-trip) EFLI mode on RCD-protected circuits.',
          'Recognise unusual supply arrangements and pause-and-verify before continuing the test plan.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Supply identification — visual + Ze</ContentEyebrow>

      <ConceptBlock
        title="Identify the supply at the cut-out before any other testing"
        plainEnglish="Each supply arrangement has different fault characteristics. The first technical step on any fault investigation is confirming what you're working on."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>TN-S</strong> — separate earth conductor from cut-out. Older urban properties.
            Ze typically 0.5–1.0 Ω.
          </li>
          <li>
            <strong>TN-C-S (PME)</strong> — combined PEN; bonded to earth at cut-out. Most common
            modern UK arrangement. Ze typically 0.35–0.65 Ω. Open PEN is the supply-side hazard.
          </li>
          <li>
            <strong>TT</strong> — no incoming earth; customer's own electrode. Rural properties.
            Ze typically 50–200 Ω.
          </li>
          <li>
            <strong>IT</strong> — isolated neutral; specialist (hospital, process plant). Ze
            undefined.
          </li>
          <li>
            <strong>PNB</strong> — TN-C-S with single defined bonding point on consumer's
            premises. A4:2026 layer for EV chargers.
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard
        {...videos.zeTest}
        topic="Ze test on a single-phase supply"
        caption={
          <>
            Craig Wiltshire runs a Ze (external earth fault loop impedance) test on a single-phase
            domestic cut-out — the same measurement you take to confirm the supply arrangement and
            baseline the loop impedance before any 1×IΔn RCD or Zs work on the circuits
            downstream.
          </>
        }
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 411.3.3 (Open PEN protection — A4:2026 reinforcement)"
        clause={
          <>
            "Where the supply is in accordance with TN-C-S system, additional protective measures
            shall be provided to mitigate the risk of fault to true earth potential consequent
            upon a broken or disconnected combined neutral and protective conductor (Open PEN)."
          </>
        }
        meaning={
          <>
            A4:2026 strengthened Open PEN protection requirements, particularly for EV chargers
            and certain other installation types. The fault investigator on a TN-C-S
            installation routinely checks N–E voltage at the cut-out as part of supply
            identification — anything more than a few volts triggers escalation to DNO.
          </>
        }
        cite="Source: BS 7671:2018 incorporating Amendment 2:2022 + A4:2026 progression."
      />

      <InlineCheck {...checks[0]} />

      <SectionRule />

      <ContentEyebrow>Open PEN and PNB</ContentEyebrow>

      <ConceptBlock
        title="The supply-side hazards A4:2026 reinforced"
        onSite="Open PEN is invisible to standard RCDs. The customer's bonded metalwork can be at significant voltage above true earth without any indication. Detection: N–E voltage at cut-out should be near zero; anything >5 V is suspect; anything >30 V is dangerous."
      >
        <p>Open PEN diagnostic check (do this at the start of every TN-C-S investigation):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Multimeter (CAT IV-rated) on AC volts at the cut-out.</li>
          <li>L–N reading: ~230 V (nominal supply).</li>
          <li>L–E reading: ~230 V (should match L–N within a volt).</li>
          <li>N–E reading: should be &lt;5 V.</li>
          <li>If N–E &gt;30 V: STOP. Open PEN suspected. DNO call.</li>
        </ul>
        <p>
          PNB (A4:2026 EV charger context): the customer-side PNB bond + S-type RCD upstream +
          Type B RCD at the EV charger form the layered protection. The apprentice's role is
          recognising the PNB arrangement and verifying the bonding integrity during fault
          investigation.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks[2]} />

      <SectionRule />

      <ContentEyebrow>Fault-diagnosis test sequence</ContentEyebrow>

      <ConceptBlock
        title="Targeted testing, not exhaustive commissioning"
        plainEnglish="Commissioning runs the full BS 7671 643 sequence systematically. Fault diagnosis runs a subset — only the tests that distinguish the candidate hypotheses. Saves customer time and money; finds the fault faster."
      >
        <p>Typical fault-diagnosis test sequence (escalating):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>(1) Visual + customer interview (cost: free).</li>
          <li>
            (2) Live tests — clamp meter on suspect circuit, voltage at suspect points (low risk,
            no isolation).
          </li>
          <li>(3) Thermal imaging at suspect locations (live or under load; non-invasive).</li>
          <li>(4) Targeted live tests — EFLI on suspect circuit (Hi-Z mode if RCD-protected).</li>
          <li>
            (5) If above inconclusive — isolate, dead tests (continuity, R1+R2, IR on suspect
            circuit only).
          </li>
          <li>(6) If still inconclusive — full BS 7671 643 sequence on affected circuit.</li>
          <li>(7) If still inconclusive — install PQ analyser for 24–72 hours.</li>
        </ul>
        <p>
          Many faults solve at steps 1–3 without ever needing the full sequence. Escalate only as
          needed.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks[1]} />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 312.2.1.1"
        clause={
          <>
            "312.2.1.1 now includes a protective neutral bonding (PNB) figure and requirements."
          </>
        }
        meaning={
          <>
            A4:2026 added Protective Neutral Bonding (PNB) explicitly into Reg 312.2.1.1. PNB is a
            TN-C-S variant where the bond between PE and N happens at the consumer&apos;s
            installation, not at the cut-out. When you&apos;re identifying the supply on a
            diagnosis visit, PNB is the new arrangement to recognise alongside TN-S, TN-C-S and
            TT.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Regulation 312.2.1.1 (system earthing arrangements, updated in A4:2026 to include PNB)."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 411.4.1"
        clause={
          <>
            "In a TN system, the integrity of the earthing of the installation depends on the
            reliable and effective connection of the PEN or PE conductors to Earth. Where the
            earthing is provided from a public or other supply system, compliance with the
            necessary conditions external to the installation is the responsibility of the
            distributor."
          </>
        }
        meaning={
          <>
            Identifying the supply isn&apos;t just labelling it &mdash; it&apos;s identifying
            which party owns the earth integrity. On TN, the upstream PEN is the DNO&apos;s
            responsibility, which is why the L&ndash;E and N&ndash;E readings at the cut-out are
            what you take first and what triggers a STOP / DNO call if they&apos;re wrong.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 411.4.1, verbatim."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Skipping the supply identification step"
        whatHappens={
          <>
            Apprentice arrives at a rural property assuming TN-C-S (their normal). Does not
            measure Ze at origin. Runs full fault diagnosis assuming TN-C-S Zs values. Ze is
            actually 80 Ω (it is a TT installation with degraded electrode); Zs values that "fail"
            against TN-C-S Table 41.3 are actually within TT spec. Apprentice incorrectly reports
            the installation as non-compliant; customer disputes; firm gets a complaint. Real
            diagnosis is the electrode needs replacement and the system is otherwise fine.
          </>
        }
        doInstead={
          <>
            Measure Ze at the start of every fault investigation. The Ze value tells you the
            supply arrangement and the expected Zs ranges. Without that baseline, all your
            downstream measurements are interpreted against the wrong reference.
          </>
        }
      />

      <CommonMistake
        title="Running every test on a TN-C-S installation without checking N–E voltage"
        whatHappens={
          <>
            Apprentice investigates an RCD trip on a TN-C-S installation. Runs continuity, IR,
            EFLI on the affected circuit. Does not measure N–E at cut-out. Misses an open PEN that
            is lifting the customer's earth bonding to 60 V above true earth. The RCD trip was the
            symptom; the open PEN was the cause. Apprentice reports "no fault found"; customer
            takes a shock from a tap two days later.
          </>
        }
        doInstead={
          <>
            Always measure N–E at cut-out at the start of any TN-C-S investigation. Below 5 V =
            healthy; 5–30 V = suspect, log and escalate; above 30 V = STOP, DNO call. Open PEN is
            the supply-side hazard that standard RCD protection does not see.
          </>
        }
      />

      <Scenario
        title='Customer reports "tingles when I touch the kitchen tap"'
        situation={
          <>
            Customer in a 1990s built-up suburban property. They report intermittent 'tingle' when
            they touch the kitchen tap, particularly noticeable when the boiler is firing.
            Property is TN-C-S.
          </>
        }
        whatToDo={
          <>
            Stage 1: customer interview confirms tingle is on the kitchen mixer tap, intermittent,
            worse when boiler runs. Visual: CU is Hager 12-way RCBO; main bonding to gas pipe
            present; supplementary bonding to kitchen tap not present (relies on equipotential
            bonding). Stage 2: hypothesis. Three candidates — (A) Open PEN on the supply lifting
            customer earth; (B) compromised main bonding (cracked clamp, corroded); (C) parasitic
            earth current from a bonded appliance. Stage 3: targeted tests. Most discriminating:
            N–E voltage at cut-out under load (boiler firing). Stage 4: measure N–E with boiler
            off — reads 1 V (healthy). Measure N–E with boiler firing — reads 38 V. Diagnosis
            confirmed: Open PEN intermittent, exposed under load. Stage 5–6: STOP. DO NOT continue
            investigation. Customer-side fault diagnosis won't fix a supply-side problem. Make
            safe — turn off boiler, recommend customer minimise use of bonded metalwork until
            rectified. Stage 7: call the DNO (Western Power, UK Power Networks, etc.) to report
            Open PEN; brief customer; document on job sheet. The DNO will investigate the supply
            network. Apprentice does not attempt customer-side fix.
          </>
        }
        whyItMatters={
          <>
            Open PEN is a regulated supply-side issue that the customer's electrician cannot fix.
            Recognising the symptoms (tingle on bonded metalwork, N–E voltage above expected) and
            knowing to escalate to the DNO is the step-up. Continuing customer-side
            investigation would waste time and miss the actual fault. The safety briefing to the
            customer (minimise use of bonded metalwork) is the responsible action while the DNO
            investigates.
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Ze, Zs and the loop impedance hierarchy</ContentEyebrow>

      <ConceptBlock
        title="Ze, R1+R2, Zs — what each measurement tells you"
        plainEnglish="Ze is the earth fault loop impedance from the origin (cut-out) measured back through the supply. R1+R2 is the resistance of the line + protective conductor measured at the accessory. Zs is the total earth fault loop impedance measured at the furthest accessory. Algebraically: Zs = Ze + (R1+R2). Each tells you something different about the fault path."
        onSite="Standard MFT sequence on a fault investigation: (1) Ze at origin (Megger MFT1741+ in 2-wire loop mode, between L and main earth terminal); (2) R1+R2 at the accessory (continuity mode, between supply L and supply CPC at the accessory, with circuit isolated); (3) Zs at the accessory (live loop test, RCD-protected uses Hi-Z mode). Compare measured Zs to BS 7671 Table 41.3 / 41.4 limits for the protective device."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Ze typical ranges</strong> — TN-S 0.5-1.0 Ω; TN-C-S 0.35-0.65 Ω; TT 50-200+ Ω;
            IT undefined.
          </li>
          <li>
            <strong>R1+R2</strong> — depends on circuit length and conductor sizes. BS 7671 OSG
            (On-Site Guide) Appendix has typical values per cable size and length.
          </li>
          <li>
            <strong>Zs limit</strong> — Table 41.3 (BS EN 60898 MCBs) or 41.4 (BS EN 61009 RCBOs).
            Example: 32 A B-curve MCB Zs limit 1.37 Ω at 230 V; 16 A B-curve 2.73 Ω (BS
            7671:2018+A4:2026).
          </li>
          <li>
            <strong>Zs reading high</strong> — fault path has higher impedance than expected.
            Likely causes: HRJ in supply, broken or high-resistance CPC, bad MCB connection.
          </li>
          <li>
            <strong>Zs reading inconsistent</strong> — varies between MFT readings on same
            circuit. Likely intermittent connection somewhere; vibrate cable runs and retest.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Live tests with the supply on</ContentEyebrow>

      <ConceptBlock
        title="The five live tests done with supply energised"
        plainEnglish="Live tests need the supply on and the protective device closed. They tell you about the system in service — how it actually behaves under load. Five common live tests in fault diagnosis: voltage measurement, current measurement (clamp), Zs (loop), RCD trip-time, polarity check."
        onSite="Standard live-test kit: Fluke 117 multimeter (TRMS), Fluke 369 FC clamp meter, Megger MFT1741+ MFT (loop and RCD functions). Live tests carry shock and arc-flash risk; PPE on (Class 0 gloves, arc-rated top, safety glasses), insulated tools (Wera VDE, Knipex VDE), GS38 leads, witness present for any live work above 50 V AC."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Voltage L-N / L-E / N-E</strong> — confirms supply present and balanced.
            Expected: L-N ≈ 230 V; L-E ≈ 230 V; N-E ≈ 0 V (TN); 0-5 V (TT).
          </li>
          <li>
            <strong>Current with clamp</strong> — confirms load drawing expected current.
            Spikes/dips indicate cycling or transient loads.
          </li>
          <li>
            <strong>Zs measurement</strong> — earth fault loop impedance at the accessory. Hi-Z
            mode for RCD-protected.
          </li>
          <li>
            <strong>RCD trip-time</strong> — at 1× and 5× rated trip current. Within BS EN
            61008/61009 limits.
          </li>
          <li>
            <strong>Polarity check</strong> — voltage L to E (should be ~230 V), N to E (should be
            ~0 V). Reversed polarity = both ~115 V or wrong reading. Common on borrowed-neutral or
            wrong-wired accessories.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Dead tests with the supply isolated</ContentEyebrow>

      <ConceptBlock
        title="The four dead tests done with supply off"
        plainEnglish="Dead tests need the circuit isolated and proved dead. They tell you about the wiring system itself — its condition independent of load. Four common dead tests in fault diagnosis: continuity (R1+R2), insulation resistance, polarity (continuity-based), ring continuity."
        onSite="Standard dead-test kit: Megger MFT1741+ in continuity / IR / RCD modes. Apply BS 7671 643 sequence — continuity first (pass needed before IR), then IR at 500 V (250 V if electronic loads can't be disconnected), then polarity, then for ring circuits the three-step ring continuity test."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Continuity / R1+R2</strong> — line + CPC loop resistance from origin to
            accessory. Verifies CPC is intact and resistance is within design.
          </li>
          <li>
            <strong>Insulation resistance L-L / L-E / N-E</strong> — at 500 V test. Pass: ≥1 MΩ
            minimum, typically &gt;100 MΩ on healthy circuit. Below 1 MΩ = failed; below 0.5 MΩ =
            severe insulation breakdown.
          </li>
          <li>
            <strong>Polarity (continuity-based)</strong> — confirm L wire is connected to L
            terminal, N to N, CPC to earth. Continuity tests between supply terminals and
            accessory terminals confirm correct identification.
          </li>
          <li>
            <strong>Ring continuity</strong> — three-step test on ring final circuits. Step 1: r1,
            rn, r2 measured separately at the DB. Step 2: cross-connect L and N, measure (r1+rn)/4
            at each socket — should be the same at every socket if ring is continuous. Step 3:
            cross-connect L and CPC, measure (r1+r2)/4 at each socket — same logic.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Combining live and dead — the diagnostic picture</ContentEyebrow>

      <ConceptBlock
        title="Building the complete picture from multiple test results"
        plainEnglish="No single test gives the diagnosis. The apprentice combines results from multiple tests to build the complete picture — IR low + Zs high + thermal hot spot = HRJ at a specific terminal. Each test is a constraint that narrows down the candidate locations."
        onSite="Document each measurement on the job sheet with location, test type, instrument used, reading, expected value, pass/fail. The pattern across all readings tells the story. Modern MFTs (Megger MFT1741+, Fluke 1664FC) record readings with timestamp and download to PowerSuite / FlukeView Forms for printable test reports."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Cross-correlation</strong> — does the IR test result match the Zs result? Both
            should agree on whether insulation is healthy.
          </li>
          <li>
            <strong>Spatial pattern</strong> — readings at different accessories along the
            circuit. A pattern (worsening towards far end) localises the fault.
          </li>
          <li>
            <strong>Temporal pattern</strong> — readings at different times of day or under
            different loads. Intermittent faults show variability.
          </li>
          <li>
            <strong>Comparison to design</strong> — every reading compared to BS 7671 limit AND to
            design value. Both must pass.
          </li>
          <li>
            <strong>Documentation</strong> — full record of every test taken, every reading
            recorded. Forms the basis of the certificate, the customer report, and the audit
            trail.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Test sequence — the order matters</ContentEyebrow>

      <ConceptBlock
        title="BS 7671 643 sequence — why dead before live"
        plainEnglish="BS 7671 643 sets the order: dead tests before live tests. Reasoning: dead tests verify insulation and continuity; if either fails, live testing risks damage to equipment or operative. Don't apply 230 V to a circuit you haven't yet proven safe to energise."
        onSite="Sequence in fault diagnosis: (1) visual + customer interview; (2) supply identification (Ze + voltage at cut-out); (3) IF working dead — isolate, lock-off, prove dead, run continuity / IR / polarity; (4) restore supply, run Zs and RCD trip-time; (5) functional test of equipment. The discipline of the sequence prevents 'testing yourself into a fault' — accidentally damaging equipment by energising before confirming safe."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Why dead first</strong> — verifies the system is safe to energise. If IR
            fails, you don't apply 230 V.
          </li>
          <li>
            <strong>Continuity before IR</strong> — IR test injects 500 V; if continuity is
            broken, the test reads INCORRECTLY high (no closed circuit to test). Continuity
            confirms there's a circuit before you IR-test it.
          </li>
          <li>
            <strong>Polarity before energising</strong> — verify L on L terminal, N on N. Wrong
            polarity energising = phase voltage on what should be neutral; unsafe.
          </li>
          <li>
            <strong>Zs after restoration</strong> — earth fault loop impedance test needs supply
            on. Confirms protective device will operate correctly.
          </li>
          <li>
            <strong>RCD trip-time last</strong> — RCD test trips the protection. Do this at the
            end so you don't have to re-energise multiple times.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Supply identification is the first technical step. Visual + Ze measurement confirms TN-S / TN-C-S / TT / IT / PNB.',
          'Each supply arrangement has different fault characteristics — Ze ranges, expected Zs values, protection requirements.',
          'Open PEN on TN-C-S is invisible to standard RCDs. N–E voltage check at cut-out is the diagnostic. A4:2026 reinforced protection requirements (Reg 411.3.3).',
          'PNB is TN-C-S with single defined customer bonding point. A4:2026 emphasis area for EV charger protection.',
          'Fault-diagnosis testing is hypothesis-driven and targeted; not the full BS 7671 643 commissioning sequence.',
          'Escalating test sequence: visual / interview → live tests → thermal → targeted EFLI → dead tests on suspect circuit → full sequence → PQ analyser.',
          'Hi-Z (no-trip) EFLI mode for RCD-protected circuits; standard mode for non-RCD only.',
          'Unusual supply arrangements pause-and-verify — update test plan to match what is actually there.',
        ]}
      />

      <Quiz
        title="Identifying supply + test procedure — knowledge check"
        questions={quizQuestions}
      />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The four most common fault patterns the apprentice meets — broken ring final, failed
        LED driver, shower / immersion element insulation breakdown, capacitor / motor failure —
        paired with the diagnostic confirmation, the correction technique and the BS 7671 Part 6
        verification.
      </p>

      <TLDR
        points={[
          'Broken ring final: half-split diagnostic narrows the location quickly; correction is local re-termination, not cable replacement.',
          'Failed LED downlight: replace the whole fitting (driver failure is the dominant mode); like-for-like for the rest of the run.',
          'Shower / immersion intermittent trip: cold-vs-hot IR test on the element finds insulation breakdown; correction is element replacement.',
          "Single-phase motor won't start: capacitor failure most likely; MFT capacitance test confirms; like-for-like cap replacement.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Apply the half-split (binary search) diagnostic technique to broken-ring and broken-radial faults.',
          'Diagnose and correct LED downlight failures, distinguishing driver failure from cable / connection failure.',
          'Diagnose and correct shower / immersion element insulation breakdown using cold-vs-hot IR comparison.',
          'Diagnose and correct single-phase motor capacitor failure using the MFT capacitance function.',
          'Re-make a high-resistance joint (HRJ) properly — cut back, fresh strip, manufacturer torque, replace damaged accessories.',
          'Apply the BS 7671 Part 6 643 verification routine on every rectified circuit, every time.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Broken ring + the half-split technique</ContentEyebrow>

      <ConceptBlock
        title="Half-split (binary search) is the efficient technique for any multi-point circuit fault"
        plainEnglish="A 12-socket ring with a break somewhere takes log&#8322;12 (= 4) measurements to locate the break by half-split, vs an average of 6 measurements walking sequentially. Twelve becomes four; thirty becomes five. The technique scales — the bigger the circuit, the more efficient half-split becomes."
        onSite="The technique is — open the ring at a roughly mid-point socket; test continuity from the DB to that socket on each leg of the ring; the leg that reads OL contains the break; repeat at the mid-point of that half. Practical step: have the customer's permission to open accessories, work cleanly (one box at a time, restore before moving on), document each measurement on a sketch as you go."
      >
        <p>The half-split walk-through on a 12-socket kitchen ring:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Step 1</strong> — open socket #6 (mid-point). Test L1 leg from DB to socket 6
            — reads 0.45 &Omega; (good). Test L2 leg from DB to socket 6 — reads OL (open). Break
            is on the L2 leg between socket 6 and the DB.
          </li>
          <li>
            <strong>Step 2</strong> — open socket #3 (mid-point of the suspect leg). Test L2 leg
            from DB to socket 3 — reads 0.22 &Omega; (good). Break is between socket 3 and socket
            6.
          </li>
          <li>
            <strong>Step 3</strong> — open socket #4 or #5; test progressively. Break is between
            socket 4 and socket 5.
          </li>
          <li>
            <strong>Step 4</strong> — physically inspect the connections at sockets 4 and 5. Loose
            terminal at socket 5 found and re-made.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.1"
        clause={
          <>
            "Every electrical connection between conductors and between a conductor and other
            equipment shall provide durable electrical continuity and adequate mechanical strength
            and protection."
          </>
        }
        meaning={
          <>
            Reg 526.1 governs every connection on the installation. For broken-ring rectification,
            the new connection must be made with the right method (manufacturer torque on screw
            terminals, lever-actuated Wago for fine stranded into a junction box, crimp ferrule
            for stranded into a screw), with the right material (BS 951 clamps for bonding,
            manufacturer-recommended ferrules for stranded), and to the right standard (BS EN
            60998 for connectors, BS EN 60670 for boxes). 'Just twist together and tape' is a
            526.1 breach.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 526.1 — IET Wiring Regulations 18th Edition Amendment 4."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <VideoCard {...videos.ringFinalTest} topic="Ring final continuity test" />

      <SectionRule />

      <ContentEyebrow>LED downlight + driver failure</ContentEyebrow>

      <ConceptBlock
        title="Driver failure is the dominant mode on integrated LED fittings"
        onSite="Modern integrated LED downlights (Aurora, Collingwood, Ansell, Robus) have an electrolytic capacitor in the driver that ages under heat — the kitchen ceiling void temperature can hit 50–60 °C in summer. The capacitor's electrolyte dries out over 3–7 years and the driver fails. The LED chip itself is normally fine for 20+ years; the driver is the wear part. The correction is whole-fitting replacement (most modern fittings have sealed integral drivers) matched for colour temperature and beam angle to the rest of the run."
      >
        <p>The LED downlight correction routine:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Confirm 230 V at the connector</strong> — rules out cable / circuit fault;
            confirms the failure is in the fitting itself.
          </li>
          <li>
            <strong>Match the replacement</strong> — colour temperature (2700 K warm, 3000 K soft
            white, 4000 K cool, 5000 K daylight); beam angle (40&deg; spot, 60&deg; flood, 90&deg;
            wide); cut-out size (typically 70 mm or 75 mm); fire-rating (60 / 90 minute IC-rated
            for ceilings above habitable rooms).
          </li>
          <li>
            <strong>Fit + connect</strong> — typically a GU10-style push-fit connector or a
            screw-terminal block; manufacturer instructions on terminal torque if applicable.
          </li>
          <li>
            <strong>Verify under load</strong> — energise; lights up; if dimmable, dim across the
            range to verify dimmer compatibility.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Shower / immersion + element insulation breakdown</ContentEyebrow>

      <ConceptBlock
        title="Element IR breakdown under heat is the canonical 'intermittent trip' on heating circuits"
        plainEnglish="A shower or immersion element is a coiled resistive heater inside a sealed metal sheath immersed in water. Over years, mineral deposits (limescale especially in hard-water areas), thermal cycling and water exposure weaken the insulation between the live coil and the earthed sheath. When cold the IR is acceptable; when hot the IR drops and earth leakage rises above the 30 mA RCD trip threshold."
        onSite="Diagnostic technique: ISOLATE; PROVE DEAD at the appliance terminals; DISCONNECT the element from the supply at the appliance terminals; TEST IR at 500 V cold (typically over 1 MΩ on a healthy element); WAIT until the customer confirms the trip pattern (they fired up the shower for 5 minutes, it tripped at 4 minutes); RE-TEST IR with the element still hot from the recent run — if it's dropped to under 1 MΩ (often under 100 kΩ on a failing element), that's the diagnostic confirmation. CORRECTION: replace the element (same model, same rating, same termination orientation) following manufacturer instructions."
      >
        <p>The element-replacement routine:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Isolate at the dedicated CU breaker</strong> + lock-off + prove dead at the
            immersion / shower terminals.
          </li>
          <li>
            <strong>Drain the cylinder</strong> (immersion) or shut off the water supply and drain
            the unit (shower) before removing the element; new element fits to a wet seat is fine,
            new element fitted dry-fires within seconds.
          </li>
          <li>
            <strong>Remove the failed element</strong> with the correct spanner (typically a box
            spanner for immersion elements, a hex key for shower elements); save the gasket /
            O-ring or replace if perished.
          </li>
          <li>
            <strong>Fit the new element</strong> — match the rating (1 kW, 2 kW, 3 kW, 7.5 kW, 9.5
            kW) and the termination configuration; torque to manufacturer spec.
          </li>
          <li>
            <strong>Refill the cylinder / restore water supply</strong> BEFORE energising; bleed
            any air locks.
          </li>
          <li>
            <strong>Verify post-replacement IR</strong> — over 1 M&Omega; cold AND after a
            10-minute run hot.
          </li>
          <li>
            <strong>Functional test</strong> — full hot-water draw; thermostat cuts in / cuts out
            at the set temperature.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>RCD type matching during the repair</ContentEyebrow>

      <ConceptBlock
        title="Like-for-like only works when the load profile hasn’t changed"
        plainEnglish="Replacing an RCD or RCBO is the moment to check whether the device type still suits the load. A circuit installed in 2010 with a Type AC RCBO might today be feeding LED drivers, an EV charge point or a heat-pump — loads with DC content that Type AC can’t see."
        onSite="On a fault-correction visit it’s common to find a Type AC RCBO protecting modern electronic loads. The repair is the chance to upgrade to Type A (DC component up to 6 mA), Type F (single-phase frequency converters) or Type B (smooth DC residual currents). Don’t blindly replace the same code that came out."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Type AC</strong> &mdash; legacy resistive / inductive loads. Increasingly rare
            on new installations.
          </li>
          <li>
            <strong>Type A</strong> &mdash; default for modern domestic. Handles pulsating DC
            residual.
          </li>
          <li>
            <strong>Type F</strong> &mdash; single-phase variable-speed drives, frequency
            converters.
          </li>
          <li>
            <strong>Type B</strong> &mdash; smooth DC residual: EV chargers without internal Type
            B detection, three-phase VSDs, large PV inverters.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Termination quality and torque</ContentEyebrow>

      <ConceptBlock
        title="The single most overlooked detail in fault repair"
        plainEnglish="Most repeat faults trace to a poor termination. Strip length wrong, conductor not fully under the pinch, screw torqued by feel rather than to spec, ferrule missing on a flexible. The step-up is to torque every termination to the manufacturer’s value with a calibrated screwdriver."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Wera Kraftform 7440 / 7441 torque screwdriver</strong> &mdash; adjustable,
            audible click at set torque, calibration cert.
          </li>
          <li>
            <strong>Typical torque values</strong> &mdash; MCB busbar 2.0&ndash;2.5&nbsp;Nm,
            13&nbsp;A socket terminal 0.6&ndash;0.8&nbsp;Nm, RCBO terminal 1.2&ndash;1.5&nbsp;Nm.
            Always check the device data sheet.
          </li>
          <li>
            <strong>Strip length</strong> &mdash; manufacturer&apos;s indicator inside the
            terminal block. Long = exposed conductor outside the pinch; short = insulation in the
            pinch.
          </li>
          <li>
            <strong>Stranded conductor</strong> &mdash; bootlace ferrule (Knipex 97 53 14,
            Weidmuller PZ6 Roto crimp tool) &mdash; never twisted bare strands into a screw
            terminal.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Ring final continuity faults — three-test method and the high-resistance loop"
        plainEnglish="Ring final circuit faults often present as a tripping RCBO under heavy load (kettle plus toaster) or as warm sockets in one corner of the room. The diagnostic is the three-test continuity method — end-to-end resistance on each conductor (line, neutral, CPC) at the consumer unit, then cross-connection to verify the ring is complete and balanced. A broken leg shows as a missing reading; a high-resistance termination shows as a high reading on the affected leg."
        onSite="Disconnect the ring at the CU. Test L-L end-to-end (should read about twice the per-leg resistance); test N-N end-to-end (similar reading); test CPC-CPC end-to-end. If any reading is OL, the leg is broken — find the break by half-split. If a reading is significantly higher than the others, a high-resistance termination is somewhere on that leg — usually a back-box that has been over-tightened, a screw terminal degraded by heat, or a junction box with a loose conductor. Walk the ring with a low-resistance ohmmeter and the wander lead to localise."
      >
        <p>Ring continuity test pattern:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Test 1 — end-to-end on each conductor</strong> — line, neutral, CPC measured
            at the CU with the ring opened. Each should read consistent with the cable run length.
          </li>
          <li>
            <strong>Test 2 — cross-connection</strong> — line of one leg connected to neutral of
            the other; measure at every socket. Reading should be roughly half the end-to-end
            value (because each socket sees half of each leg in parallel).
          </li>
          <li>
            <strong>Test 3 — repeat for CPC</strong> — line of one leg connected to CPC of the
            other; measure at every socket; similar half-value pattern.
          </li>
          <li>
            <strong>Diagnostic patterns</strong> — OL on one test = broken leg; high reading at
            one socket = high-resistance termination local to that socket; consistent high reading
            across the ring = degraded conductor over the whole loop.
          </li>
          <li>
            <strong>Common HRJ locations</strong> — kitchen sockets behind white goods (heat
            exposure), socket spurs (added later, often under-torqued), back-of-cabinet sockets
            (where conductor was bent at an angle into the terminal).
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Diagnosing nuisance RCD trips — the leakage budget approach"
        plainEnglish="A 30 mA RCD trips when the cumulative earth leakage on the protected circuit reaches roughly 22-30 mA (devices trip somewhere in their stated band). On a modern installation with multiple connected appliances, normal residual leakage might be 5-10 mA — leaving 12-20 mA of headroom. A nuisance trip means something has eaten the headroom: a developing fault adding 15 mA pushes the total over the trip threshold. The diagnostic is to budget the leakage per appliance and find the contributor."
        onSite="Use a clamp meter capable of mA AC measurement (Megger DCM340, Fluke 376) around the line plus neutral conductors of the affected circuit. Reading shows net residual current — under 10 mA is normal; 15-25 mA is the trip-edge zone. Disconnect appliances one at a time and watch the reading drop. The appliance whose disconnection drops the residual significantly is the culprit. Common causes: ageing dishwasher heater elements, water-damaged extractor fan motors, IT power supplies with degraded EMC filters, faulty fluorescent ballasts."
      >
        <p>Typical residual current contributions per appliance:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Modern dishwasher</strong> — 1-3 mA when on heat cycle; significantly higher
            with degraded heater element.
          </li>
          <li>
            <strong>Washing machine</strong> — similar to dishwasher; heat-cycle leakage rises
            with element age.
          </li>
          <li>
            <strong>Computer / TV PSU</strong> — 0.5-2 mA per unit; accumulates on circuits with
            multiple connected items.
          </li>
          <li>
            <strong>Inverter-driven white goods</strong> — variable speed compressors and motor
            drives can leak more under start and stop transients.
          </li>
          <li>
            <strong>Older fluorescent ballasts</strong> — 1-3 mA; replace with LED to remove the
            contribution.
          </li>
          <li>
            <strong>Water in an outdoor accessory</strong> — sudden jump from baseline;
            investigate any newly-added outdoor socket or junction box.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Intermittent faults — capturing the symptom before it disappears"
        plainEnglish="The hardest faults to diagnose are the intermittent ones — present when the customer rings, gone when the apprentice arrives. The discipline is to capture the symptom before it disappears: ask the customer to keep a log (date, time, conditions, which device tripped), leave a data-logger on the affected circuit between visits, or set up a CT clamp with peak-hold capture. The pattern in the log is the diagnostic clue."
        onSite="Tools that capture intermittent symptoms: power-quality logger (Fluke 1738, Hioki PQ3198) for voltage / current / harmonic events; current clamp with peak-hold for inrush capture; thermal camera (Flir One Pro) for heat-affected terminations; smart event recorder (Megger PD-200) for partial-discharge fault tracing. The apprentice often does not own these but the firm has them — book them out for the next site visit. The data the logger captures over 48 hours often reveals the fault pattern in 30 seconds of analysis."
      >
        <p>Intermittent-fault tooling and capture strategies:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Customer log</strong> — paper or app; date, time, conditions, which device or
            circuit; first cheap diagnostic.
          </li>
          <li>
            <strong>Power-quality logger</strong> — clipped on the affected circuit for 48-168
            hours; captures voltage dips, surges, RCD trip events.
          </li>
          <li>
            <strong>Thermal camera</strong> — survey of the consumer unit under load; HRJs and
            heat-affected terminations show as bright hotspots.
          </li>
          <li>
            <strong>Clamp meter with min-max</strong> — left on the circuit overnight; captures
            peak inrush and any unusual load-side events.
          </li>
          <li>
            <strong>Repeat visit pattern</strong> — diagnose at the time the customer reports the
            issue; cold visits often miss the symptom.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 642.2"
        clause={
          <>
            "The inspection shall be made to verify that the installed electrical equipment is:
            (a) in compliance with the requirements of Section 511; (b) correctly selected and
            erected in accordance with BS 7671, taking into account manufacturers’ instructions;
            and (c) not visibly damaged or defective so as to impair safety."
          </>
        }
        meaning={
          <>
            The inspection step that follows the repair has to verify the new component is the
            right one (Section 511), correctly selected and erected per the manufacturer&apos;s
            instructions (torque, strip length, orientation), and not visibly damaged. That third
            bullet catches the close-of-job photograph &mdash; visible damage at hand-back is
            unacceptable.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 642.2, verbatim."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 411.5.3"
        clause={
          <>
            "Where an RCD is used for fault protection, the following conditions shall be
            fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2
            or 411.3.2.4; and (b) Ra × IΔn ≤ 50 V where Ra is the sum of the resistances of the
            earth electrode and the protective conductor connecting it to the
            exposed-conductive-parts (in ohms), IΔn is the rated residual operating current of the
            RCD."
          </>
        }
        meaning={
          <>
            After replacing an RCD or RCBO during fault correction, both halves of 411.5.3 must
            hold: the disconnection time at I&Delta;n meets 411.3.2.2 / 411.3.2.4, AND
            Ra&nbsp;&times;&nbsp;I&Delta;n stays under 50&nbsp;V. On TN that&apos;s usually
            obvious; on TT it&apos;s the calculation that catches a marginal earth electrode.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Reg 411.5.3, verbatim."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Re-tightening a heat-affected screw terminal instead of re-making the joint"
        whatHappens={
          <>
            Apprentice finds an HRJ at a kitchen socket &mdash; conductor darkened, screw loose,
            surrounding plastic warm. Re-tightens the screw, tests, leaves. Three months later the
            same socket is heat-marked again and the customer calls. The heat-affected copper
            still has surface oxidation and partially-annealed metallurgy; the contact resistance
            has not recovered just because the screw is now tight. The same failure mechanism is
            still in the joint and it heats again under load.
          </>
        }
        doInstead={
          <>
            Cut back the conductor by 10&ndash;15 mm; strip fresh insulation; inspect the back-box
            and accessory for melt damage (replace if affected); re-terminate the fresh copper to
            manufacturer torque. The joint is now made on fresh material with proper torque
            &mdash; that lasts 25&ndash;40 years.
          </>
        }
      />

      <CommonMistake
        title="Dry-firing an immersion element after replacement"
        whatHappens={
          <>
            Apprentice replaces a failed 3&nbsp;kW immersion element. Energises immediately to
            test &mdash; the cylinder hadn't been refilled. The element heats from 20 &deg;C to
            over 400 &deg;C in 10&ndash;20 seconds with no water to absorb the heat. The element
            scorches, the sheath warps, the IR drops, the RCBO trips. The new element is now
            ruined and needs replacing AGAIN. The mistake costs the firm a second element + a
            wasted hour.
          </>
        }
        doInstead={
          <>
            Refill the cylinder and bleed any air locks BEFORE energising. The cylinder fills in
            5&ndash;10 minutes from the cold supply; the air bleed at the highest tap takes 30
            seconds. Verify water flow through the cylinder OUTLET (not just the inlet) before
            pressing the test button on the immersion thermostat.
          </>
        }
      />

      <Scenario
        title="Intermittent shower trip on a 9.5 kW Mira Sport"
        situation={
          <>
            Customer reports their Mira Sport 9.5&nbsp;kW shower (Wylex 40&nbsp;A RCBO,
            10&nbsp;mm&sup2; cable, 2.5&nbsp;m run) trips after about 4 minutes of use. The shower
            has been installed since 2017 and the trips started a fortnight ago. You have a 2-hour
            visit booked.
          </>
        }
        whatToDo={
          <>
            (1) GREET + BRIEF &mdash; explain the diagnostic plan; ask for permission to use hot
            water for the heating test. (2) ISOLATE at the Wylex DB; lock-off; prove dead at the
            shower isolator with the Martindale VI-13800. (3) Open the shower; remove the cover;
            identify the element terminal block. (4) IR TEST at 500&nbsp;V on the element
            terminals to earth, COLD &mdash; reading 4.5&nbsp;M&Omega; (acceptable; over
            1&nbsp;M&Omega; threshold). (5) Restore the cover; energise; ask the customer to run
            the shower at full hot for 5 minutes (the trip threshold). The shower trips at 4:20.
            (6) ISOLATE again immediately; lock-off; prove dead; quickly remove the cover and
            re-test IR while the element is still hot &mdash; reading 0.06&nbsp;M&Omega; (FAILED
            &mdash; well below the 1&nbsp;M&Omega; threshold). DIAGNOSTIC CONFIRMED. (7) Source
            the replacement element (Mira Sport 9.5&nbsp;kW heater pack from CEF Manchester
            &mdash; 1 hour delivery, &pound;65). (8) Drain the shower unit; remove failed element;
            fit new element with new gasket; restore water; bleed air. (9) Energise; functional
            test &mdash; full hot run for 8 minutes, no trip. (10) Re-test IR cold AND after a
            10-minute run; both over 2&nbsp;M&Omega;. (11) Full BS 7671 Part 6 testing on the
            shower circuit &mdash; R1+R2 0.34&nbsp;&Omega;, Zs 0.41&nbsp;&Omega;, RCD trip-time
            18&nbsp;ms. All within limits. (12) Issue MWC; customer hand-back; warranty explained.
          </>
        }
        whyItMatters={
          <>
            The cold-vs-hot IR comparison is the diagnostic technique that catches the
            intermittent shower trip. Without it, the apprentice replaces the RCBO (no difference;
            trips again) or replaces the cable (no difference; trips again). The element under
            heat is the failure point; the diagnostic technique finds it; the correction is
            element replacement. The full Part 6 verification confirms the rectified circuit is
            sound; the documentation closes the loop.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Half-split (binary search) finds broken-ring faults in log₂(n) measurements — efficient diagnostic discipline beats random walking.',
          'BS 7671 526.1 governs every connection — manufacturer torque, right method for the conductor, right enclosure for the location.',
          'LED downlight failures are overwhelmingly driver failures; replace the whole fitting, match colour temperature and beam angle.',
          'Shower / immersion intermittent trip = element insulation breakdown under heat; diagnose with cold-vs-hot IR comparison.',
          'NEVER dry-fire an immersion / shower element; refill / restore water supply BEFORE energising the new element.',
          "Single-phase motor capacitor failure: motor hums, doesn't start; MFT capacitance test confirms; like-for-like cap replacement.",
          'HRJ correction: cut back heat-affected copper; fresh strip; replace damaged accessory; manufacturer torque on the new joint.',
          'BS 7671 Part 6 643 verification on every rectified circuit, every time — continuity, IR, polarity, R1+R2, Zs, RCD trip-time, functional test.',
        ]}
      />

      <Quiz
        title="Apply correction techniques to common faults — knowledge check"
        questions={quizQuestions2}
      />
    </div>
  );
}
