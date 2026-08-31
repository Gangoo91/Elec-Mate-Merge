/**
 * Module 2 · Section 4 — Level, position and proximity sensors
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE ARGUMENT OF THIS PAGE. Level is the measurement most often got wrong
 * on real plant, and almost always for the same reason: most level measurements
 * are INFERRED. A hydrostatic instrument measures pressure and converts it to a
 * height by assuming a density. Change the product, or heat it up, and a
 * perfectly healthy instrument reports a wrong level with nothing to find.
 *
 * The source gives a striking verified figure for this: the weight density of
 * water is 62.4 lb/ft³ at standard temperature but may be as low as 36 lb/ft³
 * at temperatures common in power generation boilers. That is a ~42% change in
 * the very quantity a hydrostatic level measurement has to assume — which is
 * why boiler drum level is a specialist problem rather than a routine one.
 *
 * The interface case is worse again, and the source is explicit: many different
 * liquid-liquid interface columns can have the SAME hydrostatic pressure
 * without being identical to one another. A pressure reading alone cannot
 * distinguish them.
 *
 * Position and proximity share this page because they are the discrete cousins
 * of the same job — knowing where something is — and because proximity
 * switches are where most electricians already have a foothold.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.20, extracted to scratchpad/src/m2s4_level.txt; Endress+Hauser
 * "Continuous level measurement" for the radar, guided radar and ultrasonic
 * principles. Both held in ~/Desktop/hav/instrumentation.
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

const TITLE = 'Level, position and proximity sensors | Instrumentation Module 2.4 | Elec-Mate';
const DESCRIPTION =
  'Why most level measurements are inferred rather than measured, what density does to a hydrostatic reading, how radar and ultrasonic time-of-flight methods work, why liquid interfaces defeat pressure-based measurement, and where position and proximity sensing fits.';

const outcomes = [
  'Explain why a hydrostatic level measurement depends on density, and what happens when density changes',
  'Describe how a sightglass and its vessel behave as a U-tube manometer',
  'Say why a liquid-liquid interface cannot be resolved by hydrostatic pressure alone',
  'Describe the time-of-flight principle behind radar, guided radar and ultrasonic level measurement',
  'Explain what a float measures and what it requires of the product',
  'Choose between contact and non-contact level measurement for a stated duty',
  'Distinguish continuous position measurement from discrete proximity detection, and say when each is right',
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why does a hydrostatic level transmitter depend on the density of the liquid?',
    options: [
      'Because dense liquids damage the diaphragm',
      'Because it measures the pressure produced by the liquid column, and converting that pressure to a height requires knowing what the liquid weighs',
      'Because density affects the electrical conductivity of the fluid',
      'It does not — hydrostatic measurement is density-independent',
    ],
    correctIndex: 1,
    explanation:
      'The instrument measures pressure at the bottom of a column. The same pressure can be produced by a tall column of light liquid or a short column of heavy liquid, so converting pressure to height requires an assumed density. If the real density differs from the assumed one, the level is wrong and nothing is faulty.',
  },
  {
    id: 2,
    question:
      'Water is close to 1000 kg/m³ at everyday temperatures. At the temperatures a power-generation boiler runs at, roughly what does that fall to?',
    options: ['930 kg/m³', '850 kg/m³', '580 kg/m³', '320 kg/m³'],
    correctIndex: 2,
    explanation:
      'Around 580 kg/m³ — a reduction of roughly 42%. A hydrostatic level measurement configured for cold water and applied to hot boiler water would be badly wrong, which is why boiler drum level is treated as a specialist measurement with compensation rather than a routine one.',
  },
  {
    id: 3,
    question: 'Why can hydrostatic pressure alone not resolve a liquid-liquid interface?',
    options: [
      'Because the two liquids mix',
      'Because many different interface positions can produce exactly the same hydrostatic pressure',
      'Because interfaces are always outside the transmitter range',
      'Because the lighter liquid has no weight',
    ],
    correctIndex: 1,
    explanation:
      'Any number of different splits between the two liquids can weigh exactly the same, so the pressure at the bottom does not identify which split produced it. Weighing the column cannot separate them — you need a principle that can actually tell the two materials apart.',
  },
  {
    id: 4,
    question: 'What does a radar level instrument actually measure?',
    options: [
      'The pressure at the bottom of the tank',
      'The time of flight of a pulse reflected from the product surface, which is proportional to distance travelled',
      'The dielectric constant of the product',
      'The weight of the vessel contents',
    ],
    correctIndex: 1,
    explanation:
      'High-frequency radar pulses are emitted by an antenna and reflected from the product surface. The time of flight of the reflected pulse is directly proportional to the distance travelled, and if the tank geometry is known the level can be calculated from that.',
  },
  {
    id: 5,
    question: 'What is required of a float used for level measurement?',
    options: [
      'That it be denser than the product so it sinks predictably',
      'That it be of substantially lesser density than the substance, and not corrode or react with it',
      'That it be electrically conductive',
      'That it be magnetic',
    ],
    correctIndex: 1,
    explanation:
      'A float rides on the surface, so it must be of substantially lesser density than the substance of interest. It must also not corrode or otherwise react with the product — a float that dissolves, swells or gains weight over time stops floating where it should.',
  },
  {
    id: 6,
    question:
      'A machine needs to know whether a guard is closed before it will start. Which is appropriate?',
    options: [
      'A continuous position transmitter reporting 4–20 mA',
      'A discrete proximity switch reporting open or closed',
      'A hydrostatic level transmitter',
      'A radar sensor',
    ],
    correctIndex: 1,
    explanation:
      'The question is binary — closed or not closed — so a discrete device answers it directly with fewer failure modes and no scaling to get wrong. Continuous position measurement is for when you need to know how far, not merely whether.',
  },
];

const InstrumentationModule2Section4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 4"
        title="Level, position and proximity"
        backTo="/electrician/upskilling/instrumentation-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The measurement most often wrong on real plant, and the reason is almost always the same
          one.
        </p>

        <TLDR
          points={[
            '🔴 Most level measurements are INFERRED, not measured. A hydrostatic instrument weighs a column of liquid and converts that to a height by assuming a density.',
            'Change the product or its temperature and the assumption breaks. Water is close to 1000 kg/m³ cold and nearer 580 kg/m³ at boiler temperatures — a 42% shift in the very number the conversion depends on.',
            'A sightglass and its vessel form a U-tube manometer, which is why unequal-height columns can balance perfectly well if their densities differ.',
            'Interfaces defeat pressure entirely: any number of different splits between two liquids weigh exactly the same, so the reading cannot tell them apart.',
            'Radar, guided radar and ultrasonic all work on time of flight — emit a pulse, time the reflection, convert to distance. They measure the surface rather than the weight.',
            'Position sensing answers "how far". Proximity sensing answers "is it there". Do not buy the first when the second will do.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>The problem with level</ContentEyebrow>

        <ConceptBlock
          title="Almost nothing measures level directly"
          plainEnglish="Level looks like the simplest measurement on a plant and is one of the most treacherous, because most instruments measure something else and calculate the level from it."
          onSite="Before trusting a level reading, ask what the instrument is physically sensing. If the answer is pressure, the reading depends on an assumption about the product."
        >
          <p>
            Section 2.3 ended on this deliberately. A differential pressure transmitter across a
            vessel measures the head of liquid — and head is not height. It is height{' '}
            <em>multiplied by density</em>.
          </p>
          <p>
            That means a hydrostatic level measurement carries a hidden input that is never wired to
            anything: the assumed density of whatever is in the tank. The instrument reports a
            pressure faithfully. The conversion from that pressure to a level is where the
            assumption lives, and the assumption is invisible on the display.
          </p>
          <p>Consequences worth stating plainly:</p>
          <ul>
            <li>
              <strong>Change the product</strong> in a tank used for more than one grade, and every
              level reading shifts even though nothing about the instrument changed.
            </li>
            <li>
              <strong>Change the temperature</strong> and density moves with it, so the same tank at
              the same height reads differently hot and cold.
            </li>
            <li>
              <strong>Change the composition</strong> — entrained gas, settled solids, a different
              water cut — and the column no longer weighs what the configuration says it does.
            </li>
          </ul>
          <p>
            None of that is a fault. All of it produces a wrong number that survives every check you
            would normally perform on the instrument.
          </p>
        </ConceptBlock>

        <Pullquote>
          A hydrostatic level transmitter does not measure level. It weighs a column of liquid and
          somebody else decides what that weight means.
        </Pullquote>

        <ConceptBlock
          title="How much density actually moves — a number worth remembering"
          plainEnglish="Water does not weigh the same hot as it does cold, and in a boiler the difference is enormous."
          onSite="This is why boiler drum level gets density compensation and a dedicated design, rather than a standard DP set and a scaling factor."
        >
          <p>It is tempting to treat density variation as a rounding error. It is not.</p>
          <p>
            <strong>
              Water sits near 1000 kg/m³ at ordinary temperatures and can fall to roughly 580 kg/m³
              once it is as hot as a power-generation boiler keeps it.
            </strong>
          </p>
          <p>
            That is a reduction of roughly 42% in the quantity a hydrostatic measurement has to
            assume. Configure an instrument for cold water and apply it to hot boiler water and the
            level indication is not slightly out — it is out by a proportion that would make the
            reading useless and, on a boiler, dangerous.
          </p>
          <p>
            This is precisely why the boiler drum example in Module 1 Section 1 is a serious
            measurement problem rather than a simple one, and why drum level installations use
            density compensation, reference legs and dedicated design rather than a standard DP set
            with a scaling factor.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-4-density"
          question="A tank is used alternately for two products of different density. The DP level transmitter is configured for the heavier one. What happens when the lighter product is stored?"
          options={[
            'The indicated level reads LOW, because the lighter column produces less pressure for the same height',
            'Nothing — the instrument self-compensates',
            'The indicated level reads HIGH',
            'The transmitter will fail to zero',
          ]}
          correctIndex={0}
          explanation="Less dense product produces less pressure for the same physical height. The transmitter, configured to expect the heavier product, converts that lower pressure into a lower indicated level. The tank is fuller than the display claims — which is the dangerous direction of error on an overfill."
        />

        <ConceptBlock
          title="Closed vessels — the wet leg and the dry leg"
          plainEnglish="On a sealed tank, the pressure at the bottom includes whatever is pressing down from above. The low side of the transmitter has to be connected to the vapour space so that part cancels out."
          onSite="A wet leg that has partly evaporated, or a dry leg that has condensate in it, both produce a stable level error that looks exactly like a calibration problem."
        >
          <p>
            Everything above assumed an open tank, where the surface sees atmosphere. On a{' '}
            <strong>closed</strong> vessel it does not: the vapour space above the liquid may be
            pressurised, and that pressure adds to the hydrostatic head at the bottom.
          </p>
          <p>
            A gauge-pressure instrument would report the sum and call it level — so the vessel
            pressure would appear as level, and a change in pressure would look like the tank
            filling or emptying. The fix is the differential arrangement from Section 2.3: connect
            the <strong>high side</strong> to the bottom of the vessel and the{' '}
            <strong>low side</strong> to the vapour space, so the common vessel pressure appears on
            both sides and cancels. What is left is the head of liquid.
          </p>
          <p>
            That low-side connection is the <strong>reference leg</strong>, and it comes in two
            forms:
          </p>
          <ul>
            <li>
              <strong>Dry leg</strong> — the impulse line to the vapour space is kept empty. Simple,
              and it works while it stays dry.
            </li>
            <li>
              <strong>Wet leg</strong> — the line is deliberately filled, usually because the vapour
              would condense in it anyway and an uncontrolled amount of liquid is worse than a known
              one. A filled leg adds its own constant head to the low side, which is compensated for
              in the calibration.
            </li>
          </ul>
          <p>Both fail in the same characteristic way, and it is worth recognising:</p>
          <ul>
            <li>
              A <strong>dry leg that has collected condensate</strong> now has a liquid column on
              the low side that nobody accounted for, subtracting from the differential. The level
              reads <strong>low</strong>, steadily.
            </li>
            <li>
              A <strong>wet leg that has partly evaporated or drained</strong> has lost some of the
              head the calibration assumed, so the differential is larger than it should be. The
              level reads <strong>high</strong>, steadily.
            </li>
          </ul>
          <p>
            In both cases the transmitter is healthy, the vessel is fine, and the error is a stable
            offset — which is exactly the profile that gets misdiagnosed as calibration drift and
            &ldquo;corrected&rdquo; by re-ranging. Checking the reference leg belongs before
            touching the instrument.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-4-wetleg"
          question="A closed-vessel level measurement with a dry reference leg begins reading steadily LOW. What should you check first?"
          options={[
            'The transmitter calibration',
            'Whether condensate has collected in the dry leg, adding an unaccounted head to the low side',
            'The density configuration',
            'The vessel pressure',
          ]}
          correctIndex={1}
          explanation="Condensate in a dry leg puts liquid on the low side that the calibration never allowed for. That subtracts from the differential and the level reads low — steadily, with nothing faulty. Re-ranging to correct it hides the problem until the leg fills further or drains."
        />

        <SectionRule />
        <ContentEyebrow>Two liquids, one pressure</ContentEyebrow>

        <ConceptBlock
          title="Why an interface defeats pressure measurement"
          plainEnglish="If a tank holds oil floating on water, the pressure at the bottom cannot tell you where the boundary between them is — because many different boundaries give the same answer."
          onSite="Interface duty is a specialist measurement. If someone asks a hydrostatic instrument to find an oil-water interface, that is the conversation to have."
        >
          <p>
            Consider a vessel holding two immiscible liquids — oil above water is the classic. The
            total pressure at the bottom is the sum of both columns, each weighted by its own
            density.
          </p>
          <p>
            The difficulty is that{' '}
            <strong>
              any number of different splits between two liquids weigh exactly the same at the
              bottom of the vessel
            </strong>
            . A tall oil layer over a short water layer and a short oil layer over a tall water
            layer can weigh exactly the same. The pressure reading cannot distinguish them, because
            the information simply is not present in a single number.
          </p>
          <p>
            The same trap applies to sightglasses, which is worth understanding because it is the
            clearest illustration. A sightglass and its vessel together form a{' '}
            <strong>U-tube manometer</strong>: the two columns balance so long as the pressures from
            each are the same. But{' '}
            <strong>
              unequal-height liquid columns may balance each other perfectly well if the two columns
              are comprised of liquids with different densities
            </strong>
            .
          </p>
          <p>
            That is exactly what happens when the liquid in a sightglass is cooler than the liquid
            in the vessel — a very common situation, since the glass is exposed and the vessel is
            not. The cooler liquid is denser, so a shorter column in the glass balances a taller one
            in the vessel, and the sightglass under-reads while looking entirely healthy.
          </p>
          <p>
            For interface work in a sightglass there is only one way to get a proper two-part
            indication: <strong>keep both ports submerged</strong>. Resolving an interface properly
            needs a principle that can distinguish the two materials — guided radar and capacitance
            both do this — rather than one that merely weighs the column.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Timing a reflection</ContentEyebrow>

        <ConceptBlock
          title="Radar, guided radar and ultrasonic — time of flight"
          plainEnglish="Send a pulse at the surface, time how long it takes to come back, and convert that to a distance. Measure the surface directly rather than inferring it from weight."
          onSite="Time-of-flight instruments are indifferent to density. That single fact is why they have displaced hydrostatic measurement on so many duties."
        >
          <p>Three related principles, all built on the same idea:</p>
          <ul>
            <li>
              <strong>Radar (free space)</strong> — high-frequency radar pulses are emitted by an
              antenna and reflected from the product surface. The{' '}
              <strong>
                time of flight of the reflected pulse is directly proportional to the distance
                travelled
              </strong>
              , and if the tank geometry is known, the level is calculated from that. Nothing
              touches the product.
            </li>
            <li>
              <strong>Guided radar</strong> — the pulses are guided along a rigid probe or cable
              rather than radiated into the vessel. When the pulse reaches the medium surface the
              characteristic impedance changes and part of the pulse is reflected. The time between
              launch and receipt is a direct measure of the distance from the process connection to
              the product surface.
            </li>
            <li>
              <strong>Ultrasonic</strong> — the same time-of-flight principle using sound. A pulse
              is emitted, the surface bounces it back, the sensor detects it, and the flight time
              gives the distance.
            </li>
          </ul>
          <p>
            The decisive advantage over hydrostatic methods:{' '}
            <strong>
              these instruments locate the surface, not the weight of what is under it
            </strong>
            . Change the product, heat it, aerate it — the surface is still where the surface is.
            That removes the density assumption entirely.
          </p>
          <p>
            Guided radar has a second advantage worth noting: because the reflection happens where
            the impedance changes, it can detect a boundary <em>within</em> the liquid as well as at
            the top of it — which is what makes it a genuine answer to the interface problem above.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-4-tof"
          question="Why is a radar level instrument unaffected by a change of product density?"
          options={[
            'Because it compensates for density internally',
            'Because radar pulses travel faster through denser liquids',
            'Because it locates the surface by timing a reflection, rather than inferring height from the weight of the column',
            'It is affected — density must be configured',
          ]}
          correctIndex={2}
          explanation="Time of flight measures the distance to the surface. Density does not enter the calculation at all, because the instrument is not weighing anything. That is the fundamental difference between measuring level and inferring it."
        />

        <SectionRule />
        <ContentEyebrow>Mechanical methods</ContentEyebrow>

        <ConceptBlock
          title="Floats and magnetic level indicators"
          plainEnglish="The oldest method and still one of the most useful: put something on the surface that floats, and watch where it sits."
          onSite="A magnetic level indicator gives a local reading with no power at all, which is why they persist on vessels where you want to see the level during an outage."
        >
          <p>
            <strong>
              The most direct way to follow a level is to put something on top of it and watch where
              that sits &mdash; a float, riding the surface inside the vessel.
            </strong>
          </p>
          <p>Two requirements follow directly, and both are practical failure modes:</p>
          <ul>
            <li>
              <strong>The float must be of substantially lesser density than the substance.</strong>{' '}
              A float sized for one product may not float adequately in a lighter one.
            </li>
            <li>
              <strong>It must not corrode or otherwise react with the product.</strong> A float that
              swells, dissolves or gains a coating over time gradually stops sitting where it should
              — and does so slowly enough that nobody notices the drift.
            </li>
          </ul>
          <p>
            A refinement worth knowing is the <strong>magnetic level indicator</strong>: a chamber,
            typically stainless steel, containing a magnetised float, with magnet-sensing indicator
            flags mounted outside the tube. As the float rises and falls, the flags flip, and the
            height of the coloured column shows the level. Switches can also be mounted outside the
            tube to operate as the magnetic float passes, remotely signalling level at that height.
          </p>
          <p>
            The attraction is that the indication is entirely outside the pressure boundary —
            nothing penetrates the chamber — and it needs no power to be read.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Displacers and capacitance — two more contact methods worth recognising"
          plainEnglish="A displacer weighs how much buoyancy it has lost. A capacitance probe treats the tank and the probe as a capacitor whose value changes as product covers it."
          onSite="Both are common on older plant. Neither is obvious from the outside, so read the tag and the drawing rather than guessing from the shape of the flange."
        >
          <p>
            Two contact methods sit between the float and the pressure transmitter, and you will
            meet both:
          </p>
          <p>
            <strong>Displacers.</strong> Rather than riding on the surface like a float, a displacer
            is suspended in the liquid and is denser than it, so it never floats. As the level
            rises, more of the displacer is submerged and buoyancy supports more of its weight. The
            instrument senses that apparent weight change and converts it to a level.
          </p>
          <p>
            Notice what that means: a displacer is <strong>weighing buoyancy</strong>, and buoyancy
            depends on the density of the liquid. So a displacer inherits the same density
            sensitivity as a hydrostatic measurement, for a slightly different reason. It is not the
            density-independent alternative it can look like.
          </p>
          <p>
            <strong>Capacitance.</strong> A probe and the vessel wall form a capacitor, with the
            product between them as the dielectric. As product rises up the probe, the capacitance
            changes, and the instrument converts that change into a level.
          </p>
          <p>
            The dependency here is on the <strong>electrical properties</strong> of the product
            rather than its weight. Change to a product with different dielectric behaviour and the
            calibration no longer holds — the same class of hidden assumption as density, wearing
            different clothes. Coating on the probe causes the same trouble, because a conductive
            film effectively extends the probe.
          </p>
          <p>
            The general lesson matters more than either device:{' '}
            <strong>
              almost every level method depends on some property of the product, and the failures
              all look like instrument faults
            </strong>
            . Knowing which property a given instrument leans on tells you what will break it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-4-displacer"
          question="A displacer-type level instrument is moved to a tank holding a lighter product. What happens?"
          options={[
            'Nothing — displacers are density-independent',
            'It reads high',
            'The displacer will float',
            'It reads low, because the lighter liquid provides less buoyancy for the same submerged depth',
          ]}
          correctIndex={3}
          explanation="A displacer measures the buoyant force, and buoyancy depends on the density of the liquid displaced. A lighter product supports less weight for the same submerged depth, so the instrument sees less change and reports a lower level. Like the hydrostatic case, the instrument is working perfectly and the assumption behind it is not."
        />

        <Scenario
          title="A level that reads correctly cold and wrong hot"
          situation="A jacketed vessel has a DP level transmitter. During cold commissioning the indication agrees with a dip measurement to within a couple of percent. Once the plant is running at temperature, the indicated level sits consistently around 8% below what the operators expect, and the discrepancy is stable rather than drifting."
          whatToDo="Look at the shape of the error before touching the instrument: correct cold, consistently low hot, stable at any given temperature. That is not a fault signature — it is a density signature. The product is less dense hot, so it produces less pressure for the same height, and a transmitter configured against a cold-density figure converts that into a lower level. Confirm the density used in the scaling and what the product's density actually is at operating temperature."
          whyItMatters="Everything about this passes a conventional check. The transmitter zeroes correctly, the impulse lines are clear, the loop reads accurately at both ends of its range. The error is in an assumption held in the configuration, not in any component — and it is in the dangerous direction, because the tank contains more than the display claims."
        />

        <SectionRule />
        <ContentEyebrow>Choosing a level measurement</ContentEyebrow>

        <ConceptBlock
          title="Contact or non-contact, and what each one demands of the vessel"
          plainEnglish="Either something goes into the product, or something looks at it from above. Both bring their own list of things that can go wrong."
          onSite="Ask what is inside the vessel before choosing. Agitators, internal structure, foam and vapour rule out more instruments than cost ever does."
        >
          <p>
            Level technologies divide first into <strong>contact</strong> and{' '}
            <strong>non-contact</strong>, and that division decides most of the practical
            constraints.
          </p>
          <p>
            <strong>Contact methods</strong> — hydrostatic, displacer, float, capacitance, guided
            radar — put something into the product. That means:
          </p>
          <ul>
            <li>The device must survive the product chemically and thermally.</li>
            <li>The product must not coat, clog or build up on it.</li>
            <li>Removing it for maintenance usually means opening the vessel.</li>
          </ul>
          <p>
            <strong>Non-contact methods</strong> — free-space radar, ultrasonic — sit above the
            product and never touch it. That removes the material compatibility problem entirely but
            introduces a different one: they need a clear view of the surface.
          </p>
          <ul>
            <li>
              <strong>Obstructions.</strong> Agitators, baffles, ladders and pipework inside a
              vessel all produce reflections, and the instrument may report the strongest one rather
              than the surface.
            </li>
            <li>
              <strong>Foam.</strong> A foam layer may reflect, absorb, or partly do both — so the
              instrument sees the top of the foam, the liquid, or something unstable between them.
            </li>
            <li>
              <strong>Vapour and condensation.</strong> Heavy vapour affects propagation, and
              condensation on an antenna attenuates the signal.
            </li>
            <li>
              <strong>Surface condition.</strong> A turbulent or sloping surface scatters the return
              rather than reflecting it cleanly back.
            </li>
          </ul>
          <p>
            Guided radar is the useful middle ground here, and it is worth understanding why:
            guiding the pulse along a probe keeps the energy concentrated instead of radiating it
            into a vessel full of reflectors. You accept a probe in the product in exchange for
            immunity to most of the geometry problems.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-4-noncontact"
          question="An ultrasonic level instrument in an agitated vessel reads erratically, sometimes reporting a level far above the true one. What is the most likely cause?"
          options={[
            'The instrument is receiving reflections from the agitator or from foam rather than from the liquid surface',
            'The product density has changed',
            'The transmitter has lost power',
            'The ultrasonic frequency has drifted',
          ]}
          correctIndex={0}
          explanation="A time-of-flight instrument reports the reflection it detects. Internal structure and foam both produce returns, and a return from something closer than the surface converts to a shorter distance — which reads as a higher level. Density is irrelevant here; the instrument is not weighing anything."
        />

        <ConceptBlock
          title="Choosing, in the order the constraints actually bite"
          plainEnglish="Work through what the product and the vessel forbid before comparing accuracy or price. That usually leaves one or two candidates."
          onSite="The first question is almost never accuracy. It is what the product will do to anything you put in it, and what is already inside the tank."
        >
          <p>
            <strong>1. Does the density vary?</strong> If the product changes, or the temperature
            swings, hydrostatic measurement inherits an error that no calibration removes. That
            single question pushes many duties straight to a time-of-flight method.
          </p>
          <p>
            <strong>2. What is inside the vessel?</strong> Agitators, internals and foam degrade
            non-contact methods. A clear, still surface suits radar or ultrasonic; a busy vessel
            suits guided radar or a contact method.
          </p>
          <p>
            <strong>3. What will the product do to a probe?</strong> Coating, crystallising,
            abrasive or aggressive products punish anything immersed. That argues for non-contact —
            provided question 2 allows it.
          </p>
          <p>
            <strong>4. Is it an interface, or a single liquid?</strong> Interface work eliminates
            hydrostatic measurement on its own, for the reason set out above.
          </p>
          <p>
            <strong>5. Is the vessel open or closed, and is it pressurised?</strong> A closed
            pressurised vessel needs the reference leg arrangement discussed in the FAQ below, and
            that is a design detail rather than an installation preference.
          </p>
          <p>
            <strong>6. What happens if it reads wrong?</strong> An overfill that spills product is a
            different risk from a tank that runs a pump dry. The consequence should decide how much
            the measurement is worth and whether an independent high-level device is needed
            alongside it.
          </p>
          <p>
            <strong>7. Can it be proved without emptying the tank?</strong> A question people forget
            until the first calibration is due. Some methods can be verified in place against a dip
            or a known fill; others effectively require the vessel to be taken out of service. On a
            tank that runs continuously, that difference decides whether the instrument ever gets
            checked at all — which makes it a selection criterion, not an afterthought.
          </p>
          <p>
            That last question deserves weight. Level is one of the measurements most often backed
            up by a separate, independent high-level switch — precisely because the continuous
            measurement can be quietly wrong in the ways this section has described.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Solids are not liquids — silos, hoppers and the surface that is not flat"
          plainEnglish="Powders and granules do not settle level. They pile up under the fill point and slope away, so 'the level' depends on where you measure it."
          onSite="A silo can be a third empty on one side and full on the other. One measurement point cannot describe that, and no instrument fault is involved."
        >
          <p>
            Everything so far has assumed a liquid, which has the convenient property of finding its
            own level. Solids — powders, granules, pellets, aggregate — do not.
          </p>
          <p>Three consequences that catch people out:</p>
          <ul>
            <li>
              <strong>The surface is sloped, not flat.</strong> Material piles into a cone under the
              fill point and slopes away at its natural angle of repose. A single measurement taken
              at one position on that cone is not the average level, and a measurement near the wall
              can differ enormously from one at the centre.
            </li>
            <li>
              <strong>Filling and emptying give different profiles.</strong> Filling builds a peak
              under the inlet; discharging draws a funnel down over the outlet. The same quantity of
              material can present two quite different surfaces, so a level reading can change
              without any material moving in or out.
            </li>
            <li>
              <strong>Bridging and rat-holing.</strong> Material can arch over a discharge and leave
              a void beneath it, or channel down a narrow core leaving the sides packed. A
              surface-sensing instrument reports the surface it can see, which may be sitting on
              nothing.
            </li>
          </ul>
          <p>
            Hydrostatic measurement does not transfer either: solids do not transmit pressure to the
            vessel wall the way a liquid does, because the material supports part of its own weight
            against the walls.
          </p>
          <p>
            The practical answers are the ones you would expect once the problem is stated —
            multiple measurement points on a large silo, weighing the vessel where accuracy really
            matters, or accepting that the reading is an indication rather than an inventory. What
            does not work is treating a silo like a tank and being surprised.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-4-solids"
          question="A radar level instrument on a flour silo reads a step change while nothing is being filled or discharged. What is the likely explanation?"
          options={[
            'The instrument has failed',
            'The material has shifted — a bridge collapsing, or the surface profile changing — so the surface the instrument sees has moved without the quantity changing',
            'The density of the flour has changed',
            'Radar cannot be used on solids',
          ]}
          correctIndex={1}
          explanation="Solids do not settle level, and the surface can move independently of the quantity stored. A bridge collapsing drops the visible surface sharply while the same mass remains in the silo. The instrument is reporting the surface honestly; the assumption that surface height means quantity is what fails."
        />

        <SectionRule />
        <ContentEyebrow>Knowing where something is</ContentEyebrow>

        <ConceptBlock
          title="Position and proximity — how far, versus whether"
          plainEnglish="Two different questions that get confused. One wants a number; the other wants a yes or no."
          onSite="Most machine sensing is proximity, and proximity is where an electrician's existing experience transfers almost intact."
        >
          <p>
            <strong>Position measurement</strong> is continuous: it reports how far something has
            travelled or where it currently sits, as a value. A valve position feedback reporting
            0&ndash;100% open is the example you will meet most, and Module 1 Section 1 listed
            position and motion among the quantities industry measures.
          </p>
          <p>
            <strong>Proximity detection</strong> is discrete: it reports whether something is
            present at a point. Inductive sensors detect metal, capacitive sensors detect a wider
            range of materials, and mechanical limit switches detect physical contact.
          </p>
          <p>
            The choice is the same one Module 1 Section 1 made about switches versus transmitters,
            in a different costume:
          </p>
          <ul>
            <li>
              If the question is genuinely binary — is the guard closed, has the part arrived, is
              the valve fully shut — a <strong>discrete device answers it directly</strong>, with
              fewer failure modes and no scaling to configure wrongly.
            </li>
            <li>
              If you need to know how far, or to watch something approach a limit rather than only
              learn that it arrived, you need <strong>continuous measurement</strong>.
            </li>
          </ul>
          <p>
            A valve is the case where both often appear together: a continuous position feedback for
            control, plus discrete limit switches proving fully-open and fully-closed for
            interlocks. Those serve different purposes and are not redundant.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Proximity sensing in practice — inductive, capacitive, and the limit switch"
          plainEnglish="Three ways of knowing something has arrived, each sensitive to different things and each failing differently."
          onSite="Inductive for metal, capacitive for almost anything, mechanical when you want certainty you can see. Match the sensor to what is actually approaching it."
        >
          <p>
            Proximity detection is the part of this module closest to work an electrician already
            does, and the three common devices are worth telling apart properly:
          </p>
          <ul>
            <li>
              <strong>Inductive.</strong> Generates a field and detects the change caused by metal
              entering it. Nothing touches, so there is nothing to wear, and it ignores dust, oil
              and water. It only sees metal — which is a feature when metal is what you want to
              detect and a limitation otherwise.
            </li>
            <li>
              <strong>Capacitive.</strong> Detects a change in capacitance, so it responds to a much
              wider range of materials including liquids, powders and plastics. That breadth is also
              its weakness: it will happily detect the build-up on its own face, or the wrong
              object, and it generally needs more careful setting.
            </li>
            <li>
              <strong>Mechanical limit switch.</strong> Physical contact operates a contact. Simple,
              visible, and unambiguous — and it wears, because something is being hit every cycle.
            </li>
          </ul>
          <p>
            Two practical points that connect to earlier modules. First, a proximity sensor is a{' '}
            <strong>discrete</strong> device, so it reaches a PLC through a digital input rather
            than an analogue one — Module 1 Section 1 made that distinction and this is where it
            becomes concrete.
          </p>
          <p>
            Second, and more important: <strong>ask what happens when it fails</strong>. A sensor
            that fails to detect a guard is in a different risk class from one that fails to detect
            a part. Where the answer matters for safety, the arrangement is usually chosen so that a
            failure or a broken wire produces the safe state rather than the permissive one — the
            same reasoning as the live-zero argument for 4&ndash;20 mA in Section 2.1.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Recalibrating a level transmitter to make the number match the tank"
          whatHappens="A DP level reading disagrees with a dip. The transmitter is re-ranged until the display matches. It agrees at that level and disagrees everywhere else, and the next time the product or the temperature changes it is wrong again — now with a calibration record saying it was adjusted."
          doInstead="Establish whether the disagreement is an instrument error or a density error first. An instrument error is present across the range and repeats on a bench check; a density error is proportional to level and moves with temperature or product. Re-ranging to force agreement at one point on a proportional error simply hides it, and destroys the evidence of what was actually wrong."
        />

        <CommonMistake
          title="Trusting a sightglass as the reference"
          whatHappens="A level instrument is judged against the sightglass, found to disagree, and adjusted to match. In fact the liquid in the glass is cooler and therefore denser than the liquid in the vessel, so the glass has been under-reading — and a correct instrument has just been adjusted to be wrong."
          doInstead="Treat a sightglass as an indication rather than a reference. It is a U-tube manometer, and it only agrees with the vessel while both columns are at the same density. Where a true reference is needed, use a dip or a method that does not depend on the fluid in the glass matching the fluid in the tank."
        />

        <FAQ
          items={[
            {
              question: 'Is DP level measurement obsolete then?',
              answer:
                'Not at all. Where the product and its temperature are stable it is robust, cheap, well understood and repairable — and density compensation exists for where they are not. The point is not that hydrostatic measurement is bad, but that its dependence on density must be a conscious decision rather than an unnoticed assumption.',
            },
            {
              question: 'What is a reference leg?',
              answer:
                'On a closed vessel, the low-pressure side of a DP level transmitter is connected to the vapour space so the measurement is not thrown off by vessel pressure. That connection is the reference leg, and whether it is kept dry or deliberately filled changes the calculation — which is why it is a specified design detail rather than a wiring choice.',
            },
            {
              question: 'Can ultrasonic level be used in any vessel?',
              answer:
                'It needs a clear path to the surface and a surface that reflects sound adequately. Heavy foam, vapour, internal obstructions and agitators all interfere, because the instrument reports the first strong reflection it receives — which may not be the product surface.',
            },
            {
              question: 'Why choose guided radar over free-space radar?',
              answer:
                'Guiding the pulse along a probe keeps the signal concentrated rather than radiating it into a vessel full of obstructions, and the reflection at a change of impedance means it can find a boundary within the liquid as well as the top surface. That makes it a genuine answer to interface measurement.',
            },
            {
              question: 'Does a float measure the same thing as a DP transmitter?',
              answer:
                'No, and the difference matters. A float rides on the surface, so it reports where the surface is regardless of density. A DP transmitter weighs the column. On a product whose density varies, those two instruments will legitimately disagree — and the float is the one telling you about height.',
            },
            {
              question: 'Where does an electrician meet proximity sensing first?',
              answer:
                'On machinery — guard interlocks, part-present detection, end-of-travel limits. It is the most familiar territory in this whole module, because a proximity switch behaves like a switch: a contact that opens or closes, wired into a control circuit or a PLC digital input.',
            },
          ]}
        />

        <ConceptBlock
          title="The pattern behind this whole module"
          plainEnglish="Every sensing method leans on some property of the thing it is measuring. Learn which one, and you know in advance what will make it lie."
          onSite="When a reading is wrong and nothing is broken, the question is which assumption has moved."
        >
          <p>
            It is worth stepping back, because the same shape has now appeared four times across
            this module and it is the most transferable idea in it.
          </p>
          <ul>
            <li>
              <strong>Section 2.2</strong> — an RTD reading depends on the alpha of the platinum and
              on the resistance of its own cable. Get either wrong and it reads confidently wrong.
            </li>
            <li>
              <strong>Section 2.3</strong> — a DP flow measurement depends on the square-root
              extraction happening exactly once, and on the impulse lines presenting the true
              pressures.
            </li>
            <li>
              <strong>Section 2.4</strong> — a hydrostatic level depends on density, a displacer on
              buoyancy and therefore density again, a capacitance probe on dielectric behaviour, and
              a time-of-flight instrument on having a clear view of a clean surface.
            </li>
          </ul>
          <p>
            In every case the instrument is doing exactly what it was built to do. What has changed
            is a condition the measurement quietly assumes. That is why so much of an instrument
            technician&rsquo;s work is not fault-finding in the electrical sense but{' '}
            <strong>working out which assumption stopped being true</strong>.
          </p>
          <p>
            Carry one habit into the rest of the course:{' '}
            <strong>
              for any instrument in front of you, name the property it depends on and the condition
              that would break it
            </strong>
            . Module 8 turns that habit into a diagnostic method; here it is enough to have noticed
            the pattern.
          </p>
        </ConceptBlock>

        <KeyTakeaways
          points={[
            'Most level measurements are inferred. A hydrostatic instrument weighs a column and converts that weight to a height using an assumed density.',
            'Water is near 1000 kg/m³ cold and around 580 kg/m³ at boiler temperatures — about a 42% change in the assumption the conversion rests on.',
            'A sightglass and its vessel form a U-tube manometer, so a cooler, denser column in the glass balances a taller one in the vessel and the glass under-reads.',
            'Many different liquid-liquid interface columns produce the same hydrostatic pressure, so a pressure reading cannot resolve an interface.',
            'Radar, guided radar and ultrasonic all time a reflection: flight time is proportional to distance, and density never enters the calculation.',
            'Guided radar reflects at a change of impedance, so it can find a boundary inside the liquid — which is what makes it suit interface duty.',
            'A float must be substantially less dense than the product and must not corrode or react with it. Both requirements fail slowly rather than obviously.',
            'Position measurement answers how far; proximity detection answers whether. On a valve you often want both, for different purposes.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 2.4" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Pressure and flow sensors
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Analogue and digital output
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule2Section4;
