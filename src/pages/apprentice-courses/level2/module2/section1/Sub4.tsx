/**
 * Module 2 · Section 1 · Sub 4 — SI prefixes and conversions
 * Maps to City & Guilds 2365-02 / Unit 202 / LO2 / AC 2.2
 *   "identify and determine values of base and derived SI units which apply
 *    specifically to electrical quantities" (prefix scaling for electrical
 *    quantities)
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import UnitPrefixConverter from '@/components/apprentice-courses/UnitPrefixConverter';
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

const TITLE = 'SI prefixes and conversions | Level 2 Module 2.1.4 | Elec-Mate';
const DESCRIPTION =
  'Milli, kilo, mega, micro, nano — the SI prefixes a working electrician uses constantly, and how to convert cleanly without 1000× errors that fail certificates.';

const checks = [
  {
    id: 'prefix-mA-to-A',
    question: 'Convert 30 mA into amperes.',
    options: ['0.0003 A', '0.003 A', '0.03 A', '3 A'],
    correctIndex: 2,
    explanation:
      'Milli means ÷ 1000. 30 ÷ 1000 = 0.03 A. That is the standard RCD trip current — same value, two ways of writing it.',
  },
  {
    id: 'prefix-MOhm-confusion',
    question:
      'A continuity test reads 0.05 Ω. A second cable measures 50 mΩ. Which has the lower resistance?',
    options: [
      '0.05 Ω is lower',
      '50 mΩ is lower',
      'They are the same',
      'You cannot compare different units',
    ],
    correctIndex: 2,
    explanation:
      'Same value: 50 mΩ = 50 ÷ 1000 = 0.05 Ω. The point of the prefix is just to keep the digits manageable. Always convert into the SAME units before comparing.',
  },
  {
    id: 'prefix-kW-to-W',
    question: 'A 7.5 kW shower runs at 230 V. What is its power in watts (W)?',
    options: ['75 W', '750 W', '7,500 W', '75,000 W'],
    correctIndex: 2,
    explanation:
      'Kilo means × 1000. 7.5 kW × 1000 = 7,500 W. That gives you ~32.6 A draw at 230 V — exactly why showers need a dedicated MCB and a thicker cable.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the prefix 'kilo' (k) mean?",
    options: ['÷ 100', '÷ 1,000', '× 1,000', '× 1,000,000'],
    correctAnswer: 2,
    explanation:
      "Kilo = × 1,000. Anywhere a domestic load is rated in kW you're seeing this prefix — kettle 2 kW, oven 3 kW, shower 9.5 kW. Drop the kilo and you'd have 2,000 / 3,000 / 9,500 W everywhere, which gets clumsy on cert sheets fast. Same multiplier whatever the base unit (kV, kΩ, kA).",
  },
  {
    id: 2,
    question: 'How many milliamps make up one amp?',
    options: ['10 mA', '100 mA', '1,000 mA', '1,000,000 mA'],
    correctAnswer: 2,
    explanation:
      "Milli means ÷ 1,000, so 1 A = 1,000 mA. To convert FROM amps TO milliamps you multiply by 1,000.",
  },
  {
    id: 3,
    question: 'Convert 2.4 kW into watts.',
    options: ['24 W', '240 W', '2,400 W', '24,000 W'],
    correctAnswer: 2,
    explanation:
      '2.4 × 1,000 = 2,400 W. Convert to base units before plugging into Ohm/power formulas — keeps the maths consistent.',
  },
  {
    id: 4,
    question: 'A capacitor is marked 470 µF. What is that in farads (F)?',
    options: ['0.047 F', '0.00047 F', '0.000047 F', '0.0000047 F'],
    correctAnswer: 1,
    explanation:
      'Micro means ÷ 1,000,000. 470 ÷ 1,000,000 = 0.00047 F. Capacitors are always quoted in µF, nF or pF because the actual farad is huge.',
  },
  {
    id: 5,
    question: 'True or false: 1 MΩ = 1,000 kΩ.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation:
      'True. 1 MΩ = 1,000,000 Ω. 1,000 kΩ = 1,000 × 1,000 = 1,000,000 Ω. Same value, just different prefix steps.',
  },
  {
    id: 6,
    question: "Which of these is the largest current?",
    options: ['500 µA', '50 mA', '0.5 A', '5,000 mA'],
    correctAnswer: 3,
    explanation:
      'Convert all to amps: 500 µA = 0.0005 A; 50 mA = 0.05 A; 0.5 A = 0.5 A; 5,000 mA = 5 A. Five amps is the biggest by a clear mile.',
  },
  {
    id: 7,
    question: 'On an insulation tester showing 250 MΩ, what is the reading in ohms?',
    options: ['250,000 Ω', '2,500,000 Ω', '250,000,000 Ω', '25 Ω'],
    correctAnswer: 2,
    explanation:
      '250 × 1,000,000 = 250,000,000 Ω (250 megohms). That is excellent insulation — well above the 1 MΩ minimum acceptance from BS 7671 Table 64.',
  },
  {
    id: 8,
    question:
      'A submeter records 3.6 kWh. The supply ran for exactly 2 hours. What was the average power draw in W?',
    options: ['180 W', '1,800 W', '7,200 W', '720 W'],
    correctAnswer: 1,
    explanation:
      'Energy = power × time. 3.6 kWh ÷ 2 h = 1.8 kW = 1,800 W. Always convert kWh and kW into matching units before doing the sum.',
  },
];

const faqs = [
  {
    question: 'Is there a foolproof way to remember which prefix is bigger?',
    answer:
      "Picture them on a number line. Going up: base → k (×1000) → M (×million) → G (×billion). Going down: base → m (÷1000) → µ (÷million) → n (÷billion). Each step is exactly three decimal places. Once you internalise that 'each step = three places', conversions become mechanical.",
  },
  {
    question: 'Why three places at a time, not powers of ten one at a time?',
    answer:
      "SI prefixes for engineering use are spaced in steps of 1000 (10³). It keeps the digit count manageable — instead of 0.0000035 A you can write 3.5 µA. There ARE prefixes for steps of ten (deci, centi, hecto, deca) but they're rarely used in electrical work; you stick with k, M, G upwards and m, µ, n downwards.",
  },
  {
    question: 'When should I convert into base units before calculating?',
    answer:
      "Always — at least until the conversions are second nature. P = V × I needs P in watts, V in volts, I in amps. If your power is in kW and your current is in mA, you'll get a nonsense answer unless you bring both into base units first.",
  },
  {
    question: "What's the difference between µ (micro) and m (milli)?",
    answer:
      "Factor of 1,000. 1 mA = 1,000 µA. They look similar in handwriting which is exactly why apprentices mix them up — print clearly, and on digital cert software use the dropdown rather than free-typing the unit.",
  },
  {
    question: 'How do I convert mΩ to MΩ in one step?',
    answer:
      "Three prefix jumps separate them, all in the same direction. mΩ → base ohms is ÷ 1,000 (one jump down to undo the milli). Base ohms → kΩ → MΩ is ÷ 1,000 then ÷ 1,000 again (two more jumps up). Three jumps × 1,000 each = ÷ 1,000,000,000 overall (10⁹). So 5 mΩ = 5 × 10⁻⁹ MΩ. Microscopic — which makes sense; mΩ is tiny and MΩ is huge.",
  },
  {
    question: 'Do I need to convert before reading an MCB or fuse rating?',
    answer:
      "No — those are always written in base units (amps), so a 32 A MCB really is 32 A. But cable manufacturers sometimes spec resistance per metre in mΩ/m. To compare with a length-corrected calculation you'll do, you'll need to convert to ohms first. Then the maths matches up.",
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
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 4"
            title="SI prefixes and conversions"
            description="milli, kilo, mega, micro, nano — the prefix system that lets one number cover everything from a 30 mA RCD trip to a 250 MΩ insulation reading. Convert it cleanly or fail the cert."
            tone="emerald"
          />

          <TLDR
            points={[
              "Each prefix step is a factor of 1,000. m → base → k → M → G goes up by 1000 every step. base → m → µ → n goes down by 1000 every step.",
              "Convert into BASE units before plugging into formulas. P = V × I expects watts, volts, amps — not kW, V, mA.",
              "Lower-case m (milli) and upper-case M (mega) differ by a factor of one billion. Get the case wrong on a cert and you've changed the meaning by nine decimal places.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Name the common SI prefixes used in electrical work (G, M, k, m, µ, n) and the factor each represents.',
              'Convert between any two prefix forms of the same unit (e.g. kΩ ↔ MΩ, mA ↔ A).',
              'Convert into base units before applying P = V × I and Ohm\'s law.',
              'Spot when prefix mistakes have produced an obviously wrong answer (the sanity check).',
              'Apply prefixes correctly when reading instruments, labels, schematic markings and certificates.',
              'Avoid the four classic apprentice prefix errors — case, decimal-place, unit-mix and missing prefix.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why the prefix system exists</ContentEyebrow>

          <ConceptBlock
            title="Electrical numbers span 18 decimal places — prefixes keep them readable"
            plainEnglish="Insulation resistance is in millions of ohms. RCD trip currents are in thousandths of an amp. Without prefixes you'd write rows of zeros."
            onSite="A test sheet that says 'IR = 250,000,000 Ω' is asking for a typo. '250 MΩ' is the same value, three characters long, and harder to misread."
          >
            <p>
              Electrical quantities cover an enormous range. Capacitor values can be picofarads (a
              trillionth of a farad). Insulation resistance can be gigohms. Cable resistance can be
              fractions of a milliohm. Writing all of those in their base SI units would mean
              certificates full of zeros and mistakes.
            </p>
            <p>
              SI prefixes solve it by letting you re-scale the number into a digit-count you can
              actually read at a glance. The catch is that a single wrong character (m vs M, or a
              decimal in the wrong place) can change the value by a factor of millions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The prefixes you'll meet daily</ContentEyebrow>

          <ConceptBlock
            title="Six prefixes cover ~99% of electrician work"
            onSite="Print the table, stick it in the back of the OSG, refer to it until you've memorised it. After about six months on site the conversions become automatic."
          >
            <p>
              Each step up multiplies by 1,000. Each step down divides by 1,000.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>G — giga</strong> — × 1,000,000,000 (a billion). GΩ on top-end insulation
                testers; rare otherwise on Level 2.
              </li>
              <li>
                <strong>M — mega</strong> — × 1,000,000 (a million). MΩ for insulation, MVA for
                large transformers, MW for grid loads.
              </li>
              <li>
                <strong>k — kilo</strong> — × 1,000 (a thousand). kW (appliance ratings), kΩ
                (medium-value resistors), kA (fault current ratings), kVA (transformer ratings).
              </li>
              <li>
                <strong>m — milli</strong> — ÷ 1,000 (a thousandth). mA (RCD trip currents), mΩ
                (cable continuity), ms (RCD trip times).
              </li>
              <li>
                <strong>µ — micro</strong> — ÷ 1,000,000 (a millionth). µF (capacitors), µA (very
                low leakage currents).
              </li>
              <li>
                <strong>n — nano</strong> — ÷ 1,000,000,000 (a billionth). nF (small capacitors).
              </li>
            </ul>
            <p>
              <strong>Memory hook:</strong> one step is always 1,000. So mA × 1,000 = A. A × 1,000 =
              kA. mΩ × 1,000,000 = kΩ (two steps). MΩ ÷ 1,000 = kΩ (one step down).
            </p>
          </ConceptBlock>

          <UnitPrefixConverter />

          <ConceptBlock
            title="Each prefix step is exactly 10³ — three decimal places at a time"
            plainEnglish="The standard engineering prefixes (k, M, G going up; m, µ, n going down) are spaced in factors of 1,000. Move one step and the number's decimal point shifts three places. That's why conversions feel mechanical once you see the pattern."
            onSite="Reading 250 MΩ and wanting it in kΩ? One step down (mega → kilo) = ÷ by 1,000 (no, the other way — mega is bigger than kilo, so you multiply). 250 MΩ × 1,000 = 250,000 kΩ. Step direction matters; ask 'is the new prefix bigger or smaller than the old one?' to decide which way the decimal moves."
          >
            <p>
              The prefix ladder, with the multiplier between each step:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                G (giga) ← × 1,000 ← M (mega) ← × 1,000 ← k (kilo) ← × 1,000 ← <strong>BASE</strong>{' '}
                ← × 1,000 ← m (milli) ← × 1,000 ← µ (micro) ← × 1,000 ← n (nano).
              </li>
              <li>
                Going LEFT (towards bigger prefixes) divides the number by 1,000 each step.
              </li>
              <li>Going RIGHT (towards smaller prefixes) multiplies the number by 1,000 each step.</li>
            </ul>
            <p>
              Worked example. 5 mΩ to MΩ. Three steps to the LEFT (m → base → k → M), so divide
              by 1,000 three times = ÷ 1,000,000,000. 5 mΩ ÷ 10⁹ = 5 × 10⁻⁹ MΩ = 0.000000005 MΩ.
              Microscopic — which makes sense, because milliohms are tiny and megohms are huge.
            </p>
            <p>
              Worked example. 0.5 MΩ to mΩ. Three steps to the RIGHT (M → k → base → m), so
              multiply by 1,000 three times = × 1,000,000,000. 0.5 MΩ × 10⁹ = 500,000,000 mΩ.
              Vast — same logic in reverse.
            </p>
            <p>
              You don't need to memorise the multiplier across every possible jump. Memorise the
              ladder, count the steps, and multiply or divide by 1,000 per step in the right
              direction. The arithmetic is rote once the structure clicks.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why µ (micro) and m (milli) get mixed up — and how to stop it"
            plainEnglish="They sound similar, look similar in handwriting and sit on the same side of the prefix ladder — both 'less than base'. The factor between them is 1,000. Get it wrong and your value is off by three decimal places."
            onSite="Capacitor markings, RCD trip currents, low leakage measurements — these are the values where m and µ collide most often. Print clearly, use the digital cert software's dropdown, and double-check anything that looks too big or too small for the application."
          >
            <p>
              Three rules to keep them apart:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Anchor each to a familiar value.</strong> 30 mA = the standard RCD trip
                current. 470 µF = a typical motor-run capacitor. 4 µA = the kind of leakage current
                a healthy circuit draws to earth at standby. Keep one solid example for each
                prefix in your head.
              </li>
              <li>
                <strong>Spell it out when in doubt.</strong> "30 milliamps" or "30 mA" are
                unambiguous in writing — "30 ma" is not. The Greek µ doesn't appear on a UK
                keyboard easily, so people sometimes substitute "u" or "mu" — both acceptable as
                long as they're consistent.
              </li>
              <li>
                <strong>Use the dropdown, not the keyboard.</strong> On every digital cert software
                the prefix is a separate selectable field. Pick from the list and the case can't
                go wrong. Free-typing the unit is the source of half the prefix errors on a typical
                EICR.
              </li>
            </ul>
            <p>
              The penalty for a m/µ mix-up: 1,000×. A 30 µA leakage written as 30 mA is the
              difference between an installation that's healthy and one that should already be off.
              Slow down for the prefix on every value you record.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The 'sensible-prefix sweet spot' — picking the right one for the result"
            plainEnglish="A good final prefix puts the number between roughly 0.1 and 1,000. Outside that range, switch to the next prefix up or down. Saves zeros, avoids decimal-place mistakes when others read the cert."
            onSite="A measured Zs of 0.0005 Ω — write it as 0.5 mΩ. A measured insulation resistance of 4,700,000 Ω — write it as 4.7 MΩ. Both have the same value as the long form but read in a fraction of a glance and are far less prone to typos."
          >
            <p>
              The convention electricians and engineers follow for "what prefix should the answer
              be in?":
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Aim for a number with <strong>one to four significant digits</strong> ahead of any
                decimal — typically between 0.1 and 1,000.
              </li>
              <li>
                If the result is below 0.1, step DOWN to a smaller-base prefix (e.g. 0.05 A → 50
                mA).
              </li>
              <li>
                If the result is above 1,000, step UP to a larger-base prefix (e.g. 4,700 V →
                4.7 kV).
              </li>
              <li>
                Two-digit-decimal results (e.g. 12.6 V, 0.45 Ω, 9.5 kW) are usually the cleanest
                — keep them.
              </li>
            </ul>
            <p>
              Why bother? Two reasons. First, the next person reading your cert reads numbers
              faster and more accurately when there are fewer zeros to count. Second, sanity-checks
              get easier — "13 A drawn by a kettle" is recognisable; "13,000,000 µA drawn by a
              kettle" is the same value but the digit count alone makes it harder to spot whether
              it's right or wrong. Tidy maths is safer maths.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Prefixes on test instruments — what the screen is actually telling you"
            plainEnglish="Every multimeter, insulation tester, loop tester and RCD tester puts the prefix on the screen. Reading the prefix is just as important as reading the digits. Half the test-sheet typos start with someone reading '5' instead of '5 m' or '5 M'."
            onSite="On most modern testers the prefix and the unit appear together to the right of the digits — '4.7 MΩ' or '50 mA' or '0.78 Ω'. Older meters (especially analogue) put the prefix on the range knob, not the screen — you have to read the knob and translate. Knowing which type of meter you're using means you don't lose a prefix when transcribing onto the cert."
          >
            <p>
              Three prefix-reading habits that catch typos before they ship:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Read the screen, then read the unit, then write down both together.</strong>{' '}
                Don't write the digits, look away, then come back and add the unit — that's where
                the m/M slips happen.
              </li>
              <li>
                <strong>Sanity-check against the expected range</strong> before recording. If the
                ring final R1+R2 should be 0.4-0.8 Ω and the meter says 0.45, that fits — record
                it. If it says 450, you've got the wrong range or you're reading mΩ as Ω. Stop and
                check.
              </li>
              <li>
                <strong>Re-read the prefix on auto-ranging meters every time.</strong> The same
                test on the same circuit might display in mΩ, Ω or kΩ depending on what the meter
                decides is the most readable scale. Don't assume the prefix from the previous
                reading carries over.
              </li>
            </ul>
            <p>
              Insulation testers in particular love to switch from MΩ to GΩ when the reading goes
              very high. A 250 MΩ reading on Tuesday and a 0.5 GΩ reading on Wednesday are not
              "different" — they're the same level of healthy insulation, just displayed in
              different prefixes. Train yourself to read the unit every time.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671 — Regulation 415.1.1 (RCDs as additional protection)"
            clause="The use of RCDs with a rated residual operating current (I∆n) not exceeding 30 mA is recognized in AC systems as additional protection in the event of failure of the provision for basic protection and/or the provision for fault protection or carelessness by users."
            meaning={
              <>
                What 415.1.1 actually says: a 30 mA RCD is recognised as <em>additional</em>{' '}
                protection on top of basic and fault protection — not a replacement for them. Note
                the <strong>m</strong> in <strong>mA</strong> — lower-case, milli, ÷ 1,000. 30 mA is
                0.03 A. Write it as 30 A on a test sheet (upper-case A only) and you've described an
                RCD that wouldn't trip until far above the lethal threshold.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Regulation 415.1.1 for full text"
          />

          <RegsCallout
            source="BS 7671 Table 41.1 + BS EN 61008 / BS EN 61009 (RCD trip times)"
            clause="A general-purpose 30 mA RCD complying with BS EN 61008-1 / BS EN 61009-1 must disconnect the supply within 300 ms at I∆n, 150 ms at 2 × I∆n, 40 ms at 5 × I∆n, and 40 ms at 500 A test current. BS 7671 Reg 643.7.3 (test RCD operation) + Table 41.1 (max disconnection times) — the 40 ms / 5 × I∆n product-standard performance comes from BS EN 61008-1 / BS EN 61009-1."
            meaning={
              <>
                The famous "trips in 40 ms at 5 × I∆n" figure is a <strong>product-standard</strong>{' '}
                requirement on the device itself (BS EN 61008/61009), referenced by BS 7671
                Reg 643.7.3 and Table 41.1 as the test pass criterion — it is not the wording
                of Reg 415.1.1. Same goes for the time figure — <strong>ms</strong> is
                milliseconds, not megaseconds. Apprentices regularly mis-attribute this clause; the
                regs and the product standards do separate jobs.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Reg 643.7.3 and Table 41.1; product limits in BS EN 61008-1 / BS EN 61009-1. Wording paraphrased."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Converting cleanly</ContentEyebrow>

          <ConceptBlock
            title="The two-step routine that stops 1000× errors"
            plainEnglish="(1) Convert into base units. (2) Do the maths. (3) Convert the answer back into a sensible prefix at the end."
          >
            <p>
              Trying to do calculations directly between prefixed values is where most apprentice
              maths goes wrong. The reliable routine:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Convert all values into BASE units</strong> — kW becomes W, kΩ becomes Ω,
                mA becomes A. Multiply or divide by 1,000 (or 1,000,000) as needed.
              </li>
              <li>
                <strong>Do the calculation in base units</strong> — P = V × I, V = I × R, etc.
              </li>
              <li>
                <strong>Convert the answer back into a sensible prefix</strong> — if the result is
                4,700 V, write it as 4.7 kV. If the result is 0.0035 A, write it as 3.5 mA. Pick the
                prefix that gives a number between roughly 0.1 and 1000.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Worked example — sizing the current draw of a kettle"
            onSite="Same routine for every load. Kettle, oven, shower, EV charger, motor — the only thing that changes is the watts."
          >
            <p>
              A kettle is marked 3 kW, 230 V, 50 Hz. What current does it draw?
            </p>
            <p>
              <strong>Step 1 — base units.</strong> 3 kW = 3 × 1,000 = 3,000 W. 230 V is already
              base. 50 Hz is the frequency, not used here.
            </p>
            <p>
              <strong>Step 2 — calc.</strong> P = V × I, so I = P ÷ V = 3,000 ÷ 230 ≈ 13.04 A.
            </p>
            <p>
              <strong>Step 3 — sensible prefix.</strong> 13 A is already a sensible scale. No need
              to re-prefix. Result: kettle pulls ~13 A — right at the limit of a 13 A plug fuse,
              which is exactly why kettles run that fuse and not, say, a 3 A.
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

          <ContentEyebrow>Where prefix maths goes wrong</ContentEyebrow>

          <CommonMistake
            title="Mixing prefixes inside a single calculation"
            whatHappens={
              <>
                You're calculating power from V and I. Voltage reading on the multimeter says 12 V;
                current is 250 mA. You key 12 × 250 = 3,000 into the calculator and write
                "3,000 W" on the test sheet. Wrong. The current was MILLI-amps. The actual answer
                is 12 × 0.25 = 3 W.
              </>
            }
            doInstead={
              <>
                Convert mA to A before the multiplication. 250 mA ÷ 1,000 = 0.25 A. Then 12 × 0.25 =
                3 W. Get into the habit of writing units next to numbers in your working — it forces
                you to notice when something doesn't match.
              </>
            }
          />

          <CommonMistake
            title="Case slip — milli written as mega (or vice versa)"
            whatHappens={
              <>
                You measure insulation resistance: 250 MΩ. Hand-writing the cert, you write 250 mΩ
                instead. You've just recorded a passing reading as a dead short to earth — a dangerous
                fault. The next inspector to read the cert will either chase a non-existent fault or
                trust the wrong value and walk past a real problem.
              </>
            }
            doInstead={
              <>
                Print the M clearly upper-case for mega. Use digital cert software where the prefix
                is a dropdown rather than free-typed. When in doubt, write the long form (megohms /
                milliohms) so there's no ambiguity.
              </>
            }
          />

          <Scenario
            title="A test sheet that doesn't add up"
            situation={
              <>
                You're checking a colleague's EICR before sign-off. R1+R2 reads 0.45 Ω. Zs reads
                0.78 mΩ on the same circuit. Something looks wrong — Zs should always be at least as
                big as R1+R2.
              </>
            }
            whatToDo={
              <>
                Spot the prefix slip. 0.78 mΩ is way too low for a real Zs reading (that would mean
                an almost perfect fault loop). Almost certainly the colleague meant 0.78 Ω — they
                added a stray "m" out of habit. Talk to them, retest if you can't be sure, correct
                the cert before it leaves the office.
              </>
            }
            whyItMatters={
              <>
                A wrong prefix on Zs would lead to under-spec'd protective devices. The maths chain
                that says "this Zs is OK for this MCB" relies on the value being read correctly.
                Catch it on the desk, not in court.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Six prefixes cover most Level 2 work: G, M, k (going up by 1,000 each step) and m, µ, n (going down by 1,000 each step).",
              "Always convert into BASE units before plugging into a formula. Mixed prefixes inside one calculation = wrong answer.",
              "Lower-case and upper-case versions of the same letter are not the same prefix. m ≠ M. The penalty for getting it wrong can be a factor of one billion.",
              "Sanity-check every result. If your calculator says a domestic kettle pulls 13,000 A, you've slipped a prefix.",
              "On certificates, prefer digital dropdowns over free-typing the unit. They lock the case and stop most prefix errors at source.",
              "30 mA RCD, 1 MΩ minimum IR, 32 A ring final — memorise the standard UK values so any number that's wildly off jumps out at you.",
            ]}
          />

          <Quiz title="SI prefixes knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section1/1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Electrical SI units — V, A, Ω, W
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section1/1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Electrical instruments
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
