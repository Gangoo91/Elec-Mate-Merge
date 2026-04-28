/**
 * Module 3 · Section 1 · Subsection 2 — SI units and prefixes (AC 1.1)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.1
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 2.1, 2.2 — internationally recognised SI units
 *   AC 2.1 — "identify and use internationally recognised (SI) units of measurement for general variables"
 *   AC 2.2 — "identify and determine values of basic SI units which apply specifically to electrical variables"
 *
 * The seven base SI units, the derived units used in electrical work (V, A, Ω, W, J, F, H, T, Wb)
 * and the prefix ladder from pico through tera. You can't read a transformer plate or a
 * datasheet without these.
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

const TITLE =
  'SI units and prefixes | Level 3 Module 3.1.2 (AC 1.1, 2.1, 2.2) | Elec-Mate';
const DESCRIPTION =
  'The seven SI base units, the electrical derived units (V, A, Ω, W, F, H, Wb, T) and the prefix ladder you use every job — from picofarads to megavolt-amps.';

const checks = [
  {
    id: 'l3-m3-1-2-prefix',
    question: 'A capacitor is marked 47 μF. Express that in farads using scientific notation.',
    options: ['4.7 × 10⁻³ F', '4.7 × 10⁻⁵ F', '4.7 × 10⁻⁶ F', '4.7 × 10⁻⁹ F'],
    correctIndex: 1,
    explanation:
      'micro = 10⁻⁶, so 47 μF = 47 × 10⁻⁶ F = 4.7 × 10⁻⁵ F (move the decimal one place to convert 47 × 10⁻⁶ into standard form).',
  },
  {
    id: 'l3-m3-1-2-derived',
    question: 'Which of these is the SI unit of magnetic flux?',
    options: ['Tesla (T)', 'Weber (Wb)', 'Henry (H)', 'Farad (F)'],
    correctIndex: 1,
    explanation:
      'Weber (Wb) is total flux. Tesla (T) is flux density (Wb/m²). Henry (H) is inductance, Farad (F) is capacitance.',
  },
  {
    id: 'l3-m3-1-2-convert',
    question: 'A transformer plate reads 1.6 MVA. How many VA is that?',
    options: ['1600 VA', '16 000 VA', '160 000 VA', '1 600 000 VA'],
    correctIndex: 3,
    explanation: 'mega = 10⁶, so 1.6 MVA = 1.6 × 10⁶ VA = 1 600 000 VA.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which is the SI base unit of electric current?',
    options: ['Volt', 'Ampere', 'Watt', 'Coulomb'],
    correctAnswer: 1,
    explanation:
      'The ampere (A) is the base SI unit of electric current. Volts, watts and coulombs are derived from it.',
  },
  {
    id: 2,
    question: 'The unit of capacitance is:',
    options: ['Henry', 'Farad', 'Tesla', 'Weber'],
    correctAnswer: 1,
    explanation:
      'Farad (F). 1 F = 1 coulomb per volt. Practical capacitors are usually μF, nF or pF — a 1 F capacitor is huge.',
  },
  {
    id: 3,
    question: 'Convert 0.000 22 H (henry) to milli-henries (mH).',
    options: ['0.022 mH', '0.22 mH', '22 mH', '220 mH'],
    correctAnswer: 1,
    explanation: '0.000 22 H = 2.2 × 10⁻⁴ H. Multiply by 1000 to get mH: 0.22 mH.',
  },
  {
    id: 4,
    question: 'Power is measured in:',
    options: ['Joules', 'Watts', 'Volts', 'Coulombs'],
    correctAnswer: 1,
    explanation: 'Watt (W) = joule per second. Energy is in joules; power is the rate of energy transfer.',
  },
  {
    id: 5,
    question: 'Which prefix represents 10⁻¹²?',
    options: ['nano', 'pico', 'micro', 'femto'],
    correctAnswer: 1,
    explanation:
      'pico = 10⁻¹² (picofarad pF). nano = 10⁻⁹, micro = 10⁻⁶, femto = 10⁻¹⁵.',
  },
  {
    id: 6,
    question: 'A 50 nF capacitor in pF is:',
    options: ['5 pF', '50 pF', '500 pF', '50 000 pF'],
    correctAnswer: 3,
    explanation: '1 nF = 1000 pF (nano = 10⁻⁹, pico = 10⁻¹²). 50 nF × 1000 = 50 000 pF.',
  },
  {
    id: 7,
    question: 'Magnetic flux density (B) is measured in:',
    options: ['weber (Wb)', 'tesla (T)', 'henry (H)', 'ampere-turns (At)'],
    correctAnswer: 1,
    explanation:
      'Tesla (T) is flux density — the amount of flux per unit area (1 T = 1 Wb/m²). Weber is total flux.',
  },
  {
    id: 8,
    question:
      'Resistance of a heater = 23 Ω. Expressed in milliohms, that is:',
    options: ['0.023 mΩ', '2.3 mΩ', '23 000 mΩ', '23 000 000 mΩ'],
    correctAnswer: 2,
    explanation: '1 Ω = 1000 mΩ. 23 × 1000 = 23 000 mΩ.',
  },
];

const faqs = [
  {
    question: "Why do I need to know all these prefixes — won't my calculator do it?",
    answer:
      "The calculator will compute, but it won't read a transformer plate or a datasheet for you. A 47 μF capacitor on a motor start, a 470 nF EMC filter on an LED driver, a 4.7 GΩ insulation reading — you have to recognise the prefix to know the order of magnitude is right.",
  },
  {
    question: 'What is the difference between weber and tesla?',
    answer:
      "Weber (Wb) is total magnetic flux through a coil — the absolute amount. Tesla (T) is flux per square metre — the density. A small magnet might have a high flux density (T) over a tiny area but low total flux (Wb). Transformers care about both: peak flux density to avoid saturation, total flux for EMF generation.",
  },
  {
    question: 'I never see femto or atto on site. Why are they on the list?',
    answer:
      "You won't on installation work. They appear in datasheets for high-frequency electronics — RF transistor capacitances, semiconductor leakage currents. Worth knowing the ladder exists; you don't need them daily.",
  },
  {
    question: 'Is the unit Hz the same as cycles per second?',
    answer:
      "Yes. 1 Hz = 1 cycle per second. UK mains is 50 Hz — the AC voltage completes 50 full sine-wave cycles every second. The unit is named after Heinrich Hertz.",
  },
  {
    question: 'Why is the kilogram the only base unit with a prefix in its name?',
    answer:
      "Historical accident. The original SI definitions defined the kilogram as the base unit (the lump of metal in Paris), so multiples are built from kg, not g. Don't write 1 kkg for 1 tonne — that's not a valid SI form.",
  },
  {
    question: 'How do I remember the prefix ladder?',
    answer:
      "Memorise three rungs at a time: pico nano micro (going down), kilo mega giga (going up), then milli centi deci between. Each step is 1000 (10³) except for centi (10⁻²) and deci (10⁻¹), which are non-engineering steps you rarely use in electrical work.",
  },
];

export default function Sub2() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 2"
            title="SI units and prefixes"
            description="Seven base units. Twenty derived units. A prefix ladder from pico to tera. Read any datasheet, plate or instrument display fluently."
            tone="yellow"
          />

          <TLDR
            points={[
              'Seven SI base units underpin everything: metre, kilogram, second, ampere, kelvin, mole, candela. Most electrical units are derived from amperes and seconds.',
              "You'll meet ten electrical derived units regularly: V, A, Ω, W, J, F, H, T, Wb, Hz. Memorise their definitions.",
              'Prefixes step in factors of 1000: pico (10⁻¹²) → nano → micro → milli → unit → kilo → mega → giga → tera.',
              'Always write the unit. 47 μ on its own is meaningless — 47 μF is a capacitor, 47 μH is an inductor, 47 μA is current.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Name and define the seven SI base units used in electrical engineering.',
              'Recognise and convert between the major electrical derived units (V, A, Ω, W, F, H, Wb, T, Hz, J).',
              'Apply the standard prefix ladder from pico through tera to convert values quickly.',
              'Read a transformer plate, capacitor marking or instrument display and identify the unit and order of magnitude.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The seven SI base units</ContentEyebrow>

          <ConceptBlock
            title="Everything else is built from these seven"
            plainEnglish="The SI system defines seven independent base units. Every other unit (volt, watt, ohm, etc.) is a combination of these seven."
            onSite="You'll only meet four of the seven daily — metre, kilogram, second, ampere. The others (kelvin, mole, candela) appear in lighting calculations (candela) and electrochemistry (mole)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>metre (m)</strong> — length. Cable run lengths, conductor cross-section
                (mm²), distance between current-carrying conductors.
              </li>
              <li>
                <strong>kilogram (kg)</strong> — mass. Mostly mechanical work — motor torque,
                weight of a luminaire on a fixing, mass of copper in a winding.
              </li>
              <li>
                <strong>second (s)</strong> — time. RC time constants, RCD trip times, motor
                run-up time.
              </li>
              <li>
                <strong>ampere (A)</strong> — electric current. Flow of charge per second.
              </li>
              <li>
                <strong>kelvin (K)</strong> — temperature. Thermodynamic scale (0 K =
                −273.15 °C). Most installs work in °C, but °C and K share the same step size.
              </li>
              <li>
                <strong>mole (mol)</strong> — amount of substance. Used in electrochemistry
                (battery capacity, electroplating).
              </li>
              <li>
                <strong>candela (cd)</strong> — luminous intensity. Foundation of the lumen and
                lux used in lighting design (Section 6).
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Derived units you actually use</ContentEyebrow>

          <ConceptBlock
            title="Ten derived units that show up on every job"
            plainEnglish="A derived unit is a combination of base units, given a friendly name. Volt = kg·m²/(A·s³) — but nobody writes that. We just say 'volt'."
          >
            <p>The L3 set:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>volt (V)</strong> — potential difference. 1 V = 1 J per coulomb. Energy
                per unit charge.
              </li>
              <li>
                <strong>ohm (Ω)</strong> — resistance. 1 Ω = 1 V per ampere.
              </li>
              <li>
                <strong>watt (W)</strong> — power. 1 W = 1 J per second = 1 V × 1 A.
              </li>
              <li>
                <strong>joule (J)</strong> — energy. 1 J = 1 W for 1 second. Energy bills are in
                kWh; 1 kWh = 3.6 × 10⁶ J.
              </li>
              <li>
                <strong>farad (F)</strong> — capacitance. 1 F = 1 coulomb per volt. Practical
                capacitors are μF, nF, pF.
              </li>
              <li>
                <strong>henry (H)</strong> — inductance. 1 H = 1 V per A/s. Practical inductors
                are mH or μH; motor windings can be in tens of mH.
              </li>
              <li>
                <strong>weber (Wb)</strong> — total magnetic flux through a coil.
              </li>
              <li>
                <strong>tesla (T)</strong> — magnetic flux density. 1 T = 1 Wb/m². A typical
                transformer core runs at 1.5–1.7 T at peak.
              </li>
              <li>
                <strong>hertz (Hz)</strong> — frequency. UK mains = 50 Hz.
              </li>
              <li>
                <strong>coulomb (C)</strong> — electric charge. 1 C = 1 A flowing for 1 s.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Compound and combined units — what V/m, A·t, Wb·m⁻² actually mean"
            plainEnglish="When two SI quantities are multiplied or divided, the unit follows the same operation. Volts per metre, ampere-turns, watts per kelvin — all built up from the base list."
            onSite="V/m is dielectric stress (insulation rating). A·t is magnetomotive force (transformer/motor windings). W/(m·K) is thermal conductivity (cable derating in lagged installations). Recognise the dimensions and you can sanity-check any datasheet."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>V/m</strong> — electric field strength. PVC insulation breaks down around 20 kV/mm = 20 × 10⁶ V/m.</li>
              <li><strong>A·t</strong> — ampere-turns (magnetomotive force). 200 turns × 2 A = 400 A·t drives flux through a transformer core.</li>
              <li><strong>Wb/m²</strong> — magnetic flux density (1 T = 1 Wb/m²).</li>
              <li><strong>J/(kg·K)</strong> — specific heat capacity. Copper ≈ 385 J/(kg·K) — used in adiabatic short-circuit cable temperature rise calcs (BS 7671 §434).</li>
              <li><strong>Ω·m</strong> — resistivity (resistance × area / length).</li>
              <li><strong>VA, var, W</strong> — three flavours of AC power; same dimensions, different physical meaning.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Part 2 Definitions"
            clause="Standard symbols and units used throughout the Regulations conform to the SI system as defined by the Bureau International des Poids et Mesures (BIPM) and reproduced in BS ISO 80000."
            meaning={
              <>
                Every value in BS 7671 — Z<sub>s</sub>, I<sub>n</sub>, U<sub>0</sub>, t — is in SI
                units. If you write the wrong unit on a certificate (kΩ vs Ω, kVA vs VA, ms vs s)
                the verification record is invalid. The regulations and the standard go together.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Part 2 (Definitions)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.2(c)(i)–(iv) (supply characteristics documentation)"
            clause="The documentation shall include values and tolerances: nominal voltage and voltage tolerances; nominal frequency and frequency tolerances; maximum current allowable; and prospective fault current. Designers shall determine and record these supply characteristics at the design and verification stages."
            meaning={
              <>
                Reg 132.2(c)(i)–(iv) lists what you record about the supply at the design and
                verification stages — voltage in volts, frequency in hertz, prospective fault
                current in amperes (or kA at higher levels). Each value lives in a specific SI
                unit and each value carries a prefix discipline. A &quot;230&quot; left without a
                unit on an EIC is meaningless; &quot;230 V (50 Hz)&quot; is what the
                verification record requires.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.2(c)(i)–(iv) — verbatim from published facets."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 311.1"
            clause="For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined as required by Regulation 311.1. When determining the maximum demand of an installation or part thereof, diversity may be taken into account."
            meaning={
              <>
                Reg 311.1 needs the answer in amperes — not kVA, not kW. The maths chain runs:
                connected load (kW or kVA) → power factor → current per line (A) → diversity
                applied → maximum demand (A). The unit conversions from kW through cos φ to A
                require confident SI handling. Any prefix slip (kVA written as VA, mA written as
                A) flows through into the supply rating, the cable selection and the EIC entry.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 311.1 — maximum demand."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>The prefix ladder</ContentEyebrow>

          <ConceptBlock
            title="Step in factors of 1000"
            plainEnglish="Prefixes scale a unit by a power of ten. Engineering prefixes step in 1000s (10³). centi and deci exist but you rarely use them in electrical work."
          >
            <p className="text-white/80 text-sm">Going up:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>tera (T)</strong> = 10¹² (rare — datacomms link bandwidth)</li>
              <li><strong>giga (G)</strong> = 10⁹ (insulation resistance: GΩ; PV inverter ratings)</li>
              <li><strong>mega (M)</strong> = 10⁶ (MΩ insulation, MVA transformers, MW farms)</li>
              <li><strong>kilo (k)</strong> = 10³ (kW, kVA, kΩ — daily use)</li>
            </ul>
            <p className="text-white/80 text-sm pt-2">Going down:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>milli (m)</strong> = 10⁻³ (mA, ms, mV — daily)</li>
              <li><strong>micro (μ)</strong> = 10⁻⁶ (μF capacitors, μA leakage, μs pulse)</li>
              <li><strong>nano (n)</strong> = 10⁻⁹ (nF capacitors, ns digital timing)</li>
              <li><strong>pico (p)</strong> = 10⁻¹² (pF capacitors in RF, pA leakage)</li>
            </ul>
            <p>
              Beware case: M = mega, m = milli — capital matters. MW is megawatt; mW is milliwatt
              — a billion times smaller. Same with K (kelvin) vs k (kilo). Get this wrong on a
              certificate and a 1 MΩ insulation resistance becomes 1 mΩ, which is a dead short.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <ConceptBlock
            title="Reading instrument displays — what those little symbols mean"
            plainEnglish="A multimeter showing 4.7 kΩ, an MFT showing 200 MΩ, an oscilloscope showing 50 ms — same prefix ladder."
            onSite="A Megger MFT displays insulation resistance with M, G or even Ω. A loop tester displays Z in Ω. A clamp meter switches between A and mA. Always note both the number AND the unit before writing it down."
          >
            <p>
              On a Megger MFT-1741 (or similar), the insulation resistance scale auto-ranges
              between MΩ and GΩ. A reading of 0.45 GΩ = 450 MΩ — both are massively over the 1 MΩ
              minimum required by BS 7671. A reading that drops onto the kΩ scale is a fault, full
              stop.
            </p>
            <p>
              Same with the loop test: Z<sub>s</sub> reads in Ω with two decimal places. 0.45 Ω is
              acceptable for a TN-S installation; 4.5 Ω might fail a 32 A circuit's disconnection
              time depending on the protective device.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Engineering notation — the calculator's ENG key"
            plainEnglish="Engineering notation is scientific notation with the exponent forced to a multiple of 3 — so it lines up directly with k, M, G, m, μ, n, p. The Casio ENG key cycles the answer through the prefix steps."
            onSite="A loop test reads 0.000462 Ω. Press ENG and the display becomes 462 × 10⁻⁶, i.e. 462 μΩ. One more press → 0.462 × 10⁻³ = 0.462 mΩ. No mental gymnastics, no missed prefix."
          >
            <p>Worked conversions you can do in your head once ENG is second nature:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0.0047 H → 4.7 × 10⁻³ H = 4.7 mH</li>
              <li>2 200 000 Ω → 2.2 × 10⁶ Ω = 2.2 MΩ</li>
              <li>0.000 000 33 F → 330 × 10⁻⁹ F = 330 nF</li>
              <li>15 750 W → 15.75 × 10³ W = 15.75 kW</li>
            </ul>
            <p>
              Engineering notation always sits on a prefix step (10³, 10⁶, 10⁹ etc.), which is
              why it matches what you write on certificates. Pure scientific notation can land on
              awkward exponents (10⁻⁵, 10⁷) that don't have a friendly prefix.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Symbol vs unit — knowing the difference saves marks"
            plainEnglish="The SYMBOL is the italic letter for the quantity (V for voltage, I for current, R for resistance). The UNIT is the upright letter for what it is measured in (V volts, A amperes, Ω ohms). Same letter often means different things."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>V</strong> (italic) = voltage quantity; <strong>V</strong> (upright) = unit volt.</li>
              <li><strong>I</strong> = current quantity (italic); ampere is the unit, symbol <strong>A</strong>.</li>
              <li><strong>P</strong> = power quantity; unit watt, symbol <strong>W</strong>.</li>
              <li><strong>F</strong> = force quantity; <strong>F</strong> (upright) = unit farad. Capacitance C is measured in F (farads), not the same F as force.</li>
              <li><strong>R</strong> = resistance quantity; unit ohm, symbol <strong>Ω</strong>.</li>
              <li><strong>L</strong> = inductance quantity OR length quantity (context decides); unit henry (H) for inductance, metre (m) for length.</li>
            </ul>
            <p>
              On the AM2 written paper the marker expects the right letter case and the right
              symbol. "P = 5 kw" loses the mark — the unit is kW (capital W).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Coherence — why SI is self-consistent"
            plainEnglish="The SI is coherent: every derived unit is built from base units with no extra conversion factors. 1 V × 1 A = 1 W. 1 W × 1 s = 1 J. The maths works without unit fudge factors as long as you stay in pure SI (no prefixes mid-calculation)."
          >
            <p>
              Worked example showing why coherence matters. A 230 V supply through a 10 Ω element:
              I = V/R = 230 / 10 = 23 A. P = V × I = 230 × 23 = 5290 W.
              Cross-check with P = V²/R = 230² / 10 = 52 900 / 10 = 5290 W. Identical answer — no
              fudge factor needed. Now try with mixed units: P = V × I × cos φ × 1000 (because
              someone wrote V in kV) — that's where errors creep in.
            </p>
            <p>
              Rule of thumb: convert everything to base SI units (V, A, Ω, s, F, H) at the start
              of the calculation, do the maths, then convert the answer to the prefix you want at
              the end. Mid-calculation prefix mixing is the most common AM2 error.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Capital vs lower-case prefix"
            whatHappens={
              <>
                Apprentice writes the insulation resistance result on the EICR as "200 mΩ".
                Tutor circles it with red pen — the actual reading was 200 MΩ. The lower-case m
                turns a perfect insulation result into a dead-short fault report.
              </>
            }
            doInstead={
              <>
                Capital M = mega = 10⁶. Lower-case m = milli = 10⁻³. They\'re a billion times
                apart. Train yourself to read the symbol, not just the number. Use the calculator\'s
                ENG button — it forces the answer onto a standard prefix step.
              </>
            }
          />

          <Scenario
            title="Reading a 3-phase transformer nameplate"
            situation={
              <>
                Site survey on an industrial unit. Transformer plate reads:
                <br />
                <strong>1600 kVA  11 000 V / 400 V  Dyn11  50 Hz</strong>
              </>
            }
            whatToDo={
              <>
                <strong>1600 kVA</strong> = 1.6 MVA = 1 600 000 VA — apparent power capacity.
                <br />
                <strong>11 000 V / 400 V</strong> = primary 11 kV, secondary 400 V (line-line).
                <br />
                <strong>50 Hz</strong> = mains frequency.
                <br />
                Secondary line current = S / (√3 × V<sub>L</sub>) = 1 600 000 / (1.732 × 400) =
                2309 A. That sets the size of the LV switchgear and incoming cable.
              </>
            }
            whyItMatters={
              <>
                Misreading the plate by one prefix turns a 1.6 MVA transformer into a 1.6 kVA
                supply, undersizing every cable downstream by 1000×. SI prefixes aren\'t pedantry —
                they\'re the difference between a working installation and an instant overload.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Seven SI base units: metre, kilogram, second, ampere, kelvin, mole, candela.',
              'Ten electrical derived units to memorise: V, A, Ω, W, J, F, H, Wb, T, Hz.',
              'Engineering prefixes step in 1000s: pico → nano → micro → milli → unit → kilo → mega → giga → tera.',
              'Capital M = mega (10⁶); lower-case m = milli (10⁻³). They are not interchangeable.',
              'Always write the unit alongside the number — 47 μF is not 47 μH and not 47 μA.',
              'Use the calculator ENG button to force results onto a standard prefix step.',
            ]}
          />

          <Quiz title="SI units and prefixes knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 Mathematical principles
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 Mechanics — force, work, energy
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
