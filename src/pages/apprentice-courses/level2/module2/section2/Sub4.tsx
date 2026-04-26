/**
 * Module 2 · Section 2 · Sub 4 — Work and energy (AC 3.3)
 * City & Guilds 2365-02 → Unit 202 → LO3 → AC 3.3.
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
import { EnergyTransfer } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Work and energy — kinetic and potential | Level 2 Module 2.2.4 | Elec-Mate';
const DESCRIPTION =
  'Work is force × distance. Energy is the ability to do work. Two flavours dominate basic mechanics: KE (motion) and PE (height). Learn the formulas and you can predict why a falling tool from a high ceiling is genuinely dangerous.';

/* ── Inline check questions ──────────────────────────────────────── */

const checks = [
  {
    id: 'work-formula-check',
    question: 'You push a 50 N load 4 m across a flat floor. How much work have you done?',
    options: ['12.5 J', '54 J', '200 J', '200 N'],
    correctIndex: 2,
    explanation:
      'Work = Force × distance = 50 × 4 = 200 J. Work is measured in joules (J), not in newtons. If your answer comes out in N, you’ve mixed units up.',
  },
  {
    id: 'pe-formula-check',
    question:
      'You lift a 20 kg consumer unit 2 m up onto a wall. How much PE has it gained (g = 9.81)?',
    options: ['40 J', '196.2 J', '392.4 J', '981 J'],
    correctIndex: 2,
    explanation:
      'PE = m × g × h = 20 × 9.81 × 2 = 392.4 J. That’s also exactly the work you did against gravity to get it up there.',
  },
  {
    id: 'ke-pe-conversion-check',
    question:
      'A 1 kg spanner sits on a 3 m scaffold. You drop it. How fast is it travelling when it hits the ground (ignoring air resistance, g = 9.81)?',
    options: ['About 3 m/s', 'About 7.7 m/s', 'About 9.8 m/s', 'About 30 m/s'],
    correctIndex: 1,
    explanation:
      'PE → KE. mgh = ½mv². v = √(2gh) = √(2 × 9.81 × 3) = √58.86 ≈ 7.67 m/s. That’s why dropped tools at height are so dangerous — they hit hard.',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What is "work" in mechanics?',
    options: [
      'Anything you do at your job',
      'Force × distance moved in the direction of the force',
      'How tired you feel after lifting',
      'The mass of the object you’re lifting',
    ],
    correctAnswer: 1,
    explanation:
      'Work = force × distance moved in the direction of the force. Unit: joule (J). 1 J = 1 N moved through 1 m.',
  },
  {
    id: 2,
    question: 'What is the SI unit of energy?',
    options: ['Newton (N)', 'Watt (W)', 'Joule (J)', 'Kilogram (kg)'],
    correctAnswer: 2,
    explanation:
      'Joule (J). Work and energy use the same unit because they’re really the same thing — energy is the capacity to do work.',
  },
  {
    id: 3,
    question: 'Which formula gives kinetic energy?',
    options: ['KE = m × g × h', 'KE = ½ × m × v²', 'KE = F × d', 'KE = m × v'],
    correctAnswer: 1,
    explanation:
      'KE = ½ × m × v². Note the v is squared — double the speed and you quadruple the kinetic energy. That’s why a fast falling object hits SO much harder than a slow one.',
  },
  {
    id: 4,
    question: 'Which formula gives gravitational potential energy?',
    options: ['PE = ½ × m × v²', 'PE = m × g × h', 'PE = F × d × t', 'PE = m × a'],
    correctAnswer: 1,
    explanation:
      'PE = m × g × h. Mass times gravity times height above your reference level. Lift something up and you’re storing energy in the gravitational field.',
  },
  {
    id: 5,
    question:
      'You lift a 10 kg load 3 m. How much work have you done against gravity (g = 9.81)?',
    options: ['30 J', '98.1 J', '147 J', '294.3 J'],
    correctAnswer: 3,
    explanation:
      'Work = F × d = mg × h = 10 × 9.81 × 3 = 294.3 J. That’s also the gain in PE. Same number, two ways to think about it.',
  },
  {
    id: 6,
    question: 'What does the "law of conservation of energy" say?',
    options: [
      'Energy can be created if you have a big enough motor',
      'Energy can be destroyed but not created',
      'Energy cannot be created or destroyed — only transferred or converted from one form to another',
      'Energy gets used up over time',
    ],
    correctAnswer: 2,
    explanation:
      'You don’t use energy up — you change it from one form into another. KE into heat (brakes), chemical into KE (you eating then climbing a ladder), electrical into light (LED). Total energy stays the same.',
  },
  {
    id: 7,
    question: 'A 2 kg object moves at 4 m/s. What is its kinetic energy?',
    options: ['4 J', '8 J', '16 J', '32 J'],
    correctAnswer: 2,
    explanation: 'KE = ½ × 2 × 4² = ½ × 2 × 16 = 16 J. Don’t forget to square the velocity FIRST.',
  },
  {
    id: 8,
    question:
      'A 0.5 kg drill is dropped from 4 m. Just before it hits the floor, what is its KE (ignoring air resistance, g = 9.81)?',
    options: ['About 2 J', 'About 9.8 J', 'About 19.6 J', 'About 39.2 J'],
    correctAnswer: 2,
    explanation:
      'PE at top = mgh = 0.5 × 9.81 × 4 = 19.62 J. All of it converts to KE at the bottom. KE just before impact ≈ 19.6 J.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'What does "work" really mean in physics terms?',
    answer:
      'Work is force times distance moved IN the direction of the force. Pushing a heavy crate that doesn’t move = no work done (in the physics sense), even if you’re sweating buckets. Lifting a 10 kg unit 1 m = 98 J of work. Pushing the same unit 1 m sideways across a floor = whatever the friction force was, times 1 m.',
  },
  {
    question: 'Why is it ½ m v² and not just m v²?',
    answer:
      'Comes from the maths of accelerating from rest. The average speed during acceleration is half the final speed (assuming constant acceleration), so the work done averages out to half mv². Don’t worry about the derivation for Level 2 — just remember the ½ is there.',
  },
  {
    question: 'What counts as "height" for PE?',
    answer:
      'Always measured from a reference level — usually the floor, or wherever the object will end up. Lifting a 5 kg unit from the floor up onto a 1.2 m bench: h = 1.2 m, PE gain = 5 × 9.81 × 1.2 ≈ 59 J. Lifting the same unit from the bench up to a 2 m wall fixing: h = 0.8 m (the extra above the bench), PE gain ≈ 39 J.',
  },
  {
    question:
      'A spanner falls off scaffold and hits the floor. Where does the energy go after impact?',
    answer:
      'Mostly into heat, sound and a little bit of permanent deformation (a chip out of the floor, or a dent in the spanner). The KE just before impact got "spent" on bending atoms, vibrating air molecules and warming things up. Conservation of energy: total in = total out, just in a less useful form afterwards.',
  },
  {
    question: 'How does this apply to the electrical work I’ll be doing?',
    answer:
      'The same energy unit (joule) carries through to electrical theory. 1 watt = 1 joule per second. The 100 J you used lifting a 10 kg cable is exactly the same kind of joule that flows through your meter when you draw 100 W for one second. Mechanical and electrical energy are interchangeable — that’s why motors and generators work.',
  },
  {
    question: 'Why do dropped tools at height cause so much damage?',
    answer:
      'KE = ½mv² and v depends on √(2gh). Drop a 0.5 kg spanner from 1 m and it hits at about 4.4 m/s with about 5 J. Drop the same spanner from 10 m and it hits at about 14 m/s with about 49 J — ten times the energy in the same spanner. That’s why working at height needs lanyards, exclusion zones below, and "no loose tools at the edge" rules.',
  },
];

