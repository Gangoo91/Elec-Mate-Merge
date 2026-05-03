/**
 * Module 6 · Section 2 · Subsection 1 — Solar Photovoltaic Systems
 * HNC Electrical Engineering for Building Services (Sustainability and Environmental Engineering)
 *   PV technology, system sizing, installation requirements, G98/G99 connection, and performance monitoring
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

const TITLE = 'Solar Photovoltaic Systems - HNC Module 6 Section 2.1';
const DESCRIPTION =
  'Master solar photovoltaic technology for building services: PV cell types, system sizing, inverter technology, G98/G99 DNO connection requirements, MCS standards, and performance monitoring systems.';

const quickCheckQuestions = [
  {
    id: 'pv-cell-types',
    question:
      'Which PV cell technology typically offers the highest efficiency in standard test conditions?',
    options: [
      'Thin film amorphous silicon',
      'Polycrystalline silicon',
      'Monocrystalline silicon',
      'Cadmium telluride',
    ],
    correctIndex: 2,
    explanation:
      'Monocrystalline silicon cells offer the highest efficiency (typically 18-22%) due to their uniform crystal structure, which allows electrons to flow more freely than in polycrystalline or thin film technologies.',
  },
  {
    id: 'g98-limit',
    question:
      'What is the maximum single-phase export capacity permitted under G98 without requiring DNO application approval?',
    options: ['3.68 kW per phase', '6 kW per phase', '16 A per phase', '50 kW total'],
    correctIndex: 0,
    explanation:
      'G98 permits up to 3.68 kW per phase (16 A × 230 V = 3.68 kW) for single-phase connections without requiring formal DNO application - only notification is required within 28 days of commissioning.',
  },
  {
    id: 'inverter-function',
    question: 'What is the primary function of a grid-tied inverter in a PV system?',
    options: [
      'Store excess energy for later use',
      'Convert DC from panels to AC synchronised with grid frequency',
      'Increase the voltage output from panels',
      'Provide battery charging capability',
    ],
    correctIndex: 1,
    explanation:
      'A grid-tied inverter converts DC electricity from PV panels to AC electricity synchronised with the grid frequency (50 Hz in the UK). It must also incorporate anti-islanding protection for safety.',
  },
  {
    id: 'annual-yield',
    question:
      'In the UK, typical annual solar irradiation for system sizing calculations is approximately:',
    options: [
      '500-700 kWh/m² per year',
      '850-1,100 kWh/m² per year',
      '1,500-1,800 kWh/m² per year',
      '2,000-2,500 kWh/m² per year',
    ],
    correctIndex: 1,
    explanation:
      'The UK receives approximately 850-1,100 kWh/m² of solar irradiation annually, varying by location (higher in the south). This equates to roughly 800-1,000 kWh annual yield per kWp of installed capacity.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A monocrystalline PV panel is rated at 400 Wp under Standard Test Conditions (STC). What irradiance level does STC specify?',
    options: ['500 W/m²', '800 W/m²', '1,000 W/m²', '1,200 W/m²'],
    correctAnswer: 2,
    explanation:
      'Standard Test Conditions (STC) specify 1,000 W/m² irradiance, 25°C cell temperature, and AM 1.5 spectrum. The Wp rating indicates peak power output under these specific conditions.',
  },
  {
    id: 2,
    question:
      'What is the typical temperature coefficient of power for crystalline silicon PV modules?',
    options: ['-0.1% per °C', '-0.35% to -0.45% per °C', '-1.0% per °C', '+0.5% per °C'],
    correctAnswer: 1,
    explanation:
      'Crystalline silicon modules typically lose 0.35-0.45% of rated power for each degree Celsius above 25°C (STC). This means a 400 Wp panel at 45°C would produce approximately 368-372 W under 1,000 W/m².',
  },
  {
    id: 3,
    question: 'Which inverter topology allows individual panel-level MPPT optimisation?',
    options: [
      'Central string inverter',
      'Multi-string inverter',
      'Microinverter',
      'Transformer-coupled inverter',
    ],
    correctAnswer: 2,
    explanation:
      'Microinverters are fitted to individual panels, providing panel-level maximum power point tracking (MPPT). This optimises energy harvest from each panel independently, beneficial where shading or panel mismatch occurs.',
  },
  {
    id: 4,
    question:
      'When calculating PV system annual yield, which factor accounts for losses from dust, wiring, and inverter inefficiency?',
    options: [
      'Shading factor',
      'Temperature derating',
      'Performance ratio (PR)',
      'Orientation factor',
    ],
    correctAnswer: 2,
    explanation:
      'Performance ratio (PR) typically ranges from 0.75-0.85 and accounts for all system losses including soiling, wiring resistance, inverter efficiency, temperature effects, and mismatch losses.',
  },
  {
    id: 5,
    question:
      'For a south-facing roof in central England with 35° pitch, what is the approximate orientation factor for annual yield calculation?',
    options: ['0.70-0.75', '0.85-0.90', '0.95-1.00', '1.05-1.10'],
    correctAnswer: 2,
    explanation:
      'A south-facing array at 30-40° pitch in the UK achieves near-optimal orientation with an orientation factor of 0.95-1.00. The optimal pitch angle approximately equals the latitude (51-54° for most of England).',
  },
  {
    id: 6,
    question: 'G99 application to the DNO is required for installations exceeding:',
    options: [
      '3.68 kW single-phase',
      '6 kW three-phase',
      '11.04 kW three-phase or 3.68 kW single-phase',
      '16 kW total capacity',
    ],
    correctAnswer: 2,
    explanation:
      'G99 application is required when total export capacity exceeds 3.68 kW per phase (single-phase) or 11.04 kW total (three-phase balanced across phases). The DNO must assess network impact before connection approval.',
  },
  {
    id: 7,
    question:
      'What is the maximum permitted DC voltage for PV string design in a domestic installation under BS 7671?',
    options: ['120 V DC', '600 V DC', '1,000 V DC', '1,500 V DC'],
    correctAnswer: 2,
    explanation:
      'BS 7671 and product standards typically limit DC voltage to 1,000 V for standard PV installations. String voltage must remain below this at all temperatures - typically calculated at minimum expected temperature when Voc is highest.',
  },
  {
    id: 8,
    question: 'Which MCS standard covers the installation of solar PV systems in the UK?',
    options: ['MCS 001', 'MCS 012', 'MCS 020', 'MCS 025'],
    correctAnswer: 1,
    explanation:
      "MCS 012 covers 'Installation Standard Requirements for contractors undertaking the supply, design, installation, set to work, commissioning and handover of Solar Photovoltaic Systems'.",
  },
  {
    id: 9,
    question: 'Anti-islanding protection in a grid-tied inverter ensures that:',
    options: [
      'The system maximises energy export',
      'Power factor remains above 0.95',
      'The inverter disconnects within 0.5 seconds of grid failure',
      'DC voltage remains stable',
    ],
    correctAnswer: 2,
    explanation:
      'Anti-islanding protection detects grid failure (loss of mains) and disconnects the inverter within 0.5 seconds. This prevents back-feeding into a dead network, which could endanger workers and equipment.',
  },
  {
    id: 10,
    question:
      'A 4 kWp PV system in the South of England typically generates approximately how much energy annually?',
    options: ['1,500-2,000 kWh', '3,200-4,000 kWh', '5,000-6,000 kWh', '7,000-8,000 kWh'],
    correctAnswer: 1,
    explanation:
      'In Southern England, expect approximately 800-1,000 kWh per kWp annually. A 4 kWp system would generate 3,200-4,000 kWh per year, assuming good orientation and minimal shading.',
  },
  {
    id: 11,
    question: 'When connecting PV panels in series, which parameter is additive?',
    options: [
      'Current (Isc and Imp)',
      'Voltage (Voc and Vmp)',
      'Power output only',
      'Neither voltage nor current',
    ],
    correctAnswer: 1,
    explanation:
      'Connecting panels in series adds voltages (Voc values and Vmp values sum), while current remains equal to a single panel. This is why string voltage calculations are critical for inverter compatibility.',
  },
  {
    id: 12,
    question: 'For MCS certification, how long must generation meter data be retained?',
    options: ['1 year', '5 years', '10 years', '20 years'],
    correctAnswer: 2,
    explanation:
      'MCS requires installers to retain records including commissioning data and generation meter readings for a minimum of 10 years. This supports performance monitoring and warranty claims throughout the system lifetime.',
  },
];

const faqs = [
  {
    question: 'What is the difference between G98 and G99 connections?',
    answer:
      'G98 applies to small-scale generation up to 3.68 kW per phase (16 A × 230 V) for single-phase or 11.04 kW total for three-phase balanced connections. G98 requires only notification to the DNO within 28 days of commissioning. G99 applies to larger installations exceeding these limits and requires formal application to the DNO before installation, with network studies potentially required to assess grid impact.',
  },
  {
    question: 'How do I calculate the number of panels that can be connected in series?',
    answer:
      "Maximum string length is determined by the inverter's maximum DC input voltage (typically 600-1,000 V) divided by the panel's Voc at minimum expected temperature. Minimum string length is determined by the inverter's MPPT minimum voltage divided by Vmp at maximum expected temperature. Use temperature coefficients (typically +0.3% per °C below 25°C for Voc) to calculate voltage at -10°C for maximum and +70°C for minimum.",
  },
  {
    question: 'What factors affect actual PV system yield versus rated capacity?',
    answer:
      'Several factors reduce actual yield below nameplate capacity: (1) Solar irradiation varies by location (850-1,100 kWh/m² annually in UK); (2) Temperature - panels lose 0.35-0.45% per °C above 25°C; (3) Orientation and tilt - sub-optimal angles reduce yield; (4) Shading - even partial shade significantly impacts output; (5) System losses - inverter efficiency (95-98%), wiring losses (1-2%), soiling (2-5%). Performance ratio typically 0.75-0.85.',
  },
  {
    question: 'Do I need to be MCS certified to install PV systems?',
    answer:
      'MCS certification is not legally required to install PV systems, but it is essential for customers to qualify for Smart Export Guarantee (SEG) payments for exported electricity. MCS certification requires working to MCS 012 installation standards, using MCS-certified products, and completing approved installer training. Without MCS certification, the installation cannot be registered and the customer loses access to export tariffs.',
  },
  {
    question: 'What isolation and protection requirements apply to PV DC circuits?',
    answer:
      "PV DC circuits require: (1) DC isolator adjacent to the inverter rated for DC breaking capacity; (2) String fuses where multiple strings connect in parallel (typically 15-20 A); (3) Type II surge protection devices on DC side recommended; (4) Fireman's switch for emergency isolation where required; (5) Clear labelling of all DC components warning of voltage presence even when AC isolated; (6) Cable sizing for 1.25 × Isc to account for irradiance above STC.",
  },
  {
    question: 'How do microinverters differ from string inverters for system design?',
    answer:
      'String inverters convert DC from multiple series-connected panels through a single unit, requiring matched panels and string voltage calculations. Microinverters are fitted to each panel, converting to AC at panel level. Microinverters offer panel-level MPPT optimisation (beneficial for shading), easier expansion, and no high-voltage DC, but cost more per watt. String inverters offer lower cost, easier maintenance, and higher efficiency for unshaded arrays.',
  },
];

const HNCModule6Section2_1 = () => {
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
            eyebrow="Module 6 · Section 2 · Subsection 1"
            title="Solar Photovoltaic Systems"
            description="PV technology, system sizing, installation requirements, G98/G99 connection, and performance monitoring"
            tone="purple"
          />

          <TLDR
            points={[
              "Solar PV converts sunlight to DC electricity via crystalline silicon (mono/poly) or thin-film modules — typical UK mounted-array yield is 850–950 kWh/kWp/year for unshaded south-facing pitched roofs.",
              "Connection follows ENA EREC G98 (≤16 A per phase, fit-and-inform) or G99 (>16 A per phase, application required) with DNO sign-off — both routes apply BS 7671 Section 712 and BS EN 62446 commissioning.",
              "MCS certification is required for the Smart Export Guarantee; the installation must use MCS-certified products and be commissioned by an MCS-registered contractor.",
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A2:2022 — Section 712 (Solar photovoltaic (PV) power supply systems)"
            clause="PV array junction boxes, switchgear and conductors on the d.c. side shall be selected and erected to minimise the risk of earth faults and short-circuits. PV string and array circuits shall be capable of operating on continuous open-circuit conditions and shall be protected against the effects of overvoltage and overcurrent in accordance with the requirements of BS EN 62548. The d.c. cabling shall be installed using methods that minimise the risk of earth faults and short-circuits."
            meaning={
              <>
                Section 712 governs every PV installation. DC-side faults are the highest fire-risk failure mode — segregated routing, double-insulated cabling, IP65 connectors and DC isolators within reach of the array are non-negotiable. BS EN 62446 sets the commissioning, documentation and routine verification standard.
              </>
            }
            cite="Source: BS 7671:2018+A2:2022 — BSI Group"
          />

          <LearningOutcomes
            outcomes={[
              "Compare PV cell technologies and their performance characteristics",
              "Size PV arrays including string voltage and inverter matching",
              "Calculate annual energy yield using UK irradiation data",
              "Apply G98/G99 DNO connection requirements correctly",
              "Understand MCS certification requirements and installation standards",
              "Design performance monitoring systems for ongoing verification",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="PV Cell Technology and Panel Specifications">
            <p>Photovoltaic cells convert solar radiation directly into electrical energy through the photovoltaic effect. Understanding cell technologies, their characteristics, and specification parameters is essential for system design and component selection.</p>
            <p><strong>PV Cell Technology Comparison:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Monocrystalline:</strong> 18-22% — Uniform black appearance, highest efficiency, performs well in low light — Premium residential, limited roof space</li>
              <li><strong>Polycrystalline:</strong> 15-18% — Blue speckled appearance, lower cost, slightly lower efficiency — Budget residential, commercial arrays</li>
              <li><strong>Thin Film (CdTe/CIGS):</strong> 10-13% — Flexible, lightweight, better shade tolerance, lower efficiency — BIPV, curved surfaces, large commercial</li>
              <li><strong>Half-cut cells:</strong> 19-22% — Reduced resistive losses, better shade performance, higher power density — Modern premium installations</li>
            </ul>
            <p><strong>Key Panel Specifications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wp (Peak Watts):</strong> Rated power output at STC (1,000 W/m², 25°C, AM 1.5)</li>
              <li><strong>Voc (Open Circuit Voltage):</strong> Maximum voltage when no current flows - critical for string design</li>
              <li><strong>Vmp (Voltage at Maximum Power):</strong> Operating voltage at peak power point</li>
              <li><strong>Isc (Short Circuit Current):</strong> Maximum current - used for cable and fuse sizing</li>
              <li><strong>Imp (Current at Maximum Power):</strong> Operating current at peak power point</li>
              <li><strong>Temperature coefficients:</strong> Power typically -0.35% to -0.45% per °C above 25°C</li>
            </ul>
            <p><strong>Standard Test Conditions (STC)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Irradiance: <strong>1,000 W/m²</strong></li>
              <li>Cell temperature: <strong>25°C</strong></li>
              <li>Air mass: <strong>AM 1.5</strong> (spectrum at 48.2° solar elevation)</li>
            </ul>
            <p>Real-world performance differs due to varying irradiance, higher cell temperatures, and system losses.</p>
            <p><strong>Design consideration:</strong> Cell temperature on a roof can reach 60-70°C on hot days, reducing output by 15-20% from STC ratings.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="System Sizing and Annual Yield Calculations">
            <p>Accurate system sizing requires understanding solar irradiation data, system losses, and electrical parameters. String voltage calculations ensure inverter compatibility and safe operation across temperature extremes.</p>
            <p><strong>UK Solar Irradiation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>South England: 1,000-1,100 kWh/m²</li>
              <li>Midlands: 900-1,000 kWh/m²</li>
              <li>North England: 850-950 kWh/m²</li>
              <li>Scotland: 800-900 kWh/m²</li>
            </ul>
            <p><strong>Orientation Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>South 30-40°: 0.95-1.00</li>
              <li>SE/SW 30-40°: 0.90-0.95</li>
              <li>East/West 30-40°: 0.80-0.85</li>
              <li>Flat roof: 0.85-0.90</li>
            </ul>
            <p><strong>System Losses (PR)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Inverter efficiency: 95-98%</li>
              <li>Cable losses: 1-2%</li>
              <li>Temperature: 5-10%</li>
              <li>Soiling/mismatch: 2-5%</li>
            </ul>
            <p><strong>Annual Yield Calculation</strong></p>
            <p>Formula:</p>
            <p>Annual Yield (kWh) = kWp × PSH × PR × Orientation Factor</p>
            <p>Where:</p>
            <p>kWp = System peak power rating</p>
            <p>PSH = Peak Sun Hours (kWh/m²/year ÷ 1 kW/m²)</p>
            <p>PR = Performance Ratio (typically 0.75-0.85)</p>
            <p>Simplified UK calculation:</p>
            <p>Annual Yield ≈ kWp × 800 to 1,000 kWh</p>
            <p><strong>String Voltage Calculations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Maximum Voc:</strong> -10°C (UK minimum) — Voc × [1 + (Tc × (Tmin - 25))] — Inverter max DC input</li>
              <li><strong>Minimum Vmp:</strong> +70°C (roof max) — Vmp × [1 + (Tc × (Tmax - 25))] — Inverter MPPT min voltage</li>
            </ul>
            <p>Tc = Temperature coefficient of voltage (typically -0.3% per °C for crystalline silicon)</p>
            <p><strong>Critical check:</strong> String Voc at -10°C must not exceed inverter maximum DC voltage (typically 600-1,000 V), and string Vmp at 70°C must remain above MPPT minimum voltage.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Inverter Technology and DNO Connection Requirements">
            <p>Grid-tied inverters convert DC from PV arrays to AC synchronised with the mains supply. They incorporate maximum power point tracking (MPPT), grid monitoring, and safety features required by Engineering Recommendation G98/G99.</p>
            <p><strong>Inverter Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>String Inverter:</strong> Central unit for one or more strings — Cost-effective, easy maintenance, high efficiency — Shade affects entire string, requires matching</li>
              <li><strong>Microinverter:</strong> Individual unit per panel — Panel-level MPPT, no high-voltage DC, shade tolerant — Higher cost, more components to fail</li>
              <li><strong>DC Optimiser + Inverter:</strong> Panel-level optimiser with string inverter — Panel-level MPPT, string inverter benefits — Additional cost, still has DC cabling</li>
              <li><strong>Hybrid Inverter:</strong> PV input plus battery interface — Integrated storage solution, backup capability — Higher cost, more complex installation</li>
            </ul>
            <p><strong>G98 vs G99 Requirements</strong></p>
            <p><strong>G98 (Notification Only)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Single-phase: ≤ 3.68 kW (16 A × 230 V)</li>
              <li>• Three-phase: ≤ 11.04 kW (3 × 3.68 kW)</li>
              <li>• Notify DNO within 28 days of commissioning</li>
              <li>• No approval required</li>
            </ul>
            <p><strong>G99 (Application Required)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Exceeds G98 limits</li>
              <li>• Apply before installation</li>
              <li>• DNO assesses network impact</li>
              <li>• May require network reinforcement</li>
            </ul>
            <p><strong>Inverter Safety Features (G98/G99 Compliance)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Anti-islanding:</strong> Disconnects within 0.5 seconds of grid failure - prevents energising dead network</li>
              <li><strong>Voltage monitoring:</strong> Disconnects if voltage outside 207-253 V (230 V +10%/-10%)</li>
              <li><strong>Frequency monitoring:</strong> Disconnects if frequency outside 47.5-52 Hz</li>
              <li><strong>Rate of Change of Frequency (RoCoF):</strong> 1 Hz/s protection setting</li>
              <li><strong>Power factor:</strong> Adjustable, typically set at 0.95 lagging to unity</li>
            </ul>
            <p><strong>Important:</strong> All grid-connected inverters must comply with G98/G99 and carry appropriate type-test certification (e.g., EN 50549).</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="MCS Standards and Performance Monitoring">
            <p>The Microgeneration Certification Scheme (MCS) sets quality standards for renewable energy installations in the UK. MCS certification is required for customers to access Smart Export Guarantee (SEG) payments. Ongoing performance monitoring ensures systems deliver expected yields.</p>
            <p><strong>MCS Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MCS 012:</strong> Installation standards</li>
              <li><strong>MCS 005:</strong> Product certification</li>
              <li>Approved installer training</li>
              <li>Registered design software</li>
              <li>Generation meter installation</li>
              <li>10-year record retention</li>
            </ul>
            <p><strong>Installation Documentation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>MCS certificate (unique number)</li>
              <li>Electrical Installation Certificate</li>
              <li>G98/G99 notification/approval</li>
              <li>Commissioning checklist</li>
              <li>Estimated annual yield calculation</li>
              <li>O&M documentation and warranties</li>
            </ul>
            <p><strong>Performance Monitoring Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Generation meter only:</strong> Total kWh generated — Basic verification, SEG compliance</li>
              <li><strong>Inverter monitoring:</strong> Real-time power, daily yield, fault codes — Remote fault detection, performance tracking</li>
              <li><strong>Panel-level monitoring:</strong> Individual panel output — Identify underperforming panels, shade impact</li>
              <li><strong>Weather-compensated:</strong> Irradiance, temperature, actual vs expected — True performance ratio calculation</li>
            </ul>
            <p><strong>Performance Ratio Monitoring</strong></p>
            <p>Performance Ratio (PR) calculation:</p>
            <p>PR = Actual Energy Output ÷ (Installed kWp × Plane of Array Irradiation ÷ 1,000)</p>
            <p>Expected values:</p>
            <p>New system: <span>0.80-0.85</span></p>
            <p>After degradation (10+ years): <span>0.75-0.80</span></p>
            <p>Indicating fault: <span>&lt; 0.70</span></p>
            <p><strong>Maintenance consideration:</strong> Panels typically degrade 0.5-0.7% per year. Inverters have 10-15 year typical lifespan. Factor replacement costs into lifecycle analysis.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Annual Yield Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Calculate annual yield for a 4 kWp system in Birmingham, south-facing at 35° pitch.</p>
            <p>Given data:</p>
            <p>System size: 4 kWp</p>
            <p>Location: Birmingham (950 kWh/m² annual irradiation)</p>
            <p>Orientation: South-facing, 35° pitch (factor 0.97)</p>
            <p>Performance ratio: 0.80</p>
            <p>Calculation:</p>
            <p>Peak Sun Hours (PSH) = 950 kWh/m² ÷ 1 kW/m² = 950 hours</p>
            <p>Annual Yield = 4 kWp × 950 × 0.80 × 0.97</p>
            <p>Annual Yield = 2,941 kWh</p>
            <p>Simplified: 4 × 900 = 3,600 kWh (using 900 kWh/kWp rule of thumb)</p>
            <p>
              <strong>Example 2: String Voltage Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> Determine maximum panels per string for 400 W panels (Voc = 49.5 V, Vmp = 41.5 V) with a 600 V inverter.</p>
            <p>Panel specifications:</p>
            <p>Voc at STC (25°C): 49.5 V</p>
            <p>Vmp at STC (25°C): 41.5 V</p>
            <p>Temperature coefficient: -0.29%/°C</p>
            <p>Maximum Voc at -10°C:</p>
            <p>Temperature difference = 25°C - (-10°C) = 35°C</p>
            <p>Voltage increase = 35 × 0.29% = 10.15%</p>
            <p>Voc at -10°C = 49.5 × 1.1015 = <span>54.5 V</span></p>
            <p>Maximum panels in string:</p>
            <p>600 V ÷ 54.5 V = 11.0 panels</p>
            <p>Maximum: 11 panels per string</p>
            <p>Also check minimum Vmp remains above MPPT minimum (typically 150-200 V)</p>
            <p>
              <strong>Example 3: G98/G99 Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> Determine connection requirements for a 6 kWp single-phase domestic installation.</p>
            <p>Installation details:</p>
            <p>Inverter AC output: 6 kW single-phase</p>
            <p>Supply: Single-phase 230 V</p>
            <p>G98 limit check:</p>
            <p>G98 single-phase limit: 16 A × 230 V = 3.68 kW</p>
            <p>Proposed installation: 6 kW</p>
            <p>6 kW &gt; 3.68 kW - G98 limit exceeded</p>
            <p>Requirement:</p>
            <p>G99 application required before installation</p>
            <p>Alternative: Install 3.68 kW inverter to qualify for G98 notification only</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>PV System Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Survey roof orientation, pitch, shading, and structural capacity</li>
              <li>Calculate available area and maximum system size</li>
              <li>Select appropriate panel technology and inverter type</li>
              <li>Verify string voltage within inverter limits at temperature extremes</li>
              <li>Assess G98/G99 requirements based on export capacity</li>
              <li>Calculate estimated annual yield using local irradiation data</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK annual yield: <strong>800-1,000 kWh per kWp</strong></li>
              <li>G98 single-phase limit: <strong>3.68 kW</strong> (16 A × 230 V)</li>
              <li>Performance ratio: <strong>0.75-0.85</strong></li>
              <li>Temperature coefficient: <strong>-0.35% to -0.45% per °C</strong></li>
              <li>Anti-islanding disconnect: <strong>&lt; 0.5 seconds</strong></li>
              <li>Annual degradation: <strong>0.5-0.7% per year</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring temperature coefficients</strong> - String voltage at -10°C can exceed inverter limits</li>
                <li><strong>Underestimating shading</strong> - Even partial shade dramatically reduces string output</li>
                <li><strong>Incorrect G98/G99 assessment</strong> - Based on inverter export capacity, not panel rating</li>
                <li><strong>Omitting DC isolation</strong> - DC isolator at inverter required, fireman's switch where applicable</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <Scenario
            title="G99 application stalls a 30 kWp commercial array"
            situation={
              <>
                A 30 kWp rooftop array on a small industrial unit. The contractor assumed G98 fit-and-inform applied because the inverter is single-phase per string, but the total per-phase current exceeds 16 A. The DNO refuses to register the system, demands a G99 application, and the export limit is now under negotiation.
              </>
            }
            whatToDo={
              <>
                Submit a full G99 application immediately — typical lead time is 8–13 weeks for a connection offer. While waiting, the system can run in zero-export mode (with active export limitation) under DNO temporary acceptance. Verify the inverter has the certified export-limiting function. Update the customer expectation: revenue from SEG cannot start until the DNO formally accepts the connection. Always check threshold per phase against the inverter rating before tendering.
              </>
            }
            whyItMatters={
              <>
                Misapplying G98 vs G99 is one of the most common installer errors and creates programme risk on every commercial PV project. The DNO can refuse connection or impose constraints (export limiting, voltage management) that materially change project economics. Determine the route at design stage, not commissioning.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "UK yield: 850–950 kWh/kWp/year for south-facing 30–40° unshaded pitched roof.",
              "BS 7671 Section 712 = electrical design rules; BS EN 62446 = commissioning + documentation.",
              "G98 = ≤16 A per phase fit-and-inform; G99 = >16 A application required (apply at least 8 weeks early).",
              "MCS certification required for SEG — products + installer both MCS-registered.",
              "DC isolator within reach of the array, AC isolator at the consumer unit, both lockable off.",
              "Annual inspection per BS EN 62446-2 — string IV curve test catches degraded modules early.",
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Renewable energy systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module6-section2-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Heat pump technology
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule6Section2_1;
