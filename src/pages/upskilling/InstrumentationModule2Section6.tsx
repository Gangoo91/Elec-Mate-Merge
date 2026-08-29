/**
 * Module 2 · Section 6 — Choosing the right sensor
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar. Closes Module 2.
 *
 * 🔴 THE ARGUMENT. The old page was a selection checklist — range, accuracy,
 * environment, cost — which is fine as far as it goes and teaches nobody how to
 * think. This version is built on the sentence the source arrives at after an
 * entire chapter of flow technologies:
 *
 *   "What matters most is that you thoroughly understand the physical
 *    principles upon which each flowmeter depends. If the 'first principles' of
 *    each technology are understood, the appropriate applications and potential
 *    problems become much easier [to identify]."
 *
 * That is the whole module in one line, and it is why Section 2.4 was allowed to
 * end by naming the pattern rather than listing more devices. Selection is not a
 * lookup table; it is knowing what each principle leans on and therefore what
 * will break it.
 *
 * The section also carries the honest admission the source makes, which the old
 * page did not: flow is "arguably the single most complex type of process
 * variable measurement in all of industrial instrumentation", the word itself
 * lacks a singular definition, and most technologies cannot stay linear from
 * maximum rated flow down to zero no matter how well matched they are.
 * Instrumentation is not a discipline where a table gives you the answer.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.21-22; Endress+Hauser selection guidance. Both in
 * ~/Desktop/hav/instrumentation. Sections 2.2-2.5 of this course supply the
 * device-level detail this section synthesises.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Choosing the right sensor | Instrumentation Module 2.6 | Elec-Mate';
const DESCRIPTION =
  'Sensor selection as a way of thinking rather than a lookup table. What each measuring principle depends on and therefore what breaks it, why installation decides more than the datasheet, and why the specification a sensor cannot meet is usually turndown rather than accuracy.';

const outcomes = [
  'Explain why understanding first principles matters more than memorising device types',
  'Name, for any instrument, the property it depends on and the condition that would defeat it',
  'Work through a selection in the order the constraints actually eliminate options',
  'Explain why installation frequently decides measurement quality more than instrument choice',
  'Recognise that "flow" has more than one definition, and say why that matters at selection',
  'Judge when a simpler or cheaper measurement is the correct engineering answer',
  'Say what should be recorded about a selection so the next person understands it',
  'Read an accuracy specification properly — what it is a percentage of, and under what conditions it holds',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The source describes flow as arguably the most complex process variable to measure. One reason given is that:',
    options: [
      'Flowmeters are more expensive than other instruments',
      'The variable itself lacks a singular definition — volumetric, mass and standardised volumetric flow are different quantities',
      'Flow can only be measured in liquids',
      'Flow measurement always requires a control system',
    ],
    correctIndex: 1,
    explanation:
      '"Flow" may mean volumetric flow, mass flow, or standardised volumetric flow — the number of gas volumes flowing supposing different pressure and temperature values than the line actually operates at. Agreeing which one is wanted is part of the selection, not a detail to settle afterwards.',
  },
  {
    id: 2,
    question:
      'A magnetic flowmeter, a Coriolis meter and a DP set are all technically capable for a duty. What should decide?',
    options: [
      'Whichever is cheapest',
      'Which constraint dominates — fluid properties, permitted pressure loss, available straight run, flow range and what the fluid does to the instrument',
      'Whichever the manufacturer recommends',
      'Whichever has the highest quoted accuracy',
    ],
    correctIndex: 1,
    explanation:
      'Quoted accuracy is achieved under reference conditions that a real installation rarely reproduces. The constraints — conductivity, pressure loss, straight run, range, and wear — eliminate options far more decisively, and they are what an instrument has to live with for its whole service life.',
  },
  {
    id: 3,
    question: 'Why do most flow technologies struggle to stay linear down to zero flow?',
    options: [
      'Because the electronics switch off at low signal',
      'Because the dynamic properties of the fluids themselves change with flow rate, and most technologies cannot achieve respectable linearity from maximum rated flow to zero',
      'Because low flow is always laminar',
      'Because transmitters cannot output below 4 mA',
    ],
    correctIndex: 1,
    explanation:
      'The source is explicit: the dynamic properties of fluids change with flow rate, and most flow measurement technologies cannot achieve respectable measurement linearity from the maximum rated flow all the way to zero, no matter how well matched they are to the application.',
  },
  {
    id: 4,
    question:
      'Why is flowmeter installation described as a constant source of friction between piping and instrumentation engineers?',
    options: [
      'Because instruments are expensive',
      'Because what is excellent piping layout for process function and economy is often poor for good flow measurement, and vice versa',
      'Because flowmeters require their own power supply',
      'Because piping engineers do not read datasheets',
    ],
    correctIndex: 1,
    explanation:
      'The two disciplines optimise for different things. Good measurement wants straight run and a developed flow profile; good piping layout wants short runs and economy. The result is often a flowmeter installed improperly, leaving instrument technicians to deal with the measurement problems at start-up.',
  },
  {
    id: 5,
    question:
      'A duty needs a single instrument to read reliably from 5% to 100% of range. Which consideration is most likely to eliminate a DP flow measurement?',
    options: [
      'Its accuracy specification',
      'Its rangeability — DP falls with the square of flow, so at 5% flow the differential is only 0.25% of span',
      'Its cost',
      'Its physical size',
    ],
    correctIndex: 1,
    explanation:
      'The square law collapses the differential at low flow into the region where the instrument’s own error lives. It is not that the DP instrument is inaccurate; it is that the measurement principle has run out of usable range. This is why turndown, rather than accuracy, is usually the specification a sensor cannot meet.',
  },
  {
    id: 6,
    question: 'Which question best captures the habit this module has been building towards?',
    options: [
      'Which instrument has the best specification?',
      'What property does this measurement depend on, and what condition would make it lie?',
      'Which manufacturer does the site prefer?',
      'How much does it cost to install?',
    ],
    correctIndex: 1,
    explanation:
      'Every failure in this module — lead resistance, alpha mismatch, a double square-root extraction, a density change, aliasing — was an instrument working exactly as designed while a condition it quietly depended on stopped being true. Naming that dependency in advance is what selection and fault-finding both rest on.',
  },
];

const InstrumentationModule2Section6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 6"
        title="Choosing the right sensor"
        backTo="/electrician/upskilling/instrumentation-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Not a lookup table. A way of thinking that works on instruments this course has never
          mentioned.
        </p>

        <TLDR
          points={[
            'Selection is not a table. Understand the physical principle a device depends on and both the right applications and the likely problems become obvious.',
            'For any instrument, name two things: the property it leans on, and the condition that would defeat it. That single habit covers selection and fault-finding at once.',
            'Constraints eliminate; specifications only rank. Work through what the fluid, the pipework and the vessel forbid before comparing datasheets.',
            'Installation frequently decides measurement quality more than instrument choice — and good piping layout and good measurement often want opposite things.',
            '🔴 The specification most often unmet is turndown, not accuracy. Most technologies cannot stay linear from full rate down to zero however well matched they are.',
            'Cheaper and simpler is often the right engineering answer. A switch that answers the actual question beats a transmitter that answers a grander one.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>Why a table will not save you</ContentEyebrow>

        <ConceptBlock
          title="Understand the principle and the applications follow"
          plainEnglish="Nobody can memorise every instrument. But if you know what a device is physically doing, you can work out where it will succeed and where it will embarrass you."
          onSite="You will meet instruments this course has never mentioned. The principle is transferable; the catalogue is not."
        >
          <p>
            The source arrives at this conclusion after working through an entire chapter of flow
            technologies, and it is worth taking seriously:
          </p>
          <p>
            <strong>
              What matters most is that you thoroughly understand the physical principles upon which
              each flowmeter depends. If the &ldquo;first principles&rdquo; of each technology are
              understood, the appropriate applications and potential problems become much easier to
              see.
            </strong>
          </p>
          <p>
            That is why this module has spent its time on mechanisms rather than model numbers. An
            electromagnetic flowmeter is not &ldquo;for conductive liquids&rdquo; as an arbitrary
            rule to memorise — it induces a voltage as charged particles cross a magnetic field, and{' '}
            <em>therefore</em> a non-conductive fluid gives it nothing to work with. Learn the
            mechanism and the limitation is not a separate fact.
          </p>
          <p>Run the same test across the module:</p>
          <ul>
            <li>
              <strong>An RTD</strong> measures resistance, so anything else adding resistance —
              cable, terminations — enters the reading.
            </li>
            <li>
              <strong>A thermocouple</strong> measures a difference between two junctions, so
              something must supply the other half of the sum.
            </li>
            <li>
              <strong>A DP flow set</strong> senses a pressure drop that goes with the square of
              flow, so it is weakest exactly where the flow is smallest.
            </li>
            <li>
              <strong>A hydrostatic level</strong> weighs a column, so it needs to know what the
              product weighs.
            </li>
            <li>
              <strong>A time-of-flight instrument</strong> times a reflection, so it needs a clear
              path and a surface that reflects.
            </li>
          </ul>
          <p>
            None of those limitations had to be memorised separately. Each one falls out of what the
            device is physically doing.
          </p>
        </ConceptBlock>

        <Pullquote>
          Every limitation in this module is the mechanism seen from the other side. Learn what the
          instrument is doing and you have learned what will stop it.
        </Pullquote>

        <InlineCheck
          id="ins-2-6-principle"
          question="You meet an unfamiliar instrument that measures level by weighing the entire vessel on load cells. Without knowing anything else, what will defeat it?"
          options={[
            'A change in product density',
            'Anything that adds or removes weight that is not product — build-up on the walls, ice, someone standing on the platform, pipework strain',
            'A change in ambient temperature',
            'Nothing — weighing is an absolute measurement',
          ]}
          correctIndex={1}
          explanation="The principle is weight, so the vulnerability is anything contributing weight that is not the product you want to measure. Note this method is immune to density in the way a hydrostatic instrument is not — it genuinely weighs contents rather than inferring height. You worked that out from the mechanism without ever having been taught this device."
        />

        <SectionRule />
        <ContentEyebrow>The order that actually works</ContentEyebrow>

        <ConceptBlock
          title="Constraints eliminate; specifications only rank"
          plainEnglish="Start with what the job forbids, not with what the datasheets promise. Constraints usually leave you with one or two candidates, and then the comparison is easy."
          onSite="If a selection discussion starts with accuracy figures, it has started in the wrong place."
        >
          <p>
            The sections before this each ended with selection guidance for their own devices. The
            common shape is worth stating once:
          </p>
          <p>
            <strong>1. What is being measured, exactly?</strong> Not &ldquo;flow&rdquo; but which
            flow. The source is blunt that the variable lacks a singular definition —{' '}
            <strong>volumetric</strong> flow, <strong>mass</strong> flow, or{' '}
            <strong>standardised volumetric</strong> flow, meaning gas volumes supposing different
            pressure and temperature values than the line actually runs at. These are different
            quantities and a measurement of one is not a measurement of another.
          </p>
          <p>
            <strong>2. What does the process forbid?</strong> Conductivity, permitted pressure loss,
            temperature and pressure limits, whether anything may intrude, whether the vessel can be
            opened. Each answer removes technologies outright.
          </p>
          <p>
            <strong>3. What range must it cover?</strong> Usually the hardest requirement, and the
            one addressed below.
          </p>
          <p>
            <strong>4. What will the process do to it?</strong> Abrasion, coating, corrosion,
            crystallisation. The source notes that flowmeters are subject to far more wear and tear
            than most other primary sensing elements, because the sensing element must lie directly
            in the path of a potentially abrasive stream.
          </p>
          <p>
            <strong>5. Can it be installed properly?</strong> Straight run, orientation, access.
            Covered below, because it deserves its own argument.
          </p>
          <p>
            <strong>6. Can it be proved and maintained?</strong> An instrument that cannot be
            checked without shutting the plant down will, in practice, not be checked.
          </p>
          <p>
            <strong>7. What happens if it is wrong?</strong> The consequence sets the budget. A
            reading feeding a safety function deserves more than one feeding a trend nobody reads.
          </p>
          <p>
            Only now is it worth comparing accuracy figures — and by this point there are usually
            only one or two candidates left to compare.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The specification nobody meets</ContentEyebrow>

        <ConceptBlock
          title="Turndown is the requirement that actually bites"
          plainEnglish="Almost every instrument is accurate enough somewhere in its range. The hard part is being accurate across the whole range the process actually uses."
          onSite="When a measurement is trusted at full rate and disbelieved at low rate, nobody has done anything wrong. The principle has simply run out."
        >
          <p>
            Accuracy is the specification people argue about and rangeability is the one that
            defeats them. The source states it plainly for flow:{' '}
            <strong>
              most flow measurement technologies cannot achieve respectable measurement linearity
              from the maximum rated flow all the way to zero flow, no matter how well matched they
              might be to the process application
            </strong>
            . Part of the reason is that the dynamic properties of the fluids themselves change with
            flow rate — the physics is not the same at 5% as at 95%.
          </p>
          <p>The same shape has appeared repeatedly in this module:</p>
          <ul>
            <li>
              <strong>DP flow</strong> — the square law leaves 1% differential at 10% flow, and the
              instrument&rsquo;s own error does not shrink to match.
            </li>
            <li>
              <strong>Transmitter turndown</strong> — Section 2.1 covered the ratio of maximum to
              minimum allowable span, and why ranging near the narrow end degrades accuracy in
              engineering units.
            </li>
            <li>
              <strong>Converter resolution</strong> — Section 2.5 showed each count is worth more
              engineering units on a wider range, so widening the range coarsens everything.
            </li>
          </ul>
          <p>
            Three different mechanisms, one recurring lesson: <strong>range is not free</strong>.
            Asking a single instrument to cover an enormous span means accepting it will be poor
            somewhere in that span.
          </p>
          <p>
            The honest engineering answers are to narrow the range if the process allows, to accept
            a low-flow cut-off and stop pretending, to choose a technology with genuine rangeability
            and pay for it, or — occasionally — to fit two instruments covering different parts of
            the range. What does not work is specifying wide range and high accuracy together and
            hoping.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-6-turndown"
          question="A specification asks for ±0.5% accuracy from 2% to 100% of range on a single flow instrument. What is the honest response?"
          options={[
            'Find the manufacturer whose datasheet claims it',
            'Challenge the requirement — most technologies cannot stay linear to near-zero, so either the range narrows, a high-rangeability technology is paid for, or the low end is excluded',
            'Fit a DP set and add damping',
            'Accept it and calibrate more often',
          ]}
          correctIndex={1}
          explanation="A datasheet figure quoted under reference conditions at a favourable point in the range does not mean the instrument holds that accuracy at 2% of span. The professional response is to surface the conflict at specification time rather than discover it at commissioning, when the options have narrowed to arguing about whose fault it is."
        />

        <SectionRule />
        <ContentEyebrow>Where the measurement is really decided</ContentEyebrow>

        <ConceptBlock
          title="Installation decides more than selection does"
          plainEnglish="You cannot hang an instrument anywhere convenient and expect it to work as designed. Where it goes is part of choosing it."
          onSite="If a measurement has never been right since the day it was installed, stop suspecting the instrument and go and look at how it is fitted."
        >
          <p>
            The source is direct about this, and about the organisational reason it keeps happening:
          </p>
          <p>
            <strong>
              The performance of most flowmeter technologies critically depends on proper
              installation. One cannot simply hang a flowmeter at any location in a piping system
              and expect it to function as designed.
            </strong>
          </p>
          <p>
            It then names the cause, which is not technical:{' '}
            <strong>
              this is a constant source of friction between piping (mechanical) engineers and
              instrumentation (controls) engineers on large industrial projects
            </strong>
            . What counts as excellent piping layout for process function and economy is often poor
            for good flow measurement, and the reverse. In many cases the flowmeter gets installed
            improperly and{' '}
            <strong>
              the instrument technicians have to deal with the resulting measurement problems during
              start-up
            </strong>
            .
          </p>
          <p>
            That is worth knowing before you arrive at your first commissioning. A measurement that
            has never worked properly is frequently not a faulty instrument but a compromise made on
            a drawing months earlier by someone optimising for something else entirely.
          </p>
          <p>The practical consequences for you:</p>
          <ul>
            <li>
              <strong>Raise installation requirements early</strong>, while the layout can still
              change. After the pipework is fabricated, the conversation is about mitigation rather
              than correction.
            </li>
            <li>
              <strong>Record what was compromised.</strong> If an instrument went in with less
              straight run than specified, that fact should live with the loop documentation — so
              the next person does not spend a week hunting an instrument fault.
            </li>
            <li>
              <strong>Judge the reading in light of it.</strong> An instrument in a poor location
              may be repeatable and consistently wrong, which is often still useful for control even
              though it should not be trusted as an absolute value.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Worked selection — three duties, three different winners"
          plainEnglish="Run the constraints on three real jobs and watch the answer come out different each time, for reasons that have nothing to do with which instrument is best."
          onSite="Notice that in none of these does accuracy decide. It never gets that far."
        >
          <p>
            <strong>Duty one — cooling water flow to a heat exchanger.</strong> Clean water, wide
            flow range as demand varies, a long straight run available, and pressure loss matters
            because the system is pumped continuously.
          </p>
          <p>
            Water conducts, so electromagnetic is open. Wide range rules DP out on the square law.
            Pressure loss argues against any obstruction. Magnetic wins on the second and third
            constraints before accuracy is discussed at all.
          </p>
          <p>
            <strong>Duty two — fuel oil to a burner, billed by mass.</strong> Non-conductive, so
            electromagnetic is eliminated by the first question. Mass is what is wanted, so a
            volumetric measurement would need density compensation — another measurement and another
            failure mode. Coriolis measures mass directly and needs no straight run. Expensive, and
            the right answer.
          </p>
          <p>
            <strong>Duty three — steam flow to a process, indication only.</strong> Steam rules out
            most contact methods on temperature. Nobody controls on the reading; it is used to check
            consumption weekly. DP is well understood, cheap, robust and entirely adequate — and the
            fact that it is poor below 20% flow does not matter, because nothing is decided at low
            rates.
          </p>
          <p>
            Three duties, three technologies, and in every case the choice was made by a constraint
            rather than by a specification. Note especially the third: the <em>least</em> capable
            instrument was correct, because the question being asked was modest and DP answers it
            for a fraction of the money.
          </p>
        </ConceptBlock>

        <Scenario
          title="The specification that was met and the measurement that failed"
          situation="A flow measurement is specified for a new skid: the required accuracy is stated, a suitable meter is selected, and the datasheet comfortably exceeds the requirement. At commissioning, the reading is unstable at low rates and reads several percent high compared with a downstream check. Every component is within specification and the loop checks perfectly."
          whatToDo="Work the chain rather than the instrument. Confirm what quantity was actually specified — volumetric or mass — and what the receiving system assumes. Check the installed straight run against the manufacturer's requirement, because that is the most common gap between a specification and an installation. Then look at where the operating range sits relative to the instrument's usable range: a meter selected on full-rate accuracy may be running mostly at 15% of span."
          whyItMatters="Nothing here was done incompetently. The specification was met as written, the instrument performs as advertised, and the installation looked reasonable to the person who drew it. The failure is in the gaps between those three activities — which is exactly why an instrument person needs to understand selection, installation and the measurement principle together rather than owning only the box."
        />

        <SectionRule />
        <ContentEyebrow>Reading a datasheet honestly</ContentEyebrow>

        <ConceptBlock
          title="What an accuracy figure is actually promising"
          plainEnglish="A quoted accuracy is a claim made under stated conditions. Change the conditions and the claim does not travel with you."
          onSite="Two numbers that look comparable often are not. Check what each is a percentage OF before believing either."
        >
          <p>
            Section 1.3 separated accuracy, precision, resolution and repeatability. Selection is
            where that distinction earns its keep, because a datasheet compresses a great deal into
            one figure.
          </p>
          <p>Three questions to ask of any accuracy specification:</p>
          <ul>
            <li>
              <strong>A percentage of what?</strong> Of span, or of reading. These diverge sharply
              away from full scale — a percentage-of-span figure represents a fixed quantity that
              becomes a larger share of a small reading, while a percentage-of-reading figure
              shrinks with the reading. Two instruments quoting the same number can behave very
              differently at 20% of range.
            </li>
            <li>
              <strong>Under what conditions?</strong> Reference accuracy is measured under stated
              laboratory conditions. A real installation adds ambient temperature effects, supply
              variation, static pressure effects and mounting position — each usually specified
              separately, and each additive.
            </li>
            <li>
              <strong>Over what range?</strong> A figure may hold across a stated portion of the
              range and degrade outside it, which is precisely the turndown problem above wearing a
              different hat.
            </li>
          </ul>
          <p>
            None of that makes datasheets dishonest. They are precise documents that get read
            imprecisely — usually by comparing the largest number on the front page of one against
            the largest number on the front page of another.
          </p>
          <p>
            The practical habit: compare instruments{' '}
            <strong>
              at the conditions and the point in the range where they will actually work
            </strong>
            , not at the point where each looks best.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-6-datasheet"
          question="Instrument A is quoted at ±0.1% of span; instrument B at ±0.1% of reading. Both are ranged 0–100 bar. Which is more accurate at 20 bar?"
          options={[
            'They are identical',
            'Instrument B — 0.1% of 20 bar is 0.02 bar, where A is 0.1% of the 100 bar span, or 0.1 bar',
            'Instrument A',
            'It cannot be determined',
          ]}
          correctIndex={1}
          explanation="Percentage of span fixes the error at 0.1 bar regardless of where you are reading; percentage of reading scales it down to 0.02 bar at 20 bar. At full scale they are equal — which is exactly why comparing headline figures without reading what they refer to is misleading."
        />

        <SectionRule />
        <ContentEyebrow>Knowing when less is more</ContentEyebrow>

        <ConceptBlock
          title="The cheapest instrument that answers the question is the right one"
          plainEnglish="A better instrument that answers a question nobody asked is not better. Match the measurement to the decision it serves."
          onSite="Ask what will be done differently depending on the reading. If the answer is nothing, you may not need the reading."
        >
          <p>
            There is a persistent tendency to specify upward — more accuracy, more variables, more
            diagnostics — because it feels like the safe direction. It is not always.
          </p>
          <p>
            Module 1 Section 1 made the argument in its simplest form: a switch reports a threshold,
            a transmitter reports a value, and{' '}
            <strong>if the question is genuinely binary the switch is the better answer</strong> —
            fewer failure modes, nothing to re-range, and a definite state.
          </p>
          <p>The same reasoning scales up:</p>
          <ul>
            <li>
              <strong>A multivariable transmitter reduced to one 4&ndash;20 mA output</strong> is
              being paid for and not used.
            </li>
            <li>
              <strong>Diagnostics that report to nobody</strong> — Section 2.5 — are a cost without
              a benefit.
            </li>
            <li>
              <strong>Accuracy beyond what the process can act on</strong> is decoration. If the
              control valve resolves 1%, a measurement resolving 0.01% changes no decision.
            </li>
          </ul>
          <p>
            The test is simple and worth applying out loud:{' '}
            <strong>what will be done differently because of this reading?</strong> That question
            settles specification arguments faster than any comparison of datasheets, and it
            occasionally reveals that the honest answer is a local gauge and somebody walking past
            it once a shift.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Write down why, not just what"
          plainEnglish="The reasoning behind a choice is worth more than the choice. Without it, the next person has to redo the thinking or guess."
          onSite="Six months later, 'why is it this type?' has no answer unless somebody wrote one. Be the person who wrote one."
        >
          <p>
            Selection decisions are usually recorded as an outcome — a model number on a datasheet —
            and almost never as reasoning. That is a loss, because the reasoning is what the next
            person needs:
          </p>
          <ul>
            <li>
              <strong>What was assumed</strong> — the density used for a hydrostatic level, the
              alpha of an RTD, the fluid the meter was sized for. Section 2.4 showed how invisible
              those assumptions are once they are only in a configuration.
            </li>
            <li>
              <strong>What was compromised</strong> — straight run cut short, a location accepted
              under protest, a range wider than ideal.
            </li>
            <li>
              <strong>What was rejected and why</strong> — so the same option is not re-proposed
              annually.
            </li>
            <li>
              <strong>Where the measurement is trustworthy</strong> — the range over which it should
              be believed, and where it should not.
            </li>
          </ul>
          <p>
            This is the same instinct as recording as-found and as-left values in calibration, which
            Module 6 covers: the number matters less than the evidence of how it came about.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What Module 2 has actually been teaching"
          plainEnglish="Six sections of devices, and one idea underneath all of them."
          onSite="If you remember one thing from this module, make it the question rather than any of the devices."
        >
          <p>
            This module opened by separating a primary sensing element from a transmitter and from
            the word &ldquo;transducer&rdquo; as a plant uses it. It then worked through
            temperature, pressure, flow, level, position and the signals that carry them. Underneath
            every one of those was the same lesson, arrived at from a different direction each time:
          </p>
          <ul>
            <li>
              <strong>2.1</strong> — a transmitter&rsquo;s output means nothing until you know what
              its 4 mA and 20 mA represent.
            </li>
            <li>
              <strong>2.2</strong> — an RTD reading includes its own cable; a thermocouple reports a
              difference and needs the other half supplied.
            </li>
            <li>
              <strong>2.3</strong> — DP flow follows a square law, and the extraction must happen
              exactly once.
            </li>
            <li>
              <strong>2.4</strong> — a hydrostatic level is a weight converted using an assumed
              density.
            </li>
            <li>
              <strong>2.5</strong> — a digital system can only see what its resolution allows and
              only when it happens to be looking.
            </li>
          </ul>
          <p>
            In not one of those cases was anything broken. Each was an instrument performing exactly
            as designed while a condition it quietly depended on had changed — or had never been
            true in the first place.
          </p>
          <p>
            That is why the useful question is not &ldquo;is this instrument working?&rdquo; but{' '}
            <strong>
              &ldquo;what does this measurement depend on, and is that still true?&rdquo;
            </strong>{' '}
            Module 3 takes the signal onward from the transmitter, Module 6 proves instruments
            against a reference, and Module 8 turns this question into a systematic method. The
            question itself is the thing to carry forward.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Selecting on the headline accuracy figure"
          whatHappens="Two instruments are compared on quoted accuracy and the better figure wins. In service it is worse — because the figure was achieved under reference conditions, at a favourable point in the range, and the installation cannot reproduce any of that."
          doInstead="Read what the accuracy figure is referenced to and over what range it holds, then compare it against the conditions the instrument will actually live in. An instrument quoted as a percentage of span behaves very differently from one quoted as a percentage of reading once you are working at 20% of range — and that difference usually outweighs the headline number."
        />

        <CommonMistake
          title="Specifying a like-for-like replacement without revisiting the original reasoning"
          whatHappens="An instrument fails and is replaced with the same model, because that is what was there. Nobody asks whether the process has changed since it was chosen — a new product, a different throughput, a modified line — and the replacement inherits a selection that no longer fits."
          doInstead="Treat a failure as a prompt to re-run the constraints briefly. Same fluid? Same range? Same duty? Usually the answer is yes and the replacement is correct — but the times it is not are exactly the times a repeat failure is trying to tell you something, and fitting the same part again guarantees the same outcome."
        />

        <ConceptBlock
          title="Who decides, and what an instrument person contributes"
          plainEnglish="Selection is rarely one person's call. Knowing where your judgement is the valuable one saves a lot of wasted argument."
          onSite="You will more often be inheriting a selection than making one. Understanding it is what lets you say something useful about it."
        >
          <p>
            On a new project, sensor selection typically involves a process engineer who knows what
            the plant must do, a project or design engineer working to a budget and a schedule, a
            piping engineer optimising layout, and an instrument person who will have to live with
            the result.
          </p>
          <p>The instrument contribution is specific, and it is worth knowing what it is:</p>
          <ul>
            <li>
              <strong>Whether the measurement is achievable as specified.</strong> The range and
              accuracy conflict described above is the commonest one, and it is far cheaper raised
              early.
            </li>
            <li>
              <strong>What the installation will do to it.</strong> Nobody else in that room is
              thinking about straight run, impulse-line orientation or thermowell lag.
            </li>
            <li>
              <strong>Whether it can be proved and maintained.</strong> Calibration access is
              invisible on a P&amp;ID and decisive in service.
            </li>
            <li>
              <strong>What the failure modes are, and which direction they fail in.</strong> Module
              1 Section 5 and the burnout discussion in 2.2 both bear on this.
            </li>
          </ul>
          <p>
            On existing plant the position is different and more common: you are inheriting choices
            made by people who have left, for reasons nobody recorded. The habit that helps is the
            same one — reconstruct what the measurement depends on, and you will usually work out
            both why it was chosen and what has since stopped being true about it.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Is there a selection table I can just use?',
              answer:
                'Manufacturers publish them and they are useful for narrowing a field quickly. What they cannot do is tell you which constraint dominates on your particular duty, or what your process will do to the instrument over five years. Use them to shorten the list, not to make the decision.',
            },
            {
              question: 'How much should the existing site standard influence the choice?',
              answer:
                'More than a purist would like. A site with the spares, the calibration equipment and the familiarity for one type will maintain it better than a technically superior instrument that is the only one of its kind. That is a real engineering consideration, not a compromise — although it should not survive a genuine mismatch to the duty.',
            },
            {
              question: 'What if the constraints leave nothing suitable?',
              answer:
                'Then a requirement has to move, and saying so early is the valuable contribution. Usually it is the range, sometimes the accuracy, occasionally the installation. Discovering the conflict at specification is a design decision; discovering it at commissioning is an argument.',
            },
            {
              question: 'Should I always choose non-contact where I can?',
              answer:
                'No. Non-contact removes material compatibility problems and introduces line-of-sight ones — obstructions, foam, vapour, surface condition. Section 2.4 set out both sides. Neither category is safer in general; they fail differently, and you choose which failure mode you would rather manage.',
            },
            {
              question: 'How do I judge whether an installation is acceptable?',
              answer:
                'Compare it against the manufacturer’s stated requirement for that element, expressed in pipe diameters or mounting conditions. Where it falls short, say so in writing and record it. A documented compromise is manageable; an undocumented one becomes somebody’s fault-finding exercise years later.',
            },
            {
              question: 'How do I argue against a selection I think is wrong?',
              answer:
                'Name the constraint rather than the preference. "I would rather have a magmeter" invites a debate about taste; "this fluid is non-conductive, so a magmeter cannot work here" ends one. The same applies in reverse — if someone can name a constraint you had not considered, they are right and the conversation has done its job.',
            },
            {
              question: 'Does any of this apply to instruments not covered in this module?',
              answer:
                'That is precisely the point. Analytical measurement, vibration, dimensional gauging and everything else obey the same discipline: identify the physical principle, name what it depends on, and work out what would defeat it. The method transfers even where the device is unfamiliar.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Understand the physical principle and both the right applications and the likely problems become much easier to see. That is worth more than any catalogue.',
            'For any instrument, name the property it depends on and the condition that would defeat it. That habit serves selection and fault-finding equally.',
            '"Flow" is not one quantity — volumetric, mass and standardised volumetric are different things, and agreeing which is wanted is part of the selection.',
            'Constraints eliminate; specifications rank. Work through what the process forbids before comparing datasheets.',
            'Most technologies cannot stay linear from maximum rated flow down to zero, however well matched they are. Turndown, not accuracy, is the requirement that usually cannot be met.',
            'Installation frequently decides measurement quality more than instrument choice — and good piping layout and good measurement often want opposite things.',
            'A poorly located instrument may be repeatable and consistently wrong, which can still be useful for control while being untrustworthy as an absolute value.',
            'The cheapest instrument that answers the actual question is the right one. Ask what will be done differently because of the reading.',
            'Read an accuracy figure properly: a percentage of what, under what conditions, and over what part of the range.',
            'Name the constraint, not the preference. A constraint ends a selection argument; a preference prolongs one.',
            'Record the reasoning, the assumptions and the compromises — not just the model number.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 2.6" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Analogue and digital output
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-7')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Analytical measurement
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule2Section6;
