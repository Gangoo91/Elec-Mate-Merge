/**
 * Module 4 · Section 6 · Sub 2 — Test ring final circuit
 * Maps to City & Guilds 2365-02 / Unit 204 / LO6 / AC 6.2
 *   AC 6.2 — "Test ring final circuit"
 *
 * Frame: the three-part test that proves a ring is actually a ring.
 *  1. End-to-end continuity of L (r1), N (rn), CPC (r2) with the ring open.
 *  2. Cross-connect L1 of one leg to N of the other; read L1-N at every
 *     socket — should be approximately constant ≈ (r1 + rn) / 4.
 *  3. Cross-connect L1 of one leg to CPC of the other; read L1-CPC at every
 *     socket — should be approximately constant ≈ (R1 + R2) / 4. This R1+R2
 *     is what feeds your Zs calc against Table 41.3 (A4:2026 — B32 = 1.37 Ω).
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

const TITLE = 'Test ring final circuit | Level 2 Module 4.6.2 | Elec-Mate';
const DESCRIPTION =
  'The three-part ring final test per BS 7671 Reg 643.2.1 — end-to-end r1/rn/r2, cross-connection L-N, cross-connection L-CPC — and how to spot broken rings, spurs and cross-wired sockets from the readings.';

const checks = [
  {
    id: 'm4-s6-sub2-three-parts',
    question: 'The three-part ring final test verifies, in order:',
    options: [
      'A two-pole GS38-compliant voltage indicator (e.g. Martindale VI-13800, Kewtech KEWPROVE) — purpose-designed for safe isolation.',
      'Honestly communicate genuine constraints: "My next available start is 6 weeks out, but I could fit you in sooner if we confirm by Friday"',
      'It should include the organisation\\\\\\\\\\\\\\\'s position, rules, support available, testing procedures (if applicable), and consequences of policy breaches',
      '(1) End-to-end continuity of L, N and CPC with the ring open. (2) L-N cross-connection reading at every socket. (3) L-CPC cross-connection reading at every socket.',
    ],
    correctIndex: 3,
    explanation:
      'The classic three-part test from BS 7671 Reg 643.2.1(b) and IET GN3. Part 1 confirms each conductor is continuous around the loop end-to-end. Part 2 (L-N cross-connection) confirms the ring is actually a ring on L and N — readings should be constant at every socket. Part 3 (L-CPC cross-connection) gives you the R1+R2 value used for Zs calcs.',
  },
  {
    id: 'm4-s6-sub2-cross-connect-reading',
    question:
      'On a kitchen ring final you have measured r1 = 0.62 Ω end-to-end. With the cross-connection set up correctly (outgoing L of one leg to incoming N of the other), what L-N reading should you expect at every socket if the ring is intact?',
    options: [
      'It minimises diagnostic time by eliminating possible causes logically rather than randomly',
      'Provide clear, written task lists with visual instructions, give advance notice of any changes, and maintain consistent routines where possible',
      'Approximately (r1 + rn) ÷ 4 — i.e. roughly 0.31 Ω if r1 ≈ rn — and constant at every socket within a few percent.',
      'Asbestos fibres may be released into the surrounding air, creating an inhalation hazard',
    ],
    correctIndex: 2,
    explanation:
      'In a properly connected ring, with the cross-connection as described, the L-N reading at any socket is the parallel combination of the two paths from CU outgoing L1 around to that socket and back via the cross-connected N. The loop length is the same regardless of where you stop on the ring — every socket is electrically equidistant. The reading is approximately (r1+rn) ÷ 4 (the divide-by-four comes from two parallel halves each made of two series quarters). Variation between sockets means a broken ring, a spur, or a wiring error.',
  },
  {
    id: 'm4-s6-sub2-spur-detection',
    question:
      'During Part 3 (L-CPC cross-connection) you take readings at every socket on a ring. Eleven sockets read between 0.18 and 0.20 Ω — constant. The twelfth socket reads 0.34 Ω. What does that tell you?',
    options: [
      'Yes — touch voltage = 250 × 0.1 = 25 V, comfortably below the 50 V limit. The install passes Reg 411.5. However, RA = 250 Ω is high; consider improving the electrode (longer rod, multiple rods, deeper install) for resilience to soil drying.',
      'The operative must stop work, descend the tower and report the defect — the mechanism must be repaired or replaced before assembly continues',
      'Socket 12 is on a spur off the ring (or someone has bridged the ring into a radial), and you are reading the additional length of the spur cable in series with the ring midpoint reading.',
      'Systematic monitoring of workers\\\' health through questionnaires, physical checks, or clinical examinations to detect early signs of MSDs, required where the risk assessment identifies a residual risk of MSDs',
    ],
    correctIndex: 2,
    explanation:
      'A constant set of readings with one outlier consistently higher = a spur. The extra resistance (0.34 - 0.19 ≈ 0.15 Ω) is the round-trip length of the spur cable from the ring tap to the spurred socket. Spurs are allowed (one unfused spur per outlet on the ring, sized to match), but they should be documented and the additional R1+R2 noted. If the reading were lower than the ring midpoint, that would indicate the socket is wired into the ring loop directly (which is fine but means it is not really a spur).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why is the ring final test split into three parts rather than just measured end-to-end like a radial?',
    options: [
      'ASHP delivers 3–4 kWh of heat per 1 kWh electrical input (high efficiency) but works best in well-insulated dwellings with low flow temperatures (~45 °C); a poorly insulated house with high-temperature radiators can negate the running-cost advantage',
      'Because a ring final has parallel paths for current — a single end-to-end reading at the CU would not detect a broken ring (current would still flow via the unbroken half) and would not give you the per-socket R1+R2 needed for Zs verification.',
      'Part S (Infrastructure for charging electric vehicles) requires new non-residential buildings with 10+ parking spaces to provide 1 EV charge point and cable routes for 1 in 5 spaces',
      'Contact the EPAO and training provider immediately — most EPAOs allow rescheduling within reasonable timeframes for legitimate reasons, but the gateway does not need to be re-opened',
    ],
    correctAnswer: 1,
    explanation:
      'The three-part test exists because a ring has two parallel paths. A simple reading at the CU could mask a break — if one half of the ring is severed, the other half still completes the circuit and a casual end-to-end reading would look normal. Part 1 catches end-to-end breaks. Parts 2 and 3 catch breaks anywhere in the ring because they exploit the equidistant property: at every socket on an intact ring, the reading is constant.',
  },
  {
    id: 2,
    question: 'Setting up Part 2 (L-N cross-connection) on a ring with both legs landed at the CU:',
    options: [
      'On-site inspection of recent installations chosen by the scheme assessor, review of certification produced by the contractor, verification of test instrument calibration, and verification that the contractor\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s competent person remains competent.',
      'A state of well-being in which every individual realises their own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to their community',
      'Connect L of leg 1 (outgoing) to N of leg 2 (incoming) at the CU. Equivalently: cross-connect the line from one end of the ring to the neutral from the other end. The cross-connection forces current around the full loop in both directions when measured at any socket.',
      'The rated breaking capacity (Icn for MCBs, Icu for MCCBs) shall be at least equal to the prospective fault current at the device, unless backup protection by an upstream device limits the let-through energy to within the device\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s rating (cascade protection).',
    ],
    correctAnswer: 2,
    explanation:
      'Cross-connection: L of one leg to N of the other. This means a meter connected to the L and N terminals of any socket on the ring sees a loop made of both halves of the ring in parallel. With the ring intact, every socket gives the same reading because every socket is at the same electrical midpoint of the loop.',
  },
  {
    id: 3,
    question: 'A 32 A Type B ring final has been tested. Part 1: r1 = 0.60 Ω, rn = 0.62 Ω, r2 = 1.05 Ω end-to-end. Part 3 cross-connection reading at the furthest socket = 0.41 Ω. Ze = 0.30 Ω. Compute Zs and decide pass/fail against A4:2026 Table 41.3.',
    options: [
      'In controlled document systems with version control and access records',
      'Any defect that prevents a circuit from functioning safely or correctly',
      'When a solar system continues to power a circuit that has been disconnected from the grid',
      'Zs = 0.71 Ω. Pass — comfortably below the corrected limit of 1.37 × 0.8 = 1.10 Ω for Type B 32 A.',
    ],
    correctAnswer: 3,
    explanation:
      'The cross-connection L-CPC reading at any socket on an intact ring ≈ (R1+R2) of one quarter of the loop = the effective R1+R2 for that point in the circuit. Here it is 0.41 Ω. Zs = Ze + (R1+R2) = 0.30 + 0.41 = 0.71 Ω. Corrected Table 41.3 limit for Type B 32 A = 1.37 × 0.8 = 1.10 Ω. 0.71 ≤ 1.10 → comfortably compliant.',
  },
  {
    id: 4,
    question: 'Why is r2 (CPC end-to-end) higher than r1 (line end-to-end) in a 2.5/1.5 mm² T&E ring?',
    options: [
      'Because the CPC in 2.5/1.5 T&E is 1.5 mm² while the line is 2.5 mm². Smaller cross-section means higher resistance per metre. Typical: 2.5 mm² ≈ 7.41 mΩ/m, 1.5 mm² ≈ 12.10 mΩ/m. So r2 is roughly r1 × 1.63.',
      'Use assessment evidence to demonstrate the gap \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2014 set a task that reveals the limit of their competence, and have a factual conversation about the specific risks',
      'All work equipment (including power tools) is suitable for its intended use, maintained in a safe condition, inspected at suitable intervals, and used only by trained and competent persons',
      'Ensure the modification complies with the original design verification, update documentation, and verify that thermal management and short-circuit ratings are not compromised',
    ],
    correctAnswer: 0,
    explanation:
      'In standard 2.5/1.5 mm² flat T&E, the CPC is one size smaller than the line and neutral. Resistance per metre at 20 °C: 2.5 mm² ≈ 7.41 mΩ/m, 1.5 mm² ≈ 12.10 mΩ/m. So for a 28 m loop you would expect r1 ≈ rn ≈ 28 × 0.00741 = 0.21 Ω and r2 ≈ 28 × 0.01210 = 0.34 Ω. The ratio is the cross-section ratio inverted (and slightly worse because of stranding factors).',
  },
  {
    id: 5,
    question: 'During Part 1 you measure the end-to-end r1 of a ring. The reading is OL (open circuit). Most likely cause:',
    options: [
      'The generator output voltage and frequency (confirming the generator has started and reached stable output), then the ATS control circuit, transfer contactor coils, interlock mechanism and control wiring for faults',
      'A break somewhere in the line conductor of the ring — a loose terminal in a back-box, a damaged cable inside a void, or a cable not actually returned to the CU. Investigate before going any further.',
      'Trips within the required time when a fault current of the rated sensitivity (e.g., 30 mA) is applied — tests at 50%, 100% and 500% (5x) of the rated residual current, plus ramp tests',
      'Provide specific, verifiable evidence of your competence and demonstrate that you understand acceptable parameters and can interpret results correctly',
    ],
    correctAnswer: 1,
    explanation:
      'OL on Part 1 means there is no continuity end-to-end on whichever conductor you are testing — break in L if r1 is OL, break in N if rn is OL, break in CPC if r2 is OL. Stop, investigate. Common locations: the back-box of the last socket installed (where the loop was finished), any junction box in the cable run, the CU terminations themselves. Do not progress to Parts 2 or 3 until Part 1 readings are sensible.',
  },
  {
    id: 6,
    question: 'Are unfused spurs allowed off a ring final, and how do you detect them in testing?',
    options: [
      'Operating manuals, maintenance instructions, inspection and testing schedule, schematic diagrams, manufacturer instructions for installed equipment, and the means to identify circuits — sufficient to enable safe operation, maintenance, and future inspection.',
      'Pacesetting and commanding — pacesetting creates anxiety through unrealistic expectations when overused, and commanding creates fear through coercive demands. Both have narrow appropriate applications but are destructive as default styles',
      'One unfused spur per outlet on the ring is permitted, with the spur cable matching the ring conductor size. Detected in Part 3 testing as a single socket reading higher than the rest of the constant set — the extra resistance is the round-trip length of the spur cable.',
      'Remove the cross-connection at the CU, re-land the line and neutral conductors into their correct terminals on the protective device, double-check polarity by visual inspection of the terminations, then proceed to insulation resistance testing (Sub 3) before energising.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 + IET On-Site Guide: one unfused spur per outlet on the ring, in cable sized to match the ring conductors (so 2.5/1.5 mm² T&E for a standard 32 A domestic ring). Spurs add to load on a ring but are permitted in moderation. In testing they show up in Parts 2 and 3 as a single outlying high reading. Document spurs on the schedule of test results — note location and cable length so future inspections can verify nothing has been added.',
  },
  {
    id: 7,
    question: 'You have set up Part 3 (L-CPC cross-connection) and at one socket the reading is roughly half of what every other socket reads. What does that suggest?',
    options: [
      'It sets requirements for the conservation of fuel and power in buildings, including energy efficiency standards for heating, lighting, and insulation',
      'The total number of outstanding (uncompleted) maintenance work orders, which indicates whether the maintenance team has sufficient resources to keep up with demand',
      'To plan, manage, and coordinate health and safety during the pre-construction phase, including identifying and eliminating or controlling foreseeable risks',
      'A bridged ring — the socket is connected on the L side via one path and on the CPC side via the other path, but the wiring of L and CPC at that socket has been swapped.',
    ],
    correctAnswer: 3,
    explanation:
      'Half-the-expected reading typically indicates the L and CPC at that socket have been crossed — the meter is reading a different parallel-path combination. Re-check the terminations at that socket. Also worth checking on a ring with mixed installer history: someone has wired a socket in non-standard fashion. Always make the cross-connection at the CU end yourself before testing — never trust a ring whose cross-connection was made by someone else.',
  },
  {
    id: 8,
    question: 'You have completed all three parts of the ring test successfully. Final step before energising:',
    options: [
      'Remove the cross-connection at the CU, re-land the line and neutral conductors into their correct terminals on the protective device, double-check polarity by visual inspection of the terminations, then proceed to insulation resistance testing (Sub 3) before energising.',
      'Plan (analyse data, identify improvements, define actions), Do (implement the improvement), Check (measure the results — did MTBF improve? Did failures reduce?), Act (standardise successful improvements and address any remaining gaps) — then repeat',
      'Legal, never sensible — selling a non-MCS install means the customer can never claim SEG, can’t sell the house with a renewables certificate, and may invalidate their building insurance. The DNO G98/G99 paperwork is still mandatory regardless of MCS status.',
      'Evidence in your portfolio of planned approaches, prioritisation decisions, deadline management, and professional communication about timescales — demonstrated through activity logs, reflective accounts and witness statements',
    ],
    correctAnswer: 0,
    explanation:
      'After ring testing the cross-connection at the CU must be removed and the L and N terminations re-made into the protective device in their correct positions. Visual check: L into the L of the device, N into the neutral bar. Then continue with the dead-test sequence — insulation resistance (Sub 3), polarity (Sub 4), earth electrode (TT only) — before first energisation.',
  },
];

const faqs = [
  {
    question: 'What is the difference between r1 and R1?',
    answer:
      'Lowercase r1 = end-to-end resistance of the line conductor of the ring measured during Part 1 (with the ring open at the CU). Uppercase R1 = the line-conductor resistance of the circuit as it appears in the R1+R2 calc you will use for Zs — derived from the Part 3 cross-connection reading. Same for rn (end-to-end neutral) versus the in-service values used in Zs maths. A constant convention: lowercase letters refer to end-to-end measurements with the ring open, uppercase to the in-service installed values used in Zs maths.',
  },
  {
    question: 'Why exactly is the cross-connection reading constant at every socket on a properly installed ring?',
    answer:
      'Because the ring topology means that at any socket, the meter sees two parallel paths from the cross-connected L back to the cross-connected N (or CPC). The total length of those two parallel paths is always the full ring loop, regardless of where you stop on it. Mathematically: at a point that is x metres from one CU termination and (L−x) from the other, the parallel combination of those two paths is x(L−x)/L — the maximum is when x = L/2 (the midpoint, giving L/4) and it tapers to zero at each end (which is why you do not test at the CU). For practical purposes the variation is small enough across the inner 80% of the ring that readings should be constant within a few percent.',
  },
  {
    question: 'My readings are roughly constant but vary by 0.02-0.03 Ω from socket to socket — is that OK?',
    answer:
      'Yes — small variations of a few percent are normal and reflect the slightly different positions of each socket on the ring (the curve is not perfectly flat) plus the resistance of the socket terminations themselves. What you are looking for is a single outlier that breaks the pattern: one socket reading 50% higher (a spur), one socket reading half (a cross-wire), or progressive increase from one end to the other (a broken ring with the meter reading only one half of the loop).',
  },
  {
    question: 'Can I test a ring final without breaking down the readings into three parts?',
    answer:
      'You can take a single R1+R2 reading at the CU with the ring as installed (no cross-connection, no opening), but it will not detect a broken ring and is not what BS 7671 Reg 643.2.1(b) requires. The regulation explicitly says ring final live-conductor continuity must be verified — the practical method for that is the three-part test. Skipping it leaves you signing off circuits that may have a broken ring (working as a long radial), which is a non-compliant condition that will degrade as the cable warms in service.',
  },
  {
    question: 'How does the ring test interact with the IR test (Sub 3)?',
    answer:
      'Order matters. Continuity (this Sub) before insulation resistance (Sub 3). For ring final IR, you can usually test L, N and CPC of the ring as a single circuit (combined L+N to CPC, or all three separately depending on technique). The ring being a ring is irrelevant to the IR test itself — what matters is that you have proven continuity of all three conductors first, so any subsequent IR fault can be localised correctly.',
  },
  {
    question: 'What if a domestic ring final fails the cross-connection test — readings are not constant?',
    answer:
      'Stop and investigate. Most likely causes: (a) a broken ring — one half of the loop is open at a back-box termination, junction box or behind a kitchen unit. Trace methodically from CU outwards using the readings to narrow down which side of the loop is open. (b) A spur connected wrongly. (c) A back-box terminal where the line and neutral have been swapped (you will see roughly half-readings at one socket). (d) The cross-connection at the CU was set up incorrectly. Before tearing the wall apart, double-check the cross-connection itself — many "broken ring" diagnoses turn out to be operator error at the CU.',
  },
];

export default function Sub2() {
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
            eyebrow="Module 4 · Section 6 · Subsection 2"
            title="Test ring final circuit"
            description="The three-part ring final test — end-to-end r1, rn, r2 followed by cross-connection L-N and L-CPC at every socket. Spot broken rings, spurs and wiring errors from the pattern of readings."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS 7671 Reg 643.2.1(b) requires the live conductors of a ring final to be continuity-tested. The IET method is the three-part test: end-to-end, then L-N cross-connection, then L-CPC cross-connection.',
              'In an intact ring the cross-connection readings are constant at every socket — within a few percent. A constant set with one outlier means a spur; non-constant readings mean a broken ring or wiring error.',
              'The Part 3 cross-connection reading at any socket gives you the effective R1+R2 for that point. Combine with Ze for Zs, then check against BS 7671 A4:2026 Table 41.3 (B32 = 1.37 Ω) using the 0.8 multiplier.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Disconnect a ring final at the CU and set up the three-part test correctly.',
              'Measure end-to-end r1, rn and r2 with the ring open and recognise sensible values for typical T&E sizes.',
              'Set up the L-N cross-connection (Part 2) and read every socket — recognise constant readings as proof of an intact ring.',
              'Set up the L-CPC cross-connection (Part 3) and derive R1+R2 for the Zs calc.',
              'Diagnose broken rings, spurs and cross-wired sockets from the pattern of readings.',
              'Cite Reg 643.2.1 (continuity), Reg 433.1.5 (ring final design as updated in A4:2026) and Table 41.3 (max Zs).',
              'Document ring test results on the Schedule of Test Results in the r1, rn, r2 and R1+R2 columns.',
            ]}
            initialVisibleCount={4}
          />

          <VideoCard
            url={videos.ringFinalTest.url}
            title={videos.ringFinalTest.title}
            channel={videos.ringFinalTest.channel}
            duration={videos.ringFinalTest.duration}
            topic="Three-part ring final continuity test · Unit 204 AC 6.2"
            caption="Craig Wiltshire takes the ring apart at the CU and walks the three-part method end-to-end — the L/N/CPC end-to-end readings, the L-N cross-connection and the L-CPC cross-connection that gives you R1+R2 for the Zs calc."
          />

          <ContentEyebrow>Why the three-part test exists</ContentEyebrow>

          <ConceptBlock
            title="A ring is not just a long radial"
            plainEnglish="A ring final has two parallel paths from the CU back to itself. That parallel arrangement spreads the load and lowers the effective resistance — but it also means a single end-to-end test cannot prove the ring is actually continuous in both directions."
            onSite="Imagine a 32 A ring final with the second leg disconnected at the CU. The first leg works fine as a long radial. A simple R1+R2 from the CU sees current go out one leg and never returns by the other — but the meter still reads a value because the loop closes via the linked conductors at the far end. You would never know the ring was broken without the three-part method."
          >
            <p>
              The ring final is the UK domestic standard for socket circuits — two cables leave the
              CU at a single 32 A protective device, run in a loop through every socket on the
              circuit, and return to the same protective device. The two paths share the load (each
              leg carrying roughly half the current), and the parallel arrangement gives a lower
              effective R1+R2 than an equivalent radial would.
            </p>
            <p>
              The three-part test exists because that parallel topology requires special handling:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part 1 — end-to-end continuity.</strong> Disconnect both legs of the ring
                at the CU. Measure resistance of each conductor (L, N, CPC) end-to-end with the
                ring open. Confirms each conductor is continuous around the loop.
              </li>
              <li>
                <strong>Part 2 — L-N cross-connection.</strong> Connect L of one leg to N of the
                other at the CU. Read L-N at every socket. Constant readings prove the ring is
                intact on both L and N.
              </li>
              <li>
                <strong>Part 3 — L-CPC cross-connection.</strong> Connect L of one leg to CPC of
                the other. Read L-CPC at every socket. Constant readings prove the ring is intact
                on L and CPC. The reading also gives you R1+R2 for the Zs calc.
              </li>
            </ol>
            <p>
              Each part independently catches different fault modes. Together they give complete
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
                for any circuit under (a). The three-part test (end-to-end plus two
                cross-connections) is the IET-published method that satisfies (b) for a ring final.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 643.2.1."
          />

          <SectionRule />

          <ContentEyebrow>Part 1 — end-to-end r1, rn, r2</ContentEyebrow>

          <ConceptBlock
            title="Open the ring at the CU and measure each conductor"
            plainEnglish="With the ring disconnected from the protective device, the two legs of L hang loose at the CU. Measure resistance between them — that is r1, the end-to-end resistance of the line conductor of the loop. Repeat for N (rn) and CPC (r2)."
            onSite="Verify safe isolation first. Lift both legs of L, both legs of N and both legs of CPC out of their respective terminals. Identify which two L ends belong to the ring (label or trace if not obvious). Test."
          >
            <p>Step-by-step Part 1:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>Verify safe isolation per the JIB sequence.</li>
              <li>
                At the CU, disconnect both legs of the ring from the protective device terminals
                (L), the neutral bar (N) and the earth bar (CPC). You now have six free conductor
                ends: L1, L2, N1, N2, CPC1, CPC2.
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
              1.5 mm² ≈ 12.10 mΩ/m. So for a typical 28 m ring loop:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>r1 ≈ 28 × 0.00741 ≈ 0.21 Ω</li>
              <li>rn ≈ 28 × 0.00741 ≈ 0.21 Ω (should match r1 within a few %)</li>
              <li>r2 ≈ 28 × 0.01210 ≈ 0.34 Ω (about r1 × 1.63 because of the smaller CPC)</li>
            </ul>
            <p>
              Real-world readings include the resistance of every socket termination on the ring,
              so add 0.05-0.15 Ω to the cold-cable estimate. r1 around 0.30-0.45 Ω, rn similar,
              r2 around 0.50-0.70 Ω is a sensible range for a fresh domestic ring of typical
              length.
            </p>
            <p>
              <strong>Red flags:</strong> r1 ≠ rn by more than ~10%; r2 not consistent with the
              cable size; OL on any reading; values an order of magnitude off (suggests a wrong
              cable size has been installed somewhere).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Part 2 — L-N cross-connection</ContentEyebrow>

          <ConceptBlock
            title="The L-N cross-connection — proving the ring is a ring"
            plainEnglish="At the CU, link L of one leg to N of the other leg. Now go to every socket on the ring and measure resistance between L and N at the socket terminals. On an intact ring, the reading is constant at every socket."
            onSite="Use a sturdy short jumper at the CU — not a piece of floppy single-core. The jumper has to make a low-resistance connection or it adds error to every reading."
          >
            <p>Step-by-step Part 2:</p>
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
              every socket, constant within a few percent. For r1 = 0.21, rn = 0.21 → expected
              ≈ 0.10 Ω at every socket. (The divide-by-four comes from the parallel combination of
              two halves of the loop, each half being two quarters in series.)
            </p>
            <p>What the readings tell you:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Constant at every socket within a few %:</strong> intact ring, correctly
                wired on L and N. Pass.
              </li>
              <li>
                <strong>One socket reading roughly half the others:</strong> L and N have been
                swapped at that socket — the meter is seeing one path of the ring rather than the
                parallel combination.
              </li>
              <li>
                <strong>One socket reading roughly double the others:</strong> the socket is on a
                spur, not in the ring.
              </li>
              <li>
                <strong>Readings progressively increasing from near-end sockets to far-end:</strong>
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

          <ContentEyebrow>Part 3 — L-CPC cross-connection (gives R1+R2)</ContentEyebrow>

          <ConceptBlock
            title="The L-CPC cross-connection — proving the earth path and giving R1+R2"
            plainEnglish="Same idea as Part 2 but with CPC instead of N. Cross-connect L of one leg to CPC of the other. The reading at every socket is the effective R1+R2 for that point — and on an intact ring it should be constant at every socket."
            onSite="The number you get from this part is the one you put in the R1+R2 column on the schedule of test results, and the one you use in the Zs = Ze + (R1+R2) calculation."
          >
            <p>Step-by-step Part 3:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Remove the L-N jumper from Part 2. Set up the new cross-connection: L of leg 1 to
                CPC of leg 2 with the same low-resistance jumper. Test terminals are L2 and CPC1.
              </li>
              <li>
                At each socket on the ring, connect MFT leads to the L and earth terminals.
              </li>
              <li>Press TEST. Note the reading. Repeat at every socket.</li>
            </ol>
            <p>
              <strong>Expected reading on an intact ring:</strong> approximately (r1 + r2) ÷ 4 at
              every socket, constant within a few percent. For r1 = 0.21 Ω, r2 = 0.34 Ω →
              expected ≈ 0.14 Ω at every socket. Real-world numbers including terminations:
              0.18-0.25 Ω is a sensible range for a typical domestic kitchen ring.
            </p>
            <p>
              <strong>This reading IS the R1+R2 for the circuit at that point.</strong> Combine
              with Ze to get Zs:
            </p>
            <p className="font-mono text-[14px] text-emerald-300">
              Zs = Ze + (R1 + R2)
            </p>
            <p>
              For Ze = 0.30 Ω (typical TN-C-S), R1+R2 = 0.20 Ω → Zs = 0.50 Ω. Compare against
              A4:2026 Table 41.3 for the device protecting the circuit. For Type B 32 A: max Zs =
              1.37 Ω, corrected measured limit = 1.37 × 0.8 = 1.10 Ω. 0.50 Ω is comfortably
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
                continuity testing requirement of Reg 643.2.1. The three-part test is the IET
                method for proving the integrity of the ring as required by this regulation.
                Note also: same conductor size throughout the ring — a ring with a thinner section
                spliced in (a common defect on older installations that have been altered) is
                non-compliant and would show up in your readings as a non-constant cross-connection.
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
            plainEnglish="An intact ring gives constant cross-connection readings. Outliers and trends point to specific defects."
          >
            <p>The diagnosis chart for cross-connection results:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-2 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Reading pattern</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Diagnosis</div>

                <div>Constant within a few % at every socket</div>
                <div>Intact ring, correctly wired. Pass.</div>

                <div>One socket ≈ half the others</div>
                <div>L and CPC (or L and N) swapped at that socket</div>

                <div>One socket significantly higher than the rest</div>
                <div>Spur off the ring — note location and cable length</div>

                <div>Progressive increase from near to far end of ring</div>
                <div>Ring is broken — you are reading a radial path</div>

                <div>OL at every socket</div>
                <div>Cross-connection jumper is loose at the CU — re-make the jumper</div>

                <div>OL at one socket only</div>
                <div>Open termination at that socket — check the back-box wiring</div>

                <div>r1 and rn end-to-end different by &gt; 10% in Part 1</div>
                <div>Mixed cable sizes in the loop, or one leg has a hidden joint with extra resistance</div>

                <div>r2 not in expected ratio to r1 (1.63 for 2.5/1.5 T&E)</div>
                <div>Wrong cable type fitted, or CPC has been parallelled by another path</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                { pattern: 'Constant within a few % at every socket', diagnosis: 'Intact ring, correctly wired. Pass.' },
                { pattern: 'One socket ≈ half the others', diagnosis: 'L and CPC (or L and N) swapped at that socket' },
                { pattern: 'One socket significantly higher than the rest', diagnosis: 'Spur off the ring — note location and cable length' },
                { pattern: 'Progressive increase from near to far end of ring', diagnosis: 'Ring is broken — you are reading a radial path' },
                { pattern: 'OL at every socket', diagnosis: 'Cross-connection jumper is loose at the CU — re-make the jumper' },
                { pattern: 'OL at one socket only', diagnosis: 'Open termination at that socket — check the back-box wiring' },
                { pattern: 'r1 ≠ rn by > 10% (Part 1)', diagnosis: 'Mixed cable sizes in the loop, or hidden joint' },
                { pattern: 'r2 not in expected ratio to r1', diagnosis: 'Wrong cable type, or CPC parallelled by another path' },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Pattern</div>
                  <div className="text-white/90 mt-0.5">{row.pattern}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">Diagnosis</div>
                  <div className="text-white/80 mt-0.5">{row.diagnosis}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <ConceptBlock
            title="When the ring isn't a ring — diagnostic patterns from the cross-connect test"
            plainEnglish="A broken ring, an unauthorised spur, and a bridged ring all give different fingerprints in the cross-connection readings. Learn the patterns and you can usually localise the fault before pulling a single accessory."
            onSite="Always start by re-checking the cross-connection at the CU before tearing into the wall. Most 'broken ring' diagnoses turn out to be a loose jumper at the consumer unit end."
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
                accessory).</strong> Most sockets read constant; one socket reads ROUGHLY HALF
                the others. The meter is seeing a different parallel-path combination at that
                socket because two conductors have been swapped at the back-box terminal.
                Always investigate the wiring at that specific socket.
              </li>
              <li>
                <strong>OL at every socket on the cross-connection.</strong> Almost certainly
                the cross-connection jumper at the CU is loose or not connected. Re-make the
                jumper, retest. If still OL, suspect a major break in the loop — but check the
                CU first.
              </li>
            </ul>
            <p>
              The pattern is the diagnostic. Single outlying high reading = spur. Single half
              reading = bridged accessory. Progressive change = broken ring. All-OL = jumper
              issue. Train your eye on these patterns and ring testing becomes much faster.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Two-test vs three-test ring testing — what the inspector wants to see"
            plainEnglish="The formal three-part method (end-to-end r1/rn/r2, then L-N cross-connection at every socket, then L-CPC cross-connection at every socket) is the IET-published method that satisfies Reg 643.2.1(b). Shortcut methods exist on site but won't pass an audit."
            onSite="On a periodic inspection you might shortcut to just the end-to-end and L-CPC cross-connection — but on a NEW install the full three-part is non-negotiable for sign-off."
          >
            <p>
              The full three-part method — what the inspector and the IET model STR expect:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Part 1 — end-to-end r1, rn, r2.</strong> Three readings (one per
                conductor) with the ring open at the CU. Confirms each conductor is continuous
                around the loop and gives sensible expected values.
              </li>
              <li>
                <strong>Part 2 — L-N cross-connection at every socket.</strong> Confirms the
                ring is intact on L and N. Spot wiring errors that would not show up in Part 1
                alone.
              </li>
              <li>
                <strong>Part 3 — L-CPC cross-connection at every socket.</strong> Confirms the
                ring is intact on L and CPC and gives the R1+R2 value used in the Zs calc.
              </li>
            </ol>
            <p>
              Common shortcuts and why they don't pass:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>"Just take a single R1+R2 at the CU."</strong> Reads the loop in
                parallel — would not detect a broken ring (the unbroken half completes the loop)
                and gives no socket-by-socket diagnostic. Non-compliant for Reg 643.2.1(b)
                requirement.
              </li>
              <li>
                <strong>"End-to-end only, skip the cross-connections."</strong> Confirms each
                conductor is continuous but gives no proof the ring is actually wired as a ring
                — could be a long radial that happens to terminate back at the CU. Spurs and
                bridges go undetected.
              </li>
              <li>
                <strong>"Cross-connections at one or two sockets, not all of them."</strong>
                Misses spurs at unsampled sockets. The cost of testing every socket is small —
                30-60 seconds per socket — and the diagnostic value is high.
              </li>
            </ul>
            <p>
              On the STR you record r1, rn, r2 from Part 1 and the highest cross-connection
              reading (typically from Part 3) as R1+R2 for the circuit. Showing all three
              end-to-end readings plus a representative cross-connection range demonstrates the
              full method was followed.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Ring final design under A4:2026 — the workflow change to ensure continuity is verifiable"
            plainEnglish="Reg 433.1.5 reaffirms the ring final design rules in A4:2026 — same conductor size throughout, ring returns to the same protective device, RCD additional protection mandatory on socket-outlets up to 32 A. The verification side has tightened too: integrity must be PROVEN by continuity testing per Reg 643.2.1, not assumed."
            onSite="If you're inheriting a ring from another installer or working on an alteration, the first thing to do is the three-part test from scratch. Don't trust documentation — measurements only."
          >
            <p>
              A4:2026 reaffirmed (rather than dramatically changed) the ring final design rules,
              but with an explicit cross-reference to the verification requirement. The headline
              rules:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Same conductor size throughout the ring.</strong> No spliced-in thinner
                sections (a common defect on older alterations). Mixed sizes show up in Part 1
                as r1 ≠ rn or as a non-constant cross-connection set.
              </li>
              <li>
                <strong>Single protective device.</strong> The ring returns to the same
                protective device at the CU — no half-and-half arrangements where two MCBs feed
                "half a ring" each.
              </li>
              <li>
                <strong>Maximum protective device rating 32 A.</strong> Plus mandatory RCD
                additional protection for socket-outlets up to 32 A under Reg 411.3.3 (A4:2026
                update — was 20 A under A2).
              </li>
              <li>
                <strong>Integrity verified by continuity testing per Reg 643.2.1.</strong>
                Explicit cross-reference in A4:2026 — the design rule and the test requirement
                are now formally linked.
              </li>
            </ul>
            <p>
              The workflow change for installers: the three-part test isn't optional or
              "best practice" — it's the regulatory verification of the design rules. On a new
              install, build the testing time into the programme. On an alteration, retest the
              whole ring (not just the altered section) because adding or moving an accessory
              can disturb the loop integrity. Document fully on the STR — r1, rn, r2 plus the
              R1+R2 highest cross-connection reading.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Forgetting to disconnect the ring from the protective device before testing"
            whatHappens={
              <>
                You leave both legs of the ring landed in the 32 A RCBO and start Part 1. Your
                meter sees the resistance of the ring conductor in parallel with all the other
                circuits in the consumer unit (because they share the neutral and earth bars). The
                reading comes in lower than the actual cable resistance — sometimes near-zero on a
                short ring. You write it down as a pass and move on. The ring could have a hidden
                broken leg and you would never catch it.
              </>
            }
            doInstead={
              <>
                Always disconnect the ring at the CU before testing. Both legs of L lifted out of
                the protective device, both legs of N lifted out of the neutral bar, both legs of
                CPC lifted out of the earth bar. Six free ends. Then test. After the test, re-land
                each conductor into its correct terminal — and double-check the line goes back into
                the protective device, not the neutral bar.
              </>
            }
          />

          <Scenario
            title="Three-part test on a freshly installed kitchen ring"
            situation={
              <>
                Kitchen ring final, T&E 2.5/1.5 mm², measured route length around the loop ≈ 28 m,
                eight twin sockets at intervals around the kitchen perimeter. 32 A Type B RCBO at
                the CU. TN-C-S supply with measured Ze = 0.30 Ω. You complete the three-part test:
                <br />
                <br />
                <strong>Part 1:</strong> r1 = 0.32 Ω, rn = 0.34 Ω, r2 = 0.55 Ω. <br />
                <strong>Part 2 (L-N):</strong> readings at all eight sockets between 0.16 and 0.18 Ω. <br />
                <strong>Part 3 (L-CPC):</strong> readings at all eight sockets between 0.20 and 0.22 Ω.
              </>
            }
            whatToDo={
              <>
                Sanity-check Part 1: r1 ≈ rn (within 6 %, fine), r2 ≈ r1 × 1.7 (close to the
                expected 1.63 ratio for 2.5/1.5 T&E), absolute values consistent with 28 m of
                cable plus terminations — pass. Part 2 readings constant within ±10 % across all
                eight sockets — intact ring on L and N. Part 3 readings constant within ±10 %
                across all eight sockets — intact ring on L and CPC. Take the highest Part 3
                reading (0.22 Ω) as the R1+R2 for the circuit. Compute Zs = Ze + R1+R2 = 0.30 +
                0.22 = 0.52 Ω. A4:2026 Table 41.3 max Zs for Type B 32 A = 1.37 Ω; corrected
                measured limit = 1.37 × 0.8 = 1.10 Ω. 0.52 Ω is comfortably below 1.10 Ω → pass.
                Record on the STR: r1 = 0.32, rn = 0.34, r2 = 0.55, R1+R2 (highest) = 0.22, Zs
                (calc) = 0.52. Re-make all CU terminations and proceed to insulation resistance
                testing (Sub 3).
              </>
            }
            whyItMatters={
              <>
                Every reading agrees with first-principles calculation, every cross-connection set
                is constant, and the headroom on Zs is generous. This is what a properly installed
                ring should look like on the test schedule. Compare the same circuit with one
                socket reading 0.40 Ω in Part 3 (while the others are at 0.22) — that single
                outlier would tell you that socket is on a spur, the spur cable has 0.18 Ω
                additional resistance (so roughly 9 m of additional 2.5 mm² cable), and you would
                document that spur on the STR.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Reg 643.2.1(b) requires continuity testing of the live conductors of a ring final. The three-part test (end-to-end, L-N cross-connection, L-CPC cross-connection) is the IET method.',
              'Disconnect both legs of the ring at the CU before starting. Six free conductor ends — L1, L2, N1, N2, CPC1, CPC2 — let you set up Part 1, Part 2 and Part 3 cleanly.',
              'Part 1 — end-to-end r1, rn, r2. Sanity check: r1 ≈ rn within a few %; r2 in the expected ratio to r1 for the cable type (1.63 for 2.5/1.5 T&E).',
              'Part 2 — L-N cross-connection at the CU, read L-N at every socket. Constant readings prove an intact ring on L and N.',
              'Part 3 — L-CPC cross-connection at the CU, read L-CPC at every socket. Constant readings prove an intact ring on L and CPC. The reading IS the R1+R2 for the circuit.',
              'A constant set with one outlier higher = spur. Half-readings = wires swapped at that socket. Progressive increase = broken ring. OL at one socket = open termination there.',
              'After testing: remove cross-connection jumpers, re-land conductors into correct terminals at the CU, double-check polarity by visual inspection, then proceed to insulation resistance (Sub 3).',
              'Compute Zs = Ze + R1+R2. Compare to A4:2026 Table 41.3 (Type B 32 A = 1.37 Ω) using the 0.8 multiplier. Document highest R1+R2 on the ring as the circuit value on the STR.',
            ]}
          />

          <Quiz title="Ring final test — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.1 Continuity of CPC
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module4/section6/6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 Insulation resistance
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
