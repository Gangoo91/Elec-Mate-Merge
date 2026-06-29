/**
 * Module 4 · Section 5 · Subsection 3 — Dead testing prep + sequence
 * Supplementary Sub — bridges AC 5.1 (inspect) and LO6 (test) by walking through
 * the BS 7671 Reg 643.1 dead-test sequence: continuity → ring final → IR → polarity
 * → earth electrode (TT only). Includes pre-test prep (safe isolation cross-ref to
 * §3 Sub7), instrument calibration, lead null technique, customer briefing.
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

const TITLE =
  'Dead testing — preparation and sequence (5.3) | Level 2 Module 4.5.3 | Elec-Mate';
const DESCRIPTION =
  'The BS 7671 Reg 643 dead-test sequence in order — continuity, ring final, insulation resistance, polarity, earth electrode — with the prep that makes it work.';

const checks = [
  {
    id: 'test-order',
    question:
      'You finish the inspection on a new domestic CU and start dead testing. Which test is first per Reg 643.1?',
    options: [
      'Continuity of protective conductors (R1 + R2).',
      'Insulation resistance at 500 V DC between live conductors and earth.',
      'Polarity at every accessory before any other dead test.',
      'Earth fault loop impedance (Zs) at the furthest point of each circuit.',
    ],
    correctIndex: 0,
    explanation:
      'Reg 643.1 fixes the dead-test order — continuity first, then ring final continuity, then insulation resistance, then polarity, then earth electrode (TT only). Continuity is first because every later test relies on a known earth path. Zs is a live test — it comes after dead testing.',
  },
  {
    id: 'ir-voltage-pick',
    question:
      'You are about to test insulation resistance on a domestic 230 V circuit with no SELV / PELV equipment connected. The correct test voltage is:',
    options: [
      '250 V DC',
      '500 V DC',
      '230 V AC',
      '1000 V DC',
    ],
    correctIndex: 1,
    explanation:
      '500 V DC is the test voltage for circuits up to 500 V (which covers normal 230 V / 400 V LV work). Reg 643.3 sets the test voltage; BS 7671 Table 64 sets the minimum acceptable result. 250 V DC is for SELV / PELV / safety circuits where the higher voltage would damage low-voltage equipment.',
  },
  {
    id: 'safe-isolation-prereq',
    question:
      'Before any dead test, the absolute prerequisite is:',
    options: [
      'That the multifunction tester has been nulled on the continuity range, so lead resistance is subtracted before any dead test begins.',
      'That the customer has been briefed and any sensitive equipment disconnected, so the 500 V DC insulation test cannot cause damage.',
      'That the instrument calibration certificate is in date, so the readings will be accepted on the EIC.',
      'Verified safe isolation per the JIB safe isolation procedure (proving unit checked alive on a known live source, then proving each conductor dead at the point of work, then proving the proving unit alive again).',
    ],
    correctIndex: 3,
    explanation:
      'Dead testing is dead testing — the install (or the part being tested) MUST be confirmed dead before any test lead touches it. The JIB safe isolation procedure (covered in M4 §3 Sub 7) is the discipline that proves it. Calibration matters too, but if the install is not actually isolated, instrument calibration is the last of your worries.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671 Reg 643.1 says the tests of Regulations 643.2 to 643.6 shall be carried out:',
    options: [
      'In any order, depending on the engineer&rsquo;s preference.',
      'In that order, before the installation is energised.',
      'After the installation is energised.',
      'Only when an instrument is available.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.1 is explicit — the tests of Regulations 643.2 to 643.6 shall be carried out, in that order, before the installation is energised. The order matters because each test relies on previous tests having confirmed something — continuity confirms an earth path before IR pushes 500 V DC into the circuit, polarity confirms correct conductor identification before live testing.',
  },
  {
    id: 2,
    question:
      'The R1 + R2 test verifies:',
    options: [
      'The insulation resistance between the line conductor and the CPC, expressed in megohms.',
      'The continuity of the neutral conductor end-to-end on a ring final circuit only.',
      'Continuity of the line conductor and the circuit protective conductor combined, used to predict Zs.',
      'The earth fault loop impedance measured live at the origin of the installation.',
    ],
    correctAnswer: 2,
    explanation:
      'R1 + R2 is the line-plus-CPC continuity test — measured at the consumer unit by linking line and CPC at the far end of the circuit, then reading the loop resistance with a low-resistance ohmmeter. The result is added to Ze to predict Zs without energising the install. Verifies Reg 643.2.1.',
  },
  {
    id: 3,
    question:
      'Why is continuity testing carried out before insulation resistance testing?',
    options: [
      'Because continuity uses a higher test current than IR, so doing it first warms the conductors and gives a more stable insulation reading.',
      'Because IR can only be carried out once the circuit is energised, and continuity is the last dead test before the supply is switched on.',
      'Because the regulations allow the two tests in either order, but continuity is quicker, so it is done first to save time on site.',
      'Because IR pushes 500 V DC into the circuit; if the CPC is not continuous, the test current may take an unintended path and the IR result is meaningless.',
    ],
    correctAnswer: 3,
    explanation:
      'IR pushes 500 V DC between live conductors and between live conductors and earth. The result is meaningful only if the earth reference is solid. If the CPC is not continuous (broken at some point along the circuit), the IR test current finds an unintended path and the reading no longer represents the insulation between live and earth. Continuity first establishes the reference; IR then measures against it.',
  },
  {
    id: 4,
    question:
      'For a ring final circuit, the continuity test (Reg 643.2.2) verifies:',
    options: [
      'End-to-end continuity of L, N and CPC separately, plus the cross-connection r1+r2 test (R1+R2 at every socket should be roughly equal).',
      'Only the end-to-end continuity of the CPC, since the line and neutral are confirmed by the later polarity test.',
      'The insulation resistance between the two legs of the ring, confirming the ring is electrically separated from earth.',
      'The earth fault loop impedance at the midpoint socket, which must be half the value measured at the consumer unit.',
    ],
    correctAnswer: 0,
    explanation:
      'Ring final continuity has two parts. (1) End-to-end on each of L, N, CPC measured separately at the CU after disconnecting the ring at the CU end — confirms the ring is unbroken. (2) Cross-connect L1 to L2 and CPC1 to CPC2 at the CU, then measure R1 + R2 at every socket — should give roughly the same value at every point, confirming the ring is wired as a true ring (not as a long radial that has been bridged at the CU).',
  },
  {
    id: 5,
    question:
      'BS 7671 Reg 643.3.2.1 specifies that the IR test voltage for SELV / PELV / safety circuits should be:',
    options: [
      '500 V DC',
      '250 V DC',
      '50 V DC',
      '1000 V DC',
    ],
    correctAnswer: 1,
    explanation:
      '250 V DC is the test voltage for SELV / PELV and safety extra-low-voltage circuits. The lower voltage is used because the higher 500 V DC test could damage low-voltage equipment. 500 V DC is the standard for normal 230 V / 400 V LV circuits. 1000 V DC is for circuits over 500 V.',
  },
  {
    id: 6,
    question:
      'The polarity test (Reg 643.6) at every accessory verifies:',
    options: [
      'That the insulation resistance between line and neutral exceeds 1 MΩ at every accessory on the circuit.',
      'That the earth fault loop impedance at each accessory is within the Table 41.3 limit for the protective device.',
      'The line conductor is in the line terminal at every accessory, the neutral in the neutral terminal, the CPC at the earth terminal.',
      'That the CPC is continuous from the consumer unit to every accessory, giving the R2 value for the circuit.',
    ],
    correctAnswer: 2,
    explanation:
      'Polarity verifies the conductors are landed in the right terminals at every accessory and at the consumer unit. Reversed polarity at a switch leaves the lamp permanently live; reversed polarity at a socket means a live pin where the neutral should be. Polarity is verified by continuity from the consumer unit&rsquo;s line conductor to the line pin / line terminal at every accessory.',
  },
  {
    id: 7,
    question:
      'For a TT installation, an additional dead test is required:',
    options: [
      'A second insulation resistance test at 1000 V DC, because TT installs are more exposed to earth leakage.',
      'A prospective fault current measurement at every socket, because the TT earth path limits fault current.',
      'A polarity test at the earth electrode, to confirm the electrode is connected to the correct terminal.',
      'Earth electrode resistance (RA), per Reg 643.7.',
    ],
    correctAnswer: 3,
    explanation:
      'TT installs rely on a local earth electrode rather than the supply&rsquo;s earthing arrangement. Reg 643.7 requires the earth electrode resistance to be measured — typically with a dedicated earth electrode tester or by the loop method on a TT supply. The result is recorded on the Schedule of Test Results and used to verify ADS will operate within the required time.',
  },
  {
    id: 8,
    question:
      'You complete the dead-test sequence on a new domestic install. Continuity passes, ring final passes, IR is &gt;200 MΩ on every circuit, polarity is correct at every point. The next step is:',
    options: [
      'Energise the install in a controlled manner — main switch on, RCBOs on one at a time — then proceed to live testing (Ze, Zs, RCD operation, prospective fault current).',
      'Issue the EIC straight away — once the dead tests pass, live testing is optional and only needed on commercial installs.',
      'Repeat the full dead-test sequence a second time to confirm the readings before energising the installation.',
      'Energise every circuit at once by closing the main switch with all RCBOs already on, then leave the live tests for a later visit.',
    ],
    correctAnswer: 0,
    explanation:
      'A clean dead-test sequence is the gate to energisation. The install is brought up in a controlled way — main switch on first (with all RCBOs off), then RCBOs on one at a time, watching for any nuisance trip. Live testing then follows — Ze (loop impedance at origin), Zs at the furthest accessory of each circuit, RCD operation (trip times at I∆n and 5×I∆n), prospective fault current. Only when both dead and live testing are complete does the EIC get issued.',
  },
];

const faqs = [
  {
    question: 'Why does the test order matter so much?',
    answer:
      'Each test relies on previous tests having confirmed something. Continuity first proves the CPC is unbroken — without that, you do not have a known earth path for any subsequent test. Ring final continuity then confirms the ring is wired as a true ring. IR then pushes 500 V DC and measures insulation — meaningful only because you know the earth reference is good. Polarity verifies the conductors are landed correctly — you want this confirmed before energising, because reversed polarity at a switch leaves the lamp permanently live. Live tests (loop impedance, RCD operation, prospective fault current) come last, after the install is energised, because they require live current to measure. Reg 643.1 makes the order non-negotiable.',
  },
  {
    question: 'What instrument do I need for the dead-test sequence?',
    answer:
      'A modern multifunction tester (MFT) covers the lot — Megger MFT1741+, Fluke 1664FC, Metrel MI 3155 or similar. Continuity (low-resistance ohmmeter mode, typically 200 mA test current). Insulation resistance (250 V / 500 V / 1000 V DC selectable). Polarity (continuity mode). Loop impedance (live-test mode). RCD operation (live-test mode). Earth electrode (some MFTs include the 3-lead earth electrode test, others need a dedicated tester). Calibration must be in date — check the calibration sticker before you start. Leads must be checked — null the instrument with the leads shorted before reading any continuity.',
  },
  {
    question: 'What does "null the instrument" mean?',
    answer:
      'On the continuity (low-resistance ohmmeter) range, you short the test leads together and zero / null the reading — this subtracts the resistance of the leads themselves from your measurements. Without nulling, your continuity reading includes a few hundred milliohms of lead resistance, which throws off R1 + R2 calcs (especially on short circuits where the conductor resistance is small). Null at the start of every test session, and re-null if you change leads or add an extension lead.',
  },
  {
    question: 'How do I prove safe isolation before testing?',
    answer:
      'JIB safe isolation procedure — covered in M4 §3 Sub 7. (1) Identify the circuit / install to be isolated. (2) Switch off and lock off at the upstream device. (3) Prove your proving unit alive on a known live source (the proving unit is itself proven before you trust it). (4) Use the proven proving unit to verify the circuit is dead at the point of work — between L and N, L and CPC, N and CPC. (5) Re-prove the proving unit alive on the known live source to confirm it did not fail mid-test. (6) Lock-off tag in place, key in your pocket, work proceeds. The proving unit on the proving unit on the proving unit — that is the discipline. A multifunction tester is NOT a proving unit; never use it for safe isolation.',
  },
  {
    question:
      'What if a test fails — for example, IR comes back at 0.5 MΩ on a 230 V circuit?',
    answer:
      'Stop. Do not energise. Investigate. The minimum acceptable IR for a 230 V LV circuit is 1 MΩ (BS 7671 Table 64). Below that, there is a fault somewhere in the circuit — damaged cable, wet termination, accessory with a fault, equipment left connected with a low-IR component. Disconnect each element of the circuit one at a time and re-test to localise the fault. Could be as simple as a wet shower pull-cord that has been re-fitted to a damp ceiling. Could be a damaged cable nicked during second-fix. Either way, you fix the fault, re-test, confirm the result is &gt;1 MΩ before moving on. Recorded results on the Schedule of Test Results — both the failing reading and the post-repair reading.',
  },
  {
    question: 'Where does this prep + sequence Sub fit relative to Module 4 Section 6?',
    answer:
      'Section 6 (LO6 of Unit 204) is the actual hands-on dead testing — Sub by Sub, each individual test in detail (continuity, ring final, IR, polarity, functionality, recording). This Sub (5.3) is the bridge — it sits between the inspection Subs (5.1 and 5.2) and the testing Subs (Section 6) and lays out the prep, the order, and the principle. By the time you start Section 6 you should already know the order, why it matters, and what prep needs to be done. Section 6 then walks the actual instrument procedure for each test.',
  },
];

const testSequence = [
  {
    n: 1,
    test: 'Continuity of protective conductors (R1 + R2)',
    reg: '643.2.1',
    instrument: 'Low-resistance ohmmeter (MFT continuity range, ~200 mA)',
    purpose:
      'Verify the CPC is continuous from the CU earth bar to every accessory. Combined L + CPC reading (R1 + R2) is added to Ze to predict Zs.',
    notes:
      'Includes main bonding continuity and supplementary bonding (where present). Null the instrument leads first.',
  },
  {
    n: 2,
    test: 'Continuity of ring final circuit conductors (r1 + rn + r2)',
    reg: '643.2.2',
    instrument: 'Low-resistance ohmmeter',
    purpose:
      'Verify the ring is wired as a true ring (not as a long radial bridged at the CU). End-to-end on L, N and CPC, then cross-connection R1+R2 reading at every socket.',
    notes:
      'Only applicable to ring final circuits. Skipped on radials. The cross-connection check should give roughly the same R1+R2 reading at every socket on the ring.',
  },
  {
    n: 3,
    test: 'Insulation resistance (IR)',
    reg: '643.3',
    instrument: 'IR tester (MFT IR range — 250 / 500 / 1000 V DC)',
    purpose:
      'Verify the insulation between live conductors and between live conductors and earth is sound. Test pushes 500 V DC; result must be ≥ 1 MΩ for 230 V LV per Table 64.',
    notes:
      'Disconnect or short out electronic equipment that could be damaged. Use 250 V DC for SELV / PELV / safety circuits per Reg 643.3.2.1. Test L+N to CPC first, then L to N (or each L to each other on three-phase).',
  },
  {
    n: 4,
    test: 'Polarity',
    reg: '643.6',
    instrument: 'Continuity tester (MFT continuity range)',
    purpose:
      'Verify the line conductor is landed in the line terminal at every accessory, neutral in neutral, CPC at earth. Reversed polarity at a switch leaves the lamp permanently live.',
    notes:
      'Often combined with the continuity test using the long-lead method. Always verified at every accessory before energising.',
  },
  {
    n: 5,
    test: 'Earth electrode resistance (RA) — TT only',
    reg: '643.7',
    instrument: 'Earth electrode tester (3-lead method) or MFT loop test',
    purpose:
      'Verify the earth electrode resistance on a TT install is low enough that ADS will operate within the required time (Reg 411.5).',
    notes:
      'Only required on TT installs. N/A on TN-S and TN-C-S. Recorded on the Schedule of Test Results.',
  },
];

export default function Sub3() {
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
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 3"
            title="Dead testing — preparation and sequence"
            description="The BS 7671 Reg 643 dead-test sequence in order — continuity, ring final, insulation resistance, polarity, earth electrode — with the prep that makes it work."
            tone="emerald"
          />

          <TLDR
            points={[
              'Reg 643.1 fixes the dead-test order — continuity, ring final, insulation resistance, polarity, earth electrode (TT only). The order matters because each test relies on previous tests having confirmed something.',
              'Pre-test prep is non-negotiable — verified safe isolation per the JIB procedure, instrument calibration in date, leads checked and nulled, customer briefed, install ready.',
              'A clean dead-test sequence is the gate to energisation. Live testing (Ze, Zs, RCD operation, PFC) follows. Only when both dead and live testing are complete does the EIC get issued.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Supplementary content — extends LO5 + LO6 but is not directly mapped to a 204 AC. Designed to deepen apprentice understanding of inspection practice.',
              'List the BS 7671 Reg 643 dead-test sequence in order and explain why each test precedes the next.',
              'Carry out pre-test preparation — verified safe isolation, instrument calibration check, lead null, customer briefing.',
              'Identify the correct test voltage for insulation resistance (500 V DC for normal LV, 250 V DC for SELV / PELV per Reg 643.3.2.1).',
              'Distinguish dead tests (continuity, ring final, IR, polarity, RA on TT) from live tests (Ze, Zs, RCD operation, PFC).',
              'Recognise when a test result fails (e.g. IR &lt; 1 MΩ on a 230 V circuit) and the troubleshooting approach to localise the fault.',
              'Bridge the inspection (Sub 5.1 / 5.2) and testing (Section 6) stages with a clear understanding of the test sequence prep and rhythm.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="From inspection to testing — the bridge"
            plainEnglish="The Schedule of Inspections is signed (Sub 5.2). Every item is ✓ or LIM, no ✗. The install is verified by eye to conform to BS 7671. Now you start dead testing — but only after the prep is right. Verified safe isolation. Instruments calibrated. Leads nulled. Customer briefed. Then you start the sequence."
            onSite="Real testing on a real install runs in a rhythm. Inspection done. Pre-test prep takes ten minutes. Dead-test sequence on a 12-circuit domestic install takes 60–90 minutes. Live testing another 30. Recording on the Schedule of Test Results as you go. EIC issued same day."
          >
            <p>
              <strong>What changes between inspection and testing:</strong> The instrument
              comes out. You stop relying on eyes alone and start relying on calibrated
              measurements. The discipline shifts from &ldquo;does it look right?&rdquo; to
              &ldquo;does it measure within tolerance?&rdquo;
            </p>
            <p>
              <strong>What stays the same:</strong> The install is still dead. The
              JIB safe isolation procedure has been verified. The work is methodical, in
              order, recorded as you go.
            </p>
            <p>
              <strong>Where this Sub fits:</strong> Sub 5.1 and 5.2 covered the inspection.
              Section 6 covers each individual test in detail (continuity in Sub 6.1,
              ring final in Sub 6.2, IR in Sub 6.3, polarity in Sub 6.4, functional
              testing in Sub 6.5, recording in Sub 6.6). This Sub is the bridge — the
              prep and the order, before you start the individual tests.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.1 (Testing — General)"
            clause="The tests of Regulations 643.2 to 643.11, where relevant, shall be carried out and the results compared with relevant criteria. Measuring instruments and monitoring equipment and methods shall be chosen in accordance with the relevant parts of BS EN 61557. If other measuring equipment is used, it shall provide no lesser degree of performance and safety. The tests of Regulations 643.2 to 643.6, where relevant, shall be carried out in that order before the installation is energized. Where the installation incorporates an earth electrode, the test of Regulation 643.7 shall also be made."
            meaning={
              <>
                Reg 643.1 is the regulation that fixes the dead-test order. Tests in
                Regs 643.2 to 643.6 are done before energisation, in the order written —
                that is the dead-test sequence. Reg 643.7 (earth electrode) is added
                where applicable. Live tests come after. Instruments must be BS EN 61557
                compliant — that is what your modern MFT carries certification for.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.1."
          />

          <SectionRule />

          <ContentEyebrow>Pre-test preparation — the ten minutes that make testing safe</ContentEyebrow>

          <ConceptBlock
            title="What &lsquo;ready to test&rsquo; actually means"
            plainEnglish="Before any test lead touches the install, six things must be true. Skip any of them and you are testing in the dark — at best the results are meaningless, at worst you create a hazard."
            onSite="On site you do this in the same order every time. Five minutes of prep at the start saves an hour of confused troubleshooting later. Make it a habit."
          >
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/80 text-[13.5px]">
              <li>
                <strong>Inspection complete and signed.</strong> Schedule of Inspections
                walked, ✓ throughout, honest LIMs, zero ✗. If the inspection was not
                clean, fix the ✗ items first — testing a non-compliant install wastes
                time.
              </li>
              <li>
                <strong>Safe isolation verified — JIB procedure.</strong> Switched off
                and locked off at the upstream device. Proving unit proved alive on a
                known live source. Install proved dead at the point of work. Proving
                unit re-proved alive. Lock-off tag in place, key in your pocket. The
                proving unit is the only thing that can declare the install dead — your
                multifunction tester does NOT do this job.
              </li>
              <li>
                <strong>Instrument calibration in date.</strong> Check the calibration
                sticker on the MFT. Most instruments are on a 12-month cycle. Out of
                calibration = results not accepted on the EIC and a callback if the
                test pack is audited.
              </li>
              <li>
                <strong>Leads checked and nulled.</strong> Visually inspect leads for
                damage (cracked insulation, exposed conductor, broken probe tips). On
                the continuity range, short the leads together and null / zero the
                instrument so lead resistance is subtracted from your readings.
              </li>
              <li>
                <strong>Customer briefed.</strong> If the customer is on site, brief
                them — &ldquo;the install will be off for the next two hours while we
                test, no power to the kettle until we&rsquo;re done&rdquo;. Lifts off,
                fish tanks have battery backup connected if applicable, freezers warned
                about. Manage expectations.
              </li>
              <li>
                <strong>Equipment connected to circuits considered.</strong> Anything
                that could be damaged by 500 V DC IR test? Computers, modems, smart
                lighting controllers, low-voltage transformers, dimmers, appliances
                with electronic boards. Disconnect or short out per manufacturer&rsquo;s
                guidance. Reg 643.3 specifically allows for this — equipment that could
                be damaged is disconnected, then a 250 V DC test is repeated on
                reconnection.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The dead-test sequence — Reg 643.2 to 643.7</ContentEyebrow>

          <ConceptBlock
            title="The five tests in order"
            plainEnglish="Continuity → ring final → insulation resistance → polarity → earth electrode (TT only). Each test relies on the previous one having confirmed something. Skipping or re-ordering breaks the logic and produces meaningless results."
            onSite="Walk the same sequence on every install. Continuity first at the CU. Ring final continuity if the install has rings. IR with the test voltage selector at 500 V DC and the install isolated. Polarity at every accessory. Earth electrode test if it&rsquo;s TT. Record each value on the Schedule of Test Results as you go — do not write them up later from memory."
          >
            <div className="space-y-3">
              {testSequence.map((t) => (
                <div
                  key={t.n}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <div className="flex items-baseline gap-2.5 border-b border-white/[0.08] pb-2 mb-2.5">
                    <span className="text-elec-yellow font-bold text-[14px] tracking-wider">
                      {t.n}.
                    </span>
                    <span className="text-white text-[14px] font-semibold flex-1">
                      {t.test}
                    </span>
                    <span className="text-[10.5px] uppercase tracking-wider text-white/55 font-medium">
                      Reg {t.reg}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[12.5px]">
                    <div className="flex gap-2">
                      <span className="text-white/55 min-w-[80px]">Instrument</span>
                      <span className="text-white/85">{t.instrument}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-white/55 min-w-[80px]">Purpose</span>
                      <span className="text-white/85 leading-relaxed">{t.purpose}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-white/55 min-w-[80px]">Notes</span>
                      <span className="text-white/85 leading-relaxed">{t.notes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.2.1 (Continuity of protective conductors)"
            clause="The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of: (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors."
            meaning={
              <>
                Reg 643.2.1 is the continuity test mandate. The CPC at every accessory and
                every bonding connection has to be verified continuous by measurement —
                not just by visual inspection. The R1 + R2 method is the standard
                technique on radials; on ring finals, the live conductors are also
                tested per Reg 643.2.2 (ring final continuity).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.2.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.3 (Insulation resistance) (paraphrased)"
            clause="643.3 has been redrafted in A4:2026. The requirements for testing insulation resistance where equipment is likely to influence the verification test or be damaged has been clarified, and reference is made to a 250 V DC test following the connection of equipment. The test voltage and minimum acceptable insulation resistance values are tabulated in Table 64."
            meaning={
              <>
                Reg 643.3 sets the IR test voltage and minimum acceptable values. For
                normal 230 V / 400 V LV the test is at 500 V DC and the minimum IR is
                1 MΩ. For SELV / PELV / safety circuits the test is at 250 V DC. Where
                equipment could be damaged by the 500 V DC test, the equipment is
                disconnected for the main test, then reconnected and a 250 V DC test
                applied per the A4:2026 clarification. Modern MFTs select the test
                voltage on the front panel.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.3 — paraphrased."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Why the order matters — the dependency chain</ContentEyebrow>

          <ConceptBlock
            title="Each test sets up the next"
            plainEnglish="The order in Reg 643.1 is not arbitrary. Continuity confirms an earth path before IR pushes 500 V DC into the circuit. Ring final continuity confirms the ring before R1+R2 readings are interpreted. IR confirms insulation before polarity testing pushes test current through the circuit. Polarity confirms correct conductor identification before energising. Each test enables the next."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity → IR.</strong> If the CPC is broken, IR pushes 500 V DC
                between L and CPC and the test current finds an unintended path (through
                another circuit, through wet plaster, through the customer if you are
                very unlucky). The IR result is meaningless and potentially hazardous.
                Continuity first establishes the reference.
              </li>
              <li>
                <strong>Ring final continuity → IR / polarity.</strong> If the ring is
                actually wired as two long radials bridged at the CU, you cannot interpret
                R1+R2 readings or polarity at the &ldquo;far&rdquo; sockets correctly.
                Ring final continuity confirms the topology before the rest of the tests.
              </li>
              <li>
                <strong>IR → polarity.</strong> If insulation is poor, the test current
                from polarity testing finds unintended paths and the polarity reading
                may be ambiguous (continuity through a low-IR fault rather than through
                the intended L conductor).
              </li>
              <li>
                <strong>Polarity → energisation.</strong> If polarity is reversed at any
                accessory, energising the install means a switch leaves the lamp
                permanently live, or a socket has live on the wrong pin. Polarity is
                confirmed before energisation.
              </li>
              <li>
                <strong>Earth electrode → live tests (TT only).</strong> On TT, the earth
                electrode resistance has to be known before live loop impedance tests
                can be interpreted, because the loop runs through the electrode.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Continuity test methods — R1+R2 versus long-lead R2</ContentEyebrow>

          <ConceptBlock
            title="Two ways to verify CPC continuity — R1+R2 and long-lead"
            plainEnglish="There are two standard methods for verifying CPC continuity at every accessory. R1+R2 method links L and CPC at the far end; you measure the loop at the CU. Long-lead method uses a long single test lead from the CU to each accessory; you measure CPC from CU to accessory direct."
            onSite="Most apprentices learn R1+R2 first because it gives the value used to predict Zs. Long-lead is faster on multi-accessory circuits where you only need to confirm continuity (not predict Zs). Both are valid; modern MFTs handle both."
          >
            <p>
              <strong>R1+R2 method:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70 text-[13.5px]">
              <li>At the far end of the circuit, link line conductor to CPC.</li>
              <li>At the consumer unit, with the circuit isolated, measure resistance from line to CPC at the way / RCBO output.</li>
              <li>Record the value as R1+R2 for that circuit.</li>
              <li>Compare to the design predicted value. Add to Ze to predict Zs.</li>
              <li>Remove the link at the far end.</li>
            </ol>
            <p>
              <strong>Long-lead method:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70 text-[13.5px]">
              <li>Connect one MFT lead to the CPC at the consumer unit (typically the earth bar).</li>
              <li>Take the other lead (extension lead added if needed) to the first accessory and touch it to the CPC there.</li>
              <li>Read the resistance — that is R2 from CU to that accessory.</li>
              <li>Move to the next accessory and repeat.</li>
              <li>Null the leads first; account for the long lead resistance in the recorded value.</li>
            </ol>
            <p>
              <strong>Polarity overlap:</strong> The long-lead method is also used during
              polarity verification — the lead at the CU is on the line conductor at the
              CU, and you touch the line terminal at every accessory. Reading should be
              consistent (the line conductor R1 from CU to that accessory), confirming
              line is in the line terminal.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Ring final continuity — the cross-connection method in detail</ContentEyebrow>

          <ConceptBlock
            title="Why ring finals get the extra continuity test"
            plainEnglish="A ring final has two conductor paths from CU to every socket. If both paths are intact, the ring is a true ring. If one path is broken (a missed termination at one socket, a damaged cable somewhere), the ring is now effectively a long radial — current still flows, sockets still work, but the two-path benefit is lost and the cable can be overloaded under fault. The cross-connection test catches this."
            onSite="A common ring final defect is the &lsquo;bridged radial&rsquo; — installer thinks they wired a ring but actually wired two long radials with a bridge link in the CU. Cross-connection test is what catches it. Run it on every ring final at first installation."
          >
            <p>
              <strong>Step-by-step:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70 text-[13.5px]">
              <li>
                Disconnect both ends of L, both ends of N, both ends of CPC at the CU
                (so you have six free conductor ends).
              </li>
              <li>
                Identify the &ldquo;outgoing&rdquo; and &ldquo;returning&rdquo; ends of
                each conductor — typically by measuring end-to-end loop resistance.
                Should give a sensible value matching the cable run length.
              </li>
              <li>
                <strong>End-to-end test (r1, rn, r2):</strong> Measure each conductor
                end-to-end. r1 (line), rn (neutral), r2 (CPC). All three should be
                approximately equal (within ~5 %) on a homogeneous ring.
              </li>
              <li>
                <strong>Cross-connect:</strong> At the CU, link L1 to L2 (line
                cross-connection) and CPC1 to CPC2 (CPC cross-connection). Now line and
                CPC form a single loop through the ring.
              </li>
              <li>
                <strong>Walk the ring:</strong> At each socket on the ring, plug in the
                long lead and measure R1+R2 between L and CPC at that socket. Record
                the value at each socket. All readings should be approximately equal,
                because each socket is at the &ldquo;mid-loop&rdquo; point of the
                cross-connected ring.
              </li>
              <li>
                <strong>Spot the radial:</strong> If readings vary significantly along
                the ring (low at one end, high at the other, or one reading way off
                from the others), the ring is not a true ring. Investigate.
              </li>
              <li>Remove cross-connection links. Reconnect L, N, CPC to the original ways at the CU.</li>
            </ol>
            <p>
              <strong>Why this works:</strong> On a true ring with cross-connection, every
              socket sees the same loop resistance because the loop length from L1 → socket
              → CPC2 is matched by the loop length from L2 → socket → CPC1. Vary one and
              the matching changes — the readings give you the topology of the ring.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Insulation resistance — handling sensitive equipment</ContentEyebrow>

          <ConceptBlock
            title="The 500 V DC test versus modern electronic equipment"
            plainEnglish="Most modern electrical equipment contains electronics that can be damaged by the 500 V DC IR test. Computers, modems, smart lighting controllers, dimmers, low-voltage transformers, appliances with electronic boards. The standard practice is to disconnect or short out sensitive equipment for the main IR test, then carry out a confirmatory test at 250 V DC after reconnection."
            onSite="Walk the install before you start IR testing. Anything plugged in that has a circuit board? Unplug it. Anything hard-wired with electronics? Disconnect at the FCU or bridge live and neutral as the manufacturer&rsquo;s instructions allow. After main IR is complete and good, reconnect, then 250 V DC test for the confirmation that the install with equipment connected is still acceptable."
          >
            <p>
              <strong>Equipment to disconnect or short before 500 V DC IR test:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Computers, monitors, printers, network hardware.</li>
              <li>Smart lighting controllers, dimmer switches, electronic transformers for low-voltage downlights.</li>
              <li>Modems, routers, smart hubs.</li>
              <li>Appliances with electronic boards — modern fridges, washing machines, dishwashers, ovens, hobs.</li>
              <li>SPD modules — disconnect SPD before 500 V DC test (the SPD will trip during the test and may give a false low IR reading, or be damaged).</li>
              <li>RCBO and RCD trip electronics (test on the line side of the device, or follow manufacturer&rsquo;s instructions for in-situ testing).</li>
            </ul>
            <p>
              <strong>Reg 643.3 A4:2026 clarification:</strong> The amendment specifically
              calls for a 250 V DC test following the connection of equipment. So the
              sequence is: disconnect sensitive equipment → 500 V DC IR test on the wiring
              alone → reconnect equipment → 250 V DC IR test on the wiring with equipment
              connected. Both results recorded.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recording test results — direct from instrument</ContentEyebrow>

          <ConceptBlock
            title="Recording practices — instrument download beats handwritten transcription"
            plainEnglish="Modern multifunction testers store readings in memory with circuit identifiers. The discipline is to record each value as you take it, with the circuit identifier set on the instrument, then download to PDF or transcribe directly from the instrument at the end. Never write up a test pack from memory after the day is over."
            onSite="The most common test-recording defect is values written on the back of a hand or a fag packet, then transcribed onto the Schedule of Test Results from memory hours later. Numbers get swapped, transcription errors creep in, the supervisor reviewing the pack catches the inconsistency, and you re-test. Record from the instrument. Always."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Set the circuit identifier on the MFT</strong> before each test.
                Most modern MFTs let you save the reading against a circuit number.
              </li>
              <li>
                <strong>Take the reading and save it.</strong> Confirm the value before
                moving on.
              </li>
              <li>
                <strong>At end of test session</strong>, download the instrument memory
                to PDF or to the Schedule of Test Results software. Most MFT manufacturers
                have a companion app for this.
              </li>
              <li>
                <strong>Review the downloaded values</strong> against the design
                predictions. Anything anomalous gets investigated and re-tested before
                the EIC is issued.
              </li>
              <li>
                <strong>Schedule of Test Results signed and dated</strong> by the
                competent person who carried out the testing.
              </li>
            </ul>
            <p>
              The Schedule of Test Results is the test-stage equivalent of the Schedule
              of Inspections — both attach to the EIC, both prove what was done, both
              are signed by the competent person.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Testing IR before continuity — the most common test-order mistake"
            whatHappens={
              <>
                You finish the inspection. The install looks great. You grab the MFT,
                set it to IR mode, push 500 V DC between L+N and CPC. You get a reading
                of around 12 MΩ — passes Table 64, you record it as a clear pass and
                move on. Later, when you do continuity, R1+R2 on circuit 4 comes back
                open — the CPC is broken at a junction box in the loft. Your IR reading
                of 12 MΩ was not a measurement of the insulation between live and earth
                — it was a measurement of leakage current finding an unintended path
                through another circuit&rsquo;s CPC. The actual insulation could be far
                worse than 12 MΩ; you have no way of knowing.
              </>
            }
            doInstead={
              <>
                Continuity first. Always. Reg 643.1 fixes the order for a reason — every
                later test needs a known earth reference, which only continuity establishes.
                Get into the habit on every job: low-resistance ohmmeter range, lead null,
                R1+R2 at every circuit, recorded on the Schedule of Test Results, every
                CPC verified continuous, <strong>then</strong> switch the MFT to IR and
                start the insulation testing. The order is not optional and it is not
                a preference — it is a regulation.
              </>
            }
          />

          <Scenario
            title="Brand new domestic CU + 8 circuits — full dead test sequence walkthrough"
            situation={
              <>
                Three-bed semi, new CU, eight circuits — three lighting (upstairs /
                downstairs / external), three socket rings (upstairs / downstairs /
                kitchen), one cooker radial, one shower radial. TN-C-S supply. Inspection
                complete and signed. Customer is at work, lock-off in place, MFT
                calibrated and nulled. Time to start the dead-test sequence.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 — Continuity (R1 + R2) at the CU.</strong> Disconnect the
                main earth from the MET (carefully, recording the original Ze for live
                test later). At the far end of each circuit, link L to CPC. At the CU,
                measure the loop with the LR ohmmeter. Record R1+R2 per circuit. Lighting
                ~0.5 Ω, sockets ~0.7 Ω, cooker ~0.4 Ω, shower ~0.3 Ω. Reconnect at MET.<br /><br />
                <strong>Step 2 — Ring final continuity.</strong> For each ring (3 of
                them): disconnect both ends of L, N, CPC at the CU. End-to-end on each:
                L1 to L2, N1 to N2, CPC1 to CPC2. Each should give a sensible loop value.
                Cross-connect L1 to L2 and CPC1 to CPC2. Walk to every socket, plug in
                the long lead, read R1+R2 — should be roughly the same at every socket
                on the ring. Record values.<br /><br />
                <strong>Step 3 — Insulation resistance.</strong> Switch MFT to IR mode,
                500 V DC selected. Disconnect anything sensitive. Test L+N to CPC on
                each circuit — should be &gt;200 MΩ on a brand new install (minimum 1 MΩ
                per Table 64). Then L to N on each circuit — same. Record values per
                circuit.<br /><br />
                <strong>Step 4 — Polarity.</strong> Continuity from CU line conductor
                to line pin / line terminal at every accessory. Verify L on L, N on N,
                CPC on E. Mark Schedule of Test Results &ldquo;polarity confirmed&rdquo;
                per circuit.<br /><br />
                <strong>Step 5 — Earth electrode.</strong> N/A — this is TN-C-S, no
                electrode required.<br /><br />
                Dead testing complete. Hand the Schedule of Test Results to the supervisor
                for review. Energise in controlled manner. Live testing follows.
              </>
            }
            whyItMatters={
              <>
                A clean dead-test sequence takes 60–90 minutes on an 8-circuit domestic
                install once you are practised. The discipline of running the same order
                every time, recording each value as you go, and never skipping a test —
                that is what builds you into a competent engineer. Apprentices who try
                to remember readings to write up at the end always lose values. Record
                as you go.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Reg 643.1 fixes the dead-test order — continuity, ring final, insulation resistance, polarity, earth electrode (TT only). Order is not optional.',
              'Pre-test prep — verified safe isolation per the JIB procedure, instrument calibration in date, leads checked and nulled, customer briefed, sensitive equipment disconnected.',
              'Safe isolation is proved by a proving unit, not by a multifunction tester. The proving unit is itself proven before and after the isolation check.',
              'Continuity (R1 + R2) precedes IR because IR needs a known earth reference. Without verified continuity the IR result is meaningless.',
              'IR test voltage — 500 V DC for normal 230 V / 400 V LV per Reg 643.3, 250 V DC for SELV / PELV / safety circuits per Reg 643.3.2.1. Minimum IR per Table 64 — 1 MΩ for LV.',
              'Polarity verified at every accessory before energisation. Reversed polarity at a switch leaves the lamp permanently live — a shock risk during lamp changes.',
              'Earth electrode resistance (Reg 643.7) tested on TT installs only. N/A on TN-S and TN-C-S.',
              'A clean dead-test sequence is the gate to energisation and live testing. Section 6 covers each individual test in detail.',
            ]}
          />

          <Quiz
            title="Dead testing — preparation and sequence — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section5/5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.2 Schedule of Inspections walkthrough
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section5/5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.4 Common non-conformances
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
