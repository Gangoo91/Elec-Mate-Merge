/**
 * MOET · Module 5 · Section 4 · Subsection 3 — Pneumatic and Hydraulic
 * Controls (Overview)
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
 * original page; structure, shell and reading measure rebuilt. The original
 * page's references to PUWER 1998 and the Pressure Systems Safety Regulations
 * 2000 are paraphrases in the source, not verbatim quotes, so they remain
 * plain prose here rather than a RegsCallout.
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

const TITLE = 'Pneumatic and Hydraulic Controls (Overview) - MOET Module 5 Section 4.3';
const DESCRIPTION =
  'Overview of pneumatic and hydraulic control systems for electrical maintenance technicians: operating principles, components, safety considerations and maintenance requirements under ST1426.';

const quickCheckQuestions = [
  {
    id: 'pneumatic-signal',
    question:
      'What is the standard pneumatic signal range used in process control instrumentation?',
    options: ['3-15 psi', '0-100 psi', '0-10 psi', '15-30 psi'],
    correctIndex: 0,
    explanation:
      "The standard pneumatic instrument signal range is 3-15 psi (approximately 0.2-1.0 bar). Like the 4-20 mA electrical standard, it uses a 'live zero' — 3 psi represents 0% of the process variable range, and 15 psi represents 100%. A signal of 0 psi indicates a fault (supply failure or disconnection) rather than a zero reading.",
  },
  {
    id: 'hydraulic-advantage',
    question: 'What is the main advantage of hydraulic systems over pneumatic systems?',
    options: [
      'They respond faster because air accelerates more quickly than oil through pipework',
      'They are intrinsically safe and need no special precautions in hazardous areas',
      'Hydraulic systems can generate much higher forces in a compact space because liquids are virtually incompressible',
      'They never require filtration because oil cannot carry contaminants',
    ],
    correctIndex: 2,
    explanation:
      'The key advantage of hydraulic systems is their ability to generate very high forces in compact actuators. Because hydraulic fluid (oil) is virtually incompressible, force is transmitted directly and efficiently. Pneumatic systems use compressible air, which limits force output and can cause spongy, imprecise positioning under heavy loads.',
  },
  {
    id: 'ip-converter',
    question: 'What does an I/P converter do in a control system?',
    options: [
      'Converts imperial measurements to metric',
      'Converts a 4-20 mA electrical signal to a 3-15 psi pneumatic signal',
      'Converts pneumatic energy into electrical power',
      'Converts internet protocol signals to pneumatic signals',
    ],
    correctIndex: 1,
    explanation:
      'An I/P (current-to-pressure) converter is a transducer that converts a 4-20 mA electrical signal from a controller into a proportional 3-15 psi pneumatic signal. This is essential in systems where the controller is electronic/digital but the final control element (typically a control valve) is pneumatically actuated. The I/P converter bridges the electronic and pneumatic domains.',
  },
  {
    id: 'pneumatic-safety',
    question: 'Why is compressed air considered a hazard in industrial environments?',
    options: [
      'It is highly flammable and can ignite from a single spark',
      'It corrodes most metals on contact, weakening pipework rapidly',
      'Compressed air stores significant energy; sudden release can cause impact injuries, hearing damage from noise, and eye injuries from debris',
      'It conducts electricity, creating a shock risk when used near live equipment',
    ],
    correctIndex: 2,
    explanation:
      'Compressed air stores significant energy and must be treated with respect. Hazards include: high-velocity air jets that can penetrate skin or inject air into the bloodstream; hearing damage from noise; eye injuries from blown debris; whiplash injuries from unsecured hoses; and burst injuries from over-pressurised components. Always depressurise systems before maintenance and never use compressed air to clean clothing or skin.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In a pneumatic control system, instrument air supply is typically provided at:',
    options: [
      '0.5 bar (7 psi) regulated supply',
      '1.4 bar (20 psi) regulated supply',
      '7 bar (100 psi) regulated supply',
      '15 bar (220 psi) regulated supply',
    ],
    correctAnswer: 1,
    explanation:
      'Instrument air is typically regulated to approximately 1.4 bar (20 psi) for pneumatic instruments. This provides sufficient pressure above the 3-15 psi signal range to drive actuators while remaining safe for instrumentation. Plant air for general pneumatic tools may be at 7-10 bar, but instrument air is always at a lower, regulated pressure.',
  },
  {
    id: 2,
    question: "Pascal's law, which underpins hydraulic systems, states that:",
    options: [
      'Pressure in a fluid decreases with the square of the distance from the pump',
      'Flow rate through a pipe is inversely proportional to the applied pressure',
      'Pressure applied to a confined fluid is transmitted equally in all directions',
      'The force on a piston is independent of the fluid pressure acting on it',
    ],
    correctAnswer: 2,
    explanation:
      "Pascal's law states that pressure applied to a confined, incompressible fluid is transmitted equally and undiminished in all directions throughout the fluid. This principle allows hydraulic systems to multiply force: a small force applied to a small piston creates pressure that acts on a larger piston, producing a proportionally larger force.",
  },
  {
    id: 3,
    question: "A pneumatic control valve with 'fail-close' action will:",
    options: [
      'Hold its last position indefinitely when the air supply is lost',
      'Open fully when the air supply is lost, driven by the spring return',
      'Oscillate between open and closed until the supply is restored',
      'Close fully when the air supply is lost, driven by the spring return',
    ],
    correctAnswer: 3,
    explanation:
      'A fail-close (air-to-open) valve uses a spring to hold the valve closed. Pneumatic pressure must be applied against the spring to open the valve. If the air supply is lost for any reason, the spring forces the valve to its fully closed position. This is a critical safety feature — the failure mode is chosen to put the process in a safe state.',
  },
  {
    id: 4,
    question: 'Which of the following is a critical quality requirement for instrument air?',
    options: [
      'It must be clean, dry and oil-free to prevent instrument damage and blockages',
      'It must be slightly humidified to keep diaphragm seals supple',
      'It must contain a fine oil mist to lubricate moving valve parts',
      'It must be delivered cold to improve the accuracy of pressure readings',
    ],
    correctAnswer: 0,
    explanation:
      'Instrument air must be clean (filtered to remove particles), dry (dew point well below ambient to prevent condensation) and oil-free (to prevent contamination of instrument internals). Moisture causes corrosion, freezing in cold weather, and blockage of small orifices. Oil contaminates diaphragms and nozzles. ISA-7.0.01 specifies instrument air quality requirements.',
  },
  {
    id: 5,
    question: 'In a hydraulic system, what is the function of the relief valve?',
    options: [
      'To increase the flow rate to the actuators during peak demand',
      'To limit the maximum system pressure by diverting excess flow back to the reservoir, preventing damage from over-pressurisation',
      'To filter contaminants out of the hydraulic fluid before it reaches the pump',
      'To maintain a constant fluid temperature by mixing hot and cold oil',
    ],
    correctAnswer: 1,
    explanation:
      'The relief valve is a critical safety device that opens when system pressure exceeds its set value, allowing excess fluid to return to the reservoir. This protects pumps, cylinders, hoses and fittings from damage due to over-pressurisation. Every hydraulic system must have a properly set relief valve — failure of this valve can cause catastrophic equipment failure and serious injury.',
  },
  {
    id: 6,
    question: 'A positioner on a pneumatic control valve is used to:',
    options: [
      'Boost the instrument air pressure to a higher level for large actuators',
      'Convert the pneumatic signal back into a 4-20 mA signal for the controller',
      'Ensure the valve reaches the exact position demanded by the controller signal, compensating for friction and pressure effects',
      'Filter moisture out of the instrument air before it reaches the diaphragm',
    ],
    correctAnswer: 2,
    explanation:
      'A valve positioner is a feedback device that ensures the valve stem position accurately matches the control signal. It uses a local feedback mechanism (position sensor on the valve stem) and a pneumatic amplifier to overcome friction, stem packing resistance, and process pressure forces. Without a positioner, the actual valve position may differ significantly from the demanded position, especially on larger valves.',
  },
  {
    id: 7,
    question:
      'Hydraulic fluid contamination is a major cause of system failure. The most common contaminant is:',
    options: [
      'Dissolved nitrogen from the air above the reservoir',
      'Excess additives deliberately blended into the oil',
      'Refrigerant gas leaking from the system cooler',
      'Metallic particles from component wear',
    ],
    correctAnswer: 3,
    explanation:
      'Metallic particles generated by internal wear of pumps, valves and cylinders are the most common contaminant in hydraulic systems. These particles cause further abrasive wear, creating a self-accelerating cycle of contamination. Filtration is essential — most hydraulic systems use pressure-line and return-line filters rated to specific micron levels. Regular fluid analysis and filter changes are critical maintenance tasks.',
  },
  {
    id: 8,
    question: 'In electro-pneumatic systems, a solenoid valve is used to:',
    options: [
      'Convert an electrical on/off signal into pneumatic switching, directing air to actuators',
      'Convert a 3-15 psi pneumatic signal into a proportional 4-20 mA output',
      'Regulate the instrument air supply pressure to a constant value',
      'Measure the position of the valve stem and report it to the controller',
    ],
    correctAnswer: 0,
    explanation:
      'Solenoid valves are the interface between electrical control signals and pneumatic actuators. When the solenoid coil is energised by a PLC or controller output, it moves a spool or poppet that directs compressed air to the actuator. Solenoid valves come in various configurations (2-way, 3-way, 5-way) to control single-acting and double-acting cylinders.',
  },
  {
    id: 9,
    question: "What does the term 'air-over-oil' describe in a pneumatic-hydraulic system?",
    options: [
      'A leak path where air becomes entrained above the oil in the reservoir',
      'A system that uses compressed air to pressurize hydraulic oil, combining pneumatic simplicity with hydraulic force and precision',
      'A two-stage filter that separates air bubbles from the returning oil',
      'A lubrication method where an oil film is carried on the instrument air',
    ],
    correctAnswer: 1,
    explanation:
      'Air-over-oil (also called pneumatic-hydraulic) systems use compressed air acting on a reservoir of hydraulic oil to drive hydraulic cylinders. This combines the simplicity and availability of compressed air with the incompressibility and force multiplication of hydraulic fluid. It is used where smooth, precise motion is needed but a full hydraulic power unit is not justified.',
  },
  {
    id: 10,
    question: 'Before carrying out maintenance on a hydraulic system, the first safety step is to:',
    options: [
      'Top up the reservoir to maximum so the pump does not run dry',
      'Run the system at full pressure to check for any leaks first',
      'Isolate the power, relieve all stored pressure and ensure accumulators are fully discharged',
      'Disconnect a hydraulic hose to allow the pressure to bleed off naturally',
    ],
    correctAnswer: 2,
    explanation:
      'Hydraulic systems store dangerous amounts of energy in pressurised fluid and accumulators. Before any maintenance: isolate the electrical supply to the pump motor; operate valves to relieve line pressure; ensure any hydraulic accumulators are fully discharged (these can store pressure even after the pump is off); lock out/tag out; and verify zero pressure with a gauge. Failure to discharge accumulators has caused fatal injuries.',
  },
  {
    id: 11,
    question:
      "The 3-15 psi pneumatic signal standard uses a 'live zero' at 3 psi for the same reason as the 4-20 mA standard uses 4 mA, which is:",
    options: [
      'To provide a small reserve of pressure to overcome valve friction',
      'To keep the actuator slightly pressurised so it responds more quickly',
      'To allow the signal to be measured with a simpler, cheaper gauge',
      'To differentiate between a genuine zero reading and a system fault',
    ],
    correctAnswer: 3,
    explanation:
      'Both the 3-15 psi and 4-20 mA standards use a live zero so that a complete loss of signal (0 psi or 0 mA) always indicates a fault condition — a broken tube, disconnected fitting, or failed supply — rather than a genuine zero process reading. This allows immediate detection of instrumentation failures, which is critical for safe plant operation.',
  },
  {
    id: 12,
    question:
      'Under ST1426, maintenance technicians working with pneumatic and hydraulic systems should understand:',
    options: [
      'The operating principles, safety hazards, maintenance requirements and how these systems integrate with electrical control systems',
      'Only the electrical control wiring, leaving fluid power to specialist fitters',
      'Solely the manufacturer service intervals, without needing to understand operation',
      'Just the emergency stop procedures, as routine work is always sub-contracted',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to have a working knowledge of pneumatic and hydraulic systems as part of their overall capability in maintaining automated plant. This includes understanding operating principles, recognising safety hazards, carrying out routine maintenance (filter changes, fluid checks, leak detection) and understanding how these systems interface with electrical controls.',
  },
];

const faqs = [
  {
    question:
      'Why are pneumatic systems still widely used when electronic controls are more modern?',
    answer:
      'Pneumatic actuators remain popular because they are intrinsically safe (no electrical spark risk in hazardous areas), they are simple and robust with few moving parts, they can generate high forces from compact actuators, and the installed base is enormous. Many existing plants have thousands of pneumatic control valves that would be extremely costly to replace. Modern practice uses electronic controllers with I/P converters to drive pneumatic actuators, combining digital control intelligence with pneumatic reliability.',
  },
  {
    question: 'What is the difference between single-acting and double-acting pneumatic cylinders?',
    answer:
      'A single-acting cylinder uses air pressure on one side of the piston to extend (or retract) and a spring to return it. It can only exert force in one direction under air power. A double-acting cylinder uses air pressure on both sides of the piston — one port to extend, another to retract — giving powered motion in both directions. Double-acting cylinders are more versatile and commonly used in automation, while single-acting are simpler and used for clamping, pressing and fail-safe applications.',
  },
  {
    question: 'How often should hydraulic fluid be changed?',
    answer:
      'There is no single answer — it depends on the operating conditions, fluid type and system design. Best practice is condition-based maintenance: sample the fluid regularly and test for contamination (particle count, water content, acidity, viscosity). Many well-maintained systems can run for thousands of hours between changes. However, the filters should be changed at recommended intervals or whenever the differential pressure indicator shows restriction. Regular fluid analysis is far more effective than fixed-interval changes.',
  },
  {
    question: 'What causes a hydraulic system to overheat?',
    answer:
      'Common causes include: insufficient fluid in the reservoir; blocked heat exchanger or cooler; internal leakage past worn components (pumps, valves, cylinders) converting pressure energy into heat; relief valve set too low, causing continuous bypassing; operating at excessive pressure or flow for the system design; clogged filters causing pressure drops; and incorrect fluid viscosity. Overheating degrades the fluid, accelerates seal wear and can cause system failure.',
  },
  {
    question: 'Can I use any compressed air supply for pneumatic instruments?',
    answer:
      'No. Instrument air must meet strict quality standards (ISA-7.0.01 or equivalent): it must be filtered to remove particles (typically 5 microns or better), dried to a dew point well below the minimum ambient temperature to prevent condensation, and free of oil. General plant air from a workshop compressor is not suitable — it typically contains moisture, oil and particulate contamination that would damage sensitive instrument components. A dedicated instrument air dryer and filter system is required.',
  },
  {
    question: 'What safety precautions apply to hydraulic hose inspection?',
    answer:
      "Hydraulic hoses must be inspected regularly for: external damage (cuts, abrasion, kinking); bulging or blistering (indicating internal damage); weeping or leaking at fittings; hardening or cracking of the outer cover; corrosion of fittings; and exceeding the manufacturer's recommended service life. Never use your hand to check for leaks — a pinhole leak in a high-pressure hose can inject fluid through the skin (a serious medical emergency). Use a piece of cardboard or paper to detect fine leaks.",
  },
];

const MOETModule5Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.4 · Subsection 3"
        title="Pneumatic and Hydraulic Controls"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Pneumatic and hydraulic control systems, components and maintenance.
          </p>

          <TLDR
            points={[
              'Pneumatic: uses compressed air; 3-15 psi signal standard.',
              'Hydraulic: uses oil under pressure; high force, compact.',
              'I/P converter: bridges electronic and pneumatic systems.',
              'Safety: stored energy hazards exist in both systems.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the operating principles of pneumatic and hydraulic systems',
              'Identify the key components of pneumatic and hydraulic circuits',
              'Describe the 3-15 psi pneumatic signal standard and I/P conversion',
              'Explain fail-safe valve actions and their importance in process safety',
              'Identify safety hazards associated with compressed air and hydraulic pressure',
              'Describe routine maintenance requirements for fluid power systems under ST1426',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air quality:</strong> instrument air must be clean, dry and oil-free.
              </li>
              <li>
                <strong>Fluid analysis:</strong> regular hydraulic fluid testing prevents failure.
              </li>
              <li>
                <strong>Fail-safe:</strong> understand valve failure modes (fail-open/closed).
              </li>
              <li>
                <strong>ST1426:</strong> fluid power systems maintenance knowledge is required.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Pneumatic control fundamentals</ContentEyebrow>

          <ConceptBlock title="Fundamentals of pneumatic control systems">
            <p>
              Pneumatic control systems use compressed air as the power medium to drive actuators,
              transmit signals and operate control elements. Despite the dominance of electronic
              control, pneumatic actuators remain ubiquitous in process industries because of their
              inherent safety advantages in hazardous areas, their mechanical simplicity and the
              enormous installed base worldwide.
            </p>
            <p>
              For the electrical maintenance technician, understanding pneumatic systems is
              essential because virtually every process plant uses pneumatic control valves — even
              when the controller, transmitters and communication networks are fully electronic. The
              interface between the electronic control system and the pneumatic actuator is a key
              area of maintenance responsibility.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Components of a pneumatic control system">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Air compressor:</strong> generates compressed air from atmospheric air —
                typically reciprocating or rotary screw type.
              </li>
              <li>
                <strong>Air receiver:</strong> storage vessel that smooths pulsations and provides a
                buffer for peak demands.
              </li>
              <li>
                <strong>Air treatment:</strong> filters, dryers and regulators that condition the
                air to instrument quality (clean, dry, oil-free).
              </li>
              <li>
                <strong>Distribution pipework:</strong> header and branch piping delivering
                instrument air to field devices.
              </li>
              <li>
                <strong>I/P converter:</strong> converts a 4-20 mA electronic signal to a 3-15 psi
                pneumatic signal.
              </li>
              <li>
                <strong>Valve positioner:</strong> ensures accurate valve position by using local
                feedback from the valve stem.
              </li>
              <li>
                <strong>Pneumatic actuator:</strong> converts air pressure into linear or rotary
                motion to position the control valve.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The 3-15 psi signal standard"
            onSite="Many existing process plants have a mixture of pneumatic and electronic instrumentation. The I/P converter is the critical interface — understanding its operation, calibration and fault modes is essential for maintenance technicians."
          >
            <p>
              The 3-15 psi standard is the pneumatic equivalent of the 4-20 mA electrical standard.
              The signal range of 12 psi (15 minus 3) corresponds to 0-100% of the controlled range.
              Like 4-20 mA, the live zero at 3 psi allows distinction between a genuine zero reading
              and a supply failure.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Pneumatic (psi)</th>
                    <th className="py-2 pr-4 font-medium text-white">Electrical (mA)</th>
                    <th className="py-2 font-medium text-white">Percentage</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">3</td>
                    <td className="py-2 pr-4">4</td>
                    <td className="py-2">0%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">6</td>
                    <td className="py-2 pr-4">8</td>
                    <td className="py-2">25%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">9</td>
                    <td className="py-2 pr-4">12</td>
                    <td className="py-2">50%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">12</td>
                    <td className="py-2 pr-4">16</td>
                    <td className="py-2">75%</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">15</td>
                    <td className="py-2 pr-4">20</td>
                    <td className="py-2">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Hydraulic control fundamentals</ContentEyebrow>

          <ConceptBlock title="Fundamentals of hydraulic control systems">
            <p>
              Hydraulic systems use pressurised fluid (typically mineral oil or synthetic hydraulic
              fluid) to transmit force and motion. The fundamental principle is Pascal&apos;s law:
              pressure applied to a confined fluid is transmitted equally in all directions. This
              allows hydraulic systems to multiply force, making them ideal for applications
              requiring high force in a compact space.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Components of a hydraulic system">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hydraulic power unit (HPU):</strong> electric motor, pump, reservoir,
                filters, cooler and relief valve — the heart of the system.
              </li>
              <li>
                <strong>Pump:</strong> converts mechanical energy from the motor into hydraulic
                pressure (gear, vane or piston types).
              </li>
              <li>
                <strong>Reservoir (tank):</strong> stores the hydraulic fluid, allows air separation
                and heat dissipation.
              </li>
              <li>
                <strong>Directional control valves:</strong> solenoid or pilot-operated valves that
                direct fluid to the actuators.
              </li>
              <li>
                <strong>Pressure relief valve:</strong> limits maximum system pressure to protect
                components — a critical safety device.
              </li>
              <li>
                <strong>Flow control valves:</strong> regulate the speed of actuator movement by
                controlling fluid flow rate.
              </li>
              <li>
                <strong>Actuators:</strong> cylinders (linear motion) and motors (rotary motion)
                that perform the physical work.
              </li>
              <li>
                <strong>Accumulators:</strong> pressurised vessels that store hydraulic energy for
                peak demands or emergency operation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pneumatic vs hydraulic comparison"
            onSite="In many industrial plants, you will encounter both systems — pneumatic actuators on control valves and hydraulic systems on presses, injection moulding machines, and heavy mechanical equipment. Understanding both is essential for the multi-skilled maintenance technician."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Characteristic</th>
                    <th className="py-2 pr-4 font-medium text-white">Pneumatic</th>
                    <th className="py-2 font-medium text-white">Hydraulic</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Medium</td>
                    <td className="py-2 pr-4">Compressed air (compressible)</td>
                    <td className="py-2">Oil (incompressible)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Pressure range</td>
                    <td className="py-2 pr-4">6-10 bar typical</td>
                    <td className="py-2">100-350 bar typical</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Force capability</td>
                    <td className="py-2 pr-4">Low to moderate</td>
                    <td className="py-2">Very high</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Speed</td>
                    <td className="py-2 pr-4">Fast but imprecise</td>
                    <td className="py-2">Precise speed control</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Cleanliness</td>
                    <td className="py-2 pr-4">Clean exhaust (air)</td>
                    <td className="py-2">Potential oil leaks</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Hazardous areas</td>
                    <td className="py-2 pr-4">Intrinsically safe</td>
                    <td className="py-2">Not intrinsically safe</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Electro-pneumatic and electro-hydraulic interfaces</ContentEyebrow>

          <ConceptBlock
            title="Electro-pneumatic and electro-hydraulic interfaces"
            onSite="Carry a pneumatic test gauge and a 4-20 mA loop calibrator together when fault-finding control valve problems. You can then quickly check both the electrical and pneumatic sides of the interface at the valve."
          >
            <p>
              Modern industrial control systems are predominantly electronic or digital, but the
              final control elements are often pneumatic or hydraulic. The interface between these
              domains — the electro-pneumatic or electro-hydraulic interface — is a critical area
              for the electrical maintenance technician, as faults at this interface are common and
              can be difficult to diagnose without understanding both sides.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Electro-pneumatic components">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>I/P converter:</strong> converts 4-20 mA to 3-15 psi — the primary
                proportional interface for analogue control valve positioning.
              </li>
              <li>
                <strong>Solenoid valve:</strong> converts digital (on/off) electrical signals to
                pneumatic switching — used for discrete actuators and safety systems.
              </li>
              <li>
                <strong>Smart positioner:</strong> combines I/P conversion, position feedback and
                diagnostics in a single device — increasingly common in modern plants.
              </li>
              <li>
                <strong>Pneumatic limit switch:</strong> converts valve position into a pneumatic
                signal for non-electrical areas.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electro-hydraulic components">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solenoid directional valve:</strong> uses electrical solenoids to shift a
                hydraulic spool valve, directing oil flow to actuators.
              </li>
              <li>
                <strong>Proportional valve:</strong> provides proportional control of hydraulic flow
                or pressure from an analogue electrical signal.
              </li>
              <li>
                <strong>Servo valve:</strong> high-precision proportional valve used in closed-loop
                position, velocity or force control systems.
              </li>
              <li>
                <strong>Pressure transducer:</strong> converts hydraulic pressure into a 4-20 mA or
                digital signal for monitoring and control.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common interface faults"
            whatHappens={
              <p>
                When a control valve is not responding correctly, the fault could be in the
                electronic signal chain, the electro-pneumatic interface, or the pneumatic actuator.
              </p>
            }
            doInstead={
              <p>
                A systematic approach is essential: check the controller output signal (4-20 mA),
                verify the I/P converter output (3-15 psi), check the positioner output, and finally
                check the valve position. Isolating the fault to the correct domain saves
                significant time and avoids the common problem of electrical technicians blaming
                instrument engineers and vice versa.
              </p>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Safety and maintenance</ContentEyebrow>

          <ConceptBlock
            title="Safety considerations and maintenance requirements"
            onSite="Under the Pressure Systems Safety Regulations 2000, certain pneumatic and hydraulic components (receivers, accumulators, high-pressure vessels) require a written scheme of examination prepared by a competent person. As a maintenance technician, you must ensure these examinations are carried out at the specified intervals and that any defects found are rectified before the system is returned to service."
          >
            <p>
              Both pneumatic and hydraulic systems store significant energy in compressed fluids,
              springs and accumulators. This stored energy presents serious safety hazards that must
              be understood and managed by every maintenance technician. The Provision and Use of
              Work Equipment Regulations (PUWER) 1998 and the Pressure Systems Safety Regulations
              2000 provide the regulatory framework for safe operation and maintenance of these
              systems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Pneumatic hazards">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>High-velocity air jets causing skin penetration.</li>
              <li>Noise damage from venting or leaks.</li>
              <li>Eye injuries from blown debris.</li>
              <li>Whiplash from unsecured hoses.</li>
              <li>Spring-loaded actuators releasing when air is removed.</li>
              <li>Asphyxiation in confined spaces (nitrogen-driven systems).</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Hydraulic hazards">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Fluid injection through skin from pinhole leaks.</li>
              <li>Burns from hot hydraulic fluid.</li>
              <li>Crushing from uncontrolled actuator movement.</li>
              <li>Accumulator energy release after pump shutdown.</li>
              <li>Slip hazards from oil leaks.</li>
              <li>Fire risk from oil mist or spray on hot surfaces.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Routine maintenance checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pneumatic:</strong> check air quality (moisture, oil), drain condensate from
                receivers and traps, replace filters, check for leaks (using ultrasonic leak
                detector), verify regulator settings, inspect hoses and fittings.
              </li>
              <li>
                <strong>Hydraulic:</strong> check fluid level and condition, sample fluid for
                analysis, change filters (pressure and return line), inspect hoses for damage, check
                for leaks, monitor system pressure and temperature, verify relief valve settings.
              </li>
              <li>
                <strong>Both:</strong> test safety devices (relief valves, emergency stops), check
                actuator operation and stroke, verify control signal calibration, inspect mounting
                and support structures.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Pneumatic signal standard: 3-15 psi (0.2-1.0 bar). Electronic signal standard: 4-20 mA. The I/P converter bridges the two, and both use a live zero for fault detection.',
              'Always depressurise before maintenance, and discharge hydraulic accumulators before starting work.',
              'Never check for leaks with your hand — use cardboard or paper to detect fine leaks.',
              'Lock out/tag out all energy sources before work begins.',
              'The Pressure Systems Safety Regulations 2000 govern pressure equipment such as receivers and accumulators.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  PID Control Loops
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Control Valves and Actuators
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section4_3;
