/**
 * Module 4 · Section 4 · Subsection 2 — Interior Lighting Calculations
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Lumen method N = (E × A) / (Φ × UF × MF), room index K = LW / Hm(L+W),
 *   utilisation factor tables, maintenance factor MF = LLD × LDD × RSDD, photometric
 *   files (IES / LDT / EULUMDAT) and DIALux / Relux point-by-point software workflow.
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

const TITLE = 'Interior Lighting Calculations - HNC Module 4 Section 4.2';
const DESCRIPTION =
  'Master interior lighting calculations for building services: the lumen method formula (N = E×A / Φ×UF×MF), room index, utilisation factors, and DIALux/Relux software applications.';

const quickCheckQuestions = [
  {
    id: 'lumen-method',
    question: 'In the lumen method formula N = E×A / (Φ×UF×MF), what does N represent?',
    options: [
      'Number of luminaires',
      'Lumens required',
      'Nominal wattage',
      'Neutral factor',
    ],
    correctIndex: 0,
    explanation:
      'N represents the number of luminaires required to achieve the target illuminance. The formula calculates how many luminaires are needed based on the room area, target illuminance, lamp lumens, utilisation factor and maintenance factor.',
  },
  {
    id: 'room-index',
    question: 'What is the room index formula?',
    options: [
      'K = L × W × H',
      'K = (L + W) / (H × L × W)',
      'K = H × (L + W) / (L × W)',
      'K = L × W / (H × (L + W))',
    ],
    correctIndex: 3,
    explanation:
      'The room index K = (L × W) / (Hm × (L + W)) where L = room length, W = room width, and Hm = mounting height above working plane. This ratio characterises room proportions for lighting calculations.',
  },
  {
    id: 'utilisation-factor',
    question: 'What two room properties most affect the utilisation factor?',
    options: [
      'Ceiling height and floor type',
      'Door positions and window area',
      'Room index and surface reflectances',
      'Length and width',
    ],
    correctIndex: 2,
    explanation:
      'Utilisation factor depends primarily on room index (proportions) and surface reflectances (ceiling, walls, floor). These determine how much of the emitted light reaches the working plane versus being absorbed.',
  },
  {
    id: 'maintenance-factor',
    question:
      'A typical office installation has MF = 0.8. If initial illuminance is 625 lux, what is the maintained illuminance?',
    options: [
      '500 lux',
      '625 lux',
      '781 lux',
      '400 lux',
    ],
    correctIndex: 0,
    explanation:
      'Maintained illuminance = Initial illuminance × MF = 625 × 0.8 = 500 lux. The maintenance factor accounts for lamp depreciation and luminaire dirt accumulation over the maintenance period.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the standard mounting height above the working plane (Hm) used in office lighting calculations?',
    options: [
      '2.80m (the full floor-to-ceiling height)',
      '1.95m (2.8m ceiling - 0.85m desk)',
      '0.85m (the working plane height alone)',
      '3.45m (ceiling height plus desk height)',
    ],
    correctAnswer: 1,
    explanation:
      'For offices with 2.8m ceiling and 0.85m working plane, Hm = 2.8 - 0.85 = 1.95m (often rounded to 2.0m). Mounting height is measured above the working plane, not the floor.',
  },
  {
    id: 2,
    question: 'An office is 12m × 8m with 2m mounting height. What is the room index?',
    options: [
      '2.0',
      '0.8',
      '2.4',
      '1.2',
    ],
    correctAnswer: 2,
    explanation:
      'Room index K = (L × W) / (Hm × (L + W)) = (12 × 8) / (2 × (12 + 8)) = 96 / 40 = 2.4',
  },
  {
    id: 3,
    question: 'What happens to the utilisation factor as room index increases?',
    options: [
      'It remains constant',
      'It decreases significantly',
      'It decreases then increases',
      'It increases, then levels off',
    ],
    correctAnswer: 3,
    explanation:
      'As room index increases, UF increases but levels off at higher values. Large rooms (high K) are more efficient because less light is lost to walls. UF tables typically range from K = 0.75 to K = 5.0.',
  },
  {
    id: 4,
    question: 'Which component is NOT part of the maintenance factor (MF) calculation?',
    options: [
      'Utilisation factor (UF)',
      'Luminaire dirt depreciation (LDD)',
      'Room surface depreciation (RSD)',
      'Lamp lumen depreciation (LLD)',
    ],
    correctAnswer: 0,
    explanation:
      'MF = LLD × LDD × RSDD. Utilisation factor (UF) is a separate factor in the lumen method formula. It relates to room geometry and reflectances, not maintenance over time.',
  },
  {
    id: 5,
    question:
      'For a clean office environment with LED luminaires and 3-year maintenance cycle, what typical MF might be used?',
    options: [
      '0.7',
      '0.8',
      '0.9',
      '0.6',
    ],
    correctAnswer: 1,
    explanation:
      'MF = 0.8 is typical for clean offices with LED sources. LEDs have good lumen maintenance (LLD ≈ 0.9), and clean environments have modest dirt accumulation (LDD ≈ 0.9). MF = 0.9 × 0.9 ≈ 0.8.',
  },
  {
    id: 6,
    question: 'What are standard room surface reflectances assumed in lighting calculations?',
    options: [
      'Ceiling 0.5, Walls 0.3, Floor 0.1',
      'Ceiling 0.9, Walls 0.7, Floor 0.4',
      'Ceiling 0.7, Walls 0.5, Floor 0.2',
      'Ceiling 0.8, Walls 0.6, Floor 0.3',
    ],
    correctAnswer: 2,
    explanation:
      'Standard reflectances are: Ceiling 0.7 (70%), Walls 0.5 (50%), Floor 0.2 (20%). These represent typical light-coloured finishes and are used unless actual surface finishes are significantly different.',
  },
  {
    id: 7,
    question:
      "In DIALux software, what does 'point-by-point' calculation provide that the lumen method does not?",
    options: [
      'The total installed load in watts per square metre',
      'The average illuminance across the whole room',
      'The colour temperature of each luminaire',
      'Illuminance at specific grid points showing uniformity',
    ],
    correctAnswer: 3,
    explanation:
      'Point-by-point calculation provides illuminance values at a grid of points across the room, enabling accurate uniformity assessment and identification of dark spots. The lumen method only provides average illuminance.',
  },
  {
    id: 8,
    question: "What does the Flux Code on a luminaire's intensity distribution indicate?",
    options: [
      'The proportion of light emitted in different directions',
      'The total luminous flux of the lamp in lumens',
      'The energy efficiency of the luminaire in lm/W',
      'The recommended mounting height for the luminaire',
    ],
    correctAnswer: 0,
    explanation:
      'The Flux Code indicates the proportion of light emitted in zones: downward (0-40°), (40-60°), (60-90°) and upward. For example, 42/77/97/100/57 indicates percentages reaching each zone boundary.',
  },
  {
    id: 9,
    question:
      'A room requires 20 luminaires arranged on a 3m × 2m spacing grid. Which room size suits a 5 × 4 layout?',
    options: [
      '6m × 4m (24m²)',
      '15m × 8m (120m²)',
      '9m × 6m (54m²)',
      '20m × 15m (300m²)',
    ],
    correctAnswer: 1,
    explanation:
      'A 5 × 4 grid at 3m × 2m spacing covers 15m (5 × 3m) by 8m (4 × 2m), giving a 120m² room. The grid dimensions multiplied by the spacing give the room size.',
  },
  {
    id: 10,
    question:
      'What is the typical spacing-to-height ratio (SHR) for recessed LED panels in an office?',
    options: [
      '0.5:1',
      '1.0:1',
      '1.2-1.5:1',
      '2.0:1',
    ],
    correctAnswer: 2,
    explanation:
      "SHR of 1.2-1.5:1 is typical for recessed LED panels. This provides good uniformity without excessive luminaire quantities. The specific ratio depends on the luminaire's light distribution.",
  },
];

const faqs = [
  {
    question:
      'Why is the lumen method still used when software can do point-by-point calculations?',
    answer:
      "The lumen method provides a quick check of approximate luminaire quantities before detailed design. It's useful for early feasibility studies, budget estimates and verifying software results. Software gives detailed results but takes longer to set up. Both methods are part of professional practice.",
  },
  {
    question: 'How do I obtain utilisation factor tables for a specific luminaire?',
    answer:
      'Manufacturers provide UF tables in their technical data sheets and IES/LDT photometric files. These tables show UF values for different room indices (K values) and room reflectance combinations. Modern software like DIALux imports photometric files and calculates UF automatically.',
  },
  {
    question: 'What is the difference between DIALux and Relux software?',
    answer:
      'Both are professional lighting design software with similar capabilities. DIALux (from DIAL GmbH) and Relux (from Relux AG) can both perform point-by-point calculations, render 3D visualisations and produce compliance reports. Choice often depends on manufacturer plug-in availability and regional preference. Both are free to use.',
  },
  {
    question: 'How do I determine the correct maintenance factor to use?',
    answer:
      'MF depends on: lamp type (LED has better LLD than fluorescent), luminaire IP rating and optic type (affecting dirt ingress), environmental cleanliness (clean office vs dusty factory), and maintenance interval. CIBSE SLL and CIE provide guidance tables. Typical values range from MF 0.57 (dirty industrial) to MF 0.9 (clean with sealed luminaires).',
  },
  {
    question: 'Can I use the lumen method for rooms with irregular shapes?',
    answer:
      'The lumen method assumes rectangular rooms. For L-shaped, circular or irregular spaces, either divide into rectangular zones and calculate separately, or use lighting design software which can handle any room shape. Point-by-point software calculation is essential for complex geometries.',
  },
  {
    question: 'What is direct/indirect ratio and when is it important?',
    answer:
      'Direct/indirect describes the proportion of light directed downward versus upward (reflected from ceiling). Typical office panels are 100% direct. Suspended luminaires might be 60/40 direct/indirect, improving ceiling brightness and reducing contrast. The choice affects room appearance, glare and utilisation factor.',
  },
];

const HNCModule4Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 2"
            title="Interior Lighting Calculations"
            description="Mastering the lumen method and modern software tools for accurate lighting design calculations."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Apply the lumen method formula to calculate luminaire quantities',
              'Calculate room index for different space configurations',
              'Use utilisation factor tables with correct reflectance values',
              'Determine appropriate maintenance factors for installations',
              'Understand DIALux/Relux software calculation methods',
              'Verify designs meet illuminance and uniformity requirements',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'The lumen method N = (E × A) / (Φ × UF × MF) is the engineer’s sanity-check before DIALux — if the hand calc is miles off, the model is wrong.',
              'Room index K = LW / [Hm(L + W)] picks the UF column. Hm is mounting height above the working plane, not floor to ceiling.',
              'Maintenance factor MF = LLD × LDD × RSDD. A typical clean office is 0.8; a dusty industrial space drops to 0.6.',
              'Photometric files (IES / LDT / EULUMDAT) drive point-by-point calcs in DIALux/Relux. Garbage in (wrong file, wrong reflectances) = garbage out.',
              'You quote N rounded up, then verify uniformity and Em on the actual luminaire grid — never trust the formula alone.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 510.3"
            clause="Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions."
            meaning={
              <>
                Reg 510.3 makes the lighting calc more than a CIBSE exercise. The luminaire you
                drop into the lumen-method N must also satisfy the BS 7671 selection rules — IP
                rating for the location, terminal capacity for your CPC, ambient temperature
                rating, manufacturer mounting instructions. The DIALux output and the BS 7671
                schedule are two halves of the same submission.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 510.3."
          />

          <SectionRule />

          <ConceptBlock title="The Lumen Method Formula">
            <p>
              The lumen method is a simplified calculation to determine the number of luminaires
              required to achieve a target average illuminance in a rectangular room. It provides
              quick estimates for feasibility studies and verification of detailed designs.
            </p>
            <p>
              <strong>The lumen method formula:</strong> N = (E × A) / (Φ × UF × MF).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>N</strong> = number of luminaires required
              </li>
              <li>
                <strong>E</strong> = target maintained illuminance (lux)
              </li>
              <li>
                <strong>A</strong> = room area (m²)
              </li>
              <li>
                <strong>Φ</strong> = lamp lumens per luminaire (lm)
              </li>
              <li>
                <strong>UF</strong> = utilisation factor (0-1)
              </li>
              <li>
                <strong>MF</strong> = maintenance factor (0-1)
              </li>
            </ul>
            <p>
              <strong>Step-by-step calculation process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> determine target illuminance (E) from CIBSE SLL
              </li>
              <li>
                <strong>Step 2:</strong> calculate room area (A = L × W)
              </li>
              <li>
                <strong>Step 3:</strong> select luminaire and note lumen output (Φ)
              </li>
              <li>
                <strong>Step 4:</strong> calculate room index (K)
              </li>
              <li>
                <strong>Step 5:</strong> read UF from manufacturer's table
              </li>
              <li>
                <strong>Step 6:</strong> determine MF for environment and maintenance
              </li>
              <li>
                <strong>Step 7:</strong> calculate N and round up to whole number
              </li>
            </ul>
            <p>
              <strong>Remember:</strong> The lumen method gives average illuminance only. Use
              software to verify uniformity and UGR compliance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Room Index and Mounting Height">
            <p>
              The room index (K) characterises the room's proportions relative to the mounting
              height. It determines how efficiently light reaches the working plane versus being
              absorbed by walls.
            </p>
            <p>
              <strong>Room index formula:</strong> K = (L × W) / (H<sub>m</sub> × (L + W)) — where
              L = room length, W = room width, H<sub>m</sub> = mounting height above working plane.
            </p>
            <p>
              <strong>Mounting height calculation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                H<sub>m</sub> = ceiling height − working plane height
              </li>
              <li>Office desk: working plane = 0.85m</li>
              <li>Industrial bench: working plane = 0.9m</li>
              <li>Floor level tasks: working plane = 0m</li>
            </ul>
            <p>
              <strong>Room index ranges:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>K &lt; 1: small or tall narrow room</li>
              <li>K = 1-2: typical office/classroom</li>
              <li>K = 2-3: large open plan office</li>
              <li>K &gt; 3: very large space (warehouse)</li>
            </ul>
            <p>
              <strong>Room index examples (room / dimensions L×W×Hm / room index K):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Small office — 6m × 4m × 2m — K = 24/(2×10) = 1.2</li>
              <li>Classroom — 9m × 7m × 2.2m — K = 63/(2.2×16) = 1.8</li>
              <li>Open plan office — 20m × 15m × 2m — K = 300/(2×35) = 4.3</li>
              <li>Warehouse — 40m × 25m × 8m — K = 1000/(8×65) = 1.9</li>
            </ul>
            <p>
              <strong>Design insight:</strong> Higher K means better utilisation factor. Large
              rooms are more efficient because proportionally less light is lost to walls.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Utilisation Factors and Reflectances">
            <p>
              The utilisation factor (UF) represents the proportion of lamp lumens that reach the
              working plane. It accounts for light absorbed by room surfaces and lost through the
              luminaire optics. UF values are obtained from manufacturer's tables.
            </p>
            <p>
              <strong>Factors affecting UF:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Room index (K):</strong> higher K = higher UF
              </li>
              <li>
                <strong>Surface reflectances:</strong> lighter surfaces = higher UF
              </li>
              <li>
                <strong>Luminaire type:</strong> light distribution affects efficiency
              </li>
              <li>
                <strong>Mounting:</strong> recessed vs suspended vs surface
              </li>
            </ul>
            <p>
              <strong>Standard surface reflectances (surface / standard / light colours / dark colours):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ceiling — 0.7 (70%) — 0.8-0.9 — 0.3-0.5</li>
              <li>Walls — 0.5 (50%) — 0.6-0.7 — 0.2-0.3</li>
              <li>Floor — 0.2 (20%) — 0.3-0.4 — 0.1</li>
            </ul>
            <p>
              <strong>Example UF table — recessed LED panel, ceiling 0.7 / floor 0.2 (K / walls 0.5 / walls 0.3 / walls 0.1):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0.75 — 0.41 — 0.37 — 0.33</li>
              <li>1.0 — 0.48 — 0.43 — 0.39</li>
              <li>1.5 — 0.56 — 0.51 — 0.46</li>
              <li>2.0 — 0.61 — 0.56 — 0.51</li>
              <li>3.0 — 0.68 — 0.63 — 0.57</li>
              <li>5.0 — 0.74 — 0.69 — 0.63</li>
            </ul>
            <p>
              <strong>Interpolation:</strong> For K values between table entries, interpolate
              linearly. For example, K = 1.25 gives UF approximately midway between K = 1.0 and K
              = 1.5 values.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Maintenance Factor and Software Tools">
            <p>
              The maintenance factor accounts for the gradual reduction in light output over time
              due to lamp depreciation and dirt accumulation. Modern software tools like DIALux
              and Relux provide detailed point-by-point calculations that go beyond the simple
              lumen method.
            </p>
            <p>
              <strong>Maintenance factor components:</strong> MF = LLD × LDD × RSDD.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>LLD</strong> = Lamp Lumen Depreciation (LED typically 0.9 at L70)
              </li>
              <li>
                <strong>LDD</strong> = Luminaire Dirt Depreciation (0.8-0.95 depending on IP
                rating)
              </li>
              <li>
                <strong>RSDD</strong> = Room Surface Dirt Depreciation (0.9-0.95 for clean rooms)
              </li>
            </ul>
            <p>
              <strong>Typical maintenance factors (environment / LED MF / fluorescent MF):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Clean office (3 year) — 0.80 — 0.70</li>
              <li>Normal industrial (2 year) — 0.70 — 0.60</li>
              <li>Dirty industrial (1 year) — 0.65 — 0.55</li>
              <li>IP65 sealed (5 year) — 0.85 — 0.75</li>
            </ul>
            <p>
              <strong>DIALux/Relux features:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Point-by-point illuminance calculation</li>
              <li>Uniformity verification (Uo, Ud)</li>
              <li>UGR calculation from observer positions</li>
              <li>3D rendering and visualisation</li>
              <li>Automatic luminaire scheduling</li>
            </ul>
            <p>
              <strong>Photometric file formats:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>IES:</strong> Illuminating Engineering Society (US)
              </li>
              <li>
                <strong>LDT/EULUMDAT:</strong> European format
              </li>
              <li>
                <strong>ULD:</strong> universal luminaire data
              </li>
              <li>Contains intensity distribution data</li>
              <li>Available from manufacturer websites</li>
            </ul>
            <p>
              <strong>Professional practice:</strong> Use lumen method for initial estimates, then
              verify with DIALux/Relux for detailed design. Always document assumptions for MF and
              UF in design reports.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — office lumen method calculation:</strong> Calculate luminaires
              for a 15m × 10m office, 2.8m ceiling, using 600×600 LED panels (3600 lumens each).
              Target 500 lux maintained.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> room area A = 15 × 10 = 150m²
              </li>
              <li>
                <strong>Step 2:</strong> mounting height Hm = 2.8 − 0.85 = 1.95m (≈ 2m)
              </li>
              <li>
                <strong>Step 3:</strong> room index K = (15 × 10) / (2 × (15 + 10)) = 150 / 50 ={' '}
                <strong>3.0</strong>
              </li>
              <li>
                <strong>Step 4:</strong> from UF table (K=3.0, reflectances 0.7/0.5/0.2): UF ={' '}
                <strong>0.68</strong>
              </li>
              <li>
                <strong>Step 5:</strong> clean office, 3-year maintenance: MF = <strong>0.8</strong>
              </li>
              <li>
                <strong>Step 6:</strong> N = (E × A) / (Φ × UF × MF)
              </li>
              <li>N = (500 × 150) / (3600 × 0.68 × 0.8)</li>
              <li>
                N = 75,000 / 1958.4 = <strong>38.3 → 39 luminaires</strong>
              </li>
              <li>Arrange as 6 × 7 = 42 or 5 × 8 = 40 for regular spacing</li>
            </ul>
            <p>
              <strong>Example 2 — verifying spacing:</strong> Check if 40 luminaires (5 × 8 grid)
              gives acceptable spacing for the above room.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Room dimensions: 15m × 10m</li>
              <li>Luminaire grid: 5 across (15m) × 8 along (10m)</li>
              <li>
                Spacing across: 15m / 5 = <strong>3.0m</strong>
              </li>
              <li>
                Spacing along: 10m / 8 = <strong>1.25m</strong>
              </li>
              <li>
                SHR (across) = 3.0 / 2.0 = <strong>1.5</strong>
              </li>
              <li>
                SHR (along) = 1.25 / 2.0 = <strong>0.625</strong>
              </li>
              <li>Spacing uneven — consider 6 × 7 = 42 grid instead</li>
              <li>Alternative 6 × 7 grid: spacing 2.5m × 1.43m gives SHR 1.25 × 0.71</li>
              <li>More uniform appearance</li>
            </ul>
            <p>
              <strong>Example 3 — warehouse calculation:</strong> warehouse 30m × 20m × 8m
              mounting height. Target 200 lux. LED highbays at 24,000 lumens each. Determine
              quantity.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Area A = 30 × 20 = 600m²</li>
              <li>Room index K = (30 × 20) / (8 × (30 + 20))</li>
              <li>
                K = 600 / 400 = <strong>1.5</strong>
              </li>
              <li>
                UF from table (industrial luminaire, K=1.5): UF = <strong>0.55</strong>
              </li>
              <li>
                Industrial environment MF = <strong>0.7</strong>
              </li>
              <li>N = (200 × 600) / (24,000 × 0.55 × 0.7)</li>
              <li>
                N = 120,000 / 9240 = <strong>13 luminaires</strong>
              </li>
              <li>Arrange as 3 × 5 = 15 or 4 × 4 = 16 for even spacing</li>
              <li>Spacing at 15: 10m × 4m (SHR = 1.25 × 0.5)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Lumen method summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>N = E×A / (Φ×UF×MF)</strong> — memorise this formula
              </li>
              <li>
                <strong>K = LW / Hm(L+W)</strong> — room index formula
              </li>
              <li>Standard reflectances: C 0.7 / W 0.5 / F 0.2</li>
              <li>Typical MF: 0.8 (clean office), 0.7 (industrial)</li>
              <li>Always round N up to whole number</li>
            </ul>
            <p>
              <strong>Software workflow:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Create room geometry (import from CAD or draw)</li>
              <li>Define surface reflectances and working plane</li>
              <li>Import luminaire photometric file (IES/LDT)</li>
              <li>Set calculation grid points and observer positions</li>
              <li>Run calculation and check results against criteria</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Wrong Hm</strong> — remember to subtract working plane from ceiling
                  height
                </li>
                <li>
                  <strong>Initial vs maintained</strong> — UF tables give maintained values when
                  MF applied
                </li>
                <li>
                  <strong>Ignoring spacing</strong> — check SHR for uniformity, not just quantity
                </li>
                <li>
                  <strong>Wrong reflectances</strong> — dark rooms need lower UF values
                </li>
              </ul>
            }
            doInstead="Calculate Hm by subtracting the working plane height from the ceiling, treat the lumen-method N as maintained-illuminance compliant only if MF is included, sense-check the grid against the SHR, and pick UF table columns for the actual room reflectances."
          />

          <SectionRule />

          <Scenario
            title="Sense-checking a DIALux model on a 12 × 8 m teaching room"
            situation={
              <>
                Subcontractor sends a DIALux model claiming 9 luminaires deliver 300 lx maintained
                in a 12 m × 8 m classroom (Hm = 2.4 m). Each luminaire 4,200 lm, MF assumed 0.8.
                You’re the building services engineer signing the lighting design — does the figure
                stack up before you spend two hours interrogating the model?
              </>
            }
            whatToDo={
              <>
                Run the lumen-method back-check. K = (12 × 8) / [2.4 × (12 + 8)] = 96 / 48 = 2.0.
                Reflectances 0.7/0.5/0.2 give a UF of around 0.6 for a typical recessed modular.
                N = (E × A) / (Φ × UF × MF) = (300 × 96) / (4,200 × 0.6 × 0.8) = 28,800 / 2,016 ≈
                14.3 → 15 luminaires. The model’s 9 is off by a third — either UF or MF is wrong,
                or they’ve lifted point-by-point peaks and quoted them as maintained average. Send
                it back with the K, UF and MF you used, and ask for a 6 × 4 grid (24 luminaires
                wouldn’t be wrong either — round to a sensible matrix that gives Uo ≥ 0.7).
              </>
            }
            whyItMatters={
              <>
                If you sign that lighting schedule and the room reads at 200 lx on commissioning,
                it’s your stamp on the EIC and your reputation with the client. The lumen-method
                hand calc is a 30-second guard rail.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'N = (E × A) / (Φ × UF × MF) — every variable carries an assumption you must record on the schedule.',
              'Room index K = LW / [Hm(L + W)] uses mounting height above the working plane (typically 0.85 m).',
              'UF table columns = ceiling/wall/floor reflectance triplet (e.g. 0.7/0.5/0.2). Verify against the actual finishes.',
              'MF = LLD × LDD × RSDD. Default 0.8 for clean offices, 0.7 for general areas, 0.6 for dirty industrial.',
              'Photometric files (IES, LDT, EULUMDAT) drive point-by-point calcs. The wrong file invalidates the model.',
              'DIALux / Relux gives Em, Uo and UGR per zone — the lumen method is the sanity check, not the deliverable.',
              'Spacing-to-height ratio (SHR) sets the grid: 1.0–1.5 for most office luminaires; verify Uo ≥ 0.7 in the task area.',
              'The luminaire you specify must also satisfy BS 7671 Reg 510.3 — manufacturer instructions, IP, terminations, ambient.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lighting design criteria
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Emergency lighting design
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section4_2;
