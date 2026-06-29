/**
 * Module 2 · Section 2 · Subsection 4 — Pipe Sizing and Pressure Drop
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Darcy-Weisbach, Moody chart, K-factors and equivalent lengths. The day-to-day
 *   calculation that sets pipe diameters, pump head and operating cost on every water
 *   system you design.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  SectionRule,
  FAQ,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Pipe Sizing and Pressure Drop - HNC Module 2 Section 2.4';
const DESCRIPTION =
  'Master pipe sizing calculations using Darcy-Weisbach equation, friction factors from Moody diagram, fitting losses with K factors, and CIBSE design tables for building services.';

const quickCheckQuestions = [
  {
    id: 'darcy-weisbach',
    question:
      "The Darcy-Weisbach equation calculates head loss as h_f = f(L/D)(v²/2g). What does 'f' represent?",
    options: ['Flow rate', 'Friction factor', 'Fluid density', 'Force'],
    correctIndex: 1,
    explanation:
      "The friction factor 'f' (also called Darcy friction factor) accounts for pipe wall roughness and flow conditions. It's determined from the Moody diagram using Reynolds number and relative roughness.",
  },
  {
    id: 'k-factor',
    question: 'A 90° elbow has K = 0.75. For flow at 2 m/s, what is the head loss? (g = 10 m/s²)',
    options: [
      '0.075 m',
      '0.30 m',
      '0.15 m',
      '1.5 m',
    ],
    correctIndex: 2,
    explanation:
      'Minor loss h = K × v²/2g = 0.75 × 2²/(2×10) = 0.75 × 0.2 = 0.15 m. K factors allow quick calculation of fitting losses without complex geometry analysis.',
  },
  {
    id: 'pipe-roughness',
    question: 'Which pipe material typically has the lowest absolute roughness?',
    options: [
      'Cast iron',
      'Galvanised steel',
      'Copper',
      'Concrete',
    ],
    correctIndex: 2,
    explanation:
      'Copper has very low roughness (ε ≈ 0.0015 mm) compared to galvanised steel (ε ≈ 0.15 mm) or cast iron (ε ≈ 0.26 mm). Lower roughness means lower friction factors and pressure drops.',
  },
  {
    id: 'cibse-tables',
    question: 'CIBSE pipe sizing tables typically give pressure drop in:',
    options: [
      'PSI per foot',
      'Pa per metre of pipe',
      'Bar total',
      'Metres head',
    ],
    correctIndex: 1,
    explanation:
      'CIBSE tables give pressure drop rate in Pa/m (Pascals per metre of pipe run). This allows quick calculation of total pipe friction loss by multiplying by pipe length.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the Darcy-Weisbach equation for head loss?',
    options: [
      'h_f = ρgh',
      'h_f = fLv²/2gD',
      'h_f = P/ρg',
      'h_f = Kv²/2g',
    ],
    correctAnswer: 1,
    explanation:
      "The Darcy-Weisbach equation h_f = f(L/D)(v²/2g) relates head loss to friction factor (f), pipe length (L), diameter (D), velocity (v), and gravity (g). It's the fundamental equation for pipe friction.",
  },
  {
    id: 2,
    question: 'On a Moody diagram, friction factor depends on which two parameters?',
    options: [
      'Flow rate and pipe length',
      'Pressure and temperature',
      'Reynolds number and relative roughness',
      'Density and viscosity',
    ],
    correctAnswer: 2,
    explanation:
      'The Moody diagram plots friction factor (f) against Reynolds number (Re) with curves for different relative roughness (ε/D). For turbulent flow, both Re and roughness affect friction factor.',
  },
  {
    id: 3,
    question: 'For fully turbulent flow in rough pipes, the friction factor:',
    options: [
      'Depends only on the Reynolds number',
      'Increases steadily as the Reynolds number increases',
      'Is fixed at 64/Re regardless of roughness',
      'Depends only on relative roughness',
    ],
    correctAnswer: 3,
    explanation:
      'In the fully rough turbulent zone, friction factor depends only on relative roughness (ε/D), not on Reynolds number. This is shown by the horizontal portions of curves on the Moody diagram.',
  },
  {
    id: 4,
    question: 'The Colebrook-White equation is used to:',
    options: [
      'Determine friction factor for turbulent flow',
      'Calculate the flow rate from a measured pressure drop',
      'Find the velocity head at a fitting',
      'Convert head loss in metres into pressure in pascals',
    ],
    correctAnswer: 0,
    explanation:
      'The Colebrook-White equation: 1/√f = -2log₁₀(ε/3.7D + 2.51/Re√f) is the basis for the Moody diagram. It requires iteration to solve but gives accurate friction factors for turbulent flow.',
  },
  {
    id: 5,
    question: "What is 'equivalent length' for fittings?",
    options: [
      'The physical length of the fitting measured end to end',
      'Length of straight pipe giving the same pressure drop',
      'The length of pipe between two consecutive fittings',
      'The minimum straight length needed before a flow meter',
    ],
    correctAnswer: 1,
    explanation:
      'Equivalent length (L_e) expresses fitting losses as an equivalent length of straight pipe. For example, an elbow with L_e = 30D in 50mm pipe equals 30×0.05 = 1.5m of straight pipe friction.',
  },
  {
    id: 6,
    question:
      'A system has 50m of pipe with pressure drop rate 200 Pa/m and fittings totalling 15m equivalent length. What is total friction loss?',
    options: [
      '10 kPa',
      '15 kPa',
      '13 kPa',
      '20 kPa',
    ],
    correctAnswer: 2,
    explanation:
      'Total equivalent length = 50 + 15 = 65m. Total loss = 65 × 200 = 13,000 Pa = 13 kPa. This is the combined pipe and fitting friction loss.',
  },
  {
    id: 7,
    question: 'CIBSE recommends a maximum pressure drop rate of approximately:',
    options: [
      '50 Pa/m',
      '100 Pa/m',
      '500 Pa/m',
      '250-350 Pa/m',
    ],
    correctAnswer: 3,
    explanation:
      'CIBSE typically recommends 250-350 Pa/m for index circuits to balance pipe cost against pump energy. Higher rates may be used for short runs; lower rates for long circuits.',
  },
  {
    id: 8,
    question: 'Why do balancing valves and strainers often dominate pressure drop in HVAC systems?',
    options: [
      'They create significant flow restrictions (high K values)',
      'They are made of rough materials',
      'They are always larger than pipes',
      'They are always at high elevations',
    ],
    correctAnswer: 0,
    explanation:
      'Valves and strainers have high K values due to flow restrictions, changes in direction, and turbulence. A partially closed valve or dirty strainer can have K > 10, creating substantial pressure drops.',
  },
  {
    id: 9,
    question: 'When pipe diameter is doubled (all else equal), how does friction head loss change?',
    options: [
      'Halves',
      'Reduces to 1/32',
      'Quarters',
      'Doubles',
    ],
    correctAnswer: 1,
    explanation:
      'From h_f = fLv²/2gD: if D doubles, v reduces by factor 4 (continuity), so v² reduces by 16. Combined with 1/D term, loss reduces by factor 32. Larger pipes dramatically reduce friction.',
  },
  {
    id: 10,
    question: "The 'index circuit' in a pipe system is:",
    options: [
      'The route carrying the highest flow rate',
      'The shortest route from pump to terminal',
      'The route with highest pressure drop',
      'The circuit nearest to the pump',
    ],
    correctAnswer: 2,
    explanation:
      'The index circuit has the highest total pressure drop from pump to the furthest/most resistant terminal. The pump must overcome this pressure drop; other circuits are balanced to match.',
  },
  {
    id: 11,
    question: 'What is relative roughness?',
    options: [
      'ε × D',
      'ε + D',
      'D / ε',
      'ε / D',
    ],
    correctAnswer: 3,
    explanation:
      "Relative roughness = ε/D where ε is absolute roughness (mm) and D is internal diameter (mm). It's dimensionless and used on the Moody diagram. Larger pipes have lower relative roughness.",
  },
  {
    id: 12,
    question: 'For copper pipe with ε = 0.0015mm and D = 15mm, what is the relative roughness?',
    options: [
      '0.0001',
      '0.1',
      '0.01',
      '0.001',
    ],
    correctAnswer: 0,
    explanation:
      "ε/D = 0.0015/15 = 0.0001 (or 1×10⁻⁴). This very low relative roughness means copper pipes operate close to the 'smooth pipe' line on the Moody diagram.",
  },
];

const faqs = [
  {
    question: 'When should I use K factors versus equivalent length?',
    answer:
      "K factors (h = Kv²/2g) are more accurate as they're independent of friction factor. Equivalent lengths (L_e) are convenient when you have a constant pressure drop rate. K factors are preferred for detailed analysis; equivalent lengths work well for quick estimates using tables.",
  },
  {
    question: 'Why do CIBSE tables only cover certain pipe sizes and flow rates?',
    answer:
      'Tables are generated for common building services applications with typical water temperatures (10-80°C) and standard pipe materials. For unusual conditions (glycol, very high temperatures, non-standard materials), you should use Darcy-Weisbach with appropriate fluid properties and roughness values.',
  },
  {
    question: 'How do I account for aging and fouling in pipe systems?',
    answer:
      'Roughness increases with age due to corrosion and scale deposits. Design typically includes a safety factor of 10-20% on pressure drop. For critical systems, use higher roughness values than new pipe specifications. Regular maintenance and water treatment reduce fouling.',
  },
  {
    question: "What's the difference between major and minor losses?",
    answer:
      'Major losses are friction losses in straight pipe (Darcy-Weisbach). Minor losses occur at fittings, valves, and changes in section. Despite the names, minor losses often dominate in building services where there are many fittings in relatively short pipe runs.',
  },
  {
    question: 'How do I size pipes for noise control?',
    answer:
      'High velocities cause noise from turbulence and cavitation. CIBSE recommends maximum velocities of 1.5-2 m/s for occupied spaces, 2-3 m/s for plant rooms. This often results in larger pipes than pressure drop alone would require, especially near terminals.',
  },
  {
    question: 'Can I use the same friction factor for heating and chilled water?',
    answer:
      'No - viscosity differs significantly. Chilled water (~10°C) has higher viscosity than LPHW (~80°C), giving lower Reynolds numbers and potentially different friction factors. Always check fluid properties at operating temperature. Most tables specify the temperature range they cover.',
  },
];

const HNCModule2Section2_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 2 · Subsection 4"
            title="Pipe Sizing and Pressure Drop"
            description="Darcy-Weisbach, the Moody diagram, K-factors, equivalent lengths, and the CIBSE tables you'll use to size pipework on a real job."
            tone="purple"
          />

          <TLDR
            points={[
              'You will size pipework using Darcy-Weisbach (h_f = f·(L/D)·v²/2g) backed by the Moody chart or Colebrook-White, not blind reliance on rules of thumb.',
              'You account for fittings using either K-factors (h_minor = K·v²/2g) or equivalent length, depending on which the manufacturer publishes.',
              'You apply CIBSE Guide C friction tables for typical building services pipe materials at standard temperatures and roughness — and adjust where actual conditions differ.',
              'You target velocity ranges that balance cost (capital), noise (CIBSE limits) and erosion (≤ 1.5 m/s for steel, ≤ 1.0 m/s for copper at 80 °C).',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide C — Reference Data; CIBSE Guide B1 — Heating"
            clause="Pipe sizing in building services is typically based on the Darcy-Weisbach equation with friction factors from the Moody diagram or the Colebrook-White equation, applied to the design flow rate at the design fluid temperature, with allowance for minor losses through fittings using K-factors or equivalent lengths. Velocity limits and pressure drop per metre limits are applied to control noise, erosion and lifecycle pumping cost."
            meaning={
              <>
                CIBSE Guide C is the UK reference for pipe friction calculations. As an HNC
                designer your spec choices on pipe size, material and fittings feed directly
                into the pump duty, the operating cost and the long-term reliability of the
                system.
              </>
            }
            cite="Source: CIBSE Guide C — Reference Data; CIBSE Guide B1 — Heating; BS EN 806 (water supply pipework); BS 6700 superseded by BS EN 806"
          />

          <LearningOutcomes
            outcomes={[
              'Apply the Darcy-Weisbach equation to calculate pipe friction losses',
              'Use the Moody diagram to find friction factors',
              'Calculate fitting losses using K-factors and equivalent length',
              'Identify the index circuit in a piped system',
              'Use CIBSE pressure-drop tables for water and air',
              'Size pipes to balance friction loss, velocity and noise',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Darcy-Weisbach equation"
            plainEnglish="The fundamental friction-loss formula for any pipe. Friction factor times length-over-diameter times velocity head — that's your head loss."
          >
            <p>
              The Darcy-Weisbach equation calculates friction head loss in a length of straight
              pipe based on flow conditions and pipe properties.
            </p>
            <p>
              <strong>Equation:</strong> hf = f × (L/D) × (v²/2g). hf = friction head loss (m), f =
              Darcy friction factor (dimensionless), L = pipe length (m), D = internal diameter
              (m), v = velocity (m/s), g = 9.81 m/s².
            </p>
            <p>
              <strong>Pressure drop form:</strong> ΔP = f × (L/D) × (½ρv²).
            </p>
            <p>
              <strong>Friction factor depends on flow regime:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Laminar (Re &lt; 2300): f = 64/Re — purely a function of Re</li>
              <li>Turbulent: f from Moody diagram or Colebrook-White equation</li>
              <li>Fully rough turbulent: f depends only on relative roughness ε/D</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="The Moody diagram and pipe roughness"
            plainEnglish="A graph that gives you the friction factor from Reynolds number and how rough your pipe is. New copper sits near the bottom — old galvanised sits much higher."
          >
            <p>
              The Moody diagram plots Darcy friction factor f against Reynolds number Re for
              different values of relative roughness ε/D. It's the standard reference for turbulent
              flow friction factors.
            </p>
            <p>
              <strong>Relative roughness:</strong> ε/D, where ε = absolute roughness (mm) and D =
              internal diameter (mm). Dimensionless.
            </p>
            <p>
              <strong>Typical absolute roughness values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Drawn copper / brass: ε ≈ 0.0015 mm</li>
              <li>Stainless steel: ε ≈ 0.015 mm</li>
              <li>Commercial steel: ε ≈ 0.045 mm</li>
              <li>Galvanised steel: ε ≈ 0.15 mm</li>
              <li>Cast iron: ε ≈ 0.26 mm</li>
              <li>Concrete: ε = 0.3-3 mm</li>
            </ul>
            <p>
              <strong>Colebrook-White equation:</strong> 1/√f = -2 log₁₀(ε/(3.7D) + 2.51/(Re√f)).
              The implicit equation behind the Moody diagram. Solved iteratively.
            </p>
            <p>
              <strong>Aging:</strong> Roughness increases with corrosion and scale. Add 10-20%
              safety margin on pressure drop for design.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Fitting losses — K-factors and equivalent length"
            plainEnglish="Every elbow, tee and valve adds extra pressure drop. Two ways to handle it: a K-factor multiplied by velocity head, or an equivalent length of straight pipe."
          >
            <p>
              Fittings, valves, and changes in pipe section cause additional ('minor') losses
              beyond straight-pipe friction. Despite the name, these often dominate in building
              services where pipework is short but heavily fitted.
            </p>
            <p>
              <strong>K-factor method:</strong> hloss = K × v²/(2g). Each fitting has its own K
              value.
            </p>
            <p>
              <strong>Typical K-factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>90° elbow (standard): K = 0.75</li>
              <li>90° elbow (long radius): K = 0.4</li>
              <li>Tee (flow through): K = 0.6</li>
              <li>Tee (flow branch): K = 1.8</li>
              <li>Sudden contraction: K = 0.5</li>
              <li>Gate valve (fully open): K = 0.15</li>
              <li>Globe valve (fully open): K = 6-10</li>
              <li>Strainer (clean): K = 1-3</li>
              <li>Strainer (dirty): K can rise above 10</li>
            </ul>
            <p>
              <strong>Equivalent length method:</strong> Each fitting expressed as a length of
              equivalent straight pipe (Le). Add to actual pipe length, then apply Pa/m drop rate.
              Convenient with CIBSE tables.
            </p>
            <p>
              <strong>Typical equivalent lengths (in pipe diameters):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>90° elbow: Le ≈ 30 D</li>
              <li>Tee through: Le ≈ 20 D</li>
              <li>Tee branch: Le ≈ 60 D</li>
              <li>Gate valve open: Le ≈ 8 D</li>
              <li>Globe valve open: Le ≈ 340 D</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="CIBSE design tables and the index circuit"
            plainEnglish="CIBSE Guide C tables save you the Darcy-Weisbach maths — flow rate × pipe size gives you Pa/m. Find the worst-case branch (the index circuit), size the pump for that, balance everything else."
          >
            <p>
              CIBSE Guide C provides pre-calculated pressure drop tables for common pipework
              materials and water temperatures. For each pipe size and flow rate, the table gives
              pressure drop in Pa/m and velocity in m/s.
            </p>
            <p>
              <strong>Typical design targets:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pressure drop rate: 250-350 Pa/m for index circuit (LPHW/CHW)</li>
              <li>Velocity (occupied spaces): max 1.5-2 m/s for noise</li>
              <li>Velocity (plant rooms): up to 3 m/s acceptable</li>
              <li>Pump suction velocity: 0.5-1.5 m/s to avoid cavitation</li>
            </ul>
            <p>
              <strong>Index circuit:</strong> The route from pump to the most hydraulically remote
              terminal — typically with the highest total head loss. Pump must be sized to overcome
              this. Other circuits are throttled (balanced) to match.
            </p>
            <p>
              <strong>Sizing process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate flow in each section from heat load</li>
              <li>Pick pipe size keeping pressure drop near target Pa/m and velocity below noise limit</li>
              <li>Sum pipe friction + fitting losses along index circuit</li>
              <li>Add terminal pressure drop (radiator, coil, valve)</li>
              <li>Total = required pump head</li>
            </ul>
            <p>
              <strong>Doubling pipe diameter:</strong> Reduces friction loss by ~32× for the same
              flow. Bigger pipe costs more but cuts pump energy substantially.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three pressure drop calcs: a Darcy-Weisbach friction loss, a K-factor fitting, and a system pressure drop using CIBSE Pa/m method."
          >
            <p>
              <strong>Example 1 - Darcy-Weisbach friction loss:</strong> 50m of 50mm copper pipe (ε
              = 0.0015mm) carrying water at 2 m/s. Re = 100,000. Moody diagram gives f ≈ 0.018.
              Find head loss.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>hf = f × (L/D) × v²/(2g) = 0.018 × (50/0.05) × 2²/(2×9.81)</li>
              <li>hf = 0.018 × 1000 × 0.204 = <strong>3.67 m head</strong></li>
              <li>ΔP = ρg × hf = 1000 × 9.81 × 3.67 ≈ <strong>36 kPa</strong></li>
            </ul>
            <p>
              <strong>Example 2 - K-factor fitting:</strong> 90° elbow (K = 0.75) at 2 m/s.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>h = K × v²/(2g) = 0.75 × 2²/(2 × 10) = 0.75 × 0.2 = <strong>0.15 m</strong></li>
            </ul>
            <p>
              <strong>Example 3 - CIBSE Pa/m total system loss:</strong> 50m straight pipe + 15m
              equivalent length of fittings, drop rate 200 Pa/m.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total equivalent length = 50 + 15 = 65 m</li>
              <li>Total loss = 65 × 200 = 13,000 Pa = <strong>13 kPa</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Five formulas, two methods, and the design rules of thumb you'll use most."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>hf = f(L/D)(v²/2g)</strong> — Darcy-Weisbach friction loss (m)
              </li>
              <li>
                <strong>ΔP = f(L/D)(½ρv²)</strong> — Pressure drop form
              </li>
              <li>
                <strong>hloss = K × v²/(2g)</strong> — Fitting loss (m)
              </li>
              <li>
                <strong>f = 64/Re</strong> — Laminar friction factor
              </li>
              <li>
                <strong>ε/D</strong> — Relative roughness (Moody diagram input)
              </li>
            </ul>
            <p>
              <strong>Key design values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                CIBSE target Pa/m: <strong>250-350 Pa/m</strong>
              </li>
              <li>
                Max velocity (occupied): <strong>1.5-2 m/s</strong>
              </li>
              <li>
                Max velocity (plant): <strong>3 m/s</strong>
              </li>
              <li>
                Copper roughness: <strong>0.0015 mm</strong>
              </li>
              <li>
                Galvanised steel roughness: <strong>0.15 mm</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Ignoring fittings</strong> — Minor losses often dominate in fitted systems
                </li>
                <li>
                  <strong>Wrong friction factor</strong> — Use 64/Re only for laminar; Moody for turbulent
                </li>
                <li>
                  <strong>Wrong fluid properties</strong> — Use viscosity at actual operating temperature
                </li>
                <li>
                  <strong>No safety margin</strong> — Add 10-20% for ageing/fouling
                </li>
              </ul>
            }
            doInstead="Always include fittings, pick the friction factor for the right regime, look up viscosity at the operating temperature, and add a margin so the system still performs after a few years."
          />

          <SectionRule />

          <Scenario
            title="Sizing the LTHW main between plant room and a remote AHU"
            situation={
              <>
                You need to size the LTHW flow-and-return between a plant room and an AHU
                heating coil 60 m away. Coil duty 80 kW, design ΔT 20 K (water in 80, out
                60). Two 90° bends, four flanged isolation valves, one strainer, the AHU
                control valve.
              </>
            }
            whatToDo={
              <>
                Calculate flow rate: Q = P/(ρcΔT) = 80,000/(970 × 4,180 × 20) ≈ 0.99 L/s.
                From CIBSE Guide C, pick DN50 steel: velocity ≈ 0.5 m/s (within range),
                friction loss ≈ 0.06 kPa/m × 60 m = 3.6 kPa straight pipe. Add minor losses:
                bends K=0.5, valves K=0.2 each, strainer K=2, control valve sized for ~50%
                authority. Sum ≈ 8 kPa. Total pipe head ≈ 11.6 kPa flow-and-return. Document
                in the pump-head calculation, add to AHU coil pressure drop and other circuit
                elements.
              </>
            }
            whyItMatters={
              <>
                Under-sized pipework forces a bigger pump, more energy, more noise, more
                cost over 25 years. Over-sized pipework wastes capital and slows transient
                response. The Darcy calculation gives the defendable middle ground.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Darcy-Weisbach: h_f = f·(L/D)·v²/2g — the universal pipe friction equation.',
              'Friction factor f from Moody chart or Colebrook-White — depends on Re and relative roughness ε/D.',
              'Minor losses (fittings): h_minor = K·v²/2g where K is the loss coefficient (CIBSE Guide C tables).',
              'Equivalent length method: L_eq for each fitting added to actual length, then apply Darcy as if straight pipe.',
              'CIBSE Guide C friction tables give kPa/m at design temperatures for steel, copper, plastic — interpolate where conditions differ.',
              'Velocity limits: copper ≤ 1.0 m/s at 80 °C (erosion), steel ≤ 1.5 m/s, drinking water ≤ 2 m/s (noise/wear).',
              'Pressure drop limits: typically 100-250 Pa/m for water systems — balances pump energy against capital cost.',
              'Whole-system pressure budget: Σ pipe loss + Σ fittings loss + emitter loss + control-valve drop = pump head.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Bernoulli's equation
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Pump characteristics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section2_4;
