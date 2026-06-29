import { ArrowLeft, ChevronLeft, ChevronRight, ListChecks } from 'lucide-react';
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
    id: 'mod1-s5-defects-clause',
    question:
      'Stage A complete except IR. The shower-circuit IR fails L–E. You rectify a pinched cable. Per Reg 643.7.2, what must you re-run before continuing?',
    options: [
      'Just the failed IR test on the shower circuit.',
      'The failed IR plus continuity (R1+R2) on the shower circuit.',
      'Every test from 643.2 on every circuit again.',
      'Issue an EICR with a C2 observation and move on.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.7.2 is precise: the failed test plus any preceding test the result of which the fault could have skewed. A pinched cable can damage the line AND the CPC, so the continuity reading taken before rectification was on a damaged conductor and is unreferenced. Re-run both, both pass cleanly, then continue to polarity and Stage B.',
  },
  {
    id: 'mod1-s5-643-7-3-1-precondition',
    question:
      'You skip the continuity step on a circuit and go straight to a Zs measurement at the furthest point. The Zs reads 0.95 Ω against a 1.37 Ω limit. Defensible?',
    options: [
      'Yes — the Zs is below the limit, so the circuit passes.',
      'No — Reg 643.7.3.1 requires the continuity test before the Zs measurement.',
      'Yes — provided you record the protective device Type alongside.',
      'Yes — a passing Zs supersedes the continuity requirement.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.7.3.1 sets continuity as a precondition for Zs specifically because the loop reading depends on a continuous CPC. A high-resistance joint masked by parallel earth paths through containment or bonded pipework lets a "passing" Zs hide a defect that will fail later when the parallel path opens.',
  },
  {
    id: 'mod1-s5-rcd-table-3a',
    question:
      'A4:2026 changed how RCD effectiveness is verified. Which of these correctly describes the post-A4 position?',
    options: [
      'Each RCD Type (AC / A / F / B) needs a different test current from a table in Appendix 3.',
      'Table 3A is deleted; one AC test at IΔn verifies any Type, against the Reg 643.8 limits.',
      'RCDs no longer require functional testing; the manufacturer self-test now suffices.',
      'The AC test at IΔn applies only to Type AC devices, not to A, F or B.',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 deleted the Type-conditional Table 3A and harmonised verification: one AC test at IΔn for any Type. Reg 643.8 NOTE retains the time limits (≤300 ms for general non-delay, 130–500 ms for S-type). Record the device Type alongside (still useful for context and any defect report), but the acceptance number is now a single AC trip-time.',
  },
  {
    id: 'mod1-s5-cert-choice',
    question:
      'You add a single new socket to an existing kitchen ring final circuit. No new circuit is introduced. Which certificate is appropriate?',
    options: [
      'Full EIC — anything less is non-compliant for added accessories.',
      'Minor Electrical Installation Works Certificate (Reg 644.4.201 / Appendix 6).',
      'EICR — adding a socket changes the condition of the installation.',
      'No certificate — this counts as a like-for-like replacement.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 644.4.201 / Appendix 6 specify the MEIWC for minor work that does NOT introduce a new circuit. Adding a socket to an existing ring is the textbook case. The relevant 643 tests at the affected circuit still apply — and the form has fields for each. EIC would be the correct form if a new circuit were introduced; EICR is reserved for periodic per Reg 653.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.1 sets a hard rule about the order of the pre-energisation tests. What does it actually require?',
    options: [
      'The tests in 643.2 to 643.6, where relevant, shall be carried out in that order before energisation',
      'The tests in 643.2 to 643.6 may be done in any sensible order the inspector prefers',
      'Only the dead tests in 643.2 and 643.3 have to be done in a mandatory sequence',
      'The stated order is a recommended workflow but not a mandatory requirement',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.1 is explicit. The tests in 643.2 to 643.6, where relevant to the installation, shall be carried out in that order and shall be completed prior to energisation. The sequence is normative, not advisory — that is what makes it defensible in a defects investigation or a court hearing.',
  },
  {
    id: 2,
    question:
      'You complete continuity (643.2.1) and move to insulation resistance (643.3). The IR test fails on a circuit. What does Reg 643.7.2 require you to do once the fault has been rectified?',
    options: [
      'Re-run the failed test only',
      'Re-run every test from 643.2 onwards as a precaution',
      'Issue an EICR with a C2 observation and move on',
      'Re-run the failed test plus any preceding test whose result may have been influenced by the fault',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 643.7.2 is the defects clause. If a test indicates a failure to comply, that test and any preceding test the result of which may have been influenced by the fault shall be repeated after the fault has been rectified. A failed IR can mask a continuity reading taken at the same point — both have to be redone.',
  },
  {
    id: 3,
    question:
      'Reg 643.3 has been redrafted in A4:2026. What is the new requirement after equipment has been reconnected for the insulation resistance test?',
    options: [
      'No further test — the earlier disconnection-only IR test is sufficient',
      'A 500 V DC test between live conductors only, repeating the original test',
      'A 250 V DC test between live conductors and the protective conductor, IR not less than 1 MΩ',
      'A 1000 V DC test on the equipment circuits that were reconnected',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.3.3 requires that following connection of equipment that was disconnected for the prior IR test, a test at 250 V DC shall be applied between live conductors and the protective conductor connected to the earthing arrangement, with an IR of at least 1 MΩ. The redraft makes the post-connection test mandatory and fixes the voltage at 250 V DC.',
  },
  {
    id: 4,
    question:
      'Reg 643.3 also changed how RCD effectiveness is verified. What does the A4:2026 redraft say?',
    options: [
      'Regardless of Type, an AC test at IΔn verifies effectiveness, and Table 3A has been deleted',
      'Each RCD Type requires a different test current taken from Table 3A in Appendix 3',
      'Only Type AC RCDs now need to be tested for effectiveness at IΔn',
      'Effectiveness is verified by visual inspection of the device markings alone',
    ],
    correctAnswer: 0,
    explanation:
      'A4:2026 deletes Table 3A from Appendix 3 and harmonises RCD verification: regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify effectiveness. Reg 643.8 keeps the 300 ms / 130–500 ms time limits for general non-delay and S-type RCDs respectively.',
  },
  {
    id: 5,
    question:
      'Reg 643.10 functional testing has been extended in A4:2026 to cover AFDDs. What does it require?',
    options: [
      'AFDDs are exempt from functional testing under the revised regulation',
      'AFDDs require an external trip-current injector to verify their operation',
      'The effectiveness of any manually operated AFDD test facility shall be verified per the manufacturer',
      'The AFDD test button can be ignored where the device has an automatic self-test',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.10 now states: where an AFDD is installed, the effectiveness of any manually operated test facility shall be verified in accordance with the manufacturers’ recommendations. The model forms have been amended to include AFDD recording fields (Appendix 6) so the verification has somewhere to land on the certificate.',
  },
  {
    id: 6,
    question:
      'You are testing a TN-C-S installation. Reg 643.7.1(a) requires verification of compliance with Reg 411.4. What is the verification method?',
    options: [
      'Measurement of the earth electrode resistance at the installation electrode only',
      'Visual inspection of the PEN conductor at the supplier cut-out and meter tails',
      'Measurement of earth fault loop impedance plus verification of the protective device',
      'A 2 kV AC RMS dielectric test applied across the main protective bonding',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.7.1(a) requires (i) measurement of the earth fault loop impedance — Zs — and (ii) verification of the characteristics and/or effectiveness of the associated protective device, by visual inspection or testing as appropriate. The measured Zs is then compared with the calculated maximum Zs taken from BS 7671 Table 41.x (or the design-set tighter limit recorded on the new Schedule of Circuit Details column).',
  },
  {
    id: 7,
    question: 'Reg 643.7.3.1 sets a precondition for the Zs measurement. What is it, and why?',
    options: [
      'A continuity test per Reg 643.2 first, because the loop reading depends on a continuous CPC',
      'A polarity check first, because Zs cannot be measured on a circuit with reversed polarity',
      'The supply disconnected first, because Zs is a dead test carried out with the circuit isolated',
      'A phase-sequence check first, because Zs is only valid on a confirmed L1-L2-L3 sequence',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.7.3.1 requires that an electrical continuity test be carried out per Reg 643.2 before the earth fault loop impedance measurement. The Zs reading is meaningless if the CPC is open or has a high-resistance joint — the continuity test guards the validity of the live test that follows.',
  },
  {
    id: 8,
    question:
      'A4:2026 amended Appendix 6 model forms. Which fields were added that an electrician must now record where applicable?',
    options: [
      'Customer phone number and email address against each certificate issued',
      'GPS coordinates of the consumer unit for location-tracking purposes',
      'A photograph hash recorded for tamper-evidence on the certificate',
      'SPD and AFDD details on the forms, plus AFDD test verification on the schedule of results',
    ],
    correctAnswer: 3,
    explanation:
      'Appendix 6 model forms were amended in A4:2026 to include fields for SPDs and AFDDs. Where an SPD or AFDD is installed, the details (Type, location, manufacturer, manual/automatic test facility outcome) shall be recorded on the appropriate certificate so the next inspector can see what is fitted and what was verified.',
  },
  {
    id: 9,
    question:
      'On an EICR, you find an installed circuit where the disconnection time relies on an RCD whose IΔn test trip is 380 ms. Reg 643.8 NOTE gives the time limits regardless of RCD Type. What does this reading mean?',
    options: [
      'Fail for a general non-delay type, whose limit is 300 ms maximum at IΔn',
      'Pass — any reading under 500 ms is acceptable for an RCD of any kind',
      'Pass — the disconnection-time limit is only advisory in periodic inspection',
      'Pass if it is an S-type RCD; record it on the schedule and move on',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.8 NOTE: a general non-delay type RCD shall disconnect within 300 ms maximum at IΔn. 380 ms is a fail for a non-delay device. For an S-type the window is 130–500 ms, so 380 ms would pass — the answer depends on which device is fitted, and the schedule of test results must record the device type alongside the trip time so the verification is unambiguous.',
  },
  {
    id: 10,
    question:
      'You are issuing a Minor Works Certificate after adding a single socket to an existing ring final circuit. Which model form applies and what tests must you record?',
    options: [
      'Full EIC with Schedule of Inspections, as for any added accessory',
      'No certificate at all — minor works are exempt from certification',
      'The Minor Electrical Installation Works Certificate per Appendix 6 (Reg 644.4.201)',
      'An EICR — a Minor Works Certificate is for periodic inspection only',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 644.4.201 / Appendix 6 specify the Minor Electrical Installation Works Certificate for minor work that does not involve a new circuit. The relevant tests from Reg 643 still apply — continuity (R1+R2 at the new outlet), polarity, IR on the affected circuit, Zs at the new outlet, and an RCD trip-time check where the circuit is RCD-protected. The form has fields for each.',
  },
];

const InspectionTestingModule1Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Test sequence and documentation | I&T Module 1.5 | Elec-Mate',
    description:
      'Reg 643.1 sequence, the 643.2–643.10 tests in their required order, why each test depends on the previous, and how the A4:2026 model forms (EIC, EICR, Minor Works, Schedule of Test Results, Schedule of Circuit Details) record what you measured.',
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
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 5"
            title="Test sequence and documentation"
            description="Reg 643.1 makes the order of the pre-energisation tests normative, not advisory. This section walks the 643.2–643.10 sequence as a flow, names what each test depends on, and ties every output to the A4:2026 model forms."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.1 makes the order mandatory: the tests in 643.2–643.6, where relevant, shall be carried out in that order and shall be completed before the installation is energised. The sequence is normative.',
              'The dead-test stage (643.2 continuity, 643.3 IR, 643.4 SELV/PELV/separation, 643.5 floors and walls, 643.6 polarity) proves the installation is safe to energise. Each test guards the validity of the next.',
              'The live-test stage (643.7 ADS — Ze, Zs, IPFC; 643.8 additional protection; 643.9 phase sequence; 643.10 functional incl. AFDD test facility) verifies that protection actually operates within the BS 7671 Chapter 41 disconnection times.',
              'A4:2026 redrafted Reg 643.3 — 250 V DC post-connection IR test mandatory, Table 3A deleted, RCD effectiveness verified by AC test at IΔn regardless of RCD Type. Reg 643.10 extended to AFDD manual test facility per manufacturer.',
              'A4:2026 amended Appendix 6 model forms (EIC, EICR, Minor Works, Schedule of Inspections, Schedule of Circuit Details, Schedule of Test Results) to record SPD details, AFDD details, max permitted Zs per circuit, TN-C-S (PNB) earthing, reference method and SPD Type per board.',
              'Reg 643.7.2: if any test indicates failure, that test and any preceding test the result of which may have been influenced by the fault shall be repeated after the fault is rectified. The sequence is also a defects-recovery rule.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the test sequence required by Reg 643.1 and explain why the order is normative — not a working preference',
              'Map each test in 643.2–643.10 to the certificate column or schedule field that records its output on the A4:2026 model forms',
              'Explain how each test depends on the validity of the previous test, and what failure of one means for the others (Reg 643.7.2 defects rule)',
              'Identify what A4:2026 changed: 643.3 redraft, Table 3A deletion, AFDD test verification under 643.10, new SPD/AFDD/PNB columns on Appendix 6 forms',
              'Choose the correct certificate (EIC, EICR or Minor Works) for a given scope of work and justify the choice from Reg 644 / 653 wording',
              'Record continuity, IR, polarity, Zs, RCD trip times, IPFC and functional outcomes on the Schedule of Test Results so a third party (insurer, court, distributor) can reconstruct exactly what was tested',
            ]}
          />

          <ContentEyebrow>Why the sequence is normative</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.1 — the order is the test"
            plainEnglish="The tests of Regulations 643.2 to 643.6, where relevant, shall be carried out in that order and shall be completed before the installation is energised. The sequence is not a recommended workflow — it is a regulation."
            onSite="Doing IR before continuity, or polarity after Zs, breaks the dependency chain. Each dead test confirms the installation is safe enough for the next test on the sequence to be meaningful. Out of order, the readings are not just incorrect — they are not the readings the regulation asks for."
          >
            <p>
              Reg 643.1 sets two ground rules. First, the measuring instruments and methods used
              shall comply with the relevant parts of BS&nbsp;EN&nbsp;61557 (or equivalent
              performance and safety). Second, the tests of Regulations 643.2 to 643.6 inclusive,
              where relevant, shall be carried out in that order and shall be completed prior to the
              installation being energised. The phrase &ldquo;in that order&rdquo; is the
              load-bearing wording — it is the basis on which an inspector justifies a result on the
              schedule.
            </p>
            <p>
              The dependency chain is real, not procedural pedantry. A continuity failure means the
              CPC is open — and an IR test pushed onto an open CPC reads infinity, masking real
              insulation defects. A polarity reversal at the origin means Zs measured on the
              presumed earth path is meaningless. An IPFC measured before the device characteristic
              is known cannot be compared against the device&rsquo;s breaking capacity. Reg 643.1 is
              the rule that keeps every downstream reading defensible.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.1 (General)"
            clause={
              <>
                The tests of Regulations 643.2 to 643.11, where relevant, shall be carried out and
                the results compared with relevant criteria. Measuring instruments and monitoring
                equipment and methods shall be chosen in accordance with the relevant parts of
                BS&nbsp;EN&nbsp;61557 or other equipment providing no lesser degree of performance
                and safety. The tests of Regulations 643.2 to 643.6, where relevant, shall be
                carried out in that order before the installation is energised.
              </>
            }
            meaning="Two duties in one regulation. (1) The instruments must meet BS EN 61557 or equivalent — no general-purpose multimeters for continuity, no buzzer-style testers for IR. (2) The order of 643.2–643.6 is mandatory and the whole pre-energisation block must be complete before the supply is connected."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7.2 (Failure to comply)"
            clause={
              <>
                If any test indicates a failure to comply, that test and any preceding test, the
                results of which may have been influenced by the fault indicated, shall be repeated
                after the fault has been rectified.
              </>
            }
            meaning="A failure forces a re-test of the failed test AND any prior test whose result the same fault could have skewed. A failed IR on a circuit invalidates the continuity reading taken on that circuit at the same point — the rectification is not complete until both pass cleanly."
          />

          <SectionRule />

          <ContentEyebrow>The sequence as a flow</ContentEyebrow>

          <ConceptBlock
            title="The 13 tests, in order, with dependencies"
            plainEnglish="There are five dead tests (Stage A, supply isolated) followed by four to five live tests (Stage B, supply connected). Each test produces a number or a pass; each number feeds either the certificate or the next test. The diagram below shows the flow and the ‘depends on’ link."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>643.2.1 Continuity of protective conductors and bonding</strong> — every
                CPC, every main protective bonding conductor, every supplementary bond. R1+R2 by
                Method 1 or R2 by Method 2 (wandering lead). Records the conductor-only earth path
                that Zs depends on.
              </li>
              <li>
                <strong>643.2.1 Continuity of ring final live conductors</strong> — r1, rn, r2 and
                the (r1+r2)/4 derivation per ring. Records the ring is intact and equally loaded.
              </li>
              <li>
                <strong>643.3 Insulation resistance</strong> — between live conductors, and between
                live conductors and the protective conductor connected to earth. 500&nbsp;V DC for
                low-voltage circuits per Table 64; 250&nbsp;V DC for SELV/PELV; 250&nbsp;V DC
                post-connection of equipment per the redrafted 643.3.3.
              </li>
              <li>
                <strong>643.4 SELV / PELV / electrical separation</strong> — confirms separation by
                IR measurement against Table 64. Only relevant where these protective measures are
                used.
              </li>
              <li>
                <strong>643.5 Insulation resistance / impedance of floors and walls</strong> — only
                where compliance with Reg 418.1 (non-conducting location) is being claimed. Three
                measurements minimum, one approximately 1&nbsp;m from any accessible
                extraneous-conductive-part.
              </li>
              <li>
                <strong>643.6 Polarity</strong> — at the origin, then throughout. Single-pole
                switching and protective devices in line conductor only. Edison-screw and
                bayonet-cap (other than E14/E27 BC) outer contact to neutral.
              </li>
              <li>
                <strong>643.7.1 ADS verification — Ze (origin)</strong> — for TN systems by
                measurement of external earth fault loop impedance; for TT, RA at the installation
                electrode.
              </li>
              <li>
                <strong>643.7.3 Earth fault loop impedance — Zs</strong> — at each circuit, with the
                continuity test (643.2) already passed. Measured Zs ≤ maximum permitted Zs from
                Table 41.x or the tighter design value recorded on the new A4 max-permitted-Zs
                column of the Schedule of Circuit Details.
              </li>
              <li>
                <strong>643.7.3.201 Prospective fault current — IPFC</strong> — short-circuit and
                earth fault current at the origin and other relevant points. Compared against the
                breaking capacity of the protective devices.
              </li>
              <li>
                <strong>643.8 RCD effectiveness (where ADS by RCD)</strong> — AC test at IΔn,
                regardless of RCD Type (A4 redraft of 643.3 deleted Table 3A). 300&nbsp;ms maximum
                for general non-delay; 130–500&nbsp;ms for S-type.
              </li>
              <li>
                <strong>643.8 Additional protection</strong> — RCDs intended for additional
                protection (typically 30&nbsp;mA), verified per BS&nbsp;EN&nbsp;61557-6 against the
                300&nbsp;ms maximum for general non-delay type. Where additional protection is
                provided by supplementary protective equipotential bonding, the bonding is verified
                against Chapter 41.
              </li>
              <li>
                <strong>643.9 Check of phase sequence</strong> — for polyphase circuits, that the
                phase sequence is maintained at all relevant points. Tester per
                BS&nbsp;EN&nbsp;61557-7.
              </li>
              <li>
                <strong>643.10 Functional testing (incl. AFDD per A4:2026)</strong> — switchgear,
                drives, controls, interlocks, emergency switching off, insulation monitoring; RCD
                integral test button; AFDD manual test facility per the manufacturer&rsquo;s
                recommendations.
              </li>
            </ol>
            <p>
              Reg 643.11 (verification of voltage drop) follows where required by Chapter 52, but is
              noted as not normally required during initial verification.
            </p>
          </ConceptBlock>

          {/* Sequence flow diagram with dependencies */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Reg 643 test sequence — dead tests, live tests, and the dependency arrows
            </h4>
            <svg
              viewBox="0 0 880 880"
              className="w-full h-auto"
              role="img"
              aria-label="Reg 643 test sequence diagram. Stage A dead tests (continuity of CPCs, ring continuity, insulation resistance, SELV/PELV/separation, floors and walls, polarity) feed into Stage B live tests (Ze, Zs, IPFC, RCD operation, additional protection, phase sequence, functional and AFDD). Arrows show that each test depends on the previous test having passed."
            >
              <defs>
                <marker
                  id="arrSeq"
                  markerWidth="10"
                  markerHeight="8"
                  refX="9"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,0 L10,4 L0,8 z" fill="rgba(251,191,36,0.85)" />
                </marker>
                <marker
                  id="arrDep"
                  markerWidth="10"
                  markerHeight="8"
                  refX="9"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,0 L10,4 L0,8 z" fill="rgba(255,255,255,0.5)" />
                </marker>
              </defs>

              {/* STAGE A header */}
              <rect
                x="20"
                y="10"
                width="840"
                height="32"
                rx="8"
                fill="rgba(59,130,246,0.10)"
                stroke="rgba(59,130,246,0.35)"
                strokeWidth="1.5"
              />
              <text
                x="440"
                y="32"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="12"
                fontWeight="bold"
              >
                STAGE A — DEAD TESTS · Reg 643.2 to 643.6 · Supply isolated · Order is normative
                (Reg 643.1)
              </text>

              {/* 1. 643.2.1 Continuity */}
              <rect
                x="60"
                y="60"
                width="320"
                height="48"
                rx="8"
                fill="rgba(59,130,246,0.08)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="82"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                1 · Continuity of CPCs &amp; bonding (643.2.1)
              </text>
              <text x="220" y="98" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                R1+R2 / R2 → records the earth path Zs depends on
              </text>
              {/* arrow down */}
              <line
                x1="220"
                y1="108"
                x2="220"
                y2="124"
                stroke="rgba(251,191,36,0.85)"
                strokeWidth="2"
                markerEnd="url(#arrSeq)"
              />

              {/* 2. Ring continuity */}
              <rect
                x="60"
                y="124"
                width="320"
                height="48"
                rx="8"
                fill="rgba(59,130,246,0.08)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="146"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                2 · Ring final continuity (643.2.1 limb 2)
              </text>
              <text x="220" y="162" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                r1, rn, r2 → confirms ring intact, evenly loaded
              </text>
              <line
                x1="220"
                y1="172"
                x2="220"
                y2="188"
                stroke="rgba(251,191,36,0.85)"
                strokeWidth="2"
                markerEnd="url(#arrSeq)"
              />

              {/* 3. IR */}
              <rect
                x="60"
                y="188"
                width="320"
                height="56"
                rx="8"
                fill="rgba(59,130,246,0.08)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="210"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                3 · Insulation resistance (643.3)
              </text>
              <text x="220" y="226" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                500 V DC · Table 64 · 250 V DC post-connection
              </text>
              <text x="220" y="240" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                A4:2026 redraft — Table 3A deleted
              </text>
              <line
                x1="220"
                y1="244"
                x2="220"
                y2="260"
                stroke="rgba(251,191,36,0.85)"
                strokeWidth="2"
                markerEnd="url(#arrSeq)"
              />

              {/* 4. SELV / PELV / separation */}
              <rect
                x="60"
                y="260"
                width="320"
                height="48"
                rx="8"
                fill="rgba(59,130,246,0.08)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="282"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                4 · SELV / PELV / separation (643.4)
              </text>
              <text x="220" y="298" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                IR confirms separation per Table 64
              </text>
              <line
                x1="220"
                y1="308"
                x2="220"
                y2="324"
                stroke="rgba(251,191,36,0.85)"
                strokeWidth="2"
                markerEnd="url(#arrSeq)"
              />

              {/* 5. Floors and walls */}
              <rect
                x="60"
                y="324"
                width="320"
                height="48"
                rx="8"
                fill="rgba(59,130,246,0.08)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="346"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                5 · Floors / walls IR (643.5)
              </text>
              <text x="220" y="362" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Reg 418.1 non-conducting location only
              </text>
              <line
                x1="220"
                y1="372"
                x2="220"
                y2="388"
                stroke="rgba(251,191,36,0.85)"
                strokeWidth="2"
                markerEnd="url(#arrSeq)"
              />

              {/* 6. Polarity */}
              <rect
                x="60"
                y="388"
                width="320"
                height="48"
                rx="8"
                fill="rgba(59,130,246,0.08)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="410"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                6 · Polarity (643.6)
              </text>
              <text x="220" y="426" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Single-pole devices in line only · ES/BC outer to N
              </text>

              {/* arrow Stage A -> Stage B */}
              <line
                x1="220"
                y1="436"
                x2="220"
                y2="478"
                stroke="rgba(251,191,36,0.85)"
                strokeWidth="2.5"
                markerEnd="url(#arrSeq)"
              />
              <text
                x="240"
                y="462"
                textAnchor="start"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Energise — only after Stage A complete (643.1)
              </text>

              {/* STAGE B header */}
              <rect
                x="20"
                y="478"
                width="840"
                height="32"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1.5"
              />
              <text
                x="440"
                y="500"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                STAGE B — LIVE TESTS · Reg 643.7 to 643.10 · Supply connected · GS38 leads, PPE
              </text>

              {/* 7. Ze */}
              <rect
                x="60"
                y="528"
                width="320"
                height="48"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="550"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                7 · Ze at origin (643.7.1)
              </text>
              <text x="220" y="566" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                External earth fault loop · TN-S, TN-C-S (PNB), TT
              </text>
              <line
                x1="220"
                y1="576"
                x2="220"
                y2="592"
                stroke="rgba(251,191,36,0.85)"
                strokeWidth="2"
                markerEnd="url(#arrSeq)"
              />

              {/* 8. Zs */}
              <rect
                x="60"
                y="592"
                width="320"
                height="56"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="614"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                8 · Zs each circuit (643.7.3)
              </text>
              <text x="220" y="630" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Measured Zs ≤ max permitted Zs (A4 column)
              </text>
              <text x="220" y="644" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Continuity (test 1) MUST have passed first
              </text>
              <line
                x1="220"
                y1="648"
                x2="220"
                y2="664"
                stroke="rgba(251,191,36,0.85)"
                strokeWidth="2"
                markerEnd="url(#arrSeq)"
              />

              {/* 9. IPFC */}
              <rect
                x="60"
                y="664"
                width="320"
                height="48"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="686"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                9 · IPFC at origin (643.7.3.201)
              </text>
              <text x="220" y="702" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                PSCC + PEFC vs device breaking capacity
              </text>
              <line
                x1="220"
                y1="712"
                x2="220"
                y2="728"
                stroke="rgba(251,191,36,0.85)"
                strokeWidth="2"
                markerEnd="url(#arrSeq)"
              />

              {/* 10. RCD */}
              <rect
                x="60"
                y="728"
                width="320"
                height="56"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="750"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                10 · RCD effectiveness (643.7.3 / 643.8)
              </text>
              <text x="220" y="766" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                AC test at IΔn — any Type · ≤300 ms / 130–500 ms
              </text>
              <text x="220" y="780" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                A4:2026 — Table 3A deleted
              </text>

              {/* 11. Phase sequence (right column) */}
              <rect
                x="500"
                y="528"
                width="320"
                height="48"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="660"
                y="550"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                11 · Phase sequence (643.9)
              </text>
              <text x="660" y="566" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Polyphase only · BS EN 61557-7 instrument
              </text>

              {/* 12. Functional incl AFDD */}
              <rect
                x="500"
                y="592"
                width="320"
                height="64"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="660"
                y="614"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                12 · Functional testing (643.10)
              </text>
              <text x="660" y="630" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Switchgear, drives, controls, interlocks, EM stop
              </text>
              <text
                x="660"
                y="646"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                AFDD manual test per manufacturer (A4 new)
              </text>

              {/* 13. Voltage drop */}
              <rect
                x="500"
                y="672"
                width="320"
                height="48"
                rx="8"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.3)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />
              <text
                x="660"
                y="694"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                13 · Voltage drop (643.11)
              </text>
              <text x="660" y="710" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Where Chapter 52 requires · not normally on initial
              </text>

              {/* Dependency arrow: continuity (1) -> Zs (8) */}
              <path
                d="M380,84 C460,84 460,620 500,620"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.4"
                strokeDasharray="5,4"
                markerEnd="url(#arrDep)"
              />
              <text
                x="470"
                y="380"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="9"
                fontWeight="bold"
              >
                643.7.3.1 — continuity required
              </text>
              <text x="470" y="394" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                before Zs measurement
              </text>

              {/* Dependency arrow: polarity (6) -> Ze/Zs */}
              <path
                d="M380,412 C440,412 440,552 500,552"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.2"
                strokeDasharray="4,3"
                markerEnd="url(#arrDep)"
              />
              <text x="470" y="475" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Polarity must pass before
              </text>
              <text x="470" y="487" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                live tests
              </text>

              {/* Footer caption */}
              <rect
                x="20"
                y="800"
                width="840"
                height="64"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="440" y="822" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="11">
                Reg 643.7.2: failure of any test triggers re-test of that test AND any preceding
                test the result of which
              </text>
              <text x="440" y="838" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="11">
                may have been influenced by the fault. Rectify, re-run from the affected step, only
                then re-energise.
              </text>
              <text
                x="440"
                y="856"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Each output → a column on the A4:2026 model forms (Appendix 6).
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>How each test depends on the previous</ContentEyebrow>

          <ConceptBlock
            title="Continuity → IR → polarity → Ze → Zs — the chain in detail"
            plainEnglish="Each test confirms a precondition for the next. Skip a step or run them out of order and the readings further down the chain are not testing what the regulation thinks they are testing."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Continuity (643.2.1) → IR (643.3).</strong> If a CPC is open, an IR test
                between live and earth on that circuit reads infinity — looks like a perfect
                installation, hides any insulation defect against earth. Continuity must pass first.
              </li>
              <li>
                <strong>IR (643.3) → polarity (643.6).</strong> Polarity is verified by continuity
                of the line from origin to point. If the IR test damaged a sensitive item that was
                not properly disconnected, the polarity reading at that point is suspect. The
                redrafted Reg 643.3.3 mandates a 250&nbsp;V DC IR test after equipment is
                reconnected — that step closes the gap.
              </li>
              <li>
                <strong>Polarity (643.6) → Ze and Zs (643.7).</strong> Reg 643.7.3.1 is explicit: an
                electrical continuity test according to Reg 643.2 shall be carried out before the
                earth fault loop impedance measurement. Without continuity, Zs is reading the wrong
                loop. Without correct polarity, Zs is reading from the wrong terminal.
              </li>
              <li>
                <strong>Zs (643.7.3) → RCD effectiveness (643.7.3 / 643.8).</strong> An RCD test at
                IΔn relies on a working earth path. If Zs is high or not yet established, the RCD
                trip-time is being measured against the wrong loop impedance and the result is not
                the protective characteristic the regulation is asking for.
              </li>
              <li>
                <strong>Functional (643.10) closes the loop.</strong> Switchgear, controls, RCD test
                buttons, AFDD manual test per manufacturer — every device that the earlier tests
                proved is electrically correct gets a final operational confirmation. A circuit that
                passes Zs but whose isolator does not operate is still not safe to hand over.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A failed IR mid-sequence on a domestic CU change"
            situation="You have completed Stage A continuity (R1+R2 OK on every circuit, ring continuity OK) and started IR. The shower circuit fails at 0.4 MΩ between L and E. You isolate, find a pinched cable, replace the affected drop, and rectify. The customer is asking when you will be back on schedule."
            whatToDo={
              <>
                <span className="block">
                  Reg 643.7.2 forces a structured restart, not a tactical restart.
                </span>
                <span className="block">
                  1. Re-run the failed IR on that circuit. The fault may have masked a second
                  defect.
                </span>
                <span className="block">
                  2. Re-run any preceding test the result of which the fault could have influenced.
                  Continuity (R1+R2) on the shower circuit is the obvious one — a pinched cable can
                  damage the CPC as well as the line. Ring continuity is unaffected; SELV/PELV are
                  unaffected.
                </span>
                <span className="block">
                  3. Only after both passes do you continue with polarity, then Stage B (Ze, Zs,
                  IPFC, RCD, AFDD). Record the rectification on the certificate.
                </span>
              </>
            }
            whyItMatters="The schedule is the legal record of what was tested. ‘IR re-run after rectification’ on its own is not enough. The defects clause exists so that a fault discovered late in the sequence does not leave an unverified earlier reading on the certificate. An EICR auditor or a court will read the schedule against Reg 643.7.2."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <CommonMistake
            title="Running Zs before continuity has been signed off"
            whatHappens="The CPC has a high-resistance joint at a junction box you did not open. R1+R2 was never measured because the jointing-box step was skipped. You go straight to Zs. The reading at the furthest point is 1.4 Ω against a Table 41.x limit of 1.37 Ω — looks like a fail. You tighten everything visible at the board, re-measure, get 1.30 Ω, record it as a pass. The hidden joint is still there. Six months later the joint has corroded further, the disconnection time has blown past 0.4 s, and an electric shock incident is investigated."
            doInstead="Reg 643.7.3.1 is explicit: continuity per 643.2 first, Zs after. Document R1+R2 against the calculated value from GN3 Table BI before you measure Zs. A continuity reading that disagrees with the calculation is the diagnostic — investigate then. Out-of-order Zs hides the problem and stamps a certificate with a number you cannot defend."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <CommonMistake
            title="Treating Reg 643.10 functional testing as &lsquo;flick the switches&rsquo;"
            whatHappens="A new consumer unit is fitted in a HMO. AFDDs are installed per Reg 421.1.7. The electrician does the dead tests cleanly, runs Stage B and gets all numbers in range, energises, and confirms each MCB opens its own circuit. Job done — except the AFDD manual test buttons were never pressed. Six weeks later a series-arc fault develops in a faulty extension lead, and the AFDD is found in the post-incident inspection to have a stuck contact that the manual self-test would have revealed."
            doInstead="Reg 643.10 (A4:2026) extends functional testing explicitly: where an AFDD is installed, the effectiveness of any manually operated test facility shall be verified in accordance with the manufacturer&rsquo;s recommendations. Press the test button on every AFDD, confirm it trips, reset, and record the outcome on the schedule. The same applies to RCD test buttons (the integral test, distinct from the IΔn instrument test) and main switch operation. Functional is a real test, not a finishing flourish."
          />

          <CommonMistake
            title="Recording a Zs against the BS 7671 Table 41.x value when the design has set a tighter limit"
            whatHappens="A new circuit on a TN-C-S (PNB) supply has been designed with a Zs limit of 0.95 Ω (the designer chose tighter than the Table 41.3 0.4 s limit because of an EV-charging branch downstream). You measure 1.10 Ω and record it as a pass against the Table 41.3 figure of 1.37 Ω. Two years later the EV-charge install fails commissioning because the Zs at the EV outlet is too high to satisfy 722.411 — and the trail leads back to your certificate, which recorded a Zs that passed the wrong limit."
            doInstead="A4:2026 added an explicit max-permitted-Zs column on the Schedule of Circuit Details. Where the designer has set a tighter limit than the Table 41.x value, that tighter number is what your measured Zs is judged against — and is what gets recorded next to your reading. Read the design before you measure, not after."
          />

          <SectionRule />

          <ContentEyebrow>The A4:2026 changes — what is actually different</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.3 redraft — IR and RCD test"
            plainEnglish="The biggest test-procedure change in A4:2026 is in 643.3. Three things changed at once: a 250 V DC post-connection IR test became mandatory, Table 3A in Appendix 3 was deleted, and RCD effectiveness became a single AC test at IΔn regardless of Type."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>250 V DC post-connection.</strong> Reg 643.3.3 second sentence: following
                connection of equipment that was disconnected for the prior IR test, a test at
                250&nbsp;V DC shall be applied between live conductors and the protective conductor
                connected to the earthing arrangement, with an IR ≥&nbsp;1&nbsp;MΩ. The test was
                previously a ‘should’; it is now a ‘shall’.
              </li>
              <li>
                <strong>Table 3A deleted.</strong> The old Time/current performance criteria for
                RCDs by Type are gone from Appendix 3. No more lookup tables that varied by Type AC
                / A / F / B.
              </li>
              <li>
                <strong>Single AC test at IΔn.</strong> Reg 643.3 explicitly states that regardless
                of RCD Type, an AC test at rated residual operating current is used to verify
                effectiveness. Reg 643.8 NOTE keeps the time limits: 300&nbsp;ms maximum for
                general non-delay; 130–500&nbsp;ms for S-type RCDs.
              </li>
              <li>
                <strong>Practical effect on your test sheet.</strong> One IΔn trip-time column
                instead of a Type-conditional set. Record the device Type alongside (still useful
                for context and for selecting the correct device on a fault report), but the
                acceptance number is now a single AC test result.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <ConceptBlock
            title="Reg 643.10 functional testing — AFDD added"
            plainEnglish="Reg 643.10 was extended to require functional verification of any AFDD&rsquo;s manually operated test facility, in accordance with the manufacturer&rsquo;s recommendations. Appendix 6 model forms now include an AFDD recording field so the verification has somewhere to land."
            onSite="Press the manual test button on every AFDD installed under Reg 421.1.7 (HRRBs, HMOs, purpose-built student accommodation, care homes, and the recommended-cases for socket-outlets ≤32 A elsewhere). Confirm trip, reset. Record on the schedule."
          >
            <p>
              Some AFDDs have an automatic self-test in addition to (or instead of) a manual test
              button. Reg 643.10 wording is &lsquo;any manually operated test facility&rsquo; — so
              if a manual button is provided, it gets pressed at commissioning. If only automatic
              self-test is provided, the indication of test pass / malfunction (typically an LED) is
              verified at commissioning instead. Either way, the outcome is recorded.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Appendix 6 model forms — what was added in A4:2026"
            plainEnglish="The model forms in Appendix 6 (EIC, EICR, Minor Works, Schedule of Inspections, Schedule of Circuit Details, Schedule of Test Results) were amended to record the new equipment classes and the new design parameters that A4 made explicit."
          >
            <p>The relevant changes for an electrician filling out a certificate are:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>SPD details.</strong> Where SPDs are installed, fields for SPD Type
                (Type&nbsp;1, 2, 3 or combinations), location (e.g. main DB, sub-DB), and
                manufacturer/model are now part of the certification. Recorded per board.
              </li>
              <li>
                <strong>AFDD details.</strong> Where AFDDs are installed under Reg 421.1.7, the
                model forms include AFDD recording fields and the schedule of test results includes
                an AFDD test column for the manual / automatic test outcome under Reg 643.10.
              </li>
              <li>
                <strong>TN-C-S (PNB) earthing.</strong> Reg 312.2.1.1 now includes an explicit
                Protective Neutral Bonding figure and requirements; the Schedule of Inspections
                items recording &ldquo;Earthing arrangement&rdquo; reflect TN-C-S with PNB as a
                distinct option (rather than only TN-C-S/PME), and the certificate captures it.
              </li>
              <li>
                <strong>Reference method.</strong> Schedule of Circuit Details now records the
                reference method (Method A / B / C / D / E / F etc.) explicitly per circuit, since
                cable rating depends on it and Zs limits are derived from it.
              </li>
              <li>
                <strong>Maximum permitted Zs per circuit.</strong> A discrete column on the Schedule
                of Circuit Details for the design&rsquo;s max permitted Zs — which may be tighter
                than the Table 41.x value where the designer has imposed it. The measured Zs on the
                test schedule is judged against this column.
              </li>
              <li>
                <strong>SPD Type per board.</strong> Recording column reflects the SPD Type that is
                actually installed at the relevant DB so the next inspector can see which surge
                protection is in service.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Appendix 6 (Model forms — amended)"
            clause={
              <>
                Appendix 6 Model forms for certification and reporting have been amended to include
                fields for recording the details of SPDs (surge protective devices) and AFDDs (arc
                fault detection devices). Installers shall record SPD and AFDD details on the model
                forms where such devices are installed. The notes for the person producing the
                condition report have been redrafted and items rearranged for clarity.
              </>
            }
            meaning="If an SPD or AFDD is installed and there is no entry against it on the certificate, the certificate is incomplete. The form structure was changed precisely so that the absence of recorded SPD/AFDD detail is visible to the next inspector."
          />

          <SectionRule />

          <ContentEyebrow>Choosing the right certificate</ContentEyebrow>

          <ConceptBlock
            title="EIC, EICR or Minor Works — pick from the wording, not from the size of the job"
            plainEnglish="Reg 644 (Certification for initial verification) and Reg 653 (Reporting for periodic inspection) name the three certificates and prescribe their use. Pick by the nature of the work, not by how long it took."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Electrical Installation Certificate (EIC) — Reg 644 / Appendix 6.</strong>{' '}
                For a new installation, an addition or an alteration that includes a new circuit.
                Includes Schedule of Inspections and Schedule of Test Results. Signed by designer,
                constructor and inspector (may be the same person).
              </li>
              <li>
                <strong>
                  Minor Electrical Installation Works Certificate — Reg 644.4.201 / Appendix 6.
                </strong>{' '}
                For minor work that does not include a new circuit. Examples: adding a socket to an
                existing ring, replacing an accessory like-for-like, installing a single light
                point. The relevant Reg 643 tests still apply at the affected circuit (continuity,
                IR, polarity, Zs, RCD trip-time where present).
              </li>
              <li>
                <strong>
                  Electrical Installation Condition Report (EICR) — Reg 653 / Appendix 6.
                </strong>{' '}
                For periodic inspection and testing of an existing installation. Records
                Observations with classification codes (C1 immediate danger, C2 potentially
                dangerous, C3 improvement recommended, FI further investigation). Schedule of Test
                Results attached. Signed by the inspector.
              </li>
            </ul>
            <p>
              The decision tree is short. New circuit anywhere in the work? EIC. Periodic
              inspection? EICR. Neither? Minor Works. EIC is never wrong (it is more comprehensive)
              but it is the wrong form to issue for periodic — Reg 653 names EICR for that.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <Scenario
            title="A landlord-instructed periodic inspection on an HMO with AFDDs already fitted"
            situation="You inspect an HMO where AFDDs were installed at the last consumer-unit upgrade two years ago. The certificate type required is an EICR per Reg 653. The AFDDs have manual test buttons. The Schedule of Inspections in Appendix 6 includes the AFDD recording field added in A4:2026."
            whatToDo={
              <>
                <span className="block">
                  Stage A and Stage B as normal, including a Reg 643.10 functional test of every
                  AFDD&rsquo;s manual test facility per the manufacturer&rsquo;s instructions.
                </span>
                <span className="block">
                  Record AFDD make, model and test outcome on the AFDD field of the Schedule of
                  Inspections / Schedule of Test Results.
                </span>
                <span className="block">
                  If a manual test fails to trip the AFDD, that is a C2 observation on the EICR —
                  potentially dangerous, the protective measure for arcing is not effective. The
                  client is informed; the AFDD is replaced; a Minor Works Certificate covers the
                  replacement; the EICR records the original observation and the rectification by
                  reference.
                </span>
              </>
            }
            whyItMatters="HMOs are within the Reg 421.1.7 mandatory list for AFDDs. An EICR that does not record the AFDD verification is incomplete against Appendix 6 (A4:2026). Insurance and tribunal cases turn on what is actually recorded — &lsquo;tested&rsquo; without a recorded outcome will not stand."
          />

          <SectionRule />

          <ContentEyebrow>What goes where on the schedule</ContentEyebrow>

          <ConceptBlock
            title="Output → column mapping on the Schedule of Test Results (A4:2026)"
            plainEnglish="Each test in 643.2–643.10 has a destination column on the Schedule of Test Results. Filling them in is the legal record of the test sequence."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Test (Reg)</th>
                    <th className="text-left text-white/80 py-2">What you record</th>
                    <th className="text-left text-elec-yellow py-2">Where on the schedule</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Continuity (643.2.1)</td>
                    <td>R1+R2 (Method 1) or R2 (Method 2), in Ω</td>
                    <td>Continuity / R1+R2 column</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Ring continuity (643.2.1)</td>
                    <td>r1, rn, r2 end-to-end; (r1+r2)/4 at far socket</td>
                    <td>Ring r1, rn, r2 columns</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">IR — L–L and L–E (643.3)</td>
                    <td>IR in MΩ; min 1 MΩ at 500 V DC for LV</td>
                    <td>IR L–L / IR L–E columns</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">IR — 250 V post-connection (643.3.3)</td>
                    <td>IR in MΩ; min 1 MΩ at 250 V DC</td>
                    <td>Comments / dedicated 250 V field</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Polarity (643.6)</td>
                    <td>Tick to confirm — at origin and each accessory</td>
                    <td>Polarity column</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Ze (643.7.1)</td>
                    <td>External Ze in Ω, measured at origin</td>
                    <td>Ze field on certificate header</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Zs (643.7.3)</td>
                    <td>Measured Zs in Ω, judged vs A4 max permitted Zs column</td>
                    <td>Zs column · max-permitted-Zs column on Schedule of Circuit Details</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">IPFC (643.7.3.201)</td>
                    <td>PSCC / PEFC in kA, at origin</td>
                    <td>IPFC field on certificate header</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">RCD AC test at IΔn (643.7.3 / 643.8)</td>
                    <td>Trip time in ms; device Type recorded alongside</td>
                    <td>RCD test column · A4 single-AC-test result</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Phase sequence (643.9)</td>
                    <td>Confirmed L1–L2–L3 throughout — polyphase only</td>
                    <td>Phase sequence column / tick</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">AFDD manual test (643.10 · A4 new)</td>
                    <td>Trip outcome on manual button per manufacturer</td>
                    <td>AFDD test column — A4:2026 addition</td>
                  </tr>
                  <tr>
                    <td className="py-2">Functional (643.10)</td>
                    <td>Switchgear / RCD test button / EM stop / interlocks</td>
                    <td>Functional column · tick + comment</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Not every column applies on every job. Empty columns where the test was not relevant
              (no ring on this circuit, no RCD, no AFDD) are recorded as N/A. Empty columns where
              the test was relevant and was missed are non-conformities, and the certificate is
              incomplete until they are filled or the omission is justified in the comments.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.1 makes the order of 643.2 to 643.6 normative — those tests, in that order, before energisation. The dependency chain is the reason.',
              'Reg 643.7.2 is the defects-recovery rule: failed test + any preceding test the result of which the fault may have influenced — both repeated after rectification.',
              'A4:2026 redrafted Reg 643.3 — 250 V DC post-connection IR mandatory, Table 3A deleted, RCD AC test at IΔn for any Type.',
              'Reg 643.10 functional now explicitly covers AFDD manual test facility per manufacturer. New AFDD column on the Schedule of Test Results.',
              'Appendix 6 model forms amended for SPD details, AFDD details, TN-C-S (PNB) earthing, reference method, max permitted Zs per circuit, SPD Type per board.',
              'Reg 643.7.3.1: continuity test (643.2) before Zs measurement. Out-of-order Zs is reading the wrong loop.',
              'Choose certificate from Reg 644 / 653 wording: new circuit → EIC; minor work no new circuit → Minor Works (Reg 644.4.201); periodic → EICR (Reg 653).',
              'Empty schedule columns are either N/A (justified) or non-conformities. There is no third option.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Reg 643.1 says &lsquo;in that order&rsquo; for 643.2–643.6. Does that mean I cannot do anything in parallel?',
                answer:
                  'It means the regulation duty for any given circuit is sequential — continuity then IR then polarity, on that circuit, before energising. On a multi-circuit board you can stage tests in parallel across circuits in practice (run continuity on all circuits first, then IR on all circuits, etc.) and many electricians do. What you cannot do is energise a board on which Stage A is incomplete on any relevant circuit. The order is per the test class, not per the circuit.',
              },
              {
                question: 'What changed about RCD testing in A4:2026 — and what do I record now?',
                answer:
                  'Three things. (1) Table 3A in Appendix 3 was deleted. (2) Reg 643.3 redraft makes the verification a single AC test at IΔn, regardless of RCD Type. (3) The time limits in Reg 643.8 NOTE remain: ≤300 ms for general non-delay; 130–500 ms for S-type. You record the AC IΔn trip time in ms, plus the RCD Type alongside (still useful for context and for distributor reports), but the acceptance number is the single AC test. The schedule columns reflect this.',
              },
              {
                question: 'Why does Reg 643.10 now mention AFDDs explicitly?',
                answer:
                  'AFDDs are mandatory under Reg 421.1.7 in Higher Risk Residential Buildings, Houses in Multiple Occupation, purpose-built student accommodation and care homes (and recommended for socket-outlets ≤32 A elsewhere). Once mandated, the regulation needed a verification step — Reg 643.10 (A4:2026) requires that where an AFDD is installed, the effectiveness of any manually operated test facility shall be verified per the manufacturer. Appendix 6 was amended in lockstep so the verification has a recording field.',
              },
              {
                question:
                  'A test fails. Reg 643.7.2 says I have to re-run preceding tests. Which preceding tests, exactly?',
                answer:
                  'Any preceding test the result of which may have been influenced by the fault. Practically: a failed IR on a circuit invalidates that circuit&rsquo;s continuity reading taken at the same point (a damaged cable can degrade both). A failed Zs invalidates nothing earlier — Zs is the consequence of continuity, not a precondition for it — but it does invalidate any RCD trip-time you might have measured assuming the bad Zs was real. Read the dependency chain: which earlier test could the same fault have skewed? Re-run those.',
              },
              {
                question:
                  'On a Minor Works Certificate, do I really need to test the whole sequence?',
                answer:
                  'You need the relevant Reg 643 tests at the affected circuit. For adding a socket to an existing ring: continuity (R1+R2 at the new outlet, ring continuity if the ring was broken into), polarity at the new outlet, IR on the affected circuit, Zs at the new outlet, and an RCD trip-time check if the circuit is RCD-protected. The Minor Works form has fields for each. You do not have to re-test untouched circuits, but anything you joined into is in scope.',
              },
              {
                question:
                  'What is the &lsquo;max permitted Zs&rsquo; column on the new Schedule of Circuit Details and how do I use it?',
                answer:
                  'A4:2026 added an explicit column for the design&rsquo;s maximum permitted Zs per circuit. Where the designer has set a tighter limit than the BS 7671 Table 41.x raw value (because of downstream EV charging, motor loads, or RCBO/AFDD coordination), the tighter number lives in that column and is what your measured Zs is judged against. Do not default to the Table 41.x value if the design column is filled in — the designer&rsquo;s number is the load-bearing limit.',
              },
              {
                question: 'Where does the 250 V DC post-connection IR test fit in the sequence?',
                answer:
                  'After equipment that was disconnected for the 500 V DC IR test has been reconnected. Reg 643.3.3 second sentence requires it: a 250 V DC test between live conductors and the protective conductor connected to the earthing arrangement, IR ≥ 1 MΩ. In practice it sits at the end of Stage A, after polarity, just before you energise for Stage B. Some practitioners record it as a row on the schedule labelled &lsquo;250 V post-connection&rsquo; alongside the main IR column.',
              },
              {
                question:
                  'Photographs and electronic test-result downloads — are these acceptable record formats?',
                answer:
                  'Yes. Reg 653 / Appendix 6 prescribe the model form structure, not the medium. Electronic certificates are explicitly acceptable and many MFTs export directly into compatible formats. Photographs are evidence and should be retained as part of the record (especially of defects, consumer-unit interiors before-and-after, and AFDD/SPD nameplates so the recorded model is verifiable). The original certificate goes to the person ordering the work; the contractor retains a copy; for competent-person-scheme work, the scheme operator also receives a copy.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Test sequence and documentation — Module 1.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 2 · Safe isolation procedures
              </div>
            </button>
          </div>

          <div className="hidden">
            <ListChecks />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule1Section5;
