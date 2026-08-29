/**
 * Module 4 · Section 2 — Frequency and time-based measurements
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE FRAMING. Frequency is the one quantity on this module measured by
 * COUNTING rather than by comparison, and counting has a completely different
 * error structure from analogue measurement. Section 1's errors were all about
 * the instrument disturbing the circuit; none of that applies here. What
 * applies instead is that you can only ever count whole events, so there is an
 * irreducible ±1 count uncertainty on every reading.
 *
 * 🔴 THE PAYOFF, and the reason this page is worth a learner's time: that ±1 is
 * a fixed number of COUNTS, not a fixed percentage — so its significance
 * depends entirely on how many counts you accumulated. Count few and it ruins
 * the reading; count many and it vanishes. That single fact derives the
 * frequency/period crossover:
 *
 *   3 Hz counted over a 1 s gate  → 3 counts ±1  → ±33%      (useless)
 *   3 Hz measured as a period     → 333 333 ticks ±1 → ±0.0003%  (excellent)
 *   1 MHz counted over a 1 s gate → 1 000 000 ±1 → ±0.0001%  (excellent)
 *   1 MHz measured as a period    → 1 tick ±1    → ±100%     (useless)
 *
 * Taught that way, "measure period at low frequency and frequency at high
 * frequency" stops being a rule to memorise and becomes something the learner
 * can derive at a terminal block.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §22.4.1 (turbine flowmeters — f = kQ, Q = f/k, V = ft/k, and the turndown
 * ratio contrast against orifice plates). The counter resolution arithmetic is
 * derived here from first principles and checked numerically; it is not taken
 * from the source. Extracted to scratchpad/src/m4_turbine.txt.
 * Held in ~/Desktop/hav/instrumentation.
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

const TITLE = 'Frequency and time-based measurements | Instrumentation Module 4.2 | Elec-Mate';
const DESCRIPTION =
  'Why a counted measurement always carries a ±1 count uncertainty, how that derives the frequency-versus-period crossover, what a K-factor is and how pulses totalise into volume, and why duty cycle and pulse width are measurements in their own right.';

const outcomes = [
  'State the relationship between frequency and period and convert between them',
  'Explain why every counted measurement carries an irreducible ±1 count uncertainty',
  'Work out whether to measure frequency or period for a given signal, and justify it',
  'Describe the trade-off in choosing a gate time',
  'Use a K-factor to convert a pulse frequency into a flow rate and a total',
  'Explain why a turbine meter has a far better turndown ratio than an orifice plate',
  'Say what pulse width and duty cycle measure and where each is used',
  'Explain why a threshold set wrongly produces miscounts rather than a wrong amplitude',
];

const quizQuestions = [
  {
    id: 1,
    question: 'A signal has a period of 4 ms. What is its frequency?',
    options: ['250 Hz', '400 Hz', '4 Hz', '40 Hz'],
    correctIndex: 0,
    explanation:
      'f = 1 ÷ T = 1 ÷ 0.004 s = 250 Hz. Frequency and period carry exactly the same information — they are reciprocals — but as this section shows, measuring one is not the same job as measuring the other.',
  },
  {
    id: 2,
    question: 'Why does a frequency counter always carry a ±1 count uncertainty?',
    options: [
      'Because its internal clock drifts',
      'Because it can only count whole events, and the gate window will not align exactly with the signal',
      'Because the input threshold is imprecise',
      'Because of noise on the signal',
    ],
    correctIndex: 1,
    explanation:
      'The counter opens a gate for a set time and counts transitions. The gate does not begin and end in step with the signal, so the final event may fall just inside or just outside. That is inherent to counting and no amount of instrument quality removes it.',
  },
  {
    id: 3,
    question:
      'A 3 Hz signal is measured by counting cycles over a 1 second gate. What is the resolution of that reading?',
    options: [
      'About ±0.03 per cent',
      'About ±1 per cent',
      'About ±33 per cent',
      'About ±3 per cent',
    ],
    correctIndex: 2,
    explanation:
      'Three counts in the gate, with a ±1 count uncertainty, is ±1 in 3 — about ±33 per cent. The instrument is not faulty and the gate is not unreasonable; the reading is simply worthless because so few events were counted.',
  },
  {
    id: 4,
    question: 'What is the right way to measure a low-frequency signal accurately?',
    options: [
      'Amplify the signal first',
      'Use a higher-resolution counter',
      'Count cycles over a much longer gate time, accepting the slow update',
      'Measure the period instead — time one cycle against a fast clock, accumulating many counts',
    ],
    correctIndex: 3,
    explanation:
      'Timing one cycle of a 3 Hz signal against a 1 MHz clock accumulates about 333 333 ticks, so ±1 tick is around ±0.0003 per cent. Both options work in principle — a longer gate helps too — but measuring the period gets the resolution without waiting, which is why instruments switch to it at low frequencies.',
  },
  {
    id: 5,
    question: 'Why is measuring the period the wrong choice for a 1 MHz signal?',
    options: [
      'One cycle is 1 µs, so a 1 MHz reference clock accumulates only a single tick — a ±100 per cent uncertainty',
      'The signal amplitude is too small at that frequency',
      'The period becomes non-linear at high frequency',
      'Periods cannot be measured above a few kilohertz',
    ],
    correctIndex: 0,
    explanation:
      'The same ±1 count argument runs the other way. At high frequency there is almost nothing to count within one cycle, whereas counting cycles over a 1 second gate accumulates a million of them and gives about ±0.0001 per cent. Which method wins depends entirely on which one accumulates more counts.',
  },
  {
    id: 6,
    question:
      'A turbine flowmeter has a K-factor of 250 pulses per litre and outputs 40 Hz. What is the flow rate?',
    options: [
      '0.16 litres per minute',
      '9.6 litres per minute',
      '6.25 litres per minute',
      '160 litres per minute',
    ],
    correctIndex: 1,
    explanation:
      'Q = f ÷ k = 40 ÷ 250 = 0.16 litres per second, which is 9.6 litres per minute. The K-factor is the bridge between a frequency and an engineering unit, and it is a property of the individual meter.',
  },
  {
    id: 7,
    question: 'The same meter runs at a steady 40 Hz for 5 minutes. What total volume has passed?',
    options: ['0.8 litres', '12 litres', '48 litres', '480 litres'],
    correctIndex: 2,
    explanation:
      'V = f × t ÷ k = 40 × 300 ÷ 250 = 48 litres. Equivalently, 0.16 l/s for 300 s. Totalising is the natural strength of a pulse signal — the count is the integral, with no extra arithmetic needed.',
  },
  {
    id: 8,
    question:
      'Why does a turbine meter achieve a much better turndown ratio than an orifice plate?',
    options: [
      'It can be installed in a smaller pipe',
      'It measures mass rather than volume',
      'It has no moving parts to wear',
      'Its output frequency is linear with flow, whereas an orifice plate’s differential pressure varies with the square of flow',
    ],
    correctIndex: 3,
    explanation:
      'Linearity is the whole advantage. Module 3 Section 4 showed how the square-root relationship magnifies error at the bottom of a DP range, limiting orifice meters to turndowns of about 4:1 at best. A turbine meter’s linear frequency output commonly exceeds 10:1.',
  },
];

const InstrumentationModule4Section2 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 2"
        title="Frequency and time"
        backTo="/electrician/upskilling/instrumentation-module-4"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The one quantity you measure by counting — which means an entirely different set of errors
          from everything in Section 1.
        </p>

        <TLDR
          points={[
            'Frequency and period are reciprocals — f = 1 ÷ T — and carry identical information. Measuring one is not the same job as measuring the other.',
            'Section 1’s errors came from the instrument disturbing the circuit. None of that applies here. Counting has its own error, and it is a different shape.',
            '🔴 A counter can only count whole events, and its gate does not align with the signal — so every counted reading carries a ±1 count uncertainty.',
            '🔴 That ±1 is a fixed number of counts, not a fixed percentage. Its significance depends entirely on how many counts you accumulated.',
            '3 Hz over a 1 s gate is 3 counts ±1 — about ±33 per cent, and worthless.',
            'Time one cycle of that same 3 Hz against a 1 MHz clock and you accumulate 333 333 ticks — about ±0.0003 per cent.',
            'The rule inverts at the top: a 1 MHz signal counted over 1 s gives ±0.0001 per cent, but its period is one tick, or ±100 per cent.',
            'So measure period at low frequency and frequency at high frequency — derived, not memorised. Whichever accumulates more counts wins.',
            'A longer gate improves resolution and slows the update. That is dead time, and Module 3 Section 4 covered what it costs a control loop.',
            'K-factor converts pulses to engineering units: f = kQ, so Q = f ÷ k and total volume V = f × t ÷ k.',
            'A turbine meter’s linear output gives turndowns commonly beyond 10:1, against about 4:1 at best for an orifice plate.',
            'A wrong threshold does not give a wrong amplitude — it gives a wrong count, and on a totaliser that error never comes back.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>A different kind of measurement</ContentEyebrow>

        <ConceptBlock
          title="Counting, not comparing"
          plainEnglish="Every other measurement asks how big something is. This one asks how many times something happened, and that changes what can go wrong."
          onSite="None of Section 1's loading, burden or self-heating problems apply to a frequency measurement. A different list applies instead."
        >
          <p>
            Frequency and period describe the same thing from two directions, and converting between
            them is the one piece of arithmetic on this page everybody already knows:
          </p>
          <p>
            <strong>f = 1 &divide; T</strong> and <strong>T = 1 &divide; f</strong>
          </p>
          <p>
            A signal repeating every 4 milliseconds has a frequency of 250 Hz. A 50 Hz supply has a
            period of 20 milliseconds. Nothing controversial there.
          </p>
          <p>
            What is worth pausing on is that{' '}
            <strong>carrying the same information does not make them the same measurement</strong>.
            An instrument measuring frequency and an instrument measuring period are doing genuinely
            different jobs internally, they fail differently, and — as the next block shows — one of
            them can be excellent where the other is useless on the very same signal.
          </p>
          <p>
            Notice first what has fallen away. Section 1 was built on the instrument disturbing the
            circuit: loading a source, adding burden, heating an element. A frequency measurement
            cares about none of that. It does not matter how big the pulses are, only that they can
            be told apart from the gaps &mdash; which is Module 3 Section 1&rsquo;s argument for why
            frequency signals survive a cable run.
          </p>
          <p>
            In exchange, counting brings a problem of its own that has no analogue equivalent at
            all.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The ±1 count</ContentEyebrow>

        <ConceptBlock
          title="🔴 You can only ever count whole things"
          plainEnglish="The counter opens a window for a fixed time and counts what arrives. The window does not line up with the signal, so the last event might land just inside or just outside."
          onSite="This is not an instrument defect and it is not noise. It is present on every counted reading ever taken."
        >
          <p>
            A frequency counter works by opening a <strong>gate</strong> for a precisely known
            period &mdash; often one second &mdash; and counting the signal transitions that occur
            while it is open. Divide the count by the gate time and you have a frequency.
          </p>
          <p>
            The gate, however, has no relationship to the signal. It opens when the
            instrument&rsquo;s clock says so, not when a cycle starts. So the first and last cycles
            in the window are partial, and whether they get counted is a matter of where the edges
            happen to fall.
          </p>
          <p>
            The result is an unavoidable <strong>&plusmn;1 count uncertainty</strong> on every
            reading. It is the counting equivalent of the quantisation error Module 3 Section 4
            described: not a fault, but the price of representing something continuous with whole
            numbers.
          </p>
          <p>
            Here is the part that actually matters on site, and it is easy to miss.{' '}
            <strong>The uncertainty is a fixed number of counts, not a fixed percentage.</strong>{' '}
            One count out of a million is nothing. One count out of three is a disaster. So the
            quality of a counted measurement depends almost entirely on{' '}
            <strong>how many counts you managed to accumulate</strong> — and that is something you
            can influence.
          </p>
        </ConceptBlock>

        <Pullquote>
          Everything else on this page follows from one sentence: the error is one count, so the
          answer is to arrange to count a lot of them.
        </Pullquote>

        <ConceptBlock
          title="Why low frequencies defeat a frequency counter"
          plainEnglish="Three events in a second is three events. Being one out of three is being a third wrong."
          onSite="If a slow-pulsing signal reads erratically in whole steps rather than wandering, this is why."
        >
          <p>
            Work a slow signal through. A flowmeter at low flow produces 3 Hz, measured on a counter
            with a one-second gate.
          </p>
          <ul>
            <li>
              Counts accumulated in the gate: <strong>3</strong>
            </li>
            <li>
              Uncertainty: <strong>&plusmn;1 count</strong>
            </li>
            <li>
              So the reading is 3 &plusmn; 1 &mdash; about <strong>&plusmn;33 per cent</strong>
            </li>
          </ul>
          <p>
            A third. The instrument is working exactly as designed, the gate time is entirely
            reasonable, and the number it produces is not fit to be used for anything.
          </p>
          <p>
            You can see the symptom as well as the cause. A reading like this does not drift or
            wander the way a noisy analogue signal does &mdash; it jumps between whole values, 2, 3,
            4, because whole counts are the only outcomes available. A display stepping in
            suspiciously round jumps at low readings is this effect, visible.
          </p>
          <p>
            One remedy is obvious: open the gate for longer. Ten seconds gives 30 counts and
            &plusmn;3 per cent; a hundred seconds gives 300 counts and &plusmn;0.3 per cent. It
            works, and you have bought resolution with time, which a control loop may not have to
            spare.
          </p>
          <p>There is a better answer.</p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Turn the measurement round — time the period instead"
          plainEnglish="Rather than counting how many slow events happen in a second, count how many fast clock ticks fit inside one slow event."
          onSite="Good instruments switch methods automatically. Knowing they do explains why resolution changes across the range."
        >
          <p>
            Instead of counting signal cycles against a clock, count{' '}
            <strong>clock ticks against one signal cycle</strong>. The signal now opens and closes
            the gate, and the instrument&rsquo;s own fast reference clock is what gets counted.
          </p>
          <p>Run the same 3 Hz signal through that arrangement, with a 1 MHz reference clock:</p>
          <ul>
            <li>
              Period of the signal: 1 &divide; 3 = <strong>333.33 ms</strong>
            </li>
            <li>
              Clock ticks in one period: 0.3333 &times; 1 000 000 &asymp;{' '}
              <strong>333 333 ticks</strong>
            </li>
            <li>
              Uncertainty: &plusmn;1 tick in 333 333 &mdash; about{' '}
              <strong>&plusmn;0.0003 per cent</strong>
            </li>
          </ul>
          <p>
            The same signal, the same &plusmn;1 count rule, and the resolution has improved by a
            factor of roughly a hundred thousand. Nothing was amplified, filtered or upgraded. The
            measurement was simply arranged so that a great many counts accumulated instead of very
            few.
          </p>
          <p>
            And the argument reverses at the top of the range, which is the part that makes it a
            genuine engineering decision rather than a trick. Take a 1 MHz signal:
          </p>
          <AppendixTable
            caption="Which method wins, and by how much"
            headers={['Signal', 'Count cycles in a 1 s gate', 'Time one period with a 1 MHz clock']}
            rows={[
              ['3 Hz', '3 counts → about ±33%', '333 333 ticks → about ±0.0003%'],
              ['1 kHz', '1 000 counts → about ±0.1%', '1 000 ticks → about ±0.1%'],
              ['1 MHz', '1 000 000 counts → about ±0.0001%', '1 tick → about ±100%'],
            ]}
            notes="The crossover is wherever the two accumulate a similar number of counts — around 1 kHz for these particular figures. Change the gate time or the clock rate and the crossover moves."
          />
          <p>
            So the working rule is{' '}
            <strong>measure period at low frequencies and frequency at high ones</strong> &mdash;
            and it is worth having as a conclusion rather than a rule, because then you can rederive
            it when the numbers are different.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-2-crossover"
          question="A vibration monitor must resolve a shaft speed of about 6 Hz to better than 0.5 per cent, and update at least once a second. Counting cycles over a 1 s gate gives 6 counts. What should the instrument do?"
          options={[
            'Measure the period against a fast clock, which gives far better resolution within a single cycle',
            'Amplify the pulse signal',
            'Accept ±17 per cent as the best achievable',
            'Extend the gate time to 200 seconds',
          ]}
          correctIndex={0}
          explanation="Extending the gate would work for resolution but destroys the update requirement — 200 seconds is not once a second. Timing one 167 ms period against a megahertz clock accumulates about 167 000 ticks, meeting both requirements at once. That is exactly why instruments switch method at the bottom of their range."
        />

        <SectionRule />
        <ContentEyebrow>Gate time is a trade</ContentEyebrow>

        <ConceptBlock
          title="Resolution against responsiveness"
          plainEnglish="A longer look gives a better number and an older one. You cannot have both."
          onSite="If a frequency reading is stable but sluggish, check the gate time before suspecting the process."
        >
          <p>
            Gate time is usually adjustable, and choosing it is the same shape of decision as
            choosing a damping value in Module 3 Section 3.
          </p>
          <ul>
            <li>
              <strong>A longer gate</strong> accumulates more counts, so the &plusmn;1 matters less
              and the resolution improves.
            </li>
            <li>
              <strong>A longer gate</strong> also means the reading updates less often, and each
              reading describes an average over a longer window.
            </li>
          </ul>
          <p>
            That second point is dead time by another name. The interval between updates is time
            during which a control system cannot react, and Module 3 Section 4 explained why dead
            time is the enemy of stable control. A frequency input on a fast loop can be quietly
            throttled by a gate time somebody set for a tidy display.
          </p>
          <p>
            The averaging is worth noticing too. A reading taken over a ten-second gate is not the
            frequency now &mdash; it is the mean frequency over the last ten seconds. If the process
            genuinely varies within that window, the instrument is smoothing real behaviour out of
            existence, which is the over-damping argument arriving in a new form.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-2-gate"
          question="A frequency input on a fast pressure loop is set to a 5 second gate time because it gave a tidier display. What has that cost the control system?"
          options={[
            'Nothing — gate time only affects the display',
            'Up to 5 seconds of dead time, plus averaging that hides real variation within each window',
            'A loss of accuracy proportional to the gate time',
            'The input will miss pulses between gates',
          ]}
          correctIndex={1}
          explanation="The reading updates once every 5 seconds, so the controller is blind between updates — that is dead time, and Module 3 Section 4 explained why it destabilises a loop. Each reading is also a 5 second average, so genuine variation inside the window never reaches the control system at all. Resolution improved; responsiveness was spent to buy it."
        />

        <SectionRule />
        <ContentEyebrow>From pulses to engineering units</ContentEyebrow>

        <ConceptBlock
          title="The K-factor, and why it belongs to one specific meter"
          plainEnglish="How many pulses the device produces per litre, per metre, or per revolution. Divide the frequency by it and you have a rate."
          onSite="The K-factor is on the meter's own calibration certificate. It is not a property of the model — it is a property of that individual unit."
        >
          <p>
            Module 3 Section 2 flagged that pulse outputs need three things established before they
            can be connected: the electrical form, the thresholds, and the K-factor. This is that
            third one.
          </p>
          <p>
            A turbine flowmeter puts a rotor in the flow and generates a pulse each time a blade
            passes the pickup coil. The faster the fluid, the faster the rotor, the higher the
            frequency:
          </p>
          <p>
            <strong>f = kQ</strong>
          </p>
          <p>
            where <em>f</em> is the output frequency in pulses per second, <em>Q</em> is the
            volumetric flow rate, and <em>k</em> is the K-factor in pulses per unit volume.
            Rearranged for the thing you actually want:
          </p>
          <p>
            <strong>Q = f &divide; k</strong>
          </p>
          <p>
            Work one. A meter with a K-factor of 250 pulses per litre is producing 40 Hz. Q = 40
            &divide; 250 = 0.16 litres per second, or <strong>9.6 litres per minute</strong>.
          </p>
          <p>
            The units check out, which is a useful habit for any conversion of this kind: pulses per
            second divided by pulses per litre leaves litres per second. If the units do not cancel
            to what you expected, the arithmetic is wrong before you have even checked the numbers.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Totalising — where a pulse signal genuinely excels"
          plainEnglish="Count the pulses instead of their rate and you have the total, with no extra arithmetic. The counting does the integration for you."
          onSite="This is why gas and water meters are pulse devices, and why billing systems are built on them."
        >
          <p>
            If frequency represents flow rate, then the accumulated number of pulses over any period
            represents the volume that passed during it:
          </p>
          <p>
            <strong>V = f &times; t &divide; k</strong>
          </p>
          <p>
            The same meter running steadily at 40 Hz for five minutes: V = 40 &times; 300 &divide;
            250 = <strong>48 litres</strong>.
          </p>
          <p>
            What makes this elegant rather than merely convenient is that{' '}
            <strong>the counter is doing an integration</strong>, and it does it correctly even when
            the flow is not steady. Every pulse represents a fixed quantity of fluid regardless of
            how fast it arrived, so a simple accumulating counter gives a true total through varying
            flow without anyone calculating an average. Mechanical versions of exactly this drive
            the odometer-style totalisers used for billing.
          </p>
          <p>
            That strength has a matching weakness, and Module 3 Section 1 named it. An error in a
            rate measurement is transient &mdash; the next reading corrects it. An error in a count
            is <strong>permanent</strong> until somebody resets the total. A few false counts an
            hour is a rounding error on a flow reading and a growing discrepancy on a bill.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Linearity, and a comparison worth making"
          plainEnglish="A turbine meter's frequency is directly proportional to flow. That one fact is why it works over a far wider range than an orifice plate."
          onSite="Turndown ratio is the specification to compare when a process runs across a wide range of flows."
        >
          <p>
            Module 3 Section 4 spent some time on why differential-pressure flow measurement goes
            vague at the bottom of its range: pressure varies with the square of flow, so the square
            root magnifies any error where the signal is smallest.
          </p>
          <p>
            A turbine meter has no such problem, because its output is <strong>linear</strong> with
            flow. There is no root to extract and no error amplification at the low end. The
            practical measure of that advantage is the <strong>turndown ratio</strong> &mdash; the
            span between the highest and lowest flows a meter can measure accurately:
          </p>
          <ul>
            <li>
              <strong>Orifice plate</strong> &mdash; commonly limited to about <strong>4:1</strong>{' '}
              at best.
            </li>
            <li>
              <strong>Turbine meter</strong> &mdash; commonly exceeds <strong>10:1</strong>.
            </li>
          </ul>
          <p>
            So on a process that genuinely runs from a trickle to full bore, the linear device is
            not marginally better; it covers a range the other cannot reach. That is the kind of
            comparison worth carrying into a selection decision, and Module 2 Section 6 set out the
            wider framework for making one.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Measuring time itself</ContentEyebrow>

        <ConceptBlock
          title="Pulse width and duty cycle"
          plainEnglish="Sometimes the information is not in how often the pulses come, but in how long each one lasts."
          onSite="Duty cycle turns up wherever something is controlled by switching it on and off quickly — heaters, valves, drive outputs."
        >
          <p>
            Frequency is not the only thing a repeating signal can carry. Two time-based
            measurements matter in their own right:
          </p>
          <ul>
            <li>
              <strong>Pulse width</strong> &mdash; how long a single pulse lasts. Used where the
              duration itself is the measurement: time-of-flight in an ultrasonic level or flow
              instrument, or the interval a valve is held open.
            </li>
            <li>
              <strong>Duty cycle</strong> &mdash; the proportion of each period for which the signal
              is active, expressed as a percentage. A signal high for 3 ms out of every 10 ms has a
              30 per cent duty cycle.
            </li>
          </ul>
          <p>
            Duty cycle is the one you will meet most, because it is how a great deal of proportional
            control is actually delivered. A device that can only be on or off is switched rapidly,
            and the <em>proportion</em> of on-time sets the effective output &mdash; a heater at 30
            per cent duty delivers roughly 30 per cent of its power.
          </p>
          <p>
            The measurement worth noting is that duty cycle and frequency are{' '}
            <strong>independent</strong>. A signal can hold a 30 per cent duty cycle while its
            frequency changes, or hold a fixed frequency while the duty varies. An instrument
            reporting one tells you nothing about the other, and reading a duty-cycle-modulated
            signal on a frequency counter produces a perfectly steady number that says nothing about
            what the output is doing.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-2-duty"
          question="A heater is driven by a switched output at a fixed 10 Hz. An engineer puts a frequency counter on it to check the heater demand and reads a rock-steady 10 Hz at every demand setting. Why?"
          options={[
            'The gate time is too long to see the change',
            'The counter is faulty',
            'The demand is carried in the duty cycle, which is independent of frequency — the counter is reading the wrong property',
            'The heater is not responding to the demand signal',
          ]}
          correctIndex={2}
          explanation="Duty cycle and frequency are independent. The output switches at 10 Hz whatever the demand; what changes is the proportion of each 100 ms period for which it is on. A frequency counter reports a perfectly correct and completely irrelevant number — which is why it looks like nothing is wrong."
        />

        <CommonMistake
          title="Setting a detection threshold by what makes the count look right"
          whatHappens={
            <>
              <p>
                A pulse input reads erratically, so the threshold is nudged until the number settles
                at something plausible. The reading now looks stable and may be comprehensively
                wrong.
              </p>
              <p>
                A threshold set too low counts electrical noise as pulses, inflating the reading.
                Set too high, it misses genuine pulses, deflating it. Neither produces an obviously
                broken output &mdash; both produce a believable frequency, because a count is a
                count and the instrument has no way to know which events were real.
              </p>
              <p>
                🔴 On a totaliser this is worse than a wrong rate. Miscounts accumulate, so a
                threshold quietly set wrong during commissioning becomes a permanent, growing error
                in a figure that may be used for billing or for stock reconciliation.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Establish the threshold from the signal, not from the answer. Look at the actual
                pulse train &mdash; an oscilloscope is the right instrument, and Section 4 covers
                why &mdash; and set the threshold to sit comfortably between the noise floor and the
                genuine pulse amplitude.
              </p>
              <p>
                Where the two overlap, the threshold cannot fix it and the problem is upstream:
                pickup amplitude, cable routing, or screening. Module 3 Section 5 is the section to
                work through, and a pulse signal running beside a drive cable is a common cause.
              </p>
              <p>
                Then verify against something independent. Time a known volume into a vessel, or
                compare the total against a second meter. A count is only trustworthy if something
                other than the counter agrees with it.
              </p>
            </>
          }
        />

        <Scenario
          title="A batch total that is 4 per cent high, every time"
          situation={
            <>
              <p>
                A dosing system meters additive into a batch using a turbine meter and a pulse
                totaliser. Batches consistently come out about 4 per cent over the target quantity —
                not randomly, but reliably, batch after batch.
              </p>
              <p>
                The meter has been swapped, the totaliser reset, and the flow rate reading looks
                entirely sensible during the dose.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                A consistent proportional error points at a constant, not at a fault. Faults are
                usually erratic; a steady 4 per cent is arithmetic.
              </p>
              <p>
                Check the K-factor entered in the totaliser against the figure on the meter&rsquo;s
                own calibration certificate. The K-factor is a property of the individual unit, so
                swapping the meter without updating the configured value would produce precisely
                this: a fixed proportional error that survives a meter change, because the wrong
                number is in the receiver rather than the sender.
              </p>
              <p>
                If the K-factors agree, look at the low-flow ends of the dose. A turbine rotor has
                inertia, so it takes a moment to start and it free-wheels briefly at the end of a
                batch. On a long dose that is negligible; on a short one it can be several per cent,
                and it is repeatable rather than random.
              </p>
              <p>
                Then confirm against something independent — weigh the delivered quantity. A
                totaliser cannot check itself.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                The flow rate looked sensible throughout, which is exactly why nobody suspected the
                measurement. A proportional error keeps everything looking plausible while every
                number is wrong by the same factor.
              </p>
              <p>
                It is also a reminder that a pulse device carries a number that belongs to it
                personally. Replacing hardware without carrying its calibration data across is a
                whole category of fault, and Module 6 goes into it properly.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="What to check when a counted reading looks wrong"
          plainEnglish="Counted measurements fail in a small number of recognisable ways, and the symptom usually names the cause."
          onSite="Work down this list. The shape of the wrongness is the diagnosis."
        >
          <ul>
            <li>
              <strong>Reading jumps in whole steps at low values</strong> &mdash; too few counts in
              the gate. Lengthen the gate, or use an instrument that measures period at the bottom
              of its range.
            </li>
            <li>
              <strong>Reading is stable but sluggish</strong> &mdash; gate time too long. You are
              seeing an average of the last several seconds, not the value now.
            </li>
            <li>
              <strong>Reading is high and unsteady, worse when plant runs</strong> &mdash; false
              counts from induced noise. This is Module 3 Section 5, and the pulse cable is probably
              sharing a route with something it should not.
            </li>
            <li>
              <strong>Reading is low, or drops out entirely at low speed</strong> &mdash; genuine
              pulses failing to reach the threshold. Magnetic pickups produce less amplitude as they
              slow down, so the bottom of the range is where this appears first.
            </li>
            <li>
              <strong>Rate looks right but the total does not</strong> &mdash; suspect the K-factor
              in the receiving device before suspecting the meter.
            </li>
            <li>
              <strong>Reading is perfectly steady and does not respond at all</strong> &mdash; check
              you are measuring the property that carries the information. A duty-modulated output
              has a constant frequency.
            </li>
          </ul>
          <p>
            Two of those &mdash; the third and the fourth &mdash; look similar on a display and have
            opposite causes. The distinguishing question is whether the error grows with plant
            activity or with low speed.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Does a multimeter’s Hz function work on any signal?',
              answer:
                'Within limits, and the limits are about amplitude rather than frequency. A counter needs the signal to cross its input threshold cleanly, so a low-level pickup output — a few hundred millivolts from a magnetic sensor at low speed, for instance — may not trigger it at all, or may trigger erratically. The reading being absent or jumping in whole steps is the clue. A dedicated input or a scope is the answer.',
            },
            {
              question: 'What reference clock does a period measurement actually use?',
              answer:
                'The instrument’s internal timebase, typically a crystal oscillator running at megahertz. Its accuracy sets a floor on the measurement in the same way a reference standard does anywhere else, though for industrial work a crystal is far more stable than anything else in the chain. The figures in this section use 1 MHz for arithmetic that is easy to follow; real instruments often run faster, which improves the low-frequency resolution further.',
            },
            {
              question: 'Can I improve a low-frequency reading by averaging several of them?',
              answer:
                'Somewhat, and with the same caveats Module 3 Section 4 gave for averaging generally. Averaging several independent readings does reduce the random part of the scatter, but it costs response time, and it cannot help if the underlying problem is a systematic miscount rather than random ±1 jitter. Switching to a period measurement addresses the cause instead of diluting the symptom.',
            },
            {
              question: 'Is mains frequency worth monitoring on a site?',
              answer:
                'It is monitored closely at grid level, because frequency reflects the moment-to-moment balance between generation and demand. On most industrial sites it is not something you would measure routinely, though it matters where equipment is sensitive to it or where a site runs generation of its own and has to synchronise. What is worth knowing is that supply frequency is held within tight limits, so a genuinely unusual frequency reading on site is far more likely to be a measurement problem than a grid one.',
            },
            {
              question: 'Why do some flowmeters have a low-flow cutoff on the pulse output?',
              answer:
                'For the same reason a DP flowmeter does, arrived at differently. At very low flow a turbine rotor may stall, stick or turn erratically, and any stray pulses from vibration or noise become significant relative to a genuinely tiny count. A cutoff forces the reported flow to zero below a threshold so that noise is not totalised as product. The trade is the same as in Module 3 Section 4: a genuine trickle reads as nothing.',
            },
            {
              question: 'How do I check a K-factor if the certificate is missing?',
              answer:
                'By comparison against a known quantity — pass a measured volume through the meter and count the pulses, then divide. That gives a working K-factor for that meter under those conditions, which is better than a guess and not equivalent to a calibration. It is worth being clear about the difference: a certificate records a traceable comparison under controlled conditions, which Module 1 Section 4 explained the value of, and a site check does not replace it.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Frequency and period are reciprocals carrying identical information — but measuring one is a different job from measuring the other.',
            'Section 1’s errors came from disturbing the circuit. Counting does not disturb anything, and brings its own error instead.',
            '🔴 Every counted measurement carries a ±1 count uncertainty, because the gate does not align with the signal and only whole events can be counted.',
            '🔴 That ±1 is a fixed number of counts, not a percentage. How much it matters depends entirely on how many counts accumulated.',
            '3 Hz over a 1 s gate is 3 counts ±1 — about ±33 per cent. The symptom is a reading that jumps in whole steps rather than wandering.',
            'Time one cycle of that 3 Hz against a 1 MHz clock and you get about 333 333 ticks — around ±0.0003 per cent, with no change of hardware.',
            'The argument reverses at 1 MHz: counting cycles gives ±0.0001 per cent, timing the period gives ±100 per cent.',
            'Measure period at low frequency and frequency at high frequency. Whichever accumulates more counts wins — derive it rather than memorise it.',
            'A longer gate buys resolution with time. That time is dead time, and it averages away real variation within the window.',
            'K-factor bridges pulses and engineering units: f = kQ, so Q = f ÷ k, and V = f × t ÷ k.',
            'The K-factor belongs to the individual meter, not the model. Swapping hardware without carrying it across gives a fixed proportional error that survives the swap.',
            'Counting pulses performs a true integration, correct even through varying flow — which is why totalisers and billing meters are pulse devices.',
            'A turbine meter’s linear output gives turndowns commonly beyond 10:1, against about 4:1 for an orifice plate, because there is no square root to magnify low-end error.',
            'Duty cycle and frequency are independent. A frequency counter on a duty-modulated output reads a steady number that says nothing about the output.',
            '🔴 A wrong threshold produces a wrong count, not a wrong amplitude — and on a totaliser miscounts accumulate permanently.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 4.2" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4-section-1')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Voltage, current, resistance
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Accuracy and error
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule4Section2;
