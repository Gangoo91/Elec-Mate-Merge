/**
 * Module 2 · Section 1 · Subsection 2 — Convection Heat Transfer
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Heat transfer by fluid motion — natural vs forced, Newton&rsquo;s law of cooling,
 *   heat transfer coefficients. The mechanism behind every radiator, fan-coil, AHU coil
 *   and natural-vent stack you specify.
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

const TITLE = 'Convection Heat Transfer - HNC Module 2 Section 1.2';
const DESCRIPTION =
  "Master convection heat transfer for building services: Newton's Law of Cooling, natural and forced convection, heat transfer coefficients, and practical applications in radiators, heating coils and ventilation systems.";

const quickCheckQuestions = [
  {
    id: 'newton-cooling',
    question: "What does Newton's Law of Cooling state about heat transfer rate?",
    options: [
      'Q = hA(Ts - T∞)',
      'Q = kA(ΔT/L)',
      'Q = εσAT⁴',
      'Q = mcΔT',
    ],
    correctIndex: 0,
    explanation:
      "Newton's Law of Cooling states Q = hA(Ts - T∞), where h is the heat transfer coefficient, A is the surface area, and (Ts - T∞) is the temperature difference between the surface and the surrounding fluid.",
  },
  {
    id: 'natural-convection',
    question: 'What drives natural (free) convection?',
    options: [
      'Steam from cooking or shower areas affecting detectors',
      'Density differences due to temperature gradients',
      'Three — Operatives, Specialists, and Managers & Professionals',
      'Access dates, duration, completion dates, and dependencies',
    ],
    correctIndex: 1,
    explanation:
      'Natural convection is driven by buoyancy forces resulting from density differences caused by temperature gradients. Warm fluid rises (less dense) while cooler fluid sinks (more dense), creating circulation without mechanical assistance.',
  },
  {
    id: 'forced-convection',
    question: 'Which building services application primarily uses forced convection?',
    options: [
      'Panel radiators on walls',
      'Solar chimney ventilation',
      'Trombe walls',
      'Fan coil units',
    ],
    correctIndex: 3,
    explanation:
      'Fan coil units use forced convection where a fan actively moves air across heating or cooling coils. Panel radiators, solar chimneys and Trombe walls rely primarily on natural convection.',
  },
  {
    id: 'h-value',
    question: 'What is the typical heat transfer coefficient (h) for forced air convection?',
    options: [
      '500-10,000 W/m²K',
      '50,000-100,000 W/m²K',
      '5-25 W/m²K',
      '25-250 W/m²K',
    ],
    correctIndex: 3,
    explanation:
      'Forced air convection typically has h values of 25-250 W/m²K. Natural convection in air is lower (5-25 W/m²K), while water-based systems have much higher values (500-10,000 W/m²K for forced water convection).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is convection?',
    options: [
      'Heat transfer through direct molecular contact in solids',
      'Heat transfer by fluid motion (liquid or gas)',
      'Heat transfer by electromagnetic waves',
      'Heat transfer through a vacuum',
    ],
    correctAnswer: 1,
    explanation:
      'Convection is heat transfer that occurs through the bulk movement of fluids (liquids or gases). It combines diffusion with advection (bulk fluid motion).',
  },
  {
    id: 2,
    question:
      'A radiator surface at 70°C transfers heat to room air at 20°C. If h = 10 W/m²K and the surface area is 2m², what is the heat transfer rate?',
    options: [
      '1400W',
      '100W',
      '1000W',
      '500W',
    ],
    correctAnswer: 2,
    explanation: 'Using Q = hA(Ts - T∞): Q = 10 × 2 × (70 - 20) = 10 × 2 × 50 = 1000W',
  },
  {
    id: 3,
    question: 'What is the primary mechanism that creates natural convection currents?',
    options: [
      'Electromagnetic radiation',
      'Pressure from mechanical fans',
      'Phase change of refrigerants',
      'Buoyancy forces from density differences',
    ],
    correctAnswer: 3,
    explanation:
      'Natural convection is driven by buoyancy forces. Heated fluid becomes less dense and rises, while cooler, denser fluid sinks. This creates circulation patterns without mechanical assistance.',
  },
  {
    id: 4,
    question:
      'Why do forced convection systems typically have higher heat transfer rates than natural convection?',
    options: [
      'Higher fluid velocities increase the heat transfer coefficient',
      'The thermal resistance of the air layer adjacent to a surface (Rsi, Rso)',
      'They transfer heat primarily by convection (50-70%)',
      'Water has higher thermal conductivity and specific heat capacity',
    ],
    correctAnswer: 0,
    explanation:
      'Forced convection achieves higher heat transfer rates because the increased fluid velocity enhances mixing and reduces the thermal boundary layer thickness, significantly increasing the heat transfer coefficient (h).',
  },
  {
    id: 5,
    question: 'What is surface film resistance in building heat transfer calculations?',
    options: [
      'They transfer heat primarily by convection (50-70%)',
      'The thermal resistance of the air layer adjacent to a surface (Rsi, Rso)',
      'Temperature difference between inside and outside creating buoyancy-driven airflow',
      'Higher fluid velocities increase the heat transfer coefficient',
    ],
    correctAnswer: 1,
    explanation:
      'Surface film resistance (Rsi for internal, Rso for external) represents the thermal resistance of the thin air layer that forms on surfaces. It equals 1/h, where h is the convective heat transfer coefficient.',
  },
  {
    id: 6,
    question:
      'What are typical internal and external surface resistances used in UK U-value calculations?',
    options: [
      'Rsi = 0.04 m²K/W, Rso = 0.13 m²K/W',
      'Rsi = 0.25 m²K/W, Rso = 0.25 m²K/W',
      'Rsi = 0.13 m²K/W, Rso = 0.04 m²K/W',
      'Rsi = 0.10 m²K/W, Rso = 0.10 m²K/W',
    ],
    correctAnswer: 2,
    explanation:
      'Standard values are Rsi = 0.13 m²K/W (internal) and Rso = 0.04 m²K/W (external). The external value is lower because higher wind speeds increase the heat transfer coefficient, reducing thermal resistance.',
  },
  {
    id: 7,
    question:
      'A heating coil transfers 5kW with a surface area of 0.5m² and temperature difference of 40K. What is the heat transfer coefficient?',
    options: [
      '50 W/m²K',
      '100 W/m²K',
      '500 W/m²K',
      '250 W/m²K',
    ],
    correctAnswer: 3,
    explanation: 'Rearranging Q = hAΔT: h = Q/(AΔT) = 5000/(0.5 × 40) = 5000/20 = 250 W/m²K',
  },
  {
    id: 8,
    question: 'Which statement about panel radiators is correct?',
    options: [
      'They transfer heat primarily by convection (50-70%)',
      'They only work with forced air circulation',
      'They transfer heat primarily by radiation (>70%)',
      'They require fan assistance to operate',
    ],
    correctAnswer: 0,
    explanation:
      "Despite the name 'radiator', panel radiators transfer 50-70% of their heat output by natural convection and only 30-50% by radiation. The fins create channels that enhance convective air flow.",
  },
  {
    id: 9,
    question: "In a naturally ventilated building, what causes the 'stack effect'?",
    options: [
      'The thermal resistance of the air layer adjacent to a surface (Rsi, Rso)',
      'Temperature difference between inside and outside creating buoyancy-driven airflow',
      'Higher fluid velocities increase the heat transfer coefficient',
      'Water has higher thermal conductivity and specific heat capacity',
    ],
    correctAnswer: 1,
    explanation:
      'The stack effect is caused by the temperature difference between inside and outside air. Warmer indoor air is less dense and rises, creating a pressure difference that draws in cooler air at lower levels and exhausts warmer air at higher levels.',
  },
  {
    id: 10,
    question: 'Why is the heat transfer coefficient for water convection much higher than for air?',
    options: [
      'The thermal resistance of the air layer adjacent to a surface (Rsi, Rso)',
      'Higher fluid velocities increase the heat transfer coefficient',
      'Water has higher thermal conductivity and specific heat capacity',
      'Temperature difference between inside and outside creating buoyancy-driven airflow',
    ],
    correctAnswer: 2,
    explanation:
      'Water has approximately 25 times higher thermal conductivity and 4 times higher volumetric heat capacity than air. This allows water to transfer heat much more effectively, resulting in h values 20-100 times higher than air.',
  },
  {
    id: 11,
    question:
      'A fan coil unit increases air velocity from 0.5 m/s to 3 m/s over the heating coil. What effect does this have?',
    options: [
      'Heat transfer decreases due to reduced contact time',
      'Heat transfer only changes if coil temperature changes',
      'No change - temperature difference determines heat transfer',
      'Heat transfer coefficient increases, improving heat output',
    ],
    correctAnswer: 3,
    explanation:
      "Increasing air velocity increases the heat transfer coefficient (h) by enhancing mixing and reducing the thermal boundary layer. This significantly increases the heat transfer rate from the coil to the air, improving the unit's heating capacity.",
  },
  {
    id: 12,
    question:
      'What is the relationship between surface film resistance (R) and heat transfer coefficient (h)?',
    options: [
      'R = 1/h',
      'R = h²',
      'R = h × A',
      'R = h/A',
    ],
    correctAnswer: 0,
    explanation:
      'Surface film resistance R = 1/h (m²K/W). This inverse relationship means higher heat transfer coefficients result in lower thermal resistance. For example, if h = 25 W/m²K, then R = 1/25 = 0.04 m²K/W.',
  },
];

const faqs = [
  {
    question: "Why are panel radiators called 'radiators' when they mainly work by convection?",
    answer:
      "The name is historical - early heating devices did transfer heat primarily by radiation. Modern panel radiators with convector fins actually transfer 50-70% of heat by convection. The warm panels create upward air currents that circulate room air. Some manufacturers now market them as 'convector radiators' to be more accurate.",
  },
  {
    question: 'How does the position of a radiator affect its performance?',
    answer:
      'Position significantly affects convective performance. Radiators work best under windows where they counteract cold downdraughts and promote good air circulation. Placing a radiator behind furniture or installing a deep windowsill above it restricts airflow and can reduce output by 10-20%. Wall-mounted radiators need adequate clearance above and below for natural convection.',
  },
  {
    question:
      'What is the difference between the Nusselt number and the heat transfer coefficient?',
    answer:
      "The Nusselt number (Nu) is a dimensionless ratio that characterises convective heat transfer: Nu = hL/k, where h is the heat transfer coefficient, L is a characteristic length, and k is the fluid's thermal conductivity. Engineers use Nu correlations to calculate h for different flow conditions. A higher Nu indicates more effective convection relative to pure conduction.",
  },
  {
    question: 'Why do underfloor heating systems operate at lower temperatures than radiators?',
    answer:
      'Underfloor heating has a much larger surface area for heat transfer compared to radiators. Using Q = hAΔT, a larger A allows the same heat output with a smaller temperature difference (ΔT). This enables flow temperatures of 35-45°C compared to 70-80°C for radiators, making underfloor heating ideal for heat pumps which perform better at lower temperatures.',
  },
  {
    question: 'How do I account for convection in U-value calculations?',
    answer:
      'Surface film resistances account for convective heat transfer at wall surfaces. Add internal surface resistance (Rsi = 0.13 m²K/W for horizontal heat flow) and external surface resistance (Rso = 0.04 m²K/W for exposed walls) to the material resistances. Total R = Rsi + ΣR(materials) + Rso, then U = 1/R.',
  },
  {
    question: 'What factors affect the heat transfer coefficient in practical systems?',
    answer:
      'Key factors include: fluid velocity (higher = higher h), fluid properties (thermal conductivity, viscosity, density), surface geometry (fins increase effective area), surface roughness (can enhance turbulence), and flow regime (turbulent flow has higher h than laminar). Temperature also affects fluid properties, influencing h indirectly.',
  },
];

const HNCModule2Section1_2 = () => {
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
            eyebrow="Module 2 · Section 1 · Subsection 2"
            title="Convection Heat Transfer"
            description="Understanding heat transfer by fluid motion for heating, cooling and ventilation system design."
            tone="purple"
          />

          <TLDR
            points={[
              'You will apply Newton&rsquo;s law of cooling (Q = hA·ΔT) to size emitters, select coil capacity and predict surface temperatures.',
              'You distinguish natural convection (buoyancy-driven, low h) from forced convection (pump/fan-driven, high h) and pick the right one for the duty.',
              'You read film coefficients (h, W/m²·K) from CIBSE Guide C and use them in steady-state heat transfer calculations.',
              'You apply Grashof, Reynolds, Prandtl and Nusselt numbers when you need to derive h rather than look it up.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide A — Environmental Design"
            clause="Convective heat transfer coefficients for building surfaces and components are tabulated for design use; designers must select coefficients consistent with the boundary conditions, surface orientation and air movement assumed in the design."
            meaning={
              <>
                CIBSE Guide A is the UK reference for convective h values in building services
                design. The choice of coefficient must match the assumed flow regime — natural
                vs forced — and the surface orientation. Generic coefficients lead to
                generically wrong answers.
              </>
            }
            cite="Source: CIBSE Guide A — Environmental Design (latest edition); BS EN ISO 6946 — Building components and elements: thermal resistance and transmittance"
          />

          <LearningOutcomes
            outcomes={[
              "Apply Newton's Law of Cooling to calculate convective heat transfer",
              'Distinguish between natural and forced convection mechanisms',
              'Use appropriate heat transfer coefficients for different applications',
              'Calculate surface film resistance and its role in U-values',
              'Analyse convection in radiators, heating coils and ventilation',
              'Size heating and cooling equipment using convection principles',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Newton's Law of Cooling"
            plainEnglish="If a hot surface meets moving fluid, heat moves out at a rate that depends on three things: how good the fluid is at carrying heat (h), how big the surface is (A), and the temperature gap (ΔT)."
          >
            <p>
              Newton's Law of Cooling describes the rate of heat transfer between a surface and a
              moving fluid. It is the fundamental equation for all convective heat transfer
              calculations in building services.
            </p>
            <p>
              <strong>The equation:</strong> Q = hA(Ts - T∞)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q</strong> = Heat transfer rate (W)
              </li>
              <li>
                <strong>h</strong> = Heat transfer coefficient (W/m²K)
              </li>
              <li>
                <strong>A</strong> = Surface area (m²)
              </li>
              <li>
                <strong>Ts</strong> = Surface temperature (°C or K)
              </li>
              <li>
                <strong>T∞</strong> = Bulk fluid temperature (°C or K)
              </li>
            </ul>
            <p>
              <strong>Key principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat transfer is proportional to the temperature difference</li>
              <li>Larger surface areas transfer more heat</li>
              <li>The coefficient h characterises the effectiveness of convection</li>
              <li>h depends on fluid properties, velocity, and geometry</li>
            </ul>
            <p>
              <strong>Worked example:</strong> A panel radiator has a surface area of 1.8m²,
              operates at 65°C in a room at 21°C, with h = 8 W/m²K. Calculate the convective heat
              output.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q = hA(Ts - T∞)</li>
              <li>Q = 8 × 1.8 × (65 - 21)</li>
              <li>Q = 8 × 1.8 × 44</li>
              <li>Q = <strong>633.6W convective</strong></li>
              <li>This is the convective component; add radiant output for total</li>
            </ul>
            <p>
              <strong>Remember:</strong> The temperature difference drives heat transfer -
              increasing supply temperature or reducing room temperature increases output.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Natural (Free) Convection"
            plainEnglish="Heat the air, it gets less dense, it rises. Cooler air drops in to take its place. That's the engine behind every panel radiator and the stack effect in tall buildings."
          >
            <p>
              Natural convection occurs when fluid motion is driven by buoyancy forces resulting
              from density differences. Temperature gradients cause density variations - warm fluid
              rises while cooler fluid sinks, creating circulation without mechanical assistance.
            </p>
            <p>
              <strong>The mechanism:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fluid near a hot surface heats up and expands</li>
              <li>Expanded fluid becomes less dense than surrounding cooler fluid</li>
              <li>Buoyancy force causes warm fluid to rise</li>
              <li>Cooler, denser fluid moves in to replace it</li>
              <li>This creates continuous circulation (convection currents)</li>
            </ul>
            <p>
              <strong>Building services examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Panel radiators:</strong> Create rising warm air columns
              </li>
              <li>
                <strong>Stack effect:</strong> Warm air rises through buildings
              </li>
              <li>
                <strong>Natural ventilation:</strong> Temperature-driven airflow
              </li>
              <li>
                <strong>Trombe walls:</strong> Passive solar heating
              </li>
              <li>
                <strong>Solar chimneys:</strong> Buoyancy-driven extract
              </li>
            </ul>
            <p>
              <strong>Typical h values (air):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Vertical surfaces:</strong> 5-10 W/m²K
              </li>
              <li>
                <strong>Horizontal (hot up):</strong> 6-12 W/m²K
              </li>
              <li>
                <strong>Horizontal (hot down):</strong> 2-5 W/m²K
              </li>
              <li>
                <strong>Enclosed air gaps:</strong> 3-8 W/m²K
              </li>
            </ul>
            <p>
              <strong>The stack effect:</strong> In buildings, the stack effect describes
              buoyancy-driven airflow caused by temperature differences between inside and outside.
              The driving pressure is: ΔP = ρg·h·(Ti - To)/To. Where h = height, ρ = air density, g
              = gravity.
            </p>
            <p>
              <strong>Design tip:</strong> In winter, warm internal air creates positive pressure at
              high level and negative pressure at low level, drawing in cold air through lower
              openings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Forced Convection"
            plainEnglish="Stick a fan or pump in front of it. Faster fluid = thinner boundary layer = much higher h. That's why fan coil units are tiny but kick out serious wattage."
          >
            <p>
              Forced convection occurs when fluid motion is driven by external means such as fans,
              pumps, or blowers. The increased fluid velocity significantly enhances heat transfer
              compared to natural convection.
            </p>
            <p>
              <strong>Why forced convection is more effective:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher fluid velocities increase the heat transfer coefficient</li>
              <li>Reduces thermal boundary layer thickness</li>
              <li>Increases mixing and turbulence</li>
              <li>Allows compact heat exchanger designs</li>
              <li>Provides controllable and predictable heat transfer</li>
            </ul>
            <p>
              <strong>Heat transfer coefficients - forced convection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Air (low velocity): h = 25-50 W/m²K — Fan coil units, AHUs</li>
              <li>Air (high velocity): h = 50-250 W/m²K — Industrial cooling, car radiators</li>
              <li>Water (pipes): h = 500-3,000 W/m²K — Heating circuits</li>
              <li>Water (turbulent): h = 3,000-10,000 W/m²K — Heat exchangers</li>
              <li>Boiling water: h = 2,500-25,000 W/m²K — Boilers, evaporators</li>
              <li>Condensing steam: h = 5,000-100,000 W/m²K — Steam heating coils</li>
            </ul>
            <p>
              <strong>Building services examples:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fan coil units:</strong> Fans move air over coils
              </li>
              <li>
                <strong>AHUs:</strong> Supply/extract air handling
              </li>
              <li>
                <strong>Chilled beams:</strong> Induced air circulation
              </li>
              <li>
                <strong>Heat pumps:</strong> Refrigerant circulation
              </li>
            </ul>
            <p>
              <strong>Advantages:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher heat transfer rates</li>
              <li>Smaller equipment for same output</li>
              <li>Precise temperature control</li>
              <li>Works against natural gradients</li>
            </ul>
            <p>
              <strong>Energy trade-off:</strong> Forced convection requires fan/pump energy but
              enables compact equipment and precise control - often more efficient overall than
              oversized natural convection systems.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Surface Film Resistance and Heat Transfer Coefficients"
            plainEnglish="There's always a thin layer of nearly-still fluid stuck to a surface. That layer is your surface resistance — Rsi inside, Rso outside. They sit at the start and end of every U-value sum."
          >
            <p>
              When heat flows from a surface to a fluid (or vice versa), a thin layer of relatively
              still fluid forms at the surface. This creates a thermal resistance called the surface
              film resistance, crucial for U-value calculations.
            </p>
            <p>
              <strong>Relationship between h and R:</strong> Rs = 1/h
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Rs</strong> = Surface film resistance (m²K/W)
              </li>
              <li>
                <strong>h</strong> = Convective heat transfer coefficient (W/m²K)
              </li>
            </ul>
            <p>
              <strong>Standard surface resistances (BS EN ISO 6946):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Internal (Rsi), horizontal: R = 0.13 m²K/W (h ≈ 7.7 W/m²K)</li>
              <li>Internal (Rsi), upward: R = 0.10 m²K/W (h ≈ 10.0 W/m²K)</li>
              <li>Internal (Rsi), downward: R = 0.17 m²K/W (h ≈ 5.9 W/m²K)</li>
              <li>External (Rso), any direction: R = 0.04 m²K/W (h ≈ 25.0 W/m²K)</li>
            </ul>
            <p>
              <strong>U-value calculation including surface resistances:</strong> Calculate the
              U-value of a wall: 102mm brick (k=0.77), 50mm cavity (R=0.18), 100mm block (k=0.19),
              12.5mm plasterboard (k=0.16).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total R = Rsi + R(brick) + R(cavity) + R(block) + R(plaster) + Rso</li>
              <li>R(brick) = 0.102/0.77 = 0.132 m²K/W</li>
              <li>R(cavity) = 0.18 m²K/W (from tables)</li>
              <li>R(block) = 0.100/0.19 = 0.526 m²K/W</li>
              <li>R(plaster) = 0.0125/0.16 = 0.078 m²K/W</li>
              <li>Total R = 0.13 + 0.132 + 0.18 + 0.526 + 0.078 + 0.04 = <strong>1.086 m²K/W</strong></li>
              <li>U = 1/R = 1/1.086 = <strong>0.92 W/m²K</strong></li>
            </ul>
            <p>
              <strong>Why Rso is lower than Rsi:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External surfaces are exposed to wind</li>
              <li>Higher air velocities increase convective heat transfer (higher h)</li>
              <li>Higher h means lower thermal resistance (R = 1/h)</li>
              <li>Rso = 0.04 implies h ≈ 25 W/m²K (forced convection)</li>
              <li>Rsi = 0.13 implies h ≈ 7.7 W/m²K (natural convection)</li>
            </ul>
            <p>
              <strong>Exam tip:</strong> Always include Rsi and Rso in U-value calculations.
              Forgetting surface resistances typically underestimates R by 0.17 m²K/W (about 15-20%
              for modern insulated walls).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Building services applications"
            plainEnglish="Where convection actually shows up: panel radiators, heating coils, and natural ventilation."
          >
            <p>
              <strong>Panel radiators:</strong> Despite their name, panel radiators transfer 50-70%
              of heat by convection. The panel warms adjacent air, which rises and is replaced by
              cooler air from below.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Convector fins:</strong> Increase surface area and enhance convection
              </li>
              <li>
                <strong>Type 11:</strong> Single panel, single convector (~60% convection)
              </li>
              <li>
                <strong>Type 22:</strong> Double panel, double convector (~70% convection)
              </li>
              <li>
                <strong>Positioning:</strong> Under windows to counter cold downdraughts
              </li>
              <li>
                <strong>Output correction:</strong> Reduce by 10-15% if airflow restricted
              </li>
            </ul>
            <p>
              <strong>Heating and cooling coils:</strong> Coils in AHUs and fan coil units use
              forced convection to transfer heat between air and water/refrigerant. Design involves
              optimising the heat transfer coefficient. Coil capacity: Q = U × A × LMTD (Log Mean
              Temperature Difference).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fin spacing:</strong> Closer fins = more area but higher pressure drop
              </li>
              <li>
                <strong>Face velocity:</strong> 2-3 m/s typical, affects h and pressure drop
              </li>
              <li>
                <strong>Rows deep:</strong> More rows = more capacity but diminishing returns
              </li>
              <li>
                <strong>Water velocity:</strong> 0.5-2 m/s for turbulent flow in tubes
              </li>
            </ul>
            <p>
              <strong>Natural ventilation:</strong> Natural ventilation relies on buoyancy (stack
              effect) and wind to move air through buildings without mechanical systems.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stack effect:</strong> Height × temperature difference drives flow
              </li>
              <li>
                <strong>Cross-ventilation:</strong> Wind creates pressure differences
              </li>
              <li>
                <strong>Atria:</strong> Tall spaces enhance stack-driven ventilation
              </li>
              <li>
                <strong>Night cooling:</strong> Purge heat using cool night air
              </li>
              <li>
                <strong>Solar chimneys:</strong> Sun heats air to enhance buoyancy
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three classic building-services calcs: a radiator, a heating coil, and the stack-effect pressure that drives natural ventilation."
          >
            <p>
              <strong>Example 1 - radiator output:</strong> A Type 22 radiator (1.4m × 0.6m, both
              sides exposed) operates at mean water temperature 60°C in a room at 20°C. Given h = 10
              W/m²K for convection, estimate the convective heat output assuming 65% of total output
              is convective.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Effective surface area (both panels): A = 2 × (1.4 × 0.6) = 1.68m²</li>
              <li>Temperature difference: ΔT = 60 - 20 = 40K</li>
              <li>Convective output: Q = hAΔT = 10 × 1.68 × 40 = <strong>672W convective</strong></li>
              <li>If this is 65% of total: Total output = 672/0.65 = <strong>~1034W total</strong></li>
            </ul>
            <p>
              <strong>Example 2 - heating coil sizing:</strong> A heating coil must raise 1.5 m³/s
              of air from 5°C to 22°C. LTHW at 80/60°C is available. If overall U = 45 W/m²K and
              LMTD = 52K, what coil area is required?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat required: Q = ṁ × cp × ΔT</li>
              <li>Q = (1.5 × 1.2) × 1.005 × (22-5) (ρ = 1.2 kg/m³, cp = 1.005 kJ/kgK)</li>
              <li>Q = 1.8 × 1.005 × 17 = 30.75 kW = <strong>30,750W</strong></li>
              <li>Coil area: A = Q/(U × LMTD) = 30750/(45 × 52) = 30750/2340</li>
              <li>A = <strong>13.1 m² coil face area</strong></li>
            </ul>
            <p>
              <strong>Example 3 - stack effect ventilation:</strong> An atrium is 15m tall. Indoor
              temperature is 22°C, outdoor is 5°C. Estimate the stack pressure driving natural
              ventilation.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ΔP = ρ × g × h × (Ti - To)/To (using ρ = 1.2 kg/m³, g = 9.81 m/s², To in Kelvin)</li>
              <li>ΔP = 1.2 × 9.81 × 15 × (22-5)/(273+5)</li>
              <li>ΔP = 176.6 × 17/278 = <strong>10.8 Pa</strong></li>
              <li>This pressure difference drives airflow through openings</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Quick reference"
            plainEnglish="The handful of equations and standard values you keep coming back to."
          >
            <p>
              <strong>Key equations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Newton's Law: Q = hA(Ts - T∞)</li>
              <li>Surface resistance: Rs = 1/h</li>
              <li>Total R = Rsi + ΣR(materials) + Rso</li>
              <li>U-value: U = 1/Rtotal</li>
            </ul>
            <p>
              <strong>Standard values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Internal surface: Rsi = 0.13 m²K/W</li>
              <li>External surface: Rso = 0.04 m²K/W</li>
              <li>Natural air: h = 5-25 W/m²K</li>
              <li>Forced air: h = 25-250 W/m²K</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Selecting fan-coil units for an open-plan office"
            situation={
              <>
                You are sizing fan-coil units for an open-plan office with a 6 kW cooling
                load per zone. The design supplies 12 °C chilled water with a 6 K rise. The
                air-side delta-T at the coil is 11 K (room 24 °C, off-coil 13 °C).
              </>
            }
            whatToDo={
              <>
                Apply Q = hA·ΔT on both sides of the coil. Manufacturer data gives the
                overall U·A for the coil (combined water-side and air-side h). Cross-check
                the air-side LMTD calculation matches the manufacturer&rsquo;s rated capacity
                at your design conditions. Allow margin for fouling factor (typically 10%
                derating). Document the selection — duty, water flow, air flow, dB(A) — in
                the equipment schedule.
              </>
            }
            whyItMatters={
              <>
                A fan-coil that rated correctly on paper but does not transfer heat as
                expected at site conditions creates a complaints trail and a re-engineering
                bill. Newton&rsquo;s law of cooling drives the calculation that prevents it.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Newton&rsquo;s law of cooling: Q = hA·ΔT — the basis of every emitter and coil sizing calculation.',
              'Natural convection: buoyancy-driven, h typically 5-25 W/m²·K (radiator surface, vertical wall).',
              'Forced convection: pump/fan-driven, h typically 25-15,000 W/m²·K (FCU coil, AHU, condensing tube bank).',
              'Dimensionless groups: Reynolds (inertia/viscous), Grashof (buoyancy/viscous), Prandtl (momentum/thermal diffusivity), Nusselt (convective/conductive).',
              'Nusselt number Nu = hD/k — when you cannot look h up, you derive Nu from correlations and back-calculate h.',
              'CIBSE Guide A (and BS EN ISO 6946) provides UK design coefficients for building surfaces.',
              'Coil ratings depend on water-side and air-side flow regime — derate for fouling, partial-load and altitude.',
              'Stack-effect ventilation in tall buildings is buoyancy-driven natural convection — Grashof analysis predicts the airflow rate without a fan.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Conduction
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Radiation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section1_2;
