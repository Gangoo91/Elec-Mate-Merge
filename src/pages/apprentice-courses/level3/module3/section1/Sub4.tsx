/**
 * Module 3 · Section 1 · Subsection 4 — Electrical energy, power and efficiency (AC 1.1)
 * Maps to C&G 2365-03 / Unit 302 / LO1 / AC 1.1
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 3.4
 *   AC 3.4 — "calculate values of electrical energy, power and efficiency"
 *
 * Energy in joules and kWh, power in watts, and the link between input and output for
 * real machines. Why a kWh-meter and a CT clamp tell different stories about the same
 * load.
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
  'Electrical energy, power and efficiency | Level 3 Module 3.1.4 (AC 1.1, 3.4) | Elec-Mate';
const DESCRIPTION =
  'Joules vs kWh, instantaneous power vs average power, and how to calculate the efficiency of a real motor or heater from name-plate data.';

const checks = [
  {
    id: 'l3-m3-1-4-energy',
    question:
      "A 3 kW immersion heater runs for 2 hours. How much energy does it consume in kWh?",
    options: [
      '1.5 kWh',
      '5 kWh',
      '60 kWh',
      '6 kWh',
    ],
    correctIndex: 3,
    explanation: 'Energy = power × time = 3 kW × 2 h = 6 kWh.',
  },
  {
    id: 'l3-m3-1-4-joules',
    question: 'Convert 6 kWh into joules.',
    options: [
      '6000 J',
      '21.6 × 10⁶ J',
      '21 600 J',
      '6 × 10⁹ J',
    ],
    correctIndex: 1,
    explanation:
      '1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J. So 6 kWh = 6 × 3.6 × 10⁶ = 21.6 × 10⁶ J = 21.6 MJ.',
  },
  {
    id: 'l3-m3-1-4-eff',
    question:
      'A 5 kW (output) motor runs at 87 % efficiency at full load. What is the input power?',
    options: [
      '4.35 kW',
      '6.0 kW',
      '5.75 kW',
      '5.0 kW',
    ],
    correctIndex: 2,
    explanation:
      'P_in = P_out / η = 5000 / 0.87 = 5747 W ≈ 5.75 kW. Always size the supply for the input.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: '1 kWh in joules is approximately:',
    options: [
      '1000 J',
      '3.6 × 10⁶ J',
      '3 600 J',
      '3.6 × 10⁹ J',
    ],
    correctAnswer: 1,
    explanation: '1 kWh = 1000 W × 3600 s = 3 600 000 J = 3.6 MJ.',
  },
  {
    id: 2,
    question:
      "A 9 kW shower runs for 10 minutes. Energy consumed:",
    options: [
      '90 kWh',
      '0.9 kWh',
      '1.5 kWh',
      '9 kJ',
    ],
    correctAnswer: 2,
    explanation:
      '10 minutes = 1/6 hour. E = P × t = 9 × (1/6) = 1.5 kWh. (Equivalently, 5.4 MJ.)',
  },
  {
    id: 3,
    question:
      'A motor draws 12 A at 230 V single phase, power factor 0.85. Input power is:',
    options: [
      '2.76 kW',
      '1.62 kW',
      '5.41 kW',
      '2.35 kW',
    ],
    correctAnswer: 3,
    explanation: 'P = V × I × pf = 230 × 12 × 0.85 = 2346 W ≈ 2.35 kW.',
  },
  {
    id: 4,
    question:
      'Same motor outputs 1.9 kW mechanical. Efficiency =',
    options: [
      '81 %',
      '75 %',
      '65 %',
      '95 %',
    ],
    correctAnswer: 0,
    explanation:
      'η = output / input × 100 = 1900 / 2346 × 100 ≈ 81 %.',
  },
  {
    id: 5,
    question:
      'A 100 W LED lamp replaces a 500 W halogen for 1000 hours. Energy saved:',
    options: [
      '300 kWh',
      '400 kWh',
      '500 kWh',
      '100 kWh',
    ],
    correctAnswer: 1,
    explanation:
      'Saved power = 400 W. Over 1000 h = 400 kWh. At ~30 p/kWh, that is roughly £120 saved.',
  },
  {
    id: 6,
    question: 'Instantaneous power in DC equals:',
    options: [
      'VI cos φ',
      'VI / R',
      'V × I',
      'V²I',
    ],
    correctAnswer: 2,
    explanation:
      'DC has no phase angle. P = V × I directly. Power factor (cos φ) only appears in AC.',
  },
  {
    id: 7,
    question:
      'A 3 kW heater on a 230 V supply draws what current?',
    options: [
      '7.2 A',
      '23.0 A',
      '15.0 A',
      '13.0 A',
    ],
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

const faqs = [
  {
    question: 'Are kWh and kVAh the same thing?',
    answer:
      "No. kWh is real energy used (true power × time). kVAh is apparent energy (apparent power × time). For a unity-PF load (heater) they're equal. For an inductive load (motor, fluorescent gear) the kVAh is bigger than the kWh — and that's what triggers DNO penalty charges on industrial bills.",
  },
  {
    question: "Why does my shower draw more than 13 A — won't it trip the socket?",
    answer:
      "It would trip a socket. Showers are wired as their own dedicated radial in 6 mm² or 10 mm² cable, protected by a 32 A or 40 A MCB, never on a 13 A plug. The supply is sized for the input current, which for a 9 kW shower at 230 V is 39 A.",
  },
  {
    question: 'How accurate is the kWh meter on the wall?',
    answer:
      "Domestic class 2 meters are within ±2 %. Industrial revenue meters are class 1 (±1 %) or class 0.5. Smart meters communicate the same accuracy class to the DNO. For energy-audit work that's enough — but for a power-quality investigation you'd use a proper power analyser.",
  },
  {
    question: "Why does an LED lamp save so much when the watts only drop from 60 to 8?",
    answer:
      "Energy is power × time. A 60 W incandescent on for 8 hours/day uses 60 × 8 = 480 Wh = 0.48 kWh per day. Over a year that's 175 kWh. The 8 W LED replacement is 23 kWh — saving 152 kWh per lamp per year. Multiply by every lamp in a building and the savings are huge.",
  },
  {
    question: 'Can a motor ever be more than 100 % efficient?',
    answer:
      "No. Energy is conserved. The only way to get more out than in is if there is a hidden energy source (a regen system feeding back from braking, for example). Real motor efficiencies range from 60 % (small fractional-HP) to 95+ % (large industrial premium-efficiency motors).",
  },
  {
    question: "Why is a kettle's input power exactly its output power?",
    answer:
      "Because the input is electrical and the desired output is heat — and ALL the electrical energy turns into heat (in the element, in the lead, in the switch contacts). Even the small wasted bit is still heat, and it's still in the kettle, so from the user's point of view efficiency is 100 %.",
  },
];

export default function Sub4() {
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
            eyebrow="Module 3 · Section 1 · Subsection 4"
            title="Electrical energy, power and efficiency"
            description="Joules and kilowatt-hours. Input vs output power. The maths behind every motor sizing, every energy audit and every kWh on a customer's bill."
            tone="yellow"
          />

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
            <p>
              In SI, P in watts and t in seconds gives E in joules. For practical bills we use:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>P in kilowatts (kW), t in hours (h) → E in kilowatt-hours (kWh).</li>
              <li>1 kWh = 1000 W × 3600 s = 3 600 000 J = 3.6 MJ.</li>
              <li>1 MWh = 1000 kWh = 3.6 × 10⁹ J = 3.6 GJ.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />

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
              <li><strong>P (real, W) = V × I × cos φ</strong> — what the kWh meter records and you pay for.</li>
              <li><strong>S (apparent, VA) = V × I</strong> — what the cable and protective device see.</li>
              <li><strong>Q (reactive, VAr) = V × I × sin φ</strong> — energy oscillating in the inductance/capacitance, not consumed.</li>
            </ul>
            <p>
              You'll spend Section 3 on this. For now, recognise that AC power has three flavours
              and only the W flavour shows on your bill.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The four power quantities — and which one matters"
            plainEnglish="At AC you have FOUR power numbers floating around: real (W), apparent (VA), reactive (var), and instantaneous (rapidly varying). The kWh meter charges you for real power. The cable carries apparent. The DNO penalty looks at reactive."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Real power P (W)</strong> = V × I × cos φ. Energy actually consumed (turned into heat, motion, light).</li>
              <li><strong>Apparent power S (VA)</strong> = V × I. What the cable and protective device "see".</li>
              <li><strong>Reactive power Q (var)</strong> = V × I × sin φ. Energy oscillating between supply and inductance/capacitance — never consumed but still loads the cable.</li>
              <li><strong>Instantaneous power p(t)</strong> = v(t) × i(t). Varies twice per cycle; what an oscilloscope shows.</li>
            </ul>
            <p>
              Power triangle: S² = P² + Q². Worked example — 230 V, 10 A, cos φ = 0.7.
              S = 2300 VA, P = 1610 W, Q = √(2300² − 1610²) = √(5 290 000 − 2 592 100) = √2 697 900
              ≈ 1643 var. Sanity check: V × I × sin φ where sin φ = √(1 − 0.7²) = √0.51 = 0.714.
              Q = 230 × 10 × 0.714 = 1642 var. Matches.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="3-phase power needs √3"
            plainEnglish="Three-phase systems have three lines and a neutral. The total power across all three lines is √3 (≈ 1.732) times the line voltage times the line current times the power factor. The √3 comes from the geometry of the three sine waves being 120° apart."
          >
            <p>
              <strong>P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ</strong>
            </p>
            <p>
              Example: a 400 V 3-phase motor draws 25 A at pf = 0.85.
              P = 1.732 × 400 × 25 × 0.85 = 14 722 W ≈ 14.7 kW.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Efficiency calculations</ContentEyebrow>

          <ConceptBlock
            title="Efficiency = useful output / total input"
            plainEnglish="Whatever fraction of the energy that comes in actually does the job you want. The rest leaves as heat, sound or vibration."
          >
            <p>
              <strong>η = P<sub>out</sub> / P<sub>in</sub> × 100 %</strong>
            </p>
            <p>
              For a motor:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Output = mechanical shaft power (the kW figure on the plate).</li>
              <li>Input = electrical power drawn from the supply.</li>
              <li>Loss = input − output. Mostly heat in windings (I²R) and in the iron core.</li>
            </ul>
            <p>
              IE3 (Premium Efficiency) and IE4 (Super Premium) are the modern UK ratings under
              BS EN 60034-30-1. A 7.5 kW IE3 induction motor is around 90.4 % efficient at full
              load — input ≈ 8.3 kW.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cable losses (I²R) — the hidden efficiency drag"
            plainEnglish="Every metre of cable has resistance. Current flowing through resistance dissipates power as heat (P_loss = I²R). On long runs and high currents, those losses are real money — and they appear nowhere on the customer's appliance plate."
            onSite="A 30 m run of 6 mm² T&E (R ≈ 0.0031 Ω/m one way, so 0.186 Ω total round-trip on the live + neutral) carrying 32 A continuously: P_loss = 32² × 0.186 = 190 W. Over a year at 8 h/day: 190 × 8 × 365 / 1000 = 555 kWh wasted in the cable as heat. Upsize to 10 mm² and losses drop ~60 %."
          >
            <p>
              Cable losses scale with the SQUARE of current. Doubling the load quadruples the
              loss. That's why long, heavily loaded sub-mains are often deliberately oversized
              beyond the volt-drop minimum — to cut I²R losses below the cost of the bigger cable
              over its lifetime.
            </p>
            <p>
              For a 3-phase feeder, total cable loss = 3 × I² × R per phase (each line conductor
              dissipates separately). On a 100 A 3-phase supply through 50 m of 35 mm² SWA
              (R ≈ 0.524 mΩ/m × 50 m = 0.0262 Ω): per phase loss = 100² × 0.0262 = 262 W. Total
              = 786 W continuous heat in the cable.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60034-30-1:2014 — Rotating electrical machines — Efficiency classes"
            clause="The standard defines efficiency classes (IE1 Standard, IE2 High, IE3 Premium, IE4 Super Premium) for line-operated AC induction motors from 0.12 kW to 1000 kW. IE3 minimum efficiency is mandatory in the UK and EU for most general-purpose induction motors."
            meaning={
              <>
                When you replace an old motor, the IE rating on the plate sets the efficiency you
                must meet to comply with the Ecodesign Regulation 2019/1781 (UK retained law). An
                IE2 motor is generally no longer compliant; IE3 is the floor and IE4 is preferred.
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
                intended use — which means cables, terminations and protective devices stay
                within their thermal ratings under the actual operating power. The energy and
                power calculations in this Sub (P = VI cos φ for AC, I²R loss for cables, η for
                motors) are the maths the skilled person uses to get that right at design.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 132.1 — design of electrical installations."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.201"
            clause="Where the protective device is a general-purpose type (gG) fuse to BS 88-2, a fuse to BS 88-3, a circuit-breaker to BS EN 60898, a circuit-breaker to BS EN 60947-2 or a residual current circuit-breaker with integral overcurrent protection (RCBO) to BS EN 61009-1, compliance with conditions (a) and (b) also results in compliance with condition (c) of Regulation 433.1.1."
            meaning={
              <>
                Overload coordination sits on top of the power-and-current calculation. From this
                Sub: I<sub>B</sub> = P / (V × cos φ) for single-phase or P / (√3 × V<sub>L</sub>{' '}
                × cos φ) for three-phase. The protective device must satisfy I<sub>B</sub> ≤
                I<sub>n</sub> ≤ I<sub>z</sub> (conditions a and b). When the device is one of
                the listed standard types — BS 88 fuse, BS EN 60898 MCB, BS EN 60947-2 MCCB or
                BS EN 61009-1 RCBO — meeting conditions (a) and (b) automatically delivers the
                I<sub>2</sub> ≤ 1.45 × I<sub>z</sub> rule (condition c). Get cos φ wrong, get
                I<sub>B</sub> wrong, and the breaker either nuisance-trips or under-protects
                the cable.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 433.1.201 — coordination with standard protective devices."
          />

          <InlineCheck {...checks[2]} />

          <ConceptBlock
            title="Annual cost from continuous-load data — the kWh rule"
            plainEnglish="Customers often ask 'what does that lamp cost to run?' or 'how much does the heat-pump add to my bill?'. Annual cost = power (kW) × hours per year × pence per kWh ÷ 100 (for £)."
            onSite="A typical commercial unit at 30 p/kWh, 12 h/day, 250 days/year for a 1.5 kW load: 1.5 × 12 × 250 × 30 / 100 = £1350/year. That's per kilowatt of continuous demand. Multiply across a building and the customer sees instantly which loads dominate the bill."
          >
            <p>
              Worked examples (UK 30 p/kWh):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>9 kW shower, 8 min/day = 0.133 h/day → 9 × 0.133 × 365 × 0.30 = £131/year.</li>
              <li>3 kW immersion heater, 2 h/day → 3 × 2 × 365 × 0.30 = £657/year.</li>
              <li>60 W incandescent lamp, 5 h/day → 0.06 × 5 × 365 × 0.30 = £33/year.</li>
              <li>8 W LED equivalent → £4.40/year. Saving £29/lamp/year.</li>
              <li>2 kW heat-pump averaging 4 h/day → 2 × 4 × 365 × 0.30 = £876/year (compared with 8 kW resistive: £3504/year — heat-pump saves ~£2600/year).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Forgetting the time unit when converting energy"
            whatHappens={
              <>
                Sum says: a 2 kW load runs for 30 minutes. Energy in joules? Apprentice writes
                2000 × 30 = 60 000 J. Wrong by a factor of 60 — the time was in MINUTES, not
                seconds.
              </>
            }
            doInstead={
              <>
                Convert minutes to seconds first. 30 min = 1800 s. E = 2000 W × 1800 s = 3 600 000
                J = 3.6 MJ. (Or for kWh: 2 kW × 0.5 h = 1 kWh, which by the conversion is 3.6 MJ
                — same answer.)
              </>
            }
          />

          <Scenario
            title="Annual cost of an inefficient pump replaced with a VFD-controlled IE4"
            situation={
              <>
                Site has a 22 kW IE2 pump motor at 89 % efficiency, running 16 hours/day, 350
                days/year, average load 70 % of full. You\'re costing a replacement with an
                IE4 motor (94 % efficiency) plus a VFD that lets it run at the actual load
                instead of full speed.
              </>
            }
            whatToDo={
              <>
                Old: average input = 22 × 0.7 / 0.89 = 17.3 kW. Annual hours = 16 × 350 = 5600.
                Energy = 17.3 × 5600 = 96 880 kWh.
                <br />
                New (IE4 + VFD reducing motor demand to 50 % of full because affinity laws): ~11
                kW × 0.94 efficiency → input ≈ 11.7 kW. Energy = 11.7 × 5600 = 65 520 kWh.
                <br />
                Savings = 31 360 kWh/year. At 18 p/kWh commercial = £5645/year.
              </>
            }
            whyItMatters={
              <>
                Two efficiency improvements (motor class + VFD) can pay for themselves in 18-24
                months on a high-duty-cycle application. The maths in this Sub is exactly what an
                M&E energy audit boils down to.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

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

          <Quiz title="Energy, power and efficiency knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.3 Mechanics
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.5 Measuring instruments
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
