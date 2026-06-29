/**
 * Module 3 · Section 3 · Subsection 1 — Single-phase vs three-phase supplies (AC 2.7, 2.8)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.7, 2.8
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 6.4
 *   AC 6.4 — "describe the main characteristics of single phase, three phase and three phase + neutral
 *             electrical supplies, earth fault loop path, star and delta connections"
 *
 * Why 3-phase exists, what star and delta look like, the earth-fault loop path, and the
 * three line voltages 120° apart that everything else in §3 builds on.
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
  VideoList,
} from '@/components/study-centre/learning';
import { ThreePhaseWave, EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Single-phase vs three-phase supplies | Level 3 Module 3.3.1 | Elec-Mate';
const DESCRIPTION =
  "Three sine waves 120° apart. Star (with neutral) vs delta. Earth-fault loop path. Why a balanced 3-phase load doesn't need a neutral.";

const checks = [
  {
    id: 'l3-m3-3-1-line-phase',
    question:
      'In a 400 V star-connected 3-phase system, the phase voltage (line to neutral) is:',
    options: [
      '230 V',
      '240 V',
      '693 V',
      '400 V',
    ],
    correctIndex: 0,
    explanation:
      'V_phase = V_line / √3 = 400 / 1.732 = 230.9 V ≈ 230 V. That is why every UK 3-phase install gives 230 V single-phase between any line and the neutral.',
  },
  {
    id: 'l3-m3-3-1-delta',
    question:
      'In a delta-connected 3-phase system with line voltage 400 V, the phase voltage is:',
    options: [
      '230 V',
      '693 V',
      'Zero',
      '400 V',
    ],
    correctIndex: 3,
    explanation:
      'In delta, each winding sits across a line-to-line pair, so phase voltage = line voltage = 400 V. There is no neutral connection in a true delta.',
  },
  {
    id: 'l3-m3-3-1-rotation',
    question:
      'A 3-phase motor running anticlockwise. To reverse it you should:',
    options: [
      'Increase the supply frequency to the motor',
      'Swap any two of the three line connections',
      'Disconnect and re-connect the neutral conductor',
      'Reduce the supply voltage to all three lines',
    ],
    correctIndex: 1,
    explanation:
      "Swap any two lines (e.g. L1↔L2). That reverses the phase rotation, reverses the rotating field, and reverses the rotor. Reversing all three would have no effect — same direction.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'UK three-phase mains is supplied at:',
    options: [
      '110/220 V 60 Hz',
      '230/400 V 50 Hz',
      '400/690 V 50 Hz',
      '230/400 V 60 Hz',
    ],
    correctAnswer: 1,
    explanation: '230 V phase to neutral, 400 V line to line, 50 Hz in the UK and Europe.',
  },
  {
    id: 2,
    question: 'Three-phase line voltages are spaced:',
    options: [
      '60° apart',
      '90° apart',
      '120° apart',
      '180° apart',
    ],
    correctAnswer: 2,
    explanation:
      'Each phase is 120° (one third of a cycle) ahead of the next. At any instant the three voltages sum to zero — which is why a balanced 3-phase load doesn\'t need a neutral.',
  },
  {
    id: 3,
    question: 'Star connection means each phase winding is connected:',
    options: [
      'Across two of the three line conductors',
      'In a closed loop with no common point',
      'Directly between two adjacent phase windings',
      'Between a line and a common neutral point',
    ],
    correctAnswer: 3,
    explanation: 'Star (Y, "wye"): each winding connects from a line to a common neutral (star) point.',
  },
  {
    id: 4,
    question: 'Delta connection means the three windings form:',
    options: [
      'A closed triangle, each winding between two lines',
      'Three windings joined at a common neutral point',
      'A single winding tapped at three equal points',
      'Three separate windings with no interconnection',
    ],
    correctAnswer: 0,
    explanation: 'Delta (Δ): each winding sits between two of the three lines, forming a triangle.',
  },
  {
    id: 5,
    question: 'For a balanced star-connected load, the neutral current is:',
    options: [
      'Equal to one line current',
      'Zero',
      'Three times line current',
      'Maximum',
    ],
    correctAnswer: 1,
    explanation:
      'Three equal currents 120° apart sum to zero. That is why a balanced load can run with a single 3-phase 4-wire supply or even a 3-wire delta connection.',
  },
  {
    id: 6,
    question: 'Most UK industrial loads (motors, distribution) use:',
    options: [
      'Single-phase 230 V two-wire only',
      'Corner-earthed delta with no neutral',
      '3-phase star with neutral',
      'High-voltage DC distribution',
    ],
    correctAnswer: 2,
    explanation:
      'Star with neutral (TN-S, TN-C-S, TT) is dominant for distribution because it gives access to both 230 V single-phase and 400 V three-phase from the same supply.',
  },
  {
    id: 7,
    question: 'The earth-fault loop path on a TN-S system runs from:',
    options: [
      'Fault → CPC → MET → installation earth electrode → general mass of earth → faulty phase',
      'Fault → neutral conductor → consumer unit → meter tails → faulty phase',
      'Fault → CPC → combined PEN conductor → cut-out only → faulty phase',
      'Fault → CPC → MET → cable sheath/earth conductor → transformer star point → faulty phase',
    ],
    correctAnswer: 3,
    explanation:
      "TN-S: fault current returns through the dedicated PE conductor (cable sheath / armour) to the supply transformer's star point. That low-impedance path is what enables the protective device to operate inside the disconnection time.",
  },
  {
    id: 8,
    question: 'Phase rotation matters for:',
    options: [
      '3-phase motors and synchronous generators',
      'Single-phase resistive heating loads',
      'Battery-backed emergency lighting circuits',
      'Domestic ring final socket circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Direction of rotation depends on phase sequence (RYB or RBY). Critical for motors, alternators, paralleling supplies and any connection between two 3-phase systems.',
  },
];

const faqs = [
  {
    question: 'Why three phases instead of two or four?',
    answer:
      "Three is the minimum that gives you a smooth rotating magnetic field for motors and a constant total power flow. Two-phase wastes copper; four-phase gains nothing. Three is the engineering optimum and has been the global standard since around 1900.",
  },
  {
    question: 'Why is √3 always in the 3-phase formulas?',
    answer:
      "√3 ≈ 1.732 comes from the geometry of three vectors 120° apart. The line-to-line voltage is the vector sum of two phase voltages 120° apart, which works out to phase × √3. Same √3 appears in line current and power formulas.",
  },
  {
    question: 'Can I run single-phase loads off a 3-phase supply?',
    answer:
      "Yes — between any line and the neutral you have 230 V single-phase. The trick is to spread the loads evenly across L1, L2, L3 so the neutral doesn't carry a big imbalance current. Sub 3.6 covers neutral current and balancing.",
  },
  {
    question: "What's the difference between TN-S, TN-C-S and TT?",
    answer:
      "TN-S: dedicated earth conductor (cable sheath) all the way to the transformer. TN-C-S (PME): combined neutral-earth in the supply, separated at the cut-out. TT: no DNO earth — installation has its own earth electrode. Each has different earth-fault loop paths and disconnection requirements (BS 7671 §411).",
  },
  {
    question: 'Why does delta have no neutral?',
    answer:
      "Because in delta the three windings form a closed loop with no common point — there's nowhere for a neutral to connect. Used for motor windings, transformer primaries, and balanced 3-phase loads where a neutral isn't needed. Some delta systems have a corner-grounded earth, but not a neutral in the BS 7671 sense.",
  },
  {
    question: "What's a Dyn11 transformer?",
    answer:
      "Vector group code. D = primary delta. y = secondary star. n = secondary neutral brought out. 11 = secondary leads primary by 11 × 30° = 330° (or lags by 30°). Critical when paralleling transformers or connecting to a grid — only same-vector-group transformers can parallel safely.",
  },
];

export default function Sub1() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 1"
            title="Single-phase vs three-phase supplies"
            description="Three sine waves 120° apart. Star with neutral, delta without. The earth-fault loop and why phase rotation matters."
            tone="yellow"
          />

          <TLDR
            points={[
              '3-phase = three sinusoidal voltages, equal magnitude, 120° apart, all at 50 Hz.',
              'Star (Y): each winding from line to common neutral. V_line = √3 × V_phase. UK: 400 V / 230 V.',
              'Delta (Δ): each winding between two lines, no neutral. V_line = V_phase.',
              'A balanced 3-phase load has zero neutral current — vectors sum to zero.',
              'Earth-fault loop path: fault → CPC → MET → cable PE → transformer star point → faulty phase.',
              'Phase rotation L1-L2-L3: swap any two lines reverses motor rotation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why 3-phase exists and how it produces a rotating magnetic field.',
              'Distinguish star and delta connections and calculate the relationship between line and phase quantities.',
              'Describe the earth-fault loop path for TN-S, TN-C-S and TT systems.',
              'Explain phase rotation and how to reverse a 3-phase motor.',
              'State the UK standard supply voltages and frequency.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why three phases</ContentEyebrow>

          <ConceptBlock
            title="Three sine waves, 120° apart"
            plainEnglish="Three voltages, equal in magnitude, each peaking one-third of a cycle after the previous. At any instant they sum to zero — which is why three balanced phase currents cancel in the neutral."
            onSite="Walk into any commercial DB and you'll see L1 (brown), L2 (black), L3 (grey), N (blue), PE (green-yellow). Five conductors carry a 400 V 3-phase supply that you can also tap as 3 × 230 V single-phase."
          >
            <p>
              The three phases of a UK supply, at the instant L1 is at peak (+325 V):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>L1 = +325 V (peak)</li>
              <li>L2 = +325 × cos(120°) = −162.5 V</li>
              <li>L3 = +325 × cos(240°) = −162.5 V</li>
              <li>Sum = +325 − 162.5 − 162.5 = 0 V</li>
            </ul>
            <p>
              That zero sum holds at every instant. Hence balanced 3-phase loads need no neutral
              — the imbalance current is zero. Real loads aren't perfectly balanced, hence the
              neutral is needed in 4-wire star.
            </p>
          </ConceptBlock>

          <ThreePhaseWave />

          <VideoList
            title="Watch — three-phase fundamentals and star/delta calcs"
            videos={[
              {
                url: videos.threePhase.url,
                title: videos.threePhase.title,
                channel: videos.threePhase.channel,
                duration: videos.threePhase.duration,
                topic: 'How three-phase electricity works',
              },
              {
                url: videos.threePhaseCalcs.url,
                title: videos.threePhaseCalcs.title,
                channel: videos.threePhaseCalcs.channel,
                duration: videos.threePhaseCalcs.duration,
                topic: 'Star vs delta — line / phase calcs',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Star and delta connections</ContentEyebrow>

          <ConceptBlock
            title="Star — line to common neutral"
            plainEnglish={"Each of the three windings connects from a line conductor to a common 'star point' (neutral). The supply gives you both line-to-line voltage and line-to-neutral voltage in the same install."}
          >
            <p>For a star connection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V_line = √3 × V_phase</strong>. UK: 400 V line = √3 × 230 V phase.
              </li>
              <li>
                <strong>I_line = I_phase</strong>. The same current flows in line and winding.
              </li>
            </ul>
            <p>
              Almost every UK distribution transformer is star-secondary with the neutral brought
              out. That is how you get 230 V single-phase and 400 V three-phase from one supply.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Delta — closed triangle, no neutral"
            plainEnglish="The three windings form a closed loop. Each winding sits across a line-to-line pair. No central neutral point."
          >
            <p>For a delta connection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>V_line = V_phase</strong>. The winding sees the full line voltage.
              </li>
              <li>
                <strong>I_line = √3 × I_phase</strong>. Each line carries the vector sum of two
                winding currents.
              </li>
            </ul>
            <p>
              Used for motor windings (start in star to limit inrush, then switch to delta for
              full torque — see §5), transformer primaries, and balanced 3-phase industrial loads
              that don't need a neutral.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Earth-fault loop path</ContentEyebrow>

          <ConceptBlock
            title="The path a fault current takes back to the source"
            plainEnglish="A line-to-earth fault has to make a complete loop back to the transformer for current to flow. The lower the impedance of that loop, the bigger the fault current — and the faster the protective device trips."
            onSite="On a TN-C-S (PME) install, the loop is line conductor → fault → CPC → MET → combined PEN conductor in the DNO supply → transformer star point → back into the faulty phase. Typical Z_s = 0.2-0.6 Ω. PSCC at 400 V can be kA."
          >
            <p>For each earthing system:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S:</strong> dedicated PE conductor (cable sheath/armour) returns to the
                star point of the supply transformer. Low Z_s, fast disconnection.
              </li>
              <li>
                <strong>TN-C-S (PME / TN-C-S, also Protective Neutral Bonding under A4:2026):</strong>{' '}
                neutral and earth are combined in the DNO network, separated at the cut-out into
                separate N and PE going to the consumer's DB. Same low Z_s as TN-S.
              </li>
              <li>
                <strong>TT:</strong> installation has its own earth electrode (rod, mat). Loop
                returns through the fault → MET → earth electrode → general earth mass → DNO
                earth. Z_s is much higher (often 100+ Ω); requires RCD for ADS.
              </li>
            </ul>
          </ConceptBlock>

          <EarthingSystemDiagram />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 411.4 (TN system) and 411.5 (TT system)"
            clause="In a TN system, the fault loop impedance Z_s shall be such that disconnection occurs within the time stated in Table 41.1. In a TT system, an RCD shall provide automatic disconnection of supply where the fault loop impedance is too high to operate the overcurrent protective device within the required time."
            meaning={
              <>
                Z_s drives whether ADS works. On TN systems with low Z_s, the overcurrent device
                handles it. On TT systems with high Z_s, the overcurrent device alone won't
                operate fast enough — RCD becomes mandatory. This is the L3 reasoning behind every
                EICR coding decision on TT installations.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Sections 411.4 and 411.5; Table 41.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 521.5.1 (Ferromagnetic enclosures: electromagnetic effects)"
            clause="The conductors of an AC circuit installed in a ferromagnetic enclosure shall be arranged so that all line conductors and the neutral conductor, if any, and the appropriate protective conductor are contained within the same enclosure."
            meaning={
              <>
                Three-phase magnetics in regulation form. Carry one phase through a steel gland
                and the gland heats from induced eddy currents; bring all three phases plus
                neutral and CPC together and the rotating flux cancels. The 120° displacement
                between phases is what makes that cancellation perfect — Reg 521.5.1 is the
                practical consequence of three-phase symmetry on ferrous installation containment.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 521.5.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 521.5.2 (Single-core armoured AC)"
            clause="Single-core cables armoured with steel wire or steel tape shall not be used for an AC circuit."
            meaning={
              <>
                Three-phase single-core feeders are commonly run in non-magnetic cleats or in
                aluminium-armoured cable for exactly this reason: a single-core SWA carrying AC
                develops a continuous induced flux loop in its own steel armour, with significant
                eddy losses and de-rating. The phase rotation and balanced three-phase currents
                still need a non-ferrous return path for stray flux.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 521.5.2."
          />

          <SectionRule />

          <ContentEyebrow>Phase rotation</ContentEyebrow>

          <ConceptBlock
            title="L1 → L2 → L3 sets the direction"
            plainEnglish="The order in which the three phases reach their peak determines the direction a rotating magnetic field spins — and therefore the direction every 3-phase motor turns. Reverse any two phases and the rotation reverses."
            onSite="On a permanently connected motor, you don't get to swap leads in a hurry. Use a phase-rotation tester before connecting, set it on the supply terminals, observe the indication, and connect the motor to match its expected rotation. Some industrial drives have a phase-detect input that locks the drive out if rotation is wrong."
          >
            <p>
              Critical applications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>3-phase motors</strong> — wrong rotation = wrong direction = pump runs
                dry, conveyor reverses, fan blows the wrong way.
              </li>
              <li>
                <strong>Synchronous machines (alternators, large motors)</strong> — must match
                grid rotation before paralleling, or destructive currents flow at the moment of
                synchronisation.
              </li>
              <li>
                <strong>Cross-connected supplies</strong> — generator changeover, two
                transformer feeders. Rotation must match before any switch closes between them.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <CommonMistake
            title={"Treating a 3-phase + N install as 'three single-phase circuits'"}
            whatHappens={
              <>
                Apprentice wires a small 3-phase DB by connecting three groups of single-phase
                circuits, all on L1, then L2, then L3. The neutral conductor is sized for one
                single-phase circuit's current. Customer turns on a heavy load on L1, and the
                neutral overheats — because the 3-phase install was never balanced.
              </>
            }
            doInstead={
              <>
                Spread loads roughly evenly across L1, L2 and L3. Size the neutral for the worst
                imbalance (usually one phase loaded fully, others empty). With heavy non-linear
                loads (LED, VFD) the neutral may need to be UPSIZED — Sub 3.6 covers this. Always
                think about the whole 3-phase set, not three independent circuits.
              </>
            }
          />

          <Scenario
            title="Connecting a new 3-phase 18 kW boiler"
            situation={
              <>
                Customer has commissioned a 3-phase 18 kW oil/electric boiler. Comes with a
                star-connected element block. Supply is 400 V 3-phase + N + E. What current does
                each line draw, what cable size, and what protective device?
              </>
            }
            whatToDo={
              <>
                For a balanced star load: I_line = P / (√3 × V_line) = 18000 / (1.732 × 400) =
                26 A per line.
                <br />
                Cable: 6 mm² 3-core+E SWA gives Iz ≈ 38 A clipped, derate for grouping/ambient.
                Plenty of margin.
                <br />
                Protection: 32 A 3-pole MCB type C (some inrush from heater contactors).
                Disconnection: TN-S with Z_s &lt; 1 Ω easily achieves 0.4 s required for 32 A
                circuit.
                <br />
                Neutral: balanced load = no neutral current in steady state. Only sized for
                imbalance during element switching — same CSA as line is fine.
              </>
            }
            whyItMatters={
              <>
                The maths chain (P → I_line via √3 → cable size → Z_s check) is identical for
                every 3-phase load. Get the √3 in the right place and everything follows. Forget
                it and you over- or under-size by 73 %.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Apprentice depth — picking it up on site</ContentEyebrow>

          <ConceptBlock
            title="Reading the L1/L2/L3 colour code on a UK install"
            plainEnglish="UK harmonised colours: L1 brown, L2 black, L3 grey, N blue, PE green-yellow. Pre-2004 installs: L1 red, L2 yellow, L3 blue, N black, PE green-yellow."
            onSite="On a refurb you may see both colour sets in the same DB — old subdistribution feeding new tails. The risk is mistaking old blue (line) for new blue (neutral). Always test before you trust the colour. BS 7671 §514.4 requires a warning notice at every interface where mixed colours appear."
          >
            <p>
              The harmonisation came in March 2004 (BS 7671 Amendment 2). Anything wired before
              then uses the old British colours. Critical implications:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Old <strong>blue</strong> = line conductor (≈ new L3 grey).
              </li>
              <li>
                Old <strong>black</strong> = neutral (≈ new L2 line).
              </li>
              <li>
                Confusing the two on a 3-phase install means you connect 230 V N to a 400 V line
                terminal — instant flash, possible fatality.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why DNOs prefer star-secondary distribution"
            plainEnglish="The 11 kV / 400 V transformer at the substation is almost always Dyn11: delta on the 11 kV side, star with neutral on the 400 V side. Star gives the LV network a stable neutral that can be earthed and brought to every domestic customer."
            onSite="If you ever spot a no-neutral DNO supply (rare in the UK — common in some industrial sites with corner-grounded delta), a single line-to-earth fault will not draw fault current through the transformer star point because there isn't one. ADS won't operate the same way — protection design has to use earth fault detection through CT residual."
          >
            <p>
              Why star wins for distribution:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Neutral can be earthed at the source (TN-S, TN-C-S) — defines fault loop.</li>
              <li>Customer gets 230 V single-phase from any line-to-neutral pair.</li>
              <li>Imbalance currents return through the neutral, not the earth path.</li>
              <li>Insulation only stressed to phase voltage (230 V), not line voltage (400 V).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Spotting which earthing system you are on"
            plainEnglish="The DNO's terminal block at the cut-out tells you straight away. TN-S = separate earth lug coming off the cable sheath. TN-C-S (PME) = combined PEN with a label saying 'Protective Multiple Earthing' or now 'PNB' under A4:2026. TT = no DNO earth terminal at all — installation has its own rod."
            onSite="On an EICR, take 30 seconds to confirm the system before you start. Mis-identifying TT as TN-C-S means you under-spec the RCD strategy and may fail to meet 5-second disconnection — coded C2 at minimum, possibly C1 if it endangers life."
          >
            <p>
              Quick visual checks at the intake:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S:</strong> two separate cables enter the cut-out — one neutral, one
                earth (often a lug clamped to the cable sheath/lead).
              </li>
              <li>
                <strong>TN-C-S (PME / PNB):</strong> single combined PEN cable enters; PME label
                or warning notice present; main earthing conductor links to the cut-out earth
                terminal alongside the neutral block.
              </li>
              <li>
                <strong>TT:</strong> no earth at all from DNO; main earthing conductor runs OUT
                of the building to a rod or mat. RCD upstream of every final circuit is mandatory.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              '3-phase = three voltages 120° apart. Sum is zero at every instant.',
              'Star: V_line = √3 × V_phase; I_line = I_phase. UK 400/230 V.',
              'Delta: V_line = V_phase; I_line = √3 × I_phase. No neutral.',
              'Balanced 3-phase load = zero neutral current.',
              "Earth-fault loop: TN-S/TN-C-S use cable PE; TT uses earth electrode plus RCD.",
              'Phase rotation reverses by swapping any two lines — critical for motors and paralleling.',
              'BS 7671 §411 sets disconnection times based on Z_s for each earthing arrangement.',
            ]}
          />

          <Quiz title="Three-phase fundamentals knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 2
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Star and delta calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
