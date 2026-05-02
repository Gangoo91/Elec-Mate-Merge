/**
 * Module 2 · Section 6 · Subsection 2 — Energy Analysis
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Whole-building energy balances, CIBSE TM46/TM54 benchmarking and the
 *   performance gap — turning design intent into measured-and-verified
 *   operational performance.
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

const TITLE = 'Energy Analysis - HNC Module 2 Section 6.2';
const DESCRIPTION =
  'Master energy analysis techniques for building services: energy balances, CIBSE TM46 benchmarking, TM54 operational energy prediction, and addressing the performance gap.';

const quickCheckQuestions = [
  {
    id: 'tm46-purpose',
    question: 'What is the primary purpose of CIBSE TM46?',
    options: [
      'Load calculation methodology',
      'Energy benchmarking for DECs',
      'Commissioning procedures',
      'Maintenance schedules',
    ],
    correctIndex: 1,
    explanation:
      "CIBSE TM46 'Energy Benchmarks' provides benchmark energy consumption data used for Display Energy Certificates (DECs) and allows comparison of building performance against typical and good practice values.",
  },
  {
    id: 'performance-gap',
    question: "The 'performance gap' in buildings refers to:",
    options: [
      'Difference between peak and average loads',
      'Gap between design predictions and actual operational energy use',
      'Space between building elements',
      'Time lag in thermal response',
    ],
    correctIndex: 1,
    explanation:
      'The performance gap describes the common finding that actual building energy consumption is significantly higher (often 2-5 times) than design-stage predictions, due to unrealistic modelling assumptions and operational factors.',
  },
  {
    id: 'tm54-approach',
    question: 'CIBSE TM54 addresses the performance gap by:',
    options: [
      'Using stricter U-value requirements',
      'Applying larger safety factors',
      'Using realistic operational profiles and unregulated loads',
      'Requiring air tightness testing',
    ],
    correctIndex: 2,
    explanation:
      "TM54 'Evaluating operational energy performance at design stage' requires consideration of realistic operational hours, out-of-hours energy use, unregulated loads, and actual equipment specifications rather than notional values.",
  },
  {
    id: 'energy-balance',
    question: 'In a building energy balance, which term is typically the largest energy output?',
    options: [
      'Fabric losses',
      'Ventilation losses',
      'Hot water consumption',
      'Electrical equipment gains',
    ],
    correctIndex: 0,
    explanation:
      'For most UK buildings, fabric losses (heat transfer through walls, roof, windows, floor) represent the largest energy output, typically accounting for 40-60% of total heat loss in heating-dominated climates.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a TM46 'typical' benchmark represent?",
    options: [
      'The best-performing 10% of buildings',
      'The median performance of existing buildings',
      'Building Regulations minimum requirement',
      'Net zero carbon target',
    ],
    correctAnswer: 1,
    explanation:
      "TM46 'typical' benchmarks represent median (50th percentile) performance of existing buildings of that type. 'Good practice' benchmarks represent the better-performing 25% of stock.",
  },
  {
    id: 2,
    question:
      'Which energy use is NOT included in Part L compliance calculations but contributes to actual consumption?',
    options: [
      'Space heating',
      'Server rooms and IT equipment',
      'Hot water heating',
      'Mechanical ventilation',
    ],
    correctAnswer: 1,
    explanation:
      "Server rooms, lifts, plug-in equipment, and other 'unregulated' loads are excluded from Part L compliance calculations but can represent 30-50% of actual building energy consumption.",
  },
  {
    id: 3,
    question: 'The energy balance equation for a building during heating mode is:',
    options: [
      'Energy in = Energy out',
      'Gains (heating + solar + internal) = Losses (fabric + ventilation)',
      'Heating load = U-value × Area',
      'Energy = Power × Time',
    ],
    correctAnswer: 1,
    explanation:
      'In steady-state, energy inputs (heating system, solar gains, internal gains from people, lights, equipment) must balance energy outputs (fabric heat loss, ventilation/infiltration losses).',
  },
  {
    id: 4,
    question: 'Display Energy Certificates (DECs) are based on:',
    options: [
      'Design-stage calculations',
      'Part L compliance modelling',
      'Actual metered energy consumption',
      'Equipment nameplate ratings',
    ],
    correctAnswer: 2,
    explanation:
      "DECs use actual metered energy consumption data, providing an 'operational rating' that reflects real-world performance. This contrasts with EPCs which use design-stage (asset rating) calculations.",
  },
  {
    id: 5,
    question: 'What typical uplift might TM54 methodology show compared to Part L calculations?',
    options: ['10-20% higher', '50-100% higher', '150-300% higher', 'No significant difference'],
    correctAnswer: 2,
    explanation:
      'TM54 analysis typically reveals energy consumption 150-300% (1.5-3 times) higher than Part L predictions, primarily due to extended operating hours, unregulated loads, and realistic equipment efficiencies.',
  },
  {
    id: 6,
    question: 'Which factor typically has the largest impact on the performance gap?',
    options: [
      'Weather variations from design assumptions',
      'Extended operating hours and out-of-hours consumption',
      'Variations in U-values',
      'Occupant density',
    ],
    correctAnswer: 1,
    explanation:
      "Extended operating hours (security, cleaning, early start-up) and out-of-hours 'baseload' consumption (IT, servers, emergency lighting) typically contribute most to the performance gap.",
  },
  {
    id: 7,
    question: 'TM46 provides separate benchmarks for:',
    options: [
      'Summer and winter only',
      'Heating and cooling energy only',
      'Fossil-thermal and electricity separately',
      'Weekday and weekend consumption',
    ],
    correctAnswer: 2,
    explanation:
      'TM46 provides separate benchmarks for fossil-thermal energy (gas, oil) and electricity, recognising their different carbon intensities and the importance of tracking electrical efficiency separately.',
  },
  {
    id: 8,
    question: 'A building has a DEC rating of 85. This means:',
    options: [
      'It performs 85% better than typical',
      'Its energy use is 85% of the TM46 typical benchmark',
      '85 kWh/m²/year consumption',
      '85% of heating requirements are met by renewables',
    ],
    correctAnswer: 1,
    explanation:
      "A DEC rating of 85 means the building's energy use is 85% of the TM46 typical benchmark for that building type - slightly better than average. Ratings below 100 indicate better than typical performance.",
  },
  {
    id: 9,
    question: "When conducting energy analysis, 'degree days' are used to:",
    options: [
      'Calculate solar gains',
      'Normalise energy consumption for weather variations',
      'Determine equipment operating hours',
      'Set thermostat schedules',
    ],
    correctAnswer: 1,
    explanation:
      'Degree days allow weather normalisation of heating/cooling energy consumption, enabling fair year-on-year comparisons and performance benchmarking regardless of weather variations.',
  },
  {
    id: 10,
    question:
      'Which TM54 factor addresses the difference between nameplate and actual equipment power?',
    options: [
      'Diversity factor',
      'Operating hours adjustment',
      'Efficiency adjustment',
      'Climate correction',
    ],
    correctAnswer: 2,
    explanation:
      'TM54 applies efficiency adjustments to account for the difference between nameplate ratings (maximum capacity) and actual operating efficiency, including part-load performance and auxiliary power consumption.',
  },
  {
    id: 11,
    question: 'What is the typical TM46 electricity benchmark for a naturally ventilated office?',
    options: [
      '25-35 kWh/m²/year',
      '55-75 kWh/m²/year',
      '95-120 kWh/m²/year',
      '150-200 kWh/m²/year',
    ],
    correctAnswer: 1,
    explanation:
      'TM46 typical electricity benchmark for naturally ventilated offices is approximately 55-75 kWh/m²/year. Air-conditioned offices are significantly higher at 95-120 kWh/m²/year due to cooling loads.',
  },
  {
    id: 12,
    question: "The 'Carbonbuzz' database helps address the performance gap by:",
    options: [
      'Providing design calculation software',
      'Collecting anonymised actual vs predicted energy data',
      'Certifying building energy performance',
      'Training building managers',
    ],
    correctAnswer: 1,
    explanation:
      'Carbonbuzz (RIBA/CIBSE) collects anonymised data on actual vs predicted energy performance, providing evidence of the performance gap and helping calibrate future design predictions.',
  },
];

const faqs = [
  {
    question: 'Why is there such a large gap between predicted and actual energy consumption?',
    answer:
      'Multiple factors contribute: Part L uses standard occupancy and operating hours that are often shorter than reality; unregulated loads (IT, lifts, plug-in equipment) are excluded from compliance but significant in practice; design models assume optimal controls but real operation is less efficient; and buildings often operate 24/7 for security/cleaning rather than assumed occupied hours only.',
  },
  {
    question: 'How should I use TM46 benchmarks in practice?',
    answer:
      "Use them for three purposes: (1) Early design targets - 'good practice' values inform what's achievable; (2) DEC comparisons - understand where a building sits relative to stock; (3) Identifying opportunities - large differences between actual and 'good practice' suggest improvement potential. Always compare like-with-like (same building type, climate zone).",
  },
  {
    question: 'When is TM54 analysis required?',
    answer:
      "TM54 analysis isn't mandatory but is increasingly expected for significant projects, particularly BREEAM assessments (which award credits for operational energy prediction), Soft Landings projects, and where clients require realistic energy cost predictions. It should be standard practice for any building where operational costs matter.",
  },
  {
    question: 'What data do I need for a TM54 assessment?',
    answer:
      'You need: realistic operating hours including cleaning and security; out-of-hours baseload estimates; actual equipment specifications (not notional values); server room and IT loads; catering equipment if applicable; lift energy consumption; external lighting; and realistic control system effectiveness. Much of this requires client input about intended operation.',
  },
  {
    question: 'How do I weather-normalise energy consumption data?',
    answer:
      'Use degree-day data: calculate the ratio of actual degree days to long-term average degree days, then adjust heating energy proportionally. For example, if actual heating degree days were 90% of average and consumption was 100 MWh, weather-normalised consumption = 100/0.9 = 111 MWh. Cooling energy uses cooling degree days similarly.',
  },
  {
    question: 'What actions can reduce the performance gap?',
    answer:
      'Design stage: use TM54 methodology with realistic assumptions. Construction: ensure commissioning verifies design intent. Handover: implement Soft Landings with extended aftercare. Operation: sub-meter key loads, monitor against benchmarks, maintain BMS optimisation. The gap often increases over time, so ongoing monitoring is essential.',
  },
];

const HNCModule2Section6_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 2"
            title="Energy Analysis"
            description="Understanding energy balances, benchmarking methodologies, and bridging the performance gap."
            tone="purple"
          />

          <TLDR
            points={[
              'You construct a whole-building Sankey-style energy balance and use it to spot the dominant loss/gain path before specifying retrofit measures.',
              'You benchmark performance against CIBSE TM46 by use-class (kWh/m²·year electricity and fossil fuel) and explain divergence quantitatively.',
              'You apply CIBSE TM54 to predict operational energy at design stage — the rigorous answer to &ldquo;what will it actually use, not what does the EPC say&rdquo;.',
              'You weather-normalise meter data using degree-days and calibrate a building energy model to close the performance gap.',
            ]}
          />

          <RegsCallout
            source="CIBSE TM46 — Energy Benchmarks; CIBSE TM54 — Evaluating Operational Energy Performance of Buildings at the Design Stage"
            clause="TM46 provides typical and good-practice annual energy consumption benchmarks for 29 building categories; TM54 sets the methodology for predicting operational energy use at design stage, including all unregulated loads."
            meaning={
              <>
                TM46 + TM54 are the design-to-operation toolkit. As HNC engineer you cite
                TM46 to set baseline expectations against the developer&rsquo;s peers, and you
                run TM54 alongside the SBEM/SAP submission so the client sees the realistic
                operational forecast — not just the regulated-energy EPC band.
              </>
            }
            cite="Source: CIBSE TM46 Energy Benchmarks; CIBSE TM54 Evaluating Operational Energy Performance of Buildings at the Design Stage; CIBSE Guide F — Energy Efficiency in Buildings."
          />

          <LearningOutcomes
            outcomes={[
              'Construct and interpret building energy balance diagrams',
              'Apply CIBSE TM46 benchmarks for performance comparison',
              'Understand TM54 methodology for operational energy prediction',
              'Identify causes of the performance gap',
              'Weather-normalise energy consumption data',
              'Develop strategies to reduce the performance gap',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Energy Balances"
            plainEnglish="In steady state, every joule going in has to come back out. Drawing the balance shows you which path is dominant - that's where to spend your design effort."
          >
            <p>
              An energy balance quantifies all energy flows into and out of a building. In
              steady-state conditions, total energy inputs must equal total energy outputs plus any
              change in stored energy.
            </p>
            <p>
              <strong>Energy inputs (gains):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heating system (boilers, heat pumps)</li>
              <li>Solar gains through glazing</li>
              <li>Internal gains - people</li>
              <li>Internal gains - lighting</li>
              <li>Internal gains - equipment</li>
              <li>Hot water system</li>
            </ul>
            <p>
              <strong>Energy outputs (losses):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fabric losses - walls, roof, floor</li>
              <li>Window losses (conduction)</li>
              <li>Infiltration losses</li>
              <li>Ventilation losses</li>
              <li>Hot water to drain</li>
              <li>Cooling system rejection</li>
            </ul>
            <p>
              <strong>Steady-state energy balance:</strong> Q_heating + Q_solar + Q_internal =
              Q_fabric + Q_ventilation. When cooling: Q_solar + Q_internal = Q_cooling + Q_losses.
            </p>
            <p>
              <strong>Typical energy balance breakdown (UK office):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fabric losses:</strong> 40-50% of total heat loss
              </li>
              <li>
                <strong>Ventilation:</strong> 25-35% of total heat loss
              </li>
              <li>
                <strong>Infiltration:</strong> 10-15% of total heat loss
              </li>
              <li>
                <strong>Useful solar/internal gains:</strong> Can offset 20-30% of heating
              </li>
            </ul>
            <p>
              <strong>Key insight:</strong> Understanding the energy balance helps identify the most
              effective interventions. If ventilation losses dominate, heat recovery is more
              valuable than fabric upgrades.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="TM46 Energy Benchmarking"
            plainEnglish="TM46 gives you 'typical' and 'good practice' kWh/m² figures by building type so you can place a building's actual performance in context. It's also the basis of DEC ratings."
          >
            <p>
              CIBSE TM46 provides energy benchmarks for different building types, enabling
              comparison of actual performance against typical and good practice values. These
              benchmarks underpin Display Energy Certificates (DECs).
            </p>
            <p>
              <strong>TM46 benchmark categories (electricity / fossil-thermal in kWh/m², typical / good):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Office (naturally ventilated): elec 54/33; fossil 151/79</li>
              <li>Office (air conditioned): elec 128/97; fossil 178/97</li>
              <li>Schools: elec 41/32; fossil 150/113</li>
              <li>Hospital (clinical): elec 90/65; fossil 420/350</li>
              <li>Retail (non-food): elec 165/105; fossil 120/55</li>
            </ul>
            <p>
              <strong>DEC rating calculation:</strong> DEC Rating = (Actual Energy / TM46 Typical) ×
              100. Rating &lt;100 = better than typical, Rating &gt;100 = worse than typical.
            </p>
            <p>
              <strong>DEC rating bands:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A:</strong> 0-25 (exceptional)
              </li>
              <li>
                <strong>B:</strong> 26-50 (excellent)
              </li>
              <li>
                <strong>C:</strong> 51-75 (good)
              </li>
              <li>
                <strong>D:</strong> 76-100 (typical)
              </li>
              <li>
                <strong>E-G:</strong> &gt;100 (poor to very poor)
              </li>
            </ul>
            <p>
              <strong>When DECs are required:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Public buildings &gt;250m² with public access</li>
              <li>Renewed annually</li>
              <li>Based on 12 months actual consumption</li>
              <li>Must be displayed prominently</li>
            </ul>
            <p>
              <strong>Important:</strong> TM46 benchmarks are based on gross internal floor area
              (GIA). Ensure consistent floor area measurement when comparing buildings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="TM54 Operational Energy Prediction"
            plainEnglish="Part L gives you compliance numbers, not real-life energy. TM54 forces realistic schedules, the small power people forget, lifts, catering, the lot."
          >
            <p>
              CIBSE TM54 'Evaluating operational energy performance of buildings at the design
              stage' provides methodology for predicting realistic energy consumption, bridging the
              gap between compliance calculations and actual operational performance.
            </p>
            <p>
              <strong>TM54 additional considerations (factor / Part L assumption / TM54 reality):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Operating hours / standard schedules / actual + out-of-hours</li>
              <li>Small power / excluded / full assessment</li>
              <li>Server rooms / excluded / full 24/7 load</li>
              <li>Lifts / excluded / based on traffic</li>
              <li>Catering / excluded / full assessment</li>
              <li>System efficiency / notional values / actual specifications</li>
            </ul>
            <p>
              <strong>TM54 process:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Start with Part L/dynamic simulation model</li>
              <li>Adjust operating hours to realistic schedules</li>
              <li>Add all unregulated loads (IT, lifts, catering, etc.)</li>
              <li>Adjust system efficiencies to actual specifications</li>
              <li>Include out-of-hours baseload consumption</li>
              <li>Apply management factor for control effectiveness</li>
            </ul>
            <p>
              <strong>Typical TM54 uplift factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Operating hours:</strong> +20-50% (cleaning, security, early start)
              </li>
              <li>
                <strong>Unregulated loads:</strong> +30-50% of regulated consumption
              </li>
              <li>
                <strong>System efficiency:</strong> +10-20% (part-load, auxiliaries)
              </li>
              <li>
                <strong>Management factor:</strong> +10-15% (control sub-optimality)
              </li>
            </ul>
            <p>
              <strong>Result:</strong> TM54 predictions are typically 1.5-3 times higher than Part L
              calculations, much closer to actual operational consumption.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Understanding and Addressing the Performance Gap"
            plainEnglish="Most buildings burn 2-3× their predicted energy. The reasons span design optimism, build quality, rushed commissioning and sloppy operation - so the fix needs to span all four."
          >
            <p>
              The performance gap - where actual building energy consumption significantly exceeds
              design predictions - is a major industry challenge. Understanding its causes is
              essential for delivering buildings that meet energy targets in practice.
            </p>
            <p>
              <strong>Causes of the performance gap - design stage:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Unrealistic occupancy assumptions</li>
              <li>Optimistic control effectiveness</li>
              <li>Excluded unregulated loads</li>
              <li>Standard vs actual equipment data</li>
            </ul>
            <p>
              <strong>Causes - construction:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Build quality variations</li>
              <li>Thermal bridging worse than modelled</li>
              <li>Air tightness failures</li>
              <li>Services not as specified</li>
            </ul>
            <p>
              <strong>Causes - commissioning:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Insufficient time allocation</li>
              <li>Systems not optimised</li>
              <li>Controls set incorrectly</li>
              <li>Poor documentation</li>
            </ul>
            <p>
              <strong>Causes - operation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Extended operating hours</li>
              <li>Poor control strategies</li>
              <li>Lack of ongoing optimisation</li>
              <li>Occupant behaviour</li>
            </ul>
            <p>
              <strong>Evidence from Carbonbuzz:</strong> Offices show actual consumption typically
              2.5× design predictions. Schools typically 2× design predictions. Electricity gap
              often larger than heating gap. Gap has not significantly reduced over past decade.
            </p>
            <p>
              <strong>Strategies to reduce the gap:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Design:</strong> Use TM54 methodology with realistic assumptions
              </li>
              <li>
                <strong>Specification:</strong> Require actual performance data, not notional
              </li>
              <li>
                <strong>Construction:</strong> Air tightness testing, thermal imaging
              </li>
              <li>
                <strong>Commissioning:</strong> Extended seasonal commissioning period
              </li>
              <li>
                <strong>Handover:</strong> Soft Landings with 3-year aftercare
              </li>
              <li>
                <strong>Operation:</strong> Sub-metering, continuous monitoring, BMS optimisation
              </li>
            </ul>
            <p>
              <strong>Industry trend:</strong> Increasingly, contracts include energy performance
              guarantees based on TM54 predictions, with financial penalties for non-compliance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Three sums covering a DEC rating from real metered data, the TM54 uplift on top of Part L, and weather-normalising heating energy with degree days."
          >
            <p>
              <strong>Example 1 - DEC rating calculation:</strong> A 5,000m² air-conditioned office
              consumes 750,000 kWh electricity and 600,000 kWh gas annually. Calculate the DEC
              rating.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Electricity: 750,000 / 5,000 = 150 kWh/m²</li>
              <li>Gas: 600,000 / 5,000 = 120 kWh/m²</li>
              <li>TM46 typical (AC office): elec 128 kWh/m², fossil-thermal 178 kWh/m²</li>
              <li>Actual CO₂: (150 × 0.233) + (120 × 0.184) = 57.0 kgCO₂/m²</li>
              <li>Typical CO₂: (128 × 0.233) + (178 × 0.184) = 62.6 kgCO₂/m²</li>
              <li>DEC Rating: (57.0 / 62.6) × 100 = <strong>91 (Band D)</strong></li>
              <li>Building performs slightly better than typical</li>
            </ul>
            <p>
              <strong>Example 2 - TM54 uplift:</strong> A Part L calculation shows 80 kWh/m²
              regulated energy for an office. Estimate TM54 operational energy.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Part L regulated energy: 80 kWh/m²</li>
              <li>Operating hours uplift (+30%): 80 × 1.3 = 104 kWh/m²</li>
              <li>Add unregulated (small power, servers): +45 kWh/m²</li>
              <li>Add lifts: +5 kWh/m²</li>
              <li>Add catering: +10 kWh/m²</li>
              <li>Management factor (+10%): (104 + 60) × 1.1 = 180 kWh/m²</li>
              <li>TM54 prediction: <strong>180 kWh/m²</strong> - 2.25× the Part L calculation</li>
            </ul>
            <p>
              <strong>Example 3 - Weather normalisation:</strong> A building used 450 MWh heating
              energy in a year with 2,100 degree days. Long-term average is 2,400 degree days. What
              is the weather-normalised consumption?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Actual heating energy: 450 MWh; Actual degree days: 2,100; Average: 2,400</li>
              <li>Degree day ratio: 2,100 / 2,400 = 0.875 (milder than average year)</li>
              <li>Weather-normalised consumption: 450 / 0.875 = <strong>514 MWh</strong></li>
              <li>In an average year, would have used 514 MWh</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The handful of formulas, carbon factors and benchmark values you'll quote in any energy report."
          >
            <p>
              <strong>Key formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EUI:</strong> Energy Use Intensity = Total energy / Floor area (kWh/m²)
              </li>
              <li>
                <strong>DEC:</strong> Rating = (Actual/Typical benchmark) × 100
              </li>
              <li>
                <strong>Weather normalised:</strong> Actual × (Average DD / Actual DD)
              </li>
              <li>
                <strong>Carbon:</strong> kgCO₂ = kWh × emission factor
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Grid electricity: <strong>0.233 kgCO₂/kWh</strong> (2023 factor)
              </li>
              <li>
                Natural gas: <strong>0.184 kgCO₂/kWh</strong>
              </li>
              <li>
                TM54 uplift: typically <strong>1.5-3× Part L</strong>
              </li>
              <li>
                London degree days: <strong>~2,400/year</strong> (heating)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Wrong floor area:</strong> TM46 uses GIA, not NIA or GEA
                </li>
                <li>
                  <strong>Mixing fuels:</strong> Don't add kWh directly without carbon weighting
                </li>
                <li>
                  <strong>Ignoring baseload:</strong> 24/7 consumption often overlooked
                </li>
                <li>
                  <strong>Outdated factors:</strong> Carbon factors change annually
                </li>
              </ul>
            }
            doInstead="Use GIA for benchmarking, weight fuels by carbon factor before comparing, include the 24/7 baseload in TM54 work, and refresh carbon factors yearly from the latest BEIS/DESNZ figures."
          />

          <SectionRule />

          <Scenario
            title="Closing the performance gap on a 5-year-old hospital wing"
            situation={
              <>
                A 12,000 m² hospital wing is consuming 480 kWh/m²·year against a TM46
                typical benchmark of 410 and a design forecast of 360. The client wants to
                know why and what to fix. You have access to one year of half-hourly meter
                data, BMS trend logs and the original Stage-4 design file.
              </>
            }
            whatToDo={
              <>
                Weather-normalise consumption to a 20-year degree-day baseline. Disaggregate
                meter data by end use (HVAC, lighting, IT, hot water, kitchen). Compare
                against CIBSE TM46 healthcare sub-categories. Build the Sankey energy
                balance from BMS data and compare to the TM54 design model. Identify the
                top three excess paths — typically: simultaneous heating &amp; cooling,
                AHU running 24/7, hot-water deadleg losses. Quote the kWh and £
                saving for each fix.
              </>
            }
            whyItMatters={
              <>
                NHS Trusts are under explicit Net-Zero targets (NHS Net Zero by 2040 for
                Scope 1+2). A 17% performance gap on a 12,000 m² wing is roughly £40k/yr
                and 100+ tCO₂e. The Sankey + TM54 closing exercise turns vague
                &ldquo;feels too high&rdquo; complaints into a costed, prioritised retrofit
                plan.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Energy balance at steady state: Σ inputs = Σ outputs — drives priorities for retrofit.',
              'CIBSE TM46 = annual benchmark by use class; TM54 = design-stage operational forecast.',
              'Performance gap = (operational − design); typical 1.5–2.5× without active commissioning.',
              'Weather-normalise using heating and cooling degree-days at the project base temperature.',
              'Unregulated loads (small power, lifts, kitchens, ICT rooms) often dominate operational energy — must be in TM54.',
              'Calibrate dynamic model to first-year half-hourly data — the auditable bridge between design and operation.',
              'Soft Landings (BSRIA BG54) is the procurement framework that institutionalises closing the performance gap.',
              'CIBSE Guide F is the UK reference for whole-life energy efficiency in buildings.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Load estimation methods
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Building simulation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section6_2;
