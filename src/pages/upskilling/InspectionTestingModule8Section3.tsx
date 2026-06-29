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
    id: 'mod8-s3-col-12-source',
    question:
      'On a TT installation the maximum permitted Zₛ in column 12 of the Schedule of Circuit Details is set by the requirement that the upstream RCD operates at IΔn, not by the BS 7671 Table 41.3 overcurrent values. What does the § footnote require you to do?',
    options: [
      'State the source of the column 12 value in the Remarks column of the schedule',
      'Nothing, because column 12 is treated simply as a number on the form',
      'Round the column 12 value to the nearest 0.1 Ω before recording it',
      'Use the Table 41.3 tabulated value anyway, regardless of the actual source',
    ],
    correctIndex: 0,
    explanation:
      'The § footnote on column 12 is explicit: where the maximum permitted fault loop impedance is taken from a source other than Chapter 41, the source must be stated in column 31 (Remarks). On TT, that means recording “derived from RCD IΔn requirement” in Remarks. Without the declaration, the next inspector cannot judge whether the value is correct.',
  },
  {
    id: 'mod8-s3-col-30-afdd',
    question:
      'You are testing a final circuit fitted with an AFDD that does not have a manual test button. What entry goes in column 30 of the Schedule of Test Results?',
    options: [
      'A tick, because column 30 is always ticked wherever an AFDD is fitted',
      'An X, recording the absence of a test button as a functional failure',
      'N/A or blank, because a test-button-less AFDD legitimately leaves the column N/A',
      'The longest measured disconnection time at the rated current IΔn',
    ],
    correctIndex: 2,
    explanation:
      'Column 30 records manual test button operation. The †† footnote acknowledges that not every AFDD has one. N/A is the correct entry for a button-less device — not a tick of convenience, not an X. The schedule of inspection item 4.23 then handles the indicator-light operational confirmation.',
  },
  {
    id: 'mod8-s3-cross-check',
    question:
      'A circuit reads col 21 (R1+R2) = 0.78 Ω, col 27 (max measured Zₛ) = 1.42 Ω, col 12 (max permitted Zₛ) = 1.37 Ω, header Zₑ = 0.35 Ω. Which cross-check fires and what action is required?',
    options: [
      'No problem, because both columns are within normal rounding tolerance',
      'Use whichever of the predicted and measured values is the lower figure',
      'Average the predicted and measured readings and accept the resulting mean',
      'Two failures: measured Zₛ exceeds both the predicted value and the limit — investigate',
    ],
    correctIndex: 3,
    explanation:
      'The dead-test sum (Zₑ + R1+R2) and the live measured Zₛ disagree by 0.29 Ω — substantial enough to matter. Worse, measured Zₛ exceeds the column 12 design limit. Reg 411.4 disconnection is not satisfied. Resolve the discrepancy before issuing any certificate.',
  },
  {
    id: 'mod8-s3-polarity-eic',
    question:
      'You find a reversed-polarity socket on a new installation EIC. Can you record an X in column 26 of the Schedule of Test Results and continue?',
    options: [
      'No, because an X is forbidden on an EIC schedule; correct polarity before signing',
      'Yes, provided you also add an explanatory comment in the Remarks column',
      'Only on TT installations, where reversed polarity is treated differently',
      'Yes, provided the customer signs to accept the reversed-polarity socket',
    ],
    correctIndex: 0,
    explanation:
      'The # footnote is direct: incorrect polarity (X) cannot be entered on a schedule when issued with an EIC. The EIC is a certificate of compliant work — a circuit with reversed polarity is not compliant and must be fixed before the EIC is issued. On an EICR, X is acceptable and drives a C1 or C2 in Section K.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'On the A4:2026 Generic Schedule of Test Results, which column number records the longest measured RCD disconnection time, and at what current is that test performed?',
    options: [
      'Column 27, with the test performed at the rated current IΔn',
      'Column 28, with the test performed at the rated current IΔn',
      'Column 29, with the test performed at 5 × IΔn',
      'Column 30, with the test performed at 0.5 × IΔn',
    ],
    correctAnswer: 1,
    explanation:
      'Column 28 of the A4:2026 Schedule of Test Results is the RCD "Disconnection time (ms)" column, with the footnote stating that RCD effectiveness is verified using an alternating-current test at rated residual operating current (IΔn). Column 27 is the maximum measured Zs, column 29 is RCD test button operation, column 30 is the AFDD manual test button operation.',
  },
  {
    id: 2,
    question:
      'A T&E radial reads R1+R2 = 0.41 Ω at the furthest socket. The Schedule of Circuit Details lists the maximum permitted Zs for that circuit (column 12) as 1.37 Ω, and Ze on the Schedule of Test Results header reads 0.32 Ω. What goes in the "Maximum measured Zs" column (column 27), and is the circuit compliant?',
    options: [
      '0.41 Ω; compliant because R1+R2 is below the max permitted Zs',
      '0.32 Ω; the header Ze value is the figure that gets recorded',
      '1.37 Ω; the max permitted figure is the value to record here',
      '0.73 Ω; compliant because Ze + R1+R2 is below the column 12 limit',
    ],
    correctAnswer: 3,
    explanation:
      'Column 27 is the maximum measured Zs at the furthest point of the circuit. Ze + R1+R2 = 0.32 + 0.41 = 0.73 Ω at 20°C. With temperature correction (×1.20 for thermoplastic at 70°C operating temperature) Zs ≈ 0.88 Ω — still well inside the column 12 max-permitted-Zs of 1.37 Ω. Compliant. The column 12 design limit is what the column 27 measurement is judged against.',
  },
  {
    id: 3,
    question:
      'Column 30 of the A4:2026 Schedule of Test Results is new with this amendment. What does it record, and what is its footnote?',
    options: [
      'AFDD trip current at IΔn; footnote: AFDDs must be tested at rated current',
      'Energy efficiency rating of the circuit; footnote: rate against the design load',
      'AFDD manual test button operation; footnote: "Not all AFDDs have a test button"',
      'Surge protective device discharge time; footnote: record against the SPD type',
    ],
    correctAnswer: 2,
    explanation:
      'Column 30 records the manual test button operation of any AFDD installed on the circuit. The footnote on the schedule reads "Not all AFDDs have a test button" — so the column may legitimately be left blank or marked N/A on a circuit fitted with a test-button-less AFDD. The column was added at A4:2026 to align with the new Reg 421.1.7 AFDD requirement and item 4.23 of the Schedule of Inspection.',
  },
  {
    id: 4,
    question:
      'On a ring final circuit, columns 18, 19 and 20 of the Schedule of Test Results record r₁, rₙ and r₂. The end-to-end r₁ reads 0.42 Ω, rₙ reads 0.42 Ω, and r₂ reads 0.70 Ω. The cable is 2.5/1.5 mm² T&E. What does the close match between r₁ and rₙ, and the higher r₂, tell you?',
    options: [
      'Equal line and neutral lengths, with a healthy 1.5 mm² CPC intact around the ring',
      'A fault is present, because the r₁ and rₙ readings should never match each other',
      'The r₂ reading is far too high for this cable, so the ring should be rejected',
      'The ring has been wired with a reduced cross-section and must therefore be rejected',
    ],
    correctAnswer: 0,
    explanation:
      'For 2.5/1.5 mm² T&E, the ratio r₂/r₁ should approximate the ratio of conductor resistivities at the same length: 12.10 mΩ/m ÷ 7.41 mΩ/m ≈ 1.63. A measured ratio of 0.70/0.42 = 1.67 is well within tolerance. r₁ ≈ rₙ confirms equal line and neutral lengths around the ring. This three-reading cross-check is exactly why columns 18-20 exist on the schedule.',
  },
  {
    id: 5,
    question:
      'Columns 24 and 25 of the Schedule of Test Results record Insulation Resistance Live-Live and Live-Earth in MΩ, with column 23 recording the test voltage. For a 230 V final circuit per BS 7671 Table 64, what test voltage and minimum acceptable IR value go in those columns?',
    options: [
      '250 V DC, ≥ 0.5 MΩ',
      '500 V AC, ≥ 1.0 MΩ',
      '1000 V DC, ≥ 1.0 MΩ',
      '500 V DC, ≥ 1.0 MΩ',
    ],
    correctAnswer: 3,
    explanation:
      'Per BS 7671 Table 64 (referenced by the schedule footnote ‡‡ "Where this schedule forms part of an Electrical Installation Certificate, insulation resistance testing should be performed at the test voltage stated in Table 64"), a 230 V LV final circuit is tested at 500 V DC with a minimum acceptance of 1.0 MΩ. SELV/PELV would be 250 V DC; circuits over 500 V would use 1000 V DC.',
  },
  {
    id: 6,
    question:
      'On the Schedule of Circuit Details, column 12 is labelled "Maximum permitted Zₛ (Ω)". Where does that value come from, and how does it relate to BS 7671 Table 41.3?',
    options: [
      'It is always the BS 7671 Table 41.3 raw value, taken directly at 70°C',
      'It can be Table 41.3, an Annex value or a tighter design limit, with the source declared',
      'It is the live-measured Zs from column 27, copied across to the circuit details',
      'It is always the external earth fault loop impedance Ze for the supply',
    ],
    correctAnswer: 1,
    explanation:
      'The footnote § on the Generic Schedule of Circuit Details makes column 12 explicitly source-flexible. Most commonly it is the Table 41.3 maximum Zs at 70°C. But it can also be Annex A4 (Appendix 14) corrected values, or a designer-set tighter limit (for example, where a circuit needs to discriminate with an upstream device). When the value is not the Table 41.3 default, the source must be declared in column 31 (Remarks) of the Schedule of Test Results. This is one of the genuinely useful A4:2026 clarifications.',
  },
  {
    id: 7,
    question:
      'Column 26 of the Schedule of Test Results records "Polarity". What does the # footnote on that column tell the inspector to do when polarity is incorrect?',
    options: [
      'Record polarity only as a tick, never any other mark, on any schedule',
      'Mark the cell with an X and continue to issue the certificate as normal',
      'An X for incorrect polarity cannot be entered on a schedule issued with an EIC',
      'Leave the polarity cell blank wherever the polarity is found to be reversed',
    ],
    correctAnswer: 2,
    explanation:
      'The # footnote is direct: incorrect polarity (X) cannot be recorded on a schedule that forms part of an EIC. The reasoning: an EIC is a certificate of compliant work, and a circuit with incorrect polarity is not compliant — it must be corrected before the EIC is signed. The X is acceptable on a Schedule of Test Results that forms part of an EICR, where existing non-compliances are exactly what is being recorded.',
  },
  {
    id: 8,
    question:
      'You are filling in the Schedule of Test Results header. The "Zₑ" field at the top of column 17 region records the Ze value for the supply. The form also shows a tick-box for "Operational status confirmed¶" and an N/A box. What is the ¶ footnote telling you?',
    options: [
      'Not all SPDs have a visible indicator, so the N/A box is correct where there is none',
      'Tick the confirmed box only if you have time during the test sequence',
      'The operational-status box applies to AFDD circuits only, never to SPDs',
      'Always tick confirmed, because every SPD carries a visible status indicator',
    ],
    correctAnswer: 0,
    explanation:
      'The ¶ footnote on the SPD operational-status row is explicit: "Not all SPDs have visible functionality indication". Where the device has no indicator window or LED, you cannot honestly tick "Confirmed" — the N/A box is the correct entry, and the inspector relies on the manufacturer end-of-life expectation in lieu of an inspection check. This footnote was added at A4:2026 to align with Reg 651.4 (SPD indication) and stop inspectors fabricating ticks on devices that physically cannot be checked visually.',
  },
  {
    id: 9,
    question:
      'A circuit on your schedule has the following readings: column 21 (R1+R2) = 0.78 Ω, column 27 (max measured Zs) = 1.42 Ω, column 12 (max permitted Zs from circuit details) = 1.37 Ω. Ze at the header is 0.35 Ω. What is the cross-check that should fire and what is the action?',
    options: [
      'No problem, because both columns are within normal rounding tolerance',
      'Measured Zs (1.42 Ω) exceeds both the predicted 1.13 Ω and the limit — investigate',
      'Just average the predicted and measured readings and accept the mean value',
      'Use whichever of the two readings is the lower and record that figure',
    ],
    correctAnswer: 1,
    explanation:
      'Two failures: (a) the dead-test sum (Ze + R1+R2 = 1.13 Ω) and the live measured Zs (1.42 Ω) disagree by 0.29 Ω — substantial enough to matter. (b) The live measured Zs exceeds the column 12 design limit. Either the live-test Ze is different from the header Ze (recheck the supply), or a parallel path has been lost, or a joint has degraded under the live test current. Do not sign the certificate until the discrepancy is resolved.',
  },
  {
    id: 10,
    question:
      'The Generic Schedule of Test Results header lists "Details of test instruments used (serial and/or asset numbers)" with rows for Multifunction, Continuity, Insulation resistance, Earth fault loop impedance, RCD, and Earth electrode resistance. Why does the form provide separate rows when most inspectors use one multifunction tester?',
    options: [
      'So one calibration certificate can cover every test function at once',
      'So the multifunction serial number need only be written down a single time',
      'Because multifunction testers are not permitted for certification testing',
      'Because where a separate instrument is used for a test, its serial must be recorded',
    ],
    correctAnswer: 3,
    explanation:
      "Calibration certificates are issued per instrument per test function. Where one tester does everything, the same serial number goes in every row. But if a separate earth electrode tester or a separate insulation tester was used for any reason, that instrument's serial / asset number belongs in its own row. The schedule structure forces honest traceability — court-aware practice in any disputed installation.",
  },
];

