import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  AmendmentBadge,
  CommonMistake,
  ConceptBlock,
  ContentEyebrow,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegBadge,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';
import { videos } from '@/data/study-centre/video-library';

const inlineChecks = [
  {
    id: 'm6s3-sequence-order',
    question:
      'Why does Reg 643.1 fix the order of the dead tests (continuity → IR → polarity → Zs → RCD → phase rotation) rather than letting the inspector run them in any order they like?',
    options: [
      'It is a tradition carried over from the 16th edition with no real reason behind it',
      'Each test depends on the previous one having succeeded — running them out of order can hide a fault, damage instruments or expose the inspector to risk',
      'The order only matters for three-phase circuits',
      'BS 7671 lets you run them in any order as long as you record the results',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.1 sets the sequence because each test relies on the previous one passing. Running insulation resistance before continuity can mask an open CPC (the missing path looks like a high IR result). Running Zs before polarity can drive line voltage onto the wrong terminal. The order is engineered: each step closes off a class of fault before the next is meaningful.',
  },
  {
    id: 'm6s3-r1r2-method',
    question:
      'You are about to verify continuity of CPCs on a final ring circuit. The R1+R2 method is most commonly used because:',
    options: [
      'It is faster than the wander-lead method on every circuit',
      'It links line and CPC at the consumer unit and measures end-to-end at each accessory, giving you R1+R2 directly — which feeds straight into your Zs calculation (Zs = Ze + R1+R2)',
      'It needs no test instrument, just a continuity bell',
      'BS 7671 only recognises R1+R2 — wander leads are not permitted',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.2 requires verification of CPC continuity. The R1+R2 method (cross-link L and CPC at the origin, measure across L and CPC at each accessory) gives the value of R1+R2 in ohms — which is the figure you need for Zs = Ze + R1+R2. The wander-lead method is valid (and sometimes the only option, e.g. on a long bonding conductor without a return route), but it does not produce R1+R2 and you have to derive R1+R2 separately for Zs verification.',
  },
  {
    id: 'm6s3-ir-voltage',
    question:
      'You are testing insulation resistance on a 230 V single-phase circuit during initial verification under Reg 643.3. What test voltage and minimum acceptable IR value applies?',
    options: ['250 V DC, ≥ 0.5 MΩ', '500 V DC, ≥ 1 MΩ', '1000 V DC, ≥ 1 MΩ', '500 V AC, ≥ 2 MΩ'],
    correctIndex: 1,
    explanation:
      'Reg 643.3.2 / Table 64.1: for nominal circuit voltages between 0 and 500 V (i.e. typical LV final and distribution circuits — including 230 V single-phase and 400 V three-phase), the test voltage is 500 V DC and the minimum IR value is 1 MΩ. 250 V DC applies only to SELV / PELV (≤ 50 V) circuits, and 1000 V DC applies to circuits above 500 V. AC test voltages are not used.',
  },
  {
    id: 'm6s3-polarity-where',
    question:
      'Reg 643.6 (polarity) is verified DEAD by continuity testing AND verified live at the end. Which of the following is NOT a polarity-related check during initial verification?',
    options: [
      'That single-pole switching is in the line conductor only',
      'That socket-outlets have line on the right facing the front (UK BS 1363)',
      'That centre-contacts of E14/E27 lampholders are connected to line',
      'That the prospective fault current is below the breaking capacity of the OPD',
    ],
    correctIndex: 3,
    explanation:
      'Reg 643.6 (polarity) confirms (a) single-pole switches and protective devices are in the line conductor, (b) BS 1363 socket-outlets are wired correctly (line on the right when facing the front, with the earth at the top), (c) centre-contacts of Edison-type lampholders are connected to the line conductor, and (d) all wiring is correctly identified. Prospective fault current is a separate test under Reg 643.7 — it confirms the breaking capacity of the OPD is adequate, not polarity.',
  },
  {
    id: 'm6s3-rcd-times',
    question:
      'A 30 mA Type A RCD is being tested under Reg 643.8. Which combination of trip-time targets does BS EN 61008 / 61009 specify for the inspector to verify?',
    options: [
      'At IΔn ≤ 200 ms, at 5×IΔn ≤ 40 ms',
      'At IΔn ≤ 300 ms, at 5×IΔn ≤ 40 ms (and ≤ 150 ms for additional protection)',
      'At IΔn ≤ 500 ms, at 5×IΔn ≤ 50 ms',
      'At IΔn ≤ 1 s for any RCD',
    ],
    correctIndex: 1,
    explanation:
      'For a general-use RCD: at IΔn the device must trip within 300 ms; at 5×IΔn (used to demonstrate fast operation for additional protection) the device must trip within 40 ms. Where the RCD provides additional protection (the typical 30 mA case), the 5×IΔn ≤ 40 ms requirement is the headline number — well below the 150 ms general limit. Type S (selective / time-delayed) RCDs have different windows (130–500 ms at IΔn).',
  },
  {
    id: 'm6s3-zs-correction',
    question:
      'You measure Zs at the furthest point of a 32 A Type B MCB ring final circuit and read 1.30 Ω. The published Zs(max) at 70 °C is 1.37 Ω. Your meter measured at ambient (20 °C). Is the circuit compliant under Reg 643.7.3?',
    options: [
      'Yes — measured Zs is below Zs(max), no further correction needed',
      'Maybe — published Zs(max) values already assume a hot conductor, so a cold reading needs to be temperature-corrected (multiply by ~1.20 for typical PVC) before comparing; 1.30 × 1.20 ≈ 1.56 Ω — non-compliant',
      'No — measured Zs is always too low to be valid',
      'Yes — temperature correction does not apply to ring finals',
    ],
    correctIndex: 1,
    explanation:
      "Reg 643.7.3: the measured Zs must be compared with the maximum permitted Zs corrected to the conductor operating temperature. Published Zs(max) values (Appendix 3 / OSG) are already at 70 °C for thermoplastic. A cold (20 °C) measurement reads lower than the hot value because copper resistance rises with temperature. Either correct the measurement up by the temperature factor (~1.20 for PVC) before comparing, or use the meter's built-in correction. The example shown crosses the limit and would fail.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the correct sequence of dead tests during initial verification under Reg 643.1, in the order BS 7671 specifies?',
    options: [
      'Insulation resistance → continuity → polarity → Zs → RCD',
      'Continuity of protective conductors → continuity of ring final conductors → insulation resistance → polarity (dead) → earth electrode resistance (where relevant) → protection by SELV/PELV/separation',
      'Zs → polarity → IR → continuity → RCD operation',
      'There is no required order — the inspector chooses',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.1 sets the standard sequence. The dead-test block is: (1) continuity of protective conductors and main + supplementary bonding (643.2), (2) continuity of ring final-circuit conductors (643.2.3), (3) insulation resistance (643.3), (4) protection by SELV/PELV/separation (643.4), (5) polarity by continuity (643.6), (6) earth electrode resistance where applicable (643.7.2). Then live tests: (7) polarity confirmation, (8) Zs (643.7.3), (9) prospective fault current (643.7.4), (10) check of phase sequence on three-phase (643.10), (11) functional testing of RCDs (643.8) and switchgear (643.9), (12) verification of voltage drop (643.11) where required.',
  },
  {
    id: 2,
    question:
      'Reg 643.3.2 specifies the test voltage and minimum IR for an LV (50 V to 500 V) circuit. Which row of Table 64.1 applies?',
    options: [
      '250 V DC test, 0.5 MΩ minimum',
      '500 V DC test, 1 MΩ minimum',
      '1000 V DC test, 1 MΩ minimum',
      '500 V AC test, 1 MΩ minimum',
    ],
    correctAnswer: 1,
    explanation:
      'Table 64.1 in BS 7671:2018+A4:2026: (i) ELV ≤ 50 V (SELV/PELV) → 250 V DC, ≥ 0.5 MΩ; (ii) LV up to 500 V → 500 V DC, ≥ 1 MΩ; (iii) > 500 V → 1000 V DC, ≥ 1 MΩ. The 1 MΩ figure is a floor, not a target — a healthy new circuit reads in the hundreds of MΩ or "OL" (over-range). A circuit reading just above 1 MΩ should be investigated, not signed off.',
  },
  {
    id: 3,
    question:
      'During an EICR you find a circuit where the line conductor is being switched but the neutral is being switched too on a single-pole switch. What does Reg 643.6 require, and what is the correct action?',
    options: [
      'Pass — both poles being broken is safer',
      'Fail — single-pole switching shall be in the line conductor only (Reg 643.6 / 537.1.4); the wiring is reversed and a code C2 is appropriate',
      'Pass — polarity is only relevant on socket-outlets',
      'Fail — but only if the circuit is a lighting circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.6 verifies that single-pole devices (switches, OPDs) are in the line conductor only. A single-pole switch in the neutral leaves the lampholder, fitting or accessory live at line voltage when the switch is off — anyone changing a lamp is exposed to a 230 V touch potential with no warning. This is a polarity defect under Reg 643.6 and typically attracts C2 on an EICR (potentially dangerous).',
  },
  {
    id: 4,
    question:
      'Which of these correctly describes the AFDD verification step introduced under A4:2026 on the schedule of test results?',
    options: [
      'AFDDs do not need verifying — manufacturer test is sufficient',
      "A new column / item on the schedule of test results requires the inspector to record that the AFDD self-test (manufacturer's test button or field-test instrument per BS EN 62606) operated correctly — sitting alongside the existing IR / Zs / RCD columns (item 4.23 / col 30 area)",
      'AFDDs only need verifying once every five years',
      'AFDD verification is recorded only on the EIC schedule of inspection, not the schedule of test results',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 brings AFDD requirements (Reg 421.1.7) into clearer focus on the certification forms. The model schedule of test results adds an AFDD self-test verification entry — typically a tick / pass column confirming the device responded to its built-in test or a field test per BS EN 62606. This sits in the test-results block alongside existing IR, polarity, Zs and RCD columns. Manufacturer pre-installation testing alone is not enough — Reg 643 requires the device to be verified IN THE INSTALLATION as part of initial verification.',
  },
  {
    id: 5,
    question:
      'A multifunction tester used for initial verification on a commercial fit-out is found to be 14 months past its last calibration date. Reg 643 / BS EN 61557 implications?',
    options: [
      "It's fine — calibration is a guideline, not mandatory",
      'BS EN 61557 / Reg 643 / GN3 require instruments to be of an appropriate type, accuracy and within calibration; a tester out of calibration cannot be relied on for compliance evidence and certificates produced with it are open to challenge — recall, recalibrate, retest the affected jobs',
      'Only RCD test functions need calibration; IR/continuity functions do not',
      'Calibration is only required for industrial work',
    ],
    correctAnswer: 1,
    explanation:
      'Test instruments used for compliance with BS 7671 must conform to the relevant part of BS EN 61557. GN3 makes calibration a non-negotiable: an out-of-calibration tester cannot be relied on as evidence of compliance. The standard industry practice is annual calibration with monthly user checks (battery, leads, fixed-resistor jig, IR self-check). A tester 14 months out is a procedural failure — recall affected certificates, recalibrate, retest where required.',
  },
  {
    id: 6,
    question:
      'During three-phase commissioning of a small commercial unit, you notice that the supplied phase rotation at the origin is anti-clockwise (L3-L2-L1) instead of the expected L1-L2-L3. What does Reg 643.10 require?',
    options: [
      'Re-energise and accept — rotation does not matter on three-phase',
      "Verify and record the actual phase sequence (Reg 643.10) — three-phase motors and rotation-sensitive equipment depend on it; flag with the DNO if the supply rotation is reversed and correct at the origin or at each motor, never by swapping inside the consumer's installation in a way that conflicts with the supply marking",
      'Reverse two phases anywhere downstream and continue',
      'Only applies if a motor is connected at handover',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 643.10 requires verification of phase sequence on three-phase circuits during initial verification. The result is recorded on the schedule of test results. If the supply rotation is reversed, the correct route is to (a) raise it with the DNO if the supply itself is wrong, or (b) correct rotation at the motor terminations during commissioning, recording the action. Don't silently swap conductors inside the installation if it leaves the conductor identification inconsistent with the cert — that creates a maintenance trap.",
  },
  {
    id: 7,
    question:
      'Reg 643.4 covers protection by SELV, PELV or electrical separation. On a 24 V SELV control circuit, what does the verification specifically check?',
    options: [
      'Only that the secondary voltage is below 50 V',
      'That the SELV source meets Section 414 (safety isolating transformer to BS EN 61558-2-6, simple separation), that the SELV circuit has no intentional earth connection, that basic protection is in place where required (Reg 414.4.4), AND insulation resistance to other circuits is verified per Table 64.1 row (i) — 250 V DC, ≥ 0.5 MΩ',
      'Only the 1 MΩ insulation resistance value',
      'Just visual inspection of the transformer label',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.4 is broader than just measuring volts. It verifies the protective measure is correctly built: source per Section 414, no earth on SELV, basic protection where the voltage exceeds 25 V AC / 60 V DC ripple-free or where equipment is immersed (Reg 414.4.4), and IR between SELV and any other circuit is at the row-(i) value of Table 64.1 (250 V DC test, 0.5 MΩ minimum). Electrical separation (Reg 413) follows similar logic for the separated circuit.',
  },
  {
    id: 8,
    question:
      'You are doing a periodic inspection (EICR) on a 30-year-old industrial unit. The site is fully loaded — production lines running. What does Reg 643 / GN3 say about insulation resistance testing in this context?',
    options: [
      'IR test must be performed at 500 V even with the load connected',
      'Where a full disconnection IR test is impractical without disrupting the user, IR may be omitted as a measured test and verified by other means (e.g. between live conductors and earth at low voltage on de-energised parts, plus inspection); the limitation is recorded on the EICR and the inspector justifies it — an EICR is sample-based, not exhaustive',
      'Disconnect every load forcibly and proceed regardless',
      'Skip IR entirely on every EICR',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 recognises that on a periodic inspection of an in-service installation, fully de-energising for IR testing is often impractical and may itself create risk (loss of refrigeration, IT systems, life-safety). The inspector samples — typically 20% of circuits, 100% of high-risk — and where IR cannot be measured directly the limitation is recorded on the EICR (Section L of the form) with the justification. Reg 643 is the design verification baseline; GN3 / IET Best Practice Guides explain the EICR adaptation in the field.',
  },
];

const faqItems = [
  {
    question:
      'Why is the test sequence in Reg 643.1 not just "best practice" but actually mandatory?',
    answer:
      'Because each test depends on the previous one. Insulation resistance run before continuity can hide an open CPC — the missing earth path reads as "infinite IR" on that side. Polarity verified by continuity before Zs ensures you do not energise the wrong terminal at line voltage. Phase rotation at the end (after dead tests passed) confirms the live commissioning is on a known-good installation. The sequence is the safety mechanism — running it out of order is procedurally non-compliant and can invalidate the cert.',
  },
  {
    question: 'When is the wander-lead method preferred over R1+R2?',
    answer:
      'Wander lead is the right call when there is no convenient short-circuit point at the origin (e.g. measuring a long main earthing conductor or main bonding conductor where you cannot easily link L and CPC). It is also used to verify continuity of supplementary bonding inside locations like bathrooms — measuring directly between two extraneous-conductive-parts. R1+R2 is preferred for circuit testing because it directly produces the value used in Zs calculations.',
  },
  {
    question:
      'What does the new AFDD verification step look like in practice on the schedule of test results?',
    answer:
      "A4:2026 model forms add an AFDD test column / item (commonly cited as item 4.23 or column 30 area depending on the form layout) where the inspector records pass/fail of the in-installation AFDD self-test. The procedure: press the manufacturer's test button on each AFDD with the circuit live; verify the AFDD trips and the indicator activates; reset and confirm normal operation. Some inspectors use a BS EN 62606 field test instrument that injects an arc-fault signature for higher-confidence verification.",
  },
  {
    question: 'Can I skip the live polarity check if dead polarity passed?',
    answer:
      'No — Reg 643.1 still requires verification of polarity at energisation as part of the live test sequence. The two are different evidence: dead polarity (continuity-based) confirms the wiring topology; live polarity confirms the supply is connected the way the design assumes (and that the DNO has not delivered an inverted phase). On a three-phase install this is also where you confirm phase rotation under Reg 643.10.',
  },
  {
    question: 'How do I test IR on a circuit that has electronic equipment hard-wired in?',
    answer:
      'Reg 643.3.3 / GN3: where a 500 V DC test would damage the equipment (electronic dimmers, LED drivers, surge devices, control electronics), either disconnect the equipment or test between the live conductors connected together and earth (so the equipment sees no voltage between L and N during test). SPDs typically need disconnecting or shorting per manufacturer. Record what was disconnected on the cert so the next inspector knows the test boundary.',
  },
  {
    question:
      'What is the difference between IΔn and 5×IΔn RCD timing, and which one matters more?',
    answer:
      'IΔn is the rated residual operating current — for a 30 mA RCD, that is 30 mA. The general standard (BS EN 61008/61009) requires the device to trip in ≤ 300 ms at IΔn. 5×IΔn (150 mA on a 30 mA RCD) is used to demonstrate the much faster operation needed to qualify as ADDITIONAL PROTECTION — ≤ 40 ms. For domestic / commercial 30 mA RCDs being relied on for additional protection (Reg 415.1.1), the 5×IΔn ≤ 40 ms result is the load-bearing one. Always record both.',
  },
  {
    question: 'When does Reg 643.10 (phase rotation) actually need to be tested?',
    answer:
      'Reg 643.10 applies only to three-phase circuits. On a single-phase final circuit it is not relevant. On a three-phase distribution board, three-phase motor circuit, or three-phase variable-frequency-drive feed, you verify the rotation matches the design assumption. Reverse rotation on a three-phase pump means the impeller spins backwards — at best, no flow; at worst, mechanical damage. The schedule of test results for a three-phase board records the verified rotation.',
  },
  {
    question: 'Do I need to use a multifunction tester, or can I use individual instruments?',
    answer:
      'BS EN 61557 covers the test instrument suite — Part 1 general, Part 2 IR, Part 3 loop impedance, Part 4 continuity, Part 6 RCDs, Part 7 phase sequence, Part 10 multifunction. Either approach is acceptable provided every instrument used is to the relevant Part of BS EN 61557, in calibration, and the inspector is competent in its use. In practice, the multifunction tester (BS EN 61557-10) is dominant because it integrates the lot in one device and most have built-in autoranging, fused leads and on-screen pass/fail flagging.',
  },
  {
    question: 'How does the test sequence change for a TT installation?',
    answer:
      'The dead-test sequence is the same. The differences are at the live end: (a) earth electrode resistance Ra is measured under Reg 643.7.2 (not just Ze) — typically by stake-and-spike (three-electrode method) or earth loop where appropriate, (b) Zs is dominated by Ra rather than the supply impedance (Ze is high on TT), (c) the RCD test under Reg 643.8 is critical because TT relies on RCD operation for ADS — Reg 411.5.3 sets Ra × IΔn ≤ 50 V, so any RCD timing failure on a TT installation is a structural issue, not a peripheral one.',
  },
];

const BS7671Module6Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Sequence of tests and testing procedures | BS 7671:2018+A4:2026 | Module 6.3',
    description:
      'Reg 643 sequence of tests for initial verification under BS 7671:2018+A4:2026 — continuity, insulation resistance, polarity, Zs, RCD operation, phase rotation, plus the new AFDD verification entry on the schedule of test results.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Updated for A4:2026"
            title="Sequence of tests and testing procedures"
            description="The Reg 643 dead and live test sequence — why the order is fixed, what each test proves, the instrument standard (BS EN 61557), and the new A4 entry for AFDD self-test verification on the schedule of test results."
            actions={
              <>
                <RegBadge>643.2</RegBadge>
                <RegBadge>643.3</RegBadge>
                <RegBadge>643.7</RegBadge>
                <AmendmentBadge regs={['421.1.7']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.1 fixes the order of initial-verification tests because each test depends on the previous one having passed. Out-of-order testing can hide faults, damage instruments and expose the inspector to live risk.',
              'Dead tests run first: continuity (Reg 643.2) → insulation resistance (Reg 643.3) → SELV/PELV/separation (Reg 643.4) → dead polarity (Reg 643.6) → earth electrode resistance where relevant (Reg 643.7.2). Live tests follow: live polarity, Zs (Reg 643.7.3), prospective fault current (Reg 643.7.4), RCD operation (Reg 643.8), functional checks (Reg 643.9), phase rotation on three-phase (Reg 643.10), voltage drop (Reg 643.11).',
              'A4:2026 brings AFDDs (Reg 421.1.7) into the schedule of test results — a new in-installation AFDD self-test verification entry sits alongside the existing IR / Zs / RCD columns.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the Reg 643.1 test sequence in order and explain why each step depends on the previous one.',
              'Apply Reg 643.2 — verify continuity of protective conductors using R1+R2 or wander-lead methods, and choose between them based on the circuit topology.',
              'Apply Reg 643.3 / Table 64.1 — pick the correct test voltage and minimum acceptable IR value (250 V / 0.5 MΩ for SELV-PELV; 500 V / 1 MΩ for LV; 1000 V / 1 MΩ for above 500 V).',
              'Apply Reg 643.4 — verify protection by SELV, PELV and electrical separation, including source isolation and IR-to-other-circuits checks.',
              'Apply Reg 643.6 (polarity), Reg 643.7 (Zs and PFC) and Reg 643.8 (RCD operation at IΔn ≤ 300 ms and 5×IΔn ≤ 40 ms for additional protection).',
              'Apply Reg 643.10 — verify three-phase rotation, and record the new A4 AFDD verification entry on the schedule of test results (item 4.23 / col 30 area).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The Reg 643.1 sequence — why order is engineered</ContentEyebrow>

          <VideoCard
            url={videos.safeIsolation.url}
            title={videos.safeIsolation.title}
            channel={videos.safeIsolation.channel}
            duration={videos.safeIsolation.duration}
            topic="Watch · JIB safe-isolation procedure"
            caption="Craig Wiltshire walks the JIB safe-isolation steps — the dead-test prerequisite for everything that follows. Every test in Reg 643 starts with a circuit proven dead before any continuity, IR or polarity work begins."
          />

          <SectionRule />

          <ConceptBlock
            title="The dead-test order: continuity → IR → SELV/PELV → polarity → electrode"
            plainEnglish="Continuity comes first because every other test assumes a known earth path. IR comes next because once continuity is confirmed, you can prove there is no leakage between live conductors and earth. Polarity (dead) and earth-electrode resistance follow before any live work."
            onSite="On the EIC schedule of test results, the column order reflects the test order. Filling them out left-to-right in the cab of the van as you work through a circuit is exactly what BS 7671 expects you to do — the form is engineered to mirror Reg 643.1."
          >
            <p>
              Reg 643.1 places dead tests before live tests for one reason: live testing on an
              installation that has not had its dead checks completed is a documented hazard. A
              missing CPC, undetected because IR was run first, leaves an exposed metal part
              floating during a Zs measurement. A reversed polarity, undetected, drives line voltage
              onto the wrong terminal of a downstream device. The sequence is the safety mechanism —
              running it out of order is procedurally non-compliant.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.1 — Sequence of tests"
            clause="The tests of Regulations 643.2 to 643.11, where relevant, shall be carried out, preferably in that order, before the installation is energised. The tests of Regulations 643.6, 643.7, 643.8, 643.9, 643.10 and 643.11 shall be carried out after energisation. In the event of any test indicating a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified."
            meaning="Two important consequences: (1) the order is mandated, not advisory; (2) when a test fails, you do not just retest the failed one — you go back to the earliest test that the failure could have invalidated and retest forwards. A continuity failure discovered after IR means re-running IR after the continuity fix."
            cite="BS 7671:2018+A4:2026, Reg 643.1 (p.230)"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Reg 643.2 — Continuity of protective conductors</ContentEyebrow>

          <ConceptBlock
            title="R1+R2 method vs wander lead"
            plainEnglish="R1+R2 cross-links L and CPC at the consumer unit, then measures across L and CPC at each accessory — the reading is the resistance of line plus CPC for that part of the circuit. The wander-lead method uses a long flexible test lead from the origin out to the point being tested, with the tester reading the loop directly."
            onSite="R1+R2 is the bread-and-butter for ring finals, radial circuits and lighting circuits — fast, accurate, and the value drops straight into your Zs calculation. Wander lead is for main earthing conductor, main bonding conductor and any conductor where there is no convenient return path at the origin."
          >
            <p>
              Reg 643.2.1 requires verification of every protective conductor — circuit protective
              conductors, main earthing conductor, main bonding, supplementary bonding,
              equipotential bonding to extraneous-conductive-parts. Reg 643.2.3 requires
              verification of ring final-circuit conductor continuity using the three-step
              end-to-end method: (a) measure r1, rn, r2 end-to-end; (b) cross-connect line and CPC
              at the origin; (c) measure (R1+R2) at each socket — the values should be approximately
              equal at every point on a healthy ring, with the highest reading being the mid-point.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.2.3 — Continuity of ring final-circuit conductors"
            clause="A test shall be made to verify the continuity of each conductor including the protective conductor of every ring final circuit. The test method shall confirm that the ring is complete with no interconnections."
            meaning="Three measurements at the origin (r1, rn, r2 end-to-end) plus a cross-connection test at every socket. A bridged ring (interconnection) shows up as readings that drop towards zero at the bridge point — a serious defect because a single break elsewhere then leaves part of the ring on a single radial leg, overloaded."
            cite="BS 7671:2018+A4:2026, Reg 643.2.3 (p.231)"
          />

          <VideoCard
            url={videos.ringFinalTest.url}
            title={videos.ringFinalTest.title}
            channel={videos.ringFinalTest.channel}
            duration={videos.ringFinalTest.duration}
            topic="Watch · Ring final three-part continuity test"
            caption="Craig Wiltshire walks the canonical Reg 643.2 continuity method for ring finals — the three end-to-end measurements at the origin plus the cross-connection check at every socket that proves the ring is complete with no interconnections."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Reg 643.3 — Insulation resistance</ContentEyebrow>

          <ConceptBlock
            title="500 V DC, 1 MΩ minimum — what the numbers mean"
            plainEnglish="Insulation resistance proves there is no leakage path between live conductors, or between live conductors and earth. The test pumps 500 V DC across the conductor pair and measures the leakage current; the meter calculates resistance from V/I."
            onSite="A healthy new circuit reads in the hundreds of MΩ — modern PVC and XLPE insulation routinely shows 200 MΩ, 500 MΩ or simply 'OL' (over-range) on the meter. The 1 MΩ floor is a fail threshold, not a target. A 2 MΩ reading on a new install is a sign something is wrong — wet conduit, damaged cable, electronic equipment left connected — and warrants investigation rather than a tick."
          >
            <p>
              Reg 643.3.2 / Table 64.1 specifies test voltages and minimum values: SELV/PELV (≤ 50
              V) → 250 V DC, 0.5 MΩ. LV up to 500 V (covers all standard 230 V / 400 V
              installations) → 500 V DC, 1 MΩ. Above 500 V → 1000 V DC, 1 MΩ. The IR test is run
              between (a) all live conductors connected together vs earth, and where practicable (b)
              between line and neutral. Where electronic equipment cannot tolerate the test voltage,
              Reg 643.3.3 permits disconnection or testing live-to-live joined to earth so the
              equipment sees no voltage between its terminals during test.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.insulationResistanceAmd2.url}
            title={videos.insulationResistanceAmd2.title}
            channel={videos.insulationResistanceAmd2.channel}
            duration={videos.insulationResistanceAmd2.duration}
            topic="Watch · IR test method for current edition"
            caption="Craig Wiltshire walks the insulation-resistance test method for the current edition — instrument settings, conductor configuration (live conductors connected together vs earth, then line vs neutral), and the 1 MΩ minimum result for LV circuits per Table 64.1."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Reg 643.4 — SELV, PELV and electrical separation</ContentEyebrow>

          <ConceptBlock
            title="Verifying the protective measure, not just the voltage"
            plainEnglish="Reg 643.4 is broader than measuring volts. It verifies the entire SELV / PELV / separated-circuit construction is intact: the right source, the right separation, the right earth handling and basic protection where required."
            onSite="On a SELV control circuit you confirm: (a) source is a safety isolating transformer to BS EN 61558-2-6 (or equivalent), (b) no intentional earth on the SELV side, (c) basic protection per Reg 414.4.4 if voltage exceeds 25 V AC / 60 V DC ripple-free or equipment is immersed, (d) IR between SELV circuit and any other circuit at row (i) of Table 64.1 — 250 V DC, 0.5 MΩ minimum."
          >
            <p>
              For PELV the same checks apply except that an earth connection is permitted (and often
              required for functional reasons — EMC, ESD reference, control common). For electrical
              separation (Section 413), Reg 643.4 confirms the source isolation, the separated
              circuit&apos;s freedom from earth, and the integrity of the separation. The test
              instrument measures IR between the separated circuit and earth at the test voltage of
              Table 64.1 — but the verification is procedural as well as instrument-based.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Reg 643.6 — Polarity (dead and live)</ContentEyebrow>

          <ConceptBlock
            title="What polarity actually means in BS 7671"
            plainEnglish="Polarity is not just sockets-the-right-way-round. It covers the whole installation: every single-pole switch is in line, every fuse is in line, every centre-contact lampholder gets line on the centre, every BS 1363 socket is wired to convention, and the whole installation is correctly identified by colour."
            onSite="The polarity check is run twice — once dead (by continuity) and once live (at energisation). Dead polarity confirms the wiring topology; live polarity confirms the supply is delivered the right way round. Both go on the schedule of test results. A polarity failure is typically C2 on EICR — the touch-current risk is real."
          >
            <p>
              Reg 643.6 cross-references Reg 537.1.4 (single-pole switching shall be in the line
              conductor) and the conductor identification rules of Section 514. The dead polarity
              test is usually performed by continuity from the origin: with line and CPC linked at
              the consumer unit, a continuity reading at each switch confirms it is in the line
              path; a continuity reading at each socket&apos;s line terminal vs origin confirms the
              line is on the correct pin. The live polarity test uses an approved voltage indicator
              at energisation to verify line is line and neutral is neutral on the actual supply.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>
            Reg 643.7 — Earth fault loop impedance Zs and prospective fault current
          </ContentEyebrow>

          <ConceptBlock
            title="Zs = Ze + R1+R2 — the headline live measurement"
            plainEnglish="Zs is the total impedance of the fault loop: from the fault point, through the CPC back to the MET, through the main earthing conductor, through the supply, and through the line conductor back out to the fault point. A low Zs means a high prospective fault current, which means the protective device clears the fault fast."
            onSite="Two routes to Zs: measure it directly with the meter (line-to-earth loop test at the furthest point) or calculate it as Ze + R1+R2 from your dead measurements. Both should agree within tolerance. The measured Zs must be at or below the published Zs(max) for the protective device, corrected for conductor temperature."
          >
            <p>
              Reg 643.7.3 requires verification of Zs at the design stage and at the furthest point
              of every final circuit. The measured value must be compared to the maximum value at
              the conductor operating temperature — published Zs(max) tables (Appendix 3 of BS 7671
              / OSG) are at 70 °C for thermoplastic. A cold measurement reads lower and must be
              temperature-corrected (multiply by ~1.20 for typical PVC/PVC) before comparing, or use
              a meter with temperature correction enabled. Reg 643.7.4 covers prospective fault
              current — Ipf measured at the origin, used to confirm the breaking capacity of every
              protective device downstream is adequate.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7.3 — Earth fault loop impedance"
            clause="The earth fault loop impedance shall be determined by one of the following methods, taking account of the impedance of the protective conductors used: (i) measurement of the earth fault loop impedance of the circuit being tested; (ii) measurement of (R1+R2) at the furthest point of the circuit, added to the value of Ze. The effectiveness of the measures for fault protection by automatic disconnection of supply provided by an overcurrent protective device shall be verified by confirmation that the measured value of earth fault loop impedance of each circuit satisfies the requirements of Regulation 411.4.4."
            meaning="Two methods, both acceptable. The measured Zs at the furthest point must satisfy Reg 411.4.4 (Zs ≤ U₀ × Cmin / Ia) for the protective device — at the conductor\'s expected operating temperature, not at ambient. This is the load-bearing evidence that ADS is in place."
            cite="BS 7671:2018+A4:2026, Reg 643.7.3 (p.234)"
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Reg 643.8 — RCD operation timing</ContentEyebrow>

          <ConceptBlock
            title="At IΔn (≤ 300 ms) and at 5×IΔn (≤ 40 ms) for additional protection"
            plainEnglish="The RCD is tested at its rated residual current (IΔn) to confirm it operates within the general standard time, and at five times its rated current (5×IΔn) to confirm it operates fast enough to qualify as additional protection."
            onSite="For a 30 mA general-use RCD: at 30 mA must trip in ≤ 300 ms; at 150 mA must trip in ≤ 40 ms. Record both. The 5×IΔn ≤ 40 ms result is the headline number for additional-protection circuits because that is the figure that stops a residual current causing fibrillation. Time-delayed (Type S) RCDs have different windows (130–500 ms at IΔn) and are typically used upstream for selectivity."
          >
            <p>
              Reg 643.8 cross-references the device standards: BS EN 61008 (RCDs without integral
              overcurrent), BS EN 61009 (RCBOs — RCDs with integral overcurrent), and the broader BS
              EN 61557-6 for the test instrument. The inspector verifies operating times at IΔn and
              5×IΔn (and at 0.5×IΔn the device must NOT trip — confirming the device is not too
              sensitive). The values are recorded in the RCD column of the schedule of test results.
              A consistent approach: record the worse of the two readings under the "x1" and "x5"
              columns, and where the device is providing additional protection, flag any "x5" result
              above 40 ms as a fail.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Reg 643.10 — Phase rotation (three-phase only)</ContentEyebrow>

          <ConceptBlock
            title="L1-L2-L3 in the right order at every three-phase outlet"
            plainEnglish="On a three-phase circuit, the rotation of the phases determines which way three-phase motors spin. Reverse rotation means a pump runs backwards, a saw blade reverses, a conveyor belt goes the wrong way. The verification confirms the rotation is the way the design assumed."
            onSite="The test is fast — a phase rotation indicator (or the multifunction tester\'s rotation function) clipped to L1, L2, L3 at the board reads CW (clockwise / L1-L2-L3) or CCW (counter-clockwise). Confirm against the design intent. If the supply itself is reversed, raise it with the DNO; do not silently swap inside the consumer\'s installation in a way that conflicts with conductor identification."
          >
            <p>
              Reg 643.10 applies only to three-phase circuits. The verification is required at
              initial verification and recorded on the schedule of test results. Rotation
              assumptions matter most at three-phase motors, three-phase variable-frequency drives
              and three-phase distribution boards feeding rotation-sensitive loads (pumps, fans,
              compressors). A reversed-rotation pump can mechanically damage seals on first start; a
              reversed three-phase saw is a safety incident waiting to happen.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Test instruments — BS EN 61557 and calibration</ContentEyebrow>

          <ConceptBlock
            title="The instrument standard and the calibration regime"
            plainEnglish="Every test instrument used for BS 7671 verification has to conform to the relevant Part of BS EN 61557 — the standard that defines accuracy, ranges, lead requirements and the in-service self-checks the device must support. And it has to be in calibration."
            onSite="Annual calibration is the industry default — your tester goes to a UKAS-accredited lab and comes back with a certificate. Between calibrations you run user checks: monthly battery and lead-continuity check; monthly fixed-resistor jig check on continuity (typically 0.5 Ω, 2 Ω, 10 Ω); monthly IR self-check (most testers have this built in); and a daily voltage-indicator self-check before any live work."
          >
            <p>
              BS EN 61557 has multiple parts: Part 1 general; Part 2 IR; Part 3 loop impedance; Part
              4 continuity of protective conductors; Part 6 RCDs; Part 7 phase sequence; Part 10
              multifunction. A multifunction tester (BS EN 61557-10 compliant) integrates the lot.
              The calibration certificate is your evidence in any cert challenge — a defective
              tester is no defence. GN3 is explicit: an out-of-calibration tester cannot be relied
              on as evidence of compliance; a certificate produced with one is open to challenge.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>A4:2026 update — AFDD verification on the schedule</ContentEyebrow>

          <ConceptBlock
            title="The new AFDD self-test entry (item 4.23 / col 30 area)"
            plainEnglish="A4:2026 brings AFDDs (Reg 421.1.7) onto the schedule of test results. There is a new entry for verifying the in-installation AFDD self-test — a simple pass / fail confirming the device responded to its built-in test button or to a BS EN 62606 field-test instrument."
            onSite="Procedure: with the circuit live, press the AFDD test button. The AFDD should trip immediately and the indicator should activate. Reset and confirm normal operation. Record pass / fail in the new column (typically item 4.23 or column 30 area depending on form layout). For higher-confidence verification, a BS EN 62606 field test instrument can inject a simulated arc-fault signature."
          >
            <p>
              Reg 421.1.7 (with A4 updates) sets where AFDDs are required — typically socket-outlet
              circuits in higher-risk premises (HMOs, care homes, premises with sleeping
              accommodation) and certain higher-risk industrial / commercial circuits where series
              arc faults are a credible ignition source. Reg 643 brings the verification into the
              standard test sequence — manufacturer pre-installation testing alone is not enough;
              the device has to be verified IN THE INSTALLATION. The cert form changes mean the
              inspector now has a dedicated tick column rather than a free-text note.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 421.1.7 — Arc Fault Detection Devices (AFDDs)"
            clause="For socket-outlet circuits in higher-risk premises (as listed), an Arc Fault Detection Device complying with BS EN 62606 shall be provided. The device shall be tested as part of initial verification (Section 643) and at periodic inspection."
            meaning="A4 firms up the AFDD requirement in higher-risk premises and the schedule of test results adds a verification column. The inspector\'s job: confirm the AFDD is fitted where required, run the in-installation self-test, record the result. Manufacturer test certificates supplied with the device do not satisfy Reg 643."
            cite="BS 7671:2018+A4:2026, Reg 421.1.7 (with A4 amendment)"
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Running tests out of order"
            whatHappens="Inspector starts with IR (because it is the easiest to set up), then continuity. The IR result on a circuit with a missing CPC reads as healthy — the broken CPC has nothing to leak to. The inspector records 'pass' and moves on. The missing CPC is found weeks later when an exposed metal part bites a user."
            doInstead="Reg 643.1 sequence is mandatory. Continuity first — every time. If a tester defaults to IR-first by menu order, change the order on the tester or work through the schedule of test results columns left-to-right, which mirrors Reg 643.1."
          />

          <CommonMistake
            title="Treating Zs(max) as a measured-at-ambient figure"
            whatHappens="Inspector measures Zs at 20 °C, reads 1.32 Ω, compares to the published 1.37 Ω limit (which is at 70 °C) and signs off. Once the conductors warm under load, the actual operating Zs rises by ~20 % — to about 1.58 Ω, well above limit. ADS is no longer demonstrably in place but the cert says it is."
            doInstead="Either temperature-correct the measurement up by the conductor temperature factor (~1.20 for typical PVC at 70 °C) before comparing, or use a meter with temperature correction. The published Zs(max) is at operating temperature; your measurement is at ambient — the gap matters."
          />

          <CommonMistake
            title="Skipping the live polarity check because dead polarity passed"
            whatHappens="Dead polarity confirmed at every accessory by continuity. Inspector energises and skips straight to Zs and RCD. The DNO has a swapped phase at the cut-out — the whole installation is energised with line on what was the neutral terminal of every device. Dead polarity (continuity-based) cannot detect this; live polarity is the only test that can."
            doInstead="Reg 643.1 requires polarity verification at energisation as well as before energisation. A simple approved-voltage-indicator check at the consumer unit live terminals (line to earth ~230 V, neutral to earth ~0 V) confirms the supply is delivered the right way round. Three-phase: rotation check (Reg 643.10) confirms the same on all three lines."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Initial verification of a small commercial fit-out (TN-S, single-phase, 60 A)"
            situation="Refurbished retail unit, 8 final circuits behind a 60 A switch-fuse: 4× lighting, 2× sockets, 1× fan-coil heater, 1× shop sign. Consumer unit is a metal RCBO board (Type A 30 mA RCBO on every way). All work complete; the inspection and testing block is next. You have a Megger MFT1741+ multifunction tester with a calibration sticker valid for 9 more months."
            whatToDo="Walk Reg 643.1 in order. (1) Continuity (Reg 643.2): R1+R2 on every circuit; ring-final three-step on the two ring sockets. (2) IR (Reg 643.3): 500 V DC, L+N to earth then L to N, on every circuit; disconnect the shop-sign electronics first. (3) SELV / PELV (Reg 643.4): N/A — no SELV circuits in this fit-out. (4) Dead polarity (Reg 643.6): continuity from origin to every switch and every socket\'s line terminal. (5) Earth electrode (Reg 643.7.2): N/A on TN-S. Energise. (6) Live polarity: AVI at consumer unit terminals; line-earth ~230 V, neutral-earth near 0 V. (7) Zs (Reg 643.7.3): direct loop measurement at the furthest point of each circuit; compare to RCBO Zs(max) corrected for temperature. (8) Prospective fault current (Reg 643.7.4): at the origin. (9) RCD (Reg 643.8): each RCBO at IΔn (must trip ≤ 300 ms) and 5×IΔn (must trip ≤ 40 ms). (10) Phase rotation: N/A single-phase. (11) Functional tests: every switch, every isolator, the AFDD test button on each AFDD where fitted (item 4.23). (12) Voltage drop (Reg 643.11) where required. Record everything on the EIC + schedule of test results."
            whyItMatters="The cert produced is the legal compliance evidence. Every column on the schedule of test results corresponds to a numbered regulation in 643. A column left blank is a missing test; a column with a value outside the limits is a documented departure. The inspection-and-testing block is the part of the EIC the next inspector reads in five years\' time to assess deterioration — incomplete now means a difficult periodic later."
          />

          <Scenario
            title="EICR on a 30-year-old industrial unit, fully loaded production"
            situation="Periodic inspection of a metalworking unit. Production lines running, three CNC machines on three-phase, a small DC welding bay, dust extraction on VSDs, and a 230 V office block. The customer cannot afford a full shutdown for the inspection — life-safety lighting must stay on, the cold store must stay cold, the CNCs are mid-batch."
            whatToDo="EICR is sample-based per GN3 / Best Practice Guide 4. Agree the sample with the customer in writing — typically 20% of circuits, 100% of high-risk (cold store, life-safety, EV charging if any), and a full inspection (visual) of every distribution board. Where Reg 643.3 IR cannot be measured directly because the load cannot be disconnected, record the limitation on the EICR (Section L) with the justification: 'IR not measured on circuit X due to operational requirement; visual inspection and Zs / RCD timing satisfactory.' Run continuity, Zs and RCD operation on every sampled circuit. Verify three-phase rotation on the CNC supplies under Reg 643.10. Where AFDDs are fitted, run the in-installation self-test. Issue the EICR with the limitations clearly described, the sample defined, and the next inspection interval set per the BS 7671 / IET BPG4 framework."
            whyItMatters="An EICR is not an EIC — it is a CONDITION report on an in-service installation, not a verification of a new install. Reg 643 is the design baseline; GN3 / BPG4 explain how to adapt it for the field. Limitations are not failures — they are recorded engineering judgements that the next inspector or any subsequent inquiry can review. The cert is defensible only if the limitations are explicit."
          />

          <SectionRule />

          <ContentEyebrow>Inspector&apos;s quick reference — the live test block</ContentEyebrow>

          <ConceptBlock
            title="Order of operations after energisation"
            plainEnglish="Once dead tests are complete and pass, energise. Then run the live tests in the order Reg 643 specifies, recording each on the schedule of test results as you go."
            onSite="(1) Live polarity at the consumer unit (AVI). (2) Three-phase rotation if applicable (Reg 643.10). (3) Zs at the furthest point of every final circuit (Reg 643.7.3). (4) Prospective fault current at the origin (Reg 643.7.4). (5) RCD operation at IΔn and 5×IΔn (Reg 643.8). (6) AFDD self-test on every AFDD (new A4 entry on the schedule). (7) Functional tests — every switch, every isolator, every contactor (Reg 643.9). (8) Voltage drop where the design demands it (Reg 643.11). Sign and date the cert."
          >
            <p>
              The live block is shorter than the dead block but the consequences of getting it wrong
              are higher because the installation is now energised. Use a fused lead set, proven
              voltage indicator, and follow your isolation procedure if any retest needs dead
              access. Document any test that was not performed (e.g. PFC at every DB rather than the
              origin alone) and the reason — a complete cert is one where every box is ticked OR has
              a documented justification for being blank.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            Worked example — testing a single 32 A radial socket circuit
          </ContentEyebrow>

          <ConceptBlock
            title="Walking Reg 643 step-by-step on one circuit"
            plainEnglish="A single 32 A radial socket circuit on a Type B 32 A RCBO is the simplest worked example. Eight steps from dead to signed-off, with the schedule of test results columns filled in as you go."
            onSite="The narrative below mirrors what you would write into the EIC: each numbered step corresponds to one regulation in 643 and one column on the schedule of test results."
          >
            <p>
              <strong>1. Continuity of CPC (Reg 643.2).</strong> Cross-link L and CPC at the RCBO.
              Measure end-to-end at the furthest socket: R1+R2 reads 0.42 Ω. Record on the schedule.{' '}
              <strong>2. Insulation resistance (Reg 643.3).</strong> 500 V DC test; all live
              conductors connected together vs CPC reads &gt; 200 MΩ; line vs neutral reads &gt; 200
              MΩ. Both well above the 1 MΩ floor — record the higher of the meter&apos;s ranges or
              &quot;&gt; 200 MΩ&quot; depending on the form.{' '}
              <strong>3. SELV / PELV (Reg 643.4).</strong> N/A — no SELV / PELV on this circuit.{' '}
              <strong>4. Dead polarity (Reg 643.6).</strong> Continuity confirms switch is in line,
              line is on the right pin of every BS 1363 socket. <strong>5. Live polarity.</strong>{' '}
              AVI confirms supply rotation correct at the consumer unit.{' '}
              <strong>6. Zs (Reg 643.7.3).</strong> Direct loop measurement at the furthest socket
              reads 0.62 Ω (cold); temperature-corrected at ~1.20 = 0.74 Ω; published Zs(max) for
              B32 at 70 °C is 1.37 Ω — comfortably within.{' '}
              <strong>7. RCD operation (Reg 643.8).</strong> 30 mA RCBO at IΔn trips in 18 ms; at
              5×IΔn (150 mA) trips in 11 ms. Both well within the ≤ 40 ms additional-protection
              limit. <strong>8. Functional checks (Reg 643.9).</strong> Switch the RCBO off and on;
              confirm indicator and downstream sockets de-energised under test. Sign the cert.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Reg 643.1 fixes the test sequence — dead before live, in the order continuity → IR → SELV/PELV → polarity → electrode (dead) then live polarity → Zs → PFC → RCD → phase rotation → functional → voltage drop.',
              'The order is engineered: each test depends on the previous one having passed. A failure means going back to the earliest test the failure could have invalidated and retesting forwards.',
              'Reg 643.3 / Table 64.1 — 250 V DC / 0.5 MΩ for SELV-PELV, 500 V DC / 1 MΩ for LV up to 500 V, 1000 V DC / 1 MΩ above 500 V. The 1 MΩ figure is a fail floor, not a target.',
              'Reg 643.7.3 — measured Zs must satisfy Reg 411.4.4 at conductor operating temperature; correct cold readings up by ~1.20 for typical PVC before comparing to published Zs(max).',
              'Reg 643.8 — at IΔn the RCD trips in ≤ 300 ms; at 5×IΔn ≤ 40 ms is the additional-protection figure. Record both.',
              'A4:2026 — AFDDs (Reg 421.1.7) get a new in-installation self-test verification entry on the schedule of test results (item 4.23 / col 30 area). Manufacturer pre-test does not satisfy Reg 643.',
              'Test instruments must conform to the relevant part of BS EN 61557 and be in calibration. An out-of-calibration tester invalidates the compliance evidence.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 Model forms and certification overview
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module6Section3;
