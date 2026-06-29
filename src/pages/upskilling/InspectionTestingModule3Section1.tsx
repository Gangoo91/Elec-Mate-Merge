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
    id: 'mod3-s1-method-pick',
    question:
      'You are testing a kitchen-extension ring on a tenanted flat. The tenant is at home and using the laundry circuit on the same DB. Method 1 or Method 2?',
    options: [
      'Method 1 — short L–CPC at the board, read at the far socket; the default for new work.',
      'Method 2 (wandering lead) — probes each CPC from the MET without shorting the live circuit.',
      'Either is fine here; simply record whichever reading is the lower of the two.',
      'Skip the continuity test and rely on the live Zs reading taken later.',
    ],
    correctIndex: 1,
    explanation:
      'Method 2 keeps one probe on the MET and probes each accessory CPC in turn, without interrupting other circuits at the board. GN3 Reg 2.12 names it as the correct choice when shorting the circuit at the board is impractical — exactly the tenanted-property case. Method 1 stays the default for new and unoccupied work.',
  },
  {
    id: 'mod3-s1-low-reading',
    question:
      'Method 1 reading at the far socket is 0.18 Ω; calculated R1+R2 from GN3 Table BI is 0.31 Ω. The cable runs in steel conduit. What do you record on the Schedule?',
    options: [
      '0.18 Ω, because the reading is simply what the meter displays.',
      '0.31 Ω (calculated), with a comment noting parallel earth paths via the conduit.',
      'Average the measured and calculated values to record 0.245 Ω.',
      'Re-test the circuit using Method 2 and record that result instead.',
    ],
    correctIndex: 1,
    explanation:
      'The 0.18 Ω reading is the parallel combination of the CPC and the conduit, not a true R1+R2. Earthed metal containment in series with the CPC creates a parallel earth path that under-reads the cable-only R1+R2. Use the calculated value for the Zs sum and flag the parallel path in the comments. GN3 Reg 2.13 makes the all-insulated, accessories-clear-of-earth precondition explicit.',
  },
  {
    id: 'mod3-s1-null',
    question:
      'You forgot to null the test leads. Lead resistance is 0.22 Ω. The displayed reading at the far end is 0.65 Ω. What is the actual R1+R2?',
    options: ['0.65 Ω', '0.43 Ω (0.65 − 0.22)', '0.22 Ω', '0.87 Ω (0.65 + 0.22)'],
    correctIndex: 1,
    explanation:
      'Lead resistance adds in series with the conductor under test. GN3 Reg 2.13 permits either nulling out via the instrument or measuring lead resistance and subtracting. 0.65 − 0.22 = 0.43 Ω. Recording 0.65 Ω inflates every downstream Zs sum.',
  },
  {
    id: 'mod3-s1-temp-correction',
    question:
      "Calculated R1+R2 at 20 °C is 0.43 Ω. What is it at the cable's assumed operating temperature of 70 °C, for comparison against the Table 41 Zs limit?",
    options: [
      '0.43 Ω — temperature does not affect copper',
      '≈ 0.52 Ω (×1.20)',
      '≈ 0.34 Ω (×0.80)',
      '≈ 0.86 Ω (×2.00)',
    ],
    correctIndex: 1,
    explanation:
      'Copper has a positive temperature coefficient of approximately 0.4 %/°C. The standard correction from 20 °C to 70 °C operating is ×1.20 — that is the value used against the Table 41 maximum permitted Zs limits which are stated at operating temperature.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.2.1 splits the continuity test into two limbs. Which conductors must be checked across every circuit type, and which only on ring final circuits?',
    options: [
      'Live conductors on every circuit; protective conductors only on rings.',
      'Only ring finals are tested for continuity; radials are exempt.',
      'Only line conductors; neutral and CPC continuity is checked elsewhere.',
      'Protective and bonding conductors on every circuit; live conductors only on ring finals.',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 643.2.1 requires continuity of protective conductors (and protective bonding) on every circuit by resistance measurement. Live-conductor continuity by resistance measurement is required only for ring final circuits — that is the second limb of the regulation.',
  },
  {
    id: 2,
    question:
      'GN3 names two methods for protective-conductor continuity testing. What distinguishes Method 1 from Method 2?',
    options: [
      'Method 1 links L to CPC at the board and reads R1+R2; Method 2 reads R2 via a wandering lead.',
      'Method 1 is used only for radials, while Method 2 is used only for ring finals.',
      'Method 1 uses a multimeter, while Method 2 uses an insulation-resistance tester.',
      'Method 1 is for new work only and Method 2 for periodic inspection only.',
    ],
    correctAnswer: 0,
    explanation:
      'Per GN3 Reg 2.12, Method 1 links L to CPC at the origin so a measurement at the far end gives R1+R2 directly. Method 2 (the wandering lead) keeps one probe on the protective conductor at the distribution board via a long lead and checks the CPC at each circuit point — useful when shorting the ring is impractical.',
  },
  {
    id: 3,
    question:
      'Why does Reg 643.2.1 stop short of giving a numeric maximum acceptance value for protective-conductor continuity?',
    options: [
      'Because the acceptance maximum is simply the same as the circuit Zs limit.',
      'Because acceptance is judged against the calculated R1+R2, which varies with cable size and length.',
      'Because a continuity maximum is simply not required anywhere by law.',
      'Because the omission is an oversight in the A4:2026 amendment text.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643.2.1 deliberately does not set a numeric ceiling. Acceptance is judged against the calculated R1+R2 derived from cable cross-section, length and the resistance-per-metre values in GN3 Table BI / OSG Table I1. Anything significantly higher than the calculated value is the warning sign.',
  },
  {
    id: 4,
    question:
      'On an all-insulated installation where cable accessories are not in contact with earth, what does the L-to-E reading at the far end of the circuit (with L linked to CPC at the board) actually represent?',
    options: ['Zs', 'Ze', 'R1 + R2 + parallel earth paths via metalwork', 'R1 + R2 only'],
    correctAnswer: 3,
    explanation:
      "GN3 Reg 2.13 is explicit: where the wiring is all-insulated AND accessories are not in contact with earth, the test 'measures (R1 + R2)' with no parallel paths. If the wiring is in metallic containment that touches earth, parallel paths short the CPC — the reading then under-reads the true R2 and the simplification breaks.",
  },
  {
    id: 5,
    question:
      'Which instrument is appropriate for protective-conductor continuity testing per GN3?',
    options: [
      'A general-purpose multimeter on the lowest ohm range',
      'An insulation-resistance tester switched to its ohms range',
      'A low-resistance ohmmeter resolving below 0.1 Ω with lead compensation',
      'A continuity buzzer that beeps when a path is present',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Ch 2 Reg 2.12 is clear: a low-resistance ohmmeter shall be used. Buzzers are not suitable — they will give a beep on a high-resistance joint that is electrically dangerous. Multimeters lack the resolution and the dedicated current to give reliable low-ohm readings.',
  },
  {
    id: 6,
    question:
      'You are about to perform Method 1 on a 4 mm² / 1.5 mm² radial circuit (length 18 m). What is the calculated R1+R2 from GN3 Table BI values (r1 = 4.61 mΩ/m, r2 = 12.10 mΩ/m at 20°C)?',
    options: ['0.30 Ω', '0.20 Ω', '0.45 Ω', '0.12 Ω'],
    correctAnswer: 0,
    explanation:
      '(4.61 + 12.10) mΩ/m = 16.71 mΩ/m. 16.71 × 18 = 300.78 mΩ ≈ 0.30 Ω at 20°C. This is the value you compare your measured R1+R2 against; significant divergence is a flag, not a correction.',
  },
  {
    id: 7,
    question:
      'A bathroom has supplementary equipotential bonding installed. What does Reg 643.2.1, read with GN3 Ch 2, require you to do at continuity stage?',
    options: [
      'Nothing — supplementary bonding is covered by visual inspection only.',
      'Insulation-resistance test each supplementary bonding conductor instead.',
      'Continuity-test each supplementary bonding conductor and record the readings on the schedule of test results.',
      'Test the bonding only if Reg 415.2 has been applied as the protective measure.',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Reg 2.12 explicitly extends Reg 643.2.1 to "all supplementary bonding conductors" where applicable. Each conductor must be continuity tested to confirm a low-resistance bond between the simultaneously accessible conductive parts and recorded — the bond is what limits touch voltage, not the visual presence of a green-and-yellow strap.',
  },
  {
    id: 8,
    question:
      'Why is "null the test leads" the first thing GN3 tells you to do before a continuity test, not just an optional nicety?',
    options: [
      'It calibrates the meter against the manufacturer reference value',
      'Lead resistance (0.1–0.3 Ω) is the size of a real R1+R2, so it inflates every result',
      "It is only required when testing ring final continuity",
      "It charges the meter's internal capacitor before the test",
    ],
    correctAnswer: 1,
    explanation:
      'Test-lead resistance is typically 0.1–0.3 Ω — on the same order as a real R1+R2 reading — so without nulling every result is artificially inflated and Zs verification can mistakenly fail. GN3 Reg 2.13 requires that lead resistance is either nulled out or measured and deducted. Skipping nulling can convert a passing circuit into an apparent failure — or worse, mask a marginal joint by being inconsistent run-to-run.',
  },
  {
    id: 9,
    question:
      'You are using Method 2 (wandering lead) on an existing radial in a tenanted flat. The reading at a switched-spur FCU jumps about 0.4–0.6 Ω above the calculated R2-only value. What should you do?',
    options: [
      'Average the high and calculated readings and accept the result.',
      'Accept the higher reading on the basis that Method 2 is only approximate.',
      'Re-test using Method 1 and record whichever value is the lower one.',
      'Investigate — a switch, fuse or poor termination is adding series resistance; resolve it first.',
    ],
    correctAnswer: 3,
    explanation:
      "GN3 Reg 1.07 warns that switches, fuses and connection units sit in series with the Method 2 path and contribute extra resistance. That doesn't make the high reading 'normal' — it makes it diagnostic. You investigate the joint or device, not paper over it, before recording an acceptance value.",
  },
  {
    id: 10,
    question:
      "You forget to remove the L–CPC link at the board after a Method 1 test on a 32 A B-curve MCB circuit. The MCB is then closed. What's the worst-case outcome and what's the procedural fix?",
    options: [
      'Nothing happens — the MCB simply trips and the link is harmless.',
      'A direct line-to-earth short — instantaneous trip at best, welded contacts or arc-flash at worst.',
      'The CPC safely dissipates the fault current, as it is designed to do.',
      'The link burns out harmlessly before any protective device operates.',
    ],
    correctAnswer: 1,
    explanation:
      'Leaving the link in place is the most common Method 1 failure: closing the breaker puts a direct line-to-earth short across the board, at best an instantaneous trip and at worst welded contacts or arc-flash. The procedural mitigation is twofold: a high-visibility flying lead, and link-removal as a tick-box step on your test record before any breaker is closed.',
  },
];

const InspectionTestingModule3Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Continuity of protective conductors (R1+R2) | I&T Module 3.1 | Elec-Mate',
    description:
      'Reg 643.2.1 + GN3 Ch 2 + OSG Ch 10: Method 1 (linked) vs Method 2 (wandering lead), R1+R2 calculation from GN3 Table BI, lead-resistance nulling, supplementary bonding, and how the reading feeds Zs verification.',
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
            eyebrow="Module 3 · Section 1"
            title="Continuity of protective conductors (R1+R2)"
            description="The first test in the Reg 643.2 sequence. Methods 1 and 2, the maths from GN3 Table BI, and the reading that feeds every Zs verification."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 643.2.1 requires continuity of every protective and protective-bonding conductor by resistance measurement — plus continuity of live conductors on ring final circuits.',
              'GN3 Reg 2.12 names two methods. Method 1 links L to CPC at the board, so the reading at the far end is R1+R2 directly. Method 2 ("wandering lead") keeps a long test lead on the CPC at the MET and probes the CPC at each circuit point — used when shorting the circuit is impractical.',
              'Acceptance is not a fixed number. Per GN3 Reg 2.13, calculate the expected R1+R2 from cable length × (r1 + r2) mΩ/m using GN3 Table BI / OSG Table I1, then compare. Significant divergence is the flag.',
              'Null (or measure and subtract) the test leads first. Lead resistance (0.1–0.3 Ω) is on the same order as a real R1+R2 reading. Skipping this is the most common cause of false fails.',
              'On all-insulated wiring with accessories clear of earth, the Method 1 reading is genuinely R1+R2. In metallic containment that touches earth, parallel paths short the CPC and the simplification breaks — read GN3 Reg 2.13 carefully before relying on the value for Zs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State exactly what Reg 643.2.1 requires, when it applies, and where it stops (acceptance values, conditions, and limits)',
              'Choose between Method 1 and Method 2 for any given circuit and justify the choice from the GN3 framing',
              'Calculate the expected R1+R2 from cable size, length and GN3 Table BI — and judge a measured reading against it',
              'Spot the four most common reasons a measured R1+R2 disagrees with the calculation, and resolve each',
              'Carry the R1+R2 reading correctly into the Zs verification step (Zs = Ze + R1 + R2) and know when that simplification fails',
              'Record the result on the new A4:2026 Schedule of Test Results column structure without ambiguity',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.2.1 — the two limbs of the continuity requirement"
            plainEnglish="Test the continuity of every protective conductor and bonding conductor by measuring its resistance. On ring final circuits only, also test live-conductor continuity by resistance measurement."
            onSite="Read Reg 643.2.1 like two separate sentences. Sentence one applies to every circuit on the board. Sentence two adds an extra obligation only when the circuit is a ring final."
          >
            <p>
              Reg 643.2.1 in BS&nbsp;7671:2018+A4:2026 splits the continuity duty into two limbs.
              The first applies universally: continuity of every protective conductor and every
              protective-bonding conductor must be verified by resistance measurement during initial
              verification, periodic inspection, and after any addition or alteration that touches
              those conductors. The second limb applies only to ring final circuits: continuity of
              the line and neutral conductors must also be measured by resistance.
            </p>
            <p>
              The wording &ldquo;if any&rdquo; in the regulation is the conditional gate. If a
              circuit has no exposed-conductive-parts and no extraneous-conductive-parts in scope,
              the protective-conductor continuity duty does not bite for that circuit — but that is
              rare in any installation that includes accessories with earth terminals, metal-clad
              equipment, or supplementary bonding.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.2.1"
            clause={
              <>
                The continuity of conductors and connections to exposed-conductive-parts and
                extraneous-conductive-parts, including the main and supplementary bonding, shall be
                verified by a measurement of resistance. The continuity of every protective
                conductor of every circuit and, in the case of ring final circuits, every live
                conductor, shall be verified by a measurement of resistance.
              </>
            }
            meaning="A measurement of resistance is the test — not a buzzer, not a visual check. The instrument must be capable of low-resistance measurement (GN3 Reg 2.12). The reg does not state a numeric maximum, deliberately: acceptance is calculated from cable data, not assumed."
          />

          <ConceptBlock
            title="What &ldquo;continuity&rdquo; means here — and what it does not mean"
            plainEnglish="A pass on continuity means the conductor is unbroken end-to-end with a low-enough resistance to be electrically effective for fault-protection or equipotential bonding. It does not, on its own, prove the conductor is sized correctly, terminated at the right place, or sufficient for the disconnection time."
          >
            <p>
              Continuity in Reg 643.2.1 means the protective conductor is electrically continuous
              and of low resistance — not merely connected. A green-and-yellow conductor that
              terminates loosely under a clamp or that has a single broken strand pinching the rest
              will pass a casual buzzer test and fail a low-resistance ohmmeter measurement. The
              regulation chose &ldquo;measurement of resistance&rdquo; as the verification verb for
              that exact reason: a numeric reading reveals connections that look good but are not.
            </p>
            <p>
              GN3 Reg 2.12 reinforces this by listing what the continuity test must include:
              protective conductors of every circuit, every main protective bonding conductor, and
              every supplementary bonding conductor where supplementary bonding has been provided.
              Each conductor must be tested individually — group testing several at once is not the
              duty being asked for.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The two methods, side by side</ContentEyebrow>

          <ConceptBlock
            title="Method 1 — link L and CPC at the origin, read R1+R2 at the far end"
            plainEnglish="At the distribution board, temporarily connect line to CPC for the circuit under test. Then go to the furthest point on the circuit and measure resistance between L and E with your low-resistance ohmmeter. The reading is R1 + R2 — the line-conductor resistance plus the protective-conductor resistance for that circuit."
            onSite="Method 1 is the default for new work. It is the method OSG cross-references for the polarity check that follows continuity, so completing Method 1 properly hands you the polarity verification at the same moment."
          >
            <p>
              Method 1 is named in GN3 Reg 2.12 as the &ldquo;circuit-shorted&rdquo; method. The
              workflow is:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Isolate the circuit, prove dead at the point of work, and lock-off at the source.
              </li>
              <li>
                Null the test leads of the low-resistance ohmmeter (or measure and record their
                resistance for subtraction).
              </li>
              <li>
                At the distribution board, fit a temporary link between the line conductor and the
                CPC of the circuit under test. Use a brightly coloured / labelled flying lead.
              </li>
              <li>
                At the furthest point on the circuit (the worst-case socket, FCU, luminaire,
                whatever the circuit terminates at), measure resistance between L and E with the
                ohmmeter. This is R1 + R2.
              </li>
              <li>
                Record the reading on the schedule of test results to two decimal places in ohms.
              </li>
              <li>
                Remove the temporary link before any breaker on the board is closed. This is the
                step that gets forgotten and the step that destroys boards.
              </li>
            </ol>
            <p>
              GN3 Reg 2.13 is the regulation that makes the Method 1 reading mean R1+R2 specifically
              — with one important caveat: the reading equals R1+R2 only if the wiring is
              all-insulated and the cable accessories are not in contact with earth. If the cable
              passes through metal containment that is itself bonded to earth (steel conduit, SWA,
              tray with earthed clamps), parallel paths short the CPC and the reading
              under-represents the true R2. In that situation, Method 1 still confirms the
              connection is electrically continuous but should not be substituted into a Zs sum
              without re-thinking what the parallel path is doing.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 32 A radial in a metal-clad commercial unit"
            situation="Steel conduit and tray run from the distribution board to a final FCU. You short L–CPC at the board and read 0.18 Ω at the FCU. Your calculated R1+R2 from cable length and GN3 Table BI is 0.31 Ω. The reading is lower than the calculation suggests."
            whatToDo="Do not record 0.18 Ω as the R1+R2 for the Zs sum. The metal containment is creating a parallel earth path — your reading is the parallel combination, not the cable-only R1+R2. Either disconnect the parallel path at the relevant accessory and re-measure, or note in the comments that the reading reflects parallel paths and use the calculated R1+R2 for the Zs verification step."
            whyItMatters="A reading lower than calculation looks like a pass and feels like a pass. It can mask a CPC with a degraded connection because the metalwork is doing the work. The day someone removes the conduit clamp during refurbishment, the disconnection time blows past the Reg 411.3.2 limits with no warning."
          />

          <ConceptBlock
            title="Method 2 — wandering lead from the MET, probe at each circuit point"
            plainEnglish="Connect one ohmmeter lead to the protective conductor at the distribution board (or MET) using a long test cable — the wandering lead. Then take the other lead from point to point along the circuit (sockets, junction boxes, equipment enclosures) and measure resistance to that point. The reading at each point is R2 only — the line conductor is not in the test path."
            onSite="Method 2 is the right tool when you cannot, or should not, short the circuit at the board. The classic example is an occupied tenanted property where shorting a ring would interrupt every appliance on it for the duration of the test."
          >
            <p>
              GN3 Reg 1.07 and Reg 2.12 describe Method 2 as the &ldquo;supplementary test cable
              method&rdquo;, popularly known as the wandering lead. The workflow is:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Isolate, prove dead, and lock off as for Method 1.</li>
              <li>Null the test leads (and account for the long wandering lead specifically).</li>
              <li>
                Connect one lead of the low-resistance ohmmeter to the protective conductor at the
                distribution board / MET via the wandering lead.
              </li>
              <li>
                Move the other test lead to the protective conductor at each circuit point in turn:
                socket-outlet earth, junction box earth, equipment enclosure, switch back-box, FCU
                earth.
              </li>
              <li>
                Record each reading on the schedule. The expected value at any point is the
                calculated R2 from the MET to that point only — line resistance does not enter the
                path.
              </li>
            </ol>
            <p>
              Method 2&rsquo;s practical strength is that it lets you locate where in the circuit a
              high-resistance joint sits. Method 1 gives you a single number at the far end; Method
              2 gives you a string of numbers along the run. If the third socket reads 0.4 Ω and the
              next socket reads 0.9 Ω, the joint between them is the suspect.
            </p>
          </ConceptBlock>

          {/* Method 1 diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Method 1 — R1+R2 with line linked to CPC at the origin
            </h4>
            <svg
              viewBox="0 0 800 320"
              className="w-full h-auto"
              role="img"
              aria-label="Method 1 R1+R2 continuity test setup. Line and CPC are linked at the distribution board. The low-resistance ohmmeter measures L to E at the furthest point on the circuit. The reading equals R1 + R2."
            >
              <rect
                x="50"
                y="40"
                width="180"
                height="180"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="140"
                y="62"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                fontWeight="bold"
              >
                DISTRIBUTION BOARD
              </text>
              <text x="140" y="78" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Circuit isolated, locked off)
              </text>

              <rect
                x="80"
                y="100"
                width="40"
                height="25"
                rx="4"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="117"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                L
              </text>
              <rect
                x="80"
                y="145"
                width="40"
                height="25"
                rx="4"
                fill="rgba(59,130,246,0.1)"
                stroke="#3B82F6"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="162"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="10"
                fontWeight="bold"
              >
                N
              </text>
              <rect
                x="80"
                y="190"
                width="40"
                height="25"
                rx="4"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="100"
                y="207"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                E
              </text>

              <path
                d="M120,112 L170,112 L170,202 L120,202"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeDasharray="6,3"
              />
              <rect
                x="150"
                y="148"
                width="55"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.15)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="177"
                y="163"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                LINK
              </text>

              <line x1="230" y1="112" x2="500" y2="112" stroke="#EF4444" strokeWidth="2" />
              <text x="365" y="105" textAnchor="middle" fill="#EF4444" fontSize="9">
                R1 (line conductor)
              </text>
              <line
                x1="230"
                y1="157"
                x2="500"
                y2="157"
                stroke="#3B82F6"
                strokeWidth="2"
                opacity="0.4"
              />
              <line x1="230" y1="202" x2="500" y2="202" stroke="#22C55E" strokeWidth="2" />
              <text x="365" y="218" textAnchor="middle" fill="#22C55E" fontSize="9">
                R2 (CPC)
              </text>

              <rect
                x="500"
                y="70"
                width="150"
                height="180"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="575"
                y="90"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="10"
                fontWeight="bold"
              >
                FURTHEST POINT
              </text>
              <text x="575" y="106" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Socket / FCU / luminaire)
              </text>

              <rect
                x="525"
                y="120"
                width="30"
                height="20"
                rx="3"
                fill="rgba(239,68,68,0.1)"
                stroke="#EF4444"
                strokeWidth="1"
              />
              <text x="540" y="134" textAnchor="middle" fill="#EF4444" fontSize="9">
                L
              </text>
              <rect
                x="560"
                y="120"
                width="30"
                height="20"
                rx="3"
                fill="rgba(59,130,246,0.1)"
                stroke="#3B82F6"
                strokeWidth="1"
              />
              <text x="575" y="134" textAnchor="middle" fill="#3B82F6" fontSize="9">
                N
              </text>
              <rect
                x="543"
                y="145"
                width="30"
                height="20"
                rx="3"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text x="558" y="159" textAnchor="middle" fill="#22C55E" fontSize="9">
                E
              </text>

              <rect
                x="520"
                y="185"
                width="110"
                height="50"
                rx="8"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="575"
                y="205"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                LOW-Ω OHMMETER
              </text>
              <text x="575" y="222" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Reading = R1 + R2
              </text>

              <line x1="540" y1="185" x2="540" y2="165" stroke="#EF4444" strokeWidth="1.5" />
              <line x1="558" y1="185" x2="558" y2="165" stroke="#22C55E" strokeWidth="1.5" />

              <rect
                x="50"
                y="270"
                width="700"
                height="40"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="288" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                GN3 Reg 2.13: with all-insulated wiring + accessories not in contact with earth, the
                reading equals R1 + R2.
              </text>
              <text
                x="400"
                y="303"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Zs verification: Zs = Ze + (R1 + R2)
              </text>
            </svg>
          </div>

          {/* Method 2 diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Method 2 — wandering lead from the MET, R2 only at each point
            </h4>
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto"
              role="img"
              aria-label="Method 2 wandering-lead continuity test. The ohmmeter is held at the test point. One of its leads is permanently clipped to the CPC at the MET via a long wandering lead. The other lead probes the CPC at each accessory in turn. Each reading equals R2 from the MET to that point."
            >
              {/* DB / MET */}
              <rect
                x="30"
                y="20"
                width="140"
                height="120"
                rx="8"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x="100"
                y="42"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="11"
                fontWeight="bold"
              >
                DB / MET
              </text>
              <text x="100" y="58" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">
                (Circuit isolated)
              </text>
              <rect
                x="55"
                y="85"
                width="40"
                height="22"
                rx="4"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="75"
                y="100"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                CPC
              </text>
              {/* Clip dot at CPC terminal (MET end of wandering lead) */}
              <circle cx="95" cy="96" r="3" fill="#FBBF24" />

              {/* Sockets row */}
              <g>
                <rect
                  x="220"
                  y="30"
                  width="80"
                  height="44"
                  rx="4"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text x="260" y="48" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Socket 1
                </text>
                <circle cx="260" cy="62" r="3" fill="#22C55E" />
                <text x="260" y="92" textAnchor="middle" fill="#22C55E" fontSize="10">
                  R2 = 0.12 Ω
                </text>
              </g>
              <g>
                <rect
                  x="320"
                  y="30"
                  width="80"
                  height="44"
                  rx="4"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text x="360" y="48" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Socket 2
                </text>
                <circle cx="360" cy="62" r="3" fill="#22C55E" />
                <text x="360" y="92" textAnchor="middle" fill="#22C55E" fontSize="10">
                  R2 = 0.18 Ω
                </text>
              </g>
              <g>
                {/* Active test point — Socket 3 — highlighted */}
                <rect
                  x="420"
                  y="30"
                  width="80"
                  height="44"
                  rx="4"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="460"
                  y="48"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9"
                  fontWeight="bold"
                >
                  Socket 3
                </text>
                <circle cx="460" cy="62" r="4" fill="#22C55E" stroke="#FBBF24" strokeWidth="1.2" />
                <text
                  x="460"
                  y="92"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  R2 = 0.74 Ω ⚠
                </text>
                <text x="460" y="108" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  (active test point)
                </text>
              </g>
              <g>
                <rect
                  x="520"
                  y="30"
                  width="80"
                  height="44"
                  rx="4"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.2"
                />
                <text x="560" y="48" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Socket 4
                </text>
                <circle cx="560" cy="62" r="3" fill="#22C55E" />
                <text x="560" y="92" textAnchor="middle" fill="#FBBF24" fontSize="10">
                  R2 = 0.81 Ω
                </text>
              </g>

              {/* Inspector-moves arrow under sockets */}
              <line
                x1="240"
                y1="130"
                x2="580"
                y2="130"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <polygon points="580,130 572,126 572,134" fill="rgba(255,255,255,0.4)" />
              <text x="410" y="148" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Inspector moves the meter from socket to socket
              </text>

              {/* Ohmmeter (sits below the active test point) */}
              <rect
                x="380"
                y="200"
                width="160"
                height="80"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="460"
                y="222"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                LOW-Ω OHMMETER
              </text>
              <text x="460" y="240" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Reading: R2 at test point
              </text>
              {/* Two terminal dots on the meter */}
              <circle cx="400" cy="265" r="4" fill="#FBBF24" />
              <text x="400" y="278" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                to MET
              </text>
              <circle cx="520" cy="265" r="4" fill="#22C55E" />
              <text x="520" y="278" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                probe
              </text>

              {/* Wandering lead — MET CPC clip down to meter left terminal (straight) */}
              <line
                x1="95"
                y1="96"
                x2="400"
                y2="265"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeDasharray="6,3"
              />
              <text
                x="200"
                y="180"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Wandering lead → MET CPC (stays clipped)
              </text>

              {/* Active probe — meter right terminal up to Socket 3 CPC */}
              <line
                x1="520"
                y1="265"
                x2="460"
                y2="62"
                stroke="#22C55E"
                strokeWidth="2"
                strokeDasharray="4,3"
              />
              <text
                x="560"
                y="160"
                textAnchor="start"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Probe at the
              </text>
              <text
                x="560"
                y="174"
                textAnchor="start"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                accessory CPC
              </text>

              {/* Caption box */}
              <rect
                x="30"
                y="300"
                width="740"
                height="50"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="322" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                The 0.56 Ω jump between Socket 2 and Socket 3 isolates the suspect joint to the
                cable / termination between those two points.
              </text>
              <text
                x="400"
                y="340"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                That diagnostic is the practical advantage of Method 2 over Method 1.
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

          <CommonMistake
            title="Treating the test-lead null as optional"
            whatHappens="A 0.20 Ω lead resistance is added to every reading. A truly compliant 0.30 Ω R1+R2 reads as 0.50 Ω. A marginal 0.45 Ω reads as 0.65 Ω and looks like a fail. You either re-do the test (lost time) or worse, accept readings that mix lead resistance into the Zs sum and end up with a Zs that disagrees with the live test by an inexplicable amount."
            doInstead="Null the leads against a known short before every continuity session and after any cable is replaced. If the meter does not have a null function, measure lead resistance once, write it on the meter housing in marker, and subtract by hand. GN3 Reg 2.13 explicitly permits the measure-and-subtract approach as an alternative to nulling."
          />

          <SectionRule />

          <ContentEyebrow>The maths — calculating expected R1+R2</ContentEyebrow>

          <ConceptBlock
            title="GN3 Table BI — the resistance-per-metre values you actually need"
            plainEnglish="GN3 Reg 1.74 publishes a table (Table BI) of conductor resistance per metre at 20°C, by conductor cross-section. The header is literally &lsquo;Resistance/metre or (R1 + R2)/metre (mΩ/m)&rsquo;. You multiply this by the circuit length in metres and you have the calculated R1+R2 to compare your reading against."
          >
            <p>
              The table publishes mΩ/m for each conductor csa. To calculate R1+R2 for a circuit with
              a different line and CPC csa (typical T&E with reduced CPC), you add the line
              csa&rsquo;s r1 to the CPC csa&rsquo;s r2 and multiply the sum by the circuit length.
              Common values from Table BI / OSG Table I1 at 20&deg;C:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Cable (line / CPC)</th>
                    <th className="text-center text-white/80 py-2">r1 (mΩ/m)</th>
                    <th className="text-center text-white/80 py-2">r2 (mΩ/m)</th>
                    <th className="text-center text-elec-yellow py-2">r1 + r2 (mΩ/m)</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1.0 / 1.0 mm²</td>
                    <td className="text-center">18.10</td>
                    <td className="text-center">18.10</td>
                    <td className="text-center text-elec-yellow">36.20</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">1.5 / 1.0 mm²</td>
                    <td className="text-center">12.10</td>
                    <td className="text-center">18.10</td>
                    <td className="text-center text-elec-yellow">30.20</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">2.5 / 1.5 mm² (T&amp;E)</td>
                    <td className="text-center">7.41</td>
                    <td className="text-center">12.10</td>
                    <td className="text-center text-elec-yellow">19.51</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">4.0 / 1.5 mm² (T&amp;E)</td>
                    <td className="text-center">4.61</td>
                    <td className="text-center">12.10</td>
                    <td className="text-center text-elec-yellow">16.71</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">6.0 / 2.5 mm² (T&amp;E)</td>
                    <td className="text-center">3.08</td>
                    <td className="text-center">7.41</td>
                    <td className="text-center text-elec-yellow">10.49</td>
                  </tr>
                  <tr>
                    <td className="py-2">10 / 4.0 mm²</td>
                    <td className="text-center">1.83</td>
                    <td className="text-center">4.61</td>
                    <td className="text-center text-elec-yellow">6.44</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The values are at 20&deg;C. Cable in service runs hotter — typically up to 70&deg;C
              for thermoplastic insulated cable at full load. Conductor resistance has a positive
              temperature coefficient of approximately 0.4&nbsp;%/&deg;C for copper, so R1+R2 at
              70&deg;C is roughly 1.20&times; the 20&deg;C value. For Zs verification at maximum
              permitted operating temperature, multiply the calculated 20&deg;C R1+R2 by 1.20 before
              adding to Ze. Most modern multifunction testers handle this automatically when you
              select the cable temperature.
            </p>
          </ConceptBlock>

          <Scenario
            title="Worked example — a 22 m radial socket circuit, 2.5/1.5 mm² T&E"
            situation="You are testing a kitchen radial. Length 22 m. Cable 2.5/1.5 mm² T&E. Ze at the origin has been measured as 0.32 Ω. The protective device is a 32 A B-curve MCB; max permitted Zs from BS 7671 Table 41.3 (with the A4 max permitted Zs column applied) is 1.37 Ω at 70°C."
            whatToDo={
              <>
                <span className="block">
                  Calculated R1+R2 at 20&deg;C = 22 m × 19.51 mΩ/m = 0.43 Ω.
                </span>
                <span className="block">Calculated R1+R2 at 70&deg;C = 0.43 × 1.20 = 0.52 Ω.</span>
                <span className="block">
                  Predicted Zs at 70&deg;C = Ze + (R1+R2 corrected) = 0.32 + 0.52 = 0.84 Ω.
                </span>
                <span className="block">
                  0.84 Ω vs 1.37 Ω limit → compliant with comfortable headroom. Now measure Method 1
                  R1+R2 at the furthest socket and confirm it falls within ±10 % of the 0.43 Ω
                  calculated 20&deg;C value. If it does, the Zs verification step is robust. If it
                  does not, investigate before recording.
                </span>
              </>
            }
            whyItMatters="The calculation gives you a number to argue with the meter against. Without it you have no way to spot a measurement that is technically &lsquo;low&rsquo; but is hiding parallel paths, or a measurement that is &lsquo;within range&rsquo; but is masking a degraded joint."
          />

          <RegsCallout
            source="GN3 Reg 2.13 · Chapter 2"
            clause={
              <>
                Where the installation has all-insulated wiring and the cable accessories are not in
                contact with earth, then the described continuity test measures (R1 + R2), i.e. the
                resistance of the line conductor, R1, plus the resistance of the protective
                conductor, R2, for that circuit. The resistance of the test leads should either be
                measured and deducted from the readings obtained, or be nulled out using the
                instrument&rsquo;s zeroing function.
              </>
            }
            meaning="Two non-negotiables in one regulation: (1) the all-insulated, accessories-clear-of-earth precondition for treating the reading as R1+R2; and (2) the test-lead nulling/subtraction step. Both are implicit in any acceptance value you record."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading the result — four diagnostic outcomes</ContentEyebrow>

          <ConceptBlock
            title="What different R1+R2 readings actually tell you"
            plainEnglish="A measured R1+R2 is not just a pass/fail bit. It is one of four diagnostic outcomes, each of which has a different next step."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">Within ±10 % of calculated.</strong> Pass.
                Record. Move to the next test in the Reg 643.2 sequence.
              </li>
              <li>
                <strong className="text-amber-300">Significantly higher than calculated.</strong>{' '}
                Investigate first, decide later. Common causes: loose terminal, corroded joint,
                cable longer than the route assumed, wrong cable size at one section, cable damage,
                or a junction-box termination using an inadequate connector. Use Method 2 to
                localise.
              </li>
              <li>
                <strong className="text-amber-300">Significantly lower than calculated.</strong>{' '}
                Suspicious, not necessarily good. Most common cause: parallel earth paths via metal
                containment, bonded gas/water pipework or supplementary bonding routes that
                short-circuit the CPC. Useful, but not the value to use in the Zs verification.
                Investigate, then either disconnect the parallel path, or note the parallel path and
                use the calculated R1+R2 in the Zs sum.
              </li>
              <li>
                <strong className="text-red-300">Open circuit (∞).</strong> Fail. Broken conductor,
                missing termination, wrong test point, or the L–CPC link not made at the board for
                Method 1. Stop, recheck the link and probe contact, then investigate the conductor.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Recording R1+R2 without verifying the L–CPC link held"
            whatHappens="The flying lead at the board worked itself loose during the time it took to walk to the furthest point. The reading you took at the socket was an open circuit — but you assumed the meter was reading L–E through the cable when in fact it was reading L–E with no link. The result on the schedule of test results is meaningless, and the moment someone uses it to verify Zs they get a Zs sum that is dramatically wrong."
            doInstead="Use a positive-clamp flying lead (not an alligator clip on a screw head) at the board. After the first reading at the far end, briefly disconnect one end of the link and confirm the meter reads open. Reconnect and confirm the reading is stable. This thirty-second sanity check has saved more boards than any single procedural rule."
          />

          <CommonMistake
            title="Confusing &lsquo;continuity&rsquo; with &lsquo;connection&rsquo;"
            whatHappens="A bonded gas pipe is bonded with a 10 mm² conductor, terminated under a clamp. The clamp screw is finger-tight and the strands are nipped on one side. A buzzer-style continuity test beeps. The bond resistance is actually 8–12 Ω because of the partial contact. Touch voltage during a fault is high enough to cause severe shock, and the bond appears compliant on the schedule."
            doInstead="Use a low-resistance ohmmeter, not a buzzer. Numeric reading first; pass/fail second. GN3 Reg 2.12 names the low-resistance ohmmeter as the required instrument. A bond reading should be a small fraction of an ohm — anything in the ones-of-ohms range on a real bond is a defect to remediate, not a quirk."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How the reading feeds the rest of the test sequence</ContentEyebrow>

          <ConceptBlock
            title="From R1+R2 to Zs verification — the link that justifies the test"
            plainEnglish="R1+R2 is the conductor-only part of the earth-fault loop. Add Ze (measured at the origin) and you have the predicted Zs for the circuit at the furthest point. The whole reason Reg 643.2.1 makes you do this test is that it lets you verify Zs against the Reg 411.4 / Table 41 limits without exposing yourself to a live test on every circuit."
            onSite="Most multifunction testers will let you store Ze, then auto-add R1+R2 readings to give a calculated Zs. Use that feature — but verify the Ze value the meter holds is the one you actually measured today, not a leftover from a previous job."
          >
            <p>
              The sum is straightforward: <strong>Zs = Ze + R1 + R2</strong>. The judgement around
              it is what matters:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Use R1+R2 corrected to operating temperature (typically &times;1.20 for
                thermoplastic cable) when comparing against the Table 41 limits at 70&deg;C.
              </li>
              <li>
                Apply the A4:2026 maximum permitted Zs column where it differs from earlier editions
                (the A4 amendment introduced an explicit max-permitted-Zs column on the Schedule of
                Circuit Details — use the value in that column, not the BS&nbsp;7671 Table 41.3 raw
                value, when the design has set a tighter limit).
              </li>
              <li>
                Where the circuit is RCD-protected and disconnection times rely on the RCD rather
                than the overcurrent device, the R1+R2 still has to be measured and recorded — Reg
                643.2.1 does not exempt RCD-protected circuits.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="What goes in the R1+R2 column — and what goes elsewhere"
            plainEnglish="R1+R2 has its own column on the Schedule of Test Results. Record the measured value to two decimal places in ohms. Do not put the calculated value there — calculated values go in the design / circuit details schedule. The reading is a measurement, not a calculation."
          >
            <p>
              The A4:2026 model forms tightened the column structure on the Schedule of Test
              Results. Three rules, every time:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>R1+R2 column:</strong> the measured value at the test point, in ohms, two
                decimals. If the circuit is a ring final and you have used the ring continuity test
                (r1, r2 and rn at each socket / furthest socket), the column takes the far-socket
                R1+R2 derived from the ring measurements — not the end-to-end ring resistance.
              </li>
              <li>
                <strong>R2 column (where present):</strong> Method 2 readings, recorded against the
                tested point. Some forms collapse R2 into the R1+R2 column with a notation — check
                your specific form template before transcribing.
              </li>
              <li>
                <strong>Comments column:</strong> any test that is not a straightforward Method 1 /
                Method 2 result. Parallel earth paths, calculated values used in lieu of measured,
                or accessories disconnected for the test — all flagged in comments so the next
                inspector knows what they are looking at.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 643.2.1 is two limbs: protective conductors on every circuit, plus live conductors on ring finals — always by resistance measurement.',
              'Method 1 (linked at board) gives R1+R2 directly at the far end — default for new work, but only valid as R1+R2 on all-insulated wiring with accessories clear of earth.',
              'Method 2 (wandering lead) gives R2 only at each point — used when shorting the circuit is impractical, and uniquely good for localising a high-resistance joint.',
              'Null the test leads or measure-and-subtract their resistance. Lead resistance is on the same order as a real reading.',
              'Calculate expected R1+R2 from GN3 Table BI before testing. Significant divergence is a flag, not a correction.',
              'A reading lower than calculated is suspicious, not always good — parallel earth paths can mask a degraded CPC.',
              'The L–CPC link at the board must be removed before any breaker is closed. Use a high-visibility flying lead and write removal into the test sheet.',
              'R1+R2 corrected to 70°C (×1.20) feeds Zs = Ze + R1 + R2. The whole point of the test is the Zs verification it enables.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Does Reg 643.2.1 set a numeric maximum R1+R2?',
                answer:
                  'No. The regulation requires verification by measurement of resistance but deliberately does not state a numeric ceiling — R1+R2 depends on cable size and length, so a fixed limit is meaningless. Acceptance is the calculated R1+R2 from GN3 Table BI ± a tolerance, with the corrected value feeding the Zs verification against the Table 41 / A4 max-permitted-Zs limit.',
              },
              {
                question:
                  'Method 1 or Method 2 — does it matter which I use, or are they interchangeable?',
                answer:
                  'They give different things. Method 1 gives R1+R2 directly and is the default for new work in unoccupied premises. Method 2 gives R2 at each point along the circuit and is the right tool when (a) you cannot short the circuit at the board because of occupancy, or (b) you want to localise a high-resistance joint. Both methods produce numbers fit for the schedule of test results, but only the Method 1 number goes straight into the Zs sum without further work.',
              },
              {
                question:
                  'Can I use a multimeter on the lowest ohm range instead of a low-resistance ohmmeter?',
                answer:
                  'Not for the protective-conductor continuity test. GN3 Reg 2.12 names the low-resistance ohmmeter as the required instrument. Multimeters do not push enough test current to reveal high-resistance joints (a partial connection can read low on a multimeter and high under load), and they typically cannot resolve below 0.1 Ω. Use a multifunction tester or a dedicated low-Ω ohmmeter that meets BS EN 61557-4.',
              },
              {
                question:
                  'What if the circuit has metal containment that is bonded to earth and my Method 1 reading is suspiciously low?',
                answer:
                  'Suspect parallel earth paths. The metal conduit / tray / SWA armour, when in contact with earthed clamps or bonded fittings, creates a parallel path that shorts the CPC and reads in series with the L conductor. Confirm by disconnecting the supplementary bond / containment earth at the test point (with isolation in place) and re-measuring. If the reading rises sharply, you are seeing the parallel path effect. Use the calculated R1+R2 (not the measured value) for the Zs sum, and note the situation in the schedule comments.',
              },
              {
                question:
                  'Do I have to test every supplementary bonding conductor, or just the main bonding?',
                answer:
                  'Every one. GN3 Reg 2.12 extends Reg 643.2.1 explicitly to all supplementary bonding conductors where supplementary bonding has been provided — a bathroom is the canonical example. The bond is what limits touch voltage, so a missing or high-resistance supplementary bond can leave the location non-compliant with Reg 415.2 even if main bonding is fine. Each supplementary bond gets its own continuity reading recorded against its location.',
              },
              {
                question: 'How does temperature correction work and when do I have to apply it?',
                answer:
                  'GN3 Table BI is at 20°C. Cable in service runs hotter, up to 70°C for thermoplastic insulated cable at its rated current. Conductor resistance rises about 0.4 %/°C for copper, so R1+R2 at 70°C is roughly 1.20× the 20°C value. Apply the correction whenever you are comparing the calculated Zs against the Table 41 limits, since the limits are stated at the operating temperature. Most modern multifunction testers do this automatically when you select the cable temperature; if yours does not, multiply the 20°C R1+R2 by 1.20 before adding to Ze.',
              },
              {
                question:
                  'I forgot the temporary L–CPC link and re-energised the circuit. The MCB tripped. What now?',
                answer:
                  'Treat it as an investigation, not a reset. Open the board, remove the link, and inspect the link conductor and the L/CPC terminals it touched for arcing, weld-on, or damage. Confirm the MCB still operates correctly with a trip test (Reg 643.7 / 643.8). If the L conductor at the board shows any visible damage, replace the affected length. The MCB doing its job is not a reason to skip the inspection — magnetic trips can leave fused contacts that fail to open at the next overcurrent.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Continuity (R1+R2) — Module 3.1" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/inspection-testing/module-3/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Ring final continuity (r1, r2, rn)
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

export default InspectionTestingModule3Section1;
