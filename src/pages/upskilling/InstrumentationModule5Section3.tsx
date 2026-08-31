/**
 * Module 5 · Section 3 — PID control basics
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE FRAMING. PID is usually taught as three knobs with three descriptions,
 * which leaves the learner able to recite the terms and unable to predict what
 * any of them will do. The organising idea here is that each term answers a
 * DIFFERENT QUESTION ABOUT TIME:
 *
 *   P — how big is the error RIGHT NOW?      → sets the size of the correction
 *   I — how long has it been there?           → keeps growing the correction
 *   D — how fast is it changing?              → applies a brake
 *
 * 🔴 THE SPINE is proportional offset, derived rather than asserted. A P-only
 * output is bias + (gain × error). At zero error the output IS the bias. But
 * holding a process almost always needs a specific non-zero output that varies
 * with load — so to produce anything other than the bias, P REQUIRES a standing
 * error. Offset is therefore structural, not a tuning failure, and integral
 * action exists precisely to remove it. Taught that way, "why do we need I"
 * becomes a conclusion rather than a fact.
 *
 * The offset worked example is OURS and the arithmetic is checked: reverse
 * acting, bias 50%, load needing 60% output — gain 1 gives 10% offset, gain 2
 * gives 5%, gain 4 gives 2.5%. That also derives the gain/offset/stability
 * trade-off without hand-waving.
 *
 * 🔴 Section 1's three process types pay off here: self-regulating REQUIRES
 * integral, integrating is ideally proportional-only (integral guarantees
 * overshoot), runaway REQUIRES derivative.
 *
 * 🔴 Derivative amplifies noise dramatically — the practical reason it is so
 * often left at zero, and it connects to Module 3 Section 5.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §29.4–29.5 (proportional control, load, and proportional-only offset),
 * §29.6 (integral/reset), §29.7 (derivative/rate), §29.8.1–29.8.3 (the summary
 * definitions, gain vs proportional band as reciprocals, repeats-per-minute and
 * minutes-per-repeat, and the derivative time constant) and §30.1.1–30.1.3 (what
 * each process type requires). Kuphaldt's own mnemonics are his expression, not
 * ours — the present/past/future structure is taught here in our own words.
 * Extracted to scratchpad/src/m5_pid.txt, m5_processtypes.txt.
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

const TITLE = 'PID control basics | Instrumentation Module 5.3 | Elec-Mate';
const DESCRIPTION =
  'Why proportional control alone can never hold setpoint, what integral action does about it, what derivative anticipates, how gain and proportional band relate, and which process types genuinely require which term.';

const outcomes = [
  'Say what question about time each of the three terms answers',
  'Calculate a proportional output change from a gain and an input change',
  'Convert between gain and proportional band',
  '🔴 Explain why proportional-only control leaves a standing offset',
  'Show why raising the gain reduces offset, and what that costs',
  'Explain how integral action removes offset when proportional cannot',
  'Describe what derivative action responds to, and why noise is its enemy',
  '🔴 Say which control action each of the three process types requires',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A proportional-only controller with a gain of 2 sees its input step by 5 per cent. What happens to the output?',
    options: [
      'It steps immediately by 10 per cent',
      'It steps immediately by 2.5 per cent',
      'It steps by 5 per cent and then decays',
      'It ramps at 10 per cent per minute',
    ],
    correctIndex: 0,
    explanation:
      'Proportional action multiplies the input change by the gain and applies it at once: 5 × 2 = 10 per cent, immediately. It does not ramp — a change that continues over time is integral action, not proportional.',
  },
  {
    id: 2,
    question: 'A controller has a gain of 4. What is its proportional band?',
    options: ['400 per cent', '25 per cent', '4 per cent', '40 per cent'],
    correctIndex: 1,
    explanation:
      'Proportional band is the reciprocal of gain, expressed as a percentage: 1 ÷ 4 = 25 per cent. It answers the question the other way round — how much input change is needed to drive the output across its full range. A narrow band means a high gain.',
  },
  {
    id: 3,
    question:
      '🔴 Why does a proportional-only controller leave a standing offset when the load changes?',
    options: [
      'Because proportional action responds too slowly',
      'Because the gain is set too low',
      'Because its output is bias plus gain times error, so producing any output other than the bias requires an error to exist',
      'Because the transmitter drifts',
    ],
    correctIndex: 2,
    explanation:
      'At zero error the proportional term contributes nothing, so the output is simply the bias. If the load demands a different output from the bias, the only way the controller can produce it is by carrying a permanent error. The offset is structural — it is how proportional action works, not a fault.',
  },
  {
    id: 4,
    question:
      'A reverse-acting P-only controller has a bias of 50 per cent and gain of 2. A load change means 60 per cent output is now needed to hold setpoint. What offset results?',
    options: [
      '10 per cent of span below setpoint',
      '2.5 per cent of span below setpoint',
      'No offset — the controller will reach setpoint',
      '5 per cent of span below setpoint',
    ],
    correctIndex: 3,
    explanation:
      'The output is 50 − (2 × error). To reach 60 the proportional term must contribute +10, so the error must be −5 per cent of span. The process settles 5 per cent below setpoint and stays there. Doubling the gain to 4 would halve the offset to 2.5 per cent.',
  },
  {
    id: 5,
    question: 'How does integral action eliminate an offset that proportional action cannot?',
    options: [
      'By continuing to move the output for as long as any error exists, so it can hold a non-zero output once the error reaches zero',
      'By resetting the setpoint to match the process variable',
      'By filtering the error signal',
      'By increasing the gain automatically',
    ],
    correctIndex: 0,
    explanation:
      'Integral action ramps the output at a rate set by the size of the error. While an error remains it keeps moving; when the error reaches zero it stops and holds whatever it has accumulated. That accumulated value is an output at zero error — exactly what proportional action cannot produce.',
  },
  {
    id: 6,
    question:
      'An integral-only controller set to 3 repeats per minute sees a steady 5 per cent error. How fast does its output move?',
    options: [
      'It steps by 15 per cent and holds',
      '15 per cent per minute',
      '5 per cent per minute',
      '1.67 per cent per minute',
    ],
    correctIndex: 1,
    explanation:
      'Integral action sets a rate rather than a position: 3 repeats per minute × 5 per cent error = 15 per cent per minute. Expressed the other way round, 3 repeats per minute is an integral time of about 0.33 minutes per repeat — the same setting in reciprocal units.',
  },
  {
    id: 7,
    question: 'What does derivative action respond to?',
    options: [
      'The size of the error',
      'How long the error has persisted',
      'The rate at which the input is changing',
      'The difference between setpoint and bias',
    ],
    correctIndex: 2,
    explanation:
      'Derivative responds to speed, not position. A process variable moving quickly produces a large derivative contribution even if the error is currently small — which is what lets it act against an overshoot before the overshoot happens.',
  },
  {
    id: 8,
    question: '🔴 Why is derivative action often left at zero on real loops?',
    options: [
      'Because it cannot be used with integral action',
      'Because it only works on temperature loops',
      'Because it makes the loop slower',
      'Because it dramatically amplifies noise in the process variable, causing the output to jump about',
    ],
    correctIndex: 3,
    explanation:
      'Derivative acts on rate of change, and noise is change — fast, constant and meaningless. A noisy signal produces large, rapidly reversing derivative contributions, so the output chatters and the final control element wears. On a noisy measurement, derivative does more harm than good.',
  },
  {
    id: 9,
    question: '🔴 Which control action does a self-regulating process absolutely require, and why?',
    options: [
      'Integral, because only integral action can produce a different output once the error returns to zero',
      'Proportional only, because it settles naturally',
      'None — it self-regulates',
      'Derivative, to prevent it running away',
    ],
    correctIndex: 0,
    explanation:
      'A self-regulating process settles at a new value after a load change, which is exactly the situation that leaves proportional-only control with a standing offset. Removing that offset requires an output that persists at zero error, and integral is the only term that can provide one.',
  },
];

const InstrumentationModule5Section3 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 3"
        title="PID basics"
        backTo="/electrician/upskilling/instrumentation-module-5"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Three ways of turning an error into an output — and each one is asking a different
          question about time.
        </p>

        <TLDR
          points={[
            'P asks how big the error is now. I asks how long it has been there. D asks how fast it is changing.',
            '🔴 Proportional output is bias plus gain times error — so at zero error the output IS the bias, and nothing else.',
            '🔴 That is why P alone leaves an offset: producing any output other than the bias requires a permanent error to exist.',
            'Integral ramps the output while any error remains, then holds what it accumulated. That is an output at zero error, which is exactly what removes offset.',
            'Derivative responds to speed rather than size, so it can push back against an overshoot before it happens.',
            '🔴 Derivative dramatically amplifies noise, which is why it is so often left at zero on real loops.',
            '🔴 Self-regulating processes require integral. Integrating processes work best with proportional alone. Runaway processes require derivative.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>Three questions about time</ContentEyebrow>

        <ConceptBlock
          title="What the three terms are actually asking"
          plainEnglish="They all look at the same error. They differ in whether they care about its size, its history, or its speed."
          onSite="If you can say which question a term is answering, you can predict what it will do. That is more use than remembering a definition."
        >
          <p>
            Section 1 established that a feedback controller works from the error between the
            process variable and the setpoint. PID is simply three different ways of turning that
            error into an output, and they are usually added together.
          </p>
          <p>
            What makes them make sense is that each one is interrogating a different aspect of time:
          </p>
          <AppendixTable
            caption="What each term looks at"
            headers={['Term', 'The question it asks', 'What it contributes']}
            rows={[
              [
                'Proportional (P)',
                'How large is the error at this instant?',
                'An immediate correction sized in proportion to the error',
              ],
              [
                'Integral (I)',
                'How much error has there been, and for how long?',
                'A correction that keeps growing while any error remains',
              ],
              [
                'Derivative (D)',
                'How fast is the measurement moving?',
                'A correction opposing rapid change — a brake',
              ],
            ]}
            notes="Present, past and future respectively. Each answers something the other two cannot."
          />
          <p>
            Notice that only one of them cares about the error being <em>large</em>. Integral will
            act vigorously on a small error that has persisted, and derivative will act on a fast
            movement even while the error is still small. That is why the three combined behave
            differently from any of them alone, and why a loop can be sluggish in one respect and
            twitchy in another.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Proportional</ContentEyebrow>

        <ConceptBlock
          title="An immediate correction, sized by the error"
          plainEnglish="Multiply the error by a number and that is your correction. Bigger error, bigger correction, straight away."
          onSite="Gain is the most consequential single setting on most loops, and the first one people reach for."
        >
          <p>
            Proportional action &mdash; also called <strong>gain</strong> or sensitivity &mdash;
            takes whatever the input does and reproduces it at the output, at once and scaled by a
            fixed factor. That factor is what the setting names:
          </p>
          <p>
            <strong>gain = &Delta;output &divide; &Delta;input</strong>
          </p>
          <p>
            So a proportional-only controller with a gain of 2, whose process variable suddenly
            steps by 5 per cent, produces an output step of <strong>10 per cent</strong> the moment
            the input moves. Whether that step is up or down depends on the direction of action from
            Section 2.
          </p>
          <p>
            Two properties matter. It is <strong>immediate</strong> &mdash; there is no delay and no
            ramp; and it is <strong>proportional</strong> &mdash; double the error and you double
            the correction.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Gain and proportional band are the same setting"
          plainEnglish="One says how much output you get per unit of error. The other says how much error it takes to swing the output across its whole range. They are reciprocals."
          onSite="Older equipment is often calibrated in proportional band. Converting is a matter of dividing 100 by the number."
        >
          <p>
            <strong>Proportional band</strong> is a legacy term for the same idea expressed the
            other way round: the amount of input change needed to produce a full-scale, 100 per cent
            change in output. It is always expressed as a percentage.
          </p>
          <p>
            <strong>proportional band = 100 &divide; gain</strong> (and gain = 100 &divide; band)
          </p>
          <AppendixTable
            caption="The same setting in two units"
            headers={['Gain', 'Proportional band', 'Character']}
            rows={[
              ['0.5', '200%', 'Very gentle — a large error produces a small correction'],
              ['1', '100%', 'Full-scale error gives full-scale output'],
              ['2', '50%', 'Moderate'],
              ['4', '25%', 'Aggressive'],
              ['10', '10%', 'Very aggressive — a small error produces a large correction'],
            ]}
            notes="A narrow band is a high gain. That inversion catches people out when moving between old and new equipment."
          />
          <p>
            The trap is the direction of the words. &ldquo;Increasing the proportional band&rdquo;{' '}
            <em>reduces</em> the aggressiveness of the loop, because it is the reciprocal. Somebody
            asked to make a loop calmer who increases the gain instead of the band will achieve
            exactly the opposite of what was intended.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-3-band"
          question="A loop is hunting and a colleague says to widen the proportional band from 25 per cent to 50 per cent. What have they asked for?"
          options={[
            'A gentler loop — the gain falls from 4 to 2',
            'A more aggressive loop — the gain rises from 4 to 2',
            'No change in aggressiveness, only in units',
            'A gain of 50',
          ]}
          correctIndex={0}
          explanation="Band and gain are reciprocals: 100 ÷ 25 = 4, and 100 ÷ 50 = 2. Widening the band halves the gain, so the loop responds half as hard to the same error — which is the right direction for hunting. Reading it as 'bigger number, more action' gets it backwards."
        />

        <SectionRule />
        <ContentEyebrow>🔴 Why proportional alone is not enough</ContentEyebrow>

        <ConceptBlock
          title="The offset is built into the arithmetic"
          plainEnglish="At zero error, proportional action contributes nothing. So the output falls back to whatever fixed value it was given — and that is rarely the value the process needs."
          onSite="A P-only loop sitting a few per cent off setpoint is not badly tuned. It is doing the only thing it can."
        >
          <p>
            A proportional-only controller&rsquo;s output is the sum of two things: a fixed{' '}
            <strong>bias</strong> &mdash; the output it produces when the error is zero &mdash; and
            the proportional contribution.
          </p>
          <p>
            <strong>output = bias + (gain &times; error)</strong>
          </p>
          <p>
            Read what that says when the error is zero.{' '}
            <strong>
              The proportional term contributes nothing, so the output is exactly the bias and
              nothing else.
            </strong>
          </p>
          <p>
            Now recall from Section 2 that holding a process at setpoint normally requires a
            specific, non-zero output, and that the required value <em>changes with load</em>. A
            heat exchanger needs more steam when the incoming feed is colder. That is what a load
            is: anything the controller does not control which nevertheless affects the variable it
            is trying to hold.
          </p>
          <p>
            Put those two facts together and the conclusion is unavoidable.{' '}
            <strong>
              For the controller to produce any output other than its bias, an error must exist.
            </strong>{' '}
            If the load requires an output different from the bias &mdash; which it almost always
            does &mdash; the loop settles at a permanent, standing error.
          </p>
          <p>
            That is <strong>proportional-only offset</strong>, and the important thing about it is
            that it is not a defect. It is not poor tuning, a faulty transmitter or a badly chosen
            setpoint. It is what proportional action <em>is</em>.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Working the offset out"
          plainEnglish="Given the bias, the gain and the output the process actually needs, the offset is a single line of arithmetic."
          onSite="Worth doing once. After that you can predict roughly how far off a P-only loop will sit."
        >
          <p>
            Take a reverse-acting temperature loop with a bias of 50 per cent and a gain of 2. Under
            nominal conditions, 50 per cent steam holds the outlet at setpoint, so the loop sits
            exactly on setpoint with no error. So far so good.
          </p>
          <p>
            Now the incoming feed gets colder, and holding the same outlet temperature would require{' '}
            <strong>60 per cent</strong> steam. The controller can only get there via its
            proportional term, which must therefore contribute 10 per cent. With a gain of 2, that
            requires an error of 5 per cent of span.
          </p>
          <p>
            So the process settles <strong>5 per cent of span below setpoint</strong>, and stays
            there indefinitely. The controller is not failing; it is producing exactly the output
            the arithmetic allows.
          </p>
          <p>Run the same case at different gains and a familiar trade-off appears:</p>
          <AppendixTable
            caption="Offset against gain — bias 50%, load requiring 60% output"
            headers={['Gain', 'Proportional band', 'Resulting offset']}
            rows={[
              ['1', '100%', '10% of span'],
              ['2', '50%', '5% of span'],
              ['4', '25%', '2.5% of span'],
              ['8', '12.5%', '1.25% of span'],
            ]}
            notes="Each doubling of gain halves the offset — and never reaches zero, because zero offset would require infinite gain."
          />
          <p>
            This is where the temptation comes from, and where it runs out.{' '}
            <strong>Raising the gain does genuinely reduce the offset</strong>, in exact proportion.
            But it also makes every correction larger, and Section 5 shows that beyond a certain
            point the loop becomes unstable and begins to oscillate.
          </p>
          <p>
            So proportional-only control forces a choice between an offset you can live with and a
            loop that hunts. Neither is satisfactory, and the way out is not a better gain &mdash;
            it is a different kind of control action.
          </p>
        </ConceptBlock>

        <Pullquote>
          Zero offset with proportional action alone would require infinite gain. The offset is not
          a tuning failure — it is arithmetic, and no amount of adjustment removes it.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Integral</ContentEyebrow>

        <ConceptBlock
          title="The term that can hold an output at zero error"
          plainEnglish="Instead of setting a position, it sets a speed. It keeps winding the output along for as long as any error remains, and stops where it got to."
          onSite="Almost every loop you meet has integral action. It is what lets a loop actually reach setpoint."
        >
          <p>
            Integral action &mdash; also called <strong>reset</strong> &mdash; keeps the output
            moving, and how quickly it moves is set by how big the error is. It commands a{' '}
            <strong>velocity</strong> rather than a position:
          </p>
          <p>
            <strong>rate of output change = integral setting &times; error</strong>
          </p>
          <p>
            An integral setting of 3 repeats per minute, with a steady 5 per cent error, moves the
            output at <strong>15 per cent per minute</strong>. Double the error and it moves twice
            as fast. Remove the error and it stops.
          </p>
          <p>
            That last clause is the whole point, and it is worth being precise about.{' '}
            <strong>
              When the error reaches zero, integral action stops moving the output &mdash; but it
              does not give back what it has already accumulated.
            </strong>{' '}
            The output stays where integral action drove it.
          </p>
          <p>
            Which is exactly the thing proportional action could not do. The controller now has a
            way of producing an output that is not the bias, while the error is zero. The offset
            from the previous block is eliminated, and it is eliminated automatically for whatever
            the load happens to be.
          </p>
          <p>
            Notice the division of labour that results.{' '}
            <strong>
              Proportional action provides the immediate response to an error; integral action
              provides the patience to finish the job.
            </strong>{' '}
            P gets you most of the way quickly; I closes the last gap and holds it closed.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Repeats per minute, and minutes per repeat"
          plainEnglish="The same setting is expressed in two reciprocal units, and they run in opposite directions. Check which one you are looking at."
          onSite="This causes real mistakes. Doubling the number makes a loop faster in one unit and slower in the other."
        >
          <p>Integral action is expressed either way round, depending on the equipment:</p>
          <ul>
            <li>
              <strong>Repeats per minute</strong> &mdash; how many times per minute the integral
              action repeats the proportional contribution. A <em>larger</em> number means faster
              integral action.
            </li>
            <li>
              <strong>Minutes per repeat</strong> &mdash; the integral time constant. A{' '}
              <em>larger</em> number means <em>slower</em> integral action.
            </li>
          </ul>
          <p>
            Three repeats per minute is the same setting as roughly 0.33 minutes per repeat. They
            are reciprocals, exactly as gain and proportional band are.
          </p>
          <p>
            🔴 This is the second reciprocal pair on the page, and between them they account for a
            good share of tuning changes that go the wrong way.{' '}
            <strong>
              Before changing any tuning setting, confirm which unit the controller is using and
              which direction increases the action.
            </strong>{' '}
            The number alone does not tell you.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="🔴 Integral windup — the correction that has nowhere to go"
          whatHappens={
            <>
              <p>
                A loop cannot reach setpoint &mdash; a valve is at its limit, the plant is shut
                down, a supply has failed, or a manual valve upstream is closed. The error persists,
                and integral action does what it always does: it keeps ramping the output.
              </p>
              <p>
                The output is already at its maximum, so nothing changes outside the controller. But
                the accumulated integral value keeps growing internally, sometimes for a very long
                time. The controller is winding up a correction it has no way to deliver.
              </p>
              <p>
                Then the obstruction clears. The process finally responds and reaches setpoint
                &mdash; and the controller does not back off, because it has to unwind all that
                accumulated integral before its output starts to come down. The process sails past
                setpoint and keeps going, sometimes dramatically.
              </p>
              <p>
                The signature is a severe overshoot that follows a startup, a return from shutdown
                or the clearing of a restriction &mdash; on a loop that behaves perfectly in normal
                running.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Most controllers include a means of limiting integral accumulation when the output
                is at a limit, and where such a facility exists it should be configured rather than
                left at a default. Section 2&rsquo;s point about output limits is the connection: a
                loop that sits at a limit is a loop that can wind up.
              </p>
              <p>
                Placing the controller in manual also stops the accumulation, and on a plant where
                the conditions leading to windup are known &mdash; typically shutdown and startup
                &mdash; that is a legitimate operational practice rather than an admission of
                defeat.
              </p>
              <p>
                And recognise it for what it is when diagnosing. A large overshoot on startup with
                good control thereafter is a windup signature, and retuning the loop for normal
                running will not address it &mdash; it will only make normal running worse.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Derivative</ContentEyebrow>

        <ConceptBlock
          title="Acting on speed rather than size"
          plainEnglish="If the measurement is moving quickly, push back — even if it has not gone far yet. It is a brake proportional to how fast things are changing."
          onSite="Powerful on slow processes with long lags. Useless or harmful on anything noisy."
        >
          <p>
            Derivative action &mdash; also called <strong>rate</strong> &mdash; offsets the output
            by an amount proportional to how fast the input is changing:
          </p>
          <p>
            <strong>output offset = derivative time &times; rate of input change</strong>
          </p>
          <p>
            With a derivative time of 4 minutes and a process variable ramping at 5 per cent per
            minute, derivative contributes an immediate output offset of{' '}
            <strong>20 per cent</strong>. In most controllers the derivative response is also
            multiplied by the proportional gain, so with a gain of 2 the same conditions give 40 per
            cent.
          </p>
          <p>
            The distinctive property is that{' '}
            <strong>derivative responds even when the error is currently small</strong>, provided
            things are moving quickly. A process variable racing towards setpoint from below is
            still in error, but derivative is already pushing back &mdash; because at that speed it
            is going to overshoot.
          </p>
          <p>
            That is the value: derivative acts against a deviation that has not happened yet, which
            is the closest a feedback controller gets to the anticipation that Section 1 said
            feedback structurally lacks. On a process with substantial lag, where by the time an
            error is large it is far too late, that anticipation is worth a great deal.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Why derivative is so often set to zero"
          plainEnglish="Noise is change. Derivative responds to change. So derivative responds enthusiastically to noise, and produces an output that jumps about for no reason."
          onSite="Look at the process variable trend before adding derivative. If it is visibly noisy, do not."
        >
          <p>
            Derivative has one serious weakness, and it disqualifies it from a large proportion of
            real loops.
          </p>
          <p>
            <strong>Derivative action dramatically amplifies noise.</strong> Noise is, by
            definition, rapid change &mdash; small in amplitude but very fast, and constantly
            reversing direction. Derivative responds to rate of change, so a small, fast wobble
            produces a large derivative contribution, and a wobble in the other direction produces a
            large contribution the other way.
          </p>
          <p>
            The result is an output that jumps about continuously in response to a process variable
            that is not really doing anything. On a fast loop it causes genuine oscillation. Even
            where it does not, the final control element is being worked constantly for no benefit,
            which is real mechanical wear.
          </p>
          <p>
            So the practical position is this:{' '}
            <strong>
              derivative is worth having on slow, clean, heavily lagged measurements, and is worse
              than useless on fast or noisy ones
            </strong>
            . Flow measurements are usually noisy and rarely get derivative. Large thermal processes
            are slow and clean, and benefit from it.
          </p>
          <p>
            It is worth having the complete picture, because the three terms treat noise quite
            differently and the reason is the same in each case &mdash;{' '}
            <strong>how each one&rsquo;s response changes with frequency</strong>, and noise is
            simply content at a much higher frequency than the process.
          </p>
          <ul>
            <li>
              <strong>Proportional</strong> responds identically at any frequency, so it passes
              noise straight through, scaled by the gain.
            </li>
            <li>
              <strong>Integral</strong> responds less as frequency rises, so noise largely cancels
              itself out in the accumulation. 🔴{' '}
              <strong>Integral action is uniquely able to ignore process noise</strong>, which makes
              it the term you can lean on when the measurement is poor.
            </li>
            <li>
              <strong>Derivative</strong> responds more as frequency rises, which is precisely why
              noise dominates its contribution.
            </li>
          </ul>
          <p>
            That single property &mdash; how each term responds to frequency &mdash; does more work
            later. Section 4 uses it to tell which term is causing an oscillation, and Section 5
            uses it to choose terms for a noisy measurement.
          </p>
          <p>
            Note that this is a reason to look at the signal, not merely to follow a convention.
            Module 3 Section 5 covered where noise comes from and Module 4 Section 4 gave a way to
            measure it with an ordinary meter. If a measurement is noisy for a reason that can be
            fixed, fixing it is better than avoiding derivative &mdash; and Module 3 Section
            3&rsquo;s warning applies too: damping the noise away to permit derivative action simply
            moves the problem.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-3-derivative"
          question="A flow loop with a visibly noisy process variable has derivative action added to reduce overshoot. What is the likely result?"
          options={[
            'The integral action stops working',
            'The output becomes erratic, because derivative amplifies the noise far more than it damps the overshoot',
            'Reduced overshoot with no side effects',
            'The loop becomes slower but more stable',
          ]}
          correctIndex={1}
          explanation="Flow signals are noisy, and noise is exactly what derivative responds to most strongly. The derivative contribution from the noise will typically swamp the contribution from the genuine process movement, so the output chatters and the valve is worked constantly. Overshoot on a flow loop is addressed through gain and integral, not derivative."
        />

        <SectionRule />
        <ContentEyebrow>🔴 Which process needs which</ContentEyebrow>

        <ConceptBlock
          title="Section 1’s three process types decide the answer"
          plainEnglish="The classification is not academic. It tells you which terms a loop genuinely needs before you touch a single setting."
          onSite="Establish the process type first. It converts tuning from trial and error into a decision with a reason behind it."
        >
          <p>
            Section 1 classified processes as self-regulating, integrating or runaway, and promised
            the classification would pay off here. This is the payoff.
          </p>
          <AppendixTable
            caption="What each process type requires"
            headers={['Process type', 'Behaviour', 'Control action required']}
            rows={[
              [
                'Self-regulating',
                'Settles at a new value after a change',
                '🔴 Absolutely requires integral — only integral can hold an output at zero error',
              ],
              [
                'Integrating',
                'Ramps in response to an imbalance',
                'Ideally proportional alone; integral guarantees overshoot',
              ],
              [
                'Runaway',
                'Departs at an accelerating rate',
                '🔴 Cannot be controlled by P or I alone — always requires derivative for stability',
              ],
            ]}
            notes="Integrating processes still need some integral action to handle load changes — just less of it, and it comes at a known cost."
          />
          <p>
            Read the first row against the offset argument earlier and it explains itself. A
            self-regulating process settles at a new value after a load change, which is precisely
            the condition that leaves proportional-only control with a standing offset. Removing
            that offset needs an output which persists at zero error, and integral is the only term
            that provides one. Hence <em>absolutely requires</em>.
          </p>
          <p>
            The second row is the one that surprises people, because integral is normally the thing
            that makes a loop reach setpoint.{' '}
            <strong>On a purely integrating process, integral action guarantees overshoot</strong>{' '}
            &mdash; the process is already integrating, and adding a second integration means the
            output keeps pushing after the process variable has arrived. Level loops are the common
            example, and they are frequently tuned with high proportional action and very little
            integral for exactly this reason.
          </p>
          <p>
            The third row is why derivative exists at all. On a process that accelerates away, by
            the time the error is large enough for proportional action to respond usefully the
            situation is beyond recovery. Only a term that responds to <em>speed</em> can act early
            enough.
          </p>
        </ConceptBlock>

        <Scenario
          title="A level loop that overshoots every time, and a temperature loop that never quite arrives"
          situation={
            <>
              <p>
                Two loops are reported on the same shift. A tank level loop overshoots its setpoint
                on every change and takes several cycles to settle. A heat exchanger outlet
                temperature loop is stable and steady but sits consistently about 4 &deg;C below
                setpoint, and has done for months &mdash; operators compensate by setting the
                setpoint high.
              </p>
              <p>
                Both loops have been retuned more than once. Both are described as needing
                &ldquo;more tuning&rdquo;.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                These are opposite faults and neither is really a tuning problem in the sense
                intended. Classify each process first.
              </p>
              <p>
                <strong>The level loop is an integrating process.</strong> It ramps in response to
                any imbalance between inflow and outflow, so it is already performing an
                integration. Adding integral action means the controller keeps driving after the
                level has arrived, which is precisely the overshoot being described. The likely
                answer is to reduce or remove the integral action and lean on proportional, which is
                the reverse of what &ldquo;it needs tuning&rdquo; usually leads people to do.
              </p>
              <p>
                <strong>
                  The temperature loop is self-regulating and looks like proportional-only control.
                </strong>{' '}
                A steady, persistent offset that does not decay is the signature of a loop with no
                integral action, or with integral action so slow as to be ineffective. Check whether
                integral is configured at all before adjusting anything else.
              </p>
              <p>
                The operators&rsquo; workaround is worth noting too. Biasing the setpoint to
                compensate for an offset works, and it silently converts a control problem into a
                permanently wrong setpoint that somebody will eventually correct without knowing why
                it was there.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Both loops would absorb any amount of trial-and-error tuning. What resolves them is
                asking what kind of process each one is, and therefore which terms it should have
                &mdash; a two-minute question that turns tuning into a decision instead of a search.
              </p>
              <p>
                It also shows why the offset argument earlier in this section matters practically. A
                loop sitting steadily off setpoint is not a badly tuned loop. It is very often a
                loop missing the one term that could ever fix it.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'Do all three terms have to be used?',
              answer:
                'No, and most loops do not use all three. PI — proportional plus integral — is by far the most common combination in industry, because it gives a prompt response and eliminates offset without inviting the noise problems derivative brings. P alone is used where an offset is acceptable or where the process is integrating. PID in full is reserved for slow, clean processes where the anticipation is worth having.',
            },
            {
              question: 'Where does the bias value come from?',
              answer:
                'On a proportional-only controller it is a setting — the output produced at zero error, sometimes called manual reset, because an operator would adjust it by hand to remove an offset after a load change. That is exactly the human intervention integral action automates. On a controller with integral action the bias is effectively maintained automatically, which is why the term is rarely encountered on modern loops.',
            },
            {
              question: 'Is a higher gain always more responsive?',
              answer:
                'More responsive to a given error, yes, and that is not the same as better control. Higher gain means larger corrections, which means a greater tendency to overshoot and, past a point, sustained oscillation. It also amplifies noise into the output. Section 5 covers where the limit sits and how to find it, and the short version is that the best gain is the largest one the loop remains comfortably stable with.',
            },
            {
              question: 'Why is integral action called reset?',
              answer:
                'Because it automates what an operator used to do by hand: resetting the bias to remove an offset after the load changed. The name describes the job it took over rather than the mathematics it uses. Both terms are still in use, and older equipment is more likely to be labelled reset than integral.',
            },
            {
              question: 'Can derivative be used on the error or only on the measurement?',
              answer:
                'Both arrangements exist, and the difference shows up on a setpoint change. Derivative acting on the error responds to a step in setpoint as an infinitely fast change and produces a large momentary output kick. Derivative acting on the measurement alone ignores setpoint changes entirely and responds only to the process moving. The second is generally preferred for that reason, and it is worth knowing which one a controller uses before changing a setpoint on a loop with derivative action.',
            },
            {
              question: 'What actually happens if the gain is set to zero?',
              answer:
                'On most controllers, proportional action stops and — because integral and derivative responses are typically multiplied by the gain — those stop having any effect too. The loop does nothing. It is worth knowing because a gain accidentally left at zero produces a loop that appears to be in automatic and behaves exactly as though it were in manual, which is a confusing fault to chase.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'P asks how big the error is now, I asks how long it has persisted, D asks how fast it is changing. Present, past, future.',
            'Proportional acts immediately and in proportion: a gain of 2 turns a 5 per cent input step into a 10 per cent output step.',
            'Proportional band is 100 ÷ gain. A narrow band is a high gain, and widening the band makes a loop gentler.',
            '🔴 A proportional output is bias + (gain × error), so at zero error the output is the bias and nothing else.',
            '🔴 Therefore P alone leaves an offset: any output other than the bias requires a permanent standing error.',
            'Offset halves each time the gain doubles and never reaches zero — that would need infinite gain.',
            'Raising gain to reduce offset trades one problem for another, because high gain leads to oscillation.',
            'Integral sets a rate, not a position: 3 repeats per minute on a 5 per cent error moves the output at 15 per cent per minute.',
            'Integral stops when the error reaches zero but keeps what it accumulated — an output at zero error, which is what removes offset.',
            '🔴 Repeats per minute and minutes per repeat are reciprocals running in opposite directions. Confirm the unit before changing anything.',
            '🔴 Windup: a controller stuck at an output limit keeps accumulating an error it cannot correct, then overshoots badly when released.',
            'Derivative responds to speed rather than size, so it can oppose an overshoot before it happens.',
            '🔴 Each term treats noise according to how it responds to frequency: proportional passes it, integral ignores it, derivative amplifies it.',
            '🔴 So derivative belongs on slow, clean measurements and not on flow or anything visibly noisy — and integral is the term to lean on when a measurement is poor.',
            '🔴 Self-regulating processes absolutely require integral. Integrating processes are ideally proportional-only. Runaway processes always require derivative.',
            'PI is by far the most common combination in practice — prompt response, no offset, and none of derivative’s noise problems.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 5.3" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Components of a loop
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Common loop faults
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule5Section3;
