/**
 * Module 3 · Section 4 — Signal scaling, conversions and where error enters
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE FRAMING. Scaling looks like arithmetic homework. The reason it earns
 * a section is that a real measurement is a CHAIN of conversions — process to
 * sensor, sensor to transmitter, current to voltage, voltage to counts, counts
 * back to engineering units — and every one of those handovers is a place
 * error can enter. Teach the method once (per unit, from Section 1), then
 * spend the page on the five distinct ways the chain degrades:
 *
 *   1. Ranges that do not agree      → not an error, a WRONG ANSWER (Section 2)
 *   2. Component tolerance           → the 250 Ω resistor is in the measurement
 *   3. Quantisation                  → a count is a RANGE of inputs, not a point
 *   4. Sampling rate                 → dead time, and aliasing
 *   5. Non-linear characterisation   → square root, and where it must happen ONCE
 *
 * The square-root material matters most in practice: applying extraction twice
 * (transmitter AND host) is a classic commissioning fault, and the error
 * amplification at the bottom of a DP flow range is why low-flow cutoff exists.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §13.2 / §13.2.8 (per unit), §15.3.1 (converter resolution, counts,
 * quantisation error, the over-ranged ADC worked example), §15.3.2 (sampling
 * rate, Nyquist, aliasing, dead time) and §26.1 (square-root characterisation
 * of differential-pressure flow). Extracted to scratchpad/src/m3_scaling.txt
 * and m3s4_adc.txt. Held in ~/Desktop/hav/instrumentation.
 *
 * The furnace worked example is re-derived in metric with our own numbers and
 * checked arithmetically — it is not the source's °F example re-labelled.
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

const TITLE =
  'Signal scaling, conversions and where error enters | Instrumentation Module 3.4 | Elec-Mate';
const DESCRIPTION =
  'The per-unit method applied across a whole measurement chain, converter counts and quantisation error, sampling rate and aliasing, and square-root characterisation of differential-pressure flow — including why extracting the root twice is a classic commissioning fault.';

const outcomes = [
  'Convert between any two linear ranges using the per-unit method',
  'Handle ranges that do not begin at zero, including converters that over-range deliberately',
  'Calculate the resolution of a converter from its bit width and analogue span',
  'Explain what quantisation error is and why a count represents a range of inputs',
  'State the minimum sampling rate for a waveform and why practice uses far more',
  'Describe aliasing and recognise the symptom it produces on a trend',
  'Explain why differential-pressure flow needs a square root, and what that does to low-flow accuracy',
  'Say where in a system square-root extraction should happen, and why exactly once',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A transmitter is ranged −20 to 60 °C with a 4–20 mA output. What current corresponds to 0 °C?',
    options: ['9.33 mA', '12 mA', '4 mA', '8 mA'],
    correctIndex: 3,
    explanation:
      'Per unit = (0 − (−20)) ÷ (60 − (−20)) = 20 ÷ 80 = 0.25. Output = (0.25 × 16) + 4 = 8 mA. Negative lower-range values are exactly where people slip, because the instinct is to treat 0 °C as the bottom of the range. It is not — −20 °C is.',
  },
  {
    id: 2,
    question:
      'A 12-bit converter has a 0–10 V input range. What is the smallest voltage change it can resolve?',
    options: ['About 2.44 mV', 'About 8.3 mV', 'About 24.4 mV', 'About 0.61 mV'],
    correctIndex: 0,
    explanation:
      'Resolution = analogue span ÷ (2ⁿ − 1) = 10 V ÷ 4095 ≈ 2.442 mV. A 12-bit converter has 4096 possible count values, which divide the span into 4095 increments. Note the minus one — the counts are the fence posts and the increments are the gaps between them.',
  },
  {
    id: 3,
    question: 'What does quantisation error mean?',
    options: [
      'The converter occasionally produces a wrong count',
      'Any single count value corresponds to a range of possible input voltages, so some detail is inevitably lost',
      'The converter drifts with temperature',
      'The signal is sampled too slowly',
    ],
    correctIndex: 1,
    explanation:
      'It is not a fault — it is inherent to representing something infinitely variable with a discrete number. One input voltage gives one count, but one count could have come from any input within a span equal to the converter’s resolution. More bits make that span smaller; nothing makes it zero.',
  },
  {
    id: 4,
    question:
      'According to the Nyquist sampling theorem, what is the absolute minimum rate at which a waveform must be sampled?',
    options: [
      'The same as its fundamental frequency',
      'Twice its fundamental frequency',
      'Ten times its fundamental frequency',
      'It depends on the converter’s bit width',
    ],
    correctIndex: 1,
    explanation:
      'Twice the fundamental frequency is the theoretical minimum to capture the waveform at all. In practice ten samples per cycle or more is the realistic target, because the theoretical minimum captures the frequency and very little else about the shape.',
  },
  {
    id: 5,
    question: 'A vibration at 51 Hz is sampled once every second. What does the system see?',
    options: [
      'A 51 Hz signal',
      'Nothing — the signal is too fast to register at all',
      'An apparently slow drift, because each sample lands at a slightly different point in the cycle',
      'A 51 Hz signal at reduced amplitude',
    ],
    correctIndex: 2,
    explanation:
      'This is aliasing. Sampling slower than the signal does not produce noise or a blank — it produces a convincing, smooth, entirely fictitious low-frequency signal, because consecutive samples walk slowly around the real waveform. The output looks like real data, which is what makes aliasing dangerous.',
  },
  {
    id: 6,
    question:
      'Flow through an orifice plate doubles. What happens to the differential pressure across it?',
    options: ['It halves', 'It increases by the square root of two', 'It doubles', 'It quadruples'],
    correctIndex: 3,
    explanation:
      'Pressure rises with the square of flow rate — P = kQ². Doubling Q multiplies P by four. That is why a differential-pressure flow signal must have its square root extracted before it can be read as flow, and why a raw DP gauge labelled in per cent of flow is badly misleading.',
  },
  {
    id: 7,
    question:
      'A DP transmitter is configured to extract the square root, and the DCS input block is also configured for square-root extraction. What will the flow reading do?',
    options: [
      'Read high at every point except 0 and 100 per cent',
      'Read low at every point except 0 and 100 per cent',
      'Fail to update',
      'Read correctly — the second extraction has no effect',
    ],
    correctIndex: 0,
    explanation:
      'The root is taken twice. At 25 per cent the transmitter already outputs 50 per cent, and the host roots that again to about 71 per cent. The endpoints are unaffected because √0 = 0 and √1 = 1, which is exactly why a two-point calibration check at 0 and 100 per cent will pass and hide the fault completely.',
  },
  {
    id: 8,
    question: 'Why is a differential-pressure flow measurement least trustworthy at low flow?',
    options: [
      'The transmitter is less accurate at low pressures',
      'The square-root relationship means a small differential-pressure error becomes a large flow error near zero',
      'The orifice plate erodes at low flow',
      'The signal falls below 4 mA',
    ],
    correctIndex: 1,
    explanation:
      'It is the shape of the curve, not a fault in the device. Near the bottom of the range a tiny change in differential pressure corresponds to a large change in flow, so whatever error the DP measurement carries is magnified in the flow value. Low-flow cutoff exists to stop that magnified noise being reported as real flow.',
  },
];

const InstrumentationModule3Section4 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 4"
        title="Scaling and conversion"
        backTo="/electrician/upskilling/instrumentation-module-3"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          One method converts anything to anything. The interesting part is what each conversion
          costs you.
        </p>

        <TLDR
          points={[
            'Per unit converts any linear range to any other: turn the input into a fraction from 0 to 1, then turn that fraction into the output.',
            'Converter resolution = analogue span ÷ (2ⁿ − 1). A 12-bit converter on 0–10 V resolves about 2.44 mV.',
            'Nyquist says twice the frequency is the theoretical minimum sample rate. Ten times is the realistic target.',
            'Too slow a sample rate costs you twice: dead time in the loop, and aliasing that invents a smooth low-frequency signal that was never there.',
            'Differential-pressure flow is non-linear — P = kQ². Double the flow and the pressure quadruples.',
            '🔴 The square root must be extracted exactly once. Twice and the reading is high everywhere except 0 and 100 per cent, where a two-point check would catch it.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>The method, generalised</ContentEyebrow>

        <ConceptBlock
          title="Per unit, once more, properly"
          plainEnglish="Two steps. Turn what you have into a fraction of its range. Turn that fraction into a fraction of the other range."
          onSite="Learn this as a method, not a formula. It handles negatives, over-ranges, reverse action and count values without modification."
        >
          <p>
            Section 1 introduced the per-unit method. This section leans on it heavily, so it is
            worth restating in its general form:
          </p>
          <p>
            <strong>
              per unit = (input &minus; LRV<sub>in</sub>) ÷ (URV<sub>in</sub> &minus; LRV
              <sub>in</sub>)
            </strong>
          </p>
          <p>
            <strong>
              output = per unit × (URV<sub>out</sub> &minus; LRV<sub>out</sub>) + LRV<sub>out</sub>
            </strong>
          </p>
          <p>
            The reason it is worth learning as a method is that it survives every complication the
            job throws at it, where a memorised formula does not:
          </p>
          <ul>
            <li>
              <strong>Negative lower-range values.</strong> A transmitter ranged &minus;20 to 60
              &deg;C has a span of 80 degrees, not 60. Subtracting a negative LRV is where most
              arithmetic slips happen, and writing the sum out rather than doing it in your head
              fixes it.
            </li>
            <li>
              <strong>Reverse action.</strong> Put the larger value in as LRV<sub>out</sub>. The
              arithmetic handles it.
            </li>
            <li>
              <strong>Count values.</strong> A converter&rsquo;s digital output is just another
              range, running from 0 to whatever its full-scale count is. The same two steps convert
              into it and out of it.
            </li>
            <li>
              <strong>Percentages.</strong> Per unit multiplied by 100 is the percentage of scale,
              which means the intermediate value is often useful in its own right.
            </li>
          </ul>
          <p>
            One habit worth adopting: <strong>write the per-unit value down</strong>. It is the
            common currency of the whole chain, and a chain that goes wrong is usually diagnosed by
            asking, at each handover, what the per-unit value should be and what it actually is.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Converting to counts</ContentEyebrow>

        <ConceptBlock
          title="What a converter’s resolution actually is"
          plainEnglish="A converter divides its input range into a fixed number of steps. More bits mean smaller steps — never no steps."
          onSite="The bit width tells you the step size. Whether that step size is fine enough depends entirely on the range it is spread across."
        >
          <p>
            Module 2 Section 5 introduced converter resolution as a property of a digital
            instrument. Here it is a link in a conversion chain, so it needs the arithmetic rather
            than just the idea.
          </p>
          <p>
            An analogue-to-digital converter turns a voltage into a whole number. The number is
            called a <strong>count</strong>, and how many counts are available is set by the
            converter&rsquo;s bit width.
          </p>
          <p>
            A 12-bit converter outputs a 12-bit binary integer, so it has 2<sup>12</sup> = 4096
            possible values, from 0 to 4095. Those 4096 values divide the analogue range into 4095
            increments &mdash; the counts are the fence posts and the increments are the gaps
            between them, which is where the minus one comes from:
          </p>
          <p>
            <strong>resolution = analogue span ÷ (2&#8319; &minus; 1)</strong>
          </p>
          <p>
            For a 12-bit converter with a 0&ndash;10 V input range, that is 10 &divide; 4095, or
            about <strong>2.442 mV</strong> per count.
          </p>
          <AppendixTable
            caption="Resolution against bit width, on a 0–10 V range"
            headers={['Bits', 'Count values', 'Resolution']}
            rows={[
              ['8', '256', '≈ 39.2 mV'],
              ['10', '1024', '≈ 9.78 mV'],
              ['12', '4096', '≈ 2.44 mV'],
              ['16', '65 536', '≈ 0.153 mV'],
            ]}
            notes="Each extra bit halves the step size. Note that resolution is a property of the range as well as the converter — the same 12-bit device on a 0–1 V range resolves ten times finer."
          />
          <p>
            That last note is Section 3&rsquo;s argument arriving from the other direction. Filling
            the input range and choosing enough bits are two ways of buying the same thing.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Quantisation error — a count is a range, not a point"
          plainEnglish="One voltage gives one count. But one count could have come from any voltage inside one step. That uncertainty never goes away."
          onSite="It sets a floor on what the system can possibly detect. No amount of calibration or averaging removes it."
        >
          <p>
            The relationship between voltage and counts runs cleanly in one direction. Feed a
            converter a particular voltage and you get a particular count.
          </p>
          <p>
            It does not run cleanly in the other. A reported count of 2502 on our 12-bit converter
            means the input was somewhere inside a band about 2.442 mV wide &mdash; and there is no
            way to know where in that band it was.
          </p>
          <p>
            This is <strong>quantisation error</strong>, and it is worth being clear that it is not
            a defect. A whole number cannot carry everything a continuously varying quantity was
            doing; the moment you commit to counting, you accept that whatever happened between two
            counts has gone. More bits make the gap narrower. Nothing closes it.
          </p>
          <p>
            The practical consequence is a floor on detectable change. If a system must resolve 0.1
            &deg;C on a 0&ndash;600 &deg;C range, that is 1 part in 6000, and a 12-bit converter
            covering the whole range cannot do it &mdash; roughly 0.147 &deg;C per count. The
            answers are more bits, or a narrower range, or accepting the limit. What is not
            available is calibrating your way out of it.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="A full worked chain — counts back to engineering units"
          plainEnglish="Work an example where the converter deliberately covers more than the stated range, because that is where people get the wrong answer."
          onSite="Read the manual for the converter’s real endpoints. Assuming 0 counts means 0 per cent is how this one goes wrong."
        >
          <p>
            Some controllers deliberately over-range their converters so the input can report a
            little outside the configured range &mdash; useful, because it lets an over-range or
            under-range condition be seen rather than simply pinned at the limit. It is Section
            1&rsquo;s NAMUR argument in digital form.
          </p>
          <p>
            Suppose a controller&rsquo;s 12-bit input covers &minus;3.3 to 103.3 per cent of the
            configured range, and it is being used to display a furnace temperature configured 480
            to 1010 &deg;C. What temperature does a count of 2649 represent?
          </p>
          <ul>
            <li>
              <strong>Find the converter&rsquo;s real endpoints.</strong> The configured span is
              1010 &minus; 480 = 530 &deg;C. 3.3 per cent of that is 17.49 &deg;C. So the full count
              range of 0 to 4095 actually covers <strong>462.51 &deg;C to 1027.49 &deg;C</strong>.
            </li>
            <li>
              <strong>Convert the count to per unit.</strong> 2649 &divide; 4095 ={' '}
              <strong>0.6469 per unit</strong>.
            </li>
            <li>
              <strong>Convert per unit to temperature.</strong> (0.6469 × (1027.49 &minus; 462.51))
              + 462.51 = <strong>828.0 &deg;C</strong>.
            </li>
          </ul>
          <p>
            Now see what happens if the over-range is ignored and the count range is assumed to map
            straight onto 480&ndash;1010 &deg;C. The per-unit value is the same 0.6469, but it is
            applied to the wrong span: (0.6469 × 530) + 480 = 822.9 &deg;C. Five degrees out, from
            one assumption, with no fault anywhere in the system.
          </p>
          <p>
            The general lesson is worth more than the arithmetic:{' '}
            <strong>find the real endpoints of every range before converting through it.</strong>{' '}
            Section 2 made this point about instruments; it applies equally to the digital ranges
            inside them.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-4-counts"
          question="A 12-bit input (0–4095 counts) is scaled 0–250 bar with no over-range. The count is 1638. What is the pressure?"
          options={['164 bar', '40 bar', '125 bar', '100 bar']}
          correctIndex={3}
          explanation="Per unit = 1638 ÷ 4095 = 0.4. Pressure = 0.4 × 250 = 100 bar. Same two steps as every other conversion in this course — the count range is just another range."
        />

        <ConceptBlock
          title="Running it backwards — the field diagnostic"
          plainEnglish="Take the number on the screen, work out what current the loop should be carrying, then go and measure it. Agreement or disagreement tells you which half of the system to suspect."
          onSite="This is the single most useful thing per unit does for a technician, and it takes about thirty seconds."
        >
          <p>
            Everything so far has run forwards, from process to display. The conversion runs just as
            well in reverse, and that is how it earns its keep on a fault.
          </p>
          <p>
            Suppose a control room screen shows 180 &deg;C on a transmitter ranged 0 to 400 &deg;C.
            Work out what the loop ought to be carrying:
          </p>
          <ul>
            <li>
              Per unit = 180 &divide; 400 = <strong>0.45</strong>
            </li>
            <li>
              Current = (0.45 × 16) + 4 = <strong>11.2 mA</strong>
            </li>
          </ul>
          <p>Now measure the loop, and the answer splits the system cleanly in two:</p>
          <ul>
            <li>
              <strong>The loop reads 11.2 mA.</strong> Everything from the transmitter terminals to
              the screen is behaving. If the number is still wrong, the fault is upstream &mdash;
              the sensing element, the installation, or the transmitter&rsquo;s ranging.
            </li>
            <li>
              <strong>The loop reads something else.</strong> The fault is downstream of the
              terminals: the conversion resistor, the input card&rsquo;s scaling, or the display
              configuration. The transmitter is not the problem.
            </li>
          </ul>
          <p>
            One measurement and one calculation have just halved the search. That is worth more than
            any individual conversion on this page, and it is why the method is worth being fluent
            in rather than looking up.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The time dimension</ContentEyebrow>

        <ConceptBlock
          title="The other half of the question — how often, not how finely"
          plainEnglish="Resolution asks how small a change you can see. Sampling rate asks how quickly you would notice it. They are different limits and both are error."
          onSite="Module 2 Section 5 covered sampling rate, dead time and aliasing in their own right. What matters here is that both are entries in the error tally, and that one of them has a cure you already know."
        >
          <p>
            A converter takes snapshots. Anything happening between them is never detected and never
            appears in the data, and the <strong>Nyquist sampling theorem</strong> sets the floor:
            at least twice the waveform&rsquo;s fundamental frequency to capture it at all, with ten
            samples per cycle the realistic working target.
          </p>
          <p>
            Module 2 Section 5 worked through the consequences &mdash; dead time between samples,
            and aliasing, where a signal sampled slightly slower than its own period produces a
            smooth, plausible, entirely fictitious slow wave. Both belong on this page for one
            reason: <strong>they are error, and they are error you can design out</strong>.
          </p>
          <p>
            The design-out is the part Module 3 adds, and it is a direct application of Section 3.
            The defence against aliasing is the <strong>anti-alias filter</strong>: a low-pass
            filter placed ahead of the converter, removing frequencies higher than the converter can
            faithfully sample before they ever reach it.
          </p>
          <p>
            That is why Section 3 treated filtering as conditioning rather than as a nicety. Here it
            is not smoothing a trend for comfort &mdash; it is preventing a specific, well-defined
            lie, and it is the only entry in this section&rsquo;s error tally that a component
            fitted in the right place removes outright.
          </p>
          <p>
            The ordering matters too, and it is easy to get backwards. The filter has to come{' '}
            <em>before</em> the converter. Filtering the data afterwards cannot help, because by
            then the fast content has already been folded into a slow signal and there is nothing
            left to distinguish the fiction from the truth.
          </p>
        </ConceptBlock>

        <Scenario
          title="A flow meter that passes its calibration and still over-reads badly"
          situation={
            <>
              <p>
                A new differential-pressure flow loop is commissioned. The technician applies zero
                differential pressure and the system reads 0 per cent; applies full differential
                pressure and it reads 100 per cent. Both points are correct, the paperwork is
                signed, and the loop goes into service.
              </p>
              <p>
                Within a week, production notice that the metered throughput does not agree with
                tank stock movements. At what should be half flow, the system is reporting about 71
                per cent.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                The shape of the error is the diagnosis. It is zero at both ends and largest in the
                middle, which rules out every proportional fault &mdash; a gain error would be
                visible at 100 per cent, an offset would be visible at 0.
              </p>
              <p>
                An error that vanishes at 0 and 1 and swells in between is the signature of a
                function applied one time too many, and on a DP flow loop there is only one
                candidate. Check whether the transmitter is configured for square-root extraction{' '}
                <em>and</em> whether the host input block is doing it as well.
              </p>
              <p>
                Follow the numbers through. At a true 50 per cent flow the differential pressure is
                25 per cent of its range. The transmitter roots that and outputs 50 per cent, which
                is correct. The host roots the 50 per cent again &mdash; &radic;0.5 = 0.707 &mdash;
                and displays <strong>70.7 per cent</strong>. That is the reading production are
                complaining about, and it is about 41 per cent above the truth.
              </p>
              <p>
                Turn the extraction off in one place, not both. Then re-verify at a mid-scale point,
                because that is the only place the fault was ever visible.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Nothing failed here and nobody was careless. A two-point calibration check is
                standard practice, and it passed &mdash; because the two points it tests are exactly
                the two the fault does not touch.
              </p>
              <p>
                The transferable lesson is about the shape of a check rather than this specific
                fault. A characterised loop needs an intermediate point, because characterisation
                errors live where nobody is looking.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>When the relationship is not a straight line</ContentEyebrow>

        <ConceptBlock
          title="Square-root characterisation, and why flow needs it"
          plainEnglish="An orifice plate does not produce twice the pressure for twice the flow. It produces four times. Something has to undo that."
          onSite="Differential-pressure flow is everywhere. Knowing where the square root is taken in a given loop is a basic commissioning question."
        >
          <p>
            Module 2 Section 3 introduced differential-pressure flow measurement: put a deliberate
            restriction in the pipe &mdash; typically an orifice plate &mdash; and measure the
            pressure drop across it. The faster the flow, the greater the drop.
          </p>
          <p>
            The relationship, though, is not proportional. Pressure rises with the square of flow:
          </p>
          <p>
            <strong>P = kQ&sup2;</strong>
          </p>
          <p>
            where <em>k</em> accounts for the units and the geometry of the plate and pipe.
          </p>
          <p>
            The consequence is easy to see and easy to underestimate. Suppose a gauge across the
            orifice is labelled in per cent of full flow on a linear scale, reading 20 per cent. The
            flow doubles. An operator expects 40 per cent. What they get is{' '}
            <strong>80 per cent</strong>, because a doubling of flow quadruples the pressure. The
            indication is not slightly off &mdash; it is useless as a flow reading.
          </p>
          <p>Three ways of dealing with this have been used, and all three are still met:</p>
          <ul>
            <li>
              <strong>A square-root scale on the indicator.</strong> The needle still quadruples its
              travel, but the non-linear scale printed behind it translates that into a doubling of
              indicated flow. The mechanism is unchanged; only the labelling is characterised.
            </li>
            <li>
              <strong>A shaped mechanism.</strong> A curved-tube manometer encodes the inverse
              function in the physical shape of the tube, so a linear scale alongside it reads
              correctly.
            </li>
            <li>
              <strong>Computation.</strong> A processor takes the square root of the pressure signal
              so the resulting signal is a direct, linear representation of flow. This is how it is
              done now, and it can happen in the transmitter or in the host system.
            </li>
          </ul>
          <p>That last sentence contains the trap, and it gets its own treatment below.</p>
        </ConceptBlock>

        <Pullquote>
          The square root has to be taken exactly once. Taken twice, the reading is wrong everywhere
          except at the two points a quick calibration check would look at.
        </Pullquote>

        <CommonMistake
          title="Extracting the square root twice"
          whatHappens={
            <>
              <p>
                Modern DP transmitters can be configured to extract the square root themselves. So
                can most host system input blocks. If both are set to do it, the root is taken twice
                and the flow reading is wrong at every point in between.
              </p>
              <p>
                Work an example. At a true flow of 25 per cent, the raw differential pressure is
                6.25 per cent of its range. The transmitter roots that and outputs 25 per cent
                &mdash; correct. The host roots it again and displays 50 per cent. The reading is
                double the truth.
              </p>
              <p>
                🔴 The reason this survives commissioning is arithmetic. &radic;0 = 0 and &radic;1 =
                1, so the endpoints are untouched. A two-point check at 0 and 100 per cent{' '}
                <strong>passes perfectly</strong> while the whole middle of the range is wrong. The
                error is largest around the middle and vanishes at exactly the places most people
                check.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Decide where the extraction happens, do it in one place, and record the decision.
                Then verify at a mid-scale point: apply a differential pressure corresponding to 50
                per cent flow and confirm the system reports 50 per cent flow, not 70.7 per cent.
              </p>
              <p>
                More generally, this is an argument for checking calibrations at intermediate points
                rather than only at the ends. Any error that is proportional shows up at the
                endpoints; characterisation errors and non-linearity specifically hide there. Module
                6 develops the point.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="Why DP flow goes vague at the bottom of the range"
          plainEnglish="Near zero flow, a tiny change in pressure means a big change in flow. So a tiny pressure error means a big flow error."
          onSite="This is why flow loops have a low-flow cutoff, and why a DP flowmeter is a poor choice if you genuinely need accuracy at the bottom of the range."
        >
          <p>
            The square-root relationship does something else that is easy to miss and important on
            site. It is not just a shape to be undone &mdash; it changes how much a measurement
            error matters, depending on where you are in the range.
          </p>
          <p>
            Because pressure varies with the square of flow, the curve of flow against pressure is
            steep near zero and shallow near full scale. Steep means that a small pressure error
            corresponds to a large flow error. So the same differential-pressure uncertainty
            produces a modest flow error at 90 per cent flow and a substantial one at 5 per cent.
          </p>
          <p>
            Consider what that means for the raw signal. At 10 per cent of flow, the differential
            pressure is 1 per cent of its range &mdash; and the transmitter is trying to resolve
            that against its own noise, drift and quantisation. Everything Section 3 said about
            small signals in a large range applies, and then the square root magnifies whatever is
            left.
          </p>
          <p>
            Two practical consequences follow. <strong>Low-flow cutoff</strong> is a configuration
            setting that forces the reported flow to zero below some threshold, so magnified noise
            is not published as real flow &mdash; which is right for a totaliser and worth knowing
            about, because it also means a genuine trickle reads as zero. And if a measurement
            genuinely needs to be accurate at the bottom of its range, differential pressure across
            an orifice is the wrong technique; Module 2 Section 3 covered the alternatives.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-4-sqrt"
          question="A DP transmitter is ranged 0–100 kPa for a flow of 0–500 l/s, with the square root extracted in the host. The transmitter outputs 12 mA. What is the flow?"
          options={['354 l/s', '125 l/s', '500 l/s', '250 l/s']}
          correctIndex={0}
          explanation="12 mA is 50 per cent, so the differential pressure is 50 kPa — half of range. Flow is proportional to the square root: √0.5 = 0.707, so flow is 0.707 × 500 ≈ 354 l/s. Reading 12 mA as half flow gives 250 l/s and is wrong by over a hundred litres a second, which is the whole reason characterisation exists."
        />

        <SectionRule />
        <ContentEyebrow>The error tally</ContentEyebrow>

        <ConceptBlock
          title="Everywhere error enters a chain"
          plainEnglish="Each conversion contributes something. Individually they are small; the question is what they add up to."
          onSite="When a measurement is out by more than it should be, walk the chain and account for each contribution before replacing anything."
        >
          <AppendixTable
            caption="Error sources along a measurement chain"
            headers={['Where', 'What it contributes', 'What to do about it']}
            rows={[
              [
                'Ranging mismatch',
                'Not an error — a wrong answer, with no symptom',
                'Record and verify the range at every handover (Section 2)',
              ],
              [
                'Component tolerance',
                'A 1 per cent conversion resistor puts up to 1 per cent into every reading',
                'Use precision parts; you cannot calibrate this out of the transmitter',
              ],
              [
                'Quantisation',
                'Half a count of uncertainty, inherent to digitising',
                'More bits, or a narrower range',
              ],
              [
                'Range utilisation',
                'A signal using a fraction of the input range loses most of the counts',
                'Amplify to fill the range (Section 3)',
              ],
              [
                'Sampling rate',
                'Dead time, and aliasing if too slow',
                'Sample faster; filter ahead of the converter',
              ],
              [
                'Characterisation',
                'Square root missing, doubled, or applied in the wrong place',
                'Do it once; verify at mid-scale, not just at the ends',
              ],
            ]}
            notes="Only the first and last of these are usually blamed on a person. The others are design decisions that were made before anyone touched the loop."
          />
          <p>
            Two things are worth saying about how these combine. They do not simply add &mdash; some
            are systematic and pull in a consistent direction, others are random and partly cancel
            &mdash; and Module 4 Section 3 handles that arithmetic properly.
          </p>
          <p>
            But the useful field habit is simpler.{' '}
            <strong>
              When a measurement is out by more than the sum of the things you can account for, stop
              adjusting and start looking for something you have not accounted for.
            </strong>{' '}
            A reading wrong by a factor of two is not six small errors stacking up; it is one
            structural mistake, and the usual suspects are on the list above.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Rounding, and why a chain is worse than any link in it"
          plainEnglish="Each conversion rounds a little. Do it four times in a row and the roundings do not politely cancel."
          onSite="Convert once from the original value where you can, rather than converting a converted value."
        >
          <p>
            One last contribution, easily overlooked because each instance of it is trivial. Every
            conversion produces a number with a finite number of digits, and every device that
            stores or displays that number rounds it.
          </p>
          <p>
            Along a chain &mdash; sensor to transmitter, transmitter to current, current to voltage,
            voltage to counts, counts to engineering units &mdash; that rounding happens repeatedly,
            and each stage rounds a value that was already rounded. Sometimes the errors partly
            cancel. Sometimes they do not.
          </p>
          <p>
            The habit that avoids the worst of it is simple:{' '}
            <strong>carry full precision through the intermediate steps</strong> and round only when
            you present a result. That applies to your own calculations as much as to the system
            &mdash; rounding the per-unit value to two decimals before scaling it is a good way to
            manufacture an error that was never in the measurement.
          </p>
          <p>
            Section 5 takes the chain further, into what happens to the signal physically while it
            travels between these conversions.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Should the square root be extracted in the transmitter or in the host?',
              answer:
                'Either works, and consistency across a site matters more than the choice. Extracting in the transmitter means the 4–20 mA signal is already linear with flow, so anything reading that loop — an indicator, a recorder, a spare input — reads flow directly. Extracting in the host means the loop carries raw differential pressure, which some prefer because it keeps the transmitter simple and puts the characterisation where it can be seen and changed. What matters is that it happens exactly once and that the documentation says where.',
            },
            {
              question: 'Is quantisation error the same as accuracy?',
              answer:
                'No. Quantisation error sets a floor on resolution — the smallest change the system can possibly distinguish. Accuracy is how close the reading is to the truth, and it is dominated by the sensor, the calibration and the installation, all of which are usually far larger contributors. A 16-bit converter on a badly installed sensor gives you a very precise wrong number.',
            },
            {
              question: 'How fast should a process measurement be sampled?',
              answer:
                'Fast enough that the loop is not limited by it, which for most industrial processes is far slower than instinct suggests. A large furnace may be adequately sampled once a minute. Even fast feedback processes such as liquid flow and pressure can be controlled with reasonable stability at a few samples per second. The question to ask is how fast the process itself can change, and then to sample comfortably faster than that — while making sure nothing much faster can reach the converter unfiltered.',
            },
            {
              question: 'Why do some converters over-range deliberately?',
              answer:
                'So that an out-of-range condition can be seen instead of being pinned at the limit. If the converter stops at exactly 100 per cent, a process at 102 per cent and a process at 130 per cent look identical. Letting the digital range spill a few per cent past the configured range means the system can distinguish "slightly over" from "far over", and can tell both apart from "at maximum". It is the same reasoning behind NAMUR levels in Section 1.',
            },
            {
              question: 'If I know the per-unit value, do I still need the engineering units?',
              answer:
                'For diagnosis, per unit is often more useful — it is the same number at every point in the chain, so a handover where it changes is the handover at fault. For everything else, engineering units are what people act on, and a control room does not run on fractions. Use per unit as the working currency and convert at the ends.',
            },
            {
              question: 'Does averaging improve resolution?',
              answer:
                'It can, under specific conditions: if there is enough genuine noise to make the signal cross between adjacent counts, averaging many samples recovers information below one count. On a perfectly quiet signal sitting mid-count it recovers nothing, because every sample returns the same number. It also costs response time, which is Section 3’s damping trade-off in another form. Treat it as a technique with conditions, not a free upgrade.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Per unit converts any linear range to any other in two steps, and it handles negatives, reverse action, percentages and count values without modification.',
            'Write the per-unit value down. It is the common currency of the chain and it localises faults to a single handover.',
            'Converter resolution = analogue span ÷ (2ⁿ − 1). Each extra bit halves the step, and the range matters as much as the bit width.',
            'Quantisation error is inherent: one count represents a whole band of possible inputs. More bits shrink the band; nothing removes it.',
            'Find the real endpoints of every range before converting through it — some converters deliberately over-range beyond the configured span.',
            'Nyquist gives twice the frequency as the theoretical minimum sample rate. Ten times per cycle is the practical target.',
            'Sampling too slowly costs dead time in the control loop and, worse, aliasing.',
            '🔴 Aliasing produces plausible data, not obviously broken data — a smooth slow cycle that was never there. An anti-alias filter ahead of the converter is the defence.',
            'Differential-pressure flow is non-linear: P = kQ². Double the flow, quadruple the pressure.',
            '🔴 Extract the square root exactly once. Twice reads high everywhere except 0 and 100 per cent — precisely the two points a quick check tests.',
            'Verify characterised loops at mid-scale. Proportional errors show at the endpoints; characterisation errors hide there.',
            'DP flow is least trustworthy at the bottom of its range because the square root magnifies error there. That is what low-flow cutoff is for — and it means a genuine trickle reads as zero.',
            'When a reading is out by more than the errors you can account for, look for a structural mistake rather than adjusting.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 3.4" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-3-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Signal conditioning
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-3-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Signal integrity
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule3Section4;
