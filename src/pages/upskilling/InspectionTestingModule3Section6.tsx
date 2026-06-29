import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod3-s6-tolerance-band',
    question:
      'A 28 m radial in 2.5/1.5 mm² T&E. Calculated R1+R2 at 20 °C = 28 × 19.51 mΩ/m = 0.55 Ω. Method 1 reading is 0.51 Ω. Within the working ±10 % band?',
    options: [
      'Outside the band — 0.51 Ω is too low to be valid for this run.',
      'Inside the ±10 % band (0.495–0.605 Ω) — pass and record 0.51 Ω.',
      'Outside the band — acceptance requires the reading to be within ±5 %.',
      'Cannot judge the reading at all without first knowing Ze at the origin.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 Ch 2 frames acceptance as the calculated value ± a working tolerance, in practice ±10 %. 0.55 × 0.9 = 0.495 Ω; 0.55 × 1.1 = 0.605 Ω. 0.51 Ω is inside that band. The schedule records the MEASURED value (0.51 Ω, two decimals), not the calculated value.',
  },
  {
    id: 'mod3-s6-low-reading-paths',
    question:
      'Calculated R1+R2 = 0.42 Ω. Measured = 0.18 Ω (57 % low). The cable runs in steel conduit bonded to earth at multiple points. What is the correct response?',
    options: [
      'Record 0.18 Ω as the R1+R2 — a lower reading is always better.',
      'Record 0.18 Ω and use it in the Zs sum without any further investigation.',
      'Suspect a parallel earth path: re-measure with the conduit clamp lifted, then document it.',
      'Re-test using an ordinary multimeter on its lowest ohms range.',
    ],
    correctIndex: 2,
    explanation:
      'A reading well below calculated is the parallel-earth-path signature. The metalwork is doing the CPC duty. Record the measurement honestly with a comment explaining the parallel path; if anyone later removes the conduit, the cable CPC is exposed as inadequate with no warning unless the parallel path was documented.',
  },
  {
    id: 'mod3-s6-temp-correction',
    question:
      'Calculated R1+R2 at 20 °C = 0.585 Ω. Ze = 0.62 Ω. Cable is thermoplastic insulated, operating temperature 70 °C. Max permitted Zs (A4 Schedule of Circuit Details) = 1.37 Ω at 70 °C. What is the predicted Zs you compare against the limit?',
    options: [
      '0.62 + 0.585 = 1.205 Ω, leaving comfortable headroom below the limit.',
      '0.62 + (0.585 × 1.20) = 1.32 Ω — correct the R1+R2 up to operating temperature.',
      '0.62 + (0.585 × 0.80) = 1.09 Ω, applying a downward temperature correction.',
      'It cannot be calculated at all without first taking a live Zs test.',
    ],
    correctIndex: 1,
    explanation:
      'Skipping the ×1.20 correction inflates apparent headroom and hides marginal compliance. The Table 41 limits are at operating temperature, so the comparison only makes sense if R1+R2 is at the same temperature. 0.585 × 1.20 = 0.702 Ω; Zs = 0.62 + 0.702 = 1.32 Ω. Inside 1.37 Ω, but only 4 % headroom — a flag for the design.',
  },
  {
    id: 'mod3-s6-record-measured',
    question:
      'Measured R1+R2 = 0.41 Ω. Calculated R1+R2 = 0.43 Ω. The two values are close but not identical. What value goes in the R1+R2 column on the Schedule of Test Results?',
    options: [
      '0.43 Ω — the calculated value, because it matches the original design.',
      '0.42 Ω — the average of the measured and calculated values.',
      '0.41 Ω — the measured value, to two decimal places, as the meter read it.',
      'Either value is acceptable as long as both are noted in the comments.',
    ],
    correctIndex: 2,
    explanation:
      'The schedule records measurements, not calculations or aesthetic averages. Recording 0.43 (calculated) instead of 0.41 (measured) corrupts the deterioration baseline future inspectors will compare against. Always record the measured value, two decimals, in ohms.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.2.1 deliberately stops short of giving a numeric maximum for protective-conductor continuity. What is the standard tolerance most inspectors apply when comparing a measured R1+R2 against the calculated R1+R2?',
    options: [
      '±10 % — readings within this band are accepted, readings outside it are investigated',
      '±5 % — any reading outside this tight band is an automatic fail',
      '±25 % — any reading inside this wide band is acceptable without further checks',
      'No tolerance is applied — the measured value must equal the calculated value exactly',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 Ch 2 frames acceptance as the calculated R1+R2 from cable data ± a tolerance, in practice ±10 %. Within ±10 % is a pass and gets recorded. Outside ±10 % triggers investigation — high readings point to joints / cable issues, low readings point to parallel paths.',
  },
  {
    id: 2,
    question:
      'A measured R1+R2 comes in significantly lower than calculated. Why is this not automatically a "good" result?',
    options: [
      'Lower is always better for R1+R2, so no further investigation is needed',
      'It indicates the installed cable is over-sized and the circuit design should be revised down',
      'It points to a faulty low-reading instrument that should be replaced before continuing',
      'Parallel earth paths via containment or bonded services can short the CPC and mask a joint',
    ],
    correctAnswer: 3,
    explanation:
      "A reading below calculated suggests a parallel path (steel conduit clamped at both ends, bonded gas/water pipes touching the CPC at an accessory, or another circuit's CPC bonded to the same metalwork). The measurement is the parallel combination, not the cable-only R1+R2. The day someone removes the parallel path, the CPC may be exposed as inadequate.",
  },
  {
    id: 3,
    question:
      'Calculated R1+R2 at 20 °C is 0.43 Ω. The cable is thermoplastic insulated, operating temperature 70 °C. What R1+R2 value should you compare against the Table 41 / max-permitted Zs limit?',
    options: ['0.43 Ω', '0.36 Ω', '0.52 Ω', '0.86 Ω'],
    correctAnswer: 2,
    explanation:
      '0.43 × 1.20 = 0.52 Ω. Copper conductor resistance has a positive temperature coefficient of approximately 0.4 %/°C, so the 20 °C value is multiplied by ~1.20 for 70 °C operating temperature. The corrected value is what feeds Zs verification against Table 41 limits.',
  },
  {
    id: 4,
    question:
      'You have measured R1+R2 = 0.30 Ω against a calculated 0.31 Ω. Ze at the origin = 0.32 Ω. The protective device is a 32 A B-curve MCB; the A4:2026 max permitted Zs from the Schedule of Circuit Details is 1.37 Ω at 70 °C. Is the circuit compliant for ADS?',
    options: [
      'Yes — Zs at 70 °C ≈ 0.32 + (0.31 × 1.20) = 0.69 Ω, well within 1.37 Ω',
      'No — the predicted Zs already exceeds the 1.37 Ω limit',
      'Cannot decide without first carrying out an RCD trip-time test',
      'Yes — but only if an RCD is also fitted to provide the disconnection time',
    ],
    correctAnswer: 0,
    explanation:
      'Use calculated R1+R2 corrected to operating temperature for the Zs prediction: 0.31 × 1.20 = 0.372 Ω. Zs ≈ 0.32 + 0.372 = 0.69 Ω. That is well inside the 1.37 Ω limit, so the disconnection time per Reg 411.3.2 / Table 41.1 will be met by the MCB alone — no RCD required to make ADS work for this circuit.',
  },
  {
    id: 5,
    question:
      'Reg 643.7.3.1 (A4:2026) explicitly orders two tests in sequence. Which sequence does it require?',
    options: [
      'Insulation resistance first, then the continuity measurement',
      'Earth fault loop impedance first, then the continuity measurement',
      'Continuity per Reg 643.2 first, then the earth fault loop impedance measurement',
      'Polarity verification first, then the continuity measurement',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.7.3.1 says: "An electrical continuity test shall be carried out according to Regulation 643.2 before carrying out the earth fault loop impedance measurement." The continuity result is the predicate for the Zs verification, not an unrelated step.',
  },
  {
    id: 6,
    question:
      'A Method 2 wandering-lead survey of an 8-socket radial gives readings of 0.12, 0.18, 0.74, 0.81, 0.86, 0.91, 0.97, 1.02 Ω. What does the data tell you?',
    options: [
      'A smooth, expected progression of rising resistance along the radial — record as a pass',
      'A failure of the wandering lead itself, since real readings would not step up like this — re-test',
      'Parallel earth paths shorting the CPC at the early sockets — record the circuit as compliant',
      'A single high-resistance joint between socket 2 and socket 3; resolve before accepting',
    ],
    correctAnswer: 3,
    explanation:
      "The 0.56 Ω jump between socket 2 (0.18 Ω) and socket 3 (0.74 Ω) is the diagnostic signature of a single bad joint between those two points. Subsequent sockets read consistently higher because that bad joint is now in series for everything downstream of it. Localise, remediate, re-test. This is Method 2's strength over Method 1.",
  },
  {
    id: 7,
    question: 'On the A4:2026 Schedule of Test Results, the R1+R2 column should contain:',
    options: [
      'The measured value at the test point in ohms, to two decimal places',
      'The calculated value derived from GN3 Table BI cable data',
      'The predicted Zs value for the circuit at operating temperature',
      'A simple pass or fail tick against the acceptance band',
    ],
    correctAnswer: 0,
    explanation:
      'The schedule records measurements, not calculations. R1+R2 is the measured value to two decimal places in ohms. Calculated values belong on the design / circuit details schedule, where the maximum permitted Zs column also lives. Comments column flags any non-standard situation (parallel paths, calculated-in-lieu, etc.).',
  },
  {
    id: 8,
    question:
      'A measured R1+R2 reads "OL" (open line) on the meter. Before condemning the CPC, what is the first thing to check?',
    options: [
      'The insulation resistance of the cable, to rule out a short before an open circuit',
      'The Ze value at the origin, since a high Ze can read as an open line at the far end',
      'The RCD trip time on the circuit, as a failed RCD can block the continuity path',
      'That the L–CPC link at the board (Method 1) is actually still in place and the test leads are making good contact at both ends',
    ],
    correctAnswer: 3,
    explanation:
      'An open-circuit reading on Method 1 most often reflects a slipped flying lead or a poor probe contact, not a broken CPC. The thirty-second sanity check — verify the link, verify probe contact, verify the meter polarity — saves an unnecessary cable replacement. Only after those are ruled out do you investigate the conductor itself.',
  },
  {
    id: 9,
    question:
      'Reg 644.1.1 (initial verification) says any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued. How does this apply to a borderline R1+R2 reading you cannot fully diagnose on the day?',
    options: [
      'Issue the EIC anyway and add a comment noting the borderline reading',
      'Issue an unsatisfactory EICR instead — the wrong document for new work',
      'Hold the EIC until the reading is resolved or shown compliant with comments',
      'Issue the EIC with a C2 code recorded against the borderline reading',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 644.1.1 is unambiguous for initial verification: defects must be corrected before the EIC is issued. A borderline R1+R2 you cannot diagnose is not a defect to paper over with a comment — it is a verification step that has not completed. Either resolve it, demonstrate it is compliant by parallel-path analysis with full comments, or leave the certificate unsigned.',
  },
  {
    id: 10,
    question:
      'A continuity reading is unambiguously high (0.92 Ω measured against a calculated 0.31 Ω at 20 °C, no parallel paths). The MCB is a 32 A B-curve, max permitted Zs at 70 °C = 1.37 Ω. With Ze = 0.45 Ω, your predicted Zs at 70 °C ≈ 0.45 + (0.92 × 1.20) = 1.55 Ω. What is the correct response?',
    options: [
      'Investigate the high R1+R2 and resolve it — predicted Zs already exceeds the limit',
      'Accept the reading, since at 1.55 Ω it is "close enough" to the 1.37 Ω limit to pass',
      'Add a 30 mA RCD to the circuit and disregard the high R1+R2 reading altogether',
      'Accept the reading and simply add a comment noting the value is slightly high',
    ],
    correctAnswer: 0,
    explanation:
      '1.55 Ω > 1.37 Ω means the disconnection time on the MCB alone will not meet Reg 411.3.2 / Table 41.1. The R1+R2 itself is the symptom. Investigate the conductor / joints, fix the cause, then re-test. Adding an RCD does not "fix" a high R1+R2 — it changes the protective measure but does nothing about the conductor defect itself, which is still a Reg 543 / 644.1.1 issue.',
  },
];

const InspectionTestingModule3Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Interpreting continuity results | I&T Module 3.6 | Elec-Mate',
    description:
      'Calculated vs measured R1+R2, the ±10 % tolerance band, the four diagnostic outcomes (within range, high, low, open), parallel earth paths, temperature correction (×1.20 for 70 °C), and how the reading feeds Zs verification under Reg 643.7.3.1.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6"
            title="Interpreting continuity results"
            description="Calculated vs measured, the ±10 % tolerance band, the four diagnostic outcomes, and how the R1+R2 reading feeds Zs verification under Reg 643.7.3.1."
            tone="yellow"
          />

          <TLDR
            points={[
              'Acceptance is calculated, not assumed. From GN3 Table BI / OSG Table I1 derive the expected R1+R2 at 20 °C, then compare. The working tolerance is ±10 % — within that band, record and move on; outside it, investigate.',
              'A measured value SIGNIFICANTLY HIGHER than calculated points to a joint, termination, undersized conductor or longer route than assumed. Localise with Method 2 if needed.',
              'A measured value SIGNIFICANTLY LOWER than calculated is suspicious, not "good". Parallel earth paths via metallic containment, bonded services or supplementary bonding can mask a degraded CPC. Disconnect the parallel path and re-measure, or use the calculated value in the Zs sum and flag in comments.',
              'For Zs verification, correct the calculated R1+R2 from 20 °C up to operating temperature: ×1.20 for 70 °C thermoplastic. Reg 643.7.3.1 sequences continuity BEFORE earth fault loop impedance — the corrected R1+R2 lets you predict Zs without exposing yourself to a live test on every circuit.',
              'A4:2026 Schedule of Test Results: R1+R2 column = MEASURED value, two decimals in ohms. Maximum permitted Zs column = the design ceiling. Comments column = parallel paths, calculated-in-lieu, accessories disconnected — anything the next inspector needs to read the data.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate the expected R1+R2 from cable size, length and GN3 Table BI / OSG Table I1, and apply the 1.20× correction for 70 °C operation',
              'Apply the ±10 % tolerance band to judge a measured reading against the calculated value, and recognise when the band itself is too coarse for the duty',
              'Diagnose the four distinct outcomes (within range, high, low, open) and state the next action for each — court-defensible, not improvised',
              'Identify parallel earth paths from a low reading, isolate the parallel path, and decide whether to re-measure or use the calculated R1+R2 in the Zs sum',
              'Connect the continuity result to the Zs verification per Reg 643.7.3.1 and the disconnection time limits in Reg 411.3.2 / Table 41.1',
              'Record the result correctly on the A4:2026 Schedule of Test Results, distinguishing R1+R2, max permitted Zs and comments columns',
              'Apply Reg 644.1.1 honestly — defects revealed at initial verification are corrected BEFORE the Certificate is issued, not papered over with a comment',
            ]}
          />

          <ContentEyebrow>The interpretation framework</ContentEyebrow>

          <ConceptBlock
            title="A reading is data, not a verdict"
            plainEnglish="A continuity result is one of four diagnostic outcomes, each with a different next step. Treating every reading as a binary pass/fail is the single biggest cause of bad EICs and missed defects."
            onSite="Before you press the test button, write the calculated R1+R2 next to the circuit on your test sheet. The act of writing it forces the comparison and stops the meter reading dictating the conclusion."
          >
            <p>
              Reg 643.2.1 deliberately does not state a numeric maximum for protective-conductor
              continuity, because R1+R2 depends on cable size and length. That puts the burden of
              acceptance on the inspector: you calculate the expected value from the cable data, you
              measure, you compare, and the comparison is what tells you what to do next. A meter
              reading on its own is not enough information to record a pass or a fail.
            </p>
            <p>
              The four outcomes are not equally weighted. &ldquo;Within ±10 %&rdquo; is the only
              outcome where the next action is to record and move on. Every other outcome is an
              instruction to investigate before any value is committed to the schedule of test
              results. This is the difference between a court-defensible record and a meter dump.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.2.1"
            clause={
              <>
                The continuity of conductors and connections to exposed-conductive-parts and
                extraneous-conductive-parts, if any, shall be verified by a measurement of
                resistance of: (a) protective conductors, including protective bonding conductors;
                and (b) in the case of ring final circuits, live conductors.
              </>
            }
            meaning="Resistance is the verification verb. The reg does not say &lsquo;low resistance&rsquo;, &lsquo;continuous&rsquo;, or &lsquo;sufficient&rsquo; — it says &lsquo;measurement of resistance&rsquo;. A numeric reading is the duty. What you do with the reading once you have it is the topic of this section."
          />

          <SectionRule />

          <ContentEyebrow>Calculated vs measured — the comparison that matters</ContentEyebrow>

          <ConceptBlock
            title="Step 1 — calculate expected R1+R2 from GN3 Table BI"
            plainEnglish="Multiply the circuit length in metres by the (r1 + r2) mΩ/m value for the cable. The result is the R1+R2 you should see at 20 °C if the cable is intact and there are no parallel paths."
          >
            <p>
              GN3 Reg 1.74 publishes Table BI of conductor resistance per metre at 20&deg;C, by
              conductor cross-section. OSG Table I1 carries the same values. For a circuit with
              different line and CPC csa (typical T&amp;E with a reduced CPC), add the line
              csa&rsquo;s r1 to the CPC csa&rsquo;s r2 and multiply the sum by the route length in
              metres. The most common values:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Cable (line / CPC)</th>
                    <th className="text-center text-white/80 py-2">r1 (mΩ/m)</th>
                    <th className="text-center text-white/80 py-2">r2 (mΩ/m)</th>
                    <th className="text-center text-elec-yellow py-2">r1 + r2 (mΩ/m)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1.0 / 1.0 mm²</td>
                    <td className="text-center">18.10</td>
                    <td className="text-center">18.10</td>
                    <td className="text-center text-elec-yellow">36.20</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1.5 / 1.0 mm² (T&amp;E)</td>
                    <td className="text-center">12.10</td>
                    <td className="text-center">18.10</td>
                    <td className="text-center text-elec-yellow">30.20</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">2.5 / 1.5 mm² (T&amp;E)</td>
                    <td className="text-center">7.41</td>
                    <td className="text-center">12.10</td>
                    <td className="text-center text-elec-yellow">19.51</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">4.0 / 1.5 mm² (T&amp;E)</td>
                    <td className="text-center">4.61</td>
                    <td className="text-center">12.10</td>
                    <td className="text-center text-elec-yellow">16.71</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">6.0 / 2.5 mm² (T&amp;E)</td>
                    <td className="text-center">3.08</td>
                    <td className="text-center">7.41</td>
                    <td className="text-center text-elec-yellow">10.49</td>
                  </tr>
                  <tr>
                    <td className="py-2">10 / 4.0 mm²</td>
                    <td className="text-center">1.83</td>
                    <td className="text-center">4.61</td>
                    <td className="text-center text-elec-yellow">6.44</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Worked example: a 22 m radial in 2.5/1.5 mm² T&amp;E. Calculated R1+R2 at 20&deg;C =
              22 × 19.51 mΩ/m = 0.43 Ω. That is the comparator number for the next step.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Step 2 — apply the ±10 % tolerance band"
            plainEnglish="A measurement that lands within ±10 % of the calculated value is a pass — record it and move on. A measurement outside ±10 % is an instruction to investigate, not a fail by itself."
            onSite="The 10 % is not in the regulation as a number. It is the working tolerance GN3 Ch 2 frames against cable manufacturing variation, lead-resistance residue and meter accuracy. Some inspectors apply ±5 % on critical circuits and ±15 % on long radials. The principle is constant: a band, not a single point."
          >
            <p>
              For the 22 m × 2.5/1.5 mm² example, calculated R1+R2 = 0.43 Ω. The ±10 % band is
              therefore 0.39 Ω to 0.47 Ω. A reading of 0.41 Ω lands inside the band — record and
              proceed. A reading of 0.55 Ω is 28 % high — investigate. A reading of 0.30 Ω is 30 %
              low — investigate, with parallel paths the leading suspect.
            </p>
            <p>
              The tolerance band is not an excuse to record measurements you have not nulled the
              leads on, or to accept readings from a meter you have not verified against a known
              short. The band absorbs honest variation; it does not absorb procedural shortcuts.
            </p>
          </ConceptBlock>

          {/* Diagnostic outcomes flowchart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Diagnostic flow — calculated → measured → outcome → action
            </h4>
            <svg
              viewBox="0 0 800 460"
              className="w-full h-auto"
              role="img"
              aria-label="Continuity result diagnostic flowchart. Calculated R1+R2 from GN3 Table BI is compared to the measured value. Within plus or minus ten percent: record and move on. High: investigate joints, terminations, route length, conductor size. Low: investigate parallel earth paths, disconnect to confirm, decide on calculated value for Zs sum. Open circuit: check link and probe contact first, then conductor."
            >
              {/* Top node — calculated */}
              <rect
                x="280"
                y="20"
                width="240"
                height="48"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="42"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                CALCULATED R1+R2
              </text>
              <text x="400" y="58" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Length × (r1 + r2) mΩ/m
              </text>

              {/* Arrow down */}
              <line
                x1="400"
                y1="68"
                x2="400"
                y2="100"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="400,100 396,92 404,92" fill="rgba(255,255,255,0.5)" />

              {/* Measured node */}
              <rect
                x="280"
                y="100"
                width="240"
                height="48"
                rx="10"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="122"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                MEASURED at far end
              </text>
              <text x="400" y="138" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Method 1 / Method 2
              </text>

              {/* Decision */}
              <line
                x1="400"
                y1="148"
                x2="400"
                y2="170"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="400,170 396,162 404,162" fill="rgba(255,255,255,0.5)" />

              <rect
                x="270"
                y="170"
                width="260"
                height="42"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="195"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Compare against ±10 % band
              </text>

              {/* Branch lines down to four outcomes */}
              <line
                x1="400"
                y1="212"
                x2="400"
                y2="240"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <line
                x1="120"
                y1="240"
                x2="680"
                y2="240"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <line
                x1="120"
                y1="240"
                x2="120"
                y2="260"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
              <line
                x1="305"
                y1="240"
                x2="305"
                y2="260"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
              <line
                x1="495"
                y1="240"
                x2="495"
                y2="260"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
              <line
                x1="680"
                y1="240"
                x2="680"
                y2="260"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />

              {/* Outcome 1 — within range */}
              <rect
                x="30"
                y="260"
                width="180"
                height="80"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="120"
                y="280"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                Within ±10 %
              </text>
              <text x="120" y="298" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Pass.
              </text>
              <text x="120" y="312" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Record on schedule.
              </text>
              <text x="120" y="326" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Move to Zs verification.
              </text>

              {/* Outcome 2 — high */}
              <rect
                x="220"
                y="260"
                width="170"
                height="80"
                rx="8"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="305"
                y="280"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Significantly HIGH
              </text>
              <text x="305" y="298" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Joint / termination /
              </text>
              <text x="305" y="311" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                undersized CPC /
              </text>
              <text x="305" y="324" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                longer route. Localise.
              </text>

              {/* Outcome 3 — low */}
              <rect
                x="400"
                y="260"
                width="190"
                height="80"
                rx="8"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="495"
                y="280"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Significantly LOW
              </text>
              <text x="495" y="298" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Parallel earth paths
              </text>
              <text x="495" y="311" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                masking the CPC.
              </text>
              <text x="495" y="324" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Disconnect &amp; re-measure.
              </text>

              {/* Outcome 4 — open */}
              <rect
                x="600"
                y="260"
                width="170"
                height="80"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="685"
                y="280"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                OPEN circuit (∞)
              </text>
              <text x="685" y="298" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Check link + probe
              </text>
              <text x="685" y="311" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                contact FIRST.
              </text>
              <text x="685" y="324" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Then investigate CPC.
              </text>

              {/* Footer */}
              <rect
                x="30"
                y="360"
                width="740"
                height="80"
                rx="10"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.25)"
                strokeWidth="1"
              />
              <text
                x="400"
                y="382"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Reg 643.7.3.1: continuity → Zs verification
              </text>
              <text x="400" y="402" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Zs (predicted, 70 °C) = Ze + (R1+R2 calculated × 1.20)
              </text>
              <text x="400" y="420" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Compare against the maximum permitted Zs from the Schedule of Circuit Details
                (A4:2026 column).
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four diagnostic outcomes</ContentEyebrow>

          <ConceptBlock
            title="Outcome 1 — within ±10 % of calculated"
            plainEnglish="Pass. Record the measured value to two decimal places in ohms in the R1+R2 column. Move to the Zs verification step."
          >
            <p>
              This is the only outcome where the next action is to record and proceed without
              further investigation. The calculated R1+R2 was 0.43 Ω; the measured value is 0.41 Ω;
              you write 0.41 in the R1+R2 column on the Schedule of Test Results, and you move on.
              Note: you record the MEASURED value, not the calculated one — the schedule documents
              what the meter saw, not what the meter should have seen.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Outcome 2 — significantly higher than calculated"
            plainEnglish="Investigate first, decide later. The reading is telling you something is wrong with the circuit, the cable, or your assumptions. Common causes: a loose terminal, a corroded joint, a junction-box termination using an inadequate connector, cable longer than the route assumed, the wrong cable size at one section, mechanical damage."
            onSite="Method 2 (the wandering lead) is the diagnostic tool here. A string of point-by-point readings localises the bad joint to a single span between accessories. Method 1 alone gives you one number at the far end and a guess at where the problem sits."
          >
            <p>
              The temptation on a high reading is to write &ldquo;within tolerance for the cable
              age&rdquo; and move on. Resist it. A high R1+R2 has three real consequences:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Predicted Zs goes up. If the high reading drives Zs past the Reg 411.3.2 / Table
                41.1 limit, ADS will not operate within the disconnection time and the circuit is
                non-compliant for fault protection.
              </li>
              <li>
                A high-resistance joint is a heat source under fault current. The joint that reads
                0.7 Ω at the far end of a 32 A radial dissipates 32² × 0.7 = 717 W under sustained
                fault current — at the location of the joint, in the wall, with no thermal
                protection. The MCB trip time is the only thing standing between that and a fire.
              </li>
              <li>
                A high reading recorded as a pass is a court-defensible problem. The next inspector
                sees a borderline value, accepts your acceptance, and inherits your defect. If the
                installation later fails in service, the trail of paperwork ends at your signature.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A 22 m kitchen radial reading 0.55 Ω against 0.43 Ω calculated"
            situation="2.5/1.5 mm² T&E radial, 22 m route, 32 A B-curve MCB. Calculated R1+R2 at 20 °C = 0.43 Ω, ±10 % band = 0.39–0.47 Ω. Method 1 reading at the far socket = 0.55 Ω (28 % high). Ze at the origin = 0.45 Ω."
            whatToDo={
              <>
                <span className="block">
                  Predicted Zs at 70&deg;C = 0.45 + (0.55 × 1.20) = 1.11 Ω. Max permitted Zs (A4
                  Schedule of Circuit Details, 32 A B-curve at 70&deg;C) ≈ 1.37 Ω, so the high
                  reading does NOT yet drive the circuit out of compliance for ADS.
                </span>
                <span className="block">
                  But the reading is 28 % high, well outside ±10 %. Switch to Method 2 from the MET,
                  walk the circuit socket-by-socket, and look for the jump. Likely candidates: the
                  FCU spur halfway along, the back-box terminations at the furthest socket, or a
                  junction in the loft that is not on the drawing.
                </span>
                <span className="block">
                  Resolve the joint, re-test, and record the post-remediation R1+R2. Do not record
                  0.55 Ω as a pass on the basis that &ldquo;Zs is still within limits&rdquo;.
                </span>
              </>
            }
            whyItMatters="Borderline-but-passes is how progressive defects develop. The circuit that reads 0.55 Ω today reads 0.85 Ω in two years and 1.20 Ω in five — and at 1.20 Ω it has stopped meeting the disconnection time. The fix is cheap now and expensive later. Reg 644.1.1 makes that explicit for new work: defects revealed at initial verification are corrected before the EIC is issued."
          />

          <ConceptBlock
            title="Outcome 3 — significantly lower than calculated"
            plainEnglish="Suspicious, not necessarily good. The most common cause is parallel earth paths via metallic containment, bonded gas/water pipework, supplementary bonding routes that loop through the same accessory, or another circuit's CPC bonded into the same metalwork. The reading is the parallel combination of the cable CPC and whatever is shorting it — not the cable-only R1+R2."
            onSite="Disconnect the parallel path at the test point — usually a supplementary bond at the accessory, or the conduit clamp at the back box — and re-measure. If the reading rises sharply, the parallel path is confirmed. Either re-establish the bond and accept the parallel-path R1+R2 as a comment, or use the calculated R1+R2 in the Zs sum and document the situation in the Schedule of Test Results comments column."
          >
            <p>
              A reading lower than calculated feels like a pass. It usually is not. The danger is
              that the parallel path is doing the CPC&rsquo;s job, and on the day someone removes
              that path — refurbishment, re-routing, replacing a gas pipe with plastic — the CPC is
              exposed as inadequate with no warning to anyone.
            </p>
            <p>The standard parallel-path scenarios:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Metallic containment.</strong> Steel conduit, SWA armour, cable tray with
                earthed clamps. The containment is bonded to earth at multiple points and acts as a
                CPC in parallel with the cable&rsquo;s own CPC.
              </li>
              <li>
                <strong>Bonded services.</strong> A gas pipe bonded at the meter and routed
                alongside / clipped to a CPC at an accessory. Touch them and the CPC is
                short-circuited at that accessory.
              </li>
              <li>
                <strong>Supplementary bonding rings.</strong> In a bathroom, supplementary bonds
                between simultaneously accessible parts can form a low-resistance loop that a single
                circuit&rsquo;s R1+R2 measurement runs through.
              </li>
              <li>
                <strong>Multiple-circuit shared CPC paths.</strong> A common in older installations
                where lighting and socket CPCs end up bonded together at a metal accessory back box.
                The R1+R2 of one circuit reads in parallel with the other circuit&rsquo;s CPC back
                to the MET.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A low reading on a 32 A radial in a metal-clad commercial unit"
            situation="Steel conduit and tray run from the distribution board to a final FCU. You short L–CPC at the board (Method 1) and read 0.18 Ω at the FCU. Calculated R1+R2 from cable length and Table BI is 0.31 Ω. The reading is 42 % LOW."
            whatToDo="Do not record 0.18 Ω as the R1+R2 for the Zs sum. The metal containment is bonded to earth at multiple points and is creating a parallel path that shorts the cable CPC. Either disconnect the conduit clamp / armour gland at the relevant accessory and re-measure (with isolation in place), OR note in the comments that the reading reflects parallel paths and use the calculated R1+R2 (0.31 Ω) in the Zs verification step."
            whyItMatters="Recording 0.18 Ω as the R1+R2 means a Zs prediction of 0.45 + 0.18 = 0.63 Ω, which looks compliant. The day a refurbishment contractor cuts the conduit clamp and replaces it with a plastic gland, the cable CPC alone is now in the loop and the real Zs is 0.45 + (0.31 × 1.20) = 0.82 Ω. The disconnection time is still met for the MCB rating, but the audit trail is now wrong — the schedule says 0.18 Ω for an installation that no longer reads 0.18 Ω, and the next inspector has no way to spot the discrepancy."
          />

          <ConceptBlock
            title="Outcome 4 — open circuit (∞ / OL on the meter)"
            plainEnglish="The reading is &lsquo;open line&rsquo; or infinity — the meter sees no continuous path. Before condemning the cable, do the thirty-second sanity check: verify the L–CPC link at the board (Method 1) is still in place, verify the test-lead probe is making good contact at both ends, verify the meter is still on the right range, verify you are at the right circuit."
            onSite="Most open-circuit readings on first measurement are procedural, not real. A flying lead has slipped at the board, a probe has lost contact with a screw, or you are at the wrong accessory. Re-seat the link, re-touch the probe, take a second reading. If the second reading is still open, then investigate the cable."
          >
            <p>The procedure for a confirmed open circuit:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Re-confirm isolation at the source. The cable is dead and locked off — re-prove with
                a verified voltage indicator.
              </li>
              <li>
                Walk the cable from origin to far end, checking each junction box, accessory and
                termination for a broken or loose CPC. Method 2 (wandering lead from the MET) lets
                you bisect — measure halfway, measure quarter, narrow it down.
              </li>
              <li>
                If the cable itself is intact and every termination is good, suspect a manufacturing
                fault in the cable or mechanical damage hidden in the route. Replace the affected
                length.
              </li>
              <li>
                Do not record an &ldquo;open&rdquo; on the schedule and continue. An open CPC means
                the entire fault protection for the circuit is absent. Reg 644.1.1 requires this to
                be corrected before the Certificate is issued for new work.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Calling a low reading a pass without checking for parallel paths"
            whatHappens="Steel conduit, bonded both ends, runs alongside the cable. Method 1 reads 0.16 Ω against a calculated 0.28 Ω. The inspector logs 0.16 Ω, calculates Zs = Ze + 0.16 = 0.61 Ω, and ticks the box. Two years later the conduit is replaced with PVC trunking during a refurbishment. The CPC alone now carries earth fault current, the real Zs is 0.61 + 0.14 = 0.75 Ω, and although still within Table 41 limits the schedule no longer reflects the installation. A subsequent EICR codes the discrepancy as a C2 — &lsquo;potentially dangerous&rsquo; — and the original installer is on the documentation chain."
            doInstead="When a reading is more than ~10 % below calculated, treat parallel paths as the working hypothesis. Disconnect the suspect path and re-measure. Either restore the bond and accept the parallel-path number with a clear comment in the Schedule of Test Results explaining the parallel route, or use the calculated R1+R2 for the Zs sum and again flag the parallel path in comments. The comment is the audit trail the next inspector needs."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Temperature correction — getting Zs right</ContentEyebrow>

          <ConceptBlock
            title="Why 20 °C is the wrong temperature for the Zs limit comparison"
            plainEnglish="GN3 Table BI is at 20 °C. Cable in service runs hotter — typically up to 70 °C for thermoplastic insulated cable at full load. Conductor resistance has a positive temperature coefficient of about 0.4 %/°C for copper, so R1+R2 at 70 °C is roughly 1.20× the 20 °C value. The Zs limit in Table 41 / the A4:2026 max-permitted-Zs column is stated at the operating temperature, so the comparison only works if you use the corrected R1+R2."
            onSite="Most modern multifunction testers do this for you when you select the cable temperature in the tester setup. If yours doesn&rsquo;t, multiply the 20 °C R1+R2 by 1.20 by hand before adding to Ze."
          >
            <p>
              The arithmetic is simple, but the order matters. The continuity test you just
              performed reads the cable at ambient — 20 °C in a typical UK property, sometimes less
              in winter. The Zs limit you are comparing against is the value at which the circuit
              must still operate within its disconnection time at full operating temperature. So:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                For the SCHEDULE OF TEST RESULTS, record the MEASURED R1+R2 as-is (at ambient). The
                schedule documents what was measured today.
              </li>
              <li>
                For the ZS PREDICTION you compare against the Table 41 / A4 max-permitted-Zs limit,
                use R1+R2 corrected to operating temperature: ×1.20 for thermoplastic cable at
                70&deg;C, ×1.28 for thermosetting cable at 90&deg;C.
              </li>
              <li>
                When a live Zs measurement is also taken (after the dead test), compare the live Zs
                against the limit directly — it is already at the cable&rsquo;s operating
                temperature. Use the corrected calculated Zs only as the predicted value to
                cross-check the live measurement.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7.3.1"
            clause={
              <>
                Where protective measures are used which require a knowledge of earth fault loop
                impedance, the relevant impedances shall be measured, or determined by an
                alternative method. An electrical continuity test shall be carried out according to
                Regulation 643.2 before carrying out the earth fault loop impedance measurement. The
                measured earth fault loop impedance shall comply with Chapter 41.
              </>
            }
            meaning="The order is mandated, not optional. Continuity (Reg 643.2) comes BEFORE Zs measurement. The corrected R1+R2 lets you predict Zs and decide whether the circuit can be safely live-tested. Reversing the order — live Zs first, continuity afterwards — is unsafe and not what the regulation requires."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>From R1+R2 to Zs verification</ContentEyebrow>

          <ConceptBlock
            title="Zs = Ze + R1 + R2 — the sum that justifies the test"
            plainEnglish="The whole reason Reg 643.2.1 makes you measure R1+R2 is that it lets you predict Zs (the earth fault loop impedance at the furthest point) without exposing yourself to a live test on every circuit. Add Ze (measured at the origin) to the corrected R1+R2 and you have the predicted Zs. Compare to the limit. If predicted Zs is comfortably under the limit, proceed to the live Zs test as confirmation. If predicted Zs is over the limit, fix the R1+R2 first."
            onSite="Most multifunction testers will let you store Ze and auto-add R1+R2 readings to give a calculated Zs. Use that feature — but verify the Ze value the meter is holding is the one you actually measured today, not a leftover from a previous job. A meter holding the wrong Ze produces a Zs that is internally consistent and externally wrong."
          >
            <p>The judgement around the sum:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Use R1+R2 corrected to operating temperature (typically &times;1.20 for
                thermoplastic) for the comparison against Table 41 limits at 70&deg;C.
              </li>
              <li>
                Apply the A4:2026 maximum permitted Zs column where it differs from earlier
                editions. The A4 amendment introduced an explicit max-permitted-Zs column on the
                Schedule of Circuit Details — use the value in that column when the design has set a
                tighter limit, not the BS&nbsp;7671 Table 41.3 raw value.
              </li>
              <li>
                Where the circuit is RCD-protected and disconnection times rely on the RCD rather
                than the overcurrent device, the R1+R2 still has to be measured and recorded — Reg
                643.2.1 does not exempt RCD-protected circuits, and a high R1+R2 is still a
                conductor defect that needs investigation regardless of the protective measure.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Worked end-to-end — the full interpretation chain"
            situation="A 22 m kitchen radial, 2.5/1.5 mm² T&E, 32 A B-curve MCB. Ze measured at the origin = 0.32 Ω. A4 max permitted Zs from the Schedule of Circuit Details = 1.37 Ω at 70 °C. You take a Method 1 R1+R2 reading at the furthest socket: 0.41 Ω."
            whatToDo={
              <>
                <span className="block">
                  Step 1 — calculated R1+R2 at 20&deg;C = 22 × 19.51 mΩ/m = 0.43 Ω. ±10 % band =
                  0.39 to 0.47 Ω.
                </span>
                <span className="block">
                  Step 2 — measured 0.41 Ω lands inside the band. Outcome 1: pass. Record 0.41 Ω in
                  the R1+R2 column.
                </span>
                <span className="block">
                  Step 3 — apply temperature correction for the Zs prediction: 0.43 × 1.20 = 0.52 Ω
                  at 70&deg;C (you use the calculated value corrected, not the measured value,
                  because the limit is at operating temperature).
                </span>
                <span className="block">
                  Step 4 — predicted Zs = Ze + corrected R1+R2 = 0.32 + 0.52 = 0.84 Ω. Compare to
                  1.37 Ω limit → comfortably compliant.
                </span>
                <span className="block">
                  Step 5 — proceed to the live Zs test (Reg 643.7.3) to confirm. Live Zs comes back
                  at 0.81 Ω — within the predicted value, well under the limit. Record on the
                  schedule. Move on.
                </span>
              </>
            }
            whyItMatters="The chain of reasoning is what makes the certificate defensible. Each step is a number derived from a previous number, with a clear rule for what triggers investigation. A meter dump — &lsquo;measured 0.41, Zs 0.81, pass&rsquo; — is the same arithmetic with no audit trail. When you are challenged in two years on a circuit you tested today, the chain of reasoning is the only thing that protects you."
          />

          <CommonMistake
            title="Recording the calculated R1+R2 in the schedule because it &lsquo;looked tidier&rsquo;"
            whatHappens="The measured value was 0.41 Ω; the calculated value was 0.43 Ω. The inspector decides the measured number is &lsquo;close enough to the calculated&rsquo; and writes 0.43 in the R1+R2 column to match the calculation. Two years later a periodic inspection re-measures the same circuit and gets 0.51 Ω. The new inspector writes a 19 % deterioration code (C3) — but the deterioration baseline was wrong, because the original schedule recorded the calculation, not the measurement. The actual deterioration is 0.51 vs 0.41 = 24 %, which is more serious than the C3 suggests."
            doInstead="The R1+R2 column is for the MEASURED value. Calculated values belong on the Schedule of Circuit Details, never on the Schedule of Test Results. Record what the meter saw, to two decimal places, in ohms. The audit trail is meaningful only if it documents reality, not aesthetics."
          />

          <CommonMistake
            title="Skipping the temperature correction on the Zs comparison"
            whatHappens="A 4.0/1.5 mm² T&E radial, 35 m, 32 A B-curve MCB. Calculated R1+R2 at 20 °C = 35 × 16.71 mΩ/m = 0.585 Ω. Ze = 0.62 Ω. The inspector adds Ze + 20 °C R1+R2 = 1.205 Ω, compares to the 1.37 Ω limit, says &lsquo;pass with 14 % headroom&rsquo;. In service at 70 °C, the real Zs is 0.62 + (0.585 × 1.20) = 1.32 Ω, which is 4 % headroom — and on a hot day with the cable hot, the headroom is gone."
            doInstead="Always correct R1+R2 to operating temperature for the limit comparison. Multiply by 1.20 for thermoplastic at 70 °C, by 1.28 for thermosetting at 90 °C. Most modern testers do this automatically when you set the cable type in the meter setup. If yours does not, do it by hand, every time. The limit is at operating temperature; the comparison must be at operating temperature."
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="Three columns, three rules"
            plainEnglish="The A4:2026 model forms tightened the Schedule of Test Results column structure. R1+R2 column = measured value. Maximum permitted Zs column = the design ceiling. Comments column = anything the next inspector needs to know to read the data correctly."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>R1+R2 column:</strong> the measured value at the test point, in ohms, two
                decimal places. If the circuit is a ring final and you have used the ring continuity
                test (r1, r2 and rn at each socket / furthest socket), the column takes the
                far-socket R1+R2 derived from the ring measurements, not the end-to-end ring
                resistance.
              </li>
              <li>
                <strong>Maximum permitted Zs column (A4:2026):</strong> the design ceiling for the
                circuit. Where the design has set a tighter limit than the BS&nbsp;7671 Table 41.3
                raw value, this column carries the design value and the inspector compares the live
                Zs measurement against it.
              </li>
              <li>
                <strong>Comments column:</strong> any test that is not a straightforward Method 1 or
                Method 2 result. Parallel earth paths, calculated values used in lieu of measured,
                accessories disconnected for the test, supplementary bond removed for the
                measurement, ring final tested at the furthest socket only — all flagged in comments
                so the next inspector knows what they are looking at.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.1.1"
            clause={
              <>
                For a new installation, any defect or omission revealed during the inspection and
                testing shall be corrected before the Certificate is issued.
              </>
            }
            meaning="The interpretation step is not academic. If your continuity result reveals a defect — a high R1+R2 you cannot resolve to a parallel-path explanation, or an open CPC, or a Zs prediction over the limit — Reg 644.1.1 requires the defect to be corrected BEFORE you sign the Electrical Installation Certificate. There is no &lsquo;C2 with a comment&rsquo; option for new work; that route belongs to periodic reporting (EICR). For new work, fix it or do not certify."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The continuity result in periodic inspection (EICR)</ContentEyebrow>

          <ConceptBlock
            title="How the same numbers map to a periodic report"
            plainEnglish="On an EICR, the same four diagnostic outcomes apply, but the response shifts from &lsquo;correct before issuing&rsquo; to &lsquo;classify and recommend&rsquo;. Within ±10 % is a pass and gets recorded. A high reading that drives Zs over the Table 41 limit is C2 (&lsquo;potentially dangerous&rsquo;). An open CPC is C1 (&lsquo;danger present&rsquo;) — present and immediate danger to anyone who touches the affected accessory."
          >
            <p>The mapping table inspectors most commonly apply:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Within ±10 %, predicted Zs within limit:</strong> no code, recorded.
              </li>
              <li>
                <strong>High R1+R2, predicted Zs still within limit:</strong> typically C3
                (&lsquo;improvement recommended&rsquo;) — note the deteriorating joint / termination
                as a recommendation. If a borderline reading is climbing across successive periodic
                inspections, the recommendation gains urgency.
              </li>
              <li>
                <strong>High R1+R2, predicted Zs over limit:</strong> C2 (&lsquo;potentially
                dangerous&rsquo;) — ADS will not operate within disconnection time, fault protection
                compromised. Schedule remediation.
              </li>
              <li>
                <strong>Low R1+R2 due to confirmed parallel earth path:</strong> typically not
                coded, but the parallel path itself must be assessed. If removing the parallel path
                would expose the CPC as inadequate, the parallel path is doing CPC duty and that is
                a Reg 543 issue, classified per the residual risk.
              </li>
              <li>
                <strong>Open CPC:</strong> C1 — present and immediate danger. The accessory affected
                is potentially live to touch under fault, and there is no fault protection in place.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Calculate expected R1+R2 from GN3 Table BI BEFORE you measure. Without the calculation, you have no comparator and the meter reading dictates the conclusion.',
              'Apply the ±10 % working tolerance band. Within → record and proceed. Outside → investigate, do not record-and-rationalise.',
              'A high reading is a defect signature — joint, termination, undersized CPC, longer route. Method 2 wandering-lead surveys localise it.',
              'A low reading is suspect parallel earth paths — disconnect the path and re-measure, or use the calculated R1+R2 for the Zs sum and document the parallel path in comments.',
              'An open reading is procedural until proven otherwise — verify link, verify probe contact, verify range, verify circuit, then investigate the conductor.',
              'Correct R1+R2 to operating temperature (×1.20 for 70 °C thermoplastic) before comparing against the Table 41 / A4 max-permitted-Zs limit.',
              'Reg 643.7.3.1 mandates the order: continuity FIRST, Zs measurement second. The corrected R1+R2 is the predicate for the live test.',
              'Schedule of Test Results: R1+R2 column = MEASURED value, two decimals, ohms. Comments column = parallel paths and any non-standard situation.',
              'Reg 644.1.1 for new work: defects revealed at initial verification are corrected BEFORE the EIC is issued. No comment-and-sign workaround for new installations.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Where does the ±10 % tolerance come from? It is not in the regulation.',
                answer:
                  'Correct — it is not a numeric figure stated in BS 7671. The reg deliberately leaves acceptance to the inspector. ±10 % is the working tolerance most UK inspectors apply, framed by GN3 Ch 2 against cable manufacturing variation, lead-resistance residue and meter accuracy. Some inspectors apply ±5 % on critical circuits (e.g. medical, fire alarm cables to BS 5839-1) and ±15 % on long radials where length estimation is itself uncertain. The principle is constant: a band, not a single point, with anything outside the band investigated rather than accepted.',
              },
              {
                question:
                  'Does the temperature correction (×1.20) apply to the measured value or the calculated value?',
                answer:
                  'For the Zs prediction against Table 41 / A4 max-permitted-Zs limits, you correct the CALCULATED R1+R2 (or the measured value if you prefer — both work, but using calculated is cleaner because measured already includes any quirks of the test). For the Schedule of Test Results, you record the MEASURED value as-is at ambient temperature; the schedule documents what the meter saw on the day, not a corrected derivative. The correction is a comparison step, not a recording step. Most multifunction testers do this internally when you select the cable type and ambient temperature in the meter setup.',
              },
              {
                question: 'A reading that is 5 % below calculated — does that need investigation?',
                answer:
                  'Inside ±10 % is the working pass band, so 5 % below is inside the band and is recorded as a pass. That said, if you have a string of similar circuits and ALL of them read 5 % below their calculated values, that is a pattern, not noise — most likely a systematic parallel earth path through bonded metalwork that affects every circuit. Patterns in the data are themselves diagnostic; one circuit at 5 % low is normal variation, eight at 5 % low is a parallel-path investigation.',
              },
              {
                question:
                  'How do I record an &lsquo;open&rsquo; reading on the Schedule of Test Results?',
                answer:
                  "You do not record an 'open' on the schedule and continue. An open CPC means fault protection for the circuit is absent. For initial verification, Reg 644.1.1 says the defect must be corrected before the EIC is issued — so you investigate, fix the conductor, re-test, and record the post-fix R1+R2. For periodic inspection (EICR), an open CPC is typically a C1 code ('danger present') and the accessory is taken out of service immediately. The schedule entry would read OPEN with a C1 code reference, not 'not tested' or a blank.",
              },
              {
                question: 'A high R1+R2 keeps Zs within the limit. Why investigate?',
                answer:
                  'Three reasons. First, a high R1+R2 is a defect signature — a loose terminal or a corroded joint is a heat source under fault current and a fire risk independent of the Zs limit. Second, the reading is a baseline for future periodic inspections — if you record 0.55 Ω today as a pass and the next EICR reads 0.85 Ω, the 55 % rise is the diagnostic, not the absolute value. Third, Reg 644.1.1 (for new work) requires defects revealed at initial verification to be corrected before the EIC is issued; a high R1+R2 outside the ±10 % band IS a defect even if Zs still computes within the limit. Borderline-but-passes is a progressive defect — fix it now, not when it has driven Zs out of limit in two years.',
              },
              {
                question:
                  'On an EICR, do I need to recalculate R1+R2 myself or can I rely on the previous certificate?',
                answer:
                  'Recalculate. The previous certificate may have recorded a parallel-earth-path reading or a measurement under different conditions. Your duty as the periodic inspector is to verify the installation as it is today, not to inherit somebody else&rsquo;s assumptions. Calculate the expected R1+R2 from cable size and route length you have walked. Compare to your measurement. The historical certificate is a starting point for context, not a substitute for your own analysis.',
              },
              {
                question:
                  'Where does the maximum permitted Zs column on the A4:2026 Schedule come from?',
                answer:
                  'The A4 amendment introduced an explicit maximum-permitted-Zs column on the Schedule of Circuit Details. The value comes from the design — typically derived from the protective device characteristic (Table 41.3 raw) but reduced where the design has set a tighter limit (e.g. for cable temperature derating, for selective discrimination requirements, or to maintain margin against Ze drift on a TT system). The inspector compares the live Zs measurement against THIS column value, not the BS 7671 Table 41.3 raw value. Where the columns disagree, the design value (max permitted Zs) governs.',
              },
              {
                question:
                  'My tester displays Zs auto-calculated from stored Ze + R1+R2. Should I trust it?',
                answer:
                  'Trust it after you verify the Ze value the meter is holding. Most multifunction testers store Ze and auto-add R1+R2 readings to give a predicted Zs. The trap: a meter that has held a Ze from a previous job will produce a Zs that is internally consistent and externally wrong. Re-measure Ze on each job before relying on the auto-calc, and confirm the displayed Ze matches your test sheet entry. Once verified, the auto-calc is a useful sanity check against the live Zs measurement that follows.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Interpreting continuity results — Module 3.6" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 4 · Insulation resistance
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule3Section6;
