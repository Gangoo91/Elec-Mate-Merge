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

const quizQuestions = [
  {
    id: 1,
    question:
      'You have completed the dead-side tests on a final circuit including a Method 1 R1+R2. The reading is recorded. What is the single most important physical step that must happen before any breaker is closed?',
    options: [
      'Photograph the schedule of test results',
      'Remove the temporary L–CPC link at the distribution board. Closing a breaker with that link still in place is a direct line-to-earth short — best case, an instantaneous magnetic trip; worst case, weld-on contacts and an arc-flash incident',
      'Reset the multifunction tester',
      'Sign the certificate',
    ],
    correctAnswer: 1,
    explanation:
      'Leaving the L–CPC link in place is the most common pre-energisation failure. The procedural mitigation is to write link removal into the test sheet as a discrete tick-box step, and to use a brightly coloured / labelled flying lead. GN3 makes the same point: link removal is part of the test, not an afterthought.',
  },
  {
    id: 2,
    question:
      'During an earth electrode test you disconnected the earthing conductor. The test is done and you are about to re-energise the installation. What does BS 7671 require here, and why?',
    options: [
      'Re-energise first; reconnection can wait until the schedule is signed',
      'Reconnect the earthing conductor BEFORE the supply is energised. Re-energising with the earthing conductor disconnected leaves exposed-conductive-parts unreferenced to earth — fault protection is gone and any earth fault during that window puts touch voltage onto every metalwork that should be at earth potential',
      'Reconnect after the first RCD test',
      'Reconnect only if the test failed',
    ],
    correctAnswer: 1,
    explanation:
      'The procedural sequence in BS 7671 / GN3 for an earth-electrode test using an EFLI tester explicitly requires that the earthing conductor is reconnected BEFORE the supply is energised or re-energised. This is a safety-critical, non-negotiable step.',
  },
  {
    id: 3,
    question:
      'You are about to close the main switch for first energisation of a new consumer unit. The dead tests (continuity, insulation resistance, polarity at origin) all pass. The MCBs / RCBOs are all in the OFF position. What is the right sequence?',
    options: [
      'Close every breaker, then close the main switch',
      'Close the main switch with all outgoing breakers OFF first. Verify supply polarity at the origin with a voltage indicator. Then energise outgoing ways one at a time, watching for any obvious anomaly (smell, noise, breaker not holding) before progressing to the next. This bounds the worst-case fault to one circuit',
      'Close the main switch and the largest breaker first',
      'Close all breakers before doing the polarity test',
    ],
    correctAnswer: 1,
    explanation:
      'Closing all outgoing breakers before the main switch means a fault on any circuit will be a fault at the main switch close — you cannot tell which circuit it was without re-isolating and starting again. The energise-and-monitor approach (main switch, then one breaker at a time) localises any fault to the circuit being closed and makes diagnosis straightforward.',
  },
  {
    id: 4,
    question:
      'You close an MCB and it trips immediately. The customer says "it does that sometimes, just press it again". What does Reg 643 expect of you, and what do you do?',
    options: [
      'Reset it twice — if it trips a third time, replace it',
      'Investigate before any further attempt to reset. Reg 643 makes verification of fault-protection effectiveness a positive duty, not a trial-and-error step. Repeated resets convert the MCB itself into the fault-protection trial: a magnetic trip can leave fused contacts that fail to open at the next overcurrent. The right move is to re-isolate, investigate the cause, fix it, and only then re-close',
      'Replace the MCB with a higher-rated one',
      'Hold it on by hand',
    ],
    correctAnswer: 1,
    explanation:
      'A breaker tripping on first close is data — the protective device telling you a fault exists. Reg 643.7 requires verification of the effectiveness of fault protection by testing, not by repeatedly closing the device until it stops tripping. Repeated resets stress the device and can mask a developing failure.',
  },
  {
    id: 5,
    question:
      'After re-energisation, you measure Zs at the furthest point of a final circuit and compare to the calculated Zs from the dead test. The measured value is 0.18 Ω higher than calculated. What is the likely cause and is the circuit still compliant?',
    options: [
      'It must be a faulty meter',
      'A 0.18 Ω difference is well within typical instrument tolerance and operating-temperature variation. The cable is hotter when the circuit is live than when it was dead-tested, and conductor resistance rises with temperature (~0.4 %/°C). Compare the live-measured Zs against the maximum permitted Zs for the protective device from BS 7671 Table 41 / the A4 max-permitted-Zs column — if it is below the limit, the circuit is compliant',
      'The CPC is broken',
      'The circuit needs re-designing',
    ],
    correctAnswer: 1,
    explanation:
      'Live Zs verification compares against the Table 41 / A4 limit at operating temperature, not against the dead R1+R2 calculation directly. A modest rise in measured Zs versus calculated is expected and normal, and the compliance check is against the Zs limit, not against the calculated Zs.',
  },
  {
    id: 6,
    question:
      'During the post-energisation RCD test, the 30 mA RCD trips at 23 mA on the IΔn test (within tolerance) but does not trip at IΔn × 5. What does this tell you?',
    options: [
      'Both numbers look low; replace the RCD',
      'The IΔn test is the regulatory effectiveness test (Reg 643.7.3 / 643.8) and tripping below IΔn is acceptable, but the RCD must trip within 40 ms at IΔn × 5 for additional protection per BS EN 61008 / 61009. Failing the IΔn × 5 test means the device is not providing the fast disconnection required for additional protection (Reg 415.1) and shall be replaced',
      'The RCD is OK because it tripped on IΔn',
      'Re-test from a different socket',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.7.3 (RCD effectiveness for fault protection) and Reg 643.8 (additional protection) both feed into the post-energisation RCD test. An RCD that trips at IΔn but fails the IΔn × 5 fast-trip test is no longer providing additional protection within the 40 ms requirement and must be replaced.',
  },
  {
    id: 7,
    question:
      'On a domestic re-energisation, you close the main switch and the building remains dark — but you can hear a relay buzzing in the consumer unit. What is the correct response?',
    options: [
      'Close more breakers until something happens',
      'Re-isolate immediately. A buzzing relay or contactor on first close is a classic symptom of a tripped device chattering against an attempted reset, of an under-voltage release operating because the supply polarity is wrong, or of the RCBO holding coil seeing a mis-wired neutral. Do not investigate live — open the main switch, lock-off, and diagnose dead',
      'Open the consumer unit cover and look',
      'Phone the manufacturer',
    ],
    correctAnswer: 1,
    explanation:
      'Anything unexpected at first energisation — buzzing, smoke, smell, light not coming on when expected — is a stop signal. Investigation happens dead. Reg 644.1.1 makes this explicit: any defect or omission revealed during inspection and testing shall be corrected before the certificate is issued, and that correction is done with the installation isolated.',
  },
  {
    id: 8,
    question:
      'You have re-energised an addition to an existing installation. During the live tests you discover a defect on the existing wiring (not part of your work). What does Reg 644.1.2 require?',
    options: [
      'Ignore it — not in scope',
      'You must record any defects found in the existing installation, so far as is reasonably practicable, on the Electrical Installation Certificate or Minor Works Certificate. Defects in the existing installation that affect the safety of YOUR addition or alteration must be corrected before the certificate is issued',
      'Disconnect the entire installation',
      'Refuse to issue the certificate',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 644.1.2 distinguishes two duties: (a) defects affecting the safety of the new work — must be corrected before the certificate is issued; and (b) other defects in the existing installation — recorded on the certificate, so far as is reasonably practicable, so the duty holder is informed.',
  },
  {
    id: 9,
    question:
      'You complete re-energisation, all live tests pass, and you are handing over to the duty holder. What three live readings should you walk them through, and why?',
    options: [
      'Only the Zs reading at the origin',
      'Zs at the furthest point of each final circuit (proves the disconnection time will be met under fault), the RCD trip times at IΔn and IΔn × 5 (proves additional protection is effective), and confirmation of polarity under power. Together these are the live evidence that the dead-side calculations and design assumptions are correct in service',
      'Only the polarity check',
      'Only the IR resistance values',
    ],
    correctAnswer: 1,
    explanation:
      'The handover is when the duty holder takes ownership of the installation. The live readings — Zs, RCD trip times and polarity under power — are the post-energisation evidence that the design is correct. They form the live half of the verification record (Schedule of Test Results) alongside the dead-side readings.',
  },
  {
    id: 10,
    question:
      'On final certification of a new installation, your dead-side R1+R2 calculation gave Zs = 0.84 Ω at 70 °C, well within the 1.37 Ω limit. The live measured Zs at the furthest socket reads 1.42 Ω. What is the right action?',
    options: [
      'Record 1.42 and pass the circuit because the dead test passed',
      'The live reading is above the BS 7671 Table 41 / A4 maximum permitted Zs for this protective device. The disconnection time requirement is not met. Re-isolate, investigate the discrepancy (loose termination, parallel earth path that contributed to a low dead R1+R2, longer cable run than assumed, wrong protective device size), correct the underlying cause, and re-test. Recording a non-compliant Zs as a pass falsifies the certificate',
      'Adjust the calculation to match',
      'Use a different meter',
    ],
    correctAnswer: 1,
    explanation:
      'The live Zs measurement is the regulatory acceptance criterion for fault protection by ADS (Reg 643.7). A Zs above the table limit means the disconnection time will not be met and the circuit fails verification. The certificate cannot be issued for that circuit until the cause is found and corrected.',
  },
];

const inlineChecks = [
  {
    id: 'mod2-s6-link-removal',
    question:
      'Method 1 R1+R2 was used. The reading is logged. Your apprentice closes the main switch and starts to close MCB 1 — the dedicated 32 A B-curve circuit you tested. What is the single physical item that, if missed, converts this into an arc-flash event, and which check on the pre-energisation list catches it?',
    options: [
      'Polarity verification — item 7.',
      'The temporary L–CPC link at the board. With the link still in, closing the breaker is a direct line-to-earth short. Best case: instantaneous magnetic trip. Worst case: weld-on contacts, board-level event, arc-flash. The check is item 1 on the pre-energisation list — link removed, conductors restored. A high-visibility flying lead and a tick-box on the test sheet are the procedural defences.',
      'Torque-check on the terminations.',
      'Confirming the IR result.',
    ],
    correctIndex: 1,
    explanation:
      'Leaving the L–CPC link in is the most common pre-energisation failure on Method 1 jobs. Item 1 of the pre-energisation walk-around exists for exactly this reason. The combination of a high-visibility flying lead and a discrete tick-box on the test sheet is what makes the check actually happen at the moment when memory fails most often — end of the day, customer hovering.',
  },
  {
    id: 'mod2-s6-first-close-sequence',
    question:
      'You have a 12-way RCBO board, all dead tests pass. The customer is anxious to get the lights on. Which sequence bounds your worst-case fault, and why?',
    options: [
      'Close the main switch with all RCBOs already ON — quickest for the customer.',
      'Close all RCBOs first, then the main switch.',
      'Close the main switch with all outgoing RCBOs OFF; verify supply polarity at origin; pre-test each RCBO test button; close RCBOs one at a time with a two-second pause between each. A fault on any circuit is bounded to that circuit instead of becoming a board-level event.',
      'Close the main switch and the largest RCBO first.',
    ],
    correctIndex: 2,
    explanation:
      'Energise-and-monitor is the standard. Closing all OCPDs before the main switch turns any fault on any circuit into a fault at the main switch close — you cannot tell which circuit caused it without re-isolating and starting again. One at a time localises the fault and gives you the diagnostic narrative for free.',
  },
  {
    id: 'mod2-s6-rcd-fast-trip',
    question:
      'A 30 mA RCD trips at 22 mA on the IΔn test (within tolerance) and at 145 ms at IΔn × 5. The duty-holder asks if the device is OK. Which Reg framings apply, and what is the call?',
    options: [
      'Both readings are fine — the IΔn pass is what matters.',
      'The IΔn test is the effectiveness verification (Reg 643.7.3) and tripping below IΔn is acceptable. But Reg 643.8 / Reg 415.1 require an RCD providing additional protection to trip within 40 ms at IΔn × 5. 145 ms fails that limit — the device is no longer providing additional protection within the 40 ms requirement and shall be replaced.',
      'Both readings indicate a faulty RCD test instrument.',
      'Replace the device only if it fails the IΔn test.',
    ],
    correctIndex: 1,
    explanation:
      'The two RCD tests have two different purposes and two different acceptance criteria. IΔn (Reg 643.7.3) verifies effectiveness for fault protection. IΔn × 5 (Reg 643.8 / 415.1) verifies additional protection within 40 ms. A device that passes one and fails the other is not fit for its installed purpose if it claims to provide additional protection — replace.',
  },
  {
    id: 'mod2-s6-defect-on-existing',
    question:
      'You re-energise an addition to an existing installation. During the live tests you find a defect in the existing wiring that does NOT affect the safety of your new work. The customer asks for the certificate. What does Reg 644.1.2 require?',
    options: [
      'Refuse to issue the certificate until the existing defect is corrected.',
      'Issue the certificate without mentioning the existing defect — it is out of scope.',
      'Record the defect on the Electrical Installation Certificate (or Minor Works Certificate) so far as is reasonably practicable, then issue. Defects in the existing installation that affect the safety of the new work would have to be corrected before the certificate; defects that do not affect the new work are recorded but do not block the certificate. The recording is the duty of care to the next inspector and the duty holder.',
      'Disconnect the existing installation entirely.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 644.1.2 distinguishes the two duties cleanly: defects affecting the safety of the new work — corrected before certificate; other defects in the existing installation — recorded on the certificate so far as is reasonably practicable. The recording is what passes the issue forward; refusing the certificate because of an out-of-scope defect is over-reach.',
  },
];

const InspectionTestingModule2Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Re-energisation procedures | I&T Module 2.6 | Elec-Mate',
    description:
      'Final checks before re-closure, the energise-and-monitor first close, what to do if a breaker trips, live readings (Zs, RCD trip times, polarity under power), handover and recording.',
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
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6"
            title="Re-energisation procedures"
            description="The closing-out sequence: final dead checks, the careful first close, what happens if a breaker trips, the live readings that prove the design works under power, and the handover."
            tone="yellow"
          />

          <TLDR
            points={[
              "Before any breaker is closed: confirm the L–CPC link removed (if Method 1 was used), every conductor landed in its correct terminal, no foreign objects in the enclosure, terminations torque-checked to the manufacturer's value, earthing/bonding reconnected (Reg 643.2.1, Reg 526.1).",
              'First close is energise-and-monitor: main switch on with all outgoing ways OFF, polarity verified at the origin, then one outgoing way at a time. If something is wrong, the worst case is bounded to one circuit.',
              'If a breaker trips on first close: investigate, do not keep resetting. Repeated resets stress the device and can mask a magnetic-trip-with-fused-contacts failure. Re-isolate, find the cause dead, correct it, then re-close.',
              "After successful energisation: live Zs verification at each circuit's furthest point, RCD trip-time tests at IΔn and IΔn × 5, and polarity confirmation under power (Reg 643.7, Reg 643.8). These three are the live half of the verification record.",
              'On the dead-side: any earthing/bonding conductor disconnected for testing MUST be reconnected before the supply is energised. This is non-negotiable per BS 7671 / GN3 procedural sequence for earth-electrode testing.',
              'Defects found during testing: in new work, corrected before the certificate is issued (Reg 644.1.1). In additions/alterations, defects affecting the safety of the new work corrected before certificate; other defects in existing installation recorded on the certificate (Reg 644.1.2).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Carry out the final pre-energisation checks (link removal, termination, torque, foreign objects, earthing reconnection) and tick each off as a discrete step',
              'Apply the energise-and-monitor first-close sequence — main switch OFF outgoing ways, then one circuit at a time — and explain why this bounds fault risk',
              'Respond correctly to a breaker tripping on first close: investigate, not reset; isolate, diagnose dead, correct, re-test',
              'Carry out the post-energisation live tests in the right order — polarity at origin, Zs at the furthest point of each final circuit, RCD trip times — and apply the BS 7671 / A4 acceptance criteria',
              'Distinguish between the IΔn test (effectiveness for fault protection per Reg 643.7.3) and the IΔn × 5 test (additional protection per Reg 643.8 / 415.1) and act on a fail of either',
              'Hand over the energised installation to the duty holder with the live readings explained, and record correctly on the A4:2026 certificate forms per Reg 644',
            ]}
          />

          <ContentEyebrow>The pre-energisation checks</ContentEyebrow>

          <ConceptBlock
            title="Final dead-side walk-around — eight checks before any breaker moves"
            plainEnglish="Re-energisation is the moment all your dead-side work proves itself. The checks below are the last opportunity to catch anything that would convert a calm sequence into an incident. None of them takes long. Skipping any of them is what gets people hurt."
            onSite="Use a printed or on-screen checklist. Tick each step. Do not work from memory at the moment when memory is most likely to fail you — the end of a long job, with a customer hovering, wanting it on."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>L–CPC test link removed.</strong> If Method 1 was used for R1+R2, the
                temporary line-to-CPC link at the board MUST be physically removed and the
                conductors restored to their normal terminals. A high-visibility flying lead helps —
                but verifying its removal at the board is the actual control.
              </li>
              <li>
                <strong>All conductors landed in their correct terminals.</strong> Reg 526.1
                requires that all conductor connections, including connections to busbars, are
                correctly located in terminals and are tight and secure. Visually verify each
                outgoing way: line on line, neutral on neutral, CPC on the earth bar.
              </li>
              <li>
                <strong>No foreign objects in the enclosure.</strong> Cable offcuts, screwdriver
                tips, washers, sleeving offcuts. A loose conductor strand bridging two terminals is
                indistinguishable, in fault terms, from a designed short circuit. Sweep the
                enclosure with a torch and inspect.
              </li>
              <li>
                <strong>Terminations torque-checked.</strong> To the manufacturer&rsquo;s stated
                value using a calibrated torque screwdriver, where the manufacturer specifies one.
                Reg 526.1 and Section 543 expect tight and secure terminations; the temperature rise
                that a loose termination produces under load is the failure mode this prevents.
              </li>
              <li>
                <strong>Earthing and bonding reconnected.</strong> Any earthing conductor
                disconnected for an earth-electrode test, any bonding conductor temporarily lifted
                to break a parallel path during R1+R2, must be reconnected. Reg 643 and the GN3
                procedure for EFLI testing both require reconnection BEFORE re-energisation.
              </li>
              <li>
                <strong>Insulation resistance results reviewed.</strong> Confirm every circuit
                tested is above the Table 64 minimum (1.0 MΩ at 500 V DC for low-voltage circuits;
                0.5 MΩ at 250 V DC for SELV/PELV; 1.0 MΩ at 250 V DC post-equipment-connection per
                Reg 643.3.3). A circuit that scraped past 1.0 MΩ deserves a comment in the record,
                not just a tick.
              </li>
              <li>
                <strong>Polarity at origin verified.</strong> Reg 643.6 requires polarity at the
                supply origin to be verified before the installation is energised. On a single-phase
                supply this is checking that line is on line and neutral is on neutral at the
                cut-out. On three-phase, sequence as well.
              </li>
              <li>
                <strong>All outgoing ways OFF.</strong> Every MCB / RCBO / fuse-link in the outgoing
                position OFF / withdrawn. Main switch / linked main switch in the OFF position. The
                installation is ready to take supply at the origin without sending supply anywhere
                downstream.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 526.1"
            clause={
              <>
                Every electrical connection between conductors or between a conductor and other
                equipment shall provide durable electrical continuity and adequate mechanical
                strength and protection.
              </>
            }
            meaning="The pre-energisation termination check is the practical implementation of Reg 526.1 at the moment when getting it wrong has the highest cost. Tight, located in the correct terminal, and matched to the manufacturer's torque value — every connection, every time."
          />

          {/* Re-energisation flow diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Re-energisation flow — from final dead check to handover
            </h4>
            <svg
              viewBox="0 0 800 540"
              className="w-full h-auto"
              role="img"
              aria-label="Flow diagram of the re-energisation sequence: final dead checks, main switch on with outgoing ways off, polarity at origin, energise outgoing ways one at a time, monitor for trips, live Zs and RCD verification, handover and recording. A trip on first close diverts back to the investigate-dead loop."
            >
              {/* Step 1 */}
              <rect
                x="60"
                y="20"
                width="680"
                height="50"
                rx="10"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="42"
                textAnchor="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="12"
                fontWeight="bold"
              >
                1. Final dead-side checks
              </text>
              <text x="400" y="58" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                L–CPC link removed · terminations torque-checked · earthing/bonding reconnected · IR
                results reviewed · all OCPDs OFF
              </text>
              <line
                x1="400"
                y1="70"
                x2="400"
                y2="90"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="400,90 395,82 405,82" fill="rgba(255,255,255,0.4)" />

              {/* Step 2 */}
              <rect
                x="60"
                y="95"
                width="680"
                height="50"
                rx="10"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="117"
                textAnchor="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="12"
                fontWeight="bold"
              >
                2. Main switch ON · all outgoing ways still OFF
              </text>
              <text x="400" y="133" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                Verify supply polarity at origin (Reg 643.6) · door open · position aware · GS38
                voltage indicator in hand
              </text>
              <line
                x1="400"
                y1="145"
                x2="400"
                y2="165"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="400,165 395,157 405,157" fill="rgba(255,255,255,0.4)" />

              {/* Step 3 */}
              <rect
                x="60"
                y="170"
                width="680"
                height="50"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="192"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                3. Energise outgoing ways ONE AT A TIME
              </text>
              <text x="400" y="208" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Close one breaker · pause · listen · look · sniff · then the next
              </text>
              <line
                x1="400"
                y1="220"
                x2="400"
                y2="240"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="400,240 395,232 405,232" fill="rgba(255,255,255,0.4)" />

              {/* Branch — does it hold? */}
              <polygon
                points="400,250 480,290 400,330 320,290"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="285"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Does the
              </text>
              <text
                x="400"
                y="300"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                breaker hold?
              </text>

              {/* Yes path */}
              <line x1="480" y1="290" x2="640" y2="290" stroke="#22C55E" strokeWidth="1.5" />
              <polygon points="640,290 632,285 632,295" fill="#22C55E" />
              <text
                x="560"
                y="282"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                YES
              </text>

              {/* No path — back to investigate dead */}
              <line x1="320" y1="290" x2="160" y2="290" stroke="#EF4444" strokeWidth="1.5" />
              <polygon points="160,290 168,285 168,295" fill="#EF4444" />
              <text
                x="240"
                y="282"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                NO
              </text>

              {/* Investigate dead box */}
              <rect
                x="40"
                y="310"
                width="240"
                height="55"
                rx="10"
                fill="rgba(239,68,68,0.08)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="160"
                y="332"
                textAnchor="middle"
                fill="#F87171"
                fontSize="11"
                fontWeight="bold"
              >
                RE-ISOLATE · DIAGNOSE DEAD
              </text>
              <text x="160" y="348" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                do NOT keep resetting
              </text>
              <text x="160" y="361" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                correct → re-test → re-close
              </text>
              {/* loop back arrow */}
              <path
                d="M 160 310 Q 160 250 280 195"
                fill="none"
                stroke="#EF4444"
                strokeWidth="1.2"
                strokeDasharray="4,3"
              />
              <polygon points="280,195 285,203 273,200" fill="#EF4444" />

              {/* Step 4 */}
              <rect
                x="520"
                y="310"
                width="240"
                height="55"
                rx="10"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="640"
                y="332"
                textAnchor="middle"
                fill="#4ADE80"
                fontSize="11"
                fontWeight="bold"
              >
                4. Live verification tests
              </text>
              <text x="640" y="348" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                Zs at furthest point · RCD IΔn and ×5
              </text>
              <text x="640" y="361" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                polarity confirmed under power
              </text>
              <line
                x1="640"
                y1="365"
                x2="640"
                y2="395"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="640,395 635,387 645,387" fill="rgba(255,255,255,0.4)" />

              {/* Step 5 */}
              <rect
                x="520"
                y="400"
                width="240"
                height="55"
                rx="10"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="640"
                y="422"
                textAnchor="middle"
                fill="#4ADE80"
                fontSize="11"
                fontWeight="bold"
              >
                5. Compare to A4 limits
              </text>
              <text x="640" y="438" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                Zs ≤ Table 41 / A4 max-permitted
              </text>
              <text x="640" y="451" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                IΔn ≤ rated · ×5 trip ≤ 40 ms
              </text>
              <line
                x1="520"
                y1="427"
                x2="280"
                y2="427"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <polygon points="280,427 288,422 288,432" fill="rgba(255,255,255,0.4)" />

              {/* Step 6 */}
              <rect
                x="40"
                y="400"
                width="240"
                height="55"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="160"
                y="422"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                6. Handover + record
              </text>
              <text x="160" y="438" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                walk through Zs / RCD / polarity
              </text>
              <text x="160" y="451" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                EIC + Schedule of Test Results
              </text>

              {/* Footer caption */}
              <rect
                x="60"
                y="480"
                width="680"
                height="40"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="500" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10">
                The branch back to "investigate dead" exists for one reason: a breaker tripping is
                data, not noise.
              </text>
              <text
                x="400"
                y="514"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Resetting twice is gambling. Investigating once is verification.
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

          <ContentEyebrow>The first close — energise-and-monitor</ContentEyebrow>

          <ConceptBlock
            title="The right way to bring an installation up"
            plainEnglish="Closing the main switch with every outgoing breaker also closed means a fault on any circuit becomes a fault at the main switch. You cannot tell which circuit caused it without re-isolating and starting again. Closing the main switch with all outgoing ways OFF, then bringing them up one at a time, bounds the worst-case fault to one identified circuit."
            onSite="Door open. Position aware — stand to one side of the panel face, never directly in front of the main switch operating handle. PPE appropriate to the prospective fault current at the origin. Voltage indicator in hand. Test before, test after."
          >
            <p>The sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Confirm all outgoing OCPDs are OFF / withdrawn. Confirm RCDs / RCBOs are also in
                their OFF position (an RCD in ON with no load is fine; in OFF removes it from the
                circuit during the close).
              </li>
              <li>
                Stand to one side. Close the main switch in one decisive motion. Listen for any arc,
                smell for any insulation breakdown, look for any visible flash. If anything
                unexpected happens, open the main switch immediately.
              </li>
              <li>
                With main switch on and outgoing ways off, verify supply polarity at the origin
                using a GS38 voltage indicator. Reg 643.6 lists this as a pre-energisation test but
                it remains valid as a confirmatory check at first close.
              </li>
              <li>
                Pre-test the RCD (test button) before any load is on it. The test button verifies
                the trip mechanism mechanically and electronically. A failed test-button trip means
                the device is replaced before the circuit is energised.
              </li>
              <li>
                Close the first outgoing OCPD. Pause two seconds. Does it hold? Are there any
                obvious symptoms downstream — light not coming on when expected, smoke from a
                socket, the customer&rsquo;s alarmed face? If clear, move to the next.
              </li>
              <li>
                Close each outgoing OCPD in turn. RCBO / RCD-protected circuits last where
                practical, so the RCD&rsquo;s own load-side conditions are tested with the rest of
                the installation already up.
              </li>
              <li>
                If at any point a device trips, STOP. Do not reset. Re-isolate, follow the
                investigate-dead loop, correct, then re-close.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.6 (extract on polarity)"
            clause={
              <>
                Where relevant, the polarity of the supply at the origin of the installation shall
                be verified before the installation is energized. Where single-pole switching
                devices are not permitted in the neutral conductor, a test shall be made to verify
                that all such devices are connected in the line conductor(s) only.
              </>
            }
            meaning="Polarity at origin is a pre-energisation duty. Confirming it again at first close — when the supply is actually present and a voltage indicator can read it — is the practical close-out of the same regulation."
          />

          <CommonMistake
            title="Closing every breaker before the main switch"
            whatHappens="A loose neutral on circuit 4 produces an L–N short when the main switch is closed. The main switch, MCB 4, and an upstream device all see the fault at the same instant. Best case, MCB 4 trips and you know which circuit; in practice a board-level event is just as likely, and now you are isolating to investigate from a position of darkness with the customer asking what happened."
            doInstead="Main switch on with outgoing ways OFF. Then one outgoing way at a time. Faults are localised at the moment they happen, the rest of the installation stays up, and the diagnostic narrative is &lsquo;circuit 4 trips on close&rsquo; rather than &lsquo;something tripped, working out what&rsquo;."
          />

          <CommonMistake
            title="Repeated resets when a breaker trips on first close"
            whatHappens="The MCB trips. You reset it. It trips again. You reset harder, holding the toggle for a second. Inside the device, the magnetic trip element has operated and the contacts have started to weld. The fourth reset holds because the contacts are now physically fused. The MCB no longer provides overcurrent protection, but reads on as healthy. The next overcurrent event becomes a fire."
            doInstead="One trip is data. Re-isolate, lock-off, find the cause dead, correct it, then re-close. Reg 643.7 requires verification of the effectiveness of fault protection — that verification is a deliberate test, not a series of attempts to make the breaker stop tripping."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The post-energisation live tests</ContentEyebrow>

          <ConceptBlock
            title="Live Zs at the furthest point of each final circuit"
            plainEnglish="The dead-side R1+R2 plus measured Ze gives a calculated Zs. The live test measures Zs directly under operating conditions and is the regulatory acceptance criterion (Reg 643.7.3). Compare against the BS 7671 Table 41 limits with the A4:2026 maximum-permitted-Zs column applied where it is tighter."
            onSite="Use the Zs / loop function on a multifunction tester. The test injects a small fault current and measures the voltage drop. Take the reading at the furthest point of the circuit (the worst-case)."
          >
            <p>
              The acceptance criterion is the maximum permitted Zs from BS 7671 Table 41.3 (or the
              A4:2026 maximum-permitted-Zs column on the Schedule of Circuit Details where the
              design has set a tighter limit). For RCD-protected circuits where disconnection relies
              on the RCD rather than the OCPD, the additional acceptance criterion is IΔn × Zs ≤ 50
              V (the touch-voltage limit).
            </p>
            <p>
              Live measured Zs is normally close to the calculated Zs from the dead test, but expect
              a small difference: cable runs hotter when energised under load, conductor resistance
              has a positive temperature coefficient, and instrument tolerance adds its own scatter.
              A measured Zs that is wildly higher than calculated is a flag — loose termination,
              parallel earth path that contributed to a misleadingly low dead R1+R2, longer cable
              than assumed, wrong device size — and needs investigation, not acceptance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="RCD verification — IΔn for effectiveness, IΔn × 5 for additional protection"
            plainEnglish="There are two separate RCD tests, with two separate purposes. The IΔn test verifies the device trips at its rated residual operating current (effectiveness for fault protection — Reg 643.7.3). The IΔn × 5 test verifies the device trips within 40 ms (additional protection per Reg 415.1, verified per Reg 643.8). A device must pass both."
            onSite="Both tests are run from the load side using a multifunction tester. The IΔn test trips somewhere between 50 % and 100 % of IΔn for an RCD that complies with BS EN 61008/61009. The IΔn × 5 test trips in less than 40 ms. Record both."
          >
            <p>
              Reg 643.7.3 sets the effectiveness test for RCDs: an alternating-current test at the
              rated residual operating current (IΔn). The acceptance is that the device disconnects
              within the time required by Chapter 41. Reg 643.8 covers the additional protection
              verification — the same device tested at IΔn × 5, with disconnection within 40 ms the
              requirement for an RCD providing additional protection.
            </p>
            <p>
              Note that the A4:2026 amendment changed Reg 643.3 (and through it the RCD testing
              approach): regardless of RCD Type, an alternating-current test at IΔn is used to
              verify effectiveness, and Table 3A (the historical time/current performance criteria
              table in Appendix 3) has been deleted. The simpler test sequence — IΔn at AC for
              fault-protection effectiveness, IΔn × 5 at AC for additional protection — is what the
              A4 form expects on the Schedule of Test Results.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7.3 (RCD effectiveness)"
            clause={
              <>
                The effectiveness of automatic disconnection of supply by RCDs shall be verified
                using suitable test equipment according to BS EN 61557-6 (see Regulation 643.1) to
                confirm that the relevant requirements of Chapter 41 are met, taking into account
                the operating characteristic of the device. NOTE: Regardless of RCD Type,
                effectiveness is deemed to have been verified where an RCD disconnects within the
                relevant time at IΔn.
              </>
            }
            meaning="One AC test at IΔn, regardless of RCD Type. The A4 amendment simplified this. The Type B / Type F nuance moved from a separate test to a selection-and-erection consideration. Inspectors run one effectiveness test, record the trip time, and compare to the Chapter 41 disconnection-time requirement."
          />

          <ConceptBlock
            title="Polarity confirmed under power"
            plainEnglish="The pre-energisation polarity check verified the wiring under no voltage. The post-energisation check verifies polarity with the supply present — using a voltage indicator at sample socket-outlets, lampholders and accessories to confirm line is line, neutral is neutral, and earth is earth at every accessible point."
            onSite="At every socket: L–N voltage present; L–E voltage present; N–E voltage near zero. At lampholders (with supply present and switch on): outer contact at neutral potential for centre-contact-fed (E14/E27 BS EN 60238 lampholders are not required to be polarised, but every other lampholder type is)."
          >
            <p>
              Reg 643.6 requires the polarity test to verify that every fuse and single-pole control
              device is connected in the line conductor only, and that the wiring is correctly
              connected throughout the installation. Under power, the verification is quick — a
              voltage indicator at the right combinations of terminals confirms or denies in
              seconds. A wrong-polarity socket will read L–E as live and N–E as live, instead of L–E
              live and N–E near-zero.
            </p>
          </ConceptBlock>

          <Scenario
            title="A new consumer-unit replacement, single-phase, RCBO board"
            situation="You have replaced a 10-way TP+N split-load CU with a 12-way RCBO board. All dead tests pass. R1+R2 calculations give Zs values from 0.62 Ω to 1.12 Ω across the circuits, all within Table 41 limits. You are ready to re-energise."
            whatToDo={
              <>
                <span className="block">
                  1. Final dead checks (the eight items): link removed, terminations torqued,
                  earthing and bonding reconnected, no offcuts in the enclosure, IR results
                  documented, polarity at origin verified, all RCBOs OFF.
                </span>
                <span className="block">
                  2. Stand to one side. Close the linked main switch. Verify supply polarity at the
                  origin with a voltage indicator: L–N 230 V ±10 %, L–E 230 V ±10 %, N–E near 0 V.
                </span>
                <span className="block">
                  3. Pre-test each RCBO with the test button before energising the load. Any that
                  fails is replaced before the circuit is energised.
                </span>
                <span className="block">
                  4. Close RCBOs one at a time. Pause two seconds between each. Lighting circuits
                  first (lowest stored energy, least risk), then sockets, then high-current circuits
                  (cooker, shower, EV charger if present).
                </span>
                <span className="block">
                  5. Walk the installation. At each accessible socket: confirm polarity under power.
                  At each lampholder where the cap has been replaced: confirm the outer contact is
                  neutral. RCD trip-time tests at IΔn and IΔn × 5 at the furthest point of each RCBO
                  group.
                </span>
                <span className="block">
                  6. Live Zs at the furthest point of each final circuit. Compare to the A4
                  max-permitted-Zs column on the Schedule of Circuit Details. Flag any that have
                  crept up versus the calculated values.
                </span>
                <span className="block">
                  7. Hand over: walk the duty holder through the certificate, the Schedule of
                  Inspection, and the Schedule of Test Results. Highlight the live Zs and RCD
                  readings as the live evidence the design works.
                </span>
              </>
            }
            whyItMatters="The CU swap is the single most common piece of work where re-energisation goes wrong, because all the circuits are new at the board end, the testing volume is high, and the customer wants their lights on. The procedural discipline at the close-out is the difference between a clean job and a callback."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What if a breaker trips on first close?</ContentEyebrow>

          <ConceptBlock
            title="The investigate-dead loop"
            plainEnglish="A trip on first close is the protective device telling you a fault exists. The wrong response is to keep resetting. The right response is to re-isolate, lock-off, diagnose dead, correct the cause, and re-test. Each loop through this cycle is a deliberate verification — not a gamble against the device."
          >
            <p>The diagnostic order:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Re-isolate.</strong> Open the main switch or the relevant outgoing OCPD.
                Lock-off if you are about to leave the panel.
              </li>
              <li>
                <strong>What kind of trip?</strong> An MCB tripping on a B-curve at first close with
                no load present is most likely a magnetic trip on a short circuit. An RCD tripping
                is a residual-current event — likely L–E or N–E fault, or a borrowed neutral. An
                RCBO can be either; check the indicator.
              </li>
              <li>
                <strong>Visual.</strong> Open the enclosure. Look for the obvious — a wire shorted
                to the metal back, a screwdriver tip, a strand bridging terminals, a damaged cable
                from cable management.
              </li>
              <li>
                <strong>Insulation resistance test on the affected circuit.</strong> 500 V DC L–N,
                L–E, N–E with the equipment disconnected per Reg 643.3.3. Anything below 1.0 MΩ is
                the fault. A near-zero reading L–E is a short to earth and is your trip cause;
                investigate the cable run, check J-boxes and accessories.
              </li>
              <li>
                <strong>Continuity tests on suspect conductors.</strong> If IR is clean, continuity
                might reveal a swap (line landed on neutral terminal somewhere).
              </li>
              <li>
                <strong>Correct the cause.</strong> Replace damaged cable, re-make terminations,
                remove the swarf. Document what was found.
              </li>
              <li>
                <strong>Re-test.</strong> Repeat the relevant dead-side tests (continuity, IR,
                polarity) on the corrected circuit.
              </li>
              <li>
                <strong>Re-close.</strong> One outgoing way, monitor.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="&lsquo;The customer is impatient, just hold it on for a moment&rsquo;"
            whatHappens="A loose line conductor in a junction box is producing intermittent earth contact. The MCB trips on first close. You reset and hold the toggle. The third reset, you hold for two seconds; the contacts weld in the closed position, the magnetic trip element is no longer functional, and the breaker conducts the next overcurrent unimpeded. A small fire follows."
            doInstead="If a breaker trips, your job is to find out why. Reg 643.7 makes verification of fault-protection effectiveness a positive duty. Repeated resets are not verification — they are damage to the protective device. Customer patience is irrelevant to the regulation."
          />

          <CommonMistake
            title="Walking away after first close without the live tests"
            whatHappens="All breakers held. The lights are on. The customer is happy. You decide the live Zs and RCD trip tests can wait until next week. In the intervening week, a marginal joint heats up under load and degrades; on the next callback, the live Zs at the affected socket reads above the Table 41 limit. The certificate you signed last week is now incorrect."
            doInstead="Live tests are part of the same job as re-energisation. Reg 643.7 / 643.8 set them out as verification duties, not optional follow-ups. The Schedule of Test Results is incomplete without them. Run them at the moment of first energisation — when the installation is in its as-handed-over condition."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Handover and recording</ContentEyebrow>

          <ConceptBlock
            title="The duty-holder handover"
            plainEnglish="The handover is the moment ownership of the installation passes from you to the duty holder. The live readings are the evidence that the design is sound. Walk through them — Zs at the furthest point, RCD trip times, polarity confirmation under power. Show the certificate. Show the Schedule of Test Results."
            onSite="The handover is a verification step in itself. If the duty holder asks a question you cannot answer with the readings in front of you, that is a flag — go back, recheck, and answer the question with data."
          >
            <p>
              Reg 644.4 requires that the certificate, schedule(s) of inspection, and schedule(s) of
              circuit details and test results are issued to the person ordering the work. Reg 644.5
              requires the certificates are compiled and signed (or otherwise authenticated) by
              competent persons. Reg 644.4.202 permits electronic forms, provided their authenticity
              and integrity is verifiable.
            </p>
            <p>The walk-through should cover, at minimum:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Where the main isolation is and how it is operated (Reg 462.1.201 — main linked
                switch as near as practicable to the origin).
              </li>
              <li>
                Where the multi-supply warning notice is (if applicable) and what it means (Reg
                537.1.2).
              </li>
              <li>
                The Schedule of Circuit Details — which way feeds which circuit, the protective
                device rating and type, the maximum permitted Zs (especially where the A4
                max-permitted-Zs column has been used to set a tighter limit than Table 41 raw).
              </li>
              <li>
                The Schedule of Test Results — the dead readings (R1+R2, IR) and the live readings
                (Zs, RCD trip times, polarity). The live half is the as-handed-over evidence.
              </li>
              <li>
                Recommended interval to next periodic inspection (Reg 644.4 — record on the
                certificate).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 644.1.1 and 644.1.2"
            clause={
              <>
                For a new installation, any defect or omission revealed during the inspection and
                testing shall be corrected before the Certificate is issued. For an addition and/or
                alteration to an existing installation, any defect or omission that will affect the
                safety of the addition or alteration that is revealed during inspection and testing
                shall be corrected before the Certificate is issued. The person responsible for the
                new work, or a person authorized to act on their behalf, shall record on the
                Electrical Installation Certificate or the Minor Electrical Installation Works
                Certificate, any defects found, so far as is reasonably practicable, in the existing
                installation.
              </>
            }
            meaning="New work: defects corrected before the certificate. Additions/alterations: defects affecting the safety of the new work corrected before the certificate; other existing-installation defects recorded on the certificate. The recording duty is a duty of care to the next inspector and the duty holder."
          />

          <ConceptBlock
            title="Recording on the A4:2026 model forms"
            plainEnglish="The A4 amendment tightened several of the model forms — added a maximum-permitted-Zs column, restructured the Schedule of Test Results, expanded the inspection schedule to cover newer protective measures (AFDD, surge protection). Use the current model forms; do not back-fit older ones."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Schedule of Circuit Details:</strong> circuit identification, protective
                device, cable size and type, length, calculated R1+R2 and Zs, and the A4 maximum
                permitted Zs column. The max-permitted-Zs column is the design limit — record the
                tighter of the design value or the Table 41 limit.
              </li>
              <li>
                <strong>Schedule of Test Results:</strong> the measured dead-side and live-side
                readings — R1+R2, ring r1/r2/rn (where applicable), IR L–L / L–E, polarity, live
                measured Zs, RCD IΔn trip time, RCD IΔn × 5 trip time. Two decimal places for
                resistance, milliseconds for trip times.
              </li>
              <li>
                <strong>Schedule of Inspection:</strong> tick / N/A entries for each item. The A4
                amendment added items for AFDD, surge protection devices, and TN-C-S (PNB)
                considerations — make sure the form version you are using has them.
              </li>
              <li>
                <strong>Comments:</strong> anything that is not a straightforward pass — parallel
                earth paths, calculated values used in lieu of measured, equipment disconnected for
                a test, defects in the existing installation. The comments box is where the next
                inspector finds the context.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'The pre-energisation walk-around is eight discrete checks — link removed, conductors landed, no foreign objects, terminations torqued, earthing/bonding reconnected, IR results reviewed, polarity at origin, all OCPDs OFF. Use a checklist.',
              'First close = main switch on with all outgoing ways OFF, then one outgoing way at a time. Stand to one side. Door open. PPE appropriate to the prospective fault current.',
              'Breaker trips on first close = re-isolate, diagnose dead, correct, re-test, re-close. Never &lsquo;reset and hope&rsquo;. Reg 643.7 makes verification a positive duty.',
              'Live verification: Zs at the furthest point of each circuit (Reg 643.7.3), RCD trip times at IΔn for effectiveness (Reg 643.7.3) and IΔn × 5 for additional protection (Reg 643.8 / 415.1), polarity confirmed under power (Reg 643.6).',
              'Compare live Zs to the BS 7671 Table 41 / A4 maximum-permitted-Zs column. Above the limit = circuit fails verification, certificate cannot be issued for that circuit until the cause is found and corrected.',
              'Earthing/bonding conductors disconnected for testing must be reconnected BEFORE re-energisation. Procedural sequence in BS 7671 / GN3 is non-negotiable.',
              'Defects: new work — corrected before certificate (Reg 644.1.1). Additions/alterations — defects affecting the new work corrected before certificate; other defects recorded on the certificate (Reg 644.1.2).',
              'The handover is when ownership of the installation passes. Walk the duty holder through the live readings; show the certificate; show the schedules; record the recommended next inspection interval.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Do I need to re-test polarity after re-energisation if I already verified it dead?',
                answer:
                  'Yes — Reg 643.6 frames polarity as a pre-energisation test, but the practical close-out is to confirm under power at sample points (sockets, lampholders, accessories). The dead test confirms continuity-style polarity; the live test confirms the same conductors are at the expected potentials when the supply is present. A dead-test pass with a wrong-polarity supply at the cut-out would still produce a wrong installation — the live confirmation closes that loop.',
              },
              {
                question:
                  'My multifunction tester has a Zs / loop function and an RCD function. Can I use them in any order?',
                answer:
                  'Run loop / Zs first, then RCD. The loop test injects a small fault current that, on RCD-protected circuits, can trip the RCD if you do not select a non-tripping or "no-trip" loop test. Most modern multifunction testers have a no-trip Zs setting that uses a short-duration low-current measurement to avoid this. RCD tests should be the last sequence on each protected circuit, because they intentionally trip the device.',
              },
              {
                question:
                  'What if my live Zs reading is significantly LOWER than the calculated Zs?',
                answer:
                  'Treat with the same suspicion as a low dead R1+R2. The most common cause is parallel earth paths — bonded metalwork, metallic containment in contact with earth, or accidental earthing through other equipment. Disconnect any supplementary bonding at the test point and re-measure; if the reading rises significantly, you have proven the parallel path. Decide whether the parallel path is intentional and acceptable, or an accidental short-circuit of the CPC that needs investigation.',
              },
              {
                question:
                  'During RCD testing the device trips at IΔn but takes 60 ms — is that a fail?',
                answer:
                  'For Reg 643.7.3 effectiveness verification (RCD operating at rated residual operating current), 60 ms at IΔn is acceptable — Chapter 41 allows up to 300 ms for an S-type or Type-S RCD providing fault protection. For Reg 643.8 / 415.1 additional protection, the IΔn × 5 test must trip in less than 40 ms — that is the test that must be fast. Run both tests; the times have different acceptance criteria.',
              },
              {
                question:
                  "Can I issue the EIC if one circuit's live Zs is just over the table limit but everything else passes?",
                answer:
                  'No. Reg 644.1.1 (new work) requires defects revealed during inspection and testing to be corrected before the certificate is issued. A live Zs over the limit means the disconnection time will not be met for that circuit — that is a defect. Re-isolate, find the cause, correct it, re-test. The certificate is for the whole installation; one non-compliant circuit means no certificate.',
              },
              {
                question:
                  'The customer wants me to issue the certificate while a defect on the existing installation (not in my scope) is still present. Is that OK on an addition?',
                answer:
                  'Yes — provided the defect does not affect the safety of your addition or alteration. Reg 644.1.2 distinguishes the two: defects affecting the safety of the new work must be corrected before the certificate; other defects in the existing installation are recorded on the certificate, so far as is reasonably practicable, so the duty holder is informed. The recording is the discharge of duty; correction of those existing defects is a separate piece of work.',
              },
              {
                question:
                  'On a TN-C-S installation, do I need to do anything special at handover regarding the PEN-fault risk?',
                answer:
                  'You should make the duty holder aware that the installation is TN-C-S and that protective bonding is in place — and that any modification affecting the bonding system needs a competent electrician. The detailed PEN-fault risk is not normally walked through with every domestic customer, but for installations with EV charging where the PEN-fault risk is specifically mitigated by an O-PEN device or earth electrode, the duty holder should know which device is installed, why it is there, and what symptom (e.g. EV charger refusing to charge) indicates it has operated.',
              },
              {
                question:
                  'My calibrated torque screwdriver is overdue for calibration. Can I still complete a re-energisation?',
                answer:
                  'Not safely or compliantly for the torque-check step. Reg 526.1 expects tight, secure terminations to manufacturer values; the only way to know you have hit the value is with a calibrated tool. An out-of-calibration torque tool produces unverified terminations — under-tight (loose under load, heat damage) or over-tight (damaged conductor strands, brittle joint). The right answer is to source a calibrated tool, or arrange for the calibration before the re-energisation step. Documenting the torque values on the test record without a calibrated tool is fabrication, not verification.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Re-energisation procedures — Module 2.6" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 3 overview
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

export default InspectionTestingModule2Section6;
