/**
 * Module 8 · Section 2 · Subsection 2 — Air Handling Units
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   AHU components, configurations, coil selection, filtration and acoustic considerations
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

const TITLE = 'Air Handling Units - HNC Module 8 Section 2.2';
const DESCRIPTION =
  'Master air handling unit design and selection: AHU components, configurations, heating and cooling coil selection, filtration grades (G4, F7, F9, HEPA), acoustic considerations and electrical requirements for building services ventilation systems.';

const quickCheckQuestions = [
  {
    id: 'ahu-component-sequence',
    question: 'In a typical AHU, what is the correct sequence of components from inlet to outlet?',
    options: [
      'Filter, damper, fan, coils',
      'Damper, filter, coils, fan',
      'Fan, filter, coils, damper',
      'Coils, filter, damper, fan',
    ],
    correctIndex: 1,
    explanation:
      'The standard AHU component sequence is: inlet damper (for air control and isolation), filter section (to protect coils and improve air quality), heating/cooling coils (for temperature conditioning), then the supply fan (to distribute conditioned air). This sequence ensures the fan handles clean, conditioned air.',
  },
  {
    id: 'filter-grade-selection',
    question:
      'Which filter grade combination would be appropriate for a hospital operating theatre?',
    options: [
      'A single G4 panel filter on the air intake',
      'F7 main filter with no pre-filter or terminal filter',
      'G4 pre-filter, F7 intermediate, HEPA terminal',
      'G4 pre-filter only, with HEPA fitted at the grille',
    ],
    correctIndex: 2,
    explanation:
      'Operating theatres require multi-stage filtration: G4 pre-filter to remove coarse particles and protect subsequent stages, F7 intermediate filter for fine particles, and HEPA terminal filters (H13 or H14) to achieve the required air cleanliness. This achieves ISO Class 5 or better air quality.',
  },
  {
    id: 'coil-selection-factor',
    question:
      'When selecting a cooling coil, what is the primary factor that determines the coil face velocity?',
    options: [
      'The chilled water flow and return temperatures',
      'The number of rows and the fin spacing of the coil',
      'The dew point of the entering air stream',
      'Air volume flow rate and coil face area',
    ],
    correctIndex: 3,
    explanation:
      'Coil face velocity is calculated by dividing the air volume flow rate by the coil face area (V = Q/A). Typical face velocities are 2.0-2.5 m/s for cooling coils to ensure adequate heat transfer whilst avoiding moisture carryover. Higher velocities increase pressure drop and risk condensate entrainment.',
  },
  {
    id: 'acoustic-attenuation',
    question: 'What is the primary purpose of attenuators in an AHU system?',
    options: [
      'To filter particles from the air',
      'To balance air distribution',
      'To increase airflow velocity',
      'To reduce noise transmission through ductwork',
    ],
    correctIndex: 3,
    explanation:
      'Attenuators (silencers) reduce noise transmission through the ductwork system. They typically use acoustic absorption materials to attenuate fan noise and prevent it from reaching occupied spaces. Selection is based on required noise reduction across frequency bands and acceptable pressure drop.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which component in an AHU controls the proportion of fresh air to recirculated air?',
    options: [
      'Supply fan',
      'Mixing dampers',
      'Heating coil',
      'Filter section',
    ],
    correctAnswer: 1,
    explanation:
      'Mixing dampers control the proportion of fresh (outside) air to recirculated (return) air. They work in conjunction with each other - as fresh air dampers open, recirculation dampers close proportionally. This enables economiser control for free cooling when outside conditions are suitable.',
  },
  {
    id: 2,
    question: 'What is the typical face velocity range for a heating coil in an AHU?',
    options: [
      '4.0-5.0 m/s',
      '0.5-1.0 m/s',
      '2.5-3.5 m/s',
      '1.5-2.0 m/s',
    ],
    correctAnswer: 2,
    explanation:
      'Heating coils typically operate at face velocities of 2.5-3.5 m/s. Unlike cooling coils, there is no moisture carryover concern, so slightly higher velocities are acceptable. However, excessive velocity increases pressure drop and can cause noise issues.',
  },
  {
    id: 3,
    question: 'A G4 filter is classified as which type?',
    options: [
      'Fine filter',
      'HEPA filter',
      'Ultra-fine filter',
      'Coarse filter',
    ],
    correctAnswer: 3,
    explanation:
      'G4 is classified as a coarse filter under EN ISO 16890 (replacing the older EN 779 standard). G-class filters (G1-G4) are coarse filters used as pre-filters to protect more efficient downstream filters and HVAC equipment from larger particles.',
  },
  {
    id: 4,
    question: 'What is the primary purpose of a droplet eliminator after a cooling coil?',
    options: [
      'To prevent condensate carryover into the ductwork',
      'To increase cooling capacity',
      'To reduce fan power consumption',
      'To improve filtration efficiency',
    ],
    correctAnswer: 0,
    explanation:
      'Droplet eliminators (also called moisture eliminators) prevent condensate droplets from being carried into the supply ductwork. They are essential after cooling coils operating below the dew point, as water carryover can cause duct corrosion, microbial growth, and water damage.',
  },
  {
    id: 5,
    question:
      'Which AHU configuration is most appropriate for a building requiring close temperature and humidity control?',
    options: [
      'Variable air volume (VAV)',
      'Dual duct',
      'Heat recovery only',
      'Single duct constant volume',
    ],
    correctAnswer: 1,
    explanation:
      'Dual duct systems provide hot and cold air streams that are mixed at zone level, offering excellent temperature control. They are particularly suited to applications requiring precise conditions, such as laboratories or museums, though they have higher capital and energy costs.',
  },
  {
    id: 6,
    question:
      'What minimum filter efficiency is typically required for supply air to general office spaces?',
    options: [
      'G4 (coarse)',
      'H13 (HEPA)',
      'F7 (fine)',
      'No filtration required',
    ],
    correctAnswer: 2,
    explanation:
      'F7 filters (ePM1 50-65% under ISO 16890) are typically specified for office and commercial spaces. They provide good protection against fine particles and allergens whilst maintaining reasonable pressure drop. G4 pre-filters extend F7 filter life.',
  },
  {
    id: 7,
    question:
      'When specifying the electrical supply for an AHU, what factor primarily determines motor starter type?',
    options: [
      'Filter type',
      'Building height',
      'Ductwork material',
      'Motor power rating',
    ],
    correctAnswer: 3,
    explanation:
      'Motor power rating is the primary factor in starter selection. Small motors (&lt;7.5 kW) typically use DOL starters, medium motors may use star-delta starters, and larger motors often require soft starters or VSDs to limit starting current and mechanical stress.',
  },
  {
    id: 8,
    question:
      'What is the typical sound power level reduction expected from a standard rectangular attenuator?',
    options: [
      '15-25 dB',
      '35-45 dB',
      '5-10 dB',
      '50-60 dB',
    ],
    correctAnswer: 0,
    explanation:
      'Standard rectangular attenuators typically achieve 15-25 dB sound power level reduction, depending on length, splitter spacing, and frequency. Multiple attenuators or longer units may be needed for critical applications. Selection must balance acoustic performance against pressure drop.',
  },
  {
    id: 9,
    question:
      'What is the primary advantage of a draw-through AHU configuration compared to blow-through?',
    options: [
      'It removes the need for a droplet eliminator after the cooling coil',
      'It provides more even airflow distribution across the coil face',
      'It allows lower-grade filters to be used throughout the unit',
      'It eliminates fan motor heat being added to the supply air',
    ],
    correctAnswer: 1,
    explanation:
      'In draw-through configuration the fan is downstream of the coils, drawing air evenly across the full coil face for good heat transfer. The trade-off is that fan motor heat (typically 2-3°C rise) is added to the conditioned air and must be allowed for in coil sizing. Blow-through avoids the added heat but gives less even airflow over the coils.',
  },
  {
    id: 10,
    question:
      'Which control strategy optimises AHU energy consumption by using outdoor air for cooling when conditions permit?',
    options: [
      'Night setback',
      'Zone reset',
      'Economiser control',
      'Demand control ventilation',
    ],
    correctAnswer: 2,
    explanation:
      'Economiser control (free cooling) uses outdoor air for cooling when the outside temperature and humidity are suitable, reducing mechanical cooling load. Mixed air dampers modulate to introduce maximum fresh air when outdoor conditions are favourable, significantly reducing energy consumption.',
  },
  {
    id: 11,
    question: 'What document must be provided for AHU commissioning to verify system performance?',
    options: [
      'The manufacturer’s warranty certificate for the fan motor',
      'The fire risk assessment for the plant room',
      'The PAT testing records for the control panel',
      'Design data including air volumes, pressures, temperatures and electrical loads',
    ],
    correctAnswer: 3,
    explanation:
      'Commissioning requires comprehensive design data including design air volumes, system pressures (fan total pressure, component pressure drops), design temperatures (on/off coils), electrical loads, and noise criteria. This enables verification that installed performance matches design intent.',
  },
  {
    id: 12,
    question:
      'What is the typical maintenance interval for replacing F7 filters in a commercial AHU?',
    options: [
      '6-12 months depending on loading',
      'Every week regardless of loading',
      'Once every 5-10 years over the AHU lifetime',
      'Only when the fan motor is replaced',
    ],
    correctAnswer: 0,
    explanation:
      'F7 filters typically require replacement every 6-12 months, depending on air quality, operating hours, and filter loading. Differential pressure monitoring indicates when filters approach their final pressure drop limit and require replacement. Pre-filters extend main filter life.',
  },
];

const faqs = [
  {
    question: 'What is the difference between draw-through and blow-through AHU configurations?',
    answer:
      'In a draw-through configuration, air is pulled through the filter and coil sections by the fan located downstream. This means the coil section is under negative pressure. In blow-through, the fan pushes air through the components. Draw-through is more common as it provides even airflow across coils, but the fan motor heat is added to supply air. Blow-through keeps motor heat separate but requires more robust filter frames to handle positive pressure.',
  },
  {
    question: 'How do I select the correct filter grades for my application?',
    answer:
      'Filter selection depends on the application and air quality requirements. General ventilation uses G4 pre-filter with F7 main filter. Healthcare requires F7 with potential HEPA terminals. Cleanrooms need HEPA or ULPA filters. Always use pre-filters to protect expensive fine filters. Consider pressure drop impact on fan energy and maintenance access for filter replacement when selecting housing size.',
  },
  {
    question: 'What electrical supplies and controls are typically required for an AHU?',
    answer:
      'AHUs require electrical supplies for fans (largest load), damper actuators (typically 24V AC or 230V), control panel, sensors, and potentially electric heaters. The control panel houses motor starters/VSDs, BMS interface, safety interlocks, and protection devices. Three-phase supply is common for larger fans. Provision for differential pressure switches, temperature sensors, and fire/smoke detection is essential.',
  },
  {
    question: 'Why is acoustic treatment important in AHU design?',
    answer:
      'AHU fans generate significant noise across a range of frequencies. Without attenuation, this noise transmits through ductwork to occupied spaces, causing discomfort and failing to meet building regulations (Approved Document E) or BREEAM requirements. Attenuators, acoustic lining, and anti-vibration mounts are essential. Breakout noise from AHU casings and ductwork must also be considered, particularly for plant rooms adjacent to occupied spaces.',
  },
  {
    question: 'How is cooling coil capacity calculated?',
    answer:
      "Cooling coil capacity is determined by the air volume flow rate and required temperature drop, using Q = m × Cp × ΔT for sensible cooling. For dehumidification, latent heat removal must also be calculated. Coil selection considers face velocity (typically 2.0-2.5 m/s), rows depth, fin spacing, and water flow rate. Manufacturers' selection software calculates performance for specific coil geometries and operating conditions.",
  },
  {
    question: 'What commissioning tests are required for AHUs?',
    answer:
      'AHU commissioning includes: verifying air volume flow rates match design, measuring fan total pressure and comparing to design, checking coil on/off temperatures and capacities, confirming filter pressure drops, testing all safety interlocks (fire dampers, smoke detection, frost protection), verifying control sequences operate correctly, measuring electrical loads, and conducting noise surveys. Results are recorded on commissioning sheets and included in O&M documentation.',
  },
];

const HNCModule8Section2_2 = () => {
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
            eyebrow="Module 8 · Section 2 · Subsection 2"
            title="Air Handling Units"
            description="AHU components, configurations, coil selection, filtration and acoustic considerations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Identify and explain the function of all AHU components",
              "Select appropriate filter grades for different applications",
              "Understand heating and cooling coil selection criteria",
              "Specify acoustic treatment for noise control",
              "Design electrical supplies and control systems for AHUs",
              "Commission and verify AHU performance against design data",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="AHU Components and Functions">
            <p>Air Handling Units (AHUs) are factory-assembled enclosures containing components to condition and distribute air for heating, ventilation and air conditioning systems. Understanding each component's function is essential for proper selection, installation and maintenance.</p>
            <p><strong>Primary AHU Components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Intake/mixing section:</strong> Fresh air inlet with weather louvres, mixing dampers for recirculated air</li>
              <li><strong>Filter section:</strong> Pre-filters (G4) and main filters (F7/F9) to remove airborne particles</li>
              <li><strong>Heating coil:</strong> LTHW, steam, or electric heater battery for air heating</li>
              <li><strong>Cooling coil:</strong> Chilled water or DX refrigerant coil for cooling and dehumidification</li>
              <li><strong>Humidifier:</strong> Steam injection or evaporative humidifier for moisture addition</li>
              <li><strong>Supply fan:</strong> Centrifugal or plug fan to deliver air at required volume and pressure</li>
              <li><strong>Attenuators:</strong> Acoustic silencers to reduce noise transmission</li>
            </ul>
            <p><strong>Component Arrangement - Typical Sequence</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1:</strong> Intake louvre/damper — Weather protection, isolation, air volume control</li>
              <li><strong>2:</strong> Mixing box — Blend fresh and recirculated air</li>
              <li><strong>3:</strong> Pre-filter (G4) — Remove coarse particles, protect main filter</li>
              <li><strong>4:</strong> Heating coil — Pre-heat (frost protection), main heating</li>
              <li><strong>5:</strong> Cooling coil — Sensible and latent cooling</li>
              <li><strong>6:</strong> Droplet eliminator — Prevent condensate carryover</li>
              <li><strong>7:</strong> Main filter (F7) — Fine particle filtration</li>
              <li><strong>8:</strong> Supply fan — Air movement at design volume/pressure</li>
              <li><strong>9:</strong> Attenuator — Noise reduction before distribution</li>
            </ul>
            <p><strong>Damper Types and Applications</strong></p>
            <p>Volume Control Dampers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Opposed blade - linear characteristic</li>
              <li>• Parallel blade - quick acting</li>
              <li>• Modulating for flow control</li>
              <li>• Two-position for isolation</li>
            </ul>
            <p>Fire and Smoke Dampers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Fire dampers - fusible link/motorised</li>
              <li>• Smoke dampers - BMS controlled</li>
              <li>• Combined fire/smoke dampers</li>
              <li>• Require regular testing (6/12 monthly)</li>
            </ul>
            <p><strong>Design consideration:</strong> AHU component arrangement affects performance and maintenance. Ensure adequate access for filter changes, coil cleaning, and fan belt adjustment. Minimum 600mm clear space is required for service access.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Heating and Cooling Coil Selection">
            <p>Coil selection is critical to AHU performance. Heating and cooling coils must be sized to meet design loads whilst maintaining acceptable face velocities and pressure drops. Understanding coil characteristics enables optimal selection.</p>
            <p><strong>Heating Coils</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>LTHW (low temperature hot water) most common</li>
              <li>Typical flow temperature: 70-80°C</li>
              <li>Face velocity: 2.5-3.5 m/s acceptable</li>
              <li>Steam coils for rapid response</li>
              <li>Electric heaters for small loads/no pipework</li>
              <li>Frost coil for outdoor air pre-heat</li>
            </ul>
            <p><strong>Cooling Coils</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Chilled water (CHW) most common</li>
              <li>Typical flow temperature: 6-12°C</li>
              <li>Face velocity: 2.0-2.5 m/s maximum</li>
              <li>Direct expansion (DX) for smaller units</li>
              <li>Condensate drainage essential</li>
              <li>Droplet eliminator required below dew point</li>
            </ul>
            <p><strong>Coil Selection Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Face velocity:</strong> 2.5-3.5 m/s — 2.0-2.5 m/s</li>
              <li><strong>Rows typical:</strong> 1-2 rows — 4-8 rows</li>
              <li><strong>Fin spacing:</strong> 2.5-4 fins/cm — 3-5 fins/cm</li>
              <li><strong>Pressure drop (air):</strong> 50-100 Pa — 100-200 Pa</li>
              <li><strong>Water velocity:</strong> 0.5-1.5 m/s — 0.5-1.5 m/s</li>
            </ul>
            <p><strong>Coil Capacity Calculation</strong></p>
            <p>Sensible heat transfer:</p>
            <p>Q = m × Cp × ΔT</p>
            <p>Where:</p>
            <p>Q = Heat transfer rate (kW)</p>
            <p>m = Mass flow rate of air (kg/s)</p>
            <p>Cp = Specific heat capacity (1.02 kJ/kg·K for air)</p>
            <p>ΔT = Temperature difference (K or °C)</p>
            <p>Example: 2.5 m³/s at 1.2 kg/m³, heating from 10°C to 20°C</p>
            <p>m = 2.5 × 1.2 = 3.0 kg/s</p>
            <p>Q = 3.0 × 1.02 × 10 = 30.6 kW</p>
            <p><strong>Critical Design Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Frost protection:</strong> Pre-heat coil or face/bypass damper for sub-zero outdoor air</li>
              <li><strong>Condensate:</strong> Cooling coils must drain to trapped condensate line</li>
              <li><strong>Carryover:</strong> Keep cooling coil face velocity &lt;2.5 m/s to prevent droplet carryover</li>
              <li><strong>Control valves:</strong> Size for design flow with authority &gt;0.5</li>
              <li><strong>Water treatment:</strong> Essential to prevent coil fouling and corrosion</li>
            </ul>
            <p><strong>Selection tip:</strong> Use manufacturer's selection software for accurate coil sizing. Input design conditions and verify that selected coil meets duty within acceptable pressure drop limits for both air and water sides.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Filtration Systems and Filter Grades">
            <p>Air filtration protects building occupants, maintains indoor air quality, and preserves HVAC equipment. Filter selection depends on application requirements, with multi-stage filtration providing optimal performance and economy.</p>
            <p><strong>Filter Classifications (EN ISO 16890)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>G4:</strong> ISO Coarse &gt;50% — Coarse — Pre-filter, equipment protection</li>
              <li><strong>F7:</strong> ePM1 50-65% — Fine — Offices, retail, general HVAC</li>
              <li><strong>F9:</strong> ePM1 &gt;80% — Fine — Healthcare, laboratories</li>
              <li><strong>H13:</strong> HEPA 99.95% — HEPA — Operating theatres, cleanrooms</li>
              <li><strong>H14:</strong> HEPA 99.995% — HEPA — Pharmaceutical, aseptic areas</li>
            </ul>
            <p><strong>Multi-Stage Filtration Strategy</strong></p>
            <p><strong>Stage 1: Pre-filter</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• G4 panel or bag filter</li>
              <li>• Removes coarse particles (&gt;10μm)</li>
              <li>• Protects main filter</li>
              <li>• Low cost, easy replacement</li>
              <li>• Change every 1-3 months</li>
            </ul>
            <p><strong>Stage 2: Main Filter</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• F7 or F9 bag/compact filter</li>
              <li>• Removes fine particles (1-10μm)</li>
              <li>• Main air quality protection</li>
              <li>• Higher cost, longer life</li>
              <li>• Change every 6-12 months</li>
            </ul>
            <p><strong>Stage 3: Final Filter</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• HEPA terminal filter</li>
              <li>• Removes ultrafine particles</li>
              <li>• Critical applications only</li>
              <li>• Highest cost</li>
              <li>• Change every 2-5 years</li>
            </ul>
            <p><strong>Application Filter Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Office/retail:</strong> G4 — F7 — -</li>
              <li><strong>Hospital wards:</strong> G4 — F7/F9 — -</li>
              <li><strong>Operating theatre:</strong> G4 — F9 — H13/H14</li>
              <li><strong>Cleanroom ISO 7:</strong> G4 — F9 — H13</li>
              <li><strong>Cleanroom ISO 5:</strong> G4 — F9 — H14/ULPA</li>
            </ul>
            <p><strong>Filter Pressure Drop Monitoring</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Initial pressure drop:</strong> Clean filter pressure drop at design velocity</li>
              <li><strong>Final pressure drop:</strong> Maximum allowable before replacement (typically 2-3× initial)</li>
              <li><strong>Differential pressure switch:</strong> Provides alarm when filter approaches final pressure drop</li>
              <li><strong>BMS integration:</strong> Continuous monitoring enables predictive maintenance</li>
              <li><strong>Energy impact:</strong> Dirty filters increase fan energy consumption significantly</li>
            </ul>
            <p><strong>Maintenance note:</strong> Filter replacement is a significant operational cost. Using pre-filters extends main filter life by 50% or more. Always replace pre-filters before they become fully loaded to protect downstream components.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Acoustic Treatment and Electrical Systems">
            <p>AHU acoustic treatment and electrical systems are essential for occupant comfort and reliable operation. Noise control must be designed holistically, considering all transmission paths. Electrical systems must provide safe, efficient power distribution with appropriate controls.</p>
            <p><strong>Acoustic Treatment Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Rectangular attenuator:</strong> Ductwork noise reduction — 15-25 dB (frequency dependent)</li>
              <li><strong>Circular attenuator:</strong> Spigot/branch attenuation — 10-20 dB</li>
              <li><strong>Acoustic lining:</strong> Ductwork internal absorption — 3-10 dB per metre</li>
              <li><strong>Flexible connection:</strong> Vibration isolation — Structure-borne break</li>
              <li><strong>Anti-vibration mounts:</strong> Fan/motor isolation — 85-95% vibration reduction</li>
            </ul>
            <p><strong>Noise Transmission Paths</strong></p>
            <p>Airborne Paths:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Supply ductwork to diffusers</li>
              <li>• Return ductwork from grilles</li>
              <li>• AHU casing breakout</li>
              <li>• Ductwork breakout through walls</li>
            </ul>
            <p>Structure-borne Paths:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Fan vibration through mounts</li>
              <li>• Ductwork connections</li>
              <li>• Pipework connections</li>
              <li>• Building structure transmission</li>
            </ul>
            <p><strong>AHU Electrical Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply fan motor:</strong> 400V 3-phase — Largest electrical load, VSD recommended</li>
              <li><strong>Extract fan motor:</strong> 400V 3-phase — VSD for VAV systems</li>
              <li><strong>Control panel:</strong> 230V single-phase — BMS interface, safety circuits</li>
              <li><strong>Damper actuators:</strong> 24V AC or 230V — Spring-return for fire dampers</li>
              <li><strong>Electric heater:</strong> 400V 3-phase — SCR control, airflow interlock required</li>
              <li><strong>Humidifier:</strong> 400V 3-phase — Steam generator has high power demand</li>
            </ul>
            <p><strong>Control Panel Requirements</strong></p>
            <p><strong>Power Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Main isolator (lockable)</li>
              <li>• Motor starters or VSDs</li>
              <li>• Motor protection (overload, phase loss)</li>
              <li>• Control circuit transformer</li>
              <li>• Circuit breakers for auxiliaries</li>
            </ul>
            <p><strong>Control Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• BMS interface (BACnet/Modbus)</li>
              <li>• Safety interlock relay</li>
              <li>• Fire alarm interface</li>
              <li>• Differential pressure switches</li>
              <li>• Temperature sensors/transmitters</li>
            </ul>
            <p><strong>Safety Interlocks Required</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Airflow proving:</strong> Electric heater disabled without adequate airflow</li>
              <li><strong>Frost protection:</strong> Coil frost stat stops fan, opens LTHW valve</li>
              <li><strong>Fire alarm:</strong> Fans stop, fire dampers close on fire signal</li>
              <li><strong>Smoke detection:</strong> Duct smoke detectors stop AHU</li>
              <li><strong>Filter alarm:</strong> High differential pressure indicates blocked filter</li>
              <li><strong>Motor protection:</strong> Overload and phase failure protection</li>
            </ul>
            <p><strong>VSD Benefits for AHU Fans</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy savings:</strong> Fan power varies with cube of speed (affinity laws)</li>
              <li><strong>Soft start:</strong> Reduced mechanical stress, no starting current surge</li>
              <li><strong>Precise control:</strong> Maintain duct pressure or CO₂ setpoint</li>
              <li><strong>Noise reduction:</strong> Lower speed = lower noise</li>
              <li><strong>Extended belt life:</strong> Gradual acceleration reduces wear</li>
            </ul>
            <p><strong>Commissioning requirement:</strong> All safety interlocks must be tested and witnessed during commissioning. Document test results including: fire alarm response, frost stat operation, filter pressure switch setpoints, and motor protection settings.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Ventilation principles
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section2-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fan selection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section2_2;
