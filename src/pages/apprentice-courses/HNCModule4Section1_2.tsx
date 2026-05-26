/**
 * Module 4 · Section 1 · Subsection 2 — Diversity Factors
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   BS 7671 Table 1A and ADMD: how to apply diversity to convert connected load into
 *   maximum demand on domestic, commercial and mixed-tenure projects without overshooting
 *   the supply or under-sizing the incomer.
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

const TITLE = 'Diversity Factors - HNC Module 4 Section 1.2';
const DESCRIPTION =
  'Master diversity factor application for building services: BS 7671 Table 1A guidance, ADMD calculations, typical values for commercial and industrial installations.';

const quickCheckQuestions = [
  {
    id: 'diversity-def',
    question: 'What does a diversity factor of 0.6 mean?',
    options: [
      '60% voltage drop is acceptable',
      'Loads operate 60% of the time',
      'Only 60% of connected load operates at peak',
      '60% of loads are connected',
    ],
    correctIndex: 2,
    explanation:
      'A diversity factor of 0.6 means that at peak demand, only 60% of the total connected load is expected to operate simultaneously. This reduces the calculated maximum demand.',
  },
  {
    id: 'socket-diversity',
    question:
      'According to BS 7671 guidance, what diversity applies to socket outlets in an office?',
    options: [
      '1 metre above highest point within 10m',
      'Predictive analytics and AI capabilities',
      '100% of first 10 sockets + 50% remainder',
      'To adjust consumption data for weather variations',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Appendix 1 recommends 100% of the first group of socket outlets plus a reduced percentage (typically 40-50%) of the remainder for commercial installations.',
  },
  {
    id: 'admd-meaning',
    question: 'What does ADMD stand for?',
    options: [
      'Average Daily Maximum Demand',
      'Annual Demand Measurement Data',
      'Assessed Design Maximum Demand',
      'After Diversity Maximum Demand',
    ],
    correctIndex: 3,
    explanation:
      'ADMD means After Diversity Maximum Demand - the expected peak demand after applying appropriate diversity factors to the connected load.',
  },
  {
    id: 'lighting-diversity',
    question: 'What diversity factor typically applies to office lighting?',
    options: [
      '100% (no diversity)',
      '50%',
      '75%',
      '90%',
    ],
    correctIndex: 3,
    explanation:
      "Office lighting typically uses 90% diversity - almost all lights operate during occupied hours, but some areas (meeting rooms, stores) won't be fully lit continuously.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why is diversity applied to electrical load calculations?',
    options: [
      'Workers who have passed the HS&E test but not yet achieved their full qualification',
      'To account for loads not operating simultaneously at full capacity',
      'Cross-check with different methods where possible',
      'A certificate showing actual energy use in public buildings over 250m²',
    ],
    correctAnswer: 1,
    explanation:
      'Diversity accounts for the fact that not all electrical equipment operates at the same time or at full rated capacity. This allows more realistic demand assessment.',
  },
  {
    id: 2,
    question: 'A building has 100 × 3kW heaters. With 0.6 diversity, what is the diversified load?',
    options: [
      '100kW',
      '300kW',
      '180kW',
      '60kW',
    ],
    correctAnswer: 2,
    explanation: 'Total connected = 100 × 3kW = 300kW. Diversified load = 300kW × 0.6 = 180kW',
  },
  {
    id: 3,
    question: 'Which load type typically has the lowest diversity factor?',
    options: [
      'Cooking equipment in domestic',
      'Socket outlets',
      'Office small power',
      'Emergency lighting',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency lighting has 100% diversity (no reduction) as all emergency luminaires operate simultaneously when activated - this is essential for life safety.',
  },
  {
    id: 4,
    question: 'BS 7671 Appendix 1 Table 1A provides guidance on:',
    options: [
      'Diversity allowances for domestic installations',
      'Ensures proper electrical contact and prevents overheating',
      'Behind the screen relative to the user',
      'Only a competent person responsible for the work',
    ],
    correctAnswer: 0,
    explanation:
      'Table 1A in BS 7671 Appendix 1 provides diversity factors specifically for domestic installations. Commercial diversity requires engineering judgement.',
  },
  {
    id: 5,
    question:
      'For a housing estate, ADMD is calculated per dwelling. A typical UK dwelling has ADMD of:',
    options: [
      '1-2 kVA',
      '2-3 kVA',
      '15-20 kVA',
      '5-8 kVA',
    ],
    correctAnswer: 1,
    explanation:
      'Typical UK dwelling ADMD is 2-3 kVA (often 2.5 kVA used), though this varies with property size, heating type, and EV charging provision.',
  },
  {
    id: 6,
    question:
      'When calculating ADMD for a block of 50 flats, the diversity factor between dwellings is:',
    options: [
      'Daylight-linked dimming with occupancy sensing',
      'To protect cable insulation from sharp edges',
      'Applied - total is less than 50 × individual ADMD',
      'A contactor (the first contactor in the circuit)',
    ],
    correctAnswer: 2,
    explanation:
      'Inter-dwelling diversity is applied because not all flats experience peak demand simultaneously. 50 flats at 2.5kVA each would total 125kVA, but diversified demand might be 60-80kVA.',
  },
  {
    id: 7,
    question: 'Which statement about diversity factors is correct?',
    options: [
      'Diversity can only be applied once at the main incomer',
      'Individual circuits should not have diversity applied',
      'Only DNO-approved diversity factors can be used',
      'Diversity can be applied at each distribution level',
    ],
    correctAnswer: 3,
    explanation:
      'Diversity can be applied at each distribution level (final circuits, distribution boards, sub-mains), but care must be taken not to compound diversity inappropriately.',
  },
  {
    id: 8,
    question: 'A commercial kitchen has 50kW of cooking equipment. What diversity might apply?',
    options: [
      '80-90%',
      '100%',
      '20-30%',
      '40-50%',
    ],
    correctAnswer: 0,
    explanation:
      'Commercial kitchens typically operate at 80-90% of connected load during peak service times. Diversity is lower than offices because most equipment operates simultaneously during service.',
  },
  {
    id: 9,
    question: 'How does diversity differ between daytime and 24-hour buildings?',
    options: [
      'No difference in diversity factors',
      '24-hour buildings have lower peak-to-average ratio',
      '24-hour buildings have higher diversity overall',
      'Diversity only applies to daytime buildings',
    ],
    correctAnswer: 1,
    explanation:
      '24-hour buildings (hospitals, data centres) have lower peak-to-average ratios as loads are more evenly distributed. Peak demand may be similar but average demand is higher.',
  },
  {
    id: 10,
    question: 'When should diversity NOT be applied?',
    options: [
      'The risk of surface condensation at a thermal bridge',
      'Investment-grade audit (Level III)',
      'For emergency systems and life safety equipment',
      'Pricing early activities higher to improve cash flow',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency systems (emergency lighting, fire alarm, smoke extract) must be calculated at 100% - all equipment operates simultaneously during an emergency.',
  },
];

const faqs = [
  {
    question: 'Can I apply my own diversity factors or must I use published values?',
    answer:
      'BS 7671 Table 1A provides guidance for domestic installations. For commercial and industrial buildings, diversity factors are based on engineering judgement, using CIBSE guidance, measured data from similar buildings, and operational knowledge. The designer takes responsibility for the factors applied.',
  },
  {
    question: 'How do I determine diversity for a unique building type?',
    answer:
      'Start with CIBSE benchmarks for similar building types. Consider operational patterns - when loads operate, for how long, and at what capacity. Review measured data from comparable installations if available. Apply conservative factors initially, then refine based on commissioning data.',
  },
  {
    question: 'What is the relationship between diversity and load factor?',
    answer:
      'Diversity relates to peak demand (reducing connected load to maximum demand). Load factor relates to average demand (average ÷ maximum). High diversity means low peak compared to connected load. High load factor means consistent demand over time. A building can have high diversity but low load factor.',
  },
  {
    question: 'How does EV charging affect dwelling ADMD?',
    answer:
      'A 7kW EV charger significantly increases dwelling ADMD if charged at peak times. Smart charging with off-peak operation has minimal impact on peak ADMD. DNOs are developing specific guidance, but currently 1-2kVA per dwelling might be added for EV-ready installations, assuming diversity between vehicles.',
  },
  {
    question: 'Should I apply diversity to standby generator sizing?',
    answer:
      'Generally yes, but with care. Generator sizing considers both running load (diversified) and starting duty (may need full motor starting kVA). Essential loads typically have higher diversity (lower reduction) than general loads. Consult generator manufacturer guidance for starting calculations.',
  },
  {
    question: 'How does diversity change with building size?',
    answer:
      'Larger buildings generally have higher diversity (more loads, more variation in use patterns). A 10-desk office might have 50% small power diversity; a 1000-desk building might achieve 30%. However, large single-process loads (data centres, manufacturing) may have low diversity regardless of size.',
  },
];

const HNCModule4Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 2"
            title="Diversity Factors"
            description="Understanding and applying diversity to achieve accurate maximum demand calculations in building services."
            tone="purple"
          />

          <TLDR
            points={[
              'Diversity is the recognition that connected load almost never operates simultaneously at full rating — engineering judgement turns total connected into real maximum demand.',
              'BS 7671 Appendix 1 Table 1A gives diversity guidance for domestic only. Commercial and industrial diversity rests on CIBSE benchmarks plus measured data from comparable installations.',
              'ADMD (After Diversity Maximum Demand) is how DNOs size LV networks for residential developments — typical UK dwelling 2–3 kVA, with inter-dwelling diversity reducing further as the count rises.',
              'Emergency lighting, fire alarm, smoke extract and any life-safety load is always 100% — no diversity. Apply diversity here and people die in a fire.',
              'Apply diversity at one defined level in the distribution hierarchy — never compound it twice.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 311.1 (Maximum demand and diversity)"
            clause="The rated current of a switch or RCCB may be based on the application of diversity factors to the downstream circuits according to Regulation 311.1. Where diversity is applied, the rated current of the OCPD shall be selected according to the manufacturer's instructions."
            meaning={
              <>
                Reg 311.1 explicitly authorises diversity at the device-rating level and ties it
                to manufacturer data. As the designer, you are accountable for the diversity
                factors you apply: document them, justify them against CIBSE / measured data,
                and never compound diversity across multiple distribution layers without spelling
                out where it has been applied. Get caught using domestic Table 1A factors on a
                commercial job and your design submission will not survive scrutiny.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 311.1; BS 7671 Appendix 1 Table 1A; CIBSE Guide F."
          />

          <LearningOutcomes
            outcomes={[
              'Define diversity factor and its role in load assessment',
              'Apply BS 7671 Table 1A diversity factors for domestic installations',
              'Select appropriate diversity for commercial building services',
              'Calculate ADMD for individual dwellings and developments',
              'Understand when diversity should not be applied',
              'Apply diversity at multiple distribution levels correctly',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Understanding Diversity">
            <p>
              Diversity is the recognition that not all connected electrical equipment operates
              simultaneously at full rated capacity. Understanding and correctly applying diversity
              is essential for economical yet safe electrical system design.
            </p>
            <p>
              <strong>The diversity equation:</strong> Maximum Demand = Connected Load × Diversity
              Factor (where the diversity factor is always ≤ 1.0).
            </p>
            <p>
              <strong>Factors affecting diversity:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Number of loads:</strong> More loads generally means higher diversity
              </li>
              <li>
                <strong>Type of loads:</strong> Some loads have inherently low diversity
              </li>
              <li>
                <strong>Usage patterns:</strong> Intermittent vs continuous operation
              </li>
              <li>
                <strong>Control systems:</strong> Automated load management reduces peaks
              </li>
              <li>
                <strong>Building type:</strong> Different usage patterns by sector
              </li>
            </ul>
            <p>
              <strong>Typical diversity factors by load type:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting (office) — 0.9:</strong> most lights on during occupied hours
              </li>
              <li>
                <strong>Small power (office) — 0.3-0.5:</strong> desks not all occupied, PCs vary
              </li>
              <li>
                <strong>HVAC (constant) — 1.0:</strong> runs continuously at design load
              </li>
              <li>
                <strong>HVAC (VAV) — 0.7-0.8:</strong> variable air volume reduces average
              </li>
              <li>
                <strong>Lifts — 0.5-0.7:</strong> not all cars run simultaneously
              </li>
              <li>
                <strong>Emergency lighting — 1.0:</strong> all on during emergency (no diversity)
              </li>
            </ul>
            <p>
              <strong>Key principle:</strong> Lower diversity factor = less equipment operating
              simultaneously = lower maximum demand.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="BS 7671 Table 1A Guidance">
            <p>
              BS 7671 Appendix 1, Table 1A provides diversity factors specifically for domestic
              installations. These are guidance values that have proven reliable over many years of
              application.
            </p>
            <p>
              <strong>BS 7671 Table 1A — domestic diversity:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lighting:</strong> 66% of total connected load
              </li>
              <li>
                <strong>Heating and power:</strong> 100% of largest + 40% of remaining
              </li>
              <li>
                <strong>Cooking appliances:</strong> 10A + 30% of remaining + 5A if socket
              </li>
              <li>
                <strong>Motors (excluding lifts):</strong> 100% largest + 40% of remaining
              </li>
              <li>
                <strong>Instantaneous water heaters:</strong> 100% of largest + 100% of 2nd largest
                + 25% remainder
              </li>
              <li>
                <strong>Thermal storage heaters:</strong> 100% (all charge together overnight)
              </li>
              <li>
                <strong>Socket outlets (domestic):</strong> 100% of largest circuit + 40% of others
              </li>
            </ul>
            <p>
              <strong>Important notes on Table 1A:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Table 1A applies to <strong>domestic</strong> installations only
              </li>
              <li>Commercial installations require engineering judgement</li>
              <li>
                These are <strong>guidance values</strong>, not mandatory requirements
              </li>
              <li>Designer responsibility to select appropriate values</li>
            </ul>
            <p>
              <strong>Application note:</strong> Table 1A values are conservative for typical
              dwellings. Higher diversity might apply for small flats; lower diversity for large
              houses.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Commercial Building Services Diversity">
            <p>
              Commercial installations require more sophisticated diversity analysis than domestic.
              CIBSE Guide A and engineering judgement based on operational patterns are the primary
              references.
            </p>
            <p>
              <strong>Diversity by building type:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Office (standard) — 0.6-0.7:</strong> daytime operation, variable occupancy
              </li>
              <li>
                <strong>Office (prestige) — 0.7-0.8:</strong> higher small power density
              </li>
              <li>
                <strong>Retail (general) — 0.7-0.8:</strong> high lighting, lower small power
              </li>
              <li>
                <strong>Supermarket — 0.85-0.95:</strong> refrigeration constant load
              </li>
              <li>
                <strong>Hospital — 0.7-0.8:</strong> 24-hour, mixed loads
              </li>
              <li>
                <strong>Data centre — 0.9-1.0:</strong> constant IT load, minimal diversity
              </li>
              <li>
                <strong>Manufacturing — 0.5-0.9:</strong> highly variable by process
              </li>
            </ul>
            <p>
              <strong>Small power diversity:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>General office: 25-35 W/m² connected</li>
              <li>Typical diversity: 0.4 (40%)</li>
              <li>Diversified: 10-14 W/m²</li>
              <li>Higher for dealing rooms, call centres</li>
            </ul>
            <p>
              <strong>HVAC diversity considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Constant volume: ~100% at design conditions</li>
              <li>VAV systems: 70-80% typical</li>
              <li>VRF systems: 60-70% typical</li>
              <li>Consider heating vs cooling modes</li>
            </ul>
            <p>
              <strong>Remember:</strong> Commercial diversity factors require justification.
              Document your assumptions and the basis for diversity applied.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="ADMD Calculations">
            <p>
              After Diversity Maximum Demand (ADMD) is particularly important for residential
              developments where multiple dwellings share infrastructure. DNOs publish ADMD tables
              for different dwelling types.
            </p>
            <p>
              <strong>Typical dwelling ADMD values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1-bed flat (gas heating):</strong> 1.5-2.0 kVA — low electrical demand
              </li>
              <li>
                <strong>2-bed flat (gas heating):</strong> 2.0-2.5 kVA — standard assumption
              </li>
              <li>
                <strong>3-bed house (gas heating):</strong> 2.5-3.0 kVA — typical family home
              </li>
              <li>
                <strong>Large house (gas heating):</strong> 3.0-4.0 kVA — higher than average demand
              </li>
              <li>
                <strong>All-electric dwelling:</strong> 4.0-6.0 kVA — heat pump or direct electric
              </li>
              <li>
                <strong>With 7kW EV charger:</strong> +1.0-2.0 kVA additional (with diversity)
              </li>
            </ul>
            <p>
              <strong>Inter-dwelling diversity:</strong> For multiple dwellings, total ADMD is not
              simply n × individual ADMD.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>10 dwellings × 2.5kVA = 25kVA connected</li>
              <li>Diversified total ≈ 15-18kVA (diversity factor ~0.6-0.7)</li>
              <li>50 dwellings × 2.5kVA = 125kVA connected</li>
              <li>Diversified total ≈ 60-75kVA (diversity factor ~0.5-0.6)</li>
            </ul>
            <p>
              <strong>Development ADMD calculation steps:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Step 1: Determine individual dwelling ADMD (from DNO tables or engineering
                assessment)
              </li>
              <li>Step 2: Apply inter-dwelling diversity factor based on number of dwellings</li>
              <li>
                Step 3: Add landlord services (lifts, lighting, pumps) at appropriate diversity
              </li>
              <li>Step 4: Add non-domestic loads (retail units) separately</li>
              <li>Step 5: Sum for total development maximum demand</li>
            </ul>
            <p>
              <strong>DNO guidance:</strong> Always check with the local DNO for their specific ADMD
              values and diversity tables — these vary between network operators.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — domestic consumer unit:</strong> Calculate diversified demand for
              Lighting 3kW, Ring circuits 2 × 7.2kW, Cooker 12kW, Shower 9kW.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting: 3kW × 0.66 = 1.98kW</li>
              <li>Socket circuits: 7.2 + (7.2 × 0.4) = 10.08kW</li>
              <li>Cooker: 10A (2.3kW) + (12-2.3) × 0.3 = 5.2kW</li>
              <li>Shower: 9kW × 1.0 = 9kW</li>
              <li>
                Total diversified = 1.98 + 10.08 + 5.2 + 9 = <strong>26.3kW</strong>
              </li>
              <li>Compare to connected load: 3 + 14.4 + 12 + 9 = 38.4kW</li>
            </ul>
            <p>
              <strong>Example 2 — office floor plate:</strong> A 2000m² office floor has Lighting
              24kW, Small power 60kW, Fan coils 30kW. Calculate diversified demand.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting: 24kW × 0.9 = 21.6kW</li>
              <li>Small power: 60kW × 0.4 = 24kW</li>
              <li>Fan coils: 30kW × 0.8 = 24kW</li>
              <li>
                Total diversified = 21.6 + 24 + 24 = <strong>69.6kW</strong>
              </li>
              <li>Connected load was 114kW — diversity factor = 0.61</li>
              <li>
                At 0.9 pf: 69.6 ÷ 0.9 = <strong>77.3 kVA</strong>
              </li>
            </ul>
            <p>
              <strong>Example 3 — residential development ADMD:</strong> Calculate maximum demand
              for 30 × 2-bed flats (gas heating) with communal lighting 5kW and lift 15kW.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Individual flat ADMD: 2.5kVA</li>
              <li>30 flats connected: 30 × 2.5 = 75kVA</li>
              <li>Inter-dwelling diversity (30 units): ~0.55</li>
              <li>Diversified flats: 75 × 0.55 = 41.25kVA</li>
              <li>Lighting: 5kW × 1.0 = 5kVA (essential, no diversity)</li>
              <li>Lift: 15kW × 0.6 = 9kVA</li>
              <li>
                Total ADMD = 41.25 + 5 + 9 = <strong>55.3 kVA</strong>
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Diversity selection checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Identify building type and operational patterns</li>
              <li>List all load categories with connected values</li>
              <li>Select diversity factors from CIBSE or engineering judgement</li>
              <li>Apply no diversity to emergency/life safety systems</li>
              <li>Document all assumptions for future reference</li>
              <li>Validate against benchmark data where available</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Domestic lighting: <strong>66%</strong>
              </li>
              <li>
                Office small power: <strong>30-40%</strong>
              </li>
              <li>
                Office lighting: <strong>90%</strong>
              </li>
              <li>
                Emergency systems: <strong>100%</strong> (no diversity)
              </li>
              <li>
                Typical dwelling ADMD: <strong>2-3 kVA</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Compounding diversity</strong> — don't apply diversity twice at different
                  levels
                </li>
                <li>
                  <strong>Using domestic values commercially</strong> — commercial needs specific
                  assessment
                </li>
                <li>
                  <strong>Applying diversity to emergency systems</strong> — life safety always 100%
                </li>
                <li>
                  <strong>Ignoring process loads</strong> — industrial loads may have low diversity
                </li>
              </ul>
            }
            doInstead="Decide where in the distribution hierarchy diversity is applied and stick to it. Use BS 7671 Table 1A only for domestic; use CIBSE or measured data for commercial. Always design emergency / life-safety systems at 100% with no diversity reduction."
          />

          <SectionRule />

          <Scenario
            title="Mixed-use building — splitting the diversified demand by tenure"
            situation={
              <>
                A mixed-use scheme: 24 × 2-bed flats over 2 retail units (one a small supermarket
                with continuous refrigeration, one a coffee shop). Communal services include a
                lift, landlord lighting and a heat-pump plant room. The DNO is asking for a single
                ADMD figure for the supply and a per-tenure breakdown for the metering layout.
              </>
            }
            whatToDo={
              <>
                Split the calculation by tenure. Flats: 24 × 2.5&nbsp;kVA = 60&nbsp;kVA connected,
                inter-dwelling diversity ≈ 0.55, so ≈ 33&nbsp;kVA. Supermarket: ≈ 0.9 diversity
                (refrigeration is constant), coffee shop ≈ 0.7. Add landlord services at their
                own diversities — emergency lighting at 1.0 (no diversity), lift at 0.6, heat
                pump at 1.0 during peak winter. Sum to a single supply figure. Document every
                factor against CIBSE Guide F and keep the breakdown for the Part L submission
                and the metering schedule.
              </>
            }
            whyItMatters={
              <>
                Reg 311.1 makes the diversity decision the designer&rsquo;s. Mis-apply
                inter-dwelling diversity to a continuously-loaded supermarket and you under-size
                the supply. Apply diversity to the emergency lighting and you have a life-safety
                breach. Tenure-split documentation is also what the metering contractor needs to
                position CTs and meters correctly.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Maximum Demand = Connected Load × Diversity Factor — the diversity factor is always ≤ 1.0.',
              'BS 7671 Appendix 1 Table 1A is for domestic only. Commercial and industrial diversity is on you as the designer, evidenced from CIBSE Guide F or measured data.',
              'Reg 311.1 authorises diversity at device-rating level and refers to manufacturer instructions — document the factors and the basis.',
              'Emergency systems (emergency lighting, fire alarm, smoke extract, sprinkler pumps) are ALWAYS 100% — no diversity reduction permitted.',
              'ADMD for UK dwellings: 1.5–3 kVA gas-heated, 4–6 kVA all-electric, +1–2 kVA per dwelling for EV-ready installations.',
              'Inter-dwelling diversity scales with count: 10 dwellings ≈ 0.6–0.7, 50 dwellings ≈ 0.5–0.6, 100+ dwellings ≈ 0.4–0.5.',
              'Apply diversity at one clearly defined level — never compound at sub-main and main without explicit justification.',
              'Diversity selection is part of the Part L design audit trail — assumptions matter as much as numbers.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Maximum demand calculations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Power factor considerations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section1_2;
