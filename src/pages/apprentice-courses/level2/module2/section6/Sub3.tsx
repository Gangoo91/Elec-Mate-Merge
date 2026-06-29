/**
 * Module 2 · Section 6 · Subsection 3
 * Unit 202 LO6 — AC 6.1 + 6.2
 * Capacitors — what they do, charging/discharging, time constant, on-site uses.
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
import { CapacitorSymbol, RCChargingCurve } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Capacitors (6.1/6.2) | Level 2 Module 2.6.3 | Elec-Mate';
const DESCRIPTION =
  'Capacitors store charge in an electric field. Inside motors, smoothing supplies, smart switches and PFC kit, they’re doing one of three jobs: storing, smoothing or shifting phase.';

const checks = [
  {
    id: 'capacitance-units',
    question: 'What is the unit of capacitance?',
    options: [
      'Henry (H)',
      'Ohm (Ω)',
      'Volt (V)',
      'Farad (F)',
    ],
    correctIndex: 3,
    explanation:
      'The farad. 1 F = 1 coulomb of charge stored per 1 volt across the plates. Most real capacitors are micro-, nano- or picofarads — a 1 F cap is huge.',
  },
  {
    id: 'time-constant',
    question:
      'A 100 µF capacitor charges through a 10 kΩ resistor. What is the time constant τ?',
    options: [
      '1 ms',
      '10 ms',
      '100 ms',
      '1 second',
    ],
    correctIndex: 3,
    explanation:
      'τ = R × C = 10,000 × 0.0001 = 1 second. After 1τ the cap reaches 63% of the supply; after roughly 5τ (5 seconds here) it’s essentially fully charged.',
  },
  {
    id: 'motor-cap-job',
    question: 'What is a motor-start (or motor-run) capacitor doing on a single-phase induction motor?',
    options: [
      'Smoothing the supply voltage to stop the motor running noisily',
      'Phase-shifting the start winding so the motor sees a rotating magnetic field and produces starting torque.',
      'Correcting the power factor of the motor so the supply runs cooler',
      'Storing energy to keep the motor turning through brief supply interruptions',
    ],
    correctIndex: 1,
    explanation:
      'Single-phase motors don’t produce a rotating field on their own. The capacitor shifts the current in the start winding by ~90°, creating an artificial rotating field that gets the rotor turning.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does a capacitor store?',
    options: [
      'Energy in a magnetic field around a coil',
      'Charge in an electric field between two plates.',
      'Current, which it releases at a steady rate',
      'Voltage, by chemically converting it like a battery',
    ],
    correctAnswer: 1,
    explanation:
      'Two conductive plates separated by an insulator (the “dielectric”). Apply a voltage and charge builds up on the plates — energy is stored in the electric field between them.',
  },
  {
    id: 2,
    question: 'The defining equation for capacitance is:',
    options: [
      'P = VI',
      'V = IR',
      'C = Q/V',
      'F = ma',
    ],
    correctAnswer: 2,
    explanation:
      'Capacitance C (in farads) equals the charge Q (in coulombs) stored per unit voltage V across the plates. Bigger plates or a thinner dielectric = more charge stored per volt = higher capacitance.',
  },
  {
    id: 3,
    question: 'When you first connect a capacitor to a DC supply through a resistor, what happens?',
    options: [
      'No current flows at all because the capacitor blocks DC entirely',
      'A steady current flows for as long as the supply is connected',
      'The current rises slowly from zero to a steady maximum',
      'Current flows briefly while the capacitor charges, then drops to zero.',
    ],
    correctAnswer: 3,
    explanation:
      'A discharged cap looks like a short circuit at the moment of connection — full current flows. As it charges, the voltage across it rises, the current falls, and once it’s fully charged, no DC current flows.',
  },
  {
    id: 4,
    question: 'After one time constant τ (= R × C), a charging capacitor reaches roughly what percentage of supply voltage?',
    options: [
      '63%',
      '37%',
      '20%',
      '100%',
    ],
    correctAnswer: 0,
    explanation:
      'After 1τ the cap reaches 1 − 1/e ≈ 63.2% of supply. After 5τ it’s within 1% of fully charged — for practical purposes, “done”.',
  },
  {
    id: 5,
    question: 'After one time constant τ, a discharging capacitor falls to roughly what percentage of starting voltage?',
    options: [
      '20%',
      '37%',
      '100%',
      '63%',
    ],
    correctAnswer: 1,
    explanation:
      'Mirror image of charging. After 1τ the cap falls to 1/e ≈ 36.8% of where it started; after 5τ it’s essentially flat. Same physics either way.',
  },
  {
    id: 6,
    question: 'What does a smoothing capacitor do after a rectifier?',
    options: [
      'Converts the pulsating DC back into an AC waveform',
      'Blocks the DC so only the ripple voltage reaches the load',
      'Holds charge between rectifier pulses, filling in the gaps to give a steadier DC voltage.',
      'Limits the peak current the rectifier diodes have to carry',
    ],
    correctAnswer: 2,
    explanation:
      'The rectifier’s output is pulsating DC. The capacitor charges up to the peak of each pulse, then discharges slowly into the load between pulses. Bigger cap = less ripple voltage = smoother DC.',
  },
  {
    id: 7,
    question: 'You replace a faulty motor-run capacitor on a single-phase compressor. The new cap is the same µF but a lower voltage rating. Is that OK?',
    options: [
      'Yes — the µF value is what matters; the voltage rating is only a rough guide',
      'Yes — a lower voltage rating actually makes the motor start more gently',
      'Only if you fit two of them in series to share the voltage',
      'No — voltage rating must equal or exceed the original. Underrated caps fail (often explosively) under mains-side stress.',
    ],
    correctAnswer: 3,
    explanation:
      'Capacitor voltage rating is a maximum, not a guideline. Use a lower-rated cap and the dielectric breaks down — at best it dies quickly, at worst it explodes hot oil out of the can. Always match or exceed the original spec.',
  },
  {
    id: 8,
    question: 'Why does BS 7671 require compensation capacitors over a certain size to be used with discharge resistors?',
    options: [
      'Because a charged capacitor can hold a dangerous voltage long after the supply is removed — a hidden shock hazard for whoever opens the unit next.',
      'Because the capacitor would otherwise draw current continuously and waste energy when isolated.',
      'Because an undischarged capacitor raises the power factor of the installation above unity.',
      'Because the discharge resistor is needed to limit the inrush current when the supply is first connected.',
    ],
    correctAnswer: 0,
    explanation:
      'Capacitors don’t care that you’ve turned the supply off. A 30 µF motor-run cap charged to 400 V can hold that voltage for minutes — long enough to belt the next person who opens the cover. Safe isolation means proving stored charge has been bled off, too.',
  },
];

const faqs = [
  {
    question: 'Where do I actually meet capacitors on site?',
    answer:
      'Three big places. (1) Inside every power supply: smoothing the rectifier output. (2) Inside single-phase motors: as motor-start and motor-run caps creating a phase shift to start the rotor turning. (3) Inside power factor correction (PFC) cabinets in commercial/industrial premises: big banks of caps cancelling out the inductive reactance of motors so the supply stays close to unity power factor.',
  },
  {
    question: 'How do I read the value on a capacitor?',
    answer:
      'Through-hole electrolytic caps (the big cylinders with a stripe down one side) print the value plainly: e.g. “100 µF 25 V”. The stripe marks the negative terminal — always observe polarity. Small ceramic caps use a three-digit code like “104”: first two are digits, third is the multiplier in picofarads. So “104” = 10 × 10⁴ pF = 100,000 pF = 0.1 µF = 100 nF.',
  },
  {
    question: 'What’s the difference between a motor-start and a motor-run capacitor?',
    answer:
      'Motor-start caps are big-µF (often 100–400 µF), short-time devices used only during start-up and disconnected by a centrifugal switch once the motor’s up to speed. Motor-run caps are smaller (5–80 µF), oil-filled, designed to stay in circuit continuously, and rated for full mains voltage. Wrong cap in the wrong slot = motor either won’t start or burns out within months.',
  },
  {
    question: 'Why do PFC cabinets exist?',
    answer:
      'Inductive loads (motors, fluorescents, transformers) draw a current that lags the voltage. The supply has to deliver more apparent power (kVA) than the actual real power (kW) being used — the difference is wasted in the cables and in the supply network. Capacitor banks deliberately leading the current cancel out the lag, bringing the power factor close to 1. Lower bills, smaller switchgear, less heat. Same principle, just industrial scale.',
  },
  {
    question: 'Is it safe to short out a charged capacitor with a screwdriver to discharge it?',
    answer:
      'No — at best you get a flash and pit your screwdriver; at worst you get burnt and the cap is destroyed in a way that hides the original fault. Use a proper discharge resistor (a 10 kΩ, 5 W resistor with insulated leads) clipped across the terminals. For larger industrial caps, follow the manufacturer’s safe discharge procedure or use a dedicated discharge tool.',
  },
  {
    question: 'Why does my multimeter sometimes read a voltage on a “dead” circuit with a big cap?',
    answer:
      'Because the cap is doing exactly what it’s designed to do — holding charge. Always include capacitor discharge time (or active discharge) in your safe isolation procedure when working on PFC, drives, motor starters, or large power supplies. Prove dead means prove dead, including stored charge.',
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
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 3"
            title="Capacitors"
            description="The other big component you’ll meet on every PCB — and the one apprentices most often underestimate. Stores charge. Holds it. Bites if you forget to discharge it."
            tone="emerald"
          />

          <TLDR
            points={[
              'A capacitor stores charge in an electric field between two plates. Unit: farad (F). C = Q/V.',
              'Charging through a resistor follows an exponential curve. Time constant τ = R × C — at 1τ you’re at 63%, at 5τ you’re “done”.',
              'Three big jobs on site: smoothing rectifier output, starting/running single-phase motors, and power factor correction in industrial supplies.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define capacitance C in farads using C = Q/V.',
              'Describe the charging and discharging behaviour of a capacitor through a resistor.',
              'Calculate the time constant τ = RC and use it to estimate charge/discharge times.',
              'Identify electrolytic, ceramic and motor-run capacitors on real kit and read their markings.',
              'Explain three on-site uses: smoothing, motor start/run, and power factor correction.',
              'Describe the shock hazard from a charged capacitor and how to discharge one safely.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What it is, what it does</ContentEyebrow>

          <ConceptBlock
            title="Two plates and an insulator — that’s the whole component"
            plainEnglish="Two metal plates with something insulating between them. Push voltage on, charge stacks up on the plates. Take the voltage off and the charge stays."
            onSite="Open a single-phase motor terminal box and you’ll see a sealed metal can — that’s the motor-run cap. Two plates, oil-impregnated paper between them, all rolled up into a cylinder."
          >
            <p>
              Before the maths, picture it like a bucket. Imagine the plates as a bucket. Voltage
              is how full the bucket gets. Capacitance is how big the bucket is. Charge is the
              amount of water inside. Push current in and the bucket fills. Tip it up and the water
              flows out — that’s discharge. The bigger the bucket (more capacitance), the more
              charge it holds for the same fill level (voltage).
            </p>
            <p>
              Under the bonnet, a capacitor is two conductive plates separated by an insulating
              material called the <strong>dielectric</strong>. Apply a voltage across the plates and
              electrons pile up on one plate (and are pulled off the other), storing charge in the
              electric field between them. Remove the voltage and that charge stays put — until you
              give it somewhere to go.
            </p>
            <p>
              The defining equation is dead simple — and it’s the bucket analogy in symbols:
            </p>
            <p className="text-center text-[16px] font-semibold tracking-wide">C = Q / V</p>
            <p>
              Capacitance C in farads (F) equals the charge Q in coulombs (C) stored per unit
              voltage V (volts) across the plates. The farad is a huge unit — 1 F is more charge
              than most circuits will ever see. Real components are usually:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Picofarads (pF)</strong> — 10⁻¹² F. Small ceramic caps in radio circuits.</li>
              <li><strong>Nanofarads (nF)</strong> — 10⁻⁹ F. Decoupling on chips, snubbers across switches.</li>
              <li><strong>Microfarads (µF)</strong> — 10⁻⁶ F. Smoothing supplies, motor caps, PFC.</li>
              <li><strong>Millifarads / farads</strong> — bus capacitors in EV inverters, super-caps in UPS systems.</li>
            </ul>
            <div className="flex justify-center pt-2">
              <CapacitorSymbol label="Non-polarised capacitor (IEC symbol)" />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Capacitor types you’ll meet"
            onSite="The three you’ll see most: ceramic discs (small, marked “104” style), electrolytic cans (big cylinders with a polarity stripe) and motor-run cans (sealed metal, two big spade terminals)."
          >
            <p>
              The dielectric material decides the type, and each type has its own job:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ceramic</strong> — small, non-polarised, low values (pF–nF). Used for
                decoupling chip power pins, EMI suppression and snubbers across switches.
              </li>
              <li>
                <strong>Electrolytic (aluminium / tantalum)</strong> — big values (µF–mF), polarised
                (positive and negative leads — get them wrong and they vent or explode). Used for
                smoothing rectifier output and bus capacitance in DC supplies.
              </li>
              <li>
                <strong>Film (polypropylene, polyester)</strong> — non-polarised, robust, used in
                snubbers, motor-run caps and audio circuits.
              </li>
              <li>
                <strong>Motor-run / motor-start (oil-filled)</strong> — heavy-duty, mains-voltage
                rated, used on single-phase motors. Run caps are continuous; start caps are
                short-duty and switched out at speed.
              </li>
              <li>
                <strong>Power factor correction (PFC)</strong> — large dry-type or oil-filled
                three-phase capacitor banks fitted at intake panels in commercial premises.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The maths you actually need</ContentEyebrow>

          <ConceptBlock
            title="Charging through a resistor — the RC time constant"
            plainEnglish="A capacitor doesn’t charge instantly. The bigger the resistor in series, the longer it takes. The bigger the cap, the longer it takes."
          >
            <p>
              When you connect a discharged capacitor to a DC supply through a resistor, the
              voltage on the cap rises along an exponential curve. The shape of that curve is set
              by one number: the <strong>time constant τ</strong>:
            </p>
            <p className="text-center text-[16px] font-semibold tracking-wide">τ = R × C</p>
            <p>
              R in ohms, C in farads, τ in seconds. The behaviour is fixed by physics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At <strong>1τ</strong>: capacitor voltage = 63% of supply.</li>
              <li>At <strong>2τ</strong>: 86%.</li>
              <li>At <strong>3τ</strong>: 95%.</li>
              <li>At <strong>5τ</strong>: 99%+ — for all practical purposes, fully charged.</li>
            </ul>
            <p>
              Worked example: 100 µF cap charging through 10 kΩ. τ = 10,000 × 100 × 10⁻⁶ = 1 second.
              After 1 s the cap is at 63% of supply. After 5 s it’s effectively done.
            </p>
            <RCChargingCurve mode="charge" />
          </ConceptBlock>

          <ConceptBlock
            title="Discharging — the same curve, mirrored"
            onSite="If you’ve ever opened a switch-mode PSU and seen the voltage on the bus cap take 30 seconds to drain through a bleed resistor, you’ve watched τ in action."
          >
            <p>
              Discharging is the same shape, just falling instead of rising. After 1τ the voltage
              has dropped to 37% of where it started; after 5τ it’s near zero.
            </p>
            <p>
              That’s why bleed resistors exist on big DC bus capacitors — the manufacturer chooses
              R so the cap discharges to a safe level (typically below 50 V) within a known time
              after the supply is removed. No bleed resistor (or a failed one) means the cap can
              hold full voltage indefinitely.
            </p>
            <RCChargingCurve mode="discharge" />
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 559.7 (Compensation capacitors)"
            clause="Compensation capacitors having a total capacitance exceeding 0.5 µF shall only be used in conjunction with discharge resistors. Capacitors and their marking shall be in accordance with BS EN 61048. This requirement does not apply to capacitors forming part of the equipment."
            meaning={
              <>
                Anything more than ~0.5 µF can hold enough charge to give you a serious belt
                minutes after the supply’s been removed. Power factor correction banks
                specifically must include discharge resistors so the cap drains to a safe voltage
                in a known time. Capacitors built into appliances (motor-run caps, smoothing caps
                inside drives) are exempt from this specific reg, but the manufacturer still
                specifies a discharge time you must respect.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5 Chapter 55 Regulation 559.7."
          />

          <VideoCard
            url={videos.capacitors.url}
            title={videos.capacitors.title}
            channel={videos.capacitors.channel}
            duration={videos.capacitors.duration}
            topic="Capacitors · Unit 202 LO6.1 / 6.2"
            caption="Optional deeper dive — Engineering Mindset shows the plates, the dielectric, the charge build-up and the RC curve as animations. Much easier to grasp than from the equation alone."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What capacitors do on real kit</ContentEyebrow>

          <ConceptBlock
            title="Job 1 — smoothing the output of a rectifier"
            plainEnglish="The rectifier gives lumpy DC. The cap charges to the peak of each lump, then drips out into the load between lumps. Result: near-steady DC."
          >
            <p>
              Almost every DC supply you’ll ever open follows this pattern: transformer (or
              switch-mode primary) → bridge rectifier → big electrolytic capacitor → DC output.
              The cap is doing all the smoothing. Bigger cap = less ripple voltage between pulses
              = cleaner DC. Modern switch-mode supplies use much smaller caps because they switch
              at high frequency (tens of kHz), but the principle is the same.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Job 2 — starting and running single-phase motors"
            onSite="If a single-phase pump or compressor hums but doesn’t turn, the start cap is the first thing to suspect. They dry out and lose capacitance long before they fail completely."
          >
            <p>
              A single-phase induction motor on its own won’t start — its magnetic field doesn’t
              rotate, it just pulses up and down. The cap fixes this by feeding current to a second
              (start) winding offset by 90 mechanical degrees, with the current shifted in time by
              roughly 90 electrical degrees. The result is an artificial rotating field that gets
              the rotor moving in a definite direction.
            </p>
            <p>
              Two flavours:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capacitor-start motors</strong> — large electrolytic cap (typical 100–400 µF)
                on the start winding only, switched out by a centrifugal switch once the motor
                reaches running speed. High starting torque.
              </li>
              <li>
                <strong>Capacitor-start, capacitor-run (PSC) motors</strong> — both a start cap and
                a smaller (5–60 µF) oil-filled run cap that stays in circuit. Smoother running and
                better efficiency.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Job 3 — power factor correction (PFC)"
            plainEnglish="Inductive loads make the current lag the voltage. Caps make the current lead. Combine the two and you cancel out the lag — bills go down, supply runs cooler."
          >
            <p>
              In an industrial site full of motors, the supply current lags the voltage. The supply
              network has to deliver more apparent power (kVA) than the actual real power (kW)
              being used — and the supplier charges for that. Banks of capacitors fitted at the
              main intake panel inject leading current that cancels out the lag, dragging the power
              factor close to 1.
            </p>
            <p>
              You’ll see PFC banks as switchgear-style cabinets with rows of capacitor cans inside,
              switched in and out by contactors as the load changes. Modern installations use
              static (no moving parts) PFC, but the core component is still the capacitor.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Chapter 53 (Protection, isolation and switching)"
            clause="This chapter (Chapter 53) deals with general requirements for protection, isolation, switching, control and monitoring and with the requirements for selection and erection of the devices provided to fulfil such functions."
            meaning={
              <>
                Anywhere capacitors store significant energy (PFC banks, drives, large DC supplies),
                isolation isn’t just opening the supply — you have to allow time (or fit active
                discharge) so the stored charge bleeds out to a safe level. Chapter 53 puts that on
                the designer; you have to follow the manufacturer’s discharge time on site.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53."
          />

          <CommonMistake
            title="Skipping the discharge step on a capacitor-heavy circuit"
            whatHappens={
              <>
                You’ve isolated a single-phase pump motor at the local switch. You unscrew the
                terminal cover to swap the motor and put your screwdriver across the run cap
                terminals. There’s a flash, you drop the screwdriver, and the customer is
                wondering what just happened.
              </>
            }
            doInstead={
              <>
                Treat capacitors as live until proven dead. Wait the manufacturer’s recommended
                discharge time (often 1–5 minutes), then prove the cap with your meter. For larger
                kit (drives, PFC, EV chargers) use a discharge resistor with insulated leads or a
                dedicated discharge tool. Stored energy = stored shock hazard.
              </>
            }
          />

          <Scenario
            title="Air-con compressor won’t start — the motor-run cap that bit back"
            situation={
              <>
                You’re on a service call to fix an air-con compressor that won’t start. You isolate
                the unit at the local switch, prove dead at the supply terminals, open the housing.
                Inside is a large oil-filled motor-start cap, marked roughly 50 µF, 450 V AC. You
                reach in to disconnect it from the windings — and get a sharp jolt across the
                wrist. You let go, swearing. The unit was off. The cap was not.
              </>
            }
            whatToDo={
              <>
                Stop. Step back. The cap was holding around 400 V from the last starting cycle —
                isolation removed the supply but didn’t bleed the cap. Discharge it properly:
                clip an insulated discharge tool (or a 10 kΩ, 5 W resistor with insulated leads
                and a series resistor, never a bare screwdriver) across the cap terminals. Wait
                a few seconds. Re-prove with your meter on DC volts — should read close to zero.
                THEN you can disconnect. Lesson burnt in: caps don’t lose charge when you flip
                the switch — they hold what they had.
              </>
            }
            whyItMatters={
              <>
                Quick energy maths — E = ½CV² = 0.5 × 50e−6 × 400² = <strong>4 J</strong>. That’s
                enough to feel sharply through skin and dangerous across the chest if it lands on
                heart muscle. BS 7671 Reg 559 demands discharge resistors on compensation
                capacitors over 0.5 µF for exactly this reason — but built-in motor caps aren’t
                covered by that reg, so the manufacturer’s discharge time is the only thing
                between you and a serious shock. Treat every isolated cap as live until your
                meter says otherwise.
              </>
            }
          />

          <Scenario
            title="The smart light switch with a capacitor inside"
            situation={
              <>
                You’re replacing a smart light switch the customer fitted themselves. They tell
                you the light won’t turn fully off — it glows faintly even when they hit the off
                button on the app. Inside the wall plate you find a tiny module: a small bridge
                rectifier, a 470 nF cap, and a relay.
              </>
            }
            whatToDo={
              <>
                The cap is the explanation. To power its electronics, the smart switch needs to
                pull a tiny current through the lamp circuit even when the relay is open — it
                charges the cap from that trickle. Modern LEDs need so little current that the
                trickle is enough to glow. Either fit a smart switch designed for LED loads (with
                a separate neutral), or fit a bypass capacitor across the lamp to absorb the
                trickle. Same physics, different wiring.
              </>
            }
            whyItMatters={
              <>
                If you don’t know what the cap is doing, you’ll keep replacing the switch and the
                bulb. Knowing why it’s there gives you the actual fix.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 332.1 (EMC of equipment) (paraphrased)"
            clause="All electrical equipment forming part of an electrical installation shall meet the appropriate electromagnetic compatibility (EMC) requirements and shall be in accordance with the relevant EMC standard. Equipment not meeting EMC standards shall not be used in installations."
            meaning={
              <>
                Capacitors are key to making electronic kit EMC-compliant — they’re the
                decoupling components that stop chips spitting noise back into the supply, and
                they’re the X- and Y-class safety caps fitted across mains conductors in every
                switch-mode supply. Cheap unbranded kit often fails EMC because the manufacturer
                left out (or undersized) the very capacitors that quiet it down.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 3, Chapter 33, Regulation 332.1 and Section 444 for the full EMC guidance."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A capacitor stores charge in an electric field between two plates. C = Q/V, unit is the farad.',
              'Charging through a resistor: τ = R × C. At 1τ you’re at 63% of supply, at 5τ you’re effectively done.',
              'Discharging follows the same curve mirrored: 37% at 1τ, near zero at 5τ.',
              'Three big on-site jobs: smoothing rectifier output, motor start/run on single-phase, and PFC on industrial supplies.',
              'Capacitors hold charge after the supply is removed. Always discharge before working on PFC banks, drives or large DC supplies.',
              'Match or exceed both the µF value AND the voltage rating when replacing. Underrated caps fail — sometimes explosively.',
            ]}
          />

          <Quiz title="Capacitors — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.2 Diodes and rectifiers
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 Transistors and switching
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
