/**
 * Module 3 · Section 4 · Sub 5 — Earth fault loop impedance path
 * Maps to City & Guilds 2365-02 / Unit 203 / LO4 / AC 4.5
 *   AC 4.5 — "Identify component parts of an earth loop impedance path"
 *
 * Frame: The path a fault current takes from a fault back to source. Every
 * link adds resistance. Total too high = MCB/RCD doesn’t trip = fault stays
 * live = somebody dies.
 * Worked Zs maths — every value verified against BS 7671 Table 41.3.
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

const TITLE = 'Earth fault loop impedance path | Level 2 Module 3.4.5 | Elec-Mate';
const DESCRIPTION =
  'Ze, R1+R2, Zs — the components of the earth fault loop, BS 7671 Table 41.3 maximum values, and worked numerical examples for Type B MCBs verified against the regs.';

const checks = [
  {
    id: 'm3-s4-sub5-zs-formula',
    question:
      'Which equation correctly defines Zs for a final circuit on a TN system?',
    options: [
      'Zs = Ze − (R1 + R2)',
      'Zs = Ze + (R1 + R2)',
      'Zs = Ze × (R1 + R2)',
      'Zs = Ze ÷ (R1 + R2)',
    ],
    correctIndex: 1,
    explanation:
      'Zs = Ze + (R1 + R2). Ze is the supply-side impedance (substation transformer back to your MET via the DNO supply); R1+R2 is the installation-side impedance (line conductor + CPC of the final circuit). Add them — they’re in series in the fault loop.',
  },
  {
    id: 'm3-s4-sub5-table-413',
    question:
      'A Type B 32 A MCB protects a final circuit on a TN-C-S system. From BS 7671 Table 41.3, what is the maximum Zs for a 0.4 s disconnection at U₀ = 230 V?',
    options: ['7.28 Ω', '4.37 Ω', '1.37 Ω', '0.42 Ω'],
    correctIndex: 2,
    explanation:
      'Table 41.3 — Type B MCB to BS EN 60898 at U₀ = 230 V: B6 = 7.28 Ω, B10 = 4.37 Ω, B16 = 2.73 Ω, B20 = 2.19 Ω, B32 = 1.37 Ω, B40 = 1.09 Ω. The 32 A row gives 1.37 Ω. Same circuit on Type C 32 A would be 0.68 Ω (lower because Type C trips at 10× In rather than 5× In).',
  },
  {
    id: 'm3-s4-sub5-r1r2-calc',
    question:
      'A Type B 32 A circuit on TN-C-S has measured Ze = 0.35 Ω. Table 41.3 max Zs = 1.37 Ω. What is the maximum allowable measured R1+R2 if you correct the Table 41.3 value by the 0.8 factor for cable temperature at the time of test?',
    options: [
      '0.75 Ω',
      '1.02 Ω',
      '1.37 Ω',
      '0.45 Ω',
    ],
    correctIndex: 0,
    explanation:
      'Apply the 0.8 rule (BS 7671 method to correct Table 41 maximum Zs values from operating temperature down to test ambient ~20 °C): max permitted measured Zs = 1.37 × 0.8 = 1.096 Ω ≈ 1.10 Ω. Subtract Ze: max R1+R2 = 1.10 − 0.35 = 0.75 Ω. If your test reads above this, the circuit doesn’t comply at 0.4 s disconnection on a worst-case hot-cable scenario.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What does Ze represent?',
    options: [
      'The total earth fault loop impedance of the circuit.',
      'The earth fault loop impedance external to the installation — substation transformer + supply cable + DNO earth path back to source. Measured at the MET with the installation isolated.',
      'The internal CPC resistance.',
      'The earth electrode resistance only.',
    ],
    correctAnswer: 1,
    explanation:
      'Ze = the supply-side impedance, from your MET back through the DNO network to the source neutral. Measured at the MET (with the installation isolated, often by lifting the main earthing conductor and measuring back through the MET) using a loop tester. Typical values: TN-C-S 0.35 Ω, TN-S 0.8 Ω, TT 21 Ω or much higher.',
  },
  {
    id: 2,
    question:
      'On a final circuit, R1+R2 represents:',
    options: [
      'The supply-side impedance.',
      'The line conductor resistance (R1) plus the CPC resistance (R2) for the circuit, end to end — the installation-side portion of the earth fault loop.',
      'The neutral conductor resistance.',
      'Two separate resistance values measured at different times.',
    ],
    correctAnswer: 1,
    explanation:
      'R1 = resistance of the line conductor from MCB out to the furthest accessory. R2 = resistance of the CPC over the same run. Add them: R1+R2 is the installation-side contribution to Zs. Measured at initial verification by a low-resistance ohmmeter with the line and CPC linked at one end.',
  },
  {
    id: 3,
    question:
      'A circuit shows the following at the consumer unit: Ze = 0.35 Ω (TN-C-S), R1+R2 measured = 0.62 Ω. What is Zs and is it compliant for a Type B 32 A MCB? (Apply the 0.8 rule to Table 41.3 max Zs of 1.37 Ω.)',
    options: [
      'Zs = 0.27 Ω. Compliant.',
      'Zs = 0.97 Ω. Compliant — 0.97 ≤ 1.10 (corrected max).',
      'Zs = 0.97 Ω. Non-compliant.',
      'Zs = 5.32 Ω. Non-compliant.',
    ],
    correctAnswer: 1,
    explanation:
      'Zs = Ze + R1+R2 = 0.35 + 0.62 = 0.97 Ω. Corrected Table 41.3 max for Type B 32 A = 1.37 × 0.8 = 1.10 Ω. 0.97 ≤ 1.10 → compliant. The 0.4 s disconnection time will be met when the cable is at operating temperature.',
  },
  {
    id: 4,
    question:
      'Which protective device family relies on Table 41.3 (overcurrent devices) for max Zs?',
    options: [
      'RCDs only.',
      'MCBs to BS EN 60898 (Types B, C and D), and similar overcurrent devices to BS EN 61009-1 (RCBOs) at U₀ = 230 V.',
      'AFDDs only.',
      'Surge protective devices.',
    ],
    correctAnswer: 1,
    explanation:
      'Table 41.3 covers overcurrent devices (MCBs and the overcurrent portion of RCBOs) — Types B, C, D at the various current ratings. Table 41.5 separately covers RCDs as the protective device. RCBOs typically need to satisfy both: Table 41.3 for the magnetic-trip portion and Table 41.5 for the residual-current portion.',
  },
  {
    id: 5,
    question:
      'On a TT installation, an MCB cannot ordinarily satisfy the Table 41.3 max Zs because:',
    options: [
      'TT supplies are higher voltage.',
      'Ze on a TT system is typically 21 Ω or higher (electrode + soil + remote substation electrode), which exceeds the Table 41.3 max Zs for any practical MCB rating. RCDs are required for fault protection — Table 41.5 then applies.',
      'MCBs aren’t allowed on TT.',
      'The disconnection time is only 5 s.',
    ],
    correctAnswer: 1,
    explanation:
      'On TT the loop returns through soil and the remote substation electrode. Ze is high — 21 Ω is a common assumed value but real ones can be 50 Ω or more. Type B 6 A max Zs = 7.28 Ω. Even the smallest MCB can’t trip in time. RCDs are mandatory; Table 41.5 max Zs of 1667 Ω for a 30 mA RCD is comfortably satisfied by any reasonable electrode.',
  },
  {
    id: 6,
    question:
      'You measure Zs at the furthest socket on a 50 m radial circuit and the value is 0.6 Ω higher than your calculated R1+R2 + Ze. What is the most likely cause?',
    options: [
      'The cable is undersized.',
      'A poor termination somewhere along the circuit — a loose neutral block, a poorly tightened CPC, or a corroded joint adding extra resistance to the fault loop. Check every termination, retest after re-making.',
      'The MCB is too small.',
      'The customer’s appliance is at fault.',
    ],
    correctAnswer: 1,
    explanation:
      'A persistent 0.6 Ω discrepancy between measured Zs and (Ze + calculated R1+R2) almost always points to a loose or corroded joint. Common culprits: the circuit’s outgoing terminal at the consumer unit, a junction box hidden in a void, a back-box terminal where the previous electrician didn’t torque the screw. Always trace from CU outwards, re-make any joint that doesn’t pass a wiggle test.',
  },
  {
    id: 7,
    question:
      'Why does the BS 7671 method apply a 0.8 multiplier (or its equivalent) when comparing measured Zs to Table 41.3 max Zs?',
    options: [
      'For luck.',
      'Table 41.3 values are calculated assuming the cable is at its maximum operating temperature. Tests are normally performed when the cable is at ambient (~20 °C) where its resistance is lower. The 0.8 factor (Cmin / temperature correction) corrects the Table value down to a measured-temperature comparison.',
      'Because the loop tester is inaccurate.',
      'To allow for voltage drop.',
    ],
    correctAnswer: 1,
    explanation:
      'Conductor resistance rises with temperature. Table 41.3 max Zs values assume cables at full operating temperature (typically 70 °C for PVC). On test, the cable is much cooler and reads lower than it would when in service. The 0.8 multiplier (sometimes seen as a Cmin factor of 0.95 combined with temperature correction) brings the table value down to what the meter should read at test temperature so you’re comparing like with like.',
  },
  {
    id: 8,
    question:
      'A long thin cable (e.g. 1.5 mm² T&E run 30 m back to the CU) is showing a high R1+R2. The protective device is a Type B 16 A. Table 41.3 max Zs = 2.73 Ω. Ze = 0.35 Ω. The corrected max permitted measured Zs is 2.73 × 0.8 = 2.18 Ω. R1+R2 measured = 1.95 Ω. Does the circuit comply?',
    options: [
      'Yes — 0.35 + 1.95 = 2.30 Ω which is below 2.73 Ω.',
      'No — measured Zs = 0.35 + 1.95 = 2.30 Ω, which exceeds the corrected max of 2.18 Ω. The cable is too long/thin for this MCB rating; either uprate the cable to 2.5 mm², or reduce the run, or change the device.',
      'Yes — RCDs make compliance automatic.',
      'No — only because Ze is too high.',
    ],
    correctAnswer: 1,
    explanation:
      'Zs = 0.35 + 1.95 = 2.30 Ω. Corrected Table 41.3 max for B16 = 2.73 × 0.8 = 2.18 Ω. 2.30 > 2.18 → non-compliant. The cable will warm in service, R1+R2 will rise further, and you can’t guarantee 0.4 s disconnection. Solutions: thicker cable (drops R1+R2), shorter run if feasible, or downsize to B10 (smaller MCB needs less fault current to trip but increases nuisance tripping risk). RCBO with a 30 mA residual is a separate fix for additional protection but doesn’t solve the overcurrent disconnection time — you still need to satisfy Table 41.3 for the magnetic-trip portion.',
  },
];

const faqs = [
  {
    question: 'Why does the loop test matter so much on first verification?',
    answer:
      'Because Zs is what determines whether the MCB will actually trip in time during a fault. You can have all the right kit fitted, all the right CPC continuity, all the right bonding — but if Zs at the furthest accessory is too high, the magnetic trip won’t fire fast enough and the fault sits live for seconds instead of milliseconds. Loop test at the furthest point of every circuit, log the value, compare to Table 41.3 (corrected) before signing off.',
  },
  {
    question: 'What raises Zs beyond the limit in real installs?',
    answer:
      'Three big causes. (1) Long thin cables — 1.5 mm² runs of 25 m+ on lighting circuits routinely come close to the limit, especially on Type C MCBs. Tackle this with proper cable sizing (Module 2 §3.4 voltage drop calcs feed directly in here). (2) Bad terminations — loose CU outgoing terminals, hidden junction boxes with corroded joints, back-box CPCs that have been pinched in screw threads. (3) Missing parallel earth paths — bonding has been disconnected during refurb work, lifting Zs on circuits that were depending on the bond as part of a parallel path.',
  },
  {
    question: 'Where does the 0.4 s disconnection time come from in this calc?',
    answer:
      'BS 7671 Reg 411.3.2.2 + Table 41.1: on TN systems with U₀ ≤ 230 V AC, final circuits up to 63 A with sockets or up to 32 A with fixed equipment must disconnect within 0.4 s. Table 41.3 then gives you the max Zs that lets each MCB rating achieve that 0.4 s trip via its magnetic-instantaneous threshold. The two regs together bracket the maths: Reg 411.3.2.2 says how fast, Table 41.3 tells you what Zs lets you get there.',
  },
  {
    question: 'How accurate is "Ze ≈ 0.35 Ω for TN-C-S, 0.8 Ω for TN-S, 21 Ω for TT"?',
    answer:
      'Those are common DNO-published assumed values and reasonable starting points for design before measurement. Real-world readings vary — TN-C-S in urban areas often measures 0.2-0.4 Ω, while a long single-phase rural overhead supply on TT can read 100 Ω or more. Always measure Ze at the MET before final verification; use the measured value, not the assumed value, in your Zs calcs.',
  },
  {
    question: 'My RCBO has both Table 41.3 and Table 41.5 values to satisfy. Which one wins?',
    answer:
      'Both. The overcurrent (MCB) part of the RCBO needs to satisfy Table 41.3 — that gives you protection against high-current line-to-earth faults via the magnetic trip. The residual-current (RCD) part needs to satisfy Table 41.5 — that gives you protection against lower-current faults including ones with arcing or partial path resistance. The two work together: high-current solid faults are handled by the MCB portion in milliseconds, low-current/leakage faults by the RCD portion in 25-40 ms.',
  },
  {
    question: 'What if my measured Zs is above the corrected max but still under Table 41.3?',
    answer:
      'Non-compliant. The Table 41.3 raw value already assumes cable at operating temperature; if you’re reading it without correction at ambient, the cable will only get hotter in service and Zs will only get worse. Always correct first, then compare. If the corrected number is exceeded but the raw Table value isn’t, you’re depending on the cable never warming up — which isn’t a credible operating assumption. Treat as fail and design out the issue.',
  },
];

export default function Sub5() {
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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 5"
            title="Earth fault loop impedance path"
            description="The path a fault current takes from a fault back to source. Every link adds resistance. Total too high = MCB doesn’t trip = fault stays live = somebody dies. Worked Zs maths verified against Table 41.3."
            tone="emerald"
          />

          <TLDR
            points={[
              'Ze (external) + R1+R2 (internal line + CPC) = Zs (total earth fault loop impedance). Measured Zs must satisfy BS 7671 Table 41.3 (overcurrent devices) or Table 41.5 (RCDs).',
              'Apply the 0.8 multiplier (or equivalent temperature correction) when comparing measured Zs to Table 41.3 — table values assume cable at full operating temperature; tests are at ambient.',
              'Type B MCBs to BS EN 60898 at U₀ = 230 V — max Zs from Table 41.3: B6 = 7.28 Ω, B10 = 4.37 Ω, B16 = 2.73 Ω, B20 = 2.19 Ω, B32 = 1.37 Ω, B40 = 1.09 Ω. Higher rating = lower max Zs (more fault current needed to trip).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Walk the earth fault loop end-to-end, naming each component link.',
              'Define Ze, R1+R2 and Zs and explain how they combine: Zs = Ze + (R1 + R2).',
              'Cite Reg 411.3.2.2 (disconnection time) and Reg 411.4 (TN systems) framing.',
              'Read max Zs values from BS 7671 Table 41.3 for Type B MCBs at U₀ = 230 V.',
              'Apply the 0.8 multiplier to convert Table 41.3 values to measured-temperature comparisons.',
              'Calculate maximum allowable R1+R2 given Ze, MCB rating and disconnection time — and identify common causes of non-compliant Zs (long thin cables, bad terminations, missing parallel earth paths).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The loop — every link adds resistance</ContentEyebrow>

          <ConceptBlock
            title="The fault current path — source out, fault, back to source"
            plainEnglish="A fault current loop is a complete circuit from source out, through the fault, and back to source via the earth path. Every component you cross adds its own little resistance. Add them all up and you have Zs."
            onSite="The disconnection time is dictated by the fault current the protective device sees. Fault current = U₀ ÷ Zs. Higher Zs = lower fault current = slower trip = unsafe."
          >
            <p>
              The earth fault loop is the complete circuit a fault current flows around when a
              line conductor shorts to an exposed-conductive-part. Every component in that loop has
              its own impedance, and they add in series. The total is what BS 7671 calls the earth
              fault loop impedance, Zs.
            </p>
            <p>
              On a TN-C-S installation, the loop is:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Source winding (substation transformer secondary).</li>
              <li>DNO supply line conductor (out to the consumer cut-out).</li>
              <li>Installation line conductor R1 (CU out to the accessory).</li>
              <li>The fault itself (assumed negligible impedance).</li>
              <li>Exposed-conductive-part (the metalwork the line touched).</li>
              <li>CPC R2 (back from the accessory to the MET).</li>
              <li>MET.</li>
              <li>Earthing conductor (MET to the DNO neutral block).</li>
              <li>DNO PEN conductor (back to the substation).</li>
              <li>Source neutral terminal — loop closes.</li>
            </ol>
            <p>
              For convenience BS 7671 splits the total impedance into two halves:{' '}
              <strong>Ze</strong> (everything outside your installation — items 1, 2, 8, 9, 10) and{' '}
              <strong>R1+R2</strong> (the installation-side portion — items 3 and 6). Add them
              together to get <strong>Zs</strong> — the full loop.
            </p>
            <p className="font-mono text-[14px] text-emerald-300">Zs = Ze + (R1 + R2)</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.2.2 and Table 41.1 (Maximum disconnection times)"
            clause="Maximum disconnection times stated in Table 41.1 shall be applied to final circuits with a rated current not exceeding (a) 63 A with one or more socket-outlets and (b) 32 A supplying only fixed connected current-using equipment. Table 41.1 — for 120 V < U₀ ≤ 230 V AC: TN system 0.4 s; TT system 0.2 s. Where in TT systems the disconnection is achieved by an overcurrent protective device and the protective equipotential bonding is connected with all extraneous-conductive-parts within the installation, the maximum disconnection times applicable to TN systems may be used."
            meaning={
              <>
                The 0.4 s disconnection time on a TN final circuit at 230 V is what every Zs calc
                is racing. The protective device must clear the fault before the touch voltage on
                the exposed-conductive-part can persist long enough to be lethal. Tables 41.3 and
                41.5 then give you the max Zs values that allow each device family to achieve that
                disconnection time at the rated fault current.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.2.2 and Table 41.1."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Each component impedance, individually</ContentEyebrow>

          <ConceptBlock
            title="Ze — the supply-side impedance, measured at the MET"
            plainEnglish="The DNO’s entire contribution: substation transformer winding, supply cable to your cut-out, and the path from your MET back to source via the PEN/sheath/electrode."
            onSite="Measured at the MET with the installation isolated (lift the main earthing conductor temporarily, measure back through the MET clamp). Use a loop tester. Common assumed values: TN-C-S 0.35 Ω, TN-S 0.8 Ω, TT 21 Ω+."
          >
            <p>
              Ze is everything outside your installation — the bit you can’t change. The DNO sets
              it through the design of their supply network. Common values you’ll see on real
              installs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-C-S (PME):</strong> typically 0.35 Ω. Often measured between 0.2 and 0.4
                Ω in urban areas with short service cables. Specific DNOs publish assumed maxima
                (e.g. UK Power Networks: 0.35 Ω for LV PME).
              </li>
              <li>
                <strong>TN-S:</strong> typically 0.8 Ω. Higher than TN-C-S because the protective
                conductor is the cable sheath, which has a smaller effective cross-section than
                the combined PEN.
              </li>
              <li>
                <strong>TT:</strong> typically 21 Ω as a published worst-case maximum, but real
                values often higher — 50, 100, or more depending on soil conditions, electrode
                construction and the distance to the substation electrode. The high Ze is exactly
                why TT installations rely on RCDs rather than MCBs for fault clearance.
              </li>
            </ul>
            <p>
              Always measure Ze before signing off the installation. Don’t rely on the DNO’s
              published worst-case figure for design verification — measured Ze tells you what you
              actually have, and lets you calculate the maximum permitted R1+R2 for each circuit.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="R1+R2 — the installation-side impedance"
            plainEnglish="R1 = line conductor resistance from MCB to accessory. R2 = CPC resistance over the same run. Add them — they’re in series in the fault loop."
            onSite="Measured at initial verification by linking line and CPC together at the far end of the circuit, then reading resistance between the line terminal at the CU and the linked end. Or read it at the accessory if the cable run is too long for the link cable."
          >
            <p>
              R1+R2 is the part of the loop you can control — by cable size, route length, number
              of joints, and quality of terminations. For the standard T&E sizes used in UK
              domestic, the resistance per metre at 20 °C (from BS 7671 Appendix 4 / IET On-Site
              Guide):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1.0 mm² T&E (1.0/1.0)</strong> — R1 ≈ 18.1 mΩ/m, R2 ≈ 18.1 mΩ/m, R1+R2 ≈
                36.2 mΩ/m.
              </li>
              <li>
                <strong>1.5 mm² T&E (1.5/1.0)</strong> — R1 ≈ 12.1 mΩ/m, R2 ≈ 18.1 mΩ/m, R1+R2 ≈
                30.2 mΩ/m.
              </li>
              <li>
                <strong>2.5 mm² T&E (2.5/1.5)</strong> — R1 ≈ 7.41 mΩ/m, R2 ≈ 12.1 mΩ/m, R1+R2 ≈
                19.5 mΩ/m.
              </li>
              <li>
                <strong>4 mm² T&E (4.0/1.5)</strong> — R1 ≈ 4.61 mΩ/m, R2 ≈ 12.1 mΩ/m, R1+R2 ≈
                16.71 mΩ/m.
              </li>
              <li>
                <strong>6 mm² T&E (6.0/2.5)</strong> — R1 ≈ 3.08 mΩ/m, R2 ≈ 7.41 mΩ/m, R1+R2 ≈
                10.49 mΩ/m.
              </li>
              <li>
                <strong>10 mm² T&E (10/4)</strong> — R1 ≈ 1.83 mΩ/m, R2 ≈ 4.61 mΩ/m, R1+R2 ≈ 6.44
                mΩ/m.
              </li>
            </ul>
            <p>
              Long thin cable runs and undersized CPCs are the main reason R1+R2 climbs into
              non-compliance. A 30 m radial of 2.5/1.5 mm² T&E gives R1+R2 = 30 × 0.0195 = 0.59 Ω
              calculated cold. Add Ze = 0.35 Ω and you have Zs = 0.94 Ω before any temperature
              correction.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Table 41.3 — max Zs for overcurrent devices</ContentEyebrow>

          <ConceptBlock
            title="Reading Table 41.3 — Type B MCB at 230 V"
            onSite="Memorise the Type B row at least: B6 = 7.28 Ω, B10 = 4.37 Ω, B16 = 2.73 Ω, B20 = 2.19 Ω, B32 = 1.37 Ω, B40 = 1.09 Ω. These are the unmodified table values — apply the 0.8 multiplier for measured comparisons."
          >
            <p>
              BS 7671 Table 41.3 lists the maximum permitted earth fault loop impedance Zs for
              overcurrent devices to achieve the disconnection times in Table 41.1. The table
              values are calculated assuming the protective device sees enough current to operate
              its magnetic-instantaneous trip — typically 5× In for Type B, 10× In for Type C, 20×
              In for Type D — with the cable at its maximum operating temperature.
            </p>
            <p>
              For Type B MCBs to BS EN 60898, 0.4 s disconnection at U₀ = 230 V:
            </p>
            <div className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[14px] font-mono">
              <div className="grid grid-cols-2 gap-2 text-white/90">
                <div>Type B 6 A</div><div>7.28 Ω</div>
                <div>Type B 10 A</div><div>4.37 Ω</div>
                <div>Type B 16 A</div><div>2.73 Ω</div>
                <div>Type B 20 A</div><div>2.19 Ω</div>
                <div>Type B 32 A</div><div>1.37 Ω</div>
                <div>Type B 40 A</div><div>1.09 Ω</div>
                <div>Type B 50 A</div><div>0.87 Ω</div>
                <div>Type B 63 A</div><div>0.69 Ω</div>
              </div>
            </div>
            <p>
              Two things to note: (1) bigger MCB rating = lower max Zs (because more fault current
              is needed to hit the magnetic threshold); (2) Type C max Zs values are roughly half
              the Type B figures (Type C trips at 10× In rather than 5× In, so it needs roughly
              double the fault current, requiring half the loop impedance).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Table 41.3 (Maximum Zs for fuses and circuit-breakers, U₀ = 230 V, 0.4 s disconnection on TN systems)"
            clause="Table 41.3 specifies the maximum earth fault loop impedance Zs corresponding to a disconnection time of 0.4 s for the protective devices listed (Types B, C and D MCBs to BS EN 60898 and BS EN 61009-1, and various BS 88 fuse types). Values are stated in Ω at U₀ = 230 V. For Type B MCBs at 230 V: 6 A = 7.28 Ω; 10 A = 4.37 Ω; 16 A = 2.73 Ω; 20 A = 2.19 Ω; 32 A = 1.37 Ω; 40 A = 1.09 Ω. The values assume the protective conductor temperature corresponds to the maximum operating temperature for the cable type."
            meaning={
              <>
                Use Table 41.3 to look up the max Zs your circuit can have for its protective
                device family and rating. Cross-check against measured Zs (with the 0.8 temperature
                correction) at initial verification and at every periodic inspection. If measured
                Zs exceeds the corrected limit, the disconnection time can’t be guaranteed under
                hot-cable conditions and the design fails.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Table 41.3."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <VideoCard
            url={videos.zeTest.url}
            title={videos.zeTest.title}
            channel={videos.zeTest.channel}
            duration={videos.zeTest.duration}
            topic="Ze test on a single-phase supply · Unit 203 AC 4.5"
            caption="Craig Wiltshire walks the actual on-site Ze test — leads, MET disconnection, what the meter reads and how to record it. The number you've been calculating, captured live."
          />

          <SectionRule />

          <ContentEyebrow>Worked example — what’s the max R1+R2?</ContentEyebrow>

          <ConceptBlock
            title="Type B 32 A on TN-C-S — what R1+R2 can the cable have?"
            plainEnglish="Read max Zs from Table 41.3. Subtract Ze. The remainder is the maximum R1+R2 your cable run is allowed."
          >
            <p>
              Scenario: 32 A Type B RCBO on a kitchen ring final circuit. TN-C-S supply with
              measured Ze = 0.35 Ω. Need to verify the cable run is short enough to hit a 0.4 s
              disconnection.
            </p>
            <p>
              <strong>Step 1 — Table 41.3 max Zs:</strong> Type B 32 A at U₀ = 230 V → 1.37 Ω
              (operating temperature).
            </p>
            <p>
              <strong>Step 2 — apply the 0.8 multiplier</strong> for test-temperature comparison:
            </p>
            <p className="font-mono text-[14px] text-emerald-300">
              Zs(corrected max) = 1.37 × 0.8 = 1.096 Ω ≈ 1.10 Ω
            </p>
            <p>
              <strong>Step 3 — subtract Ze</strong> to find max R1+R2:
            </p>
            <p className="font-mono text-[14px] text-emerald-300">
              max R1+R2 = 1.10 − 0.35 = 0.75 Ω
            </p>
            <p>
              <strong>Step 4 — cable check.</strong> 2.5 mm² T&E with 1.5 mm² CPC has R1+R2 ≈
              19.5 mΩ/m at 20 °C. Maximum total run before exceeding 0.75 Ω:
            </p>
            <p className="font-mono text-[14px] text-emerald-300">
              max length = 0.75 ÷ 0.0195 ≈ 38.5 m
            </p>
            <p>
              For a typical 30 m kitchen ring on 2.5/1.5 T&E, you’ll be well within limits with
              R1+R2 ≈ 0.59 Ω, Zs ≈ 0.94 Ω. If the design called for 50 m (large ring or radial),
              you’d need to either uprate to 4.0/2.5 T&E (R1+R2 ≈ 11.7 mΩ/m → 50 m gives 0.59 Ω,
              still fine), or split the circuit, or downgrade the MCB.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Worked example — Type B 16 A lighting circuit, can it handle 30 m?"
            plainEnglish="Same maths, smaller MCB, thinner cable. Often the tighter case in practice."
          >
            <p>
              Scenario: 16 A Type B RCBO on a domestic lighting circuit. TN-C-S, Ze = 0.35 Ω.
              Cable is 1.5 mm² T&E with 1.0 mm² CPC. Cable run = 30 m to the furthest point.
            </p>
            <p>
              <strong>Step 1:</strong> Table 41.3 max Zs for Type B 16 A = 2.73 Ω.
            </p>
            <p>
              <strong>Step 2:</strong> Corrected max Zs = 2.73 × 0.8 = 2.184 Ω ≈ 2.18 Ω.
            </p>
            <p>
              <strong>Step 3:</strong> Max R1+R2 = 2.18 − 0.35 = 1.83 Ω.
            </p>
            <p>
              <strong>Step 4:</strong> 1.5/1.0 T&E R1+R2 ≈ 30.2 mΩ/m. For 30 m run:{' '}
              R1+R2 = 30 × 0.0302 = 0.906 Ω. Zs = 0.35 + 0.906 = 1.26 Ω. Well within the 2.18 Ω
              limit.
            </p>
            <p>
              Push it further: at what length does this circuit start failing? Max length =
              1.83 ÷ 0.0302 ≈ 60.6 m. So a 60 m run on 1.5/1.0 T&E with B16 protection is right
              at the edge — anything longer and you need thicker cable or a smaller MCB. This is
              exactly why long lighting circuits in big country houses sometimes get 2.5 mm² with
              1.5 mm² CPC even though 1.5/1.0 would carry the load — they’re sized for Zs, not for
              ampacity.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Comparing measured Zs directly to Table 41.3 without the 0.8 correction"
            whatHappens={
              <>
                You measure Zs = 1.30 Ω on a Type B 32 A circuit and see Table 41.3 max = 1.37 Ω.
                You sign off the circuit as compliant and move on. Six months later in summer, the
                cable runs hot at full load. R1+R2 climbs by ~20%. Real Zs goes up to maybe 1.55 Ω.
                A line-to-earth fault now produces 230 ÷ 1.55 = 148 A — below the magnetic-trip
                threshold of a Type B 32 (5× In = 160 A minimum). MCB doesn’t trip
                instantaneously; thermal trip eventually fires after several seconds. Touch
                voltage stays high for the entire delay.
              </>
            }
            doInstead={
              <>
                Always apply the 0.8 multiplier (or the equivalent BS 7671 method) when comparing
                measured Zs (cold cable) to Table 41.3 (hot cable). For Type B 32 A, your measured
                limit is 1.37 × 0.8 = 1.10 Ω, not 1.37 Ω. A measured 1.30 Ω fails the corrected
                limit — design out the issue with thicker cable, shorter run, or different MCB
                rating before sign-off.
              </>
            }
          />

          <Scenario
            title="A radial circuit that tested fine but tripped intermittently three months later"
            situation={
              <>
                You commissioned a 32 A radial for a workshop air compressor four months ago.
                Everything tested fine — Zs measured at 1.20 Ω at the equipment, well under the
                Table 41.3 max of 1.37 Ω for the Type B 32 RCBO fitted. The customer now reports
                intermittent tripping during heavy summer use, and Zs re-measured today reads 1.42
                Ω at the same point.
              </>
            }
            whatToDo={
              <>
                Go through the loop systematically. The 0.22 Ω rise across one season suggests one
                of three culprits: (a) a marginal termination that has worked loose under thermal
                cycling — check every joint from the CU outwards, particularly the RCBO outgoing
                terminal and any junction boxes; (b) corrosion at a back-box CPC connection in a
                damp area — clean and re-make the joint; (c) the cable itself is genuinely
                undersized and you’re seeing temperature-driven resistance rise — confirm by
                measuring with the load running and again after cool-down. Also re-check Ze at the
                MET to rule out a DNO-side change. Once the root cause is identified, fix it and
                re-test. Original design should have applied the 0.8 multiplier and accounted for
                summer ambient — 1.20 Ω at commissioning was already at the 0.8 × 1.37 = 1.10 Ω
                limit, marginal.
              </>
            }
            whyItMatters={
              <>
                Zs isn’t a fixed number — it changes with cable temperature, joint quality and DNO
                supply conditions. Every Zs reading is a snapshot. Initial verification documents
                the cold-cable best case; the design margin (the 0.8 multiplier) absorbs
                operational rise. Skip the multiplier and you’re commissioning circuits that work
                in the test room and fail in service.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What raises Zs beyond limits</ContentEyebrow>

          <ConceptBlock
            title="The three real-world causes of high Zs"
            plainEnglish="Long thin cables. Bad terminations. Missing parallel earth paths from disturbed bonding."
            onSite="If your Zs is non-compliant, root-cause it. Don’t just swap to a smaller MCB to make the table work — fix the underlying issue."
          >
            <p>
              The textbook causes of an out-of-spec Zs reading on a real installation:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Long thin cables</strong> — undersized for the run length. The R1+R2 climbs
                above what the protective device can tolerate. The fix is bigger cable. This ties
                back to Module 2 §3.4 voltage drop calculations: a circuit that fails Vd is also
                heading for a Zs problem because both are driven by R1+R2.
              </li>
              <li>
                <strong>Bad terminations</strong> — every loose, corroded or under-torqued joint
                adds extra resistance to the loop. CU outgoing terminals are the classic culprit
                (vibration loosens screws over years), followed by hidden junction boxes and
                back-box CPC connections. Trace, find, re-make.
              </li>
              <li>
                <strong>Missing parallel earth paths</strong> — if the original design assumed
                certain bonding or armour as a parallel CPC and that bond has been disconnected
                during refurb work, the entire circuit’s Zs reading climbs. Particularly common on
                commercial sub-mains where SWA armour was the original CPC and a later contractor
                replaced the gland incorrectly.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Zs = Ze + (R1 + R2). Every component in the fault loop adds resistance; the total dictates whether the protective device clears the fault in time.',
              'Ze = supply-side impedance. Measured at the MET. Typical: TN-C-S 0.35 Ω, TN-S 0.8 Ω, TT 21 Ω+.',
              'R1+R2 = installation-side. Line conductor + CPC for the circuit. Measured by the link-and-test method at initial verification.',
              'BS 7671 Table 41.3 sets max Zs for overcurrent devices at 0.4 s disconnection. Type B at 230 V: B6 = 7.28 Ω, B10 = 4.37 Ω, B16 = 2.73 Ω, B20 = 2.19 Ω, B32 = 1.37 Ω, B40 = 1.09 Ω.',
              'Apply the 0.8 multiplier when comparing measured Zs (cold cable) to Table 41.3 (hot cable). Without correction you risk passing circuits that fail under operating temperature.',
              'Real-world causes of non-compliant Zs: long thin cables, bad terminations, missing parallel earth paths. Root-cause and fix; don’t just downsize the MCB.',
              'Worked: Type B 32 A on TN-C-S with Ze = 0.35 Ω → corrected max Zs = 1.10 Ω → max R1+R2 = 0.75 Ω. For 2.5/1.5 T&E (≈19.5 mΩ/m), max run ≈ 38.5 m. Beyond that, uprate the cable.',
            ]}
          />

          <Quiz title="Earth fault loop — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Extraneous conductive parts
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.6 Earthing in practice — three real installs
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
