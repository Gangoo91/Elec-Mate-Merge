/**
 * Module 2 · Section 2 · Sub 5 — Mechanical power (AC 3.3)
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
import useSEO from '@/hooks/useSEO';

const TITLE = 'Mechanical power | Level 2 Module 2.2.5 | Elec-Mate';
const DESCRIPTION =
  'Power is how quickly work gets done. P = W ÷ t. Same job in less time = more power. Mechanical or electrical, it’s the same unit — the watt.';

/* ── Inline check questions ──────────────────────────────────────── */

const checks = [
  {
    id: 'power-formula-check',
    question: 'You do 600 J of work in 10 seconds. What power did you produce?',
    options: [
      '60 W',
      '6000 W',
      '6 W',
      '600 W',
    ],
    correctIndex: 0,
    explanation: 'P = W ÷ t = 600 ÷ 10 = 60 W. Power is work per unit time. Unit: watt (W).',
  },
  {
    id: 'power-vs-energy-check',
    question:
      'Two electricians both lift a 30 m drum of T+E (~25 kg) up to a 5 m platform. Sam takes 30 seconds. Pat takes 60 seconds. Who did more WORK, and who produced more POWER?',
    options: [
      'Same work; Sam produced more power',
      'Sam did more work; Pat produced more power',
      'Same work; Pat produced more power',
      'Pat did more work; Sam produced more power',
    ],
    correctIndex: 0,
    explanation:
      'Same load, same height = same work (mgh ≈ 1226 J). Sam did it in half the time, so produced double the power. Power is the time half of the equation.',
  },
  {
    id: 'mech-vs-electrical-check',
    question:
      'A motor is rated 500 W mechanical output. What does that mean in plain terms?',
    options: [
      'It does 500 J of mechanical work every second',
      'Warning of presence of more than one supply',
      'As Low As Reasonably Practicable',
      'Orders placed but not yet invoiced',
    ],
    correctIndex: 0,
    explanation:
      '1 W = 1 J/s. A 500 W motor delivers 500 J of useful mechanical work per second at the shaft. The electrical input will be more than 500 W (because no motor is 100% efficient — see next sub).',
  },
];

