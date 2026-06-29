/**
 * Module 4 · Section 6 · Subsection 7 — AMD2 dead-test sequence end-to-end
 * Supplementary Sub — full BS 7671:2018+A4:2026 dead-test sequence per Reg 643.1
 * (continuity → ring final → IR → polarity → earth electrode TT). Pulls together
 * AC 6.1-6.6 into a single end-to-end walkthrough on a domestic CU swap-out
 * (8 circuits, single-phase, TN-C-S, all RCBOs). Cross-refs to §5 Sub3 (prep)
 * and §3 Sub7 (safe isolation).
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

const TITLE = 'A4:2026 dead-test sequence end-to-end | Level 2 Module 4.6.7 | Elec-Mate';
const DESCRIPTION =
  'Walk-through of the full BS 7671 dead-test sequence on a domestic CU swap-out — 8 circuits, single-phase, TN-C-S — with realistic readings at each step and the bridge to live tests after first energisation.';

const checks = [
  {
    id: 'm4-s6-sub7-sequence-order',
    question:
      'You have just verified safe isolation on a freshly installed domestic CU. Which test do you carry out FIRST per the BS 7671 dead-test sequence?',
    options: [
      'Insulation resistance — testing the insulation between conductors first proves the cable is sound before any other reading is taken.',
      'Continuity of protective conductors (R1+R2 for circuit CPCs and continuity of bonding conductors). Continuity comes first because every other test downstream assumes a working earth path back to the MET.',
      'Polarity — confirming line, neutral and earth are on the correct terminals must come first so the other readings are taken on correctly connected conductors.',
      'Earth electrode resistance — establishing the quality of the earth connection is the foundation for every other dead test, so it is done first.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Section 643 sequence: continuity of protective conductors first (Reg 643.2.1), then ring final continuity (Reg 643.2.1(b)), then insulation resistance (Reg 643.3), then polarity (Reg 643.6), then earth electrode (Reg 643.7.2 — TT only). Live tests follow first energisation. Continuity first because the CPC is the reference path for IR-to-earth, polarity continuity tests, and ultimately for fault clearance.',
  },
  {
    id: 'm4-s6-sub7-skip-continuity',
    question:
      'You bought factory-tested cable and have just installed it on a new circuit. Can you skip the post-installation continuity test on the basis that the cable was tested by the manufacturer?',
    options: [
      'Yes — a manufacturer\'s factory test certificate covers the conductors, so a post-installation continuity test simply duplicates work already done and can be omitted.',
      'Yes, provided you record the cable\'s batch number on the STR — the batch traceability replaces the need for an on-site continuity reading.',
      'Only on a radial circuit — factory testing is sufficient for radials, but a ring final still needs its continuity proving because of the loop.',
      'No — Reg 643.2.1 requires continuity of conductors and connections to be verified by measurement of resistance after installation, regardless of any pre-installation test. Installation can damage cable (back-box pinches, terminal swaps, damaged sheaths) and the post-install test is the only verification that the installed circuit works end-to-end.',
    ],
    correctIndex: 3,
    explanation:
      'Cable factory tests prove the cable as supplied. Reg 643.2.1 requires continuity verification of conductors AND connections — that is, the installed circuit including every termination. Installation damage and termination errors are the most common defects, both invisible without the post-install test.',
  },
  {
    id: 'm4-s6-sub7-ze-when',
    question: 'Where does the Ze measurement at the MET fit into the test sequence?',
    options: [
      'Ze is a LIVE test — it requires the supply to be energised and the measurement is taken at the MET with the installation isolated. It is part of the live test sequence after first energisation, but its value is needed for the dead-test sequence Zs calculations (Zs = Ze + R1+R2). On a new install, Ze is typically measured early in the live-test phase but estimated from DNO published values during dead-test design verification.',
      'Ze is the first dead test — you measure it at the MET with the supply isolated, before continuity, because every Zs calculation depends on it.',
      'Ze is measured at the same time as insulation resistance, using the 500 V DC test signal injected from the MET to earth, midway through the dead sequence.',
      'Ze is not measured at all on a new installation — you always use the DNO\'s published worst-case figure and never take a live reading.',
    ],
    correctIndex: 0,
    explanation:
      'Ze is measured live with a loop tester at the MET. On a new install you measure Ze first thing after first energisation, then use it to verify Zs at every circuit by combining with the dead-test R1+R2 readings. During the dead-test phase you can use the DNO\'s published worst-case Ze (0.35 Ω TN-C-S, 0.8 Ω TN-S, 21 Ω TT) to verify your design, then re-confirm with the actual measured Ze post-energisation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The BS 7671 Section 643 dead-test sequence in correct order:',
    options: [
      'Insulation resistance → continuity of CPCs → polarity → ring final continuity → earth electrode (TT only). Then live tests.',
      'Safe isolation verified → continuity of CPCs (incl bonding) → ring final continuity → insulation resistance → polarity → earth electrode (TT only). Then LIVE: Ze, PFC, Zs at far end, RCD trip times, functional.',
      'Polarity → insulation resistance → continuity of CPCs → ring final continuity → earth electrode (TT only). Then live tests.',
      'Continuity of CPCs → polarity → insulation resistance → Ze at the MET → RCD trip times. All carried out dead before energising.',
    ],
    correctAnswer: 1,
    explanation:
      'The correct sequence per BS 7671 Section 643 + IET GN3. Each test depends on the previous ones — IR with a broken CPC is meaningless; polarity with broken continuity is meaningless. Get the order right and you build verified confidence in the install step by step. The live tests follow after first energisation: Ze (loop tester at MET), PFC (prospective fault current), Zs measured at far end of every circuit, RCD trip times at 1 × IΔn, functional tests.',
  },
  {
    id: 2,
    question: 'For an 8-circuit domestic CU swap-out, single-phase, TN-C-S, all RCBOs (Type A 30 mA), how many R1+R2 readings will you take at minimum during the dead-test sequence?',
    options: [
      'One — a single R1+R2 reading at the main switch covers the whole board, because all the circuit CPCs share the same earth bar.',
      'Sixteen — two readings per circuit (one at the board, one at the furthest point), giving complete coverage of each circuit\'s CPC.',
      'Eight — one per circuit. (Plus three end-to-end r1, rn, r2 per ring final, so any kitchen / sockets ring will have 4-5 readings depending on whether you also do all eight cross-connection sockets per ring.)',
      'Four — one per pair of circuits, because adjacent circuits sharing a cable route can be tested together to save time.',
    ],
    correctAnswer: 2,
    explanation:
      'Minimum eight R1+R2 readings — one per circuit. Ring finals add the three end-to-end values (r1, rn, r2) plus one cross-connection L-N reading and one cross-connection L-CPC reading per accessible socket on the ring (typical kitchen ring with 8 sockets = 16 cross-connection readings, plus the three end-to-end readings). Plus continuity of all main bonding conductors (gas, water etc.). On a typical domestic install you are looking at 30-50 individual continuity readings during the dead-test phase.',
  },
  {
    id: 3,
    question: 'IR test: what test voltage and acceptance value for a standard 230 V circuit per A4:2026 Table 64?',
    options: [
      '250 V DC, 0.5 MΩ minimum — the lower test voltage avoids damaging any accessories on the circuit.',
      '1000 V DC, 1.0 MΩ minimum — the higher voltage is used on 230 V circuits to stress-test the insulation to twice working voltage.',
      '500 V AC, 100 MΩ minimum — an AC test at mains voltage with a high acceptance value to match new-cable performance.',
      '500 V DC, 1.0 MΩ minimum (with the 250 V DC follow-up at 1 MΩ minimum after reconnection of any electronics that were disconnected per Reg 643.3.3).',
    ],
    correctAnswer: 3,
    explanation:
      'Table 64 — circuits up to and including 500 V (with the exception of SELV/PELV): test voltage 500 V DC, minimum IR 1.0 MΩ. A4:2026 Reg 643.3.3 added the 250 V DC follow-up test at 1 MΩ minimum after reconnection of any electronic equipment that had to be disconnected for the main test.',
  },
  {
    id: 4,
    question: 'When you reach the polarity test in the dead sequence, what specifically are you verifying per Reg 643.6?',
    options: [
      '(a) Every fuse and single-pole control / protective device is in the line conductor only; (b) ES and BC lampholder outer / screwed contacts are on neutral; (c) wiring is correctly connected throughout.',
      '(a) The supply voltage is within 230 V +10%/−6%; (b) the earth-loop impedance is below the table limit; (c) the RCD trips within 300 ms.',
      '(a) Insulation resistance is above 1 MΩ; (b) the CPC is continuous; (c) every accessory is fed in the correct cable size.',
      '(a) The neutral is bonded to earth at the board; (b) every protective device is double-pole; (c) the earth electrode resistance is below 200 Ω.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.6 sets out three polarity verifications. The dead polarity test (continuity from CU line out to L of every accessory) addresses all three. After first energisation a live polarity test confirms the supply itself is correctly connected (in case the meter tails were swapped at installation).',
  },
  {
    id: 5,
    question: 'A circuit feeding an EV charger — what additional disconnections do you need before the IR test?',
    options: [
      'None — an EV charger is a fixed appliance designed to withstand the 500 V DC test, so you test the circuit with the charger left connected and read it normally.',
      'Disconnect at the EV charger\'s own isolator / port connection. The charger control board has isolation monitoring electronics that will be triggered or damaged by the 500 V DC test signal. Per Reg 643.3.3, after reconnection apply the 250 V DC follow-up test (≥ 1 MΩ).',
      'Disconnect the main earthing conductor at the MET so the charger\'s own earth electrode does not parallel the test path and lower the reading.',
      'Disconnect the RCD protecting the charger circuit, because its sensing electronics will short the 500 V DC test signal to earth and give a false low reading.',
    ],
    correctAnswer: 1,
    explanation:
      'EV chargers (and most modern smart appliances) include electronics that are vulnerable to or interfere with the 500 V DC IR test. Disconnect at the charger\'s isolator before IR testing the cable. After reconnection, apply the A4:2026 follow-up 250 V DC test between linked L+N and earth at the charger\'s isolator — confirms the charger\'s own internal insulation is sound at ≥ 1 MΩ.',
  },
  {
    id: 6,
    question: 'On a 12-circuit CU you have completed all dead tests. One circuit fails IR (reads 0.7 MΩ). You investigate and find a back-box where the cable sheath has been pinched against a sharp burr on the metal box. After re-routing and protecting the cable, what is the correct next action?',
    options: [
      'Just re-test the IR on that one circuit — the pinch only affected insulation, so once the IR passes there is no need to revisit any other reading.',
      'Re-test every circuit on the board from scratch — a single fault on one circuit invalidates the whole dead-test sequence, so the full set must be repeated.',
      'Per Reg 643.7.2 (paraphrased): "If any test indicates a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified." So: repeat IR on the rectified circuit; also repeat continuity on that circuit (which preceded IR and could have been influenced by the same fault). Document corrected reading on the STR.',
      'Record the original 0.7 MΩ reading on the STR with a note that it was repaired — there is no need to re-test once the cause has been removed.',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.7.2 (and IET GN3): if a test fails, fix the fault and repeat that test plus any preceding test that could have been influenced. A pinched cable sheath could affect continuity readings (parallel paths via the metal box and CPC) as well as IR — re-test both. Document the original failed reading, the corrective action, and the post-correction passing reading on the STR for the audit trail.',
  },
  {
    id: 7,
    question: 'After all dead tests pass, you energise the CU. What is the FIRST live test you carry out?',
    options: [
      'Insulation resistance at 500 V DC across the whole installation, to confirm nothing was disturbed during energisation before any loop testing begins.',
      'RCD trip times at every outgoing way — testing the protective devices first ensures the board is safe before any other live measurement is taken.',
      'Zs at the furthest socket of every circuit, working from the most remote point back towards the board to confirm disconnection times.',
      'Live polarity confirmation at the CU (using an approved voltage indicator) plus Ze measurement at the MET. Live polarity confirms the supply is correctly connected (meter tails not swapped); Ze gives you the supply-side impedance for Zs verification.',
    ],
    correctAnswer: 3,
    explanation:
      'After first energisation: confirm live polarity at the CU first (approved voltage indicator between L and E reads ~230 V; between N and E reads near zero). Then measure Ze at the MET (loop tester from L of the supply to the MET — typically with the installation isolated). PFC measurement next (prospective fault current at the origin). Then circuit-by-circuit Zs (loop test at the far end of every circuit) and RCD trip times. Functional tests close the sequence.',
  },
  {
    id: 8,
    question: 'A 32 A Type B RCBO ring final on TN-C-S. You measure (live test) Zs at the furthest socket = 0.78 Ω. Ze you measured earlier = 0.30 Ω. From the dead-test you computed Zs = 0.75 Ω. A4:2026 Table 41.3 max Zs for B32 = 1.37 Ω. Decide.',
    options: [
      'Pass — both measured (0.78) and calculated (0.75) Zs values are below the 0.8-corrected limit of 1.10 Ω. The 0.03 Ω agreement between measured and calculated is well within expected tolerance and confirms both methods give consistent results.',
      'Fail — the measured Zs of 0.78 Ω exceeds the calculated value of 0.75 Ω, and any measured value above the calculated value is a fail.',
      'Fail — 0.78 Ω is above the 0.4 s disconnection limit of 0.55 Ω for a B32 device, so the circuit does not disconnect fast enough.',
      'Cannot decide — the measured and calculated values disagree, so the result is inconclusive and the circuit must be re-tested before a decision is made.',
    ],
    correctAnswer: 0,
    explanation:
      'Zs (calc from dead test) = Ze + R1+R2 = 0.75 Ω. Zs (live measured) = 0.78 Ω. Difference = 0.03 Ω, within typical agreement (~0.05-0.10 Ω). Both well below corrected limit of 1.37 × 0.8 = 1.10 Ω. Pass. Document both readings on the STR for the audit trail. The agreement between calculated and measured Zs is itself a useful sanity check — large divergence (> 0.2 Ω) would suggest either a bad continuity reading, a contact resistance issue, or a wiring change between the two test phases.',
  },
];

const faqs = [
  {
    question: 'Why is the dead-test sequence ordered the way it is — could you not do them in any order?',
    answer:
      'Each test depends on the previous ones being valid. Continuity first because the CPC is the reference path for everything else — an IR test on a circuit with broken CPC reads open-circuit between the live conductors and earth simply because there is no earth at the test point, masking real insulation defects. Ring final continuity before IR because cross-connection jumpers have to be removed before IR. Polarity after continuity because the polarity test uses continuity readings via the CPC. The order is built up from physical dependencies — mess with it and you risk false passes.',
  },
  {
    question: 'How long does the dead-test sequence take on a typical domestic CU swap-out?',
    answer:
      'For an experienced electrician with a current MFT and a properly prepped install: 1.5-3 hours for an 8-12 circuit domestic CU. Continuity is the slow part because of the per-accessory work (every socket, every switch, every lampholder). Ring tests add another 30-45 minutes per ring. IR is fast — five minutes per circuit. Polarity is fast. Live tests after first energisation add another 60-90 minutes (Ze, PFC, every circuit Zs, RCD trip times, functional). Total commissioning: typically half a day for a CU swap-out, with the test data captured in real time on a digital MFT.',
  },
  {
    question: 'What changed in A4:2026 that affects the dead-test sequence?',
    answer:
      'Three main changes: (1) Table 41.3 max Zs values reduced (e.g. B32 from 1.44 → 1.37 Ω). (2) Reg 643.3.3 added the 250 V DC IR follow-up test after reconnection of disconnected electronics. (3) Reg 643.7.3 / 643.8 redrafted RCD testing — single AC test at 1 × IΔn, ≤ 300 ms general non-delay, 130-500 ms delay-type S; old Table 3A in Appendix 3 deleted. Plus updates to Reg 411.3.3 (RCD on socket-outlets up to 32 A) and AFDD requirements. The sequence itself is unchanged in order; the test parameters and acceptance criteria are updated.',
  },
  {
    question: 'What if I cannot complete the dead-test sequence in one visit (e.g. customer needs to live in part of the property)?',
    answer:
      'Document carefully. Test what you can during each visit, mark untested portions on the STR with "Limitation: not tested at first visit, scheduled for [date]". Do not energise any portion that has not been fully tested. Issue an interim certification only if absolutely required — otherwise hold off on the EIC until all tests are complete. Reg 644.1.1 requires defects to be corrected before certification, and "untested" is an omission that needs resolving before sign-off.',
  },
  {
    question: 'Are there any tests in the dead-test sequence that don\'t apply to a TT installation?',
    answer:
      'TT adds a test (earth electrode resistance per Reg 643.7.2) rather than removing any. The standard sequence still applies: continuity → ring → IR → polarity → earth electrode (TT only). The earth electrode test uses a dedicated electrode tester (3-spike or stake-less clamp). For a single TT property the typical electrode resistance might be 50-200 Ω; combined with a 30 mA RCD this gives a Zs comfortably below the Table 41.5 limit (1667 Ω for 30 mA RCD). Higher-resistance electrodes need investigation — typically improved electrode design or a multi-spike system.',
  },
  {
    question: 'Should I use the dead-test sequence on a periodic inspection (EICR) too?',
    answer:
      'Yes, with adaptation. EICR is mostly visual inspection plus sample testing — you don\'t typically test every circuit and every socket. The dead-test sequence still applies: isolate the circuit you are testing, continuity first, then IR, then polarity. RCD test happens live. Sample size depends on installation type and your professional judgement guided by IET GN3. The sequence order matters for the same reasons as initial verification — each test depends on the previous ones.',
  },
];

export default function Sub7() {
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 7"
            title="A4:2026 dead-test sequence end-to-end"
            description="The complete BS 7671 dead-test sequence walked through on a domestic CU swap-out — 8 circuits, single-phase, TN-C-S — with realistic readings at each step and the bridge to live tests after first energisation."
            tone="emerald"
          />

          <TLDR
            points={[
              'Dead-test sequence per BS 7671 Section 643: safe isolation → continuity of CPCs (incl bonding) → ring final continuity → insulation resistance → polarity → earth electrode (TT only). Live tests follow first energisation.',
              'Each test depends on the previous ones being valid. Continuity first (the CPC is the reference path); IR second (the live conductors against the verified CPC); polarity third (uses continuity); earth electrode last on TT.',
              'A4:2026 brought three sequence-impacting changes: Table 41.3 max Zs values reduced (B32 1.44→1.37 Ω); Reg 643.3.3 added the 250 V DC IR follow-up test; Reg 643.7.3/643.8 redrafted RCD testing (single AC test at 1×IΔn, ≤ 300 ms non-delay).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Supplementary content — extends LO6 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding of the A4:2026 dead-test sequence end-to-end, pulling AC 6.1-6.6 into a single integrated walkthrough.',
              'Walk the complete BS 7671 dead-test sequence in correct order on a domestic CU swap-out.',
              'Identify which test results from earlier in the sequence feed into later tests (e.g. R1+R2 into Zs calc).',
              'Apply the A4:2026 updates: revised Table 41.3 max Zs values, the 250 V DC IR follow-up test, the simplified RCD trip-time test.',
              'Bridge from dead-test sequence to live-test sequence after first energisation: Ze, PFC, Zs at far end, RCD trip times, functional.',
              'Cite all the relevant Section 643 regs: 643.1, 643.2.1, 643.3, 643.6, 643.7, 643.8, 643.10.',
              'Apply Reg 643.7.2 (paraphrased) — repeat any failed test plus preceding tests after rectification.',
              'Manage time and sequence on a real install — typical timings, common decision points, when to pause for investigation.',
              'Document the entire sequence on the schedule of test results with realistic readings at every step.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The complete dead-test sequence</ContentEyebrow>

          <ConceptBlock
            title="The seven dead-test phases (in order)"
            plainEnglish="Isolation → continuity → ring final → IR → polarity → earth electrode (TT only) → bridge to live."
            onSite="Each phase has a regulation behind it. Take them in order; document each as you go; do not progress to the next phase if the previous one has unresolved issues."
          >
            <p>The complete dead-test sequence per BS 7671 Section 643:</p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Phase 0 — Safe isolation</strong> (per Module 4 Section 3 / JIB sequence).
                Identify the circuit, isolate, lock off, prove the proving unit, prove the
                circuit dead at the point of work, prove the proving unit again. Documented
                under Reg 132.16 (cross-reference) and Reg 537 (isolation devices).
              </li>
              <li>
                <strong>Phase 1 — Continuity of CPCs and bonding</strong> (Sub 1, Reg 643.2.1).
                R1+R2 loop method on every final circuit. R2-only with wander lead on every
                bonding conductor.
              </li>
              <li>
                <strong>Phase 2 — Ring final continuity</strong> (Sub 2, Reg 643.2.1(b)). Three-part
                test on every ring: end-to-end r1/rn/r2; L-N cross-connection at every socket;
                L-CPC cross-connection at every socket.
              </li>
              <li>
                <strong>Phase 3 — Insulation resistance</strong> (Sub 3, Reg 643.3 / Table 64).
                Disconnect electronics first; 500 V DC between L+N (linked) to E and L to N;
                reconnect electronics; A4:2026 Reg 643.3.3 follow-up at 250 V DC.
              </li>
              <li>
                <strong>Phase 4 — Polarity</strong> (Sub 4, Reg 643.6). Continuity from CU line
                out to L terminal of every accessory; OL to N terminal. Verify single-pole
                devices in line, BC/ES outer contacts on neutral.
              </li>
              <li>
                <strong>Phase 5 — Earth electrode resistance (TT only)</strong> (Reg 643.7.2).
                3-spike or stake-less clamp method. Typical 50-200 Ω for a single domestic
                electrode; verify against Table 41.5 max Zs for the RCD rating.
              </li>
              <li>
                <strong>Phase 6 — Bridge to LIVE tests.</strong> Re-make all CU terminations,
                fit any temporary covers / blanks for safety. Verify safe-to-energise. First
                energisation. Then live polarity → Ze → PFC → Zs at far end of every circuit
                → RCD trip times → functional.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.7.2 (Sequence and re-testing after fault rectification) — paraphrased"
            clause="If any test indicates a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified."
            meaning={
              <>
                When a test fails: fix the fault, then re-do that test AND any earlier tests in
                the sequence whose results could have been distorted by the same fault. Example:
                IR fails because of a pinched cable. The pinch could also have affected the
                earlier continuity reading (parallel path via the box). After fixing the pinch,
                re-test continuity and IR. Document: original failing reading, corrective action,
                post-correction passing reading.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.7.2 (paraphrased)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worked walk-through — 8-circuit domestic CU swap</ContentEyebrow>

          <ConceptBlock
            title="The install — what you are testing"
            plainEnglish="Domestic 3-bed property, single-phase TN-C-S supply, brand-new metal CU with all RCBOs (Type A 30 mA), 8 final circuits."
            onSite="Typical UK domestic refurb scenario. Existing wiring retained, new CU and protective devices fitted. Dead-test sequence on the new protective device side is what proves the install is safe to switch on."
          >
            <p>Circuit list (typical):</p>
            <ul className="space-y-1 list-disc pl-5 marker:text-elec-yellow/70 text-[13px]">
              <li>C1 — Lighting downstairs — B6 RCBO, 1.5/1.0 T&E, ~30 m</li>
              <li>C2 — Lighting upstairs — B6 RCBO, 1.5/1.0 T&E, ~25 m</li>
              <li>C3 — Sockets downstairs ring final — B32 RCBO, 2.5/1.5 T&E, ~28 m loop</li>
              <li>C4 — Sockets upstairs ring final — B32 RCBO, 2.5/1.5 T&E, ~24 m loop</li>
              <li>C5 — Kitchen ring final — B32 RCBO, 2.5/1.5 T&E, ~28 m loop</li>
              <li>C6 — Cooker — B32 RCBO, 6.0/2.5 T&E, ~10 m radial</li>
              <li>C7 — Immersion — B16 RCBO, 2.5/1.5 T&E, ~12 m radial</li>
              <li>C8 — EV charger sub-circuit — C40 RCBO Type A, 10/4 SWA, ~15 m radial</li>
            </ul>
            <p>Plus: SPD module on incoming side; main bonding to gas (15mm copper, ~5m run from MET).</p>

            <p>Supply: TN-C-S, single-phase 230 V 50 Hz. DNO published Ze (worst-case) 0.35 Ω.</p>
          </ConceptBlock>

          <ConceptBlock
            title="Phase 1 — Continuity (typical readings)"
            plainEnglish="Disconnect each circuit at CU. Link L+CPC at far end. Read R1+R2 from CU."
          >
            <p>Walk-through with realistic numbers:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-3 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Circuit</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">R1+R2 measured</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Zs (calc, Ze=0.35)</div>

                <div>C1 — Lighting d/s (1.5/1.0)</div><div>0.95 Ω</div><div>1.30 Ω (max for B6 = 7.28 → corrected 5.82 → pass)</div>
                <div>C2 — Lighting u/s (1.5/1.0)</div><div>0.78 Ω</div><div>1.13 Ω → pass for B6</div>
                <div>C3 — Ring d/s (2.5/1.5, post Part 3)</div><div>0.21 Ω</div><div>0.56 Ω → pass for B32 (max 1.37→corrected 1.10)</div>
                <div>C4 — Ring u/s (2.5/1.5)</div><div>0.18 Ω</div><div>0.53 Ω → pass for B32</div>
                <div>C5 — Kitchen ring (2.5/1.5)</div><div>0.22 Ω</div><div>0.57 Ω → pass for B32</div>
                <div>C6 — Cooker (6.0/2.5)</div><div>0.11 Ω</div><div>0.46 Ω → pass for B32</div>
                <div>C7 — Immersion (2.5/1.5)</div><div>0.18 Ω</div><div>0.53 Ω → pass for B16 (max 2.73→corrected 2.18)</div>
                <div>C8 — EV (10/4 SWA)</div><div>0.06 Ω</div><div>0.41 Ω → pass for C40 (Type C tighter limit ~0.55 Ω corrected)</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                { c: 'C1 — Lighting d/s', r: '0.95 Ω', z: '1.30 Ω → pass for B6' },
                { c: 'C2 — Lighting u/s', r: '0.78 Ω', z: '1.13 Ω → pass for B6' },
                { c: 'C3 — Ring d/s', r: '0.21 Ω', z: '0.56 Ω → pass for B32' },
                { c: 'C4 — Ring u/s', r: '0.18 Ω', z: '0.53 Ω → pass for B32' },
                { c: 'C5 — Kitchen ring', r: '0.22 Ω', z: '0.57 Ω → pass for B32' },
                { c: 'C6 — Cooker', r: '0.11 Ω', z: '0.46 Ω → pass for B32' },
                { c: 'C7 — Immersion', r: '0.18 Ω', z: '0.53 Ω → pass for B16' },
                { c: 'C8 — EV charger', r: '0.06 Ω', z: '0.41 Ω → pass for C40' },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">{row.c}</div>
                  <div className="grid grid-cols-2 gap-2 mt-1.5">
                    <div>
                      <div className="text-[10.5px] uppercase tracking-wide text-white/50">R1+R2</div>
                      <div className="text-white/90 font-mono">{row.r}</div>
                    </div>
                    <div>
                      <div className="text-[10.5px] uppercase tracking-wide text-white/50">Zs (calc, Ze=0.35)</div>
                      <div className="text-white/80 font-mono text-[12px]">{row.z}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p>
              All eight circuits comfortably below the corrected A4:2026 Table 41.3 limits.
              Bonding: 10 mm² main bonding to gas measured 0.04 Ω end-to-end — pass (well below
              the 0.05 Ω rule of thumb). Continuity phase complete.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Phase 2 — Ring final tests (C3, C4, C5)"
            plainEnglish="Three rings get the full three-part test. End-to-end r1, rn, r2; L-N cross-connection; L-CPC cross-connection."
          >
            <p>Kitchen ring (C5) detailed walk-through:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Part 1 — end-to-end:</strong> r1 = 0.32 Ω, rn = 0.34 Ω, r2 = 0.55 Ω. r1 ≈ rn (within 6 %, fine); r2 ≈ r1 × 1.7 (close to expected 1.63 ratio). Pass.</li>
              <li><strong>Part 2 — L-N cross-connection:</strong> readings at all 8 sockets between 0.16 and 0.18 Ω. Constant within 12 % across all sockets. Intact ring on L and N. Pass.</li>
              <li><strong>Part 3 — L-CPC cross-connection:</strong> readings at all 8 sockets between 0.20 and 0.22 Ω. Highest = 0.22 Ω → R1+R2 for the circuit.</li>
              <li><strong>Zs (calc):</strong> Ze + R1+R2 = 0.35 + 0.22 = 0.57 Ω. Pass against B32 corrected limit 1.10 Ω.</li>
            </ul>
            <p>
              Same procedure for C3 and C4 — both pass. Cross-connection jumpers removed at the
              CU; all conductors re-landed in correct terminals; visual polarity check at the
              terminations confirms L into protective device, N into neutral bar.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Phase 3 — Insulation resistance (with A4:2026 disconnect-and-retest)"
            plainEnglish="SPD module out, dimmers off, EV charger disconnected at its isolator. 500 V DC L+N to E per circuit. Then reconnect everything and apply the 250 V DC follow-up."
          >
            <p>Pre-test: lift SPD module from CU; isolate EV charger at port; switch lighting dimmers off (or remove if removable). Switch every functional switch ON so all downstream cabling is included.</p>
            <p>500 V DC results (linked L+N to E):</p>
            <ul className="space-y-1 list-disc pl-5 marker:text-elec-yellow/70 text-[13px]">
              <li>C1: &gt;999 MΩ (off scale)</li>
              <li>C2: &gt;999 MΩ</li>
              <li>C3: &gt;999 MΩ</li>
              <li>C4: 480 MΩ — investigate (reading lower than peers, but well above 1 MΩ minimum)</li>
              <li>C5: &gt;999 MΩ</li>
              <li>C6: &gt;999 MΩ</li>
              <li>C7: &gt;999 MΩ</li>
              <li>C8: &gt;999 MΩ</li>
            </ul>
            <p>
              C4\'s 480 MΩ is a pass (above 1 MΩ) but the order of magnitude lower than peers
              warrants a quick investigation. You walk the circuit and find one back-box where
              the cable sheath has been pinched at a sharp metal edge — minor damage, no breach
              of insulation but presenting some leakage. Re-route, protect with grommet,
              re-test. New reading: &gt;999 MΩ. Per Reg 643.7.2, also re-test continuity on C4 —
              R1+R2 still 0.18 Ω, no change. Document original 480 MΩ reading, corrective action,
              corrected &gt;999 MΩ on STR.
            </p>
            <p>L-N tests on each circuit also &gt;999 MΩ across the board. Pass.</p>
            <p>
              Reconnect SPD, dimmers, EV charger. Apply 250 V DC follow-up between linked L+N
              and earth at the incoming side: reading 35 MΩ (lower than the 500 V test because
              of the SPD\'s capacitive coupling, but well above 1 MΩ). Pass.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Phase 4 — Polarity"
            plainEnglish="Continuity from CU line out to L terminal of every accessory; OL to N terminal. Repeat at every accessory of every circuit."
          >
            <p>
              Methodical work-through each circuit, tick each accessory as it passes. Total
              accessory count on this install: ~50 (8 ceiling lights, 12 wall switches, 32
              sockets, 1 cooker outlet, 1 immersion isolator, 1 EV charger isolator). Estimated
              time: 60-90 minutes. All pass — no reverse polarity errors found. Tick polarity
              column on STR for every circuit.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Phase 5 — Earth electrode (N/A — TN-C-S)"
            plainEnglish="Skip on TN-C-S. Document N/A on the STR."
          >
            <p>
              TN-C-S supply means the earth fault path returns via the DNO PEN conductor, not
              via a property earth electrode. No earth electrode test required. Document on STR
              as "N/A — TN-C-S supply" in the earth electrode column.
            </p>
            <p>
              For comparison: on a TT install you would carry out the earth electrode test
              here, expecting 50-200 Ω for a single domestic electrode, well within the
              Table 41.5 limit of 1667 Ω for a 30 mA RCD.
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

          <ContentEyebrow>Bridge to live tests</ContentEyebrow>

          <ConceptBlock
            title="From dead to live — first energisation"
            plainEnglish="All dead tests pass. Re-make any disconnected terminations. Verify safe to energise. Switch on. Then live tests."
            onSite="Live tests prove what you assumed during dead testing. Live polarity confirms supply is correct. Ze gives you actual supply impedance. Zs at far end measures what the dead-test calc predicted."
          >
            <p>The live test sequence after first energisation:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Live polarity at the CU:</strong> approved voltage indicator between L
                and E reads ~230 V; between N and E reads near zero. Confirms supply polarity is
                correct (meter tails not swapped at installation).
              </li>
              <li>
                <strong>Ze at the MET:</strong> loop tester between L of the supply and the MET,
                with the installation isolated. Measure. On this install, measured Ze = 0.32 Ω
                — close to DNO published 0.35 Ω. Use measured value for all Zs verification.
              </li>
              <li>
                <strong>PFC at origin:</strong> prospective fault current measurement. Records
                the maximum fault current available at the CU — used for switchgear breaking
                capacity verification.
              </li>
              <li>
                <strong>Zs at far end of every circuit:</strong> loop tester at the furthest
                accessory of each circuit. Records actual loop impedance under live conditions.
                Compare against dead-test calc; should agree to within ~0.05-0.10 Ω.
              </li>
              <li>
                <strong>RCD trip times:</strong> instrument-based test at 1 × IΔn for every
                RCD/RCBO. ≤ 300 ms acceptance (general non-delay). Record per A4:2026 Reg 643.7.3
                / 643.8.
              </li>
              <li>
                <strong>Functional tests:</strong> integral RCD test buttons, AFDD test
                facilities, switchgear function, emergency stops, control logic.
              </li>
            </ol>
            <p>
              For this install all Zs measurements come in within 0.05 Ω of the dead-test calcs.
              All RCD trip times between 22 ms and 35 ms (well under 300 ms). All functional
              tests pass. EIC + Schedule of Inspections + STR completed and issued. NICEIC
              upload within 24 hours.
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

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Skipping continuity to save time because the cable was tested at delivery"
            whatHappens={
              <>
                You think the cable came off a sealed drum direct from the supplier with a
                manufacturer\'s test certificate, so you skip the post-installation continuity
                test on the new ring final. You progress straight to IR (which passes), polarity
                (which passes), and energise. The customer reports a tripping RCBO three weeks
                later. Investigation reveals one of the back-box CPCs was pinched under a
                terminal screw and was making intermittent contact — perfect for normal load
                but the increased Zs caused the RCBO to nuisance-trip on transient faults.
                A simple R1+R2 measurement at install would have caught it in ten seconds.
              </>
            }
            doInstead={
              <>
                Reg 643.2.1 mandates continuity verification by measurement after installation,
                regardless of any pre-installation test of the cable. Run the test every time,
                on every new circuit, on every modification. R1+R2 reading takes thirty
                seconds; the consequences of skipping it are days of fault-finding and an
                unhappy customer. A4:2026 also doubles down — Reg 643.7.2 (paraphrased) makes
                clear that test results that depend on continuity are invalid if continuity
                itself is not verified.
              </>
            }
          />

          <Scenario
            title="When the dead-test sequence detects something serious"
            situation={
              <>
                Mid-way through the IR phase on a 12-circuit commercial unit refit, you measure
                the IR on the air conditioning circuit. Reading: 0.4 MΩ — fail. You investigate.
                It turns out the AC contactor and its control relay had been left landed during
                the IR test (you missed them on the disconnect-required walk). You disconnect,
                re-test the circuit cable: &gt;999 MΩ — pass. Reconnect the contactor and relay.
                Apply A4:2026 250 V DC follow-up: 8 MΩ — pass. But you also note from the
                instrument display that the AC unit\'s built-in soft-start board indicated a
                fault when you energised it briefly during the test — possibly damaged by the
                500 V test exposure.
              </>
            }
            whatToDo={
              <>
                Stop. Per Reg 643.7.2, repeat the failed test (IR — done, now passes after
                disconnection) and any preceding tests that could have been influenced (continuity
                — repeat on this circuit; the 500 V exposure may have compromised the AC unit\'s
                internal protection earth).
                <br />
                <br />
                Document everything: original failing IR with the contactor in (0.4 MΩ);
                disconnection action; corrected IR (&gt;999 MΩ); reconnection; 250 V DC
                follow-up reading (8 MΩ); the AC fault indication. Bring the AC unit\'s
                manufacturer into the conversation — they may need to assess whether the
                500 V DC test damaged the soft-start board. If damaged, the unit must be
                repaired or replaced before sign-off; per Reg 644.1.1 the EIC cannot be issued
                with a known defect.
                <br />
                <br />
                Lesson learned: the disconnect-required walk is critical. Build a checklist for
                each install — every contactor, relay, electronic device gets ticked off the
                disconnect list before the IR test starts. A4:2026\'s 250 V DC follow-up is
                designed to catch the equipment that was disconnected; it does not catch
                equipment that was wrongly left in for the 500 V DC test.
              </>
            }
            whyItMatters={
              <>
                The dead-test sequence works because of its order and discipline. Skipping the
                disconnect step or accepting borderline readings without investigation produces
                certificates that pass on paper but fail in service. Customers, insurers and
                future inspectors all rely on the test sequence having been done correctly —
                short-cuts here are the most expensive kind of saved time in the industry.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Section 643 dead-test sequence: safe isolation → continuity (CPCs + bonding) → ring final continuity → insulation resistance → polarity → earth electrode (TT only). Live tests follow first energisation.',
              'Each test depends on the previous ones being valid. Get the order right; document each step; do not progress with unresolved issues.',
              'A4:2026 changes affecting the sequence: revised Table 41.3 max Zs (B32 1.44→1.37 Ω); Reg 643.3.3 added the 250 V DC IR follow-up after reconnection; Reg 643.7.3/643.8 simplified RCD testing to a single 1×IΔn AC test (≤ 300 ms general non-delay).',
              'Reg 643.7.2 (paraphrased): when a test fails, fix the fault and repeat that test PLUS any preceding tests that could have been influenced. Document the original reading, the action, and the corrected reading.',
              'Live test sequence after first energisation: live polarity → Ze → PFC → Zs at far end of every circuit → RCD trip times → functional. Compare live Zs to dead-test calc — should agree to ~0.05-0.10 Ω.',
              'Ze typically measured 0.20-0.40 Ω on TN-C-S, 0.6-1.0 Ω on TN-S, 50-200 Ω on TT. Use measured Ze (not DNO published worst-case) for final Zs verification.',
              'Bonding continuity: < 0.05 Ω rule of thumb for main bonding runs; no specific BS 7671 numerical limit but the regulation requires "negligible resistance".',
              'On a typical domestic CU swap-out (8-12 circuits), expect 1.5-3 hours dead-test plus 60-90 minutes live-test. Modern MFTs auto-record values to integrate with certification software.',
            ]}
          />

          <Quiz title="Dead-test sequence — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.6 Record test results
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-8')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.8 Completing the Schedule of Test Results
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
