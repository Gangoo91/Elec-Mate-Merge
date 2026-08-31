/**
 * Module 6 · Section 6 — Calibrating the loop, not just the instrument
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar. Closes Module 6.
 *
 * 🔴 POSITIONING. The outline said "advanced calibration topics and best
 * practices", which is a bin rather than a subject. Two things make a much
 * better closing section, and both are genuinely uncovered:
 *
 *   1. 🔴 LOOP CALIBRATION vs DEVICE CALIBRATION — "loop calibration" appears
 *      ZERO times anywhere in Modules 1-5. Yet every previous section has
 *      calibrated a DEVICE, and the plant cares about the LOOP. These answer
 *      different questions and neither substitutes for the other.
 *
 *   2. 🔴 HOW ERRORS COMBINE — and this one is a DEBT. Module 3 Section 4 says
 *      "they do not simply add — some are systematic and pull in a consistent
 *      direction, others are random and partly cancel — and Module 4 Section 3
 *      handles that arithmetic properly." M4.3 does NOT handle it; it covers
 *      error TYPES. That promise has been outstanding since Module 3 and this
 *      page pays it.
 *
 * 🔴 THE KEY TEACHING: individual device tolerances do NOT add up to the loop
 * tolerance. Four devices each within ±0.5% does not give a loop within ±0.5%,
 * and it does not give ±2.0% either. Worst case is the arithmetic sum (all
 * errors aligned); realistic is considerably less because independent errors
 * partly cancel. Both bounds matter and using the wrong one is a real error.
 *
 * ⚠️ ACCURACY: root-sum-square is the standard method for combining independent
 * uncertainties and it is derivable, so it may be TAUGHT — but do not attribute
 * it to a specific standard we do not hold, and be explicit that it applies to
 * INDEPENDENT errors only. Systematic errors that share a cause do add.
 *
 * Sources: applied reasoning from the course's own material. Kuphaldt §18.7
 * establishes that both input and output standards are needed; Module 1
 * Section 4 establishes that uncertainty grows down a chain, which is the same
 * argument applied to a signal path rather than a standards path. The
 * arithmetic here is derived and numerically checked, not taken from a source.
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
  'Calibrating the loop, not just the instrument | Instrumentation Module 6.6 | Elec-Mate';
const DESCRIPTION =
  'Why a loop of perfectly calibrated devices can still be out of tolerance, how errors combine through a measurement chain, and when to calibrate end to end rather than device by device.';

const outcomes = [
  'Distinguish a device calibration from a loop calibration and say what each establishes',
  '🔴 Explain why individual device tolerances do not add up to the loop tolerance',
  'Calculate the worst case for a chain of errors, and say when it applies',
  '🔴 Explain why independent errors partly cancel, and combine them realistically',
  'Say why systematic errors sharing a cause do add rather than cancel',
  'Decide when an end-to-end calibration is the right test',
  'Say what a loop calibration cannot tell you',
  'Explain why a loop can pass end to end with a device out of tolerance',
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does a loop calibration establish that a device calibration does not?',
    options: [
      'That the whole chain, from process to display, produces a correct final value',
      'That the wiring is correctly installed',
      'That the instrument is traceable',
      'That each device is within its own tolerance',
    ],
    correctIndex: 0,
    explanation:
      'Device calibration answers whether each part is right. A loop calibration answers whether the number the plant acts on is right, which is a different question — and the one the process actually cares about.',
  },
  {
    id: 2,
    question:
      '🔴 Four devices in a measurement chain are each within ±0.5 per cent. What is the loop tolerance?',
    options: [
      '±0.5 per cent',
      'Somewhere between ±0.5 and ±2.0 per cent, depending on how the errors combine',
      '±2.0 per cent exactly',
      '±0.125 per cent',
    ],
    correctIndex: 1,
    explanation:
      'It is not ±0.5, because the errors accumulate. It is not necessarily ±2.0 either, because that assumes every error is at its limit and all in the same direction. The realistic figure sits between the two, and which bound applies depends on whether the errors are independent.',
  },
  {
    id: 3,
    question: 'When does the worst case — the straight arithmetic sum — actually apply?',
    options: [
      'Never — it is purely theoretical',
      'Always, so it should always be used',
      'When every error happens to be at its limit and all in the same direction',
      'Only for digital instruments',
    ],
    correctIndex: 2,
    explanation:
      'The arithmetic sum is a genuine bound and an unlikely one, since it requires every device to be simultaneously at its worst and aligned. It is the right figure when you must guarantee a limit cannot be exceeded, and pessimistic for estimating typical performance.',
  },
  {
    id: 4,
    question: '🔴 Why do independent errors partly cancel?',
    options: [
      'Because calibration removes them',
      'Because they are all small',
      'Because manufacturers design them to',
      'Because there is no reason for unrelated errors to point the same way, so some offset others',
    ],
    correctIndex: 3,
    explanation:
      'If a transmitter reads slightly high for its own reasons and a conversion resistor is slightly low for entirely unrelated reasons, the two partly offset. Nothing coordinates them. That is why a chain of independent errors is typically much better than the worst case suggests.',
  },
  {
    id: 5,
    question:
      'Three independent errors of ±1 per cent combine. What is a realistic combined figure?',
    options: ['About ±1.7 per cent', '±1 per cent', 'About ±0.33 per cent', '±3 per cent'],
    correctIndex: 0,
    explanation:
      'Combining independent errors by the root of the sum of their squares gives √(1² + 1² + 1²) ≈ 1.73 per cent. That is considerably better than the ±3 per cent worst case and considerably worse than any single contribution — which is the point.',
  },
  {
    id: 6,
    question: '🔴 When do errors add rather than partly cancel?',
    options: [
      'When they are all in the same instrument',
      'When they share a common cause, so they move together rather than independently',
      'When they are large',
      'When the instruments are the same model',
    ],
    correctIndex: 1,
    explanation:
      'The cancellation argument depends on independence. If several devices share a cause — the same ambient temperature change, the same supply variation, the same wrongly-set reference — their errors move together and reinforce. Treating those as independent underestimates the total.',
  },
  {
    id: 7,
    question:
      'A loop calibration passes end to end, but one device in it is later found out of tolerance. How?',
    options: [
      'The device tolerance must have been set too tight',
      'The loop calibration must have been wrong',
      'Another device’s error happened to offset it, so the chain came out right for the wrong reason',
      'This is impossible',
    ],
    correctIndex: 2,
    explanation:
      'Errors that offset produce a correct final answer from two wrong intermediate ones. The loop is delivering the right number today and has no margin left, and the compensation will disappear as soon as either device is replaced or adjusted.',
  },
  {
    id: 8,
    question: 'What can an end-to-end loop calibration not tell you?',
    options: [
      'Whether the loop meets its tolerance',
      'Whether the display is readable',
      'Whether the final value is correct',
      'Which device in the chain is responsible for any error found',
    ],
    correctIndex: 3,
    explanation:
      'It tests the chain as a whole, so a failure tells you the chain is wrong without localising it. Section 2’s substitution technique is how you then divide the loop and find which part is responsible.',
  },
];

const InstrumentationModule6Section6 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 6"
        title="Calibrating the loop"
        backTo="/electrician/upskilling/instrumentation-module-6"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Every section so far has calibrated a device. The plant does not act on a device — it acts
          on the number at the end of the chain.
        </p>

        <TLDR
          points={[
            'A device calibration asks whether each part is right. A loop calibration asks whether the final number is right.',
            '🔴 Individual device tolerances do not add up to the loop tolerance.',
            'The worst case is the arithmetic sum: every error at its limit, all pointing the same way.',
            'Independent errors partly cancel, so a realistic figure is the root of the sum of the squares.',
            '🔴 Errors sharing a common cause — temperature, supply, a wrong reference — do add, because they move together.',
            'A loop can pass end to end with a device out of tolerance, if another device’s error offsets it.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>Two different questions</ContentEyebrow>

        <ConceptBlock
          title="The device is calibrated. Is the measurement?"
          plainEnglish="You can certify every part of a chain and still not have certified what comes out of the end of it."
          onSite="Ask which question is being asked. Most calibration records answer the first and get read as if they answered the second."
        >
          <p>
            Everything in this module so far has calibrated a <strong>device</strong>. Section 1
            defined it as establishing that an instrument&rsquo;s output corresponds to its input;
            Section 3 gave the procedure; Section 4 gave the verdict.
          </p>
          <p>
            But Module 3 Section 2 described what a real measurement actually is: a{' '}
            <strong>chain</strong>. A sensing element, a transmitter, a cable, perhaps an isolator,
            a conversion resistor, an input card, a controller&rsquo;s scaling, and a display. Each
            handover is a conversion, and Module 3 Section 4 listed every place error can enter.
          </p>
          <p>So there are two quite different questions, and they need distinguishing:</p>
          <AppendixTable
            caption="Device calibration and loop calibration"
            headers={['', 'Device calibration', 'Loop calibration']}
            rows={[
              [
                'The question',
                'Does this instrument convert its input to its output correctly?',
                'Does the number at the end of the chain match the process?',
              ],
              [
                'What is applied',
                'A known input at the instrument',
                'A known input at the sensing element',
              ],
              [
                'What is read',
                'The instrument’s own output',
                'The final display, trend or control-system value',
              ],
              [
                'On failure',
                'You know which device is wrong',
                '🔴 You know the chain is wrong, and not where',
              ],
              [
                'What it misses',
                'Everything between and beyond the devices',
                'Which contribution belongs to which device',
              ],
            ]}
            notes="Neither is a substitute for the other. The first localises, the second validates what the plant actually acts on."
          />
          <p>
            The plant does not act on a device. It acts on the value at the end of the chain, which
            is why the second question is the one that matters operationally &mdash; and the first
            is the one calibration records almost always answer.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 How the errors combine</ContentEyebrow>

        <ConceptBlock
          title="Tolerances do not carry through a chain"
          plainEnglish="Four devices each within half a per cent does not give you a measurement within half a per cent. It cannot, because each one adds its own contribution."
          onSite="This is the arithmetic that decides whether a loop can meet its requirement at all."
        >
          <p>
            Module 3 Section 4 flagged this and deferred the arithmetic. Here it is, because it
            decides something practical: whether a chain of individually acceptable devices can
            deliver an acceptable measurement.
          </p>
          <p>
            Take a chain of four elements, each specified to <strong>&plusmn;0.5 per cent</strong>.
            The intuitive answer &mdash; that the loop is therefore within &plusmn;0.5 per cent
            &mdash; is simply wrong. Each element contributes its own error, and they accumulate.
          </p>
          <p>
            <strong>The worst case</strong> is the straight arithmetic sum: every device
            simultaneously at its limit, and every error pointing the same way.
          </p>
          <p>
            0.5 + 0.5 + 0.5 + 0.5 = <strong>&plusmn;2.0 per cent</strong>
          </p>
          <p>
            That is a real bound &mdash; the loop genuinely cannot be worse than this &mdash; and it
            is a very pessimistic estimate of typical performance, because it requires a
            coincidence.{' '}
            <strong>
              Nothing coordinates four independent devices into being at their worst together and in
              the same direction.
            </strong>
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Independent errors partly cancel"
          plainEnglish="If one device reads a little high for its own reasons and another reads a little low for entirely unrelated reasons, the two partly undo each other."
          onSite="This is why real loops perform far better than a worst-case sum suggests — and why you cannot rely on it."
        >
          <p>
            The reason the worst case is pessimistic is that the errors are <em>independent</em>. A
            transmitter reads slightly high because of its own internal drift. A conversion resistor
            is slightly low because of its own tolerance. There is no mechanism connecting those two
            facts, so there is no reason for them to point the same way &mdash; and when they point
            in opposite directions they partly offset.
          </p>
          <p>
            The standard way to combine independent errors is the{' '}
            <strong>root of the sum of the squares</strong>: square each contribution, add them,
            take the square root.
          </p>
          <p>Run the four &plusmn;0.5 per cent devices through it:</p>
          <ul>
            <li>Squares: 0.25 + 0.25 + 0.25 + 0.25 = 1.0</li>
            <li>
              Root: <strong>&plusmn;1.0 per cent</strong>
            </li>
          </ul>
          <p>
            So the same chain is <strong>&plusmn;2.0 per cent</strong> in the worst case and about{' '}
            <strong>&plusmn;1.0 per cent</strong> realistically. Both figures are correct and they
            answer different questions:
          </p>
          <ul>
            <li>
              <strong>Use the worst case</strong> when you must guarantee a limit cannot be exceeded
              &mdash; a safety-related measurement, or where a specification is absolute.
            </li>
            <li>
              <strong>Use the combined figure</strong> when estimating what performance to expect in
              practice.
            </li>
          </ul>
          <p>
            Notice what the arithmetic says about where to spend effort.{' '}
            <strong>In a squared sum, the largest contributor dominates</strong>
            &mdash; a chain with one &plusmn;2 per cent element and three &plusmn;0.2 per cent ones
            combines to about &plusmn;2.03 per cent, so improving the small ones achieves almost
            nothing. Fix the biggest term or fix nothing.
          </p>
        </ConceptBlock>

        <Pullquote>
          Four devices each within half a per cent give a loop within about one per cent — not half,
          and not two. Neither the optimistic nor the pessimistic answer is the useful one.
        </Pullquote>

        <InlineCheck
          id="ins-6-6-combine"
          question="A chain has errors of ±2.0, ±0.3 and ±0.2 per cent. Roughly what is the realistic combined figure, and where should effort go?"
          options={[
            '±0.83 per cent; the errors average out',
            'About ±2.03 per cent; only the 2.0 per cent element is worth addressing',
            'About ±1.5 per cent; improve the two small ones',
            '±2.5 per cent; improve all three',
          ]}
          correctIndex={1}
          explanation="Squares are 4.0, 0.09 and 0.04, summing to 4.13, whose root is about 2.03. The two small contributions add barely 0.03 per cent between them. In a squared sum the largest term dominates completely, so effort spent on the small elements is effort wasted."
        />

        <ConceptBlock
          title="🔴 When errors add instead"
          plainEnglish="The cancellation only works if the errors are unrelated. If several devices are being pushed the same way by the same thing, they reinforce."
          onSite="Ask whether anything could affect several devices at once. Temperature usually can."
        >
          <p>
            The root-sum-square method rests entirely on the errors being{' '}
            <strong>independent</strong>, and that assumption is not always safe. Where several
            contributions share a common cause they move together, and they add rather than partly
            cancelling.
          </p>
          <p>Things that commonly correlate errors across a chain:</p>
          <ul>
            <li>
              <strong>Ambient temperature.</strong> Module 4 Section 3 listed it among the causes of
              drift. A panel that gets hot affects every device in it, in whatever direction the
              temperature coefficient dictates &mdash; and often the same direction for similar
              devices.
            </li>
            <li>
              <strong>Supply variation.</strong> Devices sharing a supply share whatever that supply
              does.
            </li>
            <li>
              <strong>A common reference.</strong> If several instruments were calibrated against
              the same standard and that standard has drifted, every one of them carries the same
              error in the same direction &mdash; which is Section 2&rsquo;s lapsed-certificate
              mistake propagated across a chain.
            </li>
            <li>
              <strong>A shared installation effect.</strong> Anything acting on the process
              connection affects everything downstream of it identically.
            </li>
          </ul>
          <p>
            🔴 The third one is the most insidious, because it defeats the cancellation argument
            completely and invisibly.{' '}
            <strong>
              Errors introduced by a common standard are perfectly correlated &mdash; they cannot
              cancel, because they are the same error appearing several times.
            </strong>
          </p>
          <p>
            So the practical rule is to ask what could push several devices the same way at once.
            Where such a cause exists, treat those contributions as adding rather than combining
            statistically.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The loop that passes for the wrong reason</ContentEyebrow>

        <ConceptBlock
          title="Compensating errors"
          plainEnglish="Two devices wrong in opposite directions can give a right answer at the end. It looks like a healthy loop and it is not."
          onSite="A loop that passes end to end with a device out of tolerance is a loop with no margin left."
        >
          <p>
            The cancellation that makes chains perform well has a shadow side, and it is the reason
            neither type of calibration replaces the other.
          </p>
          <p>
            Suppose a transmitter reads 1.5 per cent high &mdash; outside its own tolerance &mdash;
            and a conversion resistor happens to be low by about the same amount. An end-to-end loop
            check produces a correct final value, and the loop passes.
          </p>
          <p>
            <strong>The measurement is right today and it is right for the wrong reason.</strong>{' '}
            Two faults are offsetting, and three things follow:
          </p>
          <ul>
            <li>
              <strong>There is no margin.</strong> Any further drift in either device now shows up
              immediately, because the compensation is already fully used.
            </li>
            <li>
              <strong>Maintenance will break it.</strong> Replace the resistor with a correct one
              and the loop suddenly reads 1.5 per cent high, apparently caused by the very work that
              corrected a fault.
            </li>
            <li>
              <strong>The record misleads.</strong> A passing loop calibration reads as a healthy
              loop, and nothing points at the transmitter.
            </li>
          </ul>
          <p>
            The mirror case is equally real and less alarming: a loop can{' '}
            <strong>fail end to end with every device inside its own tolerance</strong>, simply
            because the individual errors happened to align. Nothing is faulty; the chain is asking
            for more than the sum of its parts can deliver, which is the arithmetic from earlier in
            this section.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-6-6-compensating"
          question="A loop has passed end to end for years. A device in it is found 1.5 per cent out and corrected — and the loop now reads 1.5 per cent wrong. What happened?"
          options={[
            'The correction was performed incorrectly',
            'The loop needs recalibrating end to end',
            'A second error was offsetting the first, and correcting one exposed the other',
            'The device tolerance was set too tight',
          ]}
          correctIndex={2}
          explanation="Two faults were cancelling. The loop was right for the wrong reason, which is exactly why every end-to-end check passed. The correction was right and it revealed a second error that was always present — reinstating the first to mask it would leave the loop right today and wrong the moment anything else changed."
        />

        <SectionRule />
        <ContentEyebrow>Reading the record wrongly</ContentEyebrow>

        <CommonMistake
          title="Assuming a device calibration certifies the measurement"
          whatHappens={
            <>
              <p>
                A transmitter is calibrated, certificated and returned to service. The measurement
                is then treated as verified, because the instrument at the heart of it has a current
                certificate.
              </p>
              <p>
                Section 1 established that a certificate describes the instrument rather than the
                measurement, and this section adds the specific reason:{' '}
                <strong>
                  the certificate covers one link in a chain of several, and says nothing about the
                  others or about how their errors combine.
                </strong>
              </p>
              <p>
                The conversion resistor, the input card, the ranging at each end and the display
                scaling are all outside it. So is the installation, which Section 1 identified as
                the thing calibration never reaches.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Be explicit about which question a record answers. A device certificate answers
                &ldquo;is this instrument right?&rdquo; and an end-to-end check answers &ldquo;is
                the measurement right?&rdquo; &mdash; and both are worth having for a measurement
                that matters.
              </p>
              <p>
                Where the loop tolerance is what actually matters, work out whether the devices can
                deliver it. That is the combination arithmetic above, and it is a design question
                better answered before commissioning than after a dispute.
              </p>
              <p>
                And where a loop is checked end to end, record it as a loop result rather than
                folding it into a device record. They are different findings and conflating them
                loses the distinction that makes each one useful.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Choosing which test</ContentEyebrow>

        <ConceptBlock
          title="When to do which, and in what order"
          plainEnglish="End to end proves the answer. Device by device finds the culprit. Do the first to know whether there is a problem, the second to find it."
          onSite="An end-to-end check is often quicker than calibrating four devices, and it answers the question the plant asked."
        >
          <p>The two tests are complementary and there is a sensible order:</p>
          <ul>
            <li>
              <strong>Start end to end</strong> where the question is whether the measurement is
              trustworthy. Apply a known input at the sensing element and read the final value. If
              it agrees, the whole chain is delivering, and no device needs disturbing.
            </li>
            <li>
              <strong>Go device by device</strong> when the end-to-end test fails, because that
              result tells you the chain is wrong without saying where. Section 2&rsquo;s
              substitution technique divides the loop &mdash; each substitution tests everything
              downstream of it and excludes everything upstream, which is exactly how a chain gets
              bisected.
            </li>
          </ul>
          <p>
            That order has a practical advantage worth stating plainly.{' '}
            <strong>
              An end-to-end check that passes has verified the measurement without anybody adjusting
              anything
            </strong>
            , which avoids the risk Section 3&rsquo;s scenario illustrated &mdash; adjustment making
            a working system worse.
          </p>
          <p>
            The exception is where the loop tolerance is tight relative to what the devices can
            deliver. There, individual device performance matters in its own right, because the
            combination arithmetic means a single device drifting can consume the whole loop budget
            &mdash; and an end-to-end pass today does not show how close to the edge the chain is
            sitting.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-6-6-budget"
          question="A loop must hold ±1 per cent. Its four devices are each specified to ±0.5 per cent. Can it meet the requirement?"
          options={[
            'Yes, comfortably — each device is well inside the loop tolerance',
            'No, because 4 × 0.5 is 2.0 per cent',
            'Yes, because the errors average to 0.5 per cent',
            'Realistically yes at about ±1.0 per cent, but with no margin, and not at all on a worst-case basis',
          ]}
          correctIndex={3}
          explanation="Combining independently gives exactly ±1.0 per cent — meeting the requirement with nothing to spare, so any drift in any device puts the loop outside. On a worst-case basis it is ±2.0 per cent and fails. Whether that is acceptable depends on how the tolerance must be guaranteed, and it is a question to answer before commissioning rather than after a dispute."
        />

        <Scenario
          title="A loop that got worse the day it was repaired"
          situation={
            <>
              <p>
                A temperature measurement has read correctly for years, verified end to end at each
                annual check. During a routine calibration the transmitter is found 1.2 per cent
                high, outside its tolerance. It is adjusted and returned to service.
              </p>
              <p>
                The following week the measurement is reported as reading about 1.2 per cent low
                against a portable reference. It had been correct before the transmitter was
                corrected.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                The sequence is the diagnosis. A loop that was right, had a genuine fault corrected,
                and became wrong by a similar amount in the opposite direction was almost certainly
                relying on <strong>compensating errors</strong>.
              </p>
              <p>
                Something else in the chain has been about 1.2 per cent low all along. While the
                transmitter was high the two offset and the final value was correct — which is why
                every end-to-end check passed and nothing looked wrong.
              </p>
              <p>
                So look for the second error, which is now exposed. Candidates are the conversion
                resistor, the input card, the ranging at either end and the display scaling. Section
                2&rsquo;s substitution technique isolates them: simulate a known current at the
                transmitter terminals and see whether the displayed value is right, which divides
                the chain at exactly the useful point.
              </p>
              <p>
                🔴 What matters is not undoing the transmitter adjustment. That was correct and it
                exposed a fault that was always present, and reinstating an error to mask another
                one would leave the loop right today and wrong the moment anything else changed.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Every end-to-end check for years reported a healthy loop, and the loop had two
                faults the whole time. The record was accurate and the conclusion drawn from it was
                not.
              </p>
              <p>
                It also shows why the two calibration types are complementary rather than
                alternatives. Only the device check found the transmitter, and only the end-to-end
                history explains why nobody noticed.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="Building an error budget before anything is bought"
          plainEnglish="Add the contributions up before commissioning, not after somebody disputes a reading."
          onSite="Ten minutes of arithmetic at design stage settles what no amount of calibration can fix afterwards."
        >
          <p>
            The arithmetic in this section is most useful before a loop exists, because it answers a
            question that cannot be fixed later:{' '}
            <strong>
              can these devices, in this arrangement, deliver what is being asked of the
              measurement?
            </strong>
          </p>
          <p>An error budget is a short list:</p>
          <ul>
            <li>
              <strong>State the loop tolerance</strong> &mdash; what the measurement must achieve,
              from Section 4&rsquo;s argument that it comes from the duty.
            </li>
            <li>
              <strong>List every contribution</strong> &mdash; sensor, transmitter, any isolator or
              splitter, the conversion resistor, the input card, and the resolution limit from
              Module 3 Section 4.
            </li>
            <li>
              <strong>Combine them</strong> &mdash; worst case if the limit must be guaranteed,
              root-sum-square for realistic performance, and treat anything with a shared cause as
              adding.
            </li>
            <li>
              <strong>Compare against the requirement</strong>, and check there is margin left for
              drift between calibrations.
            </li>
          </ul>
          <p>
            That last point matters and is easily forgotten.{' '}
            <strong>
              A budget that exactly meets the requirement on day one has nothing left for the drift
              Section 5 was about
            </strong>
            &mdash; so the loop is out of tolerance as soon as anything moves at all, and the
            calibration interval becomes impossibly short.
          </p>
          <p>
            Where the budget cannot meet the requirement, that is a genuine finding and the honest
            responses are limited: a better device where the dominant term is, a shorter chain, or a
            requirement that reflects what is achievable. What is not available is calibrating the
            problem away.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Where Module 6 has been"
          plainEnglish="Six sections that take a calibration from what it means, through how it is done, to what it is worth."
          onSite="The thread throughout is that a calibration is only worth what its record supports."
        >
          <ul>
            <li>
              <strong>Section 1</strong> &mdash; calibration is a comparison against a known
              physical input, and it is neither ranging nor trimming.
            </li>
            <li>
              <strong>Section 2</strong> &mdash; the equipment, and the fact that any substitution
              tests everything downstream and excludes everything upstream.
            </li>
            <li>
              <strong>Section 3</strong> &mdash; the procedure, and why analogue adjustments iterate
              while digital trims do not.
            </li>
            <li>
              <strong>Section 4</strong> &mdash; the verdict, where a tolerance comes from, and what
              a failure says about the period just passed.
            </li>
            <li>
              <strong>Section 5</strong> &mdash; how often, argued from the as-found history rather
              than from habit.
            </li>
            <li>
              <strong>Section 6</strong> &mdash; the device against the loop, and how errors combine
              along a chain.
            </li>
          </ul>
          <p>
            Two ideas carry forward.{' '}
            <strong>The as-found record is the most valuable thing a calibration produces</strong>{' '}
            &mdash; evidence of what the instrument was doing in service, the basis for assessing
            its past readings, and the input that sets the next interval.
          </p>
          <p>
            And{' '}
            <strong>a certificate certifies a device, while a plant runs on a measurement</strong>.
            Module 7 takes up the wiring those measurements travel through, and Module 8 brings the
            whole course together as fault finding.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Is an end-to-end loop calibration always possible?',
              answer:
                'Not always, and where it is not the reason is usually access. Applying a known input at the sensing element means getting a standard to the sensor — straightforward for a transmitter with a test connection, awkward for a thermowell in a vessel, and sometimes impossible without a shutdown. Where the sensing element cannot be reached, the practical substitute is to test from the transmitter onwards and treat the sensor separately, which is Section 2’s point about what each substitution excludes.',
            },
            {
              question: 'Should every loop have a stated loop tolerance?',
              answer:
                'Every loop that matters should, because otherwise there is no way to judge whether the chain is acceptable — only whether each part is. Section 4 made the point that a tolerance comes from what the process needs, and the process needs a final number rather than an intermediate one. In practice many loops have device tolerances and no loop tolerance, which means nobody has checked that the parts can deliver what is wanted.',
            },
            {
              question: 'Does adding an isolator or a splitter into a loop degrade accuracy?',
              answer:
                'It adds another contribution to the chain, so on the arithmetic in this section it can only make the combined figure worse — though often by very little if its own error is small relative to the largest term. Module 3 Section 3 covered what isolators buy, and the trade is usually worth it. What matters is that it is counted: a device added to a loop without being included in the error budget is an unaccounted contribution.',
            },
            {
              question: 'Why square the errors rather than just averaging them?',
              answer:
                'Because averaging would suggest a chain of similar errors is no worse than one of them, which is plainly wrong — adding more error sources cannot improve a measurement. Squaring, summing and taking the root gives a figure that always grows as contributions are added, grows more slowly than a straight sum, and is dominated by the largest term. That behaviour matches what independent errors actually do.',
            },
            {
              question: 'How do you know whether errors are independent?',
              answer:
                'By asking what could cause several of them at once, which is a physical question rather than a statistical one. Devices in separate locations, on separate supplies, calibrated against different standards, are reasonably treated as independent. Devices in the same hot panel, sharing a supply, or all calibrated against one instrument are not. When in doubt the conservative answer is to treat them as correlated, because that gives the pessimistic figure.',
            },
            {
              question: 'If a loop passes end to end, is there any need to calibrate the devices?',
              answer:
                'It depends on how much margin the loop has and how much you need to know. A comfortable pass on a loop whose tolerance is loose relative to its devices is good evidence. A marginal pass tells you very little about whether one device is consuming the entire budget while another compensates — and this section’s scenario shows what that costs later. Where the measurement matters, both tests earn their place.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A device calibration asks whether an instrument is right. A loop calibration asks whether the measurement is right.',
            'The plant acts on the number at the end of the chain, and calibration records almost always answer the other question.',
            '🔴 Individual device tolerances do not carry through a chain — the errors accumulate.',
            'Worst case is the arithmetic sum: four ±0.5 per cent devices give ±2.0 per cent, requiring every error at its limit and aligned.',
            '🔴 Independent errors partly cancel, because nothing coordinates them. Combine them as the root of the sum of the squares.',
            'The same four devices realistically give about ±1.0 per cent — worse than any one, far better than the sum.',
            'Use the worst case to guarantee a limit; use the combined figure to estimate real performance.',
            '🔴 In a squared sum the largest term dominates. Improving small contributors achieves almost nothing.',
            '🔴 Errors sharing a common cause — temperature, supply, or a common calibration standard — add rather than cancel.',
            'A common drifted standard is the worst case: the same error appearing several times, which cannot cancel.',
            'Compensating errors let a loop pass end to end with a device out of tolerance — right answer, wrong reason, no margin.',
            'Correcting one of a compensating pair makes the loop visibly wrong, which looks like the repair caused it.',
            'A loop can also fail with every device inside tolerance, simply because the errors aligned. Nothing is faulty.',
            'Start end to end to learn whether there is a problem; go device by device to find it.',
            'An end-to-end pass verifies the measurement without anybody adjusting anything, which avoids making a working system worse.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 6.6" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Calibration intervals
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next module <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Loops and wiring
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule6Section6;
