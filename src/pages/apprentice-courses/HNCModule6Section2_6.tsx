/**
 * Module 6 · Section 2 · Subsection 6 — CHP and District Energy
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Combined heat and power systems, district heating networks, energy centres, and system optimisation
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

const TITLE = 'CHP and District Energy - HNC Module 6 Section 2.6';
const DESCRIPTION =
  'Master combined heat and power systems, district heating networks, energy centres, and system optimisation for building services engineering including prime movers, heat recovery, and baseload operation strategies.';

const quickCheckQuestions = [
  {
    id: 'chp-definition',
    question:
      'What is the primary advantage of combined heat and power over separate heat and power generation?',
    options: [
      'Higher overall efficiency by utilising waste heat',
      'Credit for relevant previous learning and experience',
      'Addition, subtraction, multiplication, division',
      'Electronic equipment and surge protective devices',
    ],
    correctIndex: 0,
    explanation:
      'CHP achieves overall efficiencies of 70-90% by recovering waste heat that would otherwise be rejected to atmosphere in conventional power generation, where typical electrical efficiency is only 35-45%.',
  },
  {
    id: 'heat-to-power',
    question:
      'A CHP unit with a heat-to-power ratio of 1.5:1 produces 200 kWe. What is the thermal output?',
    options: [
      '133 kW',
      '200 kW',
      '500 kW',
      '300 kW',
    ],
    correctIndex: 3,
    explanation:
      'Heat-to-power ratio = Heat output / Electrical output. With ratio 1.5:1 and 200 kWe electrical: Heat = 1.5 × 200 = 300 kWth.',
  },
  {
    id: 'district-heating',
    question:
      'What is the primary function of a heat interface unit (HIU) in a district heating system?',
    options: [
      "Transfer heat from the district network to the building's heating system",
      "Into the outer mid-thigh through clothing if necessary",
      "Circuit has adequate capacity and existing protection is suitable",
      "Review every wrong answer, understand the mistake, and revise that topic before trying again",
    ],
    correctIndex: 0,
    explanation:
      "A heat interface unit (HIU) acts as the interface between the district heating primary network and the building's secondary heating and hot water systems, typically using plate heat exchangers for hydraulic separation.",
  },
  {
    id: 'baseload-operation',
    question: 'Why is CHP typically sized for baseload operation rather than peak demand?',
    options: [
      'To maximise running hours and economic return',
      'It cannot generate enough power for peak loads',
      'Regulations prohibit peak operation',
      'It requires constant fuel supply',
    ],
    correctIndex: 0,
    explanation:
      'Sizing CHP for baseload (continuous minimum demand) maximises annual running hours, typically 4,000-6,000+ hours, which is essential for economic viability. Peak-sized units would have excessive idle time and poor payback.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A gas engine CHP unit has an electrical efficiency of 38% and thermal efficiency of 50%. What is the overall efficiency?',
    options: [
      '38%',
      '88%',
      '50%',
      '44%',
    ],
    correctAnswer: 1,
    explanation:
      'Overall CHP efficiency = Electrical efficiency + Thermal efficiency = 38% + 50% = 88%. This demonstrates the significant efficiency gain compared to separate generation.',
  },
  {
    id: 2,
    question:
      'Which prime mover technology is most suitable for a CHP system requiring frequent start-stop operation?',
    options: [
      'Combined cycle',
      'Steam turbine',
      'Reciprocating gas engine',
      'Gas turbine',
    ],
    correctAnswer: 2,
    explanation:
      'Reciprocating gas engines have excellent part-load efficiency and can handle frequent start-stop cycles, typically reaching full output within 2-5 minutes. Gas turbines prefer continuous operation and take longer to reach operating temperature.',
  },
  {
    id: 3,
    question:
      'A district heating network operates at 90°C flow and 60°C return. What is the temperature differential (ΔT)?',
    options: [
      '90°C',
      '60°C',
      '150 K',
      '30 K',
    ],
    correctAnswer: 3,
    explanation:
      'Temperature differential (ΔT) = Flow temperature - Return temperature = 90°C - 60°C = 30 K (or 30°C). A higher ΔT allows more heat to be transferred per unit of water flow.',
  },
  {
    id: 4,
    question: 'What is the typical heat-to-power ratio for a gas engine CHP unit?',
    options: [
      '1.0-1.5:1',
      '0.5:1',
      '3:1',
      '5:1',
    ],
    correctAnswer: 0,
    explanation:
      'Gas engine CHP units typically have heat-to-power ratios of 1.0-1.5:1, meaning they produce slightly more heat than electricity. This suits buildings with moderate heating demands relative to electrical loads.',
  },
  {
    id: 5,
    question:
      'A CHP unit consumes 500 kW of gas and produces 180 kWe. Calculate the electrical efficiency.',
    options: [
      '28%',
      '36%',
      '64%',
      '45%',
    ],
    correctAnswer: 1,
    explanation:
      'Electrical efficiency = (Electrical output / Fuel input) × 100 = (180 / 500) × 100 = 36%. This is typical for a medium-sized gas engine CHP.',
  },
  {
    id: 6,
    question: 'In a district heating system, what is the purpose of expansion vessels?',
    options: [
      'Plate heat exchangers, control valves, and energy meters',
      'To decouple heat production from demand, enabling longer CHP running hours',
      'To accommodate thermal expansion of water and maintain system pressure',
      'Reduced pumping energy while maintaining heat delivery',
    ],
    correctAnswer: 2,
    explanation:
      'Expansion vessels accommodate the increased volume of water as it heats up (thermal expansion) and help maintain stable system pressure. Without them, pressure would rise dangerously or relief valves would discharge.',
  },
  {
    id: 7,
    question:
      'What advantage does a gas turbine CHP have over a reciprocating engine for large-scale applications?',
    options: [
      'Plate heat exchangers, control valves, and energy meters',
      'Reduced pumping energy while maintaining heat delivery',
      'The number of poles and rotational speed',
      'Higher grade exhaust heat (typically 450-550°C)',
    ],
    correctAnswer: 3,
    explanation:
      'Gas turbines produce higher grade exhaust heat (450-550°C vs 80-120°C jacket water), making them suitable for steam generation and absorption chillers. However, they have poorer part-load efficiency than gas engines.',
  },
  {
    id: 8,
    question: 'A heat interface unit typically includes which components?',
    options: [
      'Plate heat exchangers, control valves, and energy meters',
      'Reduced pumping energy while maintaining heat delivery',
      'To accommodate thermal expansion of water and maintain system pressure',
      'The number of poles and rotational speed',
    ],
    correctAnswer: 0,
    explanation:
      'A typical HIU contains plate heat exchangers (for space heating and DHW), motorised control valves, circulation pumps, differential pressure control, heat meters for billing, and safety devices.',
  },
  {
    id: 9,
    question:
      'For economic viability, what minimum annual running hours are typically required for CHP?',
    options: [
      '1,000-2,000 hours',
      '4,000-5,000+ hours',
      '2,000-3,000 hours',
      '8,000+ hours',
    ],
    correctAnswer: 1,
    explanation:
      'CHP typically requires 4,000-5,000+ annual running hours for economic viability. This represents approximately 45-60% capacity factor. Hospitals and hotels often exceed this; schools may struggle to achieve it.',
  },
  {
    id: 10,
    question: 'What is the purpose of a thermal store in a CHP installation?',
    options: [
      'To accommodate thermal expansion of water and maintain system pressure',
      'Plate heat exchangers, control valves, and energy meters',
      'To decouple heat production from demand, enabling longer CHP running hours',
      'Reduced pumping energy while maintaining heat delivery',
    ],
    correctAnswer: 2,
    explanation:
      'Thermal stores buffer between CHP heat production and building demand. This allows CHP to run continuously at optimal load while the store absorbs excess heat, which is later used when demand exceeds CHP output.',
  },
  {
    id: 11,
    question: 'In a three-phase synchronous generator, what determines the output frequency?',
    options: [
      'Physiological and safety needs (levels 1 and 2)',
      'You are significantly more likely to achieve them',
      '1 lux on the centre line of travel',
      'The number of poles and rotational speed',
    ],
    correctAnswer: 3,
    explanation:
      'Output frequency f = (n × p) / 120, where n is speed in RPM and p is number of poles. For 50 Hz output, a 4-pole generator runs at 1,500 RPM, or a 2-pole at 3,000 RPM.',
  },
  {
    id: 12,
    question: 'What is the primary benefit of variable flow in district heating networks?',
    options: [
      'Reduced pumping energy while maintaining heat delivery',
      'To accommodate thermal expansion of water and maintain system pressure',
      'Higher grade exhaust heat (typically 450-550°C)',
      'Plate heat exchangers, control valves, and energy meters',
    ],
    correctAnswer: 0,
    explanation:
      'Variable flow systems modulate pump speed to match demand, significantly reducing pumping energy (pump power varies with cube of flow). This can reduce pumping costs by 50-70% compared to constant flow systems.',
  },
];

const faqs = [
  {
    question: 'How do you size a CHP system for a building?',
    answer:
      'CHP should be sized to meet the baseload heat demand - the minimum continuous thermal requirement - not the peak. Analyse half-hourly heat demand data over a full year to identify this baseload. The CHP should run for at least 4,000-5,000 hours annually to be economically viable. Typically, CHP is sized to meet 30-50% of peak heat demand but 70-80% of annual heat consumption. The remaining peak demand is met by conventional boilers.',
  },
  {
    question: 'What are the key differences between gas engine and gas turbine CHP?',
    answer:
      'Gas engines (reciprocating) offer higher electrical efficiency (35-45%), better part-load performance, lower grade waste heat (80-120°C jacket, 400°C exhaust), and suit smaller applications (50 kWe to 5 MWe). Gas turbines provide higher grade exhaust heat (450-550°C) ideal for steam generation, suit larger installations (500 kWe to 50+ MWe), but have poorer part-load efficiency and prefer continuous operation. Gas engines are more common in UK building services applications.',
  },
  {
    question: 'What is the difference between a 3rd and 4th generation district heating network?',
    answer:
      '3rd generation networks (current UK standard) operate at 70-90°C flow, 40-60°C return using pressurised water. 4th generation (emerging) uses lower temperatures (50-60°C flow, 25-35°C return), enabling use of low-grade heat sources such as data centres, industrial waste heat, and heat pumps. Lower temperatures reduce heat losses but require buildings with low-temperature heating systems such as underfloor heating.',
  },
  {
    question: 'How does CHP export electricity to the grid?',
    answer:
      'Grid-connected CHP requires a G99 (larger installations) or G98 (smaller) connection agreement with the DNO. The CHP synchronises with the grid (matching voltage, frequency, and phase) before connecting. A protection relay monitors grid conditions and disconnects if abnormalities occur (loss of mains, over/under voltage/frequency). Exported electricity earns revenue through power purchase agreements (PPAs) or deemed export tariffs.',
  },
  {
    question: 'What controls are needed for optimal CHP operation?',
    answer:
      'Effective CHP control requires: thermal demand monitoring to ensure heat can be absorbed; grid synchronisation and protection; thermal store management with charge/discharge logic; cascade control with backup boilers; spark spread monitoring to verify economic benefit (gas price vs electricity value); and load following to match electrical and thermal outputs to demand patterns.',
  },
  {
    question: 'What causes losses in district heating networks?',
    answer:
      'Main losses include: heat loss from distribution pipework (typically 5-15% for modern pre-insulated pipes, higher for older networks); pumping energy (1-3% of thermal energy delivered); standing losses from thermal stores and HIUs; and bypass flow at network extremities. Good design minimises losses through proper insulation specification, achieving high ΔT (reducing flow rates), and optimising network layout to minimise pipe runs.',
  },
];

const HNCModule6Section2_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2 · Subsection 6"
            title="CHP and District Energy"
            description="Combined heat and power systems, district heating networks, energy centres, and system optimisation"
            tone="purple"
          />

          <TLDR
            points={[
              "Combined Heat and Power (CHP) generates electricity locally and recovers the engine waste heat for space heating or DHW — typical electrical efficiency 30–40%, total efficiency 75–90% when heat is fully utilised.",
              "District heating networks (DHN) distribute heat from a central energy centre via insulated pre-insulated pipes to multiple buildings — the carbon case is now driven by heat-pump-led networks (5GDHC, ambient loops), not gas CHP.",
              "CIBSE CP1 (2nd edition, 2020) is the UK Heat Networks Code of Practice — required for Heat Network Investment Project (HNIP) funding and increasingly mandated by local authorities.",
            ]}
          />

          <RegsCallout
            source="CIBSE CP1 (2020) Heat Networks: Code of Practice for the UK"
            clause="Heat networks shall be designed for low return temperatures (typically <40°C from the customer) to maximise condensing-boiler / heat-pump efficiency and to enable 4th generation network performance. The network shall be designed with a connection charge methodology and a heat tariff structure that enables transparent customer billing in compliance with the Heat Network (Metering and Billing) Regulations 2014."
            meaning={
              <>
                CP1 is the UK design standard. Low return temperatures (the single most important design parameter) drive efficient generation. The Heat Networks (Metering and Billing) Regulations 2014 mandate metering of every customer and transparent tariffs — non-compliance is a criminal offence enforced by the Office for Product Safety and Standards (OPSS).
              </>
            }
            cite="Source: CIBSE CP1 (2020) — cibse.org; SI 2014/3120 — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain CHP principles, efficiency gains, and heat-to-power ratios",
              "Compare prime mover technologies: gas engines, gas turbines, and fuel cells",
              "Design district heating networks with appropriate flow and return temperatures",
              "Specify heat interface units and their components",
              "Size CHP for baseload operation and calculate economic viability",
              "Integrate thermal stores and backup plant for system optimisation",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="CHP Fundamentals and Efficiency">
            <p>Combined heat and power (CHP), also known as cogeneration, is the simultaneous generation of electricity and useful heat from a single fuel source. By capturing and utilising the heat that would otherwise be wasted in conventional power generation, CHP systems achieve overall efficiencies of 70-90% compared to 35-45% for grid electricity.</p>
            <p><strong>CHP efficiency compared to separate generation:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Conventional power station:</strong> 35-45% electrical efficiency; remaining 55-65% lost as waste heat</li>
              <li><strong>Gas engine CHP:</strong> 35-42% electrical + 45-50% thermal = 80-88% overall</li>
              <li><strong>Gas turbine CHP:</strong> 25-40% electrical + 40-50% thermal = 70-85% overall</li>
              <li><strong>Fuel cell CHP:</strong> 40-60% electrical + 30-40% thermal = 80-90% overall</li>
            </ul>
            <p><strong>Heat-to-Power Ratio</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Gas engine:</strong> 1.0-1.5:1 — 50 kWe - 5 MWe — Buildings, district heating</li>
              <li><strong>Gas turbine:</strong> 1.5-2.5:1 — 500 kWe - 50+ MWe — Large industrial, utilities</li>
              <li><strong>Micro-CHP (Stirling):</strong> 6-10:1 — 1-3 kWe — Domestic, small commercial</li>
              <li><strong>Fuel cell:</strong> 0.5-1.0:1 — 1 kWe - 2 MWe — High electrical demand sites</li>
            </ul>
            <p><strong>Efficiency Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Overall efficiency:</strong> η = (Pelec + Qheat) / Qfuel × 100%</li>
              <li><strong>Electrical efficiency:</strong> ηe = Pelec / Qfuel × 100%</li>
              <li><strong>Thermal efficiency:</strong> ηth = Qheat / Qfuel × 100%</li>
              <li><strong>Example:</strong> 500 kW gas input, 180 kWe electrical, 250 kWth heat</li>
              <li><strong>Overall:</strong> (180 + 250) / 500 × 100 = 86%</li>
            </ul>
            <p><strong>Key principle:</strong> CHP only saves energy when all generated heat is usefully absorbed. Dumping heat via dry coolers negates the efficiency advantage.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Prime Movers and Heat Recovery">
            <p>The prime mover is the engine or turbine that converts fuel energy into mechanical power, which drives the electrical generator. Each technology has distinct characteristics affecting its suitability for different applications.</p>
            <p><strong>Reciprocating Gas Engine</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Spark ignition (natural gas) or compression (dual fuel)</li>
              <li>High electrical efficiency: 35-45%</li>
              <li>Good part-load performance (down to 50%)</li>
              <li>Fast start-up: 2-5 minutes</li>
              <li>Heat recovery: jacket water (80-90°C), exhaust (450°C)</li>
            </ul>
            <p><strong>Gas Turbine</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Combustion turbine driving generator</li>
              <li>Lower electrical efficiency: 25-40%</li>
              <li>Poor part-load efficiency (avoid below 75%)</li>
              <li>Slower start-up: 10-30 minutes</li>
              <li>High grade exhaust heat: 450-550°C for steam</li>
            </ul>
            <p><strong>Heat Recovery Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Jacket water (engine):</strong> 80-95°C — Plate heat exchanger — 25-30%</li>
              <li><strong>Exhaust gas:</strong> 400-550°C — Exhaust heat exchanger — 20-25%</li>
              <li><strong>Lubricating oil:</strong> 70-85°C — Oil cooler heat exchanger — 5-8%</li>
              <li><strong>Intercooler (turbo):</strong> 40-60°C — Low-grade heat recovery — 3-5%</li>
            </ul>
            <p><strong>Electrical Generation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Synchronous generator:</strong> Three-phase alternator producing 400V or 11kV output</li>
              <li><strong>Frequency:</strong> f = (n × p) / 120 where n = RPM, p = poles (typically 1500 RPM, 4-pole for 50 Hz)</li>
              <li><strong>Grid synchronisation:</strong> Voltage, frequency, phase angle must match before paralleling</li>
              <li><strong>Protection:</strong> G99/G98 compliant interface protection relay for grid connection</li>
            </ul>
            <p><strong>Design consideration:</strong> Gas engines suit variable loads and are more common in UK building services. Gas turbines suit large, continuous loads with steam requirements.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="District Heating Networks">
            <p>District heating distributes heat from a central source to multiple buildings via insulated underground pipework. The UK has over 14,000 heat networks serving approximately 480,000 customers, with significant growth anticipated under net zero targets.</p>
            <p><strong>Network Temperature Generations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>3rd Generation (current):</strong> Flow 70-90°C, Return 40-60°C, ΔT 30 K</li>
              <li><strong>4th Generation (emerging):</strong> Flow 50-60°C, Return 25-35°C, ΔT 25 K</li>
              <li><strong>5th Generation (ambient):</strong> Flow 10-25°C with building-level heat pumps</li>
            </ul>
            <p><strong>Network Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pre-insulated pipe:</strong> Heat distribution — Steel carrier, PUR insulation, PE casing</li>
              <li><strong>Expansion loops:</strong> Thermal expansion accommodation — U-bends, L-bends, or expansion joints</li>
              <li><strong>Isolation valves:</strong> Section isolation for maintenance — Ball or butterfly valves, typically PN16</li>
              <li><strong>Distribution pumps:</strong> Circulate water through network — Variable speed for flow modulation</li>
              <li><strong>Pressurisation set:</strong> Maintain system pressure — Typically 3-6 bar depending on height</li>
            </ul>
            <p><strong>Heat Interface Units (HIUs)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct connection:</strong> Network water enters building system (rare, no hydraulic separation)</li>
              <li><strong>Indirect connection:</strong> Plate heat exchangers provide hydraulic separation (standard approach)</li>
              <li><strong>Space heating:</strong> PHE sized for design load, typically 40-60°C secondary flow</li>
              <li><strong>DHW production:</strong> Instantaneous PHE or storage options, Legionella compliance essential</li>
              <li><strong>Heat metering:</strong> MID-approved meter for billing, typically ultrasonic type</li>
              <li><strong>DPVC:</strong> Differential pressure control valve maintains stable ΔP across HIU</li>
            </ul>
            <p><strong>Network efficiency:</strong> Achieving high ΔT (30 K+) is crucial - higher temperature differential means lower flow rates and reduced pumping energy.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Energy Centre Design and Optimisation">
            <p>The energy centre houses all heat generation plant and is the heart of a district heating system. Design must balance CHP baseload operation, peak load coverage from boilers, and thermal storage to maximise efficiency and economic return.</p>
            <p><strong>CHP Sizing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Size for baseload demand</li>
              <li>Target 4,000-6,000+ hours/year</li>
              <li>Typically 30-50% of peak load</li>
              <li>Meet 70-80% annual demand</li>
            </ul>
            <p><strong>Backup Boilers</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cover peak loads above CHP</li>
              <li>N+1 redundancy typical</li>
              <li>Gas-fired condensing</li>
              <li>Cascade control with CHP</li>
            </ul>
            <p><strong>Thermal Store</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Buffer heat production/demand</li>
              <li>Enable continuous CHP run</li>
              <li>Typically 2-6 hours capacity</li>
              <li>Stratified tank design</li>
            </ul>
            <p><strong>Spark Spread Analysis</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Spark spread:</strong> Electricity price - (Gas price / ηe) — 15p - (3p / 0.38) = 7.1p/kWh</li>
              <li><strong>Heat credit:</strong> Avoided boiler gas × ηboiler — 3p × 0.90 = 2.7p/kWh saved</li>
              <li><strong>Operating margin:</strong> Spark spread + heat credit - costs — Must exceed maintenance cost</li>
              <li><strong>Break-even hours:</strong> Capital cost / annual saving — Target payback 5-7 years</li>
            </ul>
            <p><strong>Control Strategy Hierarchy</strong></p>
            <p><strong>1. Heat demand signal:</strong> Network return temperature and flow rate determine total heat demand</p>
            <p><strong>2. CHP priority:</strong> Run CHP at optimal load when spark spread positive and heat absorbable</p>
            <p><strong>3. Thermal store management:</strong> Charge when CHP output exceeds demand; discharge to extend CHP off-periods</p>
            <p><strong>4. Boiler cascade:</strong> Stage boilers to meet demand above CHP + store capacity</p>
            <p><strong>5. Network pump control:</strong> Variable speed to maintain ΔP at index HIU</p>
            <p><strong>Energy Centre Plant Schedule (Typical 5 MW Peak)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Gas engine CHP:</strong> 500 kWe / 600 kWth — 2 — Lead/lag baseload operation</li>
              <li><strong>Gas boiler:</strong> 2,000 kW — 2 — Peak and backup, N+1</li>
              <li><strong>Thermal store:</strong> 50,000 litres — 1 — ~2 hours at average load</li>
              <li><strong>Distribution pump:</strong> 150 m³/h @ 6 bar — 2 — Variable speed, duty/standby</li>
            </ul>
            <p><strong>Optimisation goal:</strong> Maximise CHP running hours while ensuring all generated heat is utilised - unused heat negates the efficiency benefit.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: CHP Efficiency Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> A gas engine CHP consumes 1,200 kW of natural gas and produces 450 kWe electrical and 550 kWth thermal output. Calculate all efficiencies.</p>
            <p>Given:</p>
            <p>Fuel input (Qfuel) = 1,200 kW</p>
            <p>Electrical output (Pelec) = 450 kW</p>
            <p>Thermal output (Qheat) = 550 kW</p>
            <p>Electrical efficiency:</p>
            <p>ηe = Pelec / Qfuel × 100</p>
            <p>ηe = 450 / 1,200 × 100 = <span>37.5%</span></p>
            <p>Thermal efficiency:</p>
            <p>ηth = Qheat / Qfuel × 100</p>
            <p>ηth = 550 / 1,200 × 100 = <span>45.8%</span></p>
            <p>Overall efficiency:</p>
            <p>ηoverall = (Pelec + Qheat) / Qfuel × 100</p>
            <p>ηoverall = (450 + 550) / 1,200 × 100 =  <span>83.3%</span></p>
            <p>Heat-to-power ratio:</p>
            <p>H:P = 550 / 450 = <span>1.22:1</span></p>
            <p>
              <strong>Example 2: District Heating Flow Rate</strong>
            </p>
            <p><strong>Scenario:</strong> A district heating network must deliver 3 MW of heat. Flow temperature is 85°C, return temperature is 55°C. Calculate the required flow rate.</p>
            <p>Given:</p>
            <p>Heat load (Q) = 3,000 kW</p>
            <p>Flow temp (Tf) = 85°C</p>
            <p>Return temp (Tr) = 55°C</p>
            <p>ΔT = 85 - 55 = 30 K</p>
            <p>Specific heat (Cp) = 4.18 kJ/kg·K</p>
            <p>Heat transfer equation:</p>
            <p>Q = ṁ × Cp × ΔT</p>
            <p>ṁ = Q / (Cp × ΔT)</p>
            <p>ṁ = 3,000 / (4.18 × 30)</p>
            <p>ṁ = 3,000 / 125.4 = <span>23.9 kg/s</span></p>
            <p>Volume flow rate:</p>
            <p>V̇ = 23.9 / 1,000 × 3,600 = <span>86 m³/h</span></p>
            <p>
              <strong>Example 3: CHP Economic Analysis (Spark Spread)</strong>
            </p>
            <p><strong>Scenario:</strong> Evaluate CHP viability with electricity at 18p/kWh, gas at 4p/kWh, electrical efficiency 38%, and CHP output of 500 kWe.</p>
            <p>Step 1: Calculate gas consumption</p>
            <p>Gas input = 500 kWe / 0.38 = 1,316 kW</p>
            <p>Step 2: Calculate spark spread</p>
            <p>Cost of gas per kWh electrical:</p>
            <p>= Gas price / ηe = 4p / 0.38 = 10.5p/kWh</p>
            <p>Spark spread = Electricity price - gas cost per kWhe</p>
            <p>= 18p - 10.5p = <span>7.5p/kWh positive</span></p>
            <p>Step 3: Annual electrical savings (5,000 hrs)</p>
            <p>= 500 kWe × 5,000 hrs × 7.5p/kWh</p>
            <p>= <span>£187,500/year electrical benefit</span></p>
            <p>Step 4: Add heat credit (600 kWth at 90% boiler efficiency)</p>
            <p>Avoided boiler gas = 600 / 0.90 = 667 kW</p>
            <p>Heat credit = 667 × 5,000 × 4p =  <span>£133,400/year</span></p>
            <p>Total annual benefit:</p>
            <p><span>£320,900/year (before maintenance)</span></p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>CHP Feasibility Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Establish baseload heat demand from metered data or heat loss calculations</li>
              <li>Confirm 4,000+ annual running hours are achievable</li>
              <li>Verify spark spread is positive (typically 3p/kWh minimum margin)</li>
              <li>Check gas and electrical connection capacity</li>
              <li>Assess space requirements for plant room and acoustic treatment</li>
              <li>Consider grid export potential and G99/G98 connection requirements</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Gas engine electrical efficiency: <strong>35-42%</strong></li>
              <li>CHP overall efficiency target: <strong>80%+</strong></li>
              <li>Minimum viable running hours: <strong>4,000-5,000/year</strong></li>
              <li>District heating ΔT target: <strong>30 K or higher</strong></li>
              <li>Water specific heat capacity: <strong>4.18 kJ/kg·K</strong></li>
              <li>Typical payback period: <strong>5-7 years</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Oversizing CHP</strong> - leads to excessive cycling and poor economics</li>
                <li><strong>Ignoring summer loads</strong> - CHP needs year-round heat demand</li>
                <li><strong>Poor ΔT design</strong> - low temperature differential increases pumping costs</li>
                <li><strong>Inadequate thermal storage</strong> - forces CHP cycling instead of continuous operation</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Existing gas CHP becomes uneconomic as gas/elec spark spread reverses"
            situation={
              <>
                A 2015-installed 350 kWe gas CHP serving a residential heat network was sized on a 3:1 gas-to-electricity price ratio. By 2024, the spark spread is closer to 1.5:1, gas tariffs include carbon levies, and the CHP is now operating only 1,800 hours/year. The heat network operator is breaching CP1 affordability targets and customers are receiving high bills.
              </>
            }
            whatToDo={
              <>
                Three-stage transition: (1) immediately, run the CHP only at peak winter as a peak-lopping unit; (2) within 12 months, install a high-temperature heat pump (e.g. CO₂ refrigerant cycle to &gt;65°C) to take base load; (3) within 5 years, replace the CHP entirely with heat pump + thermal store. Lower the return temperature (typically the largest CO₂ and cost win) by replacing customer HIUs with low-return-temperature variants and re-balancing the network. Apply for HNIP / Green Heat Network Fund support.
              </>
            }
            whyItMatters={
              <>
                Every UK heat network with gas CHP needs a transition plan. The carbon and economic case has flipped within a decade. The institutional designs being installed today are heat-pump-based, often with ambient-temperature distribution loops (5GDHC) — not the high-temperature gas-CHP networks of 2010–2020.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "CHP electrical efficiency 30–40%, total efficiency 75–90% when heat is fully utilised.",
              "Spark spread (gas vs electricity price ratio) is the headline economic driver — has reversed since 2022.",
              "CIBSE CP1 (2020) is the UK heat network design code.",
              "Low return temperature (<40°C ideal) is the single most important design parameter.",
              "5GDHC (5th generation low-temperature ambient loop with heat pumps at each building) is the new institutional design.",
              "Heat Network (Metering and Billing) Regulations 2014 mandate per-customer metering — criminal offence if breached.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Battery storage systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section3-1")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                BREEAM overview
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section2_6;
