/**
 * Module 7 · Section 4 — Instrument cable and identification
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING. Module 3 Section 5 owns the PHYSICS of screening and
 * twisting (screen 92 mentions, foil/braid 4, conduit/tray 7) — capacitive
 * coupling is common-mode and a screen defeats it, inductive coupling is
 * differential and twisting defeats it. This page must NOT re-teach any of
 * that. It owns what M3.5 has zero coverage of: overall vs individual screens
 * (0), multipair cable (0), armour (0), segregation practice (0), colour
 * coding (0) and cable selection (0).
 *
 * 🔴 THE GENUINELY NEW IDEA, and it is derivable from M3.5 rather than
 * asserted: in a MULTIPAIR cable the pairs can couple into EACH OTHER, and the
 * two coupling mechanisms need different answers —
 *   MAGNETIC pair-to-pair  → different twist rates per pair (M3.5 established)
 *   CAPACITIVE pair-to-pair → INDIVIDUAL screens; an overall screen cannot
 *                             help, because both pairs are inside it
 * That last point is the payoff and it follows directly from M3.5's
 * equipotential-shell argument.
 *
 * 🔴 ACCURACY — THE BIG ONE. We hold NO source for UK/BS instrument cable
 * colour codes. Module 2 Section 2 already caught me presenting US/Canada
 * thermocouple colours as universal; Kuphaldt's own footnote says the British
 * use their own code. So this page teaches that colour coding is NOT
 * international and must be checked against the site standard — it must NOT
 * state what any UK code actually is.
 *
 * ⚠️ The source's "light blue for IS" and "50 mm separation" figures are from
 * NEC article 504 — UNITED STATES code. Do not present them as UK
 * requirements. The transferable PRINCIPLES (IS conductors separated from
 * non-IS, secured so a loose terminal cannot bring them into contact, and
 * identified by a colour reserved for nothing else) are taught in Section 5,
 * without asserting jurisdiction-specific figures.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §8.3.4-8.3.6 (cable separation, twist rates differing between pairs in one
 * sheath, screening) — referenced rather than re-taught since Module 3
 * Section 5 develops it. §32.x for the IS wiring principles noted above.
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

const TITLE = 'Instrument cable and identification | Instrumentation Module 7.4 | Elec-Mate';
const DESCRIPTION =
  'What makes a cable an instrument cable, why a multipair needs individual screens rather than one overall screen, how segregation is done in practice, and why colour coding must never be assumed.';

const outcomes = [
  'Say what distinguishes instrument cable from general wiring cable',
  '🔴 Explain why pairs in a multipair cable can couple into each other',
  '🔴 Say why an overall screen cannot prevent pair-to-pair capacitive coupling',
  'Explain how differing twist rates address pair-to-pair magnetic coupling',
  'Choose between individual and overall screening for a given job',
  'Apply segregation in practice, and say what physics it rests on',
  '🔴 Say why cable colour coding must be checked rather than assumed',
  'List what actually decides cable selection for an instrument circuit',
];

const quizQuestions = [
  {
    id: 1,
    question: 'What makes a cable suitable for instrument signals rather than general wiring?',
    options: [
      'Conductors twisted in pairs and a screen — addressing the two coupling mechanisms',
      'Larger conductor cross-section',
      'A thicker outer sheath',
      'A higher voltage rating',
    ],
    correctIndex: 0,
    explanation:
      'Module 3 Section 5 established the two mechanisms and their cures: twisting defeats magnetic coupling because it cancels the induced currents, and an earthed screen defeats electric coupling. Instrument cable is built with both because a signal circuit needs both.',
  },
  {
    id: 2,
    question: '🔴 Why can pairs inside one multipair cable interfere with each other?',
    options: [
      'They cannot — the outer sheath prevents it',
      'They run alongside each other for the whole length, which is exactly the condition that produces coupling',
      'Only if the cable is damaged',
      'Only at high frequencies',
    ],
    correctIndex: 1,
    explanation:
      'Coupling needs conductors running together, and pairs in a shared sheath do so for the entire run. The mechanisms are the same ones Module 3 Section 5 described — nothing about being inside one cable changes the physics.',
  },
  {
    id: 3,
    question: '🔴 Why does an overall screen not stop one pair coupling into another?',
    options: [
      'Because foil screens are less effective than braid',
      'It does — that is what an overall screen is for',
      'Because both pairs are inside it, so there is no screen between them',
      'Because it is not earthed at both ends',
    ],
    correctIndex: 2,
    explanation:
      'A screen works by putting an equipotential conductive barrier between two things. An overall screen sits around the whole bundle, so it protects everything inside from the outside world — and puts nothing whatever between the pairs it encloses.',
  },
  {
    id: 4,
    question: 'What addresses magnetic coupling between pairs in the same cable?',
    options: [
      'Increasing the conductor size',
      'Earthing the screen at both ends',
      'An overall screen',
      'Giving each pair a different twist rate',
    ],
    correctIndex: 3,
    explanation:
      'Twisting cancels induced current because successive loops oppose one another. If two adjacent pairs twisted at the same rate, their loops would stay in step along the run; differing rates keep them out of step so the coupling averages away.',
  },
  {
    id: 5,
    question:
      'A multipair cable will carry several low-level signals from different instruments. What screening arrangement suits it?',
    options: [
      'Individual screens on each pair, usually with an overall screen as well',
      'No screen, provided the pairs are twisted',
      'Individual screens instead of twisting',
      'Overall screen only — it is simpler and cheaper',
    ],
    correctIndex: 0,
    explanation:
      'Individual screens put a barrier between the pairs, which is the only thing that addresses capacitive crosstalk between them. The overall screen still earns its place by handling interference arriving from outside the cable.',
  },
  {
    id: 6,
    question: 'Why are instrument cables segregated from power cables in practice?',
    options: [
      'To make identification easier',
      'Because separation weakens both capacitive and inductive coupling at once',
      'Because regulations require different containment',
      'To reduce the cost of installation',
    ],
    correctIndex: 1,
    explanation:
      'Module 3 Section 5 gave the physics: capacitance falls with distance and so does mutual inductance, so separation is the one measure that attacks both mechanisms simultaneously. It is also the cheapest, provided it is decided before the containment goes in.',
  },
  {
    id: 7,
    question:
      '🔴 What should you assume about the colour coding on an unfamiliar instrument cable?',
    options: [
      'That it matches the thermocouple colour code',
      'That it follows the standard you are used to',
      'Nothing — colour conventions are not international, so check the specification for that installation',
      'That the positive conductor is always red',
    ],
    correctIndex: 2,
    explanation:
      'Module 2 Section 2 made this point about thermocouple colours specifically: several national codes exist, they disagree, and an assumption based on the wrong one is a reversed pair. The same caution applies to instrument cable generally — the drawing and the specification are the authority.',
  },
  {
    id: 8,
    question: 'What decides the conductor size of an instrument cable?',
    options: [
      'The current rating required',
      'The length of the run',
      'Voltage drop, as with a power circuit',
      'Mechanical robustness and termination practicality more than electrical need',
    ],
    correctIndex: 3,
    explanation:
      'Module 7 Section 3 showed the electrical demand is trivial — a kilometre of 1.5 mm² costs a 4–20 mA loop under half a volt. What actually governs the choice is whether the conductor survives installation and terminates reliably, which is a mechanical question.',
  },
];

const InstrumentationModule7Section4 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 4"
        title="Cable and identification"
        backTo="/electrician/upskilling/instrumentation-module-7"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Module 3 explained why instrument cable is built the way it is. This is choosing it,
          routing it, and identifying it — including one thing an overall screen cannot do.
        </p>

        <TLDR
          points={[
            'Module 3 Section 5 owns the physics of screening and twisting. This section is selection, routing and identification.',
            'Instrument cable is twisted pairs plus a screen, because a signal circuit faces both coupling mechanisms.',
            '🔴 Pairs inside one multipair cable run alongside each other for the whole length — which is exactly the condition that produces coupling.',
            '🔴 An overall screen cannot prevent pair-to-pair coupling, because both pairs are inside it and there is no barrier between them.',
            'Differing twist rates between pairs handle the magnetic half of that problem.',
            'Individual screens handle the capacitive half — that is the only thing that puts a barrier between pairs.',
            'So a multipair carrying several low-level signals wants individual screens, usually with an overall screen too.',
            'Segregation attacks both coupling mechanisms at once, which is why it is the cheapest measure available.',
            'It is also a decision that must be made before the containment goes in, not after.',
            '🔴 Colour coding is not international. Check the specification for the installation rather than assuming.',
            'Conductor size on an instrument circuit is a mechanical decision, not an electrical one.',
            'Armour is mechanical protection and is not a substitute for a screen — they do different jobs.',
            '🔴 Protective earthing is a safety function. Functional earthing and bonding exist to make equipment work — screening and EMC.',
            '🔴 On power wiring more bonding is better. On a signal reference a second earth creates a circulating current. Opposite instincts.',
            '🔴 Table 51 (A4:2026): neither FE nor green-and-yellow may identify a functional bonding conductor.',
            '🔴🔴 Never lift a protective earth to cure noise. If the fix needs that, the fix is wrong.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>What makes it instrument cable</ContentEyebrow>

        <ConceptBlock
          title="Two features, two problems"
          plainEnglish="Twisted pairs and a screen. Each one answers a different way interference gets in."
          onSite="Module 3 Section 5 covered why each works. This is what to ask for when specifying it."
        >
          <p>
            Instrument cable differs from general wiring cable in two respects, and both exist for
            reasons Module 3 Section 5 established:
          </p>
          <ul>
            <li>
              <strong>Conductors twisted in pairs.</strong> Twisting turns one large loop into many
              small alternating ones, so the currents a changing magnetic field induces in
              successive loops oppose and cancel. That defeats inductive coupling, which is{' '}
              <em>differential</em> and therefore lands directly on the signal.
            </li>
            <li>
              <strong>A screen.</strong> A conductive barrier at one potential prevents an electric
              field reaching the conductors inside. That defeats capacitive coupling, which is{' '}
              <em>common-mode</em>.
            </li>
          </ul>
          <p>
            The important thing to carry from that section is that{' '}
            <strong>these are not two ways of doing the same job</strong>. A screened cable with
            untwisted conductors is defenceless against magnetic coupling; twisted conductors with
            no screen are defenceless against electric coupling. Instrument cable has both because a
            signal circuit faces both.
          </p>
          <p>
            Everything else about the cable &mdash; sheath material, armour, conductor size, core
            count &mdash; is chosen for the installation rather than for the signal.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 The multipair problem</ContentEyebrow>

        <ConceptBlock
          title="Pairs in one cable can interfere with each other"
          plainEnglish="Everything Module 3 said about a signal cable running beside a power cable applies to two pairs running beside each other inside one sheath."
          onSite="This is the question an overall screen does not answer, and it decides which cable you should be specifying."
        >
          <p>
            Running several signals in one multipair cable is normal practice and saves a great deal
            of installation work. It also creates a problem that a single pair does not have.
          </p>
          <p>
            Module 3 Section 5 established that coupling requires conductors running alongside one
            another, and that both mechanisms weaken with distance. Inside a multipair cable,{' '}
            <strong>
              the pairs run alongside each other for the entire length of the run, separated by
              millimetres
            </strong>
            . Nothing about being inside a common sheath changes the physics.
          </p>
          <p>
            So a pair carrying a signal can couple into a neighbouring pair. Both mechanisms apply,
            and &mdash; this is the useful part &mdash; <strong>they need different answers</strong>
            .
          </p>
          <AppendixTable
            caption="Pair-to-pair coupling inside one cable"
            headers={['Mechanism', 'What it does', 'What addresses it']}
            rows={[
              [
                'Magnetic (inductive)',
                'Induces current in the neighbouring pair’s loop',
                'Different twist rates between pairs',
              ],
              [
                'Electric (capacitive)',
                'Couples through the capacitance between adjacent pairs',
                '🔴 Individual screens — nothing else can',
              ],
            ]}
            notes="An overall screen addresses neither of these, because it encloses both pairs rather than separating them."
          />
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Why an overall screen cannot help"
          plainEnglish="A screen works by putting a barrier between two things. Put both of them inside it and there is no barrier."
          onSite="If a multipair with only an overall screen is showing crosstalk, no amount of earthing work will fix it."
        >
          <p>
            This follows directly from why a screen works at all, and Module 3 Section 5 gave the
            argument: no electric field can exist inside a conductor whose surface is all at one
            potential, so anything inside a conductive shell is shielded from fields outside it.
          </p>
          <p>Read that carefully and the limitation falls out.</p>
          <p>
            <strong>
              An overall screen protects everything inside it from everything outside it. It puts
              nothing at all between the pairs it encloses.
            </strong>
          </p>
          <p>
            Two pairs inside one overall screen are, as far as each other is concerned, simply two
            pairs running alongside each other &mdash; exactly as if the screen were not there. The
            screen is doing its job perfectly; its job just does not include this.
          </p>
          <p>
            🔴 The remedy is <strong>individual screens</strong>: each pair gets its own conductive
            shell, so there is now a barrier between them. That is the only construction that
            addresses capacitive crosstalk between pairs, and it is why{' '}
            <strong>
              individually screened, overall screened multipair cable exists as a distinct product
            </strong>{' '}
            rather than being belt and braces.
          </p>
          <p>
            The overall screen still earns its place on such a cable &mdash; it handles interference
            arriving from outside, which is Module 3 Section 5&rsquo;s original problem. The two
            screens address two different threats.
          </p>
        </ConceptBlock>

        <Pullquote>
          An overall screen protects everything inside it from the outside world, and does nothing
          whatever between the pairs it encloses. That is not a defect — it is what a screen is.
        </Pullquote>

        <InlineCheck
          id="ins-7-4-multipair"
          question="A multipair cable with a single overall screen carries eight 4–20 mA signals. One pair shows interference that tracks another pair's signal. What is the fix?"
          options={[
            'A cable with individual screens per pair — the overall screen cannot separate pairs from each other',
            'Increase the conductor size',
            'Re-terminate the overall screen',
            'Earth the overall screen at both ends',
          ]}
          correctIndex={0}
          explanation="Interference that tracks another pair's signal is crosstalk between pairs, and both pairs are inside the same screen. Earthing at both ends would make things worse by creating the ground loop Module 3 Section 5 warned about. The construction is wrong for the duty, and only individual screens address it."
        />

        <ConceptBlock
          title="Choosing the screening arrangement"
          plainEnglish="How much separation you need between pairs depends on what those pairs are carrying."
          onSite="Individual screens cost more and take longer to terminate. They are not always warranted."
        >
          <p>
            Individual screening is not automatically the right answer &mdash; it costs more, the
            cable is larger, and every pair&rsquo;s screen needs terminating and earthing correctly
            at one end, which is more work and more opportunity for the two-earth mistake.
          </p>
          <p>The judgement rests on what the pairs carry:</p>
          <ul>
            <li>
              <strong>Overall screen is often adequate</strong> where all the pairs carry similar,
              robust signals &mdash; several 4&ndash;20 mA loops at similar levels. Module 3 Section
              1 established that a current loop is inherently tolerant, and crosstalk between two
              similar current signals is usually well below anything that matters.
            </li>
            <li>
              <strong>Individual screens earn their cost</strong> where signal levels differ
              greatly, or where any of the pairs carries a genuinely low-level signal &mdash; the
              millivolt thermocouple outputs and high-impedance pH signals Module 4 Section 1
              covered. A large signal coupling into a small one is where crosstalk does real damage.
            </li>
            <li>
              <strong>Do not mix signal types casually.</strong> A pair carrying switched or pulsed
              signals alongside pairs carrying analogue measurements is the classic bad neighbour,
              because Module 3 Section 5 showed that coupling strengthens with frequency.
            </li>
          </ul>
          <p>
            That last point is worth stating as a general principle:{' '}
            <strong>
              what shares a cable is a design decision, exactly as what shares a tray is
            </strong>
            . The sheath is not a boundary that makes the question go away.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Routing and segregation</ContentEyebrow>

        <ConceptBlock
          title="The cheapest measure available, if decided early enough"
          plainEnglish="Moving cables apart weakens both coupling mechanisms at once and costs nothing — provided somebody decides it before the containment is installed."
          onSite="Retrofitting segregation is expensive. Specifying it is free."
        >
          <p>
            Module 3 Section 5 established why separation works: capacitance falls as conductors
            move apart, and so does mutual inductance.{' '}
            <strong>
              It is the one measure that attacks both coupling mechanisms simultaneously
            </strong>
            , which is why power and instrument cables do not share conduit or ductwork, and why
            panel wiring is routed so AC power does not run parallel to low-level signals.
          </p>
          <p>In practice that means decisions about:</p>
          <ul>
            <li>
              <strong>Separate containment.</strong> Instrument cables in their own tray, trunking
              or conduit rather than sharing with power.
            </li>
            <li>
              <strong>Separation distance</strong> where they must run in parallel. Greater distance
              is better, and the requirement grows with the length of the parallel run and the
              current in the power cable.
            </li>
            <li>
              <strong>Crossings at right angles.</strong> Module 3 Section 5 gave two independent
              reasons &mdash; minimum overlapping area for capacitance, and the magnetic field
              running parallel to the crossing conductor so nothing is induced along it.
            </li>
            <li>
              <strong>What counts as a power cable.</strong> Not only mains distribution. Drive
              outputs are among the worst offenders because of their switching, and Module 5 Section
              6 noted drives as a common source.
            </li>
          </ul>
          <p>
            🔴 The practical point is about timing rather than technique.{' '}
            <strong>Segregation is nearly free at design stage and expensive afterwards</strong>
            &mdash; a second tray costs materials; re-routing an installed cable costs a shutdown.
            And the fault it prevents is the one Module 3 Section 5 described, which is difficult to
            diagnose and easy to misattribute.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Identification</ContentEyebrow>

        <ConceptBlock
          title="Colour coding is not international"
          plainEnglish="There is no single worldwide convention. Assuming the one you know applies here is how a pair gets reversed."
          onSite="The drawing and the specification for that installation are the authority. Not habit."
        >
          <p>
            Module 2 Section 2 raised this about thermocouple colours specifically, and the caution
            generalises.{' '}
            <strong>
              Several national colour conventions exist for instrument cable, they do not agree with
              one another, and material written for one country will confidently state a code that
              is wrong elsewhere.
            </strong>
          </p>
          <p>
            This course does not tell you what any particular code is, deliberately. What it tells
            you is how to work safely without that assumption:
          </p>
          <ul>
            <li>
              <strong>The specification for the installation is the authority.</strong> Which code
              applies is a property of the site and the design, not of the cable in your hand.
            </li>
            <li>
              <strong>The loop diagram records it.</strong> Module 7 Section 1 argued that wire
              colours on a loop sheet look like trivia and are among the most valued details when
              missing. This is why.
            </li>
            <li>
              <strong>Verify rather than assume on unfamiliar cable.</strong> A continuity check
              between known points takes a minute and settles it, and Section 7 covers doing that
              properly.
            </li>
          </ul>
          <p>
            🔴 The reason to be careful rather than merely tidy is the one Module 2 Section 2 gave:{' '}
            <strong>a reversed pair does not announce itself</strong>. On a thermocouple it produces
            a plausible wrong temperature. On a 4&ndash;20 mA loop it may give nothing at all, or
            with some devices a reading that looks reasonable. Neither is obviously a wiring error,
            and both can survive commissioning.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Identifying circuits that must not be confused"
          plainEnglish="Some circuits are identified distinctively because mixing them up has consequences beyond a wrong reading."
          onSite="Intrinsically safe circuits are the main case, and Section 5 covers what they require."
        >
          <p>
            Beyond conductor colours within a cable, whole circuits are sometimes identified
            distinctively &mdash; and the most important case is{' '}
            <strong>intrinsically safe circuits</strong>.
          </p>
          <p>
            The principles are worth stating here because they affect how cable is routed and
            terminated, and Section 5 develops them:
          </p>
          <ul>
            <li>
              <strong>Separation.</strong> Conductors of an intrinsically safe circuit must be kept
              apart from non-intrinsically safe conductors, so that the energy limitation the
              barrier provides cannot be defeated by contact.
            </li>
            <li>
              <strong>Securing.</strong> Conductors are secured so that{' '}
              <strong>
                if a terminal works loose, the conductor still cannot come into contact with a
                non-intrinsically safe one
              </strong>
              . That is a mechanical requirement about the failure case rather than the normal one.
            </li>
            <li>
              <strong>Distinctive identification.</strong> A colour may be reserved to identify
              intrinsically safe conductors, containment and junction boxes &mdash; on the condition
              that the colour is used for nothing else in the system, since its whole value is that
              it means one thing.
            </li>
          </ul>
          <p>
            ⚠️ The specific separation distances and the colour used are set by the standards
            applying where the installation is, and they differ between jurisdictions.{' '}
            <strong>This course states the principles and not the figures</strong>
            &mdash; the figures come from the standards that govern the site, and Section 5 explains
            why intrinsic safety is a documented system rather than a matter of judgement.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-7-4-armour"
          question="A cable is specified as steel wire armoured with no screen. A colleague says the armour will do the screening job. Is that right?"
          options={[
            'Yes — armour is conductive, so it acts as a screen',
            'No — armour is mechanical protection, and a screen is a specific electrical function with its own earthing requirement',
            'Yes, provided the armour is earthed at both ends',
            'Only for low-frequency interference',
          ]}
          correctIndex={1}
          explanation="They are different functions that happen to both involve metal. A screen has to form a continuous equipotential shell around the conductors and be earthed at exactly one point, per Module 3 Section 5. Armour is there to stop the cable being damaged, and treating it as a screen means relying on something never designed or terminated for that purpose."
        />

        <ConceptBlock
          title="🔴 Two kinds of earth, and only one of them is about safety"
          plainEnglish="A protective earth stops people being hurt. A functional earth makes equipment work properly. They are different jobs and the Regulations now identify them differently."
          onSite="This is where the power-wiring instinct does the most damage — because on a signal reference, more bonding is worse."
        >
          <p>
            The screen earthing in Module 3 Section 5 and the barrier earth in Section 5 of this
            module are doing two quite different jobs, and the difference is worth naming properly
            because it is the sharpest example of this module&rsquo;s recurring theme.
          </p>
          <ul>
            <li>
              <strong>Protective earthing</strong> exists for fault protection &mdash; so that a
              fault cannot leave dangerous voltage on something a person can touch. It is a safety
              function.
            </li>
            <li>
              <strong>Functional earthing and functional bonding</strong> exist so that equipment
              works correctly. A conductor used solely to ensure correct operation &mdash; screening
              and electromagnetic compatibility being the usual reasons &mdash; is a{' '}
              <strong>functional bonding conductor</strong>, and it is not intended for protective
              earthing at all.
            </li>
          </ul>
          <p>
            🔴 The habits pull in opposite directions, which is exactly why this catches people out.
            On power wiring, <strong>more bonding is better</strong> &mdash; additional connections
            to earth improve fault protection and there is rarely a reason to hesitate. On a signal
            reference the same instinct is a fault:{' '}
            <strong>
              a second earth connection on a screen creates the circulating current Module 3 Section
              5 described
            </strong>
            . Same word, same colour of conductor in most people&rsquo;s minds, opposite correct
            answer.
          </p>
          <p>
            The Regulations have moved on this. BS 7671:2018+A4:2026 introduced{' '}
            <strong>Section 545</strong> into Part 5, dealing with functional earthing and
            functional equipotential bonding &mdash; its stated scope being information and
            communications technology equipment and systems. Alongside it,{' '}
            <strong>Table 51 was revised</strong> to cover identification of a functional bonding
            conductor, and of conductors that perform a combined protective and functional role.
          </p>
          <p>
            🔴 One point from that revision matters directly here, and it is an explicit prohibition
            rather than guidance:{' '}
            <strong>
              neither the designation FE nor the green-and-yellow bi-colour combination should be
              used to identify a functional bonding conductor.
            </strong>
          </p>
          <p>
            The reasoning is worth holding onto.{' '}
            <strong>Green-and-yellow is a promise that a conductor is protective</strong>, and
            anybody who finds one is entitled to treat it as such. A conductor doing only a
            functional job that wears those colours makes a claim that is not true &mdash; and the
            person who eventually acts on it will be someone who was not there when it was
            installed. The definitive markings are set out in Table 51 itself, which is what to work
            from rather than any summary.
          </p>
          <p>
            🔴🔴 And the rule that follows from all of it is not negotiable.{' '}
            <strong>
              A protective earth is never lifted, removed or compromised in order to cure a noise
              problem.
            </strong>{' '}
            Disconnecting an earth will sometimes make interference disappear, which is precisely
            what makes the temptation real. If a proposed fix requires weakening protective
            earthing, the fix is wrong and the actual cause has not been found &mdash; and Module 3
            Section 5 covers what to look for instead.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-7-4-functional-earth"
          question="A conductor is installed solely to earth cable screens for EMC purposes. How should it NOT be identified?"
          options={[
            'With a cable number',
            'Green-and-yellow, or with the designation FE',
            'With a ferrule at each end',
            'With the tag of the loop it serves',
          ]}
          correctIndex={1}
          explanation="Table 51 in BS 7671:2018+A4:2026 explicitly states that neither FE nor the green-and-yellow bi-colour should identify a functional bonding conductor. Green-and-yellow asserts that a conductor is protective, and a functional-only conductor making that claim misleads whoever works on it later."
        />

        <SectionRule />
        <ContentEyebrow>Where identification goes wrong</ContentEyebrow>

        <CommonMistake
          title="Assuming the colour convention you know is the one in front of you"
          whatHappens={
            <>
              <p>
                A technician terminates an unfamiliar instrument cable using the colour convention
                they have always worked to. It is a reasonable assumption and it is an assumption.
              </p>
              <p>
                Where the installation follows a different code, the pair is reversed. On a
                thermocouple circuit the instrument still reports a temperature &mdash; a wrong one,
                moving the wrong way. On a 4&ndash;20 mA loop the result depends on the devices:
                some give nothing, some are protected against it, and some produce a reading that
                looks entirely plausible.
              </p>
              <p>
                🔴 None of those failure modes says &ldquo;wiring error&rdquo;. The loop gets
                commissioned, the transmitter gets suspected, and the actual cause is a colour
                assumption made in a junction box weeks earlier.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Treat colour as a strong hint and confirm it against the loop diagram or the
                installation specification. Module 7 Section 1 established that the drawing records
                which conductor is which precisely so this question does not need answering with a
                meter every time.
              </p>
              <p>
                Where the drawing is missing or the cable is unfamiliar, verify by continuity from a
                known end rather than by inference. It is a minute of work against a fault that can
                survive commissioning.
              </p>
              <p>
                And if you establish the convention for an installation that had no record of it,
                write it down. Module 4 Section 5&rsquo;s argument applies: the value is realised by
                somebody who was not there.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Choosing the cable</ContentEyebrow>

        <ConceptBlock
          title="What actually decides the selection"
          plainEnglish="Almost none of it is electrical. The signal makes very small demands and the environment makes large ones."
          onSite="Section 3 showed the loop hardly cares about the cable. The installation cares a great deal."
        >
          <p>
            Section 3 established something that reframes cable selection entirely:{' '}
            <strong>
              a kilometre of 1.5 mm&sup2; costs a 4&ndash;20 mA loop under half a volt
            </strong>
            . The electrical demand is trivial.
          </p>
          <p>So the decisions are made on other grounds:</p>
          <AppendixTable
            caption="What governs each choice"
            headers={['Choice', 'Decided by']}
            rows={[
              [
                'Conductor size',
                'Mechanical robustness and reliable termination — not voltage drop',
              ],
              [
                'Screening arrangement',
                'What the pairs carry and whether they can interfere with each other',
              ],
              ['Number of pairs', 'How many signals share the route, plus spare capacity'],
              ['Armour', 'Mechanical protection where the route demands it'],
              [
                'Sheath material',
                'The environment — temperature, chemicals, ultraviolet, fire performance',
              ],
              [
                'Approvals and construction',
                'Hazardous area requirements, where they apply — Section 5',
              ],
            ]}
            notes="Only the second row is about the signal. Everything else is about the installation surviving where it is put."
          />
          <p>
            <strong>Spare capacity deserves a mention</strong> because it is cheap at installation
            and impossible afterwards. A multipair with spare pairs costs marginally more than one
            sized exactly; pulling a second cable later costs a great deal more, and Section
            3&rsquo;s argument about designing in margin applies to cores as much as to volts.
          </p>
          <p>
            🔴 One point about armour is worth being explicit on, because it is a common
            misconception.{' '}
            <strong>
              Armour is mechanical protection. It is not a screen and it does not replace one.
            </strong>{' '}
            A screen is a specific electrical function with specific earthing requirements &mdash;
            Module 3 Section 5&rsquo;s one-end rule &mdash; and armour is there to stop the cable
            being damaged. An armoured cable without a screen is not screened cable.
          </p>
        </ConceptBlock>

        <Scenario
          title="Eight signals in one cable, and one that will not settle"
          situation={
            <>
              <p>
                A multipair cable carries eight signals from a skid to the main panel: six 4–20 mA
                loops, a thermocouple pair, and a pair carrying a pulse output from a flow meter.
                The cable has a single overall screen, correctly earthed at the panel end.
              </p>
              <p>
                Seven of the signals are perfectly stable. The thermocouple reading is noisy, and
                the noise gets worse when the flow through the meter increases.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Read what varies with what. The noise tracks flow rate, and the pulse pair&rsquo;s
                frequency is proportional to flow &mdash; Module 4 Section 2&rsquo;s K-factor. So
                the interference is coming from the pulse pair, inside the same cable.
              </p>
              <p>
                That combination is close to a worst case.{' '}
                <strong>
                  A thermocouple produces millivolts and a pulse signal switches sharply
                </strong>
                , and Module 3 Section 5 established that coupling strengthens with frequency. The
                largest, fastest signal in the cable is sitting alongside the smallest.
              </p>
              <p>
                The overall screen cannot help, and it is worth being clear why rather than checking
                it again: both pairs are inside it, so it puts no barrier between them. Re-earthing
                it, or earthing it at the far end as well, would only add the ground loop problem to
                the existing one.
              </p>
              <p>
                So this is a cable selection fault rather than an installation fault. The remedies
                are to move the thermocouple onto a separately screened route, to use a cable with
                individual pair screens, or to convert the temperature measurement to 4&ndash;20 mA
                at the skid &mdash; which is Module 3 Section 1&rsquo;s convert-early argument, and
                usually the best answer since it removes the vulnerable millivolt signal from the
                long run entirely.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Everything about the installation was done correctly. The screen was earthed at one
                end, the segregation from power cables was right, and the terminations were sound.
                The fault was decided when somebody chose a cable.
              </p>
              <p>
                It also shows why the multipair question is worth understanding rather than
                defaulting to whatever is on the shelf. Seven of the eight signals were entirely
                happy in that cable, which is what makes the eighth so easy to blame on its
                instrument.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'Is foil or braid screening better?',
              answer:
                'They trade differently rather than one being superior. Foil gives complete coverage and is usually cheaper and lighter, but it is thin and can be damaged by repeated flexing. Braid is more robust and stands up better to movement, at greater cost and weight, and its coverage is not quite complete. Combinations of both exist for demanding applications. What matters more than the choice is that it is earthed at one end and terminated properly, which Module 3 Section 5 covered.',
            },
            {
              question: 'Can spare pairs in a multipair be used for something else?',
              answer:
                'Physically yes, and the question worth asking is what putting that signal in there does to its neighbours. A spare pair used for a switched or mains-voltage circuit turns a quiet cable into a noisy one for every other pair in it, which is this section’s crosstalk argument in reverse. Spare pairs are best kept for signals of the same character as the ones already there — and where a site has rules on this, they exist for that reason.',
            },
            {
              question: 'Does a screen need to be a specific size or type?',
              answer:
                'The screen is not carrying signal current, so its cross-section is not an electrical design question in the way a conductor’s would be. What it has to do is form a continuous conductive shell and be connectable at the earthing point. The practical requirements are about coverage and termination rather than size — which is why a poorly terminated screen, or one broken at a junction box, fails even though the material is adequate.',
            },
            {
              question: 'How much separation from power cables is enough?',
              answer:
                'More is better and the required distance grows with the length of the parallel run and the current in the power cable, because both mechanisms accumulate along the run. Specific minimum distances are set by the standards and site rules that apply to the installation, so that is where the number comes from rather than a general figure. The principle, from Module 3 Section 5, is that separation is the one measure attacking both coupling mechanisms at once — so where you cannot achieve distance, crossing at right angles is the next best thing.',
            },
            {
              question: 'Should instrument cable be run in metal or plastic containment?',
              answer:
                'Metal containment can provide additional screening if it is continuous and correctly earthed, which is a genuine benefit — and it introduces the same one-end earthing discipline a cable screen needs, for exactly the same reason. Plastic containment provides none of that and none of the associated complications. Which is appropriate depends on the environment, the interference present and the site’s own practice, and the important thing is that if metal containment is being relied on for screening, it is treated as a screen rather than assumed to work.',
            },
            {
              question: 'Does any of this apply to a two-wire loop that already works?',
              answer:
                'It applies most to the things you are about to change. An existing loop performing well has already demonstrated its cable is adequate for its duty. What this section addresses is what happens when a signal is added to an existing multipair, when a route is shared with new equipment, or when a drive is installed near an established cable run — each of which changes the conditions the original selection was made under, without anybody touching the loop itself.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Module 3 Section 5 owns why screening and twisting work. This section is selection, routing and identification.',
            'Instrument cable has twisted pairs and a screen because a signal circuit faces two coupling mechanisms, not one.',
            'They are not alternatives — a screened cable with untwisted conductors is defenceless against magnetic coupling.',
            '🔴 Pairs in one multipair run alongside each other for the whole length, which is exactly what produces coupling.',
            '🔴 An overall screen cannot prevent pair-to-pair coupling, because both pairs are inside it and it separates nothing.',
            'Differing twist rates between pairs address the magnetic half of pair-to-pair coupling.',
            'Individual screens address the capacitive half, and are the only thing that can.',
            'An overall screen on an individually screened cable still earns its place — it handles interference from outside.',
            'Individual screens are warranted where signal levels differ greatly or any pair carries a low-level signal.',
            'What shares a cable is a design decision, exactly as what shares a tray is. The sheath is not a boundary.',
            'Segregation attacks both mechanisms at once, and is nearly free at design stage and expensive afterwards.',
            'Drive outputs are among the worst neighbours, because coupling strengthens with frequency.',
            '🔴 Colour coding is not international. The installation specification is the authority, not habit.',
            '🔴 A reversed pair does not announce itself — it gives a plausible wrong reading or nothing, and survives commissioning.',
            'Intrinsically safe circuits are separated, secured against contact if a terminal loosens, and identified by a reserved colour. Section 5 covers the requirements.',
            'Conductor size is a mechanical decision — Section 3 showed the electrical demand is trivial.',
            '🔴 Armour is mechanical protection. It is not a screen and does not replace one.',
            '🔴 Protective earthing prevents harm; functional earthing and bonding make equipment work. Different jobs, different conductors.',
            '🔴 The instincts conflict: more bonding is right for fault protection and wrong for a signal reference, which needs exactly one earth.',
            'A4:2026 added Section 545 on functional earthing and bonding, and revised Table 51 to identify these conductors.',
            '🔴 Table 51: neither the FE designation nor green-and-yellow should identify a functional bonding conductor — those colours promise protection.',
            '🔴🔴 A protective earth is never lifted to cure a noise problem. If that is the fix, the cause has not been found.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 7.4" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Loop design and load
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-7-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Barriers and IS loops
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule7Section4;
