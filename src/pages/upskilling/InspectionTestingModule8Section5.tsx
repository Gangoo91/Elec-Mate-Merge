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
    id: 'mod8-s5-meiwc-scope',
    question:
      'You added two sockets to a kitchen ring AND replaced a bathroom light fitting. Can you issue one MEIWC for the lot?',
    options: [
      'Yes — one MEIWC covers all minor work in a single visit',
      'No — Reg 644.4.201 says “a Minor Electrical Installation Works Certificate ... may be provided for each circuit that has been added to or altered”. The two sockets are on the kitchen ring (one circuit); the bathroom light is on a different circuit. Two separate MEIWCs — one per affected circuit — or a single EIC under EIC case (d)',
      'Only if the customer signs both off together',
      'Yes — MEIWCs are not circuit-specific',
    ],
    correctIndex: 1,
    explanation:
      'Reg 644.4.201 ties the MEIWC to a single circuit. Two affected circuits = two MEIWCs, or alternatively a single EIC under case (d) “multiple additions, or alterations or remedial works ... as an alternative to the issue of multiple Minor Electrical Installation Works Certificates”.',
  },
  {
    id: 'mod8-s5-fi-not-unsat',
    question:
      'An EICR has no C1 or C2 codes, but two FI (Further Investigation) codes for cables concealed under a floor that could not be lifted. What is the correct verdict in Section E?',
    options: [
      'Unsatisfactory — FI items prevent a Satisfactory verdict',
      'Satisfactory — A4:2026 confirmed FI no longer drives Unsatisfactory. Only C1 or C2 trigger Unsatisfactory. The FI items are recorded in Section K and Section F can recommend follow-up by a specified date',
      'Pending',
      'Provisional',
    ],
    correctIndex: 1,
    explanation:
      'EICR Notes for the Producer item 12 (A4:2026) reads: “The overall assessment of the installation is to be reported as unsatisfactory where any observation is given a code C1 or C2 classification”. FI is now explicitly outside the Unsatisfactory trigger. The pre-A4 habit of marking any FI as Unsatisfactory was a misapplication of the standard.',
  },
  {
    id: 'mod8-s5-c3-older-install',
    question:
      'A 2008-installed lighting circuit in a domestic property has no 30 mA RCD. Which classification code applies on the EICR?',
    options: [
      'C1 — danger',
      'C3 (Improvement recommended). Per EICR Note 4, an installation designed to an earlier version of BS 7671 is not necessarily unsafe; the absence is a non-compliance with the current Reg 411.3.4 but does not give rise to immediate danger',
      'C2',
      'FI',
    ],
    correctIndex: 1,
    explanation:
      'Note 4 governs older installations: non-compliance with the current edition is not necessarily unsafe. The pre-411.3.4 lighting circuit is C3 (Improvement recommended) — advisory, does not affect the verdict. Misclassifying as C2 would generate an Unsatisfactory verdict and a remediation bill the homeowner does not actually need.',
  },
  {
    id: 'mod8-s5-section-d-recall',
    question:
      'A client asks why their EICR Section D states “No checks for safety alerts, corrective actions or product recalls for electrical equipment forming part of the installation have been made”. What is the rationale?',
    options: [
      'It is a decorative clause',
      'It is the A4:2026 default limitation, in force unless specifically agreed between the client and inspector prior to the inspection. Recall-checking is not part of a standard EICR; if the client wants it, they must agree it explicitly in advance. Without that agreement, the limitation is in force and the inspector’s liability is bounded',
      'It absolves the inspector of all liability',
      'It is mandatory follow-up by the client',
    ],
    correctIndex: 1,
    explanation:
      'Section D begins “Unless specifically agreed between the client and inspector prior to the inspection: ...” and lists the default limitations. The recall-check limitation is the A4:2026-era clarification that recall-checking is not part of standard EICR scope. The client may agree it in the “Agreed limitations” field; without that agreement, the default limitation applies.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 644.4.201 sets the boundary for when a Minor Electrical Installation Works Certificate (MEIWC) may be used. What does that boundary actually say?',
    options: [
      'For any electrical work whatsoever',
      'Where electrical installation work does not include the provision of a new circuit or replacement of a distribution board or consumer unit, a MEIWC based on the model in Appendix 6 may be provided for each circuit that has been added to or altered as an alternative to an EIC',
      'Only for socket additions',
      'Only for residential premises',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 644.4.201 reads: "Where electrical installation work does not include the provision of a new circuit or replacement of a distribution board or consumer unit, a Minor Electrical Installation Works Certificate, based on the model given in Appendix 6, may be provided for each circuit that has been added to or altered as an alternative to an Electrical Installation Certificate". Two boundaries: (a) no new circuit; (b) no DB / CU replacement. If either is breached, you must use an EIC.',
  },
  {
    id: 2,
    question:
      'On the A4:2026 MEIWC Section A ("Description of the minor works"), item 4 explicitly cites four BS 7671 regulations relating to permitted departures. Which are they?',
    options: [
      'Reg 411.3.3, 415.1, 522.6.202, 643.2',
      'Reg 120.3, 133.1.2, 133.1.3, 133.5 — plus Reg 411.3.3 specifically called out for permitted exceptions',
      'Reg 651, 652, 653, 654',
      'Reg 644.1, 644.2, 644.3, 644.4',
    ],
    correctAnswer: 1,
    explanation:
      'MEIWC Section A item 4 reads: "Details of any departures from BS 7671:2018 as amended to ......... (date) for the circuit altered or extended (Regulation 120.3, 133.1.2, 133.1.3 and 133.5). Details of permitted exceptions (Regulation 411.3.3). Where applicable, a suitable risk assessment(s) must be attached to this Certificate. ............................................. Risk assessment attached [box]". The four departure regulations (120.3, 133.1.2, 133.1.3, 133.5) are the same as on the EIC; Reg 411.3.3 is the additional protection / risk-assessed exception.',
  },
  {
    id: 3,
    question:
      'On the A4:2026 EICR, the overall verdict in Section E is one of two outcomes: SATISFACTORY or UNSATISFACTORY. Which observation classification codes drive an UNSATISFACTORY verdict?',
    options: [
      'C1 only',
      'C1 or C2 only — per Section E: "An unsatisfactory assessment indicates that dangerous (code C1) and/or potentially dangerous (code C2) conditions have been identified"',
      'C1, C2, C3 and FI',
      'C3 only',
    ],
    correctAnswer: 1,
    explanation:
      'EICR Section E states: "An unsatisfactory assessment indicates that dangerous (code C1) and/or potentially dangerous (code C2) conditions have been identified". C3 (Improvement recommended) and FI (Further investigation) do NOT drive UNSATISFACTORY. The Notes for the Producer item 12 reinforces this: "The overall assessment of the installation is to be reported as unsatisfactory where any observation is given a code C1 or C2 classification". Note that A4 confirmed FI no longer makes the report unsatisfactory.',
  },
  {
    id: 4,
    question:
      'On the EICR Schedule of Inspection, item 4.23 reads "Confirmation of indication that AFDD(s) are operational (421.1.7; 532.6; 651.2(e))". A house has no AFDDs fitted. What is the correct outcome?',
    options: [
      'C1',
      'N/A — there is no AFDD to confirm operational; the absence is recorded against item 4.18 (additional protection considerations) rather than item 4.23',
      'C2',
      'Skip the item',
    ],
    correctAnswer: 1,
    explanation:
      'Item 4.23 confirms an AFDD&rsquo;s OPERATIONAL STATUS — it does not require an AFDD to be present. If no AFDD is installed, item 4.23 is N/A (there is nothing to confirm operational). The absence of AFDD where Reg 421.1.7 recommends one is a separate consideration — typically a C3 (Improvement recommended) at item 4.18 (RCD/RCBO additional protection / requirements), since 421.1.7 is a recommendation, not a hard requirement. Always read item 4.23 against what is actually fitted.',
  },
  {
    id: 5,
    question:
      'On the EICR Schedule of Inspection item 5.12, the bullet list of circuits requiring 30 mA RCD additional protection now includes "Final circuits supplying luminaires within domestic (household) premises (411.3.4)". A 2008-installed lighting circuit in a domestic property has no 30 mA RCD. Which classification?',
    options: [
      'C1 — danger',
      'C3 (Improvement recommended) — current Reg 411.3.4 was not in force when the installation was constructed; the absence is a non-compliance with the current standard but not an immediate danger',
      'C2',
      'FI',
    ],
    correctAnswer: 1,
    explanation:
      'Per the EICR Notes for the Producer item 4: "An installation which was designed to an earlier version of BS 7671 or the IEE Wiring Regulations and which does not fully comply with the current version is not necessarily unsafe for continued use, or require upgrading". The 2008 installation predates the current Reg 411.3.4 lighting RCD requirement; the absence is a non-compliance with the current standard, classified C3 (Improvement recommended) — not C1 or C2. Note 15 confirms: "C3 observation is advisory and does not affect the overall assessment of the Report".',
  },
  {
    id: 6,
    question:
      'EICR Section D ("Extent and Limitations") includes an A4:2026 explicit limitation: "No checks for safety alerts, corrective actions or product recalls for electrical equipment forming part of the installation have been made." What does this clause achieve?',
    options: [
      'It absolves the inspector of any responsibility',
      "It is a clear, written acknowledgement that the inspector did not check manufacturer safety alerts / recalls (e.g. Wylex / FuseBox / Hager device recalls) — this is a routine limitation that the client accepts in advance, narrowing the inspector's liability for missed recalls",
      'It is mandatory follow-up by the client',
      'It is decorative',
    ],
    correctAnswer: 1,
    explanation:
      'Section D lists default limitations that "unless specifically agreed between the client and inspector prior to the inspection" apply. The recall-check limitation is an A4:2026-era clarification that recall-checking is not part of a standard EICR. If the client wants recall-checking they must agree it explicitly in advance and pay for it. Without that agreement, the limitation is in force and the inspector&rsquo;s liability is bounded.',
  },
  {
    id: 7,
    question:
      'On the EICR, an inspector finds that a final circuit&rsquo;s polarity is reversed at one accessory. Which classification, and what action is mandated?',
    options: [
      'C3 — improvement recommended',
      'C1 — danger present, risk of injury, immediate remedial action is necessary; per Note 13 "items classified as Danger present (C1) are to be made safe on discovery"',
      'C2',
      'FI',
    ],
    correctAnswer: 1,
    explanation:
      'Reversed polarity (line and neutral swapped) is a C1 — Danger present. EICR Notes for the Producer item 13: "Wherever practicable, items classified as Danger present (C1) are to be made safe on discovery. Where this is not possible the owner or user is to be given written notification as a matter of urgency". The inspector cannot leave site without either making it safe (with consent) or issuing the urgent written notification. C1 always drives an UNSATISFACTORY verdict.',
  },
  {
    id: 8,
    question:
      'On the EICR Section K Observations, the form provides separate sub-tables for "C1 and C2 OBSERVATION(S)" and "C3 and FI OBSERVATION(S)". What is the rationale for this split?',
    options: [
      'It is purely visual',
      'The split is normative: C1 and C2 affect the overall assessment (driving UNSATISFACTORY); C3 and FI do not. The split makes the assessment-affecting observations visually distinct and forces the inspector to classify correctly before writing',
      'It is for archiving',
      'C3 observations are optional',
    ],
    correctAnswer: 1,
    explanation:
      'Section K is split into two sub-tables for a reason: the upper sub-table (C1, C2) carries the assessment-affecting observations, footnoted "These items affect the overall assessment of the report"; the lower sub-table (C3, FI) carries the advisory observations, footnoted "These items do not affect the overall assessment of the report". The split forces honest classification — if you write a finding under C1/C2, you have committed to UNSATISFACTORY; if you write under C3/FI, you have not.',
  },
  {
    id: 9,
    question:
      'EICR Section F ("Recommendation for Next Inspection") is supported by Reg 653.4 and Note 20 (Reg 651.4 / 652.1). What does it require?',
    options: [
      'A fixed 10-year interval for all installations',
      'A recommended date for the next EICR, supported by an explanation. Per Reg 653.4 the report shall indicate a recommended interval until the next inspection, supported by an explanation. The interval should consider Reg 652.1 frequency factors and the overall condition',
      'A guarantee of installation life',
      'The next utility bill',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 653.4 reads: "The Report shall indicate a recommended interval until the next inspection, supported by an explanation for the recommendation". Section F captures this. Note 20: "The interval until the next inspection is recorded in Section F in the form of a date by which the next Electrical Installation Condition Report is recommended, supported by an explanation for the recommendation, as required by Regulation 653.4. The interval between inspections should take into account the requirements of Regulation 652.1 and the overall condition of the installation."',
  },
  {
    id: 10,
    question:
      'A new A4:2026 note added to Reg 653.2 makes a specific recording method permissible. What is it?',
    options: [
      'Voice recording',
      'A note pointing out that photographic and/or thermographic images can be appended to the report — explicitly permitted in support of observations',
      'Witness statements',
      'AI-generated reports',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 added a note to Reg 653.2: "A note has also been added pointing out that photographic and/or thermographic images can be appended to the report". The EICR Section K confirms: "NOTE: Photographic and/or thermographic images can be attached to the report to support observations made in this Section". This is the regulatory basis for thermal-imaging photos and visible-light defect photos in modern EICRs.',
  },
];

const InspectionTestingModule8Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Minor Works & EICR | I&T Module 8.5 | Elec-Mate',
    description:
      'A4:2026 Minor Electrical Installation Works Certificate (MEIWC) and Electrical Installation Condition Report (EICR), section by section. Reg 644.4.201 boundary, Reg 653 EICR issuance, the C1/C2/C3/FI coding system, Satisfactory vs Unsatisfactory verdict, and how the EICR handles older installations.',
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
            eyebrow="Module 8 · Section 5"
            title="Minor Works &amp; EICR"
            description="The two certificates that complete the BS 7671:2018+A4:2026 Appendix 6 set: Minor Works (MEIWC) for additions and alterations, and EICR for periodic inspection — including the C1 / C2 / C3 / FI coding system."
            tone="yellow"
          />

          <TLDR
            points={[
              'Minor Works (MEIWC) per Reg 644.4.201 covers additions and alterations to a circuit that DO NOT include a new circuit, a CU replacement, or a DB replacement. One MEIWC per altered or added-to circuit.',
              'The MEIWC has five sections: A (description / departures / comments on existing), B (earthing arrangement and supply), C (circuit details — DB, OCPD, RCD, AFDD, SPD), D (test results for the altered circuit), E (declaration with single signature).',
              'EICR (Electrical Installation Condition Report) per Reg 653 is the periodic-inspection report for an existing installation. Sections A through K, with the verdict in Section E and the observations in Section K.',
              'Observation codes: C1 (Danger present — immediate action), C2 (Potentially dangerous — urgent action), C3 (Improvement recommended — advisory), FI (Further investigation advised — inspector cannot conclude).',
              'Verdict: Satisfactory when no C1 or C2 is present. Unsatisfactory when any C1 or C2 has been recorded. C3 and FI do NOT drive Unsatisfactory (A4:2026 confirmed FI no longer makes the report unsatisfactory).',
              "The EICR Schedule of Inspection (the long item-by-item list — items 1.0 to 8.0 with sub-items) carries the A4 additions: item 4.23 (AFDD operational), item 5.12 (lighting RCD bullet), item 1.2 (consumer's means of isolation), item 4.6 (main linked switch), and the new TN-C-S (PNB) tick-box on Section I.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State Reg 644.4.201 and apply the boundary correctly: when a MEIWC is permitted vs when an EIC is required',
              'Walk the MEIWC sections A through E and complete each correctly for a typical addition or alteration',
              'Walk the EICR sections A through K and explain what each records, including the A4:2026 limitation clauses on Section D',
              'Apply the C1 / C2 / C3 / FI classification system to common observations and know which codes drive Unsatisfactory',
              'Use the A4:2026 EICR notes to handle older installations (pre-current edition) without misclassifying the differences as dangers',
              'Record observations in EICR Section K against the correct sub-table (C1/C2 vs C3/FI) and use photographic / thermographic evidence per the A4 Reg 653.2 note',
            ]}
          />

          <ContentEyebrow>The Minor Works Certificate (MEIWC)</ContentEyebrow>

          <ConceptBlock
            title="Reg 644.4.201 — when a MEIWC is the right certificate"
            plainEnglish="A MEIWC may be used for additions and alterations to existing circuits that DO NOT introduce a new circuit and DO NOT include the replacement of a consumer unit or distribution board. One MEIWC per altered circuit. Examples: adding a socket-outlet to an existing ring, relocating a light switch, replacing a luminaire, replacing an accessory."
            onSite="Read Reg 644.4.201 as a fence: if the work is inside the fence (no new circuit, no CU/DB replacement), MEIWC is permitted. If the work crosses the fence (any new circuit or CU/DB replacement), you are out of MEIWC scope and must use an EIC."
          >
            <p>
              The MEIWC notes are explicit on scope: &ldquo;The Minor Electrical Installation Works
              Certificate is intended to be used for additions and alterations to an installation
              that do not extend to the provision of a new circuit. Examples include the addition of
              socket-outlets or lighting points to an existing circuit, the relocation of a light
              switch etc. This Certificate may also be used for the replacement of equipment such as
              accessories or luminaires, but not for the replacement of consumer units, distribution
              boards or similar items.&rdquo;
            </p>
            <p>
              The form&rsquo;s subtitle reinforces this: &ldquo;To be used only for minor electrical
              work which does not include the provision of a new circuit&rdquo;. There is no second
              case — MEIWC is one document, one circuit, one piece of work.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.4.201"
            clause={
              <>
                Where electrical installation work does not include the provision of a new circuit
                or replacement of a distribution board or consumer unit, a Minor Electrical
                Installation Works Certificate, based on the model given in Appendix 6, may be
                provided for each circuit that has been added to or altered as an alternative to an
                Electrical Installation Certificate.
              </>
            }
            meaning="MEIWC is the alternative to an EIC, permitted only for work that does not introduce a new circuit and does not replace the CU or DB. One MEIWC per altered or added-to circuit. If the work crosses either boundary, EIC is mandatory."
          />

          <ConceptBlock
            title="MEIWC Section A — Description of the minor works"
            plainEnglish="Five numbered fields: client details and date completed; installation location; description of the minor works; details of any departures from BS 7671 (Reg 120.3, 133.1.2, 133.1.3, 133.5) and permitted exceptions (Reg 411.3.3) with risk assessment if applicable; comments on the existing installation per Reg 644.1.2."
          >
            <p>The five Section A items, in order:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Details of the Client.</strong> Name plus &ldquo;Date minor works
                completed&rdquo;.
              </li>
              <li>
                <strong>Installation location/address.</strong> The site of the work.
              </li>
              <li>
                <strong>Description of the minor works.</strong> Plain-English description of what
                was done — &ldquo;Added one twin socket-outlet to existing kitchen ring; new socket
                connected to ring as a sister socket on existing circuit way 6&rdquo;, etc.
              </li>
              <li>
                <strong>
                  Details of any departures from BS 7671:2018 as amended to ......... (date) for the
                  circuit altered or extended (Regulation 120.3, 133.1.2, 133.1.3 and 133.5).
                  Details of permitted exceptions (Regulation 411.3.3).
                </strong>{' '}
                Where applicable, a suitable risk assessment(s) must be attached. The form has a
                &ldquo;Risk assessment attached&rdquo; tick-box.
              </li>
              <li>
                <strong>
                  Comments on (including any defects observed in) the existing installation
                  (Regulation 644.1.2).
                </strong>{' '}
                The Reg 644.1.2 obligation applies identically to MEIWC and EIC — record any defects
                in the existing installation, so far as is reasonably practicable.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="MEIWC Section B — Presence and adequacy of installation earthing and bonding (Reg 132.16)"
            plainEnglish="Three checks: system earthing arrangement (TN-S / TN-C-S PME / TN-C-S PNB / TT / TN-C / IT), Zₑ measured at the DB supplying the final circuit, and presence of adequate main protective conductors (earthing conductor and main bonding conductors to water, gas, oil, structural steel, &lsquo;Other&rsquo;)."
            onSite="Section B exists because Reg 132.16 requires an addition or alteration to be safe in its broader installation context. You cannot add a socket to a ring on an installation with no earthing — Section B forces you to confirm the earthing and bonding arrangement is in place and adequate before you sign."
          >
            <p>Section B has three numbered fields:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>System earthing arrangement:</strong> Tick-box: TN-S, TN-C-S (PME), TN-C-S
                (PNB), TT, TN-C, IT. Note that the A4:2026 MEIWC explicitly lists PNB alongside PME
                — the form follows Reg 312.2.1.1.
              </li>
              <li>
                <strong>
                  Earth fault loop impedance at distribution board (Zdb) supplying the final
                  circuit:
                </strong>{' '}
                Measured Zdb in ohms. This is the equivalent of Ze for the DB; it is what every Zs
                calculation on the altered circuit feeds back to.
              </li>
              <li>
                <strong>Presence of adequate main protective conductors:</strong> Earthing conductor
                presence (tick-box). Main protective bonding conductor(s) — tick-boxes for Water,
                Gas, Oil, Structural steel, &ldquo;Other (Specify)&rdquo;.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="MEIWC Section C — Circuit details"
            plainEnglish="The data for the altered or added-to circuit, in one block: DB Reference No, DB Location and type, Circuit No and description, Reference method (per Table 4A2 of Appendix 4), conductor csa Live and CPC, OCPD details, RCD details, AFDD details, SPD details."
          >
            <p>Section C captures the full circuit-details set. Fields, in order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>DB Reference No, DB Location and type</li>
              <li>
                Circuit No, Circuit description, Reference method (footnote: see Table 4A2 of
                Appendix 4 of BS 7671:2018+A4:2026)
              </li>
              <li>csa of conductors: Live (mm²), CPC (mm²)</li>
              <li>
                Circuit overcurrent protective device: BS (EN), Type, Rating (A), Breaking capacity
                (kA)
              </li>
              <li>
                RCD: BS (EN), Type, Rating (A), Rated residual operating current (IΔn) (mA), Rated
                time delay (ms)
              </li>
              <li>AFDD: BS (EN), Rating (A) — A4:2026 added field for AFDDs</li>
              <li>SPD: BS (EN), Type — A4:2026 added field for SPD particulars</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="MEIWC Section D — Test results for the altered or extended circuit"
            plainEnglish="The test results bracketed to the altered circuit. Ten lines: protective conductor continuity (R₁+R₂ or R₂), ring final continuity (r₁-r₁, rₙ-rₙ, r₂-r₂), insulation resistance (test voltage, L-L, L-E), polarity satisfactory, max measured Zₛ, RCD disconnection time at IΔn, RCD test button OK, AFDD test button OK, SPD functionality confirmed."
          >
            <p>Section D fields, in order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Protective conductor continuity: (R₁ + R₂) Ω or R₂ Ω</li>
              <li>
                Continuity of ring final circuit conductors: r₁-r₁ Ω, rₙ-rₙ Ω, r₂-r₂ Ω (only if the
                altered circuit is a ring)
              </li>
              <li>Insulation resistance: Test voltage V, Live-Live MΩ, Live-Earth MΩ</li>
              <li>Polarity satisfactory: tick-box</li>
              <li>Maximum measured earth fault loop impedance Zₛ Ω</li>
              <li>
                RCD disconnection time at rated residual operating current (IΔn) ms; Satisfactory
                test button operation: tick-box
              </li>
              <li>
                AFDD satisfactory test button operation: tick-box. Note on form: &ldquo;NOTE: Not
                all AFDDs have a test button&rdquo;
              </li>
              <li>
                SPD functionality confirmed: tick-box. Note: &ldquo;NOTE: Not all SPDs have visible
                functionality indication&rdquo;
              </li>
            </ul>
            <p>
              The two notes on the AFDD and SPD lines are the same notes as the schedule footnotes
              from Module 8.3 — the regulatory acknowledgement that not every device has a
              test-button or indicator.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="MEIWC Section E — Declaration"
            plainEnglish="The single-signature declaration. 'I certify that the work covered by this certificate does not impair the safety of the existing installation and the work has been designed, constructed, inspected and tested in accordance with BS 7671:2018 amended to .................. (date) and that to the best of my knowledge and belief, at the time of my inspection, complied with BS 7671 except as detailed in Section A.' Then Name, For/on behalf of, Address, Signature, Position, Date."
          >
            <p>
              Section E is the most important sentence on the form. It is a declaration that the
              minor works do not impair the safety of the existing installation. That is the
              regulatory hook of the whole certificate: a MEIWC is not a certificate for the
              existing installation, it is a certificate that your specific addition or alteration
              has not made things worse — and has been designed, constructed and verified to BS 7671
              in its own right.
            </p>
          </ConceptBlock>

          {/* MWC scope diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Reg 644.4.201 — when a MEIWC is permitted
            </h4>
            <svg
              viewBox="0 0 800 290"
              className="w-full h-auto"
              role="img"
              aria-label="Decision flow showing the boundary between MEIWC scope and EIC scope based on whether a new circuit is introduced or a consumer unit / distribution board is replaced."
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
                What kind of work?
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
                Does it introduce a new circuit?
              </text>
              <text x="400" y="134" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                OR replace a CU / DB?
              </text>

              <line x1="400" y1="140" x2="180" y2="170" stroke="#22C55E" strokeWidth="1.5" />
              <text
                x="280"
                y="160"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                NO
              </text>
              <rect
                x="60"
                y="170"
                width="240"
                height="60"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="180"
                y="192"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                MEIWC permitted
              </text>
              <text x="180" y="210" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                One MEIWC per altered /
              </text>
              <text x="180" y="223" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                added-to circuit
              </text>

              <line x1="400" y1="140" x2="640" y2="170" stroke="#EF4444" strokeWidth="1.5" />
              <text
                x="540"
                y="160"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                YES
              </text>
              <rect
                x="520"
                y="170"
                width="240"
                height="60"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="640"
                y="192"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                EIC required
              </text>
              <text x="640" y="210" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Out of MEIWC scope —
              </text>
              <text x="640" y="223" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                use Module 8.4 EIC instead
              </text>

              <rect
                x="20"
                y="250"
                width="760"
                height="30"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="270" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Examples within MEIWC scope: add a socket to existing ring, relocate a switch,
                replace a luminaire / accessory. Outside scope: add a new lighting circuit, replace
                the CU.
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

          <ContentEyebrow>The Electrical Installation Condition Report (EICR)</ContentEyebrow>

          <ConceptBlock
            title="Reg 653 — what an EICR is and what it must contain"
            plainEnglish="The EICR is the periodic-inspection report for an existing installation. Reg 653 specifies what it must include: extent of installation inspected, limitations, defects and dangerous conditions, non-compliances, the Schedule of Inspection, the Schedule of Circuit Details and Schedule of Test Results, and guidance for the recipient. The A4:2026 amendment also confirms photographic / thermographic images may be appended."
            onSite="Treat the EICR as a snapshot. It is a record of what you found on the inspection date, with classifications that drive remedial action. It is not a guarantee, not a warranty, and not a future-proof declaration of safety."
          >
            <p>
              Reg 653 has six sub-regulations setting out the content. Reg 653.4 (the operative one)
              requires the report to include: details of the parts of the installation inspected and
              tested; limitations of the inspection and testing; damage, deterioration, defects or
              dangerous conditions impairing safety; non-compliances with BS 7671 that might give
              rise to danger; Schedule(s) of Inspection (per Reg 642); Schedule(s) of Circuit
              Details and Schedule(s) of Test Results (per Reg 643); and guidance for the
              recipient(s) based on the model in Appendix 6.
            </p>
            <p>
              Reg 653.2 was updated at A4:2026 to add a note &ldquo;pointing out that photographic
              and/or thermographic images can be appended to the report&rdquo;. Section K of the
              EICR Notes confirms: &ldquo;Photographic and/or thermographic images can be attached
              to the report to support observations made in this Section&rdquo;.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 653.4"
            clause={
              <>
                The Report shall include the following: details of those parts of the installation
                that have been inspected and tested; any limitations of the inspection and testing;
                any damage, deterioration, defects or dangerous conditions, which might impair
                safety; any non-compliance with the requirements of BS 7671 which might give rise to
                danger; Schedule(s) of Inspection as appropriate to those detailed in Section 642;
                Schedule(s) of Circuit Details and Schedule(s) of Test Results of the appropriate
                tests detailed in Section 643; guidance for the recipient(s) based on the model in
                Appendix 6.
              </>
            }
            meaning="Seven mandatory components of the EICR. Missing any one — limitations, classifications, schedules, guidance — invalidates the report."
          />

          <ConceptBlock
            title="EICR sections A through K — what each section carries"
            plainEnglish="The EICR walks A through K. Section A (person ordering), B (reason), C (installation description), D (extent and limitations), E (summary verdict), F (next inspection), G (declaration), H (schedules attached), I (supply and earthing — same as EIC Section F), J (installation particulars — same as EIC Section G), K (observations with C1/C2/C3/FI codes)."
          >
            <p>The EICR section structure, with the A4:2026 changes flagged:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">§</th>
                    <th className="text-left text-white/80 py-2">Heading</th>
                    <th className="text-left text-white/80 py-2">What it records</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">A</td>
                    <td>Details of the Person Ordering the Report</td>
                    <td>Name, address — the recipient of the report under Reg 653</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">B</td>
                    <td>Reason for Producing this Report</td>
                    <td>Free-text reason; date(s) of inspection and testing</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">C</td>
                    <td>Details of the Installation</td>
                    <td>
                      Occupier, address, description (Residential/Commercial/Industrial/Other),
                      estimated age, evidence of additions/alterations, installation records
                      availability per Reg 651.1, date of last inspection
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 text-elec-yellow font-bold">D</td>
                    <td className="text-elec-yellow font-bold">
                      Extent and Limitations of Inspection and Testing (Reg 651)
                    </td>
                    <td className="text-elec-yellow">
                      Default limitations include "No checks for safety alerts, corrective actions
                      or product recalls" (A4:2026 wording) — narrows liability
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 text-elec-yellow font-bold">E</td>
                    <td className="text-elec-yellow font-bold">
                      Summary of the Condition of the Installation
                    </td>
                    <td className="text-elec-yellow">
                      SATISFACTORY / UNSATISFACTORY verdict. Driven by C1 / C2 only. C3 and FI do
                      NOT drive Unsatisfactory
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">F</td>
                    <td>Recommendation for Next Inspection</td>
                    <td>
                      Date by which next EICR is recommended, with explanation. Per Reg 653.4 + Reg
                      652.1
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">G</td>
                    <td>Declaration</td>
                    <td>
                      Signatures: "Inspected and tested by" + "Report authorized for issue by" —
                      both with name, position, address, date
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">H</td>
                    <td>Schedules and Continuation Sheet(s) Attached</td>
                    <td>
                      Continuation sheets, Schedule of Inspection, Schedule of Circuit Details and
                      Test Results — Reg 644.3 / 653
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 text-elec-yellow font-bold">I</td>
                    <td className="text-elec-yellow font-bold">
                      Supply Characteristics and Earthing Arrangements
                    </td>
                    <td className="text-elec-yellow">
                      Same fields as EIC Section F. TN-C-S (PNB) explicitly listed at A4:2026 (Reg
                      312.2.1.1)
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">J</td>
                    <td>Particulars of Installation Referred to in the Certificate</td>
                    <td>
                      Same fields as EIC Section G — earthing, max demand, electrode, main
                      protective, main switch
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-elec-yellow font-bold">K</td>
                    <td className="text-elec-yellow font-bold">Observations</td>
                    <td className="text-elec-yellow">
                      Two sub-tables: C1 and C2 (assessment-affecting); C3 and FI (advisory).
                      Photographic/thermographic images may be attached
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The classification codes — C1, C2, C3, FI</ContentEyebrow>

          <ConceptBlock
            title="The four codes verbatim from the EICR"
            plainEnglish="The form prints the codes verbatim and the Notes for the Producer expand on each. Get the wording exactly right when classifying — these phrases are normative and quoted in court."
          >
            <p>The four classification codes, as printed on the A4:2026 EICR form:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Code</th>
                    <th className="text-left text-white/80 py-2">Form text (verbatim)</th>
                    <th className="text-left text-white/80 py-2">Drives Unsatisfactory?</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06] bg-red-500/5">
                    <td className="py-2 text-red-400 font-bold">C1</td>
                    <td className="text-red-300">
                      Danger present. Risk of injury. Immediate remedial action is necessary
                    </td>
                    <td className="text-red-300">YES</td>
                  </tr>
                  <tr className="border-b border-white/[0.06] bg-orange-500/5">
                    <td className="py-2 text-orange-400 font-bold">C2</td>
                    <td className="text-orange-300">
                      Potentially dangerous - urgent remedial action is necessary
                    </td>
                    <td className="text-orange-300">YES</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 text-blue-300 font-bold">C3</td>
                    <td className="text-blue-200">Improvement recommended</td>
                    <td className="text-white/70">NO</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-purple-300 font-bold">FI</td>
                    <td className="text-purple-200">Further investigation is advised</td>
                    <td className="text-white/70">NO (A4:2026 confirmed)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The A4:2026 EICR Appendix 6 notes confirmed that &ldquo;the code FI no longer needs to
              be marked as unsatisfactory&rdquo;. Pre-A4 the inclusion of FI was sometimes treated
              as automatically Unsatisfactory; A4 made the position explicit — only C1 and C2 drive
              Unsatisfactory.
            </p>
          </ConceptBlock>

          {/* Coding decision tree */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              EICR observation — coding decision tree
            </h4>
            <svg
              viewBox="0 0 800 460"
              className="w-full h-auto"
              role="img"
              aria-label="Decision tree for classifying an EICR observation. The tree branches first on whether danger is present, then on urgency, then on whether a verdict can be reached, leading to one of C1, C2, C3 or FI."
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
                OBSERVATION
              </text>
              <text x="400" y="58" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                A condition / non-compliance noted
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
                x="270"
                y="100"
                width="260"
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
                Danger present? Risk of injury?
              </text>
              <text x="400" y="134" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (e.g. exposed live, reversed polarity)
              </text>

              <line x1="400" y1="140" x2="140" y2="180" stroke="#EF4444" strokeWidth="1.5" />
              <text
                x="220"
                y="170"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                YES
              </text>
              <rect
                x="40"
                y="180"
                width="200"
                height="60"
                rx="8"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="140"
                y="202"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="13"
                fontWeight="bold"
              >
                C1 — Danger present
              </text>
              <text x="140" y="220" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Make safe on discovery
              </text>
              <text x="140" y="234" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                → UNSATISFACTORY
              </text>

              <line
                x1="400"
                y1="140"
                x2="400"
                y2="180"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <text x="412" y="165" textAnchor="start" fill="rgba(255,255,255,0.6)" fontSize="10">
                NO
              </text>
              <rect
                x="270"
                y="180"
                width="260"
                height="40"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <text
                x="400"
                y="200"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Potentially dangerous?
              </text>
              <text x="400" y="214" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (e.g. damaged CPC, missing bond)
              </text>

              <line x1="400" y1="220" x2="660" y2="260" stroke="#F97316" strokeWidth="1.5" />
              <text
                x="580"
                y="250"
                textAnchor="middle"
                fill="#F97316"
                fontSize="10"
                fontWeight="bold"
              >
                YES
              </text>
              <rect
                x="560"
                y="260"
                width="200"
                height="60"
                rx="8"
                fill="rgba(249,115,22,0.10)"
                stroke="#F97316"
                strokeWidth="1.6"
              />
              <text
                x="660"
                y="282"
                textAnchor="middle"
                fill="#F97316"
                fontSize="13"
                fontWeight="bold"
              >
                C2 — Pot. dangerous
              </text>
              <text x="660" y="300" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Urgent remedial action
              </text>
              <text x="660" y="314" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                → UNSATISFACTORY
              </text>

              <line
                x1="400"
                y1="220"
                x2="400"
                y2="260"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <text x="412" y="245" textAnchor="start" fill="rgba(255,255,255,0.6)" fontSize="10">
                NO
              </text>
              <rect
                x="270"
                y="260"
                width="260"
                height="40"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
              />
              <text
                x="400"
                y="280"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Can a verdict be reached?
              </text>
              <text x="400" y="294" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                (Or is more inspection needed?)
              </text>

              <line x1="400" y1="300" x2="180" y2="340" stroke="#3B82F6" strokeWidth="1.5" />
              <text
                x="270"
                y="330"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="10"
                fontWeight="bold"
              >
                YES — non-compliance, advisory
              </text>
              <rect
                x="60"
                y="340"
                width="240"
                height="60"
                rx="8"
                fill="rgba(59,130,246,0.10)"
                stroke="#3B82F6"
                strokeWidth="1.6"
              />
              <text
                x="180"
                y="362"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="13"
                fontWeight="bold"
              >
                C3 — Improvement
              </text>
              <text
                x="180"
                y="376"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="13"
                fontWeight="bold"
              >
                recommended
              </text>
              <text x="180" y="394" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Advisory only — no Unsat.
              </text>

              <line x1="400" y1="300" x2="640" y2="340" stroke="#A855F7" strokeWidth="1.5" />
              <text
                x="540"
                y="330"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                NO — cannot conclude
              </text>
              <rect
                x="520"
                y="340"
                width="240"
                height="60"
                rx="8"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="640"
                y="362"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="13"
                fontWeight="bold"
              >
                FI — Further
              </text>
              <text
                x="640"
                y="376"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="13"
                fontWeight="bold"
              >
                investigation advised
              </text>
              <text x="640" y="394" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                No Unsat. (A4 confirmed)
              </text>

              <rect
                x="20"
                y="420"
                width="760"
                height="30"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="440" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Verdict in Section E: any C1 or C2 = UNSATISFACTORY. C3 / FI alone = SATISFACTORY
                (Reg 653 / EICR Notes 12, 15).
              </text>
            </svg>
          </div>

          <Scenario
            title="Worked example — EICR on a 1990s domestic property"
            situation="A 3-bed semi, last EICR 2014, dual-RCD CU, lighting circuits without 30 mA RCD (pre-411.3.4), no AFDDs, mains-bonded gas and water, polarity correct everywhere, IR readings &gt;299 MΩ on all circuits, Zs values within Table 41 limits. One observation: a kitchen socket back-box is missing its outer screw and the faceplate is loose, exposing a small gap to the CPC behind."
            whatToDo={
              <>
                <span className="block">
                  Lighting RCD absence: C3 (Improvement recommended). The current Reg 411.3.4 was
                  not in force when the lighting was installed. Per EICR Note 4, &ldquo;An
                  installation which was designed to an earlier version of BS 7671 ... is not
                  necessarily unsafe for continued use, or require upgrading&rdquo;.
                </span>
                <span className="block">
                  AFDD absence: C3 (Improvement recommended). Reg 421.1.7 is a recommendation, not a
                  requirement; absence is not a danger.
                </span>
                <span className="block">
                  Loose socket faceplate with exposed gap: C2 (Potentially dangerous). The exposure
                  could become a finger-touch hazard if the faceplate falls away. Urgent remedial
                  action is required (refit and screw).
                </span>
                <span className="block">
                  Verdict in Section E: UNSATISFACTORY (because of the C2). The two C3s do not
                  affect the verdict but are recorded in the lower sub-table of Section K.
                </span>
                <span className="block">
                  Section F (Next inspection): 5 years (or sooner on change of occupancy / remedial
                  completion).
                </span>
                <span className="block">
                  Photo of the loose socket faceplate appended to Section K (per the Reg 653.2 A4
                  note).
                </span>
              </>
            }
            whyItMatters="EICR coding is the difference between alarm and accuracy. Misclassifying a missing-lighting-RCD as C2 generates an unsatisfactory verdict that drives a remediation bill the homeowner doesn&rsquo;t actually need. Misclassifying a loose faceplate as C3 can leave a real hazard on the schedule when the inspector walks away. The codes are normative — apply them honestly."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>EICR Schedule of Inspection — the long form</ContentEyebrow>

          <ConceptBlock
            title="The Condition Report Schedule of Inspection (residential SoI)"
            plainEnglish="A long item-by-item check-list (items 1.0 through 8.0 with sub-items) covering Intake equipment, Parallel sources, Earthing/bonding, Consumer units / DBs, Distribution and final circuits, Bath/shower locations, Other special locations, and Prosumer installations. Each row has Outcomes columns: Acceptable condition (✓), Unacceptable (X), C1/C2, C3, FI, Not verified, Limitation, Not applicable."
          >
            <p>
              The SoI heading reads: &ldquo;CONDITION REPORT SCHEDULE OF INSPECTION FOR RESIDENTIAL
              AND SIMILAR PREMISES WITH UP TO 100 A SUPPLY&rdquo;. The note: &ldquo;This form is
              suitable for many types of smaller installation, not exclusively residential.&rdquo;
            </p>
            <p>The eight sections of the residential SoI:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>1.0 INTAKE EQUIPMENT (visual inspection only).</strong> 1.1 distributor /
                supplier intake equipment (service cable, service head, earthing arrangement, meter
                tails, metering equipment, means of isolation where present). 1.2{' '}
                <strong className="text-elec-yellow">
                  Consumer&rsquo;s means of isolation (where present)
                </strong>{' '}
                — A4 promoted. 1.3 Consumer&rsquo;s meter tails.
              </li>
              <li>
                <strong>
                  2.0 PRESENCE OF ADEQUATE ARRANGEMENTS FOR OTHER SOURCES SUCH AS MICROGENERATORS
                  (551.6; 551.7).
                </strong>
              </li>
              <li>
                <strong>3.0 EARTHING / BONDING ARRANGEMENTS (411.3; Chap 54).</strong> Items 3.1
                through 3.8 covering distributor&rsquo;s earthing, electrode, labels, conductor
                sizes, accessibility, connections.
              </li>
              <li>
                <strong>4.0 CONSUMER UNIT(S) / DISTRIBUTION BOARD(S).</strong> Items 4.1 through
                4.23 — including{' '}
                <strong className="text-elec-yellow">
                  4.6 Presence of main linked switch (462.1.201)
                </strong>{' '}
                and{' '}
                <strong className="text-elec-yellow">
                  4.23 Confirmation of indication that AFDD(s) are operational (421.1.7; 532.6;
                  651.2(e))
                </strong>
                .
              </li>
              <li>
                <strong>5.0 DISTRIBUTION/FINAL CIRCUITS.</strong> Items 5.1 through 5.21 — including{' '}
                <strong className="text-elec-yellow">
                  5.12 Provision of additional requirements for protection by RCD not exceeding 30
                  mA
                </strong>{' '}
                with the bullet list, now including &ldquo;Final circuits supplying luminaires
                within domestic (household) premises (411.3.4)&rdquo;.
              </li>
              <li>
                <strong>6.0 LOCATION(S) CONTAINING A BATH OR SHOWER.</strong> Items 6.1 through 6.8
                — Section 701 specific checks.
              </li>
              <li>
                <strong>7.0 OTHER PART 7 SPECIAL INSTALLATIONS OR LOCATIONS.</strong> 7.1 list all
                Part 7 locations and record separately.
              </li>
              <li>
                <strong>8.0 PROSUMER&rsquo;S LOW VOLTAGE ELECTRICAL INSTALLATION(S).</strong> 8.1
                Chapter 82 inspections recorded separately.
              </li>
            </ul>
            <p>
              Each item has Outcomes columns: Acceptable condition / ✓ / Unacceptable condition / C1
              or C2 / Improvement recommended / C3 / Further investigation / FI / Not verified / N/V
              / Limitation / LIM / Not applicable / N/A.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Marking absence-of-current-recommendation as C2"
            whatHappens="An EICR inspector finds no AFDDs on a 2010-installed domestic CU. They mark item 4.18 as C2 (Potentially dangerous) on the basis that &lsquo;current BS 7671 recommends AFDDs&rsquo;. The verdict drops to Unsatisfactory and the homeowner is presented with a £1,800 quote to fit AFDDs. The classification is wrong: Reg 421.1.7 is a recommendation, and the installation pre-dates the current edition. The right code is C3."
            doInstead="Read EICR Notes 3 and 4 carefully. Note 3: damage / deterioration / defects / non-compliances with the current version that might give rise to danger are recorded. Note 4: an installation designed to an earlier edition is not necessarily unsafe. A non-compliance with the current edition that does NOT give rise to danger and that reflects a later-edition addition is C3, not C2. Use C2 when the absence is a genuine present hazard, not when it is a missed-upgrade-vs-current-edition consideration."
          />

          <CommonMistake
            title="Treating FI as automatically Unsatisfactory"
            whatHappens="A pre-A4 inspector habit was to default any FI to Unsatisfactory. An A4:2026 EICR with FI codes for &lsquo;cabling concealed under floor not lifted, cannot verify protection&rsquo; is marked Unsatisfactory by reflex. The homeowner is alarmed and the inspector has misapplied the standard — A4:2026 confirmed FI does not affect the overall assessment."
            doInstead="The A4:2026 EICR Notes for the Producer item 12 reads: &lsquo;The overall assessment of the installation is to be reported as unsatisfactory where any observation is given a code C1 or C2 classification.&rsquo; FI is now explicitly outside the Unsatisfactory trigger — the inspection could not conclude on a specific item, but until that item is investigated there is no basis to declare Unsatisfactory. C3 and FI both go in the lower sub-table of Section K and both leave the verdict at Satisfactory."
          />

          <ConceptBlock
            title="EICR Section D limitations — A4:2026 wording"
            plainEnglish="Section D lists default limitations that apply unless specifically agreed otherwise. A4:2026 made the safety-recall limitation explicit. The wording is now: 'Cables concealed within trunking and conduits, under floors, in roof spaces, and generally within the fabric of the building or underground, have not been inspected. No checks for safety alerts, corrective actions or product recalls for electrical equipment forming part of the installation have been made.'"
            onSite="Section D protects you. Where the customer wants concealed cables lifted, or wants you to check device recalls (Wylex, FuseBox, Hager, etc.), they must agree it in advance and specify it in the &lsquo;Agreed limitations&rsquo; field. Without agreement, the default limitations apply and your liability for missed concealed-cable defects or unactioned recalls is bounded."
          >
            <p>
              The Section D default limitations clause begins: &ldquo;Unless specifically agreed
              between the client and inspector prior to the inspection: ...&rdquo; and lists the two
              default limitations. This single sentence is the inspector&rsquo;s court-defensible
              scope statement. Use it.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'MEIWC scope (Reg 644.4.201): no new circuit, no CU/DB replacement. One MEIWC per altered or added-to circuit.',
              'MEIWC Section D mirrors the Schedule of Test Results — including AFDD test button (with the "Not all AFDDs have a test button" note) and SPD functionality (with the "Not all SPDs have visible functionality indication" note).',
              'EICR is the periodic-inspection report (Reg 653). Sections A-K, with Section E carrying the verdict and Section K carrying the observations.',
              'C1 = Danger; C2 = Potentially dangerous; C3 = Improvement recommended; FI = Further investigation. Only C1 and C2 drive UNSATISFACTORY (A4:2026 confirmed FI no longer marks unsatisfactory).',
              'EICR Section D default limitations include the A4 wording on safety alerts / recalls — narrows liability when not specifically agreed otherwise.',
              "Schedule of Inspection (residential, with up to 100 A supply) is the long item-by-item form. A4 changes: item 1.2 (consumer's means of isolation), 4.6 (main linked switch), 4.23 (AFDD), 5.12 lighting-RCD bullet.",
              'Photographic and thermographic images may be appended (A4:2026 note added to Reg 653.2).',
              'Older installations: non-compliance with current edition is not necessarily a danger (EICR Note 4). Default to C3 unless the absence is a present hazard.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'A landlord wants a single EICR for a block of flats. Each flat has a separate consumer unit. Is one EICR enough?',
                answer:
                  'No. Each separate installation requires its own EICR. A "flat" with its own CU is its own installation under BS 7671 — one EICR per flat, plus one EICR for any landlord-supply common parts (stair lighting, lifts, common-area sockets) where they exist as a separate installation. The landlord may receive 12 EICRs for a 12-flat block plus a 13th for the common parts — that is the correct number, not a paperwork burden.',
              },
              {
                question:
                  'I added two sockets to an existing kitchen ring AND replaced a light fitting in the bathroom. Can I issue one MEIWC?',
                answer:
                  'No. Reg 644.4.201 reads "...a Minor Electrical Installation Works Certificate ... may be provided for each circuit that has been added to or altered". The two sockets are on the kitchen ring (one circuit); the bathroom light is on a different circuit. Two separate MEIWCs — one for each affected circuit. Or, if you prefer, a single EIC under EIC case (d) "multiple additions, or alterations or remedial works ... as an alternative to the issue of multiple Minor Electrical Installation Works Certificates".',
              },
              {
                question:
                  'On an EICR, my verdict is Satisfactory but I have several C3s. Should I tell the client the installation is "fine"?',
                answer:
                  'Be precise. The verdict is Satisfactory because there are no C1s or C2s — that is what Section E records. The C3s are advisory non-compliances with the current edition that do not give rise to danger but represent improvement opportunities. Tell the client: "The installation is in satisfactory condition for continued use, with the following improvements recommended:" and list the C3s. Do not say "the installation is fine" — say it is "satisfactory" and explain what that means.',
              },
              {
                question:
                  'A client&rsquo;s insurance company wants the EICR turned around in 24 hours. Can I issue an interim "Satisfactory pending investigation" for FI items?',
                answer:
                  'No, and the question reveals a misunderstanding. An EICR is a record of the inspection on the date of inspection. Where you have FI items, the verdict can still be Satisfactory (A4:2026 confirmed FI does not drive Unsatisfactory) provided no C1 or C2 has been recorded. You issue the EICR with the FI codes recorded, the verdict honestly stated, and Section F recommending follow-up by the date specified. The client&rsquo;s insurer accepts that verdict; the FI items become a separate piece of work.',
              },
              {
                question:
                  'On a TT installation, the EICR Section I now lists TN-C-S (PNB) as a tick option. If the installation is TT, do I need to do anything specific with the new option?',
                answer:
                  'Just tick TT and ignore the PNB option — it does not apply to your installation. The A4:2026 addition of PNB is informative for TN-C-S installations only. TT installations remain TT (with the installation earth electrode in Section J / Reg 411.5). The PNB tick was added to give TN-C-S installations a more accurate classification — it does not affect TT or IT inspections.',
              },
              {
                question:
                  'A client asks me to "do an EICR but skip the bedroom because the dog is in there". How do I record that?',
                answer:
                  'Section D ("Extent and Limitations of Inspection and Testing") with an "Operational limitations" entry: "Bedroom 2 not inspected at occupier&rsquo;s request — animal in occupation". Note that the items in Section H Schedule of Inspection covering circuits serving Bedroom 2 must then be marked Not Verified (N/V) or Limitation (LIM) — not ✓. The verdict still stands on what was inspected, with the limitation properly disclosed. EICR Notes 7-9 cover this — agreed limitations and operational limitations are recorded in Section D.',
              },
              {
                question:
                  'Item 5.12 of the residential Schedule of Inspection now includes "Final circuits supplying luminaires within domestic (household) premises (411.3.4)". On a property with no 30 mA RCD on lighting, what code do I apply?',
                answer:
                  'C3 (Improvement recommended) on a pre-2022 installation, where Reg 411.3.4 was not in force at design. The non-compliance is with the current edition; the absence does not give rise to danger; per EICR Note 4 the older edition compliance is not necessarily unsafe. C3 is correct, the verdict can still be Satisfactory. Where the property is post-411.3.4 introduction and the installer simply did not fit a lighting RCD, the inspector may consider whether C2 applies — but the default for older lighting circuits is C3.',
              },
              {
                question: 'Can I attach a thermographic image to an EICR observation?',
                answer:
                  'Yes — A4:2026 added a note to Reg 653.2 explicitly permitting photographic and thermographic images to be appended. Section K of the EICR notes also confirms: "Photographic and/or thermographic images can be attached to the report to support observations made in this Section". A thermal hot-spot at a connector can be the visual evidence that supports a C2 observation; a normal photo of a damaged faceplate supports a C1. Use them — they make the report defensible.',
              },
            ]}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Minor Works &amp; EICR — Module 8.5" questions={quizQuestions} />

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
              onClick={() => navigate('/electrician/upskilling/inspection-testing')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Course complete <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Inspection &amp; Testing — landing
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

export default InspectionTestingModule8Section5;
