/**
 * Module 8 · Section 4 — Preventive maintenance
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING. Preventive maintenance had ZERO coverage anywhere in Modules
 * 1-7 — verified by grep before writing. The one adjacent owner:
 *   M6.5 — CALIBRATION INTERVALS, and it owns them properly: an interval
 *          balances drift against the cost of being wrong; the evidence is the
 *          AS-FOUND history; as-left records reveal nothing about drift;
 *          growing as-found errors justify shortening. 🔴 DO NOT re-teach
 *          interval-setting. Reference M6.5 as the MODEL for evidence-based
 *          maintenance and generalise the principle, never the method.
 *   M7.6 — "proving a trip means observing the ACTION, not the number".
 *          Verified. This page extends it to dormant functions generally.
 *   M8.2 — the isolating valve left shut after maintenance (I wrote it).
 *   M8.3 — disturbance can temporarily restore a bad connection (I wrote it).
 *
 * 🔴 THE ORGANISING QUESTION: when is "replace it when it fails" not good
 * enough? Answer: when the consequence of failure is unacceptable. Traffic
 * signal bulbs are the source's example and it is a very good one — you cannot
 * run them to failure, so they are replaced in advance of expected wear-out.
 * That converts PM from a ritual into a decision with a stated reason.
 *
 * 🔴 THE NON-OBVIOUS CONTENT — proof testing helps in TWO ways, and the second
 * surprises people:
 *   1. early detection of developing problems
 *   2. REGULAR EXERCISE. Many components degrade through INACTIVITY. Solenoid
 *      valves stick if not cycled, bearings corrode and seize if left immobile,
 *      batteries fail after long non-use. Cycling a component IMPROVES its
 *      reliability. So a test is not only a measurement, it is maintenance.
 *
 * 🔴 DORMANT FUNCTIONS — the ultimate silent fault, and it lands M8.2's
 * obvious/plausible axis: a trip that has failed sits there looking exactly
 * like a trip that works. It is only distinguishable by deliberate test, and
 * the demand it fails to answer is by definition an emergency.
 *
 * 🔴 THE SPARES POINT, which is sharper than it looks: proof testing is of
 * little value if what it reveals cannot be acted on. Spares should be held
 * AND pre-configured for immediate installation. The source names the business
 * tendency — invest in engineering and installation, neglect the support
 * infrastructure that keeps it working.
 *
 * 🔴 THE PARADOX, and the honest heart of the page: MAINTENANCE CAUSES FAULTS.
 * Every intervention disturbs a working system. The course has already supplied
 * three examples without naming the pattern — a barrier earth disconnected
 * during maintenance, an isolating valve left shut, a connection temporarily
 * restored by being disturbed. ⚠️ Do NOT invent a statistic for how often this
 * happens. State it qualitatively and let the course's own examples carry it.
 *
 * ⚠️ CC BY source — shingle-scanned to ZERO 9-word overlaps. Keep it that way.
 * ⚠️ The source's personal anecdotes (a friend's car engine, "lot rot" at a
 * used car business, a traffic-signal technician friend) are NOT reusable —
 * take the concepts, never the stories.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §32.4.2 (PM defined as replacement prior to inevitable failure; the bathtub
 * curve wear-out point; schedules from component-lifetime history and the cost
 * of failure; PM as an up-front cost against larger later costs; traffic signal
 * bulbs; instrument air dryers, wet-air consequences and separate air systems),
 * §32.4.3 (component de-rating — reduced load extends service life), §32.4.5
 * (proof testing: early detection AND regular exercise; stagnation failures;
 * spares held and pre-configured; methods per device type; the difficulty of
 * testing without disrupting the process; partial testing with the controller
 * in manual). Extracted to scratchpad/src/m8_pm.txt, m8_prooftest.txt.
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

const TITLE = 'Preventive maintenance | Instrumentation Module 8.4 | Elec-Mate';
const DESCRIPTION =
  'When running something to failure stops being acceptable, why testing a component also maintains it, why a dormant trip is the ultimate silent fault, and the uncomfortable truth that maintenance causes faults.';

const outcomes = [
  '🔴 Say when running a component to failure stops being acceptable',
  'Explain what preventive maintenance is buying and what it costs',
  '🔴 Give the two separate reasons proof testing improves reliability',
  'Explain why inactivity is itself a cause of failure',
  '🔴 Say why a dormant trip is the hardest fault in the course to detect',
  'Describe how a critical instrument is proof tested, and the difficulty on running plant',
  '🔴 Explain why maintenance is itself a source of faults',
  'Tell evidence-based maintenance from ritual',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 When does “replace it when it fails” stop being an acceptable strategy?',
    options: [
      'When the consequence of the failure is unacceptable',
      'When the component is difficult to access',
      'When the manufacturer specifies a lifetime',
      'When the component is expensive',
    ],
    correctIndex: 0,
    explanation:
      'Cost and access affect how you do it, but they do not decide whether. Running to failure is a perfectly rational strategy where a failure is merely inconvenient, and it stops being rational at the point where the consequence is something you cannot accept happening.',
  },
  {
    id: 2,
    question: 'What is preventive maintenance buying?',
    options: [
      'A guarantee that nothing will fail',
      'The avoidance of a larger cost later, paid for with a smaller cost now',
      'Compliance with the manufacturer’s warranty',
      'Longer intervals between calibrations',
    ],
    correctIndex: 1,
    explanation:
      'It is an economic exchange rather than a technical one. You spend on replacing something that has not yet failed, in return for not paying what its failure would cost — and the sum only works if the failure is genuinely expensive.',
  },
  {
    id: 3,
    question: '🔴 What are the two separate ways proof testing improves reliability?',
    options: [
      'It reduces drift and extends the interval',
      'It satisfies the standard and provides a record',
      'Early detection of developing problems, and the benefit of regularly exercising the component',
      'It calibrates the device and checks the loop',
    ],
    correctIndex: 2,
    explanation:
      'The first is expected. The second is the one people miss: many components degrade through inactivity, so the act of cycling one is maintenance in its own right rather than only a measurement of its condition.',
  },
  {
    id: 4,
    question: 'Why does inactivity cause failures?',
    options: [
      'Because dust accumulates',
      'Because the warranty expires',
      'It does not — unused components last longer',
      'Mechanisms seize, valves stick, bearings corrode and batteries deteriorate when left unused',
    ],
    correctIndex: 3,
    explanation:
      'It is most pronounced in mechanical systems but is not confined to them. A solenoid valve left uncycled for a long period may stick, a bearing left immobile may corrode and seize, and a battery may fail simply through not being used — all well before the component reaches its rated life.',
  },
  {
    id: 5,
    question: '🔴 Why is a dormant trip the hardest kind of fault to detect?',
    options: [
      'A failed trip looks exactly like a working one until it is demanded — and the demand is an emergency',
      'Because trips are usually inaccessible',
      'Because they have no indication',
      'Because trips are complicated devices',
    ],
    correctIndex: 0,
    explanation:
      'Every other fault in this module eventually produces a symptom. A protective function that has failed produces none at all, because it is doing nothing either way. The only thing that separates a healthy one from a dead one is a deliberate test.',
  },
  {
    id: 6,
    question: 'What does proof testing a transmitter usually consist of?',
    options: [
      'A visual inspection',
      'Stimulating it across its range and observing the response — a full-range check',
      'Measuring its supply voltage',
      'Confirming its output at the current process value',
    ],
    correctIndex: 1,
    explanation:
      'The purpose is to establish that it responds correctly across the whole of its operating range rather than at whatever value the process happens to be sitting at. Checking one point tells you very little about the rest of the range.',
  },
  {
    id: 7,
    question:
      'What does proof testing a control valve require that testing a transmitter does not?',
    options: [
      'A second technician',
      'A calibrated pressure source',
      'Full stroking of the element, and an assessment that it is actually having the intended effect',
      'Removal from the process',
    ],
    correctIndex: 2,
    explanation:
      'A final control element has to be shown to do something rather than to report something, which is the same distinction Module 7 Section 6 draws about proving a trip. Movement alone is not proof of effect, so leakage or its equivalent has to be assessed too.',
  },
  {
    id: 8,
    question: 'What is the practical difficulty of proof testing on an operating plant?',
    options: [
      'Test equipment cannot be used on live systems',
      'The results are not repeatable',
      'The tests are too slow',
      'Driving instruments through their full ranges disturbs, or halts, the process they are controlling',
    ],
    correctIndex: 3,
    explanation:
      'Comprehensive testing means exercising a device across its whole range, and a device in service is controlling something. Testing during a shutdown avoids that but is less realistic, because the plant is not at its normal pressures and temperatures.',
  },
  {
    id: 9,
    question:
      'One way to proof test on a running plant is to test some components rather than all. How is that done for a transmitter?',
    options: [
      'Put the controller in manual so an operator holds the process while the transmitter is tested',
      'By testing during a brief shutdown',
      'By comparing it with a second transmitter',
      'By simulating the process',
    ],
    correctIndex: 0,
    explanation:
      'Taking the transmitter out of the control decision lets it be exercised without the process following it. The approach is admittedly not comprehensive, and proof testing some instruments is considerably better than proof testing none.',
  },
  {
    id: 10,
    question: '🔴 Why does a proof-testing programme need spares held ready?',
    options: [
      'To reduce purchasing costs',
      'Because a test that reveals a failed component achieves little if the component cannot be replaced immediately',
      'Because spares are cheaper in bulk',
      'To satisfy audit requirements',
    ],
    correctIndex: 1,
    explanation:
      'The value of the test is in acting on what it finds. Ideally the spare is also already configured with the right parameters, so installation is immediate — otherwise a discovered fault simply becomes a known fault that stays in service.',
  },
  {
    id: 11,
    question: '🔴 Why is maintenance itself a source of faults?',
    options: [
      'Because maintenance is performed under time pressure',
      'Because technicians are careless',
      'Because every intervention disturbs a working system, and disturbance can leave it different',
      'Because spares are often faulty',
    ],
    correctIndex: 2,
    explanation:
      'This is structural rather than a matter of competence. A barrier earth disconnected and not refitted, an isolating valve left shut, a connection temporarily restored by being disturbed — each is an ordinary consequence of having opened something that was working.',
  },
  {
    id: 12,
    question: 'How do you tell evidence-based maintenance from ritual?',
    options: [
      'Ritual maintenance is not documented',
      'Evidence-based maintenance follows the manufacturer’s schedule',
      'Ritual maintenance is performed less often',
      'Evidence-based maintenance produces data that is looked at and acts on what it shows',
    ],
    correctIndex: 3,
    explanation:
      'Module 6 Section 5 makes exactly this argument about calibration intervals: an interval unchanged for a decade suggests data is being collected and never used. The test is not whether an activity is scheduled but whether its results could ever change what happens next.',
  },
];

const InstrumentationModule8Section4 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 8 · Section 4"
        title="Preventive maintenance"
        backTo="/electrician/upskilling/instrumentation-module-8"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The rest of this module is about faults that have happened. This is about the ones that
          have not — and about the uncomfortable fact that maintenance creates some of them.
        </p>

        <TLDR
          points={[
            '🔴 Running to failure is perfectly rational — until the consequence of failure becomes unacceptable.',
            '🔴 Proof testing helps in two separate ways: early detection, AND the benefit of regular exercise.',
            '🔴 Inactivity itself causes failures — valves stick, bearings seize, batteries deteriorate through non-use.',
            '🔴 A dormant trip is the hardest fault in this module: a failed one looks exactly like a working one.',
            '🔴 Spares must be held AND pre-configured, or a test that finds a fault changes nothing.',
            '🔴🔴 Maintenance causes faults. Every intervention disturbs a system that was working.',
            'Evidence-based maintenance produces data somebody looks at. Ritual produces data nobody uses.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 The decision</ContentEyebrow>

        <ConceptBlock
          title="When running to failure stops being acceptable"
          plainEnglish="Letting something fail and then fixing it is often the sensible choice. Sometimes the failure is the thing you cannot allow."
          onSite="This question, answered honestly, is what separates a maintenance schedule from a habit."
        >
          <p>
            Preventive maintenance means{' '}
            <strong>repairing or replacing a component before it fails rather than after</strong>,
            which immediately raises the question of why you would. Replacing something that still
            works costs money and takes time, and the component you remove might have run for years
            more.
          </p>
          <p>
            The honest answer is that it is an economic exchange.{' '}
            <strong>
              Preventive maintenance is an up-front cost, paid in exchange for avoiding a larger
              cost later
            </strong>
            , and the arithmetic only works when the later cost is genuinely large.
          </p>
          <p>
            🔴 Which gives the decision rule.{' '}
            <strong>
              Running a component to failure is a perfectly rational strategy, right up until the
              consequence of the failure becomes unacceptable.
            </strong>
          </p>
          <p>
            A domestic light bulb is replaced when it fails, and nobody thinks that unreasonable
            &mdash; the consequence is a dark room for five minutes. Traffic signal bulbs are
            treated entirely differently and are replaced{' '}
            <strong>in advance of their expected wear-out</strong>, because a burned-out signal
            causes congestion and accidents. Same component, same failure mechanism, opposite
            strategy, and the difference is consequence rather than cost.
          </p>
          <p>
            That framing is worth applying deliberately to instrument work, because it sorts a
            system into categories that deserve different treatment:
          </p>
          <ul>
            <li>
              <strong>An indication nobody controls from</strong> can often be left to fail. The
              consequence is a wrong reading somebody notices.
            </li>
            <li>
              <strong>A measurement driving control</strong> deserves more, because its failure
              propagates into the process rather than staying on a screen.
            </li>
            <li>
              🔴 <strong>A protective function</strong> deserves most, because its failure is silent
              and only revealed by the emergency it was there to handle.
            </li>
          </ul>
          <p>
            Scheduling the work then needs some idea of how long components actually last, which
            comes from <strong>the history of past failures and what those failures cost</strong>{' '}
            rather than from a general rule. Module 6 Section 5 develops exactly this reasoning for
            calibration intervals, where the as-found history provides the evidence, and the same
            logic applies here.
          </p>
        </ConceptBlock>

        <Pullquote>
          Run to failure is not laziness. It is a decision, and it is the right one until the
          failure becomes something you cannot allow to happen.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>🔴 Testing as maintenance</ContentEyebrow>

        <ConceptBlock
          title="Proof testing does two jobs, and the second is not obvious"
          plainEnglish="Testing something tells you how it is. It also does it good, because things deteriorate from not being used."
          onSite="This is why cycling a valve that has sat still for a year is worth doing even if it passes."
        >
          <p>
            Periodically testing that a critical component still functions is a reliability
            technique related to preventive maintenance but generally much cheaper, since nothing is
            replaced. It improves reliability <strong>for two separate reasons</strong>, and they
            are worth separating because the second changes what testing is for.
          </p>
          <p>
            <strong>First, early detection.</strong> A test may reveal a weakness developing in a
            component, indicating a replacement will be needed soon. That is the expected benefit,
            and it is essentially the same argument Module 6 Section 5 makes about as-found
            calibration data: an individual result may pass while the sequence of results is the
            finding.
          </p>
          <p>
            🔴 <strong>Second, and less obviously, regular exercise.</strong> The performance of
            many components <strong>degrades after prolonged periods of inactivity</strong>, so the
            act of operating one is beneficial in itself.
          </p>
          <p>The effect is most pronounced in mechanical things but is not confined to them:</p>
          <ul>
            <li>
              <strong>Solenoid valves</strong> may stick in place if they have not been cycled for a
              long period.
            </li>
            <li>
              <strong>Bearings</strong> can corrode and seize if left immobile.
            </li>
            <li>
              <strong>Batteries</strong> of various types are well known for failing after long
              periods of non-use.
            </li>
          </ul>
          <p>
            🔴 So regular cycling{' '}
            <strong>
              genuinely improves the reliability of such components, reducing the chance of a
              failure caused by stagnation well before the rated life has elapsed
            </strong>
            .
          </p>
          <p>
            That reframes the activity.{' '}
            <strong>
              A proof test is not only a measurement of condition. It is partly the maintenance
              itself
            </strong>
            &mdash; which means a test that passes has still achieved something, and a valve left
            unstroked for two years is deteriorating precisely because nothing has been done to it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-8-4-exercise"
          question="A solenoid valve on a rarely-used protective function is cycled during a routine test and operates correctly. What has the test achieved?"
          options={[
            'Two things: it confirmed the valve works, and the cycling itself reduces the chance of it sticking',
            'It has confirmed the valve for its remaining service life',
            'Only a record for the maintenance file',
            'Nothing — it was already working',
          ]}
          correctIndex={0}
          explanation="Confirmation is the expected benefit. The exercise is the additional one, and on a component that would otherwise sit motionless for another year it may be the more valuable of the two — a valve that sticks does so because it has not moved."
        />

        <SectionRule />
        <ContentEyebrow>🔴 The function that never runs</ContentEyebrow>

        <ConceptBlock
          title="A dormant trip is the hardest fault in this module"
          plainEnglish="A protective device that has failed looks exactly like one that works, because both do nothing."
          onSite="It is the perfect version of every silent failure this course has described."
        >
          <p>
            Module 8 Section 2 sorted symptoms by whether a fault announces itself or hides, and
            concluded that severity runs opposite to obviousness. A dormant protective function is
            where that reasoning reaches its limit.
          </p>
          <p>
            🔴 A trip, an interlock or a shutdown function spends nearly all its life{' '}
            <strong>doing nothing</strong>. That is correct behaviour. And{' '}
            <strong>
              a failed one also does nothing, so the two are indistinguishable by observation
            </strong>
            .
          </p>
          <p>Consider how badly it fits every technique in this module:</p>
          <ul>
            <li>
              <strong>No symptom to read.</strong> Section 2&rsquo;s triage has nothing to work on,
              because there is no signal behaving wrongly.
            </li>
            <li>
              <strong>Nothing to intercept.</strong> Section 1&rsquo;s method needs an output that
              should correspond to an input, and a dormant function has neither in normal service.
            </li>
            <li>
              <strong>No pattern to correlate.</strong> Section 3&rsquo;s approach needs
              occurrences, and there are none.
            </li>
          </ul>
          <p>
            🔴{' '}
            <strong>
              The only thing that distinguishes a working trip from a dead one is a deliberate test
            </strong>
            , and the alternative discovery mechanism is the demand it fails to answer &mdash; which
            is, by definition, the emergency it existed to handle.
          </p>
          <p>
            This is why proof testing protective functions is treated differently from maintaining
            anything else, and why Module 7 Section 6 was specific about what proving one means:{' '}
            <strong>
              driving the signal through the set-point and observing that the intended action
              actually occurs
            </strong>
            . A correctly configured set-point and an alarm on a screen both demonstrate that a
            number arrived. Neither demonstrates that anything happens as a result.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="How a critical instrument is actually proof tested"
          plainEnglish="Drive it across its whole range and watch what it does. The hard part is doing that to something in service."
          onSite="Partial testing is a compromise worth making rather than an excuse."
        >
          <p>
            The most direct approach is to{' '}
            <strong>
              drive the device out to the ends of what it is meant to handle and watch how it
              behaves
            </strong>
            . What that means in practice depends on the kind of device:
          </p>
          <AppendixTable
            caption="Proof testing by device type"
            headers={['Device', 'What the test consists of', 'What it must establish']}
            rows={[
              [
                'Process transmitter',
                'A full-range calibration check',
                'It responds correctly across the whole range, not at one point',
              ],
              [
                'Controller',
                'Driving the input signals through their ranges in combination',
                'The right outputs appear for the right inputs',
              ],
              [
                '🔴 Final control element',
                'Full stroking, plus leakage testing or an equivalent assessment',
                'It moves AND it has the intended effect on the process',
              ],
            ]}
            notes="The valve row carries the same distinction Module 7 Section 6 makes about trips: movement is not the same as effect."
          />
          <p>
            🔴 The obvious difficulty is{' '}
            <strong>
              how to perform tests this comprehensive without disturbing, or halting, the process
              the devices are running
            </strong>
            . Testing an out-of-service instrument is straightforward; testing one installed in a
            working system is another matter entirely.
          </p>
          <p>
            Shutdowns are the usual answer and they have a real drawback:{' '}
            <strong>
              tests carried out during a shutdown are less realistic than tests at normal operating
              pressures and temperatures
            </strong>
            . Testing under actual running conditions is the most realistic way to assess whether
            something is ready.
          </p>
          <p>
            One workable compromise is to{' '}
            <strong>test some components rather than all of them</strong>. Taking a transmitter out
            of service on a running process is relatively simple: put the controller into manual,
            let an operator hold the process while the transmitter is exercised, then return it.
          </p>
          <p>
            That is admittedly not comprehensive, and the honest framing is the useful one &mdash;{' '}
            <strong>
              proof testing some instruments is considerably better than proof testing none
            </strong>
            . Section 6 covers what putting a loop into manual on running plant actually involves,
            because it is a decision with consequences beyond the instrument.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 A test you cannot act on achieves very little"
          plainEnglish="Finding a failed component is only useful if you can replace it there and then."
          onSite="This is the part of a maintenance programme that gets funded last and undermines everything else."
        >
          <p>
            An important and frequently neglected part of any proof-testing programme is{' '}
            <strong>keeping a ready stock of spares for the components being tested</strong>.
          </p>
          <p>
            The reasoning is blunt.{' '}
            <strong>
              Proof testing is of little value if a component it reveals as failed cannot be
              repaired or replaced immediately
            </strong>
            . Without that, the test converts an unknown fault into a known one and leaves it in
            service &mdash; which is an improvement, but a much smaller one than it appears, and it
            is often quietly followed by the discovery being deferred.
          </p>
          <p>
            🔴 There is a refinement worth insisting on:{' '}
            <strong>
              held spares should already be configured with the parameters needed for immediate
              installation
            </strong>
            , or be trivially configurable. A spare transmitter in a box with default settings is
            not ready &mdash; and fitting it with the wrong range is precisely the fault Module 7
            Section 6 describes, where two ends of a loop disagree and the endpoints still match.
          </p>
          <p>
            The underlying pattern is worth naming because it is common:{' '}
            <strong>
              attention and money go to engineering and installing a system, and not to the support
              materials and infrastructure that keep it in good condition
            </strong>
            . A high-reliability system has needs beyond its own hardware, and this is one of them.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴🔴 The uncomfortable part</ContentEyebrow>

        <CommonMistake
          title="Treating maintenance as something that can only improve a system"
          whatHappens={
            <>
              <p>
                Maintenance is planned, resourced and carried out on the assumption that it makes
                things better. Work is done, boxes are closed, the plant runs on.
              </p>
              <p>
                🔴 What that assumption misses is structural rather than a matter of competence.{' '}
                <strong>
                  Every maintenance intervention disturbs a system that was working, and disturbance
                  can leave it different.
                </strong>
              </p>
              <p>
                This course has already supplied three examples without naming the pattern they
                share:
              </p>
              <ul>
                <li>
                  <strong>A barrier earth disconnected and not refitted</strong> during work in a
                  marshalling cabinet, per Module 7 Section 5 &mdash; a protective function removed
                  with no operational symptom whatever.
                </li>
                <li>
                  <strong>An isolating valve left shut</strong> after work on an impulse line, per
                  Section 2 &mdash; producing a plausible, stable, entirely wrong reading.
                </li>
                <li>
                  <strong>A connection temporarily restored by being disturbed</strong>, per Section
                  3 &mdash; where the investigation masked the fault it was looking for.
                </li>
              </ul>
              <p>
                None of those involved anybody doing anything obviously wrong. All three left the
                system worse than before the visit, and all three were <strong>silent</strong>{' '}
                &mdash; which puts maintenance-induced faults squarely in Section 2&rsquo;s
                dangerous category.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Hold both ideas at once:{' '}
                <strong>maintenance is necessary, and maintenance is a source of faults</strong>.
                Neither cancels the other, and accepting the second is what makes the first safe.
              </p>
              <p>Practically, that argues for a few habits:</p>
              <ul>
                <li>
                  <strong>Prove what you disturbed before you leave.</strong> If a loop was broken,
                  demonstrate it reads again. If an earth was disconnected, confirm it is refitted.
                  The check is quick and it catches the whole category.
                </li>
                <li>
                  <strong>Restore what you changed to get access</strong>, and be specific about it
                  &mdash; valves opened, links replaced, links removed. These are the items that get
                  forgotten because they were never the job.
                </li>
                <li>
                  <strong>Record what was disturbed, not just what was done.</strong> A future fault
                  on that loop is much easier to solve if it can be laid against a list of what was
                  touched.
                </li>
                <li>
                  🔴{' '}
                  <strong>
                    Treat a fault appearing shortly after maintenance as a strong lead.
                  </strong>{' '}
                  Section 1 made the general point that something which worked and then did not
                  usually had something happen to it, and a recorded visit is exactly such a
                  something.
                </li>
              </ul>
              <p>
                And it argues for proportion in the schedule itself. Maintenance that is performed
                because it is scheduled, on equipment with no evidence of deterioration, is not free
                &mdash; it consumes effort and it carries this risk. That is the argument for
                evidence-based intervals rather than habitual ones.
              </p>
            </>
          }
        />

        <InlineCheck
          id="ins-8-4-induced"
          question="A loop develops a fault four days after a maintenance visit to the marshalling cabinet it runs through. How should that timing be treated?"
          options={[
            'As coincidence, since the loop worked when the technician left',
            'As a strong lead — the visit is a known disturbance and the strongest candidate cause',
            'As evidence the original maintenance was inadequate',
            'As irrelevant unless the fault is in the cabinet',
          ]}
          correctIndex={1}
          explanation="Something that worked and then did not usually had something happen to it, and a documented intervention is the clearest available candidate. It does not establish that the visit caused the fault, but starting anywhere else means ignoring the best-evidenced hypothesis available."
        />

        <SectionRule />
        <ContentEyebrow>Maintenance worth doing</ContentEyebrow>

        <ConceptBlock
          title="Instrument air, and the things that degrade predictably"
          plainEnglish="Some things deteriorate in a known way on a known timescale. Those are what preventive maintenance is for."
          onSite="Wet instrument air is the classic example, and it damages everything downstream of it."
        >
          <p>
            The components that reward preventive maintenance are the ones that{' '}
            <strong>degrade predictably rather than failing randomly</strong>, and instrument air is
            the standard example in this trade.
          </p>
          <p>
            Compressed air is an excellent medium for transferring and storing mechanical energy,
            and it is used to power pneumatic instruments and valve actuators.{' '}
            <strong>
              Problems develop when water is allowed to collect in the air distribution system
            </strong>
            , and the consequences are cumulative rather than sudden: corrosion, blockages, and
            hydraulic locking within pneumatic devices.
          </p>
          <p>Which is why instrument air systems are built differently from utility air:</p>
          <ul>
            <li>
              <strong>Separate from the utility compressed air</strong> used for general tools and
              equipment.
            </li>
            <li>
              <strong>Different pipe materials</strong> &mdash; plastic, copper or stainless steel
              rather than black or galvanised iron &mdash; to avoid corrosion products entering the
              air.
            </li>
            <li>
              <strong>Dryers near the compressor</strong>, typically using a beaded desiccant to
              absorb water vapour, which is then periodically purged of the water it has retained.
            </li>
          </ul>
          <p>
            🔴 The maintenance item is the desiccant itself.{' '}
            <strong>
              After a period in service it must be physically removed and replaced with fresh
              material
            </strong>
            , because purging does not restore it indefinitely. It is a consumable with a
            predictable life, its degradation is gradual, and its failure damages everything
            downstream &mdash; which makes it close to an ideal candidate for scheduled replacement.
          </p>
          <p>
            The same reasoning identifies other candidates. Module 2 Section 7 established that pH
            electrodes are consumable items with a service life, and that increasing recalibration
            frequency is the classic sign of one nearing the end of it. Anything that wears,
            absorbs, fouls or dries out belongs in this category.
          </p>
          <p>
            A related idea worth knowing is <strong>de-rating</strong>: some components show an
            inverse relationship between how hard they are worked and how long they last, so running
            one below its rating extends its life. Electronic devices are the usual case, because
            temperature is a wear factor for semiconductors &mdash; a device that runs cooler lasts
            longer, all else being equal. It is a design decision rather than a maintenance one, but
            it is the same reliability argument applied earlier.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Telling evidence-based maintenance from ritual"
          plainEnglish="The test is not whether an activity is scheduled. It is whether its results could ever change anything."
          onSite="A record nobody reads is a cost with no return, and it is very common."
        >
          <p>
            Not everything labelled preventive maintenance earns its place, and it is worth having a
            way to tell. The distinction is not how often something is done or how well it is
            documented.{' '}
            <strong>
              It is whether the results are looked at, and whether they could ever change what
              happens next.
            </strong>
          </p>
          <p>
            Module 6 Section 5 makes precisely this argument about calibration intervals, and the
            observation it lands on generalises:{' '}
            <strong>
              an interval that has not changed in a decade suggests the data is being collected and
              never used
            </strong>
            . The activity continues, the records accumulate, and nothing about them influences
            anything.
          </p>
          <p>Three questions separate the two:</p>
          <ul>
            <li>
              <strong>Does it produce a result that varies?</strong> A check whose outcome is always
              &ldquo;satisfactory&rdquo; is either examining something that never changes or not
              examining it closely enough.
            </li>
            <li>
              <strong>Is the sequence looked at, or only the latest result?</strong> Module 7
              Section 7 made the same point about insulation resistance: a value that has fallen
              from tens of megohms to two is passing comfortably and telling you something, and only
              a series reveals it.
            </li>
            <li>
              <strong>Could a result change the schedule?</strong> If nothing found during the
              activity would ever cause the interval to shorten, lengthen or the item to be
              replaced, the activity is not informing a decision.
            </li>
          </ul>
          <p>
            None of that argues for doing less. It argues for the effort going where the evidence
            says it should &mdash; which, given the previous block, has a safety dimension as well
            as an economic one, because unnecessary intervention carries its own risk of leaving
            something different from how it was found.
          </p>
        </ConceptBlock>

        <Scenario
          title="A trip that has never been tested"
          situation={
            <>
              <p>
                A high-pressure trip on a vessel has been installed for six years. It has never
                operated in service, and there is no record of it having been function tested since
                commissioning. The transmitter feeding it is calibrated annually and every result
                has been satisfactory.
              </p>
              <p>
                Asked whether the trip works, the honest answer nobody wants to give is that nobody
                knows.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Start by being clear about what the calibration record does and does not establish,
                because it is the reason this has gone unnoticed.{' '}
                <strong>
                  Six years of satisfactory calibrations establish that the transmitter measures
                  pressure correctly. They establish nothing whatever about whether anything happens
                  when the trip point is passed.
                </strong>
              </p>
              <p>
                Those are different functions in different parts of the chain, and Module 7 Section
                6 drew exactly this line: an alarm appearing on a screen demonstrates that a number
                arrived and was compared correctly, and demonstrates nothing about the action.
              </p>
              <p>
                🔴 So the gap is real and it is the one this section is about.{' '}
                <strong>
                  A protective function that has never been demanded and never been tested has no
                  evidence of working at all
                </strong>
                &mdash; and the two mechanisms by which it could be found dead are a deliberate
                test, or the emergency it exists for.
              </p>
              <p>
                The six years also matter for the second reason in this section. Whatever final
                element the trip operates &mdash; a valve, a contactor, an interlock &mdash; has sat
                without moving throughout.{' '}
                <strong>
                  Inactivity is itself a cause of failure, so the probability of it being stuck is
                  not the same as it was on day one
                </strong>
                . The absence of testing has not merely left the condition unknown; it has made
                deterioration more likely.
              </p>
              <p>
                What follows is not a technician&rsquo;s decision alone. Testing it means driving
                the signal through the set-point and observing the action, which on a live vessel
                means either taking a deliberate trip or arranging a test that exercises the
                function without one &mdash; both operational decisions requiring the plant&rsquo;s
                agreement, and Section 6 covers what that involves.
              </p>
              <p>
                Two things are worth doing regardless.{' '}
                <strong>Establish whether spares exist</strong> for whatever the test might reveal
                as failed, because a test you cannot act on has limited value. And{' '}
                <strong>raise the absence of testing as a finding in its own right</strong>,
                separate from whatever the eventual test shows &mdash; six years without evidence is
                the issue, and it will apply to more than this one function.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Nothing here was neglected in a visible way. The transmitter was maintained, the
                records were kept, and every result was good. The maintenance programme addressed
                the part of the system that produces a measurement, and not the part that acts on
                it.
              </p>
              <p>
                That is the specific blind spot dormant functions create. They generate no symptoms,
                no alarms and no maintenance demands of their own, so a programme built around
                responding to evidence will never point at them &mdash; which is exactly why they
                have to be scheduled deliberately.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'How often should a protective function be proof tested?',
              answer:
                'The interval comes from the assessment governing that function rather than from a general rule, because it depends on what the function protects against and how much risk reduction it is being relied on to provide. What is worth understanding is the shape of the reasoning, which is the same one Module 6 Section 5 applies to calibration: the interval balances how likely the item is to fail undetected against what its failure would cost. The difference for a dormant function is that the failure is silent, so the interval is doing more work — it is the only mechanism by which a failure gets found.',
            },
            {
              question: 'Is preventive maintenance always worth doing?',
              answer:
                'No, and treating it as automatically virtuous is how it turns into ritual. It is an exchange, so it is worth doing when the cost of the intervention is smaller than the cost of the failure it prevents, weighted by how likely that failure is. Where a component fails randomly rather than wearing out, replacing it early may buy very little, and the previous section adds a real consideration on the other side of the ledger: an intervention on working equipment carries its own risk of leaving something different. That is an argument for directing effort by evidence, not for doing less of it.',
            },
            {
              question: 'Can a proof test be done without disturbing the process?',
              answer:
                'Rarely in full, and partially quite often, which is the practical compromise worth understanding. A comprehensive test drives a device across its whole range, and a device in service is controlling something — so the two aims conflict directly. Taking one instrument out of the control decision at a time, with the controller in manual and an operator holding the process, allows a genuine test of that instrument without a full shutdown. It is not comprehensive and it is a great deal better than nothing, which is the honest position to take rather than treating partial testing as a failure.',
            },
            {
              question: 'Why does testing during a shutdown count for less?',
              answer:
                'Because the conditions are not the ones the equipment has to work in. A plant at ambient temperature and pressure is a different environment from one running normally, and a device that behaves correctly cold may behave differently hot, or vice versa — Module 4 Section 3 covers ambient conditions among the causes of drift. Shutdown testing is often the only opportunity for tests that genuinely cannot be done live, so it remains valuable. It is simply worth recording what conditions a test was performed under, so that a later comparison is between like and like.',
            },
            {
              question: 'What should be replaced on a schedule rather than on failure?',
              answer:
                'The items that degrade predictably rather than failing randomly, and where the degradation affects more than the item itself. Desiccant in an instrument air dryer is the standard case: it has a finite capacity, it deteriorates gradually, and letting it fail admits moisture that damages every pneumatic device downstream. Consumable sensors are another — Module 2 Section 7 covers pH electrodes, where increasing recalibration frequency signals a probe approaching the end of its life. The common features are a known wear-out mechanism and a consequence that spreads.',
            },
            {
              question: 'How do I know whether our maintenance is achieving anything?',
              answer:
                'Ask whether the results are ever used, which is a more searching question than whether the work is done. If every check for five years has been recorded as satisfactory and nothing has been adjusted, replaced or rescheduled as a result, the activity is not currently informing any decision. That is not proof it is worthless — it may be genuinely preventing failures — but it does mean nobody could tell the difference if it stopped. Intervals that move in response to findings, and records that are compared as a series rather than filed individually, are the signature of a programme doing something.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Preventive maintenance means repairing or replacing before failure — an up-front cost against a larger cost later.',
            '🔴 Running to failure is rational until the consequence of failure becomes unacceptable. That is the decision.',
            'Domestic bulbs are replaced when they fail; traffic signal bulbs before wear-out. Same component, different consequence.',
            'Sort instruments the same way: indication, measurement driving control, and protective function deserve different treatment.',
            'Scheduling needs some idea of component lifetime, from failure history and cost — the reasoning M6.5 develops for calibration intervals.',
            '🔴 Proof testing improves reliability two ways: early detection of developing problems, AND regular exercise.',
            '🔴 Inactivity causes failure — solenoid valves stick, bearings corrode and seize, batteries fail from non-use.',
            'So cycling a component reduces stagnation failures well before rated life. A test that passes has still achieved something.',
            '🔴 A dormant trip is the hardest fault here: a failed one and a working one both do nothing.',
            'No symptom to read, nothing to intercept, no pattern to correlate — every technique in this module is defeated.',
            'Only a deliberate test separates them; the alternative is the emergency it existed to handle.',
            'Proving a protective function means observing the ACTION, not the alarm (M7.6).',
            'Proof testing means full-range stimulation: a calibration check, or full stroking plus proof of effect for a valve.',
            'The difficulty is testing without disturbing the process. Shutdown tests are less realistic than running conditions.',
            'Partial testing — controller to manual, one instrument at a time — beats testing nothing.',
            '🔴 Spares must be held AND pre-configured, or a test that finds a fault leaves it in service.',
            '🔴🔴 Maintenance causes faults. Every intervention disturbs something that was working, and the results are usually silent.',
            'The course’s own examples: a barrier earth left off, an isolating valve left shut, a connection restored by disturbance.',
            'So prove what you disturbed before you leave, and treat a fault soon after a visit as a strong lead.',
            'Instrument air is the classic PM case — wet air causes corrosion, blockage and hydraulic locking downstream.',
            'Desiccant is a consumable with a predictable life whose failure damages everything after it. So are pH electrodes (M2.7).',
            'Evidence-based maintenance produces results somebody looks at as a series. Ritual produces records nobody uses.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 8.4" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Intermittent faults
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              When the instrument is right
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule8Section4;
