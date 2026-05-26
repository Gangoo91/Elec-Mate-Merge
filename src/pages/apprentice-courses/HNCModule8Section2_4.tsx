/**
 * Module 8 · Section 2 · Subsection 4 — Heat Recovery Systems
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Plate heat exchangers, thermal wheels, run-around coils, efficiency calculations, and control strategies for building ventilation
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

const TITLE = 'Heat Recovery Systems - HNC Module 8 Section 2.4';
const DESCRIPTION =
  'Master heat recovery ventilation systems: plate heat exchangers, thermal wheels (rotary heat exchangers), run-around coils, heat pipe systems, efficiency calculations, frost protection, summer bypass, and Building Regulations Part L requirements for MVHR systems.';

const quickCheckQuestions = [
  {
    id: 'mvhr-principle',
    question:
      'What is the primary function of an MVHR (Mechanical Ventilation with Heat Recovery) system?',
    options: [
      'The raw mains supply, filtered by a basic surge suppressor',
      'To recover heat from exhaust air and transfer it to supply air',
      'Secure connections, adequate size, accessibility, and correct labelling',
      'Work sequence, safety measures, resource requirements, and quality controls',
    ],
    correctIndex: 1,
    explanation:
      'MVHR systems recover heat from warm exhaust air extracted from kitchens, bathrooms and wet rooms, and transfer this heat to the incoming fresh supply air. This reduces heating demand whilst maintaining good ventilation.',
  },
  {
    id: 'plate-exchanger-type',
    question: 'In a cross-flow plate heat exchanger, the air streams:',
    options: [
      'Upload files to a shared cloud storage folder and send the link',
      'UPS engineer present and backup power arrangements',
      'Pass through each other at 90 degrees without mixing',
      'To reduce heat demand and allow lower flow temperatures',
    ],
    correctIndex: 2,
    explanation:
      'In cross-flow plate heat exchangers, the extract and supply air streams pass at 90 degrees to each other, separated by thin plates. Heat transfers through the plates by conduction, but the air streams never mix - maintaining indoor air quality.',
  },
  {
    id: 'thermal-wheel-operation',
    question: 'How does a thermal wheel (rotary heat exchanger) transfer heat?',
    options: [
      'Carbon stored in bio-based materials like timber',
      'To verify that safety management systems are effective',
      'By rotating a matrix between exhaust and supply air streams',
      'Parallel earth paths through bonding or water pipes',
    ],
    correctIndex: 2,
    explanation:
      'A thermal wheel consists of a rotating matrix (typically aluminium honeycomb) that passes alternately through the warm exhaust air stream (absorbing heat) and the cool supply air stream (releasing heat). Rotation speed is typically 10-20 rpm.',
  },
  {
    id: 'run-around-efficiency',
    question:
      'Why do run-around coil systems typically have lower efficiency than plate heat exchangers?',
    options: [
      'The point where escape routes terminate at a place of ultimate safety',
      'Appropriate type, mounting, and cable connections',
      'Heat transfer occurs twice - air to liquid, then liquid to air',
      'At intervals not exceeding 6 months (quarterly recommended for domestic)',
    ],
    correctIndex: 2,
    explanation:
      'Run-around coils require double heat transfer: from exhaust air to the glycol solution, then from the glycol to supply air. Each transfer stage has associated losses, resulting in typical efficiencies of 45-55% compared to 70-90% for plate exchangers.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What minimum heat recovery efficiency does Building Regulations Part L typically require for new dwellings?',
    options: [
      '50%',
      '70%',
      '85%',
      '95%',
    ],
    correctAnswer: 1,
    explanation:
      'Building Regulations Approved Document L requires MVHR systems to achieve a minimum heat recovery efficiency of approximately 70% (varying by specific application) to meet energy efficiency targets. High-performance units can achieve 90%+ efficiency.',
  },
  {
    id: 2,
    question: 'Which type of heat recovery device can transfer both sensible and latent heat?',
    options: [
      'Run-around coil system',
      'Cross-flow plate heat exchanger',
      'Thermal wheel with hygroscopic coating',
      'Counter-flow plate heat exchanger',
    ],
    correctAnswer: 2,
    explanation:
      'Thermal wheels with hygroscopic (moisture-absorbing) coatings can transfer both sensible heat (temperature) and latent heat (moisture) between air streams. This is known as enthalpy recovery and can achieve total heat recovery efficiencies of 75-85%.',
  },
  {
    id: 3,
    question: 'What is the purpose of a summer bypass in an MVHR system?',
    options: [
      'Ability to connect non-adjacent air streams with zero cross-contamination',
      'Supply and extract temperature measurement under steady-state conditions',
      'Transfer of pollutants or odours from exhaust to supply air stream',
      'To prevent unwanted heat recovery when outdoor air is cooler than indoor air',
    ],
    correctAnswer: 3,
    explanation:
      'A summer bypass allows fresh air to enter directly without passing through the heat exchanger. This prevents the system from recovering heat when outdoor air is cooler than indoor air (free cooling opportunity), improving summer comfort and reducing cooling loads.',
  },
  {
    id: 4,
    question:
      'At what outdoor temperature is frost protection typically required for heat recovery systems?',
    options: [
      'Below 0°C to -5°C',
      'Below 5°C',
      'Below 10°C',
      'Below -10°C only',
    ],
    correctAnswer: 0,
    explanation:
      'Frost protection is typically required when outdoor temperatures fall below 0°C to -5°C. At these temperatures, moisture in the warm exhaust air can condense and freeze on the cold surfaces of the heat exchanger, blocking airflow and reducing efficiency.',
  },
  {
    id: 5,
    question: 'Which frost protection method involves temporarily reducing supply airflow?',
    options: [
      'Defrost cycle',
      'Supply air modulation',
      'Recirculation',
      'Pre-heater',
    ],
    correctAnswer: 1,
    explanation:
      'Supply air modulation reduces the supply airflow temporarily, allowing the exhaust air to warm up the heat exchanger surfaces and melt any ice formation. This is energy-efficient but can temporarily reduce ventilation rates during cold periods.',
  },
  {
    id: 6,
    question: 'What is the typical specific fan power (SFP) limit for MVHR systems under Part L?',
    options: [
      '0.5 W/(l/s)',
      '1.5 W/(l/s)',
      '1.0 W/(l/s)',
      '2.0 W/(l/s)',
    ],
    correctAnswer: 2,
    explanation:
      'Building Regulations Part L typically limits specific fan power for MVHR systems to around 1.0 W/(l/s) for domestic installations. This ensures that the energy saved through heat recovery is not offset by excessive fan energy consumption.',
  },
  {
    id: 7,
    question:
      'In a run-around coil system, what fluid is typically used in the connecting pipework?',
    options: [
      'Frequency rating and performance',
      'By danger level and urgency',
      'Below about 50Ω (depending on meter)',
      'Water with glycol antifreeze',
    ],
    correctAnswer: 3,
    explanation:
      'Run-around coil systems use a water/glycol mixture (typically 30-40% glycol) to prevent freezing in cold weather. The glycol also provides corrosion protection for the pipework and coils.',
  },
  {
    id: 8,
    question: 'What is the main advantage of run-around coils over other heat recovery methods?',
    options: [
      'Ability to connect non-adjacent air streams with zero cross-contamination',
      'Transfer of pollutants or odours from exhaust to supply air stream',
      'Supply and extract temperature measurement under steady-state conditions',
      'To prevent unwanted heat recovery when outdoor air is cooler than indoor air',
    ],
    correctAnswer: 0,
    explanation:
      'Run-around coils can connect extract and supply air streams that are physically separated (different parts of a building) with absolutely no possibility of cross-contamination. This makes them ideal for hospitals, laboratories, and industrial applications.',
  },
  {
    id: 9,
    question:
      'Counter-flow plate heat exchangers achieve higher efficiency than cross-flow because:',
    options: [
      'Transfer of pollutants or odours from exhaust to supply air stream',
      'The air streams maintain maximum temperature difference throughout',
      'Ability to connect non-adjacent air streams with zero cross-contamination',
      'To prevent unwanted heat recovery when outdoor air is cooler than indoor air',
    ],
    correctAnswer: 1,
    explanation:
      'In counter-flow arrangement, the hottest exhaust air meets the warmest supply air and the coolest exhaust meets the coldest supply. This maintains a consistent temperature difference throughout the exchanger, enabling theoretical efficiencies approaching 100%.',
  },
  {
    id: 10,
    question: 'Heat pipe heat exchangers operate on which principle?',
    options: [
      'True power divided by apparent power (cos φ)',
      'To operate systems under load to identify early failures',
      'Evaporation and condensation of a working fluid',
      'Converting curved sensor response to linear output',
    ],
    correctAnswer: 2,
    explanation:
      'Heat pipes contain a working fluid that evaporates in the warm exhaust air stream (absorbing latent heat), rises to the supply air section, condenses (releasing heat), and returns by gravity or capillary action. This passive process is highly efficient.',
  },
  {
    id: 11,
    question: 'What commissioning test should verify MVHR heat recovery performance?',
    options: [
      'To prevent unwanted heat recovery when outdoor air is cooler than indoor air',
      'Transfer of pollutants or odours from exhaust to supply air stream',
      'Ability to connect non-adjacent air streams with zero cross-contamination',
      'Supply and extract temperature measurement under steady-state conditions',
    ],
    correctAnswer: 3,
    explanation:
      'Heat recovery efficiency is verified by measuring supply and extract air temperatures at the unit under steady-state conditions. The formula: Efficiency = (T_supply_out - T_supply_in) / (T_extract_in - T_supply_in) x 100%',
  },
  {
    id: 12,
    question: 'What is cross-contamination in the context of heat recovery systems?',
    options: [
      'Transfer of pollutants or odours from exhaust to supply air stream',
      'Supply and extract temperature measurement under steady-state conditions',
      'Evaporation and condensation of a working fluid',
      'To prevent unwanted heat recovery when outdoor air is cooler than indoor air',
    ],
    correctAnswer: 0,
    explanation:
      'Cross-contamination occurs when pollutants, odours, or pathogens from the exhaust air stream leak or transfer into the supply air stream. Plate heat exchangers typically have very low leakage (<1%), while thermal wheels may have 2-5% carryover.',
  },
  {
    id: 13,
    question:
      'For a dwelling with 100 l/s ventilation rate and MVHR at 85% efficiency, approximately how much heating power is saved when outdoor temperature is 0°C and indoor is 21°C?',
    options: [
      '3.0 kW',
      '2.1 kW',
      '4.5 kW',
      '1.0 kW',
    ],
    correctAnswer: 1,
    explanation:
      'Heat saved = Volume flow x Air density x Specific heat x Temperature difference x Efficiency. Q = 0.1 m³/s x 1.2 kg/m³ x 1.0 kJ/kgK x 21K x 0.85 = 2.14 kW. This represents significant heating energy savings.',
  },
  {
    id: 14,
    question: 'Which Building Regulation document covers ventilation requirements including MVHR?',
    options: [
      'Part E - Resistance to sound',
      'Part J - Heat producing appliances',
      'Part F - Ventilation',
      'Part M - Access',
    ],
    correctAnswer: 2,
    explanation:
      'Approved Document F covers ventilation requirements for buildings, including minimum ventilation rates, system types, and commissioning requirements. Part L covers the energy efficiency aspects including heat recovery efficiency requirements.',
  },
];

const faqs = [
  {
    question: 'What is the difference between sensible and total (enthalpy) heat recovery?',
    answer:
      'Sensible heat recovery transfers only temperature (dry heat) between air streams - this is what standard plate heat exchangers achieve. Total or enthalpy heat recovery also transfers moisture (latent heat), recovering additional energy from the humidity in exhaust air. Thermal wheels with hygroscopic coatings and some membrane-based plate exchangers can achieve enthalpy recovery. In humid climates or applications with high moisture loads (swimming pools, commercial kitchens), enthalpy recovery can significantly improve overall efficiency.',
  },
  {
    question: 'How do I size an MVHR system for a dwelling?',
    answer:
      'MVHR sizing starts with calculating the required ventilation rate per Building Regulations Part F - typically based on number of wet rooms (kitchens, bathrooms, utility) with minimum extract rates of 13-30 l/s per room. The supply rate should balance or slightly exceed extract rate. Select a unit that can deliver the required airflow at acceptable pressure and noise levels. Ductwork must be sized for velocities below 3 m/s (ideally 2-2.5 m/s) to minimise noise. Consider boost rates for kitchens (typically 3x background rate).',
  },
  {
    question: 'Why might an MVHR system underperform in practice?',
    answer:
      'Common causes of MVHR underperformance include: poor airtightness allowing uncontrolled air infiltration (bypassing heat recovery); dirty or blocked filters increasing pressure drop; incorrectly balanced supply and extract rates; excessive duct lengths or poor duct installation creating high resistance; inadequate commissioning; summer bypass not functioning correctly; and frost protection activating too frequently. Regular maintenance and proper commissioning are essential.',
  },
  {
    question: 'Can MVHR systems provide cooling as well as heating energy recovery?',
    answer:
      "Yes, in summer when outdoor air is warmer than indoor air, MVHR can recover 'coolth' - the heat exchanger transfers heat from warm incoming air to cooler exhaust air, reducing the temperature of supply air. However, the summer bypass should activate when outdoor temperature is lower than indoor temperature to allow free cooling. Some MVHR units can also integrate with air source heat pumps or cooling coils for active cooling.",
  },
  {
    question: 'What maintenance does an MVHR system require?',
    answer:
      'MVHR maintenance includes: filter replacement every 3-12 months depending on environment (some units have washable filters); annual cleaning of heat exchanger (many are removable and dishwasher-safe); checking and cleaning condensate drains; inspecting ductwork for damage or disconnection; verifying fan operation and airflow rates; checking controls and sensors; and cleaning external grilles and terminals. Most manufacturers recommend professional servicing annually.',
  },
  {
    question: 'How does building airtightness affect MVHR effectiveness?',
    answer:
      'MVHR systems rely on controlled ventilation through the unit to recover heat effectively. In leaky buildings (air permeability &gt;5 m³/h.m² at 50Pa), significant uncontrolled air infiltration bypasses the heat recovery system entirely, reducing its effectiveness and wasting energy. Building Regulations typically require air permeability &lt;5 m³/h.m² for MVHR to be effective, with best practice being &lt;3 m³/h.m². Very airtight Passivhaus buildings (&lt;0.6 ACH at 50Pa) achieve maximum benefit from MVHR.',
  },
];

const HNCModule8Section2_4 = () => {
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
            eyebrow="Module 8 · Section 2 · Subsection 4"
            title="Heat Recovery Systems"
            description="Plate heat exchangers, thermal wheels, run-around coils, efficiency calculations, and control strategies for building ventilation"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Understand MVHR principles and Building Regulations requirements",
              "Compare different heat recovery technologies and their applications",
              "Calculate heat recovery efficiency and energy savings",
              "Specify frost protection and summer bypass strategies",
              "Design and commission heat recovery systems effectively",
              "Maintain MVHR systems for optimal long-term performance",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="MVHR Principles and Building Regulations">
            <p>Mechanical Ventilation with Heat Recovery (MVHR) systems provide controlled ventilation whilst recovering heat from exhaust air. This significantly reduces heating energy demand in well-insulated, airtight buildings - making MVHR essential for meeting modern Building Regulations energy targets.</p>
            <p><strong>How MVHR Works</strong></p>
            <p>Extract Side</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Warm, stale air extracted from wet rooms</li>
              <li>Kitchens: 13-30 l/s continuous</li>
              <li>Bathrooms: 8-15 l/s continuous</li>
              <li>Utility rooms: 8 l/s continuous</li>
              <li>Heat recovered before discharge</li>
            </ul>
            <p>Supply Side</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Fresh outdoor air drawn in</li>
              <li>Filtered to remove pollutants</li>
              <li>Pre-heated by recovered energy</li>
              <li>Supplied to living/bedroom spaces</li>
              <li>Typically 18-20°C delivery temperature</li>
            </ul>
            <p><strong>Building Regulations Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ventilation rate:</strong> Based on wet room count — -</li>
              <li><strong>Heat recovery efficiency:</strong> - — &gt;70% (typical requirement)</li>
              <li><strong>Specific fan power:</strong> - — &lt;1.0 W/(l/s) domestic</li>
              <li><strong>Airtightness:</strong> Required for System 4 — &lt;5 m³/h.m² at 50Pa</li>
              <li><strong>Commissioning:</strong> Airflow measurement required — Performance verification</li>
            </ul>
            <p><strong>Energy Savings Potential</strong></p>
            <p>A well-designed MVHR system recovering 85% of exhaust heat can save 2,000-4,000 kWh/year in a typical UK dwelling - equivalent to £200-400 annually at current energy prices. The system also improves indoor air quality by filtering incoming air and removing moisture, reducing condensation and mould risk.</p>
            <p><strong>Key requirement:</strong> MVHR only works effectively in airtight buildings. Uncontrolled air leakage bypasses the heat recovery system entirely.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Plate Heat Exchangers">
            <p>Plate heat exchangers are the most common heat recovery technology in MVHR systems. They use thin metal or plastic plates to separate the extract and supply air streams, allowing heat transfer by conduction without air mixing.</p>
            <p><strong>Types of Plate Heat Exchangers</strong></p>
            <p>Cross-Flow Exchanger</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Air streams cross at 90 degrees</li>
              <li>Typical efficiency: 50-75%</li>
              <li>Compact, simple construction</li>
              <li>Lower pressure drop</li>
              <li>Common in smaller units</li>
            </ul>
            <p>Counter-Flow Exchanger</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Air streams flow in opposite directions</li>
              <li>Typical efficiency: 75-95%</li>
              <li>Maximum temperature differential maintained</li>
              <li>Higher pressure drop</li>
              <li>Required for high-efficiency systems</li>
            </ul>
            <p><strong>Plate Heat Exchanger Specifications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat recovery efficiency:</strong> 50-75% — 75-95%</li>
              <li><strong>Plate material:</strong> Aluminium or plastic — Aluminium or polystyrene</li>
              <li><strong>Pressure drop:</strong> 50-150 Pa — 100-250 Pa</li>
              <li><strong>Cross-contamination:</strong> &lt;1% (leakage) — &lt;1% (leakage)</li>
              <li><strong>Moisture transfer:</strong> Sensible only (standard) — Enthalpy (membrane types)</li>
              <li><strong>Maintenance:</strong> Washable, annual clean — Washable, annual clean</li>
            </ul>
            <p><strong>Efficiency Calculation</strong></p>
            <p>Heat Recovery Efficiency (η) = (T_supply_out - T_supply_in) / (T_extract_in - T_supply_in) × 100%</p>
            <p>Where:</p>
            <p>T_supply_out = Temperature of supply air leaving exchanger</p>
            <p>T_supply_in = Temperature of outdoor supply air entering</p>
            <p>T_extract_in = Temperature of extract air entering exchanger</p>
            <p>Example: Supply in 0°C, Extract in 21°C, Supply out 17°C</p>
            <p>η = (17 - 0) / (21 - 0) × 100% = <strong>81%</strong></p>
            <p><strong>Selection tip:</strong> Counter-flow exchangers are essential to meet Part L efficiency requirements. Plastic plate exchangers offer better frost resistance than aluminium.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Thermal Wheels and Run-Around Coils">
            <p>Alternative heat recovery technologies offer advantages for specific applications. Thermal wheels provide enthalpy recovery, while run-around coils enable heat recovery between physically separated air streams with zero cross-contamination.</p>
            <p><strong>Thermal Wheels (Rotary Heat Exchangers)</strong></p>
            <p>Operating Principle</p>
            <p>A thermal wheel consists of a rotating matrix (typically aluminium honeycomb structure) that passes alternately through the warm exhaust and cool supply air streams. The matrix absorbs heat from the exhaust air and releases it to the supply air as it rotates.</p>
            <p><strong>Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Enthalpy recovery (sensible + latent)</li>
              <li>75-85% total efficiency achievable</li>
              <li>Self-cleaning action</li>
              <li>Lower frost risk (hygroscopic types)</li>
              <li>Good for humid applications</li>
            </ul>
            <p><strong>Limitations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2-5% cross-contamination (carryover)</li>
              <li>Moving parts require maintenance</li>
              <li>Air streams must be adjacent</li>
              <li>Motor and drive belt wear</li>
              <li>Not suitable for fume extraction</li>
            </ul>
            <p><strong>Run-Around Coils</strong></p>
            <p>System Components</p>
            <p>Run-around coil systems use two finned-tube coils (one in extract, one in supply) connected by pipework carrying a water/glycol solution. A pump circulates the fluid, which absorbs heat from exhaust air and releases it to supply air.</p>
            <p><strong>Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zero cross-contamination</li>
              <li>Air streams can be remote</li>
              <li>Ideal for hospitals, labs</li>
              <li>Easy to retrofit</li>
              <li>Simple control (pump on/off)</li>
            </ul>
            <p><strong>Limitations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lower efficiency (45-55%)</li>
              <li>Double heat transfer loss</li>
              <li>Pump energy consumption</li>
              <li>Pipework and glycol costs</li>
              <li>Freeze protection required</li>
            </ul>
            <p><strong>Heat Recovery Technology Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Counter-flow plate:</strong> 75-95% — &lt;1% — Dwellings, offices</li>
              <li><strong>Cross-flow plate:</strong> 50-75% — &lt;1% — Compact installations</li>
              <li><strong>Thermal wheel:</strong> 75-85% — 2-5% — Swimming pools, humid spaces</li>
              <li><strong>Run-around coils:</strong> 45-55% — 0% — Hospitals, laboratories</li>
              <li><strong>Heat pipes:</strong> 50-70% — 0% — Process exhaust, passive systems</li>
            </ul>
            <p><strong>Heat Pipe Systems</strong></p>
            <p>Heat pipes are sealed tubes containing a working fluid (typically refrigerant) that evaporates in the warm air stream and condenses in the cool air stream. They are completely passive (no moving parts or pumps) and provide zero cross-contamination. Common in industrial exhaust applications where reliability and simplicity are paramount.</p>
            <p><strong>Selection guidance:</strong> Choose plate exchangers for most comfort applications. Use run-around coils where contamination must be avoided. Consider thermal wheels for high-humidity applications requiring moisture recovery.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Efficiency, Control and Frost Protection">
            <p>Effective control strategies are essential to maximise heat recovery benefits whilst protecting equipment and maintaining comfort. This includes frost protection in winter, summer bypass for free cooling, and demand-controlled ventilation.</p>
            <p><strong>Frost Protection Methods</strong></p>
            <p>When outdoor temperatures fall below approximately -5°C, moisture in warm exhaust air can freeze on the cold heat exchanger surfaces, blocking airflow and damaging equipment.</p>
            <p>Pre-Heater</p>
            <p>Electric or LPHW coil heats incoming air to above freezing point before entering exchanger. Simple and effective but uses energy, partially offsetting heat recovery savings. Typically activates below -5°C outdoor temperature.</p>
            <p>Supply Air Modulation</p>
            <p>Temporarily reduces supply airflow, allowing warm exhaust air to defrost the exchanger. Energy-efficient but temporarily reduces ventilation. Often combined with recirculation to maintain air movement within the building.</p>
            <p>Defrost Cycle</p>
            <p>Periodically bypasses heat recovery or reverses airflow to melt ice. Can cause temporary discomfort as cold air enters. Some systems use exhaust air recirculation during defrost periods.</p>
            <p>Earth Tube Pre-Heating</p>
            <p>Outdoor air passes through buried tubes, pre-tempered by ground heat (8-12°C year-round). Passive, zero-energy frost protection but requires significant excavation. Also provides summer pre-cooling benefit.</p>
            <p><strong>Summer Bypass Operation</strong></p>
            <p>When outdoor temperature is lower than indoor temperature, heat recovery is undesirable - it would heat incoming air that is already cooler than required. A summer bypass allows fresh air to enter directly, providing free cooling.</p>
            <p><strong>Bypass Activation Conditions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Outdoor temp &lt; Indoor temp</li>
              <li>No heating demand</li>
              <li>Typically above 12-15°C outdoor</li>
              <li>Hysteresis prevents hunting</li>
            </ul>
            <p><strong>Bypass Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Motorised damper around exchanger</li>
              <li>100% bypass or modulating</li>
              <li>Automatic based on temperature</li>
              <li>Can be manually overridden</li>
            </ul>
            <p><strong>Demand-Controlled Ventilation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CO₂-based:</strong> CO₂ sensor (target 800-1000 ppm) — Offices, schools, meeting rooms</li>
              <li><strong>Humidity-based:</strong> RH sensor (target 40-60%) — Bathrooms, kitchens, wet rooms</li>
              <li><strong>Occupancy-based:</strong> PIR, CO₂, or schedule — Variable occupancy spaces</li>
              <li><strong>Boost mode:</strong> Manual switch or automatic — Cooking, showering events</li>
            </ul>
            <p><strong>Commissioning Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Airflow measurement:</strong> Verify supply and extract rates at each terminal</li>
              <li><strong>Balance check:</strong> Supply within ±10% of extract rate</li>
              <li><strong>Temperature test:</strong> Measure heat recovery efficiency under steady-state</li>
              <li><strong>Filter pressure:</strong> Record clean filter pressure drop baseline</li>
              <li><strong>Controls verification:</strong> Test boost, bypass, frost protection functions</li>
              <li><strong>Noise measurement:</strong> Verify compliance with design criteria</li>
              <li><strong>Documentation:</strong> Record all settings and provide to building owner</li>
            </ul>
            <p><strong>Common Commissioning Issues</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Unbalanced airflow:</strong> Extract exceeding supply creates negative pressure</li>
              <li><strong>Dirty filters:</strong> Pre-commissioning filters left in place</li>
              <li><strong>Duct leakage:</strong> Reducing actual delivered airflow</li>
              <li><strong>Incorrect wiring:</strong> Fans running at wrong speed or direction</li>
              <li><strong>Bypass stuck:</strong> Always open or always closed</li>
            </ul>
            <p><strong>Part L compliance:</strong> Commissioning results must be recorded and submitted as part of Building Regulations compliance evidence. Include measured SFP, heat recovery efficiency, and airflow rates.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Heat Recovery Efficiency Calculation</strong>
            </p>
            <p><strong>Question:</strong> An MVHR unit is tested with outdoor air at -2°C, extract air at 20°C, and supply air leaving the exchanger at 15.5°C. Calculate the heat recovery efficiency.</p>
            <p>Given: T_supply_in = -2°C, T_extract_in = 20°C, T_supply_out = 15.5°C</p>
            <p>Heat Recovery Efficiency Formula:</p>
            <p>η = (T_supply_out - T_supply_in) / (T_extract_in - T_supply_in) × 100%</p>
            <p>Calculation:</p>
            <p>η = (15.5 - (-2)) / (20 - (-2)) × 100%</p>
            <p>η = (15.5 + 2) / (20 + 2) × 100%</p>
            <p>η = 17.5 / 22 × 100%</p>
            <p>η = <strong>79.5%</strong></p>
            <p>This exceeds the Part L minimum of 70% - compliant</p>
            <p>
              <strong>Example 2: Annual Energy Savings Calculation</strong>
            </p>
            <p><strong>Question:</strong> Calculate annual heating energy saved by an MVHR system with 80% efficiency, 50 l/s airflow, operating 8,760 hours/year, average heating season ΔT of 15°C for 5,000 hours.</p>
            <p>Given: η = 80%, Q = 50 l/s = 0.05 m³/s, ΔT = 15°C, t = 5000 hours</p>
            <p>Heat Recovery Power:</p>
            <p>P = Q × ρ × Cp × ΔT × η</p>
            <p>P = 0.05 m³/s × 1.2 kg/m³ × 1.0 kJ/kgK × 15K × 0.80</p>
            <p>P = 0.72 kW recovered heat</p>
            <p>Annual Energy Saved:</p>
            <p>E = P × t = 0.72 kW × 5000 h</p>
            <p>E = <strong>3,600 kWh/year</strong></p>
            <p>At £0.10/kWh gas, annual saving ≈ £360</p>
            <p>Plus reduced boiler wear and improved comfort</p>
            <p>
              <strong>Example 3: Specific Fan Power Calculation</strong>
            </p>
            <p><strong>Question:</strong> An MVHR unit has two fans each consuming 45W to deliver 60 l/s. Calculate the specific fan power and assess Part L compliance.</p>
            <p>Given: Total fan power = 2 × 45W = 90W, Airflow = 60 l/s</p>
            <p>Specific Fan Power Formula:</p>
            <p>SFP = Total Fan Power / Airflow</p>
            <p>Calculation:</p>
            <p>SFP = 90W / 60 l/s</p>
            <p>SFP = <strong>1.5 W/(l/s)</strong></p>
            <p>This exceeds the Part L limit of 1.0 W/(l/s)</p>
            <p>Solutions: Reduce duct resistance, larger ductwork,</p>
            <p>more efficient fans, or lower airflow if compliant</p>
            <p>
              <strong>Example 4: Dwelling MVHR Sizing</strong>
            </p>
            <p><strong>Question:</strong> Size an MVHR system for a 3-bedroom dwelling with 1 kitchen, 2 bathrooms, and 1 utility room. Determine the minimum continuous ventilation rate.</p>
            <p>Part F Ventilation Rates (System 4 - Continuous MVHR):</p>
            <p>Extract Requirements:</p>
            <p>Kitchen: 13 l/s (minimum continuous)</p>
            <p>Bathroom 1: 8 l/s</p>
            <p>Bathroom 2: 8 l/s</p>
            <p>Utility: 8 l/s</p>
            <p>Total Extract = 13 + 8 + 8 + 8 = <strong>37 l/s</strong></p>
            <p>Whole dwelling rate check:</p>
            <p>Minimum = 0.3 l/s per m² floor area</p>
            <p>For 100m² dwelling: 0.3 × 100 = 30 l/s</p>
            <p>Design rate = MAX(37, 30) = <strong>37 l/s continuous</strong></p>
            <p>Boost rates: Kitchen 30 l/s, Bathrooms 15 l/s each</p>
            <p>Select unit capable of 60+ l/s for boost capacity</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heat recovery efficiency:</strong> η = (T_supply_out - T_supply_in) / (T_extract_in - T_supply_in) × 100%</li>
              <li><strong>Recovered heat:</strong> Q = V̇ × ρ × Cp × ΔT × η (where V̇ = volume flow rate)</li>
              <li><strong>Specific fan power:</strong> SFP = Total fan power (W) / Airflow (l/s)</li>
              <li><strong>Air density:</strong> ρ ≈ 1.2 kg/m³ at standard conditions</li>
              <li><strong>Specific heat of air:</strong> Cp ≈ 1.0 kJ/kgK</li>
            </ul>
            <p>
              <strong>Key Design Values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Part L heat recovery efficiency: <strong>&gt;70%</strong></li>
              <li>Part L SFP limit (domestic): <strong>≤1.0 W/(l/s)</strong></li>
              <li>Duct velocity limit (noise): <strong>2-3 m/s</strong></li>
              <li>Airtightness for MVHR: <strong>&lt;5 m³/h.m² at 50Pa</strong></li>
              <li>Frost protection activation: <strong>-5°C to 0°C</strong></li>
              <li>Summer bypass activation: <strong>12-15°C outdoor</strong></li>
            </ul>
            <p>
              <strong>Installation Best Practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Locate MVHR unit centrally to minimise duct runs</li>
              <li>Use rigid ductwork where possible (lower resistance than flexible)</li>
              <li>Insulate all ductwork in unheated spaces</li>
              <li>Seal all duct joints with appropriate tape</li>
              <li>Provide condensate drain with trap</li>
              <li>Ensure filter access for maintenance</li>
              <li>Separate supply and extract terminals by minimum 2m</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Excessive duct lengths:</strong> Increases pressure drop and SFP</li>
                <li><strong>Undersized ductwork:</strong> Causes noise and high resistance</li>
                <li><strong>Poor airtightness:</strong> Renders heat recovery ineffective</li>
                <li><strong>Missing frost protection:</strong> Leads to ice damage in cold spells</li>
                <li><strong>No summer bypass:</strong> Overheating in warm weather</li>
                <li><strong>Inaccessible filters:</strong> Leads to poor maintenance</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Fan selection
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Ductwork design
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section2_4;
