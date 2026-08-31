/**
 * Module 3 · Section 5 — Signal integrity: noise, ground loops and shielding
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar. Closes Module 3.
 *
 * 🔴 THE FRAMING, and it is the single most useful idea on the page:
 *
 *   CAPACITIVELY-coupled noise is COMMON-MODE — it appears equally on both
 *   conductors, because both sit the same distance from the offending voltage.
 *   INDUCTIVELY-coupled noise is DIFFERENTIAL — the loop enclosed by the pair
 *   catches changing flux, and the induced current is in series with the signal.
 *
 * That distinction explains the whole of instrument cable construction and,
 * more importantly, explains why one remedy fixes nothing while the other
 * fixes everything. A screen kills capacitive coupling. A screen does almost
 * nothing for inductive coupling — twisting does that. "I fitted a screened
 * cable and it made no difference" is the symptom of the wrong diagnosis, not
 * of a bad cable.
 *
 * The other 🔴: earth the screen at ONE end only. Earthing both creates a
 * ground loop through the screen, and Kuphaldt notes that in severe cases this
 * can overheat the cable — a fire hazard, not merely a noise problem.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §8.3.4 (signal coupling and cable separation, the perpendicular-crossing
 * argument, analogue vs digital susceptibility), §8.3.5 (capacitive
 * de-coupling, the equipotential-shell argument, one-end earthing, differential
 * signalling) and §8.3.6 (inductive de-coupling, mu-metal, Lenz's law and why
 * twisting cancels). Extracted to scratchpad/src/m3s5_noise.txt. Held in
 * ~/Desktop/hav/instrumentation.
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
  'Signal integrity: noise, ground loops and shielding | Instrumentation Module 3.5 | Elec-Mate';
const DESCRIPTION =
  'Why capacitively coupled noise is common-mode and inductively coupled noise is differential, why a screen fixes one and twisting fixes the other, why a screen is earthed at one end only, and how to tell a real ground loop from a coupling problem.';

const outcomes = [
  'Name the two coupling mechanisms and say what each depends on',
  'Explain why capacitive noise is common-mode and inductive noise is differential',
  'Say why a screen defeats electric fields and does very little against magnetic ones',
  'Explain how twisting a pair cancels inductively coupled noise',
  'State why a cable screen is earthed at one end only, and what happens if it is earthed at both',
  'Describe what a ground loop is and the two ways it does damage',
  'Explain why an analogue signal is more vulnerable to coupled noise than a digital one',
  'Choose a remedy that matches the mechanism rather than guessing',
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the amount of capacitively coupled noise depend on?',
    options: [
      'The voltage on the offending conductor and its frequency',
      'The resistance of the signal cable',
      'The length of the signal cable only',
      'The current in the offending conductor and its frequency',
    ],
    correctIndex: 0,
    explanation:
      'Electric field strength is proportional to voltage, so capacitive coupling scales with the voltage on the noisy conductor and with frequency, because capacitive reactance falls as frequency rises. A high-voltage cable carrying almost no current is still a capacitive coupling threat.',
  },
  {
    id: 2,
    question: 'What does the amount of inductively coupled noise depend on?',
    options: [
      'The voltage on the offending conductor and its frequency',
      'The current in the offending conductor and its frequency',
      'The insulation resistance of the cable',
      'Whether the cable is screened',
    ],
    correctIndex: 1,
    explanation:
      'Magnetic field strength is proportional to current, so inductive coupling scales with the current in the noisy conductor and with frequency. A heavily loaded low-voltage cable is an inductive threat even though it is a poor capacitive one — which is why the two mechanisms have to be diagnosed separately.',
  },
  {
    id: 3,
    question: 'Why is capacitively coupled noise described as common-mode?',
    options: [
      'Because it is carried by the screen',
      'Because it is the most common kind of noise',
      'Because both conductors sit at effectively the same distance from the noise source, so both pick up the same voltage',
      'Because it always appears at 50 Hz',
    ],
    correctIndex: 2,
    explanation:
      'The two conductors in a pair lie so close together that the capacitance from each to the noise source is essentially equal. The same noise voltage therefore appears on both, which means it appears between each wire and earth but not between the two wires — where the signal lives.',
  },
  {
    id: 4,
    question: 'Why is inductively coupled noise differential rather than common-mode?',
    options: [
      'Because the screen carries half of it',
      'Because it is always at a higher frequency',
      'Because magnetic fields only affect one conductor at a time',
      'Because a changing magnetic field through the loop enclosed by the pair induces a current in that loop, in series with the signal',
    ],
    correctIndex: 3,
    explanation:
      'The go and return conductors enclose an area. A changing external field through that area induces a circulating current in the loop, and that current is in series with the signal current. It adds to and subtracts from the measurement directly rather than lifting both wires together.',
  },
  {
    id: 5,
    question: 'Why does twisting a pair reduce inductively coupled noise?',
    options: [
      'Each twist reverses the direction of the enclosed loop, so the currents induced in successive loops oppose and cancel',
      'The twists make the cable act as a screen',
      'Twisting reduces the cable’s resistance',
      'The twists increase the cable’s inductance so it resists the interference',
    ],
    correctIndex: 0,
    explanation:
      'One long untwisted pair encloses a single large loop. Twisting turns it into many small loops, each wound the opposite way round to its neighbour. The current a changing field induces in one loop directly opposes the current induced in the next, so with enough closely spaced twists the net induced current is very close to zero.',
  },
  {
    id: 6,
    question: 'Why is a cable screen earthed at one end only?',
    options: [
      'To save on terminations',
      'Because earthing both ends lets the potential difference between the two earth points drive current through the screen',
      'Because the screen would otherwise carry the signal',
      'Because regulations require a single earth per cable',
    ],
    correctIndex: 1,
    explanation:
      'Two earth points at different potentials, joined by the screen, form a circuit. Current flows through the screen — a ground loop. That can couple noise into the conductors it was supposed to protect, and in severe cases it can overheat the cable and present a fire hazard.',
  },
  {
    id: 7,
    question:
      'A thermocouple signal running beside an AC power cable is noisy. A screened cable is fitted and earthed correctly, and the noise is unchanged. What is the most likely explanation?',
    options: [
      'The screen needs earthing at both ends',
      'The screen is faulty',
      'The coupling is inductive, and a screen does very little against magnetic fields',
      'The thermocouple needs replacing',
    ],
    correctIndex: 2,
    explanation:
      'A screen defeats electric fields, so it cures capacitive coupling. Magnetic flux lines loop rather than terminate, so an ordinary screen barely redirects them. If a screen makes no difference, the mechanism is probably inductive — and the remedies are a twisted pair, greater separation, and reducing the enclosed loop area.',
  },
  {
    id: 8,
    question:
      'Why is a small amount of coupled noise more serious on an analogue signal than on a digital one?',
    options: [
      'Digital signals travel faster',
      'Analogue signals cannot be screened',
      'Analogue signals are always lower voltage',
      'Any coupled noise changes an analogue value, whereas a digital signal is only corrupted if the noise pushes it across a detection threshold',
    ],
    correctIndex: 3,
    explanation:
      'An analogue signal carries its meaning in its exact magnitude, so anything added is read as measurement. A digital signal only has to stay on the correct side of a threshold, so it tolerates noise up to that margin and then fails abruptly. Neither is immune — they degrade differently.',
  },
];

const InstrumentationModule3Section5 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 3 · Section 5"
        title="Signal integrity"
        backTo="/electrician/upskilling/instrumentation-module-3"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Two ways noise gets in, and two entirely different cures. Using the wrong one is why
          screened cable sometimes changes nothing.
        </p>

        <TLDR
          points={[
            'Noise couples into a signal cable two ways: capacitively through electric fields, and inductively through magnetic fields.',
            'Capacitive coupling scales with the VOLTAGE on the offending conductor. Inductive coupling scales with its CURRENT. Both scale with frequency.',
            '🔴 Capacitive noise is common-mode — it lands equally on both conductors. Inductive noise is differential — it is induced in the loop the pair encloses.',
            'That is why the cures differ: a screen defeats electric fields, and twisting defeats magnetic ones.',
            'Twisting turns one big loop into many small alternating ones, so the induced currents oppose and cancel.',
            '🔴 Earth the screen at one end only. Earth both and the difference between the earth points drives current through the screen — a ground loop that can inject noise and, in severe cases, overheat the cable.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>Two mechanisms</ContentEyebrow>

        <ConceptBlock
          title="How noise gets from one cable into another"
          plainEnglish="Nothing has to touch. A voltage nearby couples in one way, a current nearby couples in another, and the two behave completely differently."
          onSite="Diagnose the mechanism before choosing a remedy. Guessing wastes a cable pull and leaves the fault in place."
        >
          <p>
            When sets of wires lie close together, signals couple from one to another. It is worst
            where AC power conductors run alongside low-level instrument wiring &mdash; a
            thermocouple or pH cable carrying a few millivolts, next to a cable carrying hundreds of
            volts or hundreds of amps.
          </p>
          <p>There are exactly two mechanisms, and they are worth keeping strictly separate:</p>
          <ul>
            <li>
              <strong>Capacitive coupling.</strong> Any two conductors separated by an insulator
              have capacitance between them. That capacitance is a bridge AC can cross, and the ease
              of crossing rises with frequency because capacitive reactance falls as frequency
              rises. The strength of the electric field doing the coupling is set by{' '}
              <strong>voltage</strong>.
            </li>
            <li>
              <strong>Inductive coupling.</strong> Any conductor carrying current has a magnetic
              field around it. Mutual inductance between parallel conductors lets an AC current in
              one induce a voltage along the length of another. The strength of the magnetic field
              doing the coupling is set by <strong>current</strong>.
            </li>
          </ul>
          <p>
            Voltage against current is the first practical consequence.{' '}
            <strong>
              A high-voltage cable carrying almost no load is a capacitive threat and barely an
              inductive one. A heavily loaded cable at 230 V is the reverse.
            </strong>{' '}
            The offender you are looking for depends on which mechanism you are dealing with, which
            is the next question.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 The distinction that decides the cure"
          plainEnglish="Capacitive noise appears on both wires equally. Inductive noise appears between them. That single difference explains everything that follows."
          onSite="If you take one thing from this section, take this. It converts noise troubleshooting from guesswork into a decision."
        >
          <p>
            Capacitively coupled noise is <strong>common-mode</strong>. The two conductors in a pair
            lie so close together that the capacitance from each to the noise source is essentially
            the same, so the same noise voltage appears on both. It is present between either wire
            and earth, and absent between the two wires &mdash; which is exactly where the signal
            lives.
          </p>
          <p>
            Inductively coupled noise is <strong>differential</strong>. The go and return conductors
            enclose an area, and a changing external magnetic field through that area induces a
            circulating current in the loop. By Lenz&rsquo;s law that current opposes the change,
            and it flows in series with the signal current &mdash; adding to it and subtracting from
            it as the field oscillates. It is not sitting on top of the measurement; it is{' '}
            <em>in</em> the measurement.
          </p>
          <AppendixTable
            caption="The two mechanisms compared"
            headers={['', 'Capacitive', 'Inductive']}
            rows={[
              ['Field', 'Electric', 'Magnetic'],
              ['Driven by', 'Voltage on the offender', 'Current in the offender'],
              [
                'Appears as',
                'Common-mode — equal on both wires',
                'Differential — in the signal loop',
              ],
              ['Defeated by', 'A screen at one potential', 'Twisting the pair'],
              [
                'Also helped by',
                'Differential inputs, separation',
                'Separation, smaller loop area',
              ],
            ]}
            notes="Both mechanisms weaken with distance and both worsen with frequency, so separation helps either way. Everything else on this table differs."
          />
          <p>
            Section 3 covered why a differential input rejects common-mode content. Read that
            alongside the first column here and a satisfying conclusion falls out:{' '}
            <strong>
              a differential input is already a partial cure for capacitive coupling, and no cure at
              all for inductive coupling.
            </strong>{' '}
            The mechanisms need different answers because they are different problems.
          </p>
        </ConceptBlock>

        <Pullquote>
          A screen and a twist are not two ways of doing the same job. They are cures for two
          different diseases that happen to produce a similar-looking symptom.
        </Pullquote>

        <InlineCheck
          id="ins-3-5-mechanism"
          question="A signal cable runs beside a busbar feeding a large motor. The motor is lightly loaded most of the day, and the noise on the instrument signal gets dramatically worse when the motor starts. Which mechanism is most likely?"
          options={[
            'Inductive — starting current is far higher than running current, and inductive coupling scales with current',
            'Ground loop — starting always creates one',
            'Quantisation error in the receiving input',
            'Capacitive — the voltage rises at start',
          ]}
          correctIndex={0}
          explanation="The busbar voltage barely changes between idle and starting; the current changes enormously. Coupling that tracks current is magnetic, so the cure is twisting, separation and reducing loop area — not a screen."
        />

        <SectionRule />
        <ContentEyebrow>Defeating electric fields</ContentEyebrow>

        <ConceptBlock
          title="Why a screen works at all"
          plainEnglish="No electric field can exist inside a solid conductor, because the charges inside it would immediately move to cancel it. Surround a wire with metal and you have made a space where the outside field cannot reach."
          onSite="A foil or braid around the conductors, connected to a fixed potential. Simple, cheap and extremely effective — against the right mechanism."
        >
          <p>
            The principle is worth understanding rather than accepting, because it also explains the
            limits.
          </p>
          <p>
            An electric field exists because of an imbalance of charge. If such an imbalance ever
            appeared inside a conductor, the charge carriers in that conductor would move
            immediately to equalise it, and the field would vanish. Put another way, electric fields
            exist only between points at different potentials, so they cannot exist between points
            that are equipotential.
          </p>
          <p>
            That is true of a hollow conductor too. Because the wall of a metal shell is conductive,
            every point on it is at the same potential as every other, and no field lines can span
            the space inside. Anything inside the shell is shielded from external electric fields.
          </p>
          <p>
            A cable screen is that shell made flexible &mdash; a foil wrap or a braid forming a
            conductive tube around the interior conductors. Connect it to a fixed potential and
            there is effectively no capacitance between the outside world and the conductors within,
            so there is no bridge for capacitive coupling to cross.
          </p>
          <p>
            One consequence worth having. Screening works in both directions, so a noisy cable can
            be screened instead of, or as well as, the sensitive one. Where a single offender is
            upsetting several signal circuits, screening the source may be the cheaper fix.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Earth the screen at one end only"
          plainEnglish="A screen is only doing its job if it is all at one potential. Connect it to earth at both ends and the two earths are not the same, so current flows down it."
          onSite="One end. By convention the panel end, so the screen is earthed where the earthing is known and controlled. Terminate the far end and leave it insulated."
        >
          <p>
            At the terminating end, the loose screen strands are twisted together into a tail and
            connected to a ground point, fixing the screen at earth potential. That single
            connection is what makes the whole screen equipotential and therefore effective.
          </p>
          <p>
            <strong>It is very important to earth only one end of a cable&rsquo;s screen.</strong>{' '}
            Section 3 established that two earth points a distance apart are not at the same
            potential. Connect the screen to both and you have provided a conductor between them,
            and current flows through it. That is a <strong>ground loop</strong>.
          </p>
          <p>Two things go wrong when it happens, and only one of them is a signal problem:</p>
          <ul>
            <li>
              <strong>Noise.</strong> Current flowing in the screen can induce noise into the very
              conductors the screen was fitted to protect. The remedy has become the fault.
            </li>
            <li>
              <strong>Heat.</strong> In severe cases the circulating current is large enough to
              overheat the cable, which makes an incorrectly terminated screen a fire hazard and not
              merely a nuisance.
            </li>
          </ul>
          <p>
            The other end of the screen is cut back and insulated, not left loose in a gland or a
            terminal box where it might find an earth by accident. An unintended second earth
            produces exactly the fault the rule exists to prevent, and it is far harder to find
            because nobody made it deliberately.
          </p>
          <p>
            Which end to earth is a matter of convention rather than physics, and the usual choice
            is the panel end &mdash; where the earthing arrangement is known, controlled and
            documented. What matters more than the choice is that a site is consistent, because a
            cable earthed at the field end at one place and the panel end at another will eventually
            meet in a marshalling box.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-5-screen-earth"
          question="A screened instrument cable is earthed at the panel and its far-end screen tail has been landed on the local earth bar in a field junction box. What has been created?"
          options={[
            'A more effective screen, because it is now equipotential at both ends',
            'A ground loop — current can now flow through the screen between two earth points at different potentials',
            'Nothing, provided both earths are on the same installation',
            'A safety improvement with no signal consequence',
          ]}
          correctIndex={1}
          explanation="Two earth points a distance apart are not at the same potential, and the screen has just joined them. Current flows through it, which can induce noise into the conductors the screen was fitted to protect — and in severe cases can overheat the cable. Earth one end, and cut back and insulate the other."
        />

        <SectionRule />
        <ContentEyebrow>Defeating magnetic fields</ContentEyebrow>

        <ConceptBlock
          title="Why you cannot simply screen out a magnetic field"
          plainEnglish="Electric field lines start and stop on charges, so a conductor can absorb them. Magnetic field lines loop — they have no ends — so you can only redirect them, not stop them."
          onSite="If a screen made no difference to a noise problem, that is information. It points at the magnetic mechanism."
        >
          <p>
            Magnetic fields are far harder to shield than electric ones, and the reason is
            structural. Magnetic flux lines do not terminate; they loop. There is nothing for them
            to end on, so a conductor cannot absorb them the way it absorbs an electric field. The
            most you can do is offer them an easier path.
          </p>
          <p>
            That is how genuine magnetic shielding works. A sensitive device is encapsulated in a
            material of extremely high magnetic permeability &mdash; mu-metal is the usual choice
            &mdash; which offers flux a far easier passage than air, so most of the external field
            diverts through the shell rather than through the device.
          </p>
          <p>
            It works, and it is impractical for cables. Mu-metal is expensive and has to be applied
            in a substantial thickness to provide a low enough reluctance path. You will meet it
            around a sensitive instrument; you will not meet it as a cable screen.
          </p>
          <p>So instrument cables take a different approach entirely.</p>
        </ConceptBlock>

        <ConceptBlock
          title="How twisting cancels induced noise"
          plainEnglish="One long straight pair encloses one big loop. Twist it and you get many small loops, each wound the opposite way to the last, so what is induced in one is opposed by the next."
          onSite="The twist rate matters. Untwisting a long tail at a termination undoes the protection exactly where the cable is most exposed."
        >
          <p>
            Draw a differential signal circuit with two straight parallel wires and you have drawn a
            single large loop. A changing external magnetic field passing through that loop induces
            a current in it &mdash; by Lenz&rsquo;s law, in whatever direction opposes the change.
            That induced current is in series with the sensor&rsquo;s own current, so it works
            against the signal reaching the instrument.
          </p>
          <p>
            When the external field reverses, the induced current reverses. As the field oscillates
            the induced current oscillates with it, and AC noise appears at the measuring
            instrument.
          </p>
          <p>
            Now twist the pair. Instead of one large loop you have a series of small ones, and{' '}
            <strong>each twist reverses the direction the loop is wound</strong>. The current
            induced in one loop directly opposes the current induced in its neighbour. Provided the
            loops are numerous enough and close enough together, the opposition is close to complete
            and there is no net induced current, and therefore no noise voltage at the instrument.
          </p>
          <p>
            This is why instrument cables are made as <strong>twisted, screened pairs</strong>. The
            twists guard against magnetic interference; the earthed screen guards against electric
            interference. Two features, two mechanisms &mdash; not redundancy.
          </p>
          <p>
            Where several pairs share a sheath, the twist rates are deliberately made different from
            one another, so that the pairs do not couple magnetically into each other. The same
            trick appears in unshielded twisted-pair data cabling, where four pairs with different
            twist rates run inside one sheath.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Fitting a screened cable and expecting it to cure every kind of noise"
          whatHappens={
            <>
              <p>
                A noisy signal gets a screened cable. The screen is terminated properly, earthed at
                one end, and the noise is exactly as bad as it was. The cable gets blamed, then the
                transmitter, then the input card.
              </p>
              <p>
                Nothing is faulty. The screen is doing precisely what a screen does &mdash;
                excluding electric fields &mdash; and the noise was never getting in that way.
                Magnetic flux passes through an ordinary screen with very little attenuation, so if
                the coupling is inductive, a screen was never going to fix it.
              </p>
              <p>
                The same logic runs the other way. Someone who reaches for a twisted pair against a
                purely capacitive problem gets the same disappointment, because twisting does
                nothing to reduce the capacitance between a cable and a nearby high-voltage
                conductor.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Identify the mechanism first. Does the noise track the <strong>voltage</strong> on
                nearby equipment, or its <strong>current</strong>? Does the noise appear between
                each conductor and earth, or between the two conductors? The first pair of questions
                is usually easier to answer on site than the second.
              </p>
              <p>
                Then match the remedy: screen and differential input for capacitive coupling,
                twisted pair and reduced loop area for inductive coupling, and separation for both.
                Where you genuinely cannot tell, a twisted screened pair correctly earthed covers
                both &mdash; but understand it as covering two possibilities rather than as one cure
                applied twice.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>The cheapest cure</ContentEyebrow>

        <ConceptBlock
          title="Separation, and the right-angle crossing"
          plainEnglish="Move the cables apart. It weakens both mechanisms at once and costs nothing if you decide it before the containment goes in."
          onSite="This is why power and instrument cables are almost never in the same conduit or trunking. It is a design decision, not a preference."
        >
          <p>
            The best way to minimise coupling is not to allow it in the first place, and separation
            attacks both mechanisms simultaneously.
          </p>
          <ul>
            <li>
              <strong>Capacitance falls with distance.</strong> Move the conductors apart and the
              capacitance between them drops, weakening the electric-field bridge.
            </li>
            <li>
              <strong>Mutual inductance falls with distance too</strong>, because the coupling
              coefficient between the two conductors falls, and mutual inductance depends on it.
            </li>
          </ul>
          <p>
            That is the reasoning behind a rule you will already have met on site: power and
            instrument cables do not share conduit or ductwork, and inside a panel the AC wiring is
            routed so it does not run parallel to low-level signal wiring. It is worth seeing that
            as a conclusion rather than a convention, because a conclusion also tells you when it
            matters most &mdash; long parallel runs, heavy currents, and the smallest signals.
          </p>
          <p>
            Where conductors carrying incompatible signals must cross, cross them{' '}
            <strong>at a right angle</strong> rather than letting them run together. That reduces
            both mechanisms, by two separate arguments:
          </p>
          <ul>
            <li>
              <strong>Capacitance</strong> depends on the overlapping area between the conductors,
              and a perpendicular crossing minimises it to a single point.
            </li>
            <li>
              <strong>Mutual inductance</strong> falls close to zero, because the magnetic field
              generated around the offending conductor runs parallel to the receiving wire rather
              than across it, and no voltage is induced along a wire lying that way in the field.
            </li>
          </ul>
          <p>
            The practical instruction &mdash; cross at ninety degrees, never run parallel &mdash; is
            one line of a specification. It is worth knowing that it rests on two independent pieces
            of physics, because that is what tells you it is not a rule of thumb to be traded away
            when a route is awkward.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-3-5-crossing"
          question="A signal cable has to cross a power cable. Why is a right-angle crossing so much better than a shallow one?"
          options={[
            'It makes the screen more effective',
            'It shortens the signal cable',
            'It minimises the overlapping area between the conductors and drives the magnetic coupling close to zero',
            'It reduces the resistance of the joint',
          ]}
          correctIndex={2}
          explanation="Two separate pieces of physics point the same way. Capacitance depends on overlapping area, which a perpendicular crossing reduces to a point. And the magnetic field around the power conductor runs parallel to a wire crossing it at ninety degrees, so no voltage is induced along that wire. A shallow crossing gives up both benefits at once."
        />

        <SectionRule />
        <ContentEyebrow>Why analogue suffers most</ContentEyebrow>

        <ConceptBlock
          title="Coupled noise on an analogue signal versus a digital one"
          plainEnglish="An analogue signal means whatever its size says it means, so anything added is read as measurement. A digital signal only has to stay on the right side of a line."
          onSite="Digital is not immune — it is tolerant up to a margin and then fails outright, which is a different failure to plan for."
        >
          <p>The problem of power-to-signal coupling is most severe when the signal is analogue.</p>
          <p>
            In analogue signalling the information is the magnitude, so even a small amount of
            coupled noise corrupts the value. There is no threshold below which the noise does not
            matter; it is simply added to the measurement and reported as though it were process
            behaviour.
          </p>
          <p>
            A digital signal is corrupted only if the coupled noise is large enough to push the
            signal across a detection threshold it should not cross. Below that, the receiver
            recovers the intended bit exactly and the noise leaves no trace at all.
          </p>
          <p>
            That is a real advantage and it is worth being precise about its shape. Digital
            signalling does not remove noise &mdash; it{' '}
            <strong>converts a gradual degradation into a sudden one</strong>. An analogue signal
            gets progressively less trustworthy; a digital one is perfect until it is not, and then
            it drops messages or fails entirely. Both are worth defending; they simply warn you
            differently.
          </p>
          <p>
            This also connects back to Section 1. A frequency or pulse signal is immune to amplitude
            corruption, which puts it closer to the digital case &mdash; and its failure mode is
            miscounting, which is abrupt and permanent on a totaliser rather than gradual.
          </p>
        </ConceptBlock>

        <Scenario
          title="A pH reading that goes wild whenever the agitator runs"
          situation={
            <>
              <p>
                A pH transmitter in a mixing vessel produces a stable, believable reading with the
                agitator off. Start the agitator and the reading becomes erratic, swinging by more
                than a whole pH unit. It settles the moment the motor stops.
              </p>
              <p>
                The cable is a screened pair, correctly earthed at the panel end. It runs in the
                same tray as the agitator motor&rsquo;s supply for about thirty metres.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Read the symptom against the two mechanisms. The disturbance tracks the motor{' '}
                <em>running</em>, which means it tracks motor current, not the supply voltage
                &mdash; which is present whether the motor runs or not. That points at inductive
                coupling.
              </p>
              <p>
                The screen already fitted is consistent with this. It is doing its job against
                electric fields and has nothing to offer against a magnetic one, which is why it did
                not help.
              </p>
              <p>
                The remedies are the inductive ones. Separate the cables &mdash; getting the signal
                out of the shared tray is the single biggest improvement available. Confirm the pair
                is genuinely twisted along its whole length, including at the terminations, where a
                long untwisted tail is a small straight loop in exactly the wrong place. Cross the
                power route at a right angle where the two must meet.
              </p>
              <p>
                Then check the other end of the screen is cut back and insulated. A pH cable is a
                high-impedance, low-level signal path, and it is the least forgiving thing on the
                plant of an accidental second earth.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                A pH electrode produces a very small voltage from a very high source impedance,
                which makes it about the most noise-susceptible measurement in common use. Module 2
                Section 7 covered why. Anything that will show up as noise anywhere will show up
                here first.
              </p>
              <p>
                It is also a good example of a symptom carrying the diagnosis. &ldquo;Only when the
                motor runs&rdquo; is not a detail to mention in passing &mdash; it is the answer to
                the question of which mechanism you are fighting.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="A working order of attack"
          plainEnglish="Cheapest and most certain first. Do not start by replacing instruments."
          onSite="Work down this list. Most noise problems are resolved in the first three steps."
        >
          <ul>
            <li>
              <strong>Establish that it is noise.</strong> Is the process actually doing this? An
              erratic reading may be an erratic process, and filtering it away would hide a real
              problem &mdash; Section 3&rsquo;s warning.
            </li>
            <li>
              <strong>Correlate it with something.</strong> What starts, stops or changes when the
              noise appears? Voltage-related points at capacitive coupling, current-related at
              inductive.
            </li>
            <li>
              <strong>Check the earthing of the screen.</strong> One end, deliberately, and the
              other cut back and insulated. This costs nothing to verify and is a common finding.
            </li>
            <li>
              <strong>Check the routing.</strong> Shared tray or conduit with power cables, long
              parallel runs, crossings at shallow angles.
            </li>
            <li>
              <strong>Check the terminations.</strong> Untwisted tails, screens not carried through
              a marshalling box, pairs split across terminals.
            </li>
            <li>
              <strong>Then consider isolation.</strong> Section 3 covered what a loop isolator buys.
              For a genuine ground loop between two systems it is often the definitive answer.
            </li>
            <li>
              <strong>Filtering last.</strong> Damping treats the symptom. It is legitimate once the
              installation is right, and it hides the problem if applied before.
            </li>
          </ul>
          <p>
            That last ordering is deliberate and it is the discipline the whole module has been
            building towards: fix the installation, then condition the signal, then scale it
            correctly. Doing those in the wrong order produces a plant where every reading is
            plausible and none is trustworthy.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Which end of the screen should be earthed?',
              answer:
                'Convention favours the panel end, because that is where the earthing arrangement is known, controlled and documented, and where the cable is easiest to inspect. Physics does not strongly prefer one end. What matters far more is that it is one end only, that the site is consistent about which, and that the unearthed end is cut back and insulated so it cannot find an earth by accident.',
            },
            {
              question: 'What about screens on cables that pass through junction boxes?',
              answer:
                'The screen must be carried through the box as a continuous conductor, not broken and left. A screen interrupted part-way is no longer equipotential along its length, so the section beyond the break is not doing its job. Carrying it through also preserves the single-earth arrangement — which is exactly what gets lost when someone terminates a screen to the local earth bar in a marshalling box because it looked untidy.',
            },
            {
              question: 'Is a ground loop always a problem?',
              answer:
                'A ground loop in a signal path is always undesirable, because it puts uncontrolled current into a circuit whose whole purpose is to carry a controlled one. What it costs varies: a small potential difference may only add a little noise, while a large one can inject serious error or, at the extreme, overheat the cable. Note that this is about signal circuits — protective earthing and bonding elsewhere in an installation are governed by entirely different requirements and are not what this section is discussing.',
            },
            {
              question: 'Does a current loop need screening at all?',
              answer:
                'It benefits from it, though less urgently than a millivolt-level signal. A 4–20 mA loop carries a relatively large signal at low impedance, so a given amount of coupled noise represents a much smaller proportion of the measurement than it would on a thermocouple. That is part of why the standard is robust. In an electrically noisy plant, or on a long run beside power cables, a twisted screened pair remains the sensible specification.',
            },
            {
              question: 'Why does untwisting the pair at a termination matter so much?',
              answer:
                'Because the cancellation depends on having many small alternating loops. A 150 mm untwisted tail is one small straight loop with no partner to oppose it, and it usually sits inside a panel where power wiring and contactors are close by. The rule is to carry the twist as close to the terminals as the termination physically allows.',
            },
            {
              question: 'Can noise be a problem on a digital fieldbus segment too?',
              answer:
                'Yes. Digital signalling raises the threshold at which noise matters, but it does not remove it, and a fieldbus segment adds its own concerns — signal strength, cable resistance and message re-transmissions among them. The failure looks different: instead of a wandering value you get retries and eventually communication loss. The wiring practice in this section applies to both.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Noise couples two ways: capacitively through electric fields and inductively through magnetic fields.',
            'Capacitive coupling scales with the voltage on the offender; inductive coupling scales with its current. Both worsen with frequency.',
            '🔴 Capacitive noise is common-mode, appearing equally on both conductors. Inductive noise is differential, induced in the loop the pair encloses.',
            'A screen works because no electric field can exist inside a conductor whose surface is all at one potential.',
            'Magnetic flux loops rather than terminating, so it cannot be absorbed — only redirected, which needs mu-metal and is impractical for cables.',
            'Twisting turns one large loop into many small alternating ones, so the induced currents oppose and cancel.',
            'A twisted screened pair is two cures for two mechanisms, not one cure applied twice.',
            '🔴 Earth the screen at one end only. Both ends creates a ground loop that can inject noise and, in severe cases, overheat the cable.',
            'Cut back and insulate the far end of the screen. An accidental second earth is the same fault, and much harder to find.',
            'Carry screens continuously through junction boxes; a broken screen stops working beyond the break.',
            'Separation weakens both mechanisms, which is why power and instrument cables do not share conduit or trunking.',
            'Cross incompatible cables at a right angle — it minimises overlapping area and drives mutual inductance close to zero.',
            'Carry the twist right up to the terminals. A long untwisted tail is an unpaired loop in the worst possible place.',
            'Analogue signals are corrupted by any coupled noise; digital signals tolerate it to a threshold and then fail abruptly.',
            'Fix the installation first, condition the signal second, scale it third. In the wrong order you get a plant where everything is plausible and nothing is trustworthy.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 3.5" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-3-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Scaling and conversion
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next module <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Electrical quantities
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule3Section5;
