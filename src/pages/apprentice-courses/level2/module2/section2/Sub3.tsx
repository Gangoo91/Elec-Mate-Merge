/**
 * Module 2 · Section 2 · Sub 3 — Levers, gears and pulleys (AC 3.2)
 * City & Guilds 2365-02 → Unit 202 → LO3 → AC 3.2.
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
import { LeverDiagram, PulleySystem, GearTrain } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Levers, gears and pulleys | Level 2 Module 2.2.3 | Elec-Mate';
const DESCRIPTION =
  'Simple machines that change the size and direction of forces. Side cutters, wheelbarrows, hoists, gearboxes, drills — all the same handful of mechanical principles, dressed up differently.';

/* ── Inline check questions ──────────────────────────────────────── */

const checks = [
  {
    id: 'lever-classes-check',
    question: 'A pair of pliers is which class of lever?',
    options: ['Class 1 (fulcrum in the middle)', 'Class 2 (load in the middle)', 'Class 3 (effort in the middle)', 'None — pliers aren’t a lever'],
    correctIndex: 0,
    explanation:
      'Pliers are two class 1 levers joined at the pivot. The pivot (fulcrum) is in the middle, your hand is the effort, the wire is the load. Same as a seesaw or a crowbar.',
  },
  {
    id: 'pulley-ma-check',
    question:
      'A block-and-tackle hoist has 4 rope segments supporting the load. Roughly what mechanical advantage does it give?',
    options: ['1', '2', '4', '8'],
    correctIndex: 2,
    explanation:
      'MA ≈ number of supporting rope segments. With 4 segments, the effort needed is roughly load ÷ 4 — but you have to pull 4× the rope length to lift the load 1 unit.',
  },
  {
    id: 'gear-ratio-check',
    question: 'A 12-tooth driver gear meshes with a 36-tooth driven gear. What happens?',
    options: [
      'The driven turns 3× faster with 1/3 the torque',
      'The driven turns at the same speed but with 3× the torque',
      'The driven turns 3× slower with 3× the torque',
      'Nothing — the teeth have to match exactly to engage',
    ],
    correctIndex: 2,
    explanation:
      'Ratio = driven ÷ driver = 36 ÷ 12 = 3:1. Driven turns 3× slower (you traded speed) and 3× the torque (you gained turning force). Energy in still equals energy out (minus losses).',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What is a simple machine?',
    options: [
      'A complex piece of factory kit',
      'A device that changes the size, direction or speed of a force to do useful work',
      'Anything with an electric motor',
      'A machine that has only one moving part',
    ],
    correctAnswer: 1,
    explanation:
      'Levers, pulleys, gears, wheels-and-axles, inclined planes, screws and wedges — the six (or seven, depending who you ask) "simple machines". Everything mechanical is built from them.',
  },
  {
    id: 2,
    question: 'What is mechanical advantage (MA)?',
    options: [
      'The total weight a machine can lift',
      'How fast the machine works',
      'The ratio of load to effort — how much the machine multiplies your force',
      'The efficiency of the machine',
    ],
    correctAnswer: 2,
    explanation:
      'MA = load ÷ effort. If a hoist needs 100 N of effort to lift a 400 N load, MA = 4. The machine multiplies your force four times — but you pay by moving the rope 4× as far.',
  },
  {
    id: 3,
    question:
      'In a class 1 lever (e.g. a crowbar), the fulcrum is between the effort and the load. True or false?',
    options: ['True', 'False', 'Only if the load is heavier than the effort', 'Only with metal levers'],
    correctAnswer: 0,
    explanation:
      'Class 1: fulcrum in the middle. Class 2: load in the middle. Class 3: effort in the middle. Get the order right.',
  },
  {
    id: 4,
    question: 'Which everyday object is a class 2 lever?',
    options: ['A pair of scissors', 'A wheelbarrow', 'A spoon flicking peas', 'A seesaw'],
    correctAnswer: 1,
    explanation:
      'Wheelbarrow: wheel = fulcrum, load (the soil) is in the middle, effort (your hands on the handles) is at the far end. Class 2 levers always multiply your force, MA > 1.',
  },
  {
    id: 5,
    question: 'A single fixed pulley (the wheel hangs from above and you pull down) gives…',
    options: [
      'MA of 4',
      'MA of 2',
      'MA of about 1 — it just changes the direction of the force',
      'MA of less than 1',
    ],
    correctAnswer: 2,
    explanation:
      'A single fixed pulley doesn’t multiply force — it just lets you pull down (more comfortable) instead of lifting up. To get a real MA you need a movable pulley or a block-and-tackle.',
  },
  {
    id: 6,
    question: 'In a gear train, which gear is the "driver"?',
    options: [
      'The bigger one',
      'The smaller one',
      'The one connected to the motor or input shaft',
      'The one with the most teeth',
    ],
    correctAnswer: 2,
    explanation:
      'Driver = the gear that does the driving (input). Driven = the gear that gets driven (output). Either can be bigger or smaller — depends what the gearbox is for.',
  },
  {
    id: 7,
    question: 'Why does a drill have a gearbox between the motor and the chuck?',
    options: [
      'To make the drill heavier',
      'To trade some motor speed for more torque (turning force) at the chuck',
      'To stop the motor running too cold',
      'To convert AC to DC',
    ],
    correctAnswer: 1,
    explanation:
      'Motors are happiest spinning fast with low torque. A masonry hole needs lots of torque, not lots of speed. Reduction gearing (often planetary) turns one into the other. The "1/2" speed setting on your drill is engaging extra reduction.',
  },
  {
    id: 8,
    question:
      'You can lift a 200 N load with 50 N of effort using a pulley system. What MA does it give, and how far do you have to pull the rope to lift the load 1 m?',
    options: ['MA 4, pull 4 m', 'MA 4, pull 1 m', 'MA 0.25, pull 1 m', 'MA 2, pull 2 m'],
    correctAnswer: 0,
    explanation:
      'MA = load ÷ effort = 200 ÷ 50 = 4. You traded distance for force, so you have to pull 4× the rope length. Energy in (50 N × 4 m = 200 J) = energy out (200 N × 1 m = 200 J). No magic.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why does mechanical advantage matter on site?',
    answer:
      'Anywhere you’re multiplying force to make a job possible — pliers cutting steel SWA armour, a chain hoist lifting a transformer, a gearbox letting your drill bite into masonry. Knowing MA lets you pick the right tool, size a hoist, and understand why a longer crowbar makes a stuck cover suddenly easy.',
  },
  {
    question: 'Do simple machines actually create energy?',
    answer:
      'No — and the exam loves catching people out on this. A pulley with MA 4 lets you lift a load with 1/4 the effort, but you have to pull the rope 4× as far. Force in × distance in = force out × distance out (ignoring friction). You can never get more energy out than you put in.',
  },
  {
    question: 'Why are gears so common in electric motor kit?',
    answer:
      'Motors run efficiently at high speed and low torque. Most jobs need slow, high-torque output (turning a chuck against masonry, lifting a load). Gear reduction trades speed for torque without changing the energy. That’s the whole point of a gearbox in a drill, hoist, conveyor or lift.',
  },
  {
    question: 'What’s the difference between torque and force?',
    answer:
      'Force pushes in a straight line (newtons, N). Torque is a turning force around a pivot (newton-metres, N·m). Use a longer spanner and you get more torque for the same hand force — that’s a class 1 lever in disguise. The reason "cheater bars" work, and the reason you really shouldn’t use them on a torque-spec fixing.',
  },
  {
    question: 'Are inclined planes (ramps) a simple machine too?',
    answer:
      'Yes. A ramp lets you raise a heavy load with less force than lifting it straight up — at the cost of moving it further (along the slope rather than vertically). Same trade-off as every other simple machine. Pushing a 100 kg load up a 1-in-4 slope needs about a quarter of the force of lifting it straight up.',
  },
  {
    question: 'Where does any of this come up in BS 7671?',
    answer:
      'See the “Why mechanics is in an electrical syllabus” block at the top of this Sub — it lifts this answer out of the FAQ because it’s the bridge for the whole topic, not a footnote.',
  },
];

