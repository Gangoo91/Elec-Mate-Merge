/**
 * Module 5 · Section 3 · Subsection 3 — Ring final continuity (3-step test)
 * Maps to C&G 2365-03 / Unit 304 / LO5 / AC 5.1, 5.2
 *   AC 5.1 — "state why it is necessary to verify continuity of protective bonding conductors, circuit protective conductors, and ring final circuit conductors"
 *   AC 5.2 — "state the methods for verifying continuity of protective conductors and ring final circuit conductors"
 * Layered: 2357 ELTK06 / ring final testing
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Ring final continuity — the 3-step test | Level 3 Module 5.3.3 | Elec-Mate';
const DESCRIPTION =
  'The IET 3-step ring final test per BS 7671 Reg 643.2.1(b) — end-to-end r1, rn, r2; L-N cross-connection at every socket; L-CPC cross-connection at every socket. Spot broken rings, spurs and wiring errors from the pattern of readings, and derive R1+R2 for the Zs calc.';

const checks = [
  {
    id: 'm5-s3-sub3-three-steps',
    question: 'Per BS 7671 Reg 643.2.1(b), ring final continuity is verified by:',
    options: [
      'A single end-to-end reading on the CPC only, taken with the ring left connected at the CU. If the CPC is continuous around the loop the ring is proven, because line and neutral follow the same route.',
      'A single R1+R2 reading at the furthest socket with the ring as installed (both legs landed at the CU). The parallel loop gives the lowest reading on the ring, which is taken as the result.',
      'A 3-step test: (1) end-to-end r1 (line), rn (neutral), r2 (CPC) with the ring open at the CU; (2) L-N cross-connection — link L of one leg to N of the other and read at every socket; (3) L-CPC cross-connection — link L of one leg to CPC of the other and read at every socket. Constant cross-connection readings prove an intact ring.',
      'An insulation resistance test between line and neutral around the ring. A reading above 1 MΩ confirms the ring is continuous on both live conductors and the CPC.',
    ],
    correctIndex: 2,
    explanation:
      "The 3-step test is the IET-published method for satisfying Reg 643.2.1(b). Step 1 confirms each conductor is continuous around the loop end-to-end. Step 2 (L-N cross-connection) confirms the ring is actually a ring on L and N — readings should be constant at every socket. Step 3 (L-CPC cross-connection) gives R1+R2 for the Zs calc and confirms the CPC ring is intact. A single end-to-end reading is insufficient because a broken ring would still give a sensible-looking value.",
  },
  {
    id: 'm5-s3-sub3-spur-detection',
    question: 'During Step 3 (L-CPC cross-connection) you take readings at every socket on a 12-socket ring. Eleven sockets read between 0.18 and 0.20 Ω — constant. The twelfth socket reads 0.36 Ω. What does that tell you?',
    options: [
      "Socket 12 has a broken ring leg, so the meter is reading a long radial path to that point. The higher reading proves one leg of the ring is open between socket 11 and socket 12.",
      "Socket 12 is on a spur off the ring. The extra resistance (0.36 - 0.19 = 0.17 Ω) is the round-trip length of the spur cable in series with the ring midpoint reading. One unfused spur per outlet on the ring is permitted; document the spur cable size and length on the schedule.",
      "Socket 12 has its line and CPC crossed at the back-box. A swapped pair always reads roughly double the rest of the ring, so the 0.36 Ω points to a reversed termination at that socket.",
      "Socket 12 is simply the furthest from the CU, so a higher reading is expected. On an intact ring the cross-connection reading rises steadily with distance from the consumer unit.",
    ],
    correctIndex: 1,
    explanation:
      'A constant set of readings with one outlier consistently higher = a spur. The extra resistance is the round-trip of the spur cable from the ring tap to the spurred socket. Per BS 7671 + IET On-Site Guide, one unfused spur per outlet on the ring is permitted, sized to match the ring conductors (so 2.5/1.5 mm² T&E for a domestic 32 A ring). Document the spur on the STR with location and approximate cable length so future inspectors can verify nothing has been added.',
  },
  {
    id: 'm5-s3-sub3-zs-from-ring',
    question: 'Step 1: r1 = 0.40 Ω, rn = 0.42 Ω, r2 = 0.68 Ω end-to-end. Step 3 cross-connection at the furthest socket = 0.27 Ω. Ze = 0.30 Ω. Compute Zs and check against A4:2026 Table 41.3 (Type B 32 A = 1.37 Ω).',
    options: [
      'Zs = 0.30 + 0.27 = 0.57 Ω. A4:2026 Table 41.3 Type B 32 A max Zs = 1.37 Ω; corrected limit (0.8 rule) = 1.10 Ω. 0.57 Ω is comfortably below 1.10 Ω → pass.',
      'Zs = 0.30 + 0.68 = 0.98 Ω, using the end-to-end r2 as R1+R2. Against the corrected limit of 1.10 Ω this passes, but only just.',
      'Zs = 0.27 Ω on its own, because the cross-connection reading already includes Ze. Against the full Table 41.3 limit of 1.37 Ω this passes comfortably.',
      'Zs = 0.30 + (0.40 + 0.68) = 1.38 Ω, adding Ze to r1 plus r2 end-to-end. This exceeds the 1.37 Ω limit, so the ring fails.',
    ],
    correctIndex: 0,
    explanation:
      'The Step 3 cross-connection reading at any socket on an intact ring IS the effective R1+R2 for that point in the circuit. Take the highest reading (worst case) = 0.27 Ω. Zs = Ze + R1+R2 = 0.30 + 0.27 = 0.57 Ω. Compare against the corrected Table 41.3 limit: 1.37 × 0.8 = 1.10 Ω. 0.57 < 1.10 → pass. Document Zs (calc) on the STR and verify by live Zs measurement in the live test sequence (Section 4).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why is the ring final test split into three steps rather than just measured end-to-end like a radial?',
    options: [
      'Because a ring uses larger conductors than a radial, so three separate readings are needed to confirm the line, neutral and CPC are each correctly sized for 32 A.',
      'Because a ring has parallel paths for current. A single end-to-end reading at the CU would not detect a broken ring (the unbroken half completes the loop and gives a sensible reading) and would not give you the per-socket R1+R2 needed for Zs verification across the ring.',
      'Because BS 7671 requires every socket on a ring to be tested individually for polarity, and the three steps are simply the polarity check repeated for line, neutral and CPC.',
      'Because a ring is protected by an RCD, and the three steps replicate the RCD trip-time test at three different test currents to confirm disconnection.',
    ],
    correctAnswer: 1,
    explanation:
      'A ring has two parallel paths from CU to itself. A simple reading at the CU could mask a break — if one half is severed, the other half still completes the circuit and gives a normal-looking value. Step 1 catches end-to-end breaks. Steps 2 and 3 catch breaks anywhere in the ring because they exploit the equidistant property: at every socket on an intact ring, the cross-connection reading is constant.',
  },
  {
    id: 2,
    question: 'Setting up Step 2 (L-N cross-connection) on a ring with both legs landed at the CU:',
    options: [
      'Link L of leg 1 to L of leg 2 at the CU, leaving the neutrals separate. Reading between the two joined lines and a neutral at each socket gives the L-N cross-connection result.',
      'Link both neutral legs together at the CU and measure between line and neutral at each socket. Joining the neutrals forces the test current around the full loop.',
      'Connect L of leg 1 (outgoing) to N of leg 2 (incoming) at the CU. The cross-connection forces measured current around the full loop in both directions when the meter is connected at any socket. Equivalent: link the line from one end of the ring to the neutral from the other.',
      'Leave both legs landed on the protective device and the neutral bar, and link line to neutral at the furthest socket instead of at the CU. The far-end link completes the cross-connection loop.',
    ],
    correctAnswer: 2,
    explanation:
      'Cross-connection: L of one leg to N of the other. A meter connected to the L and N terminals of any socket on the ring then sees a loop made of both halves of the ring in parallel. With the ring intact, every socket gives the same reading because every socket is at the same electrical midpoint of the loop.',
  },
  {
    id: 3,
    question: 'Expected reading on an intact ring during Step 2 if r1 = 0.30 Ω and rn = 0.32 Ω:',
    options: [
      'Approximately (r1 + rn) = 0.62 Ω at every socket, constant within a few percent. The cross-connection puts the two end-to-end resistances in series.',
      'Approximately (r1 + rn) ÷ 2 = 0.31 Ω at every socket, constant within a few percent. The two halves of the loop sit in series, halving the combined reading.',
      'Approximately r1 ≈ 0.30 Ω at the nearest socket, rising to rn ≈ 0.32 Ω at the furthest, because the reading tracks distance around the ring.',
      'Approximately (r1 + rn) ÷ 4 = 0.155 Ω at every socket, constant within a few percent. The divide-by-four comes from the parallel combination of two halves of the loop, each half being two quarters in series.',
    ],
    correctAnswer: 3,
    explanation:
      'In a properly connected ring, with the cross-connection as described, the L-N reading at any socket is the parallel combination of the two paths from the cross-connected L back to the cross-connected N. Loop length is the same regardless of where you stop — every socket is electrically equidistant. The reading is approximately (r1 + rn) ÷ 4, constant at every socket on an intact ring. Variation means a broken ring, a spur, or a wiring error.',
  },
  {
    id: 4,
    question: 'Why is r2 (CPC end-to-end) typically higher than r1 (line end-to-end) in a 2.5/1.5 mm² T&E ring?',
    options: [
      'Because the CPC in 2.5/1.5 T&E is 1.5 mm² while the line is 2.5 mm². Smaller csa = higher resistance per metre. 2.5 mm² Cu ≈ 7.41 mΩ/m; 1.5 mm² ≈ 12.10 mΩ/m. So r2 is roughly r1 × 1.63 for the same loop length.',
      'Because the CPC carries the full fault current while the line shares load between both legs, so the CPC heats up during the test and reads a higher resistance.',
      'Because the CPC follows a longer physical route than the line, looping out to every metal back-box before returning, which adds length and therefore resistance.',
      'Because the CPC is bare copper while the line is insulated, and bare copper oxidises, raising its resistance per metre above that of the insulated line conductor.',
    ],
    correctAnswer: 0,
    explanation:
      'In standard 2.5/1.5 mm² flat T&E, the CPC is one size smaller than the line and neutral. Resistance per metre at 20 °C: 2.5 mm² = 7.41 mΩ/m; 1.5 mm² = 12.10 mΩ/m. For a 32 m ring loop you would expect r1 ≈ rn ≈ 32 × 0.00741 = 0.24 Ω and r2 ≈ 32 × 0.01210 = 0.39 Ω. The ratio is the inverse of the csa ratio, slightly worse because of stranding factors.',
  },
  {
    id: 5,
    question: 'During Step 1 you measure end-to-end r1 of a ring. The reading is OL (open circuit). Most likely cause:',
    options: [
      'A normal result for Step 1 — the two line legs are deliberately separated at the CU, so an open-circuit reading between them is expected before the cross-connection is fitted.',
      'A break somewhere in the line conductor of the ring — a loose terminal in a back-box, a damaged cable inside a void, or a cable not actually returned to the CU. Investigate before going any further. Step 2 and Step 3 are meaningless until Step 1 readings are sensible.',
      'The test leads have not been nulled. An un-nulled lead resistance reads OL on the continuity range; null the leads and the true r1 will appear.',
      'A short circuit between line and neutral somewhere on the ring, which the meter displays as OL because the fault current bypasses the conductor under test.',
    ],
    correctAnswer: 1,
    explanation:
      'OL on Step 1 means there is no continuity end-to-end on whichever conductor you are testing — break in L if r1 is OL, break in N if rn is OL, break in CPC if r2 is OL. Stop, investigate. Common locations: the back-box of the last socket installed (where the loop was finished), any junction box in the cable run, the CU terminations themselves. Do not progress to Steps 2 or 3 until Step 1 readings are sensible.',
  },
  {
    id: 6,
    question: 'Are unfused spurs allowed off a ring final, and how do you detect them in testing?',
    options: [
      'Unfused spurs are not permitted at all — every spur must be taken through a fused connection unit. A spur is detected in Step 1 as an r1 reading lower than expected for the cable size.',
      'Up to two unfused spurs per outlet are permitted, each in cable one size smaller than the ring. They are detected in Step 2 as a socket reading roughly half the rest of the set.',
      'One unfused spur per outlet on the ring is permitted, with the spur cable matching the ring conductor size. Detected in Step 3 testing as a single socket reading higher than the rest of the constant set — the extra resistance is the round-trip length of the spur cable.',
      'Unlimited unfused spurs are permitted provided the total ring length stays under 100 m. They cannot be detected by testing and must instead be counted by visual inspection of the wiring.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 + IET On-Site Guide: one unfused spur per outlet on the ring, in cable sized to match the ring conductors (so 2.5/1.5 mm² T&E for a standard 32 A domestic ring). Spurs add load to a ring but are permitted in moderation. In testing they show up in Steps 2 and 3 as a single outlying high reading. Document spurs on the STR — note location and cable length so future inspections can verify nothing has been added.',
  },
  {
    id: 7,
    question: 'You have set up Step 3 (L-CPC cross-connection) and at one socket the reading is roughly half of every other socket reading. What does that suggest?',
    options: [
      'That socket is on an unfused spur — a spur always reads about half the ring value because the spur cable runs in parallel with the ring at that point.',
      'A broken ring between that socket and the next — the meter is reading only one leg, which halves the parallel value seen everywhere else.',
      'Nothing significant — a reading half the others is within the normal spread for the midpoint socket, which sits at the lowest point of the cross-connection curve.',
      'A bridged ring — L and CPC at that socket have been crossed at the back-box terminal.',
    ],
    correctAnswer: 3,
    explanation:
      'Half-the-expected reading typically indicates the L and CPC at that socket have been crossed — the meter is reading a different parallel-path combination because two conductors have been swapped at the back-box terminal. Re-check the terminations at that specific socket. Worth confirming the cross-connection at the CU is correct first — many "half-reading" diagnoses turn out to be operator error at the consumer unit end.',
  },
  {
    id: 8,
    question: 'You have completed all three steps successfully. Final step before energising:',
    options: [
      'Remove the cross-connection at the CU, re-land the line and neutral conductors into their correct terminals on the protective device, double-check polarity by visual inspection of the terminations, then proceed to insulation resistance testing (Sub 4) before energising.',
      'Leave the Step 3 L-CPC cross-connection in place so the ring stays proven, energise the circuit, then take a live Zs reading at the furthest socket to confirm the calculated value.',
      'Re-land only the line legs into the protective device and leave the neutral legs linked together at the bar, so the ring continues to share load evenly once energised.',
      'Fit the cross-connection permanently and label it at the CU, because the linked legs are what makes the circuit behave as a ring once it is back in service.',
    ],
    correctAnswer: 0,
    explanation:
      'After ring testing the cross-connection at the CU must be removed and the L and N terminations re-made into the protective device in their correct positions. Visual check: L into the L of the device, N into the neutral bar. Then continue with the dead-test sequence — insulation resistance (Sub 4), polarity (Sub 5), earth electrode (Sub 6 if TT) — before first energisation.',
  },
];

const faqs = [
  {
    question: 'What is the difference between r1 and R1?',
    answer:
      'Lowercase r1 = end-to-end resistance of the line conductor of the ring measured during Step 1 (with the ring open at the CU). Uppercase R1 = the in-service line conductor resistance used in the R1+R2 calc for Zs — derived from the Step 3 cross-connection reading. Same for rn versus the in-service values. Convention: lowercase letters refer to end-to-end measurements with the ring open, uppercase to the in-service installed values used in Zs maths.',
  },
  {
    question: 'Why is the cross-connection reading constant at every socket on an intact ring?',
    answer:
      'Because the ring topology means at any socket the meter sees two parallel paths from the cross-connected L back to the cross-connected N (or CPC). The total length of those two parallel paths is always the full ring loop, regardless of where you stop on it. Mathematically: at a point that is x metres from one CU termination and (L−x) from the other, the parallel combination is x(L−x)/L — maximum at x = L/2 (the midpoint, giving L/4) and tapering to zero at each end. For practical purposes the variation is small enough across the inner 80 % of the ring that readings should be constant within a few percent.',
  },
  {
    question: 'My readings vary by 0.02-0.03 Ω from socket to socket — is that acceptable?',
    answer:
      'Yes — small variations of a few percent are normal. They reflect the slightly different positions of each socket on the ring (the curve is not perfectly flat) plus the resistance of the socket terminations themselves. What you are looking for is a single outlier that breaks the pattern: one socket reading 50 % higher (a spur), one socket reading half (a wiring swap), or progressive increase from one end to the other (a broken ring with the meter reading only one half of the loop).',
  },
  {
    question: 'Can I take a single R1+R2 reading at the CU and call it done?',
    answer:
      'No. A single R1+R2 reading at the CU with the ring as installed (no cross-connection, no opening) reads the loop in parallel — but it would not detect a broken ring (the unbroken half completes the loop) and is not what BS 7671 Reg 643.2.1(b) requires. The regulation explicitly requires the live conductors of a ring final to be continuity-tested. The 3-step method is the IET-published technique. Skipping it leaves you signing off circuits that may have a broken ring (working as a long radial), which is non-compliant and will degrade as the cable warms in service.',
  },
  {
    question: 'How does ring testing interact with insulation resistance testing?',
    answer:
      'Order matters. Continuity (this Sub) before insulation resistance (Sub 4). For ring final IR, you can usually test L, N and CPC of the ring as a single circuit (combined L+N to CPC, or all three combinations separately). The ring being a ring is irrelevant to the IR test — what matters is that you have proven continuity of all three conductors first, so any subsequent IR fault can be localised correctly.',
  },
  {
    question: 'What if the ring fails Step 2 — readings are not constant?',
    answer:
      'Stop and investigate. Most likely causes: (a) a broken ring — one half of the loop is open at a back-box termination, junction box or behind a kitchen unit; readings will progressively change along the ring. (b) A spur connected wrongly — readings constant except at one socket. (c) A back-box termination where L and N have been swapped — half-reading at one socket. (d) The cross-connection at the CU was set up incorrectly. Before tearing the wall apart, double-check the cross-connection itself — many "broken ring" diagnoses turn out to be operator error at the consumer unit.',
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
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 5 · Section 3 · Subsection 3"
            title="Ring final continuity — the 3-step test"
            description="The IET method for satisfying Reg 643.2.1(b). End-to-end r1, rn, r2 with the ring open. Then L-N and L-CPC cross-connections at every socket. Spot broken rings, spurs, wiring errors from the pattern of readings."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS 7671 Reg 643.2.1(b) requires continuity testing of the live conductors of every ring final. The IET-published method is the 3-step test.',
              'Step 1: end-to-end r1, rn, r2 with ring open at CU. Step 2: L-N cross-connection, read at every socket. Step 3: L-CPC cross-connection, read at every socket.',
              'On an intact ring, cross-connection readings are constant at every socket within a few percent. A constant set with one outlier higher = spur. Half-reading = wires swapped. Progressive change = broken ring.',
              'The Step 3 reading at any socket IS the R1+R2 for the Zs calc. Combine with Ze, check against A4:2026 Table 41.3 (B32 = 1.37 Ω) using the 0.8 rule.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Disconnect a ring final at the CU and set up the 3-step test correctly.',
              'Measure end-to-end r1, rn and r2 with the ring open and recognise sensible values for typical T&E sizes.',
              'Set up the L-N cross-connection (Step 2) and read every socket — recognise constant readings as proof of an intact ring on L and N.',
              'Set up the L-CPC cross-connection (Step 3) and derive R1+R2 for the Zs calc.',
              'Diagnose broken rings, unauthorised spurs and cross-wired sockets from the pattern of readings.',
              'Cite Reg 643.2.1 (continuity), Reg 433.1.5 (ring final design) and A4:2026 Table 41.3 (max Zs).',
              'Document ring test results on the Schedule of Test Results in the r1, rn, r2 and R1+R2 columns.',
            ]}
            initialVisibleCount={4}
          />

          <VideoCard
            url={videos.ringFinalTest.url}
            title={videos.ringFinalTest.title}
            channel={videos.ringFinalTest.channel}
            duration={videos.ringFinalTest.duration}
            topic="3-step ring final continuity test · Unit 304 LO5"
            caption="Craig Wiltshire takes the ring apart at the CU and walks the 3-step method end-to-end — the L/N/CPC end-to-end readings, the L-N cross-connection and the L-CPC cross-connection that gives R1+R2 for the Zs calc."
          />

          <ContentEyebrow>Why the 3-step test exists</ContentEyebrow>

          <ConceptBlock
            title="A ring is not just a long radial — parallel paths require parallel verification"
            plainEnglish="A ring final has two parallel paths from the CU back to itself. That parallel arrangement spreads the load and lowers the effective R1+R2 — but it also means a single end-to-end test cannot prove the ring is actually continuous in both directions."
            onSite="Picture a 32 A ring with one leg disconnected at the CU. The first leg works fine as a long radial. A casual R1+R2 from the CU sees current go out one leg and never returns by the other — but the meter still reads a value because the loop closes via the linked conductors at the far end. You would never know the ring was broken without the 3-step method."
          >
            <p>
              The ring final is the UK domestic standard for socket circuits — two cables leave
              the CU at a single 32 A protective device, run in a loop through every socket, and
              return to the same protective device. The two paths share the load (each leg
              carrying roughly half the current under normal conditions), and the parallel
              arrangement gives a lower effective R1+R2 than an equivalent radial would.
            </p>
            <p>The 3-step test exists because that parallel topology requires special handling:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — end-to-end continuity.</strong> Disconnect both legs of the
                ring at the CU. Measure resistance of each conductor (L, N, CPC) end-to-end with
                the ring open. Confirms each conductor is continuous around the loop.
              </li>
              <li>
                <strong>Step 2 — L-N cross-connection.</strong> Connect L of one leg to N of the
                other at the CU. Read L-N at every socket. Constant readings prove the ring is
                intact on both L and N.
              </li>
              <li>
                <strong>Step 3 — L-CPC cross-connection.</strong> Connect L of one leg to CPC of
                the other. Read L-CPC at every socket. Constant readings prove the ring is
                intact on L and CPC. The reading also gives R1+R2 for the Zs calc.
              </li>
            </ol>
            <p>
              Each step independently catches different fault modes. Together they give complete
              assurance that the ring is wired correctly and the conductor sizes match what was
              installed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.2.1 (Continuity of conductors) — extract concerning ring final live conductors"
            clause="The continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of: (a) protective conductors, including protective bonding conductors; and (b) in the case of ring final circuits, live conductors."
            meaning={
              <>
                Sub-clause (b) is the regulation that mandates continuity testing of the live
                conductors (L and N) of a ring final, in addition to the CPC continuity required
                for any circuit under (a). The 3-step test (end-to-end plus two cross-connections)
                is the IET-published method that satisfies (b) for a ring final.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.2.1."
          />

          <SectionRule />

          <ContentEyebrow>Step 1 — end-to-end r1, rn, r2</ContentEyebrow>

          <ConceptBlock
            title="Open the ring at the CU and measure each conductor"
            plainEnglish="With the ring disconnected from the protective device, the two legs of L hang loose at the CU. Measure resistance between them — that is r1, the end-to-end resistance of the line conductor of the loop. Repeat for N (rn) and CPC (r2)."
            onSite="Verify safe isolation first. Lift both legs of L, both legs of N and both legs of CPC out of their respective terminals. Identify which two L ends belong to the ring (label or trace if not obvious). Test."
          >
            <p>Step-by-step Step 1:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Verify safe isolation per the JIB sequence (Sub 1).</li>
              <li>
                At the CU, disconnect both legs of the ring from the protective device terminal
                (L), the neutral bar (N) and the earth bar (CPC). You now have six free
                conductor ends: L1, L2, N1, N2, CPC1, CPC2.
              </li>
              <li>
                Connect MFT continuity leads to L1 and L2. Press TEST. Read r1 — the end-to-end
                resistance of the line conductor of the ring.
              </li>
              <li>Move to N1, N2. Read rn — the end-to-end neutral resistance.</li>
              <li>Move to CPC1, CPC2. Read r2 — the end-to-end CPC resistance.</li>
              <li>Record all three values.</li>
            </ol>
            <p>
              <strong>Sanity check the values.</strong> For 2.5/1.5 mm² T&E (the standard
              domestic ring cable), expected resistance per metre at 20 °C: 2.5 mm² ≈ 7.41 mΩ/m,
              1.5 mm² ≈ 12.10 mΩ/m. So for a typical 32 m ring loop:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>r1 ≈ 32 × 0.00741 ≈ 0.24 Ω</li>
              <li>rn ≈ 32 × 0.00741 ≈ 0.24 Ω (should match r1 within a few percent)</li>
              <li>r2 ≈ 32 × 0.01210 ≈ 0.39 Ω (about r1 × 1.63 because of the smaller CPC)</li>
            </ul>
            <p>
              Real-world readings include the resistance of every socket termination on the ring,
              so add 0.05-0.15 Ω to the cold-cable estimate. r1 around 0.30-0.45 Ω, rn similar,
              r2 around 0.50-0.70 Ω is a sensible range for a fresh domestic ring of typical
              length.
            </p>
            <p>
              <strong>Red flags:</strong> r1 differs from rn by more than ~10 %; r2 not
              consistent with the cable size; OL on any reading; values an order of magnitude
              off (suggests a wrong cable size has been installed somewhere on the ring).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Step 2 — L-N cross-connection</ContentEyebrow>

          <ConceptBlock
            title="The L-N cross-connection — proving the ring is a ring"
            plainEnglish="At the CU, link L of one leg to N of the other leg. Now go to every socket on the ring and measure resistance between L and N at the socket terminals. On an intact ring, the reading is constant at every socket."
            onSite="Use a sturdy short jumper at the CU — not a piece of floppy single-core. The jumper has to make a low-resistance connection or it adds error to every reading."
          >
            <p>Step-by-step Step 2:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                With the ring still disconnected from the protective device, take the line of leg
                1 (L1) and connect it to the neutral of leg 2 (N2) using a low-resistance jumper.
                The other ends — L2 and N1 — are the test terminals.
              </li>
              <li>
                At each socket on the ring in turn, remove the front plate and connect MFT
                continuity leads to the L and N terminals of the back-box wiring (or use a
                socket-test adapter that takes the readings via the front face).
              </li>
              <li>
                Press TEST. Note the reading. Move to the next socket. Repeat at every accessory
                on the ring.
              </li>
            </ol>
            <p>
              <strong>Expected reading on an intact ring:</strong> approximately (r1 + rn) ÷ 4 at
              every socket, constant within a few percent. For r1 = 0.24, rn = 0.24 → expected
              ≈ 0.12 Ω at every socket. (The divide-by-four comes from the parallel combination
              of two halves of the loop, each half being two quarters in series.)
            </p>
            <p>What the readings tell you:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Constant at every socket within a few %:</strong> intact ring, correctly
                wired on L and N. Pass.
              </li>
              <li>
                <strong>One socket reading roughly half the others:</strong> L and N have been
                swapped at that socket — the meter is seeing one path of the ring rather than
                the parallel combination.
              </li>
              <li>
                <strong>One socket reading roughly double the others:</strong> the socket is on
                a spur, not in the ring.
              </li>
              <li>
                <strong>Readings progressively increasing from near-end sockets to far-end:</strong>{' '}
                the ring is broken — you are reading a long radial path rather than the parallel
                ring.
              </li>
              <li>
                <strong>OL at a socket:</strong> open circuit at that socket — could be a missing
                terminal connection, a damaged conductor, or front plate disconnected.
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

          <ContentEyebrow>Step 3 — L-CPC cross-connection (gives R1+R2)</ContentEyebrow>

          <ConceptBlock
            title="The L-CPC cross-connection — proving the earth path and giving R1+R2"
            plainEnglish="Same idea as Step 2 but with CPC instead of N. Cross-connect L of one leg to CPC of the other. The reading at every socket is the effective R1+R2 for that point — and on an intact ring it should be constant at every socket."
            onSite="The number you get from this step is the one you put in the R1+R2 column on the schedule of test results, and the one you use in the Zs = Ze + (R1+R2) calculation."
          >
            <p>Step-by-step Step 3:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Remove the L-N jumper from Step 2. Set up the new cross-connection: L of leg 1
                to CPC of leg 2 with the same low-resistance jumper. Test terminals are L2 and
                CPC1.
              </li>
              <li>
                At each socket on the ring, connect MFT leads to the L and earth terminals.
              </li>
              <li>Press TEST. Note the reading. Repeat at every socket.</li>
            </ol>
            <p>
              <strong>Expected reading on an intact ring:</strong> approximately (r1 + r2) ÷ 4
              at every socket, constant within a few percent. For r1 = 0.24 Ω, r2 = 0.39 Ω →
              expected ≈ 0.16 Ω at every socket. Real-world numbers including terminations:
              0.20-0.28 Ω is a sensible range for a typical domestic kitchen ring of 32 m.
            </p>
            <p>
              <strong>This reading IS the R1+R2 for the circuit at that point.</strong> Combine
              with Ze to get Zs:
            </p>
            <p className="font-mono text-[14px] text-emerald-300">
              Zs = Ze + (R1 + R2)
            </p>
            <p>
              For Ze = 0.30 Ω (typical TN-C-S), R1+R2 = 0.22 Ω → Zs = 0.52 Ω. Compare against
              A4:2026 Table 41.3 for the device protecting the circuit. For Type B 32 A: max
              Zs = 1.37 Ω, corrected measured limit = 1.37 × 0.8 = 1.10 Ω. 0.52 Ω is comfortably
              below 1.10 Ω → pass.
            </p>
            <p>
              Document the highest reading on the ring (usually the furthest electrically) as the
              R1+R2 for the circuit on the STR.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.5 (Ring final circuit arrangement, paraphrased) and Appendix 15"
            clause="A ring final circuit shall be arranged so that the line, neutral and protective conductors form a complete loop returning to the protective device. Conductors shall be of the same cross-sectional area throughout the ring. The protective device shall have a rated current not exceeding 32 A. Where socket-outlets to BS 1363 are installed, additional protection by an RCD with rated residual operating current not exceeding 30 mA shall be provided in accordance with Regulation 411.3.3. The integrity of the ring shall be verified by continuity testing in accordance with Regulation 643.2.1."
            meaning={
              <>
                A4:2026 reaffirms the ring final design rules and explicitly cross-references the
                continuity testing requirement of Reg 643.2.1. The 3-step test is the IET method
                for proving the integrity of the ring as required by this regulation. Note also:
                same conductor size throughout the ring — a ring with a thinner section spliced in
                (a common defect on older installations that have been altered) is non-compliant
                and would show up in your readings as r1 not equal to rn or as a non-constant cross-connection.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 433.1.5 + Appendix 15 — paraphrased synthesis."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading patterns and what they mean</ContentEyebrow>

          <ConceptBlock
            title="Diagnosing from the pattern of readings"
            plainEnglish="An intact ring gives constant cross-connection readings. Outliers and trends point to specific defects. Train your eye and ring testing becomes much faster — the pattern usually narrows the fault to a single accessory or a defined section of the loop."
            onSite="Sketch the ring on the back of the schedule, mark each socket position. Plot the reading at each socket. The shape of the plot tells you the fault."
          >
            <p>The four classic ring fault patterns and how to spot them:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Broken ring (one leg open).</strong> Cross-connection reading at sockets
                near one end of the ring is low; readings climb progressively as you move along
                the ring; reading at sockets near the broken end is high. The meter is
                effectively reading a long radial in one direction. Trace the readings to find
                the break point — the reading typically jumps sharply at the broken accessory.
              </li>
              <li>
                <strong>Unauthorised spur tapped into the ring.</strong> Constant ring readings
                at most sockets, plus one or more outlying sockets reading higher. The extra
                resistance is the round-trip length of the spur cable. Worth investigating
                whether the spur is properly fused (one unfused spur per outlet on the ring is
                permitted; an unfused multiple spur is non-compliant).
              </li>
              <li>
                <strong>Bridged ring (sockets cross-wired between L and N or L and CPC at one
                accessory).</strong> Most sockets read constant; one socket reads roughly HALF
                the others. The meter is seeing a different parallel-path combination at that
                socket because two conductors have been swapped at the back-box terminal. Always
                investigate the wiring at that specific socket.
              </li>
              <li>
                <strong>OL at every socket on the cross-connection.</strong> Almost certainly the
                cross-connection jumper at the CU is loose or not connected. Re-make the jumper,
                retest. If still OL, suspect a major break in the loop — but check the CU first.
              </li>
            </ul>
            <p>
              The pattern is the diagnostic. Single outlying high reading = spur. Single half
              reading = bridged accessory. Progressive change = broken ring. All-OL = jumper
              issue. Train your eye on these patterns.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="Sanity-checking r1, rn, r2 — verifying cable size from end-to-end resistance"
            plainEnglish="The Step 1 readings tell you more than continuity. The absolute value of r1 verifies the cable size matches the design; the r1-versus-rn match verifies both line and neutral are the same csa; the r2-to-r1 ratio verifies the CPC csa. On an existing ring you've taken over, this is your first chance to spot a non-compliant alteration — a 1.5 mm² section spliced into a 2.5 mm² ring."
            onSite="A circuit drawing says 2.5/1.5 T&E throughout. r1 reads 0.45 Ω on a measured route length of 28 m. Expected: 28 × 7.41 mΩ/m = 0.21 Ω. The reading is more than double — either the route is longer than drawn or someone has spliced a smaller cable in. Walk the loop, check every JB, look behind the kitchen units."
          >
            <p>
              Use GN3 Table B1 to back-calculate cable size from r1 / rn / r2 readings. Resistance per metre at 20 °C for common Cu csa:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1.0 mm²</strong> ≈ 18.10 mΩ/m</li>
              <li><strong>1.5 mm²</strong> ≈ 12.10 mΩ/m</li>
              <li><strong>2.5 mm²</strong> ≈ 7.41 mΩ/m</li>
              <li><strong>4.0 mm²</strong> ≈ 4.61 mΩ/m</li>
              <li><strong>6.0 mm²</strong> ≈ 3.08 mΩ/m</li>
              <li><strong>10 mm²</strong> ≈ 1.83 mΩ/m</li>
            </ul>
            <p>
              Three sanity checks every time:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>r1 ≈ rn within 5-10 %.</strong> Both line and neutral are the same csa in T&E — if they differ by 20 %+, someone has spliced different cables together or there's a poor termination on one of them.
              </li>
              <li>
                <strong>r2 / r1 ratio matches the cable type.</strong> 2.5/1.5 T&E gives r2 ≈ 1.63 × r1. 4/1.5 T&E gives r2 ≈ 2.62 × r1 (much higher because the CPC is much smaller relative to the line). 6/2.5 T&E gives r2 ≈ 1.50 × r1.
              </li>
              <li>
                <strong>Absolute value matches measured route length.</strong> Walk the cable run with a tape if you can, or estimate from the floor plan. r1 / 0.00741 (for 2.5 mm² Cu) gives the loop length in metres at 20 °C.
              </li>
            </ul>
            <p>
              An r2 that's substantially higher than r1 × 1.63 on supposed 2.5/1.5 T&E suggests a 1.0 mm² CPC has been spliced into the ring at some point — non-compliant per Reg 433.1.5 (same csa throughout) and a finding to investigate before progressing past Step 1.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Permitted spurs vs unauthorised additions — what BS 7671 actually allows"
            plainEnglish="A ring can have spurs. BS 7671 plus the IET On-Site Guide say one unfused spur per outlet on the ring, with the spur cable matching the ring conductor csa. The spur supplies one single accessory (one twin socket counts as one accessory). Anything more — fused spur for multiple outlets, or unfused spur feeding two sockets — needs separate justification."
            onSite="On Step 3 you'll spot spurs as outliers — one socket reading higher than the rest. Document each spur on the Schedule of Test Results with location and approximate cable length. If you find a spur feeding two sockets without a fused connection unit, that's a finding to discuss with the duty-holder."
          >
            <p>
              The On-Site Guide (and Appendix 15 of BS 7671) sets out the rules for a 32 A standard ring final on 2.5/1.5 mm² T&E in domestic premises:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Floor area ≤ 100 m²</strong> per ring (typical domestic).
              </li>
              <li>
                <strong>One unfused spur per outlet</strong> on the ring. The spur cable matches the ring (2.5/1.5 mm² T&E for a standard 32 A ring). The spur supplies ONE accessory — one twin socket, or one fused connection unit feeding multiple outlets via a 13 A fuse.
              </li>
              <li>
                <strong>Fused spurs</strong> via a fused connection unit (13 A BS 1362 fuse) are unlimited in number and can feed multiple outlets downstream of the FCU. The fuse limits the current the spur can draw.
              </li>
              <li>
                <strong>Total spur load</strong> should not exceed the load that would have been on the ring had the spurred accessories been on it instead.
              </li>
            </ul>
            <p>
              Detecting spurs from Step 3 readings (L-CPC cross-connection, intact ring readings constant ≈ 0.20 Ω):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>One outlier reading + ~0.10 Ω</strong> = ~5 m unfused spur of 2.5/1.5 T&E.
              </li>
              <li>
                <strong>Outlier + ~0.20 Ω</strong> = ~10 m unfused spur — long but still permitted if a single accessory.
              </li>
              <li>
                <strong>Multiple outliers from one cluster</strong> = a fused connection unit feeding several sockets via 1.5/1.0 mm² cable. Trace the FCU; it should be on the ring proper, with the load behind the fuse.
              </li>
            </ul>
            <p>
              Document spurs on the Schedule of Test Results: socket reference, type (fused / unfused), approximate cable length, accessory count. Future inspectors compare against your record to spot unauthorised additions.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Two-test versus 3-step ring testing — what the inspector wants to see"
            plainEnglish="The full 3-step method (end-to-end r1/rn/r2, then L-N cross-connection at every socket, then L-CPC cross-connection at every socket) is the IET-published method that satisfies Reg 643.2.1(b). Shortcut methods exist on site but won't pass an audit."
            onSite="On a periodic inspection you might shortcut to just the end-to-end and L-CPC cross-connection — but on a NEW install the full 3-step is non-negotiable for sign-off."
          >
            <p>The full 3-step method — what the inspector and the IET model STR expect:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — end-to-end r1, rn, r2.</strong> Three readings (one per
                conductor) with the ring open at the CU. Confirms each conductor is continuous
                around the loop and gives sensible expected values.
              </li>
              <li>
                <strong>Step 2 — L-N cross-connection at every socket.</strong> Confirms the ring
                is intact on L and N. Spot wiring errors that would not show up in Step 1 alone.
              </li>
              <li>
                <strong>Step 3 — L-CPC cross-connection at every socket.</strong> Confirms the
                ring is intact on L and CPC and gives the R1+R2 value used in the Zs calc.
              </li>
            </ol>
            <p>Common shortcuts and why they don't pass:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>"Just take a single R1+R2 at the CU."</strong> Reads the loop in
                parallel — would not detect a broken ring (the unbroken half completes the loop)
                and gives no socket-by-socket diagnostic. Non-compliant for Reg 643.2.1(b).
              </li>
              <li>
                <strong>"End-to-end only, skip the cross-connections."</strong> Confirms each
                conductor is continuous but gives no proof the ring is actually wired as a ring
                — could be a long radial that happens to terminate back at the CU. Spurs and
                bridges go undetected.
              </li>
              <li>
                <strong>"Cross-connections at one or two sockets, not all of them."</strong>{' '}
                Misses spurs at unsampled sockets. The cost of testing every socket is small —
                30-60 seconds per socket — and the diagnostic value is high.
              </li>
            </ul>
            <p>
              On the STR you record r1, rn, r2 from Step 1 and the highest cross-connection
              reading (typically from Step 3) as R1+R2 for the circuit. Showing all three
              end-to-end readings plus a representative cross-connection range demonstrates the
              full method was followed.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Forgetting to disconnect the ring from the protective device before testing"
            whatHappens={
              <>
                You leave both legs of the ring landed in the 32 A RCBO and start Step 1. Your
                meter sees the resistance of the ring conductor in parallel with all the other
                circuits in the consumer unit (because they share the neutral and earth bars).
                The reading comes in lower than the actual cable resistance — sometimes near-zero
                on a short ring. You write it down as a pass and move on. The ring could have a
                hidden broken leg and you would never catch it.
              </>
            }
            doInstead={
              <>
                Always disconnect the ring at the CU before testing. Both legs of L lifted out
                of the protective device, both legs of N lifted out of the neutral bar, both legs
                of CPC lifted out of the earth bar. Six free ends. Then test. After the test,
                re-land each conductor into its correct terminal — and double-check the line
                goes back into the protective device, not the neutral bar.
              </>
            }
          />

          <Scenario
            title="3-step test on a freshly installed kitchen ring — Fluke 1664FC"
            situation={
              <>
                Kitchen ring final, T&E 2.5/1.5 mm², measured route length around the loop
                approximately 32 m, eight twin sockets at intervals around the kitchen perimeter.
                32 A Type B RCBO at the CU. TN-C-S supply with measured Ze = 0.30 Ω. You complete
                the 3-step test on a Fluke 1664FC.
                <br />
                <br />
                <strong>Step 1:</strong> r1 = 0.36 Ω, rn = 0.38 Ω, r2 = 0.61 Ω. <br />
                <strong>Step 2 (L-N):</strong> readings at all eight sockets between 0.18 and 0.21 Ω. <br />
                <strong>Step 3 (L-CPC):</strong> readings at all eight sockets between 0.22 and 0.25 Ω.
              </>
            }
            whatToDo={
              <>
                Sanity-check Step 1: r1 ≈ rn (within 6 %, fine), r2 ≈ r1 × 1.7 (close to the
                expected 1.63 ratio for 2.5/1.5 T&E), absolute values consistent with 32 m of
                cable plus terminations — pass. Step 2 readings constant within ±10 % across all
                eight sockets — intact ring on L and N. Step 3 readings constant within ±15 %
                across all eight sockets — intact ring on L and CPC. Take the highest Step 3
                reading (0.25 Ω) as the R1+R2 for the circuit. Compute Zs = Ze + R1+R2 = 0.30 +
                0.25 = 0.55 Ω. A4:2026 Table 41.3 max Zs for Type B 32 A = 1.37 Ω; corrected
                measured limit = 1.37 × 0.8 = 1.10 Ω. 0.55 Ω is comfortably below 1.10 Ω → pass.
                Record on the STR: r1 = 0.36, rn = 0.38, r2 = 0.61, R1+R2 (highest) = 0.25, Zs
                (calc) = 0.55. Re-make all CU terminations and proceed to insulation resistance
                testing (Sub 4).
              </>
            }
            whyItMatters={
              <>
                Every reading agrees with first-principles calculation, every cross-connection
                set is constant, and the headroom on Zs is generous. This is what a properly
                installed ring should look like on the test schedule. Compare the same circuit
                with one socket reading 0.45 Ω in Step 3 (while the others are at 0.25) — that
                single outlier would tell you that socket is on a spur, the spur cable has 0.20 Ω
                additional resistance (so roughly 11 m of additional 2.5 mm² cable), and you
                would document that spur on the STR with location and approximate length.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.3 (RCD fault protection condition)"
            clause={
              <>
                Where an RCD is used for fault protection, the following conditions shall be
                fulfilled: (a) the disconnection time shall be that required by Regulation
                411.3.2.2 or 411.3.2.4; and (b) Ra × IΔn ≤ 50 V where Ra is the sum of the
                resistances of the earth electrode and the protective conductor connecting it to
                the exposed-conductive-parts (in ohms) and IΔn is the rated residual operating
                current of the RCD.
              </>
            }
            meaning={
              <>
                Continuity of the protective conductor is not just a procedural test — the
                R1+R2 readings feed directly into the Ra × IΔn ≤ 50 V check that Regulation
                411.5.3 demands for RCD fault protection. A clean continuity reading is the
                input to a clean fault-protection calculation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 411.5.3 — full text from published amendment."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Reg 643.2.1(b) requires continuity testing of the live conductors of every ring final. The 3-step test is the IET-published method.',
              'Disconnect both legs of the ring at the CU before starting. Six free conductor ends — L1, L2, N1, N2, CPC1, CPC2 — let you set up Steps 1, 2 and 3 cleanly.',
              'Step 1 — end-to-end r1, rn, r2. Sanity check: r1 ≈ rn within a few %; r2 in the expected ratio to r1 for the cable type (1.63 for 2.5/1.5 T&E).',
              'Step 2 — L-N cross-connection at the CU, read L-N at every socket. Constant readings prove an intact ring on L and N.',
              'Step 3 — L-CPC cross-connection at the CU, read L-CPC at every socket. Constant readings prove an intact ring on L and CPC. The reading IS the R1+R2 for the circuit.',
              'A constant set with one outlier higher = spur. Half-readings = wires swapped at that socket. Progressive increase = broken ring. OL at one socket = open termination there.',
              'After testing: remove cross-connection jumpers, re-land conductors into correct terminals at the CU, double-check polarity by visual inspection, then proceed to insulation resistance (Sub 4).',
              'Compute Zs = Ze + R1+R2. Compare to A4:2026 Table 41.3 (Type B 32 A = 1.37 Ω) using the 0.8 multiplier. Document highest R1+R2 on the ring as the circuit value on the STR.',
            ]}
          />

          <Quiz title="Ring final 3-step test — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.2 Continuity R1+R2 / R2-only
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Insulation resistance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
