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
  VideoCard,
  SectionRule,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod4-s3-pre-test',
    question:
      'Before applying the IR test you must put the circuit into the right state. Which is the correct pre-test posture?',
    options: [
      'Energise the circuit and test live to confirm worst case',
      'Isolate the circuit, prove dead at the point of work, lock off the source, disconnect current-using equipment per Reg 643.3.2 and disconnect any device the manufacturer specifies (typically SPDs)',
      'Leave loads connected — the meter is microamp-level',
      'Test only the cable, with everything still connected',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.3.2 requires the test with all final circuits connected but with current-using equipment disconnected. SPDs and certain electronic devices need to come out per the manufacturer instructions referenced in the Reg 643.3.3 NOTE. Isolation, proving dead and lock-off precede every dead test in the Reg 643 sequence.',
  },
  {
    id: 'mod4-s3-l-l-test',
    question:
      'On a single-phase circuit, the L–N IR test reads 0.6 MΩ at 500 V DC. Equipment is disconnected. The L–E and N–E readings are above 200 MΩ. What is the most likely explanation?',
    options: [
      'Healthy cable — record and move on',
      'A line-to-neutral insulation defect (mechanical damage between cores, water tracking inside an accessory, or a borrowed neutral picking up an out-of-circuit load via a shared earth-neutral path) — investigate before recording',
      'The cable is wired wrong — re-pull',
      'The meter is faulty',
    ],
    correctIndex: 1,
    explanation:
      'L–E and N–E are clean, so the line and neutral are both well-isolated from earth — the insulation between either live conductor and the protective conductor is fine. The fault sits between L and N specifically. Common causes: damaged twin sheath between cores, water in a switch or accessory, or a borrowed neutral elsewhere on the board pulling current via a shared path that the IR test sees as low resistance.',
  },
  {
    id: 'mod4-s3-linked-lives',
    question:
      'On a circuit where L and N cannot be separated for the L–N test (RCD prevents it, or equipment connection demands them linked), what variant does GN3 recognise?',
    options: [
      'Skip the L–E and N–E tests entirely',
      'Link L and N together at the origin and test L+N (linked lives) to E. Record the result and note in comments that the L–N test was performed in linked-lives mode',
      'Switch to AC test',
      'Use only continuity in place of IR',
    ],
    correctIndex: 1,
    explanation:
      'When L and N cannot be separated, the linked-lives test (L+N together vs E) is the recognised variant. It does not give you a true L–N value, but it confirms the lives as a pair are isolated from the earthing arrangement. The schedule comments must record the variant used — the next inspector reads that to know the test scope.',
  },
  {
    id: 'mod4-s3-discharge',
    question:
      'You finish testing a 100 m run of T&E at 500 V DC. The reading drops as you remove the probe. What is the cable doing, and what is the procedural risk?',
    options: [
      'Nothing of consequence — the reading drift is meter noise',
      "The cable is holding the test voltage as a stored capacitive charge that is now bleeding through the meter's discharge resistor. If you disconnect probes before discharge completes, the conductor at the far end remains live to earth — touching it gives a noticeable shock. Wait for the meter to confirm discharge before unclipping",
      'The cable insulation is failing',
      'Always discard the reading and re-test',
    ],
    correctIndex: 1,
    explanation:
      'A 100 m run of T&E charged at 500 V DC stores meaningful energy. Modern testers automatically discharge the cable through an internal resistor at test end — the reading drops as the cable empties. Disconnecting probes early leaves residual charge on the conductor at the far end. Wait for the discharge cue before unclipping, and on older instruments use a manual discharge wand to short conductor to earth.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.3.1 requires the insulation resistance to be measured between two sets of points on every circuit. What are they?',
    options: [
      'Line-to-neutral only',
      'Live conductors to earth only',
      '(a) Live conductors, and (b) live conductors and the protective conductor connected to the earthing arrangement',
      'Line-to-line and line-to-neutral only',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.3.1 has two limbs: (a) between live conductors — covering L-L on three-phase, L-N on single-phase — and (b) between live conductors and the protective conductor connected to the earthing arrangement. The reg explicitly permits L and N to be linked together for the (b) measurement.',
  },
  {
    id: 2,
    question:
      'On a single-phase 230 V final circuit, what is the standard pre-test posture before pressing the 500 V DC button on the meter?',
    options: [
      'All MCBs closed, all switches open, current-using equipment connected',
      'Circuit isolated and locked off, MCB or switch-disconnector for the circuit closed (so the circuit is fed by the meter, not the supply), all final switches and accessories closed (i.e. switched on), current-using equipment disconnected, sensitive equipment per Reg 643.3.3 disconnected',
      'Circuit live, switches open, neutrals lifted at the bar',
      'Supply on, MCB off, all sockets unplugged',
    ],
    correctAnswer: 1,
    explanation:
      'The standard posture: circuit isolated and locked at the source, MCB closed (so the test current passes through the breaker into the circuit), all switches and switching accessories closed so the test path reaches every conductor, current-using equipment disconnected per Reg 643.3.2, and Reg 643.3.3 disconnections done. Live testing is never the answer.',
  },
  {
    id: 3,
    question:
      'Why is it good practice to lift the neutral at the neutral bar before an L-E IR test?',
    options: [
      'To ensure the meter reads zero when the test starts',
      'Because Reg 643.3.1 requires it',
      'To prevent the test current finding a path back through the neutrals of other circuits via the neutral bar — which would give a misleadingly low reading that reflects the parallel paths, not the cable under test',
      'To check the neutral conductor is the right colour',
    ],
    correctAnswer: 2,
    explanation:
      'On a typical consumer unit the neutral bar is a common return for every circuit. If you do not lift the neutral of the circuit you are testing, the meter is putting test current through the circuit and watching for return current via Earth — but parallel return paths via every other circuit&rsquo;s neutral are available. The cleanest test isolates the neutral at the bar so only the cable under test is in the loop.',
  },
  {
    id: 4,
    question: 'You apply 500 V DC across a connected SPD. What happens?',
    options: [
      'Nothing — modern SPDs are rated for 500 V DC test stress',
      'The MOV inside the SPD starts to conduct as the test voltage approaches its clamping voltage. The meter reads a low value (the MOV&rsquo;s leakage path in parallel with the cable insulation), and the SPD may be permanently damaged because the test current flow heats and degrades the MOV',
      'The SPD trips and isolates the circuit',
      'The reading is unaffected because the SPD is a passive device',
    ],
    correctAnswer: 1,
    explanation:
      'SPDs are built around metal-oxide varistors (MOVs) whose clamping voltage is typically a few hundred volts — below the 500 V DC test stress. The test current conducts through the MOV, which (a) gives a misleading reading dominated by the MOV not the cable, and (b) heats and degrades the device. Reg 643.3.3 is specifically there to make you disconnect SPDs before the Table 64 test.',
  },
  {
    id: 5,
    question:
      'For the L-to-E test on a single-phase circuit, the reg permits L and N to be linked. What is the practical procedure at the consumer unit?',
    options: [
      'Twist the L and N tails together at the meter — anywhere on the circuit will do',
      'At the distribution board, fit a temporary link between the L (downstream of the MCB) and the N (downstream of the neutral bar lift point) so the meter sees both lives as one node when probing the CPC. The link is removed before the next test or before re-energising',
      'Connect the meter&rsquo;s L lead to N and the N lead to L',
      'Use a 4 mm² link between the busbar and the earth bar',
    ],
    correctAnswer: 1,
    explanation:
      'The L–N link goes downstream of the MCB and downstream of the lifted neutral, so the meter is seeing the circuit&rsquo;s own L and N joined to a single node. One probe of the meter goes on this combined live node, the other on the CPC. The link is a temporary lead, brightly coloured, removed before the next test step.',
  },
  {
    id: 6,
    question:
      'You are testing a domestic circuit at 500 V DC. The reading climbs from 0.6 MΩ at first press, through 1.5 MΩ at five seconds, to 2.4 MΩ steady at twelve seconds. What do you record?',
    options: [
      '0.6 MΩ — the lowest reading is the safest figure',
      '1.5 MΩ — the mid-range reading',
      '2.4 MΩ — the steady-state reading once the cable capacitance has finished charging and the polarisation current has decayed',
      'Average of the three: 1.5 MΩ',
    ],
    correctAnswer: 2,
    explanation:
      'The reading climbs because the cable capacitance is charging and the dielectric polarisation current is decaying. The steady-state value (2.4 MΩ here) is the genuine insulation resistance. Reg 643.3.2 acceptance is the value with the test held to settling — record 2.4 MΩ.',
  },
  {
    id: 7,
    question:
      'On a 400 V three-phase distribution circuit, what test combinations should appear in your records to satisfy Reg 643.3.1(a)?',
    options: [
      'L1-N only',
      'L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N — six readings (or the worst-case from a multifunction tester&rsquo;s automated sequence)',
      'L1-E only',
      'L1-L2 and L3-N only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.3.1(a) is between live conductors. On three-phase that is six combinations (L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N). Multifunction testers run the full set automatically and report the worst-case; the worst case is what gets recorded against the L-L column on the schedule.',
  },
  {
    id: 8,
    question:
      'During a periodic inspection you find a circuit with no SPD and no electronic equipment, but the L-E reading at 500 V DC is 0.7 MΩ. What is the most likely cause and what should you do?',
    options: [
      'Acceptable — record the reading and move on',
      'Damp ingress at a junction box, JB, or buried cable, OR a degraded section of cable with insulation breakdown. Investigate by progressively isolating sections (split the circuit at junctions) and re-testing each leg — the offending section drops the reading; the clean section reads high',
      'Re-test at 250 V — if it passes, the circuit is fine',
      'A 0.7 MΩ reading on an installed circuit is a sign the cable is brand new',
    ],
    correctAnswer: 1,
    explanation:
      '0.7 MΩ on a circuit with no electronics in circuit is below the 1 MΩ Reg 643.3.2 minimum and is a real fail. Damp ingress at junctions is the most common cause in older installations; cable damage at a buried point is the next most common. The diagnostic technique is to split the circuit progressively and re-test — the section that brings the reading back up is the clean section, and the one that does not is where the defect lives.',
  },
  {
    id: 9,
    question:
      'Why must final-circuit switches and accessories be in the closed (on) position during the IR test?',
    options: [
      'It is the customer&rsquo;s preference',
      'So that the test current path reaches every conductor in the circuit, including those downstream of switches that would otherwise be open. A switch left open isolates a section of cable from the test loop and produces a falsely high reading on that section',
      'So that the test current returns via the lighting',
      'It does not matter',
    ],
    correctAnswer: 1,
    explanation:
      'The test only proves what is in its loop. A switched-on switch puts the cable downstream of it into the test path; a switched-off switch hides that section. To verify the whole circuit, every accessory has to be set so the conductor under test is electrically connected — switches closed, dimmers (after Reg 643.3.3 disconnection) bypassed or removed, two-way circuits set so both legs are in the loop.',
  },
  {
    id: 10,
    question:
      'A 230 V circuit has a smoke alarm and an SPD wired in. After the Reg 643.3.3 disconnect-test sequence, what do you check before recording the test as complete?',
    options: [
      'That the meter battery is full',
      'That every disconnected device is reconnected, the 250 V DC re-test was performed and recorded ≥ 1 MΩ, the L–N link and any neutral-lift links are removed, the CPC is intact (continuity-tested earlier in Reg 643.2 sequence), the circuit MCB / RCD is in the position you found it, and the comments column on the Schedule of Test Results captures what was disconnected',
      'That the customer is happy with the visible result',
      'That the meter has been calibrated this year',
    ],
    correctAnswer: 1,
    explanation:
      'The closeout is a checklist, not a feeling. Every Reg 643.3.3 disconnection has to be reversed and the 250 V re-test recorded. Every test link (L–N, neutral lift) has to come off. The schedule has to capture both readings and the disconnection note. Re-energisation only happens after that checklist is clean — the same discipline as Method 1 continuity test link removal.',
  },
];

const InspectionTestingModule4Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'IR testing procedure — phase-phase, phase-earth | I&T Module 4.3 | Elec-Mate',
    description:
      'Reg 643.3.1 + GN3 Ch 2: the on-site procedure for L-L / L-N / L-E insulation resistance testing. Pre-test posture, the L-N linking permission, neutral lifting, sensitive-equipment disconnection per Reg 643.3.3, reading the steady-state value, and recording.',
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
            eyebrow="Module 4 · Section 3"
            title="Testing procedure (phase-phase, phase-earth)"
            description="Reg 643.3.1 in practice. The on-site sequence — pre-test posture, the live-conductor and live-to-earth tests, neutral lifting, the L-N link, reading the steady-state value, and recording."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.3.1 sets two test geometries on every circuit: (a) between live conductors and (b) between live conductors and the protective conductor connected to the earthing arrangement. L and N may be linked together during the L-E measurement.',
              'On single-phase, the (a) test is one reading L-N. On three-phase, it is six combinations (L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N) — multifunction testers automate the sweep and report the worst case.',
              'Pre-test posture: circuit isolated and locked off, MCB / switch-disconnector closed so the test current reaches the cable, all final switches in the closed position so every conductor is in the test loop, current-using equipment disconnected (Reg 643.3.2), sensitive equipment disconnected (Reg 643.3.3).',
              'Lift the neutral at the neutral bar of the circuit under test before the L-E measurement. Without this, parallel return paths via other circuits&rsquo; neutrals contaminate the reading.',
              'Hold the test until the reading stabilises — the first few seconds are cable capacitance charging and dielectric polarisation, not real insulation resistance. Record the steady-state value.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Set up a circuit for IR testing — isolation, locking, MCB position, switch positions, neutral lifting, L-N linking, and equipment disconnection per Reg 643.3.3',
              'Perform the Reg 643.3.1(a) live-to-live test on single-phase and three-phase circuits and record the worst-case reading',
              'Perform the Reg 643.3.1(b) live-to-earth test using the L-N link permission, and identify when the link must not be used',
              'Recognise the difference between the initial transient reading (capacitance charging + polarisation) and the steady-state insulation resistance value',
              'Apply Reg 643.3.3 disconnect-and-retest sequence to circuits with SPDs, smoke alarms, dimmers, and other influencing or damageable equipment',
              'Close out an IR test correctly — every disconnection reversed, every link removed, every reading recorded against the right Schedule of Test Results column',
            ]}
          />

          {/* Existing video earns its place here — Craig Wiltshire AMD2 IR walkthrough */}
          <VideoCard
            url={videos.insulationResistanceAmd2.url}
            title={videos.insulationResistanceAmd2.title}
            channel={videos.insulationResistanceAmd2.channel}
            duration={videos.insulationResistanceAmd2.duration}
            topic="Watch first — full procedure walkthrough"
            caption={
              <>
                Craig walks through the A4:2026 procedure end-to-end on a working board: pre-test
                posture, the L-N link, the live-conductor sweep, the neutral lift, the L-E
                measurement, and the Reg 643.3.3 disconnect-and-retest sequence. Worth ten minutes
                before the first time you do this on a job.
              </>
            }
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.1"
            clause={
              <>
                The insulation resistance shall be measured between: (a) live conductors; and (b)
                live conductors and the protective conductor connected to the earthing arrangement.
                During this measurement, line and neutral conductors may be connected together.
              </>
            }
            meaning="Two test geometries, every circuit. The L-L (or L-N) leg verifies that the lives are not bleeding into each other. The L-E leg verifies the lives are not bleeding into earth. The L-N linking permission is a practical concession for the L-E test only — it does not remove the (a) requirement."
          />

          <ConceptBlock
            title="The two test geometries — what each one is actually proving"
            plainEnglish="The (a) test asks: is the insulation between live conductors good enough that there is no significant leakage between them in service? The (b) test asks the same question, but between the lives and the earthing system. Both are required, both prove different things."
          >
            <p>
              The (a) limb covers leakage between conductors at different potentials in service —
              L-N on single-phase (peak ±325 V), L-L on three-phase (peak ±566 V). Dielectric
              degradation between lives turns working voltage directly into heat in the cable
              insulation, accelerating its own decay. The (b) limb covers leakage from any live to
              earth — the path that under fault would energise exposed-conductive-parts and demand
              protective device operation. The L-N link permission turns the (b) test into a single
              L+N-to-E reading on single-phase: if either L-E or N-E has degraded, the combined
              reading drops.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Pre-test posture — getting the circuit ready</ContentEyebrow>

          <ConceptBlock
            title="The four-step pre-test setup"
            plainEnglish="Before you press the test button, four things have to be true: the circuit is electrically dead and locked off, the MCB or switch-disconnector for the circuit is closed (so your test current reaches the cable), every switch in the circuit is in the &lsquo;on&rsquo; position, and every device that would influence or be damaged by the test has been disconnected."
            onSite="Walk the four steps in order every time. The order is what stops the most common mistakes — the most frequent being &lsquo;test on a circuit whose MCB is open and getting an open-circuit reading you treat as a pass&rsquo;."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Isolate and lock off.</strong> The circuit is fed by your meter, not the
                supply. Isolate at the upstream source (the consumer unit main switch, the sub-board
                switch-disconnector, or the supply company&apos;s isolator depending on what you are
                testing), prove dead at the test point, and lock off. Reg 537 + the Electricity at
                Work Regulations 1989 sit underneath this step.
              </li>
              <li>
                <strong>Close the circuit MCB / switch-disconnector.</strong> This is where the
                logic feels backwards. The supply is off, but the circuit&apos;s own MCB has to be
                in the closed position so that when you put your test leads on the busbar (or on the
                circuit&apos;s output terminal at the MCB), your test current can flow into the
                circuit cable. An MCB left open isolates the circuit from your meter and gives you a
                meaningless open-circuit reading.
              </li>
              <li>
                <strong>Close every switch and switching accessory in the circuit.</strong> Light
                switches in the &ldquo;on&rdquo; position. Two-way and intermediate switches set so
                both legs are in the test loop (you may need to test once with each switch in each
                position — note this on the schedule). Cooker switches, FCU switches, isolators at
                appliances — all closed. The test only proves the conductors that are in its loop,
                and an open switch isolates a section.
              </li>
              <li>
                <strong>
                  Disconnect current-using equipment and Reg 643.3.3 sensitive equipment.
                </strong>{' '}
                Per Reg 643.3.2, current-using equipment is disconnected. Per Reg 643.3.3, anything
                &ldquo;likely to influence the measurement or be damaged&rdquo; comes off — SPDs,
                dimmers, smoke alarms, electronic thermostats, intruder alarm power supplies, RCBOs
                with electronic boards (where the manufacturer says so).
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.2"
            clause={
              <>
                The insulation resistance measured with the test voltages indicated in Table 64
                shall be considered satisfactory if the main switchboard and each distribution
                circuit tested separately, with all its final circuits connected but with
                current-using equipment disconnected, has an insulation resistance not less than the
                appropriate value given in Table 64.
              </>
            }
            meaning="The default test posture is &lsquo;final circuits connected, current-using equipment disconnected&rsquo;. The reg makes the boundary explicit so a tester knows what to leave in (the wiring system, the accessories, the protective devices) and what to take out (the loads). Reg 643.3.3 then adds the sensitive-equipment layer over the top."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The L-L / L-N test — between live conductors</ContentEyebrow>

          <ConceptBlock
            title="The (a) test in practice — single-phase"
            plainEnglish="On a single-phase circuit, this is the L-to-N reading. With the circuit set up per the four-step posture above, put one meter probe on the L busbar (downstream of the circuit MCB), the other on the N for that circuit (downstream of the lift point on the neutral bar). Press the 500 V DC button, hold until the reading stabilises, record."
            onSite="The N has to be lifted off the neutral bar for this test, otherwise the meter is reading the parallel combination of every neutral on the bar. Most multifunction testers will helpfully tell you when the reading is the parallel of multiple paths (it&rsquo;ll be unphysically low) — but lifting the neutral is the discipline that makes the reading clean every time."
          >
            <p>
              The conductor combinations to be covered by Reg 643.3.1(a) on single-phase are minimal
              — L and N are the only two live conductors — but the geometry still has to be right.
              The N at the bar is connected to every other circuit&apos;s N. If you leave it on the
              bar, the meter sees: L of this circuit through the cable insulation to N of this
              circuit (the path you want), in parallel with L of this circuit through the cable
              insulation to N of this circuit by way of the bar to every other circuit&apos;s N (a
              path you do not want). On a healthy installation the parallel paths are all very high
              resistance and contribute little — but on an installation with marginal insulation
              elsewhere the parallel paths drag the reading down and you record a fail that does not
              belong to the circuit you tested.
            </p>
            <p>
              The cleanest discipline: lift the neutral at the bar before any L-N or L-E test on the
              circuit. A short pigtail of insulation tape and a labelled flag (&ldquo;CIRCUIT N
              LIFTED — DO NOT RE-ENERGISE&rdquo;) prevents the most common closeout mistake, which
              is forgetting the lift and turning the supply on with the neutral floating.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The (a) test in practice — three-phase"
            plainEnglish="Three-phase has six combinations: L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N. Modern multifunction testers handle the sweep with a single button press and report the worst-case reading across all six."
            onSite="If your meter has an Auto-IR three-phase sequence, use it — covers six combinations in about 30 seconds and reports a single worst-case value. The L-L combinations are stressed at line-to-line voltage in service (peak ±566 V on a 400 V supply), so a circuit can develop an L-L weakness while L-N readings stay acceptable. The regulation does not let you skip L-L in favour of L-N alone."
          >
            <p>
              Practical sequencing: with the three-phase circuit isolated, locked off, and the
              circuit&rsquo;s switch-disconnector closed, lift the circuit&apos;s neutral at the
              bar. Run the meter&rsquo;s automated sequence. Record the worst-case value on the
              schedule.
            </p>
          </ConceptBlock>

          {/* Diagram — single-phase L-L (with L+N tied) IR test setup */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Reg 643.3.1(a) — L-N IR test on a single-phase final circuit
            </h4>
            <svg
              viewBox="0 0 800 320"
              className="w-full h-auto"
              role="img"
              aria-label="L-to-N insulation resistance test on a single-phase circuit. The neutral is lifted at the neutral bar. The meter probes L (downstream of the MCB) and N (downstream of the lift). The reading is the L-N insulation resistance of the cable."
            >
              <rect
                x="40"
                y="30"
                width="220"
                height="220"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="150"
                y="52"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                fontWeight="bold"
              >
                CONSUMER UNIT
              </text>
              <text x="150" y="68" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Main switch off, locked off)
              </text>

              <rect
                x="65"
                y="90"
                width="50"
                height="22"
                rx="4"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="90"
                y="105"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                MCB
              </text>
              <text x="90" y="124" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">
                (CLOSED)
              </text>

              <rect
                x="180"
                y="90"
                width="60"
                height="22"
                rx="4"
                fill="rgba(59,130,246,0.1)"
                stroke="#3B82F6"
                strokeWidth="1.5"
              />
              <text
                x="210"
                y="105"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
              >
                N BAR
              </text>

              {/* Lifted N tail */}
              <line x1="180" y1="101" x2="155" y2="135" stroke="#3B82F6" strokeWidth="2" />
              <circle cx="155" cy="135" r="4" fill="#FBBF24" stroke="#FBBF24" strokeWidth="1" />
              <text
                x="155"
                y="152"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                N LIFTED
              </text>

              <rect
                x="62"
                y="200"
                width="60"
                height="22"
                rx="4"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="92"
                y="216"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                E BAR
              </text>

              {/* Cable run */}
              <line x1="115" y1="101" x2="500" y2="101" stroke="#EF4444" strokeWidth="2" />
              <text x="300" y="92" textAnchor="middle" fill="#EF4444" fontSize="9">
                L (line)
              </text>
              <line x1="155" y1="135" x2="500" y2="135" stroke="#3B82F6" strokeWidth="2" />
              <text x="300" y="128" textAnchor="middle" fill="#3B82F6" fontSize="9">
                N (neutral, lifted at the bar)
              </text>
              <line
                x1="122"
                y1="211"
                x2="500"
                y2="211"
                stroke="#22C55E"
                strokeWidth="2"
                opacity="0.4"
              />

              {/* Far point — accessory */}
              <rect
                x="500"
                y="60"
                width="160"
                height="180"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="580"
                y="82"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="10"
                fontWeight="bold"
              >
                FAR ACCESSORY
              </text>
              <text x="580" y="98" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Switch closed, load disconnected)
              </text>

              {/* Meter */}
              <rect
                x="265"
                y="240"
                width="270"
                height="70"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="400"
                y="262"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                INSULATION RESISTANCE TESTER
              </text>
              <text x="400" y="280" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Set: 500 V DC · Reading L-to-N steady-state
              </text>

              {/* Probe lines from meter to L and lifted N */}
              <line
                x1="320"
                y1="240"
                x2="115"
                y2="101"
                stroke="#EF4444"
                strokeWidth="1.6"
                strokeDasharray="3,2"
              />
              <line
                x1="480"
                y1="240"
                x2="155"
                y2="135"
                stroke="#3B82F6"
                strokeWidth="1.6"
                strokeDasharray="3,2"
              />
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

          <ContentEyebrow>The L-E test — between lives and earth</ContentEyebrow>

          <ConceptBlock
            title="The (b) test in practice — using the L-N link"
            plainEnglish="The L-N link permission turns what would be two readings (L-E and N-E) into one (L+N-to-E). At the consumer unit, fit a temporary link between L (downstream of the MCB) and N (downstream of the neutral lift). Probe between this combined live node and the CPC. Press 500 V DC, hold for stabilisation, record."
            onSite="Use a brightly-coloured flying lead with positive clamps for the L-N link. The same discipline as the Method 1 continuity link — high-visibility lead, written as a tick-box step on your closeout sheet, removed before re-energisation."
          >
            <p>
              The L-N link is fitted at the consumer unit, downstream of the MCB and downstream of
              the lifted neutral. With the link in place, both lives are tied to a single node. One
              meter probe goes on this combined node; the other goes on the CPC. The meter is now
              reading the combined L+N to E insulation resistance — the regulation&apos;s permitted
              simplification of the (b) test.
            </p>
            <p>
              On a three-phase circuit, the analogous arrangement is to link L1, L2, L3 and N at the
              consumer unit (or sub-distribution board). The combined node is then probed against
              the CPC. Multifunction testers automate this through their internal switching matrix,
              and the reported value is the worst case of L1-E, L2-E, L3-E and N-E (or the value
              with all four linked, depending on the meter&apos;s declared method).
            </p>
            <p>
              The CPC end of the meter probe lands on the earthing terminal at the consumer unit
              (the main earth bar). The reg requires the protective conductor &ldquo;connected to
              the earthing arrangement&rdquo; — that is the earth bar, not the metalwork of the
              enclosure or the bonded gas pipe. Test current flows from the meter, through the
              combined live node, through the cable insulation, into the CPC, back to the earth bar,
              and into the meter&apos;s second probe. The cable insulation is the thing being
              measured.
            </p>
          </ConceptBlock>

          {/* Diagram — L+N to E test arrangement */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Reg 643.3.1(b) — L+N to E test with the L-N link permitted by the regulation
            </h4>
            <svg
              viewBox="0 0 800 340"
              className="w-full h-auto"
              role="img"
              aria-label="L-and-N to E insulation resistance test. L (downstream of MCB) and N (downstream of the lift) are linked together by a temporary lead. The meter probes between this combined live node and the CPC at the earth bar. The reading is the L+N-to-E insulation resistance of the cable."
            >
              <rect
                x="40"
                y="30"
                width="240"
                height="240"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="160"
                y="52"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                fontWeight="bold"
              >
                CONSUMER UNIT
              </text>
              <text x="160" y="68" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Main switch off, locked off)
              </text>

              {/* MCB */}
              <rect
                x="65"
                y="90"
                width="50"
                height="22"
                rx="4"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="90"
                y="105"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                MCB
              </text>

              {/* N bar */}
              <rect
                x="180"
                y="90"
                width="80"
                height="22"
                rx="4"
                fill="rgba(59,130,246,0.1)"
                stroke="#3B82F6"
                strokeWidth="1.5"
              />
              <text
                x="220"
                y="105"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
              >
                N BAR
              </text>

              {/* Lifted N */}
              <circle cx="180" cy="135" r="4" fill="#FBBF24" />
              <text
                x="180"
                y="152"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                N LIFTED
              </text>
              <line x1="180" y1="112" x2="180" y2="135" stroke="#3B82F6" strokeWidth="2" />

              {/* L–N temporary link */}
              <path
                d="M115 101 L150 101 L150 135 L180 135"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeDasharray="6,3"
              />
              <rect
                x="120"
                y="115"
                width="50"
                height="14"
                rx="3"
                fill="rgba(251,191,36,0.2)"
                stroke="rgba(251,191,36,0.5)"
                strokeWidth="1"
              />
              <text
                x="145"
                y="125"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="8"
                fontWeight="bold"
              >
                L–N LINK
              </text>

              {/* E bar */}
              <rect
                x="62"
                y="220"
                width="80"
                height="22"
                rx="4"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="102"
                y="236"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                E BAR
              </text>
              <circle cx="102" cy="220" r="4" fill="#22C55E" />

              {/* Cable run */}
              <line x1="115" y1="101" x2="540" y2="101" stroke="#EF4444" strokeWidth="2" />
              <text x="320" y="92" textAnchor="middle" fill="#EF4444" fontSize="9">
                L conductor
              </text>
              <line x1="180" y1="135" x2="540" y2="135" stroke="#3B82F6" strokeWidth="2" />
              <text x="320" y="128" textAnchor="middle" fill="#3B82F6" fontSize="9">
                N conductor (lifted at bar, linked to L)
              </text>
              <line x1="142" y1="231" x2="540" y2="231" stroke="#22C55E" strokeWidth="2" />
              <text x="320" y="248" textAnchor="middle" fill="#22C55E" fontSize="9">
                CPC (back to earth bar)
              </text>

              {/* Far accessory */}
              <rect
                x="540"
                y="60"
                width="180"
                height="200"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="630"
                y="82"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="10"
                fontWeight="bold"
              >
                FAR ACCESSORY
              </text>
              <text x="630" y="98" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Switches closed, load off)
              </text>

              {/* Meter */}
              <rect
                x="290"
                y="270"
                width="280"
                height="60"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="430"
                y="290"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                INSULATION RESISTANCE TESTER
              </text>
              <text x="430" y="308" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                500 V DC · Reading: L+N → E (steady-state)
              </text>

              {/* Probe lines */}
              <line
                x1="340"
                y1="270"
                x2="150"
                y2="135"
                stroke="#EF4444"
                strokeWidth="1.6"
                strokeDasharray="3,2"
              />
              <line
                x1="520"
                y1="270"
                x2="102"
                y2="220"
                stroke="#22C55E"
                strokeWidth="1.6"
                strokeDasharray="3,2"
              />
            </svg>
          </div>

          <Scenario
            title="A 32 A B-curve cooker circuit on a domestic CU"
            situation="2.5/1.5 mm² T&E, 14 m run from the consumer unit to the cooker isolator switch, then 1 m of flex to the cooker. The cooker has been disconnected at the flex outlet. The cooker isolator is in the closed position. The CU has a Type 2 SPD on the busbar."
            whatToDo={
              <>
                <span className="block">
                  1. Isolate at the main switch, lock off, prove dead at the cooker terminals.
                </span>
                <span className="block">
                  2. Disconnect the SPD per Reg 643.3.3 (note in test sheet: &ldquo;SPD off for
                  500&nbsp;V test&rdquo;).
                </span>
                <span className="block">
                  3. Lift the cooker circuit&rsquo;s neutral at the neutral bar.
                </span>
                <span className="block">4. Confirm the cooker MCB is in the closed position.</span>
                <span className="block">
                  5. (a) test: meter on 500 V DC, probe L (at MCB output) and N (at lifted tail),
                  hold 8-10 seconds, record steady-state. Expect &gt;100 MΩ on a healthy cable.
                </span>
                <span className="block">
                  6. Fit the L-N link. (b) test: meter probes between combined L+N node and the
                  earth bar. Hold, record. Expect &gt;100 MΩ.
                </span>
                <span className="block">
                  7. Remove the L-N link. Reconnect the SPD. Apply the 250 V DC re-test L+N to E per
                  Reg 643.3.3 — expect ≥ 1 MΩ. Record.
                </span>
                <span className="block">
                  8. Reconnect the lifted neutral. Cooker can be reconnected at the flex outlet.
                  Closeout: visual confirmation that no test links remain.
                </span>
              </>
            }
            whyItMatters="The sequence is what makes the readings interpretable. Skipping the neutral lift gives a reading contaminated by parallel paths through the rest of the board. Skipping the SPD disconnect gives a 500 V reading dominated by the SPD&rsquo;s MOV. Forgetting to remove the L-N link is the closeout failure that energises a busbar to a still-linked tail. The disciplined sequence makes each step verifiable and each reading defensible."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading the meter — what is real and what is transient</ContentEyebrow>

          <ConceptBlock
            title="The reading is the steady-state value, not the first number you see"
            plainEnglish="When you press test, the meter reading rises (sometimes falls) for the first few seconds before settling. The early reading reflects cable capacitance charging and dielectric polarisation current — not insulation resistance. The settled value is the genuine insulation resistance."
            onSite="Hold for 8-10 seconds on a domestic final circuit, 15-30 seconds on a long submain or large-csa cable. The reading should stop moving for at least 2 seconds before you record it."
          >
            <p>
              Three currents flow under 500 V DC and decay at different rates: charging current
              (cable capacitance charging, decays with R·C — fractions of a second on T&amp;E,
              several seconds on long SWA), polarisation current (dielectric dipoles realigning,
              decays over seconds to tens of seconds), and leakage current (steady-state conduction
              through the insulation — what the meter is computing once everything else has
              settled). On healthy modern cable the steady-state value is hundreds of MΩ to GΩ; most
              meters cap the display at &gt;199 MΩ or &gt;999 MΩ.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Recording the first-press reading on a long cable"
            whatHappens="On a 60 m SWA submain the first reading is 0.6 MΩ — well below the 1 MΩ minimum. The installer records a fail and starts re-pulling the cable. Forty minutes later the senior on the job presses test and holds for 12 seconds: the reading climbs steadily and settles at 4.2 MΩ. The cable was fine; the original reading was the cable capacitance still charging."
            doInstead="Train yourself to hold the test until the reading has stopped moving for two full seconds. On long cables that means at least 15 seconds of holding. Most multifunction testers have a &lsquo;hold to stabilise&rsquo; mode that displays only when the reading is settled — use it."
          />

          <CommonMistake
            title="Forgetting to lift the neutral at the bar"
            whatHappens="The L-E test is performed with the circuit&rsquo;s N still on the neutral bar. The meter sees the L of this circuit, through the cable insulation, into the CPC, back to the earth bar — but it also sees a parallel path: L of this circuit, through the cable insulation, into N of this circuit, through the bar to every other circuit&rsquo;s N, through every other circuit&rsquo;s cable insulation, into the CPC. On a board with marginal insulation elsewhere, this parallel path drags the reading down by an order of magnitude and you record a fail that does not belong to this circuit."
            doInstead="Lift the circuit&rsquo;s N at the bar before any IR test on that circuit. Use a bright tape flag (&lsquo;CIRCUIT N LIFTED — DO NOT RE-ENERGISE&rsquo;) so the closeout step is visible. The discipline is the same as the L-CPC link discipline on Method 1 continuity testing — a high-visibility flag prevents the closeout error."
          />

          <CommonMistake
            title="Testing across an SPD and accepting the reading"
            whatHappens="The 500 V DC test is applied to a circuit with the SPD in place. The MOV inside the SPD starts conducting at its clamping voltage (typically a few hundred volts), the meter reads a low value, and the installer records a fail. Either the cable is wrongly condemned, or — worse — the SPD is permanently damaged by the test current and is no longer providing protection when the supply is re-energised."
            doInstead="Read Reg 643.3.3 as binding. SPDs are exactly the case the redraft was written for. Disconnect, perform the 500 V Table 64 test, re-connect, perform the 250 V re-test, record both, comment the disconnection. Modern consumer units are increasingly being designed with plug-in SPD modules so the disconnection is a 30-second job — no excuse for skipping it."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What to do with the result</ContentEyebrow>

          <ConceptBlock
            title="Reading interpretation — three outcomes"
            plainEnglish="A measured insulation resistance is one of three things: a clean pass (well above the Table 64 minimum), a marginal value (above the minimum but well below typical new-cable values), or a fail (below the minimum). Each has a different next step."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">Above 100 MΩ.</strong> Healthy modern cable.
                Record and move on. On a meter that caps at 199 or 999 MΩ, record &gt;199 MΩ (or
                whatever the cap is) — this is the normal pass on a new install.
              </li>
              <li>
                <strong className="text-amber-300">1 MΩ to ~100 MΩ.</strong> Compliant per Table 64
                but worth investigating. Common causes: ageing insulation in older PVC cable, minor
                damp ingress at junctions, dust or moisture inside an enclosure. Acceptable on a
                periodic inspection of an older installation; a flag on a new install. Note the
                value and any remediation in comments.
              </li>
              <li>
                <strong className="text-red-300">Below 1 MΩ (or 0.5 MΩ for SELV).</strong> Fail. The
                Reg 643.3.2 minimum has not been met. Investigate by progressively splitting the
                circuit and re-testing — disconnect at junction boxes or accessories one at a time,
                re-test each leg, identify the section that is dragging the reading down. The Reg
                643.3.3 disconnection list always gets reviewed first: many apparent fails disappear
                when an unspotted SPD or smoke alarm comes off.
              </li>
            </ol>
          </ConceptBlock>

          <Scenario
            title="A periodic inspection finds an L-E reading of 0.7 MΩ on a lighting circuit"
            situation="The lighting circuit feeds five rooms. The reading at the consumer unit (with the L-N linked, neutral lifted, all switches closed, no SPD or smoke alarm) is 0.7 MΩ at 500 V DC, steady-state. Below the 1 MΩ minimum."
            whatToDo={
              <>
                <span className="block">
                  Investigate before recording the fail definitively. Procedure:
                </span>
                <span className="block">
                  1. Re-confirm Reg 643.3.3 disconnections. Are there dimmers? Smoke alarms wired
                  into the lighting? Anything electronic? Disconnect any candidate, re-test.
                </span>
                <span className="block">
                  2. If reading still 0.7 MΩ, split the circuit. Disconnect the run at the junction
                  box or ceiling rose halfway down the circuit. Re-test the upstream half. If
                  reading rises &gt;100 MΩ, the fault is in the downstream half. If still 0.7 MΩ,
                  the fault is in the upstream half.
                </span>
                <span className="block">
                  3. Repeat — bisecting the circuit until the offending section is isolated. Common
                  culprits in lighting circuits: damp at a recessed downlighter, water ingress at a
                  metal back-box on an outside wall, a damaged cable in loft insulation.
                </span>
                <span className="block">
                  4. Once the section is identified, the remediation is replacement or
                  re-termination of that section. Re-test after.
                </span>
              </>
            }
            whyItMatters="Reading-and-record without investigation either condemns a circuit that has a localised fault (whole circuit gets re-pulled) or accepts a real fail because the next inspector treats &lsquo;0.7 MΩ at last EICR&rsquo; as &lsquo;they accepted it then, why am I making a fuss now?&rsquo;. The structured bisection diagnostic is fast and produces a defensible record of where the defect was."
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="The IR columns on the A4:2026 schedule"
            plainEnglish="Three columns: L-L (or L-N), L-E (with N-E sometimes separate), and comments. Steady-state value in MΩ to one decimal. If Reg 643.3.3 was invoked, both readings (Table 64 and 250 V re-test) plus a disconnection note all appear."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Steady-state value.</strong> Record in MΩ to one decimal. Where the meter
                caps at &gt;199 MΩ, record the cap rather than guessing a higher value.
              </li>
              <li>
                <strong>Both legs of Reg 643.3.1.</strong> The (a) reading goes in the L-L / L-N
                column. The (b) reading (with L-N link) goes in L-E. If forms have separate L-E and
                N-E columns and you used the link, put the reading in L-E and &ldquo;link&rdquo; in
                N-E.
              </li>
              <li>
                <strong>Reg 643.3.3 audit trail.</strong> Comments column lists what was
                disconnected and the 250 V re-test reading. Example:
                &ldquo;SPD&nbsp;disconnected;&nbsp;500&nbsp;V&nbsp;reading&nbsp;218&nbsp;MΩ;&nbsp;reconnected;&nbsp;250&nbsp;V&nbsp;re-test&nbsp;42&nbsp;MΩ.&rdquo;
                A schedule that does not show this audit trail when Reg 643.3.3 was applied is
                procedurally incomplete.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.3.1 has two limbs: between live conductors, and between live conductors and the protective conductor. L and N may be linked together for the L-E test.',
              'Pre-test posture: isolate and lock off, MCB closed (so the test current reaches the cable), all switches closed (so every conductor is in the loop), current-using equipment off, sensitive equipment off per Reg 643.3.3.',
              'Lift the neutral at the bar before testing. Without this, parallel paths through other circuits&rsquo; neutrals contaminate the reading.',
              'On three-phase, the (a) test covers six combinations (L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N) — multifunction testers automate this and report the worst case.',
              'For the (b) test, fit a temporary L-N link downstream of the MCB. Probe between the combined live node and the earth bar. Use a high-visibility flying lead — same discipline as Method 1 continuity.',
              'Hold the test until the reading has stopped moving for at least 2 seconds. The first reading is cable capacitance charging, not real insulation resistance.',
              'A reading below the Table 64 minimum is a fail — but investigate before condemning. The most common &lsquo;fail&rsquo; is an undisclosed SPD or smoke alarm; the next most common is damp ingress at a junction.',
              'Closeout is a checklist: every test link removed, every Reg 643.3.3 disconnection reversed, every reading recorded against the right Schedule of Test Results column, all comments captured.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Do I have to lift the neutral, or can I rely on the meter&rsquo;s internal isolation?',
                answer:
                  'You have to lift the neutral. The meter&rsquo;s internal isolation has nothing to do with parallel paths through the consumer unit&rsquo;s neutral bar — those paths exist outside the meter, in the wiring. Lifting the neutral at the bar physically removes the parallel paths and is the only way to get a reading that genuinely measures the circuit under test. GN3 Ch 2 + the equivalent Site Guide procedure both describe the lift as part of the standard sequence.',
              },
              {
                question:
                  'What about RCBOs with electronic trip — do those count as &ldquo;sensitive equipment&rdquo; under Reg 643.3.3?',
                answer:
                  'Check the manufacturer&rsquo;s instructions for the specific RCBO. Most modern RCBOs are designed to withstand a 500 V DC IR test on the load side without disconnecting, but a small number (notably some early electronic-trip designs) recommend disconnection. Where the manufacturer says disconnect, that is the regulation per the note attached to Reg 643.3.3. Where the manufacturer is silent, the conservative approach is to put a dash in the test path that bypasses the RCBO if practical, or accept that the reading covers the RCBO load side downstream of the trip electronics.',
              },
              {
                question:
                  'My meter has an Auto-IR three-phase mode. Can I rely on the single worst-case reading it reports?',
                answer:
                  'Yes — provided the meter conforms to BS EN 61557-2 and the documented internal sequence covers the six L-L / L-N combinations of Reg 643.3.1(a) plus the L+N to E combination of Reg 643.3.1(b). Read the meter&rsquo;s declared method statement once, confirm it matches the regulation&rsquo;s requirements, and from then on the worst-case reading is the value that goes on the schedule. Manual cycling through six readings is not required when the meter does it for you correctly.',
              },
              {
                question:
                  'A two-way lighting circuit — do I have to test in both switch positions?',
                answer:
                  'In principle yes, because the closed switch position determines which leg of the strapper cable is in the test loop. The conservative approach — and the right one on a new install verification — is to test both positions and record the worst case. On a periodic inspection many testers run once and re-test only if the first reading is near the minimum.',
              },
              {
                question: 'I get a reading of &gt;199 MΩ on every circuit. Is the meter broken?',
                answer:
                  'No — you are seeing healthy modern cable. Most multifunction testers cap their display at 199 MΩ or 999 MΩ. New thermoplastic cable in good condition reads in the GΩ range, well above any meter&rsquo;s cap. Record &gt;199 MΩ on the schedule — that is the standard convention.',
              },
              {
                question:
                  'A circuit with no electronics installed reads exactly 1.0 MΩ. Is that a pass?',
                answer:
                  'Per Reg 643.3.2 + Table 64, yes — 1.0 MΩ meets the minimum for circuits up to 500 V. But it is a marginal pass and on a new install it is suspicious; modern cable should be giving hundreds of MΩ to GΩ. Note the reading, comment that it is at the floor, and on a new install investigate before signing off.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="IR testing procedure — Module 4.3" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/inspection-testing/module-4/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Testing sensitive equipment (SERDs)
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

export default InspectionTestingModule4Section3;
