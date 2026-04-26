/**
 * Module 2 · Section 2 · Sub 2 — Force and Newton's basics (AC 3.2 / 3.3)
 * City & Guilds 2365-02 → Unit 202 → LO3 → AC 3.2 and 3.3.
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
import { ForceVectorDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Force and Newton’s basics | Level 2 Module 2.2.2 | Elec-Mate';
const DESCRIPTION =
  'A force is a push or a pull. Newton boiled down how forces behave into three short laws — and they explain everything from why your drill kicks back to why a falling tool can crack a tile.';

/* ── Inline check questions ──────────────────────────────────────── */

const checks = [
  {
    id: 'force-units-check',
    question: 'A 4 kg drill is accelerated at 2 m/s². What force is needed?',
    options: ['2 N', '4 N', '6 N', '8 N'],
    correctIndex: 3,
    explanation: 'F = m × a = 4 × 2 = 8 N. That’s Newton’s second law in one line.',
  },
  {
    id: 'newton-third-law-check',
    question:
      'You pull hard on a stuck cable in a conduit. The cable doesn’t move. Why does Newton’s third law still apply?',
    options: [
      'It doesn’t — nothing’s moving so no forces are involved',
      'The cable is pulling back on you with an equal and opposite force',
      'Forces only matter when something accelerates',
      'Friction cancels gravity, so the third law switches off',
    ],
    correctIndex: 1,
    explanation:
      'Every action force has an equal and opposite reaction. The cable pulls on you just as hard as you pull on it — that’s why your hands ache after fighting one for ten minutes.',
  },
  {
    id: 'balanced-forces-check',
    question:
      'A consumer unit is bolted to a wall. Gravity pulls it down at 200 N. The bolts hold it up at 200 N. What does Newton’s first law say?',
    options: [
      'It must be accelerating',
      'It will stay at rest because the forces are balanced',
      'The bolts will fail because gravity always wins',
      'The unit will start to slide sideways',
    ],
    correctIndex: 1,
    explanation:
      'Forces balanced → no change in motion. First law in action. The moment one of those bolts gives, the forces are no longer balanced and gravity wins — fast.',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What is a force?',
    options: [
      'The amount of stuff in an object',
      'A push or a pull on an object',
      'The energy stored in something',
      'How quickly something moves',
    ],
    correctAnswer: 1,
    explanation:
      'A force is a push or a pull. It can change an object’s speed, direction or shape. Measured in newtons (N).',
  },
  {
    id: 2,
    question: 'What is the SI unit of force?',
    options: ['Kilogram (kg)', 'Joule (J)', 'Newton (N)', 'Watt (W)'],
    correctAnswer: 2,
    explanation:
      '1 N is the force needed to give a 1 kg mass an acceleration of 1 m/s². Named after Sir Isaac Newton, who worked it all out in the 1680s.',
  },
  {
    id: 3,
    question: 'Newton’s first law (the law of inertia) says…',
    options: [
      'F = m × a',
      'Every action has an equal and opposite reaction',
      'An object stays at rest, or moves at constant speed in a straight line, unless a force acts on it',
      'Heavy objects fall faster than light ones',
    ],
    correctAnswer: 2,
    explanation:
      'Things don’t change motion on their own. They need a net (unbalanced) force. That’s why your van keeps going if you take your foot off the brake but the road’s wet.',
  },
  {
    id: 4,
    question: 'Newton’s second law tells you…',
    options: [
      'Force equals mass times acceleration (F = m × a)',
      'Mass equals force times acceleration',
      'Acceleration equals mass times force',
      'Force equals mass divided by gravity',
    ],
    correctAnswer: 0,
    explanation:
      'F = m × a. The bigger the mass, the more force you need to accelerate it. The bigger the force, the more it accelerates.',
  },
  {
    id: 5,
    question:
      'You push a 10 kg cable drum with a force of 30 N (no friction). What’s its acceleration?',
    options: ['0.33 m/s²', '3 m/s²', '30 m/s²', '300 m/s²'],
    correctAnswer: 1,
    explanation: 'Rearrange F = m × a → a = F ÷ m = 30 ÷ 10 = 3 m/s².',
  },
  {
    id: 6,
    question: 'Newton’s third law says…',
    options: [
      'Forces always cancel out',
      'For every action there is an equal and opposite reaction',
      'Heavier things have more inertia',
      'Force and mass are the same',
    ],
    correctAnswer: 1,
    explanation:
      'When you push a wall, the wall pushes back on you with the same force. It’s why your drill kicks back, why a recoiling cable hurts, and why nail guns punch.',
  },
  {
    id: 7,
    question: 'Forces on an object are balanced. What can you say?',
    options: [
      'It must be at rest',
      'It must be moving',
      'It is either at rest or moving at constant velocity in a straight line',
      'It is accelerating',
    ],
    correctAnswer: 2,
    explanation:
      'Net force = 0 means no change in motion — that includes already-moving things. A van at 30 mph on a flat motorway with cruise control on has balanced forces too.',
  },
  {
    id: 8,
    question: 'Why does a 5 kg drill kick back when you pull the trigger hard?',
    options: [
      'Newton’s first law — the drill resists starting',
      'Newton’s second law — the bit accelerates and a force is felt',
      'Newton’s third law — the drill pushes the bit one way and the bit pushes the drill the other',
      'Friction in the chuck',
    ],
    correctAnswer: 2,
    explanation:
      'The motor pushes the bit one way; the bit (and the wood) pushes the drill body the other. Equal and opposite. Hold it properly or it twists out of your hand.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Are Newton’s laws actually useful on site, or just exam content?',
    answer:
      'Both. They’re the reason ladders need to be footed (gravity wants to swing the base out — first law and reaction forces explain why). They’re why a drill kicks back when it bites (third law). They’re why a falling spanner from height does a lot more damage than one dropped at waist height (it accelerates the whole way down — second law). You won’t quote them on the tools, but you use them every day.',
  },
  {
    question: 'What’s the difference between speed, velocity and acceleration?',
    answer:
      'Speed = how fast (m/s). Velocity = speed AND direction (a vector). Acceleration = how quickly the velocity is changing (m/s²). Slowing down counts as acceleration too — it’s just negative. The Level 2 exam asks about all three, so don’t get casual with the words.',
  },
  {
    question: 'Are weight and mass forces?',
    answer:
      'Weight is a force — it’s the force gravity puts on a mass, measured in newtons. Mass is NOT a force — it’s an amount of matter, measured in kilograms. The link is W = m × g, which is just Newton’s second law applied to gravity (a = g).',
  },
  {
    question: 'What does "net force" or "resultant force" mean?',
    answer:
      'It’s the single force you’d be left with if you added all the forces on an object together (taking direction into account). If two people push a drum from opposite sides with equal force, the net force is zero. Add a third pushing one way and the net force isn’t zero anymore — and the drum starts moving.',
  },
  {
    question: 'Why does a ladder feel safe on rough concrete and dodgy on smooth tile?',
    answer:
      'Friction. The base of the ladder pushes the floor; the floor pushes back. On rough concrete the friction force is high, so the base stays put. On polished tile or wet floor, friction drops, the base slides out, and the ladder swings down. Same Newton’s laws either way — different reaction forces.',
  },
  {
    question: 'How is force linked to electrical work later in the syllabus?',
    answer:
      'Magnetism. A current-carrying wire in a magnetic field experiences a force — that’s the force a motor uses to turn its shaft. The whole motor effect (Section 5 of this module) is just Newton’s laws happening at the wire-and-flux level.',
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 2"
            title="Force and Newton’s basics"
            description="A force is a push or a pull. Newton’s three laws describe how forces and motion are linked — the rules behind every lift, every drill kick-back and every motor on every tool you’ll ever use."
            tone="emerald"
          />

          <TLDR
            points={[
              'Force = a push or a pull. Unit: newton (N). 1 N = the force needed to push 1 kg at 1 m/s².',
              'Newton’s three laws: things don’t change motion without a net force; F = m × a; every push has an equal-and-opposite push back.',
              'Balanced forces = no change in motion. Unbalanced forces = something accelerates.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define force and give its SI unit (newton).',
              'State and explain Newton’s three laws of motion in plain English.',
              'Apply F = m × a to simple problems.',
              'Distinguish balanced from unbalanced forces.',
              'Recognise where the laws show up on site — drills, ladders, lifts and motors.',
              'Use vectors to think about forces with direction (resultant force).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What a force actually is</ContentEyebrow>

          <ConceptBlock
            title="Force = push or pull"
            plainEnglish="Anything that can change how something is moving (or its shape) is a force."
            onSite="Pushing a drum across a floor, lifting a board, tightening a gland nut, an RCD slamming a contact open — all forces. Some you do, some happen to you."
          >
            <p>A force is any push or pull. It can:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>start something moving (push a stationary trolley)</li>
              <li>stop something moving (catch a falling spanner — please don’t)</li>
              <li>speed it up or slow it down</li>
              <li>change its direction</li>
              <li>change its shape (squash, stretch, bend, twist)</li>
            </ul>
            <p>
              Force is measured in <strong>newtons (N)</strong>, named after Sir Isaac Newton. 1 N
              is roughly the weight of a small apple sitting in your palm.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BIPM SI Brochure (9th edition, 2019) — derived units"
            clause="The newton (N) is the SI derived unit of force, defined as 1 N = 1 kg·m/s². It is the force which gives a mass of one kilogram an acceleration of one metre per second squared in the direction of the force."
            meaning={
              <>
                The definition itself is Newton’s second law (F = m × a). The newton isn’t one of
                the seven base SI units — it’s built out of kilograms, metres and seconds. Same for
                the joule (energy) and the watt (power), which you’ll meet in the next few subs.
              </>
            }
            cite="Source: BIPM SI Brochure, 9th edition; National Physical Laboratory (NPL) UK"
          />

          <SectionRule />

          <ContentEyebrow>Newton’s first law</ContentEyebrow>

          <ConceptBlock
            title="Things keep doing what they’re doing — unless a force acts"
            plainEnglish="At rest stays at rest. Moving stays moving (in a straight line, at constant speed). Until a net force gets involved."
            onSite="Park your van on a slope without the handbrake — gravity is now a net force, and the van starts rolling. Same law, just costly."
          >
            <p>
              Newton’s first law (sometimes called the law of inertia) says: an object will stay at
              rest, or carry on moving at a constant velocity in a straight line, unless an
              unbalanced force acts on it.
            </p>
            <p>
              "Inertia" is just the tendency of stuff to keep doing what it’s doing. The bigger the
              mass, the more inertia, and the harder it is to start, stop or steer. A 25 kg cable
              drum needs a real shove to get rolling. Once it’s rolling on a smooth floor, it wants
              to keep rolling — and you need another shove to stop it.
            </p>
          </ConceptBlock>

          <ForceVectorDiagram
            eyebrow="Forces on a body — balanced or not?"
            caption="Add the arrows up taking direction into account. If they cancel, the object’s motion doesn’t change (Newton’s first law). If they don’t, F = m × a kicks in (Newton’s second law)."
          />

          <SectionRule />

          <ContentEyebrow>Newton’s second law</ContentEyebrow>

          <ConceptBlock
            title="The one formula you’ll actually use: F = m × a"
            plainEnglish="A force on a mass causes acceleration. Bigger force → bigger acceleration. Bigger mass → smaller acceleration for the same force."
            onSite="Why a small drill struggles in a hard-to-spin masonry bit and a big SDS rips through it: more force at the chuck → more angular acceleration → faster bite."
          >
            <p>The second law is the headline:</p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              F = m × a
            </p>
            <p>
              Where <strong>F</strong> is the net force in newtons, <strong>m</strong> is the mass
              in kilograms, and <strong>a</strong> is the acceleration in m/s². Rearrange it to find
              any of the three:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>a = F ÷ m</strong> — find acceleration from force and mass
              </li>
              <li>
                <strong>m = F ÷ a</strong> — find mass from force and acceleration
              </li>
            </ul>
            <p>
              Worked example. You push a 10 kg cable drum with 50 N of force across a smooth floor
              (no friction). a = F ÷ m = 50 ÷ 10 = 5 m/s². Add friction at 20 N pushing back, and
              the net force drops to 30 N → a = 3 m/s². Friction matters.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Newton — Philosophiæ Naturalis Principia Mathematica (1687), Law II"
            clause="The alteration of motion is ever proportional to the motive force impressed; and is made in the direction of the right line in which that force is impressed."
            meaning={
              <>
                In modern English: the rate of change of momentum is equal to the net force. For a
                fixed mass, that simplifies to <strong>F = m × a</strong>. Same law, three centuries
                of restating it. The exam wants the modern form.
              </>
            }
            cite="Reference: Newton’s Principia (1687), Definitions and Axioms or Laws of Motion"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Newton’s third law</ContentEyebrow>

          <ConceptBlock
            title="Every action has an equal and opposite reaction"
            plainEnglish="If A pushes on B, then B pushes back on A with the same force, in the opposite direction. Always."
            onSite="The reason your drill kicks back, the reason a hammer rebounds when you hit a nail, the reason a recoiling cable end can split lip. Every push you give, the world pushes back."
          >
            <p>
              Newton’s third law: when one object exerts a force on another, the second object
              exerts an equal and opposite force on the first. Forces always come in pairs.
            </p>
            <p>
              Stand on the floor. You push down on it with your weight (say, 750 N). The floor
              pushes back up on you with exactly 750 N. If it didn’t, you’d fall through it. That
              upward push from the floor is called the <strong>normal force</strong> and it’s
              always at right angles to the surface.
            </p>
            <p>
              Same with a wall plug holding a consumer unit. Gravity pulls the unit down at, say,
              200 N. The plug pulls back up at 200 N. Forces balanced → first law → unit stays
              still. Plug pulls out → reaction force vanishes → unit accelerates downward at g →
              floor.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Where Newton’s laws show up on site"
            plainEnglish="The three laws aren’t physics for the sake of it — every tool you use leans on at least one of them. Spot which law and you suddenly understand why the kit behaves the way it does."
            onSite="Once you’ve named the law behind a tool, you stop being surprised by it. ‘Surprise’ is what hurts on site."
          >
            <p>
              Six everyday electrical-trade moments, each tied to one of Newton’s laws:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Drill kick-back (3rd law).</strong> The motor twists the bit one way; the
                bit twists the drill body the other. Side handle exists because of this.
              </li>
              <li>
                <strong>Ladder slip when friction fails (1st &amp; 3rd law).</strong> While the foot
                stays put, friction at the floor is the reaction force balancing the horizontal push
                from the ladder. Lose the friction (wet tile, dust, polished floor) and the
                horizontal forces are no longer balanced — the base accelerates outward, the top
                accelerates downward.
              </li>
              <li>
                <strong>Pulling a stuck cable in conduit (1st law).</strong> You pull, friction in
                the bend pulls back, nothing moves — forces balanced, no acceleration. The moment
                friction loses, the cable pops out fast and your full pull goes into accelerating
                it (and you).
              </li>
              <li>
                <strong>The wedging force in a knockout punch (2nd law).</strong> Squeeze the
                hydraulic handle and the punch accelerates a small mass of steel through the
                enclosure wall. F = m × a — small mass, big acceleration, big force at the cutting
                edge. That’s how a hand tool punches 20 mm holes in a steel CU.
              </li>
              <li>
                <strong>The recoil from a Hilti DX shot tool (3rd law).</strong> The cartridge fires
                a fastener forward; the tool body kicks back into your shoulder/grip with equal and
                opposite force. Hold it firmly against the work surface or the recoil eats the
                accuracy of the shot.
              </li>
              <li>
                <strong>Cable-pulling tension and the ‘pop’ at the end of a run (2nd law).</strong>
                {' '}While the cable’s sliding, friction equals your pull and net force is roughly
                zero — steady speed, 1st law. Stop pulling and friction stops the cable almost
                instantly (small deceleration, small distance). When the cable suddenly frees up,
                friction drops and your unchanged pull becomes a net force that accelerates the
                whole drum — that’s the lurch you feel through the rope.
              </li>
            </ul>
            <p>
              You won’t quote a law to your gaffer, but knowing which one is in play is the
              difference between a tool surprising you and you knowing what it’s about to do next.
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

          <ContentEyebrow>Adding forces — vectors</ContentEyebrow>

          <ConceptBlock
            title="Force has size AND direction — that makes it a vector"
            plainEnglish="To add forces, you don’t just add the numbers. You take direction into account too. Two 100 N forces pushing the same way add to 200 N. The same two pushing opposite ways cancel to zero."
          >
            <p>
              A force isn’t just a number — it has a direction too. We call quantities like that{' '}
              <strong>vectors</strong>. Mass and time, by contrast, are just numbers (scalars).
            </p>
            <p>
              When several forces act on an object, you find the <strong>resultant</strong> (or
              net) force by adding them up vectorially:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Same direction:</strong> add the numbers (two people pushing a drum the
                same way at 80 N each → 160 N).
              </li>
              <li>
                <strong>Opposite directions:</strong> subtract (one person pushing 80 N forward,
                another pulling 50 N back → 30 N forward).
              </li>
              <li>
                <strong>At an angle:</strong> use a parallelogram or right-angle triangle method
                (you’ll see this properly in Level 3 — for Level 2, stick to the in-line cases).
              </li>
            </ul>
            <p>
              If the resultant works out as zero, the object is in <strong>equilibrium</strong> —
              first law applies, and it stays at rest or carries on at constant velocity.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Confusing mass with force in F = m × a"
            whatHappens={
              <>
                The exam gives you a 50 kg motor and asks for the force needed to accelerate it at
                2 m/s². You write F = 50 × 2 = 100 kg. Wrong unit. The answer is 100{' '}
                <strong>newtons</strong>, not kilograms. Simple slip, full mark gone.
              </>
            }
            doInstead={
              <>
                Always write the formula, plug numbers in with their units, and finish with the
                correct unit on your final answer. Force is in N, mass in kg, acceleration in m/s².
                If your answer comes out with a weird unit, you’ve made a mistake somewhere.
              </>
            }
          />

          <Scenario
            title="The 18V drill that twists out of your hand"
            situation={
              <>
                You’re drilling a hole through a stud for a cable run. The bit catches on a metal
                noggin you didn’t spot. The drill twists hard in your grip and almost rotates around
                the bit.
              </>
            }
            whatToDo={
              <>
                Always use the side handle on big drills. Plant your stance — feet shoulder-width,
                bracing your weight against the kick. Modern drills with anti-kickback sensors will
                cut motor power as soon as they detect the body rotating; don’t disable that
                feature just because it’s annoying.
              </>
            }
            whyItMatters={
              <>
                Newton’s third law. The motor is putting torque (a turning force) on the bit one
                way; the bit is putting equal-and-opposite torque on the drill body the other way.
                As long as the bit can spin freely, you only feel a small reaction. The moment it
                jams, the only thing left to rotate is the drill body — and your wrist is what
                stops it.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Friction — the always-there force</ContentEyebrow>

          <ConceptBlock
            title="Friction opposes motion, every time"
            onSite="The reason you can stand on a floor without sliding. Also the reason a bit gets hot, drills go blunt and conduit gets warm in a tight bend."
          >
            <p>
              Wherever two surfaces are in contact, friction acts between them — and it always
              opposes relative motion. If you push a drum forward, friction acts backward. If the
              drum tries to slide left, friction pushes right. Always against you.
            </p>
            <p>
              On exam papers and in basic problems, you’ll often see the line "ignore friction" —
              that lets you use F = m × a cleanly. In real life you can’t ignore it. It’s why
              ladders need rough feet, why pulling cable through a tight bend needs lube, and why
              motor bearings get hot if they’re dry.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Force = a push or a pull. Unit: newton (N). Forces have direction (vectors).',
              'First law: at rest stays at rest, moving stays moving — until a net force changes it (inertia).',
              'Second law: F = m × a. The one formula you’ll actually use on a calc question.',
              'Third law: every action has an equal and opposite reaction. Why drills kick back and walls don’t collapse.',
              'Add forces vectorially. Balanced forces = no change in motion. Unbalanced = acceleration.',
              'Friction is always there in real life and always opposes relative motion. Ignored only when an exam tells you to.',
            ]}
          />

          {/* ── Quiz ────────────────────────────────────────────── */}

          <Quiz title="Force and Newton’s laws knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Mass vs weight
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Levers, gears and pulleys
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
