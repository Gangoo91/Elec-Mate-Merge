/**
 * Module 6 · Section 3 · Subsection 2 — BREEAM Water Category
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Water consumption targets, efficient fittings, metering, leak detection, and water recycling systems
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

const TITLE = 'BREEAM Water Category - HNC Module 6 Section 3.2';
const DESCRIPTION =
  'Master BREEAM Water assessment methodology: Wat 01 water consumption calculations, efficient sanitary fittings, flow rate specifications, metering requirements, leak detection systems, rainwater harvesting, and greywater recycling for sustainable buildings.';

const quickCheckQuestions = [
  {
    id: 'wat01-baseline',
    question: "What does the BREEAM water calculator compare a building's consumption against?",
    options: [
      'A baseline building using standard fittings',
      'EU Water Framework Directive limits',
      'Local water authority targets',
      'Historic consumption data from similar buildings',
    ],
    correctIndex: 0,
    explanation:
      "The BREEAM water calculator compares the assessed building's predicted water consumption against a notional baseline building fitted with standard sanitary components at specified flow rates and flush volumes.",
  },
  {
    id: 'water-metering',
    question: 'What is the primary purpose of water metering in BREEAM assessments?',
    options: [
      'To enable monitoring of consumption and identification of leaks',
      'To meet Building Regulations requirements',
      'To qualify for water company discounts',
      'To calculate water bills accurately',
    ],
    correctIndex: 0,
    explanation:
      'Water metering enables building occupants and managers to monitor consumption patterns, identify abnormal usage indicating leaks, and implement water management strategies to reduce consumption over time.',
  },
  {
    id: 'efficient-wc',
    question:
      "What maximum effective flush volume qualifies as 'best practice' for WCs under BREEAM?",
    options: [
      '6.0 litres',
      '4.0 litres',
      '4.5 litres',
      '3.0 litres',
    ],
    correctIndex: 1,
    explanation:
      'BREEAM best practice for WCs is an effective flush volume of 4.0 litres or less. The effective flush volume accounts for dual flush mechanisms using the formula: (full flush + reduced flush) / 3.',
  },
  {
    id: 'greywater-definition',
    question: 'Which water sources are classified as greywater for recycling purposes?',
    options: [
      'All wastewater including kitchen sinks',
      'Wastewater from basins, showers, and baths',
      'Water from WCs and urinals',
      'Rainwater from roofs only',
    ],
    correctIndex: 1,
    explanation:
      'Greywater is lightly contaminated wastewater from basins, showers, and baths. It excludes blackwater (WCs/urinals) and water from kitchen sinks which contains fats and food waste.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many BREEAM credits are available under Wat 01 (Water Consumption)?',
    options: [
      '3 credits',
      '5 credits',
      '6 credits',
      '9 credits',
    ],
    correctAnswer: 1,
    explanation:
      'Wat 01 Water Consumption offers up to 5 credits based on the percentage improvement in water efficiency compared to the baseline building. Additional credits may be available through innovation.',
  },
  {
    id: 2,
    question:
      'What is the baseline flow rate for wash hand basin taps in the BREEAM water calculator?',
    options: [
      '8 litres/minute',
      '3 litres/minute',
      '6 litres/minute',
      '12 litres/minute',
    ],
    correctAnswer: 2,
    explanation:
      'The BREEAM baseline flow rate for wash hand basin taps is 6 litres/minute. Best practice fittings achieve 4 litres/minute or less through flow restrictors or aerators.',
  },
  {
    id: 3,
    question:
      'To achieve maximum credits for water consumption, what percentage improvement over baseline is required?',
    options: [
      '40% improvement',
      '25% improvement',
      '65% improvement',
      '55% improvement',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum credits (5 credits) require a 55% or greater improvement in water efficiency compared to the baseline building. The credit thresholds are graduated: 12.5% (1 credit), 25% (2 credits), 40% (3 credits), 50% (4 credits), 55% (5 credits).',
  },
  {
    id: 4,
    question: 'What type of meter is required to achieve credits under Wat 02 (Water Monitoring)?',
    options: [
      'Pulsed output meters connected to BMS or data logger',
      'Manual read meters only',
      'Standard utility meters with monthly readings',
      'Mechanical dial meters with quarterly inspections',
    ],
    correctAnswer: 0,
    explanation:
      'Wat 02 requires pulsed output water meters connected to a BMS or data logging system capable of identifying abnormal consumption patterns and potential leaks through automated monitoring.',
  },
  {
    id: 5,
    question: 'Which BREEAM issue addresses leak detection systems?',
    options: [
      'Wat 02 Water Monitoring',
      'Wat 03 Water Leak Detection',
      'Wat 04 Water Efficient Equipment',
      'Wat 01 Water Consumption',
    ],
    correctAnswer: 1,
    explanation:
      'Wat 03 Water Leak Detection specifically addresses the installation of leak detection systems on the mains water supply to minimise water wastage from undetected leaks.',
  },
  {
    id: 6,
    question: 'What is the effective flush volume formula for dual flush WCs?',
    options: [
      '(Full flush + Reduced flush) / 2',
      '(Full flush x 2 + Reduced flush) / 3',
      '(Full flush + Reduced flush) / 3',
      'Full flush x 0.67',
    ],
    correctAnswer: 2,
    explanation:
      'The effective flush volume for dual flush WCs is calculated as (full flush volume + reduced flush volume) / 3. This formula accounts for typical usage patterns where the reduced flush is used more frequently.',
  },
  {
    id: 7,
    question:
      'For a non-domestic building, which areas must have sub-metering for full Wat 02 credits?',
    options: [
      'The competent person who carried out the inspection.',
      'Automatically dimming artificial lighting in response to available natural light',
      'Tendency for AC current to flow near the conductor surface',
      'All major water uses including WCs, kitchens, and any process uses',
    ],
    correctAnswer: 3,
    explanation:
      'Full Wat 02 credits require sub-metering of all major water uses including WCs/washrooms, kitchens/catering, any process or industrial water use, and external irrigation systems where installed.',
  },
  {
    id: 8,
    question:
      'What is the typical payback period for rainwater harvesting systems in UK commercial buildings?',
    options: [
      '5-10 years',
      '15-20 years',
      '1-2 years',
      'Over 25 years',
    ],
    correctAnswer: 0,
    explanation:
      'Rainwater harvesting systems in UK commercial buildings typically achieve payback periods of 5-10 years depending on building size, rainfall catchment area, water demand profile, and local water costs.',
  },
  {
    id: 9,
    question: 'What evidence is required for Wat 01 compliance at design stage?',
    options: [
      'The percentage voltage drop at full load due to resistance and reactance',
      'Completed BREEAM water calculator with specified fittings',
      'To avoid confusion and track which areas have been tested',
      'A circuit that produces a fraction of the input voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Design stage evidence requires a completed BREEAM water calculator showing all specified sanitary fittings with their flow rates/flush volumes, plus specifications or schedules confirming the fittings to be installed.',
  },
  {
    id: 10,
    question: 'Which water source is NOT suitable for WC flushing without treatment?',
    options: [
      'Rainwater from non-trafficked roofs',
      'Greywater from showers',
      'Blackwater from urinals',
      'Surface water from SUDS attenuation',
    ],
    correctAnswer: 2,
    explanation:
      'Blackwater (from WCs and urinals) requires extensive treatment before reuse and is not suitable for simple recycling systems. Rainwater, greywater, and surface water can be used for WC flushing with appropriate filtration and treatment.',
  },
  {
    id: 11,
    question: 'What is the baseline shower flow rate in the BREEAM water calculator?',
    options: [
      '6 litres/minute',
      '8 litres/minute',
      '12 litres/minute',
      '10 litres/minute',
    ],
    correctAnswer: 3,
    explanation:
      'The baseline shower flow rate is 10 litres/minute. Best practice showers achieve 6 litres/minute or less while maintaining adequate performance through optimised spray patterns and aeration.',
  },
  {
    id: 12,
    question: 'A leak detection system must be capable of detecting flow rates as low as:',
    options: [
      '1 litre/minute',
      'No minimum specified',
      '0.1 litres/second',
      '10 litres/minute',
    ],
    correctAnswer: 0,
    explanation:
      'BREEAM leak detection systems must be capable of detecting continuous flow rates as low as 1 litre/minute to identify small but persistent leaks that could result in significant water wastage over time.',
  },
];

const faqs = [
  {
    question: 'How does the BREEAM water calculator handle mixed-use buildings?',
    answer:
      'Mixed-use buildings are assessed by calculating water consumption for each use type separately using the appropriate activity data (occupancy, operating hours, etc.). The calculator allows different sanitary fitting specifications for different zones, then combines the results to determine overall improvement against a mixed-use baseline. Each distinct use must be identified with its floor area, occupancy, and operating pattern.',
  },
  {
    question: 'Can greywater recycling achieve additional credits beyond Wat 01?',
    answer:
      'Greywater recycling contributes to Wat 01 credits by reducing mains water consumption - the recycled water offsets demand for flushing/irrigation. While there are no separate credits specifically for greywater systems, they may contribute to innovation credits if the approach is exemplary or novel. The water calculator includes inputs for alternative water sources including recycled water volumes.',
  },
  {
    question: 'What happens if specified fittings are substituted during construction?',
    answer:
      'Post-construction assessment requires evidence that installed fittings match or exceed the specification used in the water calculator. If substitutions occur, the calculator must be updated with actual flow rates/flush volumes. If performance is reduced, fewer credits may be achieved. Assessors require product data sheets, test certificates, or site verification of installed flow rates to confirm compliance.',
  },
  {
    question: 'Are waterless urinals always the best choice for BREEAM credits?',
    answer:
      'Waterless urinals offer the lowest water consumption and contribute to maximum Wat 01 credits. However, they require appropriate maintenance regimes and compatible drainage systems. Some clients prefer low-flush urinals (0.5-1.0 litres/bowl/hour) which still achieve significant improvements over baseline (7.5 litres/bowl/hour) while using conventional maintenance approaches. The choice depends on maintenance capabilities and client preferences.',
  },
  {
    question: 'How do I demonstrate leak detection compliance at design stage?',
    answer:
      'Design stage evidence includes: specifications for the leak detection system showing detection sensitivity (1 litre/minute minimum), system schematic showing meter and flow switch locations on the mains supply, BMS or alarm system connection details, and confirmation of automatic shut-off or alert capability. Post-construction evidence requires commissioning records demonstrating the system can detect the specified flow rates.',
  },
  {
    question: 'What maintenance requirements apply to rainwater harvesting systems?',
    answer:
      'BREEAM requires building user guides to include maintenance schedules for rainwater systems covering: filter cleaning/replacement (typically 3-6 monthly), tank inspection and cleaning (annual), pump maintenance, UV treatment system servicing (if fitted), and first flush device checking. The O&M manual must specify responsibilities and frequencies to ensure long-term system performance.',
  },
];

const HNCModule6Section3_2 = () => {
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
            eyebrow="Module 6 · Section 3 · Subsection 2"
            title="BREEAM Water Category"
            description="Water consumption targets, efficient fittings, metering, leak detection, and water recycling systems"
            tone="purple"
          />

          <TLDR
            points={[
              "BREEAM Wat 01–04 covers water consumption (sanitary fittings + appliances), metering with leak detection, water-efficient equipment in non-residential spaces, and water recycling (greywater / rainwater).",
              "Wat 01 uses a \"Fitting Performance Specification\" calculator — credits are scored on the predicted m³/person/year vs benchmarks; achieving 5+ credits requires WC ≤4 L, taps ≤4 L/min, showers ≤8 L/min, and rainwater or greywater contribution.",
              "Water sub-metering with leak detection (Wat 02) is a single mandatory credit for Excellent on non-residential — all major water-using areas must be metered with automatic leak alarms.",
            ]}
          />

          <RegsCallout
            source="Building Regulations Part G — Sanitation, Hot Water Safety and Water Efficiency"
            clause="New dwellings shall not exceed 125 litres of water per person per day, calculated using the Water Efficiency Calculator for New Dwellings published by the Department for Communities and Local Government. Where a planning authority designates a water stress area or imposes a tighter limit through a planning condition, the dwelling shall not exceed the lower limit (typically 110 litres/person/day in optional standard areas)."
            meaning={
              <>
                Part G is the legal floor (125 L/p/d default; 110 L/p/d optional). BREEAM credits are awarded for performance below the Part G limit. Many local plans (particularly south-east England) impose the 110 L/p/d optional standard, which already requires the same fitting choices as 3-credit BREEAM performance — so dwelling design must meet both simultaneously.
              </>
            }
            cite="Source: Approved Document G: Sanitation, hot water safety and water efficiency (2015 edition with 2016 amendments) — gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate water consumption using the BREEAM water calculator",
              "Specify efficient sanitary fittings to achieve credit thresholds",
              "Design water metering strategies for monitoring and sub-metering",
              "Specify leak detection systems meeting BREEAM requirements",
              "Evaluate rainwater harvesting and greywater recycling options",
              "Prepare evidence documentation for design and post-construction stages",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Wat 01: Water Consumption">
            <p>The Water Consumption issue (Wat 01) is the primary credit-generating opportunity within the BREEAM Water category. It uses a standardised calculator methodology to compare the assessed building's predicted water consumption against a notional baseline building fitted with conventional sanitary components.</p>
            <p><strong>Credit Thresholds for Wat 01:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>12.5% improvement:</strong> 1 credit — Standard efficient fittings</li>
              <li><strong>25% improvement:</strong> 2 credits — Good practice fittings throughout</li>
              <li><strong>40% improvement:</strong> 3 credits — Best practice fittings</li>
              <li><strong>50% improvement:</strong> 4 credits — Best practice + low-flush WCs</li>
              <li><strong>55% improvement:</strong> 5 credits — Best practice + waterless urinals/recycled water</li>
            </ul>
            <p><strong>BREEAM Water Calculator Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Building data:</strong> Floor area, occupancy levels, operating hours by use type</li>
              <li><strong>Sanitary fittings:</strong> WCs, urinals, WHB taps, showers, kitchen taps, baths</li>
              <li><strong>Flow rates/flush volumes:</strong> Specified for each fitting type</li>
              <li><strong>Alternative water sources:</strong> Rainwater, greywater, borehole water</li>
              <li><strong>Process water:</strong> Cooling towers, laboratories, specialist uses</li>
            </ul>
            <p><strong>Design principle:</strong> The water calculator automatically compares actual specifications against baseline values - specify efficient fittings throughout to maximise improvement percentage.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Efficient Sanitary Fittings">
            <p>Selecting appropriate sanitary fittings is the primary mechanism for achieving water efficiency credits. Each fitting type has baseline and best practice flow rates or flush volumes defined in the BREEAM methodology.</p>
            <p><strong>Flow Rates and Flush Volumes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>WC (single flush):</strong> 6.0 litres — 4.0 litres — Per flush volume</li>
              <li><strong>WC (dual flush):</strong> 6.0 litres effective — 4.0 litres effective — (Full + Reduced) / 3</li>
              <li><strong>Urinal (per bowl/hour):</strong> 7.5 litres — 0 litres (waterless) — Or demand-flush systems</li>
              <li><strong>WHB tap:</strong> 6 l/min — 4 l/min — Flow restrictors or aerators</li>
              <li><strong>Shower:</strong> 10 l/min — 6 l/min — Low-flow showerheads</li>
              <li><strong>Kitchen tap:</strong> 12 l/min — 8 l/min — Higher flow needed for filling</li>
              <li><strong>Bath:</strong> No flow limit — Volume limit — Based on bath capacity</li>
            </ul>
            <p><strong>Flow Control Technologies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Aerators (mix air with water)</li>
              <li>Flow restrictors (fixed orifice)</li>
              <li>Pressure compensating valves</li>
              <li>Spray taps for WHB</li>
            </ul>
            <p><strong>WC Technologies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dual flush mechanisms</li>
              <li>Reduced trapway designs</li>
              <li>Vacuum-assist systems</li>
              <li>Pressure-assist flushing</li>
            </ul>
            <p><strong>Urinal Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Waterless (cartridge systems)</li>
              <li>Demand flush (per use)</li>
              <li>Timed flush (reduced cycle)</li>
              <li>Presence-sensing controls</li>
            </ul>
            <p><strong>Effective Flush Volume Calculation Example</strong></p>
            <p><span>Dual flush WC:</span> 4.5 litre full / 3.0 litre reduced</p>
            <p><span>Formula:</span> (Full + Reduced) / 3</p>
            <p><span>Calculation:</span> (4.5 + 3.0) / 3 = 2.5 litres effective</p>
            <p>This exceeds best practice (4.0L) requirement</p>
            <p><strong>Best practice:</strong> Specify dual flush WCs with 4.5/3.0 litre or lower flush volumes - the effective flush of 2.5 litres significantly exceeds the best practice threshold.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Water Metering and Leak Detection">
            <p>Water monitoring (Wat 02) and leak detection (Wat 03) are essential for ongoing water management. These issues recognise that specifying efficient fittings alone is insufficient - buildings need monitoring systems to identify problems and verify actual consumption.</p>
            <p><strong>Wat 02: Water Monitoring Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1 credit:</strong> Pulsed output meter on mains supply — Connected to BMS or data logger</li>
              <li><strong>2 credits:</strong> Sub-metering of major water uses — WCs, kitchens, process uses, irrigation</li>
            </ul>
            <p><strong>Metering System Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pulsed output meters:</strong> Typically 1 pulse per litre or 10 litres depending on flow range</li>
              <li><strong>BMS integration:</strong> Pulse counting, data logging, alarm generation on abnormal consumption</li>
              <li><strong>Sub-meters:</strong> Located on branches to WC cores, kitchens, plant rooms, external taps</li>
              <li><strong>Data analysis:</strong> Capable of generating consumption reports and identifying trends</li>
            </ul>
            <p><strong>Wat 03: Leak Detection Systems</strong></p>
            <p><strong>Technical Requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Detect flows as low as 1 litre/minute</li>
              <li>Located on mains supply after meter</li>
              <li>Connected to BMS or alarm system</li>
              <li>Automatic shut-off or manual alert</li>
            </ul>
            <p><strong>System Types:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Flow-based detection (sustained low flow)</li>
              <li>Pressure monitoring (pressure drop)</li>
              <li>Acoustic detection (pipe noise analysis)</li>
              <li>Combination systems</li>
            </ul>
            <p><strong>Metering Strategy Example - Office Building</strong></p>
            <p>Location | Meter Type | Purpose</p>
            <p>---------|------------|--------</p>
            <p>Incoming main | Pulsed output + leak detection | Total consumption + leak alert</p>
            <p>Core WC riser | Sub-meter | Sanitary water use</p>
            <p>Kitchen/tea point | Sub-meter | Catering consumption</p>
            <p>Plant room | Sub-meter | Cooling/heating water use</p>
            <p>External tap | Sub-meter | Irrigation/cleaning</p>
            <p>Total: 5 meters providing full consumption breakdown</p>
            <p><strong>Integration tip:</strong> Specify leak detection sensitivity in the BMS functional specification - the system must be programmed to recognise sustained low flows (e.g., 1 l/min for 30 minutes) as potential leaks.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Water Recycling Systems">
            <p>Rainwater harvesting and greywater recycling systems can significantly reduce mains water consumption, contributing to higher Wat 01 credit achievement. These systems capture water that would otherwise be discharged and treat it for non-potable uses.</p>
            <p><strong>Rainwater Harvesting</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Source:</strong> Roof drainage from non-trafficked areas</li>
              <li><strong>Collection:</strong> First flush diverter, filter, storage tank</li>
              <li><strong>Treatment:</strong> Filtration, UV disinfection (optional)</li>
              <li><strong>Uses:</strong> WC flushing, irrigation, cooling towers</li>
              <li><strong>Mains backup:</strong> Type AA/AB air gap required</li>
            </ul>
            <p><strong>Greywater Recycling</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Source:</strong> Showers, basins, baths (not kitchen)</li>
              <li><strong>Collection:</strong> Separate drainage to treatment plant</li>
              <li><strong>Treatment:</strong> Biological treatment, filtration, disinfection</li>
              <li><strong>Uses:</strong> WC flushing, irrigation (sub-surface only)</li>
              <li><strong>Standards:</strong> BS 8525-1 for greywater systems</li>
            </ul>
            <p><strong>System Components Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Storage tank:</strong> Underground or above ground — Smaller, internal plant room</li>
              <li><strong>Treatment level:</strong> Filtration + optional UV — Biological + filtration + disinfection</li>
              <li><strong>Pump system:</strong> Header tank or direct pumped — Direct pumped with pressure set</li>
              <li><strong>Maintenance:</strong> 6-monthly filter clean, annual inspection — Monthly checks, quarterly servicing</li>
              <li><strong>Typical payback:</strong> 5-10 years — 8-15 years</li>
            </ul>
            <p><strong>Rainwater Yield Calculation Example</strong></p>
            <p><span>Roof area:</span> 2,000 m2</p>
            <p><span>Annual rainfall:</span> 800 mm (0.8 m)</p>
            <p><span>Collection efficiency:</span> 80%</p>
            <p><span>Calculation:</span> 2,000 x 0.8 x 0.8 = 1,280 m3/year</p>
            <p><span>WC demand (200 people):</span> 200 x 6 flushes x 4L x 250 days = 1,200 m3/year</p>
            <p>Rainwater can supply approximately 100% of WC flushing demand</p>
            <p><strong>Design Considerations for Recycled Water Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pipework marking:</strong> Non-potable pipework must be clearly identified (green with black text)</li>
              <li><strong>Backflow prevention:</strong> Type AA or AB air gap for mains water backup connections</li>
              <li><strong>Storage sizing:</strong> Balance between yield capture and demand matching</li>
              <li><strong>Overflow:</strong> Connected to surface water drainage (not foul)</li>
              <li><strong>Controls:</strong> Automatic switchover to mains when recycled water depleted</li>
            </ul>
            <p><strong>Regulatory note:</strong> Recycled water systems must comply with Water Supply (Water Fittings) Regulations and WRAS requirements. Building Control notification is required for all non-potable water systems.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Water Calculator Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Office building, 500 occupants, calculate water consumption improvement.</p>
            <p>Fitting Schedule:</p>
            <p>WCs (50 nr) | Baseline 6.0L | Proposed 4.5/3.0L dual (effective 2.5L)</p>
            <p>WHB taps (60 nr) | Baseline 6 l/min | Proposed 4 l/min spray taps</p>
            <p>Urinals (20 nr) | Baseline 7.5 l/bowl/hr | Proposed waterless</p>
            <p>Kitchen taps (5 nr) | Baseline 12 l/min | Proposed 8 l/min</p>
            <p>Annual consumption calculation (simplified):</p>
            <p>Baseline: 4,500 m3/year</p>
            <p>Proposed: 1,800 m3/year</p>
            <p>Improvement: (4,500 - 1,800) / 4,500 = 60%</p>
            <p>Result: 5 credits achieved (exceeds 55% threshold)</p>
            <p>
              <strong>Example 2: Sub-metering Strategy</strong>
            </p>
            <p><strong>Scenario:</strong> Develop metering strategy for mixed-use building (retail + office).</p>
            <p>Metering hierarchy:</p>
            <p>Level 1 - Building main</p>
            <p>M1: Pulsed meter + leak detection on incoming main</p>
            <p>Level 2 - Major use types</p>
            <p>M2: Office floors (combined)</p>
            <p>M3: Retail units (combined)</p>
            <p>M4: Common areas/WCs</p>
            <p>Level 3 - Specific uses</p>
            <p>M5: Cooling towers (if present)</p>
            <p>M6: External/irrigation</p>
            <p>Verification: M1 = M2 + M3 + M4 + M5 + M6 (within tolerance)</p>
            <p>Result: 2 credits for comprehensive sub-metering</p>
            <p>
              <strong>Example 3: Rainwater System Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size rainwater harvesting system for school building.</p>
            <p>Building data:</p>
            <p>Roof catchment: 1,500 m2</p>
            <p>Annual rainfall: 700 mm</p>
            <p>Students + staff: 400</p>
            <p>Operating days: 190/year</p>
            <p>Yield calculation:</p>
            <p>Annual yield: 1,500 x 0.7 x 0.8 = 840 m3</p>
            <p>Daily average: 840 / 365 = 2.3 m3/day</p>
            <p>Demand calculation (WC flushing):</p>
            <p>400 users x 3 flushes x 4L = 4,800 L/day = 4.8 m3/day</p>
            <p>Storage sizing (18 days cover):</p>
            <p>2.3 x 18 = 41 m3 minimum tank capacity</p>
            <p>Supply ratio: 840 / (4.8 x 190) = 92% of WC demand</p>
            <p>Enter 774 m3 alternative water in BREEAM calculator</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Evidence Requirements Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Design stage:</strong> Completed BREEAM water calculator, sanitary fitting schedules, metering schematics</li>
              <li><strong>Post-construction:</strong> Product data sheets confirming flow rates, commissioning records for meters</li>
              <li><strong>Leak detection:</strong> System specification, commissioning certificate, BMS alarm configuration</li>
              <li><strong>Water recycling:</strong> System design, treatment specification, mains backup arrangement</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>WHB tap baseline: <strong>6 l/min</strong>, best practice:  <strong>4 l/min</strong></li>
              <li>Shower baseline: <strong>10 l/min</strong>, best practice:  <strong>6 l/min</strong></li>
              <li>WC effective flush: <strong>(Full + Reduced) / 3</strong></li>
              <li>Leak detection sensitivity: <strong>1 litre/minute</strong></li>
              <li>Maximum credits (Wat 01): <strong>55% improvement = 5 credits</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Incorrect flush calculation:</strong> Using average instead of effective flush formula</li>
                <li><strong>Missing sub-meters:</strong> Failing to meter all major water uses</li>
                <li><strong>Inadequate leak detection:</strong> System cannot detect 1 l/min flows</li>
                <li><strong>No mains backup:</strong> Recycled water systems without automatic switchover</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Greywater system installed but bypassed at handover"
            situation={
              <>
                A residential block achieves 4 Wat 01 credits partly via a greywater recycling system (showers/baths to WCs and irrigation). At handover, the FM team discover the system has been bypassed — the GRP tank was not commissioned, manual valves are closed, and WCs are running on mains. The BREEAM Post-Construction assessment is in two weeks.
              </>
            }
            whatToDo={
              <>
                Investigate why bypassed — most often (1) commissioning never completed because filtration/UV had outstanding snags, (2) FM team unfamiliar with system and turned it off after a low-level alarm. Get the system commissioned, run a 2-week proving period with metered flow data, and provide the assessor with verified consumption data. If full commissioning is genuinely not achievable, the credit must be withdrawn, dropping the rating — flag immediately and discuss compensating credits with the assessor.
              </>
            }
            whyItMatters={
              <>
                Water recycling credits are high-risk because they depend on a working system at handover, not just an installed one. Many greywater and rainwater systems are bypassed within 18 months because of complexity, maintenance demand, or cost. The credit is worth 1–2 points; the system is worth nothing if it does not run.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Part G: 125 L/p/d (default) or 110 L/p/d (optional standard, often planning-required).",
              "BREEAM Wat 01 calculator scores fitting performance — WC, taps, shower, bath, dishwasher, washing machine.",
              "Wat 02 sub-metering + leak detection: mandatory credit for Excellent on non-residential.",
              "Rainwater harvesting: better fit for irrigation/WC flush; greywater for WC flush only.",
              "Water recycling system commissioning is critical — many are bypassed within 2 years.",
              "BS EN 16941 (rainwater) and BS 8525 (greywater) set design standards.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BREEAM overview
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Energy category
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section3_2;
