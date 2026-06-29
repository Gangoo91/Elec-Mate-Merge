/**
 * Module 7 · Section 3 · Subsection 2 — Lumen Method Calculations
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Room index, utilisation factors, maintenance factors, and average illuminance calculations for interior lighting design
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Lumen Method Calculations - HNC Module 7 Section 3.2';
const DESCRIPTION =
  'Master the lumen method for interior lighting design: room index calculations, utilisation factors, maintenance factors, and average illuminance calculations for building services projects.';

const quickCheckQuestions = [
  {
    id: 'lumen-formula',
    question: 'What is the correct formula for the lumen method?',
    options: [
      'E = n × F × UF × MF × A',
      'E = (n × F × UF × MF) / A',
      'E = F / (n × UF × MF × A)',
      'n = E × A / (F × UF × MF)',
    ],
    correctIndex: 1,
    explanation:
      'The lumen method formula is E = (n × F × UF × MF) / A, where E is average illuminance (lux), n is number of luminaires, F is lamp flux (lumens), UF is utilisation factor, MF is maintenance factor, and A is area (m²).',
  },
  {
    id: 'room-index-definition',
    question: 'What does the room index (K) represent in lighting design?',
    options: [
      'The total luminous flux emitted by all luminaires in the room',
      'The ratio of the room area to its perimeter length',
      'The average reflectance of the ceiling, walls and floor combined',
      'A ratio describing room proportions relative to mounting height',
    ],
    correctIndex: 3,
    explanation:
      'The room index (K) is a dimensionless ratio that describes room proportions relative to luminaire mounting height above the working plane. It determines how effectively light is utilised in the space.',
  },
  {
    id: 'utilisation-factor',
    question: 'Which factors determine the utilisation factor (UF)?',
    options: [
      'Maintenance schedule only',
      'Ceiling height and floor area only',
      'Room index and surface reflectances',
      'Only lamp type and wattage',
    ],
    correctIndex: 2,
    explanation:
      'The utilisation factor depends on the room index (K) and the reflectances of ceiling, walls, and floor surfaces. These determine what proportion of lamp lumens reaches the working plane.',
  },
  {
    id: 'maintenance-factor',
    question: 'A maintenance factor of 0.8 means:',
    options: [
      'Light output will reduce to 80% over the maintenance period',
      'Only 80% of the luminaires need to be working at any one time',
      'The room surfaces reflect 80% of the light that strikes them',
      'The luminaires operate at 80% of their rated power consumption',
    ],
    correctIndex: 0,
    explanation:
      'A maintenance factor of 0.8 indicates that average illuminance will reduce to 80% of initial values over the maintenance period due to lamp lumen depreciation, luminaire dirt accumulation, and room surface degradation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A room measures 12m × 8m with a mounting height (Hm) of 2.4m. What is the room index?',
    options: [
      'K = 1.5',
      'K = 2.0',
      'K = 2.5',
      'K = 3.0',
    ],
    correctAnswer: 1,
    explanation:
      'K = (L × W) / [Hm × (L + W)] = (12 × 8) / [2.4 × (12 + 8)] = 96 / (2.4 × 20) = 96 / 48 = 2.0',
  },
  {
    id: 2,
    question:
      'If a room requires 500 lux, has an area of 80m², UF = 0.52, and MF = 0.8, what total lamp flux is needed?',
    options: [
      '104,167 lumens',
      '83,333 lumens',
      '96,154 lumens',
      '120,000 lumens',
    ],
    correctAnswer: 2,
    explanation:
      'Total flux = (E × A) / (UF × MF) = (500 × 80) / (0.52 × 0.8) = 40,000 / 0.416 = 96,154 lumens',
  },
  {
    id: 3,
    question: 'Which surface reflectance has the greatest impact on utilisation factor?',
    options: [
      'Wall reflectance',
      'Floor reflectance',
      'Desk surface reflectance',
      'Ceiling reflectance',
    ],
    correctAnswer: 3,
    explanation:
      'Ceiling reflectance has the greatest impact on UF because most luminaires direct light upward and downward. A highly reflective ceiling redirects upward light back to the working plane, significantly improving utilisation.',
  },
  {
    id: 4,
    question: 'The mounting height (Hm) in room index calculations is measured from:',
    options: [
      'Working plane to luminaire',
      'Floor to luminaire',
      'Floor to ceiling',
      'Floor to working plane',
    ],
    correctAnswer: 0,
    explanation:
      'Mounting height (Hm) is the vertical distance from the working plane (typically 0.85m above floor for offices) to the luminaire. This affects how light spreads across the room.',
  },
  {
    id: 5,
    question: 'A maintenance factor comprises which components?',
    options: [
      'Lamp survival factor only',
      'LLMF, LMF, and RSMF',
      'Utilisation factor and lamp flux',
      'Room index and reflectances',
    ],
    correctAnswer: 1,
    explanation:
      'Maintenance factor (MF) = LLMF × LMF × RSMF, where LLMF is lamp lumen maintenance factor, LMF is luminaire maintenance factor, and RSMF is room surface maintenance factor.',
  },
  {
    id: 6,
    question:
      'For a room with K = 1.25, the utilisation factor from tables shows UF = 0.48 at K = 1.0 and UF = 0.55 at K = 1.5. Using interpolation, what is UF at K = 1.25?',
    options: [
      '0.50',
      '0.52',
      '0.515',
      '0.53',
    ],
    correctAnswer: 2,
    explanation:
      'Linear interpolation: UF = 0.48 + [(1.25 - 1.0) / (1.5 - 1.0)] × (0.55 - 0.48) = 0.48 + 0.5 × 0.07 = 0.48 + 0.035 = 0.515',
  },
  {
    id: 7,
    question:
      'If 20 luminaires each with 3,200 lumens are installed in a 100m² room with UF = 0.6 and MF = 0.75, what is the maintained illuminance?',
    options: [
      '480 lux',
      '384 lux',
      '432 lux',
      '288 lux',
    ],
    correctAnswer: 3,
    explanation:
      'E = (n × F × UF × MF) / A = (20 × 3,200 × 0.6 × 0.75) / 100 = 28,800 / 100 = 288 lux',
  },
  {
    id: 8,
    question:
      'Why does a narrow room (high length-to-width ratio) have a lower room index than a square room of equal area?',
    options: [
      'The perimeter increases, reducing the L×W / Hm(L+W) ratio',
      'A narrow room always requires a greater mounting height',
      'The floor area is smaller, which directly lowers the room index',
      'Light escapes through the longer walls, reducing utilisation',
    ],
    correctAnswer: 0,
    explanation:
      'For the same area, a narrow room has a larger perimeter (L + W), which increases the denominator in K = L×W / [Hm(L+W)], reducing the room index. A square room maximises K for a given area.',
  },
  {
    id: 9,
    question:
      'A lighting scheme is designed for 400 lux maintained illuminance. If the maintenance factor is 0.8, what is the initial illuminance?',
    options: [
      '320 lux',
      '500 lux',
      '480 lux',
      '400 lux',
    ],
    correctAnswer: 1,
    explanation:
      'Initial illuminance = Maintained illuminance / MF = 400 / 0.8 = 500 lux. The lighting starts brighter and reduces to the maintained level over the maintenance period.',
  },
  {
    id: 10,
    question:
      'Typical ceiling reflectance values for a white ceiling, light walls, and dark floor would be:',
    options: [
      '0.9, 0.7, 0.3',
      '0.3, 0.2, 0.1',
      '0.7, 0.5, 0.2',
      '0.5, 0.3, 0.1',
    ],
    correctAnswer: 2,
    explanation:
      'Typical reflectance values: white ceiling 0.7-0.8, light coloured walls 0.5-0.7, and dark floor 0.1-0.3. These values are used to select the appropriate UF from manufacturer tables.',
  },
  {
    id: 11,
    question: 'When would you NOT use the lumen method for lighting design?',
    options: [
      'General lighting of a regular rectangular office',
      'Uniform lighting of a large open-plan classroom',
      'Average illuminance across a standard warehouse floor',
      'Task lighting for specific workstations',
    ],
    correctAnswer: 3,
    explanation:
      'The lumen method calculates average illuminance across a whole room. For task lighting at specific locations, point-by-point calculations are more appropriate as they account for the distance and angle from luminaire to task.',
  },
  {
    id: 12,
    question:
      'A design requires 24 luminaires but the preferred symmetrical arrangement is 5 rows of 5 (25 fittings). What is the best approach?',
    options: [
      'Install 25 luminaires and recalculate to confirm the resulting illuminance is within limits',
      'Force 24 luminaires into an irregular layout to match the calculated number exactly',
      'Reduce the required illuminance level so that exactly 24 luminaires will suffice',
      'Increase the mounting height so that 24 luminaires cover the room uniformly',
    ],
    correctAnswer: 0,
    explanation:
      'A regular, symmetrical layout gives the best uniformity, so installing 25 luminaires in a 5×5 grid is usually preferable. The slightly higher illuminance is acceptable provided it is recalculated and stays within the design limits.',
  },
];

const faqs = [
  {
    question: 'What is the difference between maintained and initial illuminance?',
    answer:
      'Initial illuminance is the light level when luminaires are new and clean. Maintained illuminance is the minimum average level at the end of the maintenance period, after lamp depreciation and dirt accumulation. The ratio is the maintenance factor (MF). Design standards specify maintained illuminance to ensure adequate light throughout the maintenance cycle.',
  },
  {
    question: 'How do I find utilisation factor values?',
    answer:
      'Utilisation factors are provided in luminaire photometric data from manufacturers. They are presented in tables showing UF against room index (K) for various combinations of ceiling, wall, and floor reflectances (typically expressed as C/W/F, e.g., 0.7/0.5/0.2). Interpolate between values when the exact room index is not listed.',
  },
  {
    question: 'When should I use the lumen method versus point-by-point calculations?',
    answer:
      'Use the lumen method for general lighting of regular-shaped rooms where uniform illuminance is required (offices, classrooms, industrial spaces). Use point-by-point calculations for task lighting, display lighting, exterior areas, and irregular spaces where illuminance varies significantly across the working plane.',
  },
  {
    question: 'What maintenance factor should I use if not specified?',
    answer:
      'If specific MF values are not provided, typical values range from 0.7 (dirty industrial environments with infrequent cleaning) to 0.9 (clean environments with LED luminaires and regular maintenance). For office environments with LED lighting and annual cleaning, MF = 0.8 is commonly used. Always document assumptions.',
  },
  {
    question: 'How do I handle rooms with unusual shapes?',
    answer:
      'For L-shaped, T-shaped, or irregular rooms, divide into regular rectangular sections and calculate each separately. For rooms with significant obstructions (columns, partitions), treat each clear zone individually. The lumen method assumes uniform luminaire distribution, so irregular spaces may require point-by-point analysis.',
  },
  {
    question: 'Why does working plane height affect calculations?',
    answer:
      'The working plane height (typically 0.85m for desks, 0m for floor-level tasks) determines the mounting height Hm in the room index calculation. A higher working plane means a lower Hm, which increases the room index and improves utilisation factor. Always confirm the appropriate working plane for the application.',
  },
];

const HNCModule7Section3_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3 · Subsection 2"
            title="Lumen Method Calculations"
            description="Room index, utilisation factors, maintenance factors, and average illuminance calculations for interior lighting design"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply the lumen method formula to calculate average illuminance",
              "Calculate room index for various room dimensions",
              "Select utilisation factors from manufacturer data",
              "Determine appropriate maintenance factors for different environments",
              "Calculate the number of luminaires required for a given illuminance",
              "Complete full lighting design calculations with worked examples",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="The Lumen Method Formula">
            <p>The lumen method is the standard technique for calculating average illuminance in interior spaces. It determines how many luminaires are needed to achieve a specified maintained illuminance level across the working plane of a room.</p>
            <p><strong>Lumen Method Formula</strong></p>
            <p>E = (n × F × UF × MF) / A</p>
            <p>= Average illuminance (lux)</p>
            <p>= Number of luminaires</p>
            <p>= Luminous flux per luminaire (lumens)</p>
            <p>= Utilisation factor (0-1)</p>
            <p>= Maintenance factor (0-1)</p>
            <p>= Room area (m²)</p>
            <p><strong>Rearranged Forms of the Formula</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Illuminance (E):</strong> E = (n × F × UF × MF) / A — Verify existing installation</li>
              <li><strong>Number of luminaires (n):</strong> n = (E × A) / (F × UF × MF) — New lighting design</li>
              <li><strong>Total flux required:</strong> Φ = (E × A) / (UF × MF) — Luminaire selection</li>
            </ul>
            <p><strong>Key assumptions of the lumen method:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Uniform distribution:</strong> Luminaires are evenly spaced across the ceiling</li>
              <li><strong>Regular room shape:</strong> Rectangular rooms work best; irregular shapes need subdivision</li>
              <li><strong>Average illuminance:</strong> Calculates mean value, not minimum or maximum</li>
              <li><strong>Horizontal working plane:</strong> Results apply to a flat surface at specified height</li>
            </ul>
            <p><strong>Design principle:</strong> The lumen method gives average illuminance. For uniformity requirements, spacing-to-height ratios must also be checked.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Room Index Calculation">
            <p>The room index (K) is a dimensionless number that describes room proportions relative to the luminaire mounting height. It determines how effectively light from luminaires reaches the working plane.</p>
            <p><strong>Room Index Formula</strong></p>
            <p>K = (L × W) / [Hm × (L + W)]</p>
            <p>= Room index (dimensionless)</p>
            <p>= Room length (m)</p>
            <p>= Room width (m)</p>
            <p>= Mounting height above working plane (m)</p>
            <p><strong>Mounting Height (Hm)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ceiling height minus working plane height</li>
              <li>Office working plane: typically 0.85m</li>
              <li>Standing work: typically 0.95m</li>
              <li>Floor-level tasks: 0m working plane</li>
            </ul>
            <p><strong>Typical K Values</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Small rooms: K = 0.6-1.0</li>
              <li>Medium rooms: K = 1.0-2.5</li>
              <li>Large rooms: K = 2.5-5.0</li>
              <li>Very large halls: K &gt; 5.0</li>
            </ul>
            <p><strong>Room Index Example Calculations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Small office:</strong> 6 × 4 — 2.0 — 24 / (2.0 × 10) — 1.2</li>
              <li><strong>Open plan:</strong> 20 × 15 — 2.4 — 300 / (2.4 × 35) — 3.57</li>
              <li><strong>Classroom:</strong> 10 × 8 — 2.15 — 80 / (2.15 × 18) — 2.07</li>
              <li><strong>Warehouse:</strong> 40 × 25 — 6.0 — 1000 / (6.0 × 65) — 2.56</li>
            </ul>
            <p><strong>Key insight:</strong> Higher K values mean better light utilisation. Square rooms have higher K than narrow rooms of equal area.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Utilisation Factors">
            <p>The utilisation factor (UF) represents the proportion of luminaire output that reaches the working plane. It depends on the room index, luminaire light distribution, and the reflectances of room surfaces.</p>
            <p><strong>Factors Affecting Utilisation Factor</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Room index (K):</strong> Higher K = higher UF (larger rooms utilise light better)</li>
              <li><strong>Ceiling reflectance:</strong> Most significant; typical values 0.7-0.8 for white</li>
              <li><strong>Wall reflectance:</strong> Second most important; typical values 0.3-0.7</li>
              <li><strong>Floor reflectance:</strong> Least impact; typical values 0.1-0.3</li>
              <li><strong>Luminaire type:</strong> Light distribution pattern (direct, indirect, general)</li>
            </ul>
            <p><strong>Example UF Table (Typical Recessed LED Panel)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0.75:</strong> 0.41 — 0.37 — 0.33</li>
              <li><strong>1.00:</strong> 0.48 — 0.44 — 0.39</li>
              <li><strong>1.25:</strong> 0.53 — 0.49 — 0.44</li>
              <li><strong>1.50:</strong> 0.57 — 0.53 — 0.47</li>
              <li><strong>2.00:</strong> 0.63 — 0.58 — 0.52</li>
              <li><strong>2.50:</strong> 0.67 — 0.62 — 0.56</li>
              <li><strong>3.00:</strong> 0.70 — 0.65 — 0.58</li>
            </ul>
            <p>Values are illustrative. Always use manufacturer's actual photometric data.</p>
            <p><strong>Linear Interpolation for UF</strong></p>
            <p>When K falls between tabulated values, interpolate linearly:</p>
            <p>UF = UF₁ + [(K - K₁) / (K₂ - K₁)] × (UF₂ - UF₁)</p>
            <p>Example: For K = 1.75 between K = 1.5 (UF = 0.57) and K = 2.0 (UF = 0.63): <br /> UF = 0.57 + [(1.75 - 1.5) / (2.0 - 1.5)] × (0.63 - 0.57) = 0.57 + 0.5 × 0.06 = 0.60</p>
            <p><strong>Practical tip:</strong> Dark walls and ceilings significantly reduce UF. In industrial spaces with dark surfaces, UF may be 30-40% lower than in offices with light finishes.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Maintenance Factors">
            <p>The maintenance factor (MF) accounts for the reduction in light output over time due to lamp depreciation, luminaire soiling, and room surface degradation. It ensures the maintained illuminance meets requirements at the end of the maintenance cycle.</p>
            <p><strong>Maintenance Factor Components</strong></p>
            <p>MF = LLMF × LMF × RSMF</p>
            <p><strong>LLMF</strong> = Lamp Lumen Maintenance Factor (lamp output depreciation)</p>
            <p><strong>LMF</strong> = Luminaire Maintenance Factor (dirt on luminaire surfaces)</p>
            <p><strong>RSMF</strong> = Room Surface Maintenance Factor (dirt on room surfaces)</p>
            <p><strong>Typical Component Values</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LLMF (LED at 50,000h):</strong> 0.90 — 0.90 — 0.90</li>
              <li><strong>LMF (3-year cycle):</strong> 0.95 — 0.90 — 0.80</li>
              <li><strong>RSMF (3-year cycle):</strong> 0.98 — 0.95 — 0.90</li>
              <li><strong>Combined MF:</strong> 0.84 — 0.77 — 0.65</li>
            </ul>
            <p><strong>Environment Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Very clean:</strong> Clean rooms, hospitals (MF ≈ 0.9)</li>
              <li><strong>Clean:</strong> Offices, schools (MF ≈ 0.8)</li>
              <li><strong>Normal:</strong> Retail, light industry (MF ≈ 0.75)</li>
              <li><strong>Dirty:</strong> Heavy industry, workshops (MF ≈ 0.65)</li>
            </ul>
            <p><strong>Maintenance Cycle Impact</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Annual cleaning:</strong> Higher LMF values</li>
              <li><strong>3-year cycle:</strong> Standard commercial</li>
              <li><strong>5-year cycle:</strong> Lower MF required</li>
              <li><strong>IP65+ luminaires:</strong> Better LMF in dirty areas</li>
            </ul>
            <p><strong>Initial vs Maintained Illuminance</strong></p>
            <p><strong>Initial illuminance</strong> = E / MF (what you get when luminaires are new) <br /> <strong>Maintained illuminance</strong> = E (what you get at end of maintenance period) <br /> <br /> Example: If design requires 500 lux maintained and MF = 0.8: <br /> Initial illuminance = 500 / 0.8 = 625 lux</p>
            <p><strong>Design consideration:</strong> Higher MF allows fewer luminaires but requires more frequent maintenance. Balance capital cost against maintenance costs.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Office Lighting Design</strong>
            </p>
            <p><strong>Brief:</strong> Design general lighting for an office 15m × 12m with 3m ceiling height and 0.85m working plane. Required illuminance: 500 lux maintained. Using LED panels rated at 4,000 lumens each.</p>
            <p>Step 1: Calculate mounting height</p>
            <p>Hm = 3.0 - 0.85 = 2.15m</p>
            <p>Step 2: Calculate room index</p>
            <p>K = (L × W) / [Hm × (L + W)]</p>
            <p>K = (15 × 12) / [2.15 × (15 + 12)]</p>
            <p>K = 180 / (2.15 × 27) = 180 / 58.05</p>
            <p>K = 3.10</p>
            <p>Step 3: Determine UF (from table, C/W/F = 0.7/0.5/0.2)</p>
            <p>For K = 3.0, UF = 0.70 (interpolate if needed)</p>
            <p>UF = 0.70</p>
            <p>Step 4: Determine MF (clean office, 3-year maintenance)</p>
            <p>MF = 0.80</p>
            <p>Step 5: Calculate number of luminaires</p>
            <p>n = (E × A) / (F × UF × MF)</p>
            <p>n = (500 × 180) / (4,000 × 0.70 × 0.80)</p>
            <p>n = 90,000 / 2,240</p>
            <p>n = 40.2 → Use 40 luminaires</p>
            <p>Step 6: Verify illuminance with 40 luminaires</p>
            <p>E = (40 × 4,000 × 0.70 × 0.80) / 180</p>
            <p>E = 497 lux ✓ (acceptable, within 10% of target)</p>
            <p>Step 7: Arrange luminaires (5 rows × 8 columns)</p>
            <p>Spacing: 15m / 8 = 1.875m (along length)</p>
            <p>Spacing: 12m / 5 = 2.4m (along width)</p>
            <p>
              <strong>Example 2: Classroom Verification</strong>
            </p>
            <p><strong>Brief:</strong> A classroom 10m × 8m has 18 luminaires installed, each rated at 3,600 lumens. Ceiling height 3m, working plane 0.85m. Surface reflectances: ceiling 0.7, walls 0.5, floor 0.2. Verify maintained illuminance with MF = 0.75.</p>
            <p>Step 1: Calculate mounting height and room index</p>
            <p>Hm = 3.0 - 0.85 = 2.15m</p>
            <p>K = (10 × 8) / [2.15 × (10 + 8)]</p>
            <p>K = 80 / 38.7 = 2.07</p>
            <p>K ≈ 2.0</p>
            <p>Step 2: Determine UF from table</p>
            <p>For K = 2.0 and reflectances 0.7/0.5/0.2:</p>
            <p>UF = 0.63</p>
            <p>Step 3: Calculate maintained illuminance</p>
            <p>A = 10 × 8 = 80 m²</p>
            <p>E = (n × F × UF × MF) / A</p>
            <p>E = (18 × 3,600 × 0.63 × 0.75) / 80</p>
            <p>E = 30,618 / 80</p>
            <p>E = 383 lux</p>
            <p>Step 4: Compare with standard requirement</p>
            <p>Classroom requirement (BS EN 12464-1): 300 lux minimum</p>
            <p>383 lux &gt; 300 lux ✓ Installation complies</p>
            <p>
              <strong>Example 3: Industrial Workshop</strong>
            </p>
            <p><strong>Brief:</strong> Calculate luminaires for a workshop 30m × 20m with 6m ceiling height (floor-level working plane). Required: 300 lux. High-bay LED luminaires rated at 20,000 lumens. Environment: normal industrial.</p>
            <p>Step 1: Calculate room index</p>
            <p>Hm = 6.0m (working plane at floor)</p>
            <p>K = (30 × 20) / [6.0 × (30 + 20)]</p>
            <p>K = 600 / 300 = 2.0</p>
            <p>K = 2.0</p>
            <p>Step 2: Determine UF (darker industrial surfaces)</p>
            <p>Reflectances approximately 0.5/0.3/0.1</p>
            <p>UF = 0.52</p>
            <p>Step 3: Determine MF (industrial environment)</p>
            <p>Normal industrial, IP65 luminaires</p>
            <p>MF = 0.70</p>
            <p>Step 4: Calculate number of luminaires</p>
            <p>A = 30 × 20 = 600 m²</p>
            <p>n = (E × A) / (F × UF × MF)</p>
            <p>n = (300 × 600) / (20,000 × 0.52 × 0.70)</p>
            <p>n = 180,000 / 7,280</p>
            <p>n = 24.7 → Use 25 luminaires</p>
            <p>Step 5: Arrangement (5 × 5 grid)</p>
            <p>Spacing: 30m / 5 = 6m along length</p>
            <p>Spacing: 20m / 5 = 4m along width</p>
            <p>Step 6: Verify with 25 luminaires</p>
            <p>E = (25 × 20,000 × 0.52 × 0.70) / 600</p>
            <p>E = 303 lux ✓</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Design Process Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm illuminance requirement from BS EN 12464-1 or client specification</li>
              <li>Measure or obtain room dimensions (L, W) and ceiling height</li>
              <li>Determine working plane height for the application</li>
              <li>Calculate room index K = L×W / [Hm(L+W)]</li>
              <li>Assess surface reflectances (ceiling, walls, floor)</li>
              <li>Select luminaire type and obtain UF data from manufacturer</li>
              <li>Determine maintenance factor based on environment and cleaning regime</li>
              <li>Calculate number of luminaires required</li>
              <li>Verify illuminance achieved with practical arrangement</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Office working plane: <strong>0.85m</strong></li>
              <li>Office illuminance: <strong>500 lux</strong> (writing, typing, reading)</li>
              <li>Classroom illuminance: <strong>300-500 lux</strong></li>
              <li>Typical MF range: <strong>0.7-0.9</strong></li>
              <li>Typical UF range: <strong>0.4-0.7</strong></li>
              <li>White ceiling reflectance: <strong>0.7-0.8</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Wrong mounting height:</strong> Using ceiling height instead of Hm (ceiling to working plane)</li>
                <li><strong>Ignoring reflectances:</strong> Using standard UF without considering actual surface colours</li>
                <li><strong>Overestimating MF:</strong> Using 0.9 for normal environments (0.8 is more realistic)</li>
                <li><strong>Forgetting to verify:</strong> Not recalculating illuminance with the actual number of luminaires installed</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lighting fundamentals
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Point-by-point method
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section3_2;
