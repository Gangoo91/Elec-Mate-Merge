/**
 * Module 2 · Section 7 — Analytical measurement: conductivity and pH
 *
 * NEW SECTION, written 2026-08-29. It did not exist before.
 *
 * 🔴 WHY IT WAS ADDED. Module 1 Section 1 tells learners that industry measures
 * about nine quantities, and lists "chemical concentration — pH, conductivity,
 * dissolved oxygen, gas composition" among them. An audit of the whole
 * eight-module syllabus found that NO section anywhere covered it. The only
 * mention of a pH electrode in the entire course was as a passing example in
 * Section 2.1. The course was promising something it never delivered.
 *
 * The two measurements taught here are the two an electrician moving into
 * instrumentation will actually meet — conductivity on water treatment and
 * boiler feedwater, pH on effluent and process control. Chromatography and gas
 * analysis are named and deliberately left alone: they are a specialism, and
 * pretending otherwise would be worse than omitting them.
 *
 * The through-line continues the module's argument. Conductivity depends on
 * probe GEOMETRY as much as on the liquid, which is why a raw conductance
 * reading says little; pH depends on TEMPERATURE and on a reference electrode
 * that ages. Both are the same lesson the rest of Module 2 has been making:
 * name what the measurement leans on, and you know what will defeat it.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * ch.23, extracted to scratchpad/src/m2s7_analytical.txt. Held in
 * ~/Desktop/hav/instrumentation.
 *
 * ⚠️ No standard numbers are cited. Buffer values and calibration intervals are
 * described as practice, not as requirements of any standard we do not hold.
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

const TITLE =
  'Analytical measurement: conductivity and pH | Instrumentation Module 2.7 | Elec-Mate';
const DESCRIPTION =
  'Why conductivity tells you how much is dissolved but not what, how probe geometry enters the reading, why pH is a voltage generated across a membrane, and why both measurements demand more maintenance than anything else in this module.';

const outcomes = [
  'Explain what makes water conduct, and why pure water is a poor conductor',
  'Say why conductivity is a non-specific measurement and when that still makes it useful',
  'Explain why probe geometry affects a conductance reading, and what cell constant corrects for',
  'Describe why two-electrode probes suffer from fouling and what four-electrode and electrodeless designs do about it',
  'Explain that pH is measured as a voltage generated across a membrane',
  'Say why pH measurement is temperature sensitive and why the reference electrode is the usual failure',
  'Judge what maintenance an analytical measurement will demand before specifying one',
  'Explain why a pH calibration uses two buffers, and what the resulting slope figure tells you',
  'Recognise a sample system as part of the measurement, and its transport lag as dead time',
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why does adding salt to pure water increase its electrical conductivity?',
    options: [
      'The salt crystals conduct electricity directly',
      'The salt dissociates into positive and negative ions, which are then free to act as electrical charge carriers',
      'Salt raises the temperature of the water',
      'Salt reduces the water’s resistance to heat',
    ],
    correctIndex: 1,
    explanation:
      'Pure water is a very poor conductor. Any substance that enhances conductivity when dissolved is an electrolyte, and it does so because its molecules separate into positive and negative ions which then serve as charge carriers. For an ionic compound like table salt that separation is called dissociation.',
  },
  {
    id: 2,
    question: 'What is the main limitation of a conductivity measurement?',
    options: [
      'It only works on hot liquids',
      'It is non-specific — it indicates gross ionic content but tells you nothing about which ions are present',
      'It cannot be used continuously',
      'It requires the liquid to be flowing',
    ],
    correctIndex: 1,
    explanation:
      'Conductivity is about as unselective as analytical measurement gets. It reports roughly how much ionic material is present and nothing whatever about what that material is. That makes it meaningful only where you already know which species are present, or where the goal is to eliminate all ions — as in ultra-pure water treatment, where the ideal is zero conductivity.',
  },
  {
    id: 3,
    question: 'Why does a raw conductance reading say little about the liquid itself?',
    options: [
      'Because conductance is always measured in error',
      'Because it depends just as much on the geometry of the electrodes — their area and separation — as on the ionic activity of the solution',
      'Because conductance changes with atmospheric pressure',
      'Because conductance is a digital measurement',
    ],
    correctIndex: 1,
    explanation:
      'Conductance depends on plate area and separation distance as much as on the liquid. What is actually wanted is specific conductivity, independent of the probe geometry. It is exactly the same problem as measuring a piece of wire and getting a result about that specimen rather than about the metal.',
  },
  {
    id: 4,
    question: 'How is pH most commonly measured for continuous process work?',
    options: [
      'By colour change, using indicator dyes',
      'Electrochemically — pH-sensitive electrodes generate a voltage dependent on the pH of the solution',
      'By measuring the solution’s conductivity',
      'By titration',
    ],
    correctIndex: 1,
    explanation:
      'Dyes and papers work well enough on a bench sample but there is no way to run them continuously on a live process. Nearly all process pH is measured electrochemically instead: an electrode sitting in the liquid produces a small voltage that varies with acidity.',
  },
  {
    id: 5,
    question:
      'A pH measurement drifts steadily over weeks and needs recalibrating more and more often. What is the most likely cause?',
    options: [
      'The transmitter is failing',
      'The electrodes are ageing or fouling — analytical sensors are consumable and the reference electrode in particular degrades in service',
      'The cable is too long',
      'The process temperature has changed',
    ],
    correctIndex: 1,
    explanation:
      'pH electrodes are consumable items with a service life, and the reference electrode is usually what goes first. Increasing frequency of recalibration is the classic sign that the sensor is nearing the end of its life rather than that the calibration was done badly.',
  },
  {
    id: 6,
    question: 'Why is ultra-pure water an unusual case for conductivity measurement?',
    options: [
      'Because conductivity cannot be measured in pure water',
      'Because the aim is to eliminate all ions, so the non-specific nature of the measurement stops being a limitation',
      'Because pure water conducts better than salt water',
      'Because it requires a pH electrode instead',
    ],
    correctIndex: 1,
    explanation:
      'Normally the weakness of conductivity is that it cannot tell you which ions are present. Where the goal is zero ions — boiler feedwater, semiconductor manufacturing — you do not care which ions they are, because you want none of them. The measurement’s limitation becomes irrelevant.',
  },
];

const InstrumentationModule2Section7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage>
      <HubMasthead
        section="Module 2 · Section 7"
        title="Analytical measurement"
        backTo="/electrician/upskilling/instrumentation-module-2"
      />
      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Measuring what is <em>in</em> the process rather than what it is doing — and the two
          analytical measurements you are most likely to meet.
        </p>

        <TLDR
          points={[
            'Pure water is a very poor conductor. Dissolved substances separate into ions, and those ions are what carry current — so conductivity is a measure of ionic content.',
            '🔴 Conductivity is NON-SPECIFIC. It tells you how much is dissolved, never what. It is useful only when you already know the species present, or when the aim is to have none.',
            'A raw conductance reading depends on probe geometry as much as on the liquid — which is why probes carry a cell constant to convert it into something about the process.',
            'pH is measured as a VOLTAGE generated across a membrane by pH-sensitive electrodes. It is not a resistance measurement.',
            'Both are temperature sensitive, and both use consumable electrodes that age. Needing recalibration more and more often is the sensor telling you it is nearly finished.',
            'Analytical instruments demand more maintenance than anything else in this module. Specify one only if somebody will look after it.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>A different kind of question</ContentEyebrow>

        <ConceptBlock
          title="Measuring composition rather than condition"
          plainEnglish="Everything else in this module measures what the process is doing. Analytical measurement asks what the process is made of."
          onSite="Analytical instruments are the ones with a sample system, a maintenance schedule and a bottle of buffer solution nearby. That is not incidental — it is what the measurement costs."
        >
          <p>
            Module 1 Section 1 listed the quantities industry measures, and{' '}
            <strong>chemical concentration</strong> was among them alongside pressure, flow,
            temperature and level. This section covers it.
          </p>
          <p>The distinction is worth stating plainly:</p>
          <ul>
            <li>
              <strong>Temperature, pressure, flow and level</strong> describe the <em>condition</em>{' '}
              of a process — how hot, how hard, how fast, how full.
            </li>
            <li>
              <strong>Analytical measurements</strong> describe its <em>composition</em> — what is
              dissolved in it, how acidic it is, what gases are present.
            </li>
          </ul>
          <p>
            That difference has a practical consequence you will feel immediately. A pressure
            transmitter can sit on a line for years and be checked annually. An analytical
            instrument is in intimate contact with the chemistry it is measuring, and the chemistry
            attacks it. These are the instruments with the shortest service life and the heaviest
            maintenance burden on any plant.
          </p>
          <p>
            Two measurements dominate what an electrician moving into instrumentation will meet:{' '}
            <strong>conductivity</strong> and <strong>pH</strong>. Both appear on water treatment,
            effluent, boiler feedwater and a great deal of process control. Chromatography and gas
            analysis exist and are genuinely specialist; they are named here and not taught, because
            a superficial treatment would be worse than an honest omission.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>What makes water conduct</ContentEyebrow>

        <ConceptBlock
          title="Ions carry the current, not the water"
          plainEnglish="Water itself barely conducts. What conducts is the stuff dissolved in it, once it has split into charged particles."
          onSite="This is why conductivity is used as a purity measurement. Less dissolved material means fewer charge carriers means lower conductivity."
        >
          <p>
            <strong>Pure water is a very poor conductor of electricity.</strong> Some water
            molecules do ionise into charged halves — negatively charged hydroxyl ions and
            positively charged hydrogen ions — but at room temperature the percentage is extremely
            small.
          </p>
          <p>
            Any substance that enhances electrical conductivity when dissolved in water is an{' '}
            <strong>electrolyte</strong>. The enhancement happens because the electrolyte&rsquo;s
            molecules separate into positive and negative ions, which are then free to act as
            electrical charge carriers.
          </p>
          <p>The two words for that separation are worth knowing apart:</p>
          <ul>
            <li>
              <strong>Dissociation</strong> — the separation of an <em>ionically bonded</em>{' '}
              compound. Table salt is the common example; its ions naturally separate in solution.
            </li>
            <li>
              <strong>Ionisation</strong> — the separation of a <em>covalently bonded</em> compound,
              such as hydrogen chloride, which is not ionic in its pure state.
            </li>
          </ul>
          <p>
            Both describe formerly joined atoms separating on entering solution; the difference is
            what kind of substance is splitting.
          </p>
          <p>
            The measurement consequence: ionic impurities added to water — salts, metals —
            immediately dissociate and become available as charge carriers. So{' '}
            <strong>
              the electrical conductivity of a water sample is a function of its ionic impurity
              concentration
            </strong>
            . That makes conductivity an important measurement for water purity work, including
            boiler feedwater treatment and the preparation of high-purity water for semiconductor
            manufacturing.
          </p>
        </ConceptBlock>

        <Pullquote>
          Conductivity does not measure the water. It measures what somebody has put in it.
        </Pullquote>

        <ConceptBlock
          title="🔴 Conductivity tells you how much, never what"
          plainEnglish="A conductivity reading is a total. It cannot distinguish salt from acid from dissolved metal — only that something is there."
          onSite="If a conductivity alarm goes off, you know contamination has occurred. You do not know what has contaminated it, and the instrument cannot tell you."
        >
          <p>This is the single most important limitation, and it is worth being blunt about:</p>
          <p>
            <strong>
              Conductivity is about as unselective as analytical measurement gets. It gives you a
              rough total for how much ionic material is dissolved in a liquid, and tells you
              nothing at all about which ions those are.
            </strong>
          </p>
          <p>
            So conductivity is meaningful in only two situations, and it is worth recognising which
            one you are in:
          </p>
          <ul>
            <li>
              <strong>You already know what is in there.</strong> On a process where the species is
              known and only the concentration varies, conductivity tracks that concentration
              usefully — a caustic dosing line, say.
            </li>
            <li>
              <strong>You want nothing in there at all.</strong> In ultra-pure water treatment the
              ideal is zero conductivity, so the types of ions do not matter — any ion is a failure.
              Here the non-specificity stops being a weakness entirely.
            </li>
          </ul>
          <p>
            Where neither applies — an unknown effluent, a mixed stream — a conductivity reading is
            a change detector rather than an analysis. That is still useful, provided nobody
            mistakes it for knowing what has changed.
          </p>
          <p>
            It is worth putting that beside the rest of the module. A temperature measurement is
            specific — it reports one quantity and nothing else. Conductivity reports a <em>sum</em>
            : every ion in the solution contributing together, with no way to unpick them. That is a
            genuinely different kind of measurement, and treating it like the others is where the
            misunderstandings start.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-7-nonspecific"
          question="A conductivity alarm trips on a cooling water return. What does that reading actually establish?"
          options={[
            'That a specific contaminant has entered the system',
            'That the water temperature has risen',
            'That the pH has fallen',
            'That the ionic content has risen — something conductive is present, but not what',
          ]}
          correctIndex={3}
          explanation="Conductivity is a gross indication of ionic content. A rise tells you dissolved ionic material has increased — a leak, a dosing fault, an ingress — but the instrument cannot distinguish between them. Identifying the contaminant requires a different measurement or a laboratory sample."
        />

        <SectionRule />
        <ContentEyebrow>The probe is part of the answer</ContentEyebrow>

        <ConceptBlock
          title="Why geometry enters the reading"
          plainEnglish="Measuring conductance between two plates tells you about that arrangement of plates, not about the liquid on its own. The probe's dimensions are baked into the result."
          onSite="Never treat a conductivity probe as interchangeable on the basis that it fits. Its geometry is part of the calibration."
        >
          <p>
            The simplest conductivity sensor — sometimes called a conductivity cell — is two metal
            electrodes in the solution, connected to a circuit measuring{' '}
            <strong>conductance</strong>, the reciprocal of resistance.
          </p>
          <p>
            The difficulty is that{' '}
            <strong>
              the conductance you calculate says surprisingly little about the liquid, because the
              plates themselves are half the answer — how big they are and how far apart they sit
              weigh just as heavily as anything happening in the solution
            </strong>
            .
          </p>
          <p>
            There is a parallel here that lands immediately for anyone with an electrical
            background. Measure the resistance of a piece of wire and you learn the resistance{' '}
            <em>of that specimen</em> &mdash; a result depending on its length and cross-section as
            much as on the metal. To say something about the metal itself you need{' '}
            <strong>resistivity</strong>, which accounts for the dimensions.
          </p>
          <p>
            Conductivity measurement faces the identical problem and solves it the identical way.
            What is wanted is <strong>specific conductivity</strong> — a property of the liquid,
            independent of plate geometry. The probe&rsquo;s dimensions are characterised as a{' '}
            <strong>cell constant</strong>, and the instrument uses it to convert the measured
            conductance into something meaningful about the process.
          </p>
          <p>Two consequences follow directly, and both are practical:</p>
          <ul>
            <li>
              <strong>The cell constant must match the probe.</strong> Fit a probe of different
              geometry without updating the configuration and every reading is wrong by a factor —
              the same class of error as the alpha mismatch in Section 2.2.
            </li>
            <li>
              <strong>Anything that changes the effective geometry changes the reading.</strong>{' '}
              Coating on the electrodes alters the effective area, so fouling does not merely
              degrade the measurement — it shifts it.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="Two electrodes, four electrodes, or none in contact at all"
          plainEnglish="Fouling is the enemy. Each probe design is a different answer to the problem of electrodes getting dirty."
          onSite="If a site has moved from two-electrode to electrodeless probes, the reason is almost always that the process kept coating them."
        >
          <p>Three designs exist, and understanding why is more useful than memorising which:</p>
          <ul>
            <li>
              <strong>Two-electrode</strong> — the primitive form. Simple and cheap. Because the
              same pair both passes current and senses voltage, anything that builds up on the
              electrode surfaces enters the measurement directly.
            </li>
            <li>
              <strong>Four-electrode</strong> — separates the current-carrying and voltage-sensing
              jobs across different electrodes. If that sounds familiar it should: it is precisely
              the reasoning behind the four-wire RTD connection in Section 2.2, applied to a
              different problem. Separating the two functions removes the effect of resistance in
              the current path.
            </li>
            <li>
              <strong>Electrodeless</strong> — no metal in contact with the liquid at all. Where the
              process attacks or coats electrodes, removing them from contact solves the problem
              rather than mitigating it.
            </li>
          </ul>
          <p>
            The progression is the same story told three times: a measurement that touches the
            process is degraded by the process, and each design step buys immunity at a cost. This
            is the contact-versus-non-contact trade from Section 2.4 in another guise.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>pH is a voltage</ContentEyebrow>

        <ConceptBlock
          title="pH measurement is potentiometric — the electrode generates a signal"
          plainEnglish="A pH probe does not vary its resistance. It generates a small voltage that depends on the acidity of what it is in."
          onSite="Because it generates a tiny voltage from a very high-impedance source, pH wiring is fussy in a way almost nothing else in this module is."
        >
          <p>
            Dyes and papers that change colour are fine for a sample on a bench, and there is no
            practical way to run them continuously on a live process.
          </p>
          <p>
            <strong>
              So process pH is measured electrochemically almost without exception: an electrode
              designed to respond to acidity sits in the liquid and produces a small voltage, and
              that voltage varies with the pH around it.
            </strong>
          </p>
          <p>
            Like the other voltage-producing analytical measurements, it rests on the{' '}
            <strong>Nernst equation</strong> &mdash; the relationship that predicts what potential
            appears when ions move across a membrane that only partly lets them through. The
            standard illustration is a concentration cell: one cell, two halves, a different ion
            concentration in each, and a voltage between them as a result.
          </p>
          <p>
            Compare that with everything else in this module and note where it sits. A thermocouple
            also generates its own voltage — Section 2.2 — and, like a thermocouple, a pH electrode
            is a <strong>primary sensing element</strong> producing a physical effect rather than a
            usable signal. It needs a transmitter for exactly the reasons Section 2.1 set out, and
            more urgently: the source impedance is extremely high, so the signal is far more fragile
            than a thermocouple&rsquo;s.
          </p>
          <p>
            That fragility is why pH installations use special cable, keep runs short, and very
            often put the transmitter within a couple of metres of the electrode. Treating pH wiring
            like ordinary instrument wiring produces a noisy, drifting, unusable measurement — and
            nothing will look broken.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-7-ph"
          question="What does a pH electrode physically produce?"
          options={[
            'A voltage generated by ions migrating through a permeable membrane',
            'A resistance that varies with acidity',
            'A current proportional to hydrogen concentration',
            'A frequency that varies with pH',
          ]}
          correctIndex={0}
          explanation="pH measurement is potentiometric — voltage-based. The electrode generates a potential described by the Nernst equation, arising from ions migrating through a permeable membrane. That makes it a primary sensing element in exactly the sense Section 2.1 defined, and one with a very high source impedance."
        />

        <ConceptBlock
          title="Temperature, and the electrode that quietly wears out"
          plainEnglish="The voltage a pH electrode produces depends on temperature as well as pH, so the instrument has to know how hot the solution is. And the electrode is a consumable."
          onSite="Rising recalibration frequency is the diagnostic. When an electrode needs adjusting monthly where it used to hold for a quarter, it is telling you it is finishing."
        >
          <p>
            Two things about pH catch people out, and both follow from the physics rather than from
            any fault.
          </p>
          <p>
            <strong>Temperature.</strong> The Nernst relationship involves temperature directly, so
            the same solution generates a different voltage hot and cold. A pH measurement therefore
            needs a temperature measurement alongside it — which is why a pH assembly normally
            includes a temperature element, and why that element is not optional. This is the same
            shape as the density dependence in Section 2.4: a second quantity the primary
            measurement silently relies on.
          </p>
          <p>
            <strong>Ageing.</strong> pH electrodes are <strong>consumable</strong>. The reference
            electrode in particular degrades in service — it can be poisoned by process chemicals,
            clogged at its junction, or simply exhausted with time. This is not a failure to
            prevent; it is a service life to plan for.
          </p>
          <p>
            The diagnostic signature is the useful part.{' '}
            <strong>
              An electrode nearing end of life needs recalibrating more and more frequently
            </strong>
            , and the calibration holds for shorter and shorter periods. That trend is worth
            recording, because it predicts the replacement rather than discovering it — and Module 6
            covers why as-found and as-left records make trends like this visible at all.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Calibrating with buffers — a two-point calibration you can actually see"
          plainEnglish="pH is calibrated by putting the electrode in solutions of known pH and telling the instrument what it should be reading. It is the clearest example of calibration in the whole course."
          onSite="Two points, bracketing the range you care about. Rinse between them. Never dip the probe into the stock bottle."
        >
          <p>
            Module 1 Section 4 set out the principle: a calibration is a comparison against a
            reference, and it is only ever as good as that reference. pH is where you meet it
            physically, because the reference is a bottle of liquid in your hand.
          </p>
          <p>
            <strong>Buffer solutions</strong> are prepared to hold a known, stable pH. Calibration
            means placing the electrode in one, letting the reading settle, and telling the
            instrument what the true value is — then repeating with a second buffer at a different
            value.
          </p>
          <p>Why two points rather than one, and why those two:</p>
          <ul>
            <li>
              <strong>One point sets the offset; two set the slope.</strong> A single-point
              calibration can only shift the whole response up or down. It cannot correct the rate
              at which the electrode&rsquo;s output changes with pH — and that slope is exactly what
              degrades as an electrode ages.
            </li>
            <li>
              <strong>The two buffers should bracket the range you care about</strong>, for the
              reason Section 2.3 gave about mid-range checks: a calibration proves the points you
              test and infers the rest.
            </li>
          </ul>
          <p>
            The slope is the genuinely useful diagnostic here. A new electrode produces close to its
            theoretical output per pH unit; an ageing one produces progressively less. Many
            instruments report the calculated slope after a calibration, and{' '}
            <strong>
              watching that figure fall over successive calibrations predicts the failure
            </strong>{' '}
            far better than waiting for the reading to drift. That is a trend, and it only exists if
            somebody records it.
          </p>
        </ConceptBlock>

        <Scenario
          title="A pH loop that will not hold its calibration"
          situation="A pH measurement on an effluent discharge is calibrated and reads correctly against a laboratory sample. Two weeks later it is out by 0.4 pH. It is recalibrated. Ten days later it is out again. The technician recalibrates a third time and starts to suspect the transmitter."
          whatToDo="Look at the interval rather than the error. A calibration holding for progressively shorter periods is the classic signature of an ageing electrode, particularly the reference. Check the electrode's age and service history before condemning the transmitter, and check whether the process contains anything known to poison a reference junction. Fit a new electrode and re-establish the baseline."
          whyItMatters="Every individual calibration was performed correctly, and the transmitter is healthy throughout. The information is not in any single reading — it is in the shortening interval between them, which only becomes visible if somebody records when each calibration was done and how far out it had drifted. Without that record this loop gets recalibrated indefinitely by three different people who each think they have fixed it."
        />

        <SectionRule />
        <ContentEyebrow>Getting the sample to the sensor</ContentEyebrow>

        <ConceptBlock
          title="Sample systems — a small process of their own"
          plainEnglish="Many analysers do not sit in the pipe. A sample is drawn off, conditioned and delivered to them — and that sample line has all the problems of a process in miniature."
          onSite="When an analyser reading looks wrong, establish that the sample reaching it is representative before doubting the analyser."
        >
          <p>
            Conductivity and pH probes are often inserted directly into the process. Many other
            analytical instruments cannot be, and instead take a <strong>sample</strong> — drawn
            from the process, conditioned to a suitable temperature and pressure, filtered, and
            delivered to the analyser.
          </p>
          <p>
            That sample system is a process in miniature, and it introduces problems the analyser
            itself has nothing to do with:
          </p>
          <ul>
            <li>
              <strong>Transport lag.</strong> The sample takes time to travel from the tapping to
              the analyser. The reading therefore describes the process as it was some minutes ago —
              which is dead time, in exactly the sense Section 2.5 defined it, and it makes closed
              loop control on an analyser genuinely difficult.
            </li>
            <li>
              <strong>Representativeness.</strong> A sample drawn from a stagnant pocket, from a
              stratified line, or from a point where mixing is incomplete is not the process. The
              analyser will measure it perfectly.
            </li>
            <li>
              <strong>Change in transit.</strong> A sample can cool, degas, precipitate or react on
              its way. What arrives is not always what was tapped.
            </li>
            <li>
              <strong>Blockage and fouling</strong> in the sample line, which usually produces a
              reading that stops responding rather than one that fails obviously.
            </li>
          </ul>
          <p>
            The lesson generalises beyond analysers, and connects back to Section 2.3: the impulse
            lines on a DP set are a sample system too, and they fail for the same reasons. Anywhere
            the process is brought to the instrument rather than the instrument taken to the
            process, the path between them is part of the measurement.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Dissolved oxygen, and where analytical measurement goes next"
          plainEnglish="Beyond conductivity and pH, the measurements get more specific and more specialised — but the same pattern of dependencies runs through all of them."
          onSite="You are unlikely to be asked to maintain a chromatograph early on. You are quite likely to meet a dissolved oxygen probe on a water treatment plant."
        >
          <p>
            Module 1 Section 1 listed dissolved oxygen and gas composition alongside pH and
            conductivity. A brief orientation, so you recognise what you are looking at:
          </p>
          <ul>
            <li>
              <strong>Dissolved oxygen</strong> — how much oxygen is present in a liquid. Central to
              wastewater treatment, where the biological process depends on it, and to boiler
              feedwater, where oxygen drives corrosion. Like pH, the sensing element is in contact
              with the process and is consumable.
            </li>
            <li>
              <strong>Gas composition</strong> — what a gas stream is made of, measured by analysers
              ranging from single-gas detectors to full chromatographs that separate a mixture into
              its components and quantify each.
            </li>
            <li>
              <strong>Chromatography</strong> — a laboratory technique automated for process use. It
              separates a sample into its constituent species and measures each in turn, which is
              why it produces a result periodically rather than continuously.
            </li>
          </ul>
          <p>
            That last point is worth noticing, because it is a different kind of measurement from
            everything else in this module. A chromatograph does not produce a continuous signal at
            all — it produces an answer every few minutes. From a control perspective that is a
            large amount of dead time, and it shapes what such a measurement can usefully be used
            for.
          </p>
          <p>
            The through-line still holds. Each of these depends on something —{' '}
            <strong>
              a representative sample, a stable temperature, an intact membrane, a valid calibration
            </strong>{' '}
            — and each fails when that dependency is quietly broken. The devices are unfamiliar; the
            discipline is the one this module has been teaching throughout.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-2-7-sample"
          question="An analyser fed by a sample line reads correctly but responds to process changes several minutes late. Is this a fault?"
          options={[
            'Yes — the analyser needs recalibrating',
            'No — that is transport lag in the sample system, which is dead time and inherent to the arrangement',
            'Yes — the sample line is blocked',
            'No — analysers are always slow',
          ]}
          correctIndex={1}
          explanation="The sample takes real time to travel from the tapping to the analyser, so the reading describes the process as it was. That is dead time in exactly the sense Section 2.5 defined, and it is a property of the installation rather than a fault. It does, however, make closed-loop control on that measurement much harder — which is a design consideration, not a maintenance one."
        />

        <SectionRule />
        <ContentEyebrow>What these instruments cost you</ContentEyebrow>

        <ConceptBlock
          title="Specify an analytical measurement only if it will be maintained"
          plainEnglish="These instruments need looking after in a way the rest of this module does not. An unmaintained analytical measurement is worse than none, because people still believe it."
          onSite="Before agreeing to an analytical instrument, ask who will calibrate it, how often, and what happens when the electrode needs replacing at three in the morning."
        >
          <p>
            Everything about analytical measurement demands more than the instruments earlier in
            this module:
          </p>
          <ul>
            <li>
              <strong>Consumable sensing elements</strong> with a finite service life, and therefore
              a spares holding and a replacement plan.
            </li>
            <li>
              <strong>Regular calibration against buffer solutions</strong>, which themselves have a
              shelf life and can be contaminated by careless use.
            </li>
            <li>
              <strong>Cleaning</strong>, because fouling shifts readings rather than merely dulling
              them.
            </li>
            <li>
              <strong>Sample systems</strong> on many installations — a small process in their own
              right, with their own blockages and lags.
            </li>
          </ul>
          <p>
            The honest question at specification is not whether the measurement is possible but
            whether it will be looked after. An analytical instrument that has not been calibrated
            for a year is still displaying a number, and people will still act on it. That is
            materially worse than not having the measurement, because an absent reading prompts a
            sample and a wrong one does not.
          </p>
          <p>
            This is the maintenance version of the argument Section 2.6 made about selection:{' '}
            <strong>the cheapest instrument that answers the question is the right one</strong>. If
            an occasional laboratory sample answers it, that may genuinely beat a continuous
            measurement nobody has time to maintain.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Treating a conductivity reading as an identification"
          whatHappens="A conductivity rise on a condensate return is reported as 'contamination', and a search begins for the assumed cause. The actual ingress is something else entirely, and days are lost because everyone believed the instrument had said more than it did."
          doInstead="State what the measurement establishes and what it does not. Conductivity has told you that ionic content has risen — that is real and valuable. It has not told you what the ion is. Where identification matters, that requires a laboratory sample or a specific analyser, and saying so early prevents a search built on an assumption."
        />

        <CommonMistake
          title="Calibrating a pH loop with tired or contaminated buffer"
          whatHappens="A pH instrument is calibrated using buffer solution from a bottle that has been open for months, dipped into repeatedly with a probe carrying process residue. The instrument is faithfully adjusted to match a reference that is no longer what its label claims, and the loop is now confidently wrong."
          doInstead="Treat buffer as a calibration standard, because that is exactly what it is — Module 1 Section 4 made the point that a calibration is only as good as the standard behind it. Use in-date buffer, decant rather than dipping into the stock bottle, rinse the electrode between solutions, and discard what has been used. The discipline is the same as for any reference."
        />

        <FAQ
          items={[
            {
              question: 'Is conductivity the same as TDS?',
              answer:
                'They are related but not identical. Total dissolved solids is often estimated from conductivity using a conversion factor, and that factor depends on which ions are present — which conductivity cannot tell you. So a TDS figure derived from conductivity carries an assumption about composition, in exactly the way a hydrostatic level carries an assumption about density.',
            },
            {
              question: 'Why does a pH probe need such special cable?',
              answer:
                'Because the electrode is a very high-impedance voltage source producing a tiny signal, so it is easily disturbed by moisture, dirt at connections and induced noise. Ordinary instrument cable, ordinary terminations and long runs all degrade it — which is why the transmitter usually sits very close to the electrode.',
            },
            {
              question: 'Can a pH electrode be left dry?',
              answer:
                'It should not be. pH electrodes are designed to be kept wet and are typically stored in a solution rather than in air. A probe left dry — during an outage, or in a stores cupboard — may be damaged or need a long soak before it behaves properly again.',
            },
            {
              question: 'What is a cell constant?',
              answer:
                'A characterisation of a conductivity probe’s geometry — its electrode area and separation — used to convert the measured conductance into specific conductivity of the liquid. It is a property of the probe, and it must match what the instrument is configured for, exactly as the alpha value must match on an RTD.',
            },
            {
              question: 'Are chromatographs and gas analysers part of this job?',
              answer:
                'They exist on refineries, petrochemical plant and anywhere gas composition is controlled, and they are a genuine specialism with their own training. This section names them so you recognise what you are looking at, and does not pretend to teach them.',
            },
            {
              question: 'What does the calibration slope tell me?',
              answer:
                'How much output the electrode produces per unit of pH. A new electrode is close to its theoretical figure and an ageing one produces progressively less, so a slope falling across successive calibrations predicts the replacement. It is the single most useful number to record from a pH calibration, and it is routinely thrown away.',
            },
            {
              question: 'Can conductivity and pH be measured by the same instrument?',
              answer:
                'They are different sensing principles and need different probes — conductivity passes current through the liquid, pH generates a voltage across a membrane. Multi-parameter transmitters accepting several probes are common, so one box on the wall may well be reporting both, but the sensing elements in the process are separate.',
            },
            {
              question: 'Why do analytical instruments fail so much more than others?',
              answer:
                'Because they are in intimate chemical contact with the process by design. A pressure transmitter is separated from the process by a diaphragm; a pH electrode has to touch it to work. That contact is the measurement, and it is also what consumes the sensor.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Pure water is a very poor conductor. Dissolved electrolytes separate into ions, and those ions carry the current — so conductivity measures ionic content.',
            'Dissociation is the separation of ionic compounds such as salt; ionisation is the separation of covalent compounds such as hydrogen chloride.',
            '🔴 Conductivity is non-specific. It indicates how much is dissolved and never what — useful only when the species is known, or when the aim is zero ions.',
            'Conductance depends on probe geometry as much as on the liquid, exactly as wire resistance depends on the specimen. The cell constant converts it to specific conductivity.',
            'Two-electrode probes suffer from fouling; four-electrode separates current and sensing paths, and electrodeless removes metal from contact altogether.',
            'pH is potentiometric — the electrode generates a voltage described by the Nernst equation, from a very high-impedance source that makes wiring critical.',
            'pH depends on temperature, so a temperature element is part of the measurement rather than an accessory.',
            'Electrodes are consumable. Recalibration needed at ever-shorter intervals is the sensor announcing the end of its life.',
            'A two-point buffer calibration sets both offset and slope. The slope is the ageing diagnostic, and it is usually discarded.',
            'Where a sample is brought to the instrument, the sample line is part of the measurement — transport lag is dead time, exactly as in Section 2.5.',
            'Analytical instruments demand real maintenance. One that is not maintained is worse than none, because people still act on the number.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 2.7" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-2-section-6')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Choosing the right sensor
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next module <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Module 3 · Signals and conditioning
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule2Section7;
