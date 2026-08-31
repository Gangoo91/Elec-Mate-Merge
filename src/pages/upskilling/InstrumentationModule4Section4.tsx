/**
 * Module 4 · Section 4 — Measurement equipment: multimeters, clamp meters, oscilloscopes
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE FRAMING. A catalogue of instruments teaches nothing. The idea that
 * makes this page worth reading is that EVERY STRENGTH IS ALSO A FAILURE MODE,
 * so choosing an instrument is choosing which errors you are going to get:
 *
 *   DMM         — very high input impedance. Section 1 called that the cure for
 *                 loading. The bill arrives as PHANTOM VOLTAGE.
 *   CLAMP METER — no burden, no broken circuit. Pays for it in resolution, and
 *                 reads NET current, which is both a trap and a diagnostic.
 *   SCOPE       — shows the waveform in time, which is the one thing neither of
 *                 the others can do. Pays in setup time and portability.
 *
 * 🔴 PHANTOM VOLTAGE is the centrepiece and it is safety-adjacent: a
 * high-impedance meter registers voltage on an isolated conductor through
 * capacitive coupling to neighbours in the same conduit — the exact mechanism
 * of Module 3 Section 5. It gives the impression of a connection where none
 * exists. The worked derivation here is OURS, at 230 V / 50 Hz, computed and
 * checked; the source's figures are 120 V / 60 Hz.
 *
 * Deliberately NOT re-teaching safe isolation — Module 1 Section 5 owns that,
 * and Module 3's audit showed how easily duplication creeps in. This page
 * points at it and stays on measurement.
 *
 * No brand names, per house style — the source names a manufacturer repeatedly
 * and that is its author's preference, not ours.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §34.8.1 (min/max recording for intermittents), §34.8.2 (phantom voltage, the
 * stray-capacitance equivalent circuit, and why analogue meters never showed
 * it) and §34.8.5 (using AC volts as a qualitative noise detector on DC signal
 * paths, and the frequency function to identify the source).
 * Extracted to scratchpad/src/m4_dmm.txt. Held in ~/Desktop/hav/instrumentation.
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
  'Measurement equipment: multimeters, clamp meters, oscilloscopes | Instrumentation Module 4.4 | Elec-Mate';
const DESCRIPTION =
  'Why every instrument’s strength is also its failure mode — phantom voltage from a high-impedance multimeter, what a clamp meter gives up for not breaking the circuit, using AC volts as a noise detector, and when only an oscilloscope will do.';

const outcomes = [
  'Explain why a high input impedance causes phantom voltage readings',
  'Calculate a phantom voltage from stray capacitance and meter impedance',
  '🔴 Say why a phantom voltage gives a false impression of a connection',
  'Explain why lowering the input impedance collapses a phantom voltage',
  'Use the AC voltage function as a qualitative noise detector on a DC signal',
  'Say what a clamp meter gives up in exchange for not breaking the circuit',
  'Explain what a clamp meter reads when more than one conductor is enclosed',
  'Say what an oscilloscope shows that neither of the other instruments can',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A multimeter reads 16 V AC between an isolated conductor and neutral, in a conduit shared with energised conductors. What is the most likely explanation?',
    options: [
      'A phantom voltage from capacitive coupling to the neighbouring conductors',
      'The meter is faulty',
      'Induced voltage from a magnetic field',
      'The isolation has failed and the conductor is live',
    ],
    correctIndex: 0,
    explanation:
      'Stray capacitance between conductors running together forms a path that a high-impedance meter can register. The meter and the stray capacitance make a divider, and a 10 MΩ meter is a light enough load to show a substantial fraction of the source voltage. It must still be proved, not assumed.',
  },
  {
    id: 2,
    question: 'Why is phantom voltage described as a problem created by modern test equipment?',
    options: [
      'Because modern meters are less accurate at low voltages',
      'Because their very high input impedance draws too little current to collapse the coupled voltage, where an older low-impedance meter would have',
      'Because digital displays cannot show small voltages',
      'Because modern meters measure true RMS',
    ],
    correctIndex: 1,
    explanation:
      'The stray capacitance can supply only a minute current. A low-impedance instrument loads it down to almost nothing, so an analogue meter would never have shown the reading. A high-impedance digital meter takes almost no current, so most of the coupled voltage appears across it.',
  },
  {
    id: 3,
    question:
      'The same conduit run is measured with a 1 MΩ instrument instead of a 10 MΩ one. What happens to a 16.5 V phantom reading?',
    options: [
      'It becomes unreadable',
      'It stays about the same',
      'It falls to roughly a tenth — about 1.7 V',
      'It roughly doubles',
    ],
    correctIndex: 2,
    explanation:
      'Because the stray reactance is far larger than either meter resistance, the divider is nearly proportional to the meter’s resistance. Ten times less resistance gives about ten times less phantom voltage. That is the principle behind deliberately loading a circuit to distinguish a phantom from a real supply.',
  },
  {
    id: 4,
    question:
      'A multimeter is set to AC volts and connected across a signal that should be pure DC. It reads 40 mV AC. What does that indicate?',
    options: [
      'The DC signal is 40 mV too high',
      'A wiring fault to earth',
      'The meter is set to the wrong function',
      'AC noise superimposed on the DC signal',
    ],
    correctIndex: 3,
    explanation:
      'A steady DC signal should show nearly zero on an AC range, so anything appreciable is AC content riding on it. This turns an ordinary meter into a useful qualitative noise detector, and switching to the frequency function can then identify what the noise is — which usually names the source.',
  },
  {
    id: 5,
    question: 'What does a clamp meter give up in exchange for not breaking the circuit?',
    options: [
      'Resolution and low-current capability, so a general-purpose clamp cannot read a 4–20 mA loop',
      'The ability to measure AC',
      'Accuracy at high currents',
      'Nothing — it is superior in every respect',
    ],
    correctIndex: 0,
    explanation:
      'A clamp adds no burden and needs no interruption, which is decisive on a live process. What it costs is sensitivity: a clamp built for load currents cannot resolve milliamps, so reading a signal loop needs an instrument specified for it.',
  },
  {
    id: 6,
    question:
      'A clamp meter is placed around both conductors of a two-wire circuit. What will it read?',
    options: [
      'The circuit current',
      'Approximately zero, because the go and return currents cancel',
      'An unstable reading',
      'Twice the circuit current',
    ],
    correctIndex: 1,
    explanation:
      'A clamp responds to the net current enclosed, and in a healthy circuit the go and return are equal and opposite. That is a trap if you meant to read the load current, and a genuine diagnostic if you meant to find leakage — any non-zero reading is current returning by another path.',
  },
  {
    id: 7,
    question: 'When is an oscilloscope the right instrument rather than a multimeter?',
    options: [
      'When the circuit cannot be broken',
      'Whenever high accuracy is needed',
      'When the shape or timing of the signal matters — thresholds, noise character, or a brief event',
      'When measuring resistance',
    ],
    correctIndex: 2,
    explanation:
      'A multimeter reduces a signal to one number per reading. A scope shows how it behaves over time, which is the only way to see a pulse shape, a noise waveform, or an event too brief to register on a display — the questions Module 4 Section 2 raised about setting a pulse threshold, for example.',
  },
  {
    id: 8,
    question: 'Why is a min/max recording function useful when chasing an intermittent fault?',
    options: [
      'It averages out noise',
      'It records the waveform shape',
      'It improves the meter’s accuracy',
      'It captures the extremes reached while nobody was watching the display',
    ],
    correctIndex: 3,
    explanation:
      'An intermittent by definition is not happening while you stand there. A function that retains the highest and lowest values seen over a period turns an unattended meter into evidence that something did or did not move — which is often enough to decide where to look next.',
  },
];

const InstrumentationModule4Section4 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 4"
        title="Measurement equipment"
        backTo="/electrician/upskilling/instrumentation-module-4"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Three instruments, three sets of compromises. Choosing one is choosing which errors you
          are going to get.
        </p>

        <TLDR
          points={[
            'Every instrument’s strength is also its failure mode. That is the useful way to compare them.',
            '🔴 Phantom voltage: capacitive coupling from neighbouring energised conductors registers on an isolated one, because a high-impedance meter draws too little current to collapse it.',
            '🔴 It gives the impression of a connection where none exists — and isolation is proved by the procedure in Module 1 Section 5, never inferred from a voltmeter reading.',
            'Lower the impedance and the phantom collapses: 1 MΩ gives about a tenth of the reading, and a real load gives essentially nothing.',
            'A clamp meter adds no burden and needs no break in the circuit. It pays in resolution — a general-purpose clamp cannot read a 4–20 mA loop.',
            'Only an oscilloscope shows the signal in time — shape, timing, and brief events the other two average away.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>How to compare instruments</ContentEyebrow>

        <ConceptBlock
          title="Every strength is a failure mode"
          plainEnglish="Instruments are not better or worse than each other. They are differently compromised, and the compromise is usually the same thing as the selling point."
          onSite="Ask what an instrument is good at, then ask what that same property costs. The answer is where it will mislead you."
        >
          <p>
            A list of instruments and their features is not worth a page. What is worth knowing is
            that the property which makes each one useful is the same property that makes it lie in
            particular circumstances.
          </p>
          <p>
            Section 1 already set this up without naming it. A voltmeter needs a very high input
            resistance so it does not load the source &mdash; that was the cure for the pH electrode
            problem. This section is where the bill for that cure arrives.
          </p>
          <AppendixTable
            caption="The compromise in each instrument"
            headers={['Instrument', 'The strength', 'The same property, as a fault']}
            rows={[
              [
                'Multimeter',
                'Very high input impedance — does not load the source',
                'Registers phantom voltage where nothing is connected',
              ],
              [
                'Clamp meter',
                'No burden, no need to break the circuit',
                'Poor resolution; reads net current, not the current you meant',
              ],
              [
                'Oscilloscope',
                'Shows the signal over time, not as a single number',
                'Slower to set up, less portable, easy to misread the timebase',
              ],
            ]}
            notes="None of these is a defect to be fixed. They are the terms on which each instrument works."
          />
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The multimeter, and what its impedance costs</ContentEyebrow>

        <ConceptBlock
          title="🔴 Phantom voltage — a reading where there is no connection"
          plainEnglish="An isolated conductor lying alongside live ones picks up a voltage through the air between them. A sensitive meter shows it; a less sensitive one would not."
          onSite="Long conduit runs with several cables sharing them are where this appears. The longer the shared run and the more live neighbours, the bigger the reading."
        >
          <p>
            Consider testing for the absence of AC voltage on a conductor that has been isolated,
            but which runs for a long distance in a conduit alongside conductors that are still
            energised.
          </p>
          <p>
            With the supply to the isolated conductor open, there should be nothing to measure. A
            good digital multimeter may show ten or twenty volts.
          </p>
          <p>
            The mechanism is one Module 3 Section 5 covered in detail:{' '}
            <strong>capacitive coupling</strong>. Two conductors running together for a distance
            have capacitance between them, and that capacitance is a path AC can cross. It is the
            same effect that puts noise on a signal cable, appearing here as a voltage on something
            that ought to be dead.
          </p>
          <p>
            What decides whether you see it is the meter. The stray capacitance can supply only a
            minute current, so the meter&rsquo;s input resistance and the capacitance form a
            divider:
          </p>
          <ul>
            <li>
              A stray capacitance of roughly <strong>23 pF</strong> at 50 Hz presents a reactance of
              about <strong>139 M&Omega;</strong>.
            </li>
            <li>
              Against a 10 M&Omega; meter on a 230 V system, that gives a phantom reading of about{' '}
              <strong>16.5 V</strong>.
            </li>
          </ul>
          <p>
            And it grows with the coupling. A longer shared run, or more energised neighbours, means
            more capacitance and a bigger reading &mdash; around <strong>69 V</strong> at 100 pF.
            Readings above a hundred volts are possible where the coupling is strong enough.
          </p>
          <p>
            Treat those capacitance figures as illustration rather than as design values. What
            actually couples in a given installation depends on the conductors, their spacing, the
            containment and how far they run together, and it is not something to be predicted from
            a table.{' '}
            <strong>
              The point is the mechanism and the direction: more shared run means more coupling
              means a bigger phantom.
            </strong>
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Why the meter you choose decides what you see"
          plainEnglish="Load it a little and the phantom shrinks. Load it properly and it disappears entirely."
          onSite="This is the practical test: if a reading collapses under load, it was a phantom. If it holds up, it is a supply."
        >
          <p>
            Because the stray reactance is so much larger than any meter&rsquo;s input resistance,
            the divider is very nearly proportional to that resistance. Change the meter and the
            reading changes with it:
          </p>
          <AppendixTable
            caption="The same coupling, measured with different input impedances (230 V, 50 Hz, ≈23 pF)"
            headers={['Meter input impedance', 'Phantom voltage shown']}
            rows={[
              ['10 MΩ — typical digital multimeter', '≈ 16.5 V'],
              ['1 MΩ', '≈ 1.7 V'],
              ['100 kΩ', '≈ 0.2 V'],
              ['A few kΩ — a genuine load', '≈ 0 V'],
            ]}
            notes="Computed from the same stray capacitance in each case. Nothing about the installation changes across these rows — only the instrument."
          />
          <p>Two conclusions follow, and both are worth carrying.</p>
          <p>
            The first is historical and slightly humbling.{' '}
            <strong>
              An analogue meter would never have registered this, because its input impedance is far
              lower.
            </strong>{' '}
            Phantom voltage is a product of modern test equipment rather than a change in how
            installations behave. The wiring always did this; we simply built instruments sensitive
            enough to notice.
          </p>
          <p>
            The second is the practical test. A phantom voltage cannot supply any real current, so{' '}
            <strong>putting a load on it collapses it</strong>, while a genuine supply holds up.
            That is the principle behind the low-impedance measurement modes some instruments
            provide, and behind the general advice to prove a circuit with something that draws
            current rather than something that merely senses.
          </p>
        </ConceptBlock>

        <Pullquote>
          A phantom voltage gives the impression of a connection where no continuity exists. It is a
          reading produced by the meter as much as by the installation.
        </Pullquote>

        <ConceptBlock
          title="🔴 What this does and does not tell you about isolation"
          plainEnglish="Knowing about phantom voltage explains a confusing reading. It is not a licence to decide a conductor is dead."
          onSite="Isolation is established by procedure. Module 1 Section 5 covers how isolations actually fail and what makes them reliable."
        >
          <p>
            Phantom voltages mislead in both directions, and it is worth being precise about which
            risk is which.
          </p>
          <ul>
            <li>
              <strong>They can suggest a fault that does not exist.</strong> A technician
              troubleshooting a circuit finds voltage where there should be none and concludes there
              is a connection &mdash; or at least a high-resistance one. There is not.
            </li>
            <li>
              <strong>🔴 They can encourage a dangerous habit.</strong> Once somebody has learned
              that &ldquo;those readings are just phantom&rdquo;, a genuinely live conductor is one
              assumption away from being treated as dead.
            </li>
          </ul>
          <p>
            The second is the reason this belongs in a course rather than in a folklore
            conversation.{' '}
            <strong>
              A voltmeter reading is evidence about a measurement, not a decision about safety.
            </strong>{' '}
            Isolation is established by a defined procedure, and Module 1 Section 5 covers how
            isolations fail in practice and what makes them reliable. Nothing on this page changes
            it.
          </p>
          <p>
            What this page does give you is the ability to explain a confusing reading rather than
            argue with it &mdash; and to know that a reading which collapses under load was telling
            you about capacitance rather than about a supply.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-4-phantom"
          question="A reading of 18 V AC is found on a conductor believed isolated. Applying a low-impedance mode, the reading falls to 0.2 V. What has been established?"
          options={[
            'The 18 V was a phantom from capacitive coupling, not a supply — which explains the reading but does not by itself establish safe isolation',
            'The meter is faulty',
            'There is a high-resistance connection to a live conductor',
            'The conductor is safe to work on',
          ]}
          correctIndex={0}
          explanation="A source that collapses under a light load cannot deliver current, so it was capacitive coupling rather than a supply. That resolves the measurement question. Whether the conductor is safe to work on is a separate question answered by the isolation procedure, not by a meter reading."
        />

        <SectionRule />
        <ContentEyebrow>Getting more out of an ordinary meter</ContentEyebrow>

        <ConceptBlock
          title="AC volts as a noise detector"
          plainEnglish="Put the meter on AC and connect it to something that should be pure DC. Whatever it reads is noise."
          onSite="Costs nothing, needs no extra equipment, and answers a question that otherwise needs a scope."
        >
          <p>
            AC noise riding on a DC signal is one of the more aggravating faults in analogue
            electronics, and it is obvious on an oscilloscope &mdash; which is not much help to
            somebody who does not have one to hand.
          </p>
          <p>
            A good multimeter with clean discrimination between AC and DC gives a usable substitute.
            Set it to <strong>AC volts</strong> and connect it where a steady DC signal is expected:
          </p>
          <ul>
            <li>
              A healthy, pure DC signal reads <strong>nearly zero</strong> on the AC range.
            </li>
            <li>
              Anything appreciable is <strong>AC content superimposed on the DC</strong>, and its
              magnitude is a measure of how much.
            </li>
          </ul>
          <p>
            Then go one better. Switch to the <strong>frequency function</strong> while measuring
            that AC content, and the meter will report the frequency of the noise and how stable it
            is. That is often the whole diagnosis:
          </p>
          <ul>
            <li>
              Noise at supply frequency or its harmonics points at coupling from power wiring
              &mdash; Module 3 Section 5, and the question becomes capacitive or inductive.
            </li>
            <li>Noise at a switching frequency points at a drive or a switched-mode supply.</li>
            <li>
              Noise that wanders in frequency points at something mechanical or at a genuine process
              variation rather than at electrical pickup.
            </li>
          </ul>
          <p>
            It is a qualitative test rather than a measurement, and that is enough. Knowing there is
            80 mV of noise at supply frequency on a 1&ndash;5 V signal tells you what to do next,
            which is what a diagnostic is for.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Recording what happens when you are not looking"
          plainEnglish="Intermittent faults do not happen while you watch. A recording function watches for you."
          onSite="Set it, leave it, come back. The extremes it captured are evidence that something did or did not move."
        >
          <p>
            Many meters retain the highest and lowest values measured over a period. It is an
            unglamorous feature and it is disproportionately useful, because{' '}
            <strong>
              the defining property of an intermittent fault is that it is not happening while you
              are standing there
            </strong>
            .
          </p>
          <p>
            Left connected across a signal or a supply, a meter recording extremes turns an absence
            of observation into data. A loop that should sit at 12 mA and recorded a minimum of 3.9
            mA overnight has told you something specific: it dropped out, and by Module 3 Section
            1&rsquo;s NAMUR levels, the value it dropped to is itself informative.
          </p>
          <p>
            The limitation is worth stating too. A recorded extreme has no time attached to it, so
            you learn that something happened and not when or for how long. Where those matter, the
            answer is a logging instrument, and Section 5 takes that up.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The clamp meter</ContentEyebrow>

        <ConceptBlock
          title="Solving Section 1’s problem, and creating two of its own"
          plainEnglish="It reads current through the field around the conductor, so nothing has to be disconnected. What it reads is everything inside the jaws added together."
          onSite="Decisive on a live process. Just be certain what is inside the jaws."
        >
          <p>
            Section 1 set out the ammeter&rsquo;s problem: the circuit must be broken, which adds
            burden and, on a two-wire loop, de-energises the transmitter. A clamp meter sidesteps
            both by sensing the magnetic field around the conductor instead of carrying its current.
          </p>
          <p>Two costs come with that, and they are quite different in character.</p>
          <p>
            <strong>The first is resolution.</strong> A clamp built for load currents has no useful
            sensitivity at milliamp level, so it cannot read a 4&ndash;20 mA loop. Module 3 Section
            1 made the point when recommending clamp measurement on a live loop: the instrument has
            to be one specified for milliamps, not a general-purpose tool.
          </p>
          <p>
            <strong>The second is what it actually measures.</strong> A clamp responds to the{' '}
            <em>net</em> current enclosed by its jaws. Put it around a single conductor and that is
            the conductor&rsquo;s current. Put it around both conductors of a circuit and the go and
            return are equal and opposite, so it reads approximately <strong>zero</strong>.
          </p>
          <p>
            That catches people out, and then it becomes one of the more useful diagnostics
            available &mdash; because in a healthy circuit the net current <em>should</em> be zero.
            Any reading that is not zero means current is arriving by one route and leaving by
            another, which is precisely what leakage is, and it is the principle a residual current
            device works on. The trap and the technique are the same physics read two ways.
          </p>
          <p>
            The resolution limit applies here too, and the two compound. Leakage worth finding is
            often tens of milliamps alongside load currents of tens of amps, so measuring it needs a
            clamp built for the job.{' '}
            <strong>A general-purpose clamp will report a genuine leakage fault as zero</strong>{' '}
            &mdash; a comfortable answer, and completely wrong.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-4-clamp"
          question="A clamp meter around both conductors of a circuit reads 34 mA rather than zero. What does that tell you?"
          options={[
            'The load is drawing 34 mA',
            'About 34 mA is returning by a path other than the enclosed conductors',
            'The conductors are the wrong way round in the jaws',
            'The clamp is not fully closed',
          ]}
          correctIndex={1}
          explanation="Go and return should cancel exactly. A net current means some of what went out is not coming back through the jaws, so it is returning somewhere else — the definition of leakage. This is the working principle behind residual current measurement, and it is the same clamp used the same way."
        />

        <SectionRule />
        <ContentEyebrow>When only a scope will do</ContentEyebrow>

        <ConceptBlock
          title="The instrument that shows time"
          plainEnglish="A meter gives you one number for a signal. A scope shows you what the signal is actually doing."
          onSite="Reach for it when the question is about shape, timing or something brief — not when it is about a value."
        >
          <p>
            A multimeter reduces a signal to a single number per reading. That is exactly what you
            want when the question is &ldquo;what is the value?&rdquo; and it is useless when the
            question is about behaviour, because the reduction throws the behaviour away.
          </p>
          <p>
            An oscilloscope displays amplitude against time, which answers a different class of
            question:
          </p>
          <ul>
            <li>
              <strong>Shape.</strong> Is that pulse train clean, or are the edges slow and ragged?
              Module 4 Section 2 said a pulse threshold should be set from the signal rather than
              from the answer &mdash; this is the instrument that lets you see the signal.
            </li>
            <li>
              <strong>Noise character.</strong> The meter trick above tells you noise is present and
              at what frequency. A scope shows what it looks like, which distinguishes steady pickup
              from brief spikes that share an average.
            </li>
            <li>
              <strong>Brief events.</strong> A disturbance lasting microseconds does not move a
              meter&rsquo;s display at all. On a scope it is plainly visible.
            </li>
            <li>
              <strong>Sequence.</strong> With two channels, which of two things happened first
              &mdash; a question no number can answer.
            </li>
          </ul>
          <p>
            The costs are practical rather than electrical: more setup, less portability, and a
            display that is easy to misread if the timebase or the coupling is set wrongly. A
            waveform that looks alarming is sometimes just a scope set to the wrong scale, so
            confirm the settings before believing the picture.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Choosing between them"
          plainEnglish="Match the instrument to the question, not to what is in the bag."
          onSite="Most instrumentation work is done with a meter and a clamp. Knowing when that is not enough is the skill."
        >
          <AppendixTable
            caption="Which instrument answers which question"
            headers={['The question', 'The instrument', 'Watch out for']}
            rows={[
              [
                'What is this value?',
                'Multimeter',
                'Phantom voltage; input impedance against source impedance',
              ],
              [
                'What current is flowing, live?',
                'Clamp meter',
                'Resolution; what is actually inside the jaws',
              ],
              [
                'Is there noise on this DC signal?',
                'Multimeter on AC volts',
                'Qualitative only — it will not show you the shape',
              ],
              ['What does the signal look like?', 'Oscilloscope', 'Timebase and coupling settings'],
              [
                'Did something move while I was away?',
                'Min/max recording',
                'No timestamp — you learn what, not when',
              ],
              [
                'What happened over a shift?',
                'Data logger',
                'Sample rate — Section 5 and Module 3 Section 4',
              ],
            ]}
            notes="The last row is Section 5's territory. Everything above it can be done with what most technicians already carry."
          />
        </ConceptBlock>

        <CommonMistake
          title="Trusting a reading because the instrument is a good one"
          whatHappens={
            <>
              <p>
                A quality meter gives a clear, stable, repeatable number, and the number is accepted
                because the instrument is known to be reliable and recently calibrated.
              </p>
              <p>
                Every example in this module has been a case where that reasoning fails. A phantom
                voltage is a stable, repeatable reading produced by an excellent meter. So is the
                3.2 mV from Section 1&rsquo;s loaded pH electrode. So is the correct-but-irrelevant
                frequency from Section 2&rsquo;s duty-modulated output.
              </p>
              <p>
                In none of those cases is the instrument at fault. The instrument answered the
                question it was asked, accurately. The question was the wrong one.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Ask what could make this reading appear without the condition being real. That
                single question catches phantom voltage, loading errors and property mismatches,
                because all three produce plausible numbers by a mechanism other than the one you
                assumed.
              </p>
              <p>
                Then confirm by a different route wherever the answer matters. Change the
                instrument, change its impedance, apply a load, measure the same quantity somewhere
                else in the chain. Module 3 Section 4&rsquo;s reverse-conversion check &mdash; work
                out the current the displayed value implies, then go and measure it &mdash; is the
                cheapest independent confirmation available.
              </p>
            </>
          }
        />

        <Scenario
          title="A control signal that is fine on the meter and wrong at the controller"
          situation={
            <>
              <p>
                A 4&ndash;20 mA loop drives a valve positioner. The valve hunts continuously. A
                technician measures the loop with a good multimeter and reads a steady 11.9 mA,
                exactly what the controller is asking for. The reading does not waver.
              </p>
              <p>The positioner is swapped. The hunting continues.</p>
            </>
          }
          whatToDo={
            <>
              <p>
                A steady meter reading and an unsteady valve is a contradiction, and the meter is
                the thing to doubt. A digital multimeter samples and averages; a signal that swings
                rapidly and symmetrically about 11.9 mA averages to a rock-steady 11.9 mA.
              </p>
              <p>
                Use the noise test from earlier in this section. Set the meter to AC and measure
                across the loop&rsquo;s conversion resistor. A pure DC control signal should read
                nearly nothing; anything appreciable is AC riding on it. Then read the frequency of
                that AC content.
              </p>
              <p>
                If the frequency comes back at supply frequency or a harmonic, this is Module 3
                Section 5 &mdash; check the routing and screening of the signal cable, and whether
                it shares a route with the drive feeding the plant. If it comes back at a switching
                frequency, the source is likely a drive or switched-mode supply nearby.
              </p>
              <p>
                An oscilloscope on the same point settles it beyond doubt by showing the shape and
                amplitude of what is riding on the signal, which is the case for carrying one.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                The positioner was replaced on the evidence of a measurement that could not have
                revealed the fault. The meter was accurate and the reading was true; averaging
                simply removed the only property that mattered.
              </p>
              <p>
                It is the same lesson as Section 2&rsquo;s duty cycle and Section 1&rsquo;s loading
                error, arriving a third time: an instrument reports the property it measures, and
                says nothing at all about the properties it does not.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="Looking after the instrument you are trusting"
          plainEnglish="A meter is a measuring standard you carry in a bag and drop occasionally. Its readings are only as good as its own condition."
          onSite="Leads fail far more often than meters do, and a failing lead does not announce itself."
        >
          <p>
            Everything on this page assumes the instrument is telling the truth about what it
            measures. Two ordinary things undermine that, and neither shows on the display.
          </p>
          <ul>
            <li>
              <strong>Test leads.</strong> They flex, get trodden on and get pulled by the lead
              rather than the plug. A lead with a partly broken conductor still reads correctly most
              of the time, which is worse than one that fails outright. Checking continuity of the
              leads themselves takes seconds and is worth doing before any measurement you intend to
              act on.
            </li>
            <li>
              <strong>Calibration.</strong> Section 3 covered drift. A meter is subject to it like
              anything else, and an instrument used to judge other instruments needs to be better
              than what it is judging &mdash; a point Module 1 Section 4 made about traceability and
              Module 6 develops properly.
            </li>
          </ul>
          <p>
            There is a related habit worth adopting: when a reading matters and something about it
            surprises you,{' '}
            <strong>
              check the instrument against something known before trusting the surprise
            </strong>
            . A quick reading on a supply of known voltage, or on a battery, confirms the meter and
            the leads in one go.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Does phantom voltage happen on DC circuits?',
              answer:
                'Not in the same way, because the coupling mechanism is capacitive and capacitance only passes changing voltages. A steady DC voltage on a neighbouring conductor will not couple across in this fashion. What can appear on DC circuits is induced noise from switching events, and the AC-volts test in this section is the way to look for it.',
            },
            {
              question: 'Why does a clamp meter need the conductor roughly centred in the jaws?',
              answer:
                'Because it responds to the magnetic field around the conductor, and the coupling into the sensing core is not perfectly uniform across the aperture. Centring the conductor and closing the jaws fully gives the most repeatable reading. A reading that changes noticeably as you reposition the clamp is telling you the measurement is not well made.',
            },
            {
              question: 'What is true RMS and when does it matter?',
              answer:
                'RMS is the value of an AC waveform that produces the same heating as an equivalent DC value, and it is what an AC measurement is meant to report. Simpler instruments measure something easier and scale it on the assumption that the waveform is a clean sine. Where that assumption holds, both give the same answer. Where it does not — the output of a drive, or a heavily distorted supply — only a true RMS instrument reports the real value. On modern industrial sites distortion is common enough that true RMS is the sensible default.',
            },
            {
              question: 'Can I use a scope on a mains circuit?',
              answer:
                'Not casually, and this is one to check properly rather than improvise. A conventional oscilloscope input is referenced to earth, so connecting its ground lead to something that is not at earth potential can be both destructive and dangerous. Differential probes and isolated instruments exist for exactly this, and using them is the answer — not working around an earthed scope with an inverted connection.',
            },
            {
              question: 'How do I know whether my meter’s input impedance is high enough?',
              answer:
                'Compare it against the source, as Section 1’s swamping rule sets out. For a low-impedance source such as a power circuit or a transmitter output, any ordinary meter is comfortably adequate. For a high-impedance source such as a pH electrode, the ratio is what matters and the data sheet is the place to check. The awkward middle ground is worth measuring twice with different instruments — if the two disagree, loading is the likely reason.',
            },
            {
              question: 'Is a phantom voltage dangerous in itself?',
              answer:
                'The coupled voltage cannot deliver meaningful current, which is exactly why it collapses under load. The danger is not the voltage — it is what people conclude from it. Dismissing a genuine reading as "probably phantom" is the hazard this knowledge introduces, which is why isolation is proved by procedure rather than by interpreting a meter.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Every instrument’s strength is also its failure mode. Choosing one is choosing which errors you will get.',
            'A multimeter’s high input impedance is Section 1’s cure for loading — and the direct cause of phantom voltage.',
            '🔴 Phantom voltage comes from capacitive coupling between conductors sharing a route, the same mechanism as Module 3 Section 5’s noise.',
            'At 230 V and 50 Hz, roughly 23 pF of stray capacitance with a 10 MΩ meter gives about 16.5 V on an isolated conductor.',
            'More coupling means more voltage — around 69 V at 100 pF, and higher readings are possible on long shared runs.',
            'A lower-impedance instrument shows far less: about 1.7 V at 1 MΩ, and essentially nothing under a real load.',
            'Phantom voltage is a product of modern test equipment. An analogue meter would never have shown it.',
            '🔴 A phantom gives the impression of a connection where none exists — and the greater hazard is the habit of dismissing real readings as phantom.',
            'Isolation is proved by the procedure in Module 1 Section 5, never inferred from a voltmeter reading.',
            'If a reading collapses under load it was capacitive; if it holds up it is a supply. That is the practical test.',
            'A meter on AC volts across a DC signal is a free noise detector — near zero is healthy, anything appreciable is AC riding on the DC.',
            'The frequency function then identifies the noise: supply frequency points at power coupling, a switching frequency at a drive.',
            'Min/max recording captures what happened while nobody watched — but records no times, so you learn what and not when.',
            'A clamp meter adds no burden and needs no break, but lacks the resolution for a 4–20 mA loop unless specified for milliamps.',
            'A clamp reads NET enclosed current. Both conductors together should read zero; anything else is leakage.',
            'Only an oscilloscope shows shape, timing and brief events. A meter averages exactly the behaviour you are trying to see.',
            'An instrument reports the property it measures and says nothing about the properties it does not.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 4.4" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Accuracy, resolution and error
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Interpreting and logging
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule4Section4;
