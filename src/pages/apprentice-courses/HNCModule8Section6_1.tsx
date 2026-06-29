/**
 * Module 8 · Section 6 · Subsection 1 — HVAC Electrical Requirements
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Electrical loads, power supplies, control wiring, cable containment, and installation standards for HVAC systems
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

const TITLE = 'HVAC Electrical Requirements - HNC Module 8 Section 6.1';
const DESCRIPTION =
  'Master HVAC electrical requirements: electrical load schedules, supply voltages (230V, 400V 3-phase), motor power calculations, control wiring specifications, cable containment coordination, BS 7671 requirements, and MCC design for HVAC plant.';

const quickCheckQuestions = [
  {
    id: 'hvac-load-calculation',
    question:
      'When calculating the total electrical load for an HVAC system, which factor must be applied to motor full load current to determine cable sizing?',
    options: [
      '0.8 (80% derating)',
      '1.0 (exact FLC)',
      '1.25 (25% increase)',
      '1.5 (50% increase)',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Regulation 433.3.1 requires that conductors supplying motors shall be rated for not less than 125% of the full load current of the motor to account for starting conditions and continuous operation at rated load.',
  },
  {
    id: 'control-wiring-voltage',
    question:
      'What is the typical voltage classification for BMS control wiring connecting to HVAC equipment?',
    options: [
      'Extra-Low Voltage (typically 24V AC/DC)',
      'Low Voltage (230V single-phase only)',
      'High Voltage (above 1000V AC)',
      'Reduced Low Voltage (110V centre-tapped)',
    ],
    correctIndex: 0,
    explanation:
      'BMS control signals typically operate at Extra-Low Voltage (ELV), commonly 24V AC or DC. This provides safety advantages and allows smaller cable sizes, though mains-rated control circuits are also used for direct switching applications.',
  },
  {
    id: 'containment-separation',
    question:
      'According to BS 7671, what is the minimum separation required between power cables and ELV control cables in shared containment?',
    options: [
      'No separation required',
      'Physical partition or 150mm spacing',
      'Physical partition or 50mm spacing',
      'Separate containment routes only',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Regulation 528.1 requires segregation between Band I (ELV) and Band II (LV mains) circuits. This can be achieved by physical partition, 50mm separation in cable tray, or separate compartments in trunking systems.',
  },
  {
    id: 'mcc-protection',
    question:
      'What type of motor protection device is typically specified in an MCC to prevent damage from prolonged overload conditions?',
    options: [
      'MCB only',
      'Time delay relay',
      'Thermal overload relay',
      'Fuse only',
    ],
    correctIndex: 2,
    explanation:
      'Thermal overload relays (or electronic equivalents) are essential motor protection devices that monitor current over time. They trip when sustained overload conditions would cause motor winding damage, providing protection that instantaneous devices cannot offer.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 15kW three-phase HVAC chiller motor operates at 400V with a power factor of 0.85. What is the approximate full load current (FLC)?',
    options: [
      '18.5A',
      '25.5A',
      '22A',
      '32A',
    ],
    correctAnswer: 1,
    explanation:
      'FLC = P / (√3 × V × pf) = 15,000 / (1.732 × 400 × 0.85) = 15,000 / 588.7 = 25.5A. This calculation is essential for cable sizing and protective device selection.',
  },
  {
    id: 2,
    question:
      'Which BS 7671 regulation specifically addresses the requirements for motor circuit protection?',
    options: [
      'Section 525',
      'Section 411',
      'Section 433',
      'Section 701',
    ],
    correctAnswer: 2,
    explanation:
      'Section 433 of BS 7671 covers protection against overload current, including specific requirements for motor circuits in Regulation 433.3. This includes the 125% conductor rating requirement.',
  },
  {
    id: 3,
    question:
      'When designing cable containment for HVAC plant rooms, what percentage spare capacity is recommended for future expansion?',
    options: [
      '15%',
      '10%',
      '50%',
      '25%',
    ],
    correctAnswer: 3,
    explanation:
      'Industry best practice recommends 25% spare capacity in cable containment systems for HVAC installations. This accommodates future plant additions, control upgrades, and maintenance access without complete containment redesign.',
  },
  {
    id: 4,
    question:
      'What is the standard supply voltage for large HVAC equipment such as chillers and AHU motors in UK commercial installations?',
    options: [
      '400V three-phase',
      '230V single-phase',
      '230V three-phase',
      '415V three-phase',
    ],
    correctAnswer: 0,
    explanation:
      '400V three-phase (phase-to-phase) is the standard UK commercial/industrial supply voltage. Motors above approximately 3kW are typically three-phase for efficiency and starting current benefits.',
  },
  {
    id: 5,
    question:
      'In an MCC (Motor Control Centre) design, what is the purpose of the interposing relay between BMS output and motor starter?',
    options: [
      'To step the BMS signal voltage up to the supply level',
      'To provide isolation between BMS and power circuits',
      'To filter electrical noise from the analogue speed signal',
      'To delay the start command for sequenced plant operation',
    ],
    correctAnswer: 1,
    explanation:
      'Interposing relays provide galvanic isolation between BMS control circuits (typically 24V ELV) and mains-voltage motor starter coils. This protects sensitive BMS equipment and allows voltage level conversion.',
  },
  {
    id: 6,
    question:
      'According to BS 7671, what type of cable should be used for mains-rated HVAC control circuits in industrial environments?',
    options: [
      'Unsheathed single-core conductors clipped direct',
      'Flat twin-and-earth cable surface-mounted',
      'Steel wire armoured (SWA) or equivalent mechanical protection',
      'Lightweight bell-wire suitable for signal circuits',
    ],
    correctAnswer: 2,
    explanation:
      'Industrial HVAC installations typically require mechanically protected cables such as SWA (BS 5467/6724) or cables in conduit/trunking. This provides protection against mechanical damage in plant room environments.',
  },
  {
    id: 7,
    question:
      'What is the minimum IP rating typically required for electrical equipment installed in a mechanical plant room?',
    options: [
      'IP20',
      'IP44',
      'IP65',
      'IP54',
    ],
    correctAnswer: 3,
    explanation:
      'Plant rooms typically require IP54 minimum (dust protected, splash proof) due to potential condensation, maintenance water spillage, and general industrial conditions. Higher ratings may be needed near cooling towers or humidifiers.',
  },
  {
    id: 8,
    question:
      'When calculating HVAC electrical loads, what diversity factor is typically applied to multiple fan coil units on a common circuit?',
    options: [
      '0.8',
      '0.6',
      '1.0 (no diversity)',
      '0.9',
    ],
    correctAnswer: 0,
    explanation:
      'A diversity factor of 0.8 (80%) is commonly applied to multiple fan coil units as they rarely all operate at maximum simultaneously. This reflects realistic loading patterns whilst maintaining adequate capacity.',
  },
  {
    id: 9,
    question: 'What is the purpose of a Variable Speed Drive (VSD) in HVAC motor control?',
    options: [
      'To protect the motor from sustained overload conditions',
      'To vary motor speed for energy efficiency and demand matching',
      'To provide galvanic isolation for the control circuit',
      'To correct the power factor of the motor circuit',
    ],
    correctAnswer: 1,
    explanation:
      'VSDs (also called VFDs or inverters) vary motor speed to match actual demand, significantly improving energy efficiency. HVAC fans and pumps following affinity laws achieve major energy savings at reduced speeds.',
  },
  {
    id: 10,
    question:
      'Which document defines the interface points between HVAC mechanical contractor and electrical contractor?',
    options: [
      'Electrical load schedule',
      'Single-line distribution diagram',
      'Points of Connection Schedule (PoC)',
      'Cable containment layout drawing',
    ],
    correctAnswer: 2,
    explanation:
      'The Points of Connection (PoC) Schedule defines exact interface points, responsibilities, and connection requirements between mechanical and electrical contractors. This is essential for coordination and prevents costly site disputes.',
  },
  {
    id: 11,
    question:
      'What earthing arrangement is typically used for HVAC equipment in UK commercial buildings?',
    options: [
      'TT system only',
      'IT system',
      'No earthing required',
      'TN-S or TN-C-S system',
    ],
    correctAnswer: 3,
    explanation:
      'UK commercial buildings typically use TN-S or TN-C-S earthing systems. HVAC equipment must be bonded to the main earthing terminal, with supplementary bonding in plant rooms as required by BS 7671 Section 411.',
  },
  {
    id: 12,
    question:
      'What is the recommended maximum voltage drop for motor circuits according to BS 7671 guidance?',
    options: [
      '5% of nominal voltage',
      '4% of nominal voltage',
      '2% of nominal voltage',
      '3% of nominal voltage',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Appendix 4 recommends a maximum 5% voltage drop from origin to final load. For motor circuits, this ensures adequate starting voltage and prevents operational issues at full load.',
  },
  {
    id: 13,
    question:
      "In HVAC load schedules, what does the abbreviation 'DOL' indicate for motor starting method?",
    options: [
      'Dual Operating Load',
      'Direct On-Line',
      'Dynamic Output Limiter',
      'Delayed On-Line',
    ],
    correctAnswer: 1,
    explanation:
      "DOL (Direct On-Line) starting connects the motor directly to full supply voltage. It's simple and economical but produces high starting currents (6-8× FLC) and is typically limited to motors under 7.5-11kW.",
  },
  {
    id: 14,
    question:
      'What information must be included on HVAC equipment nameplates according to BS EN 60204-1?',
    options: [
      'Date of manufacture and warranty period only',
      'Installer details and circuit reference number',
      'Rated voltage, current, frequency, and IP rating',
      'Refrigerant type and maximum operating pressure',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 60204-1 requires nameplates to show: manufacturer, supply voltage, number of phases, frequency, full load current, IP rating, and other relevant operational data. This information is essential for safe operation and maintenance.',
  },
];

const faqs = [
  {
    question: 'How do I calculate the electrical load for an HVAC system?',
    answer:
      'HVAC electrical load calculation involves: 1) Listing all equipment (chillers, AHUs, pumps, FCUs, controls) with nameplate ratings. 2) Applying starting current factors for motors (typically 6-8× FLC for DOL, 2-3× for soft start/VSD). 3) Applying diversity factors based on simultaneous operation likelihood (typically 0.7-0.9). 4) Adding control system loads (BMS panels, actuators, sensors). 5) Summing for total connected load and applying overall diversity for maximum demand. Always verify manufacturer data and consider future expansion.',
  },
  {
    question: 'What is the difference between mains-rated and ELV control wiring for HVAC?',
    answer:
      'Mains-rated control wiring (230V/400V) is used for direct switching of equipment, safety interlocks, and local control panels. It requires the same installation standards as power wiring per BS 7671. ELV control wiring (typically 24V AC/DC) is used for BMS signals, sensor connections, and actuator control. ELV circuits must be segregated from mains circuits per Regulation 528.1 but can use lighter-duty cables. The choice depends on equipment requirements, with modern systems increasingly using ELV for BMS integration.',
  },
  {
    question: 'How should cable containment be coordinated between HVAC and electrical services?',
    answer:
      'Coordination requires: 1) Early engagement between M&E designers during RIBA Stage 3/4. 2) Shared containment routes where appropriate with segregation for different voltage bands. 3) Clear zone allocation - typically electrical on one level, mechanical above/below. 4) Common bracket systems to reduce support proliferation. 5) Defined crossing points with appropriate clearances. 6) 3D BIM coordination to identify clashes before installation. 7) Regular design coordination meetings and documented decision records.',
  },
  {
    question: 'What motor starting methods are used in HVAC applications?',
    answer:
      'Common methods include: DOL (Direct On-Line) - simple, economical, high starting current, suitable for small motors under 7.5-11kW. Star-Delta - reduces starting current to 1/3 of DOL, requires 6-wire connection, causes torque dip during changeover. Soft Starter - electronic current limiting, smooth acceleration, typically 2-4× FLC starting current. VSD (Variable Speed Drive) - lowest starting current, full speed control, highest efficiency, preferred for variable-load applications like fans and pumps. Selection depends on motor size, starting frequency, network capacity, and control requirements.',
  },
  {
    question: 'What are the key BS 7671 requirements for HVAC installations?',
    answer:
      'Key BS 7671 requirements include: Section 433 - motor conductor sizing at 125% FLC minimum. Section 411 - fault protection and earthing. Section 528 - segregation of circuits including Band I/II separation. Section 422 - protection against fire, relevant for plant rooms. Section 514 - identification and notices. Appendix 4 - voltage drop limits. Additionally, BS EN 60204-1 applies to HVAC equipment safety, and CIBSE guides provide specific HVAC design guidance that complements the Wiring Regulations.',
  },
  {
    question: 'How is an MCC (Motor Control Centre) designed for HVAC plant?',
    answer:
      'MCC design involves: 1) Determining form of separation (typically Form 2 or 4 for HVAC). 2) Sizing incoming supply based on total load plus diversity. 3) Arranging motor starters logically by system (chiller, pumps, AHU). 4) Including local/remote selector switches, run/trip indication, and hour meters. 5) Providing BMS interface points (volt-free contacts, analogue outputs). 6) Specifying thermal overload protection, short circuit protection, and isolation facilities. 7) Ensuring adequate IP rating and ventilation. 8) Allowing 20-25% spare capacity for future plant.',
  },
];

const HNCModule8Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 6 · Subsection 1"
            title="HVAC Electrical Requirements"
            description="Electrical loads, power supplies, control wiring, cable containment, and installation standards for HVAC systems"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate HVAC electrical loads and apply diversity factors",
              "Specify appropriate supply voltages for HVAC equipment",
              "Design motor circuits compliant with BS 7671 Section 433",
              "Distinguish between mains-rated and ELV control wiring",
              "Coordinate cable containment with other building services",
              "Design MCC panels for HVAC plant room applications",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="HVAC Electrical Load Schedules">
            <p>Accurate electrical load scheduling is fundamental to HVAC system design. The load schedule documents all electrical equipment, their power requirements, and provides the basis for sizing distribution boards, cables, and incoming supplies. Understanding how to compile and interpret these schedules is essential for effective coordination between mechanical and electrical disciplines.</p>
            <p><strong>Typical HVAC Equipment Categories:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Primary plant:</strong> Chillers, boilers, heat pumps (typically largest loads, 50-500kW)</li>
              <li><strong>Distribution equipment:</strong> Pumps, fans, AHUs (variable loads, 1-50kW)</li>
              <li><strong>Terminal units:</strong> Fan coil units, VAV boxes, unit heaters (small loads, 0.1-2kW)</li>
              <li><strong>Controls:</strong> BMS panels, actuators, sensors, valves (low power, typically &lt;1kW total)</li>
              <li><strong>Ancillary:</strong> Electric trace heating, water treatment, condensate pumps</li>
            </ul>
            <p><strong>Sample HVAC Load Schedule Format</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Chiller No.1:</strong> 150 — 400V 3ph — 255 — VSD</li>
              <li><strong>LTHW Pump P1:</strong> 11 — 400V 3ph — 21 — DOL</li>
              <li><strong>AHU-01 Supply Fan:</strong> 22 — 400V 3ph — 38 — VSD</li>
              <li><strong>FCU (×20 units):</strong> 0.15 ea — 230V 1ph — 0.7 ea — DOL</li>
              <li><strong>BMS Panel:</strong> 0.5 — 230V 1ph — 2.2 — N/A</li>
            </ul>
            <p><strong>Diversity Factors for HVAC Loads</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- Chillers (multiple): 0.8-0.9 (staged operation)</li>
              <li>- Pumps (duty/standby): 0.5-0.6 (one operates at a time)</li>
              <li>- Fan coil units: 0.7-0.8 (varied zone demands)</li>
              <li>- AHU supply/extract: 0.9-1.0 (typically simultaneous)</li>
              <li>- Overall HVAC system: 0.7-0.85 (depends on control strategy)</li>
            </ul>
            <p><strong>Design principle:</strong> Always obtain manufacturer data sheets for accurate electrical ratings. Nameplate data supersedes estimated calculations, particularly for equipment with integrated VSDs or electronic controls.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Supply Voltages and Motor Power Calculations">
            <p>UK HVAC installations utilise standard supply voltages of 230V single-phase and 400V three-phase. Understanding motor power calculations enables correct cable sizing, protective device selection, and switchgear specification. These calculations form the foundation of all HVAC electrical design work.</p>
            <p><strong>Single-Phase (230V)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Small FCUs and unit heaters</li>
              <li>Domestic heat pumps (&lt;3kW)</li>
              <li>Control panels and BMS</li>
              <li>Small circulation pumps</li>
              <li>Actuators and damper motors</li>
            </ul>
            <p>Current calculation:</p>
            <p>I = P / (V × pf)</p>
            <p>Example: 2.3kW, pf 0.85</p>
            <p>I = 2300 / (230 × 0.85) = 11.8A</p>
            <p><strong>Three-Phase (400V)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chillers and large heat pumps</li>
              <li>AHU supply and extract fans</li>
              <li>Chilled water pumps</li>
              <li>Cooling towers</li>
              <li>Motors &gt;3kW typically</li>
            </ul>
            <p>Current calculation:</p>
            <p>I = P / (√3 × V × pf)</p>
            <p>Example: 22kW, pf 0.85</p>
            <p>I = 22000 / (1.732 × 400 × 0.85) = 37.3A</p>
            <p><strong>Motor Current and Cable Sizing Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>4kW:</strong> 8A — 10A (1.5mm²) — 10A MCB + 10A overload</li>
              <li><strong>7.5kW:</strong> 15A — 19A (2.5mm²) — 20A MCB + 16A overload</li>
              <li><strong>15kW:</strong> 28A — 35A (6mm²) — 32A MCB + 30A overload</li>
              <li><strong>30kW:</strong> 55A — 69A (16mm²) — 63A MCCB + 55A overload</li>
              <li><strong>55kW:</strong> 100A — 125A (35mm²) — 125A MCCB + 100A overload</li>
            </ul>
            <p><strong>Motor Starting Methods and Current Draw</strong></p>
            <p><strong>DOL (Direct On-Line):</strong> 6-8× FLC starting current, simplest method, limited to motors &lt;11kW typically</p>
            <p><strong>Star-Delta:</strong> Starting current reduced to ~33% of DOL, requires 6-core cable, torque dip on changeover</p>
            <p><strong>Soft Starter:</strong> 2-4× FLC starting, smooth acceleration, current limiting, reduced mechanical stress</p>
            <p><strong>VSD/VFD:</strong> 1-1.5× FLC starting, full speed control, energy savings on variable loads, harmonic considerations</p>
            <p><strong>Important:</strong> BS 7671 Regulation 433.3.1 requires motor circuit conductors to be rated at not less than 125% of FLC. This accounts for motor temperature rise and ensures the cable can handle continuous full-load operation.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Control Wiring and BMS Integration">
            <p>HVAC systems require extensive control wiring connecting the Building Management System (BMS) to field devices. Understanding the distinction between mains-rated and extra-low voltage (ELV) control circuits is essential for safe installation design and compliance with BS 7671 segregation requirements.</p>
            <p><strong>Control Circuit Voltage Classifications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>- <strong>Mains-rated (Band II):</strong> 230V AC control circuits, motor starter coils, direct-switched equipment</li>
              <li>- <strong>ELV (Band I):</strong> Typically 24V AC or DC, BMS field devices, sensors, actuators</li>
              <li>- <strong>SELV:</strong> Safety extra-low voltage, isolated from earth, used for sensitive electronics</li>
              <li>- <strong>PELV:</strong> Protective extra-low voltage, earthed reference, common for BMS</li>
            </ul>
            <p><strong>Mains-Rated Control Wiring</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>230V AC contactor coils</li>
              <li>Safety interlock circuits</li>
              <li>Local start/stop stations</li>
              <li>Run/trip indication lamps</li>
              <li>Emergency stop circuits</li>
            </ul>
            <p>Requires same installation standards as power cables per BS 7671</p>
            <p><strong>ELV Control Wiring (24V)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>BMS digital inputs/outputs</li>
              <li>Temperature sensors (NTC, PT1000)</li>
              <li>Actuator control (0-10V, 4-20mA)</li>
              <li>Pressure transducers</li>
              <li>Damper position feedback</li>
            </ul>
            <p>Must be segregated from Band II circuits per Regulation 528.1</p>
            <p><strong>BMS Interface Requirements at MCC</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Start/Stop Command:</strong> BMS → MCC — Volt-free contact via interposing relay</li>
              <li><strong>Run Status:</strong> MCC → BMS — Auxiliary contact on contactor</li>
              <li><strong>Trip/Fault:</strong> MCC → BMS — Auxiliary contact on overload</li>
              <li><strong>Hand/Off/Auto:</strong> MCC → BMS — Selector switch position feedback</li>
              <li><strong>Speed Reference:</strong> BMS → VSD — 0-10V or 4-20mA analogue signal</li>
              <li><strong>Speed Feedback:</strong> VSD → BMS — 0-10V or 4-20mA analogue signal</li>
            </ul>
            <p><strong>Design tip:</strong> Specify interposing relays between BMS outputs (typically 24V) and mains-voltage starter coils. This provides galvanic isolation and prevents BMS damage from back-EMF or fault currents.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Cable Containment and Installation Standards">
            <p>Cable containment coordination between HVAC and electrical services is crucial for successful building services installation. BS 7671 and industry standards define requirements for segregation, support, and installation methods. Effective coordination during design prevents costly clashes and delays during construction.</p>
            <p><strong>BS 7671 Segregation Requirements (Regulation 528.1)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Band I (ELV) + Band II (LV):</strong> Physical separation — Partition, 50mm gap, or separate compartment</li>
              <li><strong>Power + Fire alarm:</strong> Enhanced separation — 150mm gap or fire-rated barrier</li>
              <li><strong>Power + Data/comms:</strong> EMC consideration — 50mm minimum, screened cables preferred</li>
              <li><strong>Same voltage band:</strong> Can share containment — Adequate capacity and derating applied</li>
            </ul>
            <p><strong>Containment Types for HVAC Applications</strong></p>
            <p><strong>Cable tray:</strong> Open ventilated, good heat dissipation, suitable for plant rooms. Perforated or ladder type. Derating factors apply per BS 7671 Appendix 4.</p>
            <p><strong>Cable basket:</strong> Lighter duty alternative to tray, easier cable additions, good in ceiling voids. Wire mesh construction.</p>
            <p><strong>Trunking:</strong> Enclosed metal or PVC, better protection, compartmentalised options available for segregation. Higher derating factors apply.</p>
            <p><strong>Conduit:</strong> Steel or PVC, individual circuit runs, suitable for final connections to equipment. Rigid or flexible.</p>
            <p><strong>SWA direct:</strong> Steel wire armoured cable without containment, used for external runs or direct burial.</p>
            <p><strong>Plant Room Containment</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heavy-duty cable tray or ladder</li>
              <li>Hot-dip galvanised for durability</li>
              <li>300mm-600mm widths typical</li>
              <li>Support brackets at 1.5-2m centres</li>
              <li>25% spare capacity minimum</li>
              <li>Clear labelling of circuit routes</li>
            </ul>
            <p><strong>Ceiling Void Containment</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable basket for flexibility</li>
              <li>Coordinate with ductwork routes</li>
              <li>Maintain access for maintenance</li>
              <li>Fire stopping at compartment walls</li>
              <li>Avoid blocking access panels</li>
              <li>Consider BIM clash detection</li>
            </ul>
            <p><strong>MCC Design Considerations for HVAC Plant</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Form of separation:</strong> Form 2 (busbars separated from units) or Form 4 (full segregation) for larger installations</li>
              <li><strong>IP rating:</strong> IP54 minimum for plant rooms with potential moisture/dust</li>
              <li><strong>Layout:</strong> Group by system (chillers, pumps, AHUs) for logical operation</li>
              <li><strong>Labelling:</strong> Clear equipment identification, circuit references, warning notices</li>
              <li><strong>BMS marshalling:</strong> Dedicated terminal blocks for control wiring interface</li>
              <li><strong>Spare capacity:</strong> 20-25% spare outgoing ways for future plant</li>
              <li><strong>Local indication:</strong> Run lamps, trip indication, hour meters on critical plant</li>
            </ul>
            <p><strong>Coordination principle:</strong> Early engagement between M&E disciplines (RIBA Stage 3/4) using 3D BIM models identifies containment clashes before construction. Regular design coordination meetings with documented decisions prevent costly site variations.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Motor Circuit Design for AHU</strong>
            </p>
            <p><strong>Scenario:</strong> Design the electrical supply for a 22kW AHU supply fan motor with VSD control.</p>
            <p>Given Data:</p>
            <p>Motor: 22kW, 400V 3-phase, pf 0.85</p>
            <p>Starting method: VSD (Variable Speed Drive)</p>
            <p>Cable route: 35m from MCC to motor</p>
            <p>Step 1: Calculate Full Load Current</p>
            <p>FLC = P / (√3 × V × pf)</p>
            <p>FLC = 22,000 / (1.732 × 400 × 0.85)</p>
            <p>FLC = 37.3A</p>
            <p>Step 2: Apply 125% Factor (Reg 433.3.1)</p>
            <p>Minimum cable rating = 37.3 × 1.25</p>
            <p>= 46.6A</p>
            <p>Step 3: Select Cable (SWA in tray)</p>
            <p>6mm² SWA = 41A (insufficient)</p>
            <p>10mm² SWA = 57A (adequate)</p>
            <p>Step 4: Check Voltage Drop</p>
            <p>VD = (mV/A/m × I × L) / 1000</p>
            <p>VD = (3.8 × 37.3 × 35) / 1000 = 4.96V</p>
            <p>Percentage = 4.96 / 400 × 100 = 1.24%</p>
            <p>Within 5% limit - acceptable</p>
            <p>Step 5: Protective Device Selection</p>
            <p>VSD provides electronic overload protection</p>
            <p>MCCB: 50A Type D (allows starting inrush)</p>
            <p>Final specification: 10mm² 4-core SWA, 50A MCCB</p>
            <p>
              <strong>Example 2: HVAC Load Schedule and Diversity</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate the maximum demand for an HVAC sub-distribution board serving mixed plant.</p>
            <p>Connected Load Schedule:</p>
            <p>Chiller No.1: 75kW (duty)</p>
            <p>Chiller No.2: 75kW (standby)</p>
            <p>CHW Pump P1: 7.5kW (duty)</p>
            <p>CHW Pump P2: 7.5kW (standby)</p>
            <p>AHU-01: 18.5kW</p>
            <p>AHU-02: 15kW</p>
            <p>FCUs (×30): 30 × 0.15kW = 4.5kW</p>
            <p>BMS Panel: 0.5kW</p>
            <p>Total Connected: 203.5kW</p>
            <p>Apply Diversity Factors:</p>
            <p>Chillers: 75kW × 1.0 (one operating) = 75kW</p>
            <p>Pumps: 7.5kW × 1.0 (one operating) = 7.5kW</p>
            <p>AHUs: 33.5kW × 0.9 = 30.2kW</p>
            <p>FCUs: 4.5kW × 0.8 = 3.6kW</p>
            <p>BMS: 0.5kW × 1.0 = 0.5kW</p>
            <p>Maximum Demand = 116.8kW</p>
            <p>At 400V 3-phase, pf 0.85:</p>
            <p>Max current = 198A</p>
            <p>Specify 250A sub-main with 200A incomer</p>
            <p>
              <strong>Example 3: Control Wiring Interface Schedule</strong>
            </p>
            <p><strong>Scenario:</strong> Define the BMS interface points for a typical AHU connection.</p>
            <p>AHU-01 BMS Interface Schedule:</p>
            <p>Digital Inputs (to BMS):</p>
            <p>DI-01: Supply fan run status (NO contact)</p>
            <p>DI-02: Supply fan fault/trip (NC contact)</p>
            <p>DI-03: Extract fan run status (NO contact)</p>
            <p>DI-04: Extract fan fault/trip (NC contact)</p>
            <p>DI-05: Filter differential pressure switch</p>
            <p>DI-06: Frost protection activated</p>
            <p>Digital Outputs (from BMS):</p>
            <p>DO-01: Supply fan start/stop command</p>
            <p>DO-02: Extract fan start/stop command</p>
            <p>Analogue Inputs (to BMS):</p>
            <p>AI-01: Supply air temperature (PT1000)</p>
            <p>AI-02: Return air temperature (PT1000)</p>
            <p>AI-03: Outside air temperature (PT1000)</p>
            <p>AI-04: Supply fan speed feedback (0-10V)</p>
            <p>Analogue Outputs (from BMS):</p>
            <p>AO-01: Supply fan speed reference (0-10V)</p>
            <p>AO-02: Heating valve position (0-10V)</p>
            <p>AO-03: Cooling valve position (0-10V)</p>
            <p>AO-04: Damper position (0-10V)</p>
            <p>Total: 6 × DI, 2 × DO, 4 × AI, 4 × AO</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>HVAC Electrical Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Obtain accurate load data from HVAC equipment manufacturer data sheets</li>
              <li>Apply correct diversity factors based on system operation strategy</li>
              <li>Size motor circuits at 125% FLC per BS 7671 Regulation 433.3.1</li>
              <li>Specify appropriate motor starting methods for network capacity</li>
              <li>Define clear BMS interface schedules with voltage levels and signal types</li>
              <li>Coordinate containment routes early using BIM where available</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Motor cable sizing: <strong>125% of FLC minimum</strong></li>
              <li>DOL starting current: <strong>6-8× FLC</strong></li>
              <li>VSD starting current: <strong>1-1.5× FLC</strong></li>
              <li>Maximum voltage drop: <strong>5%</strong> (BS 7671 guidance)</li>
              <li>Containment spare capacity: <strong>25%</strong> for HVAC applications</li>
              <li>ELV/LV segregation: <strong>50mm or partition</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Under-sizing cables</strong> - forgetting the 125% factor for motor circuits</li>
                <li><strong>Ignoring starting currents</strong> - causing nuisance tripping or voltage dips</li>
                <li><strong>Missing segregation</strong> - ELV and mains in same containment without barriers</li>
                <li><strong>Inadequate spare capacity</strong> - no room for future HVAC additions</li>
                <li><strong>Poor interface documentation</strong> - unclear BMS/MCC responsibilities</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Services coordination
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section6-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Plant room design
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section6_1;
