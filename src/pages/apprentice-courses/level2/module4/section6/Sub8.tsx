/**
 * Module 4 · Section 6 · Subsection 8 — Completing the Schedule of Test Results
 * Supplementary Sub — walks through every column of the IET model STR form
 * (Appendix 6, BS 7671:2018+A4:2026). Cross-references the Schedule of
 * Inspections (§5 Sub2) and EIC / MEIWC certification (Reg 644.1.1). Common
 * column-fill errors flagged. Designed for portfolio submission completeness.
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

const TITLE = 'Completing the Schedule of Test Results | Level 2 Module 4.6.8 | Elec-Mate';
const DESCRIPTION =
  'Column-by-column walk-through of the IET model Schedule of Test Results — every header, every per-circuit field, A4:2026 Table 41.3 max Zs values, RCD trip-time columns and AFDD test, plus a worked example for a 32 A Type B RCBO ring final.';

const checks = [
  {
    id: 'm4-s6-sub8-max-zs-source',
    question:
      'You are filling the "Max Zs (Ω)" column on the STR for a circuit protected by a Type B 32 A RCBO. Where do you read the value from?',
    options: [
      'IET On-Site Guide.',
      'BS 7671 A4:2026 Table 41.3 — Type B 32 A at U₀ = 230 V → 1.37 Ω. (NOT the older A2 value of 1.44 Ω.)',
      'Manufacturer\'s data sheet.',
      'Make it up based on experience.',
    ],
    correctIndex: 1,
    explanation:
      'Max Zs in the STR comes from BS 7671 A4:2026 Table 41.3 for the OCPD type and rating in question. For Type B 32 A: 1.37 Ω. Always quote the A4:2026 value on a current-edition certificate; the older A2 value (1.44 Ω) is obsolete and using it would be quoting a superseded standard. The IET OSG re-prints the table values for convenience but the source-of-truth is BS 7671 itself.',
  },
  {
    id: 'm4-s6-sub8-rcbo-idn-blank',
    question:
      'On the STR row for a circuit protected by a 32 A Type B RCBO with IΔn = 30 mA, the IΔn column is left blank. Acceptable?',
    options: [
      'Yes — the IΔn is implied by the RCBO type.',
      'No — IΔn is a required field for any circuit protected by an RCD or RCBO. Leaving it blank could be misread as "no RCD function" or "RCD value not verified". Fill in 30 mA Type A (or whichever rating / type). Reg 642.4 requires complete recording.',
      'Yes for Type AC RCDs only.',
      'Only required on first-fix.',
    ],
    correctIndex: 1,
    explanation:
      'Every required STR field must be filled. Leaving IΔn blank on an RCBO row is a common error that creates ambiguity for future inspectors. Fill in the rated residual operating current (typically 30 mA for general use, 100 mA for sub-mains feeds with downstream selectivity) and the type (AC, A, F, B). The associated trip-time test result (≤ 300 ms general non-delay) goes in the RCD trip-time column.',
  },
  {
    id: 'm4-s6-sub8-units-consistency',
    question:
      'You write R1+R2 as "0.45" and IR L+N to E as "200" on an STR row. Is that sufficient documentation?',
    options: [
      'Yes — the units are obvious from context.',
      'No — always write the units. R1+R2 should be "0.45 Ω" (or document column header units as Ω). IR should be "200 MΩ" (column header MΩ). Mixed units in the same form (mΩ for R1+R2 in some sections, Ω in others, MΩ vs GΩ for IR) is a common source of misreading. Be explicit.',
      'Acceptable in mΩ but not Ω.',
      'Only required for periodic inspections.',
    ],
    correctIndex: 1,
    explanation:
      'IET model STR forms have units in the column headers (e.g. "R1+R2 (Ω)", "IR L+N to E (MΩ)") so individual cells just need the number. But many proprietary forms and older IET versions vary, and mixing units (mΩ versus Ω versus kΩ) is a real-world cause of misreading. When in doubt, include the units in the cell. Better still: use a current standard digital form that auto-formats with column header units explicitly stated.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'STR header section — which of these belongs in the header (top of the form, common to every per-circuit row)?',
    options: [
      'R1+R2 readings.',
      'Address of installation, date of testing, name of person testing, instrument serial numbers, certificate reference number cross-referenced to the EIC.',
      'Per-circuit IR results.',
      'Customer\'s favourite colour.',
    ],
    correctAnswer: 1,
    explanation:
      'STR header captures common-to-all-circuits data: address, date, person testing, instrument serials (for traceability — a calibration audit trail), certificate reference number that ties this STR to its parent EIC. Per-circuit data goes in the per-circuit rows below.',
  },
  {
    id: 2,
    question: 'For a 2.5 mm² T&E ring final on Method 100 (Reference Method 100 — clipped direct), which "Reference Method" code goes in the column?',
    options: [
      'A',
      '100',
      'C',
      'Method 7',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Appendix 4 Reference Methods: 100 = clipped direct; 101 = above plasterboard; 102 = enclosed in a building void with thermal insulation. The numerical methods (100, 101, 102) are UK-specific additions to the international A-G method codes (Method A-G covers the international methods like enclosed in conduit on a wall, in trunking, etc.). Use whichever method genuinely describes the cable installation — it affects the cable\'s current-carrying capacity from Appendix 4 tables.',
  },
  {
    id: 3,
    question: 'The "Polarity" column on the STR is typically:',
    options: [
      'A free-text note.',
      'A simple tick (or P/F) confirming polarity has been verified per Reg 643.6 — i.e. all the dead polarity test items pass.',
      'A numerical value.',
      'Not present on the STR.',
    ],
    correctAnswer: 1,
    explanation:
      'Polarity is binary — pass or fail. STR has a tick column (P or F, or just a tick / cross). The detail of how polarity was verified (continuity from CU to L of every accessory etc.) is implied by the regulation reference; the column just records the outcome. Live polarity verification is a separate step in the live test sequence and may be a separate column or noted on the EIC itself.',
  },
  {
    id: 4,
    question: 'A 30 mA Type A RCBO on a kitchen ring tested at 28 ms trip time at 1 × IΔn. What goes in the RCD trip-time column?',
    options: [
      '"Pass".',
      '"28 ms" — the actual measured trip time. Pass / fail status is implicit (28 ms < 300 ms = pass). Documenting the actual reading lets future inspectors compare values for drift or degradation.',
      '"30 mA".',
      'Leave blank.',
    ],
    correctAnswer: 1,
    explanation:
      'Always record the actual measured value, not just pass/fail. 28 ms is a pass against the 300 ms maximum for general non-delay, and the actual reading is useful for future periodic inspections to compare for drift. If the device degrades over five years and trips at 200 ms next time, the inspector knows performance has dropped sharply even though both readings pass. Pass/fail-only documentation loses that diagnostic information.',
  },
  {
    id: 5,
    question: 'The "Max Zs (Ω)" column on the STR for a Type B 16 A circuit per A4:2026:',
    options: [
      '2.87 Ω',
      '2.73 Ω (the A4:2026 value — the older A2 value of 2.87 Ω is obsolete)',
      '1.37 Ω',
      '4.37 Ω',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 A4:2026 Table 41.3 — Type B 16 A at U₀ = 230 V: 2.73 Ω. (Older A2 value: 2.87 Ω.) Always quote the current edition value. A4:2026 row values for Type B at 230 V: B6 = 7.28, B10 = 4.37, B16 = 2.73, B20 = 2.19, B32 = 1.37, B40 = 1.09 Ω.',
  },
  {
    id: 6,
    question: 'Modern MFTs export test data via Bluetooth or USB. On a digital STR, the auto-imported data should:',
    options: [
      'Be accepted without review.',
      'Be reviewed by the inspector before signing — instrument glitches, mis-set test ranges or transcription errors during import can introduce nonsense values that the certification software will accept without complaint. The inspector\'s signature attests to the values, not the auto-import process.',
      'Replace the inspector\'s judgement.',
      'Only be used for periodic inspections.',
    ],
    correctAnswer: 1,
    explanation:
      'Digital workflows have removed transcription errors from manual entry but introduced new ones from auto-import. Always review the auto-populated STR before signing — does R1+R2 of 4.5 Ω make sense for a 25 m kitchen ring? (No — that would be 30× the expected value; check that the meter wasn\'t set to mΩ when reading was actually Ω.) The inspector\'s signature certifies the data is correct, regardless of how it got onto the form.',
  },
  {
    id: 7,
    question: 'AFDD column on the modern STR records:',
    options: [
      'Trip current.',
      'Tick or P/F confirming the AFDD\'s manufacturer-specified test facility was operated correctly per Reg 643.10. Plus a note for any abnormal indication.',
      'Insulation resistance.',
      'Cable size.',
    ],
    correctAnswer: 1,
    explanation:
      'AFDDs (arc fault detection devices) are recommended by Reg 421.1.7 for AC final circuits supplying socket-outlets ≤ 32 A in dwellings; the recommendation strengthens to a requirement in HRRBs under the Building Safety Act 2022 framework, with supporting fire-safety guidance covering HMOs / sleeping accommodation / care homes. The STR has been updated to include a column for the AFDD test result — typically a tick that the manufacturer\'s test procedure was followed and the device responded as documented. Free-text note column captures any abnormal LED indication or fault code from the test.',
  },
  {
    id: 8,
    question: 'Per Reg 642.4 and Section 644, the STR is part of:',
    options: [
      'The Building Regulations only.',
      'The certification of the installation. The signed STR + Schedule of Inspections + EIC together form the certification pack required for a new installation or major alteration. The STR is not optional or supplementary — it is one of the three components of the certificate.',
      'The DNO\'s records only.',
      'The customer\'s tax return.',
    ],
    correctAnswer: 1,
    explanation:
      'The STR is one of the three statutory parts of the certification pack along with the Schedule of Inspections and the EIC itself. Signed by the inspector, retained by customer / contractor / Competent Person Scheme. Not a working document or supplementary appendix — a signed, dated regulatory record.',
  },
];

const faqs = [
  {
    question: 'How many columns are there on a typical IET model STR?',
    answer:
      'Around 16-20 per-circuit columns depending on the form variant. The base set is identification (3-4 columns), wiring data (3-4 columns), protective device data (4-5 columns), test results (5-7 columns) and notes (1 column). Some forms split out RCD data into multiple sub-columns; others combine them. Some pre-A4:2026 forms lack the AFDD column and you have to either use an updated form or document AFDD tests in the notes / Schedule of Inspections.',
  },
  {
    question: 'What if a column does not apply to a particular circuit (e.g. RCD trip time on a circuit without an RCD)?',
    answer:
      'Mark "N/A" — never leave it blank. Blank cells create ambiguity (was the test not done because not required, or not done because forgotten?). N/A explicitly signals "not applicable, by design" and is the conventional documentation. Same applies to the IΔn column on a circuit protected by a fuse or non-RCD MCB — write N/A.',
  },
  {
    question: 'How do I record a ring final\'s test results on the STR?',
    answer:
      'There are typically dedicated columns for ring final values: r1 (end-to-end line), rn (end-to-end neutral), r2 (end-to-end CPC). The R1+R2 column captures the highest cross-connection L-CPC reading (effective R1+R2 for the circuit). Some STR forms have a single "ring continuity" column with sub-cells for r1/rn/r2; others split them out. Document all three end-to-end values for traceability — future inspectors comparing readings can spot drift in any conductor.',
  },
  {
    question: 'My STR has a column for "Zs measured" but the live test for that circuit hasn\'t been done yet. What do I write?',
    answer:
      'You can complete the dead-test portion of the STR before energisation and leave Zs measured blank, then add it after the live test phase. Or split the work: dead-test STR first, complete after live tests, single signed version. Either way the final STR before sign-off should have every applicable column filled. Some certification software has explicit dead-test and live-test phases that get merged on completion.',
  },
  {
    question: 'On a CU swap-out where the existing wiring is retained, do I record cable data (CSA, reference method) per the existing wiring or per the new CU?',
    answer:
      'Per the existing wiring as installed downstream of the new protective device. The STR documents the circuit as it now exists, not the new CU\'s expectations. Where the existing wiring data cannot be reliably determined (e.g. in walls, in ducts), record what you can verify and add a "Limitation" note to the STR — e.g. "Cable type assessed as T&E based on visible accessories; size and reference method estimated from voltage drop calculation".',
  },
  {
    question: 'I\'ve completed the STR and noticed a single typo in a Zs reading after I\'ve already signed. Can I fix it?',
    answer:
      'Yes — single line through the wrong value, write the correct value alongside, initial AND date the correction. Do not use Tippex or scribble out. If the error is more substantial (e.g. wrong circuit ID for a whole row, multiple mistakes) consider re-issuing a corrected STR with a note referencing the original. For digital STRs, certification software typically allows post-signature corrections with an audit trail of who changed what when. The customer copy should always reflect the current corrected version.',
  },
];

export default function Sub8() {
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
            eyebrow="Module 4 · Section 6 · Subsection 8"
            title="Completing the Schedule of Test Results"
            description="Column-by-column walk through every field on the IET model STR — header, identification, wiring, protective device, test readings — with a fully worked example for a Type B 32 A RCBO ring final."
            tone="emerald"
          />

          <TLDR
            points={[
              'The Schedule of Test Results (STR) captures every test reading per circuit in around 16-20 columns. Header section captures common-to-all data (address, date, instrument serials, certificate reference).',
              'Per-circuit columns: identification (number, description, wiring type, reference method), cable data (CSA L+CPC), OCPD data (type/rating, max Zs from A4:2026 Table 41.3, RCBO IΔn), test readings (R1+R2 / r1/rn/r2, IR L-L / L-E / N-E, polarity, Zs measured, RCD trip time, AFDD).',
              'Always record actual values not pass/fail; never leave required fields blank (write N/A if not applicable); always quote A4:2026 Table 41.3 max Zs values not the older A2 figures (e.g. B32 = 1.37 Ω not 1.44 Ω).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Supplementary content — extends LO6 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding of completing the Schedule of Test Results column by column with A4:2026-compliant values.',
              'Identify every section of the IET model Schedule of Test Results: header, per-circuit rows, declaration / signature.',
              'Complete every standard column on a per-circuit row for a domestic ring final, lighting circuit, immersion radial and EV charger sub-circuit.',
              'Quote A4:2026 Table 41.3 max Zs values for common Type B and Type C ratings.',
              'Differentiate ring final columns (r1, rn, r2 + R1+R2 from cross-connection) from radial circuit columns (R1+R2 alone).',
              'Document the A4:2026 RCD trip-time test (1 × IΔn, ≤ 300 ms general non-delay) and AFDD test in the appropriate columns.',
              'Apply Reg 642.4 (recording) and Reg 644.1.1 (defects must be corrected before certification).',
              'Spot and avoid common column-fill errors: blank fields, wrong max Zs version, missing units, missing IΔn on RCBO rows.',
              'Issue corrections on a paper STR with the conventional single-line + initials + date method.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>STR header — common-to-all data</ContentEyebrow>

          <ConceptBlock
            title="What goes in the STR header section"
            plainEnglish="Address, date, person, instrument serials, certificate cross-reference. Common to every circuit on the form."
            onSite="Fill in completely on every STR — even on small jobs. Empty header fields create ambiguity later."
          >
            <p>Standard IET model STR header items:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Certificate reference number</strong> — links this STR to the parent EIC.
                Format varies by certification software (e.g. NICEIC uses a numeric reference;
                NAPIT uses a different format). Critical for the audit trail.
              </li>
              <li>
                <strong>Address of installation</strong> — full postal address.
              </li>
              <li>
                <strong>Date of testing</strong> — single date, or date range if testing
                spanned multiple visits (with notes per row indicating which visit).
              </li>
              <li>
                <strong>Person responsible for testing</strong> — name and qualification (e.g.
                "John Smith, 18th Edition I&T qualified, NICEIC reg #...").
              </li>
              <li>
                <strong>Instrument serial numbers</strong> — MFT model and serial, plus the
                calibration date / next-cal-due date. For traceability of any disputed reading
                back to the calibrated instrument.
              </li>
              <li>
                <strong>Notes / limitations</strong> — anything common to all circuits that the
                form should record (e.g. "Tested 2026-04-26. Limitation: Circuit C7 not fully
                tested at first visit due to access; completed 2026-04-28").
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Per-circuit columns — full walk-through</ContentEyebrow>

          <ConceptBlock
            title="Every column, what it captures, what to write"
            plainEnglish="Identification → wiring → OCPD → continuity → IR → polarity → Zs measured → RCD → AFDD → notes."
            onSite="Modern certification software auto-populates many columns from instrument downloads. Always review for sense before signing."
          >
            <p>The standard per-circuit column set:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-3 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Column</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">What it captures</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Example value</div>

                <div>1. Circuit number</div><div>Sequential identifier</div><div>5</div>
                <div>2. Description</div><div>Plain-English purpose</div><div>Kitchen ring final</div>
                <div>3. Wiring type</div><div>Cable type</div><div>T&E</div>
                <div>4. Reference method</div><div>BS 7671 Appendix 4 code</div><div>100 (clipped direct)</div>
                <div>5. CSA L (mm²)</div><div>Line conductor cross-section</div><div>2.5</div>
                <div>6. CSA CPC (mm²)</div><div>CPC cross-section</div><div>1.5</div>
                <div>7. OCPD type / rating</div><div>Protective device</div><div>RCBO B32 BS EN 61009</div>
                <div>8. Max Zs (Ω)</div><div>From A4:2026 Table 41.3</div><div>1.37</div>
                <div>9. IΔn (mA)</div><div>RCD residual current rating</div><div>30</div>
                <div>10. RCD type</div><div>AC, A, F, or B</div><div>A</div>
                <div>11. r1 (Ω)</div><div>Ring end-to-end L (rings only)</div><div>0.32</div>
                <div>12. rn (Ω)</div><div>Ring end-to-end N (rings only)</div><div>0.34</div>
                <div>13. r2 (Ω)</div><div>Ring end-to-end CPC (rings only)</div><div>0.55</div>
                <div>14. R1+R2 (Ω)</div><div>From radial test or ring cross-connection</div><div>0.22</div>
                <div>15. IR L-N (MΩ)</div><div>Live to live</div><div>&gt;999</div>
                <div>16. IR L-E (MΩ)</div><div>Live to earth</div><div>&gt;999</div>
                <div>17. IR N-E (MΩ)</div><div>Neutral to earth</div><div>&gt;999</div>
                <div>18. Polarity</div><div>Tick or P/F</div><div>P</div>
                <div>19. Zs (calc) (Ω)</div><div>Ze + R1+R2</div><div>0.57</div>
                <div>20. Zs (measured) (Ω)</div><div>Live test at far end</div><div>0.59</div>
                <div>21. RCD trip time (ms)</div><div>1 × IΔn AC test</div><div>28</div>
                <div>22. AFDD test</div><div>Tick (where AFDD fitted)</div><div>N/A</div>
                <div>23. Notes</div><div>Limitations, anomalies</div><div>Spur to washing-machine outlet documented</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                { col: '1. Circuit number', what: 'Sequential identifier', ex: '5' },
                { col: '2. Description', what: 'Plain-English purpose', ex: 'Kitchen ring final' },
                { col: '3. Wiring type', what: 'Cable type', ex: 'T&E' },
                { col: '4. Reference method', what: 'BS 7671 Appendix 4 code', ex: '100 (clipped direct)' },
                { col: '5. CSA L (mm²)', what: 'Line conductor cross-section', ex: '2.5' },
                { col: '6. CSA CPC (mm²)', what: 'CPC cross-section', ex: '1.5' },
                { col: '7. OCPD type / rating', what: 'Protective device', ex: 'RCBO B32 BS EN 61009' },
                { col: '8. Max Zs (Ω)', what: 'From A4:2026 Table 41.3', ex: '1.37' },
                { col: '9. IΔn (mA)', what: 'RCD residual current rating', ex: '30' },
                { col: '10. RCD type', what: 'AC, A, F, or B', ex: 'A' },
                { col: '11. r1 (Ω) [rings]', what: 'End-to-end L', ex: '0.32' },
                { col: '12. rn (Ω) [rings]', what: 'End-to-end N', ex: '0.34' },
                { col: '13. r2 (Ω) [rings]', what: 'End-to-end CPC', ex: '0.55' },
                { col: '14. R1+R2 (Ω)', what: 'From radial / ring cross-connect', ex: '0.22' },
                { col: '15. IR L-N (MΩ)', what: 'Live to live', ex: '>999' },
                { col: '16. IR L-E (MΩ)', what: 'Live to earth', ex: '>999' },
                { col: '17. IR N-E (MΩ)', what: 'Neutral to earth', ex: '>999' },
                { col: '18. Polarity', what: 'Tick or P/F', ex: 'P' },
                { col: '19. Zs (calc) (Ω)', what: 'Ze + R1+R2', ex: '0.57' },
                { col: '20. Zs (measured) (Ω)', what: 'Live test at far end', ex: '0.59' },
                { col: '21. RCD trip time (ms)', what: '1×IΔn AC test', ex: '28' },
                { col: '22. AFDD test', what: 'Tick (where fitted)', ex: 'N/A' },
                { col: '23. Notes', what: 'Limitations, anomalies', ex: 'Spur to washing-machine outlet documented' },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow font-semibold">{row.col}</div>
                  <div className="text-white/60 text-[11px] uppercase tracking-wide mt-1.5">What</div>
                  <div className="text-white/90 mt-0.5">{row.what}</div>
                  <div className="text-white/60 text-[11px] uppercase tracking-wide mt-1.5">Example</div>
                  <div className="text-white/80 mt-0.5 font-mono">{row.ex}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.4 (Recording, paraphrased) and Section 644 (Certification)"
            clause="The results of every test required by this Chapter shall be recorded as part of the certification of the installation. The Schedule of Test Results shall capture per-circuit measurements; the Schedule of Inspections shall capture visual inspection items; the Electrical Installation Certificate shall provide the top-level signed declaration. For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued (Reg 644.1.1)."
            meaning={
              <>
                The STR is part of the regulatory certification pack — not optional, not
                supplementary. Every required field must be completed. Defects found during
                testing must be corrected before the certificate is issued (so the STR cannot
                show a fail and the EIC also be issued). Cross-reference the STR to the EIC by
                certificate number; cross-reference both to the Schedule of Inspections.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Reg 642.4 and Section 644.1.1."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Worked example — Circuit 5, kitchen ring final</ContentEyebrow>

          <ConceptBlock
            title="Filling in the STR row for a 32 A Type B RCBO kitchen ring"
            plainEnglish="Single fully worked row showing every column populated with realistic A4:2026-compliant values."
            onSite="This is the row you should be able to write from memory after Section 6. The numbers come from the dead and live test results combined with Table 41.3 lookup."
          >
            <p>Scenario: Circuit 5, kitchen ring final, T&E 2.5/1.5 mm² clipped direct, ~28 m loop, 8 sockets. 32 A Type B RCBO Type A 30 mA. TN-C-S supply, measured Ze = 0.32 Ω.</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-2 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Field</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Value</div>

                <div>Circuit number</div><div>5</div>
                <div>Description</div><div>Kitchen ring final</div>
                <div>Wiring type</div><div>T&E (flat twin and earth)</div>
                <div>Reference method</div><div>100 (clipped direct)</div>
                <div>CSA L</div><div>2.5 mm²</div>
                <div>CSA CPC</div><div>1.5 mm²</div>
                <div>OCPD type / rating</div><div>RCBO B32 to BS EN 61009</div>
                <div>Max Zs (Ω) [A4:2026 Table 41.3]</div><div>1.37 Ω</div>
                <div>IΔn</div><div>30 mA</div>
                <div>RCD type</div><div>A</div>
                <div>r1</div><div>0.32 Ω</div>
                <div>rn</div><div>0.34 Ω</div>
                <div>r2</div><div>0.55 Ω</div>
                <div>R1+R2 (highest cross-connection L-CPC)</div><div>0.22 Ω</div>
                <div>IR L-N</div><div>&gt;999 MΩ</div>
                <div>IR L-E</div><div>&gt;999 MΩ</div>
                <div>IR N-E</div><div>&gt;999 MΩ</div>
                <div>Polarity</div><div>P</div>
                <div>Zs (calc) [Ze + R1+R2]</div><div>0.32 + 0.22 = 0.54 Ω</div>
                <div>Zs (measured) [live test at far socket]</div><div>0.57 Ω</div>
                <div>RCD trip time at 1 × IΔn</div><div>28 ms</div>
                <div>AFDD test</div><div>N/A — no AFDD on this circuit</div>
                <div>Notes</div><div>Spur to washing-machine outlet (3 m of 2.5 mm² T&E) added 2026-04-26; documented for future inspection</div>
              </div>
            </div>

            <div className="sm:hidden space-y-1.5">
              {[
                ['Circuit number', '5'],
                ['Description', 'Kitchen ring final'],
                ['Wiring type', 'T&E'],
                ['Reference method', '100 (clipped direct)'],
                ['CSA L', '2.5 mm²'],
                ['CSA CPC', '1.5 mm²'],
                ['OCPD', 'RCBO B32 BS EN 61009'],
                ['Max Zs (A4:2026)', '1.37 Ω'],
                ['IΔn', '30 mA'],
                ['RCD type', 'A'],
                ['r1', '0.32 Ω'],
                ['rn', '0.34 Ω'],
                ['r2', '0.55 Ω'],
                ['R1+R2', '0.22 Ω'],
                ['IR L-N', '>999 MΩ'],
                ['IR L-E', '>999 MΩ'],
                ['IR N-E', '>999 MΩ'],
                ['Polarity', 'P'],
                ['Zs (calc)', '0.32 + 0.22 = 0.54 Ω'],
                ['Zs (measured)', '0.57 Ω'],
                ['RCD trip @ IΔn', '28 ms'],
                ['AFDD test', 'N/A'],
                ['Notes', 'Spur to washing-machine outlet documented'],
              ].map(([field, value], i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px] flex justify-between gap-3">
                  <div className="text-elec-yellow text-[12px] font-medium">{field}</div>
                  <div className="text-white/90 text-right font-mono">{value}</div>
                </div>
              ))}
            </div>

            <p>
              Pass / fail check on the row: Zs (calc and measured) both well below corrected
              Table 41.3 limit of 1.10 Ω for B32. IR all above range. Polarity verified. RCD
              trip time 28 ms well below 300 ms. AFDD N/A. Spur documented. Row complete and
              defensible.
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

          <ContentEyebrow>Common column-fill errors</ContentEyebrow>

          <ConceptBlock
            title="The mistakes that get pulled up at QA review"
            plainEnglish="Blank required fields. Old A2 max Zs values. Missing units. Missing IΔn on RCBO rows. Inconsistent decimal places."
          >
            <p>Top column-fill errors and how to avoid them:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-2 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Error</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Fix</div>

                <div>Blank IΔn column on an RCBO-protected circuit</div>
                <div>Always fill: 30 mA (general) or 100 mA (sub-mains selectivity); never blank</div>

                <div>Quoting max Zs from older A2 table (B32 = 1.44)</div>
                <div>Use A4:2026 Table 41.3 (B32 = 1.37); update certification software to A4:2026 form templates</div>

                <div>Mixing units (mΩ vs Ω in same column)</div>
                <div>Use column header units consistently; for ad-hoc rows include units explicitly</div>

                <div>Recording polarity as "yes" instead of P or tick</div>
                <div>Use the form\'s standard symbol (P/F or tick/cross); avoid free-text</div>

                <div>Recording RCD result as "Pass" not the actual ms</div>
                <div>Always record measured value (e.g. 28 ms); future drift comparison needs the number</div>

                <div>Leaving Notes blank when there\'s a spur or limitation</div>
                <div>Document spurs (location + length), test limitations, equipment disconnected</div>

                <div>Wrong reference method (e.g. "A" for clipped direct)</div>
                <div>Use 100 for clipped direct; 101 for above plasterboard; 102 for thermal-insulated void</div>

                <div>r2 not in expected ratio to r1 on a ring final but no investigation</div>
                <div>If r2 not ≈ r1 × cable size ratio, investigate before recording (mixed cable sizes? hidden joint?)</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                { e: 'Blank IΔn on an RCBO-protected circuit', f: 'Always fill: 30 mA (general) or 100 mA (sub-mains)' },
                { e: 'Quoting max Zs from older A2 table (B32 = 1.44)', f: 'Use A4:2026 Table 41.3 (B32 = 1.37)' },
                { e: 'Mixing units (mΩ vs Ω in same column)', f: 'Column header units consistent; include explicit units when needed' },
                { e: 'Polarity recorded as "yes" instead of P or tick', f: 'Use the form\'s standard symbol (P/F or tick/cross)' },
                { e: 'RCD result "Pass" not the actual ms', f: 'Always record measured value (e.g. 28 ms)' },
                { e: 'Notes blank when there\'s a spur or limitation', f: 'Document spurs, test limitations, equipment disconnected' },
                { e: 'Wrong reference method (e.g. "A" for clipped direct)', f: 'Use 100 / 101 / 102 codes correctly' },
                { e: 'r2 not in expected ratio to r1 on a ring with no investigation', f: 'Investigate (mixed sizes? hidden joint?)' },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Error</div>
                  <div className="text-white/90 mt-0.5">{row.e}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">Fix</div>
                  <div className="text-white/80 mt-0.5">{row.f}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Pre-fill workflow — how the schedule cascades down from the EIC"
            plainEnglish="Modern certification software lets you populate the EIC top-level data once (address, supply characteristics, instrument serials), and that cascades down to the STR header. Saves time, eliminates duplicate-entry errors, and keeps the documents consistent."
            onSite="Don't enter the same data twice. Set up the project header in your certification software once, then add per-circuit rows. The address, date, person testing and instrument serials populate every form automatically."
          >
            <p>The standard cascade in current certification software:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Project header.</strong> Created once per job: address, customer name,
                contractor details, work description, certificate reference number. This data
                appears on every form (EIC, Schedule of Inspections, STR) automatically.
              </li>
              <li>
                <strong>Supply characteristics.</strong> Entered on the EIC (Ze, PFC, system
                type, voltage, frequency, number of phases) and cascades to the STR for use in
                Zs calculations and acceptance limits.
              </li>
              <li>
                <strong>Instrument data.</strong> Meter model, serial, calibration date entered
                once and appears on the STR header for traceability.
              </li>
              <li>
                <strong>Person responsible.</strong> Inspector name and qualification entered
                once and appears on every form's signature panel.
              </li>
              <li>
                <strong>Per-circuit rows.</strong> Added to the STR; each row pulls supply
                characteristics from the project header for Zs calc and max Zs lookup from the
                A4:2026 Table 41.3 reference table.
              </li>
              <li>
                <strong>Auto-import from instrument.</strong> Test data flows from the meter
                into the STR per-circuit rows; inspector reviews and adds visual check items to
                the Schedule of Inspections.
              </li>
            </ol>
            <p>
              <strong>Manual cross-check before signing:</strong> even with full cascade,
              spot-check that the EIC supply data matches what's on the STR (Ze used in
              calculations should equal Ze documented in the EIC). Mismatches happen when the
              project header is updated mid-job after STR rows have been calculated.
            </p>
            <p>
              <strong>Avoiding duplicate data entry errors:</strong> the cascade approach
              eliminates the most common manual-entry error (typing the address slightly
              differently on each form, or transposing the certificate reference number). On a
              paper STR, write the certificate reference number once at the top and refer to
              it; for digital, the cascade does it automatically.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cross-checking instrument output vs handwritten STR — common discrepancies"
            plainEnglish="When you transcribe meter readings onto a paper STR (or review auto-imported values on a digital one), small errors creep in: missed decimal points, wrong units, transposed digits. The cross-check before signing catches these."
            onSite="Two-pass review: first pass at point of test (write the value as the meter shows it); second pass at end of day (sanity-check every reading against expected ranges before submitting to the customer)."
          >
            <p>The classic transcription discrepancies and how to spot them:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Decimal-point errors.</strong> Meter shows 0.45 Ω; transcribed as
                4.5 Ω. The 10× error is invisible if you don't sanity-check against expected
                values. R1+R2 of 4.5 Ω on a 25 m kitchen ring is impossible (would be ~30× the
                expected value); R1+R2 of 0.45 Ω is reasonable. Always ask: does this number
                make sense for this circuit?
              </li>
              <li>
                <strong>Unit mix-ups (mΩ vs Ω).</strong> Meter has been switched to the mΩ
                range during continuity testing; transcribed without unit conversion. 450 mΩ
                gets written as 450 Ω instead of 0.45 Ω. Same kind of order-of-magnitude error.
                Some meters auto-range and the unit displays clearly; others don't, so check
                the unit on every reading.
              </li>
              <li>
                <strong>Reading errors (transposed digits).</strong> Meter shows 0.32 Ω;
                transcribed as 0.23 Ω. Hard to catch unless the value falls out of expected
                range. Cross-check by asking: is r1 ≈ rn for this ring? If r1 = 0.32 Ω and
                rn = 0.34 Ω that's plausible; r1 = 0.23 Ω with rn = 0.34 Ω suggests one is wrong.
              </li>
              <li>
                <strong>Wrong column / wrong circuit.</strong> Reading taken at circuit 5
                gets transcribed onto circuit 6's row. Spot by noting the description column —
                if "Kitchen ring final" has a value that fits "Lighting downstairs" better,
                investigate. Sequential test order helps reduce this error.
              </li>
              <li>
                <strong>Stale data on auto-import.</strong> Meter wasn't cleared between jobs;
                an old reading from yesterday's site appears in today's STR. Always clear the
                meter (or use a date-stamped capture mode) at the start of each job.
              </li>
              <li>
                <strong>Missing IΔn on RCBO rows.</strong> The IΔn column gets left blank
                because the meter doesn't auto-record it (you typed it in for the test setup
                but the result import doesn't carry it through). Fill manually before signing.
              </li>
            </ul>
            <p>
              <strong>Practical sanity-check ranges to memorise:</strong> R1+R2 on 2.5/1.5
              T&E ring final ≈ 0.18-0.30 Ω for typical domestic length; r1 ≈ rn (within 10%);
              r2 ≈ r1 × 1.6-1.7. Lighting circuit R1+R2 on 1.5/1.0 T&E ≈ 0.5-1.5 Ω. IR on
              healthy new wiring &gt; 100 MΩ (usually &gt; 999). RCD trip time on healthy 30 mA
              device 20-50 ms. If a reading falls way outside these ranges, investigate before
              recording.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Notes / limitations column — when and what to flag"
            plainEnglish="The Notes column is your free-text record of anything that doesn't fit the standard column structure. Spurs, equipment disconnected for IR test, deferred testing, A4:2026 follow-up readings, departures from BS 7671 — all go here."
            onSite="Don't be afraid to write a sentence or two. Future inspectors and your future self will thank you. Brief, factual, specific."
          >
            <p>What to record in the Notes column with examples:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Spurs documented.</strong> "Single unfused spur to washing machine
                outlet (3 m of 2.5 mm² T&E) tapped from socket adjacent to sink; documented
                per BS 7671 ring spur rules."
              </li>
              <li>
                <strong>Equipment disconnected for IR test.</strong> "SPD module lifted from
                base for 500 V DC test; reconnected and 250 V DC follow-up per Reg 643.3.3 =
                35 MΩ at incoming side."
              </li>
              <li>
                <strong>Test deferred or partial.</strong> "Limitation: circuit C7 IR test
                not performed at first visit; equipment could not be disconnected. Scheduled
                for follow-up visit 2026-05-10."
              </li>
              <li>
                <strong>A4:2026 specific notes.</strong> "Type B 32 A RCBO confirmed Type A
                30 mA (rather than older Type AC); Reg 531.3.3 type selection compliance
                verified."
              </li>
              <li>
                <strong>Departure from BS 7671.</strong> "Socket-outlet RCD omitted on
                circuit C5 (warehouse roller-door power) per documented risk assessment under
                Reg 411.3.3 exception; risk assessment dated 2026-04-20 held by client."
              </li>
              <li>
                <strong>Cable run details where unusual.</strong> "Outdoor cable section
                (10 m) direct-buried at 600 mm depth per detail drawing 03; route inspected
                during install."
              </li>
              <li>
                <strong>Customer requests / comments.</strong> "Customer requested early
                periodic inspection at 5 years rather than 10 (planning for property sale)."
              </li>
              <li>
                <strong>Test result anomalies investigated.</strong> "C4 initial IR reading
                480 MΩ at 500 V DC; investigated and traced to pinched cable at upstairs
                landing back-box; cable re-routed and protected; retest &gt; 999 MΩ."
              </li>
            </ul>
            <p>
              The principle: anything that explains, qualifies, or contextualises the
              standard-column data goes in Notes. Future inspectors reading the STR five years
              from now should be able to understand the full picture without needing to call
              you for clarification.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Completing the STR for an EICR vs an EIC — the differences"
            plainEnglish="The STR form is the same in both cases — same columns, same formats. But the test approach and the interpretation of results differ. EIC = new install, full circuit-by-circuit testing, all defects must be corrected before sign-off. EICR = existing install, sample-based testing, defects classified C1/C2/C3/FI."
            onSite="Read the form's classification carefully — an STR attached to an EIC has different sign-off implications than the same data attached to an EICR."
          >
            <p>The key differences in STR completion:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EIC scope: every circuit, every test.</strong> On a new installation or
                major alteration the STR captures every applicable test on every circuit.
                Continuity, IR, polarity, Zs (calc and measured), RCD trip time per circuit.
                Any defect must be corrected before the EIC is issued (Reg 644.1.1).
              </li>
              <li>
                <strong>EICR scope: sample-based, with judgement.</strong> On a periodic
                inspection the inspector samples circuits according to IET GN3 guidance and
                their professional judgement. Higher-risk installations (commercial kitchens,
                special locations, anywhere DIY may have happened) get tested more
                thoroughly. The STR captures what was tested; what wasn't tested is documented
                in the EICR scope statement.
              </li>
              <li>
                <strong>EIC defect handling: must be corrected before sign-off.</strong> Reg
                644.1.1 explicit. You cannot issue a clean EIC for an installation with known
                defects. Find, fix, retest, certify.
              </li>
              <li>
                <strong>EICR defect handling: classified, not always required to be
                corrected.</strong> Defects on an EICR are classified C1 (danger present —
                immediate action required), C2 (potentially dangerous — action required), C3
                (improvement recommended — not dangerous but improves safety), or FI (further
                investigation required). The customer decides whether to action the
                classifications, with C1 being mandatory immediate action.
              </li>
              <li>
                <strong>EICR comparison to historical data.</strong> A useful EICR practice is
                to record current readings alongside historical readings from the original EIC
                STR. Drift in IR or Zs over the periodic interval can indicate slow degradation
                that warrants attention even if the current reading still passes.
              </li>
              <li>
                <strong>EICR pass/fail vs satisfactory/unsatisfactory.</strong> EICR doesn't
                pass or fail — it's "satisfactory" (no C1 or C2 defects) or "unsatisfactory"
                (one or more C1 or C2 defects requiring action). Customer must understand the
                difference between an unsatisfactory EICR (which has dangerous or potentially
                dangerous items) and a satisfactory EICR with C3 recommendations (which is
                safe but has improvement opportunities).
              </li>
            </ul>
            <p>
              <strong>Practical workflow:</strong> on a new install your STR is completed
              circuit-by-circuit during commissioning, all clean readings, EIC issued with
              full pack. On an EICR your STR is completed during the inspection visit with
              sample circuits tested, observations classified per IET GN3 categories, EICR
              issued with the satisfactory/unsatisfactory verdict and recommendations.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Quoting old A2 max Zs values on a current-edition certificate"
            whatHappens={
              <>
                You\'re using a certification template that hasn\'t been updated for A4:2026 — the
                "Max Zs" column auto-populates with the old A2 figures (B32 = 1.44 Ω). Your test
                results pass against the displayed table value but actually fail against the
                current A4:2026 value (B32 = 1.37 Ω). The certificate is technically issued
                against an obsolete standard. At a future EICR, the new inspector quotes the
                current figures and finds your circuits non-compliant retrospectively, raising
                a query about whether the original certification was correct.
              </>
            }
            doInstead={
              <>
                Update certification software to A4:2026 templates; update any printed STR
                templates to the latest IET model. Always quote the current edition Table 41.3
                value, not whichever was the active version when the OCPD was first installed.
                A4:2026 changes from A2: B6 unchanged 7.28; B10 unchanged 4.37; B16 2.87→2.73;
                B20 2.30→2.19; B32 1.44→1.37; B40 1.15→1.09. Memorise or carry a printed table
                until the values are second nature.
              </>
            }
          />

          <Scenario
            title="Filling the STR row for an unusual circuit — EV charger sub-circuit"
            situation={
              <>
                You are completing the STR for circuit 8 of an 8-circuit domestic CU swap-out:
                an EV charger sub-circuit. C40 RCBO Type A 30 mA, 10/4 SWA, 15 m radial, T&E
                Reference Method 102 (in cable tray) for the indoor section, direct-buried for
                the outdoor section. Charger isolated at port for IR test. Dead-test results:
                R1+R2 = 0.06 Ω; IR L-N / L-E / N-E all &gt;999 MΩ at 500 V DC; IR follow-up at
                250 V DC (after charger reconnection) = 12 MΩ; polarity P. Live: Zs measured
                at charger port = 0.39 Ω; RCD trip time 31 ms at 1 × IΔn.
              </>
            }
            whatToDo={
              <>
                Fill the row:
                <br />
                <br />
                Circuit 8 / EV charger sub-circuit / SWA / Reference Method varies (102 indoor,
                direct buried outdoor — note in column or add limitation in notes) / CSA L =
                10 mm² / CSA CPC = 4 mm² / OCPD = RCBO C40 Type A BS EN 61009 / Max Zs (A4:2026
                Table 41.3 Type C 40 A at 230 V) = 0.55 Ω / IΔn = 30 mA / RCD type = A / r1, rn,
                r2 = N/A (radial, not ring) / R1+R2 = 0.06 Ω / IR L-N = &gt;999 MΩ / IR L-E =
                &gt;999 MΩ / IR N-E = &gt;999 MΩ / Polarity = P / Zs calc (Ze=0.32 + 0.06) =
                0.38 Ω / Zs measured = 0.39 Ω / RCD trip 31 ms / AFDD = N/A / Notes = "EV
                charger isolated at port for 500 V DC IR test per Reg 643.3.3; reconnected and
                250 V DC follow-up = 12 MΩ. Outdoor cable section direct-buried per detail
                drawing 03."
                <br />
                <br />
                Pass check: Zs (0.39) below corrected Type C 40 A limit (0.55 × 0.8 = 0.44 Ω);
                IR all above range; RCD trip 31 ms well below 300 ms; polarity verified; A4:2026
                follow-up test recorded with reading. Row complete.
              </>
            }
            whyItMatters={
              <>
                EV charger circuits are a frequent EICR finding because the disconnect-and-retest
                procedure is often skipped or not documented. The Notes column for this circuit
                does the heavy lifting — it explicitly documents the A4:2026 Reg 643.3.3
                follow-up, names the equipment that was isolated, references the install drawing
                for the outdoor cable section. A future inspector reading this row five years
                from now has complete context and can trust the test results.
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

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'STR header captures common-to-all data: address, date, person testing, instrument serials (with cal date), certificate cross-reference number to the parent EIC.',
              'Per-circuit rows have ~16-20 columns: identification (circuit number, description, wiring, reference method), cable data (CSA L+CPC), OCPD data (type/rating, max Zs, RCBO IΔn and type), test readings (R1+R2, ring r1/rn/r2, IR L-N/L-E/N-E, polarity, Zs calc/measured, RCD trip time, AFDD), notes.',
              'Always quote A4:2026 Table 41.3 max Zs values: B6 = 7.28, B10 = 4.37, B16 = 2.73, B20 = 2.19, B32 = 1.37, B40 = 1.09 Ω. Older A2 values (e.g. B32 = 1.44) are obsolete.',
              'Always record actual measured values, not pass/fail. RCD trip time as "28 ms" not "Pass". IR as ">999 MΩ" not "OK". Future inspectors can compare values for drift over time.',
              'Never leave required fields blank. Use "N/A" explicitly when not applicable (e.g. r1 on a radial; IΔn on a non-RCBO MCB). Blank cells create ambiguity.',
              'Document anomalies and limitations in Notes column: spurs documented with location and length, electronics that were disconnected and the A4:2026 250 V DC follow-up reading, any test that could not be completed and why.',
              'Modern instrument downloads auto-populate STRs but require inspector review before signing — auto-import errors (wrong unit selection, mis-set test current) can introduce nonsense values that the certification software will accept silently.',
              'Single-line corrections with initials and date are acceptable on paper STRs. Never use Tippex or scribble. Issue corrections on signed certificates as soon as discovered.',
            ]}
          />

          <Quiz title="Schedule of Test Results — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.7 Dead-test sequence end-to-end
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Section overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Back to Section 6
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
