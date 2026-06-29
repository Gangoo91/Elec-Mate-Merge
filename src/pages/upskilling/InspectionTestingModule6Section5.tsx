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
    id: 'mod6-s5-two-ingredients',
    question:
      'A 100 mA RCD upstream of 30 mA RCBOs gives selectivity. True or false, and what are the two required ingredients?',
    options: [
      'False alone — both a 3:1 IΔn ratio AND a time delay on the upstream device are required.',
      'True — the 100 mA / 30 mA current ratio alone guarantees selectivity.',
      'True, provided the upstream device is Type AC, which gives the discrimination.',
      'False — selectivity needs three ingredients, including phase separation between devices.',
    ],
    correctIndex: 0,
    explanation:
      'Reg 536.4.1.4 demands both ratio and delay. A non-delayed 100 mA can open in 30-50 ms on a fault near its threshold — overlapping with the downstream 30 mA non-delayed device, so they race and both drop. Type S (time-delayed) at the origin opens the time gap that lets the downstream clear first.',
  },
  {
    id: 'mod6-s5-tt-system',
    question:
      'On a TT system origin, why is a time-delayed Type S RCD essentially mandatory at the supply intake?',
    options: [
      'Because TT systems require a redundant second device at the origin as a matter of principle.',
      'Because TT systems forbid the use of TN-style RCBOs on the outgoing ways entirely.',
      'For aesthetic reasons only — it serves no protective function on a TT system.',
      'A TT origin needs supply-side RCD protection; the Type S delay also lets downstream RCBOs clear first.',
    ],
    correctIndex: 3,
    explanation:
      'TT systems rely on RCDs for fault-protection because the local earth electrode resistance is too high for overcurrent devices to clear faults within the Reg 411.3.2 disconnection time. A Type S device at the origin provides that supply-side protection while leaving final-circuit faults to be cleared by per-circuit 30 mA RCBOs.',
  },
  {
    id: 'mod6-s5-test-method',
    question:
      'You inject 30 mA at the load side of a downstream RCBO with a Type S 100 mA RCD upstream. Both devices trip. What does that prove and what is the next step?',
    options: [
      'Both devices tripped, so selectivity is working fine — record a pass and move on.',
      'Run a higher-current test to confirm the upstream device behaves the same way at 5×IΔn.',
      'Selectivity has failed — both opening means no backup. Next: confirm the upstream is genuinely Type S.',
      'Selectivity between RCDs does not need testing on site, so no further step is required.',
    ],
    correctIndex: 2,
    explanation:
      'Selectivity test pass = downstream device opens, upstream device holds. Both opening = no selectivity, the user loses the entire installation on a single final-circuit fault. The diagnostic is usually that the "upstream" device is non-delayed despite appearances (mis-marked, mis-specified, or replaced like-for-like with a non-S variant).',
  },
  {
    id: 'mod6-s5-recording',
    question:
      'You verify selectivity on a TT origin with 100 mA Type S upstream and 30 mA RCBOs downstream. Where on the schedule of test results is the selectivity arrangement recorded?',
    options: [
      'It is implicit in the IΔn values, so no extra entry is needed at all.',
      'In the comments column against both devices, citing Reg 536.4.1.4 and the injection-test result.',
      'On a separate standalone selectivity certificate kept with the file.',
      'In the IΔn column only, with no narrative entry recorded.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 model forms do not have a structured "selectivity" column. The arrangement is recorded in the comments field against the relevant devices, citing Reg 536.4.1.4 and confirming the verification test was performed. The next inspector needs to see that selectivity was deliberately specified and tested, not assumed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 536.4.1.4(b) sets two conditions for selectivity between RCDs in series for residual currents. What are they?',
    options: [
      'The upstream RCD is Type AC and the downstream is Type A, discriminating by sensitivity class',
      'Both RCDs are rated 30 mA and the upstream has a longer supply lead fitted to add delay',
      'The upstream device conforms to BS EN 61008 and the downstream conforms to BS EN 61009',
      'The upstream RCD is a selective type, AND the IΔn ratio upstream-to-downstream is at least 3:1',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 536.4.1.4(b)(i) and (ii) are explicit: the upstream device must be of selective type (Type S or time-delayed with appropriate time-delay setting), AND the ratio of upstream IΔn to downstream IΔn shall be at least 3:1. Both conditions, not either-or. A 100 mA Type S over a 30 mA general-purpose downstream device satisfies both; a 30 mA over 30 mA satisfies neither. Device standard alone (61008/61009) or sensitivity class (AC/A) does not create discrimination.',
  },
  {
    id: 2,
    question:
      'A consumer unit is wired with a single 30 mA RCCB at the origin feeding ten 30 mA RCBOs on the outgoing ways. A bathroom shower develops an earth fault. What is the most likely outcome?',
    options: [
      'Both the upstream RCCB and the bathroom RCBO race to trip; commonly the upstream wins and the entire installation goes dark',
      'Only the bathroom RCBO trips, because the upstream device sees the fault but deliberately waits',
      'Neither device trips, because the two equal residual sensitivities cancel each other out',
      'The MCB element of the RCBO trips first, and then the upstream RCCB resets itself automatically',
    ],
    correctAnswer: 0,
    explanation:
      'A 30 mA over 30 mA stack has no selectivity — the upstream is not Type S, and the IΔn ratio is 1:1 not 3:1. Both devices see the same residual current at the same instant and either may operate first. In practice the upstream RCCB very often wins, blacking out the whole installation for a single-circuit fault. Reg 536.4.1.4(b) is the rule that prevents this when correctly applied.',
  },
  {
    id: 3,
    question: 'NOTE 2 to Reg 536.4.1.4 says RCD type S is in accordance with which standards?',
    options: [
      'BS EN 60947-2 only',
      'BS 7288 only',
      'BS EN 61008 series or BS EN 61009 series',
      'BS EN 62423 only',
    ],
    correctAnswer: 2,
    explanation:
      'NOTE 2 to Reg 536.4.1.4 is exact: "RCD type S is in accordance with BS EN 61008 series or BS EN 61009 series." A time-delayed device to BS EN 60947-2 Annex B or M is a separate route (NOTE 3) and is marked with the symbol Δt followed by the limiting non-actuating time, or marked [S].',
  },
  {
    id: 4,
    question:
      'Why is an upstream 30 mA RCD that trips on a downstream fault a black-out failure rather than a safety failure?',
    options: [
      'Because it disconnects more of the installation than necessary, removing supply from circuits that had no fault — disconnection still happened, just over a wider area',
      'Because the user received an electric shock before the device operated',
      'Because the downstream device should have been rated higher than the upstream one',
      'Because the residual current that flowed was actually below the 30 mA threshold',
    ],
    correctAnswer: 0,
    explanation:
      'Disconnection still occurred within the time required by Reg 411.3.2 / 415.1, so the additional protection duty was met. The failure is operational continuity — the upstream device removed circuits that had no fault on them. Reg 536.4.1.4 exists to give continuity, not safety. Confusing the two is a common error in court explanations.',
  },
  {
    id: 5,
    question:
      'BS EN 61008 sets different maximum trip times for general-purpose and Type S RCDs at IΔn. At rated residual current, the type S device has approximately how long to trip?',
    options: [
      'The same trip-time window as a general-purpose device — a 300 ms maximum at IΔn',
      'No trip time at all, since a Type S RCD does not operate at its rated residual current',
      'Half the trip time of an equivalent general-purpose RCD at the same residual current',
      'A longer max (≈ 500 ms) plus a non-actuating minimum (≈ 130 ms) — the delay enables selectivity',
    ],
    correctAnswer: 3,
    explanation:
      'Per BS EN 61008-1 the Type S device has both a longer maximum trip time and a minimum non-actuating time at IΔn. The non-actuating window is what gives the downstream general-purpose RCD a chance to clear first. Without that window — i.e. without the [S] designation — there is no time discrimination and selectivity is not achieved.',
  },
  {
    id: 6,
    question:
      'You are testing a 100 mA Type S RCD upstream of a 30 mA RCBO on a kitchen ring. Which two tests do you carry out, and what do you record?',
    options: [
      'Trip-time each device at its own IΔn, plus a selectivity injection downstream — record both',
      'Only test the downstream device, since the upstream Type S is irrelevant to the result here',
      'Test only at 5×IΔn for additional protection and record that single figure on the schedule',
      'Test the insulation resistance of the circuit only, as RCD trip times are declared by the maker',
    ],
    correctAnswer: 0,
    explanation:
      'Two distinct tests. First, each device against its own permitted trip-time band (Type S has a longer max and a minimum non-actuating window — both must be in spec). Second, a selectivity test: a residual fault between the two devices, sized below upstream IΔn, that the downstream device must clear alone. Both go on the Schedule of Test Results — upstream IΔn AND downstream IΔn columns, both trip times, and a comments note confirming selectivity verified.',
  },
  {
    id: 7,
    question:
      'Reg 536.4.1.4 NOTE 4 adds a hard limitation on selectivity for line-to-earth AND neutral-to-earth faults. What is it?',
    options: [
      'The upstream RCD must be of Type B for selectivity to extend to neutral-to-earth faults',
      'The downstream RCD must have a rated residual operating current of 10 mA',
      'The downstream RCD must switch all live conductors, including the neutral',
      'The upstream RCD must be housed in a separate enclosure from the downstream devices',
    ],
    correctAnswer: 2,
    explanation:
      'NOTE 4 is precise: "Selectivity can only be achieved between an upstream type S RCD and any downstream RCD, with respect to both a line to earth and a neutral to earth fault, where the downstream RCD switches all live conductors (including the neutral)." A two-pole RCBO satisfies this on a single-phase circuit. A single-pole RCBO that does not switch the neutral does not, and selectivity for a N-E fault cannot be claimed.',
  },
  {
    id: 8,
    question:
      'What is the practical reason a Type S RCD is used at the origin of a TT installation, even when every outgoing way already has its own 30 mA RCBO?',
    options: [
      'It is cosmetic — the consumer unit simply looks tidier with a single incoming device',
      'Type S RCDs are cheaper than RCBOs, so they are fitted at the origin to save on cost',
      'Because BS 7671 forbids any 30 mA device being used at the origin of a TT installation',
      'It gives upstream TT earth-fault disconnection, and its delay grants selectivity to the 30 mA devices',
    ],
    correctAnswer: 3,
    explanation:
      'Two functions in one device. The upstream Type S satisfies the TT earth-fault disconnection / fire-protection role (sized against Ra per Table 53.1: at Ra = 167 Ω, max IΔn = 300 mA; at Ra = 500 Ω, max IΔn = 100 mA). The Type S characteristic gives the time delay that lets downstream 30 mA devices clear shock-protection faults first. One device, two duties.',
  },
  {
    id: 9,
    question:
      'You arrive at an existing TN-S installation. Origin device is a 30 mA RCCB. Below it are six 30 mA RCBOs. The customer reports "the whole house keeps tripping when the fridge starts." What is the regulatory and practical issue?',
    options: [
      'No selectivity (upstream not Type S, ratio 1:1) — code C3; fit a 100 mA Type S upstream',
      'The fridge is faulty and should simply be replaced to stop the whole-house tripping',
      'The downstream RCBOs have been wired the wrong way round and need their tails reversing',
      'The MCB element inside each RCBO has no role here and can be ignored in the diagnosis',
    ],
    correctAnswer: 0,
    explanation:
      'Classic 30/30 stack. No selectivity. Every downstream earth-leakage event — a kettle element, a fridge defrost cycle, a damp shower — risks tripping the origin device. The fix is a Type S device upstream (typical retrofit: 100 mA Type S RCCB or a 100 mA / 300 mA Type S incomer per the design and the TT/TN system arrangement), giving both the 3:1 IΔn ratio AND the time delay. EICR coding is generally C3 (improvement recommended) unless danger is present.',
  },
  {
    id: 10,
    question:
      'A site inspector queries your Schedule of Test Results because only the downstream RCBO IΔn / trip time is filled in for an installation with stacked RCDs. What does Reg 643 / the model schedule require, and why?',
    options: [
      'Only the device closest to the load needs to be recorded on the schedule of test results',
      'The schedule is a single-row form, so only one device can be entered per final circuit',
      'Both upstream and downstream IΔn and trip times, plus a comments note that selectivity was verified',
      'Selectivity is a design matter and does not require any test evidence on the certificate',
    ],
    correctAnswer: 2,
    explanation:
      'Every protective device that operated during testing requires its own row of evidence. Both the upstream Type S and the downstream RCBO must show IΔn (mA), trip time at IΔn, and where applicable trip time at 5×IΔn (for the additional-protection device). The selectivity verification — the injected fault below upstream IΔn that cleared via the downstream device only — goes in comments. A future periodic inspector relies entirely on the prior schedule to know what was tested; missing rows are missing evidence.',
  },
];

const InspectionTestingModule6Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Discriminating and selective RCDs (Type S) | I&T Module 6.5 | Elec-Mate',
    description:
      'Reg 536.4.1.4 in practice. Type S upstream over 30 mA downstream, the 3:1 IΔn ratio, the testing duty (trip time + selectivity injection), and what goes on the Schedule of Test Results when RCDs are stacked.',
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
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5"
            title="Discriminating and selective RCDs"
            description="Type S at the origin, 30 mA general-purpose downstream. The selectivity rule of Reg 536.4.1.4, and the two tests that prove it on the Schedule of Test Results."
            tone="yellow"
          />

          <TLDR
            points={[
              'Selectivity between RCDs in series is governed by Reg 536.4.1.4. Two conditions, both required: (i) the upstream RCD is selective type — type S, or time-delayed with appropriate setting — and (ii) the ratio of upstream IΔn to downstream IΔn is at least 3:1.',
              'Type S RCDs are defined by NOTE 2 to Reg 536.4.1.4 as devices in accordance with BS EN 61008 series or BS EN 61009 series. Time-delayed devices to BS EN 60947-2 Annex B/M are marked Δt or [S] (NOTE 3).',
              'Typical stack: 100 mA type S at the origin (fire / TT-system earth-fault duty) protecting 30 mA general-purpose RCBOs on each outgoing way (shock / additional-protection duty). 100 over 30 satisfies the 3:1 ratio and the time delay.',
              'An upstream 30 mA tripping on a downstream fault is a black-out failure, not a safety failure. Disconnection happened in the required time — but over a wider area than necessary. Reg 536.4.1.4 exists to give continuity, not shock protection.',
              'Two tests on the Schedule of Test Results when RCDs are stacked: (1) trip time of each device at its own IΔn — the type S has a longer permitted band; (2) a selectivity injection — a residual current below the upstream IΔn that must clear via the downstream device only. Both readings, both trip times, and a comments-column confirmation are recorded.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Quote Reg 536.4.1.4(b) verbatim and apply both conditions (selective type + 3:1 IΔn ratio) to a real consumer unit layout',
              'Distinguish a Type S device (BS EN 61008 / 61009 series, marked S) from a time-delayed device (BS EN 60947-2, marked Δt or [S]) — and from a general-purpose RCD',
              'Pair upstream IΔn correctly to downstream IΔn for both shock-protection and TT-system earth-fault duties — including the 100 mA / 300 mA / 500 mA upstream values from Table 53.1',
              'Explain the difference between a black-out failure (selectivity gone) and a safety failure (disconnection time missed) without ambiguity',
              'Run the two compliance tests at initial verification and EICR — trip time on each device individually, and a stacked residual injection that confirms downstream-only operation',
              'Record both upstream and downstream RCD values on the A4:2026 Schedule of Test Results so a future inspector can reconstruct the protection arrangement from the certificate alone',
            ]}
          />

          <ContentEyebrow>Why selectivity exists at all</ContentEyebrow>

          <ConceptBlock
            title="Two reasons RCDs end up in series — and only one of them is shock protection"
            plainEnglish="Stacked RCDs are not redundancy. The upstream device usually has a different job from the downstream device. The upstream is doing earth-fault disconnection for the whole installation (fire protection, TT-system disconnection, fault-protection back-up). The downstream is doing additional protection at 30 mA for sockets, lighting, bathrooms — the BS 7671 Reg 411.3.3 / 415.1 duty. Lose track of which device is doing which job and you end up with the wrong IΔn pairing."
            onSite="When you open a board, look for the upstream device first. Is it 100 mA, 300 mA, 500 mA? Is it marked S? Is it labelled time-delayed? Then look at the downstream — almost always 30 mA general-purpose. The combination tells you the design intent."
          >
            <p>The classic UK domestic and small commercial arrangement is one of three layouts:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>TN-S / TN-C-S consumer unit, all-RCBO board.</strong> 30 mA general-purpose
                RCBOs on every outgoing way. No upstream RCD. Every circuit gets shock-protection
                additional protection at 30 mA. The main switch is just an isolator.
              </li>
              <li>
                <strong>TN-S / TN-C-S board with a Type S incomer.</strong> 100 mA type S RCCB at
                the origin (or as a sub-main feed) protecting against fire (Reg 422.3.9 / persistent
                earth fault risk) and providing earth-fault disconnection back-up. Below it, 30 mA
                RCBOs on outgoing ways.
              </li>
              <li>
                <strong>TT installation.</strong> A type S RCCB at the origin is effectively
                mandatory because the high earth-electrode resistance Ra means the overcurrent
                device cannot meet the disconnection times of Table 41.1. The upstream IΔn is sized
                from Table 53.1 against Ra: at Ra = 167 Ω, max IΔn = 300 mA; at Ra = 500 Ω, max IΔn
                = 100 mA; at Ra = 1667 Ω, max IΔn = 30 mA. Below it, 30 mA RCBOs continue to provide
                the additional-protection duty.
              </li>
            </ul>
            <p>
              In each of the second two layouts, you have RCDs in series. Reg 536.4.1.4 is the
              regulation that tells you how to make them work without one stealing the other&rsquo;s
              fault.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 536.4.1.4(b) — Selectivity in case of residual currents"
            clause={
              <>
                Selectivity in case of residual currents, as shown in Figure 536.2, is given under
                the following conditions: (i) the upstream RCD is of selective type (type S or
                time-delayed type with appropriate time delay setting); and (ii) the ratio of the
                rated residual operating current of the upstream RCD to that of the downstream RCD
                is at least 3:1. In the case of RCDs with adjustable rated residual operating
                current and time delay, reference shall be made to manufacturer&rsquo;s instructions
                for selectivity.
              </>
            }
            meaning="Both conditions, every time. The upstream device must be a selective type — a Type S device per BS EN 61008/61009 series, or a time-delayed CBR per BS EN 60947-2 with a deliberate non-actuating window. AND the IΔn ratio must be at least 3:1. A 100 mA upstream over a 30 mA downstream meets both. A 30 mA upstream over a 30 mA downstream meets neither."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 536.4.1.4 NOTE 2 and NOTE 3"
            clause={
              <>
                NOTE 2: RCD type S is in accordance with BS EN 61008 series or BS EN 61009 series.
                <br />
                NOTE 3: A time-delay type RCD in accordance with BS EN 60947-2, Annex B or Annex M
                will be marked with the symbol Δt followed by the limiting non-actuating time in ms
                or marked with an [S].
              </>
            }
            meaning="If you cannot find an [S] symbol or a Δt marking on the upstream device, it is not selective. A general-purpose RCCB / RCBO does not become selective by being installed at the origin — selectivity is a built-in characteristic of the device, marked on the case, defined by the standard."
          />

          <ConceptBlock
            title="What &ldquo;selective&rdquo; physically means inside the device"
            plainEnglish="A general-purpose RCD must trip within 300 ms at its rated residual operating current (IΔn). A type S device must wait — there is a deliberate non-actuating window of around 130 ms before any tripping action begins. That waiting period is what gives the downstream device time to clear the fault first. The whole concept of selectivity collapses to: the upstream device pauses, the downstream device acts, the upstream device sees the fault disappear and never trips."
          >
            <p>BS EN 61008-1 sets two trip-time bands per IΔn for type S devices:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Maximum trip time:</strong> longer than the general-purpose 300 ms band — a
                type S device is permitted to take up to ≈ 500 ms at rated IΔn. The longer max
                accommodates the deliberate delay.
              </li>
              <li>
                <strong>Minimum non-actuating time:</strong> approximately 130 ms at IΔn. The device
                must NOT trip during that window — which is what allows the downstream device to
                clear and the upstream device to ride through.
              </li>
            </ul>
            <p>
              That non-actuating window is the entire mechanism of selectivity. Without it, a faster
              upstream device will simply trip first whenever the residual current exceeds its IΔn.
              The 3:1 IΔn ratio in Reg 536.4.1.4(b)(ii) is the second half of the equation: it
              ensures that residual currents at the downstream end of the operating range (just
              above 30 mA, say) never reach the upstream IΔn (100 mA) — so the upstream device sees
              nothing and the downstream device handles it cleanly.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The two failure modes — and only one of them is dangerous</ContentEyebrow>

          <ConceptBlock
            title="Black-out failure vs safety failure"
            plainEnglish="If a downstream fault trips the upstream device, you get a black-out: the bathroom shower has an earth fault, but the kitchen, the lights, the boiler all go off too. Disconnection still happened in time. Nobody got a shock. The user is annoyed, not in danger. That is a continuity failure, not a safety failure — and BS 7671 calls it that to keep the priorities straight."
            onSite="A homeowner standing in the dark thinks they have been injured by their installation. A court will not. The Reg 411 disconnection time was met. The Reg 415.1 additional protection was met. The only thing that failed was Reg 536.4.1.4 — operational continuity. Get the language right when you write the EICR."
          >
            <p>The taxonomy matters because the EICR coding follows it:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Black-out failure (continuity):</strong> upstream trips on a downstream
                fault. No shock, no danger. Typical EICR coding is C3 (improvement recommended) on
                an existing 30 / 30 stack — recommend swap of the upstream device to a Type S to
                comply with Reg 536.4.1.4. Code FI (further investigation) is rarely justified
                because the protective duty was met.
              </li>
              <li>
                <strong>Safety failure (shock / fire):</strong> the downstream device fails to
                operate at all (mechanical fault, wrong type for the load, wired-out neutral,
                blinding by upstream type) AND the upstream is too coarse to clear the fault inside
                the disconnection time. That is C1 / C2 territory — a real danger. Selectivity is
                irrelevant; the question becomes whether the protective measure works at all.
              </li>
            </ul>
            <p>
              Confusing the two on a certificate either over-states danger (an unnecessary C2 on a
              30 / 30 stack) or under-states it (calling a non-functional downstream device a mere
              continuity issue). Read the symptom carefully, then code it.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Calling the 30 / 30 stack &lsquo;dangerous&rsquo; on the EICR"
            whatHappens="An inspector finds a 30 mA RCCB at the origin protecting six 30 mA RCBOs on outgoing ways. They write C2 on the EICR — &lsquo;potentially dangerous&rsquo;. The customer reads this and thinks they have a fire risk. In reality the installation has a continuity issue, not a safety issue: every fault is still cleared within the Reg 411 / 415 disconnection times. The C2 code is wrong, escalates into a remedial quote that frightens the customer, and risks a complaint to the certifying body for incorrect coding."
            doInstead="Code the issue as C3 (improvement recommended) and explain in plain English: &lsquo;The arrangement of RCDs in series does not satisfy the selectivity requirements of BS 7671 Reg 536.4.1.4 (need upstream selective type and 3:1 IΔn ratio). Earth faults on individual circuits may trip the entire installation. The protective duty is being met — this is a continuity issue, not a safety issue. Recommend replacing the upstream device with a 100 mA type S RCCB.&rsquo; Plain words, accurate code, and the customer makes an informed decision."
          />

          <SectionRule />

          <ContentEyebrow>The standard pairing — 100 mA over 30 mA</ContentEyebrow>

          <ConceptBlock
            title="Why 100 mA upstream and 30 mA downstream is the canonical UK pairing"
            plainEnglish="100 mA over 30 mA is the smallest IΔn ratio that meets Reg 536.4.1.4(b)(ii)&rsquo;s 3:1 minimum. Smaller upstream IΔn — say 60 mA — does not exist as a standard product, and would not give the 3:1 margin against tolerance. Larger upstream IΔn — say 300 mA — works for selectivity but compromises the upstream&rsquo;s own usefulness as a fire-protection device. 100 mA is the sweet spot and is what the major UK consumer-unit manufacturers ship."
          >
            <p>The arithmetic for the 3:1 ratio:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Upstream IΔn = 100 mA. Downstream IΔn = 30 mA. Ratio = 100 ÷ 30 = 3.33 → ≥ 3:1.
                Compliant.
              </li>
              <li>
                Upstream IΔn = 300 mA. Downstream IΔn = 100 mA. Ratio = 300 ÷ 100 = 3 → ≥ 3:1.
                Compliant. Used for sub-main-to-distribution-board arrangements in larger
                installations.
              </li>
              <li>
                Upstream IΔn = 500 mA. Downstream IΔn = 100 mA. Ratio = 5 → comfortably above 3:1.
                Used for larger TT distributions or where Ra demands a high upstream IΔn.
              </li>
              <li>
                Upstream IΔn = 30 mA. Downstream IΔn = 30 mA. Ratio = 1 → fails the 3:1. Not
                compliant. The upstream is also not a selective type, so both 536.4.1.4(b)
                conditions fail simultaneously.
              </li>
            </ul>
            <p>
              The 3:1 figure is not arbitrary. It accounts for component tolerance: a 30 mA device
              may actually trip anywhere from 15 mA to 30 mA per the BS EN 61008 specification, and
              a 100 mA upstream device may trip anywhere from 50 mA to 100 mA. Even with worst-case
              tolerance — downstream tripping at 30 mA, upstream tripping at 50 mA — the upstream
              still has a margin against single-circuit faults that the downstream is meant to
              clear. The 3:1 nominal ratio survives the tolerance band; a 2:1 ratio does not.
            </p>
          </ConceptBlock>

          {/* Diagram — typical CU layout with Type S upstream + 30 mA RCBOs downstream */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Selective stack — 100 mA type S at origin, 30 mA RCBOs on outgoing ways
            </h4>
            <svg
              viewBox="0 0 820 470"
              className="w-full h-auto"
              role="img"
              aria-label="Consumer unit selectivity diagram. A 100 mA type S RCCB at the origin protects against fire and provides earth-fault back-up. Below it, six 30 mA general-purpose RCBOs protect individual final circuits. Trip-time bands per BS EN 61008 are annotated."
            >
              {/* Supply incomer */}
              <line
                x1="40"
                y1="40"
                x2="120"
                y2="40"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <text x="40" y="32" fill="rgba(255,255,255,0.5)" fontSize="10">
                Supply (TN-S / TN-C-S / TT)
              </text>

              {/* Main switch */}
              <rect
                x="120"
                y="25"
                width="80"
                height="30"
                rx="4"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text x="160" y="44" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Main switch
              </text>

              {/* Type S upstream RCCB */}
              <line
                x1="200"
                y1="40"
                x2="260"
                y2="40"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <rect
                x="260"
                y="15"
                width="200"
                height="60"
                rx="6"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="360"
                y="35"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                UPSTREAM RCD — TYPE S
              </text>
              <text x="360" y="50" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                IΔn = 100 mA · BS EN 61008 series
              </text>
              <text x="360" y="65" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Marked &quot;S&quot; · non-actuating ≈ 130 ms · max trip ≈ 500 ms
              </text>

              {/* Busbar to RCBOs */}
              <line
                x1="360"
                y1="75"
                x2="360"
                y2="110"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <line
                x1="80"
                y1="110"
                x2="640"
                y2="110"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />

              {/* Six RCBOs */}
              {[
                { x: 80, label: 'Lights GF', circuit: 'B6 / 6 A' },
                { x: 180, label: 'Lights 1F', circuit: 'B6 / 6 A' },
                { x: 280, label: 'Sockets GF', circuit: 'B32 / 32 A' },
                { x: 380, label: 'Sockets 1F', circuit: 'B32 / 32 A' },
                { x: 480, label: 'Cooker', circuit: 'B40 / 40 A' },
                { x: 580, label: 'Shower', circuit: 'B40 / 40 A' },
              ].map((c, i) => (
                <g key={i}>
                  <line
                    x1={c.x + 40}
                    y1="110"
                    x2={c.x + 40}
                    y2="135"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1.5"
                  />
                  <rect
                    x={c.x}
                    y="135"
                    width="80"
                    height="70"
                    rx="5"
                    fill="rgba(34,197,94,0.08)"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                  />
                  <text
                    x={c.x + 40}
                    y="152"
                    textAnchor="middle"
                    fill="#22C55E"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    RCBO 30 mA
                  </text>
                  <text
                    x={c.x + 40}
                    y="167"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="9"
                  >
                    general-purpose
                  </text>
                  <text
                    x={c.x + 40}
                    y="183"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.85)"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {c.label}
                  </text>
                  <text
                    x={c.x + 40}
                    y="197"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.5)"
                    fontSize="9"
                  >
                    {c.circuit}
                  </text>
                  {/* Outgoing line */}
                  <line
                    x1={c.x + 40}
                    y1="205"
                    x2={c.x + 40}
                    y2="230"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.2"
                  />
                </g>
              ))}

              {/* Annotation — the 3:1 ratio */}
              <rect
                x="660"
                y="20"
                width="150"
                height="80"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.25)"
                strokeWidth="1"
              />
              <text
                x="735"
                y="38"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Reg 536.4.1.4(b)
              </text>
              <text x="735" y="54" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                100 mA ÷ 30 mA
              </text>
              <text
                x="735"
                y="68"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                = 3.33 ≥ 3:1 ✓
              </text>
              <text x="735" y="84" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                + selective type ✓
              </text>

              {/* Trip-time band annotation */}
              <rect
                x="40"
                y="260"
                width="740"
                height="200"
                rx="8"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="60" y="282" fill="#FBBF24" fontSize="11" fontWeight="bold">
                Trip-time bands at IΔn (BS EN 61008-1)
              </text>

              {/* Time axis */}
              <line
                x1="120"
                y1="410"
                x2="720"
                y2="410"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
              <text x="60" y="414" fill="rgba(255,255,255,0.6)" fontSize="10">
                t (ms)
              </text>

              {/* Tick marks */}
              {[0, 100, 200, 300, 400, 500, 600].map((t, i) => {
                const x = 120 + i * 100;
                return (
                  <g key={i}>
                    <line
                      x1={x}
                      y1="408"
                      x2={x}
                      y2="414"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y="428"
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.5)"
                      fontSize="9"
                    >
                      {t}
                    </text>
                  </g>
                );
              })}

              {/* Downstream 30 mA band — 0 to 300 ms */}
              <rect
                x="120"
                y="320"
                width="300"
                height="22"
                rx="3"
                fill="rgba(34,197,94,0.20)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="270"
                y="336"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Downstream 30 mA RCBO — must trip ≤ 300 ms
              </text>
              <line
                x1="420"
                y1="331"
                x2="420"
                y2="408"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />

              {/* Type S non-actuating window — 0 to 130 ms */}
              <rect
                x="120"
                y="350"
                width="130"
                height="22"
                rx="3"
                fill="rgba(239,68,68,0.18)"
                stroke="#EF4444"
                strokeWidth="1.2"
              />
              <text
                x="185"
                y="366"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Type S non-actuating ≈ 130 ms
              </text>

              {/* Type S trip band — 130 to 500 ms */}
              <rect
                x="250"
                y="380"
                width="370"
                height="22"
                rx="3"
                fill="rgba(251,191,36,0.18)"
                stroke="#FBBF24"
                strokeWidth="1.2"
              />
              <text
                x="435"
                y="396"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Type S trip band — 130 to ≈ 500 ms
              </text>

              <text x="60" y="455" fill="rgba(255,255,255,0.7)" fontSize="9">
                The 130 ms non-actuating window on the upstream Type S is the time discrimination —
                long enough for the downstream 30 mA RCBO to clear and reset the residual current to
                zero.
              </text>
            </svg>
          </div>

          <Scenario
            title="A new TT cottage — origin Type S over outgoing 30 mA RCBOs"
            situation="A rural cottage on TT. Earth electrode resistance Ra measured at 145 Ω. Designer specifies a 100 mA Type S RCCB at the origin and 30 mA single-pole-and-neutral RCBOs on each of seven outgoing ways. You are completing the EIC and the Schedule of Test Results."
            whatToDo={
              <>
                <span className="block">
                  1. Check Table 53.1: Ra of 145 Ω is below the 167 Ω threshold for max IΔn = 300 mA
                  → 100 mA upstream is comfortably below the table maximum. Compliant.
                </span>
                <span className="block">
                  2. Check Reg 536.4.1.4(b): upstream is type S (BS EN 61008 series, marked S) ✓.
                  Ratio 100 ÷ 30 = 3.33 ≥ 3:1 ✓. Selectivity conditions met.
                </span>
                <span className="block">
                  3. Test trip time: upstream type S at IΔn (100 mA) — must fall in 130–500 ms band.
                  Downstream RCBOs at IΔn (30 mA) — must trip ≤ 300 ms. Plus 5×IΔn (150 mA) at the
                  downstream — must trip ≤ 40 ms (additional protection).
                </span>
                <span className="block">
                  4. Test selectivity: inject a residual fault between upstream and downstream
                  (sized below 100 mA — typically 30 mA via the downstream device&rsquo;s test
                  facility or via a controlled residual injection). Confirm the downstream RCBO
                  clears, the upstream type S does NOT operate, and the upstream remains in service.
                </span>
                <span className="block">
                  5. Record on the Schedule: upstream IΔn (100 mA), upstream trip time at IΔn,
                  downstream IΔn (30 mA), downstream trip times at IΔn and 5×IΔn, and a comments
                  note: &quot;Selectivity verified per Reg 536.4.1.4 — downstream operated alone on
                  injected fault.&quot;
                </span>
              </>
            }
            whyItMatters="On a TT cottage, the upstream device IS the earth-fault protection for the whole installation. If the upstream Type S fails to operate (or is incorrectly selected), persistent low-level earth faults will not clear and the installation can develop a fire risk per Reg 422.3.9. The selectivity check is not just about continuity — on TT it is the verification that the upstream device is doing its primary fault-protection job."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The two tests — and what each proves</ContentEyebrow>

          <ConceptBlock
            title="Test 1 — trip time on each device individually"
            plainEnglish="Each RCD has its own trip-time test, against its own permitted band. The upstream type S has a longer max trip time and a minimum non-actuating time. The downstream 30 mA general-purpose has a 300 ms max and (for additional protection) a 40 ms max at 5×IΔn. Both must be tested. Both readings go on the schedule. Neither device is exempt because there is another RCD above or below it."
            onSite="Modern multifunction testers have a Type S setting that applies the longer permitted band — use it. If your tester does not have an S setting, the device must still be tested but you compare the reading against the BS EN 61008 published Type S limits manually."
          >
            <p>The two trip-time tests at initial verification or EICR:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Upstream type S at IΔn:</strong> tester set to type S, residual current
                injected at 100 mA (or whatever the device IΔn is). Reading must fall in the ≈
                130–500 ms band. A reading of 280 ms is normal. A reading of 60 ms indicates the
                device is actually general-purpose (no built-in delay) — investigate before
                accepting.
              </li>
              <li>
                <strong>Downstream general-purpose at IΔn:</strong> tester set to general-purpose,
                30 mA injected. Reading must be ≤ 300 ms. Typical readings are 20–40 ms on modern
                RCBOs.
              </li>
              <li>
                <strong>Downstream additional protection at 5×IΔn:</strong> 150 mA injected on the
                downstream. Reading must be ≤ 40 ms per Reg 415.1.1. Typical readings are 10–20 ms.
              </li>
            </ol>
            <p>
              Each reading goes on the Schedule of Test Results in the appropriate column, with the
              IΔn it was tested at noted unambiguously. A common error is recording only one trip
              time (5×IΔn) and omitting IΔn, which means a future inspector cannot confirm whether
              the device met its own basic spec. Record both.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Test 2 — selectivity injection between the devices"
            plainEnglish="The selectivity test is separate from the trip-time tests. It proves the stack works as a stack. You inject a residual current at a downstream test point — sized below the upstream IΔn but above the downstream IΔn — and you confirm only the downstream device operates. The upstream type S sees the fault start, waits in its non-actuating window, sees the fault disappear when the downstream clears, and never trips."
            onSite="The simplest method on a domestic install is to use the test button on the downstream RCBO. The fault current it generates is below the upstream 100 mA but above the downstream 30 mA. After pressing test, both devices should be checked: downstream tripped, upstream still ON. If the upstream tripped — or both tripped — selectivity has failed."
          >
            <p>
              A more rigorous version uses a controlled injection box at a known residual value
              between the upstream and downstream IΔn — for example 50 mA on a 100 mA / 30 mA stack.
              The 50 mA is high enough to operate the 30 mA downstream (well above its IΔn of 30 mA,
              well below its 5×IΔn of 150 mA, sitting clearly inside its operating range) and low
              enough to not exceed the upstream IΔn of 100 mA. After injection:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Downstream RCBO should trip within ≈ 300 ms.</li>
              <li>
                Upstream type S should NOT trip — its non-actuating window absorbs the residual
                current for long enough that the downstream device clears the fault first.
              </li>
              <li>
                Restore power to the downstream device. Upstream is still in service — no whole-
                installation interruption occurred.
              </li>
            </ul>
            <p>
              The result is recorded on the schedule comments column. Wording matters: &ldquo;Type S
              upstream did not operate on inter-device residual fault below upstream IΔn —
              selectivity verified per Reg 536.4.1.4.&rdquo; A future inspector reads that and knows
              exactly what was tested.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Pressing the test button on the upstream Type S and assuming that proves selectivity"
            whatHappens="The test button injects a residual current within the upstream device&rsquo;s own range — by design — to prove the device itself trips. It does NOT prove anything about selectivity with downstream devices. The inspector ticks &lsquo;test button operated, both devices off&rsquo; and treats it as a selectivity check. It is not. The downstream device tripping when the upstream test button was pressed is proof of cascade tripping, not selectivity."
            doInstead="The selectivity test uses a residual injection at a downstream test point, sized between the two IΔn values. The expected result is downstream-only tripping with the upstream untouched. If you do not have an injection facility, the downstream RCBO test button is an acceptable proxy on a stacked install — the residual it generates is well below the upstream IΔn. Either way, the test point is downstream of the upstream device, never upstream of it."
          />

          <CommonMistake
            title="Filing only the downstream device on the Schedule of Test Results"
            whatHappens="The test engineer fills in IΔn and trip time for the 30 mA RCBO on each circuit but leaves the upstream type S blank — &lsquo;it&rsquo;s not on a circuit.&rsquo; Five years later a periodic inspector arrives. They have no record that the upstream device was ever tested. They cannot confirm whether selectivity was verified. The installation looks deficient on paper even if the protection is fine in practice."
            doInstead="Every protective device that operates as part of automatic disconnection of supply gets its own row on the Schedule of Test Results — including upstream main-switch-position RCDs, sub-main RCDs, and DB-incomer RCDs. IΔn (mA), trip time at IΔn, and (for any device that also provides additional protection at 30 mA) trip time at 5×IΔn. Plus a comments note when devices are stacked: &lsquo;Selectivity verified per Reg 536.4.1.4&rsquo;. The schedule is the durable record."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Other selectivity arrangements you will encounter</ContentEyebrow>

          <ConceptBlock
            title="300 mA over 100 mA — the sub-main pattern"
            plainEnglish="In larger installations, a 300 mA type S device sits at a sub-main feed and protects 100 mA RCDs at downstream distribution boards. Below those, 30 mA RCBOs protect final circuits. That is two layers of selectivity stacked: 300 mA type S over 100 mA type S over 30 mA general-purpose. Each pair satisfies Reg 536.4.1.4(b) — 300 ÷ 100 = 3, 100 ÷ 30 = 3.33."
            onSite="A common error is putting a non-type-S 100 mA RCD as the middle device. The 300 ÷ 100 = 3 ratio is met but the middle device is not a selective type, so condition (i) of Reg 536.4.1.4(b) fails: the middle device will trip on faults above 100 mA before the upstream type S has time to react, but for faults that appear at the downstream 30 mA level, the middle device may also trip with the downstream — losing selectivity below the middle device."
          >
            <p>
              For multi-layer stacks the rule is simple: every selective layer except the very
              bottom one must be a type S (or time-delayed) device. A type S in the middle waits
              long enough for the device below it to clear, while still being fast enough to be
              cleared itself by the type S above it. Mixing in a general-purpose device anywhere
              except the bottom of the stack creates a layer with no time discrimination, and the
              chain breaks at that point.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Selectivity and the &lsquo;blinding&rsquo; rule (Annex 53 / Figure A53.2)"
            plainEnglish="Selectivity is not just an IΔn problem. RCD type matters too. A Type AC device upstream of a Type A device blinds the upstream — the load characteristic the Type A was selected for (pulsed DC, for example) confuses the simpler Type AC into not detecting residual currents it would otherwise see. The same applies further up: Type A upstream of Type F or B blinds the Type A; Type F upstream of Type B blinds the Type F."
            onSite="Read up the chain. The upstream device must be at least as &lsquo;capable&rsquo; as everything below it. Type AC is the simplest; Type B the most capable. The upstream is the more-capable type, or the same — never less capable."
          >
            <p>
              Figure A53.2 in BS 7671 sets the order. NOTE 1 is the operative rule: &ldquo;A Type AC
              RCD should not be fitted upstream of a Type A (without or with an RDC-DD), Type F
              (without or with an RDC-DD) or Type B, as the load characteristics that the Type A,
              Type F or Type B has been selected for could impair operation of the Type AC
              RCD.&rdquo; NOTE 5 names the failure mode: &ldquo;impaired operation is commonly
              termed as RCD blinding.&rdquo;
            </p>
            <p>
              Practical impact on the selectivity stack: if a downstream circuit has a Type A RCBO
              (because it has DC components — most do, since LED drivers, EV chargers, modern
              electronics produce pulsed DC), then everything upstream of it must also be at least
              Type A. A Type AC type S RCCB at the origin paired with Type A RCBOs is a defective
              arrangement — the type AC upstream device may be blinded by the same waveforms the
              downstream devices are selected to detect. Default to Type A or better at every level
              for new work.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            The TT system case — where Type S is essentially mandatory
          </ContentEyebrow>

          <ConceptBlock
            title="Why a TT installation almost always has a Type S RCD at the origin"
            plainEnglish="On a TT system, the earth fault loop relies on the local earth electrode rather than a distributor-supplied earth. That electrode resistance Ra is typically 50–500 Ω. The earth-fault current at that resistance is far too low to operate any overcurrent device within the disconnection times of Reg 411.3.2 / Table 41.1. The whole earth-fault disconnection duty falls on an RCD. For practical installations Ra puts the maximum permissible IΔn somewhere between 100 mA and 300 mA — both of which are sized for the upstream type S role, not the downstream 30 mA shock-protection role."
          >
            <p>
              Reg 531.3.5.3.2 is the regulation that ties Ra to maximum permitted upstream IΔn, via
              Table 53.1. Reading the table:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Ra ≤ 167 Ω → max upstream IΔn = 300 mA</li>
              <li>Ra ≤ 500 Ω → max upstream IΔn = 100 mA</li>
              <li>Ra ≤ 1667 Ω → max upstream IΔn = 30 mA</li>
            </ul>
            <p>
              Below 167 Ω a 300 mA upstream is permitted — common for sub-mains feeding TT
              outbuildings. Between 167 and 500 Ω, 100 mA is the upper limit — common for a TT
              cottage. Above 500 Ω, only a 30 mA device gives compliant disconnection — but a 30 mA
              upstream defeats selectivity with downstream 30 mA devices unless those downstream
              devices are themselves significantly smaller, which is impractical. In that situation
              the design choice is usually to improve the earth electrode (driven additional rods,
              plate, or mat) to bring Ra below 500 Ω, then specify a 100 mA Type S upstream.
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

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="What the schedule must show when RCDs are stacked"
            plainEnglish="The A4:2026 model schedule columns include rated residual operating current (IΔn), trip time at IΔn, trip time at 5×IΔn (where additional protection is provided), and comments. With stacked RCDs you fill those columns for both devices, and you use the comments column to record the selectivity test."
          >
            <p>Three rules every time:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Upstream device row:</strong> IΔn (e.g. 100 mA), trip time at IΔn measured
                with tester set to type S (e.g. 280 ms), comments column flagging device type
                (&ldquo;Type S, BS EN 61008 series&rdquo;). 5×IΔn is not normally tested on an
                upstream type S that does not also provide additional protection.
              </li>
              <li>
                <strong>Downstream device rows (one per circuit):</strong> IΔn (e.g. 30 mA), trip
                time at IΔn (e.g. 24 ms), trip time at 5×IΔn (e.g. 12 ms — must be ≤ 40 ms for
                additional protection per Reg 415.1.1).
              </li>
              <li>
                <strong>
                  Selectivity verification (comments column on either the upstream or summary row):
                </strong>{' '}
                &ldquo;Selectivity per Reg 536.4.1.4 verified by inter-device residual injection —
                downstream operated alone, upstream did not trip.&rdquo;
              </li>
            </ul>
            <p>
              Without all three, a future periodic inspector cannot reconstruct the protection
              arrangement. The Schedule of Test Results is a durable evidential document — it
              survives the installer leaving, the company changing hands, the meter being upgraded.
              Every piece of protective evidence belongs on it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 531.3.4.1 — RCD product standards (ordinary persons)"
            clause={
              <>
                In AC installations having RCDs that are intended to be operated by ordinary
                persons, the RCDs shall comply with: (a) BS EN 61008 series for Type AC and Type A
                RCCBs; or (b) BS EN 61009 series for Type AC and Type A RCBOs; or (c) BS EN 62423
                for Type F and Type B RCCBs and RCBOs; or (d) BS 7288 for Type AC and Type A SRCDs
                and FCURCDs.
              </>
            }
            meaning="The Type S designation lives within the BS EN 61008 series (RCCBs) and BS EN 61009 series (RCBOs). Therefore the upstream selective device on a typical UK domestic install is a Type AC or Type A RCCB / RCBO carrying the [S] selective marking, conforming to one of these two standards. If a device claims selectivity but is to BS 7288 (SRCD / FCURCD), it does not satisfy NOTE 2 to Reg 536.4.1.4."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 531.3.4.201 — RCD adjustment by ordinary persons"
            clause={
              <>
                Where an RCD may be operated by an ordinary person, it shall be designed or
                installed so that it is not possible to modify or adjust the setting or the
                calibration of its rated residual operating current (IΔn) or time delay mechanism
                without a deliberate act involving the use of either a key or a tool and resulting
                in a visible indication of its setting or calibration.
              </>
            }
            meaning="The A4:2026 wording explicitly extends the tamper-resistance duty to the time-delay mechanism — relevant to Type S and time-delayed devices because their selectivity is delivered by that delay. A Type S device whose delay can be defeated by a finger-twist would no longer satisfy this regulation. Modern domestic Type S devices have factory-fixed characteristics; adjustable industrial CBRs require a key or tool to change."
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 536.4.1.4(b) — selectivity in case of residual currents: upstream RCD is selective type (Type S or time-delayed with appropriate setting) AND ratio of upstream IΔn to downstream IΔn is at least 3:1. Both conditions, every time.',
              'NOTE 2 — Type S is per BS EN 61008 series or BS EN 61009 series. NOTE 3 — time-delayed is per BS EN 60947-2 Annex B/M, marked Δt with non-actuating time, or marked [S].',
              'Standard UK domestic / small commercial pairing: 100 mA Type S upstream over 30 mA general-purpose downstream — 3.33:1 ratio, time delay built in.',
              'NOTE 4 — selectivity for both line-earth AND neutral-earth faults requires the downstream RCD to switch all live conductors including the neutral.',
              'An upstream 30 mA on a downstream 30 mA stack is not selective. Most often coded C3 on EICR (continuity, not danger) — recommend swap to upstream Type S.',
              'TT systems: Reg 531.3.5.3.2 / Table 53.1 ties Ra to max upstream IΔn. Below Ra = 167 Ω, 300 mA permitted. Below 500 Ω, 100 mA permitted.',
              'Two tests on stacked RCDs: (1) trip time of each device at its own IΔn against its own permitted band; (2) inter-device residual injection below upstream IΔn — downstream must clear alone.',
              'Schedule of Test Results: every protective device gets its own row of evidence — IΔn, trip time at IΔn, and where the device provides additional protection, trip time at 5×IΔn. Selectivity verification recorded in comments.',
              'Type AC upstream of Type A / F / B causes RCD blinding (Annex A53, Figure A53.2). Match upstream type to downstream type or higher.',
              'A Type S device whose delay is finger-adjustable fails Reg 531.3.4.201 — adjustment must require a key or tool plus a visible indication of setting.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'A 30 mA RCCB at the origin protects six 30 mA RCBOs. Is this dangerous, or just non-compliant?',
                answer:
                  'Non-compliant with Reg 536.4.1.4 (no selective upstream device, IΔn ratio 1:1 not 3:1) but not dangerous — every fault is still cleared within the Reg 411 / 415 disconnection times. This is a continuity issue, not a safety issue. EICR coding is generally C3 (improvement recommended). Recommend replacing the upstream 30 mA RCCB with a 100 mA Type S RCCB to give the 3:1 ratio and the time delay. Code C2 is rarely justified — reserve C2 for situations where the protective duty itself fails, not just selectivity.',
              },
              {
                question:
                  'How do I tell from looking at the device whether it is Type S or general-purpose?',
                answer:
                  'Type S devices are marked with the letter S (often inside a square — [S]) on the case. Time-delayed devices to BS EN 60947-2 are marked Δt followed by the non-actuating time in milliseconds, or alternatively also marked [S] (NOTE 3 to Reg 536.4.1.4). General-purpose devices have no S marking. If the device only carries IΔn (e.g. "30 mA" or "100 mA") without an S, it is general-purpose — even at 100 mA. Selectivity is built into the device, not into the IΔn rating.',
              },
              {
                question:
                  'Can I use 100 mA general-purpose (no S) upstream of 30 mA general-purpose to get selectivity through the IΔn ratio alone?',
                answer:
                  'No. Reg 536.4.1.4(b)(i) requires the upstream device to be of selective type (Type S or time-delayed). The 3:1 ratio in (b)(ii) is a separate condition; both apply together. A general-purpose 100 mA upstream over 30 mA downstream meets the ratio but fails the selective-type condition — and in practice will frequently trip first because it has no built-in delay. The 100 mA upstream may see the downstream fault as soon as residual current rises to 100 mA, and will trip in around 50–100 ms — comparable to the downstream device, with no margin for selectivity. Selectivity by IΔn ratio alone, without the time element, does not work reliably.',
              },
              {
                question:
                  'On the Schedule of Test Results, do I have to show the upstream Type S as well as the downstream RCBOs?',
                answer:
                  'Yes — both. Every protective device that participates in automatic disconnection of supply gets its own row on the schedule, with IΔn, trip time at IΔn, and (for additional-protection devices at 30 mA) trip time at 5×IΔn. Plus a comments note recording the selectivity injection result. The schedule is the durable record a future inspector relies on. Showing only one device leaves the protection arrangement undocumented and the certificate evidentially weak.',
              },
              {
                question:
                  'On a TT system with Ra = 600 Ω, what upstream IΔn am I limited to per Table 53.1?',
                answer:
                  'Ra of 600 Ω is between the 500 Ω row (100 mA max) and the 1667 Ω row (30 mA max) of Table 53.1. Ra above 500 Ω puts the maximum permitted IΔn at 30 mA. A 30 mA upstream defeats selectivity with downstream 30 mA RCBOs — the 3:1 ratio cannot be met without specifying impractically small downstream IΔn (10 mA, which is rare and expensive). The standard design response is to improve the earth electrode (additional rods, plate, mat) to bring Ra below 500 Ω, then specify a 100 mA Type S upstream. If the electrode genuinely cannot be improved, the downstream selectivity is simply not achievable and the design accepts the loss-of-supply risk.',
              },
              {
                question:
                  'If the test button on the downstream RCBO trips both devices in the stack, what does that tell me?',
                answer:
                  'Selectivity has failed. The test button on the downstream device generates a residual current at or above the device IΔn but below the upstream IΔn. If both devices trip, either (a) the upstream is not actually a selective type — possibly a general-purpose device with the wrong rating, or (b) the upstream is a Type S but is faulty and not delivering its non-actuating window, or (c) the upstream IΔn is set too close to the downstream value (e.g. 60 mA over 30 mA — only 2:1 ratio), making the upstream see the test current as a real fault. Investigate the upstream device first: confirm marking, model number, and IΔn before assuming the worst.',
              },
              {
                question:
                  'Does Reg 536.4.1.4 require selectivity on every installation with multiple RCDs, or only where the designer chooses to provide it?',
                answer:
                  'Reg 536.4.1.4 sets out HOW selectivity must be achieved when it is required — it does not in itself MANDATE selectivity. The requirement to provide selectivity comes from Reg 314.1 (division of installation), Reg 531.3.2 (minimising unwanted tripping by use of RCBOs per circuit), and the design intent. In practice, modern UK domestic installations almost always require selectivity because losing the entire supply on a single-circuit fault is operationally unacceptable. On EICR, the question becomes whether the design provided selectivity AND whether 536.4.1.4 was followed in delivering it. Both questions matter.',
              },
              {
                question:
                  'I have a Type AC Type S RCCB at the origin and Type A RCBOs downstream. Is that arrangement compliant?',
                answer:
                  'Probably not — and Annex A53 / Figure A53.2 NOTE 1 is the relevant rule. A Type AC upstream of Type A is at risk of RCD blinding: the load characteristics that the Type A devices have been selected for (pulsed DC from LED drivers, electronics, EV chargers) may impair the Type AC ability to detect residual currents. The remedy is to specify the upstream as Type A Type S (or higher capability — Type F or Type B Type S where the load demands it). For new work, default to Type A or better at every level. For existing installations, code C3 on EICR with a recommendation to upgrade the upstream device when next replaced.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Discriminating and selective RCDs — Module 6.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 7 overview
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

export default InspectionTestingModule6Section5;
