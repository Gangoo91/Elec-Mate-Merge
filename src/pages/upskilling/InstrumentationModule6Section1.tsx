/**
 * Module 6 · Section 1 — What calibration is, and what it is not
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar. Opens Module 6.
 *
 * 🔴 POSITIONING — READ BEFORE EDITING. Module 1 Section 4 is far more
 * comprehensive than this module's outline assumes. It ALREADY owns: the two
 * kinds of standard, intrinsic standards, the traceability chain, uncertainty
 * growing down the chain, how much better your kit has to be, UKAS and
 * ISO/IEC 17025, and how to read a calibration certificate. Module 4 Section 3
 * owns the error types (zero, span, linearity, hysteresis) and Module 4
 * Section 5 owns as-found/as-left and why records matter.
 *
 * So this page does NOT teach standards, traceability or error types. It owns
 * the one thing none of them cover: WHAT THE OPERATION ACTUALLY IS, and the
 * three-way distinction people get wrong —
 *
 *   CALIBRATION — compare against a KNOWN PHYSICAL INPUT, adjust if needed.
 *                 🔴 Cannot be done without applying a real stimulus.
 *   RANGING     — set LRV/URV. Changes what the signal MEANS. No physical
 *                 input required, and it proves nothing about honesty.
 *   TRIM        — align the instrument's internal conversion. Sensor trim and
 *                 output trim are two separate operations.
 *
 * 🔴 The historical reason this confuses people: analogue instruments blended
 * calibration and ranging into one set of adjustments, so re-ranging DID mean
 * re-calibrating. Digital instruments separate them, so it no longer does —
 * and the habit of treating them as one thing survived the technology change.
 *
 * The torque-wrench analogy is OURS, chosen deliberately for a UK electrician
 * audience. The source uses an alarm clock; that is its author's expression.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §18.1 (calibration versus re-ranging, and the requirement for a known
 * physical stimulus), §18.2 (zero and span adjustments on analogue
 * instruments) and §18.5 (digital trim — sensor trim and output trim as
 * separate low/high operations). Extracted to scratchpad/src/m6_whatis.txt,
 * m6_calvsrange.txt, m6_digitaltrim.txt. Held in ~/Desktop/hav/instrumentation.
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

const TITLE = 'What calibration is, and what it is not | Instrumentation Module 6.1 | Elec-Mate';
const DESCRIPTION =
  'Three operations get called calibration and only one of them is — comparing an instrument against a known physical input. How ranging and trimming differ, why digital instruments separated what analogue ones combined, and what calibration cannot fix.';

const outcomes = [
  '🔴 State what calibration requires that ranging and trimming do not',
  'Explain why an instrument cannot be calibrated without a known physical input',
  'Distinguish calibration, ranging and trimming, and say what each changes',
  'Explain why re-ranging an analogue instrument meant re-calibrating it',
  'Say why that is no longer true of a digital instrument',
  'Distinguish a sensor trim from an output trim',
  '🔴 List what calibration cannot fix, and say why',
  'Decide whether a given task requires a calibration or only a configuration change',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 What does calibrating an instrument require?',
    options: [
      'Applying a known physical input and comparing the instrument’s response against it',
      'A record of the previous settings',
      'The instrument to be removed from service',
      'Access to the instrument’s configuration menu',
    ],
    correctIndex: 0,
    explanation:
      'Calibration is a comparison against reality. Without applying an actual stimulus of precisely known quantity — a real pressure, a real temperature, a real current — there is nothing to compare the instrument against, and whatever was done was not a calibration.',
  },
  {
    id: 2,
    question: 'What does ranging an instrument change?',
    options: [
      'How accurately it measures',
      'What its output signal means — which input values correspond to 4 mA and 20 mA',
      'Its internal conversion from sensor to reading',
      'Its response time',
    ],
    correctIndex: 1,
    explanation:
      'Ranging sets the lower and upper range values, so it defines the relationship between the measured variable and the output signal. It says nothing about whether the instrument is measuring correctly — a badly calibrated transmitter is equally wrong on any range you set it to.',
  },
  {
    id: 3,
    question:
      'A technician changes a transmitter from 0–200 bar to 0–150 bar using a communicator, and records it as a calibration. Is it?',
    options: [
      'Only if the instrument is digital',
      'Yes — the settings were changed and verified',
      'No — that is re-ranging. No physical input was applied, so nothing about the instrument’s accuracy was checked',
      'Yes, provided the output was checked at 4 mA and 20 mA',
    ],
    correctIndex: 2,
    explanation:
      'Changing what the signal means is ranging. It is a legitimate and often necessary task, and it verifies nothing, because no known input was applied. Recording it as a calibration puts a false assurance into the record that somebody later will rely on.',
  },
  {
    id: 4,
    question: 'Why did re-ranging an analogue instrument amount to re-calibrating it?',
    options: [
      'Because analogue instruments have no configuration memory',
      'Because it was a procedural requirement',
      'Because analogue instruments drift faster',
      'Because the same zero and span adjustments served both purposes, so changing the range meant moving them',
    ],
    correctIndex: 3,
    explanation:
      'In an analogue instrument the two functions are blended into one set of physical adjustments. There is no separate place to store a range, so the only way to change it is to move the same screws that set the calibration — which is why the two words were used interchangeably for so long.',
  },
  {
    id: 5,
    question: 'What changed with digital instruments?',
    options: [
      'Calibration and ranging became separate adjustments, so a transmitter can be re-ranged without being recalibrated',
      'Ranging became a physical adjustment',
      'Digital instruments no longer drift',
      'Calibration became unnecessary',
    ],
    correctIndex: 0,
    explanation:
      'A digital transmitter stores its range as configuration and its calibration as a separate internal correspondence. Re-ranging changes only the former. That is genuinely useful — and it means the old habit of treating the two words as synonyms now describes two different jobs.',
  },
  {
    id: 6,
    question: 'What is the difference between a sensor trim and an output trim?',
    options: [
      'They are two names for the same operation',
      'A sensor trim aligns what the instrument perceives with the real input; an output trim aligns what it transmits with what it intends',
      'A sensor trim is for analogue instruments, an output trim for digital',
      'A sensor trim sets the range, an output trim sets the damping',
    ],
    correctIndex: 1,
    explanation:
      'They correct different halves of the instrument. The sensor trim addresses the front end — is the measured value right? The output trim addresses the back end — is the transmitted signal what the instrument thinks it is sending? Each is performed as a separate low and high operation.',
  },
  {
    id: 7,
    question: '🔴 Which of these can a calibration NOT fix?',
    options: [
      'A zero shift',
      'A span error',
      'Hysteresis caused by mechanical friction in the mechanism',
      'An instrument reading consistently high',
    ],
    correctIndex: 2,
    explanation:
      'Module 4 Section 3 established this: hysteresis is mechanical, so adjustment cannot reach the cause. Zero and span errors are exactly what calibration adjustments are for. Recognising which category a fault falls into decides whether calibration is the right response at all.',
  },
  {
    id: 8,
    question:
      'A transmitter is calibrated perfectly on the bench and still reads wrong once installed. What does that suggest?',
    options: [
      'The instrument needs re-ranging',
      'The certificate is invalid',
      'The calibration was performed incorrectly',
      'The error is in the installation or the process connection, which no calibration can address',
    ],
    correctIndex: 3,
    explanation:
      'A calibration certifies the instrument, not the measurement. Mounting position, impulse lines, process connections and where the sensor sits all affect the reading and none of them is inside the instrument. That is why a perfect certificate and a wrong reading are entirely compatible.',
  },
];

const InstrumentationModule6Section1 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 1"
        title="What calibration is"
        backTo="/electrician/upskilling/instrumentation-module-6"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Three different jobs get called calibration. Only one of them is, and it is the only one
          that tells you anything.
        </p>

        <TLDR
          points={[
            '🔴 Calibration means comparing an instrument against a KNOWN PHYSICAL INPUT and adjusting it if needed.',
            '🔴 Without applying a real stimulus, whatever you did was not a calibration — there was nothing to compare against.',
            'Ranging sets the lower and upper range values. It changes what the signal means, and proves nothing about accuracy.',
            'Trimming aligns the instrument’s internal conversion. Sensor trim and output trim are two separate operations.',
            '🔴 Calibration cannot fix hysteresis, a wrong sensor, an installation error or a range mismatch.',
            'A certificate certifies the instrument, not the measurement — so a perfect certificate and a wrong reading are entirely compatible.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>Three jobs, one word</ContentEyebrow>

        <ConceptBlock
          title="🔴 What calibration actually requires"
          plainEnglish="Apply something you know the value of, and see what the instrument says. That comparison is the whole of it."
          onSite="If no physical quantity was applied, no calibration happened — whatever the paperwork says."
        >
          <p>
            To <strong>calibrate</strong> an instrument is to establish &mdash; and where necessary
            correct &mdash; that what comes out of it faithfully tracks what goes into it, right
            across the range it will be used over.
          </p>
          <p>
            The critical word in that sentence is <em>input</em>, and it carries a requirement
            people routinely skip:
          </p>
          <p>
            <strong>
              You cannot perform a true calibration without exposing the instrument to an actual
              physical stimulus of precisely known quantity.
            </strong>
          </p>
          <p>
            For a pressure instrument that means applying real, known pressures and comparing what
            the instrument reports against what you applied. For a temperature instrument it means
            real, known temperatures. There is no way round this, because calibration is
            fundamentally a <strong>comparison against reality</strong> &mdash; and Module 1 Section
            4 explained where the reference you are comparing against gets its authority from.
          </p>
          <p>
            That single requirement separates calibration from the two operations it gets confused
            with, and both of those can be done without applying anything at all.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Ranging — changing what the signal means"
          plainEnglish="Deciding which real-world values correspond to 4 mA and 20 mA. Nothing is measured and nothing is proved."
          onSite="A legitimate and frequently necessary job. It is simply not a calibration, and should not be recorded as one."
        >
          <p>
            To <strong>range</strong> an instrument is to declare which two measured values sit at
            the ends of its output signal, and therefore how finely it resolves everything in
            between. Module 2 Section 1 covered LRV, URV and span, and Module 3 Section 4 showed the
            arithmetic.
          </p>
          <p>
            A pressure transmitter set to 0&ndash;200 bar &mdash; 0 bar giving 4 mA, 200 bar giving
            20 mA &mdash; can be re-ranged to 0&ndash;150 bar, so that 150 bar now gives 20 mA.
          </p>
          <p>
            Notice what that operation did and did not do.{' '}
            <strong>
              It changed what the output signal means. It said nothing whatever about whether the
              instrument measures pressure correctly.
            </strong>{' '}
            A transmitter reading 4 bar high will read 4 bar high on either range.
          </p>
          <p>
            Ranging is done from a keypad or a communicator, in minutes, without a pressure source.
            Calibration needs a known pressure applied and compared. They are different tasks with
            different equipment and different value &mdash; and the same word gets used for both.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Trimming — aligning the instrument with itself"
          plainEnglish="Correcting the instrument's internal idea of what its own sensor and its own output are doing."
          onSite="On a smart transmitter, two separate trims exist and they fix different halves of the device."
        >
          <p>
            A digital transmitter contains two conversions: the sensor is read and turned into an
            internal value, and that internal value is turned into an output signal. Either can
            drift, and each has its own correction.
          </p>
          <ul>
            <li>
              <strong>Sensor trim</strong> &mdash; aligns what the instrument&rsquo;s processor
              perceives with the actual physical input. Performed as two operations, a low trim and
              a high trim, with a known input applied at each. This is the trim that requires a real
              stimulus, and it is a calibration in the sense above.
            </li>
            <li>
              <strong>Output trim</strong> &mdash; aligns the signal the instrument actually
              transmits with the signal it believes it is transmitting. Also performed low and high,
              and checked with a meter reading the loop current rather than with a pressure source.
            </li>
          </ul>
          <p>
            The distinction matters diagnostically, because it splits a fault in half.{' '}
            <strong>
              If the instrument&rsquo;s display is right and the transmitted current is wrong, the
              front end is fine and the output stage is not.
            </strong>{' '}
            If the display itself is wrong, the problem is at the sensor end. One reading and one
            measurement separate them &mdash; and that is Module 3 Section 4&rsquo;s
            reverse-conversion habit applied inside the instrument.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>An analogy that fits the trade</ContentEyebrow>

        <ConceptBlock
          title="The torque wrench"
          plainEnglish="Setting a wrench to 40 Nm and knowing that 40 Nm on its scale really is 40 Nm are two completely different assurances."
          onSite="Every electrician already understands this distinction on a tool. It transfers exactly."
        >
          <p>
            Take a click-type torque wrench, which does both of these jobs and separates them
            cleanly.
          </p>
          <p>
            <strong>Setting it</strong> to 40 Nm for a particular job takes a couple of seconds and
            requires nothing but the wrench. You can change it as often as you like. That is{' '}
            <strong>ranging</strong>: you are deciding what the tool should do, not establishing
            whether it does it.
          </p>
          <p>
            <strong>Calibrating it</strong> means putting it on a torque standard and confirming
            that when the scale says 40 Nm, the wrench actually clicks at 40 Nm. That needs
            equipment you do not carry, it takes real time, and it is the only operation that tells
            you the tool is honest.
          </p>
          <p>Three consequences follow, and all three transfer directly to a transmitter:</p>
          <ul>
            <li>
              <strong>Changing the setting does not recalibrate anything.</strong> Moving from 40 Nm
              to 60 Nm tells you nothing new about the wrench.
            </li>
            <li>
              <strong>If it is out of calibration, every setting is wrong.</strong> A wrench reading
              10 per cent low is 10 per cent low at every value on its scale.
            </li>
            <li>
              <strong>A calibration certificate describes the tool, not the joint.</strong> A
              perfectly calibrated wrench used on a seized thread still gives a wrong result, and
              nothing about the certificate is untrue.
            </li>
          </ul>
          <p>
            The third point is the one worth carrying furthest, and it comes back at the end of this
            section.
          </p>
        </ConceptBlock>

        <Pullquote>
          Setting a torque wrench and calibrating it are not the same assurance. Neither are ranging
          a transmitter and calibrating it — and only one of each pair involves comparing against
          something known.
        </Pullquote>

        <InlineCheck
          id="ins-6-1-ranging"
          question="A transmitter is re-ranged from 0–10 bar to 0–6 bar to improve resolution on a low-pressure duty. What has been established about its accuracy?"
          options={[
            'Nothing at all — no known input was applied, so nothing was compared',
            'It is accurate provided the output reads 4 mA and 20 mA correctly',
            'Its accuracy has been halved',
            'It is now more accurate over the narrower range',
          ]}
          correctIndex={0}
          explanation="Re-ranging changes what the signal means and tests nothing. The resolution of the digital system reading it does improve, as Module 3 Section 4 showed — but whether the transmitter reports pressure truthfully is an entirely separate question that only a calibration can answer."
        />

        <SectionRule />
        <ContentEyebrow>Why the confusion exists</ContentEyebrow>

        <ConceptBlock
          title="Analogue instruments genuinely combined the two"
          plainEnglish="On an older instrument there was nowhere to store a range separately, so changing it meant moving the same adjustments that set the calibration."
          onSite="The habit of using the two words interchangeably is not ignorance — it is a correct description of older equipment that outlived the equipment."
        >
          <p>
            It is worth understanding why so many experienced people use these words as synonyms,
            because for most of the history of instrumentation they were describing something true.
          </p>
          <p>
            An analogue instrument has two physical adjustments &mdash; zero and span &mdash; and
            Module 4 Section 3 showed what each does to the response line. There is no separate
            memory holding a range. So{' '}
            <strong>
              the only way to re-range an analogue instrument is to move the same adjustments that
              set its calibration
            </strong>
            , which means re-ranging and re-calibrating were, in practice, one operation.
          </p>
          <p>
            Digital instruments broke that link. A smart transmitter stores its range as a
            configuration parameter and holds its calibration as a separate internal correspondence
            between what the sensor reports and what the value really is. The two are independent,
            so it is entirely possible &mdash; and often correct &mdash; to re-range a digital
            transmitter without recalibrating it at all.
          </p>
          <p>
            🔴 That is a genuine improvement and it created a genuine hazard. The vocabulary did not
            change with the technology, so{' '}
            <strong>
              &ldquo;I calibrated it&rdquo; may now mean anything from a full comparison against a
              standard to two minutes on a communicator
            </strong>
            . On a record that somebody later relies on, those are not remotely the same statement.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-6-1-trim"
          question="A transmitter's own display reads 5.00 bar under a known applied pressure of 5.00 bar, but the loop carries 11.1 mA where it should carry 12.0 mA. Which trim is needed?"
          options={[
            'Sensor trim — the measurement is wrong',
            'Output trim — the instrument perceives the pressure correctly but is not transmitting what it intends',
            'Both, in sequence',
            'Neither — the transmitter should be re-ranged',
          ]}
          correctIndex={1}
          explanation="The display proves the front end is right: it perceived 5.00 bar and said so. The discrepancy is entirely in what left the terminals, which is the output stage. One reading and one measurement have split the instrument in half and identified which half to correct."
        />

        <SectionRule />
        <ContentEyebrow>Getting the record right</ContentEyebrow>

        <CommonMistake
          title="🔴 Recording a configuration change as a calibration"
          whatHappens={
            <>
              <p>
                A transmitter is re-ranged, or its damping is altered, or its output trim is nudged
                until the panel display agrees with something. The job is logged as a calibration,
                because that is the word everybody uses for going to an instrument and changing it.
              </p>
              <p>
                What has entered the record is an assurance that was never earned. The next person
                to read that file sees an instrument calibrated on a date, and reasonably concludes
                its accuracy was verified against a standard on that date. It was not.
              </p>
              <p>
                🔴 Worse, it corrupts the drift history. Module 4 Section 5 showed that drift is
                only visible by comparing successive as-found readings, so a fictitious calibration
                entry with no as-found data breaks the sequence &mdash; and the impending-failure
                warning that sequence would have given is lost.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Record what you actually did, using the word that describes it. Re-ranged. Damping
                changed from 2 seconds to 5. Output trim performed. Calibrated against a standard,
                with the as-found and as-left figures.
              </p>
              <p>
                The test for whether a job was a calibration is simple and worth applying honestly:{' '}
                <strong>
                  was a known physical quantity applied to the instrument, and was the response
                  compared against it?
                </strong>{' '}
                If not, it was something else, and something else is often exactly what was needed.
              </p>
              <p>
                None of this makes ranging or trimming lesser work. It makes the record mean
                something, which is the entire reason for keeping one.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>🔴 What calibration cannot do</ContentEyebrow>

        <ConceptBlock
          title="A certificate describes the instrument, not the measurement"
          plainEnglish="Calibration establishes that the device converts input to output correctly. Everything between the process and the device is outside its scope."
          onSite="A perfect certificate and a wrong reading are entirely compatible, and that combination confuses people badly."
        >
          <p>
            Calibration is a powerful thing to have done and a narrow one. It answers exactly one
            question: does this instrument turn its input into its output correctly? Several things
            that make a reading wrong are outside that question altogether.
          </p>
          <AppendixTable
            caption="What calibration does and does not reach"
            headers={['Problem', 'Can calibration fix it?', 'Where it belongs']}
            rows={[
              ['Zero shift', 'Yes — this is what the zero adjustment is for', 'Module 4 Section 3'],
              ['Span error', 'Yes — this is what the span adjustment is for', 'Module 4 Section 3'],
              [
                'Linearity error',
                'Not by zero and span. Some instruments have a dedicated adjustment — Section 3 explains why it should almost never be touched',
                'Module 4 Section 3',
              ],
              [
                'Hysteresis',
                '🔴 No — it is mechanical friction, and no adjustment reaches it',
                'Repair or replace the mechanism',
              ],
              [
                'Installation error',
                'No — mounting, impulse lines and sensor location are outside the instrument',
                'Module 2, and the installation',
              ],
              [
                'Range mismatch down the chain',
                'No — the instrument is correct; two devices disagree',
                'Module 3 Section 2',
              ],
              [
                'Noise on the signal',
                'No — the instrument is reporting what arrives at it',
                'Module 3 Section 5',
              ],
              ['Dead time', 'No — it is a property of the process', 'Module 5 Section 1'],
            ]}
            notes="Only the first three rows are calibration's business at all, and only the first two are fully within its reach."
          />
          <p>
            The row that causes most trouble in practice is installation.{' '}
            <strong>
              An instrument calibrated perfectly on a bench can read wrong the moment it is fitted
            </strong>
            , because mounting position, process connections and where the sensing element actually
            sits all affect what it is exposed to. Nothing about the calibration was wrong; it
            simply never addressed that.
          </p>
          <p>
            Module 1 Section 4 made the same point from the standards end &mdash; a calibration
            sticker is not proof that a reading is right. This is the version from the operation
            end:{' '}
            <strong>
              calibration certifies a device, and a measurement is more than a device.
            </strong>
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Deciding which job a request actually is"
          plainEnglish="Most requests arrive as “can you calibrate this”. Working out what is really being asked takes one question."
          onSite="Ask what the person thinks is wrong. The answer usually names the job."
        >
          <p>
            Requests rarely arrive with the right word attached, so it is worth being able to
            translate them. What is being asked for is usually one of four things:
          </p>
          <AppendixTable
            caption="What the request usually means"
            headers={[
              'What you are told',
              'What is probably needed',
              'Does it need a known input?',
            ]}
            rows={[
              ['“It is reading wrong”', 'Verification first, then calibration if it is out', 'Yes'],
              ['“We need it to read 0–6 bar now”', 'Re-ranging', 'No'],
              ['“The reading is too jumpy”', 'Damping — a configuration change', 'No'],
              ['“It is due”', 'Scheduled verification, adjust only if required', 'Yes'],
              [
                '“It reads fine on the display but the DCS disagrees”',
                'Output trim, or a range mismatch further down the chain',
                'Partly — a loop measurement rather than a process input',
              ],
            ]}
            notes="Only two of these five involve applying a physical stimulus. The others are legitimate work that should not be recorded as calibration."
          />
          <p>
            The last row is worth pausing on, because it has two quite different causes with the
            same symptom. If the transmitter&rsquo;s display and the control system disagree, either
            the transmitter is not sending what it thinks it is &mdash; an output trim &mdash; or
            the two ends are ranged differently, which Module 3 Section 2 covered and which no
            amount of work on the transmitter will fix.
          </p>
          <p>
            <strong>
              Establishing which before starting saves the whole job being done in the wrong place.
            </strong>
          </p>
        </ConceptBlock>

        <Scenario
          title="A transmitter calibrated three times, still reading high"
          situation={
            <>
              <p>
                A pressure transmitter on a filter inlet reads consistently about 0.4 bar higher
                than a test gauge fitted at the same tapping. It has been calibrated three times in
                six months. Each calibration finds it within tolerance and leaves it there, and the
                discrepancy returns immediately.
              </p>
              <p>The as-found records show almost no drift between visits.</p>
            </>
          }
          whatToDo={
            <>
              <p>
                Two facts point away from the instrument. It passes its calibration each time, and
                the as-found data shows it is not drifting &mdash; so whatever is producing the
                discrepancy is not changing, and is not inside the transmitter.
              </p>
              <p>
                That directs attention to everything the calibration does not reach. On a pressure
                measurement the usual candidate is the installation:{' '}
                <strong>
                  a difference in height between the transmitter and the tapping point
                </strong>{' '}
                produces a constant offset from the head of liquid in the impulse line, and it will
                be there on every reading, at every pressure, for ever.
              </p>
              <p>
                Check the two devices are genuinely seeing the same thing. Is the test gauge at the
                same elevation? Is the impulse line full, or partly gas-filled? Is there a blockage,
                or an isolation valve not fully open?
              </p>
              <p>
                If a constant elevation difference is the cause, the answer is not another
                calibration. It is either to correct the installation, or to account for the head
                deliberately in the ranging &mdash; which is a decision to record, precisely so the
                next person does not treat it as an error and remove it.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Three calibrations were spent on an instrument that was correct every time. The
                as-found records were the evidence that should have redirected the search after the
                first visit, and they only exist because somebody recorded them &mdash; which is
                Module 4 Section 5&rsquo;s argument arriving with a concrete payoff.
              </p>
              <p>
                It also shows why the scope of calibration is worth being precise about. Everyone
                involved believed the instrument was the problem, because calibration is what you do
                to an instrument that reads wrong.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Why it matters downstream</ContentEyebrow>

        <ConceptBlock
          title="Everything the previous modules built rests on this"
          plainEnglish="A control loop, a totaliser, an alarm and a trend are all only as truthful as the measurement underneath them."
          onSite="Calibration is the least visible work on a plant and the most widely depended on."
        >
          <p>
            It is worth being explicit about why this module exists at all, because calibration is
            easy to see as paperwork.
          </p>
          <p>
            Every technique in the previous five modules assumes the measurement is telling the
            truth:
          </p>
          <ul>
            <li>
              <strong>Module 3</strong> transmits the signal faithfully &mdash; and faithfully
              transmits a wrong one just as well.
            </li>
            <li>
              <strong>Module 4</strong> showed how confidently a measurement can be wrong, and that
              a specification describes an instrument rather than a measurement.
            </li>
            <li>
              <strong>Module 5</strong> built control on top of it, and a controller acting on a
              false reading will drive the plant somewhere it should not be, promptly and
              automatically.
            </li>
          </ul>
          <p>
            That last one is the sharpest.{' '}
            <strong>
              A measurement that merely misleads a person becomes, in a control loop, a measurement
              that makes a plant do the wrong thing
            </strong>
            &mdash; and it will do it while every trend looks perfectly reasonable, because the
            control system is holding the false reading exactly at setpoint.
          </p>
          <p>
            The rest of this module is about how that is prevented in practice: the equipment used,
            the procedures followed, what gets recorded, and how often the whole thing is repeated.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Does a transmitter need calibrating when it is first installed?',
              answer:
                'It needs verifying, which is not quite the same thing. A new instrument arrives with a manufacturer’s calibration and a certificate, so the question is whether you trust that certificate for this duty — and whether the instrument survived transport and installation. Many sites perform an as-found check on installation precisely to establish a starting point for the drift record, which Module 4 Section 5 explained the value of. Ranging, by contrast, almost always is needed, because the factory has no way of knowing the duty.',
            },
            {
              question: 'Can an instrument be calibrated in place, or must it be removed?',
              answer:
                'Both are done and the choice is a trade-off. In-situ calibration keeps the instrument in its actual installed conditions, which is closer to how it will be used, and it requires isolating the process and applying a known input at the instrument. Bench calibration gives better control of conditions and is easier to do accurately, and it removes the instrument from the very installation effects the previous section warned about. Section 3 covers the practicalities of each.',
            },
            {
              question:
                'If a digital instrument can be re-ranged freely, can it be ranged to anything?',
              answer:
                'Within limits set by the sensor, and the limits matter. A transmitter with a sensor capable of 0–100 bar can be ranged to 0–5 bar, but the accuracy specification is generally quoted relative to the sensor’s capability rather than the range you chose — so a very narrow range on a wide sensor gives you resolution you can see and accuracy you may not have. Manufacturers publish a turndown limit for this reason, and it is worth checking before ranging aggressively.',
            },
            {
              question: 'What is the difference between calibration and verification?',
              answer:
                'Verification is the checking half without the adjusting half — you apply known inputs, compare, record, and change nothing. That is often exactly what is wanted, because it produces the as-found evidence without disturbing an instrument that is within tolerance. Calibration in full includes adjustment where needed. Being clear which one was performed matters for the same reason as everything else in this section: the record has to mean something.',
            },
            {
              question: 'Is a calibration valid for ever if the instrument does not drift?',
              answer:
                'A calibration is a statement about one moment, so its value decays with time regardless of what the instrument does — because nobody knows it has not drifted until it is checked again. That is what calibration intervals are for, and Section 5 covers how they are set. The drift history is what justifies an interval, which is the practical reason the as-found record is worth so much more than the as-left one.',
            },
            {
              question: 'Who is allowed to calibrate instruments?',
              answer:
                'That depends on the site and the industry rather than on any general rule, and it is worth establishing before assuming. Some processes are regulated in ways that specify competence, records and authorisation; others leave it to site procedure. What is universal is that the instrument being calibrated must be checked against a standard whose own traceability is intact — Module 1 Section 4 — and that whoever performs it records what they found as well as what they left.',
            },
          ]}
        />

        <ConceptBlock
          title="A short vocabulary worth being strict about"
          plainEnglish="Five words that get used loosely, and what each one actually commits you to."
          onSite="Using them precisely costs nothing and makes a handover mean something."
        >
          <ul>
            <li>
              <strong>Calibration</strong> &mdash; known input applied, response compared, adjusted
              if required. The only one that establishes truthfulness.
            </li>
            <li>
              <strong>Verification</strong> &mdash; the same comparison, deliberately without
              adjusting. Produces the as-found evidence and leaves the instrument alone.
            </li>
            <li>
              <strong>Ranging</strong> &mdash; setting LRV and URV. Changes meaning, establishes
              nothing.
            </li>
            <li>
              <strong>Trimming</strong> &mdash; correcting the instrument&rsquo;s internal
              correspondence, at the sensor end or the output end.
            </li>
            <li>
              <strong>Configuration</strong> &mdash; everything else the instrument stores: damping,
              units, alarm values, characterisation.
            </li>
          </ul>
          <p>
            The distinction between the first two is the one most often lost, and it matters more
            than it sounds.{' '}
            <strong>
              A verification that finds an instrument within tolerance is a complete and successful
              job
            </strong>
            &mdash; there is nothing to adjust, and adjusting anyway destroys the as-found value the
            next drift calculation depends on.
          </p>
        </ConceptBlock>

        <KeyTakeaways
          points={[
            '🔴 Calibration means comparing an instrument against a known physical input and adjusting if needed. That comparison is the whole of it.',
            '🔴 Without applying a real stimulus there is nothing to compare against, so no calibration took place.',
            'Ranging sets LRV and URV. It changes what the signal means and proves nothing about accuracy.',
            'A transmitter reading 4 bar high reads 4 bar high on any range you set it to.',
            'Sensor trim aligns what the instrument perceives with the real input; output trim aligns what it transmits with what it intends.',
            'If the display is right and the current is wrong, the fault is in the output stage — one measurement splits the instrument in half.',
            'Analogue instruments blended calibration and ranging into the same zero and span adjustments, so the two really were one job.',
            'Digital instruments separated them, so re-ranging no longer recalibrates — but the shared vocabulary survived the change.',
            '🔴 So “I calibrated it” now covers anything from a full comparison against a standard to two minutes on a communicator.',
            '🔴 Record what you actually did. A configuration change logged as a calibration puts an unearned assurance into the file and breaks the drift history.',
            'Calibration reaches zero and span errors. It does not reach hysteresis, installation error, range mismatch, noise or dead time.',
            '🔴 A certificate describes the instrument, not the measurement — so a perfect certificate and a wrong reading are entirely compatible.',
            'The test for whether a job was a calibration: was a known quantity applied, and was the response compared against it?',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 6.1" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Back
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">Module 6</span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Equipment and standards
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule6Section1;
