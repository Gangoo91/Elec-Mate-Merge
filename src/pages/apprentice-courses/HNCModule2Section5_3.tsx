/**
 * Module 2 · Section 5 · Subsection 3 — Thermal Mass and Time Lag
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Admittance (Y), decrement factor (f), time lag (φ) — the dynamic-response
 *   parameters that decide whether a building rides through summer peaks or
 *   overheats by mid-afternoon.
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
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Thermal Mass and Time Lag - HNC Module 2 Section 5.3';
const DESCRIPTION =
  'Understanding admittance (Y-value), decrement factor, heavyweight versus lightweight construction, and peak load shifting through thermal storage.';

const quickCheckQuestions = [
  {
    id: 'admittance-def',
    question: 'What does the admittance (Y-value) of a building element describe?',
    options: [
      'Its steady-state heat loss',
      'Its ability to store and release heat cyclically',
      'Its resistance to moisture penetration',
      'Its acoustic performance',
    ],
    correctIndex: 1,
    explanation:
      'Admittance (Y-value, W/m²K) describes how a surface absorbs and releases heat in response to cyclic temperature variations. Higher admittance means greater thermal storage capacity.',
  },
  {
    id: 'decrement-factor',
    question: 'A wall has a decrement factor of 0.3. What does this mean?',
    options: [
      '30% of steady-state heat passes through',
      'The temperature swing inside is 30% of that outside',
      '70% of the heat is stored in the wall',
      'The wall has 30% thermal bridging',
    ],
    correctIndex: 1,
    explanation:
      'Decrement factor (f) is the ratio of internal to external temperature swing. f = 0.3 means if external temperature swings 20K, internal swing is only 6K (20 × 0.3) - the wall dampens fluctuations.',
  },
  {
    id: 'time-lag',
    question:
      'A heavyweight external wall has an 8-hour time lag. If peak external temperature is at 14:00, when does peak heat reach inside?',
    options: ['06:00', '14:00', '18:00', '22:00'],
    correctIndex: 3,
    explanation:
      'Time lag is the delay between external peak and internal peak. With 8-hour lag, external peak at 14:00 produces internal peak at 22:00 (14:00 + 8h), after occupants have left.',
  },
  {
    id: 'lightweight-cooling',
    question:
      'Why do lightweight buildings typically have higher peak cooling loads than heavyweight buildings?',
    options: [
      'They have worse insulation',
      'They cannot store heat to spread gains over time',
      'They have more glazing',
      'They always have more internal gains',
    ],
    correctIndex: 1,
    explanation:
      'Lightweight buildings cannot store heat, so all gains immediately raise temperature. Heavyweight buildings absorb gains into structure, reducing peak temperature and spreading load over time.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the units of thermal admittance (Y-value)?',
    options: ['m²K/W', 'W/m²K', 'W/mK', 'J/kgK'],
    correctAnswer: 1,
    explanation:
      'Admittance has the same units as U-value: W/m²K. However, they measure different properties - U-value is steady-state conductance, Y-value is cyclic response capability.',
  },
  {
    id: 2,
    question: 'Which building element typically has the highest admittance?',
    options: [
      'Plasterboard on studs',
      'Insulated lightweight steel panel',
      'Dense concrete (150mm exposed)',
      'Double glazing',
    ],
    correctAnswer: 2,
    explanation:
      "Dense concrete has high admittance (4-6 W/m²K) due to its thermal mass. Lightweight elements like plasterboard (1-2 W/m²K) and glazing (5-6 W/m²K) have moderate values but glazing doesn't store heat.",
  },
  {
    id: 3,
    question: 'What is the approximate time lag for a 215mm solid brick wall?',
    options: ['2-3 hours', '6-8 hours', '10-12 hours', '24 hours'],
    correctAnswer: 1,
    explanation:
      'A 215mm solid brick wall has a time lag of approximately 6-8 hours. This shifts afternoon heat gains to evening, potentially reducing cooling demand during occupied hours.',
  },
  {
    id: 4,
    question:
      'How does internal thermal mass (exposed concrete soffit) benefit an office building?',
    options: [
      'Reduces heating energy only',
      'Improves acoustic performance only',
      'Absorbs daytime gains, reducing cooling load and enabling night purge',
      'Increases natural daylight levels',
    ],
    correctAnswer: 2,
    explanation:
      'Exposed thermal mass absorbs heat during the day (reducing peak temperature) and releases it at night (when it can be purged with cool night air), reducing mechanical cooling requirements.',
  },
  {
    id: 5,
    question: "What is 'night cooling' or 'night purge ventilation'?",
    options: [
      'Running the air conditioning at night',
      'Using cool night air to remove heat stored in thermal mass',
      'Closing all ventilation at night',
      'Cooling the external fabric at night',
    ],
    correctAnswer: 1,
    explanation:
      "Night purge ventilation uses cool night air to remove heat stored in thermal mass during the day. This 'recharges' the thermal storage, enabling it to absorb gains the following day.",
  },
  {
    id: 6,
    question: 'For the admittance method, what 24-hour temperature cycle is typically assumed?',
    options: ['Square wave', 'Linear rise and fall', 'Sinusoidal', 'Exponential decay'],
    correctAnswer: 2,
    explanation:
      'The CIBSE admittance method assumes a sinusoidal 24-hour temperature cycle. This mathematical simplification enables manual calculation of thermal storage effects.',
  },
  {
    id: 7,
    question:
      'A building has high admittance sum (ΣAY). What does this indicate about its cooling load profile?',
    options: [
      'Higher peak cooling load',
      'Lower peak but longer duration cooling',
      'No effect on cooling load',
      'Higher ventilation rate required',
    ],
    correctAnswer: 1,
    explanation:
      'High ΣAY (admittance × area sum) means high thermal storage, reducing peak cooling load but spreading the load over more hours. This can enable smaller plant or shift load to cheaper off-peak periods.',
  },
  {
    id: 8,
    question:
      'Which factor determines the position of insulation for best thermal mass performance?',
    options: [
      'Moisture resistance',
      'Whether mass is on warm (internal) or cold (external) side',
      'Fire rating requirements',
      'Acoustic requirements',
    ],
    correctAnswer: 1,
    explanation:
      'For thermal mass to be effective, it must be on the warm (internal) side of insulation. External insulation allows internal mass to interact with room temperature. Internal insulation isolates mass from the room.',
  },
  {
    id: 9,
    question: 'What is the typical admittance of a suspended ceiling with tiles?',
    options: ['0.5-1.0 W/m²K', '1.0-2.0 W/m²K', '4.0-5.0 W/m²K', '6.0-8.0 W/m²K'],
    correctAnswer: 0,
    explanation:
      'Suspended ceiling tiles have very low admittance (0.5-1.0 W/m²K) due to their lightweight construction. They effectively isolate the room from any concrete soffit thermal mass above.',
  },
  {
    id: 10,
    question: 'In CIBSE Guide A, what is the response factor (fr) used for?',
    options: [
      'Fire spread calculations',
      'Classifying buildings as fast, medium or slow response',
      'Calculating ventilation rates',
      'Determining insulation thickness',
    ],
    correctAnswer: 1,
    explanation:
      'Response factor (fr) classifies building thermal response: fr < 4 = fast (lightweight), 4 < fr < 6 = medium, fr > 6 = slow (heavyweight). This affects both heating and cooling system selection.',
  },
  {
    id: 11,
    question: 'Why is thermal mass less effective in buildings with high ventilation rates?',
    options: [
      'Air removes heat faster than mass can store it',
      'Ventilation air has lower specific heat',
      'Fresh air is always at external temperature',
      'Thermal mass increases pressure drop',
    ],
    correctAnswer: 0,
    explanation:
      'High ventilation rates quickly remove heat from the space, reducing the benefit of thermal storage. The air change rate competes with thermal mass absorption - very high rates can make mass ineffective.',
  },
  {
    id: 12,
    question: 'For Part O overheating assessment, how does thermal mass affect compliance?',
    options: [
      'No effect - only glazing matters',
      'Helps in heavyweight construction by reducing peak temperatures',
      'Makes compliance harder due to heat storage',
      'Only relevant if mechanical cooling is installed',
    ],
    correctAnswer: 1,
    explanation:
      'TM59 overheating assessment benefits from thermal mass in heavyweight buildings. Peak temperatures are reduced through absorption, and night ventilation can discharge stored heat, aiding compliance.',
  },
];

const faqs = [
  {
    question: 'What is the difference between admittance (Y-value) and thermal diffusivity?',
    answer:
      'Admittance describes cyclic heat flow at a surface (W/m²K) and is used for room temperature calculations. Thermal diffusivity (m²/s) describes how quickly temperature changes propagate through a material and determines time lag. Both relate to thermal mass but for different calculation purposes.',
  },
  {
    question: 'How do I maximise the benefit of thermal mass in a building?',
    answer:
      'Expose thermal mass to the room (no suspended ceilings over concrete), place insulation on the external side, ensure good contact between mass and room air, avoid carpets over concrete floors, and enable night ventilation to discharge stored heat. Consider radiant ceiling panels which allow mass contact while providing cooling.',
  },
  {
    question: 'Is thermal mass always beneficial for energy efficiency?',
    answer:
      'Not always. Thermal mass benefits buildings with variable gains and the ability to discharge heat at night. Continuously occupied buildings (hospitals, data centres) or those without night cooling opportunity may not benefit. Intermittently heated buildings may take longer to warm up.',
  },
  {
    question: 'How do phase change materials (PCMs) provide thermal mass?',
    answer:
      'PCMs store latent heat by melting and solidifying at a set temperature (typically 21-26°C for buildings). They provide equivalent thermal storage to much heavier concrete in lighter materials. However, they need temperature cycling through their phase change point to be effective.',
  },
  {
    question: 'Why do modern offices often have poor thermal mass despite concrete structure?',
    answer:
      'Suspended ceilings isolate concrete soffits, raised floors separate floor mass, internal partitions are lightweight, and HVAC systems often overwhelm thermal effects. To utilise mass: expose soffits where possible, use thermally active building systems (TABS), and coordinate with architectural design early.',
  },
  {
    question: 'How does thermal mass affect heating system sizing?',
    answer:
      'Heavyweight buildings are slow to respond, requiring either: (1) longer preheat periods (6-8 hours vs 2-3 hours for lightweight), or (2) larger plant for faster warm-up. Optimised controls can learn response characteristics. For intermittent heating, consider overall energy vs responsiveness trade-off.',
  },
];

const HNCModule2Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 3"
            title="Thermal Mass and Time Lag"
            description="How building fabric stores heat and affects temperature response over time."
            tone="purple"
          />

          <TLDR
            points={[
              'You distinguish admittance Y (cyclic, W/m²·K) from U-value (steady-state) — and recognise that high-mass surfaces have high Y but can still have low U.',
              'You apply the CIBSE admittance method to estimate peak internal temperature swing from internal gain and external irradiance cycles.',
              'You use decrement factor f and time lag φ to quantify how external temperature peaks are dampened and delayed by heavyweight construction.',
              'You factor thermal mass into the choice between night cooling (mass discharge) and active cooling — drives plant size, EPC and BREEAM credits.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide A — Environmental Design (Thermal Properties of Building Structures)"
            clause="Admittance Y, decrement factor f and time lag φ values for typical UK constructions, with the recommended admittance method for assessing internal temperature swing under cyclic loads."
            meaning={
              <>
                CIBSE Guide A provides the dynamic-response data that the admittance method
                consumes. As HNC engineer you reference it when defending a thermal-mass
                design decision to the architect — particularly in TM52/TM59 overheating
                studies where thermal mass swings the result.
              </>
            }
            cite="Source: CIBSE Guide A — Environmental Design; CIBSE TM52 Limits of Thermal Comfort; CIBSE TM59 Design Methodology for Overheating in Homes."
          />

          <LearningOutcomes
            outcomes={[
              'Define admittance, decrement factor and time lag',
              'Compare heavyweight and lightweight building responses',
              'Calculate temperature swing using the admittance method',
              'Apply thermal mass strategies for peak load reduction',
              'Understand night cooling and thermal mass discharge',
              'Select appropriate constructions for thermal performance',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Admittance (Y-Value) - Cyclic Heat Storage"
            plainEnglish="Y-value tells you how much heat a surface can soak up over a daily cycle. High Y = good buffer. Same units as U-value but a totally different beast."
          >
            <p>
              Admittance describes how a surface absorbs and releases heat in response to cyclic
              (daily) temperature variations. Unlike U-value which describes steady-state heat loss,
              admittance captures the dynamic heat storage behaviour crucial for cooling load
              calculations.
            </p>
            <p>
              <strong>Key concepts:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Units:</strong> W/m²K (same as U-value, but different meaning)
              </li>
              <li>
                <strong>High admittance:</strong> Good heat storage, dampens temperature swings
              </li>
              <li>
                <strong>Low admittance:</strong> Poor storage, temperature follows gains closely
              </li>
              <li>
                <strong>Surface dependent:</strong> Only exposed surfaces contribute to room
              </li>
            </ul>
            <p>
              <strong>Typical admittance values (CIBSE Guide A):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>150mm exposed concrete: Y = 5.5-6.0 W/m²K (very heavy)</li>
              <li>Dense blockwork plastered: Y = 4.0-5.0 W/m²K (heavy)</li>
              <li>Brick wall plastered: Y = 3.5-4.5 W/m²K (heavy)</li>
              <li>Timber floor: Y = 2.5-3.5 W/m²K (medium)</li>
              <li>Plasterboard on studs: Y = 1.5-2.0 W/m²K (light)</li>
              <li>Suspended ceiling tiles: Y = 0.5-1.0 W/m²K (very light)</li>
              <li>Double glazing: Y = 5.5-6.0 W/m²K (high but no storage)</li>
            </ul>
            <p>
              <strong>Room admittance sum:</strong> ΣAY = Σ(A_i × Y_i). Sum of all surface areas ×
              their admittances = total room storage capacity.
            </p>
            <p>
              <strong>Note:</strong> Glazing has high admittance but this represents rapid heat
              exchange, not storage. True thermal mass requires dense materials like concrete, brick
              or masonry.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Decrement Factor and Time Lag"
            plainEnglish="As heat passes through a wall, the swing gets damped (decrement) and delayed (time lag). Heavy walls give you a smaller, later peak inside."
          >
            <p>
              As heat passes through an external element, it is dampened (decrement) and delayed
              (time lag). These properties are crucial for understanding how external temperature
              swings affect internal conditions.
            </p>
            <p>
              <strong>Definitions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Decrement factor (f):</strong> Ratio of internal to external temperature swing (0-1)
              </li>
              <li>
                <strong>Time lag (φ):</strong> Hours delay between external and internal temperature peaks
              </li>
              <li>
                <strong>Heavy elements:</strong> Low f (0.1-0.3), high φ (8-12 hours)
              </li>
              <li>
                <strong>Light elements:</strong> High f (0.7-1.0), low φ (1-3 hours)
              </li>
            </ul>
            <p>
              <strong>Typical wall performance (decrement factor / time lag in hours):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>215mm solid brick: 0.35 / 7-8</li>
              <li>300mm concrete: 0.15 / 10-12</li>
              <li>Cavity wall with insulation: 0.25-0.40 / 6-8</li>
              <li>Insulated steel panel: 0.85-0.95 / 1-2</li>
              <li>Timber frame insulated: 0.65-0.80 / 2-4</li>
            </ul>
            <p>
              <strong>Heavyweight benefits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower peak cooling demand</li>
              <li>More stable temperatures</li>
              <li>Potential for night purge cooling</li>
              <li>Reduces overheating risk</li>
            </ul>
            <p>
              <strong>Lightweight benefits:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fast heat-up for intermittent use</li>
              <li>Lower structural requirements</li>
              <li>Faster construction</li>
              <li>Immediate response to controls</li>
            </ul>
            <p>
              <strong>Design strategy:</strong> An 8-hour time lag shifts afternoon peak (14:00) to
              evening (22:00) when occupants have left and external temperature has dropped,
              enabling natural or free cooling.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Peak Load Shifting and Night Cooling"
            plainEnglish="Mass + cool nights = free cooling. Soak heat into the structure during the day, blow it out overnight with high air change rates."
          >
            <p>
              Thermal mass can shift cooling loads from peak daytime periods to night-time when
              external conditions are cooler and electricity may be cheaper. This is the basis of
              many low-energy cooling strategies.
            </p>
            <p>
              <strong>Night cooling strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Night purge ventilation:</strong> High airflow (4-10 ach) through open windows/louvres
              </li>
              <li>
                <strong>Mechanical night cooling:</strong> Fans run overnight with 100% outside air
              </li>
              <li>
                <strong>Thermally active building systems (TABS):</strong> Water pipes in slab for thermal charging
              </li>
              <li>
                <strong>Free cooling:</strong> Economiser cycle using cool night air
              </li>
            </ul>
            <p>
              <strong>Night cooling effectiveness - requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Significant diurnal temperature swing (UK typically 8-12K in summer)</li>
              <li>Night temperature below internal setpoint (below ~20°C)</li>
              <li>Exposed thermal mass in contact with supply air</li>
              <li>Adequate ventilation rate to discharge stored heat</li>
            </ul>
            <p>
              <strong>Typical daily cycle - heavyweight office:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>06:00-09:00: Pre-cooling complete, mass discharged - fabric at 18-20°C</li>
              <li>09:00-14:00: Gains absorbed by mass - gradual rise to 23-24°C</li>
              <li>14:00-18:00: Mass approaches capacity - peak ~25°C (limited cooling)</li>
              <li>18:00-22:00: Building unoccupied, cooling starts - starting discharge</li>
              <li>22:00-06:00: Night purge at high rate - mass cooled to 18-20°C</li>
            </ul>
            <p>
              <strong>Climate suitability:</strong> Night cooling works well in the UK climate with
              diurnal swings and relatively cool nights. Less effective in humid climates or during
              heatwaves with warm nights.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Practical Design Considerations"
            plainEnglish="Mass only works if it talks to the room. Suspended ceilings, raised floors and carpets all kill the benefit. Coordinate with the architect early."
          >
            <p>
              Realising the benefits of thermal mass requires coordination between architectural
              design, structural engineering, and building services. Many modern buildings
              inadvertently isolate thermal mass from the occupied space.
            </p>
            <p>
              <strong>Maximising thermal mass effectiveness:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Expose concrete soffits:</strong> Avoid suspended ceilings where possible
              </li>
              <li>
                <strong>External insulation:</strong> Keep mass on warm side of insulation
              </li>
              <li>
                <strong>Direct contact:</strong> Good air circulation past mass surfaces
              </li>
              <li>
                <strong>Avoid coverings:</strong> No carpets over concrete floors for thermal mass
              </li>
              <li>
                <strong>Adequate depth:</strong> 75-100mm of exposed concrete provides most benefit
              </li>
            </ul>
            <p>
              <strong>Response factor (fr):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>fr = ΣAY / ΣAU</li>
              <li>fr &lt; 4: Fast response (lightweight)</li>
              <li>4 &lt; fr &lt; 6: Medium response</li>
              <li>fr &gt; 6: Slow response (heavyweight)</li>
            </ul>
            <p>
              <strong>Heating system implications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heavyweight: 6-8 hour preheat</li>
              <li>Medium: 3-4 hour preheat</li>
              <li>Lightweight: 1-2 hour preheat</li>
              <li>Or size plant for faster response</li>
            </ul>
            <p>
              <strong>Part O and thermal mass:</strong> TM59 overheating assessment considers
              thermal mass through dynamic simulation. Heavyweight construction typically performs
              better due to lower peak temperatures (Criterion 1 - hours over 26°C), better
              night-time recovery enabling next-day absorption, and more time for occupants to
              adapt or take action.
            </p>
            <p>
              <strong>Modern alternatives:</strong> Phase change materials (PCMs) integrated into
              plasterboard or ceiling tiles can provide thermal mass benefits in lightweight
              construction, melting at ~23°C to absorb heat.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Four sums covering room admittance, what suspended ceilings cost you, the dampening effect of decrement, and classifying response factor."
          >
            <p>
              <strong>Example 1 - Room admittance sum:</strong> Calculate ΣAY for a room with
              exposed concrete ceiling 50m² (Y=5.5), plastered brick walls 80m² (Y=4.0), carpeted
              floor 50m² (Y=1.0), glazing 15m² (Y=5.7).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ΣAY = (50 × 5.5) + (80 × 4.0) + (50 × 1.0) + (15 × 5.7)</li>
              <li>ΣAY = 275 + 320 + 50 + 85.5</li>
              <li>ΣAY = <strong>730.5 W/K</strong></li>
              <li>This is a medium-heavyweight room due to exposed concrete ceiling</li>
            </ul>
            <p>
              <strong>Example 2 - Impact of suspended ceiling:</strong> The same room has a
              suspended ceiling installed (Y=0.8). How does this affect ΣAY?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>New ceiling admittance: 50 × 0.8 = 40 (replacing 275)</li>
              <li>New ΣAY = 40 + 320 + 50 + 85.5 = <strong>495.5 W/K</strong></li>
              <li>Reduction = 730.5 - 495.5 = 235 W/K (32% loss)</li>
              <li>Suspended ceiling significantly reduces thermal storage capacity</li>
            </ul>
            <p>
              <strong>Example 3 - Decrement effect:</strong> External sol-air temperature swings
              from 25°C to 45°C (±10K from mean of 35°C). A wall with f=0.25 separates the room.
              What is the internal surface temperature swing?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External swing = ±10K (total 20K range)</li>
              <li>Internal swing = External × Decrement = ±10K × 0.25 = <strong>±2.5K</strong></li>
              <li>Internal surface only varies 5K total vs 20K external</li>
              <li>75% of temperature variation eliminated by thermal mass</li>
            </ul>
            <p>
              <strong>Example 4 - Response factor:</strong> A room has ΣAY = 650 W/K and total heat
              loss coefficient ΣAU = 95 W/K. What is its response factor and classification?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>fr = ΣAY / ΣAU = 650 / 95 = <strong>6.8</strong></li>
              <li>Classification: fr &gt; 6 = <strong>Slow response (heavyweight)</strong></li>
              <li>Expect 6-8 hour preheat, good for night cooling strategy</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The headline numbers and ratios you'll quote when arguing for or against exposed mass."
          >
            <p>
              <strong>Essential concepts:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ΣAY:</strong> Sum of (Area × Admittance) for all surfaces
              </li>
              <li>
                <strong>Response factor:</strong> fr = ΣAY / ΣAU (storage vs loss)
              </li>
              <li>
                <strong>Decrement:</strong> f = internal swing / external swing
              </li>
              <li>
                <strong>Time lag:</strong> Delay in hours from external to internal peak
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Exposed concrete: <strong>Y = 5.5-6.0 W/m²K</strong>
              </li>
              <li>
                Suspended ceiling tiles: <strong>Y = 0.5-1.0 W/m²K</strong>
              </li>
              <li>
                Solid brick wall: <strong>f ≈ 0.35, φ ≈ 7-8 hours</strong>
              </li>
              <li>
                Lightweight response: <strong>fr &lt; 4</strong>
              </li>
              <li>
                Heavyweight response: <strong>fr &gt; 6</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Isolated mass:</strong> Suspended ceilings waste structural mass
                </li>
                <li>
                  <strong>Internal insulation:</strong> Puts mass on cold side (wrong)
                </li>
                <li>
                  <strong>No night ventilation:</strong> Mass cannot discharge heat
                </li>
                <li>
                  <strong>Glazing as mass:</strong> High Y but no storage capacity
                </li>
              </ul>
            }
            doInstead="Expose concrete soffits, place insulation on the external side, design in night purge to discharge stored heat, and don't count glazing as thermal mass even though its Y-value is high."
          />

          <SectionRule />

          <Scenario
            title="Choosing between exposed soffit and acoustic ceiling for a school classroom"
            situation={
              <>
                A primary-school classroom (60 m², south-facing, 20 students) is being
                designed for natural ventilation only — no mechanical cooling. The
                architect proposes a fully suspended acoustic ceiling. You suspect that
                will compromise summer comfort.
              </>
            }
            whatToDo={
              <>
                Run two TM52 overheating studies: (a) acoustic suspended ceiling — the
                concrete soffit is uncoupled from the room air, admittance to the room
                drops dramatically; (b) exposed soffit with acoustic baffles for speech
                intelligibility — the slab Y-value (~6 W/m²·K) damps the peak
                temperature swing. Compare the two against TM52 criteria. Recommend
                exposed-soffit + baffles, citing the night-cooling discharge route
                through openable high-level windows.
              </>
            }
            whyItMatters={
              <>
                A no-cooling school is a Department for Education preference for capex and
                opex reasons. Get the thermal-mass coupling wrong and the classroom
                overheats by lunchtime in late June, students can&rsquo;t concentrate, and
                the head teacher demands retrofit cooling. The admittance-method study
                is what decides this at design stage.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Admittance Y (W/m²·K) measures cyclic heat storage — different from steady-state U.',
              'Y for typical materials: dense concrete ≈ 6, brick ≈ 4.5, plasterboard ≈ 1.5.',
              'Heavy surfaces hidden behind suspended ceilings or carpets lose their thermal-mass benefit.',
              'Decrement factor f = ratio of internal-to-external temperature swing — typical heavyweight 0.2–0.4, lightweight 0.7–0.9.',
              'Time lag φ = hours by which the external peak appears internally — heavyweight 6–12 h, lightweight 1–3 h.',
              'Night cooling discharges accumulated mass — typical 5–8 ach for effective discharge.',
              'Thermal mass is a passive design lever — reduces peak load and supports natural-ventilation-only schemes.',
              'CIBSE TM52/TM59 overheating studies bake admittance into the dynamic simulation.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heat gains and losses
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Air infiltration and ventilation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section5_3;
