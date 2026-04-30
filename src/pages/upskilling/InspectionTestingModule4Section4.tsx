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
    id: 'mod4-s4-why-500-damages',
    question:
      'Why does a 500 V DC IR test damage modern electronic loads if applied with the equipment connected?',
    options: [
      'It heats the windings until insulation cooks',
      'Switched-mode PSUs, LED drivers and dimmers contain Y-capacitors and clamping diodes that begin to conduct or break down at voltages well below 500 V DC, and SPDs by design clamp at much lower voltages — the 500 V DC pulse exceeds their internal voltage ratings',
      'The DC charges the cable into the GHz range',
      'It is purely a regulatory limit, not a physical effect',
    ],
    correctIndex: 1,
    explanation:
      'The damage mechanism is voltage stress on internal components rated for the operating voltage of the device. SPDs clamp at hundreds of volts AC peak and conduct heavily on a 500 V DC pulse. LED driver input filters use Y-caps that can puncture. Dimmer triacs can avalanche. The 250 V DC step in Reg 643.3.3 exists to provide a controlled stress these devices can survive while still revealing gross insulation breakdown.',
  },
  {
    id: 'mod4-s4-spd-handling',
    question:
      'Per the Reg 643.3.3 NOTE, what does the manufacturer typically require you to do with SPDs during an IR test?',
    options: [
      'Leave them connected — they are passive',
      'Disconnect them at the consumer-unit terminals before the test, complete both Table 64 and 250 V DC steps, then reconnect; record the disconnection in the schedule comments',
      'Replace them with new units after every test',
      'Test them at 1000 V to verify clamping voltage',
    ],
    correctIndex: 1,
    explanation:
      'Most SPD data sheets specify disconnection during IR testing because MOVs and gas-discharge tubes start to conduct at voltages below the typical IR test voltages — even at 250 V DC certain types show measurable leakage. Disconnect, perform both test steps, reconnect, and document the disconnection in comments so the next inspector knows the SPD was removed from the test path.',
  },
  {
    id: 'mod4-s4-mental-model',
    question:
      'A circuit feeds 24 LED drivers and an SPD. You want to verify the cable insulation independently of the connected loads. What is the right mental model?',
    options: [
      'Test once with everything connected and record the lowest reading',
      'Two-stage approach: first the cable alone at the Table 64 voltage (500 V DC) with vulnerable equipment disconnected; then the equipment-connected post-connection test at 250 V DC. Each step verifies a different scope and the schedule records both',
      'Insulation testing is optional on circuits with electronic loads',
      'Use AC at 230 V to mimic operating conditions',
    ],
    correctIndex: 1,
    explanation:
      'The all-or-nothing mental model — test everything at once — masks insulation defects in the cable behind the leakage of connected equipment. The two-stage approach the A4 redraft codifies is precisely to separate cable insulation health (Table 64 voltage on cable alone) from system-level health (post-connection 250 V DC).',
  },
  {
    id: 'mod4-s4-1m-floor',
    question:
      'After the equipment is reconnected, the 250 V DC test reads 0.8 MΩ between L+N and the protective conductor. What does Reg 643.3.3 say?',
    options: [
      'Pass — anything above 0.5 MΩ is acceptable',
      'Fail. Reg 643.3.3 sets 1 MΩ as the minimum at 250 V DC. Investigate which connected device is responsible (typically by progressive disconnection) before re-testing and recording',
      'Pass with note in comments',
      'Re-test at 500 V DC and use that value',
    ],
    correctIndex: 1,
    explanation:
      'The post-connection acceptance is explicit: 1 MΩ minimum at 250 V DC. 0.8 MΩ is below the floor. Reg 643.3.3 NOTE acknowledges that the manufacturer instructions may require certain devices to be disconnected even at 250 V DC — start there before condemning the cable. Re-test after each disconnection until the responsible device is isolated, then decide whether to remediate the device or accept its leakage and document the variance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.3.3 (A4:2026) sets out the procedure where connected equipment is likely to influence the test or be damaged. What does the regulation actually require?',
    options: [
      'Skip the insulation test on those circuits and note "N/A" on the schedule',
      'Apply Table 64 (typically 500 V DC) before the equipment is connected, and after connection apply a 250 V DC test between live conductors and the protective conductor with a minimum of 1 MΩ',
      'Test only at 250 V DC for the whole installation',
      'Disconnect the consumer unit and test the meter tails only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.3 explicitly says: where connected equipment is likely to influence or be damaged, the test shall be applied prior to the connection of such equipment in accordance with Table 64. Following connection, a test at 250 V DC shall be applied between live conductors and the protective conductor connected to the earthing arrangement; the insulation resistance shall have a value of at least 1 MΩ. Two tests, two stages, both recorded.',
  },
  {
    id: 2,
    question:
      'A 500 V DC insulation test pulse is applied to a Type 2 SPD on a sub-main. What is the most likely outcome and why?',
    options: [
      'No effect — SPDs are designed for any DC voltage',
      'The MOV inside the SPD clamps somewhere between 350–470 V DC and either fails permanently or appears as a short to the tester, giving a false-low reading and likely destroying or weakening the SPD',
      'The SPD trips a downstream RCD',
      'The reading will be valid but slow to settle',
    ],
    correctAnswer: 1,
    explanation:
      'Type 2 SPDs use metal-oxide varistors with a clamping voltage typically below the 500 V DC test voltage. The test pulse drives the MOV into conduction, producing a near-zero IR reading and degrading the device. Either disconnect or bridge the SPD per the manufacturer instructions before the 500 V test, then retest at 250 V DC after reconnection.',
  },
  {
    id: 3,
    question:
      'You are about to insulation-test a domestic lighting circuit that includes electronic dimmers and an LED driver. The "all-or-nothing" mental model says you should:',
    options: [
      'Test it at 500 V regardless and replace anything that fails',
      'Disconnect every sensitive electronic load on that circuit before applying the Table 64 test, then reconnect and apply a single 250 V DC verification test — there is no halfway',
      'Test at 250 V DC only and skip the Table 64 test',
      'Test live conductors to earth only, not L–N',
    ],
    correctAnswer: 1,
    explanation:
      'The "all-or-nothing" model: either every sensitive load is out of the test path (Table 64 test on cabling and accessories), or every load is connected and you apply only the 250 V DC verification with a 1 MΩ floor. A partial disconnect — one dimmer out, one in — is the worst of both worlds: you risk damage AND the result is meaningless because the in-circuit electronics dominate the leakage.',
  },
  {
    id: 4,
    question:
      'Why is bridging line and neutral together a sensible practice on the live-to-earth limb of an insulation test where electronic loads are present?',
    options: [
      'It speeds up the test',
      'Reg 643.3.1 explicitly permits L and N to be linked when measuring live conductors to the protective conductor; this avoids stressing electronic loads with full L–N test voltage and gives a single representative reading to earth',
      'It is required by Building Regulations',
      'It bypasses the SPD',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.1(b) says "during this measurement, line and neutral conductors may be connected together" — i.e., when measuring lives-to-CPC. Linking L and N puts the same potential on both sides of any electronic load (dimmer, driver, switch-mode supply), so there is no L–N stress across the load while you measure leakage to earth.',
  },
  {
    id: 5,
    question:
      'An RCD or RCBO with an electronic test button — what specifically should you do with it before applying a 500 V DC insulation test on the circuits it protects?',
    options: [
      'Nothing — RCDs are fine with 500 V DC',
      'Open the RCD/RCBO so the test pulse is upstream of it, or test downstream side only with the device open. The internal electronics (toroidal sense circuit, electronic test button driver) can be damaged by repeated 500 V DC pulses across them',
      'Press the test button before testing',
      'Increase the test voltage to 1000 V DC',
    ],
    correctAnswer: 1,
    explanation:
      'Modern RCDs and RCBOs increasingly use electronic detection (Type A, F, B). The 500 V DC test stresses the sense circuitry. Best practice: open the device for the test, apply the test downstream, and treat the supply side as a separate test stage. This avoids cumulative degradation of the residual-current detection.',
  },
  {
    id: 6,
    question:
      'AFDDs are now mandated for many circuit types in A4:2026. Why does the AFDD complicate insulation testing in particular?',
    options: [
      'It does not — AFDDs are passive',
      'AFDDs contain HF arc-detection electronics referenced between L, N and CPC. A 500 V DC test pulse can corrupt the detection circuitry or trigger nuisance device-internal faults; manufacturers typically require AFDDs to be open or removed for the Table 64 test',
      'AFDDs short L to E during the test',
      'AFDDs trip whenever a meter is connected',
    ],
    correctAnswer: 1,
    explanation:
      'An AFDD is essentially an MCB/RCBO body with an HF signal-processing brain that monitors the line waveform. The DC test pulse is outside the design envelope of that signal-processing chain. A4:2026 expects AFDDs on the board; the testing implication is that you almost always disconnect or bypass them for the Table 64 step, then verify at 250 V DC after re-installation.',
  },
  {
    id: 7,
    question:
      'You are insulation-testing the final circuits on an EV charge point installation. The charge point is a Mode 3 unit with internal RDC-DD (residual DC detecting). You apply 500 V DC to its supply circuit with the unit connected. What is the most realistic risk?',
    options: [
      'No risk — Mode 3 chargers are sealed against test voltages',
      'The RDC-DD electronics, the internal type-A RCD sense and the contactor coil control board can all be stressed; manufacturers commonly state the charger must be isolated and disconnected at its terminals before any 500 V DC test, and re-tested at 250 V DC after reconnection',
      'The Type 2 socket pins will arc',
      'The vehicle CCID will trip',
    ],
    correctAnswer: 1,
    explanation:
      'EV charge points are dense with electronics: pilot-signal logic, RDC-DD detection, internal RCD sense, contactor drivers, sometimes communications boards. Manufacturer manuals universally require the unit to be electrically isolated and disconnected from the cable under test for any IR test above 250 V DC. After reconnection, a 250 V DC test covering the whole circuit completes the verification — and the charger is treated as connected equipment under Reg 643.3.3.',
  },
  {
    id: 8,
    question:
      'A capacitive load (filter capacitors at the head of an LED driver) was bridged out for the 500 V DC test, then re-connected. You apply the 250 V DC follow-up test and the reading slowly climbs from 0.6 MΩ to 4 MΩ over 30 seconds. What is happening, and what do you record?',
    options: [
      'Faulty insulation — record 0.6 MΩ as a fail',
      'Capacitance settling: the capacitor is charging through the test voltage, making the apparent leakage drop over time. Wait for the reading to stabilise (typically 15–60 s), then record the steady value. If the steady value is ≥ 1 MΩ, the test passes per Reg 643.3.3',
      'The meter is faulty — replace it',
      'The CPC is open — disconnect everything',
    ],
    correctAnswer: 1,
    explanation:
      'Insulation-test current charges any in-circuit capacitance. While charging, the apparent IR is low; once the capacitor is fully charged, the residual leakage is the genuine insulation reading. Always allow settling time on circuits that include filter capacitors, electronic ballasts, drivers or PSUs. Record the stabilised reading.',
  },
  {
    id: 9,
    question:
      'On a building with shared-neutral lighting circuits and battery-backed smoke alarms interconnected on the same neutral, what is the safe test procedure?',
    options: [
      'Test each line to its own neutral and ignore the interconnection',
      'Identify every shared-neutral group, isolate the WHOLE group, disconnect or remove the smoke alarm bases (per manufacturer guidance), then test as one block at the appropriate Table 64 voltage. Do not test one circuit while another in the group is energised',
      'Disconnect the battery only',
      'Test at 250 V DC with everything left in place',
    ],
    correctAnswer: 1,
    explanation:
      'A shared neutral means a single test on one line floats voltage onto the others through the common neutral path. Smoke alarm interconnect lines reference the same potentials. Test the whole shared group as one isolated block, with the alarm bases unplugged or removed per the manufacturer. Anything else risks back-feeding test voltage into a live alarm head.',
  },
  {
    id: 10,
    question:
      'A 250 V DC post-connection test on a circuit including a Type 3 SPD at a final socket reads 0.7 MΩ between L+N (linked) and CPC. The cabling-only Table 64 test before connection was 198 MΩ. What is the correct conclusion?',
    options: [
      'Pass — both readings are above zero',
      'Fail — Reg 643.3.3 requires at least 1 MΩ following connection of equipment. 0.7 MΩ is below the regulatory floor and the circuit has not satisfied 643.3.3. Investigate: confirm the SPD is the source of the leakage, decide whether the SPD is faulty, end-of-life or simply doing its job at high humidity; replace as needed',
      'Pass — the cabling reading was high',
      'Pass — 250 V DC tests have no minimum',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.3 sets a hard floor: ≥ 1 MΩ at 250 V DC after connection. 0.7 MΩ is non-compliant and the certificate cannot be issued for that circuit until the cause is resolved. Most often the cause is an end-of-life MOV in the SPD; less often it is genuine cable degradation that the high-voltage test missed because the leakage path is via the SPD electronics, not the cable insulation.',
  },
];

const InspectionTestingModule4Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Testing sensitive equipment (SERDs) | I&T Module 4.4 | Elec-Mate',
    description:
      'Reg 643.3.3 in practice: SPDs, RCDs/RCBOs, AFDDs, dimmers, LED drivers, smoke alarms, EV chargers. Disconnect-or-bridge before the Table 64 test. 250 V DC post-connection verification with a 1 MΩ floor.',
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
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4"
            title="Testing sensitive equipment (SERDs)"
            description="Sensitive Electronic & Residual-current Devices break under a 500 V DC insulation test. Reg 643.3.3 sets out the disconnect-or-bridge rule and the 250 V DC post-connection verification — this is the section that keeps boards intact."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.3.3 (A4:2026) is the disconnect-or-bridge regulation. Apply the Table 64 test (typically 500 V DC at ≥ 1 MΩ) before sensitive equipment is connected, then a 250 V DC test (≥ 1 MΩ) after equipment is connected. Both stages, both recorded.',
              'SERDs that break at 500 V DC: SPDs (Type 1/2/3), RCDs and RCBOs with electronic detection, AFDDs, dimmers, LED drivers, smoke alarms with shared neutrals, BMS panels, EV charge points, capacitive electronic loads.',
              'The "all-or-nothing" mental model: either every sensitive load is out of the test path for the Table 64 test, or every load is connected and you apply only the 250 V DC verification. A half-and-half test damages devices and produces a result you cannot defend.',
              'Reg 643.3.1(b) lets you link L and N together when measuring live conductors to the protective conductor. Use it. Linking removes L–N stress across electronics while still verifying leakage to earth.',
              'Capacitance in electronic loads (filter caps, drivers, PSUs) makes the 250 V DC reading drift upwards over 15–60 s. Wait for settling. Record the stabilised value, not the instant value.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State exactly what Reg 643.3.3 requires, in two stages, and identify which stage applies on any given circuit',
              'List the categories of sensitive equipment (SERDs) and explain what fails in each when 500 V DC is applied',
              'Apply the disconnect-or-bridge rule on a real distribution board: what to physically remove, what to open, what to bridge, and how to mark the change so you reverse it',
              'Use the L–N link permitted by Reg 643.3.1(b) to limit stress on connected electronics during the live-to-earth measurement',
              'Wait for capacitance settling on the 250 V DC verification and record the stabilised reading rather than an instantaneous value',
              'Document the two-stage test on the Schedule of Test Results in a way that survives third-party audit',
            ]}
          />

          <ContentEyebrow>Why the 500 V DC test damages modern installations</ContentEyebrow>

          <ConceptBlock
            title="What &lsquo;SERDs&rsquo; actually means on a 2026 board"
            plainEnglish="SERDs is shorthand for Sensitive Electronic & Residual-current Devices. It covers anything inside a circuit whose internals will be stressed, degraded or destroyed by the 500 V DC test pulse that BS 7671 Table 64 expects on most circuits."
            onSite="Walk a typical 2026 domestic board and count the SERDs. Even a basic 12-way board now has: SPDs at the head, RCDs/RCBOs of mixed types, mandatory AFDDs on socket and lighting circuits, downstream LED drivers, electronic dimmers, smoke alarm bases, EV charge points and possibly a battery storage / solar inverter interface. Almost every circuit has something the 500 V test would damage."
          >
            <p>
              The 500 V DC test was designed for an installation in which the only thing between
              line and earth was insulation. Modern installations have replaced that picture with a
              long list of intentional, deliberately low-impedance paths between the line and the
              protective conductor — every SPD, every RCD with electronic detection, every AFDD,
              every switch-mode driver. A 500 V DC pulse into those paths is not the test the device
              was designed for. It is an over-stress.
            </p>
            <p>The categories of SERDs you should expect to encounter:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Surge protection (SPDs)</strong> — Type 1, Type 2, Type 3. MOV-based
                clamping voltages typically sit between 350 V and 470 V DC, below the test voltage.
              </li>
              <li>
                <strong>RCDs and RCBOs with electronic detection</strong> — Type A, Type F, Type B.
                The toroidal sense electronics, electronic test button driver, and power supply for
                the trip coil are referenced between L, N and CPC.
              </li>
              <li>
                <strong>AFDDs</strong> — high-frequency arc-fault detection electronics referenced
                across L, N and CPC. Mandatory on many circuit types in A4:2026.
              </li>
              <li>
                <strong>Smoke and heat alarm interconnect lines</strong> — battery-backed,
                shared-neutral, often with a third interconnect wire that floats voltages.
              </li>
              <li>
                <strong>Dimmers and electronic switches</strong> — TRIAC or MOSFET output stages
                with snubber capacitors directly across L–N.
              </li>
              <li>
                <strong>LED drivers, fluorescent ballasts, capacitive electronic loads</strong> —
                input filter capacitors directly across L–N and L–CPC, X and Y class capacitors that
                fail or weaken under DC over-voltage.
              </li>
              <li>
                <strong>EV charge points</strong> — Mode 3 units include RDC-DD detection, internal
                Type A RCD sense, contactor drive electronics and pilot-signal logic. Manufacturer
                manuals universally require disconnection.
              </li>
              <li>
                <strong>BMS panels, CT clamps, current-monitoring modules</strong> — clamp opens,
                transducers and signal-conditioning amplifiers all referenced to local earth.
              </li>
              <li>
                <strong>Solar inverters, battery storage interfaces, heat-pump controllers</strong>{' '}
                — high-density power electronics with strict manufacturer test envelopes.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.3"
            clause={
              <>
                Where connected equipment is likely to influence the measurement or result of the
                test, or be damaged, the test shall be applied prior to the connection of such
                equipment, in accordance with Table 64. Following connection of the equipment, a
                test at 250 V DC shall be applied between live conductors and the protective
                conductor connected to the earthing arrangement. The insulation resistance shall
                have a value of at least 1 MΩ.
              </>
            }
            meaning="Two stages, not one. Stage 1: cabling and accessories tested at the Table 64 voltage with sensitive equipment out of the path. Stage 2: equipment reconnected, 250 V DC test between live conductors and CPC, minimum 1 MΩ. Both stages have to happen, and both are recorded. The 1 MΩ in stage 2 is a hard floor — anything below is non-compliant."
          />

          <ConceptBlock
            title="Reg 643.3.1 — the link that saves your electronics"
            plainEnglish="When measuring insulation resistance from live conductors to the protective conductor, Reg 643.3.1(b) explicitly says line and neutral may be connected together. Linking L and N during the L–CPC test puts both at the same potential, so any electronic load between L and N sees zero stress."
          >
            <p>
              The regulation is short and decisive. The first limb (Reg 643.3.1(a)) requires the
              insulation resistance between live conductors. The second limb (Reg 643.3.1(b))
              requires the insulation resistance between live conductors and the protective
              conductor. The permission inside the second limb — &ldquo;line and neutral conductors
              may be connected together&rdquo; — is the standard practical method for the L–CPC
              measurement on any circuit with electronic loads.
            </p>
            <p>
              The reasoning is electrical. An electronic load (dimmer, driver, PSU) sits between L
              and N. If you measure L to CPC at 500 V DC with N floating, the 500 V appears between
              L–N across the load — a destructive stress. If you link L and N first, the 500 V is
              between (L+N) and CPC, with zero potential difference across the load. Same insulation
              reading to earth, no L–N stress across the electronics that happen to be downstream.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.1"
            clause={
              <>
                The insulation resistance shall be measured between: (a) live conductors; and (b)
                live conductors and the protective conductor connected to the earthing arrangement.
                During this measurement, line and neutral conductors may be connected together.
              </>
            }
            meaning="Two limbs. The L–N test on (a) is the destructive one for electronic loads — that is the test you run before equipment is connected. The L–CPC test on (b) is the one where you are permitted to link L and N — that is the test you run after equipment is reconnected, at 250 V DC, with the 1 MΩ floor from 643.3.3."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The all-or-nothing mental model</ContentEyebrow>

          <ConceptBlock
            title="Why partial disconnection is worse than no disconnection"
            plainEnglish="If you disconnect some sensitive loads and leave others, you damage the ones still connected AND get a meaningless number — the un-disconnected loads dominate the leakage path. The only safe positions are: everything out (Table 64 test on cabling), or everything in (250 V DC test under Reg 643.3.3)."
            onSite="Make a circuit-by-circuit plan before you energise the test instrument. List every SERD on every circuit. Decide for each circuit whether you are doing the Table 64 stage (everything sensitive disconnected) or the 250 V stage (everything reconnected). Walk the board with that list."
          >
            <p>
              The partial-disconnect failure mode goes like this. You remove one dimmer, leave the
              LED driver in. You apply 500 V DC. The driver&rsquo;s input filter capacitor presents
              a low-impedance path that pulls the reading to a misleading low value — but only after
              the test has already pulsed energy into it. The driver&rsquo;s X-class capacitor
              weakens. The reading you record is dominated by the still- connected driver&rsquo;s
              leakage, not the cable insulation.
            </p>
            <p>
              The next step is worse: you assume the low reading is genuine and start hunting for a
              cable fault that does not exist. Or you assume it is the driver and replace the driver
              — at the customer&rsquo;s expense — and the reading does not change because in fact a
              different SPD elsewhere on the same group is at end-of-life. The whole exercise burns
              time, money and the installation&rsquo;s electronics.
            </p>
            <p>The all-or-nothing rule:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Stage 1 (Table 64).</strong> Every SERD on the circuit out of the path.
                Either physically removed (smoke alarm bases lifted, lamps out, drivers unwired), or
                bridged out per the manufacturer guidance, or upstream of the opened protective
                device for that circuit.
              </li>
              <li>
                <strong>Stage 2 (Reg 643.3.3 verification).</strong> Every SERD reconnected and in
                service. Test at 250 V DC, link L and N for the live-to-CPC measurement, wait for
                capacitance settling, record stabilised reading. Pass requires ≥ 1 MΩ.
              </li>
              <li>
                <strong>Never run a hybrid.</strong> &ldquo;Most things disconnected, one or two
                left in to save time&rdquo; is the failure pattern.
              </li>
            </ul>
          </ConceptBlock>

          {/* SERDs disconnection map diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              SERDs disconnection map — typical 12-way 2026 board
            </h4>
            <svg
              viewBox="0 0 820 460"
              className="w-full h-auto"
              role="img"
              aria-label="A typical distribution board with SPD at the head, RCD/RCBO/AFDD devices and downstream sensitive loads. Each circuit is annotated for what to disconnect or bridge before the Table 64 insulation test."
            >
              <rect
                x="30"
                y="30"
                width="240"
                height="400"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="150"
                y="52"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
                fontWeight="bold"
              >
                CONSUMER UNIT
              </text>
              <text x="150" y="68" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (isolated, locked off)
              </text>

              <rect
                x="60"
                y="82"
                width="180"
                height="32"
                rx="6"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="150"
                y="103"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Type 2 SPD ⚠ disconnect
              </text>

              <rect
                x="60"
                y="124"
                width="180"
                height="28"
                rx="6"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="150"
                y="143"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Type A RCD ⚠ open device
              </text>

              <rect
                x="60"
                y="162"
                width="180"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1"
              />
              <text x="150" y="177" textAnchor="middle" fill="#FBBF24" fontSize="9.5">
                C1 AFDD · sockets ground floor
              </text>
              <rect
                x="60"
                y="190"
                width="180"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1"
              />
              <text x="150" y="205" textAnchor="middle" fill="#FBBF24" fontSize="9.5">
                C2 AFDD · sockets first floor
              </text>
              <rect
                x="60"
                y="218"
                width="180"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1"
              />
              <text x="150" y="233" textAnchor="middle" fill="#FBBF24" fontSize="9.5">
                C3 AFDD · lighting + dimmers
              </text>
              <rect
                x="60"
                y="246"
                width="180"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1"
              />
              <text x="150" y="261" textAnchor="middle" fill="#FBBF24" fontSize="9.5">
                C4 RCBO · cooker
              </text>
              <rect
                x="60"
                y="274"
                width="180"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1"
              />
              <text x="150" y="289" textAnchor="middle" fill="#FBBF24" fontSize="9.5">
                C5 Type A RCBO · smokes (shared N)
              </text>
              <rect
                x="60"
                y="302"
                width="180"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1"
              />
              <text x="150" y="317" textAnchor="middle" fill="#FBBF24" fontSize="9.5">
                C6 Type B RCBO · EV charge point
              </text>
              <rect
                x="60"
                y="330"
                width="180"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1"
              />
              <text x="150" y="345" textAnchor="middle" fill="#FBBF24" fontSize="9.5">
                C7 RCBO · solar interface
              </text>
              <rect
                x="60"
                y="358"
                width="180"
                height="22"
                rx="4"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.3)"
                strokeWidth="1"
              />
              <text x="150" y="373" textAnchor="middle" fill="#22C55E" fontSize="9.5">
                C8 MCB · immersion (no SERDs)
              </text>
              <rect
                x="60"
                y="386"
                width="180"
                height="22"
                rx="4"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.3)"
                strokeWidth="1"
              />
              <text x="150" y="401" textAnchor="middle" fill="#22C55E" fontSize="9.5">
                C9 MCB · shower (no SERDs)
              </text>

              <rect
                x="300"
                y="30"
                width="500"
                height="400"
                rx="10"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text
                x="550"
                y="52"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
                fontWeight="bold"
              >
                STAGE 1 — TABLE 64 TEST AT 500 V DC
              </text>
              <text x="550" y="68" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
                What to do on each circuit before applying the pulse
              </text>

              <text x="320" y="100" fill="#EF4444" fontSize="10" fontWeight="bold">
                SPD:
              </text>
              <text x="370" y="100" fill="rgba(255,255,255,0.85)" fontSize="10">
                Disconnect at SPD terminals or open the SPD&rsquo;s isolation switch
              </text>
              <text x="320" y="135" fill="#FBBF24" fontSize="10" fontWeight="bold">
                Main RCD:
              </text>
              <text x="395" y="135" fill="rgba(255,255,255,0.85)" fontSize="10">
                Open the device · test downstream side only
              </text>
              <text x="320" y="173" fill="#FBBF24" fontSize="10" fontWeight="bold">
                C1, C2, C3:
              </text>
              <text x="395" y="173" fill="rgba(255,255,255,0.85)" fontSize="10">
                AFDDs — open the device, test the circuit downstream
              </text>
              <text x="320" y="200" fill="#FBBF24" fontSize="10" fontWeight="bold">
                C3 dimmers:
              </text>
              <text x="408" y="200" fill="rgba(255,255,255,0.85)" fontSize="10">
                Lift dimmer modules · withdraw lamps with electronic drivers
              </text>
              <text x="320" y="232" fill="#FBBF24" fontSize="10" fontWeight="bold">
                C5 smokes:
              </text>
              <text x="403" y="232" fill="rgba(255,255,255,0.85)" fontSize="10">
                Lift alarm bases (whole shared-neutral group) per manufacturer
              </text>
              <text x="320" y="261" fill="#FBBF24" fontSize="10" fontWeight="bold">
                C6 EV:
              </text>
              <text x="375" y="261" fill="rgba(255,255,255,0.85)" fontSize="10">
                Isolate at charger · disconnect terminals · test cabling only
              </text>
              <text x="320" y="291" fill="#FBBF24" fontSize="10" fontWeight="bold">
                C7 solar:
              </text>
              <text x="385" y="291" fill="rgba(255,255,255,0.85)" fontSize="10">
                Isolate inverter at AC side · test AC cabling only
              </text>
              <text x="320" y="321" fill="#22C55E" fontSize="10" fontWeight="bold">
                C8, C9:
              </text>
              <text x="380" y="321" fill="rgba(255,255,255,0.85)" fontSize="10">
                No sensitive devices · test in place at full Table 64 voltage
              </text>

              <rect
                x="300"
                y="345"
                width="500"
                height="80"
                rx="8"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.25)"
                strokeWidth="1"
              />
              <text
                x="550"
                y="365"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                STAGE 2 — RECONNECT EVERYTHING
              </text>
              <text x="550" y="384" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Apply 250 V DC between (L+N linked) and CPC.
              </text>
              <text x="550" y="402" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Wait 15–60 s for capacitance to settle.
              </text>
              <text
                x="550"
                y="420"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Reg 643.3.3 acceptance: ≥ 1 MΩ on every circuit.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What fails inside each device — and how to handle it</ContentEyebrow>

          <ConceptBlock
            title="SPDs (Type 1, Type 2, Type 3) — the most common casualty"
            plainEnglish="An SPD is a deliberately conductive path between L (or N) and CPC above its clamping voltage. The 500 V DC test is above that voltage. Either disconnect the SPD at its terminals or operate the integral isolation switch some SPDs include. After reconnection, run the 250 V DC test."
            onSite="Most modern SPDs have an isolating switch or a plug-in cartridge. Use it. If yours is a hard-wired older unit, undo the L and N terminations and label them. Re-make the connections only after the Table 64 stage is done across the entire board."
          >
            <p>
              MOV-based SPDs clamp typically between 350 V and 470 V DC. The 500 V DC test voltage
              exceeds the clamp on most products, so applying it puts the MOV into conduction.
              Repeated exposure shortens the MOV&rsquo;s life or, on a single over-stress, cracks
              the metal-oxide disc and fails the device. Some Type 1+2 combination SPDs include
              gas-discharge tubes that hold off DC up to higher voltages and are less affected —
              read the data sheet, not the rule of thumb.
            </p>
            <p>
              The visible failure mode after over-stress is a status indicator turning red, a
              cartridge that physically refuses to mate again, or — most insidiously — an SPD that
              looks fine but reads 0.6–0.9 MΩ on the 250 V DC verification. That under-1-MΩ reading
              is what an end-of-life MOV looks like, and Reg 643.3.3 calls that a fail.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="RCDs and RCBOs with electronic detection"
            plainEnglish="Modern Type A, Type F and Type B RCDs and RCBOs use active electronics for residual-current detection. The internal sense circuit is referenced between L, N and CPC and is not designed for 500 V DC pulses through it. Open the device for the upstream test, treat the downstream circuit as a separate test."
          >
            <p>
              The simple rule: every protective device with electronics in it gets opened before the
              Table 64 test. That includes virtually every Type A and above RCD/RCBO sold post-2018.
              The mechanical test button on a Type AC RCD is sometimes considered low risk, but Type
              AC is increasingly rare on new installations following A4:2026 changes.
            </p>
            <p>Practical workflow at the board:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Open every RCD/RCBO and every AFDD on the board. Confirm all are mechanically in the
                off position.
              </li>
              <li>
                Treat the meter tails / supply side as one test (live-side cabling, with the main
                switch open).
              </li>
              <li>
                Treat the downstream circuits as separate tests, each starting at the open load-side
                terminals of its respective RCD/RCBO/AFDD.
              </li>
              <li>
                Reverse the procedure for stage 2: close everything, reconnect the SPD, reseat alarm
                bases, and apply the 250 V DC verification test on the whole circuit through the
                closed device.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="AFDDs"
            plainEnglish="An AFDD is an MCB or RCBO body with a high-frequency arc-detection brain. The brain monitors line waveform for arc signatures and is not specified for the test pulse. A4:2026 makes AFDDs effectively standard on socket and lighting circuits in many premises — so AFDD-handling is now part of every test."
          >
            <p>
              AFDDs are open-or-disconnect for the Table 64 stage every time. Manufacturers of
              compliant AFDDs (BS EN 62606) typically state the device must be electrically open
              during dielectric / IR testing of the circuits it protects. Apply the test downstream
              with the AFDD open. Reverse the AFDD to the closed position before stage 2.
            </p>
            <p>
              A subtle gotcha on AFDDs: some designs power their internal electronics from the line
              side even when the device is in the off position (so the trip indication survives a
              downstream fault that opens the device). That parasitic power supply is referenced
              between L (line side) and CPC. If you test the line-side cabling with an AFDD
              installed and the line-side terminals exposed, you can stress that supply through the
              device. The defensive habit: physically remove the AFDD from the busbar for the
              line-side cabling test, or test the line side only with the AFDD removed.
            </p>
          </ConceptBlock>

          <Scenario
            title="Domestic refurb — board change with SPD, AFDDs and shared-neutral smokes"
            situation="You are testing a 12-way board change in a 1990s house. Board now has Type 2 SPD, Type A main RCD, six AFDD/RCBO ways feeding sockets and lighting, and the existing four-bedroom hard-wired smoke alarm system that uses a shared neutral and a third interconnect wire. Customer is keen to know how long the test phase will take."
            whatToDo={
              <>
                <span className="block">
                  Plan stage 1 in three blocks. Block A: meter tails and supply-side cabling with
                  the main switch open and the SPD disconnected. Block B: each AFDD/RCBO open, one
                  at a time, test the load-side cabling for that circuit, with all electronic
                  dimmers / drivers / chargers physically removed from their back-boxes. Block C:
                  smoke alarm circuit — lift every alarm head from its base before applying the
                  pulse to the shared-neutral group.
                </span>
                <span className="block mt-2">
                  Then stage 2 — reverse everything in order, close all devices, reseat all alarm
                  heads, and apply the 250 V DC verification with L and N linked. Wait for
                  capacitance settling on the lighting and socket circuits. Record the stabilised
                  value on every circuit. Reject anything below 1 MΩ.
                </span>
              </>
            }
            whyItMatters="The shared-neutral smoke group is the easy one to get wrong. Testing one of the smoke-related lighting circuits while the alarm heads are still in their bases sends 500 V DC into the alarm electronics through the interconnect line — the alarm bases share a neutral with several lighting circuits, so the test pulse on any of them couples into the alarm head. Customers find out about this when half the alarms in the house chirp continuously after the test, or simply die."
          />

          <CommonMistake
            title="Treating the 250 V DC verification as a formality"
            whatHappens="The cabling-only Table 64 test came out at 200+ MΩ on every circuit. The installer skips the 250 V DC stage, signs the certificate, and leaves. Six months later the customer reports that an SPD indicator has gone red, replaces the SPD themselves, and the new SPD also reads 0.7 MΩ on a routine inspection. The original SPD was end-of-life from day one, the under-1-MΩ reading would have caught it, and the certificate that was signed without the 250 V DC stage was never compliant with Reg 643.3.3 in the first place."
            doInstead="Treat stage 2 as a regulatory requirement, not a courtesy check. It has its own column on the schedule, its own minimum value (1 MΩ), and its own legal weight. The test takes minutes once the equipment is reconnected — there is no excuse to skip it on a finished installation."
          />

          <CommonMistake
            title="Not waiting for capacitance settling on the 250 V DC test"
            whatHappens="On a circuit with several LED drivers, the 250 V DC reading at the moment the test button is pressed is 0.6 MΩ. The installer records the fail and starts a replacement quote. In fact the reading would have settled to 6 MΩ over 30 seconds — but the installer never waited."
            doInstead="On any circuit with capacitive electronic loads, hold the test until the reading is stable. Most multifunction testers have a continuous-test mode for this. Watch the value; only record when it stops moving. GN3 and most tester manuals call out 15–60 s as the typical settling window."
          />

          <CommonMistake
            title="Bridging an SPD with a wire instead of using its isolation switch"
            whatHappens="The installer has been told to &lsquo;bridge&rsquo; the SPD across L and CPC during the test to keep it out of the path. They wire a short across the SPD&rsquo;s terminals, apply 500 V DC, and have just connected line directly to the protective conductor. The MCB upstream trips the moment the supply is reinstated, and on a worst case the bridge is left in place and re-energised — direct L–E short, full PSCC into the bridge."
            doInstead="&ldquo;Bridge&rdquo; in this context is shorthand for &lsquo;take the SPD electrically out of the test path.&rsquo; The correct method is disconnection at the SPD terminals or operation of the integral isolation switch — not a copper wire shorting the device&rsquo;s test points. If a procedure document says &lsquo;bridge&rsquo; without explaining what that physically means, ask before you wire anything."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The two-stage test on the schedule</ContentEyebrow>

          <ConceptBlock
            title="Recording both stages so the certificate stands up"
            plainEnglish="The schedule of test results has columns for L–L, L–N and L–E insulation resistance. Reg 643.3.3 expects you to record TWO insulation results per circuit: the Table 64 stage (with sensitive equipment out) and the 250 V DC stage (with everything connected). Most schedules do not have separate columns for both — use the comments column."
            onSite="Standard practice on EICR / EIC: record the Table 64 stage value in the IR columns. Add a comments-column note for the 250 V DC verification: &lsquo;Reg 643.3.3 verification at 250 V DC: X MΩ.&rsquo; Some schedule formats now have a dedicated A4:2026 column for the verification stage — use it where present."
          >
            <p>The audit-defensible record looks like this:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>L–L column:</strong> Table 64 stage 500 V DC reading with sensitive loads
                disconnected (or 250 V DC where the cable supplies SELV/PELV accessories per Table
                64).
              </li>
              <li>
                <strong>L–E column:</strong> Table 64 stage 500 V DC reading with L and N linked,
                sensitive loads disconnected.
              </li>
              <li>
                <strong>Comments column:</strong> &ldquo;Reg 643.3.3 verification at 250 V DC
                (sensitive equipment connected): X.XX MΩ. Settled at Y s.&rdquo;
              </li>
              <li>
                <strong>Equipment list:</strong> the SERDs you disconnected — SPD type, RCD type,
                AFDD model, dimmer modules removed, alarm bases lifted, EV charger isolated. Names
                matter for the next inspector.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="EV charger circuit — Reg 643.3.3 in practice"
            situation="A new 7.4 kW Mode 3 EV charger is installed on a Type B RCBO at the consumer unit. Length of run is 18 m of 6 mm² flat T&E. Manufacturer manual states the charger must be isolated and disconnected from its supply for any IR test above 250 V DC. Customer wants the charger commissioned today."
            whatToDo={
              <>
                <span className="block">
                  Stage 1 — Table 64 at 500 V DC, charger disconnected at its terminals, cabling
                  only. Expect a high reading (200+ MΩ on a new T&amp;E run). Record on the
                  schedule.
                </span>
                <span className="block mt-2">
                  Stage 2 — Charger reconnected, energised at the consumer unit, RCBO closed. Apply
                  250 V DC between (L+N linked) and CPC. Wait 30+ s for the charger&rsquo;s internal
                  filter capacitors to settle. Record stabilised reading. Reg 643.3.3 passes if ≥ 1
                  MΩ.
                </span>
                <span className="block mt-2">
                  Then commission per the manufacturer&rsquo;s checklist (RDC-DD self-test, earth
                  fault test, charge-cycle test). Cert the circuit.
                </span>
              </>
            }
            whyItMatters="Skipping stage 1 means you lose the only chance to verify the cabling at full Table 64 voltage — once the charger is permanently terminated and commissioned, the only IR test you can ever do on that circuit is the 250 V DC stage, and a marginal cable defect (say 4 MΩ) will pass it forever even though the cabling itself is degrading. Stage 1 is your one shot at a clean cabling baseline."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The 1 MΩ floor — what counts as a pass</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.3.3 acceptance — and why &lsquo;higher is always better&rsquo; is wrong"
            plainEnglish="Reg 643.3.3 says ≥ 1 MΩ on the 250 V DC test after equipment is connected. That is the floor. A reading of 1.2 MΩ is a pass. So is 200 MΩ. The acceptance criterion is binary at 1 MΩ. What matters is whether the value is stable and consistent with the equipment connected — not whether it is &lsquo;high enough.&rsquo;"
          >
            <p>Three traps to avoid around the 1 MΩ floor:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>1.0 MΩ exactly is a pass</strong>, not a fail-because-it-is-on-the-line. The
                regulation says &ldquo;at least 1 MΩ.&rdquo; Round-down on the meter is acceptable
                as long as the displayed value is ≥ 1.0.
              </li>
              <li>
                <strong>Below 1 MΩ is a fail every time</strong>, regardless of how stable or
                explainable. A 0.9 MΩ reading is non-compliant. Investigate the source — usually an
                end-of-life SPD or a degraded electronic load — and resolve before the certificate
                issues.
              </li>
              <li>
                <strong>Above 1 MΩ but suspiciously low</strong> (e.g. 1.5–3 MΩ on a small lighting
                circuit with no SERDs) is a pass under Reg 643.3.3 but worth investigating in your
                comments. A genuinely well-installed cable with no connected loads should read tens
                to hundreds of MΩ; single-figure MΩ on a clean run is a clue.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Ch 2 (commentary on Reg 643.3.3)"
            clause={
              <>
                Where sensitive equipment (for example SMART-touch LED dimmers) might be damaged
                during an insulation resistance test, the procedure illustrated allows that
                equipment to remain disconnected or removed while the rest of the circuit is tested.
                Manufacturer&rsquo;s instructions may recommend some equipment to be disconnected
                during 250 V DC insulation resistance tests as it may influence the results of the
                test.
              </>
            }
            meaning="GN3 ratifies what Reg 643.3.3 implies: even the 250 V DC stage may have to be done with specific equipment disconnected if the manufacturer says so. The hierarchy is: regulation first (Reg 643.3.3 minimum 1 MΩ at 250 V DC), then manufacturer guidance for equipment-specific exceptions, then GN3 for the procedural illustration."
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.3.3 is two-stage: Table 64 test before equipment is connected, 250 V DC test (≥ 1 MΩ) after equipment is connected. Both recorded.',
              'SERDs on a 2026 board: SPDs, RCDs/RCBOs with electronic detection, AFDDs, dimmers, LED drivers, smoke alarm bases, EV chargers, BMS/CT clamps, solar/battery interfaces.',
              'All-or-nothing rule: every sensitive load out of the path, or every load reconnected. Never half-and-half.',
              'Reg 643.3.1(b) lets you link L and N for the live-to-CPC measurement — use it to remove L–N stress on connected electronics.',
              'Capacitance settling on the 250 V DC test takes 15–60 s. Wait. Record the stabilised value.',
              '1 MΩ is a hard floor. 0.9 MΩ is a fail; investigate the source before issuing the certificate.',
              'EV chargers, solar inverters and battery interfaces always require manufacturer-specific isolation per their manual — even for the 250 V DC stage.',
              'Document both stages on the schedule. Comments column captures the 250 V DC verification value and the SERDs disconnected.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'If a circuit has no sensitive equipment at all, do I still have to do the 250 V DC test under Reg 643.3.3?',
                answer:
                  'No. Reg 643.3.3 is conditional — it applies "where connected equipment is likely to influence the measurement or result of the test, or be damaged." On a circuit with no SERDs (e.g. a dedicated immersion or shower circuit with a mechanical isolator only), the Table 64 test on the cabling is the test, and that is what you record. Document the absence of SERDs in the comments column so the next inspector knows why no 250 V DC entry exists.',
              },
              {
                question:
                  'My multifunction tester has a 250 V DC test mode. Is that the same as the Reg 643.3.3 test?',
                answer:
                  'Yes — that is exactly what the 250 V DC mode is for. BS EN 61557-2 instruments have it as a standard option. Use it for: (a) SELV/PELV circuits per Table 64 first row, and (b) the Reg 643.3.3 verification on any circuit with sensitive equipment connected. Verify the meter outputs a stable 250 V DC under load and meets BS EN 61557-2 — most modern testers do, but a 1990s vintage tester may not.',
              },
              {
                question:
                  'What if the manufacturer of an LED driver says "do not insulation-test at any voltage with the driver connected"?',
                answer:
                  'Take them at their word. Disconnect the driver for the Table 64 stage AND for the 250 V DC stage, treat the cabling as the only thing under test, and document the disconnection in the comments column. Some products genuinely cannot tolerate the 250 V DC test; in that case the certificate confirms cable insulation only, with a clear note that the driver was excluded per manufacturer guidance.',
              },
              {
                question:
                  'Can I leave my SPD bridge wire in place and just remember to remove it before energising?',
                answer:
                  'No. The most common failure mode in board change incidents is exactly that: a temporary bridge left in place at re-energisation, producing a direct L–E short when the supply is restored. Treat any temporary bridge as a hazard that gets removed before the test piece is finished, not before the supply is restored. Use the SPD&rsquo;s integral isolation switch where present so there is nothing to remove afterwards.',
              },
              {
                question:
                  'My 250 V DC reading is 0.9 MΩ on a circuit with a Type B RCBO and an EV charger. Is that the RCBO or the charger?',
                answer:
                  'Most likely the charger. Isolate the charger at its load-side terminals, retest. If the reading rises to >1 MΩ, the charger is contributing — investigate its manufacturer self-test or replace if at end-of-life. If the reading stays at 0.9 MΩ with the charger out, the issue is in the cabling or the RCBO. Open the RCBO and retest the cabling alone; if that climbs, the RCBO is contributing. Diagnostic by elimination, not by guesswork.',
              },
              {
                question:
                  'How do I treat a cable supplying an FCU that itself supplies an electronic load (e.g. a heating control or a fan)?',
                answer:
                  'The FCU isolates the load. For stage 1, switch the FCU off (some FCUs lift cleanly to remove the appliance from the test path) and apply Table 64 to the cable plus the FCU. For stage 2, FCU on, appliance connected, 250 V DC between (L+N) and CPC. Same rules apply: wait for settling, ≥ 1 MΩ acceptance.',
              },
              {
                question: 'Does the 1 MΩ floor change for older installations being EICR-tested?',
                answer:
                  'No. Reg 643.3.3 is part of A4:2026 — but the 1 MΩ floor at 250 V DC has been the practical guideline for IR with sensitive equipment connected for several editions. On an EICR, the same logic applies: stage 1 where physically possible (often it is not on a tenanted property), stage 2 always. A reading below 1 MΩ at 250 V DC is a C2 (potentially dangerous) at minimum on the EICR coding scheme — the cause must be identified and the customer informed.',
              },
              {
                question:
                  'If I cannot disconnect a sensitive load (e.g. it is hard-wired into a moulded enclosure), what do I do?',
                answer:
                  'Skip the Table 64 stage on that specific item. Note it in comments as &lsquo;equipment hard-wired, Table 64 test not possible without destructive removal&rsquo;. Run the 250 V DC stage with the equipment connected, ≥ 1 MΩ acceptance. If 250 V DC also damages the equipment per the manufacturer, you are in territory where the certificate cannot include that item — document the limitation and confirm with the duty-holder.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Testing sensitive equipment (SERDs) — Module 4.4"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-4')}
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
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-4/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.5 Interpreting results and minimum values
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

export default InspectionTestingModule4Section4;
