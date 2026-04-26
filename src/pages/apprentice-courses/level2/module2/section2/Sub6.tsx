/**
 * Module 2 · Section 2 · Sub 6 — Efficiency and inter-relationships (AC 3.3 / 3.4)
 * City & Guilds 2365-02 → Unit 202 → LO3 → AC 3.3 and 3.4.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { EfficiencyCalculator } from '@/components/apprentice-courses/EfficiencyCalculator';
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
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Efficiency, inter-relationships and calculations | Level 2 Module 2.2.6 | Elec-Mate';
const DESCRIPTION =
  'Efficiency = useful out ÷ total in (×100 for %). Petrol engine ~25%. Electric motor ~90%. LED ~30%. Tying together force, work, energy, power and efficiency in one set of worked examples.';

/* ── Inline check questions ──────────────────────────────────────── */

const checks = [
  {
    id: 'efficiency-formula-check',
    question:
      'A motor draws 1000 W of electrical power and delivers 850 W of mechanical power at the shaft. What is its efficiency?',
    options: ['8.5%', '15%', '85%', '117%'],
    correctIndex: 2,
    explanation:
      'Efficiency = useful out ÷ total in × 100% = 850 ÷ 1000 × 100 = 85%. The other 150 W comes out as heat in the motor windings and friction in the bearings.',
  },
  {
    id: 'energy-in-out-check',
    question:
      'A pulley hoist lifts a 100 kg load 2 m. You put 2400 J of work into the rope. What is the efficiency (g = 9.81)?',
    options: ['About 60%', 'About 82%', 'About 95%', 'About 122%'],
    correctIndex: 1,
    explanation:
      'Useful work out = mgh = 100 × 9.81 × 2 ≈ 1962 J. Efficiency = 1962 ÷ 2400 × 100 ≈ 82%. The missing 18% went into friction in the pulleys and rope stretching.',
  },
  {
    id: 'power-from-energy-check',
    question:
      'A pump lifts 600 litres of water (600 kg) from a basement up 8 m to ground level in 2 minutes (120 s). Find the useful mechanical power delivered (g = 9.81).',
    options: ['About 49 W', 'About 196 W', 'About 392 W', 'About 4 kW'],
    correctIndex: 2,
    explanation:
      'Work = mgh = 600 × 9.81 × 8 = 47,088 J. Power = 47,088 ÷ 120 ≈ 392 W. That’s the USEFUL output — the actual electrical input to the pump will be more, divided by its efficiency.',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'How is efficiency calculated?',
    options: [
      'Efficiency = total energy in ÷ useful energy out',
      'Efficiency = useful energy out ÷ total energy in (× 100 for percentage)',
      'Efficiency = power × time',
      'Efficiency = force × distance',
    ],
    correctAnswer: 1,
    explanation:
      'η = (useful out ÷ total in) × 100%. The Greek letter eta (η) is sometimes used as the symbol for efficiency. It’s always less than 100% in the real world.',
  },
  {
    id: 2,
    question: 'Why can no real machine ever be 100% efficient?',
    options: [
      'Because the laws of physics forbid energy out from equalling energy in',
      'Because some energy always converts into "less useful" forms like heat, sound and friction',
      'Because manufacturers cap efficiency for safety',
      'Because energy decays with time',
    ],
    correctAnswer: 1,
    explanation:
      'Energy is conserved (it’s not created or destroyed) — but in real systems some always ends up as heat, sound or other low-grade forms that you can’t use for the intended job.',
  },
  {
    id: 3,
    question:
      'A 2 kW heater is used in a small bedroom and converts essentially all of its electrical input into heat. What is its efficiency?',
    options: ['~25%', '~50%', '~85%', '~100%'],
    correctAnswer: 3,
    explanation:
      'Heating elements are essentially 100% efficient — every joule of electrical input becomes heat (sound and light from the indicator are negligible). That’s why electric heating is hard to beat for raw efficiency.',
  },
  {
    id: 4,
    question: 'A motor draws 500 W and outputs 425 W of mechanical power. What is its efficiency?',
    options: ['85%', '15%', '925%', '50%'],
    correctAnswer: 0,
    explanation: 'η = (425 ÷ 500) × 100 = 85%. The other 75 W comes out as heat in the motor.',
  },
  {
    id: 5,
    question:
      'You lift a 50 kg load 4 m using a hoist that consumes 2500 J of electrical energy. What is the efficiency (g = 9.81)?',
    options: ['About 78%', 'About 65%', 'About 51%', 'About 39%'],
    correctAnswer: 0,
    explanation: 'Useful work = mgh = 50 × 9.81 × 4 = 1962 J. η = 1962 ÷ 2500 × 100 ≈ 78%.',
  },
  {
    id: 6,
    question: 'Roughly, what is the efficiency of a typical petrol car engine?',
    options: ['About 10%', 'About 25%', 'About 60%', 'About 95%'],
    correctAnswer: 1,
    explanation:
      'Petrol engines are around 20-30% efficient — most of the chemical energy in the fuel comes out as heat in the exhaust and the cooling system. Diesel does a bit better (~35%). Electric motors blow them away at 85-95%.',
  },
  {
    id: 7,
    question:
      'An old filament bulb is rated 60 W and converts about 5% of its input to light. What does the rest become?',
    options: ['Sound', 'Heat', 'Magnetic field', 'It’s lost — energy isn’t conserved here'],
    correctAnswer: 1,
    explanation:
      'About 95% becomes heat. That’s why old bulbs got so hot. LEDs, by contrast, push something like 30-40% of their input into useful light, the rest into a much smaller amount of heat.',
  },
  {
    id: 8,
    question:
      'A motor delivers 80% efficiency. To get 800 W of mechanical output, how much electrical input does it need?',
    options: ['640 W', '800 W', '880 W', '1000 W'],
    correctAnswer: 3,
    explanation:
      'Input = output ÷ efficiency = 800 ÷ 0.80 = 1000 W. That’s why oversizing motors slightly helps — you need headroom in the electrical supply for the losses.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why is an electric motor so much more efficient than a petrol engine?',
    answer:
      'Petrol engines burn fuel and try to capture the heat as expansion against a piston. Most of the heat just blows out the exhaust or radiates from the cooling system — only about 20-30% becomes useful work. Electric motors convert electromagnetic force directly into rotation; the only losses are friction, windage and copper heating. That’s why a typical induction motor sits at 85-95% efficiency.',
  },
  {
    question: 'Where does the "wasted" energy actually go?',
    answer:
      'Mostly heat (in motor windings, gearbox bearings, friction surfaces). Some becomes sound (a noisy motor is one converting electrical into acoustic energy you can’t use). A tiny bit goes into vibration. Conservation of energy still holds — total in = total out — it’s just the OUTPUT split that changes from "useful" to "wasted".',
  },
  {
    question: 'How does efficiency tie together everything else in this section?',
    answer:
      'It’s the bookkeeper for all the other formulas. Energy in = useful work out + losses. Power in = useful power out + power lost to heat. Force, work and energy on the input side; useful work, useful power and useful energy on the output side. Efficiency is the ratio. That’s the whole interplay between mechanics quantities.',
  },
  {
    question: 'Are LEDs really that much more efficient than old bulbs?',
    answer:
      'Yes. A 60 W incandescent puts out ~800 lumens (about 13 lm/W). A 9 W LED puts out the same 800 lumens (about 90 lm/W). Roughly 7× the lumens-per-watt. Less heat in your light fittings, less heat to remove with air-con, less load on the consumer unit. That’s why every domestic spec has switched.',
  },
  {
    question: 'What’s the symbol for efficiency in formulas?',
    answer:
      'The Greek letter eta — η. So you might see η = P_out ÷ P_in × 100%. Don’t panic at the symbol; it’s just shorthand for efficiency. In Level 2 you can write the word out in full.',
  },
  {
    question: 'Why does efficiency drop when a motor is overloaded?',
    answer:
      'Heavier loads slow the motor and push more current through the windings. More current means more I²R heating in the copper — losses rise sharply. The mechanical output goes up too, but the losses go up faster, so the efficiency dips. Run a motor close to its rated point and efficiency stays high.',
  },
];

