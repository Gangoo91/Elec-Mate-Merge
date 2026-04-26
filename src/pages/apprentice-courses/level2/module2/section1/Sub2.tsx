/**
 * Module 2 · Section 1 · Sub 2 — SI base and derived units
 * Maps to City & Guilds 2365-02 / Unit 202 / LO2 / AC 2.1
 *   "identify and use internationally recognised base and derived SI units of
 *    measurement"
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
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
import { OhmsLawTriangle } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'SI base and derived units | Level 2 Module 2.1.2 | Elec-Mate';
const DESCRIPTION =
  'The seven SI base units and the derived units a working electrician relies on — metre, kilogram, second, ampere, and the volts/ohms/watts that come out of them.';

const checks = [
  {
    id: 'si-base-check',
    question: 'Which of these is an SI BASE unit?',
    options: ['Volt (V)', 'Ohm (Ω)', 'Ampere (A)', 'Watt (W)'],
    correctIndex: 2,
    explanation:
      'The ampere is one of the seven SI base units (along with metre, kilogram, second, kelvin, mole and candela). Volts, ohms and watts are DERIVED — built from base units.',
  },
  {
    id: 'si-derived-check',
    question:
      "A 'newton-metre' (N·m) is the unit of torque. Two SI base units sit underneath it. Which two?",
    options: [
      'Ampere and second',
      'Kilogram and metre (with second underneath)',
      'Volt and ohm',
      'Kelvin and candela',
    ],
    correctIndex: 1,
    explanation:
      'Newton (force) = kg·m/s². Multiply by another metre for torque (N·m). Even mechanical units used by electricians (motor torque, fixings) trace back to base units.',
  },
  {
    id: 'si-coulomb-derivation-check',
    question:
      'The coulomb (C) is the SI derived unit of electric charge. How is it built from base units?',
    options: [
      '1 C = 1 V × 1 A',
      '1 C = 1 A × 1 s (one ampere flowing for one second)',
      '1 C = 1 W × 1 s',
      '1 C is itself a base unit',
    ],
    correctIndex: 1,
    explanation:
      "1 C = 1 A·s. Charge is current multiplied by time — exactly how a battery's capacity in ampere-hours converts to coulombs (1 Ah = 3,600 C). Two base units (ampere + second), one derived unit.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many SI base units are there?',
    options: ['Five', 'Six', 'Seven', 'Nine'],
    correctAnswer: 2,
    explanation:
      'Seven: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd). Every other SI unit is built from these.',
  },
  {
    id: 2,
    question: 'Which SI base unit is the unit of electric current?',
    options: ['Volt', 'Ampere', 'Coulomb', 'Watt'],
    correctAnswer: 1,
    explanation:
      'Ampere (A). Current is one of the seven base quantities, so the ampere itself is base — not derived.',
  },
  {
    id: 3,
    question: 'Which SI base unit is the unit of mass?',
    options: ['Newton', 'Pound', 'Kilogram', 'Gram'],
    correctAnswer: 2,
    explanation:
      'Kilogram (kg). Note it is the kilogram, not the gram, that is the SI base unit — one of the few SI units with a prefix already baked in.',
  },
  {
    id: 4,
    question: 'The ohm (Ω) is a DERIVED unit. What is it derived from?',
    options: [
      'Just the ampere',
      'Volts ÷ amperes',
      'Watts ÷ volts',
      'Coulombs ÷ seconds',
    ],
    correctAnswer: 1,
    explanation:
      "1 Ω = 1 V ÷ 1 A. That's Ohm's law turned inside out — a unit definition, not just a calculation.",
  },
  {
    id: 5,
    question: 'The watt (W) is the SI derived unit of which quantity?',
    options: ['Energy', 'Force', 'Power', 'Charge'],
    correctAnswer: 2,
    explanation:
      'Watt = the unit of POWER (rate of energy transfer). 1 W = 1 J per second. Energy itself is measured in joules (J) or, on your bill, in kWh.',
  },
  {
    id: 6,
    question:
      "What unit do UK electricity suppliers use to bill consumers for energy used?",
    options: ['Watts (W)', 'Kilowatt-hours (kWh)', 'Joules (J)', 'Volt-amps (VA)'],
    correctAnswer: 1,
    explanation:
      'kWh — kilowatt-hours. Energy = power × time. 1 kW running for 1 hour = 1 kWh. That is what your meter counts.',
  },
  {
    id: 7,
    question: 'Frequency (Hz) tells you what?',
    options: [
      'How much current is flowing',
      'How many AC cycles happen per second',
      'How fast the volt drop is',
      'How hot a conductor is',
    ],
    correctAnswer: 1,
    explanation:
      'Hertz (Hz) = cycles per second. UK mains is 50 Hz — the AC waveform completes 50 full cycles every second.',
  },
  {
    id: 8,
    question:
      'Why does it matter that electrical units are SI rather than imperial?',
    options: [
      "It doesn't — units are units",
      'Manufacturers, BS 7671 and instruments worldwide all use SI, so cross-checks always work',
      'Imperial units are illegal',
      'SI units are easier to spell',
    ],
    correctAnswer: 1,
    explanation:
      'SI is the global system. Cable drums, MCBs, test instruments, BS 7671, IEC standards — all SI. You can pick up a German MCB and the rating is in amps, just like a UK one.',
  },
];

const faqs = [
  {
    question: 'Why is the kilogram SI base when it has "kilo" already in the name?',
    answer:
      "Historical accident. The original 1799 prototype was a 1 kg block of platinum-iridium kept in a vault in Paris. When the SI system was formalised, the kilogram was already the standard everyone used, so it stayed — making it the only base unit with a prefix in its name. It's now defined by the Planck constant since the 2019 redefinition, but the name stuck.",
  },
  {
    question: "Do I need to know all seven base units for my Level 2 exam?",
    answer:
      "Yes — name them and know which quantity each measures (length, mass, time, current, temperature, amount of substance, luminous intensity). You'll mainly use four day-to-day on site: metre, kilogram, second and ampere. The other three (kelvin, mole, candela) come up in lighting design, chemistry and theory.",
  },
  {
    question: "What's the difference between a base and a derived unit?",
    answer:
      "A base unit is defined on its own — it doesn't depend on others. A derived unit is built from base units. Examples: speed (m/s) is metres per second — derived from metre and second. The volt is derived from kilogram, metre, second and ampere. Sounds complicated, but in practice you just remember V = J/C or V = W/A.",
  },
  {
    question: 'Why use kelvin instead of celsius for temperature?',
    answer:
      "Kelvin is the SI base. It starts at absolute zero (the coldest anything can get) so you can't have negative kelvin. In practice, electricians read most temperatures in °C — but cable derating tables and motor thermal limits often quote ΔT (a temperature DIFFERENCE) in kelvin, because a 1 K change and a 1 °C change are exactly the same size.",
  },
  {
    question: 'What about VA on a transformer label — is that the same as W?',
    answer:
      "Numerically the same on a pure resistive load, but VA (volt-amperes) is APPARENT power and W is REAL power. On reactive loads (motors, transformers), VA is bigger than W because of power factor. Manufacturers rate the equipment in VA so you size cables for the actual current it'll pull, not just the useful power.",
  },
  {
    question: 'Are the symbols case-sensitive?',
    answer:
      "Yes — and it matters. Lower-case m is milli (÷ 1000), upper-case M is mega (× 1,000,000). Lower-case s is seconds, upper-case S is siemens. Lower-case k is kilo (× 1000), upper-case K is kelvin. Get the case wrong on a test sheet and you've changed the meaning by a factor of a billion in some cases.",
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
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 2"
            title="SI base and derived units"
            description="The seven SI base units, the handful of derived units electricians use daily, and why getting the case of a single letter wrong can blow your test sheet up by a factor of a million."
            tone="emerald"
          />

          <TLDR
            points={[
              "Seven SI base units underpin everything: metre, kilogram, second, ampere, kelvin, mole, candela. The ampere is the electrical one.",
              "Volts, ohms, watts, joules, hertz — those are DERIVED units, built from the base seven.",
              "Symbols are case-sensitive. m ≠ M, s ≠ S, k ≠ K. Treat units the same as digits — wrong case is wrong answer.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Name the seven SI base units and the quantity each measures.',
              'Identify the ampere (A) as the SI base unit for electric current.',
              'Distinguish between base and derived units (volt, ohm, watt, joule, hertz).',
              'Use the correct symbol and case for each unit on test sheets and certificates.',
              "Translate between an SI unit and the everyday unit (e.g. joules vs kWh on the customer's bill).",
              'Recognise when a derived unit is a combination of base units (V·A, N·m, m/s).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why a global unit system exists</ContentEyebrow>

          <ConceptBlock
            title="One language so a UK electrician and a German manufacturer agree"
            plainEnglish="SI = Système International d'Unités. Agreed in 1960. Every serious country uses it. Every BS, every IEC, every EN standard, every test instrument."
            onSite="Pick up a Hager MCB or a Schneider RCD off the wholesaler shelf — the rating is in amps, the breaking capacity is in kA, the temperature curve is in kelvin. Same units, same meaning, anywhere in the world."
          >
            <p>
              Before SI, every country and every trade had its own units — pounds-force,
              horsepower, BTUs, fluid ounces, candles, cubits. A motor labelled in horsepower in the
              US wouldn't mean exactly the same as horsepower in the UK because they were defined
              differently. The SI system fixed that by agreeing seven BASE units, with watertight
              definitions, and building every other unit out of those seven.
            </p>
            <p>
              For a Level 2 apprentice, that means three useful things. (1) The numbers on every
              piece of equipment you'll touch in the UK are SI. (2) The formulas in BS 7671 and the
              OSG assume SI. (3) Your test instruments report in SI by default — you don't need to
              convert.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The seven base units</ContentEyebrow>

          <ConceptBlock
            title="The whole edifice rests on these seven"
            onSite="Of the seven, electricians use four constantly: metre (cable runs, room dimensions), kilogram (weight of consumer units, cable drums), second (RCD trip times, pulse widths) and ampere (current — the big one)."
          >
            <p>The seven SI base units, what each measures and the symbol:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Metre (m)</strong> — length / distance. Cable runs, room dimensions, height
                above floor.
              </li>
              <li>
                <strong>Kilogram (kg)</strong> — mass. The only base unit with a prefix in its
                name.
              </li>
              <li>
                <strong>Second (s)</strong> — time. Trip times, switching delays, frequencies are
                all built on the second.
              </li>
              <li>
                <strong>Ampere (A)</strong> — electric current. The one electrical base unit. Every
                other electrical quantity (volts, ohms, watts) is built on it.
              </li>
              <li>
                <strong>Kelvin (K)</strong> — thermodynamic temperature. Cable derating, motor
                thermal limits.
              </li>
              <li>
                <strong>Mole (mol)</strong> — amount of substance. Chemistry; rarely on site.
              </li>
              <li>
                <strong>Candela (cd)</strong> — luminous intensity. Sits behind lighting design
                (lumens, lux are derived from it).
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BIPM SI Brochure (the international definition of the SI)"
            clause="The International System of Units (SI) is the modern form of the metric system and is the most widely used system of measurement. It comprises a coherent system of seven base units of measurement (the second, metre, kilogram, ampere, kelvin, mole and candela) and twenty-two derived units with special names."
            meaning={
              <>
                The seven base units aren't a UK choice — they're the international standard,
                maintained by the Bureau International des Poids et Mesures (BIPM). UK
                manufacturers, BS 7671 and your test instruments all derive from this single source.
                If a number on a product datasheet has a unit, it's almost certainly SI.
              </>
            }
            cite="Reference: BIPM — SI Brochure, 9th edition (2019). Also adopted in BS EN ISO 80000 series."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Derived units — built from the seven</ContentEyebrow>

          <ConceptBlock
            title="Where volts, ohms and watts come from"
            plainEnglish="Volt = work done per unit charge. Ohm = volt per amp. Watt = joule per second. They all trace back to the base seven."
          >
            <p>
              Most of the units an electrician touches are DERIVED — combinations of the base seven. You
              don't have to memorise the derivation, but understanding the principle stops the units
              feeling like magic. A few examples:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Newton (N)</strong> — force. 1 N = 1 kg·m/s². Underpins fixings, ladder
                loads, motor torque.
              </li>
              <li>
                <strong>Joule (J)</strong> — energy. 1 J = 1 N·m. The amount of energy needed to
                push 1 N through 1 m.
              </li>
              <li>
                <strong>Watt (W)</strong> — power. 1 W = 1 J/s. Power = energy per second.
              </li>
              <li>
                <strong>Volt (V)</strong> — potential difference. 1 V = 1 J/C (one joule of work per
                coulomb of charge).
              </li>
              <li>
                <strong>Ohm (Ω)</strong> — resistance. 1 Ω = 1 V/A. That's Ohm's law as a unit
                definition.
              </li>
              <li>
                <strong>Hertz (Hz)</strong> — frequency. 1 Hz = 1 cycle per second.
              </li>
              <li>
                <strong>Coulomb (C)</strong> — electric charge. 1 C = 1 A·s (one amp flowing for one
                second).
              </li>
            </ul>
          </ConceptBlock>

          <OhmsLawTriangle
            variant="V"
            caption="Even Ohm's law is a unit definition. 1 ohm = 1 volt per amp."
          />

          <UnitsPocketCard />

          <ConceptBlock
            title="Where you see SI units in your first week on site"
            plainEnglish="The seven base + handful of derived units aren't an exam abstraction — they're printed on every piece of kit you'll touch on day one."
            onSite="Read every label and nameplate as a list of SI units. Once you stop seeing them as random letters and start seeing them as quantities you've been taught, the trade stops feeling like a foreign language."
          >
            <p>
              Six places you'll meet SI units before the end of your first week, and where each one
              comes back later in the syllabus:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The multimeter readout</strong> — V (AC volts), A (amps), Ω (ohms). Three
                derived electrical units, all from the ampere base. You'll wire them into Ohm's law
                in Sub1.3 and Sub3.4.
              </li>
                <li>
                  <strong>The cable label</strong> — mm² for cross-sectional area (CSA), m for the
                  metre length on the drum. Both built on the metre base. CSA drives every cable-
                  sizing calc you'll do in Module 4.
                </li>
              <li>
                <strong>The MCB / RCBO rating</strong> — A for the rated trip current, kA for the
                breaking capacity. Same ampere underneath, different prefix. Sizing protective
                devices is the whole of Module 6.
              </li>
              <li>
                <strong>The kWh meter</strong> — kilowatt-hours, the customer's bill unit. Energy
                (joules) at a friendlier scale. You'll work with kWh in Sub4.5 (electrical power)
                when you cost a load.
              </li>
              <li>
                <strong>The motor nameplate</strong> — kW, V, A, Hz, kg all on one plate. Real
                power, voltage, current, frequency, mass — five separate SI quantities you'll act
                on. The kW comes back hard in Sub4.5 power calcs and Sub5.x motor theory.
              </li>
              <li>
                <strong>The torque setting on a CU terminal</strong> — N·m (newton-metres), force ×
                distance from the lever pivot. You'll see this again in Sub2.3 (levers) and on
                every consumer unit you ever wire.
              </li>
            </ul>
            <p>
              Every one of those is an SI unit. None of them is academic — they're the daily
              vocabulary of being on site.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Energy: joules vs kilowatt-hours"
            onSite="The bill the customer points at when the smart meter goes mad is in kWh, not joules. They mean the same kind of thing — energy used over time — but kWh is sized for household amounts. 1 kWh = 3,600,000 J."
          >
            <p>
              The strict SI unit of energy is the joule. But for billing and load calcs, electricians (and
              everyone else) use the kilowatt-hour (kWh) — power in kW × time in hours. They both
              measure energy; kWh is just a friendlier scale for the kind of numbers a home or shop
              actually uses.
            </p>
            <p>
              Quick example. A 2 kW heater on for 3 hours uses 2 × 3 = 6 kWh. At roughly 28p per
              kWh, that's £1.68 of leccy. Customer wants the heater off the ring final because it's
              "tripping the breaker" — sanity-check first: 2000 W ÷ 230 V ≈ 8.7 A. A 32 A ring will
              cope easily, so the trip is something else.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Coherent units — why the SI maths just works"
            plainEnglish="The SI system is 'coherent' — every derived unit is built from base units with no fudge factors of 1.6 or 2.54. Multiply the base units in the formula and the answer comes out in the right derived unit, automatically."
            onSite="That's why P = V × I gives you watts when V is in volts and I is in amps. No conversion factor. Same with V = I × R giving volts, or E = P × t giving joules when t is in seconds. Mix base and non-base units (mA, kV, hours) and you have to convert first."
          >
            <p>
              "Coherent" is the formal property: each derived SI unit is the product or quotient of
              base units with a numerical factor of <strong>exactly 1</strong>. So:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                1 newton = 1 kg × 1 m/s² (no fudge factor — just the base units multiplied
                together).
              </li>
              <li>1 joule = 1 N × 1 m = 1 kg·m²/s² (force × distance).</li>
              <li>1 watt = 1 J ÷ 1 s = 1 kg·m²/s³ (energy per second).</li>
              <li>1 volt = 1 J ÷ 1 C = 1 kg·m²/(A·s³) (energy per unit charge).</li>
            </ul>
            <p>
              The practical upshot: as long as everything is in <strong>base SI units</strong> when
              you start, the answer comes out in the right derived unit at the end. Plug 230 V × 13
              A into P = V × I and you get 2,990 W — straight out, no conversion. Plug 230 V × 13,000
              mA in and you get 2,990,000 mVA, which is the same number expressed in a unit you
              never wanted. Convert before, not after.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The dimensional sanity check — units catch wrong formulas"
            plainEnglish="If your answer comes out in the wrong unit, your maths is wrong. Tracking units through a calculation is one of the cheapest ways to spot an error before you sign off."
            onSite="A 4 kW immersion on a 230 V supply. Rough current? P ÷ V. The units check: W ÷ V = (J/s) ÷ (J/C) = C/s = A. Comes out in amps — formula is the right way up. If you'd written I = V × P by mistake, the units would be V × W = V² × A, which is nonsense — and the unit check catches it before you spec the wrong cable."
          >
            <p>
              Every SI calculation can be unit-checked. The trick is to write the units alongside
              the numbers and treat them like algebra. Cancel matching units top and bottom; the
              remainder is the unit your answer is in. If that doesn't match the unit you expected,
              your formula is wrong.
            </p>
            <p>
              Example. Cable resistance heating: P = I² × R. Plug in I in amps and R in ohms. The
              units: A² × Ω = A² × (V/A) = A × V = W. Comes out in watts — exactly what you'd want
              for a power. Now imagine you'd remembered the formula as P = I × R by mistake: A × Ω
              = A × V/A = V. Comes out in volts — that's voltage drop, not power. The unit check
              tells you instantly that you've used the wrong formula.
            </p>
            <p>
              Make this a habit on every calc. It costs five seconds and catches the kind of slip
              that fails a calc paper, mis-sizes a cable, or worse.
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

          <ContentEyebrow>Symbols and case</ContentEyebrow>

          <ConceptBlock
            title="A single capital letter changes the meaning by a million"
            plainEnglish="m = milli (small). M = mega (huge). Mix them up and you've moved by a factor of a billion."
            onSite="On a hand-written test sheet, mΩ and MΩ look almost identical if you're rushing. Print clearly. Use upper-case M for mega, lower-case m for milli, and never use a casual capital just because it looks neater."
          >
            <p>
              SI symbols are case-sensitive. Some examples that catch apprentices out:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>m (lower)</strong> = milli (÷ 1000). <strong>M (upper)</strong> = mega (×
                1,000,000). Factor of a billion difference.
              </li>
              <li>
                <strong>s (lower)</strong> = seconds. <strong>S (upper)</strong> = siemens (the SI
                unit of conductance — the inverse of resistance).
              </li>
              <li>
                <strong>k (lower)</strong> = kilo (× 1000). <strong>K (upper)</strong> = kelvin.
                Different things entirely.
              </li>
              <li>
                <strong>n (lower)</strong> = nano (÷ 1,000,000,000).{' '}
                <strong>N (upper)</strong> = newton (force).
              </li>
            </ul>
            <p>
              Two more rules: unit symbols don't take a plural "s" (5 kg, not 5 kgs), and they don't
              take a full stop unless they're at the end of a sentence (5 A, not 5 A.). Look fussy
              but they're conventions BS 7671 and the manufacturer datasheets stick to.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Writing 'Mw' or 'mΩ' when you meant 'MW' or 'MΩ'"
            whatHappens={
              <>
                You're hand-filling a test sheet. The insulation resistance read 250 megohms. You
                write 250 mΩ instead of 250 MΩ. On paper that's now 0.25 ohms — which would be a
                catastrophic short between live and earth, not a safe insulation reading.
              </>
            }
            doInstead={
              <>
                Print upper-case M for mega when you mean millions. If your handwriting is messy,
                circle the M or use the long form (megohms). On the digital cert software, the
                drop-down menus enforce the correct case — use them rather than free-typing the
                unit.
              </>
            }
          />

          <Scenario
            title="A motor nameplate that mixes units"
            situation={
              <>
                You're commissioning a three-phase motor. The nameplate shows: 7.5 kW, 415 V, 14.5
                A, 50 Hz, cos φ = 0.85, IP55, weight 65 kg. Six different SI units in three lines.
              </>
            }
            whatToDo={
              <>
                Read each one with its full meaning. 7.5 kW is real power output. 415 V is the rated
                line voltage. 14.5 A is the full-load current you'll size cables and overload for.
                50 Hz is the supply frequency. cos φ = 0.85 is the power factor (no unit — just a
                ratio). IP55 is the ingress rating (also no unit — a code). 65 kg is what you'll be
                lifting onto the bracket.
              </>
            }
            whyItMatters={
              <>
                Every figure on the plate is something you act on. Cable size comes from the amps,
                fixings from the kg, MCB curve from the inrush characteristic linked to the kW.
                Knowing which unit means what lets you do the install without guessing or asking on
                every step.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Seven SI base units: metre, kilogram, second, ampere, kelvin, mole, candela. Memorise the four electricians use most — m, kg, s, A.",
              "The ampere is the electrical base unit. Every other electrical unit (V, Ω, W, J, Hz, C) is derived from base units.",
              "1 V = 1 J/C, 1 Ω = 1 V/A, 1 W = 1 J/s. You don't need to recite these on site, but knowing the units have meaning stops them feeling random.",
              'Energy comes in joules (SI) but bills and loads use kWh — same quantity, friendlier scale.',
              "Symbols are case-sensitive. Lower-case m = milli, upper-case M = mega. Wrong case = wrong answer by a factor of a million.",
              'Every reputable UK manufacturer, BS 7671 itself, and your test instruments all use SI. No conversion gymnastics required.',
            ]}
          />

          <Quiz title="SI units knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section1/1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Maths principles for electricians
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section1/1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Electrical SI units — V, A, Ω, W
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
