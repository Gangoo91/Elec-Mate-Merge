/**
 * Module 7 · Section 1 · Subsection 6 — Load Assessment
 * HNC Electrical Engineering for Building Services (Power and Lighting Systems)
 *   Maximum demand, diversity factors, supply capacity, and future expansion planning
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

const TITLE = 'Load Assessment - HNC Module 7 Section 1.6';
const DESCRIPTION =
  'Master load assessment for electrical installations: maximum demand calculation, diversity factors, DNO supply capacity, load growth allowance, and future expansion planning per BS 7671.';

const quickCheckQuestions = [
  {
    id: 'max-demand-definition',
    question: 'What is maximum demand in an electrical installation?',
    options: [
      'The highest current expected to flow at any time',
      'The sum of all connected equipment ratings added together',
      'The continuous current rating of the main protective device',
      'The average current drawn over a 24-hour period',
    ],
    correctIndex: 0,
    explanation:
      'Maximum demand is the highest electrical current or power expected to flow at any time in an installation. It is always less than total connected load due to diversity - not all loads operate simultaneously at full capacity.',
  },
  {
    id: 'diversity-purpose',
    question: 'Why are diversity factors applied in load assessment?',
    options: [
      'To increase the calculated demand as a safety margin',
      'To account for the fact that not all loads operate simultaneously',
      'To convert the connected load from kW into kVA',
      'To ensure every circuit is loaded to exactly 100% of its rating',
    ],
    correctIndex: 1,
    explanation:
      'Diversity factors account for the reality that connected loads do not all operate at the same time at full capacity. This allows more realistic sizing of supply equipment without over-engineering the installation.',
  },
  {
    id: 'supply-capacity',
    question: 'What determines the available supply capacity from a DNO?',
    options: [
      'The rating of the customer\'s main switch alone',
      'The existing network infrastructure and transformer capacity',
      'The number of final circuits in the installation',
      'The power factor of the customer\'s connected load',
    ],
    correctIndex: 1,
    explanation:
      "Available supply capacity depends on the DNO's existing network infrastructure, including local transformer capacity, cable ratings, and network loading. Customers must apply for capacity and the DNO assesses network capability.",
  },
  {
    id: 'load-growth',
    question: 'What is a typical allowance for future load growth in commercial installations?',
    options: [
      '5% of current demand',
      'No allowance is required',
      '50% of current demand',
      '10-25% of current demand',
    ],
    correctIndex: 3,
    explanation:
      'Commercial installations typically allow 10-25% spare capacity for future load growth. This prevents costly upgrades when additional equipment is installed and is considered good design practice per BS 7671 guidance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to BS 7671 Appendix 1, what diversity factor would typically apply to a domestic cooker rated at 12 kW?',
    options: [
      '100% of the full rating',
      '10A + 30% of remainder + 5A for socket',
      '50% of the full rating',
      '80% of the full rating',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Appendix 1 provides a specific formula for domestic cookers: first 10A of rated current at 100%, plus 30% of the remainder, plus 5A if the cooker has a socket outlet.',
  },
  {
    id: 2,
    question:
      'When assessing maximum demand for socket outlets in a commercial office, which approach is recommended?',
    options: [
      '100% of all connected loads',
      '1 kVA per socket outlet',
      'VA/m² based on floor area',
      'Number of workstations × 2 kW',
    ],
    correctAnswer: 2,
    explanation:
      'For commercial offices, assessing socket outlet demand using VA per square metre of floor area (typically 25-35 VA/m²) is more accurate than per-socket calculations, accounting for typical office equipment density.',
  },
  {
    id: 3,
    question:
      'What is the typical diversity factor for lighting circuits in a commercial building?',
    options: [
      '66%',
      '50%',
      '100%',
      '90%',
    ],
    correctAnswer: 3,
    explanation:
      'Commercial lighting typically attracts a diversity factor of 90% (0.9), as most lighting is likely to be on during occupied hours. Some allowance is made for areas not continuously lit or daylight-controlled zones.',
  },
  {
    id: 4,
    question:
      'A DNO quotes an available supply capacity of 150 kVA. What is the maximum demand (kW) assuming a power factor of 0.95?',
    options: [
      '142.5 kW',
      '150 kW',
      '157.9 kW',
      '158 kW',
    ],
    correctAnswer: 0,
    explanation:
      'kW = kVA × power factor = 150 × 0.95 = 142.5 kW. The available active power (kW) depends on the power factor of the installation. A typical commercial power factor of 0.95 is often assumed.',
  },
  {
    id: 5,
    question:
      'When calculating maximum demand for motor loads, what factor accounts for starting current?',
    options: [
      'All motors assessed at their full load current with no allowance',
      'Largest motor at 125% or higher, others at full load',
      'The smallest motor at 125%, with all others ignored',
      'Every motor assessed at six times its full load current',
    ],
    correctAnswer: 1,
    explanation:
      'For motor installations, the largest motor is typically assessed at 125% (or higher for DOL starting) to account for starting current, with other motors at full load current. This reflects the diversity of motor operation and starting sequences.',
  },
  {
    id: 6,
    question: 'What information must be provided to the DNO when applying for a new supply?',
    options: [
      'Only the postcode of the property and the customer\'s name',
      'The make and model of every appliance to be installed',
      'Maximum demand, load type, power factor, and growth expectations',
      'The insulation resistance test results for the existing installation',
    ],
    correctAnswer: 2,
    explanation:
      'DNO applications require maximum demand (kVA), load type/characteristics, expected power factor, phasing requirements, and anticipated load growth. This enables the DNO to assess network capacity and design the appropriate supply.',
  },
  {
    id: 7,
    question:
      'In a residential development with 20 dwellings, each with a 100A supply, what diversity factor would typically apply?',
    options: [
      '100% (2000A equivalent — no diversity)',
      'Approximately 75% (1500A equivalent)',
      'Approximately 60% (1200A equivalent)',
      'Approximately 30-40% (600-800A equivalent)',
    ],
    correctAnswer: 3,
    explanation:
      'Multiple dwelling developments attract significant diversity (typically 0.3-0.4 for 20+ units) because households have different usage patterns. BS 7671 Appendix 1 and ESQCR guidance provide specific factors based on dwelling count.',
  },
  {
    id: 8,
    question: 'What is the purpose of a block load assessment?',
    options: [
      'To determine overall supply requirements for a building or site',
      'To size the protective device for a single final circuit',
      'To measure the earth fault loop impedance at the origin',
      'To calculate the voltage drop along one radial circuit',
    ],
    correctAnswer: 0,
    explanation:
      'A block load assessment determines the overall supply requirements for a building or site, aggregating all load types with appropriate diversity factors to establish maximum demand for DNO supply sizing and main switchgear selection.',
  },
  {
    id: 9,
    question: 'Which factor most significantly affects future load growth allowance?',
    options: [
      'The colour of the distribution board enclosure',
      'Building use, technology trends, and client expansion plans',
      'The length of the supply cable from the DNO',
      'The number of socket outlets installed per room',
    ],
    correctAnswer: 1,
    explanation:
      "Future load growth depends on building use (office technology changes, EV charging), technological trends (LED conversion, heat pumps), and client expansion plans. A thorough understanding of the client's business is essential.",
  },
  {
    id: 10,
    question:
      'What is the recommended approach when calculated maximum demand exceeds available DNO supply?',
    options: [
      'Ignore the shortfall and rely on diversity to make up the difference',
      'Uprate the main protective device to accept the higher current',
      'Apply for supply upgrade, consider on-site generation, or implement load management',
      'Reduce the cable sizes to lower the overall installed load',
    ],
    correctAnswer: 2,
    explanation:
      'Options include applying for a DNO supply upgrade (may involve infrastructure costs), installing on-site generation or energy storage, implementing intelligent load management/demand response, or reviewing design to reduce demand.',
  },
  {
    id: 11,
    question: 'How does power factor correction affect maximum demand assessment?',
    options: [
      'It increases the kVA demand for the same kW load',
      'It has no effect on kVA demand, only on energy consumed',
      'It reduces the kW load while leaving the kVA demand unchanged',
      'It reduces kVA demand for the same kW load, potentially avoiding supply upgrades',
    ],
    correctAnswer: 3,
    explanation:
      'Power factor correction reduces the kVA demand for a given kW load (kVA = kW ÷ pf). Improving power factor from 0.8 to 0.95 reduces kVA by approximately 16%, potentially avoiding expensive supply upgrades.',
  },
  {
    id: 12,
    question: 'When would you NOT apply diversity to a load in maximum demand calculations?',
    options: [
      'Essential/critical loads that must always be available at full capacity',
      'General lighting circuits in a large commercial office',
      'Socket outlet circuits assessed on a VA/m² basis',
      'Domestic ring final circuits supplying general use',
    ],
    correctAnswer: 0,
    explanation:
      'Critical loads such as hospital life-safety equipment, data centre UPS systems, or essential industrial processes should be assessed at 100% as they must be available at full capacity whenever required, regardless of other loads.',
  },
];

const faqs = [
  {
    question: 'How do I obtain diversity factors not listed in BS 7671 Appendix 1?',
    answer:
      'BS 7671 Appendix 1 provides guidance for common domestic situations. For commercial and industrial applications, use industry guidance such as CIBSE Guide K (electricity in buildings), IET guidance notes, manufacturer data, or historical metering data from similar installations. When in doubt, consult with the DNO and apply conservative estimates.',
  },
  {
    question: 'What happens if my maximum demand calculation is significantly wrong?',
    answer:
      "Overestimating leads to oversized, more expensive infrastructure. Underestimating may result in overloaded equipment, nuisance tripping, or the need for costly upgrades. It's better to slightly overestimate with reasonable growth allowance than to underestimate. Review calculations with experienced engineers for complex projects.",
  },
  {
    question: 'How do I account for electric vehicle charging in load assessments?',
    answer:
      'EV charging adds significant load (7 kW domestic, 22+ kW commercial per point). For multiple charge points, apply diversity based on expected simultaneous usage (typically 0.2-0.5 depending on charger type and user patterns). Consider smart charging systems that can limit simultaneous demand. The DNO may require specific assessments for EV installations.',
  },
  {
    question: 'Should I include standby generators in maximum demand calculations?',
    answer:
      'Standby generators do not add to DNO supply demand as they operate when mains supply fails. However, if the generator can parallel with mains (peak lopping), the combined capacity must be considered. Generator sizing is based on essential load demand, not total installation demand.',
  },
  {
    question: 'How do I handle seasonal load variations in assessments?',
    answer:
      'Consider peak demand season (typically winter for heating, summer for cooling). Assess HVAC loads based on design conditions (summer/winter peaks). For mixed heating/cooling, the assessment should use whichever season produces the higher demand. Some installations may have different maximum demands in different seasons.',
  },
  {
    question: 'What is the difference between maximum demand and design current?',
    answer:
      'Maximum demand (Ib) is the expected highest current under normal operating conditions, used for supply and main equipment sizing. Design current for individual circuits considers the specific load characteristics and any diversity within that circuit. Maximum demand aggregates all circuits with inter-circuit diversity.',
  },
];

const HNCModule7Section1_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1 · Subsection 6"
            title="Load Assessment"
            description="Maximum demand, diversity factors, supply capacity, and future expansion planning"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate maximum demand using diversity factors",
              "Apply BS 7671 Appendix 1 guidance correctly",
              "Assess DNO supply capacity requirements",
              "Determine appropriate load growth allowances",
              "Plan for future expansion and technology changes",
              "Coordinate with DNO for supply applications",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Maximum Demand Fundamentals">
            <p>Maximum demand (MD) is the highest electrical load expected to be drawn from the supply at any point in time. It forms the basis for sizing the incoming supply, main switchgear, and distribution equipment. Accurate assessment prevents both undersizing (causing overloading) and oversizing (increasing costs unnecessarily).</p>
            <p><strong>Key maximum demand principles:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Connected load:</strong> Sum of all equipment ratings - always greater than MD</li>
              <li><strong>Maximum demand:</strong> Actual peak load considering usage patterns</li>
              <li><strong>Diversity:</strong> Factor accounting for non-simultaneous operation</li>
              <li><strong>Load factor:</strong> Ratio of average demand to maximum demand</li>
            </ul>
            <p><strong>Maximum Demand vs Connected Load</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Domestic dwelling:</strong> 50-80 kW — 8-15 kW — 0.15-0.25</li>
              <li><strong>Office building:</strong> Variable — 40-80 VA/m² — 0.4-0.7</li>
              <li><strong>Retail premises:</strong> Variable — 50-150 VA/m² — 0.5-0.8</li>
              <li><strong>Industrial (process):</strong> Variable — Process dependent — 0.6-0.9</li>
            </ul>
            <p><strong>Maximum Demand Formula</strong></p>
            <p><span>Maximum Demand (MD):</span></p>
            <p>MD = Σ(Connected Load × Diversity Factor × Utilisation Factor)</p>
            <p>Where:</p>
            <p>Diversity Factor = accounts for non-simultaneous operation</p>
            <p>Utilisation Factor = proportion of rated capacity actually used</p>
            <p><strong>Design principle:</strong> Maximum demand assessment requires understanding of how the installation will actually be used, not just what is connected.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Diversity Factors by Load Type">
            <p>Diversity factors reflect the statistical probability that loads will operate simultaneously. BS 7671 Appendix 1 provides guidance for domestic installations, while commercial and industrial applications require engineering judgement and industry-specific data.</p>
            <p><strong>BS 7671 Appendix 1 - Domestic Diversity</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting:</strong> 66% of total load — Assumes not all lights on simultaneously</li>
              <li><strong>Heating (instantaneous):</strong> 100% of largest + 40% of others — Immersion heaters, electric heating</li>
              <li><strong>Standard circuits:</strong> 100% of largest + 40% of others — Including ring final circuits</li>
              <li><strong>Cooker:</strong> 10A + 30% remainder + 5A socket — Specific formula for domestic cookers</li>
              <li><strong>Motors (AC):</strong> Full load + 1/3 starting current — Or largest at 125% + others at 100%</li>
            </ul>
            <p><strong>Commercial/Industrial Diversity</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lighting:</strong> 0.9 (90%) commercial</li>
              <li><strong>Small power:</strong> 0.4-0.6 office, 0.3-0.5 retail</li>
              <li><strong>HVAC:</strong> 0.8-1.0 depending on control</li>
              <li><strong>Process equipment:</strong> 0.7-0.9 typically</li>
            </ul>
            <p><strong>Multiple Dwellings Diversity</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2-4 dwellings:</strong> 0.6-0.8</li>
              <li><strong>5-9 dwellings:</strong> 0.5-0.6</li>
              <li><strong>10-19 dwellings:</strong> 0.4-0.5</li>
              <li><strong>20+ dwellings:</strong> 0.3-0.4</li>
            </ul>
            <p><strong>Commercial Socket Outlet Assessment</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>General office:</strong> 25-35 — Standard office with PCs</li>
              <li><strong>Dealing room/IT intensive:</strong> 50-80 — High equipment density</li>
              <li><strong>Retail (general):</strong> 15-25 — Shop floor areas</li>
              <li><strong>Restaurant/kitchen:</strong> 100-200 — Commercial kitchen equipment</li>
            </ul>
            <p><strong>Best practice:</strong> Document all diversity assumptions clearly. If historical data or metering is available, use it to validate assumptions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="DNO Supply Capacity">
            <p>Distribution Network Operators (DNOs) manage the electricity distribution network and determine available supply capacity. Understanding DNO processes is essential for ensuring adequate supply for new installations and upgrades.</p>
            <p><strong>Standard DNO Supply Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single-phase domestic:</strong> 60A, 80A, or 100A (230V)</li>
              <li><strong>Three-phase domestic:</strong> 60A or 100A per phase (400V)</li>
              <li><strong>Small commercial LV:</strong> Up to 150 kVA (typically)</li>
              <li><strong>Larger commercial LV:</strong> Up to 1 MVA (network dependent)</li>
              <li><strong>HV supply:</strong> &gt;1 MVA, customer owns HV equipment</li>
            </ul>
            <p><strong>DNO Application Process</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Budget estimate:</strong> Preliminary cost indication — Approximate load, location, phasing</li>
              <li><strong>Formal application:</strong> Detailed assessment request — Max demand, load breakdown, power factor</li>
              <li><strong>Connection offer:</strong> DNO quote for supply — Review capacity, costs, timescales</li>
              <li><strong>Acceptance:</strong> Contract agreement — Agree terms, pay connection charges</li>
              <li><strong>Energisation:</strong> Supply connected — Installation complete, certificates issued</li>
            </ul>
            <p><strong>Network Constraints</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Transformer capacity</li>
              <li>Cable thermal ratings</li>
              <li>Voltage regulation limits</li>
              <li>Fault level capacity</li>
            </ul>
            <p><strong>Cost Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Distance from network</li>
              <li>Reinforcement needed</li>
              <li>Metering requirements</li>
              <li>HV vs LV supply costs</li>
            </ul>
            <p><strong>Timescales</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simple: 4-8 weeks</li>
              <li>Standard: 8-16 weeks</li>
              <li>With reinforcement: 6-12 months</li>
              <li>HV installation: 12-24 months</li>
            </ul>
            <p><strong>Planning tip:</strong> Engage with the DNO early in design. Network constraints may require design changes or alternative strategies such as on-site generation or demand management.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Load Growth and Future Expansion">
            <p>Prudent electrical design considers future load growth to avoid costly upgrades. BS 7671 recommends allowing for future expansion. The appropriate allowance depends on building type, client intentions, and technological trends.</p>
            <p><strong>Typical Load Growth Allowances</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Domestic (new build):</strong> 20-30% — EV charging, heat pumps, home working</li>
              <li><strong>Office building:</strong> 15-25% — Technology changes, tenant fit-out</li>
              <li><strong>Data centre:</strong> 30-50% — Rapid IT growth, cooling demands</li>
              <li><strong>Industrial:</strong> 20-30% — Process expansion, automation</li>
              <li><strong>Healthcare:</strong> 25-35% — Medical equipment, imaging technology</li>
            </ul>
            <p><strong>Emerging Load Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>EV charging:</strong> 7-22 kW per point domestic/commercial</li>
              <li><strong>Heat pumps:</strong> 3-12 kW replacing gas heating</li>
              <li><strong>Battery storage:</strong> Bidirectional power flow</li>
              <li><strong>Solar PV:</strong> Export capacity and integration</li>
            </ul>
            <p><strong>Planning Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Size cables/busbar for future capacity</li>
              <li>Allow spare ways in distribution boards</li>
              <li>Install larger containment systems</li>
              <li>Reserve transformer/switchboard space</li>
            </ul>
            <p><strong>Load Growth Calculation Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Current assessed maximum demand:</strong> 200 kVA</li>
              <li><strong>Growth allowance (20%):</strong> 40 kVA</li>
              <li><strong>Design maximum demand:</strong> 240 kVA</li>
              <li><strong>With EV charging (10 × 7 kW):</strong> +70 kVA (with diversity 0.3 = 21 kVA)</li>
              <li><strong>Revised design MD:</strong> 261 kVA → specify 300 kVA supply</li>
            </ul>
            <p><strong>BS 7671 Appendix 1 Guidance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Appendix 1 provides current demand assessment methods</li>
              <li>Encourages consideration of future requirements at design stage</li>
              <li>Notes that allowance should be made for anticipated load increases</li>
              <li>Recognises that good design accommodates change without major rework</li>
            </ul>
            <p><strong>Cost-benefit consideration:</strong> The marginal cost of specifying slightly larger infrastructure at installation is typically much less than retrofitting upgrades later.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Domestic Maximum Demand</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate maximum demand for a 4-bedroom house with electric cooker (12 kW), immersion heater (3 kW), electric shower (9.5 kW), and standard ring circuits.</p>
            <p>Lighting: 100 outlets × 100W = 10 kW × 66% =  <span>6.6 kW</span></p>
            <p>Cooker (12 kW at 230V = 52.2A):</p>
            <p>First 10A = 10A</p>
            <p>Remainder: (52.2 - 10) × 30% = 12.7A</p>
            <p>Socket: 5A</p>
            <p>Total: 27.7A × 230V = <span>6.4 kW</span></p>
            <p>Heating loads (immersion + shower):</p>
            <p>Larger (9.5 kW) at 100% = 9.5 kW</p>
            <p>Smaller (3 kW) at 40% = 1.2 kW</p>
            <p>Total: <span>10.7 kW</span></p>
            <p>Socket circuits (assume 4 rings):</p>
            <p>Largest at 100% + others at 40%</p>
            <p>Assume typical usage: <span>~5 kW</span></p>
            <p>Total Maximum Demand ≈ 28.7 kW = 125A at 230V</p>
            <p>100A single-phase supply adequate with managed usage</p>
            <p>
              <strong>Example 2: Commercial Office Block Load</strong>
            </p>
            <p><strong>Scenario:</strong> Assess maximum demand for a 2,000 m² office building with HVAC.</p>
            <p>Lighting: 12 W/m² × 2,000 m² × 0.9 diversity =  <span>21.6 kW</span></p>
            <p>Small power: 30 VA/m² × 2,000 m² × 0.5 diversity =  <span>30 kVA</span></p>
            <p>HVAC (cooling dominant):</p>
            <p>Chillers: 80 kW × 0.9 = 72 kW</p>
            <p>AHUs/FCUs: 25 kW × 0.85 = 21.3 kW</p>
            <p>Pumps: 10 kW × 0.8 = 8 kW</p>
            <p>Total HVAC: <span>101.3 kW</span></p>
            <p>Lifts: 2 × 15 kW × 0.3 (diversity for 2) =  <span>9 kW</span></p>
            <p>Ancillary (BMS, security, etc.): <span>5 kW</span></p>
            <p>Subtotal: 166.9 kW (at 0.95 pf = 175.7 kVA)</p>
            <p>Add 20% growth: 175.7 × 1.2 = 210.8 kVA</p>
            <p>Specify 250 kVA supply (standard transformer size)</p>
            <p>
              <strong>Example 3: Motor Load Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate maximum demand for a pump room with 3 motors: 22 kW, 15 kW, and 11 kW.</p>
            <p>Motor ratings (assume pf 0.85, efficiency 0.9):</p>
            <p>22 kW: I = 22000 / (√3 × 400 × 0.85 × 0.9) = 41.5A</p>
            <p>15 kW: I = 15000 / (√3 × 400 × 0.85 × 0.9) = 28.3A</p>
            <p>11 kW: I = 11000 / (√3 × 400 × 0.85 × 0.9) = 20.8A</p>
            <p>Maximum demand calculation:</p>
            <p>Largest motor (22 kW) at 125% = 51.9A</p>
            <p>Others at full load: 28.3 + 20.8 = 49.1A</p>
            <p>Total: <span>101A</span></p>
            <p>In kVA: 101 × √3 × 400 / 1000 = <span>70 kVA</span></p>
            <p>Note: Starting current considerations may require higher short-term capacity</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Load Assessment Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Obtain complete load schedule from design documentation</li>
              <li>Identify load types: lighting, power, HVAC, specialist equipment</li>
              <li>Apply appropriate diversity factors from BS 7671 or industry data</li>
              <li>Consider power factor and correct if necessary</li>
              <li>Add reasonable growth allowance based on building type</li>
              <li>Verify DNO supply availability early in design process</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Domestic lighting diversity: <strong>66%</strong></li>
              <li>Commercial lighting diversity: <strong>90%</strong></li>
              <li>Office small power: <strong>25-35 VA/m²</strong></li>
              <li>Typical growth allowance: <strong>15-25%</strong></li>
              <li>EV charger (domestic): <strong>7 kW</strong> per point</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using connected load as MD</strong> - always apply diversity</li>
                <li><strong>Ignoring power factor</strong> - kVA ≠ kW unless pf = 1</li>
                <li><strong>No growth allowance</strong> - leads to costly future upgrades</li>
                <li><strong>Late DNO engagement</strong> - can delay entire project</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section1-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power quality
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module7-section2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Emergency systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule7Section1_6;
