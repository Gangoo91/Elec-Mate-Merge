/**
 * Module 3 · Section 6 · Subsection 7 — Integration with Renewables and Storage Systems
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Solar PV, BESS battery storage, EV charging infrastructure, microgrids and
 *   smart-grid integration. The forward-looking BSE design topic that brings
 *   G98/G99/G100, BS 7671 Sections 712 (PV) / 722 (EV) / 826 (microgrid) into
 *   one integrated specification.
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

const TITLE = 'Integration with Renewables and Storage Systems - HNC Module 3 Section 6.7';
const DESCRIPTION =
  'Master the integration of solar PV, battery storage, EV charging and smart grid technologies into building electrical systems, including G98/G99 requirements and microgrid design.';

const quickCheckQuestions = [
  {
    id: 'g99-threshold',
    question: 'What is the power threshold above which G99 application is required instead of G98?',
    options: [
      '3.68kW',
      '11.04kW',
      '16kW',
      '50kW',
    ],
    correctIndex: 2,
    explanation:
      'G99 applies to generating equipment exceeding 16kW per phase (or 50kW three-phase total). Below this, the simpler G98 notification process applies for domestic and small commercial installations.',
  },
  {
    id: 'bess-chemistry',
    question: 'Which battery chemistry is most commonly used in commercial BESS installations?',
    options: [
      'The calculated design value',
      'Lithium iron phosphate (LFP)',
      'Mobile Elevated Work Platform',
      'Yes, if properly insulated',
    ],
    correctIndex: 1,
    explanation:
      'Lithium iron phosphate (LiFePO4/LFP) dominates commercial BESS due to superior safety (thermal stability), longer cycle life (6000+ cycles), and better round-trip efficiency (95%+) compared to other chemistries.',
  },
  {
    id: 'ev-mode2',
    question:
      'What is the maximum current permitted for Mode 2 EV charging from a standard UK socket?',
    options: [
      '10A',
      '8A',
      '13A',
      '16A',
    ],
    correctIndex: 0,
    explanation:
      'Mode 2 charging uses an in-cable control box (ICCB) limiting current to 10A maximum from a standard 13A socket. This provides thermal protection for continuous charging loads over several hours.',
  },
  {
    id: 'islanding-detection',
    question: 'What is the primary safety concern that anti-islanding protection addresses?',
    options: [
      'Installation certificate and relevant schedules',
      'Loose connections or corroded terminals',
      'Energising the grid during maintenance',
      'Inform the supervisor immediately',
    ],
    correctIndex: 2,
    explanation:
      'Anti-islanding prevents a generator from continuing to energise a section of grid that has been disconnected, protecting maintenance workers from unexpected live conductors. G98/G99 mandate Loss of Mains (LoM) protection.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What documentation is required for a G98 notification for a 4kW domestic PV system?',
    options: [
      'Full network study and DNO approval',
      'Simple notification to DNO within 28 days of commissioning',
      'Planning permission and building regulations approval',
      "Professional engineer's certification",
    ],
    correctAnswer: 1,
    explanation:
      "G98 is a notification-only process for installations up to 16kW per phase. The installer notifies the DNO within 28 days of commissioning using the standard G98 form. No approval is required - it's deemed accepted.",
  },
  {
    id: 2,
    question: 'A 10kWp PV system produces 9500kWh annually. What is the specific yield?',
    options: [
      '1000 kWh/kWp',
      '850 kWh/kWp',
      '950 kWh/kWp',
      '900 kWh/kWp',
    ],
    correctAnswer: 2,
    explanation:
      'Specific yield = Annual production / Installed capacity = 9500kWh / 10kWp = 950 kWh/kWp. UK systems typically achieve 850-1000 kWh/kWp depending on location, orientation and shading.',
  },
  {
    id: 3,
    question: 'What round-trip efficiency should be expected from a modern lithium BESS?',
    options: [
      '80-85%',
      '70-75%',
      '98-99%',
      '90-95%',
    ],
    correctAnswer: 3,
    explanation:
      'Modern lithium batteries achieve 90-95% round-trip efficiency (energy out vs energy in). Losses occur in the battery cells, BMS, inverter conversion and parasitic loads (cooling, controls).',
  },
  {
    id: 4,
    question: 'What is the purpose of export limitation in a grid-connected PV system?',
    options: [
      'Both A and B',
      'To comply with DNO connection agreements',
      'To protect the inverter from damage',
      'To maximise self-consumption',
    ],
    correctAnswer: 0,
    explanation:
      'Export limitation serves both purposes: it maximises self-consumption (improving financial returns) and complies with DNO requirements where network capacity is constrained. Many G98/G99 agreements include export limits.',
  },
  {
    id: 5,
    question: 'Which EV charging mode requires a dedicated circuit with EVSE (wallbox)?',
    options: [
      'Mode 2',
      'Mode 3',
      'Mode 4',
      'Mode 1',
    ],
    correctAnswer: 1,
    explanation:
      'Mode 3 uses a dedicated EVSE (Electric Vehicle Supply Equipment) permanently connected to the installation. It provides pilot signal communication for smart charging features and typically operates at 7kW (32A single-phase) or 22kW (32A three-phase).',
  },
  {
    id: 6,
    question: 'What is the minimum cable size required for a 7.4kW (32A) EV charger on a 20m run?',
    options: [
      '4mm²',
      '10mm²',
      '6mm²',
      '16mm²',
    ],
    correctAnswer: 2,
    explanation:
      'A 32A load requires minimum 6mm² cable for current capacity. For a 20m run, voltage drop = 32A × 40m × 3.08mΩ/m = 3.94V (1.7%), within the 5% limit. 6mm² is suitable for this installation.',
  },
  {
    id: 7,
    question:
      'What frequency deviation triggers Loss of Mains protection disconnection under G98/G99?',
    options: [
      '±0.2Hz',
      '±0.5Hz',
      '±2.5Hz',
      '±1.5Hz',
    ],
    correctAnswer: 3,
    explanation:
      'G98/G99 require disconnection when frequency deviates beyond 47.5Hz-52Hz (±1.5Hz from 50Hz nominal). Rate of Change of Frequency (RoCoF) protection must also disconnect at >1Hz/s to detect islanding conditions.',
  },
  {
    id: 8,
    question:
      'A building has 50kW PV, 100kWh BESS and 200kW peak demand. What BESS sizing ratio provides 30 minutes peak shaving?',
    options: [
      '1C (100kW discharge)',
      '2C (200kW discharge)',
      '0.25C (100kW discharge)',
      '0.5C (50kW discharge)',
    ],
    correctAnswer: 0,
    explanation:
      'To shave 100kW from 200kW peak for 30 minutes requires 50kWh (100kW × 0.5h). At 1C rate, the 100kWh BESS can deliver 100kW, providing 50kWh in 30 minutes while maintaining battery health.',
  },
  {
    id: 9,
    question: 'What is the key advantage of AC-coupled over DC-coupled battery systems?',
    options: [
      'Men who are feeling low or suicidal — 0800 58 58 58',
      'Flexibility - can retrofit to existing PV',
      'Overheating components or insulation breakdown',
      'Connecting multiple hubs to work together',
    ],
    correctAnswer: 1,
    explanation:
      'AC-coupled systems connect the battery via its own inverter to the AC distribution. This allows retrofitting to any existing PV system and provides independence from the PV inverter. DC-coupled systems offer slightly higher efficiency but require compatible hybrid inverters.',
  },
  {
    id: 10,
    question:
      'Under the Electric Vehicles (Smart Charge Points) Regulations 2021, what feature is mandatory for domestic chargepoints?',
    options: [
      'The ratio of collector current to base current',
      'Summarising and checking understanding',
      'Off-peak default charging (smart functionality)',
      'It varies with the equation of time',
    ],
    correctAnswer: 2,
    explanation:
      'The 2021 Regulations mandate that new domestic chargepoints must have smart functionality, defaulting to off-peak charging times to reduce grid strain. They must also be capable of responding to demand-side response signals.',
  },
];

const faqs = [
  {
    question: 'What is the difference between G98 and G99?',
    answer:
      'G98 is a simplified notification process for small-scale generation up to 16kW per phase (or 50kW total three-phase). The installer simply notifies the DNO within 28 days - no approval needed. G99 applies to larger installations and requires a formal application to the DNO before installation, including network studies and potentially reinforcement costs.',
  },
  {
    question: 'Can I install a battery without solar PV?',
    answer:
      'Yes, standalone BESS installations are increasingly common for tariff arbitrage (charging at cheap rates, discharging at peak rates) and grid services income. They still require G98/G99 notification if grid-connected, and the same safety standards apply. Some DNOs have specific requirements for battery-only installations.',
  },
  {
    question: 'What is the best battery sizing for a typical domestic installation?',
    answer:
      "A common rule is 1kWh storage per 1kWp of PV installed, but optimal sizing depends on consumption patterns. For a typical 4kWp domestic system, 5-10kWh provides good self-consumption without excessive cost. Larger batteries only benefit if there's sufficient excess generation to fill them.",
  },
  {
    question: 'Do I need three-phase supply for a 22kW EV charger?',
    answer:
      'Yes, 22kW chargers require three-phase supply (32A per phase at 400V). However, most domestic EVs can only accept 7kW AC maximum, making three-phase domestic installation often unnecessary. Commercial sites with multiple EVs or fast-charging requirements benefit from three-phase infrastructure.',
  },
  {
    question: 'What is Vehicle-to-Grid (V2G) and is it available in the UK?',
    answer:
      'V2G allows EVs to export stored energy back to the grid or building. It requires compatible vehicles (currently limited - mainly Nissan Leaf and some commercial vehicles), bidirectional chargers, and appropriate metering/agreements. UK trials are ongoing, with commercial availability expanding. V2G chargers need G98/G99 compliance as generating equipment.',
  },
  {
    question: 'Can a microgrid operate independently during a power cut?',
    answer:
      'Only if designed for islanding capability. Standard grid-tied inverters disconnect during outages (anti-islanding protection). Islanding-capable systems require additional equipment: automatic transfer switches, black-start capability, and careful load management. BS 7671 Section 551 covers requirements for switching between sources.',
  },
];

const HNCModule3Section6_7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 7"
            title="Integration with renewables and storage systems"
            description="Solar PV, battery storage, EV charging and smart grid integration for modern building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You design Solar PV to BS 7671 Section 712 + IEC 62548; submit G98 (single phase &le; 16 A) or G99 (everything larger) connection application; verify export limitation under G100 if needed.',
              'You size BESS (battery energy storage) for arbitrage / peak-shaving / backup duty; specify to BS EN 62619 (cells) + BS EN 62933 (system) + IEC 62443 (cyber security).',
              'You design EV charging to BS 7671 Section 722 + Open Charge Point Protocol (OCPP); apply BS 7671 A4:2026 PEN-fault protection on outdoor PME-supplied chargers.',
              'You document the integrated renewables + storage + EV scheme in the building&rsquo;s log book + lodge the connection agreement with the DNO &mdash; both regulatory and commercial deliverables.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 712 (Solar photovoltaic power supply systems) and Regulation 722 (Electric vehicle charging installations) and Regulation 551 (Low-voltage generating sets)"
            clause="A solar PV installation shall comply with BS 7671 Section 712 including DC isolation requirements (712.537), labelling (712.514), and string voltage limits. EV charging installations shall comply with Section 722 including the requirement on TN-C-S supplies for additional measures against PEN faults affecting persons in contact with the EV (722.411.4.1)."
            meaning={
              <>
                BS 7671 Sections 712, 722 and 551 are the three primary special-locations
                regs for renewables / EV / storage integration. The A4:2026 amendment
                specifically tightened PEN-fault protection on PME-supplied outdoor EV
                chargers. As BSE designer of any modern building, you orchestrate these
                sections plus the ENA Engineering Recommendations (G98, G99, G100) plus
                the relevant product-standard suite (IEC 62548 PV, BS EN 62619 BESS,
                IEC 61851 EV) into one integrated submission.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regs 551, 712, 722; ENA Engineering Recommendations G98, G99, G100; IEC 62548 (PV), BS EN 62619 (BESS cells), IEC 61851 (EV charging); IET Code of Practice for EV Charging Equipment Installation"
          />

          <LearningOutcomes
            outcomes={[
              "Design and specify solar PV systems for commercial buildings",
              "Apply G98/G99 requirements for embedded generation connections",
              "Size and integrate battery energy storage systems (BESS)",
              "Design EV charging infrastructure compliant with regulations",
              "Understand smart grid integration and demand response",
              "Evaluate microgrid configurations and islanding requirements",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>G98/G99:</strong> Grid connection requirements for embedded generation</li>
              <li><strong>Solar PV:</strong> Typically 850-1000 kWh/kWp annual yield in UK</li>
              <li><strong>BESS:</strong> 90-95% round-trip efficiency with lithium technology</li>
              <li><strong>EV charging:</strong> Mode 3 (7-22kW) standard for dedicated installations</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Self-consumption:</strong> Maximising on-site use of generated power</li>
              <li><strong>Peak shaving:</strong> Reducing maximum demand charges</li>
              <li><strong>Grid services:</strong> Frequency response and demand flexibility</li>
              <li><strong>Resilience:</strong> Backup power and islanding capability</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Solar PV Systems and Grid Connection">
            <p>
              Solar photovoltaic systems convert sunlight directly into electricity. For building
              services engineers, understanding system design, performance prediction and grid
              integration is essential for both new installations and retrofits.
            </p>

              <p className="text-sm font-medium text-white">Key PV System Components</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>PV modules:</strong> Monocrystalline (20-22% efficiency), polycrystalline
                  (15-17%), thin-film (10-12%)
                </li>
                <li>
                  <strong>Inverters:</strong> String inverters, microinverters, or power optimisers
                  with central inverter
                </li>
                <li>
                  <strong>Mounting systems:</strong> Roof-mounted (pitched/flat),
                  building-integrated (BIPV), ground-mounted
                </li>
                <li>
                  <strong>AC distribution:</strong> Connection point, metering, protection and
                  isolation
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                UK PV Performance Parameters
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Specific yield</strong> — 850-1000 kWh/kWp/year — South-facing, unshaded, optimal tilt</li>
              <li><strong>Performance ratio</strong> — 0.75-0.85 — Actual vs theoretical output</li>
              <li><strong>Optimal orientation</strong> — South ±30° — East/West reduces yield by ~15%</li>
              <li><strong>Optimal tilt angle</strong> — 30-40° — Lower for self-consumption focus</li>
              <li><strong>Area per kWp</strong> — 5-7 m² — Depends on module efficiency</li>
              <li><strong>Degradation</strong> — 0.5-0.7% per year — Typically 80% output at 25 years</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                PV System Sizing Example
              </p>

                <p>
                  <strong>Requirement:</strong> 50,000 kWh annual consumption, target 30% solar
                </p>
                <p>Target generation = 50,000 × 0.30 = 15,000 kWh/year</p>
                <p>Specific yield (South England) = 950 kWh/kWp/year</p>
                <p>
                  System size = 15,000 / 950 = <strong>15.8 kWp</strong>
                </p>
                <p>
                  Roof area required = 15.8 × 6 m²/kWp = <strong>~95 m²</strong>
                </p>

            

            <p>
              <strong>Design consideration:</strong> Oversizing PV relative to inverter capacity
              (DC/AC ratio of 1.1-1.3) can improve economics by capturing more energy during
              shoulder periods while clipping only peak output.
            </p>
          </ConceptBlock>

          <ConceptBlock title="G98/G99 Requirements for Embedded Generation">
            <p>
              Engineering Recommendation G98 and G99 are the UK standards governing the connection
              of generation equipment to distribution networks. Compliance is mandatory for all
              grid-connected renewable and storage systems.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                G98 vs G99 Application Thresholds
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>G98</strong> — ≤16kW per phase (≤50kW 3-phase) — Notification only — Within 28 days of commissioning</li>
              <li><strong>G99</strong> — &gt;16kW per phase (or &gt;50kW 3-phase) — Full application and approval — 45-90 working days typical</li>
            </ul>

              <p className="text-sm font-medium text-white">Key Protection Requirements</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Loss of Mains (LoM):</strong> Must disconnect within 0.5s of mains loss
                </li>
                <li>
                  <strong>Under/over voltage:</strong> Disconnect if V &lt;184V or V &gt;262V
                  (single-phase)
                </li>
                <li>
                  <strong>Under/over frequency:</strong> Disconnect if f &lt;47.5Hz or f &gt;52Hz
                </li>
                <li>
                  <strong>Rate of Change of Frequency (RoCoF):</strong> Trip at &gt;1Hz/s
                </li>
                <li>
                  <strong>Anti-islanding:</strong> Prevent energising isolated network sections
                </li>
              </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  G98 Notification Contents
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Installation address and MPAN</li>
                  <li>Generator type and capacity (kW)</li>
                  <li>Inverter make, model and G98 certificate</li>
                  <li>Installer details and certification</li>
                  <li>Commissioning date</li>
                  <li>Export meter details (if fitted)</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  G99 Application Requirements
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Formal application to DNO</li>
                  <li>Single line diagram</li>
                  <li>Protection settings schedule</li>
                  <li>Witness testing may be required</li>
                  <li>Connection agreement before energisation</li>
                  <li>Potential network reinforcement costs</li>
                </ul>

            

            <p>
              <strong>Important:</strong> All grid-connected inverters must carry valid G98 or G99
              type test certificates from an accredited laboratory. Check the ENA Type Test Register
              for approved equipment.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Battery Energy Storage Systems (BESS)">
            <p>
              Battery storage enables time-shifting of energy use, peak demand reduction, and grid
              services participation. Understanding battery technologies, sizing methodology and
              integration options is essential for modern building services design.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Battery Technology Comparison
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lithium Iron Phosphate (LFP)</strong> — 92-96% — 6000+ — Commercial, grid-scale (safety focus)</li>
              <li><strong>Lithium NMC</strong> — 90-95% — 3000-5000 — Domestic, commercial (energy density)</li>
              <li><strong>Lead-acid (VRLA)</strong> — 80-85% — 500-1500 — UPS, backup power (cost-sensitive)</li>
              <li><strong>Flow batteries</strong> — 70-80% — 10000+ — Large-scale, long duration</li>
            </ul>

              <p className="text-sm font-medium text-white">BESS Sizing Parameters</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Energy capacity (kWh):</strong> Total storage available
                </li>
                <li>
                  <strong>Power rating (kW):</strong> Maximum charge/discharge rate
                </li>
                <li>
                  <strong>C-rate:</strong> Power/Energy ratio (1C = full charge in 1 hour)
                </li>
                <li>
                  <strong>Depth of Discharge (DoD):</strong> Usable capacity (typically 80-95% for
                  lithium)
                </li>
                <li>
                  <strong>Round-trip efficiency:</strong> Energy out vs energy in
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                BESS Sizing Example: Peak Shaving
              </p>

                <p>
                  <strong>Requirement:</strong> Reduce 150kW peak demand to 100kW for 2 hours
                </p>
                <p>Peak reduction required = 150 - 100 = 50kW</p>
                <p>Duration = 2 hours</p>
                <p>Usable energy required = 50kW × 2h = 100kWh</p>
                <p>
                  At 90% DoD: Battery capacity = 100 / 0.9 = <strong>111kWh</strong>
                </p>
                <p>Power rating needed = 50kW minimum</p>
                <p>
                  → Select 120kWh, 60kW battery system (0.5C rating)
                </p>

            

              
                <p className="text-sm font-medium text-elec-yellow/80">AC-Coupled Systems</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Battery has dedicated inverter</li>
                  <li>Connects to AC distribution board</li>
                  <li>Can retrofit to existing PV</li>
                  <li>Independent of PV inverter brand</li>
                  <li>Slightly lower efficiency (double conversion)</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">DC-Coupled Systems</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Battery connects to DC bus</li>
                  <li>Shares inverter with PV (hybrid)</li>
                  <li>Higher efficiency (single conversion)</li>
                  <li>Requires compatible equipment</li>
                  <li>Better for new installations</li>
                </ul>

            

            <p>
              <strong>Safety note:</strong> BESS installations must comply with fire safety
              requirements including IEC 62619 (safety requirements) and consider thermal runaway
              protection, ventilation, and fire suppression systems for commercial installations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Hybrid Systems and Load Matching">
            <p>
              Hybrid systems combine multiple generation and storage technologies to optimise energy
              use, maximise self-consumption and provide resilience. Effective load matching
              algorithms balance generation, storage and grid interaction in real-time.
            </p>

              <p className="text-sm font-medium text-white">Self-Consumption Strategies</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Direct consumption:</strong> Use PV generation immediately when available
                </li>
                <li>
                  <strong>Time-shifting:</strong> Store excess PV for evening/night use
                </li>
                <li>
                  <strong>Load scheduling:</strong> Run high-demand loads during peak generation
                </li>
                <li>
                  <strong>Export limitation:</strong> Prevent grid export to maximise on-site use
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Self-Consumption Rates
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>PV only (domestic)</strong> — 25-40% — Depends on occupancy patterns</li>
              <li><strong>PV + battery (domestic)</strong> — 60-80% — Battery sized at ~1kWh/kWp</li>
              <li><strong>PV only (commercial)</strong> — 40-70% — Daytime operation matches generation</li>
              <li><strong>PV + battery (commercial)</strong> — 70-90% — Peak shaving and evening use</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Energy Management System (EMS) Functions
              </p>

                
                  <p className="font-medium mb-1">Generation Management</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>PV output monitoring and forecasting</li>
                    <li>Inverter power limiting</li>
                    <li>Export management</li>
                    <li>Grid code compliance</li>
                  </ul>

                
                  <p className="font-medium mb-1">Storage Control</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Charge/discharge scheduling</li>
                    <li>State of charge management</li>
                    <li>Grid services participation</li>
                    <li>Tariff optimisation</li>
                  </ul>

              

            <p><em>
              <strong>Optimisation:</strong> Modern EMS uses machine learning to predict generation
              and consumption, enabling proactive battery management and optimal grid interaction
              timing.
            </em></p>
          </ConceptBlock>

          <ConceptBlock title="EV Charging Infrastructure">
            <p>
              Electric vehicle charging is a rapidly growing load category in building services.
              Understanding charging modes, infrastructure requirements and smart charging
              capabilities is essential for futureproof installations.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                EV Charging Modes (IEC 61851)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Mode 2</strong> — 2.3kW (10A max) — Standard socket + ICCB — Emergency/occasional use only</li>
              <li><strong>Mode 3 (single-phase)</strong> — 3.6-7.4kW — Dedicated EVSE (Type 2) — Domestic, workplace</li>
              <li><strong>Mode 3 (three-phase)</strong> — 11-22kW — Dedicated EVSE (Type 2) — Commercial, fleet depots</li>
              <li><strong>Mode 4 (DC rapid)</strong> — 50-350kW — DC fast charger (CCS/CHAdeMO) — Public rapid charging, fleet hubs</li>
            </ul>

              <p className="text-sm font-medium text-white">UK Regulatory Requirements</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Building Regulations Part S:</strong> New buildings must have EV charging
                  provision
                </li>
                <li>
                  <strong>EV Smart Charge Regulations 2021:</strong> Domestic chargers must have
                  smart functionality
                </li>
                <li>
                  <strong>BS 7671 Section 722:</strong> Specific requirements for EV charging
                  installations
                </li>
                <li>
                  <strong>OZEV Grant (EVHS):</strong> Requirements for grant-eligible domestic
                  installations
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                EV Charger Circuit Design
              </p>

                <p>
                  <strong>7.4kW Charger (32A single-phase):</strong>
                </p>
                <p>Current: I = 7400 / 230 = 32.2A</p>
                <p>Cable: 6mm² minimum (Iz = 46A in conduit)</p>
                <p>Protection: 32A Type A RCD + MCB (or RCBO)</p>
                <p>Voltage drop (20m): 32 × 40 × 3.08mΩ/m = 3.9V (1.7%)</p>
                <p>
                  <strong>22kW Charger (32A three-phase):</strong>
                </p>
                <p>Cable: 4mm² minimum per phase</p>
                <p>Protection: 32A Type B RCD (for DC fault detection)</p>
                <p>Connection: 5-core SWA or individual cores in conduit</p>

            

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Smart Charging Features
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Time-of-use tariff scheduling</li>
                  <li>Solar/battery integration</li>
                  <li>Load balancing (multiple EVs)</li>
                  <li>Demand response capability</li>
                  <li>User authentication and billing</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Load Management Options
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Static:</strong> Fixed current limit per charger
                  </li>
                  <li>
                    <strong>Dynamic:</strong> Real-time load sharing
                  </li>
                  <li>
                    <strong>Scheduled:</strong> Time-based priority
                  </li>
                  <li>
                    <strong>Solar-matched:</strong> Track PV availability
                  </li>
                </ul>

            

            <p>
              <strong>Diversity:</strong> BS 7671 Appendix 15 provides diversity factors for EV
              charging - typically 0.6-0.8 for multiple domestic chargers, enabling significant
              supply capacity savings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Smart Grid Integration">
            <p>
              Smart grid integration enables buildings to participate in grid services, responding
              to price signals and grid operator requests. This creates revenue opportunities while
              supporting grid stability as renewable penetration increases.
            </p>

              <p className="text-sm font-medium text-white">
                Grid Services and Flexibility Markets
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Frequency response:</strong> Automatic power adjustment to maintain 50Hz
                </li>
                <li>
                  <strong>Demand Side Response (DSR):</strong> Reducing load on request during peak
                  periods
                </li>
                <li>
                  <strong>Capacity Market:</strong> Guaranteed availability payments for reliable
                  capacity
                </li>
                <li>
                  <strong>Balancing Mechanism:</strong> Real-time trading with National Grid ESO
                </li>
                <li>
                  <strong>Local flexibility:</strong> DNO constraint management services
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Demand Response Capability by Asset
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Battery storage</strong> — &lt;1 second — Minutes to hours — Frequency response, DSR, arbitrage</li>
              <li><strong>EV charging</strong> — Seconds — Hours — DSR, V2G services</li>
              <li><strong>HVAC systems</strong> — Minutes — 15min-2hr — DSR (thermal mass provides buffer)</li>
              <li><strong>Lighting</strong> — Instant — Minutes — Limited DSR (dimming)</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Communication Protocols
              </p>

                
                  <p className="font-medium mb-1">Grid Operator Interface</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>DNP3 - Distribution network protocol</li>
                    <li>IEC 61850 - Substation automation</li>
                    <li>OpenADR - Automated demand response</li>
                  </ul>

                
                  <p className="font-medium mb-1">Building/Device Level</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Modbus TCP - Equipment control</li>
                    <li>OCPP - EV charger management</li>
                    <li>SunSpec - Solar/storage monitoring</li>
                  </ul>

              

            <p><em>
              <strong>Revenue potential:</strong> A 100kW/200kWh commercial BESS participating in
              frequency response can generate £15,000-30,000 annually from grid services, in
              addition to peak shaving savings.
            </em></p>
          </ConceptBlock>

          <ConceptBlock title="Microgrids and Islanding">
            <p>
              Microgrids are localised energy systems capable of operating independently from the
              main grid. They combine generation, storage and loads with intelligent control to
              provide resilience, optimise energy use and enable community-scale renewable
              integration.
            </p>

              <p className="text-sm font-medium text-white">Microgrid Components</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Distributed generation:</strong> PV, wind, CHP, fuel cells
                </li>
                <li>
                  <strong>Energy storage:</strong> Batteries, thermal storage, flywheels
                </li>
                <li>
                  <strong>Controllable loads:</strong> HVAC, water heating, EV charging
                </li>
                <li>
                  <strong>Point of Common Coupling (PCC):</strong> Grid connection point
                </li>
                <li>
                  <strong>Microgrid controller:</strong> Central intelligence for optimisation
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Islanding Modes and Requirements
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Grid-connected</strong> — Normal operation, grid provides reference — Standard G98/G99 compliance</li>
              <li><strong>Intentional island</strong> — Planned disconnection (maintenance) — Transfer switching, load shedding</li>
              <li><strong>Unplanned island</strong> — Grid failure, automatic transition — Black-start capability, fast transfer</li>
              <li><strong>Resynchronisation</strong> — Reconnection to grid — Synchronisation check relay</li>
            </ul>

              <p className="text-sm font-medium text-white">
                BS 7671 Section 551 Requirements
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Switching arrangements must prevent paralleling of incompatible sources
                </li>
                <li>
                  Automatic changeover devices must be type-tested for the application
                </li>
                <li>
                  Earth fault loop impedance must be verified for each source configuration
                </li>
                <li>
                  Standby supply ratings must be adequate for connected loads
                </li>
                <li>Labels required at all switch positions and supply points</li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Islanding Protection Scheme
              </p>

                <p>
                  <strong>Anti-islanding (standard G98/G99):</strong>
                </p>
                <p>Under/over voltage: 184V-262V (0.5s trip)</p>
                <p>Under/over frequency: 47.5Hz-52Hz (0.5s trip)</p>
                <p>RoCoF: 1Hz/s (0.5s trip)</p>
                <p>
                  <strong>Controlled islanding (microgrid):</strong>
                </p>
                <p>Transfer switch: &lt;20ms for critical loads</p>
                <p>Load shedding: Non-essential loads disconnected</p>
                <p>Grid-forming inverter: Provides voltage/frequency reference</p>
                <p>Sync check: ±5° phase, ±0.5Hz, ±5% voltage</p>

            

            <p>
              <strong>Important:</strong> Islanding capability requires specific agreement with the
              DNO and additional protection equipment. Standard grid-tied inverters cannot provide
              islanding functionality.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Commercial PV + Storage System
              </p>
              <p>
                <strong>Scenario:</strong> Office building, 100,000 kWh annual consumption, 150kW
                peak demand, aiming for 40% renewable supply with peak shaving.
              </p>

                <p>
                  <strong>PV Sizing:</strong>
                </p>
                <p>Target generation = 100,000 × 0.40 = 40,000 kWh/year</p>
                <p>
                  At 900 kWh/kWp: System size = 40,000 / 900 = <strong>44.4 kWp</strong>
                </p>
                <p>
                  Roof area = 45 × 6 = <strong>270 m²</strong>
                </p>
                <p>
                  <strong>Battery Sizing (peak shaving to 100kW for 2 hours):</strong>
                </p>
                <p>Peak reduction = 150 - 100 = 50kW</p>
                <p>Energy required = 50 × 2 = 100kWh</p>
                <p>
                  At 90% DoD: Capacity = 100 / 0.9 = <strong>111 kWh</strong>
                </p>
                <p>
                  Select: <strong>50kWp PV + 120kWh/60kW BESS</strong>
                </p>
                <p>
                  → G99 application required (50kW exceeds G98 limit)
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Multi-EV Charger Installation
              </p>
              <p>
                <strong>Scenario:</strong> Car park with 10 × 7.4kW chargers, 100A three-phase
                supply available.
              </p>

                <p>
                  <strong>Maximum demand calculation:</strong>
                </p>
                <p>Full load = 10 × 7.4kW = 74kW</p>
                <p>Current at 400V 3-phase = 74,000 / (√3 × 400) = 107A</p>
                <p className="text-red-400">Exceeds 100A supply</p>
                <p>
                  <strong>With diversity (BS 7671 App 15, factor 0.7):</strong>
                </p>
                <p>Diversified load = 74 × 0.7 = 51.8kW</p>
                <p>Current = 51,800 / (√3 × 400) = 75A</p>
                <p className="text-green-400">✓ Within 100A supply</p>
                <p>
                  <strong>Dynamic load management alternative:</strong>
                </p>
                <p>Available capacity = 100A × √3 × 400 = 69.3kW</p>
                <p>Per charger limit = 69.3 / 10 = 6.9kW each</p>
                <p className="text-white">
                  → Implement dynamic load sharing for full charging when fewer EVs connected
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Self-Consumption Analysis
              </p>
              <p>
                <strong>Scenario:</strong> Domestic 4kWp PV, considering 10kWh battery addition.
              </p>

                <p>
                  <strong>Without battery:</strong>
                </p>
                <p>Annual generation = 4 × 900 = 3,600 kWh</p>
                <p>Self-consumption rate = 35%</p>
                <p>Self-consumed = 3,600 × 0.35 = 1,260 kWh</p>
                <p>Exported = 3,600 - 1,260 = 2,340 kWh</p>
                <p>
                  <strong>With 10kWh battery:</strong>
                </p>
                <p>Self-consumption rate = 75%</p>
                <p>Self-consumed = 3,600 × 0.75 = 2,700 kWh</p>
                <p>
                  Additional self-consumption = 2,700 - 1,260 = <strong>1,440 kWh/year</strong>
                </p>
                <p>
                  <strong>Financial benefit (import 30p, export 15p):</strong>
                </p>
                <p>Without battery: Import cost saving = 1,260 × £0.30 = £378</p>
                <p>Export income = 2,340 × £0.15 = £351</p>
                <p>With battery: Import cost saving = 2,700 × £0.30 = £810</p>
                <p>Export income = 900 × £0.15 = £135</p>
                <p>
                  Additional annual benefit = (£810 + £135) - (£378 + £351) ={' '}
                  <strong>£216/year</strong>
                </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Grid Connection</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>G98: ≤16kW/phase, notification only</li>
                  <li>G99: &gt;16kW/phase, formal application</li>
                  <li>LoM protection: 47.5-52Hz, RoCoF 1Hz/s</li>
                  <li>Voltage limits: 184V-262V (single-phase)</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">System Performance</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>UK PV yield: 850-1000 kWh/kWp/year</li>
                  <li>Battery efficiency: 90-95% round-trip</li>
                  <li>EV Mode 3: 7.4kW (1-phase), 22kW (3-phase)</li>
                  <li>Self-consumption: 25-40% (PV only), 60-80% (+ battery)</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="School with PV + BESS + EV charging &mdash; integrated G99 connection"
            situation={
              <>
                A secondary school is adding 200 kWp rooftop solar PV + 250 kWh / 100 kW
                battery storage + 12&times;22 kW EV chargers in the staff carpark. The
                existing DNO supply is 250 kVA TN-C-S (PME). The combined export
                capability of PV is 200 kW &mdash; well above the G98 single-phase
                threshold, so the project is in G99 scope. The carpark chargers raise
                BS 7671 722 PEN-fault questions.
              </>
            }
            whatToDo={
              <>
                Three workstreams: (a) Submit G99 application to the DNO with PV +
                BESS interface protection settings (LoM, RoCoF, U/V, U/F); apply for
                G100 export limitation if needed to cap at the existing supply
                capacity; (b) for the EV chargers, specify chargers with integrated
                PEN-fault detection (the cheaper compliant option than dedicated TT
                earth electrodes) per BS 7671 722.411.4.1; (c) integrate PV + BESS +
                EV charging on a common BMS controller with dispatch logic that
                charges BESS from PV, supplies EV charging from BESS / PV during
                daytime, and exports any surplus within the G100 limit. Document the
                whole scheme in one DNO submission and update the building log book.
              </>
            }
            whyItMatters={
              <>
                Schools, council buildings and commercial sites are all moving to the
                same combined PV + BESS + EV pattern. The HNC engineer who can navigate
                G98/G99/G100 + BS 7671 712 / 722 / 551 simultaneously is the BSE
                profession&rsquo;s scarce skill in 2026 onwards. Getting the
                integrated submission right first time saves months of DNO back-and-forth.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Solar PV: BS 7671 Section 712 (DC isolation, string V, labelling) + IEC 62548 (system design).',
              'G98: micro-generation &le; 16 A single-phase, fit-and-inform DNO; G99: anything larger, prior connection agreement.',
              'G100: export limitation scheme &mdash; allows higher generation behind a cap that prevents export above DNO-agreed limit.',
              'BESS battery storage: BS EN 62619 (cells), BS EN 62933 (system), thermal management + fire detection essential.',
              'EV charging: BS 7671 Section 722 + IEC 61851; A4:2026 tightened PEN-fault protection for PME-supplied outdoor chargers.',
              'OCPP (Open Charge Point Protocol): vendor-neutral EV management protocol; OSCP for grid-side smart charging.',
              'Microgrid: islandable subsystem with own generation + storage + load &mdash; needs synchronisation, black-start, and DNO interface protection.',
              'Integrated PV + BESS + EV on common BMS dispatch &mdash; the standard pattern for school / commercial decarbonisation projects in 2026 onwards.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-6")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BS 7671, CIBSE and Part L requirements for energy efficiency
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Back to Module 3
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section6_7;
