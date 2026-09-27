/**
 * Ported from the English course, combining:
 *   level3/module5/section4/Sub2.tsx
 *   level3/module5/section4/Sub1.tsx
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
  VideoCard,
  SectionRule,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import { EarthingSystemDiagram } from '@/components/study-centre/diagrams';

const checks = [
  {
    id: 'm5-s4-sub2-no-trip-vs-trip',
    question:
      'On a circuit protected by a 30 mA Type AC RCD, which Zs test mode is correct and why?',
    options: [
      'No-trip / low-current Zs mode, which limits test current below the RCD trip threshold so the device stays in and the supply is not interrupted.',
      'Full high-current Zs mode, because the higher test current is more accurate and a Type AC RCD is slow enough not to trip on a brief pulse.',
      'Disconnect the RCD load conductor first so the test current bypasses the device, then take a standard Zs reading and reconnect the load.',
      'Any Zs mode is fine, because a Type AC RCD responds only to sinusoidal residual current and cannot detect the pulsed DC test current at all.',
    ],
    correctIndex: 0,
    explanation:
      'Modern multifunction testers (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) all offer a no-trip / low-current Zs mode specifically for RCD-protected circuits. The instrument limits its test current and may apply a DC bias technique to suppress the AC RCD’s sensing. The slight loss of accuracy is acceptable; the RCD stays in. Disconnecting an RCD to test "more accurately" is bad practice — you change the circuit you’re trying to verify and you risk leaving the install without RCD protection if you forget to reconnect.',
  },
  {
    id: 'm5-s4-sub2-touch-voltage',
    question:
      'GN3 warns about voltages appearing on earthed metalwork during a Zs test. The mechanism is:',
    options: [
      'The instrument applies the full 230 V supply directly to the earthed metalwork for a few cycles, raising every exposed-conductive-part to line potential.',
      'Test current through the L-E loop drops a voltage along the CPC (I_test x R_CPC), briefly raising connected metalwork above true earth by that amount.',
      'The test current induces a magnetic field in nearby steel conduit, coupling a voltage onto the metalwork by transformer action during the pulse.',
      'The test charges the cable capacitance to several hundred volts, and that stored charge appears on the metalwork until the instrument discharges it.',
    ],
    correctIndex: 1,
    explanation:
      "GN3 explicitly flags this hazard. The test current creates a touch-voltage on every exposed-conductive-part connected to the CPC under test. In domestic single-occupier work it's low risk because you control access. In commercial / public spaces (a shop floor, a school corridor, a hospital), you may need to physically restrict access to the test area while testing — temporary barriers, signage, an assistant. Test current depends on instrument and mode (no-trip mode typically 15 mA peak, full trip mode 10-25 A) — the higher the test current, the higher the touch-voltage hazard.",
  },
  {
    id: 'm5-s4-sub2-fused-leads',
    question:
      'Why are loop-impedance test leads typically fitted with 7 A or 10 A fuses (not 1 A or 3 A)?',
    options: [
      'Because the higher-rated fuse is needed to carry the standing load current of the circuit under test while the live Zs reading is taken.',
      'Because a lower-rated fuse adds resistance the meter must subtract, lengthening each test, whereas a 7 A or 10 A fuse adds negligible resistance.',
      'The full-mode test current (10-25 A briefly) would rupture a lower fuse during normal testing, so 7 A or 10 A is high enough not to nuisance-blow.',
      'Because GS38 requires test leads fused at no less than the prospective fault current, which on a domestic supply is always above 6 A.',
    ],
    correctIndex: 2,
    explanation:
      "The GN3 guidance on fused leads is specific — high enough rating to not rupture during the test current pulse, low enough to clear on a genuine fault. 7 A or 10 A are the typical values. Lead fuses are a maintenance item — check periodically that they're intact and the right rating. A ruptured lead fuse looks like an instrument failure if you don't know what to look for.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS EN 61557-3 is the standard governing loop impedance testers. What does conformance to this standard guarantee in practice?',
    options: [
      'BS EN 61557-3 is the calibration standard setting how often a loop tester must be returned, guaranteeing accuracy for a stated interval, typically 12 months.',
      'BS EN 61557-3 specifies the safety, performance and accuracy requirements for loop impedance instruments, including measurement range, test current and accuracy bands.',
      'BS EN 61557-3 defines the colour-coding and labelling of test leads so line, neutral and earth probes cannot be confused for safe connection.',
      'BS EN 61557-3 specifies the maximum test current a loop tester may inject, guaranteeing it never draws above 30 mA so it suits any RCD-protected circuit.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 61557-3 is the international product safety / performance standard for loop impedance testers. UK MFTs from reputable manufacturers (Megger, Fluke, Kewtech, Metrel) all carry BS EN 61557-3 conformance. The standard underpins the trust we place in the readings — without it, instrument accuracy claims would be unverifiable.',
  },
  {
    id: 2,
    question: 'Instrument resolution and instrument accuracy are different things. Define each.',
    options: [
      'RESOLUTION is how quickly the instrument settles to a final reading; ACCURACY is how repeatable that reading is across several identical tests.',
      'RESOLUTION is the highest value the instrument can display; ACCURACY is the lowest value it can detect, such as down to 0.01 Omega.',
      'RESOLUTION is the smallest increment the display can show (e.g. 0.01 Omega); ACCURACY is how close the reading is to the true value (e.g. plus or minus 5 percent).',
      'RESOLUTION is the percentage tolerance on the reading; ACCURACY is the number of decimal places shown — the two terms are effectively interchangeable.',
    ],
    correctAnswer: 2,
    explanation:
      "GN3 distinguishes resolution and accuracy because the two are independently specified. A high-resolution display (showing many decimal places) doesn't guarantee the reading is right — you also need the instrument to be accurate within its declared tolerance. Most modern MFTs achieve both, but apprentices need to understand the distinction so they don't over-trust precise-looking readings on a poorly-calibrated instrument.",
  },
  {
    id: 3,
    question:
      "You're testing Zs at the furthest socket on a 32 A ring final (Type B 32 A RCBO, no-trip mode). Reading 1.05 Omega, but you suspect borderline. Worth retesting in full trip-current mode?",
    options: [
      'No — full trip-current mode is never used on a ring final, because the higher test current can overheat the smaller ring conductors and damage insulation.',
      'No — the no-trip reading is always the more accurate of the two, because limiting the test current removes the heating error of high-current mode.',
      'No — once a no-trip reading is taken it must be recorded as-is; BS 7671 does not permit a second Zs measurement during one verification.',
      'Yes, after preparing for the trip — full trip mode is more accurate and confirms whether a borderline no-trip reading can be relied on.',
    ],
    correctAnswer: 3,
    explanation:
      'Full trip-current mode trips the RCBO but gives the most accurate reading. On a borderline result it’s the right tool to use — provided you prepare for the trip. The standard procedure on a domestic install: brief the customer ("the breaker will briefly trip during a more accurate test, that’s normal"), switch off any sensitive electronics on the same circuit, run the test, reset the breaker, document both readings. The customer sees professional confidence; the firm has higher-quality data.',
  },
  {
    id: 4,
    question:
      'Why does GN3 say to verify instrument range BEFORE carrying out the loop-impedance test?',
    options: [
      'A meter set to a low range (0-2 Omega) saturates or misreads on a high-Zs TT install, so the range must match the expected reading before pressing TEST.',
      'Because the instrument must be left on the chosen range for at least 30 seconds to warm up, and selecting the range early gives it time to stabilise.',
      'Because the tester re-calibrates to the selected range, and changing range mid-test invalidates the calibration, so it must be fixed beforehand.',
      'Because each range uses a different test current, and the wrong range injects too much current, tripping the protective device even in no-trip mode.',
    ],
    correctAnswer: 0,
    explanation:
      'Range awareness is part of competent instrument use. Modern auto-ranging MFTs reduce the risk by switching range automatically, but on manual-range instruments (or auto-range instruments at the edge of their detection capability) the apprentice needs to consciously verify the range. GN3 puts the duty on the inspector — not on the instrument.',
  },
  {
    id: 5,
    question:
      "A4:2026 Table 41.3 max Zs for Type B 32 A is 1.37 Omega. Apply the 0.8 multiplier; what's the measured-Zs limit and why?",
    options: [
      'Measured limit = 1.37 ÷ 0.8 = 1.71 Omega — the 0.8 factor is divided into the table value to allow for the cable being warmer in service.',
      'Measured limit = 0.8 x 1.37 = 1.10 Omega — the table assumes 70 deg C conductors, so the 0.8 multiplier corrects the ambient-temperature reading.',
      'Measured limit = 1.37 Omega unchanged — the 0.8 multiplier is applied to the measured reading, not the table value, so comparison is against the full figure.',
      'Measured limit = 0.8 + 1.37 = 2.17 Omega — the 0.8 allowance is added to the table value to give headroom for instrument tolerance.',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 updated Table 41.3 — for Type B 32 A the value is 1.37 Omega (NOT the older 1.44 Omega from previous editions). Applying the 0.8 multiplier gives a measured-Zs target of 1.10 Omega. Carry the corrected limits in your head: B32 = 1.10, B16 = 2.19, B6 = 5.83. They come up constantly on site.',
  },
  {
    id: 6,
    question:
      'You read Zs = 0.62 Omega at the furthest socket of a kitchen ring. Calculated Zs from dead-test (Ze + R1+R2) = 0.55 Omega. Why the 12 percent difference and is it a concern?',
    options: [
      'It is a serious fault — the live Zs should always read lower than calculated, so a higher reading means a broken CPC and the circuit must be condemned.',
      'It means the dead-test R1+R2 was measured at the wrong accessory; re-measure R1+R2 at the origin and the two figures will then match exactly.',
      'Multiple legitimate causes — compounded instrument tolerance, temperature difference, supply voltage variation or a parallel earth path. Within tolerance up to 20 percent.',
      'It is the temperature correction showing through — the 12 percent gap is exactly the 0.8 multiplier, so the reading already includes the operating-temperature allowance.',
    ],
    correctAnswer: 2,
    explanation:
      'Calculated vs measured Zs should agree within instrument tolerance — typically plus or minus 10-20 percent combined. A discrepancy above that warrants investigation: poor termination, parallel earth path under dead testing that drops out under load, instrument range issue, or a real installation defect. The 12 percent difference here is within tolerance — note it but no further action needed.',
  },
  {
    id: 7,
    question:
      'On a TT installation with high Ra (e.g. 150 Omega), the Zs reading at the consumer side will be:',
    options: [
      'Close to Ze on a TN-C-S supply — about 0.35 Omega — because on TT the consumer electrode is bypassed by the supplier earth and Ra has little effect.',
      'About 0.62 Omega — the same as a typical TN ring final — because Zs depends on circuit cabling, not the earthing arrangement at the origin.',
      'Roughly half of Ra — about 75 Omega — because the consumer and transformer electrodes act as two resistances in parallel in the loop.',
      'Dominated by Ra — with R1+R2 under 1 Omega, a 150 Omega electrode gives Zs of about 150-152 Omega, far too high for overcurrent ADS.',
    ],
    correctAnswer: 3,
    explanation:
      'TT Zs values are an order of magnitude higher than TN because the soil is the return path. This is exactly why RCDs are mandatory on TT — the loop impedance is too high for an MCB or fuse to clear within disconnection time. The Ra x I delta n test confirms the RCD will operate within the 50 V touch-voltage limit. For a 30 mA RCD: 0.030 x 150 = 4.5 V, well within 50 V — pass.',
  },
  {
    id: 8,
    question:
      'Standard sequence for live Zs verification across a domestic consumer unit — what order do you test and why?',
    options: [
      'Ze at the origin first for the baseline, then each circuit at its furthest point in label / RCD-group order, then deal with any borderline or failing readings.',
      "Test each circuit's furthest point first to build up the per-circuit readings, then measure Ze last and subtract it to confirm each R1+R2 contribution.",
      'Test the nearest accessory on every circuit first, since the nearest point gives the worst-case Zs, then work outwards only if the nearest reading fails.',
      'Test in full trip mode throughout for accuracy, starting with the highest-rated circuit, and switch to no-trip only if a circuit trips on the first attempt.',
    ],
    correctAnswer: 0,
    explanation:
      "Sequence matters. Ze first establishes the baseline supply impedance — every per-circuit Zs should be Ze + R1+R2 within tolerance. Without Ze first, you can't sanity-check the per-circuit readings. Standard pattern: Ze, then each circuit's furthest point, then deal with any borderline / failing readings before moving on.",
  },
];

const faqs = [
  {
    question: "What if my MFT doesn't have a no-trip mode?",
    answer:
      "Older MFTs may only offer full trip-current mode. Two options: (a) buy a modern MFT (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+ all have no-trip) — for serious testing work it's a sensible investment; (b) plan around the trips — switch off sensitive loads, brief the customer, accept that each test trips the RCD and reset between tests. The latter is acceptable but tedious. Most firms have moved to no-trip-capable instruments because the time saved on site recoups the instrument cost quickly.",
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
    question:
      "What's the test current in no-trip mode and how does the meter avoid tripping the RCD?",
    answer:
      "Typical no-trip mode test current is 15 mA peak (below the 30 mA AC RCD threshold). The instrument applies the test current as a brief pulse (a few milliseconds), often combined with a small DC bias that suppresses the AC RCD's residual current sensing during the pulse. Some instruments use a \"fast pulse\" technique where the test pulse is shorter than the RCD's response time. The combined effect: the test happens, the RCD doesn't register a fault, the reading is captured. Manufacturer manuals describe the specific technique — worth reading once for your particular MFT.",
  },
  {
    question: 'Does the touch-voltage during testing actually shock people in practice?',
    answer:
      "Rarely — but it's real. A 10 V touch-voltage from a 25 A test on a 0.4 Omega CPC is below the perception threshold for most people through dry skin. Wet hands or barefoot on wet floor can lower the perception threshold. The risk is amplified on installations where the public might be touching exposed-conductive-parts during the test (kitchen taps connected via supplementary bonding, metal handrails in commercial premises). GN3 says — manage access during testing. For domestic single-occupier work this is straightforward; for commercial / public installations you may need barriers, signs, or scheduled out-of-hours testing.",
  },
  {
    question: 'Why does the supply voltage affect Zs readings?',
    answer:
      'The Zs tester measures impedance by applying a known test current and measuring voltage drop, then computing Z = V/I. If the supply voltage drops momentarily during the test (because of high background load on the network), the test current may be slightly different than the instrument expects — leading to a small reading error. Modern testers compensate, but on weak rural supplies you may see Zs readings vary slightly between test cycles. Also relevant: the calculated PFC from Zs is V/Z, so a lower-than-nominal supply voltage gives a lower computed PFC. Always note the supply voltage at test time alongside the Zs reading.',
  },
];

const checks2 = [
  {
    id: 'm5-s4-sub1-3-lead',
    question: 'The 3-lead Zs measurement method works by:',
    options: [
      'The tester measures the line-earth loop loaded and unloaded, then subtracts the two to remove load current from the Zs result.',
      'The tester injects a 30 mA residual current between line and earth and converts the time the loop takes to settle directly into Zs.',
      'The tester briefly draws current via the L-N loop and via the L-E loop, deriving Zs from the L-E reading (Ze plus R1+R2).',
      'The tester compares no-load supply voltage against the voltage under a fixed resistive load between line and neutral to read Zs.',
    ],
    correctIndex: 2,
    explanation:
      'The 3-lead Zs test connects to L, N and E at the test point. The instrument briefly draws test current via the L-N loop and via the L-E loop, measuring the voltage drop and computing impedance from V/I. The L-N reading characterises the supply network. The L-E reading is what feeds the Zs result. Modern MFTs use this dual measurement to give better accuracy and to support no-trip RCD modes.',
  },
  {
    id: 'm5-s4-sub1-rcd-no-trip',
    question: 'When measuring Zs on a circuit protected by a 30 mA RCD, you should:',
    options: [
      'Bridge out the RCD with a temporary link across its line and load terminals for the test, then remove the link and reset before re-energising.',
      "Use the tester's no-trip / low-current Zs mode, which limits test current below the RCD trip threshold to avoid nuisance tripping during the test.",
      'Use the standard high-current Zs mode but press TEST once and quickly, so the test current pulse is too brief for the RCD to detect.',
      'Disconnect the circuit CPC at the consumer unit so test current returns via the supply neutral rather than the RCD, then reconnect it afterwards.',
    ],
    correctIndex: 1,
    explanation:
      "Modern MFTs offer no-trip / low-current Zs modes specifically for RCD-protected circuits. The instrument injects a small DC bias to suppress the RCD's residual current detection during the brief test current pulse. Reading is slightly less accurate than the high-current mode (typically ±10 % vs ±5 %) but avoids tripping the RCD. Always select the right mode before testing — high-current Zs on an RCD-protected circuit trips the RCD and may also trip the upstream RCBO main switch.",
  },
  {
    id: 'm5-s4-sub1-table-41-3',
    question:
      'Measured Zs at the furthest point on a Type B 32 A radial socket circuit = 1.05 Ω. A4:2026 Table 41.3 max Zs (B32) = 1.37 Ω. Compliance:',
    options: [
      'Apply the 0.8 rule: Zs(measured) ≤ 0.8 × 1.37 = 1.10 Ω. 1.05 ≤ 1.10 → pass, but only by a 5 % margin — borderline.',
      'Compare measured Zs directly against the full table value: 1.05 Ω against 1.37 Ω — a clear pass, as the table builds in the temperature allowance.',
      'Add the 20 % temperature rise to the measured value: 1.05 × 1.20 = 1.26 Ω against 1.37 Ω — a pass, as the warm value is still under the limit.',
      'Halve the table limit to allow for the RCD: 1.37 ÷ 2 = 0.685 Ω. Measured 1.05 Ω exceeds 0.685 Ω, so the circuit fails the check.',
    ],
    correctIndex: 0,
    explanation:
      'Table 41.3 values are stated at conductor operating temperature (typically 70 °C). Measured Zs is at ambient — the cable resistance will rise in service. The 0.8 rule corrects approximately for this: Zs(measured) ≤ 0.8 × Zs(table). 1.05 < 1.10 passes but only just. For comfortable headroom, electricians prefer Zs(measured) ≤ 0.7 × Zs(table). On a borderline result, double-check the cable route length, look for any resistance contributors (poor terminations, undersized CPC), and document the marginal pass on the schedule.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'The earth fault loop path on a TN-C-S installation consists of:',
    options: [
      'Line conductor from the transformer to the MET, then the neutral conductor alone back to the star point — the CPC and fault path play no part.',
      'Supply line to fault via R1, fault path, CPC (R2) to the MET, then the supplier combined PEN conductor back to the transformer star point.',
      'Line to the fault, fault path, then the consumer earth electrode and soil mass back to the transformer earth — the same loop as a TT system.',
      'Line from the transformer to the fault point only — on TN-C-S the combined PEN carries no fault current, so the loop ends at the metalwork.',
    ],
    correctAnswer: 1,
    explanation:
      'The TN-C-S earth fault loop: transformer secondary → service cable line conductor → cut-out → consumer line conductor (R1) → fault point → exposed-conductive-part → CPC (R2) → MET → combined PEN conductor in service cable → transformer secondary star point. Total impedance Zs = Ze (everything outside the installation) + R1+R2 (everything inside). Low impedance = high fault current = fast disconnection by overcurrent device.',
  },
  {
    id: 2,
    question: 'The earth fault loop path on a TT installation:',
    options: [
      'Line to the fault, CPC to the MET, then the supplier combined PEN back to the star point — the soil plays no part as the supplier provides the earth.',
      'Line to the fault, CPC to the MET, then the supplier separate earth conductor (cable sheath) back to the transformer earth — the same path as TN-S.',
      'Line to fault via R1, CPC R2 to the MET, consumer electrode, then the soil mass (30-200+ Ω) to the transformer electrode and star point.',
      'Line to the fault, CPC to the MET, then a dedicated consumer earth-return cable back to the substation — TT is wired with a third earth core.',
    ],
    correctAnswer: 2,
    explanation:
      "TT loop replaces the supplier's metallic earth path with the soil mass between consumer's and supplier's electrodes. Soil impedance is high (30-200+ Ω typical) — earth-fault current is much lower than TN, far too low for an MCB to clear in time. RCDs are the protective measure for TT, with the Ra × IΔn ≤ 50 V criterion giving touch-voltage protection.",
  },
  {
    id: 3,
    question: 'Live Zs measurement at the furthest point on a circuit gives:',
    options: [
      'Only the internal cable impedance R1+R2 from the consumer unit to the test point — Ze is measured separately and is not part of the reading.',
      'Only the external supply impedance Ze — the live test reads back to the origin and captures the supply network alone, not the consumer cabling.',
      'The resistance of the protective conductor alone (R2) from the test point to the MET — the line conductor and supply network do not feature.',
      'The complete loop impedance — Ze plus R1+R2 — which should equal the calculated Zs from Ze and R1+R2 within instrument tolerance.',
    ],
    correctAnswer: 3,
    explanation:
      'Live Zs at the test point measures the full loop — supply network plus consumer cabling out to the test point. Should agree with Ze + R1+R2 from the dead-test phase. Significant discrepancy means either the dead test or the live test result is wrong — investigate (re-test, verify instrument calibration, check the test point you are at really is the furthest).',
  },
  {
    id: 4,
    question: 'A4:2026 Table 41.3 Zs limits are stated for cable at:',
    options: [
      'Operating temperature — typically 70 °C for thermoplastic cable — so measured Zs at ambient must be ≤ 0.8 × the table value.',
      'Ambient temperature — typically 20 °C — so the cold table values compare directly against a measured reading with no correction needed.',
      'The maximum permitted insulation temperature — 90 °C for thermosetting cable — giving the absolute worst case at the insulation limit.',
      'A fixed reference of 30 °C — the standard ambient for current-carrying capacity tables — so the same value applies whether loaded or not.',
    ],
    correctAnswer: 0,
    explanation:
      'Table 41.3 values assume worst-case operating conditions — full load, conductor at its rated operating temperature (70 °C for standard PVC-insulated cable). Cable resistance rises about 0.4 % per °C for copper, so a 50 °C rise from ambient to operating gives roughly a 20 % resistance increase. Measured Zs at 20 °C must be 0.8 × the table figure to be confidently below the limit when warm. Some prefer 0.7 × for additional margin.',
  },
  {
    id: 5,
    question: 'Why measure Zs live when you already calculated it from Ze + R1+R2 (dead)?',
    options: [
      'Because the dead-test calculation is not permitted as evidence on an EIC — BS 7671 accepts only a live reading and disregards Ze plus R1+R2.',
      'Independent verification — comparing the calculated value (Ze + R1+R2) against the directly measured Zs catches errors in either method.',
      'Because the live reading is always lower than the calculated value, letting you record the more favourable figure against the Table 41.3 limit.',
      'Because R1+R2 cannot be measured on an energised installation, so the live Zs reading is the only way to obtain R1+R2 once in service.',
    ],
    correctAnswer: 1,
    explanation:
      'Live Zs verification is the keystone test. Calculated Zs (Ze + R1+R2) and measured Zs (live test at the point) should agree within instrument tolerance. Discrepancy reveals either a bad dead-test reading, a bad live-test reading, or some structural issue (parallel earth paths, hidden joints, wrong cable size somewhere). Both numbers in the schedule = full audit trail. Live Zs is also the value the inspector compares against Table 41.3 because it captures the as-installed loop including any subtleties the dead test missed.',
  },
  {
    id: 6,
    question: '2-lead Zs measurement (L-E only):',
    options: [
      'Slower than 3-lead and used only where extra accuracy is needed — a second earth lead cancels supply noise for a more precise reading.',
      'A method measuring between neutral and earth only, used where the line is inaccessible — the N-E loop, which equals Zs on a TN-C-S supply.',
      'Quicker than 3-lead, used when the neutral is inaccessible — the instrument reads the L-E loop only, giving Zs directly without the L-N step.',
      'A method requiring the protective device removed first, then measuring line to earth through the open device position during initial verification.',
    ],
    correctAnswer: 2,
    explanation:
      '2-lead Zs uses just two probes — L and E (or live and earth) at the test point. The instrument briefly draws current through the L-E loop and computes impedance. Faster, simpler than 3-lead, but lacks the L-N reference measurement that some 3-lead modes use for noise rejection. Both methods satisfy Reg 643.7.3 for live Zs verification; choose by site practicality and instrument capability.',
  },
  {
    id: 7,
    question: 'Zs measurement at the supply origin gives:',
    options: [
      'Zs for the most onerous circuit — the origin reading captures the worst-case loop because every circuit branches from that point.',
      'R1+R2 for the main tails — the short run from the cut-out to the consumer unit, added to each circuit Zs to give the total loop impedance.',
      'The prospective fault current at the origin — measuring at the cut-out gives PFC directly, from which Ze is then derived via the supply voltage.',
      'Ze — the external loop impedance from a fault at the MET back to the transformer star point via the supplier earth (for TT, essentially Ra).',
    ],
    correctAnswer: 3,
    explanation:
      "Ze = external earth fault loop impedance at the origin of the installation, measured by Zs test at the incoming side of the consumer's main switch. For TN systems Ze is small (the supplier's earth path); for TT it equals Ra (the consumer's electrode plus soil to supply earth). Ze is the foundation value for every circuit's Zs calculation — Zs = Ze + R1+R2.",
  },
  {
    id: 8,
    question: 'GN3 warns that EFLI tests use the supply voltage and create:',
    options: [
      'Hazardous touch potentials on conductive parts — test current raises exposed-conductive-parts briefly, so manage access to metalwork during the test.',
      'A risk of damaging connected electronic equipment — the test current over-stresses surge devices and electronic controls, so they must be disconnected first.',
      'A risk of corrupting stored test results — the test current interferes with the consumer unit smart meter, so readings must be hand-transcribed not downloaded.',
      'A risk of tripping every RCD on the board — the test current always exceeds 30 mA, so all RCD-protected circuits must be bypassed before the test.',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 explicit safety warning: "Earth fault loop impedance tests use the supply voltage. Use of the supply voltage during EFL tests can produce voltages on exposed conductive parts and create electric shock risk; persons conducting these tests shall take appropriate safety measures." During the brief test pulse, exposed metalwork in the circuit being tested can momentarily rise to a touch-voltage that depends on the loop impedance and the test current. Manage access — do not allow others to touch the installation during the test.',
  },
];

const faqs2 = [
  {
    question: "What's the difference between Ze and Zs?",
    answer:
      "Ze (external) is the earth fault loop impedance from the consumer's MET back to the supply transformer star point — everything OUTSIDE the consumer's installation. Measured at the supply origin with the installation's earthing conductor disconnected. Zs (system) is the COMPLETE earth fault loop including Ze plus the consumer's circuit cabling (R1+R2) out to a specific point. Measured at any point on a circuit. Zs = Ze + R1+R2.",
  },
  {
    question: 'Which Zs do I record on the schedule of test results?',
    answer:
      'The Zs at the FURTHEST point on the circuit — the worst-case loop impedance for that circuit. If you test at every accessory and they all pass, the highest reading is the one to record. Record the value as measured (no temperature correction applied — the schedule documents the raw reading, the inspector applies the 0.8 multiplier when judging compliance against Table 41.3).',
  },
  {
    question: 'Can I just calculate Zs from Ze + R1+R2 instead of live testing?',
    answer:
      'BS 7671 requires the live Zs measurement as part of Reg 643.7.3 verification — the calculation from dead-test values is corroborative, not a replacement. Live measurement catches issues the dead test misses (parallel earth paths, hidden joints, transient supply impedance variations). Both values on the STR provide the full audit trail. The live value is what the inspector compares against Table 41.3.',
  },
  {
    question: 'My measured Zs is HIGHER than my calculated Ze + R1+R2 — what gives?',
    answer:
      "Possible causes: instrument tolerance (typically ±5-10 % each, can compound), the live test was at a slightly different point than the dead test (e.g. a spur not previously tested), supply voltage was lower at live test time (lower supply voltage means slightly higher loop impedance reading), or there's a contributor that only appears under load (loose neutral termination, parallel CPC path that disconnects under fault current). Investigate if the discrepancy is greater than 20 %.",
  },
  {
    question: 'Why does the supply voltage affect Zs readings?',
    answer:
      'The Zs tester measures impedance by applying a known test current and measuring voltage drop, then computing Z = V/I. If the supply voltage drops momentarily during the test (because of high background load on the network), the test current may be slightly different than the instrument expects — leading to a small reading error. Modern testers compensate, but on weak rural supplies you may see Zs readings vary slightly between test cycles.',
  },
  {
    question: 'Does Zs vary throughout the day?',
    answer:
      'Yes, slightly. Supply voltage fluctuates with network demand — early morning and late evening peaks reduce voltage by a few volts, increasing apparent Zs by a few percent. For verification work this is within instrument tolerance and not material. For borderline-pass results worth retesting at a different time of day to confirm. For commissioning, test under normal supply conditions and document the reading.',
  },
];

export default function Lesson317E_3_7() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The deeper Zs methodology — when to use no-trip / low-current mode vs full trip-current
        mode, the GN3 touch-voltage safety guidance during EFLI tests, instrument range and
        resolution per BS EN 61557-3, fused leads, and the practical board test sequence.
      </p>

      <TLDR
        points={[
          "No-trip / low-current mode injects under 15 mA peak (below the 30 mA RCD threshold) and uses DC bias / fast pulse techniques to avoid tripping the RCD. Slightly less accurate (plus or minus 10 percent) but doesn't interrupt the supply.",
          'Full trip-current mode injects 10-25 A briefly, gives best accuracy (plus or minus 5 percent), but trips RCDs. Use selectively on borderline readings after preparing for the trip.',
          'GN3 warns of touch-voltage on earthed metalwork during EFLI tests — I_test x R_CPC briefly raises exposed-conductive-parts above true earth. Manage access during testing in public / commercial spaces.',
          'BS EN 61557-3 governs loop impedance testers. Verify instrument range matches expected Zs (low range for TN, high range for TT), and check fused leads (typically 7 A or 10 A) before testing.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Distinguish no-trip / low-current Zs mode from full trip-current Zs mode and select appropriately for the protective device upstream.',
          'Apply GN3 safety guidance on touch-voltage appearing on earthed metalwork during EFLI tests — manage access in public spaces.',
          'Verify instrument range and resolution per BS EN 61557-3 before commencing Zs tests on TT or extended TN systems.',
          'Identify the correct fuse rating for loop-impedance test leads (typically 7 A or 10 A) and check leads before each test session.',
          'Apply the standard board test sequence — Ze first, then each circuit at the furthest point in label / RCD-group order.',
          'Compare measured Zs against A4:2026 Table 41.3 limits using the 0.8 multiplier (e.g. Type B 32 A: 1.37 Omega table, 1.10 Omega measured).',
          'Investigate borderline and failing Zs readings methodically — verify Ze, R1+R2, route length, CPC size, parallel paths.',
          'Select between 3-lead and 2-lead measurement methods based on test point access and the data required (PFC vs PEFC).',
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
            <strong>No-trip / low-current mode.</strong> Test current limited to under 15 mA peak.
            Often combined with a brief DC bias to suppress AC RCD sensing during the pulse, or a
            fast pulse shorter than the RCD’s response time. Reading accuracy typically plus or
            minus 10 percent. RCD stays in. Supply not interrupted. Customer doesn’t notice
            anything.
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
            <strong>Borderline result on RCD-protected circuit:</strong> Retest in full trip mode
            after preparing — switch off sensitive loads, brief customer, be ready to reset.
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
            exposed-conductive-part connected to that CPC briefly rises above true earth by that
            voltage. For a 25 A test current and a 0.4 Omega CPC, that’s 10 V — small but real.
            In domestic single-occupier work the risk is low because you control access. In
            commercial / public installations (shop floors, schools, hospitals) you may need to
            physically restrict access during testing — barriers, signage, an assistant.
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
        plainEnglish="During a Zs test, current flows briefly through the CPC. That current creates a voltage drop along the CPC, which means every exposed-conductive-part connected to the CPC briefly rises above true earth by that voltage. It’s the same physics as a real earth fault — but at instrument-controlled current and for a few milliseconds. Small voltage, brief duration — but real."
        onSite="On a domestic install you typically control who’s in the room. On a commercial install with the public around (a school corridor, a hospital ward, a shop floor), you may need to physically restrict access to the test area. The right answer depends on the test current, the CPC resistance, and who can touch the metalwork during the test."
      >
        <p>The math behind the touch-voltage:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Touch-voltage = I_test x R_CPC.</strong> For a 25 A full-mode test on a 0.4
            Omega CPC = 10 V. For a 15 mA no-trip test on the same CPC = 0.006 V (negligible).
          </li>
          <li>
            <strong>Duration = a few milliseconds to a few cycles.</strong> Modern MFTs limit the
            test pulse to minimise hazard duration.
          </li>
          <li>
            <strong>Perception threshold for AC at 50 Hz.</strong> Typically 1-5 V through wet
            skin; 5-15 V through dry skin. Below threshold = no shock. At threshold = a tingle.
            Above threshold = potentially a sustained contact.
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
            <strong>Domestic single-occupier:</strong> Brief the customer, ask them to stay clear
            of metalwork during testing, proceed.
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
        plainEnglish="BS EN 61557-3 is the international standard for loop impedance testers. An instrument conforming to this standard meets specified safety, performance and accuracy requirements — verified by the manufacturer’s declaration of conformity. UK MFTs from reputable brands (Megger, Fluke, Kewtech, Metrel) all conform. The standard is what underpins the trust we put in test readings."
        onSite="When buying or specifying a Zs tester, look for BS EN 61557-3 conformance on the datasheet. When the firm’s certification software pre-fills the instrument record, the certificate cites the instrument identifier; the conformance is implicit but worth verifying once for each instrument in the firm’s register."
      >
        <p>What BS EN 61557-3 covers:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Measurement range.</strong> The instrument must be capable of measuring loop
            impedance across the range relevant to the application — typically 0-200 Omega for
            general use, with sub-ohm resolution at the low end and ohm-level resolution at the
            high end.
          </li>
          <li>
            <strong>Accuracy bands.</strong> The instrument must meet declared accuracy tolerances
            across its measurement range — typically plus or minus 5 percent in full mode, plus or
            minus 10 percent in no-trip mode.
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
            percent. Display shows 1.082 Omega. True value could be 0.866-1.298 Omega. The three
            decimal places are misleading — actual uncertainty is huge.
          </li>
          <li>
            <strong>Instrument B:</strong> Resolution 0.1 Omega, accuracy plus or minus 5 percent.
            Display shows 1.1 Omega. True value 1.045-1.155 Omega. Lower resolution but the
            reading is trustworthy within a tighter band.
          </li>
          <li>
            <strong>Instrument C (modern MFT):</strong> Resolution 0.01 Omega, accuracy plus or
            minus 5 percent. Display shows 1.08 Omega. True value 1.026-1.134 Omega. Good
            resolution AND good accuracy — what you want.
          </li>
        </ul>
        <p>
          For borderline readings (within 10 percent of the limit), the accuracy band matters
          most. A reading of 1.05 Omega on a 1.10 Omega limit looks like a 5 percent margin — but
          with plus or minus 10 percent accuracy the true value could be 0.945-1.155 Omega.
          That’s the practical reason to retest borderline readings in full trip mode (typically
          tighter accuracy) or to investigate the underlying installation.
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
        clause="When performing loop impedance measurements, inspectors shall ensure the instrument’s measurement range includes the expected Zs values; otherwise readings may be inaccurate. Confirm instrument range before carrying out loop impedance tests. The resolution of an instrument is the smallest increment that the instrument can detect and display."
        meaning={
          <>
            GN3 puts the duty on the inspector to verify instrument range matches the expected Zs
            before testing. On TT installations with expected Zs of 50-200 Omega, the meter must
            be set to (or auto-range into) the high range. On TN with expected Zs under 2 Omega,
            the low range is appropriate. Resolution (smallest displayed increment) and accuracy
            (tolerance band) are independently specified — both matter for trustworthy readings.
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
            during normal testing. GN3 specifies typical 7 A or 10 A as adequate ratings — high
            enough to handle the 10-25 A test current pulse, low enough to clear in genuine fault
            conditions. Lead fuses are a maintenance item — check on each visit and carry spares.
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
            <strong>Check on each visit.</strong> Visual inspection of the leads, continuity check
            on the meter’s own continuity range against a known low resistance (proves lead +
            fuse intact).
          </li>
          <li>
            <strong>Carry spares.</strong> Lead fuses are cheap and a spare set lives in the MFT
            case. Replacing in field is a 30-second job.
          </li>
          <li>
            <strong>Don’t over-fuse.</strong> Fitting a 16 A fuse "to make the leads more robust"
            defeats the protection. Stay within the specified rating range.
          </li>
          <li>
            <strong>Specific instrument types:</strong> Some MFTs have internal fuses too
            (separate from the lead fuses). Manufacturer manual lists internal fuse positions and
            ratings.
          </li>
        </ul>
      </ConceptBlock>

      <VideoCard {...videos.zeTest} topic="Ze test on a single-phase supply" />

      <SectionRule />

      <ContentEyebrow>The board test sequence — practical order</ContentEyebrow>

      <ConceptBlock
        title="Standard order — Ze first, then circuits in turn"
        plainEnglish="There’s a standard order to live Zs verification across a board. Ze at the supply origin first — establishes the supply impedance baseline. Then each circuit at its furthest point in label / RCD-group order. Borderline / failing readings investigated before moving on. The order isn’t arbitrary — it gives you the data in the sequence that lets you sanity-check each reading as you go."
        onSite={`Walk into the board, set up the MFT, take Ze. Note it on the schedule. Then circuit by circuit. Modern certification software has a "next circuit" workflow that prompts each test in order — useful but not a substitute for understanding why the order matters.`}
      >
        <p>The standard sequence in detail:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Verify the board is energised, all protective devices closed.</strong>
            Take supply voltage reading L-N at the main switch — note alongside Ze. Should be in
            the 216-253 V range for UK 230 V supply.
          </li>
          <li>
            <strong>Ze at the supply origin.</strong> 3-lead Zs at the incoming meter tails or the
            main switch. Reading is the supplier’s loop impedance from the test point back to the
            transformer. Typically 0.1-0.35 Omega for TN-C-S, 0.2-0.5 Omega for TN-S, 30-200+
            Omega for TT.
          </li>
          <li>
            <strong>For each circuit, in label order.</strong> Test at the furthest point from the
            CU. Use no-trip mode if RCD-protected. Note Zs against the circuit identification on
            the schedule.
          </li>
          <li>
            <strong>Sanity check each reading.</strong> Calculated Zs from dead-test = Ze + R1+R2.
            Measured should agree within plus or minus 10-20 percent. Discrepancy above 20 percent
            — investigate before moving on.
          </li>
          <li>
            <strong>Borderline readings — retest in full trip mode.</strong> After preparing
            (switch off sensitive loads, brief customer, be ready to reset). Compare the two
            readings; the full mode gives the higher-confidence answer.
          </li>
          <li>
            <strong>Failing readings — investigate.</strong> Check terminations, route length, CPC
            size, parallel paths. Don’t proceed past a failing circuit without addressing it.
          </li>
          <li>
            <strong>Compile readings on the Schedule of Test Results.</strong> Each circuit’s Zs
            against its row, with the protective device and the Table 41.3 limit alongside for
            cross-check.
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
            <strong>From dead testing:</strong> R1+R2 measured at the test point. Add Ze from the
            supply origin reading. Result is the calculated Zs(calc).
          </li>
          <li>
            <strong>From live testing:</strong> Zs measured at the test point. Result is Zs(meas).
          </li>
          <li>
            <strong>Compare.</strong> Difference = abs(Zs(meas) - Zs(calc)) / Zs(calc) x 100
            percent.
          </li>
          <li>
            <strong>Within plus or minus 10 percent:</strong> Excellent agreement. Both readings
            trustworthy.
          </li>
          <li>
            <strong>10-20 percent difference:</strong> Within combined instrument tolerance. Note
            but acceptable.
          </li>
          <li>
            <strong>Above 20 percent:</strong> Investigate. Possible causes — instrument range
            issue, bad termination dropping out under load, parallel earth path, supply voltage
            variation, real installation defect. Don't proceed past the discrepancy without
            addressing it.
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
            <strong>Table 41.3 limit.</strong> Maximum Zs from the table for the device, with 0.8
            multiplier applied for measured comparison.
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
        title="Using full trip-current mode on every circuit and tripping the customer’s freezer"
        whatHappens={
          <>
            You’re testing a domestic with all-RCBO consumer unit. Forgot to switch the MFT to
            no-trip mode. Press TEST on the kitchen ring — RCBO trips, freezer goes off. You
            don’t notice (you’re still working through the schedule). Two days later customer
            phones in: "all the food has spoiled". Firm pays for the food replacement plus an
            awkward apology. The reading you took during the trip is also invalid because the
            supply was interrupted.
          </>
        }
        doInstead={
          <>
            Set the MFT to no-trip mode at the start of every domestic / commercial RCBO-board
            visit. Make it a habit before connecting the leads. Most modern MFTs let you set a
            default that persists between sessions — set it once and forget. Reserve full trip
            mode for non-RCD circuits (older split-load boards) or for borderline confirmation
            after preparing the customer.
          </>
        }
      />

      <CommonMistake
        title="Testing without verifying the instrument range"
        whatHappens={
          <>
            Old habit — auto-range MFT, never thought about range. You’re asked to test a TT
            installation with expected Zs in the 50-200 Omega range. Auto-range works fine on TN
            values (under 2 Omega) but on a manual-range instrument set to the low range, the TT
            reading saturates or reads inaccurately. You record "0 Omega" or "out of range" and
            don’t know why. Time wasted; results unusable. Worst case — instrument damaged if
            test current exceeds the low-range capacity.
          </>
        }
        doInstead={
          <>
            Before testing, mentally estimate the expected Zs based on the earthing system —
            TN-C-S 0.3-1.0 Omega, TN-S 0.2-1.0 Omega, TT 30-200+ Omega. Set the meter range
            accordingly (or verify auto-range will handle it). Per GN3, instrument range awareness
            is part of competent practice — not just a manufacturer concern.
          </>
        }
      />

      <Scenario
        title="Live Zs verification across an all-RCBO domestic CU — Megger MFT1741+"
        situation={
          <>
            3-bed semi in Reading, 12-way all-RCBO consumer unit, ten radial / ring circuits
            including kitchen ring, kitchen lights, upstairs sockets, downstairs sockets, upstairs
            lights, downstairs lights, EV charger 32 A radial in driveway, immersion, cooker,
            smoke alarm. TN-C-S supply, dead testing complete with Ze = 0.32 Omega and circuit
            R1+R2 values recorded. Customer at home, two children at school, dog in the kitchen.
          </>
        }
        whatToDo={
          <>
            Brief the customer first — "I’ll be doing live tests for about an hour. The supply
            will be on throughout. Can you keep the dog away from the kitchen metalwork (sink,
            taps, washing machine) for the next hour? If anything goes off briefly that’s normal
            — I’ll get to it." Set the MFT1741+ to Zs no-trip mode, BS EN 61557-3 conformance
            verified on the meter case, last calibration 2025-09-12 (within 12 months). Lead fuses
            checked — both 10 A, intact. Test Ze at the main switch: 0.32 Omega — agrees with dead
            test. Note. Move through the circuits in order: kitchen ring 0.62 Omega (calc 0.60
            Omega, agrees, well within Type B 32 A measured limit 1.10 Omega), kitchen lights 1.32
            Omega (Type B 6 A limit 5.83 Omega, comfortable pass), upstairs sockets 0.85 Omega
            (Type B 16 A limit 2.19 Omega, pass), downstairs sockets 0.78 Omega (pass), upstairs
            lights 1.42 Omega (Type B 6 A pass), downstairs lights 1.18 Omega (pass), immersion
            0.65 Omega (Type B 20 A limit 1.75 Omega, pass), cooker 0.58 Omega (Type B 32 A pass),
            smoke alarm 1.85 Omega (Type B 6 A pass). EV charger 32 A radial in driveway — Zs =
            1.08 Omega, very close to 1.10 Omega measured limit (Type B 32 A, 1.37 Omega table).
            Borderline. Brief the customer: "I want to retest the EV charger circuit more
            accurately, that will briefly trip the breaker, OK?". Customer agrees. Switch MFT to
            full trip-current mode, run the test — EV charger trips, reading 1.05 Omega in full
            mode (agreement within 3 percent with no-trip). Reset the EV charger RCBO.
            Investigate: cable route is 22 m of 6 mm with 6 mm CPC. GN3 Table B1 expected R1+R2 =
            22 x (3.08 + 3.08) mOhm/m = 0.135 Omega. Add Ze 0.32 = expected Zs 0.46 Omega.
            Measured 1.05 Omega is more than double expected. Investigate terminations: open the
            EV charger isolator, inspect the supply terminals — find a marginal screw-clamp on the
            CPC. Re-make with proper torque, retest Zs = 0.52 Omega. Comfortable pass. Document
            everything: Zs per circuit on the Schedule of Test Results, Megger MFT1741+ serial
            number and calibration date, no-trip mode noted for the standard tests, full trip mode
            noted for the EV charger confirmation, the EV charger remediation with before / after
            readings. Move on to the RCD trip-time tests.
          </>
        }
        whyItMatters={
          <>
            The sequence demonstrates the discipline. No-trip default for routine; full trip for
            borderline confirmation; investigation for unexpected results; remediation with
            documentation. Every reading sanity-checked against the dead-test expectation.
            Instrument range and calibration verified up front. Customer briefed on what to
            expect. The EV charger marginal pass became a finding-and-fix that eliminated a latent
            failure. Without the live test, the dead-test calculation would have looked fine;
            without the borderline confirmation in full mode, the latent failure would have
            shipped to the customer as a minor pass.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'No-trip / low-current mode (under 15 mA peak) is the default for RCD-protected circuits. Full trip-current mode (10-25 A) is for non-RCD circuits or borderline confirmation after preparing for the trip.',
          'GN3 warns of touch-voltage on earthed metalwork during EFLI tests — I_test x R_CPC briefly raises ECPs above true earth. Manage access in commercial / public installations.',
          'BS EN 61557-3 conformance underpins instrument trust. Verify range matches expected Zs (low for TN, high for TT) and check calibration is current.',
          "Resolution and accuracy are different — modern MFTs achieve both (typically 0.01 Omega resolution, plus or minus 5-10 percent accuracy). Don't over-trust precise-looking readings on a poorly-specified instrument.",
          "Lead fuses (typically 7 A or 10 A) are a maintenance item. Check on each visit; carry spares; don't over-fuse.",
          'Standard board sequence: Ze first, then each circuit at the furthest point in label / RCD-group order. Sanity-check each reading against Ze + R1+R2 from dead testing.',
          'A4:2026 Table 41.3 max Zs for Type B 32 A = 1.37 Omega table, 1.10 Omega measured. Carry the corrected limits in your head — B6 5.83, B16 2.19, B32 1.10.',
          "Borderline readings warrant retest in full trip mode for confirmation. Failing readings warrant investigation — terminations, route length, CPC size, parallel paths. Don't proceed past a failing circuit.",
        ]}
      />

      <Quiz title="Zs measurement — methods and techniques" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Live earth fault loop impedance per Reg 643.7.3. Three-lead (L-N-E) and two-lead (L-E)
        methods, no-trip RCD modes, A4:2026 Table 41.3 comparison with the 0.8 multiplier, and the
        full earth fault loop traced for TN-C-S, TN-S and TT systems.
      </p>

      <TLDR
        points={[
          "Reg 643.7.3 mandates live Zs verification at the supply origin (Ze) and at every circuit's furthest point.",
          '3-lead method: probes connect to L, N, E. Tester measures L-N and L-E loops separately, computes Zs. 2-lead method: just L-E, simpler and faster.',
          'On RCD-protected circuits, use no-trip / low-current Zs mode to avoid tripping the RCD during the test. Slightly less accurate but avoids nuisance trips.',
          'Compare measured Zs against A4:2026 Table 41.3 limits using the 0.8 multiplier. For Type B 32 A: 1.37 Ω table limit, 1.10 Ω measured limit at ambient temperature.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Trace the earth fault loop path for TN-C-S, TN-S and TT installations and identify the impedance components.',
          'Describe the 3-lead and 2-lead live Zs measurement methods and select appropriately for the test point access.',
          'Use no-trip / low-current Zs modes on RCD-protected circuits to avoid nuisance tripping during verification.',
          'Apply the 0.8 measured-vs-table multiplier when comparing measured Zs against A4:2026 Table 41.3 limits.',
          'Identify discrepancies between calculated Zs (Ze + R1+R2 from dead testing) and measured Zs and investigate the cause.',
          'Apply GN3 safety guidance on EFLI tests — manage access to exposed conductive parts during testing.',
          'Record Zs at the furthest point of each circuit on the Schedule of Test Results.',
        ]}
        initialVisibleCount={4}
      />

      <ContentEyebrow>The earth fault loop — what Zs is measuring</ContentEyebrow>

      <ConceptBlock
        title="Trace the loop from fault back to source"
        plainEnglish="When line touches an exposed-conductive-part (a fault), current flows from the line conductor, through the fault, into the metalwork, through the CPC back to the MET, then via the supplier's earth path back to the supply transformer's star point, and back via the supply line to where it started. Zs is the total impedance of that loop. Low Zs = high fault current = fast disconnection by the protective device."
        onSite="Picture the loop physically. On a TN-C-S domestic install: faulted appliance casing → CPC up the wall → CPC of the radial back to the CU's earth bar → main earthing conductor down to the MET → out through the consumer's neutral-earth bond → back along the supplier's combined PEN conductor in the service cable to the cut-out → up the service cable to the substation transformer → through one secondary winding → and back via the live core of the service cable into the consumer's CU. That whole loop has impedance — that's Zs."
      >
        <p>The earth fault loop components by earthing system:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>TN-C-S (PME / PNB):</strong> Loop = transformer secondary → service cable line
            → consumer line (R1) → fault → CPC (R2) → MET → consumer’s neutral-earth bond →
            supplier’s combined PEN → transformer star point. Ze typically 0.10-0.35 Ω; total Zs
            typically 0.3-1.0 Ω for short circuits.
          </li>
          <li>
            <strong>TN-S:</strong> Loop = transformer secondary → service cable line → consumer
            line (R1) → fault → CPC (R2) → MET → supplier’s separate earth conductor (typically
            the cable sheath) → transformer earth → star point. Ze typically 0.20-0.50 Ω.
          </li>
          <li>
            <strong>TT:</strong> Loop = transformer secondary → service cable line → consumer line
            (R1) → fault → CPC (R2) → MET → consumer’s earth electrode → soil mass → supplier’s
            transformer earth electrode → transformer earth → star point. The soil impedance
            dominates — Ze ≈ Ra, typically 30-200+ Ω.
          </li>
        </ul>
        <p>
          For TN systems, Zs values fit comfortably within Table 41.3 limits and overcurrent
          devices (MCBs / fuses / RCBOs) provide ADS via overcurrent disconnection. For TT, Zs is
          far too high for overcurrent ADS — RCDs are required (verified by Ra × IΔn ≤ 50 V from
          the earth electrode resistance test, plus the live RCD trip-time test).
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.7.1 (Verification of ADS by Zs measurement) and Table 41.3 (Maximum Zs values). The 0.8 multiplier is IET GN3 guidance, not a BS 7671 regulation."
        clause={`BS 7671 Reg 643.7.1: The verification of the effectiveness of the measures for fault protection by automatic disconnection of supply is effected as follows — (a) TN system: Compliance with Regulation 411.4 shall be verified by (i) measurement of the earth fault loop impedance (see Regulation 643.7.3); (ii) verification of the characteristics and/or the effectiveness of the associated protective device. Table 41.3 lists the maximum measured Zs values that satisfy Regulation 411.4 disconnection times for the listed protective devices.

IET GN3 guidance (separate from BS 7671): A practical "rule of thumb" of Zs(measured) ≤ 0.8 × Zs(table) is commonly applied on site to allow for the difference between the cable conductor temperature at test (ambient) and the 70 °C operating temperature assumed by the Table 41.3 values. This 0.8 factor is GUIDANCE, not a BS 7671 regulation — the strict regulatory comparison is against Table 41.3 with temperature correction per GN3 Appendix B.`}
        meaning={
          <>
            Live Zs verification per circuit, compared against Table 41.3. Two distinct things in
            the same RegsCallout: <strong>(1) the regulation</strong> (Reg 643.7.1 + Table 41.3)
            sets the duty — measure Zs, confirm it satisfies Regulation 411.4 via Table 41.3.{' '}
            <strong>(2) the 0.8 multiplier</strong> is GN3 guidance, NOT BS 7671 — Table 41.3
            values assume conductors at 70 °C operating temperature while measured Zs is taken at
            ambient (typically 15–25 °C), and 0.8 is a practical correction. For rigorous
            correction use GN3 Appendix B per-degree coefficients.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.7.1 and Table 41.3. The 0.8 multiplier is IET Guidance Note 3 guidance, not a BS 7671 regulation."
      />

      <EarthingSystemDiagram />

      <SectionRule />

      <ContentEyebrow>The 3-lead method — L, N, E at the test point</ContentEyebrow>

      <ConceptBlock
        title="Three probes — L, N, E — and a dual-loop measurement"
        plainEnglish="The 3-lead Zs test connects three probes to the test point: one to line (live), one to neutral, one to earth. The instrument briefly applies a known test current via the L-N loop and measures the voltage drop, then via the L-E loop. Both readings inform the Zs computation, and the L-N measurement supports noise rejection and helps distinguish supply impedance from consumer cabling impedance."
        onSite="The 3-lead method gives the most accurate Zs reading on a properly accessible test point. Most MFTs (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) default to 3-lead when all three terminals are connected."
      >
        <p>3-lead Zs test setup and procedure:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>Verify the circuit is energised and the protective device is closed.</li>
          <li>
            Select Zs mode on the MFT. For RCD-protected circuits, select no-trip / low- current
            mode (typically 15 mA pulse limit).
          </li>
          <li>
            Connect the three test leads to L, N and E at the test point — for a socket, use a
            socket adapter; for a fixed appliance with no socket, connect via the accessible
            terminals at the appliance.
          </li>
          <li>
            Press TEST. The instrument briefly draws current via L-N and via L-E, computes loop
            impedances, and displays Zs. Some testers also display the separate L-N (Zs(L-N)) and
            L-E (Zs(L-E)) readings.
          </li>
          <li>
            Note the Zs reading. Sanity-check against the calculated Ze + R1+R2 from the dead-test
            phase — should agree within instrument tolerance (±10 %).
          </li>
          <li>
            Compare against Table 41.3 limit for the protective device using the 0.8 multiplier.
            For Type B 32 A, max Zs = 1.37 Ω, corrected = 1.10 Ω.
          </li>
          <li>Record on the Schedule of Test Results in the Zs column.</li>
        </ol>
        <p>
          <strong>3-lead method advantages:</strong>
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            More accurate than 2-lead — the auxiliary L-N measurement provides reference for noise
            rejection.
          </li>
          <li>
            Some testers use the L-N reading to give better RCD avoidance (the L-N measurement
            doesn’t involve the CPC so doesn’t risk RCD trip).
          </li>
          <li>
            Supports both PFC (prospective fault current) calculation from L-N and PEFC
            (prospective earth fault current) from L-E in the same test cycle.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The 2-lead method — L and E only</ContentEyebrow>

      <ConceptBlock
        title="Two probes — quicker, simpler, used when N is not accessible"
        plainEnglish="The 2-lead Zs test uses just two probes — L and E at the test point. The instrument draws test current via the L-E loop and computes impedance directly. Faster than 3-lead because there's no auxiliary L-N measurement, and useful where the neutral isn't easily accessible (e.g. testing at a fixed appliance, a junction box, or any termination with only L and E available)."
        onSite="On a fixed appliance like a built-in oven, the connection unit may give you access to L and E but not directly to N (which loops through the appliance internals). 2-lead Zs at the connection unit is the practical answer."
      >
        <p>2-lead Zs test setup and procedure:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>Verify the circuit is energised.</li>
          <li>
            Select Zs mode on the MFT, 2-lead variant if your meter has it (some use a "PSCC /
            PEFC" mode that takes a single L-E reading).
          </li>
          <li>Connect the two test leads to L and E at the test point.</li>
          <li>Press TEST. Reading is Zs directly.</li>
          <li>
            Note the reading, sanity-check against calculated Zs from the dead-test phase, compare
            against Table 41.3 with the 0.8 multiplier.
          </li>
          <li>Record on the Schedule of Test Results.</li>
        </ol>
        <p>
          <strong>2-lead method considerations:</strong>
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            Slightly less accurate than 3-lead (no L-N reference, fewer noise rejection options).
          </li>
          <li>
            Works where neutral is inaccessible — fixed appliances, junction boxes, lighting
            circuits at switches (where only the switched line and earth may be directly
            reachable).
          </li>
          <li>
            Cannot give PFC (line-neutral fault current) — only PEFC (line-earth fault current).
            For full PFC verification you need 3-lead or a separate L-N measurement.
          </li>
          <li>Compatible with no-trip / low-current modes on most MFTs.</li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>RCD avoidance — no-trip and low-current modes</ContentEyebrow>

      <ConceptBlock
        title="Don't trip the RCD during the Zs test"
        plainEnglish="A standard high-current Zs test injects 10-25 A of test current via the L-E loop for a few cycles. On an RCD-protected circuit, that test current looks exactly like a fault — the RCD trips, interrupting other circuits on the same RCD. No-trip / low-current modes inject much smaller currents (typically under 15 mA) that stay below the 30 mA RCD trip threshold, allowing the test without tripping."
        onSite="Always check what RCD protection is upstream of the test point BEFORE pressing TEST. On a domestic CU with all-RCBO, every circuit is RCD-protected — always use no-trip mode. On an older split-load board, only the RCD-side circuits need no-trip."
      >
        <p>How modern MFTs avoid tripping the RCD during Zs testing:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Low-current pulse.</strong> The instrument limits the test current peak to
            below the RCD’s trip threshold — typically 15 mA peak for a 30 mA RCD. The tester
            compensates for the small current by averaging over multiple cycles or using more
            sensitive voltage detection.
          </li>
          <li>
            <strong>DC bias technique.</strong> The instrument briefly applies a small DC offset
            to the test current. AC RCDs (Type AC) cannot detect DC residual current, so the brief
            DC bias suppresses the RCD’s sensing during the test pulse.
          </li>
          <li>
            <strong>Fast pulse.</strong> The test current pulse is shorter than the RCD’s
            response time, allowing the measurement before the RCD has time to react.
          </li>
        </ul>
        <p>
          <strong>When to use which mode:</strong>
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>No-trip / low-current:</strong> Always on RCD-protected circuits. Default for
            modern domestic installations (all-RCBO boards, RCD-protected sockets).
          </li>
          <li>
            <strong>Standard / high-current:</strong> Acceptable on circuits NOT protected by an
            RCD (e.g. lighting circuits in older non-RCD boards, fixed appliances on non-RCD
            circuits). Higher accuracy than low-current mode.
          </li>
        </ul>
        <p>
          <strong>Caveat:</strong> some older RCDs (Type AC, lower sensitivity) trip on even
          no-trip mode test currents because their response is faster than expected or their
          threshold drift has reduced their nominal trip current. If a no-trip mode test trips the
          RCD, switch off, reset, and try testing further upstream where RCD protection doesn’t
          apply (or accept the trip and reset between tests).
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Comparing measured Zs against Table 41.3</ContentEyebrow>

      <ConceptBlock
        title="The 0.8 multiplier — measured-vs-table compliance"
        plainEnglish="A4:2026 Table 41.3 lists maximum Zs values for each protective device type and rating, assuming conductor temperature of 70 °C (PVC operating temperature). Your measured Zs is at ambient (15-25 °C typically). Cable resistance rises with temperature — about 20 % from 20 °C to 70 °C for copper. The standard correction: measured Zs ≤ 0.8 × table Zs."
        onSite="Carry the 0.8 multiplier table in your head for common device ratings. Type B 32 A: table 1.37 Ω, measured 1.10 Ω. Type B 16 A: table 2.74 Ω, measured 2.19 Ω. Type B 6 A: table 7.28 Ω, measured 5.83 Ω. The numbers come up over and over — knowing them by heart speeds up site work."
      >
        <p>
          A4:2026 Table 41.3 summary (max Zs values for typical Type B devices, with 0.8 measured
          limit):
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Type B 6 A:</strong> Table = 7.28 Ω, measured limit = 5.83 Ω.
          </li>
          <li>
            <strong>Type B 10 A:</strong> Table = 4.37 Ω, measured limit = 3.50 Ω.
          </li>
          <li>
            <strong>Type B 16 A:</strong> Table = 2.74 Ω, measured limit = 2.19 Ω.
          </li>
          <li>
            <strong>Type B 20 A:</strong> Table = 2.19 Ω, measured limit = 1.75 Ω.
          </li>
          <li>
            <strong>Type B 32 A:</strong> Table = 1.37 Ω, measured limit = 1.10 Ω.
          </li>
          <li>
            <strong>Type B 40 A:</strong> Table = 1.09 Ω, measured limit = 0.87 Ω.
          </li>
        </ul>
        <p>
          <strong>For Type C devices,</strong> the magnetic trip threshold is higher (5-10 × In
          rather than 3-5 × In), so Table 41.3 limits are roughly half the Type B values. For
          example Type C 32 A max Zs = 0.69 Ω table, 0.55 Ω measured — much tighter than Type B.
        </p>
        <p>
          <strong>For Type D devices</strong> (motor protection, very high inrush devices), limits
          are tighter still — Type D 32 A max Zs ≈ 0.34 Ω. Always check the actual Table 41.3 row
          for the device installed.
        </p>
        <p>
          <strong>Beyond the 0.8 multiplier:</strong> for full rigour, GN3 Appendix B gives
          per-degree temperature coefficients. For copper: Rcorrected = Rmeasured × (1 + α × (T_op
          - T_measured)) where α ≈ 0.004 / °C. For ambient = 20 °C and operating = 70 °C:
          correction = (1 + 0.004 × 50) = 1.20. So measured Zs × 1.20 should be ≤ table Zs —
          equivalent to measured ≤ table / 1.20 = table × 0.833. The 0.8 multiplier rounds this
          down for safety margin.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <ConceptBlock
        title="Measuring Ze at the origin — disconnect the consumer's earth, test back to source"
        plainEnglish="Ze is the impedance of everything OUTSIDE the consumer's installation — supplier service cable, transformer, supplier earth path. To measure it cleanly you have to break the consumer's contribution by lifting the main earthing conductor at the MET, isolate the consumer's main switch, and then take a Zs reading at the origin between the L terminal and the consumer's earth bar. What you read is Ze alone."
        onSite="The Ze test is the keystone live test. Get Ze right and every circuit's Zs has a solid foundation. Get it wrong and every Zs that follows inherits the error. Booked time: 10 minutes if access to the MET is straightforward, longer if the bond is taped and clamped down behind a CU."
      >
        <p>Ze test procedure (TN systems):</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            Verify safe isolation. Lock off the main switch at the consumer's CU. Prove dead at
            the L-N and L-E terminals on the consumer side using a proving unit (Martindale
            VI-13800 or equivalent).
          </li>
          <li>
            Disconnect the main earthing conductor from the MET. On TN-C-S the consumer's earth
            and neutral are bonded at the cut-out — disconnecting the main earthing conductor
            breaks the consumer's contribution to the loop without affecting the supplier's PEN.
          </li>
          <li>
            Re-energise the main switch. The consumer's earth bar is now isolated from the
            supplier earth (consumer side disconnected at the MET). The L-E loop the meter sees is
            the supplier's path alone — Ze.
          </li>
          <li>
            Connect the MFT in Zs mode (no-trip if any RCD is upstream of the test point — usually
            not on the line side of the main switch). Measure between the L terminal of the
            cut-out (or main switch input) and the disconnected end of the main earthing
            conductor.
          </li>
          <li>
            Press TEST. Reading is Ze. Typical values: TN-C-S 0.10-0.35 Ω, TN-S 0.20-0.50 Ω.
          </li>
          <li>
            Isolate, re-make the MET termination, lock off, prove dead one more time, re-energise,
            and proceed to circuit Zs tests.
          </li>
        </ol>
        <p>
          <strong>TT installations:</strong> Ze on TT is dominated by Ra (the consumer's earth
          electrode resistance to soil). Disconnecting the main earthing conductor and measuring
          L-E at the origin reads Ra plus the supplier's path — but on TT the supplier's metallic
          earth path is absent, so Ze ≈ Ra. Typical TT Ze: 30-200+ Ω depending on soil moisture
          and electrode design (the lesson on the dead-test sequence covers the dedicated Ra
          test).
        </p>
        <p>
          <strong>Sanity check:</strong> If Ze comes back implausibly low (under 0.05 Ω) on a
          domestic TN-C-S install, suspect the main earthing conductor was not actually
          disconnected — the meter is reading R1+R2 of the consumer side in parallel. Re-check the
          disconnect, repeat the test.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="PFC, PSCC and PEFC — what they mean and where each is measured"
        plainEnglish="Three different prospective fault currents you might see on test reports and the EIC. PFC (Prospective Fault Current) = generic term, often the higher of the two. PSCC (Prospective Short-Circuit Current) = L-N fault, between phase and neutral. PEFC (Prospective Earth Fault Current) = L-E fault, between phase and earth. Per Reg 643.7.3.201 these must be measured, calculated or determined at origin and other relevant points."
        onSite="On a 3-lead Zs tester you'll often see all three displayed: Zs(L-N), Zs(L-E), PSCC, PEFC. The breaking capacity of every protective device must be ≥ the prospective fault current at that point (Reg 434.5.1). PSCC is usually the higher of the two on TN-C-S because the L-N loop has lower impedance than L-E. Document the higher value as PFC on the EIC."
      >
        <p>Each parameter and its use:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>PSCC (Prospective Short-Circuit Current).</strong> = U0 / Z(L-N). The current
            that would flow in a bolted L-N fault at the test point. Drives breaking capacity
            selection for L-N fault clearance — typically the higher figure on TN-C-S because the
            consumer's neutral is bonded to the supplier's PEN at the cut-out, giving a
            low-impedance return.
          </li>
          <li>
            <strong>PEFC (Prospective Earth Fault Current).</strong> = U0 / Zs. The current that
            would flow in a bolted L-E fault at the test point. Drives the disconnection-time
            check — Zs must be low enough that the protective device clears within Table 41.1.
          </li>
          <li>
            <strong>PFC (Prospective Fault Current).</strong> The HIGHER of PSCC and PEFC,
            recorded on the EIC under "Particulars of the supply at the origin". This is what
            every protective device's breaking capacity must exceed (Reg 434.5.1).
          </li>
        </ul>
        <p>
          <strong>Typical UK domestic values at origin:</strong>
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>TN-C-S urban supply:</strong> PSCC 1.5-3.0 kA, PEFC 0.5-1.5 kA. PFC = PSCC
            (higher), document as 2-3 kA. Standard domestic MCBs (BS EN 60898) at 6 kA Icn cover
            this comfortably.
          </li>
          <li>
            <strong>TN-S older supply:</strong> PSCC 0.8-2.0 kA, PEFC 0.4-1.0 kA. PFC = PSCC.
          </li>
          <li>
            <strong>TT rural supply:</strong> PSCC 0.5-1.5 kA, PEFC very low (under 10 A typically
            — limited by Ra).
          </li>
          <li>
            <strong>Commercial three-phase 100 A service:</strong> PSCC up to 16 kA at the cut-out
            — standard domestic 6 kA MCBs would NOT meet 434.5.1 here, you need 10 kA Icn or
            higher devices.
          </li>
        </ul>
        <p>
          On the 3-lead MFT (Megger MFT1741+, Fluke 1664FC, Kewtech KT64+) the test cycle that
          delivers Zs also delivers PSCC and PEFC. Press TEST once, read all three. Document on
          the EIC and the Schedule of Test Results — the inspector verifying breaking capacity
          selection needs both PSCC and PEFC to confirm every device is correctly rated.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Diagnosing borderline and failing Zs results"
        plainEnglish="A Zs reading that's close to the limit (or fails) is a finding to investigate. The methodical approach: check the calculation chain (Ze, R1+R2, instrument tolerance), check the cable route, check terminations, check for unexpected parallel paths."
        onSite="Don't just retest hoping for a different number. Investigate. Most borderline-fail Zs results come from a longer cable run than expected, a loose terminal somewhere on the CPC, or an undersized CPC slipped into the install."
      >
        <p>Diagnostic checklist for borderline / failing Zs:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Verify the Ze.</strong> Re-test Ze at the supply origin. A high Ze propagates
            to every circuit Zs. Investigate causes — supplier earth path degradation, MET
            termination corrosion, missing or removed neutral-earth bond.
          </li>
          <li>
            <strong>Verify the R1+R2 from dead testing.</strong> Re-test R1+R2 at the same
            accessory. Compare against expected from cable size and route length (GN3 Table B1).
            High R1+R2 = poor termination, broken strand, undersized CPC.
          </li>
          <li>
            <strong>Check route length.</strong> The actual cable run may be longer than the
            design assumption. Walk the cable route, measure where possible.
          </li>
          <li>
            <strong>Check the CPC size.</strong> Is the cable as installed what was designed? A
            1.5 mm² CPC where 2.5 mm² was specified gives roughly 1.6 × the CPC resistance — could
            push a borderline circuit into fail.
          </li>
          <li>
            <strong>Look for resistance contributors.</strong> Loose terminals, corroded crimps,
            screw-terminal connections that have backed off, oxidised lug surfaces. Test
            continuity at every accessible termination on the circuit.
          </li>
          <li>
            <strong>Consider parallel earth paths.</strong> If R1+R2 from dead testing gave a low
            value via a parallel path (metal back-boxes touching earthed steel, etc.), the live Zs
            may be higher because the parallel path doesn’t carry full fault current as
            effectively. Re-do dead testing with R2-only wander method to isolate the cable CPC.
          </li>
          <li>
            <strong>If still failing</strong> after diagnostic, consider remedial action: upgrade
            CPC, install supplementary bonding, change the protective device to a
            higher-sensitivity RCD type, or in extreme cases re-cable the circuit.
          </li>
        </ol>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>What goes wrong on site</ContentEyebrow>

      <CommonMistake
        title="Using high-current Zs mode on an RCD-protected circuit and tripping the whole RCD"
        whatHappens={
          <>
            You’re testing a kitchen ring on a domestic install with an all-RCBO board. You
            forget to switch to no-trip mode, press TEST, and the RCBO trips. Two problems: (a)
            the test result is invalid because the supply was interrupted during the measurement;
            (b) you’ve just tripped the customer’s freezer, which they won’t notice until the
            next day when the food spoils. The customer is cross. The verification work has to be
            redone with the right mode anyway.
          </>
        }
        doInstead={
          <>
            Always check the RCD protection status BEFORE pressing TEST. On a domestic install
            with all-RCBO board, default to no-trip mode for every Zs test. Look at the device
            label or the schedule of inspections — if it’s an RCBO, RCD or AFDD-RCBO, no-trip
            mode is the right choice. Many MFTs have a setting that defaults to no-trip until you
            explicitly select high-current — set this once and forget. The slight accuracy loss of
            no-trip mode is far outweighed by not inconveniencing the customer.
          </>
        }
      />

      <Scenario
        title="Live Zs verification on a small office board — Fluke 1664FC"
        situation={
          <>
            Small office in Reading, 8-way all-RCBO consumer unit, six radial circuits including a
            32 A office ring final, two 16 A workstation radials, a 16 A kitchen radial, a 6 A
            lighting circuit, and a 32 A EVSE radial in the underground car park. TN-C-S supply,
            dead testing complete with Ze = 0.28 Ω at the origin and circuit R1+R2 values
            recorded. Time for live Zs verification across the board.
          </>
        }
        whatToDo={
          <>
            Energise the supply, close all RCBOs. On the Fluke 1664FC, select Zs mode, no-trip /
            low-current variant (because every circuit is RCBO-protected). Start with the office
            ring final — at the furthest socket from the CU, plug in the socket adapter, press
            TEST. Reading: 0.62 Ω. Sanity-check against dead-test value: Ze + R1+R2 = 0.28 + 0.32
            = 0.60 Ω — agrees within 4 %. Compare against A4:2026 Table 41.3 Type B 32 A limit:
            table 1.37 Ω, 0.8 corrected = 1.10 Ω. 0.62 Ω passes comfortably (45 % of limit). Move
            to the workstation radials — Zs at the furthest workstation socket = 0.85 Ω each (Type
            B 16 A: table 2.74 Ω, 0.8 corrected = 2.19 Ω, comfortable pass). Kitchen radial 16 A —
            Zs = 0.78 Ω, pass. Lighting circuit 6 A — Zs at the furthest fitting = 1.45 Ω (Type B
            6 A: table 7.28 Ω, 0.8 corrected = 5.83 Ω, comfortable pass). EVSE radial 32 A in car
            park — long run from CU to charger position, Zs = 1.05 Ω. Check Type B 32 A limit 1.10
            Ω measured — passes by only 5 %. Investigate: cable route is 35 m, cable size 6 mm²
            with 6 mm² CPC. Recalculate expected R1+R2 from GN3 Table B1 — 35 × (3.08 + 3.08) mΩ/m
            = 0.215 Ω. Add Ze 0.28 = expected Zs 0.50 Ω at 20 °C. Measured 1.05 Ω is more than
            double expected — investigate. Check terminations at the EVSE position — find a
            marginal crimp on the CPC at the charger’s termination box. Re-make the crimp with a
            proper hydraulic crimp tool, retest Zs = 0.55 Ω. Pass with comfortable margin.
            Document everything: Zs per circuit, instrument used, no-trip mode applied, the EVSE
            remediation noted with before and after readings. Proceed to the RCD trip-time tests.
          </>
        }
        whyItMatters={
          <>
            The Zs test is the keystone live verification — it ties together the dead-test R1+R2
            work and the live supply impedance Ze, and it’s what the Table 41.3 comparison
            fundamentally rests on. Borderline results aren’t a fail to be rationalised away;
            they’re a finding to investigate. The EVSE example shows why: a slightly-passing Zs
            read prompted investigation, found a poor termination, allowed a remediation that
            brought the circuit comfortably within compliance. Without the live test, the
            dead-test calculation would have looked fine (the marginal crimp wouldn’t show in a
            low-current continuity test) and the installation would have shipped with a latent
            fault that would degrade further under load. Live Zs catches what dead testing alone
            misses.
          </>
        }
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 411.3.1.2 (Table 41.1 disconnection times)"
        clause={
          <>
            Maximum disconnection times stated in Table 41.1 shall be applied to final circuits
            with a rated current not exceeding 63 A with one or more socket-outlets, and 32 A
            supplying only fixed connected current-using equipment.
          </>
        }
        meaning={
          <>
            Earth fault loop impedance (Zs) drives whether a circuit can disconnect within Table
            41.1. The live test measures Zs at the worst-case point and feeds the comparison
            against the maximum permitted Zs for the protective device. Reading this regulation
            back-to-back with Table 41.1 and the device characteristics is the inspector&apos;s
            daily work.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 411.3.1.2."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 643.3 (single AC RCD test)"
        clause={
          <>
            Regulation 643.3 has been redrafted. Regardless of RCD Type (AC, A, F, B etc.), an
            alternating current test at rated residual operating current (IΔn) shall be used to
            verify the effectiveness of the RCD. The Time/current performance criteria for RCDs
            Table 3A in Appendix 3 has been deleted.
          </>
        }
        meaning={
          <>
            On the live-test stage, RCD verification is now a single AC test at 1×IΔn for every
            RCD type. The pre-A4 multi-current sequence is gone. EIC pro-formas, test schedules
            and apprentice toolbox-talks need rebuilding around the simplified method.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 Regulation 643.3."
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          "Reg 643.7.3 mandates live Zs measurement at the supply origin (Ze) and at every circuit's furthest point. Compared against A4:2026 Table 41.3 with the 0.8 multiplier.",
          '3-lead method uses L, N, E probes at the test point. Dual-loop measurement (L-N and L-E) gives best accuracy and supports RCD avoidance modes.',
          '2-lead method uses just L and E. Quicker, used where N is inaccessible (fixed appliances, junction boxes). Slightly less accurate.',
          'On RCD-protected circuits ALWAYS use no-trip / low-current Zs mode. High-current mode trips the RCD, invalidates the reading, and inconveniences the customer.',
          'Compare measured Zs against Table 41.3 with 0.8 multiplier. Type B 32 A: table 1.37 Ω → measured limit 1.10 Ω. Type B 6 A: table 7.28 Ω → measured limit 5.83 Ω.',
          'Measured Zs should agree with calculated Ze + R1+R2 within ±10-20 %. Significant discrepancy = investigate either the dead-test or live-test result.',
          'TT installations have very high Zs (Ze ≈ Ra, typically 30-200+ Ω) — overcurrent ADS is not feasible, RCDs are mandatory protection.',
          'GN3 safety: EFLI tests use the supply voltage and create touch-voltage on exposed-conductive-parts during the test. Manage access to the installation while testing.',
        ]}
      />

      <Quiz title="Zs measurement — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
