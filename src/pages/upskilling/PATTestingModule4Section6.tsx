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
    id: 'patm4-s6-misleading-pass',
    question:
      'A Class I appliance reads 0.06 Ω earth continuity at 25 A — well below the 0.13 Ω calculated acceptance for its lead. The reading is suspiciously low. What is the most likely explanation and what does it imply?',
    options: [
      'A particularly good earth bond — record the low reading and pass',
      'A parallel earth path is masking the cord-set — re-test with the appliance isolated',
      'The lead is too short, so the reading reads artificially low — fit a longer lead',
      'The tester is faulty and reading low — swap to a calibrated instrument and re-test',
    ],
    correctIndex: 1,
    explanation:
      'A reading much lower than the calculated acceptance is a parallel-path warning, not a quality reading. The appliance chassis is likely touching another bonded item (metal worktop, bonded radiator, adjacent earthed appliance), giving a second earth route in parallel with the cord-set protective conductor; the meter reads the parallel combination, so a degraded cord-set can still pass. Repeat the test with the appliance isolated on an insulating mat, away from any bonded metalwork, to see the cord-set in isolation. Same diagnostic principle as the fixed-installation R1+R2 parallel-path issue from M3.',
  },
  {
    id: 'patm4-s6-salvageable-fail',
    question:
      'A Class I PC fails the 500 V IR test at 0.6 MΩ. The PC works perfectly. Visual is sound. Is this fail final, or salvageable?',
    options: [
      'Final — the IR fail stands, so discard the PC and remove it from service',
      'Salvageable — switch to substitute leakage in lieu of IR and judge against the Class I limit',
      'Re-test the IR at 250 V instead and pass if it clears the limit at the lower voltage',
      'Always fail — a sub-1 MΩ IR reading is insulation breakdown regardless of equipment type',
    ],
    correctIndex: 1,
    explanation:
      'IET CoP Ch 15 explicitly recognises this case. Switch-mode PSUs and EMC-filtered IT equipment legitimately fail the 500 V IR because of internal Y-capacitors, not insulation breakdown. The route is substitute leakage in lieu of IR (M4.4), judged against the appropriate Class I limit (≤ 0.5 mA general, or up to 3.5 mA for BS EN 62368-1 IT equipment with an intact protective conductor). The IR fail is real (the meter reads what is there) but the safety question is answered by leakage at operating voltage, not IR at 500 V DC. A pass on substitute leakage is a valid PAT pass.',
  },
  {
    id: 'patm4-s6-four-modes',
    question: 'Which of the following is NOT one of the four common PAT failure modes?',
    options: [
      'Low IR (insulation breakdown)',
      'High earth resistance (bad protective conductor / loose joint)',
      'Polarity reversed at the plug',
      'Excessive operating temperature',
    ],
    correctIndex: 3,
    explanation:
      'The four common PAT failure modes per IET CoP Ch 15: low IR, high earth-continuity resistance, polarity reversed, excessive earth-leakage / touch current. Operating temperature is a separate concern (covered by visual inspection / functional test) and is not a primary PAT measurement.',
  },
  {
    id: 'patm4-s6-record-vs-fail',
    question:
      'You have a Class I floor heater. Earth continuity reads 0.18 Ω against a calculated acceptance of 0.16 Ω. The reading is marginal — just over the limit. What does IET CoP guidance suggest?',
    options: [
      'Ignore it — the reading is close enough, so record a pass',
      'Investigate the test setup before deciding pass or fail',
      'Average across three readings and judge the appliance against the mean',
      'Always fail at the first marginal reading and remove the heater from service',
    ],
    correctIndex: 1,
    explanation:
      'A marginal reading is a diagnostic outcome, not a binary fail. The reading is only just over the limit and sits in the range where lead-resistance error or contact resistance can shift the result. Re-null the test leads, ensure the probe contacts clean unpainted metal, and re-test. If the reading drops below the limit, the cause was test setup; if it remains over, the appliance has a real high-resistance joint in the earth path. IET CoP guidance directs the operator to investigate test setup first, then the appliance, with the fail decision coming after investigation, not before.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'IET CoP Ch 15 names four common PAT failure modes. Which of these is the canonical list?',
    options: [
      'Low IR; high earth-continuity resistance; polarity reversed; excessive earth-leakage / touch current',
      'IR; flex damage; warm-running; missing label',
      'Power consumption; weight; colour; size',
      'Earth fault loop impedance; Zs; R1+R2; PFC',
    ],
    correctAnswer: 0,
    explanation:
      'The four common modes map directly to the four electrical PAT tests: insulation, continuity, polarity, and leakage. Each maps to a specific safety failure mode and a specific PAT test. Visual / inspection failures (flex damage, missing labels) are upstream of the electrical tests and dealt with at M3 inspection.',
  },
  {
    id: 2,
    question: 'When can a "pass" on earth continuity be MISLEADING?',
    options: [
      'Never — an earth-continuity pass always reflects a sound cord-set protective conductor',
      'Only on Class II appliances, where the earth-continuity test does not apply',
      'When a parallel earth path to another bonded item carries the test current alongside the cord-set',
      'Only when the appliance lead exceeds 5 m, where added cable resistance skews the result',
    ],
    correctAnswer: 2,
    explanation:
      "Parallel earth paths between the appliance and another bonded item (metal worktop, adjacent earthed appliance, bonded pipe) give artificially low readings that look like a healthy earth bond — the meter reads the parallel combination, so a degraded cord-set protective conductor can still pass because the alternate path carries the test current. Mitigation: test with the appliance isolated on an insulating surface, away from any other bonded metalwork.",
  },
  {
    id: 3,
    question: 'When can a "fail" on the 500 V IR test be SALVAGEABLE?',
    options: [
      'Never — a low IR reading always means insulation breakdown and a final fail',
      'Only when the appliance is brand new and the reading is assumed to settle in service',
      'Always — every IR fail can be cleared by re-testing at a lower 250 V test voltage',
      'When internal Y-capacitors on switch-mode or EMC-filtered kit legitimately drag the reading down',
    ],
    correctAnswer: 3,
    explanation:
      'IR is a stress test of resistive insulation. Y-capacitors in switch-mode PSUs, EMC filters and surge arresters are deliberate engineering features that look like low resistance to a 500 V DC test but are not insulation breakdown. The IET CoP route is substitute leakage in lieu of IR (≤ 0.5 mA Class I, up to 3.5 mA for BS EN 62368-1 IT equipment), which measures the actual safety-relevant current at operating voltage and gives a valid pass on equipment whose IR reading is misleading.',
  },
  {
    id: 4,
    question:
      'A polarity test fails with the message "L–E reversed" on a re-wireable BS 1363 plug. What is the immediate safety action?',
    options: [
      'Hard fail — mark "DO NOT USE" and physically remove the appliance from service',
      'Re-test once to confirm the result before taking any action on the appliance',
      'Replace the BS 1362 fuse, re-make the plug and re-test the appliance',
      'Continue to the leakage test and decide on the combined pass/fail result',
    ],
    correctAnswer: 0,
    explanation:
      'L–E reversed is a category of fault that puts mains directly onto the protective conductor system. The appliance chassis (and any other Class I appliance sharing the same socket through an extension lead, for example) is at 230 V. Hard fail, immediate physical removal, label and report — and check what other equipment may have come from the same source.',
  },
  {
    id: 5,
    question:
      'You PAT-test a kettle that has been operating fine for years. Earth continuity passes (0.07 Ω), IR passes (>999 MΩ), polarity passes, leakage 0.08 mA. What goes on the appliance record beyond just "Pass"?',
    options: [
      "Just 'Pass' is sufficient on a clearly serviceable appliance",
      'Only the failure modes, since passing tests need no further numeric detail',
      'All four numeric readings plus test voltage/current, class, dates, IDs, limits and next-test-due',
      'Only the highest single reading, recorded as the worst case for the appliance',
    ],
    correctAnswer: 2,
    explanation:
      'A full record captures the four numeric readings, the test voltage/current, the construction class, dates, operator ID, appliance ID, acceptance values and next-test-due. Numeric data is the difference between a useful PAT record and a useless one: it lets trend analysis catch a kettle drifting from 0.07 Ω to 0.11 Ω over three cycles. The duty-holder under EAW 1989 / HSG107 needs it to demonstrate the equipment cohort is being managed over time, not just snapshot-tested.',
  },
  {
    id: 6,
    question:
      'An appliance fails IR at 0.4 MΩ. The operator suspects damp insulation rather than genuine breakdown (the appliance has been stored in a damp shed). What does IET CoP-aligned good practice direct?',
    options: [
      'Fail and discard the appliance immediately on the first low reading',
      'Average the 0.4 MΩ reading with a second attempt and judge against the mean',
      'Re-test at 250 V DC and pass if the lower-voltage reading clears the limit',
      'Dry the appliance and re-test, recording both readings and deciding on the recovery',
    ],
    correctAnswer: 3,
    explanation:
      'Damp-related IR drops are recoverable and not the same as genuine insulation breakdown. The IET CoP-aligned response is to warm the appliance briefly or store it dry for 24 h, then re-test: if it recovers above 1 MΩ, record both readings and pass with explanation; otherwise the failure is genuine and it is removed from service. Recording both readings makes the audit trail explicit and lets the duty-holder track equipment stored or used in damp environments.',
  },
  {
    id: 7,
    question:
      "What is the IET CoP-recognised difference between 'remove from service immediately' and 'flag for remediation at next opportunity'?",
    options: [
      'Immediate removal is for direct shock risks; flag-for-remediation is for degrading-but-safe faults',
      'There is no difference — both terms mean the same removal action',
      'All faults require immediate removal regardless of their severity',
      'Only insulation faults are treated as immediate; all other faults are flagged',
    ],
    correctAnswer: 0,
    explanation:
      "The PAT fail spectrum is not binary at the safety level. Immediate removal applies to direct shock risks — L–E polarity reversal, broken Class I protective conductors, gross insulation breakdown exposing live parts. Flag-for-remediation applies to degrading-but-not-dangerous faults like marginal IR or earth resistance still within range. The judgement is informed by IET CoP guidance, the duty-holder's HSG107-aligned risk policy, and operator competence per EAW 1989 Reg 16.",
  },
  {
    id: 8,
    question:
      'An extension reel reads 0.42 Ω earth continuity against a calculated acceptance of 0.42 Ω — exactly at the limit. The IR is fine, polarity is fine, leakage is fine. Pass or fail?',
    options: [
      'Fail — a reading exactly at the limit does not meet the acceptance criterion',
      'Always fail any reading that touches the calculated threshold, without investigation',
      'Pass on the strict reading but flag for closer inspection and investigate the cause next cycle',
      'Average the reading with previous test cycles and judge against the resulting mean',
    ],
    correctAnswer: 2,
    explanation:
      'A reading exactly at the threshold is a pass per the strict numeric rule but a flag in operator judgement — it is at the limit and will drift over. Investigate the cause (loose plug terminal, slip-ring or socket-end contact), which often restores headroom to about 0.30 Ω. The duty-holder gets a compliant lead now plus an early-warning marker for the cohort.',
  },
  {
    id: 9,
    question:
      'What is the relationship between the PAT result and BS 7671:2018+A4:2026 Reg 643.2.1 (continuity), Reg 643.3 (insulation resistance) and Reg 643.6 (polarity)?',
    options: [
      'There is no relationship at all between PAT and the BS 7671 643.x tests',
      'BS 7671 supersedes the IET CoP and sets all PAT acceptance values directly',
      'They are unrelated because PAT covers appliances and BS 7671 covers buildings only',
      'PAT values come from the IET CoP and 643.x governs the fixed install, but the principles are parallel',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 643.x sets the fixed-installation duty; IET CoP Ch 15 sets the PAT duty. Both apply the same engineering principles (resistance measurement, 500 V DC IR, polarity verification) but with different acceptance values appropriate to the system level being tested. Together they form the end-to-end electrical safety regime.',
  },
  {
    id: 10,
    question:
      'Which combination of failure indicators most strongly suggests the appliance should be REMOVED FROM SERVICE rather than remediated?',
    options: [
      'Multiple concurrent failures, any single dangerous fault, or repeat failures indicating end-of-life',
      'A single small marginal reading on one of the four tests',
      'Only IR failures, regardless of their severity or cause',
      'Only polarity failures, regardless of the reversal type',
    ],
    correctAnswer: 0,
    explanation:
      "Single marginal readings often have remediable causes. The remove-from-service decision points are: (a) multiple concurrent failures suggesting systemic degradation, (b) any single dangerous fault that cannot be reliably remediated to a safe state, or (c) a trend over time suggesting the appliance is wearing out. The duty-holder's risk policy supports the operator in making the call.",
  },
];

