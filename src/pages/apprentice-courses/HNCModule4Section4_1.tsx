/**
 * Module 4 · Section 4 · Subsection 1 — Lighting Design Criteria
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   CIBSE SLL Code for Lighting / EN 12464-1 maintained illuminance, uniformity ratios
 *   (Uo task ≥ 0.7, surrounding ≥ 0.5), Unified Glare Rating (UGR) limits, Colour
 *   Rendering Index (CRI / Ra), CCT and Kruithof curve guidance.
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

const TITLE = 'Lighting Design Criteria - HNC Module 4 Section 4.1';
const DESCRIPTION =
  'Master lighting design criteria for building services: task illuminance levels from CIBSE SLL, uniformity ratios, glare control (UGR), colour rendering and visual comfort requirements.';

const quickCheckQuestions = [
  {
    id: 'office-illuminance',
    question: 'What is the recommended maintained illuminance for a general office to CIBSE SLL?',
    options: ['150 lux', '300 lux', '500 lux', '750 lux'],
    correctIndex: 2,
    explanation:
      'CIBSE SLL recommends 500 lux maintained illuminance for general office work. This provides adequate light for tasks including reading, writing and computer work whilst maintaining visual comfort.',
  },
  {
    id: 'ugr-limit',
    question: 'What is the maximum Unified Glare Rating (UGR) permitted for an office environment?',
    options: ['16', '19', '22', '25'],
    correctIndex: 1,
    explanation:
      'UGR 19 is the maximum permitted for office environments. Lower values indicate better glare control. UGR 16 is required for technical drawing offices where visual tasks are more demanding.',
  },
  {
    id: 'colour-rendering',
    question: 'What minimum Colour Rendering Index (CRI or Ra) is required for office lighting?',
    options: ['Ra 60', 'Ra 70', 'Ra 80', 'Ra 90'],
    correctIndex: 2,
    explanation:
      'A minimum CRI of Ra 80 is required for offices to ensure accurate colour perception. Higher values (Ra 90+) are needed for colour-critical tasks such as art studios or medical examination rooms.',
  },
  {
    id: 'uniformity-ratio',
    question: 'What is the minimum uniformity ratio (Uo) required for task area lighting?',
    options: ['0.4', '0.6', '0.7', '0.8'],
    correctIndex: 2,
    explanation:
      'A minimum uniformity ratio of 0.7 (Emin/Eav) is required for the task area. The immediate surrounding area requires Uo of 0.5 minimum. This prevents excessive contrast that causes visual fatigue.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does CIBSE SLL stand for?',
    options: [
      'Chartered Institution of Building Services Engineers Society of Lighting Laboratories',
      'Chartered Institution of Building Services Engineers Society of Light and Lighting',
      'Construction Industry Building Services Engineering Standard Lighting Levels',
      'Commercial and Industrial Building Services Electrical Standard Lighting Levels',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE SLL is the Chartered Institution of Building Services Engineers Society of Light and Lighting. They publish the authoritative UK guidance on lighting design including the Lighting Handbook and Code for Lighting.',
  },
  {
    id: 2,
    question: 'Which illuminance level is recommended for a corridor in a commercial building?',
    options: ['50 lux', '100 lux', '200 lux', '300 lux'],
    correctAnswer: 1,
    explanation:
      'CIBSE SLL recommends 100 lux for corridors. This provides adequate light for safe movement whilst being significantly lower than task areas to reduce energy consumption.',
  },
  {
    id: 3,
    question:
      'What is the relationship between the task area and immediate surrounding area illuminance?',
    options: [
      'Surrounding must be at least equal to task area',
      'Surrounding must be at least 50% of task area',
      'Surrounding can be any value below task area',
      'Surrounding must be at least 30% of task area',
    ],
    correctAnswer: 3,
    explanation:
      'The immediate surrounding area should have illuminance of at least 30% of the task area (but not less than 200 lux). This prevents excessive brightness contrast which causes visual discomfort and adaptation problems.',
  },
  {
    id: 4,
    question: 'What does the Unified Glare Rating (UGR) measure?',
    options: [
      'The total light output of luminaires',
      'The psychological discomfort caused by bright luminaires in the field of view',
      'The colour temperature of light sources',
      'The energy efficiency of the lighting installation',
    ],
    correctAnswer: 1,
    explanation:
      'UGR quantifies the psychological discomfort glare from luminaires. It considers luminaire luminance, position, background luminance and solid angle. Lower UGR values indicate better glare control.',
  },
  {
    id: 5,
    question: 'What is the recommended illuminance for a hospital operating theatre?',
    options: ['500 lux', '1000 lux', '10,000-100,000 lux', '300 lux'],
    correctAnswer: 2,
    explanation:
      'Operating theatres require very high illuminance levels of 10,000-100,000 lux at the surgical site. This is provided by specialist surgical luminaires with adjustable positioning and intensity.',
  },
  {
    id: 6,
    question:
      'What correlated colour temperature (CCT) range is typically recommended for office environments?',
    options: [
      '2700K-3000K (warm white)',
      '4000K-5000K (neutral to cool white)',
      '6000K-6500K (daylight)',
      'Any CCT is acceptable',
    ],
    correctAnswer: 1,
    explanation:
      '4000K-5000K is typically recommended for offices. This neutral to cool white appearance promotes alertness and productivity. Warmer temperatures (2700K-3000K) are preferred for relaxation areas.',
  },
  {
    id: 7,
    question: "What is meant by 'maintained illuminance'?",
    options: [
      'The illuminance when luminaires are new',
      'The illuminance required during maintenance',
      'The minimum illuminance throughout the maintenance period',
      'The average illuminance during peak hours',
    ],
    correctAnswer: 2,
    explanation:
      'Maintained illuminance (Em) is the minimum value to which illuminance should not fall. Initial illuminance must be higher to account for lamp lumen depreciation, luminaire dirt accumulation and room surface degradation.',
  },
  {
    id: 8,
    question:
      'What is the minimum CRI required for areas where accurate colour matching is essential?',
    options: ['Ra 70', 'Ra 80', 'Ra 90', 'Ra 95'],
    correctAnswer: 2,
    explanation:
      'Ra 90 or above is required for colour-critical applications such as art studios, textile inspection, printing facilities and medical examination rooms where accurate colour perception is essential.',
  },
  {
    id: 9,
    question: 'How does room surface reflectance affect lighting design?',
    options: [
      'It has no effect on lighting calculations',
      'Higher reflectances increase utilisation factor and reduce luminaire quantity',
      'Lower reflectances always improve visual comfort',
      'Reflectance only affects emergency lighting',
    ],
    correctAnswer: 1,
    explanation:
      'Higher room surface reflectances improve the utilisation factor (UF), meaning more of the emitted light reaches the working plane. This reduces the number of luminaires required and improves energy efficiency.',
  },
  {
    id: 10,
    question: 'What illuminance level is recommended for a retail sales area?',
    options: ['150 lux', '300 lux', '500 lux', '750 lux'],
    correctAnswer: 1,
    explanation:
      '300 lux is recommended for general retail sales areas. However, accent lighting at much higher levels (up to 5000 lux) may be used on feature displays to attract attention and create visual hierarchy.',
  },
];

const faqs = [
  {
    question: "Why do lighting standards specify 'maintained' illuminance rather than initial?",
    answer:
      'Maintained illuminance ensures the space continues to meet requirements throughout the maintenance period. Light output reduces over time due to lamp lumen depreciation (LLD), luminaire dirt depreciation (LDD) and room surface degradation. The maintenance factor (MF = LLD × LDD × RSDD) is applied to calculate initial illuminance needed to achieve the maintained value.',
  },
  {
    question: 'How do I select the appropriate UGR limit for a space?',
    answer:
      'UGR limits are determined by the visual tasks performed. UGR 16 is required for demanding tasks like technical drawing. UGR 19 applies to offices, classrooms and similar. UGR 22 is acceptable for industrial areas. UGR 25 is permitted for corridors and circulation. These values are specified in CIBSE SLL Code for Lighting and EN 12464-1.',
  },
  {
    question: 'What is the difference between Ra and CRI?',
    answer:
      'Ra (General Colour Rendering Index) and CRI (Colour Rendering Index) refer to the same measurement. Ra is the average of the first 8 test colour samples (R1-R8) from the CIE test method. Values range from 0-100, with higher values indicating better colour rendering. Modern specifications sometimes also consider R9 (saturated red) separately.',
  },
  {
    question: 'How does circadian lighting affect design criteria?',
    answer:
      'Circadian or human-centric lighting considers the non-visual effects of light on human biology. It typically involves varying colour temperature and intensity throughout the day - cooler, brighter light in the morning and warmer, dimmer light in the evening. This requires tuneable white luminaires and sophisticated control systems. Current guidance recommends melanopic equivalent daylight illuminance (M-EDI) targets.',
  },
  {
    question: 'Why is uniformity important and how is it calculated?',
    answer:
      'Good uniformity prevents the visual discomfort caused by bright and dark patches, which forces the eye to constantly adapt. Uniformity ratio Uo = Emin/Eav (minimum illuminance divided by average). For task areas Uo should be at least 0.7. For surrounding areas Uo should be at least 0.5. Poor uniformity can also create safety hazards by obscuring obstacles.',
  },
  {
    question: 'What are the typical room surface reflectances used in lighting calculations?',
    answer:
      'Standard reflectances for lighting calculations are: ceiling 0.7 (70%), walls 0.5 (50%), floor 0.2 (20%). These are typical values for light-coloured surfaces. Dark surfaces have lower reflectances - a dark ceiling might be 0.3. These values significantly affect the utilisation factor and should be verified or adjusted for the actual room finishes.',
  },
];

const HNCModule4Section4_1 = () => {
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
            eyebrow="Module 4 · Section 4 · Subsection 1"
            title="Lighting Design Criteria"
            description="Establishing the quantitative and qualitative requirements for effective lighting design in building services."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Determine appropriate illuminance levels for different tasks and spaces',
              'Understand and apply uniformity requirements for visual comfort',
              'Calculate and specify UGR limits for glare control',
              'Select appropriate colour rendering indices for applications',
              'Apply CIBSE SLL and EN 12464 recommendations',
              'Consider human factors in lighting design criteria',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Maintained illuminance (Em) is the floor — never the new-out-of-box figure. CIBSE SLL gives the lux figure for the task; the design carries the maintenance factor on top.',
              'Uniformity is non-negotiable: Uo ≥ 0.7 in the task area, Uo ≥ 0.5 in the immediate surround. The eye fatigues against contrast, not absolute level.',
              'Glare: pick the UGR ceiling from the task (16 for technical drawing, 19 for offices, 22 industrial, 25 corridor). It’s a designed property, not a fix-on-site one.',
              'Colour: Ra ≥ 80 for occupied spaces, Ra ≥ 90 where colour matters. CCT pairs with illuminance via the Kruithof curve — high lux + warm CCT feels wrong.',
              'These criteria belong on the lighting schedule before the luminaire schedule — the spec drives the product, not the other way round.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 559.5.1"
            clause="At each fixed lighting point one of the following shall be used for the termination of the wiring system: (a) a ceiling rose complying with BS 67; (b) a luminaire supporting coupler (LSC) complying with BS 6972 or BS 7001; (c) a batten lampholder or a pendant set complying with BS EN 60598; (d) a luminaire complying with BS EN 60598; (e) a suitable socket-outlet complying with BS 1363-2, BS 546 or BS EN IEC 60309-2; (f) a plug-in lighting distribution unit complying with BS 5733; (g) a connection unit complying with BS 1363-4; (h) appropriate terminals enclosed in a box complying with the relevant part of BS EN 60670 series or BS 4662; (i) a device for connecting a luminaire (DCL) outlet complying with BS EN 61995-1."
            meaning={
              <>
                Your CIBSE-driven lighting criteria still terminate at a BS 7671 lighting point.
                When you specify a 500 lux office solution, the schedule has to land on one of the
                permitted termination methods — you are not free to invent a fitting interface. The
                designer’s job is to thread the luminaire choice through both the photometric
                criteria <em>and</em> Regulation 559.5.1.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 559.5.1."
          />

          <SectionRule />

          <ConceptBlock title="Task Illuminance — CIBSE SLL Requirements">
            <p>
              Illuminance is the quantity of light falling on a surface, measured in lux (lumens
              per square metre). The CIBSE Society of Light and Lighting publishes recommendations
              for maintained illuminance levels based on the visual tasks to be performed.
            </p>
            <p>
              <strong>Key principles of illuminance specification:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Values are 'maintained' — minimum throughout maintenance cycle</li>
              <li>Measured on the horizontal working plane (typically 0.85m height)</li>
              <li>Higher values needed for fine detail or extended duration tasks</li>
              <li>Age of occupants affects requirements (older eyes need more light)</li>
            </ul>
            <p>
              <strong>Recommended illuminance levels — CIBSE SLL (space type / Em lux / UGR / Ra):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>General office — 500 — 19 — 80</li>
              <li>Technical drawing — 750 — 16 — 80</li>
              <li>Classroom — 300 — 19 — 80</li>
              <li>Corridor — 100 — 25 — 40</li>
              <li>Retail sales area — 300 — 22 — 80</li>
              <li>Industrial assembly — 500 — 22 — 80</li>
              <li>Hospital examination — 1000 — 19 — 90</li>
            </ul>
            <p>
              <strong>Note:</strong> These are maintained illuminance values. Initial illuminance
              must be higher to account for the maintenance factor (typically MF = 0.7-0.8).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Uniformity Ratios — Even Light Distribution">
            <p>
              Uniformity ensures light is evenly distributed across the working area, preventing
              excessive contrast between bright and dark areas. Poor uniformity causes visual
              fatigue as the eye constantly adapts to different light levels.
            </p>
            <p>
              <strong>Uniformity definitions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Uo (uniformity ratio):</strong> Emin / Eav (minimum / average illuminance)
              </li>
              <li>
                <strong>Ud (diversity):</strong> Emin / Emax (minimum / maximum illuminance)
              </li>
              <li>Task area: Uo ≥ 0.7 required</li>
              <li>Immediate surrounding: Uo ≥ 0.5 required</li>
            </ul>
            <p>
              <strong>Task area requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Width minimum 0.6m × depth 0.6m</li>
              <li>Centred on visual task position</li>
              <li>Uniformity Uo ≥ 0.7</li>
              <li>Must achieve maintained illuminance</li>
            </ul>
            <p>
              <strong>Surrounding area requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0.5m band around task area</li>
              <li>Illuminance ≥ 0.3 × task area</li>
              <li>Never less than 200 lux</li>
              <li>Uniformity Uo ≥ 0.5</li>
            </ul>
            <p>
              <strong>Luminance ratios in the visual field:</strong> To prevent adaptation
              problems, luminance ratios should not exceed:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Task to immediate surroundings: 3:1</li>
              <li>Task to general background: 10:1</li>
              <li>Light source to adjacent surface: 20:1</li>
              <li>Anywhere in field of view: 40:1 maximum</li>
            </ul>
            <p>
              <strong>Design tip:</strong> Achieve good uniformity by spacing luminaires
              appropriately — typically spacing-to-height ratio (SHR) of 1.0-1.5 depending on
              luminaire type.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Glare Control — Unified Glare Rating (UGR)">
            <p>
              Glare occurs when bright sources in the field of view cause discomfort or reduce the
              ability to see. The Unified Glare Rating (UGR) system quantifies discomfort glare
              from luminaires, with lower values indicating better glare control.
            </p>
            <p>
              <strong>Types of glare:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Discomfort glare:</strong> causes annoyance without necessarily reducing
                visibility (measured by UGR)
              </li>
              <li>
                <strong>Disability glare:</strong> reduces visibility of the task (veiling
                reflections)
              </li>
              <li>
                <strong>Direct glare:</strong> from luminaires or windows in field of view
              </li>
              <li>
                <strong>Reflected glare:</strong> from reflections on glossy surfaces
              </li>
            </ul>
            <p>
              <strong>UGR limits by application:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UGR ≤ 16 — technical drawing, fine assembly, CAD workstations</li>
              <li>UGR ≤ 19 — offices, classrooms, laboratories, meeting rooms</li>
              <li>UGR ≤ 22 — industrial work, retail, sports halls</li>
              <li>UGR ≤ 25 — corridors, circulation areas, plant rooms</li>
              <li>UGR ≤ 28 — heavy industrial, storage areas</li>
            </ul>
            <p>
              <strong>Increase UGR (worse):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Higher luminaire luminance</li>
              <li>Larger luminaire area</li>
              <li>Dark room surfaces</li>
              <li>Luminaire in direct line of sight</li>
            </ul>
            <p>
              <strong>Reduce UGR (better):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Low-brightness diffusers/louvres</li>
              <li>Indirect lighting component</li>
              <li>Light room surfaces</li>
              <li>Luminaires outside critical viewing zone</li>
            </ul>
            <p>
              <strong>VDU workstations:</strong> Luminaires in the 'offending zone' (reflected in
              screens) should have luminance below 1500 cd/m² at relevant angles to prevent
              reflected glare.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Colour Rendering and Visual Comfort">
            <p>
              Colour rendering describes how accurately a light source reveals the true colours of
              objects. It is measured by the Colour Rendering Index (CRI or Ra) on a scale of
              0-100, where 100 represents perfect colour rendering equivalent to natural daylight.
            </p>
            <p>
              <strong>Colour quality parameters:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CRI/Ra:</strong> general Colour Rendering Index (average of R1-R8)
              </li>
              <li>
                <strong>R9:</strong> saturated red rendering (important for skin tones, food)
              </li>
              <li>
                <strong>CCT:</strong> Correlated Colour Temperature in Kelvin
              </li>
              <li>
                <strong>Duv:</strong> distance from black-body curve (colour consistency)
              </li>
            </ul>
            <p>
              <strong>Minimum CRI requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ra ≥ 90:</strong> colour matching, medical, art
              </li>
              <li>
                <strong>Ra ≥ 80:</strong> offices, schools, retail, homes
              </li>
              <li>
                <strong>Ra ≥ 60:</strong> industrial, warehouses
              </li>
              <li>
                <strong>Ra ≥ 40:</strong> outdoor, car parks
              </li>
            </ul>
            <p>
              <strong>Colour temperature guidance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>2700-3000K:</strong> warm, relaxing (hospitality)
              </li>
              <li>
                <strong>3500-4000K:</strong> neutral (retail, healthcare)
              </li>
              <li>
                <strong>4000-5000K:</strong> cool white (offices, schools)
              </li>
              <li>
                <strong>5000-6500K:</strong> daylight (colour matching)
              </li>
            </ul>
            <p>
              <strong>Visual comfort considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flicker:</strong> LED drivers should provide flicker-free operation (IEEE
                1789 compliant)
              </li>
              <li>
                <strong>Modelling:</strong> directional light should reveal 3D form without harsh
                shadows
              </li>
              <li>
                <strong>Daylight integration:</strong> electric lighting should complement natural
                light
              </li>
              <li>
                <strong>View:</strong> windows and visual relief from uniform artificial
                environments
              </li>
            </ul>
            <p>
              <strong>Kruithof curve:</strong> Visual comfort depends on the relationship between
              illuminance and colour temperature — higher illuminance levels are more acceptable
              with cooler colour temperatures.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — office lighting criteria:</strong> Specify lighting criteria for
              a new open-plan office with VDU workstations.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>From CIBSE SLL and EN 12464-1:</li>
              <li>
                Maintained illuminance: <strong>500 lux</strong> on working plane (0.85m)
              </li>
              <li>
                Uniformity: <strong>Uo ≥ 0.7</strong> (task area)
              </li>
              <li>
                Glare rating: <strong>UGR ≤ 19</strong>
              </li>
              <li>
                Colour rendering: <strong>Ra ≥ 80</strong>
              </li>
              <li>
                Colour temperature: <strong>4000K</strong> (neutral white)
              </li>
              <li>VDU: luminaire luminance in offending zone &lt;1500 cd/m²</li>
              <li>Ceiling luminance ratio ≤3:1</li>
            </ul>
            <p>
              <strong>Example 2 — calculating uniformity:</strong> A task area has illuminance
              measurements of: min 420 lux, max 580 lux, average 510 lux. Check compliance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Uniformity ratio Uo = Emin / Eav</li>
              <li>
                Uo = 420 / 510 = <strong>0.82</strong> — compliant (Uo ≥ 0.7 required)
              </li>
              <li>Diversity Ud = Emin / Emax</li>
              <li>
                Ud = 420 / 580 = <strong>0.72</strong>
              </li>
              <li>Average illuminance check: 510 lux &gt; 500 lux maintained — compliant</li>
            </ul>
            <p>
              <strong>Example 3 — surrounding area requirements:</strong> Task area illuminance is
              750 lux. What is the minimum surrounding area illuminance?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Surrounding area requirement: ≥30% of task area</li>
              <li>
                Minimum = 750 × 0.3 = <strong>225 lux</strong>
              </li>
              <li>225 lux &gt; 200 lux (absolute minimum) — pass</li>
              <li>
                Surrounding area requires minimum <strong>225 lux</strong>
              </li>
              <li>Uniformity in surrounding: Uo ≥ 0.5</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Design criteria checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Illuminance:</strong> identify tasks, specify maintained lux from CIBSE
                SLL
              </li>
              <li>
                <strong>Uniformity:</strong> Uo ≥ 0.7 task, ≥ 0.5 surrounding area
              </li>
              <li>
                <strong>Glare:</strong> specify UGR limit for visual task demands
              </li>
              <li>
                <strong>Colour:</strong> CRI and CCT appropriate to application
              </li>
              <li>
                <strong>Maintenance:</strong> specify maintenance factor assumptions
              </li>
            </ul>
            <p>
              <strong>Key reference documents:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>CIBSE LG7:</strong> Office Lighting
              </li>
              <li>
                <strong>CIBSE LG5:</strong> Lighting for Education
              </li>
              <li>
                <strong>CIBSE LG2:</strong> Hospital Lighting
              </li>
              <li>
                <strong>EN 12464-1:</strong> Indoor workplaces
              </li>
              <li>
                <strong>SLL Code for Lighting:</strong> general guidance
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Confusing initial and maintained</strong> — always specify maintained
                  illuminance
                </li>
                <li>
                  <strong>Ignoring surroundings</strong> — design must include surrounding area
                  criteria
                </li>
                <li>
                  <strong>UGR calculation errors</strong> — UGR varies with viewing position and
                  room proportions
                </li>
                <li>
                  <strong>Poor colour choices</strong> — match CCT to application and illuminance
                  level
                </li>
              </ul>
            }
            doInstead="Always specify the maintained value (with the assumed maintenance factor) on the schedule, design uniformity for both task and surrounding bands, run the UGR calculation at the worst-case viewing position, and pair the CCT to the application using the Kruithof curve."
          />

          <SectionRule />

          <Scenario
            title="Open-plan office refit — writing the lighting criteria sheet"
            situation={
              <>
                You’re the HNC building services engineer on a Cat-A office refit. 30 m × 18 m floor
                plate, 2.7 m ceiling, fully glazed perimeter, mixed-use VDU desks and a small
                CAD/technical drawing zone in the south corner. The architect has issued reflected
                ceiling plans expecting a recessed modular luminaire. M&amp;E lead asks for your
                criteria sheet by Thursday so the QS can price.
              </>
            }
            whatToDo={
              <>
                Issue a one-page criteria schedule that locks the design intent before product
                selection. Open-plan zone: Em 500 lx maintained on the working plane (0.85 m), Uo
                ≥ 0.7 task / ≥ 0.5 surround, UGR ≤ 19, Ra ≥ 80, CCT 4000 K, MF 0.8, luminaire
                luminance &lt; 1500 cd/m² in the offending zone for VDU compatibility. CAD zone:
                tighten to UGR ≤ 16 and Em 750 lx (or local task lighting). Note in the criteria
                that the luminaire must terminate to BS 7671 Reg 559.5.1 — most will be either a
                BS EN 60598 luminaire or a DCL (BS EN 61995-1) on a plug-in lighting distribution
                unit (BS 5733). Confirm room reflectances assumed (0.7/0.5/0.2) so the DIALux model
                isn’t optimistic.
              </>
            }
            whyItMatters={
              <>
                Without a criteria sheet, the QS prices the cheapest UGR-22 luminaire and the
                client gets glare complaints on day one. Your spec — illuminance, uniformity, UGR,
                Ra, CCT, MF — is what stops a value-engineering downgrade hollowing out the design.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Maintained illuminance (Em) is the design number — not initial. Always pair it with the assumed maintenance factor on the schedule.',
              'Uniformity Uo ≥ 0.7 task and ≥ 0.5 immediate surround is what stops the room reading as “patchy” even at the right average lux.',
              'UGR is a luminaire-plus-room property — pick the ceiling from the task, then choose a luminaire that hits it at the worst-case viewing position.',
              'Ra ≥ 80 is the floor for occupied spaces; Ra ≥ 90 plus a watch on R9 for colour-critical work (medical, art, retail food).',
              'CCT and illuminance must agree (Kruithof curve) — 4000 K with 500 lx feels neutral; 3000 K with 1000 lx feels oppressive.',
              'Luminance ratios in the field of view (3:1, 10:1, 20:1, 40:1) protect adaptation — they’re part of the criteria, not a “nice to have”.',
              'CIBSE SLL Code, EN 12464-1 and the LG-series guides are the baseline references; cite them on the spec so the contractor knows what they’re committing to.',
              'Whatever you specify still has to terminate at a Reg 559.5.1-compliant lighting point — design intent and BS 7671 compliance live on the same drawing.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Lighting design
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Interior lighting calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section4_1;
