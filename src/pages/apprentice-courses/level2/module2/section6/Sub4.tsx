/**
 * Module 2 · Section 6 · Subsection 4
 * Unit 202 LO6 — AC 6.1 + 6.2
 * Transistors and switching — BJT, MOSFET, on-site uses.
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
import { TransistorSymbol } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Transistors and switching (6.1/6.2) | Level 2 Module 2.6.4 | Elec-Mate';
const DESCRIPTION =
  'Transistors are the modern switch — a tiny signal at the base or gate controls a much bigger current. They power everything from VFDs to dimmers, smart relays and the chips inside every protective device.';

const checks = [
  {
    id: 'transistor-purpose',
    question: 'What is a transistor primarily used for in modern electronic kit?',
    options: [
      'Storing energy.',
      'Acting as an electronic switch (or amplifier) — small signal in, big current out.',
      'Rectifying AC.',
      'Generating light.',
    ],
    correctIndex: 1,
    explanation:
      'A transistor is the modern switch. A tiny base or gate signal controls a much larger collector or drain current. That’s how every microcontroller drives a relay coil, every dimmer chops the mains, and every drive feeds a motor.',
  },
  {
    id: 'bjt-vs-mosfet',
    question: 'What’s the practical difference between a BJT and a MOSFET on a board?',
    options: [
      'BJTs are faster than MOSFETs.',
      'BJTs are controlled by base current; MOSFETs are controlled by gate voltage. MOSFETs are far more common in modern power switching.',
      'They’re identical — the names just differ.',
      'MOSFETs are only used in audio.',
    ],
    correctIndex: 1,
    explanation:
      'BJT (bipolar) needs a continuous base current to stay on — simpler, robust, common in older designs. MOSFETs need only a gate voltage — almost no gate current — so a microcontroller can drive them directly. Almost every modern power switch is a MOSFET (or its industrial cousin, the IGBT).',
  },
  {
    id: 'transistor-gain',
    question: 'A small NPN BJT has a current gain (β) of 100. If you push 1 mA into the base, what’s the maximum collector current?',
    options: ['10 mA', '100 mA', '1 A', '10 A'],
    correctIndex: 1,
    explanation:
      'Ic = β × Ib = 100 × 1 mA = 100 mA. Real circuits usually run somewhere below that maximum to leave headroom — but the gain figure is what tells you how much you can switch with a given drive signal.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A transistor has three terminals on a BJT. What are they?',
    options: [
      'Anode, cathode, gate.',
      'Source, drain, gate.',
      'Base, collector, emitter.',
      'Live, neutral, earth.',
    ],
    correctAnswer: 2,
    explanation:
      'Base controls the current flowing from collector to emitter. The trick is the SCALE — a tiny base current (microamps) gates a much larger collector current (milliamps). That’s why a transistor is a "switch with gain" — your microcontroller’s 5 mA output pin can switch a 200 mA relay coil through one transistor. Without the gain, you’d need a relay to switch a relay. On a MOSFET the equivalents are gate, drain and source.',
  },
  {
    id: 2,
    question: 'In a basic NPN switch circuit, when does the transistor turn on?',
    options: [
      'When base voltage drops to zero.',
      'When base voltage rises above ~0.7 V (so base current flows).',
      'When supply voltage is removed.',
      'Never — it’s always on.',
    ],
    correctAnswer: 1,
    explanation:
      'The base-emitter junction needs about 0.7 V (silicon) to start conducting. Once it does, base current flows, and that controls the much larger collector current. Below 0.7 V the transistor is fully off.',
  },
  {
    id: 3,
    question: 'A MOSFET’s gate is controlled by:',
    options: [
      'Continuous current flow.',
      'Voltage — almost no gate current is needed in steady state.',
      'Magnetic field.',
      'Heat.',
    ],
    correctAnswer: 1,
    explanation:
      'The gate is insulated from the rest of the device. You only need to charge or discharge a small gate capacitance — once you’re at the right voltage, the gate draws essentially no current. That’s why a 5 V microcontroller pin can drive a MOSFET switching tens of amps.',
  },
  {
    id: 4,
    question: 'A microcontroller switches a 12 V relay coil that draws 80 mA. Why does the designer almost always put a transistor between the chip pin and the coil?',
    options: [
      'To increase voltage.',
      'Because a chip pin can’t supply 80 mA — the transistor lets a few mA from the chip switch the much larger coil current.',
      'To make the relay run cooler.',
      'Decoration.',
    ],
    correctAnswer: 1,
    explanation:
      'Most microcontroller pins can only source/sink a few mA. The chip’s job is decision-making, not power delivery. The transistor takes the chip’s small signal and switches the bigger current safely.',
  },
  {
    id: 5,
    question: 'What is an IGBT and where will you meet one?',
    options: [
      'A heating element.',
      'An Insulated-Gate Bipolar Transistor — used in industrial inverters, EV chargers and VFDs to switch hundreds of volts at hundreds of amps.',
      'A type of LED.',
      'A standard fuse.',
    ],
    correctAnswer: 1,
    explanation:
      'IGBTs combine the easy gate drive of a MOSFET with the high-current handling of a BJT. They’re the go-to switching device in any kit handling real power: VFDs, EV charge points, solar inverters, induction heaters, modern welders.',
  },
  {
    id: 6,
    question: 'What does PWM (pulse-width modulation) mean and why do drives use it?',
    options: [
      'A type of cable.',
      'Switching the supply on and off rapidly (kHz) at a varying duty cycle to control the average power delivered — used in dimmers, VFDs and EV chargers.',
      'A type of RCD.',
      'A measurement standard.',
    ],
    correctAnswer: 1,
    explanation:
      'A transistor switching at, say, 4 kHz with a 50% duty cycle delivers half full power. Vary the duty cycle and you vary motor speed, lamp brightness or heater output — all without burning energy in a resistor. This is how every modern VFD, dimmer and heating control works.',
  },
  {
    id: 7,
    question: 'Why does a transistor used as a switch need a heatsink for higher-current applications?',
    options: [
      'For decoration.',
      'Because while switching (and especially when partly on) the transistor dissipates power as heat — too much heat and it fails.',
      'It doesn’t — transistors don’t make heat.',
      'To stop electromagnetic interference.',
    ],
    correctAnswer: 1,
    explanation:
      'Even fast switching has a transition where the transistor is partly on and partly dropping voltage — V × I = power dissipated as heat. The faster the switching and the bigger the current, the more heat per second. Hence the metal heatsink (and sometimes a fan) bolted to power transistors in any drive or PSU.',
  },
  {
    id: 8,
    question: 'You’re troubleshooting a smart RCBO and find the trip relay is being driven by a small transistor on the PCB. The transistor reads short-circuit between two of its leads. Conclusion?',
    options: [
      'Replace the transistor and re-energise.',
      'The transistor has failed (a common failure mode); the entire RCBO must be replaced — we don’t component-repair safety devices.',
      'Bypass the transistor with a wire link.',
      'Ignore it and continue.',
    ],
    correctAnswer: 1,
    explanation:
      'A failed transistor is a definitive sign the device is at end-of-life. We don’t replace component-level parts on safety-critical kit — the failure mode might be hiding a bigger fault. Replace the whole RCBO and dispose of the old one safely.',
  },
];

const faqs = [
  {
    question: 'Where on site will I actually see a transistor?',
    answer:
      'You won’t see them as discrete parts very often — they’re mostly tiny black SMDs on PCBs. But the kit they live in is everywhere: variable speed drives (VFDs), EV chargers, solar inverters, smart RCBOs, AFDDs, dimmers, smart switches, LED drivers, central heating control modules. Anywhere a small signal needs to switch a bigger current, there’s a transistor.',
  },
  {
    question: 'What’s the difference between a transistor as a switch and as an amplifier?',
    answer:
      'Same component, two operating regions. As a switch, you drive it hard either fully on (saturation — low voltage drop) or fully off — binary, low losses. As an amplifier, you bias it to sit halfway, so a small AC signal at the base produces a bigger AC signal at the collector — used in audio, instrumentation, radio. Modern electrical kit overwhelmingly uses transistors as switches.',
  },
  {
    question: 'Why are MOSFETs and IGBTs replacing BJTs in power applications?',
    answer:
      'Three reasons. (1) They’re voltage-controlled — a microcontroller pin can drive them directly with no extra circuitry. (2) They switch much faster — essential for high-frequency PWM. (3) They handle much higher currents and voltages in a smaller package. BJTs still exist for low-power signal jobs, but for switching anything significant, MOSFETs/IGBTs win.',
  },
  {
    question: 'What is a "snubber" across a transistor and why is it there?',
    answer:
      'When a transistor switches off an inductive load (a relay coil, a motor winding), the inductance tries to keep the current flowing — generating a voltage spike that can fry the transistor. A snubber (usually a diode in reverse across the coil, sometimes a small resistor + cap) gives that current somewhere safe to go. You’ll see a flyback diode across nearly every relay coil on every PCB.',
  },
  {
    question: 'Can I test a transistor with a multimeter?',
    answer:
      'Most multimeters have a "diode test" mode that lets you check the two PN junctions (base-emitter and base-collector) of a BJT. Forward both should drop ~0.7 V, reverse both should be open. A short in any direction means the transistor’s dead. MOSFETs need a slightly different procedure — check the manufacturer’s tech sheet on your meter. As before, don’t replace one on a safety-critical PCB — swap the whole device.',
  },
  {
    question: 'Why does my variable-speed drive output a horrible square wave instead of a sine?',
    answer:
      'Because it’s switching — the IGBTs inside the VFD are turning fully on or fully off at high frequency, with the duty cycle modulated to approximate a sine wave at the motor terminals. The motor’s own inductance smooths the current to something close to sinusoidal, but the voltage at the terminals is still a chopped square wave. That’s why VFD-fed motors need motors rated for inverter duty and shielded cable on long runs.',
  },
];

export default function Sub4() {
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
            eyebrow="Module 2 · Section 6 · Subsection 4"
            title="Transistors and switching"
            description="The transistor replaced every mechanical switch in modern electronics. A tiny signal in controls a much bigger current out. Same idea drives every dimmer, every VFD, every smart relay."
            tone="emerald"
          />

          <TLDR
            points={[
              'A transistor is an electronic switch (or amplifier). Small signal in at the base/gate controls a much larger current out.',
              'Two main flavours: BJTs (bipolar — controlled by base current) and MOSFETs/IGBTs (controlled by gate voltage, dominant in modern power switching).',
              'PWM — switching them on/off rapidly at varying duty cycle — is how every dimmer, VFD, EV charger and modern heating control delivers variable power.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the BJT, MOSFET and IGBT symbols and name their three terminals.',
              'Explain the transistor as an electronic switch driven by a small base/gate signal.',
              'Describe pulse-width modulation (PWM) in plain terms — switching fast, varying the on-time to vary average power.',
              'Recognise transistor-based switching kit on site: VFDs, EV chargers, smart RCBOs, dimmers.',
              'Explain why we don’t component-repair power transistors on safety-critical PCBs.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The component itself</ContentEyebrow>

          <ConceptBlock
            title="What a transistor actually is"
            plainEnglish="Three terminals. A small signal at one terminal controls how much current flows between the other two."
            onSite="Inside any modern smart switch you’ll see a small chip and a few transistors. The chip decides; the transistors do the actual switching."
          >
            <p>
              A transistor is a three-terminal semiconductor device. Two terminals form the main
              current path; the third is the control terminal. Vary the signal at the control
              terminal and you vary how much current flows through the main path — anywhere from
              fully off to fully on.
            </p>
            <p>
              That’s the entire idea. Everything else — amplifiers, switches, oscillators, logic
              chips, microcontrollers, the inverter inside an EV charger — is built from
              transistors arranged in clever combinations. Modern microchips contain billions of
              them, all etched into a piece of silicon the size of a fingernail.
            </p>
            <div className="flex justify-center pt-2">
              <TransistorSymbol label="NPN BJT (IEC symbol)" />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="The two big families"
            onSite="If you only learn one, learn the MOSFET — it’s in every modern power supply, dimmer, drive and EV charger you’ll ever touch."
          >
            <p>
              Two main families dominate the kit you’ll meet on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BJT — Bipolar Junction Transistor</strong>. Three terminals: base,
                collector, emitter. Controlled by a current into the base. Two flavours: NPN
                (current flows from collector to emitter when the base goes positive) and PNP
                (the mirror image). Common in older designs and small-signal jobs. Typical part
                numbers: 2N3904 (NPN), 2N3906 (PNP), BC547.
              </li>
              <li>
                <strong>MOSFET — Metal-Oxide Semiconductor Field-Effect Transistor</strong>.
                Three terminals: gate, drain, source. Controlled by a voltage on the gate — the
                gate is insulated, so essentially no gate current flows. Dominant in modern power
                switching. Two flavours: N-channel (most common for switching loads) and P-channel
                (used for high-side switching). Typical part numbers: IRF540, IRFZ44, BSS138.
              </li>
              <li>
                <strong>IGBT — Insulated-Gate Bipolar Transistor</strong>. The hybrid: voltage
                control like a MOSFET, current handling like a BJT. The workhorse of every VFD,
                solar inverter, EV charger and induction welder you’ll ever fit. Hundreds of volts,
                hundreds of amps, switched thousands of times a second.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60617 — Graphical symbols for diagrams"
            clause="Standard transistor symbols comprise a circle (the device envelope), three terminal lines and an arrow on the emitter (BJT) or source (FET) indicating direction of current flow. NPN/N-channel devices show the arrow pointing outward; PNP/P-channel devices point inward."
            meaning={
              <>
                On a schematic the arrow on the emitter or source tells you the device type at a
                glance. Arrow pointing OUT — NPN BJT or N-channel MOSFET (most common). Arrow
                pointing IN — PNP BJT or P-channel MOSFET. Once you can read the symbol you can
                read the function in any manual you open.
              </>
            }
            cite="Verbatim wording paraphrased from BS EN 60617 — see BSI for the full symbol library."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 537.3.1.3 (Functional switching)"
            clause="Functional switching devices may control the current without necessarily opening the corresponding poles. NOTE: Semiconductor switching devices and some control auxiliaries are examples of devices capable of interrupting the current in the circuit but not opening the corresponding poles."
            meaning={
              <>
                Transistors (and TRIACs, IGBTs and the rest) are recognised by BS 7671 as
                functional switching devices — they can control current without physically
                breaking the circuit. That’s fine for switching loads on and off. But it’s a
                fundamental reason why they can never replace a proper isolator (next reg).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53, Regulation 537.3.1.3."
          />

          <SectionRule />

          <ContentEyebrow>The transistor as a switch</ContentEyebrow>

          <ConceptBlock
            title="Small signal in, big current out"
            plainEnglish="Pump 1 mA into the base. Get up to 100 mA out at the collector. That’s the headline trick."
          >
            <p>
              A BJT used as a switch has two states. <strong>Fully off</strong>: base voltage below
              ~0.7 V, no base current, no collector current. <strong>Fully on (saturated)</strong>:
              enough base current to drive the collector to its maximum (limited by whatever’s in
              series — the load). In between is the linear region where you’d run an amplifier; we
              avoid that for switching because it dissipates lots of heat.
            </p>
            <p>
              The current gain β (also written hFE) tells you the multiplier:
            </p>
            <p className="text-center text-[16px] font-semibold tracking-wide">Ic = β × Ib</p>
            <p>
              Worked example: a 2N3904 has β ≈ 100. Push 1 mA into the base → you can switch up to
              100 mA at the collector. To switch a 100 mA relay coil from a microcontroller pin
              (which can typically source 5–20 mA), this works perfectly. You drive the base with
              a few mA through a current-limiting resistor; the transistor handles the coil.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="MOSFETs — voltage in, current out"
            onSite="Almost every load you’d switch from a microcontroller in 2026 — a relay, a fan, a high-current LED string — is switched by a logic-level MOSFET. Smaller, cheaper, simpler than the BJT equivalent."
          >
            <p>
              A MOSFET is controlled by gate <em>voltage</em>, not gate current. The gate sits
              behind a thin oxide insulator — there’s essentially no DC current path into the
              gate. Once you’ve charged the gate above the threshold voltage (usually a few volts
              for "logic-level" MOSFETs), the device snaps fully on. Take the voltage away and it
              snaps fully off.
            </p>
            <p>
              The advantage: a 3.3 V or 5 V microcontroller can drive a MOSFET switching tens of
              amps directly, with nothing more than the chip pin and the FET itself. That’s why
              MOSFETs have replaced BJTs in nearly every modern switching application.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>PWM — the trick that runs every drive</ContentEyebrow>

          <ConceptBlock
            title="Switch fast, vary the duty cycle"
            plainEnglish="Don’t try to deliver half power by halving the voltage — you’d burn the difference in a resistor. Instead, switch the full voltage on and off rapidly. Adjust how long it’s on vs off and you adjust the average power."
          >
            <p>
              <strong>Pulse-width modulation</strong> is the technique that revolutionised power
              electronics. Instead of running a transistor in its lossy linear region, you switch
              it fully on and fully off at a high frequency (typically 1–20 kHz). The fraction of
              time it’s on — the <strong>duty cycle</strong> — sets the average power delivered:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>10% duty cycle → 10% average power.</li>
              <li>50% duty cycle → half power.</li>
              <li>100% duty cycle → full power, transistor fully on.</li>
            </ul>
            <p>
              Real-world examples: a VFD controlling motor speed PWM-switches the DC bus at a few
              kHz; an LED dimmer chops the mains at hundreds of Hz; an EV charger PWM-controls the
              charging current. In every case, fast on/off switching beats running a transistor at
              half-bias because the losses are tiny when the device is fully on or fully off, and
              non-existent when off.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Inside a VFD — why the output is a chopped square wave"
            plainEnglish="A drive doesn’t generate a clean sine wave for the motor — it builds one out of fast on/off pulses. The motor’s own inductance does the smoothing."
            onSite="Stick a True-RMS meter across the output of a VFD and you’ll often see a reading that drifts about — that’s the meter struggling with the chopped waveform, not the drive misbehaving."
          >
            <p>
              A variable-speed drive uses banks of IGBT transistors (Sub6.4 territory) switching at
              high frequency — typically 4–16 kHz — to synthesise a variable-frequency AC output
              for the motor. The output ISN’T a clean sine. It’s a <strong>PWM square wave</strong>
              that AVERAGES to a sine wave when you look at the current the motor actually draws.
            </p>
            <p>
              Here’s the trick. The IGBTs only ever sit fully on or fully off (low losses). The
              gate driver varies the on-time of each pulse — wider pulses near the peak of the
              intended sine, narrower pulses near the zero-crossing. The motor windings are highly
              inductive, and inductance resists rapid changes in current. So while the voltage at
              the motor terminals is a chopped square wave, the current through the windings
              smooths out to something close to sinusoidal at the fundamental frequency the drive
              is asking for.
            </p>
            <p>
              That square edge is why VFD-fed motors need extra care on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Shielded cable</strong> — the fast switching edges radiate EMI. A
                screened cable with the screen bonded both ends keeps the noise off neighbouring
                circuits.
              </li>
              <li>
                <strong>Output filters on long runs</strong> — over about 30–50 m the cable acts
                like a transmission line, the square edges reflect at the motor end and can double
                the peak voltage on the windings. Manufacturers spec a dV/dt or sine-wave filter
                between the drive and the motor.
              </li>
              <li>
                <strong>Inverter-duty motors</strong> — standard motor windings can’t take the
                voltage spikes from a chopped supply. A motor rated for inverter duty has thicker
                winding insulation and sometimes shaft-current bearings.
              </li>
              <li>
                <strong>True-RMS meter weirdness</strong> — even a True-RMS meter from Sub5.6 can
                mis-read the chopped waveform if its bandwidth doesn’t cover the switching
                frequency. Check the meter spec before trusting a VFD-output reading.
              </li>
            </ul>
            <p>
              You won’t design any of this — but you’ll meet the consequences when a VFD install
              keeps tripping a nearby RCD, or a motor wired up on standard cable runs hot. Knowing
              WHY (square edges, not a clean sine) gets you to the right answer faster than blind
              substitution.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where transistors live on site</ContentEyebrow>

          <ConceptBlock
            title="Real-world kit you’ll meet"
            onSite="You don’t fix the transistor itself — you replace the module. But knowing what’s inside lets you have a sensible conversation with the manufacturer’s tech support line."
          >
            <p>
              Transistors don’t look like much from the outside, but the kit built around them is
              everywhere:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Variable Frequency Drives (VFDs)</strong> — banks of IGBTs PWM-switching the
                DC bus to make a variable-frequency, variable-voltage supply for AC induction
                motors. Every modern motor speed control depends on this.
              </li>
              <li>
                <strong>EV chargers</strong> — IGBTs handle the DC fast-charging side; MOSFETs and
                power-management chips run the AC side. The pilot signal between charger and car
                is itself a PWM signal at 1 kHz.
              </li>
              <li>
                <strong>Solar inverters</strong> — IGBTs convert the panel’s DC into grid-quality
                AC. Same chopping principle as a VFD, in reverse.
              </li>
              <li>
                <strong>LED dimmers</strong> — trailing-edge dimmers use a MOSFET; older
                leading-edge dimmers use a TRIAC (a related thyristor device). Both control the
                fraction of each mains cycle that reaches the lamp.
              </li>
              <li>
                <strong>Smart RCBOs and AFDDs</strong> — small signal transistors drive the trip
                coil based on the chip’s analysis of the current waveform.
              </li>
              <li>
                <strong>Heating controls</strong> — modern boilers, immersion timers and underfloor
                heating use PWM-driven MOSFETs to deliver controlled power without huge resistive
                losses.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Trying to fault-find a VFD by replacing IGBTs on the PCB"
            whatHappens={
              <>
                A 7.5 kW VFD throws an "IGBT fault" code. Someone with a soldering iron and too
                much confidence cracks the case open and replaces the IGBT module they think looks
                burnt. The drive now blows up the new IGBT seconds after powering on.
              </>
            }
            doInstead={
              <>
                IGBTs in a drive are tightly matched and live in a thermally bonded module. The
                manufacturer specifies the replacement part, the torque settings, the gate driver
                board to swap with it, and the test sequence. We don’t component-repair power
                modules — either swap the whole drive (most common in commercial settings) or send
                it for factory refurb.
              </>
            }
          />

          <Scenario
            title="Customer’s LED dimmer flickers when the lights are dim, fine when bright"
            situation={
              <>
                You’ve fitted a row of dimmable LED downlights on a quality trailing-edge MOSFET
                dimmer. At 100% they’re fine. Below about 30% they flicker visibly.
              </>
            }
            whatToDo={
              <>
                At low duty cycles the MOSFET is only on for a tiny fraction of each mains cycle.
                The LED driver inside each lamp needs a minimum current to start its internal
                oscillator — below that, it stutters. Either fit dimmable LEDs designed for deep
                dimming, fit a "minimum load" device across the dimmer to give it something steady
                to see, or accept that 30% is the practical bottom of that combination.
              </>
            }
            whyItMatters={
              <>
                Knowing the dimmer is PWM-switching a MOSFET, and knowing the LED driver itself has
                its own electronics, lets you give the customer a real explanation instead of
                replacing kit blindly.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 537.2.2 (Isolation prohibition)"
            clause="Semiconductor devices shall not be used as isolating devices."
            meaning={
              <>
                A transistor or TRIAC turning off doesn’t physically separate the contacts —
                there’s still a tiny leakage current and, if the device fails short, full mains
                voltage downstream. That’s why every drive, every smart switch, every dimmer
                ALSO needs a mechanical isolator upstream that you can lock off. Never trust the
                electronics alone for safe isolation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53, Regulation 537.2.2."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A transistor is an electronic switch — small signal at base/gate controls a much bigger current at collector/drain.',
              'BJT controlled by base current; needs ~0.7 V on the base-emitter junction to start conducting. Current gain β multiplies base current to give collector current.',
              'MOSFET controlled by gate voltage — essentially no gate current. Lets a microcontroller pin switch big loads directly.',
              'IGBT combines the best of both — used in every modern VFD, solar inverter, EV charger, induction heater.',
              'PWM = switching the device fully on/off at high frequency, varying the duty cycle to control average power. Lossless and fast.',
              'We don’t component-repair transistors on safety-critical or sealed power modules — swap the whole device.',
            ]}
          />

          <Quiz title="Transistors and switching — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.3 Capacitors
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.5 Sensors
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
