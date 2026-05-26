/**
 * Module 7 · Section 3 · Subsection 3 — Point-by-Point Method
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Inverse square law, cosine corrections, point calculations, and computer-aided lighting design
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

const TITLE = 'Point-by-Point Method - HNC Module 7 Section 3.3';
const DESCRIPTION =
  'Master point-by-point illuminance calculations: inverse square law, cosine corrections, point calculations, computer-aided design tools, isolux diagrams, and lighting design verification.';

const quickCheckQuestions = [
  {
    id: 'inverse-square-law',
    question:
      'According to the inverse square law, if you double the distance from a light source, the illuminance becomes:',
    options: [
      'One quarter of the original value',
      'RF interference and spectrum management',
      'Electricity at Work Regulations 1989',
      'Continuing Professional Development',
    ],
    correctIndex: 0,
    explanation:
      'The inverse square law states that illuminance is inversely proportional to the square of the distance (E = I/d²). Doubling the distance means d² becomes 4 times larger, so illuminance becomes 1/4 of the original value.',
  },
  {
    id: 'cosine-correction',
    question: 'When does cosine correction become essential in point illuminance calculations?',
    options: [
      'Signs of damage, deterioration, overheating, or unsafe conditions',
      'When the light ray strikes the surface at an angle other than perpendicular',
      'Industry developments and new technology requirements',
      'Record results and confirm whether that section is sound',
    ],
    correctIndex: 1,
    explanation:
      'Cosine correction accounts for light striking a surface at an angle. When light hits at an angle θ from perpendicular, the effective illuminance is reduced by cos³θ due to both the spreading of light and the increased distance.',
  },
  {
    id: 'dialux-purpose',
    question:
      'What is the primary advantage of using software like DIALux over manual calculations?',
    options: [
      'Every time they are required to operate a type of MEWP they have not used before',
      'It can handle complex geometries, reflections, and multiple luminaires simultaneously',
      'Equipment shall be of sufficient strength and capability for its purpose',
      'Maintain contact with the ladder using two hands and one foot, or two feet and one hand, at all times',
    ],
    correctIndex: 1,
    explanation:
      'Software like DIALux can model complex room geometries, account for inter-reflections between surfaces, handle multiple luminaires, and produce detailed isolux diagrams - calculations that would be impractical to perform manually.',
  },
  {
    id: 'isolux-diagram',
    question: 'An isolux diagram displays:',
    options: [
      'Cable routes for lighting circuits',
      'The spectral output of light sources',
      'Luminaire positions on a floor plan',
      'Contour lines connecting points of equal illuminance',
    ],
    correctIndex: 3,
    explanation:
      'An isolux diagram shows contour lines (similar to topographical maps) where each line connects points of equal illuminance. This visualisation helps identify uniformity, dark spots, and over-lit areas in a lighting design.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A luminaire with intensity of 2000 cd is mounted 3 metres directly above a point. What is the illuminance at that point?',
    options: [
      '667 lux',
      '222 lux',
      '6000 lux',
      '111 lux',
    ],
    correctAnswer: 1,
    explanation:
      'Using E = I/d², where I = 2000 cd and d = 3 m: E = 2000/3² = 2000/9 = 222 lux. This is a direct application of the inverse square law for a point directly below the luminaire.',
  },
  {
    id: 2,
    question:
      'For a point not directly below a luminaire, the correct formula including cosine correction is:',
    options: [
      'E = I / (d × cosθ)',
      'E = I × cosθ / d²',
      'E = I × cos³θ / h²',
      'E = I × sinθ / h²',
    ],
    correctAnswer: 2,
    explanation:
      'The complete point-by-point formula is E = I × cos³θ / h², where θ is the angle from nadir, h is the mounting height, and the cos³θ term accounts for both the cosine law and the increased distance at an angle.',
  },
  {
    id: 3,
    question:
      'A luminaire (I = 1500 cd) is mounted at 4m height. Calculate the illuminance at a horizontal point 3m away from directly below.',
    options: [
      '61.4 lux',
      '93.75 lux',
      '75 lux',
      '48 lux',
    ],
    correctAnswer: 3,
    explanation:
      'Using E = I × cos³θ / h²: First find d = √(4² + 3²) = 5m, cosθ = h/d = 4/5 = 0.8, cos³θ = 0.512. Then E = 1500 × 0.512 / 16 = 768/16 = 48 lux.',
  },
  {
    id: 4,
    question: 'What is the main limitation of manual point-by-point calculations?',
    options: [
      'They do not account for inter-reflected light from room surfaces',
      'The source can be treated as a point source relative to the distance',
      'The spacing and resolution of illuminance calculations across a surface',
      'For task areas, emergency lighting verification, or complex room geometries',
    ],
    correctAnswer: 0,
    explanation:
      'Manual point-by-point calculations typically only consider direct light from luminaires. They do not easily account for light reflected from walls, ceilings, and floors, which can significantly contribute to total illuminance, especially in rooms with light-coloured surfaces.',
  },
  {
    id: 5,
    question: 'In DIALux software, the calculation grid determines:',
    options: [
      'For task areas, emergency lighting verification, or complex room geometries',
      'The spacing and resolution of illuminance calculations across a surface',
      'They do not account for inter-reflected light from room surfaces',
      'The source can be treated as a point source relative to the distance',
    ],
    correctAnswer: 1,
    explanation:
      'The calculation grid in DIALux defines the points at which illuminance values are computed. A finer grid provides more detailed results but requires more computation time. Grid spacing affects the accuracy of uniformity calculations and isolux diagram resolution.',
  },
  {
    id: 6,
    question:
      'When verifying a lighting design, what uniformity ratio is typically required for office general lighting to BS EN 12464-1?',
    options: [
      'U₀ ≥ 0.3',
      'U₀ ≥ 0.4',
      'U₀ ≥ 0.6',
      'U₀ ≥ 0.8',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 12464-1 requires a minimum uniformity ratio (U₀ = Emin/Eav) of 0.6 for general office lighting. This ensures that the darkest areas receive at least 60% of the average illuminance, preventing excessive contrast.',
  },
  {
    id: 7,
    question: 'The inverse square law applies most accurately when:',
    options: [
      'They do not account for inter-reflected light from room surfaces',
      'For task areas, emergency lighting verification, or complex room geometries',
      'The spacing and resolution of illuminance calculations across a surface',
      'The source can be treated as a point source relative to the distance',
    ],
    correctAnswer: 3,
    explanation:
      'The inverse square law assumes a point source. It applies accurately when the distance to the calculation point is at least five times the maximum dimension of the luminous area of the luminaire. Very close distances or large luminaires require different calculation methods.',
  },
  {
    id: 8,
    question: 'Relux and DIALux both use which fundamental method to calculate illuminance?',
    options: [
      'Radiosity and ray tracing algorithms',
      'When insulation resistance is low',
      'Above 50 V AC up to 1000 V AC',
      'To maintain battery charge',
    ],
    correctAnswer: 0,
    explanation:
      'Modern lighting design software uses radiosity (for diffuse inter-reflections) and ray tracing (for specular reflections and complex geometries) algorithms. These mathematically model how light bounces between surfaces, providing accurate results for complex spaces.',
  },
  {
    id: 9,
    question: 'When calculating illuminance on a vertical surface, which formula applies?',
    options: [
      'Building thermal decay rate',
      'E = I × cos²θ × sinθ / h²',
      'After second fix completion',
      'BS 5266-1 and BS EN 50172',
    ],
    correctAnswer: 1,
    explanation:
      'For vertical surfaces, the formula is E = I × cos²θ × sinθ / h², where θ is measured from the vertical axis through the luminaire. The sinθ term accounts for the angle of incidence on the vertical plane.',
  },
  {
    id: 10,
    question: 'In an isolux diagram, closely spaced contour lines indicate:',
    options: [
      'Their employer or, for health and safety matters, the HSE',
      'The rate of change of magnetic flux linkage',
      'A rapid change in illuminance (steep gradient)',
      'Completing detailed M&E specifications',
    ],
    correctAnswer: 2,
    explanation:
      'Like topographical maps, closely spaced isolux contours indicate a steep gradient - illuminance is changing rapidly over a short distance. This might indicate the edge of a spotlight beam or the boundary between lit and unlit areas.',
  },
  {
    id: 11,
    question:
      'What maintenance factor should typically be applied to lighting calculations for a clean office environment?',
    options: [
      '0.5',
      '0.6',
      '1.0',
      '0.8',
    ],
    correctAnswer: 3,
    explanation:
      'For clean office environments with regular maintenance, a maintenance factor of 0.8 is typical. This accounts for lamp lumen depreciation, luminaire dirt depreciation, and room surface depreciation over the maintenance period.',
  },
  {
    id: 12,
    question: 'When should point-by-point calculations be used instead of the lumen method?',
    options: [
      'For task areas, emergency lighting verification, or complex room geometries',
      'The source can be treated as a point source relative to the distance',
      'The spacing and resolution of illuminance calculations across a surface',
      'They do not account for inter-reflected light from room surfaces',
    ],
    correctAnswer: 0,
    explanation:
      "Point-by-point calculations are essential when specific illuminance values at particular locations matter - task areas, emergency escape routes, outdoor floodlighting, or rooms with irregular shapes where the lumen method's assumptions break down.",
  },
];

const faqs = [
  {
    question: 'When should I use point-by-point calculations instead of the lumen method?',
    answer:
      'Use point-by-point calculations when you need to know illuminance at specific locations rather than average room illuminance. This includes task lighting verification, emergency lighting compliance (where minimum 1 lux on escape routes is mandatory), outdoor and floodlighting design, display lighting, and any situation where illuminance uniformity is critical. The lumen method gives average values; point-by-point gives precise localised values.',
  },
  {
    question: 'How accurate are DIALux and Relux calculations?',
    answer:
      'When properly configured with accurate luminaire photometric data (IES or EULUMDAT files) and realistic surface reflectances, software calculations typically achieve ±10-15% accuracy compared to measured values. Discrepancies usually arise from incorrect input data, furniture and obstructions not modelled, or differences between catalogue and actual luminaire performance. Always verify critical designs with on-site measurements.',
  },
  {
    question: 'What is the five-times rule for point source calculations?',
    answer:
      "The inverse square law assumes a point source. The 'five-times rule' states that this approximation is valid when the distance from luminaire to calculation point is at least five times the maximum dimension of the luminous area. For a 600mm × 600mm LED panel, use point calculations only for distances greater than 3 metres. Closer distances require area source calculations.",
  },
  {
    question: 'How do I account for reflected light in manual calculations?',
    answer:
      'Manual point-by-point calculations typically ignore inter-reflected light for simplicity. To approximate the contribution, you can add a reflection factor based on room reflectances - typically 10-20% of direct illuminance in rooms with average reflectances. However, for accurate results including reflections, lighting design software is essential as it performs iterative radiosity calculations.',
  },
  {
    question: 'What grid spacing should I use for illuminance calculations?',
    answer:
      'BS EN 12464-1 Annex A provides guidance: grid spacing should not exceed 0.2 × 5log₁₀(d), where d is the longer room dimension. For a typical 10m office, this gives approximately 1m spacing. Finer grids (0.5m) are needed for detailed uniformity analysis or where task areas need verification. Very fine grids (0.25m) may be needed for emergency lighting compliance checks.',
  },
];

const HNCModule7Section3_3 = () => {
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
            eyebrow="Module 7 · Section 3 · Subsection 3"
            title="Point-by-Point Method"
            description="Inverse square law, cosine corrections, point calculations, and computer-aided lighting design"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply the inverse square law to calculate direct illuminance",
              "Use cosine correction formulae for angled light incidence",
              "Calculate illuminance on horizontal and vertical surfaces",
              "Navigate DIALux and Relux software for lighting design",
              "Interpret isolux diagrams and uniformity calculations",
              "Verify lighting designs against BS EN 12464-1 requirements",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="The Inverse Square Law">
            <p>The inverse square law is the fundamental principle governing how illuminance decreases with distance from a light source. Understanding this relationship is essential for all point illuminance calculations and forms the basis of lighting design.</p>
            <p><strong>Basic Inverse Square Law Formula</strong></p>
            <p>E = I / d²</p>
            <p><strong>Where:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>E = illuminance at the point (lux)</li>
              <li>I = luminous intensity in the direction of the point (candelas)</li>
              <li>d = distance from source to point (metres)</li>
            </ul>
            <p><strong>Key principles:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Point source assumption:</strong> Valid when distance &gt; 5× luminaire dimension</li>
              <li><strong>Direct component only:</strong> Does not include reflected light</li>
              <li><strong>Perpendicular incidence:</strong> Applies when light strikes surface at 90°</li>
              <li><strong>Intensity direction:</strong> Must use intensity in the specific direction toward the point</li>
            </ul>
            <p><strong>Illuminance vs Distance Relationship</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1:</strong> 1 — 1000 lux — Reference</li>
              <li><strong>2:</strong> 4 — 250 lux — 1/4 (25%)</li>
              <li><strong>3:</strong> 9 — 111 lux — 1/9 (11%)</li>
              <li><strong>4:</strong> 16 — 62.5 lux — 1/16 (6.25%)</li>
              <li><strong>5:</strong> 25 — 40 lux — 1/25 (4%)</li>
            </ul>
            <p><strong>Critical insight:</strong> Illuminance drops rapidly with distance - doubling the mounting height reduces illuminance to one quarter. This has significant implications for luminaire spacing and task lighting design.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Cosine Correction for Angled Incidence">
            <p>When light strikes a surface at an angle other than perpendicular, the illuminance is reduced. The cosine correction accounts for both the spreading of light over a larger area and the increased distance the light must travel.</p>
            <p><strong>Horizontal Surface Formula</strong></p>
            <p>E = I × cos³θ / h²</p>
            <p><strong>Where:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>θ = angle from nadir (vertical axis)</li>
              <li>h = mounting height above surface</li>
              <li>cos³θ = cosine cubed correction factor</li>
            </ul>
            <p><strong>Vertical Surface Formula</strong></p>
            <p>E = I × cos²θ × sinθ / h²</p>
            <p><strong>Where:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>θ = angle from vertical through luminaire</li>
              <li>sinθ = accounts for vertical plane orientation</li>
              <li>Used for wall illuminance calculations</li>
            </ul>
            <p><strong>Understanding the cos³θ Term</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0° (directly below):</strong> 1.000 — 1.000 — Full illuminance</li>
              <li><strong>30°:</strong> 0.866 — 0.650 — 65% of maximum</li>
              <li><strong>45°:</strong> 0.707 — 0.354 — 35% of maximum</li>
              <li><strong>60°:</strong> 0.500 — 0.125 — 12.5% of maximum</li>
              <li><strong>75°:</strong> 0.259 — 0.017 — 1.7% of maximum</li>
            </ul>
            <p><strong>Worked Calculation Example</strong></p>
            <p>Given: Luminaire at 4m height, I = 1500 cd</p>
            <p>Find: Illuminance 3m horizontally from directly below</p>
            <p>Step 1: Find the angle θ</p>
            <p>tan θ = horizontal distance / height = 3/4</p>
            <p>θ = arctan(0.75) = 36.87°</p>
            <p>Step 2: Calculate cos³θ</p>
            <p>cosθ = 4/5 = 0.8 (or cos 36.87°)</p>
            <p>cos³θ = 0.8³ = 0.512</p>
            <p>Step 3: Apply the formula</p>
            <p>E = I × cos³θ / h²</p>
            <p>E = 1500 × 0.512 / 16</p>
            <p>E = 48 lux</p>
            <p><strong>Practical tip:</strong> For quick estimates, remember that at 45° the illuminance is roughly one-third of directly below, and at 60° it drops to about one-eighth.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Computer-Aided Lighting Design">
            <p>Modern lighting design relies heavily on specialist software that can perform thousands of point calculations, model inter-reflections, and generate comprehensive documentation. DIALux and Relux are the industry-standard tools available free of charge.</p>
            <p><strong>DIALux</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Free professional lighting software</li>
              <li>Supports IES and EULUMDAT photometry</li>
              <li>Interior, exterior, and road lighting</li>
              <li>Extensive manufacturer luminaire catalogues</li>
              <li>Emergency lighting calculations</li>
              <li>Daylight integration modelling</li>
            </ul>
            <p><strong>Relux</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Alternative professional platform</li>
              <li>Strong 3D visualisation capabilities</li>
              <li>Sensor and control system simulation</li>
              <li>Energy consumption analysis</li>
              <li>BIM integration support</li>
              <li>Cloud-based collaboration features</li>
            </ul>
            <p><strong>Software Calculation Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Point-by-point:</strong> Direct component from each luminaire summed — Base calculation for all points</li>
              <li><strong>Radiosity:</strong> Iterative calculation of diffuse inter-reflections — Interior spaces with reflective surfaces</li>
              <li><strong>Ray tracing:</strong> Follows individual light paths for specular reflection — Spaces with mirrors, glazing, polished surfaces</li>
              <li><strong>Monte Carlo:</strong> Statistical sampling of light paths — Complex geometries, daylight modelling</li>
            </ul>
            <p><strong>Essential Input Data for Software</strong></p>
            <p>Room Parameters</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Accurate room geometry (dimensions)</li>
              <li>Surface reflectances (ceiling, walls, floor)</li>
              <li>Workplane height (typically 0.85m)</li>
              <li>Maintenance factor</li>
            </ul>
            <p>Luminaire Data</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Photometric file (IES/LDT)</li>
              <li>Lamp/LED lumen output</li>
              <li>Luminaire efficiency (LOR)</li>
              <li>Mounting positions and orientations</li>
            </ul>
            <p><strong>Best practice:</strong> Always use manufacturer-supplied photometric files rather than generic data. Verify luminaire performance claims against independent test certificates where available.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Isolux Diagrams and Design Verification">
            <p>Isolux diagrams provide visual representation of illuminance distribution across a surface. Combined with uniformity calculations and compliance checks, they form the basis for verifying that a lighting design meets specification requirements.</p>
            <p><strong>Understanding Isolux Diagrams</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Contour lines:</strong> Connect points of equal illuminance (like altitude contours on maps)</li>
              <li><strong>Close spacing:</strong> Indicates rapid change in illuminance (steep gradient)</li>
              <li><strong>Wide spacing:</strong> Indicates gradual, uniform illuminance distribution</li>
              <li><strong>Closed loops:</strong> Show peaks (high values inside) or troughs (low values inside)</li>
              <li><strong>Colour coding:</strong> Typically red/orange for high values, blue/purple for low</li>
            </ul>
            <p><strong>Uniformity Ratios to BS EN 12464-1</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>U₀ (uniformity):</strong> E<sub>min</sub> / E<sub>average</sub> — ≥ 0.6 for task areas, ≥ 0.4 for surroundings</li>
              <li><strong>U<sub>d</sub> (diversity):</strong> E<sub>min</sub> / E<sub>max</sub> — Used for specific applications (sports lighting)</li>
              <li><strong>E<sub>average</sub>:</strong> Mean illuminance across calculation area — Must meet maintained illuminance requirement</li>
              <li><strong>E<sub>min</sub>:</strong> Minimum point illuminance — Critical for emergency lighting (≥ 1 lux)</li>
            </ul>
            <p><strong>Design Verification Checklist</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>E<sub>average</sub> meets maintained illuminance</li>
              <li>Uniformity U₀ ≥ specified value</li>
              <li>No dark spots below minimum threshold</li>
              <li>Glare rating (UGR) within limits</li>
              <li>Emergency lighting compliance verified</li>
              <li>Energy efficiency targets met (W/m²/100 lux)</li>
            </ul>
            <p><strong>Common Design Issues Identified</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Excessive spacing causing dark bands</li>
              <li>Perimeter areas below minimum</li>
              <li>Over-lighting in circulation areas</li>
              <li>Task area not meeting requirements</li>
              <li>Poor wall illuminance affecting room appearance</li>
              <li>Luminaire orientation causing asymmetric patterns</li>
            </ul>
            <p><strong>Grid Spacing Requirements (BS EN 12464-1 Annex A)</strong></p>
            <p>Maximum grid cell size for accurate uniformity calculations:</p>
            <p>p = 0.2 × 5</p>
            <p>Where d is the longer room dimension in metres.</p>
            <p>Example grid sizes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>5m room: p ≤ 0.5m grid spacing</li>
              <li>10m room: p ≤ 1.0m grid spacing</li>
              <li>20m room: p ≤ 2.0m grid spacing</li>
              <li>50m room: p ≤ 4.2m grid spacing</li>
            </ul>
            <p><strong>Commissioning requirement:</strong> Calculated values should be verified by on-site measurements at representative points. A ±20% variance from calculated values is generally acceptable, accounting for construction tolerances and actual surface reflectances.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Multiple Luminaire Contribution</strong>
            </p>
            <p><strong>Scenario:</strong> Two identical luminaires (I = 1200 cd at nadir) mounted at 3m height, 4m apart. Calculate illuminance at the midpoint.</p>
            <p>The midpoint is 2m from each luminaire horizontally</p>
            <p>For each luminaire:</p>
            <p>tan θ = 2/3, θ = 33.69°</p>
            <p>cos θ = 0.832, cos³θ = 0.576</p>
            <p>E₁ = 1200 × 0.576 / 9 = 76.8 lux</p>
            <p>Total illuminance (both luminaires):</p>
            <p>E<sub>total</sub> = E₁ + E₂ = 76.8 + 76.8</p>
            <p>E<sub>total</sub> = 153.6 lux</p>
            <p>Note: Point-by-point method sums contributions from all luminaires</p>
            <p>
              <strong>Example 2: Vertical Surface Illuminance</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate the illuminance on a wall 2m from directly below a luminaire (I = 800 cd, h = 2.5m).</p>
            <p>Using vertical surface formula: E = I × cos²θ × sinθ / h²</p>
            <p>Step 1: Find angle θ</p>
            <p>tan θ = horizontal / height = 2/2.5 = 0.8</p>
            <p>θ = 38.66°</p>
            <p>Step 2: Calculate trigonometric terms</p>
            <p>cos θ = 0.781, cos²θ = 0.610</p>
            <p>sin θ = 0.625</p>
            <p>Step 3: Apply formula</p>
            <p>E = 800 × 0.610 × 0.625 / 6.25</p>
            <p>E = 305 / 6.25</p>
            <p>E = 48.8 lux on the vertical wall surface</p>
            <p>
              <strong>Example 3: Emergency Lighting Verification</strong>
            </p>
            <p><strong>Scenario:</strong> Verify that an emergency luminaire (I = 150 cd) at 2.8m provides the required 1 lux minimum at 4m horizontal distance on an escape route.</p>
            <p>Emergency lighting requires minimum 1 lux on centre line of escape routes</p>
            <p>Calculate illuminance at 4m horizontal:</p>
            <p>tan θ = 4/2.8 = 1.429, θ = 55.0°</p>
            <p>cos θ = 0.574, cos³θ = 0.189</p>
            <p>E = 150 × 0.189 / 7.84</p>
            <p>E = 3.6 lux ✓ Exceeds 1 lux requirement</p>
            <p>Maximum spacing between luminaires:</p>
            <p>At 4m each direction = 8m total spacing</p>
            <p>Verify uniformity ratio ≥ 40:1 max/min also achieved</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Software Workflow Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Create accurate room geometry with correct dimensions</li>
              <li>Set appropriate surface reflectances (70/50/20 typical)</li>
              <li>Import manufacturer photometric data files</li>
              <li>Position luminaires according to layout drawings</li>
              <li>Define calculation areas (task area, surrounding area)</li>
              <li>Set appropriate grid spacing per BS EN 12464-1</li>
              <li>Apply correct maintenance factor</li>
              <li>Run calculations and verify against requirements</li>
            </ul>
            <p>
              <strong>Key Formulae Summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct below (perpendicular):</strong> E = I / h²</li>
              <li><strong>Horizontal surface (angled):</strong> E = I × cos³θ / h²</li>
              <li><strong>Vertical surface:</strong> E = I × cos²θ × sinθ / h²</li>
              <li><strong>Uniformity ratio:</strong> U₀ = E<sub>min</sub> / E<sub>average</sub></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using lumens instead of candelas</strong> - Point calculations require intensity (cd) not flux (lm)</li>
                <li><strong>Forgetting cos³θ term</strong> - Simple inverse square only applies directly below</li>
                <li><strong>Incorrect angle measurement</strong> - θ is from nadir (vertical), not from horizontal</li>
                <li><strong>Ignoring maintenance factor</strong> - Results show initial, not maintained values</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lumen method calculations
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Glare assessment
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section3_3;
