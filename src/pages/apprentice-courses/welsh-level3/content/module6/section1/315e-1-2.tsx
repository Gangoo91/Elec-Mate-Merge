/**
 * Ported from the English course, combining:
 *   level3/module3/section3/Sub1.tsx
 *   level2/module3/section5/Sub3.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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
  VideoCard,
} from '@/components/study-centre/learning';
import { ThreePhaseWave, EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';

const DESCRIPTION =
  "Three sine waves 120° apart. Star (with neutral) vs delta. Earth-fault loop path. Why a balanced 3-phase load doesn't need a neutral.";

const checks = [
  {
    id: 'l3-m3-3-1-line-phase',
    question: 'In a 400 V star-connected 3-phase system, the phase voltage (line to neutral) is:',
    options: ['230 V', '240 V', '693 V', '400 V'],
    correctIndex: 0,
    explanation:
      'V_phase = V_line / √3 = 400 / 1.732 = 230.9 V ≈ 230 V. That is why every UK 3-phase install gives 230 V single-phase between any line and the neutral.',
  },
  {
    id: 'l3-m3-3-1-delta',
    question: 'In a delta-connected 3-phase system with line voltage 400 V, the phase voltage is:',
    options: ['230 V', '693 V', 'Zero', '400 V'],
    correctIndex: 3,
    explanation:
      'In delta, each winding sits across a line-to-line pair, so phase voltage = line voltage = 400 V. There is no neutral connection in a true delta.',
  },
  {
    id: 'l3-m3-3-1-rotation',
    question: 'A 3-phase motor running anticlockwise. To reverse it you should:',
    options: [
      'Increase the supply frequency to the motor',
      'Swap any two of the three line connections',
      'Disconnect and re-connect the neutral conductor',
      'Reduce the supply voltage to all three lines',
    ],
    correctIndex: 1,
    explanation:
      'Swap any two lines (e.g. L1↔L2). That reverses the phase rotation, reverses the rotating field, and reverses the rotor. Reversing all three would have no effect — same direction.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'UK three-phase mains is supplied at:',
    options: ['110/220 V 60 Hz', '230/400 V 50 Hz', '400/690 V 50 Hz', '230/400 V 60 Hz'],
    correctAnswer: 1,
    explanation: '230 V phase to neutral, 400 V line to line, 50 Hz in the UK and Europe.',
  },
  {
    id: 2,
    question: 'Three-phase line voltages are spaced:',
    options: ['60° apart', '90° apart', '120° apart', '180° apart'],
    correctAnswer: 2,
    explanation:
      "Each phase is 120° (one third of a cycle) ahead of the next. At any instant the three voltages sum to zero — which is why a balanced 3-phase load doesn't need a neutral.",
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
    explanation:
      'Star (Y, "wye"): each winding connects from a line to a common neutral (star) point.',
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
    options: ['Equal to one line current', 'Zero', 'Three times line current', 'Maximum'],
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
      'Three is the minimum that gives you a smooth rotating magnetic field for motors and a constant total power flow. Two-phase wastes copper; four-phase gains nothing. Three is the engineering optimum and has been the global standard since around 1900.',
  },
  {
    question: 'Why is √3 always in the 3-phase formulas?',
    answer:
      '√3 ≈ 1.732 comes from the geometry of three vectors 120° apart. The line-to-line voltage is the vector sum of two phase voltages 120° apart, which works out to phase × √3. Same √3 appears in line current and power formulas.',
  },
  {
    question: 'Can I run single-phase loads off a 3-phase supply?',
    answer:
      "Yes — between any line and the neutral you have 230 V single-phase. The trick is to spread the loads evenly across L1, L2, L3 so the neutral doesn't carry a big imbalance current. The lesson on neutral current in a three-phase star connected system covers neutral current and balancing.",
  },
  {
    question: "What's the difference between TN-S, TN-C-S and TT?",
    answer:
      'TN-S: dedicated earth conductor (cable sheath) all the way to the transformer. TN-C-S (PME): combined neutral-earth in the supply, separated at the cut-out. TT: no DNO earth — installation has its own earth electrode. Each has different earth-fault loop paths and disconnection requirements (BS 7671 §411).',
  },
  {
    question: 'Why does delta have no neutral?',
    answer:
      "Because in delta the three windings form a closed loop with no common point — there's nowhere for a neutral to connect. Used for motor windings, transformer primaries, and balanced 3-phase loads where a neutral isn't needed. Some delta systems have a corner-grounded earth, but not a neutral in the BS 7671 sense.",
  },
  {
    question: "What's a Dyn11 transformer?",
    answer:
      'Vector group code. D = primary delta. y = secondary star. n = secondary neutral brought out. 11 = secondary leads primary by 11 × 30° = 330° (or lags by 30°). Critical when paralleling transformers or connecting to a grid — only same-vector-group transformers can parallel safely.',
  },
];

const checks2 = [
  {
    id: 'm3s5s3-three-to-single-phase',
    question:
      'A 400 V three-phase distribution transformer feeds a row of houses. The single-phase 230 V supply at each house is derived by:',
    options: [
      'Fitting a small step-down transformer at each property to drop 400 V to 230 V',
      'Connecting one phase conductor and the neutral (line-to-neutral = 400 / √3 ≈ 230 V)',
      'Connecting two phase conductors together (phase-to-phase ÷ 2 = 200 V)',
      'Rectifying the three-phase supply to DC and then inverting it back to single-phase',
    ],
    correctIndex: 1,
    explanation:
      'No second transformer needed. A 400 V three-phase secondary winding has a star (Y) point that becomes the neutral. Line-to-line voltage is 400 V, line-to-neutral is 400 / √3 ≈ 230 V. Each house gets one phase conductor + the shared neutral. Houses are spread evenly across the three phases to balance the load on the transformer.',
  },
  {
    id: 'm3s5s3-esqcr-envelope',
    question:
      'An electrician measures 248 V at a domestic socket using a calibrated meter. Is this within the statutory envelope set by ESQCR?',
    options: [
      'No — 248 V exceeds the +6% upper limit, so the DNO is in breach',
      'No — the legal limit is a symmetric ±6%, giving 216 V to 244 V',
      'It cannot be judged without also measuring the supply frequency',
      'Yes — the legal envelope at the supply terminals is 230 V −6% / +10%, which gives 216 V to 253 V',
    ],
    correctIndex: 3,
    explanation:
      'ESQCR Reg. 27 sets the supply envelope at the consumer’s terminals as 230 V nominal with −6% / +10% tolerance. That gives a legal range of 216 V to 253 V. 248 V is high but well within tolerance. Only readings outside that envelope would be a regulatory breach by the DNO.',
  },
  {
    id: 'm3s5s3-typical-street-transformer',
    question:
      'The pole-mounted or pad-mounted distribution transformer that feeds your street typically steps down from:',
    options: [
      '11 kV to 400 V three-phase / 230 V single-phase',
      '33 kV to 11 kV three-phase',
      '400 kV to 132 kV three-phase',
      '230 V single-phase to 400 V three-phase',
    ],
    correctIndex: 0,
    explanation:
      'The standard UK street-level transformer is 11 kV / 400 V three-phase. Pole-mounted in rural areas, ground-mounted (pad-mount) or in a brick kiosk in towns. Typical capacity 200–800 kVA, feeding 50–200 properties. Above this is 33 kV at the primary substation; below it is your meter tails.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: 'In order from highest to lowest, the principal UK distribution voltages are:',
    options: [
      '11 kV → 33 kV → 400 V → 230 V',
      '33 kV → 11 kV → 400 V → 230 V',
      '400 V → 230 V → 11 kV → 33 kV',
      '132 kV → 33 kV → 230 V → 11 kV',
    ],
    correctAnswer: 1,
    explanation:
      'Distribution starts at the grid supply point (132 kV in many regions) and steps down through 33 kV (primary distribution — town-scale), 11 kV (secondary distribution — street-scale), to 400 V three-phase / 230 V single-phase at the consumer cut-out.',
  },
  {
    id: 2,
    question:
      'Why is the relationship between the 400 V three-phase line-to-line voltage and the 230 V single-phase line-to-neutral voltage equal to √3?',
    options: [
      'Because the three phases are spaced 90° apart, and the cosine of 90° gives the √3 factor',
      'Because the neutral carries √3 times the phase current, which sets the voltage ratio',
      'Because in a balanced star (Y) connected three-phase system, the line-to-line voltage is the vector sum of two line-to-neutral voltages 120° apart, which works out as √3 × line-to-neutral',
      'Because the transformer turns ratio is fixed at √3 to 1 by the manufacturer',
    ],
    correctAnswer: 2,
    explanation:
      'It’s pure trigonometry. Two phasors of equal length at 120° to each other add (vectorially) to a phasor of length √3 times either of them. Line-to-line = √3 × line-to-neutral. So 400 / √3 = 230.94 ≈ 230, and 230 × √3 = 398.4 ≈ 400. The numbers are rounded for the nominal supply standard.',
  },
  {
    id: 3,
    question: 'An electrician working in central London is more likely to deal with which DNO?',
    options: [
      'SP Energy Networks',
      'Northern Powergrid',
      'Western Power Distribution / National Grid Electricity Distribution',
      'UK Power Networks',
    ],
    correctAnswer: 3,
    explanation:
      'UK Power Networks owns and operates the distribution networks for London, the South East and the East of England. There are six DNO regions in GB: UK Power Networks (London/SE/East), SSEN (Scottish + Southern), SP Energy Networks (Central Scotland + Merseyside/N Wales), Northern Powergrid (Yorkshire/North East), Electricity North West (Greater Manchester/Cumbria), and National Grid Electricity Distribution (Midlands/SW/Wales — formerly WPD).',
  },
  {
    id: 4,
    question: 'The DNO cut-out (the sealed fuse on the supply side of the meter) is owned by:',
    options: [
      'The Distribution Network Operator (DNO)',
      'The Meter Operator (MOP)',
      'The energy supplier',
      'The customer',
    ],
    correctAnswer: 0,
    explanation:
      'The cut-out is the DNO’s last bit of kit before the supply enters the customer’s installation. It contains the BS 1361 (or HRC) fuse that limits fault current entering the property. The seal is the DNO’s — never break it. The meter (downstream) is the MOP’s. Everything from the consumer side of the meter is the customer’s. Three different ownerships in a few centimetres of cable.',
  },
  {
    id: 5,
    question: 'In the UK, the typical declared single-phase nominal supply voltage is:',
    options: ['240 V', '230 V', '250 V', '220 V'],
    correctAnswer: 1,
    explanation:
      '230 V is the harmonised European nominal (BS 7671 and ESQCR both adopt it). The UK historically declared 240 V; mainland Europe declared 220 V. They were harmonised in 1995 to a single 230 V nominal with an asymmetric tolerance band (−6% / +10%) wide enough to cover both old standards. Most UK supplies still measure at 240–245 V because the original 240 V transformers are still in service.',
  },
  {
    id: 6,
    question:
      'The reason ESQCR uses an ASYMMETRIC tolerance (−6% / +10%) rather than ±8% on the 230 V nominal is:',
    options: [
      'To give more headroom on the low side because long rural feeders always sag below nominal',
      'To match the asymmetric tolerance already used on the 400 kV transmission system',
      'To accommodate the old UK 240 V supplies (which are 240/230 = 1.043, just under +5%) without requiring transformer replacement, while still covering the old continental 220 V (−4.3%)',
      'Because solar PV export only ever pushes the voltage up, never down, so the +10% is purely for that',
    ],
    correctAnswer: 2,
    explanation:
      'It was a political fudge to harmonise UK and continental standards in 1995 without anyone having to physically retap their transformers. The −6% / +10% envelope on a 230 V nominal covers everything from 216 V (the old 220 V −2%) up to 253 V (the old 240 V +5.4%). Both legacy systems are legal under the new standard. It’s the only place in the regs where you can see the seam between the old and the new still showing.',
  },
  {
    id: 7,
    question:
      'A house has a 100 A BS 1361 cut-out fuse. The supply is single-phase 230 V. Maximum continuous load the cut-out will support without nuisance tripping?',
    options: ['About 10 kW', 'About 100 kW', 'About 46 kW', 'About 23 kW'],
    correctAnswer: 3,
    explanation:
      'P = V × I = 230 × 100 = 23,000 W = 23 kW. That sets the upper bound of the load the property can sustain on a typical 100 A single-phase service. New EV chargers, heat pumps, induction hobs and electric showers can push close to this in winter — which is why DNOs are increasingly upgrading 60 A and 80 A services to 100 A or to three-phase 100 A per phase (~69 kW).',
  },
  {
    id: 8,
    question: 'Where exactly does BS 7671 take over from ESQCR in the supply chain?',
    options: [
      'At the consumer side of the supply terminals (the output terminals of the meter / the consumer unit)',
      'At the secondary substation, where 11 kV is stepped down to 400 V',
      'At the DNO cut-out fuse, on the supply side of the meter',
      'At the grid supply point, where transmission hands over to distribution',
    ],
    correctAnswer: 0,
    explanation:
      'ESQCR governs everything on the DNO side — service cable, cut-out, meter tails (meter operator side), the meter itself. BS 7671 takes over at the consumer side of the supply, typically the output terminals of the meter or the input to the consumer unit. The boundary is sometimes called the ‘origin of the installation’ in BS 7671 terminology.',
  },
];

const faqs2 = [
  {
    question:
      'Why are some streets supplied at 400 V three-phase and others only 230 V single-phase?',
    answer:
      'Diversity and historical accident. A row of identical houses (built post-war, all small electrical loads) typically got a single-phase 230 V tap from the local 11 kV / 400 V transformer. A row with mixed industry, large heating demand, or houses built later when 400 V three-phase was standard, often got the full three-phase brought down each property’s service cable. Increasingly, new builds get three-phase as standard because the diversity of EV chargers, heat pumps and induction hobs means a single 100 A phase isn’t enough headroom.',
  },
  {
    question: 'Who actually owns the wires under the road on my street?',
    answer:
      'The DNO. There are six DNO companies covering the GB regions, each with a regional monopoly granted by Ofgem. They own the entire low-voltage and 11 kV network, the 33 kV primary substations, the 11 kV / 400 V secondary substations, the service cable up to and including the cut-out at every property. They are paid through the price control framework set by Ofgem (currently RIIO-ED2 running 2023–2028).',
  },
  {
    question:
      'Why is 11 kV the standard secondary distribution voltage and not, say, 10 kV or 15 kV?',
    answer:
      'Historical inheritance from the early 20th century. The Central Electricity Board standardised on 11 kV in the 1930s as the right balance between transformer cost (lower voltage = cheaper transformer) and conductor cost (higher voltage = thinner cable). The same 11 kV tier is used across most of Europe (with regional variants like 10 kV and 6.6 kV existing in pockets). Once the network was built out, no one was going to spend billions changing the standard.',
  },
  {
    question:
      'Can a single house get a three-phase supply, or is that just for industrial premises?',
    answer:
      'Yes — domestic three-phase is increasingly common, especially on new builds with EV chargers, heat pumps and electric showers. The customer or developer pays the DNO for the upgrade (a few thousand pounds typically). The supply comes in as 4-core (3 phase + neutral) instead of 2-core, and the consumer unit is a three-phase board (typically a 100 A switch-disconnector with TP+N MCBs and three-phase RCBOs). Most domestic appliances still run on single-phase, so the loads are split across phases at the CU. Larger loads like a 22 kW EV charger or a 7 kW heat pump can run on three-phase directly.',
  },
  {
    question: 'What does the DNO cut-out actually do?',
    answer:
      'It provides the property’s overcurrent protection at the supply origin. A high-rupturing-capacity (HRC) BS 1361 fuse is sealed inside, sized typically at 60 A, 80 A or 100 A. If the property’s installation faults badly enough — line-earth short, bolted line-neutral fault — the cut-out fuse blows, isolating the house from the network. The fault current available at the cut-out is set by the supply impedance back to the secondary substation; typical values are 1–6 kA for domestic. The seal stops the customer (or the electrician) opening the cut-out and pulling the fuse — which would isolate the meter without the DNO knowing, a data and safety problem.',
  },
  {
    question: 'Why does my voltage measure 245 V when the nominal is 230 V?',
    answer:
      'Two reasons. First, most UK 11 kV / 400 V transformers were originally tapped for 240 V nominal output, and they’ve never been changed — the new 230 V nominal was just an accounting change. Second, DNOs deliberately keep the transformer-end voltage near the upper end of the legal envelope (~250 V) so that voltage drop along the LV feeder still leaves the most distant customer above 216 V. So if you’re close to the secondary substation you see 245–250 V; if you’re half a mile down a rural radial you might see 220 V. Both are legal.',
  },
];

export default function Lesson315E_1_2() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Three sine waves 120° apart. Star with neutral, delta without. The earth-fault loop and
        why phase rotation matters.
      </p>

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
        <p>The three phases of a UK supply, at the instant L1 is at peak (+325 V):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>L1 = +325 V (peak)</li>
          <li>L2 = +325 × cos(120°) = −162.5 V</li>
          <li>L3 = +325 × cos(240°) = −162.5 V</li>
          <li>Sum = +325 − 162.5 − 162.5 = 0 V</li>
        </ul>
        <p>
          That zero sum holds at every instant. Hence balanced 3-phase loads need no neutral — the
          imbalance current is zero. Real loads aren't perfectly balanced, hence the neutral is
          needed in 4-wire star.
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
        plainEnglish={
          "Each of the three windings connects from a line conductor to a common 'star point' (neutral). The supply gives you both line-to-line voltage and line-to-neutral voltage in the same install."
        }
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
          Almost every UK distribution transformer is star-secondary with the neutral brought out.
          That is how you get 230 V single-phase and 400 V three-phase from one supply.
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
          Used for motor windings (start in star to limit inrush, then switch to delta for full
          torque — see §5), transformer primaries, and balanced 3-phase industrial loads that
          don't need a neutral.
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
            <strong>TT:</strong> installation has its own earth electrode (rod, mat). Loop returns
            through the fault → MET → earth electrode → general earth mass → DNO earth. Z_s is
            much higher (often 100+ Ω); requires RCD for ADS.
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
            handles it. On TT systems with high Z_s, the overcurrent device alone won't operate
            fast enough — RCD becomes mandatory. This is the L3 reasoning behind every EICR coding
            decision on TT installations.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026 — Sections 411.4 and 411.5; Table 41.1."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 521.5.1 (Ferromagnetic enclosures: electromagnetic effects)"
        clause="The conductors of an AC circuit installed in a ferromagnetic enclosure shall be arranged so that all line conductors and the neutral conductor, if any, and the appropriate protective conductor are contained within the same enclosure."
        meaning={
          <>
            Three-phase magnetics in regulation form. Carry one phase through a steel gland and
            the gland heats from induced eddy currents; bring all three phases plus neutral and
            CPC together and the rotating flux cancels. The 120° displacement between phases is
            what makes that cancellation perfect — Reg 521.5.1 is the practical consequence of
            three-phase symmetry on ferrous installation containment.
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
            develops a continuous induced flux loop in its own steel armour, with significant eddy
            losses and de-rating. The phase rotation and balanced three-phase currents still need
            a non-ferrous return path for stray flux.
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
        <p>Critical applications:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>3-phase motors</strong> — wrong rotation = wrong direction = pump runs dry,
            conveyor reverses, fan blows the wrong way.
          </li>
          <li>
            <strong>Synchronous machines (alternators, large motors)</strong> — must match grid
            rotation before paralleling, or destructive currents flow at the moment of
            synchronisation.
          </li>
          <li>
            <strong>Cross-connected supplies</strong> — generator changeover, two transformer
            feeders. Rotation must match before any switch closes between them.
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
            single-phase circuit's current. Customer turns on a heavy load on L1, and the neutral
            overheats — because the 3-phase install was never balanced.
          </>
        }
        doInstead={
          <>
            Spread loads roughly evenly across L1, L2 and L3. Size the neutral for the worst
            imbalance (usually one phase loaded fully, others empty). With heavy non-linear loads
            (LED, VFD) the neutral may need to be UPSIZED — the lesson on neutral current in a
            three-phase star connected system covers this. Always think
            about the whole 3-phase set, not three independent circuits.
          </>
        }
      />

      <Scenario
        title="Connecting a new 3-phase 18 kW boiler"
        situation={
          <>
            Customer has commissioned a 3-phase 18 kW oil/electric boiler. Comes with a
            star-connected element block. Supply is 400 V 3-phase + N + E. What current does each
            line draw, what cable size, and what protective device?
          </>
        }
        whatToDo={
          <>
            For a balanced star load: I_line = P / (√3 × V_line) = 18000 / (1.732 × 400) = 26 A
            per line.
            <br />
            Cable: 6 mm² 3-core+E SWA gives Iz ≈ 38 A clipped, derate for grouping/ambient. Plenty
            of margin.
            <br />
            Protection: 32 A 3-pole MCB type C (some inrush from heater contactors).
            Disconnection: TN-S with Z_s &lt; 1 Ω easily achieves 0.4 s required for 32 A circuit.
            <br />
            Neutral: balanced load = no neutral current in steady state. Only sized for imbalance
            during element switching — same CSA as line is fine.
          </>
        }
        whyItMatters={
          <>
            The maths chain (P → I_line via √3 → cable size → Z_s check) is identical for every
            3-phase load. Get the √3 in the right place and everything follows. Forget it and you
            over- or under-size by 73 %.
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
          The harmonisation came in March 2004 (BS 7671 Amendment 2). Anything wired before then
          uses the old British colours. Critical implications:
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
        <p>Why star wins for distribution:</p>
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
        <p>Quick visual checks at the intake:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>TN-S:</strong> two separate cables enter the cut-out — one neutral, one earth
            (often a lug clamped to the cable sheath/lead).
          </li>
          <li>
            <strong>TN-C-S (PME / PNB):</strong> single combined PEN cable enters; PME label or
            warning notice present; main earthing conductor links to the cut-out earth terminal
            alongside the neutral block.
          </li>
          <li>
            <strong>TT:</strong> no earth at all from DNO; main earthing conductor runs OUT of the
            building to a rod or mat. RCD upstream of every final circuit is mandatory.
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
          'Earth-fault loop: TN-S/TN-C-S use cable PE; TT uses earth electrode plus RCD.',
          'Phase rotation reverses by swapping any two lines — critical for motors and paralleling.',
          'BS 7671 §411 sets disconnection times based on Z_s for each earthing arrangement.',
        ]}
      />

      <Quiz title="Three-phase fundamentals knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        From the transmission grid to your CU is the distribution network. Four voltage tiers
        between you and 132 kV — 33 kV, 11 kV, 400 V three-phase and 230 V single-phase — each
        with its own purpose, all owned and operated by the regional DNO.
      </p>

      <TLDR
        points={[
          'Distribution starts at the grid supply point and steps down through 33 kV (primary, town-scale) → 11 kV (secondary, street-scale) → 400 V three-phase / 230 V single-phase at the consumer cut-out.',
          'Single-phase 230 V is derived from three-phase 400 V by tapping one phase + neutral. The √3 in the maths comes straight out of phasor geometry: 400 / √3 ≈ 230.',
          'ESQCR Reg. 27 sets a −6% / +10% envelope on the declared 230 V nominal — meaning your supply must be between 216 V and 253 V. The DNO is responsible for keeping it inside that envelope; BS 7671 takes over from the consumer side of the meter.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the four UK distribution voltages: 33 kV, 11 kV, 400 V three-phase, 230 V single-phase.',
          'Explain why 400 / √3 = 230, deriving single-phase from a balanced three-phase star (Y) system.',
          'State the function of the primary substation (33/11 kV) and the secondary substation (11 kV / 400 V).',
          'Identify the ESQCR statutory envelope for declared voltage at the supply terminals (−6% / +10%).',
          'Recognise the role of the DNO and identify the GB DNO regions.',
          'Identify the boundary between the DNO network and the customer’s installation at the cut-out / meter.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The four distribution tiers</ContentEyebrow>

      <ConceptBlock
        title="33 kV — primary distribution (town-scale)"
        plainEnglish="The voltage that arrives at the primary substation on the edge of every town. 33 kV cable (overhead or underground) leaves the grid supply point and feeds the primary substation, which steps it down to 11 kV for distribution within the town."
        onSite="Primary substations are usually fenced compounds with one or two large oil-filled transformers, switchgear cabinets, and outdoor disconnect switches. You’ll see them on the outskirts of every town, often near an industrial estate. Capacity is typically 30–60 MVA per transformer."
      >
        <p>
          33 kV is the upper distribution voltage in most of the GB network. It takes power from
          the grid supply point (where 132 kV / 275 kV / 400 kV transmission steps down) and
          distributes it across an area roughly the size of a small town or a section of a city.
        </p>
        <p>
          Three-phase, of course (everything in distribution is three-phase until you tap off
          single-phase at the very end). Carried on smaller pylons (8–15 m) or on wood poles in
          rural areas, with single-conductor phases held on porcelain or polymer insulators. In
          urban areas it goes underground in PILC (paper-insulated lead-covered) or modern XLPE
          cable.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="11 kV — secondary distribution (street-scale)"
        plainEnglish="The voltage that runs from the primary substation around the streets, feeding the small transformers that supply each block of houses or each industrial unit. The most common ‘seen on a pole’ voltage in the UK."
        onSite="The pole-mounted transformer cans you see in every rural village and the brick or GRP kiosk transformers in every housing estate are 11 kV / 400 V. They are typically 200–800 kVA and feed 50–200 properties each. The 11 kV cable arrives, the 400 V three-phase / 230 V single-phase leaves to the houses."
      >
        <p>
          11 kV is the workhorse distribution voltage. From the primary substation, 11 kV feeders
          run as overhead lines on wooden poles in rural areas (the famous ‘three-wire crucifix’
          pattern on a single cross-arm) and as underground cables in urban and suburban areas.
          The feeder loops or radials reach every street.
        </p>
        <p>
          At intervals along the feeder — every few hundred metres in dense urban areas, up to a
          kilometre or more in rural — there’s a secondary substation. The most visible kit on the
          network. Three forms:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Pole-mounted transformer (PMT).</strong> A galvanised steel can hung between
            two poles, with the 11 kV coming in on a cross-arm above and the 400 V three-phase
            coming out on a smaller cross-arm below. Common in rural areas. Typically 50–315 kVA.
          </li>
          <li>
            <strong>Ground-mounted (pad-mount) transformer.</strong> A sealed metal cabinet (or in
            older installs, a brick housing) with the transformer + LV fusegear inside. Common in
            towns and modern housing estates. Typically 315–800 kVA.
          </li>
          <li>
            <strong>Indoor substation.</strong> A brick building with the transformer and
            switchgear inside, used where the load is large enough to need a 1–2 MVA unit — flats,
            supermarkets, small industrial estates.
          </li>
        </ul>
        <p>
          The secondary substation is the boundary between the 11 kV network (DNO MV) and the 400
          V network (DNO LV). Power crosses one transformer here and emerges at the voltage you
          actually work with.
        </p>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <SectionRule />

      <ContentEyebrow>How three-phase becomes single-phase</ContentEyebrow>

      <ConceptBlock
        title="400 V three-phase and 230 V single-phase — same supply, two ways to measure it"
        plainEnglish="A 400 V three-phase distribution transformer has three secondary windings connected in a star (Y), with the star point grounded as the neutral. The voltage between any two phase conductors is 400 V. The voltage between any one phase and the neutral is 230 V. They’re not separate supplies — they’re the same set of windings measured between different terminals."
        onSite="Walk up to a TP+N consumer unit on a commercial install. The four busbars are L1, L2, L3, N. Phase-to-phase = 400 V (red-yellow, yellow-blue, blue-red). Phase-to-neutral = 230 V (red-N, yellow-N, blue-N). Single-phase circuits hang off any one phase + the shared neutral. Three-phase loads (motors, heaters) hang off all three phases."
      >
        <p>
          Why is line-to-line voltage exactly √3 times line-to-neutral voltage? It’s pure phasor
          geometry. Each phase voltage is a vector of magnitude V (line-to-neutral). The three
          vectors are 120° apart. The voltage between two phases is the vector difference of the
          two phase vectors — and two vectors of equal length 120° apart subtract to a vector of
          length √3 × V.
        </p>
        <p>So in numbers:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Line-to-neutral:</strong> 230 V (the single-phase domestic supply)
          </li>
          <li>
            <strong>Line-to-line:</strong> 230 × √3 ≈ <strong>398.4 V</strong>, rounded to 400 V
            (the three-phase voltage you measure between any two phase conductors)
          </li>
          <li>
            <strong>Conversely:</strong> 400 / √3 ≈ <strong>230.94 V</strong>, rounded to 230 V
          </li>
        </ul>
        <p>
          The √3 ratio is fundamental to all three-phase calculations — it crops up in power
          formulas (P = √3 × V_LL × I × cos φ), in voltage drop calculations on three-phase
          circuits, and in transformer winding ratios. Burn it in: any time you see a three-phase
          voltage and a single-phase voltage that should be related, divide the bigger by the
          smaller and you should get √3 (1.732).
        </p>
        <p>
          <strong>Load balancing.</strong> A row of single-phase houses fed from one transformer
          is wired so consecutive houses come off different phases — house 1 off phase A, house 2
          off phase B, house 3 off phase C, house 4 off phase A again, and so on. The aim is to
          keep the three phase currents at the transformer roughly equal so the neutral current
          stays small. An unbalanced LV feeder is inefficient and pushes voltage out of spec on
          the heaviest-loaded phase.
        </p>
      </ConceptBlock>

      <VideoCard
        {...videos.threePhase}
        topic="How three-phase electricity works"
        caption="The Engineering Mindset animates the 120° phase relationship and the star-connected secondary that gives you both 400 V line-to-line and 230 V line-to-neutral from the same transformer."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <SectionRule />

      <ContentEyebrow>The statutory voltage envelope</ContentEyebrow>

      <ConceptBlock
        title="Why the legal supply window is 216 V to 253 V (not 207 V to 253 V)"
        plainEnglish="The declared nominal is 230 V single-phase / 400 V three-phase. The legal tolerance is asymmetric: −6% on the bottom and +10% on the top. That gives 216 V to 253 V single-phase. The asymmetry is a fudge from the 1995 European harmonisation that lets the UK keep its old 240 V transformers and the continent keep its old 220 V transformers, all under one ‘harmonised’ 230 V nominal."
      >
        <p>
          Pre-1995, the UK declared 240 V nominal at ±6% (225.6 V to 254.4 V). Mainland Europe
          declared 220 V nominal at ±6% (206.8 V to 233.2 V). When the EU harmonised the standard
          to a single 230 V, an asymmetric tolerance was agreed that covers both legacy bands
          without forcing anyone to change their kit:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Single-phase nominal:</strong> 230 V
          </li>
          <li>
            <strong>Lower limit (−6%):</strong> 216.2 V
          </li>
          <li>
            <strong>Upper limit (+10%):</strong> 253 V
          </li>
          <li>
            <strong>Three-phase nominal:</strong> 400 V (= 230 × √3 rounded up)
          </li>
          <li>
            <strong>Three-phase lower limit:</strong> 376 V
          </li>
          <li>
            <strong>Three-phase upper limit:</strong> 440 V
          </li>
        </ul>
        <p>
          In practice most UK supplies still measure in the 240–248 V range because the
          transformers haven’t been retapped. So the legal +10% upper limit of 253 V is the
          constraint that bites first when you’ve got a lot of solar PV exporting upstream voltage
          rise — which is why PV inverters trip out on overvoltage protection on sunny midday
          peaks.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="ESQCR 2002, Reg. 27 (paraphrased — voltage and frequency tolerances)"
        clause="The voltage of the supply at the supply terminals shall be the declared voltage and shall not vary by more than +10 per cent or −6 per cent of the declared voltage. The frequency of the supply shall not vary from the declared frequency by more than ±1 per cent unless otherwise agreed."
        meaning={
          <>
            This is the single most important regulation for distribution. It binds the DNO to
            deliver, at the consumer’s terminals, a voltage between{' '}
            <strong>216 V and 253 V</strong> single-phase (or 376 V to 440 V three-phase), at a
            frequency between <strong>49.5 Hz and 50.5 Hz</strong>. Persistent breaches are a
            regulatory matter for Ofgem. As an apprentice, your job is to know the envelope and to
            record any out-of-range readings in your test results — not to call the DNO every time
            you see 248 V (which is well within tolerance and entirely normal).
          </>
        }
        cite="Paraphrased; see Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665, as amended), Reg. 27 — full text on legislation.gov.uk."
      />

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <SectionRule />

      <ContentEyebrow>Who owns what — the DNO and the regional map</ContentEyebrow>

      <ConceptBlock
        title="The Distribution Network Operator (DNO) — your point of contact for everything before the cut-out"
        plainEnglish="GB is split into 14 distribution licence areas operated by 6 DNO companies. Each region is a regulated monopoly — one DNO owns and runs all the distribution wires (132 kV and below in England and Wales, 33 kV and below in Scotland) up to and including the consumer cut-out at every property."
        onSite="Know your local DNO and their emergency number. If you find damaged service kit, a leaking transformer kiosk, an exposed conductor, or a customer with no supply that isn’t their internal fault, you call the DNO — not the energy supplier. National emergency number: 105 (free, 24/7, routes to the right DNO automatically)."
      >
        <p>The six GB DNO companies and their regions:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>UK Power Networks</strong> — London, the South East, the East of England.
          </li>
          <li>
            <strong>National Grid Electricity Distribution</strong> (formerly Western Power
            Distribution) — South West, South Wales, the West Midlands, the East Midlands.
          </li>
          <li>
            <strong>Northern Powergrid</strong> — Yorkshire and the North East.
          </li>
          <li>
            <strong>Electricity North West</strong> — Greater Manchester, Lancashire and Cumbria.
          </li>
          <li>
            <strong>SP Energy Networks</strong> — Central and Southern Scotland (SP Distribution)
            and Merseyside / North Wales / Cheshire (SP Manweb).
          </li>
          <li>
            <strong>SSEN Distribution</strong> — Northern Scotland (SHEPD) and Southern England
            including the South Coast (SEPD).
          </li>
        </ul>
        <p>
          Independent Distribution Network Operators (IDNOs) also exist — small private companies
          who own and operate the LV network on new-build housing estates and business parks. The
          DNO ‘owns’ the connection up to the IDNO boundary; the IDNO owns the wires after that.
          From an electrician’s perspective they’re indistinguishable; the cut-out behaves the
          same way and the regulatory regime (ESQCR) is identical.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where the boundary falls</ContentEyebrow>

      <ConceptBlock
        title="The cut-out is the line between ‘their kit’ and ‘your kit’"
        plainEnglish="DNO kit ends at the consumer side of the cut-out (the sealed fuse). Meter Operator (MOP) kit is the meter itself plus the meter tails between cut-out and meter. Customer kit starts at the meter outgoing terminals — that’s where BS 7671 takes over."
        onSite="On a typical domestic setup you’ll see, in this order: incoming service cable (DNO) → cut-out (DNO, sealed) → meter tails (MOP) → meter (MOP) → main isolator + henley blocks (often customer-installed) → meter tails (customer) → consumer unit (customer). Three different ownerships in 30 cm of wall. Never break a DNO seal. Never disturb the meter tails on the MOP side without permission."
      >
        <p>
          The legal-and-physical handover at the cut-out matters because it sets the boundary of
          what the electrician can lawfully touch. The DNO seal on the cut-out is the clear sign —
          break it without authorisation and you’ve committed an offence (theft of electricity is
          the standard charge if any tampering is involved) and you’re also in breach of your own
          scheme membership conditions (NICEIC, NAPIT, ELECSA all require you to leave DNO kit
          alone).
        </p>
        <p>
          When does the electrician legitimately need access to the cut-out? Two main scenarios:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Consumer unit replacement.</strong> Most CU swaps need the cut-out fuse pulled
            to isolate the supply. The DNO (or the MOP under their delegated authority) will
            attend, break the seal, pull the fuse, leave you to do the work, and re-seal
            afterwards. Some DNOs will let approved contractors do it under a withdrawal of
            consent agreement — but only if you’re registered with the scheme and the property is
            on the agreement.
          </li>
          <li>
            <strong>Reporting damage or risk.</strong> A cracked cut-out, a hot smell, a burned
            terminal — call the DNO on 105 and they’ll attend. Don’t open it; just report it.
          </li>
        </ul>
        <p>
          The next Sub (5.4) walks through every named component in the supply chain — DNO
          cut-out, MOP meter, MET, main isolator, and back upstream through the substations — so
          you can recognise the kit and explain who owns each item.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026, Section 132 (paraphrased — origin of the installation)"
        clause="BS 7671 applies from the supply terminals at the origin of the installation. The supply terminals are the point at which the consumer’s installation begins — typically the output terminals of the supplier’s metering equipment or the load side of any cut-out where there is no separate meter."
        meaning={
          <>
            BS 7671 has nothing to say about the service cable, the cut-out, the meter, or
            anything upstream of the consumer’s installation — those are governed by ESQCR and the
            supply licence. The wiring regulations only apply from the customer side of the meter
            onwards. This is why design choices about the supply (TN-C-S vs TN-S vs TT, available
            fault current, supply impedance) are <em>declared by the DNO</em> and the electrician
            designs the installation to suit, rather than the other way round.
          </>
        }
        cite="Paraphrased; see BS 7671:2018+A4:2026, Section 132 — Origin of an installation."
      />

      <SectionRule />

      <ContentEyebrow>The neutral isn’t always at zero amps</ContentEyebrow>

      <ConceptBlock
        title="Neutral current and unbalanced loads — why the LV neutral matters more than people think"
        plainEnglish="In a perfectly balanced three-phase load, the three phase currents add up to zero at the star point and the neutral carries nothing. In real life, single-phase loads on a row of houses are never perfectly balanced — so the neutral always carries something, and on a badly unbalanced feeder it can carry as much as the most loaded phase."
        onSite="Walk into a three-phase commercial install and clamp-meter the neutral on the incomer. If it reads close to zero, the loads are well balanced and the supervisor designed the schedule properly. If it reads as much as one of the phase conductors, you’ve got a badly distributed load and somebody’s going to see voltage problems on the heaviest-loaded phase."
      >
        <p>
          The maths is straightforward. In a balanced three-phase star (Y) system, the
          instantaneous currents on the three phases sum to zero at every instant — they’re equal
          in magnitude and 120° apart. So the neutral conductor (which is the return path back to
          the star point) carries no current. That’s the textbook ideal.
        </p>
        <p>The reality on a domestic LV feeder is messier:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Single-phase houses are spread across phases.</strong> House 1 on phase A,
            house 2 on phase B, house 3 on phase C, and so on. The DNO designer aims to balance
            the average load across the three phases, but instantaneous load varies widely.
          </li>
          <li>
            <strong>Diversity is statistical, not exact.</strong> Phase A might have three houses
            cooking dinner at 18:00 while phase B has none. The neutral carries the difference —
            sometimes 30 A or more on a residential feeder.
          </li>
          <li>
            <strong>Harmonics add to it.</strong> Single-phase loads with switched-mode power
            supplies (LED drivers, computers, EV chargers, induction hobs) inject triplen
            harmonics that <em>do not</em> cancel at the star point — instead they add up in the
            neutral. On a heavily harmonic-loaded feeder the neutral can carry more than any of
            the phases.
          </li>
        </ul>
        <p>
          That’s why the neutral conductor on a three-phase feeder is normally sized the same as a
          phase conductor (not smaller, even though "balanced" theory suggests you could). And
          it’s why the supervisor on a commercial fit-out spends time splitting the lighting and
          small-power circuits across phases rather than just loading them onto whichever phase is
          closest.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>How the supply gets its 0 V reference</ContentEyebrow>

      <ConceptBlock
        title="The star point and the supply earth — where ‘0 V’ actually comes from"
        plainEnglish="A three-phase secondary winding has a centre point where all three windings meet. That centre is the star point. Bond it to the planet (a deep-driven earth electrode at the substation) and the star point becomes 0 V by definition. Every voltage on the customer side is measured relative to that planted reference."
        onSite="If you’ve ever wondered why the neutral in a TN-C-S supply is at the same potential as the customer’s earth bar — that’s why. They’re both connected back to the same star-point earth at the secondary substation. The DNO planted that reference; the entire customer installation hangs off it."
      >
        <p>
          Voltage is a relative measurement — there’s no absolute "230 V" in the universe, only
          "230 V relative to something". The grid needs a fixed reference so every measurement
          makes sense. That reference is created at the secondary substation by:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Wiring the secondary in star (Y).</strong> The three secondary windings of the
            11 kV / 400 V transformer share a common point — the star point — at one end. The
            other end of each winding is brought out as L1, L2 and L3.
          </li>
          <li>
            <strong>Bonding the star point to a substation earth electrode.</strong> A
            low-impedance connection to a buried earth rod (or rod array) at the substation site.
            That electrode is the planted "0 V" reference.
          </li>
          <li>
            <strong>Running the neutral out of the star point to the customer.</strong>
            On a TN-C-S supply the same conductor carries both neutral current and the earth
            reference (PEN) along the LV distributor; it’s split into separate N and PE at the
            customer cut-out. On a TN-S supply the neutral and earth are run separately
            throughout.
          </li>
        </ul>
        <p>
          Every measurement on the customer installation — 230 V phase-to-neutral, the earth fault
          loop impedance Zs you record on the EIC, the prospective fault current at the origin —
          is relative to that planted star-point earth at the substation. Take the substation
          earth away (mythical scenario) and the entire chain has nothing to be referenced
          against.
        </p>
        <p>
          This is also why the form of the supply (TN-S, TN-C-S, TT) is decided by what the supply
          side does with that star-point reference — declared by the DNO, never chosen by the
          electrician. Cross-ref BS 7671 Reg 312.2.1 and the lesson on types of earthing systems
          for the full
          earthing-systems treatment.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The 230 V harmonisation history</ContentEyebrow>

      <ConceptBlock
        title="Why the UK ‘230 V’ supply still measures 240 V — the 1995 European harmonisation"
        plainEnglish="Pre-1995 the UK declared 240 V nominal. Mainland Europe declared 220 V. In 1995 the EU harmonised both to a single 230 V nominal — but with an asymmetric ±10%/-6% tolerance band wide enough to cover both legacy systems without anyone having to retap their transformers. So today’s ‘230 V’ supply still physically measures 240 V in most UK kitchens because the old 240 V transformers are still in service."
        onSite="An apprentice clamp-meters a socket and reads 245 V. They wonder if there’s a fault. There isn’t — that’s entirely normal under the harmonised standard. The legal envelope is 216 V to 253 V single-phase. Anything inside that range is the DNO doing its job."
      >
        <p>
          The history is a lovely example of regulatory pragmatism over engineering purity.
          Pre-1995:
        </p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>UK declared:</strong> 240 V nominal at ±6% — legal range 225.6 V to 254.4 V.
          </li>
          <li>
            <strong>Continental Europe declared:</strong> 220 V nominal at ±6% — legal range 206.8
            V to 233.2 V.
          </li>
          <li>
            <strong>Overlap:</strong> 225.6 V to 233.2 V was legal in both. Outside that window,
            equipment certified for one standard might misbehave on the other.
          </li>
        </ul>
        <p>
          The 1995 harmonisation moved both blocs to a single declared{' '}
          <strong>230 V nominal</strong> with an asymmetric tolerance of{' '}
          <strong>+10% / −6%</strong>, giving a legal envelope of 216 V to 253 V. Wide enough to
          cover everything previously legal under either old standard. Nobody had to physically
          retap a transformer — the kit stayed where it was, the paperwork changed.
        </p>
        <p>
          Result: a UK supply that was producing 240 V on Monday was producing 240 V on Tuesday
          too, except now it was called "230 V +4.3%" instead of "240 V nominal". The numbers
          didn’t move; the labels did. That’s why most UK supplies still read somewhere in the
          240–248 V range thirty years later. The standard is genuinely harmonised at 230 V in
          declaration, but the physical transformers are still set for the old 240 V world.
        </p>
        <p>
          The bite of it for the modern electrician: the +10% upper limit (253 V) is the
          constraint that hits first when there’s a lot of solar PV exporting upstream — voltage
          rise on the LV feeder pushes the supply against its legal ceiling, and the inverter
          trips on overvoltage protection. That’s a 1995 paperwork decision showing up as a 2026
          G99 commissioning headache.
        </p>
      </ConceptBlock>

      <SectionRule />

      <CommonMistake
        title="Treating 400 V three-phase as ‘four times more dangerous’ than 230 V"
        whatHappens={
          <>
            Apprentice sees ‘400 V three-phase’ on a commercial install and assumes the step up
            from 230 V means four times the risk. It doesn’t — the maths is more subtle. The
            phase-to-earth voltage is still 230 V (every conductor is one phase from a star point,
            the star point is the neutral, the neutral is bonded to earth). What 400 V three-phase
            changes is phase-to-phase voltage if you bridge two phases by accident — that{' '}
            <em>is</em> 400 V — and the available fault current, which is much higher because the
            supply transformer is bigger.
          </>
        }
        doInstead={
          <>
            Treat each conductor as if it were a 230 V conductor for shock-to-earth purposes
            (because it is). Treat the phase-to-phase voltages as the higher risk if you’re
            working between phases. And remember that prospective fault currents on three-phase
            commercial installs are typically much higher than on a domestic 100 A single-phase
            service — make sure your test instrument and your CU breakers are rated for it. The
            danger is real, but the wrong mental model (‘4×’ scary) leads to the wrong
            precautions.
          </>
        }
      />

      <Scenario
        title="Customer reports flickering lights and the electrician sees 217 V at the socket"
        situation={
          <>
            You’re called to a complaint of frequent dimming and flickering in a converted
            Victorian terrace at the end of a long rural feeder. You measure the voltage at the
            meter tails: 217 V steady, dropping to 211 V when a kettle and an electric shower run
            together. Is this a DNO problem or a customer problem?
          </>
        }
        whatToDo={
          <>
            217 V steady is just inside the ESQCR envelope (216 V floor) — borderline but legally
            compliant. 211 V under load is below the envelope and is a DNO concern. The voltage
            drop from no-load to full-load shows the supply impedance back to the secondary
            substation is high, suggesting either an undersized service cable or a long radial
            feeder serving too many properties. Document both readings in writing, photograph the
            meter, and report to the DNO on 105 with the data. They’ll attend, measure it
            themselves, and either uprate the service cable or look at the secondary transformer
            and feeder. In the meantime, advise the customer to stage their high-load appliances
            rather than run them simultaneously — pragmatic mitigation while the DNO investigates.
          </>
        }
        whyItMatters={
          <>
            Voltage envelope breaches are a real, common DNO obligation. The customer often blames
            the electrician or the appliance manufacturer first, when actually the problem is
            upstream and only the DNO can fix it. Knowing the legal envelope (216–253 V) and being
            able to read your meter accurately is what tells you whether to escalate to the DNO or
            to start tracing within the customer’s installation.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Distribution voltages in order: 33 kV (primary, town-scale) → 11 kV (secondary, street-scale) → 400 V three-phase / 230 V single-phase at the cut-out.',
          'Single-phase 230 V is derived from 400 V three-phase by tapping one phase + the shared neutral. The √3 ratio (400 / √3 ≈ 230) comes from phasor geometry.',
          'ESQCR Reg. 27 sets the supply envelope: 230 V −6% / +10% giving 216 V to 253 V single-phase (or 376 V to 440 V three-phase), at 50 Hz ±1%.',
          'The asymmetric −6% / +10% tolerance is a 1995 European harmonisation fudge that lets old UK 240 V and old continental 220 V transformers both stay legal under one 230 V nominal.',
          'GB has six DNO companies operating regulated regional monopolies. Emergency number: 105.',
          'The DNO owns up to and including the cut-out. The MOP owns the meter and the tails between cut-out and meter. The customer owns from the meter outgoing terminals — and that’s where BS 7671 takes over from ESQCR.',
        ]}
      />

      <Quiz title="Distribution voltages — knowledge check" questions={quizQuestions2} />
    </div>
  );
}
