/**
 * Module 7 · Section 3 · Subsection 5 — Uniformity and Quality
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Uniformity ratios, diversity, cylindrical illuminance, modelling, and visual comfort per CIBSE LG7
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

const TITLE = 'Uniformity and Quality - HNC Module 7 Section 3.5';
const DESCRIPTION =
  'Master lighting uniformity and quality metrics for building services: uniformity ratios, diversity, cylindrical illuminance, modelling, and visual comfort per CIBSE LG7 standards.';

const quickCheckQuestions = [
  {
    id: 'uniformity-ratio',
    question: 'What is the uniformity ratio (Uo) formula?',
    options: ['Emax / Emin', 'Emin / Eav', 'Eav / Emax', 'Emin / Emax'],
    correctIndex: 1,
    explanation:
      'Uniformity ratio (Uo) is calculated as Emin / Eav (minimum illuminance divided by average illuminance). This ratio indicates how evenly light is distributed across a task area.',
  },
  {
    id: 'cylindrical-illuminance',
    question: 'What does cylindrical illuminance (Ez) primarily assess?',
    options: [
      'Task visibility on horizontal surfaces',
      'The ability to recognise faces and expressions',
      'Emergency lighting levels',
      'Energy efficiency of luminaires',
    ],
    correctIndex: 1,
    explanation:
      'Cylindrical illuminance (Ez) measures the mean illuminance on the curved surface of a vertical cylinder, which correlates with our ability to recognise faces and perceive three-dimensional objects in a space.',
  },
  {
    id: 'modelling-ratio',
    question: 'What is the recommended modelling ratio range for good facial recognition?',
    options: ['0.1 to 0.2', '0.3 to 0.6', '0.7 to 0.9', '1.0 to 1.5'],
    correctIndex: 1,
    explanation:
      'A modelling ratio between 0.3 and 0.6 provides good three-dimensional perception and facial recognition. Values below 0.3 create flat, shadowless lighting; values above 0.6 can create harsh shadows.',
  },
  {
    id: 'ugr-limit',
    question: 'What is the typical UGR limit for office work per CIBSE recommendations?',
    options: ['UGR ≤ 13', 'UGR ≤ 16', 'UGR ≤ 19', 'UGR ≤ 25'],
    correctIndex: 2,
    explanation:
      'For typical office work, CIBSE recommends a Unified Glare Rating (UGR) of 19 or less. More demanding visual tasks may require UGR ≤ 16, whilst industrial spaces may permit UGR ≤ 25.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'If the minimum illuminance in an office is 320 lux and the average is 500 lux, what is the uniformity ratio?',
    options: ['Uo = 0.50', 'Uo = 0.64', 'Uo = 1.56', 'Uo = 0.36'],
    correctAnswer: 1,
    explanation:
      'Uo = Emin / Eav = 320 / 500 = 0.64. This meets the CIBSE minimum requirement of Uo ≥ 0.6 for office task areas.',
  },
  {
    id: 2,
    question: 'What is the CIBSE LG7 minimum uniformity ratio for office task areas?',
    options: ['Uo ≥ 0.4', 'Uo ≥ 0.5', 'Uo ≥ 0.6', 'Uo ≥ 0.8'],
    correctAnswer: 2,
    explanation:
      'CIBSE LG7 specifies a minimum uniformity ratio of Uo ≥ 0.6 for office task areas. The immediate surrounding area should have Uo ≥ 0.4.',
  },
  {
    id: 3,
    question:
      'Diversity ratio is the inverse of uniformity ratio. If Uo = 0.5, what is the diversity ratio?',
    options: ['0.5', '1.5', '2.0', '0.25'],
    correctAnswer: 2,
    explanation:
      'Diversity ratio = 1 / Uo = 1 / 0.5 = 2.0. This means the maximum illuminance is twice the minimum. Lower diversity (closer to 1.0) indicates more uniform lighting.',
  },
  {
    id: 4,
    question: 'Which factor does NOT directly affect the Unified Glare Rating (UGR)?',
    options: [
      'Luminaire luminance',
      'Background luminance',
      'Solid angle of luminaires',
      'Colour temperature of light',
    ],
    correctAnswer: 3,
    explanation:
      'UGR is calculated from luminaire luminance, background luminance, solid angle subtended by luminaires, and their position relative to the line of sight. Colour temperature does not feature in the UGR formula.',
  },
  {
    id: 5,
    question: 'What is the recommended cylindrical illuminance (Ez) for general office areas?',
    options: ['50 lux', '100 lux', '150 lux', '200 lux'],
    correctAnswer: 2,
    explanation:
      'CIBSE recommends a cylindrical illuminance of 150 lux at 1.2m height for general office areas to ensure good facial recognition and visual communication between occupants.',
  },
  {
    id: 6,
    question: 'The modelling ratio is defined as:',
    options: [
      'Horizontal illuminance / Vertical illuminance',
      'Cylindrical illuminance / Horizontal illuminance',
      'Vertical illuminance / Horizontal illuminance',
      'Minimum illuminance / Maximum illuminance',
    ],
    correctAnswer: 1,
    explanation:
      'Modelling ratio = Ez / Eh (cylindrical illuminance divided by horizontal illuminance). This ratio indicates how well the lighting reveals three-dimensional form and facial features.',
  },
  {
    id: 7,
    question: 'For a circulation area, what is the minimum uniformity ratio (Uo) requirement?',
    options: ['Uo ≥ 0.2', 'Uo ≥ 0.4', 'Uo ≥ 0.6', 'Uo ≥ 0.8'],
    correctAnswer: 1,
    explanation:
      'Circulation areas and corridors require a minimum Uo ≥ 0.4. This lower requirement reflects that precise visual tasks are not typically performed in these spaces.',
  },
  {
    id: 8,
    question:
      'What spacing-to-height ratio (SHR) typically produces uniform lighting from recessed luminaires?',
    options: ['SHR ≤ 1.0', 'SHR = 1.0 to 1.5', 'SHR = 2.0 to 2.5', 'SHR &gt; 3.0'],
    correctAnswer: 1,
    explanation:
      "A spacing-to-height ratio of 1.0 to 1.5 typically provides good uniformity. The exact SHR depends on the luminaire's light distribution and the manufacturer's recommendations.",
  },
  {
    id: 9,
    question:
      'Which visual comfort issue is caused by excessive luminance contrast in the field of view?',
    options: ['Flicker', 'Glare', 'Colour distortion', 'Shadow banding'],
    correctAnswer: 1,
    explanation:
      'Glare is caused by excessive luminance contrast in the visual field. This can be from bright luminaires (direct glare) or reflections from surfaces (reflected/veiling glare).',
  },
  {
    id: 10,
    question: 'What is the minimum reflectance recommendation for office ceilings per CIBSE?',
    options: ['30-50%', '50-70%', '70-90%', '90-95%'],
    correctAnswer: 2,
    explanation:
      'CIBSE recommends ceiling reflectance of 70-90% for offices. This high reflectance improves uniformity by increasing the inter-reflected component of light and reduces contrast with luminaires.',
  },
  {
    id: 11,
    question: 'Veiling reflections primarily affect:',
    options: [
      'Walking in corridors',
      'Reading from glossy or screen surfaces',
      'General ambient perception',
      'Emergency escape routes',
    ],
    correctAnswer: 1,
    explanation:
      "Veiling reflections occur when light reflects from glossy surfaces (paper, screens) into the viewer's eyes, reducing contrast and legibility. Luminaire positioning and screen orientation can mitigate this.",
  },
  {
    id: 12,
    question: 'If Ez = 120 lux and Eh = 400 lux, what is the modelling ratio and is it acceptable?',
    options: [
      '0.30 - at the lower acceptable limit',
      '0.30 - below acceptable levels',
      '3.33 - above acceptable levels',
      '0.30 - ideal for most applications',
    ],
    correctAnswer: 0,
    explanation:
      'Modelling ratio = Ez / Eh = 120 / 400 = 0.30. This is at the lower boundary of the recommended 0.3-0.6 range, meaning it may appear slightly flat but is still acceptable.',
  },
];

const faqs = [
  {
    question:
      'Why is uniformity more important than simply achieving the required average illuminance?',
    answer:
      'Achieving average illuminance alone can mask significant variations. A space with 500 lux average could have areas of 800 lux and 200 lux, causing visual fatigue as eyes constantly adapt. High uniformity ensures comfortable visual conditions throughout the space, reduces accident risk from poorly lit areas, and prevents energy waste from over-lighting to compensate for dark spots.',
  },
  {
    question: 'How do I improve uniformity without increasing energy consumption?',
    answer:
      "Improve uniformity by optimising luminaire spacing (follow manufacturer's SHR recommendations), using luminaires with appropriate light distributions for the mounting height, increasing room surface reflectances (light-coloured ceilings and walls), and considering indirect lighting components. Lighting simulation software can optimise layouts for uniformity without over-specifying luminaires.",
  },
  {
    question:
      "What's the relationship between cylindrical illuminance and horizontal illuminance in practice?",
    answer:
      "Cylindrical illuminance is typically 30-60% of horizontal illuminance in well-designed schemes. Purely downward-directed lighting gives low Ez (poor modelling), whilst heavily diffused or indirect lighting gives high Ez. The modelling ratio Ez/Eh should be 0.3-0.6 for most applications. Values outside this range indicate lighting that's either too directional (harsh) or too diffuse (flat).",
  },
  {
    question: 'When should I specify UGR 16 instead of UGR 19?',
    answer:
      "Specify UGR 16 for visually demanding tasks requiring sustained concentration: CAD workstations, detailed drawing offices, control rooms, and medical examination areas. UGR 19 is acceptable for general office work, meeting rooms, and reception areas. For industrial and warehouse spaces where precise visual tasks aren't required, UGR 22-25 may be acceptable.",
  },
  {
    question: 'How do surface reflectances affect lighting quality metrics?',
    answer:
      'Surface reflectances significantly impact uniformity, modelling, and glare. High ceiling reflectance (70-90%) improves uniformity and reduces contrast with luminaires. Wall reflectance (50-70%) contributes to cylindrical illuminance and modelling. Floor reflectance (20-40%) affects overall light levels. Dark surfaces absorb light, requiring more luminaires and potentially creating uniformity problems near walls.',
  },
  {
    question: 'Can lighting simulation software accurately predict UGR?',
    answer:
      'Modern lighting software (DIALux, Relux, AGi32) calculates UGR at specified observer positions using luminaire photometric data. Accuracy depends on quality of photometric files and correct modelling of room geometry and reflectances. Software typically calculates UGR for standardised positions; actual comfort depends on where occupants sit relative to luminaires. Always verify critical positions.',
  },
];

const HNCModule7Section3_5 = () => {
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
            eyebrow="Module 7 · Section 3 · Subsection 5"
            title="Uniformity and Quality"
            description="Uniformity ratios, diversity, cylindrical illuminance, modelling, and visual comfort per CIBSE LG7"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate and interpret uniformity and diversity ratios",
              "Understand cylindrical illuminance and its role in visual communication",
              "Apply modelling ratio principles for three-dimensional perception",
              "Specify appropriate UGR limits for different task requirements",
              "Evaluate surface reflectances and their impact on lighting quality",
              "Use lighting quality metrics in design verification per CIBSE standards",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Uniformity Ratios">
            <p>Uniformity describes how evenly illuminance is distributed across a surface. Good uniformity ensures comfortable visual conditions, reduces eye strain from adapting to varying light levels, and prevents safety hazards from poorly lit areas within an otherwise adequate space.</p>
            <p><strong>Uniformity Ratio Formula</strong></p>
            <p>Uo = Emin / Eav</p>
            <p>Where Emin is minimum illuminance and Eav is average illuminance across the reference plane</p>
            <p><strong>CIBSE LG7 Uniformity Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Task area:</strong> Uo ≥ 0.6 — Primary work surface</li>
              <li><strong>Immediate surrounding:</strong> Uo ≥ 0.4 — 0.5m band around task area</li>
              <li><strong>Background area:</strong> Uo ≥ 0.1 — Remainder of room</li>
              <li><strong>Circulation areas:</strong> Uo ≥ 0.4 — Corridors, stairs, lobbies</li>
            </ul>
            <p><strong>Diversity ratio:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Diversity = 1 / Uo</strong> or alternatively Emax / Emin</li>
              <li>Lower diversity (closer to 1.0) means more uniform lighting</li>
              <li>Diversity of 2.0 means brightest point is twice the dimmest</li>
              <li>Some standards quote diversity rather than uniformity ratios</li>
            </ul>
            <p><strong>Design consideration:</strong> Uniformity can be improved by optimising luminaire spacing, selecting appropriate light distributions, and maximising room surface reflectances.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Cylindrical Illuminance and Modelling">
            <p>Cylindrical illuminance (Ez) quantifies the lighting on vertical surfaces, which is essential for recognising faces and perceiving three-dimensional form. The modelling ratio relates cylindrical to horizontal illuminance, indicating how well lighting reveals depth and texture.</p>
            <p><strong>Cylindrical Illuminance (Ez)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mean illuminance on vertical cylinder surface</li>
              <li>Measured at 1.2m height (seated eye level)</li>
              <li>Correlates with facial recognition ability</li>
              <li>Recommended: 150 lux for offices</li>
            </ul>
            <p><strong>Modelling Ratio</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Formula: Ez / Eh (cylindrical / horizontal)</li>
              <li>Recommended range: 0.3 to 0.6</li>
              <li>&lt; 0.3: Flat, shadowless appearance</li>
              <li>&gt; 0.6: Harsh shadows, dramatic</li>
            </ul>
            <p><strong>Cylindrical Illuminance Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>General office:</strong> 150 — Visual communication</li>
              <li><strong>Reception areas:</strong> 150-200 — Welcoming atmosphere</li>
              <li><strong>Meeting rooms:</strong> 150 — Face-to-face interaction</li>
              <li><strong>Circulation:</strong> 75-100 — Recognition of people</li>
            </ul>
            <p><strong>Modelling Example</strong></p>
            <p><strong>Scenario:</strong> Office with 500 lux horizontal and 175 lux cylindrical</p>
            <p><strong>Calculation:</strong> Modelling ratio = 175 / 500 = 0.35</p>
            <p><strong>Assessment:</strong> Within 0.3-0.6 range - acceptable three-dimensional perception</p>
            <p><strong>Design tip:</strong> Purely downward lighting gives poor modelling (low Ez). Add indirect or wall-washing components to improve cylindrical illuminance without significantly increasing horizontal levels.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Visual Comfort and UGR">
            <p>Visual comfort encompasses freedom from glare, appropriate contrast, and absence of flicker. The Unified Glare Rating (UGR) is the primary metric for discomfort glare from luminaires, with lower values indicating less glare discomfort.</p>
            <p><strong>UGR Formula Factors</strong></p>
            <p>UGR depends on:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Luminaire luminance (L) - higher = more glare</li>
              <li>Background luminance (Lb) - higher = less perceived glare</li>
              <li>Solid angle (ω) of luminaire as seen by observer</li>
              <li>Position index (p) - related to viewing angle</li>
            </ul>
            <p><strong>CIBSE UGR Limits by Application</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Technical drawing:</strong> ≤ 16 — CAD workstations, drawing offices</li>
              <li><strong>Reading, writing, VDU:</strong> ≤ 19 — General offices, classrooms</li>
              <li><strong>Industrial work:</strong> ≤ 22 — Assembly, machine work</li>
              <li><strong>Rough work, storage:</strong> ≤ 25 — Warehouses, plant rooms</li>
              <li><strong>Circulation:</strong> ≤ 28 — Corridors (no prolonged viewing)</li>
            </ul>
            <p><strong>Types of glare:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Discomfort glare:</strong> Causes discomfort without necessarily impairing vision (assessed by UGR)</li>
              <li><strong>Disability glare:</strong> Impairs vision by reducing contrast (e.g., oncoming headlights)</li>
              <li><strong>Direct glare:</strong> From luminaires directly in field of view</li>
              <li><strong>Reflected/veiling glare:</strong> Reflections from glossy surfaces reducing contrast</li>
            </ul>
            <p><strong>VDU considerations:</strong> For workstations with screens, luminaires should be positioned to avoid reflections. Cross-baffled or low-brightness louvred luminaires help control both direct glare and screen reflections.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Surface Reflectances and Design Integration">
            <p>Room surface reflectances significantly influence all lighting quality metrics. High reflectance surfaces increase the inter-reflected light component, improving uniformity, modelling, and reducing contrast between luminaires and background.</p>
            <p><strong>CIBSE Recommended Reflectances</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ceiling:</strong> 70-90% — Improves uniformity, reduces luminaire contrast</li>
              <li><strong>Walls:</strong> 50-70% — Enhances cylindrical illuminance</li>
              <li><strong>Floor:</strong> 20-40% — Contributes to overall light levels</li>
              <li><strong>Furniture:</strong> 25-45% — Avoids excessive contrast with paper</li>
            </ul>
            <p><strong>Spacing-to-Height Ratio (SHR)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>SHR = spacing / mounting height above WP</li>
              <li>Typical range: 1.0 to 1.5</li>
              <li>Manufacturer's SHRmax ensures uniformity</li>
              <li>Lower SHR = better uniformity, more luminaires</li>
            </ul>
            <p><strong>Luminaire Selection Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Light distribution (narrow, medium, wide)</li>
              <li>UGR rating at specified room dimensions</li>
              <li>Uplight/downlight ratio for modelling</li>
              <li>Luminaire luminance (glare control)</li>
            </ul>
            <p><strong>Design Verification Checklist</strong></p>
            <p><strong>Uniformity:</strong> Uo ≥ 0.6 on task area, ≥ 0.4 on surroundings</p>
            <p><strong>Cylindrical illuminance:</strong> Ez ≥ 150 lux at 1.2m height</p>
            <p><strong>Modelling ratio:</strong> Ez/Eh between 0.3 and 0.6</p>
            <p><strong>UGR:</strong> Within limit for task type (typically ≤ 19 for offices)</p>
            <p><strong>Surface reflectances:</strong> Ceiling 70-90%, walls 50-70%</p>
            <p><strong>Spacing:</strong> Within manufacturer's SHRmax</p>
            <p><strong>Software verification:</strong> Always use lighting calculation software (DIALux, Relux) to verify uniformity, UGR, and illuminance levels at design stage. Check critical observer positions for UGR compliance.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Uniformity Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> An open-plan office has measured illuminances of: Emax = 650 lux, Emin = 380 lux, Eav = 520 lux</p>
            <p>Uniformity ratio calculation:</p>
            <p>Uo = Emin / Eav</p>
            <p>Uo = 380 / 520</p>
            <p>Uo = 0.73</p>
            <p>Diversity ratio (alternative expression):</p>
            <p>Diversity = Emax / Emin = 650 / 380 = 1.71</p>
            <p>Result: Uo = 0.73 exceeds minimum 0.6 requirement</p>
            <p>The lighting provides good uniformity across the task area</p>
            <p>
              <strong>Example 2: Modelling Ratio Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> A meeting room has Eh = 400 lux and Ez = 100 lux. Assess the modelling quality.</p>
            <p>Modelling ratio calculation:</p>
            <p>Modelling ratio = Ez / Eh</p>
            <p>Modelling ratio = 100 / 400</p>
            <p>Modelling ratio = 0.25</p>
            <p>Result: 0.25 is below the recommended 0.3-0.6 range</p>
            <p>Assessment: Lighting appears flat with poor 3D perception</p>
            <p>Remedial action:</p>
            <p>- Add wall-washing luminaires</p>
            <p>- Include indirect lighting component</p>
            <p>- Increase wall reflectance (light colours)</p>
            <p>
              <strong>Example 3: SHR and Layout Check</strong>
            </p>
            <p><strong>Scenario:</strong> Recessed luminaires in a 3.0m ceiling height office, working plane at 0.75m. Luminaire SHRmax = 1.4. Proposed spacing = 3.0m.</p>
            <p>Mounting height calculation:</p>
            <p>Hm = Ceiling height - Working plane height</p>
            <p>Hm = 3.0 - 0.75 = 2.25m</p>
            <p>Actual SHR calculation:</p>
            <p>SHR = Spacing / Hm</p>
            <p>SHR = 3.0 / 2.25 = 1.33</p>
            <p>Result: SHR 1.33 is within SHRmax 1.4</p>
            <p>Layout will achieve acceptable uniformity</p>
            <p>Note: Consider edge spacing to walls (typically 0.5 × spacing)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Quality Metrics Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify uniformity Uo ≥ 0.6 on task areas using calculation software</li>
              <li>Check cylindrical illuminance Ez meets 150 lux at 1.2m height</li>
              <li>Calculate modelling ratio and confirm within 0.3-0.6 range</li>
              <li>Verify UGR at typical viewing positions meets task requirements</li>
              <li>Confirm luminaire spacing within manufacturer's SHRmax</li>
              <li>Specify surface reflectances in design documentation</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Task area uniformity: <strong>Uo ≥ 0.6</strong></li>
              <li>Surrounding area uniformity: <strong>Uo ≥ 0.4</strong></li>
              <li>Office cylindrical illuminance: <strong>Ez = 150 lux</strong></li>
              <li>Modelling ratio: <strong>0.3 to 0.6</strong></li>
              <li>Office UGR limit: <strong>≤ 19</strong></li>
              <li>Ceiling reflectance: <strong>70-90%</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring edge zones</strong> - luminaires too far from walls create dark perimeters</li>
                <li><strong>Exceeding SHRmax</strong> - causes poor uniformity despite adequate average lux</li>
                <li><strong>All-downlight schemes</strong> - poor modelling and low cylindrical illuminance</li>
                <li><strong>Dark surfaces</strong> - low reflectances require more luminaires and create contrast issues</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Glare assessment
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                CIBSE standards
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section3_5;