export default function Sub4() {
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
            eyebrow="Module 2 · Section 2 · Subsection 4"
            title="Work and energy — kinetic and potential"
            description="Work = force × distance. Energy = the capacity to do work. The two flavours that dominate basic mechanics are KE (motion) and PE (height) — and they convert into each other every time something falls."
            tone="emerald"
          />

          <TLDR
            points={[
              'Work = Force × distance (in the direction of the force). Unit: joule (J).',
              'Energy is the ability to do work. Same unit (J). Comes in many forms — KE, PE, heat, electrical, chemical.',
              'KE = ½mv² (the energy of motion). PE = mgh (the energy stored by being up high).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define mechanical work and give its SI unit (joule).',
              'Calculate work done from W = F × d.',
              'Define kinetic and gravitational potential energy and apply the formulas.',
              'Explain the conservation of energy principle in plain English.',
              'Trace energy as it converts between PE, KE, heat and other forms.',
              'Use these ideas to assess real on-site risks (dropped tools, lifted loads).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Work — what physics actually means</ContentEyebrow>

          <ConceptBlock
            title="Work = force × distance moved"
            plainEnglish="If a force makes something move, you’ve done work. No movement = no work, however tired you feel."
            onSite="Pushing a 25 kg drum across a 5 m corridor (with friction force of, say, 50 N) means you’ve done 50 × 5 = 250 J of work against friction. That energy goes into heat in the floor and the drum bearings."
          >
            <p>The formula:</p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              W = F × d
            </p>
            <p>
              Where W is work in <strong>joules (J)</strong>, F is force in newtons, and d is the
              distance moved in metres. 1 J of work is what you do when you push 1 N through 1 m.
              That’s a small unit — lifting a litre of milk (about 10 N) by 1 m takes 10 J.
            </p>
            <p>
              Important catch: the distance has to be in the direction of the force. Holding a 20 kg
              consumer unit dead still in your arms = no work, in the physics sense, even though
              your muscles are screaming. Walk 5 m carrying it horizontally = still no work against
              gravity (gravity is vertical, your motion is horizontal).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BIPM SI Brochure (9th edition, 2019) — derived units"
            clause="The joule (J) is the SI derived unit of energy and work, defined as the work done when a force of one newton is applied to an object that moves one metre in the direction of the force. 1 J = 1 N·m = 1 kg·m²/s²."
            meaning={
              <>
                Same unit for energy and work. That’s not a coincidence — energy <em>is</em> the
                capacity to do work, and the only way to transfer energy mechanically is to do
                work. Don’t mix the joule up with the newton-metre when used for torque (same units
                algebraically, but a different physical meaning).
              </>
            }
            cite="Source: BIPM SI Brochure, 9th edition; National Physical Laboratory (NPL) UK"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Energy — the ability to do work</ContentEyebrow>

          <ConceptBlock
            title="Energy comes in many forms — but always the same units"
            plainEnglish="Anything that can do work has energy. Energy in your battery, in a cable drum lifted up high, in a spinning fan, in a hot kettle. All measured in joules."
          >
            <p>
              Energy is the ability of a system to do work. Same unit as work — the joule. The forms
              you’ll meet most:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Kinetic energy (KE):</strong> energy of motion. Moving things have it.
              </li>
              <li>
                <strong>Gravitational potential energy (PE):</strong> energy of being up high.
                Anything raised against gravity has stored PE.
              </li>
              <li>
                <strong>Elastic potential energy:</strong> stretched springs, bent metal, taut
                cables.
              </li>
              <li>
                <strong>Chemical energy:</strong> stored in food, fuel, batteries.
              </li>
              <li>
                <strong>Electrical energy:</strong> in flowing charge, in a charged capacitor.
              </li>
              <li>
                <strong>Thermal (heat) energy:</strong> the random motion of atoms in a hot
                substance.
              </li>
              <li>
                <strong>Light, sound, nuclear:</strong> all energy too. All in joules.
              </li>
            </ul>
            <p>
              Energy can be converted from one form to another, but the total amount in a closed
              system stays the same. That’s the <strong>law of conservation of energy</strong> —
              the most important rule in physics.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Kinetic energy — the energy of motion</ContentEyebrow>

          <ConceptBlock
            title="KE = ½ × m × v²"
            plainEnglish="Heavier or faster moving things carry more energy. Speed counts double — twice the speed = four times the energy."
            onSite="A 0.5 kg spanner falling at 14 m/s (from 10 m) hits with about 49 J — enough to crack a tile, dent a hard hat, and put someone in A&E if it lands on a head. The same spanner walking around your tool belt at 1 m/s carries 0.25 J — basically nothing."
          >
            <p>The formula:</p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              KE = ½ × m × v²
            </p>
            <p>
              KE in joules, mass in kilograms, velocity in m/s. The velocity is{' '}
              <strong>squared</strong> — that’s the killer detail. Double the speed and you don’t
              double the KE, you quadruple it. Triple the speed and KE goes up nine times.
            </p>
            <p>
              Worked example: a 2 kg cable drum rolls across the floor at 3 m/s. KE = ½ × 2 × 3² =
              ½ × 2 × 9 = 9 J. To stop it, something has to absorb 9 J — usually friction at the
              brakes or the wall it crashes into.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Potential energy — the energy of height</ContentEyebrow>

          <ConceptBlock
            title="PE = m × g × h"
            plainEnglish="Lift something up against gravity, and you’ve stored energy in it. Drop it again, and that energy comes back out as motion."
            onSite="Lifting a 20 kg consumer unit 2 m onto a wall = 20 × 9.81 × 2 = 392 J of PE stored. The unit is now ‘holding’ that energy. If the bracket fails and it falls, all 392 J turn into KE — and then into a wrecked floor and a wrecked unit."
          >
            <p>The formula:</p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              PE = m × g × h
            </p>
            <p>
              PE in joules, mass in kg, g = 9.81 m/s² (Earth), h in metres. Note: h is the height
              above your <strong>reference level</strong> — usually the ground or the floor.
            </p>
            <p>
              Lifting anything against gravity stores PE equal to the work you did against gravity.
              That’s why W = mgh keeps showing up — it’s the same calculation whether you call it
              "work done against gravity" or "PE gained".
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

          <ContentEyebrow>The conversion — PE ↔ KE</ContentEyebrow>

          <ConceptBlock
            title="When something falls, PE turns into KE — and vice versa"
            plainEnglish="At the top: all PE, no KE. At the bottom: no PE, all KE. Total stays the same (ignoring friction and air resistance)."
          >
            <p>
              A 1 kg spanner sits on a 3 m scaffold deck. It has PE = 1 × 9.81 × 3 = 29.43 J and no
              KE (it’s not moving). Knock it off. As it falls:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Halfway down (1.5 m): PE = 14.7 J, KE = 14.7 J — half each.</li>
              <li>Just before impact (h ≈ 0): PE ≈ 0, KE ≈ 29.43 J — all kinetic.</li>
              <li>
                Velocity at impact: ½mv² = 29.43, so v = √(2 × 29.43 ÷ 1) ≈ 7.67 m/s. About the
                speed of a brisk jog — more than enough to do real damage.
              </li>
            </ul>
            <p>
              At impact, that 29.43 J of KE doesn’t vanish — it converts into heat, sound and a
              dent in whatever it hit. Energy is still conserved, just no longer in a useful form.
            </p>
          </ConceptBlock>

          <EnergyTransfer
            eyebrow="PE → KE on a slope (or in free-fall)"
            caption="At the top: max PE, zero KE. At the bottom: zero PE, max KE. Total energy constant. Same maths whether it’s a marble on a ramp or a tool off scaffold."
          />

          <ConceptBlock
            title="Dropped-tool impact table — what mgh actually means in joules"
            plainEnglish="The reg callout below says ‘PE = mgh tells you exactly why’ falling tools are dangerous. Here are the numbers behind that, for tools you carry every day."
            onSite="The impact velocity v = √(2gh) only depends on the height — every tool, regardless of mass, hits at the same speed from the same height. The MASS scales how much energy that speed carries. A 3 kg lump hammer at 12 m has ten times the KE of a 0.3 kg screwdriver at the same height — same impact speed, ten times the punch."
          >
            <p>
              Impact velocity (in air, ignoring drag): v = √(2gh) with g = 9.81 m/s². So:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 m drop</strong> → impact speed ≈ 4.4 m/s (about brisk walking pace)</li>
              <li><strong>3 m drop</strong> → impact speed ≈ 7.7 m/s (about a slow jog)</li>
              <li><strong>6 m drop</strong> → impact speed ≈ 10.9 m/s (about a sprint)</li>
              <li><strong>12 m drop</strong> → impact speed ≈ 15.3 m/s (about 34 mph)</li>
            </ul>
            <p>
              Kinetic energy at impact = mgh (all of the PE has converted). Read across by tool,
              down by drop height. Every value below is in <strong>joules</strong>.
            </p>
            {/* Mobile (<sm): card per drop height. Desktop (≥sm): same card grid — no horizontal scroll on either. */}
            <div className="space-y-3">
              {[
                {
                  height: '1 m',
                  speed: '≈ 4.4 m/s (brisk walk)',
                  highlight: false,
                  values: [
                    { tool: '0.3 kg screwdriver', joules: '2.9 J' },
                    { tool: '0.8 kg adjustable', joules: '7.8 J' },
                    { tool: '2 kg drill', joules: '19.6 J' },
                    { tool: '3 kg lump hammer', joules: '29.4 J' },
                  ],
                },
                {
                  height: '3 m',
                  speed: '≈ 7.7 m/s (slow jog)',
                  highlight: false,
                  values: [
                    { tool: '0.3 kg screwdriver', joules: '8.8 J' },
                    { tool: '0.8 kg adjustable', joules: '23.5 J' },
                    { tool: '2 kg drill', joules: '58.9 J' },
                    { tool: '3 kg lump hammer', joules: '88.3 J' },
                  ],
                },
                {
                  height: '6 m',
                  speed: '≈ 10.9 m/s (sprint)',
                  highlight: false,
                  values: [
                    { tool: '0.3 kg screwdriver', joules: '17.7 J' },
                    { tool: '0.8 kg adjustable', joules: '47.1 J' },
                    { tool: '2 kg drill', joules: '117.7 J' },
                    { tool: '3 kg lump hammer', joules: '176.6 J' },
                  ],
                },
                {
                  height: '12 m',
                  speed: '≈ 15.3 m/s (about 34 mph)',
                  highlight: true,
                  values: [
                    { tool: '0.3 kg screwdriver', joules: '35.3 J' },
                    { tool: '0.8 kg adjustable', joules: '94.2 J' },
                    { tool: '2 kg drill', joules: '235.4 J' },
                    { tool: '3 kg lump hammer', joules: '353.2 J' },
                  ],
                },
              ].map((row) => (
                <div
                  key={row.height}
                  className={`rounded-xl border p-3 sm:p-4 ${
                    row.highlight
                      ? 'border-orange-400/30 bg-orange-500/[0.06]'
                      : 'border-white/[0.08] bg-white/[0.03]'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2.5">
                    <div className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-elec-yellow/90">
                      Drop height
                    </div>
                    <div className="text-[15px] font-semibold text-white">{row.height}</div>
                    <div className="text-[12px] text-white/60">{row.speed}</div>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-[13px]">
                    {row.values.map((v) => (
                      <li
                        key={v.tool}
                        className="flex items-baseline justify-between gap-3 border-b border-white/[0.04] pb-1 last:border-b-0 sm:border-b-0 sm:pb-0"
                      >
                        <span className="text-white/80">{v.tool}</span>
                        <span
                          className={`font-semibold tabular-nums ${
                            row.highlight ? 'text-orange-300' : 'text-white/95'
                          }`}
                        >
                          {v.joules}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p>
              For scale: a typical hard hat is rated to absorb about 50 J of crown impact (BS EN
              397). Anything in the orange row at 12 m blows past that — the lid will help, but
              it isn't designed to take that hit. A 2 kg drill from the top of a four-storey
              scaffold delivers ~235 J onto a single point, regardless of how much PPE the
              labourer below is wearing. That's why "no loose tools at the edge", lanyards and
              exclusion zones are the actual control — PPE is the last line, not the first.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE INDG401 — Working at height: A brief guide (rev2)"
            clause="The Work at Height Regulations 2005 apply to all work at height where there is a risk of a fall liable to cause personal injury. Employers must take suitable and sufficient measures to prevent — so far as is reasonably practicable — any person falling a distance liable to cause personal injury, AND prevent any object falling. Where this is not practicable, measures must minimise the distance and consequences of any fall."
            meaning={
              <>
                The reg explicitly cares about <strong>falling objects</strong>, not just falling
                people. PE = mgh tells you exactly why. A tool at 6 m has six times the PE of one
                at 1 m, and converts to six times the KE on the way down. That’s why tool tethers,
                debris nets and exclusion zones below scaffolding aren’t optional extras.
              </>
            }
            cite="Verbatim wording paraphrased — see HSE INDG401 (rev2) Working at Height: A Brief Guide for the full text. Statutory basis: Work at Height Regulations 2005 (SI 2005/735)."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Conservation of energy</ContentEyebrow>

          <ConceptBlock
            title="Energy is never made or destroyed — only converted"
            plainEnglish="You don’t ‘use up’ energy. You convert it from one form into another. Useful electrical energy goes to heat (a lot of it), light, motion. The total never changes."
            onSite="A drill battery holds, say, 60 Wh of chemical energy. While drilling, that turns into KE in the bit, heat in the motor, heat in the masonry, sound, and a small amount stored as heat in the bearings. Total joules out = total joules in. ‘Wasted’ heat isn’t destroyed — it’s just energy in a form you can’t do useful work with anymore."
          >
            <p>
              The first law of thermodynamics, stripped down: energy can be converted from one form
              to another, but the total energy in a closed system stays constant.
            </p>
            <p>
              That’s why an electric kettle’s 2.4 kW input shows up as a roughly 2.4 kW heating
              effect (almost all of the electrical energy converts to heat in the element). It’s why
              a motor that draws 1 kW of electrical power produces something less than 1 kW of
              mechanical power — the rest leaks out as heat in the windings and friction in the
              bearings. Sub6 (efficiency) is the rest of this story.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Where work and energy show up on site"
            plainEnglish="W = F × d, KE = ½mv², PE = mgh and E = ½CV² aren’t exam props — they describe specific moments you’ll meet on site where the maths suddenly becomes real."
            onSite="If you can name the formula, you can predict what the kit is about to do. That’s the difference between a controlled job and a near-miss."
          >
            <p>
              Four real moments, each with the formula behind it:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lifting a CU into a loft (PE = mgh).</strong> A 6 kg metal CU lifted 2.5 m
                into a loft hatch stores about 6 × 9.81 × 2.5 ≈ 147 J of PE. Not a lot — but if your
                grip slips, every joule comes back out as KE on the way down. This is why two people
                lift a CU above shoulder height, every time.
              </li>
              <li>
                <strong>Drill battery runtime (E = P × t).</strong> An 18 V 5 Ah battery holds
                roughly 18 × 5 = 90 Wh ≈ 324 kJ of usable energy. Run a 500 W drill flat-out and you
                get about 90 ÷ 0.5 ≈ 180 minutes of theoretical runtime — but heat losses and
                voltage sag mean real runtime is much shorter. Same energy, different power, very
                different time.
              </li>
              <li>
                <strong>The energy in a charged capacitor that bites you (E = ½CV²) — preview Sub6.3.</strong>
                {' '}A 470 µF capacitor in a VFD or a switched-mode PSU charged to 400 V holds
                ½ × 470 × 10⁻⁶ × 400² ≈ 37.6 J. Held in a small body that can dump it through your
                hand in milliseconds, that’s easily a stopping-the-heart shock. Why isolation alone
                isn’t enough on a drive — you safely discharge bus capacitors before touching them.
              </li>
              <li>
                <strong>Why a fuse blows on inrush (I²t through the link).</strong> A fuse element
                fails when enough energy (I²t — current squared times time) heats and melts it. A
                heavy inrush current carries lots of joules per second; the link absorbs them
                quickly, hits melting point, parts. Same conservation-of-energy story, just resolved
                in a few milliseconds inside a glass tube.
              </li>
            </ul>
            <p>
              Each one is a moment you’ll meet — sometimes calmly (sizing a battery), sometimes
              suddenly (a dropped CU, a capacitor bite). Naming the formula is what lets you size
              the risk before it sizes you.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Adding work, KE and PE in different units"
            whatHappens={
              <>
                The exam gives you a 5 kg load, lifted 2 m, then released. You write the PE as "5 ×
                9.81 × 2 = 98.1" and tick it as the answer. Examiner asks "in what units?" — and you
                lose the mark for not writing J.
              </>
            }
            doInstead={
              <>
                Always finish with the unit. <strong>J for energy and work.</strong> If your numbers
                were kg × m/s² × m, the units multiply out to kg·m²/s² — which is exactly what 1
                joule is. Sanity check: weird units in your answer = something’s wrong.
              </>
            }
          />

          <Scenario
            title="A scaffold-deck near-miss"
            situation={
              <>
                You’re halfway up a four-level scaffold (12 m up) running cable to a high-bay light.
                The labourer below sees a 0.8 kg adjustable spanner sitting on the edge of your
                deck, behind your toolbox. He shouts up just before it tips off.
              </>
            }
            whatToDo={
              <>
                Stop. Move every loose tool away from the edge. Use lanyards or a tool tether for
                anything not in a closed bag. Tape off the area below for the rest of the job. Speak
                to your supervisor about the near-miss — it gets logged, even though no-one was
                hit.
              </>
            }
            whyItMatters={
              <>
                PE at 12 m = 0.8 × 9.81 × 12 ≈ 94 J. That converts to roughly 15 m/s impact velocity
                — about as fast as a moped at low speed, with all 94 J focused on a single hard
                point. A hard hat helps but isn’t designed to absorb impacts that big. The Work at
                Height Regs require you to prevent objects falling — not just to wear a lid in case
                they do.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Work = force × distance moved in the direction of the force. Unit: joule (J).',
              'Energy = the capacity to do work. Same unit (J). Same fundamental quantity, different perspective.',
              'KE = ½mv². The v is squared — double the speed, four times the energy. That’s why falling tools at height are a serious hazard.',
              'PE = mgh. Lifting against gravity stores energy. Drop the object, and that PE converts to KE on the way down.',
              'Conservation of energy: total energy in a closed system never changes. Forms convert into each other; the total stays the same.',
              'Work at Height Regs 2005 demand falling-object prevention precisely because PE → KE means a small tool at height = a serious projectile.',
            ]}
          />

          {/* ── Quiz ────────────────────────────────────────────── */}

          <Quiz title="Work and energy knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Levers, gears and pulleys
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Mechanical power
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
