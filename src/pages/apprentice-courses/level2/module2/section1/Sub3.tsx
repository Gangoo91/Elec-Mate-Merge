/**
 * Module 2 · Section 1 · Sub 3 — Electrical SI units (V, A, Ω, W)
 * Maps to City & Guilds 2365-02 / Unit 202 / LO2 / AC 2.2
 *   "identify and determine values of base and derived SI units which apply
 *    specifically to electrical quantities"
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
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
import {
  ResistorSymbol,
  CapacitorSymbol,
  InductorSymbol,
} from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Electrical SI units — V, A, Ω, W | Level 2 Module 2.1.3 | Elec-Mate';
const DESCRIPTION =
  'Volts, amps, ohms, watts — the four electrical units a working electrician uses every day, what they really mean and how to determine values from instruments and labels.';

const checks = [
  {
    id: 'electrical-power-check',
    question: 'A 3 kW immersion heater runs from a 230 V supply. What current does it draw?',
    options: ['7 A', '13 A', '20 A', '30 A'],
    correctIndex: 1,
    explanation:
      "I = P ÷ V = 3000 ÷ 230 ≈ 13 A. That's why immersion heaters land on a dedicated 16 A or 20 A radial — comfortably above 13 A but not so big the cable goes silly.",
  },
  {
    id: 'electrical-units-check',
    question: 'You read 0.05 Ω on a low-resistance ohmmeter testing a CPC. What unit is that in?',
    options: ['Megohms', 'Ohms', 'Milliohms', 'Microhms'],
    correctIndex: 1,
    explanation:
      "Ohms — but tiny. 0.05 Ω is the same as 50 mΩ. A clean R1+R2 reading on a short cable run looks like this. Anything much bigger means a poor connection somewhere.",
  },
  {
    id: 'three-phase-line-voltage-check',
    question:
      "On a UK 400 V three-phase supply, what voltage would you expect to read between any phase and neutral?",
    options: ['400 V', '230 V', '110 V', '0 V'],
    correctIndex: 1,
    explanation:
      "230 V phase-to-neutral, 400 V phase-to-phase. The relationship is V_line = √3 × V_phase (400 ≈ 1.732 × 230). Same supply, two different voltages depending on which two terminals you probe across.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the volt (V) measure?',
    options: [
      'The current flowing through a circuit',
      'The potential difference (electrical pressure) between two points',
      'The opposition to current flow',
      'The rate of energy transfer',
    ],
    correctAnswer: 1,
    explanation:
      "Voltage is potential difference — the 'push' between two points. No push means no flow. Always measured BETWEEN two points (in parallel across what you're testing).",
  },
  {
    id: 2,
    question: 'In what unit is electric current measured?',
    options: ['Volts (V)', 'Amperes (A)', 'Ohms (Ω)', 'Coulombs (C)'],
    correctAnswer: 1,
    explanation:
      "Amperes — almost always shortened to amps. The ampere is one of the seven SI base units and the only electrical one.",
  },
  {
    id: 3,
    question: 'What is the standard UK single-phase nominal supply voltage?',
    options: ['110 V', '230 V', '240 V', '400 V'],
    correctAnswer: 1,
    explanation:
      "230 V (with a permitted tolerance of −6%/+10% under ESQCR). UK harmonised down from 240 V to align with European 230 V.",
  },
  {
    id: 4,
    question:
      "A 12 V control transformer secondary draws 250 mA powering a contactor coil. What is the apparent power on the secondary, in watts?",
    options: ['3 W', '30 W', '300 W', '3,000 W'],
    correctAnswer: 0,
    explanation:
      'Convert before you multiply: 250 mA = 0.25 A. P = V × I = 12 × 0.25 = 3 W. Forget the prefix and you get 3,000 W — a 1000× error that would have you sizing the wrong transformer entirely.',
  },
  {
    id: 5,
    question:
      "On an insulation resistance test, the result is shown as 'OL' or '>200 MΩ'. What does that mean?",
    options: [
      'The cable is faulty',
      "The insulation is so good the meter can't measure it",
      'The meter is broken',
      'You have not connected the leads',
    ],
    correctAnswer: 1,
    explanation:
      "Over-limit. The insulation resistance is higher than the meter's top of scale (typically 200-1000 MΩ). That's a PASS, not a fault — record the reading as '>200 MΩ' or whatever the limit is.",
  },
  {
    id: 6,
    question: 'A 13 A plug top fuse will safely carry which of these loads?',
    options: ['A 3 kW kettle (~13 A)', 'A 7 kW shower (~30 A)', 'A 9 kW oven (~39 A)', 'None of these'],
    correctAnswer: 0,
    explanation:
      'A 3 kW kettle pulls ~13 A — right at the fuse limit but acceptable for an appliance designed for it. Showers and ovens need their own dedicated MCB-protected circuits, not a 13 A plug.',
  },
  {
    id: 7,
    question: 'Which is more dangerous to a person — voltage or current?',
    options: [
      'Voltage — higher voltage always kills',
      'Current — even small currents through the heart can be fatal',
      'They are equally dangerous',
      'Neither, electricity is safe',
    ],
    correctAnswer: 1,
    explanation:
      'Current does the damage — voltage just provides the push. Currents as low as 30 mA across the chest can stop the heart. That is exactly why RCDs are set to trip at 30 mA.',
  },
  {
    id: 8,
    question: 'What does a typical UK ring final circuit cable need to be sized for?',
    options: [
      '13 A (the plug fuse)',
      '20 A (a generic radial)',
      'The total connected load, with diversity, up to the 32 A MCB rating',
      'Whatever the customer wants',
    ],
    correctAnswer: 2,
    explanation:
      'Cable is sized for the protective device (32 A MCB on a standard ring) and the install method, with diversity applied. 2.5 mm² T&E covers a typical ring; thicker cables for more demanding installs.',
  },
];

const faqs = [
  {
    question: 'Why is UK mains 230 V and not the 240 V it used to be?',
    answer:
      "The UK harmonised with the European 230 V standard in the 1990s — partly to standardise across the EU, partly to make it easier for manufacturers to ship one product. In practice, your supply will often still measure 235-245 V because the DNO transformer hasn't physically changed. The ±10% tolerance covers it.",
  },
  {
    question: 'How can voltage exist without current flowing?',
    answer:
      "Voltage is potential difference — it can sit there waiting for a path. A 9 V battery on the bench has 9 V between its terminals all day, but no current flows until something connects them. Same with a switched-off socket — 230 V is present at the L-N terminals on the line side of the switch, even though no current is moving.",
  },
  {
    question: 'Why does a higher current need a bigger cable?',
    answer:
      "Power dissipated in a cable is P = I²R. Double the current and the heat goes up four times — that heat softens the insulation, eventually melts it, and starts a fire. Bigger cables have lower R per metre and can dissipate the heat more easily, so they handle bigger currents safely. BS 7671 Appendix 4 gives the current ratings for every install method.",
  },
  {
    question: "What's the difference between W and VA, and why do motors quote VA?",
    answer:
      "W (watts) is real power — the power that does useful work. VA (volt-amperes) is apparent power — the actual product of measured volts and measured amps. On reactive loads (motors, transformers, fluorescent gear) some current is used pushing the magnetic field around and not doing useful work. Manufacturers quote VA so you size the cable for the actual current the kit pulls, not just the useful bit.",
  },
  {
    question: 'Are mΩ readings on a continuity test ever a problem?',
    answer:
      "Only if they're too HIGH. A clean continuity / R1+R2 reading on a short cable run will be tens of milliohms (e.g. 50-200 mΩ depending on cable size and length). Several ohms on what should be a short run means a poor connection — back through it, retighten everything, retest.",
  },
  {
    question: 'How do I know what voltage to expect at a socket?',
    answer:
      "230 V single-phase (line to neutral) at any standard 13 A socket in a UK house. 400 V line-to-line if you're working on three-phase commercial / industrial. Always confirm with a CAT III voltage indicator before you assume — and prove your tester on a known live source before AND after, per HSE GS38.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 3"
            title="Electrical SI units — V, A, Ω, W"
            description="Volts, amps, ohms and watts — what each one really represents, the values you should expect on UK installations, and how to determine them from instruments and product labels."
            tone="emerald"
          />

          <TLDR
            points={[
              "Voltage (V) is the push between two points. Current (I, in amps) is the flow that the push causes. Resistance (Ω) is what slows the flow down. Power (W) is how fast energy is being used.",
              "UK single-phase nominal voltage is 230 V (−6% / +10% tolerance under ESQCR — roughly 216 V to 253 V). Three-phase line-to-line is 400 V.",
              "Current does the damage to people — even 30 mA across the chest can be lethal. Volts only provide the push.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define voltage, current, resistance and power in your own words and give the SI unit and symbol of each.",
              "State the UK nominal supply voltages (230 V single-phase, 400 V three-phase) and the ESQCR tolerances around them.",
              "Calculate the current drawn by a load given its power and voltage using P = V × I.",
              "Recognise typical electrical values on labels, instruments and circuits (RCD 30 mA, MCB 32 A, IR > 1 MΩ, kettle 3 kW).",
              "Explain why current — not voltage — is the parameter that injures or kills.",
              "Identify electrical units correctly written and spot common case / prefix mistakes.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Voltage — the push</ContentEyebrow>

          <ConceptBlock
            title="Volts measure potential difference between two points"
            plainEnglish="Voltage is the difference between two points that can drive current. No difference, no flow."
            onSite="Always measure voltage IN PARALLEL — leads across the thing you're testing, not in series with it. Probe across L and N at a socket: ~230 V. Probe across L and earth at a healthy installation: ~230 V too."
          >
            <p>
              The volt (V) is the SI derived unit of electric potential difference. Strictly: 1 V =
              1 joule of work per coulomb of charge moved. In plain terms — the higher the voltage,
              the harder the supply pushes electrons through the circuit.
            </p>
            <p>
              UK nominal voltages a Level 2 apprentice meets:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>230 V single-phase</strong> — every domestic socket, every domestic light,
                most small commercial loads. Measured between line and neutral.
              </li>
              <li>
                <strong>400 V three-phase</strong> — commercial / industrial. Line-to-line voltage
                between any two of the three phases. Each phase to neutral is still 230 V.
              </li>
              <li>
                <strong>110 V centre-tapped</strong> — site supply via reduced low-voltage
                transformer. 55 V to earth from either leg, used to lower the shock risk on
                construction sites.
              </li>
              <li>
                <strong>12 V / 24 V</strong> — SELV / PELV control circuits, garden lighting,
                vehicle systems.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ESQCR 2002 — Schedule 1 (supply voltage tolerance)"
            clause="The declared frequency of the supply at the supply terminals shall be 50 Hz with a permitted variation of ±1%, and the declared voltage at the supply terminals shall be 230 V single-phase / 400 V three-phase, with a permitted variation of −6% and +10% (between approximately 216 V and 253 V single-phase)."
            meaning={
              <>
                If you read 245 V at the head of an installation, that's compliant — even though it
                sounds high. Anything below ~216 V or above ~253 V at the cut-out is the DNO's
                problem, not your wiring's. Worth knowing before you start chasing a phantom fault.
              </>
            }
            cite="Verbatim wording paraphrased — see legislation.gov.uk (Electricity Safety, Quality and Continuity Regulations 2002, Schedule 1) for full text"
          />

          <SectionRule />

          <ContentEyebrow>Current — the flow that does the damage</ContentEyebrow>

          <ConceptBlock
            title="Amps measure how much charge is moving per second"
            plainEnglish="One amp = one coulomb of charge passing a point every second. That's about 6.24 × 10¹⁸ electrons every second — a number you don't need, but the principle helps."
            onSite="Current is what gets sized. Cables, MCBs, RCDs, fuses — every protective device is rated in amps. The volts mostly take care of themselves."
          >
            <p>
              The ampere (A) is the SI BASE unit for electric current. It's the only base unit on
              the electrical side; volts, ohms and watts are all derived from it (and the metre,
              kilogram and second).
            </p>
            <p>
              Typical UK currents you'll see:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>30 mA</strong> — RCD trip current for shock protection (additional
                protection per BS 7671 411.3.3).
              </li>
              <li>
                <strong>6 A</strong> — typical lighting MCB rating.
              </li>
              <li>
                <strong>13 A</strong> — fuse in a UK plug top (BS 1363).
              </li>
              <li>
                <strong>16 A / 20 A / 32 A</strong> — common radial / ring final MCB ratings.
              </li>
              <li>
                <strong>40 A / 45 A</strong> — showers and cookers.
              </li>
              <li>
                <strong>100 A</strong> — typical domestic main fuse rating.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reading a motor nameplate — every unit you've just learned, in one block"
            plainEnglish="A UK industrial motor plate packs voltage, current, frequency, power, power factor, ingress protection and mass into about 20 numbers. Decode one and the SI units stop being abstract."
            onSite="Always work off the plate, not the spec sheet. The plate is what's actually on the wall — the sheet is what was supposed to be ordered. They don't always match."
          >
            <p>
              Take a typical 7.5 kW UK industrial three-phase induction motor. The plate reads:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>7.5 kW</strong> — rated mechanical OUTPUT power at the shaft. Watts (W),
                with the kilo prefix (× 1,000), so 7,500 W of useful turning power. Not the
                electrical input — the input is higher because the motor isn't 100% efficient.
              </li>
              <li>
                <strong>415 V, 3 ~</strong> — rated voltage between any two phases. Volts (V), AC,
                three-phase. Each phase to neutral would be 240 V (legacy) or 230 V on the
                harmonised system.
              </li>
              <li>
                <strong>14.5 A</strong> — rated full-load current per phase. Amps (A). This is the
                figure your overload, MCB and cable have to handle. Sense-check: S = √3 × V × I =
                1.732 × 415 × 14.5 ≈ 10,400 VA ≈ 10.4 kVA apparent power.
              </li>
              <li>
                <strong>50 Hz</strong> — supply frequency. Hertz (Hz), cycles per second. UK / EU
                standard. A 60 Hz motor (US spec) would run 20% fast in the UK, with all the
                bearing-life and overheating problems that brings.
              </li>
              <li>
                <strong>cos φ = 0.85</strong> — power factor. Dimensionless. Real power P = S × cos φ
                = 10.4 × 0.85 ≈ 8.84 kW of electrical input. The 7.5 kW rating is what comes out of
                the shaft, so motor efficiency η ≈ 7.5 ÷ 8.84 ≈ 85%. Apprentice rule of thumb: a
                modern induction motor of this size lands around 85-90% on both PF and efficiency.
              </li>
              <li>
                <strong>IP55</strong> — ingress protection. First digit (5) = dust-protected.
                Second digit (5) = protected against water jets. Suitable for most workshop and
                outdoor-canopy locations; NOT for direct hose-down or submersion (you'd want IP65 /
                IP66 for that).
              </li>
              <li>
                <strong>65 kg</strong> — mass. Kilograms (kg). Matters for lifting plans, shelf /
                bracket loading, and PE calcs if it's going up high. 65 kg at 2 m of installation
                height stores 65 × 9.81 × 2 ≈ 1,275 J of potential energy — drop it and that all
                comes back as a wrecked floor.
              </li>
            </ul>
            <p>
              Every number on that plate is a unit you've just learned. V, A, Hz, W, kW, kg —
              they're not exam fluff, they're literally the numbers you read off the wall.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why current is what kills"
            plainEnglish="Voltage gets you across the gap; current is what fries you once you're across it."
            onSite="An RCD is set at 30 mA because that's the threshold above which heart fibrillation becomes likely with mains-frequency AC. Set lower (10 mA) for very high-risk areas like medical locations."
          >
            <p>
              The reason BS 7671 obsesses over residual current devices (RCDs) is that the human
              body's vulnerability is current-based, not voltage-based. Approximate effects of
              50/60 Hz AC across the chest:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>~1 mA</strong> — perception threshold; you feel a tingle.
              </li>
              <li>
                <strong>~5-10 mA</strong> — let-go threshold for most people. Above this you can't
                release the conductor.
              </li>
              <li>
                <strong>~30 mA</strong> — risk of ventricular fibrillation if the current crosses
                the heart for more than a few hundred milliseconds.
              </li>
              <li>
                <strong>~100 mA upwards</strong> — high probability of fatal fibrillation. Severe
                burns at the entry/exit points.
              </li>
            </ul>
            <p>
              The 30 mA RCD trip threshold (and ≤300 ms trip time at I∆n) is engineered to break the
              circuit before the current does irreversible damage.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <VideoCard
            url={videos.voltage.url}
            title={videos.voltage.title}
            channel={videos.voltage.channel}
            duration={videos.voltage.duration}
            topic={videos.voltage.topic}
            caption="Five-minute primer that ties potential difference, current and electron flow together visually. Useful if the writing above feels abstract."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Resistance — what slows the flow</ContentEyebrow>

          <ConceptBlock
            title="Ohms measure opposition to current"
            onSite="On site you'll meet resistance in three guises: cable resistance (very small, mΩ), insulation resistance (very large, MΩ), and component resistance (mid-range, anything from Ω to kΩ)."
          >
            <p>
              The ohm (Ω) is the SI derived unit of resistance. 1 Ω = 1 V/A — i.e. it takes one volt
              of pressure to push one amp through one ohm of resistance. That's Ohm's law expressed
              as a unit definition.
            </p>
            <p>
              Three big resistance contexts on Level 2:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R1 + R2 (continuity / CPC)</strong> — measured in ohms or milliohms.
                Typical reading on a short ring final R1+R2: 0.4-0.8 Ω. High readings = poor
                connection.
              </li>
              <li>
                <strong>Insulation resistance (IR)</strong> — measured in megohms. Minimum
                acceptance per Table 64 of BS 7671: 1.0 MΩ at 500 V DC for normal LV circuits.
                Healthy installations read hundreds of MΩ or "OL" (over-limit).
              </li>
              <li>
                <strong>Earth fault loop impedance (Zs)</strong> — also in ohms. Caps depend on the
                protective device and disconnection time. A 16 A Type B MCB to BS EN 60898 needs
                Zs ≤ 1.09 Ω at 230 V for the required disconnection time (BS 7671 Regulation
                411.4.204(a) / Table 41.3 row for 16 A Type B). Heavier-rated MCBs need a tighter
                Zs — a 32 A Type B is well below 1 Ω.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Table 64 (insulation resistance acceptance criteria)"
            clause="Table 64 specifies minimum insulation resistance values and the DC test voltages to be used for verification: For SELV and PELV circuits use 250 V DC with minimum 0.5 MΩ; For circuits up to and including 500 V (except SELV/PELV) use 500 V DC with minimum 1.0 MΩ; For circuits above 500 V use 1000 V DC with minimum 1.0 MΩ."
            meaning={
              <>
                Standard 230 V circuits get tested at 500 V DC and need to show at least 1.0 MΩ
                between live conductors and protective earth. In practice, healthy modern PVC cable
                will read hundreds of megohms or off-scale — anything close to 1.0 MΩ is borderline
                and worth investigating.
              </>
            }
            cite="Reference: BS 7671:2018+A4:2026 Part 6 — Inspection and Testing, Table 64"
          />

          <ConceptBlock
            title="Resistors, capacitors, inductors — three flavours of opposition"
            plainEnglish="A resistor opposes any current the same. A capacitor opposes DC fully but lets AC pass. An inductor opposes AC change but lets steady DC pass."
          >
            <p>
              Pure resistance (the ohm) is straightforward. AC circuits also see <em>reactance</em>
              from capacitors (X_C) and inductors (X_L), and the combined opposition is called{' '}
              <em>impedance</em> (Z) — also measured in ohms. You'll meet these properly in Section
              4 onwards. For now, recognise the three component symbols you'll see on every
              schematic.
            </p>
          </ConceptBlock>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ResistorSymbol label="Resistor — pure resistance (R, Ω)" />
            <CapacitorSymbol label="Capacitor — opposes DC, passes AC" />
            <InductorSymbol label="Inductor — opposes change in current" />
          </div>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Power — the rate of energy use</ContentEyebrow>

          <ConceptBlock
            title="Watts measure how fast energy is being used"
            plainEnglish="Power is energy per second. 1 W = 1 J/s. Doubles the watts and you transfer energy twice as fast."
            onSite="Every appliance has a power rating in W or kW on its rating plate. Cable size and protective device come from the current that rating creates, not from the watts directly."
          >
            <p>
              The watt (W) is the SI derived unit of power. For DC and resistive AC loads:
            </p>
            <p className="font-mono text-[15px] text-elec-yellow text-center my-2">
              P (W) = V (V) × I (A)
            </p>
            <p>
              That's the workhorse formula. From it you can transpose to find the current any
              appliance pulls (I = P ÷ V), which then tells you the cable size, the protective
              device, and whether the existing circuit will cope.
            </p>
            <p>
              Common UK power ratings to anchor your sense of scale:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>10 W</strong> — typical LED panel light.
              </li>
              <li>
                <strong>100 W</strong> — old-style filament bulb (these days, an oven LED).
              </li>
              <li>
                <strong>1 kW (1000 W)</strong> — small fan heater, hairdryer.
              </li>
              <li>
                <strong>3 kW</strong> — kettle, immersion heater. Pulls ~13 A at 230 V.
              </li>
              <li>
                <strong>7-9 kW</strong> — electric shower. Pulls ~30-40 A — needs its own circuit.
              </li>
              <li>
                <strong>7.4 kW</strong> — typical home EV charger (Mode 3, 32 A single-phase).
              </li>
              <li>
                <strong>11-22 kW</strong> — three-phase EV charger or commercial cooker.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Confusing kW and kWh"
            whatHappens={
              <>
                Customer rings up about a high bill. They say "the immersion heater is 3 kWh —
                that's why the bill is huge". You crack on assuming the immersion is the problem
                and end up replacing a healthy element. Wrong. <strong>kW</strong> is power (rate);{' '}
                <strong>kWh</strong> is energy (rate × time). A 3 kW immersion only uses 3 kWh per
                hour of running — if it's running 8 hours a day, that's 24 kWh. THAT'S where the
                bill comes from.
              </>
            }
            doInstead={
              <>
                Always separate the rating (kW) from the consumption (kWh). When a customer
                complains about bills, the question is "how long is it on for?" — not just "what's
                it rated at?" Same kit, very different bill depending on usage.
              </>
            }
          />

          <Scenario
            title="Sizing a circuit for a new electric oven"
            situation={
              <>
                A customer wants a new built-in oven. The rating plate shows 3.2 kW, 230 V, 50 Hz.
                Currently fed from a spare 16 A radial in 2.5 mm² T&E. They want to know if it'll
                work.
              </>
            }
            whatToDo={
              <>
                Calculate the current first: I = P ÷ V = 3200 ÷ 230 ≈ 13.9 A. That sits comfortably
                under a 16 A MCB, and 2.5 mm² T&E in a typical install method (Reference Method C —
                clipped direct) handles 27 A. So electrically the existing circuit is fine for the
                oven on its own. Confirm the manufacturer's recommended protective device and the
                isolator type before signing off.
              </>
            }
            whyItMatters={
              <>
                Without the P = V × I calc, you'd be guessing. The same plate could just as easily
                read 8.5 kW (a higher-spec oven) — that pulls 37 A, which a 16 A circuit absolutely
                will not handle. Determining the value before you spec the work is what AC 2.2 is
                actually testing.
              </>
            }
          />

          <UnitsPocketCard />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Voltage (V) is potential difference — the push. Always measured in parallel across two points.",
              "Current (I) in amps (A) is the flow. The amp is the SI base electrical unit; cables and protective devices are rated in amps.",
              "Resistance (Ω) is opposition. mΩ for continuity, Ω for component values, MΩ for insulation. Get the prefix right.",
              "Power (W) = V × I for DC and resistive loads. From P = V × I, transpose to find I — which is what you need to size cables and MCBs.",
              "UK supply: 230 V single-phase, 400 V three-phase, 50 Hz. ESQCR allows −6% / +10% tolerance (approx 216-253 V).",
              "Current does the damage to people. 30 mA across the chest is the RCD trip threshold for a reason.",
            ]}
          />

          <Quiz title="Electrical units knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section1/1-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                SI base and derived units
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section1/1-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                SI prefixes and conversions
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
