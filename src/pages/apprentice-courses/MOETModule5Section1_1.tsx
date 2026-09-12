/**
 * MOET · Module 5 · Section 1 · Subsection 1 — Principles of Sensing
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course did not enumerate a
 * Module 5 KSB list, so the statements below are reused verbatim from the
 * Module 1/3/4 lists it did supply, matched by topic — ST1426's KSBs are not
 * restricted to a single module of this course, and every quote here is
 * copied character-for-character from the brief.
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
 *              · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Accuracy note: the original's BS 7671 references (Reg 132.5.2, 131.6,
 * 131.6.4, Section 528, Reg 528.2/528.3.4, Reg 444.5.7, Chapter 44, Reg
 * 414.1.2/414.2/414.3) are kept as prose exactly as written, NOT promoted to
 * a RegsCallout — I could not verify the wording against the RAG or a
 * primary source in this pass, and the brief says to leave it as prose when
 * in doubt. The BS 7671 edition cited (2018+A4:2026) is current. No GS38,
 * thermography, test-interval or C&G-qualification claims appear on this
 * page.
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
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Principles of Sensing - MOET Module 5 Section 1.1';
const DESCRIPTION =
  'Analogue versus digital sensing for maintenance technicians: the 4-20 mA current loop and live zero, 0-10 V signals, PT100 and limit switches, resolution, screening and loop fault-finding. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'analogue-vs-discrete',
    question:
      'A limit switch on a machine guard and a PT100 in a bearing housing produce which types of signal respectively?',
    options: [
      'Both produce analogue signals, because both are field devices',
      'The limit switch produces a digital (discrete) signal with two states; the PT100 produces an analogue signal that varies continuously',
      'The limit switch produces an analogue signal; the PT100 produces a digital signal',
      'Both produce digital signals, because both are wired back to a PLC',
    ],
    correctIndex: 1,
    explanation:
      'A limit switch has exactly two meaningful states — made or broken — so it produces a digital (discrete) signal that the PLC reads as a single bit. A PT100 changes resistance smoothly with temperature, so it produces an analogue quantity that must be converted into a number by an analogue input card or a transmitter. The distinction drives how you wire it, how you test it and what a fault looks like.',
  },
  {
    id: 'live-zero-purpose',
    question: 'Why does a 4-20 mA transmitter use 4 mA rather than 0 mA to represent 0 %?',
    options: [
      'Because 0 mA would overheat the analogue input card',
      'Because the transmitter cannot generate a current lower than 4 mA',
      'Because a live zero distinguishes a genuine zero reading from a broken wire or dead loop, which both give 0 mA',
      'Because 4 mA is the minimum current a multimeter can measure accurately',
    ],
    correctIndex: 2,
    explanation:
      'This is the live zero. If 0 % were represented by 0 mA, a broken conductor, a pulled terminal or a failed power supply would all read as a perfectly valid 0 % and nobody would know. With 4 mA as the bottom of the span, 0 mA can only mean the loop is dead, so the control system can raise an alarm rather than silently trusting a false zero. The 4 mA also gives a 2-wire transmitter a guaranteed minimum current to power its own electronics.',
  },
  {
    id: 'loop-maths-midscale',
    question:
      'A pressure transmitter is ranged 0-250 bar over a 4-20 mA output. You measure 12 mA in the loop. What pressure is the transmitter reporting?',
    options: ['62.5 bar', '125 bar', '150 bar', '187.5 bar'],
    correctIndex: 1,
    explanation:
      'The span is 20 - 4 = 16 mA. The measured current is 12 mA, so the fraction of span is (12 - 4) / 16 = 8 / 16 = 0.5, which is 50 %. Half of 250 bar is 125 bar. Always subtract the 4 mA offset before dividing — treating 12 mA as 60 % of 20 mA is the single most common scaling error on site.',
  },
  {
    id: 'screen-earthing',
    question:
      'A screened instrument cable runs from a field transmitter back to a marshalling panel. Where should the screen normally be earthed?',
    options: [
      'At both ends, to give the lowest possible screen resistance',
      'At one end only, normally the panel end, so that no circulating current can flow along the screen',
      'Nowhere — the screen should be left floating at both ends',
      'At the field end only, because that is where the noise originates',
    ],
    correctIndex: 1,
    explanation:
      'Earthing a screen at one end only gives it a reference potential without creating a loop. If the screen is earthed at both ends and a potential difference exists between those two earths — which it usually does across a large site — current circulates along the screen and injects noise into the very signal it is meant to protect. The panel end is the normal choice because it is the controlled, accessible earth reference.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following field devices produces a discrete (digital) signal rather than an analogue one?',
    options: [
      'A PT100 resistance thermometer in a motor bearing',
      'A float-operated high-level switch in a sump',
      'A 4-20 mA differential pressure transmitter across a filter',
      'A 0-10 V vibration transducer on a fan bearing',
    ],
    correctAnswer: 1,
    explanation:
      'A float switch has two states only — made or broken — so it is a discrete or digital device and is wired to a digital input. The PT100, the differential pressure transmitter and the vibration transducer all produce continuously variable quantities and are wired to analogue inputs.',
  },
  {
    id: 2,
    question:
      'A 4-20 mA loop is preferred over a voltage signal for long field runs mainly because:',
    options: [
      'Current signals travel faster along a cable than voltage signals',
      'The current is the same at every point in a series loop, so cable resistance does not change the value read at the far end',
      'Current signals cannot be affected by electromagnetic interference of any kind',
      'A current loop needs no power supply at all',
    ],
    correctAnswer: 1,
    explanation:
      'In a series loop the same current flows through every component, so volt drop along the cable does not alter the signal value — the transmitter simply raises its output voltage slightly to push the same current through the extra resistance. A voltage signal, by contrast, is divided down by cable resistance and the receiving end reads low. Current loops are more immune to interference than voltage signals but are not immune.',
  },
  {
    id: 3,
    question:
      'A level transmitter is ranged 0-8 m over 4-20 mA. The loop current measures 8 mA. What level is being reported?',
    options: ['1.6 m', '2.0 m', '3.2 m', '4.0 m'],
    correctAnswer: 1,
    explanation:
      'Span = 16 mA. Fraction of span = (8 - 4) / 16 = 4 / 16 = 0.25, so 25 %. 25 % of 8 m = 2.0 m. Subtracting the 4 mA live zero first is essential; 8 / 20 would wrongly give 40 % and 3.2 m.',
  },
  {
    id: 4,
    question:
      'A 4-20 mA signal is developed across a 250 ohm sense resistor at a PLC analogue input. What voltage appears across that resistor at full scale?',
    options: ['1 V', '2.5 V', '5 V', '10 V'],
    correctAnswer: 2,
    explanation:
      'V = I x R. At 20 mA, V = 0.020 x 250 = 5 V. At 4 mA it is 0.004 x 250 = 1 V. This is why 250 ohm is such a common sense resistor value — it turns a 4-20 mA loop into a 1-5 V signal that a standard voltage input can read.',
  },
  {
    id: 5,
    question: 'A 2-wire (loop-powered) transmitter is best described as:',
    options: [
      'A transmitter with its own separate mains supply and two signal wires back to the panel',
      'A transmitter that draws its operating power from the same two conductors that carry the 4-20 mA signal',
      'A transmitter that outputs two independent 4-20 mA signals',
      'A transmitter that requires two separate earth connections',
    ],
    correctAnswer: 1,
    explanation:
      'A 2-wire transmitter takes its power from the loop itself. It regulates how much current it draws — never less than about 3.5 mA — so the same pair of conductors carries both the supply and the measurement. This is why a loop-powered device must never be allowed to draw less than 4 mA in normal operation: below that it would starve its own electronics.',
  },
  {
    id: 6,
    question:
      'Under the NAMUR NE 43 convention, a transmitter that detects an internal sensor failure will typically drive its output to:',
    options: [
      'Exactly 4.00 mA, so the reading sits at the bottom of the range',
      'Exactly 12.00 mA, so the reading sits at mid-scale',
      'Below about 3.6 mA or above about 21 mA, outside the valid measuring range',
      '0 mA, so that the loop is completely dead',
    ],
    correctAnswer: 2,
    explanation:
      'NAMUR NE 43 defines a valid measuring range of roughly 3.8-20.5 mA and reserves the regions below about 3.6 mA and above about 21 mA for fault signalling. Driving the output outside the valid band lets the control system distinguish a genuine end-of-range process value from a device that knows it has failed. Sitting at exactly 4 mA would be indistinguishable from a real 0 % reading.',
  },
  {
    id: 7,
    question:
      'A PT100 sensor is wired with three conductors back to its transmitter. The purpose of the third conductor is to:',
    options: [
      'Provide a spare in case one of the other two conductors fails',
      'Allow the transmitter to measure and cancel the resistance of the connecting leads',
      'Carry the 4-20 mA output signal separately from the sensor supply',
      'Provide an earth connection for the sensor sheath',
    ],
    correctAnswer: 1,
    explanation:
      'A PT100 is only 100 ohm at 0 degrees C, so even a couple of ohms of lead resistance is a significant error. The third conductor lets the transmitter measure the resistance of one lead and subtract an equal amount from the total, cancelling the lead effect. A 4-wire connection does the job even better by using two conductors purely for excitation current and two purely for voltage sensing.',
  },
  {
    id: 8,
    question:
      'A 0-10 V control signal is run 80 m from a BMS panel to a damper actuator using a small cross-sectional area cable. The most likely consequence is:',
    options: [
      'The actuator will not move at all until the signal exceeds 5 V',
      'The signal seen at the actuator will be lower than the signal sent, so the damper under-travels',
      'The signal will be inverted at the actuator',
      'The actuator will overheat because of the additional cable resistance',
    ],
    correctAnswer: 1,
    explanation:
      'A voltage signal is divided between the cable resistance and the input impedance of the receiving device, so the far end sees less than was transmitted. On a long run with a small conductor the error can be several per cent, and the damper never reaches full open. This is exactly the weakness that a 4-20 mA current loop does not suffer from, which is why current is preferred for long field runs.',
  },
  {
    id: 9,
    question:
      'An HMI reads 40 degrees C from a transmitter ranged 0-160 degrees C, but a calibrated contact thermometer on the pipe reads about 96 degrees C. You measure 14.0 mA in the loop. What does this tell you?',
    options: [
      'The transmitter has failed and must be replaced',
      'The field signal is approximately correct and the fault lies downstream, in the input card or the scaling',
      'The loop has a broken conductor',
      'The sense resistor at the input card is open circuit',
    ],
    correctAnswer: 1,
    explanation:
      '14.0 mA corresponds to (14.0 - 4) / 16 = 0.625, which is 62.5 % of 160 degrees C = 100 degrees C. That agrees closely with the contact thermometer, so the sensor and transmitter are doing their job. For the HMI to display 40 degrees C it must believe the current is 8 mA (40/160 = 25 %; 4 + 0.25 x 16 = 8 mA), so the error has been introduced after the field signal — a scaling mismatch, a wrong range in the PLC, or a faulty input channel.',
  },
  {
    id: 10,
    question:
      'A pressure transmitter is re-ranged on site from 0-6 bar to 0-10 bar, but nobody updates the PLC scaling. At a true pressure of 5 bar, what will the HMI display?',
    options: ['3 bar', '5 bar', '6 bar', '8.3 bar'],
    correctAnswer: 0,
    explanation:
      'At 5 bar on a 0-10 bar range the transmitter outputs 4 + 16 x (5/10) = 12 mA. The PLC still believes the range is 0-6 bar, so it reads 12 mA as 50 % of 6 bar = 3 bar. The display reads low by the ratio of the two ranges (6/10 = 0.6; 5 x 0.6 = 3). Re-ranging a transmitter without updating the receiving scaling is one of the most common and most dangerous instrumentation errors.',
  },
  {
    id: 11,
    question:
      'A screened instrument cable has its screen bonded to earth at both the field end and the panel end. The most likely symptom is:',
    options: [
      'The signal will be completely lost',
      'A noisy, drifting or mains-frequency-modulated reading caused by circulating current in the screen',
      'The transmitter will draw excessive current and trip its supply',
      'The reading will read exactly 4 mA at all times',
    ],
    correctAnswer: 1,
    explanation:
      'Two earth points at different potentials drive current along the screen. That current couples into the signal conductors and shows up as a noisy or slowly drifting reading, often with a mains-frequency component. The cure is to break one of the connections so the screen is earthed at one end only, normally the panel end.',
  },
  {
    id: 12,
    question:
      'You need to prove that a PLC analogue input and its scaling are correct, without relying on the field device. The correct tool and mode is:',
    options: [
      'A loop calibrator in simulate mode, connected in place of the transmitter with the existing loop supply still connected',
      'A loop calibrator in source mode, disconnected from the loop supply and injecting its own 4-20 mA into the input',
      'An insulation resistance tester at 500 V applied across the input terminals',
      'A clamp meter placed around the outside of the multicore instrument cable',
    ],
    correctAnswer: 1,
    explanation:
      'Source mode means the calibrator supplies both the voltage and the current, so it can drive the analogue input on its own with the loop supply isolated. Simulate mode makes the calibrator behave like a 2-wire transmitter and therefore still needs the existing loop power supply — useful, but a different job. An insulation tester would destroy the input, and a clamp around a multicore reads the vector sum of all conductors, which is not the loop current.',
  },
];

const faqs = [
  {
    question: 'Why do so many instruments still use 4-20 mA when digital fieldbuses exist?',
    answer:
      'Because it is simple, robust, cheap and universally understood. A 4-20 mA loop needs only a twisted pair, is unaffected by cable volt drop, fails in a way that can be detected, and can be tested by any technician with a multimeter. Digital protocols such as Profibus PA, Foundation Fieldbus and industrial Ethernet carry far more information, but they need trained commissioning, specific hardware and specialist diagnostics. Most plants run a mixture, and HART lets a digital conversation ride on top of an ordinary 4-20 mA loop without disturbing the analogue value.',
  },
  {
    question: 'What is the difference between a sensor and a transmitter?',
    answer:
      'The sensor is the element that responds to the physical quantity — the platinum element in a PT100, the diaphragm in a pressure cell, the thermocouple junction. It usually produces a small, non-standard signal such as a resistance change or a few millivolts. The transmitter is the electronics that excites the sensor, linearises the result and converts it into a standard signal such as 4-20 mA that can travel a long way and be understood by any control system. A great many so-called sensor faults are actually transmitter or wiring faults.',
  },
  {
    question: 'Can I measure loop current without breaking into the loop?',
    answer:
      'Sometimes. Many marshalling panels and field terminal boxes have dedicated test terminals or a shorting link that lets a milliammeter be inserted without interrupting the loop, and some loop calibrators can be inserted in a break-free way. Where those are not fitted, an alternative is to measure the voltage across a known sense resistor and calculate the current — 1 V across 250 ohm is 4 mA, 5 V is 20 mA. Never break a live loop on a running plant without agreement, because dropping the signal to 0 mA may trip the process or drive a control loop to a limit.',
  },
  {
    question: 'Why does my analogue reading jump around even though the process is steady?',
    answer:
      'Look at wiring and environment before you suspect the instrument. Common causes are: a screen earthed at both ends creating a circulating current; instrument cable run in the same tray or trunking as a variable speed drive output; a loose or corroded terminal; a shared 0 V rail with a heavily loaded device; an input filter or damping setting turned right down; or a genuinely noisy process such as a pump running near its surge point. Compare the field current with the displayed value first — that immediately tells you whether the noise is arriving from the field or being created inside the panel.',
  },
  {
    question: 'How much resolution do I actually get from a PLC analogue input?',
    answer:
      'It depends on the converter. A 12-bit converter divides its input range into 4096 steps, so a 0-100 degrees C span mapped across the full converter range gives roughly 100 / 4096, about 0.024 degrees C per step. That is far finer than the accuracy of most sensors, so resolution is rarely the limiting factor — the sensor tolerance, the transmitter accuracy and the installation usually dominate the total error. Do not confuse resolution with accuracy: a display showing two decimal places is not evidence that the measurement is good to two decimal places.',
  },
  {
    question: 'Does BS 7671 apply to instrumentation and control wiring?',
    answer:
      'Yes, where the wiring forms part of an electrical installation within the scope of BS 7671. Reg 132.5.2 requires that the choice of wiring system and method of installation includes consideration of electromagnetic interference, and that the installation is arranged so that no mutual detrimental influence occurs between electrical and non-electrical installations. Reg 131.6 lists segregation and screening of circuits, coordination of protective devices, SPDs and proper earthing among the measures against voltage and electromagnetic disturbances. Section 528 covers proximity to other services, and Reg 528.2 confirms that even circuits of the same voltage band may require segregation or separation. Machinery-specific wiring is additionally covered by BS EN 60204-1.',
  },
  {
    question: 'Is a 24 V DC instrument supply automatically SELV?',
    answer:
      'No. Under BS 7671 Reg 414.1.2 the use of SELV or PELV in accordance with Section 414 is a protective measure in all situations, but only if the system actually meets Section 414 — which includes being supplied from one of the sources listed in Reg 414.3, such as a safety isolating transformer to BS EN 61558-2-6 or BS EN 61558-2-8, an equivalent current source, an electrochemical source or independent generator, or an electronic device that cannot exceed the extra-low voltage limits even under internal fault. The NOTE to Reg 414.2 makes the point directly: a supply that provides only simple separation and does not meet the source requirements of 414.3 may fall under the FELV rules of Reg 411.7 instead. Check the nameplate and the drawing before you describe a panel supply as SELV.',
  },
];

const MOETModule5Section1_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.1 · Subsection 1"
        title="Principles of Sensing"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Analogue and digital signals, the 4-20 mA current loop, screening and loop fault-finding
            — the instrumentation grounding every measurement chain on a maintained site depends on.
          </p>

          <TLDR
            points={[
              'Digital (discrete): Two states only — a limit switch, float switch or pressure switch is made or broken.',
              'Analogue: A continuously varying value — a PT100 changes resistance smoothly with temperature.',
              '4-20 mA: The plant standard. Current is unaffected by cable volt drop, and 4 mA is a live zero.',
              'Live zero: 0 mA can only mean a dead loop, so a broken wire cannot masquerade as a real 0 %.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain what sensors do in a plant and why the maintenance technician cares',
              'Distinguish analogue from digital (discrete) signals using concrete plant examples',
              'Describe the 4-20 mA current loop and justify the live zero at 4 mA',
              'Compare loop-powered 2-wire devices with separately powered 3-wire and 4-wire devices',
              'Convert between milliamps, percentage of span and engineering units without error',
              'Apply screening, earthing and segregation principles to instrument cabling',
              'Fault-find a 4-20 mA loop systematically with a multimeter and a loop calibrator',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault-finding:</strong> Measure the loop current first — it splits the fault
                into field side or panel side.
              </li>
              <li>
                <strong>Loop maths:</strong> Always subtract the 4 mA offset before working out
                percentage of span.
              </li>
              <li>
                <strong>Installation:</strong> Screen earthed at one end, segregated from drive and
                power cables.
              </li>
              <li>
                <strong>ST1426:</strong> Maps to instrumentation and control system maintenance
                knowledge.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>What sensors do in plant</ContentEyebrow>

          <ConceptBlock title="Every automated process depends on the same measurement chain">
            <p>
              Every automated process on a site depends on the same simple chain: something in the
              plant is measured, the measurement is turned into an electrical signal, a controller
              decides what to do with it, and a final element — a valve, a drive, a contactor —
              acts. Break any link in that chain and the plant either stops or, worse, carries on
              running on a value that is no longer true. As a maintenance technician you own that
              chain end to end.
            </p>
            <p>
              A sensor is the part that responds to the physical world. It might be a platinum
              element whose resistance rises with temperature, a diaphragm that flexes under
              pressure, a coil that detects a metal target, or a piezoelectric crystal that responds
              to vibration. What every sensor has in common is that its raw output is small,
              non-standard and usually unsuitable for sending any distance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The measurement chain — and where it fails">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Process connection:</strong> The thermowell, tapping point or mounting
                bracket. Blocked impulse lines and loose brackets cause more &quot;instrument
                faults&quot; than instruments do.
              </li>
              <li>
                <strong>Sensing element:</strong> The PT100, thermocouple, diaphragm or coil that
                actually responds to the process.
              </li>
              <li>
                <strong>Transmitter:</strong> Excites the element, linearises it and converts it to
                a standard signal such as 4-20 mA.
              </li>
              <li>
                <strong>Field wiring:</strong> Screened pair, glands, junction boxes, marshalling
                terminals. The single most common location of a genuine fault.
              </li>
              <li>
                <strong>Input card:</strong> Converts the analogue signal into a number the
                processor can use.
              </li>
              <li>
                <strong>Scaling and display:</strong> Turns raw counts into engineering units on the
                HMI. A silent source of large errors.
              </li>
            </ul>
            <p>
              Notice how much of that chain is electrical rather than instrument-specific. You do
              not need to be a calibration specialist to be genuinely useful on an instrument fault.
              You need to understand what the signal is supposed to look like, be able to measure
              it, and know which half of the chain the evidence points to. That is the whole purpose
              of this section.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Typical measurements on a maintained site">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Measurement</th>
                    <th className="py-2 pr-4 font-medium text-white">Typical device</th>
                    <th className="py-2 pr-4 font-medium text-white">Signal type</th>
                    <th className="py-2 font-medium text-white">Why it matters</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Temperature</td>
                    <td className="py-2 pr-4">PT100 or thermocouple</td>
                    <td className="py-2 pr-4">Analogue</td>
                    <td className="py-2">Bearing health, product quality, trip protection</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Pressure</td>
                    <td className="py-2 pr-4">Piezoresistive transmitter</td>
                    <td className="py-2 pr-4">Analogue</td>
                    <td className="py-2">Pump performance, filter blockage, safety limits</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Level</td>
                    <td className="py-2 pr-4">Radar, ultrasonic or hydrostatic</td>
                    <td className="py-2 pr-4">Analogue</td>
                    <td className="py-2">Tank inventory, pump dry-run protection</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">High level alarm</td>
                    <td className="py-2 pr-4">Float or vibrating fork</td>
                    <td className="py-2 pr-4">Digital</td>
                    <td className="py-2">Overfill prevention, independent of the analogue level</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Guard position</td>
                    <td className="py-2 pr-4">Limit switch or interlock switch</td>
                    <td className="py-2 pr-4">Digital</td>
                    <td className="py-2">Machine safety, permissive to start</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Flow</td>
                    <td className="py-2 pr-4">Electromagnetic or vortex meter</td>
                    <td className="py-2 pr-4">Analogue or pulse</td>
                    <td className="py-2">Batching, energy monitoring, cooling proof</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Key point:</strong> Notice that level appears twice — once as an analogue
              measurement and once as an independent digital high-level switch. That is deliberate.
              Safety-related functions are commonly given their own discrete device so that a fault
              in the analogue measurement chain cannot disable the protection. When you are asked to
              disable an instrument for maintenance, always find out whether it feeds a protective
              function.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Analogue versus digital signals</ContentEyebrow>

          <ConceptBlock title="The single most useful distinction in instrumentation">
            <p>
              The single most useful distinction in instrumentation is between a signal that varies
              continuously and a signal that has only two states. It determines the type of input
              card, the wiring, the test method and what a fault looks like. Get this clear and the
              rest of the subject falls into place.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Analogue — example: PT100 temperature">
            <p>
              A PT100 is a platinum resistance thermometer whose resistance is 100 ohm at 0 degrees
              C and rises smoothly and almost linearly as temperature increases. There is no step,
              no threshold and no jump — every temperature has its own resistance.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Output is a continuously variable quantity — resistance, voltage or current.</li>
              <li>Needs a transmitter or a dedicated analogue input to turn it into a number.</li>
              <li>
                Carries a value, so it supports trending, alarms at any threshold and closed-loop
                control.
              </li>
              <li>
                Can be wrong by a small amount without looking obviously broken — the reason
                calibration exists.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Digital (discrete) — example: limit switch">
            <p>
              A limit switch on a machine guard has exactly two meaningful conditions: the guard is
              closed and the contact is made, or the guard is open and the contact is broken.
              Nothing in between is a legitimate state.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Output is a single bit — on or off, 1 or 0, true or false.</li>
              <li>Wired to a digital input, typically 24 V DC in industry.</li>
              <li>
                Carries a state, not a value — you cannot trend how nearly the guard was shut.
              </li>
              <li>
                Fails obviously in most cases, which is why it is favoured for interlocks and trips.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="How much, or has it happened yet?">
            <p>
              A useful way to think about it: an analogue signal answers the question &quot;how
              much?&quot; and a digital signal answers the question &quot;has it happened yet?&quot;
              A tank level transmitter tells you the tank is 63 % full. A high-level float switch
              tells you the tank has reached the point at which somebody should be worried. Both are
              legitimate, and most plants use both on the same vessel.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Where the boundary blurs">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pulse and frequency signals:</strong> A flow meter or an encoder produces a
                train of pulses. Each pulse is digital, but the rate carries an analogue-like value.
                These go to high-speed counter inputs, not standard digital inputs.
              </li>
              <li>
                <strong>Smart transmitters:</strong> A HART transmitter produces a 4-20 mA analogue
                signal with a digital conversation superimposed on it. The analogue value and the
                digital data coexist on the same pair.
              </li>
              <li>
                <strong>Fully digital devices:</strong> A Profibus PA or industrial Ethernet
                instrument sends its value as a number on a network. There is no analogue signal to
                measure with a meter, so diagnostics move into software.
              </li>
              <li>
                <strong>Analogue devices used as switches:</strong> A pressure transmitter feeding a
                PLC comparison block behaves like a switch from the operator&apos;s point of view,
                but it is still an analogue chain and must be maintained as one.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Comparing the two signal types">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Aspect</th>
                    <th className="py-2 pr-4 font-medium text-white">
                      Analogue (PT100, 4-20 mA transmitter)
                    </th>
                    <th className="py-2 font-medium text-white">
                      Digital / discrete (limit switch)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Information carried</td>
                    <td className="py-2 pr-4">A value across a range</td>
                    <td className="py-2">One of two states</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PLC input type</td>
                    <td className="py-2 pr-4">Analogue input card with a converter</td>
                    <td className="py-2">Digital input card</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Typical test tool</td>
                    <td className="py-2 pr-4">
                      Multimeter on mA or V, loop calibrator, decade box
                    </td>
                    <td className="py-2">Multimeter on V or continuity, PLC input LED</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Effect of cable resistance</td>
                    <td className="py-2 pr-4">
                      Significant for voltage and resistance signals; negligible for current loops
                    </td>
                    <td className="py-2">Negligible unless the run is extreme</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Effect of noise</td>
                    <td className="py-2 pr-4">Shows as a wrong or unstable value</td>
                    <td className="py-2">Shows as spurious or chattering state changes</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Calibration needed</td>
                    <td className="py-2 pr-4">Yes — zero, span and linearity all matter</td>
                    <td className="py-2">
                      No calibration, but the actuation point may need setting
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Maintenance tip:</strong> When somebody reports that a reading &quot;looks
              wrong&quot;, the first question is whether the signal is analogue or digital. If it is
              digital and the state is wrong, you are looking for a wiring, contact or actuation
              problem and the answer is usually binary and quick. If it is analogue, the value may
              be plausible but incorrect, and you must compare the field signal against an
              independent reference before you conclude anything.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The 4-20 mA current loop</ContentEyebrow>

          <ConceptBlock title="Two hard problems, solved elegantly">
            <p>
              The 4-20 mA current loop is the most widely used analogue signalling method in process
              and manufacturing plant, and it has survived decades of newer technology because it
              solves two hard problems elegantly. It is immune to the volt drop that ruins voltage
              signals over distance, and it can tell the difference between a real zero and a dead
              loop.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Why current, not voltage">
            <p>
              In a series circuit the current is identical at every point. That is the whole trick.
              A transmitter 300 m from the panel does not send a fixed voltage and hope it survives
              the journey; it actively regulates the current in the loop until the correct value
              flows. If the cable resistance is higher than expected, the transmitter simply pushes
              a little harder — it raises the voltage across itself — and the current at the far end
              is unchanged.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Volt drop does not corrupt the value:</strong> Cable resistance changes how
                much voltage the loop needs, not how much current flows.
              </li>
              <li>
                <strong>Low impedance is less susceptible to capacitively coupled noise:</strong> A
                current loop is harder to disturb than a high-impedance voltage input.
              </li>
              <li>
                <strong>The loop can power the device:</strong> A 2-wire transmitter lives on the 4
                mA it must draw anyway.
              </li>
              <li>
                <strong>Simple to test:</strong> One meter in series, or one voltage reading across
                a known sense resistor, gives you the truth.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The live zero — why 4 mA and not 0 mA">
            <p>
              Suppose 0 % were represented by 0 mA. Now imagine a conductor is pulled out of a
              terminal in a field junction box. The loop current falls to 0 mA and the control
              system dutifully displays 0 %, which is a perfectly legitimate process value. Nobody
              gets an alarm. The operator may believe a tank is empty when it is full.
            </p>
            <p>
              By starting the range at 4 mA, that ambiguity disappears. A healthy transmitter never
              produces 0 mA under any process condition. Therefore 0 mA can only mean the loop is
              broken, the supply has failed or a terminal is open — and the control system can raise
              a distinct fault alarm rather than a process alarm. This is the live zero, and it is
              the reason 4-20 mA beat 0-20 mA into general use.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0 mA:</strong> Broken conductor, open terminal, failed loop supply, or a
                fuse gone in the panel.
              </li>
              <li>
                <strong>4 mA:</strong> A genuine 0 % reading from a healthy transmitter.
              </li>
              <li>
                <strong>Below about 3.6 mA or above about 21 mA:</strong> Under the NAMUR NE 43
                convention, the transmitter is signalling its own internal fault.
              </li>
              <li>
                <strong>Just over 20 mA:</strong> Process is genuinely over range — the reading is
                believable but the range is wrong for the duty.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Loop current to percentage of span">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Loop current</th>
                    <th className="py-2 pr-4 font-medium text-white">Percentage of span</th>
                    <th className="py-2 pr-4 font-medium text-white">On a 0-250 bar range</th>
                    <th className="py-2 font-medium text-white">Across a 250 ohm sense resistor</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">4.0 mA</td>
                    <td className="py-2 pr-4">0 %</td>
                    <td className="py-2 pr-4">0 bar</td>
                    <td className="py-2">1.0 V</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">8.0 mA</td>
                    <td className="py-2 pr-4">25 %</td>
                    <td className="py-2 pr-4">62.5 bar</td>
                    <td className="py-2">2.0 V</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">12.0 mA</td>
                    <td className="py-2 pr-4">50 %</td>
                    <td className="py-2 pr-4">125 bar</td>
                    <td className="py-2">3.0 V</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">16.0 mA</td>
                    <td className="py-2 pr-4">75 %</td>
                    <td className="py-2 pr-4">187.5 bar</td>
                    <td className="py-2">4.0 V</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">20.0 mA</td>
                    <td className="py-2 pr-4">100 %</td>
                    <td className="py-2 pr-4">250 bar</td>
                    <td className="py-2">5.0 V</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="The two conversions you must be able to do cold">
            <p>
              <strong>Current to engineering units.</strong> Subtract the 4 mA live zero, divide by
              the 16 mA span, then multiply by the range. For a 0-250 bar transmitter reading 14.4
              mA: (14.4 - 4) / 16 = 10.4 / 16 = 0.65, so 65 % of 250 bar = 162.5 bar.
            </p>
            <p>
              <strong>Engineering units to current.</strong> Divide by the range to get the
              fraction, multiply by 16 mA, then add 4 mA. For 20 % of span: 4 + (0.20 x 16) = 4 +
              3.2 = 7.2 mA.
            </p>
            <p>
              The mistake that catches everybody at least once is forgetting the offset. Treating 12
              mA as 60 % because 12 / 20 = 0.6 gives 150 bar instead of the correct 125 bar on the
              range above — a 25 bar error that looks perfectly plausible on a screen.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Breaking a live loop without agreement"
            whatHappens={
              <>
                Never break a live loop on a running plant without agreement from the process owner
                and a permit if one is required. Dropping the loop to 0 mA may trip the process,
                drive a control valve to a limit, or start a standby pump.
              </>
            }
            doInstead={
              <>
                Where a loop feeds a protective or trip function, the correct approach is to have
                the function inhibited or overridden under a controlled procedure before any test
                work begins.
              </>
            }
          />

          <ConceptBlock title="Awareness point — HART">
            <p>
              Many modern transmitters superimpose a low-level digital signal on the 4-20 mA loop
              using frequency shift keying. The digital signal averages to zero, so it does not
              disturb the analogue value, and it lets a handheld communicator read the device tag,
              the configured range, diagnostics and the digital process value without disconnecting
              anything. If a loop reads correctly on your meter but the device configuration is in
              question, a HART communicator is the tool that answers it.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Loop-powered and separately powered devices</ContentEyebrow>

          <ConceptBlock title="Where the device gets its power from">
            <p>
              Not every 4-20 mA device is wired the same way. The distinction that matters most for
              fault-finding is where the device gets its operating power from, because it determines
              what you should measure and what a healthy circuit looks like. At this stage you need
              awareness rather than design depth — enough to recognise the arrangement on a drawing
              and in a terminal box.
            </p>
          </ConceptBlock>

          <ConceptBlock title="2-wire, loop-powered">
            <p>
              The transmitter draws its operating power from the same two conductors that carry the
              signal. A supply — typically 24 V DC — sits in the panel, in series with the
              transmitter and the input. The transmitter behaves as a variable current sink,
              regulating the loop to between 4 mA and 20 mA depending on the measurement.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Only one screened pair to the field — cheapest to install.</li>
              <li>
                The device must operate on 4 mA at minimum, so it has a minimum terminal voltage
                requirement, often 10-12 V.
              </li>
              <li>
                Loop drive capability must be checked: supply voltage minus the transmitter minimum
                voltage sets how much resistance the loop can tolerate.
              </li>
              <li>Very common for pressure, level and temperature transmitters.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="3-wire and 4-wire, separately powered">
            <p>
              The device has its own supply connections and generates the 4-20 mA output
              independently. A 3-wire arrangement shares a common 0 V between the supply and the
              signal; a 4-wire arrangement keeps the supply and the output fully separate, often
              with the supply being mains rather than 24 V DC.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Can drive much more power — used for analysers, flow meters and anything with a
                display, heater or motor.
              </li>
              <li>
                The output is usually a current source rather than a sink, so the panel does not
                need to provide loop power.
              </li>
              <li>
                A 3-wire shared common creates the possibility of a common-mode problem if the 0 V
                reference is poor.
              </li>
              <li>
                A 4-wire device with a mains supply needs isolation and safe working procedures that
                a 24 V loop does not.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Worked example — will the loop drive?">
            <p>
              A 2-wire transmitter needs a minimum of 12 V at its terminals. The panel loop supply
              is 24 V DC and the analogue input develops the signal across a 250 ohm sense resistor.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Voltage dropped by the sense resistor at full scale: 0.020 A x 250 ohm = 5 V.</li>
              <li>Voltage left over for everything else: 24 V - 12 V - 5 V = 7 V.</li>
              <li>Maximum additional loop resistance at 20 mA: 7 V / 0.020 A = 350 ohm.</li>
            </ul>
            <p>
              So the cable, terminals, any barrier and any additional indicator in series must
              together stay under 350 ohm. Add a chart recorder with its own 250 ohm burden and you
              still have 100 ohm of margin. Add two of them and the loop will fail — typically by
              refusing to reach 20 mA, so the reading appears to saturate below full scale. That
              symptom, a loop that tracks correctly at low readings and flattens out near the top,
              is a classic sign of insufficient loop drive.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key point: which device are you looking at?">
            <p>
              Before you condemn a transmitter, establish which arrangement you are looking at. On a
              2-wire loop, measuring 24 V across the transmitter terminals with the transmitter
              disconnected proves the supply is live; measuring 24 V across those terminals with the
              transmitter connected means the transmitter is not conducting and is the suspect. On a
              4-wire device, the presence of loop current tells you nothing about the device supply,
              which must be checked separately.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>0-10 V signals and where they appear</ContentEyebrow>

          <ConceptBlock title="The other analogue standard">
            <p>
              The other analogue standard you will meet constantly is 0-10 V. It dominates building
              services — heating, ventilation and air conditioning, building management systems, and
              variable speed drive speed references — for the straightforward reason that the
              distances are short, the devices are cheap, and a voltage output is trivially easy for
              a controller to produce.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Typical 0-10 V duties">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Damper and valve actuators:</strong> A BMS output positions a modulating
                damper or a heating valve proportionally to the signal.
              </li>
              <li>
                <strong>Variable speed drive references:</strong> 0-10 V on the drive analogue input
                sets motor speed from zero to maximum.
              </li>
              <li>
                <strong>Room sensors and setpoint dials:</strong> Temperature, humidity and CO2
                sensors within a building often output 0-10 V.
              </li>
              <li>
                <strong>Lighting control:</strong> Analogue 1-10 V dimming ballasts and drivers,
                still widely installed alongside DALI.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why voltage signals are weaker over distance">
            <p>
              A voltage signal is read by a high-impedance input, so only a tiny current flows — but
              it is not zero, and the cable resistance forms a potential divider with the input
              impedance. The receiving end therefore always sees slightly less than was sent. On a
              short run in a plant room this is negligible. On an 80 m run in small cross-sectional
              area cable, with a device that draws more input current than you expected, it becomes
              a real percentage error and the actuator never quite reaches its end position.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Volt drop error:</strong> Increases with cable length, decreases with
                conductor size, and gets worse if the receiving input impedance is low.
              </li>
              <li>
                <strong>Common 0 V reference:</strong> A voltage signal is measured relative to 0 V,
                so any difference between the sending and receiving 0 V appears as a direct error.
              </li>
              <li>
                <strong>No live zero:</strong> 0 V normally means genuine zero demand, so a broken
                conductor is indistinguishable from a valid command to close or stop.
              </li>
              <li>
                <strong>The 2-10 V variant:</strong> Some equipment shifts the bottom of the range
                to 2 V precisely to recover a form of live zero, so that 0 V can be treated as a
                fault.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Choosing between 4-20 mA and 0-10 V">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Consideration</th>
                    <th className="py-2 pr-4 font-medium text-white">4-20 mA</th>
                    <th className="py-2 font-medium text-white">0-10 V</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Long cable runs</td>
                    <td className="py-2 pr-4">Excellent — value unaffected by cable resistance</td>
                    <td className="py-2">Poor — reading falls with distance</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Broken wire detection</td>
                    <td className="py-2 pr-4">Built in — 0 mA is unambiguously a fault</td>
                    <td className="py-2">None unless a 2-10 V variant is used</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Noise immunity</td>
                    <td className="py-2 pr-4">Better — low impedance loop</td>
                    <td className="py-2">Weaker — high impedance input picks up interference</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Multiple receivers</td>
                    <td className="py-2 pr-4">Series connection, limited by loop drive</td>
                    <td className="py-2">Parallel connection, limited by loading</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Typical sector</td>
                    <td className="py-2 pr-4">Process plant, manufacturing, water, energy</td>
                    <td className="py-2">Building services, HVAC, BMS, drives</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Testing</td>
                    <td className="py-2 pr-4">Meter in series, or volts across a known resistor</td>
                    <td className="py-2">
                      Meter across the signal and 0 V — quick and non-invasive
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Maintenance tip:</strong> When a 0-10 V actuator under-travels, measure the
              voltage at the controller output terminals and again at the actuator terminals. If the
              two readings differ significantly, the problem is the cable or the loading, not the
              actuator. If they agree and the actuator still under-travels, the fault is mechanical
              or in the actuator itself.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Resolution, sampling and scaling</ContentEyebrow>

          <ConceptBlock title="What happens once the signal reaches the input card">
            <p>
              Once an analogue signal reaches the input card it stops being continuous. The
              converter samples it at intervals and represents each sample as a whole number. Two
              properties follow from that — resolution, which is how finely the value is divided,
              and sampling rate, which is how often it is looked at. Both have practical
              consequences you will see on site.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Resolution">
            <p>
              Resolution is set by the number of bits in the analogue-to-digital converter. Each
              extra bit doubles the number of steps. A 12-bit converter divides its input range into
              2 to the power 12, which is 4096 steps.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>8-bit:</strong> 256 steps — coarse, rarely seen on modern process inputs.
              </li>
              <li>
                <strong>12-bit:</strong> 4096 steps — the common industrial standard.
              </li>
              <li>
                <strong>16-bit:</strong> 65,536 steps — used where fine resolution genuinely
                matters, such as weighing.
              </li>
            </ul>
            <p>
              Put numbers on it. A 12-bit input mapping a 0-100 degrees C span across its full range
              gives 100 / 4096, which is approximately 0.024 degrees C per step. That is far finer
              than the accuracy of any practical temperature sensor, which is exactly the point: on
              most loops the converter is not the weak link.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Resolution is not accuracy"
            whatHappens={
              <>
                A screen showing 47.83 degrees C has told you about its resolution and nothing at
                all about its accuracy. The true error is the accumulated effect of the sensor
                tolerance, the transmitter accuracy, the converter, the scaling and the
                installation. A sensor with a tolerance of plus or minus 0.5 degrees C displayed to
                two decimal places is still only good to plus or minus 0.5 degrees C.
              </>
            }
            doInstead={
              <>
                Never quote a displayed figure back to an operator as though the decimals were
                meaningful.
              </>
            }
          />

          <ConceptBlock title="Sampling">
            <p>
              The converter looks at the signal at a fixed rate. Between samples, the controller is
              working with the last value it took. If the process changes faster than the sampling
              rate can follow, information is lost — and worse, a fast repetitive variation can be
              misread as a slow one, an effect called aliasing.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Nyquist principle:</strong> To represent a varying signal faithfully you
                must sample at more than twice the highest frequency of interest.
              </li>
              <li>
                <strong>Aliasing:</strong> Under-sampling makes a fast oscillation appear as a slow,
                false drift — a genuine trap when chasing vibration or pulsation.
              </li>
              <li>
                <strong>PLC scan versus card update:</strong> An analogue card may update faster
                than the program scan reads it, or slower — check both before blaming a lag on the
                instrument.
              </li>
              <li>
                <strong>Damping and filtering:</strong> Transmitters and input cards both offer
                damping. It smooths noise but adds delay, which matters on a fast control loop.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Scaling">
            <p>
              Scaling is the arithmetic that turns raw converter counts into engineering units on
              the display. It exists in software, it is invisible on the plant floor, and it is a
              frequent cause of readings that are wrong but plausible. Two independent pieces of
              configuration must agree: the range programmed into the transmitter, and the range
              programmed into the receiving system.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transmitter range:</strong> What the device believes 4 mA and 20 mA
                represent.
              </li>
              <li>
                <strong>Receiving scaling:</strong> What the PLC or BMS believes those same currents
                represent.
              </li>
              <li>
                <strong>Failure mode:</strong> If they disagree, the reading is proportionally wrong
                across the whole range and nothing looks obviously broken.
              </li>
              <li>
                <strong>Discipline:</strong> Record any re-range on the loop folder and the drawing,
                and check the receiving scaling in the same visit.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> Resolution and sampling are properties of the equipment
              and rarely change. Scaling is a property of the configuration and changes whenever
              somebody touches it. When a reading is wrong by a consistent proportion rather than a
              fixed offset, suspect scaling first.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>2-wire, 3-wire and 4-wire sensor connections</ContentEyebrow>

          <ConceptBlock title="Two different uses of the same words">
            <p>
              The phrase &quot;three-wire sensor&quot; means two entirely different things depending
              on whether you are discussing a transmitter or a resistance thermometer. Confusing the
              two is a common source of wiring errors, so it is worth separating them clearly before
              going any further.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Transmitter wire count:</strong> Describes how the device gets its power
                relative to its output — 2-wire means loop-powered, 3-wire and 4-wire mean
                separately powered, as covered above.
              </li>
              <li>
                <strong>RTD wire count:</strong> Describes how many conductors connect the
                resistance element to its measuring circuit, purely to deal with lead resistance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why lead resistance matters for an RTD">
            <p>
              For a resistance thermometer the issue is straightforward and entirely about
              arithmetic. A PT100 element is 100 ohm at 0 degrees C, and rises to roughly 138.5 ohm
              at 100 degrees C. So a change of one degree corresponds to a resistance change of well
              under half an ohm. Now consider that the connecting cable might have one or two ohms
              of resistance in each conductor. If the measuring circuit cannot tell sensor
              resistance from lead resistance, the reading will be several degrees high.
            </p>
          </ConceptBlock>

          <ConceptBlock title="2-wire RTD">
            <p>
              The simplest and least accurate arrangement. The measuring circuit sees the element
              resistance plus the resistance of both leads, and has no way of separating them.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>All lead resistance is added directly to the reading, always reading high.</li>
              <li>
                Acceptable only for very short leads or where a few degrees of error do not matter.
              </li>
              <li>
                The error changes with ambient temperature as the copper lead resistance changes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="3-wire RTD">
            <p>
              The industry workhorse. A third conductor allows the measuring circuit to determine
              the resistance of one lead and subtract an equivalent amount, on the assumption that
              all three conductors are identical.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Cancels lead resistance to a good approximation for normal cable runs.</li>
              <li>
                Depends on the three conductors being the same length, size and material — never
                make up a run from mixed cable.
              </li>
              <li>
                Two conductors are commonly the same colour and joined at the element; check the
                device data before rewiring a head.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="4-wire RTD">
            <p>
              The most accurate arrangement. Two conductors carry a known excitation current through
              the element, and two separate conductors measure the voltage developed across it.
              Because effectively no current flows in the sensing pair, their resistance introduces
              no error at all.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                True four-terminal measurement — lead resistance is eliminated rather than
                approximated.
              </li>
              <li>
                Used for laboratory and reference measurements, and for critical process duties.
              </li>
              <li>
                Requires a four-wire capable input, which not every transmitter or card provides.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why PT1000 exists — and when it helps">
            <p>
              A PT1000 has the same characteristic as a PT100 but ten times the resistance: 1000 ohm
              at 0 degrees C. Because the element resistance is ten times larger while the lead
              resistance is unchanged, the proportional error from the leads is ten times smaller.
              That makes a PT1000 far more tolerant of a 2-wire connection, which is why it is
              common in building services and in packaged equipment where a 3-wire run would be
              inconvenient. If you replace a PT100 with a PT1000 without changing the transmitter
              configuration, the reading will be nonsense — always check which element the device is
              set up for.
            </p>
            <p>
              <strong>Maintenance tip:</strong> A quick sanity check on any PT100 is to disconnect
              it and measure its resistance with a meter. Around 100 ohm means it is close to
              freezing, around 110 ohm means roughly 26 degrees C, and around 138 ohm means roughly
              100 degrees C. An open circuit or a reading of a few ohms tells you the element or its
              wiring has failed, and you have your answer without touching the transmitter at all.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Noise, screening and segregation</ContentEyebrow>

          <ConceptBlock title="Instrument signals are small; power circuits are not">
            <p>
              Instrument signals are small and power circuits are not. Run them together and the
              power circuit will impress itself on the signal, either by magnetic coupling from
              current or by capacitive coupling from voltage. Variable speed drive output cables are
              the worst offenders on most sites because their fast switching edges radiate energy
              across a wide frequency range.
            </p>
          </ConceptBlock>

          <ConceptBlock title="How noise gets into a signal">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Magnetic (inductive) coupling:</strong> Current in a nearby conductor
                induces a voltage in the signal pair. Worst with high currents and long parallel
                runs. Countered by twisting the pair so that successive loops cancel.
              </li>
              <li>
                <strong>Electric (capacitive) coupling:</strong> Voltage on a nearby conductor
                couples through the capacitance between cables. Worst with fast-switching voltages.
                Countered by an earthed screen intercepting the coupling.
              </li>
              <li>
                <strong>Common impedance coupling:</strong> A shared 0 V or earth conductor carries
                another circuit&apos;s current, and the resulting volt drop appears in your signal.
                Countered by separate returns and a proper reference.
              </li>
              <li>
                <strong>Earth potential difference:</strong> Two earth points at different
                potentials drive current through any conductor joining them, including a screen
                earthed at both ends.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Good practice for instrument cabling">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Twisted pair:</strong> Use a twisted pair for every analogue signal. The
                twist is what cancels magnetically induced voltage.
              </li>
              <li>
                <strong>Overall screen:</strong> Foil or braid screen with a drain wire, terminated
                properly rather than left as a stray tail.
              </li>
              <li>
                <strong>Earth the screen at one end:</strong> Normally the panel end. Earthing at
                both ends creates a path for circulating current and defeats the purpose.
              </li>
              <li>
                <strong>Keep the screen continuous:</strong> Carry it through junction boxes on a
                dedicated terminal — do not break it and do not use it as a signal return.
              </li>
              <li>
                <strong>Separate from power:</strong> Use different trays, ducts or trunking
                compartments for instrument and power cabling. Where they must cross, cross at right
                angles rather than running parallel.
              </li>
              <li>
                <strong>Treat drive output cables as hostile:</strong> Use the drive
                manufacturer&apos;s recommended screened motor cable, terminate its screen with a
                360 degree gland, and give instrument cable the widest practical separation.
              </li>
              <li>
                <strong>Do not spare-core:</strong> Never borrow a spare core in a power multicore
                for an instrument signal, however convenient it looks at the time.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="What BS 7671:2018+A4:2026 requires">
            <p>
              Where instrument and control wiring forms part of an electrical installation within
              the scope of BS 7671, the following apply. Note that machinery wiring is additionally
              subject to BS EN 60204-1, and that the numbered requirements below are principles, not
              a substitute for reading the Regulations themselves.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 132.5.2:</strong> The choice of the type of wiring system and the method
                of installation shall include consideration of electromagnetic interference, and the
                installation shall be arranged so that no mutual detrimental influence occurs
                between electrical installations and non-electrical installations.
              </li>
              <li>
                <strong>Reg 131.6:</strong> Measures against voltage and electromagnetic
                disturbances may include surge protective devices, correct coordination of
                protective devices, segregation and screening of circuits, and proper earthing
                arrangements.
              </li>
              <li>
                <strong>Reg 131.6.4:</strong> Requirements for control, signalling, information and
                communications technology shall be included when determining the number and type of
                circuits — dedicated circuits or segregation may be needed for control and data
                systems.
              </li>
              <li>
                <strong>Section 528:</strong> Deals with proximity of wiring systems to other
                services. Reg 528.2 confirms that circuits of the same voltage band might also
                require segregation or separation, and Reg 528.3.4 requires that where an electrical
                service is in close proximity to non-electrical services the wiring system is
                suitably protected against the hazards likely to arise, with fault protection in
                accordance with Section 411.
              </li>
              <li>
                <strong>Reg 444.5.7:</strong> Equipotential bonding provided for information and
                communications technology installations for functional purposes shall be carried out
                where necessary to ensure signal integrity, electromagnetic compatibility or
                equipment performance — and BS 7671 draws a clear distinction between such
                functional bonding and protective earthing.
              </li>
              <li>
                <strong>Chapter 44:</strong> Protection against voltage disturbances and
                electromagnetic disturbances has been redrafted in the A4:2026 amendment, so do not
                work from a memory of the previous text.
              </li>
            </ul>
            <p>
              The practical message is that a cable screen provided for signal integrity is a
              functional conductor, not a protective conductor. It does not replace a circuit
              protective conductor, and it must never be relied on for fault protection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="A word on SELV and PELV in instrumentation">
            <p>
              Instrument loops usually run at 24 V DC, and it is tempting to assume that anything at
              24 V is automatically SELV. It is not. BS 7671 Reg 414.1.2 states that the use of SELV
              or PELV in accordance with Section 414 is considered a protective measure in all
              situations — but only where the system actually complies with Section 414. That
              includes being supplied from one of the sources permitted by Reg 414.3: a safety
              isolating transformer to BS EN 61558-2-6 or BS EN 61558-2-8, a current source giving
              equivalent safety, an electrochemical source or other source independent of a higher
              voltage circuit, or an electronic device arranged so that even an internal fault
              cannot raise the output terminals above extra-low voltage limits. The NOTE to Reg
              414.2 is explicit that a supply providing only simple separation, which does not meet
              Reg 414.3, may instead fall under the FELV requirements of Reg 411.7. Read the panel
              drawing and the power supply nameplate before you describe a 24 V rail as SELV.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key point: screening is an installation discipline">
            <p>
              Screening and segregation are installation disciplines, not afterthoughts. Nearly
              every persistent noise problem traces back to a decision taken at installation — a
              screen earthed twice, a signal run in a power tray, or a spare core borrowed from the
              wrong cable. When you install or modify instrument wiring, you are deciding how
              reliable that loop will be for the next twenty years.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Fault-finding a loop — worked scenario</ContentEyebrow>

          <ConceptBlock title="A single measurement splits the problem in half">
            <p>
              The great virtue of a 4-20 mA loop is that a single measurement splits the problem in
              half. If the current in the field matches the process, the fault is downstream. If it
              does not, the fault is upstream. Everything else is refinement. What follows is a
              complete worked scenario using the tools a maintenance technician actually carries.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Your tools">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Multimeter with a mA range:</strong> Inserted in series to read loop
                current, or across a known sense resistor to read it indirectly.
              </li>
              <li>
                <strong>Loop calibrator — source mode:</strong> Supplies both voltage and current,
                so it can drive an input with the loop supply isolated.
              </li>
              <li>
                <strong>Loop calibrator — simulate mode:</strong> Behaves like a 2-wire transmitter,
                drawing a set current from the existing loop supply.
              </li>
              <li>
                <strong>Loop calibrator — read or measure mode:</strong> Sits in the loop as a
                milliammeter, often with a percentage-of-span display.
              </li>
              <li>
                <strong>Independent reference:</strong> A calibrated contact thermometer, a test
                gauge, a dip tape — whatever proves what the process is actually doing.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Bearing oil cooler temperature reads low"
            situation={
              <>
                The operator reports that the outlet temperature on a bearing oil cooler shows 40
                degrees C on the HMI, but the pipework is uncomfortably hot to stand near. The
                transmitter is a 2-wire, loop-powered device ranged 0-160 degrees C on a 4-20 mA
                output. Work through it in order.
              </>
            }
            whatToDo={
              <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Establish the safety position first.</strong> Find out whether this loop
                  feeds a trip, an interlock or an automatic control action. Agree with the process
                  owner what may be disturbed, obtain any permit required, and have the trip
                  inhibited under a controlled procedure if the work demands it. Never begin by
                  breaking a loop you have not checked the consequences of breaking.
                </li>
                <li>
                  <strong>Get an independent reference.</strong> Put a calibrated contact
                  thermometer on the pipe close to the thermowell. It reads approximately 96 degrees
                  C. You now have something to compare against, which is the difference between
                  fault-finding and guessing.
                </li>
                <li>
                  <strong>Look before you meter.</strong> Check the transmitter head for a local
                  display, a fault indication, water ingress, a loose gland, corroded terminals or a
                  damaged cable. A great many analogue faults are visible.
                </li>
                <li>
                  <strong>Measure the loop current.</strong> At the marshalling terminals, use the
                  test sockets if fitted, or measure across the 250 ohm sense resistor and
                  calculate. You read <strong>14.0 mA</strong>.
                </li>
                <li>
                  <strong>Convert it.</strong> Fraction of span = (14.0 - 4) / 16 = 10 / 16 = 0.625,
                  so 62.5 % of 160 degrees C = <strong>100 degrees C</strong>. That agrees closely
                  with the contact thermometer at 96 degrees C. The sensor, the transmitter and the
                  field wiring are all doing their job.
                </li>
                <li>
                  <strong>Work out what the HMI thinks it is seeing.</strong> The display shows 40
                  degrees C. On a 0-160 degrees C range that is 40 / 160 = 25 % of span, which would
                  require 4 + (0.25 x 16) = <strong>8 mA</strong>. The loop is carrying 14 mA but
                  the system is behaving as though it were carrying 8 mA. The fault is therefore
                  downstream of your measurement point.
                </li>
                <li>
                  <strong>Prove the input card independently.</strong> Isolate the loop supply,
                  disconnect the field pair at the input terminals, and connect the loop calibrator
                  in <strong>source mode</strong>. Inject 12.00 mA. The HMI should read 50 % of 160,
                  which is 80 degrees C.
                </li>
                <li>
                  <strong>Interpret the result.</strong> If the HMI reads 80 degrees C, the input
                  card and its scaling are correct and you must look again at the connection between
                  the field pair and the input — a partially made terminal, a shunt path, or the
                  field pair landed on the wrong channel. If the HMI reads something other than 80
                  degrees C, the scaling or the channel configuration is wrong and the fault is in
                  configuration, not in wiring.
                </li>
                <li>
                  <strong>Confirm across the range.</strong> Do not accept a single point. Inject 4
                  mA, 8 mA, 12 mA, 16 mA and 20 mA and check the display reads 0, 40, 80, 120 and
                  160 degrees C. A fault that is right at one point and wrong at the others is a
                  span error; one that is wrong by the same amount at every point is a zero offset.
                </li>
                <li>
                  <strong>Restore and verify.</strong> Reconnect the field pair, restore the loop
                  supply, remove any inhibit, and confirm the HMI now agrees with the contact
                  thermometer. Record the readings taken, the cause found and the action taken in
                  the loop folder and the maintenance system.
                </li>
              </ol>
            }
          />

          <ConceptBlock title="Reading the current — what each value tells you">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Measured current</th>
                    <th className="py-2 pr-4 font-medium text-white">Interpretation</th>
                    <th className="py-2 font-medium text-white">Next step</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">0.0 mA</td>
                    <td className="py-2 pr-4">Loop is dead — open circuit or no supply</td>
                    <td className="py-2">
                      Check loop supply voltage, fuse, terminals and cable continuity
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Below about 3.6 mA</td>
                    <td className="py-2 pr-4">
                      Transmitter is signalling an internal or sensor fault
                    </td>
                    <td className="py-2">
                      Interrogate the device, check the sensor element and its wiring
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Exactly 4.0 mA, stuck</td>
                    <td className="py-2 pr-4">
                      Genuine 0 %, or a process connection that is blocked or isolated
                    </td>
                    <td className="py-2">
                      Compare against an independent reference before assuming the device is at
                      fault
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Between 4 and 20 mA, matches reference</td>
                    <td className="py-2 pr-4">Field side healthy — fault is downstream</td>
                    <td className="py-2">Source into the input card and check the scaling</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Between 4 and 20 mA, disagrees with reference</td>
                    <td className="py-2 pr-4">Field side suspect — sensor, transmitter or range</td>
                    <td className="py-2">
                      Check the transmitter range, then the sensor, then the process connection
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Above about 21 mA</td>
                    <td className="py-2 pr-4">
                      Transmitter fault signal, or a wiring fault shorting past the device
                    </td>
                    <td className="py-2">
                      Disconnect the transmitter — if the current persists, the fault is in the
                      wiring
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Tracks correctly low, saturates below 20 mA</td>
                    <td className="py-2 pr-4">
                      Insufficient loop drive — too much resistance in series
                    </td>
                    <td className="py-2">
                      Calculate the loop burden; remove or relocate additional series devices
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Testing an instrument loop with an insulation resistance tester"
            whatHappens={
              <>
                Never apply an insulation resistance test to an instrument loop or an analogue input
                without first disconnecting every electronic device on the circuit. A 250 V or 500 V
                test will destroy transmitters, input cards, barriers and isolators.
              </>
            }
            doInstead={
              <>
                Where a loop enters a hazardous area through an intrinsic safety barrier or galvanic
                isolator, no test equipment may be connected on the hazardous-area side unless it is
                certified for that purpose and covered by the site procedure — connecting an
                uncertified meter into an intrinsically safe circuit invalidates the protection.
              </>
            }
          />

          <ConceptBlock title="The order matters more than the tools">
            <p>
              Safety position, independent reference, visual inspection, measure the current,
              convert it, compare, and only then start disconnecting things. Technicians who start
              by swapping the transmitter solve roughly one fault in three and create paperwork for
              the other two.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Recognising the pattern: three site scenarios</ContentEyebrow>

          <ConceptBlock title="A small number of recognisable patterns">
            <p>
              Most instrument faults you meet fall into a small number of recognisable patterns.
              Learn the pattern and the diagnosis becomes fast. Here are the three that account for
              a disproportionate share of callouts.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Scenario 1 — the drifting reading"
            whatHappens={
              <>
                <p>
                  <strong>Symptom:</strong> A flow reading that used to be rock steady now wanders
                  by a few per cent over minutes, and the wander seems worse during the day shift
                  than at night.
                </p>
                <p>
                  <strong>Diagnosis:</strong> A drift that correlates with time of day almost always
                  correlates with something else being switched on. Check what plant runs on days
                  and not on nights — very often a variable speed drive, a welding set or a large
                  heater bank. Then follow the instrument cable route and see whether it shares a
                  tray or gland plate with that equipment.
                </p>
              </>
            }
            doInstead={
              <ul className="list-disc space-y-1.5 pl-5 marker:text-emerald-300/70">
                <li>
                  Compare the field loop current against the displayed value — if both drift, the
                  noise is arriving from the field.
                </li>
                <li>
                  Check the screen termination at both ends, and whether the drive motor cable
                  screen is properly glanded.
                </li>
                <li>
                  Check for loose or corroded terminals, which produce a resistance that changes
                  with temperature and vibration.
                </li>
                <li>
                  Rule out the process before rewiring anything — a genuinely pulsating flow looks
                  identical on a trend.
                </li>
              </ul>
            }
          />

          <CommonMistake
            title="Scenario 2 — the earth loop"
            whatHappens={
              <>
                <p>
                  <strong>Symptom:</strong> A newly installed level transmitter reads with a
                  persistent mains-frequency ripple on the trend, and the offset changes when other
                  plant starts. The instrument checks out perfectly on the bench.
                </p>
                <p>
                  <strong>Diagnosis:</strong> A screen or a signal common earthed at more than one
                  point. The two earth points sit at slightly different potentials, current
                  circulates along the screen, and it couples straight into the pair the screen was
                  supposed to protect.
                </p>
              </>
            }
            doInstead={
              <ul className="list-disc space-y-1.5 pl-5 marker:text-emerald-300/70">
                <li>
                  Trace the screen through every junction box and confirm it is earthed at one point
                  only, normally the panel.
                </li>
                <li>
                  Check whether the transmitter body has made an incidental earth via the mounting
                  bracket or the process connection.
                </li>
                <li>
                  Check whether the field device gland has bonded the screen to the enclosure
                  unintentionally.
                </li>
                <li>
                  Where an earth reference genuinely is needed at both ends, the correct answer is a
                  galvanic isolator in the loop, not a floating screen.
                </li>
              </ul>
            }
          />

          <CommonMistake
            title="Scenario 3 — the wrong scaling"
            whatHappens={
              <>
                <p>
                  <strong>Symptom:</strong> A discharge pressure reading is stable, believable and
                  consistently low. Nobody can point to when it changed. There is no noise, no drift
                  and no alarm.
                </p>
                <p>
                  <strong>Diagnosis:</strong> The transmitter was re-ranged from 0-6 bar to 0-10 bar
                  during a modification, and the PLC scaling was never updated. At a true 5 bar the
                  transmitter now outputs 4 + 16 x (5 / 10) = 12 mA. The PLC still believes 12 mA is
                  50 % of 0-6 bar, so it displays 3 bar. The display is low by the ratio of the two
                  ranges — 6 / 10 = 0.6, and 5 x 0.6 = 3.
                </p>
              </>
            }
            doInstead={
              <ul className="list-disc space-y-1.5 pl-5 marker:text-emerald-300/70">
                <li>
                  The giveaway is proportionality: the error scales with the reading rather than
                  being a fixed offset.
                </li>
                <li>
                  Read the transmitter configuration, not the label — labels survive re-ranges,
                  configurations do not.
                </li>
                <li>
                  Compare the transmitter range against the receiving scaling as two separate
                  checks.
                </li>
                <li>
                  Fix both records: the loop folder, the drawing and the maintenance system entry.
                </li>
              </ul>
            }
          />

          <ConceptBlock title="The question that separates the three">
            <p>
              Ask yourself what shape the error is. A varying error that comes and goes points to
              noise or a loose connection. A stable error that is a fixed number of units at every
              reading points to a zero offset. A stable error that is a fixed proportion of the
              reading points to a span or scaling mismatch. Establishing the shape of the error
              before you touch anything will save you most of the diagnostic time.
            </p>
          </ConceptBlock>

          <ConceptBlock title="ST1426 and this section">
            <p className="italic">
              Under ST1426, maintenance technicians are expected to understand instrumentation and
              control principles, interpret loop diagrams and specifications, and carry out
              systematic fault diagnosis on measurement and control systems. Being able to convert
              confidently between milliamps, percentage of span and engineering units — and to state
              clearly why the field evidence points upstream or downstream — is exactly the kind of
              reasoning that end-point assessment looks for.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Analogue signals vary continuously and need an analogue input; digital (discrete) signals have two states and need a digital input.',
              '4-20 mA is the process-plant standard: current is unaffected by cable volt drop, and 4 mA is a live zero — 0 mA can only mean a dead loop.',
              'Loop maths: subtract the 4 mA offset first. (current - 4) / 16 x range gives engineering units; the reverse gives current.',
              '2-wire transmitters are loop-powered and need a minimum terminal voltage; 3-wire and 4-wire devices are separately powered and can drive more.',
              '0-10 V dominates building services but has no live zero and loses accuracy over long runs — 4-20 mA is preferred for long field runs.',
              'Resolution and accuracy are different things. A 12-bit converter gives 4096 steps, but the sensor tolerance usually dominates the real error.',
              'A 3-wire RTD connection cancels lead resistance; a 4-wire connection eliminates it; PT1000 tolerates a 2-wire run because its resistance is ten times larger.',
              'Screen a signal cable at one end only — normally the panel end — and segregate it from power and drive cabling to avoid circulating current and coupled noise.',
              'Fault-find a loop in order: safety position, independent reference, visual check, measure current, convert it, compare, then source into the input card before disconnecting anything.',
              'A drifting reading usually means noise or a loose terminal; an earth loop shows mains-frequency ripple from a screen earthed twice; a wrong-scaling fault is a stable, proportional error.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Sensing and Signal Processing
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section1-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Proximity and Position Sensors
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section1_1;
