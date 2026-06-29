/**
 * Module 6 · Section 1 · Subsection 5 — Building Services Compliance
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Minimum efficiencies, controls requirements, metering, lighting and HVAC system specifications under Part L
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

const TITLE = 'Building Services Compliance - HNC Module 6 Section 1.5';
const DESCRIPTION =
  'Master Part L building services compliance: minimum efficiencies for boilers, heat pumps, lighting and HVAC systems, controls requirements, metering obligations, and commissioning standards.';

const quickCheckQuestions = [
  {
    id: 'minimum-boiler-efficiency',
    question: 'What is the minimum ErP efficiency for a new gas boiler installed under Part L?',
    options: [
      '86%',
      '89%',
      '95%',
      '92%',
    ],
    correctIndex: 3,
    explanation:
      'Part L requires new gas boilers to achieve a minimum ErP (Energy-related Products) seasonal efficiency of 92%. This applies to both regular and combination boilers in new and existing buildings.',
  },
  {
    id: 'heat-pump-scop',
    question: 'What minimum SCOP must an air source heat pump achieve for Part L compliance?',
    options: [
      '2.0',
      '2.5',
      '2.8',
      '3.0',
    ],
    correctIndex: 2,
    explanation:
      'Air source heat pumps must achieve a minimum Seasonal Coefficient of Performance (SCOP) of 2.8 under Part L. Ground source heat pumps require SCOP of 3.0 minimum.',
  },
  {
    id: 'lighting-efficacy',
    question:
      'What is the minimum luminaire efficacy required for general lighting in new non-domestic buildings?',
    options: [
      '60 lm/W',
      '80 lm/W',
      '95 lm/W',
      '100 lm/W',
    ],
    correctIndex: 1,
    explanation:
      'Part L requires general lighting in new non-domestic buildings to achieve a minimum luminaire efficacy of 80 lumens per Watt (lm/W). Display lighting has a lower threshold of 60 lm/W.',
  },
  {
    id: 'metering-threshold',
    question: 'At what heating/cooling system output is sub-metering required under Part L?',
    options: [
      '50 kW',
      '150 kW',
      '25 kW',
      '100 kW',
    ],
    correctIndex: 0,
    explanation:
      'Part L requires sub-metering for heating and cooling systems with an output exceeding 50 kW. This enables energy consumption to be monitored and managed effectively.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under Part L 2021, what is the minimum seasonal efficiency for a new oil-fired boiler?',
    options: [
      '88%',
      '92%',
      '90%',
      '93%',
    ],
    correctAnswer: 1,
    explanation:
      'Oil-fired boilers must achieve a minimum ErP seasonal efficiency of 92%, the same requirement as gas boilers. This ensures comparable performance standards across fuel types.',
  },
  {
    id: 2,
    question: 'What SCOP is required for a ground source heat pump to comply with Part L?',
    options: [
      '3.5',
      '2.5',
      '3.0',
      '2.8',
    ],
    correctAnswer: 2,
    explanation:
      'Ground source heat pumps (GSHPs) must achieve a minimum SCOP of 3.0 under Part L. This is higher than air source heat pumps (2.8) due to the more stable ground temperatures enabling better performance.',
  },
  {
    id: 3,
    question: 'What minimum efficacy is required for display lighting in non-domestic buildings?',
    options: [
      '80 lm/W',
      '50 lm/W',
      '95 lm/W',
      '60 lm/W',
    ],
    correctAnswer: 3,
    explanation:
      'Display lighting has a reduced minimum efficacy requirement of 60 lm/W compared to 80 lm/W for general lighting. This recognises the specific requirements of display applications.',
  },
  {
    id: 4,
    question: 'Which of the following is NOT a mandatory control for HVAC systems under Part L?',
    options: [
      'Automatic monitoring of energy consumption',
      'Weather compensation for wet heating systems',
      'Timed setback for heating systems',
      'Zone controls for areas over 150 m²',
    ],
    correctAnswer: 0,
    explanation:
      'Automatic monitoring is a requirement for larger systems (over 50 kW) but not a mandatory control for all HVAC systems. Zone controls, weather compensation, and timed setback are all required.',
  },
  {
    id: 5,
    question:
      'What is the maximum specific fan power (SFP) for a supply and extract ventilation system in a new non-domestic building?',
    options: [
      '1.6 W/(l/s)',
      '1.8 W/(l/s)',
      '2.2 W/(l/s)',
      '2.0 W/(l/s)',
    ],
    correctAnswer: 1,
    explanation:
      'The maximum SFP for supply and extract mechanical ventilation systems is 1.8 W/(l/s). This limit ensures energy-efficient fan selection and ductwork design.',
  },
  {
    id: 6,
    question: 'When must commissioning be completed and certified under Part L?',
    options: [
      'Within 30 days of practical completion',
      'Within 6 months of handover',
      'Before the building is occupied',
      'Before the EPC is issued',
    ],
    correctAnswer: 2,
    explanation:
      'Part L requires commissioning to be completed before the building is occupied or the fixed building services are used. A commissioning certificate must be provided to the building control body.',
  },
  {
    id: 7,
    question:
      'What EER (Energy Efficiency Ratio) must a new comfort cooling system achieve under Part L?',
    options: [
      'All lighting installations',
      'Automatic monitoring of energy consumption',
      'Before the building is occupied',
      'Depends on system type and capacity',
    ],
    correctAnswer: 3,
    explanation:
      'Part L specifies different minimum EER values depending on the cooling system type (split, multi-split, VRF) and capacity. Values range from 2.5 to 3.3 depending on classification.',
  },
  {
    id: 8,
    question:
      'What proportion of heated floor area must have individual room temperature controls?',
    options: [
      'All heated spaces',
      'At least 90%',
      'Only spaces over 50 m²',
      'At least 80%',
    ],
    correctAnswer: 0,
    explanation:
      'Part L requires all heated spaces to have individual room temperature controls (typically TRVs or room thermostats). The only exception is spaces where control would be impractical.',
  },
  {
    id: 9,
    question:
      'What documentation must be provided to demonstrate Part L building services compliance?',
    options: [
      'A single-line distribution diagram for the main switchboard only',
      'Building log book including commissioning records and operating instructions',
      'The contractor day-work sheets and labour allocation records',
      'A copy of the original planning permission application',
    ],
    correctAnswer: 1,
    explanation:
      'Part L requires a building log book containing commissioning records, as-built drawings, operating and maintenance instructions, and energy consumption monitoring guidance.',
  },
  {
    id: 10,
    question:
      'What minimum heat recovery efficiency is required for mechanical ventilation systems with heat recovery?',
    options: [
      '60%',
      '70%',
      '73%',
      '80%',
    ],
    correctAnswer: 2,
    explanation:
      'MVHR systems must achieve a minimum dry heat recovery efficiency of 73% under Part L. This ensures effective energy recovery from extract air to incoming supply air.',
  },
  {
    id: 11,
    question:
      'At what lighting capacity must automatic controls be provided in non-domestic buildings?',
    options: [
      'Only in circulation spaces',
      'Over 100 W installed capacity per room',
      'Over 250 W installed capacity per room',
      'All lighting installations',
    ],
    correctAnswer: 3,
    explanation:
      'Part L requires automatic controls (occupancy detection, daylight dimming, or time scheduling) for all general lighting in non-domestic buildings, regardless of capacity.',
  },
  {
    id: 12,
    question: 'What is the maximum chiller COP for water-cooled systems with capacity over 750 kW?',
    options: [
      '5.5',
      '6.0',
      '4.5',
      '5.0',
    ],
    correctAnswer: 0,
    explanation:
      'Large water-cooled chillers (over 750 kW) must achieve a minimum full-load COP of 5.5. Smaller systems have proportionally lower requirements based on capacity.',
  },
];

const faqs = [
  {
    question: 'How do I demonstrate Part L compliance for a mixed-use building?',
    answer:
      'Mixed-use buildings require compliance assessment for each use type separately. Domestic portions follow Approved Document L Volume 1 (dwellings), while non-domestic areas follow Volume 2. Each building services system serving multiple uses must meet the requirements for all use types it serves. The commissioning certificate should clearly identify compliance for each area.',
  },
  {
    question: 'What happens if equipment cannot meet the minimum efficiency requirements?',
    answer:
      'If specific equipment cannot meet minimum efficiency targets, compensatory measures may be acceptable through the Notional Building methodology. This requires demonstrating that overall CO2 emissions are no greater than a compliant building. This approach requires SAP or SBEM calculations and agreement with building control before installation.',
  },
  {
    question:
      'Are there exemptions for heritage buildings from Part L building services requirements?',
    answer:
      'Listed buildings and those in conservation areas may be exempt from requirements that would unacceptably alter their character or appearance. However, the exemption only applies where compliance would be impractical - not merely inconvenient. Building services improvements that do not affect historic fabric must still comply fully.',
  },
  {
    question: 'How often must sub-meters be read and data recorded?',
    answer:
      'Part L does not mandate specific reading frequencies, but recommends automatic meter reading (AMR) with at least half-hourly data collection for systems over 100 kW. For smaller systems (50-100 kW), monthly manual readings are considered adequate. Building log books should record consumption data and include targets for comparison.',
  },
  {
    question: 'What qualifications are required for commissioning engineers?',
    answer:
      'Part L requires commissioning to be carried out by competent persons. For most systems, this means engineers with relevant qualifications (e.g., BSRIA certification, manufacturer training) and demonstrated experience. Complex systems may require specialists. The commissioning certificate must confirm the competence of those carrying out the work.',
  },
  {
    question: 'Can existing systems be retained when extending a building?',
    answer:
      'Existing systems serving only existing areas can be retained unchanged. However, if extended to serve new areas, they may need upgrading to meet current standards. Any new equipment must fully comply with Part L. Where existing plant capacity is increased by more than 25%, the whole system may require review.',
  },
];

const HNCModule6Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1 · Subsection 5"
            title="Building Services Compliance"
            description="Minimum efficiencies, controls requirements, metering, lighting and HVAC system specifications under Part L"
            tone="purple"
          />

          <TLDR
            points={[
              "Part L sets minimum efficiencies for HVAC plant (SCOP, SEER, η%), lighting (luminaire-lumens per circuit-watt and LENI), and controls — these feed directly into the SAP/SBEM compliance calculation.",
              "Lighting in non-domestic buildings must achieve ≥45 lumens per circuit-watt (luminaire), with daylight dimming in perimeter zones, presence/absence detection in cellular spaces, and time scheduling.",
              "Heating in new dwellings is now effectively heat-pump-led — gas boilers cannot meet the 2021 notional specification, and the 2025 Future Homes Standard will end gas connections to new dwellings.",
            ]}
          />

          <RegsCallout
            source="Approved Document L Volume 2 — Fixed building services efficiencies"
            clause="Fixed building services should be reasonably efficient and have effective controls. Heating, cooling, ventilation and hot water systems should meet the minimum efficiency values, controls provisions and metering provisions set out in the Domestic Building Services Compliance Guide and the Non-Domestic Building Services Compliance Guide as relevant to the system type and capacity."
            meaning={
              <>
                The two Compliance Guides (DBSCG and NDBSCG) are the practical reference — they translate the headline Part L principle into specific minimum efficiencies for every plant type, controls schedule and metering provision. Building Control will check installed plant against the relevant Guide table; non-compliant plant cannot be installed without offsetting measures.
              </>
            }
            cite="Source: Domestic Building Services Compliance Guide 2021 / Non-Domestic Building Services Compliance Guide 2021 — gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Apply minimum boiler and heat pump efficiency requirements",
              "Specify lighting systems meeting Part L efficacy standards",
              "Design HVAC systems with compliant controls and SFP values",
              "Implement metering strategies for energy monitoring",
              "Plan commissioning to achieve Part L certification",
              "Produce building log book documentation requirements",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Heating System Efficiencies">
            <p>Part L 2021 sets stringent minimum efficiency requirements for heating systems to reduce carbon emissions from buildings. These requirements apply to new installations and replacement systems in both domestic and non-domestic buildings.</p>
            <p><strong>Boiler Efficiency Requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Gas boilers:</strong> Minimum 92% ErP seasonal efficiency</li>
              <li><strong>Oil boilers:</strong> Minimum 92% ErP seasonal efficiency</li>
              <li><strong>LPG boilers:</strong> Minimum 92% ErP seasonal efficiency</li>
              <li><strong>Biomass boilers:</strong> Minimum 88% efficiency (domestic), 89% (non-domestic)</li>
            </ul>
            <p><strong>Heat Pump Performance Standards</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Air Source Heat Pump (ASHP):</strong> 2.8 — 55°C design flow</li>
              <li><strong>Ground Source Heat Pump (GSHP):</strong> 3.0 — 55°C design flow</li>
              <li><strong>Water Source Heat Pump (WSHP):</strong> 3.0 — 55°C design flow</li>
              <li><strong>Exhaust Air Heat Pump:</strong> 2.5 — 55°C design flow</li>
            </ul>
            <p><strong>Understanding SCOP</strong></p>
            <p>SCOP (Seasonal Coefficient of Performance) measures the ratio of heat output to electrical input over a typical heating season. A SCOP of 2.8 means the heat pump delivers 2.8 kW of heat for every 1 kW of electricity consumed. Higher SCOP values indicate better efficiency.</p>
            <p><strong>Design consideration:</strong> Heat pump efficiency is highly dependent on flow temperature. Design for the lowest practical flow temperature to maximise SCOP.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Lighting Efficacy and Controls">
            <p>Part L sets minimum luminaire efficacy requirements and mandates automatic controls for lighting in non-domestic buildings. These requirements significantly reduce energy consumption from lighting, which typically represents 20-40% of building energy use.</p>
            <p><strong>General Lighting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum 80 lm/W efficacy</li>
              <li>Automatic presence detection</li>
              <li>Daylight dimming required</li>
              <li>Timed switching zones</li>
            </ul>
            <p><strong>Display Lighting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum 60 lm/W efficacy</li>
              <li>Manual switching acceptable</li>
              <li>Time control for retail</li>
              <li>Separate metering advised</li>
            </ul>
            <p><strong>Emergency Lighting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Exempt from efficacy limits</li>
              <li>LED preferred for efficiency</li>
              <li>Self-test systems reduce energy</li>
              <li>Central battery more efficient</li>
            </ul>
            <p><strong>Mandatory Lighting Controls</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Offices:</strong> Presence/absence, daylight dimming — Zone control per 6 m window depth</li>
              <li><strong>Circulation areas:</strong> Presence detection, time scheduling — Maintained illuminance when unoccupied</li>
              <li><strong>Toilets/ancillary:</strong> Absence detection — Auto-off after vacancy</li>
              <li><strong>Retail:</strong> Time scheduling, zone control — Separate display lighting circuits</li>
              <li><strong>External lighting:</strong> Daylight sensing, time control — Dimming for overnight period</li>
            </ul>
            <p><strong>Best practice:</strong> Specify absence detection (manual on, auto off) rather than presence detection for maximum energy savings - occupants switch on only when needed.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="HVAC System Requirements">
            <p>Part L specifies detailed requirements for HVAC systems covering cooling equipment efficiency, ventilation system fan power, heat recovery effectiveness, and comprehensive controls. These requirements ensure building services systems operate at optimum efficiency.</p>
            <p><strong>Specific Fan Power (SFP) Limits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Extract only:</strong> 0.5 W/(l/s)</li>
              <li><strong>Supply only:</strong> 1.1 W/(l/s)</li>
              <li><strong>Supply and extract:</strong> 1.8 W/(l/s)</li>
              <li><strong>With heating/cooling:</strong> 2.0 W/(l/s)</li>
              <li><strong>All air units:</strong> 2.2 W/(l/s)</li>
            </ul>
            <p><strong>Cooling System Efficiency (Minimum EER/SEER)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Split systems &lt;12 kW:</strong> SEER 5.1 minimum</li>
              <li><strong>Split systems 12-40 kW:</strong> SEER 4.6 minimum</li>
              <li><strong>Multi-split systems:</strong> SEER 4.4 minimum</li>
              <li><strong>VRF systems:</strong> SEER 5.0 minimum</li>
              <li><strong>Air-cooled chillers &lt;400 kW:</strong> EER 2.8 minimum</li>
              <li><strong>Water-cooled chillers &gt;750 kW:</strong> COP 5.5 minimum</li>
            </ul>
            <p><strong>HVAC Controls Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wet heating systems:</strong> Weather compensation, room stat, TRVs — Optimum start/stop, night setback</li>
              <li><strong>Warm air heating:</strong> Room thermostat, time control — Zone dampers for areas &gt;150 m²</li>
              <li><strong>Cooling systems:</strong> Zone control, time scheduling — Interlock with heating, free cooling</li>
              <li><strong>Ventilation:</strong> Variable speed drives, CO₂ control — Heat recovery bypass for summer</li>
              <li><strong>Heat recovery:</strong> Minimum 73% efficiency, bypass — Frost protection, summer bypass</li>
            </ul>
            <p><strong>Integration tip:</strong> Heating and cooling systems must be interlocked to prevent simultaneous operation - this is a mandatory Part L requirement.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Metering and Commissioning">
            <p>Part L requires comprehensive metering to enable energy monitoring and management, plus detailed commissioning to ensure systems operate at design efficiency. Both requirements are essential for achieving real-world energy performance.</p>
            <p><strong>Metering Requirements</strong></p>
            <p><strong>Systems &gt;50 kW Output</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual sub-metering required</li>
              <li>Heating plant fuel consumption</li>
              <li>Cooling system electricity</li>
              <li>Humidification energy</li>
              <li>Fans and pumps auxiliary</li>
              <li>Lighting circuits</li>
            </ul>
            <p><strong>Systems &gt;100 kW Output</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All above requirements</li>
              <li>Automatic meter reading (AMR)</li>
              <li>Half-hourly data collection</li>
              <li>BMS integration recommended</li>
              <li>Tenant sub-metering</li>
              <li>Data logging capability</li>
            </ul>
            <p><strong>Commissioning Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heating:</strong> Flow rates, temperatures, control response — BSRIA BG 2 commissioning records</li>
              <li><strong>Cooling:</strong> Capacity verification, EER measurement — Manufacturer commissioning sheets</li>
              <li><strong>Ventilation:</strong> Air flow rates, SFP measurement — CIBSE TM50 testing records</li>
              <li><strong>Lighting:</strong> Lux levels, control function testing — SLL commissioning sheets</li>
              <li><strong>BMS/Controls:</strong> Setpoints, sequences, alarms — Point-to-point testing schedules</li>
            </ul>
            <p><strong>Building Log Book Requirements</strong></p>
            <p><strong>Part L requires a building log book containing:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>As-built drawings and equipment schedules</li>
              <li>Commissioning records and test certificates</li>
              <li>Operating and maintenance instructions</li>
              <li>Equipment manufacturer data</li>
              <li>Design conditions and control setpoints</li>
              <li>Energy consumption targets and monitoring guidance</li>
              <li>Health and safety information (CDM requirements)</li>
            </ul>
            <p><strong>Timing requirement:</strong> Commissioning must be complete before the building is occupied or any fixed building services are used. The commissioning certificate must be provided to building control.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Heat Pump Specification Check</strong>
            </p>
            <p><strong>Scenario:</strong> Verify if a proposed air source heat pump meets Part L requirements.</p>
            <p>Proposed ASHP specification:</p>
            <p>Heating capacity: 45 kW at A7/W35</p>
            <p>SCOP (at 55°C flow): 2.9</p>
            <p>Design flow temperature: 55°C</p>
            <p>Part L requirement check:</p>
            <p>Minimum ASHP SCOP: 2.8</p>
            <p>Proposed SCOP: 2.9</p>
            <p>Result: COMPLIANT - SCOP exceeds minimum requirement</p>
            <p>Note: If design flow temp reduced to 45°C,</p>
            <p>SCOP would improve to approximately 3.4</p>
            <p>
              <strong>Example 2: Lighting Efficacy Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate whether a lighting scheme meets Part L requirements.</p>
            <p>Office lighting scheme:</p>
            <p>Luminaire type: LED panel</p>
            <p>Light output: 4,000 lumens</p>
            <p>Power consumption: 36 W</p>
            <p>Efficacy calculation:</p>
            <p>Efficacy = Lumens ÷ Watts</p>
            <p>Efficacy = 4,000 ÷ 36</p>
            <p>Efficacy = 111 lm/W</p>
            <p>Part L requirement: 80 lm/W minimum</p>
            <p>Result: COMPLIANT - exceeds requirement by 39%</p>
            <p>
              <strong>Example 3: Ventilation SFP Verification</strong>
            </p>
            <p><strong>Scenario:</strong> Verify SFP for a supply and extract system with measured data.</p>
            <p>Commissioning measurements:</p>
            <p>Supply fan power: 2.2 kW</p>
            <p>Supply air flow: 2,000 l/s</p>
            <p>Extract fan power: 1.8 kW</p>
            <p>Extract air flow: 1,900 l/s</p>
            <p>SFP calculation:</p>
            <p>Total fan power = 2.2 + 1.8 = 4.0 kW</p>
            <p>Design flow (higher of supply/extract) = 2,000 l/s</p>
            <p>SFP = 4,000 W ÷ 2,000 l/s = 2.0 W/(l/s)</p>
            <p>Part L limit for S&E: 1.8 W/(l/s)</p>
            <p>Result: NON-COMPLIANT - exceeds limit by 11%</p>
            <p>Action: Review ductwork pressure drop,</p>
            <p>consider larger ductwork or more efficient fans</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Part L Compliance Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify all heating equipment meets minimum efficiency (92% boilers, SCOP 2.8/3.0 heat pumps)</li>
              <li>Check lighting efficacy (80 lm/W general, 60 lm/W display) and specify automatic controls</li>
              <li>Calculate SFP for ventilation systems and verify compliance with limits</li>
              <li>Specify metering for systems over 50 kW, AMR for over 100 kW</li>
              <li>Plan commissioning activities and documentation from design stage</li>
              <li>Prepare building log book template for handover documentation</li>
            </ul>
            <p>
              <strong>Key Efficiency Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Boiler efficiency: <strong>92% ErP minimum</strong></li>
              <li>ASHP SCOP: <strong>2.8 minimum</strong>, GSHP SCOP: <strong>3.0 minimum</strong></li>
              <li>General lighting: <strong>80 lm/W minimum</strong></li>
              <li>MVHR efficiency: <strong>73% minimum</strong></li>
              <li>Metering threshold: <strong>50 kW system output</strong></li>
            </ul>
            <p>
              <strong>Common Compliance Issues:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat pump flow temperatures:</strong> Designing for high flow temps reduces SCOP below compliance</li>
              <li><strong>Ductwork resistance:</strong> Poor ductwork design causes SFP failures at commissioning</li>
              <li><strong>Lighting controls:</strong> Omitting daylight dimming or presence detection</li>
              <li><strong>Documentation gaps:</strong> Incomplete commissioning records at handover</li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Lighting LENI fails after VE swap to cheaper luminaires"
            situation={
              <>
                You designed a Cat A office to a LENI of 22 kWh/m²/year using high-efficacy LED panels at 130 lm/cW. Under value engineering, the contractor substituted cheaper panels at 95 lm/cW. SBEM re-run shows LENI now at 32, the BER exceeds TER and the building fails Part L.
              </>
            }
            whatToDo={
              <>
                You have three choices: (1) reverse the substitution and reinstate the specified luminaires; (2) compensate with enhanced controls — DALI scenes, daylight harvesting at every perimeter, occupancy-based scene reduction — and re-model in SBEM; (3) compensate elsewhere in the design (e.g. higher heat-pump SCOP, additional rooftop PV). Option 1 is cheapest if caught early; option 3 typically the most expensive. Reject the substitution at submittal stage rather than at SBEM stage.
              </>
            }
            whyItMatters={
              <>
                Lighting is the most common Part L failure point in non-domestic buildings because efficacy degrades quickly as you slide down the price list. The M&E designer must hold the line on luminaire specification at value engineering — every 10 lm/cW lost on average drives a measurable LENI penalty.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Lighting: ≥45 lm/cW luminaire efficacy in non-dom; LENI = kWh/m²/year, the SBEM input metric.",
              "Heating dwellings: heat pumps SCOP ≥2.5 (ASHP) or 3.5 (notional); gas boilers cannot meet the notional 2021 spec.",
              "Hot water: storage losses controlled, controls per the Compliance Guide.",
              "Controls: presence/absence, daylight dimming, time scheduling, weather compensation, BMS where applicable.",
              "Metering: separate sub-meters for end uses >250 m² floor area or ≥10% of building consumption.",
              "The Building Services Compliance Guides (domestic and non-domestic) are the lookup tables you actually work from on every job.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Air permeability
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section1-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Documentation and handover
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section1_5;
