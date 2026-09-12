/**
 * MOET · Module 5 · Section 1 · Subsection 4 — Flow and Level Measurement
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course did not enumerate a
 * Module 5 KSB list, so the statements below are reused verbatim from the
 * Module 1/3/4 lists it did supply, matched by topic.
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * No GS38, thermography ΔT, test-interval or C&G-qualification claims appear
 * on this page.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Flow and Level Measurement - MOET Module 5 Section 1.4';
const DESCRIPTION =
  'Comprehensive guide to flow and level measurement for maintenance technicians: orifice plates, electromagnetic flow meters, ultrasonic level sensors, float switches and hydrostatic level measurement. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'dp-flow-principle',
    question: 'An orifice plate flow meter works by measuring:',
    options: [
      'The temperature rise of the fluid as it passes through the restriction',
      'The differential pressure created as the fluid is forced through a restriction',
      'The electrical conductivity of the fluid as it crosses the plate',
      'The frequency of vortices shed downstream of the restriction',
    ],
    correctIndex: 1,
    explanation:
      "An orifice plate creates a restriction in the pipe. As fluid passes through the smaller opening, its velocity increases and its pressure decreases (Bernoulli's principle). A differential pressure transmitter measures the pressure drop across the plate. Flow rate is proportional to the square root of the differential pressure.",
  },
  {
    id: 'mag-flow-requirement',
    question: 'An electromagnetic flow meter requires the fluid to be:',
    options: [
      'Free of any suspended solids or particles',
      'Electrically conductive (minimum conductivity typically 5 microS/cm)',
      'Maintained at a constant, known temperature',
      'A clean, non-conductive hydrocarbon such as fuel oil',
    ],
    correctIndex: 1,
    explanation:
      "Electromagnetic flow meters operate on Faraday's law of electromagnetic induction — a conductor moving through a magnetic field generates a voltage. The conductive fluid is the conductor. The fluid must have a minimum electrical conductivity (typically 5 microS/cm) for the meter to work. This makes mag flow meters ideal for water, slurries and chemicals, but unsuitable for hydrocarbons and gases.",
  },
  {
    id: 'ultrasonic-level',
    question: 'An ultrasonic level sensor mounted at the top of a tank measures level by:',
    options: [
      'Measuring the time of flight for an ultrasonic pulse to travel to the liquid surface and back',
      'Detecting the change in capacitance between the sensor and the liquid surface',
      'Measuring the hydrostatic pressure of the vapour above the liquid',
      'Sensing the buoyancy force on a float suspended from the sensor head',
    ],
    correctIndex: 0,
    explanation:
      'The ultrasonic sensor emits a burst of high-frequency sound pulses downward toward the liquid surface. The pulses reflect from the surface and return to the sensor. The distance is calculated from d = (v x t) / 2, where v is the speed of sound in air and t is the round-trip time. Level = tank height minus distance to surface.',
  },
  {
    id: 'hydrostatic-level',
    question:
      'A submersible pressure transmitter measuring hydrostatic level uses the principle that:',
    options: [
      'Pressure at a point in a liquid is proportional to the depth of liquid above that point (P = rho x g x h)',
      'The speed of sound through a liquid is proportional to the depth of that liquid',
      'The electrical resistance of a liquid column falls as the depth of liquid increases',
      'The vapour pressure above a liquid rises in direct proportion to the liquid level',
    ],
    correctIndex: 0,
    explanation:
      'Hydrostatic pressure at any point in a liquid column equals the product of the liquid density (rho), gravitational acceleration (g) and the height of liquid above the measurement point (h). A submersible pressure transmitter at the bottom of the tank directly measures this pressure and converts it to a level reading. The density must be known and constant for accurate measurement.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The relationship between flow rate and differential pressure across an orifice plate is:',
    options: [
      'Linear — double the DP means double the flow',
      'Square root — flow is proportional to the square root of the DP',
      'Inverse — higher DP means lower flow',
      'Exponential — flow increases exponentially with DP',
    ],
    correctAnswer: 1,
    explanation:
      'Flow rate Q is proportional to the square root of the differential pressure: Q = k x sqrt(delta P). This means that to double the flow, the DP increases by a factor of four. The square root relationship must be applied either in the transmitter, PLC or DCS to convert the linear DP signal to a linear flow reading.',
  },
  {
    id: 2,
    question:
      'Which flow meter technology has no moving parts, creates no pressure drop, and can measure both conductive and non-conductive liquids?',
    options: [
      'Orifice plate differential pressure meter',
      'Electromagnetic (mag) flow meter',
      'Ultrasonic (clamp-on transit time) flow meter',
      'Turbine flow meter',
    ],
    correctAnswer: 2,
    explanation:
      'Clamp-on ultrasonic flow meters mount externally on the pipe — the transducers are clamped to the outside surface. They measure the difference in transit time of ultrasonic pulses travelling with and against the flow. There are no wetted parts, no pressure drop and no pipe cutting required. They work with conductive and non-conductive clean liquids.',
  },
  {
    id: 3,
    question: 'A Coriolis flow meter directly measures:',
    options: [
      'Volumetric flow rate by counting the rotations of an internal turbine',
      'The differential pressure drop across a fixed restriction in the tube',
      'The transit time of an ultrasonic pulse across the flowing fluid',
      'Mass flow rate (and density) — independent of temperature, pressure and fluid properties',
    ],
    correctAnswer: 3,
    explanation:
      "A Coriolis meter vibrates a tube at its resonant frequency. Fluid flowing through the vibrating tube creates a Coriolis force that twists the tube. The degree of twist is directly proportional to mass flow rate. The resonant frequency changes with fluid density. This provides a direct mass flow measurement independent of fluid properties — the 'gold standard' for custody transfer and batching.",
  },
  {
    id: 4,
    question: 'A variable area flow meter (rotameter) indicates flow by:',
    options: [
      'A float that rises in a tapered tube — the float position indicates the flow rate',
      'Measuring the differential pressure across an orifice plate',
      'Counting magnetic pulses generated by a spinning rotor',
      'Detecting the change in capacitance as the fluid passes the probe',
    ],
    correctAnswer: 0,
    explanation:
      'In a rotameter, fluid flows upward through a tapered (conical) glass or metal tube. A float is lifted by the fluid flow and settles at a position where the upward drag force balances the downward gravitational force. As flow increases, the float rises to a wider section of the tube. The flow rate is read from a scale on the tube at the top of the float.',
  },
  {
    id: 5,
    question:
      'For level measurement in an open-top atmospheric tank, which method is the simplest and most cost-effective?',
    options: [
      'Guided wave radar transmitter with an immersed probe',
      'Hydrostatic pressure transmitter mounted at the bottom of the tank',
      'Coriolis mass flow meter installed in the fill line',
      'Differential pressure transmitter with high and low pressure connections',
    ],
    correctAnswer: 1,
    explanation:
      'A hydrostatic pressure transmitter at the bottom of an open tank is the simplest continuous level measurement method. The pressure is directly proportional to the liquid height (P = rho x g x h). For open tanks, the reference side of the transmitter is vented to atmosphere. This is cost-effective, reliable and suitable for most clean liquid applications.',
  },
  {
    id: 6,
    question: 'A capacitance level probe in a tank measures level by detecting:',
    options: [
      'The time of flight of an ultrasonic pulse reflected from the surface',
      'The hydrostatic pressure exerted by the liquid column on the probe tip',
      'The change in capacitance between the probe and the tank wall as the dielectric (liquid) level changes',
      'The buoyancy force lifting a float attached to the probe',
    ],
    correctAnswer: 2,
    explanation:
      'A capacitance probe acts as one plate of a capacitor; the tank wall (or a reference rod) acts as the other plate. As the liquid level rises around the probe, the dielectric between the plates changes from air (dielectric constant approximately 1) to the liquid (dielectric constant much higher). This increases the capacitance proportionally with level.',
  },
  {
    id: 7,
    question: 'Float switches are commonly used for:',
    options: [
      'Continuous 4-20 mA level measurement across the full tank height',
      'Measuring the mass flow rate of liquid entering the tank',
      'Detecting the dielectric constant of the stored liquid',
      'Simple on/off level detection — high-level alarm, low-level alarm, pump control',
    ],
    correctAnswer: 3,
    explanation:
      'Float switches are simple, reliable devices for point-level detection. A buoyant float rises with the liquid level and operates a magnetic reed switch or micro-switch at a fixed point. They provide a discrete on/off output for alarms, pump start/stop and overflow protection. They are not suitable for continuous measurement.',
  },
  {
    id: 8,
    question: 'When installing an electromagnetic flow meter, it is essential that:',
    options: [
      'The meter is installed with a minimum of 5 pipe diameters of straight pipe upstream and 2 downstream to ensure a developed flow profile',
      'The pipe is only partially filled to allow the magnetic field to develop',
      'The fluid is non-conductive to avoid short-circuiting the electrodes',
      'The meter is mounted at the highest point of the pipework to vent air',
    ],
    correctAnswer: 0,
    explanation:
      'Electromagnetic flow meters require a fully developed, symmetric flow profile for accurate measurement. Upstream disturbances (bends, valves, reducers) create asymmetric flow. The general rule is 5D (five pipe diameters) of straight pipe upstream and 2D downstream, though some manufacturers specify 10D upstream for critical applications.',
  },
  {
    id: 9,
    question: 'Radar level measurement is preferred over ultrasonic in applications where:',
    options: [
      'The liquid is highly conductive and the tank is earthed',
      'There is heavy vapour, foam, high temperature or pressure above the liquid surface',
      'Only a simple on/off high-level alarm is required',
      'The lowest possible installed cost is the overriding priority',
    ],
    correctAnswer: 1,
    explanation:
      'Radar (microwave) level measurement is unaffected by temperature, pressure, vapour, dust and most foams because electromagnetic waves travel through these conditions with minimal attenuation. Ultrasonic sensors rely on sound waves which are significantly affected by temperature changes (speed of sound varies), heavy vapour and foam. Radar is the technology of choice for demanding process conditions.',
  },
  {
    id: 10,
    question: 'A turbine flow meter generates an output signal that is:',
    options: [
      'A 4-20 mA current proportional to the differential pressure across the rotor',
      'A voltage proportional to the conductivity of the passing fluid',
      'A frequency (pulse) signal where the pulse rate is proportional to the volumetric flow rate',
      'A resistance change proportional to the mass of fluid passing the sensor',
    ],
    correctAnswer: 2,
    explanation:
      'A turbine flow meter has a rotor that spins at a rate proportional to the fluid velocity. A magnetic or inductive pickup generates a pulse for each blade passing the sensor. The pulse frequency is directly proportional to the volumetric flow rate. A flow computer or PLC counter module converts the frequency to engineering units (litres per minute, cubic metres per hour).',
  },
  {
    id: 11,
    question:
      'In a closed (pressurised) vessel, level measurement using a DP transmitter requires:',
    options: [
      'A single connection at the top of the vessel, vented to atmosphere',
      'A non-conductive lining inside the vessel to prevent signal loss',
      'Five pipe diameters of straight run above the liquid surface',
      'Two pressure connections — one at the bottom (high side) and one at the top (low side) — to compensate for the vessel pressure above the liquid',
    ],
    correctAnswer: 3,
    explanation:
      "In a closed vessel, the gas space above the liquid is pressurised. A single bottom connection would measure total pressure (liquid head plus gas pressure). By connecting the 'high' side to the bottom and the 'low' side to the top of the vessel, the DP transmitter measures only the differential pressure due to the liquid column, which is proportional to level.",
  },
  {
    id: 12,
    question:
      'A maintenance technician notices a flow reading that is consistently 10 % lower than expected. The orifice plate has been in service for 3 years. The most likely cause is:',
    options: [
      'Erosion or wear of the orifice plate bore, which has increased the bore diameter and reduced the DP for a given flow',
      'The fluid conductivity has dropped below the meter minimum',
      'Foam on the liquid surface is absorbing the ultrasonic echo',
      'The straight pipe run upstream has become too long for the meter',
    ],
    correctAnswer: 0,
    explanation:
      'Orifice plates are subject to erosion, particularly with abrasive fluids, high velocities or two-phase flow. As the bore wears larger, the restriction is reduced, the DP decreases for a given flow rate, and the indicated flow reading drops below the actual flow. Regular inspection and replacement of orifice plates is essential for maintaining measurement accuracy.',
  },
];

const faqs = [
  {
    question: 'What is the most accurate flow measurement technology?',
    answer:
      'Coriolis flow meters offer the highest accuracy for liquid mass flow measurement — typically plus or minus 0.1 to 0.2 % of reading. They measure mass flow directly, independent of fluid properties, temperature and pressure. They are the standard for custody transfer (buying and selling liquids/gases by flow). However, they are the most expensive flow meter type and are limited in pipe size.',
  },
  {
    question: 'Can I measure flow without cutting the pipe?',
    answer:
      'Yes — clamp-on ultrasonic flow meters mount externally on the pipe surface and measure flow using transit-time or Doppler principles. They require no pipe cutting, no process shutdown and create no pressure drop. They are ideal for temporary measurement, commissioning checks, energy auditing and retrofit applications. Accuracy is typically plus or minus 1-3 % depending on pipe condition and fluid.',
  },
  {
    question: 'Why does my ultrasonic level sensor give erratic readings?',
    answer:
      "Common causes include: condensation or deposits on the transducer face; foam on the liquid surface absorbing the sound energy; turbulent liquid surface scattering the echo; temperature gradients in the head space affecting the speed of sound; structural echoes from tank internals (baffles, pipes, ladders); and the target being within the sensor's dead zone (minimum range).",
  },
  {
    question: 'What is the difference between a level switch and a level transmitter?',
    answer:
      'A level switch provides a simple on/off output at a fixed point — it tells you the level is above or below a threshold. A level transmitter provides a continuous output (4-20 mA) proportional to the actual level — it tells you the exact level at all times. Switches are used for alarms and simple pump control; transmitters are used for process control, inventory management and continuous monitoring.',
  },
  {
    question: 'How do I select the right flow meter for my application?',
    answer:
      "Key selection criteria include: fluid type (liquid, gas, steam, slurry), conductivity, viscosity, temperature and pressure, required accuracy, pipe size, allowable pressure drop, straight pipe availability, and whether volumetric or mass flow is needed. Consult the meter manufacturer's selection guide with full process data. Common choices: mag flow for conductive liquids, ultrasonic for clean liquids/gases, Coriolis for mass flow, vortex for steam.",
  },
];

const MOETModule5Section1_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.1 · Subsection 4"
        title="Flow and Level Measurement"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Flow meters, level sensors and industrial measurement techniques for process control —
            how each technology works, when it fits, and how it fails.
          </p>

          <TLDR
            points={[
              'DP flow: Orifice plate creates pressure drop — flow proportional to sqrt of DP.',
              "Mag flow: Faraday's law — conductive fluid through magnetic field generates voltage.",
              'Level: Hydrostatic pressure, ultrasonic time-of-flight, radar, capacitance, floats.',
              'Selection: Match technology to fluid, accuracy, pipe size and environment.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain differential pressure flow measurement using orifice plates and the square root relationship',
              'Describe electromagnetic, ultrasonic, Coriolis and turbine flow meter principles',
              'Identify hydrostatic, ultrasonic, radar and capacitance level measurement methods',
              'Distinguish between continuous level transmitters and point-level switches',
              'Select appropriate flow and level instruments for common industrial applications',
              'Apply maintenance and fault-finding procedures to flow and level instrumentation',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault-finding:</strong> Check impulse lines, verify 4-20 mA output, inspect
                orifice plates.
              </li>
              <li>
                <strong>Commissioning:</strong> Verify zero, span and scaling against process
                conditions.
              </li>
              <li>
                <strong>Replacement:</strong> Match meter type, size, materials, signal output and
                process rating.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to process measurement and instrumentation
                maintenance.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Differential pressure flow measurement</ContentEyebrow>

          <ConceptBlock title="The oldest, most widely installed flow technology">
            <p>
              Differential pressure (DP) flow measurement is the oldest and most widely installed
              flow measurement technology in industry. Despite the availability of more modern
              alternatives, DP flow meters remain dominant in process industries because of their
              simplicity, reliability, well-understood physics and the availability of international
              standards (BS EN ISO 5167) for their design and installation.
            </p>
            <p>
              The principle is straightforward: a restriction (primary element) is placed in the
              pipe. As fluid flows through the restriction, its velocity increases and its static
              pressure decreases according to Bernoulli&apos;s principle. A differential pressure
              transmitter measures the pressure drop across the restriction, and the flow rate is
              calculated from the square root relationship: Q = k x sqrt(delta P).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Primary elements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Orifice plate:</strong> A thin plate with a concentric hole — the most
                common type. Low cost, no moving parts, but creates permanent pressure loss. Beta
                ratio (bore/pipe diameter) typically 0.3-0.7.
              </li>
              <li>
                <strong>Venturi tube:</strong> A gradually converging section followed by a throat
                and a gradual diverging section. Lower permanent pressure loss than an orifice
                plate. Higher cost, larger physical size.
              </li>
              <li>
                <strong>Flow nozzle:</strong> A compromise between orifice plate and venturi —
                better pressure recovery than an orifice but smaller than a venturi. Used in steam
                flow measurement.
              </li>
              <li>
                <strong>Pitot tube:</strong> Measures the difference between total (stagnation)
                pressure and static pressure at a point in the flow. Used for air velocity
                measurement in ducts.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="The square root problem"
            whatHappens={
              <>
                Because flow is proportional to the square root of DP, the measurement accuracy
                deteriorates significantly at low flows. At 25 % flow, the DP is only 6.25 % of full
                scale, making the signal difficult to measure accurately. This limits the useful
                rangeability of DP flow meters to approximately 3:1 or 4:1 (compared with 10:1 or
                better for mag flow and Coriolis meters).
              </>
            }
            doInstead={
              <>
                Size the primary element for the expected flow range rather than the pipe size
                alone. Multivariable transmitters with advanced characterisation can improve the
                usable rangeability to some extent, but do not expect a DP meter to read accurately
                far below its designed span.
              </>
            }
          />

          <ConceptBlock title="Maintenance tip: impulse lines">
            <p>
              Impulse lines connecting the orifice plate tappings to the DP transmitter are a common
              source of measurement errors. Blocked impulse lines, leaking fittings, trapped air (in
              liquid service) or trapped condensate (in gas service) will all cause incorrect
              readings. Regular impulse line maintenance — blowing through, checking for leaks,
              verifying valve positions — is essential.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Electromagnetic and ultrasonic flow meters</ContentEyebrow>

          <ConceptBlock title="No moving parts, no pressure drop">
            <p>
              Modern flow measurement has moved increasingly toward technologies that offer wider
              rangeability, lower maintenance, no moving parts and no pressure drop. Electromagnetic
              and ultrasonic flow meters lead this trend and are now the preferred choice for new
              installations in water, wastewater, chemical processing and HVAC applications.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Electromagnetic (mag) flow meters">
            <p>
              Based on Faraday&apos;s law of electromagnetic induction: a voltage is induced in a
              conductor moving through a magnetic field. The conductive fluid is the conductor,
              electromagnetic coils generate the field, and electrodes in the pipe wall measure the
              induced voltage, which is proportional to the fluid velocity.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Requirements:</strong> Fluid must be electrically conductive (minimum
                approximately 5 microS/cm) — suitable for water, acids, alkalis, slurries.
              </li>
              <li>
                <strong>Not suitable for:</strong> Hydrocarbons, gases, deionised water, solvents
                (low conductivity).
              </li>
              <li>
                <strong>Advantages:</strong> No moving parts, no pressure drop, handles slurries and
                dirty fluids, wide rangeability (100:1), bidirectional.
              </li>
              <li>
                <strong>Pipe lining:</strong> The meter tube must have a non-conductive lining
                (PTFE, rubber, ceramic) to prevent the signal short-circuiting through the pipe
                wall.
              </li>
              <li>
                <strong>Installation:</strong> Must be full bore (pipe must be completely full of
                liquid) — not suitable for partially filled pipes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Ultrasonic flow meters">
            <p>
              Ultrasonic flow meters use sound waves to measure fluid velocity. Two main principles
              are used:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transit time:</strong> Two transducers send ultrasonic pulses diagonally
                across the pipe in both directions. The pulse travelling with the flow arrives
                faster than the one against the flow. The difference in transit times is
                proportional to the fluid velocity. Works with clean liquids and gases.
              </li>
              <li>
                <strong>Doppler:</strong> Ultrasonic pulses are reflected from particles or bubbles
                in the fluid. The frequency shift (Doppler effect) is proportional to velocity.
                Requires particles or bubbles in the fluid. Used for slurries and dirty fluids.
              </li>
              <li>
                <strong>Clamp-on:</strong> Transducers mount on the outside of the pipe — no pipe
                cutting, no wetted parts, no shutdown required. Ideal for retrofit and temporary
                measurement.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> When selecting between mag flow and ultrasonic, the fluid
              conductivity is the deciding factor. If the fluid is conductive (water, chemicals,
              slurries), mag flow is typically preferred for its accuracy and reliability. If the
              fluid is non-conductive (hydrocarbons, gases) or pipe cutting is not possible,
              ultrasonic is the better choice.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Level measurement — continuous methods</ContentEyebrow>

          <ConceptBlock title="A proportional output at all times">
            <p>
              Level measurement determines the quantity of material (liquid, solid or slurry) in a
              tank or vessel. Continuous level measurement provides a proportional output (4-20 mA)
              representing the actual level at all times, enabling process control, inventory
              management and safety monitoring. Several technologies are available, each suited to
              different applications and environments.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Hydrostatic pressure">
            <p>
              The simplest continuous level method for liquid-filled tanks. A pressure transmitter
              at the bottom of the tank measures the hydrostatic head: P = rho x g x h. For open
              tanks, the transmitter reference is vented to atmosphere. For closed (pressurised)
              vessels, a differential pressure transmitter is used with the high side at the bottom
              and the low side at the top of the vessel. Submersible pressure sensors can be lowered
              into deep tanks or wells.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Ultrasonic level">
            <p>
              A non-contact method using time-of-flight measurement. The sensor is mounted at the
              top of the tank and measures the distance to the liquid surface. Level = tank height
              minus distance. Suitable for liquids and solids. Affected by foam, heavy vapour,
              temperature gradients and turbulent surfaces. Cost-effective for many applications up
              to approximately 10 m range.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Radar (microwave) level">
            <p>
              Uses electromagnetic waves instead of sound waves. Unaffected by temperature,
              pressure, vapour, dust and most chemical atmospheres. Two variants: free-space radar
              (antenna transmits through the vapour space) and guided wave radar (GWR — the signal
              is guided along a probe immersed in the liquid). Guided wave radar can measure
              interface levels (e.g. oil on water) and is highly accurate in turbulent conditions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Capacitance level">
            <p>
              A probe and the tank wall form a capacitor. As the liquid (dielectric) rises around
              the probe, the capacitance changes proportionally. Suitable for conductive and
              non-conductive liquids, granular solids and powders. Requires calibration for the
              specific fluid dielectric constant. Insulated probes are used for conductive liquids.
            </p>
            <p>
              <strong>Maintenance tip:</strong> When a level transmitter reading disagrees with a
              sight glass or manual dip measurement, do not automatically assume the transmitter is
              wrong. Check the sight glass isolation valves, verify the specific gravity (density)
              used in the hydrostatic calculation, inspect for blockages in impulse lines, and
              verify the transmitter zero and span before condemning the instrument.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Point level detection</ContentEyebrow>

          <ConceptBlock title="Simpler, cheaper, often more reliable for alarms">
            <p>
              Point level switches provide simple on/off detection at a specific level — high alarm,
              low alarm, pump start, pump stop, or overfill protection. Unlike continuous
              transmitters, they do not indicate the actual level — only whether the material is
              above or below the switch point. They are simpler, cheaper and often more reliable for
              safety-critical alarm functions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common point level technologies">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Float switches:</strong> A buoyant float rises with the liquid and operates
                a reed switch or micro-switch. Simple, reliable, low cost. Affected by foam,
                turbulence and sticky materials.
              </li>
              <li>
                <strong>Vibrating fork (tuning fork):</strong> Two tines vibrate at their resonant
                frequency. When immersed in liquid, the frequency changes, triggering the output.
                Excellent for liquids, slurries and light powders. Self-cleaning due to vibration.
              </li>
              <li>
                <strong>Conductive (conductivity) probes:</strong> Two or more electrodes detect the
                presence of a conductive liquid (water-based). Simple and low cost. Not suitable for
                non-conductive liquids.
              </li>
              <li>
                <strong>Paddle (rotary) switches:</strong> A motor-driven paddle rotates slowly.
                When immersed in solid material (grain, powder), the paddle stalls and the torque
                increase triggers the switch. Used in silos and hoppers.
              </li>
              <li>
                <strong>Admittance (RF capacitance):</strong> Detects the presence of material by
                capacitance change. Handles coatings and build-up better than standard capacitance
                probes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Safety-critical level applications">
            <p>
              In applications where high level could cause a safety hazard (tank overfill, chemical
              spill, boiler overpressure), the level switch is part of a safety-instrumented system
              (SIS). Requirements include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Independent of the control system level transmitter (diversity).</li>
              <li>Self-monitoring or regularly proof-tested.</li>
              <li>Fail-safe design — output drops out on failure (de-energise to trip).</li>
              <li>SIL-rated to the required safety integrity level (IEC 61511).</li>
            </ul>
            <p className="italic">
              Under ST1426, maintenance technicians should understand the basic principles of flow
              and level measurement, be able to identify common instrument types installed on plant,
              carry out basic checks and calibration verification, and recognise when specialist
              instrumentation support is required.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=YG81w0HFXNc"

            title="Electronic Pressure Switches — How They Work"

            channel="The Engineering Mindset"

            duration="10:13"

            topic="Pressure sensing and switching in process plant"

            caption="Covers the sensing element and the switching logic together, which is how you meet them on a real skid."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DP flow via an orifice plate follows Q = k x sqrt(delta P) — halving accuracy at low flows limits rangeability to roughly 3:1 or 4:1 compared with 10:1+ for mag flow and Coriolis.',
              'Mag flow meters need a conductive fluid (minimum around 5 microS/cm), a non-conductive pipe lining, and a full bore — unsuitable for hydrocarbons or gases.',
              'Ultrasonic flow meters use transit time (clean fluids) or Doppler shift (fluids with particles/bubbles); clamp-on versions need no pipe cutting.',
              'A Coriolis meter measures mass flow and density directly, independent of fluid properties — the highest-accuracy technology, and the standard for custody transfer.',
              'Hydrostatic level (P = rho x g x h) is the simplest continuous method; closed vessels need a DP transmitter with high side at the bottom and low side at the top.',
              'Ultrasonic level is affected by foam, vapour and turbulence; radar (microwave) is largely immune to all three and is preferred in demanding process conditions.',
              'Point level switches (float, vibrating fork, conductive, paddle, admittance) give on/off detection only — never continuous measurement — and are simpler and often more reliable for alarms.',
              'A safety-critical level switch must be independent of the control-system transmitter, self-monitoring or proof-tested, fail-safe, and SIL-rated to IEC 61511.',
              'Impulse-line blockage, leaks and trapped air/condensate are the most common causes of DP flow and level measurement error — check them before condemning the transmitter.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section1-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Temperature and Pressure Sensors
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section1-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Signal Conditioning
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section1_4;
