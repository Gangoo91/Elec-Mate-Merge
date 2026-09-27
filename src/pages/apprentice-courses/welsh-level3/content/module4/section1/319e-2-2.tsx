/**
 * Ported from the English course, combining:
 *   level3/module3/section1/Sub2.tsx
 *   level3/module3/section1/Sub4.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
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

const checks = [
  {
    id: 'l3-m3-1-2-prefix',
    question: 'A capacitor is marked 47 μF. Express that in farads using scientific notation.',
    options: ['4.7 × 10⁻⁹ F', '4.7 × 10⁻⁵ F', '4.7 × 10⁻³ F', '4.7 × 10⁻⁶ F'],
    correctIndex: 1,
    explanation:
      'Micro is 10⁻⁶, so 47 μF = 47 × 10⁻⁶ F. Normalising to one digit before the point gives 4.7 × 10⁻⁵ F.',
  },
  {
    id: 'l3-m3-1-2-derived',
    question: 'Which of these is the SI unit of magnetic flux?',
    options: ['Tesla (T)', 'Henry (H)', 'Weber (Wb)', 'Farad (F)'],
    correctIndex: 2,
    explanation:
      'Weber (Wb) is total flux. Tesla (T) is flux density (Wb/m²). Henry (H) is inductance, Farad (F) is capacitance.',
  },
  {
    id: 'l3-m3-1-2-convert',
    question: 'A transformer plate reads 1.6 MVA. How many VA is that?',
    options: ['1 600 000 VA', '1600 VA', '16 000 VA', '160 000 VA'],
    correctIndex: 0,
    explanation:
      'Mega is 10⁶, so 1.6 MVA = 1.6 × 10⁶ VA = 1 600 000 VA. Reading the M as kilo (giving 1600) undersizes the supply 1000-fold.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which is the SI base unit of electric current?',
    options: ['Coulomb', 'Ampere', 'Volt', 'Watt'],
    correctAnswer: 1,
    explanation:
      'The ampere is the SI base unit of current. The coulomb (charge), volt (potential difference) and watt (power) are all derived units, not base units.',
  },
  {
    id: 2,
    question: 'The unit of capacitance is:',
    options: ['Henry', 'Weber', 'Farad', 'Tesla'],
    correctAnswer: 2,
    explanation:
      'Capacitance is measured in farads (1 F = 1 coulomb per volt). Henry is inductance, weber is magnetic flux and tesla is flux density.',
  },
  {
    id: 3,
    question: 'Convert 0.000 22 H (henry) to milli-henries (mH).',
    options: ['22 mH', '0.022 mH', '220 mH', '0.22 mH'],
    correctAnswer: 3,
    explanation:
      '0.000 22 H = 2.2 × 10⁻⁴ H. Milli is 10⁻³, so multiply by 1000: 2.2 × 10⁻⁴ × 10³ = 0.22 mH.',
  },
  {
    id: 4,
    question: 'Power is measured in:',
    options: ['Watts', 'Joules', 'Volts', 'Coulombs'],
    correctAnswer: 0,
    explanation:
      'Power is in watts (1 W = 1 joule per second). Joules measure energy, not the rate at which it is transferred — power is that rate.',
  },
  {
    id: 5,
    question: 'Which prefix represents 10⁻¹²?',
    options: ['nano', 'pico', 'femto', 'micro'],
    correctAnswer: 1,
    explanation:
      'Pico is 10⁻¹² (as in picofarad, pF). The adjacent rungs are nano at 10⁻⁹, micro at 10⁻⁶ and femto at 10⁻¹⁵.',
  },
  {
    id: 6,
    question: 'A 50 nF capacitor in pF is:',
    options: ['50 pF', '5 000 pF', '50 000 pF', '500 000 pF'],
    correctAnswer: 2,
    explanation: 'Nano is 10⁻⁹ and pico is 10⁻¹², so 1 nF = 1000 pF. 50 nF × 1000 = 50 000 pF.',
  },
  {
    id: 7,
    question: 'Magnetic flux density (B) is measured in:',
    options: ['weber (Wb)', 'ampere-turns (At)', 'henry (H)', 'tesla (T)'],
    correctAnswer: 3,
    explanation:
      'Flux density is in teslas (1 T = 1 Wb/m²). Weber is total flux, ampere-turns is magnetomotive force and henry is inductance.',
  },
  {
    id: 8,
    question: 'Resistance of a heater = 23 Ω. Expressed in milliohms, that is:',
    options: ['23 000 mΩ', '23 000 000 mΩ', '0.023 mΩ', '2.3 mΩ'],
    correctAnswer: 0,
    explanation:
      'Milli is 10⁻³, so 1 Ω = 1000 mΩ. 23 × 1000 = 23 000 mΩ. Dividing by 1000 (giving 0.023) is the common slip.',
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
      'Weber (Wb) is total magnetic flux through a coil — the absolute amount. Tesla (T) is flux per square metre — the density. A small magnet might have a high flux density (T) over a tiny area but low total flux (Wb). Transformers care about both: peak flux density to avoid saturation, total flux for EMF generation.',
  },
  {
    question: 'I never see femto or atto on site. Why are they on the list?',
    answer:
      "You won't on installation work. They appear in datasheets for high-frequency electronics — RF transistor capacitances, semiconductor leakage currents. Worth knowing the ladder exists; you don't need them daily.",
  },
  {
    question: 'Is the unit Hz the same as cycles per second?',
    answer:
      'Yes. 1 Hz = 1 cycle per second. UK mains is 50 Hz — the AC voltage completes 50 full sine-wave cycles every second. The unit is named after Heinrich Hertz.',
  },
  {
    question: 'Why is the kilogram the only base unit with a prefix in its name?',
    answer:
      "Historical accident. The original SI definitions defined the kilogram as the base unit (the lump of metal in Paris), so multiples are built from kg, not g. Don't write 1 kkg for 1 tonne — that's not a valid SI form.",
  },
  {
    question: 'How do I remember the prefix ladder?',
    answer:
      'Memorise three rungs at a time: pico nano micro (going down), kilo mega giga (going up), then milli centi deci between. Each step is 1000 (10³) except for centi (10⁻²) and deci (10⁻¹), which are non-engineering steps you rarely use in electrical work.',
  },
];

const checks2 = [
  {
    id: 'l3-m3-1-4-energy',
    question: 'A 3 kW immersion heater runs for 2 hours. How much energy does it consume in kWh?',
    options: ['1.5 kWh', '5 kWh', '60 kWh', '6 kWh'],
    correctIndex: 3,
    explanation: 'Energy = power × time = 3 kW × 2 h = 6 kWh.',
  },
  {
    id: 'l3-m3-1-4-joules',
    question: 'Convert 6 kWh into joules.',
    options: ['6000 J', '21.6 × 10⁶ J', '21 600 J', '6 × 10⁹ J'],
    correctIndex: 1,
    explanation:
      '1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J. So 6 kWh = 6 × 3.6 × 10⁶ = 21.6 × 10⁶ J = 21.6 MJ.',
  },
  {
    id: 'l3-m3-1-4-eff',
    question:
      'A 5 kW (output) motor runs at 87 % efficiency at full load. What is the input power?',
    options: ['4.35 kW', '6.0 kW', '5.75 kW', '5.0 kW'],
    correctIndex: 2,
    explanation:
      'P_in = P_out / η = 5000 / 0.87 = 5747 W ≈ 5.75 kW. Always size the supply for the input.',
  },
];

const quizQuestions2 = [
  {
    id: 1,
    question: '1 kWh in joules is approximately:',
    options: ['1000 J', '3.6 × 10⁶ J', '3 600 J', '3.6 × 10⁹ J'],
    correctAnswer: 1,
    explanation: '1 kWh = 1000 W × 3600 s = 3 600 000 J = 3.6 MJ.',
  },
  {
    id: 2,
    question: 'A 9 kW shower runs for 10 minutes. Energy consumed:',
    options: ['90 kWh', '0.9 kWh', '1.5 kWh', '9 kJ'],
    correctAnswer: 2,
    explanation: '10 minutes = 1/6 hour. E = P × t = 9 × (1/6) = 1.5 kWh. (Equivalently, 5.4 MJ.)',
  },
  {
    id: 3,
    question: 'A motor draws 12 A at 230 V single phase, power factor 0.85. Input power is:',
    options: ['2.76 kW', '1.62 kW', '5.41 kW', '2.35 kW'],
    correctAnswer: 3,
    explanation: 'P = V × I × pf = 230 × 12 × 0.85 = 2346 W ≈ 2.35 kW.',
  },
  {
    id: 4,
    question: 'Same motor outputs 1.9 kW mechanical. Efficiency =',
    options: ['81 %', '75 %', '65 %', '95 %'],
    correctAnswer: 0,
    explanation: 'η = output / input × 100 = 1900 / 2346 × 100 ≈ 81 %.',
  },
  {
    id: 5,
    question: 'A 100 W LED lamp replaces a 500 W halogen for 1000 hours. Energy saved:',
    options: ['300 kWh', '400 kWh', '500 kWh', '100 kWh'],
    correctAnswer: 1,
    explanation:
      'Saved power = 400 W. Over 1000 h = 400 kWh. At ~30 p/kWh, that is roughly £120 saved.',
  },
  {
    id: 6,
    question: 'Instantaneous power in DC equals:',
    options: ['VI cos φ', 'VI / R', 'V × I', 'V²I'],
    correctAnswer: 2,
    explanation:
      'DC has no phase angle. P = V × I directly. Power factor (cos φ) only appears in AC.',
  },
  {
    id: 7,
    question: 'A 3 kW heater on a 230 V supply draws what current?',
    options: ['7.2 A', '23.0 A', '15.0 A', '13.0 A'],
    correctAnswer: 3,
    explanation:
      'I = P / V = 3000 / 230 = 13.04 A. That is why typical immersion circuits are wired in 2.5 mm² with a 16 A protective device or 6.0 mm² for 9 kW showers at ~39 A.',
  },
  {
    id: 8,
    question: 'Why is a heating element near 100 % efficient but a motor only ~85-90 %?',
    options: [
      'A heater turns ALL its electrical energy into the desired output (heat); a motor wastes some as heat instead of motion',
      'A heater runs on DC while a motor runs on AC, and AC is inherently less efficient',
      'A motor has a higher power factor, which always reduces its measured efficiency',
      'A heater is rated in kW and a motor in kVA, so the figures cannot be compared directly',
    ],
    correctAnswer: 0,
    explanation:
      'Heaters intentionally turn electrical energy into heat — efficiency from a useful-output perspective is ~100 %. Motors want motion; the heat in their windings is loss, hence efficiency under 100 %.',
  },
];

const faqs2 = [
  {
    question: 'Are kWh and kVAh the same thing?',
    answer:
      "No. kWh is real energy used (true power × time). kVAh is apparent energy (apparent power × time). For a unity-PF load (heater) they're equal. For an inductive load (motor, fluorescent gear) the kVAh is bigger than the kWh — and that's what triggers DNO penalty charges on industrial bills.",
  },
  {
    question: "Why does my shower draw more than 13 A — won't it trip the socket?",
    answer:
      'It would trip a socket. Showers are wired as their own dedicated radial in 6 mm² or 10 mm² cable, protected by a 32 A or 40 A MCB, never on a 13 A plug. The supply is sized for the input current, which for a 9 kW shower at 230 V is 39 A.',
  },
  {
    question: 'How accurate is the kWh meter on the wall?',
    answer:
      "Domestic class 2 meters are within ±2 %. Industrial revenue meters are class 1 (±1 %) or class 0.5. Smart meters communicate the same accuracy class to the DNO. For energy-audit work that's enough — but for a power-quality investigation you'd use a proper power analyser.",
  },
  {
    question: 'Why does an LED lamp save so much when the watts only drop from 60 to 8?',
    answer:
      "Energy is power × time. A 60 W incandescent on for 8 hours/day uses 60 × 8 = 480 Wh = 0.48 kWh per day. Over a year that's 175 kWh. The 8 W LED replacement is 23 kWh — saving 152 kWh per lamp per year. Multiply by every lamp in a building and the savings are huge.",
  },
  {
    question: 'Can a motor ever be more than 100 % efficient?',
    answer:
      'No. Energy is conserved. The only way to get more out than in is if there is a hidden energy source (a regen system feeding back from braking, for example). Real motor efficiencies range from 60 % (small fractional-HP) to 95+ % (large industrial premium-efficiency motors).',
  },
  {
    question: "Why is a kettle's input power exactly its output power?",
    answer:
      "Because the input is electrical and the desired output is heat — and ALL the electrical energy turns into heat (in the element, in the lead, in the switch contacts). Even the small wasted bit is still heat, and it's still in the kettle, so from the user's point of view efficiency is 100 %.",
  },
];

export default function Lesson319E_2_2() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Seven base units. Twenty derived units. A prefix ladder from pico to tera. Read any
        datasheet, plate or instrument display fluently.
      </p>

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
            <strong>metre (m)</strong> — length. Cable run lengths, conductor cross-section (mm²),
            distance between current-carrying conductors.
          </li>
          <li>
            <strong>kilogram (kg)</strong> — mass. Mostly mechanical work — motor torque, weight
            of a luminaire on a fixing, mass of copper in a winding.
          </li>
          <li>
            <strong>second (s)</strong> — time. RC time constants, RCD trip times, motor run-up
            time.
          </li>
          <li>
            <strong>ampere (A)</strong> — electric current. Flow of charge per second.
          </li>
          <li>
            <strong>kelvin (K)</strong> — temperature. Thermodynamic scale (0 K = −273.15 °C).
            Most installs work in °C, but °C and K share the same step size.
          </li>
          <li>
            <strong>mole (mol)</strong> — amount of substance. Used in electrochemistry (battery
            capacity, electroplating).
          </li>
          <li>
            <strong>candela (cd)</strong> — luminous intensity. Foundation of the lumen and lux
            used in lighting design (see the lesson on the principles of illumination).
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
            <strong>volt (V)</strong> — potential difference. 1 V = 1 J per coulomb. Energy per
            unit charge.
          </li>
          <li>
            <strong>ohm (Ω)</strong> — resistance. 1 Ω = 1 V per ampere.
          </li>
          <li>
            <strong>watt (W)</strong> — power. 1 W = 1 J per second = 1 V × 1 A.
          </li>
          <li>
            <strong>joule (J)</strong> — energy. 1 J = 1 W for 1 second. Energy bills are in kWh;
            1 kWh = 3.6 × 10⁶ J.
          </li>
          <li>
            <strong>farad (F)</strong> — capacitance. 1 F = 1 coulomb per volt. Practical
            capacitors are μF, nF, pF.
          </li>
          <li>
            <strong>henry (H)</strong> — inductance. 1 H = 1 V per A/s. Practical inductors are mH
            or μH; motor windings can be in tens of mH.
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
          <li>
            <strong>V/m</strong> — electric field strength. PVC insulation breaks down around 20
            kV/mm = 20 × 10⁶ V/m.
          </li>
          <li>
            <strong>A·t</strong> — ampere-turns (magnetomotive force). 200 turns × 2 A = 400 A·t
            drives flux through a transformer core.
          </li>
          <li>
            <strong>Wb/m²</strong> — magnetic flux density (1 T = 1 Wb/m²).
          </li>
          <li>
            <strong>J/(kg·K)</strong> — specific heat capacity. Copper ≈ 385 J/(kg·K) — used in
            adiabatic short-circuit cable temperature rise calcs (BS 7671 §434).
          </li>
          <li>
            <strong>Ω·m</strong> — resistivity (resistance × area / length).
          </li>
          <li>
            <strong>VA, var, W</strong> — three flavours of AC power; same dimensions, different
            physical meaning.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Part 2 Definitions"
        clause="Standard symbols and units used throughout the Regulations conform to the SI system as defined by the Bureau International des Poids et Mesures (BIPM) and reproduced in BS ISO 80000."
        meaning={
          <>
            Every value in BS 7671 — Z<sub>s</sub>, I<sub>n</sub>, U<sub>0</sub>, t — is in SI
            units. If you write the wrong unit on a certificate (kΩ vs Ω, kVA vs VA, ms vs s) the
            verification record is invalid. The regulations and the standard go together.
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
            verification stages — voltage in volts, frequency in hertz, prospective fault current
            in amperes (or kA at higher levels). Each value lives in a specific SI unit and each
            value carries a prefix discipline. A &quot;230&quot; left without a unit on an EIC is
            meaningless; &quot;230 V (50 Hz)&quot; is what the verification record requires.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 132.2(c)(i)–(iv) — supply characteristics."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 311.1"
        clause="For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined as required by Regulation 311.1. When determining the maximum demand of an installation or part thereof, diversity may be taken into account."
        meaning={
          <>
            Reg 311.1 needs the answer in amperes — not kVA, not kW. The maths chain runs:
            connected load (kW or kVA) → power factor → current per line (A) → diversity applied →
            maximum demand (A). The unit conversions from kW through cos φ to A require confident
            SI handling. Any prefix slip (kVA written as VA, mA written as A) flows through into
            the supply rating, the cable selection and the EIC entry.
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
          <li>
            <strong>tera (T)</strong> = 10¹² (rare — datacomms link bandwidth)
          </li>
          <li>
            <strong>giga (G)</strong> = 10⁹ (insulation resistance: GΩ; PV inverter ratings)
          </li>
          <li>
            <strong>mega (M)</strong> = 10⁶ (MΩ insulation, MVA transformers, MW farms)
          </li>
          <li>
            <strong>kilo (k)</strong> = 10³ (kW, kVA, kΩ — daily use)
          </li>
        </ul>
        <p className="text-white/80 text-sm pt-2">Going down:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>milli (m)</strong> = 10⁻³ (mA, ms, mV — daily)
          </li>
          <li>
            <strong>micro (μ)</strong> = 10⁻⁶ (μF capacitors, μA leakage, μs pulse)
          </li>
          <li>
            <strong>nano (n)</strong> = 10⁻⁹ (nF capacitors, ns digital timing)
          </li>
          <li>
            <strong>pico (p)</strong> = 10⁻¹² (pF capacitors in RF, pA leakage)
          </li>
        </ul>
        <p>
          Beware case: M = mega, m = milli — capital matters. MW is megawatt; mW is milliwatt — a
          billion times smaller. Same with K (kelvin) vs k (kilo). Get this wrong on a certificate
          and a 1 MΩ insulation resistance becomes 1 mΩ, which is a dead short.
        </p>
      </ConceptBlock>

      <InlineCheck {...checks[1]} />

      <ConceptBlock
        title="Reading instrument displays — what those little symbols mean"
        plainEnglish="A multimeter showing 4.7 kΩ, an MFT showing 200 MΩ, an oscilloscope showing 50 ms — same prefix ladder."
        onSite="A Megger MFT displays insulation resistance with M, G or even Ω. A loop tester displays Z in Ω. A clamp meter switches between A and mA. Always note both the number AND the unit before writing it down."
      >
        <p>
          On a Megger MFT-1741 (or similar), the insulation resistance scale auto-ranges between
          MΩ and GΩ. A reading of 0.45 GΩ = 450 MΩ — both are massively over the 1 MΩ minimum
          required by BS 7671. A reading that drops onto the kΩ scale is a fault, full stop.
        </p>
        <p>
          Same with the loop test: Z<sub>s</sub> reads in Ω with two decimal places. 0.45 Ω is
          acceptable for a TN-S installation; 4.5 Ω might fail a 32 A circuit's disconnection time
          depending on the protective device.
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
          Engineering notation always sits on a prefix step (10³, 10⁶, 10⁹ etc.), which is why it
          matches what you write on certificates. Pure scientific notation can land on awkward
          exponents (10⁻⁵, 10⁷) that don't have a friendly prefix.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Symbol vs unit — knowing the difference saves marks"
        plainEnglish="The SYMBOL is the italic letter for the quantity (V for voltage, I for current, R for resistance). The UNIT is the upright letter for what it is measured in (V volts, A amperes, Ω ohms). Same letter often means different things."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>V</strong> (italic) = voltage quantity; <strong>V</strong> (upright) = unit
            volt.
          </li>
          <li>
            <strong>I</strong> = current quantity (italic); ampere is the unit, symbol{' '}
            <strong>A</strong>.
          </li>
          <li>
            <strong>P</strong> = power quantity; unit watt, symbol <strong>W</strong>.
          </li>
          <li>
            <strong>F</strong> = force quantity; <strong>F</strong> (upright) = unit farad.
            Capacitance C is measured in F (farads), not the same F as force.
          </li>
          <li>
            <strong>R</strong> = resistance quantity; unit ohm, symbol <strong>Ω</strong>.
          </li>
          <li>
            <strong>L</strong> = inductance quantity OR length quantity (context decides); unit
            henry (H) for inductance, metre (m) for length.
          </li>
        </ul>
        <p>
          On the AM2 written paper the marker expects the right letter case and the right symbol.
          "P = 5 kw" loses the mark — the unit is kW (capital W).
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Coherence — why SI is self-consistent"
        plainEnglish="The SI is coherent: every derived unit is built from base units with no extra conversion factors. 1 V × 1 A = 1 W. 1 W × 1 s = 1 J. The maths works without unit fudge factors as long as you stay in pure SI (no prefixes mid-calculation)."
      >
        <p>
          Worked example showing why coherence matters. A 230 V supply through a 10 Ω element: I =
          V/R = 230 / 10 = 23 A. P = V × I = 230 × 23 = 5290 W. Cross-check with P = V²/R = 230² /
          10 = 52 900 / 10 = 5290 W. Identical answer — no fudge factor needed. Now try with mixed
          units: P = V × I × cos φ × 1000 (because someone wrote V in kV) — that's where errors
          creep in.
        </p>
        <p>
          Rule of thumb: convert everything to base SI units (V, A, Ω, s, F, H) at the start of
          the calculation, do the maths, then convert the answer to the prefix you want at the
          end. Mid-calculation prefix mixing is the most common AM2 error.
        </p>
      </ConceptBlock>

      <SectionRule />

      <CommonMistake
        title="Capital vs lower-case prefix"
        whatHappens={
          <>
            Apprentice writes the insulation resistance result on the EICR as "200 mΩ". Tutor
            circles it with red pen — the actual reading was 200 MΩ. The lower-case m turns a
            perfect insulation result into a dead-short fault report.
          </>
        }
        doInstead={
          <>
            Capital M = mega = 10⁶. Lower-case m = milli = 10⁻³. They’re a billion times apart.
            Train yourself to read the symbol, not just the number. Use the calculator’s ENG
            button — it forces the answer onto a standard prefix step.
          </>
        }
      />

      <Scenario
        title="Reading a 3-phase transformer nameplate"
        situation={
          <>
            Site survey on an industrial unit. Transformer plate reads:
            <br />
            <strong>1600 kVA 11 000 V / 400 V Dyn11 50 Hz</strong>
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
            Secondary line current = S / (√3 × V<sub>L</sub>) = 1 600 000 / (1.732 × 400) = 2309
            A. That sets the size of the LV switchgear and incoming cable.
          </>
        }
        whyItMatters={
          <>
            Misreading the plate by one prefix turns a 1.6 MVA transformer into a 1.6 kVA supply,
            undersizing every cable downstream by 1000×. SI prefixes aren’t pedantry — they’re
            the difference between a working installation and an instant overload.
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

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Joules and kilowatt-hours. Input vs output power. The maths behind every motor sizing,
        every energy audit and every kWh on a customer's bill.
      </p>

      <TLDR
        points={[
          'Energy = power × time. Watts × seconds = joules. Kilowatts × hours = kWh.',
          '1 kWh = 3.6 × 10⁶ J = 3.6 MJ. The kWh is what the meter charges you for.',
          'Efficiency η = (P_output / P_input) × 100 %. Heaters approach 100 %, motors typically 80-95 %.',
          'Always size the supply cable and protective device for INPUT current, not the motor plate output.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Calculate electrical energy in both joules and kilowatt-hours.',
          'Calculate input power for AC and DC loads using V, I and power factor.',
          'Calculate efficiency given input and output power.',
          'Convert motor plate (mechanical) power to electrical input current for cable sizing.',
          'Estimate annual energy consumption and cost from continuous-load data.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Energy — joules and kilowatt-hours</ContentEyebrow>

      <ConceptBlock
        title="Energy is the time integral of power"
        plainEnglish="Power tells you how fast energy is being used right now. Energy tells you the total amount used over a period. Multiply power by the time it ran for and you get energy."
        onSite="The kWh meter on the cut-out adds up the energy in kilowatt-hours. The bill multiplies kWh × pence per kWh. That's why a 100 W lamp left on for 1000 hours costs the same as a 1 kW heater on for 100 hours — both are 100 kWh."
      >
        <p>
          <strong>Energy (E) = Power (P) × time (t)</strong>
        </p>
        <p>In SI, P in watts and t in seconds gives E in joules. For practical bills we use:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>P in kilowatts (kW), t in hours (h) → E in kilowatt-hours (kWh).</li>
          <li>1 kWh = 1000 W × 3600 s = 3 600 000 J = 3.6 MJ.</li>
          <li>1 MWh = 1000 kWh = 3.6 × 10⁹ J = 3.6 GJ.</li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks2[0]} />
      <InlineCheck {...checks2[1]} />

      <SectionRule />

      <ContentEyebrow>Power — instantaneous and average</ContentEyebrow>

      <ConceptBlock
        title="DC power is just V × I"
        plainEnglish="On a DC circuit (battery, PV string, DC motor) power equals voltage times current. Simple multiplication, no phase angle."
      >
        <p>For DC:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>P = V × I</li>
          <li>P = I² × R (alternative — useful when you know current and resistance)</li>
          <li>P = V² / R (alternative — useful when you know voltage and resistance)</li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="AC single-phase power needs power factor"
        plainEnglish="On AC the voltage and current are sine waves. If the load is purely resistive (heater) they peak together and power = V × I. If the load is inductive (motor, fluorescent) the current lags the voltage and the real power transferred is less — multiplied by the cosine of the phase angle."
        onSite="A 230 V × 10 A = 2300 VA load. If it's a kettle (resistive, pf = 1.0), real power = 2300 W. If it's a motor at pf = 0.7, real power = 2300 × 0.7 = 1610 W. The same current, very different real-power demand."
      >
        <p>For single-phase AC:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>P (real, W) = V × I × cos φ</strong> — what the kWh meter records and you pay
            for.
          </li>
          <li>
            <strong>S (apparent, VA) = V × I</strong> — what the cable and protective device see.
          </li>
          <li>
            <strong>Q (reactive, VAr) = V × I × sin φ</strong> — energy oscillating in the
            inductance/capacitance, not consumed.
          </li>
        </ul>
        <p>
          You'll cover this properly in the section on transformers, power factor and three-phase
          systems. For now, recognise that AC power has three flavours and
          only the W flavour shows on your bill.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The four power quantities — and which one matters"
        plainEnglish="At AC you have FOUR power numbers floating around: real (W), apparent (VA), reactive (var), and instantaneous (rapidly varying). The kWh meter charges you for real power. The cable carries apparent. The DNO penalty looks at reactive."
      >
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Real power P (W)</strong> = V × I × cos φ. Energy actually consumed (turned
            into heat, motion, light).
          </li>
          <li>
            <strong>Apparent power S (VA)</strong> = V × I. What the cable and protective device
            "see".
          </li>
          <li>
            <strong>Reactive power Q (var)</strong> = V × I × sin φ. Energy oscillating between
            supply and inductance/capacitance — never consumed but still loads the cable.
          </li>
          <li>
            <strong>Instantaneous power p(t)</strong> = v(t) × i(t). Varies twice per cycle; what
            an oscilloscope shows.
          </li>
        </ul>
        <p>
          Power triangle: S² = P² + Q². Worked example — 230 V, 10 A, cos φ = 0.7. S = 2300 VA, P
          = 1610 W, Q = √(2300² − 1610²) = √(5 290 000 − 2 592 100) = √2 697 900 ≈ 1643 var.
          Sanity check: V × I × sin φ where sin φ = √(1 − 0.7²) = √0.51 = 0.714. Q = 230 × 10 ×
          0.714 = 1642 var. Matches.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="3-phase power needs √3"
        plainEnglish="Three-phase systems have three lines and a neutral. The total power across all three lines is √3 (≈ 1.732) times the line voltage times the line current times the power factor. The √3 comes from the geometry of the three sine waves being 120° apart."
      >
        <p>
          <strong>
            P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ
          </strong>
        </p>
        <p>
          Example: a 400 V 3-phase motor draws 25 A at pf = 0.85. P = 1.732 × 400 × 25 × 0.85 = 14
          722 W ≈ 14.7 kW.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Efficiency calculations</ContentEyebrow>

      <ConceptBlock
        title="Efficiency = useful output / total input"
        plainEnglish="Whatever fraction of the energy that comes in actually does the job you want. The rest leaves as heat, sound or vibration."
      >
        <p>
          <strong>
            η = P<sub>out</sub> / P<sub>in</sub> × 100 %
          </strong>
        </p>
        <p>For a motor:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>Output = mechanical shaft power (the kW figure on the plate).</li>
          <li>Input = electrical power drawn from the supply.</li>
          <li>Loss = input − output. Mostly heat in windings (I²R) and in the iron core.</li>
        </ul>
        <p>
          IE3 (Premium Efficiency) and IE4 (Super Premium) are the modern UK ratings under BS EN
          60034-30-1. A 7.5 kW IE3 induction motor is around 90.4 % efficient at full load — input
          ≈ 8.3 kW.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Cable losses (I²R) — the hidden efficiency drag"
        plainEnglish="Every metre of cable has resistance. Current flowing through resistance dissipates power as heat (P_loss = I²R). On long runs and high currents, those losses are real money — and they appear nowhere on the customer's appliance plate."
        onSite="A 30 m run of 6 mm² T&E (R ≈ 0.0031 Ω/m one way, so 0.186 Ω total round-trip on the live + neutral) carrying 32 A continuously: P_loss = 32² × 0.186 = 190 W. Over a year at 8 h/day: 190 × 8 × 365 / 1000 = 555 kWh wasted in the cable as heat. Upsize to 10 mm² and losses drop ~60 %."
      >
        <p>
          Cable losses scale with the SQUARE of current. Doubling the load quadruples the loss.
          That's why long, heavily loaded sub-mains are often deliberately oversized beyond the
          volt-drop minimum — to cut I²R losses below the cost of the bigger cable over its
          lifetime.
        </p>
        <p>
          For a 3-phase feeder, total cable loss = 3 × I² × R per phase (each line conductor
          dissipates separately). On a 100 A 3-phase supply through 50 m of 35 mm² SWA (R ≈ 0.524
          mΩ/m × 50 m = 0.0262 Ω): per phase loss = 100² × 0.0262 = 262 W. Total = 786 W
          continuous heat in the cable.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS EN 60034-30-1:2014 — Rotating electrical machines — Efficiency classes"
        clause="The standard defines efficiency classes (IE1 Standard, IE2 High, IE3 Premium, IE4 Super Premium) for line-operated AC induction motors from 0.12 kW to 1000 kW. IE3 minimum efficiency is mandatory in the UK and EU for most general-purpose induction motors."
        meaning={
          <>
            When you replace an old motor, the IE rating on the plate sets the efficiency you must
            meet to comply with the Ecodesign Regulation 2019/1781 (UK retained law). An IE2 motor
            is generally no longer compliant; IE3 is the floor and IE4 is preferred.
          </>
        }
        cite="Source: BS EN 60034-30-1:2014; Ecodesign for Energy-Related Products Regulations 2010 (as amended)."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.1"
        clause="The electrical installation shall be designed by one or more skilled persons to provide for: (a) the protection of persons, livestock and property in accordance with Section 131; and (b) the proper functioning of the electrical installation for the intended use."
        meaning={
          <>
            Reg 132.1 expects the design to deliver &quot;proper functioning&quot; for the
            intended use — which means cables, terminations and protective devices stay within
            their thermal ratings under the actual operating power. The energy and power
            calculations in this lesson (P = VI cos φ for AC, I²R loss for cables, η for motors) are
            the maths the skilled person uses to get that right at design.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 132.1 — design of electrical installations."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 433.1.201"
        clause="Where the protective device is a general-purpose type (gG) fuse to BS 88-2, a fuse to BS 88-3, a circuit-breaker to BS EN 60898, a circuit-breaker to BS EN 60947-2 or a residual current circuit-breaker with integral overcurrent protection (RCBO) to BS EN 61009-1, compliance with conditions (a) and (b) also results in compliance with condition (c) of Regulation 433.1.1."
        meaning={
          <>
            Overload coordination sits on top of the power-and-current calculation. From this lesson:
            I<sub>B</sub> = P / (V × cos φ) for single-phase or P / (√3 × V<sub>L</sub> × cos φ)
            for three-phase. The protective device must satisfy I<sub>B</sub> ≤ I<sub>n</sub> ≤ I
            <sub>z</sub> (conditions a and b). When the device is one of the listed standard types
            — BS 88 fuse, BS EN 60898 MCB, BS EN 60947-2 MCCB or BS EN 61009-1 RCBO — meeting
            conditions (a) and (b) automatically delivers the I<sub>2</sub> ≤ 1.45 × I<sub>z</sub>{' '}
            rule (condition c). Get cos φ wrong, get I<sub>B</sub> wrong, and the breaker either
            nuisance-trips or under-protects the cable.
          </>
        }
        cite="Source: BS 7671:2018+A4:2026, Regulation 433.1.201 — coordination with standard protective devices."
      />

      <InlineCheck {...checks2[2]} />

      <ConceptBlock
        title="Annual cost from continuous-load data — the kWh rule"
        plainEnglish="Customers often ask 'what does that lamp cost to run?' or 'how much does the heat-pump add to my bill?'. Annual cost = power (kW) × hours per year × pence per kWh ÷ 100 (for £)."
        onSite="A typical commercial unit at 30 p/kWh, 12 h/day, 250 days/year for a 1.5 kW load: 1.5 × 12 × 250 × 30 / 100 = £1350/year. That's per kilowatt of continuous demand. Multiply across a building and the customer sees instantly which loads dominate the bill."
      >
        <p>Worked examples (UK 30 p/kWh):</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>9 kW shower, 8 min/day = 0.133 h/day → 9 × 0.133 × 365 × 0.30 = £131/year.</li>
          <li>3 kW immersion heater, 2 h/day → 3 × 2 × 365 × 0.30 = £657/year.</li>
          <li>60 W incandescent lamp, 5 h/day → 0.06 × 5 × 365 × 0.30 = £33/year.</li>
          <li>8 W LED equivalent → £4.40/year. Saving £29/lamp/year.</li>
          <li>
            2 kW heat-pump averaging 4 h/day → 2 × 4 × 365 × 0.30 = £876/year (compared with 8 kW
            resistive: £3504/year — heat-pump saves ~£2600/year).
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <CommonMistake
        title="Forgetting the time unit when converting energy"
        whatHappens={
          <>
            Sum says: a 2 kW load runs for 30 minutes. Energy in joules? Apprentice writes 2000 ×
            30 = 60 000 J. Wrong by a factor of 60 — the time was in MINUTES, not seconds.
          </>
        }
        doInstead={
          <>
            Convert minutes to seconds first. 30 min = 1800 s. E = 2000 W × 1800 s = 3 600 000 J =
            3.6 MJ. (Or for kWh: 2 kW × 0.5 h = 1 kWh, which by the conversion is 3.6 MJ — same
            answer.)
          </>
        }
      />

      <Scenario
        title="Annual cost of an inefficient pump replaced with a VFD-controlled IE4"
        situation={
          <>
            Site has a 22 kW IE2 pump motor at 89 % efficiency, running 16 hours/day, 350
            days/year, average load 70 % of full. You’re costing a replacement with an IE4 motor
            (94 % efficiency) plus a VFD that lets it run at the actual load instead of full
            speed.
          </>
        }
        whatToDo={
          <>
            Old: average input = 22 × 0.7 / 0.89 = 17.3 kW. Annual hours = 16 × 350 = 5600. Energy
            = 17.3 × 5600 = 96 880 kWh.
            <br />
            New (IE4 + VFD reducing motor demand to 50 % of full because affinity laws): ~11 kW ×
            0.94 efficiency → input ≈ 11.7 kW. Energy = 11.7 × 5600 = 65 520 kWh.
            <br />
            Savings = 31 360 kWh/year. At 18 p/kWh commercial = £5645/year.
          </>
        }
        whyItMatters={
          <>
            Two efficiency improvements (motor class + VFD) can pay for themselves in 18-24 months
            on a high-duty-cycle application. The maths in this lesson is exactly what an M&E energy
            audit boils down to.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Energy = power × time. Use joules for SI work (J = W × s), kWh for bills (1 kWh = 3.6 MJ).',
          'DC power = V × I. Single-phase AC = V × I × cos φ. 3-phase = √3 × V_L × I_L × cos φ.',
          'Apparent power (VA) is what the cable carries; real power (W) is what the meter charges.',
          'Efficiency = output / input × 100 %. IE3 is the UK minimum class for general-purpose motors.',
          'Always size cable and protection for INPUT current, never the motor plate output.',
          'Replacing IE2 with IE3/IE4 plus VFD control commonly saves 25-40 % on continuous pump and fan loads.',
        ]}
      />

      <Quiz title="Energy, power and efficiency knowledge check" questions={quizQuestions2} />
    </div>
  );
}
