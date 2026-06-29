/**
 * Module 8 · Section 3 · Subsection 4 — Terminal Units
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Fan coil units, chilled beams, cassettes, unit selection and control strategies
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

const TITLE = 'Terminal Units - HNC Module 8 Section 3.4';
const DESCRIPTION =
  'Master HVAC terminal units for building services: fan coil units (2-pipe, 4-pipe), active and passive chilled beams, cassette units, VAV boxes, control valves, EC fan motors, and condensate drainage requirements.';

const quickCheckQuestions = [
  {
    id: 'fcu-pipe-config',
    question: 'What is the main advantage of a 4-pipe fan coil unit over a 2-pipe system?',
    options: [
      'A lower installed cost due to fewer pipe runs',
      'Simultaneous heating and cooling capability in different zones',
      'A reduced chilled water flow temperature requirement',
      'The elimination of any condensate drainage provision',
    ],
    correctIndex: 1,
    explanation:
      '4-pipe FCUs have separate heating and cooling coils with independent pipework, allowing simultaneous heating and cooling in different zones. This is essential for buildings where some zones need cooling (south-facing) while others need heating (north-facing) at the same time.',
  },
  {
    id: 'chilled-beam-type',
    question: 'What distinguishes an active chilled beam from a passive chilled beam?',
    options: [
      'Active beams contain an integral fan to force air across the coil',
      'Active beams use refrigerant rather than chilled water in the coil',
      'Active beams require condensate drainage while passive beams do not',
      'Active beams incorporate a primary air supply that induces room air across the coil',
    ],
    correctIndex: 3,
    explanation:
      'Active chilled beams use a primary air supply (ducted from an AHU) that passes through nozzles, inducing room air across the cooling coil through the venturi effect. Passive beams rely solely on natural convection with no primary air connection.',
  },
  {
    id: 'control-valve-type',
    question:
      'When should a 3-way control valve be used instead of a 2-way valve on a chilled water terminal unit?',
    options: [
      'When the system uses constant flow primary pumping',
      'When precise temperature control is required',
      'When condensate management is critical',
      'When the unit has an EC motor',
    ],
    correctIndex: 0,
    explanation:
      '3-way valves maintain constant flow through the system by bypassing water around the coil when not needed. They are used with constant flow pumping systems. 2-way valves are preferred for variable flow systems as they allow pump speed reduction when demand drops.',
  },
  {
    id: 'condensate-requirement',
    question: 'What is the minimum recommended fall for FCU condensate drain pipework?',
    options: [
      '1:10 (10%)',
      '1:50 (2%)',
      '1:200 (0.5%)',
      '1:100 (1%)',
    ],
    correctIndex: 3,
    explanation:
      'A minimum fall of 1:100 (1% or 10mm per metre) is typically required for condensate drainage to ensure water flows freely to the drain point. Steeper gradients (1:50) are preferred where possible to prevent standing water and biological growth.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 2-pipe fan coil unit system requires changeover between heating and cooling modes. What does this mean?',
    options: [
      'Each unit can independently select heating or cooling at any time',
      'The entire building system must switch between circulating chilled water and hot water',
      'The unit changes between fan speeds automatically as demand varies',
      'The valve switches between a 2-way and a 3-way configuration',
    ],
    correctAnswer: 1,
    explanation:
      "In a 2-pipe system, the same pipework serves both heating and cooling. The central plant must switch ('changeover') between producing chilled water and hot water for the whole building, meaning all zones operate in the same mode.",
  },
  {
    id: 2,
    question:
      'What is the typical sensible cooling capacity range for a ceiling-mounted cassette unit in an office application?',
    options: [
      '15 - 25 kW',
      '0.5 - 1.5 kW',
      '2 - 8 kW',
      '50 - 100 kW',
    ],
    correctAnswer: 2,
    explanation:
      'Ceiling cassette units typically provide 2-8 kW sensible cooling capacity, making them suitable for individual offices, meeting rooms, and retail spaces. Larger spaces may require multiple units or alternative terminal types.',
  },
  {
    id: 3,
    question:
      'Why must chilled water flow temperature to passive chilled beams typically be maintained above 14°C?',
    options: [
      'To prevent the chilled water pipework from freezing',
      'To reduce the pump energy required to circulate the water',
      'To increase the sensible cooling output of the beam',
      'To prevent condensation forming on the beam surfaces',
    ],
    correctAnswer: 3,
    explanation:
      'Passive chilled beams have no condensate drainage provision. The chilled water temperature must be kept above the room dew point (typically 14-16°C for office conditions) to prevent condensation forming on the beam surfaces.',
  },
  {
    id: 4,
    question:
      'An EC (electronically commutated) fan motor in an FCU offers advantages over an AC induction motor. Which statement is correct?',
    options: [
      'EC motors offer variable speed control with high efficiency across the speed range',
      'EC motors run at a fixed single speed for greater reliability',
      'EC motors require a three-phase supply rather than single-phase',
      'EC motors remove the need for any condensate drainage',
    ],
    correctAnswer: 0,
    explanation:
      'EC motors incorporate permanent magnets and electronic commutation, providing efficient variable speed operation with typical efficiency of 80-90% even at part load. AC motors lose significant efficiency when speed-controlled via voltage reduction.',
  },
  {
    id: 5,
    question: 'What is the primary function of a VAV (Variable Air Volume) terminal box?',
    options: [
      'To vary the supply air temperature delivered to a zone',
      'To modulate airflow to a zone based on temperature demand',
      'To dehumidify the supply air before it enters the zone',
      'To boost duct pressure to overcome system resistance',
    ],
    correctAnswer: 1,
    explanation:
      'VAV boxes modulate the volume of conditioned air delivered to a zone by adjusting a damper position. This varies the cooling/heating capacity while maintaining constant supply air temperature from the central AHU.',
  },
  {
    id: 6,
    question: "A fan coil unit specification states 'Delta P = 40 kPa'. What does this indicate?",
    options: [
      "The unit's fan static pressure capability",
      'The maximum allowable system pressure',
      'The pressure drop across the coil at design water flow rate',
      'The condensate pump discharge pressure',
    ],
    correctAnswer: 2,
    explanation:
      'Delta P (pressure drop) across the coil is critical for system hydraulic design. The water circuit must overcome this resistance plus pipework losses. A 40 kPa coil pressure drop is typical for FCUs.',
  },
  {
    id: 7,
    question:
      'Which control signal type provides the most precise modulation of a chilled water valve on a fan coil unit?',
    options: [
      'On/off switching',
      '3-point floating control',
      'Manual handwheel adjustment',
      '0-10V DC analogue signal',
    ],
    correctAnswer: 3,
    explanation:
      '0-10V DC (or 4-20mA) analogue signals provide proportional, continuous modulation of valve position. This enables precise temperature control compared to on/off (cycling) or 3-point (incremental adjustment) control methods.',
  },
  {
    id: 8,
    question: 'What is the typical induction ratio for an active chilled beam?',
    options: [
      '1:3 to 1:5 - three to five times more room air than primary air',
      '1:1 - equal volumes of primary and induced room air',
      '1:10 to 1:15 - ten to fifteen times more room air than primary air',
      '5:1 - five times more primary air than induced room air',
    ],
    correctAnswer: 0,
    explanation:
      'Active chilled beams typically achieve induction ratios of 1:3 to 1:5, meaning for every 1 volume of primary air, 3-5 volumes of room air are induced across the cooling coil. This provides significant cooling with minimal ductwork.',
  },
  {
    id: 9,
    question:
      'A 4-way ceiling cassette unit has adjustable louvres. What is the primary purpose of individual louvre control?',
    options: [
      'To increase the total cooling capacity of the cassette unit',
      'To direct airflow away from occupants and optimise air distribution',
      'To reduce the refrigerant charge required by the indoor unit',
      'To filter particulates from the air leaving the cassette',
    ],
    correctAnswer: 1,
    explanation:
      'Adjustable louvres allow airflow direction to be optimised for the room layout, avoiding direct air streams onto occupants (draughts) while ensuring good air distribution. Modern units offer individual louvre angle control via the controller.',
  },
  {
    id: 10,
    question: 'What is the purpose of a condensate pump on a fan coil unit?',
    options: [
      'To circulate chilled water through the cooling coil',
      'To boost the air pressure delivered by the unit fan',
      'To lift condensate to a drain point when gravity drainage is not possible',
      'To increase the static pressure across the drip tray',
    ],
    correctAnswer: 2,
    explanation:
      'When FCUs are positioned below the nearest drain connection or where gravity falls cannot be achieved, a condensate pump lifts the water to the drainage system. Pumps typically include a float switch and alarm contact.',
  },
  {
    id: 11,
    question:
      'For a VRF cassette unit, what determines the refrigerant pipe sizes to the indoor unit?',
    options: [
      'The ceiling void depth available above the unit',
      'The single-phase electrical supply current to the unit',
      'The condensate flow rate produced by the cooling coil',
      'The unit cooling/heating capacity and equivalent refrigerant pipe length',
    ],
    correctAnswer: 3,
    explanation:
      'Refrigerant pipe sizing depends on the unit capacity (refrigerant flow rate) and the equivalent pipe length including fittings. Manufacturer sizing tables must be followed precisely to ensure correct refrigerant distribution and oil return.',
  },
  {
    id: 12,
    question:
      'What minimum electrical protection is typically required for a fan coil unit with EC motor and electric reheat?',
    options: [
      'MCB protection with RCD where accessible to non-skilled persons',
      'A BS 3036 rewirable fuse on the fan motor circuit only',
      'Overload protection from the EC motor’s internal thermistor alone',
      'A dedicated three-phase supply for the EC motor',
    ],
    correctAnswer: 0,
    explanation:
      'FCUs require MCB protection sized for the total load (fan motor plus any electric reheat). RCD protection (30mA) is required where units are accessible to non-skilled persons per BS 7671. An adjacent isolator is also typically required for maintenance.',
  },
];

const faqs = [
  {
    question: 'What are the main differences between fan coil units and chilled beams?',
    answer:
      'Fan coil units use a fan to force air across coils, providing higher capacity in a compact size but with fan noise and energy consumption. They can handle latent loads (dehumidification) with condensate drainage. Chilled beams are passive or use induced airflow with no local fans - they are quieter and require less maintenance but cannot handle latent loads (no condensate collection) and need careful dewpoint control to prevent condensation.',
  },
  {
    question: 'How do I select between 2-pipe and 4-pipe fan coil systems?',
    answer:
      '2-pipe systems are simpler and cheaper to install but require building-wide changeover between heating and cooling modes - suitable for buildings with uniform loads. 4-pipe systems have independent heating and cooling coils allowing simultaneous operation in different zones - essential for buildings with diverse orientations, internal heat gains, or 24/7 areas requiring year-round cooling alongside perimeter heating.',
  },
  {
    question: 'What causes condensation problems with chilled water terminal units?',
    answer:
      'Condensation occurs when surface temperatures fall below the room air dewpoint. For FCUs, this is normal and managed via drip trays and drainage. For chilled beams without drainage, water temperature must stay above dewpoint (typically 14-16°C minimum). Problems arise from: low chilled water temperatures, high room humidity, inadequate dehumidification by the primary air system, or poor commissioning of water temperature controls.',
  },
  {
    question: 'What are the electrical requirements for fan coil unit installations?',
    answer:
      'Typical FCU electrical requirements include: single-phase 230V supply (some larger units need 3-phase), MCB protection sized for fan motor plus any electric reheat (typically 6-16A), local isolator within 1m for maintenance, control wiring (0-10V, DALI, or BACnet) to BMS, and sometimes separate supplies for condensate pumps. Ensure compliance with BS 7671 including RCD protection where applicable.',
  },
  {
    question: 'How do VAV boxes differ from fan coil units in terms of control strategy?',
    answer:
      'VAV boxes modulate supply airflow volume (via damper) while receiving air at constant temperature from a central AHU - they control capacity by varying airflow. FCUs typically receive water at constant temperature and control capacity by modulating water flow or fan speed - they handle their own conditioning locally. VAV systems are more energy-efficient for cooling but require careful minimum airflow settings to maintain ventilation.',
  },
  {
    question: 'What maintenance considerations affect terminal unit selection?',
    answer:
      'Key maintenance factors include: filter access frequency and ease (monthly for FCUs in dusty environments), condensate drain cleaning requirements, coil cleaning accessibility, fan/motor replacement complexity, and control component access. Ceiling-mounted units need adequate void space and access panels. Chilled beams require less maintenance than FCUs (no filters, fans, or condensate) but coil cleaning access is still needed.',
  },
];

const HNCModule8Section3_4 = () => {
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
            eyebrow="Module 8 · Section 3 · Subsection 4"
            title="Terminal Units"
            description="Fan coil units, chilled beams, cassettes, unit selection and control strategies"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Compare 2-pipe and 4-pipe fan coil unit configurations",
              "Distinguish between active and passive chilled beam operation",
              "Select appropriate terminal units for different applications",
              "Specify control valves and actuators for HVAC systems",
              "Understand EC motor advantages and electrical requirements",
              "Design condensate drainage systems for terminal units",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Fan Coil Units (FCUs)">
            <p>Fan coil units are the most common terminal devices in commercial HVAC systems. They consist of a fan, one or more heat exchanger coils, a filter, and a drip tray, all housed in a compact enclosure. FCUs provide localised heating and cooling with individual zone control capability.</p>
            <p><strong>FCU Configurations</strong></p>
            <p><strong>2-Pipe System</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single coil serves both heating and cooling</li>
              <li>One flow and one return pipe per unit</li>
              <li>Building-wide changeover required</li>
              <li>Lower capital cost, simpler pipework</li>
              <li>Suitable for uniform load buildings</li>
            </ul>
            <p><strong>4-Pipe System</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Separate heating and cooling coils</li>
              <li>Four pipes: CHW flow/return + HHW flow/return</li>
              <li>Simultaneous heating and cooling capability</li>
              <li>Higher capital cost, more complex</li>
              <li>Essential for diverse load buildings</li>
            </ul>
            <p><strong>FCU Mounting Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ceiling concealed:</strong> Above suspended ceiling — Offices, hotels - most common type</li>
              <li><strong>Ceiling exposed:</strong> Below ceiling, visible — Industrial, retail where voids unavailable</li>
              <li><strong>Floor standing:</strong> At floor level — Perimeter heating, glazed facades</li>
              <li><strong>Vertical:</strong> Wall or column mounted — Where floor/ceiling space limited</li>
              <li><strong>Horizontal ducted:</strong> In ceiling void with ductwork — Larger zones, distributed outlets</li>
            </ul>
            <p><strong>Typical FCU Specifications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cooling capacity:</strong> 1.5 - 15 kW sensible (typical office units)</li>
              <li><strong>Fan motor:</strong> 20 - 150W (EC motors preferred)</li>
              <li><strong>Airflow:</strong> 150 - 1500 m³/h (3-speed or variable)</li>
              <li><strong>Coil pressure drop:</strong> 20 - 50 kPa at design flow</li>
              <li><strong>Noise level:</strong> 30 - 45 dB(A) at 1m (speed dependent)</li>
            </ul>
            <p><strong>FCU components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fan section:</strong> Centrifugal fan, typically 3-speed or EC variable speed</li>
              <li><strong>Coil(s):</strong> Copper tube, aluminium fin heat exchanger(s)</li>
              <li><strong>Filter:</strong> G3/G4 panel filter, typically washable or disposable</li>
              <li><strong>Drip tray:</strong> Stainless steel or plastic, with drain connection</li>
              <li><strong>Casing:</strong> Galvanised steel, insulated to prevent condensation</li>
              <li><strong>Control valve(s):</strong> 2-way or 3-way, typically 15-20mm</li>
            </ul>
            <p><strong>Design consideration:</strong> FCU capacity is typically quoted at specific entering water and air temperatures. Verify design conditions match actual project parameters and apply derating factors where necessary.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Chilled Beams - Active and Passive">
            <p>Chilled beams provide space cooling (and sometimes heating) using chilled water coils mounted at ceiling level. They offer quiet, low-maintenance operation but are limited to sensible cooling only - latent loads must be handled by the primary air system or separate dehumidification.</p>
            <p><strong>Passive vs Active Chilled Beams</strong></p>
            <p><strong>Passive Chilled Beams</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No primary air connection - convection only</li>
              <li>Warm room air rises, contacts cold coil, falls</li>
              <li>Typical capacity: 150 - 300 W/m of beam</li>
              <li>Very quiet operation (no air movement noise)</li>
              <li>Limited cooling capacity</li>
              <li>Requires separate ventilation system</li>
            </ul>
            <p><strong>Active Chilled Beams</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Primary air supply through induction nozzles</li>
              <li>Venturi effect induces room air across coil</li>
              <li>Typical capacity: 300 - 600 W/m of beam</li>
              <li>Higher capacity than passive beams</li>
              <li>Provides ventilation air directly</li>
              <li>Primary air handles latent load</li>
            </ul>
            <p><strong>Active Chilled Beam Operation</strong></p>
            <p><strong>Induction principle:</strong> Primary conditioned air (typically 12-15°C) is supplied through small nozzles at high velocity. This creates a low-pressure zone that draws room air through the coil - the venturi or ejector effect.</p>
            <p><strong>Induction ratio:</strong> Typically 1:3 to 1:5, meaning for every 1 part primary air, 3-5 parts of room air are induced. This multiplies the apparent air supply rate without increasing ductwork size.</p>
            <p><strong>Discharge temperature:</strong> Mixed air (primary + induced) leaves at 16-18°C, well above the room dew point, eliminating condensation risk from the beam discharge.</p>
            <p><strong>Chilled Beam Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Cooling capacity:</strong> 150-300 W/m — 300-600 W/m</li>
              <li><strong>Heating capability:</strong> Limited (stratification issues) — Good (forced air distribution)</li>
              <li><strong>Primary air duct:</strong> Not required — Required</li>
              <li><strong>Ventilation:</strong> Separate system needed — Integrated</li>
              <li><strong>CHW temperature:</strong> &gt;14°C (above dewpoint) — 10-16°C (primary air dehumidifies)</li>
              <li><strong>Noise level:</strong> Silent — 20-35 NR (nozzle noise)</li>
            </ul>
            <p><strong>Critical: Condensation Prevention</strong></p>
            <p>Chilled beams (especially passive) have no condensate drainage provision. Condensation on beam surfaces causes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Water dripping onto occupants and furniture</li>
              <li>Ceiling tile staining and damage</li>
              <li>Mould and bacterial growth</li>
            </ul>
            <p><strong>Prevention:</strong> Maintain CHW temperature above room dewpoint. Typical office at 24°C, 50% RH has dewpoint of ~13°C. CHW is typically limited to 14-16°C with dewpoint monitoring and automatic CHW temperature rise.</p>
            <p><strong>Design note:</strong> Active chilled beams are specified per BS EN 15116. Ensure primary air is dehumidified to handle latent loads and maintain room dewpoint below CHW temperature.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Cassette Units and VAV Boxes">
            <p>Ceiling cassette units and VAV (Variable Air Volume) boxes represent different approaches to zone conditioning. Cassettes are self-contained terminal units (often DX or chilled water), while VAV boxes modulate airflow from a central air handling system.</p>
            <p><strong>Ceiling Cassette Units</strong></p>
            <p>Ceiling cassettes are compact, ceiling-recessed units that provide local heating and cooling. They are available in chilled water, DX (split/VRF), and heat pump configurations.</p>
            <p><strong>Cassette configurations:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>4-way:</strong> Air discharge in 4 directions, most common</li>
              <li><strong>2-way:</strong> Discharge in 2 opposite directions</li>
              <li><strong>1-way:</strong> Single direction discharge</li>
              <li><strong>Round flow:</strong> 360° circular discharge pattern</li>
            </ul>
            <p><strong>Typical specifications:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Capacity: 2-14 kW cooling</li>
              <li>Ceiling cut-out: 575×575mm to 950×950mm</li>
              <li>Ceiling void: minimum 250-350mm</li>
              <li>Noise: 28-45 dB(A) depending on speed</li>
            </ul>
            <p><strong>VRF/DX Cassette Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Medium:</strong> Chilled/hot water — Refrigerant (R410A, R32)</li>
              <li><strong>Pipework:</strong> Steel/copper, larger diameter — Copper, small diameter (6-16mm)</li>
              <li><strong>Leak risk:</strong> Water damage — Refrigerant release (F-gas implications)</li>
              <li><strong>Control:</strong> Valve + fan speed — Inverter compressor + fan</li>
              <li><strong>Maintenance:</strong> Filter, valve, fan — Filter, fan, refrigerant check</li>
            </ul>
            <p><strong>VAV Terminal Boxes</strong></p>
            <p>VAV boxes modulate the volume of conditioned air supplied to a zone. The central AHU provides air at constant temperature; capacity is controlled by varying airflow.</p>
            <p><strong>VAV box types:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pressure-independent:</strong> Maintains setpoint regardless of duct pressure changes</li>
              <li><strong>Pressure-dependent:</strong> Simpler, affected by system pressure</li>
              <li><strong>With reheat:</strong> Hot water or electric coil for heating</li>
              <li><strong>Fan-powered:</strong> Integral fan for constant room airflow</li>
            </ul>
            <p><strong>VAV control strategy:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Zone thermostat signals controller</li>
              <li>Controller modulates damper 0-100%</li>
              <li>Minimum position maintains ventilation</li>
              <li>Airflow sensor provides feedback</li>
            </ul>
            <p><strong>VAV Minimum Airflow Settings</strong></p>
            <p>VAV boxes have minimum and maximum airflow limits:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Minimum:</strong> Typically 20-30% of design airflow for ventilation requirements</li>
              <li><strong>Maximum:</strong> 100% design airflow (damper fully open)</li>
              <li><strong>Dead band:</strong> Range where no action occurs (typically 1-2°C)</li>
            </ul>
            <p>Setting minimums too low reduces energy but risks inadequate ventilation and poor air distribution. Too high wastes fan energy. Balance based on occupancy density and fresh air requirements.</p>
            <p><strong>Selection guide:</strong> VAV suits large open-plan areas with varying loads. Cassettes suit individual rooms or areas requiring independent control. Consider noise, ceiling void, and maintenance access in selection.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Control Valves, EC Motors, and Condensate Drainage">
            <p>Effective terminal unit operation depends on properly specified control components: valves for water flow modulation, efficient fan motors, and adequate condensate management. These elements significantly impact energy performance, comfort, and maintenance requirements.</p>
            <p><strong>Control Valve Types</strong></p>
            <p><strong>2-Way Valves</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Throttles flow through the coil</li>
              <li>System flow varies with demand</li>
              <li>Allows variable speed pumping</li>
              <li>Energy efficient - reduced pump power</li>
              <li>Requires pressure-independent control</li>
            </ul>
            <p><strong>3-Way Valves</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Bypasses water around the coil</li>
              <li>Maintains constant system flow</li>
              <li>Used with constant speed pumps</li>
              <li>Higher pump energy consumption</li>
              <li>Simpler system hydraulics</li>
            </ul>
            <p><strong>Valve Sizing and Authority</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Valve authority:</strong> Valve ΔP / (Valve ΔP + Circuit ΔP) — &gt;0.5 for good control</li>
              <li><strong>Valve Kvs:</strong> Size to achieve design ΔP at design flow — Typically Kvs 0.4 - 4.0 for FCUs</li>
              <li><strong>Connection size:</strong> Match coil connections — 15mm, 20mm, 25mm</li>
              <li><strong>Close-off pressure:</strong> Must exceed system static pressure — 100 - 400 kPa typical</li>
            </ul>
            <p><strong>Actuator Types</strong></p>
            <p><strong>Thermal actuators:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>On/off operation only</li>
              <li>Slow response (2-5 minutes)</li>
              <li>24V AC supply typical</li>
              <li>Low cost, simple</li>
            </ul>
            <p><strong>Modulating actuators:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Proportional positioning (0-100%)</li>
              <li>Fast response (30-90 seconds)</li>
              <li>0-10V DC or 4-20mA control signal</li>
              <li>Better temperature control</li>
            </ul>
            <p><strong>EC Fan Motors</strong></p>
            <p>Electronically Commutated (EC) motors are now standard in quality FCUs, replacing traditional AC induction motors with shaded-pole or PSC (permanent split capacitor) windings.</p>
            <p><strong>EC motor advantages:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>70-90% efficiency vs 25-50% for AC</li>
              <li>Efficient across full speed range</li>
              <li>Built-in speed control (0-10V)</li>
              <li>Lower heat generation</li>
              <li>Quieter operation</li>
              <li>Longer bearing life</li>
            </ul>
            <p><strong>Electrical requirements:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>230V AC single phase supply</li>
              <li>0-10V DC speed control signal</li>
              <li>Low in-rush current</li>
              <li>Power factor &gt;0.9</li>
              <li>EMC compliant (CE marked)</li>
            </ul>
            <p><strong>Condensate Drainage Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Minimum fall:</strong> 1:100 (1% or 10mm/m) — 1:50 preferred where possible</li>
              <li><strong>Pipe material:</strong> PVC, ABS, or copper — PVC-U most common</li>
              <li><strong>Pipe diameter:</strong> 21.5mm (3/4") minimum — Match FCU connection</li>
              <li><strong>Trap requirement:</strong> 50mm water seal minimum — Prevents air being drawn in</li>
              <li><strong>Air break:</strong> Tundish or visible gap — Required before connection to drainage</li>
            </ul>
            <p><strong>Condensate Pump Requirements</strong></p>
            <p>When gravity drainage is not achievable, condensate pumps are required:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pump type:</strong> Centrifugal mini-pump, typically 10-20W</li>
              <li><strong>Lift capacity:</strong> Typically 3-6m head</li>
              <li><strong>Flow rate:</strong> Match peak condensate production (0.5-2 l/hr typical)</li>
              <li><strong>Float switch:</strong> Activates pump when tray fills</li>
              <li><strong>High-level alarm:</strong> Volt-free contact to BMS</li>
              <li><strong>Electrical supply:</strong> Typically from FCU isolator or separate fused spur</li>
            </ul>
            <p><strong>FCU Electrical Installation Summary</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply:</strong> 230V single phase (check unit requirements)</li>
              <li><strong>Protection:</strong> MCB 6-16A depending on load, RCD where applicable</li>
              <li><strong>Isolation:</strong> Local isolator within 1m of unit</li>
              <li><strong>Control wiring:</strong> 0-10V fan speed, valve actuator, room sensor</li>
              <li><strong>BMS connection:</strong> Status, alarms, setpoint adjustment</li>
            </ul>
            <p><strong>Commissioning note:</strong> Terminal units require water flow balancing, air flow measurement (where ducted), control loop tuning, and condensate drainage testing before handover.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: FCU Selection for Office Zone</strong>
            </p>
            <p><strong>Scenario:</strong> Select a ceiling-concealed FCU for an office zone with 6 kW sensible cooling load and 2 kW heating load. The system uses 4-pipe chilled/hot water with 2-way valves.</p>
            <p>Given requirements:</p>
            <p>Cooling load: 6 kW sensible</p>
            <p>Heating load: 2 kW</p>
            <p>CHW: 6°C flow, 12°C return</p>
            <p>HHW: 70°C flow, 50°C return</p>
            <p>Room condition: 24°C, 50% RH</p>
            <p>Selection process:</p>
            <p>1. Select FCU with cooling capacity &gt;6 kW at design conditions</p>
            <p>2. Verify heating capacity &gt;2 kW</p>
            <p>3. Check noise level suits office (NR35-40 typically)</p>
            <p>4. Confirm ceiling void depth (typically 300mm minimum)</p>
            <p>Selected: Model FCU-600 (7.2 kW cooling, 3.1 kW heating)</p>
            <p>Fan: EC motor, 3 speeds (low/medium/high)</p>
            <p>Noise: NR32 at medium speed</p>
            <p>Water connections: 15mm (CHW), 15mm (HHW)</p>
            <p>Electrical: 230V, 95W, 0.5A running</p>
            <p>
              <strong>Example 2: Chilled Beam Dewpoint Analysis</strong>
            </p>
            <p><strong>Scenario:</strong> Determine the minimum chilled water temperature for passive chilled beams in a meeting room designed for 22°C, 50% RH.</p>
            <p>Given conditions:</p>
            <p>Room temperature: 22°C</p>
            <p>Relative humidity: 50%</p>
            <p>Dewpoint calculation:</p>
            <p>Using psychrometric chart or formula:</p>
            <p>Dewpoint = T - ((100 - RH)/5)</p>
            <p>Dewpoint = 22 - ((100 - 50)/5) = 22 - 10 = 12°C (approximate)</p>
            <p>More precise from psychrometric tables:</p>
            <p>Dewpoint at 22°C, 50% RH = 11.1°C</p>
            <p>Safety margin (typically 2-3°C above dewpoint):</p>
            <p>Minimum CHW temperature = 11.1 + 3 = 14.1°C</p>
            <p>Specify: CHW not below 14°C</p>
            <p>Implement dewpoint sensor to modulate CHW valve if humidity varies.</p>
            <p>
              <strong>Example 3: Control Valve Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size a 2-way control valve for an FCU with design water flow rate of 0.15 l/s and target valve pressure drop of 15 kPa.</p>
            <p>Given data:</p>
            <p>Water flow rate: 0.15 l/s = 0.54 m³/h</p>
            <p>Target valve ΔP: 15 kPa = 1.5 bar</p>
            <p>Coil ΔP at design flow: 20 kPa = 2.0 bar</p>
            <p>Kvs calculation:</p>
            <p>Kvs = Q × √(1/ΔP)</p>
            <p>Where Q in m³/h, ΔP in bar</p>
            <p>Kvs = 0.54 × √(1/1.5) = 0.54 × 0.816 = 0.44</p>
            <p>Valve authority check:</p>
            <p>Authority = Valve ΔP / (Valve ΔP + Coil ΔP)</p>
            <p>Authority = 15 / (15 + 20) = 15/35 = 0.43</p>
            <p>Authority 0.43 is acceptable but borderline</p>
            <p>Consider increasing valve ΔP to 20 kPa for better control</p>
            <p>Select: DN15 valve with Kvs = 0.4</p>
            <p>Actual ΔP at design flow = (0.54/0.4)² = 1.82 bar = 18.2 kPa</p>
            <p>Revised authority = 18.2/(18.2+20) = 0.48 (good)</p>
            <p>
              <strong>Example 4: EC vs AC Motor Energy Comparison</strong>
            </p>
            <p><strong>Scenario:</strong> Compare annual energy consumption of EC and AC motors for an FCU operating at 60% average speed for 3000 hours per year.</p>
            <p>Motor specifications:</p>
            <p>Full speed power: 80W</p>
            <p>Operating speed: 60% average</p>
            <p>Operating hours: 3000 h/year</p>
            <p><strong>AC motor (voltage-controlled):</strong></p>
            <p>Efficiency at 60% speed: ~35%</p>
            <p>Mechanical power at 60% speed: 80 × 0.6³ = 17.3W (cube law)</p>
            <p>Electrical input: 17.3 / 0.35 = 49W</p>
            <p>Annual energy: 49 × 3000 = 147 kWh</p>
            <p><strong>EC motor:</strong></p>
            <p>Efficiency at 60% speed: ~80%</p>
            <p>Mechanical power: 17.3W</p>
            <p>Electrical input: 17.3 / 0.80 = 21.6W</p>
            <p>Annual energy: 21.6 × 3000 = 65 kWh</p>
            <p>Annual saving: 147 - 65 = 82 kWh per unit</p>
            <p>At £0.15/kWh: £12.30/year saving per FCU</p>
            <p>Building with 100 FCUs: £1,230/year</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Terminal Unit Specification Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Confirm cooling and heating capacity at actual design conditions</li>
              <li>Verify noise level suits application (specify NR rating required)</li>
              <li>Check physical dimensions fit available ceiling void/floor space</li>
              <li>Ensure access for filter cleaning and maintenance</li>
              <li>Specify control valve type, size, and actuator (0-10V preferred)</li>
              <li>Confirm electrical load and protection requirements</li>
              <li>Plan condensate drainage route and verify falls achievable</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum CHW temperature for passive beams: <strong>14-16°C</strong> (above dewpoint)</li>
              <li>Active chilled beam induction ratio: <strong>1:3 to 1:5</strong></li>
              <li>Condensate drain minimum fall: <strong>1:100 (1%)</strong></li>
              <li>Control valve authority target: <strong>&gt;0.5</strong></li>
              <li>EC motor efficiency at part load: <strong>70-90%</strong></li>
              <li>FCU coil pressure drop typical: <strong>20-50 kPa</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using 3-way valves with variable speed pumps</strong> - wastes pump energy</li>
                <li><strong>Undersizing valve authority</strong> - poor temperature control, hunting</li>
                <li><strong>Insufficient condensate drainage fall</strong> - standing water, biological growth</li>
                <li><strong>Ignoring dewpoint for chilled beams</strong> - condensation damage</li>
                <li><strong>Inadequate ceiling void for FCUs</strong> - maintenance access problems</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Chilled water systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section3-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                System selection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section3_4;
