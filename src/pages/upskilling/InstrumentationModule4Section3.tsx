/**
 * Module 4 · Section 3 — Instrument accuracy, resolution and error
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE FRAMING. "Accuracy" is used as a catch-all for three different things
 * that behave differently and are fixed differently. The page separates them
 * first (accuracy / precision / resolution), then gives the learner a model
 * that makes error DIAGNOSABLE rather than merely describable:
 *
 *   A linear instrument is y = mx + b, so its errors are the ways that equation
 *   can go wrong —
 *     ZERO shift      → b is wrong        → every point off by the same amount
 *     SPAN shift      → m is wrong        → error grows across the range
 *     LINEARITY       → it is not a line  → largest in the middle, ends fine
 *     HYSTERESIS      → up ≠ down         → invisible unless you test both ways
 *
 * 🔴 THE PAYOFF: the SHAPE of the error names the fault. That is the same move
 * Module 3 Section 4 made with the double square root (zero at both ends,
 * largest in the middle), and it generalises here into a diagnostic method.
 *
 * 🔴 Hysteresis cannot be adjusted out. It is mechanical — friction, a loose
 * coupling, a cracked flexure — so a technician who keeps "calibrating" it is
 * chasing something adjustment cannot reach.
 *
 * 🔴 Zero errors accompany almost everything else, which is why zero is checked
 * first. It is rare to find a span, linearity or hysteresis error with no zero
 * error alongside it.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §18.3.1 (the four error types against y = mx + b, hysteresis causes, and the
 * observation that zero errors accompany the rest) and §18.3.3 (up-tests and
 * down-tests, error expressed as per cent of span). The worked calibration
 * table here is our own, in bar and mA, with every figure computed and checked
 * — it is not the source's table converted.
 * Extracted to scratchpad/src/m4_calerrors.txt. Held in ~/Desktop/hav/
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

const TITLE = 'Instrument accuracy, resolution and error | Instrumentation Module 4.3 | Elec-Mate';
const DESCRIPTION =
  'Separating accuracy, precision and resolution, then using y = mx + b to make error diagnosable — zero shift, span shift, linearity and hysteresis, what each looks like across the range, and why one of them cannot be adjusted out.';

const outcomes = [
  'Distinguish accuracy, precision and resolution, and give an example of each failing alone',
  'Describe a linear instrument using the slope-intercept equation',
  'Recognise a zero shift from the shape of the error across the range',
  'Recognise a span shift and say why it is unequal at different points',
  'Recognise a linearity error and say why zero and span adjustments cannot correct it',
  '🔴 Explain what hysteresis is, what causes it, and why adjustment will not fix it',
  'Explain why a hysteresis error is invisible unless the instrument is tested both ways',
  'Calculate an error as a percentage of span, and distinguish that from per cent of reading',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'An instrument gives the same reading every time it is presented with the same input, but that reading is 3 bar away from the truth. What does it have?',
    options: [
      'Good precision and poor accuracy',
      'Good accuracy and poor precision',
      'Poor precision and poor accuracy',
      'Poor resolution',
    ],
    correctIndex: 0,
    explanation:
      'Precision is repeatability — it repeats perfectly. Accuracy is closeness to the truth — it is 3 bar out. The two are independent, and this combination is the useful one to recognise, because a repeatable error can often be corrected while an unrepeatable one cannot.',
  },
  {
    id: 2,
    question:
      'A pressure transmitter reads 0.4 mA high at 0 per cent, 0.4 mA high at 50 per cent and 0.4 mA high at 100 per cent. What kind of error is this?',
    options: ['A span shift', 'A zero shift', 'A linearity error', 'Hysteresis'],
    correctIndex: 1,
    explanation:
      'The error is the same at every point, which is a shift in b — the intercept — in y = mx + b. The response has moved vertically without changing slope. A span shift would grow across the range and a linearity error would be worst in the middle.',
  },
  {
    id: 3,
    question:
      'A transmitter is correct at 0 per cent, 0.2 mA high at 50 per cent and 0.4 mA high at 100 per cent. What kind of error is this?',
    options: ['A zero shift', 'Hysteresis', 'A span shift', 'A linearity error'],
    correctIndex: 2,
    explanation:
      'Correct at the bottom and increasingly wrong towards the top is a change in m — the slope. The instrument is over-responding to input. Note that in practice you would rarely see this quite so cleanly, because zero errors almost always accompany other errors.',
  },
  {
    id: 4,
    question:
      'A transmitter is correct at 0 and 100 per cent but reads noticeably high at 50 per cent. What kind of error is this?',
    options: [
      'A zero shift',
      'A span shift',
      'A resolution limitation',
      'A linearity error — the response is no longer a straight line',
    ],
    correctIndex: 3,
    explanation:
      'Correct at both ends and wrong in between cannot be described by y = mx + b at all, because that equation only describes straight lines. Adjusting zero or span moves the line but cannot bend it, so neither adjustment will fix this.',
  },
  {
    id: 5,
    question:
      '🔴 An instrument reads 12.06 mA at 50 per cent on the way up and 12.14 mA at 50 per cent on the way down. What is it exhibiting, and can calibration adjustment fix it?',
    options: [
      'Hysteresis, which is mechanical and cannot be adjusted out',
      'A zero shift, correctable by adjusting zero',
      'A span shift, correctable by adjusting span',
      'A linearity error, correctable by re-characterisation',
    ],
    correctIndex: 0,
    explanation:
      'Responding differently to a rising and a falling input is hysteresis. It is almost always caused by mechanical friction or a loose coupling — bourdon tubes, bellows, pivots, gear sets, or a cracked flexure. No adjustment reaches the cause; the defective component has to be repaired or replaced.',
  },
  {
    id: 6,
    question: 'Why can a hysteresis error go completely undetected in a routine calibration?',
    options: [
      'It only appears at temperature extremes',
      'It only shows if the instrument is checked at the same points going down as well as going up',
      'It is too small to measure with normal equipment',
      'It only affects digital instruments',
    ],
    correctIndex: 1,
    explanation:
      'A check that walks the input from 0 to 100 per cent sees only the rising response. The error is in the difference between rising and falling, so an up-test alone cannot reveal it. Detecting hysteresis requires an up-down test.',
  },
  {
    id: 7,
    question:
      'On a 4–20 mA output, a transmitter reads 8.05 mA where it should read 8.00 mA. What is the error as a percentage of span?',
    options: ['1.25 per cent', '0.625 per cent', '0.313 per cent', '0.05 per cent'],
    correctIndex: 2,
    explanation:
      'The span is 16 mA, and the deviation is 0.05 mA. 0.05 ÷ 16 = 0.313 per cent of span. Expressing error against the span rather than against the reading is the convention here, and it matters: the same 0.05 mA against a reading of 8 mA would be 0.625 per cent, which is a different number describing the same deviation.',
  },
  {
    id: 8,
    question: 'Why do technicians check zero first when investigating a calibration problem?',
    options: [
      'Because zero errors are the most serious',
      'Because the zero adjustment must always be made before the span adjustment',
      'Because zero is the easiest point to apply',
      'Because with rare exceptions a zero error accompanies every other kind of error',
    ],
    correctIndex: 3,
    explanation:
      'Almost any instrument carrying a span, linearity or hysteresis fault will be sitting off its zero as well, so zero is the highest-yield single point to check first. What it is not is conclusive — a zero error found does not mean a zero error is all there is.',
  },
];

const InstrumentationModule4Section3 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 3"
        title="Accuracy, resolution and error"
        backTo="/electrician/upskilling/instrumentation-module-4"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Three words used as if they meant one thing — and a model that turns a wrong reading into
          a named fault.
        </p>

        <TLDR
          points={[
            'Accuracy, precision and resolution are three different properties. An instrument can have any one without the others.',
            'A linear instrument is described by y = mx + b, so its errors are the ways that equation can be wrong.',
            'Zero shift — b is wrong. Every point is off by the same amount.',
            'Span shift — m is wrong. The error grows across the range: small at the bottom, largest at the top.',
            '🔴 Hysteresis — the instrument responds differently going up and going down. Invisible unless you test both ways.',
            '🔴 Hysteresis is mechanical — friction, a loose coupling, a cracked flexure — so no calibration adjustment will fix it.',
            '🔴 The SHAPE of the error names the fault. Same amount everywhere, growing, worst in the middle, or different up versus down.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>Three words, three meanings</ContentEyebrow>

        <ConceptBlock
          title="Accuracy, precision and resolution are not the same thing"
          plainEnglish="Close to the truth, repeatable, and finely divided. Different properties, different causes, different cures."
          onSite="A data sheet quoting one of these tells you nothing about the other two. Read which word it actually uses."
        >
          <p>
            In ordinary speech these three are interchangeable. In measurement they are not, and
            keeping them apart is the difference between diagnosing a problem and describing it.
          </p>
          <ul>
            <li>
              <strong>Accuracy</strong> &mdash; closeness to the true value.
            </li>
            <li>
              <strong>Precision</strong> &mdash; repeatability, regardless of whether the repeated
              answer happens to be right.
            </li>
            <li>
              <strong>Resolution</strong> &mdash; the smallest change the instrument can represent.
              Module 3 Section 4 covered where this comes from in a digital system.
            </li>
          </ul>
          <p>
            The combinations are what make the distinction useful, because each one behaves
            differently:
          </p>
          <AppendixTable
            caption="How the three fail independently"
            headers={['Situation', 'What you see', 'What it means']}
            rows={[
              [
                'Precise but inaccurate',
                'The same wrong answer every time',
                'A systematic error — often correctable, because it is consistent',
              ],
              [
                'Accurate but imprecise',
                'Scattered readings averaging about right',
                'Noise or instability — averaging helps, single readings cannot be trusted',
              ],
              [
                'Accurate and precise but coarse',
                'A right, repeatable answer in big steps',
                'A resolution limit — more bits or a narrower range',
              ],
              [
                'Fine resolution, poor accuracy',
                'A very specific wrong number',
                'The most misleading of all — precision of display implies quality it does not have',
              ],
            ]}
            notes="The last row is worth dwelling on. A display showing four decimal places invites trust it has not earned."
          />
          <p>
            Module 4 Section 1 made the same point from a different direction: a meter accurate to
            0.05 per cent, reading three per cent of the truth through a loading error, is still
            reporting a number that is 97 per cent wrong.{' '}
            <strong>The specification describes the instrument, not the measurement.</strong>
          </p>
        </ConceptBlock>

        <Pullquote>
          A precise instrument tells you the same thing every time. Whether that thing is true is a
          separate question, and a separate specification.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>A model that makes error diagnosable</ContentEyebrow>

        <ConceptBlock
          title="Every linear instrument is y = mx + b"
          plainEnglish="Input in, output out, along a straight line. The line has a slope and a starting height, and those are the only two things an adjustment can change."
          onSite="This is why instruments have exactly two adjustments — zero and span — and why some faults cannot be reached by either."
        >
          <p>
            The response of any linear instrument is the slope-intercept equation you already know:
          </p>
          <p>
            <strong>y = mx + b</strong>
          </p>
          <p>
            where <em>y</em> is the output, <em>x</em> is the input, <em>m</em> is the{' '}
            <strong>span adjustment</strong> and <em>b</em> is the <strong>zero adjustment</strong>.
          </p>
          <p>
            Take a pressure transmitter ranged 0 to 10 bar with a 4&ndash;20 mA output. At 0 bar it
            should give 4 mA, which is <em>b</em>. Each bar should add 1.6 mA, which is <em>m</em>.
            That is the whole of its intended behaviour.
          </p>
          <p>
            Now the useful move.{' '}
            <strong>
              If the instrument is described by that equation, then its errors are the ways the
              equation can be wrong
            </strong>
            &mdash; and there are exactly four, three of which come straight out of the algebra and
            one of which the algebra cannot express at all.
          </p>
          <p>
            Each has a distinctive signature across the range, which means the shape of the error
            tells you which one you have before you open anything.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Zero shift — b is wrong"
          plainEnglish="The whole response has moved up or down. Everything is out by the same amount."
          onSite="The commonest error, and the easiest to correct — a zero adjustment moves the line back."
        >
          <p>
            A zero shift moves the response vertically without changing its slope. It affects{' '}
            <strong>every calibration point equally</strong>: if the instrument is 0.4 mA high at 0
            per cent, it is 0.4 mA high at 50 per cent and at 100 per cent too.
          </p>
          <p>
            That uniformity is the signature. Walk the range and the deviation never changes, which
            is the fingerprint of an intercept error rather than a slope error.
          </p>
          <p>
            Because only <em>b</em> is wrong, the zero adjustment reaches it directly, which is why
            this is the most straightforward of the four to put right.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Span shift — m is wrong"
          plainEnglish="The slope is off. Right at the bottom, increasingly wrong towards the top."
          onSite="A span error hides at zero. If you only ever check an instrument at the bottom of its range you will never see one."
        >
          <p>
            A span shift alters the slope of the response. Its effect is{' '}
            <strong>unequal at different points through the range</strong> &mdash; and that
            inequality is exactly how you recognise it.
          </p>
          <p>
            An instrument reading correctly at 0 per cent, 0.2 mA high at 50 per cent and 0.4 mA
            high at 100 per cent has a span error. The deviation grows in proportion to the input,
            because the instrument is responding too strongly to each unit of it.
          </p>
          <p>
            Notice the practical consequence:{' '}
            <strong>a pure span error is invisible at the bottom of the range</strong>. Anyone
            checking only the zero point would find nothing wrong and sign the instrument off. That
            is one of several reasons a calibration check uses several points across the range
            rather than one convenient one.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Linearity error — it is not a straight line"
          plainEnglish="The response bends. It can be perfect at both ends and wrong in the middle, and neither adjustment will help."
          onSite="If zero and span are both correct and mid-range is not, stop adjusting. You are looking at something adjustment cannot reach."
        >
          <p>
            A linearity error means the response is no longer a straight line at all. This one{' '}
            <strong>does not relate to zero or span</strong>, and the reason is simple: y = mx + b
            only describes straight lines, so a curve cannot be expressed by any values of{' '}
            <em>m</em> and <em>b</em>.
          </p>
          <p>
            The classic signature is an instrument that is correct at 0 and 100 per cent and
            noticeably wrong at 50 per cent. The two adjustments available can move the line and
            tilt it, but neither can bend it, so no amount of adjustment will bring the middle into
            line without throwing the ends out.
          </p>
          <p>
            Module 3 Section 4 met exactly this shape from a different cause &mdash; the square root
            extracted twice, which is right at 0 and 100 per cent and wrong everywhere between.{' '}
            <strong>
              An error that vanishes at both ends and swells in the middle is a characterisation or
              linearity problem
            </strong>
            , and it is the shape most likely to survive a two-point check.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The one adjustment cannot fix</ContentEyebrow>

        <ConceptBlock
          title="🔴 Hysteresis — the instrument remembers which way it came"
          plainEnglish="It gives one answer approaching a value from below and a different answer approaching it from above."
          onSite="Almost always mechanical. If you are adjusting an instrument repeatedly and it will not settle, check for this before touching anything else."
        >
          <p>
            A hysteresis error occurs when an instrument{' '}
            <strong>responds differently to an increasing input than to a decreasing one</strong>.
            Present it with 5 bar on the way up and on the way down, and it gives two different
            answers.
          </p>
          <p>
            The cause is nearly always mechanical: friction in a moving element, or a loose coupling
            between elements. Bourdon tubes, bellows, diaphragms, pivots, levers and gear sets are
            all candidates. Flexures &mdash; flexible metal strips designed to act as frictionless
            pivots &mdash; can also cause it if cracked or bent.
          </p>
          <p>
            Friction always opposes the direction of relative motion, and that gives hysteresis a
            predictable direction:{' '}
            <strong>
              the instrument registers falsely low on a rising input and falsely high on a falling
              one
            </strong>
            . The output lags behind the change, whichever way the change is going.
          </p>
          <p>
            🔴 And here is the part that matters most.{' '}
            <strong>Hysteresis errors cannot be remedied by making calibration adjustments.</strong>{' '}
            Zero and span move the line; they do nothing about friction in a linkage. The defective
            component must be repaired or replaced, or the coupling problem corrected. A technician
            who responds to hysteresis by adjusting is chasing something the adjustment cannot
            reach, and will be back next month.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Why an up-test alone will never find it"
          plainEnglish="If you only ever walk the input upwards, you only ever see half the behaviour."
          onSite="An up-down test costs a few extra minutes and is the only way this error is visible at all."
        >
          <p>
            Hysteresis lives in the <em>difference</em> between the rising and falling responses. A
            calibration that walks the input from 0 to 100 per cent and records five points has
            measured the rising response only, and every one of those points may look perfectly
            acceptable.
          </p>
          <p>
            The detection method follows directly:{' '}
            <strong>check the instrument at the same points going down as going up</strong>. Here is
            a transmitter ranged 0&ndash;10 bar with a 4&ndash;20 mA output, tested both ways, with
            error expressed as a percentage of the 16 mA span:
          </p>
          <AppendixTable
            caption="Up-down calibration test — 0–10 bar, 4–20 mA output"
            headers={['Point', 'Input', 'Ideal', 'Measured ↑', 'Error ↑', 'Measured ↓', 'Error ↓']}
            rows={[
              ['0%', '0 bar', '4.00 mA', '4.01 mA', '+0.06%', '4.02 mA', '+0.13%'],
              ['25%', '2.5 bar', '8.00 mA', '8.05 mA', '+0.31%', '8.12 mA', '+0.75%'],
              ['50%', '5 bar', '12.00 mA', '12.06 mA', '+0.38%', '12.14 mA', '+0.88%'],
              ['75%', '7.5 bar', '16.00 mA', '16.04 mA', '+0.25%', '16.07 mA', '+0.44%'],
              ['100%', '10 bar', '20.00 mA', '20.00 mA', '0%', '20.00 mA', '0%'],
            ]}
            notes="Maximum hysteresis is the largest gap between the two directions at the same point — here 12.14 − 12.06 = 0.08 mA at 50%, or 0.5% of span. Note that the up-test alone shows a maximum error of 0.38%, which many specifications would pass."
          />
          <p>
            Read the table as a diagnosis rather than a record. The rising column on its own looks
            like a modest zero-and-span problem. Only the pair of columns reveals that the
            instrument gives two different answers at the same pressure &mdash; and that is the
            finding which changes what you do about it, because it means adjustment is not the
            answer.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-3-hysteresis"
          question="A transmitter shows a maximum error of 0.38 per cent of span on an up-test, comfortably inside its 0.5 per cent specification. Should it be signed off?"
          options={[
            'No — 0.38 per cent is too close to the limit',
            'Yes, provided the zero is adjusted first',
            'Yes — the measured error is within specification',
            'Not yet — an up-test cannot reveal hysteresis, and the down-test on this instrument shows up to 0.88 per cent',
          ]}
          correctIndex={3}
          explanation="The up-test is not wrong, it is incomplete. Every point it measured was genuinely inside specification; the error it could not see took the instrument to 0.88 per cent on the way down. This is exactly why up-down testing exists, and why a passing single-direction result is weaker evidence than it looks."
        />

        <SectionRule />
        <ContentEyebrow>Reading the shape</ContentEyebrow>

        <ConceptBlock
          title="The signature table"
          plainEnglish="Walk the range, note where the error is biggest, and the pattern names the fault."
          onSite="Worth carrying in your head. It turns a set of readings into a decision about what to do next."
        >
          <AppendixTable
            caption="What each error looks like across the range"
            headers={['Error', 'At 0%', 'At 50%', 'At 100%', 'Fixed by']}
            rows={[
              ['Zero shift', 'Off', 'Off by the same', 'Off by the same', 'Zero adjustment'],
              ['Span shift', 'Correct', 'Off a little', 'Off the most', 'Span adjustment'],
              [
                'Linearity',
                'Correct',
                'Off the most',
                'Correct',
                'Not zero or span — re-characterisation or repair',
              ],
              [
                'Hysteresis',
                'Differs up vs down',
                'Differs up vs down',
                'Differs up vs down',
                '🔴 Nothing adjustable — mechanical repair',
              ],
            ]}
            notes="Read the middle three columns as a pattern rather than as values. Constant, growing, worst-in-the-middle, or direction-dependent — those four shapes are the diagnosis."
          />
          <p>
            One important caveat before this becomes a lookup table.{' '}
            <strong>
              In practice most calibration errors are a combination of zero, span, linearity and
              hysteresis
            </strong>
            , not one clean type. Real data is messier than the four idealised shapes above.
          </p>
          <p>
            But one regularity survives the mess and is genuinely useful:{' '}
            <strong>
              a fault of any of the other three kinds is nearly always sitting on top of a zero
              error as well
            </strong>
            . An instrument with a span, linearity or hysteresis problem and a perfect zero is a
            rare find. That is why zero gets checked first: for a single measurement, it is the
            point most likely to tell you something.
          </p>
          <p>
            The corollary is the part people get wrong: finding a zero error does <em>not</em> mean
            zero is the only problem. Correcting it and stopping is how a span or hysteresis error
            gets left in an instrument that has just been signed off.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Putting a number on it</ContentEyebrow>

        <ConceptBlock
          title="Per cent of span, and per cent of reading"
          plainEnglish="The same deviation gives two different percentages depending on what you divide by. Know which one the specification means."
          onSite="Instrument errors are conventionally quoted against span. Comparing a span figure with a reading figure is comparing two different things."
        >
          <p>
            Error is normally expressed as a percentage of <strong>span</strong> &mdash; the full
            measuring range &mdash; rather than of the particular reading.
          </p>
          <p>
            Work one from the table above. At 25 per cent the transmitter reads 8.05 mA where it
            should read 8.00 mA, on a 4&ndash;20 mA output:
          </p>
          <ul>
            <li>
              Deviation: 8.05 &minus; 8.00 = <strong>0.05 mA</strong>
            </li>
            <li>
              Span: 20 &minus; 4 = <strong>16 mA</strong>
            </li>
            <li>
              Error: 0.05 &divide; 16 = <strong>0.31 per cent of span</strong>
            </li>
          </ul>
          <p>
            Had the same deviation been expressed against the reading, it would be 0.05 &divide; 8 ={' '}
            <strong>0.63 per cent of reading</strong> &mdash; double the number, describing exactly
            the same 0.05 mA.
          </p>
          <p>
            Neither is wrong; they answer different questions. The difference matters most at the
            bottom of a range, where a fixed deviation is a small fraction of span and a large
            fraction of the reading &mdash; which is the same asymmetry Module 3 Section 4 described
            for differential-pressure flow, arriving here as a matter of bookkeeping rather than
            physics.
          </p>
          <p>
            The practical instruction is short:{' '}
            <strong>
              read which convention a specification uses before comparing anything to it
            </strong>
            , and use the same convention consistently in your own records so the next person can
            compare like with like.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-3-span"
          question="A 0–200 °C transmitter with a 4–20 mA output reads 11.84 mA where it should read 12.00 mA. What is the error as a percentage of span?"
          options={['−1.0 per cent', '−0.8 per cent', '−1.33 per cent', '−0.16 per cent']}
          correctIndex={0}
          explanation="Deviation is 11.84 − 12.00 = −0.16 mA, and the span is 16 mA. −0.16 ÷ 16 = −1.0 per cent of span. Note the sign: negative because the instrument reads below what it should, which is worth recording as well as the magnitude."
        />

        <CommonMistake
          title="Adjusting an instrument until the reading is right at the point you happen to be checking"
          whatHappens={
            <>
              <p>
                An instrument reads wrong at a convenient test point, so the zero is adjusted until
                it reads correctly there. The instrument now passes at that point and is worse
                somewhere else.
              </p>
              <p>
                If the underlying fault was a span error, moving zero to correct mid-range throws
                out both ends. If it was a linearity error, no combination of zero and span is right
                everywhere, so whichever point you adjusted at becomes the only one that is correct.
                If it was hysteresis, the adjustment does nothing about the cause and the instrument
                will be back.
              </p>
              <p>
                The instrument leaves with a signed record saying it was checked, which is worse
                than leaving it alone — a wrong instrument that is known to be wrong gets treated
                with suspicion, and one with a recent certificate does not.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Gather the data before touching an adjustment. Check several points across the range
                &mdash; and both directions &mdash; and write the readings down before deciding
                anything. The pattern in that data is what tells you which of the four errors you
                have.
              </p>
              <p>
                Then act on the diagnosis rather than the symptom: zero adjustment for a zero shift,
                span for a span shift, and for linearity or hysteresis, recognise that adjustment is
                not the tool and escalate to repair or replacement.
              </p>
              <p>
                Record what you found as well as what you left. Module 6 covers as-found and as-left
                documentation properly, and the reason it exists is precisely this: the next
                technician needs to know whether an instrument has been drifting for years or went
                wrong last week.
              </p>
            </>
          }
        />

        <Scenario
          title="A level transmitter that has been recalibrated four times this year"
          situation={
            <>
              <p>
                A level transmitter on a mechanical float mechanism is recalibrated every time it is
                reported as reading wrong. Each visit finds an error, each visit adjusts it, and
                each visit produces a passing certificate. Within a few weeks it is reported again.
              </p>
              <p>
                The maintenance record shows four calibrations in nine months, all adjusting zero,
                all passing on completion.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                A pattern of repeated adjustment on the same instrument is itself the diagnosis. If
                calibration were the answer, it would have worked the first time. Something is
                producing an error that adjustment relieves temporarily and does not address.
              </p>
              <p>
                Do an up-down test rather than another up-test. The instrument is a mechanical float
                mechanism, which is precisely the construction that produces hysteresis &mdash;
                pivots, linkages and a lever arm are all friction candidates, and a cracked or bent
                flexure would do it too.
              </p>
              <p>
                Expect the signature: falsely low as the level rises, falsely high as it falls, with
                the gap between the two directions larger than either individual error. If the
                mechanism is sticking, adjusting zero at whatever point it happened to be sitting
                will appear to fix it and will not.
              </p>
              <p>
                If the up-down test confirms hysteresis, the job is mechanical &mdash; inspect the
                linkage for wear, looseness and damage. No further calibration will help, and each
                one that is done makes the record less useful by hiding a growing mechanical fault
                behind a series of passes.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Four certificates say this instrument was checked and found acceptable. What the
                record actually shows, read properly, is a mechanism failing progressively while
                being adjusted around.
              </p>
              <p>
                It is also a reminder that the maintenance history is data. A single calibration
                tells you about one day; four in nine months tells you something the individual
                readings cannot.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="Where these errors come from in the first place"
          plainEnglish="Instruments do not arrive wrong. They drift, they get knocked, and their conditions change."
          onSite="Knowing the likely cause narrows the check. A newly installed instrument and one that has been in service ten years fail differently."
        >
          <p>
            The four shapes tell you <em>what</em> the error is. It is worth having a short list of{' '}
            <em>why</em>, because it changes what you look at first.
          </p>
          <ul>
            <li>
              <strong>Drift.</strong> Components age and their characteristics move slowly. This is
              the ordinary reason calibration intervals exist, and it typically shows as a zero
              shift growing gradually across successive calibrations.
            </li>
            <li>
              <strong>Ambient conditions.</strong> A specification is quoted under reference
              conditions. An instrument in a hot plant room or an unheated outdoor cabinet is
              operating outside them, and the data sheet&rsquo;s temperature effect figures apply.
            </li>
            <li>
              <strong>Installation.</strong> Mounting position, process connection and impulse lines
              all influence a reading. Module 2 covered several examples, and an error that appeared
              the day something was reinstalled is not a drift problem.
            </li>
            <li>
              <strong>Mechanical wear or damage.</strong> The hysteresis cause &mdash; friction,
              looseness, a bent flexure. Usually gets worse over time rather than appearing
              suddenly.
            </li>
            <li>
              <strong>Configuration.</strong> Wrong range, wrong K-factor, characterisation applied
              twice. Not an instrument error at all, and Module 3 showed how convincingly these
              masquerade as one.
            </li>
          </ul>
          <p>
            The last entry deserves its place on a page about instrument error precisely because it
            is not one.{' '}
            <strong>
              Before concluding that an instrument is inaccurate, confirm that it was asked the
              right question.
            </strong>
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'If most errors are combinations, is the four-type model still useful?',
              answer:
                'Yes, because it turns a vague observation into a set of specific questions. You are not trying to force a real instrument into one category — you are asking how much of what you see is constant across the range, how much grows with input, how much is worst in the middle, and how much depends on direction. Those four questions decompose almost any real error into parts you can act on, and they distinguish the parts adjustment can reach from the parts it cannot.',
            },
            {
              question: 'Can a digital instrument have hysteresis?',
              answer:
                'The electronics will not, but the sensing element can, and that is where it usually comes from. A smart pressure transmitter with a mechanical diaphragm and linkage can absolutely exhibit hysteresis from that mechanism, and the digital processing behind it will faithfully report the result. What digital instruments do change is the remedy for linearity: a processor can characterise a curved response in software, which no mechanical zero-and-span adjustment could do.',
            },
            {
              question: 'How many points should a calibration check use?',
              answer:
                'Enough to reveal the shape, which means more than two. Five points at 0, 25, 50, 75 and 100 per cent is the common pattern, and Module 3 Section 4 gave the reason mid-range points matter: a two-point check at the ends passes cleanly on exactly the errors that live in the middle. Add the downward direction and the same five points reveal hysteresis as well.',
            },
            {
              question: 'Is resolution ever the actual problem?',
              answer:
                'Sometimes, and it is recognisable because the reading changes in visible steps rather than smoothly. Module 3 Section 4 covered the arithmetic — a fixed count size spread across the range — and the cures, which are more bits or a narrower range. What resolution cannot be is corrected by calibration, so if a reading steps rather than drifts, adjustment is not the answer.',
            },
            {
              question: 'What does an accuracy specification actually cover?',
              answer:
                'It describes the instrument under the reference conditions the manufacturer used — typically a stated temperature, supply voltage and mounting position. Real installations depart from those, which is why data sheets also quote effects for temperature and other influences. It is worth knowing that a headline accuracy figure is the best case, and that the installed performance is that figure plus whatever the conditions add.',
            },
            {
              question: 'Why express error against span rather than against the reading?',
              answer:
                'Because it gives one number that describes the instrument across its whole range, rather than a number that changes depending on where you happen to be measuring. It is a fair convention for specifying hardware. It is less useful when you care about a particular reading — at 10 per cent of range, an error of 0.5 per cent of span is 5 per cent of what you are actually reading, and that is the number that matters to the process.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Accuracy is closeness to truth, precision is repeatability, resolution is the smallest representable change. An instrument can have any one without the others.',
            'Precise but inaccurate is a systematic error and often correctable. Accurate but imprecise is noise, and single readings cannot be trusted.',
            'Fine resolution with poor accuracy is the most misleading combination — a very specific wrong number invites trust it has not earned.',
            'A linear instrument is y = mx + b, where m is the span adjustment and b the zero adjustment. Those two are the only things an adjustment can change.',
            'Zero shift: b is wrong, so every point is off by the same amount.',
            'Span shift: m is wrong, so the error grows across the range — and is invisible at the bottom.',
            'Linearity error: not a straight line at all, so no values of m and b describe it. Correct at both ends, worst in the middle.',
            '🔴 Hysteresis: different response going up and going down, caused by mechanical friction, a loose coupling or a cracked flexure.',
            '🔴 Hysteresis cannot be adjusted out. Repeated recalibration of the same instrument is a symptom of trying.',
            'Friction gives hysteresis a direction: falsely low on a rising input, falsely high on a falling one.',
            'An up-test alone can never reveal hysteresis. Check the same points in both directions.',
            '🔴 The shape of the error names the fault: constant, growing, worst-in-the-middle, or direction-dependent.',
            'Most real errors are combinations of all four, so read the shape as a decomposition rather than a category.',
            'Zero errors accompany almost every other error, which makes zero the highest-yield first check — but finding one does not mean it is the only fault.',
            'Error is conventionally a percentage of span, not of reading. The same deviation gives different numbers under each convention, so check which one a specification means.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 4.3" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Frequency and time
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Measurement equipment
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule4Section3;
