/**
 * Module 3 · Section 2 — Standard signal ranges
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE FRAMING. The old page listed the ranges as facts to memorise. The
 * useful idea is that a signal standard is a CONTRACT between two devices:
 * the output range of every sender must match the input range of the next
 * receiver, or the real-world meaning of the signal is lost somewhere along
 * the chain. Ranging is the technician's job, not something that happens by
 * itself.
 *
 * The second half is topology, which the old page omitted entirely and which
 * is the thing that actually causes wiring faults on site: 4-wire active
 * (sourcing), 4-wire passive (sinking), and 2-wire loop-powered. Two sources
 * wired to face each other is one of the commonest new-technician errors, and
 * it is invisible until you know the three shapes.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §13.1 (4-20 mA standard, the ranged chain, the 0-10 V and ±10 V footnote),
 * §13.4 (4-wire self-powered), §13.5 (2-wire loop-powered, the power budget
 * and the 10-50 mA legacy standard) and §13.6 (passive vs active outputs).
 * Extracted to scratchpad/src/m3s2_ranges.txt. Held in ~/Desktop/hav/
 * instrumentation.
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
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Standard signal ranges | Instrumentation Module 3.2 | Elec-Mate';
const DESCRIPTION =
  'Why every sender’s output range must match the next receiver’s input range, what 4–20 mA, 1–5 V, 0–10 V and 3–15 psi each mean, and the three loop topologies — 4-wire active, 4-wire passive and 2-wire loop-powered — that decide how a transmitter is wired.';

const outcomes = [
  'Explain what a signal standard actually guarantees, and what it does not',
  'State the 4–20 mA values for 0, 25, 50, 75 and 100 per cent from memory',
  'Explain why 250 Ω is the standard resistor for converting 4–20 mA to 1–5 V',
  'Say why 0–10 V is common in building services but rare on a process plant',
  'Distinguish a 4-wire active output from a 4-wire passive output and a 2-wire transmitter',
  'Work out whether a device can be loop-powered from its power requirement',
  'Explain why an active output wired to an active input does not work',
  'Trace a chain of instruments and spot where two ranges fail to meet',
];

const quizQuestions = [
  {
    id: 1,
    question: 'In a 4–20 mA system, what current corresponds to 75 per cent of scale?',
    options: ['15 mA', '16 mA', '17 mA', '12 mA'],
    correctIndex: 1,
    explanation:
      'The span is 16 mA, so each 25 per cent step is 4 mA: 4, 8, 12, 16, 20 mA for 0, 25, 50, 75 and 100 per cent. The 15 mA answer comes from treating 20 mA as full scale and ignoring the live zero, which is the mistake the live zero invites.',
  },
  {
    id: 2,
    question:
      'Why is 250 Ω the standard resistor value for converting a 4–20 mA signal to voltage?',
    options: [
      'It matches the cable impedance to prevent reflections',
      'It is the input impedance of most controllers',
      'It converts 4–20 mA into exactly 1–5 V by Ohm’s law',
      'It limits the loop current to a safe value',
    ],
    correctIndex: 2,
    explanation:
      '4 mA × 250 Ω = 1 V and 20 mA × 250 Ω = 5 V. The resistor is a range converter, and 1–5 V is the standard voltage range precisely because it is what 250 Ω produces. It also preserves the live zero: 0 V still means a broken loop.',
  },
  {
    id: 3,
    question: 'What limits what a 2-wire loop-powered transmitter can do?',
    options: [
      'It can only measure pressure and temperature',
      'It cannot be used in hazardous areas',
      'The length of cable that can be used',
      'It must run its whole self on less than 4 mA at the minimum terminal voltage',
    ],
    correctIndex: 3,
    explanation:
      'A loop-powered transmitter draws its operating power from the loop it is regulating, so all of its sensing, scaling and output circuitry must live on less than 4 mA. Anything needing a heater, solenoids or a substantial processor has to be a 4-wire device with its own supply.',
  },
  {
    id: 4,
    question:
      'A 4-wire transmitter with an active (sourcing) output is wired to a controller input that also supplies loop power. What is the problem?',
    options: [
      'Two sources are driving the same loop, so the current is not under the transmitter’s control',
      'The signal will be inverted',
      'The cable will need to be screened',
      'Nothing — this is the normal arrangement',
    ],
    correctIndex: 0,
    explanation:
      'A loop needs exactly one source of power. An active output supplies its own current, and a loop-powered input supplies current too. Wired together the two fight, and the reading is meaningless or the input is damaged. Match an active output to a passive input, or a passive output to an active input.',
  },
  {
    id: 5,
    question: 'Why is 0–10 V described as a "dead zero" standard, and why does that matter?',
    options: [
      'Because the signal is switched off when not in use',
      'Because 0 V is a legitimate 0 per cent reading, so a broken wire looks identical to a valid minimum',
      'Because it cannot carry a negative value',
      'Because the zero point drifts with temperature',
    ],
    correctIndex: 1,
    explanation:
      'With no live zero there is no electrical difference between "the measurement really is at the bottom of range" and "the cable is cut". That is tolerable for a damper actuator in a building, where a failed signal shows up quickly, and not tolerable on a process plant, which is why 4–20 mA dominates there.',
  },
  {
    id: 6,
    question:
      'A chain runs: sensor → transmitter → 250 Ω resistor → panel indicator. The indicator is scaled 0–200 °C but the transmitter is ranged 50–250 °C. What happens?',
    options: [
      'The transmitter will output a fault current',
      'The indicator reads correctly but with reduced resolution',
      'The indicator reads a wrong temperature at every point except by coincidence',
      'The loop will not carry current',
    ],
    correctIndex: 2,
    explanation:
      'Every device is working perfectly and the loop is healthy — the ranges simply do not agree. At 150 °C the transmitter sends 12 mA, the resistor makes 3 V, and the indicator reports 3 V as 100 °C. Nothing is broken, so nothing raises an alarm. This is why ranging is checked as part of commissioning.',
  },
  {
    id: 7,
    question: 'Why was the older 10–50 mA current standard abandoned?',
    options: [
      'It could not carry a live zero',
      'It was incompatible with digital controllers',
      'It was not accurate enough',
      'It needed much higher supply voltages, which raised safety concerns, and modern electronics no longer needs the power',
    ],
    correctIndex: 3,
    explanation:
      'Early transmitters could not run on a few milliamps, so the standard used more current — and supplies of 90 volts and beyond to drive them. Voltages of that order were unsuitable for some installations, and low-power microelectronics later made 4–20 mA practical for almost every transmitter type.',
  },
  {
    id: 8,
    question:
      'A loop-powered transmitter is fed from a 24 V supply, with a 250 Ω resistor at the controller. Roughly what terminal voltage should the transmitter always have available?',
    options: [
      'At least about 19 V',
      'Exactly 24 V',
      'It varies between 0 V and 24 V with the reading',
      'About 5 V',
    ],
    correctIndex: 0,
    explanation:
      'At full scale the resistor drops 5 V (20 mA × 250 Ω), leaving about 19 V at the transmitter. That worst case, together with the 4 mA minimum current, is the power budget a loop-powered transmitter is designed around — and cable resistance and any extra loads eat into it.',
  },
];

const InstrumentationModule3Section2 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 2"
        title="Standard signal ranges"
        backTo="/electrician/upskilling/instrumentation-module-3"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          A signal standard is a contract between two devices — and somebody still has to make both
          ends say the same thing.
        </p>

        <TLDR
          points={[
            'A signal standard is an agreement about what a number means — 4 mA is 0 per cent, 20 mA is 100 per cent, and every device in the chain has to be told the same thing.',
            'Learn 4, 8, 12, 16, 20 mA = 0, 25, 50, 75, 100 per cent. You will use it every working day.',
            '250 Ω turns 4–20 mA into 1–5 V exactly, which is why 1–5 V is the standard voltage range rather than an arbitrary choice.',
            '0–10 V has a dead zero — 0 V is a valid reading, so a cut wire and a legitimate minimum look identical. That is why it lives in building services, not on a process plant.',
            'Three topologies: 4-wire active (the transmitter drives the current), 4-wire passive (the transmitter regulates someone else’s current), and 2-wire loop-powered (the transmitter lives on the loop it regulates).',
            'Exactly one device in a loop supplies the power. Wire two sources together and neither is in control.',
            'A loop-powered transmitter must run on under 4 mA, which rules out anything with a heater, solenoids or a real computer inside it.',
            'The commonest range fault is not a broken device — it is two working devices that were never ranged to agree.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>What a standard actually promises</ContentEyebrow>

        <ConceptBlock
          title="A signal standard is a contract, not a wire"
          plainEnglish="The standard does not make devices work together. It gives them a common language — but somebody still has to set both ends to say the same thing."
          onSite="Ranging is a commissioning task. Assume nothing arrived correctly ranged from the factory unless you have proof."
        >
          <p>
            Section 1 established why industry transmits a current. This section is about the other
            half of the problem: two devices can both speak 4&ndash;20 mA fluently and still
            disagree completely about what 12 mA means.
          </p>
          <p>
            Take a real chain. A thermocouple sits in a process. Its output feeds a temperature
            transmitter. The transmitter&rsquo;s current runs down a cable to a 250 &Omega; resistor
            at the panel, and the voltage across that resistor drives an indicator on the door. Four
            devices, three handovers.
          </p>
          <p>
            At each handover, one device&rsquo;s output range must match the next one&rsquo;s input
            range:
          </p>
          <ul>
            <li>
              <strong>Thermocouple</strong> &mdash; input 50 to 250 &deg;C, output a few millivolts.
            </li>
            <li>
              <strong>Transmitter</strong> &mdash; input those millivolts, output 4&ndash;20 mA.
            </li>
            <li>
              <strong>Resistor</strong> &mdash; input 4&ndash;20 mA, output 1&ndash;5 V.
            </li>
            <li>
              <strong>Indicator</strong> &mdash; input 1&ndash;5 V, displays 50 to 250 &deg;C.
            </li>
          </ul>
          <p>
            Read down that list and the information flows cleanly from the tip of the thermocouple
            to the number on the door. Break any one of those matches and the number is wrong
            &mdash; not noisy, not unstable, just quietly and confidently wrong.
          </p>
          <p>
            Two of those four devices cannot be got wrong. The thermocouple obeys physics and the
            resistor obeys Ohm&rsquo;s law; neither has an adjustment. The other two &mdash; the
            transmitter&rsquo;s range and the indicator&rsquo;s scale &mdash; are set by a person.{' '}
            <strong>
              The correspondence does not happen automatically. Establishing it is the
              technician&rsquo;s job.
            </strong>
          </p>
        </ConceptBlock>

        <Pullquote>
          A healthy loop full of healthy instruments can still deliver a completely wrong number.
          Nothing alarms, because nothing has failed — the two ends were simply never told the same
          story.
        </Pullquote>

        <InlineCheck
          id="ins-3-2-chain"
          question="A transmitter is ranged 0–10 bar. Its indicator is scaled 0–16 bar. Both devices pass their own calibration checks. What will the indicator show when the process is at 5 bar?"
          options={['5 bar', '8 bar', '3.1 bar', 'An out-of-range alarm']}
          correctIndex={1}
          explanation="At 5 bar of 10, the transmitter sends 50 per cent — 12 mA. The indicator reads 12 mA as 50 per cent of ITS range, which is 8 bar. Every device is behaving correctly and the answer is still wrong by 3 bar, with no alarm anywhere. This is exactly why the ranges are recorded and checked as a chain, not device by device."
        />

        <SectionRule />
        <ContentEyebrow>The current standard</ContentEyebrow>

        <ConceptBlock
          title="4–20 mA — the five values worth memorising"
          plainEnglish="Four milliamps is nothing, twenty is everything, and each quarter of the way is four milliamps apart. That is the whole thing."
          onSite="Every instrument technician commits these to memory, because they come up constantly. Knowing that 12 mA is half-scale lets you sanity-check a reading at a glance."
        >
          <p>
            4&ndash;20 mA is the most widely used signal standard in industrial instrumentation, and
            the arithmetic is deliberately simple. The span is 16 mA, so each 25 per cent step is 4
            mA.
          </p>
          <AppendixTable
            caption="4–20 mA signal values"
            headers={['Current', 'Per cent of scale']}
            rows={[
              ['4 mA', '0%'],
              ['8 mA', '25%'],
              ['12 mA', '50%'],
              ['16 mA', '75%'],
              ['20 mA', '100%'],
            ]}
            notes="Section 1 covered what values outside this range mean under NAMUR levels."
          />
          <p>
            Note what the standard covers and what it does not. It fixes the relationship between
            current and <em>percentage of scale</em> &mdash; nothing more. It says nothing about
            what 100 per cent is. That is set by the ranging, which is why the chain argument above
            matters and why a 12 mA reading on its own tells you a process is halfway up its range
            and not one thing more.
          </p>
          <p>
            The same current standard is used in the other direction too. When a controller drives a
            control valve or a variable-speed drive, the milliamp value is not a measurement at all
            &mdash; it is a command. Commonly, though not always, 4 mA commands a shut valve or a
            stopped motor and 20 mA commands fully open or full speed. Section 1&rsquo;s note on
            reverse action is exactly the &ldquo;not always&rdquo; here.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Where 4–20 mA came from — 3 to 15 psi"
          plainEnglish="Before electronics, plants ran on compressed air. The pressure in a small tube carried the signal, and it started at 3 psi rather than 0 for exactly the reason 4–20 mA starts at 4 mA."
          onSite="Pneumatic loops are still in service, particularly on older plant and in places where electrical equipment is unwelcome. Do not assume everything is electronic."
        >
          <p>
            The 3&ndash;15 pounds per square inch pneumatic standard did the same job with air. A
            varying air pressure in a signal tube represented the process variable proportionally,
            with 3 psi at 0 per cent and 15 psi at 100 per cent.
          </p>
          <p>
            Both standards are described as <strong>live zero</strong>, because both begin at a
            non-zero value, and both get the same benefit from it. A pneumatic line at 0 psi has a
            leak or a severed tube; it is not a legitimate minimum reading. An electronic loop at 0
            mA has a broken cable or a dead supply; it is not a legitimate minimum reading either.
          </p>
          <p>
            It is worth seeing that the live zero was not an electronic invention. It is an older
            piece of engineering judgement that the electronic standard inherited because it was
            right, and that history is a reasonable answer to anyone who asks why the range does not
            simply start at zero.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Voltage standards</ContentEyebrow>

        <ConceptBlock
          title="1–5 V and the 250 Ω resistor"
          plainEnglish="Some receiving devices only understand voltage. Put a precise resistor in the loop and the current makes a voltage across it — 250 ohms happens to give a tidy 1 to 5 volts."
          onSite="If you find a 250 Ω resistor across an input terminal, it is a range converter and it is meant to be there. Removing it does not fix a reading — it destroys it."
        >
          <p>
            Many controllers, data loggers and analogue inputs cannot measure current directly; they
            measure voltage. The standard fix is a precision resistor across the input terminals,
            turning the loop current into a voltage the device can read.
          </p>
          <p>The value follows from Ohm&rsquo;s law and nothing else:</p>
          <ul>
            <li>
              4 mA × 250 &Omega; = <strong>1 V</strong>
            </li>
            <li>
              20 mA × 250 &Omega; = <strong>5 V</strong>
            </li>
          </ul>
          <p>
            So 1&ndash;5 V is not an arbitrary voltage range someone picked. It is simply what
            4&ndash;20 mA becomes across 250 &Omega;, which is why the two ranges are found together
            so often. Other controllers use other voltage ranges and therefore need different
            resistor values, so check what the input expects before choosing one.
          </p>
          <p>
            Note that 1&ndash;5 V <strong>keeps the live zero</strong>. A healthy loop at 0 per cent
            still produces 1 V across the resistor, so 0 V still means the current has stopped. The
            diagnostic property survives the conversion, which is a good part of why this particular
            pairing became standard.
          </p>
          <p>
            The resistor must be a precision component, because its tolerance goes straight into the
            reading as an error. A 1 per cent resistor contributes up to 1 per cent of error at
            every point on the scale, and no amount of calibrating the transmitter will remove it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-2-resistor"
          question="A controller input expects 0–5 V. An engineer fits the usual 250 Ω resistor to a 4–20 mA loop. What does the controller display at 0 per cent process?"
          options={['A broken-wire alarm', '0 per cent', '20 per cent', '25 per cent']}
          correctIndex={2}
          explanation="At 0 per cent the loop carries 4 mA, making 1 V across the resistor. The controller reads 1 V as a fifth of its 0–5 V range, so it shows 20 per cent. The resistor is right for a 1–5 V input, but this input has a dead zero — the ranges do not meet. It is the chain problem again, one component further along."
        />

        <ConceptBlock
          title="0–10 V — the dead-zero standard, and where it belongs"
          plainEnglish="Zero volts means zero. That is simpler, and it is exactly the property a process plant does not want."
          onSite="Common on building services kit: damper and valve actuators, VSD speed references, BMS analogue outputs. Rare in the field on a process plant."
        >
          <p>
            0&ndash;10 V DC is a widely used analogue standard with no live zero. It is far more
            common in environmental control &mdash; building heating, ventilation and cooling
            &mdash; than in industrial process control, and the reason for the split is worth
            understanding rather than memorising.
          </p>
          <p>
            The disadvantage is unavoidable. With 0 V a legitimate 0 per cent value, there is no
            electrical difference between a genuine minimum and a broken cable. The whole diagnostic
            benefit Section 1 attributed to the live zero simply is not there.
          </p>
          <p>
            In a building that is often an acceptable trade. A damper that closes because its signal
            wire broke is visible within a shift, the consequence is discomfort rather than danger,
            and the runs are short. On a plant where a stuck reading can hide a rising level or a
            failing cooler, that same ambiguity is not acceptable, and the cost of the live zero is
            trivial by comparison.
          </p>
          <p>
            Voltage signals also carry the weakness Section 1 covered: cable resistance and load
            current drop volts along the run, so the receiver sees slightly less than the sender
            produced. Over the short cable runs typical of a plant room this is negligible. Over a
            few hundred metres it is not, and it is another reason the field wiring on a process
            plant is a current loop.
          </p>
          <p>
            Older bipolar systems exist too, using &minus;10 V to +10 V, where 0 V represents 50 per
            cent. A failed signal path in a system like that is genuinely dangerous, because a
            mid-scale reading looks entirely unremarkable. If you meet one, treat every reading with
            suspicion until you have proved the path is live.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Three ways a transmitter joins a loop</ContentEyebrow>

        <ConceptBlock
          title="Why topology causes more site faults than ranging does"
          plainEnglish="Before you wire anything, answer one question: which device in this loop supplies the power? There must be exactly one."
          onSite="Terminal labelling is inconsistent between manufacturers. The topology question is answered by the manual, not by the terminal legend."
        >
          <p>
            A 4&ndash;20 mA loop is a series circuit, and a series circuit needs a source of
            electromotive force to push the current round. Which device provides it is not fixed by
            the standard &mdash; there are three common arrangements, and mixing them up is one of
            the commonest wiring errors a new technician makes.
          </p>
          <p>
            The three shapes differ in one respect only:{' '}
            <strong>which device acts as an electrical source and which acts as a load</strong>.
            Every symptom that follows from getting it wrong &mdash; a dead loop, a pegged reading,
            a damaged input &mdash; traces back to that single question.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="1 — 4-wire, self-powered, active output"
          plainEnglish="The transmitter has its own mains or 24 V supply on one pair of terminals, and pushes the signal current out of another pair. It drives the loop itself."
          onSite="Two terminals for power, two for signal. The signal pair is a source — the receiving input must be a passive load."
        >
          <p>
            The simplest arrangement to picture. The transmitter has four terminals: two for the
            4&ndash;20 mA signal wires, and two more where a power source connects. These units are
            called <strong>4-wire</strong> or <strong>self-powered</strong>.
          </p>
          <p>
            Because it has its own supply, the transmitter behaves as a true electrical source. It
            pushes current out through the signal pair, round the cable, through whatever load the
            receiver presents, and back. The receiving device simply sits in the loop as a load and
            measures what arrives.
          </p>
          <p>
            &ldquo;4-wire&rdquo; describes the transmitter, not necessarily the cable. If a supply
            exists at the transmitter location, only a 2-wire signal cable needs to run back to the
            panel. If there is no supply out there, power has to be taken from the panel too, and
            now you need a 4-core cable &mdash; larger diameter, more expensive, bigger conduit and
            twice the terminals to marshal at every wiring panel along the way.
          </p>
          <p>
            That cabling cost is the whole reason the next two arrangements exist and the reason
            loop-powered devices dominate the field.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="2 — 4-wire, passive (sinking) output"
          plainEnglish="Same self-powered transmitter, but its signal output behaves as a load instead of a source. Somebody else has to push the current; the transmitter just decides how much flows."
          onSite="A passive output needs a loop supply somewhere. If the loop reads dead and the transmitter’s own display is alive, check whether anything is powering the signal loop at all."
        >
          <p>
            Some self-powered transmitters are designed so that the output pair acts as an{' '}
            <strong>electrical load</strong> rather than a source. These are described as having a{' '}
            <strong>passive</strong> or <strong>sinking</strong> output, as opposed to the{' '}
            <strong>active</strong> or <strong>sourcing</strong> output described above.
          </p>
          <p>
            The transmitter still has its own supply, so it can be as complicated and power-hungry
            as it likes. But the signal loop needs a separate power source, usually at the
            controller end, and the transmitter merely regulates how much of that supply&rsquo;s
            current flows.
          </p>
          <p>
            The reason this exists is compatibility. Controller inputs also come in active and
            passive varieties, and a loop needs exactly one source. A passive output lets a
            self-powered transmitter be dropped straight into a panel whose inputs already supply
            loop power &mdash; which is how most process controller inputs are arranged, because
            they expect loop-powered transmitters.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="3 — 2-wire, loop-powered"
          plainEnglish="Two wires do both jobs. The same pair delivers the transmitter’s power and carries its signal, because the transmitter controls how much current it draws."
          onSite="This is the arrangement you will meet most often in the field. Two terminals, polarity-sensitive, no separate supply."
        >
          <p>
            The clever one. Power and analogue information travel over the same two wires, which is
            why loop-powered devices are also called <strong>2-wire transmitters</strong>.
          </p>
          <p>
            The trick is that a 2-wire transmitter is not really a current source at all. Its
            circuitry acts as a <strong>current regulator</strong>: it limits the current in the
            series loop to whatever value represents the measurement, while a remote supply &mdash;
            typically 24 V DC at the panel &mdash; provides the push. Electrically the transmitter
            behaves as a load that decides how much load it is.
          </p>
          <p>
            Module 2 Section 1 worked through the internal arithmetic &mdash; the electronics
            running on under 4 mA, and a transistor shunting whatever extra current is needed to
            make the total represent the measurement. The consequence worth adding here is what that
            does to the wiring, and it is the reason this arrangement dominates the field: two cores
            to a field device instead of four, on every run, on every plant.
          </p>
          <p>
            That detail explains a symptom worth recognising. A loop-powered transmitter cannot
            output less than its own consumption, which is why a genuinely dead transmitter reads 0
            mA rather than something small &mdash; and why NAMUR&rsquo;s failed-low band sits just
            below 4 mA rather than at zero.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The power budget that decides it</ContentEyebrow>

        <ConceptBlock
          title="What a loop-powered transmitter has to live on"
          plainEnglish="Four milliamps and about nineteen volts. That is the entire energy budget for everything inside the device."
          onSite="If a device needs a heater, motorised parts, or a real computer, it will be a 4-wire unit. Check before you pull a 2-core cable to it."
        >
          <p>
            Work out the worst case from the standard arrangement, because it is the number that
            constrains the design.
          </p>
          <ul>
            <li>
              Loop supply: <strong>24 V DC</strong> is typical.
            </li>
            <li>
              Maximum drop across the controller&rsquo;s 250 &Omega; resistor: <strong>5 V</strong>{' '}
              at 20 mA.
            </li>
            <li>
              So the transmitter should always have at least <strong>19 V</strong> at its terminals.
            </li>
            <li>
              And at the bottom of the range it has at least <strong>4 mA</strong> to work with.
            </li>
          </ul>
          <p>
            Every part of the transmitter &mdash; sensing element excitation, scaling circuitry,
            output conditioning, any display &mdash; must operate inside that budget. It is a
            genuine constraint, not a nominal one, and it decides what can and cannot be a 2-wire
            device.
          </p>
          <p>
            A pressure or temperature transmitter fits comfortably. A process analyser does not. A
            chromatograph has to heat things, drive valves and run a processor capable of
            interpreting what its detector saw &mdash; demands measured in watts, against a budget
            measured in tens of milliwatts. The gap is not marginal, so an instrument of that kind
            is always a 4-wire device with its own supply, and its 4&ndash;20 mA output is only one
            of several things it produces. Module 2 Section 7 covered why analytical instruments are
            built the way they are.
          </p>
          <p>
            Note also what eats into the budget in the real world: cable resistance on a long run,
            and any extra device dropped into the loop &mdash; an isolator, a display, a second
            receiver. Each one takes voltage the transmitter was counting on. Section 5 returns to
            this, and Module 7 works the sums.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-2-budget"
          question="A loop-powered transmitter needs a minimum of 12 V at its terminals. The supply is 24 V, the controller has a 250 Ω input resistor, and a signal isolator in the loop drops a further 4 V. Will it work at full scale?"
          options={[
            'Yes, with about 3 V to spare',
            'No — it will be about 1 V short',
            'Yes, because the transmitter only needs 4 mA',
            'No — a loop-powered transmitter cannot work through an isolator',
          ]}
          correctIndex={0}
          explanation="At 20 mA the resistor drops 5 V and the isolator 4 V, so 24 − 5 − 4 = 15 V is available at the transmitter against a 12 V requirement. It works, with roughly 3 V of headroom. That margin still has to cover the cable resistance, which is why 3 V is comfortable on a short run and worth checking on a long one."
        />

        <Scenario
          title="A loop that reads perfectly up to 60 per cent and then stops rising"
          situation={
            <>
              <p>
                A level transmitter on a long run has been reliable for years. After a modification
                that added a local indicator into the loop, it now tracks the process faithfully up
                to about 60 per cent and then flattens out. It never reads higher, whatever the tank
                does. The transmitter passes a bench check.
              </p>
              <p>
                The reading is not noisy or erratic. It rises smoothly, then simply stops, and sits
                there.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                The symptom is a supply headroom problem, and the shape of it is the clue. As the
                current rises, more voltage is dropped across every load in the loop, leaving less
                at the transmitter&rsquo;s terminals. At some point the transmitter no longer has
                enough to regulate any harder, and the current stops climbing.
              </p>
              <p>
                Add up the budget with the new device in place: supply voltage, minus the drop
                across the 250 &Omega; input resistor at 20 mA, minus the new indicator&rsquo;s
                burden, minus the cable resistance both ways. Compare what is left with the
                transmitter&rsquo;s minimum terminal voltage from its data sheet.
              </p>
              <p>
                The fixes are all about the budget: a higher loop supply voltage, a lower-burden
                indicator, or removing something else from the loop. Replacing the transmitter will
                not help, because the transmitter is not faulty.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                A loop that saturates is honest in a way a voltage signal is not. It stops rising
                visibly rather than quietly reading a bit low, so the fault announces itself.
                Section 1 made that argument; this is what it looks like on a real plant.
              </p>
              <p>
                The wider lesson is that adding a device to a working loop is a design change, not a
                wiring job. Every insertion spends part of a budget that was set when the loop was
                commissioned.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Legacy and non-standard ranges</ContentEyebrow>

        <ConceptBlock
          title="10–50 mA, and why it went"
          plainEnglish="An older current standard that used more current, because the electronics of the day could not run on less."
          onSite="You are unlikely to meet a live one, but it explains why 4–20 mA looks the way it does."
        >
          <p>
            Early current-based industrial transmitters could not operate on the tiny power a
            4&ndash;20 mA loop makes available, so they used a different standard:{' '}
            <strong>10 to 50 milliamps DC</strong>. Loop supplies for those transmitters ranged
            supplies of 90 volts and beyond to drive them.
          </p>
          <p>Two things killed it, and both are instructive.</p>
          <ul>
            <li>
              <strong>Safety.</strong> Supply voltages of that order made the standard unsuitable
              for some industrial installations &mdash; particularly the ones Module 1 Section 5
              discussed, where energy in the field wiring is a hazard in its own right.
            </li>
            <li>
              <strong>Electronics improved.</strong> Modern microelectronic circuitry, with far
              lower power consumption, made 4&ndash;20 mA practical for nearly all types of process
              transmitter. The lower standard stopped being a limitation.
            </li>
          </ul>
          <p>
            Notice that 10&ndash;50 mA also had a live zero. The live-zero idea has survived every
            change of standard since pneumatics precisely because it is the part that keeps earning
            its place.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Pulse and frequency ranges — where the standard runs out"
          plainEnglish="There is no single agreed pulse standard the way there is for current. You have to read the data sheet."
          onSite="Three questions every time: what voltage is a pulse, what shape of output is it, and how many pulses per unit of measurement?"
        >
          <p>
            Section 1 covered why frequency signals are immune to amplitude corruption. The catch is
            that the industry never converged on one pulse standard the way it did on 4&ndash;20 mA,
            so &ldquo;it has a pulse output&rdquo; tells you far less than &ldquo;it has a
            4&ndash;20 mA output&rdquo; does.
          </p>
          <p>
            Three things have to be established before a pulse output can be connected to anything:
          </p>
          <ul>
            <li>
              <strong>The electrical form.</strong> A voltage pulse that swings between two defined
              levels, or an open-collector output that switches a load the receiver supplies, or a
              volt-free contact. These are not interchangeable, and the receiving input has to
              match.
            </li>
            <li>
              <strong>The thresholds.</strong> What voltage the receiver counts as a pulse and what
              it ignores. Get this wrong and you either miss counts or count noise &mdash; and
              Section 1 explained why a missed count on a totaliser never comes back.
            </li>
            <li>
              <strong>The K-factor.</strong> How many pulses correspond to one unit of measurement.
              This is a property of the specific device, often of the specific individual device
              from its calibration certificate, and it must be entered into the receiver correctly.
            </li>
          </ul>
          <p>
            The practical consequence is that pulse outputs need the manual in a way current loops
            do not. A 4&ndash;20 mA transmitter from any manufacturer will talk to any 4&ndash;20 mA
            input. Two pulse devices from different manufacturers may not connect at all without
            something in between.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Wiring an active output to an input that also supplies loop power"
          whatHappens={
            <>
              <p>
                Both devices are trying to be the source. The transmitter is pushing current out of
                its signal terminals, and the controller input is pushing current out of its
                terminals to power what it assumes is a loop-powered device.
              </p>
              <p>
                What follows depends on the two designs and none of it is good: a reading pegged at
                full scale, a reading stuck at zero, a current that bears no relation to the
                process, or a damaged input card. Because both devices pass their own bench checks,
                the fault gets blamed on cable, on interference, on anything but the wiring
                arrangement.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Answer the source question before terminating anything. A loop needs exactly one
                source of power, so pair an <strong>active output with a passive input</strong>, or
                a <strong>passive output with an active input</strong>.
              </p>
              <p>
                The manual is the authority, not the terminal legend &mdash; manufacturers label
                these terminals inconsistently, and &ldquo;+&rdquo; and &ldquo;&minus;&rdquo; on a
                signal pair tell you the polarity, not who is supplying the energy. Where the two
                ends genuinely cannot be paired, a loop isolator resolves it, and Section 3 covers
                what else an isolator buys you.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Choosing between them</ContentEyebrow>

        <ConceptBlock
          title="A working shortlist"
          plainEnglish="Most of the time the decision is already made for you by the plant and the devices. It is still worth knowing why."
          onSite="If you are specifying rather than replacing, these are the questions in the order they matter."
        >
          <ul>
            <li>
              <strong>Field wiring on a process plant?</strong> 4&ndash;20 mA, loop-powered if the
              device can be. Immune to cable resistance, unambiguous on failure, and it needs two
              cores.
            </li>
            <li>
              <strong>Inside a panel, short runs, voltage-input device?</strong> 1&ndash;5 V from a
              250 &Omega; resistor keeps the live zero. Prefer it to 0&ndash;10 V where you have the
              choice.
            </li>
            <li>
              <strong>Building services actuator or a drive speed reference?</strong> 0&ndash;10 V
              is the convention, and the kit expects it. Understand that you have given up the
              failure diagnostic.
            </li>
            <li>
              <strong>Totalising a flow, or counting anything?</strong> Pulse output &mdash; the
              rate carries the value and the count integrates naturally. Confirm the electrical form
              and the K-factor.
            </li>
            <li>
              <strong>Device needs real power &mdash; heaters, valves, a processor?</strong> It will
              be 4-wire. Plan the cable and the supply before you plan the signal.
            </li>
          </ul>
          <p>
            One caution that runs through all of it. Being able to connect two devices is not the
            same as having ranged them. The topology question decides whether current flows; the
            ranging question decides whether the number means anything. Both have to be right, and
            only one of them announces itself when it is wrong.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Why 4 mA and not, say, 2 mA or 5 mA?',
              answer:
                'It is a compromise. The offset has to be large enough to power a loop-powered transmitter’s electronics and to be clearly distinguishable from zero, and small enough not to waste the span. Four milliamps out of a twenty milliamp maximum gives a 16 mA working span, which keeps the arithmetic simple — 4 mA per 25 per cent. The value is a convention that works, not a physical constant.',
            },
            {
              question: 'Can I put more than one receiving device in the same loop?',
              answer:
                'Yes — a series loop carries the same current everywhere, so an indicator, a recorder and a controller can all sit in the same loop and each read the true signal. What you cannot do is ignore the burden. Each device drops some voltage, and the total has to leave enough at the transmitter’s terminals. That is the budget from earlier in this section, and it is the usual cause of a loop that saturates before full scale.',
            },
            {
              question: 'Is the 250 Ω resistor always at the controller?',
              answer:
                'It goes wherever the voltage-input device is, because its job is to present a voltage to that specific device’s terminals. It is normally at the panel because that is where such devices live. Fitting it at the field end would create a voltage there and then send that voltage down the cable, which throws away the very cable immunity the current loop was chosen for.',
            },
            {
              question: 'How do I tell whether a transmitter is loop-powered without the manual?',
              answer:
                'The terminal count is the first clue — two signal terminals and no separate supply pair points to loop-powered. It is a clue rather than proof, because some 4-wire units are compactly built and some devices have optional supply terminals. The data sheet settles it, and on an unfamiliar device it is worth the two minutes rather than the risk of energising an input that was not expecting it.',
            },
            {
              question: 'Why do some 4–20 mA devices also have a digital communication option?',
              answer:
                'Because the loop can carry a small digital signal superimposed on the analogue current without disturbing it, which allows configuration and diagnostics over the same two wires. The analogue value continues to work exactly as described here, so a device with digital communication is still a 4–20 mA device to everything else in the loop. Module 7 covers what that superimposed signal does and does not survive.',
            },
            {
              question: 'If 0–10 V is worse, why is so much building services kit built for it?',
              answer:
                'Because the trade-offs are different there. Runs are short, so voltage drop is negligible; the equipment is inside a building rather than a hazardous process area; a failed actuator shows up quickly through comfort complaints; and the receiving electronics is simpler and cheaper without a current input stage. It is a reasonable engineering choice for its context — the mistake is carrying the assumption across into a process plant.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A signal standard is a contract about what a number means. It does not range the devices for you — a chain of perfectly healthy instruments can still deliver a wrong reading.',
            'Memorise 4, 8, 12, 16, 20 mA = 0, 25, 50, 75, 100 per cent.',
            '250 Ω converts 4–20 mA to exactly 1–5 V, which is why that voltage range is standard — and it keeps the live zero, so 0 V still means a broken loop.',
            'The 250 Ω resistor’s tolerance goes straight into the reading. Use a precision part.',
            '3–15 psi pneumatic is where the live zero came from. 4–20 mA inherited a good idea rather than inventing one.',
            '0–10 V has a dead zero: a cut wire and a legitimate minimum are electrically identical. Acceptable in a building, not on a plant.',
            '🔴 Exactly one device in a loop supplies the power. Match an active output to a passive input, or a passive output to an active input.',
            '4-wire active drives the loop itself; 4-wire passive regulates someone else’s current; 2-wire loop-powered lives on the loop it regulates.',
            'A loop-powered transmitter runs on under 4 mA and roughly 19 V, which is what rules out analysers, heated devices and anything with a real computer inside.',
            'Every device added to a loop spends part of the transmitter’s voltage budget. A loop that saturates before full scale has usually run out of headroom, not developed a fault.',
            '10–50 mA was abandoned because its ~90 V supplies were a safety problem and low-power electronics made it unnecessary — but it kept the live zero too.',
            'Pulse outputs have no universal standard. Establish the electrical form, the thresholds and the K-factor before connecting anything.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 3.2" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-3-section-1')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">Signal types</span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-3-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Signal conditioning
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule3Section2;
