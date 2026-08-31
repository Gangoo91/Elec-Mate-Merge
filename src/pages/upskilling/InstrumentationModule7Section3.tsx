/**
 * Module 7 · Section 3 — Loop design and load calculations
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING. Module 3 Section 2 established the voltage budget IN
 * PRINCIPLE — 24 V supply, 250 Ω dropping 5 V at 20 mA, ~19 V left at the
 * transmitter. This page turns that into ARITHMETIC you can actually design
 * with, which M3.2 explicitly deferred ("Module 7 works the sums").
 *
 * 🔴 THE COUNTER-INTUITIVE FINDING, and it is the reason this page is worth
 * writing: CABLE RESISTANCE IS ALMOST IRRELEVANT. Derived below —
 *   1.5 mm² copper ≈ 11.5 Ω/km per conductor (ρ/A, ρ = 1.72e-8 Ω·m)
 *   500 m run = 1000 m of conductor = ~11.5 Ω = 0.23 V at 20 mA
 * versus a single extra 250 Ω receiver = 5 V. So ONE ADDED DEVICE COSTS MORE
 * THAN A KILOMETRE OF CABLE. That directly answers "how long can the cable be?"
 * — the honest answer is that length is rarely what limits you.
 *
 * 🔴 THE TRAP, verified from source: an indicator containing its OWN 250 Ω
 * resistor takes the loop to 500 Ω, dropping 10 V at 20 mA. A transmitter
 * needing (say) 10.5 V minimum then has too little — BUT ONLY AT HIGH CURRENT.
 * At 4 mA the same loop drops just 2 V. So it works at low readings and
 * saturates at high ones, which is exactly Module 3 Section 1's saturation
 * signature and Module 3 Section 2's scenario arriving as design arithmetic.
 *
 * 🔴 HART: total loop resistance must fall between 250 Ω and 1100 Ω. The
 * classic failure is a bench setup with a lab supply and NO resistor at all —
 * below the range, so HART will not communicate even though the 4-20 mA works.
 *
 * ⚠️ ACCURACY: the 10.5 V minimum is quoted in the source for one specific
 * named transmitter. Do NOT present it as a universal figure — teach that the
 * number comes from the data sheet and use it only as an illustrative example.
 * Cable resistance is DERIVED from resistivity here, not taken from a table we
 * do not hold; real cables run slightly higher (stranding, temperature).
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §13.5 (the loop-powered power budget), §13.7 (the indicator-with-its-own-
 * resistor case, 500 Ω total, 10 V dropped, and that it operates fine at lower
 * currents) and §15.x HART (total loop resistance 250-1100 Ω, and the bench
 * setup with no resistor). Extracted to scratchpad/src/m6_loopcal.txt and
 * m3s2_ranges.txt. Held in ~/Desktop/hav/instrumentation.
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

const TITLE = 'Loop design and load calculations | Instrumentation Module 7.3 | Elec-Mate';
const DESCRIPTION =
  'The voltage budget worked as arithmetic — why one extra receiver costs more than a kilometre of cable, why a loop can work at 4 mA and fail at 20 mA, and the resistance window HART needs.';

const outcomes = [
  'Write the loop voltage budget as an inequality and use it',
  'Calculate the maximum total loop resistance a supply and transmitter allow',
  '🔴 Show that cable resistance is usually a minor term compared with devices',
  'Calculate the resistance of a cable run from its cross-sectional area',
  '🔴 Explain why a loop can work perfectly at 4 mA and saturate at 20 mA',
  'Recognise that adding a receiver with its own resistor adds 250 Ω to the loop',
  'State the total loop resistance window HART requires',
  'Say why a bench setup with no resistor breaks HART but not the 4–20 mA signal',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 24 V supply feeds a transmitter needing at least 12 V at its terminals. What is the maximum total loop resistance?',
    options: ['600 Ω', '1200 Ω', '250 Ω', '480 Ω'],
    correctIndex: 0,
    explanation:
      'The loop may drop 24 − 12 = 12 V, and the worst case is full-scale current. 12 V ÷ 0.020 A = 600 Ω. Every resistance in the loop — conversion resistors, isolators, indicators and the cable — has to fit inside that.',
  },
  {
    id: 2,
    question: '🔴 Roughly how much voltage does 500 m of 1.5 mm² cable drop at 20 mA?',
    options: ['About 12 V', 'About 0.23 V', 'About 2.3 V', 'About 5 V'],
    correctIndex: 1,
    explanation:
      'A 500 m run is 1000 m of conductor. At roughly 11.5 Ω per kilometre that is about 11.5 Ω, and 11.5 × 0.020 ≈ 0.23 V. Cable is almost always a minor term — the devices in the loop dominate it completely.',
  },
  {
    id: 3,
    question:
      '🔴 Which costs the loop more voltage — a kilometre of cable, or one added indicator with its own 250 Ω resistor?',
    options: [
      'Neither is significant',
      'The cable, by a wide margin',
      'The indicator — about 5 V against roughly half a volt for the cable',
      'They are comparable',
    ],
    correctIndex: 2,
    explanation:
      'One extra 250 Ω receiver drops 5 V at full scale. A kilometre of 1.5 mm² drops around half a volt. That is why "how long can the cable be?" is usually the wrong question — what fills a loop budget is devices, not distance.',
  },
  {
    id: 4,
    question:
      'An indicator with its own 250 Ω resistor is added to a loop that already has one. What is the total resistance, ignoring cable?',
    options: ['125 Ω', '1000 Ω', '250 Ω', '500 Ω'],
    correctIndex: 3,
    explanation:
      'They are in series, so the resistances add: 250 + 250 = 500 Ω. At 20 mA that drops 10 V, which comes straight out of the voltage available to the transmitter.',
  },
  {
    id: 5,
    question:
      '🔴 That 500 Ω loop runs from 24 V. Why might it work perfectly at low readings and fail at high ones?',
    options: [
      'At 4 mA the loop drops only 2 V, but at 20 mA it drops 10 V — so the transmitter may run out of terminal voltage only near full scale',
      'The cable heats up at higher current',
      'The indicator switches off at high current',
      'The transmitter is faulty at high current',
    ],
    correctIndex: 0,
    explanation:
      'Voltage dropped across the loop is proportional to current, so the budget is tightest at full scale. A loop can therefore be entirely healthy across most of its range and saturate at the top — which is Module 3 Section 1’s point that a current loop fails visibly rather than quietly.',
  },
  {
    id: 6,
    question: 'What total loop resistance does HART communication require?',
    options: ['Below 250 Ω', 'Between 250 Ω and 1100 Ω', 'Above 1100 Ω', 'Exactly 250 Ω'],
    correctIndex: 1,
    explanation:
      'It needs a window rather than a maximum. Most loops with a single 250 Ω conversion resistor sit just above the lower limit and work well, and even two 250 Ω resistors stay inside the range.',
  },
  {
    id: 7,
    question:
      '🔴 A HART transmitter is set up on a bench with a lab power supply and no resistor anywhere. The 4–20 mA works but HART will not communicate. Why?',
    options: [
      'HART requires a separate cable',
      'The transmitter is faulty',
      'Total loop resistance is below the 250 Ω minimum HART needs',
      'The supply voltage is too high',
    ],
    correctIndex: 2,
    explanation:
      'This is the classic bench mistake. The current regulation works fine with no resistance in the loop, so the analogue signal is unaffected — but HART needs a minimum loop resistance to develop its signal, and a bare supply provides none.',
  },
  {
    id: 8,
    question: 'Where does a transmitter’s minimum terminal voltage figure come from?',
    options: [
      'It is calculated from the supply voltage',
      'It is fixed at 12 V by the 4–20 mA standard',
      'It is always 10.5 V',
      'The device’s own data sheet — it varies between models',
    ],
    correctIndex: 3,
    explanation:
      'It is a property of the particular transmitter and differs between models, so it is looked up rather than assumed. Designing a loop around a remembered figure rather than the actual one is how a marginal loop gets built.',
  },
];

const InstrumentationModule7Section3 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 3"
        title="Loop design and load"
        backTo="/electrician/upskilling/instrumentation-module-7"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Module 3 gave the voltage budget in principle. This is the arithmetic — and the answer to
          &ldquo;how long can the cable be?&rdquo; is not what most people expect.
        </p>

        <TLDR
          points={[
            'The budget is one inequality: supply voltage ≥ transmitter minimum + (current × total loop resistance).',
            'Maximum total loop resistance = (supply − transmitter minimum) ÷ 0.020, because full scale is the worst case.',
            '🔴 Cable resistance is almost always a minor term. 500 m of 1.5 mm² drops about 0.23 V at 20 mA.',
            '🔴 One added receiver with its own 250 Ω resistor drops 5 V — more than a kilometre of cable.',
            'So “how long can the cable be?” is usually the wrong question. Devices fill a loop budget, not distance.',
            '🔴 Voltage dropped is proportional to current, so a loop can work at 4 mA and saturate at 20 mA.',
            'HART needs total loop resistance between 250 Ω and 1100 Ω — a window, not a maximum.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>The budget as arithmetic</ContentEyebrow>

        <ConceptBlock
          title="One inequality decides whether a loop works"
          plainEnglish="The supply has to cover what the transmitter needs plus everything the loop takes off it. Full scale is the tight case."
          onSite="Everything else in this section is a way of filling in the terms."
        >
          <p>
            Module 3 Section 2 established the principle: a loop-powered transmitter runs on
            whatever terminal voltage is left after every load in the loop has taken its share.
            Written as an inequality, that is:
          </p>
          <p>
            <strong>
              V<sub>supply</sub> &ge; V<sub>transmitter min</sub> + (I &times; R<sub>total</sub>)
            </strong>
          </p>
          <p>
            Two things about it decide how the arithmetic goes.{' '}
            <strong>
              The current term is the full-scale current, 20 mA, because that is when the loop takes
              the most
            </strong>
            &mdash; the budget only has to survive its worst case. And{' '}
            <strong>
              R<sub>total</sub> is everything
            </strong>
            : every conversion resistor, every isolator, every indicator, plus the cable.
          </p>
          <p>Rearranged, it gives the number you actually design against:</p>
          <p>
            <strong>
              R<sub>max</sub> = (V<sub>supply</sub> &minus; V<sub>transmitter min</sub>) &divide;
              0.020
            </strong>
          </p>
          <AppendixTable
            caption="Maximum total loop resistance for common cases"
            headers={['Supply', 'Transmitter needs', 'Maximum total loop resistance']}
            rows={[
              ['24 V', '10.5 V', '675 Ω'],
              ['24 V', '12 V', '600 Ω'],
              ['24 V', '14 V', '500 Ω'],
              ['30 V', '12 V', '900 Ω'],
            ]}
            notes="The transmitter minimum is a data-sheet figure for that particular model, not a universal number. Look it up rather than remembering one."
          />
          <p>
            That last note matters more than it looks.{' '}
            <strong>Minimum terminal voltage varies between transmitters</strong>, and designing
            around a figure somebody remembered from a different device is one way a marginal loop
            gets built and signed off.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 What actually fills the budget</ContentEyebrow>

        <ConceptBlock
          title="Cable is a smaller term than almost anyone expects"
          plainEnglish="A kilometre of instrument cable costs the loop about half a volt. A single extra device costs it five."
          onSite="This is why the question people ask about loop length is usually the wrong question."
        >
          <p>
            The instinctive worry about a long cable run is voltage drop, and it is worth putting a
            number on it rather than worrying in the abstract.
          </p>
          <p>
            Conductor resistance follows from resistivity and cross-sectional area. For copper, with
            a resistivity of roughly 1.72 &times; 10<sup>&minus;8</sup> &Omega;&middot;m, a 1.5
            mm&sup2; conductor works out at about <strong>11.5 &Omega; per kilometre</strong>. Real
            cable runs a little higher &mdash; stranding and temperature both add &mdash; so treat
            that as a floor rather than a precise figure, and use the manufacturer&rsquo;s number
            where precision matters.
          </p>
          <p>
            The point to notice is that <strong>a loop uses two conductors</strong>, so a 500 metre
            run is a kilometre of copper:
          </p>
          <AppendixTable
            caption="Cable contribution to the loop budget (1.5 mm² copper, at 20 mA)"
            headers={['Run length', 'Conductor length', 'Loop resistance', 'Voltage dropped']}
            rows={[
              ['100 m', '200 m', '≈ 2.3 Ω', '≈ 0.05 V'],
              ['250 m', '500 m', '≈ 5.8 Ω', '≈ 0.12 V'],
              ['500 m', '1000 m', '≈ 11.5 Ω', '≈ 0.23 V'],
              ['1000 m', '2000 m', '≈ 23 Ω', '≈ 0.46 V'],
            ]}
            notes="Derived from resistivity rather than taken from a cable table. Actual figures depend on the specific cable and its temperature."
          />
          <p>
            🔴 Now compare that against one device.{' '}
            <strong>
              A single receiver containing its own 250 &Omega; resistor drops 5 V at full scale.
            </strong>{' '}
            That is more than ten times what a kilometre of cable costs.
          </p>
          <p>
            So the honest answer to &ldquo;how long can the cable be?&rdquo; is that{' '}
            <strong>cable length is rarely what limits a 4&ndash;20 mA loop</strong>. Module 3
            Section 1 gave the reason in principle &mdash; a current is the same at every point in a
            series loop, so cable resistance changes only how much voltage the supply must provide,
            not the value transmitted. This is that argument with numbers on it.
          </p>
          <p>
            What does limit a loop is the count of things in it. Which makes the useful design
            question not &ldquo;how far?&rdquo; but{' '}
            <strong>&ldquo;how many devices, and what does each one take?&rdquo;</strong>
          </p>
        </ConceptBlock>

        <Pullquote>
          One extra indicator costs the loop more voltage than a kilometre of cable. Distance is
          almost never what runs a 4–20 mA budget out.
        </Pullquote>

        <InlineCheck
          id="ins-7-3-cable"
          question="A transmitter is 800 m from the panel. A colleague says the run is too long for 4–20 mA. What is the right response?"
          options={[
            'Work the budget: 800 m of 1.5 mm² contributes roughly 0.4 V at full scale, which is unlikely to be the constraint',
            'Increase the cable size to 4 mm²',
            'Fit a repeater at the halfway point',
            'Agree — 800 m is beyond the practical limit',
          ]}
          correctIndex={0}
          explanation="Around 18 Ω of loop resistance and about 0.4 V at 20 mA. Against a budget of several hundred ohms, that is a small term. The question worth asking is what devices are in the loop — an isolator and a second receiver would each cost far more than the distance does."
        />

        <SectionRule />
        <ContentEyebrow>🔴 The case that catches people</ContentEyebrow>

        <ConceptBlock
          title="Adding an indicator, and what it costs"
          plainEnglish="A device that reads the loop often contains its own 250 ohm resistor. Add it and you have doubled the loop's resistance without touching the cable."
          onSite="Check whether a device you are adding brings a resistor with it. Many do, and it is not always obvious."
        >
          <p>
            Several receivers can share one loop, because &mdash; as Module 3 Section 1 established
            &mdash; a series circuit carries the same current everywhere. Module 3 Section 2 named
            the extra devices that get dropped in this way, an isolator, a display, a second
            receiver, and deferred the sums to this module. This is where they get worked.
          </p>
          <p>
            Consider a working loop: a transmitter, a 24 V supply and a controller input with a 250
            &Omega; conversion resistor. Now a local indicator is added in series so operators can
            read the value at the plant.
          </p>
          <p>
            <strong>That indicator contains its own 250 &Omega; resistor</strong>, because it needs
            to convert the current into a voltage its display circuitry can read &mdash; exactly as
            the controller input does. So the loop now has two.
          </p>
          <ul>
            <li>
              Total resistance: 250 + 250 = <strong>500 &Omega;</strong> (plus cable)
            </li>
            <li>
              At full scale: 500 &times; 0.020 = <strong>10 V dropped</strong>
            </li>
            <li>
              Left at the transmitter: 24 &minus; 10 = <strong>14 V</strong>
            </li>
          </ul>
          <p>
            Whether that works depends entirely on the transmitter&rsquo;s minimum. A device needing
            10.5 V is fine with 14 V. One needing 16 V is not, and the loop has just been broken by
            an addition that looked harmless.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Why it works at 4 mA and fails at 20 mA"
          plainEnglish="The loop takes voltage in proportion to current. At the bottom of the range it takes hardly any, and at the top it takes the lot."
          onSite="A loop that reads perfectly at low values and stops climbing near full scale is this, and it is not a transmitter fault."
        >
          <p>
            The arithmetic above used 20 mA because that is the worst case. Run the same loop at the
            other end of its range and it looks entirely different:
          </p>
          <AppendixTable
            caption="The same 500 Ω loop at different currents (24 V supply)"
            headers={['Loop current', 'Voltage dropped in the loop', 'Left at the transmitter']}
            rows={[
              ['4 mA (0%)', '2.0 V', '22.0 V'],
              ['8 mA (25%)', '4.0 V', '20.0 V'],
              ['12 mA (50%)', '6.0 V', '18.0 V'],
              ['16 mA (75%)', '8.0 V', '16.0 V'],
              ['20 mA (100%)', '10.0 V', '🔴 14.0 V'],
            ]}
            notes="The transmitter has 22 V available at the bottom of the range and 14 V at the top. Only the last row is the design case."
          />
          <p>
            🔴 So a marginal loop{' '}
            <strong>
              behaves perfectly across most of its range and only misbehaves near full scale
            </strong>
            . The transmitter runs out of terminal voltage, cannot regulate any harder, and the
            current stops climbing.
          </p>
          <p>
            That is precisely the signature Module 3 Section 1 described:{' '}
            <strong>
              a current loop does not degrade gracefully &mdash; it saturates below full scale
              rather than reading progressively low
            </strong>
            . Module 3 Section 2&rsquo;s scenario, where a loop tracked the process to about 60 per
            cent and then flattened, is this arithmetic happening on a plant.
          </p>
          <p>
            The diagnostic value is that the shape of the failure names the cause. A reading that
            rises correctly and then stops is a headroom problem, and the fix is in the budget
            &mdash; a higher supply voltage, a lower-burden device, or one fewer thing in the loop.
            Replacing the transmitter will not help, because the transmitter is not faulty.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Where it goes wrong</ContentEyebrow>

        <CommonMistake
          title="Adding a device to a working loop without redoing the sums"
          whatHappens={
            <>
              <p>
                A local indicator, a second recorder or a signal isolator is added to a loop that
                has worked for years. It is a wiring job: break the loop, insert the device in
                series, terminate, close up.
              </p>
              <p>
                The loop is tested and reads correctly &mdash; because it is tested at whatever the
                process happens to be doing, which is rarely full scale. Everything looks fine.
              </p>
              <p>
                🔴 Weeks or months later, the first time the process genuinely reaches the top of
                the range, the reading stops climbing. It is reported as a transmitter fault,
                because the transmitter is what appears to be under-reading, and nobody connects it
                to a device added on a different day.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Treat adding anything to a loop as a design change rather than a wiring job. Every
                insertion spends part of a budget that was set when the loop was commissioned, and
                Module 3 Section 2 made exactly this point.
              </p>
              <p>
                Work the sum before fitting: supply voltage, minus the drop across everything
                already in the loop at 20 mA, minus what the new device takes, compared against the
                transmitter&rsquo;s data-sheet minimum. It is a two-minute calculation.
              </p>
              <p>
                And test at full scale rather than at the operating point. Module 6 Section
                2&rsquo;s simulate mode does exactly this &mdash; put a calibrator in the
                transmitter&rsquo;s place and step it to 20 mA, which exercises the budget&rsquo;s
                worst case deliberately instead of waiting for the process to find it.
              </p>
            </>
          }
        />

        <InlineCheck
          id="ins-7-3-budget"
          question="A 24 V loop has a 250 Ω conversion resistor, an isolator that drops 4 V at full scale, and 300 m of cable. The transmitter needs 12 V. Does it work?"
          options={[
            'No — the total exceeds the supply',
            'Yes, with roughly 2.9 V to spare',
            'Yes, but only at low readings',
            'It cannot be determined without the cable size',
          ]}
          correctIndex={1}
          explanation="At 20 mA the resistor drops 5 V and the isolator 4 V. 300 m of 1.5 mm² is about 7 Ω, so roughly 0.14 V. Total ≈ 9.14 V, leaving about 14.9 V against a 12 V requirement — so it works with around 2.9 V of headroom. Note the cable is the smallest term by a wide margin."
        />

        <SectionRule />
        <ContentEyebrow>The window HART needs</ContentEyebrow>

        <ConceptBlock
          title="A minimum as well as a maximum"
          plainEnglish="Everything so far has been about not having too much resistance. HART also needs you to have enough."
          onSite="This is why a bench test that works perfectly for 4–20 mA can refuse to talk to a communicator."
        >
          <p>
            Module 2 Section 5 introduced HART as a digital signal superimposed on the analogue
            current. It adds one constraint to loop design that runs opposite to everything above:
          </p>
          <p>
            <strong>Total loop resistance must fall between 250 &Omega; and 1100 &Omega;.</strong>
          </p>
          <p>
            Most loops satisfy it without anybody thinking about it. A single 250 &Omega; conversion
            resistor plus cable resistance sits just over the lower limit and works well, and even
            two 250 &Omega; resistors stay comfortably inside the range.
          </p>
          <p>
            🔴 Where it bites is the bench.{' '}
            <strong>
              Set a loop-powered HART transmitter up with a lab power supply and no resistor
              anywhere in the circuit, and the total loop resistance is essentially zero
            </strong>
            &mdash; well below the minimum.
          </p>
          <p>
            The confusing part is what still works. The transmitter regulates current perfectly, so
            the 4&ndash;20 mA signal is entirely correct and a meter in the loop reads exactly what
            it should. Only the digital communication fails, which makes it look like a communicator
            fault or a dead transmitter rather than a missing resistor.
          </p>
          <p>
            The fix is to include a resistor in the bench loop &mdash; which also makes the test
            setup resemble the real installation, and Module 6 Section 2&rsquo;s point about testing
            what you will actually have applies.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-7-3-hart"
          question="A HART communicator will not connect to a transmitter on a working loop that reads correctly. What is worth checking before suspecting the transmitter?"
          options={[
            'The supply voltage',
            'The cable length',
            'Whether total loop resistance is inside the 250–1100 Ω window',
            'The transmitter calibration',
          ]}
          correctIndex={2}
          explanation="The 4–20 mA reading being correct tells you the current regulation and the wiring are sound, which rules out most of what people check first. HART needs a resistance window the analogue signal does not, so a loop with too little — or occasionally too much — resistance carries the measurement perfectly and refuses to communicate."
        />

        <ConceptBlock
          title="Designing in margin rather than designing to the limit"
          plainEnglish="A loop that exactly meets its budget on the day it is commissioned has nothing left for whatever gets added next."
          onSite="Leaving headroom costs nothing at design stage and is expensive to retrofit."
        >
          <p>
            The arithmetic so far answers whether a loop works. The design question is slightly
            different: whether it will still work after the things that predictably happen to loops.
          </p>
          <p>Three of those are worth budgeting for explicitly:</p>
          <ul>
            <li>
              <strong>Devices added later.</strong> This section&rsquo;s scenario is the standard
              case &mdash; an indicator, a recorder or an isolator fitted years after commissioning
              by somebody who reasonably assumed there was room.
            </li>
            <li>
              <strong>Supply variation.</strong> A nominal 24 V supply is not 24.00 V under all
              conditions, and the budget should be worked against the lowest it is specified to
              deliver rather than its nominal figure.
            </li>
            <li>
              <strong>Temperature.</strong> Conductor resistance rises with temperature, and while
              the cable term is small it is not the only thing that shifts &mdash; Module 4 Section
              3 listed ambient conditions among the causes of drift generally.
            </li>
          </ul>
          <p>
            None of those individually is large. Together they are the difference between a loop
            that tolerates a modification and one where{' '}
            <strong>
              the next reasonable addition breaks it in a way that will not be noticed for months
            </strong>
            .
          </p>
          <p>
            Module 6 Section 6 made the same argument about error budgets:{' '}
            <strong>
              a budget that exactly meets the requirement on day one has nothing left for what comes
              afterwards
            </strong>
            . The reasoning is identical here, with volts instead of per cent.
          </p>
        </ConceptBlock>

        <Scenario
          title="A level loop that never reads above about 80 per cent"
          situation={
            <>
              <p>
                A tank level loop reads correctly from empty up to roughly 80 per cent. Above that
                the indication stops climbing, though the tank demonstrably keeps filling. It has
                behaved this way since a local indicator was fitted at the tank six months ago.
              </p>
              <p>The transmitter has been calibrated and passes. The cable tests correctly.</p>
            </>
          }
          whatToDo={
            <>
              <p>
                The shape of the failure is the diagnosis before any test. A reading that tracks
                correctly and then flattens near the top is not a calibration error &mdash; a
                calibration error would be wrong across the range. It is <strong>saturation</strong>
                , and Module 3 Section 1 established that a current loop saturating means the supply
                has run out of headroom.
              </p>
              <p>
                The timing points at the cause. The indicator fitted six months ago almost certainly
                brought its own 250 &Omega; resistor, taking the loop from 250 &Omega; to 500
                &Omega; and doubling the voltage it consumes at full scale.
              </p>
              <p>
                Work it: at 20 mA the loop now drops 10 V, leaving 14 V from a 24 V supply. If the
                transmitter&rsquo;s data sheet says it needs more than that, the loop physically
                cannot reach 20 mA &mdash; and 80 per cent is roughly where it runs out.
              </p>
              <p>
                The fixes are all in the budget: raise the supply voltage, replace the indicator
                with a lower-burden type, or remove something from the loop. Replacing the
                transmitter would achieve nothing, and it passed its calibration because it is not
                faulty.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                The loop was tested when the indicator was fitted and read correctly, because the
                tank was not full at the time. The fault was designed in six months before it
                appeared.
              </p>
              <p>
                It is also a case where the arithmetic is faster than the testing. Two minutes with
                the data sheet and a calculator identifies the cause before anybody opens an
                enclosure.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Recording the sum</ContentEyebrow>

        <ConceptBlock
          title="The budget belongs on the drawing"
          plainEnglish="A calculation nobody can find is a calculation the next person will not redo. They will just fit the device."
          onSite="Write down what the budget was and what was left. It takes a line."
        >
          <p>
            The scenario in this section happened because somebody added a device without knowing
            what headroom existed &mdash; and they had no reasonable way to find out.
          </p>
          <p>
            That is a documentation problem as much as a design one. Module 7 Section 1 established
            that a loop diagram records what is in a loop; the budget is the natural companion to
            it:
          </p>
          <ul>
            <li>
              <strong>The supply voltage</strong> the loop was designed around.
            </li>
            <li>
              <strong>The transmitter&rsquo;s minimum</strong>, from its data sheet.
            </li>
            <li>
              <strong>What each device in the loop takes</strong>, so an addition can be assessed
              against what is already spent.
            </li>
            <li>
              <strong>The headroom remaining</strong> at full scale &mdash; the single number that
              tells somebody whether they can add anything at all.
            </li>
          </ul>
          <p>
            That last figure is the useful one.{' '}
            <strong>
              &ldquo;This loop has 3 V of headroom at 20 mA&rdquo; answers the question a future
              technician will actually have
            </strong>
            , and answers it without them needing to reconstruct the whole calculation from data
            sheets.
          </p>
          <p>
            It is the same argument Module 4 Section 5 made about records generally: the value is
            realised later, by somebody who was not there, and it exists only if it was written down
            at the time.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Does a bigger cable ever help a loop budget?',
              answer:
                'Arithmetically yes and practically almost never, because the cable is such a small term to begin with. Doubling the cross-sectional area halves an already negligible contribution — on a 500 m run that is saving about 0.1 V out of a budget of ten or more. If a loop is short of headroom the answer is in the devices or the supply, and cable size is chosen for mechanical and installation reasons rather than for voltage drop.',
            },
            {
              question: 'What supply voltage should a new loop be designed around?',
              answer:
                '24 V DC is the near-universal convention and Module 3 Section 2 used it throughout. Higher supplies exist and buy headroom, which is occasionally the right answer for a loop carrying several devices. The thing to avoid is designing to exactly the available headroom, because that leaves nothing for a device somebody adds later — and this section’s scenario is what that looks like.',
            },
            {
              question: 'How do I find out what a device adds to the loop?',
              answer:
                'From its data sheet, where it is usually quoted either as a burden resistance in ohms or as a voltage drop at 20 mA. The two are interchangeable via Ohm’s law — a device dropping 4 V at 20 mA presents 200 Ω. What matters is not to guess, because a device that contains a 250 Ω conversion resistor and one that drops a volt or two are very different propositions for a marginal loop.',
            },
            {
              question: 'Does the 4 mA end of the range ever cause a problem?',
              answer:
                'Not for the voltage budget — that is the comfortable end, as the table shows. What matters at 4 mA is the other constraint Module 3 Section 2 covered: a loop-powered transmitter must run its entire internal circuitry on less than 4 mA. That is a current limit rather than a voltage one, and it is a property of the transmitter rather than of your loop design.',
            },
            {
              question: 'Can two receivers share a loop if the budget allows?',
              answer:
                'Yes, and that is one of the genuine strengths of a series current loop — the same current flows through every device, so each reads the true signal. Module 3 Section 2 made that point and this section supplies the constraint: each receiver takes its share of voltage, so the number you can fit is decided by the budget rather than by anything about the signal.',
            },
            {
              question: 'What if the budget will not accommodate what is needed?',
              answer:
                'The options are a higher supply voltage, lower-burden devices, or splitting the signal rather than daisy-chaining it. Module 3 Section 3 covered signal isolators, and a splitting isolator produces several independent outputs from one input — which means each downstream device sits in its own loop with its own budget instead of all of them sharing one. That costs a device and it solves the problem properly.',
            },
          ]}
        />

        <ConceptBlock
          title="A worked design, start to finish"
          plainEnglish="Everything on this page, applied to one loop in the order you would actually do it."
          onSite="Five steps, and the whole thing is a few minutes with a data sheet."
        >
          <p>
            A pressure transmitter is to feed a controller input and a local indicator, 400 m from
            the panel, on a 24 V supply. Is it viable?
          </p>
          <ul>
            <li>
              <strong>1 &mdash; Look up the transmitter minimum.</strong> Say the data sheet gives
              12 V. This is the only figure that must not be guessed.
            </li>
            <li>
              <strong>2 &mdash; Work the ceiling.</strong> (24 &minus; 12) &divide; 0.020 ={' '}
              <strong>600 &Omega;</strong> available in total.
            </li>
            <li>
              <strong>3 &mdash; Add up the devices.</strong> Controller input 250 &Omega;, indicator
              250 &Omega; &mdash; <strong>500 &Omega;</strong> before any cable.
            </li>
            <li>
              <strong>4 &mdash; Add the cable.</strong> 400 m is 800 m of conductor, roughly{' '}
              <strong>9 &Omega;</strong> in 1.5 mm&sup2;. Total about 509 &Omega;.
            </li>
            <li>
              <strong>5 &mdash; Compare, and look at the margin.</strong> 509 against a 600 &Omega;
              ceiling, so it works &mdash; with about 91 &Omega; spare, or roughly 1.8 V of headroom
              at full scale.
            </li>
          </ul>
          <p>
            Now read that margin rather than just the pass.{' '}
            <strong>1.8 V is not enough for another 250 &Omega; device</strong>, so this loop is
            full. That is exactly the fact worth recording, because the next person to be asked for
            a second indicator has no other way to know.
          </p>
          <p>
            Notice too where the budget went. The two devices took 500 &Omega; and 400 metres of
            cable took nine &mdash; which is this section&rsquo;s main argument, arriving as a
            number.
          </p>
        </ConceptBlock>

        <KeyTakeaways
          points={[
            'The budget is one inequality: supply ≥ transmitter minimum + (current × total loop resistance).',
            'Full scale is the design case, because voltage dropped in the loop is proportional to current.',
            'Maximum total loop resistance = (supply − transmitter minimum) ÷ 0.020.',
            'A 24 V supply with a transmitter needing 12 V allows 600 Ω for everything in the loop.',
            '🔴 Cable is a minor term: 500 m of 1.5 mm² is about 11.5 Ω and drops roughly 0.23 V at 20 mA.',
            '🔴 One added receiver with its own 250 Ω resistor drops 5 V — more than a kilometre of cable.',
            'So the useful design question is how many devices, not how far.',
            'Two 250 Ω resistors in series make 500 Ω and drop 10 V at full scale.',
            '🔴 A marginal loop works at 4 mA and saturates at 20 mA, because the budget is only tight at the top.',
            'The failure is visible — the reading rises correctly and then stops, rather than reading low.',
            'That shape names the cause: it is a headroom problem, and replacing the transmitter will not help.',
            'Adding anything to a loop is a design change, not a wiring job. Work the sum first.',
            'Test at full scale using a calibrator in simulate mode rather than waiting for the process to find the limit.',
            'HART needs total loop resistance between 250 Ω and 1100 Ω — a window, not a maximum.',
            '🔴 A bench loop with no resistor is below that minimum: 4–20 mA works perfectly and HART will not communicate.',
            'The transmitter’s minimum terminal voltage is a data-sheet figure and differs between models.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 7.3" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Terminations and glanding
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Cable and identification
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule7Section3;
