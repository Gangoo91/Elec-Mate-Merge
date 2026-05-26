/**
 * Module 7 · Section 3 · Subsection 4 — Glare Assessment
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Unified Glare Rating (UGR) calculation, glare sources, shielding angles, and compliance with UGR limits for visual comfort
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

const TITLE = 'Glare Assessment - HNC Module 7 Section 3.4';
const DESCRIPTION =
  'Master glare assessment for lighting installations: Unified Glare Rating (UGR) calculation, glare sources, shielding angles, UGR limits by application, and compliance strategies for visual comfort.';

const quickCheckQuestions = [
  {
    id: 'ugr-definition',
    question: 'What does UGR stand for in lighting design?',
    options: [
      'Universal Glare Ratio',
      'Unified Glare Rating',
      'Uniform Glare Resistance',
      'Unit Glare Reduction',
    ],
    correctIndex: 1,
    explanation:
      'UGR stands for Unified Glare Rating, a standardised metric defined in CIE 117 for evaluating discomfort glare from luminaires in indoor lighting installations.',
  },
  {
    id: 'ugr-office-limit',
    question: 'What is the maximum UGR limit for a typical office environment?',
    options: [
      'UGR ≤ 16',
      'UGR ≤ 28',
      'UGR ≤ 19',
      'UGR ≤ 22',
    ],
    correctIndex: 2,
    explanation:
      'Offices and computer workstations require UGR ≤ 19 to ensure visual comfort during prolonged tasks. This limit is specified in BS EN 12464-1 for general office work.',
  },
  {
    id: 'shielding-angle',
    question: 'What is the primary purpose of a luminaire shielding angle?',
    options: [
      'Through regular inspections, observations, and documented checks',
      'Outriggers or stabilisers must be fitted to extend the effective base',
      'To prevent direct view of the lamp from normal viewing angles',
      'To enable rapid rescue of workers in emergency situations',
    ],
    correctIndex: 2,
    explanation:
      'The shielding angle prevents direct view of high-luminance lamp surfaces from typical viewing positions. A higher shielding angle means the lamp is hidden at smaller angles from horizontal, reducing potential glare.',
  },
  {
    id: 'glare-types',
    question:
      "Which type of glare occurs when light reflects off shiny surfaces into the observer's eyes?",
    options: [
      'Reflected glare (veiling reflections)',
      'The intersection of fan and system curves',
      'Flammable liquids such as petrol and solvents',
      'To detect early signs of work-related ill health',
    ],
    correctIndex: 0,
    explanation:
      'Reflected glare (also called veiling reflections) occurs when light reflects off glossy surfaces such as screens, paper, or worktops. This can reduce contrast and visibility of the task.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'According to BS EN 12464-1, what UGR limit applies to detailed drawing offices?',
    options: [
      'UGR ≤ 13',
      'UGR ≤ 16',
      'UGR ≤ 19',
      'UGR ≤ 22',
    ],
    correctAnswer: 1,
    explanation:
      'Technical drawing offices require UGR ≤ 16 due to the precision visual tasks involved. This more stringent limit reduces discomfort during detailed work requiring high visual accuracy.',
  },
  {
    id: 2,
    question: "In the UGR formula, what does the term 'Lb' represent?",
    options: [
      'Reduced light output ratio (LOR) and efficiency',
      'Decreases UGR (better glare control)',
      'Background luminance of the room surfaces',
      'Behind the screen relative to the user',
    ],
    correctAnswer: 2,
    explanation:
      'Lb represents the background luminance - the average luminance of the room surfaces (walls, ceiling) excluding the luminaires. Higher background luminance reduces the contrast with luminaires, lowering perceived glare.',
  },
  {
    id: 3,
    question: 'What UGR limit is appropriate for a warehouse or corridor?',
    options: [
      'UGR ≤ 25',
      'UGR ≤ 16',
      'UGR ≤ 19',
      'UGR ≤ 28',
    ],
    correctAnswer: 3,
    explanation:
      'Corridors, warehouses, and circulation areas permit UGR ≤ 28 as these spaces involve less demanding visual tasks and shorter occupation times. The relaxed limit allows more economical luminaire selection.',
  },
  {
    id: 4,
    question:
      'Which factor in the UGR calculation accounts for luminaire position relative to the observer?',
    options: [
      'Position index (p)',
      'Luminaire luminous area (A)',
      'Background luminance (Lb)',
      'Luminaire luminance (L)',
    ],
    correctAnswer: 0,
    explanation:
      "The position index (p) accounts for the luminaire's position in the observer's field of view. Luminaires directly ahead contribute more to glare than those at the periphery, reflected in the Guth position index.",
  },
  {
    id: 5,
    question:
      'For a luminaire with high lamp luminance, what minimum shielding angle is typically recommended?',
    options: [
      '20°',
      '30°',
      '45°',
      '10°',
    ],
    correctAnswer: 1,
    explanation:
      'Luminaires with high lamp luminance (&gt;50,000 cd/m²) typically require shielding angles of 30° or greater. This prevents direct view of the lamp from normal working positions and reduces discomfort glare.',
  },
  {
    id: 6,
    question: 'What is the recommended UGR limit for a school classroom?',
    options: [
      'UGR ≤ 16',
      'UGR ≤ 22',
      'UGR ≤ 19',
      'UGR ≤ 25',
    ],
    correctAnswer: 2,
    explanation:
      'School classrooms require UGR ≤ 19 to support reading, writing, and viewing whiteboards/screens. This aligns with general office requirements for visual comfort during prolonged concentration.',
  },
  {
    id: 7,
    question:
      'When assessing reflected glare on VDU screens, what luminaire position is most critical?',
    options: [
      'Directly above the workstation',
      'At 45° either side of the screen',
      "In front of the screen in the user's direct view",
      'Behind the screen relative to the user',
    ],
    correctAnswer: 3,
    explanation:
      "Luminaires behind the screen (in front of the user) are most likely to create reflections on the screen surface. The reflection zone depends on screen tilt angle and luminaire positioning relative to the user's viewing direction.",
  },
  {
    id: 8,
    question: 'How does increasing room surface reflectance typically affect UGR?',
    options: [
      'Decreases UGR (better glare control)',
      'Has no effect on UGR',
      'Increases UGR (worse glare)',
      'Only affects direct glare, not UGR',
    ],
    correctAnswer: 0,
    explanation:
      'Higher room surface reflectance increases background luminance (Lb), reducing the contrast between luminaires and surroundings. This typically decreases UGR values, improving visual comfort.',
  },
  {
    id: 9,
    question: 'What does a UGR table typically provide for a specific luminaire?',
    options: [
      'Induction burn from proximity to high-frequency conductors',
      'UGR values for various room dimensions and reflectances',
      'Add capacitors to offset inductive effects',
      'The design meets BS 7671 and client requirements',
    ],
    correctAnswer: 1,
    explanation:
      'UGR tables provide glare ratings for a range of room dimensions (length, width, height ratios) and surface reflectances. This allows designers to determine UGR for specific installation conditions without complex calculations.',
  },
  {
    id: 10,
    question:
      'In controlling glare for VDU workstations, what luminaire luminance limit is recommended when viewed at 65° from vertical?',
    options: [
      '500 cd/m²',
      '1,500 cd/m²',
      '3,000 cd/m²',
      '5,000 cd/m²',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 12464-1 recommends limiting luminaire luminance to 3,000 cd/m² at 65° from vertical for areas with VDU use. This reduces the likelihood of screen reflections and direct glare from luminaires in the peripheral vision.',
  },
  {
    id: 11,
    question:
      'What type of glare temporarily reduces visual performance without necessarily causing discomfort?',
    options: [
      'Discomfort glare',
      'Contrast glare',
      'Reflected glare',
      'Disability glare',
    ],
    correctAnswer: 3,
    explanation:
      'Disability glare reduces visual performance by scattering light within the eye, reducing contrast sensitivity. It can occur without discomfort, such as when driving towards low sun. UGR primarily addresses discomfort glare.',
  },
  {
    id: 12,
    question: 'When using louvred luminaires for glare control, what is the primary trade-off?',
    options: [
      'Reduced light output ratio (LOR) and efficiency',
      'UGR values for various room dimensions and reflectances',
      'Behind the screen relative to the user',
      'Background luminance of the room surfaces',
    ],
    correctAnswer: 0,
    explanation:
      "Louvres and deep recessing reduce UGR effectively but absorb some light, reducing the luminaire's Light Output Ratio (LOR). This means more luminaires or higher wattage may be needed to achieve required illuminance levels.",
  },
];

const faqs = [
  {
    question: 'How do I use a UGR table from a luminaire datasheet?',
    answer:
      "UGR tables present values in a matrix format. The rows represent room dimensions (X × Y × H, where X is room length along the luminaire axis, Y is width, and H is mounting height above eye level). The columns show different surface reflectance combinations (ceiling/walls/floor). Find the row matching your room dimensions and the column matching your reflectances to read the UGR value. Compare this against your application's UGR limit.",
  },
  {
    question: 'Can I calculate exact UGR without specialist software?',
    answer:
      'The UGR formula requires summing contributions from all luminaires visible from the observer position, accounting for luminance, solid angle, and position index. While the formula can be calculated manually for simple layouts, practical assessments use lighting design software (DIALux, Relux) that computes UGR across a grid of observer positions and viewing directions automatically.',
  },
  {
    question: 'What if my calculated UGR slightly exceeds the limit?',
    answer:
      'Consider these modifications: (1) Select luminaires with lower UGR ratings (micro-prismatic diffusers, deeper louvres), (2) Increase room surface reflectances where practical, (3) Reposition luminaires away from critical viewing directions, (4) Increase mounting height to reduce solid angles, (5) Reduce luminaire luminance through dimming if illuminance permits. Even 1-2 UGR points can make the difference for compliance.',
  },
  {
    question: 'How does natural daylight affect glare assessment?',
    answer:
      'UGR calculations for artificial lighting assume specific background luminances. Daylight significantly increases background luminance, typically improving (reducing) perceived glare from luminaires. However, daylight itself can cause glare from windows. BS EN 17037 addresses daylight glare using DGP (Daylight Glare Probability). A comprehensive design considers both artificial and daylight glare sources.',
  },
  {
    question: 'Why do VDU environments have additional luminance limits beyond UGR?',
    answer:
      'UGR addresses discomfort glare from direct viewing of luminaires. VDU screens create additional concerns: luminaires reflected in screens can obscure displayed information (veiling reflections). The 3,000 cd/m² luminance limit at 65° targets the typical reflection zone for screens. This is separate from UGR compliance and both criteria must be met in VDU areas.',
  },
  {
    question: 'Is UGR affected by the number of luminaires?',
    answer:
      'Yes. Adding more luminaires increases the number of glare sources in the field of view, potentially increasing UGR. The formula sums contributions from all visible luminaires. However, if additional luminaires allow lower individual luminaire output while maintaining illuminance, the overall effect may be neutral. Lighting design must balance luminaire quantity, output, and positioning for optimal UGR.',
  },
];

const HNCModule7Section3_4 = () => {
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
            eyebrow="Module 7 · Section 3 · Subsection 4"
            title="Glare Assessment"
            description="Unified Glare Rating (UGR) calculation, glare sources, shielding angles, and compliance with UGR limits for visual comfort"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the UGR formula and its contributing factors",
              "Apply appropriate UGR limits for different applications",
              "Distinguish between direct, reflected, and disability glare",
              "Calculate and interpret shielding angles for luminaires",
              "Use UGR tables to assess glare for specific room conditions",
              "Implement strategies to reduce UGR in lighting designs",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Glare Fundamentals">
            <p>Glare is the visual discomfort or impairment caused by excessive luminance contrast in the field of view. In lighting design, understanding and controlling glare is essential for creating comfortable, productive visual environments that comply with workplace standards.</p>
            <p><strong>Types of Glare</strong></p>
            <p><strong>Discomfort Glare</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Causes visual discomfort without necessarily impairing vision</li>
              <li>Results from high luminance sources in the field of view</li>
              <li>Quantified using UGR (Unified Glare Rating)</li>
              <li>Cumulative effect over time leads to fatigue</li>
            </ul>
            <p><strong>Disability Glare</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Directly impairs visual performance</li>
              <li>Light scattered in the eye reduces contrast</li>
              <li>Common with bright light sources in dark environments</li>
              <li>May occur without discomfort sensation</li>
            </ul>
            <p><strong>Glare Sources in Interior Lighting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct glare:</strong> Luminaire lamps/optics — Shielding, louvres, positioning</li>
              <li><strong>Reflected glare:</strong> Specular surfaces, screens — Luminaire positioning, matte finishes</li>
              <li><strong>Veiling reflections:</strong> Glossy task surfaces — Indirect lighting, task orientation</li>
              <li><strong>Daylight glare:</strong> Windows, skylights — Blinds, shading, orientation</li>
            </ul>
            <p><strong>Design principle:</strong> Glare depends on the luminance of the source, its size, position in the field of view, and the background luminance. UGR provides a standardised way to evaluate these factors together.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Unified Glare Rating (UGR)">
            <p>The Unified Glare Rating is defined in CIE 117 and adopted by BS EN 12464-1. It provides a standardised numerical assessment of discomfort glare from luminaires in indoor spaces, enabling designers to predict visual comfort before installation.</p>
            <p><strong>UGR Formula</strong></p>
            <p>UGR = 8 × log₁₀ [ (0.25 / Lb) × Σ (L² × ω / p²) ]</p>
            <p>Where:</p>
            <p>Lb = Background luminance (cd/m²)</p>
            <p>L = Luminaire luminance (cd/m²)</p>
            <p>ω = Solid angle of luminaire (sr)</p>
            <p>p = Position index (Guth index)</p>
            <p><strong>Factors Increasing UGR</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher luminaire luminance (L)</li>
              <li>Larger visible luminaire area (ω)</li>
              <li>Lower background luminance (Lb)</li>
              <li>Luminaires directly ahead (lower p)</li>
              <li>More luminaires in field of view</li>
            </ul>
            <p><strong>Factors Decreasing UGR</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower luminaire luminance</li>
              <li>Higher room reflectances</li>
              <li>Luminaires at periphery</li>
              <li>Greater mounting height</li>
              <li>Effective shielding/diffusion</li>
            </ul>
            <p><strong>UGR Limits by Application (BS EN 12464-1)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Technical drawing:</strong> ≤ 16 — Precision visual tasks, fine detail</li>
              <li><strong>Offices, classrooms:</strong> ≤ 19 — Reading, writing, screen work</li>
              <li><strong>Industrial, fine work:</strong> ≤ 19 — Assembly, inspection tasks</li>
              <li><strong>Industrial, medium work:</strong> ≤ 22 — General manufacturing</li>
              <li><strong>Retail, general:</strong> ≤ 22 — Varied viewing directions</li>
              <li><strong>Industrial, rough work:</strong> ≤ 25 — Heavy industry, storage</li>
              <li><strong>Corridors, stairs:</strong> ≤ 28 — Transient occupation</li>
            </ul>
            <p><strong>Important:</strong> UGR is calculated for specific observer positions and viewing directions. Design software evaluates UGR across a grid to ensure compliance throughout the space.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Shielding Angles and Luminaire Selection">
            <p>The shielding angle is the angle measured from horizontal below which the lamp is hidden from direct view. Effective shielding prevents high-luminance lamp surfaces from contributing to glare at normal viewing angles.</p>
            <p><strong>Shielding Angle Definition</strong></p>
            <p>The shielding angle (γ) is measured from horizontal to the line from the edge of the luminaire aperture to the lamp.</p>
            <p>γ = arctan(d / h)</p>
            <p>Where: d = horizontal distance from lamp to aperture edge, h = vertical depth of recess</p>
            <p>A shielding angle of 30° means the lamp is not visible when viewing the luminaire at angles less than 30° above horizontal.</p>
            <p><strong>Minimum Shielding Angles by Lamp Luminance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>20,000 - 50,000:</strong> 15° — Fluorescent tubes</li>
              <li><strong>50,000 - 500,000:</strong> 20° — Compact fluorescent, some LED</li>
              <li><strong>&gt; 500,000:</strong> 30° — High-intensity LED, halogen</li>
            </ul>
            <p><strong>Louvred Luminaires</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Parabolic or linear louvres</li>
              <li>Excellent UGR control</li>
              <li>Reduced LOR (efficiency)</li>
              <li>Directional light distribution</li>
            </ul>
            <p><strong>Micro-Prismatic Diffusers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Refracts and spreads light</li>
              <li>Good UGR with higher LOR</li>
              <li>Softer appearance</li>
              <li>Modern aesthetic</li>
            </ul>
            <p><strong>Recessed Luminaires</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Deep recess creates shielding</li>
              <li>Reduced visible solid angle</li>
              <li>Ceiling integration</li>
              <li>May require more luminaires</li>
            </ul>
            <p><strong>VDU Workstation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum luminaire luminance: <strong>3,000 cd/m² at 65°</strong> from vertical</li>
              <li>Avoid luminaires in the screen reflection zone (typically behind screen)</li>
              <li>Consider indirect or direct/indirect luminaires</li>
              <li>Matte screen surfaces reduce reflected glare</li>
            </ul>
            <p><strong>Selection tip:</strong> Compare UGR values from luminaire datasheets at equivalent room conditions. A luminaire with UGR 16 in standard conditions may achieve UGR 19 compliance more easily than one rated UGR 19.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="UGR Tables and Design Compliance">
            <p>Manufacturers provide UGR tables showing glare ratings for their luminaires across a range of room sizes and surface reflectances. Understanding how to read and apply these tables is essential for early-stage luminaire selection.</p>
            <p><strong>Example UGR Table Structure</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2H : 2H:</strong> 16.2 — 17.5 — 18.1</li>
              <li><strong>4H : 4H:</strong> 18.4 — 19.7 — 20.3</li>
              <li><strong>8H : 4H:</strong> 19.1 — 20.4 — 21.0</li>
              <li><strong>12H : 12H:</strong> 19.8 — 21.1 — 21.7</li>
            </ul>
            <p>H = mounting height above eye level (typically 1.2m below luminaire for seated observers)</p>
            <p><strong>Reading UGR Tables</strong></p>
            <p><strong>Step 1:</strong> Calculate room dimensions as multiples of H (mounting height above eye level)</p>
            <p><strong>Step 2:</strong> Determine surface reflectances (ceiling/walls/floor as percentages)</p>
            <p><strong>Step 3:</strong> Find the row matching your room dimensions</p>
            <p><strong>Step 4:</strong> Find the column matching your reflectances</p>
            <p><strong>Step 5:</strong> Compare the value against your UGR limit requirement</p>
            <p><strong>Typical Surface Reflectances</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ceiling:</strong> White painted plaster — 70-80</li>
              <li><strong>Ceiling:</strong> White suspended tiles — 70-85</li>
              <li><strong>Walls:</strong> Light colours — 50-70</li>
              <li><strong>Walls:</strong> Medium colours — 30-50</li>
              <li><strong>Floor:</strong> Light carpet/vinyl — 20-40</li>
              <li><strong>Floor:</strong> Dark carpet — 10-20</li>
            </ul>
            <p><strong>Glare Control Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Luminaire selection:</strong> Choose luminaires with appropriate UGR ratings for the application</li>
              <li><strong>Increase reflectances:</strong> Light-coloured surfaces raise background luminance, reducing UGR</li>
              <li><strong>Positioning:</strong> Avoid placing luminaires directly in primary viewing directions</li>
              <li><strong>Mounting height:</strong> Greater height reduces solid angle and apparent luminance</li>
              <li><strong>Indirect lighting:</strong> Uplighting reduces direct glare but may require higher installed power</li>
              <li><strong>Task lighting:</strong> Localised lighting allows lower ambient levels</li>
            </ul>
            <p><strong>Design verification:</strong> While UGR tables provide initial guidance, always verify compliance using lighting design software that calculates UGR at multiple observer positions and viewing directions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Office UGR Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Assess UGR suitability for a 12m × 8m open-plan office with 2.8m ceiling height.</p>
            <p>Given data:</p>
            <p>Room: 12m × 8m × 2.8m</p>
            <p>Desk height: 0.72m, seated eye level: 1.2m</p>
            <p>Reflectances: Ceiling 70%, Walls 50%, Floor 20%</p>
            <p>Luminaire UGR table value (4H:3H, 70/50/20): 18.7</p>
            <p>Calculation:</p>
            <p>H = 2.8 - 1.2 = 1.6m (mounting above eye level)</p>
            <p>X = 12 / 1.6 = 7.5H</p>
            <p>Y = 8 / 1.6 = 5H</p>
            <p>Assessment:</p>
            <p>Room approximates 8H × 4H category</p>
            <p>UGR from table ≈ 18.7</p>
            <p>Office requirement: UGR ≤ 19</p>
            <p>Result: Luminaire suitable for office application</p>
            <p>
              <strong>Example 2: Shielding Angle Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate the shielding angle for a recessed luminaire.</p>
            <p>Given data:</p>
            <p>Recess depth below ceiling: 80mm</p>
            <p>Horizontal distance from lamp edge to aperture: 60mm</p>
            <p>Calculation:</p>
            <p>γ = arctan(60 / 80)</p>
            <p>γ = arctan(0.75)</p>
            <p>γ = 36.9°</p>
            <p>Assessment:</p>
            <p>Shielding angle ≈ 37°</p>
            <p>Suitable for lamps up to 500,000 cd/m² (requires 30°)</p>
            <p>Adequate for high-luminance LED sources</p>
            <p>
              <strong>Example 3: Improving UGR Compliance</strong>
            </p>
            <p><strong>Scenario:</strong> A classroom design shows UGR 21, but the limit is UGR ≤ 19. Identify improvement options.</p>
            <p>Current situation:</p>
            <p>Calculated UGR: 21</p>
            <p>Required: ≤ 19</p>
            <p>Gap: 2 UGR points</p>
            <p>Option 1: Change luminaire</p>
            <p>Select micro-prismatic diffuser version</p>
            <p>Typical UGR reduction: 2-4 points</p>
            <p>Option 2: Increase reflectances</p>
            <p>Change walls from 30% to 50% reflectance</p>
            <p>Typical UGR reduction: 1-2 points</p>
            <p>Option 3: Reposition luminaires</p>
            <p>Avoid rows directly facing main viewing direction</p>
            <p>May help 0.5-1 point</p>
            <p>Option 4: Increase mounting height</p>
            <p>Surface mount instead of recessed (+100mm)</p>
            <p>May improve 0.5-1 point</p>
            <p>Recommended: Option 1 (change luminaire) as primary solution</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>UGR Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify the application and determine the UGR limit from BS EN 12464-1</li>
              <li>Measure or estimate room dimensions and calculate in terms of H</li>
              <li>Determine surface reflectances from finishes schedule or defaults</li>
              <li>Review luminaire UGR tables for initial selection</li>
              <li>Model in lighting design software for accurate verification</li>
              <li>Check VDU luminance limits if screens are present</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Technical drawing: <strong>UGR ≤ 16</strong></li>
              <li>Offices, classrooms: <strong>UGR ≤ 19</strong></li>
              <li>Industrial (fine): <strong>UGR ≤ 19</strong></li>
              <li>Retail, industrial (medium): <strong>UGR ≤ 22</strong></li>
              <li>Corridors, warehouses: <strong>UGR ≤ 28</strong></li>
              <li>VDU areas: <strong>3,000 cd/m² at 65°</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using single UGR value:</strong> Tables show ranges - select appropriate room/reflectance conditions</li>
                <li><strong>Ignoring viewing direction:</strong> UGR varies with observer position and direction</li>
                <li><strong>Forgetting VDU criteria:</strong> Screen areas have additional luminance limits beyond UGR</li>
                <li><strong>Over-relying on louvres:</strong> Excessive shielding reduces efficiency and may cause dark ceilings</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Point-by-point method
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Uniformity and quality
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section3_4;