/* ── End-of-page Quiz ────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What is power?',
    options: [
      'Allow capacitive discharge before touching conductors',
      'The rate at which work is done (or energy is transferred)',
      'Cables must run within prescribed safe zones to avoid accidental damage',
      'The tongue withdraws from the switch head, breaking the safety circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Power = work ÷ time. It’s how fast the work happens. Bigger power = same job done in less time, OR a bigger job done in the same time.',
  },
  {
    id: 2,
    question: 'What is the SI unit of power?',
    options: [
      'Newton (N)',
      'Joule (J)',
      'Watt (W)',
      'Newton-metre (N·m)',
    ],
    correctAnswer: 2,
    explanation:
      'Watt (W). 1 W = 1 J/s — one joule of work done per second. Named after James Watt, the steam-engine engineer.',
  },
  {
    id: 3,
    question: 'Which formula gives mechanical power?',
    options: [
      'P = F × t',
      'P = W × t',
      'P = m × g',
      'P = W ÷ t',
    ],
    correctAnswer: 3,
    explanation: 'P = work done ÷ time taken. Watts = joules per second.',
  },
  {
    id: 4,
    question: 'Lifting a 20 kg load 2 m in 4 seconds requires roughly what power (g = 9.81)?',
    options: [
      '98 W',
      '49 W',
      '10 W',
      '392 W',
    ],
    correctAnswer: 0,
    explanation:
      'Work = mgh = 20 × 9.81 × 2 = 392.4 J. Power = work ÷ time = 392.4 ÷ 4 ≈ 98 W. Same job in 2 seconds would need 196 W.',
  },
  {
    id: 5,
    question: 'How is mechanical power related to electrical power?',
    options: [
      'They’re different — mechanical uses watts, electrical uses joules',
      'Both are measured in watts; 1 W = 1 J/s in both cases',
      'They can’t be compared',
      'Electrical is always 10× bigger than mechanical',
    ],
    correctAnswer: 1,
    explanation:
      'Same SI unit, same definition. That’s why a 1 kW motor draws roughly 1 kW of electrical power (a bit more, because it’s not 100% efficient — but the units are exactly the same).',
  },
  {
    id: 6,
    question: 'Why might you choose a higher-power tool for a job?',
    options: [
      'The battery is ageing and has lost capacity',
      'Making meaningful progress in small steps',
      'To do the job faster — same energy, less time',
      'Test armour and internal CPC separately',
    ],
    correctAnswer: 2,
    explanation:
      'A higher-power tool gets the same work done in less time. The total energy needed for the job is roughly the same — power just controls how fast you can do it.',
  },
  {
    id: 7,
    question:
      'A motor delivers 750 J of mechanical work in 5 seconds. What is its mechanical power output?',
    options: [
      '75 W',
      '3750 W',
      '375 W',
      '150 W',
    ],
    correctAnswer: 3,
    explanation: 'P = W ÷ t = 750 ÷ 5 = 150 W. Quick check: 150 J/s × 5 s = 750 J. Tallies up.',
  },
  {
    id: 8,
    question: 'A horsepower is roughly equal to…',
    options: [
      '750 W',
      '75,000 W',
      '10 W',
      '100 W',
    ],
    correctAnswer: 0,
    explanation:
      '1 horsepower ≈ 746 W (rounded to 750 W in the trade). It’s an old imperial unit — stick to watts in any UK exam, but it’s useful for estimating motor sizes from US spec sheets.',
  },
];

/* ── FAQs ────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why does power matter on site?',
    answer:
      'Sizing kit. A 600 W jigsaw will eventually do the same cut a 1200 W jigsaw will do — but it’ll take twice as long and run hotter. Battery sizing is the same: a 18V 5Ah battery has the same total energy as another 18V 5Ah battery, but a higher current rating means more peak power. Knowing P = W ÷ t lets you make sensible choices.',
  },
  {
    question: 'What’s the link between watts and amps?',
    answer:
      'For DC and resistive AC loads, P = V × I (volts times amps). For an electric drill on 230 V drawing 4 A, that’s roughly 920 W of input power. The mechanical output at the chuck will be less — the difference is the motor’s losses. You’ll properly meet P = V × I in Section 3 of this module.',
  },
  {
    question: 'Why is the watt named after James Watt?',
    answer:
      'James Watt was the Scottish engineer who massively improved the steam engine in the 1760s. He was the first to systematically measure the rate at which engines did work — comparing them to teams of horses (hence "horsepower"). The SI unit was named after him in 1960. He’d have approved.',
  },
  {
    question: 'Is "kilowatt-hour" (kWh) a unit of power or energy?',
    answer:
      'Energy. The little trap on every Level 2 paper. A kWh is a power (1 kW) sustained for a time (1 hour) — multiply them together and you get energy. 1 kWh = 1000 J/s × 3600 s = 3,600,000 J = 3.6 MJ. Your electricity bill is in kWh because the joule is too small a unit for household amounts.',
  },
  {
    question: 'Can power be negative?',
    answer:
      'In a sense — yes, when work is being done ON a system rather than BY it. A motor running normally produces positive mechanical power. The same motor acting as a generator (e.g. when an EV regenerates braking energy) does work on the electrical side and absorbs mechanical work on the shaft. Same sign convention principle, just flipped.',
  },
  {
    question: 'How does power link to efficiency in the next sub?',
    answer:
      'Efficiency compares useful POWER out to total POWER in. A 1500 W kettle puts almost all of that into heating water (efficiency ~98%). A 1500 W petrol engine wastes about 3/4 of the input as heat (efficiency ~25%). Same input power, very different useful output. Sub6 covers the maths.',
  },
];

export default function Sub5() {
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
            eyebrow="Module 2 · Section 2 · Subsection 5"
            title="Mechanical power"
            description="Power is the rate at which work is done. Same lift in half the time = double the power. Same SI unit (the watt) for mechanical and electrical — that’s the bridge between this module’s mechanics and its electrics."
            tone="emerald"
          />

          <TLDR
            points={[
              'Power = work done ÷ time taken. Unit: watt (W). 1 W = 1 J/s.',
              'Same job in less time = more power. Same time, more work = more power.',
              'Same unit (W) covers both mechanical AND electrical power. That’s why a 1 kW motor and a 1 kW kettle compare directly.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define power as the rate of doing work and give its SI unit (watt).',
              'Apply P = W ÷ t to calculate mechanical power.',
              'Distinguish between work, energy and power — and use the correct unit for each.',
              'Convert between kilowatts, watts and horsepower for sense-checks.',
              'Recognise that mechanical and electrical power share the same unit and the same fundamental meaning.',
              'Relate power to time pressure on real on-site jobs.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Power — work over time</ContentEyebrow>

          <ConceptBlock
            title="Power = how fast you’re doing the work"
            plainEnglish="Two people lift the same load up the same ladder. The faster one is producing more power, even though both did the same work."
            onSite="A 1500 W kettle boils a litre of water in roughly 3.5–4 minutes. A 750 W travel kettle boils the same litre in roughly 7–8 minutes. Same total energy in (about 335 kJ to heat the water), half the power — twice the time."
          >
            <p>The formula is simple:</p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              P = W ÷ t
            </p>
            <p>
              Where P is power in <strong>watts (W)</strong>, W is work done in joules, and t is
              time in seconds. 1 watt = 1 joule per second. A 100 W lamp transfers 100 J of
              electrical energy to light and heat every single second. Most of it heat, in an
              old-school filament lamp.
            </p>
            <p>
              Rearranged versions for problems where you have power and want work or time:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>W = P × t</strong> — total work done over a time period.
              </li>
              <li>
                <strong>t = W ÷ P</strong> — how long a job will take at a given power.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BIPM SI Brochure (9th edition, 2019) — derived units"
            clause="The watt (W) is the SI derived unit of power, defined as one joule per second. 1 W = 1 J/s = 1 kg·m²/s³. The watt is also used for the rate of transfer of any form of energy, including electrical and electromagnetic."
            meaning={
              <>
                Same definition for mechanical power, electrical power, light power, heat power.
                That’s why your kettle, drill, immersion heater and PV inverter are all rated in
                watts (or kilowatts) — they all transfer energy at a rate, and the rate is in J/s.
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

          <ContentEyebrow>Same job, less time, more power</ContentEyebrow>

          <ConceptBlock
            title="Power is the time-pressure version of work"
            plainEnglish="If two people both lift the same load up the same ladder, they’ve done the same amount of work — but the faster one produced more power."
            onSite="Pulling a 30 m drum of T+E up a ladder to a first-fix consumer position. Drum mass ≈ 25 kg. Lift height ≈ 5 m. Work = 25 × 9.81 × 5 ≈ 1226 J. If you do it in 30 s, P = 1226 ÷ 30 ≈ 41 W. Do it in 15 s and your power output doubles to 82 W. Knackering — but quicker."
          >
            <p>
              That’s the "fitness vs time" trade-off in physics terms. A power output of around 100
              W is sustainable for a healthy adult for hours (roughly the work of a steady cycle
              ride). Bursts up to 500 W are achievable for short periods. A horse, by contrast,
              can sustain about 750 W — which is where the unit "horsepower" came from.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Worked example — sizing a hoist"
            plainEnglish="If you know the load (and so the work) and the time you’ve got, you can work out the minimum power needed."
          >
            <p>
              A small chain hoist needs to lift a 200 kg distribution board up a 4 m service
              riser, in no more than 30 seconds. What power is needed?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Work to lift = mgh = 200 × 9.81 × 4 = 7848 J.</li>
              <li>Time available = 30 s.</li>
              <li>
                Minimum power = W ÷ t = 7848 ÷ 30 ≈ <strong>262 W</strong>.
              </li>
            </ul>
            <p>
              In practice you’d size the motor 30-50% above that to allow for friction and
              acceleration losses. So you’d look for a hoist rated around 350-400 W. The same lift
              in 60 seconds would only need ≈ 130 W — half the power for double the time. Same
              total work either way.
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

          <ContentEyebrow>The bridge to electrical power</ContentEyebrow>

          <ConceptBlock
            title="A watt is a watt — mechanical or electrical"
            plainEnglish="The reason a motor’s electrical input and mechanical output use the same unit is they’re the same kind of thing. Energy per second."
            onSite="A drill labelled ‘500 W’ usually means electrical input power. The shaft output (mechanical power) will be less — maybe 350-400 W after motor losses. The difference comes out as heat in the windings (which is why a hard-working drill gets hot)."
          >
            <p>
              Electrical power for DC and resistive AC loads:
            </p>
            <p className="font-mono text-[15px] text-elec-yellow bg-white/[0.04] border border-white/[0.06] rounded-lg px-4 py-2.5">
              P = V × I
            </p>
            <p>
              Where V is voltage in volts and I is current in amps. The result is in watts —
              exactly the same watts as P = W ÷ t in mechanics. That’s the bridge that lets us say
              "a 1 kW motor on 230 V draws roughly 4.3 A".
            </p>
            <p>
              You’ll meet P = V × I properly in the next section of this module. The point here:{' '}
              <strong>the watt is universal.</strong> A 1 kW kettle, a 1 kW motor, a 1 kW PV panel
              and a 1 kW heater all transfer energy at the same rate (1000 J every second), even
              though the form of the energy is different.
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

          <ContentEyebrow>Watts, kilowatts, megawatts and horsepower</ContentEyebrow>

          <ConceptBlock
            title="The prefixes you’ll meet"
            plainEnglish="Don’t get bitten by a 1000× error. A kilowatt is a thousand watts. A megawatt is a million."
          >
            <p>The everyday range:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Milliwatt (mW):</strong> a thousandth of a watt. Tiny — sensors, indicator
                LEDs.
              </li>
              <li>
                <strong>Watt (W):</strong> the SI base for power. Hand torch (≈3 W), phone charger
                (≈5-20 W), laptop (≈60-100 W).
              </li>
              <li>
                <strong>Kilowatt (kW):</strong> 1000 W. Domestic appliances — kettles (2-3 kW),
                immersions (3 kW), showers (8-10.5 kW), EV chargers (7-22 kW).
              </li>
              <li>
                <strong>Megawatt (MW):</strong> 1,000,000 W. Substations, wind turbines, big
                generators.
              </li>
              <li>
                <strong>Horsepower (hp):</strong> not SI. 1 hp ≈ 746 W (round to 750 W on site).
                Mostly seen on petrol/diesel kit and US spec sheets.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Mixing up units in P = W ÷ t calculations"
            whatHappens={
              <>
                The exam gives you 1.5 kJ of work done in 30 seconds. You write P = 1.5 ÷ 30 = 0.05
                W. Wrong by a factor of 1000 — 1.5 kJ = 1500 J, so P = 1500 ÷ 30 = 50 W.
              </>
            }
            doInstead={
              <>
                Always convert kJ to J (×1000) and minutes to seconds (×60) BEFORE plugging into
                the formula. SI units in, SI units out. If your answer comes out 1000× too big or
                too small for the situation, you’ve almost certainly slipped on a prefix.
              </>
            }
          />

          <Scenario
            title="600 W jigsaw or 1200 W jigsaw — the deadline before the next trade"
            situation={
              <>
                You’re cutting access notches in a fit-out floor for cable pulls. Total cut length:
                roughly 24 m of 18 mm chipboard. The next trade is in to lay screed at 14:00, so
                you’ve got 4 hours of working time. The van has a 600 W jigsaw and a 1200 W jigsaw —
                same blade, same operator. Which do you grab?
              </>
            }
            whatToDo={
              <>
                Power × time arithmetic. The 600 W tool delivers roughly half the joules per second
                of useful cutting work that the 1200 W tool does, so on the same material the cut
                rate is roughly half. Bench measurement on chipboard with a clean blade puts the
                600 W jigsaw at about 4 m/h of cut rate; the 1200 W tool sits at about 8 m/h. So:
                24 m ÷ 4 m/h = <strong>6 h</strong> with the 600 W (overrun by 2 hours, screed
                team waiting). 24 m ÷ 8 m/h = <strong>3 h</strong> with the 1200 W (done with an
                hour to spare). Take the 1200 W. Factor in cord vs battery too — a corded 1200 W
                won’t flatten a battery mid-cut, where a cordless equivalent might need a swap or
                drop power as the cell sags.
              </>
            }
            whyItMatters={
              <>
                Tool sizing is power × time arithmetic, full stop. Same total work in the cut
                (joules) regardless of which tool — but the rate at which you can deliver those
                joules is what decides whether you’re done before the screed team arrives or
                blocking their job. Pick the right power for the deadline AND the right energy
                source (corded vs battery capacity in Wh) for the runtime. Same equation, two
                different practical decisions.
              </>
            }
          />

          <Scenario
            title="The drill that keeps cutting out"
            situation={
              <>
                You’re drilling 14 mm holes through a brick wall for an SDS bolt. The 18V combi
                drill keeps stalling and the chuck warms up after a couple of holes. Your supervisor
                hands you a corded 1500 W SDS instead.
              </>
            }
            whatToDo={
              <>
                Use the SDS for the masonry. The combi was working at the edge of its power
                envelope — the motor couldn’t deliver the rate of work the bit needed, so it
                stalled and what energy did get in turned into heat instead of useful work. The
                bigger SDS does the same total work per hole faster, with current to spare.
              </>
            }
            whyItMatters={
              <>
                Tool selection is a power problem. You’re asking the kit to deliver enough joules
                per second to overcome friction in the masonry plus the work of breaking it up.
                Under-rated kit takes longer, runs hot, fails early, and sometimes won’t finish the
                job at all. Right tool, right power rating, every time.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Power = work done ÷ time taken. P = W ÷ t. Unit: watt (W).',
              '1 W = 1 J/s. Same SI unit for mechanical, electrical, light and heat power.',
              'Same job in less time = more power needed. Bigger tools and motors are about delivering more joules per second.',
              'Common prefixes: mW (10⁻³), W, kW (10³), MW (10⁶). 1 hp ≈ 746 W (non-SI but still on spec sheets).',
              'Don’t confuse kWh (energy) with kW (power). Power × time = energy.',
              'Power is the bridge from this section into electrical theory: P = V × I gives watts too, and the same definition applies on both sides.',
            ]}
          />

          <p className="text-[13.5px] text-white/85 leading-relaxed border-l-2 border-cyan-400/40 pl-4 italic">
            <span className="not-italic font-semibold text-cyan-300 mr-1.5">You’ll see this again in:</span>
            Sub4.5 (electrical power — exactly the same P = W ÷ t and the watt as a unit, just with
            P = V × I as the way to get there). The mechanical-vs-electrical distinction is the
            input, not the maths.
          </p>

          {/* ── Quiz ────────────────────────────────────────────── */}

          <Quiz title="Mechanical power knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Work and energy
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section2/2-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Efficiency and inter-relationships
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
