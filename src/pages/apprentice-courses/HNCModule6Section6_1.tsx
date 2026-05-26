/**
 * Module 6 · Section 6 · Subsection 1 — Passive Design Principles
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   Solar orientation, natural ventilation, daylighting, thermal mass and passive cooling strategies for energy-efficient buildings
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

const TITLE = 'Passive Design Principles - HNC Module 6 Section 6.1';
const DESCRIPTION =
  'Master passive design principles for building services: solar orientation, natural ventilation, daylighting strategies, thermal mass utilisation, and passive cooling techniques for energy-efficient buildings.';

const quickCheckQuestions = [
  {
    id: 'passive-design-definition',
    question: 'What is the primary objective of passive design in buildings?',
    options: [
      'To increase renewable energy generation',
      'To eliminate all electrical systems',
      'To maximise mechanical system efficiency',
      'To reduce energy demand through building form and fabric',
    ],
    correctIndex: 3,
    explanation:
      'Passive design aims to reduce energy demand by utilising building form, orientation, fabric, and natural forces (sun, wind, thermal mass) to provide heating, cooling, and lighting with minimal mechanical intervention.',
  },
  {
    id: 'solar-orientation',
    question:
      'For a building in the UK, which facade orientation receives the most consistent solar gain throughout the year?',
    options: [
      'North-facing',
      'South-facing',
      'West-facing',
      'East-facing',
    ],
    correctIndex: 1,
    explanation:
      "South-facing facades in the UK (and Northern Hemisphere) receive the most consistent solar gain. The sun's path is lower in winter, allowing deeper penetration, while summer sun angles are higher and easier to shade.",
  },
  {
    id: 'stack-ventilation',
    question: 'Stack effect ventilation relies primarily on:',
    options: [
      'Because I²R losses cause heat that cannot dissipate',
      'Temperature differences creating buoyancy',
      'Check members maintain their development commitments',
      'A device that converts DC to AC',
    ],
    correctIndex: 1,
    explanation:
      'Stack effect (or buoyancy-driven ventilation) relies on warm air being less dense than cool air. Warm air rises and exits at high level, drawing in cooler replacement air at low level - creating natural air movement without mechanical assistance.',
  },
  {
    id: 'thermal-mass',
    question: 'High thermal mass materials in buildings help to:',
    options: [
      'It provides quick wins by clearing small debts first',
      'Form a neat hook and ensure full contact with terminal',
      'To maintain all conductive parts at the same potential',
      'Moderate temperature swings by absorbing and releasing heat',
    ],
    correctIndex: 3,
    explanation:
      'Thermal mass (concrete, masonry, water) absorbs heat when surroundings are warm and releases it when cooler. This moderates temperature swings, reducing peak heating and cooling loads and improving thermal comfort.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "The 'fabric first' approach to building design prioritises:",
    options: [
      'Installing the largest possible heating system',
      'Reducing energy demand through building envelope performance',
      'Using renewable energy to offset poor fabric',
      'Maximising window areas for views',
    ],
    correctAnswer: 1,
    explanation:
      'Fabric first prioritises reducing energy demand through excellent insulation, airtightness, and thermal bridging reduction before sizing mechanical systems. This approach results in smaller, more efficient building services.',
  },
  {
    id: 2,
    question:
      'In the UK, what solar altitude angle should be used when designing summer shading for south-facing windows?',
    options: [
      '90°',
      '23.5°',
      '60-65°',
      '45°',
    ],
    correctAnswer: 2,
    explanation:
      'At UK latitudes (51-56°N), the summer sun altitude reaches approximately 60-65° at solar noon in June. Horizontal overhangs should be designed to shade windows at these angles while allowing lower winter sun to penetrate.',
  },
  {
    id: 3,
    question: 'Cross ventilation in buildings is most effective when:',
    options: [
      'Cools the building structure overnight using cool night air',
      'Ultra-low energy demand through exceptional fabric and airtightness',
      'Low afternoon sun angles make horizontal shading ineffective',
      'Openings are on opposite or adjacent walls with clear internal paths',
    ],
    correctAnswer: 3,
    explanation:
      'Cross ventilation requires inlet and outlet openings on opposite or adjacent walls, with clear internal air paths. Wind pressure differences drive airflow through the space, providing effective natural cooling and fresh air.',
  },
  {
    id: 4,
    question: 'A daylight factor of 5% in an office space indicates:',
    options: [
      'Adequate daylight for most office tasks',
      'Poor daylight provision requiring artificial lighting',
      'Excessive daylight likely to cause glare',
      'Daylight only sufficient for circulation areas',
    ],
    correctAnswer: 0,
    explanation:
      'Daylight factor is the ratio of internal to external illuminance. 5% is generally adequate for office work (2% minimum for circulation, 5% for working areas). Higher values may require glare control measures.',
  },
  {
    id: 5,
    question: 'Night purge ventilation is a passive cooling strategy that:',
    options: [
      'Operates mechanical cooling only at night',
      'Cools the building structure overnight using cool night air',
      'Increases thermal mass effectiveness',
      'Removes pollutants accumulated during the day',
    ],
    correctAnswer: 1,
    explanation:
      "Night purge ventilation uses cooler night-time air to remove heat stored in the building's thermal mass during the day. The cooled mass then absorbs heat gains the following day, reducing peak temperatures.",
  },
  {
    id: 6,
    question: 'Which glazing property is most important for controlling solar heat gain?',
    options: [
      'U-value',
      'Visible light transmittance',
      'g-value (solar factor)',
      'Frame material',
    ],
    correctAnswer: 2,
    explanation:
      'The g-value (solar factor or SHGC) indicates the proportion of solar radiation transmitted through glazing. Lower g-values reduce solar heat gain - critical for preventing overheating in highly glazed buildings.',
  },
  {
    id: 7,
    question: 'Exposed concrete soffits in offices contribute to passive design by:',
    options: [
      'Reducing acoustic reverberation',
      'Reducing floor-to-floor heights',
      'Improving fire resistance',
      'Providing accessible thermal mass',
    ],
    correctAnswer: 3,
    explanation:
      'Exposed concrete soffits provide accessible thermal mass that can absorb heat during the day and release it at night. Suspended ceilings isolate the thermal mass, reducing its effectiveness in moderating temperatures.',
  },
  {
    id: 8,
    question: 'The optimum depth for daylit spaces in side-lit buildings is typically:',
    options: [
      '1.5 to 2.5 times the window head height',
      '3 to 4 times the window head height',
      'Equal to window head height',
      'Unlimited with adequate glazing',
    ],
    correctAnswer: 0,
    explanation:
      'Useful daylight penetration is typically limited to 1.5-2.5 times the window head height from the facade. Deeper spaces require toplighting (rooflights) or light shelves to achieve adequate daylight levels.',
  },
  {
    id: 9,
    question: 'A building designed with a narrow floor plate (12-15m) primarily enables:',
    options: [
      'Openings are on opposite or adjacent walls with clear internal paths',
      'Cross ventilation and daylight penetration from both sides',
      'Ultra-low energy demand through exceptional fabric and airtightness',
      'Storing latent heat during phase transitions',
    ],
    correctAnswer: 1,
    explanation:
      'Narrow floor plates (12-15m) allow natural ventilation airflow paths and daylight penetration from both facades to the building core. This is a fundamental passive design strategy reducing mechanical cooling and lighting energy.',
  },
  {
    id: 10,
    question: 'Solar shading on west-facing facades is particularly challenging because:',
    options: [
      'West facades receive no direct sunlight',
      'Rain penetration is most common on west facades',
      'Low afternoon sun angles make horizontal shading ineffective',
      'Wind loads are highest on west facades',
    ],
    correctAnswer: 2,
    explanation:
      "West-facing facades receive intense, low-angle afternoon sun when buildings are already warm from the day's heat gains. Horizontal overhangs are ineffective; vertical fins or internal blinds are typically required.",
  },
  {
    id: 11,
    question: 'Phase Change Materials (PCMs) enhance passive design by:',
    options: [
      'Generating electricity from temperature differences',
      'Increasing ventilation rates',
      'Improving window insulation',
      'Storing latent heat during phase transitions',
    ],
    correctAnswer: 3,
    explanation:
      'PCMs absorb significant heat energy during melting (latent heat) without temperature rise. This increases effective thermal mass in lightweight construction, helping to moderate temperature swings and reduce cooling loads.',
  },
  {
    id: 12,
    question: 'The Passivhaus standard primarily focuses on:',
    options: [
      'Ultra-low energy demand through exceptional fabric and airtightness',
      'Cross ventilation and daylight penetration from both sides',
      'Cools the building structure overnight using cool night air',
      'Openings are on opposite or adjacent walls with clear internal paths',
    ],
    correctAnswer: 0,
    explanation:
      'Passivhaus achieves ultra-low energy demand (≤15 kWh/m²/yr heating) through exceptional insulation (U-values ~0.1 W/m²K), airtightness (≤0.6 ACH@50Pa), thermal bridge-free design, and mechanical ventilation with heat recovery.',
  },
];

const faqs = [
  {
    question: 'How do passive design principles affect building services sizing?',
    answer:
      "Effective passive design significantly reduces building services requirements. Solar shading, thermal mass, and natural ventilation can reduce peak cooling loads by 30-50%, allowing smaller chillers, reduced ductwork, and lower electrical loads. Good daylighting design reduces artificial lighting requirements by 40-60%. This translates to smaller plant rooms, reduced riser sizes, lower capital costs, and substantially reduced operational energy consumption throughout the building's life.",
  },
  {
    question: 'Can natural ventilation work in UK urban environments?',
    answer:
      'Natural ventilation is viable in many UK urban settings with careful design. Key considerations include: acoustic attenuation for openings near busy roads, air filtration for polluted areas, security for accessible openings, and wind analysis for tall buildings. Mixed-mode designs combining natural and mechanical ventilation offer flexibility - operating naturally when conditions permit and switching to mechanical when needed for comfort or air quality.',
  },
  {
    question: 'What is the relationship between glazing ratio and energy performance?',
    answer:
      'Glazing ratio significantly impacts energy balance. While windows provide daylight (reducing lighting energy) and solar gains (reducing winter heating), excessive glazing causes overheating and heat loss. Optimal glazing ratios are typically 25-40% of facade area in UK climates. South-facing glazing with shading is preferred; north glazing provides diffuse light without overheating risk. High-performance glazing (low U-value, appropriate g-value) enables larger window areas while maintaining energy efficiency.',
  },
  {
    question: 'How do Building Regulations address passive design?',
    answer:
      'Part L of the Building Regulations increasingly promotes passive design through fabric energy efficiency standards, limiting air permeability, requiring consideration of overheating risk (CIBSE TM59), and setting targets for operational energy. The Future Homes Standard (2025) will require even higher fabric performance and low-carbon heating. SAP and SBEM calculations reward passive measures through reduced energy demand, often enabling compliance with smaller or simpler mechanical systems.',
  },
  {
    question: 'What monitoring systems support passive building operation?',
    answer:
      'Effective passive buildings require monitoring to verify performance and guide occupant behaviour. Key systems include: temperature sensors (multiple zones), CO₂ monitoring (ventilation adequacy), window/vent position sensors (BMS integration), weather stations (external conditions), occupancy sensors (demand-controlled ventilation), and energy sub-metering. BMS systems can automate night purge, window operation, and blind control based on sensor inputs and weather forecasts.',
  },
  {
    question: 'How does climate change affect passive design strategies?',
    answer:
      'Climate projections for the UK indicate warmer summers, milder winters, and more extreme weather events. Passive designs should be future-proofed by: designing for higher cooling degree days than current climate, incorporating robust overheating mitigation, using thermal mass for summer cooling resilience, ensuring natural ventilation can handle higher external temperatures, and allowing for future mechanical cooling installation if needed. CIBSE TM59 overheating assessments now require future climate scenarios.',
  },
];

const HNCModule6Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 6 · Section 6 · Subsection 1"
            title="Passive Design Principles"
            description="Solar orientation, natural ventilation, daylighting, thermal mass and passive cooling strategies for energy-efficient buildings"
            tone="purple"
          />

          <TLDR
            points={[
              "Passive design uses the building's form, orientation, fabric and layout to deliver comfort with minimum mechanical input — solar gain in winter, shading in summer, natural ventilation, daylight, and thermal mass tuning.",
              "Done well, passive design halves the load on M&E systems before any mechanical kit is sized — but it requires architect-engineer integration from RIBA Stage 1, not bolting M&E onto a finished form.",
              "CIBSE Guide A (Environmental Design) is the institutional UK reference; LETI Climate Emergency Design Guide adds net-zero performance targets that make passive measures essentially mandatory.",
            ]}
          />

          <RegsCallout
            source="CIBSE Guide A (8th edition, 2015 with 2021 updates) + Building Regulations Part O Overheating"
            clause="Where natural ventilation is provided as the means of meeting Part O criteria, the design shall demonstrate that opening areas, opening configurations and security provisions allow adequate cross-ventilation or stack ventilation under the design conditions, taking into account building geometry, prevailing wind direction, internal heat gains, and occupant control. The design shall be evidenced through dynamic thermal modelling per CIBSE TM59 or the simplified method in Part O Schedule 1."
            meaning={
              <>
                Part O integrates overheating directly into Building Regulations. Natural ventilation is permitted but must be evidenced — the simplified method is geometry/orientation rules; the dynamic method is TM59 hour-by-hour analysis. CIBSE Guide A provides the engineering basis for both.
              </>
            }
            cite="Source: CIBSE Guide A (2015 + 2021 updates) — cibse.org; Approved Document O: Overheating, 2021 edition — gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Explain passive design principles and the fabric first approach",
              "Apply solar orientation strategies for UK building design",
              "Design natural ventilation systems using cross-flow and stack effect",
              "Calculate daylight factors and specify daylighting strategies",
              "Utilise thermal mass and phase change materials for temperature control",
              "Implement passive cooling strategies including night purge and solar shading",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Passive Design Fundamentals">
            <p>Passive design utilises building form, orientation, and fabric to provide heating, cooling, ventilation, and lighting with minimal mechanical intervention. This approach prioritises reducing energy demand before considering how remaining demand is met - the foundation of sustainable building design.</p>
            <p><strong>Key passive design principles:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Fabric first:</strong> Invest in building envelope before mechanical systems</li>
              <li><strong>Climate response:</strong> Design responds to local climate conditions</li>
              <li><strong>Natural forces:</strong> Harness sun, wind, and buoyancy for comfort</li>
              <li><strong>Occupant interaction:</strong> Enable user control of natural systems</li>
            </ul>
            <p><strong>Passive vs Active Design Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Heating:</strong> Solar gain, insulation, thermal mass — Boilers, heat pumps, radiators</li>
              <li><strong>Cooling:</strong> Shading, ventilation, night purge — Chillers, air conditioning, FCUs</li>
              <li><strong>Ventilation:</strong> Natural cross-flow, stack effect — AHUs, extract fans, ductwork</li>
              <li><strong>Lighting:</strong> Daylighting, light shelves, rooflights — LED luminaires, control systems</li>
              <li><strong>Energy use:</strong> Minimal operational energy — Continuous energy consumption</li>
            </ul>
            <p><strong>The Energy Hierarchy</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Reduce demand:</strong> Passive design, fabric performance</li>
              <li><strong>2. Use energy efficiently:</strong> High-efficiency systems, heat recovery</li>
              <li><strong>3. Supply from renewables:</strong> PV, solar thermal, heat pumps</li>
              <li><strong>4. Offset remaining carbon:</strong> Green tariffs, carbon credits</li>
            </ul>
            <p><strong>Design principle:</strong> Every kWh of demand reduced through passive measures is worth more than a kWh generated - it saves capital cost, maintenance, and space throughout the building's life.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Solar Orientation and Daylighting">
            <p>Solar orientation determines how buildings interact with the sun throughout the day and year. Optimal orientation maximises beneficial winter solar gain whilst minimising summer overheating risk, while providing adequate daylight to reduce artificial lighting requirements.</p>
            <p><strong>South-Facing (UK)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maximum solar gain potential</li>
              <li>High winter sun penetration</li>
              <li>Easily shaded in summer</li>
              <li>Ideal for living spaces, offices</li>
            </ul>
            <p><strong>North-Facing (UK)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No direct solar gain</li>
              <li>Diffuse, even daylight</li>
              <li>No overheating risk</li>
              <li>Ideal for studios, galleries</li>
            </ul>
            <p><strong>East-Facing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Morning sun, cooler afternoons</li>
              <li>Lower overheating risk</li>
              <li>Moderate shading needed</li>
              <li>Good for bedrooms, kitchens</li>
            </ul>
            <p><strong>West-Facing</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Intense afternoon/evening sun</li>
              <li>Highest overheating risk</li>
              <li>Difficult to shade (low angles)</li>
              <li>Minimise glazing or use vertical fins</li>
            </ul>
            <p><strong>Daylighting Design Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Daylight Factor:</strong> Internal/external illuminance ratio — 2% minimum, 5% for tasks</li>
              <li><strong>Uniformity Ratio:</strong> Min/average daylight factor — ≥0.4 for good distribution</li>
              <li><strong>Daylit Depth:</strong> Distance daylight penetrates — 1.5-2.5 × window head height</li>
              <li><strong>Glazing Ratio:</strong> Window area / floor area — 15-25% typical office</li>
              <li><strong>View Out:</strong> Visual connection to outside — 75% of floor area with view</li>
            </ul>
            <p><strong>Daylighting strategies:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Light shelves:</strong> Horizontal reflectors bounce daylight deeper into rooms</li>
              <li><strong>Clerestory windows:</strong> High-level glazing provides even illumination</li>
              <li><strong>Rooflights:</strong> 3× more effective than vertical glazing (per m²)</li>
              <li><strong>Atria:</strong> Bring daylight to deep-plan building cores</li>
              <li><strong>Light tubes:</strong> Channel daylight to internal rooms via reflective ducts</li>
            </ul>
            <p><strong>Best practice:</strong> Design for 300-500 lux average daylight in workspaces. Provide daylight-linked dimming controls to maximise energy savings from natural light.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Natural Ventilation Strategies">
            <p>Natural ventilation uses wind pressure and buoyancy (stack effect) to move air through buildings without mechanical fans. When designed correctly, natural ventilation provides fresh air, removes heat and pollutants, and significantly reduces energy consumption compared to fully air-conditioned buildings.</p>
            <p><strong>Natural Ventilation Driving Forces</strong></p>
            <p><strong>Wind-Driven (Cross Ventilation)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Pressure difference across building</li>
              <li>• Requires openings on opposite facades</li>
              <li>• Effective to ~5× ceiling height depth</li>
              <li>• Depends on wind speed and direction</li>
            </ul>
            <p><strong>Buoyancy-Driven (Stack Effect)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Warm air rises, exits at high level</li>
              <li>• Cool air drawn in at low level</li>
              <li>• Requires vertical height difference</li>
              <li>• Works even in calm conditions</li>
            </ul>
            <p><strong>Ventilation Strategy Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Single-Sided:</strong> Openings on one facade only — Rooms ≤2.5× ceiling height deep</li>
              <li><strong>Cross Ventilation:</strong> Openings on opposite/adjacent walls — Narrow plan buildings (≤15m)</li>
              <li><strong>Stack Ventilation:</strong> Vertical shafts or atria — Multi-storey, deep plan buildings</li>
              <li><strong>Wind Towers:</strong> Roof-mounted wind catchers — Hot climates, traditional buildings</li>
              <li><strong>Mixed Mode:</strong> Natural with mechanical backup — UK offices, schools, hospitals</li>
            </ul>
            <p><strong>Design requirements for natural ventilation:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Opening area:</strong> Typically 5% of floor area for background, 10% for rapid cooling</li>
              <li><strong>Inlet/outlet ratio:</strong> 1:1 for cross-flow; outlets larger for stack effect</li>
              <li><strong>Clear air paths:</strong> Internal doors, transfer grilles, open plan layouts</li>
              <li><strong>Controls:</strong> Actuated windows, BMS integration, weather monitoring</li>
              <li><strong>Acoustic treatment:</strong> Attenuators for urban sites, sound-resistant vents</li>
            </ul>
            <p><strong>Ventilation Rate Calculation (Stack Effect)</strong></p>
            <p>Q = Cd × A × √(2 × g × H × ΔT / Tavg)</p>
            <p>Where:</p>
            <p>Q = Volume flow rate (m³/s)</p>
            <p>Cd = Discharge coefficient (typically 0.6)</p>
            <p>A = Free opening area (m²)</p>
            <p>g = 9.81 m/s²</p>
            <p>H = Height between openings (m)</p>
            <p>ΔT = Temperature difference (K)</p>
            <p>Tavg = Average absolute temperature (K)</p>
            <p><strong>Integration tip:</strong> Natural ventilation requires BMS integration for automated window/damper control, weather monitoring, and changeover to mechanical systems when natural ventilation cannot maintain comfort conditions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Thermal Mass and Passive Cooling">
            <p>Thermal mass refers to a material's ability to absorb, store, and release heat. When combined with night ventilation, thermal mass provides effective passive cooling - storing heat during the day and releasing it at night, significantly reducing or eliminating mechanical cooling requirements in UK buildings.</p>
            <p><strong>Thermal Mass Properties of Common Materials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dense concrete:</strong> 2400 — 1000 — High</li>
              <li><strong>Brick:</strong> 1700 — 800 — High</li>
              <li><strong>Water:</strong> 1000 — 4186 — Very high</li>
              <li><strong>Timber:</strong> 500 — 1600 — Low</li>
              <li><strong>Steel:</strong> 7800 — 450 — Medium</li>
            </ul>
            <p><strong>Accessing Thermal Mass</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Exposed concrete soffits (no suspended ceilings)</li>
              <li>Fair-faced blockwork walls</li>
              <li>Screed floors with hard finishes</li>
              <li>Internal masonry partitions</li>
              <li>Phase change material panels</li>
            </ul>
            <p><strong>Night Purge Ventilation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cool night air flushes stored heat</li>
              <li>Requires 6-10 ACH for 4-8 hours</li>
              <li>External temp must be ≥3°C below mass</li>
              <li>Secure, weather-protected openings</li>
              <li>BMS-controlled automatic operation</li>
            </ul>
            <p><strong>Passive Cooling Strategies</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>External solar shading:</strong> Prevents solar gain entering — 30-50%</li>
              <li><strong>Night purge ventilation:</strong> Pre-cools thermal mass — 20-40%</li>
              <li><strong>Exposed thermal mass:</strong> Absorbs peak gains — 15-25%</li>
              <li><strong>Solar control glazing:</strong> Reduces transmitted radiation — 20-35%</li>
              <li><strong>Green roofs/walls:</strong> Evaporative cooling, insulation — 10-20%</li>
            </ul>
            <p><strong>Solar Shading Design</strong></p>
            <p><strong>South facades:</strong> Horizontal overhangs or brise-soleil - effective against high summer sun</p>
            <p><strong>East/West facades:</strong> Vertical fins or adjustable louvres - needed for low-angle sun</p>
            <p><strong>Sizing rule:</strong> Overhang depth = window height × (1 / tan(summer sun altitude))</p>
            <p><strong>Example:</strong> 1.5m high window at 52°N latitude, June noon sun at 62°</p>
            <p>Overhang = 1.5 / tan(62°) = 1.5 / 1.88 = 0.8m projection</p>
            <p><strong>Phase Change Materials (PCMs)</strong></p>
            <p>PCMs (typically paraffin waxes or salt hydrates) melt at around 21-25°C, absorbing significant latent heat without temperature rise. When incorporated into ceiling tiles, plasterboard, or dedicated panels, PCMs provide thermal mass equivalent to much heavier concrete. Particularly valuable in lightweight construction where traditional thermal mass is impractical. PCM systems can absorb 100-200 Wh/m² of ceiling area.</p>
            <p><strong>Services integration:</strong> Passive cooling strategies significantly reduce chiller sizing. A well-designed passive office in the UK may need only 40-60 W/m² cooling capacity versus 80-120 W/m² for a conventional air-conditioned building.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Daylight Factor Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate average daylight factor for a 6m × 8m office with a south-facing window 4m wide × 1.8m high, head height 2.7m from floor.</p>
            <p>Simplified average daylight factor formula:</p>
            <p>DF = (Aw × T × θ) / (A × (1 - R²))</p>
            <p>Where:</p>
            <p>Aw = Window area = 4 × 1.8 = 7.2 m²</p>
            <p>T = Glass transmittance = 0.7 (double glazed)</p>
            <p>θ = Angle of visible sky = 0.5 (assume 50% unobstructed)</p>
            <p>A = Total room surface area = 2(6×8) + 2(6×3) + 2(8×3) = 180 m²</p>
            <p>R = Average surface reflectance = 0.5</p>
            <p>DF = (7.2 × 0.7 × 0.5) / (180 × (1 - 0.25))</p>
            <p>= 2.52 / 135 = 0.019 = 1.9%</p>
            <p>Daylit depth check: 2.5 × 2.7m = 6.75m (adequate for 6m room depth)</p>
            <p>Result: DF ~2% meets minimum; supplementary artificial lighting needed for task areas</p>
            <p>
              <strong>Example 2: Natural Ventilation Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Size openings for stack ventilation in a 4m high atrium serving offices with 50 occupants requiring 10 l/s per person.</p>
            <p>Required ventilation rate:</p>
            <p>Q = 50 × 10 l/s = 500 l/s = 0.5 m³/s</p>
            <p>Stack effect formula rearranged for area:</p>
            <p>A = Q / (Cd × √(2gHΔT/Tavg))</p>
            <p>Assumptions:</p>
            <p>H = 4m (height difference)</p>
            <p>ΔT = 3°C (internal-external difference)</p>
            <p>Tavg = 293K (20°C average)</p>
            <p>Cd = 0.6</p>
            <p>A = 0.5 / (0.6 × √(2 × 9.81 × 4 × 3 / 293))</p>
            <p>= 0.5 / (0.6 × √(0.804))</p>
            <p>= 0.5 / (0.6 × 0.897)</p>
            <p>= 0.5 / 0.538 = 0.93 m²</p>
            <p>Result: Minimum 0.93 m² free opening area at both inlet and outlet</p>
            <p>Specify 1.2 m² to allow for reduced ΔT conditions</p>
            <p>
              <strong>Example 3: Thermal Mass Night Cooling Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Assess thermal mass capacity of exposed 200mm concrete soffit in a 100m² office to absorb next-day heat gains.</p>
            <p>Thermal storage capacity:</p>
            <p>Q = m × c × ΔT</p>
            <p>Parameters:</p>
            <p>Concrete density = 2400 kg/m³</p>
            <p>Specific heat = 1000 J/kgK</p>
            <p>Effective depth = 75mm (first 75mm participates in diurnal cycle)</p>
            <p>Temperature swing = 4°C (assumed)</p>
            <p>Mass participating:</p>
            <p>m = 100 m² × 0.075m × 2400 kg/m³ = 18,000 kg</p>
            <p>Heat storage:</p>
            <p>Q = 18,000 × 1000 × 4 = 72,000,000 J = 72 MJ</p>
            <p>= 72 MJ / 3.6 = 20 kWh</p>
            <p>Heat absorption rate (over 8-hour day):</p>
            <p>= 20 kWh / 8h = 2.5 kW = 25 W/m²</p>
            <p>Result: Soffit can absorb 25 W/m² of heat gains - significant contribution to cooling</p>
            <p>Combined with 35 W/m² internal gains = substantial peak reduction</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Passive Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Analyse site orientation and optimise building position for solar access</li>
              <li>Design narrow floor plates (≤15m) to enable cross-ventilation</li>
              <li>Maximise south-facing glazing with appropriate shading</li>
              <li>Minimise west-facing glazing or provide robust shading</li>
              <li>Expose thermal mass internally (avoid suspended ceilings where possible)</li>
              <li>Provide openable windows/vents for natural ventilation</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Daylight factor targets: <strong>2% minimum, 5% for task areas</strong></li>
              <li>Daylit depth: <strong>1.5-2.5 × window head height</strong></li>
              <li>Cross-ventilation depth: <strong>≤5 × ceiling height</strong></li>
              <li>Night purge rate: <strong>6-10 ACH for 4-8 hours</strong></li>
              <li>Effective thermal mass depth: <strong>~75mm for diurnal cycle</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Suspended ceilings hiding thermal mass</strong> - coordinate with acoustics early</li>
                <li><strong>Relying on internal blinds for solar control</strong> - heat already inside</li>
                <li><strong>Deep floor plates without toplighting</strong> - creates permanently dark cores</li>
                <li><strong>Ignoring security/weather for night ventilation</strong> - openings must be secure and rain-proof</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="Single-aspect south-facing flat fails Part O TM59"
            situation={
              <>
                A 38 m² studio flat on the south aspect of a residential block. Single-aspect (no cross-ventilation), full-height glazing, 1.5 m balcony overhang. Part O TM59 dynamic modelling shows operative temperature exceeding 26°C for 480 hours/year (limit ~3% = 263 hours). Design fails Part O.
              </>
            }
            whatToDo={
              <>
                Three options: (1) external solid shading (brise-soleil, deep recessed reveals) — typically 30–50% reduction in overheating hours, often architecturally challenging; (2) reduce glazing area and add insulated spandrel panels — most effective but visually intrusive; (3) mechanical cooling (MVHR with summer bypass + limited active cooling) — works technically but adds capital and operational cost. Most common solution is a combination of moderate glazing reduction + external shading + MVHR with night purge. Re-run TM59 to verify.
              </>
            }
            whyItMatters={
              <>
                Part O has been the most disruptive change to residential design in a decade. Single-aspect dwellings on hot facades are the worst case. The cheapest fix is at concept stage (orientation, dual aspect, glazing area); by RIBA Stage 4 only mechanical cooling typically works. Engage the M&E and overheating engineer at Stage 1.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Passive design = form, orientation, fabric, layout deliver comfort with minimum M&E.",
              "Halves M&E load before mechanical sizing — but needs Stage 1 integration.",
              "CIBSE Guide A is the UK environmental design reference.",
              "Part O makes overheating compliance mandatory under Building Regulations.",
              "TM59 (dynamic thermal modelling) or Part O simplified method for evidencing.",
              "Single-aspect south-facing dwellings are the hardest Part O case.",
              "Solar control glazing, external shading, cross-ventilation, night purge — the passive toolkit.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Sustainable design integration
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section6-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fabric first approach
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section6_1;
