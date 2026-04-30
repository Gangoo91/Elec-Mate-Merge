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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod3-s2-step1-sanity',
    question:
      'Step 1 on a 28 m ring of 2.5/1.5 mm² T&E gives r1 = 0.21 Ω, rn = 0.21 Ω, r2 = 0.18 Ω. GN3 Table BI says r1 ≈ 7.41 mΩ/m and r2 ≈ 12.10 mΩ/m at 20 °C. The r2 reading is suspicious. Why?',
    options: [
      'It is fine — r2 lower than r1 happens on short rings.',
      'Expected r2 for 28 m of 1.5 mm² CPC is roughly 0.34 Ω. A reading of 0.18 Ω is well below the calculated value, almost certainly a parallel earth path via metalwork or a CPC of the wrong csa. Investigate before progressing to Steps 2 and 3.',
      'r2 should always equal r1 on a ring.',
      'The meter needs nulling — that is the only cause.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 Section 2.6.6 sanity-checks Step 1 against magnitude before progressing. 28 × 12.10 mΩ/m ≈ 0.34 Ω. A reading roughly half that means the CPC is in parallel with another path (steel containment, supplementary bonding) or the cable is not what the design assumed. Either way, Steps 2 and 3 will be unreliable until the cause is found.',
  },
  {
    id: 'mod3-s2-hill-profile',
    question:
      'Step 2 readings around a ring climb smoothly from 0.18 Ω at the first socket, peak at 0.31 Ω at the midpoint, then fall back to 0.18 Ω at the last socket. What is this telling you?',
    options: [
      'A correctly wired ring with normal termination variation.',
      'A spur at the midpoint.',
      'Figure-of-eight — line and neutral ends are cross-paired at the board. Re-pair the four ends and re-test from Step 1.',
      'The CPC is broken.',
    ],
    correctIndex: 2,
    explanation:
      'GN3 Reg 2.19 calls this profile out by name: progressive rise to a midpoint then fall = wrongly paired ring ends. The fix is at the board, not in the cable. Do not record any reading from a figure-of-eight test on the schedule — re-pair and retest from Step 1.',
  },
  {
    id: 'mod3-s2-r1r2-record',
    question:
      'Step 1 gives r1 = 0.32 Ω, r2 = 0.52 Ω. Step 3 readings round the ring are 0.21–0.23 Ω at every socket, with the worst reading 0.23 Ω at the furthest socket. What R1+R2 do you record on the Schedule of Test Results?',
    options: ['0.84 Ω (r1 + r2)', '0.21 Ω', '0.23 Ω (worst Step 3 reading)', '0.42 Ω (r2 doubled)'],
    correctIndex: 2,
    explanation:
      'The R1+R2 for a ring final is the worst Step 3 reading observed walking the ring — i.e. (r1+r2)/4 at the most remote socket. (0.32 + 0.52)/4 = 0.21 Ω calculated; the measured worst was 0.23 Ω. Record 0.23 Ω. Recording r1+r2 (1.10 Ω equivalent) inflates the Zs sum by a factor of four and triggers false fails.',
  },
  {
    id: 'mod3-s2-spur-signature',
    question:
      'Walking Step 3 round a ring, every socket reads 0.27–0.28 Ω except one behind the fridge that reads 0.56 Ω. Other readings are flat. What is the most likely cause?',
    options: [
      'A figure-of-eight ring.',
      'That socket is on a spur from the ring — the spur conductor adds series resistance not part of any parallel pair. Confirm at the back-box: one cable in = spur, two = ring connection.',
      'A broken CPC at the fridge.',
      'Test-lead resistance not nulled.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 Reg 2.19 calls this the spur signature: one isolated reading roughly twice the (r1+r2)/4 value against an otherwise flat profile. Spurs are permitted under OSG Appendix H rules but must be identified, recorded, and counted against the spur-per-ring limit.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.2.1 requires live-conductor continuity by resistance measurement on which circuits?',
    options: [
      'Every final circuit',
      'Only ring final circuits',
      'Only radial socket circuits',
      'Only high-integrity earthing arrangements',
    ],
    correctAnswer: 1,
    explanation:
      'The second limb of Reg 643.2.1 is specific: live-conductor continuity by measurement of resistance is only required for ring final circuits. On radials, only protective and bonding conductor continuity is required. The ring requirement exists because the ring topology can be wrong in ways visual inspection will not catch — a figure-of-eight, a missing leg, an interconnection — and only the three measurements expose it.',
  },
  {
    id: 2,
    question:
      'In the GN3 Section 2.6.6 three-step ring continuity test, what is measured at Step 1?',
    options: [
      'The resistance at every socket-outlet around the ring',
      'The end-to-end (open-loop) resistance of each of the three conductors — line, neutral, CPC — measured separately at the consumer unit',
      'The line-to-neutral resistance with the conductors cross-connected',
      'The R1+R2 at the furthest socket',
    ],
    correctAnswer: 1,
    explanation:
      'Step 1 in GN3 Section 2.6.6 (Reg 2.16) is the end-to-end resistance of each conductor of the ring, measured separately at the distribution board / consumer unit with the two ends of each conductor identified. The values are conventionally labelled r1 (line), rn (neutral) and r2 (CPC). For a correctly wired ring, r1 ≈ rn, and r2 will be larger if a reduced CPC has been used.',
  },
  {
    id: 3,
    question:
      'On a correctly wired ring final, what should the Step 2 reading at every socket on the ring be — and why?',
    options: [
      'It should equal r1 + r2 measured in Step 1',
      'It should equal (r1 + rn) / 4, and be the same at every socket because each socket sees half the line conductor in parallel with the other half',
      'It should be zero',
      'It should be exactly half of Step 1',
    ],
    correctAnswer: 1,
    explanation:
      'Step 2 cross-connects the line and neutral ends at the board, then measures L–N at each socket. Each socket sees the cable from one direction in parallel with the cable from the other direction. The two halves are roughly equal, so the result is (r1 + rn) divided by 4, and it should read the same at every socket on the ring. A jump up at one socket flags a spur. A progressive rise then fall around the ring flags a swap.',
  },
  {
    id: 4,
    question:
      'Step 3 of the GN3 ring continuity test cross-connects which two conductor ends at the board?',
    options: [
      'Line outgoing to neutral returning',
      'Line outgoing to CPC returning (and line returning to CPC outgoing)',
      'Neutral outgoing to neutral returning',
      'Both line ends together',
    ],
    correctAnswer: 1,
    explanation:
      'Step 3 cross-connects line and CPC at the board. The L–E reading at each socket is then (r1 + r2)/4 — the R1+R2 at that socket. This is the value transcribed onto the Schedule of Test Results in the R1+R2 column for the ring, and the value used in the Zs verification for the ring final.',
  },
  {
    id: 5,
    question:
      'You measure r1 = 0.41 Ω, rn = 0.42 Ω, r2 = 0.69 Ω at Step 1 on a 2.5/1.5 mm² ring. What is the expected Step 3 reading at every socket?',
    options: ['0.55 Ω', '0.275 Ω', '1.10 Ω', '0.69 Ω'],
    correctAnswer: 1,
    explanation:
      '(r1 + r2) / 4 = (0.41 + 0.69) / 4 = 1.10 / 4 = 0.275 Ω. Every socket on a correctly wired ring should read this within a small tolerance. A reading of 0.55 Ω at one socket would suggest a spur. Readings that climb to a peak halfway round and come back down would suggest the L and N ends are crossed.',
  },
  {
    id: 6,
    question:
      'Around the ring, your Step 2 readings rise progressively from 0.21 Ω at socket 1 to 0.34 Ω at the midpoint and fall back to 0.21 Ω at the last socket. What does this pattern indicate?',
    options: [
      'A correctly wired ring',
      'A spur at the midpoint',
      'The L and N ends of the ring are not joined correctly at the board — typically an L-end is connected to an N-end (the ring is wired as a figure of eight)',
      'A break in the CPC',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Reg 2.19 calls this the characteristic profile of a swapped or figure-of-eight ring: progressive increase to a midpoint then decrease. A correctly wired ring gives the same Step 2 reading at every socket. The fix is at the board, not in the cable — re-identify the four ends and pair them correctly.',
  },
  {
    id: 7,
    question:
      'Every socket on the ring reads (r1 + r2)/4 within a few milliohms — except one, which reads roughly twice that value. Most likely explanation?',
    options: [
      'A figure-of-eight ring',
      'That socket is wired as a spur from the ring rather than being on the ring itself, and the spur conductor adds series resistance',
      'A broken neutral',
      'Test-lead resistance was not nulled',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Reg 2.19 explicitly notes that any socket-outlet wired as a spur will indicate a higher resistance value because of the additional spur conductor length and connections. One isolated high reading at one socket — with all other sockets reading the expected (r1+r2)/4 — is the spur signature, not a fault. Confirm by inspection at the back box; one cable in instead of two means it is a spur.',
  },
  {
    id: 8,
    question:
      'Step 1 readings come back as r1 = 0.40 Ω, rn = 0.40 Ω, r2 = 0.41 Ω on a 2.5/1.5 mm² ring of approximately 35 m total length (GN3 Table BI: r1 + r2 ≈ 19.51 mΩ/m at 20°C, r2 only ≈ 12.10 mΩ/m). The r2 reading looks suspiciously low. What should you do?',
    options: [
      'Accept — low is good',
      'Investigate. Expected r2 alone for 35 m of 1.5 mm² CPC is roughly 0.42 Ω, but a reading equal to r1 (where r1 is 2.5 mm²) suggests the ring CPC is in parallel with another earth path, or the CPC has been wired in 2.5 mm² instead of 1.5 mm² — both are deviations from design that need resolving before completion',
      'Re-measure with a multimeter',
      'Replace the meter',
    ],
    correctAnswer: 1,
    explanation:
      'A measurement that disagrees with the calculated value is a flag, regardless of direction. An unexpectedly low r2 commonly indicates parallel earth paths (steel containment, bonded supplementary bonds in the bathroom that share the route, a back-box screwed to a metallic stud track that runs back to earth) or a CPC of the wrong csa. Either way, the certificate should not be raised on a number that does not match the design.',
  },
  {
    id: 9,
    question:
      'On Step 3, the L–E reading at every socket comes back at (r1+r2)/4 ± 5 % — except at one accessory which reads ∞. What is the most likely cause?',
    options: [
      'The CPC at that accessory is not terminated, or the back-box earth is the only earth path and is not actually connected to the CPC',
      'The ring is wired as a figure of eight',
      'A spur',
      'The link at the board has fallen off',
    ],
    correctAnswer: 0,
    explanation:
      'If the link at the board had fallen off, every socket would read open. A single open at one accessory while every other accessory reads correctly localises the fault to that accessory: the CPC tail is not landed under the screw, the back-box earth is being relied on without a proper flylead, or there is broken strand conductor between the CPC tail and the terminal.',
  },
  {
    id: 10,
    question:
      'The Schedule of Test Results has a column for R1+R2 for ring finals. Which of the three readings from the GN3 method goes in that column, and to what precision?',
    options: [
      'Step 1 r1 + r2, recorded to one decimal',
      'Step 2 (line–neutral) at the worst socket, recorded as measured',
      'Step 3 (line–CPC) at the worst socket on the ring — i.e. the highest L–E reading observed during Step 3 — recorded to two decimal places in ohms; this is the (r1+r2)/4 value at the worst socket and is the value used for Zs verification on the ring',
      'The end-to-end r1 + r2 from Step 1 alone',
    ],
    correctAnswer: 2,
    explanation:
      'The R1+R2 column for a ring final takes the worst (highest) Step 3 reading around the ring, recorded to two decimals in ohms. This is the conductor-only loop seen at the most remote socket — the value that, added to Ze, gives the Zs at the worst case for the ring. End-to-end r1+r2 from Step 1 is not the R1+R2 the schedule wants; it is a diagnostic intermediate, not the design value.',
  },
];

const InspectionTestingModule3Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Ring final circuit continuity (r1, rn, r2) | I&T Module 3.2 | Elec-Mate',
    description:
      'Reg 643.2.1 second limb + GN3 Section 2.6.6: the three-step ring continuity test, expected (r1+r2)/4 at every socket, and the diagnostic patterns that expose figure-of-eight wiring, spurs and interconnections.',
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
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2"
            title="Ring final circuit continuity (r1, rn, r2)"
            description="The second limb of Reg 643.2.1 — the only test in the regulation that asks for live-conductor continuity. Three measurements that prove a ring is a ring, not a figure of eight."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.2.1(b) is the only place in BS 7671 that asks for line and neutral continuity by resistance measurement — and it only applies to ring final circuits. Why: the ring topology can be wired wrongly in ways no visual inspection will reveal.',
              'GN3 Section 2.6.6 (Reg 2.16) gives a three-step procedure. Step 1: end-to-end resistance of each of the three conductors (r1, rn, r2) at the board. Step 2: cross-connect L outgoing to N returning at the board, then measure L–N at every socket — expected (r1+rn)/4 at all of them. Step 3: cross-connect L outgoing to CPC returning, then measure L–E at every socket — expected (r1+r2)/4 at all of them.',
              'On a correctly wired ring, the Step 2 / Step 3 readings are the same at every socket — half the cable in parallel with the other half. A reading roughly twice that at one socket = spur. A reading that rises to a midpoint then falls = figure-of-eight (an L end has been paired with an N end at the board).',
              'The R1+R2 that goes in the Schedule of Test Results for the ring is the highest Step 3 reading around the ring — the worst-case (r1+r2)/4 — at the most remote socket. That is the value used for Zs verification.',
              'Acceptance is a comparison, not a fixed number. Step 1 readings against GN3 Table BI × cable length; Step 2 / 3 readings against (r1+rn)/4 and (r1+r2)/4. Anything that disagrees with the calculation by more than a few percent is a flag, regardless of direction.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Restate the two limbs of Reg 643.2.1 and explain why the second limb is restricted to ring final circuits',
              'Carry out the GN3 Section 2.6.6 three-step ring continuity test in the correct order, on the bench or on site',
              'Calculate the expected Step 2 and Step 3 readings from Step 1 r1, rn and r2 values, and judge whether a measurement at a socket is consistent with a correctly wired ring',
              'Diagnose the four classic ring faults from the reading pattern alone — break, spur, figure-of-eight (swapped end), and bridging interconnection — without re-pulling cables',
              'Pull the worst-case (r1+r2)/4 from the Step 3 sweep and feed it correctly into Zs = Ze + R1 + R2 for the ring',
              'Record r1, rn, r2 and the worst-case R1+R2 onto the A4:2026 Schedule of Test Results without ambiguity',
            ]}
          />

          <ContentEyebrow>Why this test only exists for rings</ContentEyebrow>

          <ConceptBlock
            title="The second limb of Reg 643.2.1 — and why it is the only one"
            plainEnglish="On every other circuit type in BS 7671, you only have to test the protective conductor by resistance. On a ring final, you also have to test the line and neutral by resistance. The reason is that a ring can be wrong in ways visual inspection cannot detect."
            onSite="When a homeowner asks why ring testing is so much fuss compared to a radial, the honest answer is: because the topology is what is being tested, not just the conductor. The cable can look perfect and the ring can still be wired as something that is not a ring."
          >
            <p>
              Reg 643.2.1 is split into two limbs. Limb (a) — protective conductors and bonding —
              applies universally and was the subject of the previous section. Limb (b) is the limb
              that singles out ring final circuits and adds an extra duty: live-conductor
              continuity, measured by resistance.
            </p>
            <p>
              On a radial, a broken line conductor or a missing neutral terminates an accessory
              cleanly: nothing works at the dead end and the fault is obvious. On a ring, a broken
              conductor at one point leaves every socket fed from the other direction, so every
              socket still works. The fault is silent — until the day the alternative path is
              loaded, the surviving conductor is run beyond its rating, and the cable cooks.
            </p>
            <p>
              The same is true of a figure-of-eight: a ring whose ends are paired wrongly at the
              board so that line outgoing connects to neutral returning. Every socket still has line
              and neutral. Voltage reads correctly. But the conductors are not a parallel loop and
              the current-carrying capacity assumed by the design no longer applies. Only the
              live-conductor continuity test reveals the geometry.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.2.1"
            clause={
              <>
                The continuity of conductors and connections to exposed-conductive-parts and
                extraneous-conductive-parts, if any, shall be verified by a measurement of
                resistance of:
                <br />
                (a) protective conductors, including protective bonding conductors; and
                <br />
                (b) in the case of ring final circuits, live conductors.
              </>
            }
            meaning="(b) is the duty that lands every ring final on a separate test row in your method statement. The verification verb is the same — measurement of resistance — so a buzzer will not satisfy it. The instrument (low-resistance ohmmeter) and the technique (the three-step method in GN3 Section 2.6.6) are how you discharge it."
          />

          <SectionRule />

          <ContentEyebrow>The three-step method, in order</ContentEyebrow>

          <ConceptBlock
            title="Step 1 — end-to-end resistance of each conductor at the board"
            plainEnglish="Identify both ends of each of the three conductors at the board. Measure each conductor end-to-end with the low-resistance ohmmeter. You should get three numbers: r1 (line), rn (neutral) and r2 (CPC). On a correctly wired ring, r1 should be roughly equal to rn. r2 will be either equal (if the CPC is the same csa as the line/neutral) or larger (if the CPC is reduced)."
            onSite="Step 1 is the diagnostic foundation. Steps 2 and 3 are checks against Step 1. If Step 1 is wrong — broken conductor, wrong end pair, or the cable is not actually a ring — Steps 2 and 3 will be inexplicable. Do not skip Step 1 even when the ring 'feels right'."
          >
            <p>GN3 Section 2.6.6 / Reg 2.16 sets out Step 1 in plain terms:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Isolate the circuit at the source. Prove dead. Lock off. The ring must be
                disconnected from any other circuit and from the consumer-unit busbar — the whole
                test depends on having the four ends of the ring (two line, two neutral) and the two
                ends of the CPC physically separable.
              </li>
              <li>
                Visually identify the two ends of the line conductor, the two ends of the neutral
                conductor, and the two ends of the CPC at the board. Mark them if necessary — pieces
                of tape with L1 / L2, N1 / N2, CPC1 / CPC2 prevent any confusion later.
              </li>
              <li>
                Null the test leads of the low-resistance ohmmeter against a known short, or measure
                their resistance and subtract.
              </li>
              <li>
                Connect the meter between the two line ends and read the resistance — this is r1
                (the end-to-end line conductor resistance, going round the ring).
              </li>
              <li>Repeat between the two neutral ends — this is rn.</li>
              <li>Repeat between the two CPC ends — this is r2.</li>
              <li>Record all three values to two decimal places, in ohms.</li>
            </ol>
            <p>
              The first sanity check is r1 ≈ rn within a few percent. They are the same length of
              the same cable, so they should read the same. A noticeable disagreement at Step 1
              means one of the ends is not paired with its real other end — typically a single
              broken strand pinched at a terminal, or an end that has been confused with a spur tail
              of similar colour.
            </p>
            <p>
              The second sanity check is the magnitude. For 2.5/1.5 mm² T&amp;E with 35 m of cable
              total run (i.e. 35 m round the ring), r1 should be around 35 × 7.41 mΩ/m = 0.26 Ω at
              20°C, and r2 around 35 × 12.10 mΩ/m = 0.42 Ω. If r1 reads 0.04 Ω, the meter probes are
              touching at the back-box — the conductor is not in the test path.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Section 2.6.6 · Chapter 2 (Reg 2.16)"
            clause={
              <>
                A three-step test is required to verify the continuity of the line, neutral and
                protective conductors and the correct wiring of every ring final circuit. The
                purpose of this three-step test is to confirm continuity and detect incorrect
                interconnection or broken conductors or &lsquo;figure of eight&rsquo;
                configurations.
              </>
            }
            meaning="Two duties in one sentence: continuity of three conductors, and verification of the topology. A meter that beeps on continuity gives you the first; only the three-step method gives you the second. This is the regulation that earns ring continuity its place on a separate test row."
          />

          <ConceptBlock
            title="Step 2 — cross-connect L outgoing to N returning at the board, then read L–N at each socket"
            plainEnglish="At the board, take the outgoing line end and connect it to the returning neutral end. Take the returning line end and connect it to the outgoing neutral end. (Effectively, you are joining the line and neutral conductors into one big loop that goes round the ring twice.) Then go to every socket on the ring and measure resistance line-to-neutral. Every reading should be the same: (r1 + rn) / 4."
            onSite="Step 2 is the test that proves the line and neutral conductors are correctly paired at the board. If the line outgoing has been mis-identified and is actually paired with the neutral outgoing instead of neutral returning, Step 2 produces the figure-of-eight reading pattern."
          >
            <p>The reasoning is geometric:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                When you cross-connect L outgoing to N returning at the board, the line conductor
                and the neutral conductor become one continuous loop that goes round the ring twice
                — once on the line and once on the neutral.
              </li>
              <li>
                At any socket on the ring, the meter sees the cable from one direction in parallel
                with the cable from the other direction — half the loop in parallel with the other
                half.
              </li>
              <li>
                Two equal halves in parallel = a quarter of the whole. So the reading at every
                socket is (r1 + rn) / 4.
              </li>
              <li>
                Critically, this is the same at every socket. Whether you measure at the closest
                socket or the furthest socket, the parallel combination of the two halves is the
                same number — the geometry is symmetric.
              </li>
            </ul>
            <p>
              Worked: if Step 1 gave r1 = 0.41 Ω and rn = 0.42 Ω, Step 2 should read (0.41 + 0.42)/4
              = 0.21 Ω at every socket on the ring, ± a few milliohms for terminations.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Step 3 — cross-connect L outgoing to CPC returning, then read L–E at each socket"
            plainEnglish="Repeat the cross-connect, this time with line and CPC instead of line and neutral. Then go round the ring again and read L–E at every socket. Every reading should be (r1 + r2) / 4. The highest of these readings — at the most remote socket — is the R1+R2 you record on the schedule and use for the Zs verification."
            onSite="Step 3 is the step that gives you the number for the certificate. Steps 1 and 2 are diagnostic. Step 3 is the value the regulation cares about: the conductor-only earth loop seen at the worst-case socket on the ring."
          >
            <p>
              The geometry is identical to Step 2, but the second conductor in the parallel pair is
              now the CPC instead of the neutral. Each socket sees half the cable in parallel with
              the other half, so the reading at every socket is (r1 + r2) / 4.
            </p>
            <p>
              Because r2 is typically larger than rn (the CPC is usually a smaller csa than the line
              / neutral on T&amp;E), the Step 3 reading is correspondingly larger than the Step 2
              reading. For the worked example above with r2 = 0.69 Ω, Step 3 = (0.41 + 0.69)/4 =
              0.275 Ω at every socket.
            </p>
            <p>
              On the certificate: the column for R1+R2 takes the highest Step 3 reading observed
              around the ring — the worst-case socket. In a perfectly wired ring of perfect
              terminations every socket would read identically and the worst-case would equal the
              calculated value. In the real world, terminal resistance varies slightly socket to
              socket; the worst reading is the one that goes to print.
            </p>
          </ConceptBlock>

          {videos.ringFinalTest && (
            <div className="my-2">
              <VideoCard
                {...videos.ringFinalTest}
                topic="The three-step method walked through end-to-end"
                caption="Craig Wiltshire walks the GN3 three-step ring continuity test on a real consumer unit — Step 1 end-to-end, Step 2 cross-connect L–N, Step 3 cross-connect L–CPC."
              />
            </div>
          )}

          {/* Diagram — three-step ring continuity setup (Step 3 cross-connect) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Step 3 cross-connect — L outgoing to CPC returning at the board, meter reads (r1+r2)/4
              at every socket
            </h4>
            <svg
              viewBox="0 0 800 380"
              className="w-full h-auto"
              role="img"
              aria-label="Ring final continuity Step 3 diagram. At the consumer unit, L1 is connected to CPC2 and L2 is connected to CPC1. The ring loop runs out to four sockets and back. The low-resistance ohmmeter is shown at each socket reading L to E and the reading equals (r1 + r2) divided by 4."
            >
              <rect
                x="30"
                y="40"
                width="170"
                height="280"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="115"
                y="62"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                fontWeight="bold"
              >
                CONSUMER UNIT
              </text>
              <text x="115" y="78" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Ring isolated, both ends out)
              </text>

              <rect
                x="55"
                y="100"
                width="50"
                height="20"
                rx="3"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="80"
                y="114"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                L1
              </text>
              <rect
                x="125"
                y="100"
                width="50"
                height="20"
                rx="3"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="150"
                y="114"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                L2
              </text>

              <rect
                x="55"
                y="160"
                width="50"
                height="20"
                rx="3"
                fill="rgba(59,130,246,0.1)"
                stroke="#3B82F6"
                strokeWidth="1.2"
              />
              <text
                x="80"
                y="174"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
              >
                N1
              </text>
              <rect
                x="125"
                y="160"
                width="50"
                height="20"
                rx="3"
                fill="rgba(59,130,246,0.1)"
                stroke="#3B82F6"
                strokeWidth="1.2"
              />
              <text
                x="150"
                y="174"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
              >
                N2
              </text>

              <rect
                x="55"
                y="220"
                width="50"
                height="20"
                rx="3"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="80"
                y="234"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                CPC1
              </text>
              <rect
                x="125"
                y="220"
                width="50"
                height="20"
                rx="3"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="150"
                y="234"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                CPC2
              </text>

              <path
                d="M80,100 C 30,100 20,150 20,170 C 20,200 30,230 150,230"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeDasharray="6,3"
              />
              <path
                d="M150,100 C 200,100 210,150 210,170 C 210,200 200,230 80,230"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeDasharray="6,3"
              />
              <text
                x="115"
                y="270"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Step 3 cross-connect
              </text>
              <text x="115" y="284" textAnchor="middle" fill="#FBBF24" fontSize="9">
                L1 ↔ CPC2 · L2 ↔ CPC1
              </text>

              <line x1="200" y1="110" x2="720" y2="110" stroke="#EF4444" strokeWidth="2" />
              <line
                x1="200"
                y1="170"
                x2="720"
                y2="170"
                stroke="#3B82F6"
                strokeWidth="2"
                opacity="0.45"
              />
              <line x1="200" y1="230" x2="720" y2="230" stroke="#22C55E" strokeWidth="2" />
              <line
                x1="200"
                y1="125"
                x2="720"
                y2="125"
                stroke="#EF4444"
                strokeWidth="2"
                opacity="0.55"
                strokeDasharray="3,2"
              />
              <line
                x1="200"
                y1="245"
                x2="720"
                y2="245"
                stroke="#22C55E"
                strokeWidth="2"
                opacity="0.55"
                strokeDasharray="3,2"
              />

              <g>
                <rect
                  x="240"
                  y="80"
                  width="70"
                  height="32"
                  rx="4"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text x="275" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Skt 1
                </text>
                <text
                  x="275"
                  y="318"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  0.275 Ω
                </text>
              </g>
              <g>
                <rect
                  x="370"
                  y="80"
                  width="70"
                  height="32"
                  rx="4"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text x="405" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Skt 2
                </text>
                <text
                  x="405"
                  y="318"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  0.275 Ω
                </text>
              </g>
              <g>
                <rect
                  x="500"
                  y="80"
                  width="70"
                  height="32"
                  rx="4"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text x="535" y="100" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Skt 3
                </text>
                <text
                  x="535"
                  y="318"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  0.275 Ω
                </text>
              </g>
              <g>
                <rect
                  x="630"
                  y="80"
                  width="70"
                  height="32"
                  rx="4"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="665"
                  y="100"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  Skt 4
                </text>
                <text
                  x="665"
                  y="318"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  0.282 Ω ← worst
                </text>
              </g>

              <circle
                cx="665"
                cy="155"
                r="14"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="665"
                y="159"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Ω
              </text>
              <line x1="665" y1="115" x2="665" y2="141" stroke="#EF4444" strokeWidth="1.5" />
              <line x1="665" y1="170" x2="665" y2="225" stroke="#22C55E" strokeWidth="1.5" />

              <rect
                x="30"
                y="340"
                width="740"
                height="32"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="360" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11">
                Worst-case L–E reading on Step 3 (here Skt 4 = 0.282 Ω) → record as R1+R2 on the
                schedule and use for Zs verification.
              </text>
            </svg>
          </div>

          {/* Mini-table — expected r1 / rn / r2 from GN3 Table BI */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Expected end-to-end Step 1 values (GN3 Table BI · 20°C · per metre of ring length)
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Ring (line / CPC)</th>
                    <th className="text-center text-white/80 py-2">r1 = rn (mΩ/m)</th>
                    <th className="text-center text-white/80 py-2">r2 (mΩ/m)</th>
                    <th className="text-center text-elec-yellow py-2">(r1+rn)/4 per m (mΩ)</th>
                    <th className="text-center text-elec-yellow py-2">(r1+r2)/4 per m (mΩ)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">2.5 / 1.5 mm² T&amp;E</td>
                    <td className="text-center">7.41</td>
                    <td className="text-center">12.10</td>
                    <td className="text-center text-elec-yellow">3.71</td>
                    <td className="text-center text-elec-yellow">4.88</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">4.0 / 1.5 mm² T&amp;E</td>
                    <td className="text-center">4.61</td>
                    <td className="text-center">12.10</td>
                    <td className="text-center text-elec-yellow">2.31</td>
                    <td className="text-center text-elec-yellow">4.18</td>
                  </tr>
                  <tr>
                    <td className="py-2">2.5 / 2.5 mm² (singles)</td>
                    <td className="text-center">7.41</td>
                    <td className="text-center">7.41</td>
                    <td className="text-center text-elec-yellow">3.71</td>
                    <td className="text-center text-elec-yellow">3.71</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[12.5px] text-white/65 mt-3 leading-relaxed">
              Multiply by total ring length in metres for the predicted Step 2 / Step 3 reading at
              every socket. e.g. 35 m of 2.5/1.5 T&amp;E → expected Step 3 ≈ 35 × 4.88 = 171 mΩ ≈
              0.17 Ω at 20°C, multiplied by 1.20 ≈ 0.21 Ω at 70°C for the Zs verification.
            </p>
          </div>

          <Scenario
            title="A 32 m ring final, 2.5/1.5 mm² T&E — what should the readings look like?"
            situation="A new kitchen ring final, 32 m of 2.5/1.5 mm² T&E, a 32 A B-curve MCB on a TN-C-S supply with Ze = 0.27 Ω. Step 1 readings come back as r1 = 0.24 Ω, rn = 0.24 Ω, r2 = 0.39 Ω."
            whatToDo={
              <>
                <span className="block">
                  Sanity-check Step 1: r1 ≈ rn (both 0.24 Ω) — pass. Magnitude check: 32 × 7.41 mΩ/m
                  = 0.24 Ω at 20°C — bang on. r2 expected 32 × 12.10 mΩ/m = 0.39 Ω — bang on. Step 1
                  confirms a real ring of the expected geometry.
                </span>
                <span className="block">
                  Predicted Step 2 at every socket = (0.24 + 0.24)/4 = 0.12 Ω. Predicted Step 3 at
                  every socket = (0.24 + 0.39)/4 = 0.16 Ω.
                </span>
                <span className="block">
                  Walk the ring at Step 2 — every socket should read 0.12 Ω ± a few mΩ. Walk the
                  ring at Step 3 — every socket should read 0.16 Ω ± a few mΩ. Take the worst Step 3
                  reading (say 0.17 Ω at the furthest socket) as the R1+R2 for the schedule.
                </span>
                <span className="block">
                  Zs verification (corrected to 70°C): Zs = Ze + (R1+R2 × 1.20) = 0.27 + (0.17 ×
                  1.20) = 0.27 + 0.20 = 0.47 Ω. Compare against the Table 41 limit for 32 A B-curve
                  at 0.4 s on a TN-C-S supply (typically 1.37 Ω applied to A4 max-permitted).
                  Comfortable headroom.
                </span>
              </>
            }
            whyItMatters="The headline R1+R2 is 0.17 Ω, but you have arrived at it through three independent measurements that each cross-check the others. If Step 2 had given you 0.20 Ω at every socket, you would have known immediately that the calculation does not match the geometry — even before you got to Step 3. That is what the three-step test buys you that no single measurement can."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            The four classic ring faults — and how the readings expose them
          </ContentEyebrow>

          <ConceptBlock
            title="Fault 1 — a break in one leg of the ring"
            plainEnglish="One conductor (line, neutral or CPC) is broken or disconnected somewhere on the ring. The two ends are still landed at the board, but the loop is not continuous. Step 1 shows it immediately."
          >
            <p>
              Step 1 reads ∞ on the broken conductor. The other two read normally. There is no point
              progressing to Step 2 / 3 with a broken conductor — fix the break first.
            </p>
            <p>
              Common locations: a back-box screwed up tightly on a single strand of CPC that has
              broken under the screw; a junction-box terminal where the conductor is held by paint
              and not by metal; a damaged cable from a recent floor-board lift; a never-completed
              second drop at a final socket where the installer ran one cable to the box and forgot
              to bring the second back.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Fault 2 — a spur on the ring (not always a fault, but always a reading change)"
            plainEnglish="A socket is fed by a single cable that taps off the main ring run, rather than being wired into the ring itself. Step 2 / Step 3 reads the expected (r1+rn)/4 or (r1+r2)/4 at every socket on the ring, but reads roughly twice that value at the spur socket — because the spur conductor adds series resistance that is not part of any parallel pair."
          >
            <p>
              GN3 Reg 2.19 explicitly notes the spur signature: a single isolated high reading at
              one socket against a consistent value at the rest. The high reading is not a fault in
              itself — spurs are permitted under the OSG ring rules — but every spur should be
              identified, recorded, and counted against the spur-per-ring limit (one spur for every
              socket on the ring, in a domestic 32 A ring).
            </p>
            <p>
              A spur is confirmed by inspection at the back-box: one cable in is a spur; two cables
              in is a ring connection. If the readings suggest a spur but the back-box has two
              cables, the &lsquo;ring&rsquo; cable is actually a junction tail to a second spur
              further on, and the ring is misjoined under that accessory.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Fault 3 — figure-of-eight (the L and N ends crossed at the board)"
            plainEnglish="At the board, the line outgoing has been mistakenly paired with the neutral outgoing, instead of the neutral returning. The ring is not actually a parallel pair: it is a figure-of-eight where the line and neutral cross over halfway round."
          >
            <p>
              Step 1 looks correct: r1 ≈ rn, magnitudes match the calculation. So the bare
              continuity test passes. Step 2 is what reveals the fault. Instead of the same reading
              at every socket, the readings rise progressively from the start of the ring to a peak
              roughly halfway round, then fall back to the start value.
            </p>
            <p>
              GN3 Reg 2.19 captures this as the diagnostic profile of a figure-of-eight. The fix is
              at the board: re-identify the four ends, pair line outgoing with neutral returning
              correctly, and re-test from Step 1. This is one of the most common installer errors —
              and one that visual inspection cannot catch, because the wrongly paired ends look
              identical to correctly paired ends.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Fault 4 — bridging interconnection (an unintended joint between two points on the ring)"
            plainEnglish="Somewhere on the ring, a junction box or accessory has been fitted that bridges two conductors which should be electrically separated. The ring is no longer a single ring — it is a smaller ring with a tail."
          >
            <p>
              GN3 Reg 2.19 calls this the &lsquo;readings differing only between two adjacent socket
              positions&rsquo; signature. Steps 2 and 3 read consistently for most of the ring, then
              jump (or drop) sharply between two adjacent sockets and remain at the new value for
              the rest of the loop. The boundary between the two values isolates the suspect joint —
              it is in the cable run between those two sockets.
            </p>
            <p>
              Most often: a previous installer fitted a junction box to take a spur, then lost track
              of the polarity at re-termination and bridged a conductor that should have continued
              through. Less commonly: a forgotten dual-feed at a kitchen extractor where two ring
              legs are landed at the same accessory terminal. Trace the cable physically between the
              two sockets and identify the joint.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Skipping Step 1 because the ring &lsquo;looks fine&rsquo;"
            whatHappens="The installer goes straight to Step 2 / Step 3, gets a single number at the furthest socket, and writes it on the certificate. The reading happens to look reasonable. Six months later the homeowner trips a 32 A MCB plugging in a kettle on the kitchen ring; an investigation shows the line conductor was broken at a junction box from the day of installation and the kitchen ring has been operating as a half-ring on the surviving line conductor for half a year. Step 1 would have caught it on day one — the broken line would have read ∞. By skipping Step 1, the installer has signed a certificate against a circuit that was never a ring."
            doInstead="Always do Step 1 first, in order, and write the three numbers down before you go to Steps 2 and 3. Step 2 and Step 3 are checks against Step 1 — they only mean what GN3 says they mean if Step 1 has confirmed three end-to-end conductors. If Step 1 has not happened, the three-step method has not happened."
          />

          <CommonMistake
            title="Recording the Step 1 r1+r2 as the certificate R1+R2"
            whatHappens="The installer measures Step 1 r1 = 0.41 Ω and r2 = 0.69 Ω, adds them to 1.10 Ω, and writes 1.10 Ω in the R1+R2 column on the schedule. Zs verification then gives Zs = Ze + 1.10 = something like 0.32 + 1.10 = 1.42 Ω, which fails the Table 41 limit for a 32 A B-curve. The installer panics, replaces the cable. The cable was fine. The number was wrong."
            doInstead="The R1+R2 for a ring is the worst Step 3 reading — (r1+r2)/4, not r1+r2. The whole point of the ring is that every socket sees a parallel half-loop, so the conductor-only loop at the worst socket is one quarter of the end-to-end. If Step 3 gives 0.275 Ω at the worst socket, that is the value for the schedule — not 1.10 Ω. The Zs sum then becomes 0.32 + 0.275 = 0.595 Ω, which is well inside the limit."
          />

          <CommonMistake
            title="Cross-connecting the wrong ends at Step 2 or Step 3"
            whatHappens="The installer cross-connects L1 to L2 (line outgoing to line returning) instead of L1 to N2 (line outgoing to neutral returning). Step 2 then reads the line conductor in series with itself rather than line in parallel with neutral, and gets an unexpectedly low reading at every socket. The installer looks at the Step 1 r1 of 0.24 Ω and the Step 2 reading of 0.06 Ω, calls it &lsquo;great&rsquo;, and signs off. The certificate is now meaningless — Step 2 was not the test the regulation asked for."
            doInstead="Write the cross-connect on a piece of tape on the board before you do it. Step 2 = L outgoing to N returning, L returning to N outgoing. Step 3 = L outgoing to CPC returning, L returning to CPC outgoing. Confirm the cross-connect by reading L–N at the board with the ohmmeter — the reading at the board should be (r1+rn) approximately, not zero (zero means you have shorted the line on itself)."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>From Step 3 to the certificate</ContentEyebrow>

          <ConceptBlock
            title="Worst-case (r1+r2)/4 → R1+R2 on the schedule → Zs verification"
            plainEnglish="The R1+R2 value the certificate wants for a ring final is the highest Step 3 reading you observed walking the ring — that is, (r1+r2)/4 at the worst-case socket. Add Ze (corrected for temperature on R1+R2 if you are checking against Table 41) and you have the predicted Zs at the most remote socket on the ring."
            onSite="Most modern multifunction testers will store r1, rn and r2 in their ring-test mode and auto-calculate the predicted (r1+r2)/4. Cross-check the auto-calculated value against the worst-case socket reading you took with the meter at the back-plate. They should agree to within a few milliohms; if they disagree by more, the meter is reading a parallel earth path through the back-box."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Schedule R1+R2 (ring final row):</strong> the worst Step 3 reading round the
                ring, recorded in ohms to two decimals. Not the calculated (r1+r2)/4. Not Step 1
                r1+r2. The measured number at the worst socket on Step 3.
              </li>
              <li>
                <strong>Schedule Zs (ring final row):</strong> Ze (from the origin) + measured R1+R2
                corrected to operating temperature (typically × 1.20 for thermoplastic at 70°C).
                Compare against the Table 41 / A4 max-permitted-Zs limit for the disconnection time
                required.
              </li>
              <li>
                <strong>Comments column:</strong> note any spurs identified during Step 2 / 3, their
                socket position, and the expected vs measured spur reading. The next inspector
                should not have to re-derive the topology from the readings.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Section 2.6.6 · Reg 2.19"
            clause={
              <>
                When testing a ring final circuit with single-core cables, the electrician shall
                verify the continuity between the line and neutral conductors around the ring. An
                error (e.g., line and neutral not joined correctly at opposite ends) will be
                apparent from readings taken at socket-outlets progressing around the ring: readings
                progressively increase towards the midpoint and then decrease towards the other end
                of the ring.
              </>
            }
            meaning="The figure-of-eight signature is in the regulation itself: progressive rise to a midpoint, then progressive fall. If you see this pattern, do not 'average' the readings or accept the worst as R1+R2 — the ring is wrong at the board, and only re-pairing the ends will fix it. Re-test from Step 1 after the re-pair."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading the four classic patterns at a glance</ContentEyebrow>

          <ConceptBlock
            title="The Step 3 readings sheet, decoded"
            plainEnglish="If you write the eight or ten Step 3 readings down in order around the ring, the pattern reveals the fault before any further investigation. Memorise the four patterns and you can diagnose 95 % of ring faults from the readings sheet alone."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">Flat line.</strong> Every socket reads the same
                (r1+r2)/4 ± a few mΩ. Correctly wired ring.
              </li>
              <li>
                <strong className="text-amber-300">Flat line with one spike.</strong> Every socket
                on the ring reads (r1+r2)/4. One additional socket (the spur) reads roughly twice
                that. Spur — record on the schedule.
              </li>
              <li>
                <strong className="text-amber-300">Hill profile.</strong> Readings rise smoothly to
                a midpoint and fall back. Figure-of-eight — wrong pairing at the board. Re-pair and
                re-test from Step 1.
              </li>
              <li>
                <strong className="text-red-300">Step change.</strong> Flat for the first n sockets,
                jumps abruptly to a different flat value for the remaining sockets. Bridging
                interconnection between the two adjacent sockets. Trace and remove the bridge.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A 1980s rewire with three rings — and one figure-of-eight"
            situation="An EICR on a 1986 four-bedroom house finds three ring final circuits at the consumer unit. Two test cleanly: flat-line Step 2 and Step 3 at expected values. The third ring's Step 1 looks fine (r1 = 0.45, rn = 0.45, r2 = 0.71) but Step 2 starts at 0.18 Ω at the first socket, climbs to 0.30 Ω at the middle socket of the run, and drops back to 0.18 Ω at the last socket."
            whatToDo={
              <>
                <span className="block">
                  The hill profile is unmistakeable per GN3 Reg 2.19 — line and neutral are
                  cross-paired at the board, and the ring is a figure of eight.
                </span>
                <span className="block">
                  Code C2 on the EICR (potentially dangerous: ring final not wired correctly,
                  conductor current rating no longer guaranteed).
                </span>
                <span className="block">
                  Recommendation: at the consumer unit, identify all four line / neutral ends of the
                  ring, re-pair line outgoing with neutral returning, line returning with neutral
                  outgoing. Re-test from Step 1. Do not accept the existing Zs reading on the
                  certificate — the existing reading was taken on a wrongly-wired ring and cannot be
                  relied upon.
                </span>
              </>
            }
            whyItMatters="The visual inspection on the previous EICR (5 years prior) almost certainly missed this — there is nothing to see at the consumer unit, all four ends are landed under the right colours and the right terminals. Only the three-step continuity test at this EICR has revealed the topology error. This is the regulation 643.2.1(b) duty doing exactly what it was written to do."
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.2.1(b) is unique to ring finals — it is the only place BS 7671 asks for live-conductor continuity by resistance measurement.',
              'GN3 Section 2.6.6 (Reg 2.16) gives the three-step method: Step 1 end-to-end r1, rn, r2 at the board; Step 2 cross-connect L–N then read at every socket; Step 3 cross-connect L–CPC then read at every socket.',
              'Sanity-check Step 1: r1 ≈ rn within a few percent, and magnitudes match GN3 Table BI × ring length. If Step 1 fails sanity, do not progress to Step 2/3 until the cause is found.',
              'Step 2 reading at every socket should be (r1+rn)/4. Step 3 reading at every socket should be (r1+r2)/4. Same value at every socket — that is the symmetry of a correctly wired ring.',
              'The R1+R2 on the schedule for a ring is the worst-case Step 3 reading, not Step 1 r1+r2 and not the calculated value.',
              'Four diagnostic patterns from the Step 3 readings sheet: flat = good; flat with one spike = spur; hill = figure-of-eight; step change = bridging interconnection.',
              'Spurs at one isolated socket roughly double the (r1+r2)/4 value. Confirm by inspection at the back-box (one cable in = spur, two = ring).',
              'Use a low-resistance ohmmeter — not a multimeter, not a buzzer. Null the leads first.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Why does the ring continuity test only apply to ring finals — what is wrong with using it on a radial?',
                answer:
                  'Nothing wrong, just nothing to gain. A radial cannot be wired as a figure of eight or a parallel-pair-with-spur — the topology has only one path from board to load. A break in a radial line conductor terminates the circuit cleanly at the break, so a simple continuity test catches every fault. The three-step method exists to catch faults that are only visible because of the parallel topology of a ring.',
              },
              {
                question:
                  'My multifunction tester has a one-button "ring continuity" mode. Can I trust it instead of doing the three steps myself?',
                answer:
                  'Yes, but only if you understand what it is doing. The mode automates the three steps — it asks you to identify the six ends, measures r1, rn and r2, prompts you to cross-connect, and walks you through the socket-by-socket Step 2/3 reads. The "automation" does not skip Step 1. If your tester is one that infers (r1+r2)/4 from a single end-to-end measurement and skips the cross-connect entirely, that is not the GN3 method — it is a shortcut, and it will not catch the figure-of-eight or the bridging interconnection. Read the manual; if in doubt, do it manually.',
              },
              {
                question:
                  'On Step 2 my readings are not exactly the same at every socket — they vary by a few milliohms. Is this a fault?',
                answer:
                  'Almost certainly not. A few milliohms of variation socket to socket is termination resistance — the screw under each accessory does not contribute identically and never will. GN3 implicitly accepts this by talking about consistency, not equality. The pattern you are looking for is qualitatively flat. A single 0.05 Ω difference against a 0.20 Ω background is normal; a single 0.20 Ω jump against the same background is a spur; a smooth climb to a midpoint is a figure of eight.',
              },
              {
                question:
                  'Step 1 r1 and rn agree, but r2 reads much higher than calculated. Is the CPC broken?',
                answer:
                  'Not necessarily — the most common cause of an unexpectedly high r2 is a single broken strand of the CPC pinched at one accessory, or a back-box-only earth (the strap is on the box and not on the accessory). Inspect every CPC termination on the ring. A genuinely broken CPC reads ∞, not just high. If r2 is 30 % over the GN3 Table BI prediction, you are looking at series resistance from a poor termination.',
              },
              {
                question:
                  'On Step 3, all sockets read 0.27 Ω except one back-box behind a fridge that reads 0.55 Ω. Is that a spur or a fault?',
                answer:
                  'Almost always a spur, but confirm at the box. Pull the fridge out, drop the socket from the back-box, and look at the cables. One T&E cable in = spur (correct, just record on the schedule). Two T&E cables in = ring connection, in which case the high reading is a fault — most likely a single conductor (often the CPC) under the wrong screw or with one core unstripped.',
              },
              {
                question: 'Is there a maximum number of spurs allowed per ring?',
                answer:
                  'OSG Appendix H rules: one unfused spur per socket on the ring (or one fused spur per accessory connected, with the spur protected by a 13 A BS 1362 fuse). The spur cable must be at least the same csa as the ring cable. The combined floor area covered by a 32 A ring (with all its spurs) must not exceed 100 m² in domestic premises. None of these are tested by the continuity test directly — but the test will identify the spurs, and you record each one to keep the spur count auditable.',
              },
              {
                question:
                  'On Step 2 I get the hill profile (rises to a midpoint, falls back). I am sure I cross-connected correctly. What now?',
                answer:
                  'Recheck the cross-connect at the board first — the most common cause is L1 to N1 (both outgoing) instead of L1 to N2 (outgoing to returning). Mis-cross-connect produces a different geometry that mimics the figure-of-eight pattern. If the cross-connect is verified correct and the hill profile persists, the ring is genuinely wired as a figure of eight — re-pair the four ends at the board and re-test from Step 1. Do not record any reading from the wrongly-wired test on the schedule.',
              },
              {
                question:
                  'Does the Step 1 r1+r2 value have any use, or is only Step 3 (r1+r2)/4 useful?',
                answer:
                  'Step 1 r1+r2 is the predicted Step 3 × 4. It is the cross-check that proves the (r1+r2)/4 readings you observe at the sockets are arithmetically consistent with the end-to-end conductor lengths. If your Step 3 worst-socket reading is far from Step 1 r1+r2 ÷ 4, the cross-connect is wrong, the meter is reading a parallel path, or one of the Step 1 measurements has a fault you missed. So Step 1 r1+r2 is diagnostic — but it is not the value the certificate wants in the R1+R2 column.',
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
          <Quiz title="Ring final continuity (r1, rn, r2) — Module 3.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-3/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 Main bonding conductor testing
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

export default InspectionTestingModule3Section2;
