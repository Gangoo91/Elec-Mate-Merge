/**
 * MOET · Module 5 · Section 1 · Subsection 2 — Proximity and Position Sensors
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
 *              · "Electrical. Functions and applications of electrical
 *                 circuits."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Structural note: the original placed InlineCheck quickCheckQuestions[3]
 * (photoelectric) after section 03 and quickCheckQuestions[2] (NPN/PNP) after
 * section 04 — out of array order, but topically correct (check 3 asks about
 * photoelectric modes, section 03 teaches photoelectric sensors; check 2 asks
 * about NPN/PNP, section 04 teaches output wiring). That placement is
 * preserved here rather than "corrected" to array order.
 *
 * No GS38, thermography, test-interval or C&G-qualification claims appear on
 * this page.
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
  Scenario,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Proximity and Position Sensors - MOET Module 5 Section 1.2';
const DESCRIPTION =
  'Comprehensive guide to proximity and position sensors for maintenance technicians: inductive, capacitive, optical and ultrasonic sensors, NPN/PNP outputs, switching distances and fault-finding. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'inductive-principle',
    question: 'What is the operating principle of an inductive proximity sensor?',
    options: [
      'It emits a beam of infrared light and detects when the beam is interrupted by a target',
      'It generates a high-frequency electromagnetic field and detects the eddy current losses when a metallic target enters the field',
      'It measures the change in capacitance as any material approaches the sensing face',
      'It detects the magnetic field of a permanent magnet embedded in the target',
    ],
    correctIndex: 1,
    explanation:
      'An inductive proximity sensor contains an oscillator that generates a high-frequency electromagnetic field at the sensing face. When a metallic target enters this field, eddy currents are induced in the target, which absorb energy from the oscillator. The resulting change in oscillator amplitude is detected by the trigger circuit, which switches the output.',
  },
  {
    id: 'capacitive-detection',
    question:
      'Which sensor type can detect non-metallic materials such as plastics, liquids and powders?',
    options: [
      'Hall effect sensor',
      'Inductive proximity sensor',
      'Capacitive proximity sensor',
      'Magnetic reed switch',
    ],
    correctIndex: 2,
    explanation:
      'Capacitive proximity sensors detect changes in the dielectric constant of the medium between the sensor face and the target. Because any material with a dielectric constant greater than air will cause a detectable change, capacitive sensors can detect metals, plastics, glass, liquids, powders and granular materials.',
  },
  {
    id: 'npn-pnp-output',
    question: 'What is the difference between an NPN and PNP proximity sensor output?',
    options: [
      'NPN sensors run on AC supplies; PNP sensors run on DC supplies',
      'NPN sensors are normally open; PNP sensors are normally closed',
      'NPN switches the load to the negative rail (sinking); PNP switches the load to the positive rail (sourcing)',
      'NPN sensors detect metals; PNP sensors detect non-metals',
    ],
    correctIndex: 2,
    explanation:
      'NPN (sinking) sensors switch the load connection to the 0 V (negative) rail when activated — the load is connected between the sensor output and the positive supply. PNP (sourcing) sensors switch the load connection to the positive rail — the load is connected between the sensor output and the 0 V rail. PNP is more common in European and UK installations.',
  },
  {
    id: 'photoelectric-modes',
    question:
      'In a through-beam photoelectric sensor arrangement, where are the emitter and receiver positioned?',
    options: [
      'The emitter and receiver are in the same housing, with light bounced off a reflector',
      'The emitter and receiver face each other across the detection zone, and the target breaks the beam',
      'The emitter and receiver are in one housing, detecting light scattered back from the target',
      'The emitter and receiver are mounted side by side and detect a magnetic field',
    ],
    correctIndex: 1,
    explanation:
      'In through-beam (opposed) mode, the emitter and receiver are separate units mounted facing each other. The target is detected when it passes between them and interrupts the light beam. This gives the longest sensing range (up to 60 m) and the most reliable detection, but requires wiring to both sides of the detection zone.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'An inductive proximity sensor will reliably detect which of the following targets?',
    options: ['A glass bottle', 'A mild steel bracket', 'A cardboard box', 'A polythene bag'],
    correctAnswer: 1,
    explanation:
      'Inductive proximity sensors detect metallic targets only. They work by sensing eddy current losses in conductive materials. Mild steel (ferrous metal) provides the best detection range. Non-metallic materials such as glass, cardboard and plastic cannot be detected by inductive sensors.',
  },
  {
    id: 2,
    question:
      'The rated sensing distance (Sn) of an inductive sensor is specified for which target material?',
    options: ['Stainless steel', 'Copper', 'Mild steel (Fe 360)', 'Aluminium'],
    correctAnswer: 2,
    explanation:
      'The rated sensing distance (Sn) is always specified for a standard target of mild steel (Fe 360) with defined dimensions (typically a square plate with side length equal to the sensor diameter or 3 times the sensing distance). For non-ferrous metals, a correction factor must be applied — typically 0.4 for copper and 0.3-0.5 for aluminium.',
  },
  {
    id: 3,
    question:
      'A capacitive proximity sensor is installed to detect the level of a liquid inside a plastic tank. What does the sensor actually measure?',
    options: [
      'The weight of liquid pressing against the sensing face',
      'The temperature difference between the liquid and the air above it',
      'The electrical conductivity of the liquid flowing past the sensor',
      "The change in capacitance caused by the liquid's dielectric constant being higher than air",
    ],
    correctAnswer: 3,
    explanation:
      'The capacitive sensor measures the change in capacitance at its sensing face. The liquid has a dielectric constant significantly higher than air (water is approximately 80 versus 1 for air), which increases the capacitance and triggers the sensor. Sensitivity adjustment is critical to prevent false triggering through the tank wall.',
  },
  {
    id: 4,
    question:
      'A PNP (sourcing) proximity sensor is connected to a PLC digital input. Which statement is correct?',
    options: [
      'The PLC input must be configured for sinking (NPN-compatible) to work with a PNP sensor',
      'The PLC input must be configured for sourcing to work with a PNP sensor',
      'A PNP sensor cannot be connected directly to a PLC input',
      'The PNP sensor must be powered from the PLC output rather than the supply',
    ],
    correctAnswer: 0,
    explanation:
      'A PNP (sourcing) sensor provides a positive voltage to the PLC input when activated. The PLC input must therefore be configured as sinking — it receives current from the sensor. Conversely, an NPN (sinking) sensor requires a sourcing PLC input. Mismatching source/sink configurations will result in the input not being read correctly.',
  },
  {
    id: 5,
    question: 'Which photoelectric sensing mode offers the longest detection range?',
    options: [
      'Retro-reflective',
      'Through-beam (opposed)',
      'Background suppression',
      'Diffuse (direct reflection)',
    ],
    correctAnswer: 1,
    explanation:
      'Through-beam (opposed) mode provides the longest range — up to 60 m for some models. The emitter and receiver are separate units facing each other, giving a strong, focused signal. Retro-reflective typically reaches 10-15 m, whilst diffuse sensors are generally limited to 0.1-2 m depending on the target surface.',
  },
  {
    id: 6,
    question: 'An ultrasonic proximity sensor is preferred over an optical sensor when:',
    options: [
      'The fastest possible switching speed is required',
      'The target is a small, shiny metallic component',
      'The environment contains dust, mist or steam that would block light',
      'The sensor must be mounted flush with a metal surface',
    ],
    correctAnswer: 2,
    explanation:
      'Ultrasonic sensors use sound waves rather than light, making them immune to optical interference such as dust, mist, steam, and varying surface colours. They can also detect transparent materials that optical sensors may miss. However, they are slower than optical sensors and may be affected by temperature changes that alter the speed of sound.',
  },
  {
    id: 7,
    question:
      'A maintenance technician finds that an inductive proximity sensor is not detecting a target that is within the rated sensing distance. The first check should be:',
    options: [
      'Replace the sensor immediately, as it has clearly failed',
      'Increase the sensor sensitivity to maximum using the potentiometer',
      'Move the target closer than the rated sensing distance',
      'Verify the supply voltage at the sensor terminals and check the LED indicator status',
    ],
    correctAnswer: 3,
    explanation:
      'The first step in any sensor fault-finding is to verify that the sensor has the correct supply voltage at its terminals (typically 10-30 V DC) and to observe the built-in LED indicator. If the LED does not illuminate at all, the issue is likely a wiring or supply fault. If the LED illuminates but does not change state with the target, the sensor may be faulty or the target may be unsuitable.',
  },
  {
    id: 8,
    question: "The 'hysteresis' specification of a proximity sensor describes:",
    options: [
      'The difference between the switch-on point and the switch-off point as the target approaches and then retreats',
      'The maximum distance at which the sensor will detect a standard target',
      'The time delay between detection and the output actually changing state',
      'The variation in sensing range caused by changes in ambient temperature',
    ],
    correctAnswer: 0,
    explanation:
      'Hysteresis is the difference between the operate point (target approaching) and the release point (target retreating). It prevents rapid on-off chatter when the target is near the switching threshold. Typical hysteresis values are 5-20 % of the sensing distance. Without hysteresis, output oscillation could damage relay contacts or cause erratic PLC behaviour.',
  },
  {
    id: 9,
    question:
      'A retro-reflective photoelectric sensor uses a reflector on the opposite side of the detection zone. The advantage over a through-beam arrangement is:',
    options: [
      'It provides a longer sensing range than a through-beam arrangement',
      'Only one cable run is needed — both emitter and receiver are in the same housing',
      'It can detect transparent targets that a through-beam sensor misses',
      'It does not require any optical alignment during installation',
    ],
    correctAnswer: 1,
    explanation:
      'The main advantage of retro-reflective mode is that the emitter and receiver are in the same housing, requiring only one cable run and one mounting point. The reflector on the opposite side is passive (no wiring needed). This reduces installation cost and complexity compared to through-beam, where both emitter and receiver need power and signal connections.',
  },
  {
    id: 10,
    question: 'An encoder mounted on a motor shaft provides:',
    options: [
      'A measurement of the motor winding temperature',
      'A measurement of the current drawn by the motor',
      'Position, speed and/or direction information by generating digital pulses proportional to shaft rotation',
      'Protection against overload by interrupting the supply',
    ],
    correctAnswer: 2,
    explanation:
      'An encoder converts rotary or linear motion into digital pulse signals. An incremental encoder produces a set number of pulses per revolution, allowing speed and relative position to be calculated. An absolute encoder outputs a unique digital code for each shaft position, providing position information even after power loss.',
  },
  {
    id: 11,
    question: "The 'flush' and 'non-flush' mounting styles of an inductive sensor refer to:",
    options: [
      'Whether the sensor uses an NPN or a PNP output configuration',
      'Whether the sensor detects ferrous or non-ferrous metals',
      'Whether the sensor output is normally open or normally closed',
      'Whether the sensor face is level with the mounting surface or protrudes from it',
    ],
    correctAnswer: 3,
    explanation:
      'A flush-mounted sensor can be installed with its face level with the surrounding metal surface because it has a focused electromagnetic field. A non-flush sensor must protrude from the mounting surface with a free zone around the face. Non-flush sensors offer a longer sensing distance for a given diameter, but require more space. Flush mounting provides better mechanical protection.',
  },
  {
    id: 12,
    question:
      'Which proximity sensor technology would be most suitable for detecting the position of a pneumatic cylinder piston through a non-magnetic aluminium cylinder barrel?',
    options: [
      "Magnetic reed switch or Hall effect sensor detecting the piston's permanent magnet",
      'Inductive proximity sensor mounted on the cylinder barrel',
      'Capacitive proximity sensor mounted on the cylinder barrel',
      'Through-beam photoelectric sensor across the cylinder stroke',
    ],
    correctAnswer: 0,
    explanation:
      'Pneumatic cylinders commonly have a permanent magnet embedded in the piston. Reed switches or Hall effect sensors are mounted externally on the cylinder barrel and detect the magnetic field through the non-magnetic aluminium wall. This is a clean, reliable and industry-standard method for cylinder position sensing.',
  },
];

const faqs = [
  {
    question: 'Can I use an inductive sensor to detect aluminium or stainless steel?',
    answer:
      "Yes, but with reduced sensing distance. The rated sensing distance (Sn) is specified for mild steel. Non-ferrous metals have lower correction factors: aluminium typically 0.3-0.5, brass 0.4-0.5, stainless steel 0.6-0.85 depending on the grade. 'All-metal' or 'factor 1' inductive sensors are available that provide the same sensing distance for all metals, but at higher cost.",
  },
  {
    question:
      'What is the difference between NO (normally open) and NC (normally closed) proximity sensors?',
    answer:
      'A normally open (NO) sensor output is off (no current flow) when no target is present, and switches on when a target is detected. A normally closed (NC) sensor output is on (current flowing) when no target is present, and switches off when a target is detected. NC outputs are preferred for safety-critical applications because a wire break will be detected as a fault (loss of signal), not ignored.',
  },
  {
    question: 'Why does my proximity sensor work intermittently?',
    answer:
      'Common causes of intermittent operation include: the target is at the edge of the sensing range (increase overlap or use a sensor with greater range); vibration is causing the gap to vary; loose or corroded wiring connections; inadequate supply voltage (check at the sensor terminals, not just at the panel); electromagnetic interference from nearby VSD cables or welding equipment.',
  },
  {
    question: 'How do I choose between a photoelectric sensor and an inductive sensor?',
    answer:
      'Use an inductive sensor when detecting metallic targets at short range (typically under 40 mm) in industrial environments — they are robust, sealed, and have no alignment requirements. Use a photoelectric sensor when you need longer range, when detecting non-metallic objects, or when you need to detect the presence or absence of items on a conveyor regardless of material.',
  },
  {
    question: 'What IP rating do proximity sensors need for washdown environments?',
    answer:
      'For food and beverage or pharmaceutical washdown environments, sensors should be rated IP67 minimum (protected against temporary immersion) and preferably IP69K (protected against high-pressure, high-temperature washdown). Stainless steel housings (316L) and FDA-compliant materials are typically required. ECOLAB-approved sensors are recommended for chemical cleaning resistance.',
  },
  {
    question: 'Can proximity sensors be used in ATEX hazardous areas?',
    answer:
      'Yes, but only sensors specifically certified for the hazardous area classification. ATEX-rated sensors are available in intrinsically safe (Ex ia/ib), increased safety (Ex e) and encapsulated (Ex m) versions. They must be installed with certified barriers or interfaces and the complete loop must be assessed for compliance with BS EN 60079 and the DSEAR Regulations.',
  },
];

const MOETModule5Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.1 · Subsection 2"
        title="Proximity and Position Sensors"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Inductive, capacitive, optical and ultrasonic proximity sensors for industrial detection
            — how each one works, when to specify it, and how to fault-find it.
          </p>

          <TLDR
            points={[
              'Inductive: Detect metallic targets using electromagnetic fields — short range, very robust.',
              'Capacitive: Detect any material (including liquids, powders) via capacitance change.',
              'Photoelectric: Use light beams for long-range, non-contact detection of any object.',
              'Outputs: NPN (sinking) or PNP (sourcing) — must match PLC input configuration.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the operating principle of inductive, capacitive and photoelectric proximity sensors',
              'Identify NPN (sinking) and PNP (sourcing) output configurations and match them to PLC inputs',
              'Describe through-beam, retro-reflective and diffuse photoelectric sensing modes',
              'Select the appropriate sensor technology for common industrial detection tasks',
              'Apply systematic fault-finding procedures to proximity sensor circuits',
              'Specify replacement sensors using manufacturer data sheets and correction factors',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault-finding:</strong> Check supply voltage, LED status and output state
                with a multimeter.
              </li>
              <li>
                <strong>Replacement:</strong> Match type, sensing distance, output (NPN/PNP, NO/NC),
                voltage and connector.
              </li>
              <li>
                <strong>Alignment:</strong> Through-beam and retro-reflective sensors require
                precise optical alignment.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to control and instrumentation maintenance knowledge.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Inductive proximity sensors</ContentEyebrow>

          <ConceptBlock title="The workhorse of industrial automation">
            <p>
              Inductive proximity sensors are the workhorses of industrial automation. Found on
              every production line, packaging machine and conveyor system, they detect the presence
              or absence of metallic objects without physical contact. Their sealed, solid-state
              construction — with no moving parts — makes them extremely reliable in harsh
              industrial environments where mechanical switches would rapidly wear out.
            </p>
            <p>
              The sensor contains an oscillator coil wound around a ferrite core at the sensing
              face. The oscillator generates a high-frequency alternating electromagnetic field
              (typically 100-600 kHz) that radiates from the face. When a metallic target enters
              this field, eddy currents are induced in the target surface. These eddy currents
              absorb energy from the oscillator, reducing its amplitude. A Schmitt trigger circuit
              detects this reduction and switches the output.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key specifications">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensing distance (Sn):</strong> Rated for mild steel standard target —
                ranges from 1 mm (M8 barrel) to 40 mm (M30 barrel) for standard sensors.
              </li>
              <li>
                <strong>Correction factors:</strong> Non-ferrous metals reduce the effective range —
                aluminium approximately 0.4, copper approximately 0.4, brass approximately 0.5,
                stainless steel approximately 0.7.
              </li>
              <li>
                <strong>Hysteresis:</strong> Typically 5-15 % of Sn — prevents output chatter at the
                switching threshold.
              </li>
              <li>
                <strong>Switching frequency:</strong> Up to 5000 Hz for short-range sensors —
                critical for high-speed counting applications.
              </li>
              <li>
                <strong>Supply voltage:</strong> Typically 10-30 V DC (some models 10-60 V DC).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Flush vs non-flush mounting">
            <p>Mounting style affects the sensing distance and installation requirements:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flush (embeddable):</strong> Can be mounted with the face level with the
                surrounding metal surface. The electromagnetic field is focused forward. Provides a
                shorter sensing distance but better mechanical protection.
              </li>
              <li>
                <strong>Non-flush (non-embeddable):</strong> Must protrude from the mounting surface
                with a clear zone around the face equal to the sensor diameter. Provides
                approximately double the sensing distance of a flush sensor of the same diameter.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Inductive sensor sizes and typical ranges">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Barrel size</th>
                    <th className="py-2 pr-4 font-medium text-white">Flush Sn</th>
                    <th className="py-2 pr-4 font-medium text-white">Non-flush Sn</th>
                    <th className="py-2 font-medium text-white">Typical application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">M8</td>
                    <td className="py-2 pr-4">1.5 mm</td>
                    <td className="py-2 pr-4">3 mm</td>
                    <td className="py-2">Small part detection, precision positioning</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">M12</td>
                    <td className="py-2 pr-4">2-4 mm</td>
                    <td className="py-2 pr-4">4-8 mm</td>
                    <td className="py-2">General purpose, conveyor detection</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">M18</td>
                    <td className="py-2 pr-4">5-8 mm</td>
                    <td className="py-2 pr-4">8-14 mm</td>
                    <td className="py-2">Machine guarding, cylinder position</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">M30</td>
                    <td className="py-2 pr-4">10-15 mm</td>
                    <td className="py-2 pr-4">15-30 mm</td>
                    <td className="py-2">Heavy industry, large gap detection</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Maintenance tip:</strong> Always install inductive sensors with a gap of 70-80
              % of the rated sensing distance to allow for manufacturing tolerances, temperature
              drift and target variations. Operating at exactly the rated distance is unreliable and
              will cause intermittent faults.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Capacitive and ultrasonic sensors</ContentEyebrow>

          <ConceptBlock title="Extending detection beyond metal">
            <p>
              Where inductive sensors are limited to metallic targets, capacitive and ultrasonic
              sensors extend detection capability to virtually any material. Understanding when to
              use each type is a key competence for maintenance technicians working in process, food
              and beverage, pharmaceutical, and water treatment industries.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Capacitive proximity sensors">
            <p>
              Capacitive sensors detect changes in capacitance at the sensing face. The sensor
              contains two concentric plate electrodes that form one half of a capacitor. The target
              material — and the air gap — form the other half and the dielectric. When a material
              with a dielectric constant greater than air approaches the sensor face, the
              capacitance increases, triggering the output.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Detection capability:</strong> Metals, plastics, glass, wood, paper,
                liquids, powders and granular materials.
              </li>
              <li>
                <strong>Level sensing:</strong> Can detect liquid levels through non-metallic tank
                walls (plastic, glass).
              </li>
              <li>
                <strong>Sensitivity adjustment:</strong> A potentiometer or teach-in function
                adjusts the trigger threshold — critical for through-wall detection.
              </li>
              <li>
                <strong>Limitations:</strong> Sensitive to moisture, condensation and build-up on
                the sensing face; shorter range than inductive for metals.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Ultrasonic proximity sensors">
            <p>
              Ultrasonic sensors use sound waves (typically 40-400 kHz) to measure distance. A
              piezoelectric transducer emits a burst of ultrasonic pulses and measures the time of
              flight for the echo to return from the target. The distance is calculated from d = (v
              x t) / 2, where v is the speed of sound and t is the round-trip time.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Range:</strong> Typically 30 mm to 8 m depending on model and target size.
              </li>
              <li>
                <strong>Material independence:</strong> Detects virtually any material — solid,
                liquid, powder — regardless of colour, transparency or surface finish.
              </li>
              <li>
                <strong>Environmental immunity:</strong> Unaffected by dust, steam, mist and spray —
                ideal for harsh environments.
              </li>
              <li>
                <strong>Dead zone:</strong> Cannot detect targets closer than the minimum range
                (typically 30-200 mm) due to transducer ringing.
              </li>
              <li>
                <strong>Temperature sensitivity:</strong> Speed of sound varies with temperature —
                sensors must compensate or accuracy is affected.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="False echoes from structural steelwork"
            whatHappens={
              <>
                Ultrasonic sensors can produce false echoes from structural steelwork, pipes or
                adjacent objects within the sound cone. The beam angle widens with distance —
                typically 5-12 degrees total.
              </>
            }
            doInstead={
              <>
                When installing an ultrasonic sensor for level measurement, ensure the sound cone is
                clear of obstructions, and mount the sensor perpendicular to the surface being
                measured — essential for reliable operation.
              </>
            }
          />

          <ConceptBlock title="Key point: capacitive versus ultrasonic">
            <p>
              Capacitive sensors are the go-to choice for detecting non-metallic materials at close
              range and for level detection through tank walls. Ultrasonic sensors are preferred
              when the environment is too harsh for optical sensors (dust, steam, spray) or when
              distance measurement is needed rather than simple presence detection.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Photoelectric sensors</ContentEyebrow>

          <ConceptBlock title="Three modes cover most applications">
            <p>
              Photoelectric sensors use light (visible red, infrared or laser) to detect the
              presence, absence, position or distance of objects. They offer significantly longer
              sensing ranges than inductive or capacitive sensors and can detect objects of any
              material. Three main operating modes cover the vast majority of industrial
              applications.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Through-beam (opposed mode)">
            <p>
              The emitter and receiver are mounted in separate housings facing each other across the
              detection zone. The target is detected when it breaks the light beam between them.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Longest range: up to 60 m for standard models.</li>
              <li>
                Most reliable detection — strong signal, not dependent on target reflectivity.
              </li>
              <li>Can detect transparent and translucent materials.</li>
              <li>Disadvantage: requires wiring to both sides of the detection zone.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Retro-reflective">
            <p>
              The emitter and receiver are in the same housing. Light is transmitted to a reflector
              on the opposite side and returned to the receiver. The target is detected when it
              interrupts the reflected beam.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Range: up to 10-15 m.</li>
              <li>Only one wiring point — reflector is passive.</li>
              <li>Polarised filters prevent false triggering from shiny target surfaces.</li>
              <li>Difficulty detecting highly reflective targets without polarisation.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Diffuse (direct reflection)">
            <p>
              The emitter and receiver are in the same housing. Light is transmitted toward the
              target and the receiver detects light scattered back from the target surface. No
              reflector is needed.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Range: typically 100 mm to 2 m (target-dependent).</li>
              <li>Simplest installation — only one mounting point, no alignment.</li>
              <li>Detection range varies significantly with target colour and surface finish.</li>
              <li>
                <strong>Background suppression:</strong> Advanced variant that ignores objects
                beyond a set distance regardless of reflectivity.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Using a standard photoelectric sensor for safety guarding"
            whatHappens={
              <>
                Photoelectric sensors used as part of a safety system (e.g. access detection for
                guarding) must be safety-rated light curtains or muting sensors conforming to BS EN
                61496 and used with safety relay modules. Standard photoelectric sensors do not have
                the required redundancy, self-monitoring or response time for safety-of-persons
                applications.
              </>
            }
            doInstead={
              <>
                Specify a safety-rated light curtain or muting sensor to BS EN 61496, wired through
                a safety relay module — never a standard photoelectric sensor — for any guarding or
                access-detection duty.
              </>
            }
          />

          <ConceptBlock title="Maintenance tip: dirty lenses">
            <p>
              Dirty lenses are the most common cause of photoelectric sensor failure. Establish a
              regular cleaning schedule and use sensors with built-in contamination compensation
              where possible. Laser-based sensors are more tolerant of contamination than LED-based
              models due to their focused beam.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Output configurations and wiring</ContentEyebrow>

          <ConceptBlock title="NPN versus PNP: match it or it won't work">
            <p>
              Understanding sensor output configurations is essential for correct wiring and PLC
              integration. The two main DC output types — NPN (sinking) and PNP (sourcing) —
              determine how the sensor connects to the PLC digital input module. Mismatching the
              output type will result in the sensor appearing to not work, even though it is
              functioning correctly.
            </p>
          </ConceptBlock>

          <ConceptBlock title="NPN (sinking) output">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>When activated, the sensor switches the output pin to 0 V (negative rail).</li>
              <li>
                The load (or PLC input) is connected between the sensor output and the positive
                supply.
              </li>
              <li>Current flows into the sensor output pin (it &quot;sinks&quot; current).</li>
              <li>Common in Japanese and Asian manufactured equipment.</li>
              <li>Wire colours: Brown (+V), Blue (0 V), Black (output).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="PNP (sourcing) output">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                When activated, the sensor switches the output pin to the positive supply rail.
              </li>
              <li>The load (or PLC input) is connected between the sensor output and 0 V.</li>
              <li>Current flows out of the sensor output pin (it &quot;sources&quot; current).</li>
              <li>
                Standard in European and UK installations — matches most Siemens, Allen-Bradley,
                Schneider PLC inputs.
              </li>
              <li>Wire colours: Brown (+V), Blue (0 V), Black (output).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="NO/NC and complementary outputs">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NO (Normally Open):</strong> Output is off when no target is present;
                switches on when target detected.
              </li>
              <li>
                <strong>NC (Normally Closed):</strong> Output is on when no target is present;
                switches off when target detected.
              </li>
              <li>
                <strong>Complementary (NO+NC):</strong> Two output pins — one NO and one NC — for
                maximum flexibility.
              </li>
              <li>
                <strong>Push-pull:</strong> Can drive both sinking and sourcing loads without
                external configuration.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Standard wire colours (3-wire DC sensors)">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Wire colour</th>
                    <th className="py-2 pr-4 font-medium text-white">Function</th>
                    <th className="py-2 font-medium text-white">Connection</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Brown (BN)</td>
                    <td className="py-2 pr-4">Positive supply</td>
                    <td className="py-2">+24 V DC</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Blue (BU)</td>
                    <td className="py-2 pr-4">Negative supply (0 V)</td>
                    <td className="py-2">0 V DC</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Black (BK)</td>
                    <td className="py-2 pr-4">Output (NO)</td>
                    <td className="py-2">PLC input</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">White (WH)</td>
                    <td className="py-2 pr-4">Output (NC) — 4-wire sensors only</td>
                    <td className="py-2">PLC input (if used)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> When replacing a proximity sensor, always verify whether
              the PLC input module is sinking or sourcing. A PNP sensor connected to a sourcing PLC
              input will not work — the PLC will never see the input change state. Check the PLC
              hardware manual or measure the voltage at the input terminal relative to 0 V with no
              sensor connected.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Position sensors and encoders</ContentEyebrow>

          <ConceptBlock title="Continuous information, not a single point">
            <p>
              Whilst proximity sensors detect the presence or absence of an object at a specific
              point, position sensors and encoders provide continuous information about position,
              speed or direction. They are essential components in servo systems, CNC machines,
              conveyor positioning and anywhere precise motion control is required.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Incremental encoders">
            <p>
              An incremental encoder generates a set number of pulses per revolution (PPR). The
              controller counts these pulses to determine speed and relative position. A second
              channel, offset by 90 degrees (quadrature), provides direction information.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Resolution: 100 to 10,000+ PPR (pulses per revolution).</li>
              <li>Quadrature outputs (A and B channels) for direction detection.</li>
              <li>Index pulse (Z channel) provides one pulse per revolution for homing.</li>
              <li>Loses position on power loss — must be re-homed after restart.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Absolute encoders">
            <p>
              An absolute encoder outputs a unique digital code for each shaft position. Unlike an
              incremental encoder, it knows its exact position immediately on power-up without
              needing a homing sequence.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Single-turn: unique code for each position within one revolution (e.g. 12-bit = 4096
                positions).
              </li>
              <li>
                Multi-turn: tracks position across multiple revolutions using gear mechanisms or
                battery-backed counters.
              </li>
              <li>
                Output: parallel binary, SSI (Synchronous Serial Interface), or fieldbus (Profibus,
                EtherCAT).
              </li>
              <li>Higher cost than incremental, but no position loss on power failure.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Linear position sensors">
            <p>
              Linear position sensors measure displacement along a straight line. Common types
              include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LVDT (Linear Variable Differential Transformer):</strong> Contactless,
                robust, analogue output — used in hydraulic actuators, precision measurement.
              </li>
              <li>
                <strong>Magnetostrictive:</strong> Absolute position along a waveguide — used in
                hydraulic cylinders.
              </li>
              <li>
                <strong>Potentiometric:</strong> Simple resistive slider — low cost but wears over
                time.
              </li>
              <li>
                <strong>Linear encoder:</strong> Optical or magnetic strip with read head — high
                resolution for CNC machines.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ST1426 and this section">
            <p className="italic">
              Under ST1426, maintenance technicians are expected to understand sensor types, their
              operating principles and common failure modes. You should be able to replace encoders,
              verify pulse counts with an oscilloscope or frequency counter, and interpret encoder
              data sheets for correct replacement specification.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A proximity sensor that works cold and fails when the line warms up"

            situation={
              <>
                <p>
                  An inductive proximity sensor detects a cam on an indexing table. First thing in
                  the morning the machine runs faultlessly. After about two hours of production it
                  starts missing an index roughly once every twenty cycles.
                </p>

                <p>
                  Swapping the sensor for a new one of the same part number makes no difference.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Note that swapping the sensor and seeing no change has already told you something
                  useful: the fault is probably not the sensor. Resist the urge to swap it again.
                </p>

                <p>
                  Measure the actual sensing gap when cold and again when hot. Inductive sensors
                  have a defined operating distance, and a machine that grows a fraction of a
                  millimetre as it warms can push a marginal gap outside it. A gap set at the limit
                  when cold will fail when hot.
                </p>

                <p>
                  Check the target as well as the gap. Sensing distance is quoted for mild steel; a
                  stainless or aluminium cam gives a reduced distance, and a cam that has been
                  replaced with a different material will have shrunk the working margin without
                  anyone changing the setting.
                </p>

                <p>
                  Set the gap to around half the rated operating distance rather than at its edge,
                  and re-check hot. If the machine has no adjustment left, the mounting needs
                  correcting rather than the sensor replacing.
                </p>
              </>
            }

            whyItMatters={
              <p>
                "Works cold, fails hot" is one of the most reliable diagnostic clues in maintenance,
                and it almost always points at something dimensional or resistive rather than at a
                component being faulty. Fitting a third sensor would have achieved nothing except
                confirming the first two were fine. Understanding that a sensor has a rated distance
                — and that the rating assumes a particular target material — is what turns a
                recurring intermittent into a five-minute adjustment.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Inductive sensors detect metallic targets only, using eddy currents induced by a high-frequency field — rated sensing distance (Sn) is always specified for mild steel.',
              'Correction factors reduce the effective range for non-ferrous metals: roughly 0.4 for aluminium and copper, 0.5 for brass, 0.7 for stainless steel.',
              'Capacitive sensors detect any material, including liquids and powders, by sensing a change in dielectric constant — useful for level sensing through non-metallic tank walls.',
              'Ultrasonic sensors measure distance by time-of-flight and are immune to dust, steam and mist, but have a dead zone and are sensitive to temperature.',
              'Through-beam gives the longest photoelectric range; retro-reflective needs one wiring point; diffuse needs no alignment but its range depends on target colour.',
              'Standard photoelectric sensors are never a safety device — guarding needs a light curtain or muting sensor to BS EN 61496 with a safety relay module.',
              'NPN (sinking) switches the load to 0 V; PNP (sourcing) switches it to the positive rail — the PLC input configuration must match the sensor output type.',
              'Always install an inductive sensor at 70-80 % of its rated sensing distance, and always verify supply voltage and the LED indicator before condemning a sensor.',
              'Incremental encoders lose position on power loss and must be re-homed; absolute encoders know their position immediately on power-up.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section1-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Principles of Sensing
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section1-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Temperature and Pressure Sensors
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section1_2;