const InspectionTestingModule8Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Schedule of test results | I&T Module 8.3 | Elec-Mate',
    description:
      'A4:2026 Generic Schedule of Test Results column-by-column: r1/rn/r2 ring continuity (cols 18-20), R1+R2 (col 21), R2 (col 22), IR (cols 23-25), polarity (col 26), max Zs (col 27), RCD disconnection time (col 28), AFDD manual test (col 30, new), and how the columns cross-check each other.',
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
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 3"
            title="Schedule of Test Results"
            description="Every column on the A4:2026 Generic Schedule of Test Results, what each one records, and how they cross-check each other and the Schedule of Circuit Details."
            tone="yellow"
          />

          <TLDR
            points={[
              'Two schedules work as a pair: the Schedule of Circuit Details holds the design data (columns 1-16 inc. column 12 max-permitted Zs); the Schedule of Test Results holds the measured values (columns 17-31 inc. column 28 RCD time and column 30 AFDD manual test).',
              'The A4:2026 amendment renumbered and reorganised both schedules. Column 30 (AFDD manual test button operation) is new at A4 and pairs with item 4.23 of the Schedule of Inspection and Reg 421.1.7.',
              'Column 27 ("Maximum measured Zₛ (Ω)") records the live-test Zs at the furthest point of the circuit. It is judged against column 12 of the Schedule of Circuit Details ("Maximum permitted Zₛ"), not against BS 7671 Table 41.3 directly — column 12 may already incorporate a tighter design limit.',
              'Column 28 ("Disconnection time (ms)") records the longest RCD trip time at rated IΔn. The footnote ** clarifies: "RCD Effectiveness is verified using an alternating-current test at rated residual operating current (IΔn)" — that is the test that goes in column 28.',
              'Polarity (column 26) cannot be recorded as X on a schedule attached to an EIC — non-compliances must be corrected before the EIC is issued. X is permitted on an EICR schedule, where existing defects are the point.',
              'The schedule footnotes are not decoration — they are normative. ¶ "Not all SPDs have visible functionality indication"; ‡‡ Table 64 test voltage; § column 12 source declaration in Remarks; †† AFDD test button presence — each footnote anchors a column to a specific A4 regulation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify every column number on the A4:2026 Generic Schedule of Circuit Details and Generic Schedule of Test Results, and state what each one records',
              'Explain the relationship between column 12 (max permitted Zs, design) and column 27 (max measured Zs, test), and use that pair to verify Reg 411.4 disconnection',
              'Read a ring-final r₁ / rₙ / r₂ set (columns 18-20) and decide whether the readings are self-consistent and consistent with the cable specification',
              'Apply the A4:2026 column 30 (AFDD manual test) correctly, including the "Not all AFDDs have a test button" footnote and its implications',
              'Choose the correct test voltage and acceptance value for IR (columns 23-25) by reading BS 7671 Table 64',
              'Interpret the schedule footnotes (#, †, ‡, ‡‡, **, ¶, §, ††) as the regulatory anchors they are, not as small print',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 644.3 — the schedules are part of the certificate"
            plainEnglish="The Electrical Installation Certificate is only valid when the Schedule of Inspection AND the Schedule(s) of Circuit Details and Schedule(s) of Test Results are attached. The schedules are not optional appendices — they are part of the certificate, and the certificate is only valid if they accompany it."
            onSite="Treat the schedules as the evidence that justifies the EIC declaration. The EIC is the headline statement; the schedules are the data that supports it. Missing or incomplete schedules invalidate the certificate, not just spoil it."
          >
            <p>
              Reg 644.3 is short and unambiguous. The Certificate must include details of the extent
              of the work covered, plus (a) Schedule(s) of Inspection, and (b) Schedule(s) of
              Circuit Details and Schedule(s) of Test Results. The schedules must be based on the
              models in Appendix 6 — meaning the BS 7671:2018+A4:2026 Generic Schedule of Circuit
              Details and Generic Schedule of Test Results, exactly as published.
            </p>
            <p>
              The note for the person producing the EIC reinforces this: &ldquo;This Certificate is
              only valid if the Schedule of Inspection has been completed to confirm that all
              relevant inspections have been carried out and the relevant Schedule(s) of Circuit
              Details and Schedule(s) of Test Results have been attached (Regulation 644.3).&rdquo;
              Issue an EIC without the schedules and you have issued an invalid certificate.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.3"
            clause={
              <>
                The Certificate shall include details of the extent of the work covered, and: (a)
                Schedule(s) of Inspection; and (b) Schedule(s) of Circuit Details and Schedule(s) of
                Test Results. The schedules shall be based on the models in Appendix 6.
              </>
            }
            meaning="The schedules are mandatory components of the certificate. Use the model forms in Appendix 6, exactly. Custom or in-house schedules that do not match the column structure are non-compliant with 644.3."
          />

          <SectionRule />

          <ContentEyebrow>The two schedules — one form, two halves</ContentEyebrow>

          <ConceptBlock
            title="Schedule of Circuit Details (columns 1-16) — the design half"
            plainEnglish="Columns 1 to 16 hold what the designer specified. Circuit number, description, conductor types and sizes, the OCPD details, and crucially column 12 — the maximum permitted Zs for the circuit. This half of the schedule is filled in from the design intent, not from measurements."
          >
            <p>The A4:2026 Generic Schedule of Circuit Details column structure, in order:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Col</th>
                    <th className="text-left text-white/80 py-2">Heading</th>
                    <th className="text-left text-white/80 py-2">What goes in it</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1</td>
                    <td>Circuit number</td>
                    <td>The MCB way / circuit identifier on the board</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">2</td>
                    <td>Circuit description</td>
                    <td>&ldquo;Kitchen ring&rdquo;, &ldquo;Lighting upstairs&rdquo;, etc.</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">3</td>
                    <td>Type of wiring</td>
                    <td>Code A-O from the form&rsquo;s &ldquo;Codes for Types of Wiring&rdquo;</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">4</td>
                    <td>Reference method ‡</td>
                    <td>Per Table 4A2 of Appendix 4 (the ‡ footnote)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">5</td>
                    <td>Number of points served</td>
                    <td>Sockets, lights, FCUs etc.</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">6 / 7</td>
                    <td>Live (mm²) / CPC (mm²)</td>
                    <td>Conductor csa under &ldquo;Conductor details&rdquo;</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">8 / 9 / 10 / 11</td>
                    <td>OCPD: BS (EN), Type, Rating (A), Breaking capacity (kA)</td>
                    <td>Overcurrent protective device particulars</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 text-elec-yellow font-bold">12</td>
                    <td className="text-elec-yellow font-bold">Maximum permitted Zₛ (Ω) §</td>
                    <td className="text-elec-yellow">
                      The design limit. § footnote: where it is not from Chapter 41, state the
                      source in column 31 Remarks
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">13 / 14 / 15 / 16</td>
                    <td>RCD: BS (EN), Type, IΔn (mA), Rating (A)</td>
                    <td>RCD particulars where one is fitted on the circuit</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Column 12 is the lynchpin. Everything in the test half of the form is judged against
              column 12 — not against the raw BS 7671 Table 41.3 maximum Zs values. If the designer
              has set a tighter limit (for selectivity, voltage drop margin, or because the
              installation is in a higher ambient), column 12 reflects the design, and the inspector
              tests against the design.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Schedule of Test Results (columns 17-31) — the measurement half"
            plainEnglish="Columns 17 to 31 hold what the inspector measured. Ring-final continuity (r₁, rₙ, r₂), R1+R2 or Rₛ, R2, insulation resistance, polarity, the live-test Zs, RCD disconnection time, AFDD manual test, and a Remarks column."
          >
            <p>The A4:2026 Generic Schedule of Test Results column structure, in order:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Col</th>
                    <th className="text-left text-white/80 py-2">Heading</th>
                    <th className="text-left text-white/80 py-2">What goes in it</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">17</td>
                    <td>Circuit number</td>
                    <td>Mirrors column 1 — same row across both schedules</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">18</td>
                    <td>r₁ (line) Ω — Ring final circuit</td>
                    <td>End-to-end line continuity around the ring</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">19</td>
                    <td>rₙ (neutral) Ω — Ring final circuit</td>
                    <td>End-to-end neutral continuity around the ring</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">20</td>
                    <td>r₂ (CPC) Ω — Ring final circuit</td>
                    <td>End-to-end CPC continuity around the ring</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">21</td>
                    <td>(R₁ + R₂) Continuity (Ω)</td>
                    <td>
                      For radials: Method 1 R1+R2 at the furthest point. For rings: derived from r₁
                      and r₂ by the (r₁ + r₂)/4 rule
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">22</td>
                    <td>R₂ Continuity (Ω)</td>
                    <td>
                      Method 2 wandering-lead reading (R2-only, for circuits where Method 2 was
                      used)
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">23</td>
                    <td>Test voltage (V) ‡‡ — Insulation resistance</td>
                    <td>Per BS 7671 Table 64 — typically 500 V DC for 230 V LV final circuits</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">24</td>
                    <td>Live-Live (MΩ) — Insulation resistance</td>
                    <td>L-N IR. ≥ 1.0 MΩ for 230 V LV per Table 64; lower readings investigated</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">25</td>
                    <td>Live-Earth (MΩ) — Insulation resistance</td>
                    <td>L-E and N-E (combined as live-earth in this column)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">26</td>
                    <td>Polarity #</td>
                    <td>
                      ✓ for correct. # footnote: an X cannot be entered on a schedule issued with an
                      EIC
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 text-elec-yellow font-bold">27</td>
                    <td className="text-elec-yellow font-bold">Maximum measured Zₛ (Ω)</td>
                    <td className="text-elec-yellow">
                      Live-test Zs at the furthest point — judged against column 12
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 text-elec-yellow font-bold">28</td>
                    <td className="text-elec-yellow font-bold">Disconnection time (ms) ** — RCD</td>
                    <td className="text-elec-yellow">
                      Longest RCD trip time at rated IΔn. ** footnote: &ldquo;RCD Effectiveness is
                      verified using an alternating-current test at rated residual operating current
                      (IΔn)&rdquo;
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">29</td>
                    <td>Test button operation — RCD</td>
                    <td>Functional check of the RCD test button</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 text-elec-yellow font-bold">30</td>
                    <td className="text-elec-yellow font-bold">
                      Manual test button operation †† — AFDD (NEW at A4:2026)
                    </td>
                    <td className="text-elec-yellow">
                      AFDD manual test. †† footnote: &ldquo;Not all AFDDs have a test button&rdquo;
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">31</td>
                    <td>Remarks</td>
                    <td>
                      Details of circuits and/or installed equipment vulnerable to damage when
                      testing — and the source of any column 12 value not from Chapter 41
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Note the columns shaded in elec-yellow above. They are the columns A4:2026 either
              added (column 30) or repositioned to anchor against specific regulations (12, 27, 28).
              The schedule is not just a record — it is the regulation made auditable.
            </p>
          </ConceptBlock>

          {/* Schedule columns diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              A4:2026 Schedule of Test Results — column map
            </h4>
            <svg
              viewBox="0 0 820 380"
              className="w-full h-auto"
              role="img"
              aria-label="Map of the A4:2026 Schedule of Test Results columns 17 through 31, grouped by purpose: ring-final continuity, R1+R2/R2, insulation resistance, polarity, live-test Zs, RCD disconnection, AFDD manual test, and Remarks."
            >
              <rect
                x="20"
                y="40"
                width="180"
                height="120"
                rx="8"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="110"
                y="60"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                RING FINAL CONTINUITY
              </text>
              <text x="110" y="80" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 18 — r₁ (line)
              </text>
              <text x="110" y="98" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 19 — rₙ (neutral)
              </text>
              <text x="110" y="116" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 20 — r₂ (CPC)
              </text>
              <text x="110" y="138" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                r₂ ÷ r₁ ratio confirms cable spec
              </text>

              <rect
                x="220"
                y="40"
                width="180"
                height="120"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="310"
                y="60"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                CONTINUITY (Ω)
              </text>
              <text x="310" y="82" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 21 — (R₁ + R₂)
              </text>
              <text x="310" y="100" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 22 — R₂ (wandering)
              </text>
              <text x="310" y="125" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Method 1 → col 21
              </text>
              <text x="310" y="140" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Method 2 → col 22
              </text>

              <rect
                x="420"
                y="40"
                width="180"
                height="120"
                rx="8"
                fill="rgba(59,130,246,0.06)"
                stroke="rgba(59,130,246,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="510"
                y="60"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="10"
                fontWeight="bold"
              >
                INSULATION RESISTANCE
              </text>
              <text x="510" y="80" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 23 — Test V ‡‡
              </text>
              <text x="510" y="98" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 24 — Live-Live (MΩ)
              </text>
              <text x="510" y="116" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 25 — Live-Earth (MΩ)
              </text>
              <text x="510" y="138" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Per BS 7671 Table 64
              </text>

              <rect
                x="620"
                y="40"
                width="180"
                height="120"
                rx="8"
                fill="rgba(168,85,247,0.06)"
                stroke="rgba(168,85,247,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="710"
                y="60"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                POLARITY
              </text>
              <text x="710" y="84" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 26 — Polarity #
              </text>
              <text x="710" y="110" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                ✓ correct only on EIC
              </text>
              <text x="710" y="125" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                X permitted on EICR only
              </text>

              <rect
                x="20"
                y="190"
                width="180"
                height="120"
                rx="8"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="110"
                y="210"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                EARTH FAULT LOOP
              </text>
              <text x="110" y="232" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 27 — Max measured
              </text>
              <text x="110" y="250" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Zₛ (Ω)
              </text>
              <text x="110" y="278" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Judged against col 12
              </text>
              <text x="110" y="293" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (max permitted Zₛ §)
              </text>

              <rect
                x="220"
                y="190"
                width="180"
                height="120"
                rx="8"
                fill="rgba(236,72,153,0.06)"
                stroke="rgba(236,72,153,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="310"
                y="210"
                textAnchor="middle"
                fill="#EC4899"
                fontSize="10"
                fontWeight="bold"
              >
                RCD
              </text>
              <text x="310" y="232" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 28 — Disconnection (ms)**
              </text>
              <text x="310" y="250" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 29 — Test button
              </text>
              <text x="310" y="278" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                ** AC test at rated IΔn
              </text>
              <text x="310" y="293" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                — longest of the readings
              </text>

              <rect
                x="420"
                y="190"
                width="180"
                height="120"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="510"
                y="208"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                ⚠ NEW AT A4:2026
              </text>
              <text
                x="510"
                y="225"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                AFDD
              </text>
              <text x="510" y="247" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 30 — Manual test
              </text>
              <text x="510" y="265" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                button operation ††
              </text>
              <text x="510" y="288" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                †† Not all AFDDs have a
              </text>
              <text x="510" y="301" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                test button → N/A allowed
              </text>

              <rect
                x="620"
                y="190"
                width="180"
                height="120"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="710"
                y="210"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="10"
                fontWeight="bold"
              >
                REMARKS
              </text>
              <text x="710" y="232" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Col 31 — Remarks
              </text>
              <text x="710" y="258" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Vulnerable equipment;
              </text>
              <text x="710" y="273" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                source of col 12 if not
              </text>
              <text x="710" y="288" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                from BS 7671 Chapter 41
              </text>

              <rect
                x="20"
                y="335"
                width="780"
                height="35"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="410" y="357" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Column 30 (AFDD manual test) is the A4:2026 addition — pairs with item 4.23 of the
                Schedule of Inspection and Reg 421.1.7.
              </text>
            </svg>
          </div>

          <Scenario
            title="Reading a schedule for a 32 A radial — column-by-column"
            situation="A 32 A radial (way 4) on a 230 V TN-S supply. Cable 4.0/1.5 mm² T&E. Length 28 m. Header Ze = 0.31 Ω. Schedule of Circuit Details column 12 max permitted Zs = 1.37 Ω (Table 41.3 default for B32 with 0.4 s disconnection at 70°C). Schedule of Test Results readings: col 21 R1+R2 = 0.51 Ω, col 24 IR L-L = >299 MΩ, col 25 IR L-E = >299 MΩ, col 26 polarity ✓, col 27 max measured Zs = 0.86 Ω, col 28 RCD disconnection blank (no RCD on this circuit), col 30 AFDD blank (no AFDD)."
            whatToDo={
              <>
                <span className="block">
                  Calculated R1+R2 at 20°C = 28 m × 16.71 mΩ/m = 0.47 Ω. Measured 0.51 Ω is within
                  10 % — accept.
                </span>
                <span className="block">
                  Predicted Zs at 20°C = 0.31 + 0.51 = 0.82 Ω. Live-measured (col 27) = 0.86 Ω.
                  Discrepancy 0.04 Ω — within tolerance for a TN-S circuit (some warming of
                  conductors during the live test).
                </span>
                <span className="block">
                  Col 27 (0.86 Ω) vs col 12 (1.37 Ω): comfortable headroom. Compliant.
                </span>
                <span className="block">
                  IR readings on the &gt;299 MΩ ceiling — fine. Polarity ✓ — fine. Cols 28 and 30
                  blank because no RCD or AFDD on this circuit — that is correct, not an omission.
                </span>
              </>
            }
            whyItMatters="The schedule reads itself when the columns are right. Column 21 confirms the dead-test is consistent with the cable. Columns 27 and 12 confirm the live-test is consistent with the design. The fact that columns 28 and 30 are blank is part of the data — they record what the circuit is, not just what was tested."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Column 30 — the AFDD addition</ContentEyebrow>

          <ConceptBlock
            title="Why column 30 was added at A4:2026"
            plainEnglish="Reg 421.1.7 was introduced into A4:2026 recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits. The Schedule of Inspection gained item 4.23 (Confirmation of indication that AFDD(s) are operational, ref. 421.1.7; 532.6; 651.2(e)). The Schedule of Test Results gained column 30 (Manual test button operation) to record the functional test."
            onSite="The †† footnote — &ldquo;Not all AFDDs have a test button&rdquo; — is essential. The column may be left blank or marked N/A for a test-button-less device. That is a correct entry, not an oversight. What is not acceptable is leaving column 30 blank on a circuit where the AFDD does have a test button and you simply did not press it."
          >
            <p>
              The A4:2026 amendment to Section 421 adds Reg 421.1.7 recommending AFDDs in AC final
              circuits of fixed installations. The model forms followed: Schedule of Inspection item
              4.23 captures the visual / functional check that the AFDD is operational; column 30 of
              the Schedule of Test Results records the manual test button operation specifically.
              The pairing makes both regulations auditable in a single inspection.
            </p>
            <p>
              For circuits where no AFDD is fitted, column 30 is blank (or N/A). For circuits where
              an AFDD with a test button is fitted, column 30 records the result of pressing that
              button. For an AFDD without a test button, the †† footnote applies — the column is
              N/A, and item 4.23 of the Schedule of Inspection records the indicator-light check
              instead.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 421.1.7"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc fault
                detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a
                fixed installation due to the effects of arc fault currents.
              </>
            }
            meaning="The recommendation cascades into two model-form changes: Schedule of Inspection item 4.23 (operational confirmation) and Schedule of Test Results column 30 (manual test). Together they make the AFDD requirement testable, recordable, and auditable."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The cross-checks that catch real faults</ContentEyebrow>

          <ConceptBlock
            title="Five column-vs-column checks every schedule should pass"
            plainEnglish="A correctly filled schedule passes five internal consistency checks. Each one is a different way of catching a real defect — or a measurement error that would otherwise be signed off."
          >
            <ol className="list-decimal pl-5 space-y-2 text-[14px]">
              <li>
                <strong className="text-elec-yellow">Col 21 vs calculated R1+R2.</strong> Measured
                R1+R2 should be within ~10 % of the cable-data calculation (length × (r₁ + r₂) from
                GN3 Table BI). Significant divergence high → joint or cable issue. Significant
                divergence low → parallel earth path masking the CPC.
              </li>
              <li>
                <strong className="text-elec-yellow">Col 27 vs Ze + col 21.</strong> Live-measured
                Zs should match the dead-test sum (Ze + R1+R2) within a few hundredths of an ohm for
                a TN system. A larger discrepancy means either Ze has changed since the header, a
                parallel path was lost during the live test, or a joint heated up under test
                current.
              </li>
              <li>
                <strong className="text-elec-yellow">Col 27 vs col 12.</strong> The live-measured Zs
                (col 27) must be ≤ the design-limit Zs (col 12). This is the actual Reg 411.4
                disconnection compliance check — not against Table 41.3 directly.
              </li>
              <li>
                <strong className="text-elec-yellow">Col 28 vs Reg 415.1.</strong> RCD disconnection
                time at IΔn should be ≤ 300 ms for a Type AC general-purpose RCD on a final circuit
                (≤ 40 ms at 5×IΔn where 5×IΔn is also tested). Longer = device or wiring problem.
              </li>
              <li>
                <strong className="text-elec-yellow">
                  Col 18 vs col 19, ratio col 20 ÷ col 18.
                </strong>{' '}
                On a ring final, r₁ ≈ rₙ (line and neutral identical conductors and lengths). The
                ratio r₂/r₁ should match the cable-spec ratio of CPC to line resistivity (e.g. ~1.63
                for 2.5/1.5 mm² T&amp;E, 1.0 for 4.0/4.0 mm²).
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Filling column 27 from the dead-test sum, not the live test"
            whatHappens="The inspector calculates Ze + R1+R2 and writes that into column 27. The certificate is signed. Months later, an EICR reveals the actual Zs on that circuit is 0.4 Ω higher than the schedule says — because the live test was never actually performed at the furthest point. The original schedule misled every subsequent inspector."
            doInstead="Column 27 is the live-test reading. Earth fault loop impedance must be measured live at the furthest point of the circuit (Reg 643.7.3). The dead-test sum (Ze + R1+R2) is a useful predictive cross-check but it is not what column 27 records. Use the live-test value, every time. If the meter is broken, do not certify."
          />

          <CommonMistake
            title="Recording an X in column 26 (polarity) on an EIC schedule"
            whatHappens="The inspector finds a reversed-polarity socket on a new installation, marks the schedule with X in column 26, and signs the EIC anyway with a comment in remarks. The EIC is invalid — the # footnote on column 26 explicitly forbids X on a schedule attached to an EIC."
            doInstead="On an EIC, column 26 must be ✓ for every circuit. If polarity is wrong, fix it before signing. The EIC is a certificate of compliant work, not a record of compliant-with-known-defects work. X is permitted only on an EICR Schedule of Test Results, where existing non-compliances are exactly what the form records — and even then, the X drives a C1 or C2 in the EICR Section K observations."
          />

          <ConceptBlock
            title="Reading the schedule for fault investigation"
            plainEnglish="When something feels wrong on site — nuisance trips, a circuit that smells warm at the board, a complaint about lights flickering — the schedule is the first piece of evidence to look at. Specific column patterns point to specific failure modes."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Col 21 high, col 27 high (proportionally).</strong> The fault is in the
                cable / CPC of the affected circuit — loose joint, damaged conductor, or undersized
                CPC.
              </li>
              <li>
                <strong>Col 21 normal, col 27 high.</strong> The Ze has shifted — likely a problem
                at the supply or main earthing arrangement. Re-measure Ze; if it has risen, the
                fault is upstream of the consumer unit.
              </li>
              <li>
                <strong>Col 21 low (lower than calculated), col 27 normal.</strong> Parallel earth
                paths via metalwork are masking a degraded CPC. The day someone removes the
                metalwork, Zs jumps. Investigate the CPC under disconnection of containment.
              </li>
              <li>
                <strong>Col 28 longer than 300 ms.</strong> RCD past its design life, or wiring
                fault increasing the residual current threshold. Replace the RCD or investigate
                stray neutral-to-earth currents on the circuit.
              </li>
              <li>
                <strong>Col 24 or 25 below 1.0 MΩ.</strong> Insulation degradation. May be moisture
                ingress, cable damage, or a leaking appliance left connected during the test.
                Disconnect appliances and re-test before condemning the wiring.
              </li>
              <li>
                <strong>Col 18 ≠ col 19 on a ring.</strong> Either the ring is broken (one leg open
                somewhere), or a spur has been added that should not have been added, or the
                connections at the board are not on the same conductor. Investigate the ring
                topology before any further testing.
              </li>
            </ul>
          </ConceptBlock>

          {/* Cross-check decision diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Column 27 (measured Zₛ) vs Column 12 (max permitted Zₛ) — the decision
            </h4>
            <svg
              viewBox="0 0 800 320"
              className="w-full h-auto"
              role="img"
              aria-label="Decision flow comparing measured Zs in column 27 to the design limit in column 12, with branches for compliant, marginal, and non-compliant outcomes."
            >
              <rect
                x="320"
                y="20"
                width="160"
                height="50"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="400"
                y="42"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                START
              </text>
              <text x="400" y="58" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Read col 27 measured Zₛ
              </text>

              <line
                x1="400"
                y1="70"
                x2="400"
                y2="100"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="400,100 396,92 404,92" fill="rgba(255,255,255,0.4)" />

              <rect
                x="280"
                y="100"
                width="240"
                height="40"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <text
                x="400"
                y="120"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                col 27 ≤ col 12 × 0.95?
              </text>
              <text x="400" y="134" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (Comfortable headroom against design limit)
              </text>

              <line x1="400" y1="140" x2="400" y2="170" stroke="#22C55E" strokeWidth="1.5" />
              <text x="410" y="158" textAnchor="start" fill="#22C55E" fontSize="10">
                YES
              </text>
              <line x1="400" y1="170" x2="180" y2="170" stroke="#22C55E" strokeWidth="1.5" />
              <line x1="180" y1="170" x2="180" y2="200" stroke="#22C55E" strokeWidth="1.5" />
              <polygon points="180,200 176,192 184,192" fill="#22C55E" />
              <rect
                x="60"
                y="200"
                width="240"
                height="60"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="180"
                y="222"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                PASS — record on schedule
              </text>
              <text x="180" y="240" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Continue to RCD test (col 28)
              </text>
              <text x="180" y="254" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                and AFDD test (col 30)
              </text>

              <text x="510" y="160" textAnchor="middle" fill="#EF4444" fontSize="10">
                NO — but col 27 ≤ col 12?
              </text>

              <rect
                x="540"
                y="170"
                width="240"
                height="40"
                rx="6"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.2"
              />
              <text
                x="660"
                y="190"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Marginal: pass but flag
              </text>
              <text x="660" y="204" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Note in col 31 Remarks
              </text>

              <rect
                x="540"
                y="225"
                width="240"
                height="50"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="660"
                y="245"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                FAIL — col 27 &gt; col 12
              </text>
              <text x="660" y="262" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Reg 411.4 not satisfied. Investigate
              </text>
              <text x="660" y="275" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                before signing EIC.
              </text>

              <rect
                x="20"
                y="290"
                width="760"
                height="20"
                rx="4"
                fill="rgba(251,191,36,0.05)"
                stroke="rgba(251,191,36,0.15)"
                strokeWidth="1"
              />
              <text x="400" y="304" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                The decision is always col 27 vs col 12 — never col 27 vs raw Table 41.3. Column 12
                may already be tighter than Table 41.3.
              </text>
            </svg>
          </div>

          <Scenario
            title="A ring final that fails three cross-checks"
            situation="Way 6 is a 32 A ring final, 2.5/1.5 mm² T&E. Schedule readings: col 18 r₁ = 0.40 Ω, col 19 rₙ = 0.62 Ω, col 20 r₂ = 0.55 Ω, col 21 (R1+R2) = 0.24 Ω, col 27 max Zs = 1.41 Ω. Col 12 max permitted Zs = 1.37 Ω. Header Ze = 0.32 Ω."
            whatToDo={
              <>
                <span className="block">
                  Cross-check 1: r₁ (0.40) vs rₙ (0.62) — should be approximately equal on a sound
                  2.5 mm² ring. They are not. Either the neutral has an extra length, a spur is on
                  the ring on one leg only, or the ring is broken on the neutral.
                </span>
                <span className="block">
                  Cross-check 2: r₂/r₁ ratio = 0.55/0.40 = 1.38 — sound for 2.5/1.5 mm² T&amp;E
                  (expected ~1.63 — actually a bit lower than expected, hinting at parallel earth
                  paths).
                </span>
                <span className="block">
                  Cross-check 3: col 27 (1.41 Ω) &gt; col 12 (1.37 Ω) — fails Reg 411.4
                  disconnection at 70°C operating temperature.
                </span>
                <span className="block">
                  Action: do not sign. Re-test the ring continuity at the board to confirm the rₙ
                  reading. Investigate the topology — open the back-boxes from the consumer unit
                  working outwards. The most likely cause is an unsanctioned spur that has converted
                  part of the ring into a radial-plus-spur arrangement.
                </span>
              </>
            }
            whyItMatters="A schedule that fails internal cross-checks is a schedule that is telling you something is wrong. Three failures simultaneously is not coincidence — it is a single root cause showing up in three columns at once. Sign that off and you own the consequences."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The footnotes — small print that is not small</ContentEyebrow>

          <ConceptBlock
            title="Every footnote is anchored to a specific regulation"
            plainEnglish="The schedule footnotes (#, †, ‡, ‡‡, **, ¶, §, ††) are not stylistic choices — each one anchors a column to a regulation or a normative document. Inspectors who treat them as small print miss the regulatory hooks they carry."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Mark</th>
                    <th className="text-left text-white/80 py-2">Footnote text (verbatim)</th>
                    <th className="text-left text-white/80 py-2">Anchored to</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">¶</td>
                    <td>&ldquo;Not all SPDs have visible functionality indication.&rdquo;</td>
                    <td>Reg 651.4 / SPD operational status</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">#</td>
                    <td>
                      &ldquo;An &lsquo;X&rsquo; denoting incorrect polarity, cannot be entered on to
                      this schedule when issued with an Electrical Installation Certificate.&rdquo;
                    </td>
                    <td>Reg 644.1.2 — defects must be corrected before EIC issue</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">**</td>
                    <td>
                      &ldquo;RCD Effectiveness is verified using an alternating-current test at
                      rated residual operating current (IΔn).&rdquo;
                    </td>
                    <td>Reg 643.8 / Reg 415.1</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">‡‡</td>
                    <td>
                      &ldquo;Where this schedule forms part of an Electrical Installation
                      Certificate, insulation resistance testing should be performed at the test
                      voltage stated in Table 64.&rdquo;
                    </td>
                    <td>BS 7671 Table 64 (test voltages)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">††</td>
                    <td>&ldquo;Not all AFDDs have a test button.&rdquo;</td>
                    <td>Reg 421.1.7 / item 4.23 SoI — A4:2026 addition</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">‡</td>
                    <td>
                      (On Schedule of Circuit Details col 4) &ldquo;See Table 4A2 of Appendix 4 of
                      BS 7671:2018+A4:2026&rdquo;
                    </td>
                    <td>Appendix 4 reference methods (revised at A4)</td>
                  </tr>
                  <tr>
                    <td className="py-2">§</td>
                    <td>
                      &ldquo;Where the maximum permitted fault loop impedance value listed in column
                      12 is taken from a source other than the tabulated values given in Chapter 41
                      of BS 7671:2018+A4:2026, state the source of the data in the appropriate cell
                      for the circuit in the Remarks column 31 of the Schedule of Test
                      Results.&rdquo;
                    </td>
                    <td>Reg 411.4 / Chapter 41 / column 12 source declaration</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Treat the footnotes as the bridge between the form and the regulation. They are not
              optional reading.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The header and the instrument log</ContentEyebrow>

          <ConceptBlock
            title="The schedule header — supply and DB context"
            plainEnglish="The Schedule of Test Results header records the supply context that applies to every row beneath it: Zₑ, prospective fault current Iₚf, phase sequence, SPD operational status, and the DB / consumer unit reference. Get the header right and every row inherits the right context."
          >
            <p>The header fields, in order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>DB/CU reference, Location, Type, Rating/Setting, Supplied from.</strong>{' '}
                Identifies the board this schedule applies to. A separate schedule per board.
              </li>
              <li>
                <strong>Zₑ (Ω):</strong> External earth fault loop impedance measured at the origin.
                Critical — every column 27 entry on the schedule is judged against (col 12) which is
                itself derived from Zₑ.
              </li>
              <li>
                <strong>Iₚf (kA):</strong> Prospective fault current at the origin. Equals the
                greater of prospective short-circuit and prospective earth fault currents (per the
                EIC notes).
              </li>
              <li>
                <strong>SPD details: Type, BS (EN), Rated IΔn.</strong> If an SPD is fitted at the
                origin or DB.
              </li>
              <li>
                <strong>Confirmed / Phase sequence / Operational status confirmed¶ / N/A.</strong>{' '}
                Tick boxes for SPD and phase sequence checks. The ¶ footnote applies to SPDs without
                visible indication — N/A is correct, not a tick of convenience.
              </li>
              <li>
                <strong>Details of test instruments used (serial / asset numbers):</strong> Six rows
                — Multifunction, Continuity, Insulation resistance, Earth fault loop impedance, RCD,
                Earth electrode resistance. Each row gets the instrument that actually performed
                that test. One multifunction tester for all → same serial in every row. Different
                instruments for different tests → different serials.
              </li>
              <li>
                <strong>Tested by, Signature, Date.</strong> The person who actually performed the
                tests, not the office signatory.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Two schedules, one form: Circuit Details (cols 1-16, design) + Test Results (cols 17-31, measurement).',
              'Column 12 = max permitted Zₛ (design). Column 27 = max measured Zₛ (test). The compliance check is col 27 ≤ col 12.',
              'Column 28 RCD disconnection = longest reading at rated IΔn (AC test, per ** footnote).',
              'Column 30 (AFDD manual test) is new at A4:2026. †† footnote: not all AFDDs have a test button — N/A is a valid entry.',
              'Polarity column 26: ✓ only on an EIC schedule. X is permitted only on EICR.',
              'Cross-check r₁ ≈ rₙ on a ring; r₂ / r₁ ≈ resistivity ratio of CPC csa to line csa.',
              'IR test voltage (col 23) per BS 7671 Table 64 — 500 V DC for 230 V LV final circuits, ≥ 1.0 MΩ.',
              'The schedule footnotes (¶, #, **, ‡‡, ††, ‡, §) are normative — each anchors a column to a specific regulation.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'On a TT installation, which column on the Schedule of Circuit Details holds the maximum permitted Zs, and how is the value derived?',
                answer:
                  'Column 12, exactly as for TN. The difference is in how column 12 is derived: on TT, the max permitted Zs is set by the requirement that the upstream RCD operates within its rated time at IΔn given the measured Zₑ, not by the BS 7671 Table 41.3 overcurrent values. The § footnote applies — state in column 31 (Remarks) that the column 12 value is derived from the RCD requirement, not from Chapter 41 of BS 7671 directly.',
              },
              {
                question:
                  'I have a circuit with both an RCD and an AFDD. Both have manual test buttons. Do I record both in column 30?',
                answer:
                  'No. Column 28 records the RCD disconnection time at IΔn (the live-test). Column 29 records the RCD test button operation (functional). Column 30 records ONLY the AFDD manual test button operation. Each device has its own column — do not merge them. If the AFDD is an AFDD/RCD combined unit, the device is recorded as both an RCD (cols 28, 29) and an AFDD (col 30) — three entries for one device, because each column tests a different aspect.',
              },
              {
                question:
                  'The schedule footnote ‡‡ says "Where this schedule forms part of an Electrical Installation Certificate, insulation resistance testing should be performed at the test voltage stated in Table 64". Does that mean test voltage is different on an EICR?',
                answer:
                  'On an EIC the test voltage must be exactly the Table 64 value (500 V DC for 230 V LV). On an EICR you may sometimes reduce the test voltage to avoid damaging old, deteriorating insulation that would not survive 500 V DC — but this must be noted in column 31 (Remarks) and may drive an FI (Further Investigation) classification in Section K of the EICR. Table 64 is still the reference; deviation on an EICR is documented as a deviation, not silently applied.',
              },
              {
                question:
                  'Can I leave column 22 (R₂, wandering lead) blank if I used Method 1 for continuity?',
                answer:
                  'Yes. Column 21 captures Method 1 R1+R2 readings; column 22 captures Method 2 R₂-only readings. Each circuit will normally have one or the other, not both. Leaving the column not used as blank is correct — it tells the next inspector which method was applied.',
              },
              {
                question:
                  'What if a circuit has multiple RCDs in series (an RCD main switch and an RCBO on the way)?',
                answer:
                  'Column 28 records the longest disconnection time of the device that actually disconnects the circuit at IΔn — typically the most local device (the RCBO). The upstream RCD main switch is tested separately and recorded in its own row of the schedule (or on the EIC main switch test record). The principle: column 28 records the device responsible for fault protection on this circuit, not every RCD that exists on the supply path.',
              },
              {
                question:
                  'The schedule has separate rows for each test instrument used. We use one multifunction tester. Do I write its serial in every row?',
                answer:
                  'Yes. The schedule is asking for traceability per test, not per instrument. If one multifunction tester does Continuity, Insulation, Earth fault loop, and RCD, write its serial number in each of those rows. The Earth electrode row may be blank (or the same serial if your MFT does electrode tests). Do not abbreviate to a single header line — fill in the rows. Calibration certificates audit per row, not per header.',
              },
              {
                question:
                  'On a domestic EIC for a new build, which schedule do I use — the Generic Schedule of Circuit Details / Test Results, or a "Domestic" schedule?',
                answer:
                  'The model forms in Appendix 6 of BS 7671:2018+A4:2026 give a Generic Schedule of Circuit Details and a Generic Schedule of Test Results — there is one set of schedules, and they apply to all installations regardless of premises type. The "Schedule of Inspection for Residential and Similar Premises with up to 100 A Supply" is a separate document (and is the one used with EICRs). For a new-build EIC, use the Schedule of Inspection from the EIC notes (Section H of the EIC) plus the Generic Schedule of Circuit Details and Schedule of Test Results.',
              },
              {
                question:
                  'I have an old (pre-A4) schedule template in our office. Can I keep using it for now?',
                answer:
                  'No. Reg 644.3 requires schedules based on the models in Appendix 6 of the current BS 7671 — that is now A4:2026. The pre-A4 template is missing column 30 (AFDD manual test), and its footnotes do not match the A4 wording. Using the wrong template is a Reg 644.3 non-compliance and the EIC issued with it is technically invalid. Update the template before issuing your next EIC.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Schedule of Test Results — Module 8.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 8
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-8/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.4 Electrical Installation Certificates
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

export default InspectionTestingModule8Section3;
