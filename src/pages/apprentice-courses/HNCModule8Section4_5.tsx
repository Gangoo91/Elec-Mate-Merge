/**
 * Module 8 · Section 4 · Subsection 5 — Energy Efficiency
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Affinity laws, energy savings calculations and financial analysis for motor systems
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

const TITLE = 'Energy Efficiency - HNC Module 8 Section 4.5';
const DESCRIPTION =
  'Master energy efficiency in motor systems: affinity laws for fans and pumps, energy savings calculations comparing fixed vs variable speed drives, payback analysis, NPV calculations, carbon savings and Part L compliance for motor systems.';

const quickCheckQuestions = [
  {
    id: 'affinity-power-law',
    question:
      'According to the affinity laws, if fan speed is reduced to 80% of full speed, what percentage of original power is consumed?',
    options: [
      '51.2%',
      '80%',
      '40%',
      '64%',
    ],
    correctIndex: 0,
    explanation:
      'Power varies with the cube of speed. At 80% speed: Power = 0.8³ = 0.512 = 51.2% of original power. This cubic relationship is why VSDs offer such significant energy savings on variable flow applications.',
  },
  {
    id: 'simple-payback',
    question:
      'A VSD installation costs £4,500 and saves £1,800 per year in energy costs. What is the simple payback period?',
    options: [
      '1.5 years',
      '2.0 years',
      '3.0 years',
      '2.5 years',
    ],
    correctIndex: 3,
    explanation:
      'Simple Payback = Capital Cost / Annual Savings = £4,500 / £1,800 = 2.5 years. Projects with payback periods under 3 years are generally considered attractive investments.',
  },
  {
    id: 'carbon-factor',
    question:
      'Using a UK grid carbon factor of 0.233 kgCO₂/kWh, what annual carbon saving results from 15,000 kWh energy reduction?',
    options: [
      '3,495 kgCO₂',
      '5,495 kgCO₂',
      '4,495 kgCO₂',
      '2,495 kgCO₂',
    ],
    correctIndex: 0,
    explanation:
      'Carbon Saving = Energy Saved × Carbon Factor = 15,000 kWh × 0.233 kgCO₂/kWh = 3,495 kgCO₂ (3.5 tonnes CO₂ per year). This demonstrates the environmental benefit of VSD installations.',
  },
  {
    id: 'part-l-motors',
    question:
      'Under Part L of the Building Regulations, what is the minimum motor efficiency class required for new installations?',
    options: [
      'IE4 Super Premium',
      'IE2 High',
      'IE3 Premium',
      'IE1 Standard',
    ],
    correctIndex: 2,
    explanation:
      'Part L requires IE3 Premium efficiency motors as minimum for new installations since 2017. IE4 Super Premium motors are increasingly specified for applications with long running hours to maximise energy savings.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The affinity laws state that flow rate (Q) varies with which relationship to speed (N)?',
    options: [
      'Q ∝ N² (square law)',
      'Q ∝ N (directly proportional)',
      'Q ∝ N³ (cube law)',
      'Q ∝ √N (square root)',
    ],
    correctAnswer: 1,
    explanation:
      'Flow rate is directly proportional to speed: Q₂/Q₁ = N₂/N₁. Doubling the speed doubles the flow rate. This linear relationship contrasts with the cubic relationship for power.',
  },
  {
    id: 2,
    question:
      'A centrifugal pump operates at 2900 rpm delivering 50 m³/h. If speed is reduced to 2175 rpm, what is the new flow rate?',
    options: [
      '42.2 m³/h',
      '25.0 m³/h',
      '37.5 m³/h',
      '66.7 m³/h',
    ],
    correctAnswer: 2,
    explanation:
      'Using Q₂/Q₁ = N₂/N₁: Q₂ = 50 × (2175/2900) = 50 × 0.75 = 37.5 m³/h. The flow reduces linearly with speed.',
  },
  {
    id: 3,
    question:
      'According to the affinity laws, pressure (head) varies with which relationship to speed?',
    options: [
      'H ∝ N³ (cube law)',
      'H ∝ N (directly proportional)',
      'H ∝ N⁰·⁵ (square root)',
      'H ∝ N² (square law)',
    ],
    correctAnswer: 3,
    explanation:
      'Pressure (head) varies with the square of speed: H₂/H₁ = (N₂/N₁)². If speed halves, pressure reduces to one quarter. This is why VSDs must be carefully applied to maintain minimum system pressure.',
  },
  {
    id: 4,
    question:
      'A supply air fan consumes 15 kW at full speed. If the ductwork dampers are throttled to reduce flow to 70%, approximately what power is saved?',
    options: [
      'Little - dampers dissipate energy while the motor runs at full speed',
      'About 5.1 kW, following the cube law for the speed reduction',
      'Exactly 30%, in direct proportion to the reduction in flow',
      'About 8.2 kW, following the square law for the pressure reduction',
    ],
    correctAnswer: 0,
    explanation:
      'Throttling with dampers maintains motor speed - the fan still works against the system but the energy is dissipated as noise and turbulence. VSDs reduce speed to match demand, saving the cubic power difference.',
  },
  {
    id: 5,
    question:
      'A 22 kW motor operates 5,000 hours/year at average 65% load. If electricity costs £0.18/kWh, what are the annual running costs?',
    options: [
      '£9,900',
      '£12,870',
      '£25,740',
      '£19,800',
    ],
    correctAnswer: 1,
    explanation:
      'Annual cost = Power × Load factor × Hours × Cost = 22 × 0.65 × 5000 × 0.18 = £12,870. Understanding running costs helps justify efficiency investments.',
  },
  {
    id: 6,
    question:
      'What is the typical efficiency improvement when replacing an IE2 motor with an IE4 motor at 11 kW rating?',
    options: [
      '1-2%',
      '5-7%',
      '3-4%',
      '10-12%',
    ],
    correctAnswer: 2,
    explanation:
      'At 11 kW, typical efficiency improves from ~89% (IE2) to ~93% (IE4), a 3-4% improvement. While seemingly small, over thousands of running hours this represents significant energy and cost savings.',
  },
  {
    id: 7,
    question:
      'A VSD installation costs £6,000, saves £2,400/year, with maintenance cost increase of £200/year. What is the true simple payback?',
    options: [
      '2.5 years',
      '3.33 years',
      '3.0 years',
      '2.73 years',
    ],
    correctAnswer: 3,
    explanation:
      'Net annual saving = £2,400 - £200 = £2,200. Payback = £6,000 / £2,200 = 2.73 years. Always account for maintenance and lifecycle costs in investment calculations.',
  },
  {
    id: 8,
    question:
      'For NPV calculations with 8% discount rate over 10 years, what is the approximate present value factor?',
    options: [
      '6.71',
      '7.25',
      '4.21',
      '5.34',
    ],
    correctAnswer: 0,
    explanation:
      'The cumulative present value factor for 10 years at 8% discount rate is approximately 6.71. This is used to calculate NPV: NPV = (Annual Savings × PV Factor) - Capital Cost.',
  },
  {
    id: 9,
    question:
      'A building has 10 × 7.5 kW AHU motors running 3,500 hours/year. If VSDs could save 35% energy, what is the annual kWh saving?',
    options: [
      '65,625 kWh',
      '91,875 kWh',
      '131,250 kWh',
      '262,500 kWh',
    ],
    correctAnswer: 1,
    explanation:
      'Total motor power = 10 × 7.5 = 75 kW. Annual consumption = 75 × 3,500 = 262,500 kWh. Saving = 262,500 × 0.35 = 91,875 kWh per year.',
  },
  {
    id: 10,
    question:
      'Under the Energy-related Products (ErP) Directive, which motors are exempt from minimum efficiency requirements?',
    options: [
      'Standard three-phase induction motors rated 7.5 kW for continuous duty',
      'Premium-efficiency motors already certified to the IE3 class',
      'Motors integrated into machinery where efficiency cannot be tested separately',
      'Any motor installed in a commercial office building',
    ],
    correctAnswer: 2,
    explanation:
      'ErP exemptions include motors designed for intermittent duty, brake motors, and motors integrated into products where their efficiency cannot be tested separately from the host machine.',
  },
  {
    id: 11,
    question:
      'A pump system shows 40% energy saving from VSD installation with £3,200 annual saving. If carbon costs £50/tonne and grid factor is 0.233 kgCO₂/kWh, what additional carbon credit value?',
    options: [
      '£160',
      '£340',
      '£800',
      '£535',
    ],
    correctAnswer: 3,
    explanation:
      'Energy saved = £3,200 / £0.15/kWh ≈ 21,333 kWh. Carbon saved = 21,333 × 0.233 = 4,971 kg = 4.97 tonnes. Carbon value = 4.97 × £50 = £248.50. Note: actual calculation depends on electricity price assumed.',
  },
  {
    id: 12,
    question:
      'What is the recommended approach when applying affinity laws to systems with significant static head?',
    options: [
      'Account for static head as minimum pressure requirement',
      'Affinity laws cannot be used for static head systems',
      'Apply affinity laws without modification',
      'Use only the flow relationship, not power',
    ],
    correctAnswer: 0,
    explanation:
      'Systems with static head (like pumping to height) have a minimum pressure requirement regardless of flow. The affinity laws apply to the variable friction losses only - the static head component must be maintained at all speeds.',
  },
];

const faqs = [
  {
    question:
      'Why do the affinity laws show such dramatic power savings with small speed reductions?',
    answer:
      'The cubic relationship (P ∝ N³) means power drops rapidly with speed. At 90% speed, power is 72.9% (0.9³). At 80% speed, power is 51.2% (0.8³). At 50% speed, power is just 12.5% (0.5³). This contrasts sharply with throttling methods which maintain full speed and dissipate excess energy as heat and turbulence. The physics behind this is that centrifugal machines do work on the fluid - reducing speed reduces the energy imparted to every molecule of air or water passing through.',
  },
  {
    question: 'When should I use simple payback versus NPV for investment analysis?',
    answer:
      'Simple payback is quick to calculate and easy to communicate - suitable for screening projects and comparing similar options. However, it ignores the time value of money and benefits beyond the payback period. NPV (Net Present Value) accounts for discount rates and provides true project value over its lifetime. Use NPV for major capital decisions, comparing projects with different lifespans, and when discount rates significantly affect outcomes. A positive NPV indicates the investment exceeds the required return rate.',
  },
  {
    question: 'How do I account for varying load profiles in energy savings calculations?',
    answer:
      'Real systems rarely operate at constant load. Use load duration analysis: divide operation into bands (e.g., 0-25%, 25-50%, 50-75%, 75-100% load) and estimate hours at each band from BMS data or operational knowledge. Calculate energy at each band considering the cubic power relationship, then sum for total consumption. Compare fixed speed (always 100% power when running) with variable speed operation. Many VSDs provide built-in energy logging to verify actual savings.',
  },
  {
    question: 'What Part L requirements apply to motor replacements in existing buildings?',
    answer:
      'Part L applies to new installations and replacements in existing buildings. When replacing motors, the new motor must meet minimum IE3 efficiency (or IE2 with VSD). Consequential improvements may be required for larger projects - replacing motors could trigger requirements to improve other building services. Document motor efficiency in building log books. Consider whole-life costs: an IE4 motor may have higher capital cost but lower running costs over its 15-20 year lifespan.',
  },
  {
    question: 'How do carbon factors affect payback calculations for energy efficiency projects?',
    answer:
      'Carbon pricing adds value beyond energy savings. UK grid carbon factor (approximately 0.233 kgCO₂/kWh in 2024, declining as grid decarbonises) converts kWh savings to carbon savings. If carbon is priced (via carbon tax, ETS, or corporate commitments), this adds to project value. Many organisations set internal carbon prices (£50-100/tonne) for investment decisions. Include carbon value in NPV calculations, but note the grid factor will decrease over time as renewable generation increases.',
  },
  {
    question: 'What is the typical energy saving from retrofitting VSDs to existing HVAC systems?',
    answer:
      'Savings depend heavily on the application and existing control method. For fans and pumps currently controlled by dampers or throttling valves, expect 30-50% savings on variable flow systems. For constant volume systems converted to variable volume, savings can exceed 60%. Chilled water pumps with two-port valve control typically save 40-50%. However, systems with mostly constant load (e.g., process cooling) show minimal savings. Always conduct proper assessment including load profile analysis before specifying VSDs.',
  },
];

const HNCModule8Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 4 · Subsection 5"
            title="Energy Efficiency"
            description="Affinity laws, energy savings calculations and financial analysis for motor systems"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Apply the affinity laws to predict fan and pump performance at varying speeds",
              "Calculate energy savings comparing fixed speed vs variable speed operation",
              "Perform simple payback analysis for VSD and motor upgrade investments",
              "Calculate Net Present Value (NPV) for energy efficiency projects",
              "Quantify carbon savings using UK grid emission factors",
              "Understand Part L Building Regulations requirements for motor systems",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="The Affinity Laws for Fans and Pumps">
            <p>The affinity laws (also called fan laws or pump laws) describe how centrifugal machine performance changes with rotational speed. These fundamental relationships explain why variable speed drives offer such dramatic energy savings on HVAC systems.</p>
            <p><strong>The Three Affinity Laws</strong></p>
            <p>Flow Rate (Q)</p>
            <p>Q<sub>2</sub>/Q<sub>1</sub> = N<sub>2</sub>/N<sub>1</sub></p>
            <p>Linear relationship</p>
            <p>Pressure/Head (H)</p>
            <p>H<sub>2</sub>/H<sub>1</sub> = (N<sub>2</sub>/N<sub>1</sub>)²</p>
            <p>Square relationship</p>
            <p>Power (P)</p>
            <p>P<sub>2</sub>/P<sub>1</sub> = (N<sub>2</sub>/N<sub>1</sub>)³</p>
            <p>Cubic relationship</p>
            <p><strong>Understanding the Cubic Power Law</strong></p>
            <p>The cubic relationship between power and speed is the key to VSD energy savings. Small speed reductions yield large power reductions because power varies with the  <strong>cube</strong> of speed.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100%:</strong> 100% — 100% — 100% — 0%</li>
              <li><strong>90%:</strong> 90% — 81% — 72.9% — 27.1%</li>
              <li><strong>80%:</strong> 80% — 64% — 51.2% — 48.8%</li>
              <li><strong>70%:</strong> 70% — 49% — 34.3% — 65.7%</li>
              <li><strong>60%:</strong> 60% — 36% — 21.6% — 78.4%</li>
              <li><strong>50%:</strong> 50% — 25% — 12.5% — 87.5%</li>
            </ul>
            <p><strong>Why VSDs Beat Throttling</strong></p>
            <p>Traditional flow control uses dampers (fans) or throttle valves (pumps) to restrict flow while the motor runs at full speed. This wastes energy as the motor does work that is immediately dissipated as turbulence and noise. A VSD reduces motor speed to match demand, exploiting the cubic power relationship to dramatically cut energy consumption.</p>
            <p><strong>When Affinity Laws Apply</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Centrifugal fans and pumps</li>
              <li>Systems with variable flow demand</li>
              <li>Friction-dominated systems</li>
              <li>Geometrically similar operation</li>
            </ul>
            <p><strong>Limitations to Consider</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Systems with significant static head</li>
              <li>Positive displacement machines</li>
              <li>Very low speed operation (&lt;20%)</li>
              <li>Minimum pressure requirements</li>
            </ul>
            <p><strong>Remember:</strong> The affinity laws assume the system curve scales with the square of flow. Systems with static head (pumping to height) have a minimum pressure requirement that must be maintained regardless of flow rate.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Energy Savings Calculations: Fixed vs Variable Speed">
            <p>Calculating energy savings requires understanding the load profile - how demand varies over time. Fixed speed systems consume constant power regardless of demand, while variable speed systems reduce power consumption at partial loads.</p>
            <p><strong>Energy Calculation Methodology</strong></p>
            <p>Establish load profile: hours at each load percentage</p>
            <p>Calculate fixed speed energy: Full power × Total running hours</p>
            <p>Calculate VSD energy: Sum of (Power at each load × Hours at that load)</p>
            <p>Energy saving = Fixed speed energy - VSD energy</p>
            <p><strong>Typical HVAC Load Profile Example</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100% load:</strong> 500 — 10% — 100% — 100%</li>
              <li><strong>80% load:</strong> 1,500 — 30% — 51.2% — 100%</li>
              <li><strong>60% load:</strong> 2,000 — 40% — 21.6% — 100%</li>
              <li><strong>40% load:</strong> 1,000 — 20% — 6.4% — 100%</li>
              <li><strong>Total:</strong> 5,000 — 100% — Weighted avg: 35% — 100%</li>
            </ul>
            <p>This profile shows 65% energy saving potential - typical for variable air volume systems</p>
            <p><strong>Worked Example: AHU Supply Fan</strong></p>
            <p>Motor power: 15 kW</p>
            <p>Annual running hours: 5,000</p>
            <p>Electricity cost: £0.18/kWh</p>
            <p>Fixed speed annual energy:</p>
            <p>E<sub>fixed</sub> = 15 kW × 5,000 h = 75,000 kWh</p>
            <p>Cost = 75,000 × £0.18 = <strong>£13,500/year</strong></p>
            <p>VSD annual energy (using profile above):</p>
            <p>E<sub>VSD</sub> = 15 × [(500×1.0) + (1500×0.512) + (2000×0.216) + (1000×0.064)]</p>
            <p>E<sub>VSD</sub> = 15 × [500 + 768 + 432 + 64] = 15 × 1,764 = 26,460 kWh</p>
            <p>Cost = 26,460 × £0.18 = <strong>£4,763/year</strong></p>
            <p>Annual saving = £13,500 - £4,763 = <strong>£8,737/year (65%)</strong></p>
            <p><strong>Important: VSD Losses</strong></p>
            <p>VSDs are not 100% efficient. Typical VSD efficiency is 95-98% at full load but drops at partial loads. Include VSD losses in calculations by applying approximately 3-5% additional loss factor. Modern drives with active front ends have better partial load efficiency.</p>
            <p><strong>Design tip:</strong> Obtain actual load profile data from BMS trending where possible. If unavailable, use standardised profiles from CIBSE Guide F or manufacturer data. Conservative assumptions lead to more reliable payback predictions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Simple Payback Analysis">
            <p>Simple payback period is the time required for energy savings to equal the initial investment. It's a quick screening tool for comparing projects but has limitations as it ignores benefits beyond the payback period and the time value of money.</p>
            <p><strong>Simple Payback Formula</strong></p>
            <p>Payback Period = Capital Cost / Net Annual Savings</p>
            <p><strong>Capital Cost</strong> = Equipment + Installation + Commissioning</p>
            <p><strong>Net Annual Savings</strong> = Energy savings - Additional maintenance</p>
            <p><strong>Typical VSD Payback Periods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>VAV AHU fans:</strong> &gt;4,000 — High (40-100%) — 1-2 years</li>
              <li><strong>CHW pumps:</strong> &gt;3,000 — Medium-High — 2-3 years</li>
              <li><strong>Cooling tower fans:</strong> &gt;2,500 — Medium — 2-4 years</li>
              <li><strong>Extract fans:</strong> &gt;3,500 — Low-Medium — 3-5 years</li>
              <li><strong>Constant volume fans:</strong> Any — None — &gt;10 years</li>
            </ul>
            <p><strong>Worked Example: Pump VSD Installation</strong></p>
            <p>Capital costs:</p>
            <p>15 kW VSD supply and install: £3,800</p>
            <p>Electrical modifications: £850</p>
            <p>Commissioning and setup: £450</p>
            <p>Total capital cost: <strong>£5,100</strong></p>
            <p>Annual savings:</p>
            <p>Energy saving: 32,000 kWh × £0.18 = £5,760</p>
            <p>Additional filter changes (cleaner air): -£120</p>
            <p>VSD maintenance allowance: -£150</p>
            <p>Net annual saving: <strong>£5,490</strong></p>
            <p>Simple payback = £5,100 / £5,490 = <strong>0.93 years (11 months)</strong></p>
            <p><strong>Factors Improving Payback</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>High running hours (&gt;4,000/year)</li>
              <li>High electricity costs</li>
              <li>Significant load variation</li>
              <li>Current throttling control</li>
              <li>Larger motor sizes (economies of scale)</li>
            </ul>
            <p><strong>Factors Lengthening Payback</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Low running hours</li>
              <li>Constant load operation</li>
              <li>Small motor sizes (&lt;5 kW)</li>
              <li>Complex installation requirements</li>
              <li>Already efficient control method</li>
            </ul>
            <p><strong>Industry guidance:</strong> Projects with simple payback under 3 years are generally considered attractive. Under 2 years is excellent. Over 5 years may struggle to gain approval without additional justification (carbon targets, reliability, noise reduction).</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="NPV Calculations, Carbon Savings and Part L Compliance">
            <p>Net Present Value (NPV) provides a more sophisticated investment analysis by accounting for the time value of money. Combined with carbon savings calculations and regulatory compliance (Part L), this forms a comprehensive business case for energy efficiency investments.</p>
            <p><strong>Net Present Value Formula</strong></p>
            <p>NPV = Σ (Annual Savings / (1 + r)<sup>n</sup>) - Capital Cost</p>
            <p>Or using present value factor: NPV = (Annual Savings × PV Factor) - Capital Cost</p>
            <p><strong>r</strong> = Discount rate (typically 6-10% for commercial projects)</p>
            <p><strong>n</strong> = Year number (1, 2, 3... to equipment lifespan)</p>
            <p><strong>Present Value Factors (Cumulative)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>5:</strong> 4.21 — 3.99 — 3.79 — 3.60</li>
              <li><strong>10:</strong> 7.36 — 6.71 — 6.14 — 5.65</li>
              <li><strong>15:</strong> 9.71 — 8.56 — 7.61 — 6.81</li>
              <li><strong>20:</strong> 11.47 — 9.82 — 8.51 — 7.47</li>
            </ul>
            <p>Multiply annual savings by factor to get present value of all future savings</p>
            <p><strong>NPV Worked Example</strong></p>
            <p>VSD installation cost: £5,100</p>
            <p>Annual energy saving: £5,490</p>
            <p>Equipment lifespan: 15 years</p>
            <p>Discount rate: 8%</p>
            <p>PV factor (15 years, 8%) = 8.56</p>
            <p>NPV = (£5,490 × 8.56) - £5,100</p>
            <p>NPV = £46,994 - £5,100 = <strong>£41,894</strong></p>
            <p>Positive NPV indicates excellent investment - proceed!</p>
            <p><strong>Carbon Savings Calculations</strong></p>
            <p>Carbon savings add environmental value to energy efficiency projects. The UK grid carbon factor represents the CO₂ emissions per unit of electricity consumed.</p>
            <p>Carbon Saving (kgCO₂) = Energy Saved (kWh) × Grid Carbon Factor (kgCO₂/kWh)</p>
            <p>UK Grid Factor 2024: approximately 0.233 kgCO₂/kWh (declining as renewable share increases)</p>
            <p>Example calculation:</p>
            <p>Energy saved: 48,540 kWh/year</p>
            <p>Carbon factor: 0.233 kgCO₂/kWh</p>
            <p>Carbon saving = 48,540 × 0.233 = <strong>11,310 kgCO₂ (11.3 tonnes/year)</strong></p>
            <p>If carbon priced at £50/tonne:</p>
            <p>Additional value = 11.3 × £50 = <strong>£565/year</strong></p>
            <p><strong>Part L Building Regulations</strong></p>
            <p>Part L of the Building Regulations sets minimum energy efficiency standards for building services, including motors and their control systems.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Motor efficiency class:</strong> Minimum IE3 Premium (or IE2 with VSD)</li>
              <li><strong>Variable speed control:</strong> Required for fans/pumps &gt;1.1 kW in variable demand systems</li>
              <li><strong>Building log book:</strong> Motor ratings and efficiency classes must be documented</li>
              <li><strong>Metering:</strong> Sub-metering required for motors &gt;15 kW</li>
              <li><strong>Commissioning:</strong> Motor systems must be commissioned to design efficiency</li>
            </ul>
            <p><strong>Motor Efficiency Classes (IEC 60034-30-1)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IE1:</strong> Standard — ~86.5% — Below minimum - not permitted</li>
              <li><strong>IE2:</strong> High — ~89.0% — Only with VSD</li>
              <li><strong>IE3:</strong> Premium — ~91.0% — Minimum standard</li>
              <li><strong>IE4:</strong> Super Premium — ~93.0% — Best practice</li>
              <li><strong>IE5:</strong> Ultra Premium — ~94.5% — Future standard</li>
            </ul>
            <p><strong>ErP Directive Requirements</strong></p>
            <p>The Energy-related Products (ErP) Directive sets minimum efficiency requirements for motors placed on the EU/UK market. From July 2023, motors 75-200 kW must meet IE4. Motors 0.12-0.75 kW must meet IE2. Check current requirements for your application as regulations continue to tighten.</p>
            <p><strong>Compliance tip:</strong> Document motor selections at design stage showing IE class, power rating, and justification for any exemptions. This evidence is required for Building Control sign-off under Part L.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Complete VSD Business Case</strong>
            </p>
            <p><strong>Scenario:</strong> A 22 kW chilled water pump operates 4,500 hours/year with average 65% load. Evaluate VSD installation.</p>
            <p>Current operation (fixed speed with throttle valve):</p>
            <p>Energy = 22 kW × 4,500 h = 99,000 kWh/year</p>
            <p>Cost @ £0.18/kWh = <strong>£17,820/year</strong></p>
            <p>With VSD (average 65% flow = 65% speed):</p>
            <p>Power = 0.65³ × 22 = 0.274 × 22 = 6.04 kW average</p>
            <p>Energy = 6.04 × 4,500 = 27,180 kWh/year</p>
            <p>Cost = <strong>£4,892/year</strong></p>
            <p>Annual saving = £17,820 - £4,892 = <strong>£12,928 (72%)</strong></p>
            <p>Investment analysis:</p>
            <p>VSD cost installed: £6,200</p>
            <p>Simple payback = £6,200 / £12,928 = <strong>0.48 years (6 months)</strong></p>
            <p>NPV (15 years, 8%): (£12,928 × 8.56) - £6,200 = <strong>£104,464</strong></p>
            <p>Carbon saving:</p>
            <p>Energy saved = 99,000 - 27,180 = 71,820 kWh</p>
            <p>CO₂ saved = 71,820 × 0.233 = <strong>16,734 kgCO₂ (16.7 tonnes/year)</strong></p>
            <p>
              <strong>Example 2: IE3 vs IE4 Motor Comparison</strong>
            </p>
            <p><strong>Scenario:</strong> Specify a 15 kW motor for 6,000 hours/year continuous duty. Compare IE3 (91.2% efficiency) vs IE4 (93.3% efficiency).</p>
            <p>IE3 motor (91.2% efficient):</p>
            <p>Input power = 15 / 0.912 = 16.45 kW</p>
            <p>Annual energy = 16.45 × 6,000 = 98,700 kWh</p>
            <p>Annual cost = 98,700 × £0.18 = <strong>£17,766</strong></p>
            <p>IE4 motor (93.3% efficient):</p>
            <p>Input power = 15 / 0.933 = 16.08 kW</p>
            <p>Annual energy = 16.08 × 6,000 = 96,480 kWh</p>
            <p>Annual cost = 96,480 × £0.18 = <strong>£17,366</strong></p>
            <p>Annual saving = £17,766 - £17,366 = <strong>£400/year</strong></p>
            <p>Premium for IE4: approximately £350</p>
            <p>Simple payback = £350 / £400 = <strong>0.88 years</strong></p>
            <p>Over 20 year motor life: £400 × 20 = <strong>£8,000 saving</strong></p>
            <p>
              <strong>Example 3: Fan Speed Reduction Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> A supply fan delivers 5.0 m³/s at 750 Pa, consuming 5.5 kW. The system requires only 4.0 m³/s. Calculate the new operating point.</p>
            <p>Required flow reduction:</p>
            <p>Flow ratio = 4.0 / 5.0 = 0.80 (80%)</p>
            <p>Apply affinity laws:</p>
            <p>New speed = 0.80 × original speed (N₂ = 0.8N₁)</p>
            <p>New pressure = 0.80² × 750 = 0.64 × 750 = <strong>480 Pa</strong></p>
            <p>New power = 0.80³ × 5.5 = 0.512 × 5.5 = <strong>2.82 kW</strong></p>
            <p>Power saving = 5.5 - 2.82 = <strong>2.68 kW (48.7%)</strong></p>
            <p>Verify system pressure requirement:</p>
            <p>If system needs 480 Pa at 4.0 m³/s, operation is satisfactory.</p>
            <p>If higher pressure needed (e.g., filter dirty), speed must increase.</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Q₂/Q₁ = N₂/N₁</strong> - Flow proportional to speed</li>
              <li><strong>H₂/H₁ = (N₂/N₁)²</strong> - Pressure proportional to speed squared</li>
              <li><strong>P₂/P₁ = (N₂/N₁)³</strong> - Power proportional to speed cubed</li>
              <li><strong>Simple Payback = Capital Cost / Annual Savings</strong></li>
              <li><strong>NPV = (Savings × PV Factor) - Capital</strong></li>
              <li><strong>CO₂ = kWh × Grid Factor</strong></li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>50% speed = 12.5% power (0.5³)</li>
              <li>70% speed = 34% power (0.7³)</li>
              <li>80% speed = 51% power (0.8³)</li>
              <li>UK grid carbon: ~0.233 kgCO₂/kWh</li>
              <li>Good payback: &lt;3 years</li>
              <li>Minimum motor class: IE3</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring static head</strong> - Affinity laws only apply to friction losses</li>
                <li><strong>Optimistic load profiles</strong> - Use measured data where available</li>
                <li><strong>Forgetting VSD losses</strong> - Add 3-5% for drive inefficiency</li>
                <li><strong>NPV without inflation</strong> - Energy costs typically rise over time</li>
                <li><strong>Ignoring minimum speed limits</strong> - Motors need minimum cooling airflow</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Motor protection
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Installation and commissioning
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section4_5;
