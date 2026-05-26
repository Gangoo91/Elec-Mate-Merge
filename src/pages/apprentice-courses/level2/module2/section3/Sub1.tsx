/**
 * Module 2 · Section 3 · Subsection 1 — Electron theory (AC 4.1)
 * City & Guilds 2365-02 → Unit 202 → LO4 part 1.
 * Written from scratch for the apprentice voice rewrite.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Electron theory — atoms, charge and current flow | Level 2 Module 2.3.1 (AC 4.1) | Elec-Mate';
const DESCRIPTION =
  'What current actually is, where electrons sit in an atom, why metals conduct, and the difference between electron flow and conventional current.';

const checks = [
  {
    id: 'electron-theory-charge-check',
    question: 'Which sub-atomic particle carries a negative charge?',
    options: [
      'Neutron',
      'Proton',
      'Nucleus',
      'Electron',
    ],
    correctIndex: 3,
    explanation:
      "Electrons carry the negative charge and orbit the nucleus. Protons are positive, neutrons are neutral, and the nucleus is the lump in the middle made of the first two.",
  },
  {
    id: 'electron-theory-direction-check',
    question:
      'In a copper cable carrying DC, the actual electrons drift in which direction relative to conventional current?',
    options: [
      'Metallic (ferrous and non-ferrous) materials only',
      'Installing sockets before plastering is complete',
      'Opposite direction to conventional current',
      'Replacing 25 kg bags of cement with 15 kg bags',
    ],
    correctIndex: 2,
    explanation:
      "Conventional current is drawn from positive to negative. Electrons (the things actually moving) drift the other way — negative to positive. Both descriptions of the same circuit, just opposite arrows.",
  },
  {
    id: 'electron-theory-drift-check',
    question:
      'A free electron in a copper cable drifts along the wire at roughly what speed?',
    options: [
      'A fraction of a millimetre per second',
      'The same speed as the electrical signal',
      'About the speed of light',
      'A few hundred metres per second',
    ],
    correctIndex: 0,
    explanation:
      "Drift velocity is tiny — well under 1 mm per second on a typical cable. The energy and the signal travel at near light speed through the field surrounding the wire, but the electrons themselves crawl.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What sits at the centre of an atom?',
    options: [
      'Loud machinery on a building site',
      'A nucleus made of protons and neutrons',
      'Insulation degradation beginning',
      'All observations, defects, and compliance issues',
    ],
    correctAnswer: 1,
    explanation:
      "The nucleus holds the protons (positive) and the neutrons (neutral). Electrons orbit around it. Lose or gain an electron and the atom is no longer neutral — it becomes an ion.",
  },
  {
    id: 2,
    question: 'A neutral atom has equal numbers of:',
    options: [
      'Electrons and neutrons',
      'Protons and neutrons',
      'Protons and electrons',
      'Protons and ions',
    ],
    correctAnswer: 2,
    explanation:
      "Equal positive (proton) and negative (electron) charges cancel out. That's the definition of a neutral atom. Knock an electron loose and you get a positive ion.",
  },
  {
    id: 3,
    question: 'Why is copper such a good conductor?',
    options: [
      'Carry out full initial verification style testing',
      'Dwellings including houses, flats, and communal areas',
      'Protection from voltage transients',
      'It has lots of free electrons in its outer shell',
    ],
    correctAnswer: 3,
    explanation:
      "Copper's outer electrons are loosely held — they roam around as a 'sea' of free electrons. Apply a potential difference and they drift, which is what we measure as current.",
  },
  {
    id: 4,
    question: 'What does the term "electric current" actually describe?',
    options: [
      'The rate of flow of charge past a point',
      'The flow of voltage along a wire',
      'The amount of resistance in a cable',
      'The size of the cable',
    ],
    correctAnswer: 0,
    explanation:
      "Current (I) is charge flow per second. One amp = one coulomb per second. Voltage is the push behind it; resistance is what holds it back.",
  },
  {
    id: 5,
    question: 'Conventional current flows from:',
    options: [
      'Negative to positive',
      'Positive to negative',
      'Source to switch',
      'Earth to live',
    ],
    correctAnswer: 1,
    explanation:
      "Conventional current is drawn positive to negative through the external circuit. It was set in stone before anyone knew which way the electrons actually went. Every diagram, every regulation, every formula uses the conventional direction.",
  },
  {
    id: 6,
    question: 'In a metal conductor, electron flow is:',
    options: [
      'In the same direction as conventional current',
      'Only present in AC circuits',
      'In the opposite direction to conventional current',
      'Only present at the moment of switch-on',
    ],
    correctAnswer: 2,
    explanation:
      "Electrons drift from negative to positive — opposite to the conventional arrow. Same circuit, same current, just two ways of describing the direction.",
  },
  {
    id: 7,
    question:
      'When you flick a light switch and the lamp lights up almost instantly, what is travelling at near light speed?',
    options: [
      'Electrical Installation Certificate',
      'A skills card confirming competence level',
      'They create significant flow restrictions (high K values)',
      'The electromagnetic field around the conductor',
    ],
    correctAnswer: 3,
    explanation:
      "The field — the push — propagates at close to the speed of light. The electrons themselves only crawl. Think of a row of marbles: shove one end and the other end moves almost instantly, but no single marble has gone the full distance.",
  },
  {
    id: 8,
    question: 'The unit of electric charge is the:',
    options: [
      'Coulomb',
      'Ohm',
      'Volt',
      'Ampere',
    ],
    correctAnswer: 0,
    explanation:
      "Charge is measured in coulombs (C). One coulomb is roughly 6.24 × 10¹⁸ electrons. One amp = one coulomb passing a point every second. Volts measure the push, ohms measure resistance.",
  },
];

const faqs = [
  {
    question: "Do I really need to know about atoms to be an electrician?",
    answer:
      "Not for ringing in a circuit, no. But you'll see this stuff again in I&T, in fault-finding and in your AM2 written paper — and it makes the rest of Module 2 click. Once you know that current = charge moving through a cable, voltage drop and I²R heating stop being abstract formulas.",
  },
  {
    question: "Why is conventional current the 'wrong way round' if we know electrons go the other way?",
    answer:
      "Benjamin Franklin guessed wrong in the 1700s — he picked positive-to-negative as the direction of flow. By the time JJ Thomson discovered the electron in 1897, every textbook, every regulation and every diagram already used Franklin's convention. Easier to keep it than to redraw the world. So we live with two arrows that mean the same thing.",
  },
  {
    question: 'What makes copper conduct better than, say, plastic or rubber?',
    answer:
      "Copper has loosely held outer electrons that move freely between atoms — a 'sea' of free electrons. Plastic and rubber lock their electrons tightly into bonds, so there's nothing free to move when you push. That's the difference between a conductor and an insulator at atomic level.",
  },
  {
    question: 'If electrons crawl, why does the light come on instantly?',
    answer:
      "The electrons don't have to travel from the switch to the bulb — the whole conductor is already full of electrons. Flicking the switch pushes the whole sea of electrons at once. The signal (the field) moves at near light speed; each individual electron only has to drift a tiny bit.",
  },
  {
    question: "What's an ion, and where does it fit in?",
    answer:
      "An atom that's lost or gained an electron. Lose one and you get a positive ion (a cation); gain one and you get a negative ion (an anion). You'll see this come up again in subsection 3.6 — chemical effects of current, batteries and electrolysis are all about ion movement.",
  },
  {
    question: 'Does electron theory matter for AC as well as DC?',
    answer:
      "Yes, but in AC the electrons don't drift in one direction — they wiggle back and forth around their starting point as the polarity swaps 50 times a second. The energy still flows from source to load through the field; the electrons themselves barely go anywhere.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 1"
            title="Electron theory — atoms, charge and current flow"
            description="What current actually is at atomic level. Why metals conduct, why plastics don't, and why every diagram you'll ever read draws the arrows backwards."
            tone="emerald"
          />

          <TLDR
            points={[
              "Atoms have a positive nucleus (protons + neutrons) and negative electrons buzzing around it. Equal numbers = neutral atom.",
              "Metals like copper hold their outer electrons loosely. Apply a voltage and they drift — that drift is what we call electric current.",
              "Conventional current goes positive → negative. Electrons actually go the opposite way. Both describe the same circuit; we use the conventional arrow on every drawing and reg.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Sketch the structure of an atom — nucleus, protons, neutrons and electron shells.",
              "Explain what electric charge is and which particle carries the negative charge.",
              "Explain why copper and aluminium conduct, while PVC and rubber don't, in terms of free electrons.",
              "State the difference between conventional current and electron flow, and which one we draw on schematics.",
              "Use the basic units — coulomb (charge) and amp (charge per second) — correctly.",
              "Explain why a lamp lights instantly even though electrons drift very slowly.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What an atom looks like</ContentEyebrow>

          <ConceptBlock
            title="Three particles, one tidy little package"
            plainEnglish="A solid lump in the middle (the nucleus) with tiny negative bits orbiting around it (the electrons). That's it. Everything else in this section follows from those two."
          >
            <p>
              Every bit of matter — copper conductors, PVC sheath, the air between you and the
              consumer unit — is made of atoms. An atom has three sub-atomic particles you need to
              know:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Protons</strong> — positive charge (+). Sit in the nucleus.
              </li>
              <li>
                <strong>Neutrons</strong> — no charge. Also in the nucleus. They keep the protons
                from blowing each other apart.
              </li>
              <li>
                <strong>Electrons</strong> — negative charge (−). Orbit the nucleus in shells, like
                planets round a sun (rough picture, but it'll do).
              </li>
            </ul>
            <p>
              In a normal, untouched atom the number of protons equals the number of electrons.
              Positive cancels negative. The atom has no overall charge — we call it{' '}
              <strong>neutral</strong>. Knock an electron off and the atom is left with one more
              proton than electron — overall positive. Bolt an extra electron on and it's overall
              negative. Either way, that charged atom is called an <strong>ion</strong>.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Electron shells and the outer ones that matter"
            onSite="The outer-shell electrons are why metals conduct and plastics don't. Same physics, totally different behaviour at the consumer unit."
          >
            <p>
              Electrons aren't piled in randomly. They sit in <strong>shells</strong> around the
              nucleus, with the inner shells filling first. The electrons in the outermost shell
              are called <strong>valence electrons</strong>, and they decide how the atom behaves
              chemically and electrically.
            </p>
            <p>
              Metals have valence electrons that are loosely held — barely bothered with their own
              atom. They're free to wander between neighbouring atoms. Push them with a voltage and
              they drift along the conductor. That drift is the current we measure with a clamp
              meter.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Part 2 Definitions (Electric current)"
            clause="Electric current (I): The rate of flow of electric charge."
            meaning={
              <>
                One sentence, but it's the whole game. Charge moves; we measure how fast it's
                moving past a point. Faster flow → more current. <strong>One amp</strong> = one
                coulomb of charge passing a point every second.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Part 2."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Why metals conduct</ContentEyebrow>

          <ConceptBlock
            title="The 'sea of free electrons' picture"
            plainEnglish="Imagine the metal lattice as a load of fixed positive ions sitting in a fluid pool of negative electrons. The ions don't move; the electrons swim around freely."
            onSite="That's why a longer cable run has more resistance — the free electrons have more atoms to bump into on their way through. Same metal, same temperature, same force per electron — just more obstacles."
          >
            <p>
              In a copper conductor, every atom donates one or two of its outer electrons to a
              shared pool. Those electrons are no longer 'owned' by any single atom — they roam
              freely between the atoms that make up the lattice. This is the{' '}
              <strong>sea of free electrons</strong> model, and it's the cleanest way to picture
              what's going on inside a wire.
            </p>
            <p>
              When you connect a battery or close a switch, you put a <strong>potential
              difference</strong> across the cable. That's a push. Every free electron feels the
              push at the same time and starts to drift along the cable. They don't move fast (we
              come back to that) but there are unimaginable numbers of them — a 1 mm copper cable
              has around 10²² free electrons per metre.
            </p>
            <p>
              In a plastic or rubber insulator, the outer electrons are locked into bonds with
              their atoms — there's no shared pool. Push as hard as you like with a normal voltage
              and very few electrons can move. That's why the same copper wire is harmless once
              it's wrapped in PVC: the conductor carries the current, the insulator stops it
              leaking out.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Charge — the bit being moved around">
            <p>
              Electric charge is a property carried by certain particles. Electrons carry one unit
              of negative charge each; protons carry one unit of positive. Charge itself is
              measured in <strong>coulombs (C)</strong>. One coulomb is roughly{' '}
              <strong>6.24 × 10¹⁸ electrons</strong> — six billion billion. You'll never count
              individual ones; we deal in bulk.
            </p>
            <p>
              Current is just how much charge is moving past a point each second:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1 ampere = 1 coulomb per second.</strong> A 6 A lighting circuit moves
                6 C of charge past any point every second it's switched on.
              </li>
              <li>
                <strong>Q = I × t</strong> — total charge equals current times time. A 10 A load
                running for 60 seconds moves 600 C of charge through the cable.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Part 2 Definitions (Charge, Coulomb)"
            clause="Coulomb (C): The SI unit of electric charge. One coulomb equals the quantity of charge transported by a current of one ampere flowing for one second."
            meaning={
              <>
                Just the formal version of <strong>Q = I × t</strong>. You won't write coulombs on
                a certificate, but they're the bridge between 'how many electrons' and 'how many
                amps' — useful when you read about battery capacity (Ah) later in 3.6.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Part 2; SI base units."
          />

          <SectionRule />

          <ContentEyebrow>Two arrows, one current</ContentEyebrow>

          <ConceptBlock
            title="Conventional current vs electron flow"
            plainEnglish="The arrows on a circuit diagram show conventional current — a positive-to-negative flow that ignores what the electrons actually do. The electrons themselves drift the other way. Both descriptions describe the same circuit; the maths works either way."
            onSite="When you read a schematic, follow the arrows. Don't try to mentally reverse them. The whole industry — BS 7671, every textbook, every CAD package — uses the conventional direction."
          >
            <p>
              Back in the 1700s, Benjamin Franklin had to guess which way charge moved before
              anyone knew about electrons. He picked positive-to-negative. By the time JJ Thomson
              discovered the electron in 1897 and proved it carried negative charge (and therefore
              moved the opposite way to Franklin's arrow), every textbook in the world was already
              using Franklin's convention. The world chose to keep the original direction rather
              than redraw a century of work.
            </p>
            <p>So we live with two truthful descriptions of the same thing:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conventional current</strong> — positive → negative through the external
                circuit. This is what every diagram, formula, regulation and exam paper uses.
              </li>
              <li>
                <strong>Electron flow</strong> — negative → positive. This is what the electrons
                actually do.
              </li>
            </ul>
            <p>
              They're not contradicting each other. They're equivalent — like describing a road as
              "north-bound" or "south-bound" depending on which side you're on. For everything
              you'll do as an electrician, use conventional current and forget about the contradiction.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.conventionalCurrent.url}
            title={videos.conventionalCurrent.title}
            channel={videos.conventionalCurrent.channel}
            duration={videos.conventionalCurrent.duration}
            topic="Conventional current vs electron flow · Unit 202 AC 4.1"
            caption="Worth a watch — the animation on free-electron drift makes the two-arrow business obvious in about three minutes."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>How fast do electrons actually move?</ContentEyebrow>

          <ConceptBlock
            title="Drift velocity — slower than you'd think"
            plainEnglish="Each electron only crawls along the wire — well under a millimetre per second on a typical cable. The 'speed of electricity' you've heard about is the field, not the electrons themselves."
          >
            <p>
              Here's the thing that catches most apprentices off guard: when you flick a switch and
              the lamp lights up immediately, the electrons themselves are crawling at maybe
              0.1 mm per second through the cable. So how does the lamp get the energy that fast?
            </p>
            <p>
              The trick is that the cable is <strong>already full of electrons</strong>. When you
              close the switch, you set up an electric field along the conductor at near the speed
              of light. That field pushes the entire sea of
              electrons everywhere at once. The electron at the lamp end of the cable starts
              moving at the same instant as the one at the switch end. Each electron only has to
              shuffle a tiny distance to deliver the energy to the lamp filament.
            </p>
            <p>
              Easy mental picture: a long row of marbles already touching each other end to end.
              Push one marble at one end, and the marble at the other end pops out almost
              immediately — but no single marble has travelled the whole length of the row. The
              push (the signal) is fast; the marbles (the electrons) crawl.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Part 2 Definitions (Conductor, Live part)"
            clause="Conductor (of a cable): A conductive part intended to carry a specified electric current. Live part: A conductor or conductive part intended to be energised in normal use."
            meaning={
              <>
                The bit doing the carrying is the <strong>conductor</strong> — copper or aluminium
                in nearly every BS 7671 install. A live part is anything energised in normal use.
                The reason a live conductor is dangerous is that touching it gives the free
                electrons a new path — through you, to earth — and you become part of the circuit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Part 2."
          />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Putting it together on site</ContentEyebrow>

          <CommonMistake
            title="Confusing 'voltage flowing' with 'current flowing'"
            whatHappens={
              <>
                You hear someone say "the voltage is flowing down the cable" or "230 volts of
                current". Both descriptions mash together two different things. Voltage is the
                push; current is what moves. They're not interchangeable, and writing it like that
                in your AM2 paper will lose you marks.
              </>
            }
            doInstead={
              <>
                Use the right word. <strong>Voltage (V)</strong> is the potential difference — the
                push between two points, measured in volts. <strong>Current (I)</strong> is the
                rate of charge flow — the actual movement, measured in amps. Voltage doesn't flow.
                Current does. Voltage is the reason current flows.
              </>
            }
          />

          <Scenario
            title="The lamp won't light — is it the cable or the switch?"
            situation={
              <>
                Customer says the bedside lamp went dead overnight. You isolate at the consumer
                unit, plug the lamp into a known-good socket and it works. Plug a known-good lamp
                into the original socket and that's dead too.
              </>
            }
            whatToDo={
              <>
                The fault's in the supply path to that socket — break in the conductor, loose
                terminal, broken switch. Somewhere in the conductor, the sea of free electrons
                doesn't have a continuous path. No path = no drift = no current = no light. Trace
                back from the dead socket using a continuity test (after isolating, locking off and
                proving dead, obviously).
              </>
            }
            whyItMatters={
              <>
                Electron theory is what tells you why an open circuit kills the lamp. The voltage
                is still there at the consumer unit — but with no continuous conductor, the
                electrons have nowhere to drift to, so there's no current. Diagnosis works because
                you understand what current actually <em>is</em>.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>One more wrinkle — what happens under AC?</ContentEyebrow>

          <ConceptBlock
            title="Electron theory under AC — same particles, different motion"
            plainEnglish="Under DC the electrons drift one way along the cable. Under AC they don’t — they oscillate back and forth around their starting point at 50 Hz. Net movement: roughly zero. Energy delivery: still happens, because the field is what carries the energy."
            onSite="Every UK final circuit you’ll meet this year is AC at 50 Hz. The drifting-electron picture from earlier in this Sub still applies — but the drift is now a tiny back-and-forth wiggle, 100 reversals per second, instead of a one-way crawl."
          >
            <p>
              Under DC, electrons drift slowly from negative to positive. Under AC the polarity
              swaps 50 times a second (in the UK), so the electrons reverse direction 100 times a
              second — they oscillate in place rather than drifting net anywhere. A given
              electron on the lighting circuit in your kitchen has been wiggling back and forth
              over a fraction of a millimetre for years and has essentially stayed put.
            </p>
            <p>
              So how does the load still get power? Because the <strong>energy doesn’t live in
              the electrons</strong> — it lives in the electromagnetic field that surrounds the
              conductor. That field is what propagates from source to load at near light speed.
              The electrons are just the medium the field uses to push and pull. Same physics as
              the DC case earlier in this Sub; the field still transfers the energy. Only the
              electron motion looks different.
            </p>
            <p>
              That oscillation is also why AC measurements need a different approach to averaging.
              You can’t take a simple average — over one cycle the current goes positive then
              negative and the average is zero. The trick is RMS (root mean square), which gives
              you the equivalent steady DC value that would do the same heating in a resistor.{' '}
              <strong>You’ll see exactly why this matters when we get to RMS in Sub5.6</strong>{' '}
              — for now, just know that AC current and voltage figures (the 230 V at your sockets,
              the 13 A at your plug) are RMS values, not peaks.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Atoms = positive nucleus (protons + neutrons) plus negative electrons in shells around it. Equal numbers = neutral.",
              "Metals conduct because their outer electrons are loose — a 'sea' of free electrons drifts when you apply a voltage. Insulators lock theirs up.",
              "Current is the rate of charge flow. One amp = one coulomb of charge per second. Q = I × t.",
              "Conventional current goes + to −. Electrons go − to +. Both descriptions of the same circuit — always work to the conventional arrow.",
              "Electrons themselves crawl (a fraction of a mm/s). The signal — the field — travels at near light speed, which is why the lamp lights instantly.",
              "Voltage is the push. Current is the movement. Don't say 'voltage flowing' — voltage doesn't flow, current does.",
            ]}
          />

          <Quiz title="Electron theory knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.6 Efficiency and inter-relationships
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Conductors and insulators
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
