/**
 * Module 8 · Section 1 — A systematic approach to fault diagnosis
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING — verified by grep BEFORE writing, not after. The scientific
 * method as applied to diagnosis is WHOLLY UNCOVERED in Modules 1-7:
 * "hypothes*" 0 hits, "Occam" 0, "scientific method" 0, "Easter" 0. This page
 * owns the METHOD. What it must NOT re-teach:
 *   M6.2 — the loop calibrator and the substitution technique (65 mentions).
 *          Reference it as the tool the method uses; never explain it again.
 *   M5.4 — localising a CONTROL fault to one of four loop elements, and the
 *          phase relationship that names an over-tuned term. Different domain.
 *   M7.1 — loop diagrams. The "use the documentation" mistake points there.
 *   M7.6 — commissioning in stages. The "test in stages" mistake connects.
 *   M4.4 — measurement-equipment pitfalls (phantom voltage). Gathering data
 *          has its own traps and M4.4 owns them.
 *
 * 🔴 THE ORGANISING PRINCIPLE, straight from source and genuinely powerful:
 * every instrument has at least one input and at least one output, and the
 * output should correspond to the input according to that instrument's design
 * function. If it does not, that instrument is faulty. A loop chains them —
 * one device's output feeds the next device's input — so INTERCEPTING between
 * components is what locates a fault. That makes bisection a consequence of
 * how loops are built rather than a trick to memorise.
 *
 * 🔴🔴 THE BEST CONTENT ON THE PAGE — what makes a test GOOD. A test must
 * challenge a hypothesis, not merely collect more evidence for it. Two
 * questions:
 *     "If this hypothesis is TRUE, what else should I see if I look?"
 *     "If this hypothesis is FALSE, what should I NOT see if I look?"
 * An ideal test answers both at once, giving positive AND negative evidence.
 * Nothing else in the course teaches how to design a test.
 *
 * 🔴 EASTER-EGGING — the anti-method: checking every component you can think
 * of, serially, with no reasoning, like children hunting hidden eggs. Source
 * attributes the term to a colleague, so present it as a term that circulates
 * in the trade — do NOT attribute it to a named individual.
 *
 * 🔴 OCCAM'S RAZOR — a single fault is likelier than coincidental faults, so
 * enter assuming ONE thing is wrong unless data says otherwise. This is a
 * probability argument, not a law, and the page says so. It also explains why
 * testing in stages matters: multi-fault scenarios are far harder.
 *
 * 🔴 THE FOUR COMMON MISTAKES (source §34.7): failing to gather data; failing
 * to use documentation; fixating on the first hypothesis; failing to build and
 * test in stages.
 *
 * ⚠️ CC BY source — shingle-scanned to ZERO 9-word overlaps. Keep it that way.
 * ⚠️ Do NOT invent standards, statistics or named individuals.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §13.7 (every instrument has inputs and outputs; intercepting data between
 * components locates faults), §34.6 (the diagnostic mind-set; the scientific
 * method; designing a test that challenges rather than confirms; Easter-egging;
 * Occam's Razor and the single-fault assumption), §34.7 (the four common
 * diagnostic mistakes). Extracted to scratchpad/src/m8_scientific.txt,
 * m8_mistakes.txt, m8_loopprinciple.txt.
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

const TITLE = 'A systematic approach to fault diagnosis | Instrumentation Module 8.1 | Elec-Mate';
const DESCRIPTION =
  'Why every instrument is a box with an input and an output, how that makes fault finding a matter of interception rather than inspection, and how to design a test that challenges a hypothesis instead of flattering it.';

const outcomes = [
  '🔴 State the principle that makes an instrument loop diagnosable at all',
  'Explain why intercepting between devices locates a fault',
  'Apply the observe–hypothesise–test–validate cycle to a loop',
  '🔴 Design a test that could disprove your hypothesis, not just support it',
  'Say what is wrong with checking components one at a time',
  '🔴 Explain why you should assume one fault until the data says otherwise',
  'Name the four diagnostic mistakes and say what each costs',
  'Say why the thinking is done on the drawing and not on the plant',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 What is the principle that makes an instrument loop diagnosable?',
    options: [
      'Every instrument takes something in and puts something out, and what comes out should match what went in by design',
      'Every fault produces a visible symptom',
      'Every instrument can be replaced with a known-good one',
      'Every loop carries 4–20 mA',
    ],
    correctIndex: 0,
    explanation:
      'That correspondence is what makes a device checkable in isolation. If an instrument’s output does not match what its input should produce according to its design function, something is wrong with that instrument — and you have not had to understand the whole system to establish it.',
  },
  {
    id: 2,
    question: 'Why does that principle make interception the natural diagnostic move?',
    options: [
      'Because test equipment is designed for it',
      'Because one device’s output is the next device’s input, so measuring between them tests both at once',
      'Because it is faster than replacing components',
      'Because the loop must be broken to measure current',
    ],
    correctIndex: 1,
    explanation:
      'A loop is a chain of boxes, each converting an input into an output. The signal passing between any two of them is simultaneously the first one’s output and the second one’s input, so a single measurement there tells you whether everything upstream is behaving and whether everything downstream is being fed correctly.',
  },
  {
    id: 3,
    question: 'What are the steps of the diagnostic cycle?',
    options: [
      'Check the supply, check the cable, check the device',
      'Inspect, replace, retest, record',
      'Observe effects, form hypotheses, design a test, perform it, validate or invalidate, repeat',
      'Isolate, prove dead, test, reconnect',
    ],
    correctIndex: 2,
    explanation:
      'It is the scientific method applied to a plant. The point is not the ritual but the loop: each pass should leave you with less uncertainty than you started with, which only happens if the test was capable of changing your mind.',
  },
  {
    id: 4,
    question: '🔴 What makes a test a good test rather than just another measurement?',
    options: [
      'It can be performed without stopping the plant',
      'It is quick to carry out',
      'It uses calibrated equipment',
      'It genuinely challenges the hypothesis rather than only gathering more support for it',
    ],
    correctIndex: 3,
    explanation:
      'A test that can only ever agree with you is not a test. The useful question is what result would force you to abandon the idea — and if no possible result would, the test is not worth performing.',
  },
  {
    id: 5,
    question: '🔴 Which pair of questions helps design a rigorous test?',
    options: [
      'If this is true what else should I see, and if it is false what should I not see?',
      'Has this happened before, and who worked on it last?',
      'Is the instrument in calibration, and is the cable sound?',
      'How long will it take, and what will it cost?',
    ],
    correctIndex: 0,
    explanation:
      'The first question hunts for positive evidence and the second for negative. A test that answers both at once is the strongest kind, because whichever way it comes out you have learned something definite rather than merely collected another reading.',
  },
  {
    id: 6,
    question: 'What is “Easter-egging” in a diagnostic context?',
    options: [
      'Leaving a fault for the next shift',
      'Checking every component you can think of, one after another, with no reasoning behind the order',
      'Testing only the components that failed last time',
      'Replacing parts until the fault clears',
    ],
    correctIndex: 1,
    explanation:
      'The image is children searching randomly for hidden eggs, because an egg could be anywhere and there is no way to reason about where. A technician with no information about the fault searches the same way — and it is slow, expensive, and may never succeed at all.',
  },
  {
    id: 7,
    question: '🔴 What does Occam’s Razor suggest when you begin a diagnosis?',
    options: [
      'Always suspect the instrument before the process',
      'The most recent change is always the cause',
      'Assume a single fault accounts for the symptoms, unless the data conclusively says otherwise',
      'The simplest component is the most likely to fail',
    ],
    correctIndex: 2,
    explanation:
      'It is a probability argument rather than a law: one fault is more likely than several coincidental ones. It gives you a sane starting assumption, and it is meant to be abandoned the moment evidence contradicts it.',
  },
  {
    id: 8,
    question:
      'Why is a system with two simultaneous faults so much harder than one with a single fault?',
    options: [
      'Test equipment cannot detect two faults',
      'It takes twice as long',
      'The faults are usually related',
      'Each fault can mask or distort the symptoms of the other, so tests give confusing results',
    ],
    correctIndex: 3,
    explanation:
      'With one fault, a test result maps cleanly onto a conclusion. With two, a test can come out healthy because one fault is compensating for the other, or come out wrong for a reason unconnected to the hypothesis being examined — which is why the single-fault assumption is worth protecting by building and testing in stages.',
  },
  {
    id: 9,
    question: 'What counts as “gathering data” during a diagnosis?',
    options: [
      'Measurements, indicator lights, stimulating the system and watching the response, your other senses, and writing it down',
      'Reading the maintenance history',
      'Asking the operators what changed',
      'Only readings taken with calibrated test equipment',
    ],
    correctIndex: 0,
    explanation:
      'Anything that reduces uncertainty is data. Smell, sound and heat have all located faults that no meter was pointed at, and stimulating a system to see how it responds often tells you more than passively measuring it. Writing it down is part of the activity rather than an afterthought.',
  },
  {
    id: 10,
    question: '🔴 Where should the reasoning about signal paths be done?',
    options: [
      'On the plant, tracing the actual cables',
      'On the drawing — go to the plant to execute a test, not to work out what to test',
      'From memory, once you know the system',
      'With the manufacturer on the phone',
    ],
    correctIndex: 1,
    explanation:
      'A diagram lays the signal paths out cleanly for exactly this purpose. Tracing them through real cable trays instead means solving the fault and untangling the layout at the same time — two hard problems where the drawing offered you one.',
  },
  {
    id: 11,
    question:
      'A hypothesis has been tested and the result contradicts it. What is the correct response?',
    options: [
      'Continue on the basis that the hypothesis is probably still right',
      'Repeat the test until it agrees',
      'Abandon the hypothesis and form another from what the result actually showed',
      'Assume the test equipment is faulty',
    ],
    correctIndex: 2,
    explanation:
      'Willingness to abandon an idea on contrary evidence is the trait the whole method rests on. A contradicted hypothesis is a successful test, not a wasted one — it has removed a possibility, which is exactly what you were trying to do.',
  },
  {
    id: 12,
    question:
      'Why consult the technical literature on an unfamiliar component your tests have implicated?',
    options: [
      'To check whether it is still in warranty',
      'Because the diagram will not show it',
      'To find the manufacturer’s contact details',
      'A few minutes of reading can save hours of fruitless diagnosis on a device you do not understand',
    ],
    correctIndex: 3,
    explanation:
      'Complex devices — controllers, PLCs, drives, acquisition modules — behave in ways you cannot deduce from the outside. Diagnosing one without knowing what it is supposed to do is guessing with extra steps, and locating information quickly in a dense document is a genuine trade skill.',
  },
];

const InstrumentationModule8Section1 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 8 · Section 1"
        title="Systematic fault diagnosis"
        backTo="/electrician/upskilling/instrumentation-module-8"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Most of the difference between a fast diagnosis and a long one is decided before anybody
          picks up a meter.
        </p>

        <TLDR
          points={[
            '🔴 Every instrument takes something in and puts something out, and what emerges should match what entered, by design.',
            'If it does not, that instrument is faulty — and you established it without understanding the whole system.',
            'A loop chains those boxes: one device’s output is the next device’s input.',
            '🔴 So a measurement taken between two devices tests both at once. That is why interception locates faults.',
            'The cycle is: observe, hypothesise, design a test, perform it, validate or invalidate, repeat.',
            '🔴 The hard part is designing a test that could prove you WRONG, not one that agrees with you.',
            '🔴 Two questions build one: if this is true what else should I see — and if false, what should I not see?',
            'A test that answers both gives positive and negative evidence at once.',
            'The anti-method is “Easter-egging”: checking everything you can think of, in no particular order, for no particular reason.',
            '🔴 Occam’s Razor: assume ONE fault until the data says otherwise. Two faults mask each other and make every test ambiguous.',
            'Four mistakes cost the most: no data, no documentation, fixating on the first idea, and not testing in stages.',
            '🔴 Do the thinking on the drawing. Go to the plant to execute a test, not to work out what to test.',
            'Gathering data includes your senses and stimulating the system — not only meter readings.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 Why a loop can be diagnosed at all</ContentEyebrow>

        <ConceptBlock
          title="Every instrument is a box with an input and an output"
          plainEnglish="Each device takes something in and puts something out. If what comes out does not match what went in, that device is the problem."
          onSite="This one sentence is what turns fault finding from searching into checking."
        >
          <p>
            Before any technique, there is a principle that makes the whole activity possible, and
            it is worth stating plainly because everything else follows from it.
          </p>
          <p>
            🔴{' '}
            <strong>
              Every instrument takes something in and puts something out. What emerges should match
              what entered, in the way that device was designed to transform it &mdash; and where it
              does not, that device is the thing at fault.
            </strong>
          </p>
          <p>
            That is a small claim with large consequences. It means{' '}
            <strong>any device in the chain can be judged on its own terms</strong>, without
            understanding the plant, the process, or what the rest of the loop is up to. A
            transmitter takes a physical measurement and puts out a current. A controller takes a
            current and puts out another. An I/P converter takes a current and puts out a pressure.
            A valve takes a pressure and puts out a position. Each one is checkable in isolation.
          </p>
          <p>
            Now add the second half.{' '}
            <strong>In a loop, the output of one instrument feeds the input of the next</strong>{' '}
            &mdash; information passes along the chain. So the signal travelling between any two
            devices is two things at once: the first device&rsquo;s output, and the second
            device&rsquo;s input.
          </p>
          <p>
            🔴 Which is why{' '}
            <strong>intercepting that signal is the fundamental diagnostic move</strong>. One
            measurement between two devices answers two questions simultaneously &mdash; whether
            everything upstream has done its job, and whether everything downstream is being given
            what it needs.
          </p>
          <p>
            That reframes bisection from a clever trick into an obvious consequence of how loops are
            built. Module 6 Section 2 covered the tool that does it and why each substitution
            divides the system in two; this is the reason the division works at all.
          </p>
          <p>
            It also sets the precondition.{' '}
            <strong>
              To read an intercepted signal you have to know what the devices either side of it are
              supposed to do with it
            </strong>{' '}
            &mdash; which is why an unfamiliar component stops a diagnosis dead until you have read
            about it, and why Module 7 Section 1 spent a section on the drawing that tells you what
            is in the chain.
          </p>
        </ConceptBlock>

        <Pullquote>
          You are not looking for a broken thing. You are looking for the first place where what
          came out stopped matching what went in.
        </Pullquote>

        <InlineCheck
          id="ins-8-1-intercept"
          question="A loop runs transmitter → barrier → controller input. You measure the current between the barrier and the controller and find it correct for the process condition. What has that single measurement established?"
          options={[
            'That the transmitter and barrier are both behaving — so the fault lies downstream',
            'That the loop has no fault',
            'Nothing until you measure at the transmitter as well',
            'That the controller is faulty',
          ]}
          correctIndex={0}
          explanation="The signal at that point is the barrier's output and the controller's input at the same time. A correct value there means everything that produced it has worked, and that what follows is being fed properly — so one measurement has cleared two devices and the cable between them."
        />

        <SectionRule />
        <ContentEyebrow>The cycle</ContentEyebrow>

        <ConceptBlock
          title="Observe, explain, test, and be prepared to be wrong"
          plainEnglish="Notice what is happening, think of what could cause it, then find a way to check — and mean it."
          onSite="The steps are unremarkable. Doing them in order, deliberately, is what separates fast diagnosis from slow."
        >
          <p>
            There is no algorithm that solves faults. What there is, is a way of reasoning that
            reliably narrows things down, and it is the same method science uses to work out causes
            from effects:
          </p>
          <ul>
            <li>
              <strong>Observe the effects</strong> &mdash; what is actually happening, as opposed to
              what was reported.
            </li>
            <li>
              <strong>Form hypotheses</strong> &mdash; explanations that would account for those
              observations. Plural, deliberately.
            </li>
            <li>
              <strong>Design a test</strong> for one or more of them.
            </li>
            <li>
              <strong>Perform it and collect the data.</strong>
            </li>
            <li>
              <strong>Validate or invalidate</strong> the hypotheses against what you found.
            </li>
            <li>
              <strong>Repeat</strong> until the cause is identified.
            </li>
          </ul>
          <p>
            The mind-set that makes it work is not complicated either, though it is easier to
            describe than to maintain at four in the afternoon on a cold plant:{' '}
            <strong>
              curiosity, persistence, attention to detail, checking your conclusions, checking your
              assumptions, and a willingness to abandon an idea when the evidence goes against it
            </strong>
            .
          </p>
          <p>
            That last one is the one that actually costs something, and the rest of this page is
            largely about protecting it.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Designing a test worth performing</ContentEyebrow>

        <ConceptBlock
          title="A test must be able to prove you wrong"
          plainEnglish="If no possible result would change your mind, you are not testing — you are collecting reassurance."
          onSite="This is the single most useful idea on the page, and it costs nothing to apply."
        >
          <p>
            The genuinely difficult step in that cycle is designing the test, and the difficulty is
            not technical. It is that{' '}
            <strong>
              a test has to challenge the hypothesis rather than merely gather more support for it
            </strong>
            .
          </p>
          <p>
            The failure is easy to fall into and hard to notice. You believe the transmitter is at
            fault, so you check the transmitter, and it looks a bit suspect, which confirms it. That
            sequence can run all afternoon without ever putting the belief at risk.
          </p>
          <p>
            🔴 Two questions turn a measurement into a test, and the second is the one usually
            skipped:
          </p>
          <AppendixTable
            caption="Building a test that can settle the question"
            headers={['Question', 'What it looks for', 'What it gives you']}
            rows={[
              [
                'If this hypothesis is TRUE, what else should I see if I look for it?',
                'Consequences that must be present',
                'Positive evidence',
              ],
              [
                '🔴 If this hypothesis is FALSE, what should I NOT see if I look for it?',
                'Consequences that must be absent',
                'Negative evidence',
              ],
            ]}
            notes="A test that answers both at once is the strongest available, because either outcome is conclusive rather than merely encouraging."
          />
          <p>
            Worked through, it changes what you go and do. Suppose the hypothesis is that a loop is
            saturating because the supply cannot drive it to full scale, which Module 7 Section 3
            covered.
          </p>
          <ul>
            <li>
              <strong>If true</strong>, the reading should track correctly at low values and flatten
              near the top &mdash; and the terminal voltage at the transmitter should be at its
              minimum when it flattens.
            </li>
            <li>
              <strong>If false</strong>, the flattening should not correlate with current, and the
              terminal voltage should have headroom at the point the signal stops rising.
            </li>
          </ul>
          <p>
            One trip with a meter now answers both. Compare that with &ldquo;measure the loop
            current and see&rdquo;, which produces a number and no conclusion.
          </p>
          <p>
            The habit worth building is a single question asked before every test:{' '}
            <strong>what result would make me abandon this idea?</strong> If there is no such
            result, the test is not worth doing and something else should be done instead.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-8-1-test"
          question="You suspect a screen has been earthed at both ends, causing noise. Which is the better test?"
          options={[
            'Look at the screen termination at the panel and confirm it is earthed there',
            'Check for continuity between the screen and earth at the end that should be free — a result either way is conclusive',
            'Replace the cable and see whether the noise stops',
            'Measure the noise amplitude and record it',
          ]}
          correctIndex={1}
          explanation="Confirming the intended earth exists tells you nothing, because it would be there whether the hypothesis is right or wrong. Testing the end that is supposed to be isolated is the measurement whose two possible outcomes point in opposite directions — which is exactly what makes it a test."
        />

        <SectionRule />
        <ContentEyebrow>The anti-method</ContentEyebrow>

        <ConceptBlock
          title="Easter-egging, and why it is slow"
          plainEnglish="Checking everything you can think of, in no particular order, because the fault could be anywhere."
          onSite="It feels like work and it often is work. It is just not diagnosis."
        >
          <p>
            There is a term that circulates in the trade for the opposite of everything above, and
            the image it conjures is exact: <strong>Easter-egging</strong>.
          </p>
          <p>
            Children hunting for hidden eggs on Easter morning search randomly, and they are right
            to &mdash; an egg genuinely could be anywhere, and there is no way to reason about
            where. So they look everywhere they can think of, in whatever order occurs to them.
          </p>
          <p>
            🔴{' '}
            <strong>
              A technician who has not gathered information about a fault is in exactly that
              position, and searches exactly that way
            </strong>{' '}
            &mdash; checking each component in turn because any of them could be the problem. It is
            slow, it consumes effort out of proportion to what it finds, and it may not succeed at
            all.
          </p>
          <p>
            The important thing is that it is not caused by laziness. It is caused by{' '}
            <strong>starting to look before starting to think</strong>, which usually happens under
            pressure, when a plant is down and doing something visible feels better than standing
            still with a drawing.
          </p>
          <p>
            The cure is not to work harder but to spend the first few minutes differently.{' '}
            <strong>
              Even a small amount of data gathered early can transform how quickly the rest goes
            </strong>
            , because it converts a search with no structure into a set of possibilities that can be
            ranked and tested.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Assume one fault until the data says otherwise"
          plainEnglish="Several things breaking at once is much less likely than one thing breaking. Start there."
          onSite="And protect the assumption by not creating situations where it is false."
        >
          <p>
            A useful principle when weighing explanations is that{' '}
            <strong>
              the simplest one that accounts for the observations is usually the right one
            </strong>
            . Applied to a faulted system it means something specific:{' '}
            <strong>
              one fault explains a set of symptoms far more often than several unrelated ones
              happening to arrive together
            </strong>
            , so it is sound practice to begin on the assumption that only one thing is wrong.
          </p>
          <p>
            This is a probability argument rather than a law, and it is meant to be dropped the
            moment evidence contradicts it. Its value is that it gives you a starting point that is
            usually right, which is a great deal better than having no starting point at all.
          </p>
          <p>
            🔴 The reason it matters so much is what happens when it is false.{' '}
            <strong>
              Two simultaneous faults are far harder to diagnose than one, because each can mask or
              distort the symptoms of the other.
            </strong>{' '}
            A test comes back healthy because one fault is compensating for another; a reading is
            wrong for a reason that has nothing to do with the hypothesis you were examining. The
            clean mapping between test result and conclusion breaks down, and with it most of the
            method on this page.
          </p>
          <p>
            Which produces a practical instruction that sounds like it belongs elsewhere but belongs
            here:{' '}
            <strong>
              when you assemble something new, test it in stages rather than building it completely
              and testing at the end
            </strong>
            . The number of mistakes available while assembling a system is large, so the chance of
            making more than one is real &mdash; and testing only at the end is choosing to meet
            them all simultaneously.
          </p>
          <p>
            Module 7 Section 6 made the same argument from the commissioning side. Here it has a
            second justification: staged testing is how you keep the single-fault assumption true,
            and the single-fault assumption is what makes everything diagnosable.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>What costs the most time</ContentEyebrow>

        <ConceptBlock
          title="Four mistakes, and what each one does to you"
          plainEnglish="Not gathering data, not reading the drawing, falling in love with your first idea, and building everything before testing any of it."
          onSite="None of them is a knowledge gap. All four are habits."
        >
          <AppendixTable
            caption="The four expensive diagnostic mistakes"
            headers={['Mistake', 'What it looks like', 'What it costs']}
            rows={[
              [
                '🔴 Failing to gather data',
                'Looking for the fault before measuring anything',
                'Easter-egging — an unstructured search that may never converge',
              ],
              [
                'Failing to use documentation',
                'Tracing real cables instead of reading the drawing',
                'Solving the fault and untangling the layout at the same time',
              ],
              [
                '🔴 Fixating on the first hypothesis',
                'Testing one idea repeatedly instead of comparing several',
                'Long stretches spent proving something that was never true',
              ],
              [
                'Not testing in stages',
                'Assembling a whole system, then powering it up',
                'A multi-fault scenario, where tests stop being conclusive',
              ],
            ]}
            notes="They compound: no data leads to a weak first hypothesis, which is then easier to fixate on."
          />
          <p>
            The first deserves expanding, because &ldquo;gather data&rdquo; sounds narrower than it
            is. It means anything that reduces uncertainty:
          </p>
          <ul>
            <li>
              <strong>Measurements</strong> with whatever is appropriate &mdash; and Module 4
              Section 4 covered how the instrument you choose can mislead you.
            </li>
            <li>
              <strong>Indicator lights and displays</strong> on the equipment itself, which often
              encode more than people realise.
            </li>
            <li>
              <strong>Stimulating the system and watching the response</strong>, which frequently
              tells you more than passive measurement.
            </li>
            <li>
              <strong>Your other senses.</strong> Smell, sound and heat have all located faults that
              no meter was pointed at.
            </li>
            <li>
              <strong>Writing it down as you go</strong>, so results can be compared rather than
              remembered.
            </li>
          </ul>
        </ConceptBlock>

        <CommonMistake
          title="🔴 Fixating on the first hypothesis"
          whatHappens={
            <>
              <p>
                A symptom appears and an explanation arrives with it, usually within seconds and
                usually from experience &mdash; the last time something looked like this, it was the
                transmitter. So the transmitter gets checked. Then checked more thoroughly. Then
                swapped.
              </p>
              <p>
                Each step feels like progress because each one is genuine work. What none of them
                does is compare the idea against any other idea, so the diagnosis has no mechanism
                for discovering that it started in the wrong place.
              </p>
              <p>
                🔴 The damage is compounded by the sunk cost. An hour into examining a device, it
                becomes progressively harder to conclude that it was never the problem &mdash; and
                experienced technicians are more exposed to this than beginners, not less, because a
                strong first instinct is usually right and therefore rarely questioned.
              </p>
              <p>
                It is only after a great deal of time has gone into one failed hypothesis that other
                possibilities and other tests get considered at all.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Make the plural deliberate.{' '}
                <strong>
                  Brainstorm several hypotheses that would account for the symptoms before designing
                  any test
                </strong>
                , then look for the test that discriminates between the most of them in the fewest
                steps.
              </p>
              <p>That changes what a good test looks like:</p>
              <ul>
                <li>
                  <strong>Prefer a test that divides the candidates</strong> over one that examines
                  a single candidate closely. A measurement in the middle of a chain eliminates half
                  of it; a detailed inspection of one device eliminates one device.
                </li>
                <li>
                  <strong>Ask what would refute the leading idea</strong>, not what would confirm
                  it, before going out to the plant.
                </li>
                <li>
                  <strong>Write the candidates down.</strong> An idea that stays in your head
                  competes unfairly with one that was never articulated.
                </li>
              </ul>
              <p>
                There is no need to distrust an experienced instinct &mdash; it is usually the right
                place to start. The discipline is simply that{' '}
                <strong>it starts as one hypothesis among several rather than as the answer</strong>
                , and that the first test performed is one capable of knocking it down.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Think on the drawing</ContentEyebrow>

        <ConceptBlock
          title="Go to the plant to execute a test, not to work out what to test"
          plainEnglish="The drawing lays the signal paths out cleanly. Real cable trays do not."
          onSite="Every minute of reasoning done in front of a drawing is a minute not spent tracing cable."
        >
          <p>
            Diagrams are the map, and Module 7 Section 1 covered what a loop diagram carries that
            nothing else does &mdash; every terminal, every junction box, every device the signal
            passes through. Obtaining the right drawing is a first step rather than a courtesy.
          </p>
          <p>
            But there is a second half that gets missed far more often than the first.{' '}
            <strong>Having found the drawing, do the reasoning on it</strong>.
          </p>
          <p>
            The common failure is to glance at a diagram, set it down, and then work out fault
            possibilities by tracing actual wires through actual trunking. That converts one hard
            problem into two:{' '}
            <strong>
              you are now reasoning about the fault and mentally untangling the physical layout at
              the same time
            </strong>
            , and the second job is difficult enough on its own in a full marshalling cabinet.
          </p>
          <p>
            A drawing is laid out cleanly and logically precisely so that signal flow is easy to
            follow. Rejecting it in favour of the real system adds complexity that nobody asked for.
          </p>
          <p>
            So the division of labour is worth making explicit:{' '}
            <strong>
              all the diagnostic thinking happens in front of the drawing, and you go to the plant
              when it is time to carry out a test you have already designed.
            </strong>
          </p>
          <p>
            The same argument extends to unfamiliar equipment. If a test has implicated a device you
            do not know well &mdash; a controller, a PLC, a drive, an acquisition module &mdash;{' '}
            <strong>
              a few minutes reading its documentation can save hours of fruitless work
            </strong>
            , because you cannot judge whether an output corresponds correctly to an input without
            knowing what the device is supposed to do with it. Finding what you need quickly in a
            dense technical document is a trade skill worth practising deliberately.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-8-1-single-fault"
          question="Midway through a diagnosis, a test that should have been conclusive gives a result consistent with neither remaining hypothesis. What is worth considering?"
          options={[
            'The symptoms were reported wrongly',
            'The test was performed incorrectly and should be repeated identically',
            'The single-fault assumption may be false — two faults can produce results that fit nothing',
            'The instrument is out of calibration',
          ]}
          correctIndex={2}
          explanation="A result that fits no hypothesis is information in its own right. Two faults interacting can produce exactly that, because each distorts the evidence for the other — and recognising it early is far cheaper than continuing to test as though one explanation must account for everything."
        />

        <Scenario
          title="A plant is down and everyone is watching"
          situation={
            <>
              <p>
                A level control loop has stopped working and the vessel it serves has had to be
                taken off line. Production want a time. The operator says it was reading fine
                yesterday and now shows nothing.
              </p>
              <p>
                Two technicians are available. One suggests starting at the transmitter because a
                similar loop failed that way last year.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Resist the pull to start moving, which under this much attention is considerable.
                Standing still with a drawing looks like inactivity and is the fastest thing
                available.
              </p>
              <p>
                <strong>Get the loop diagram first</strong> and establish what is actually in the
                chain &mdash; how many devices, how many junction boxes, where the accessible break
                points are. Module 7 Section 1 covers reading it; the relevant part here is that it
                tells you where a measurement would divide the problem most usefully.
              </p>
              <p>
                <strong>Then list what could produce &ldquo;shows nothing&rdquo;</strong>, plural
                and deliberately: loss of loop supply, an open circuit anywhere in the chain, a
                failed transmitter, a failed input card, or a device disturbed by whatever else has
                been worked on recently. The colleague&rsquo;s suggestion is a reasonable candidate
                and it is one candidate.
              </p>
              <p>
                🔴{' '}
                <strong>
                  Now pick the test that divides the list rather than the one that examines its
                  favourite.
                </strong>{' '}
                A single current measurement at a mid-chain junction box separates everything
                upstream from everything downstream in one trip. Walking to the transmitter examines
                one candidate and eliminates nothing else.
              </p>
              <p>
                Ask the refuting question before going out: if the transmitter really has failed,
                the loop current should be absent at every point downstream of it &mdash; and if it
                has not failed, current should be present at the mid-chain box. One measurement, two
                possible outcomes, both conclusive.
              </p>
              <p>
                Ask the operator what else changed. &ldquo;Fine yesterday&rdquo; is a data point,
                and{' '}
                <strong>
                  something that worked and then did not usually had something happen to it
                </strong>
                . Recent work on adjacent equipment is worth knowing before you start rather than
                after.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                The pressure of a stopped plant pushes directly against the method. Gathering data
                looks like delay, reading a drawing looks like avoidance, and going to the most
                likely device looks decisive.
              </p>
              <p>
                It is worth being honest that the instinct is often right &mdash; and that being
                right by luck is not repeatable. The method wins on average, and it wins by most on
                the faults that turn out not to be the obvious one, which are precisely the faults
                that otherwise consume a whole shift.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'Is there not a standard fault-finding procedure to follow?',
              answer:
                'Not one that solves faults for you, and it is worth understanding why rather than looking harder for one. A procedure can tell you to gather information, form explanations, test them and record what you find — and that is genuinely useful as a structure. What it cannot do is choose the test, because the useful test depends on what this loop contains, what the symptom is, and which explanations are live at that moment. Sites often have their own required sequence covering permits, isolation and recording, and that must be followed; it governs how you work rather than what you conclude.',
            },
            {
              question: 'What if experience tells me the answer immediately?',
              answer:
                'Use it — an experienced instinct is a good starting hypothesis and it is right more often than any systematic approach would be at the same speed. The discipline is only about status: it enters as one candidate among several rather than as the conclusion, and the first test you perform should be one capable of knocking it down. In practice this costs almost nothing when the instinct is right, and saves a great deal when it is not. The cases that consume whole shifts are almost always the ones where a strong instinct was never tested.',
            },
            {
              question: 'How much data is enough before starting to test?',
              answer:
                'Enough to rank the possibilities, which is usually far less than people fear and far more than they gather under pressure. You are not trying to solve the fault by observation — you are trying to convert an unstructured search into a short list that can be attacked in order. The symptom stated precisely, the loop diagram, what changed recently, and one or two measurements will normally do it. If you cannot say which of your explanations is most likely, you do not yet have enough; if you can, gathering more is procrastination.',
            },
            {
              question: 'Does this apply to control problems as well as instrument faults?',
              answer:
                'The reasoning does, but the fault set is different and Module 5 Section 4 owns it. A control loop can behave badly with every instrument in it working perfectly — oscillation from over-tuning, overshoot from windup, a valve that sticks. Those are diagnosed by watching how the loop behaves over time rather than by intercepting signals between devices. The useful first question is which kind of problem you have: an instrument that is not doing what it should, or a set of instruments all doing exactly what they should in an arrangement that misbehaves.',
            },
            {
              question: 'What if the test equipment itself is suspect?',
              answer:
                'Then it becomes a hypothesis like any other, and it deserves the same treatment rather than either blind trust or blind suspicion. Module 4 Section 4 covers how measuring instruments mislead by design — a high-impedance multimeter showing phantom voltage being the classic case — so a strange reading is not automatically a faulty meter. Check it against something known, or take the same measurement by a different method: if two independent approaches agree, the equipment is not your problem, and if they disagree you have learned something worth knowing.',
            },
            {
              question: 'When should I stop and ask for help?',
              answer:
                'A useful trigger is when you notice you have stopped generating new hypotheses and started repeating tests. That is the signature of fixation, and another person supplies the thing you have run out of — a different explanation. Describing the fault aloud to somebody forces the precision that fixation erodes, which is why it sometimes resolves the problem before they have answered. It is also worth stopping when the next step would mean working in a way you would not normally accept, because time pressure is exactly the condition under which that gets rationalised.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            '🔴 Every instrument takes something in and puts something out. What emerges should match what entered, by design — and where it does not, that device is at fault.',
            'That makes any device judgeable on its own terms, without understanding the whole plant.',
            'In a loop, one device’s output is the next device’s input — so a signal between them belongs to both.',
            '🔴 Intercepting between devices is therefore the fundamental move: one measurement clears everything upstream or condemns it.',
            'That is why bisection works — it is a consequence of how loops are built, not a trick.',
            'The cycle: observe, hypothesise, design a test, perform, validate or invalidate, repeat.',
            'The mind-set: curiosity, persistence, attention to detail, and willingness to abandon an idea on contrary evidence.',
            '🔴 A test must be able to prove you wrong. If no result would change your mind, it is not a test.',
            '🔴 Ask both: if true, what else should I see? If false, what should I not see? A test answering both is strongest.',
            'Easter-egging is checking everything in no particular order — caused by looking before thinking, usually under pressure.',
            '🔴 Occam’s Razor: assume one fault until data says otherwise. It is a probability argument, not a law.',
            'Two faults mask each other and destroy the mapping between test result and conclusion.',
            'So build and test in stages — that is how the single-fault assumption is kept true.',
            'Four mistakes cost most: no data, no documentation, fixating on the first idea, not testing in stages.',
            'Gathering data includes indicators, stimulating the system, your senses, and writing it down.',
            '🔴 Do the thinking on the drawing. Go to the plant to execute a test you have already designed.',
            'Read the documentation on an unfamiliar device before diagnosing it — you cannot judge its output without knowing its function.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 8.1" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Module 8
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Fault finding and maintenance
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Reading the symptom
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule8Section1;
