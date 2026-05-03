/**
 * Module 8 · Section 2 · Subsection 1 — Ventilation Principles
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Air change rates, fresh air requirements, contaminant control and ventilation standards for building services
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

const TITLE = 'Ventilation Principles - HNC Module 8 Section 2.1';
const DESCRIPTION =
  'Master ventilation principles for building services: air change rates, fresh air requirements per person, contaminant control, CO2 as ventilation indicator, Building Regulations Part F, CIBSE Guide B, natural vs mechanical ventilation and IAQ standards.';

const quickCheckQuestions = [
  {
    id: 'air-change-rate',
    question:
      'What is the typical air change rate recommended for a general office space according to CIBSE guidelines?',
    options: ['2-4 ACH', '4-6 ACH', '6-10 ACH', '10-15 ACH'],
    correctIndex: 1,
    explanation:
      'CIBSE Guide A recommends 4-6 air changes per hour for general office spaces. This provides adequate fresh air whilst maintaining energy efficiency. Higher ACH rates are required for spaces with higher pollutant loads or occupancy densities.',
  },
  {
    id: 'fresh-air-rate',
    question:
      'What is the minimum fresh air supply rate per person specified in Building Regulations Approved Document F for offices?',
    options: ['5 litres/second', '8 litres/second', '10 litres/second', '15 litres/second'],
    correctIndex: 2,
    explanation:
      'Approved Document F specifies a minimum of 10 litres/second per person for offices. This ensures adequate dilution of bioeffluents and maintains acceptable indoor air quality. The rate may need increasing for spaces with additional pollutant sources.',
  },
  {
    id: 'co2-level',
    question:
      'At what CO2 concentration level does indoor air quality typically become unacceptable according to UK standards?',
    options: ['450 ppm', '800 ppm', '1000 ppm', '1500 ppm'],
    correctIndex: 2,
    explanation:
      'CO2 levels above 1000 ppm indicate inadequate ventilation. Outdoor air contains approximately 400-450 ppm CO2. CIBSE recommends maintaining indoor CO2 below 1000 ppm for good air quality, with 800 ppm being the target for well-ventilated spaces.',
  },
  {
    id: 'natural-ventilation',
    question:
      'What is the maximum recommended room depth for effective single-sided natural ventilation?',
    options: [
      '2 x ceiling height',
      '2.5 x ceiling height',
      '3 x ceiling height',
      '5 x ceiling height',
    ],
    correctIndex: 1,
    explanation:
      'Single-sided natural ventilation is typically limited to 2.5 times the ceiling height in depth. Beyond this, air movement becomes insufficient for adequate ventilation. Cross-ventilation can extend this to approximately 5 times the ceiling height.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of ventilation in occupied buildings?',
    options: [
      'To provide cooling only',
      'To dilute and remove indoor air pollutants whilst supplying fresh air',
      'To create positive pressure throughout the building',
      'To reduce heating energy consumption',
    ],
    correctAnswer: 1,
    explanation:
      'The primary purpose of ventilation is to dilute and remove indoor air pollutants (including CO2, odours, and volatile organic compounds) whilst providing fresh outdoor air for occupants. Temperature control, whilst important, is a secondary function that may be integrated with ventilation systems.',
  },
  {
    id: 2,
    question:
      'According to CIBSE Guide B, what fresh air supply rate is recommended for a classroom?',
    options: ['5 L/s per person', '8 L/s per person', '10 L/s per person', '12 L/s per person'],
    correctAnswer: 1,
    explanation:
      'CIBSE Guide B recommends 8 L/s per person for classrooms. This accounts for the higher metabolic rates of children and the importance of maintaining good air quality for learning. Schools often require higher ventilation rates due to occupancy density.',
  },
  {
    id: 3,
    question:
      'Building Regulations Approved Document F requires what minimum whole building ventilation rate for dwellings?',
    options: [
      '0.3 L/s per m squared floor area',
      '0.5 L/s per m squared floor area',
      '1.0 L/s per m squared floor area',
      '1.5 L/s per m squared floor area',
    ],
    correctAnswer: 0,
    explanation:
      'Approved Document F requires a minimum whole building ventilation rate of 0.3 L/s per m squared of internal floor area for dwellings. This baseline rate ensures continuous background ventilation to maintain acceptable indoor air quality.',
  },
  {
    id: 4,
    question:
      'What is the recommended CO2 concentration for a well-ventilated space according to CIBSE guidance?',
    options: ['Less than 600 ppm', 'Less than 800 ppm', 'Less than 1000 ppm', 'Less than 1500 ppm'],
    correctAnswer: 1,
    explanation:
      'CIBSE recommends maintaining CO2 below 800 ppm for well-ventilated spaces. This provides a significant margin below the 1000 ppm threshold where occupants may begin to experience discomfort or reduced cognitive performance.',
  },
  {
    id: 5,
    question: 'What air change rate does CIBSE recommend for hospital operating theatres?',
    options: ['6-10 ACH', '10-15 ACH', '15-25 ACH', '25-35 ACH'],
    correctAnswer: 2,
    explanation:
      'Hospital operating theatres require 15-25 air changes per hour to maintain sterile conditions and remove anaesthetic gases. Ultra-clean ventilation (UCV) theatres for orthopaedic procedures may require even higher rates with laminar flow systems.',
  },
  {
    id: 6,
    question: 'Which contaminant is primarily controlled by kitchen extract ventilation?',
    options: [
      'Carbon monoxide only',
      'Grease-laden air, odours and combustion products',
      'Radon gas',
      'Carbon dioxide only',
    ],
    correctAnswer: 1,
    explanation:
      'Kitchen extract ventilation is designed to remove grease-laden air, cooking odours, moisture and combustion products from gas appliances. Grease filtration is essential to prevent fire hazards and ductwork contamination.',
  },
  {
    id: 7,
    question:
      'What is the minimum extract rate for a domestic bathroom with no openable window per Building Regulations?',
    options: ['8 L/s', '15 L/s', '30 L/s', '60 L/s'],
    correctAnswer: 1,
    explanation:
      'An internal bathroom without natural ventilation requires a minimum continuous extract rate of 8 L/s or an intermittent rate of 15 L/s during use. This removes moisture and odours to prevent condensation and maintain hygiene.',
  },
  {
    id: 8,
    question: 'Cross-ventilation in buildings is most effective when:',
    options: [
      'Openings are on the same wall',
      'Openings are on opposite or adjacent walls',
      'The building is fully sealed',
      'Wind speeds are below 1 m/s',
    ],
    correctAnswer: 1,
    explanation:
      'Cross-ventilation requires openings on opposite or adjacent walls to create a pressure differential that drives airflow through the space. This is far more effective than single-sided ventilation and allows deeper floor plates to be naturally ventilated.',
  },
  {
    id: 9,
    question: "What does the term 'infiltration' refer to in ventilation terminology?",
    options: [
      'Intentional air supply through ventilation systems',
      'Uncontrolled air leakage through the building envelope',
      'Extract of contaminated air',
      'Recirculation of indoor air',
    ],
    correctAnswer: 1,
    explanation:
      'Infiltration refers to uncontrolled air leakage through cracks, gaps and openings in the building envelope. Whilst it provides some ventilation, it cannot be controlled and may cause draughts and energy losses. Modern buildings aim to minimise infiltration and provide controlled ventilation.',
  },
  {
    id: 10,
    question: 'What is the stack effect in natural ventilation?',
    options: [
      'The effect of wind on building pressure',
      'The buoyancy-driven air movement due to temperature difference',
      'The mechanical pressurisation of stairwells',
      'The filtering effect of air handling units',
    ],
    correctAnswer: 1,
    explanation:
      'The stack effect occurs when warm air rises and exits at high level, drawing cooler air in at low level. The driving force is proportional to the temperature difference and the height of the stack. This principle is used in atria and chimney ventilation systems.',
  },
  {
    id: 11,
    question:
      'According to CIBSE, what is the recommended ventilation effectiveness factor for displacement ventilation?',
    options: ['0.5', '0.8-1.0', '1.0-1.2', '1.5-2.0'],
    correctAnswer: 2,
    explanation:
      'Displacement ventilation achieves ventilation effectiveness of 1.0-1.2 because fresh air is supplied at low level and rises past occupants before being extracted at ceiling level. This creates stratification that improves air quality in the breathing zone compared to mixing ventilation.',
  },
  {
    id: 12,
    question: 'What is the purpose of demand-controlled ventilation (DCV)?',
    options: [
      'To provide maximum ventilation at all times',
      'To adjust ventilation rates based on actual occupancy or pollutant levels',
      'To eliminate the need for outdoor air',
      'To maintain constant positive pressure',
    ],
    correctAnswer: 1,
    explanation:
      'Demand-controlled ventilation adjusts the outdoor air supply rate based on actual occupancy (using CO2 sensors, occupancy sensors or scheduling) rather than providing maximum ventilation continuously. This significantly reduces energy consumption whilst maintaining acceptable indoor air quality.',
  },
  {
    id: 13,
    question:
      'Which UK regulation sets minimum ventilation requirements for non-domestic buildings?',
    options: [
      'Building Regulations Part L',
      'Building Regulations Part F',
      'Building Regulations Part J',
      'Building Regulations Part M',
    ],
    correctAnswer: 1,
    explanation:
      'Building Regulations Approved Document F (Ventilation) sets minimum ventilation requirements for both domestic and non-domestic buildings. It covers fresh air supply rates, extract rates, and system specifications to ensure adequate indoor air quality.',
  },
  {
    id: 14,
    question: 'What concentration of formaldehyde triggers concern for indoor air quality?',
    options: [
      'Greater than 0.01 ppm',
      'Greater than 0.1 ppm',
      'Greater than 1.0 ppm',
      'Greater than 10 ppm',
    ],
    correctAnswer: 1,
    explanation:
      'WHO guidelines recommend formaldehyde concentrations remain below 0.1 ppm (100 micrograms per cubic metre). Higher levels can cause eye and respiratory irritation. Formaldehyde is emitted from building materials, furniture and cleaning products.',
  },
  {
    id: 15,
    question: 'For a restaurant dining area, what air change rate does CIBSE recommend?',
    options: ['4-6 ACH', '6-10 ACH', '10-15 ACH', '15-20 ACH'],
    correctAnswer: 2,
    explanation:
      'Restaurant dining areas typically require 10-15 ACH to remove cooking odours that migrate from the kitchen, body odours from high occupancy, and to maintain comfort. Kitchen areas themselves require even higher rates (20-30 ACH) with dedicated extract systems.',
  },
];

const faqs = [
  {
    question: 'How do I calculate the required ventilation rate for a specific space?',
    answer:
      'Calculate using two methods and select the greater: (1) Per-person rate method: multiply occupancy by L/s per person from CIBSE Guide A or Building Regulations. For offices, 10 L/s per person multiplied by expected occupancy. (2) Air change rate method: multiply room volume by recommended ACH, then divide by 3600 to get L/s. For example, a 200 m cubed office requiring 6 ACH needs 200 multiplied by 6, divided by 3.6 = 333 L/s. Compare both results and design for the higher value.',
  },
  {
    question: 'When should mechanical ventilation be used instead of natural ventilation?',
    answer:
      'Mechanical ventilation is required when: (1) The building is deep-plan with rooms exceeding 2.5 times ceiling height from windows, (2) External noise or pollution prevents opening windows, (3) Consistent air quality is critical such as in laboratories and healthcare, (4) Heat recovery is required to meet Part L energy targets, (5) Precise temperature and humidity control is needed, (6) Extract of specific contaminants is required such as in kitchens and WCs. Mixed-mode systems combining natural and mechanical ventilation can offer flexibility.',
  },
  {
    question: 'How does CO2-based demand control ventilation work?',
    answer:
      'CO2 sensors measure indoor concentration, typically in the return air duct or within the occupied zone. When CO2 rises above setpoint (commonly 800-1000 ppm), the controller increases outdoor air damper position or fan speed. As CO2 falls, ventilation reduces to a minimum background level. This matches ventilation to actual occupancy rather than assumed maximum, typically saving 20-30% of ventilation energy. Sensors require regular calibration and strategic positioning away from supply diffusers.',
  },
  {
    question: 'What are the key differences between displacement and mixing ventilation?',
    answer:
      'Displacement ventilation supplies cool air at low level (floor or low-wall diffusers at around 0.25 m/s) which rises as it warms, creating stratification with better air quality in the breathing zone. It achieves ventilation effectiveness greater than 1.0 but requires higher supply temperatures (typically 18-19 degrees Celsius) and low ceiling heights are problematic. Mixing ventilation supplies air at high velocity from ceiling diffusers, creating turbulent mixing throughout the space. It achieves effectiveness of 0.8-1.0 but offers better temperature uniformity and works with any ceiling height.',
  },
  {
    question:
      'How do Building Regulations Part F requirements differ for domestic and non-domestic buildings?',
    answer:
      'Domestic buildings under Part F require: whole building rate of 0.3 L/s per square metre, extract rates for kitchens (30 L/s intermittent or 13 L/s continuous), bathrooms (15 L/s intermittent or 8 L/s continuous), and provisions for purge ventilation. Non-domestic buildings require: fresh air rates based on occupancy type (typically 10 L/s per person for offices), adequate extract from WCs, kitchens and car parks, and performance testing to demonstrate compliance. Non-domestic buildings also need to consider BREEAM credits for enhanced ventilation.',
  },
  {
    question: 'What indoor air quality parameters should be monitored beyond CO2?',
    answer:
      'Key parameters include: Temperature (20-24 degrees Celsius for comfort), Relative humidity (40-60% to prevent dryness and mould), PM2.5 and PM10 particulates (WHO limits are 15 and 45 micrograms per cubic metre), VOCs including formaldehyde (below 0.1 ppm), Carbon monoxide (where combustion appliances present, below 9 ppm), and Ozone (below 0.05 ppm). Modern BMS can integrate IAQ sensors to provide comprehensive monitoring and automated ventilation response.',
  },
];

const HNCModule8Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 2 · Subsection 1"
            title="Ventilation Principles"
            description="Air change rates, fresh air requirements, contaminant control and ventilation standards for building services"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate air change rates and fresh air requirements",
              "Understand Building Regulations Part F requirements",
              "Apply CIBSE Guide B ventilation criteria",
              "Use CO2 as an indoor air quality indicator",
              "Design for contaminant dilution and control",
              "Compare natural and mechanical ventilation strategies",
              "Specify demand-controlled ventilation systems",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Air Change Rates">
            <p>The air change rate (ACH) expresses how many times the entire volume of air within a space is replaced per hour. It is a fundamental metric for ventilation system design and performance assessment.</p>
            <p><strong>Air Change Rate Formula</strong></p>
            <p>ACH = (Q × 3600) / V</p>
            <p>Where Q = airflow rate (m³/s), V = room volume (m³)</p>
            <p><strong>Factors affecting required ACH:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Occupancy density:</strong> Higher densities require more air changes</li>
              <li><strong>Activity level:</strong> Exercise areas need more than sedentary spaces</li>
              <li><strong>Pollutant sources:</strong> Processes generating contaminants increase requirements</li>
              <li><strong>Ceiling height:</strong> Taller spaces may need higher ACH for equivalent air quality</li>
              <li><strong>Ventilation effectiveness:</strong> Mixing vs displacement systems affect requirements</li>
            </ul>
            <p><strong>CIBSE Recommended Air Change Rates</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>General offices:</strong> 4-6 — Based on typical occupancy density</li>
              <li><strong>Meeting rooms:</strong> 6-8 — Higher density, intermittent use</li>
              <li><strong>Classrooms:</strong> 5-8 — CO2 control critical for learning</li>
              <li><strong>Retail spaces:</strong> 6-10 — Variable occupancy patterns</li>
              <li><strong>Restaurant dining:</strong> 10-15 — Odour control, high occupancy</li>
              <li><strong>Commercial kitchens:</strong> 20-30 — Grease, heat, combustion products</li>
              <li><strong>Hospital wards:</strong> 6-10 — Infection control considerations</li>
              <li><strong>Operating theatres:</strong> 15-25 — Sterility, anaesthetic gas removal</li>
              <li><strong>Laboratories:</strong> 6-15 — Depends on hazard classification</li>
              <li><strong>Gymnasiums:</strong> 6-10 — High metabolic rates, odour control</li>
            </ul>
            <p><strong>Converting ACH to Flow Rate</strong></p>
            <p>Q (L/s) = (ACH × V) / 3.6</p>
            <p>Where V = room volume (m³)</p>
            <p>Example: A 150 m³ meeting room requiring 8 ACH needs: Q = (8 × 150) / 3.6 = 333 L/s</p>
            <p><strong>Design tip:</strong> Always verify ACH calculations against per-person fresh air rates and select the higher value. A low-occupancy space may need more than the ACH minimum, whilst a high-occupancy small room may exceed ACH requirements.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fresh Air Requirements">
            <p>Fresh air requirements ensure adequate outdoor air is supplied to dilute indoor pollutants, primarily human bioeffluents. Requirements are specified per person or per square metre depending on the standard applied.</p>
            <p><strong>Building Regulations Approved Document F</strong></p>
            <p>Part F sets minimum ventilation requirements for buildings in England and Wales. For non-domestic buildings, fresh air rates are specified based on space type and occupancy.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Offices:</strong> 10 L/s per person — Or 1.0 L/s per m² floor area</li>
              <li><strong>Classrooms:</strong> 8 L/s per person — Higher for science labs</li>
              <li><strong>Retail:</strong> 10 L/s per person — Based on typical occupancy</li>
              <li><strong>Restaurants:</strong> 10 L/s per person — Plus kitchen extract</li>
              <li><strong>Hotels (bedrooms):</strong> 10 L/s per person — Based on 2 occupants</li>
            </ul>
            <p><strong>CIBSE Guide B Fresh Air Recommendations</strong></p>
            <p>CIBSE provides more detailed guidance considering activity levels and ventilation effectiveness.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sedentary (offices):</strong> 8-10 — 10 m² per person</li>
              <li><strong>Light activity (retail):</strong> 10-12 — 5 m² per person</li>
              <li><strong>Moderate activity (teaching):</strong> 10-12 — 2 m² per person</li>
              <li><strong>Heavy activity (gym):</strong> 15-20 — 5 m² per person</li>
            </ul>
            <p><strong>Domestic Ventilation Requirements (Part F)</strong></p>
            <p><strong>Continuous Extract Rates</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Whole dwelling: 0.3 L/s per m² floor area</li>
              <li>Kitchen: 13 L/s minimum</li>
              <li>Bathroom: 8 L/s minimum</li>
              <li>Utility room: 8 L/s minimum</li>
            </ul>
            <p><strong>Intermittent Extract Rates</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Kitchen (adjacent hob): 30 L/s</li>
              <li>Kitchen (elsewhere): 60 L/s</li>
              <li>Bathroom: 15 L/s</li>
              <li>Utility room: 30 L/s</li>
            </ul>
            <p><strong>Ventilation Calculation Example</strong></p>
            <p><strong>Scenario:</strong> Open-plan office, 500 m² floor area, 50 occupants</p>
            <p><strong>Method 1 - Per person:</strong></p>
            <p>Q = 50 persons × 10 L/s = 500 L/s</p>
            <p><strong>Method 2 - Per floor area:</strong></p>
            <p>Q = 500 m² × 1.0 L/s per m² = 500 L/s</p>
            <p><strong>Method 3 - Air change rate (assume 3m ceiling, 6 ACH):</strong></p>
            <p>Volume = 500 × 3 = 1500 m³</p>
            <p>Q = (1500 × 6) / 3.6 = 2500 L/s</p>
            <p><strong>Design for higher value:</strong> 2500 L/s in this case</p>
            <p><strong>Note:</strong> The higher calculated value ensures adequate ventilation under all operating conditions. Demand-controlled ventilation can reduce actual airflow when occupancy is below design levels.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Contaminant Control and CO2 Monitoring">
            <p>Ventilation serves to dilute and remove indoor air contaminants to maintain acceptable indoor air quality (IAQ). Carbon dioxide (CO2) is widely used as a surrogate indicator for ventilation adequacy in occupied spaces.</p>
            <p><strong>Indoor Air Contaminants:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Bioeffluents:</strong> CO2, body odours, moisture from respiration and perspiration</li>
              <li><strong>VOCs:</strong> Volatile organic compounds from furnishings, cleaning products, paints</li>
              <li><strong>Particulates:</strong> Dust, fibres, pollen, aerosols</li>
              <li><strong>Combustion products:</strong> CO, NOx from gas appliances and vehicles</li>
              <li><strong>Biological:</strong> Bacteria, viruses, mould spores</li>
              <li><strong>Process emissions:</strong> Specific to activity (cooking, printing, manufacturing)</li>
            </ul>
            <p><strong>CO2 as a Ventilation Indicator</strong></p>
            <p>Humans exhale approximately 0.005 L/s of CO2 during sedentary activity. Indoor CO2 concentration directly correlates with the balance between occupant generation and dilution by outdoor air.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&lt;600:</strong> Excellent — Very good ventilation</li>
              <li><strong>600-800:</strong> Good — Adequate ventilation</li>
              <li><strong>800-1000:</strong> Acceptable — Minimum acceptable level</li>
              <li><strong>1000-1500:</strong> Poor — Inadequate - complaints likely</li>
              <li><strong>&gt;1500:</strong> Unacceptable — Requires immediate attention</li>
            </ul>
            <p><strong>Steady-State CO2 Calculation</strong></p>
            <p>Ci = Co + (N × G) / Q</p>
            <p>Ci = indoor CO2 (ppm), Co = outdoor CO2 (typically 400-450 ppm), N = number of occupants, G = CO2 generation per person (approximately 18 L/h sedentary), Q = outdoor airflow (L/h)</p>
            <p><strong>Demand-Controlled Ventilation (DCV)</strong></p>
            <p>DCV systems use CO2 sensors to modulate outdoor air supply based on actual occupancy rather than assumed maximum.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CO2 setpoint:</strong> Typically 800-1000 ppm depending on application</li>
              <li><strong>Control action:</strong> Modulate outdoor air damper or fan speed</li>
              <li><strong>Minimum position:</strong> Maintain baseline ventilation when unoccupied</li>
              <li><strong>Energy savings:</strong> Typically 20-30% reduction in ventilation energy</li>
              <li><strong>Sensor placement:</strong> Return air duct or within occupied zone at breathing height</li>
            </ul>
            <p><strong>Other IAQ Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Carbon monoxide (CO):</strong> &lt;9 ppm (8-hour average) — WHO</li>
              <li><strong>Formaldehyde (HCHO):</strong> &lt;0.1 ppm — WHO</li>
              <li><strong>Total VOCs:</strong> &lt;500 µg/m³ — BREEAM</li>
              <li><strong>PM2.5:</strong> &lt;15 µg/m³ (annual) — WHO 2021</li>
              <li><strong>PM10:</strong> &lt;45 µg/m³ (annual) — WHO 2021</li>
              <li><strong>Relative humidity:</strong> 40-60% — CIBSE</li>
            </ul>
            <p><strong>Important:</strong> CO2 monitoring alone does not detect all contaminants. Additional sensors for particulates, VOCs or specific gases may be required depending on the application. Healthcare and laboratory environments often need comprehensive IAQ monitoring.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Ventilation Strategies and Standards">
            <p>Ventilation strategies are selected based on building type, climate, energy requirements and indoor environment objectives. The main approaches are natural ventilation, mechanical ventilation and mixed-mode systems.</p>
            <p><strong>Natural Ventilation</strong></p>
            <p>Relies on wind pressure and buoyancy (stack effect) to drive airflow through openings in the building envelope.</p>
            <p><strong>Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No fan energy consumption</li>
              <li>Low maintenance requirements</li>
              <li>Occupant control and connection to outside</li>
              <li>No ductwork or plant space required</li>
            </ul>
            <p><strong>Limitations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dependent on weather conditions</li>
              <li>Limited depth (approximately 2.5× ceiling height single-sided)</li>
              <li>Noise and pollution from outside</li>
              <li>Security concerns with openable windows</li>
            </ul>
            <p><strong>Natural Ventilation Design Rules</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single-sided:</strong> Effective depth ≤ 2.5 × ceiling height</li>
              <li><strong>Cross-ventilation:</strong> Effective depth ≤ 5 × ceiling height</li>
              <li><strong>Stack ventilation:</strong> Requires height difference &gt;3m between inlet and outlet</li>
              <li><strong>Openable area:</strong> Typically 5% of floor area for purge ventilation</li>
            </ul>
            <p><strong>Mechanical Ventilation</strong></p>
            <p>Uses fans to provide controlled airflow, enabling heat recovery, filtration and precise environmental control.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Extract only (MEV):</strong> Mechanical extract with natural supply — Dwellings, small commercial</li>
              <li><strong>Supply only:</strong> Mechanical supply with natural exhaust — Rare - used for pressurisation</li>
              <li><strong>Balanced (MVHR):</strong> Supply and extract with heat recovery — Energy-efficient buildings</li>
              <li><strong>VAV:</strong> Variable air volume with zone control — Large commercial buildings</li>
              <li><strong>Displacement:</strong> Low-level supply, high-level extract — Atria, theatres, auditoria</li>
            </ul>
            <p><strong>Mixed-Mode Ventilation</strong></p>
            <p>Combines natural and mechanical ventilation to optimise comfort and energy performance throughout the year.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Concurrent:</strong> Natural and mechanical operate simultaneously</li>
              <li><strong>Changeover:</strong> Switches between natural and mechanical based on conditions</li>
              <li><strong>Zoned:</strong> Different strategies in different parts of building</li>
            </ul>
            <p><strong>Key Ventilation Standards and Guidance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Building Regs Part F:</strong> Statutory minimum — Minimum ventilation rates for compliance</li>
              <li><strong>CIBSE Guide A:</strong> Environmental criteria — Design temperatures, air quality targets</li>
              <li><strong>CIBSE Guide B:</strong> HVAC systems — Detailed ventilation design guidance</li>
              <li><strong>BS EN 16798-1:</strong> Indoor environment — IEQ categories and criteria</li>
              <li><strong>BREEAM:</strong> Sustainability rating — IAQ credits, monitoring requirements</li>
              <li><strong>WELL Standard:</strong> Health and wellbeing — Enhanced IAQ requirements</li>
              <li><strong>BB101:</strong> Schools — Ventilation criteria for educational buildings</li>
              <li><strong>HTM 03-01:</strong> Healthcare — NHS ventilation requirements</li>
            </ul>
            <p><strong>Ventilation Effectiveness</strong></p>
            <p>Not all ventilation systems deliver air to occupants equally effectively. The ventilation effectiveness factor accounts for this variation.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Perfect mixing:</strong> 1.0 — Theoretical ideal</li>
              <li><strong>Ceiling supply/return:</strong> 0.8-1.0 — Typical mixing ventilation</li>
              <li><strong>Displacement:</strong> 1.0-1.2 — Stratification improves breathing zone</li>
              <li><strong>Under-floor air:</strong> 1.0-1.2 — Similar to displacement</li>
              <li><strong>Personal ventilation:</strong> 1.5-2.0 — Direct supply to breathing zone</li>
            </ul>
            <p><strong>Design consideration:</strong> Higher ventilation effectiveness allows lower total airflow rates whilst maintaining equivalent air quality at the breathing zone, reducing both capital and operating costs.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Office Ventilation Calculation</strong>
            </p>
            <p><strong>Question:</strong> Calculate the fresh air supply rate for an open-plan office measuring 25m × 20m with a 2.8m ceiling height. Design occupancy is 1 person per 8 m².</p>
            <p><strong>Step 1: Calculate occupancy</strong></p>
            <p>Floor area = 25 × 20 = 500 m²</p>
            <p>Occupancy = 500 / 8 = 62.5, round up to 63 persons</p>
            <p><strong>Step 2: Per-person method (Part F)</strong></p>
            <p>Q = 63 × 10 L/s = 630 L/s</p>
            <p><strong>Step 3: Air change rate method (6 ACH)</strong></p>
            <p>Volume = 500 × 2.8 = 1400 m³</p>
            <p>Q = (1400 × 6) / 3.6 = 2333 L/s</p>
            <p><strong>Design requirement:</strong> 2333 L/s (higher value)</p>
            <p>Note: Total airflow includes recirculated air; minimum 630 L/s must be outdoor air</p>
            <p>
              <strong>Example 2: CO2-Based Ventilation Assessment</strong>
            </p>
            <p><strong>Question:</strong> A meeting room has 12 occupants. Outdoor CO2 is 420 ppm. The target indoor CO2 is 800 ppm. Calculate the required outdoor air supply rate.</p>
            <p>Using: Ci = Co + (N × G) / Q</p>
            <p>Rearranging: Q = (N × G) / (Ci - Co)</p>
            <p>Where:</p>
            <p>N = 12 occupants</p>
            <p>G = 18 L/h per person (sedentary) = 0.005 L/s = 5 mL/s</p>
            <p>Ci = 800 ppm (target)</p>
            <p>Co = 420 ppm (outdoor)</p>
            <p>Q = (12 × 0.005) / ((800 - 420) × 10⁻⁶)</p>
            <p>Q = 0.06 / 0.00038 = 158 L/s</p>
            <p><strong>Required outdoor air:</strong> 158 L/s (or 13.2 L/s per person)</p>
            <p>This exceeds the Part F minimum of 10 L/s per person to achieve 800 ppm target</p>
            <p>
              <strong>Example 3: Natural Ventilation Assessment</strong>
            </p>
            <p><strong>Question:</strong> Assess whether single-sided natural ventilation is suitable for an office with 3m ceiling height and 12m depth from the window wall.</p>
            <p><strong>Single-sided ventilation limit:</strong></p>
            <p>Maximum effective depth = 2.5 × ceiling height</p>
            <p>Maximum depth = 2.5 × 3m = 7.5m</p>
            <p><strong>Assessment:</strong></p>
            <p>Actual depth (12m) &gt; Maximum for single-sided (7.5m)</p>
            <p><strong>Conclusion:</strong> Single-sided natural ventilation NOT suitable</p>
            <p><strong>Alternatives:</strong></p>
            <p>- Cross-ventilation (if openings on opposite side): max depth = 5 × 3 = 15m ✓</p>
            <p>- Mechanical ventilation</p>
            <p>- Mixed-mode system</p>
            <p>
              <strong>Example 4: Kitchen Extract Sizing</strong>
            </p>
            <p><strong>Question:</strong> Size the extract system for a commercial kitchen measuring 8m × 6m with a 3m ceiling height.</p>
            <p><strong>Step 1: Calculate volume</strong></p>
            <p>Volume = 8 × 6 × 3 = 144 m³</p>
            <p><strong> Step 2: Apply CIBSE recommended ACH (25 ACH for commercial kitchen) </strong></p>
            <p>Q = (144 × 25) / 3.6 = 1000 L/s</p>
            <p><strong>Step 3: Check against hood capture velocity</strong></p>
            <p>Assuming 2.5m canopy length × 1.2m width = 3m² hood area</p>
            <p>At 0.5 m/s face velocity: Q = 3 × 0.5 × 1000 = 1500 L/s</p>
            <p><strong>Design extract rate:</strong> 1500 L/s (higher value)</p>
            <p>Supply air must balance extract, typically 80-90% to maintain slight negative pressure</p>
            <p>
              <strong>Example 5: Demand Control Ventilation Savings</strong>
            </p>
            <p><strong>Question:</strong> Estimate annual energy savings from DCV in a 100-person office running 50 hours per week at 40% average occupancy versus design maximum.</p>
            <p><strong>Design airflow:</strong></p>
            <p>Q_design = 100 persons × 10 L/s = 1000 L/s = 1 m³/s</p>
            <p><strong>Average actual (40% occupancy):</strong></p>
            <p>Q_actual = 40 persons × 10 L/s + background = approximately 500 L/s = 0.5 m³/s</p>
            <p><strong>Fan power reduction (cube law):</strong></p>
            <p>Power ratio = (0.5/1.0)³ = 0.125 = 12.5% of design power</p>
            <p><strong>Assuming 2kW design fan power:</strong></p>
            <p>Without DCV: 2kW × 50h × 52 weeks = 5200 kWh/year</p>
            <p>With DCV: 2kW × 0.125 × 50h × 52 = 650 kWh/year</p>
            <p><strong>Annual savings:</strong> 4550 kWh (87.5% reduction in fan energy)</p>
            <p>Additional savings from reduced heating/cooling of outdoor air</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential Formulae:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>ACH = (Q × 3600) / V</strong> — Air changes per hour</li>
              <li><strong>Q (L/s) = (ACH × V) / 3.6</strong> — Flow rate from ACH</li>
              <li><strong>Ci = Co + (N × G) / Q</strong> — Steady-state CO2</li>
              <li><strong>Single-sided depth ≤ 2.5 × H</strong> — Natural ventilation limit</li>
              <li><strong>Cross-vent depth ≤ 5 × H</strong> — Cross-ventilation limit</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Office fresh air: <strong>10 L/s per person</strong> (Part F minimum)</li>
              <li>Classroom fresh air: <strong>8 L/s per person</strong></li>
              <li>Outdoor CO2: <strong>400-450 ppm</strong></li>
              <li>Good indoor CO2: <strong>&lt;800 ppm</strong></li>
              <li>Maximum acceptable CO2: <strong>1000 ppm</strong></li>
              <li>Dwelling background rate: <strong>0.3 L/s per m² floor area</strong></li>
            </ul>
            <p>
              <strong>BMS Integration Points:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>CO2 sensors in return air and/or occupied zones</li>
              <li>Temperature and humidity monitoring</li>
              <li>Outdoor air damper position feedback</li>
              <li>Filter differential pressure for maintenance alerts</li>
              <li>Fan speed and power monitoring</li>
              <li>Occupancy sensor integration for DCV</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Confusing total air with fresh air:</strong> Recirculated air does not count towards outdoor air requirements</li>
                <li><strong>Ignoring ventilation effectiveness:</strong> Poor diffuser placement reduces actual delivered air quality</li>
                <li><strong>Over-relying on CO2:</strong> Does not detect all pollutants; additional monitoring may be needed</li>
                <li><strong>Underestimating infiltration losses:</strong> Leaky buildings have uncontrolled ventilation</li>
                <li><strong>Neglecting commissioning:</strong> Systems must be balanced and tested to achieve design performance</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Ventilation systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Air handling units
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section2_1;