export default function Sub6() {
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
            eyebrow="Module 2 · Section 2 · Subsection 6"
            title="Efficiency, inter-relationships and calculations"
            description="Efficiency = useful out ÷ total in. The bookkeeper that ties together force, work, energy and power. No real machine ever hits 100% — and the gap is the heat your kit dumps into the room."
            tone="emerald"
          />

          <TLDR
            points={[
              'Efficiency = useful energy (or power) out ÷ total energy (or power) in. Multiply by 100 for a percentage.',
              'Always less than 100% in the real world — the missing bit goes into heat, sound and friction.',
              'Petrol engines ≈ 25%. Electric motors ≈ 85-95%. LED ≈ 30-40%. Heating elements ≈ 100%.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define efficiency and write it as a percentage.',
              'Calculate efficiency from energy or power values.',
              'Show how force, work, energy, power and efficiency tie together in a single problem.',
              'Compare typical efficiencies of common kit (motors, engines, lamps, heaters).',
              'Use the conservation of energy idea to account for "lost" energy as heat or sound.',
              'Solve multi-step problems mixing the formulas from earlier subsections.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What efficiency really is</ContentEyebrow>

          <ConceptBlock
            title="Useful out ÷ total in"
            plainEnglish="What fraction of the energy you put in actually does the job you wanted? That’s efficiency. Everything else got converted into something less useful."
            onSite="A 1000 W vacuum cleaner doesn’t put 1000 W into sucking air. Maybe 300 W becomes useful airflow — the rest is noise (a lot of it), heat in the motor and vibration. Efficiency ~30%."
          >
            <p>The formula:</p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              Efficiency (η) = Useful energy out ÷ Total energy in
            </p>
            <p>
              Or, equivalently, with power:
            </p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              Efficiency = Useful power out ÷ Total power in
            </p>
            <p>
              Multiply by 100 to get a percentage. Efficiency is always between 0 and 1 (or 0 and
              100%). If your answer comes out greater than 100%, you’ve put the numbers in upside
              down.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IEC 60034-30-1:2014 — Rotating electrical machines, Part 30-1: Efficiency classes (IE codes)"
            clause="The standard defines four efficiency classes for line-operated AC motors: IE1 (Standard), IE2 (High), IE3 (Premium) and IE4 (Super Premium). For a 4-pole, 7.5 kW, 50 Hz motor, the minimum efficiency at full load is approximately 88.7% for IE2, 90.4% for IE3 and 91.7% for IE4."
            meaning={
              <>
                There’s a real-world reason to care about efficiency: legislation. Since 2017,
                EU/UK regulations require IE3 (or IE2 with a variable-speed drive) as the minimum
                for most industrial motors above 0.75 kW. Higher efficiency = less heat dumped in
                the plant room = lower running cost = less load on the supply. Electricians specifying
                replacements need to know which class their kit falls into.
              </>
            }
            cite="Source: IEC 60034-30-1:2014; UK SI 2010/2617 (as amended)"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Try the calculator yourself</ContentEyebrow>

          <ConceptBlock
            title="Inline efficiency calculator"
            plainEnglish="Punch in the numbers and see the maths play out. Useful for sense-checking exam answers and sizing motor circuits in real life."
          >
            <p>
              Use the calculator below to either find efficiency from input and output power, or
              find the output power if you know the input and the efficiency. The same maths works
              for energy (J) or power (W) — just be consistent with units.
            </p>
          </ConceptBlock>

          <EfficiencyCalculator />

          <SectionRule />

          <ContentEyebrow>Where the energy actually goes</ContentEyebrow>

          <ConceptBlock
            title="Typical efficiencies you’ll meet"
            onSite="A 7 kW domestic EV charger is roughly 95% efficient end-to-end. The 5% loss (350 W) shows up as heat in the unit and the cabling — which is why EV chargers can warm up noticeably during a long charge."
          >
            <p>Rough figures for the kit you’ll work with:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heating elements (kettle, immersion, heater):</strong> ~100%. Almost
                everything in becomes heat out. Hard to beat.
              </li>
              <li>
                <strong>Modern induction motor (IE3+):</strong> 85-95%. Big motors and big loads do
                better than small motors and light loads.
              </li>
              <li>
                <strong>Transformer:</strong> 95-99%. Excellent — almost all of the input becomes
                output, losses only in the windings and core.
              </li>
              <li>
                <strong>EV charger / power supply:</strong> 90-95%. Very good for modern
                switch-mode kit.
              </li>
              <li>
                <strong>LED lamp:</strong> ~30-40%. Best lamp technology yet, but most of the
                electricity still becomes heat — just much less than incandescent (~5%) or
                halogen (~10%).
              </li>
              <li>
                <strong>Petrol car engine:</strong> ~20-30%. Diesel ~30-35%. Most of the fuel’s
                energy goes out the exhaust as hot gas.
              </li>
              <li>
                <strong>Solar PV panel:</strong> ~18-22%. Limited by physics — more than half of
                sunlight is the wrong wavelength to be absorbed.
              </li>
            </ul>
            <p>
              Knowing these figures lets you sense-check exam answers and lift-plan calcs. If your
              efficiency for a motor comes out as 30% you’ve probably divided the wrong way round.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Tying it all together — multi-step worked examples</ContentEyebrow>

          <ConceptBlock
            title="Example 1 — Lifting a load with a hoist"
            plainEnglish="The kind of problem you’ll see in the exam: a load, a height, a motor power and a time. Solve in steps, label every unit."
          >
            <p>
              <strong>The question.</strong> A hoist lifts a 150 kg piece of switchgear up 6 m onto
              a mezzanine in 30 seconds. The motor draws 600 W of electrical input. Find: (a) the
              work done against gravity, (b) the useful mechanical power output, and (c) the
              hoist’s efficiency. Use g = 9.81 m/s².
            </p>
            <p>
              <strong>(a) Work done against gravity.</strong>
            </p>
            <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              W = m × g × h = 150 × 9.81 × 6 = 8829 J
            </p>
            <p>
              <strong>(b) Useful mechanical power output.</strong>
            </p>
            <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              P = W ÷ t = 8829 ÷ 30 ≈ 294 W
            </p>
            <p>
              <strong>(c) Efficiency.</strong>
            </p>
            <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              η = (Useful out ÷ Total in) × 100% = (294 ÷ 600) × 100% ≈ 49%
            </p>
            <p>
              That’s low — typical of a small hoist with friction in chain links and gearboxes. A
              bigger industrial hoist with planetary gearing and roller chain would push 70-80%.
              The 306 W of "lost" power becomes heat in the motor and the chain mechanism.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Example 2 — Sizing a motor from a job"
            plainEnglish="Sometimes you’re given the job and asked what motor to specify. Run the same maths backwards."
          >
            <p>
              <strong>The question.</strong> A pump must lift 1200 litres of water (1200 kg) from a
              basement, 5 m vertical, in 60 seconds. The pump is 70% efficient. What minimum
              electrical input power must the supply provide? Use g = 9.81 m/s².
            </p>
            <p>
              <strong>Useful work needed.</strong>
            </p>
            <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              W = m × g × h = 1200 × 9.81 × 5 = 58,860 J
            </p>
            <p>
              <strong>Useful power needed.</strong>
            </p>
            <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              P_useful = W ÷ t = 58,860 ÷ 60 ≈ 981 W
            </p>
            <p>
              <strong>Electrical input needed (account for efficiency).</strong>
            </p>
            <p className="font-mono text-[14px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              P_in = P_useful ÷ efficiency = 981 ÷ 0.70 ≈ 1402 W ≈ 1.4 kW
            </p>
            <p>
              So a 1.5 kW motor would just about cover it (the headroom helps with starting and
              friction at start-up). At 230 V single-phase, that’s a current of roughly 1500 ÷ 230
              ≈ 6.5 A — plenty for a 16 A radial circuit. Spec sheet sorted.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The big inter-relationships</ContentEyebrow>

          <ConceptBlock
            title="One picture of how it all hangs together"
            plainEnglish="Force does work over a distance. Work transfers energy. Energy delivered per second is power. The fraction that ends up useful is efficiency."
          >
            <p>The chain through this section:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Force (N)</strong> — a push or a pull. F = m × a, or W = m × g for weight.
              </li>
              <li>
                <strong>Work (J)</strong> — Force × distance moved in the direction of the force.
                W = F × d.
              </li>
              <li>
                <strong>Energy (J)</strong> — same units as work; the capacity to do work. Forms
                include KE = ½mv² and PE = mgh.
              </li>
              <li>
                <strong>Power (W)</strong> — work or energy per unit time. P = W ÷ t. 1 W = 1 J/s.
              </li>
              <li>
                <strong>Efficiency (%)</strong> — useful power out ÷ total power in. The fraction
                that does the job you wanted.
              </li>
            </ul>
            <p>
              Most Level 2 mechanics problems are just two or three of these stitched together.
              Spot which one the question gives you, work out which one it’s asking for, and chain
              the formulas. Show the working. Carry units through.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Getting the efficiency ratio upside down"
            whatHappens={
              <>
                The exam gives you 1000 W in and 850 W out. You write η = 1000 ÷ 850 = 117% and
                tick it confidently. The examiner knows real efficiency can never be over 100%, so
                it’s an obvious clue you’ve flipped the ratio.
              </>
            }
            doInstead={
              <>
                Always: <strong>useful out on top, total in on the bottom.</strong> The result must
                end up between 0 and 100%. If it’s over 100%, swap the numerator and denominator
                and try again.
              </>
            }
          />

          <Scenario
            title="The pump that keeps tripping the breaker"
            situation={
              <>
                A small workshop has a basement sump pump that has started tripping its 6 A MCB
                whenever it kicks in. The pump is rated 1.1 kW at 230 V (around 4.8 A in steady
                state). It used to run fine on this circuit.
              </>
            }
            whatToDo={
              <>
                Two checks. (1) Inrush current — induction motors draw 5-7× their running current
                at start-up, briefly. A 6 A MCB on a Type B characteristic might be tripping on
                start. Swap to a Type C of the same rating, or a 10 A B if circuit conductors
                allow. (2) Efficiency loss — if the pump bearings or impeller are knackered,
                efficiency drops, current rises and the motor runs hotter. Ammeter on the supply
                while it runs steady tells you straight away.
              </>
            }
            whyItMatters={
              <>
                Efficiency isn’t just an exam concept. A motor losing efficiency draws more current
                for the same useful work, runs hotter, dumps more heat into the plant room, and
                eventually fails. Spotting it early — by knowing roughly what current the pump
                should draw at full load — saves a callout in winter when the basement floods.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Efficiency = useful out ÷ total in (×100 for %). Always < 100% in real machines.',
              'The lost energy becomes heat, sound, vibration — same total, just no longer useful.',
              'Typical efficiencies: heating element ~100%, transformer ~98%, motor 85-95%, LED ~35%, petrol engine ~25%.',
              'Multi-step problems chain together F = ma, W = Fd, KE = ½mv², PE = mgh, P = W ÷ t and efficiency. Show the working, carry the units.',
              'Force does work, work transfers energy, energy per second is power, useful power ÷ total power is efficiency. Five quantities, one chain.',
              'Knowing real-world efficiency figures lets you sense-check exam answers and pick sensibly-sized motors and tools on site.',
            ]}
          />

          {/* ── Quiz ────────────────────────────────────────────── */}

          <Quiz title="Efficiency and inter-relationships knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Mechanical power
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 3 · Resistance, voltage and current
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
