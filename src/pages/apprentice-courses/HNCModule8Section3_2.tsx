/**
 * Module 8 · Section 3 · Subsection 2 — DX Systems
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Direct expansion air conditioning: split systems, multi-split, VRF/VRV technology and electrical requirements
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

const TITLE = 'DX Systems - HNC Module 8 Section 3.2';
const DESCRIPTION =
  'Master direct expansion (DX) air conditioning systems: split systems, multi-split configurations, VRF/VRV technology, 2-pipe and 3-pipe systems, heat recovery, refrigerant pipe sizing and electrical requirements for building services.';

const quickCheckQuestions = [
  {
    id: 'split-components',
    question: 'What are the two main units in a split system air conditioning installation?',
    options: [
      'A primary chiller and a secondary cooling tower',
      'An air handling unit and a fan coil unit',
      'Indoor unit (evaporator) and outdoor unit (condenser/compressor)',
      'A boiler unit and a buffer vessel',
    ],
    correctIndex: 2,
    explanation:
      'A split system comprises an indoor unit containing the evaporator and fan, connected via refrigerant pipework to an outdoor unit housing the compressor and condenser. This separation allows the noisy compressor to be located externally.',
  },
  {
    id: 'vrf-advantage',
    question: 'What is the primary advantage of VRF/VRV systems over conventional split systems?',
    options: [
      'They remove the need for any refrigerant pipework on site',
      'Variable refrigerant flow to multiple indoor units with individual zone control',
      'They run entirely on a single-phase 13A socket supply',
      'They eliminate the need for an outdoor condenser unit',
    ],
    correctIndex: 1,
    explanation:
      'VRF (Variable Refrigerant Flow) systems can modulate refrigerant flow to multiple indoor units independently, providing precise individual zone temperature control and improved energy efficiency through inverter-driven compressors.',
  },
  {
    id: 'three-pipe-system',
    question:
      'What additional capability does a 3-pipe VRF system provide compared to a 2-pipe system?',
    options: [
      'Simultaneous heating and cooling in different zones',
      'Communication protocols (WiFi, Zigbee, Z-Wave) and interference',
      'Efficacy limits, controls and upward light restrictions',
      '0%, 25%, 50%, 75%, and 100% of range',
    ],
    correctIndex: 0,
    explanation:
      '3-pipe VRF systems (heat recovery) can simultaneously heat some zones whilst cooling others, recovering heat from cooling zones to assist heating zones. This provides superior energy efficiency in buildings with diverse thermal loads.',
  },
  {
    id: 'inverter-compressor',
    question: 'Why do VRF systems use inverter-driven compressors?',
    options: [
      'To vary compressor speed and match output to actual demand',
      'EAWR 1989 Regulation 4(2) — "as may be necessary to prevent danger"',
      'To verify quantities, quality and condition against the order',
      'Provides accurate level reference over long distances and around obstacles',
    ],
    correctIndex: 0,
    explanation:
      'Inverter compressors can continuously vary their speed to precisely match the cooling or heating demand, avoiding inefficient on/off cycling, reducing energy consumption by up to 30%, and providing more stable temperature control.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In a split system, where is the expansion device typically located?',
    options: [
      'In the outdoor unit only',
      'At the indoor unit, upstream of the evaporator',
      'In the refrigerant piping midway between units',
      'External to both units in a separate enclosure',
    ],
    correctAnswer: 1,
    explanation:
      'The expansion device (typically a thermostatic expansion valve or electronic expansion valve) is located at the indoor unit, upstream of the evaporator, where it reduces refrigerant pressure and controls superheat.',
  },
  {
    id: 2,
    question:
      'What is the typical maximum refrigerant pipe length for a standard residential split system?',
    options: [
      '50 metres',
      '10 metres',
      '15-25 metres',
      '100 metres',
    ],
    correctAnswer: 2,
    explanation:
      'Standard residential split systems typically allow 15-25 metres maximum pipe length, though this varies by manufacturer. Longer runs require additional refrigerant charge and may affect system performance.',
  },
  {
    id: 3,
    question:
      'What electrical supply is typically required for a 7kW single-phase split system outdoor unit?',
    options: [
      '32A ring final circuit',
      '13A socket outlet',
      'Three-phase supply',
      'Dedicated 20A radial circuit',
    ],
    correctAnswer: 3,
    explanation:
      'A 7kW split system typically draws around 10-12A at full load on 230V, requiring a dedicated 20A radial circuit with appropriate isolation and RCD protection as per BS 7671.',
  },
  {
    id: 4,
    question:
      'In a multi-split system, how many indoor units can typically be connected to one outdoor unit?',
    options: [
      '2-9 units depending on system capacity',
      'Exactly one indoor unit per outdoor unit',
      'Up to 50 units on a single outdoor unit',
      'Only an even number of indoor units',
    ],
    correctAnswer: 0,
    explanation:
      'Multi-split systems typically support 2-9 indoor units per outdoor unit, depending on the outdoor unit capacity and individual indoor unit sizes. The total connected capacity must not exceed the outdoor unit rating.',
  },
  {
    id: 5,
    question: 'What does VRV stand for in air conditioning terminology?',
    options: [
      'Variable Rate Ventilation',
      'Variable Refrigerant Volume',
      'Variable Recovery Ventilation',
      'Volumetric Refrigerant Valve',
    ],
    correctAnswer: 1,
    explanation:
      "VRV (Variable Refrigerant Volume) is Daikin's trademarked name for their variable refrigerant flow technology. VRF (Variable Refrigerant Flow) is the generic industry term for the same technology.",
  },
  {
    id: 6,
    question: 'What is the purpose of an oil separator in a VRF system?',
    options: [
      'To remove moisture from the refrigerant circuit',
      'To filter debris from the condensate drain',
      'To separate and return compressor oil to prevent accumulation in heat exchangers',
      'To split the refrigerant flow between heating and cooling zones',
    ],
    correctAnswer: 2,
    explanation:
      'Oil separators capture lubricating oil that leaves the compressor with refrigerant discharge gas, returning it to the compressor crankcase. This prevents oil accumulation in heat exchangers which would reduce efficiency.',
  },
  {
    id: 7,
    question:
      'For a VRF system serving a 5-storey building, what is the typical maximum height difference allowed between outdoor and indoor units?',
    options: [
      '15 metres',
      '100 metres',
      '75 metres',
      '30-50 metres',
    ],
    correctAnswer: 3,
    explanation:
      'Most VRF systems allow 30-50 metres vertical height difference between outdoor and highest/lowest indoor units. Oil return and refrigerant pressure drop become critical factors in taller installations.',
  },
  {
    id: 8,
    question: 'What is the primary consideration when sizing the liquid line in a refrigerant circuit?',
    options: [
      'Ensuring the refrigerant stays liquid with acceptable subcooling',
      'Matching the liquid line to the suction line diameter',
      'Keeping refrigerant velocity above the speed of sound',
      'Maximising the volume of refrigerant held in the pipe',
    ],
    correctAnswer: 0,
    explanation:
      'Liquid line sizing ensures refrigerant remains in liquid state with adequate subcooling. Undersized liquid lines cause flash gas which reduces system capacity and can damage the expansion device.',
  },
  {
    id: 9,
    question:
      'What is the typical electrical supply requirement for a commercial VRF outdoor unit rated at 45kW cooling?',
    options: [
      'Single-phase 230V, 63A',
      'Three-phase 400V, 32A typical',
      'Three-phase 400V, 100A',
      'Single-phase 230V, 100A',
    ],
    correctAnswer: 1,
    explanation:
      'A 45kW VRF outdoor unit typically requires three-phase 400V supply drawing approximately 25-30A per phase at full load. A 32A three-phase supply with appropriate protection is common.',
  },
  {
    id: 10,
    question: 'During VRF system commissioning, what must be verified before initial start-up?',
    options: [
      'That the indoor units are wired to a 13A socket supply',
      'That the condensate pipework is connected to a foul drain',
      'Refrigerant pipe pressure test, evacuation to below 500 Pa, and correct refrigerant charge',
      'That the system has been left running for 24 hours beforehand',
    ],
    correctAnswer: 2,
    explanation:
      'Pre-start commissioning requires nitrogen pressure testing (typically 3.0 MPa), deep vacuum evacuation to below 500 Pa absolute, and correct refrigerant charge calculated from pipe lengths. These ensure system integrity and performance.',
  },
  {
    id: 11,
    question:
      'In a heat recovery VRF system, what component distributes refrigerant between heating and cooling indoor units?',
    options: [
      'The thermostatic expansion valve at each indoor unit',
      'An additional outdoor condenser dedicated to heating',
      'The oil separator on the compressor discharge',
      'BC (Branch Controller) or BS (Branch Selector) box',
    ],
    correctAnswer: 3,
    explanation:
      'Heat recovery VRF systems use BC (Branch Controller) or BS (Branch Selector) boxes containing solenoid valves to route refrigerant appropriately to indoor units operating in either heating or cooling mode simultaneously.',
  },
  {
    id: 12,
    question:
      'What is the primary consideration when selecting VRF pipe sizes for long horizontal runs?',
    options: [
      'Refrigerant velocity and pressure drop affecting system capacity',
      'The colour coding required for the pipe insulation',
      'The fire rating of the builderswork penetrations',
      'The ambient noise level around the pipe route',
    ],
    correctAnswer: 0,
    explanation:
      'Long horizontal runs increase pressure drop, reducing available capacity at distant indoor units. Pipe sizing must balance velocity (for oil return) against pressure drop to maintain system performance across all connected units.',
  },
];

const faqs = [
  {
    question: 'What is the difference between R410A and R32 refrigerants in split systems?',
    answer:
      'R410A has been the dominant refrigerant but has high GWP (2088). R32 has lower GWP (675) and better thermodynamic properties, requiring smaller charges for equivalent capacity. However, R32 is mildly flammable (A2L classification), requiring compliance with additional safety requirements under BS EN 378 and F-gas regulations. Most new systems are transitioning to R32.',
  },
  {
    question: 'How do I calculate additional refrigerant charge for long pipe runs?',
    answer:
      'Manufacturers provide charging tables based on liquid line diameter and length exceeding the factory charge allowance (typically 7.5-10m). For example, a system might require 30g/m for 6.35mm liquid line and 90g/m for 9.52mm line. Suction line length generally does not require additional charge. Always refer to specific manufacturer data.',
  },
  {
    question:
      'Can a 2-pipe VRF system provide heating and cooling to different zones simultaneously?',
    answer:
      'No, standard 2-pipe VRF systems operate in either heating or cooling mode for all connected units - the mode is determined by the majority demand. For simultaneous heating and cooling capability, a 3-pipe heat recovery system is required, which includes branch selector boxes to route refrigerant appropriately.',
  },
  {
    question: 'What electrical isolation is required for split system outdoor units?',
    answer:
      'BS 7671 requires a local means of isolation adjacent to outdoor units for maintenance safety. This should be a lockable isolator rated for the full load current, with clear labelling. The supply circuit requires RCD protection (30mA for accessible outdoor units) and appropriate overcurrent protection sized per manufacturer requirements.',
  },
  {
    question: 'Why do VRF systems require specific pipe brazing procedures?',
    answer:
      'VRF systems operate at higher pressures than older systems and require oxygen-free brazing with nitrogen purge to prevent internal oxidation. Copper oxide contamination can block expansion devices and damage compressors. All joints must be made with silver-bearing brazing alloy (minimum 5% silver) and 100% visually inspected before insulation.',
  },
  {
    question: 'What commissioning tests are required before VRF system handover?',
    answer:
      'Key commissioning tests include: nitrogen pressure test (typically 3.0 MPa for 24 hours), standing vacuum test (below 500 Pa for minimum 2 hours), refrigerant charge verification, compressor and fan current measurement, superheat and subcooling verification, airflow measurement at each indoor unit, control system function test, and full documentation of all readings.',
  },
];

const HNCModule8Section3_2 = () => {
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
            eyebrow="Module 8 · Section 3 · Subsection 2"
            title="DX Systems"
            description="Direct expansion air conditioning: split systems, multi-split, VRF/VRV technology and electrical requirements"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the operation and components of split system air conditioning",
              "Compare multi-split and VRF/VRV system configurations",
              "Distinguish between 2-pipe and 3-pipe (heat recovery) VRF systems",
              "Apply refrigerant pipe sizing principles for DX installations",
              "Specify electrical supplies for single and three-phase DX equipment",
              "Describe inverter compressor technology and its energy benefits",
              "Outline commissioning procedures for VRF systems",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Split System Fundamentals">
            <p>Split systems are the most common form of air conditioning, separating the noisy compressor and condenser (outdoor unit) from the quiet evaporator and air distribution (indoor unit). This arrangement provides flexibility in installation whilst maintaining efficient heat rejection.</p>
            <p><strong>Split System Components:</strong></p>
            <p><strong>Indoor Unit</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Evaporator coil (heat exchanger)</li>
              <li>Fan (centrifugal or cross-flow)</li>
              <li>Expansion device (TXV or EEV)</li>
              <li>Air filter and condensate tray</li>
              <li>Control PCB and sensors</li>
            </ul>
            <p><strong>Outdoor Unit</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Compressor (scroll, rotary or inverter)</li>
              <li>Condenser coil (air-cooled)</li>
              <li>Axial fan(s) for heat rejection</li>
              <li>Reversing valve (heat pump systems)</li>
              <li>Service valves and filter drier</li>
            </ul>
            <p><strong>Split System Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wall-mounted:</strong> 2.5 - 8 kW — Small offices, bedrooms, server rooms</li>
              <li><strong>Ceiling cassette:</strong> 3.5 - 14 kW — Open plan offices, retail, restaurants</li>
              <li><strong>Ducted:</strong> 5 - 25 kW — Concealed installations, multiple rooms</li>
              <li><strong>Floor-standing:</strong> 3.5 - 7 kW — Server rooms, areas without ceiling void</li>
              <li><strong>Under-ceiling:</strong> 3.5 - 14 kW — Exposed ceiling applications</li>
            </ul>
            <p><strong>Refrigerant Connections</strong></p>
            <p>Split systems require two refrigerant pipes between indoor and outdoor units:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Liquid line (smaller):</strong> High-pressure liquid from condenser to expansion device</li>
              <li><strong>Suction/gas line (larger):</strong> Low-pressure gas from evaporator to compressor</li>
              <li><strong>Pipe sizing:</strong> Typically 6.35mm liquid, 9.52-15.88mm suction for residential units</li>
              <li><strong>Insulation:</strong> Both pipes require insulation; suction line prevents condensation</li>
            </ul>
            <p><strong>Installation note:</strong> Maximum pipe lengths are typically 15-25m for standard systems. Longer runs require additional refrigerant charge and may need larger pipe sizes to maintain performance.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Multi-Split and VRF/VRV Technology">
            <p>Multi-split systems connect multiple indoor units to a single outdoor unit, whilst VRF (Variable Refrigerant Flow) systems extend this concept with sophisticated inverter control and the ability to serve large numbers of indoor units with precise individual control.</p>
            <p><strong>Multi-Split vs VRF Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Indoor units per outdoor:</strong> 2-9 units — Up to 64+ units</li>
              <li><strong>Capacity range:</strong> 4-14 kW outdoor — 14-150+ kW outdoor</li>
              <li><strong>Piping configuration:</strong> Individual runs or branch boxes — Header and branch system</li>
              <li><strong>Capacity modulation:</strong> Stepped or basic inverter — Full inverter, 10-100%</li>
              <li><strong>Simultaneous heat/cool:</strong> Not available — 3-pipe systems only</li>
              <li><strong>Maximum pipe length:</strong> 25-50m typical — 165-200m+ from outdoor unit</li>
            </ul>
            <p><strong>VRF System Architecture:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Outdoor unit(s):</strong> Modular, can be combined for larger capacity</li>
              <li><strong>Refrigerant piping:</strong> Header system with Y-branches to each indoor unit</li>
              <li><strong>BC/BS boxes:</strong> Branch controller/selector boxes for heat recovery systems</li>
              <li><strong>Indoor units:</strong> Any combination of wall, cassette, ducted, floor units</li>
              <li><strong>Controls:</strong> Centralised controller, individual remotes, BMS integration</li>
            </ul>
            <p><strong>2-Pipe VRF Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat pump operation - all units heat or cool</li>
              <li>Mode determined by majority demand</li>
              <li>Simpler piping installation</li>
              <li>Lower initial cost</li>
              <li>Suitable for uniform load buildings</li>
            </ul>
            <p><strong>3-Pipe VRF (Heat Recovery)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simultaneous heating and cooling</li>
              <li>Heat recovered from cooling zones</li>
              <li>Superior energy efficiency</li>
              <li>Requires BC/BS branch boxes</li>
              <li>Ideal for buildings with diverse loads</li>
            </ul>
            <p><strong>VRF Energy Efficiency</strong></p>
            <p>VRF systems achieve high seasonal efficiency through:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Inverter compressors:</strong> Variable speed operation matches load precisely</li>
              <li><strong>Part-load efficiency:</strong> Optimum COP often achieved at 40-60% capacity</li>
              <li><strong>Heat recovery:</strong> Energy from cooling zones supplements heating zones</li>
              <li><strong>Reduced duct losses:</strong> Refrigerant distribution more efficient than air</li>
            </ul>
            <p>Typical seasonal efficiency: SEER 6-8 (cooling), SCOP 4-5 (heating) for modern systems.</p>
            <p><strong>Design tip:</strong> VRF connected capacity ratio (total indoor to outdoor) typically ranges from 50-130%. Higher ratios rely on diversity but reduce available capacity per unit at peak times.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Refrigerant Pipe Sizing and Installation">
            <p>Correct refrigerant pipe sizing is critical for DX system performance. Undersized pipes cause excessive pressure drop reducing capacity, whilst oversized pipes can result in poor oil return and increased refrigerant charge.</p>
            <p><strong>Pipe Sizing Criteria</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Liquid line:</strong> Maintain subcooling, prevent flash gas — 0.5 - 1.5 m/s typical</li>
              <li><strong>Suction line (horizontal):</strong> Oil return, pressure drop — &gt; 3.5 m/s minimum</li>
              <li><strong>Suction line (vertical rise):</strong> Oil lift against gravity — &gt; 5-7 m/s minimum</li>
              <li><strong>Discharge line:</strong> Noise, pressure drop — 10-18 m/s typical</li>
            </ul>
            <p><strong>Typical VRF Pipe Sizes (R410A)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2.2 - 3.6 kW:</strong> 6.35 mm (1/4") — 9.52 mm (3/8")</li>
              <li><strong>4.5 - 5.6 kW:</strong> 6.35 mm (1/4") — 12.7 mm (1/2")</li>
              <li><strong>7.1 - 11.2 kW:</strong> 9.52 mm (3/8") — 15.88 mm (5/8")</li>
              <li><strong>14 - 22.4 kW:</strong> 9.52 mm (3/8") — 19.05 mm (3/4")</li>
            </ul>
            <p><strong>Installation Requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Brazing:</strong> Nitrogen purge during brazing to prevent oxidation</li>
              <li><strong>Pressure test:</strong> 3.0 MPa with dry nitrogen for 24 hours minimum</li>
              <li><strong>Evacuation:</strong> Deep vacuum to below 500 Pa (0.5 mbar) absolute</li>
              <li><strong>Leak test:</strong> Electronic leak detector after evacuation</li>
              <li><strong>Insulation:</strong> 10-19mm thickness depending on pipe size and location</li>
            </ul>
            <p><strong>VRF Piping Limitations</strong></p>
            <p><strong>Maximum Lengths (typical)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total pipe length: 165-200m</li>
              <li>Equivalent length: 175-230m</li>
              <li>First branch to furthest unit: 40-90m</li>
            </ul>
            <p><strong>Height Differences (typical)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Outdoor to indoor: 30-50m</li>
              <li>Between indoor units: 15-30m</li>
              <li>Outdoor below indoor: 30-40m</li>
            </ul>
            <p>Note: Exact limits vary by manufacturer and system model - always consult specific documentation.</p>
            <p><strong>Critical:</strong> Oil traps may be required on suction risers exceeding 10m. Pipe sizing software from manufacturers should be used for complex VRF installations to verify pressure drop and oil return.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Electrical Requirements and Commissioning">
            <p>DX systems require careful electrical design to ensure safe operation, compliance with BS 7671, and compatibility with inverter-driven equipment. Commissioning procedures verify both refrigeration and electrical systems function correctly.</p>
            <p><strong>Electrical Supply Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Small split (residential):</strong> 2.5-3.5 kW — 230V 1-ph — 16A Type C</li>
              <li><strong>Medium split:</strong> 5-7 kW — 230V 1-ph — 20A Type C</li>
              <li><strong>Large split:</strong> 10-14 kW — 230V 1-ph or 400V 3-ph — 32A Type C</li>
              <li><strong>VRF outdoor (small):</strong> 14-28 kW — 400V 3-ph — 20-25A Type C</li>
              <li><strong>VRF outdoor (medium):</strong> 33-56 kW — 400V 3-ph — 32-40A Type C</li>
              <li><strong>VRF outdoor (large):</strong> 73-150+ kW — 400V 3-ph — 63-100A Type C</li>
            </ul>
            <p><strong>Electrical Installation Requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dedicated circuit:</strong> Each outdoor unit requires dedicated supply</li>
              <li><strong>Local isolation:</strong> Lockable isolator within sight of outdoor unit</li>
              <li><strong>RCD protection:</strong> 30mA RCD for accessible outdoor units per BS 7671</li>
              <li><strong>Cable sizing:</strong> Based on manufacturer MCA (Maximum Circuit Amps)</li>
              <li><strong>MCB selection:</strong> Type C or D for motor starting currents</li>
              <li><strong>EMC:</strong> Screened cables may be required for inverter units</li>
            </ul>
            <p><strong>Inverter Considerations</strong></p>
            <p>VRF systems use inverter-driven compressors which create specific electrical challenges:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Harmonic distortion:</strong> May require harmonic filters on larger systems</li>
              <li><strong>High frequency noise:</strong> Can affect sensitive equipment nearby</li>
              <li><strong>Earth leakage:</strong> Capacitive currents may cause nuisance RCD tripping</li>
              <li><strong>Soft start:</strong> Reduced inrush current vs fixed speed compressors</li>
              <li><strong>Power factor:</strong> Generally &gt; 0.95 at full load</li>
            </ul>
            <p><strong>Commissioning Procedures</strong></p>
            <p><strong>Pre-Start Checks</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Verify pipe pressure test records</li>
              <li>• Confirm vacuum test completed</li>
              <li>• Check refrigerant charge calculation</li>
              <li>• Verify electrical connections</li>
              <li>• Check phase rotation (3-phase)</li>
            </ul>
            <p><strong>Operational Tests</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Measure compressor current</li>
              <li>• Verify superheat (5-10K typical)</li>
              <li>• Check subcooling (5-8K typical)</li>
              <li>• Measure airflows at each unit</li>
              <li>• Test all control functions</li>
            </ul>
            <p><strong>VRF System Configuration</strong></p>
            <p>VRF systems require address setting and network configuration:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Refrigerant address:</strong> Each indoor unit assigned unique address</li>
              <li><strong>Capacity tables:</strong> Entered via outdoor unit or central controller</li>
              <li><strong>Communication check:</strong> Verify all units communicate correctly</li>
              <li><strong>Charge calculation:</strong> Additional charge based on pipe lengths</li>
              <li><strong>Auto-commissioning:</strong> Many systems run automatic charge check</li>
            </ul>
            <p><strong>Documentation:</strong> Complete commissioning records including pressure tests, vacuum records, refrigerant charge, electrical readings and control settings must be retained and provided to the client as part of O&amp;M manuals.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Split System Electrical Sizing</strong>
            </p>
            <p><strong>Question:</strong> A 7kW single-phase split system has a maximum operating current of 12.5A and inrush current of 35A. Specify the electrical supply requirements.</p>
            <p>Operating current: 12.5A at 230V</p>
            <p>Inrush current: 35A (inverter soft-start)</p>
            <p>MCB selection:</p>
            <p>• Type C MCB can handle 5-10× In inrush</p>
            <p>• 20A Type C: handles up to 200A peak</p>
            <p>• 35A inrush &lt; 200A ✓</p>
            <p>Cable sizing:</p>
            <p>• 20A circuit requires 2.5mm² minimum (Method C)</p>
            <p>• With voltage drop check for run length</p>
            <p>→ Specify: 20A Type C MCB, 2.5mm² T+E, local isolator</p>
            <p>
              <strong>Example 2: VRF Additional Refrigerant Charge</strong>
            </p>
            <p><strong>Question:</strong> A VRF system has 85m of 9.52mm liquid line and 95m of 19.05mm suction line beyond the factory allowance. Calculate additional refrigerant charge if the liquid line requires 90g/m.</p>
            <p>Liquid line additional length: 85m</p>
            <p>Charge rate for 9.52mm: 90 g/m</p>
            <p>Additional charge calculation:</p>
            <p>Additional charge = 85m × 90 g/m = <strong>7,650g = 7.65 kg</strong></p>
            <p>Note: Suction line length typically does not require</p>
            <p>additional charge in most manufacturer calculations.</p>
            <p>→ Add 7.65 kg R410A to factory pre-charge</p>
            <p>
              <strong>Example 3: Three-Phase VRF Current Calculation</strong>
            </p>
            <p><strong>Question:</strong> A 56kW VRF outdoor unit operates at 0.97 power factor on 400V three-phase. Calculate the line current and select appropriate protection.</p>
            <p>Using: P = √3 × VL × IL × cos φ</p>
            <p>Rearranging: IL = P / (√3 × VL × cos φ)</p>
            <p>IL = 56,000 / (1.732 × 400 × 0.97)</p>
            <p>IL = 56,000 / 672.3 = <strong>83.3A per phase</strong></p>
            <p>Protection selection:</p>
            <p>• Check manufacturer MCA (Max Circuit Amps)</p>
            <p>• Typically MCA &gt; calculated current by 20-25%</p>
            <p>• Select 100A Type C MCCB or 100A fuses</p>
            <p>→ Specify: 100A 3-phase supply, 25mm² 4-core SWA</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>System Selection Criteria:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single split:</strong> Individual rooms, server closets, residential</li>
              <li><strong>Multi-split:</strong> Small commercial, 2-5 zones, limited outdoor space</li>
              <li><strong>2-pipe VRF:</strong> Medium buildings, uniform loads, heat pump operation</li>
              <li><strong>3-pipe VRF:</strong> Large buildings, diverse loads, heat recovery potential</li>
            </ul>
            <p>
              <strong>Key Design Considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Outdoor unit location:</strong> Adequate airflow, noise impact, maintenance access</li>
              <li><strong>Pipe routes:</strong> Shortest practical, avoid heat sources, provision for expansion</li>
              <li><strong>Condensate drainage:</strong> Falls to drain points, trace heating if exposed</li>
              <li><strong>Controls integration:</strong> BMS connectivity, scheduling, energy monitoring</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Inadequate brazing:</strong> Not purging with nitrogen causes internal oxidation</li>
                <li><strong>Poor vacuum:</strong> Moisture contamination leads to compressor failure</li>
                <li><strong>Wrong refrigerant charge:</strong> Under or overcharge reduces efficiency and life</li>
                <li><strong>Incorrect addressing:</strong> Indoor units not responding to controls</li>
                <li><strong>Missing isolation:</strong> No local isolator for outdoor unit maintenance</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Refrigeration fundamentals
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Chilled water systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section3_2;
