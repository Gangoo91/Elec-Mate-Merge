/**
 * Unit 319E · Criterion 3.3 — The basic types, applications and limitations of a.c. motors
 *
 * Written to the criterion rather than ported, and structured in the order the
 * criterion asks for: each family is introduced, then what it is used for, then
 * what stops it being used for everything else.
 *
 * Technical facts taken from the existing English teaching in
 *   level3/module3/section5/Sub2.tsx (single-phase families — capacitor-start,
 *     PSC, capacitor-start capacitor-run, shaded-pole, universal, small
 *     synchronous, ECM and BLDC; efficiencies, starting current, the 7.5 kW
 *     practical ceiling, BS 7671 552.1.2 and 132.15.202, BS EN 60034-30-1)
 *   level3/module3/section5/Sub4.tsx (synchronous machines — wound-rotor, PMSM,
 *     synchronous reluctance; VFD operation; DOL, star-delta and soft-start;
 *     BS 7671 531.3.3 and 552.1.2)
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

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
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { videos } from '@/data/study-centre/video-library';

const quizQuestions = [
  {
    id: 1,
    question: 'Single-phase alternating current on its own produces:',
    options: [
      'A pulsating magnetic field along one axis, with no inherent rotation.',
      'A smoothly rotating field, exactly as three-phase does.',
      'A steady unidirectional field, as a direct current would.',
      'Two counter-rotating fields of unequal magnitude.',
    ],
    correctAnswer: 0,
    explanation:
      'A single sine-wave current makes a field that pulses up and down a single axis. Without rotation there is no torque to spin a rotor from standstill, which is why every single-phase motor family uses some trick to fake a second phase for starting.',
  },
  {
    id: 2,
    question: 'What does the capacitor do in a capacitor-start motor?',
    options: [
      'Phase-shifts the start winding current so that, combined with the main winding, it produces a temporary two-phase rotating field for starting.',
      'Smooths the supply ripple before it reaches the windings.',
      'Corrects the running power factor to near unity.',
      'Limits the starting inrush current drawn by the main winding.',
    ],
    correctAnswer: 0,
    explanation:
      'The start winding is laid 90 electrical degrees from the run winding around the stator, and the capacitor in series with it shifts its current 90 degrees in time. Spatial 90 plus temporal 90 gives a genuine, if temporary, rotating field. Without the capacitor both windings would carry currents in phase and the field would still just pulse.',
  },
  {
    id: 3,
    question: 'How does a capacitor-start motor disconnect the start winding?',
    options: [
      'A centrifugal switch on the rotor opens at around 75 per cent of synchronous speed.',
      'A thermal overload relay trips on the inrush current.',
      'A timer relay set to a fixed start duration.',
      'A voltage-sensing relay monitoring the supply terminals.',
    ],
    correctAnswer: 0,
    explanation:
      'Once the rotor reaches about three quarters of synchronous speed, spring-loaded weights throw the centrifugal switch open, taking out both the start winding and the start capacitor. The motor finishes accelerating on the run winding alone. That switch is a wearing part and is one of the two cheap consumables to check on a motor that hums without turning.',
  },
  {
    id: 4,
    question: 'Where is a shaded-pole motor typically used, and why?',
    options: [
      'Cooling fans, microwave turntables and small clocks — because it is the cheapest motor to build, and those applications tolerate low torque and low efficiency.',
      'Large industrial compressors and pumps, because of its high starting torque.',
      'Cordless power tools and angle grinders, because of its power-to-weight ratio.',
      'Cranes and hoists, because it holds load well at standstill.',
    ],
    correctAnswer: 0,
    explanation:
      'A copper ring around one corner of each pole face makes the flux through the shaded portion lag, which produces a weak rotating field. No capacitor, no centrifugal switch, no auxiliary winding. Starting torque is roughly half the rated running torque, efficiency is in the region of 15 to 35 per cent and the power factor is poor, but the cost is unbeatable.',
  },
  {
    id: 5,
    question: 'A universal motor runs on:',
    options: [
      'Both alternating and direct current, because it is essentially a series direct-current motor.',
      'Alternating current only, locked to the 50 Hz supply frequency.',
      'Direct current only, because the commutator cannot handle alternating current.',
      'Three-phase alternating current only, through a built-in inverter.',
    ],
    correctAnswer: 0,
    explanation:
      'In a series machine the armature current and the field current reverse together every half cycle, so the torque stays in one direction on alternating current. The field path is laminated throughout, because a solid field would suffer heavy eddy losses on a.c. That is what makes it universal.',
  },
  {
    id: 6,
    question: 'What are the principal limitations of a universal motor?',
    options: [
      'Brush wear, commutator arcing producing radio-frequency interference, audible noise, and short life compared with an induction motor.',
      'It is locked to synchronous speed and offers no speed control.',
      'It has very low starting torque and a slow run-up.',
      'It cannot be used on a direct-current supply at all.',
    ],
    correctAnswer: 0,
    explanation:
      'Brushes are a wearing part with a service life measured in hundreds of hours of duty, and the arcing at the commutator is why every universal motor carries a suppression capacitor and often a choke. The trade-off buys exceptional power-to-weight and very high speed, which is why portable hand tools use them and continuous-duty industrial machines do not.',
  },
  {
    id: 7,
    question: 'Why is a synchronous motor not the default choice for general-purpose drives?',
    options: [
      'It will not start itself on a three-phase supply, because with no slip there is no torque to run it up — it needs cage windings, a pony motor or an inverter frequency ramp.',
      'It cannot maintain a constant speed under varying load.',
      'It is less efficient than an equivalent induction motor at every rating.',
      'It can only be built in fractional-kilowatt sizes.',
    ],
    correctAnswer: 0,
    explanation:
      'The rotor locks to the rotating field and runs at exactly synchronous speed, which is the attraction — but the same property means there is no starting torque from standstill. Something has to get it up to speed first. That is why induction machines dominate general-purpose work and synchronous machines are reserved for very large or specialist duties.',
  },
  {
    id: 8,
    question: 'Why is a single-phase induction motor rarely used above about 7.5 kW?',
    options: [
      'Cost, weight, vibration, poor power factor and high starting current all become unacceptable at higher ratings, and three-phase or inverter-fed alternatives are better.',
      'Because the supply cable required would exceed the largest size manufactured.',
      'Because the Wiring Regulations prohibit single-phase motors above that rating.',
      'Because a single-phase motor cannot be provided with overload protection above that size.',
    ],
    correctAnswer: 0,
    explanation:
      'Single-phase machines carry an inherent penalty. The backward component of the field leaves a braking torque and a torque pulsation at twice supply frequency, which is heard as noise and felt as vibration. Power factor is typically in the 0.5 to 0.8 range and starting current runs at five to seven times full load. All of that worsens with size.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a capacitor-start motor and a PSC motor?',
    answer:
      'A capacitor-start motor uses a large electrolytic capacitor in series with a start winding, with a centrifugal switch that takes both out of circuit once the rotor is up to speed. A permanent split capacitor motor uses a smaller run capacitor that stays in circuit all the time and has no centrifugal switch at all. The PSC is simpler and quieter with fewer wearing parts, but it has lower starting torque, so it suits fans and blowers rather than compressors.',
  },
  {
    question: 'How do I reverse a single-phase motor, and why does swapping line and neutral do nothing?',
    answer:
      'Reversing the supply flips the voltage on both windings at the same time, so the rotating field direction does not change. You reverse one winding only — swap the two start-winding terminals, or the two run-winding terminals, but never both. On most machines the start-winding terminals are brought out to a small block in the conduit box. Shaded-pole motors are the exception: the shading rings are fixed in one corner of each pole at manufacture, so they cannot be electrically reversed at all.',
  },
  {
    question: 'Why do modern pumps and fans need a different type of residual current device?',
    answer:
      'Because many of them are no longer plain induction machines. An electronically commutated motor rectifies the incoming mains to a direct-current bus and drives a permanent-magnet stator from a small inverter built into the motor body. From outside it looks like an old permanent split capacitor motor; inside it is effectively an inverter-fed machine. It leaks direct and high-frequency current to earth through its internal filter capacitors, which is why the data sheet calls for a Type A or Type B device rather than Type AC.',
  },
  {
    question: 'Can you tell a single-phase motor from a three-phase one by looking?',
    answer:
      'Usually. A single-phase machine has two or three supply terminals, and often a visible capacitor strapped to the body or sitting in a bulge in the casing. A three-phase machine has six winding terminals in the conduit box, arranged so the windings can be linked in star or in delta. A three-phase machine will not have a running capacitor, although power-factor correction equipment may be fitted separately nearby.',
  },
];

export default function Lesson319e_3_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Single-phase alternating current produces a pulsating field, not a rotating one, so every single-phase family uses a trick to start — a capacitor, a shading ring, or a commutator that needs no rotating field at all.',
          'Capacitor-start suits compressors and pumps; permanent split capacitor suits fans and blowers; shaded-pole suits the cheapest low-torque jobs; universal suits portable hand tools; small synchronous suits clocks and turntables.',
          'Every one of them has a limitation that decides where it stops — a wearing centrifugal switch, very low efficiency, brush wear and radio interference, or no speed control at all.',
          'Three-phase induction is the workhorse above the point where single-phase becomes unworkable, at roughly 7.5 kW, because it produces a rotating field without any starting trick.',
          'Synchronous machines lock to the field with no slip, which is why they are used for grid alternators, very large compressors and electric traction — but they cannot start themselves on a three-phase supply.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why a single-phase supply produces no rotating field and identify the four methods used to start a single-phase motor.',
          'Name the basic types of a.c. motor — capacitor-start, permanent split capacitor, capacitor-start capacitor-run, shaded-pole, universal, three-phase induction and synchronous.',
          'State a typical application for each type and justify why that type suits that duty.',
          'State the principal limitations of each type, including efficiency, power factor, starting current, wearing parts and speed control.',
          'Identify the protection and isolation requirements that apply to an installed motor regardless of its type.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why there are families at all</ContentEyebrow>

      <ConceptBlock
        title="One sine wave does not rotate"
        plainEnglish="A single alternating current produces a magnetic field that pulses up and down a single axis. There is no rotation, and with no rotating field there is no torque to start a rotor turning. Every single-phase motor family exists because of that one problem."
        onSite="Three-phase does not have the problem, because three currents 120 degrees apart naturally produce a rotating field. That single difference is what separates the two halves of this topic, and it is also why the three-phase machine is simpler, quieter and more efficient than the single-phase machine of the same rating."
      >
        <p>The four tricks used to get a single-phase motor turning:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Capacitor.</strong> A series capacitor on a separate start winding shifts that
            winding current in time, giving a temporary two-phase field. Used by the
            capacitor-start and permanent split capacitor families.
          </li>
          <li>
            <strong>Inductance.</strong> Differing inductance between the start and run windings
            produces a smaller phase shift. Less common in modern machines.
          </li>
          <li>
            <strong>Shading ring.</strong> A heavy copper ring on one corner of each pole face
            makes the flux through that portion lag, producing a weak rotating field.
          </li>
          <li>
            <strong>Commutation.</strong> A brushed series machine that needs no rotating field at
            all, because the commutator reverses the armature connection mechanically.
          </li>
        </ul>
        <p>
          The formal explanation is the double-revolving-field description. A single pulsating
          field of a given amplitude is mathematically the same as two counter-rotating fields of
          half that amplitude. At standstill the two produce equal and opposite torques, which is
          why nothing happens. Once the rotor is turning, it sees a small slip against the forward
          field and a very large slip against the backward one, so the forward field dominates and
          the backward field is reduced to a nuisance.
        </p>
        <p>
          That nuisance never fully goes away. The backward field remains as a small braking
          torque and as a torque pulsation at twice the supply frequency. It is what makes
          single-phase machines noisier than three-phase ones, and it is one of the reasons they
          are rarely used at larger ratings.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The single-phase induction families</ContentEyebrow>

      <ConceptBlock
        title="Capacitor-start, PSC and capacitor-start capacitor-run"
        plainEnglish="Three closely related families, all using a capacitor to create the starting field, differing in whether the capacitor stays in circuit and how many there are."
        onSite="Look at the body of the motor. A large canister with a centrifugal switch you can hear clicking as the machine runs down is a capacitor-start. A small permanently wired capacitor and no click is a permanent split capacitor. Two capacitors is the premium arrangement."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Capacitor-start, induction-run.</strong> A start winding of finer wire, in
            series with a large electrolytic start capacitor, both taken out by a centrifugal
            switch at around 75 per cent of synchronous speed. Strong starting torque. Typical
            applications are compressors, pumps and conveyors. Efficiency around 70 per cent.
          </li>
          <li>
            <strong>Permanent split capacitor.</strong> A smaller motor-run capacitor permanently
            in circuit, with no start winding to disconnect and no centrifugal switch. Lower
            starting torque, quieter running, fewer wearing parts. Typical applications are fans
            and air-conditioning blowers. Efficiency around 75 per cent.
          </li>
          <li>
            <strong>Capacitor-start, capacitor-run.</strong> Both — a large electrolytic for
            starting and a small run capacitor for steady running. Best performance of the three
            and the highest cost. Used on premium fan and heating, ventilation and
            air-conditioning drives.
          </li>
        </ul>
        <p>
          The limitations sit in the consumables. The start capacitor is an electrolytic type
          rated for intermittent duty only — a duty cycle of a few per cent — while the run
          capacitor is a metallised polypropylene type rated for continuous duty. Fit a start
          capacitor where a run capacitor belongs and it will boil itself dry within hours.
        </p>
        <p>
          The centrifugal switch is the other wearing part. Spring-loaded weights throw outwards
          as the rotor accelerates, and after tens of thousands of start cycles the spring
          weakens, the contacts pit, or the grease in the pivots stiffens. Failed open and the
          motor hums without starting; failed closed and the motor runs hot while the start
          capacitor cooks itself.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Shaded-pole — the cheapest machine there is"
        plainEnglish="A salient-pole stator with a heavy copper ring wrapped around one corner of each pole face. The ring acts as a single shorted turn, and the flux through the shaded portion lags the flux through the rest of the pole by enough to drag a squirrel-cage rotor into motion."
        onSite="No capacitor, no centrifugal switch, no auxiliary winding, no electrolytic. Just a main winding and a few grams of copper ring. That is the entire appeal, and it is why this family survives in products where the motor is a component rather than the point of the machine."
      >
        <p>
          <strong>Applications.</strong> Cooker hood and bathroom extract fans, microwave oven
          turntables, fridge condenser fans, small mains-powered clocks, low-cost desk fans —
          anywhere the duty tolerates low torque, low efficiency and no meaningful speed control
          beyond a series resistor or a tapped winding.
        </p>
        <p>
          <strong>Limitations.</strong> Starting torque is only around half the rated running
          torque. Full-load efficiency sits somewhere between 15 and 35 per cent, power factor
          between 0.4 and 0.6, and slip between 8 and 15 per cent, all much worse than a properly
          engineered single-phase machine. The machine is also not reversible: the shading rings
          are physically fixed in one corner of each pole at manufacture, so the rotation direction
          is decided in the factory. A customer who wants a shaded-pole fan to run the other way
          needs a different unit, not a rewire.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="319e-3-3-check-1"
        question="A customer asks you to reverse the rotation of a shaded-pole extract fan. What is the correct answer?"
        options={[
          'Swap the two supply conductors at the terminal block, which reverses the field direction.',
          'Swap the start-winding terminals in the conduit box, as you would on a capacitor-start motor.',
          'It cannot be done electrically — the shading rings are fixed in one corner of each pole at manufacture, so the unit has to be replaced with a different model.',
          'Fit a larger capacitor, which shifts the phase the other way and reverses the rotation.',
        ]}
        correctIndex={2}
        explanation="A shaded-pole machine has no start winding and no capacitor to reverse, and swapping the supply does nothing because it flips the whole machine at once. The direction is built into the physical position of the shading rings. Products advertised as reversible shaded-pole units are usually two motors sharing a shaft with one or the other energised."
      />

      <SectionRule />

      <ContentEyebrow>Brushed and brushless</ContentEyebrow>

      <ConceptBlock
        title="Universal — the brushed series machine in every hand tool"
        plainEnglish="A universal motor is a series direct-current machine deliberately built to run on alternating current as well. Both the armature current and the field current reverse together each half cycle, so the torque stays in the same direction."
        onSite="Construction is a brushed series machine with the field winding split into two halves either side of the armature, and laminated iron throughout the field path because a solid field would suffer heavy eddy losses on alternating current. Speed depends on load rather than on supply frequency, because there is no synchronous speed to lock to."
      >
        <p>
          <strong>Applications.</strong> Vacuum cleaners, angle grinders, drills, food mixers and
          blenders, hair dryers. Anywhere the power-to-weight ratio decides the product. A few
          hundred watts out of a machine that fits in one hand, with high starting torque, and
          speed easily controlled by a small phase-control device — which is exactly the variable
          speed trigger inside a drill.
        </p>
        <p>
          <strong>Limitations.</strong> Very high running speed on light load, in the region of
          ten to thirty thousand revolutions per minute. Brushes are a wearing part with a life
          measured in hundreds of hours of duty. Arcing at the commutator produces
          radio-frequency interference, so every universal motor carries a suppression capacitor
          and often a choke as well. It is audibly noisy, and its service life is short compared
          with an induction machine — which is why it is not used for continuous-duty industrial
          machinery.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Small synchronous machines, and the brushless machines that replaced the fan motor"
        plainEnglish="Small synchronous motors lock to the mains frequency, which makes them accurate rather than powerful. Electronically commutated motors are a different thing entirely — a brushless permanent-magnet machine with a small drive built into the motor body."
        onSite="The small synchronous family is clock motors and turntable drives, permanent-magnet or hysteresis types, chosen because the speed is exactly determined by the supply frequency. The electronically commutated family is what is actually inside most modern circulator pumps and air-handling fans, even though from outside it looks like the permanent split capacitor machine it replaced."
      >
        <p>
          <strong>Inside an electronically commutated motor.</strong> The incoming mains is
          rectified to a direct-current bus, a small three-phase inverter built into the body
          drives a permanent-magnet machine, rotor position is found either by Hall-effect sensors
          or by sensing the back electromotive force, and speed is set by a control signal or a
          built-in transducer. Same single-phase supply, same mounting, substantially less energy
          used.
        </p>
        <p>
          <strong>Limitations that matter to the electrician.</strong> These machines leak direct
          and high-frequency current to earth through their internal electromagnetic compatibility
          capacitors. That means the residual current device has to be a Type A or a Type B
          according to the unit data sheet, not a Type AC. A customer reporting that their new
          pump keeps tripping an older device is usually describing this and nothing else.
        </p>
      </ConceptBlock>

      <VideoCard {...videos.brushlessMotor} />

      <InlineCheck
        id="319e-3-3-check-2"
        question="A replacement circulator pump on a domestic heating system trips the existing residual current device intermittently from the day it is fitted. The old pump never did. What is the most likely explanation?"
        options={[
          'The new pump is drawing more current than the old one, so the device is operating on overload.',
          'The installation has developed an unrelated earth fault at the same time.',
          'The new pump has a failed run capacitor, which is leaking current to the frame.',
          'The new pump is an electronically commutated machine that leaks direct and high-frequency current to earth through its internal filter capacitors, so it needs a Type A or Type B device rather than the Type AC fitted.',
        ]}
        correctIndex={3}
        explanation="A residual current device does not operate on overload, so the first option describes something the device does not do. The modern replacement for a permanent split capacitor pump is almost always an electronically commutated machine with a rectifier and a small inverter inside it. Read the unit data sheet for the required device type before condemning the installation."
      />

      <SectionRule />

      <ContentEyebrow>Three-phase — where single-phase runs out</ContentEyebrow>

      <ConceptBlock
        title="Three-phase induction — the workhorse"
        plainEnglish="Three currents 120 degrees apart produce a rotating field without any starting trick at all. No start winding, no capacitor, no centrifugal switch, no shading ring, no brushes. That is why the three-phase induction machine is the default for anything beyond the small end."
        onSite="The practical crossover is around 7.5 kW. Below it, single-phase is available and convenient. Above it the disadvantages of single-phase — poor power factor, high starting current, torque pulsation and vibration, cost and weight — outweigh the simplicity, and the answer is three-phase or an inverter-fed drive."
      >
        <p>
          <strong>The efficiency gap.</strong> A fractional-kilowatt single-phase induction machine
          runs at around 70 per cent efficiency. The three-phase equivalent runs at 80 to 90 per
          cent. The difference comes largely from the negative-sequence loss that the backward
          field imposes on the single-phase machine, and it is a difference that persists for the
          life of the installation.
        </p>
        <p>
          <strong>Reversing.</strong> A three-phase machine is reversed by swapping any two of the
          three line connections, which reverses the phase sequence and therefore the direction of
          the rotating field. Swapping all three changes nothing. That is a great deal simpler
          than the single-phase case, where you have to reverse one winding only and leave the
          other alone.
        </p>
        <p>
          <strong>The limitation that shapes the installation.</strong> Direct-on-line starting
          draws five to seven times full-load current. On a small machine the supply absorbs it. On
          a larger one it does not, and that is why the starting method becomes part of the design
          — star-delta switching to cut the inrush to roughly a third, a soft-starter ramping the
          voltage up over several seconds, or an inverter drive that accelerates the machine with
          no inrush at all and gives variable speed as well.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Synchronous machines</ContentEyebrow>

      <ConceptBlock
        title="Locked to the field — no slip, and no self-starting"
        plainEnglish="A synchronous machine has a rotor that produces its own magnetic field, either from an electromagnet fed through slip rings or from permanent magnets. It locks to the rotating stator field and runs at exactly synchronous speed under any load, until the pull-out torque is exceeded."
        onSite="Speed is fixed by the supply frequency and the number of poles, so with the grid at 50 Hz the only way to vary the speed of a synchronous machine is to vary the frequency — which means an inverter. That constraint is what decides where these machines are used."
      >
        <p>Three quite different machines share the synchronous label:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Wound-rotor, or salient pole.</strong> An electromagnet on the rotor fed with
            direct current through slip rings. Used for grid alternators and very large
            compressors. Over-excite the rotor and the machine draws leading reactive current,
            acting as a power-factor corrector for the rest of the site at the same time as
            driving its load.
          </li>
          <li>
            <strong>Permanent magnet.</strong> The field winding replaced by magnets. The most
            efficient topology in mass production, dominant in electric vehicle traction, robotics
            and high-end servo drives, and effectively the basis of the highest published
            efficiency band. Limited by magnet cost and by the fact that it cannot be started
            direct on a three-phase mains supply — it needs an inverter.
          </li>
          <li>
            <strong>Synchronous reluctance.</strong> A rotor that is just shaped iron, with no
            copper, no magnets and no slip rings. It locks to the field by magnetic preference,
            because the rotor aligns its high-permeability axis with the field. Cheap to build,
            robust, and free of rare-earth supply concerns, with performance approaching that of a
            permanent-magnet machine.
          </li>
        </ul>
        <p>
          <strong>The common limitation.</strong> With no slip there is no starting torque from
          standstill, so a synchronous machine will not run itself up on a three-phase supply. It
          needs help — cage windings built into the rotor, a separate starting machine, or an
          inverter ramping the frequency up from near zero. That single characteristic is why
          induction machines dominate general-purpose work and synchronous machines stay in the
          very large and the specialist categories.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="What applies to every installed motor, whatever type it is"
        plainEnglish="Type decides the machine. It does not change the protection and isolation the installation has to provide around it."
        onSite="Two requirements come up on every motor schematic. Overload protection, provided by control equipment — a thermal overload relay on a plain contactor starter, or the equivalent parameter set in a soft-starter or inverter. And a means of switching off at the machine, readily accessible and easily operated, which in practice is a lockable rotary isolator or a pull-cord within sight of the motor."
      >
        <p>
          On a capacitor-start machine the isolator has to break the line conductor cleanly so the
          start capacitor can discharge through its bleed resistor before anyone starts work.
          Isolating a machine with a large electrolytic capacitor still charged is a hazard that
          does not exist on a plain three-phase induction machine, and it is a reason to prove
          dead rather than assume.
        </p>
        <p>
          Efficiency classification is the other thing that follows the machine rather than the
          installation. Line-operated a.c. induction machines, single-phase included, fall under a
          published efficiency class scheme, with the minimum permitted efficiency depending on the
          rating and the number of poles. For larger single-phase units the whole-life case for
          switching to a three-phase machine with an inverter is often better on both efficiency
          and cost.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 552.1.2 (Motor overload protection)"
        clause="Every electric motor having a rating exceeding 0.37 kW shall be provided with control equipment incorporating means of protection against overload of the motor. This requirement does not apply to a motor incorporated in an item of current-using equipment complying as a whole with an appropriate British or Harmonized Standard."
        meaning="Any motor above 0.37 kW needs an overload device, whatever type of machine it is. On a plain contactor starter that is a separate thermal overload relay, usually set close to the full-load current. Soft-starters and inverter drives normally include electronic overload as standard, set as a parameter. The exception covers appliance motors that already comply with their own product standard, which is why a washing machine drive does not need a starter panel."
        cite="Source: BS 7671:2018+A4:2026 — Regulation 552.1.2."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.15.202 (Means of switching off motors)"
        clause="Every fixed electric motor shall be provided with an efficient means of switching off, readily accessible, easily operated and so placed as to prevent danger."
        meaning="Pumps, fans and compressors all need a local means of switching off within sight of the machine, regardless of whether they are single-phase or three-phase and regardless of the motor family. A lockable rotary isolator or a pull-cord switch is the standard arrangement. On a capacitor-start machine the isolator must break the line conductor cleanly so that the start capacitor can discharge before any maintenance work begins."
        cite="Source: BS 7671:2018+A4:2026, Regulation 132.15.202."
      />

      <InlineCheck
        id="319e-3-3-check-3"
        question="You are specifying the starter for a fixed 5.5 kW three-phase pump. Which of these is required by the Wiring Regulations regardless of which starting method you choose?"
        options={[
          'Control equipment incorporating overload protection, and a readily accessible means of switching off at the machine.',
          'A star-delta starter, because direct-on-line starting is not permitted above 0.37 kW.',
          'A Type B residual current device, because all fixed motors require one.',
          'A power-factor correction capacitor sized to the motor rating.',
        ]}
        correctIndex={0}
        explanation="Overload protection is required for every motor above 0.37 kW, and every fixed motor needs an efficient means of switching off that is readily accessible and easily operated. The starting method is a design decision driven by the machine size, the supply capacity and the mechanical load. A Type B device is specifically an inverter-fed and similar requirement, not a blanket motor one."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Condemning a humming motor as burnt out"
        whatHappens={
          <>
            A pump will not start and just hums. The machine is written off, a replacement unit is
            ordered and the customer is charged for it. The actual fault was a run capacitor that
            had lost most of its capacitance — a part worth a couple of pounds — or a centrifugal
            switch that had failed open after years of start cycles. A serviceable motor goes in
            the skip.
          </>
        }
        doInstead={
          <>
            On any humming single-phase motor, test the capacitor before anything else, either on
            the capacitance range of a meter or by substituting a known-good part, and check the
            centrifugal switch on machines that have one. The great majority of will-not-start
            calls on single-phase motors come back to a failed run capacitor. It is a small part
            and a short job, and it saves replacing a perfectly good machine.
          </>
        }
      />

      <CommonMistake
        title="Fitting the wrong capacitor value or voltage rating"
        whatHappens={
          <>
            A failed run capacitor rated 50 microfarad at 450 V a.c. is replaced with a 47
            microfarad 400 V part that happened to be in the van. The motor runs but vibrates
            badly, and the capacitor swells and fails within weeks — because the peak of a 230 V
            supply is 230 times the square root of two, about 325 V, and the part was not rated
            for continuous service at that level in this application.
          </>
        }
        doInstead={
          <>
            Match the capacitance to the original within a few per cent, use a part rated at
            450 V a.c. or above for 230 V mains operation, and make sure it is a motor-run
            capacitor rated for continuous duty rather than a motor-start capacitor rated for a
            few per cent duty cycle. The two look similar and behave completely differently: a
            start capacitor left permanently in circuit boils itself dry within hours.
          </>
        }
      />

      <Scenario
        title="Choosing the motor family for a new extract system in Neath"
        situation={
          <>
            A food production unit in Neath needs two new fans installed. The first is a small
            extract fan for a store room, running intermittently, where the client simply wants it
            cheap and reliable. The second is a 5.5 kW supply fan for the production hall, running
            most of the day, where the client has asked whether the speed can be varied to suit
            different production runs. The existing supply is three-phase with plenty of spare
            capacity.
          </>
        }
        whatToDo={
          <>
            Treat them as two different problems. The store-room fan is a low-torque, low-duty
            application where efficiency barely matters and cost does, so a shaded-pole or a
            permanent split capacitor unit is entirely appropriate — with the caveat that a
            shaded-pole machine cannot be reversed later, so check which way the air has to move
            before ordering. The production hall fan is a different question. At 5.5 kW a
            single-phase machine would be at the wrong end of its practical range, with poor power
            factor and heavy starting current, and the three-phase supply is already there. Specify
            a three-phase induction machine. The variable-speed requirement then decides the
            control: direct-on-line gives on and off only, star-delta gives a reduced inrush but
            still only one running speed, and an inverter drive gives continuous speed control as
            well as a controlled start. Whichever is chosen, the installation needs overload
            protection in the control equipment and a readily accessible means of switching off at
            the machine. If the choice lands on an inverter drive, the residual current device type
            has to be chosen to suit the drive rather than assumed.
          </>
        }
        whyItMatters={
          <>
            The criterion is types, applications and limitations, and this is what that looks like
            on a real job: two fans, two families, and the choice made on the limitations rather
            than on the specification sheet. Cheap and non-reversible is fine in a store room and
            an expensive mistake in a production hall. Single-phase is fine at fractional
            kilowatts and the wrong answer at 5.5 kW when three-phase is already on the wall. And
            the requirement the client never asks about — overload protection and a local means of
            switching off — applies to both of them regardless.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Single-phase alternating current produces a pulsating field, not a rotating one, so every single-phase family needs a starting trick — a capacitor, a shading ring, or commutation.',
          'Capacitor-start, induction-run gives strong starting torque for compressors, pumps and conveyors at around 70 per cent efficiency, limited by the start capacitor duty cycle and the wearing centrifugal switch.',
          'Permanent split capacitor keeps a small capacitor in circuit permanently, which suits fans and blowers at around 75 per cent efficiency with lower starting torque and no switch to wear out.',
          'Shaded-pole is the cheapest machine there is — extract fans, turntables, clocks — at the price of roughly half-rated starting torque, efficiency between 15 and 35 per cent, poor power factor and no electrical reversal.',
          'Universal is a brushed series machine running on a.c. or d.c., giving exceptional power-to-weight and very high speed for hand tools, limited by brush wear, radio interference, noise and short life.',
          'Electronically commutated machines have replaced the permanent split capacitor motor in modern pumps and fans, and they need a residual current device type chosen to suit the drive rather than a Type AC.',
          'Three-phase induction needs no starting trick and runs at 80 to 90 per cent efficiency, which is why it takes over above the point where single-phase becomes unworkable at roughly 7.5 kW — with direct-on-line inrush at five to seven times full load shaping the starting method.',
          'Synchronous machines lock to the field with no slip — wound-rotor for alternators and large compressors, permanent magnet for traction, reluctance for a rare-earth-free alternative — but none of them will start themselves on a three-phase supply.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Types of a.c. motor — knowledge check" />
    </div>
  );
}
