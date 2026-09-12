/**
 * MOET · Module 5 · Section 4 · Subsection 4 — Control Valves and Actuators
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only statements that already appear verbatim in the brief's
 * verified lists for other modules — and that genuinely fit this page's
 * content — are used here.
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
 *              · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Control Valves and Actuators - MOET Module 5 Section 4.4';
const DESCRIPTION =
  'Comprehensive guide to control valve types, flow characteristics, actuator selection, fail-safe configurations and smart positioner diagnostics for electrical maintenance technicians under ST1426.';

const quickCheckQuestions = [
  {
    id: 'qc1',
    question: 'What is the primary function of a control valve?',
    options: [
      'To regulate the flow of fluid in response to a control signal',
      'To measure the flow rate of fluid passing through a pipeline',
      'To filter contaminants out of the process fluid',
      'To boost the pressure of the fluid in the system',
    ],
    correctIndex: 0,
    explanation:
      'A control valve is the final control element that physically adjusts fluid flow in the pipeline in response to the controller output signal.',
  },
  {
    id: 'qc2',
    question: "What does 'fail-safe' mean for a control valve actuator?",
    options: [
      'The valve locks in its last position when the signal is lost',
      'The valve moves to a predetermined safe position on loss of signal or power',
      'The valve sounds an alarm but does not change position on failure',
      'The valve continues to modulate using a backup battery supply',
    ],
    correctIndex: 1,
    explanation:
      'Fail-safe means the actuator drives the valve to a defined safe position (fully open or fully closed) when the control signal or power supply is lost.',
  },
  {
    id: 'qc3',
    question: 'What is the standard pneumatic control signal range?',
    options: ['0-10 V DC', '0-5 V DC', '3-15 psi (0.2-1.0 bar)', '4-20 mA'],
    correctIndex: 2,
    explanation:
      'The traditional pneumatic control signal is 3-15 psi (0.2-1.0 bar), where 3 psi represents 0% and 15 psi represents 100% of the valve travel.',
  },
  {
    id: 'qc4',
    question: 'What does Cv (or Kv) represent for a control valve?',
    options: [
      'The maximum pressure the valve body can safely withstand',
      'The closing speed of the valve when the actuator fails',
      'The temperature rating of the valve seat material',
      'The flow coefficient -- the volume of water that will flow through the valve at a given pressure drop',
    ],
    correctIndex: 3,
    explanation:
      'Cv is the flow coefficient representing the number of US gallons per minute of water at 60 degrees F that flows through the valve with a 1 psi pressure drop. Kv is the metric equivalent.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which type of control valve body is best suited for throttling applications?',
    options: ['Ball valve', 'Globe valve', 'Butterfly valve', 'Gate valve'],
    correctAnswer: 1,
    explanation:
      'Globe valves provide excellent throttling characteristics with a linear relationship between stem position and flow, and are the most common choice for modulating control.',
  },
  {
    id: 2,
    question: 'What is the characteristic curve of a valve?',
    options: [
      'The relationship between the inlet and outlet pressures across the valve',
      'The maximum flow rate the valve can pass when fully open',
      'The relationship between valve stem position (travel) and flow rate',
      'The time the actuator takes to drive the valve from open to closed',
    ],
    correctAnswer: 2,
    explanation:
      'The characteristic curve (inherent flow characteristic) describes how the flow through the valve changes as the stem moves from closed to fully open.',
  },
  {
    id: 3,
    question: 'An equal-percentage valve characteristic means:',
    options: [
      'Equal increments of stem travel produce equal increments of flow',
      'The valve passes the same percentage of flow whether open or closed',
      'Both halves of the valve travel deliver exactly 50% of the flow each',
      'Equal increments of stem travel produce equal percentage changes in flow',
    ],
    correctAnswer: 3,
    explanation:
      'With an equal-percentage characteristic, each unit of stem travel produces the same percentage change in flow relative to the current flow rate, giving a logarithmic curve.',
  },
  {
    id: 4,
    question: 'What type of actuator uses instrument air to position the valve?',
    options: [
      'Pneumatic diaphragm actuator',
      'Hydraulic actuator',
      'Electric actuator',
      'Manual handwheel',
    ],
    correctAnswer: 0,
    explanation:
      'Pneumatic diaphragm actuators use compressed instrument air (typically 3-15 psi or 0.2-1.0 bar) acting on a flexible diaphragm to position the valve stem.',
  },
  {
    id: 5,
    question: 'What is a positioner on a control valve?',
    options: [
      'A mechanical stop that limits the maximum travel of the valve stem',
      'A device that compares the control signal with the actual valve position and adjusts the actuator output accordingly',
      'A spring that returns the valve to its fail-safe position on loss of power',
      'A sensor that measures the flow rate passing through the valve body',
    ],
    correctAnswer: 1,
    explanation:
      'A positioner is a feedback device mounted on the valve that ensures the actual stem position matches the demanded position from the controller, overcoming friction and process forces.',
  },
  {
    id: 6,
    question: 'What is cavitation in a control valve?',
    options: [
      'Gradual erosion of the valve seat caused by abrasive particles in the fluid',
      'A build-up of scale and deposits that restricts flow through the valve',
      'Formation and collapse of vapour bubbles due to pressure dropping below vapour pressure, causing damage',
      'Excessive vibration of the valve stem caused by high upstream pressure',
    ],
    correctAnswer: 2,
    explanation:
      "Cavitation occurs when the local pressure drops below the fluid's vapour pressure (forming bubbles) and then recovers above it (bubbles collapse violently), causing erosion damage to valve internals.",
  },
  {
    id: 7,
    question: 'A fail-closed valve with a pneumatic actuator would use:',
    options: [
      'Manual override only',
      'Air-to-close (spring-to-open) configuration',
      'Double-acting cylinder with no spring',
      'Air-to-open (spring-to-close) configuration',
    ],
    correctAnswer: 3,
    explanation:
      'For fail-closed operation, the spring pushes the valve closed and air pressure opens it. On loss of air, the spring returns the valve to the closed (safe) position.',
  },
  {
    id: 8,
    question:
      'What advantage does a smart valve positioner provide over a conventional positioner?',
    options: [
      'Digital communication, diagnostics, auto-calibration, and valve performance monitoring',
      'It removes the need for any instrument air supply to the actuator',
      'It allows the valve to operate without an actuator fitted',
      'It eliminates the need to size the valve correctly for the duty',
    ],
    correctAnswer: 0,
    explanation:
      'Smart positioners use digital technology (HART, Foundation Fieldbus, Profibus PA) to provide auto-calibration, diagnostic data, partial stroke testing, and remote configuration capabilities.',
  },
  {
    id: 9,
    question: 'When would you select a butterfly valve for control applications?',
    options: [
      'High-pressure steam service requiring precise throttling near the seat',
      'Large-diameter, low-pressure applications where cost and weight are important',
      'Applications demanding the widest possible rangeability and tight shut-off',
      'Small-bore dosing lines where very fine flow control is essential',
    ],
    correctAnswer: 1,
    explanation:
      'Butterfly valves are compact, lightweight, and cost-effective for large-diameter pipes. They are suitable for low to moderate pressure applications but have limited throttling range compared to globe valves.',
  },
  {
    id: 10,
    question: 'What happens if a control valve is significantly oversized for the application?',
    options: [
      'It operates near its fully open position with smooth, accurate control',
      'It automatically restricts the flow to match the design rate',
      'It operates near its closed position where control is poor and wear increases',
      'It improves rangeability and reduces wear on the seat and plug',
    ],
    correctAnswer: 2,
    explanation:
      'An oversized valve operates near its closed position where small changes in stem position cause large flow changes. This makes precise control difficult, increases wear on the seat and plug, and reduces the effective rangeability of the loop.',
  },
  {
    id: 11,
    question: 'What is partial stroke testing (PST) used for?',
    options: [
      'Calibrating the positioner so the valve travels its full range accurately',
      'Measuring the flow coefficient (Cv) of the valve while in service',
      'Setting the fail-safe position the valve adopts on loss of signal',
      'Verifying that a safety shut-off valve is not stuck by partially moving it during operation',
    ],
    correctAnswer: 3,
    explanation:
      'PST is a diagnostic technique for safety shut-off valves where the valve is partially moved (typically 10-20% of travel) during operation to verify it is not stuck. The smart positioner monitors the response and reports pass/fail.',
  },
  {
    id: 12,
    question: 'Which standard covers control valve sizing calculations?',
    options: [
      'ISA-75.01 / IEC 60534-2-1',
      'BS 7671 / IET Wiring Regulations',
      'ISO 9001 / Quality Management',
      'IEC 61131 / PLC Programming Languages',
    ],
    correctAnswer: 0,
    explanation:
      'ISA-75.01 and IEC 60534-2-1 are the industry standards for control valve sizing calculations, covering flow equations for incompressible and compressible fluids.',
  },
];

const faqs = [
  {
    question: 'How do I select the correct control valve size?',
    answer:
      'Valve sizing involves calculating the required Cv based on the design flow rate, fluid properties (density, viscosity, vapour pressure), upstream and downstream pressures, and allowable pressure drop. Manufacturers provide sizing software, or the ISA/IEC equations can be used manually. The valve should be sized to operate typically between 20-80% open at the design flow rate.',
  },
  {
    question: 'What is the difference between a pneumatic and electric actuator?',
    answer:
      'Pneumatic actuators use compressed air and provide fast response, inherent fail-safe action (via spring return), and are suitable for hazardous areas. Electric actuators use a motor and gearbox, offer precise positioning without an air supply, but require additional measures for fail-safe action (battery backup, spring return module). Electric actuators are typically used for on/off or slow-modulating applications.',
  },
  {
    question: 'What is partial stroke testing (PST)?',
    answer:
      'PST is a diagnostic technique for safety shut-off valves where the valve is partially moved (typically 10-20% of travel) during operation to verify it is not stuck. The smart positioner monitors the valve response and reports pass/fail. This increases confidence in valve availability without fully shutting down the process.',
  },
  {
    question: 'Why do control valves need regular maintenance?',
    answer:
      'Control valves are subject to wear from fluid erosion, cavitation, corrosion, packing friction, and seat damage. Regular maintenance includes checking for leakage, inspecting packing and seats, verifying actuator operation, calibrating the positioner, and testing fail-safe action. Predictive maintenance using smart positioner diagnostics can optimise maintenance scheduling.',
  },
  {
    question: 'What causes a control valve to stick or become sluggish?',
    answer:
      'Common causes include excessive packing friction (over-tightened or deteriorated packing), corrosion or scale buildup on the stem, process deposits on internal components, insufficient actuator force (low air supply pressure), and damaged or worn guide bushings. Smart positioners can detect increasing friction trends before the valve fails to respond.',
  },
];

const MOETModule5Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.4 · Subsection 4"
        title="Control Valves and Actuators"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Valve types, flow characteristics, actuator selection and smart positioner diagnostics.
          </p>

          <TLDR
            points={[
              'Globe valves: best for modulating/throttling -- linear stem-to-flow.',
              'Cv/Kv: flow coefficient used for sizing -- operate 20-80% open.',
              'Pneumatic actuators: spring-return provides fail-safe action.',
              'Smart positioners: auto-calibration, diagnostics and predictive maintenance.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the main types of control valves and their applications',
              'Explain valve flow characteristics: linear, equal-percentage, and quick-opening',
              'Describe pneumatic, electric, and hydraulic actuator types and their fail-safe modes',
              'Explain the role of valve positioners and smart positioner diagnostics',
              'Understand the Cv/Kv flow coefficient and its use in valve sizing',
              'Recognise common valve problems including cavitation, flashing, and seat leakage',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fail-safe selection:</strong> determined by process safety requirements.
              </li>
              <li>
                <strong>Cavitation:</strong> pressure drops below vapour pressure -- causes erosion
                damage.
              </li>
              <li>
                <strong>Positioner calibration:</strong> ensures accurate stem positioning.
              </li>
              <li>
                <strong>ISA-75.01 / IEC 60534:</strong> control valve sizing standards.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Control valve types</ContentEyebrow>

          <ConceptBlock
            title="Control valve types"
            onSite="Globe valves are the default choice for modulating control because of their excellent throttling capability, good rangeability, and predictable flow characteristics."
          >
            <p>
              The control valve is the <strong>final control element</strong> in a process control
              loop -- the device that physically adjusts the process variable by regulating fluid
              flow. The valve body design determines its suitability for different applications
              based on factors including flow characteristic, rangeability, pressure rating, and
              shut-off capability.
            </p>
            <p>
              <strong>Globe valves</strong> are the most common for modulating (throttling) control.
              The plug moves linearly through the seat, providing precise flow regulation. Available
              in single-seat (tight shut-off, limited pressure), double-seat (higher pressure, less
              tight shut-off), and cage-guided (reduced noise/cavitation) configurations. They offer
              excellent control authority across the full range of stem travel.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common control valve types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Valve type</th>
                    <th className="py-2 pr-4 font-medium text-white">Best application</th>
                    <th className="py-2 font-medium text-white">Key characteristics</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Globe valve</td>
                    <td className="py-2 pr-4">Precise throttling/modulating control</td>
                    <td className="py-2">Linear stem-to-flow, excellent rangeability</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Ball valve</td>
                    <td className="py-2 pr-4">On/off and moderate throttling</td>
                    <td className="py-2">V-notch or segmented designs for control</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Butterfly valve</td>
                    <td className="py-2 pr-4">Large diameter, low-pressure</td>
                    <td className="py-2">Compact, lightweight, cost-effective</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Diaphragm valve</td>
                    <td className="py-2 pr-4">Corrosive, viscous, or slurry fluids</td>
                    <td className="py-2">Fluid does not contact moving parts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Ball, butterfly and diaphragm valves">
            <p>
              <strong>Ball valves</strong> use a rotating ball with a bore. Full-bore designs
              minimise pressure drop; V-notch or segmented ball designs provide better throttling
              characteristics. <strong>Butterfly valves</strong> use a disc rotating on a central
              shaft -- compact, lightweight, and cost-effective for large pipe sizes.
              High-performance butterfly valves with offset discs provide better throttling and
              sealing.
            </p>
            <p>
              <strong>Diaphragm valves</strong> use a flexible membrane pressed against a weir to
              control flow -- ideal for corrosive, viscous, or slurry applications where the fluid
              must not contact moving parts. Each valve type has specific advantages, and selecting
              the correct type is critical for reliable control performance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Flow characteristics and valve sizing</ContentEyebrow>

          <ConceptBlock title="Flow characteristics and valve sizing">
            <p>
              The <strong>inherent flow characteristic</strong> describes the relationship between
              valve stem position and flow rate at a constant pressure drop. Understanding these
              characteristics is essential for selecting the correct valve for each application and
              for predicting how the control loop will behave.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Linear characteristic">
            <p>
              Equal increments of stem travel produce equal changes in flow. The graph is a straight
              line. Used where the system pressure drop is relatively constant across the operating
              range.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Equal-percentage characteristic">
            <p>
              Equal increments of stem travel produce equal percentage changes in the existing flow,
              giving a logarithmic curve. The most common choice for process control because it
              compensates for varying system pressure drops.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Quick-opening characteristic">
            <p>
              Large flow increase with small initial travel, levelling off at higher openings. Used
              for on/off applications and safety relief, not for modulating control.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The Cv flow coefficient"
            onSite="If a control valve is constantly operating below 20% or above 80% open, it is likely incorrectly sized. This should be flagged for review as it leads to poor control, increased wear, and potential process issues."
          >
            <p>
              The <strong>Cv (flow coefficient)</strong> is the fundamental sizing parameter. It
              represents the number of US gallons per minute of water at 60 degrees F that passes
              through the fully-open valve with a pressure drop of 1 psi. The metric equivalent{' '}
              <strong>Kv</strong> uses cubic metres per hour with a 1 bar pressure drop.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Valve sizing accounts for fluid properties (density, viscosity, vapour pressure).
              </li>
              <li>Upstream and downstream pressures determine the available pressure drop.</li>
              <li>Oversized valves operate near the closed position where control is poor.</li>
              <li>Undersized valves cannot deliver the required maximum flow.</li>
              <li>Design target: operate between 20-80% open at the design flow rate.</li>
            </ul>
            <p>
              Valve sizing calculations use the ISA-75.01 (IEC 60534-2-1) equations. These account
              for pipe size, required flow range, and the specific characteristics of the fluid.
              Manufacturers provide sizing software that simplifies these calculations, but
              understanding the underlying principles is essential for maintenance technicians who
              need to verify that installed valves are correctly sized.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Actuators and fail-safe action</ContentEyebrow>

          <ConceptBlock
            title="Actuators and fail-safe action"
            onSite="Maintenance technicians must understand actuator types and fail-safe configurations to correctly verify valve operation during functional testing and to diagnose actuator faults."
          >
            <p>
              The actuator is the mechanism that converts the control signal into physical valve
              movement. The choice of actuator type depends on the required force, speed, fail-safe
              action, and the availability of utilities (compressed air, electrical power, hydraulic
              supply).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Pneumatic diaphragm actuators">
            <p>
              The most common in process industries. Instrument air (3-15 psi / 0.2-1.0 bar, or 6-30
              psi for larger valves) acts on a flexible diaphragm opposed by a spring. The spring
              provides inherent fail-safe action without any additional mechanism.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air-to-open (fail-closed):</strong> air pressure opens the valve; spring
                closes it on air failure.
              </li>
              <li>
                <strong>Air-to-close (fail-open):</strong> air pressure closes the valve; spring
                opens it on air failure.
              </li>
              <li>Fast response, simple construction, suitable for hazardous areas.</li>
              <li>Fail-safe direction determined by process safety requirements.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Pneumatic piston actuators">
            <p>
              Provide higher thrust than diaphragm types for large or high-pressure valves. They can
              be single-acting (with spring return for fail-safe) or double-acting (requiring a
              separate fail-safe mechanism such as a stored-energy accumulator). Used where
              diaphragm actuators cannot generate sufficient force.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Electric and hydraulic actuators">
            <p>
              <strong>Electric actuators</strong> use a motor and gearbox, offer precise positioning
              without an air supply, but require additional measures for fail-safe action (battery
              backup, spring return module). <strong>Hydraulic actuators</strong> provide very high
              forces for large valves and high-pressure applications.{' '}
              <strong>Electro-hydraulic actuators</strong> combine an electric motor-driven
              hydraulic pump with a cylinder, providing self-contained high-force actuation.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Fail-safe selection is critical"
            whatHappens={
              <p>
                The fail-safe direction must be determined by a process hazard analysis. A cooling
                water valve should fail-open to maintain cooling on loss of instrument air. A fuel
                gas valve should fail-closed to prevent uncontrolled fuel flow. Getting this wrong
                can have serious safety consequences.
              </p>
            }
            doInstead={
              <p>
                Always verify the fail-safe action during commissioning and after any maintenance on
                the actuator.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Positioners and smart diagnostics</ContentEyebrow>

          <ConceptBlock title="Positioners and smart diagnostics">
            <p>
              A <strong>valve positioner</strong> is a feedback device that compares the control
              signal with the actual valve stem position and adjusts the actuator pressure to
              correct any error. Without a positioner, friction (packing, guides), process forces
              (pressure differential across the plug), and hysteresis cause the valve to deviate
              from the demanded position. Positioners are essential for accurate control in
              modulating applications.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Smart (digital) positioner capabilities"
            onSite="When commissioning a control valve with a smart positioner, always run the auto-calibration routine and record a baseline valve signature. This provides the reference against which future diagnostic data can be compared to detect degradation."
          >
            <p>
              Smart positioners incorporate microprocessor-based control with digital communication
              protocols (HART, Foundation Fieldbus, Profibus PA). They provide capabilities far
              beyond simple position control:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Auto-calibration:</strong> automatic zero and span adjustment, reducing
                commissioning time.
              </li>
              <li>
                <strong>Step response testing:</strong> measures valve response to step changes,
                identifying friction and dead band.
              </li>
              <li>
                <strong>Signature analysis:</strong> records the valve&apos;s position/pressure
                response to detect developing problems.
              </li>
              <li>
                <strong>Partial stroke testing:</strong> verifies safety shut-off valves are not
                stuck without full closure.
              </li>
              <li>
                <strong>Predictive diagnostics:</strong> trends friction, seat leakage, travel
                deviation over time.
              </li>
            </ul>
            <p>
              Diagnostic data from smart positioners enables <strong>predictive maintenance</strong>{' '}
              -- identifying problems such as increasing packing friction, worn seats, or sticking
              before they cause process upsets or unplanned shutdowns. Integration with asset
              management systems (Emerson AMS, Siemens PDM, FieldCare) allows centralised monitoring
              of all control valves in the plant.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key diagnostic parameters">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Parameter</th>
                    <th className="py-2 font-medium text-white">What it reveals</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Friction trend</td>
                    <td className="py-2">Packing condition, guide wear, stem corrosion</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Actuator pressure profile</td>
                    <td className="py-2">Diaphragm/spring condition, air supply issues</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Travel deviation</td>
                    <td className="py-2">Positioner calibration drift, linkage wear</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Cycle count</td>
                    <td className="py-2">Valve utilisation for maintenance planning</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Common valve problems and maintenance</ContentEyebrow>

          <ConceptBlock
            title="Common valve problems and maintenance"
            onSite="Control valves are critical components in process control loops. Understanding valve types, actuator configurations, and diagnostic techniques covered here provides the foundation for effective maintenance of final control elements as required by ST1426."
          >
            <p>
              Control valves operate in demanding conditions and are subject to a range of problems
              that affect control performance and process efficiency. As a maintenance technician,
              recognising the symptoms of these problems and understanding their causes is essential
              for effective fault diagnosis and repair.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common control valve problems">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cavitation:</strong> pressure drops below vapour pressure forming bubbles
                that collapse violently, causing severe erosion of valve internals. Symptoms include
                distinctive crackling noise, vibration, and visible damage to the plug and seat.
              </li>
              <li>
                <strong>Flashing:</strong> similar to cavitation, but pressure does not recover
                above vapour pressure downstream. The fluid remains partially vapour, causing
                erosion and flow choking. Anti-cavitation trim cannot prevent flashing.
              </li>
              <li>
                <strong>Seat leakage:</strong> the valve does not shut off completely, allowing flow
                past the seat when closed. Caused by erosion, corrosion, foreign material trapped in
                the seat, or mechanical damage.
              </li>
              <li>
                <strong>Stem packing leakage:</strong> process fluid leaks past the valve stem
                packing. Caused by packing wear, under-tightening, thermal cycling, or chemical
                attack. A potential environmental and safety issue.
              </li>
              <li>
                <strong>Stiction (stick-slip):</strong> the valve sticks and then jumps when
                friction is overcome. Causes jerky control action and poor control performance.
                Often caused by over-tightened packing or corrosion.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Preventive maintenance tasks">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Check for external leakage (packing, body joints, actuator).</li>
              <li>Verify actuator air supply pressure and regulator operation.</li>
              <li>Stroke the valve through full range and check for smooth travel.</li>
              <li>Test fail-safe action by removing signal or air supply.</li>
              <li>Calibrate the positioner and check for travel deviation.</li>
              <li>Review smart positioner diagnostic data for developing trends.</li>
              <li>Check handwheel operation (if fitted) and ensure it is disengaged.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Valve types: globe -- best for modulating/throttling control; ball -- on/off and moderate throttling (V-notch); butterfly -- large diameter, low-pressure, compact; diaphragm -- corrosive, slurry applications.',
              'Cv -- flow coefficient (US gal/min at 1 psi drop); Kv -- metric equivalent (m3/h at 1 bar drop).',
              '3-15 psi (0.2-1.0 bar) is the pneumatic signal standard.',
              'ISA-75.01 / IEC 60534 are the valve sizing standards.',
              'A positioner ensures the stem matches the control signal.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Pneumatic and Hydraulic Controls
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Distributed Control Systems
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section4_4;
