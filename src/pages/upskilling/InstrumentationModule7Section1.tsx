/**
 * Module 7 · Section 1 — Reading a loop diagram
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar. Opens Module 7.
 *
 * 🔴 REPOSITIONED, with Andrew's agreement 2026-08-30. The original title was
 * "What is a 4-20 mA loop and why it is used" — which Module 3 Sections 1 and 2
 * own completely (4-20 mA 35 mentions, live zero 26, NAMUR 24, the 250 Ω
 * resistor 40, all three topologies). Writing that page would have made Ben sit
 * the same material twice.
 *
 * An audit of Modules 1-6 found loop diagrams almost entirely uncovered
 * (loop diagram 6 mentions, marshalling 7, terminal strip 0, cable schedule 0),
 * so this page owns the document an electrician actually works from.
 *
 * 🔴 THE FRAMING. A P&ID shows what the plant does. A loop diagram shows what
 * you will find at the terminals — and it is the ONLY document that does. It is
 * the most detailed drawing of a control system as a whole, containing exactly
 * what the P&ID omits: individual wires rather than cables, terminal numbers,
 * cable numbers, wire colours, junction box numbers and earthing points.
 *
 * 🔴 THE KEY INSIGHT for a learner: loop diagrams are DELIBERATELY constrained
 * in layout — field instruments always left, panel/control-room always right,
 * tag and range text always along the bottom. That rigidity is the point.
 * Creativity and readability are mutually exclusive when a drawing carries this
 * much detail, so knowing where to look is what makes it fast.
 *
 * 🔴 And the argument that sells it: recording wire colours looks like trivia
 * until you have worked on a system without it. Every level of detail on the
 * diagram is a question you do not have to answer with a meter.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §7.3 (loop diagrams — what they contain that P&IDs omit, the ISA 5.1 layout
 * constraints, and the argument for recording wire colours) and §7.6
 * (instrument identification tags). Extracted to scratchpad/src/m7_loopdiag.txt
 * and m7_tags.txt. Held in ~/Desktop/hav/instrumentation.
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

const TITLE = 'Reading a loop diagram | Instrumentation Module 7.1 | Elec-Mate';
const DESCRIPTION =
  'The document that tells you what you will actually find at the terminals — what a loop diagram contains that a P&ID omits, why its layout is deliberately rigid, and why recording wire colours is worth the effort.';

const outcomes = [
  'Say what a loop diagram shows that a P&ID does not',
  '🔴 Explain why a loop diagram is the most detailed drawing of a control system as a whole',
  'Say what the dashed lines represent on a loop diagram, and how that differs from a P&ID',
  'Read terminal numbers, cable numbers and junction box references from a loop sheet',
  '🔴 State the layout convention and say why it is deliberately rigid',
  'Explain why recording wire colours is worth the effort',
  'Say what a loop diagram reveals that the P&ID hid entirely',
  'Use a loop diagram to plan a job before going to site',
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does a loop diagram show that a P&ID does not?',
    options: [
      'Individual wires, terminal numbers, cable numbers and wire colours',
      'Which valves are fail-open and fail-closed',
      'The overall control philosophy',
      'The process flow through the plant',
    ],
    correctIndex: 0,
    explanation:
      'A P&ID shows what the plant does and how the instruments relate to the process. A loop diagram shows what you will find when you open a terminal box — the level of detail needed to work on it rather than to understand it.',
  },
  {
    id: 2,
    question: 'On a loop diagram, what do the dashed lines represent?',
    options: [
      'Whole cables, as on a P&ID',
      'Individual copper wires',
      'Pneumatic tubing',
      'Process piping',
    ],
    correctIndex: 1,
    explanation:
      'That is the key difference in reading one. A P&ID shows a signal path as a single line for a whole cable; a loop diagram breaks it out into the individual conductors, because you have to land each of them on a specific terminal.',
  },
  {
    id: 3,
    question:
      '🔴 A P&ID shows a transmitter, a controller and a valve. The loop diagram for the same loop shows five devices. How?',
    options: [
      'The loop diagram includes devices from adjacent loops',
      'The loop diagram is wrong',
      'The P&ID omits devices that do not affect the process, such as signal transducers and converters',
      'The extra devices are spares',
    ],
    correctIndex: 2,
    explanation:
      'A P&ID shows what the control system does to the process, so a device that only converts one signal form to another may not appear. The loop diagram must show every device with terminals, because every one of them is somewhere a wire lands and a fault can occur.',
  },
  {
    id: 4,
    question: '🔴 Where are field instruments always drawn on a loop diagram?',
    options: [
      'At the top, with the panel below',
      'In the centre, with cabling radiating outwards',
      'Wherever the designer finds convenient',
      'On the left-hand side, with panel and control-room instruments on the right',
    ],
    correctIndex: 3,
    explanation:
      'The layout is standardised rather than left to the drafter: field on the left, panel or control room on the right, and tag, range and note text along the bottom. Knowing that is what makes a loop sheet quick to read.',
  },
  {
    id: 5,
    question: 'Why is the layout of a loop diagram deliberately constrained?',
    options: [
      'Because creativity and readability conflict when a drawing carries this much detail — you need to know where to look',
      'To fit a standard paper size',
      'To make them easier to draw by hand',
      'To make the drawings cheaper to produce',
    ],
    correctIndex: 0,
    explanation:
      'A loop sheet is dense with technical detail, and finding a specific terminal number quickly matters more than an elegant arrangement. Rigid convention means you know exactly where a piece of information ought to be before you start looking.',
  },
  {
    id: 6,
    question: '🔴 Why record wire colours on a loop diagram when they seem like trivia?',
    options: [
      'To satisfy drawing standards',
      'Because knowing exactly what colour to expect at exactly which terminal makes every later job faster',
      'Because colours are required for safety',
      'To identify the cable manufacturer',
    ],
    correctIndex: 1,
    explanation:
      'It looks like excessive detail until you have worked on a system that lacks it. Every piece of detail on the diagram is a question you do not have to answer with a meter, and the value is realised years later by somebody who was not there when it was installed.',
  },
  {
    id: 7,
    question: 'What is the only drawing more detailed than a loop diagram?',
    options: [
      'The cable schedule',
      'The P&ID',
      'An electronic schematic of one individual instrument',
      'The process flow diagram',
    ],
    correctIndex: 2,
    explanation:
      'A schematic goes deeper and covers only one device. The loop diagram is the most detailed view of the control system as a whole, which is why it has to contain everything the process-level drawings leave out.',
  },
  {
    id: 8,
    question: 'What is the practical value of reading the loop diagram before going to site?',
    options: [
      'It replaces the need to test',
      'It shows the process conditions',
      'It is a formality required before work can start',
      'It tells you what devices exist, where the terminals are and what you should find — so the visit confirms rather than discovers',
    ],
    correctIndex: 3,
    explanation:
      'Arriving knowing there are two junction boxes, a signal transducer nobody mentioned and a particular terminal numbering turns an exploratory visit into a planned one. Module 6 Section 2’s substitution technique also needs to know where the accessible break points are.',
  },
];

const InstrumentationModule7Section1 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 1"
        title="Reading a loop diagram"
        backTo="/electrician/upskilling/instrumentation-module-7"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Module 3 covered what a 4–20 mA loop is. This is the document that tells you what you will
          actually find when you open the box.
        </p>

        <TLDR
          points={[
            'A P&ID shows what the plant does. A loop diagram shows what is at the terminals.',
            '🔴 It is the most detailed drawing of a control system as a whole — only a schematic of one individual instrument goes further.',
            'Dashed lines are individual copper wires, not whole cables. That is the main difference in reading one.',
            '🔴 A P&ID can hide devices entirely — signal transducers and converters that do not affect the process still have terminals and still fail.',
            '🔴 The layout is deliberately rigid: field instruments left, panel and control room right, tag and range text along the bottom.',
            'Read it before travelling — it turns an exploratory visit into a planned one.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>Where this module starts</ContentEyebrow>

        <ConceptBlock
          title="Module 3 covered the signal. This module covers the installation."
          plainEnglish="You already know why industry sends a current and what the live zero buys. This module is about the cable, the terminals and the testing."
          onSite="If any of that is unfamiliar, Module 3 is the place to go back to."
        >
          <p>
            Module 3 established the 4&ndash;20 mA loop thoroughly: why a current survives a cable
            run when a voltage does not, what the live zero and NAMUR levels buy, the three loop
            topologies, the 250 &Omega; conversion resistor and the voltage budget that decides
            whether a loop can reach 20 mA at all.
          </p>
          <p>
            None of that is repeated here. Module 7 is about{' '}
            <strong>the physical installation</strong> &mdash; the drawings you work from, the cable
            you pull, the terminations you make, the barriers you fit in hazardous areas, and the
            testing that proves it all before anybody relies on it.
          </p>
          <p>
            It starts with documentation for a practical reason.{' '}
            <strong>
              Every task in this module begins with knowing what is supposed to be there
            </strong>
            , and there is one drawing that tells you.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Three drawings, three questions</ContentEyebrow>

        <ConceptBlock
          title="What each drawing is for"
          plainEnglish="Different documents answer different questions. Picking the wrong one wastes time and picking the right one saves a journey."
          onSite="You will meet all three. Only one of them tells you which terminal to land a wire on."
        >
          <p>
            Instrumentation documentation is layered, and each layer deliberately omits what the
            layer below carries:
          </p>
          <AppendixTable
            caption="What each drawing answers"
            headers={['Drawing', 'The question it answers', 'What it deliberately omits']}
            rows={[
              [
                'Process flow diagram',
                'What does this plant do, and in what order?',
                'Almost all instrumentation detail',
              ],
              [
                'P&ID',
                'What instruments exist and how do they relate to the process?',
                'Wiring, terminals, cable routes — and some devices entirely',
              ],
              [
                'Loop diagram',
                '🔴 What will I find at the terminals?',
                'Only the internal schematic of an individual instrument',
              ],
            ]}
            notes="The loop diagram is the most detailed view of the control system as a whole. Below it there is only the schematic for one device."
          />
          <p>
            The practical consequence is that{' '}
            <strong>a P&amp;ID is the wrong document to take to a terminal box</strong>. It will
            tell you a transmitter feeds a controller. It will not tell you which junction box the
            cable passes through, which terminals the pair lands on, or what colour the positive
            conductor is.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 What the loop diagram carries</ContentEyebrow>

        <ConceptBlock
          title="Individual wires, not cables"
          plainEnglish="The single biggest difference when you first read one: a line is now one conductor rather than a whole cable."
          onSite="That is why a loop sheet for a simple loop can still be a busy drawing."
        >
          <p>
            On a P&amp;ID a signal path is drawn as a single line representing a whole cable. On a
            loop diagram <strong>the dashed lines represent individual copper wires</strong>,
            because when you are working on it you are landing conductors on terminals one at a
            time.
          </p>
          <p>Alongside those wires, the diagram carries everything else you need at a terminal:</p>
          <ul>
            <li>
              <strong>Terminal numbers</strong> &mdash; drawn as numbered squares, so a specific
              conductor has a specific destination rather than a general one.
            </li>
            <li>
              <strong>Cable numbers</strong> &mdash; identifying each cable run, which is what lets
              you find the right one in a tray carrying twenty.
            </li>
            <li>
              <strong>Junction box numbers</strong> &mdash; every intermediate box the signal passes
              through, which the P&amp;ID does not acknowledge at all.
            </li>
            <li>
              <strong>Wire colours</strong> &mdash; what to expect on each conductor at each point.
            </li>
            <li>
              <strong>Earthing points</strong> &mdash; where the screen is earthed, which Module 3
              Section 5 showed must be exactly one place.
            </li>
            <li>
              <strong>Fluid ports</strong> where the loop includes pneumatic elements, labelled the
              same way as electrical terminals.
            </li>
          </ul>
          <p>
            Each instrument appears as a bubble representing{' '}
            <strong>one physical device with its own terminals</strong>. That distinction matters,
            because it means the count of bubbles is the count of things that can be disconnected,
            mis-wired or fail.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 The devices the P&ID never showed you"
          plainEnglish="A loop that looks like three devices on the process drawing can turn out to be five when you see the wiring."
          onSite="This is the commonest surprise on a first visit, and the loop diagram removes it entirely."
        >
          <p>
            A P&amp;ID shows the instruments that act on the process. A device that merely converts
            one signal form into another does not change what the plant does, so it may not appear
            &mdash; and it absolutely appears on the loop diagram, because it has terminals.
          </p>
          <p>Typical examples, all of which Module 3 introduced in another context:</p>
          <ul>
            <li>
              <strong>Signal transducers</strong> that modify a signal on its way to the controller
              &mdash; a square-root extractor being the classic case, and Module 3 Section 4 showed
              what happens when nobody knows where the extraction is done.
            </li>
            <li>
              <strong>I/P converters</strong> turning a 4&ndash;20 mA output into a 3&ndash;15 psi
              pneumatic signal for a valve.
            </li>
            <li>
              <strong>Isolators and barriers</strong>, which Module 3 Section 3 covered and Section
              5 of this module takes further.
            </li>
          </ul>
          <p>
            🔴 Each of those is a place a wire lands, a place a signal can be lost, and a device
            that consumes part of the loop voltage budget Module 3 Section 2 described.{' '}
            <strong>
              Discovering one on site is a surprise; reading it on the loop sheet beforehand is
              planning.
            </strong>
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-7-1-devices"
          question="A loop is not working. The P&ID shows a transmitter, a controller and a valve, and all three test correctly in isolation. What should you look at?"
          options={[
            'Replace the cable',
            'The control system configuration',
            'The loop diagram, which will show any devices and junction boxes the P&ID omitted',
            'Repeat the tests — one of them must be faulty',
          ]}
          correctIndex={2}
          explanation="Three good devices and a broken loop means the fault is between them — in cabling, terminations, or a device the P&ID never showed. The loop diagram is the only drawing that lists every junction box, transducer and terminal in the path, and it costs nothing to read before pulling anything apart."
        />

        <SectionRule />
        <ContentEyebrow>🔴 Why the layout never changes</ContentEyebrow>

        <ConceptBlock
          title="Rigid on purpose"
          plainEnglish="Every loop sheet is laid out the same way, so you know where to look before you look."
          onSite="Field on the left, panel on the right, text along the bottom. Learn it once and every loop sheet becomes quicker."
        >
          <p>
            Unlike a P&amp;ID, where the arrangement is largely up to whoever drew it, a loop
            diagram follows a constrained layout:
          </p>
          <ul>
            <li>
              <strong>Field instruments always on the left-hand side.</strong>
            </li>
            <li>
              <strong>Control panel and control-room instruments always on the right.</strong>
            </li>
            <li>
              <strong>Text</strong> describing instrument tags, ranges and notes{' '}
              <strong>always along the bottom.</strong>
            </li>
          </ul>
          <p>
            Intermediate locations &mdash; field junction boxes, panel rear, panel front &mdash; sit
            between the two in the order the signal physically passes through them, so{' '}
            <strong>reading left to right walks the signal from the process to the operator</strong>
            .
          </p>
          <p>
            The reason for the constraint is worth stating, because it looks like bureaucracy and is
            not.{' '}
            <strong>
              Creativity and readability are mutually exclusive when a drawing carries this much
              detail.
            </strong>{' '}
            Finding one terminal number among two hundred is a search problem, and the way to make
            it fast is to know where the answer ought to be before you start looking. A beautifully
            arranged loop sheet that puts the field devices somewhere unexpected costs its reader
            more than it gains.
          </p>
        </ConceptBlock>

        <Pullquote>
          A loop diagram is not designed to be elegant. It is designed so that somebody who has
          never seen this loop can find one terminal number in ten seconds.
        </Pullquote>

        <ConceptBlock
          title="The argument for recording wire colours"
          plainEnglish="It looks like pointless detail when you are drawing it. It is the difference between a ten-minute job and an afternoon when somebody else reads it in five years."
          onSite="If you are updating a loop sheet after a modification, this is the detail most often left out and most missed later."
        >
          <p>
            To somebody new, recording which conductor is red and which is black on a drawing looks
            like excessive detail. To anyone who has worked on a system <em>without</em> that
            information, it is among the most valued things on the sheet.
          </p>
          <p>
            The reason is what it removes.{' '}
            <strong>
              When a loop diagram tells you exactly what colour to expect at exactly which terminal,
              a question that would have needed a meter becomes a glance.
            </strong>{' '}
            Multiply that across every conductor in a fault-finding job and the difference is
            substantial.
          </p>
          <p>
            It matters more on instrument work than it might on power wiring, for a reason Module 2
            Section 2 gave:{' '}
            <strong>polarity is not self-evident and getting it wrong is not obvious.</strong>{' '}
            Reverse a thermocouple pair and the instrument still reports a temperature. Reverse a
            4&ndash;20 mA pair and, depending on the devices, you may get nothing at all or you may
            get a reading that looks plausible.
          </p>
          <p>
            The general principle is worth carrying beyond wire colours:{' '}
            <strong>
              every level of detail on the diagram is a question the next person does not have to
              answer with a meter
            </strong>
            . That is what makes a loop diagram worth the effort of keeping current.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-7-1-layout"
          question="You are handed an unfamiliar loop sheet and need the transmitter's terminal numbers. Where do you look first?"
          options={[
            'Anywhere — the layout varies by drafter',
            'The bottom, where the text is',
            'The right-hand side, nearest the panel',
            'The left-hand side, where field instruments are always drawn',
          ]}
          correctIndex={3}
          explanation="A transmitter is a field instrument, and field instruments are always on the left. The convention exists precisely so this is not a search — you know where the answer should be before you start looking, which is what makes a dense drawing usable."
        />

        <SectionRule />
        <ContentEyebrow>Using the wrong drawing</ContentEyebrow>

        <CommonMistake
          title="Working from the P&ID because it was the drawing to hand"
          whatHappens={
            <>
              <p>
                A technician takes the P&amp;ID to site because it shows the loop and is familiar.
                It shows a transmitter, a controller and a valve, so that is what is expected.
              </p>
              <p>
                On site there are two junction boxes the drawing did not mention, a signal
                transducer nobody knew about, and terminal numbering that has to be worked out by
                tracing conductors. Half a day goes into establishing what the loop sheet would have
                shown in a minute.
              </p>
              <p>
                🔴 Worse, the undocumented transducer is a candidate for the fault and it never gets
                considered, because as far as the drawing in hand is concerned it does not exist.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Get the loop diagram before travelling. It is the only document that lists every
                device with terminals, every junction box in the path, and where the screen is
                earthed.
              </p>
              <p>
                Read it as a plan for the visit: how many break points exist, where they are, and
                which of them lets you divide the loop usefully. Module 6 Section 2&rsquo;s
                substitution technique needs exactly that information &mdash; each substitution
                tests everything downstream and excludes everything upstream, so knowing the
                accessible points decides how quickly you can bisect the chain.
              </p>
              <p>
                And where a loop sheet does not exist or is out of date, that is a finding worth
                recording. Somebody will be back here.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Using it before you travel</ContentEyebrow>

        <ConceptBlock
          title="What to establish from the drawing"
          plainEnglish="Five minutes with the loop sheet answers most of what you would otherwise discover slowly and expensively on site."
          onSite="Especially where access is awkward, a permit is needed, or the plant is running."
        >
          <p>Before any visit to a loop, the diagram answers:</p>
          <ul>
            <li>
              <strong>How many devices are actually in it?</strong> Including anything the P&amp;ID
              omitted, each of which is a possible fault and a consumer of loop voltage.
            </li>
            <li>
              <strong>Where are the accessible break points?</strong> Junction boxes and terminal
              strips are where a loop can be divided, and Module 6 Section 2 showed why that decides
              your test strategy.
            </li>
            <li>
              <strong>Where is the screen earthed?</strong> One place only, per Module 3 Section 5
              &mdash; and if the drawing shows two, you have found something before leaving the
              office.
            </li>
            <li>
              <strong>What ranges are configured?</strong> The tag and range text along the bottom,
              which Module 3 Section 2 showed is where a plausible-looking system goes silently
              wrong.
            </li>
            <li>
              <strong>What should the terminals look like?</strong> Colours and numbers, so the
              visit confirms rather than discovers.
            </li>
          </ul>
          <p>
            That last distinction is the value of the whole document.{' '}
            <strong>
              A visit that confirms expectations is quick and a visit that discovers them is not
            </strong>
            &mdash; and on a running plant, or behind a permit, the difference is not only time.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Tag numbers, and what they tell you"
          plainEnglish="An instrument tag is not a serial number. It identifies what the device measures and which loop it belongs to."
          onSite="Reading a tag correctly tells you what a device is before you have seen it."
        >
          <p>
            Every instrument on a loop diagram carries a <strong>tag</strong>, and the tag is
            structured rather than arbitrary. It generally has two parts:
          </p>
          <ul>
            <li>
              <strong>Letters identifying the function</strong> &mdash; what is measured and what
              the device does about it. A first letter for the measured variable, further letters
              for the function.
            </li>
            <li>
              <strong>A number identifying the loop</strong> &mdash; shared by every device
              belonging to that loop, which is what lets you gather them.
            </li>
          </ul>
          <p>
            So devices sharing a loop number are working together on one measurement, and the
            letters distinguish their roles &mdash; a transmitter, a controller and a valve on the
            same loop carry the same number with different letters.
          </p>
          <p>
            The practical consequence for fault finding is direct.{' '}
            <strong>
              The loop number is the search key that gathers every device in the chain
            </strong>
            , which is exactly what you need when the fault is somewhere in a chain and you do not
            yet know where. Where devices carry a suffix &mdash; two transducers on the same loop,
            for instance &mdash; those distinguish individual units within it.
          </p>
          <p>
            Conventions for the letters vary between sites and standards, so it is worth checking
            the site&rsquo;s own legend rather than assuming. What is consistent is the principle:
            the tag tells you role and loop membership, not manufacturer or serial number.
          </p>
        </ConceptBlock>

        <Scenario
          title="A loop diagram that disagrees with the plant"
          situation={
            <>
              <p>
                A technician attends a faulty loop with the loop sheet. It shows one field junction
                box, cable numbers CBL21 and CBL24, and the screen earthed at the panel.
              </p>
              <p>
                On site there are two junction boxes. The second is not on any drawing, and inside
                it the screen is landed on a local earth bar as well as being earthed at the panel.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Two findings, and the second is very likely the fault. Module 3 Section 5
                established that a screen earthed at both ends creates a ground loop &mdash; current
                flows through the screen, which can inject noise into the very conductors it was
                fitted to protect.
              </p>
              <p>
                So the undocumented junction box is not incidental to the problem; it is where
                somebody added a second earth. That is worth confirming before anything else,
                because it is cheap to test and it explains the symptom.
              </p>
              <p>
                The first finding matters too and is easy to skip past.{' '}
                <strong>The drawing is wrong</strong>, and the next person will arrive with the same
                misleading document. Recording the actual arrangement — and getting the drawing
                updated — is part of finishing the job, not an optional extra.
              </p>
              <p>
                Note also what the drawing being wrong cost. The technician planned a test strategy
                around one break point and found two, which changes where the loop can usefully be
                divided.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                An out-of-date loop diagram is worse than none, because it is trusted. A missing
                drawing prompts caution; a wrong one produces confident errors.
              </p>
              <p>
                It is also a reminder that modifications create documentation debt. Somebody added a
                junction box for good reasons and did not update the sheet, and every subsequent
                visit pays for it.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="What Module 7 does with this"
          plainEnglish="The drawing tells you what should be there. The rest of the module is about putting it there, protecting it and proving it."
          onSite="Each remaining section answers a question the loop diagram raises."
        >
          <p>The sections that follow work through the physical loop in the order you meet it:</p>
          <ul>
            <li>
              <strong>Section 2</strong> &mdash; terminations and glanding. The drawing says a
              conductor lands on terminal 8; this is how it is actually made off.
            </li>
            <li>
              <strong>Section 3</strong> &mdash; loop design and load calculations. Module 3 Section
              2 gave the voltage budget in principle; here it is worked as arithmetic, including
              every device the loop diagram showed you.
            </li>
            <li>
              <strong>Section 4</strong> &mdash; cable and identification. What to pull, how to
              identify it, and how to keep it away from the things Module 3 Section 5 warned about.
            </li>
            <li>
              <strong>Section 5</strong> &mdash; barriers and intrinsically safe loops. Module 1
              Section 5 covered hazardous areas; this is what they demand of the wiring.
            </li>
            <li>
              <strong>Section 6</strong> &mdash; commissioning, and proving a loop before anybody
              relies on it.
            </li>
            <li>
              <strong>Section 7</strong> &mdash; testing instrument cable, and what an insulation
              test does to a connected loop.
            </li>
          </ul>
          <p>
            One theme runs through all of them and it is worth stating at the start:{' '}
            <strong>
              an instrument loop is a signal circuit, not a power circuit, and the habits that serve
              on power wiring can actively damage it.
            </strong>{' '}
            Module 4 Section 1 made that point about measurement; Module 3 Section 5 made it about
            screening. This module makes it about installation.
          </p>
          <p>
            The loop diagram is where that starts, because it is the document that records the
            decisions those later sections make. Where a screen is earthed, which devices sit in the
            loop and consume its voltage budget, what cable carries it and where it can be broken
            for testing &mdash;{' '}
            <strong>
              every one of those is both an installation decision and a line on the drawing
            </strong>
            . Keeping the two in step is what makes the next person&rsquo;s job possible.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Who is responsible for keeping loop diagrams up to date?',
              answer:
                'Formally that depends on the site’s own procedures, and practically it depends on whoever last changed the installation. The useful position for a technician is that noticing a discrepancy makes you the person who knows about it — so recording what you found and raising it is part of the job. A drawing that quietly diverges from the plant over years does so one unrecorded modification at a time.',
            },
            {
              question: 'What if no loop diagram exists?',
              answer:
                'Then the first visit is partly a survey, and it is worth treating it as one — tracing the loop, noting the devices, junction boxes, terminal numbers and colours, and producing something for next time. That is slower than reading a drawing and considerably faster than the next person repeating it. Whether it becomes a formal document is a site question; having a record at all is better than none.',
            },
            {
              question: 'Do loop diagrams show the process conditions?',
              answer:
                'Only the instrument ranges, which appear in the text along the bottom. What the process is actually doing, what it contains and how the equipment relates is the P&ID’s job, and the two drawings are meant to be used together. A loop diagram tells you what you will find at the terminals; it does not tell you what the plant is for.',
            },
            {
              question: 'Is one loop diagram drawn per loop?',
              answer:
                'That is the convention the name implies, and it is what makes them navigable — one sheet, one loop number, everything belonging to that loop on it. It also means a device shared between loops, or a multi-variable transmitter feeding several, needs care in how it is represented. Where a site departs from one-sheet-per-loop, it is worth understanding their convention before assuming.',
            },
            {
              question: 'How does a loop diagram relate to a cable schedule?',
              answer:
                'They overlap and answer different questions. The loop diagram tells you which cable carries this loop and where it terminates; a cable schedule lists cables as an inventory, with types, lengths, routes and cores. For fault-finding the loop diagram is usually what you want; for planning an installation or checking whether a spare core exists, the schedule is.',
            },
            {
              question: 'Why are earthing points shown on the loop diagram?',
              answer:
                'Because on an instrument loop the earthing arrangement is functional rather than incidental. Module 3 Section 5 established that a screen must be earthed at exactly one point, so where that point is constitutes design information — and a drawing showing two earths, or none, is showing a fault. It is the sort of detail that looks like clutter until it is the thing you need.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Module 3 owns the 4–20 mA signal. Module 7 is about installing, testing and maintaining the physical loop.',
            'A P&ID answers what the plant does. A loop diagram answers what is at the terminals.',
            '🔴 The loop diagram is the most detailed drawing of a control system as a whole — only a single instrument’s schematic goes further.',
            'Dashed lines are individual copper wires, not whole cables. That is the main shift when you first read one.',
            'It carries terminal numbers, cable numbers, junction box numbers, wire colours and earthing points.',
            '🔴 A P&ID can omit devices entirely — transducers and converters that do not affect the process still have terminals and still fail.',
            'Every bubble is one physical device with its own terminals, so the count of bubbles is the count of things that can be disconnected or mis-wired.',
            '🔴 Layout is fixed: field instruments left, panel and control room right, tag and range text along the bottom.',
            'Reading left to right walks the signal from the process to the operator.',
            'The rigidity is deliberate — creativity and readability conflict when a drawing is this dense.',
            'Wire colours look like trivia and are among the most valued details when they are missing.',
            'Every detail on the diagram is a question the next person does not have to answer with a meter.',
            'Read it before travelling: device count, break points, where the screen is earthed, and the configured ranges.',
            '🔴 An out-of-date loop diagram is worse than none, because it is trusted. Record and raise discrepancies.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 7.1" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Back
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">Module 7</span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Terminations and glanding
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule7Section1;
