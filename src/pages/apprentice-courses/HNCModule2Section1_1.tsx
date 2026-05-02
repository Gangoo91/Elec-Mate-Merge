/**
 * Module 2 · Section 1 · Subsection 1 — Conduction
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Heat transfer through solid materials — Fourier&rsquo;s law, thermal conductivity,
 *   composite walls, pipe insulation. The thermal foundation that every U-value, heat-loss
 *   calculation and insulation specification on a building services project rests on.
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

const TITLE = 'Conduction - HNC Module 2 Section 1.1';
const DESCRIPTION =
  "Master heat transfer by conduction for building services: Fourier's Law, thermal conductivity, composite walls, and practical applications in pipe insulation and wall construction.";

const quickCheckQuestions = [
  {
    id: 'fouriers-law',
    question: "In Fourier's Law (Q = -kA dT/dx), what does the negative sign indicate?",
    options: [
      'Heat loss to surroundings',
      'Heat flows from cold to hot',
      'Heat flows from hot to cold',
      'Thermal resistance',
    ],
    correctIndex: 2,
    explanation:
      'The negative sign indicates that heat flows in the direction of decreasing temperature - from hot to cold regions. This is consistent with the Second Law of Thermodynamics.',
  },
  {
    id: 'thermal-conductivity',
    question: 'Which material has the highest thermal conductivity?',
    options: [
      'Brick (0.8 W/m·K)',
      'Mineral wool (0.035 W/m·K)',
      'Copper (385 W/m·K)',
      'Concrete (1.4 W/m·K)',
    ],
    correctIndex: 2,
    explanation:
      "Copper has an extremely high thermal conductivity of 385 W/m·K, making it excellent for heat exchangers but poor as an insulator. Mineral wool's low k-value (0.035 W/m·K) makes it an effective insulator.",
  },
  {
    id: 'composite-wall',
    question: 'For a composite wall with layers in series, how are thermal resistances combined?',
    options: [
      'R_total = R1 × R2 × R3',
      'R_total = R1 + R2 + R3',
      '1/R_total = 1/R1 + 1/R2 + 1/R3',
      'R_total = (R1 + R2)/2',
    ],
    correctIndex: 1,
    explanation:
      'For layers in series, thermal resistances add directly: R_total = R1 + R2 + R3. This is analogous to electrical resistors in series. The same heat flow passes through each layer.',
  },
  {
    id: 'steady-state',
    question: 'What characterises steady-state conduction?',
    options: [
      'Temperature varies with time',
      'Heat flow rate varies with position',
      'Temperature is constant at any given point over time',
      'Heat accumulates in the material',
    ],
    correctIndex: 2,
    explanation:
      'In steady-state conduction, temperatures remain constant at any given point over time. Heat entering equals heat leaving - no energy is stored. This simplifies calculations and is the basis of most building services thermal analysis.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the SI unit for thermal conductivity (k)?',
    options: ['W/m²·K', 'W/m·K', 'm²·K/W', 'J/kg·K'],
    correctAnswer: 1,
    explanation:
      'Thermal conductivity is measured in Watts per metre per Kelvin (W/m·K). It represents the rate of heat transfer through a material per unit thickness per unit temperature difference.',
  },
  {
    id: 2,
    question:
      'A 220mm brick wall (k = 0.84 W/m·K) has inner and outer surface temperatures of 18°C and 5°C. What is the heat flux?',
    options: ['49.6 W/m²', '59.2 W/m²', '39.5 W/m²', '69.8 W/m²'],
    correctAnswer: 0,
    explanation:
      'Using q = k × ΔT/L = 0.84 × (18-5)/0.22 = 0.84 × 13/0.22 = 49.6 W/m². This is the rate of heat loss per square metre of wall area.',
  },
  {
    id: 3,
    question:
      'What is the thermal resistance (R-value) of 100mm of mineral wool insulation (k = 0.035 W/m·K)?',
    options: ['2.86 m²·K/W', '0.35 m²·K/W', '3.50 m²·K/W', '0.0035 m²·K/W'],
    correctAnswer: 0,
    explanation:
      'R = L/k = 0.1/0.035 = 2.86 m²·K/W. Higher R-values indicate better insulation. This is why mineral wool is widely used in building construction.',
  },
  {
    id: 4,
    question:
      'A wall comprises 100mm brick (k=0.84), 50mm cavity insulation (k=0.035), and 100mm blockwork (k=0.19). What is the total thermal resistance of the masonry layers?',
    options: ['1.48 m²·K/W', '1.96 m²·K/W', '2.07 m²·K/W', '0.69 m²·K/W'],
    correctAnswer: 2,
    explanation:
      'R_brick = 0.1/0.84 = 0.119, R_insulation = 0.05/0.035 = 1.43, R_block = 0.1/0.19 = 0.526. Total R = 0.119 + 1.43 + 0.526 = 2.07 m²·K/W. The cavity insulation contributes most of the thermal resistance.',
  },
  {
    id: 5,
    question: 'In parallel heat paths, which statement is correct?',
    options: [
      'Heat flow is the same through each path',
      'Temperature drop is the same across each path',
      'Thermal resistances add directly',
      'Heat always takes the longest path',
    ],
    correctAnswer: 1,
    explanation:
      'For parallel paths, the temperature difference is the same across each path, but heat flow divides according to the thermal conductance of each path. This is analogous to parallel electrical resistors.',
  },
  {
    id: 6,
    question:
      'A steel pipe (k = 50 W/m·K) with 25mm wall thickness has a thermal bridge factor compared to 25mm pipe insulation (k = 0.035 W/m·K) of approximately:',
    options: ['50 times worse', '1430 times worse', '35 times worse', 'Similar performance'],
    correctAnswer: 1,
    explanation:
      'Ratio = k_steel/k_insulation = 50/0.035 = 1429. Uninsulated steel pipes conduct heat approximately 1430 times faster than insulated pipes - hence the critical importance of pipe insulation.',
  },
  {
    id: 7,
    question: 'What causes a thermal bridge in building construction?',
    options: [
      'A gap in the insulation layer',
      'A material with higher thermal conductivity penetrating the insulation',
      'Poor workmanship in installation',
      'All of the above',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal bridges occur when the insulation layer is compromised - whether by gaps, structural elements (steel lintels, mortar joints), or installation defects. All allow increased heat flow and can cause condensation.',
  },
  {
    id: 8,
    question:
      'For a 50mm diameter hot water pipe at 60°C in a 20°C ambient, adding 25mm of pipe insulation (k = 0.035 W/m·K) typically reduces heat loss by approximately:',
    options: ['50%', '75%', '90%', '99%'],
    correctAnswer: 2,
    explanation:
      'Pipe insulation typically reduces heat loss by 85-95%. The exact reduction depends on pipe size, temperature difference, and insulation thickness, but 90% is a reasonable estimate for 25mm insulation on LPHW pipework.',
  },
  {
    id: 9,
    question: 'What is the U-value of a wall with total thermal resistance R_total = 3.5 m²·K/W?',
    options: ['3.5 W/m²·K', '0.29 W/m²·K', '0.35 W/m²·K', '2.86 W/m²·K'],
    correctAnswer: 1,
    explanation:
      'U = 1/R_total = 1/3.5 = 0.286 ≈ 0.29 W/m²·K. U-value is the overall heat transfer coefficient and is the reciprocal of total thermal resistance. Lower U-values indicate better insulation.',
  },
  {
    id: 10,
    question:
      'During transient conduction, which property determines how quickly a material responds to temperature changes?',
    options: [
      'Thermal conductivity only',
      'Density only',
      'Thermal diffusivity (α = k/ρc)',
      'Specific heat capacity only',
    ],
    correctAnswer: 2,
    explanation:
      'Thermal diffusivity α = k/(ρc) determines the rate of temperature change. It combines conductivity (how fast heat moves), density and specific heat (how much energy is stored). High α means rapid temperature response.',
  },
  {
    id: 11,
    question:
      'Building Regulations Approved Document L requires new build walls to achieve a maximum U-value of:',
    options: ['0.55 W/m²·K', '0.35 W/m²·K', '0.26 W/m²·K', '0.18 W/m²·K'],
    correctAnswer: 2,
    explanation:
      'Approved Document L (Conservation of fuel and power) requires walls in new dwellings to achieve U ≤ 0.26 W/m²·K. This drives the need for substantial wall insulation in modern construction.',
  },
  {
    id: 12,
    question:
      'Why is the internal surface resistance (R_si) typically higher than the external surface resistance (R_se)?',
    options: [
      'Internal walls are thicker',
      'Internal air movement is lower, reducing convective heat transfer',
      'External walls have better insulation',
      "It's the same - this statement is incorrect",
    ],
    correctAnswer: 1,
    explanation:
      'Internal surface resistance (R_si ≈ 0.13 m²·K/W) is higher than external (R_se ≈ 0.04 m²·K/W) because internal air is relatively still, while external surfaces experience wind-driven convection that increases heat transfer.',
  },
];

const faqs = [
  {
    question: "What's the difference between thermal conductivity (k) and thermal resistance (R)?",
    answer:
      'Thermal conductivity (k, in W/m·K) is a material property - it tells you how well a material conducts heat regardless of thickness. Thermal resistance (R, in m²·K/W) depends on both material properties AND thickness: R = L/k. A 100mm layer of mineral wool has twice the R-value of a 50mm layer of the same material.',
  },
  {
    question: 'Why do we use U-values instead of R-values in building regulations?',
    answer:
      'U-values (W/m²·K) directly give the heat loss per unit area per degree temperature difference, making heat loss calculations simpler: Q = U × A × ΔT. U-values also include surface resistances (internal and external), giving a more complete picture of real-world performance. U = 1/R_total.',
  },
  {
    question: 'How do thermal bridges affect building performance?',
    answer:
      'Thermal bridges can increase heat loss by 10-30% beyond what simple U-value calculations predict. More critically, they create cold spots where condensation forms, leading to mould growth and structural damage. Modern design uses thermal break materials and careful detailing to minimise bridging.',
  },
  {
    question: 'Why is pipe insulation thickness specified differently for different pipe sizes?',
    answer:
      'Heat loss from pipes is proportional to surface area, which increases with diameter. However, the ratio of insulation volume to pipe surface area improves with larger pipes, so proportionally less insulation is needed. BS 5422 provides minimum insulation thicknesses based on pipe diameter, operating temperature, and environmental conditions.',
  },
  {
    question: "What's the practical difference between steady-state and transient conduction?",
    answer:
      'Steady-state assumes temperatures have stabilised - useful for calculating design heat loads. Transient analysis considers warm-up/cool-down periods and is important for intermittent heating systems, thermal mass calculations, and understanding how buildings respond to changing conditions. Building services heating calculations typically use steady-state for sizing.',
  },
  {
    question: 'How does moisture affect thermal conductivity?',
    answer:
      'Water has a thermal conductivity of about 0.6 W/m·K - roughly 17 times higher than still air (0.025 W/m·K). When insulation becomes wet, water replaces air in the pores, dramatically increasing conductivity and reducing effectiveness. This is why vapour barriers and proper drainage details are essential in building construction.',
  },
];

const HNCModule2Section1_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 1"
            title="Conduction"
            description="Heat transfer through solid materials - the foundation of building thermal analysis and insulation design."
            tone="purple"
          />

          <TLDR
            points={[
              'You will apply Fourier&rsquo;s law (Q = -kA·dT/dx) to size insulation, evaluate composite walls and predict pipe heat loss on building services jobs.',
              'You can read thermal conductivity (k, W/m·K) values from product data and use them in steady-state heat-flow calculations.',
              'You apply the &ldquo;resistance in series&rdquo; rule for layered fabric and the &ldquo;resistance in parallel&rdquo; rule for thermal-bridge analysis.',
              'You spec pipe and duct insulation against BS 5422 and the building&rsquo;s Part L target, not just &ldquo;25 mm because that&rsquo;s what we always use&rdquo;.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Part L (Conservation of fuel and power)"
            clause="Reasonable provision shall be made for the conservation of fuel and power in or in connection with buildings by limiting heat gains and losses through thermal elements and other parts of the building fabric, and from pipes, ducts and vessels used for space heating, space cooling and hot water services."
            meaning={
              <>
                Part L is the regulatory anchor for conduction calculations on a building
                services project. Insulation thickness on pipework and ductwork is not optional
                — it is a Building Regulations submission item, evidenced against BS 5422 and
                the project&rsquo;s as-built model.
              </>
            }
            cite="Source: Building Regulations 2010, Part L; CIBSE Guide A &mdash; Environmental design"
          />

          <LearningOutcomes
            outcomes={[
              "Apply Fourier's Law to calculate conductive heat transfer",
              'Use thermal conductivity values for common building materials',
              'Distinguish between steady-state and transient conduction',
              'Calculate thermal resistance of composite walls',
              'Analyse parallel heat paths and thermal bridges',
              'Specify pipe insulation for building services applications',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Fourier's Law of Conduction"
            plainEnglish="Conduction is heat moving through a solid by molecules bumping into one another. Hot molecules vibrate hard, knock energy into cooler neighbours, and so on until everything's at the same temperature."
          >
            <p>
              Conduction is heat transfer through a material by direct molecular contact. Molecules
              in hotter regions vibrate more energetically, transferring kinetic energy to adjacent
              cooler molecules. This process continues until thermal equilibrium is reached.
            </p>
            <p>
              <strong>Fourier's Law - the fundamental equation:</strong> Q = -kA(dT/dx)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q</strong> = Heat transfer rate (W)
              </li>
              <li>
                <strong>k</strong> = Thermal conductivity (W/m·K)
              </li>
              <li>
                <strong>A</strong> = Cross-sectional area perpendicular to heat flow (m²)
              </li>
              <li>
                <strong>dT/dx</strong> = Temperature gradient (K/m or °C/m)
              </li>
              <li>
                <strong>-ve sign</strong> = Heat flows from hot to cold (decreasing T)
              </li>
            </ul>
            <p>For a flat wall of thickness L:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Heat flux: <strong>q = Q/A = k(T1 - T2)/L</strong> (W/m²)
              </li>
              <li>
                Total heat flow: <strong>Q = kA(T1 - T2)/L</strong> (W)
              </li>
              <li>T1 = hot face temperature, T2 = cold face temperature</li>
              <li>Heat flux (q) is heat flow per unit area</li>
            </ul>
            <p>
              <strong>Worked example - wall heat loss:</strong> A 215mm solid brick wall (k = 0.77
              W/m·K) separates a room at 20°C from outside at 0°C. Calculate the heat flux.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>q = k × dT / L</li>
              <li>q = 0.77 × (20 - 0) / 0.215</li>
              <li>q = 0.77 × 20 / 0.215</li>
              <li>
                q = <strong>71.6 W/m²</strong>
              </li>
              <li>For a 10m² wall: Q = 71.6 × 10 = 716W heat loss</li>
            </ul>
            <p>
              <strong>Key insight:</strong> Heat flow is proportional to temperature difference and
              inversely proportional to thickness. Doubling wall thickness halves heat loss.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Thermal Conductivity of Materials"
            plainEnglish="k tells you how easily heat moves through a material. Low k = good insulator. High k = good conductor (and a thermal bridge if you don't want one)."
          >
            <p>
              Thermal conductivity (k) is an intrinsic material property that quantifies how readily
              heat flows through a material. Low k-values indicate good insulators; high k-values
              indicate good thermal conductors.
            </p>
            <p>
              <strong>Thermal conductivity of common building materials:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Copper: 385 W/m·K - excellent conductor</li>
              <li>Aluminium: 205 W/m·K - excellent conductor</li>
              <li>Steel: 50 W/m·K - good conductor</li>
              <li>Dense concrete: 1.4 W/m·K - moderate</li>
              <li>Brick (facing): 0.77 W/m·K - moderate</li>
              <li>Lightweight block: 0.19 W/m·K - poor conductor</li>
              <li>Plasterboard: 0.21 W/m·K - poor conductor</li>
              <li>Glass wool / mineral wool: 0.035 W/m·K - good insulator</li>
              <li>Expanded polystyrene (EPS): 0.038 W/m·K - good insulator</li>
              <li>Polyurethane foam (PUR): 0.025 W/m·K - excellent insulator</li>
              <li>Phenolic foam: 0.020 W/m·K - excellent insulator</li>
              <li>Still air: 0.025 W/m·K - reference value</li>
            </ul>
            <p>
              <strong>Factors affecting k-value:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Density:</strong> Denser materials typically conduct better
              </li>
              <li>
                <strong>Moisture:</strong> Wet insulation conducts ~17x better
              </li>
              <li>
                <strong>Temperature:</strong> k generally increases with temperature
              </li>
              <li>
                <strong>Porosity:</strong> Air pockets reduce conductivity
              </li>
            </ul>
            <p>
              <strong>Why insulators work:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Trap still air (k = 0.025 W/m·K)</li>
              <li>Fibrous/cellular structure limits convection</li>
              <li>Low density reduces solid conduction paths</li>
              <li>Must remain dry to maintain performance</li>
            </ul>
            <p>
              <strong>Design note:</strong> When selecting insulation, consider not just k-value but
              also moisture resistance, fire performance, compressive strength, and long-term
              stability.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Steady-State vs Transient Conduction"
            plainEnglish="Steady-state = nothing's changing over time. Transient = it is. Sizing radiators? Steady-state. Working out warm-up time? Transient."
          >
            <p>
              Conduction problems are classified as either steady-state (temperatures constant over
              time) or transient (temperatures changing with time). Building services design
              typically uses steady-state analysis for sizing, but transient effects influence
              real-world performance.
            </p>
            <p>
              <strong>Steady-state conduction:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Temperature at any point is constant over time</li>
              <li>Heat in = Heat out (no storage)</li>
              <li>dT/dt = 0 (no time variation)</li>
              <li>Used for design heat loss calculations</li>
              <li>Simpler mathematics: Q = kAdT/L</li>
            </ul>
            <p>
              <strong>Transient conduction:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Temperature varies with both position and time</li>
              <li>Heat may be stored in the material</li>
              <li>dT/dt does not equal 0 (time-dependent)</li>
              <li>Warm-up periods, intermittent heating</li>
              <li>Requires: dT/dt = a(d²T/dx²)</li>
            </ul>
            <p>
              <strong>Thermal diffusivity:</strong> a = k / (p × c)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>a</strong> = Thermal diffusivity (m²/s)
              </li>
              <li>
                <strong>k</strong> = Thermal conductivity (W/m·K)
              </li>
              <li>
                <strong>p</strong> = Density (kg/m³)
              </li>
              <li>
                <strong>c</strong> = Specific heat capacity (J/kg·K)
              </li>
            </ul>
            <p>High a means rapid temperature response; low a means slow response (high thermal mass).</p>
            <p>
              <strong>Building services implications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermal mass:</strong> Heavy construction smooths temperature swings
              </li>
              <li>
                <strong>Warm-up time:</strong> Heavyweight buildings need earlier heating start
              </li>
              <li>
                <strong>Intermittent heating:</strong> Transient effects affect efficiency
              </li>
              <li>
                <strong>Design loads:</strong> Steady-state used for peak load sizing
              </li>
              <li>
                <strong>Energy simulation:</strong> Dynamic modelling considers transient effects
              </li>
            </ul>
            <p>
              <strong>Practical note:</strong> For HNC calculations, assume steady-state unless told
              otherwise. Real building energy analysis uses dynamic simulation software that handles
              transient effects.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Composite Walls, Series Resistance and Parallel Heat Paths"
            plainEnglish="Real walls are layered cake. Each layer has its own resistance. Stack them up in series, take the reciprocal, that's your U-value."
          >
            <p>
              Real walls comprise multiple layers, each with different thermal properties. The
              thermal resistance concept allows us to analyse these composite structures
              systematically, using methods analogous to electrical circuit analysis.
            </p>
            <p>
              <strong>Thermal resistance (R-value):</strong> R = L / k (for a solid layer). Unit:
              m²·K/W. Higher = better insulation. Thermal resistance is the 'opposition' to heat
              flow - the thermal equivalent of electrical resistance.
            </p>
            <p>
              <strong>Layers in series (typical wall):</strong> R_total = R_si + R1 + R2 + R3 + ...
              + R_se. R_si = internal surface resistance (0.13 m²·K/W). R_se = external surface
              resistance (0.04 m²·K/W).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Same heat flows through all layers</li>
              <li>Temperature drops across each layer proportional to its R-value</li>
              <li>Total dT = sum of individual dT values</li>
            </ul>
            <p>
              <strong>Worked example - cavity wall U-value:</strong> 102mm brick (k=0.77), 50mm
              insulated cavity (k=0.035), 100mm lightweight block (k=0.19), 13mm plaster (k=0.57).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>R_si = 0.13 m²·K/W (internal surface)</li>
              <li>R_brick = 0.102/0.77 = 0.132 m²·K/W</li>
              <li>R_cavity = 0.050/0.035 = 1.429 m²·K/W</li>
              <li>R_block = 0.100/0.19 = 0.526 m²·K/W</li>
              <li>R_plaster = 0.013/0.57 = 0.023 m²·K/W</li>
              <li>R_se = 0.04 m²·K/W (external surface)</li>
              <li>R_total = 0.13 + 0.132 + 1.429 + 0.526 + 0.023 + 0.04 = <strong>2.28 m²·K/W</strong></li>
              <li>U = 1/R_total = 1/2.28 = <strong>0.44 W/m²·K</strong></li>
              <li>Note: Does not meet Building Regs (0.26) - needs more insulation</li>
            </ul>
            <p>
              <strong>Parallel heat paths (thermal bridges):</strong> 1/R_total = (A1/R1 + A2/R2) /
              A_total. Or for conductances: U_avg = (A1 × U1 + A2 × U2) / A_total.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Same temperature difference across parallel paths</li>
              <li>Heat flow divides according to conductance</li>
              <li>More heat flows through lower resistance path</li>
              <li>Steel lintels, mortar joints, wall ties act as thermal bridges</li>
            </ul>
            <p>
              <strong>Common thermal bridges in buildings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Steel lintel</strong> - steel k ≈ 50 W/m·K vs insulation. Mitigation:
                insulated lintels, thermal breaks
              </li>
              <li>
                <strong>Window reveals</strong> - insulation discontinuity at openings. Mitigation:
                return insulation into reveals
              </li>
              <li>
                <strong>Wall ties</strong> - metal penetrating cavity. Mitigation:
                stainless/plastic ties, thermal clips
              </li>
              <li>
                <strong>Floor edge</strong> - concrete slab bridging wall. Mitigation: perimeter
                insulation, thermal blocks
              </li>
              <li>
                <strong>Mortar joints</strong> - mortar k ≈ 0.8 vs block k ≈ 0.19. Mitigation:
                thin-joint systems, insulated mortar
              </li>
            </ul>
            <p>
              <strong>Critical point:</strong> Thermal bridges can cause localised cold spots where
              surface temperatures drop below dewpoint, leading to condensation, mould growth, and
              structural damage.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Building services applications"
            plainEnglish="Where you'll actually meet conduction on the job: pipe insulation, wall U-values, and the bits in between."
          >
            <p>
              <strong>Pipe insulation:</strong> Pipe insulation is essential for LPHW/MTHW systems
              to minimise distribution losses and maintain water temperatures. BS 5422 specifies
              minimum insulation thicknesses.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>15-22mm OD pipe: 20mm hot water / 13mm + VCL chilled water</li>
              <li>28-42mm OD pipe: 25mm hot water / 19mm + VCL chilled water</li>
              <li>54-76mm OD pipe: 30mm hot water / 25mm + VCL chilled water</li>
              <li>89-114mm OD pipe: 35mm hot water / 32mm + VCL chilled water</li>
              <li>
                VCL = Vapour Control Layer (essential for chilled water to prevent condensation)
              </li>
            </ul>
            <p>
              <strong>Example - pipe heat loss calculation:</strong> Calculate the heat loss per
              metre from a 42mm OD LPHW pipe at 80°C in a 20°C plantroom, with and without 25mm
              insulation (k = 0.035 W/m·K).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Uninsulated (simplified bare pipe): q ≈ π × D × h × dT ≈ 3.14 × 0.042 × 10 × 60</li>
              <li>q ≈ <strong>79 W/m</strong></li>
              <li>Insulated (cylindrical coordinates): R_ins = ln(r2/r1) / (2 × π × k) = ln(46/21) / (2 × 3.14 × 0.035)</li>
              <li>R_ins = 0.784 / 0.22 = 3.56 m·K/W</li>
              <li>q = dT / R_ins = 60 / 3.56 = <strong>16.8 W/m</strong></li>
              <li>Heat loss reduction: 79% (typical for 25mm insulation)</li>
            </ul>
            <p>
              <strong>Wall construction for Building Regulations:</strong> To achieve U ≤ 0.26
              W/m²·K (Building Regs Part L), typical constructions require:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Full-fill cavity:</strong> 100-150mm mineral wool in 150mm cavity
              </li>
              <li>
                <strong>Partial fill + PIR:</strong> 50mm PIR boards + 50mm clear cavity
              </li>
              <li>
                <strong>External insulation:</strong> 80-100mm EPS/phenolic on masonry
              </li>
              <li>
                <strong>Timber frame:</strong> 140mm studs fully filled + service void
              </li>
            </ul>
            <p>
              Remember to include thermal bridging allowances - typically add 10-15% to U-value
              calculations.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The handful of formulas and standard values you actually need to remember."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>q = k × dT/L</strong> - Heat flux (W/m²)
              </li>
              <li>
                <strong>Q = k × A × dT/L</strong> - Total heat flow (W)
              </li>
              <li>
                <strong>R = L/k</strong> - Thermal resistance of a layer
              </li>
              <li>
                <strong>R_total = sum of R</strong> - Series resistances add
              </li>
              <li>
                <strong>U = 1/R_total</strong> - Overall U-value
              </li>
              <li>
                <strong>a = k/(p × c)</strong> - Thermal diffusivity
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                R_si (internal surface): <strong>0.13 m²·K/W</strong>
              </li>
              <li>
                R_se (external surface): <strong>0.04 m²·K/W</strong>
              </li>
              <li>
                Mineral wool k: <strong>0.035 W/m·K</strong>
              </li>
              <li>
                PIR/PUR k: <strong>0.022-0.025 W/m·K</strong>
              </li>
              <li>
                Building Regs wall U-value: <strong>0.26 W/m²·K or less</strong>
              </li>
              <li>
                Building Regs floor U-value: <strong>0.18 W/m²·K or less</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Unit confusion:</strong> Convert mm to m for thickness (100mm = 0.1m)
                </li>
                <li>
                  <strong>Forgetting surface resistances:</strong> Always include R_si and R_se
                </li>
                <li>
                  <strong>Ignoring thermal bridges:</strong> Can add 10-30% to heat loss
                </li>
                <li>
                  <strong>Using dry k-values for wet conditions:</strong> Wet insulation fails
                </li>
                <li>
                  <strong>U vs R confusion:</strong> U = 1/R (they're reciprocals)
                </li>
              </ul>
            }
            doInstead="Always work in metres, always include surface resistances (R_si and R_se), allow 10-15% extra for thermal bridges, derate insulation k-values if it's likely to be damp, and never confuse U and R - one is the reciprocal of the other."
          />

          <SectionRule />

          <Scenario
            title="Sizing pipe insulation for a 100 mm LTHW main"
            situation={
              <>
                You are specifying the insulation thickness for a 100 mm steel LTHW flow main
                running through an unheated plant room. The fluid runs at 80 °C, the ambient
                is 10 °C, and the project is targeting Part L 2021 compliance.
              </>
            }
            whatToDo={
              <>
                Apply BS 5422 maximum permitted heat loss (W/m) for the pipe size and
                temperature class. Pick a phenolic or mineral-wool insulation with appropriate
                k value (typically 0.025-0.040 W/m·K). Calculate the radial heat loss using
                the cylindrical conduction equation (Q = 2πLk(T₁-T₂)/ln(r₂/r₁)). Iterate
                thickness until Q is below the BS 5422 limit. Document the calculation in the
                Part L submission.
              </>
            }
            whyItMatters={
              <>
                Under-insulated pipework wastes energy for the building&rsquo;s 25-year life
                and breaches Part L. Over-insulating wastes capital. The Fourier-law
                calculation gives the defendable answer.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Fourier&rsquo;s law: Q = -kA·dT/dx — the foundation equation for steady-state conduction.',
              'Thermal conductivity k (W/m·K) is a material property — copper 385, brick 0.77, mineral wool 0.035, polyurethane 0.022.',
              'Composite walls in series: R_total = R₁ + R₂ + R₃ — same heat flow through each layer.',
              'Parallel paths (e.g. wall stud + insulation): 1/R_total = 1/R₁ + 1/R₂ — increased heat flow through the lower-R path drives thermal bridging.',
              'Cylindrical conduction (pipework): Q = 2πLk(T₁-T₂)/ln(r₂/r₁) — non-linear in radius, so first 25 mm of insulation matters most.',
              'BS 5422 sets maximum permitted heat loss for insulated pipes and ducts in building services.',
              'Part L of the Building Regulations is the regulatory anchor — insulation specs are evidenced in the Part L submission.',
              'Steady-state assumes thermal equilibrium — transient conduction (warm-up, cool-down) needs more advanced methods (Fourier number, Biot number).',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heat transfer principles
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Convection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section1_1;
