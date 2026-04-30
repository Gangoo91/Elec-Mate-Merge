import { ArrowLeft, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
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
    id: 'mod7-s5-test-button',
    question:
      'You press the integral test button on a 30 mA RCD and the device trips immediately. What has the test button verified — and what has it NOT verified?',
    options: [
      'It has verified the RCD trips at exactly 30 mA — no further testing needed',
      'It has verified the mechanical trip mechanism, the test-circuit shunt resistor, and the indicator. It has NOT verified the trip current threshold or the disconnection time at the rated residual operating current — those require an instrument-driven RCD ramp / time test under Reg 643.8',
      'It has verified the earth-fault loop impedance at the device',
      'It has verified the IR of the upstream wiring',
    ],
    correctIndex: 1,
    explanation:
      'The test button injects an artificial residual current via an internal shunt resistor — sufficient to operate the trip mechanism. It confirms the moving parts work and the test circuit is healthy, but says nothing about the device tripping at 30 mA / within the BS EN 61008 / 61009 disconnection time. The instrument-driven RCD test (Reg 643.8) is the numeric verification.',
  },
  {
    id: 'mod7-s5-mcb-walk',
    question:
      'On the board walk for an MCB, what physical operations does Reg 643.10 require you to verify, beyond the numeric Zs / disconnection-time check at 643.7?',
    options: [
      'Only that the MCB is the correct rating per the design',
      'Manual on / off operation, that the toggle returns to the correct position, that any shared trip bar / busbar is engaged, that the lock-off facility (if fitted) accepts the lock and prevents inadvertent re-closure, and that any indication (flag / colour / window) reads correctly',
      'A controlled short-circuit test at rated breaking capacity',
      'Insulation resistance line-to-load on the MCB',
    ],
    correctIndex: 1,
    explanation:
      'Functional verification of an MCB under 643.10 is the operational layer above the trip-time test. Manual switching, toggle return, busbar / DIN engagement, lock-off action, and indication state all have to work — because all of them are part of how the user / electrician operates the device safely day-to-day, not just at fault clearance.',
  },
  {
    id: 'mod7-s5-afdd-status',
    question:
      'A4:2026 brings AFDDs into the functional verification scope. After pressing the AFDD test button, what should the indication on a healthy device show?',
    options: [
      'Nothing — AFDDs do not have status indication',
      'The device should trip on the test (confirming the arc-fault detection electronics are healthy), reset cleanly when the toggle is operated, and the status / armed indication LED should return to the design-intended healthy state once reset',
      'The status LED should stay off permanently after the test',
      'The device should not trip — the test button only checks the toggle',
    ],
    correctIndex: 1,
    explanation:
      'AFDDs from BS EN 62606-compliant manufacturers operate on the test button by simulating an arc signature internally; a healthy device trips, can be reset, and the indication LED returns to its armed / healthy state. A device that fails to trip, fails to reset, or whose indication does not return to healthy is a non-pass under Reg 643.10 and the inspection schedule entry reflects that.',
  },
  {
    id: 'mod7-s5-eicr-classification',
    question:
      'During an EICR you find an RCD whose integral test button does not cause the device to trip. The instrument-driven test at IΔn confirms the RCD does trip within the standard disconnection time. What is the correct classification?',
    options: [
      'C3 — improvement recommended only, since the device performs electrically',
      'C2 — potentially dangerous. The test button is the user-accessible verification of the protective device. A non-functional test button means the duty-holder has no way to verify the device on the recommended six-monthly basis (BS 7671 user instruction). The RCD is electrically OK today but unverifiable tomorrow',
      'No classification — the device works',
      'C1 — danger present',
    ],
    correctIndex: 1,
    explanation:
      "Reg 643.10 requires verification of the manually operated test facility per the manufacturer's recommendations, and the BS 7671 user notice instructs occupants to test their RCDs every six months via the integral test button. A test button that does not operate the device defeats that user-side verification entirely — C2 (potentially dangerous) is the standard classification.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.10 names a specific verification step for AFDDs. What does the regulation actually require?',
    options: [
      'A controlled arc-fault injection at rated current',
      'Verification of the effectiveness of any manually operated test facility in accordance with the manufacturers’ recommendations',
      'A 5 IΔn ramp test as for an RCD',
      'Visual inspection only — AFDDs are exempt from functional testing',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.10 (A4:2026) is precise: "Where an AFDD is installed the effectiveness of any manually operated test facility shall be verified in accordance with the manufacturers’ recommendations." It is the integral test button — pressed per the manufacturer — that the regulation makes you verify. There is no field-injectable arc-fault test in BS 7671 because there is no test instrument that produces a representative arc fault on a live circuit.',
  },
  {
    id: 2,
    question:
      'Reg 643.10 imposes a separate duty on devices used for fault and additional protection. Which sentence captures it?',
    options: [
      'Protective devices shall be replaced every five years irrespective of test outcome',
      'Protective devices shall be submitted to a test of their function, as necessary, to check that they are properly installed and adjusted; for an RCD the effectiveness of any test facility incorporated in the device shall be verified',
      'Protective devices need only be visually inspected',
      'Protective devices need only be tested when the schedule of inspections flags an item',
    ],
    correctAnswer: 1,
    explanation:
      'Quoted from Reg 643.10: "Protective devices shall be submitted to a test of their function, as necessary, to check that they are properly installed and adjusted. Where fault protection and/or additional protection is provided by an RCD, the effectiveness of any test facility incorporated in the device shall be verified." That is the regulatory hook for the RCD test-button check on top of the BS EN 61557-6 trip-time test from Reg 643.7.3.',
  },
  {
    id: 3,
    question:
      'Reg 643.7.3 cross-references the deemed-to-satisfy disconnection times for an RCD test at IΔn. What are they for a general non-delay type and a delay "S" type?',
    options: [
      '40 ms / 200 ms',
      '300 ms maximum / between 130 ms minimum and 500 ms maximum',
      '200 ms / 400 ms',
      'There are no time limits — only the trip itself matters',
    ],
    correctAnswer: 1,
    explanation:
      'NOTE under Reg 643.7.3: regardless of RCD Type, effectiveness is deemed verified where it disconnects within 300 ms maximum at IΔn for general non-delay type, and between 130 ms minimum and 500 ms maximum for a delay "S" type. Those are the numbers a multifunction tester compares against when it gives a pass/fail at IΔn.',
  },
  {
    id: 4,
    question:
      'For an MCB or RCBO overcurrent characteristic, how does Reg 643.7.3 say verification is to be done?',
    options: [
      'By an instrument-driven primary-injection trip test on every breaker, recorded to the schedule',
      'By visual inspection or other appropriate methods (i.e. short-time or instantaneous tripping setting for circuit-breakers, current rating and type for fuses)',
      'By simulating a 5 kA short-circuit at the breaker terminals',
      'By comparing nameplate to design only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.7.3, dealing with overcurrent protective devices: "for overcurrent protective devices, by visual inspection or other appropriate methods (i.e. short-time or instantaneous tripping setting for circuit-breakers, current rating and type for fuses)." The ADS evidence for an MCB on a final circuit comes from the Zs measurement vs Table 41.3, not from a primary-injection trip test on every device.',
  },
  {
    id: 5,
    question:
      'A typical SPD has a green / red status indicator. The visual check at periodic inspection finds the indicator showing red on one cartridge in the array. What is the correct action under BS 7671?',
    options: [
      'Code C3 only — the SPD is still passing surge currents',
      'Treat as end-of-life: the cartridge has reached its operational limit and is no longer providing the declared voltage protection level. Replace the cartridge / module per manufacturer instruction; record on the report and re-inspect',
      'Re-test by injecting an impulse current via the multifunction tester',
      'Bypass the SPD until the next periodic',
    ],
    correctAnswer: 1,
    explanation:
      'A red status indicator means the SPD has reached the end of its service life and no longer guarantees the declared Up. Reg 534.4.4.1 requires that the SPD’s voltage protection level (Up) is matched to the equipment rated impulse withstand voltage (Uw); a depleted SPD breaks that match. Replace the affected module and re-inspect. SPDs are not field-impulse-tested — the status indicator is the verification means.',
  },
  {
    id: 6,
    question:
      'A bank of three SPD cartridges (L1-PE, L2-PE, L3-PE) on a TN-S board. L1 and L2 are green, L3 is red. The OCPD upstream has not operated. Continuity of supply to the equipment is fine. What does Reg 534.4.5.2 tell you about the protection state?',
    options: [
      'Continuity is unaffected and protection against further overvoltages is still intact',
      'Continuity of supply is unaffected, but neither the installation nor the equipment is protected against possible further overvoltages on that mode — replace before re-inspect',
      'The whole SPD assembly must be replaced even if only one cartridge has failed',
      'No action — only one mode out of three is depleted',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 534.4.5.2 (verbatim): "In case of OCPD operation arising from SPD failure, the continuity of the supply to the equipment is unaffected. However, neither the installation nor the equipment is protected against possible further overvoltages." The same logic applies when the indicator shows end-of-life: power keeps flowing, surge protection on that mode does not.',
  },
  {
    id: 7,
    question:
      'Reg 537.2.7 imposes an identification duty on every isolating device. Which of these is NOT compliant?',
    options: [
      'A durable engraved plastic strip adjacent to the isolator stating "Boiler Room Circuit 4"',
      'An isolator physically located adjacent to a single plant unit, where position alone unambiguously identifies the circuit',
      'A handwritten paper label fixed with masking tape stating "lighting"',
      'A schedule of circuits at the board with the isolator labelled "DB-2 Way 7 — first-floor sockets"',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 537.2.7 requires the marking to be durable AND to indicate the installation or circuit isolated. A handwritten paper label fails the durability test (degrades in service conditions) and "lighting" is generic — not the installation or circuit. The other three discharge the duty: durable engraved label, position-only where unambiguous, or a board schedule referenced by position.',
  },
  {
    id: 8,
    question:
      'Reg 537.2.4 covers prevention of unwanted or unintentional closure of isolators. Which of these does the regulation explicitly accept as compliance methods?',
    options: [
      'Lockable space or lockable enclosure, padlocking, or other suitable means',
      'Padlocking only',
      'Verbal instruction to site personnel',
      'A printed sticker stating "Do not operate"',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 537.2.4: "This may be achieved by locating the device in a lockable space or lockable enclosure or by padlocking or by other suitable means" (see Regulation 462.3). The "or by other suitable means" gate permits alternatives, but acceptance under the regulation is judged on outcome — that the chosen measure demonstrably prevents unwanted or unintentional closure.',
  },
  {
    id: 9,
    question:
      'On the Schedule of Test Results for an RCBO-protected circuit, where do the trip-time verification numbers from M6 actually go?',
    options: [
      'Nowhere — the M6 numbers are working notes only',
      'Into the dedicated "RCD operating time at IΔn" column on the test results schedule, against the circuit; the test-button verification is recorded as a tick in the function-test column',
      'Only into the comments column',
      'Only on the EICR Schedule of Inspections, not the Schedule of Test Results',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 model forms keep a discrete column for the RCD operating time at IΔn (the BS EN 61557-6 reading from M6). The test-button check from Reg 643.10 is a separate tick in the function-test column — they are not the same evidence. Record both. An RCBO that trips at IΔn but whose test button is mechanically jammed is still a defect, even if it would clear an earth fault.',
  },
  {
    id: 10,
    question:
      'Reg 643.10 NOTE 2 contains a critical caveat about the functional test required by 643.10. What does it say?',
    options: [
      'The 643.10 functional test replaces all factory testing',
      'This functional test does not replace the functional test indicated by the relevant standards',
      'The 643.10 functional test is only required at periodic, not initial verification',
      'The 643.10 functional test is optional for low-risk circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Verbatim Reg 643.10 NOTE 2: "This functional test does not replace the functional test indicated by the relevant standards." The point is sharp: pressing the AFDD test button or operating the main switch is the BS 7671 verification of installation, mounting and adjustment. It does not stand in for the type-test the device passes against its product standard (e.g. BS EN 62606 for AFDDs, BS EN 61009 for RCBOs).',
  },
];

const InspectionTestingModule7Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Protective device operation verification | I&T Module 7.5 | Elec-Mate',
    description:
      'Reg 643.10 + Reg 643.7.3 + Reg 537.2.4/537.2.7: MCB, RCBO, AFDD test button (A4:2026), SPD status indicator, isolator and main switch operation. Court-aware functional verification.',
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
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5"
            title="Protective device operation verification"
            description="Reg 643.10 in practice — what to do, device by device, at the board. MCB and RCBO function, the A4:2026 AFDD test-button rule, SPD status, isolator and main switch operation. The closing functional test before the certificate is signed."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.10 is the functional-testing regulation. It turns each protective device on the board into a verification target with a specific check — and the A4:2026 amendment added an explicit AFDD line.',
              'For MCBs and RCBOs the overcurrent characteristic is verified per Reg 643.7.3 by visual inspection / appropriate methods (rating, type, instantaneous setting) backed by the Zs reading from M5. The MCB/RCBO trip-test is a function check, not an instrument-driven primary injection on every device.',
              'The RCD trip-time at IΔn (and ½ IΔn no-trip) is the BS EN 61557-6 result fed forward from M6. Reg 643.10 adds a separate duty: the effectiveness of the integral test facility (the test button) shall be verified — that is the on-board functional check, not a substitute for the M6 numbers.',
              'AFDDs (Reg 421.1.7, A4:2026) are verified by the manufacturer-prescribed test button only — Reg 643.10 is explicit about this. There is no field arc-fault injection. Press, listen, observe, record.',
              'SPD verification is a visual inspection of the status indicator — green/red flag — read against the manufacturer’s replacement schedule. A red indicator means end-of-service, not "still working but tired".',
              'Main switch, isolators, changeover switches and time-delay relays are mechanical-operation tests under Reg 643.10 plus identification under Reg 537.2.7 and prevention-of-closure under Reg 537.2.4. Operate every position; confirm labelling; verify locking provision.',
              'A4:2026 Schedule of Test Results separates the function-test tick from the RCD operating-time column. Both are required evidence — record both, not one in lieu of the other.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State exactly what Reg 643.10 requires for each class of protective device — and quote the regulation text from memory under audit',
              'Carry out the manufacturer-prescribed AFDD test-button verification per Reg 643.10 NOTE A4 addition, and articulate why an integral-button check is the only field verification BS 7671 mandates',
              'Read an SPD status indicator against the manufacturer’s replacement schedule and act correctly when end-of-service is shown — including what Reg 534.4.5.2 says about continuity of supply vs continuity of protection',
              'Distinguish the M6 RCD trip-time verification (BS EN 61557-6 instrument) from the Reg 643.10 test-facility verification (the integral test button), and record both correctly on the A4:2026 schedule',
              'Verify isolator function and identification under Reg 537.2.7, and the prevention-of-closure duty under Reg 537.2.4, in a way that survives a court-bench cross-examination',
              'Apply Reg 643.10 NOTE 2 — that the 643.10 functional test does not replace the functional test indicated by the relevant product standards — and explain the practical consequence',
            ]}
          />

          <ContentEyebrow>What Reg 643.10 actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.10 — three duties in one regulation"
            plainEnglish="Reg 643.10 is short but does three jobs. It demands a function test on equipment in general (switchgear, drives, controls, interlocks). It demands a function test on protective devices, plus verification of any RCD test facility. And — added by A4:2026 — it demands that any AFDD’s manually operated test facility is verified per the manufacturer’s recommendations."
            onSite="Treat Reg 643.10 like a board-walk checklist. Move device by device: MCB → RCBO → AFDD → SPD → main switch / isolator → time-delay relay. Each one has its specific verification call. Tick the schedule as you go."
          >
            <p>
              The regulation sits at the close of the test sequence in Part 6 Chapter 64. By the
              time you reach Reg 643.10, every conductor-level test (continuity, insulation
              resistance, polarity, Zs, RCD trip-time) has been done. Reg 643.10 closes the loop:
              does each device on the board actually operate as installed and adjusted? The A4:2026
              amendment added a single sentence — the AFDD test-facility line — and that sentence is
              the headline change. Before A4, AFDDs sat awkwardly between a functional duty and an
              opinion-of-the-installer position. After A4, the verification path is explicit: press
              the manufacturer’s test button, in the manner the manufacturer specifies, and record
              the result.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.10 · Functional testing"
            clause={
              <>
                Equipment shall be subjected to functional testing, as appropriate, to verify that
                it is properly mounted, adjusted and installed and operates correctly in accordance
                with the relevant requirements of BS 7671. Examples of such equipment are: (a)
                switchgear and controlgear assemblies, drives, controls and interlocks; (b) systems
                for emergency switching off and emergency stopping; (c) insulation monitoring. NOTE
                1: This list is not exhaustive. Protective devices shall be submitted to a test of
                their function, as necessary, to check that they are properly installed and
                adjusted. Where fault protection and/or additional protection is provided by an RCD,
                the effectiveness of any test facility incorporated in the device shall be verified.
                Where an AFDD is installed the effectiveness of any manually operated test facility
                shall be verified in accordance with the manufacturers’ recommendations. NOTE 2:
                This functional test does not replace the functional test indicated by the relevant
                standards.
              </>
            }
            meaning="Three duties: (1) function-test the equipment generally; (2) function-test protective devices and any RCD test facility; (3) verify the AFDD manual test facility per the manufacturer (A4:2026 addition). NOTE 2 is the safety net: this regulation does not displace the product-standard testing the device has already passed at manufacture."
          />

          <ConceptBlock
            title="The A4:2026 AFDD addition — why a button-press is enough"
            plainEnglish="An AFDD’s detection algorithm reads the harmonic / high-frequency signature of an arc on the protected circuit. There is no portable instrument that injects a representative arc fault — the signature is too specific to each manufacturer’s algorithm. The manufacturer therefore provides an integral test button that drives the trip mechanism via the device’s own logic. Pressing it verifies the trip-actuator and the test path. That is the only field verification BS 7671 asks for."
            onSite="Read the manufacturer’s documentation before testing. Some AFDDs need a specific hold-and-release sequence; some need the circuit live before the button responds. The two A4 changes pair deliberately — Reg 421.1.7 is recommendatory (the text uses 'recommending'), Reg 643.10 is prescriptive ('shall be verified')."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 421.1.7 (A4:2026 introduction)"
            clause={
              <>
                Regulation 421.1.7 has been introduced recommending the installation of arc fault
                detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a
                fixed installation due to the effects of arc fault currents.
              </>
            }
            meaning="The recommendation that prompts the verification. The wording is advisory ('recommending') and is scoped explicitly to AC final circuits of a fixed installation. Reg 643.10 then turns the verification of the manufacturer-provided test facility into a mandatory step where the device is fitted."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The board walk — verifying each class in turn</ContentEyebrow>

          {/* Diagram — board with device verifications */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Distribution board — verification call against each device class
            </h4>
            <svg
              viewBox="0 0 820 460"
              className="w-full h-auto"
              role="img"
              aria-label="Distribution board with each protective-device class annotated for the specific verification call required by Reg 643.10. Main switch: mechanical operate-test plus Reg 537.2.7 identification and Reg 537.2.4 prevention of closure. SPD: visual status indicator inspection plus age check against manufacturer schedule. AFDD: manufacturer-prescribed test button per Reg 643.10 NOTE A4 addition. RCBO: trip-time at IΔn from M6 plus integral test button under Reg 643.10. MCB: visual inspection of rating, type and instantaneous setting per Reg 643.7.3, backed by the Zs reading from M5."
            >
              <rect
                x="20"
                y="20"
                width="780"
                height="420"
                rx="12"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
              />
              <text
                x="410"
                y="46"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
                fontWeight="bold"
              >
                DISTRIBUTION BOARD — Reg 643.10 verification map
              </text>

              {/* Busbar */}
              <line
                x1="60"
                y1="100"
                x2="760"
                y2="100"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="3"
              />
              <text x="60" y="92" fill="rgba(255,255,255,0.5)" fontSize="9">
                Busbar
              </text>

              {/* Main switch */}
              <rect
                x="60"
                y="110"
                width="100"
                height="60"
                rx="6"
                fill="rgba(59,130,246,0.10)"
                stroke="#3B82F6"
                strokeWidth="1.6"
              />
              <text
                x="110"
                y="132"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="10"
                fontWeight="bold"
              >
                MAIN SWITCH
              </text>
              <text x="110" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Operate ON / OFF
              </text>
              <text x="110" y="162" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Lock-off check
              </text>
              <text
                x="110"
                y="190"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Reg 643.10 · 537.2.4 · 537.2.7
              </text>

              {/* SPD */}
              <rect
                x="180"
                y="110"
                width="100"
                height="60"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="230"
                y="132"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                SPD
              </text>
              <circle cx="208" cy="148" r="5" fill="#22C55E" />
              <circle cx="222" cy="148" r="5" fill="#22C55E" />
              <circle cx="236" cy="148" r="5" fill="#EF4444" />
              <text x="230" y="166" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Status indicator
              </text>
              <text
                x="230"
                y="190"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Reg 643.10 · 534.4.4.1 · 534.4.5.2
              </text>

              {/* AFDD */}
              <rect
                x="300"
                y="110"
                width="100"
                height="60"
                rx="6"
                fill="rgba(251,146,60,0.12)"
                stroke="#FB923C"
                strokeWidth="1.6"
              />
              <text
                x="350"
                y="132"
                textAnchor="middle"
                fill="#FB923C"
                fontSize="10"
                fontWeight="bold"
              >
                AFDD
              </text>
              <text x="350" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Press TEST per
              </text>
              <text x="350" y="160" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                manufacturer
              </text>
              <text
                x="350"
                y="190"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Reg 643.10 (A4) · 421.1.7
              </text>

              {/* RCBO */}
              <rect
                x="420"
                y="110"
                width="100"
                height="60"
                rx="6"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="470"
                y="132"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                RCBO
              </text>
              <text x="470" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                M6 IΔn ≤ 300 ms
              </text>
              <text x="470" y="162" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                + integral TEST btn
              </text>
              <text
                x="470"
                y="190"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Reg 643.7.3 · 643.10
              </text>

              {/* MCB */}
              <rect
                x="540"
                y="110"
                width="100"
                height="60"
                rx="6"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="590"
                y="132"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                MCB
              </text>
              <text x="590" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Visual: rating /
              </text>
              <text x="590" y="160" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                type / Inst. setting
              </text>
              <text
                x="590"
                y="190"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Reg 643.7.3 (Zs M5)
              </text>

              {/* Time-delay relay */}
              <rect
                x="660"
                y="110"
                width="100"
                height="60"
                rx="6"
                fill="rgba(125,211,252,0.10)"
                stroke="#7DD3FC"
                strokeWidth="1.6"
              />
              <text
                x="710"
                y="132"
                textAnchor="middle"
                fill="#7DD3FC"
                fontSize="10"
                fontWeight="bold"
              >
                TIME-DELAY
              </text>
              <text x="710" y="148" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Operate +
              </text>
              <text x="710" y="160" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                time per setting
              </text>
              <text
                x="710"
                y="190"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Reg 643.10
              </text>

              {/* Schedule mapping */}
              <rect
                x="60"
                y="240"
                width="700"
                height="180"
                rx="10"
                fill="rgba(251,191,36,0.05)"
                stroke="rgba(251,191,36,0.25)"
                strokeWidth="1.4"
              />
              <text
                x="410"
                y="262"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                A4:2026 Schedule of Test Results — column mapping
              </text>

              <line
                x1="80"
                y1="280"
                x2="740"
                y2="280"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
              />
              <text x="100" y="300" fill="rgba(255,255,255,0.85)" fontSize="10">
                Zs (Ω) — from M5
              </text>
              <text x="100" y="316" fill="rgba(255,255,255,0.6)" fontSize="9">
                MCB / RCBO overcurrent disconnection evidence
              </text>

              <text x="420" y="300" fill="rgba(255,255,255,0.85)" fontSize="10">
                RCD operating time at IΔn (ms)
              </text>
              <text x="420" y="316" fill="rgba(255,255,255,0.6)" fontSize="9">
                from M6 — BS EN 61557-6 instrument
              </text>

              <text x="100" y="346" fill="rgba(255,255,255,0.85)" fontSize="10">
                Function test (✓ / ✗)
              </text>
              <text x="100" y="362" fill="rgba(255,255,255,0.6)" fontSize="9">
                Reg 643.10: AFDD button, RCBO test button,
              </text>
              <text x="100" y="376" fill="rgba(255,255,255,0.6)" fontSize="9">
                main switch operate, isolator operate
              </text>

              <text x="420" y="346" fill="rgba(255,255,255,0.85)" fontSize="10">
                Comments
              </text>
              <text x="420" y="362" fill="rgba(255,255,255,0.6)" fontSize="9">
                SPD status indicator state, replacement
              </text>
              <text x="420" y="376" fill="rgba(255,255,255,0.6)" fontSize="9">
                date, manufacturer-prescribed test sequence
              </text>

              <text
                x="410"
                y="406"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Reg 643.10 NOTE 2 — this functional test does not replace the functional test
                indicated by the relevant standards
              </text>
            </svg>
          </div>

          <ConceptBlock
            title="MCB and RCBO — overcurrent characteristic verified by inspection, not primary injection"
            plainEnglish="Reg 643.7.3 makes the verification path for an overcurrent device explicit: visual inspection or other appropriate methods — rating, type (B / C / D curve), instantaneous tripping setting — checked against design. Disconnection-time evidence comes from the M5 Zs reading vs Table 41.3 / A4 max-permitted-Zs. You do not primary-inject every MCB to verify the magnetic trip."
            onSite="The Reg 643.10 function test for an MCB / RCBO is the lever operate-test: OFF / ON, mechanical free movement. For an RCBO add the integral test-button check under Reg 643.10. Trip-time numbers themselves come from M6, not from this regulation."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Rating (In)</strong> matches design and the cable-CSA permitted by Chapter
                43.
              </li>
              <li>
                <strong>Type / curve</strong> (B, C, D) matches the design — typically B-curve for
                general final circuits, C for inrush-driven loads.
              </li>
              <li>
                <strong>Instantaneous / short-time setting</strong> (where adjustable) is set to the
                design value and locked / labelled.
              </li>
              <li>
                <strong>Mechanical operation</strong> on the lever — ON, OFF, ON, lock-off where
                lockable. No grit, no bind, no looseness.
              </li>
              <li>
                <strong>Zs verification</strong> (M5) against Table 41.3 / A4 max-permitted-Zs — the
                disconnection-time evidence.
              </li>
            </ul>
            <p>
              An RCBO carries both duties: overcurrent verification (above) and RCD verification
              under Reg 643.7.3 / Reg 643.10. The RCBO integral test button is non-optional — the
              on-board check that the residual-current path is functional.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7.3 · NOTE on RCD disconnection times"
            clause={
              <>
                NOTE: Regardless of RCD Type, effectiveness is deemed to have been verified where an
                RCD disconnects within the time stated below with an alternating current test at
                rated residual operating current (IΔn): (a) for general non-delay type, 300 ms
                maximum; (b) for delay &lsquo;S&rsquo; type RCD, between 130 ms minimum and 500 ms
                maximum.
              </>
            }
            meaning="The deemed-to-satisfy times your multifunction tester compares against. 300 ms ceiling for a general type; 130–500 ms window for an S-type. Numbers below the floor on an S-type are a red flag — they suggest the time-delay element is not functioning, even though the device is tripping."
          />

          <Scenario
            title="A 32 A B-curve RCBO on a kitchen radial — three duties, three pieces of evidence"
            situation="Initial verification on a domestic refurb. Kitchen final circuit fed by a 32 A B-curve, 30 mA Type A RCBO. You have already measured Zs = 0.71 Ω at the furthest socket against a Table 41.3 max-permitted-Zs of 1.37 Ω, and the M6 instrument shows 28 ms at IΔn. The Reg 643.10 step is next."
            whatToDo={
              <>
                <span className="block">
                  1. <strong>Visual / appropriate methods</strong> per Reg 643.7.3 — confirm the
                  RCBO is 32 A, B-curve, Type A residual, 30 mA IΔn. Match against design.
                </span>
                <span className="block">
                  2. <strong>Function test</strong> per Reg 643.10 — operate the lever to OFF and
                  back to ON. Mechanical free movement, audible click, indicator changes.
                </span>
                <span className="block">
                  3. <strong>Integral test facility</strong> per Reg 643.10 — press the
                  &ldquo;T&rdquo; button. Device must trip immediately. Reset and re-test.
                </span>
                <span className="block">
                  4. <strong>Schedule entries</strong> — Zs column: 0.71 Ω (from M5). RCD operating
                  time at IΔn column: 28 ms (from M6). Function test column: tick. Comments: nil.
                </span>
              </>
            }
            whyItMatters="Three columns, three different types of evidence. If you put 28 ms in the function-test tick column and tick the operating-time column without the M6 instrument reading, the evidence trail is incoherent. A claims auditor or expert witness will spot it inside ten seconds. Reg 643.10 demands the integral-test-facility check on top of the M6 trip-time — they are separate verifications and they get separate columns."
          />

          <ConceptBlock
            title="AFDD — the manufacturer-prescribed test button is the verification"
            plainEnglish="An AFDD looks for the high-frequency electrical signature of a series or parallel arc fault. The detection algorithm is proprietary to the manufacturer; the device passes its product-standard type test (BS EN 62606) at manufacture and field-verification of that algorithm with a portable instrument is not within the toolset BS 7671 envisions. Reg 643.10 therefore gives the manufacturer the verification-method authority: press the test button as they specify, observe the trip, reset, record."
            onSite="Have the manufacturer’s installation instruction sheet to hand. Some require the circuit live, some don’t. Some require a hold-and-release sequence, some are momentary. Some have an integral RCD-type test alongside the AFDD test on a shared button — verify both behaviours separately if so. The schedule-of-results function-test tick is for the AFDD trip; the RCD trip-time stays in its own column."
          >
            <p>
              The A4:2026 sentence in Reg 643.10 — &ldquo;Where an AFDD is installed the
              effectiveness of any manually operated test facility shall be verified in accordance
              with the manufacturers’ recommendations&rdquo; — does three things at once. It makes
              the AFDD test mandatory where the device is fitted. It places the manufacturer’s
              instruction at the centre of the verification path. And via NOTE 2 it acknowledges
              that this functional test does not replace the type-test the device passed at
              manufacture under its product standard.
            </p>
            <p>Practical AFDD-testing checklist for the schedule:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Confirm the AFDD is in the Reg 421.1.7 scope — AC final circuit of a fixed
                installation. AFDDs in distribution-board incoming or sub-main positions are outside
                the recommendation but the verification still applies if the device is installed.
              </li>
              <li>
                Read the manufacturer’s test sequence. Press accordingly — typically a momentary
                press energising the device’s internal trip coil via the test path.
              </li>
              <li>
                Confirm the device trips. Confirm the reset operation returns the device to service.
                Confirm the indication LEDs (where present) show the correct healthy / tripped /
                fault states per the manufacturer.
              </li>
              <li>
                Tick the function-test column on the schedule of test results. Record any trip cause
                indication (some AFDDs distinguish between AFDD trip, RCD trip and overcurrent trip
                via LED codes — capture this for the comments).
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="SPD — visual status indicator plus age-based replacement schedule"
            plainEnglish="An SPD diverts surge energy via a metal-oxide varistor or gas-discharge tube that gradually degrades with each surge it absorbs. The status indicator on the cartridge front — green for healthy, red for end-of-service — is the manufacturer’s designed verification means. There is no field test that injects a representative surge; you read the indicator and check the in-service age against the manufacturer’s replacement schedule."
            onSite="Walk the SPD bank. For each cartridge / mode (L1-PE, L2-PE, L3-PE, N-PE depending on CT1/CT2): confirm indicator state. Cross-reference the install date (label the board on first install) against manufacturer service life. Any red indicator is a replace-now action. Reg 534.4.4.1 frames the duty: the SPD’s voltage protection level (Up) and the equipment’s rated impulse withstand voltage (Uw) shall be considered — an end-of-service cartridge breaks that match. Reg 534.4.5.2 captures the failure mode: supply continuity is unaffected; protection is not."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 534.4.5.2 · Arrangement of SPDs"
            clause={
              <>
                In case of OCPD operation arising from SPD failure, the continuity of the supply to
                the equipment is unaffected. However, neither the installation nor the equipment is
                protected against possible further overvoltages.
              </>
            }
            meaning="Continuity of supply ≠ continuity of protection. An end-of-life SPD reads as 'still working' from a load point of view but is no longer doing its job. The status indicator is the only visible state-of-protection you have at periodic inspection."
          />

          <Scenario
            title="Periodic inspection — three-phase SPD with one mode at end-of-service"
            situation="A commercial board has a Type 2 three-phase SPD bank installed at the origin. Connection type CT2: three modes between line and neutral, plus one mode neutral-to-PE. Visual inspection reveals L2-N indicator showing red. The other three indicators are green. The upstream MCB feeding the SPD has not operated; supply is healthy."
            whatToDo={
              <>
                <span className="block">
                  Record on the EICR: SPD mode L2-N at end-of-service (red status indicator). Code
                  the observation. The equipment downstream of the L2-N path is no longer protected
                  against transients on that mode — Reg 534.4.5.2.
                </span>
                <span className="block">
                  Action: replace the L2-N cartridge per the manufacturer’s instruction. Re-inspect
                  after replacement and confirm green indicator before re-energisation.
                </span>
                <span className="block">
                  Record manufacturer, type, mode, install date and replacement date on the SPD data
                  label / board plate so the next periodic has the audit trail.
                </span>
              </>
            }
            whyItMatters="The temptation is to record the observation at C3 (improvement recommended) on the basis that supply is healthy. That mis-reads the regulation. The protection function on that mode is gone, the equipment downstream of it is exposed to overvoltages above its rated impulse withstand, and the manufacturer’s designed verification means (the indicator) is telling you so. Treat as the remedial action it actually is, not as a cosmetic flag."
          />

          <ConceptBlock
            title="Main switch, isolators and changeover switches — operate every position"
            plainEnglish="The Reg 643.10 functional test on a switching device is exactly that: operate it through every legitimate position; confirm mechanical free movement, audible / tactile detents and correct indication. Then check labelling under Reg 537.2.7 and prevention-of-closure under Reg 537.2.4. Three duties, one walk-around."
            onSite="Main switch: ON / OFF / ON, lock-off check if lockable. Changeover: position 1 / position 2 / OFF, confirming the mechanical interlock prevents simultaneous closure. Rotary isolator: every detent. Reg 537.2.7 demands marking clear, durable, indicating the installation or circuit isolated — generic labelling like 'lighting' fails. Reg 537.2.4 demands the chosen method (lockable space / lockable enclosure / padlocking / other suitable means) actually prevents closure: a hasp with no padlock is the absence of compliance, not compliance."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 537.2.4 · Isolation devices — prevention of closure"
            clause={
              <>
                Devices for isolation shall be selected and/or installed so as to prevent unwanted
                or unintentional closure (see Regulation 462.3). This may be achieved by locating
                the device in a lockable space or lockable enclosure or by padlocking or by other
                suitable means.
              </>
            }
            meaning="Three explicit methods plus 'other suitable means'. Acceptance is judged on outcome — that the chosen method demonstrably prevents unwanted or unintentional closure. A hasp without a padlock is not the chosen method; it is incomplete."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 537.2.7 · Isolation devices — identification"
            clause={
              <>
                Each device used for isolation shall be clearly identified by position or durable
                marking to indicate the installation or circuit it isolates.
              </>
            }
            meaning="Identification must be (a) clear, (b) durable, (c) indicate the specific installation or circuit. Position alone is sufficient where the location is unambiguous. Generic labels ('lighting', 'sockets') without circuit reference do not satisfy the duty."
          />

          <ConceptBlock
            title="Time-delay relays and contactors — operate plus measured time-to-operate"
            plainEnglish="Where a time-delay relay or contactor is fitted (boiler interlocks, motor starters, lighting time-switches), the Reg 643.10 functional test is operate-and-time. Energise the coil and confirm pull-in; de-energise and confirm clean drop-out; time the delay element against the dial setting per the manufacturer’s tolerance; verify any interlocks prevent simultaneous closure on every operating sequence. Reg 643.10 NOTE 1 lists switchgear and controlgear assemblies, drives, controls and interlocks; emergency switching off / emergency stopping; insulation monitoring — the list is not exhaustive."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="Three columns, three pieces of evidence — keep them separate"
            plainEnglish="The A4:2026 model forms tightened the column structure on the Schedule of Test Results. Function-test tick, RCD operating time at IΔn, and Zs are three different columns recording three different verifications. Cross-population is the most common audit failure on this part of the schedule."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Zs column (Ω):</strong> the M5 reading at the furthest point — the
                disconnection-time evidence for the overcurrent characteristic of MCB / RCBO.
                Compared against Table 41.3 / A4-max-permitted-Zs.
              </li>
              <li>
                <strong>RCD operating time at IΔn column (ms):</strong> the M6 reading from the BS
                EN 61557-6 instrument. Pass criterion ≤ 300 ms for general type, 130–500 ms for
                S-type.
              </li>
              <li>
                <strong>Function-test column (✓ / ✗):</strong> the Reg 643.10 verification — AFDD
                button, RCBO test button, MCB lever operation, main switch operate, isolator
                operate, time-delay function. One tick, multiple verifications backing it.
              </li>
              <li>
                <strong>Comments column:</strong> SPD status indicator state (green / red),
                manufacturer-prescribed test sequence followed, AFDD trip-cause indication if shown,
                lock-off provision verified, identification labelling confirmed.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Substituting the M6 RCD trip-time for the Reg 643.10 test-button check"
            whatHappens="The inspector measures 28 ms at IΔn with the multifunction tester and ticks both the operating-time column and the function-test column. The board passes initial verification. Six months later the RCBO mechanism on one circuit is found to be jammed — the integral test button does not actuate the trip mechanism, even though the residual-current detection circuit was functional at the M6 test. The original certificate now shows a function-test tick that was never genuinely performed."
            doInstead="Press every integral test button as a discrete step on top of the M6 measurement. Reg 643.10 names the test-facility verification as a separate duty — the words 'shall be verified' are not satisfied by an instrument-driven trip from outside the device. The button-press exercises the manufacturer’s internal trip-actuator path; the IΔn instrument exercises the residual-current detection path. Both are required."
          />

          <CommonMistake
            title="Coding an end-of-service SPD indicator as C3"
            whatHappens="Periodic inspection finds an SPD with a red status flag. The inspector codes C3 ('improvement recommended') on the basis that supply continuity is unaffected and the device is 'still doing something'. Three months later a switching transient on the mains takes out a sensitive UPS downstream because the SPD was end-of-service and no longer providing the declared Up. The argument that the inspector flagged it as C3 collapses against Reg 534.4.5.2 — the regulation explicitly says continuity of supply is not the same as continuity of protection."
            doInstead="An end-of-service SPD is a defect, not an aesthetic flag. Treat as the remedial action it is — replace the depleted module per manufacturer instruction and re-inspect. Code accordingly on the EICR (typically C2 where downstream equipment is sensitive and the loss of protection presents a real risk; site-specific judgement required). Reference Reg 534.4.4.1 (Up–Uw coordination broken) and Reg 534.4.5.2 (continuity of supply ≠ continuity of protection) in the comments."
          />

          <CommonMistake
            title="Pressing the AFDD test button without reading the manufacturer instruction"
            whatHappens="The AFDD has a combined RCBO+AFDD test button with a specific sequence: short press = RCD test path, long press (≥ 2 s) = AFDD test path. The inspector momentary-presses on every device and records function-test pass on the schedule. The AFDD path was never exercised. Six months later an arc-fault event at a damaged flex does not trip the device because the AFDD electronics had a latent fault that the proper test sequence would have revealed."
            doInstead="Reg 643.10 places the manufacturer’s recommendation at the centre of the verification: the test facility shall be verified in accordance with the manufacturers’ recommendations. Read the data sheet before testing. Some devices require the circuit live; some require a hold-release sequence; some need the specific 'AFDD test' sequence rather than the generic test button. Capture the sequence used in the comments column."
          />

          <SectionRule />

          <ContentEyebrow>
            Periodic inspection vs initial verification — same regulation, different lens
          </ContentEyebrow>

          <ConceptBlock
            title="Reg 643.10 at periodic inspection — the SPD age check is the differentiator"
            plainEnglish="At initial verification every protective device is new and the Reg 643.10 functional test confirms it operates as installed. At periodic inspection the devices are weathered, and the same regulation has to flush out wear and end-of-service."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Read every SPD status indicator. Cross-reference the install (or last replacement)
                date against the manufacturer’s recommended service life. End-of-service is a
                remedial action, not a flag.
              </li>
              <li>
                Press every AFDD test button per the manufacturer’s recommended periodic schedule.
                Some manufacturers specify a six-monthly user test plus the periodic-inspection test
                — cite the manufacturer in the comments.
              </li>
              <li>
                Operate every isolator through every detent. Sticky mechanisms, missing detents and
                worn lock-off provisions are common defects on isolators that have not been operated
                for years.
              </li>
              <li>
                Verify identification under Reg 537.2.7 against the as-found labelling. Faded,
                painted-over or now-incorrect labels (after re-routed circuits) are coding-relevant.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.10 has three duties: equipment function test in general, protective-device function test plus RCD test-facility verification, and (A4:2026 addition) AFDD test-facility verification per the manufacturer.',
              'Reg 643.10 NOTE 2 — this functional test does not replace the functional test indicated by the relevant standards. The product-standard type test is not your duty; the on-board verification is.',
              'MCB / RCBO overcurrent: visual inspection of rating, type and instantaneous setting per Reg 643.7.3, with Zs at M5 doing the disconnection-time work.',
              'RCBO / RCD: M6 trip time at IΔn (≤ 300 ms general, 130–500 ms S-type) plus the integral test-button check under Reg 643.10. Two different evidences, two different schedule columns.',
              'AFDD: press the manufacturer-prescribed test button and observe the trip. There is no field arc-fault injection. Capture trip-cause LED indication in the comments.',
              'SPD: visual status indicator — green / red — plus age check against manufacturer schedule. End-of-service is a defect, not a flag. Reg 534.4.5.2: continuity of supply is not continuity of protection.',
              'Main switch / isolator / changeover: operate every position. Verify identification under Reg 537.2.7 and prevention-of-closure under Reg 537.2.4 in the same walk-around.',
              'Schedule of Test Results: function-test tick is its own column. Do not collapse the M6 RCD operating time into it — the two are separate evidences and a court-ready certificate keeps them separate.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Do I have to primary-inject every MCB to verify the magnetic trip under Reg 643.10?',
                answer:
                  'No. Reg 643.7.3 explicitly permits verification of overcurrent protective devices by visual inspection or other appropriate methods — rating, type, instantaneous tripping setting. Disconnection-time evidence comes from the Zs measurement at M5 against the Table 41.3 / A4 max-permitted-Zs limit. Primary-injection on every breaker is not a BS 7671 requirement at initial verification or periodic inspection. The Reg 643.10 function test for an MCB is the operate-test on the lever.',
              },
              {
                question:
                  'The A4:2026 AFDD line in Reg 643.10 says "manufacturers’ recommendations". What if the manufacturer’s instruction sheet is not on site?',
                answer:
                  'Get it before testing. Most manufacturers publish AFDD test sequences in the product data sheet on their public website; some require the circuit energised, some require a specific press-duration. Without the manufacturer’s recommendation you have no defined verification, which means Reg 643.10 is not satisfied. Capture the manufacturer name, model, and the test sequence followed in the comments column on the schedule of test results.',
              },
              {
                question:
                  'How does the M6 RCD trip-time test relate to the Reg 643.10 test-button check — are they the same evidence?',
                answer:
                  'No, they are separate verifications and they belong in separate columns. The M6 reading is from a BS EN 61557-6 instrument that injects a calibrated residual current at IΔn and measures the disconnection time. The Reg 643.10 test-button check exercises the device’s integral test path — a manufacturer-built circuit that drives the trip mechanism via the device’s own logic. The instrument exercises the detection path; the button exercises the trip-actuator path. A device can pass one and fail the other; both are required for a complete verification.',
              },
              {
                question:
                  'A periodic SPD shows a red status indicator on one mode but the upstream OCPD has not operated. What code do I use on the EICR?',
                answer:
                  'Read Reg 534.4.5.2: in case of OCPD operation arising from SPD failure, the continuity of the supply to the equipment is unaffected; however, neither the installation nor the equipment is protected against possible further overvoltages. End-of-service SPD on one mode means the protection function on that mode is gone. Coding is site-specific (downstream equipment sensitivity, presence of other coordinated SPDs, location), but C3 alone is rarely defensible because the regulation flags an actual loss of protection. C2 is the typical coding where downstream equipment is sensitive. Replace the cartridge and re-inspect.',
              },
              {
                question:
                  'Reg 643.10 NOTE 2 says the functional test does not replace the functional test indicated by the relevant standards. What does that mean in practice?',
                answer:
                  'The product-standard type test (BS EN 60898 for MCBs, BS EN 61009 for RCBOs, BS EN 62606 for AFDDs, BS EN 61643-11 for SPDs) is what the manufacturer carries out at design and manufacture to certify the device. Your on-board Reg 643.10 functional test does not displace that — and you are not expected to replicate it. NOTE 2 protects you from the bad argument that an on-board test-button press validates the device’s detection algorithm. It does not. It validates the trip path and the installation. The detection algorithm rides on the product certification.',
              },
              {
                question:
                  'I have an isolator labelled "lighting" with no circuit reference. Is that compliant with Reg 537.2.7?',
                answer:
                  'No. Reg 537.2.7 requires the marking to indicate the installation or circuit it isolates. "Lighting" is generic — it does not specify which lighting circuit, which floor, which area. The compliant label states the circuit reference (e.g. "DB-2 Way 4 — first-floor lighting") or the installation reference, or relies on position alone where the location unambiguously identifies the circuit (e.g. an isolator immediately adjacent to a single plant unit). Code as a labelling defect on the EICR with the regulation reference.',
              },
              {
                question:
                  'A changeover switch has a mechanical interlock between positions A and B. Do I need to verify the interlock under Reg 643.10?',
                answer:
                  'Yes — Reg 643.10 NOTE 1 explicitly lists "switchgear and controlgear assemblies, drives, controls and interlocks" as in-scope examples. Operate the changeover through every legitimate position (A, OFF, B, OFF, A) and confirm the interlock prevents simultaneous closure. Capture the verification in the function-test column with a comment naming the interlock type.',
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
          <Quiz
            title="Protective device operation verification — Module 7.5"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-8')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Module 8</div>
            </button>
          </div>

          <div className="hidden">
            <ShieldCheck />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule7Section5;
