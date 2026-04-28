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
      "All same.",
      "Visual inspection of the cut-out + main earth. TN-S — separate earth conductor (typically a green/yellow tail) from the cut-out earth terminal back to the substation; usually older installations or rural areas. TN-C-S (PME) — combined neutral and earth in the supply (the PEN), separated at the cut-out; the most common modern UK arrangement; main earth tail is bonded to the main bonding network. TT — no incoming earth; customer's own earth electrode (rod) provides the only earth path; common in rural and older properties without DNO earth provision. Why it matters: each arrangement has different fault characteristics (Ze, expected Zs, fault current path), different protection requirements (TT needs RCD on origin, TN-C-S has open-PEN risk), and different L–E voltage behaviour during faults.",
      "Only commercial.",
      "Doesn't matter.",
    ],
    correctIndex: 1,
    explanation:
      "Supply arrangement is foundational L3 knowledge. The MFT will measure Ze and tell you the order of magnitude (TN-S/TN-C-S Ze ~0.35–1.0 Ω; TT Ze 1–200+ Ω); visual confirms the arrangement. BS 7671 Chapter 31 + Chapter 41 cover the protection requirements per system; A4:2026 added significant TN-C-S Open PEN protection requirements.",
  },
  {
    id: 'mod4-s4-sub2-fault-seq',
    question:
      "How does the BS 7671 643 test sequence differ when applied to FAULT DIAGNOSIS vs commissioning?",
    options: [
      "Same.",
      "Commissioning runs the full sequence systematically on all circuits. Fault diagnosis runs a TARGETED subset based on the symptom and hypothesis. Example: customer reports RCD nuisance trip on kitchen circuit. Fault-diagnosis sequence: (1) clamp meter check on RCD output (live test, no isolation needed) — confirms cumulative leakage hypothesis. (2) If clamp shows a single-source spike on one appliance — disconnect, retest. (3) Only if the live diagnosis is inconclusive, escalate to dead-test sequence (isolate, IR test on suspect circuit, EFLI to verify protection). Commissioning would dead-test every circuit; fault diagnosis only goes that deep when needed. Saves customer time and money.",
      "Always full sequence.",
      "Just visual.",
    ],
    correctIndex: 1,
    explanation:
      "Targeted testing is the L3 fault-diagnosis approach. Commissioning is exhaustive (verify all aspects of the new install); fault diagnosis is hypothesis-driven (test only what distinguishes the candidate causes). Knowing when to dead-test vs live-test is part of the L3 competence.",
  },
  {
    id: 'mod4-s4-sub2-pnb',
    question:
      "What's a PNB (protective neutral bonding) installation and how is it identified?",
    options: [
      "Same as PME.",
      "PNB (Protective Neutral Bonding) is a TN-C-S arrangement where the neutral and earth ARE bonded ONLY at a single defined point on the consumer's premises (typically at the main earthing terminal or PEN bond). PME is a similar arrangement but the bonding can be at multiple points along the network. A4:2026 reinforced PNB requirements — particularly around EV charger installations, where the customer-side bond needs careful coordination with the DNO's PEN. Identifying PNB: look at the cut-out + meter + main switch; PNB will have a single, deliberately-located bonding link from incoming neutral to the main earthing terminal, often labelled. Wrong identification leads to wrong fault diagnosis on what should be a 'TT-like' fault path under open-PEN conditions.",
      "Just neutral.",
      "Just earth.",
    ],
    correctIndex: 1,
    explanation:
      "PNB is one of the A4:2026 emphasis areas. EV chargers on TN-C-S installations need careful supply-side coordination — protective measures including S-type RCD upstream, PNB bond, and Type B RCD at the charger. The L3 apprentice's role is to recognise PNB on supply identification and apply the correct fault-diagnosis approach.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the typical Ze (earth fault loop impedance at origin) for each common UK supply arrangement?",
    options: [
      "All the same.",
      "TN-S: 0.5–1.0 Ω (the dedicated earth conductor adds slightly more impedance than TN-C-S). TN-C-S / PME: 0.35–0.65 Ω (the PEN provides a low-impedance return). TT: 1.0–200+ Ω depending on soil conditions and electrode design (UK typical 50–200 Ω; very dry / rocky soil can be much higher). IT: undefined (high-impedance neutral by design). The Ze tells you immediately what supply arrangement you have, what fault current is available, and what protective measures are needed. Always measure Ze at the origin first when starting any fault investigation.",
      "Always 1 Ω.",
      "Always 0.5 Ω.",
    ],
    correctAnswer: 1,
    explanation:
      "Ze values are the fingerprint of the supply arrangement. The MFT (Megger MFT1741+) reads Ze at the origin in a few seconds; the value confirms the arrangement and tells you what to expect for downstream Zs values. Always read Ze at the start of any fault investigation to establish the baseline.",
  },
  {
    id: 2,
    question: "Why does an OPEN PEN on TN-C-S create such a serious fault situation?",
    options: [
      "It doesn't.",
      "On TN-C-S, the neutral and protective earth share the PEN conductor between transformer and cut-out. If the PEN breaks anywhere upstream, the customer's neutral floats relative to the transformer star point. Customer's bonded metalwork (kitchen taps, sinks, radiators, EV charger chassis, all bonded to the customer earth terminal) rises toward phase voltage relative to true earth. RCD doesn't see it (no residual current — the lifted-neutral voltage flows through bonding network as L–E volt-drop, not as imbalance). First sign: tingle on metal taps or 30+ V N–E reading at cut-out. A4:2026 added explicit Open PEN protection requirements (Reg 411.3.3, especially for EV chargers).",
      "Just disconnect.",
      "Random fault.",
    ],
    correctAnswer: 1,
    explanation:
      "Open PEN is the canonical L3-grade hazard on TN-C-S installations. RCDs don't catch it. The protection is supply-side (DNO maintenance of the PEN) plus customer-side detection (Open PEN protection devices in modern EV chargers, Smart Meters, some new CUs). Always check N–E voltage at the cut-out at the start of any TN-C-S investigation.",
  },
  {
    id: 3,
    question: "What's the test procedure for diagnosing a fault on a TT installation, and how does it differ from TN-S/TN-C-S?",
    options: [
      "Same procedure.",
      "TT-specific differences. (1) Earth electrode is the only return path — measure electrode resistance with a dedicated earth electrode tester (Megger DET3TC) or MFT with earth-stake adaptor. Typical 50–200 Ω; degradation increases over years (drying out, corrosion). (2) BS 7671 411.5 requires 30 mA RCD at origin (S-type if downstream RCDs are also 30 mA). RCD trip-time test on the origin RCD — different from TN where origin protection is overcurrent. (3) EFLI Zs values are MUCH higher than TN — calculate against BS 7671 41.1 limits for TT (often expressed as RA × IΔn ≤ 50 V). (4) Bonding requirements are stricter — bonding network IS the customer's only fault path. The L3 fault investigator approaches TT differently from TN.",
      "Just IR.",
      "Same.",
    ],
    correctAnswer: 1,
    explanation:
      "TT installations have different fault characteristics from TN. The earth electrode resistance dominates the EFLI; the RCD at origin is the protection (overcurrent devices alone won't clear earth faults at TT typical Zs values). The L3 apprentice meets TT primarily on rural / older properties; the diagnostic approach reflects the supply arrangement.",
  },
  {
    id: 4,
    question: "What's the difference between IT and TN-S supply arrangements?",
    options: [
      "Same.",
      "IT (Isolated Terra) — neutral isolated from earth (or connected via high impedance). Single earth fault doesn't cause significant fault current; alarm only. Typically used in continuous-process industries (chemical plants, hospitals), where one fault must not stop the process. TN-S (Terra Neutral Separated) — neutral and earth separately distributed from transformer; standard UK domestic / commercial older arrangement; faults clear normally via overcurrent / RCD. The L3 apprentice rarely meets IT outside specialist sites; if you're diagnosing in a hospital ITU or specialist process plant, the supply may be IT and the fault behaviour is fundamentally different.",
      "IT is bigger.",
      "TN-S obsolete.",
    ],
    correctAnswer: 1,
    explanation:
      "IT systems are specialist. Hospital operating theatres, ITUs, certain industrial process plants. Single-fault tolerance is the IT design feature — you can have a single L–E fault on the system and continue operating, with an alarm prompting investigation. The L3 apprentice doesn't normally work on IT but should know the system exists.",
  },
  {
    id: 5,
    question: "When investigating a fault on a circuit, what's the typical SEQUENCE of tests?",
    options: [
      "Random order.",
      "Hypothesis-driven order. Example for 'lights flicker' hypothesis: (1) Visual + customer interview (cost: free). (2) Clamp meter on lighting circuit during normal load (live, low risk). (3) Voltage measurement at lampholder during high-load event (live, low risk). (4) If above inconclusive — isolate, IR test on lighting circuit, R1+R2, EFLI Zs (dead and live tests in BS 7671 643 order). (5) If still inconclusive — install PQ analyser for 24–72 hours. The sequence escalates from quick / cheap / safe to slow / expensive / higher-risk only as needed. Many faults solve at step 1–3 without ever needing the full BS 7671 643 sequence.",
      "Always full sequence.",
      "Always IR first.",
    ],
    correctAnswer: 1,
    explanation:
      "Hypothesis-driven test sequencing is the L3 efficiency. A simple HRJ on the supply tail can be diagnosed in 10 minutes with thermal imaging + clamp meter + customer interview. Running the full BS 7671 643 sequence on every circuit takes 3 hours and finds the same fault. The faster route requires the discipline to know when 'enough' testing has confirmed the hypothesis.",
  },
  {
    id: 6,
    question: "What's a 'continuity proving' test and how is it different from R1+R2?",
    options: [
      "Same.",
      "Continuity proving (sometimes 'continuity check') is a quick low-current test (typically 200 mA on the MFT or multimeter on continuity range) to confirm a connection exists — yes/no, not a precise measurement. R1+R2 is a precise measurement of the loop resistance of a complete circuit (line + protective conductor). For fault diagnosis: continuity proving is used to quickly verify that an isolation has fully disconnected a circuit (continuity from supply to load reads OPEN); R1+R2 is used to precisely characterise a circuit's loop resistance for comparison against expected design values. Both have their place; the L3 apprentice uses them at different stages.",
      "Continuity is precise.",
      "R1+R2 is fast.",
    ],
    correctAnswer: 1,
    explanation:
      "Continuity proving is the quick yes/no test. R1+R2 is the precise measurement. The MFT does both. Use continuity proving for verification (is this isolated?); use R1+R2 for characterisation (does this circuit's loop match expected design?).",
  },
  {
    id: 7,
    question: "When testing EFLI, why must you confirm the supply is energised AND the protective device is in the ON position?",
    options: [
      "Just protocol.",
      "Because EFLI is a LIVE test — the MFT injects a small fault current through the loop and measures the impedance from the response. If the supply is off, no fault current flows; the meter shows OPEN or undefined reading. If the protective device is OFF, the loop is broken upstream of your test point; same result. Both conditions are pre-requisites for a meaningful EFLI test. The MFT (Megger MFT1741+) typically warns 'NO VOLTAGE' or 'CIRCUIT OPEN' if either condition isn't met — but the apprentice should know to check before the warning.",
      "Doesn't matter.",
      "Just push test.",
    ],
    correctAnswer: 1,
    explanation:
      "Live test pre-requisites are easy to forget. Modern MFTs warn but the discipline is to check upfront — supply on, protective device on, leads connected to the right test point, RCD-protected mode if needed. The 'check upfront' habit catches the conditions that would otherwise produce an invalid reading.",
  },
  {
    id: 8,
    question: "What's the L3 apprentice's role when supply identification reveals an unusual or unexpected arrangement (e.g. TT in a built-up area, or three-phase supply you weren't expecting)?",
    options: [
      "Carry on regardless.",
      "Stop and verify before testing. Unusual supply arrangements suggest either (a) the property is genuinely TT (rural, older, or specifically designed) which may need different fault-diagnosis approach, OR (b) the customer's installation isn't what you expected from the booking (e.g. an older commercial site with three-phase supply you weren't briefed on). Either way, the test plan needs to match the actual supply. Escalate to supervisor if unsure; update the RAMS to reflect the actual installation; brief the customer if the work scope changes. Never just push ahead with the test plan you arrived with if it doesn't match what you find.",
      "Test anyway.",
      "Same procedure.",
    ],
    correctAnswer: 1,
    explanation:
      "Supply identification is the first technical check on any fault-diagnosis visit. If what you find doesn't match what you expected, the test plan needs updating. The discipline of pausing-and-verifying when reality doesn't match expectations is part of safe working — assumptions that aren't checked become hazards.",
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
            cite="Source: BS 7671:2018+A4:2026 — Reg 312.2.1.1 update, verbatim from facet."
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
              <li><strong>Zs limit</strong> — Table 41.3 (BS EN 60898 MCBs) or 41.4 (BS EN 61009 RCBOs). Example: 32 A B-curve MCB Zs limit 1.37 Ω at 230 V; 16 A B-curve 2.87 Ω.</li>
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