export default function Sub3() {
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
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 3"
            title="Levers, gears and pulleys"
            description="The three simple machines you’ll meet over and over — in your tool bag, on a hoist, inside the drill. They all do the same job: trade distance for force, or speed for torque."
            tone="emerald"
          />

          <TLDR
            points={[
              'Simple machines change the size or direction of a force. They can’t create energy — they trade distance for force.',
              'Mechanical advantage (MA) = load ÷ effort. The bigger the MA, the less effort you need (but the further you have to move the input).',
              'Three classes of lever, two main pulley setups, gears that swap speed for torque (or vice versa). All built into kit you use every day.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define mechanical advantage and explain the trade-off between force and distance.',
              'Identify the three classes of lever and give an everyday example of each.',
              'Explain how single fixed, single movable and compound pulleys differ.',
              'Calculate gear ratio from tooth counts and explain the speed/torque trade-off.',
              'Recognise simple machines in everyday tools (pliers, drills, hoists, wheelbarrows).',
              'Use the principle "energy in = energy out (minus losses)" to sense-check answers.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Why mechanics is in an electrical syllabus"
            plainEnglish="BS 7671 is an electrical safety standard, but every electrical install is also a mechanical one — torqued joints, hauled cables, mounted enclosures, lifted boards. Without mechanics knowledge, the electrical install isn’t safe."
            onSite="The mechanics section of the Unit 202 paper isn’t there to pad the syllabus — it’s there because mechanical failures (loose terminals, slipped fixings, dropped loads) cause electrical incidents."
          >
            <p>
              People sometimes ask “where does any of this lever/gear/pulley stuff come up in BS
              7671?” The honest answer: nowhere directly — and everywhere through the back door.
              Three places it lands every week on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Terminal connections — BS 7671 Section 526.</strong> Particularly 526.1
                (continuity of conductors) and 526.9 (terminations to manufacturer’s torque
                settings). A torque wrench IS a lever — the worked example later in this Sub shows
                exactly how the same lever maths underpins every CU terminal you tighten.
              </li>
              <li>
                <strong>Cable hauling — pulley MA and friction.</strong> Pulling 70 mm² SWA up a
                riser, dragging T+E through a long conduit run, lifting a sub-main into a high-bay
                tray — these are pulley/winch problems, governed by the same MA = load ÷ effort
                you’re about to learn. Get the MA wrong and someone gets hurt or the cable gets
                damaged.
              </li>
              <li>
                <strong>Hoist and winch use — LOLER 1998.</strong> Any chain block, hoist or winch
                lifting electrical kit (transformers, distribution boards, motor frames) is
                regulated lifting equipment. Knowing the MA isn’t a substitute for the LOLER
                competent-person plan, but it’s the maths underneath whether the lift is feasible
                in the first place.
              </li>
            </ul>
            <p>
              That’s the bridge: BS 7671 assumes the mechanical install is sound. The mechanics in
              this Sub is what makes that assumption true. Treat it as electrical content with a
              mechanical accent, not as a tangent.
            </p>
          </ConceptBlock>

          <ContentEyebrow>The big idea</ContentEyebrow>

          <ConceptBlock
            title="Simple machines change forces — they don’t create energy"
            plainEnglish="A machine that lets you lift more makes you move further. A machine that lets you go faster needs more force at the input. There’s always a trade."
            onSite="A 600 mm pry bar pops a stuck floorbox cover that 12 inches of fingers can’t. Same human force at the handle, much bigger force at the tip. The bar didn’t add energy — it concentrated yours."
          >
            <p>
              The six classic simple machines — lever, pulley, wheel and axle, inclined plane,
              wedge and screw — all do the same thing: change the direction or magnitude of a
              force. They never create energy out of nothing. Whatever you save in effort, you pay
              back in distance.
            </p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              Mechanical Advantage (MA) = Load ÷ Effort
            </p>
            <p>
              An MA of 4 means the machine lets you lift a load 4× heavier than your effort would
              normally manage. The catch: you have to pull, push or wind the input 4× as far as the
              load actually moves.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Levers — the original force multiplier</ContentEyebrow>

          <ConceptBlock
            title="Three classes — based on what’s in the middle"
            plainEnglish="Class 1: pivot in the middle. Class 2: load in the middle. Class 3: effort in the middle. That’s the whole story."
          >
            <p>
              A lever is a rigid bar pivoting around a point called the <strong>fulcrum</strong>. An
              effort is applied at one place, a load at another. The classes differ only in the
              order of the three:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Class 1 — fulcrum in the middle:</strong> seesaw, crowbar, pliers, side
                cutters, scissors. MA depends on which side is longer. Levering up a stuck floor
                cover with a long pry bar is a class 1 with a big MA in your favour.
              </li>
              <li>
                <strong>Class 2 — load in the middle:</strong> wheelbarrow, bottle opener, nutcracker.
                MA always greater than 1 — these always multiply your force.
              </li>
              <li>
                <strong>Class 3 — effort in the middle:</strong> tweezers, your forearm holding a
                tool, a fishing rod. MA always less than 1 — you’re trading force for speed and
                range of motion. Useful when you need precision, not power.
              </li>
            </ul>
          </ConceptBlock>

          <LeverDiagram leverClass={1} eyebrow="Class 1 — fulcrum in the middle" caption="Crowbar, pliers, side cutters. The longer the effort arm, the bigger the MA." />
          <LeverDiagram leverClass={2} eyebrow="Class 2 — load in the middle" caption="Wheelbarrow, bottle opener. Always MA > 1, so always multiplies force." />
          <LeverDiagram leverClass={3} eyebrow="Class 3 — effort in the middle" caption="Tweezers, forearm with a tool. MA < 1 — trades force for speed and range." />

          <ConceptBlock
            title="The lever rule (Law of the Lever)"
            plainEnglish="Effort × effort distance = Load × load distance. Long arm short, short arm strong."
          >
            <p>
              For any lever in balance:
            </p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              Effort × distance from fulcrum = Load × distance from fulcrum
            </p>
            <p>
              That’s why a pry bar with the fulcrum near the load and a long handle gives such huge
              force at the tip. Distance times effort is conserved.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Archimedes (c. 250 BC), as recorded by Pappus of Alexandria"
            clause="Give me a place to stand on, and I will move the Earth."
            meaning={
              <>
                Archimedes was bragging about levers. With a long enough lever and a fulcrum, you
                could in principle move anything — provided you didn’t mind covering vast distance
                at the input end. <strong>Effort × effort distance = Load × load distance.</strong>{' '}
                Same rule whether you’re cutting wire or moving a planet.
              </>
            }
            cite="Reference: classical mechanics — historical principle"
          />

          <ConceptBlock
            title="Worked example — what 3.5 N·m on a CU terminal actually feels like"
            plainEnglish="A torque wrench IS a lever. The number on the dial is just force × distance from the screw — and you can build an intuition for it with a kitchen scale."
            onSite="Most apprentices know terminal torque settings exist (BS 7671 Reg 526.9, manufacturer's data). Almost none have a feel for what those numbers represent — which is how you end up with under-torqued joints that fail the warm-up test six months later."
          >
            <p>
              The manufacturer's spec on a typical 230 V consumer unit terminal calls for
              <strong> 3.5 N·m</strong>. That's a torque — a turning force — and it's the same
              lever maths from the law of the lever above:
            </p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              Torque (N·m) = Force (N) × distance from pivot (m)
            </p>
            <p>
              Here's the conversion both ways so the number stops being abstract:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1 metre bar.</strong> A 350 g weight (≈ 3.5 N — close enough; weight in
                newtons = mass in kg × 9.81) hung from the end of a 1 m bar gives 3.5 N × 1 m =
                3.5 N·m. So picture pressing on a 1 m bar with about the weight of a tin of beans
                on its end. That's the torque the manufacturer wants on a consumer unit screw.
                Doesn't feel like much — and it isn't.
              </li>
              <li>
                <strong>250 mm torque wrench (typical short bench wrench).</strong> Same torque,
                shorter arm, so more force at the handle: F = 3.5 ÷ 0.25 = 14 N. That's about
                1.4 kg of push at the handle — roughly the weight of a full kettle pulling down on
                the end of the wrench. Still not heavy.
              </li>
              <li>
                <strong>150 mm screwdriver-style torque driver.</strong> F = 3.5 ÷ 0.15 ≈ 23 N or
                about 2.3 kg of push. Now you're starting to feel it through the wrist — and that's
                the point. The screwdriver gives less mechanical advantage so you have to actively
                push harder to hit the same torque.
              </li>
            </ul>
            <p>
              Same 3.5 N·m torque, three different "feels" depending on the lever arm of the tool.
              That's also why "I gave it a good wrench-tighten" isn't a torque setting — without
              knowing the arm you're applying force at, the actual N·m on the screw could be
              anywhere from 2 N·m to 20 N·m. Buy a torque tool, set it to the manufacturer's
              number, click it. Boring, repeatable, defensible.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Pulleys — change direction or multiply force</ContentEyebrow>

          <ConceptBlock
            title="Single fixed, single movable, and block-and-tackle"
            plainEnglish="One pulley fixed above you = comfortable pulling, no force advantage. Add movable pulleys = real force multiplication."
            onSite="Pulling a 25 kg light fitting up to a high ceiling is a lot easier with a single overhead pulley — even though you’re still lifting 25 kg, you can pull down with your body weight instead of hoisting upward."
          >
            <p>The two basic types:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single fixed pulley:</strong> the wheel is bolted overhead. The rope
                changes direction (you pull down, the load goes up). MA ≈ 1 — you don’t save force,
                you just change the angle.
              </li>
              <li>
                <strong>Single movable pulley:</strong> the wheel is attached to the load itself.
                Two rope segments support the load, so the effort is roughly half. MA ≈ 2.
              </li>
              <li>
                <strong>Block and tackle (compound):</strong> a set of fixed and movable pulleys
                with rope wound back and forth. MA ≈ the number of rope segments supporting the
                load. A 4-segment system gives MA ≈ 4.
              </li>
            </ul>
            <p>
              The trade is always the same: MA × 4 means you have to pull 4× the rope length to
              lift the load 1 unit. Energy in = energy out (ignoring friction).
            </p>
          </ConceptBlock>

          <PulleySystem pulleys={1} eyebrow="Single fixed pulley" caption="Changes direction only — pull down, load goes up. MA ≈ 1." />
          <PulleySystem pulleys={2} eyebrow="Single movable pulley" caption="Load hangs from a movable wheel — two rope segments share the load. MA ≈ 2." />
          <PulleySystem pulleys={3} eyebrow="Block and tackle" caption="Compound system — multiple wheels in two blocks. MA ≈ number of supporting segments." />

          <RegsCallout
            source="LOLER 1998 — Lifting Operations and Lifting Equipment Regulations, Regulation 8(1)"
            clause="Every employer shall ensure that every lifting operation involving lifting equipment is — (a) properly planned by a competent person; (b) appropriately supervised; and (c) carried out in a safe manner."
            meaning={
              <>
                Pulleys, hoists and chain blocks are <strong>lifting equipment</strong> under
                LOLER. Picking the right MA matters, but so does planning the lift, checking the
                gear is in date, and putting an exclusion zone under the load. Knowing the MA isn’t
                a substitute for planning the lift properly.
              </>
            }
            cite="Source: LOLER 1998 (SI 1998/2307) — full text on legislation.gov.uk"
          />

          <RegsCallout
            source="LOLER 1998 — Regulation 9 (Thorough examination and inspection)"
            clause="Every employer shall ensure that lifting equipment which is exposed to conditions causing deterioration which is liable to result in dangerous situations is thoroughly examined — (a) at least every 6 months in the case of lifting equipment for lifting persons or an accessory for lifting; (b) at least every 12 months in any other case; or (c) in accordance with an examination scheme drawn up by a competent person."
            meaning={
              <>
                Every chain block, sling, eye-bolt and pulley used to lift electrical kit must be
                <strong> thoroughly examined</strong> on a fixed schedule by a competent person —
                six-monthly for accessories, twelve-monthly for the lifting machine itself. Look
                for the certificate / colour code before you trust any lifting gear on site. No
                in-date paperwork = the gear doesn't get used, however well it looks.
              </>
            }
            cite="Source: LOLER 1998 (SI 1998/2307) Regulation 9 — full text on legislation.gov.uk. Wording paraphrased."
          />

          <RegsCallout
            source="PUWER 1998 — Provision and Use of Work Equipment Regulations, Regulation 4 (Suitability of work equipment)"
            clause="Every employer shall ensure that work equipment is so constructed or adapted as to be suitable for the purpose for which it is used or provided. In selecting work equipment, every employer shall have regard to the working conditions and to the risks to the health and safety of persons which exist in the premises or undertaking in which it is to be used and any additional risk posed by the use of that work equipment."
            meaning={
              <>
                Pliers, side cutters, torque wrenches, gearboxed cordless drills — all "work
                equipment" under PUWER. The reg requires the right tool for the job, properly
                maintained, with users instructed in safe use. A worn pair of side cutters used to
                strip live SWA armour, or a broken torque wrench used on CU terminals, is a PUWER
                breach as well as a quality issue. Inspect, maintain, replace.
              </>
            }
            cite="Source: PUWER 1998 (SI 1998/2306) Regulation 4 — full text on legislation.gov.uk. Wording paraphrased."
          />

          <RegsCallout
            source="WAHR 2005 — Work at Height Regulations, Regulation 10 (Falling objects)"
            clause="Every employer shall, where necessary to prevent injury to any person, take suitable and sufficient steps to prevent, so far as is reasonably practicable, the fall of any material or object. Where it is not reasonably practicable to comply with the requirements above, every employer shall take suitable and sufficient steps to prevent any person being struck by any falling material or object which is liable to cause personal injury."
            meaning={
              <>
                When pulleys and hoists are used to lift cable, kit or tools at height — running
                70 mm² SWA up a four-storey riser, lifting a CU into a loft hatch — WAHR's
                falling-object rule applies on top of LOLER. Exclusion zone below the lift, no-one
                directly underneath, tool tethers on hand kit at the working level. Pulley
                mechanics tell you the lift is feasible; WAHR tells you who has to be clear of
                the load path while it happens.
              </>
            }
            cite="Source: WAHR 2005 (SI 2005/735) Regulation 10 — full text on legislation.gov.uk. Wording paraphrased."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Gears — speed for torque, torque for speed</ContentEyebrow>

          <ConceptBlock
            title="Gear ratio = teeth on driven ÷ teeth on driver"
            plainEnglish="Big driven, small driver = slower output, more torque (reduction). Small driven, big driver = faster output, less torque (overdrive)."
            onSite="Most cordless drills have planetary reduction gearing — that’s why a 1500 RPM motor turns the chuck at maybe 500 RPM, but with three times the torque. The “low-speed/high-torque” mode just engages more reduction."
          >
            <p>
              Two interlocking gears trade rotational speed for turning force (torque), and vice
              versa.
            </p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              Gear ratio = Teeth on driven gear ÷ Teeth on driver gear
            </p>
            <p>
              A 12-tooth driver turning a 36-tooth driven gives a ratio of 3:1 — the driven turns
              3× slower with 3× the torque. Useful for lifting, drilling masonry, anything that
              needs grunt over speed.
            </p>
            <p>
              Reverse the situation (36-tooth driver, 12-tooth driven) and you get a 1:3 ratio —
              the driven turns 3× faster but with only 1/3 the torque. Useful when you want speed,
              like a fan or a small angle grinder.
            </p>
            <p>
              Power in still equals power out (ignoring friction losses). Gears just reshape it.
            </p>
          </ConceptBlock>

          <GearTrain
            driverTeeth={12}
            drivenTeeth={36}
            eyebrow="3:1 reduction gear"
            caption="12-tooth driver → 36-tooth driven. Driven turns 3× slower with 3× the torque."
          />
          <GearTrain
            driverTeeth={24}
            drivenTeeth={12}
            eyebrow="1:2 overdrive"
            caption="24-tooth driver → 12-tooth driven. Driven turns 2× faster with half the torque."
          />

          <CommonMistake
            title="Thinking a hoist or gearbox gives you something for nothing"
            whatHappens={
              <>
                An apprentice at the back of the class works out that a 4:1 hoist lets them lift
                100 kg with 25 kg of effort and decides it’s magic. Then they try to lift the load
                2 m and wonder why they’ve pulled 8 m of rope through.
              </>
            }
            doInstead={
              <>
                Always remember the trade. <strong>Force × distance is conserved.</strong> If you
                save force, you pay distance. The total energy is the same (and a bit less in
                practice, because friction always takes a cut).
              </>
            }
          />

          <Scenario
            title="Pulling SWA up a four-storey riser"
            situation={
              <>
                You’re running a length of 70 mm² SWA up a service riser to a sub-main DB. The
                drum’s on the ground floor. Pulling that lot up by hand isn’t happening — friction
                in the riser plus the cable’s own weight is too much.
              </>
            }
            whatToDo={
              <>
                Use a snatch block at the top with a couple of movable pulleys, or set up a powered
                cable winch. The block-and-tackle gives you MA — a single person can manage what
                would otherwise need three. Make sure the gear is rated for the load (LOLER), the
                anchor point is sound, and the riser is clear of people during the lift.
              </>
            }
            whyItMatters={
              <>
                Right pulley setup turns a four-person, half-day fight into a tidy two-hour job.
                Wrong setup (or no MA at all) gets someone strained, and probably gets the cable
                dropped. A bit of mechanics knowledge here pays for itself instantly.
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

          <ContentEyebrow>Inclined planes, wedges and screws (briefly)</ContentEyebrow>

          <ConceptBlock
            title="The other simple machines — same principle"
            plainEnglish="A ramp, a chisel and a screw thread are all the same trick: a long shallow path that needs less force than a short steep one."
          >
            <p>
              Three more "simple machines" round out the family:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inclined plane (ramp):</strong> moving a 100 kg load up a 1-in-4 slope
                needs roughly a quarter of the force of lifting it straight up — but you push it
                four times further.
              </li>
              <li>
                <strong>Wedge:</strong> two inclined planes back-to-back. Used to split, pry or
                fix. Chisels, axe heads, doorstops.
              </li>
              <li>
                <strong>Screw:</strong> an inclined plane wrapped around a cylinder. A jack screw
                or a wood screw concentrates a small turning force into massive linear force —
                which is why you can compress a stack of pipework together with a couple of bolts.
              </li>
            </ul>
            <p>
              These get treated more in Level 3 mechanical units. For Level 2, just recognise them
              as members of the same family.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Simple machines change the size or direction of a force, but never create energy. Whatever you save in effort, you pay in distance.',
              'Mechanical advantage = load ÷ effort. MA > 1 means you’re multiplying force; MA < 1 means you’re trading force for speed/range.',
              'Lever classes: 1 (fulcrum middle — crowbar), 2 (load middle — wheelbarrow), 3 (effort middle — tweezers).',
              'Pulleys: a single fixed one just changes direction (MA ≈ 1). Movable + compound systems give real force multiplication; MA ≈ number of supporting rope segments.',
              'Gears swap speed for torque (and back). Ratio = teeth on driven ÷ teeth on driver. Reduction gives torque; overdrive gives speed.',
              'Lifting kit on site (chain blocks, hoists, winches) is governed by LOLER 1998 — knowing the MA is half the job; planning the lift safely is the other half.',
            ]}
          />

          {/* ── Quiz ────────────────────────────────────────────── */}

          <Quiz title="Levers, gears and pulleys knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Force and Newton’s basics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Work and energy
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
