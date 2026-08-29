/**
 * Module 2 · Section 3 — Pressure and flow sensors
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * Pressure and flow share a page because on an enormous amount of real plant
 * they share an INSTRUMENT: a differential pressure transmitter across a
 * restriction is still the most common flow measurement in industry. Teaching
 * them apart hides the single most useful fact about either.
 *
 * The three things the old page did not teach, all of which produce a wrong
 * number with nothing faulty:
 *
 *  1. GAUGE, ABSOLUTE, DIFFERENTIAL. Three different questions, three
 *     different instruments, and the difference is what the OTHER side of the
 *     sensing element is connected to. Get this wrong and the instrument reads
 *     atmospheric pressure as an offset for ever.
 *  2. THE SQUARE-ROOT RELATIONSHIP. DP across a restriction is proportional to
 *     the SQUARE of flow, so the signal is not linear with flow. That is why a
 *     square-root extractor exists, and why DP flow measurement gets poor at
 *     low flow.
 *  3. IMPULSE LINES. On a DP installation the tubing between process and
 *     transmitter is part of the measurement, and most DP flow faults live in
 *     it rather than in the instrument.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.19 (pressure) and ch.22 (flow), extracted to
 * scratchpad/src/m2s3_pressure.txt. Cross-checked against the Emerson
 * Engineer's Guide to DP Flow Measurement and the Endress+Hauser flow titles
 * held in ~/Desktop/hav/instrumentation.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Pressure and flow sensors | Instrumentation Module 2.3 | Elec-Mate';
const DESCRIPTION =
  'Gauge, absolute and differential pressure and why the difference is what the other side is connected to. Bourdon tubes, bellows and diaphragms. Why differential pressure across a restriction measures flow, why that signal follows a square root, and why most DP flow faults live in the impulse lines.';

const outcomes = [
  'Distinguish gauge, absolute and differential pressure, and say what the reference is in each case',
  'Explain how a bourdon tube, a bellows and a diaphragm each convert pressure into movement',
  'Explain how the same sensing element can measure gauge, absolute or differential pressure',
  'Describe why a restriction in a pipe produces a pressure drop related to flow rate',
  'State the relationship between differential pressure and flow, and why a square-root extraction is needed',
  'Explain why DP flow measurement loses accuracy at low flow',
  'Recognise the common impulse-line faults and the reading each one produces',
];

const quizQuestions = [
  {
    id: 1,
    question: 'What makes a pressure measurement "gauge" rather than "absolute"?',
    options: [
      'Gauge pressure is measured with a mechanical gauge; absolute with a transmitter',
      'Gauge pressure is referenced to atmospheric pressure; absolute is referenced to a vacuum',
      'Gauge pressure is always higher than absolute',
      'Gauge pressure can only be positive',
    ],
    correctIndex: 1,
    explanation:
      'The difference is what the other side of the sensing element sees. In a gauge instrument one side is exposed to atmosphere, so the reading is relative to whatever the atmospheric pressure happens to be. In an absolute instrument that side is sealed to a vacuum chamber, so the reading is relative to a true zero.',
  },
  {
    id: 2,
    question: 'How is a bourdon tube made to measure differential pressure rather than gauge?',
    options: [
      'It cannot be — a bourdon tube only measures gauge pressure',
      'By subjecting the other side of the sensing element to a second applied pressure',
      'By fitting a larger dial',
      'By reversing the direction of the tube',
    ],
    correctIndex: 1,
    explanation:
      'Bellows, diaphragms and bourdon tubes may all measure differential or absolute pressure as well as gauge. All that is needed is to subject the other side of the sensing element either to another applied pressure, for differential, or to a vacuum chamber, for absolute. The element is the same; the reference changes.',
  },
  {
    id: 3,
    question: 'Why does fluid pressure fall as it passes through the throat of a venturi?',
    options: [
      'Because the fluid loses heat in the throat',
      'Because velocity rises, so kinetic energy rises, so pressure must fall to keep total energy constant',
      'Because the pipe wall absorbs the pressure',
      'Because the fluid becomes compressible in the throat',
    ],
    correctIndex: 1,
    explanation:
      'Kinetic energy is proportional to the square of velocity. The fluid accelerates through the narrow throat, so its kinetic energy rises — and since total energy at any point must remain constant, potential energy must fall correspondingly. On a level run there is no height change available, so the fall shows up as pressure.',
  },
  {
    id: 4,
    question: 'A DP transmitter across an orifice plate reads 25% of its span. What is the flow?',
    options: ['25% of full flow', '50% of full flow', '12.5% of full flow', '6.25% of full flow'],
    correctIndex: 1,
    explanation:
      'Differential pressure is proportional to the square of flow, so flow is proportional to the square root of DP. √0.25 = 0.5, so 25% differential pressure represents 50% flow. Reading the DP signal as if it were flow is one of the classic errors on a plant.',
  },
  {
    id: 5,
    question: 'Why does DP flow measurement become unreliable at low flow rates?',
    options: [
      'The transmitter switches off below a threshold',
      'Because DP falls with the square of flow, a small flow produces a very small differential — comparable to the instrument’s own error',
      'Because the orifice plate closes at low flow',
      'Because low flow is always turbulent',
    ],
    correctIndex: 1,
    explanation:
      'At 10% flow the differential is only 1% of full-scale DP. The signal being measured has shrunk into the region where the transmitter’s own uncertainty and any zero drift are a large share of it. This is why DP flow installations are usually given a low-flow cut-off rather than being trusted to read near zero.',
  },
  {
    id: 6,
    question:
      'A DP flow reading is steady but wrong, and both impulse lines are the same length. What should you suspect first?',
    options: [
      'The orifice plate has dissolved',
      'One impulse line is partially blocked or holds trapped gas or liquid, so it is not transmitting the true pressure',
      'The transmitter needs replacing',
      'The control system scaling is wrong',
    ],
    correctIndex: 1,
    explanation:
      'On a DP installation the impulse lines are part of the measurement. A partial blockage, trapped gas in a liquid line, or condensed liquid in a gas line all mean one side is not presenting the true process pressure to the transmitter — and the instrument faithfully reports a difference that is not the one you wanted.',
  },
];

const InstrumentationModule2Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 3"
        title="Pressure and flow sensors"
        backTo="/electrician/upskilling/instrumentation-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Two measurements on one page, because on a great deal of real plant they are made by the
          same instrument.
        </p>

        <TLDR
          points={[
            'Gauge, absolute and differential are three different questions. The difference is what the OTHER side of the sensing element is connected to: atmosphere, a vacuum, or a second process pressure.',
            'Bourdon tubes, bellows and diaphragms all turn pressure into movement, and any of them can be built to measure gauge, absolute or differential.',
            'Put a restriction in a pipe and the fluid speeds up through it. Kinetic energy rises, so pressure must fall — and that pressure drop is related to flow rate.',
            '🔴 Differential pressure is proportional to the SQUARE of flow. 25% DP is 50% flow, not 25%. That is why square-root extraction exists.',
            'The same square law is why DP flow is poor at low flow: at 10% flow the differential is only 1% of span, down where the instrument’s own error lives.',
            'On a DP installation the impulse lines are part of the measurement, and most DP flow faults are in the tubing rather than the transmitter.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Three questions, not one</ContentEyebrow>

        <ConceptBlock
          title="Gauge, absolute and differential — the reference is the whole story"
          plainEnglish="Every pressure measurement is a comparison. What you are comparing against decides which of the three you have, and they are not interchangeable."
          onSite="Read the nameplate before you conclude a reading is wrong. A gauge instrument fitted where an absolute one belonged is not faulty — it is answering a different question."
        >
          <p>
            A pressure sensing element responds to the difference in pressure across it. That is
            true of all three types, and the only thing that changes is what sits on the far side.
          </p>
          <ul>
            <li>
              <strong>Gauge pressure</strong> — the far side is open to atmosphere. The reading is
              relative to whatever the atmospheric pressure happens to be at the time, which means
              it moves with the weather and with altitude. Most process pressure measurement is
              gauge, and that is usually the right answer, because most processes care about
              pressure relative to their surroundings.
            </li>
            <li>
              <strong>Absolute pressure</strong> — the far side is sealed to a vacuum chamber. The
              reading is relative to a true zero, so it does not move with the weather. Needed where
              the physics demands a true pressure: vacuum work, and anything involving gas
              calculations.
            </li>
            <li>
              <strong>Differential pressure</strong> — the far side is connected to a second process
              pressure. The reading is the difference between two points, and neither is atmosphere.
            </li>
          </ul>
          <p>
            The last one turns out to be the workhorse of the whole discipline, and the rest of this
            section is largely about why.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-3-reference"
          question="A pressure reading on a sealed vessel drifts by a small amount every day, correlating with the weather. What is the most likely explanation?"
          options={[
            'The transmitter is failing',
            'It is a gauge instrument, so its reference is atmospheric pressure — which is what is moving',
            'The vessel is leaking',
            'The impulse line is blocked',
          ]}
          correctIndex={1}
          explanation="A gauge instrument reads relative to atmosphere, so barometric changes appear in the reading as though the process had changed. On a sealed vessel where the true pressure is steady, that is the signature. If the process genuinely needs a weather-independent number, it wants an absolute instrument."
        />

        <SectionRule />
        <ContentEyebrow>Turning pressure into movement</ContentEyebrow>

        <ConceptBlock
          title="Bourdon tubes, bellows and diaphragms"
          plainEnglish="Three mechanical ways of turning pressure into a movement that something can read. They are still everywhere, and they are inside a lot of electronic transmitters too."
          onSite="A local gauge is a mechanical sensing element with a pointer on it. Understanding the element explains both the gauge and what is inside the transmitter next to it."
        >
          <p>
            Before anything electrical happens, pressure has to become movement. Three elements do
            almost all of that work:
          </p>
          <ul>
            <li>
              <strong>Bourdon tube</strong> — a curved, flattened tube that tends to straighten as
              pressure inside it rises. The classic is C-shaped; a spiral bourdon is used where a
              wider range of motion is wanted. The motion is picked up by a linkage, lever and gear
              assembly driving a pointer.
            </li>
            <li>
              <strong>Bellows</strong> — a concertina that extends as pressure rises, giving a
              relatively large movement for a small pressure.
            </li>
            <li>
              <strong>Diaphragm</strong> — a flexible membrane that deflects under pressure. This is
              the element in most modern electronic transmitters, where the deflection is sensed
              electrically rather than mechanically.
            </li>
          </ul>
          <p>
            The important structural point:{' '}
            <strong>
              bellows, diaphragms and bourdon tubes alike may all be used to measure differential
              and/or absolute pressure in addition to gauge
            </strong>
            . All that is needed is to subject the other side of the element either to another
            applied pressure, for differential measurement, or to a vacuum chamber, for absolute.
          </p>
          <p>
            The engineering challenge in doing that is getting the movement out to a pointer while
            keeping a good pressure seal. In a gauge instrument that is easy, because one side of
            the element is exposed to atmosphere anyway and is therefore available for a mechanical
            connection. In differential and absolute instruments it is not, which is part of why
            they cost more.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Why a pressure instrument measures flow</ContentEyebrow>

        <ConceptBlock
          title="Squeeze the pipe and the pressure tells you the flow"
          plainEnglish="Fluid has to speed up to get through a restriction. Speeding up costs energy, and that energy comes out of the pressure."
          onSite="This is why so many 'flow' transmitters on a plant are physically pressure transmitters with two tappings across a plate."
        >
          <p>
            Put a narrowing in a pipe — a venturi throat, an orifice plate — and the fluid must
            accelerate to get through it. From physics, kinetic energy is proportional to the square
            of velocity, so if the molecules speed up their kinetic energy rises.
          </p>
          <p>
            But the total energy at any point in the stream must remain constant, because nothing is
            adding or removing energy. So if kinetic energy rises, potential energy must fall by the
            same amount. Potential energy in a fluid appears as height above ground and as pressure
            — and on a level pipe run there is no height change available.
          </p>
          <p>
            The conclusion is unavoidable:{' '}
            <strong>fluid pressure must decrease as it travels through the narrow throat</strong>.
            That relationship is expressed formally in Bernoulli&rsquo;s equation as a constant sum
            of elevation, pressure and velocity terms.
          </p>
          <p>
            So a differential pressure transmitter, plumbed across a restriction, measures flow. The
            restriction itself is called the <strong>primary element</strong>, and there are many
            forms: orifice plates, flow nozzles, V-cones, segmental wedges, pipe elbows and pitot
            tubes among them.
          </p>
          <p>
            One honest caveat, which the source is explicit about: these derivations assume friction
            plays no significant role. No industrial flow is truly frictionless — especially through
            a primitive element like an orifice plate — so the theoretical equations are adjusted to
            match real behaviour. The principle holds; the arithmetic is empirically corrected.
          </p>
        </ConceptBlock>

        <Pullquote>
          A great many flow transmitters are pressure transmitters that have been asked a different
          question.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>The square root</ContentEyebrow>

        <ConceptBlock
          title="Differential pressure follows the SQUARE of flow"
          plainEnglish="Double the flow and the pressure drop goes up four times. So to get flow back out of the pressure signal you have to take a square root."
          onSite="If a DP flow loop reads roughly half what you expect at high rates and roughly right at low ones, suspect a missing square-root extraction."
        >
          <p>
            Because the pressure drop arises from kinetic energy, and kinetic energy goes with the
            square of velocity, the differential pressure across a primary element is proportional
            to the <strong>square</strong> of the flow rate. Turned around:
          </p>
          <p>
            <strong>flow &prop; &radic;(differential pressure)</strong>
          </p>
          <p>The consequences are worth working through, because they are not intuitive:</p>
          <ul>
            <li>
              <strong>100% DP = 100% flow.</strong> The ends agree, which is what makes the error
              easy to miss.
            </li>
            <li>
              <strong>25% DP = 50% flow.</strong> &radic;0.25 = 0.5.
            </li>
            <li>
              <strong>50% DP = about 71% flow.</strong> &radic;0.5 ≈ 0.707.
            </li>
            <li>
              <strong>1% DP = 10% flow.</strong>
            </li>
          </ul>
          <p>
            Somewhere in the loop, that square root has to be taken. Historically it was a dedicated{' '}
            <strong>square-root extractor</strong> — which, as Section 2.1 noted, is a transducer in
            the industrial sense of the word. On modern plant the extraction usually happens inside
            the smart transmitter or in the control system.
          </p>
          <p>
            🔴 <strong>It must happen exactly once.</strong> Extract twice — because the transmitter
            was configured for it and the DCS was configured for it as well — and the reading is
            wrong in a way that looks plausible at both ends of the range and wrong in the middle.
            Extract not at all and the loop under-reads badly at anything below full flow.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-3-sqrt"
          question="A DP flow loop shows 50% on the operator display. Square-root extraction is configured in the transmitter AND in the DCS. What is the true flow?"
          options={[
            '50% — the extractions cancel out',
            'Higher than 50%, because the square root has been taken twice',
            'Exactly 25%',
            'It cannot be determined without the orifice size',
          ]}
          correctIndex={1}
          explanation="Taking the root twice pulls mid-range values upward each time: 50% DP becomes 70.7% after one extraction, and 84.1% after a second. The display is over-reading. The ends still agree — 0% and 100% survive any number of extractions — which is exactly why this error hides during a two-point loop check."
        />

        <ConceptBlock
          title="Why DP flow is poor at the bottom of the range"
          plainEnglish="At low flow the pressure difference you are trying to measure becomes tiny, and the instrument's own error stays the same size."
          onSite="A DP flow loop reading a small non-zero number on a line you know is shut is usually not lying deliberately — it is reporting its own zero error."
        >
          <p>
            Run the square law downward and the problem appears. At 10% flow the differential is
            only <strong>1%</strong> of full-scale DP. At 5% flow it is 0.25%.
          </p>
          <p>
            Meanwhile the transmitter&rsquo;s own uncertainty and any zero drift have not shrunk at
            all. So the quantity being measured has collapsed into the region where the
            instrument&rsquo;s error lives, and the percentage error in the flow reading becomes
            large even though the instrument is performing exactly to specification.
          </p>
          <p>
            This is why DP flow installations normally carry a <strong>low-flow cut-off</strong>:
            below some threshold the reading is forced to zero, because a small indicated flow down
            there carries no information worth having. It is also why DP is a poor choice for a duty
            with a very wide flow range, and why other technologies — electromagnetic, Coriolis,
            ultrasonic, vortex — exist and are often worth their higher cost.
          </p>
          <p>
            Section 2.1 introduced turndown for a transmitter. This is the same idea one level up:
            the <em>measurement principle</em> has a usable range, and pushing beyond it degrades
            the answer regardless of how good the instrument is.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>When DP is not the answer</ContentEyebrow>

        <ConceptBlock
          title="The other flow technologies, and what each one is actually for"
          plainEnglish="DP is the default because it is cheap and robust. The alternatives each solve a specific problem DP is bad at — and cost more for the privilege."
          onSite="If you meet a flowmeter that is not a DP set, ask what problem justified it. The answer is usually range, accuracy, or an inability to tolerate a pressure drop."
        >
          <p>
            DP measurement puts a permanent obstruction in the pipe, is poor at low flow, and needs
            straight pipe either side. Where any of those matter, other principles earn their cost:
          </p>
          <ul>
            <li>
              <strong>Electromagnetic</strong> — from Faraday&rsquo;s law of induction: a conductor
              moving in a magnetic field induces a voltage. Field coils generate a magnetic field
              across the pipe, and as electrically charged particles cross it a voltage is induced,
              tapped by two electrodes. That voltage is{' '}
              <strong>directly proportional to velocity of flow</strong> and thus to volume flow.
              There is no obstruction and no pressure drop — but the fluid must be{' '}
              <strong>electrically conductive</strong>, which rules out oils and most hydrocarbons.
            </li>
            <li>
              <strong>Coriolis</strong> — measures <strong>mass flow directly</strong> rather than
              inferring it, and simultaneously gives density and temperature. Volume flow, solids
              content and concentration can be calculated from those. It needs no inlet or outlet
              straight runs and is largely indifferent to fluid properties and flow profile. It is
              the accurate choice — and the expensive one, which is why it turns up on custody
              transfer.
            </li>
            <li>
              <strong>Vortex</strong> — a bluff body in the flow sheds vortices at a rate related to
              velocity. Suits liquids, gases and steam.
            </li>
            <li>
              <strong>Ultrasonic</strong> — times sound pulses with and against the flow. Clamp-on
              versions measure without breaking into the pipe at all.
            </li>
            <li>
              <strong>Thermal</strong> — infers mass flow from how quickly the fluid carries heat
              away. Common on gases and biogas.
            </li>
          </ul>
          <p>
            The selection question is rarely &ldquo;which is best?&rdquo; It is{' '}
            <strong>which constraint dominates</strong>: conductivity, permitted pressure loss,
            available straight run, flow range, accuracy demanded, and what the fluid does to
            anything you put in it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-3-magmeter"
          question="An electromagnetic flowmeter is proposed for a fuel oil line. What is the problem?"
          options={[
            'The pipe diameter is too small for a magmeter',
            'Fuel oil is not electrically conductive, and the principle depends on charged particles crossing the magnetic field',
            'Magmeters cannot handle the pressure',
            'There is no problem — magmeters suit any liquid',
          ]}
          correctIndex={1}
          explanation="The measuring principle induces a voltage as electrically charged particles cross the field. A non-conductive fluid such as oil produces nothing to measure. This is the first question to ask about any magmeter proposal, and it rules the technology out of most hydrocarbon service."
        />

        <ConceptBlock
          title="Installation decides whether the reading is any good"
          plainEnglish="A flow instrument measures what arrives at it. Fit it straight after a bend or a valve and what arrives is turbulent and asymmetric, so the reading suffers regardless of the instrument's quality."
          onSite="Straight run is not a manufacturer's preference. It is part of the measurement, and it is the first thing to check on a flow loop that has never read correctly since it was installed."
        >
          <p>
            Most flow principles assume a reasonably well-developed, symmetrical flow profile
            arriving at the element. Bends, valves, pumps and reducers all distort that profile, and
            a distorted profile means the element is sampling something other than what the
            calculation assumes.
          </p>
          <p>
            Hence the requirement for <strong>straight pipe run</strong> upstream and downstream —
            specified by the manufacturer for the particular element and expressed in pipe
            diameters. Compress it and the instrument does not fail; it reads consistently wrong, in
            a way no calibration will correct because the instrument itself is fine.
          </p>
          <p>Two related points that catch people:</p>
          <ul>
            <li>
              <strong>Orientation matters</strong> for the impulse lines on a DP set. Liquid service
              generally wants tappings arranged so gas cannot collect in the lines; gas service
              wants the opposite, so condensate cannot. Getting this backwards is what creates the
              trapped-fluid faults described below.
            </li>
            <li>
              <strong>The pipe must be full.</strong> A partially filled pipe defeats most
              volumetric flow measurement entirely, because the instrument assumes the cross-section
              it is calculating with is occupied.
            </li>
          </ul>
          <p>
            Coriolis is the notable exception on straight run — it needs no inlet or outlet runs —
            which is one of the reasons it appears in installations too cramped for anything else.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Where DP flow actually goes wrong</ContentEyebrow>

        <ConceptBlock
          title="The impulse lines are part of the measurement"
          plainEnglish="The small-bore tubing between the process tappings and the transmitter has to present both pressures faithfully. When it does not, the transmitter reports a difference that is real but not the one you wanted."
          onSite="On a DP flow problem, work the tubing before the electronics. The transmitter is usually innocent."
        >
          <p>
            A DP transmitter is rarely bolted directly to the pipe. It sits on{' '}
            <strong>impulse lines</strong> — small-bore tubing running from the high-pressure and
            low-pressure tappings to the two sides of the instrument. Those lines are not plumbing
            incidental to the measurement. They <em>are</em> the measurement, and the classic faults
            all live in them:
          </p>
          <ul>
            <li>
              <strong>Partial blockage.</strong> Scale, debris or a frozen line means one side no
              longer follows process changes properly. The reading becomes sluggish on one side and
              therefore wrong.
            </li>
            <li>
              <strong>Trapped gas in a liquid-filled line.</strong> A gas pocket is compressible
              where liquid is not, so that side responds differently and the difference is
              corrupted.
            </li>
            <li>
              <strong>Condensed liquid in a gas-filled line.</strong> The mirror image, and worse,
              because a liquid column adds its own head to that side — a steady offset that looks
              exactly like a calibration error.
            </li>
            <li>
              <strong>Unequal legs.</strong> If the two lines carry different liquid heights, that
              difference is added to the process difference. This is why symmetry matters and why
              the installation detail is specified rather than left to preference.
            </li>
          </ul>
          <p>
            The signatures differ, and knowing them is most of the diagnosis. A blockage tends to
            produce a sluggish or stuck reading. A liquid column tends to produce a steady offset. A
            gas pocket tends to produce a reading that responds but not proportionally.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="The three-valve manifold, and why the sequence matters"
          plainEnglish="A DP transmitter sits behind a small valve block that lets you isolate it and connect its two sides together. Operating it in the wrong order can put full process pressure on one side alone."
          onSite="Equalise before you isolate, and isolate before you vent. Learn the order once and it becomes automatic — get it wrong on a high-pressure line and you can destroy a cell instantly."
        >
          <p>
            A differential pressure transmitter is not plumbed directly to two tappings. It sits
            behind a <strong>manifold</strong> — most commonly a three-valve block with two{' '}
            <strong>isolate</strong> valves, one per impulse line, and one <strong>equalise</strong>{' '}
            valve joining the two sides together.
          </p>
          <p>The equalise valve is the one that does the useful work:</p>
          <ul>
            <li>
              <strong>Opening it connects both sides of the sensing cell.</strong> Whatever pressure
              is present now appears equally on both, so the differential is genuinely zero — and
              the transmitter should read zero. That is how you prove the instrument independently
              of the process, without disconnecting anything.
            </li>
            <li>
              <strong>It also protects the cell.</strong> A DP cell is built to measure a small
              difference while withstanding a large common pressure. Isolate one side while the
              other stays at full line pressure and you apply the whole line pressure across the
              diaphragm as a differential — which is exactly what it is not designed for.
            </li>
          </ul>
          <p>
            That second point is why the sequence is drilled rather than improvised. The safe habit
            is <strong>equalise first</strong>, so both sides are tied together before either is
            isolated, and only then isolate and vent. Reinstating runs the sequence in reverse.
          </p>
          <p>
            Note how this connects to Module 1 Section 5: this is process isolation, not electrical
            isolation, and no amount of proving dead protects a cell from a mis-sequenced manifold.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-3-manifold"
          question="You open the equalise valve on a DP flow transmitter in service. What should the transmitter read?"
          options={[
            'Full scale, because both sides are now pressurised',
            'Zero, because both sides of the cell now see the same pressure',
            'The line pressure',
            'It should be left alone — equalising damages the cell',
          ]}
          correctIndex={1}
          explanation="Equalising ties both sides of the sensing cell together, so the differential across it is zero regardless of what the line pressure is. A healthy transmitter reads zero. That is the quickest way to prove the instrument without disconnecting it — and if it does not zero, you have found the fault."
        />

        <Scenario
          title="A flow reading that is wrong by exactly the square root"
          situation="A DP flow loop on a water line is commissioned. Loop-checked at 4 mA and 20 mA, both ends agree perfectly with the control system. In service, operators report the indicated flow reads noticeably high at part load — around 70% when a downstream totaliser suggests about half rate — but agrees at full rate."
          whatToDo="Recognise the pattern before touching the instrument: correct at both ends, wrong in the middle, and 71% where 50% was expected. That is √0.5, and it is the fingerprint of a square-root extraction happening once too often or once too few. Check where extraction is configured — the transmitter's output mode and the control system's input scaling — and confirm exactly one of them is doing it."
          whyItMatters="This survives a standard two-point loop check by construction. 0% and 100% are unaffected by any number of square-root extractions, so a commissioning test at 4 mA and 20 mA proves nothing about it. Anything with a non-linear relationship needs a mid-range point in the check, and this is the clearest example of why."
        />

        <ConceptBlock
          title="Choosing a flow measurement, in the order the constraints bite"
          plainEnglish="Work through what the fluid and the pipework will not allow before thinking about accuracy. The constraints usually leave you with one or two options."
          onSite="Most flow selection arguments are settled by the fluid. Ask what it is and whether it conducts before anything else."
        >
          <p>
            <strong>1. What is the fluid, and does it conduct?</strong> Conductive liquid opens up
            electromagnetic, which is attractive because it obstructs nothing. Non-conductive rules
            it straight out. Gas and steam push you towards vortex, thermal, ultrasonic or DP.
          </p>
          <p>
            <strong>2. Can the process afford a pressure drop?</strong> Every DP element extracts a
            permanent loss, and on a low-head system or a long pipeline that is a real running cost.
            Magmeters and clamp-on ultrasonic cost nothing in pressure.
          </p>
          <p>
            <strong>3. How wide is the flow range?</strong> This is where DP struggles, for the
            square-law reason above. A duty running from near-zero to full rate is a poor fit for DP
            and a natural one for Coriolis or magnetic.
          </p>
          <p>
            <strong>4. Do you need mass or volume?</strong> Most technologies give volume. If mass
            is what matters — and it usually is for anything sold, batched or reacted — either
            measure mass directly with Coriolis, or measure volume and compensate for density, which
            means another measurement and another thing to get wrong.
          </p>
          <p>
            <strong>5. Is there straight pipe available?</strong> If the installation is cramped,
            the straight-run requirement may eliminate the cheap options before cost is even
            discussed.
          </p>
          <p>
            <strong>6. What will the fluid do to it?</strong> Abrasive slurries erode orifice edges;
            sticky products coat electrodes; fibrous material catches on anything intruding. The
            technology that is best on paper is sometimes the one that will not survive the service.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Reading the DP signal as though it were the flow"
          whatHappens="A technician measures 12 mA on a DP flow loop and reports the line is at half flow. It is at about 71%. Decisions get made — a pump left running, a batch assumed short — on a number that is wrong by a factor that changes across the range."
          doInstead="Establish where the square root is taken before interpreting any current on a DP flow loop. If the extraction happens downstream of where you are measuring, the mA you are reading is a pressure signal and has to be rooted before it means anything about flow. If it happens in the transmitter, the mA is already linear with flow and can be read directly."
        />

        <CommonMistake
          title="Chasing the transmitter when the tubing is at fault"
          whatHappens="A DP flow reading drifts, so the transmitter is recalibrated. It drifts again, so it is replaced. It drifts again. Days are spent on an instrument that was correct throughout, while a slow blockage in one impulse line goes unexamined."
          doInstead="Treat a DP installation as transmitter plus tubing plus tappings, and check the cheap end first. Equalising the transmitter and confirming it reads zero proves the instrument. If it zeroes correctly and still misreads in service, the fault is upstream of it — which means the lines, the manifold or the tappings."
        />

        <SectionRule />
        <ContentEyebrow>The same instrument, a third job</ContentEyebrow>

        <ConceptBlock
          title="A DP transmitter across a vessel measures level"
          plainEnglish="Liquid in a tank presses down. Measure that pressure at the bottom and you know how deep the liquid is — if you know what it weighs."
          onSite="Half the 'level transmitters' you meet are differential pressure transmitters. Section 2.4 goes into level properly; this is why it belongs to the same instrument family."
        >
          <p>
            The versatility point from Section 2.1 is worth making concrete. The same differential
            pressure transmitter, plumbed three different ways, answers three different questions:
          </p>
          <ul>
            <li>
              <strong>Across a restriction</strong> — the difference relates to flow.
            </li>
            <li>
              <strong>Across a filter or strainer</strong> — the difference tells you how blocked it
              is, and rising DP is the standard signal that it needs cleaning.
            </li>
            <li>
              <strong>Across a vessel</strong> — the difference is the head of liquid, which relates
              to level.
            </li>
          </ul>
          <p>
            <strong>The instrument does not know which of those it is doing.</strong> It reports a
            pressure difference; the installation and the scaling decide what that difference means.
            That is worth holding onto, because it explains why the same fault — a blocked impulse
            line — shows up as a flow problem on one loop and a level problem on the next.
          </p>
          <p>
            It also introduces the complication that Section 2.4 takes apart: a hydrostatic level
            measurement depends on the <strong>density</strong> of the liquid. The transmitter
            measures pressure, and converting that to a height assumes you know what the fluid
            weighs. Change the product in the tank, or heat it up, and a perfectly healthy level
            measurement becomes wrong.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question:
                'Why is so much flow measured with pressure instruments rather than dedicated flow meters?',
              answer:
                'Cost, robustness and familiarity. An orifice plate is a machined plate between two flanges with no moving parts, and a DP transmitter is a well-understood instrument that any technician can work on. Electromagnetic, Coriolis and ultrasonic meters are more accurate over wider ranges but cost considerably more.',
            },
            {
              question: 'Does the orifice plate itself wear out?',
              answer:
                'The sharp edge of the bore is what creates the predictable pressure drop, and erosion or damage to that edge changes the relationship between differential pressure and flow. A worn plate produces a reading that is wrong in a stable, believable way — which is why plate condition is part of a flow loop investigation.',
            },
            {
              question: 'Can one transmitter measure both pressure and flow?',
              answer:
                'A differential pressure transmitter measures a pressure difference; whether that difference means flow depends entirely on what it is plumbed across. The same instrument across a restriction reads flow, across a filter reads how blocked the filter is, and across a vessel reads level. The instrument does not know which — the installation decides.',
            },
            {
              question: 'Why does a DP transmitter need a manifold?',
              answer:
                'To let you equalise the two sides and isolate them from the process safely. Equalising connects both sides together so the transmitter should read zero, which is how you prove the instrument independently of the process. Getting the valve sequence wrong can subject one side to full process pressure, which is why the order matters.',
            },
            {
              question: 'Is absolute pressure ever needed on ordinary plant?',
              answer:
                'Yes, wherever a true pressure rather than a relative one matters — vacuum systems, and any calculation involving gas density or the gas laws. Using gauge where absolute was required builds a permanent error of roughly one atmosphere into whatever is calculated from it.',
            },
            {
              question: 'What is the low-flow cut-off actually doing?',
              answer:
                'Forcing the indicated flow to zero below a threshold, because the square law has shrunk the differential into the noise. It is an admission that the measurement principle has run out of resolution rather than a fault, and the threshold should be set deliberately rather than left at a default.',
            },
          ]}
        />

        <ConceptBlock
          title="What a flow loop check has to prove, and why two points are not enough"
          plainEnglish="Checking only the ends of the range proves the ends of the range. On anything non-linear that is precisely where the errors hide."
          onSite="Insist on a mid-range point on any square-root loop. It costs one extra reading and catches the error that survives everything else."
        >
          <p>
            The scenario above is not bad luck; it is the predictable consequence of a two-point
            check on a non-linear loop. It is worth stating the general rule:
          </p>
          <ul>
            <li>
              <strong>0% and 100% are invariant under square-root extraction.</strong> &radic;0 = 0
              and &radic;1 = 1, so those two points look correct whether the root is taken once,
              twice, or not at all.
            </li>
            <li>
              <strong>Every point in between is not.</strong> 50% becomes 70.7% with one extraction
              and 84.1% with two.
            </li>
          </ul>
          <p>
            So a loop check on a DP flow measurement should include at least one mid-range point —
            50% is the conventional choice because the expected value is easy to state and the
            discrepancy is largest there. Ideally three: 0%, 50%, 100%.
          </p>
          <p>
            The same logic applies to anything characterised rather than linear, which will come up
            again in Module 6. A calibration performed only at the ends of a range proves the ends
            of the range, and nothing about the shape between them.
          </p>
        </ConceptBlock>

        <KeyTakeaways
          points={[
            'Gauge, absolute and differential differ only in what the other side of the sensing element sees: atmosphere, a vacuum, or a second process pressure.',
            'Bourdon tubes, bellows and diaphragms all convert pressure to movement, and any of them can be built for gauge, absolute or differential duty.',
            'Fluid accelerating through a restriction gains kinetic energy, so it must lose pressure — which is why a differential pressure measures flow.',
            'DP is proportional to the SQUARE of flow: 25% DP is 50% flow, 1% DP is 10% flow.',
            'The square root must be extracted exactly once. Twice or not at all both survive a two-point loop check, because 0% and 100% are unaffected.',
            'DP flow degrades badly at low flow because the differential collapses while the instrument’s own error does not — hence the low-flow cut-off.',
            'Impulse lines are part of the measurement. Blockage gives a sluggish reading, a liquid column gives a steady offset, a gas pocket gives a disproportionate response.',
            'Equalise and check for zero to prove the transmitter. If it zeroes and still misreads, the fault is in the tubing or the tappings.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 2.3" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Temperature sensors
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Level, position and proximity
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule2Section3;
