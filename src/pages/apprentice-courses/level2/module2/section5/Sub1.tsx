/**
 * Magnets, poles, attraction and repulsion (5.1).
 * City & Guilds 2365-02 → Unit 202 → LO5 → AC 5.1.
 * Apprentice-quality content from scratch — magnets are the gateway to
 * understanding everything that comes after on AC, motors and transformers.
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
} from '@/components/study-centre/learning';
import { BarMagnet, MagneticHysteresis } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Magnets, poles, attraction and repulsion (5.1) | Level 2 Module 2.5.1 | Elec-Mate';
const DESCRIPTION =
  'The first lesson on magnetism. Poles, fields, attraction, repulsion and the materials magnets actually grab — the foundation for every motor, transformer, RCD and generator you’ll touch.';

const checks = [
  {
    id: 'magnets-poles-rule',
    question: 'Two bar magnets — north end pushed toward north end. What happens?',
    options: [
      'They snap together hard',
      'They push each other away',
      'Nothing — magnets only attract',
      'They spin to face the same way',
    ],
    correctIndex: 1,
    explanation:
      'Like poles repel. North to north (or south to south) pushes apart. Unlike poles (N to S) attract. This is the core rule the rest of magnetism is built on.',
  },
  {
    id: 'magnets-materials',
    question: 'Which of these will a magnet actually pick up off the floor?',
    options: [
      'A copper 22mm pipe offcut',
      'A length of aluminium trunking',
      'A galvanised steel cable cleat',
      'A brass meter terminal',
    ],
    correctIndex: 2,
    explanation:
      'Steel is ferromagnetic — iron-based, so a magnet grips it. Copper, aluminium and brass aren’t. That’s why your stud detector only picks up the steel screws and joist hangers, not the copper pipework behind them.',
  },
  {
    id: 'magnets-field-direction',
    question: 'Which way do magnetic field lines run OUTSIDE a bar magnet?',
    options: [
      'South to north',
      'North to south',
      'Both ways at once',
      'They don’t go anywhere — the field just sits there',
    ],
    correctIndex: 1,
    explanation:
      'Convention: external field lines leave the north pole and enter the south pole. Inside the magnet they run S to N to complete the loop. They never cross and never start or stop in mid-air.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many poles does every magnet have, no matter how big or small?',
    options: ['One', 'Two', 'Three', 'Depends on the material'],
    correctAnswer: 1,
    explanation:
      'Two — always. Snap a bar magnet in half and you don’t get a lone north and a lone south. You get two smaller magnets, each with its own N and S. Magnetic monopoles don’t exist in nature.',
  },
  {
    id: 2,
    question: 'Like poles do what to each other?',
    options: ['Attract', 'Repel', 'Cancel out', 'Nothing'],
    correctAnswer: 1,
    explanation:
      'Like poles repel. The same word as electric charges of the same sign — and like the rule for charges, it’s the foundation of every motor and generator that follows.',
  },
  {
    id: 3,
    question: 'A magnet sticks to which of these materials?',
    options: ['Copper', 'Aluminium', 'Brass', 'Iron'],
    correctAnswer: 3,
    explanation:
      'Iron, nickel, cobalt and most steels are ferromagnetic. Copper, aluminium and brass aren’t — they’re excellent conductors but completely ignore a permanent magnet.',
  },
  {
    id: 4,
    question: 'Outside a bar magnet, field lines run from:',
    options: ['North to south', 'South to north', 'East to west', 'No fixed direction'],
    correctAnswer: 0,
    explanation:
      'External field lines leave the N pole, curve through the air and enter the S pole. Inside the magnet they run S to N so the loop closes.',
  },
  {
    id: 5,
    question: 'Where is the magnetic field of a bar magnet strongest?',
    options: [
      'In the middle of the magnet',
      'Right at the two poles',
      'A few centimetres away from each pole',
      'It’s the same everywhere',
    ],
    correctAnswer: 1,
    explanation:
      'The field is densest at the poles — that’s where the lines are packed closest together. Move away or toward the middle and the field weakens fast.',
  },
  {
    id: 6,
    question: 'You drop a magnet hard onto a concrete floor. What can happen?',
    options: [
      'Nothing — magnets are unbreakable',
      'It can lose some of its magnetism',
      'It gets stronger',
      'It changes polarity',
    ],
    correctAnswer: 1,
    explanation:
      'Knocks, heat and being held next to an opposing field can scramble the alignment of the domains inside the metal — the magnet weakens. That’s why proper magnets get stored with a "keeper" bar across the poles.',
  },
  {
    id: 7,
    question: 'A compass needle is itself a small magnet. Why does it point north?',
    options: [
      'The Earth pulls iron everywhere',
      'The Earth has its own magnetic field — its south magnetic pole is near geographic north',
      'Gravity drags the needle',
      'Someone glued it that way',
    ],
    correctAnswer: 1,
    explanation:
      'The Earth acts like a giant bar magnet. Its magnetic south pole sits near geographic north — so the north end of your compass needle (an unlike pole) is pulled towards it. Useful confusion for the odd exam question.',
  },
  {
    id: 8,
    question: 'Why does this matter to a UK electrician?',
    options: [
      'It doesn’t — it’s just physics',
      'Every motor, transformer, RCD coil and contactor in the trade runs on this same poles-and-fields principle',
      'Only generators use magnets',
      'Only data cables use magnets',
    ],
    correctAnswer: 1,
    explanation:
      'Every spinning motor, every step-down transformer, every RCD that detects an imbalance, every contactor that pulls in — they all rely on the same poles, the same fields and the same attract/repel rule you’ve just met.',
  },
];

const faqs = [
  {
    question: 'If I cut a magnet in half, do I get one north and one south on their own?',
    answer:
      'No. You get two smaller magnets, each with its own N and S pole. Cut those in half again and you get four. Keep going down to the atomic scale and every individual atom of iron is acting like a tiny magnet itself. A "magnetic monopole" — a lone north or south — has never been observed.',
  },
  {
    question: 'Why does a magnet stick to my consumer unit cover but not the cable inside it?',
    answer:
      'Most CU enclosures are mild steel — ferromagnetic, so the magnet grips. The cores inside are copper, which is non-magnetic. The PVC sheath is non-magnetic too. Same job, three different materials, only one of them magnetic.',
  },
  {
    question: 'What’s a "domain" inside a magnet?',
    answer:
      'A small region of the metal where all the atomic magnets are lined up the same way. In an ordinary bit of steel, the domains point in random directions and cancel each other out. In a permanent magnet, most of the domains have been aligned — they all point the same way and add up to one big magnetic field.',
  },
  {
    question: 'Can a magnet ever stop being a magnet?',
    answer:
      'Yes. Heat it past its Curie temperature (about 770°C for iron) and the alignment breaks down — it loses its magnetism completely. Hammering it, dropping it or holding it next to a strong opposing field can do it gradual damage. That’s why proper bar magnets are stored with a soft-iron "keeper" across the poles to protect the alignment.',
  },
  {
    question: 'Is the Earth’s magnetic field strong enough to affect anything I do on site?',
    answer:
      'It’s weak — about 50 microtesla compared to a small fridge magnet at around 5 millitesla (a hundred times stronger). But it’s enough to swing a compass, and it’s why true north and magnetic north differ by a few degrees depending on where you are. Doesn’t affect your installation work, but it’s the reason every map has a magnetic declination correction.',
  },
  {
    question: 'Do I need to memorise this for the exam?',
    answer:
      'You need three things in your head: every magnet has two poles, like repels and unlike attracts, and only ferromagnetic materials (iron, nickel, cobalt and most steels) are affected. The rest builds on that. Get those three solid and the next five subsections click into place.',
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
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 1"
            title="Magnets, poles, attraction and repulsion"
            description="The first proper lesson on magnetism. Get the poles, the fields and the attract/repel rule sound here, and the next five subsections — flux, induction, generators, AC — fall into place. Without magnetism, no UK electrical industry."
            tone="emerald"
          />

          <TLDR
            points={[
              'Every magnet has two poles — north and south. No exceptions, no matter how small you chop it.',
              'Like poles repel, unlike poles attract. Same rule as electric charges — and the basis of every motor that spins.',
              'Magnets only grab ferromagnetic materials — iron, nickel, cobalt and most steels. Copper, aluminium and brass don’t care.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the north and south poles of a magnet and describe how a field surrounds it.',
              'State the rule for attraction and repulsion between poles.',
              'Sketch the field around a bar magnet — direction outside, direction inside.',
              'Distinguish ferromagnetic, paramagnetic and non-magnetic materials.',
              'Tell the difference between a permanent magnet and a temporary (induced) one.',
              'Explain why magnetism matters to anything electrical you’ll work on.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why this matters</ContentEyebrow>

          <ConceptBlock
            title="Magnetism is the engine room of the whole UK electrical industry"
            plainEnglish="Every AC supply you’ll ever isolate started life as a coil being spun through a magnetic field. Every motor on site is the same trick in reverse. Even the RCD in your CU works because of magnetism."
            onSite="Pull the cover off any contactor, any RCD, any motor — there’s a magnet or a magnetised core inside doing the actual work. The brass screws and copper conductors are just there to deliver the current to the magnetic bit that does the job."
          >
            <p>
              You won’t spend much time on a job site thinking about bar magnets. But every spinning
              motor, every transformer in your CU’s smart meter, every RCD that detects an earth
              fault, every contactor that pulls in when the switch closes — they all run on the
              same poles, fields and forces you’re about to meet.
            </p>
            <p>
              Get this section solid and you’ve got the physics behind half the kit you’ll touch
              for the next forty years on site. Skip it and AC supplies, motors and
              transformers in later modules will feel like magic. They’re not — they’re this.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The basics</ContentEyebrow>

          <ConceptBlock
            title="Every magnet has two poles — north and south"
            plainEnglish="One end is N, the other is S. Always two, always paired. Doesn’t matter if it’s a fridge magnet or a 4-pole motor stator."
          >
            <p>
              Hang a bar magnet by a thread in still air and it slowly rotates until one end points
              roughly towards geographic north. That end is the <strong>north-seeking pole</strong>{' '}
              — usually shortened to just <strong>north (N)</strong>. The other end is the{' '}
              <strong>south (S)</strong> pole. Every magnet you’ll ever meet has these two ends.
            </p>
            <p>
              You can’t separate them. Snap a bar magnet in half and you don’t get a lone north
              piece and a lone south piece — you get two smaller magnets, each with its own N and
              S. Snap those in half and you’ve got four. There’s no such thing as a magnetic
              monopole — physicists have looked, and we still haven’t found one.
            </p>
          </ConceptBlock>

          <BarMagnet />

          <ConceptBlock
            title="Like poles repel, unlike poles attract"
            plainEnglish="N pushes N away. S pushes S away. N pulls S in. That’s it. Same rule as electric charges of the same and opposite sign."
            onSite="Stick two fridge magnets together the right way and they snap. Flip one over and they fight you. That’s the rule, in your hand."
          >
            <p>
              Bring the north pole of one magnet near the north pole of another and you can feel
              the resistance — they push each other away. Same with two south poles. Bring a north
              near a south and they pull together hard.
            </p>
            <p>
              This isn’t a courtesy of the magnets being polite — it’s a real, measurable force.
              The closer they are, the stronger it gets, falling off roughly with the square of
              distance (the same inverse-square pattern you see with gravity and electric charges).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IEC 60050 — International Electrotechnical Vocabulary, 121-11-15"
            clause="Magnet: a body that has a magnetic field, persistent or induced, and that exerts forces on other magnetic bodies."
            meaning={
              <>
                Two things to take away. First — a magnet is defined by what it{' '}
                <em>does</em> (exerts forces), not what it’s made of. Second — that field can be{' '}
                <strong>persistent</strong> (a permanent magnet) or <strong>induced</strong> (a
                soft-iron piece that becomes magnetic only while a current flows nearby — that’s
                your contactor coil, your relay, your solenoid valve).
              </>
            }
            cite="Source: IEC 60050 (Electropedia) — search 'magnet' for the full vocabulary entry."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The field around a magnet</ContentEyebrow>

          <ConceptBlock
            title="A magnet is surrounded by an invisible field"
            plainEnglish="The field is the region around the magnet where another magnet (or a piece of iron) feels the pull. We can’t see it, but we can map it."
            onSite="Sprinkle iron filings on a piece of paper and put a bar magnet under it. Tap the paper and the filings line up along the field lines. That same pattern is happening around every motor and every transformer on the job."
          >
            <p>
              The space around a magnet where its force can be felt is called the{' '}
              <strong>magnetic field</strong>. It has shape, it has direction, and it has strength
              that varies with distance. We draw it as a set of imaginary curved lines called{' '}
              <strong>field lines</strong> (or lines of flux).
            </p>
            <p>Three things about field lines that you should be able to recite in your sleep:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Outside the magnet, they run from N to S.</strong> They leave the north
                pole, curve through the air, and re-enter at the south pole.
              </li>
              <li>
                <strong>Inside the magnet, they run from S to N.</strong> So every line forms a
                complete closed loop — they don’t start or end in mid-air.
              </li>
              <li>
                <strong>They never cross each other.</strong> If two field patterns meet, the
                lines bend around each other or combine into one new pattern.
              </li>
            </ul>
          </ConceptBlock>

          <BarMagnet
            withCompass
            eyebrow="Bar magnet — field with a compass"
            caption="A small compass anywhere in the field aligns with the local field line — its N end points along the line in the direction the field is going."
          />

          <ConceptBlock
            title="The closer the lines, the stronger the field"
            plainEnglish="Field lines packed tight together = strong field. Spread out = weak field. The strongest place is right at the poles, where the lines are densest."
          >
            <p>
              Look at a bar magnet diagram and you’ll see the lines bunched up at the two ends and
              spread out in the middle. That tells you the field is strongest at the poles —
              that’s where a paperclip will stick first if you slide it along.
            </p>
            <p>
              Move a piece of iron away from the pole and the pull weakens fast. The field doesn’t
              fall off in a straight line — it drops roughly with the square of the distance, the
              same way electric force from a point charge does. Double the distance, roughly
              quarter the force.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Which materials care about a magnet</ContentEyebrow>

          <ConceptBlock
            title="Ferromagnetic, paramagnetic and the rest"
            plainEnglish="Most materials don’t care about magnets. A few care a lot. The ones that care a lot are the ones we make magnets, motor cores and transformer laminations out of."
            onSite="That’s why a stud finder picks up the steel nails in a stud, but a magnet on a string won’t budge near a copper boss or a brass terminal."
          >
            <p>Materials sort into three rough groups by how they react to a magnet:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ferromagnetic</strong> — strongly attracted, can be made into permanent
                magnets. Iron, nickel, cobalt, most steels (mild and tool steels), and a few
                alloys like alnico and ferrite. This is the group that matters for your trade.
              </li>
              <li>
                <strong>Paramagnetic</strong> — very weakly attracted, only detectable with
                sensitive lab gear. Aluminium, platinum, oxygen. You won’t notice this on site.
              </li>
              <li>
                <strong>Diamagnetic</strong> — very weakly repelled (yes, repelled). Copper,
                water, gold, most plastics. Same story — too weak to feel.
              </li>
            </ul>
            <p>
              For everyday electrical work, the practical line is this: <strong>iron and steel
              respond to magnets — copper, aluminium, brass and plastics don’t.</strong> That’s
              what your magnet on a string is testing for when you’re fishing a screw out from
              under a floorboard.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Permanent vs induced magnets</ContentEyebrow>

          <ConceptBlock
            title="Permanent magnets keep their field. Induced ones borrow it."
            plainEnglish="A permanent magnet is magnetised once and stays that way. A piece of soft iron only becomes magnetic when there’s another magnet (or a current) near it — and goes back to ordinary iron the moment that source is removed."
            onSite="A contactor coil is exactly this — soft iron core, current through the coil makes it magnetic enough to pull the armature in, current cuts out and the spring throws it back. That’s an induced magnet doing 100,000+ cycles a year."
          >
            <p>
              <strong>Permanent magnets</strong> are made from materials whose internal alignment
              stays fixed once you’ve set it — alnico, ferrite, neodymium. Once magnetised, they
              hold that field for years. Drop them, hammer them or heat them and the alignment can
              get scrambled.
            </p>
            <p>
              <strong>Induced (or temporary) magnets</strong> are made from "soft" magnetic
              materials — usually low-carbon iron. They line up easily when another magnet or a
              current is near, but lose the alignment the moment that source goes away. That’s
              perfect for transformer cores and contactor armatures, where you want the magnetism
              to switch on and off cleanly with the current.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Inside the metal — magnetic domains"
            plainEnglish="A bit of iron is full of microscopic magnetic regions called domains. In an unmagnetised bar they point every which way and cancel out. In a magnetised bar most of them point the same way and add up to one big magnet."
          >
            <p>
              A piece of unmagnetised iron is already full of tiny magnetic regions called{' '}
              <strong>domains</strong> — typically a fraction of a millimetre across. Each domain
              has all its atoms’ magnetic moments lined up the same way, so it’s a small magnet on
              its own. But across the whole bar, the domains point in random directions, so they
              cancel out and the bar shows no net magnetism.
            </p>
            <p>
              Stroke the bar with a magnet, or run a strong current through a coil wrapped around
              it, and the domains pivot to line up with the external field. Once enough of them
              are aligned, the whole bar acts as a single magnet. Heat it past its Curie point
              (about 770°C for iron) and the alignment shakes apart again.
            </p>
            <p>
              <strong>Read the diagram below:</strong> the loop shape tells you whether a material
              ‘remembers’ a magnetic field after the source is removed. A wide loop = a hard
              magnet that holds its alignment (good for permanent magnets). A narrow loop = a soft
              magnet that lets go easily (good for transformer cores and contactor armatures,
              where you want the magnetism to switch on and off cleanly with the current).
            </p>
          </ConceptBlock>

          <MagneticHysteresis />

          <RegsCallout
            source="BS EN IEC 60404-1:2017 — Magnetic materials, Part 1: Classification"
            clause="Magnetic materials are classified into soft magnetic materials, hard magnetic materials, and other special magnetic materials, based on their coercivity and intended application."
            meaning={
              <>
                The standard splits magnetic materials into <strong>soft</strong> (easy to
                magnetise and demagnetise — used for transformer cores, motor laminations,
                solenoids) and <strong>hard</strong> (hold their magnetism stubbornly — used for
                permanent magnets in DC motors, sensors and instrument needles). When a manufacturer
                quotes a "grain-oriented silicon steel" core, that’s a soft magnetic material from
                this standard.
              </>
            }
            cite="Reference: BS EN IEC 60404 series — Magnetic materials, full standard available via BSI."
          />

          <SectionRule />

          <ContentEyebrow>Worked example — what attracts and what doesn’t</ContentEyebrow>

          <ConceptBlock title="A practical sort: which of these are magnetic?">
            <p>
              Pretend you’ve dropped your van keys into a tray of mixed offcuts. You’ve got a
              strong neodymium magnet on a string. Which bits will it pick up, and which will it
              leave behind?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Steel cable cleat</strong> — yes, it grabs. Mild steel is ferromagnetic.
              </li>
              <li>
                <strong>Copper 22mm pipe offcut</strong> — no. Copper is diamagnetic, which to
                your hand looks like "no reaction at all".
              </li>
              <li>
                <strong>Aluminium trunking lid</strong> — no. Aluminium is paramagnetic — too
                weakly attracted to feel.
              </li>
              <li>
                <strong>Brass meter terminal</strong> — no. Brass is a copper-zinc alloy, both
                non-ferromagnetic.
              </li>
              <li>
                <strong>Galvanised steel screw</strong> — yes. The galvanising (zinc coating)
                isn’t magnetic, but the steel underneath is.
              </li>
              <li>
                <strong>Stainless steel washer</strong> — depends on the grade. 304 and 316
                (austenitic, the common ones) are weakly magnetic at best. 410 and 430
                (martensitic and ferritic) are strongly magnetic. A magnet test is the easy way to
                tell them apart.
              </li>
            </ul>
            <p>
              That last one is the trick that catches a lot of apprentices out: not all
              "stainless" is the same. Quick magnet check on the bench tells you which grade
              you’re holding before you order more.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <SectionRule />

          <ContentEyebrow>Where magnetism shows up on site</ContentEyebrow>

          <ConceptBlock
            title="Where magnetism shows up on site — five tools you’ve already touched"
            plainEnglish="Magnetism isn’t a museum piece. It’s in your toolbox, your CU and your van. Once you learn to spot it, you see it everywhere."
            onSite="The same poles, fields and forces from the bar-magnet diagrams above are at work in everyday kit. Five examples you’ll recognise:"
          >
            <p>
              You don’t need to wait for the motor and transformer subsections to find magnetism in
              action. It’s already in the kit you carry. Five places to look right now:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The trip mechanism inside an MCB or RCBO.</strong> The instantaneous
                short-circuit element is a small electromagnet. A high fault current through the
                breaker makes a strong field that yanks a soft-iron plunger across, mechanically
                tripping the contacts open. That magnetic latch is the difference between a
                breaker that trips in 10 ms on a fault and one that doesn’t. Sub5.3 takes that
                apart properly.
              </li>
              <li>
                <strong>The magnetised tip on your screwdriver.</strong> Holds a screw on the end
                so you can start it one-handed in the back of a CU. Useful — until it grabs swarf
                you didn’t mean to pick up, or trips a hall-effect sensor on a control board you’re
                working near.
              </li>
              <li>
                <strong>The magnet-on-the-end-of-a-fishing-rod trick.</strong> Drop a screw into a
                floor void or behind a kitchen unit and the small telescopic magnetic pickup tool
                from your kit fishes it out. Same idea as a magnet on a string — only steel and
                iron come back, copper and brass stay where they fell.
              </li>
              <li>
                <strong>The cup magnet on a contractor’s level.</strong> Lets you stick the level
                onto a steel beam, RSJ or steel stud track to mark out a level run hands-free. The
                cup shape concentrates the field at a flat face, which is why those magnets pull
                so much harder than a flat fridge magnet of the same size.
              </li>
              <li>
                <strong>The toroidal core inside an RCD.</strong> Not a magnet itself — but a
                purpose-built ring of soft magnetic material that detects an imbalance between
                line and neutral by sensing the changing field. Sub6.6 builds this directly out
                of the principles in this section, so file it away for now.
              </li>
            </ul>
            <p>
              Every one of these is a daily-use object running on what you’ve just read. The bar
              magnet on the page is a stand-in for kit you’ll pick up tomorrow.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Thinking the strongest part of a magnet is the middle"
            whatHappens={
              <>
                You’re sliding a small bar magnet along a steel ruler to check it really is steel.
                You hold it by the middle and slide it across — barely any drag. Wrong end of the
                magnet doing the work. The middle of a bar magnet is where the field is{' '}
                <em>weakest</em>, not strongest.
              </>
            }
            doInstead={
              <>
                Touch one of the <strong>ends</strong> of the magnet to the metal — that’s where
                the field lines are densest and the pull is strongest. Same applies when you’re
                using a magnetic torch or a pickup tool: the working end is the pole, not the
                shaft.
              </>
            }
          />

          <Scenario
            title="The screwdriver that picks up screws on its own — and keeps losing them in the CU"
            situation={
              <>
                You’re second-fixing a domestic CU. Every time you dip your Phillips into the
                bag of small grub screws for a busbar shroud, two or three jump up and stick to
                the tip. Annoying — but worse, when you’re working inside the consumer unit, a
                tiny screw drops off the bit and disappears down behind the DIN rail. Third one
                today. You weren’t magnetised this morning. What changed?
              </>
            }
            whatToDo={
              <>
                The tip of your screwdriver has been magnetised — almost certainly by sitting near
                a strong field on a job earlier in the week (the speaker cabinet you helped lift
                in for the AV install on Tuesday is a likely culprit; speaker drivers carry serious
                neodymium magnets). The tip’s domains have lined up and now it grabs ferrous bits
                without you asking. <strong>Three ways to degauss it:</strong> (1) spin the tip
                fast inside the coil of a commercial degausser if you’ve got one in the van;
                (2) rotate or flick it briskly past the open end of an AC mains transformer (same
                principle, free); (3) cruder but works in a pinch — give the shaft a sharp tap on
                a hard non-magnetic surface (a concrete kerb, the side of a brass tap), which
                physically jolts the domains back out of alignment. Re-test on the screw bag — if
                they still cling, repeat.
              </>
            }
            whyItMatters={
              <>
                Magnetism isn’t a textbook curiosity — it’s a daily annoyance. A magnetised tip
                that grabs swarf you didn’t mean to pick up can short a live busbar; a screw lost
                inside a powered CU is a dead-front violation waiting to happen. Worse, on
                control boards with hall-effect sensors, a magnetised tool waved past the wrong
                IC can trigger nuisance trips you can’t debug. Knowing magnetism is something you
                can both create and undo on the bench is part of being on site.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Every magnet has exactly two poles — N and S. Cut it in half and you get two smaller magnets, never a lone pole.',
              'Like poles repel, unlike poles attract. Same rule, every time, no exceptions.',
              'Field lines run from N to S outside the magnet, S to N inside. They never cross. They’re packed tight at the poles where the field is strongest.',
              'Only ferromagnetic materials (iron, nickel, cobalt, most steels) react strongly to a magnet. Copper, aluminium and brass don’t — they’re great conductors, but magnetically deaf.',
              'Permanent magnets hold their field. Induced (soft-iron) magnets only act magnetic when something else is making them — that’s exactly how relays, contactors and transformer cores work.',
              'Magnetism isn’t physics trivia — it’s the working principle inside motors, transformers, RCDs, MCBs, contactors and every AC supply you’ll ever isolate.',
            ]}
          />

          <Quiz title="Magnets and poles — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section4/4-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.6 Worked DC circuits
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/level2/module2/section5/5-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Magnetic flux and flux density
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
