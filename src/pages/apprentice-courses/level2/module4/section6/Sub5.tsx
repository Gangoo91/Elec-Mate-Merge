/**
 * Module 4 · Section 6 · Sub 5 — Test functionality
 * Maps to City & Guilds 2365-02 / Unit 204 / LO6 / AC 6.5
 *   AC 6.5 — "Test functionality"
 *
 * Frame: BS 7671 Reg 643.10 — assemblies, switchgear, drives, controls and
 * interlocks shall be functionally tested. RCD trip-time verification (per
 * Reg 643.7.3 / 643.8) is the most heavily regulated functional test — at
 * 1 × IΔn, ≤ 300 ms general non-delay; the integral test button alone is
 * not enough, instrument-based RCD test is mandatory.
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

const TITLE = 'Test functionality | Level 2 Module 4.6.5 | Elec-Mate';
const DESCRIPTION =
  'Functional testing per BS 7671 Reg 643.10 — switchgear, controls, interlocks and emergency stops, plus mandatory instrument-based RCD trip-time testing per Reg 643.7.3 and 643.8 (≤ 300 ms at 1 × IΔn for general non-delay).';

const checks = [
  {
    id: 'm4-s6-sub5-rcd-trip-time-30ma',
    question:
      'A 30 mA Type AC RCD protecting a kitchen ring final. You instrument-test at 1 × IΔn (30 mA test current). What is the maximum permitted trip time per BS 7671 A4:2026 Reg 643.7.3 / 643.8?',
    options: [
      '300 ms',
      '40 ms',
      '10 ms',
      '500 ms',
    ],
    correctIndex: 0,
    explanation:
      'A4:2026 redrafted RCD testing — regardless of RCD Type, "an alternating current test at rated residual operating current (IΔn) is used to verify the effectiveness". For a general non-delay-type RCD: trip time ≤ 300 ms maximum at 1 × IΔn. (For delay "S" type RCDs: between 130 ms minimum and 500 ms maximum at 1 × IΔn.) Note: 40 ms is the older requirement for the 5 × IΔn test that A4:2026 deleted from the regulations — Table 3A in Appendix 3 was deleted in A4:2026.',
  },
  {
    id: 'm4-s6-sub5-test-button-vs-instrument',
    question:
      'Why is the integral RCD test button alone insufficient for verifying RCD effectiveness during initial verification?',
    options: [
      'The button only proves the trip mechanism (electromechanical or electronic latch + tripping spring) operates — it does not prove the residual-current-sensing transformer and electronics are detecting an actual residual current. An instrument-based test injects a real residual current of 30 mA at IΔn and measures the trip time, verifying the complete protective function.',
      'Health hazard pictogram — silhouetted figure with star burst on chest. Covers carcinogenicity, mutagenicity, reproductive toxicity, respiratory sensitisation, target organ toxicity (single or repeated exposure), aspiration hazard. Distinguishes long-term / chronic risks from acute toxicity (skull).',
      'Match the medium to the message. Quick coordination = verbal or radio. Contractual change = written. Geometry or position = visual (photo, sketch, redline). Permanent record = formal (RAMS, certificate, variation order). The wrong medium for the message either burns time (formal letter for a quick query) or burns money (WhatsApp message for a contract change).',
      'Politely ask for two minutes to read it before signing. Signing the RAMS sign-on sheet is a positive declaration that you have read it, understood it, and will work to it. If something goes wrong later and the document had a defect you could have spotted on a quick read, your signature on the front is evidence against you. Two minutes of reading at the briefing is non-negotiable.',
    ],
    correctIndex: 0,
    explanation:
      'The integral test button connects a small resistor between line and earth on the load side of the RCD core, generating an artificial residual current sufficient to trip the device. It tests the trip latch and mechanical operation — but it does not exercise the full residual-current-sensing path with a calibrated current at IΔn. The instrument test (Reg 643.7.3 / 643.8) injects a known current via the test instrument and measures the actual response time. Both tests have their place: instrument test at initial verification and EICR; user test button at handover and recommended periodic operation by the user (typically every six months).',
  },
  {
    id: 'm4-s6-sub5-functional-scope',
    question:
      'Which of the following falls within the scope of BS 7671 Reg 643.10 (functional testing)?',
    options: [
      'The voltage factors C used in the determination of fault currents and earth fault loop impedances — including Cmax (1.05 or 1.10) and Cmin (0.95) and the rationale for their use in Reg 411.4.5 and Reg 434.5 calculations.',
      'Account-for personnel from the firm; ensure customers / visitors in your care have evacuated; liaise with the building\\\\\\\\\\\\\\\'s responsible person and fire-marshal at the muster point; provide accurate information to fire service if asked; prevent re-entry; preserve the scene afterwards if relevant to your firm\\\\\\\\\\\\\\\'s work.',
      'Gather and preserve facts at the scene; provide a contemporaneous written account; notify the responsible person immediately; assist with form completion if asked; provide witness information; preserve evidence; cooperate with any HSE follow-up. The operative isn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t normally the report-maker but is the source of the facts.',
      'All of: switchgear and controlgear assemblies; drives; controls and interlocks; emergency switching and emergency stopping systems; insulation monitoring (where fitted); plus the manual test facility on AFDDs and the test facility on RCDs. The list is non-exhaustive.',
    ],
    correctIndex: 3,
    explanation:
      'Reg 643.10 lists examples (non-exhaustive): switchgear and controlgear assemblies, drives, controls and interlocks, emergency switching/stopping systems, insulation monitoring. The regulation also explicitly requires verification of any test facility on protective devices including RCDs and AFDDs. The test is not limited to the listed examples — anything in the installation that has a functional purpose (e.g. door interlocks, lift floor sensors, motor reversers, building management interfaces) must be functionally proven to work as designed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 A4:2026 deleted Table 3A from Appendix 3 (the old time/current performance criteria for RCDs). What replaced it?',
    options: [
      '(a) Every fuse and single-pole control / protective device is in the line conductor only; (b) for circuits with an earthed neutral, ES and BC lampholders have the outer or screwed contacts connected to neutral (except E14/E27 to BS EN 60238); (c) wiring is correctly connected throughout.',
      'A simplified rule: regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify effectiveness, with trip time ≤ 300 ms for general non-delay type and 130-500 ms for delay "S" type.',
      'Define the problem, gather information, identify possible causes, test each hypothesis systematically, implement the solution, verify the fix, and document the process',
      'To ensure correct phase identification is maintained across the joint — incorrect phasing can cause motor reversal, equipment damage, or dangerous cross-connections',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 simplified the RCD test regime. Old approach (with Table 3A): different test currents (½ × IΔn, 1 × IΔn, 5 × IΔn) and different trip-time limits per RCD type (AC, A, F, B). New approach: a single AC test at IΔn, single trip-time limit per category — 300 ms for general non-delay, 130-500 ms for type S delay. Effective from A4:2026 onwards. The half-IΔn test (RCD must NOT trip at half rated) is also still good practice but is no longer the central acceptance criterion for the type-specific trip times.',
  },
  {
    id: 2,
    question: 'A 30 mA Type A RCBO on a kitchen ring final tests at trip time 28 ms at 1 × IΔn. Pass or fail per A4:2026?',
    options: [
      'Better heat dissipation allows higher current capacity because I²R losses can be removed more effectively',
      'Prolonged crawling, lying, and dragging loads in extremely restricted space, with no ability to use normal lifting techniques',
      'Pass — well below the 300 ms maximum for general non-delay type, indicating a healthy RCD with margin.',
      'It demonstrates genuine competence — a technician who can diagnose any fault, not just familiar ones',
    ],
    correctAnswer: 2,
    explanation:
      '28 ms at 1 × IΔn for a 30 mA general non-delay RCBO is comfortably below the 300 ms limit and well within typical performance for a healthy device (most quality RCBOs trip in 20-50 ms at IΔn). Document on the STR. If you also performed the optional 5 × IΔn test for confidence, expect ≤ 40 ms historically — though this is no longer a regulatory acceptance criterion under A4:2026, many test instruments and guidance still report it.',
  },
  {
    id: 3,
    question: 'During functional testing of switchgear interlocks on a TP+N distribution board, what would you check?',
    options: [
      'Older terminology — IV (Internal Verifier) was the predecessor name for what\\\\\\\'s now IQA (Internal Quality Assurer). Same role. Older qualifications used IV terminology (V1 / V2 awards); current qualifications use IQA terminology (Level 4 Award/Certificate in Internal Quality Assurance). If you see \\\\\\\'IV\\\\\\\' on a job advert it almost always means IQA in modern terminology.',
      'Fluorescent tubes (mercury-containing, EWC 20 01 21* — the asterisk denotes hazardous), oil-filled transformers and capacitors containing PCBs (EWC 16 02 09*), batteries containing lead, mercury or cadmium (EWC 16 06 01* and similar), asbestos-cement consumer unit backplates from older installations (EWC 17 06 05*), and waste oils. The asterisk in the EWC code is the marker for absolute hazardous waste.',
      'Operation of mechanical interlocks (e.g. door interlock prevents opening while energised, key interlock prevents racking out a circuit-breaker without permit), confirmation that emergency-off devices break the supply, manual operation of the main switch under load (where safe), and that any control circuit logic (contactors, relays, time delays) operates as designed.',
      'Apprentices complete practical tasks (Concrete Experience), reflect during the task (reflection-in-action), discuss afterwards (reflection-on-action and Reflective Observation), draw conclusions (Abstract Conceptualisation), and apply improvements on the next task (Active Experimentation)',
    ],
    correctAnswer: 3,
    explanation:
      'Functional testing of switchgear is broader than just pressing buttons — it includes verifying mechanical interlocks, key interlocks, emergency stops, contactor and relay operation, control circuit logic, time-delay sequencing, and that the assembly operates as the design documents specify. The point is to prove the switchgear assembly does what it was designed to do under realistic operational conditions.',
  },
  {
    id: 4,
    question: 'BS 7671 Reg 415.1.1 — the use of RCDs with a rated residual operating current not exceeding 30 mA is recognised in:',
    options: [
      'A diverse range including completed work orders, test certificates, risk assessments, method statements, witness testimonies, and reflective accounts that map to specific areas of the standard',
      'AC systems as additional protection in the event of failure of the provision for basic protection and/or the provision for fault protection or carelessness by users.',
      'If used exclusively when problem-focused coping is possible, it can prevent the stressor from being resolved and prolong suffering',
      'A fine mineral dust generated by cutting, drilling, or grinding materials containing silica such as concrete, sandstone, and morite',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 415.1.1 verbatim — defines the additional-protection function of 30 mA RCDs. Functional testing of these RCDs at IΔn confirms they will deliver that additional-protection function in service. The function is: catch faults that bypass basic and fault protection, and reduce the risk of fatal shock from user carelessness (e.g. cutting a cable while the device is plugged in).',
  },
  {
    id: 5,
    question: 'BS 7671 Reg 411.3.3 in A4:2026 — RCD additional protection on socket-outlets:',
    options: [
      'A poor power factor increases current draw for the same real power, causing overheating in cables and equipment, increased losses, higher electricity costs from reactive power charges, and may indicate failing capacitors that need replacement during maintenance',
      'Revised to apply to socket-outlets with a rated current not exceeding 32 A. There is an exception to omit RCD protection where, other than for a dwelling, a documented risk assessment determines that RCD protection is not necessary.',
      'Observe operatives at work, identify unsafe practices, intervene immediately, coach to correct method, document, follow up. The observation is not a "checking up" exercise but part of the firm\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s monitoring under MHSWR Reg 5.',
      'Each test depends on the previous (continuity of CPC must be proven before IR can be interpreted; earthing must be proven before live tests rely on it; functional last because it confirms the whole system works)',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 expanded the rated-current threshold for mandatory RCD protection on socket-outlets to 32 A (was 20 A previously in A2). The risk-assessment exception remains for non-dwelling installations. For functional testing this means verifying every 30 mA RCD protecting a socket-outlet trips within 300 ms at 1 × IΔn — the test is mandatory on initial verification of any installation with sockets up to 32 A.',
  },
  {
    id: 6,
    question: 'You are functional-testing the manual test button on an AFDD (arc fault detection device). The device clicks but the LED status indicator does not change. What action?',
    options: [
      'The line conductor. The exposed screw thread of the lampholder must be connected to neutral so it is at near-zero potential when accessible (e.g. when changing a bulb). The deeper centre contact, less easily touched, is connected to line. Reverse polarity at a screw lampholder means a user changing a bulb can touch a live screw thread.',
      'You must confirm that the rating and condition of the existing equipment, including that of the distributor (cut-out fuse, service cable capacity, declared earth fault loop impedance, declared maximum demand), is adequate for the altered circumstances. Only then do you design the addition.',
      'Suspect — verify per the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s procedure (Reg 643.10 explicitly requires the AFDD test facility to be verified per manufacturer recommendations). If the LED should change state and doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t, the AFDD has a fault — replace.',
      'Cooperate (HASAWA s.7 + CDM Reg 15). Confirm your name and role. Direct the inspector to the senior person on site (supervisor, contracts manager, site manager). Answer factual questions truthfully — interfering with an inspector is a separate offence under HASAWA s.33. If asked technical questions outside your competence, say so honestly. Do not speculate or guess. Notify your firm immediately.',
    ],
    correctAnswer: 2,
    explanation:
      'AFDDs introduced in A4:2026 require functional testing per the manufacturer\'s procedure. Most have a status LED that changes state when the manual test is operated correctly. If it doesn\'t, the device may have an internal fault — consult the manufacturer datasheet for the expected indication and follow the troubleshooting flow. If the device cannot be confirmed to operate correctly per manufacturer procedure, it must be replaced before sign-off.',
  },
  {
    id: 7,
    question: 'A 100 mA delay-type S RCD at the incoming side of a sub-mains feed. You instrument-test at 1 × IΔn. What trip time range is acceptable per A4:2026?',
    options: [
      'Disturbing existing terminations may have loosened them; the cpc integrity of the whole circuit (origin to all accessories) must be re-confirmed before energising',
      'A duty to cooperate with their employer and other persons so far as is necessary to enable compliance with health and safety requirements',
      'C2 — incorrect identification is potentially dangerous because the next person to work on the circuit may be misled into believing a conductor is dead when it is live.',
      'Between 130 ms minimum and 500 ms maximum — the delay range is built into the spec to provide selectivity with downstream 30 mA RCDs.',
    ],
    correctAnswer: 3,
    explanation:
      'Type S RCDs are designed with an intentional time delay so that downstream 30 mA RCDs can clear faults first (selectivity). At 1 × IΔn, an S-type must take at least 130 ms to allow the downstream RCD to operate, but no more than 500 ms to provide effective backup. Outside this window the device is faulty or wrongly specified and must be replaced.',
  },
  {
    id: 8,
    question: 'After functional testing, where do RCD trip times go on the schedule of test results?',
    options: [
      'Dedicated RCD column(s) on the per-circuit row of the STR — typically headed "RCD trip time at IΔn" with sub-columns for the test current used and the measured trip time. Plus a note that the user test facility was verified.',
      'High criticality (A) because its failure would stop production, there is no redundancy, and the consequences include significant lost production and potential supply chain impacts',
      'A diverse range including completed work orders, test certificates, risk assessments, method statements, witness testimonies, and reflective accounts that map to specific areas of the standard',
      'Maintain a balanced routine — light review of key topics, brief practical practice, adequate sleep, healthy eating, and activities that help you relax and maintain perspective',
    ],
    correctAnswer: 0,
    explanation:
      'IET model STR has dedicated columns for RCD operating data — typically rated residual operating current (IΔn) of the device, and the measured trip time. Modern instruments (Megger MFT1741, Fluke 1664FC) auto-record the test details and you transcribe to the form. The Schedule of Inspections also confirms RCD test was carried out at the high-level certificate stage.',
  },
];

const faqs = [
  {
    question: 'Why did A4:2026 delete the old 5 × IΔn / 0.5 × IΔn test regimen?',
    answer:
      'Two reasons. First, simplification: the old Table 3A was complex and varied per RCD type (AC, A, F, B), creating room for error in test setup and acceptance interpretation. Second, modernisation of testing techniques: modern test instruments perform a ramp test (gradually increasing current from zero until trip) which gives both the actual trip current and the trip time at IΔn in one measurement, more diagnostic than a fixed-current test. The simplified A4:2026 acceptance — single AC test at IΔn, ≤ 300 ms for general non-delay — captures what matters without the complexity. The 5 × IΔn test is still useful for diagnostics and is still reported by most instruments, but it is no longer a regulatory acceptance criterion.',
  },
  {
    question: 'Do I still need to test the half-IΔn case (RCD must NOT trip at 0.5 × IΔn)?',
    answer:
      'Good practice and many test instruments do this automatically before the trip-time test. The half-IΔn check confirms the RCD is not tripping below its rated residual current — a device that trips at 15 mA on a 30 mA rating is over-sensitive and would cause nuisance tripping in service. A4:2026 does not list this as a mandatory regulatory acceptance test, but it is industry standard practice and is reported by all current MFTs as part of the standard RCD test sequence.',
  },
  {
    question: 'Functional test of an emergency-off device — what does that involve?',
    answer:
      'Emergency stops (the big red mushroom buttons) must be tested under realistic operational conditions per Reg 643.10. Energise the equipment they protect, operate the emergency-off device, confirm the equipment de-energises immediately and that downstream contactors / relays drop out. Test reset behaviour: pulling the button or twisting it should reset the device, but the equipment should not auto-restart — manual restart should be required (per industry safety practice). Document on the functional test row of the STR.',
  },
  {
    question: 'Drives and motor starters — anything beyond pressing start and stop?',
    answer:
      'For a basic motor starter (single contactor with overload protection) — verify start and stop function correctly, the overload trip operates when manually tested or when the test current is applied, the auto-reset behaves as designed, any latching circuit re-engages correctly. For VFDs (variable frequency drives) — verify the soft-start / soft-stop sequence runs as configured, the drive\'s integral safety functions (STO, SS1) operate when activated, and that the drive\'s own diagnostic LEDs / display show no faults at idle. Always test with the load disconnected first to verify drive behaviour, then with load to verify the complete system.',
  },
  {
    question: 'Insulation monitoring devices on IT systems — how is functional testing different?',
    answer:
      'IT systems (deliberately unearthed, used in some special installations like operating theatres) include an insulation monitoring device (IMD) per Reg 411.6. Functional test: simulate an earth fault by connecting a known resistor between a live conductor and earth on the IT system; confirm the IMD detects and signals the fault correctly within its rated time. Verify the IMD\'s integral test button operates correctly. Most IMDs have a built-in test sequence per manufacturer instructions — follow those.',
  },
  {
    question: 'How often does the user need to operate the RCD test button after handover?',
    answer:
      'Industry guidance: at least every six months. Some manufacturers recommend monthly testing. The handover documentation should make this clear to the customer and many EICs include a note. The test button proves the RCD trip mechanism is still operational — it does not replace the periodic instrument-based test (typically every five years for domestic, more often for higher-risk installations) that you perform as the electrician.',
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 5"
            title="Test functionality"
            description="Functional verification of switchgear, controls, interlocks, emergency stops and protective devices — including the mandatory instrument-based RCD trip-time test per BS 7671 A4:2026 (≤ 300 ms at 1 × IΔn for general non-delay)."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS 7671 Reg 643.10 requires functional testing of all assemblies — switchgear, controlgear, drives, controls, interlocks, emergency switching, insulation monitoring — to verify they operate as designed.',
              'RCD trip-time verification is the most heavily regulated functional test. A4:2026 simplified the regime: a single AC test at 1 × IΔn, ≤ 300 ms for general non-delay, 130-500 ms for delay-type S. Table 3A from Appendix 3 was deleted in A4:2026.',
              'The integral RCD test button is NOT sufficient on its own — it tests only the trip mechanism. Instrument-based RCD testing (per Reg 643.7.3 and 643.8) is mandatory at initial verification and at every periodic inspection.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Carry out instrument-based RCD trip-time testing at 1 × IΔn per A4:2026 Reg 643.7.3 / 643.8.',
              'Differentiate trip-time acceptance for general non-delay (≤ 300 ms) and delay-type S (130-500 ms) RCDs.',
              'Functionally test switchgear assemblies including main isolators, distribution boards and interlocks.',
              'Functionally test emergency switching and emergency stop systems and verify reset behaviour.',
              'Functionally test the manual test facility on RCDs and AFDDs per manufacturer procedure.',
              'Cite Reg 643.10 (functional testing scope), Reg 643.7.3/643.8 (RCD verification), Reg 415.1.1 (RCD additional protection) and Reg 411.3.3 (socket RCD requirement, A4:2026 update to 32 A).',
              'Record functional and RCD trip-time results on the schedule of test results.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Scope of functional testing</ContentEyebrow>

          <ConceptBlock
            title="What Reg 643.10 covers"
            plainEnglish="Anything in the installation with a function — switchgear, drives, interlocks, emergency stops, monitoring systems, plus the test facilities on RCDs and AFDDs — must be functionally proven."
            onSite="On a domestic install the bulk of functional testing is RCD trip-time verification. On a commercial / industrial install you add interlocks, contactors, control sequences, motor starters and so on. Plan the sequence: test in a safe order with loads disconnected first."
          >
            <p>
              Reg 643.10 functional testing covers (non-exhaustive list):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switchgear and controlgear assemblies</strong> — main switches, isolators,
                distribution boards, and the mechanical interlocks within them. Verify operation
                under load (where safe), correct latching / unlatching, and that mechanical
                interlocks prevent unsafe operations (e.g. opening an enclosure while energised).
              </li>
              <li>
                <strong>Drives</strong> — variable-frequency drives, soft-starts, motor starters,
                contactor-and-overload combinations. Verify start, stop, overload trip and reset.
              </li>
              <li>
                <strong>Controls and interlocks</strong> — sequencing logic, time delays, key
                interlocks for racking circuit-breakers, door interlocks, lift safety circuits.
              </li>
              <li>
                <strong>Emergency switching and emergency stopping systems</strong> — the big red
                mushroom buttons and the chains of devices they activate. Test under realistic
                operational conditions and verify the whole shutdown sequence.
              </li>
              <li>
                <strong>Insulation monitoring</strong> on IT systems where fitted (Reg 411.6).
              </li>
              <li>
                <strong>Test facilities on RCDs</strong> — the integral test button must operate
                correctly per Reg 643.10. This is in addition to the instrument-based RCD test
                of Reg 643.7.3 / 643.8.
              </li>
              <li>
                <strong>Test facilities on AFDDs</strong> — manufacturer-defined test procedure.
                A4:2026 requires the AFDD test facility to be verified.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.10 (Functional testing) — verbatim, edited"
            clause="Equipment shall be subjected to functional testing, as appropriate, to verify that it is properly mounted, adjusted and installed and operates correctly in accordance with the relevant requirements of BS 7671. Examples of such equipment are: (a) switchgear and controlgear assemblies, drives, controls and interlocks; (b) systems for emergency switching off and emergency stopping; (c) insulation monitoring. NOTE 1: This list is not exhaustive. Protective devices shall be submitted to a test of their function, as necessary, to check that they are properly installed and adjusted. Where fault protection and/or additional protection is provided by an RCD, the effectiveness of any test facility incorporated in the device shall be verified. Where an AFDD is installed the effectiveness of any manually operated test facility shall be verified in accordance with the manufacturers\' recommendations."
            meaning={
              <>
                The list is examples, not the complete scope — anything functional in the
                installation must be functionally tested. The regulation also makes clear that
                both the test facility on protective devices (the user test button) and the
                regulation-mandated instrument tests (Reg 643.7.3, 643.8) must be carried out for
                RCDs and AFDDs.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.10."
          />

          <SectionRule />

          <ContentEyebrow>RCD trip-time testing — the A4:2026 method</ContentEyebrow>

          <ConceptBlock
            title="Instrument-based RCD test at 1 × IΔn"
            plainEnglish="The MFT injects a known AC residual current at the rated trip current of the RCD. It measures how long until the device opens. For general non-delay, ≤ 300 ms. For Type S delay, 130-500 ms."
            onSite="A4:2026 simplified the test. One test current (1 × IΔn). One acceptance criterion per RCD category. Old Table 3A in Appendix 3 (with type-specific 5 × IΔn tests at varying limits) was deleted."
          >
            <p>The A4:2026 RCD trip-time test method:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify the RCD characteristics:</strong> rated residual operating
                current (IΔn) and type (general non-delay or delay-type S). For domestic 30 mA
                Type A or AC RCBOs, IΔn = 30 mA, type = general non-delay.
              </li>
              <li>
                <strong>Connect the MFT</strong> across the load side of the RCD — typically by
                plugging into a downstream socket on a circuit protected by the RCD. The
                instrument injects test current via the L and CPC of that socket.
              </li>
              <li>
                <strong>Set the test parameters:</strong> AC test current = 1 × IΔn (e.g. 30 mA
                for a 30 mA RCD). Test phase = 0° and 180° (most MFTs do both automatically and
                report the worst case).
              </li>
              <li>
                <strong>Press TEST.</strong> The instrument injects the test current; the RCD
                trips; the meter records the trip time. Reset the RCD before the next test.
              </li>
              <li>
                <strong>Compare to acceptance:</strong>
                <ul className="space-y-1 list-disc pl-5 marker:text-elec-yellow/70 mt-1.5">
                  <li>General non-delay: ≤ 300 ms maximum.</li>
                  <li>Delay-type S: between 130 ms minimum and 500 ms maximum.</li>
                </ul>
              </li>
              <li>
                <strong>Record the trip time</strong> on the STR in the RCD column.
              </li>
            </ol>
            <p>
              Most modern MFTs also automatically perform a 0.5 × IΔn pre-test (RCD must NOT trip
              at half rated current) and may report the older 5 × IΔn result for diagnostic
              continuity. These auxiliary tests are good practice but A4:2026 acceptance is based
              on the 1 × IΔn trip time alone.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.7.3 (RCD trip-time verification — TN system clause)"
            clause={'The effectiveness of automatic disconnection of supply by RCDs shall be verified using suitable test equipment according to BS EN 61557-6 (see Regulation 643.1) to confirm that the relevant requirements of Chapter 41 are met, taking into account the operating characteristic of the device. NOTE: Regardless of RCD Type, effectiveness is deemed to have been verified where an RCD disconnects within the time stated below with an alternating current test at rated residual operating current (IΔn): (a) for general non-delay type, 300 ms maximum; (b) for delay "S" type RCD, between 130 ms minimum and 500 ms maximum.'}
            meaning={
              <>
                The new A4:2026 acceptance criteria. Single AC test at IΔn. Single trip-time limit
                per RCD category. Old type-specific Table 3A is deleted. Use a calibrated MFT to
                BS EN 61557-6, run the test, record the trip time, compare to ≤ 300 ms (non-delay)
                or 130-500 ms (delay-type S).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 643.7.3 (NOTE clause) — verbatim from DB."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.8 (Additional protection) — verbatim"
            clause="The verification of the effectiveness of the measures applied for additional protection is fulfilled by visual inspection and testing. Where RCDs are required for additional protection, the effectiveness of automatic disconnection of supply by RCDs shall be verified using suitable test equipment according to BS EN 61557-6 (see Regulation 643.1) to confirm that the relevant requirements of Chapter 41 are met. NOTE: Regardless of RCD Type, effectiveness is deemed to have been verified where an RCD disconnects within the time stated below with an alternating current test at rated residual operating current (IΔn): for general non-delay type, 300 ms maximum."
            meaning={
              <>
                Reg 643.8 is the additional-protection variant. Same test (AC at IΔn), same
                acceptance (300 ms maximum for general non-delay). Reg 415.1.1 defines the
                additional-protection function of 30 mA RCDs in AC systems; Reg 411.3.3 mandates
                them on socket-outlets up to 32 A (A4:2026 update). The functional verification
                under Reg 643.8 ties them all together: every 30 mA RCD on a circuit must be
                instrument-tested.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.8."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Why the test button alone isn\'t enough</ContentEyebrow>

          <ConceptBlock
            title="Test button versus instrument test — what each one proves"
            plainEnglish="Test button: proves the trip mechanism works. Instrument test: proves the residual-current sensing electronics also work, AND measures the trip time against the regulatory acceptance."
            onSite="A device that fails the integral test button is definitely faulty — replace immediately. A device that passes the test button might still fail the instrument test for slow trip time or sensing failure. Both tests are required."
          >
            <p>How an RCD works internally:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Line and neutral conductors pass through a current transformer (CT). Under normal
                operation the magnetic fields of L and N cancel out (currents balanced) — the CT
                output is zero.
              </li>
              <li>
                When a residual current (e.g. line-to-earth fault, leakage to ground) creates an
                imbalance between L and N currents, the CT output becomes non-zero.
              </li>
              <li>
                The CT output is fed to a sensing circuit (electromechanical or electronic) that
                triggers when the residual current exceeds the rated IΔn.
              </li>
              <li>The trigger releases a tripping spring that opens the contacts.</li>
            </ol>
            <p>
              The integral test button bypasses the CT entirely — it connects a small resistor
              between the load-side L and the supply-side N (or similar arrangement) to inject an
              artificial residual current via a path that does NOT exercise the CT. This proves
              the trigger mechanism and the spring work, but says nothing about whether the CT
              and sensing electronics are correctly detecting real residual currents.
            </p>
            <p>
              The instrument test injects a real residual current via the load-side L and CPC of
              a downstream socket — exactly the same path a real fault current would follow. The
              CT must sense the imbalance correctly, the electronics must detect it within the
              rated time, and the trip mechanism must operate. Full system test.
            </p>
            <p>
              Both tests have their place. The instrument test is mandatory at initial verification
              and at every EICR (periodic inspection). The integral test button is exercised by
              the user every six months as part of operational maintenance.
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

          <ContentEyebrow>Switchgear, interlocks and emergency stops</ContentEyebrow>

          <ConceptBlock
            title="Functional testing on switchgear and assemblies"
            plainEnglish="Operate every switch, interlock, contactor and control sequence under realistic conditions. Confirm each one does what the design says it should do."
            onSite="Plan the test sequence safely. Test interlocks with the equipment de-energised first. Then test under load only where safe and where the design requires it (e.g. emergency stop must drop the load to confirm function)."
          >
            <p>For a typical commercial / industrial switchboard:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main isolator</strong> — verify on/off operation, padlocking facility
                (locks in the off position), and any auxiliary contacts that signal the
                isolator state to a control system.
              </li>
              <li>
                <strong>Door interlocks</strong> — open the panel door with the equipment
                de-energised: should be possible. Energise: door must lock or refuse to open
                without operating the isolator first. Some assemblies have key interlocks where a
                key released by the isolator is needed to unlock the door.
              </li>
              <li>
                <strong>Racking interlocks on draw-out circuit-breakers</strong> — circuit-breaker
                must be in the off position before it can be racked from service to test or test
                to disconnected positions. Verify both directions.
              </li>
              <li>
                <strong>Contactor logic</strong> — for control circuits with start / stop / latch
                arrangements, verify the latch engages on start, drops out on stop, and that any
                interlocks (e.g. forward-reverse mutual exclusion) work correctly.
              </li>
              <li>
                <strong>Time delays</strong> — soft-starts, dahlander motor starting sequences,
                star-delta starters: verify the time-delayed transitions occur correctly.
              </li>
              <li>
                <strong>Emergency stops</strong> — energise the protected equipment, operate the
                E-stop, confirm the equipment de-energises immediately. Reset the E-stop
                (typically twist or pull); confirm the equipment does NOT auto-restart and that
                manual restart via the normal start sequence works correctly.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Why the integral RCD test button isn't enough on its own"
            plainEnglish="The test button proves the trip mechanism (latch + spring) operates. It does NOT prove the residual-current-sensing transformer and electronics are detecting an actual residual current. Both are required for a working RCD — the instrument-based test exercises the full path."
            onSite="Press the test button as part of functional testing per Reg 643.10. Then run the instrument test at 1 × IΔn per Reg 643.7.3 / 643.8. Both readings, both recorded."
          >
            <p>How the integral test button is wired internally:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                The button typically connects a small resistor between the load-side L and the
                supply-side N (or a similar arrangement) — bypassing the current transformer
                entirely.
              </li>
              <li>
                Pressing the button causes a small artificial current to flow through that
                bypass path, generating an imbalance the trip electronics see (if working) and
                triggering the trip mechanism.
              </li>
              <li>
                The trip latch releases the contacts; the device opens.
              </li>
            </ol>
            <p>
              What the button proves: the trip electronics + the trip mechanism work. What it
              does NOT prove:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The current transformer is correctly sensing real residual currents (the button
                bypasses the CT entirely).
              </li>
              <li>
                The trip time at the rated IΔn meets the regulatory acceptance (the button just
                ensures it trips, not how fast).
              </li>
              <li>
                The device responds correctly to the full range of fault current waveforms that
                its type rating requires (Type A vs Type AC vs Type B sensing differences).
              </li>
            </ul>
            <p>
              The instrument test (with the MFT injecting a calibrated AC current at 1 × IΔn
              via the load-side L and CPC of a downstream socket) exercises the complete path
              from real residual-current sensing through to trip mechanism operation, and gives
              you the trip time figure that Reg 643.7.3 and 643.8 demand. Both tests serve
              different purposes; both are required.
            </p>
            <p>
              On periodic inspections (EICR), the user is also expected to operate the integral
              test button at least every six months — a quick functional check that the trip
              mechanism is still operational. Many manufacturers recommend monthly testing.
              Document this expectation on the customer handover pack.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Type AC vs Type A vs Type B RCDs — when each is required"
            plainEnglish="RCD type defines what kinds of residual current waveforms the device can detect. Type AC sees only sine-wave AC. Type A also sees pulsating DC (common with single-phase electronics). Type B sees smooth DC plus the others (essential for three-phase converters and EV chargers). A4:2026 requirements have shifted strongly toward Type A and Type B as electronics proliferate."
            onSite="Reg 531.3.3 sets out the type selection rules. As a rule of thumb: domestic socket-outlets and lighting → Type A minimum. Three-phase EV chargers, PV inverters, certain VFDs → Type B."
          >
            <p>The three principal RCD types and where each applies:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type AC.</strong> Detects sinusoidal AC residual currents only. The
                cheapest and most basic type. NOT suitable for any circuit feeding electronics
                that produce pulsating DC residual currents (which is most modern electronics).
                Reg 531.3.3 has tightened restrictions on Type AC use under A4:2026 — for new
                installations, Type AC is now rare.
              </li>
              <li>
                <strong>Type A.</strong> Detects sinusoidal AC plus pulsating DC residual
                currents up to 6 mA smooth DC. Suitable for most domestic and commercial
                circuits including those feeding LED drivers, dimmers, washing machines,
                computer power supplies and similar single-phase electronics. The new domestic
                default — most current-edition CUs are populated with Type A RCBOs.
              </li>
              <li>
                <strong>Type F.</strong> Like Type A but with broader frequency response — for
                circuits with VFDs and similar. Less common; specialist applications.
              </li>
              <li>
                <strong>Type B.</strong> Detects sinusoidal AC, pulsating DC AND smooth DC
                residual currents. Required for three-phase converters, certain EV charger
                installations (Mode 3 chargers without integral DC fault detection), some PV
                inverters. More expensive and physically larger than Type A. Required by
                Reg 722.531.3.101 (electric vehicles) where the charger doesn't include its own
                Type A + 6 mA DC fault detection.
              </li>
            </ul>
            <p>
              <strong>Functional testing implications:</strong> instrument-based RCD test must
              use a test waveform appropriate for the RCD type. Modern MFTs auto-detect the type
              or let you select it; the trip-time test at 1 × IΔn is the same acceptance
              regardless of type (≤ 300 ms general non-delay). But specifying the wrong type for
              the load is a design defect that no amount of testing will fix — the device
              physically cannot detect the fault waveforms the load can produce.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="RCBOs vs RCDs in the consumer unit — testing differences"
            plainEnglish="An RCBO combines overcurrent protection (MCB function) and residual-current detection (RCD function) in one device, per circuit. A standalone RCD (the older CU style) covers a group of circuits. Testing a group RCD trips the whole group; testing per-circuit RCBOs only trips one circuit at a time. Per-circuit testing is faster and more diagnostic."
            onSite="Modern domestic CU swaps go all-RCBO precisely because of this — when one circuit faults, only that circuit trips. Functional testing is faster too: 30 seconds per RCBO with the rest of the CU staying live."
          >
            <p>The architectural and testing differences:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>All-RCBO CU.</strong> Each protective device is a combined MCB+RCD per
                circuit. Functional testing: plug MFT into a downstream socket, run the 1 × IΔn
                test, only that one circuit trips. Reset the RCBO. Move to the next circuit.
                The rest of the installation stays live. Fast, diagnostic, customer-friendly
                because their freezer doesn't defrost during testing.
              </li>
              <li>
                <strong>Older split-load CU with group RCDs.</strong> Two main RCDs cover
                groups of circuits. Functional testing: the test trips the whole group RCD,
                taking down 4-6 circuits at once. Slower, less diagnostic (you can tell the RCD
                works but not which circuit caused a real-world trip), and disruptive (large
                portions of the install go dark each time you test). Many older CUs have only
                one RCD covering the whole installation — testing it kills everything.
              </li>
              <li>
                <strong>Hybrid arrangements.</strong> Some commercial / industrial installations
                have a mix — 100 mA Type S delay RCD at the incoming side for selectivity,
                30 mA Type A RCBOs per circuit downstream. Testing has two phases: per-circuit
                RCBO testing first; then the upstream delay RCD test (will not trip during
                downstream tests due to the time delay).
              </li>
            </ul>
            <p>
              <strong>Isolation impact during testing:</strong> on an all-RCBO board, testing is
              one circuit at a time and the rest of the board stays live. Plan accordingly —
              warn the customer if their freezer is on the test target circuit. On a group-RCD
              board, the whole group goes down — schedule testing when the customer can tolerate
              the disruption. Document the testing approach on the STR.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Functional testing of switchgear interlocks, isolators, and emergency stops"
            plainEnglish="Beyond RCDs, Reg 643.10 covers the full assembly — every isolator, every interlock, every emergency stop, every contactor logic chain. Each one needs operating under realistic conditions and confirmed to behave as the design specifies."
            onSite="Plan the test sequence carefully. Test interlocks de-energised first (proves mechanical operation). Then where safe, test under load. Emergency stops MUST be tested under load — that's what they protect."
          >
            <p>Examples of functional testing across switchgear types:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main isolator.</strong> Operate on/off cycle. Verify padlock facility
                works in the OFF position. Verify any auxiliary contacts (signalling the
                isolator state to a control system) operate correctly with isolator state changes.
              </li>
              <li>
                <strong>Door interlocks.</strong> With the panel de-energised, the door should
                open freely. With the panel energised, the door should be locked or refuse to
                open without operating the isolator first. Some assemblies use key interlocks —
                a key released by the isolator is needed to unlock the door, ensuring the door
                cannot be opened while live.
              </li>
              <li>
                <strong>Racking interlocks on draw-out circuit-breakers.</strong> The breaker
                must be in the OFF position before it can be racked from service to test or
                test to disconnected positions. Verify both directions. The interlock should
                physically prevent racking with the breaker closed.
              </li>
              <li>
                <strong>Contactor and relay control circuits.</strong> Start/stop/latching
                arrangements: verify the latch engages on start, drops out on stop, that
                interlocks (forward-reverse mutual exclusion etc.) work correctly. Time delays:
                verify soft-start, dahlander, star-delta sequences run as designed.
              </li>
              <li>
                <strong>Emergency stops and emergency switching.</strong> The big red mushroom
                buttons. Test under load: energise the protected equipment, operate the
                E-stop, confirm the equipment de-energises immediately and any downstream
                contactors drop out. Reset the E-stop (twist or pull); confirm equipment does
                NOT auto-restart and that manual restart via the normal start sequence works.
              </li>
              <li>
                <strong>Lift safety circuits.</strong> Door interlocks, floor sensors,
                over-travel limits, emergency lighting on the car. Test each in turn per the
                lift design specification.
              </li>
              <li>
                <strong>Insulation monitoring devices on IT systems</strong> (operating
                theatres, certain laboratories). Simulate an earth fault by connecting a known
                resistor between live and earth on the IT system; confirm the IMD detects and
                signals the fault correctly within its rated time.
              </li>
            </ul>
            <p>
              On a domestic install the bulk of functional testing is RCD trip-time
              verification. On a commercial / industrial install you build a comprehensive
              functional test plan from the design documents — every switching function,
              interlock and protective device gets exercised and the result documented.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Relying on the integral test button alone for RCD verification at sign-off"
            whatHappens={
              <>
                You energise a domestic CU, press the test buttons on each RCBO and confirm each
                one trips when the button is pressed. You sign off the EIC with "RCD test:
                pass". A week later the kitchen ring final develops a leakage fault — wet
                appliance, water tracking from L to E — and the RCBO fails to trip in time
                because the residual-current sensing electronics had a latent fault that the
                button test bypassed. The customer reports a shock and you are looking at a
                serious incident investigation.
              </>
            }
            doInstead={
              <>
                Always perform the instrument-based RCD test at 1 × IΔn for every RCD/RCBO at
                initial verification and at every EICR. Record the actual trip time on the STR.
                The test button is part of functional testing per Reg 643.10 (verify that test
                facility) but it is NOT the test that satisfies Reg 643.7.3 or 643.8 for RCD
                effectiveness. Both tests required, both recorded. Modern MFTs make the
                instrument test fast — about 30 seconds per RCD including the auto-recorded
                ramp test.
              </>
            }
          />

          <Scenario
            title="RCD test on a kitchen ring 30 mA Type A RCBO"
            situation={
              <>
                You have just commissioned a kitchen ring final on a domestic CU swap-out. The
                circuit is protected by a 32 A Type B Type A RCBO with IΔn = 30 mA. All dead
                tests have passed. The CU is energised. You need to confirm the RCD function and
                document for the EIC.
              </>
            }
            whatToDo={
              <>
                Plug the MFT RCD test lead into a downstream socket on the ring (any socket — the
                test exercises the whole circuit\'s residual-current path back to the RCBO).
                Select RCD test mode on the MFT. Set test current = 30 mA AC (1 × IΔn). The MFT
                will typically run a 0.5 × IΔn pre-test (15 mA — RCBO must NOT trip) and then
                ramp to the full test current; if available, also a 1 × IΔn fixed-current test
                that records the trip time. Press TEST. The RCBO trips; meter records trip time
                — for a healthy 30 mA RCBO, expect 20-50 ms.
                <br />
                <br />
                Reset the RCBO. Verify the integral test button operates (functional test per
                Reg 643.10). Re-test on the other test polarity (0° and 180°) — most MFTs do this
                automatically and report worst-case trip time.
                <br />
                <br />
                Document: trip time at 1 × IΔn = (e.g.) 28 ms, well below 300 ms maximum →
                pass. Test button function verified. Record on STR in the RCD trip-time column.
                Repeat for every RCD/RCBO in the CU. On a 12-circuit board with all RCBOs you
                will have 12 trip-time entries.
              </>
            }
            whyItMatters={
              <>
                The 28 ms trip time gives over an order of magnitude of headroom compared to the
                300 ms regulatory limit. If a circuit shows a trip time of, say, 250 ms — passing
                Reg 643.7.3 but at the edge — that is worth investigating. Most likely a
                slightly degraded device that will either drift over time (eventually exceeding
                300 ms) or that has a latent fault. Replace the device rather than sign off
                marginal performance — the cost of a replacement RCBO is trivial compared to the
                consequences of slow disconnection during a real fault.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Reg 643.10 requires functional testing of all assemblies — switchgear, controls, interlocks, emergency stops, drives, insulation monitoring, plus the test facilities on RCDs and AFDDs.',
              'A4:2026 simplified the RCD trip-time test: regardless of RCD type, a single AC test at 1 × IΔn. Acceptance: ≤ 300 ms for general non-delay, 130-500 ms for delay-type S.',
              'Old Appendix 3 Table 3A (type-specific 5 × IΔn tests at varying limits) was DELETED in A4:2026. Modern test instruments still report 5 × IΔn for diagnostic continuity but it is no longer a regulatory acceptance criterion.',
              'The integral RCD test button alone is INSUFFICIENT — it tests only the trip mechanism. Mandatory instrument-based RCD test (per Reg 643.7.3 / 643.8) exercises the full sensing-and-trip path with a real residual current.',
              'Reg 415.1.1 — 30 mA RCDs as additional protection in AC systems. Reg 411.3.3 (A4:2026) — RCD protection on socket-outlets up to 32 A is mandatory; documented risk-assessment exception for non-dwellings only.',
              'Switchgear functional testing: verify isolators, door interlocks, racking interlocks, contactor logic, time delays, emergency stop sequences. Test under realistic operational conditions where safe.',
              'AFDD test facility: verify per manufacturer\'s recommended procedure. If the test facility cannot be confirmed working, replace the device before sign-off (Reg 643.10).',
              'Document RCD trip times per circuit on the STR; document functional test outcomes (pass/fail) for switchgear and other assemblies separately. Reg 644.1.1 requires defects to be corrected before EIC issue.',
            ]}
          />

          <Quiz title="Functional testing — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.4 Test polarity
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.6 Record test results
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
