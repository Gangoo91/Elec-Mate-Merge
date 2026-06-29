/**
 * Module 2 · Section 3 · Subsection 5 — Cooling and Heating Coils
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Apparatus dew point (ADP), contact and bypass factor, coil sizing for sensible
 *   and latent loads — turning a psychrometric process line into a defendable coil
 *   schedule for tender.
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

const TITLE = 'Cooling and Heating Coils - HNC Module 2 Section 3.5';
const DESCRIPTION =
  'Master cooling coil selection, apparatus dew point (ADP), contact factor, sensible and latent loads and heating coil sizing for HVAC systems.';

const quickCheckQuestions = [
  {
    id: 'adp-definition',
    question: 'What is the Apparatus Dew Point (ADP)?',
    options: [
      'The air temperature leaving the coil',
      'The air dew point before the coil',
      'The effective surface temperature of an ideal cooling coil',
      'The chilled water supply temperature',
    ],
    correctIndex: 2,
    explanation:
      'The ADP is the theoretical saturation temperature that represents the effective coil surface temperature. If a coil were 100% effective, all air would leave at the ADP (saturated).',
  },
  {
    id: 'contact-factor',
    question: 'A cooling coil with a contact factor of 0.85 means:',
    options: [
      'The coil removes 85% of the total cooling load',
      '85% of the air contacts the coil surface effectively',
      'The off-coil temperature is 85% of the entering temperature',
      'The coil operates at 85% of its rated water flow rate',
    ],
    correctIndex: 1,
    explanation:
      'Contact factor (CF) represents the proportion of air that is fully treated by contacting the coil surface. CF = 0.85 means 85% contacts the coil, 15% bypasses (bypass factor = 0.15).',
  },
  {
    id: 'chw-temps',
    question: 'Typical chilled water flow and return temperatures for comfort cooling are:',
    options: ['4°C/8°C', '6°C/12°C', '10°C/16°C', '12°C/18°C'],
    correctIndex: 1,
    explanation:
      'Standard chilled water temperatures for comfort cooling are 6°C flow / 12°C return, giving a 6K temperature difference. This allows dehumidification while maintaining reasonable efficiency.',
  },
  {
    id: 'rows-depth',
    question: 'Why do cooling coils typically have 4-8 rows while heating coils have 1-2 rows?',
    options: [
      'Cooling requires latent heat removal and a higher contact factor than heating',
      'Cooling coils carry water at a much higher pressure than heating coils',
      'Heating coils must handle a far larger air volume flow rate',
      'Cooling coils use copper tubes while heating coils use steel',
    ],
    correctIndex: 0,
    explanation:
      'Cooling coils need more surface area because: (1) cooling temperature differences are smaller, (2) latent heat removal requires surface below dew point, (3) heat transfer from air to water is less efficient than water to air.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The contact factor (CF) and bypass factor (BF) are related by:',
    options: [
      'CF + BF = 0',
      'CF + BF = 1',
      'CF × BF = 1',
      'CF = 2 × BF',
    ],
    correctAnswer: 1,
    explanation:
      'CF + BF = 1. If contact factor is 0.85, bypass factor is 0.15. The total air equals contacted air plus bypassed air.',
  },
  {
    id: 2,
    question: 'On a psychrometric chart, the coil process line extends from:',
    options: [
      'Outside air to return air',
      'Room condition to supply condition',
      'Entering air condition toward the ADP',
      'Dew point to dry bulb',
    ],
    correctAnswer: 2,
    explanation:
      'The coil process line is drawn from the entering air condition toward the ADP. The off-coil condition lies on this line, at a position determined by the contact factor.',
  },
  {
    id: 3,
    question:
      'If entering air is 26°C and ADP is 10°C with CF = 0.80, the off-coil temperature is:',
    options: [
      '14.8°C',
      '12.0°C',
      '16.0°C',
      '13.2°C',
    ],
    correctAnswer: 3,
    explanation:
      'T_off = ADP + BF × (T_in - ADP) = 10 + 0.20 × (26 - 10) = 10 + 3.2 = 13.2°C. Or: T_off = T_in - CF × (T_in - ADP) = 26 - 0.80 × 16 = 13.2°C.',
  },
  {
    id: 4,
    question: 'The chilled water temperature rise across a cooling coil is typically:',
    options: [
      '5-6K',
      '4-5K',
      '2-3K',
      '8-10K',
    ],
    correctAnswer: 0,
    explanation:
      'Standard chilled water systems operate with 5-6K rise (6/12°C). This balances heat transfer effectiveness with reasonable water flow rates and pumping energy.',
  },
  {
    id: 5,
    question: "What determines whether a cooling coil operates 'wet' or 'dry'?",
    options: [
      'Whether the chilled water flow rate exceeds the return flow rate',
      'Whether the coil surface is below the entering air dew point',
      'Whether the coil has more than four rows of tubes',
      'Whether the face velocity is above or below 3 m/s',
    ],
    correctAnswer: 1,
    explanation:
      "A 'wet' coil has surface temperatures below the air dew point, causing condensation (dehumidification). A 'dry' coil operates above dew point, providing sensible cooling only.",
  },
  {
    id: 6,
    question: 'Increasing the number of coil rows generally:',
    options: [
      'Decreases contact factor',
      'Has no effect on contact factor',
      'Increases contact factor',
      'Increases bypass factor',
    ],
    correctAnswer: 2,
    explanation:
      'More rows increase the surface area and air contact time, increasing the contact factor (more air is effectively treated) and reducing bypass factor.',
  },
  {
    id: 7,
    question: "The 'grand sensible heat factor' (GSHF) for a coil is:",
    options: [
      'The ratio of latent to sensible coil load',
      'The ratio of off-coil to on-coil temperature',
      'The ratio of contact factor to bypass factor',
      'The ratio of sensible to total coil load',
    ],
    correctAnswer: 3,
    explanation:
      'GSHF = sensible coil load / total coil load. It represents the slope of the coil condition line on the psychrometric chart and must be compatible with the room SHR.',
  },
  {
    id: 8,
    question: 'For a heating coil, the air-side temperature rise is calculated using:',
    options: [
      'ΔT = Q / (ṁ × cp)',
      'ΔT = Q × cp × ṁ',
      'ΔT = Q / (ṁ × hfg)',
      'ΔT = ṁ / (Q × cp)',
    ],
    correctAnswer: 0,
    explanation:
      'ΔT = Q / (ṁ × cp) where Q is heat transfer rate (kW), ṁ is mass flow (kg/s), and cp is specific heat (1.005 kJ/kg·K). Rearranged from Q = ṁ × cp × ΔT.',
  },
  {
    id: 9,
    question: 'LTHW heating coils typically operate with flow/return temperatures of:',
    options: [
      '40/30°C',
      '82/71°C',
      '60/50°C',
      '120/100°C',
    ],
    correctAnswer: 1,
    explanation:
      'Traditional LTHW (Low Temperature Hot Water) systems use 82/71°C (180/160°F). Modern systems may use lower temperatures (70/50°C) for heat pump compatibility.',
  },
  {
    id: 10,
    question: 'Face velocity across a cooling coil is typically limited to:',
    options: [
      '1.0-1.5 m/s',
      '6.0-8.0 m/s',
      '2.0-3.0 m/s',
      '4.0-5.0 m/s',
    ],
    correctAnswer: 2,
    explanation:
      'Cooling coil face velocities are typically 2.0-3.0 m/s. Higher velocities risk moisture carryover (water droplets blown off the coil); lower velocities require larger coils.',
  },
  {
    id: 11,
    question: 'The log mean temperature difference (LMTD) for a coil is used to:',
    options: [
      'Calculate the condensate flow rate from the drain pan',
      'Set the maximum face velocity to prevent carryover',
      'Determine the dehumidification capacity of the coil',
      'Determine the effective temperature driving force for heat transfer',
    ],
    correctAnswer: 3,
    explanation:
      'LMTD accounts for the varying temperature difference along the coil length. It provides the effective ΔT for heat transfer calculations: Q = U × A × LMTD.',
  },
  {
    id: 12,
    question: "A 'direct expansion' (DX) coil differs from a chilled water coil because:",
    options: [
      'Refrigerant evaporates inside the coil tubes',
      'It cannot provide any dehumidification of the air',
      'It always requires more rows than a chilled water coil',
      'It uses water heated above 80°C as the working fluid',
    ],
    correctAnswer: 0,
    explanation:
      'In DX coils, liquid refrigerant evaporates inside the tubes, directly absorbing heat from the air. This eliminates the chilled water system but requires the coil to be part of a refrigeration circuit.',
  },
];

const faqs = [
  {
    question: 'How do I select the right ADP for a project?',
    answer:
      'ADP is selected to achieve the required off-coil moisture content. For comfort cooling, ADP is typically 8-12°C. Lower ADP gives more dehumidification but requires colder chilled water. The ADP must be achievable with available chilled water temperatures (ADP is typically 2-3K above CHW flow temperature).',
  },
  {
    question: 'Why does contact factor matter for coil selection?',
    answer:
      'Contact factor determines how closely the off-coil air approaches the ADP. Higher CF means better dehumidification and lower off-coil temperature, but requires more coil rows or slower air velocity. Typical CFs range from 0.75 to 0.95 depending on coil depth and design.',
  },
  {
    question: 'What causes moisture carryover from cooling coils?',
    answer:
      'Moisture carryover occurs when air velocity is too high (>3 m/s) or condensate drainage is poor. Water droplets are blown off the coil into the ductwork. Eliminate droppers help, but the main control is appropriate face velocity and proper coil inclination for drainage.',
  },
  {
    question: 'How do chilled beam coils differ from AHU cooling coils?',
    answer:
      'Chilled beams use higher chilled water temperatures (14-16°C vs 6°C) to avoid condensation on the beam surface. They provide sensible cooling only. This requires separate dehumidification (typically in a dedicated outdoor air system) if humidity control is needed.',
  },
  {
    question: 'Why are heating coils simpler than cooling coils?',
    answer:
      'Heating coils only perform sensible heating (no moisture change), use higher temperature differences (easier heat transfer), and have no condensate to manage. One or two rows typically suffice. The main concerns are frost protection and stratification at low flows.',
  },
  {
    question: 'What is the purpose of a preheat coil?',
    answer:
      'Preheat coils protect downstream equipment (filters, cooling coils, humidifiers) from freezing in cold weather. They raise outside air temperature to a safe level (typically 5-10°C). Preheat coils are often controlled from off-coil temperature with frost protection.',
  },
];

const HNCModule2Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 5"
            title="Cooling and Heating Coils"
            description="Understanding coil selection, apparatus dew point and contact factor for HVAC design."
            tone="purple"
          />

          <TLDR
            points={[
              'You define ADP as the effective coil surface temperature and use it to characterise coil performance independent of duty.',
              'You apply contact factor β (typically 0.85–0.95 for 4–8-row chilled-water coils) to position the off-coil state on the chart.',
              'You size cooling coils against both sensible and latent duty, picking row/fin/face-velocity combinations that hit the off-coil moisture target.',
              'You select heating coils on LPHW flow/return temperatures, verifying that the LMTD assumption is valid for the chosen coil row count.',
            ]}
          />

          <RegsCallout
            source="CIBSE Guide B3 — Air-Conditioning, Air Handling and Refrigeration"
            clause="Recommended methods for selecting cooling and heating coils, including the use of apparatus dew point, contact and bypass factor, and the sizing of LPHW heating coils for HVAC applications."
            meaning={
              <>
                CIBSE Guide B3 is the UK reference standard for coil selection and
                performance verification. As HNC engineer you cite Guide B3 in coil
                schedule notes, in the design risk register, and in any RFI response when
                a contractor proposes a substitute coil.
              </>
            }
            cite="Source: CIBSE Guide B3 — Air-Conditioning, Air Handling and Refrigeration; CIBSE Guide H — Building Control Systems."
          />

          <LearningOutcomes
            outcomes={[
              'Define and calculate apparatus dew point (ADP)',
              'Apply contact factor and bypass factor concepts',
              'Plot coil processes on the psychrometric chart',
              'Size cooling coils for sensible and latent loads',
              'Understand heating coil selection criteria',
              'Compare chilled water and DX coil systems',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Apparatus Dew Point (ADP)"
            plainEnglish="The temperature an ideal coil would chill the air down to. Real coils don't reach it — but it tells you how good your cooling can possibly be."
          >
            <p>
              The Apparatus Dew Point represents the effective surface temperature of a cooling
              coil. It is the condition air would reach if 100% of it contacted the coil surface.
            </p>
            <p>
              <strong>ADP Concept:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ADP lies on the saturation curve of the psychrometric chart</li>
              <li>It is the point where the coil process line intersects saturation</li>
              <li>Air leaving an ideal (100% contact) coil would be at ADP</li>
              <li>Real coils have contact factors &lt; 1, so off-coil air is above ADP</li>
            </ul>
            <p>
              <strong>Typical ADP Values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Comfort cooling:</strong> ADP 8-12°C, CHW flow 6°C
              </li>
              <li>
                <strong>High latent loads:</strong> ADP 6-8°C, CHW flow 4-5°C
              </li>
              <li>
                <strong>Process cooling:</strong> ADP 4-6°C, CHW flow 2-4°C
              </li>
              <li>
                <strong>Sensible only (chilled beam):</strong> ADP 14-16°C, CHW flow 14°C
              </li>
            </ul>
            <p>
              <strong>Rule of thumb:</strong> ADP is typically 2-3K above the chilled water flow
              temperature. Lower ADP provides more dehumidification but requires colder water and
              more energy.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Contact Factor and Bypass Factor"
            plainEnglish="CF says how much of the air gets properly treated by the coil. BF is the leftover that slips through unchanged. Add them up and you always get 1."
          >
            <p>
              Contact factor (CF) represents the effectiveness of air contact with the coil surface.
              Bypass factor (BF) represents air that passes through without effective treatment.
            </p>
            <p>
              <strong>Contact Factor Equations</strong> (same equations apply for moisture content
              g):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>CF + BF = 1</li>
              <li>CF = (Tin - Toff) / (Tin - ADP)</li>
              <li>Toff = ADP + BF × (Tin - ADP)</li>
            </ul>
            <p>
              <strong>Factors Affecting Contact Factor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>More rows:</strong> Increases CF. 4-8 rows typical for cooling.
              </li>
              <li>
                <strong>Lower face velocity:</strong> Increases CF. More contact time.
              </li>
              <li>
                <strong>Closer fin spacing:</strong> Increases CF. But increases pressure drop.
              </li>
              <li>
                <strong>Higher water velocity:</strong> Increases CF. Better water-side transfer.
              </li>
            </ul>
            <p>
              <strong>Typical Contact Factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>4-row coil:</strong> CF ≈ 0.75-0.85
              </li>
              <li>
                <strong>6-row coil:</strong> CF ≈ 0.85-0.92
              </li>
              <li>
                <strong>8-row coil:</strong> CF ≈ 0.92-0.97
              </li>
              <li>
                <strong>Deep coil (10+):</strong> CF ≈ 0.95-0.98
              </li>
            </ul>
            <p>
              <strong>Design Implications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher CF = lower off-coil temperature</li>
              <li>Higher CF = more dehumidification</li>
              <li>Higher CF = larger, more expensive coil</li>
              <li>Higher CF = greater pressure drop</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Cooling Coil Selection"
            plainEnglish="Match the coil to the load: enough rows for the contact factor you need, water side balanced with the air side, velocity low enough to keep the condensate where it should be."
          >
            <p>
              Cooling coil selection involves matching the coil characteristics to the required
              sensible and latent loads while achieving the design off-coil condition.
            </p>
            <p>
              <strong>Cooling Coil Parameters:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Face velocity:</strong> 2.0-3.0 m/s. Max 3 m/s to prevent carryover.
              </li>
              <li>
                <strong>Number of rows:</strong> 4-8 rows. Based on required CF.
              </li>
              <li>
                <strong>Fin spacing:</strong> 8-14 fins/inch. Closer for more capacity.
              </li>
              <li>
                <strong>Water velocity:</strong> 1.0-2.5 m/s. Turbulent flow preferred.
              </li>
              <li>
                <strong>CHW ΔT:</strong> 5-6K. Affects water flow rate.
              </li>
            </ul>
            <p>
              <strong>Coil Load Calculation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total load: Qt = ṁ × (hin - hoff)</li>
              <li>Sensible load: Qs = ṁ × cp × (Tin - Toff)</li>
              <li>Latent load: QL = ṁ × (gin - goff) × hfg</li>
              <li>Check: Qt = Qs + QL</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Heating Coil Selection"
            plainEnglish="Heating coils are the easy ones. Sensible only, big temperature differences, no condensate. Just don't forget frost protection on the preheat."
          >
            <p>
              Heating coils are simpler than cooling coils as they only perform sensible heating.
              Selection focuses on capacity, temperature rise, and frost protection.
            </p>
            <p>
              <strong>Heating Coil Types and Applications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LTHW:</strong> Hot water, 82/71°C or 70/50°C, used for main heating and
                preheat
              </li>
              <li>
                <strong>MTHW:</strong> Hot water, 100-120°C, used for high capacity
              </li>
              <li>
                <strong>Steam:</strong> Steam, 100-180°C, fast response and high temperature
              </li>
              <li>
                <strong>Electric:</strong> Electricity, used for reheat and terminal units
              </li>
            </ul>
            <p>
              <strong>Heating Coil Sizing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1-2 rows typically sufficient</li>
              <li>Face velocity 3-5 m/s acceptable</li>
              <li>Water velocity 0.5-2.0 m/s</li>
              <li>ΔT water typically 10-20K</li>
            </ul>
            <p>
              <strong>Frost Protection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Preheat coil for outside air</li>
              <li>Frost stat on off-coil air</li>
              <li>Minimum water flow at all times</li>
              <li>Glycol if freezing possible</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Off-coil temperature, ADP from chart, full coil load with check, and water flow sizing — the four standard coil calcs."
          >
            <p>
              <strong>Example 1: Off-Coil Temperature from Contact Factor.</strong> Air enters a
              cooling coil at 28°C. The ADP is 10°C and the coil contact factor is 0.82. Calculate
              the off-coil temperature.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: T_in = 28°C, ADP = 10°C, CF = 0.82</li>
              <li>BF = 1 - CF = 1 - 0.82 = 0.18</li>
              <li>Method 1: T_off = ADP + BF × (T_in - ADP) = 10 + 0.18 × (28 - 10)</li>
              <li>
                T_off = 10 + 0.18 × 18 = 10 + 3.24 = <strong>13.2°C</strong>
              </li>
              <li>
                Method 2: T_off = T_in - CF × (T_in - ADP) = 28 - 0.82 × 18 = 28 - 14.76 ={' '}
                <strong>13.2°C</strong>
              </li>
            </ul>
            <p>
              <strong>Example 2: Determining ADP from Conditions.</strong> Air at 26°C, 11 g/kg
              enters a cooling coil and leaves at 14°C, 9 g/kg. Find the ADP and contact factor.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Draw line from entry (26°C, 11 g/kg) through exit (14°C, 9 g/kg)</li>
              <li>
                Step 2: Extend to saturation curve to find ADP. From psychrometric chart:{' '}
                <strong>ADP ≈ 9°C</strong>
              </li>
              <li>Step 3: Calculate contact factor. CF = (T_in - T_off) / (T_in - ADP)</li>
              <li>
                CF = (26 - 14) / (26 - 9) = 12/17 = <strong>0.71</strong>
              </li>
              <li>Verify with moisture: CF = (11-9)/(11-8.5) = 2/2.5 = 0.8 (slight difference due
              to chart reading)</li>
            </ul>
            <p>
              <strong>Example 3: Cooling Coil Load Calculation.</strong> A coil handles 5 kg/s.
              Entry: 28°C, 12 g/kg, h = 58 kJ/kg. Exit: 14°C, 9 g/kg, h = 37 kJ/kg. Calculate loads.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Total load: Qt = ṁ × Δh = 5 × (58 - 37) = 5 × 21 = <strong>105 kW</strong>
              </li>
              <li>
                Sensible load: Qs = ṁ × cp × ΔT = 5 × 1.005 × (28 - 14) = 5 × 1.005 × 14 ={' '}
                <strong>70.4 kW</strong>
              </li>
              <li>
                Latent load: QL = ṁ × Δg × hfg = 5 × 0.003 × 2450 = <strong>36.8 kW</strong>
              </li>
              <li>Check: Qs + QL = 70.4 + 36.8 = 107.2 kW ≈ 105 kW ✓</li>
              <li>
                SHR = 70.4/105 = <strong>0.67</strong>
              </li>
            </ul>
            <p>
              <strong>Example 4: Chilled Water Flow Rate.</strong> A 120 kW cooling coil uses
              chilled water at 6/12°C. Calculate the required water flow rate.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q = ṁw × cpw × ΔTw → 120 = ṁw × 4.19 × 6</li>
              <li>ṁw = 120 / (4.19 × 6) = 120 / 25.14</li>
              <li>
                ṁw = <strong>4.77 kg/s</strong>
              </li>
              <li>
                In l/s (water density ≈ 1 kg/l): V̇w = <strong>4.77 l/s</strong>
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The four equations and the design numbers you'll quote for any coil selection."
          >
            <p>
              <strong>Key Equations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CF + BF = 1</strong> — Contact and bypass factors
              </li>
              <li>
                <strong>T_off = ADP + BF(T_in - ADP)</strong> — Off-coil temperature
              </li>
              <li>
                <strong>Q = ṁ × Δh</strong> — Total coil load
              </li>
              <li>
                <strong>Q = ṁw × cpw × ΔTw</strong> — Water-side load
              </li>
            </ul>
            <p>
              <strong>Design Guidelines:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Cooling coil face velocity: <strong>2.0-3.0 m/s</strong>
              </li>
              <li>
                Chilled water: <strong>6/12°C</strong> standard
              </li>
              <li>ADP typically 2-3K above CHW flow</li>
              <li>
                LTHW: <strong>82/71°C</strong> or <strong>70/50°C</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Assuming CF = 1:</strong> Real coils have BF &gt; 0
                </li>
                <li>
                  <strong>Ignoring water-side capacity:</strong> Must balance air and water
                </li>
                <li>
                  <strong>Excess face velocity:</strong> Causes moisture carryover
                </li>
                <li>
                  <strong>Frost protection:</strong> Essential for preheat coils
                </li>
              </ul>
            }
            doInstead="Always pick a realistic CF based on row count, balance air-side load with water-side capacity, cap face velocity at 3 m/s on cooling coils, and design frost protection into every preheat coil exposed to outside air."
          />

          <SectionRule />

          <Scenario
            title="Selecting a chilled-water cooling coil for a hospital recovery ward"
            situation={
              <>
                You are designing the AHU for a 12-bed recovery ward. The HTM 03-01
                ventilation requirement is 10 ach with a strict 22 °C, 50% RH supply
                target. Mixed entering air is 28 °C, 60% RH (summer). Chilled water
                supply is 6 °C flow, 12 °C return.
              </>
            }
            whatToDo={
              <>
                Plot entering and target off-coil states on the chart. Calculate ADP from the
                geometry: extend the process line from entering air through off-coil onto the
                saturation curve. Choose a coil with contact factor &gt;0.92 (typically 6–8
                rows, 2.0 m/s face velocity). Size duty Q̇ = ṁ × Δh. Cross-check with
                the manufacturer&rsquo;s selection software, then lock the schedule.
              </>
            }
            whyItMatters={
              <>
                Hospital ventilation is regulated under HTM 03-01 with explicit dew-point and
                RH limits to control infection risk. An undersized coil that misses the
                off-coil target leaves the ward in a regulatory non-compliance position
                — and patient comfort suffers. The chart-based ADP/β method is the
                defensible audit trail.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'ADP = ideal-coil surface temperature; lies on the saturation curve below the off-coil state.',
              'Contact factor β = (h_in − h_out) / (h_in − h_ADP) — typical 4-row coil 0.75, 8-row 0.95.',
              'Bypass factor BF = 1 − β; the fraction of air that effectively bypasses the coil.',
              'Cooling-coil duty Q̇ = ṁ × Δh — covers both sensible and latent components.',
              'For dehumidification, coil surface (≈ ADP) must be below entering-air dew point.',
              'Heating coils sized using ṁ × cp × ΔT (air side) and LPHW flow × cp × ΔT (water side); LMTD verifies row count.',
              'Face velocity 2.0–2.5 m/s typical — higher risks moisture carry-over from the cooling coil.',
              'CIBSE Guide B3 is the design code of practice for UK HVAC coil selection.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                AC Processes
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section3-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                HVAC System Applications
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section3_5;
