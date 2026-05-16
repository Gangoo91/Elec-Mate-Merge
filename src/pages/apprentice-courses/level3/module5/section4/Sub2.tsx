/**
 * Module 5 · Section 4 · Subsection 2 — Earth Fault Loop Impedance (Zs) — methods and techniques
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.4
 *   AC 6.4 — "state the methods for verifying protection by automatic disconnection of supply"
 * Layered: GN3 Section 2 / EFLI testing methodology, BS EN 61557-3 instrument standard
 *
 * Frame: Sub1 introduced the Zs concept and the 3-lead vs 2-lead distinction.
 * This Sub goes deeper on the actual technique on site — choosing between no-
 * trip and trip-current modes, what each does to the reading accuracy, the
 * GN3 safety guidance on the touch-voltage that appears on metalwork during
 * the test, instrument range and resolution, fused leads, and the practical
 * test sequence at every test point on a board.
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
  VideoCard,
  SectionRule,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Zs measurement — no-trip vs trip techniques | Level 3 Module 5.4.2 | Elec-Mate';
const DESCRIPTION =
  'Zs measurement deep dive — no-trip / low-current technique vs full trip-current technique, the GN3 touch-voltage safety guidance during EFLI tests, instrument range and resolution per BS EN 61557-3, fused test leads, and the practical board test sequence with the Megger MFT1741+ / Fluke 1664FC / Kewtech KT64+.';

const checks = [
  {
    id: 'm5-s4-sub2-no-trip-vs-trip',
    question: 'On a circuit protected by a 30 mA Type AC RCD, which Zs test mode is correct and why?',
    options: [
      'Standard high-current mode — most accurate.',
      'No-trip / low-current Zs mode. The instrument limits the test current peak below the RCD trip threshold (typically under 15 mA peak for a 30 mA RCD), often combined with a brief DC bias to suppress the AC RCD\'s sensing during the test pulse. Reading is slightly less accurate than high-current mode (typically plus or minus 10 percent vs plus or minus 5 percent) but avoids tripping the RCD and interrupting the supply during the test.',
      'Disconnect the RCD first, then test in high-current mode.',
      'Multiply the high-current reading by 0.5.',
    ],
    correctIndex: 1,
    explanation:
      'Modern multifunction testers (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) all offer a no-trip / low-current Zs mode specifically for RCD-protected circuits. The instrument limits its test current and may apply a DC bias technique to suppress the AC RCD\'s sensing. The slight loss of accuracy is acceptable; the RCD stays in. Disconnecting an RCD to test "more accurately" is bad practice — you change the circuit you\'re trying to verify and you risk leaving the install without RCD protection if you forget to reconnect.',
  },
  {
    id: 'm5-s4-sub2-touch-voltage',
    question: 'GN3 warns about voltages appearing on earthed metalwork during a Zs test. The mechanism is:',
    options: [
      'There\'s no such risk.',
      'During the EFLI test the instrument briefly draws fault current through the L-E loop. That current creates a voltage drop along the CPC equal to I_test x R_CPC. Any exposed-conductive-part connected to that CPC briefly rises above true earth by that voltage. For a 25 A test current and a 0.4 Omega CPC, that\'s 10 V — small but noticeable to a person touching the metalwork. The duration is brief (a few cycles) but the risk is real, especially in installations where the public can access the metalwork during testing.',
      'It\'s only a problem on TT installations.',
      'Only happens if the RCD is faulty.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 explicitly flags this hazard. The test current creates a touch-voltage on every exposed-conductive-part connected to the CPC under test. In domestic single-occupier work it\'s low risk because you control access. In commercial / public spaces (a shop floor, a school corridor, a hospital), you may need to physically restrict access to the test area while testing — temporary barriers, signage, an assistant. Test current depends on instrument and mode (no-trip mode typically 15 mA peak, full trip mode 10-25 A) — the higher the test current, the higher the touch-voltage hazard.',
  },
  {
    id: 'm5-s4-sub2-fused-leads',
    question: 'Why are loop-impedance test leads typically fitted with 7 A or 10 A fuses (not 1 A or 3 A)?',
    options: [
      'Cosmetic standard.',
      'The Zs test draws relatively high test currents in full mode (typically 10-25 A briefly). Lead fuses below the test current would rupture during normal testing, leaving the operator with leads that don\'t work and no immediate indication why. GN3 specifies 7 A or 10 A as typical adequate ratings — high enough not to rupture during legitimate testing, low enough to clear in genuine fault conditions if the leads are accidentally subjected to sustained high current. Always verify the lead fuse rating before testing.',
      'To make leads more expensive.',
      'Random standard.',
    ],
    correctIndex: 1,
    explanation:
      'The GN3 guidance on fused leads is specific — high enough rating to not rupture during the test current pulse, low enough to clear on a genuine fault. 7 A or 10 A are the typical values. Lead fuses are a maintenance item — check periodically that they\'re intact and the right rating. A ruptured lead fuse looks like an instrument failure if you don\'t know what to look for.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS EN 61557-3 is the standard governing loop impedance testers. What does conformance to this standard guarantee in practice?',
    options: [
      'It guarantees the meter is yellow.',
      'BS EN 61557-3 specifies the safety, performance and accuracy requirements for instruments measuring loop impedance. An instrument conforming to BS EN 61557-3 will generally meet the measurement range and resolution requirements for typical UK loop-impedance testing — domestic, commercial, light industrial. The standard also covers the test current characteristics, voltage withstand of the leads, and the accuracy bands the instrument has to meet across its declared measurement range. When you specify "BS EN 61557-3 compliant" on a procurement order or on a certificate, you\'re relying on the manufacturer\'s declaration of conformance.',
      'It guarantees it works for HV.',
      'It guarantees a 5-year warranty.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 61557-3 is the international product safety / performance standard for loop impedance testers. UK MFTs from reputable manufacturers (Megger, Fluke, Kewtech, Metrel) all carry BS EN 61557-3 conformance. The standard underpins the trust we place in the readings — without it, instrument accuracy claims would be unverifiable.',
  },
  {
    id: 2,
    question: 'Instrument resolution and instrument accuracy are different things. Define each.',
    options: [
      'Same thing.',
      'RESOLUTION — the smallest increment the instrument can detect and display, usually expressed as a count of the least-significant digit (e.g. 0.01 Omega resolution means the display can show changes of 0.01 Omega). ACCURACY — how close the displayed reading is to the true value, expressed as a percentage tolerance plus a digit count (e.g. plus or minus 5 percent plus or minus 3 digits at full mode, plus or minus 10 percent at no-trip mode). A high-resolution instrument with poor accuracy gives precise-looking but unreliable readings; a high-accuracy instrument with low resolution gives reliable but imprecise readings. You need both — modern MFTs typically achieve 0.01 Omega resolution and plus or minus 5-10 percent accuracy depending on mode.',
      'Resolution = volts.',
      'Accuracy = ohms.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 distinguishes resolution and accuracy because the two are independently specified. A high-resolution display (showing many decimal places) doesn\'t guarantee the reading is right — you also need the instrument to be accurate within its declared tolerance. Most modern MFTs achieve both, but apprentices need to understand the distinction so they don\'t over-trust precise-looking readings on a poorly-calibrated instrument.',
  },
  {
    id: 3,
    question: 'You\'re testing Zs at the furthest socket on a 32 A ring final (Type B 32 A RCBO, no-trip mode). Reading 1.05 Omega, but you suspect borderline. Worth retesting in full trip-current mode?',
    options: [
      'No — never use full trip mode.',
      'Yes, but only after preparing — switch off any sensitive loads on the same RCD, brief any occupants the supply may briefly trip, and be ready to reset the RCBO. Full trip-current mode is more accurate (typically plus or minus 5 percent vs plus or minus 10 percent for no-trip), and on a borderline result it can confirm whether the no-trip reading was accurate or whether you have a margin you can rely on. If the full mode confirms the reading you can document with higher confidence; if it differs significantly, investigate further.',
      'Just multiply by 0.9.',
      'Use a different meter.',
    ],
    correctAnswer: 1,
    explanation:
      'Full trip-current mode trips the RCBO but gives the most accurate reading. On a borderline result it\'s the right tool to use — provided you prepare for the trip. The standard procedure on a domestic install: brief the customer ("the breaker will briefly trip during a more accurate test, that\'s normal"), switch off any sensitive electronics on the same circuit, run the test, reset the breaker, document both readings. The customer sees professional confidence; the firm has higher-quality data.',
  },
  {
    id: 4,
    question: 'Why does GN3 say to verify instrument range BEFORE carrying out the loop-impedance test?',
    options: [
      'Because the manual says so.',
      'Some MFTs have multiple Zs measurement ranges (e.g. low range 0-2 Omega, high range 0-200 Omega). If you\'re testing a TT installation with expected Zs of 80-200 Omega and the meter is set to the low range, the reading will saturate or read inaccurately. GN3 wants you to consciously check the range matches the expected reading before pressing TEST — a failed test or wildly wrong reading wastes time and may damage the instrument if test current exceeds the range capacity.',
      'To check the battery.',
      'To check the calibration date.',
    ],
    correctAnswer: 1,
    explanation:
      'Range awareness is part of competent instrument use. Modern auto-ranging MFTs reduce the risk by switching range automatically, but on manual-range instruments (or auto-range instruments at the edge of their detection capability) the apprentice needs to consciously verify the range. GN3 puts the duty on the inspector — not on the instrument.',
  },
  {
    id: 5,
    question: 'A4:2026 Table 41.3 max Zs for Type B 32 A is 1.37 Omega. Apply the 0.8 multiplier; what\'s the measured-Zs limit and why?',
    options: [
      'Just use 1.37.',
      'Measured limit = 0.8 x 1.37 = 1.10 Omega. Table 41.3 values assume conductor at 70 deg C operating temperature; measured Zs is at ambient (typically 15-25 deg C). Cable resistance rises with temperature — about 20 percent from 20 deg C to 70 deg C for copper. The 0.8 multiplier corrects approximately for this. For full rigour use GN3 Appendix B per-degree coefficients, but the 0.8 rule of thumb is the standard site-practice correction.',
      'Multiply by 1.5.',
      'Use 1.44 from old tables.',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 updated Table 41.3 — for Type B 32 A the value is 1.37 Omega (NOT the older 1.44 Omega from previous editions). Applying the 0.8 multiplier gives a measured-Zs target of 1.10 Omega. Carry the corrected limits in your head: B32 = 1.10, B16 = 2.19, B6 = 5.83. They come up constantly on site.',
  },
  {
    id: 6,
    question: 'You read Zs = 0.62 Omega at the furthest socket of a kitchen ring. Calculated Zs from dead-test (Ze + R1+R2) = 0.55 Omega. Why the 12 percent difference and is it a concern?',
    options: [
      'It\'s a fault.',
      'Multiple legitimate causes. (1) Instrument tolerance — both the Zs tester and the continuity tester have plus or minus 5-10 percent each, which can compound. (2) Slight temperature difference — the cables may be slightly warmer at live test time than at dead test time. (3) Supply voltage variation between the two tests can affect calculation. (4) The dead-test R1+R2 may include a parallel earth path (e.g. via metal back-boxes) that doesn\'t carry full fault current under live conditions. Up to 20 percent discrepancy is generally within acceptable tolerance; investigate above 20 percent.',
      'Always a fault.',
      'Random.',
    ],
    correctAnswer: 1,
    explanation:
      'Calculated vs measured Zs should agree within instrument tolerance — typically plus or minus 10-20 percent combined. A discrepancy above that warrants investigation: poor termination, parallel earth path under dead testing that drops out under load, instrument range issue, or a real installation defect. The 12 percent difference here is within tolerance — note it but no further action needed.',
  },
  {
    id: 7,
    question: 'On a TT installation with high Ra (e.g. 150 Omega), the Zs reading at the consumer side will be:',
    options: [
      'Very low.',
      'Dominated by Ra. The earth fault loop on TT is: line conductor + R1 + fault + R2 (CPC) + Ra (consumer\'s electrode) + soil + Ra (transformer\'s electrode) + transformer winding. The R1+R2 contribution is typically under 1 Omega; Ra dominates. Measured Zs will be approximately Ra + a small contribution from the cabling. With Ra = 150 Omega, Zs at any test point will be approximately 150-152 Omega. Overcurrent ADS is not feasible at that loop impedance — RCD ADS is mandatory on TT, verified by the Ra x I delta n less than or equal to 50 V calculation.',
      'Same as TN.',
      'Always pass.',
    ],
    correctAnswer: 1,
    explanation:
      'TT Zs values are an order of magnitude higher than TN because the soil is the return path. This is exactly why RCDs are mandatory on TT — the loop impedance is too high for an MCB or fuse to clear within disconnection time. The Ra x I delta n test confirms the RCD will operate within the 50 V touch-voltage limit. For a 30 mA RCD: 0.030 x 150 = 4.5 V, well within 50 V — pass.',
  },
  {
    id: 8,
    question: 'Standard sequence for live Zs verification across a domestic consumer unit — what order do you test and why?',
    options: [
      'Random order.',
      'Standard order: (1) Ze at the supply origin (incoming meter tails or the main switch). Establishes the supply impedance baseline. (2) Each circuit at its furthest point in turn — go in label order or by RCD group. Use no-trip mode on RCD-protected circuits. (3) For any borderline reading, retest in full trip mode after preparing for the trip. (4) For any failing reading, investigate (terminations, route length, CPC size). The order isn\'t arbitrary — Ze first gives you the baseline you need to sanity-check the per-circuit readings.',
      'Lighting last.',
      'Just one circuit.',
    ],
    correctAnswer: 1,
    explanation:
      'Sequence matters. Ze first establishes the baseline supply impedance — every per-circuit Zs should be Ze + R1+R2 within tolerance. Without Ze first, you can\'t sanity-check the per-circuit readings. Standard pattern: Ze, then each circuit\'s furthest point, then deal with any borderline / failing readings before moving on.',
  },
];

const faqs = [
  {
    question: 'What if my MFT doesn\'t have a no-trip mode?',
    answer:
      'Older MFTs may only offer full trip-current mode. Two options: (a) buy a modern MFT (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+ all have no-trip) — for serious testing work it\'s a sensible investment; (b) plan around the trips — switch off sensitive loads, brief the customer, accept that each test trips the RCD and reset between tests. The latter is acceptable but tedious. Most firms have moved to no-trip-capable instruments because the time saved on site recoups the instrument cost quickly.',
  },
  {
    question: 'How accurate is no-trip Zs really?',
    answer:
      'Manufacturer datasheets typically claim plus or minus 10 percent accuracy for no-trip / low-current Zs vs plus or minus 5 percent for full trip mode. In practice the difference is usually small at typical Zs values (under 2 Omega) — the no-trip technique is well-developed and modern MFTs handle it well. The accuracy gap matters more on borderline readings — if no-trip says 1.08 Omega and your limit is 1.10 Omega, the plus or minus 10 percent could mean actual is 0.97-1.19 Omega. In that case retest in full trip mode for confirmation.',
  },
  {
    question: 'Can I damage the RCD by repeatedly testing in full trip mode?',
    answer:
      'No — RCDs are designed to trip and reset. The mechanical mechanism is rated for tens of thousands of operations. Repeated tripping is not a wear concern. The practical concerns are different: (a) it interrupts the supply each time, which is annoying for the customer and may disturb other loads; (b) some older RCDs may not reset cleanly if tripped in quick succession (give them a 10-second pause); (c) on a borderline-failing RCD, a sequence of tests may push it into a more deteriorated state. For routine verification stick to no-trip mode; use full trip mode selectively for borderline confirmation.',
  },
  {
    question: 'What\'s the test current in no-trip mode and how does the meter avoid tripping the RCD?',
    answer:
      'Typical no-trip mode test current is 15 mA peak (below the 30 mA AC RCD threshold). The instrument applies the test current as a brief pulse (a few milliseconds), often combined with a small DC bias that suppresses the AC RCD\'s residual current sensing during the pulse. Some instruments use a "fast pulse" technique where the test pulse is shorter than the RCD\'s response time. The combined effect: the test happens, the RCD doesn\'t register a fault, the reading is captured. Manufacturer manuals describe the specific technique — worth reading once for your particular MFT.',
  },
  {
    question: 'Does the touch-voltage during testing actually shock people in practice?',
    answer:
      'Rarely — but it\'s real. A 10 V touch-voltage from a 25 A test on a 0.4 Omega CPC is below the perception threshold for most people through dry skin. Wet hands or barefoot on wet floor can lower the perception threshold. The risk is amplified on installations where the public might be touching exposed-conductive-parts during the test (kitchen taps connected via supplementary bonding, metal handrails in commercial premises). GN3 says — manage access during testing. For domestic single-occupier work this is straightforward; for commercial / public installations you may need barriers, signs, or scheduled out-of-hours testing.',
  },
  {
    question: 'Why does the supply voltage affect Zs readings?',
    answer:
      'The Zs tester measures impedance by applying a known test current and measuring voltage drop, then computing Z = V/I. If the supply voltage drops momentarily during the test (because of high background load on the network), the test current may be slightly different than the instrument expects — leading to a small reading error. Modern testers compensate, but on weak rural supplies you may see Zs readings vary slightly between test cycles. Also relevant: the calculated PFC from Zs is V/Z, so a lower-than-nominal supply voltage gives a lower computed PFC. Always note the supply voltage at test time alongside the Zs reading.',
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4 · Subsection 2"
            title="Zs measurement — no-trip vs trip techniques"
            description="The deeper Zs methodology — when to use no-trip / low-current mode vs full trip-current mode, the GN3 touch-voltage safety guidance during EFLI tests, instrument range and resolution per BS EN 61557-3, fused leads, and the practical board test sequence."
            tone="emerald"
          />

          <TLDR
            points={[
              "No-trip / low-current mode injects under 15 mA peak (below the 30 mA RCD threshold) and uses DC bias / fast pulse techniques to avoid tripping the RCD. Slightly less accurate (plus or minus 10 percent) but doesn't interrupt the supply.",
              "Full trip-current mode injects 10-25 A briefly, gives best accuracy (plus or minus 5 percent), but trips RCDs. Use selectively on borderline readings after preparing for the trip.",
              "GN3 warns of touch-voltage on earthed metalwork during EFLI tests — I_test x R_CPC briefly raises exposed-conductive-parts above true earth. Manage access during testing in public / commercial spaces.",
              "BS EN 61557-3 governs loop impedance testers. Verify instrument range matches expected Zs (low range for TN, high range for TT), and check fused leads (typically 7 A or 10 A) before testing.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish no-trip / low-current Zs mode from full trip-current Zs mode and select appropriately for the protective device upstream.",
              "Apply GN3 safety guidance on touch-voltage appearing on earthed metalwork during EFLI tests — manage access in public spaces.",
              "Verify instrument range and resolution per BS EN 61557-3 before commencing Zs tests on TT or extended TN systems.",
              "Identify the correct fuse rating for loop-impedance test leads (typically 7 A or 10 A) and check leads before each test session.",
              "Apply the standard board test sequence — Ze first, then each circuit at the furthest point in label / RCD-group order.",
              "Compare measured Zs against A4:2026 Table 41.3 limits using the 0.8 multiplier (e.g. Type B 32 A: 1.37 Omega table, 1.10 Omega measured).",
              "Investigate borderline and failing Zs readings methodically — verify Ze, R1+R2, route length, CPC size, parallel paths.",
              "Select between 3-lead and 2-lead measurement methods based on test point access and the data required (PFC vs PEFC).",
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>No-trip vs trip — the technique decision</ContentEyebrow>

          <ConceptBlock
            title="Two modes, two trade-offs"
            plainEnglish="Modern MFTs offer two Zs measurement modes. No-trip / low-current uses a small test current (typically under 15 mA peak) with techniques like DC bias and fast pulse to avoid tripping the RCD. Full trip-current uses 10-25 A briefly, gives best accuracy, but trips any RCD on the circuit. The technique you choose depends on the protective device upstream, the customer context, and how much accuracy you need."
            onSite="Default to no-trip for routine verification on RCD-protected circuits. Use full trip selectively when a borderline result needs higher-confidence confirmation. Most domestic and commercial installations are now all-RCBO — no-trip is the day-to-day mode."
          >
            <p>The two modes compared:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>No-trip / low-current mode.</strong> Test current limited to under 15 mA
                peak. Often combined with a brief DC bias to suppress AC RCD sensing during the
                pulse, or a fast pulse shorter than the RCD\'s response time. Reading accuracy
                typically plus or minus 10 percent. RCD stays in. Supply not interrupted.
                Customer doesn\'t notice anything.
              </li>
              <li>
                <strong>Full trip-current mode.</strong> Test current 10-25 A briefly. Reading
                accuracy typically plus or minus 5 percent. Trips any RCD on the circuit. Supply
                briefly interrupted. Customer notices (clocks reset, loads drop). RCD has to be
                manually reset before next test.
              </li>
            </ul>
            <p>When to use which:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RCD-protected circuit, routine verification:</strong> No-trip. Always.
              </li>
              <li>
                <strong>Non-RCD circuit (older split-load, fused board):</strong> Full trip-current.
                More accurate, no downside.
              </li>
              <li>
                <strong>Borderline result on RCD-protected circuit:</strong> Retest in full trip
                mode after preparing — switch off sensitive loads, brief customer, be ready to
                reset.
              </li>
              <li>
                <strong>Critical safety verification:</strong> Both modes back-to-back for
                cross-check.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="IET Guidance Note 3 — EFLI test electric shock hazard"
            clause="Voltages can appear on earthed metalwork whilst conducting an earth fault loop impedance (EFLI) test or an RCD test. These voltages can present electric shock risk to persons touching metallic parts assumed to be at earth potential."
            meaning={
              <>
                During the test the instrument briefly draws current through the L-E loop. That
                current creates a voltage drop along the CPC equal to I_test x R_CPC. Any
                exposed-conductive-part connected to that CPC briefly rises above true earth by
                that voltage. For a 25 A test current and a 0.4 Omega CPC, that\'s 10 V — small
                but real. In domestic single-occupier work the risk is low because you control
                access. In commercial / public installations (shop floors, schools, hospitals) you
                may need to physically restrict access during testing — barriers, signage, an
                assistant.
              </>
            }
            cite="Source: IET Guidance Note 3 — Inspection and Testing, EFLI testing safety guidance."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Touch-voltage during the test — managing the hazard</ContentEyebrow>

          <ConceptBlock
            title="The voltage GN3 wants you to think about"
            plainEnglish="During a Zs test, current flows briefly through the CPC. That current creates a voltage drop along the CPC, which means every exposed-conductive-part connected to the CPC briefly rises above true earth by that voltage. It\'s the same physics as a real earth fault — but at instrument-controlled current and for a few milliseconds. Small voltage, brief duration — but real."
            onSite="On a domestic install you typically control who\'s in the room. On a commercial install with the public around (a school corridor, a hospital ward, a shop floor), you may need to physically restrict access to the test area. The right answer depends on the test current, the CPC resistance, and who can touch the metalwork during the test."
          >
            <p>The math behind the touch-voltage:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Touch-voltage = I_test x R_CPC.</strong> For a 25 A full-mode test on a
                0.4 Omega CPC = 10 V. For a 15 mA no-trip test on the same CPC = 0.006 V (negligible).
              </li>
              <li>
                <strong>Duration = a few milliseconds to a few cycles.</strong> Modern MFTs limit
                the test pulse to minimise hazard duration.
              </li>
              <li>
                <strong>Perception threshold for AC at 50 Hz.</strong> Typically 1-5 V through wet
                skin; 5-15 V through dry skin. Below threshold = no shock. At threshold = a
                tingle. Above threshold = potentially a sustained contact.
              </li>
              <li>
                <strong>Risk amplifiers.</strong> Wet hands, barefoot on wet floor, contact area,
                contact duration, individual sensitivity (children, elderly, those with cardiac
                conditions).
              </li>
            </ul>
            <p>Practical management options:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic single-occupier:</strong> Brief the customer, ask them to stay
                clear of metalwork during testing, proceed.
              </li>
              <li>
                <strong>Domestic multi-occupier (HMO, family with children):</strong> Brief all
                occupants, choose a time when fewer people are around, test efficiently.
              </li>
              <li>
                <strong>Commercial during business hours:</strong> Brief the responsible person,
                consider barriers around test points, signage at exposed metalwork.
              </li>
              <li>
                <strong>Public / hospital / school:</strong> Out-of-hours testing where possible.
                Where not, full barriers and an assistant to manage access.
              </li>
              <li>
                <strong>Always:</strong> Use no-trip mode where possible (lower test current means
                lower touch-voltage). Reserve full trip mode for circuits where the access risk is
                fully managed.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Instrument requirements — BS EN 61557-3</ContentEyebrow>

          <ConceptBlock
            title="What BS EN 61557-3 conformance buys you"
            plainEnglish="BS EN 61557-3 is the international standard for loop impedance testers. An instrument conforming to this standard meets specified safety, performance and accuracy requirements — verified by the manufacturer\'s declaration of conformity. UK MFTs from reputable brands (Megger, Fluke, Kewtech, Metrel) all conform. The standard is what underpins the trust we put in test readings."
            onSite="When buying or specifying a Zs tester, look for BS EN 61557-3 conformance on the datasheet. When the firm\'s certification software pre-fills the instrument record, the certificate cites the instrument identifier; the conformance is implicit but worth verifying once for each instrument in the firm\'s register."
          >
            <p>What BS EN 61557-3 covers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Measurement range.</strong> The instrument must be capable of measuring
                loop impedance across the range relevant to the application — typically 0-200
                Omega for general use, with sub-ohm resolution at the low end and ohm-level
                resolution at the high end.
              </li>
              <li>
                <strong>Accuracy bands.</strong> The instrument must meet declared accuracy
                tolerances across its measurement range — typically plus or minus 5 percent in
                full mode, plus or minus 10 percent in no-trip mode.
              </li>
              <li>
                <strong>Test current characteristics.</strong> The waveform, peak current, duration
                and source impedance of the test current are specified.
              </li>
              <li>
                <strong>Safety requirements.</strong> Voltage withstand of the leads, lead fusing,
                operator protection, terminal layout per GS38.
              </li>
              <li>
                <strong>Calibration interval.</strong> The standard specifies how often calibration
                should be checked — typically annually for routine site use, more frequently for
                instruments in heavy commissioning use.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Resolution vs accuracy — the difference that matters"
            plainEnglish="Resolution and accuracy are different specifications. Resolution is the smallest increment the display can show (e.g. 0.01 Omega). Accuracy is how close the displayed reading is to the true value (e.g. plus or minus 5 percent plus or minus 3 digits). High resolution with poor accuracy gives precise-looking but unreliable readings; high accuracy with low resolution gives reliable but imprecise readings. You need both."
            onSite="Modern MFTs typically achieve both — 0.01 Omega resolution and plus or minus 5-10 percent accuracy depending on mode. Older instruments may have lower resolution (0.1 Omega) which can make borderline readings hard to interpret precisely. Verify the spec for your instrument before relying on a reading at the edge of its capability."
          >
            <p>Worked example of why both matter:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Instrument A:</strong> Resolution 0.001 Omega, accuracy plus or minus 20
                percent. Display shows 1.082 Omega. True value could be 0.866-1.298 Omega. The
                three decimal places are misleading — actual uncertainty is huge.
              </li>
              <li>
                <strong>Instrument B:</strong> Resolution 0.1 Omega, accuracy plus or minus 5
                percent. Display shows 1.1 Omega. True value 1.045-1.155 Omega. Lower resolution
                but the reading is trustworthy within a tighter band.
              </li>
              <li>
                <strong>Instrument C (modern MFT):</strong> Resolution 0.01 Omega, accuracy plus
                or minus 5 percent. Display shows 1.08 Omega. True value 1.026-1.134 Omega. Good
                resolution AND good accuracy — what you want.
              </li>
            </ul>
            <p>
              For borderline readings (within 10 percent of the limit), the accuracy band matters
              most. A reading of 1.05 Omega on a 1.10 Omega limit looks like a 5 percent margin
              — but with plus or minus 10 percent accuracy the true value could be 0.945-1.155
              Omega. That\'s the practical reason to retest borderline readings in full trip
              mode (typically tighter accuracy) or to investigate the underlying installation.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="IET Guidance Note 3 — Loop impedance test instrument range and resolution"
            clause="When performing loop impedance measurements, inspectors shall ensure the instrument\'s measurement range includes the expected Zs values; otherwise readings may be inaccurate. Confirm instrument range before carrying out loop impedance tests. The resolution of an instrument is the smallest increment that the instrument can detect and display."
            meaning={
              <>
                GN3 puts the duty on the inspector to verify instrument range matches the
                expected Zs before testing. On TT installations with expected Zs of 50-200
                Omega, the meter must be set to (or auto-range into) the high range. On TN
                with expected Zs under 2 Omega, the low range is appropriate. Resolution
                (smallest displayed increment) and accuracy (tolerance band) are independently
                specified — both matter for trustworthy readings.
              </>
            }
            cite="Source: IET Guidance Note 3 — Inspection and Testing, instrument range and resolution guidance."
          />

          <RegsCallout
            source="IET Guidance Note 3 — Fused test leads for loop-impedance testing"
            clause="If fused leads are used for loop impedance testing, they will need to be fused with higher rating fuses to prevent the test current rupturing the fuse. Typical higher rating fuses used are 7 A or 10 A. The requirement is to fit a fuse of sufficient rating so the loop-impedance test current does not rupture the fuse during the test."
            meaning={
              <>
                Lead fuses on Zs testers must be rated above the test current to avoid rupturing
                during normal testing. GN3 specifies typical 7 A or 10 A as adequate ratings —
                high enough to handle the 10-25 A test current pulse, low enough to clear in
                genuine fault conditions. Lead fuses are a maintenance item — check on each
                visit and carry spares.
              </>
            }
            cite="Source: IET Guidance Note 3 — Inspection and Testing, fused lead guidance."
          />

          <SectionRule />

          <ContentEyebrow>Fused leads — the maintenance item</ContentEyebrow>

          <ConceptBlock
            title="Why your test leads have fuses in them"
            plainEnglish="Loop-impedance test leads carry the test current — and any accidental fault current if the leads are mis-connected or the circuit develops a fault during testing. Lead fuses protect the operator and the instrument by clearing under sustained high current. GN3 specifies typical adequate ratings of 7 A or 10 A — high enough to not rupture during normal testing, low enough to clear in genuine fault conditions."
            onSite="Lead fuses are a maintenance item. They can rupture (blow) without obvious indication — the only sign is the meter not reading correctly. Check lead fuse continuity periodically, and carry spares. If your meter starts giving zero readings or out-of-range readings, suspect lead fuses before suspecting the instrument."
          >
            <p>Practical lead-fuse points:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard rating: 7 A or 10 A per GN3 typical guidance.</strong> Some
                instruments specify a particular rating in the manual; defer to the manufacturer.
              </li>
              <li>
                <strong>Check on each visit.</strong> Visual inspection of the leads, continuity
                check on the meter\'s own continuity range against a known low resistance (proves
                lead + fuse intact).
              </li>
              <li>
                <strong>Carry spares.</strong> Lead fuses are cheap and a spare set lives in the
                MFT case. Replacing in field is a 30-second job.
              </li>
              <li>
                <strong>Don\'t over-fuse.</strong> Fitting a 16 A fuse "to make the leads more
                robust" defeats the protection. Stay within the specified rating range.
              </li>
              <li>
                <strong>Specific instrument types:</strong> Some MFTs have internal fuses too
                (separate from the lead fuses). Manufacturer manual lists internal fuse positions
                and ratings.
              </li>
            </ul>
          </ConceptBlock>

          <VideoCard
            url={videos.zeTest.url}
            title={videos.zeTest.title}
            channel={videos.zeTest.channel}
            duration={videos.zeTest.duration}
            topic={videos.zeTest.topic}
          />

          <SectionRule />

          <ContentEyebrow>The board test sequence — practical order</ContentEyebrow>

          <ConceptBlock
            title="Standard order — Ze first, then circuits in turn"
            plainEnglish="There\'s a standard order to live Zs verification across a board. Ze at the supply origin first — establishes the supply impedance baseline. Then each circuit at its furthest point in label / RCD-group order. Borderline / failing readings investigated before moving on. The order isn\'t arbitrary — it gives you the data in the sequence that lets you sanity-check each reading as you go."
            onSite={`Walk into the board, set up the MFT, take Ze. Note it on the schedule. Then circuit by circuit. Modern certification software has a "next circuit" workflow that prompts each test in order — useful but not a substitute for understanding why the order matters.`}
          >
            <p>The standard sequence in detail:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Verify the board is energised, all protective devices closed.</strong>
                Take supply voltage reading L-N at the main switch — note alongside Ze. Should
                be in the 216-253 V range for UK 230 V supply.
              </li>
              <li>
                <strong>Ze at the supply origin.</strong> 3-lead Zs at the incoming meter tails or
                the main switch. Reading is the supplier\'s loop impedance from the test point
                back to the transformer. Typically 0.1-0.35 Omega for TN-C-S, 0.2-0.5 Omega for
                TN-S, 30-200+ Omega for TT.
              </li>
              <li>
                <strong>For each circuit, in label order.</strong> Test at the furthest point
                from the CU. Use no-trip mode if RCD-protected. Note Zs against the circuit
                identification on the schedule.
              </li>
              <li>
                <strong>Sanity check each reading.</strong> Calculated Zs from dead-test = Ze +
                R1+R2. Measured should agree within plus or minus 10-20 percent. Discrepancy
                above 20 percent — investigate before moving on.
              </li>
              <li>
                <strong>Borderline readings — retest in full trip mode.</strong> After preparing
                (switch off sensitive loads, brief customer, be ready to reset). Compare the
                two readings; the full mode gives the higher-confidence answer.
              </li>
              <li>
                <strong>Failing readings — investigate.</strong> Check terminations, route length,
                CPC size, parallel paths. Don\'t proceed past a failing circuit without addressing
                it.
              </li>
              <li>
                <strong>Compile readings on the Schedule of Test Results.</strong> Each circuit\'s
                Zs against its row, with the protective device and the Table 41.3 limit alongside
                for cross-check.
              </li>
              <li>
                <strong>Cross-check final.</strong> Add all readings up against the design
                expectation; identify any outliers; flag any patterns (e.g. all kitchen circuits
                higher than expected = possible common cause).
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Calculated vs measured — the cross-check that catches errors"
            plainEnglish="Every measured Zs should have a calculated counterpart from the dead-test phase: Zs(calc) = Ze + R1+R2. The two should agree within instrument tolerance — typically plus or minus 10-20 percent combined. Significant disagreement (above 20 percent) is a finding to investigate, not a result to record and move on from."
            onSite="The cross-check is your safety net. It catches instrument range errors, bad terminations that drop out under load, parallel earth paths that don't carry full fault current, supply voltage variation between dead and live test, and a host of other subtle issues. Build the habit early — every Zs reading gets a quick mental calculation check."
          >
            <p>The cross-check workflow:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>From dead testing:</strong> R1+R2 measured at the test point. Add Ze
                from the supply origin reading. Result is the calculated Zs(calc).
              </li>
              <li>
                <strong>From live testing:</strong> Zs measured at the test point. Result is
                Zs(meas).
              </li>
              <li>
                <strong>Compare.</strong> Difference = abs(Zs(meas) - Zs(calc)) / Zs(calc) x 100
                percent.
              </li>
              <li>
                <strong>Within plus or minus 10 percent:</strong> Excellent agreement. Both
                readings trustworthy.
              </li>
              <li>
                <strong>10-20 percent difference:</strong> Within combined instrument tolerance.
                Note but acceptable.
              </li>
              <li>
                <strong>Above 20 percent:</strong> Investigate. Possible causes — instrument
                range issue, bad termination dropping out under load, parallel earth path,
                supply voltage variation, real installation defect. Don't proceed past the
                discrepancy without addressing it.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Documentation — what goes on the Schedule of Test Results"
            plainEnglish="Live Zs verification produces one row of data per circuit on the Schedule of Test Results. Standard fields: circuit identification, protective device type and rating, measured Zs, Table 41.1 / 41.3 limit (with 0.8 multiplier applied), pass / fail. The instrument used and its calibration date are recorded once for the whole schedule."
            onSite="Modern certification software (Megger CertSuite, Fluke FlukeView, Kewtech KEWPRO, ElectricalCert.app) auto-populates from MFT data — connect the meter to the app, upload the test cycle, fields populate automatically. Manual entry is still supported but auto-population reduces transcription errors."
          >
            <p>The standard schedule fields for live Zs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit identification.</strong> Number, label, area served, RCD coverage.
              </li>
              <li>
                <strong>Protective device.</strong> Type (B/C/D), rating (in amps), Icn (kA).
              </li>
              <li>
                <strong>Test method.</strong> 3-lead or 2-lead, no-trip or full-trip mode.
              </li>
              <li>
                <strong>Measured Zs.</strong> Reading in ohms to 2 decimal places.
              </li>
              <li>
                <strong>Table 41.3 limit.</strong> Maximum Zs from the table for the device, with
                0.8 multiplier applied for measured comparison.
              </li>
              <li>
                <strong>Pass / fail.</strong> Comparison of measured against corrected limit.
              </li>
              <li>
                <strong>Notes.</strong> Borderline result, retested in full-trip mode for
                confirmation, remediation taken (e.g. termination re-made), instrument-related
                observations.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Using full trip-current mode on every circuit and tripping the customer\'s freezer"
            whatHappens={
              <>
                You\'re testing a domestic with all-RCBO consumer unit. Forgot to switch the MFT
                to no-trip mode. Press TEST on the kitchen ring — RCBO trips, freezer goes off.
                You don\'t notice (you\'re still working through the schedule). Two days later
                customer phones in: "all the food has spoiled". Firm pays for the food
                replacement plus an awkward apology. The reading you took during the trip is
                also invalid because the supply was interrupted.
              </>
            }
            doInstead={
              <>
                Set the MFT to no-trip mode at the start of every domestic / commercial RCBO-board
                visit. Make it a habit before connecting the leads. Most modern MFTs let you set
                a default that persists between sessions — set it once and forget. Reserve full
                trip mode for non-RCD circuits (older split-load boards) or for borderline
                confirmation after preparing the customer.
              </>
            }
          />

          <CommonMistake
            title="Testing without verifying the instrument range"
            whatHappens={
              <>
                Old habit — auto-range MFT, never thought about range. You\'re asked to test a TT
                installation with expected Zs in the 50-200 Omega range. Auto-range works fine on
                TN values (under 2 Omega) but on a manual-range instrument set to the low range,
                the TT reading saturates or reads inaccurately. You record "0 Omega" or
                "out of range" and don\'t know why. Time wasted; results unusable. Worst case —
                instrument damaged if test current exceeds the low-range capacity.
              </>
            }
            doInstead={
              <>
                Before testing, mentally estimate the expected Zs based on the earthing system —
                TN-C-S 0.3-1.0 Omega, TN-S 0.2-1.0 Omega, TT 30-200+ Omega. Set the meter range
                accordingly (or verify auto-range will handle it). Per GN3, instrument range
                awareness is part of competent practice — not just a manufacturer concern.
              </>
            }
          />

          <Scenario
            title="Live Zs verification across an all-RCBO domestic CU — Megger MFT1741+"
            situation={
              <>
                3-bed semi in Reading, 12-way all-RCBO consumer unit, ten radial / ring circuits
                including kitchen ring, kitchen lights, upstairs sockets, downstairs sockets,
                upstairs lights, downstairs lights, EV charger 32 A radial in driveway, immersion,
                cooker, smoke alarm. TN-C-S supply, dead testing complete with Ze = 0.32 Omega
                and circuit R1+R2 values recorded. Customer at home, two children at school, dog
                in the kitchen.
              </>
            }
            whatToDo={
              <>
                Brief the customer first — "I\'ll be doing live tests for about an hour. The
                supply will be on throughout. Can you keep the dog away from the kitchen
                metalwork (sink, taps, washing machine) for the next hour? If anything goes off
                briefly that\'s normal — I\'ll get to it." Set the MFT1741+ to Zs no-trip mode,
                BS EN 61557-3 conformance verified on the meter case, last calibration
                2025-09-12 (within 12 months). Lead fuses checked — both 10 A, intact. Test Ze
                at the main switch: 0.32 Omega — agrees with dead test. Note. Move through the
                circuits in order: kitchen ring 0.62 Omega (calc 0.60 Omega, agrees, well within
                Type B 32 A measured limit 1.10 Omega), kitchen lights 1.32 Omega (Type B 6 A
                limit 5.83 Omega, comfortable pass), upstairs sockets 0.85 Omega (Type B 16 A
                limit 2.19 Omega, pass), downstairs sockets 0.78 Omega (pass), upstairs lights
                1.42 Omega (Type B 6 A pass), downstairs lights 1.18 Omega (pass), immersion
                0.65 Omega (Type B 20 A limit 1.75 Omega, pass), cooker 0.58 Omega (Type B 32 A
                pass), smoke alarm 1.85 Omega (Type B 6 A pass). EV charger 32 A radial in
                driveway — Zs = 1.08 Omega, very close to 1.10 Omega measured limit (Type B 32 A,
                1.37 Omega table). Borderline. Brief the customer: "I want to retest the EV
                charger circuit more accurately, that will briefly trip the breaker, OK?".
                Customer agrees. Switch MFT to full trip-current mode, run the test —
                EV charger trips, reading 1.05 Omega in full mode (agreement within 3 percent
                with no-trip). Reset the EV charger RCBO. Investigate: cable route is 22 m of
                6 mm with 6 mm CPC. GN3 Table B1 expected R1+R2 = 22 x (3.08 + 3.08) mOhm/m =
                0.135 Omega. Add Ze 0.32 = expected Zs 0.46 Omega. Measured 1.05 Omega is more
                than double expected. Investigate terminations: open the EV charger isolator,
                inspect the supply terminals — find a marginal screw-clamp on the CPC. Re-make
                with proper torque, retest Zs = 0.52 Omega. Comfortable pass. Document
                everything: Zs per circuit on the Schedule of Test Results, Megger MFT1741+
                serial number and calibration date, no-trip mode noted for the standard tests,
                full trip mode noted for the EV charger confirmation, the EV charger
                remediation with before / after readings. Move on to RCD trip-time tests in
                Sub 3.
              </>
            }
            whyItMatters={
              <>
                The sequence demonstrates the discipline. No-trip default for routine; full trip
                for borderline confirmation; investigation for unexpected results; remediation
                with documentation. Every reading sanity-checked against the dead-test
                expectation. Instrument range and calibration verified up front. Customer briefed
                on what to expect. The EV charger marginal pass became a finding-and-fix that
                eliminated a latent failure. Without the live test, the dead-test calculation
                would have looked fine; without the borderline confirmation in full mode, the
                latent failure would have shipped to the customer as a minor pass.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "No-trip / low-current mode (under 15 mA peak) is the default for RCD-protected circuits. Full trip-current mode (10-25 A) is for non-RCD circuits or borderline confirmation after preparing for the trip.",
              "GN3 warns of touch-voltage on earthed metalwork during EFLI tests — I_test x R_CPC briefly raises ECPs above true earth. Manage access in commercial / public installations.",
              "BS EN 61557-3 conformance underpins instrument trust. Verify range matches expected Zs (low for TN, high for TT) and check calibration is current.",
              "Resolution and accuracy are different — modern MFTs achieve both (typically 0.01 Omega resolution, plus or minus 5-10 percent accuracy). Don't over-trust precise-looking readings on a poorly-specified instrument.",
              "Lead fuses (typically 7 A or 10 A) are a maintenance item. Check on each visit; carry spares; don't over-fuse.",
              "Standard board sequence: Ze first, then each circuit at the furthest point in label / RCD-group order. Sanity-check each reading against Ze + R1+R2 from dead testing.",
              "A4:2026 Table 41.3 max Zs for Type B 32 A = 1.37 Omega table, 1.10 Omega measured. Carry the corrected limits in your head — B6 5.83, B16 2.19, B32 1.10.",
              "Borderline readings warrant retest in full trip mode for confirmation. Failing readings warrant investigation — terminations, route length, CPC size, parallel paths. Don't proceed past a failing circuit.",
            ]}
          />

          <Quiz title="Zs measurement — methods and techniques" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.1 Zs — 3-lead and 2-lead methods
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 RCD trip-time testing (A4:2026)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
