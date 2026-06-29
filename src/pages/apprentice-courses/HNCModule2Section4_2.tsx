/**
 * Module 2 · Section 4 · Subsection 2 — Illumination Calculations
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Lumen method, point-by-point calculations, room index, utilisation and maintenance
 *   factors — turning a lux target into a defendable luminaire schedule.
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

const TITLE = 'Illumination Calculations - HNC Module 2 Section 4.2';
const DESCRIPTION =
  'Master the lumen method, point-by-point calculations, maintained illuminance, utilisation factors, and CIBSE lighting guide applications for building services.';

const quickCheckQuestions = [
  {
    id: 'lumen-method-formula',
    question: 'In the lumen method, which formula calculates the number of luminaires required?',
    options: [
      'N = E × A × MF × UF / Φ',
      'N = (Φ × A) / (E × UF × MF)',
      'N = Φ × UF × MF / (E × A)',
      'N = (E × A) / (Φ × UF × MF)',
    ],
    correctIndex: 3,
    explanation:
      'N = (E × A) / (Φ × UF × MF) where E = required illuminance (lux), A = area (m²), Φ = luminaire lumens, UF = utilisation factor, MF = maintenance factor.',
  },
  {
    id: 'maintained-illuminance',
    question: "What is 'maintained illuminance' in lighting design?",
    options: [
      'The initial illuminance when lamps are new',
      'The minimum illuminance over the maintenance cycle',
      'The maximum illuminance achievable',
      'The illuminance at the walls',
    ],
    correctIndex: 1,
    explanation:
      'Maintained illuminance (Em) is the minimum average illuminance on the working plane before maintenance is required. It accounts for lamp lumen depreciation and dirt accumulation.',
  },
  {
    id: 'room-index',
    question: 'What is the room index (RI) used for in lighting calculations?',
    options: [
      'Determining lamp wattage',
      'Calculating maintenance schedules',
      'Measuring surface reflectances',
      'Finding the utilisation factor from tables',
    ],
    correctIndex: 3,
    explanation:
      'The room index (RI = L×W / Hm(L+W)) describes room proportions and is used with surface reflectances to read utilisation factors from luminaire photometric tables.',
  },
  {
    id: 'inverse-square-law',
    question:
      'According to the inverse square law, if distance from a light source doubles, illuminance becomes:',
    options: [
      'Quarter',
      'Half',
      'Double',
      'One-eighth',
    ],
    correctIndex: 0,
    explanation:
      'The inverse square law states E = I/d². Doubling distance (2d) gives E = I/(2d)² = I/4d², so illuminance reduces to one quarter of its original value.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the lumen method calculate?',
    options: [
      'Point illuminance at a specific location',
      'Average illuminance over a working plane',
      'Maximum illuminance in a room',
      'Vertical illuminance on walls',
    ],
    correctAnswer: 1,
    explanation:
      'The lumen method calculates average illuminance over the horizontal working plane. It is suitable for regular arrays of luminaires providing general lighting.',
  },
  {
    id: 2,
    question:
      'An office of 120m² requires 400 lux maintained. Luminaires output 3200 lumens each. UF = 0.55, MF = 0.8. How many luminaires are needed?',
    options: [
      '40',
      '20',
      '34',
      '27',
    ],
    correctAnswer: 2,
    explanation:
      'N = (E × A) / (Φ × UF × MF) = (400 × 120) / (3200 × 0.55 × 0.8) = 48000 / 1408 = 34.1, so 34 luminaires minimum.',
  },
  {
    id: 3,
    question: 'What factors affect the Utilisation Factor (UF)?',
    options: [
      'Lamp wattage, colour temperature, and switching frequency',
      'The cleaning interval and the type of cleaning agent used',
      'The number of occupants and the hours of occupancy',
      'Room proportions, surface reflectances, and luminaire distribution',
    ],
    correctAnswer: 3,
    explanation:
      'UF depends on: room index (proportions), surface reflectances (ceiling, walls, floor), and luminaire light distribution characteristics. It represents how much emitted light reaches the working plane.',
  },
  {
    id: 4,
    question: 'The maintenance factor (MF) typically accounts for which depreciation effects?',
    options: [
      'Both lamp depreciation and luminaire/room dirt accumulation',
      'Voltage drop along the final circuit to the luminaires',
      'Changes in room proportions as partitions are added',
      'The angle of incidence of light on the working plane',
    ],
    correctAnswer: 0,
    explanation:
      'MF = LLMF × LSF × LMF × RSMF, accounting for lamp lumen maintenance, lamp survival, luminaire maintenance, and room surface maintenance factors.',
  },
  {
    id: 5,
    question: 'CIBSE LG7 recommends what maintained illuminance for general office work?',
    options: [
      '300 lux',
      '400-500 lux',
      '750 lux',
      '200 lux',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE LG7 recommends 300-500 lux for general office work depending on task difficulty. 500 lux is typical for writing, typing, and reading. CAD work may require higher levels.',
  },
  {
    id: 6,
    question: 'What is the point-by-point method used for?',
    options: [
      'Quick estimates of average illuminance',
      'Determining lamp replacement schedules',
      'Calculating illuminance at specific points',
      'Measuring existing lighting installations',
    ],
    correctAnswer: 2,
    explanation:
      'The point-by-point method calculates illuminance at specific points using intensity data and geometry. It is used for detailed analysis, spotlighting, and irregular layouts.',
  },
  {
    id: 7,
    question:
      'For the point-by-point method, what is the formula for illuminance from a point source at angle θ to normal?',
    options: [
      'E = I / d',
      'E = I / (d × cos θ)',
      'E = I × d² × cos θ',
      'E = I × cos θ / d²',
    ],
    correctAnswer: 3,
    explanation:
      'E = (I × cos θ) / d² combines the inverse square law with the cosine law. I is intensity towards the point (cd), d is distance (m), θ is angle from normal.',
  },
  {
    id: 8,
    question:
      'What room index would you calculate for a room 12m × 8m with mounting height 2.5m above the working plane?',
    options: [
      '1.92',
      '2.4',
      '1.5',
      '3.2',
    ],
    correctAnswer: 0,
    explanation: 'RI = (L × W) / (Hm × (L + W)) = (12 × 8) / (2.5 × (12 + 8)) = 96 / 50 = 1.92',
  },
  {
    id: 9,
    question:
      'Which CIBSE document provides maintained illuminance recommendations for different building types?',
    options: [
      'CIBSE Guide A',
      'CIBSE LG series',
      'CIBSE TM10',
      'BS 7671',
    ],
    correctAnswer: 1,
    explanation:
      'The CIBSE Lighting Guides (LG series) provide specific recommendations: LG1 Industrial, LG2 Hospitals, LG5 Lecture/Conference, LG6 Outdoor, LG7 Offices, LG10 Daylighting.',
  },
  {
    id: 10,
    question:
      'A spotlight has intensity 5000 cd towards a point 3m away at 30° to the normal. What is the illuminance?',
    options: [
      '1667 lux',
      '556 lux',
      '481 lux',
      '642 lux',
    ],
    correctAnswer: 2,
    explanation:
      'E = (I × cos θ) / d² = (5000 × cos 30°) / 3² = (5000 × 0.866) / 9 = 4330 / 9 = 481 lux',
  },
  {
    id: 11,
    question: 'What happens to the utilisation factor as room index increases?',
    options: [
      'It decreases',
      'It fluctuates randomly',
      'It stays constant',
      'It increases',
    ],
    correctAnswer: 3,
    explanation:
      'As room index increases (larger, more proportionate rooms or lower mounting height), more light reaches the working plane directly, so UF increases. Small, tall rooms have low UF.',
  },
  {
    id: 12,
    question:
      'What is a typical maintenance factor for LED luminaires in a clean office environment?',
    options: [
      '0.8',
      '0.95',
      '0.6',
      '0.7',
    ],
    correctAnswer: 0,
    explanation:
      'LED luminaires in clean environments typically use MF around 0.8, accounting for gradual lumen depreciation over life and minimal dirt accumulation with regular cleaning.',
  },
];

const faqs = [
  {
    question: 'When should I use the lumen method versus point-by-point calculations?',
    answer:
      "Use the lumen method for regular arrays of luminaires providing uniform general lighting - it's quick and gives average illuminance. Use point-by-point for spotlights, accent lighting, specific task areas, irregular layouts, or when you need to know illuminance at particular locations. Most commercial projects use both: lumen method for initial sizing, software (which uses point-by-point) for detailed verification.",
  },
  {
    question: 'What surface reflectances should I assume for calculations?',
    answer:
      'CIBSE defaults are: ceiling 0.7, walls 0.5, floor 0.2 (often expressed as 70/50/20 or C70 W50 F20). Actual values depend on finishes - white ceilings can be 0.8+, dark walls 0.2-0.3. Dark rooms need more luminaires. Check actual reflectances for refurbishment projects where surfaces already exist.',
  },
  {
    question: 'How do I choose an appropriate maintenance factor?',
    answer:
      'MF depends on: lamp type (LED ~0.9 LLMF, fluorescent ~0.8), luminaire type (IP rating, optical design), room cleanliness (office ~0.9 LMF, industrial ~0.8), and maintenance interval. Overall MF = LLMF × LMF × RSMF. Typical combined values: clean office 0.8, normal industrial 0.7, dirty industrial 0.6. CIBSE SLL provides detailed guidance.',
  },
  {
    question: "Why doesn't my lighting software match my manual calculations?",
    answer:
      'Common reasons include: software using full photometric data versus UF tables (more accurate), inter-reflections calculated differently, working plane height differences, or different MF assumptions. Software typically gives slightly different (usually higher) results than manual lumen method because it can account for all light paths. Both methods should be close - large discrepancies suggest input errors.',
  },
  {
    question: 'How do I calculate lighting for an irregular shaped room?',
    answer:
      "For L-shaped or irregular rooms, either: divide into regular sections and calculate each, use lighting design software which handles any shape, or use a conservative 'bounding rectangle' approach. Software is strongly recommended for complex spaces as it properly accounts for light exchange between areas.",
  },
  {
    question: 'What is the difference between maintained and initial illuminance?',
    answer:
      'Initial illuminance is when everything is new (lamps at full output, clean luminaires). Maintained illuminance is the minimum acceptable level just before maintenance. Initial = Maintained / MF. Design to maintained illuminance - this ensures adequate light throughout the maintenance cycle. Never design to initial illuminance unless you accept the space will become under-lit.',
  },
];

const HNCModule2Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · Subsection 2"
            title="Illumination Calculations"
            description="The lumen method, point-by-point calculations, and CIBSE recommendations for building services lighting design."
            tone="purple"
          />

          <TLDR
            points={[
              'You apply the lumen method N = (E × A) / (Φ × UF × MF) to size luminaire quantity for a target maintained illuminance.',
              'You compute the room index k = (L × W) / [Hm × (L + W)] and read UF off the manufacturer&rsquo;s photometric data.',
              'You apply MF = LLMF × LSF × LMF × RSMF to allow for lamp lumen depreciation, survival, luminaire dirt and room surface maintenance.',
              'You verify the design with a point-by-point check (E = I × cos³θ / h²) on critical task positions before sign-off.',
            ]}
          />

          <RegsCallout
            source="BS EN 12464-1 — Light and lighting. Lighting of work places. Indoor work places"
            clause="Maintained illuminance Em, uniformity U₀, UGR limits and CRI minima for each indoor task and area type — the European standard the UK lighting industry designs to."
            meaning={
              <>
                BS EN 12464-1 is the harmonised European standard, embedded into CIBSE
                Lighting Guide recommendations. Quote it on the lighting calculation summary
                so the building control officer, BREEAM assessor and contractor are working
                from the same numbers as you.
              </>
            }
            cite="Source: BS EN 12464-1; CIBSE/SLL LG7 Lighting for Offices; CIBSE/SLL Code for Lighting."
          />

          <LearningOutcomes
            outcomes={[
              'Apply the lumen method to calculate number of luminaires required',
              'Calculate room index and determine utilisation factors',
              'Use point-by-point method for specific illuminance calculations',
              'Understand maintained illuminance and maintenance factors',
              'Reference CIBSE lighting guides for design recommendations',
              'Apply inverse square and cosine laws to lighting calculations',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="The Lumen Method"
            plainEnglish="The standard way to size a regular grid of luminaires for an even spread of light. One formula, four inputs, and you get the count."
          >
            <p>
              The lumen method is the primary technique for calculating the number of luminaires
              required to achieve a target average illuminance across a working plane. It accounts
              for room characteristics, surface finishes, and maintenance conditions through
              systematic factors.
            </p>
            <p>
              <strong>The Lumen Method Formula:</strong> N = (E × A) / (Φ × UF × MF)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>N = number of luminaires</li>
              <li>E = maintained illuminance (lux)</li>
              <li>A = area of working plane (m²)</li>
              <li>Φ = luminaire light output (lm)</li>
              <li>UF = utilisation factor</li>
              <li>MF = maintenance factor</li>
            </ul>
            <p>
              <strong>Lumen method procedure:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine required maintained illuminance (E) from CIBSE guides</li>
              <li>Measure or calculate room area (A = L × W)</li>
              <li>Calculate room index: RI = (L × W) / [Hm × (L + W)]</li>
              <li>Select luminaire and note lumen output (Φ)</li>
              <li>Read UF from luminaire data using RI and reflectances</li>
              <li>Determine appropriate MF (typically 0.7-0.8)</li>
              <li>Calculate N and round up to next whole number</li>
              <li>Arrange luminaires in regular array</li>
            </ul>
            <p>
              <strong>Key Variables Explained:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hm:</strong> Mounting height above working plane. Typical 2.0-3.5m for
                offices.
              </li>
              <li>
                <strong>RI:</strong> Room index (room proportions). Typical 0.75-5.0.
              </li>
              <li>
                <strong>UF:</strong> Utilisation factor. Typical 0.3-0.7.
              </li>
              <li>
                <strong>MF:</strong> Maintenance factor. Typical 0.6-0.9.
              </li>
            </ul>
            <p>
              <strong>Remember:</strong> The lumen method gives average illuminance — actual values
              will vary across the space. Software verification is recommended for final designs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Room Index and Utilisation Factor"
            plainEnglish="RI describes the shape of the room. UF says how much luminaire light actually lands on the working plane. Bigger, more proportionate rooms with light surfaces win."
          >
            <p>
              The room index describes the proportions of a room relative to the luminaire mounting
              height. Combined with surface reflectances, it determines how efficiently light from
              luminaires reaches the working plane — the utilisation factor (UF).
            </p>
            <p>
              <strong>Room Index Formula:</strong> RI = (L × W) / [Hm × (L + W)]. L = length, W =
              width, Hm = mounting height above working plane (typically 0.85m above floor).
            </p>
            <p>
              <strong>Room Index Interpretation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>RI &lt; 1:</strong> Small/tall room, low UF
              </li>
              <li>
                <strong>RI 1-2:</strong> Typical rooms
              </li>
              <li>
                <strong>RI 2-3:</strong> Large/low rooms
              </li>
              <li>
                <strong>RI &gt; 3:</strong> Very large/low rooms, high UF
              </li>
            </ul>
            <p>
              <strong>Standard Surface Reflectances:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ceiling:</strong> 0.7 (70%) — white
              </li>
              <li>
                <strong>Walls:</strong> 0.5 (50%) — light colours
              </li>
              <li>
                <strong>Floor:</strong> 0.2 (20%) — typical floor
              </li>
              <li>Often written as C70 W50 F20</li>
            </ul>
            <p>
              <strong>Typical UF Values (Direct Luminaire, C70 W50 F20):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>RI 0.75 → UF ≈ 0.35</li>
              <li>RI 1.0 → UF ≈ 0.42</li>
              <li>RI 1.5 → UF ≈ 0.50</li>
              <li>RI 2.0 → UF ≈ 0.55</li>
              <li>RI 3.0 → UF ≈ 0.62</li>
              <li>RI 5.0 → UF ≈ 0.68</li>
            </ul>
            <p>
              Note: Actual UF values vary by luminaire type — always use manufacturer's photometric
              data.
            </p>
            <p>
              <strong>Design tip:</strong> Dark surfaces significantly reduce UF. For dark ceilings
              or walls, expect 10-30% lower UF than standard tables suggest.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Maintained Illuminance and Maintenance Factors"
            plainEnglish="Lamps dim, dust builds up, walls get grubby. MF builds in headroom so the room still hits the design lux at the end of the cleaning cycle."
          >
            <p>
              Lighting systems depreciate over time — lamps lose output, luminaires and room
              surfaces accumulate dirt. The maintenance factor (MF) accounts for this, ensuring the
              design achieves required illuminance throughout the maintenance cycle.
            </p>
            <p>
              <strong>Maintenance Factor Components:</strong> MF = LLMF × LSF × LMF × RSMF
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LLMF:</strong> Lamp Lumen Maintenance Factor
              </li>
              <li>
                <strong>LSF:</strong> Lamp Survival Factor
              </li>
              <li>
                <strong>LMF:</strong> Luminaire Maintenance Factor
              </li>
              <li>
                <strong>RSMF:</strong> Room Surface Maintenance Factor
              </li>
            </ul>
            <p>
              <strong>CIBSE Maintained Illuminance Recommendations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Corridors, circulation:</strong> 100 lux (LG7)
              </li>
              <li>
                <strong>Warehouse (general):</strong> 150-200 lux (LG1)
              </li>
              <li>
                <strong>General office:</strong> 300-500 lux (LG7)
              </li>
              <li>
                <strong>Retail sales areas:</strong> 300-500 lux (LG6)
              </li>
              <li>
                <strong>Fine assembly/inspection:</strong> 750-1000 lux (LG1)
              </li>
              <li>
                <strong>Operating theatre:</strong> 1000+ lux (LG2)
              </li>
            </ul>
            <p>
              <strong>Typical Maintenance Factors by Environment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Clean (office, retail):</strong> MF 0.80. Regular cleaning, LED lamps.
              </li>
              <li>
                <strong>Normal (schools, workshops):</strong> MF 0.70. Moderate soiling.
              </li>
              <li>
                <strong>Dirty (industrial):</strong> MF 0.60. High soiling, IP65+ luminaires.
              </li>
              <li>
                <strong>Very dirty (foundry):</strong> MF 0.50. Heavy contamination.
              </li>
            </ul>
            <p>
              <strong>Key relationship:</strong> Initial illuminance = Maintained illuminance / MF.
              Always design to maintained, not initial values.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Point-by-Point Calculations"
            plainEnglish="Inverse square + cosine. The two laws that tell you what you'll actually get on a target surface from a single luminaire — and software does this thousands of times per design."
          >
            <p>
              The point-by-point method calculates illuminance at specific locations using luminous
              intensity data and geometric relationships. It combines the inverse square law
              (distance effect) with the cosine law (angle of incidence effect).
            </p>
            <p>
              <strong>Point-by-Point Formula:</strong> E = (I × cos θ) / d². E = illuminance (lux),
              I = intensity towards point (cd), θ = angle to normal, d = distance (m).
            </p>
            <p>
              <strong>Inverse Square Law:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>E = I / d² (for perpendicular incidence)</li>
              <li>Doubling distance quarters illuminance</li>
              <li>Applies to point sources</li>
              <li>Extended sources: use closer to source</li>
            </ul>
            <p>
              <strong>Cosine Law:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>E ∝ cos θ (angle to surface normal)</li>
              <li>Maximum illuminance at perpendicular</li>
              <li>E = 0 at grazing incidence (90°)</li>
              <li>Accounts for surface orientation</li>
            </ul>
            <p>
              <strong>Alternative Forms:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>E = I cos³θ / H²</strong> — using mounting height H
              </li>
              <li>
                <strong>E = I H / d³</strong> — for horizontal surface below source
              </li>
            </ul>
            <p>
              <strong>When to use point-by-point calculations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Spotlights and accent lighting design</li>
              <li>Calculating illuminance at specific task locations</li>
              <li>Checking uniformity at critical points</li>
              <li>Irregular luminaire layouts</li>
              <li>Outdoor and floodlighting applications</li>
              <li>Software typically uses this method internally</li>
            </ul>
            <p>
              <strong>Multiple sources:</strong> Total illuminance at a point = sum of contributions
              from all luminaires. Add individual E values calculated for each luminaire.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="A standard office grid, a downlight on a display, and an MF calculation — three real specifying jobs."
          >
            <p>
              <strong>Example 1: Lumen Method - Office Lighting.</strong> Calculate luminaires
              needed for a 15m × 10m office requiring 400 lux maintained. Luminaires output 4000lm
              each. Ceiling height 3m, working plane 0.85m. Reflectances C70 W50 F20.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Calculate room index. Hm = 3.0 - 0.85 = 2.15m</li>
              <li>RI = (15 × 10) / [2.15 × (15 + 10)] = 150 / 53.75 = <strong>2.79</strong></li>
              <li>
                Step 2: Find UF (from tables at RI = 2.79) ≈ <strong>0.58</strong>
              </li>
              <li>Step 3: Apply formula (MF = 0.8). N = (E × A) / (Φ × UF × MF)</li>
              <li>N = (400 × 150) / (4000 × 0.58 × 0.8)</li>
              <li>
                N = 60000 / 1856 = <strong>32.3 → 33 luminaires</strong>
              </li>
              <li>Arrange in 11 × 3 grid or similar regular array.</li>
            </ul>
            <p>
              <strong>Example 2: Point-by-Point Calculation.</strong> A downlight with 1200cd
              intensity in the relevant direction is mounted 2.5m above a display. The display is
              1.5m horizontally from directly below the downlight. Calculate the illuminance on the
              display.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Step 1: Calculate geometry. H = 2.5m, horizontal distance = 1.5m</li>
              <li>
                d = √(2.5² + 1.5²) = √(6.25 + 2.25) = √8.5 = <strong>2.92m</strong>
              </li>
              <li>
                Step 2: Calculate angle. cos θ = H / d = 2.5 / 2.92 = <strong>0.856</strong>
              </li>
              <li>Step 3: Apply formula. E = (I × cos θ) / d² = (1200 × 0.856) / 2.92²</li>
              <li>
                E = 1027.2 / 8.53 = <strong>120 lux</strong>
              </li>
            </ul>
            <p>
              <strong>Example 3: Maintenance Factor Calculation.</strong> Calculate the maintenance
              factor for an LED installation in a clean office. LLMF = 0.9, LSF = 1.0, LMF = 0.9,
              RSMF = 0.95.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MF = LLMF × LSF × LMF × RSMF = 0.9 × 1.0 × 0.9 × 0.95</li>
              <li>
                MF = <strong>0.77 (use 0.8)</strong>
              </li>
              <li>This means the installation will deliver 77% of initial lumens at end of
              maintenance cycle.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Five formulas, half a dozen CIBSE guides — that covers most jobs."
          >
            <p>
              <strong>Key Formulas to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lumen method:</strong> N = (E × A) / (Φ × UF × MF)
              </li>
              <li>
                <strong>Room index:</strong> RI = (L × W) / [Hm × (L + W)]
              </li>
              <li>
                <strong>Point-by-point:</strong> E = I cos θ / d²
              </li>
              <li>
                <strong>Inverse square:</strong> E = I / d²
              </li>
              <li>
                <strong>Maintenance factor:</strong> MF = LLMF × LSF × LMF × RSMF
              </li>
            </ul>
            <p>
              <strong>CIBSE Lighting Guide References:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LG1:</strong> Industrial Environment
              </li>
              <li>
                <strong>LG2:</strong> Hospitals and Healthcare
              </li>
              <li>
                <strong>LG5:</strong> Lecture/Conference Rooms
              </li>
              <li>
                <strong>LG6:</strong> Outdoor Environment
              </li>
              <li>
                <strong>LG7:</strong> Offices
              </li>
              <li>
                <strong>SLL Handbook:</strong> Comprehensive reference
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Wrong Hm:</strong> Use mounting height above working plane, not floor or
                  ceiling
                </li>
                <li>
                  <strong>Forgetting MF:</strong> Initial illuminance is much higher than maintained
                </li>
                <li>
                  <strong>Wrong UF tables:</strong> Must match luminaire type and reflectances
                </li>
                <li>
                  <strong>Mixing units:</strong> Keep everything in SI units (lux, lumens, metres)
                </li>
              </ul>
            }
            doInstead="Always measure Hm from the working plane (typically 0.85m above floor), apply MF every time, pick UF tables matched to your specific luminaire and surface reflectances, and keep all units in lux/lumens/metres throughout."
          />

          <SectionRule />

          <Scenario
            title="Lumen-method calculation for a 12 m × 8 m classroom"
            situation={
              <>
                You are designing the lighting for a new 12 m × 8 m primary-school
                classroom, mounting height 2.7 m, target Em = 300 lux maintained,
                UGR ≤ 19. The architect has selected a 4000 K, CRI 90 LED panel
                rated 4,000 lm at 32 W. Reflectances: ceiling 70%, walls 50%,
                floor 20%.
              </>
            }
            whatToDo={
              <>
                Compute room index k = (12 × 8) / [2.7 × (12 + 8)] = 1.78. Look up UF
                from the photometric file at k = 1.78 and the given reflectances (typically
                0.62). Set MF = 0.80 (clean office/classroom, 3-year cleaning cycle, LED
                LLMF 0.92 × LMF 0.92 × RSMF ≈ 0.80). Calculate
                N = (300 × 96) / (4000 × 0.62 × 0.80) ≈ 14.5 — round up to 16
                luminaires arranged 4 × 4 for uniformity. Verify U₀ ≥ 0.6 with a
                point-by-point grid in DIALux.
              </>
            }
            whyItMatters={
              <>
                Schools are inspected against BS EN 12464-1 and Building Bulletin 90
                (lighting for schools). An undersized scheme triggers a re-design after
                handover and a Department for Education non-conformity report. The
                lumen-method calculation is the auditable spine of the lighting design.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Lumen method N = (E × A) / (Φ × UF × MF) — the workhorse first-pass design tool.',
              'Room index k = (L × W) / [Hm × (L + W)] — drives Utilisation Factor lookup.',
              'Mounting height Hm = ceiling-to-working-plane distance (typically 0.7 m above floor for desks).',
              'Maintenance Factor MF = LLMF × LSF × LMF × RSMF — never use 1.0 except in commissioning verification.',
              'Point-by-point E = I × cos³θ / h² — verifies lumen-method results at task locations.',
              'Inverse-square law: doubling distance = quartering illuminance.',
              'Cosine law: E_horizontal = E_normal × cos θ — critical for desks lit by angled sources.',
              'BS EN 12464-1 is the design-target standard; CIBSE LG7/LG5/LG2 supplies UK-specific commentary.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Light and Vision
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lamp Types and Efficacy
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section4_2;
