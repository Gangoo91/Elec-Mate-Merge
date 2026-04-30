import { ArrowLeft, ChevronLeft, ChevronRight, Table as TableIcon } from 'lucide-react';
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
    id: 'mod5-s4-table-pick',
    question:
      'A 32 A Type B RCBO at Up = 230 V. Which BS 7671 table holds the max-permitted Zs and what is the value?',
    options: [
      'Table 41.2 — fuses, 0.4 s. Value not listed',
      'Table 41.3 — circuit-breakers (Type B / C / D to BS EN 60898 + RCBOs to BS EN 61009-1). Value: 0.69 Ω at 230 V',
      'Table 41.4 — fuses, 5 s. Value: 1.37 Ω',
      'Table 41.5 — RCDs only. Value: 1667 Ω',
    ],
    correctIndex: 1,
    explanation:
      'Table 41.3 covers Type B / C / D circuit-breakers and the overcurrent characteristic of RCBOs. For a 32 A Type B at 230 V the maximum permitted Zs is 0.69 Ω. Table 41.5 (RCDs) covers the residual-current characteristic of an RCBO, which is the parallel compliance route on TT.',
  },
  {
    id: 'mod5-s4-temp-correct',
    question:
      'Cold-cable Zs reads 0.62 Ω on a 32 A Type B circuit. Table 41.3 limit is 0.69 Ω at 70 °C. Apply the Appendix 3 0.8 factor.',
    options: [
      'Pass — 0.62 Ω is below 0.69 Ω, full stop',
      'Fail — 0.8 × 0.69 ≈ 0.55 Ω is the corrected limit; 0.62 Ω exceeds it. The same circuit at full operating temperature would sit ~0.62 × 1.20 ≈ 0.74 Ω, above the table value',
      'Pass — temperature correction is informative only',
      'Pass — 0.8 applies only to fuses',
    ],
    correctIndex: 1,
    explanation:
      'NOTE 2 to Tables 41.2 and 41.3 makes the temperature derating explicit. Either correct the measurement up (×1.20) or correct the limit down (×0.8). 0.8 × 0.69 = 0.552 Ω — measured 0.62 Ω fails. Investigate before signing off; common causes are longer-than-designed runs, undersized CPC, or a high-resistance termination.',
  },
  {
    id: 'mod5-s4-tt-route',
    question:
      'A TT installation has a 30 mA RCD on every final circuit. Why is Table 41.3 effectively irrelevant for the overcurrent disconnection check, and what governs instead?',
    options: [
      'TT systems have no protective devices — no table applies',
      'Electrode-only earth makes Zs too high for an overcurrent device to disconnect within the required time. Reg 411.5.3 / Table 41.5 govern instead — Zs ≤ 1667 Ω at IΔn = 30 mA, plus Ra × IΔn ≤ 50 V',
      'Table 41.3 only covers TN-S — never applies to TT',
      'Table 41.3 limits double on TT systems',
    ],
    correctIndex: 1,
    explanation:
      'A typical TT electrode resistance of 80–200 Ω cannot satisfy a 0.69 Ω Type B 32 A limit by any margin. The overcurrent device will not see enough fault current to operate within 0.4 s. RCD-based fault protection is the design intent on TT — Reg 411.5.3 / Table 41.5 set the loop impedance ceilings, both of which any electrode in working order satisfies.',
  },
  {
    id: 'mod5-s4-design-tighter',
    question:
      'The A4:2026 Schedule of Circuit Details shows a max permitted Zs of 0.45 Ω for a 32 A Type B circuit (raw Table 41.3 = 0.69 Ω). The verifier measures Zs = 0.58 Ω corrected. Compliant?',
    options: [
      'Pass — measured Zs is below the raw Table 41.3 value of 0.69 Ω',
      'Fail — the design value (0.45 Ω) is the verification target. The designer tightened the limit for a reason (selectivity, voltage drop, future load) and the certificate must evidence compliance with the design intent, not the raw table',
      'Pass — schedule-of-circuit-details columns are informative',
      'Fail — but only because Table 41.5 also applies',
    ],
    correctIndex: 1,
    explanation:
      'The whole point of the A4:2026 max-permitted-Zs column is to capture the design intent and make it visible at verification. Where the designer has tightened below Table 41.3, that tighter value is the compliance threshold. The raw table is a regulatory ceiling, not the design target — the design target lives on the schedule.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671 splits the maximum Zs tables across four numbered tables (41.2, 41.3, 41.4, 41.5). Which device-and-time combination does Table 41.3 cover?',
    options: [
      'Fuses, 0.4 s disconnection, 230 V',
      'Circuit-breakers (Type B / C / D to BS EN 60898) for both 0.4 s and 5 s disconnection at Up = 230 V',
      'RCDs only, all rated residual currents',
      'Distribution-circuit fuses, 5 s disconnection, 230 V',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.4.202 / Table 41.3 set the maximum Zs values for circuit-breakers (Type B, Type C, Type D to BS EN 60898 and the overcurrent characteristics of RCBOs to BS EN 61009-1) at Up = 230 V, providing the disconnection-time verification alternative to the calculation in Reg 411.4.4. Table 41.2 covers fuses at 0.4 s; Table 41.4 covers fuses at 5 s; Table 41.5 covers RCDs.',
  },
  {
    id: 2,
    question:
      'For a 32 A Type B circuit-breaker / RCBO at Up = 230 V, what does BS 7671 give as the maximum permitted Zs?',
    options: ['0.23 Ω', '0.69 Ω', '1.09 Ω', '0.87 Ω'],
    correctAnswer: 1,
    explanation:
      "Type B 32 A → 0.69 Ω at 230 V (Reg 411.4.202(a)). The values track the magnetic trip threshold: Type B trips magnetically at 5× rated current, so a 32 A Type B needs Ia ≥ 160 A and Zs ≤ 230 / 160 ≈ 1.44 Ω before the table's 0.95 Cmin factor brings it down to ~0.69 Ω. The 0.23 Ω option is wrong; 1.09 Ω is the 16 A entry; 0.87 Ω is a Type C value.",
  },
  {
    id: 3,
    question:
      'NOTE 2 to Tables 41.2 and 41.3 states that the Zs values shall not be exceeded when the line conductors are at the appropriate maximum permitted operating temperature (Table 52.2) and the CPCs are at the appropriate assumed initial temperature (Tables 54.2 to 54.5). What does this mean for a measurement taken on a cold installation?',
    options: [
      'You can ignore temperature — the meter does it for you',
      'A measurement at 20°C must be temperature-corrected (typically by a factor like ×1.20 for 70°C thermoplastic cable) before being compared with the table value, OR — equivalently — multiply the table limit by a temperature factor before comparison. Appendix 3 gives the procedure.',
      'You must let the cable warm up to 70°C before testing',
      'The table values already include a 20°C-to-70°C correction',
    ],
    correctAnswer: 1,
    explanation:
      'The table values are stated at maximum operating temperature. Cables in service warm up; cables under test are usually cold. NOTE 2 read with NOTE 3 and Appendix 3 require a temperature correction — the canonical 0.4 %/°C copper coefficient gives roughly ×1.20 for 20°C → 70°C. Either correct the measurement upward or correct the table limit downward; the relationship is the same.',
  },
  {
    id: 4,
    question:
      'Appendix 3 states the verification acceptance equation Zs(measured) ≤ 0.8 × (Up × Cmin / Ia). What is the role of the 0.8 factor?',
    options: [
      'It is a tester accuracy allowance',
      'It is a thermal/voltage rule-of-thumb safety margin used in Appendix 3 to account for the difference between the measurement at ambient temperature and the design assumption at maximum operating temperature, providing a single-step check against the calculated maximum',
      'It accounts for parallel earth paths',
      'It is the manufacturer tolerance for MCB trip current',
    ],
    correctAnswer: 1,
    explanation:
      'The 0.8 factor in the Appendix 3 verification expression rolls together the temperature derating and voltage variability into a single rule-of-thumb when comparing a measured ambient-temperature Zs against the calculated maximum from Reg 411.4.4. It is not a meter tolerance, not a parallel-path correction, and not a manufacturer tolerance — it is the conventional safety margin BS 7671 uses for the verification arithmetic.',
  },
  {
    id: 5,
    question:
      'Where the circuit is RCD-protected (e.g. all final circuits with sockets ≤ 32 A under Reg 411.3.3 / Reg 411.3.4), Reg 411.5 / Table 41.5 give a more permissive Zs limit. What is the maximum Zs for a 30 mA RCD at Up = 230 V according to Table 41.5?',
    options: ['7.67 Ω', '167 Ω', '500 Ω', '1667 Ω'],
    correctAnswer: 3,
    explanation:
      'Table 41.5: 30 mA → 1667 Ω, 100 mA → 500 Ω, 300 mA → 167 Ω, 500 mA → 100 Ω. The numbers come from 50 V / IΔn (the touch-voltage limit divided by the rated residual operating current). In practice these limits are essentially never the binding constraint on a domestic TN circuit — the overcurrent device limit (Table 41.3) is far tighter — but they are the correct compliance route on TT systems and on circuits where the Table 41.3 limit cannot be achieved.',
  },
  {
    id: 6,
    question:
      'A4:2026 introduced a new column on the Schedule of Circuit Details. What does it record and why does it matter?',
    options: [
      'A new column for AFDD presence — informational only',
      'A maximum permitted Zs column on the Schedule of Circuit Details, capturing the design Zs limit for each circuit so that the verification step has the design intent visible alongside the measured Zs — the limit can be tighter than Table 41.3 if the designer set it that way',
      'A column for the manufacturer of each MCB',
      'A column duplicating the Reference Method',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 redrafted the model forms — the schedule of circuit details and schedule of test results are now separate pages — and the schedule of circuit details now carries a maximum-permitted-Zs column. The verifier reads measured Zs from the schedule of test results and compares it against the design-intent maximum in the circuit-details column. Where the designer has tightened the limit below the raw Table 41.3 value (for selectivity, longer cables, future load growth), the tighter design value is what compliance is judged against — not the raw table.',
  },
  {
    id: 7,
    question:
      'You measure Zs = 0.62 Ω at the furthest point on a 32 A Type B circuit. The cable is at ambient (20°C). Is the circuit compliant against the Table 41.3 limit of 0.69 Ω?',
    options: [
      'Yes — 0.62 Ω is below 0.69 Ω, that is all that matters',
      'You must temperature-correct: at 70°C the measured Zs would be approximately 0.62 × 1.20 = 0.74 Ω, which exceeds 0.69 Ω → fail. Alternatively apply the Appendix 3 0.8 factor to the table limit (0.69 × 0.8 = 0.55 Ω) and the measured 0.62 Ω fails on that basis too. Investigate the design',
      'Yes — temperature correction is informative only',
      'No — the table is for hot cables, so the limit doubles for cold testing',
    ],
    correctAnswer: 1,
    explanation:
      'Two equivalent ways to fail this circuit. The conservative on-site approach: correct the measurement (×1.20 for 70°C → 0.74 Ω, > 0.69 Ω → fail). The Appendix 3 verification expression: corrected limit = 0.8 × 0.69 ≈ 0.55 Ω, measured 0.62 Ω → fail. Either way the circuit needs investigation — likely a cable run longer than designed, an under-sized CPC, or a high-resistance termination.',
  },
  {
    id: 8,
    question:
      'On a TT system with a 30 mA RCD on the final circuits, why is Table 41.3 effectively irrelevant for the overcurrent disconnection check?',
    options: [
      'Because TT does not require disconnection',
      'Because on TT the loop impedance is so dominated by the installation electrode that the overcurrent device cannot achieve disconnection in the required time. Reg 411.4 / Table 41.3 limits are not realistically achievable, so Reg 411.5.3 / Table 41.5 (RCD-based limits with Ra × IΔn ≤ 50 V) become the compliance route',
      'Because Table 41.3 only applies to TN-S',
      'Because TT has no protective devices',
    ],
    correctAnswer: 1,
    explanation:
      'A TT installation electrode of 80 Ω (typical) cannot satisfy a 0.69 Ω Type B 32 A limit by any margin — the overcurrent device will not see enough fault current to disconnect within 0.4 s. That is why TT installations are RCD-protected by design; the disconnection question is then judged against Table 41.5 (1667 Ω at 30 mA) and Ra × IΔn ≤ 50 V, both of which any electrode in working order satisfies.',
  },
  {
    id: 9,
    question:
      'Type C and Type D circuit-breakers have looser magnetic trip thresholds than Type B (10× and 20× rated current respectively, vs 5× for Type B). What does this mean for the corresponding Table 41.3 maximum Zs values?',
    options: [
      'Type C and Type D have higher (more permissive) maximum Zs values',
      'Type C and Type D have lower (tighter) maximum Zs values, because the magnetic trip needs more fault current, so the loop impedance must be lower for the same disconnection time',
      'They are identical',
      'Type C and Type D are not in Table 41.3',
    ],
    correctAnswer: 1,
    explanation:
      'For the same rating, a Type C needs ~10× rated current to trip magnetically and a Type D needs ~20×. To achieve those higher fault currents the loop impedance must be lower, so the Table 41.3 maximum Zs values for Type C and Type D are tighter than Type B. Examples: at 6 A — Type B 7.67 Ω, Type C 3.64 Ω, Type D 1.82 Ω (0.4 s).',
  },
  {
    id: 10,
    question:
      'You are verifying a circuit where the designer has written a maximum permitted Zs of 0.45 Ω in the new A4:2026 schedule-of-circuit-details column, even though the protective device is a 32 A Type B (raw Table 41.3 value = 0.69 Ω). What is the compliance test?',
    options: [
      'Compare measured Zs against 0.69 Ω — the design value is informative',
      'Compare measured Zs (corrected to operating temperature) against 0.45 Ω. The designer has tightened the limit for a reason (selectivity, voltage drop margin, future load) and that tighter value is the design intent the certificate has to evidence. Failing at 0.69 Ω would still pass Table 41.3 but fail the design',
      'Use whichever is higher',
      'The schedule-of-circuit-details column has no compliance role',
    ],
    correctAnswer: 1,
    explanation:
      'The whole point of the A4:2026 maximum-permitted-Zs column on the schedule of circuit details is to capture the design intent and make it visible during verification. A designer can tighten below Table 41.3 for legitimate reasons; once they have, the verification step is judged against the design value, not the raw table. This is why the new column matters for inspectors — it pins down the limit the design was built to.',
  },
];

const InspectionTestingModule5Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Maximum Zs values (BS 7671 tables) | I&T Module 5.4 | Elec-Mate',
    description:
      'BS 7671 Tables 41.2 / 41.3 / 41.4 / 41.5: maximum permitted Zs by protective device type and rating. NOTE 2 temperature correction, the Appendix 3 0.8 factor, the new A4:2026 max-permitted-Zs column on the Schedule of Circuit Details, and how to verify compliance on site.',
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
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 4"
            title="Maximum Zs values (BS 7671 tables)"
            description="The four tables in Chapter 41 — fuses at 0.4 s, circuit-breakers, fuses at 5 s, RCDs — and how the A4:2026 max-permitted-Zs column on the Schedule of Circuit Details pins the design intent into the verification step."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 splits the max-Zs duty across four tables in Chapter 41. Table 41.2 = fuses, 0.4 s. Table 41.3 = circuit-breakers (Type B / C / D to BS EN 60898 + RCBOs to BS EN 61009-1) for both 0.4 s and 5 s. Table 41.4 = fuses, 5 s (distribution circuits). Table 41.5 = RCDs, by IΔn.',
              'The values are stated at Up = 230 V and assume the line conductors are at maximum operating temperature (Table 52.2) and the CPCs at the assumed initial temperature (Tables 54.2–54.5). NOTE 2 to the tables makes that explicit.',
              'A measured Zs taken on a cold installation must be temperature-corrected before comparison — typically ×1.20 for 70°C thermoplastic cable, or use the Appendix 3 expression Zs(measured) ≤ 0.8 × (Up × Cmin / Ia) which folds the correction into a single 0.8 multiplier.',
              'A4:2026 redrafted the model forms. The Schedule of Circuit Details and the Schedule of Test Results are now separate pages, and the Schedule of Circuit Details carries an explicit max-permitted-Zs column. Where the designer has tightened the limit below Table 41.3, that tighter value is the verification target — not the raw table.',
              'On TT, Table 41.3 is effectively irrelevant for overcurrent disconnection. Compliance routes through Reg 411.5.3 / Table 41.5 (RCD-based) and Ra × IΔn ≤ 50 V.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify which of Tables 41.2 / 41.3 / 41.4 / 41.5 applies to a given protective device, system type, and disconnection time',
              'Read a maximum permitted Zs out of Table 41.3 for any Type B / C / D circuit-breaker rating in common use',
              'Apply NOTE 2 and Appendix 3 to convert between an ambient-temperature measurement and the table acceptance value, including the conventional 0.8 factor',
              'Use the new A4:2026 maximum-permitted-Zs column on the Schedule of Circuit Details correctly — capture design intent, evidence verification against it',
              'Decide when to apply the RCD-based Table 41.5 limit instead of the overcurrent-based Table 41.2 / 41.3 limits, particularly on TT and on circuits where Table 41.3 cannot be met',
              'Diagnose the four most common reasons a measured Zs fails the table limit and walk a remedial path',
            ]}
          />

          <ContentEyebrow>What the regulations and tables actually say</ContentEyebrow>

          <ConceptBlock
            title="Reg 411.4.4 — the calculation of maximum Zs"
            plainEnglish="At its root, the maximum Zs for any protective device is set by Ohm's law applied to the disconnection-time requirement: the loop impedance must be low enough that the fault current is high enough to operate the device within the time the regulations require. Reg 411.4.4 / 411.5.4 give the formula. Tables 41.2 / 41.3 / 41.4 / 41.5 are pre-computed lookups against that formula for common devices at 230 V."
            onSite="You almost never compute the limit from first principles on site. You read the table. But knowing where the table values come from is what stops you from misapplying them — for instance, on a 110 V supply, on a non-listed device, or when the system voltage is lower than 230 V."
          >
            <p>
              Reg 411.4.4 expresses the maximum permitted earth fault loop impedance for a
              protective device as:
            </p>
            <div className="my-3 px-4 py-3 bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl text-center text-[15px] font-mono text-elec-yellow">
              Zs ≤ (Up × Cmin) / Ia
            </div>
            <p>
              where <strong>Up</strong> is the nominal line-to-earth voltage, <strong>Ia</strong> is
              the current causing operation of the protective device within the required
              disconnection time, and <strong>Cmin</strong> is the minimum voltage factor (taken as
              0.95 in the BS 7671 table derivations — see NOTE 1 to Table 41.2). For Up = 230 V and
              a Type B 32 A MCB with Ia ≈ 160 A (5× rated current for the magnetic trip), the
              formula gives 230 × 0.95 / 160 ≈ 1.37 Ω. The table value is then further conditioned
              by the temperature assumption that NOTE 2 describes, landing at the published 0.69 Ω
              at Up = 230 V for the same device.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.4.4 / 411.5.4 (calculation)"
            clause={
              <>
                Regulations 411.4.4 to 411.5.4 state that the maximum earth fault loop impedance for
                a protective device is given by the expression Zs = Up × Cmin / Ia where Up is the
                nominal line-to-earth voltage, Ia is the current causing operation of the protective
                device within the specified time, and Cmin is the minimum voltage factor to account
                for voltage variations.
              </>
            }
            meaning="The formula is the regulation; the tables are convenience lookups against the formula at Up = 230 V. On any system that is not 230 V to earth (e.g. reduced low-voltage 110 V centre-tapped, or a private supply at a different voltage), apply the formula directly — do not try to scale the table values."
          />

          <ConceptBlock
            title="Table 41.2 — fuses at 0.4 s, Up = 230 V"
            plainEnglish="The first lookup table in Chapter 41. It gives maximum permitted Zs for circuits protected by fuses, where the required disconnection time is 0.4 s (typical for final circuits ≤ 63 A with sockets, and ≤ 32 A supplying fixed equipment). It covers BS 88-2 (gG/gM), BS 88-3, BS 3036 and BS 1362 fuses."
          >
            <p>Selected values from Table 41.2 (Up = 230 V, 0.4 s disconnection):</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Fuse standard</th>
                    <th className="text-center text-white/80 py-2">Rating</th>
                    <th className="text-center text-elec-yellow py-2">Max Zs (Ω)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS 88-2 (gG)</td>
                    <td className="text-center">16 A</td>
                    <td className="text-center text-elec-yellow">2.43</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS 88-2 (gG)</td>
                    <td className="text-center">20 A</td>
                    <td className="text-center text-elec-yellow">1.68</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS 88-2 (gG)</td>
                    <td className="text-center">32 A</td>
                    <td className="text-center text-elec-yellow">0.99</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS 88-2 (gG)</td>
                    <td className="text-center">63 A</td>
                    <td className="text-center text-elec-yellow">0.44</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS 3036</td>
                    <td className="text-center">15 A</td>
                    <td className="text-center text-elec-yellow">2.43</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS 3036</td>
                    <td className="text-center">30 A</td>
                    <td className="text-center text-elec-yellow">1.04</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">BS 1362 (plug fuse)</td>
                    <td className="text-center">3 A</td>
                    <td className="text-center text-elec-yellow">15.6</td>
                  </tr>
                  <tr>
                    <td className="py-2">BS 1362 (plug fuse)</td>
                    <td className="text-center">13 A</td>
                    <td className="text-center text-elec-yellow">2.30</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              BS 3036 rewireable fuses are still in service in legacy installations and BS 1362 plug
              fuses appear behind every 13 A plug top — the table covers them all. Note the BS 1362
              value of 2.30 Ω at 13 A: for a fused spur appliance, the plug-top fuse is the
              protective device the spur cable has to be sized to disconnect, and that figure is the
              Zs limit on the appliance side of the FCU.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Table 41.2 (extract — BS 88-2 gG/gM fuses)"
            clause={
              <>
                For general purpose (gG) and motor circuit application (gM) fuses to BS 88-2 (fuse
                systems E bolted and G clip-in), Table 41.2 gives maximum earth fault loop impedance
                (Zs) values for a 0.4 s disconnection time at Up = 230 V for the following ratings:
                2 A: 33.1 Ω; 4 A: 15.6 Ω; 6 A: 7.80 Ω; 10 A: 4.65 Ω; 16 A: 2.43 Ω; 20 A: 1.68 Ω; 25
                A: 1.29 Ω; 32 A: 0.99 Ω; 40 A: 0.75 Ω; 50 A: 0.57 Ω; 63 A: 0.44 Ω. These Zs values
                shall not be exceeded for these fuse ratings when using such fuses to comply with
                411.3.2.2.
              </>
            }
            meaning="Eleven numbers, exact, taken straight from the BS 7671 table. Memorise the 16 A and 32 A entries — those are by far the most common in domestic and small commercial work — and look up the rest."
          />

          <ConceptBlock
            title="Table 41.3 — circuit-breakers (Type B / C / D) at Up = 230 V"
            plainEnglish="The most-used table in real life because the bulk of modern UK distribution boards are populated with Type B and Type C MCBs and RCBOs to BS EN 60898 / BS EN 61009-1. Table 41.3 covers both the 0.4 s and 5 s disconnection time requirements at Up = 230 V."
          >
            <p>Selected values from Table 41.3 at Up = 230 V:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Rating</th>
                    <th className="text-center text-white/80 py-2">Type B (Ω)</th>
                    <th className="text-center text-white/80 py-2">Type C (Ω)</th>
                    <th className="text-center text-elec-yellow py-2">Type D (Ω)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">6 A</td>
                    <td className="text-center">7.67</td>
                    <td className="text-center">3.64</td>
                    <td className="text-center text-elec-yellow">1.82</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">10 A</td>
                    <td className="text-center">4.36</td>
                    <td className="text-center">2.18</td>
                    <td className="text-center text-elec-yellow">1.09</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">16 A</td>
                    <td className="text-center">2.73</td>
                    <td className="text-center">1.36</td>
                    <td className="text-center text-elec-yellow">0.68</td>
                  </tr>
                  <tr className="border-b border-white/[0.06] bg-elec-yellow/5">
                    <td className="py-2 font-semibold">20 A</td>
                    <td className="text-center font-semibold">2.18</td>
                    <td className="text-center font-semibold">1.09</td>
                    <td className="text-center text-elec-yellow font-semibold">0.55</td>
                  </tr>
                  <tr className="border-b border-white/[0.06] bg-elec-yellow/5">
                    <td className="py-2 font-semibold">32 A</td>
                    <td className="text-center font-semibold">1.37</td>
                    <td className="text-center font-semibold">0.69</td>
                    <td className="text-center text-elec-yellow font-semibold">0.34</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">40 A</td>
                    <td className="text-center">1.09</td>
                    <td className="text-center">0.55</td>
                    <td className="text-center text-elec-yellow">0.27</td>
                  </tr>
                  <tr>
                    <td className="py-2">50 A</td>
                    <td className="text-center">0.87</td>
                    <td className="text-center">0.44</td>
                    <td className="text-center text-elec-yellow">0.22</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-white/50 italic">
              Highlighted rows: 20 A and 32 A — by far the most common ratings on modern domestic
              and small commercial boards. Values are at Up = 230 V; consult the full table for
              other ratings and for the explicit 0.4 s vs 5 s split where it applies.
            </p>
            <p>
              The pattern is mechanical: for the same rating, Type C limits are roughly half Type B,
              and Type D limits are roughly half Type C again. That is the magnetic trip multiplier
              at work — Type B trips at 5× rated current, Type C at 10×, Type D at 20×. To deliver
              those higher fault currents, the loop impedance has to be correspondingly lower.
            </p>
          </ConceptBlock>

          {/* Schedule of Circuit Details — A4 max permitted Zs column diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              A4:2026 Schedule of Circuit Details — the new max-permitted-Zs column
            </h4>
            <svg
              viewBox="0 0 800 380"
              className="w-full h-auto"
              role="img"
              aria-label="A4:2026 Schedule of Circuit Details. The diagram shows the schedule split into a circuit details page and a separate test results page, with the new maximum permitted Zs column highlighted on the circuit details page."
            >
              {/* Schedule of Circuit Details page */}
              <rect
                x="20"
                y="20"
                width="370"
                height="340"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="205"
                y="42"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
                fontWeight="bold"
              >
                SCHEDULE OF CIRCUIT DETAILS
              </text>
              <text x="205" y="58" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (design intent)
              </text>

              {/* Header row */}
              <rect x="35" y="80" width="340" height="22" fill="rgba(255,255,255,0.06)" />
              <text x="55" y="95" fill="rgba(255,255,255,0.65)" fontSize="9">
                Ckt
              </text>
              <text x="100" y="95" fill="rgba(255,255,255,0.65)" fontSize="9">
                Description
              </text>
              <text x="190" y="95" fill="rgba(255,255,255,0.65)" fontSize="9">
                Device
              </text>
              <text x="245" y="95" fill="rgba(255,255,255,0.65)" fontSize="9">
                In (A)
              </text>
              <text x="285" y="95" fill="rgba(255,255,255,0.65)" fontSize="9">
                CSA
              </text>
              <rect
                x="320"
                y="78"
                width="55"
                height="26"
                fill="rgba(251,191,36,0.18)"
                stroke="#FBBF24"
                strokeWidth="1.2"
              />
              <text
                x="347"
                y="93"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Max Zs
              </text>
              <text
                x="347"
                y="101"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="7"
                fontWeight="bold"
              >
                (Ω) — A4 NEW
              </text>

              {/* Sample rows */}
              <rect x="35" y="110" width="340" height="22" fill="rgba(255,255,255,0.02)" />
              <text x="55" y="125" fill="rgba(255,255,255,0.85)" fontSize="9">
                1
              </text>
              <text x="100" y="125" fill="rgba(255,255,255,0.85)" fontSize="9">
                Sockets ground
              </text>
              <text x="190" y="125" fill="rgba(255,255,255,0.85)" fontSize="9">
                B
              </text>
              <text x="245" y="125" fill="rgba(255,255,255,0.85)" fontSize="9">
                32
              </text>
              <text x="285" y="125" fill="rgba(255,255,255,0.85)" fontSize="9">
                2.5
              </text>
              <text
                x="347"
                y="125"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                0.69
              </text>

              <rect x="35" y="135" width="340" height="22" fill="rgba(255,255,255,0.02)" />
              <text x="55" y="150" fill="rgba(255,255,255,0.85)" fontSize="9">
                2
              </text>
              <text x="100" y="150" fill="rgba(255,255,255,0.85)" fontSize="9">
                Sockets first floor
              </text>
              <text x="190" y="150" fill="rgba(255,255,255,0.85)" fontSize="9">
                B
              </text>
              <text x="245" y="150" fill="rgba(255,255,255,0.85)" fontSize="9">
                32
              </text>
              <text x="285" y="150" fill="rgba(255,255,255,0.85)" fontSize="9">
                2.5
              </text>
              <text
                x="347"
                y="150"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                0.45 *
              </text>

              <rect x="35" y="160" width="340" height="22" fill="rgba(255,255,255,0.02)" />
              <text x="55" y="175" fill="rgba(255,255,255,0.85)" fontSize="9">
                3
              </text>
              <text x="100" y="175" fill="rgba(255,255,255,0.85)" fontSize="9">
                Lighting GF
              </text>
              <text x="190" y="175" fill="rgba(255,255,255,0.85)" fontSize="9">
                B
              </text>
              <text x="245" y="175" fill="rgba(255,255,255,0.85)" fontSize="9">
                6
              </text>
              <text x="285" y="175" fill="rgba(255,255,255,0.85)" fontSize="9">
                1.5
              </text>
              <text
                x="347"
                y="175"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                7.67
              </text>

              <rect x="35" y="185" width="340" height="22" fill="rgba(255,255,255,0.02)" />
              <text x="55" y="200" fill="rgba(255,255,255,0.85)" fontSize="9">
                4
              </text>
              <text x="100" y="200" fill="rgba(255,255,255,0.85)" fontSize="9">
                Cooker
              </text>
              <text x="190" y="200" fill="rgba(255,255,255,0.85)" fontSize="9">
                B
              </text>
              <text x="245" y="200" fill="rgba(255,255,255,0.85)" fontSize="9">
                32
              </text>
              <text x="285" y="200" fill="rgba(255,255,255,0.85)" fontSize="9">
                6.0
              </text>
              <text
                x="347"
                y="200"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                0.69
              </text>

              <rect x="35" y="210" width="340" height="22" fill="rgba(255,255,255,0.02)" />
              <text x="55" y="225" fill="rgba(255,255,255,0.85)" fontSize="9">
                5
              </text>
              <text x="100" y="225" fill="rgba(255,255,255,0.85)" fontSize="9">
                EV charger
              </text>
              <text x="190" y="225" fill="rgba(255,255,255,0.85)" fontSize="9">
                C
              </text>
              <text x="245" y="225" fill="rgba(255,255,255,0.85)" fontSize="9">
                32
              </text>
              <text x="285" y="225" fill="rgba(255,255,255,0.85)" fontSize="9">
                6.0
              </text>
              <text
                x="347"
                y="225"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                0.69
              </text>

              <text x="40" y="265" fill="rgba(255,255,255,0.45)" fontSize="8" fontStyle="italic">
                * design value tightened below
              </text>
              <text x="40" y="278" fill="rgba(255,255,255,0.45)" fontSize="8" fontStyle="italic">
                Table 41.3 raw (long cable run)
              </text>

              <rect
                x="35"
                y="305"
                width="340"
                height="40"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
                rx="6"
              />
              <text x="205" y="322" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                A4:2026 — circuit details on its own page,
              </text>
              <text
                x="205"
                y="335"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Max Zs column captures design intent
              </text>

              {/* Arrow → */}
              <line
                x1="395"
                y1="190"
                x2="430"
                y2="190"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="2"
              />
              <polygon points="430,190 422,185 422,195" fill="rgba(255,255,255,0.6)" />
              <text
                x="412"
                y="180"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="9"
                fontWeight="bold"
              >
                verify
              </text>

              {/* Schedule of Test Results page */}
              <rect
                x="440"
                y="20"
                width="340"
                height="340"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="610"
                y="42"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
                fontWeight="bold"
              >
                SCHEDULE OF TEST RESULTS
              </text>
              <text x="610" y="58" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (measured values)
              </text>

              {/* Test results header */}
              <rect x="455" y="80" width="310" height="22" fill="rgba(255,255,255,0.06)" />
              <text x="475" y="95" fill="rgba(255,255,255,0.65)" fontSize="9">
                Ckt
              </text>
              <text x="510" y="95" fill="rgba(255,255,255,0.65)" fontSize="9">
                R1+R2
              </text>
              <text x="565" y="95" fill="rgba(255,255,255,0.65)" fontSize="9">
                IR
              </text>
              <rect
                x="610"
                y="78"
                width="60"
                height="26"
                fill="rgba(34,197,94,0.12)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="640"
                y="93"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                Zs (Ω)
              </text>
              <text x="640" y="101" textAnchor="middle" fill="#22C55E" fontSize="7">
                measured
              </text>
              <text x="710" y="95" fill="rgba(255,255,255,0.65)" fontSize="9">
                Pass
              </text>

              {/* Test rows */}
              <text x="475" y="125" fill="rgba(255,255,255,0.85)" fontSize="9">
                1
              </text>
              <text x="510" y="125" fill="rgba(255,255,255,0.85)" fontSize="9">
                0.32
              </text>
              <text x="565" y="125" fill="rgba(255,255,255,0.85)" fontSize="9">
                &gt;299
              </text>
              <text
                x="640"
                y="125"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                0.51
              </text>
              <text x="710" y="125" fill="#22C55E" fontSize="9">
                ✓
              </text>

              <text x="475" y="150" fill="rgba(255,255,255,0.85)" fontSize="9">
                2
              </text>
              <text x="510" y="150" fill="rgba(255,255,255,0.85)" fontSize="9">
                0.18
              </text>
              <text x="565" y="150" fill="rgba(255,255,255,0.85)" fontSize="9">
                &gt;299
              </text>
              <text
                x="640"
                y="150"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                0.41
              </text>
              <text x="710" y="150" fill="#22C55E" fontSize="9">
                ✓
              </text>

              <text x="475" y="175" fill="rgba(255,255,255,0.85)" fontSize="9">
                3
              </text>
              <text x="510" y="175" fill="rgba(255,255,255,0.85)" fontSize="9">
                0.45
              </text>
              <text x="565" y="175" fill="rgba(255,255,255,0.85)" fontSize="9">
                &gt;299
              </text>
              <text
                x="640"
                y="175"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                0.66
              </text>
              <text x="710" y="175" fill="#22C55E" fontSize="9">
                ✓
              </text>

              <text x="475" y="200" fill="rgba(255,255,255,0.85)" fontSize="9">
                4
              </text>
              <text x="510" y="200" fill="rgba(255,255,255,0.85)" fontSize="9">
                0.21
              </text>
              <text x="565" y="200" fill="rgba(255,255,255,0.85)" fontSize="9">
                &gt;299
              </text>
              <text
                x="640"
                y="200"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                0.43
              </text>
              <text x="710" y="200" fill="#22C55E" fontSize="9">
                ✓
              </text>

              <text x="475" y="225" fill="rgba(255,255,255,0.85)" fontSize="9">
                5
              </text>
              <text x="510" y="225" fill="rgba(255,255,255,0.85)" fontSize="9">
                0.19
              </text>
              <text x="565" y="225" fill="rgba(255,255,255,0.85)" fontSize="9">
                &gt;299
              </text>
              <text
                x="640"
                y="225"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                0.40
              </text>
              <text x="710" y="225" fill="#22C55E" fontSize="9">
                ✓
              </text>

              <rect
                x="455"
                y="305"
                width="310"
                height="40"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.2)"
                strokeWidth="1"
                rx="6"
              />
              <text x="610" y="322" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Compare measured Zs (corrected) against
              </text>
              <text
                x="610"
                y="335"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                Max Zs from circuit details — pass / fail
              </text>
            </svg>
          </div>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.4.202 (circuit-breakers, Table 41.3)"
            clause={
              <>
                Regulation 411.4.202 specifically addresses the determination of maximum earth fault
                loop impedance (Zs) where a circuit-breaker is used to satisfy the automatic
                disconnection of supply requirements of Regulations 411.3.2.2 (0.4 s) and 411.3.2.3
                (5 s), including use of a table (Table 41.3) as an alternative to calculation for Up
                = 230 V.
              </>
            }
            meaning="Table 41.3 is the BS EN 60898 / BS EN 61009-1 lookup. Use it where the type and rating exactly match an entry. For non-listed devices or for a system at any voltage other than 230 V, fall back to the Reg 411.4.4 calculation."
          />

          <ConceptBlock
            title="Table 41.4 — fuses at 5 s, distribution circuits"
            plainEnglish="Distribution circuits (the cables feeding sub-mains and distribution boards) and final circuits supplying fixed equipment at higher ratings are allowed up to 5 s disconnection time under Reg 411.3.2.3. Table 41.4 gives the corresponding fuse Zs maxima — the values are higher than Table 41.2 because the device has more time to operate."
          >
            <p>
              The 5 s disconnection allowance reflects the fact that distribution circuits feeding
              downstream final-circuit boards do not directly serve sockets or hand-held equipment,
              so the touch-voltage exposure is via downstream protection, not via direct contact
              with a faulted distribution conductor. The trade-off is that the table values are
              larger — a 100 A BS 88-2 fuse in a sub-main is typically allowed Zs up to ≈ 0.46 Ω at
              5 s vs ≈ 0.29 Ω at 0.4 s.
            </p>
            <p>
              If the distribution circuit is also RCD-protected (now common on TT systems and
              increasingly required on TN-C-S where additional protection has been mandated), then
              the Reg 411.5 / Table 41.5 RCD-based limits apply in parallel and the binding
              constraint is whichever limit is tighter.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Table 41.5 — RCDs by rated residual operating current"
            plainEnglish="Where the protective device for fault protection is an RCD, Table 41.5 gives the maximum permitted Zs as 50 V / IΔn — the touch-voltage limit divided by the rated residual operating current. The values are wildly more permissive than the overcurrent tables, because the RCD operates on residual current, not on loop fault current."
          >
            <p>
              From Table 41.5 at Up = 230 V (non-delayed and &lsquo;S&rsquo; Type RCDs to BS EN
              61008-1 / BS EN 61009-1):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">IΔn (rated residual)</th>
                    <th className="text-center text-elec-yellow py-2">Max Zs (Ω)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">30 mA</td>
                    <td className="text-center text-elec-yellow">1667</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">100 mA</td>
                    <td className="text-center text-elec-yellow">500</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">300 mA</td>
                    <td className="text-center text-elec-yellow">167</td>
                  </tr>
                  <tr>
                    <td className="py-2">500 mA</td>
                    <td className="text-center text-elec-yellow">100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              On a TN final circuit also covered by an MCB, the binding constraint is almost always
              Table 41.3 (overcurrent), not Table 41.5 (RCD). On a TT installation, the overcurrent
              limit is unachievable and Table 41.5 is the binding constraint. On any circuit where
              the overcurrent device cannot meet its Table 41.2 / 41.3 limit, an RCD upstream is the
              permitted mitigation and Table 41.5 governs.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The temperature correction — NOTE 2 and Appendix 3</ContentEyebrow>

          <ConceptBlock
            title="Why the table values assume hot conductors"
            plainEnglish="The table values are stated for the worst case the protective device might face in service: line conductors at maximum operating temperature (typically 70°C for thermoplastic-insulated cable per Table 52.2) and CPCs at the assumed initial temperature given in Tables 54.2–54.5. Hot conductors have higher resistance, so the loop impedance the device sees in service is higher than what you measure on a cold installation."
          >
            <p>
              Conductor resistance for copper rises by approximately 0.4&nbsp;%/&deg;C. For a cable
              that runs at 70&nbsp;°C in service vs 20&nbsp;°C on the test bench, the conductor
              resistance is roughly 1 + 0.4&nbsp;% × (70 − 20) ≈ 1.20× the cold value. That is the
              famous &times;1.20 factor cited in continuity testing and Zs verification.
            </p>
            <p>Two equivalent ways to apply NOTE 2 to a cold-installation Zs measurement:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Correct the measurement upward:</strong> measured Zs at 20&nbsp;°C × 1.20 =
                predicted Zs at 70&nbsp;°C. Compare against the raw table value.
              </li>
              <li>
                <strong>Correct the table limit downward:</strong> table value × 0.80 (or use the
                Appendix 3 expression directly). Compare against the cold measurement.
              </li>
            </ol>
            <p>
              Both routes produce the same compliance verdict. The tester convention varies: some
              multifunction testers accept a cable temperature input and do the correction
              internally, presenting a single corrected reading; others present the raw measurement
              and leave the correction to the schedule of test results. Which one your meter does is
              on the manual&rsquo;s spec page — read it once and configure consistently.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · NOTE 2 to Tables 41.2 / 41.3"
            clause={
              <>
                NOTE 2 states that the Zs values given in the table should not be exceeded when: (a)
                the line conductors are at the appropriate maximum permitted operating temperature,
                as given in Table 52.2; and (b) the circuit protective conductors are at the
                appropriate assumed initial temperature, as given in Tables 54.2 to 54.5. If the
                conductors are at a different temperature when tested, the reading should be
                adjusted accordingly (see Appendix 3).
              </>
            }
            meaning="The table values are hot-conductor values. A cold-conductor measurement (the normal case at testing time) must be temperature-corrected — either the measurement upward, or the table downward — before the comparison is made. Skipping the correction is the most common reason a marginal pass is recorded as compliant when it is not."
          />

          <ConceptBlock
            title="Appendix 3 — the 0.8 factor as a single-step verification"
            plainEnglish="Appendix 3 gives a verification expression that bundles the temperature correction and the minimum voltage factor into a single 0.8 multiplier. Zs(measured) ≤ 0.8 × (Up × Cmin / Ia). It is the on-site shorthand for &lsquo;is my measurement comfortably within the design limit at the worst case&rsquo;."
            onSite="Some inspectors apply 0.8 to the table value for a same-units comparison: limit × 0.8 vs measured. Others correct the measurement to 70°C with ×1.20 and compare to the raw table. The two approaches are equivalent (1/1.20 ≈ 0.833) and the small difference is the additional Cmin allowance Appendix 3 builds in."
          >
            <p>The Appendix 3 acceptance equation, written in the BS 7671 form:</p>
            <div className="my-3 px-4 py-3 bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl text-center text-[15px] font-mono text-elec-yellow">
              Zs(measured) ≤ 0.8 × (Up × Cmin / Ia)
            </div>
            <p>
              The 0.8 factor is the conventional thermal/voltage rule-of-thumb that BS 7671 uses to
              bridge between measurement-temperature and operating-temperature conditions. It is not
              a meter accuracy allowance, not a parallel-path correction, and not a manufacturer
              tolerance — it is the regulation&rsquo;s own safety margin built into the verification
              arithmetic.
            </p>
            <p>In practice, on site, the simplest workflow is:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Read the maximum permitted Zs for the device from Table 41.3 (or the design value
                from the A4:2026 schedule of circuit details column).
              </li>
              <li>Multiply that limit by 0.8 to give the cold-measurement compliance ceiling.</li>
              <li>
                Compare your measured Zs (cold, ambient) against that ceiling. Within → pass. Above
                → fail or investigate.
              </li>
            </ol>
            <p>
              For a 32 A Type B (Table 41.3 limit 0.69 Ω): cold-measurement ceiling = 0.69 × 0.8 ≈
              0.55 Ω. Anything below 0.55 Ω cold is comfortably compliant; anything between 0.55 Ω
              and 0.69 Ω needs the explicit temperature correction; anything above 0.69 Ω cold fails
              on inspection.
            </p>
          </ConceptBlock>

          <Scenario
            title="Worked Zs verification — 32 A Type B kitchen ring final"
            situation="A 32 A Type B B-curve MCB protects a kitchen ring final wired in 2.5/1.5 mm² T&E. Ze at the origin is 0.32 Ω. Measured R1+R2 (from Section 3.1 work) at the worst-case socket, taken cold at 20°C, is 0.43 Ω. You need to verify the circuit Zs against Table 41.3."
            whatToDo={
              <>
                <span className="block">
                  <strong>Step 1 — calculate predicted Zs at 70°C:</strong> Zs = Ze + (R1+R2 × 1.20)
                  = 0.32 + (0.43 × 1.20) = 0.32 + 0.52 = 0.84 Ω.
                </span>
                <span className="block">
                  <strong>Step 2 — compare to Table 41.3 raw limit (32 A Type B):</strong> 0.84 Ω vs
                  0.69 Ω → fail at 70°C.
                </span>
                <span className="block">
                  <strong>Step 3 — sanity-check via the Appendix 3 0.8 method:</strong> cold
                  compliance ceiling = 0.69 × 0.8 = 0.55 Ω. Measured cold Zs ≈ Ze + R1+R2 = 0.32 +
                  0.43 = 0.75 Ω. 0.75 Ω &gt; 0.55 Ω → fail by both methods.
                </span>
                <span className="block">
                  <strong>Step 4 — investigate.</strong> Likely: cable run longer than designed,
                  joint degradation, or design error. Either re-design the circuit (larger CPC,
                  shorter run) or change the protective device (Type C will not help — Table 41.3 32
                  A C = 0.69 Ω is unchanged; smaller rating? RCD-only fault protection? consider
                  TT-style RCD compliance via Table 41.5).
                </span>
              </>
            }
            whyItMatters="A circuit that passes the raw Table 41.3 number at ambient temperature can still fail at 70°C. The temperature correction is what stops you signing off a circuit that will exceed its disconnection time when the cable is loaded. Appendix 3's 0.8 factor is the on-site fast check that catches this."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The A4:2026 max-permitted-Zs column</ContentEyebrow>

          <ConceptBlock
            title="What changed in the model forms — and why it matters"
            plainEnglish="Before A4:2026, the EIC schedule was a single page with circuit details and test results jumbled together, and the verification step relied on the inspector reading Table 41.3 mentally for each circuit. A4:2026 split the schedule into two pages — Schedule of Circuit Details and Schedule of Test Results — and added an explicit max-permitted-Zs column on the circuit-details page. The verification is now a side-by-side compare of the measured Zs (test results page) against the design max Zs (circuit details page)."
            onSite="The new column captures the design intent — and design intent can be tighter than the raw Table 41.3 value. A long cable run, a future-load allowance, a selectivity requirement, or a tight voltage-drop budget can all push the design max Zs below the raw table. The verifier's job is to evidence compliance against the design value, not the raw table."
          >
            <p>
              The A4:2026 redrafted schedule is captured in the BS 7671 commentary: the single-page
              generic schedule of test results used for EIC and EICR has been redrafted into a
              separate page for the schedule of circuit details and a separate page for the schedule
              of test results.
            </p>
            <p>The Schedule of Circuit Details now carries, for each circuit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Circuit number and description</li>
              <li>Type and rating of the protective device</li>
              <li>Conductor csa (line, neutral, CPC)</li>
              <li>Reference Method, installed length, and design current Ib</li>
              <li>Calculated voltage drop</li>
              <li>
                <strong className="text-elec-yellow">Maximum permitted Zs</strong> — the design
                limit for this circuit, taken from Table 41.3 (or 41.2 / 41.4 / 41.5 as appropriate){' '}
                <em>or tighter</em> if the design demands it
              </li>
            </ul>
            <p>
              The Schedule of Test Results then carries the measured values: continuity (R1+R2),
              insulation resistance, polarity, measured Zs, RCD trip times, etc. The verification
              step becomes mechanical: for each circuit row, compare the measured Zs (corrected to
              operating temperature, or compared via the 0.8 expression) against the max permitted
              Zs in the circuit details column.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Model forms commentary (Appendix 6 redraft)"
            clause={
              <>
                The single page generic schedule of test results used for EIC and EICR has been
                redrafted. There is now a separate page for the schedule of circuit details and a
                separate page for the schedule of test results. Practitioners shall use the updated
                separate pages when completing EIC/EICR documentation.
              </>
            }
            meaning="A4:2026 split design from verification — the circuit details page captures what the design said, the test results page captures what the field measured. The max-permitted-Zs column on the circuit details page is the design's Zs commitment, and the verification step is the side-by-side compare."
          />

          <CommonMistake
            title="Comparing measured Zs against the raw Table 41.3 value when the design intent is tighter"
            whatHappens="The designer wrote 0.45 Ω as the max permitted Zs for circuit 2 in the A4:2026 schedule of circuit details, because the cable is long and the voltage-drop budget tightened the limit. You measure 0.62 Ω, see that it is below the raw Table 41.3 value of 0.69 Ω for a 32 A Type B, and tick the box. The certificate now says compliant against a limit the design did not set. Two years later a load-extension causes a real disconnection failure — and the records show the original verification did not evidence the design intent."
            doInstead="Always read the max-permitted-Zs column on the circuit details page. If the column is empty or shows the raw Table 41.3 value, you compare against that. If it shows a tighter value, you compare against that. The verifier's responsibility is to evidence the design as designed, not the design as the regulation minimum permits."
          />

          <CommonMistake
            title="Forgetting to apply the temperature correction"
            whatHappens="You measure Zs = 0.65 Ω cold on a 32 A Type B circuit, see it is below the raw 0.69 Ω limit, record 0.65 Ω, tick compliant. At 70°C operating temperature the actual Zs is 0.65 × 1.20 ≈ 0.78 Ω — over the limit. The MCB will not disconnect within 0.4 s under a real fault when the cable is loaded. The certificate is wrong, the disconnection time is non-compliant, and the evidence trail says it was compliant the day you signed."
            doInstead="Every Zs comparison gets a temperature correction. Either correct the measurement (×1.20 for 70°C cable) and compare to the raw limit, or correct the limit (×0.8 via Appendix 3) and compare to the cold measurement. Most modern multifunction testers offer a corrected-Zs view if you tell the meter the cable temperature — use it."
          />

          <CommonMistake
            title="Applying Table 41.3 to a TT installation"
            whatHappens="A TT installation has a 32 A Type B MCB protecting a final circuit. You measure Zs and read 95 Ω (Ze ≈ 95 Ω because the TT electrode dominates). You compare against Table 41.3 (0.69 Ω) and fail the circuit. You spend the morning chasing electrodes and recommending impossible upgrades. The whole exercise is misframed: TT compliance is RCD-driven, not overcurrent-driven."
            doInstead="On TT, default to Table 41.5 + Ra × IΔn ≤ 50 V. For the 30 mA RCD that protects the circuit, max Zs is 1667 Ω — 95 Ω is fine. Confirm the RCD trip time under a fault simulation (Reg 643.7 / 643.8) and the touch-voltage check (Ra × IΔn = 95 × 0.03 = 2.85 V, well below 50 V). The Reg 411.4 / Table 41.3 path simply does not apply on TT."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The eight diagnostic outcomes for a Zs verification</ContentEyebrow>

          <ConceptBlock
            title="Reading a Zs result and knowing what to do next"
            plainEnglish="A Zs verification is not pass/fail — it is one of eight outcomes, each with a different remediation path."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">Comfortably below 0.8 × table:</strong> Pass
                with margin. Record. Move to the next circuit.
              </li>
              <li>
                <strong className="text-emerald-300">
                  Between 0.8 × table and table after correction:
                </strong>{' '}
                Marginal pass. Recheck the measurement; confirm Ze and R1+R2 separately. If still
                marginal, document and consider a smaller protective device or larger CPC on a
                future alteration.
              </li>
              <li>
                <strong className="text-amber-300">
                  Above table at operating temperature, below cold:
                </strong>{' '}
                Fail at design temperature. Investigate cable run length, terminations, and CPC
                size. Most often a longer-than-designed cable or a degraded joint.
              </li>
              <li>
                <strong className="text-amber-300">Above table even cold:</strong> Hard fail. Either
                the design is wrong (under-sized CPC, wrong device type) or a fault has developed
                (broken CPC strand, loose termination). Investigate before signing.
              </li>
              <li>
                <strong className="text-amber-300">
                  Above raw Table 41.3 but below A4 schedule design value where designer set it
                  looser:
                </strong>{' '}
                Rare and a flag for design review. The designer cannot legally set a max Zs above
                Table 41.3 without an alternative compliance route documented (e.g. RCD-based via
                Table 41.5).
              </li>
              <li>
                <strong className="text-amber-300">
                  Below raw table but above A4 schedule design value where designer tightened it:
                </strong>{' '}
                Fail against design. Compliance is judged against the designed limit. Either recheck
                the cable, or escalate to the designer for a re-spec and re-verification.
              </li>
              <li>
                <strong className="text-emerald-300">
                  High but TT with RCD compliance via Table 41.5:
                </strong>{' '}
                Pass via the RCD route. Document explicitly that compliance is via Reg 411.5.3 /
                Table 41.5, not Reg 411.4 / Table 41.3.
              </li>
              <li>
                <strong className="text-red-300">Open circuit (∞):</strong> Hard fail. Broken loop
                somewhere — usually a CPC. Stop, recheck Method 1 link if used, then trace the open
                with continuity Method 2 (the wandering lead).
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 model forms</ContentEyebrow>

          <ConceptBlock
            title="What goes where — a practical checklist"
            plainEnglish="The A4:2026 split between circuit details and test results means recording is two-step: capture the design once, capture the measurements per visit. Get this right and the next inspector has everything they need; get it wrong and the verification trail is ambiguous."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Schedule of Circuit Details — Maximum Permitted Zs column:</strong> the
                design limit, in ohms, two decimals. Default is the raw Table 41.2 / 41.3 / 41.4 /
                41.5 value for the protective device. Tighter if the designer has tightened it; the
                design notes should state why (long run, voltage-drop budget, future-load
                allowance).
              </li>
              <li>
                <strong>Schedule of Test Results — Zs column:</strong> the measured value, in ohms,
                two decimals. State whether the value is the raw meter reading or
                temperature-corrected; consistency across the schedule matters more than which
                convention you pick.
              </li>
              <li>
                <strong>Comments column:</strong> anything non-standard. Compliance via Table 41.5
                (RCD route) on TT or where Table 41.3 cannot be met. Temperature-corrected vs raw.
                RCD-protected circuit with the binding constraint at the RCD limit, not the MCB
                limit. Long cable run noted.
              </li>
            </ul>
            <p>
              On the EIC overall, the Supply Characteristics block records Ze (Section 5.3) and the
              type and rating of the origin protective device — those are the inputs to every
              per-circuit Zs verification, and the A4:2026 forms make the chain explicit: Ze → R1+R2
              → predicted Zs → measured Zs → max permitted Zs → pass / fail.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Four Zs tables in Chapter 41: 41.2 fuses 0.4 s, 41.3 circuit-breakers (B/C/D) for both 0.4 s and 5 s, 41.4 fuses 5 s, 41.5 RCDs.',
              'All values stated at Up = 230 V and at maximum operating temperature. NOTE 2 mandates temperature correction when comparing against a cold measurement.',
              'On-site shorthand: cold-measurement ceiling = table value × 0.8 (Appendix 3). Or correct the measurement ×1.20 for 70°C and compare against the raw table.',
              'Common Type B Zs limits to memorise: 6 A → 7.67 Ω, 16 A → 2.73 Ω, 20 A → 2.18 Ω, 32 A → 0.69 Ω, 40 A → 1.09 Ω.',
              'Type C ≈ half the Type B limit for the same rating; Type D ≈ half the Type C. Tighter trip threshold demands lower loop impedance.',
              'A4:2026 split the schedule into circuit details + test results, with a max-permitted-Zs column on the circuit details page. The design value, not the raw table, is the verification target.',
              'On TT, Table 41.3 is irrelevant — the electrode-dominated loop cannot meet overcurrent disconnection. Compliance routes via Reg 411.5.3 / Table 41.5 + Ra × IΔn ≤ 50 V.',
              'A circuit can pass cold and fail hot. The temperature correction is non-negotiable for sign-off — never skip it.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Where do the table values come from? Why is a 32 A Type B 0.69 Ω and not, say, 1.0 Ω?',
                answer:
                  'The values come from Reg 411.4.4: Zs = Up × Cmin / Ia. For a Type B 32 A, the magnetic trip is at Ia ≈ 5 × 32 = 160 A. With Up = 230 V and Cmin = 0.95, Zs(max) ≈ 230 × 0.95 / 160 ≈ 1.37 Ω. The table further conditions this for the assumption that conductors are at maximum operating temperature — which is what NOTE 2 makes explicit — landing the published table value at 0.69 Ω. The "raw" 1.37 Ω is the formula limit before the temperature/voltage assumptions; the 0.69 Ω is what the table publishes for direct comparison.',
              },
              {
                question:
                  'Do I have to apply temperature correction even when the meter shows a corrected Zs?',
                answer:
                  'If the meter has done the correction (you have entered cable temperature and the meter is in corrected-Zs mode), no — that is the point of the feature. But you must know which mode the meter is in before recording. Some testers default to raw, some to corrected; some ask each session. The convention to set on the schedule of test results is "values shown are temperature-corrected to 70°C" or "values are raw ambient" — pick one, document it, do not mix.',
              },
              {
                question:
                  'My meter accuracy spec is ±5%. The table value is 0.69 Ω. Where is the genuine pass / fail line?',
                answer:
                  'A measured 0.69 Ω with ±5% accuracy is genuinely between 0.65 Ω and 0.72 Ω. Apply the cold-measurement ceiling (0.69 × 0.8 = 0.55 Ω) and you have plenty of margin against meter tolerance below the ceiling. Anywhere between 0.55 Ω and 0.69 Ω cold needs the explicit temperature correction. Above 0.69 Ω cold is a fail regardless of meter tolerance — the table assumes 70°C, your cold reading already exceeds the worst-case operating-temperature limit.',
              },
              {
                question: 'What if the protective device is a Type B 32 A RCBO instead of an MCB?',
                answer:
                  'The Table 41.3 value applies — Reg 411.4.202(a) explicitly covers "Type B / C / D circuit-breakers to BS EN 60898 and the overcurrent characteristics of RCBOs to BS EN 61009-1". The overcurrent characteristic of the RCBO governs the Table 41.3 limit. The RCD characteristic of the same RCBO additionally satisfies Table 41.5 if Reg 411.5.3 is being relied on for fault protection — but on a TN final circuit, the binding constraint is almost always the overcurrent limit, not the RCD limit.',
              },
              {
                question:
                  'A circuit fails the Table 41.3 limit at 70°C but passes at ambient. Can I sign it off if the cable rarely runs at full load?',
                answer:
                  'No. The regulation does not allow "rarely" as a compliance argument. The table values are the ceiling that must hold under worst-case operating conditions. If the circuit fails at 70°C, the disconnection time will not be met when the cable is loaded — and the cable will be loaded at full design current at some point. The remediation routes are: shorter cable, larger CPC, smaller protective device, or alternative compliance via RCD (Table 41.5).',
              },
              {
                question:
                  'On a TT supply with all final circuits RCD-protected, do I need to test Zs against Table 41.3 at all?',
                answer:
                  'You measure Zs as part of Reg 643.7 — that is unchanged. But the comparison is against Table 41.5 (RCD limits) and the Ra × IΔn ≤ 50 V condition, not Table 41.3. The Table 41.3 limits will fail spectacularly on any TT installation because the electrode-dominated loop is far too high — that is structurally unavoidable. Document on the schedule of test results that compliance is via Table 41.5 / 411.5.3, not Table 41.3 / 411.4. The measurement is the same; the compliance frame is different.',
              },
              {
                question:
                  'How does the A4:2026 max-permitted-Zs column interact with circuits that span multiple boards (sub-mains)?',
                answer:
                  'Each board has its own Schedule of Circuit Details, so each board records its own circuit max-permitted-Zs values. Sub-mains feeding a downstream board are themselves "circuits" on the upstream schedule with their own Zs limit (typically against Table 41.4 for 5 s disconnection on distribution circuits). The sub-main Zs becomes the Ze for the downstream board — record this explicitly, ideally with the upstream board reference, so the verification chain is traceable end-to-end.',
              },
              {
                question:
                  'I have a circuit where measured Zs is 1.2 Ω, the protective device is a 32 A Type B (table limit 0.69 Ω), but it is RCD-protected by a 30 mA RCD. Compliant?',
                answer:
                  'Yes — via the RCD route. Reg 411.5.3 permits compliance through the RCD where the overcurrent limit cannot be met. The Table 41.5 limit at 30 mA is 1667 Ω; 1.2 Ω is comfortably within it. Document that compliance is via 411.5.3 / Table 41.5 in the comments, and check the RCD trip time under fault conditions on the schedule of test results. This is exactly the route that Reg 411.5 was written to provide for situations where Table 41.3 cannot be met.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Maximum Zs values — Module 5.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-5/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.5 Prospective fault current calculation
              </div>
            </button>
          </div>

          <div className="hidden">
            <TableIcon />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule5Section4;
