/**
 * Module 7 · Section 3 · Subsection 6 — CIBSE Standards
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Lighting Guide requirements, workplace standards, task lighting and SLL recommendations
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

const TITLE = 'CIBSE Standards - HNC Module 7 Section 3.6';
const DESCRIPTION =
  'Master CIBSE lighting standards for building services: Lighting Guides LG3, LG7, LG10, SLL Code for Lighting, maintained illuminance requirements, BS EN 12464-1 compliance, and workplace lighting design.';

const quickCheckQuestions = [
  {
    id: 'cibse-lg7-purpose',
    question: 'What is the primary focus of CIBSE Lighting Guide LG7?',
    options: ['Industrial lighting', 'Office lighting', 'Emergency lighting', 'Exterior lighting'],
    correctIndex: 1,
    explanation:
      'CIBSE LG7 specifically addresses office lighting, providing detailed guidance on illuminance levels, glare control, daylight integration, and visual comfort for office environments.',
  },
  {
    id: 'maintained-illuminance',
    question: "What does 'maintained illuminance' (Em) represent?",
    options: [
      'Narrowing down the fault location to between two test points',
      'The average illuminance below which the value should not fall',
      'To reduce electromagnetic interference (EMI)',
      'An automatic physiological stress response triggered by perceived threats',
    ],
    correctIndex: 1,
    explanation:
      'Maintained illuminance (Em) is the average illuminance on a specified surface at the time when maintenance must be carried out. It accounts for lamp lumen depreciation and luminaire dirt accumulation over time.',
  },
  {
    id: 'ugr-limit',
    question:
      'For a typical office environment, what is the recommended UGR limit according to CIBSE/BS EN 12464-1?',
    options: [
      'UGR &lt; 25',
      'UGR &lt; 22',
      'UGR &lt; 16',
      'UGR &lt; 19',
    ],
    correctIndex: 3,
    explanation:
      'For office work involving writing, typing, reading, and data processing, the UGR limit should be 19 or less. This ensures visual comfort and reduces the risk of discomfort glare from luminaires.',
  },
  {
    id: 'colour-rendering',
    question:
      'What minimum colour rendering index (Ra) is required for offices under CIBSE guidelines?',
    options: [
      'Ra &gt; 80',
      'Ra &gt; 70',
      'Ra &gt; 60',
      'Ra &gt; 90',
    ],
    correctIndex: 0,
    explanation:
      'A minimum colour rendering index of Ra &gt; 80 is required for most office and commercial environments. This ensures accurate colour perception for tasks and maintains a pleasant visual environment.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which CIBSE Lighting Guide covers recommendations for areas associated with visual display terminals?',
    options: [
      'LG3 - The Visual Environment',
      'LG7 - Office Lighting',
      'LG10 - Daylighting',
      'LG14 - Control of Electric Lighting',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE LG7 (Office Lighting) provides comprehensive guidance for areas with VDTs, including screen reflections, luminaire positioning, and maintaining appropriate luminance ratios.',
  },
  {
    id: 2,
    question:
      'According to BS EN 12464-1, what is the maintained illuminance requirement for general office areas?',
    options: [
      '750 lux',
      '200 lux',
      '500 lux',
      '300 lux',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 12464-1 specifies a maintained illuminance of 500 lux for general office work including writing, typing, reading, and data processing. This aligns with CIBSE LG7 recommendations.',
  },
  {
    id: 3,
    question: 'What is the purpose of the maintenance factor (MF) in lighting design?',
    options: [
      "To increase the initial illuminance above the level the occupants actually need",
      "To convert luminous flux in lumens into illuminance in lux on the working plane",
      "To rate how easily a luminaire can be accessed and cleaned by maintenance staff",
      "To account for light loss over the installation's service life",
    ],
    correctAnswer: 3,
    explanation:
      'The maintenance factor accounts for reduced light output over time due to lamp lumen depreciation, luminaire dirt accumulation, and room surface deterioration. MF = LLMF x LSF x LMF x RSMF.',
  },
  {
    id: 4,
    question: "CIBSE LG3 'The Visual Environment' primarily addresses:",
    options: [
      'Fundamental principles of how light affects human vision and comfort',
      'Detailed lighting layouts for sports halls and outdoor pitches',
      'The wiring and protection requirements for emergency lighting circuits',
      'Energy-metering and reporting requirements for commercial lighting',
    ],
    correctAnswer: 0,
    explanation:
      'LG3 covers fundamental visual science including how the eye works, visual performance, visual comfort, and the relationship between lighting and health. It underpins all other lighting guides.',
  },
  {
    id: 5,
    question: 'What maintained illuminance does BS EN 12464-1 specify for technical drawing tasks?',
    options: [
      '500 lux',
      '750 lux',
      '1000 lux',
      '300 lux',
    ],
    correctAnswer: 1,
    explanation:
      'Technical drawing requires 750 lux maintained illuminance due to the fine detail and precision required. This is higher than general office work to support accurate visual tasks.',
  },
  {
    id: 6,
    question: 'The SLL Code for Lighting is published by which organisation?',
    options: [
      'British Standards Institution',
      'Institution of Engineering and Technology',
      'Society of Light and Lighting (part of CIBSE)',
      'Health and Safety Executive',
    ],
    correctAnswer: 2,
    explanation:
      'The SLL Code for Lighting is published by the Society of Light and Lighting, which is part of CIBSE. It provides comprehensive guidance on interior and exterior lighting design.',
  },
  {
    id: 7,
    question: 'For an assembly area (educational), what is the recommended maintained illuminance?',
    options: [
      '150 lux',
      '200 lux',
      '500 lux',
      '300 lux',
    ],
    correctAnswer: 3,
    explanation:
      'Assembly halls and similar gathering spaces require 300 lux maintained illuminance according to BS EN 12464-1, suitable for general activities without detailed visual tasks.',
  },
  {
    id: 8,
    question: 'CIBSE LG10 focuses specifically on:',
    options: [
      'Daylighting and window design',
      'Industrial lighting applications',
      'Emergency lighting design',
      'Sports lighting requirements',
    ],
    correctAnswer: 0,
    explanation:
      'CIBSE LG10 covers daylighting, including window design, daylight factor calculations, solar control, and integration of daylight with electric lighting systems.',
  },
  {
    id: 9,
    question:
      'What uniformity ratio (Uo) is typically required for office task areas under CIBSE guidance?',
    options: [
      'Uo &gt; 0.3',
      'Uo &gt; 0.6',
      'Uo &gt; 0.4',
      'Uo &gt; 0.8',
    ],
    correctAnswer: 1,
    explanation:
      'A uniformity ratio of at least 0.6 is required for task areas, meaning the minimum illuminance should be at least 60% of the average. This prevents excessive contrast across the working plane.',
  },
  {
    id: 10,
    question:
      'Which standard specifically addresses workplace lighting requirements in the European Union?',
    options: [
      'BS 5266',
      'BS EN 1838',
      'BS EN 12464-1',
      'BS 7671',
    ],
    correctAnswer: 2,
    explanation:
      "BS EN 12464-1 'Light and lighting - Lighting of work places - Part 1: Indoor work places' is the European standard adopted in the UK for workplace lighting requirements.",
  },
  {
    id: 11,
    question:
      'For circulation areas (corridors) in buildings, what is the minimum maintained illuminance?',
    options: [
      '50 lux',
      '200 lux',
      '150 lux',
      '100 lux',
    ],
    correctAnswer: 3,
    explanation:
      'Corridors and circulation areas require a minimum of 100 lux maintained illuminance according to BS EN 12464-1, sufficient for safe movement but lower than task areas.',
  },
  {
    id: 12,
    question: 'What does LLMF stand for in lighting maintenance calculations?',
    options: [
      'Lamp Lumen Maintenance Factor',
      'Low Light Modification Factor',
      'Luminaire Lumen Maintenance Factor',
      'Light Level Measurement Factor',
    ],
    correctAnswer: 0,
    explanation:
      'LLMF (Lamp Lumen Maintenance Factor) represents the proportion of initial lamp lumens remaining at the end of the maintenance period due to lamp ageing and lumen depreciation.',
  },
];

const faqs = [
  {
    question: 'What is the difference between CIBSE Lighting Guides and BS EN 12464-1?',
    answer:
      'BS EN 12464-1 is the European standard that sets minimum legal requirements for workplace lighting, specifying illuminance levels, uniformity, and glare limits. CIBSE Lighting Guides provide more detailed design guidance, best practices, and worked examples that help designers exceed minimum standards and achieve optimal lighting quality. Use BS EN 12464-1 for compliance requirements and CIBSE guides for design methodology.',
  },
  {
    question: 'How do I calculate the maintenance factor for a lighting installation?',
    answer:
      'Maintenance Factor (MF) = LLMF x LSF x LMF x RSMF, where LLMF is Lamp Lumen Maintenance Factor (typically 0.8-0.9 for LED), LSF is Lamp Survival Factor (1.0 for planned replacement), LMF is Luminaire Maintenance Factor (0.8-0.95 depending on IP rating and environment), and RSMF is Room Surface Maintenance Factor (0.9-0.95 for clean environments). Combined MF typically ranges from 0.6 to 0.8 for office environments.',
  },
  {
    question: 'Why is UGR important in office lighting design?',
    answer:
      "Unified Glare Rating (UGR) quantifies discomfort glare from luminaires in an observer's field of view. In offices, excessive glare causes visual discomfort, eye strain, headaches, and reduced productivity. UGR limits (typically 19 for offices) ensure luminaires are appropriately shielded and positioned. Modern LED luminaires often have UGR &lt; 19 built into their design through optical control.",
  },
  {
    question: 'What is the relationship between task lighting and ambient lighting?',
    answer:
      'Task lighting provides higher illuminance at specific work locations (e.g., desk lamps providing 300-500 lux additional light), while ambient lighting provides general illumination throughout the space (typically 300 lux in offices). CIBSE recommends the ratio between task and surrounding areas should not exceed 3:1 to avoid excessive adaptation demands on the eye. Combined systems can reduce energy consumption while maintaining visual comfort.',
  },
  {
    question: 'How does CIBSE LG10 relate to electric lighting design?',
    answer:
      'LG10 (Daylighting) directly impacts electric lighting by determining daylight availability, which affects: lighting control strategies (daylight-linked dimming), luminaire positioning (avoiding window glare reflections), and energy calculations (daylight reduces electric lighting hours). Designers must integrate daylight analysis with electric lighting to optimise both visual environment and energy performance.',
  },
  {
    question: 'What colour temperature is recommended for office environments?',
    answer:
      'CIBSE and SLL recommend 4000K (neutral white) for most office environments, providing good visual comfort for extended periods. Warmer temperatures (3000K) may be used in relaxation areas, while cooler temperatures (5000-6500K) suit task-intensive areas like drawing offices. The key is consistency - avoid mixing significantly different colour temperatures in the same space to prevent visual discord.',
  },
];

const HNCModule7Section3_6 = () => {
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
            eyebrow="Module 7 · Section 3 · Subsection 6"
            title="CIBSE Standards"
            description="Lighting Guide requirements, workplace standards, task lighting and SLL recommendations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply CIBSE Lighting Guides LG3, LG7, and LG10 to design projects",
              "Determine maintained illuminance levels for different workplace tasks",
              "Calculate and apply maintenance factors to lighting designs",
              "Specify appropriate UGR limits for visual comfort",
              "Use BS EN 12464-1 for workplace lighting compliance",
              "Integrate SLL Code recommendations into lighting schemes",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="CIBSE Lighting Guides Overview">
            <p>The Chartered Institution of Building Services Engineers (CIBSE) publishes a comprehensive series of Lighting Guides that provide detailed technical guidance for lighting designers and engineers. These guides complement the statutory requirements of BS EN 12464-1 with practical design methodologies and best practice recommendations.</p>
            <p><strong>Key CIBSE Lighting Guides:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LG3 - The Visual Environment:</strong> Fundamental principles of vision, visual performance, and lighting quality</li>
              <li><strong>LG7 - Office Lighting:</strong> Comprehensive guidance for office environments including VDT areas</li>
              <li><strong>LG10 - Daylighting:</strong> Window design, daylight factors, and integration with electric lighting</li>
              <li><strong>LG14 - Control of Electric Lighting:</strong> Lighting control systems and energy management</li>
            </ul>
            <p><strong>CIBSE Lighting Guide Summary</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LG1:</strong> Industrial Lighting — Manufacturing, warehouses, heavy industry</li>
              <li><strong>LG3:</strong> The Visual Environment — Vision science, visual comfort, health effects</li>
              <li><strong>LG5:</strong> Lighting for Education — Schools, colleges, universities</li>
              <li><strong>LG7:</strong> Office Lighting — General offices, VDT areas, meeting rooms</li>
              <li><strong>LG10:</strong> Daylighting — Windows, rooflights, daylight factors</li>
            </ul>
            <p><strong>Professional practice:</strong> CIBSE guides represent current best practice and are regularly updated to reflect advances in lighting technology and research.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="BS EN 12464-1 and Maintained Illuminance">
            <p>BS EN 12464-1 'Light and lighting - Lighting of work places - Part 1: Indoor work places' is the European standard adopted in the UK that specifies lighting requirements for indoor workplaces. It defines minimum maintained illuminance levels, uniformity ratios, and glare limits for different tasks and activities.</p>
            <p><strong>Maintained Illuminance (Em)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Average illuminance on task plane</li>
              <li>Value at maintenance point</li>
              <li>Accounts for depreciation</li>
              <li>Must not fall below stated value</li>
            </ul>
            <p><strong>Illuminance Uniformity (Uo)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ratio: Emin / Eaverage</li>
              <li>Task area: Uo &gt; 0.6</li>
              <li>Immediate surround: Uo &gt; 0.4</li>
              <li>Prevents excessive contrast</li>
            </ul>
            <p><strong>Unified Glare Rating (UGR)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Measures discomfort glare</li>
              <li>Offices typically UGR &lt; 19</li>
              <li>Industrial may be UGR &lt; 25</li>
              <li>Lower = better glare control</li>
            </ul>
            <p><strong>Workplace Illuminance Requirements (BS EN 12464-1)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Corridors and circulation:</strong> 100 — 28 — 40</li>
              <li><strong>Stairs and escalators:</strong> 150 — 25 — 40</li>
              <li><strong>Reception areas:</strong> 300 — 22 — 80</li>
              <li><strong>General office work:</strong> 500 — 19 — 80</li>
              <li><strong>Technical drawing:</strong> 750 — 16 — 80</li>
              <li><strong>CAD workstations:</strong> 500 — 19 — 80</li>
              <li><strong>Conference rooms:</strong> 500 — 19 — 80</li>
            </ul>
            <p><strong>Compliance note:</strong> These are minimum maintained values. Designers may specify higher levels where task demands or occupant preferences require improved visual conditions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Maintenance Factors and Calculations">
            <p>Lighting installations depreciate over time due to lamp ageing, dirt accumulation on luminaires, and deterioration of room surfaces. The maintenance factor (MF) accounts for these effects, ensuring that the required maintained illuminance is achieved throughout the maintenance cycle.</p>
            <p><strong>Maintenance Factor Formula</strong></p>
            <p><span>MF = LLMF x LSF x LMF x RSMF</span></p>
            <p><span>Where:</span></p>
            <p><span>LLMF</span> = Lamp Lumen Maintenance Factor (LED typical: 0.90)</p>
            <p><span>LSF</span> = Lamp Survival Factor (planned replacement: 1.0)</p>
            <p><span>LMF</span> = Luminaire Maintenance Factor (clean office: 0.90)</p>
            <p><span>RSMF</span> = Room Surface Maintenance Factor (typical: 0.95)</p>
            <p><strong>Typical Maintenance Factor Values</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Clean office:</strong> 3 years — 0.77 — 0.67</li>
              <li><strong>Normal office:</strong> 2 years — 0.74 — 0.64</li>
              <li><strong>Light industrial:</strong> 2 years — 0.68 — 0.58</li>
              <li><strong>Heavy industrial:</strong> 1 year — 0.60 — 0.52</li>
            </ul>
            <p><strong>Component Factors Breakdown</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LLMF:</strong> LED sources 0.85-0.95 at L70 life; fluorescent 0.80-0.90 at rated life</li>
              <li><strong>LSF:</strong> Group replacement = 1.0; spot replacement typically 0.95</li>
              <li><strong>LMF:</strong> IP20 open = 0.80-0.90; IP65 sealed = 0.90-0.95</li>
              <li><strong>RSMF:</strong> Clean rooms 0.95; dirty environments 0.85-0.90</li>
            </ul>
            <p><strong>Design tip:</strong> Use conservative MF values for critical applications. Over-specifying by 10% provides margin for unexpected conditions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="SLL Code for Lighting and Task Lighting">
            <p>The Society of Light and Lighting (SLL), part of CIBSE, publishes the SLL Code for Lighting, which provides comprehensive guidance on interior and exterior lighting. Task lighting recommendations ensure appropriate illuminance for specific visual activities while considering energy efficiency and occupant comfort.</p>
            <p><strong>Task Illuminance Scale (SLL Code)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>50:</strong> Orientation/safety — Storage areas, cable routes</li>
              <li><strong>100:</strong> Movement and basic tasks — Corridors, loading bays</li>
              <li><strong>200:</strong> Routine work, low detail — Foyers, rest rooms, archives</li>
              <li><strong>300:</strong> Moderate visual tasks — Classrooms, retail areas</li>
              <li><strong>500:</strong> Standard office tasks — Offices, control rooms</li>
              <li><strong>750:</strong> Demanding visual tasks — Drawing, inspection work</li>
              <li><strong>1000:</strong> Very fine detail tasks — Colour matching, fine assembly</li>
            </ul>
            <p><strong>Task Lighting Benefits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher illuminance where needed</li>
              <li>Individual control for occupants</li>
              <li>Energy savings vs. high ambient</li>
              <li>Reduced eye strain for detail work</li>
              <li>Flexibility for changing layouts</li>
            </ul>
            <p><strong>Design Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Task:surround ratio max 3:1</li>
              <li>Avoid veiling reflections on screens</li>
              <li>Position to avoid shadows</li>
              <li>Consider colour temperature consistency</li>
              <li>Provide switching/dimming control</li>
            </ul>
            <p><strong>Illuminance Ratios (SLL Recommendations)</strong></p>
            <p><strong>Task area to immediate surround:</strong> Max 3:1</p>
            <p><strong>Task area to background:</strong> Max 10:1</p>
            <p><strong>Luminaire luminance to ceiling:</strong> Max 20:1</p>
            <p><strong>Window to adjacent wall:</strong> Max 20:1</p>
            <p>These ratios ensure comfortable adaptation and prevent excessive contrast that causes visual fatigue.</p>
            <p><strong>Energy efficiency:</strong> Combining 300 lux ambient lighting with task lighting for desk work can reduce installed load by 20-30% compared to 500 lux uniform ambient.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Office Lighting Specification</strong>
            </p>
            <p><strong>Scenario:</strong> Specify lighting requirements for a 200m² open-plan office with VDT workstations.</p>
            <p>Requirements from BS EN 12464-1 / CIBSE LG7:</p>
            <p>Maintained illuminance (Em): 500 lux</p>
            <p>Uniformity on task area (Uo): &gt; 0.6</p>
            <p>Unified Glare Rating (UGR): &lt; 19</p>
            <p>Colour rendering index (Ra): &gt; 80</p>
            <p>Colour temperature: 4000K (neutral white)</p>
            <p>Additional considerations:</p>
            <p>- Luminaire mounting: Recessed or suspended</p>
            <p>- Screen glare: Position to avoid reflections</p>
            <p>- Controls: Daylight dimming, occupancy sensing</p>
            <p>Compliant specification meets LG7 best practice</p>
            <p>
              <strong>Example 2: Maintenance Factor Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate MF for LED luminaires in a normal office with 3-year maintenance cycle.</p>
            <p>Component factors (from CIBSE tables):</p>
            <p>LLMF (LED at 30,000 hrs): 0.90</p>
            <p>LSF (group replacement): 1.0</p>
            <p>LMF (IP20, normal environment): 0.87</p>
            <p>RSMF (3-year cycle): 0.95</p>
            <p>Calculation:</p>
            <p>MF = 0.90 x 1.0 x 0.87 x 0.95</p>
            <p>MF = 0.74</p>
            <p>Design illuminance required:</p>
            <p>Initial = 500 / 0.74 = 676 lux</p>
            <p>
              <strong>Example 3: Task and Ambient Lighting Design</strong>
            </p>
            <p><strong>Scenario:</strong> Design combined ambient and task lighting for a drawing office.</p>
            <p>Requirements (technical drawing):</p>
            <p>Total illuminance required: 750 lux</p>
            <p>UGR limit: 16</p>
            <p>Combined approach:</p>
            <p>Ambient lighting: 300 lux (uniform ceiling grid)</p>
            <p>Task lighting: 450 lux (adjustable desk lamps)</p>
            <p>Total at task: 750 lux</p>
            <p>Compliance check:</p>
            <p>Task:surround ratio = 750:300 = 2.5:1 &lt; 3:1</p>
            <p>Compliant with SLL recommendations</p>
            <p>Energy benefit:</p>
            <p>300 lux ambient vs 750 lux uniform = 40% lower installed load</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>CIBSE Standards Compliance Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify task types and corresponding BS EN 12464-1 requirements</li>
              <li>Calculate appropriate maintenance factor for the environment</li>
              <li>Verify UGR compliance using luminaire data and room dimensions</li>
              <li>Check uniformity ratios meet minimum requirements</li>
              <li>Confirm colour rendering (Ra) meets task needs</li>
              <li>Document assumptions in lighting design report</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>General office: <strong>500 lux, UGR &lt; 19, Ra &gt; 80</strong></li>
              <li>Technical drawing: <strong>750 lux, UGR &lt; 16, Ra &gt; 80</strong></li>
              <li>Corridors: <strong>100 lux, UGR &lt; 28, Ra &gt; 40</strong></li>
              <li>Task uniformity: <strong>Uo &gt; 0.6</strong></li>
              <li>Typical office MF: <strong>0.70-0.80 (LED)</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using initial illuminance as maintained:</strong> Always apply maintenance factor</li>
                <li><strong>Ignoring UGR in calculations:</strong> Glare significantly affects comfort</li>
                <li><strong>Uniform lighting everywhere:</strong> Task/ambient approach often more efficient</li>
                <li><strong>Wrong Ra for colour-critical tasks:</strong> Check minimum requirements</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section3-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Uniformity and quality
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lighting controls
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section3_6;
