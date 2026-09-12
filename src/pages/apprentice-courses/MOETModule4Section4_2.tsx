/**
 * MOET · Module 4 · Section 4 · Subsection 2 — Component Removal and
 * Replacement
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Electrical. Electrical plant, equipment, and systems
 *                 maintenance requirements: removing and replacing parts,
 *                 inspecting, testing, setting up, adjusting, cleaning, and
 *                 functional testing."
 *              · "Electrical. Common electrical plant, equipment, and systems
 *                 failure modes."
 *              · "Equipment life cycle considerations."
 *   Skills     · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
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
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Component Removal and Replacement - MOET Module 4.4.2';
const DESCRIPTION =
  'Detailed guide to component removal and replacement for electrical maintenance: contactor, MCB/MCCB, motor bearing, relay, and drive replacement, like-for-like principles, upgrade considerations and de-rating factors under BS 7671 and ST1426.';

const quickCheckQuestions = [
  {
    id: 'like-for-like',
    question:
      "What does the 'like-for-like' principle mean when replacing an electrical component?",
    options: [
      "The replacement matches the original's electrical ratings, dimensions and function",
      'The replacement must come from the same manufacturer as the original component',
      'The replacement must always be rated higher than the original for added safety',
      'The replacement must be the cheapest functionally equivalent part held in stock',
    ],
    correctIndex: 0,
    explanation:
      'Like-for-like replacement means the new component must match the original in all critical parameters: voltage rating, current rating, breaking capacity, operational characteristics (e.g., trip curve for MCBs), physical dimensions, mounting arrangement and functional specification. The brand may differ provided all technical parameters are equivalent or superior; it need not be the same manufacturer, the cheapest, or a higher rating.',
  },
  {
    id: 'contactor-replacement',
    question:
      'When replacing a contactor, which parameter is critical to check in addition to the voltage and current ratings?',
    options: [
      'The colour and surface finish of the contactor housing moulding',
      'The serial number printed on the side of the old contactor',
      'The country of origin where the contactor was manufactured',
      'The coil voltage and the AC utilisation category (e.g., AC-3)',
    ],
    correctIndex: 3,
    explanation:
      "The coil voltage must match the control circuit voltage (e.g., 24 V DC, 110 V AC, 230 V AC). The AC utilisation category (AC-1 for resistive loads, AC-3 for motor starting, AC-4 for plugging/inching) determines the contactor's ability to make and break the specific type of load current. An AC-1 rated contactor used on an AC-3 duty will fail prematurely due to the higher inrush and breaking currents involved in motor starting.",
  },
  {
    id: 'mcb-breaking',
    question:
      'Why is the breaking capacity (kA rating) of an MCB critical when selecting a replacement?',
    options: [
      'It determines how many circuits the MCB can supply at once',
      'It determines the maximum fault current the MCB can safely interrupt without damage or danger',
      'It determines the maximum ambient temperature the MCB can tolerate',
      'It determines the minimum cable size that can be connected to the MCB',
    ],
    correctIndex: 1,
    explanation:
      "The breaking capacity (rated short-circuit capacity, Icn) is the maximum prospective fault current the MCB can safely interrupt. If the fault current exceeds the MCB's breaking capacity, the device may fail to interrupt the fault, resulting in an explosion, fire or sustained arcing. BS 7671 Regulation 432.1 requires that the rated short-circuit capacity of protective devices is not less than the prospective fault current at the point of installation.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Before removing a contactor from a motor control centre, the first step should be:',
    options: [
      'Photograph and label all of the connections to the contactor',
      'Carry out safe isolation, proving dead at the point of work',
      'Loosen the line and load terminals to release the conductors',
      'Order a like-for-like replacement contactor from the stores',
    ],
    correctAnswer: 1,
    explanation:
      'Safe isolation must always be the first step before any component removal. The circuit must be isolated, locked off, and proved dead at the point of work using the prove-test-prove procedure before any physical work begins. Photographing and labelling connections and removing conductors are valid steps, but only after the circuit is proved dead.',
  },
  {
    id: 2,
    question:
      'When replacing an MCB, which of the following must match the original specification?',
    options: [
      'Only the current rating, provided the physical size is broadly similar',
      'Only the breaking capacity, since the trip curve is not safety-critical',
      'Current rating, trip curve, breaking capacity, poles and board compatibility',
      'Only the number of poles and the colour of the operating toggle switch',
    ],
    correctAnswer: 2,
    explanation:
      'All critical parameters must match: current rating (In), trip curve (B for general, C for motor/transformer inrush, D for high inrush), breaking capacity (kA), number of poles, and physical compatibility with the distribution board busbar system. The MCB must also be from a manufacturer approved for use with that specific board — mixing brands can compromise safety.',
  },
  {
    id: 3,
    question: 'Motor bearings typically need replacement when they exhibit:',
    options: [
      'A slight discolouration of the grease with no other change in behaviour',
      'A small reduction in motor running current below the rated full-load value',
      'An increase in the insulation resistance of the motor stator windings',
      "Excessive noise, vibration, heat, or play beyond the maker's tolerances",
    ],
    correctAnswer: 3,
    explanation:
      'Bearing failure symptoms include excessive noise (rumbling, grinding, squealing), increased vibration (detectable by vibration analysis), elevated bearing temperature, visible play when the shaft is moved by hand, and grease leakage or contamination. Bearing replacement is based on condition monitoring data, not arbitrary time intervals.',
  },
  {
    id: 4,
    question:
      'When replacing a protection relay (e.g., an overcurrent relay), what must be verified after installation?',
    options: [
      'That the settings match the coordination study, confirmed by secondary injection',
      'That the relay coil is warm to the touch a few minutes after energising',
      'That the relay casing is the same colour and style as the one it replaced',
      'That the relay has a higher current rating than the original for more margin',
    ],
    correctAnswer: 0,
    explanation:
      'Protection relay replacement requires verification that the relay type, CT ratio settings, pickup values, time multiplier settings and curve characteristics match the protection coordination study for the circuit. A secondary injection test must be performed to confirm the relay trips at the correct current and time values. Incorrect relay settings can result in nuisance tripping or, more dangerously, failure to trip during a fault.',
  },
  {
    id: 5,
    question: "What is 'de-rating' in the context of component replacement?",
    options: [
      'Increasing a component rating to provide a larger safety margin in service',
      'Reducing the usable rating for ambient, altitude or enclosure heat effects',
      'Removing a component from service because it has reached its end of life',
      'Recalibrating a protection relay back to its original factory default settings',
    ],
    correctAnswer: 1,
    explanation:
      "De-rating is the reduction in a component's effective capacity due to environmental conditions. For example, an MCB rated at 32 A in free air at 30°C may need to be de-rated to 28 A when installed in a fully populated distribution board at 40°C ambient. Manufacturers provide de-rating factors for temperature, altitude (above 2000 m), grouping, and enclosure type. Failing to account for de-rating can lead to premature failure or overheating.",
  },
  {
    id: 6,
    question:
      'When replacing a variable speed drive (VSD), which additional consideration applies compared to replacing a simple contactor?',
    options: [
      'A contactor needs far more frequent lubrication than a drive does',
      'A drive can be fitted live, whereas a contactor must be isolated',
      'The drive parameters must be programmed to match the application',
      'A drive does not require safe isolation before it is removed',
    ],
    correctAnswer: 2,
    explanation:
      'Variable speed drives require extensive parameter configuration including motor nameplate data (voltage, current, frequency, power, speed, cos phi), ramp up/down times, speed limits, current limits, braking configuration, I/O assignments, communication settings, and application-specific parameters. These should be documented before the old drive is removed and programmed into the replacement. Many drives allow parameter upload/download via software or a parameter copy module.',
  },
  {
    id: 7,
    question:
      'What precaution should be taken when labelling connections before removing a component?',
    options: [
      'Label only the live conductors, since neutral and earth are obvious',
      'Rely on the conductor colours alone, as they are always unique per terminal',
      'Label the terminals only, leaving the conductors themselves unmarked',
      'Label both conductor and terminal, photograph it, and record in writing',
    ],
    correctAnswer: 3,
    explanation:
      'Every connection must be labelled with a unique identifier on both the conductor and the terminal point. A photograph provides additional backup. Written records should note conductor colours, sizes, and terminal designations. This is especially important for control wiring where multiple conductors of the same colour may be present. Reconnecting conductors to wrong terminals can cause equipment damage, incorrect operation, or safety hazards.',
  },
  {
    id: 8,
    question: 'MCCB replacement differs from MCB replacement primarily because:',
    options: [
      'MCCBs have adjustable trip settings that must be configured for the application',
      'MCCBs cannot provide short-circuit protection and need a separate backup fuse',
      'MCCBs do not need to be matched to the prospective fault current at the board',
      'MCCBs are always fixed-setting devices with no trip adjustment available at all',
    ],
    correctAnswer: 0,
    explanation:
      'Moulded case circuit breakers (MCCBs) typically have adjustable overload (Ir), short-delay short-circuit (Isd) and instantaneous short-circuit (Ii) trip settings that must be configured to match the protection coordination study. Their higher breaking capacities (up to 150 kA) require verification against the prospective fault current. Additionally, MCCBs may have earth fault protection, zone selective interlocking (ZSI) and communication modules that must be correctly configured.',
  },
  {
    id: 9,
    question: 'When pressing out and pressing in motor bearings, the correct technique is to:',
    options: [
      'Apply the pressing force through the rolling elements to seat it evenly',
      'Press only on the ring being fitted, never through the rolling elements',
      'Drive the bearing on with a hammer directly onto the outer race ring',
      'Heat the shaft rather than the bearing to create the interference fit',
    ],
    correctAnswer: 1,
    explanation:
      'Force must always be applied to the ring being fitted: to the inner ring when pressing onto a shaft, and to the outer ring when pressing into a housing. Force transmitted through the rolling elements (balls or rollers) causes brinelling — permanent dents in the raceways that lead to premature failure, noise and vibration. Induction heaters or oil baths (80-100°C maximum) can be used to expand the inner ring for interference fits, but excessive heat damages bearing seals and lubricant.',
  },
  {
    id: 10,
    question:
      'After replacing a relay in a control circuit, the control sequence should be verified by:',
    options: [
      'Applying full power to the load straight away and watching for faults',
      'Checking only that the relay coil energises when it is commanded to',
      'Testing each relay function, then proving the full sequence before loading',
      'Confirming the relay is the same brand as the rest of the panel devices',
    ],
    correctAnswer: 2,
    explanation:
      'Relay function must be verified systematically: confirm coil voltage and pickup/dropout operation, check contact configuration (NO/NC) matches the circuit requirements, verify timing functions if applicable, and test the complete control sequence step by step. Only after confirming correct control circuit operation should power be applied to the load. This prevents equipment damage from incorrect control sequencing.',
  },
  {
    id: 11,
    question:
      'If an exact like-for-like replacement component is no longer available due to obsolescence, the maintenance technician should:',
    options: [
      'Fit the closest component on the shelf without checking its ratings',
      'Leave the circuit out of service until the exact original part is sourced',
      'Modify the original failed component so it physically fits back in the space',
      "Use the maker's recommended equivalent, verify all parameters, and document it",
    ],
    correctAnswer: 3,
    explanation:
      "When a like-for-like replacement is unavailable, the technician should identify the manufacturer's recommended replacement or cross-reference equivalent. All critical parameters must be verified: ratings, characteristics, physical compatibility and functional equivalence. The substitution must be documented as a design change, and the implications for protection coordination, space, ventilation and maintenance access must be assessed. This may require sign-off from a competent designer.",
  },
  {
    id: 12,
    question: 'What is the recommended torque for electrical connections, and why does it matter?',
    options: [
      "The maker's specified value — too little overheats, too much damages the terminal",
      'As tight as possible by hand, since torque figures are only a rough guideline',
      'A single standard torque of 5 Nm that applies to every electrical terminal type',
      'Torque does not matter, provided the conductor cannot be pulled out by hand',
    ],
    correctAnswer: 0,
    explanation:
      "Electrical connections must be tightened to the manufacturer's specified torque value using a calibrated torque tool. Under-torqued connections result in high-resistance joints that cause localised heating, potentially leading to fire, insulation damage and equipment failure. Over-torqued connections damage threads, deform terminals and can sever conductor strands, also creating unreliable connections. BS 7671 Regulation 526.2 requires that connections are mechanically sound and electrically reliable.",
  },
];

const faqs = [
  {
    question: 'Can I replace a Type B MCB with a Type C if the same current rating is available?',
    answer:
      "No — not without an engineering assessment. Type B MCBs trip at 3-5 times rated current (designed for resistive and lightly inductive loads). Type C MCBs trip at 5-10 times rated current (designed for motor and transformer inrush). Replacing a Type B with a Type C on a socket circuit would increase the let-through energy during a fault and may exceed the cable's energy withstand capability, violating BS 7671 Regulation 434.5.2. The trip curve must match the original design intent.",
  },
  {
    question: 'How do I know if a motor bearing needs replacing versus just re-greasing?',
    answer:
      'Vibration analysis is the most reliable indicator. Elevated vibration at bearing-related frequencies (BPFO, BPFI, BSF, FTF) indicates bearing damage that cannot be resolved by re-greasing. Additionally, if the bearing exhibits audible noise (rumbling, grinding), excessive temperature, visible contamination in the grease, or any detectable play when the shaft is moved by hand, replacement is required. Re-greasing is appropriate for bearings showing normal wear and no damage indicators during routine maintenance.',
  },
  {
    question: 'What documentation should I complete when replacing a component?',
    answer:
      'Document the following: description of the fault, original component details (make, model, ratings, serial number), replacement component details (same information), date and time of replacement, tests carried out before and after (IR, continuity, functional), any settings or parameters configured, the name of the person carrying out the work, and any deviations from like-for-like. This documentation forms part of the asset maintenance history and supports future troubleshooting, warranty claims and regulatory compliance.',
  },
  {
    question: 'Why should I photograph connections before removal?',
    answer:
      'Photographs provide an invaluable reference for reconnection, especially in complex control panels where multiple conductors of similar colours connect to adjacent terminals. They supplement written labels (which can fall off or become illegible) and help resolve disputes about the original configuration. Photographs also document the condition of the equipment before your intervention, which can be important if further issues arise. Take clear, well-lit photographs from multiple angles before disconnecting anything.',
  },
  {
    question: 'Can I upgrade a component to a higher-rated replacement as a safety margin?',
    answer:
      'Upgrading ratings requires careful consideration. For protective devices (MCBs, fuses, MCCBs), increasing the current rating can compromise cable protection — the conductor may overheat before the device trips. For contactors and switchgear, a higher-rated device is generally acceptable provided it is physically compatible and the protection coordination is maintained. Any upgrade must be treated as a design change and assessed by a competent person for its impact on the overall installation safety.',
  },
];

const MOETModule4Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.4 · Subsection 2"
        title="Component Removal and Replacement"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Correct procedures for removing and replacing contactors, MCBs, MCCBs, motor bearings,
            relays and drives
          </p>

          <TLDR
            points={[
              'Like-for-like: match all ratings, characteristics and dimensions.',
              'Label everything: photograph and label all connections before removal.',
              'De-rating: account for temperature, grouping and enclosure effects.',
              'Torque: use manufacturer-specified values for all connections.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the correct procedure for removing and replacing contactors, including coil voltage and utilisation category selection',
              'Explain MCB and MCCB replacement considerations including trip curves, breaking capacity and adjustable settings',
              'Outline motor bearing replacement techniques including pressing, alignment and lubrication',
              'Identify the critical parameters for relay and variable speed drive replacement',
              'Apply like-for-like principles and recognise when upgrade considerations require a design change assessment',
              'Calculate and apply de-rating factors for temperature, altitude, grouping and enclosure effects',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Component types covered">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Contactors:</strong> coil voltage, utilisation category, auxiliary contacts.
              </li>
              <li>
                <strong>MCBs/MCCBs:</strong> trip curves, breaking capacity, adjustable settings.
              </li>
              <li>
                <strong>Motor bearings:</strong> pressing techniques, alignment, lubrication.
              </li>
              <li>
                <strong>Relays and drives:</strong> parameter transfer, functional verification.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Contactor and relay replacement</ContentEyebrow>

          <ConceptBlock title="Contactor and relay replacement">
            <p>
              Contactors are electromechanical switching devices used to control motors, heating
              loads, lighting and other high-current circuits. They are among the most frequently
              replaced components in industrial maintenance because their contacts wear over time
              due to arcing during switching operations. Correct replacement requires matching
              several critical parameters beyond the simple current rating.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Contactor replacement — critical parameters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rated operational current (Ie):</strong> must match or exceed the full load
                current of the controlled load.
              </li>
              <li>
                <strong>Rated operational voltage (Ue):</strong> must be suitable for the system
                voltage (e.g., 400 V AC).
              </li>
              <li>
                <strong>Coil voltage:</strong> must match the control circuit voltage exactly (e.g.,
                24 V DC, 110 V AC, 230 V AC).
              </li>
              <li>
                <strong>AC utilisation category:</strong> AC-1 (resistive), AC-3 (motor starting),
                AC-4 (plugging/inching) — each has different making and breaking requirements.
              </li>
              <li>
                <strong>Number of poles:</strong> typically 3-pole for three-phase motor control,
                but 4-pole for switching the neutral.
              </li>
              <li>
                <strong>Auxiliary contacts:</strong> number and configuration of NO (normally open)
                and NC (normally closed) auxiliary contacts for control interlocking.
              </li>
              <li>
                <strong>Physical dimensions:</strong> frame size, mounting centres, terminal
                orientation must be compatible with the existing panel layout.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Relay replacement considerations">
            <p>
              Control relays, timer relays and protection relays each have specific replacement
              requirements. The type of relay determines the critical parameters.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Control relays:</strong> coil voltage, contact configuration (SPDT, DPDT,
                4PDT), contact rating, base socket compatibility.
              </li>
              <li>
                <strong>Timer relays:</strong> timing function (on-delay, off-delay, star-delta,
                pulse), timing range, display type, connection diagram.
              </li>
              <li>
                <strong>Protection relays:</strong> protection function (overcurrent, earth fault,
                differential), CT ratio, pickup settings, time-current curves, communication
                protocol.
              </li>
              <li>
                <strong>Safety relays:</strong> SIL rating (Safety Integrity Level), category (BS EN
                ISO 13849-1), redundancy requirements — safety relays must be certified for the
                application.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Contact wear assessment"
            whatHappens={
              <>
                Before replacing a contactor, inspect the contacts for wear. Never file or dress
                contactor contacts — this removes the silver layer and accelerates wear.
              </>
            }
            doInstead={
              <>
                If the silver contact layer has worn through to the copper base material,
                replacement is required. Light pitting and discolouration of the contacts is normal
                and does NOT require replacement. Contact tips are available as replaceable spare
                parts for many contactor ranges, avoiding the need to replace the entire contactor.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>MCB and MCCB replacement</ContentEyebrow>

          <ConceptBlock title="MCB and MCCB replacement">
            <p>
              Miniature circuit breakers (MCBs) and moulded case circuit breakers (MCCBs) are
              protective devices that must be correctly specified to provide both overload and
              short-circuit protection for the cables and equipment they protect. Incorrect
              replacement can result in a failure to protect against faults, potentially leading to
              fire or electrocution.
            </p>
          </ConceptBlock>

          <ConceptBlock title="MCB trip curves">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Curve</th>
                    <th className="py-2 pr-4 font-medium text-white">Magnetic trip range</th>
                    <th className="py-2 font-medium text-white">Typical application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Type B</td>
                    <td className="py-2 pr-4">3-5 x In</td>
                    <td className="py-2">
                      Domestic, commercial — resistive and lightly inductive loads
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Type C</td>
                    <td className="py-2 pr-4">5-10 x In</td>
                    <td className="py-2">
                      Motors, transformers, fluorescent lighting — moderate inrush
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Type D</td>
                    <td className="py-2 pr-4">10-20 x In</td>
                    <td className="py-2">
                      Welding equipment, X-ray machines, large motors — high inrush
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="MCCB adjustable settings">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ir (overload):</strong> adjustable from typically 0.63-1.0 x In — sets the
                thermal overload trip threshold.
              </li>
              <li>
                <strong>tr (overload time):</strong> some MCCBs allow adjustment of the thermal trip
                time characteristic.
              </li>
              <li>
                <strong>Isd (short-delay):</strong> adjustable short-circuit trip level — provides
                time delay for coordination with downstream devices.
              </li>
              <li>
                <strong>tsd (short-delay time):</strong> time delay for the short-circuit trip — 0
                to 0.4 seconds typically.
              </li>
              <li>
                <strong>Ii (instantaneous):</strong> non-adjustable or adjustable instantaneous trip
                for high fault currents.
              </li>
              <li>
                <strong>Ig (earth fault):</strong> some MCCBs include adjustable earth fault
                protection.
              </li>
            </ul>
            <p>
              The replacement MCB or MCCB must have a breaking capacity (Icn or Icu) that equals or
              exceeds the prospective fault current (Ipf) at the point of installation. This is a
              fundamental requirement of BS 7671 Regulation 432.1. If the Ipf has increased since
              the original installation (e.g., due to a transformer upgrade or network changes), the
              replacement device may need a higher breaking capacity than the original. Always
              verify the current Ipf before selecting a replacement.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Motor bearing replacement</ContentEyebrow>

          <ConceptBlock title="Motor bearing replacement">
            <p>
              Motor bearings are the most common failure point in electric motors. They support the
              rotor shaft, maintain the air gap between rotor and stator, and must handle radial and
              axial loads during operation. Correct bearing replacement technique is essential —
              improper handling or installation is the leading cause of premature bearing failure,
              often resulting in the replacement bearing lasting only a fraction of its design life.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Bearing replacement procedure">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Record bearing designation:</strong> note the bearing number from the old
                bearing or motor nameplate (e.g., 6205-2RS, 6308-ZZ).
              </li>
              <li>
                <strong>Inspect shaft and housing:</strong> check for scoring, corrosion, wear marks
                or damage. Measure shaft and housing dimensions against manufacturer&apos;s
                tolerance.
              </li>
              <li>
                <strong>Remove old bearing:</strong> use a bearing puller — never prise with a
                screwdriver. Apply force to the inner ring only. Inspect the removed bearing for
                failure mode evidence.
              </li>
              <li>
                <strong>Clean surfaces:</strong> clean the shaft and housing bore thoroughly with a
                suitable solvent. Remove all traces of old grease and contaminants.
              </li>
              <li>
                <strong>Install new bearing:</strong> press the inner ring onto the shaft using a
                bearing press or induction heater (80-100°C max). Never apply force through the
                rolling elements.
              </li>
              <li>
                <strong>Lubricate:</strong> apply the correct type and quantity of grease.
                Over-greasing causes overheating; under-greasing causes premature wear.
              </li>
              <li>
                <strong>Reassemble:</strong> ensure correct endplay, check shaft rotates freely,
                verify alignment.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Common bearing failure modes">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fatigue spalling:</strong> flaking of raceway surface — natural end-of-life
                failure mode.
              </li>
              <li>
                <strong>Brinelling:</strong> permanent dents in raceways from excessive static load
                or installation damage.
              </li>
              <li>
                <strong>Fretting corrosion:</strong> rust-coloured wear on shaft or housing contact
                surfaces from micro-movement (loose fit).
              </li>
              <li>
                <strong>Contamination:</strong> ingress of dirt, moisture or process material past
                the seals.
              </li>
              <li>
                <strong>Electrical pitting:</strong> craters caused by bearing currents (common with
                VSD-fed motors without shaft grounding).
              </li>
              <li>
                <strong>Lubrication failure:</strong> overheating, discolouration and destruction
                from insufficient, excessive or incorrect lubricant.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Drive replacement, upgrades and de-rating</ContentEyebrow>

          <ConceptBlock title="Drive replacement, upgrade considerations and de-rating">
            <p>
              Variable speed drives (VSDs) require particular care during replacement because they
              contain extensive parameter configurations that control the motor&apos;s operation.
              Additionally, when considering upgrades or substitute components, de-rating factors
              must be applied to ensure the replacement operates within safe limits in the actual
              installation environment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="VSD replacement procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Back up parameters:</strong> download all drive parameters using the
                manufacturer&apos;s software, a parameter copy module, or manual recording. Include
                motor data, ramp times, speed limits, protection settings, I/O assignments and
                communication settings.
              </li>
              <li>
                <strong>Verify compatibility:</strong> confirm the replacement drive has the same
                power rating, voltage, control mode capability (V/f, vector, servo), communication
                protocol and I/O configuration.
              </li>
              <li>
                <strong>Physical installation:</strong> ensure adequate ventilation clearances,
                cable routing and EMC considerations (screened motor cables, cable glands).
              </li>
              <li>
                <strong>Upload parameters:</strong> program all parameters into the replacement
                drive. If migrating to a different manufacturer, parameters must be translated to
                the new drive&apos;s parameter structure.
              </li>
              <li>
                <strong>Commission:</strong> run the motor uncoupled where possible, check rotation
                direction, verify speed reference tracking, test all protection functions, then
                couple and load test.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="De-rating factors">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ambient temperature:</strong> standard ratings assume 40°C ambient. Higher
                temperatures require de-rating — typically 2-3% per degree above 40°C.
              </li>
              <li>
                <strong>Altitude:</strong> above 1000 m (some manufacturers 2000 m), reduced air
                density impairs cooling. Typical de-rating: 1% per 100 m above the threshold.
              </li>
              <li>
                <strong>Switching frequency:</strong> VSD output switching frequency affects power
                loss. Higher switching frequencies improve motor performance but require drive
                de-rating.
              </li>
              <li>
                <strong>Grouping:</strong> multiple components in the same enclosure increase the
                ambient temperature for each device.
              </li>
              <li>
                <strong>Enclosure type:</strong> sealed enclosures (IP54/65) without forced
                ventilation require greater de-rating than ventilated enclosures.
              </li>
              <li>
                <strong>Duty cycle:</strong> continuous duty vs intermittent duty — heavy-duty
                applications (frequent starting/stopping) may require de-rating or upsizing.
              </li>
            </ul>
            <p>
              <strong>ST1426 link:</strong> the ability to correctly remove, replace and commission
              electrical components is a core maintenance technician competence. Understanding
              like-for-like principles, de-rating factors and the importance of documentation
              demonstrates the professional approach expected of a qualified maintenance technician.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Component Removal and Replacement"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section4-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Safe Isolation and Verification
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section4-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Cable Jointing and Termination
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section4_2;
