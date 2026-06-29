/**
 * Module 6 · Section 5 · Subsection 1 — Energy Auditing
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Audit types, data collection, site surveys, measurement protocols and EN 16247 reporting standards
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

const TITLE = 'Energy Auditing - HNC Module 6 Section 5.1';
const DESCRIPTION =
  'Master energy auditing for building services: ESOS requirements, audit types, data collection methods, site survey procedures, measurement protocols, and EN 16247 reporting standards.';

const quickCheckQuestions = [
  {
    id: 'audit-definition',
    question: 'What is the primary purpose of an energy audit?',
    options: [
      'To certify that a building meets the minimum fire safety standards',
      'To calculate the rateable value of a commercial property',
      'To systematically analyse energy use and identify improvement opportunities',
      'To verify that electrical installations comply with BS 7671',
    ],
    correctIndex: 2,
    explanation:
      'An energy audit is a systematic analysis of energy flows within a building or facility to understand consumption patterns, identify inefficiencies, and recommend improvement measures with associated costs and savings.',
  },
  {
    id: 'esos-requirement',
    question: 'Which organisations must comply with ESOS regulations?',
    options: [
      'Any business that occupies more than one floor of a building',
      'Large undertakings with 250+ employees or turnover >£44m',
      'All public sector bodies regardless of their size',
      'Sole traders and micro-businesses with high energy bills',
    ],
    correctIndex: 1,
    explanation:
      'ESOS (Energy Savings Opportunity Scheme) applies to large undertakings: those with 250+ employees OR annual turnover exceeding £44 million AND balance sheet exceeding £38 million. Approximately 12,000 UK organisations qualify.',
  },
  {
    id: 'investment-grade',
    question: 'What distinguishes an investment-grade audit from a walk-through audit?',
    options: [
      'It includes detailed financial analysis and measurement data sufficient for funding decisions',
      'It relies only on the previous year utility bills with no site visit',
      'It can be completed in a single afternoon without any measurements',
      'It is carried out by the building occupants rather than a qualified assessor',
    ],
    correctIndex: 0,
    explanation:
      'An investment-grade audit (ASHRAE Level III) provides detailed engineering analysis, extensive sub-metering data, and rigorous financial modelling sufficient to support capital investment decisions and secure project funding.',
  },
  {
    id: 'en-16247',
    question: 'EN 16247 is the European standard for:',
    options: [
      'The energy performance certification of dwellings',
      'The design of building management control systems',
      'The calibration of electrical test instruments',
      'Energy audits - requirements, methodology and reporting',
    ],
    correctIndex: 3,
    explanation:
      'EN 16247 is the European standard series for energy audits, defining quality requirements, methodologies, deliverables, and competence requirements for energy auditors across buildings, industrial processes, and transport.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Under ESOS, how frequently must qualifying organisations conduct energy audits?',
    options: [
      'Annually',
      'Every 4 years',
      'Every 2 years',
      'Every 5 years',
    ],
    correctAnswer: 1,
    explanation:
      'ESOS operates on a 4-year compliance cycle. Qualifying organisations must conduct audits covering at least 95% of their total energy consumption (following the 2023 amendment effective from Phase 3) and report compliance to the Environment Agency by the deadline.',
  },
  {
    id: 2,
    question:
      'Which audit level involves detailed sub-metering and comprehensive life cycle cost analysis?',
    options: [
      'Diagnostic audit (Level IV)',
      'Walk-through survey (Level I)',
      'Investment-grade audit (Level III)',
      'Energy survey (Level II)',
    ],
    correctAnswer: 2,
    explanation:
      'ASHRAE Level III (Investment-grade audit) involves detailed sub-metering, engineering calculations, comprehensive life cycle cost analysis, and financial modelling to support capital investment decisions.',
  },
  {
    id: 3,
    question: 'What percentage of total energy consumption must an ESOS audit cover?',
    options: [
      '75%',
      '50%',
      '100%',
      '95%',
    ],
    correctAnswer: 3,
    explanation:
      "Following the 2023 amendment to the ESOS Regulations (effective from Phase 3), audits must cover at least 95% of an organisation's total energy consumption. Only up to 5% may be excluded under the reduced de minimis provision, focusing the audit on significant energy users.",
  },
  {
    id: 4,
    question: 'Which document is essential for establishing baseline energy consumption?',
    options: [
      'At least 12 months of utility bills',
      'Building regulations Part L',
      'Equipment manufacturer data sheets',
      'Display Energy Certificate',
    ],
    correctAnswer: 0,
    explanation:
      'At least 12 months of utility bills provide the baseline for understanding consumption patterns, seasonal variations, and total energy use. This data enables meaningful comparison of energy saving measures.',
  },
  {
    id: 5,
    question:
      "During a site survey, what is the purpose of identifying 'energy significant areas'?",
    options: [
      'To identify which areas are exempt from the audit altogether',
      'To prioritise audit effort on areas with greatest saving potential',
      'To allocate the energy bill fairly between different tenants',
      'To decide where to install additional electrical socket-outlets',
    ],
    correctAnswer: 1,
    explanation:
      'Energy significant areas are zones or systems that account for substantial energy consumption. Identifying these enables auditors to focus detailed analysis where the greatest savings opportunities exist.',
  },
  {
    id: 6,
    question: 'What type of meter reading provides the most detailed consumption profile?',
    options: [
      'Monthly meter reads',
      'Annual consumption figures',
      'Half-hourly metering data',
      'Estimated readings',
    ],
    correctAnswer: 2,
    explanation:
      'Half-hourly metering data reveals consumption patterns throughout each day, identifying peak demands, base loads, out-of-hours consumption, and operational anomalies that monthly data cannot show.',
  },
  {
    id: 7,
    question:
      'Which measurement instrument is used to assess thermal performance of building fabric?',
    options: [
      'Power quality analyser',
      'Lux meter',
      'Tachometer',
      'Thermal imaging camera',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal imaging cameras detect temperature differences, revealing heat loss through building fabric, insulation defects, air leakage paths, and thermal bridges that affect energy performance.',
  },
  {
    id: 8,
    question: 'EN 16247-1 requires the energy audit report to include:',
    options: [
      'Current energy use, analysis, recommended measures with costs and savings',
      'The names and salaries of every member of the facilities team',
      'A full structural survey of the building foundations',
      'The planning history and title deeds of the property',
    ],
    correctAnswer: 0,
    explanation:
      'EN 16247-1 specifies that audit reports must include current energy use data, analysis methodology, identified opportunities, recommended measures with estimated costs, savings, and implementation timescales.',
  },
  {
    id: 9,
    question: 'What is the purpose of degree day normalisation in energy analysis?',
    options: [
      'To convert gas consumption figures into electricity equivalents',
      'To adjust consumption data for weather variations',
      'To allocate energy costs across a 365-day billing period',
      'To correct meter readings for instrument calibration drift',
    ],
    correctAnswer: 1,
    explanation:
      'Degree day normalisation adjusts energy consumption data to account for weather variations (heating/cooling requirements), enabling fair year-on-year comparison and identification of genuine efficiency changes.',
  },
  {
    id: 10,
    question:
      'Which metric expresses building energy performance as consumption per unit floor area?',
    options: [
      'Power factor',
      'Maximum demand',
      'Energy Use Intensity (EUI)',
      'Load factor',
    ],
    correctAnswer: 2,
    explanation:
      'Energy Use Intensity (EUI), typically expressed as kWh/m²/year, normalises consumption by floor area, enabling benchmarking against similar buildings and tracking performance improvements.',
  },
  {
    id: 11,
    question: 'A walk-through audit (Level I) is most appropriate when:',
    options: [
      'Seeking finance for a major capital retrofit project',
      'Detailed sub-metering of every circuit is required',
      'A full dynamic simulation of the building is needed',
      'Needing quick identification of obvious inefficiencies',
    ],
    correctAnswer: 3,
    explanation:
      'Walk-through audits provide rapid identification of obvious inefficiencies and low/no-cost improvements. They suit initial assessments or situations with limited budget but are insufficient for major capital decisions.',
  },
  {
    id: 12,
    question:
      "Which organisation maintains the UK's ESOS register and receives compliance notifications?",
    options: [
      'Environment Agency',
      'Building Research Establishment',
      'CIBSE',
      'National Grid',
    ],
    correctAnswer: 0,
    explanation:
      'The Environment Agency administers ESOS in England, maintaining the compliance register and receiving notifications. Equivalent bodies operate in Scotland (SEPA), Wales (NRW), and Northern Ireland (NIEA).',
  },
];

const faqs = [
  {
    question: 'What qualifications are required to conduct ESOS audits?',
    answer:
      'ESOS audits must be led by a qualified Lead Assessor approved under an Environment Agency-recognised scheme (e.g., CIBSE, EMA, IEMA). The Lead Assessor must hold relevant professional qualifications and demonstrate competence through assessment. They can be internal employees or external consultants but must sign off the audit and compliance notification.',
  },
  {
    question: 'How do I choose between audit levels for a project?',
    answer:
      'The audit level depends on project objectives and available budget. Level I (walk-through) suits initial assessments and quick wins identification (~£1-5k). Level II (energy survey) provides detailed analysis for planning purposes (~£5-15k). Level III (investment-grade) is required when seeking project financing or for complex retrofits (~£15-50k+). Match the audit depth to the decision being made.',
  },
  {
    question: 'What data should be collected before the site visit?',
    answer:
      'Pre-visit data collection should include: 12-36 months utility bills (electricity, gas, oil, etc.), half-hourly meter data if available, building drawings and floor areas, equipment schedules and specifications, occupancy patterns and operating hours, previous audit reports or EPCs, maintenance records, and any sub-metering data. Thorough preparation maximises productive site time.',
  },
  {
    question: 'How do I calculate simple payback for energy efficiency measures?',
    answer:
      'Simple payback = Implementation cost ÷ Annual energy savings. For example, LED lighting retrofit costing £15,000 saving £5,000/year has a 3-year payback. Note that simple payback ignores maintenance savings, price escalation, and time value of money. For investment-grade audits, use Net Present Value (NPV) and Internal Rate of Return (IRR) calculations.',
  },
  {
    question: 'What are the key sections required in an EN 16247 compliant audit report?',
    answer:
      'EN 16247 requires: Executive summary with key findings and recommendations, description of audited object (building/process), data sources and collection methodology, analysis of current energy use and consumption breakdown, list of energy saving opportunities ranked by impact, detailed recommendations with costs, savings, payback, and implementation timescale, plus measurement and verification approach.',
  },
  {
    question: 'How does SECR relate to ESOS?',
    answer:
      'Streamlined Energy and Carbon Reporting (SECR) requires qualifying companies to report energy use and emissions in their annual reports. While ESOS focuses on identifying savings opportunities through audits, SECR ensures ongoing public disclosure of energy performance. Organisations may qualify for both schemes. ESOS audit data can support SECR reporting, but they serve different purposes.',
  },
];

const HNCModule6Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · Subsection 1"
            title="Energy Auditing"
            description="Audit types, data collection, site surveys, measurement protocols and EN 16247 reporting standards"
            tone="purple"
          />

          <TLDR
            points={[
              "Energy audits identify and quantify energy use across a building or organisation — driven by ESOS (Energy Savings Opportunity Scheme) compliance for large UK undertakings every 4 years, plus voluntary audits feeding ISO 50001 or sustainability programmes.",
              "EN 16247 is the European audit methodology standard — Parts 1 (general requirements), 2 (buildings), 3 (processes), 4 (transport), 5 (auditor competence). ESOS compliance defaults to EN 16247 plus ESOS Specific Methodologies.",
              "Audit outputs are graded as Type 1 (walk-through), Type 2 (general energy audit), Type 3 (investment-grade audit) — the depth determines the granularity of recommendations and the confidence in payback calculations.",
            ]}
          />

          <RegsCallout
            source="Energy Savings Opportunity Scheme (ESOS) Phase 3 Regulations + EN 16247-1:2022"
            clause="A relevant undertaking shall ensure that energy audits in respect of its energy consumption are carried out at least every four years, in accordance with the regulations and either the EN 16247 methodology or an equivalent ISO 50001 energy management system, covering at least 95% of the total energy consumption. The audit shall identify cost-effective energy savings opportunities and shall be conducted by, or under the direction of, a Lead Assessor registered with an approved register."
            meaning={
              <>
                ESOS Phase 3 (compliance deadline 5 December 2023, with subsequent phases every 4 years) is mandatory for large UK organisations (&gt;250 employees or &gt;£44m turnover and &gt;£38m balance sheet). The audit must use EN 16247 methodology and be signed off by an ESOS Lead Assessor. Phase 3 added a public action plan requirement — committing to identified savings.
              </>
            }
            cite="Source: SI 2014/1643 The Energy Savings Opportunity Scheme Regulations + 2023 amendments — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain ESOS requirements and compliance obligations",
              "Differentiate between walk-through, survey, and investment-grade audits",
              "Apply systematic data collection and utility bill analysis",
              "Conduct site surveys using appropriate measurement equipment",
              "Analyse energy data using degree days and benchmarking",
              "Prepare EN 16247 compliant audit reports with recommendations",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="ESOS and Regulatory Framework">
            <p>The Energy Savings Opportunity Scheme (ESOS) is the UK's implementation of Article 8 of the EU Energy Efficiency Directive. It mandates energy audits for large organisations to identify cost-effective energy saving opportunities and drive improved energy performance.</p>
            <p><strong>ESOS Qualification Criteria:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Employee threshold:</strong> 250 or more employees in the UK</li>
              <li><strong>Financial threshold:</strong> Annual turnover exceeding £44 million AND balance sheet exceeding £38 million</li>
              <li><strong>Group test:</strong> Applies if any UK group company meets criteria</li>
              <li><strong>Qualification date:</strong> Assessment on 31 December of each compliance period</li>
            </ul>
            <p><strong>ESOS Compliance Timeline</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Phase 1:</strong> 31 December 2014 — 5 December 2015</li>
              <li><strong>Phase 2:</strong> 31 December 2018 — 5 December 2019</li>
              <li><strong>Phase 3:</strong> 31 December 2022 — 5 December 2023</li>
              <li><strong>Phase 4:</strong> 31 December 2026 — 5 December 2027</li>
            </ul>
            <p><strong>ESOS Coverage Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Audits must cover <strong>at least 95%</strong> of total energy consumption (5% de minimis since the 2023 amendment)</li>
              <li>• Includes buildings, industrial processes, and transport</li>
              <li>• De minimis threshold allows exclusion of small consumption areas</li>
              <li>• Alternative compliance routes: ISO 50001 certification, DECs, GDAs</li>
            </ul>
            <p><strong>Compliance note:</strong> Non-compliance can result in penalties up to £90,000 plus £500 per day for continued breach. The Environment Agency publishes non-compliant organisations.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Audit Types and Methodology">
            <p>Energy audits range from brief walk-through assessments to comprehensive investment-grade analyses. The ASHRAE classification provides a widely-adopted framework defining three distinct audit levels, each with specific purposes and deliverables.</p>
            <p><strong>Level I: Walk-Through</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Brief site assessment</li>
              <li>Utility bill analysis</li>
              <li>Identify obvious issues</li>
              <li>Low/no-cost measures</li>
              <li>Duration: 1-2 days</li>
            </ul>
            <p><strong>Level II: Energy Survey</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Detailed site survey</li>
              <li>End-use breakdown</li>
              <li>Engineering calculations</li>
              <li>Capital measures costed</li>
              <li>Duration: 1-4 weeks</li>
            </ul>
            <p><strong>Level III: Investment-Grade</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sub-metering installed</li>
              <li>Dynamic simulation</li>
              <li>Life cycle costing</li>
              <li>Finance-ready analysis</li>
              <li>Duration: 4-12 weeks</li>
            </ul>
            <p><strong>Audit Methodology (EN 16247)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Preliminary Contact:</strong> Define scope, boundaries, objectives — Audit agreement, data request</li>
              <li><strong>2. Start-up Meeting:</strong> Review data, discuss operations — Understanding of site/process</li>
              <li><strong>3. Data Collection:</strong> Gather bills, drawings, schedules — Baseline consumption data</li>
              <li><strong>4. Field Work:</strong> Site survey, measurements, interviews — Equipment inventory, readings</li>
              <li><strong>5. Analysis:</strong> Energy balance, benchmarking, ECMs — Identified opportunities</li>
              <li><strong>6. Reporting:</strong> Document findings, recommendations — Audit report</li>
            </ul>
            <p><strong>Best practice:</strong> Match audit level to decision requirements - a walk-through for initial assessment, investment-grade for major capital projects requiring board approval.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Data Collection and Analysis">
            <p>Robust data collection forms the foundation of meaningful energy analysis. The quality of audit recommendations depends directly on the completeness and accuracy of baseline data and operational information gathered during the audit process.</p>
            <p><strong>Essential Data Requirements</strong></p>
            <p><strong>Utility Data</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• 12-36 months electricity bills</li>
              <li>• Gas/oil consumption records</li>
              <li>• Half-hourly metering data</li>
              <li>• Tariff structures and rates</li>
              <li>• Maximum demand readings</li>
            </ul>
            <p><strong>Building Information</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Floor areas (GIA/NIA)</li>
              <li>• Occupancy schedules</li>
              <li>• Operating hours</li>
              <li>• Equipment schedules</li>
              <li>• Building drawings/BIM</li>
            </ul>
            <p><strong>Utility Bill Analysis Techniques</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Base load identification:</strong> Minimum consumption during unoccupied periods indicates continuous loads</li>
              <li><strong>Degree day correlation:</strong> Plot consumption against heating/cooling degree days to assess weather sensitivity</li>
              <li><strong>CUSUM analysis:</strong> Cumulative sum charts identify step changes in consumption patterns</li>
              <li><strong>Regression analysis:</strong> Statistical relationship between consumption and driving variables</li>
            </ul>
            <p><strong>Energy Performance Metrics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy Use Intensity (EUI):</strong> kWh/m²/year — 150-400 kWh/m²</li>
              <li><strong>Electrical EUI:</strong> Electricity kWh/m² — 80-200 kWh/m²</li>
              <li><strong>Fossil thermal EUI:</strong> Gas/oil kWh/m² — 70-200 kWh/m²</li>
              <li><strong>Carbon intensity:</strong> kgCO₂/m²/year — 30-100 kgCO₂/m²</li>
              <li><strong>Cost intensity:</strong> £/m²/year — £15-50/m²</li>
            </ul>
            <p><strong>Half-Hourly Data Analysis</strong></p>
            <p><strong>Base load:</strong> Minimum overnight/weekend consumption - identify equipment running unnecessarily</p>
            <p><strong>Peak demand:</strong> Maximum kW - opportunity for demand management and tariff optimisation</p>
            <p><strong>Load profile shape:</strong> Sharp rise at start-up suggests simultaneous equipment start - implement soft starts</p>
            <p><strong>Out-of-hours consumption:</strong> Energy used outside operating hours as percentage of total</p>
            <p><strong>Analysis tip:</strong> Out-of-hours consumption often represents 30-50% of total electricity use in commercial buildings - a key focus area for quick wins.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Site Surveys and Measurement">
            <p>The site survey validates desktop analysis, captures equipment data, and identifies operational practices affecting energy use. Systematic measurement using calibrated instruments provides the evidence base for energy saving calculations.</p>
            <p><strong>Site Survey Checklist</strong></p>
            <p><strong>Building Fabric</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Glazing type and condition</li>
              <li>• Insulation levels (if accessible)</li>
              <li>• Air tightness observations</li>
              <li>• Solar shading provision</li>
              <li>• Thermal bridges/cold spots</li>
            </ul>
            <p><strong>HVAC Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Plant nameplates and ratings</li>
              <li>• Operating schedules</li>
              <li>• Set points and controls</li>
              <li>• Distribution system condition</li>
              <li>• Maintenance history</li>
            </ul>
            <p><strong>Measurement Equipment</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Power analyser:</strong> Electrical systems — kW, kVA, PF, kWh, harmonics</li>
              <li><strong>Clamp meter:</strong> Circuit loading — Amps, voltage, power</li>
              <li><strong>Thermal camera:</strong> Building fabric, electrical — Surface temperature, heat loss</li>
              <li><strong>Lux meter:</strong> Lighting assessment — Illuminance levels (lux)</li>
              <li><strong>Data logger:</strong> Long-term monitoring — Temperature, humidity, CO₂</li>
              <li><strong>Flue gas analyser:</strong> Boiler efficiency — O₂, CO₂, CO, efficiency %</li>
              <li><strong>Anemometer:</strong> Ventilation assessment — Air velocity, flow rate</li>
              <li><strong>Ultrasonic flow meter:</strong> Water/heating systems — Flow rate, heat transfer</li>
            </ul>
            <p><strong>Measurement Protocols</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Calibration:</strong> Ensure all instruments are within calibration date and accuracy specifications</li>
              <li><strong>Representative conditions:</strong> Measure during typical operating conditions, not during maintenance or unusual loads</li>
              <li><strong>Duration:</strong> Spot measurements suit stable systems; logging required for varying loads</li>
              <li><strong>Documentation:</strong> Record location, date, time, conditions, and any abnormalities</li>
            </ul>
            <p><strong>Survey tip:</strong> Interview facilities staff and building users - operational practices often explain unexpected consumption patterns that measurements alone cannot reveal.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Energy Use Intensity Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate EUI for a 5,000m² office building consuming 850,000 kWh electricity and 450,000 kWh gas annually.</p>
            <p>Given:</p>
            <p>Floor area = 5,000 m² (GIA)</p>
            <p>Electricity = 850,000 kWh/year</p>
            <p>Gas = 450,000 kWh/year</p>
            <p>Calculations:</p>
            <p>Electrical EUI = 850,000 ÷ 5,000 = 170 kWh/m²/year</p>
            <p>Fossil EUI = 450,000 ÷ 5,000 = 90 kWh/m²/year</p>
            <p>Total EUI = 170 + 90 = 260 kWh/m²/year</p>
            <p>Benchmark: CIBSE TM46 typical office = 120 electricity + 120 gas = 240 kWh/m²</p>
            <p>Assessment: Electrical consumption above benchmark - investigate lighting and cooling</p>
            <p>
              <strong>Example 2: Simple Payback Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> LED lighting retrofit for an office floor - assess financial viability.</p>
            <p>Current situation:</p>
            <p>100 x 58W T8 fluorescent fittings</p>
            <p>Operating hours: 2,500 hours/year</p>
            <p>Current consumption: 100 × 58W × 2,500h = 14,500 kWh/year</p>
            <p>Proposed LED:</p>
            <p>100 x 25W LED panels</p>
            <p>LED consumption: 100 × 25W × 2,500h = 6,250 kWh/year</p>
            <p>Savings calculation:</p>
            <p>Energy saved: 14,500 - 6,250 = 8,250 kWh/year</p>
            <p>At £0.28/kWh: 8,250 × £0.28 = £2,310/year</p>
            <p>Investment:</p>
            <p>Supply and install: £12,000</p>
            <p>Simple payback = £12,000 ÷ £2,310 = 5.2 years</p>
            <p>
              <strong>Example 3: Degree Day Normalisation</strong>
            </p>
            <p><strong>Scenario:</strong> Compare heating consumption between a mild year and a cold year.</p>
            <p>Year 1 (mild): Gas = 400,000 kWh, Degree days = 1,800</p>
            <p>Year 2 (cold): Gas = 520,000 kWh, Degree days = 2,400</p>
            <p>Normalised comparison (to 20-year average of 2,100 DD):</p>
            <p>Year 1 normalised = 400,000 × (2,100/1,800) = 466,667 kWh</p>
            <p>Year 2 normalised = 520,000 × (2,100/2,400) = 455,000 kWh</p>
            <p>Conclusion: Year 2 actually more efficient when weather-adjusted</p>
            <p>Without normalisation, Year 2 appears 30% worse</p>
            <p>After normalisation, Year 2 is 2.5% better</p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="ESOS audit reveals 12% saving but client refuses to act"
            situation={
              <>
                An ESOS Phase 3 audit on a 28-site retail estate identifies a portfolio of energy conservation measures totalling £840k investment with 4.2-year payback — a 12% reduction in total electricity use. The client uses the audit for ESOS compliance but does not implement any of the measures. Phase 3 introduced an action plan disclosure requirement.
              </>
            }
            whatToDo={
              <>
                Two distinct issues: (1) ESOS compliance — audit and action plan must be filed; the regulation does not mandate implementation; (2) commercial / reputational — non-implementation of identified savings is increasingly questioned by investors, by shareholder activists, and (post 2024) by the public action plan disclosure. Recommendation: Lead Assessor structures the action plan as a phased programme over the next 4-year cycle, with priority on quick-payback measures (lighting controls, BMS optimisation) — making partial implementation more achievable than the full £840k headline figure.
              </>
            }
            whyItMatters={
              <>
                ESOS audits regularly identify 5–15% savings that go unimplemented because the regulation has no implementation mandate. Phase 3's action plan disclosure is the first lever forcing this; future phases may go further. The auditor's value is no longer just identifying the savings — it is designing an implementation roadmap the client will actually follow.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "ESOS = mandatory 4-yearly audit for large UK undertakings (>250 employees or >£44m turnover).",
              "EN 16247 = European audit methodology standard (parts for buildings, processes, transport).",
              "Audit Types: 1 walk-through, 2 general, 3 investment-grade.",
              "Lead Assessor must be on an approved register and sign off the audit.",
              "Phase 3 added public action plan disclosure — implementation accountability.",
              "ISO 50001 EnMS exempts the organisation from the EN 16247 audit requirement.",
              "Audit must cover ≥95% of total energy consumption (buildings, transport, industrial processes).",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Energy management
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section5-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Metering strategies
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section5_1;
