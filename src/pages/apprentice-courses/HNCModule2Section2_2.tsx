/**
 * Module 2 · Section 2 · Subsection 2 — Flow Characteristics
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Reynolds number, laminar vs turbulent flow, velocity profiles. The regime classification
 *   that determines whether the system loses energy proportional to velocity (laminar) or to
 *   velocity squared (turbulent) — and which correlations apply for friction loss.
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

const TITLE = 'Flow Characteristics - HNC Module 2 Section 2.2';
const DESCRIPTION =
  'Understand laminar and turbulent flow, Reynolds number calculations, flow patterns and velocity profiles for building services hydraulic system design.';

const quickCheckQuestions = [
  {
    id: 'reynolds-transition',
    question:
      'At what Reynolds number does flow typically transition from laminar to turbulent in pipes?',
    options: ['Re < 500', 'Re ≈ 2300', 'Re ≈ 4000', 'Re > 10,000'],
    correctIndex: 1,
    explanation:
      'The critical Reynolds number for pipe flow is approximately 2300. Below this, flow is laminar; above approximately 4000, flow is fully turbulent. Between 2300-4000 is the transition zone.',
  },
  {
    id: 'laminar-profile',
    question: 'What is the shape of the velocity profile in fully developed laminar pipe flow?',
    options: ['Flat (uniform)', 'Parabolic', 'Triangular', 'Logarithmic'],
    correctIndex: 1,
    explanation:
      'Laminar flow has a parabolic velocity profile with maximum velocity at the centre (twice the average velocity) and zero velocity at the pipe wall due to the no-slip condition.',
  },
  {
    id: 'reynolds-formula',
    question: 'Which formula correctly calculates Reynolds number?',
    options: ['Re = μvD/ρ', 'Re = ρvD/μ', 'Re = ρμ/vD', 'Re = vD/ρμ'],
    correctIndex: 1,
    explanation:
      'Re = ρvD/μ where ρ is density (kg/m³), v is velocity (m/s), D is diameter (m), and μ is dynamic viscosity (Pa·s). This can also be written as Re = vD/ν using kinematic viscosity.',
  },
  {
    id: 'flow-type-hvac',
    question: 'In typical HVAC pipe systems, flow is usually:',
    options: ['Always laminar', 'Usually turbulent', 'Always transitional', 'Supersonic'],
    correctIndex: 1,
    explanation:
      'HVAC systems typically operate with turbulent flow (Re > 4000) due to practical flow velocities of 1-3 m/s in pipes. This actually improves heat transfer but increases friction losses.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What characterises laminar flow?',
    options: [
      'Chaotic fluid motion with mixing between layers',
      'Smooth, parallel fluid layers with no mixing',
      'Pulsating flow patterns',
      'Flow only possible at high velocities',
    ],
    correctAnswer: 1,
    explanation:
      'Laminar flow is characterised by smooth, orderly fluid motion where adjacent layers slide past each other without mixing. It occurs at low Reynolds numbers and has predictable, calculable behaviour.',
  },
  {
    id: 2,
    question: 'What does the Reynolds number represent?',
    options: [
      'The ratio of pressure forces to gravity forces',
      'The ratio of inertial forces to viscous forces',
      'The ratio of flow velocity to sound velocity',
      'The ratio of pipe diameter to length',
    ],
    correctAnswer: 1,
    explanation:
      'Reynolds number (Re) is the ratio of inertial forces to viscous forces in a fluid. High Re means inertial forces dominate (turbulent flow); low Re means viscous forces dominate (laminar flow).',
  },
  {
    id: 3,
    question:
      'Water flows at 2 m/s through a 50mm diameter pipe. Calculate the Reynolds number. (ρ = 1000 kg/m³, μ = 0.001 Pa·s)',
    options: ['1,000', '10,000', '100,000', '1,000,000'],
    correctAnswer: 2,
    explanation:
      'Re = ρvD/μ = (1000 × 2 × 0.05) / 0.001 = 100,000. This is well into the turbulent regime, typical for HVAC pipe systems.',
  },
  {
    id: 4,
    question: 'In turbulent flow, the velocity profile is:',
    options: [
      'Parabolic with maximum at centre',
      'Flat across most of the pipe with thin boundary layers',
      'Maximum at the pipe wall',
      'Constant throughout',
    ],
    correctAnswer: 1,
    explanation:
      'Turbulent flow has a much flatter velocity profile than laminar flow, with thin boundary layers near the walls. The average velocity is closer to the maximum velocity (about 80-85%).',
  },
  {
    id: 5,
    question:
      'What is the maximum velocity in fully developed laminar pipe flow compared to the average velocity?',
    options: [
      'Equal to average velocity',
      '1.5 times average velocity',
      '2 times average velocity',
      '3 times average velocity',
    ],
    correctAnswer: 2,
    explanation:
      'In laminar flow, the parabolic profile means the centreline (maximum) velocity is exactly twice the average velocity: v_max = 2 × v_avg.',
  },
  {
    id: 6,
    question: 'Which factor does NOT directly affect the Reynolds number?',
    options: ['Fluid velocity', 'Pipe diameter', 'Fluid viscosity', 'Pipe material roughness'],
    correctAnswer: 3,
    explanation:
      'Re = ρvD/μ involves density, velocity, diameter, and viscosity. Pipe roughness affects friction factor but not the Reynolds number itself.',
  },
  {
    id: 7,
    question: 'Why is turbulent flow generally preferred for heat transfer in HVAC systems?',
    options: [
      'Lower pumping energy required',
      'Better mixing improves heat transfer coefficient',
      'Simpler calculations',
      'Lower noise levels',
    ],
    correctAnswer: 1,
    explanation:
      'Turbulent flow enhances heat transfer because the chaotic mixing brings more fluid into contact with heat transfer surfaces. Heat transfer coefficients can be 5-10 times higher than laminar flow.',
  },
  {
    id: 8,
    question: 'The transition zone for pipe flow occurs between Reynolds numbers of approximately:',
    options: ['500 - 1000', '1000 - 2000', '2300 - 4000', '4000 - 10000'],
    correctAnswer: 2,
    explanation:
      'The transition zone is between Re ≈ 2300 (laminar breakdown) and Re ≈ 4000 (fully turbulent). Flow in this region is unstable and unpredictable.',
  },
  {
    id: 9,
    question:
      'How does increasing fluid temperature typically affect the Reynolds number for water flow?',
    options: [
      'Decreases Re (more laminar tendency)',
      'Increases Re (more turbulent tendency)',
      'No effect on Re',
      'Makes Re unpredictable',
    ],
    correctAnswer: 1,
    explanation:
      'Higher temperature reduces water viscosity, which increases Re (since Re = ρvD/μ). This means heated water is more likely to be turbulent than cold water at the same velocity.',
  },
  {
    id: 10,
    question: 'What is the entry length for flow to become fully developed?',
    options: [
      'Always 10 pipe diameters',
      'Depends on Reynolds number - longer for laminar flow',
      'Same for laminar and turbulent flow',
      'Entry effects are negligible',
    ],
    correctAnswer: 1,
    explanation:
      'Entry length depends on Re. For laminar flow: L_e ≈ 0.06 Re × D (can be very long). For turbulent flow: L_e ≈ 10-60 D (much shorter). This affects pressure drop calculations near fittings.',
  },
  {
    id: 11,
    question:
      'In a Y-junction where flow splits, what happens to velocity if one branch has twice the cross-sectional area of the other?',
    options: [
      'Velocity is equal in both branches',
      'Velocity is higher in the smaller branch',
      'Velocity is higher in the larger branch',
      'Velocity depends only on pressure difference',
    ],
    correctAnswer: 1,
    explanation:
      'From continuity (Q = Av), if flow splits based on resistance, the smaller area branch will have higher velocity. For equal pressure drop, more flow goes through the larger branch but at lower velocity.',
  },
  {
    id: 12,
    question: 'What is the continuity equation for incompressible flow?',
    options: ['A₁v₁ = A₂v₂', 'P₁ + ρv₁² = P₂ + ρv₂²', 'F = ma', 'Q = ΔP/R'],
    correctAnswer: 0,
    explanation:
      'The continuity equation A₁v₁ = A₂v₂ (or Q = constant) states that mass flow rate is conserved. For incompressible fluids, this means volumetric flow rate is constant through a system.',
  },
];

const faqs = [
  {
    question: 'Why do HVAC systems typically operate in the turbulent regime?',
    answer:
      'Practical flow velocities in HVAC systems (1-3 m/s for water) combined with typical pipe sizes result in Reynolds numbers well above the turbulent threshold (>4000). While turbulent flow has higher friction losses, it provides much better heat transfer and is unavoidable at practical flow rates. Systems are designed to work efficiently within this regime.',
  },
  {
    question: 'How does Reynolds number affect pump selection?',
    answer:
      'Reynolds number indirectly affects pump selection through its influence on friction factor and hence system pressure drop. Most pump curves are developed for turbulent flow conditions. For very viscous fluids (low Re), special corrections may be needed as the pump efficiency reduces and the curve shape changes.',
  },
  {
    question: 'What is the no-slip condition and why is it important?',
    answer:
      "The no-slip condition states that fluid velocity at a solid boundary equals zero - the fluid 'sticks' to the wall. This fundamental principle explains why velocity profiles develop from uniform at entry to parabolic (laminar) or flattened (turbulent) shapes. It's the reason boundary layers and friction exist.",
  },
  {
    question: 'Can flow be laminar in large diameter pipes?',
    answer:
      "Theoretically yes, but practically it's very difficult. For Re < 2300 with large D, velocity must be extremely low (Re = ρvD/μ). For a 100mm pipe with water, v would need to be below 0.023 m/s - essentially stagnant. Large pipes in HVAC systems always operate turbulently at normal flow rates.",
  },
  {
    question: 'How do I calculate flow velocity from volume flow rate?',
    answer:
      'Use v = Q/A where Q is volumetric flow rate (m³/s) and A is cross-sectional area (m²). For circular pipes: A = πD²/4. Remember to convert units consistently - litres/second to m³/s (divide by 1000) and mm to m for diameter. Typical HVAC velocities are 1-3 m/s for water and 3-8 m/s for air.',
  },
  {
    question: 'What happens in the transition zone (Re 2300-4000)?',
    answer:
      'The transition zone is inherently unstable - flow may switch between laminar and turbulent unpredictably. Pressure drop and heat transfer are difficult to predict accurately. Designers typically aim to operate clearly in either laminar or turbulent regimes, with turbulent being normal for HVAC. Avoid designing systems to operate in the transition zone.',
  },
];

const HNCModule2Section2_2 = () => {
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
            eyebrow="Module 2 · Section 2 · Subsection 2"
            title="Flow Characteristics"
            description="Understanding laminar and turbulent flow regimes, Reynolds number, and velocity profiles in building services systems."
            tone="purple"
          />

          <TLDR
            points={[
              'You will calculate Reynolds number (Re = ρvD/µ) for any pipe or duct flow and place it on the laminar (&lt;2,300), transitional (2,300-4,000) or turbulent (&gt;4,000) shelf.',
              'You distinguish laminar (parabolic velocity profile) from turbulent (flatter, time-averaged profile) and explain why heat transfer is much higher in turbulent flow.',
              'You apply the right friction-factor correlation for the regime — Hagen-Poiseuille (laminar), Colebrook-White or Moody chart (turbulent).',
              'You design building services flows to land in turbulent regime — predictable losses, better mixing, better heat transfer.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide C — Reference Data (flow regimes and friction)"
            clause="Reynolds number is calculated from Re = ρvD/µ for circular ducts, with hydraulic diameter substituted for non-circular sections. Laminar flow is taken as Re &lt; 2,300; fully developed turbulent flow occurs above Re ≈ 4,000. Friction factor is read from the Moody chart or calculated from Colebrook-White as a function of Re and relative roughness."
            meaning={
              <>
                CIBSE Guide C provides the UK reference data and friction-factor charts used
                in building services design. As an HNC engineer your pipe-sizing and
                pressure-loss calculations live or die on getting the regime classification
                right.
              </>
            }
            cite="Source: CIBSE Guide C — Reference Data; ASHRAE Fundamentals (parallel international reference)"
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish between laminar and turbulent flow characteristics',
              'Calculate Reynolds number for pipe flow applications',
              'Understand the significance of the critical Reynolds number',
              'Describe velocity profiles for different flow regimes',
              'Apply the continuity equation to pipe systems',
              'Recognise flow patterns in building services applications',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Laminar vs Turbulent Flow"
            plainEnglish="Laminar = orderly, parallel layers, slow. Turbulent = chaotic mixing, the normal state in HVAC pipes. Use Reynolds number to tell which one you've got."
          >
            <p>
              Fluid flow can be classified into two distinct regimes based on how the fluid
              particles move. Understanding these regimes is essential for predicting pressure
              losses and heat transfer in building services.
            </p>
            <p>
              <strong>Laminar flow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Smooth, orderly fluid motion</li>
              <li>Parallel layers slide past each other</li>
              <li>No mixing between layers</li>
              <li>Parabolic velocity profile</li>
              <li>Lower friction losses</li>
              <li>Poor heat transfer</li>
              <li>Re &lt; 2300 in pipes</li>
            </ul>
            <p>
              <strong>Turbulent flow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chaotic, irregular fluid motion</li>
              <li>Random fluctuations and eddies</li>
              <li>Strong mixing between layers</li>
              <li>Flatter velocity profile</li>
              <li>Higher friction losses</li>
              <li>Excellent heat transfer</li>
              <li>Re &gt; 4000 in pipes</li>
            </ul>
            <p>
              <strong>Flow regime comparison:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reynolds number: laminar Re &lt; 2300, turbulent Re &gt; 4000</li>
              <li>Friction factor: laminar f = 64/Re, turbulent uses Moody diagram</li>
              <li>vmax/vavg: laminar 2.0, turbulent ~1.2</li>
              <li>Entry length: laminar ~0.06 Re × D, turbulent 10-60 D</li>
            </ul>
            <p>
              <strong>Practical note:</strong> The transition zone (Re 2300-4000) is unstable and
              unpredictable - avoid designing systems to operate in this range.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Reynolds Number"
            plainEnglish="Re = ρvD/μ. It's a dimensionless number telling you whether your flow is calm or chaotic. Big Re = inertia wins = turbulent. Small Re = viscosity wins = laminar."
          >
            <p>
              The Reynolds number (Re) is a dimensionless quantity that predicts flow regime by
              comparing inertial forces (which cause turbulence) to viscous forces (which dampen
              turbulence).
            </p>
            <p>
              <strong>Reynolds number formula:</strong> Re = ρvD/μ = vD/ν. ρ = density (kg/m³), v =
              velocity (m/s), D = diameter (m), μ = dynamic viscosity (Pa·s), ν = kinematic
              viscosity (m²/s).
            </p>
            <p>
              <strong>Physical interpretation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inertial forces (ρv²):</strong> Tend to cause mixing and turbulence
              </li>
              <li>
                <strong>Viscous forces (μv/D):</strong> Tend to dampen disturbances and maintain order
              </li>
              <li>
                <strong>High Re:</strong> Inertia dominates → turbulent flow
              </li>
              <li>
                <strong>Low Re:</strong> Viscosity dominates → laminar flow
              </li>
            </ul>
            <p>
              <strong>Critical Reynolds numbers:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Circular pipe: ~2300 — most common case</li>
              <li>Flat plate: ~500,000 — based on length</li>
              <li>Open channel: ~500 — based on hydraulic radius</li>
            </ul>
            <p>
              <strong>Remember:</strong> Re is dimensionless - ensure all units are consistent (SI
              units: m, s, kg, Pa).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Velocity Profiles"
            plainEnglish="Laminar = parabola (max at the centre, zero at the wall). Turbulent = nearly flat-topped with thin boundary layers."
          >
            <p>
              The velocity profile describes how fluid velocity varies across a pipe cross-section.
              This varies significantly between laminar and turbulent flow regimes.
            </p>
            <p>
              <strong>Laminar profile (parabolic):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zero velocity at pipe wall (no-slip)</li>
              <li>Maximum velocity at centreline</li>
              <li>vmax = 2 × vavg</li>
              <li>Smooth parabolic shape</li>
              <li>Velocity: v(r) = vmax[1 - (r/R)²]</li>
            </ul>
            <p>
              <strong>Turbulent profile (flattened):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zero velocity at wall (no-slip)</li>
              <li>Nearly uniform across core</li>
              <li>vmax ≈ 1.2 × vavg</li>
              <li>Thin boundary layer near wall</li>
              <li>Better for flow measurement</li>
            </ul>
            <p>
              <strong>The no-slip condition:</strong> At any solid boundary, the fluid velocity
              equals the boundary velocity. For stationary pipes, this means v = 0 at the wall. This
              fundamental principle explains why velocity profiles develop and why friction exists.
            </p>
            <p>
              <strong>Entry length and developing flow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Flow enters pipes with approximately uniform velocity</li>
              <li>Boundary layers grow from walls until fully developed</li>
              <li>
                <strong>Laminar entry:</strong> Le ≈ 0.06 × Re × D (can be very long)
              </li>
              <li>
                <strong>Turbulent entry:</strong> Le ≈ 10-60 × D (much shorter)
              </li>
              <li>Fittings disrupt the profile, requiring re-development</li>
            </ul>
            <p>
              <strong>Flow measurement:</strong> Turbulent flow's flatter profile makes single-point
              velocity measurements more accurate for determining average flow rate.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Continuity Equation and Flow Patterns"
            plainEnglish="What goes in must come out. Halve the pipe diameter, quadruple the velocity. Branches and tees split flow but mass is always conserved."
          >
            <p>
              The continuity equation expresses conservation of mass - what flows in must flow out.
              For incompressible fluids like water, this becomes a powerful tool for analysing pipe
              systems.
            </p>
            <p>
              <strong>Continuity equation:</strong> Q = A₁v₁ = A₂v₂ = constant. For circular pipes:
              A = πD²/4, so v₁D₁² = v₂D₂².
            </p>
            <p>
              <strong>Key implications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reducer:</strong> Smaller area → higher velocity
              </li>
              <li>
                <strong>Expander:</strong> Larger area → lower velocity
              </li>
              <li>
                <strong>Branches:</strong> Total flow in = total flow out
              </li>
              <li>
                <strong>Headers:</strong> Flow distributes based on branch resistances
              </li>
            </ul>
            <p>
              <strong>Typical HVAC water velocities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Pump suction: 0.5-1.5 m/s — low to prevent cavitation</li>
              <li>Pump discharge: 1.5-3.0 m/s — balance friction vs pipe cost</li>
              <li>Mains distribution: 1.0-2.0 m/s — noise and erosion limits</li>
              <li>Branch connections: 1.0-1.5 m/s — lower for small pipes</li>
            </ul>
            <p>
              <strong>Flow patterns in fittings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Elbows:</strong> Flow separation on inner radius, reattachment downstream
              </li>
              <li>
                <strong>Tees:</strong> Complex mixing and flow splitting/combining
              </li>
              <li>
                <strong>Valves:</strong> High turbulence and pressure drop when partially closed
              </li>
              <li>
                <strong>Sudden expansion:</strong> Recirculation zones, high losses
              </li>
            </ul>
            <p>
              <strong>Design tip:</strong> Allow 10-20 pipe diameters of straight pipe upstream of
              flow meters for accurate measurement.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three classic flow calcs: Reynolds number for HVAC pipework, velocity through a reducer, and how temperature changes Reynolds number."
          >
            <p>
              <strong>Example 1 - Reynolds number calculation:</strong> Water at 20°C flows at 1.5
              m/s through a 65mm diameter pipe. Determine the flow regime. (ρ = 998 kg/m³, μ = 0.001
              Pa·s).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Re = ρvD/μ = (998 × 1.5 × 0.065) / 0.001 = <strong>97,305</strong></li>
              <li>Re &gt;&gt; 4000, therefore flow is fully turbulent — typical for HVAC systems</li>
            </ul>
            <p>
              <strong>Example 2 - velocity from continuity:</strong> A 100mm pipe carrying 8 l/s
              reduces to 50mm diameter. What is the velocity in each section?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q = 8 l/s = 0.008 m³/s</li>
              <li>100mm pipe: A₁ = π × 0.1² / 4 = 0.00785 m²; v₁ = 0.008 / 0.00785 = <strong>1.02 m/s</strong></li>
              <li>50mm pipe: A₂ = π × 0.05² / 4 = 0.00196 m²; v₂ = 0.008 / 0.00196 = <strong>4.08 m/s</strong></li>
              <li>Halving diameter quadruples velocity (v ∝ 1/D²)</li>
            </ul>
            <p>
              <strong>Example 3 - effect of temperature on Reynolds number:</strong> Compare Re for
              the same flow rate (2 m/s, 50mm pipe) at 20°C and 80°C.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At 20°C: ρ = 998 kg/m³, μ = 0.001 Pa·s. Re₂₀ = (998 × 2 × 0.05) / 0.001 = <strong>99,800</strong></li>
              <li>At 80°C: ρ = 972 kg/m³, μ = 0.00035 Pa·s. Re₈₀ = (972 × 2 × 0.05) / 0.00035 = <strong>277,714</strong></li>
              <li>Hot water Re is ~2.8× higher due to lower viscosity. Both well into turbulent regime</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The five formulas, the critical Re thresholds, and the design velocities you'll quote on a job."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Re = ρvD/μ = vD/ν</strong> — Reynolds number
              </li>
              <li>
                <strong>Q = Av</strong> — Volume flow rate
              </li>
              <li>
                <strong>A₁v₁ = A₂v₂</strong> — Continuity equation
              </li>
              <li>
                <strong>A = πD²/4</strong> — Circular pipe area
              </li>
              <li>
                <strong>f = 64/Re</strong> — Laminar friction factor
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Critical Re (pipe): <strong>~2300</strong>
              </li>
              <li>
                Fully turbulent Re: <strong>&gt;4000</strong>
              </li>
              <li>
                Laminar vmax/vavg: <strong>2.0</strong>
              </li>
              <li>
                Turbulent vmax/vavg: <strong>~1.2</strong>
              </li>
              <li>
                Water at 20°C: μ = <strong>0.001 Pa·s</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Unit errors:</strong> D in metres, μ in Pa·s for Re calculation
                </li>
                <li>
                  <strong>Confusing viscosities:</strong> Use dynamic (μ) or kinematic (ν) correctly
                </li>
                <li>
                  <strong>Ignoring temperature:</strong> Viscosity varies significantly with temperature
                </li>
                <li>
                  <strong>Transition zone:</strong> Avoid designing systems to operate at Re 2300-4000
                </li>
              </ul>
            }
            doInstead="Convert units to SI before plugging in, pick the right viscosity for the formula, look up viscosity at the actual fluid temperature, and design clearly into laminar or turbulent — never the unstable middle."
          />

          <SectionRule />

          <Scenario
            title="Diagnosing under-performance on a low-flow underfloor heating loop"
            situation={
              <>
                A long underfloor heating loop is under-performing. Manifold flow is set
                correctly, but the surface temperature at the far end is 8 °C below design.
                The loop is 120 m of 16 mm PE-X at 0.18 m/s.
              </>
            }
            whatToDo={
              <>
                Calculate Re = ρvD/µ at LTHW design temperature (970 × 0.18 × 0.014 / 0.00036)
                ≈ 680. The flow is laminar. Heat transfer in laminar flow is much weaker than
                turbulent (Nu ≈ 3.66 vs ≈ 100+ at higher Re), and the temperature drop along
                the loop is amplified. Solutions: shorten loops to standard 80-100 m,
                increase pipe size to allow lower velocity but maintain head, or accept the
                regime and adjust manifold flow to lift the velocity into transitional range
                (above Re 2,300).
              </>
            }
            whyItMatters={
              <>
                Underfloor loops sized without checking Re are the most common case of
                laminar-flow underperformance in building services. Diagnosis is a five-line
                Reynolds calculation.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reynolds number Re = ρvD/µ — dimensionless, dictates flow regime.',
              'Laminar Re &lt; 2,300, transitional 2,300-4,000, turbulent &gt; 4,000 (for circular pipe).',
              'Laminar: parabolic velocity profile, friction factor f = 64/Re — losses linear in velocity.',
              'Turbulent: time-averaged flat velocity profile, friction factor from Colebrook-White or Moody chart — losses quadratic in velocity.',
              'Heat transfer is much higher in turbulent flow — Nusselt number jumps from ~3.66 (laminar) to 100+ (turbulent).',
              'Design building services flows in turbulent regime — predictability and mixing both improve.',
              'Hydraulic diameter D_h = 4A/P for non-circular ducts — substitutes for D in Re calculation.',
              'Underfloor heating loops, low-flow domestic supplies and small chilled-water branches can drop into laminar — always check Re.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fluid properties
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Bernoulli's equation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section2_2;
