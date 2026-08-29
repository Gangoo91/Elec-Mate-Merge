/**
 * Module 2 · Section 5 — Analogue and digital sensor output
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE FRAMING THAT MATTERS. The old page treated this as "analogue versus
 * digital", as though a plant had to pick a side. That is not how real
 * instrumentation works, and the framing hides the most useful fact available:
 * a HART transmitter is BOTH AT ONCE. The 4–20 mA current carries the primary
 * measurement while a digital signal rides on the same two wires carrying
 * configuration, diagnostics and additional variables. The Rosemount 644 manual
 * held on disk is explicit that when one sensor of a dual-sensor pair fails,
 * "the 4–20 mA signal is not disrupted and the status available to the control
 * system (via HART) specifies which sensor has failed" — two channels, one pair
 * of wires, doing different jobs.
 *
 * Three things taught here that the old page did not have:
 *
 *  1. RESOLUTION as a real, calculable limit — a converter has a finite number
 *     of counts across its range, and that sets the smallest change the system
 *     can possibly see.
 *  2. SAMPLING RATE AND DEAD TIME. Time between samples is dead time, and dead
 *     time in a feedback loop leads to oscillation and instability. This is the
 *     bridge into Module 5.
 *  3. ALIASING — a system can report a frequency far lower than the real one,
 *     which is the failure mode where the data looks perfectly plausible and is
 *     completely wrong.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.15, extracted to scratchpad/src/m2s5_digital.txt; Rosemount 644
 * transmitter manual. Both in ~/Desktop/hav/instrumentation.
 *
 * ⚠️ No protocol standard numbers are cited. We do not hold the fieldbus
 * standards, so protocols are described by behaviour and named only.
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

const TITLE = 'Analogue and digital sensor output | Instrumentation Module 2.5 | Elec-Mate';
const DESCRIPTION =
  'Why a HART transmitter is analogue and digital at the same time, what converter resolution sets as the smallest visible change, why sampling rate becomes dead time in a control loop, and how aliasing produces data that looks plausible and is completely wrong.';

const outcomes = [
  'Explain why 4–20 mA persists despite digital protocols being available',
  'Describe how HART carries a digital signal on the same wires as the analogue current',
  'Calculate what a converter’s resolution means in engineering units for a given range',
  'Explain why the time between samples is dead time, and what dead time does to a control loop',
  'Describe aliasing and why it produces plausible but wrong data',
  'Say what a smart transmitter offers beyond a measurement, and why that changes maintenance',
  'Choose between a conventional analogue loop and a digital protocol for a stated duty',
  'Explain what damping does to a signal, and why using it to hide noise makes a loop harder to control',
  'Distinguish a discrete signal from a digital protocol, and say which input card each one needs',
];

const quizQuestions = [
  {
    id: 1,
    question: 'On a HART transmitter, what carries the primary measurement to the control system?',
    options: [
      'The digital HART signal',
      'The 4–20 mA analogue current',
      'A separate communication cable',
      'Neither — HART replaces the measurement entirely',
    ],
    correctIndex: 1,
    explanation:
      'The 4–20 mA current still carries the primary measurement. HART superimposes a digital signal on the same two wires for configuration, diagnostics and additional variables. That is why a HART transmitter works perfectly well with an ordinary analogue input card that knows nothing about HART.',
  },
  {
    id: 2,
    question:
      'A 12-bit converter covers a furnace range of 500 °C to 1000 °C. Roughly what temperature change does one count represent?',
    options: ['About 0.01 °C', 'About 0.12 °C', 'About 1.2 °C', 'About 5 °C'],
    correctIndex: 1,
    explanation:
      'A 12-bit converter has 4096 counts (0 to 4095) across its range. A 500 °C span divided by 4095 counts gives about 0.12 °C per count. That is the smallest change the digital system can possibly represent, regardless of how good the sensor is.',
  },
  {
    id: 3,
    question:
      'According to the Nyquist sampling theorem, the minimum sample rate to capture a waveform is:',
    options: [
      'The same as the waveform’s fundamental frequency',
      'Twice the waveform’s fundamental frequency',
      'Ten times the waveform’s fundamental frequency',
      'Half the waveform’s fundamental frequency',
    ],
    correctIndex: 1,
    explanation:
      'Nyquist gives twice the fundamental frequency as the absolute minimum. In practice, sampling ten times or more per cycle is more realistic — the theoretical minimum captures that a signal exists but leaves very little margin for representing its shape.',
  },
  {
    id: 4,
    question:
      'Why does a sampling rate that is too slow cause problems in a feedback control loop?',
    options: [
      'It uses more processor time',
      'The time between samples is dead time, during which the system cannot respond to any change — and excessive dead time leads to oscillation and instability',
      'It increases the resolution error',
      'It causes the transmitter to fail',
    ],
    correctIndex: 1,
    explanation:
      'Between samples the digital system is completely unresponsive to changes in the process measurement. That is dead time. In an alarm system it delays the alarm; in a feedback control loop excessive dead time leads to oscillation and instability — which Module 5 covers in depth.',
  },
  {
    id: 5,
    question: 'What is aliasing?',
    options: [
      'When two instruments are given the same tag number',
      'A condition where the digital system perceives the frequency of a signal as far lower than it really is',
      'When a transmitter is re-ranged without recalibration',
      'Interference between adjacent cables',
    ],
    correctIndex: 1,
    explanation:
      'Aliasing is where too low a sampling rate causes the digital system to interpret a signal as having a much lower frequency than it actually has. The dangerous part is that the resulting data looks entirely plausible — a smooth, slow trend that simply is not what the process is doing.',
  },
  {
    id: 6,
    question:
      'Why do industrial process measurements tolerate far slower sampling than bench test equipment?',
    options: [
      'Because industrial instruments are less accurate',
      'Because processes change slowly — a large furnace may be adequately sampled once per minute',
      'Because industrial signals are digital from the start',
      'Because control systems cannot sample quickly',
    ],
    correctIndex: 1,
    explanation:
      'Industrial process measurements are far more forgiving than bench measurements. A large furnace may be adequately sampled once per minute, and even fast feedback processes such as flow and pressure can be controlled with reasonable stability sampling just a few times per second. A digital oscilloscope may sample billions of times per second because the signals demand it.',
  },
];

const InstrumentationModule2Section5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 5"
        title="Analogue and digital output"
        backTo="/electrician/upskilling/instrumentation-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Not a choice between two camps. On most modern plant the same two wires are carrying both
          at once.
        </p>

        <TLDR
          points={[
            'It is rarely analogue OR digital. A HART transmitter is both: the 4–20 mA current carries the measurement while a digital signal rides on the same two wires.',
            'That is why HART works with an ordinary analogue input card that has never heard of HART — the current is still doing its job underneath.',
            'A converter has a finite number of counts across its range. A 12-bit converter gives 4096 of them, and that sets the smallest change the system can possibly see.',
            '🔴 The time between samples is DEAD TIME. In an alarm system it delays the alarm; in a control loop, excessive dead time leads to oscillation and instability.',
            'Sample too slowly and you get aliasing — the system reports a frequency far lower than the real one, and the data looks perfectly believable.',
            'Industrial processes are forgiving: a large furnace may be fine sampled once a minute, where a digital oscilloscope needs billions of samples a second.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Not a choice of camps</ContentEyebrow>

        <ConceptBlock
          title="HART — digital riding on top of the analogue"
          plainEnglish="The current carries the measurement. A digital conversation is superimposed on the same pair, without disturbing it."
          onSite="A HART transmitter connected to a plain analogue input works perfectly. You simply do not get the extra information until something is there to ask for it."
        >
          <p>
            Section 2.1 explained why 4&ndash;20 mA won: immune to voltage drop, interchangeable
            between devices, and with a live zero that makes a broken loop unmistakable. Those
            advantages did not evaporate when digital communication arrived, which is why the
            industry did the obvious thing and kept both.
          </p>
          <p>
            On a <strong>HART</strong> installation:
          </p>
          <ul>
            <li>
              The <strong>4&ndash;20 mA current</strong> carries the primary measurement, exactly as
              it always did.
            </li>
            <li>
              A <strong>digital signal is superimposed</strong> on the same two wires, carrying
              configuration, diagnostics, and additional measurement variables.
            </li>
          </ul>
          <p>
            The two do not interfere, and the consequence is genuinely useful: a HART transmitter
            works with a conventional analogue input card that knows nothing about HART. You lose
            the extra information, not the measurement.
          </p>
          <p>
            The manual for a real transmitter makes the division of labour concrete. On a
            dual-sensor unit, when one sensor fails,{' '}
            <strong>
              the 4&ndash;20 mA signal is not disrupted and the status available to the control
              system via HART specifies which sensor has failed
            </strong>
            . The control loop keeps running on a good measurement while a separate channel reports
            what went wrong. One pair of wires, two entirely different jobs.
          </p>
        </ConceptBlock>

        <Pullquote>
          The argument was never analogue versus digital. The current keeps the plant running; the
          digital signal tells you how the instrument is feeling about it.
        </Pullquote>

        <InlineCheck
          id="ins-2-5-hart"
          question="A HART transmitter is wired into a standard analogue input card with no HART capability. What happens?"
          options={[
            'Nothing works — HART devices need HART input cards',
            'The measurement works normally; only the digital configuration and diagnostics are unavailable',
            'The card is damaged by the digital signal',
            'The transmitter reverts to a fixed 4 mA output',
          ]}
          correctIndex={1}
          explanation="The 4–20 mA current is unaffected by the superimposed digital signal, so the measurement arrives exactly as it would from a conventional transmitter. What you lose is access to configuration, diagnostics and secondary variables — which is why a handheld communicator can be clipped onto the loop to retrieve them without disturbing the control system."
        />

        <SectionRule />
        <ContentEyebrow>What a digital system can actually see</ContentEyebrow>

        <ConceptBlock
          title="Resolution — the smallest change the system can possibly represent"
          plainEnglish="A converter turns a continuous signal into a whole number of counts. However good the sensor is, the system cannot see a change smaller than one count."
          onSite="If a reading moves in visible steps rather than smoothly, you are probably watching converter resolution rather than a process that behaves that way."
        >
          <p>
            Every analogue signal entering a digital system passes through an{' '}
            <strong>analogue-to-digital converter</strong>, and the converter has a fixed number of
            counts across its range. A 12-bit converter has <strong>4096 counts</strong>, numbered 0
            to 4095.
          </p>
          <p>
            Work an example through, because the arithmetic is the whole point. A furnace
            measurement with a lower-range value of 500 °C and an upper-range value of 1000 °C has a
            span of 500 °C. Spread across 4095 counts, one count is about <strong>0.12 °C</strong>.
          </p>
          <p>That number is a hard floor. Regardless of:</p>
          <ul>
            <li>how accurate the sensing element is,</li>
            <li>how good the transmitter is,</li>
            <li>how carefully the loop has been calibrated,</li>
          </ul>
          <p>
            the digital system cannot represent a change smaller than one count. Resolution is not
            accuracy — Section 1.3 separated those — and it is worth keeping them apart. An
            instrument can be resolute and wrong, or accurate and coarse.
          </p>
          <p>
            One practical wrinkle worth knowing: converter ranges often deliberately{' '}
            <strong>overshoot</strong> the configured measurement range at both ends. One family of
            controllers covers &minus;3.3% to 103.3% of the configured span, so the count range
            spills past the specified limits at both ends. That headroom is what allows an
            instrument to show that a measurement is <em>below zero</em> or <em>over range</em>{' '}
            rather than simply saturating and going quiet.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-5-resolution"
          question="A pressure measurement ranged 0–10 bar goes through a 12-bit converter. What is the smallest pressure change the system can represent?"
          options={['About 0.0024 bar', 'About 0.024 bar', 'About 0.24 bar', 'About 1 bar']}
          correctIndex={0}
          explanation="4096 counts across a 10 bar span gives roughly 0.0024 bar per count. That is the resolution floor. Note it depends entirely on the SPAN — re-range the same transmitter to 0–100 bar and each count is now worth ten times as much pressure, so resolution in engineering units gets ten times worse."
        />

        <SectionRule />
        <ContentEyebrow>How often is often enough</ContentEyebrow>

        <ConceptBlock
          title="Sampling rate — and why the gaps between samples matter"
          plainEnglish="A digital system does not watch the process continuously. It takes a series of snapshots, and between them it is blind."
          onSite="Nothing happening between samples is not merely 'not recorded'. To the control system it did not happen at all."
        >
          <p>
            Each time a converter samples its input, the resulting number is fixed until the next
            sample. The analogy in the source is exact: it is like monitoring a continuously moving
            object by taking a series of still photographs. Any changes happening between sampling
            events are not detected, and therefore are not present in the data at all.
          </p>
          <p>
            It follows that the sampling rate must be at least as often as significant changes are
            expected. Formally, the{' '}
            <strong>
              Nyquist sampling theorem gives the absolute minimum as twice the waveform&rsquo;s
              fundamental frequency
            </strong>
            . More realistically, sampling ten times or more per cycle is what actually represents a
            waveform usefully.
          </p>
          <p>
            The good news for process work is that industrial measurements are{' '}
            <strong>far more forgiving</strong> than bench measurements. A large furnace may be
            adequately sampled once per minute. Even fast feedback processes such as liquid flow and
            pressure control may be controlled with reasonable stability sampling just a few times
            per second.
          </p>
          <p>
            Compare that with a digital storage oscilloscope, which may sample billions of times per
            second to digitise radio-frequency signals. The difference is not that industrial
            equipment is inferior — it is that a furnace does not change in microseconds.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Dead time — the reason sampling rate is a control problem"
          plainEnglish="The gap between samples is time when the system cannot react. That delay is the enemy of stable control."
          onSite="A loop that hunts is often blamed on tuning when the real problem is that it cannot see the process often enough to keep up with it."
        >
          <p>
            A sampling rate that is too infrequent is harmful in more than one way, and the second
            way is the one that matters most.
          </p>
          <p>
            <strong>
              The time between samples is dead time to the system: time during which the digital
              system will be completely unresponsive to any changes in process measurement.
            </strong>
          </p>
          <p>What that costs depends on what the signal is for:</p>
          <ul>
            <li>
              <strong>In an alarm system</strong>, excessive dead time means an unnecessary delay
              between the alarm event and the alarm signal. The condition existed; nobody was told
              for a while.
            </li>
            <li>
              <strong>In a feedback control loop</strong>, excessive dead time{' '}
              <strong>leads to oscillation and instability</strong>. The controller acts on
              information that is already stale, over-corrects, then over-corrects the other way.
            </li>
          </ul>
          <p>
            This is the bridge into Module 5, and it is worth carrying forward. When a loop hunts,
            tuning is the usual suspect — but dead time anywhere in the chain produces the same
            symptom, and no amount of tuning removes it. Section 2.2 met dead time already in a
            different form: a thermowell slows the sensor&rsquo;s response, and that lag is dead
            time too.
          </p>
          <p>
            Dead time accumulates. Sensor response, converter sampling, controller scan and actuator
            movement all contribute, and the loop feels the total.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Aliasing — plausible data that is completely wrong"
          plainEnglish="Sample too slowly and a fast signal masquerades as a slow one. The trend looks smooth and sensible and describes something that never happened."
          onSite="This is the failure mode that does not announce itself. Nothing looks broken; the data is simply fiction."
        >
          <p>
            Beyond dead time, the other detrimental effect of a low sampling rate is{' '}
            <strong>aliasing</strong>: a condition where the digital system{' '}
            <strong>
              &ldquo;thinks&rdquo; the frequency of an analogue signal is far lower than it really
              is
            </strong>
            .
          </p>
          <p>
            The reason it deserves respect is that it produces no error message and no obvious
            symptom. A vibration that is oscillating rapidly, sampled too slowly, appears in the
            data as a slow, gentle drift. Every subsequent decision — a trend review, an alarm
            threshold, a maintenance judgement — is then made on a picture of the process that is
            coherent and false.
          </p>
          <p>
            Compare the failure modes taught so far in this module. A two-wire RTD reads high; a
            missing square-root extraction reads low; a density mismatch reads proportionally wrong.
            All of them produce a <em>wrong number</em>. Aliasing produces a{' '}
            <strong>wrong shape</strong> — and shape is what people rely on when they look at a
            trend and conclude that something is stable.
          </p>
          <p>
            The defence is to sample fast enough for what the signal actually does, and to be
            suspicious of any measurement whose real behaviour is faster than the rate at which it
            is being watched. Vibration is the classic case, which is why it is normally handled by
            equipment designed for it rather than a general-purpose input card.
          </p>
          <p>
            There is a useful rule of thumb hiding in those numbers. Sampled ten or more times per
            cycle, a signal&rsquo;s shape is reasonably represented. At the Nyquist minimum of twice
            per cycle you can establish that something is oscillating but very little about how.
            Below twice per cycle you are not measuring the signal at all — you are measuring an
            alias of it, and the output will be confident and false.
          </p>
          <p>
            So the habit worth forming is to ask, of any measurement you are being asked to trust,{' '}
            <strong>how fast can this actually change, and how often are we looking?</strong> If the
            first number is larger than the second, the data is decoration.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Damping — deliberately slowing a signal down, and what it costs"
          plainEnglish="A noisy reading can be smoothed by averaging it over time. That makes the display calmer and makes the instrument slower to tell you about real changes."
          onSite="Damping is the most quietly abused setting on a transmitter. It makes a difficult loop look better without making it better."
        >
          <p>
            Most transmitters offer a <strong>damping</strong> setting: an adjustable time constant
            that smooths the output. Turn it up and a jittery reading becomes steady and pleasant to
            look at.
          </p>
          <p>
            It is genuinely useful. Process noise — turbulence at a flow element, splashing on a
            level probe, electrical pickup — can make a reading unusable for control even though the
            underlying process is perfectly steady.
          </p>
          <p>
            But damping is not free, and the cost is the subject of the previous block:{' '}
            <strong>damping adds dead time</strong>. A heavily damped transmitter reports a change
            later than it happened, and later is exactly what a control loop cannot tolerate.
          </p>
          <p>The failure mode this produces is worth recognising, because it is circular:</p>
          <ul>
            <li>A loop is unstable, so somebody increases the damping to calm the reading.</li>
            <li>
              The reading looks better, but the controller is now acting on older information, so
              the loop becomes <em>less</em> stable.
            </li>
            <li>Somebody increases the damping again.</li>
          </ul>
          <p>
            The honest fix is to find why the signal is noisy — a badly placed flow element, a
            failing sensor, a grounding problem — rather than to hide it. Damping is a legitimate
            tool for genuine process noise and a poor substitute for diagnosis. Module 5 returns to
            this when tuning is on the table, and Module 3 deals with the electrical causes of
            noise.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-5-damping"
          question="A flow loop hunts. A technician increases the transmitter damping and the displayed value steadies, but the valve continues to swing. What has actually happened?"
          options={[
            'The problem is solved — the reading is stable now',
            'The display is smoother but the controller is now acting on older information, so the instability is likely to be worse',
            'The transmitter has been recalibrated',
            'The valve has been damaged',
          ]}
          correctIndex={1}
          explanation="Damping smooths what is displayed and delays what is reported. The controller now receives a lagged version of the process, which adds dead time to the loop — and excessive dead time is a cause of oscillation, not a cure for it. The steadier display is masking a loop that has been made harder to control."
        />

        <Scenario
          title="A trend that looked stable and was not"
          situation="A pump is monitored by a general-purpose analogue input sampling once every few seconds. The vibration trend is smooth, slowly rising, and well inside alarm limits. A handheld analyser used during a routine round reports vibration far higher than the trend suggests, and at a frequency nothing in the historian shows."
          whatToDo="Do not start by doubting the handheld. Compare the sampling rate of the monitored channel against the frequency the analyser is reporting. If the real signal is oscillating faster than the input can sample, the historian cannot represent it — and what it has drawn instead is an alias: a slow, smooth curve that is a mathematical artefact rather than a measurement. Move the measurement onto equipment intended for vibration, or sample fast enough for the frequencies present."
          whyItMatters="Every check on the loop passes. The transmitter is healthy, the wiring is sound, the input card is within specification, and the historian is faithfully recording what it was given. The fault is that the system was asked to watch something changing faster than it can look — and the output of that mistake is not a gap in the data but a plausible picture of a process that does not exist."
        />

        <SectionRule />
        <ContentEyebrow>Discrete signals</ContentEyebrow>

        <ConceptBlock
          title="Digital does not only mean a protocol"
          plainEnglish="A switch is a digital signal too. It carries one bit — on or off — and it reaches the control system through a different kind of input card entirely."
          onSite="Analogue input, digital input. Two different cards, two different terminations, two different fault-finding approaches. Know which you are looking at before you start testing."
        >
          <p>
            The word &ldquo;digital&rdquo; does two jobs in instrumentation and it is worth keeping
            them apart, because they arrive at a controller through different hardware.
          </p>
          <ul>
            <li>
              <strong>A digital communication protocol</strong> — HART, fieldbus — carries rich
              information: values, configuration, diagnostics, status.
            </li>
            <li>
              <strong>A discrete signal</strong> carries exactly one bit. A proximity switch, a
              level switch, a limit switch, a pressure switch. It is either made or it is not.
            </li>
          </ul>
          <p>
            Section 2.4 covered the choice between a switch and a transmitter as a design decision.
            Here is the wiring consequence: a switch goes to a <strong>digital input</strong>, a
            transmitter to an <strong>analogue input</strong>, and they are physically different
            cards with different expectations.
          </p>
          <p>
            The practical significance for fault-finding is real. On a discrete input, the useful
            questions are about continuity and contact state — familiar territory for anyone from an
            installation background. On an analogue input, continuity tells you almost nothing,
            because as Section 1.1 put it, a loop can be electrically perfect and still report a
            wrong number.
          </p>
          <p>
            One more distinction worth having early: a discrete signal can be wired{' '}
            <strong>normally open or normally closed</strong>, and the choice is a safety decision
            of exactly the kind discussed under burnout in Section 2.2 and the live zero in Section
            2.1. Wire a safety-relevant detector normally closed and a broken wire looks like the
            unsafe condition being detected, which is the direction you want.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-5-discrete"
          question="A guard interlock switch is wired normally CLOSED, so the circuit is made when the guard is shut. A wire is severed. What does the control system see?"
          options={[
            'The guard as closed, because the switch has not moved',
            'The guard as open — the same state as an unsafe condition, so the machine will not run',
            'Nothing, because a broken wire is undetectable on a digital input',
            'An analogue fault code',
          ]}
          correctIndex={1}
          explanation="A broken wire breaks the circuit, which is indistinguishable from the guard being opened. The machine therefore refuses to run — the failure lands in the safe direction. This is exactly the live-zero reasoning from Section 2.1 applied to a discrete signal: arrange the wiring so the failure mode and the dangerous condition look the same."
        />

        <SectionRule />
        <ContentEyebrow>What smart instruments add</ContentEyebrow>

        <ConceptBlock
          title="A smart transmitter reports on itself as well as the process"
          plainEnglish="Alongside the measurement, the instrument can tell you about its own health — and that changes maintenance from a schedule into a response."
          onSite="Diagnostics only help if somebody is reading them. An instrument that has been reporting a fault to nobody for six months is not a smart instrument in any useful sense."
        >
          <p>
            The digital channel is not simply a more modern way of sending the same number. It
            carries a class of information that a bare current cannot express:
          </p>
          <ul>
            <li>
              <strong>Configuration.</strong> LRV, URV, damping and sensor type can be read and
              changed without disturbing the wiring — which is exactly the re-ranging capability
              Section 2.1 warned must not be confused with calibration.
            </li>
            <li>
              <strong>Additional variables.</strong> A single device may report several measurements
              plus its own internal temperature, beyond the one variable the analogue output
              carries.
            </li>
            <li>
              <strong>Diagnostics.</strong> Sensor health, drift alerts and degradation warnings. A
              real transmitter offers a thermocouple degradation diagnostic that monitors the health
              of the thermocouple itself, and process and transmitter minimum/maximum tracking.
            </li>
            <li>
              <strong>Status on failure.</strong> As above — which sensor failed, reported digitally
              while the analogue output carries on with the good one.
            </li>
          </ul>
          <p>
            The maintenance consequence is the interesting part. Traditional instrument maintenance
            is calendar-driven: check everything at intervals, because you cannot tell which
            instrument needs attention. Diagnostics make it possible to respond to instruments that
            report a problem — but only if that information is actually routed somewhere a human
            looks.
          </p>
          <p>
            That last point is a genuine trap on real plant. A great deal of installed HART
            capability is never connected to anything, because the loop was wired to a conventional
            input card and nobody has ever interrogated it. The diagnostics exist and report to
            nobody.
          </p>
          <p>
            There is a second, quieter benefit worth knowing about. Because a handheld communicator
            can talk to a transmitter over the same two wires that carry the measurement, a great
            deal of work that once meant opening an enclosure at the instrument can now be done from
            any accessible point on the loop — a marshalling cabinet, a junction box, the terminals
            at the input card.
          </p>
          <p>
            On an ordinary installation that is a convenience. In a classified area, as Module 1
            Section 5 set out, it is more than that: not having to open an enclosure in a hazardous
            area removes a whole category of risk and permit. It is one of the less-discussed
            reasons smart instrumentation displaced conventional transmitters as quickly as it did.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Choosing the signal</ContentEyebrow>

        <ConceptBlock
          title="When a conventional loop is right, and when it is not"
          plainEnglish="Digital buys information and shared wiring. Analogue buys simplicity and independence. Which matters depends on what the loop does and who has to maintain it."
          onSite="The existing control system usually decides this before anyone gets a say. Work out what the plant already has before proposing anything."
        >
          <p>
            <strong>A conventional 4&ndash;20 mA loop, HART or not, suits:</strong>
          </p>
          <ul>
            <li>
              <strong>Anything where independence matters.</strong> One measurement, one pair of
              wires, one failure. A shared digital network means a single fault can take several
              measurements with it — which is a serious consideration for anything protective.
            </li>
            <li>
              <strong>Sites where familiarity is the constraint.</strong> Every instrument
              technician can fault-find a current loop with a meter. Fieldbus diagnosis needs tools
              and training that a small site may not have.
            </li>
            <li>
              <strong>Retrofit into existing infrastructure.</strong> HART in particular was
              designed so that existing wiring and input cards keep working.
            </li>
          </ul>
          <p>
            <strong>A fully digital protocol earns its place where:</strong>
          </p>
          <ul>
            <li>
              <strong>Many devices share a run.</strong> The cabling saving on a large installation
              is substantial, and it is often the deciding argument.
            </li>
            <li>
              <strong>Devices report several variables.</strong> A multivariable transmitter reduced
              to a single 4&ndash;20 mA output is being wasted.
            </li>
            <li>
              <strong>Diagnostics are actually going to be used.</strong> This is the honest test —
              and, as noted above, a great deal of installed capability reports to nobody.
            </li>
          </ul>
          <p>
            One point that ought to be obvious and frequently is not: this is rarely a free choice.
            The control system, the existing marshalling and the site&rsquo;s spares holding usually
            determine it. Understanding the trade-off matters less for choosing and more for knowing
            what you are dealing with when you arrive at an unfamiliar plant.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Assuming a digital protocol removes the need to understand the analogue loop"
          whatHappens="An instrument person comfortable with a handheld communicator treats every problem as a configuration problem, interrogating the device and adjusting settings. The actual fault is a poor termination adding resistance to the loop, or a supply that cannot drive the loop at 20 mA — neither of which appears in a configuration screen."
          doInstead="Keep the two layers separate in your head. The digital conversation tells you what the instrument believes; the analogue loop determines whether that belief reaches the control system intact. Module 7 covers loop integrity properly — but the habit starts by asking whether a problem is one of information or of the circuit carrying it."
        />

        <CommonMistake
          title="Treating higher resolution as better measurement"
          whatHappens="A specification is written demanding a higher-bit converter on the assumption that this improves the measurement. The converter is not the limiting factor — the sensing element and installation are — so the change costs money and improves nothing except the number of decimal places on the display."
          doInstead="Establish what actually limits the measurement before specifying against it. If the sensing element and its installation contribute far more uncertainty than one converter count, extra bits add precision to an inaccurate number. More decimal places on a wrong reading is not an improvement, and it can be actively misleading."
        />

        <FAQ
          items={[
            {
              question: 'If digital protocols are better, why is 4–20 mA still everywhere?',
              answer:
                'Because its advantages are still real: immunity to voltage drop, a live zero that makes a broken loop obvious, universal compatibility, and simplicity when fault-finding. HART was designed to add digital capability without giving any of that up, which is why it succeeded where replacing the current outright did not.',
            },
            {
              question: 'What is the practical difference between HART and a fieldbus?',
              answer:
                'HART keeps the 4–20 mA loop and superimposes digital communication on it, so one wire pair carries one primary measurement. A fieldbus is fully digital and can carry many devices and many variables on a shared network. Fieldbus offers more; HART offers compatibility with everything already installed.',
            },
            {
              question: 'Does a digital signal remove measurement error?',
              answer:
                'No. It removes the errors introduced by transmitting an analogue signal — voltage drop, noise pickup, conversion at each end. It does nothing about the sensing element, the installation or the assumptions behind the measurement, which are where most of the error in this module has come from.',
            },
            {
              question:
                'A handheld cannot communicate with a transmitter that is reading fine. Why?',
              answer:
                'HART needs a minimum loop resistance to develop the signal across, so a loop with too little resistance can carry the 4–20 mA perfectly while leaving the digital signal unusable. The measurement working is not evidence that communication should. It is a genuinely confusing fault the first time you meet it, and Module 7 covers loop load properly.',
            },
            {
              question: 'How do I know the sampling rate of a loop?',
              answer:
                'It is a property of the input card and the controller scan rather than the instrument, so it comes from the control system configuration rather than the transmitter datasheet. It is worth knowing for any fast loop, and worth checking before concluding that a loop needs retuning.',
            },
            {
              question: 'Can aliasing be fixed by filtering?',
              answer:
                'Filtering the signal before it is sampled is the standard defence, because it removes the high-frequency content that would otherwise be misinterpreted. Filtering afterwards cannot help — once a fast signal has been sampled as a slow one, the original information is gone and no processing recovers it.',
            },
            {
              question: 'Can I change a transmitter’s damping from a handheld?',
              answer:
                'On a HART instrument, yes — damping is a configuration parameter like ranging. That convenience is exactly why it gets abused: it is quick, it makes an ugly trend look better, and it leaves no obvious trace. Treat a damping change as a decision worth recording, not a display preference.',
            },
            {
              question: 'Why would a transmitter report its own internal temperature?',
              answer:
                'Partly for diagnostics — electronics have operating limits and knowing they are being approached is useful. And partly because, as Section 2.2 showed, a thermocouple transmitter must measure its own terminals to perform reference junction compensation, so it already knows.',
            },
          ]}
        />

        <ConceptBlock
          title="Where the error actually enters, end to end"
          plainEnglish="Follow one measurement from the process to the operator's screen and count the places it can be degraded. There are more than most people expect."
          onSite="When a number is disputed, ask which stage is being blamed. Most arguments happen because two people are talking about different links in the same chain."
        >
          <p>
            Section 1.1 introduced the chain and Section 2.4 named the pattern behind sensor errors.
            This section adds the digital half, so the whole path can now be laid out:
          </p>
          <ul>
            <li>
              <strong>The process itself</strong> — is the sensor seeing a representative part of
              it, or a stagnant corner?
            </li>
            <li>
              <strong>The sensing element</strong> — its own accuracy, and whatever property it
              quietly depends on.
            </li>
            <li>
              <strong>The installation</strong> — thermowell lag, impulse lines, straight run, where
              the tapping is.
            </li>
            <li>
              <strong>The transmitter</strong> — its ranging, its damping, its own error.
            </li>
            <li>
              <strong>The loop</strong> — voltage drop and noise, which 4&ndash;20 mA largely
              defeats and Module 3 covers.
            </li>
            <li>
              <strong>The converter</strong> — resolution, and the sampling rate that becomes dead
              time.
            </li>
            <li>
              <strong>The scaling</strong> — whether the control system agrees with the transmitter
              about what 4 mA and 20 mA mean.
            </li>
            <li>
              <strong>The display</strong> — how many decimal places are shown, and whether that
              implies a precision the chain cannot support.
            </li>
          </ul>
          <p>
            Eight opportunities, and only two of them are the instrument most people would point at.
            That is the honest picture of why instrument work is more about proving than repairing —
            and why Module 8 approaches fault-finding by walking this chain rather than by testing
            components.
          </p>
        </ConceptBlock>

        <KeyTakeaways
          points={[
            'It is rarely analogue OR digital. HART carries a digital signal superimposed on the 4–20 mA loop, and both work at once on the same two wires.',
            'Being able to talk to an instrument from anywhere on the loop matters most in a classified area, where not opening an enclosure removes a whole category of risk and permit.',
            'A HART transmitter works with a conventional analogue input card — you lose the extra information, not the measurement.',
            'Converter resolution sets a hard floor on the smallest visible change. A 12-bit converter gives 4096 counts across the span, and re-ranging changes what each count is worth.',
            'Resolution is not accuracy. Extra bits on a poorly installed measurement add decimal places, not truth.',
            'Nyquist gives twice the fundamental frequency as the theoretical minimum sample rate; ten times or more per cycle is realistic.',
            'Industrial processes are forgiving — a large furnace may be sampled once a minute, and fast loops need only a few samples per second.',
            '🔴 The time between samples is dead time. In alarms it delays the warning; in feedback loops excessive dead time leads to oscillation and instability.',
            'Aliasing makes a fast signal appear slow. Unlike other faults in this module it produces a wrong SHAPE rather than a wrong number, and it looks entirely plausible.',
            'Damping smooths a display by delaying it. Used to hide noise it adds dead time and makes an unstable loop worse, not better.',
            'A discrete signal is digital too — one bit, to a digital input card. Wire safety-relevant detectors normally closed so a broken wire looks like the unsafe condition.',
            'Smart diagnostics only help if the information reaches somebody. A great deal of installed HART capability reports to nobody.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 2.5" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Level, position and proximity
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-6')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Choosing the right sensor
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule2Section5;
