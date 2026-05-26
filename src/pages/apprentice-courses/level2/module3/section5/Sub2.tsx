/**
 * Module 3 · Section 5 · Sub 2 — Transmission voltages
 * Maps to City & Guilds 2365-02 / Unit 203 / LO5 / AC 5.2
 *   AC 5.2 — “Identify transmission voltages”
 *
 * The UK National Grid transmission tier — 400 kV / 275 kV / 132 kV.
 * Why high voltage means low losses (P_loss = I^2 R), three-phase end-to-end,
 * who owns each tier, and how the voltage gets stepped up at the power
 * station and back down at the grid supply point.
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

const TITLE =
  'Transmission voltages (5.2) | Level 2 Module 3.5.2 | Elec-Mate';
const DESCRIPTION =
  'The UK transmission tier — 400 kV super-grid, 275 kV grid, 132 kV. Why high voltage means low losses (P = I²R), why three-phase, and who owns the pylons.';

const checks = [
  {
    id: 'm3s5s2-why-high-voltage',
    question:
      'Why does the UK National Grid transmit power at 400 kV rather than at 11 kV?',
    options: [
      'It automatically records calibration data, calculates errors, and generates calibration certificates electronically',
      'Because power loss in the line is I²R — and at higher voltage you can transfer the same power at lower current, slashing the I² loss',
      'Use the back of your hand (to detect temperature) at a safe distance first, then use a vibration pen or stethoscope for detailed assessment',
      'Between the main earthing terminal and the supply neutral with the installation earthing disconnected',
    ],
    correctIndex: 1,
    explanation:
      'P = V × I. For a fixed power, higher V means lower I. Loss in the line is I² × R, so halving the current quarters the loss. Moving 1 GW at 400 kV instead of 11 kV cuts the line current by 36× and the I²R loss by ~1300×. That is the only reason transmission voltages exist.',
  },
  {
    id: 'm3s5s2-grid-tiers',
    question:
      'Which of the following is NOT one of the three principal UK transmission voltages?',
    options: [
      '400 kV',
      '132 kV',
      '275 kV',
      '66 kV',
    ],
    correctIndex: 3,
    explanation:
      'GB transmission is 400 kV (super-grid), 275 kV (grid), and 132 kV (the lower transmission tier — owned by transmission operators in Scotland and by DNOs in England and Wales). 66 kV exists as a sub-transmission voltage in some London areas but is not part of the national transmission tier.',
  },
  {
    id: 'm3s5s2-three-phase',
    question:
      'UK transmission is three-phase end-to-end. Compared with single-phase, three-phase transmission:',
    options: [
      'A site supervisor noticing an apprentice is unusually quiet, checking in privately, and adjusting the day\\\\\\\\\\\\\\\'s tasks to support them',
      'A temporary depression of the central nervous system causing drowsiness, dizziness, confusion, and potentially unconsciousness',
      'Arrange exposure to three-phase work on site and liaise with the college to coordinate practical and theoretical learning',
      'Delivers smoother power (no zero crossings on the combined waveform), uses less conductor for the same power, and runs large rotating loads without flicker',
    ],
    correctIndex: 3,
    explanation:
      'Three balanced phases give continuous power delivery (the sum of three sinusoids 120° apart never falls to zero), need only three live conductors instead of six for the same power, and start/run large motors smoothly. That is why every transmission and primary distribution voltage in the UK is three-phase.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is the highest voltage on the UK National Grid transmission network?',
    options: [
      '132 kV',
      '400 kV',
      '275 kV',
      '500 kV',
    ],
    correctAnswer: 1,
    explanation:
      '400 kV is the GB super-grid voltage, used for the longest cross-country and inter-regional transfers. 500 kV is not used on the GB network (though it exists elsewhere — Eastern Europe, Russia).',
  },
  {
    id: 2,
    question: 'A power line carrying 1000 MW at 400 kV three-phase. Approximately what line current?',
    options: [
      '14 kA',
      '250 A',
      '3.6 kA (≈1443 A)',
      '1.4 kA',
    ],
    correctAnswer: 2,
    explanation:
      'I = P / (√3 × V × cos φ). Assume unity power factor: I = 1,000,000,000 / (1.732 × 400,000) ≈ 1443 A. That is the line current per phase. If the same 1000 MW were sent at 11 kV the current would be 36× higher (~52 kA) — physically impossible at scale and electrically ruinous in I²R loss.',
  },
  {
    id: 3,
    question:
      'A 500 km transmission line has a resistance of 5 Ω. It carries 1000 A. Approximate I²R loss?',
    options: [
      '5 kW',
      '500 W',
      '50 MW',
      '5 MW',
    ],
    correctAnswer: 3,
    explanation:
      'P_loss = I² × R = 1000² × 5 = 5,000,000 W = 5 MW. (Single-phase equivalent — Q2 showed the real three-phase line current at 400 kV / 1 GW is ~1443 A; this question uses round 1000 A purely to keep the I²R arithmetic clean.) At 400 kV that 5 MW loss represents a tiny fraction (~0.5%) of the 1 GW being transferred. At 11 kV with 36× the current, the loss would be 36² × 5 MW = 6480 MW — far more than the power being transferred. Physics rules out low-voltage long-distance transmission.',
  },
  {
    id: 4,
    question:
      'Who OWNS and OPERATES the 400 kV and 275 kV transmission network in England and Wales?',
    options: [
      'National Grid Electricity Transmission (NGET)',
      'The local DNO (e.g. UK Power Networks)',
      'NESO (National Energy System Operator)',
      'Each individual generator',
    ],
    correctAnswer: 0,
    explanation:
      'NGET (National Grid Electricity Transmission) owns the wires and substations in England and Wales. SP Transmission owns Southern Scotland, SHE Transmission owns Northern Scotland. NESO (the system operator, separated from National Grid in 2024) runs the system in real time but does not own the assets.',
  },
  {
    id: 5,
    question:
      'A typical pylon-mounted 400 kV three-phase line will carry how many conductors per circuit?',
    options: [
      'Turn off the heat source, hold the blanket as a shield, and gently place it over the pan from front to back',
      'Two or four bundled conductors per phase, plus an earth wire on top = 6–12 power conductors plus 1–2 earth',
      'To draw a measured volume of air through a filter or sorbent tube in the wearer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s breathing zone to measure exposure',
      '6 boxes + 4 socket plates + 2 FCU plates + ~42 m of 2.5 mm² T&E (35 m × 1.20 routing) + grommets, fixings, sleeving.',
    ],
    correctAnswer: 1,
    explanation:
      'Each phase on a 400 kV line is split into a bundle of 2 or 4 sub-conductors held apart by spacers. This reduces corona losses (the audible buzz around HV conductors) and reduces the line\'s reactance. An earth wire (or two) runs at the top of the pylon to provide lightning protection. Total: 6–12 power conductors per circuit + the earth.',
  },
  {
    id: 6,
    question:
      'A grid supply point (GSP) is the substation where:',
    options: [
      'Temporarily activate an output to verify the output module and field wiring are functioning, bypassing the program logic',
      'The two faults create a phase-to-phase fault through earth, requiring immediate disconnection',
      'The transmission network meets the distribution network — typically stepping down from 400 kV or 275 kV to 132 kV or 33 kV',
      'Deliberately limiting screen time and digital device use to reduce stimulation and allow genuine mental recovery',
    ],
    correctAnswer: 2,
    explanation:
      'GSP = the boundary between the transmission system (owned by NGET / SPT / SHET) and the distribution system (owned by the DNO). Power crosses the GSP transformer from 400/275 kV down to typically 132 kV, 66 kV or 33 kV, depending on the region. From there the DNO takes over.',
  },
  {
    id: 7,
    question:
      'Why does GB transmission use AC and not DC for cross-country transfers?',
    options: [
      'Circuit 2 (ring final) — socket in living room shows signs of overheating at the neutral terminal. Circuit isolated and labelled. Requires further investigation before energising',
      'Separate the people from the problem — acknowledge that both parties have legitimate perspectives and focus on the issue rather than personal attacks or character judgements',
      'A pilot drill bit guides the hole saw, cutting fluid/lubricant should be used, speed should be moderate (high speed generates excessive heat), and the workpiece should be clamped or supported',
      'AC voltage can be stepped up and down by transformers — DC cannot — so AC is much cheaper to use across multiple voltage tiers. (HVDC is used selectively for very long subsea or interconnector links where AC line losses dominate.)',
    ],
    correctAnswer: 3,
    explanation:
      'Transformers only work on AC. That alone is why the AC grid won the 1880s ‘war of the currents’ and remains the universal grid technology. HVDC has come back into the picture for very long subsea cables (Dogger Bank, the BritNed and IFA interconnectors) and for asynchronous interconnections between grids — but only because the cost of the AC/DC converter stations at each end is now affordable for those niche applications.',
  },
  {
    id: 8,
    question:
      'An electrician working on a domestic install is unlikely to ever touch a 400 kV conductor. Why does it matter that they understand transmission voltages?',
    options: [
      'Because the voltage at the cut-out is one end of an unbroken chain that starts at 400 kV — understanding the chain explains why supply is stable, where it can fail, and why ESQCR statutory limits exist on the 230 V you actually work with',
      'Death that occurs after rescue from suspension, caused by the sudden redistribution of pooled blood overwhelming the heart — prevented by adopting a semi-seated recovery position rather than laying the casualty flat',
      'EN 149 — FFP1 (assigned protection factor 4), FFP2 (APF 10), FFP3 (APF 20). FFP3 is the standard for respirable crystalline silica, asbestos-disturbance work (where licensed), wood dust. Face-fit test required.',
      'Permits are required for installations carrying out specified activities like waste treatment or large combustion plant; most electrical contractors don\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t need one but must comply with permit conditions when working at a permitted site',
    ],
    correctAnswer: 0,
    explanation:
      'The 230 V at the socket sits at the bottom of a regulated chain. Knowing the chain explains why supply quality is what it is, why DNOs can refuse a connection that would push the local network out of spec, and where the responsibilities lie when something goes wrong. It is also fair game in C&G theory exams.',
  },
];

const faqs = [
  {
    question: 'Why are some transmission lines underground and most overhead?',
    answer:
      'Cost. Burying a 400 kV circuit costs roughly 5–10× the equivalent overhead line because of the cable construction (oil-filled or XLPE-insulated, with multiple layers of screening), the trenching, the cooling stations needed to dissipate heat, and the planning consent. The trade-off is paid only where overhead pylons aren’t acceptable — National Parks, urban areas, river crossings. The London Power Tunnels project (~32 km of cable in tunnels under the city) is a current example.',
  },
  {
    question: 'What is the difference between transmission and distribution?',
    answer:
      'Transmission is the bulk-power network: 400 kV, 275 kV and 132 kV (in some regions). It moves big lumps of energy across long distances from generator to grid supply point. Distribution starts at the grid supply point and steps the voltage down through 33 kV, 11 kV, and finally 400 V three-phase / 230 V single-phase to feed individual customers. Different voltages, different owners, different regulatory framework. Transmission is owned by transmission operators (NGET, SPT, SHET); distribution by DNOs (UK Power Networks, Northern Powergrid, etc.).',
  },
  {
    question: 'Why does the UK use 400 kV when France and Germany use 380 kV?',
    answer:
      'Same idea, different number — both are nominal AC line-to-line voltages on national transmission systems. The UK standardised on 400 kV in the late 1950s when the original 275 kV super-grid was extended; mainland Europe standardised on 380 kV around the same time but with looser tolerance, so today the actual operating voltage is very close. Where the UK and continental grids meet via interconnectors (e.g. IFA between Sellindge and Calais), HVDC converter stations bridge the systems and remove any voltage mismatch.',
  },
  {
    question: 'What is corona loss and why does it matter on transmission lines?',
    answer:
      'Corona is the small ionisation discharge around a high-voltage conductor when the local electric field exceeds the air’s breakdown strength (~30 kV/cm in dry air). It causes a faint blue glow at night, an audible crackling buzz, radio interference, and a small but real power loss. Engineers minimise it by bundling each phase into 2 or 4 sub-conductors (which spreads the field and lowers the surface gradient) and by smoothing all hardware to remove sharp edges. It’s why a 400 kV line is louder in damp weather than in dry — water on the conductor lowers the breakdown threshold.',
  },
  {
    question: 'Are the 132 kV lines you see on smaller pylons part of the National Grid?',
    answer:
      'In Scotland, yes — 132 kV is part of the transmission network owned by SPT and SHET. In England and Wales, 132 kV is technically distribution (owned by the DNO), even though it looks transmission-like. This is a historical quirk: 132 kV was the original 1930s national grid voltage, and when 275 kV/400 kV came in, the south kept 132 kV with the DNOs but the north reclassified it as transmission. Either way, on the ground it’s steel pylons carrying three-phase AC at 132 kV.',
  },
  {
    question: 'What is HVDC and where is it used in the UK?',
    answer:
      'High-Voltage Direct Current. The wires carry DC at hundreds of kilovolts instead of three-phase AC. The price you pay is a converter station at each end (very expensive — hundreds of millions of pounds each). The price you save is much lower line losses on very long subsea cables (no capacitive charging current) and the ability to link two grids that aren’t synchronised. UK examples: IFA and IFA2 (UK to France), BritNed (UK to Netherlands), NSL (UK to Norway), Viking Link (UK to Denmark — the world’s longest at 765 km), and the offshore HVDC links from Dogger Bank to shore. Internal HVDC links are also being built (Western Link, England-Scotland) to relieve overloaded AC corridors.',
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
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 2"
            title="Transmission voltages"
            description="Once electricity leaves the generator it goes UP to silly voltages to travel cheaply, then comes back DOWN. Three transmission tiers — 400 kV, 275 kV, 132 kV — owned and operated by the transmission companies, governed by ESQCR and the Grid Code rather than BS 7671."
            tone="emerald"
          />

          <TLDR
            points={[
              'GB transmits at 400 kV (super-grid), 275 kV (grid), and 132 kV (transmission in Scotland / sub-transmission in England and Wales). All three are three-phase AC.',
              'Why so high? Power loss in a line is I² × R. Higher voltage means lower current for the same power, and the I² term means quartering the current divides the loss by ~16. At 400 kV the loss across a 500 km line is under 1%.',
              'Owned by transmission operators (NGET in England and Wales, SPT and SHET in Scotland), operated in real time by NESO. The 400 V at your CU sits at the bottom of this chain — governed by ESQCR not BS 7671.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the three principal UK transmission voltages: 400 kV, 275 kV and 132 kV.',
              'Explain why high voltage transmission slashes line losses (P_loss = I²R).',
              'State the role of the step-up transformer at the power station and the step-down transformer at the grid supply point.',
              'Recognise three-phase AC as the universal transmission technology in GB.',
              'Identify the owners of each transmission tier (NGET, SPT, SHET) and the role of NESO as system operator.',
              'Describe where HVDC is used in the UK and why.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why we don’t just send 230 V down a long wire</ContentEyebrow>

          <ConceptBlock
            title="The whole reason transmission voltages exist: I²R loss"
            plainEnglish="If you send a fixed amount of power down a wire, the loss in that wire depends on the SQUARE of the current. Halve the current and you quarter the loss. Easiest way to halve the current? Double the voltage. That is why every grid on the planet steps voltage UP for transmission, then DOWN for distribution."
            onSite="An electrician deals with this every day on the small scale: voltage drop on a long radial circuit. The grid deals with the same problem at 1000× the distance and 100,000× the current — same physics, just bigger numbers. Both come back to P_loss = I² × R."
          >
            <p>
              The power transferred down a three-phase line is{' '}
              <strong>P = √3 × V × I × cos φ</strong>. For a given power demand, the only way
              to lower the current is to raise the voltage. And the loss in the line is
              <strong> P_loss = I² × R</strong> — quadratic in current.
            </p>
            <p>Worked example. Move 1000 MW down a line with 5 Ω total resistance:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>At 11 kV three-phase:</strong> I = 1000 × 10⁶ / (1.732 × 11,000) ≈
                52,500 A. P_loss = 52,500² × 5 ≈ 13.8 GW. That is more than the power being
                sent. Physically impossible.
              </li>
              <li>
                <strong>At 132 kV:</strong> I ≈ 4,374 A. P_loss = 4,374² × 5 ≈ 95.6 MW.
                Roughly 9.5% loss. Still painful but technically workable.
              </li>
              <li>
                <strong>At 400 kV:</strong> I ≈ 1,443 A. P_loss = 1,443² × 5 ≈ 10.4 MW.
                Roughly 1% loss. Acceptable.
              </li>
            </ul>
            <p>
              That is why every cross-country transfer in GB happens at 400 kV. The voltage
              gets stepped up at the power-station transformer (from ~26 kV at the alternator
              terminals to 400 kV) and stepped back down at the grid supply point. The
              transformers cost money and have their own losses (~0.5% each), but the saving
              on line losses dwarfs both.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The three transmission tiers</ContentEyebrow>

          <ConceptBlock
            title="400 kV — the super-grid"
            plainEnglish="The biggest pylons you ever see. Three phases, each phase made of bundled sub-conductors (usually 4 in parallel held apart by spacers), with one or two earth wires running along the top of the pylon for lightning protection. Used for the longest cross-country and inter-regional transfers."
            onSite="If you’ve ever driven up the M1 or the M6 and seen a pair of huge lattice pylons with bundled conductors, that is the 400 kV super-grid. Pylons are typically 30–50 m tall. Statutory minimum ground clearance is around 7.6 m at 400 kV."
          >
            <p>
              400 kV is the headline transmission voltage on the GB system. It runs in two main
              corridors — the eastern route from Scotland down through Yorkshire and the East
              Midlands, and the western route through Lancashire, the Midlands and the South
              West. Most major power stations connect at 400 kV (or to the lower 275 kV tier
              and step up further at a switching station).
            </p>
            <p>
              A typical 400 kV pylon carries two complete circuits — six phases in total
              arranged in two stacks of three, each phase being a bundle of 2 or 4
              sub-conductors held apart by aluminium spacers. The bundling reduces corona
              losses and lowers the line reactance, raising the power transfer capability.
            </p>
            <p>
              Owners: <strong>NGET</strong> (National Grid Electricity Transmission) in
              England and Wales, <strong>SP Transmission (SPT)</strong> in Southern Scotland,
              <strong> SSEN Transmission (SHET)</strong> in Northern Scotland.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="275 kV — the regional grid"
            plainEnglish="Smaller pylons, slightly shorter spans, used for medium-distance transfers within a region. Originally the highest UK transmission voltage when the National Grid was first built in the 1930s — overtaken by 400 kV in the 1960s when the super-grid arrived."
            onSite="Common around large urban areas (Greater London, Greater Manchester, the Central Belt of Scotland) where it acts as the bulk supply ring around the city, feeding the lower distribution network."
          >
            <p>
              275 kV is widely used on the eastern side of the country and around the major
              English conurbations. Pylons are noticeably smaller than 400 kV — typically
              25–35 m — and conductors are usually single rather than bundled.
            </p>
            <p>
              In some areas (particularly Scotland and the south-east of England) the 275 kV
              system feeds directly into 132 kV and 33 kV networks without going through 400 kV
              at all. In other areas it acts as a step between the 400 kV super-grid and the
              132 kV system.
            </p>
            <p>
              Same owners as 400 kV: NGET, SPT, SHET. The line current at 275 kV for the same
              power transfer is √(400/275) ≈ 1.45× the 400 kV current — so I²R losses are
              roughly twice the 400 kV equivalent. That is why long-distance bulk transfers
              prefer 400 kV.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="132 kV — transmission in Scotland, sub-transmission in England and Wales"
            plainEnglish="Smaller pylons again, shorter spans, often a single circuit. In Scotland this is part of the transmission system. In England and Wales it’s technically the top of the distribution system — owned by the local DNO rather than NGET. Same wires, different paperwork."
            onSite="132 kV pylons are 20–30 m, look more domestic, often follow the line of older railways and main roads. You’ll see them feeding primary substations on the edge of every town."
          >
            <p>
              132 kV is the original UK transmission voltage. The first National Grid was
              completed in 1933 at 132 kV and ran for two decades before 275 kV super-grid
              extensions began in the late 1950s. Today 132 kV survives as the lower
              transmission tier — and in some regions as the upper distribution tier.
            </p>
            <p>
              The classification depends on geography:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Scotland:</strong> 132 kV is transmission, owned by SPT (south) or SHET
                (north). Sits alongside their 275 kV / 400 kV networks.
              </li>
              <li>
                <strong>England and Wales:</strong> 132 kV is distribution, owned by the local
                DNO (e.g. UK Power Networks own the 132 kV ring round London). Counted as
                ‘extra-high voltage distribution’ in industry parlance.
              </li>
            </ul>
            <p>
              Either way, it acts as the network that takes power from the grid supply point
              into the primary substations that feed individual towns. Power transfer at 132 kV
              for a typical primary feeder might be 60–120 MVA — enough to supply a town of
              50,000 people.
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

          <ContentEyebrow>Why three-phase, end-to-end</ContentEyebrow>

          <ConceptBlock
            title="Three-phase isn’t a design choice on transmission — it’s the only sensible option"
            plainEnglish="Three sine waves of the same amplitude and frequency, set 120° apart. Add them up at any moment and the total power delivery is constant — no zero crossings on the combined waveform. Use 25% less conductor than single-phase for the same power. Run any rotating load (motor, alternator) without flicker. Three-phase is the universal grid technology and there is no realistic alternative for bulk transmission."
            onSite="The pylons you see have wires in groups of three (or multiples of three). The substations have transformer banks of three. Switchgear comes in three-phase units. Every joint on the network respects the three-phase pattern. It’s built into the DNA of the grid."
          >
            <p>
              Why three-phase has won for over a century:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Smooth power.</strong> The instantaneous power in a single-phase
                circuit pulses at twice the supply frequency — falling to zero 100 times a
                second on UK 50 Hz mains. The sum of three balanced phases is constant. No
                pulsation, no flicker, no torque ripple in motors.
              </li>
              <li>
                <strong>Less copper for the same job.</strong> A balanced three-phase system
                doesn’t need a return conductor (the three line currents add to zero in the
                star point). Three wires carry the same power that three single-phase pairs
                (six wires) would.
              </li>
              <li>
                <strong>Self-starting motors.</strong> Three-phase windings produce a smooth
                rotating magnetic field automatically. Single-phase motors need extra start
                windings, capacitors or shaded poles to break symmetry — fiddly and
                inefficient at large scale.
              </li>
              <li>
                <strong>Compatible with delta and star transformer connections.</strong> A
                three-phase transformer can derive a single-phase 230 V supply (line-to-neutral)
                from a 400 V three-phase secondary effortlessly. The next Sub covers the maths:
                400 / √3 = 230.
              </li>
            </ul>
            <p>
              Every transmission voltage in this Sub — 400 kV, 275 kV, 132 kV — is three-phase
              AC. Every distribution voltage in the next Sub — 33 kV, 11 kV, 400 V — is also
              three-phase AC. Single-phase is only created at the very end of the chain, by
              tapping one phase off a three-phase distribution transformer.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Why frequency drift is the canary in the coal mine</ContentEyebrow>

          <ConceptBlock
            title="Frequency control — why a 0.2 Hz drift on a 50 Hz grid matters"
            plainEnglish="Every synchronous generator on the GB grid spins in mechanical step with the supply frequency. If demand rises before generation catches up, every spinning rotor on the grid slows microscopically and the frequency dips. NESO sees the dip in real time and dispatches reserve to bring it back to 50 Hz."
            onSite="The customer-end side of this is invisible to the electrician — your meter says 230 V at 50 Hz and that’s that. But on the transmission side it’s a constant balancing act. The 2019 Hornsea-1 trip pushed frequency down to 48.8 Hz and triggered automatic Low Frequency Demand Disconnection — about a million customers lost supply for ~45 minutes."
          >
            <p>
              The acceptable envelope is <strong>49.5 Hz to 50.5 Hz</strong> (ESQCR Reg 27, ±1%
              on the declared 50 Hz nominal). NESO operates much tighter than that — typically
              within ±0.2 Hz of nominal — using three layers of response:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inertia.</strong> The mechanical mass of every spinning generator on
                the grid resists frequency change. A bigger pool of synchronous machines means
                slower frequency drift after a fault — important as the grid moves to inverter-
                based wind and solar, which have no inertia of their own.
              </li>
              <li>
                <strong>Frequency response.</strong> Generators contracted to NESO ramp output
                up or down within seconds of a frequency excursion. Dinorwig pumped storage
                can be at full output in ~16 seconds; some battery sites respond in under a
                second.
              </li>
              <li>
                <strong>Reserve.</strong> Slower-acting generation called on within minutes if
                the imbalance persists — typically gas peakers and interconnector imports.
              </li>
            </ul>
            <p>
              Below 48.8 Hz, automatic Low Frequency Demand Disconnection (LFDD) sheds blocks
              of load to keep the grid stable. That’s the last line of defence — and the
              reason competent electricians have a working knowledge of why supply quality is
              what it is.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Transformer losses — what the kit costs to operate</ContentEyebrow>

          <ConceptBlock
            title="Copper loss vs iron loss — the two ways a transformer wastes energy"
            plainEnglish="A transformer’s losses come in two flavours. Copper loss is heat in the windings and varies with the square of the load current — high at full load, almost zero at no load. Iron loss is heat in the steel core caused by the alternating magnetic field — it’s constant whenever the transformer is energised, regardless of load."
            onSite="Why does the green metal kiosk transformer at the corner of the estate run warm even at 3 a.m. when nobody’s using anything? Iron loss. The core is being magnetised and demagnetised 100 times a second whether anyone’s drawing power or not."
          >
            <p>
              Two distinct loss mechanisms in every transformer on the chain — from the 400 kV
              super-grid transformers down to the 11 kV / 400 V street transformer:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Copper loss (I²R).</strong> Resistive heating in the primary and
                secondary windings. Proportional to the square of the load current — double the
                load and the copper loss quadruples. Same physics as voltage drop on a long
                radial circuit, just inside the transformer.
              </li>
              <li>
                <strong>Iron loss (core loss).</strong> Hysteresis loss as the core steel is
                magnetised and demagnetised 100 times a second on a 50 Hz supply, plus eddy-
                current loss in the core laminations. Roughly constant whenever the transformer
                is energised — independent of load.
              </li>
            </ul>
            <p>
              On a typical 500 kVA street transformer, full-load efficiency is around 98–99%.
              At quarter load or no load, iron loss dominates and efficiency drops sharply.
              Designers size transformers to operate near their efficiency sweet spot for
              expected load — over-sized kit is wasteful in iron loss, under-sized kit is
              wasteful in copper loss and runs hot.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Why we step UP to transmit and DOWN to use</ContentEyebrow>

          <ConceptBlock
            title="The whole story in one principle: high voltage for distance, low voltage for the customer"
            plainEnglish="Voltage is cheap to convert (a transformer does it in one step). Current is expensive to send (every amp causes I²R heat in the cable). So engineers move power at high voltage and low current across the country, then step it down to a usable, safe voltage right at the customer’s door."
            onSite="Same logic the electrician uses on a long sub-main. If a 100 m run is causing too much voltage drop at 230 V, the answer isn’t a thicker cable — it’s often a 400 V three-phase sub-main and a small distribution board at the far end. The grid does the same trick at 1000× the scale."
          >
            <p>
              The economics of the whole transmission chain comes down to one inequality:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Power transferred:</strong> P = V × I (single-phase) or P = √3 × V × I
                (three-phase). For a fixed power demand, higher V means lower I.
              </li>
              <li>
                <strong>Loss in the conductor:</strong> P_loss = I² × R. Quadratic in current
                — halve the current, quarter the loss.
              </li>
              <li>
                <strong>Cost of insulation:</strong> roughly linear in voltage — doubling the
                voltage roughly doubles the insulation thickness on the conductor and the
                clearance to earth.
              </li>
            </ul>
            <p>
              So the trade-off is: insulation cost rises linearly with voltage, but loss falls
              with the square of the current (and current falls linearly as voltage rises).
              For long-distance transfers the loss saving wins by a huge margin — which is why
              every grid in the world steps up at the source and down at the load.
            </p>
            <p>
              The customer can’t use 400 kV — there’s no insulator a kettle could safely sit
              behind — so the chain has to come back down through five transformers to the
              230 V single-phase supply at the cut-out. Every step is engineered to balance
              the loss saving on the next leg against the cost and loss of the transformer
              itself.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where the voltage gets stepped up and down</ContentEyebrow>

          <ConceptBlock
            title="Step-up at the power station, step-down at the grid supply point"
            plainEnglish="Generators don’t produce 400 kV — that would be physically impossible to insulate inside the rotating machine. They produce in the 11–26 kV range and a transformer next door steps it up to transmission voltage. At the other end, the grid supply point steps it back down to 132 kV / 33 kV for the DNO to take over."
          >
            <p>
              <strong>At the power station.</strong> A typical CCGT alternator has output
              terminals at around 22 kV. The transformer immediately downstream steps it up to
              400 kV (or 275 kV) for transmission. This is one of the heaviest single
              components on the site — a 1 GW step-up transformer can weigh 400 tonnes and is
              filled with mineral oil for cooling and insulation. It’s usually the limiting
              item for transport when a new station is built (specialist road or rail
              consignments).
            </p>
            <p>
              <strong>At the grid supply point (GSP).</strong> Where the transmission network
              meets the distribution network, a step-down transformer drops the voltage from
              400 kV (or 275 kV) to 132 kV, 66 kV or 33 kV — depending on the region and the
              size of the load downstream. This is the boundary between NGET (transmission
              owner) and the DNO (distribution owner). The DNO takes the power from this point
              and steps it down again through primary and secondary substations to the
              consumer.
            </p>
            <p>
              The GSP is also the legal handover point — the licence boundary between the
              transmission and distribution licence holders. Power flowing the other way
              (embedded generation exporting from the distribution system back into
              transmission) crosses the same GSP transformer in reverse.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.transformerStepUpDown.url}
            title={videos.transformerStepUpDown.title}
            channel={videos.transformerStepUpDown.channel}
            duration={videos.transformerStepUpDown.duration}
            topic="How transformers step voltage up and down · Unit 203 AC 5.2"
            caption="The Engineering Mindset animates the turns-ratio principle behind every step-up at the power station and every step-down at the GSP. The 22 kV → 400 kV → 132 kV chain made visible."
          />

          <RegsCallout
            source="ESQCR 2002, Reg. 27 (paraphrased — voltage tolerance at supply terminals)"
            clause="The voltage of the supply at the supply terminals shall be the declared voltage and shall not vary by more than +10 per cent or −6 per cent of the declared voltage, unless otherwise agreed in writing."
            meaning={
              <>
                The same statutory framework that holds frequency to 50 Hz ±1% holds the
                voltage at the consumer’s terminals to <strong>−6% / +10%</strong>. On a
                declared 230 V nominal that gives a legal envelope of <strong>216 V to 253 V
                </strong>. The whole transmission and distribution chain — from the 400 kV
                step-up at the power station, through every transformer down to the cut-out —
                is engineered to keep the customer-end voltage inside that envelope despite
                changing demand and changing generator availability.
              </>
            }
            cite="Paraphrased; see Electricity Safety, Quality and Continuity Regulations 2002 (SI 2002/2665, as amended), Reg. 27 — full text on legislation.gov.uk."
          />

          <RegsCallout
            source="National Grid ESO Grid Code, OC.6 (paraphrased — operating frequency)"
            clause="The system frequency is to be controlled within the operational limits of 49.5 Hz to 50.5 Hz, with normal operation maintained much closer to nominal 50 Hz (typically within ±0.2 Hz). Frequency outside the statutory limits shall trigger automatic disconnection of demand and generation in defined sequences."
            meaning={
              <>
                The Grid Code is the engineering rulebook for everyone who connects to the
                transmission system — generators, distribution operators, large industrial
                customers. It sits underneath ESQCR (the statutory framework) and translates it
                into operational requirements. Practical takeaway: if you ever hear a CCGT
                plant ‘fast-ramping for frequency response’ on the news, this is what it’s
                obeying — the same Grid Code that ultimately keeps the 50 Hz on your meter
                tails stable.
              </>
            }
            cite="Paraphrased; see National Grid ESO Grid Code, Operating Code OC.6 — published at nationalgrideso.com. BS 7671 does not govern transmission — that’s ESQCR + the Grid Code."
          />

          <SectionRule />

          <CommonMistake
            title="Confusing transmission voltage with the voltage on YOUR cable"
            whatHappens={
              <>
                Apprentice sees ‘400 kV transmission’ in their notes and thinks it’s relevant
                to the cable they’re terminating. It isn’t. 400 kV is the voltage between two
                phases of a three-phase system at the very top of the supply chain — long
                before any DNO transformer, never present at any customer-facing kit. A second
                version of the same mistake: apprentice sees ‘400 V three-phase’ at a
                commercial install and thinks it’s the same thing as the 400 kV super-grid —
                they’re separated by a thousand-fold step-down and four substations.
              </>
            }
            doInstead={
              <>
                Keep the chain in your head: <strong>400 kV / 275 kV / 132 kV</strong>{' '}
                (transmission, with NGET / SPT / SHET) →{' '}
                <strong>33 kV / 11 kV / 400 V / 230 V</strong> (distribution, with the DNO).
                Two separate worlds, two separate ownerships, two separate regulatory
                frameworks. Section 5.3 covers the distribution voltages.
              </>
            }
          />

          <Scenario
            title="A new wind farm wants to connect to the grid — which voltage tier?"
            situation={
              <>
                You’re reading a planning notice for a new 350 MW onshore wind farm in the
                Borders. The application includes a connection from the wind farm collector
                substation to the existing transmission network. Which voltage will the
                connection be at, and who owns it?
              </>
            }
            whatToDo={
              <>
                For 350 MW of generation you’re looking at a transmission-level connection. The
                collector substation on the wind farm typically aggregates the individual
                turbines at 33 kV. The export connection to the grid would step that up to
                132 kV, 275 kV, or 400 kV depending on what is closest. In the Borders, SPT
                runs the 275 kV and 400 kV networks, so the connection contract is with SPT and
                NESO (system operator) jointly. Anything under ~100 MW would more likely
                connect at distribution voltage (33 kV or 132 kV) under a DNO contract — known
                as ‘distributed generation’.
              </>
            }
            whyItMatters={
              <>
                Generation connection is one of the biggest engineering bottlenecks on the GB
                system right now — there are queues of ~10 years for transmission connections
                in some regions because the existing network can’t accept any more power
                without reinforcement. NESO is overhauling the queue with the ‘Connections
                Reform’ programme. For an electrician, the relevant takeaway is just understanding
                where each generator plugs in: small ones into distribution, big ones into
                transmission, with a hard line between the two at ~100 MW.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'GB transmission is at three voltages: 400 kV (super-grid), 275 kV (regional grid), and 132 kV (transmission in Scotland, sub-transmission in England and Wales).',
              'Transmission is high voltage because P_loss = I²R. Higher voltage means lower current, and the squared term means line losses fall dramatically. At 400 kV, losses across hundreds of km are ~1% of the power being transferred.',
              'All UK transmission is three-phase AC. Three-phase delivers smooth power, uses less conductor than single-phase, and runs large rotating loads without flicker.',
              'Generators produce in the 11–26 kV range. A step-up transformer at the power station raises this to 400 kV. A step-down transformer at the grid supply point lowers it to distribution voltage.',
              'Transmission is owned by NGET (England and Wales), SPT (Southern Scotland) and SHET (Northern Scotland). NESO operates the system in real time.',
              'Transmission is governed by ESQCR (statutory) and the Grid Code (operational), not BS 7671 — which only covers from the customer side of the supply terminals downstream.',
            ]}
          />

          <Quiz
            title="Transmission voltages — knowledge check"
            questions={quizQuestions}
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module3/section5/5-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.1 Generation methods
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module3/section5/5-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Distribution voltages
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
