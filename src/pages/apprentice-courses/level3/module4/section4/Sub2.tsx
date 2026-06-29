/**
 * Module 4 · Section 4 · Subsection 2 — Identifying supply voltages + procedure for tests
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.5
 *   AC 4.5 — "specify an appropriate and logical procedure for carrying out fault diagnosis tests"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 4.2 + AC 4.7 — describe how to
 * identify supply voltages and procedure for the seven tests in fault context.
 *
 * Frame: identifying the supply arrangement (TN-S, TN-C-S, TT, IT) and what
 * each means for fault diagnosis; the test procedure ordering for fault work
 * (different from commissioning); the BS 7671 643 sequence applied to a real
 * investigation.
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
  'Identifying supply + test procedure (4.2) | Level 3 Module 4.4.2 | Elec-Mate';
const DESCRIPTION =
  'Identifying supply arrangement (TN-S, TN-C-S, TT, IT) for fault diagnosis context, and the BS 7671 643 test procedure adapted for fault investigation rather than commissioning. A4:2026 PNB / TN-C-S layer.';

const checks = [
  {
    id: 'mod4-s4-sub2-supply',
    question:
      "How do you identify whether a domestic supply is TN-S, TN-C-S or TT, and why does it matter for fault diagnosis?",
    options: [
      "You ask the customer which supply they have and take their word for it. Householders always know their earthing arrangement because it is on the meter certificate, so a quick question identifies TN-S, TN-C-S or TT without any inspection or measurement.",
      "You read the rating of the main fuse. A 60 A cut-out is always TN-S, an 80 A cut-out is always TN-C-S, and a 100 A cut-out is always TT, so the main-fuse size tells you the earthing arrangement directly without looking at the earth path.",
      "Visual inspection of the cut-out and main earth: TN-S has a separate earth conductor from the cut-out, TN-C-S (PME) has a combined neutral-earth separated at the cut-out, TT has no incoming earth and relies on the customer's own electrode. It matters because each has different fault characteristics, protection requirements and L–E behaviour.",
      "It makes no difference to fault diagnosis which supply you have — the tests and the limits are identical for TN-S, TN-C-S and TT. So you skip supply identification entirely and apply the same Zs limits to every property regardless of earthing arrangement.",
    ],
    correctIndex: 2,
    explanation:
      "Supply arrangement is foundational L3 knowledge. TN-S has a separate green/yellow earth tail from the cut-out back to the substation (older / rural); TN-C-S (PME) combines neutral and earth in the PEN, separated at the cut-out, and is the most common modern arrangement with open-PEN risk; TT has no incoming earth and the customer's electrode is the only earth path, needing an RCD at the origin. Each gives a different Ze, expected Zs and fault-current path. The MFT measures Ze and tells you the order of magnitude (TN-S/TN-C-S ~0.35–1.0 Ω; TT 1–200+ Ω); visual confirms it. BS 7671 Chapters 31 and 41 cover the per-system protection; A4:2026 added significant TN-C-S Open PEN requirements.",
  },
  {
    id: 'mod4-s4-sub2-fault-seq',
    question:
      "How does the BS 7671 643 test sequence differ when applied to FAULT DIAGNOSIS vs commissioning?",
    options: [
      "There is no difference — fault diagnosis runs the full commissioning sequence on every circuit, every time. You isolate the whole installation, dead-test and live-test every circuit in order, and the fault reveals itself somewhere in the readings. Targeting tests to the symptom is not permitted.",
      "Commissioning runs the full sequence systematically on every circuit; fault diagnosis runs a targeted subset driven by the symptom and hypothesis, escalating to the dead-test sequence only when the quicker live diagnosis is inconclusive. It goes that deep only when needed, saving customer time and money.",
      "Fault diagnosis runs the tests in reverse order — live tests first, then dead tests — whereas commissioning runs dead before live. The reversed order is what distinguishes a fault investigation from a commissioning test; the same tests are run on every circuit either way.",
      "Fault diagnosis uses only insulation-resistance testing and commissioning uses only loop testing. The two activities each rely on a single test type, so a fault investigation is just a whole-installation IR test and a commissioning is just a whole-installation Zs test.",
    ],
    correctIndex: 1,
    explanation:
      "Targeted testing is the L3 fault-diagnosis approach. Worked example for an RCD nuisance trip on a kitchen circuit: clamp the RCD output (live, no isolation) to confirm cumulative leakage; if a single appliance spikes, disconnect and retest; only if the live diagnosis is inconclusive escalate to the dead-test sequence (isolate, IR-test the suspect circuit, EFLI to verify protection). Commissioning is exhaustive — verifying every aspect of a new install — while fault diagnosis is hypothesis-driven. Knowing when to dead-test vs live-test is part of the L3 competence.",
  },
  {
    id: 'mod4-s4-sub2-pnb',
    question:
      "What's a PNB (protective neutral bonding) installation and how is it identified?",
    options: [
      "PNB (Protective Neutral Bonding) is a type of RCD that bonds the neutral to the protective conductor whenever it detects an earth fault. It sits in the consumer unit alongside the main switch and is identified by a 'PNB' label on the device front. It is unrelated to the supply earthing arrangement.",
      "PNB is the bonding conductor that links the consumer's gas and water pipes together. It is identified by the green/yellow main bonding clamps at the incoming services and has nothing to do with the neutral; the 'N' in the abbreviation stands for 'network', not neutral.",
      "PNB stands for 'Phase-Neutral Balance' — a three-phase arrangement where the loads are balanced across phases to keep the neutral current near zero. It is identified by measuring the neutral current at the origin; a near-zero reading confirms a PNB installation.",
      "PNB (Protective Neutral Bonding) is a TN-C-S arrangement where neutral and earth are bonded at a single defined point on the consumer's premises (the main earthing terminal), unlike PME where bonding can be at multiple network points. Identify it by a single deliberately-located, often-labelled bonding link from incoming neutral to the main earthing terminal at the cut-out.",
    ],
    correctIndex: 3,
    explanation:
      "PNB is one of the A4:2026 emphasis areas. It is a TN-C-S arrangement where the neutral-earth bond sits at a single defined point on the consumer's premises, whereas in PME the bonding can be at multiple points along the network. Wrong identification leads to wrong fault diagnosis on what becomes a 'TT-like' fault path under open-PEN conditions. EV chargers on TN-C-S installations need careful supply-side coordination — S-type RCD upstream, PNB bond, and Type B RCD at the charger. The L3 apprentice's role is to recognise PNB on supply identification and apply the correct fault-diagnosis approach.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the typical Ze (earth fault loop impedance at origin) for each common UK supply arrangement?",
    options: [
      "TN-S, TN-C-S and TT all have the same Ze of around 0.35 Ω at the origin, because Ze is set by the supply transformer, not the earthing arrangement. The reading therefore cannot tell you which supply you have; only a visual inspection can.",
      "TN-S 0.5–1.0 Ω, TN-C-S/PME 0.35–0.65 Ω (the PEN gives a low-impedance return), TT 50–200+ Ω depending on soil and electrode, IT undefined. The Ze reading immediately tells you the arrangement, the available fault current and the protective measures needed, so always measure it at the origin first.",
      "TT has the lowest Ze (under 0.35 Ω) because the earth electrode gives a direct path to ground, while TN-C-S has the highest (50–200 Ω) because the PEN adds impedance. The reading is the reverse of what most apprentices expect, which is why TT properties clear faults fastest.",
      "Ze is always exactly 0.8 Ω on every UK supply, because that is the maximum the DNO is permitted to declare. Any reading above 0.8 Ω means a fault on the supply, so the Ze test is really a pass/fail check rather than a way of identifying the arrangement.",
    ],
    correctAnswer: 1,
    explanation:
      "Ze values are the fingerprint of the supply arrangement. The MFT (Megger MFT1741+) reads Ze at the origin in a few seconds; the value confirms the arrangement and tells you what to expect for downstream Zs values. Always read Ze at the start of any fault investigation to establish the baseline.",
  },
  {
    id: 2,
    question: "Why does an OPEN PEN on TN-C-S create such a serious fault situation?",
    options: [
      "Because an open PEN immediately trips every RCD in the property. The loss of the combined neutral-earth conductor injects a large residual current that all the RCDs detect at once, so the whole installation goes dead. The danger is the sudden total loss of supply, not a shock risk.",
      "Because an open PEN doubles the supply voltage to 460 V across every circuit. With the PEN broken the phase voltage adds to itself, so appliances are over-driven and burn out; the hazard is equipment damage rather than electric shock, and an RCD clears it normally.",
      "On TN-C-S, neutral and earth share the PEN. If it breaks upstream, the customer's bonded metalwork (taps, radiators, EV charger chassis) rises toward phase voltage relative to true earth. The RCD sees no residual current so doesn't trip; the first sign is a tingle on metal taps or a 30+ V N–E reading at the cut-out.",
      "Because an open PEN only affects the lighting circuits. The neutral for power is separate from the neutral for lighting on TN-C-S, so a broken PEN simply leaves the lights dim while sockets work normally; it is an inconvenience rather than a serious hazard.",
    ],
    correctAnswer: 2,
    explanation:
      "Open PEN is the canonical L3-grade hazard on TN-C-S installations. The neutral and protective earth share the PEN between transformer and cut-out; if it breaks upstream the customer's neutral floats relative to the transformer star point and all the bonded metalwork lifts toward phase voltage. The RCD doesn't see it because the lifted-neutral voltage flows through the bonding network as an L–E volt-drop, not as imbalance. Protection is supply-side (DNO PEN maintenance) plus customer-side detection (Open PEN devices in modern EV chargers, smart meters, some new CUs), with A4:2026 adding explicit requirements in Reg 411.3.3. Always check N–E voltage at the cut-out at the start of any TN-C-S investigation.",
  },
  {
    id: 3,
    question: "What's the test procedure for diagnosing a fault on a TT installation, and how does it differ from TN-S/TN-C-S?",
    options: [
      "There is no difference — a TT installation is tested exactly like TN-S. The same Zs limits from Table 41.3 apply, overcurrent devices clear the earth faults, and the earth electrode plays no part in the test, so you can use your usual TN test plan unchanged.",
      "On TT you skip the earth tests entirely because the customer's electrode is the DNO's responsibility, not yours. Just IR-test the circuits at 500 V and check polarity; the loop and RCD tests are omitted because there is no reliable earth to test against.",
      "TT differs only in that you measure Zs and expect a very low reading — under 0.35 Ω — because the earth rod gives a direct path to ground. If the reading is high the electrode is fine and the fault is elsewhere; the RCD at the origin is optional on TT.",
      "On TT the earth electrode is the only return path — measure its resistance (typically 50–200 Ω, degrading over years) and rely on the 30 mA RCD at origin rather than overcurrent for earth-fault clearance. EFLI/Zs values are much higher than TN and bonding is stricter, so the diagnostic approach differs from TN throughout.",
    ],
    correctAnswer: 3,
    explanation:
      "TT installations have different fault characteristics from TN. The earth electrode is the only return path — measure its resistance with a dedicated tester (Megger DET3TC) or MFT earth-stake adaptor (typically 50–200 Ω, rising over years from drying and corrosion). Reg 411.5 requires a 30 mA RCD at origin (S-type if downstream RCDs are also 30 mA), so the origin RCD trip-time test replaces the overcurrent reliance of TN. EFLI/Zs values are much higher and are checked against the TT limit (often RA × IΔn ≤ 50 V), and bonding is stricter because the bonding network is the only fault path. The L3 apprentice meets TT mainly on rural / older properties.",
  },
  {
    id: 4,
    question: "What's the difference between IT and TN-S supply arrangements?",
    options: [
      "IT has the neutral isolated from earth (or connected via high impedance), so a single earth fault gives no significant fault current — alarm only, used where one fault must not stop a process (chemical plants, hospital theatres). TN-S distributes neutral and earth separately from the transformer and clears faults normally via overcurrent / RCD.",
      "IT is the standard UK domestic supply where the earth and neutral are combined, and TN-S is the rural supply with an earth electrode. The 'I' in IT stands for 'Identical', meaning earth and neutral are the same conductor, the opposite of TN-S where they are separate.",
      "IT means the supply is single-phase and TN-S means it is three-phase. The letters describe the number of phases rather than the earthing, so an IT supply is what you find in a house and a TN-S supply is what you find on an industrial site.",
      "IT is a supply with no neutral at all — only three phases and an earth — while TN-S has a neutral. On IT you take all your loads phase-to-phase at 400 V, which is why it is used in factories; on TN-S you have a neutral for 230 V single-phase loads.",
    ],
    correctAnswer: 0,
    explanation:
      "IT systems are specialist. Hospital operating theatres, ITUs, certain industrial process plants. Single-fault tolerance is the IT design feature — you can have a single L–E fault on the system and continue operating, with an alarm prompting investigation. The L3 apprentice doesn't normally work on IT but should know the system exists.",
  },
  {
    id: 5,
    question: "When investigating a fault on a circuit, what's the typical SEQUENCE of tests?",
    options: [
      "Fixed order regardless of symptom: isolate the whole installation, IR-test every circuit, then live-test every circuit, then re-energise. You never target the tests to the fault; the same exhaustive sequence runs on every job, which is why a simple flicker takes three hours to diagnose.",
      "Hypothesis-driven and escalating: visual + interview, then quick live tests (clamp, voltage at the suspect point), then — only if inconclusive — isolate for the dead tests and EFLI, and finally a PQ analyser. It runs from quick/cheap/safe to slow/expensive only as needed, and many faults solve in the first few steps.",
      "Always live tests first because they are quickest. Run Zs and RCD trip-time on the suspect circuit straight away, and only if those pass do you isolate for the dead tests. Starting live saves time and the dead tests are just a formality afterwards.",
      "Start at the furthest accessory and work back to the board, testing each point in turn. The fault is always at the end of the circuit under the most stress, so testing from the far end inwards finds it fastest, regardless of what the customer reported or any hypothesis.",
    ],
    correctAnswer: 1,
    explanation:
      "Hypothesis-driven test sequencing is the L3 efficiency. A simple HRJ on the supply tail can be diagnosed in 10 minutes with thermal imaging + clamp meter + customer interview. Running the full BS 7671 643 sequence on every circuit takes 3 hours and finds the same fault. The faster route requires the discipline to know when 'enough' testing has confirmed the hypothesis.",
  },
  {
    id: 6,
    question: "What's a 'continuity proving' test and how is it different from R1+R2?",
    options: [
      "They are two names for the same test. 'Continuity proving' is the trade slang and 'R1+R2' is the formal term, but both produce the same precise loop-resistance figure on the MFT, so you can use either result on the certificate interchangeably.",
      "Continuity proving is done live and R1+R2 is done dead. The difference is purely whether the circuit is energised — continuity proving injects a test current with the supply on, while R1+R2 needs the circuit isolated; both give the same loop resistance.",
      "Continuity proving is a quick low-current (~200 mA) yes/no check that a connection exists, while R1+R2 is a precise measurement of a circuit's line + protective conductor loop resistance. You prove continuity to verify an isolation has fully disconnected a circuit; you measure R1+R2 to characterise it against expected design values.",
      "Continuity proving measures the insulation resistance between conductors, while R1+R2 measures the resistance through the conductors. One tells you the conductors are apart, the other that they are joined; together they confirm the circuit is wired correctly.",
    ],
    correctAnswer: 2,
    explanation:
      "Continuity proving (sometimes 'continuity check') is the quick yes/no test — a low-current 200 mA test on the MFT or multimeter continuity range that confirms a connection exists without giving a precise figure. R1+R2 is the precise loop-resistance measurement of a complete circuit. The MFT does both: use continuity proving for verification (is this circuit isolated? — supply-to-load reads OPEN), and R1+R2 for characterisation (does the loop match the expected design value?). Both have their place at different stages of fault work.",
  },
  {
    id: 7,
    question: "When testing EFLI, why must you confirm the supply is energised AND the protective device is in the ON position?",
    options: [
      "Because EFLI is a dead test that needs the circuit isolated. You switch the supply off and the protective device off so no current flows while the meter measures the loop resistance; energising the circuit during the test would damage the MFT.",
      "Because the energised supply charges the MFT's internal battery during the test. The meter draws its operating power from the live circuit, so the supply and protective device must be on simply to power the instrument, not because current needs to flow through the loop.",
      "Because the protective device must be ON so that it trips during the EFLI test and proves it works. The purpose of the test is to operate the breaker, so leaving it ON and the supply live lets you confirm disconnection at the same time as reading the impedance.",
      "Because EFLI is a LIVE test — the MFT injects a small fault current through the loop and reads the impedance from the response. With the supply off no current flows; with the protective device off the loop is broken upstream of the test point. Either way the meter shows OPEN or undefined, so both conditions are pre-requisites for a meaningful reading.",
    ],
    correctAnswer: 3,
    explanation:
      "Live-test pre-requisites are easy to forget. EFLI injects a small fault current through the loop and derives the impedance from the response; if the supply is off no current flows, and if the protective device is off the loop is broken upstream of the test point — both give an OPEN or undefined reading. The MFT (Megger MFT1741+) typically warns 'NO VOLTAGE' or 'CIRCUIT OPEN', but the discipline is to check upfront — supply on, device on, leads on the right test point, RCD-protected mode if needed — rather than waiting for the warning.",
  },
  {
    id: 8,
    question: "What's the L3 apprentice's role when supply identification reveals an unusual or unexpected arrangement (e.g. TT in a built-up area, or three-phase supply you weren't expecting)?",
    options: [
      "Stop and verify before testing. An unexpected arrangement means the test plan no longer matches the installation, so update it to the actual supply, escalate to supervisor if unsure, revise the RAMS and brief the customer if scope changes — never push ahead with the plan you arrived with.",
      "Convert the supply to what you expected. If a built-up property turns out to be TT, install a connection to the supplier's earth to make it TN-C-S so your standard test plan applies; the conversion is a quick job the L3 apprentice does on the spot.",
      "Carry on with the test plan you arrived with. The supply arrangement does not change the tests or the limits, so an unexpected TT or three-phase supply is irrelevant; record the readings against your usual TN references and report any failures.",
      "Refuse the job and rebook. An L3 apprentice can only work on the exact supply described in the booking, so if you find anything different you must leave site and ask the office to send a fully qualified electrician instead.",
    ],
    correctAnswer: 0,
    explanation:
      "Supply identification is the first technical check on any fault-diagnosis visit. An unusual arrangement suggests either a genuinely TT property (rural, older, or specifically designed) needing a different approach, or an installation that isn't what the booking described (e.g. an older commercial site with an unbriefed three-phase supply). Either way the test plan must match the actual supply, with supervisor escalation if unsure and a customer brief if scope changes. Pausing-and-verifying when reality doesn't match expectations is part of safe working — unchecked assumptions become hazards.",
  },
];

const faqs = [
  {
    question: "How do I tell TN-S from TN-C-S just by looking at the cut-out?",
    answer:
      "TN-S has a SEPARATE earth conductor leaving the cut-out — usually a separate green/yellow tail that goes to the main earth terminal. TN-C-S has the earth and neutral COMBINED at the cut-out side; the separation happens INSIDE the cut-out via a PEN bond, and the earth tail leaves the cut-out alongside the neutral. Modern installations are mostly TN-C-S; older urban / suburban properties may be TN-S. The MFT Ze reading tells you regardless of visual.",
  },
  {
    question: "Can I test EFLI without RCDs tripping?",
    answer:
      "Yes — use the Hi-Z (no-trip) mode on the MFT. The Hi-Z mode injects a sequence of low-current pulses that statistically don't accumulate enough residual current to trip a 30 mA RCD. Slightly slower (1.5–2 seconds vs ~0.5 second for standard mode) and slightly less accurate (lower test current = lower signal-to-noise) but doesn't trip. Standard mode is for non-RCD circuits only. Megger MFT1741+ calls it 'Loop No-Trip' or 'Hi-Z'; Fluke and Kewtech have similar modes.",
  },
  {
    question: "What's the practical workflow for the first 10 minutes of a fault visit?",
    answer:
      "(1) Customer interview (3–5 minutes) — six questions framework. (2) Visual inspection of CU + main supply (1–2 minutes) — supply arrangement, signs of past faults, RCBO type, age estimate. (3) Ze measurement at origin (1 minute) — confirms supply arrangement, baseline. (4) Voltage measurement L–N, L–E, N–E at cut-out (1 minute) — checks for Open PEN signs. (5) Hypothesis formulation (1–2 minutes mental) — what fault types match the symptoms? Plan next 30–60 minutes of investigation. The first 10 minutes set up the rest of the visit.",
  },
  {
    question: "What if the customer doesn't know what kind of supply they have?",
    answer:
      "Most customers don't. You identify it visually + with the MFT. If the customer asks during the work, give a plain-English summary: 'You're on TN-C-S, which is the most common modern UK supply' or 'You're on TT, which means the property has its own earth electrode rather than relying on the supplier's'. The customer doesn't need the technical detail; the brief overview helps them understand any unusual aspects of the diagnosis.",
  },
  {
    question: "Can a domestic property have a mixed supply arrangement?",
    answer:
      "Yes, occasionally. Examples: TT for the main installation but a separate TN-C-S supply for a granny annex; TN-C-S house with a TT-converted EV charger circuit (older A4 interpretation). The L3 apprentice should map ALL supply arrangements on a multi-supply site at the start of fault diagnosis. Each supply has its own Ze, its own protection requirements, and its own fault characteristics.",
  },
  {
    question: "What happens if I run an EFLI test on a circuit that's not energised?",
    answer:
      "Modern MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) will detect the absence of supply voltage and refuse to run the test, displaying 'NO VOLTAGE' or 'NO SUPPLY' or similar. Older MFTs may run the test and produce an OPEN reading; the apprentice has to recognise OPEN means 'not actually a Zs reading'. Either way, the practical answer is the same: no useful test result without a live circuit. Always confirm the supply and protective device are both ON before pressing TEST.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 2"
            title="Identifying supply + test procedure"
            description="Identifying supply arrangement (TN-S, TN-C-S, TT, IT, PNB) for fault-diagnosis context; the BS 7671 643 test procedure adapted for fault investigation rather than commissioning; A4:2026 Open PEN and PNB protection layer."
            tone="emerald"
          />

          <TLDR
            points={[
              "Supply identification is the first technical step. Visual + Ze measurement confirms TN-S / TN-C-S / TT / IT / PNB. Each has different fault characteristics.",
              "Open PEN on TN-C-S is the L3 hazard RCDs don't catch. A4:2026 added Reg 411.3.3 Open PEN protection, particularly for EV chargers.",
              "Fault-diagnosis testing is hypothesis-driven and targeted; commissioning is exhaustive. Run only the tests that distinguish the candidate causes.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify common UK supply arrangements (TN-S, TN-C-S/PME, TT, IT, PNB) by visual inspection and Ze measurement.",
              "Recognise Open PEN risk on TN-C-S installations and apply the appropriate diagnostic check (N–E voltage at cut-out).",
              "Apply the BS 7671 643 test procedure in fault-diagnosis mode — targeted, hypothesis-driven, escalating from quick / live to thorough / dead only as needed.",
              "Distinguish continuity proving (yes/no) from R1+R2 measurement (precise loop resistance).",
              "Use Hi-Z (no-trip) EFLI mode on RCD-protected circuits.",
              "Recognise unusual supply arrangements and pause-and-verify before continuing the test plan.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Supply identification — visual + Ze</ContentEyebrow>

          <ConceptBlock
            title="Identify the supply at the cut-out before any other testing"
            plainEnglish="Each supply arrangement has different fault characteristics. The first technical step on any fault investigation is confirming what you're working on."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>TN-S</strong> — separate earth conductor from cut-out. Older urban properties. Ze typically 0.5–1.0 Ω.</li>
              <li><strong>TN-C-S (PME)</strong> — combined PEN; bonded to earth at cut-out. Most common modern UK arrangement. Ze typically 0.35–0.65 Ω. Open PEN is the supply-side hazard.</li>
              <li><strong>TT</strong> — no incoming earth; customer's own electrode. Rural properties. Ze typically 50–200 Ω.</li>
              <li><strong>IT</strong> — isolated neutral; specialist (hospital, process plant). Ze undefined.</li>
              <li><strong>PNB</strong> — TN-C-S with single defined bonding point on consumer's premises. A4:2026 layer for EV chargers.</li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.zeTest.url}
            title={videos.zeTest.title}
            channel={videos.zeTest.channel}
            duration={videos.zeTest.duration}
            topic="Ze test on a single-phase supply · Unit 303 AC 4.5"
            caption={<>Craig Wiltshire runs a Ze (external earth fault loop impedance) test on a single-phase domestic cut-out — the same measurement you take to confirm the supply arrangement and baseline the loop impedance before any 1×IΔn RCD or Zs work on the circuits downstream.</>}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.3.3 (Open PEN protection — A4:2026 reinforcement)"
            clause={<>"Where the supply is in accordance with TN-C-S system, additional protective measures shall be provided to mitigate the risk of fault to true earth potential consequent upon a broken or disconnected combined neutral and protective conductor (Open PEN)."</>}
            meaning={<>A4:2026 strengthened Open PEN protection requirements, particularly for EV chargers and certain other installation types. The L3 fault investigator on a TN-C-S installation routinely checks N–E voltage at the cut-out as part of supply identification — anything more than a few volts triggers escalation to DNO.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022 + A4:2026 progression."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Open PEN and PNB</ContentEyebrow>

          <ConceptBlock
            title="The supply-side hazards A4:2026 reinforced"
            onSite="Open PEN is invisible to standard RCDs. The customer's bonded metalwork can be at significant voltage above true earth without any indication. Detection: N–E voltage at cut-out should be near zero; anything &gt;5 V is suspect; anything &gt;30 V is dangerous."
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
              PNB (A4:2026 EV charger context): the customer-side PNB bond + S-type RCD upstream + Type B RCD at the EV charger form the layered protection. The L3 apprentice's role is recognising the PNB arrangement and verifying the bonding integrity during fault investigation.
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
              <li>(2) Live tests — clamp meter on suspect circuit, voltage at suspect points (low risk, no isolation).</li>
              <li>(3) Thermal imaging at suspect locations (live or under load; non-invasive).</li>
              <li>(4) Targeted live tests — EFLI on suspect circuit (Hi-Z mode if RCD-protected).</li>
              <li>(5) If above inconclusive — isolate, dead tests (continuity, R1+R2, IR on suspect circuit only).</li>
              <li>(6) If still inconclusive — full BS 7671 643 sequence on affected circuit.</li>
              <li>(7) If still inconclusive — install PQ analyser for 24–72 hours.</li>
            </ul>
            <p>
              Many faults solve at steps 1–3 without ever needing the full sequence. Escalate only as needed.
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
                A4:2026 added Protective Neutral Bonding (PNB) explicitly into Reg 312.2.1.1. PNB is a TN-C-S variant where the bond between PE and N happens at the consumer&apos;s installation, not at the cut-out. When you&apos;re identifying the supply on a diagnosis visit, PNB is the new arrangement to recognise alongside TN-S, TN-C-S and TT.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 312.2.1.1 (system earthing arrangements, updated in A4:2026 to include PNB)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.4.1"
            clause={
              <>
                "In a TN system, the integrity of the earthing of the installation depends on the reliable and effective connection of the PEN or PE conductors to Earth. Where the earthing is provided from a public or other supply system, compliance with the necessary conditions external to the installation is the responsibility of the distributor."
              </>
            }
            meaning={
              <>
                Identifying the supply isn&apos;t just labelling it &mdash; it&apos;s identifying which party owns the earth integrity. On TN, the upstream PEN is the DNO&apos;s responsibility, which is why the L&ndash;E and N&ndash;E readings at the cut-out are what you take first and what triggers a STOP / DNO call if they&apos;re wrong.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 411.4.1, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the supply identification step"
            whatHappens={<>Apprentice arrives at a rural property assuming TN-C-S (their normal). Does not measure Ze at origin. Runs full fault diagnosis assuming TN-C-S Zs values. Ze is actually 80 Ω (it is a TT installation with degraded electrode); Zs values that "fail" against TN-C-S Table 41.3 are actually within TT spec. Apprentice incorrectly reports the installation as non-compliant; customer disputes; firm gets a complaint. Real diagnosis is the electrode needs replacement and the system is otherwise fine.</>}
            doInstead={<>Measure Ze at the start of every fault investigation. The Ze value tells you the supply arrangement and the expected Zs ranges. Without that baseline, all your downstream measurements are interpreted against the wrong reference.</>}
          />

          <CommonMistake
            title="Running every test on a TN-C-S installation without checking N–E voltage"
            whatHappens={<>Apprentice investigates an RCD trip on a TN-C-S installation. Runs continuity, IR, EFLI on the affected circuit. Does not measure N–E at cut-out. Misses an open PEN that is lifting the customer's earth bonding to 60 V above true earth. The RCD trip was the symptom; the open PEN was the cause. Apprentice reports "no fault found"; customer takes a shock from a tap two days later.</>}
            doInstead={<>Always measure N–E at cut-out at the start of any TN-C-S investigation. Below 5 V = healthy; 5–30 V = suspect, log and escalate; above 30 V = STOP, DNO call. Open PEN is the supply-side hazard that standard RCD protection does not see.</>}
          />

          <Scenario
            title='Customer reports "tingles when I touch the kitchen tap"'
            situation={<>Customer in a 1990s built-up suburban property. They report intermittent 'tingle' when they touch the kitchen tap, particularly noticeable when the boiler is firing. Property is TN-C-S.</>}
            whatToDo={<>Stage 1: customer interview confirms tingle is on the kitchen mixer tap, intermittent, worse when boiler runs. Visual: CU is Hager 12-way RCBO; main bonding to gas pipe present; supplementary bonding to kitchen tap not present (relies on equipotential bonding). Stage 2: hypothesis. Three candidates — (A) Open PEN on the supply lifting customer earth; (B) compromised main bonding (cracked clamp, corroded); (C) parasitic earth current from a bonded appliance. Stage 3: targeted tests. Most discriminating: N–E voltage at cut-out under load (boiler firing). Stage 4: measure N–E with boiler off — reads 1 V (healthy). Measure N–E with boiler firing — reads 38 V. Diagnosis confirmed: Open PEN intermittent, exposed under load. Stage 5–6: STOP. DO NOT continue investigation. Customer-side fault diagnosis won't fix a supply-side problem. Make safe — turn off boiler, recommend customer minimise use of bonded metalwork until rectified. Stage 7: call the DNO (Western Power, UK Power Networks, etc.) to report Open PEN; brief customer; document on job sheet. The DNO will investigate the supply network. Apprentice does not attempt customer-side fix.</>}
            whyItMatters={<>Open PEN is a regulated supply-side issue that the customer's electrician cannot fix. Recognising the symptoms (tingle on bonded metalwork, N–E voltage above expected) and knowing to escalate to the DNO is the L3 step-up. Continuing customer-side investigation would waste time and miss the actual fault. The safety briefing to the customer (minimise use of bonded metalwork) is the responsible action while the DNO investigates.</>}
          />

          <SectionRule />

          <ContentEyebrow>Ze, Zs and the loop impedance hierarchy</ContentEyebrow>

          <ConceptBlock
            title="Ze, R1+R2, Zs — what each measurement tells you"
            plainEnglish="Ze is the earth fault loop impedance from the origin (cut-out) measured back through the supply. R1+R2 is the resistance of the line + protective conductor measured at the accessory. Zs is the total earth fault loop impedance measured at the furthest accessory. Algebraically: Zs = Ze + (R1+R2). Each tells you something different about the fault path."
            onSite="Standard MFT sequence on a fault investigation: (1) Ze at origin (Megger MFT1741+ in 2-wire loop mode, between L and main earth terminal); (2) R1+R2 at the accessory (continuity mode, between supply L and supply CPC at the accessory, with circuit isolated); (3) Zs at the accessory (live loop test, RCD-protected uses Hi-Z mode). Compare measured Zs to BS 7671 Table 41.3 / 41.4 limits for the protective device."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ze typical ranges</strong> — TN-S 0.5-1.0 Ω; TN-C-S 0.35-0.65 Ω; TT 50-200+ Ω; IT undefined.</li>
              <li><strong>R1+R2</strong> — depends on circuit length and conductor sizes. BS 7671 OSG (On-Site Guide) Appendix has typical values per cable size and length.</li>
              <li><strong>Zs limit</strong> — Table 41.3 (BS EN 60898 MCBs) or 41.4 (BS EN 61009 RCBOs). Example: 32 A B-curve MCB Zs limit 1.37 Ω at 230 V; 16 A B-curve 2.73 Ω (BS 7671:2018+A4:2026).</li>
              <li><strong>Zs reading high</strong> — fault path has higher impedance than expected. Likely causes: HRJ in supply, broken or high-resistance CPC, bad MCB connection.</li>
              <li><strong>Zs reading inconsistent</strong> — varies between MFT readings on same circuit. Likely intermittent connection somewhere; vibrate cable runs and retest.</li>
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
              <li><strong>Voltage L-N / L-E / N-E</strong> — confirms supply present and balanced. Expected: L-N ≈ 230 V; L-E ≈ 230 V; N-E ≈ 0 V (TN); 0-5 V (TT).</li>
              <li><strong>Current with clamp</strong> — confirms load drawing expected current. Spikes/dips indicate cycling or transient loads.</li>
              <li><strong>Zs measurement</strong> — earth fault loop impedance at the accessory. Hi-Z mode for RCD-protected.</li>
              <li><strong>RCD trip-time</strong> — at 1× and 5× rated trip current. Within BS EN 61008/61009 limits.</li>
              <li><strong>Polarity check</strong> — voltage L to E (should be ~230 V), N to E (should be ~0 V). Reversed polarity = both ~115 V or wrong reading. Common on borrowed-neutral or wrong-wired accessories.</li>
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
              <li><strong>Continuity / R1+R2</strong> — line + CPC loop resistance from origin to accessory. Verifies CPC is intact and resistance is within design.</li>
              <li><strong>Insulation resistance L-L / L-E / N-E</strong> — at 500 V test. Pass: ≥1 MΩ minimum, typically &gt;100 MΩ on healthy circuit. Below 1 MΩ = failed; below 0.5 MΩ = severe insulation breakdown.</li>
              <li><strong>Polarity (continuity-based)</strong> — confirm L wire is connected to L terminal, N to N, CPC to earth. Continuity tests between supply terminals and accessory terminals confirm correct identification.</li>
              <li><strong>Ring continuity</strong> — three-step test on ring final circuits. Step 1: r1, rn, r2 measured separately at the DB. Step 2: cross-connect L and N, measure (r1+rn)/4 at each socket — should be the same at every socket if ring is continuous. Step 3: cross-connect L and CPC, measure (r1+r2)/4 at each socket — same logic.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Combining live and dead — the diagnostic picture</ContentEyebrow>

          <ConceptBlock
            title="Building the complete picture from multiple test results"
            plainEnglish="No single test gives the diagnosis. The L3 apprentice combines results from multiple tests to build the complete picture — IR low + Zs high + thermal hot spot = HRJ at a specific terminal. Each test is a constraint that narrows down the candidate locations."
            onSite="Document each measurement on the job sheet with location, test type, instrument used, reading, expected value, pass/fail. The pattern across all readings tells the story. Modern MFTs (Megger MFT1741+, Fluke 1664FC) record readings with timestamp and download to PowerSuite / FlukeView Forms for printable test reports."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cross-correlation</strong> — does the IR test result match the Zs result? Both should agree on whether insulation is healthy.</li>
              <li><strong>Spatial pattern</strong> — readings at different accessories along the circuit. A pattern (worsening towards far end) localises the fault.</li>
              <li><strong>Temporal pattern</strong> — readings at different times of day or under different loads. Intermittent faults show variability.</li>
              <li><strong>Comparison to design</strong> — every reading compared to BS 7671 limit AND to design value. Both must pass.</li>
              <li><strong>Documentation</strong> — full record of every test taken, every reading recorded. Forms the basis of the certificate, the customer report, and the audit trail.</li>
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
              <li><strong>Why dead first</strong> — verifies the system is safe to energise. If IR fails, you don't apply 230 V.</li>
              <li><strong>Continuity before IR</strong> — IR test injects 500 V; if continuity is broken, the test reads INCORRECTLY high (no closed circuit to test). Continuity confirms there's a circuit before you IR-test it.</li>
              <li><strong>Polarity before energising</strong> — verify L on L terminal, N on N. Wrong polarity energising = phase voltage on what should be neutral; unsafe.</li>
              <li><strong>Zs after restoration</strong> — earth fault loop impedance test needs supply on. Confirms protective device will operate correctly.</li>
              <li><strong>RCD trip-time last</strong> — RCD test trips the protection. Do this at the end so you don't have to re-energise multiple times.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Supply identification is the first technical step. Visual + Ze measurement confirms TN-S / TN-C-S / TT / IT / PNB.",
              "Each supply arrangement has different fault characteristics — Ze ranges, expected Zs values, protection requirements.",
              "Open PEN on TN-C-S is invisible to standard RCDs. N–E voltage check at cut-out is the diagnostic. A4:2026 reinforced protection requirements (Reg 411.3.3).",
              "PNB is TN-C-S with single defined customer bonding point. A4:2026 emphasis area for EV charger protection.",
              "Fault-diagnosis testing is hypothesis-driven and targeted; not the full BS 7671 643 commissioning sequence.",
              "Escalating test sequence: visual / interview → live tests → thermal → targeted EFLI → dead tests on suspect circuit → full sequence → PQ analyser.",
              "Hi-Z (no-trip) EFLI mode for RCD-protected circuits; standard mode for non-RCD only.",
              "Unusual supply arrangements pause-and-verify — update test plan to match what is actually there.",
            ]}
          />

          <Quiz title="Identifying supply + test procedure — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-1')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.1 Logical stages</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-3')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.3 Analysing test results</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
