/**
 * Module 8 · Section 3 · Subsection 5 — System Selection
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Load calculations, system comparison, life cycle costs, sustainability and selection criteria
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

const TITLE = 'System Selection - HNC Module 8 Section 3.5';
const DESCRIPTION =
  'Master air conditioning system selection: cooling load calculations, CIBSE TM54 methodology, DX vs chilled water comparisons, SEER ratings, life cycle cost analysis, Part L compliance, low-GWP refrigerants, and sustainability considerations.';

const quickCheckQuestions = [
  {
    id: 'load-calculation',
    question: 'What does CIBSE TM54 provide guidance on for cooling load calculations?',
    options: [
      'Equipment selection only',
      'Evaluating operational energy use and closing the performance gap',
      'Refrigerant selection criteria',
      'Ductwork sizing methods',
    ],
    correctIndex: 1,
    explanation:
      'CIBSE TM54 provides methodology for evaluating operational energy use in buildings, helping designers close the performance gap between predicted and actual energy consumption through realistic load assessment.',
  },
  {
    id: 'seer-rating',
    question: 'What does SEER stand for and why is it important for system selection?',
    options: [
      'Standard Energy Efficiency Rating - measures compressor efficiency',
      'Seasonal Energy Efficiency Ratio - indicates annual cooling efficiency',
      'System Electrical Efficiency Requirement - regulatory compliance',
      'Sensible Energy Exchange Rate - heat transfer coefficient',
    ],
    correctIndex: 1,
    explanation:
      'SEER (Seasonal Energy Efficiency Ratio) measures the cooling efficiency over a typical cooling season, accounting for varying load conditions. Higher SEER values indicate better seasonal performance and lower operating costs.',
  },
  {
    id: 'dx-vs-chilled',
    question:
      'For a building requiring precise temperature control across multiple zones, which system type is generally more suitable?',
    options: [
      'Single-split DX systems',
      'Multi-split systems',
      'Chilled water systems with fan coil units',
      'Window-mounted air conditioning units',
    ],
    correctIndex: 2,
    explanation:
      'Chilled water systems with fan coil units offer superior zone control, easier balancing, and more stable temperature control across multiple zones. They also provide better central plant redundancy for critical applications.',
  },
  {
    id: 'life-cycle-cost',
    question:
      'Which factor typically represents the largest component of life cycle costs for air conditioning systems?',
    options: [
      'Initial capital cost',
      'Installation labour',
      'Energy consumption over the system lifetime',
      'Annual maintenance costs',
    ],
    correctIndex: 2,
    explanation:
      'Energy costs typically account for 60-80% of total life cycle costs over a 15-20 year system lifetime. This is why selecting systems with high seasonal efficiency ratings can significantly reduce total cost of ownership.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'When calculating cooling loads, which method accounts for thermal mass effects and time lag?',
    options: [
      'Steady-state calculation',
      'Peak load method',
      'Dynamic thermal simulation',
      'Rule of thumb estimation',
    ],
    correctAnswer: 2,
    explanation:
      'Dynamic thermal simulation accounts for thermal mass, time lag, and varying internal and external conditions throughout the day and year, providing more accurate load predictions than steady-state methods.',
  },
  {
    id: 2,
    question:
      'According to Part L of the Building Regulations, what efficiency requirement applies to comfort cooling systems?',
    options: [
      'Minimum COP of 2.0',
      'Systems must meet minimum seasonal efficiency standards (SEER/SCOP)',
      'No specific requirements for cooling',
      'Maximum power consumption of 50 W/m²',
    ],
    correctAnswer: 1,
    explanation:
      'Part L requires comfort cooling systems to achieve minimum seasonal efficiency ratings. The Non-Domestic Building Services Compliance Guide specifies minimum SEER values depending on system type and cooling capacity.',
  },
  {
    id: 3,
    question: 'What is the typical SEER value for a modern VRF system?',
    options: ['2.0 - 3.0', '3.5 - 4.5', '5.0 - 8.0', '10.0 - 12.0'],
    correctAnswer: 2,
    explanation:
      'Modern VRF systems typically achieve SEER values between 5.0 and 8.0, with premium systems exceeding 7.0. This represents significant improvement over traditional split systems which typically achieve 3.5-5.0.',
  },
  {
    id: 4,
    question:
      'For Net Present Value (NPV) analysis of air conditioning options, which discount rate is typically used for commercial projects?',
    options: ['0-2%', '3.5-6%', '10-15%', '20-25%'],
    correctAnswer: 1,
    explanation:
      'Commercial projects typically use discount rates of 3.5-6%, aligned with HM Treasury Green Book guidance. Public sector projects often use 3.5%, while private sector projects may use higher rates reflecting their cost of capital.',
  },
  {
    id: 5,
    question:
      'Which refrigerant has the lowest GWP (Global Warming Potential) among common air conditioning refrigerants?',
    options: ['R-410A (GWP 2088)', 'R-32 (GWP 675)', 'R-290 (GWP 3)', 'R-134a (GWP 1430)'],
    correctAnswer: 2,
    explanation:
      'R-290 (propane) has a GWP of only 3, making it among the lowest of practical refrigerants. However, its flammability (A3 classification) limits charge sizes and applications. R-32 offers a good balance with GWP of 675.',
  },
  {
    id: 6,
    question:
      'When comparing DX and chilled water systems, which statement is correct regarding refrigerant charge?',
    options: [
      'DX systems always have lower total refrigerant charge',
      'Chilled water systems have no refrigerant in the building',
      'VRF systems have lower charge than equivalent chillers',
      'Refrigerant charge is the same regardless of system type',
    ],
    correctAnswer: 1,
    explanation:
      'Chilled water systems confine refrigerant to the chiller plant room, meaning no refrigerant is distributed throughout the building. This reduces leak risk and simplifies compliance with F-gas regulations for occupied spaces.',
  },
  {
    id: 7,
    question:
      'What is the primary advantage of selecting water-cooled chillers over air-cooled chillers?',
    options: [
      'Lower capital cost',
      'No external plant required',
      'Higher efficiency, especially at peak ambient temperatures',
      'Simpler maintenance requirements',
    ],
    correctAnswer: 2,
    explanation:
      'Water-cooled chillers maintain higher efficiency at peak ambient temperatures because cooling tower water temperature is lower than peak air temperature. This can improve COP by 20-30% compared to air-cooled alternatives.',
  },
  {
    id: 8,
    question:
      'According to the F-gas Regulation phase-down schedule, what is the GWP limit for single split systems under 3 kg charge from 2025?',
    options: ['No limit applies', 'GWP &lt; 2500', 'GWP &lt; 750', 'GWP &lt; 150'],
    correctAnswer: 2,
    explanation:
      'From 2025, single split systems containing less than 3 kg of fluorinated greenhouse gases must use refrigerants with GWP below 750. This effectively prohibits R-410A (GWP 2088) for most split system applications.',
  },
  {
    id: 9,
    question:
      'What cooling load factor should typically be applied for equipment diversity in office buildings?',
    options: ['1.0 (no diversity)', '0.9 - 0.95', '0.7 - 0.85', '0.5 - 0.6'],
    correctAnswer: 2,
    explanation:
      'Office equipment diversity factors of 0.7-0.85 are typical, reflecting that not all equipment operates simultaneously at maximum load. This reduces oversizing whilst maintaining adequate capacity for realistic operating conditions.',
  },
  {
    id: 10,
    question:
      'For BREEAM Excellent rating, what enhanced commissioning requirement typically applies to air conditioning systems?',
    options: [
      'Standard commissioning only',
      'Seasonal commissioning with post-occupancy verification',
      'No specific commissioning requirements',
      'Self-certification by the installer',
    ],
    correctAnswer: 1,
    explanation:
      'BREEAM Excellent typically requires seasonal commissioning to verify performance under varying conditions, plus post-occupancy evaluation to confirm systems meet design intent and actual operational requirements.',
  },
  {
    id: 11,
    question:
      'What is the typical payback period for upgrading from SEER 4.0 to SEER 6.0 equipment?',
    options: ['Less than 1 year', '2-4 years', '5-7 years', 'Over 10 years'],
    correctAnswer: 1,
    explanation:
      'Upgrading from SEER 4.0 to SEER 6.0 typically achieves 2-4 year payback depending on operating hours and energy costs. The 33% reduction in energy consumption provides substantial ongoing savings.',
  },
  {
    id: 12,
    question:
      'When selecting air conditioning for a data centre, which parameter is most critical?',
    options: [
      'Initial capital cost',
      'Aesthetic appearance',
      'Reliability and redundancy (N+1 or greater)',
      'Quiet operation',
    ],
    correctAnswer: 2,
    explanation:
      'Data centres require continuous cooling with high reliability. N+1 redundancy (or greater) ensures cooling continues if one unit fails. System availability typically must exceed 99.99% for critical facilities.',
  },
];

const faqs = [
  {
    question: 'How do I choose between VRF and chilled water for a medium-sized office building?',
    answer:
      'Consider building size, zone count, and operational requirements. VRF suits buildings under 10,000 m² with diverse zones and varying occupancy, offering quick response and individual zone control. Chilled water is preferred for larger buildings (over 10,000 m²), where central plant provides better efficiency, easier maintenance access, and simpler future expansion. Also consider refrigerant regulations - VRF distributes refrigerant throughout the building whilst chilled water confines it to the plant room.',
  },
  {
    question: 'What factors should I include in a life cycle cost analysis for air conditioning?',
    answer:
      'Include: capital costs (equipment, installation, commissioning), energy costs over 15-20 years with realistic escalation rates, planned maintenance (filters, belts, refrigerant), reactive maintenance and component replacement, water treatment for cooling towers or chilled water systems, disposal/decommissioning costs, and carbon pricing if applicable. Use NPV with appropriate discount rate (typically 3.5-6%) and include sensitivity analysis for energy price variations.',
  },
  {
    question: 'How will F-gas regulations affect my system selection decisions?',
    answer:
      'F-gas phase-down significantly impacts refrigerant choice. From 2025, single splits under 3 kg must use GWP &lt; 750 refrigerants (excluding R-410A). Systems over 50 tonnes CO2 equivalent require quarterly leak checks and certified technicians. Consider R-32 (GWP 675) for splits, R-290 propane (GWP 3) for small systems, or R-1234ze (GWP 7) for chillers. Alternatively, chilled water systems localise refrigerant in plant rooms, simplifying compliance.',
  },
  {
    question: 'What is the performance gap and how can good system selection help close it?',
    answer:
      'The performance gap is the difference between predicted and actual energy consumption - typically buildings use 2-5 times more energy than design predictions. Good system selection addresses this through: realistic load calculations using CIBSE TM54 methodology, appropriate diversity and part-load factors, selecting systems with good part-load efficiency (high SEER/SCOP), ensuring controllability matches operational needs, and specifying proper commissioning and post-occupancy evaluation.',
  },
  {
    question: 'When should I consider hybrid systems combining DX and chilled water?',
    answer:
      'Hybrid systems suit buildings with mixed requirements: DX for areas needing quick response or extended hours operation, chilled water for base load and critical areas. Examples include retail with food court (chilled water for common areas, DX for individual tenants), or offices with 24/7 data rooms (dedicated DX for IT, chilled water for general cooling). Hybrids add complexity but offer flexibility and can optimise overall efficiency.',
  },
  {
    question:
      'How do I account for climate change in system selection for a 25-year building life?',
    answer:
      'Design for future climate using CIBSE TM49 future weather files or UKCP18 projections. Consider: increased cooling degree days (10-30% higher by 2050), more frequent heat waves requiring sustained peak capacity, reduced heating loads offsetting some additional cooling, and potential for natural ventilation to become less effective. Select systems with capacity for future conditions and ensure good part-load efficiency for current, lower loads.',
  },
];

const HNCModule8Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 3 · Subsection 5"
            title="System Selection"
            description="Load calculations, system comparison, life cycle costs, sustainability and selection criteria"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate cooling loads using CIBSE methodologies including TM54",
              "Compare DX and chilled water systems for specific applications",
              "Evaluate SEER and SCOP ratings for Part L compliance",
              "Conduct life cycle cost analysis with appropriate discount rates",
              "Select refrigerants considering F-gas regulations and GWP limits",
              "Apply sustainability criteria to system selection decisions",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Cooling Load Calculations">
            <p>Accurate cooling load calculation forms the foundation of effective system selection. Oversized systems waste capital and operate inefficiently at part load, whilst undersized systems fail to maintain comfort conditions during peak periods.</p>
            <p><strong>Cooling Load Components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fabric gains:</strong> Heat transfer through walls, roof, glazing (U-value dependent)</li>
              <li><strong>Solar gains:</strong> Direct and diffuse radiation through glazing (orientation critical)</li>
              <li><strong>Internal gains:</strong> Occupants, lighting, equipment (diversity factors apply)</li>
              <li><strong>Ventilation load:</strong> Fresh air sensible and latent heat</li>
              <li><strong>Infiltration:</strong> Uncontrolled air leakage through envelope</li>
            </ul>
            <p><strong>CIBSE Load Calculation Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Simple (CIBSE Guide A):</strong> Small, simple buildings — ±20%</li>
              <li><strong>Admittance method:</strong> General commercial buildings — ±10-15%</li>
              <li><strong>Dynamic simulation (TM54):</strong> Complex or critical buildings — ±5-10%</li>
            </ul>
            <p><strong>CIBSE TM54 Methodology</strong></p>
            <p>TM54 addresses the performance gap by providing a structured approach to predicting operational energy use. Key steps include:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Separating regulated (Part L) from unregulated energy use</li>
              <li>Using realistic operating hours and occupancy patterns</li>
              <li>Applying appropriate equipment diversity factors</li>
              <li>Accounting for actual system efficiencies at part load</li>
              <li>Including auxiliary energy (pumps, fans, controls)</li>
            </ul>
            <p><strong>Typical Internal Heat Gains</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Occupants (office):</strong> 90-150 W/person (sensible + latent) — 0.7-0.85</li>
              <li><strong>LED lighting:</strong> 8-12 W/m² — 0.8-0.9</li>
              <li><strong>Office equipment:</strong> 15-25 W/m² (general office) — 0.7-0.85</li>
              <li><strong>Data/comms rooms:</strong> 500-2000 W/m² — 0.9-1.0</li>
            </ul>
            <p><strong>Peak Load vs Annual Energy</strong></p>
            <p>Peak load determines system sizing, but annual energy consumption depends on part-load performance. A system sized for 100 kW peak may average only 30-40% load across the cooling season. This is why SEER (Seasonal Energy Efficiency Ratio) is more meaningful than peak COP for comparing systems.</p>
            <p><strong>Design margin:</strong> Allow 10-15% safety margin on calculated loads, but avoid excessive oversizing which reduces efficiency and increases capital cost.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="System Comparison: DX vs Chilled Water">
            <p>The choice between direct expansion (DX) systems and chilled water systems represents one of the most significant decisions in air conditioning design. Each approach has distinct advantages depending on building type, size, and operational requirements.</p>
            <p><strong>System Comparison Matrix</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Typical building size:</strong> &lt; 10,000 m² — &gt; 5,000 m² (preferred &gt; 10,000 m²)</li>
              <li><strong>Capital cost:</strong> Lower for small systems — Lower per kW for large systems</li>
              <li><strong>Refrigerant distribution:</strong> Throughout building — Confined to plant room</li>
              <li><strong>Zone control:</strong> Good (VRF excellent) — Excellent with FCUs</li>
              <li><strong>Response time:</strong> Fast (minutes) — Slower (thermal mass)</li>
              <li><strong>Maintenance access:</strong> Distributed (ceiling void) — Centralised plant room</li>
              <li><strong>Redundancy:</strong> Per zone/unit — N+1 at central plant</li>
              <li><strong>Part load efficiency:</strong> VRF: Excellent — Good with VSD and staging</li>
            </ul>
            <p><strong>DX Systems - Best For</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Small to medium buildings (&lt; 10,000 m²)</li>
              <li>Diverse occupancy patterns</li>
              <li>Extended hours operation (zones)</li>
              <li>Speculative developments</li>
              <li>Phased installation</li>
              <li>Simultaneous heating and cooling (VRF)</li>
            </ul>
            <p><strong>Chilled Water - Best For</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Large buildings (&gt; 10,000 m²)</li>
              <li>Critical facilities requiring redundancy</li>
              <li>Precise temperature control needs</li>
              <li>Buildings with central plant rooms</li>
              <li>Healthcare and laboratories</li>
              <li>Long pipe runs (water vs refrigerant)</li>
            </ul>
            <p><strong>Seasonal Efficiency Ratings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single split (&lt; 12 kW):</strong> 4.0 - 6.5 — SEER &gt; 4.0</li>
              <li><strong>Multi-split system:</strong> 4.5 - 7.0 — SEER &gt; 4.3</li>
              <li><strong>VRF/VRV system:</strong> 5.0 - 8.0 — SEER &gt; 4.5</li>
              <li><strong>Air-cooled chiller:</strong> 2.8 - 4.0 (EER) — SEER &gt; 3.0</li>
              <li><strong>Water-cooled chiller:</strong> 5.0 - 7.5 (EER) — SEER &gt; 4.5</li>
            </ul>
            <p><strong>Understanding SEER vs EER vs COP</strong></p>
            <p><strong>COP (Coefficient of Performance):</strong> Instantaneous efficiency at specific conditions (e.g., 35°C outdoor)</p>
            <p><strong>EER (Energy Efficiency Ratio):</strong> Cooling capacity (BTU/h) ÷ power input (W) at rated conditions</p>
            <p><strong>SEER (Seasonal EER):</strong> Weighted average efficiency across a typical cooling season, accounting for part-load operation</p>
            <p>SEER is most meaningful for comparing systems as it reflects real-world performance across varying conditions.</p>
            <p><strong>Selection tip:</strong> For buildings between 5,000-10,000 m², evaluate both options using life cycle cost analysis. The crossover point depends on local energy costs, maintenance capabilities, and specific operational requirements.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Life Cycle Cost Analysis">
            <p>Life cycle cost (LCC) analysis evaluates the total cost of ownership over a system's lifetime, typically 15-20 years for air conditioning equipment. This approach reveals the true cost implications of design decisions beyond initial capital expenditure.</p>
            <p><strong>Life Cycle Cost Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Capital (equipment + install):</strong> 15-25% — System type, capacity, complexity</li>
              <li><strong>Energy consumption:</strong> 60-80% — SEER, operating hours, tariff</li>
              <li><strong>Planned maintenance:</strong> 5-10% — Service frequency, access difficulty</li>
              <li><strong>Reactive maintenance:</strong> 3-8% — Reliability, parts availability</li>
              <li><strong>Replacement/disposal:</strong> 2-5% — Refrigerant recovery, disposal costs</li>
            </ul>
            <p><strong>Net Present Value Calculation</strong></p>
            <p>NPV = -C₀ + Σ (Cₙ / (1 + r)ⁿ)</p>
            <p>Where:</p>
            <p>C₀ = Initial capital cost</p>
            <p>Cₙ = Net cash flow in year n (energy savings - operating costs)</p>
            <p>r = Discount rate (typically 3.5-6%)</p>
            <p>n = Year number (1 to system lifetime)</p>
            <p><strong>LCC Example: DX vs Chilled Water for 5,000 m² Office</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cooling load:</strong> 400 kW — 400 kW</li>
              <li><strong>Capital cost:</strong> £320,000 — £380,000</li>
              <li><strong>SEER:</strong> 6.5 — 5.0 (system)</li>
              <li><strong>Annual energy (1,500 EFLHs):</strong> 92,300 kWh — 120,000 kWh</li>
              <li><strong>Annual energy cost (£0.30/kWh):</strong> £27,700 — £36,000</li>
              <li><strong>Annual maintenance:</strong> £12,000 — £15,000</li>
              <li><strong>20-year NPV (5% discount):</strong> £815,000 — £1,015,000</li>
            </ul>
            <p>Note: This example shows VRF advantage at this scale. Results vary significantly with building size, operating hours, and energy costs. Always perform project-specific analysis.</p>
            <p><strong>Sensitivity Analysis Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy price escalation:</strong> Test 2%, 5%, 8% annual increases</li>
              <li><strong>Discount rate:</strong> Test 3.5% (public sector) to 8% (private)</li>
              <li><strong>Operating hours:</strong> Test reduced hours (COVID effect) and extended hours</li>
              <li><strong>System lifetime:</strong> Test 15, 20, and 25-year scenarios</li>
              <li><strong>Maintenance costs:</strong> Test ±20% from base estimates</li>
            </ul>
            <p><strong>Key insight:</strong> Energy typically dominates LCC, so a 20% more efficient system can justify 30-40% higher capital cost whilst still providing lower total cost of ownership.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Sustainability and Selection Criteria">
            <p>Modern system selection must address sustainability requirements including F-gas regulations, carbon reduction targets, and building certification schemes. These factors increasingly influence both regulatory compliance and market value.</p>
            <p><strong>Refrigerant Selection and F-gas Compliance</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>R-410A:</strong> 2088 — A1 (non-flammable) — Being phased out for new systems</li>
              <li><strong>R-32:</strong> 675 — A2L (mildly flammable) — Splits, VRF (preferred for &lt;3 kg)</li>
              <li><strong>R-290 (propane):</strong> 3 — A3 (flammable) — Small systems (&lt;500g charge)</li>
              <li><strong>R-1234ze:</strong> 7 — A2L (mildly flammable) — Chillers, large systems</li>
              <li><strong>R-513A:</strong> 631 — A1 (non-flammable) — Chillers (R-134a replacement)</li>
            </ul>
            <p><strong>F-gas Regulation Key Dates</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2025:</strong> Single splits &lt;3 kg must use GWP &lt;750 refrigerants</li>
              <li><strong>2025:</strong> Multi-splits &lt;3 kg must use GWP &lt;750 refrigerants</li>
              <li><strong>2027:</strong> All splits and multi-splits must use GWP &lt;750 refrigerants</li>
              <li><strong>Ongoing:</strong> Phase-down of HFC quotas reducing availability of high-GWP refrigerants</li>
            </ul>
            <p><strong>Part L Compliance Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Minimum efficiency:</strong> Systems must meet SEER minimums per Non-Domestic Building Services Compliance Guide</li>
              <li><strong>Metering:</strong> Systems &gt;12 kW cooling must have energy metering</li>
              <li><strong>Controls:</strong> Time and temperature control required, optimum start/stop for larger systems</li>
              <li><strong>Demand control:</strong> CO₂ or occupancy sensing for variable occupancy spaces</li>
              <li><strong>Free cooling:</strong> Consider economiser cycles for air handling systems</li>
            </ul>
            <p><strong>BREEAM Credits for Cooling Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ene 01:</strong> Energy performance (EPR improvement) — Up to 15</li>
              <li><strong>Ene 02:</strong> Sub-metering of major energy uses — Up to 2</li>
              <li><strong>Ene 04:</strong> Low and zero carbon technologies — Up to 5</li>
              <li><strong>Pol 01:</strong> Refrigerant GWP &lt;10 (exemplary) — Up to 3</li>
              <li><strong>Man 04:</strong> Seasonal commissioning — Up to 4</li>
            </ul>
            <p><strong>System Selection Decision Matrix</strong></p>
            <p>Weight and score each factor (1-5) based on project priorities:</p>
            <p><strong>Technical Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Peak cooling capacity match</li>
              <li>Part-load efficiency (SEER)</li>
              <li>Zone control capability</li>
              <li>Response time requirements</li>
              <li>Redundancy and reliability</li>
            </ul>
            <p><strong>Commercial Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capital cost budget</li>
              <li>Life cycle cost target</li>
              <li>Maintenance capability</li>
              <li>Future flexibility</li>
              <li>Certification requirements</li>
            </ul>
            <p><strong>Future-Proofing Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Climate change:</strong> Design for future weather conditions (CIBSE TM49)</li>
              <li><strong>Flexibility:</strong> Consider modular systems for changing requirements</li>
              <li><strong>Refrigerant availability:</strong> Select refrigerants with long-term availability</li>
              <li><strong>Grid integration:</strong> Enable demand response and smart grid connection</li>
              <li><strong>Electrification:</strong> Design for potential elimination of gas heating</li>
            </ul>
            <p><strong>Key principle:</strong> System selection should balance immediate requirements with long-term sustainability goals. The lowest capital cost option is rarely the best value when life cycle costs and environmental impact are properly considered.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Cooling Load Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate peak cooling load for a 200 m² south-facing office.</p>
            <p>Given data:</p>
            <p>Floor area: 200 m², ceiling height 2.7 m</p>
            <p>Glazing: 40 m² south-facing, U-value 1.4 W/m²K, g-value 0.4</p>
            <p>Occupancy: 15 people</p>
            <p>Equipment: 25 W/m² (with 0.8 diversity)</p>
            <p>Lighting: 10 W/m²</p>
            <p>Ventilation: 12 l/s per person</p>
            <p>Heat gain calculations:</p>
            <p>Solar gain: 40 m² × 350 W/m² × 0.4 = 5,600 W</p>
            <p>Occupants: 15 × 90 W (sensible) = 1,350 W</p>
            <p>Equipment: 200 × 25 × 0.8 = 4,000 W</p>
            <p>Lighting: 200 × 10 = 2,000 W</p>
            <p>Ventilation: 15 × 12 × 1.2 × 8 = 1,728 W (8K temp diff)</p>
            <p>Total sensible load: 14,678 W</p>
            <p>Add 10% safety margin: 14,678 × 1.1 = 16,146 W</p>
            <p>Design cooling capacity: 16.5 kW (80 W/m²)</p>
            <p>
              <strong>Example 2: SEER Comparison and Payback</strong>
            </p>
            <p><strong>Scenario:</strong> Compare two VRF systems with different SEER ratings.</p>
            <p>System requirements:</p>
            <p>Cooling capacity: 100 kW</p>
            <p>Annual equivalent full load hours: 1,200</p>
            <p>Electricity cost: £0.30/kWh</p>
            <p>Option A: SEER 5.0, Capital £85,000</p>
            <p>Annual energy: (100 × 1,200) / 5.0 = 24,000 kWh</p>
            <p>Annual cost: 24,000 × £0.30 = £7,200</p>
            <p>Option B: SEER 7.0, Capital £105,000</p>
            <p>Annual energy: (100 × 1,200) / 7.0 = 17,143 kWh</p>
            <p>Annual cost: 17,143 × £0.30 = £5,143</p>
            <p>Comparison:</p>
            <p>Capital premium: £105,000 - £85,000 = £20,000</p>
            <p>Annual saving: £7,200 - £5,143 = £2,057</p>
            <p>Simple payback: £20,000 / £2,057 = 9.7 years</p>
            <p>20-year NPV saving (5% discount): £5,600</p>
            <p>
              <strong>Example 3: Refrigerant Charge Compliance</strong>
            </p>
            <p><strong>Scenario:</strong> Check F-gas compliance for a proposed VRF installation.</p>
            <p>Proposed system:</p>
            <p>VRF system with R-410A refrigerant</p>
            <p>Total charge: 25 kg</p>
            <p>Installation date: 2026</p>
            <p>F-gas calculation:</p>
            <p>R-410A GWP: 2,088</p>
            <p>CO₂ equivalent: 25 kg × 2,088 = 52,200 kg CO₂e</p>
            <p>= 52.2 tonnes CO₂ equivalent</p>
            <p>Requirements:</p>
            <p>&gt; 50 tonnes CO₂e: Quarterly leak checks required</p>
            <p>&gt; 500 tonnes CO₂e: Automatic leak detection required</p>
            <p>Issue: R-410A prohibited for new VRF from 2027</p>
            <p>Recommendation:</p>
            <p>Select R-32 system (GWP 675)</p>
            <p>CO₂ equivalent: 25 × 675 = 16,875 kg = 16.9 tonnes</p>
            <p>Annual leak checks only (not quarterly)</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>System Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate cooling loads using appropriate CIBSE methodology</li>
              <li>Apply realistic diversity factors for internal gains</li>
              <li>Compare at least two system types using LCC analysis</li>
              <li>Verify Part L compliance for minimum SEER requirements</li>
              <li>Check F-gas compliance for refrigerant selection</li>
              <li>Consider BREEAM or other certification requirements</li>
              <li>Evaluate maintenance access and operational requirements</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energy = <strong>60-80%</strong> of typical life cycle cost</li>
              <li>VRF typical SEER: <strong>5.0 - 8.0</strong></li>
              <li>Water-cooled chiller EER: <strong>5.0 - 7.5</strong></li>
              <li>R-32 GWP: <strong>675</strong> (vs R-410A at 2088)</li>
              <li>F-gas GWP limit from 2025: <strong>&lt;750</strong> for splits &lt;3 kg</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Oversizing:</strong> Adding excessive safety margins reduces efficiency</li>
                <li><strong>Ignoring part-load:</strong> Peak COP matters less than seasonal SEER</li>
                <li><strong>Capital cost focus:</strong> Lowest first cost rarely means lowest LCC</li>
                <li><strong>F-gas oversight:</strong> Specifying R-410A for systems prohibited from 2025/2027</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Terminal units
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Commissioning and testing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section3_5;