const PATTestingModule4Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Interpreting results and common failures | PAT M4.6 | Elec-Mate',
    description:
      'IET Code of Practice 5th Ed Ch 15: when a "pass" is misleading (parallel earth paths), when a "fail" is salvageable (capacitive coupling on switch-mode kit), the four common failure modes, and what to record vs what to fail.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6"
            title="Interpreting results and common failures"
            description="Reading the numbers, not just the pass/fail flag. When a pass hides a problem, when a fail is salvageable, and the four common modes that account for nearly every real-world PAT failure."
            tone="yellow"
          />

          <TLDR
            points={[
              'A PAT result is a number, not a binary. The number sits in one of four diagnostic bands: clearly within limits, marginal within limits, marginal over limits, or clearly over limits. Each band has a different next action.',
              'A "pass" on earth continuity can be misleading when parallel earth paths exist (appliance touching another bonded item during the test). Test on an insulating surface to see the cord-set in isolation.',
              'A "fail" on the 500 V IR test can be salvageable when the appliance is switch-mode or EMC-filtered. IET CoP allows substitute leakage testing in lieu, with the operating-voltage-equivalent leakage being the safety-relevant measurement.',
              'The four common PAT failure modes: (1) low IR — insulation breakdown; (2) high earth-continuity resistance — broken or loose protective conductor; (3) polarity reversed — wiring fault; (4) excessive earth-leakage / touch current — degraded EMC components, damp, contamination.',
              'Record numeric results to two decimal places (Ω) or appropriate precision (mA, MΩ). Trend analysis over multiple test cycles catches degradation that pass/fail records miss. The numeric data is the difference between a useful PAT record and a defensible-only-on-paper one.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish a true pass from a misleading pass — recognise parallel-path artefacts and other test-setup effects that produce artificially good readings',
              'Distinguish a true fail from a salvageable fail — apply the IET CoP substitute leakage route for switch-mode and EMC-filtered equipment',
              'Identify the four common PAT failure modes and the test that catches each',
              'Decide between immediate removal from service, remediation, and pass-with-flag based on the failure category and severity',
              'Record numeric data correctly to support trend analysis across test cycles',
              'Reference the IET CoP, BS EN 61557, BS 7671 643.x and HSG107 framework when justifying a pass / fail / remediation decision',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The four diagnostic bands</ContentEyebrow>

          <ConceptBlock
            title="Reading a PAT result as a number, not a binary"
            plainEnglish="Every PAT measurement (earth continuity in Ω, IR in MΩ, leakage in mA) sits somewhere on a continuum from clearly safe to clearly unsafe. The IET CoP acceptance limit divides the continuum, but the actual reading tells you where on the continuum the appliance sits. Four diagnostic bands per measurement."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">Clearly within limits.</strong> Reading well
                inside the IET CoP threshold. Pass. Record. Move on. (Examples: earth continuity
                0.07 Ω against a 0.13 Ω limit; IR &gt; 999 MΩ; leakage 0.08 mA against a 0.5 mA
                limit.)
              </li>
              <li>
                <strong className="text-emerald-300">Marginal within limits.</strong> Reading close
                to but within the threshold. Pass on the strict numeric rule. Flag for closer
                inspection at the next test cycle. Trend analysis over multiple cycles will reveal
                whether the appliance is degrading.
              </li>
              <li>
                <strong className="text-amber-300">Marginal over limits.</strong> Reading just over
                the threshold. Investigate before recording. Causes are often test-setup related
                (lead null, contact resistance, parallel paths) and remediable in seconds. If
                investigation does not resolve, the appliance has a real fault and goes to
                remediation or removal.
              </li>
              <li>
                <strong className="text-red-300">Clearly over limits.</strong> Reading well over the
                threshold or showing a categorically dangerous failure (open earth, gross IR
                breakdown, polarity reversal). Fail decisively. Investigate cause, remediate where
                possible, remove from service if not.
              </li>
            </ol>
            <p>
              The bands are diagnostic categories, not numeric definitions — the boundary between
              &ldquo;clearly within&rdquo; and &ldquo;marginal within&rdquo; depends on the test and
              the cohort. For earth continuity, &ldquo;clearly within&rdquo; might be a reading less
              than 60 % of the calculated limit; &ldquo;marginal within&rdquo; is the upper 30 %.
              For IR, anything over 50 MΩ is clearly within; 1–5 MΩ is marginal within. The operator
              develops the calibrated sense for their specific cohort over time.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>When a "pass" is misleading</ContentEyebrow>

          <ConceptBlock
            title="Parallel earth paths — the most common artefact"
            plainEnglish="If the appliance under test is touching another bonded item during the earth-continuity measurement (a metal worktop, an adjacent earthed appliance, a bonded radiator, a metal sink), the test current can flow through the alternate path in parallel with the cord-set protective conductor. The reading is the parallel combination, which is always lower than the cord-set alone. The cord-set itself could be degraded and the test would still pass."
            onSite="Same diagnostic principle as the fixed-installation R1+R2 parallel-path issue from M3.1. The reading looks too good — and that is the warning. A 0.04 Ω reading on a Class I appliance with a 1.5 m flex (calculated acceptance 0.13 Ω) is not three times better than expected; it is reading a parallel path."
          >
            <p>
              Mitigation is procedural: test the appliance on an insulating surface (a rubber mat, a
              plastic table, the PAT bench itself), with no other bonded item in contact. The
              cord-set protective conductor is then the only path; the reading reflects the cord-set
              integrity in isolation.
            </p>
            <p>
              Where the parallel path is genuinely part of the appliance design — for example, an
              industrial machine with a separate earth-bonding stud bolted to a building structural
              steel — the parallel path is not an artefact, it is a designed feature. The cord-set
              still has to be tested in isolation to verify its own integrity, but the in-service
              earth path on the deployed installation includes both routes. PAT records should note
              where the appliance has additional earth bonding outside the cord-set.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Other ways a pass can mislead"
            plainEnglish="Parallel paths are the headline case but not the only one. Three other situations where the test result is technically a pass but does not capture the safety reality."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Test point on the wrong surface.</strong> The earth-continuity probe clipped
                onto a painted or plated surface gives an open-circuit reading; clipped onto a clean
                metal point gives a normal reading. If the operator checks an unpainted point that
                is not actually electrically connected to the chassis (e.g. a screw head in a
                separate enclosure), the test passes but the test point was wrong. The chassis earth
                bond may be defective.
              </li>
              <li>
                <strong>IR test on a dry day where damp is the actual problem.</strong> An appliance
                kept in a damp store room reads 0.4 MΩ (fail) on a damp morning and 25 MΩ (pass)
                after drying out for two days in a heated workshop. Both readings are accurate at
                their respective times. The pass on the dry day does not capture the operating
                reality on the damp day.
              </li>
              <li>
                <strong>Substitute leakage on a non-IT Class I appliance.</strong> Substitute
                leakage is the IET CoP-recognised replacement for IR on switch-mode equipment. If an
                operator runs substitute leakage on a kettle (a robust Class I where IR is the
                appropriate test), the substitute reading may pass a leaky kettle that the IR test
                would fail. Apply the right test for the right appliance class.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment, 5th Edition (2020) — Chapter 15"
            clause={
              <>
                The interpretation of test results requires consideration of the appliance under
                test, the operating environment, and the likelihood of artefacts in the measurement.
                A test result that lies outside expected ranges, including readings significantly
                better than expected, shall trigger investigation prior to a final pass / fail
                determination.
              </>
            }
            meaning="IET CoP explicitly directs the operator to treat outliers as diagnostic events, both above and below the limit. A reading too good to be true is as worthy of investigation as a reading on the wrong side of the limit. The pass / fail determination is downstream of the investigation, not upstream."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>When a "fail" is salvageable</ContentEyebrow>

          <ConceptBlock
            title="The IR-on-switch-mode case — the most common salvageable fail"
            plainEnglish="The 500 V DC IR test on Class I switch-mode and EMC-filtered equipment routinely reads in the 0.3–0.9 MΩ range — below the 1 MΩ IET CoP limit. The cause is internal Y-capacitors in the EMC filter, not insulation breakdown. The IET CoP-recognised route is substitute leakage in lieu of IR, with acceptance ≤ 0.5 mA Class I (or up to 3.5 mA per BS EN 62368-1 for IT equipment with intact protective conductor). A pass on substitute leakage is a valid PAT pass."
            onSite="If you fail every IT appliance you test on the IR test alone, you have not learned the substitute-leakage rule yet. M4.4 covers the substitute test in detail; this is the most common single misinterpretation that drives unnecessary failures."
          >
            <p>
              The failure category looks like an IR fail, walks like an IR fail, but is actually a
              feature of the equipment design. The remediation is to switch tests, not to remediate
              the equipment. The PAT record should show: &ldquo;IR 0.6 MΩ at 500 V DC (capacitive
              coupling from EMC filter network, expected for switch-mode IT equipment). Substitute
              leakage 0.18 mA at 230 V equiv. → pass per IET CoP Ch 15.&rdquo;
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Damp-related IR fails — recoverable with drying"
            plainEnglish="An appliance stored in a damp environment can read below the 1 MΩ IR limit when wet. The same appliance dried out reads tens of MΩ. The damp reading is accurate at the time, but the appliance is salvageable — operating it briefly to warm internal insulation, or storing in dry conditions for 24 hours, restores the IR reading."
          >
            <p>
              The procedural response: re-test under dry conditions, document both readings (wet and
              dry), and pass if the dry reading clears the limit. This prevents the false-discard of
              recoverable equipment and creates a record that flags the storage environment as a
              contributory factor — useful for the duty-holder when reviewing equipment storage
              practices.
            </p>
            <p>
              Where the wet reading is an outright open circuit or extremely low (much less than 0.1
              MΩ), drying may not recover the appliance — moisture has likely penetrated the winding
              insulation deeply enough to cause permanent damage. The procedural rule is: attempt
              drying once, re-test, decide based on the recovery. A second damp-related failure on
              the same appliance after a documented dry-and-recover means the appliance is genuinely
              failing.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Marginal earth-continuity fails — often test setup, not appliance"
            plainEnglish="A reading just over the calculated earth-continuity acceptance is more often a test-setup issue than an appliance fault. Lead-resistance null not done, contact resistance at the probe, oxidation on the test point — all add tens of milliohms to the reading and can flip a pass into a marginal fail."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Re-null the test leads.</strong> Most common cause. A 30 mΩ change in
                lead-null state can move a reading.
              </li>
              <li>
                <strong>Inspect the probe contact.</strong> Clean the probe tip and the chassis test
                point. Even on metal, oxidation or grease can add measurable resistance.
              </li>
              <li>
                <strong>Move to a different chassis test point.</strong> The first point may not be
                ideally bonded; a different point on the same chassis may give a cleaner reading.
              </li>
              <li>
                <strong>Re-test.</strong> If the reading drops below the limit, the cause was test
                setup; pass with a note of the corrective action. If the reading is reproducible,
                the appliance has a real high-resistance joint and goes to investigation /
                remediation.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="A networking switch — the canonical salvageable IR fail"
            situation="A 24-port managed network switch in a server room. Class I, three-pin BS 1363 plug, switch-mode PSU with EMC filter network. M4.1 earth continuity passes at 0.12 Ω. M4.2 500 V IR reads 0.42 MΩ — fail against the general 1 MΩ acceptance."
            whatToDo={
              <>
                <span className="block">
                  The IR fail is on equipment with known Y-capacitor coupling. Switch to substitute
                  leakage per IET CoP Ch 15.
                </span>
                <span className="block">
                  Substitute leakage at operating-voltage equivalent reads 1.8 mA. The general Class
                  I limit (0.5 mA) would fail this; however, the equipment is BS EN 62368-1 IT with
                  an intact protective conductor. The product-standard limit applies: up to 3.5 mA
                  permitted.
                </span>
                <span className="block">1.8 mA is comfortably within 3.5 mA. Pass.</span>
                <span className="block">
                  Record entries: &ldquo;Earth continuity 0.12 Ω (pass against 0.18 Ω calc limit).
                  IR 0.42 MΩ at 500 V DC — capacitive coupling from EMC filter, in lieu of IR per
                  IET CoP Ch 15. Substitute leakage 1.8 mA at 230 V equiv (BS EN 62368-1 limit 3.5
                  mA applies for Class I IT with intact protective conductor) — pass. Polarity pass.
                  Functional check pass.&rdquo;
                </span>
              </>
            }
            whyItMatters="Without applying the substitute-leakage rule and the BS EN 62368-1 product-standard limit, this networking switch (and every similar piece of IT kit) would be incorrectly failed by an inexperienced operator. The records would show a string of fails that confuse the duty-holder, the IT department would lose use of equipment that is electrically safe, and the operator's credibility would erode. Knowing the salvageable-fail categories is the difference between a competent PAT regime and a noise generator."
          />

          <CommonMistake
            title="Failing every switch-mode and EMC-filtered appliance because IR reads under 1 MΩ"
            whatHappens="A bench full of Class I IT equipment (PCs, monitors, network switches, printers, copiers) all fail the 500 V IR test. The operator records all as fail and removes from service. The IT department escalates. A more experienced operator re-tests with substitute leakage, applies the BS EN 62368-1 limit, and passes the same equipment. The original fail run was wrong. The lesson: knowing the salvageable categories matters as much as knowing the test methods."
            doInstead="When the appliance category is switch-mode / EMC-filtered IT, anticipate the IR fail and have substitute leakage ready. Most automatic PAT testers will offer to switch tests automatically when an IR fails on a Class I IT profile; configure your test profiles to apply the BS EN 62368-1 limit by default for IT equipment. The records then show the right test applied to the right equipment."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four common failure modes</ContentEyebrow>

          <ConceptBlock
            title="The categorical failure list — what each one looks like and what causes it"
            plainEnglish="Almost every real-world PAT failure falls into one of four categories. Each maps to a specific PAT test, has a specific safety implication, and has a typical set of root causes."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Mode</th>
                    <th className="text-left text-white/80 py-2">Test that catches it</th>
                    <th className="text-left text-elec-yellow py-2">Typical causes</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">1. Low IR</td>
                    <td className="align-top">M4.2 IR test (or substitute leakage M4.4)</td>
                    <td className="text-elec-yellow align-top">
                      Damp insulation, contamination across terminals, motor winding insulation
                      breakdown, Y-capacitor degradation, gross insulation failure
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">2. High earth resistance</td>
                    <td className="align-top">M4.1 earth continuity</td>
                    <td className="text-elec-yellow align-top">
                      Loose plug-pin terminal, broken protective conductor, corroded internal earth
                      bond, painted earth screw, partial conductor break
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">3. Polarity reversed</td>
                    <td className="align-top">M4.3 polarity</td>
                    <td className="text-elec-yellow align-top">
                      Re-wireable plug wired wrong, cord-set rebuild error, factory error (rare),
                      repair error after equipment service
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 align-top">4. Excessive leakage</td>
                    <td className="align-top">M4.4 leakage / touch current</td>
                    <td className="text-elec-yellow align-top">
                      Damp / contaminated insulation, partial Y-cap short, surge arrester
                      end-of-life, EMC filter degradation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The test sequence is engineered around the failure modes: each test targets one of the
              four categories. A fail on any of the four typically maps to a specific remediation
              pathway. Multiple concurrent fails across different categories on the same appliance
              suggest end-of-life and removal from service.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Failure mode 1 — low IR (insulation breakdown or capacitive coupling)"
            plainEnglish="Insulation resistance under the 1 MΩ general / 2 MΩ medical-IT limit. Distinguish genuine breakdown from capacitive coupling on EMC-filtered equipment."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Genuine breakdown:</strong> insulation has degraded — damp, contamination,
                age, mechanical damage, thermal cycling. Often paired with a degraded leakage
                reading. Substitute leakage will not rescue it (the leakage will also fail).
                Remediate (clean, dry, repair) or remove from service.
              </li>
              <li>
                <strong>Capacitive coupling:</strong> Y-capacitors in EMC filter networks read as
                low resistance to a 500 V DC test but are not insulation breakdown. Substitute
                leakage at operating voltage gives a meaningful pass. Apply the appropriate
                product-standard limit (general 0.5 mA Class I, or up to 3.5 mA for BS EN 62368-1
                Class I IT).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Failure mode 2 — high earth-continuity resistance"
            plainEnglish="Reading above the calculated 0.1 Ω + cable R acceptance. The protective conductor path has a high-resistance defect somewhere between the plug earth pin and the chassis test point."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Most common cause:</strong> loose terminal at the plug. Open the plug, check
                brown / blue / green-yellow are firmly clamped, re-tighten, re-test. Drops the
                reading by 0.05–0.20 Ω in most cases.
              </li>
              <li>
                <strong>Second most common:</strong> corroded internal earth bond. The protective
                conductor is connected to the chassis by a screw, ring terminal or weld; corrosion
                or paint between the conductor and the chassis adds resistance. Open the appliance,
                clean the bond point, re-make the connection.
              </li>
              <li>
                <strong>Third:</strong> partial conductor break inside the flex. A flex repeatedly
                bent at the plug entry (a vacuum cleaner cord, a power tool flex) can have
                individual strands fractured while the cord still appears intact. Replace the flex.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Failure mode 3 — polarity reversed"
            plainEnglish="The polarity test fails. The line conductor in the cord-set is connected to the wrong pin at one end (BS 1363 plug) or the wrong contact at the other (IEC connector, output socket on extension lead). Five sub-modes per the failure type the tester reports."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>L–N reversed:</strong> brown and blue swapped at one end of the cord. Most
                common. Defeats single-pole switching. Open the plug, swap brown and blue, re-test.
              </li>
              <li>
                <strong>L–E reversed:</strong> brown on the earth pin (or green/yellow on the line
                pin). Categorically dangerous — chassis directly at line voltage. Hard fail,
                immediate physical removal, label DO NOT USE. Investigate cause systemically.
              </li>
              <li>
                <strong>N–E reversed:</strong> blue and green/yellow swapped. Less common but
                similar safety implications — protective conductor is at the neutral potential,
                fault protection compromised. Hard fail.
              </li>
              <li>
                <strong>Open circuit (one conductor missing):</strong> a strand-by-strand break in
                the cord, a missing terminal, a corroded contact. Re-investigate. Common at the plug
                entry strain relief.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Failure mode 4 — excessive earth-leakage / touch current"
            plainEnglish="Substitute leakage or differential leakage above the IET CoP / product-standard limit. The equipment is leaking more current to earth (or to accessible metal on Class II) than is safe."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Damp / contaminated insulation:</strong> often accompanies a low-IR fail.
                Drying may recover; remediation otherwise.
              </li>
              <li>
                <strong>Partial Y-capacitor short:</strong> an EMC filter Y-capacitor that has
                degraded toward a partial short. Common after a surge event or in older equipment.
                Replacement is the remediation; equipment can typically be repaired by a qualified
                service tech.
              </li>
              <li>
                <strong>Surge arrester end-of-life:</strong> MOVs degrade with each surge they
                clamp. Near end-of-life, an MOV starts conducting at lower voltages and contributes
                to leakage. Replace the arrester.
              </li>
              <li>
                <strong>EMC filter degradation:</strong> contamination across filter components,
                cracked PCB tracks, ageing components. Service-level remediation.
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

          <SectionRule />

          <ContentEyebrow>Pass, fail, remediate, or remove — the decision</ContentEyebrow>

          <ConceptBlock
            title="The four-way decision matrix"
            plainEnglish="Once a reading is on the table, the operator has four possible actions: pass and record, pass with a flag for next cycle, remediate and re-test, or remove from service. The decision depends on the reading, the failure category, the appliance, and the duty-holder\'s risk policy."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Decision</th>
                    <th className="text-left text-white/80 py-2">When</th>
                    <th className="text-left text-elec-yellow py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">Pass</td>
                    <td className="align-top">Reading clearly within limit</td>
                    <td className="text-elec-yellow align-top">
                      Record numeric value, label / mark with retest date, return to service
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">Pass with flag</td>
                    <td className="align-top">
                      Reading marginal within limit; trend deteriorating
                    </td>
                    <td className="text-elec-yellow align-top">
                      Record numeric value with note &ldquo;flagged for closer inspection at next
                      cycle&rdquo;; consider shorter test interval
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2 align-top">Remediate &amp; re-test</td>
                    <td className="align-top">
                      Failure has remediable cause (loose terminal, damp, EMC capacitive coupling,
                      parallel path)
                    </td>
                    <td className="text-elec-yellow align-top">
                      Identify cause, remediate (re-tighten, dry, switch to substitute leakage,
                      isolate appliance), re-test, record both readings and the intervention
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 align-top">Remove from service</td>
                    <td className="align-top">
                      Categorically dangerous fail (L–E reversed, open earth, gross IR breakdown),
                      or multiple concurrent failures, or remediation not viable
                    </td>
                    <td className="text-elec-yellow align-top">
                      Physical removal, &ldquo;DO NOT USE&rdquo; label, report to duty-holder,
                      investigate systemic causes if pattern emerges
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <RegsCallout
            source="HSG107 — Maintaining portable electric equipment in low-risk environments (HSE)"
            clause={
              <>
                The duty-holder shall ensure that any equipment found to be defective is taken out
                of service until repaired and re-tested. Records shall be maintained showing the
                date of inspection, the date of testing, the name of the person carrying out the
                inspection or test, and the result of the inspection or test. Defective equipment
                shall be clearly labelled to prevent inadvertent use prior to repair.
              </>
            }
            meaning="HSE\'s framework: defective equipment goes out of service, gets repaired and re-tested, gets clearly labelled. Records are kept of dates, operator, and result. The duty-holder is responsible for this entire chain — the PAT operator is one part of the chain."
          />

          <CommonMistake
            title="Recording 'Pass / Fail' without the numeric reading"
            whatHappens="Six months after a PAT cycle, an appliance fails its next test. The duty-holder asks: was the reading drifting up across cycles, or did it fail suddenly? The records show only 'Pass' for previous cycles. Trend analysis is impossible. The duty-holder cannot demonstrate that the failure was unforeseeable; risk assessment under HSG107 is undermined."
            doInstead="Always record the numeric reading: earth continuity in Ω (two decimal places), IR in MΩ (one decimal place sufficient), polarity pass/fail with the failure mode if fail, leakage in mA. Most automatic PAT testers store the numeric value automatically — use the structured export rather than the pass/fail summary. Trend analysis catches degradation that pass/fail records cannot."
          />

          <CommonMistake
            title="Failing the appliance without checking the salvageable categories first"
            whatHappens="A switch-mode PC fails IR at 0.4 MΩ. The operator records 'Fail' and removes from service. The IT department escalates the next morning; a more experienced operator runs substitute leakage, gets 0.18 mA, applies the BS EN 62368-1 limit, and passes the same PC. The original fail was procedurally wrong. The PC is back in service after a day's avoidable disruption."
            doInstead="When an IR fail is on Class I switch-mode / EMC-filtered equipment, the IET CoP route is substitute leakage in lieu of IR. Make this a workflow default for IT equipment. When a marginal earth-continuity fail is on a familiar appliance, the most likely cause is test setup (lead null, contact, parallel path). Investigate before failing; the salvageable categories cover the majority of marginal fails on healthy equipment."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What to record</ContentEyebrow>

          <ConceptBlock
            title="The audit-quality PAT record"
            plainEnglish="A PAT record per appliance per cycle must include the appliance ID, the construction class, the test date, the operator, the numeric results of each test, the acceptance limits applied (and the standard if non-default), the pass/fail decision, any remediation performed, and the next-test-due date."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Appliance ID:</strong> unique identifier (asset number, barcode label).
                Without an ID, trend analysis is impossible.
              </li>
              <li>
                <strong>Construction class:</strong> Class I, Class II, Class III, or moulded /
                non-detachable plug. Determines applicable limits.
              </li>
              <li>
                <strong>Test date and operator:</strong> per HSG107. Operator initials or full name,
                depending on the duty-holder\'s record format.
              </li>
              <li>
                <strong>Numeric results:</strong> earth continuity (Ω, two decimals), IR (MΩ),
                leakage (mA), polarity (pass/fail with mode if fail). Test current / voltage used
                where relevant (e.g. 100 mA soft vs 25 A hard for earth continuity).
              </li>
              <li>
                <strong>Acceptance limits applied:</strong> 0.1 Ω + cable R for earth continuity; ≥
                1 MΩ general or ≥ 2 MΩ medical for IR; ≤ 0.5 mA Class I or ≤ 0.25 mA Class II for
                leakage, with the BS EN 62368-1 / BS EN 60950-1 / BS EN 60601-1 standard reference
                where the higher product-standard limit applies.
              </li>
              <li>
                <strong>Pass/fail and remediation:</strong> the decision, with any intervention
                noted (e.g. &ldquo;earth continuity initially 0.18 Ω, plug terminal re-tightened,
                re-test 0.07 Ω, pass&rdquo;).
              </li>
              <li>
                <strong>Next-test-due date:</strong> per the duty-holder\'s HSG107 risk assessment.
                Often computed automatically by the tester / asset-management system.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember when the meter shows a number"
            points={[
              'A PAT result is a number, not a binary. Four diagnostic bands per measurement: clearly within, marginal within, marginal over, clearly over. Each has a different next action.',
              'A "pass" can be misleading when parallel earth paths exist — test on an insulating surface to see the cord-set in isolation. Same diagnostic principle as the fixed-installation R1+R2 parallel-path issue.',
              'A "fail" can be salvageable when the appliance is switch-mode or EMC-filtered (substitute leakage in lieu of IR), damp (dry and re-test), or marginal (re-null leads, re-contact probe).',
              'The four common failure modes: low IR, high earth-continuity resistance, polarity reversed, excessive leakage. Each maps to a specific test and a specific remediation pathway.',
              'Polarity L–E reversed is categorically dangerous — chassis at line voltage. Hard fail, immediate physical removal, investigate systemic cause.',
              'Multiple concurrent failures on a single appliance, or a categorically dangerous single fault, signal removal from service rather than remediation.',
              'Record numeric values, not just pass/fail. Trend analysis catches degradation that binary records cannot.',
              'IET CoP, BS EN 61557, BS 7671 643.x and HSG107 frame the regime. Each has a role: IET CoP for the test method, BS EN 61557 for the instrument, BS 7671 for the parallel fixed-installation duty, HSG107 for the operator competence and duty-holder responsibility.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'How do I tell the difference between a borderline pass that needs flagging and a borderline pass that is just within normal variability?',
                answer:
                  "Trend analysis. A borderline reading on a single test cycle is hard to interpret in isolation. Across three or four cycles, you can see whether the reading is stable (normal variability) or rising over time (degradation). Most automatic PAT testers and asset-management systems plot the trend automatically; if yours doesn't, export the numeric data and chart it. A reading rising 10% per cycle on the same appliance is a flag regardless of whether the current reading passes — the trajectory is the diagnostic.",
              },
              {
                question:
                  'My duty-holder asks me to "fail anything below 1 MΩ on IR" without exceptions. How do I handle the BS EN 62368-1 case?',
                answer:
                  "Educate the duty-holder. The IET CoP, BS EN 62368-1 and the established product-standard exception are not optional — they are the engineering-correct standards for IT equipment. A blanket '1 MΩ or fail' policy will fail compliant equipment and cost the duty-holder operational disruption. Document the specific products, the IET CoP Ch 15 reference, and the BS EN 62368-1 limit; if the duty-holder still insists on the lower limit, flag the inconsistency with their HSG107 risk assessment in writing and proceed with their policy. The records will show that you raised the issue.",
              },
              {
                question:
                  'When I find a polarity L–E reversed cord, should I just fix it and pass the appliance?',
                answer:
                  'Fix it AND investigate the systemic cause. A single L–E reversed cord could be a one-off repair error; multiple cords from the same source indicate a procedural problem (training, misunderstanding, faulty stock). Open the plug, fix the wiring, re-test (it should now pass polarity), and check the cohort for similar errors. If you find more than one in the same workplace, escalate to the duty-holder under HSG107 — corrective action may need to extend across the equipment cohort, not just the immediate appliance.',
              },
              {
                question:
                  'How do I handle an appliance that intermittently fails — passes one test cycle, fails the next?',
                answer:
                  'Intermittent failures are difficult to PAT. The most common cause is a partial conductor break that contacts under some conditions and not others (a vacuum cleaner flex with strands broken at the strain relief is the classic). The appliance is in a degraded state and progressing toward complete failure. The duty-holder-aligned response is: pass on the cycle where it tests OK, document the intermittent behaviour, set a much shorter retest interval (3–6 months), and replace the suspect component (typically the flex) at the next opportunity. Intermittent failures rarely improve.',
              },
              {
                question:
                  "I am asked to assess whether a recently-failed appliance can be repaired or should be discarded. What's the IET CoP-aligned framework?",
                answer:
                  'Three-part assessment: (1) cause analysis — what caused the failure? Loose terminal (repairable), insulation breakdown (sometimes repairable), end-of-life component (repairable with replacement), gross damage (typically not repairable). (2) economics — repair cost vs replacement cost. (3) post-repair test — after any repair, the appliance is fully PAT-tested again before return to service, and the records show repair-then-pass clearly. The repair-versus-replace decision sits with the duty-holder, informed by your assessment.',
              },
              {
                question:
                  'How do I distinguish substitute leakage in lieu of IR (legitimate route) from substitute leakage as a cover for a genuine IR fail (incorrect)?',
                answer:
                  'Knowledge of the equipment under test. Substitute leakage in lieu of IR is the legitimate route for switch-mode and EMC-filtered equipment — the IR reading is misleading because of Y-capacitors. Substitute leakage as cover for a genuine IR fail (e.g. running substitute on a kettle that failed IR because of damp insulation) is wrong because the substitute and IR tests answer different safety questions for that equipment class. The rule: substitute-in-lieu-of-IR is appropriate for IT and EMC-filtered Class I; for ordinary Class I (kettles, fan heaters, vacuum cleaners, hand tools), the IR test is the correct test and a fail is a fail.',
              },
              {
                question:
                  "An appliance has been in service for 10 years and is now showing cumulative degradation across multiple PAT measurements (rising earth continuity, falling IR). It still passes everything but is clearly trending. What's the correct action?",
                answer:
                  'Flag for replacement at the next cycle and shorten the retest interval. The trend is the diagnostic — a 10-year-old appliance with all measurements drifting in the wrong direction is at end-of-life regardless of whether the current cycle passes. The HSG107 risk assessment supports the duty-holder in setting a planned replacement vs the alternative of running until failure (which often means failure in service rather than failure on the bench). Replace at end-of-life on a planned basis; PAT records justify the decision.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Interpreting results and common failures — PAT M4.6"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Module 5</div>
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

export default PATTestingModule4Section6;
