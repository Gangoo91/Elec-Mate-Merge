/**
 * Module 6 · Section 3 · Subsection 5 — BREEAM Health and Wellbeing
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Daylighting, artificial lighting quality, indoor air quality, thermal comfort, and acoustic performance assessment
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'BREEAM Health and Wellbeing - HNC Module 6 Section 3.5';
const DESCRIPTION =
  'Master BREEAM Health and Wellbeing assessment criteria: daylighting, artificial lighting quality, indoor air quality, thermal comfort, acoustic performance, and occupant wellbeing standards.';

const quickCheckQuestions = [
  {
    id: 'hea01-criteria',
    question: 'What does BREEAM Hea 01 (Visual Comfort) primarily assess?',
    options: [
      'Emergency lighting provision',
      'Daylighting levels and glare control in occupied spaces',
      'External lighting pollution',
      'Security lighting coverage',
    ],
    correctIndex: 1,
    explanation:
      'Hea 01 Visual Comfort assesses daylighting provision, view out, and glare control to ensure occupied spaces receive adequate natural light whilst minimising visual discomfort from excessive brightness or reflections.',
  },
  {
    id: 'air-quality-rates',
    question: 'What is the minimum fresh air supply rate for office spaces under BREEAM Hea 04?',
    options: [
      '5 litres per second per person',
      '10 litres per second per person',
      '12 litres per second per person',
      '15 litres per second per person',
    ],
    correctIndex: 1,
    explanation:
      'BREEAM Hea 04 Indoor Air Quality requires a minimum fresh air supply of 10 litres per second per person for office spaces, aligned with CIBSE Guide A recommendations for good indoor air quality.',
  },
  {
    id: 'thermal-comfort',
    question: 'Which standard does BREEAM Hea 05 reference for thermal comfort criteria?',
    options: ['BS EN 15251 / BS EN 16798', 'BS 7671', 'CIBSE TM52', 'Building Regulations Part L'],
    correctIndex: 0,
    explanation:
      'BREEAM Hea 05 Thermal Comfort references BS EN 15251 (now superseded by BS EN 16798) for comfort criteria, including operative temperature ranges and adaptive comfort approaches for naturally ventilated buildings.',
  },
  {
    id: 'acoustic-criteria',
    question:
      'What acoustic parameter does BREEAM Hea 06 primarily address for office environments?',
    options: [
      'Reverberation time only',
      'Sound insulation between spaces and ambient noise levels',
      'External noise from traffic only',
      'Plant room noise isolation only',
    ],
    correctIndex: 1,
    explanation:
      'Hea 06 Acoustic Performance addresses both sound insulation between spaces (partitions, floors) and ambient noise levels from building services, ensuring appropriate conditions for the intended use of each space.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What minimum average daylight factor does BREEAM typically require for a compliant office space?',
    options: [
      '1% average daylight factor',
      '2% average daylight factor',
      '3% average daylight factor',
      '5% average daylight factor',
    ],
    correctAnswer: 1,
    explanation:
      'BREEAM typically requires a minimum 2% average daylight factor for office spaces to achieve credits under Hea 01. Higher targets (3%+) may be needed for schools or healthcare spaces.',
  },
  {
    id: 2,
    question:
      'Under BREEAM Hea 02 (View Out), what percentage of floor area must have a view of the sky or landscape?',
    options: [
      '50% of the net internal area',
      '80% of the net internal area',
      '95% of the net internal area',
      '100% of the net internal area',
    ],
    correctAnswer: 2,
    explanation:
      'Hea 02 requires that 95% of the net internal area has a direct view to the external environment, with views of the sky or landscape from a seated or standing position as appropriate.',
  },
  {
    id: 3,
    question: 'What is the purpose of glare control under BREEAM Hea 03?',
    options: [
      'To reduce daylight entering the building',
      'To provide adjustable shading to prevent visual discomfort',
      'To eliminate all natural light',
      'To increase artificial lighting usage',
    ],
    correctAnswer: 1,
    explanation:
      'Hea 03 Glare Control requires adjustable shading or screening devices to prevent excessive brightness and visual discomfort while maintaining the benefits of daylighting and views.',
  },
  {
    id: 4,
    question: 'Which pollutant concentration must be monitored for BREEAM Hea 04 credits?',
    options: [
      'Ozone (O3)',
      'Carbon dioxide (CO2)',
      'Nitrogen oxide (NOx)',
      'Sulphur dioxide (SO2)',
    ],
    correctAnswer: 1,
    explanation:
      'BREEAM Hea 04 requires CO2 monitoring with sensors linked to ventilation systems. CO2 levels indicate occupancy and ventilation effectiveness, with a typical target of maintaining levels below 1000 ppm.',
  },
  {
    id: 5,
    question: 'What does BREEAM require regarding VOC emissions from internal finishes?',
    options: [
      'No restrictions on VOC content',
      'VOC content below specified limits or certified low-emission products',
      'Only natural materials permitted',
      'Testing only after 12 months occupancy',
    ],
    correctAnswer: 1,
    explanation:
      'BREEAM requires internal finishes (paints, adhesives, flooring) to meet specified VOC emission limits or be certified to recognised low-emission standards to protect indoor air quality.',
  },
  {
    id: 6,
    question:
      'For naturally ventilated buildings, which thermal comfort approach does BREEAM accept?',
    options: [
      'Fixed temperature setpoints only',
      'Adaptive comfort model allowing higher temperatures in summer',
      'Mechanical cooling override required',
      'No thermal comfort criteria apply',
    ],
    correctAnswer: 1,
    explanation:
      'BREEAM accepts the adaptive comfort model (BS EN 15251 Category II) for naturally ventilated buildings, recognising that occupants tolerate higher temperatures when they have control and outdoor temperatures are elevated.',
  },
  {
    id: 7,
    question:
      'What is the typical ambient noise criterion for open-plan offices under BREEAM Hea 06?',
    options: ['NR 25', 'NR 35', 'NR 40', 'NR 45'],
    correctAnswer: 2,
    explanation:
      'BREEAM typically specifies NR 40 as the maximum background noise level for open-plan offices from building services. Private offices require lower levels (NR 35), and libraries or lecture theatres require NR 30 or lower.',
  },
  {
    id: 8,
    question: "What does the 'uniformity ratio' measure in BREEAM lighting assessments?",
    options: [
      'The colour rendering index of lamps',
      'The ratio of minimum to average illuminance',
      'The number of luminaires per square metre',
      'The daylight factor at the perimeter',
    ],
    correctAnswer: 1,
    explanation:
      'Uniformity ratio is the ratio of minimum illuminance to average illuminance across a task area. BREEAM requires a minimum uniformity of 0.4 for general lighting and 0.6 for task areas to ensure consistent light distribution.',
  },
  {
    id: 9,
    question: 'Which CIBSE document provides guidance on lighting quality referenced by BREEAM?',
    options: ['CIBSE Guide A', 'CIBSE Guide B', 'CIBSE LG7 (SLL Lighting Guide 7)', 'CIBSE TM52'],
    correctAnswer: 2,
    explanation:
      'CIBSE LG7 (now SLL Lighting Guide 7 - Offices) provides detailed guidance on lighting quality for offices, including illuminance levels, uniformity, glare ratings, and colour rendering requirements referenced by BREEAM.',
  },
  {
    id: 10,
    question:
      'What is the Unified Glare Rating (UGR) limit typically specified for office lighting?',
    options: ['UGR < 16', 'UGR < 19', 'UGR < 22', 'UGR < 28'],
    correctAnswer: 1,
    explanation:
      'BREEAM and lighting standards typically specify UGR < 19 for office environments. Lower values (UGR < 16) apply to detailed drawing work, while higher values (UGR < 22) may be acceptable for circulation areas.',
  },
  {
    id: 11,
    question:
      'What is the purpose of post-occupancy evaluation (POE) under BREEAM Health and Wellbeing?',
    options: [
      'To verify construction quality only',
      'To assess occupant satisfaction and building performance after handover',
      'To calculate energy consumption',
      'To complete snagging lists',
    ],
    correctAnswer: 1,
    explanation:
      'Post-occupancy evaluation assesses actual occupant satisfaction with comfort conditions, identifies performance gaps between design intent and reality, and provides feedback for continuous improvement.',
  },
  {
    id: 12,
    question:
      'Under BREEAM, what fresh air rate applies to high-occupancy spaces like meeting rooms?',
    options: [
      '8 litres per second per person',
      '10 litres per second per person',
      '12 litres per second per person',
      'Based on CO2 demand control only',
    ],
    correctAnswer: 2,
    explanation:
      'High-occupancy spaces like meeting rooms typically require 12 litres per second per person to maintain air quality during peak occupancy. CO2 demand control can modulate rates between minimum and design maximum.',
  },
];

const faqs = [
  {
    question: 'How does BREEAM balance daylighting with overheating risk?',
    answer:
      'BREEAM requires a holistic approach: adequate daylight factors must be achieved alongside glare control (Hea 03) and thermal comfort (Hea 05). Large glazed areas that provide good daylight must incorporate solar shading, high-performance glazing (low g-values), or automated blinds. The thermal model must demonstrate compliance with overheating criteria (CIBSE TM52/TM59) while maintaining daylight targets. This often requires careful facade design with external shading, fritted glass, or electrochromic glazing.',
  },
  {
    question: 'What evidence is required for BREEAM indoor air quality credits?',
    answer:
      'Evidence includes: specification of ventilation rates meeting CIBSE Guide A or BS EN 16798-1; CO2 monitoring strategy with sensors in high-occupancy zones; product certifications for low-VOC materials (paints, adhesives, sealants, flooring); filtration grades for air handling units (typically F7 or higher); and commissioning records demonstrating achieved air flow rates. Post-construction IAQ testing may be required for higher credit levels.',
  },
  {
    question: 'How do acoustic requirements vary by space type?',
    answer:
      'BREEAM acoustic criteria align with Building Bulletin 93 (schools), HTM 08-01 (healthcare), and BS 8233 (general buildings). Offices typically require NR 40 open-plan, NR 35 cellular. Classrooms need NR 30-35 with reverberation time under 0.8s. Healthcare consulting rooms need sound insulation DnT,w ≥ 45 dB. Each space type has specific criteria for ambient noise, sound insulation, and reverberation appropriate to its function.',
  },
  {
    question: 'What is the relationship between BREEAM and WELL Building Standard?',
    answer:
      'BREEAM and WELL both address occupant health but with different emphases. BREEAM covers broader sustainability (energy, water, ecology) with Health and Wellbeing as one category. WELL focuses exclusively on occupant health with more detailed requirements (air, water, nourishment, light, fitness, comfort, mind). Many projects pursue both certifications. Credits can overlap - good daylighting, IAQ, and thermal comfort strategies serve both. WELL generally has stricter health-focused thresholds.',
  },
  {
    question: 'How does demand-controlled ventilation affect BREEAM compliance?',
    answer:
      'Demand-controlled ventilation (DCV) using CO2 sensors can earn additional credits by optimising air quality while reducing energy use. However, the system must maintain minimum fresh air rates regardless of occupancy (typically 0.1-0.15 l/s/m2 or specific per-person minimums). CO2 setpoints should be 800-1000 ppm with ramp-up to design ventilation rates. DCV must be commissioned to demonstrate responsiveness and minimum rates, with sensors calibrated and located appropriately.',
  },
  {
    question: 'What lighting controls are required for BREEAM Health and Wellbeing credits?',
    answer:
      'BREEAM requires lighting controls that allow occupants to adjust illuminance to suit their needs. This includes: zoning controls (separate switching for daylit and non-daylit zones); occupancy/absence detection in appropriate spaces; daylight-linked dimming to maintain illuminance while reducing energy use; and manual override capability. Task lighting at workstations provides individual control. The goal is to balance energy efficiency with occupant satisfaction and visual comfort.',
  },
];

const HNCModule6Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3 · Subsection 5"
            title="BREEAM Health and Wellbeing"
            description="Daylighting, artificial lighting quality, indoor air quality, thermal comfort, and acoustic performance assessment"
            tone="purple"
          />

          <TLDR
            points={[
              "Hea 01–08 covers visual comfort (daylighting, glare, lighting controls, view-out), indoor air quality (low-VOC, ventilation, post-construction commissioning), thermal comfort (overheating analysis, controls), acoustics, water quality (Legionella, drinking water), security (Secured by Design), private space, and inclusive design.",
              "Hea 02 (indoor air quality) requires a low-emitting materials strategy + post-occupancy IAQ measurement (TVOC, formaldehyde) — this is one of the most often-failed credits at post-construction.",
              "Hea 04 (thermal comfort) requires CIBSE TM52 (or TM59 for residential) overheating analysis — the methodology now mandated by Building Regulations Part O.",
            ]}
          />

          <RegsCallout
            source="CIBSE TM52 (non-residential) / TM59 (residential) — Overheating Risk Assessment + Building Regulations Part O"
            clause="For residential premises, an overheating risk analysis shall be carried out using CIBSE TM59 (free running) or the simplified method in Part O Schedule 1, comparing predicted operative temperature against the criteria in CIBSE TM52: criterion 1 (number of hours operative temperature exceeds 26°C limit), criterion 2 (weighted exceedance of comfort range), criterion 3 (absolute exceedance of 32°C). All three criteria must be met; failure of any one is non-compliant."
            meaning={
              <>
                Part O makes overheating analysis a Building Regulations requirement, not a BREEAM extra. The TM59 / Part O simplified method is mandatory. BREEAM Hea 04 sits on top of this — additional credits for analysis sensitivity, post-occupancy monitoring, and adaptive comfort considerations. Overheating risk in deep-plan or single-aspect dwellings is the single largest design issue post-Part O.
              </>
            }
            cite="Source: CIBSE TM52 (2013), TM59 (2017); Approved Document O: Overheating, 2021 edition — gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Apply BREEAM Hea 01-03 visual comfort criteria for daylighting and views",
              "Specify ventilation systems meeting Hea 04 indoor air quality requirements",
              "Design for Hea 05 thermal comfort using adaptive and PMV models",
              "Achieve Hea 06 acoustic performance targets for various building types",
              "Integrate artificial lighting quality with energy efficiency objectives",
              "Evaluate occupant wellbeing through post-occupancy assessment",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Visual Comfort - Daylighting and Views (Hea 01-03)">
            <p>BREEAM Health and Wellbeing addresses occupant comfort through multiple interconnected criteria. Visual comfort encompasses daylighting provision (Hea 01), view out to the external environment (Hea 02), and glare control to prevent discomfort (Hea 03). These criteria recognise that natural light and external views significantly impact occupant wellbeing and productivity.</p>
            <p><strong>Hea 01 - Visual Comfort (Daylighting)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Average daylight factor:</strong> Minimum 2% for offices, 2.5% for schools, 3% for hospitals</li>
              <li><strong>Uniformity:</strong> Minimum daylight factor at least 0.4 times the average</li>
              <li><strong>Room depth criterion:</strong> No part of working plane further than 6m from window</li>
              <li><strong>Daylight assessment:</strong> Climate-based daylight modelling (CBDM) preferred</li>
            </ul>
            <p><strong>Daylight Assessment Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Daylight Factor (DF):</strong> Ratio of internal to external illuminance (%) — Baseline compliance route</li>
              <li><strong>Spatial Daylight Autonomy (sDA):</strong> % floor area receiving 300 lux for 50% of hours — Alternative CBDM route</li>
              <li><strong>Annual Sunlight Exposure (ASE):</strong> % area receiving 1000 lux for 250+ hours — Overheating/glare indicator</li>
              <li><strong>Useful Daylight Illuminance (UDI):</strong> Hours within 100-3000 lux range — Comfort-based metric</li>
            </ul>
            <p><strong>Hea 02 - View Out Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Coverage:</strong> 95% of net internal area must have adequate view</li>
              <li><strong>View quality:</strong> Direct line of sight to sky, ground, or landscape</li>
              <li><strong>Glazing:</strong> Clear glass at eye level (minimum visible light transmittance 50%)</li>
              <li><strong>Distance:</strong> Workstations within 7m of perimeter glazing</li>
            </ul>
            <p><strong>Hea 03 - Glare Control Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Internal blinds:</strong> Adjustable venetian, roller, or vertical blinds</li>
              <li><strong>External shading:</strong> Brise soleil, overhangs, external louvres</li>
              <li><strong>Mid-pane blinds:</strong> Integral blinds within double-glazed units</li>
              <li><strong>Automated systems:</strong> Solar-tracking blinds or electrochromic glass</li>
              <li><strong>Manual override:</strong> Occupant control required regardless of automation</li>
            </ul>
            <p><strong>Design integration:</strong> Balance daylight, views, and glare control with thermal performance - excessive glazing increases cooling loads whilst inadequate glazing limits daylight and views.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Indoor Air Quality (Hea 04)">
            <p>BREEAM Hea 04 addresses indoor air quality through ventilation provision, pollutant control, and monitoring systems. Poor IAQ affects occupant health, comfort, and cognitive performance. The criteria ensure adequate fresh air supply whilst minimising exposure to internal and external pollution sources.</p>
            <p><strong>Ventilation Rates</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Offices: 10 l/s/person</li>
              <li>Meeting rooms: 12 l/s/person</li>
              <li>Classrooms: 8-10 l/s/person</li>
              <li>Retail: 10-15 l/s/person</li>
            </ul>
            <p><strong>CO2 Monitoring</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Target: Below 1000 ppm</li>
              <li>Alert threshold: 1200 ppm</li>
              <li>Sensor locations: Breathing zone</li>
              <li>BMS integration required</li>
            </ul>
            <p><strong>Filtration</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>AHU filters: Minimum F7</li>
              <li>Higher pollution: F8/F9</li>
              <li>Pre-filters for protection</li>
              <li>Access for maintenance</li>
            </ul>
            <p><strong>Pollutant Source Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Paints and coatings:</strong> Low VOC specification — EU Ecolabel or equivalent</li>
              <li><strong>Adhesives and sealants:</strong> VOC content limits — EC1 Plus certification</li>
              <li><strong>Flooring:</strong> Emission testing required — FloorScore or M1</li>
              <li><strong>Formaldehyde (wood products):</strong> Low emission boards — E1 classification maximum</li>
              <li><strong>External pollution:</strong> Air intake location — Away from traffic, exhausts</li>
            </ul>
            <p><strong>Demand-Controlled Ventilation (DCV)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CO2 sensors:</strong> NDIR type, calibrated accuracy ±75 ppm</li>
              <li><strong>Setpoint:</strong> Typically 800-1000 ppm to ramp up ventilation</li>
              <li><strong>Minimum rate:</strong> Maintain base ventilation regardless of occupancy</li>
              <li><strong>Response time:</strong> System should respond within 5-10 minutes</li>
              <li><strong>Energy benefit:</strong> 20-40% HVAC energy savings versus fixed rate</li>
            </ul>
            <p><strong>Commissioning requirement:</strong> Air flow rates must be measured and documented during commissioning, with results within 10% of design values.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Thermal Comfort (Hea 05)">
            <p>BREEAM Hea 05 ensures buildings provide appropriate thermal conditions for occupant comfort and productivity. The criteria reference BS EN 16798-1 (formerly BS EN 15251) and recognise different comfort models for mechanically cooled and naturally ventilated buildings.</p>
            <p><strong>BS EN 16798-1 Comfort Categories</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Category I:</strong> High expectation - PPD &lt; 6% (23-26°C summer, 21-23°C winter)</li>
              <li><strong>Category II:</strong> Normal expectation - PPD &lt; 10% (22-27°C summer, 20-24°C winter)</li>
              <li><strong>Category III:</strong> Moderate expectation - PPD &lt; 15% (21-28°C summer, 19-25°C winter)</li>
              <li><strong>Category IV:</strong> Outside normal criteria (only for limited periods)</li>
            </ul>
            <p><strong>Thermal Comfort Models</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>PMV/PPD (Fanger):</strong> Mechanically conditioned spaces — Fixed temperature bands, RH 40-60%</li>
              <li><strong>Adaptive Comfort:</strong> Naturally ventilated buildings — Running mean outdoor temperature linked</li>
              <li><strong>Mixed Mode:</strong> Combined natural/mechanical — Changeover strategy defined</li>
            </ul>
            <p><strong>BREEAM Thermal Comfort Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Thermal modelling:</strong> Dynamic simulation demonstrating comfort compliance</li>
              <li><strong>Overheating analysis:</strong> CIBSE TM52 (non-domestic) or TM59 (domestic) criteria</li>
              <li><strong>Zoning:</strong> Separate thermal zones for perimeter/core, different orientations</li>
              <li><strong>Control:</strong> User-adjustable thermostats, maximum 4°C adjustment range</li>
              <li><strong>Humidity:</strong> Maintained within 40-60% RH where humidification provided</li>
              <li><strong>Air velocity:</strong> Less than 0.25 m/s in occupied zone (winter heating)</li>
            </ul>
            <p><strong>CIBSE TM52 Overheating Criteria</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Criterion 1:</strong> Hours exceeding threshold &lt; 3%</li>
              <li><strong>Criterion 2:</strong> Daily weighted exceedance ≤ 6</li>
              <li><strong>Criterion 3:</strong> Absolute maximum 4K above threshold</li>
              <li>Fail if 2 or more criteria exceeded</li>
            </ul>
            <p><strong>Design Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Passive:</strong> Thermal mass, night purge, shading</li>
              <li><strong>Active:</strong> Mechanical cooling, heat pumps</li>
              <li><strong>Controls:</strong> Optimiser, weather compensation</li>
              <li><strong>User:</strong> Openable windows, local adjustment</li>
            </ul>
            <p><strong>Adaptive comfort advantage:</strong> Naturally ventilated buildings can accept higher summer temperatures (up to 28°C+) when occupants have control, reducing or eliminating cooling energy requirements.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Acoustic Performance and Lighting Quality (Hea 06)">
            <p>BREEAM Hea 06 addresses acoustic comfort through ambient noise control, sound insulation between spaces, and reverberation management. Combined with artificial lighting quality requirements, these criteria ensure buildings provide comfortable environments for their intended activities.</p>
            <p><strong>Ambient Noise Criteria (NR Ratings)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Concert hall:</strong> NR 15-20 — HVAC, external ingress</li>
              <li><strong>Library / lecture theatre:</strong> NR 25-30 — Terminal units, lighting</li>
              <li><strong>Classroom:</strong> NR 30-35 — Ventilation, corridor noise</li>
              <li><strong>Private office:</strong> NR 35 — FCUs, diffusers</li>
              <li><strong>Open-plan office:</strong> NR 40 — AHU breakout, grilles</li>
              <li><strong>Retail / circulation:</strong> NR 45-50 — General building services</li>
            </ul>
            <p><strong>Sound Insulation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Office partitions:</strong> DnT,w ≥ 35-40 dB (cellular offices)</li>
              <li><strong>Meeting rooms:</strong> DnT,w ≥ 45 dB for confidential discussions</li>
              <li><strong>Healthcare consulting:</strong> DnT,w ≥ 45-50 dB (patient privacy)</li>
              <li><strong>Floor separations:</strong> L'nT,w ≤ 55-60 dB (impact sound)</li>
              <li><strong>Plant rooms:</strong> Rated enclosures, anti-vibration mounts</li>
            </ul>
            <p><strong>Artificial Lighting Quality Metrics</strong></p>
            <p><strong>Illuminance Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>General office: 300-500 lux</li>
              <li>Drawing/CAD: 500-750 lux</li>
              <li>Corridors: 100-150 lux</li>
              <li>Retail: 300-750 lux</li>
              <li>Uniformity: ≥ 0.4 general, ≥ 0.6 task</li>
            </ul>
            <p><strong>Quality Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UGR: ≤ 19 (offices), ≤ 16 (drawing)</li>
              <li>CRI: ≥ 80 general, ≥ 90 colour-critical</li>
              <li>CCT: 3000-4000K typical offices</li>
              <li>Flicker: ≤ 3% at 100Hz</li>
              <li>Circadian consideration for 24hr spaces</li>
            </ul>
            <p><strong>Reverberation Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Classroom:</strong> 0.4-0.8 seconds — Acoustic ceiling, wall panels</li>
              <li><strong>Open-plan office:</strong> 0.5-0.8 seconds — Suspended ceiling, carpet</li>
              <li><strong>Meeting room:</strong> 0.4-0.6 seconds — Wall absorption, ceiling</li>
              <li><strong>Atrium / reception:</strong> 1.0-1.5 seconds — Baffles, soffit treatment</li>
            </ul>
            <p><strong>Building services noise:</strong> Early coordination with mechanical design is essential - ductwork velocities, attenuator positions, and equipment selections significantly impact achievable NR levels.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Office Daylighting Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Verify BREEAM Hea 01 compliance for a 12m deep office floor plate.</p>
            <p>Given data:</p>
            <p>Floor depth: 12m from facade</p>
            <p>Floor-to-ceiling height: 2.7m</p>
            <p>Window head height: 2.5m</p>
            <p>Glazing ratio: 50% of facade</p>
            <p>Visible light transmittance: 65%</p>
            <p>Daylight factor calculation (simplified):</p>
            <p>Average DF = (A_window × VLT × 0.85) / (A_floor × (1 - R_mean))</p>
            <p>Perimeter zone (0-6m): DF ≈ 3.2%</p>
            <p>Core zone (6-12m): DF ≈ 1.1%</p>
            <p>Assessment:</p>
            <p>Average across floor: 2.15% - <span>COMPLIANT</span></p>
            <p>Uniformity: 1.1/2.15 = 0.51 -  <span>COMPLIANT (≥0.4)</span></p>
            <p>Note: Core requires supplementary artificial lighting</p>
            <p>
              <strong>Example 2: Ventilation Rate Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Determine fresh air requirement for a 50-person meeting room.</p>
            <p>BREEAM Hea 04 requirement:</p>
            <p>Meeting room rate: 12 l/s/person</p>
            <p>Fresh air = 50 persons × 12 l/s</p>
            <p>Fresh air = 600 l/s = 0.6 m³/s</p>
            <p>Air changes (room 100m², 3m height):</p>
            <p>Room volume: 300 m³</p>
            <p>ACH = (0.6 × 3600) / 300 = 7.2 air changes/hour</p>
            <p>CO2 monitoring setpoints:</p>
            <p>Minimum ventilation (unoccupied): 150 l/s (0.5 l/s/m²)</p>
            <p>Ramp-up trigger: 800 ppm CO2</p>
            <p>Design ventilation: 600 l/s at 1000 ppm</p>
            <p>System sized for peak with DCV for part-load efficiency</p>
            <p>
              <strong>Example 3: Acoustic Design for Open-Plan Office</strong>
            </p>
            <p><strong>Scenario:</strong> Specify building services to achieve NR 40 in open-plan office.</p>
            <p>Noise budget (summing to NR 40):</p>
            <p>Supply air diffusers: NR 32 (NC 30)</p>
            <p>Return air grilles: NR 30</p>
            <p>FCU/chilled beams: NR 28</p>
            <p>Lighting (LED drivers): NR 20</p>
            <p>External ingress: NR 25</p>
            <p>Logarithmic addition:</p>
            <p>Combined = 10 × log10(10^3.2 + 10^3.0 + 10^2.8 + 10^2.0 + 10^2.5)</p>
            <p>Combined ≈ NR 36</p>
            <p>Result: NR 36 achieved, within NR 40 target</p>
            <p>Key specifications:</p>
            <p>- Diffuser velocity: Max 2.5 m/s neck velocity</p>
            <p>- Duct attenuation: 1m lined duct before diffuser</p>
            <p>- FCU selection: Low-noise units, silent mode capability</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>BREEAM Health and Wellbeing Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete daylight modelling early in design - facade changes are costly</li>
              <li>Specify low-VOC materials throughout - obtain certifications pre-construction</li>
              <li>Coordinate acoustic requirements with MEP consultant from RIBA Stage 2</li>
              <li>Include CO2 sensors in BMS specification with clear control strategy</li>
              <li>Verify glare control meets both manual override and automation requirements</li>
              <li>Commission thermal comfort and ventilation systems before occupation</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Daylight factor: <strong>2% average</strong> for offices (minimum)</li>
              <li>Fresh air: <strong>10 l/s/person</strong> offices, <strong>12 l/s/person</strong>  meeting rooms</li>
              <li>CO2 target: <strong>Below 1000 ppm</strong> (alert at 1200 ppm)</li>
              <li>Office noise: <strong>NR 40</strong> open-plan, <strong>NR 35</strong> cellular</li>
              <li>Lighting UGR: <strong>≤ 19</strong> for VDU work</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Late daylight assessment</strong> - modelling after facade design fixed limits options</li>
                <li><strong>Ignoring glare</strong> - high daylight factors without shading cause discomfort</li>
                <li><strong>Undersized ventilation</strong> - design for peak occupancy, not typical</li>
                <li><strong>Acoustic afterthought</strong> - attenuators and treatments cost more when retrofitted</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Post-occupancy IAQ test fails formaldehyde threshold"
            situation={
              <>
                Hea 02 was claimed at design stage with low-VOC materials specified throughout. Post-occupancy IAQ testing six weeks after handover shows formaldehyde at 105 µg/m³ — above the BREEAM 100 µg/m³ threshold. The flush-out period was 2 weeks; the building has been occupied since.
              </>
            }
            whatToDo={
              <>
                Investigate source — typically MDF furniture, finished joinery or carpet adhesive that was not on the low-VOC specification. Increase ventilation rates for an extended flush period (2–4 additional weeks at boost), re-test, and provide the assessor with the full test dataset. If still failing, the source material may need replacement (unlikely to be commercially viable post-occupancy). Lesson: tenant fit-out furniture and finishes must be controlled with the same low-VOC specification as the base build, or claim the credit only on base build elements.
              </>
            }
            whyItMatters={
              <>
                IAQ post-occupancy testing exposes the gap between design intent and construction execution. Tenant fit-out is the most common contamination source — the credit is often won on the base build and lost on the fit-out. WELL Building Standard treats this even more rigorously; BREEAM is now catching up.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Hea 01: daylighting (average daylight factor 2%+ with good distribution), view-out, glare control.",
              "Hea 02: low-VOC materials + post-occupancy IAQ test (TVOC ≤300 µg/m³, formaldehyde ≤100 µg/m³).",
              "Hea 04: TM52/TM59 overheating analysis — now mandatory under Part O.",
              "Hea 05: acoustics — speech intelligibility, ambient noise, reverberation per BB93 (schools), HTM 08-01 (healthcare).",
              "Hea 06: water hygiene — Legionella risk assessment per HSG274 + L8 ACoP.",
              "Hea 07: Secured by Design — Police-approved security strategy.",
              "Hea 08: inclusive design — Equality Act 2010 + BS 8300.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Materials and waste
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Evidence and certification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section3_5;
