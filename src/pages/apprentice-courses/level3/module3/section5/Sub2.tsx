/**
 * Module 3 · Section 5 · Subsection 2 — Single-phase AC motors
 * Maps to C&G 2365-03 / Unit 302 / LO3 / AC 3.2, 3.3
 *   AC 3.2 — "describe the operating principles of AC motors"
 *   AC 3.3 — "state the basic types, applications and limitations of AC motors"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 8.2, 8.3
 *
 * Capacitor-start, induction-run, PSC, shaded-pole and universal motors. Why single-phase
 * needs a phase-shift trick to start. Practical limits: efficiency, vibration, max ~7.5 kW.
 * BS 7671 §552 motor circuit requirements.
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
import { MotorEffect, SineWave } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Single-phase AC motors | Level 3 Module 3.5.2 (AC 3.2, 3.3) | Elec-Mate';
const DESCRIPTION =
  'Capacitor-start, PSC, shaded-pole and universal motors. The five families that cover almost every domestic and small commercial motor — and their practical limits.';

const checks = [
  {
    id: 'l3-m3-5-2-cap',
    question: 'A capacitor-start single-phase motor uses the capacitor to:',
    options: [
      'Smooth the supply ripple before it reaches the windings',
      'Correct the running power factor to near unity',
      'Limit the starting inrush current to the main winding',
      'Phase-shift the start winding current to create a temporary 2-phase field for starting',
    ],
    correctIndex: 3,
    explanation:
      'Single-phase has no rotating field naturally. The capacitor in series with a start winding creates a 90° phase-shifted current that, combined with the main winding, produces a temporary 2-phase rotating field for starting.',
  },
  {
    id: 'l3-m3-5-2-ind',
    question: 'A capacitor-start motor disconnects the start winding via:',
    options: [
      'A thermal overload relay tripping on inrush current',
      'A timer relay set to a fixed start duration',
      'Centrifugal switch on the rotor when speed reaches ~75 % of synchronous',
      'A voltage-sensing relay monitoring the supply terminals',
    ],
    correctIndex: 2,
    explanation:
      'Once the rotor is up to ~75 % synchronous speed, a centrifugal switch opens to remove the start winding. The motor then runs on the main winding only.',
  },
  {
    id: 'l3-m3-5-2-univ',
    question: 'A universal motor (cooker hood, drill, vacuum) works on:',
    options: [
      "Three-phase AC only, via a built-in inverter",
      "Both AC and DC because it's essentially a series-DC motor",
      "DC only, because the commutator cannot handle AC",
      "AC only, locked to the 50 Hz supply frequency",
    ],
    correctIndex: 1,
    explanation:
      'Universal = brushed series motor. Both armature and field reverse together each half-cycle on AC, so torque stays one direction. Used where high speed and high power-to-weight ratio matter.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Single-phase AC alone produces:',
    options: [
      'A smoothly rotating field like three-phase',
      'Pulsating magnetic field — no inherent rotation',
      'A steady unidirectional DC magnetic field',
      'Two counter-rotating fields of unequal size',
    ],
    correctAnswer: 1,
    explanation:
      'Single sine-wave current produces a field that pulses up and down a single axis. To get rotation you need two phases (or a phase-shift trick).',
  },
  {
    id: 2,
    question: 'Capacitor-start, capacitor-run uses:',
    options: [
      'A single capacitor switched out at full speed',
      'No capacitor, relying on a shaded-pole ring',
      'Two capacitors: large for start, small for run',
      'Two run capacitors of equal value in parallel',
    ],
    correctAnswer: 2,
    explanation:
      'High-quality units use a large electrolytic for start (then disconnected) and a small motor-run capacitor permanently in circuit for higher run efficiency.',
  },
  {
    id: 3,
    question: 'Shaded-pole motor finds use in:',
    options: [
      'Large industrial compressors and pumps',
      'High-torque cranes and hoists',
      'Cordless power tools and angle grinders',
      'Cooling fans, microwave ovens, small clocks (low torque, low cost)',
    ],
    correctAnswer: 3,
    explanation:
      'Cheapest single-phase motor. Low efficiency (~30 %), low starting torque. Used where cost matters more than performance.',
  },
  {
    id: 4,
    question: 'A universal motor compared to an induction motor:',
    options: [
      'Much higher speed (10–25 krpm vs 1500–3000)',
      'Elimination → substitution → engineering → admin → PPE',
      'Identify and fully seal all gaps',
      'To control motor speed and reduce energy consumption',
    ],
    correctAnswer: 0,
    explanation:
      "Universal motors run at very high speed because there's no synchronous-speed limit — speed depends on load. Common in vacuum cleaners and angle grinders for high power-to-weight.",
  },
  {
    id: 5,
    question: 'A single-phase capacitor-start motor reverses by:',
    options: [
      'Swapping the live and neutral supply connections',
      'Swapping the start-winding terminals OR the main-winding terminals (not both)',
      'Increasing the value of the start capacitor',
      'Reversing both the start and main winding terminals together',
    ],
    correctAnswer: 1,
    explanation:
      'Reverse one winding to flip the rotating-field direction. Reversing the supply does nothing — both windings flip together.',
  },
  {
    id: 6,
    question: 'Universal motor disadvantages:',
    options: [
      'Locked to synchronous speed, no speed control',
      'Cannot run on a DC supply at all',
      'Brushes wear, sparking, RFI emission',
      'Very low starting torque and slow run-up',
    ],
    correctAnswer: 2,
    explanation:
      'Brushes wear (maintenance). Sparking = EMI. Hence universal motors usually have RFI suppression caps. Limited life vs an induction motor.',
  },
  {
    id: 7,
    question: 'Typical efficiency of a 1 hp single-phase capacitor-start induction motor:',
    options: [
      '30–40 %',
      '99 %',
      '90–95 %',
      '60–75 %',
    ],
    correctAnswer: 3,
    explanation:
      'Single-phase motors are inherently less efficient than 3-phase due to negative-sequence loss. ~70 % typical for fractional-HP. The 3-phase equivalent is 80–90 %.',
  },
  {
    id: 8,
    question: 'Why is a single-phase induction motor never used above ~7.5 kW?',
    options: [
      'Cost, weight, vibration and low efficiency become unacceptable at higher rating',
      'To avoid confusion and track which areas have been tested',
      'Motor circuits and equipment with moderate inrush current',
      'Confirm isolation is effective and circuit is safe to work on',
    ],
    correctAnswer: 0,
    explanation:
      'Above 7.5 kW the practical disadvantages of single-phase (poor pf, high starting current, vibration) outweigh the simplicity. Use 3-phase or VFD-fed.',
  },
];

const faqs = [
  {
    question: 'Why is single-phase only practical for small motors?',
    answer:
      'No natural rotating field, so you need start tricks (capacitor, shaded pole, etc.). Negative-sequence flux causes vibration and torque pulsation. Power factor is poor (0.5–0.8 typical) and starting current is huge (5–7× full load). All these get worse with size — above ~5 kW, just use 3-phase.',
  },
  {
    question: 'What is the difference between a "capacitor-start" and "permanent split capacitor" (PSC) motor?',
    answer:
      'Capacitor-start: large electrolytic cap + centrifugal switch, only in circuit during starting. PSC: smaller cap permanently in circuit, no centrifugal switch. PSC is simpler and quieter but lower starting torque.',
  },
  {
    question: 'Why does a fan motor stop in one direction and turn the other?',
    answer:
      "Single-phase motor with no permanent rotation cue. Bumping the blade gives it the start direction; the motor then spins whichever way you started. Cheap shaded-pole fans behave like this. PSC and capacitor-start motors have a defined start direction.",
  },
  {
    question: 'Can I tell single-phase from 3-phase by looking?',
    answer:
      'Single-phase: 2 or 3 supply terminals (L, N, sometimes E). Visible capacitor on the motor body. 3-phase: 6 terminals (windings star or delta connected). No external capacitor for the running motor (PFC may be added).',
  },
  {
    question: 'Universal motor speed control?',
    answer:
      'Phase-control triac (cheapest), or PWM controller. Both vary effective average voltage. Domestic drills and food mixers use this approach. Limited control range and bad for low-speed torque.',
  },
  {
    question: 'How loud are single-phase induction motors?',
    answer:
      "Inherently noisier than 3-phase due to torque pulsation at 100 Hz (twice line frequency). Acoustic insulation helps but it's a physical limitation. Premium fans use 3-phase EC (electronically commutated) motors instead for low noise.",
  },
];

export default function Sub2() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 2"
            title="Single-phase AC motors"
            description="Capacitor-start, induction-run, PSC, shaded-pole and universal motors. The five families that cover almost every domestic and small commercial motor."
            tone="yellow"
          />

          <TLDR
            points={[
              'Single-phase AC has no natural rotating field — needs a phase-shift trick to start.',
              'Capacitor-start: large cap + centrifugal switch. Strong starting torque, brief duty cycle on the start winding.',
              'PSC (permanent split capacitor): small cap always in circuit. Quieter, lower starting torque.',
              'Shaded-pole: ring on one pole face shifts phase. Cheapest, lowest efficiency.',
              'Universal: brushed series motor. Runs on AC or DC. High speed, brush wear, RFI emission.',
              'Above ~7.5 kW you swap to 3-phase — single-phase practical limits become unworkable.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain why single-phase needs a phase-shift trick to start.',
              'Distinguish capacitor-start, PSC, shaded-pole and universal motors.',
              'Identify typical applications and limitations for each single-phase motor type.',
              'Reverse a single-phase capacitor-start motor by re-terminating one winding.',
              'Recognise typical performance limits (pf, η, starting current).',
              'Identify the most common cause of single-phase motor failure to start (failed run capacitor).',
            ]}
            initialVisibleCount={3}
          />

          <SineWave />

          <ContentEyebrow>Why single-phase is hard</ContentEyebrow>

          <ConceptBlock
            title="One sine wave doesn't rotate"
            plainEnglish="A single AC current produces a field that pulses up and down one axis — not a rotating field. Without rotation there's no torque to spin a rotor. Each motor type uses a trick to fake a second phase for starting."
          >
            <p>The standard tricks you'll meet on site:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capacitor</strong> — phase-shift via series capacitor on a separate start
                winding (capacitor-start, PSC).
              </li>
              <li>
                <strong>Inductance</strong> — phase-shift via differing inductance between start
                and run windings (induction-start, less common today).
              </li>
              <li>
                <strong>Shading ring</strong> — magnetic shading on one pole corner produces a
                weakly rotating field (shaded-pole).
              </li>
              <li>
                <strong>Commutation</strong> — brushed series motor that needs no rotating field at
                all (universal).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Double-revolving-field theory — why a pulsating field can still spin a rotor"
            plainEnglish="Mathematically a single sinusoidal field of amplitude B equals two counter-rotating fields each of amplitude B/2. One spins forward at synchronous speed, the other backward. At standstill they cancel out (net torque zero). Once the rotor is given a nudge, the forward field locks the rotor to it; the backward field becomes a small braking nuisance, not a stopper."
          >
            <p>
              This is the formal explanation for why every single-phase induction motor needs a
              starting trick but doesn't need it once running. At zero speed, slip with respect to
              the forward field equals slip with respect to the backward field (both equal 1) —
              equal and opposite torques. Once a rotor is rotating at, say, 4 % slip on the forward
              field, it sees 196 % slip on the backward field, where the backward torque has fallen
              off the side of the torque-slip curve.
            </p>
            <p>
              Practical consequence — the backward field never goes away. It remains as a small
              braking torque and as a 100 Hz (twice supply frequency) torque pulsation. That
              pulsation is what makes single-phase motors noisier than three-phase, and why
              they're rarely used above ~7.5 kW. Every full cycle of mains, the rotor receives
              one helpful pulse and one mild brake. You can hear it on a quiet washing machine
              pump.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The five families</ContentEyebrow>

          <ConceptBlock
            title="Capacitor-start, PSC, shaded-pole, universal, synchronous"
            plainEnglish="Each one trades complexity for performance. Pick the right family for the job."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Capacitor-start, induction-run</strong> — start winding + electrolytic cap
                + centrifugal switch. Cap drops out at ~75 % speed. Strong start, run on main
                winding only. Compressors, pumps, conveyors. ~70 % efficiency.
              </li>
              <li>
                <strong>Permanent Split Capacitor (PSC)</strong> — smaller motor-run cap, always
                in circuit. Lower start torque, no switch, quieter. Fans, AC blowers. ~75 %
                efficiency.
              </li>
              <li>
                <strong>Capacitor-start, capacitor-run</strong> — best of both. Large electrolytic
                for start + small motor-run for steady. Higher cost. Premium fan and HVAC drives.
              </li>
              <li>
                <strong>Shaded-pole</strong> — copper ring on a corner of each pole. Tiny phase
                shift starts the rotor weakly. Cheap, low efficiency (~30 %). Cooling fans,
                microwaves, small clocks.
              </li>
              <li>
                <strong>Universal (series brushed)</strong> — runs AC or DC. High speed
                (10–25 krpm). Vacuum cleaners, angle grinders, blenders, drills. Brush wear, RFI
                emission.
              </li>
              <li>
                <strong>Synchronous (small)</strong> — clock motors, turntables. Locked to mains
                frequency for accurate speed. Permanent magnet or hysteresis types.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Capacitor-start in detail — the centrifugal switch and why it ages"
            plainEnglish="The start winding is wound from finer wire than the run winding and carries current only briefly. In series with it sits a high-µF electrolytic motor-START capacitor (rated for short, intermittent duty). At about 75 % of synchronous speed a centrifugal switch on the rotor opens and disconnects both the start winding and the cap. The motor finishes accelerating on the run winding alone."
            onSite="When you hear a single-phase motor hum without rotating, ALWAYS test the cap and the centrifugal switch — they're the cheap consumables. Replace before condemning the whole motor."
          >
            <p>
              <strong>Why two windings?</strong> Geometry. The start winding is laid 90 electrical
              degrees away from the run winding around the stator. The capacitor in series with
              the start winding shifts its current 90° in time. The combination of spatial-90°
              plus time-90° produces a true (if temporary) rotating field. That's the whole
              purpose of the capacitor — without it, both windings would carry currents in phase,
              and the result would still be a pulsating field.
            </p>
            <p>
              <strong>Why the centrifugal switch ages.</strong> Spring-loaded weights pivot
              outward as the rotor speeds up. After 50 000+ start cycles the spring weakens, the
              contacts pit, or grease in the pivots gums up. Symptoms: motor hums and won't start
              (switch failed open), or motor runs hot and start cap cooks itself (switch failed
              closed).
            </p>
            <p>
              <strong>Cap selection.</strong> The motor-START cap is electrolytic, 70–400 µF
              typical, AC-rated to ~250 V, designed for ≤3 % duty cycle. The motor-RUN cap is
              metallised polypropylene, 2–60 µF typical, AC-rated 370 or 450 V, designed for
              100 % continuous duty. Swap them at your peril — a start cap left permanently in
              circuit boils itself dry within hours.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Universal motor — the brushed series motor that survives the 21st century"
            plainEnglish="A universal motor is a series-DC machine deliberately designed to also run on AC. Both armature current and field current reverse together each half cycle, so torque stays in the same direction. Power-to-weight is exceptional — that's why every cordless drill, vacuum cleaner, food mixer, angle grinder and hair-dryer is one."
          >
            <p>
              <strong>Construction</strong> is essentially a brushed-DC series motor with the field
              winding split into two halves (one each side of the armature) for symmetric magnetic
              circuit, and laminated iron throughout the field path (a solid field would have huge
              eddy losses on AC). Speed is set by the load — light load → very high speed
              (10 000–30 000 rpm typical), heavy load → speed plummets. There's no synchronous-speed
              limit because the rotating field concept doesn't apply.
            </p>
            <p>
              <strong>Strengths:</strong> 200–400 W from a motor that fits in your hand. High
              starting torque. Speed easily controlled by triac phase-control (the £2 dimmer
              hidden inside every variable-speed drill).
            </p>
            <p>
              <strong>Weaknesses:</strong> brush wear (typically 200–1000 hours of duty),
              commutator arcing creates radio-frequency interference (every universal motor needs
              an RFI suppression capacitor and often a small choke for CE/UKCA compliance),
              audible noise, and short life vs an induction motor. Not used for continuous-duty
              industrial machines — but unbeatable for portable hand tools.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Shaded-pole — the cheapest motor on the planet, and the limits of cheap"
            plainEnglish="A shaded-pole motor has a salient-pole stator with one corner of each pole face wrapped in a heavy copper ring (the 'shading ring'). The ring acts as a single-turn shorted secondary. The flux through the shaded portion lags the flux through the unshaded portion by ~30°, creating a weak rotating field that drags the squirrel-cage rotor into motion."
          >
            <p>
              <strong>Performance is modest at best:</strong> starting torque ~50 % of rated
              running torque, full-load efficiency 15–35 %, power factor 0.4–0.6, slip 8–15 %
              (much higher than a properly-engineered single-phase motor). But the cost is
              unbeatable — no capacitor, no centrifugal switch, no auxiliary winding, no
              electrolytic. Just a single main winding and a few grams of copper ring.
            </p>
            <p>
              <strong>Where you'll meet it:</strong> cooker hood extract fans, bathroom extract
              fans, microwave oven turntables, fridge condenser fans, small mains-powered clocks,
              low-cost desktop fans. Anywhere the application can tolerate low torque, low
              efficiency and no speed control beyond a series resistor or a 2-tap winding.
            </p>
            <p>
              <strong>Diagnostic tip:</strong> shaded-pole motors are non-reversible by terminal
              swapping. The shading rings are physically fixed in one corner of each pole,
              defining one rotation direction. If a customer wants to reverse a shaded-pole fan,
              you replace it — you can't rewire it.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="ECM and BLDC — what's actually inside a 'modern' fan or pump"
            plainEnglish="The single-phase induction motor in a circulator pump or AHU fan has been quietly replaced over the last decade by an electronically commutated motor (ECM) — a brushless DC permanent-magnet motor with a small built-in drive. Same supply (230 V single-phase), same physical mounting, but 30–60 % less energy used."
            onSite="When a customer reports their 'AC pump' is leaking earth current and tripping a Type AC RCD, it's almost certainly an ECM internally — needs Type A or Type B RCD per the data sheet."
          >
            <p>
              <strong>Inside an ECM:</strong> the input mains is rectified to a DC bus; an
              electronic 3-phase inverter (built into the motor body) drives the permanent-magnet
              stator winding; rotor position is sensed by Hall-effect ICs or sensorless back-EMF
              detection; speed is set by a 0–10 V signal, PWM input or built-in pressure
              transducer. From outside it looks like an old-school PSC motor. Inside it's a
              miniature VFD-fed PMSM.
            </p>
            <p>
              <strong>Why the change?</strong> ErP/Ecodesign Lot 11 (circulators) and Lot 32
              (fans) made the inefficient PSC motor effectively illegal for new product placement.
              A 100 W traditional pump runs at ~30 W as an ECM equivalent. A wet-rotor circulator
              that ran 24/7 saves around £30 per year per unit. Multiply across millions of UK
              homes and the regulation pays back nationally.
            </p>
            <p>
              <strong>Implications for the electrician:</strong> ECM and BLDC motors leak DC and
              HF current to earth via internal EMC capacitors — they need Type A or Type B RCD
              protection (depending on the drive design), not Type AC. Always read the unit data
              sheet before specifying the protective device.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.inductionMotor.url}
            title={videos.inductionMotor.title}
            channel={videos.inductionMotor.channel}
            duration={videos.inductionMotor.duration}
            topic={videos.inductionMotor.topic}
          />

          <RegsCallout
            source="BS EN 60034-30-1:2014 — Efficiency classes for line-operated AC induction motors"
            clause="Single-phase motors are within the scope of the standard. Efficiency classes IE1, IE2, IE3 and IE4 apply, with the minimum permitted efficiency depending on motor rating and number of poles."
            meaning={
              <>
                UK Ecodesign requirements for single-phase motors below 0.75 kW are less strict
                than 3-phase, but pf and η are still part of CE/UKCA marking. For larger
                single-phase units, switching to 3-phase + VFD often gives better efficiency at
                lower cost over life.
              </>
            }
            cite="Source: BS EN 60034-30-1:2014; Ecodesign Regulation 2019/1781."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 552.1.2 (Motor overload protection)"
            clause="Every electric motor having a rating exceeding 0.37 kW shall be provided with control equipment incorporating means of protection against overload of the motor. This requirement does not apply to a motor incorporated in an item of current-using equipment complying as a whole with an appropriate British or Harmonized Standard."
            meaning={
              <>
                Any single-phase motor above 0.37 kW (about half a horsepower) needs an overload
                device — typically a thermal overload relay or built-in motor protection in the
                contactor or VFD. The exception covers small appliance motors that already comply
                with their own product standard (e.g. a washing machine drive). For installed
                single-phase motors on site, always specify the overload device on the motor
                control schematic.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 552.1.2."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.15.202 (Means of switching off motors)"
            clause="Every fixed electric motor shall be provided with an efficient means of switching off, readily accessible, easily operated and so placed as to prevent danger."
            meaning={
              <>
                Single-phase pumps, fans and compressors all need a local isolator within sight
                of the motor — a lockable rotary or pull-cord switch is the standard. Reg
                132.15.202 is what enforces "isolator at the machine" on every fixed installation
                regardless of phase. On a capacitor-start motor the isolator must break the line
                conductor cleanly so the start capacitor can discharge through its bleed resistor
                before any maintenance work begins.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.15.202."
          />

          <SectionRule />

          <ConceptBlock
            title="Reversing single-phase motors — why swapping line and neutral does nothing"
            plainEnglish="To reverse a three-phase motor you swap any two phases (Sub 5.3). Single-phase has only one phase so that doesn't apply. Reversing the supply (live and neutral) ALSO does nothing — both windings have their voltage reversed simultaneously, so the rotating field doesn't change direction. The trick: reverse the connections of just ONE winding (start or run), not both."
          >
            <p>
              Inside a capacitor-start motor are four winding terminals — two for the run winding,
              two for the start winding. The capacitor and centrifugal switch are in series with
              the start winding. Swapping the two start-winding terminals (or the two run-winding
              terminals — but never both at once) flips the spatial sense of one winding's field,
              reverses the direction of the rotating field, and the motor spins the other way.
            </p>
            <p>
              Most domestic single-phase motors have the start-winding terminals brought out to a
              small terminal block in the conduit box, often labelled Z1 / Z2 (start) and U1 / U2
              (run). Swap Z1 and Z2 leads to reverse rotation. Some motors have a built-in
              reversing switch that does this internally; many don't, and the customer thinks the
              motor is non-reversible until you open the box.
            </p>
            <p>
              <strong>Shaded-pole motors are the exception</strong> — they cannot be electrically
              reversed, full stop. The shading rings are physically fixed in one corner of each
              pole, defining the rotation direction at manufacture. A 'reversible' shaded-pole
              product is actually two motors back-to-back sharing a shaft, with one or the other
              energised. If a customer wants reverse rotation on a shaded-pole fan, replace the
              unit with a different model.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Replacing a failed motor-run cap with a wrong-µF or wrong-V part"
            whatHappens={
              <>
                Old motor-run cap was 50 µF 450 V AC. Apprentice fits a 47 µF 400 V cap from the
                van. Motor runs but vibrates badly; cap swells and fails within weeks because
                400 V AC rating is below the 230 V × √2 = 325 V peak supply.
              </>
            }
            doInstead={
              <>
                Match exact µF (or within 5 %); use a cap rated ≥ 450 V AC for 230 V mains
                operation; specify motor-run (continuous duty) not motor-start (intermittent).
                Wrong cap = poor starting + early failure.
              </>
            }
          />

          <CommonMistake
            title="Diagnosing a humming motor as 'burnt out'"
            whatHappens={
              <>
                Pump won't start, just hums. Apprentice condemns the whole pump and orders a
                replacement. Real problem was a £4 run capacitor that had lost most of its
                capacitance. Customer paid £200 for a new pump that wasn't needed.
              </>
            }
            doInstead={
              <>
                Always test the cap first on any humming single-phase motor. Use a multimeter on
                capacitance range, or substitute a known-good cap. ~80 % of "won't start" calls
                on single-phase motors are failed run capacitors. £2 part, 10-minute job. Saves
                replacing a perfectly good motor.
              </>
            }
          />

          <Scenario
            title="Replacing a domestic central-heating circulator pump motor"
            situation={
              <>
                Old central-heating pump (single-phase, ~100 W). PSC motor (small cap visible).
                Pump intermittent — sometimes won't start. Cap reads 6 µF on the meter, the plate
                says 10 µF.
              </>
            }
            whatToDo={
              <>
                Cap has lost capacitance. Replace with same µF (10 µF) and same V rating
                (typically 450 V AC) motor-run cap.
                <br />
                Test: with new cap, pump starts immediately. If still intermittent, motor windings
                are at fault (open or shorted run winding) — replace pump unit.
                <br />
                If retrofitting an ECM circulator (Ecodesign Lot 11 compliance), check the supply
                circuit RCD type — must be Type A or Type B per the unit data sheet.
              </>
            }
            whyItMatters={
              <>
                ~80 % of single-phase motor "won't start" calls are failed run capacitors. £2
                part, 10-minute job. Saves replacing a perfectly good motor and identifies the
                modern ECM/RCD-type compatibility issue early.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Single-phase needs a phase-shift trick to start: cap, induction or shading ring.',
              'Capacitor-start: strong start, centrifugal switch removes start cap. Compressors, pumps.',
              'PSC: continuous small cap. Fans, blowers. Quieter and simpler.',
              'Shaded-pole: cheapest, ~30 % efficient. Cooling fans, microwaves, small clocks.',
              'Universal: brushed series motor, runs AC or DC, high speed. Vacuum, drill, blender.',
              'Above ~7.5 kW, switch to 3-phase — single-phase practical limits become unworkable.',
              'Failed run cap is the most common cause of "won\'t start" motors.',
              'BS 7671 §552.1.2: every motor above 0.37 kW needs overload protection.',
            ]}
          />

          <Quiz title="Single-phase motors knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section5-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.1 DC machines
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Three-phase induction motors
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
