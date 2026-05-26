/**
 * Module 8 · Section 1 · Subsection 1 — Boiler Systems
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Boiler types, ErP efficiency ratings, cascade systems, flue requirements and safety controls for heating installations
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

const TITLE = 'Boiler Systems - HNC Module 8 Section 1.1';
const DESCRIPTION =
  'Understanding boiler types, ErP efficiency ratings, cascade systems, flue requirements and safety controls for heating installations in accordance with Building Regulations and BS 7671.';

const quickCheckQuestions = [
  {
    id: 'condensing-efficiency',
    question:
      'What is the minimum seasonal efficiency required for a condensing boiler under ErP regulations?',
    options: [
      '94%',
      '92%',
      '90%',
      '86%',
    ],
    correctIndex: 1,
    explanation:
      'Under ErP (Energy-related Products) regulations, condensing boilers must achieve a minimum seasonal efficiency of 92% to qualify for the highest efficiency class. This is measured under the Seasonal Space Heating Energy Efficiency (SEDBUK 2009) methodology.',
  },
  {
    id: 'flue-terminal-position',
    question:
      'According to Building Regulations Part J, what is the minimum distance from a flue terminal to an opening window?',
    options: [
      '300mm',
      '600mm',
      '150mm',
      '450mm',
    ],
    correctIndex: 0,
    explanation:
      'Building Regulations Approved Document J specifies that flue terminals must be at least 300mm from any opening into the building, including openable windows, doors, and air vents. This prevents flue gases from re-entering the building.',
  },
  {
    id: 'cascade-control',
    question:
      'In a cascade boiler system, how are the boilers typically controlled to optimise efficiency?',
    options: [
      'To confirm the defect has been properly corrected and safety restored',
      'Lead boiler fires first with lag boilers sequenced as demand increases',
      'To identify obvious faults safely before applying power',
      'By ensuring materials are delivered as close as possible to their point of use',
    ],
    correctIndex: 1,
    explanation:
      'Cascade systems use sequencing control where the lead boiler fires first, with additional lag boilers brought online as heat demand increases. The lead boiler is rotated periodically to ensure even wear across all units. This maintains high efficiency at all load conditions.',
  },
  {
    id: 'gas-safety-interlock',
    question:
      'Which safety device must be wired into the boiler control circuit to meet Gas Safe requirements?',
    options: [
      'To prevent materials and tools from falling off the edge',
      'To meet maximum demand safely and effectively',
      'Equipment not to cause or be susceptible to interference',
      'Overheat thermostat and gas solenoid valve interlock',
    ],
    correctIndex: 3,
    explanation:
      'Gas Safe regulations require that an overheat (high limit) thermostat is wired to shut off the gas supply via a solenoid valve interlock. This provides positive shut-off in the event of overheating, preventing dangerous conditions from developing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the primary characteristic that distinguishes a condensing boiler from a conventional boiler?',
    options: [
      'Identification of different circuits and functions',
      'Recovery of latent heat from flue gases by condensing water vapour',
      'It represents the conductor material and insulation type constant',
      'Two-way communication and individual addressing',
    ],
    correctAnswer: 1,
    explanation:
      'Condensing boilers achieve higher efficiency by recovering latent heat from the water vapour in flue gases. When the flue gases cool below the dew point (approximately 55°C), the water vapour condenses, releasing additional heat energy to the system.',
  },
  {
    id: 2,
    question:
      'Under the Energy-related Products (ErP) directive, what efficiency class represents the highest performance for space heating?',
    options: [
      'Class A+',
      'Class B',
      'Class A+++',
      'Class A',
    ],
    correctAnswer: 2,
    explanation:
      'The ErP directive uses an energy labelling system from G (lowest) to A+++ (highest) for space heating. Modern condensing boilers typically achieve A or A+ ratings, with heat pumps capable of A++ and A+++ ratings.',
  },
  {
    id: 3,
    question:
      'What is the typical return water temperature required for a condensing boiler to operate in condensing mode?',
    options: [
      'Below 45°C',
      'Below 35°C',
      'Below 65°C',
      'Below 55°C',
    ],
    correctAnswer: 3,
    explanation:
      'For a condensing boiler to operate in condensing mode, the return water temperature must be below the dew point of the flue gases, approximately 55°C. Lower return temperatures result in greater condensation and higher efficiency gains.',
  },
  {
    id: 4,
    question:
      'What type of boiler is most suitable for a property with no hot water cylinder and limited space?',
    options: [
      'Combination (combi) boiler',
      'Regular (heat-only) boiler',
      'System boiler',
      'Condensing floor-standing boiler',
    ],
    correctAnswer: 0,
    explanation:
      'A combination (combi) boiler provides both space heating and instantaneous domestic hot water without the need for a separate hot water storage cylinder. This makes it ideal for smaller properties with limited space.',
  },
  {
    id: 5,
    question:
      'According to Building Regulations Part L, what is the minimum boiler efficiency requirement for new installations?',
    options: [
      '88% SEDBUK',
      '90% SEDBUK',
      '92% SEDBUK',
      '86% SEDBUK',
    ],
    correctAnswer: 1,
    explanation:
      'Building Regulations Approved Document L requires that new boiler installations achieve a minimum seasonal efficiency of 90% SEDBUK (2009). In practice, this means condensing boilers are required for virtually all new installations.',
  },
  {
    id: 6,
    question: 'In a cascade boiler system, what is the purpose of lead-lag rotation?',
    options: [
      'As specified by the manufacturer, typically 4-8 metres equivalent',
      'Benchmark commissioning checklist and Building Regulations notification',
      'To ensure even wear and extend service life across all boilers',
      'Fused connection unit on a dedicated radial circuit',
    ],
    correctAnswer: 2,
    explanation:
      'Lead-lag rotation periodically changes which boiler operates as the primary (lead) unit. This distributes operating hours evenly across all boilers, ensuring even wear and extending the service life of the entire system.',
  },
  {
    id: 7,
    question:
      'What material is typically used for condensate drainage pipework from condensing boilers?',
    options: [
      'Copper',
      'Mild steel',
      'Cast iron',
      'PVC or ABS plastic',
    ],
    correctAnswer: 3,
    explanation:
      'Condensate from condensing boilers is acidic (pH 3-5) and would corrode metal pipework. PVC or ABS plastic pipework is used as it is resistant to the acidic condensate and provides a long service life.',
  },
  {
    id: 8,
    question:
      'What is the minimum internal diameter for a condensate drainage pipe from a domestic condensing boiler?',
    options: [
      '22mm',
      '28mm',
      '15mm',
      '32mm',
    ],
    correctAnswer: 0,
    explanation:
      'The minimum internal diameter for condensate pipework is 22mm to prevent blockages and ensure adequate flow. External condensate pipes may need to be larger (32mm) and must be insulated or traced to prevent freezing.',
  },
  {
    id: 9,
    question:
      'According to BS 7671, what type of electrical supply is typically required for a domestic boiler?',
    options: [
      'Vertical balanced flue through the roof',
      'Fused connection unit on a dedicated radial circuit',
      'As specified by the manufacturer, typically 4-8 metres equivalent',
      'To ensure even wear and extend service life across all boilers',
    ],
    correctAnswer: 1,
    explanation:
      'Domestic boilers are typically connected via a fused connection unit (FCU), usually rated at 3A or 5A, on a dedicated radial circuit. This provides a readily accessible means of isolation for maintenance while preventing accidental disconnection.',
  },
  {
    id: 10,
    question: 'What is the purpose of the condensate trap on a condensing boiler?',
    options: [
      'Benchmark commissioning checklist and Building Regulations notification',
      'Vertical balanced flue through the roof',
      'To prevent flue gases escaping via the condensate drain',
      'To ensure even wear and extend service life across all boilers',
    ],
    correctAnswer: 2,
    explanation:
      'The condensate trap maintains a water seal that prevents combustion gases from escaping through the condensate drain. The trap must be properly filled with water and checked during commissioning and servicing.',
  },
  {
    id: 11,
    question:
      'What type of flue is required when a condensing boiler is installed in an internal room with no external wall?',
    options: [
      'Natural draught flue',
      'Open flue with draught diverter',
      'Room-sealed with no flue required',
      'Vertical balanced flue through the roof',
    ],
    correctAnswer: 3,
    explanation:
      'When a condensing boiler cannot be located on an external wall, a vertical balanced flue system through the roof is required. This maintains the room-sealed principle while providing combustion air supply and flue gas discharge.',
  },
  {
    id: 12,
    question:
      'Under Gas Safe requirements, what documentation must be provided to the customer after boiler installation?',
    options: [
      'Benchmark commissioning checklist and Building Regulations notification',
      'To ensure even wear and extend service life across all boilers',
      'As specified by the manufacturer, typically 4-8 metres equivalent',
      'To prevent flue gases escaping via the condensate drain',
    ],
    correctAnswer: 0,
    explanation:
      'Gas Safe registered engineers must complete the Benchmark commissioning checklist (or equivalent manufacturer documentation) and notify Building Control of the installation. A copy must be provided to the customer for their records.',
  },
  {
    id: 13,
    question:
      'What is the maximum horizontal length for a room-sealed balanced flue on a typical domestic boiler?',
    options: [
      'Fused connection unit on a dedicated radial circuit',
      'As specified by the manufacturer, typically 4-8 metres equivalent',
      'To ensure even wear and extend service life across all boilers',
      'Benchmark commissioning checklist and Building Regulations notification',
    ],
    correctAnswer: 1,
    explanation:
      'Maximum flue lengths are specified by the boiler manufacturer and vary depending on the model. Typically, room-sealed balanced flues can extend 4-8 metres equivalent, with deductions for bends. Always refer to manufacturer instructions.',
  },
  {
    id: 14,
    question:
      'In a cascade boiler installation, what is the typical method of hydraulic separation between boilers and the heating system?',
    options: [
      'Specific locations of air leakage paths',
      'New installations and major alterations',
      'Low-loss header or hydraulic separator',
      'Boiler plant startup and staging sequence',
    ],
    correctAnswer: 2,
    explanation:
      'A low-loss header or hydraulic separator provides hydraulic separation between the boiler primary circuit and the secondary heating system. This allows independent flow rates, prevents boiler short-cycling, and ensures proper return temperatures.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a system boiler and a combination boiler?',
    answer:
      'A system boiler heats water for a separate hot water storage cylinder, making it suitable for properties with higher hot water demand and multiple bathrooms. A combination (combi) boiler provides instantaneous hot water without a storage cylinder, making it more compact but with limited hot water flow rate. System boilers can supply multiple outlets simultaneously, while combi boilers may struggle with simultaneous demand.',
  },
  {
    question: 'Why do condensing boilers produce condensate and how should it be disposed of?',
    answer:
      'Condensing boilers recover latent heat from flue gases by cooling them below the dew point (approximately 55°C), causing water vapour to condense. This condensate is slightly acidic (pH 3-5) and must be safely drained. It can discharge to an internal soil stack, external drain, or purpose-made soakaway. External pipework must be insulated or traced to prevent freezing. The typical condensate production is 2-3 litres per hour during full operation.',
  },
  {
    question: 'What electrical connections are required for a modern condensing boiler?',
    answer:
      'A typical domestic condensing boiler requires: a fused connection unit (3A or 5A fuse) for permanent live supply, connections for room thermostat, cylinder thermostat (system boilers), programmer/time clock, and potentially external weather compensation sensor. All wiring must comply with BS 7671, with adequate isolation facilities for maintenance. Low voltage (typically 24V) control circuits are common on modern boilers.',
  },
  {
    question: 'How does weather compensation improve boiler efficiency?',
    answer:
      'Weather compensation uses an external temperature sensor to adjust the boiler flow temperature based on outside conditions. In milder weather, lower flow temperatures are used, which increases condensing operation and improves efficiency. Modern systems can achieve 5-15% additional efficiency gains compared to fixed temperature operation. This also improves comfort by preventing overheating in milder conditions.',
  },
  {
    question: 'What are the key considerations when specifying a cascade boiler system?',
    answer:
      'Key considerations include: total heat load calculation with diversity factors, number and size of boilers (typically 2-4 units), hydraulic separation design, cascade controller specification, flue arrangements (individual or shared), condensate disposal for multiple units, commissioning requirements, and maintenance access. The system should be sized so that normal operation uses 1-2 boilers, with additional units for peak demand and resilience.',
  },
  {
    question: 'What safety devices are mandatory on gas boilers under current regulations?',
    answer:
      'Mandatory safety devices include: flame supervision device (ionisation probe or thermocouple), overheat thermostat (high limit stat), pressure relief valve, automatic air vent, and for room-sealed appliances, a flue gas analyser point. Modern boilers also incorporate: ignition lockout after failed attempts, frost protection, pump overrun, and anti-cycling controls. All safety devices must fail to a safe condition (fail-safe).',
  },
];

const HNCModule8Section1_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 1 · Subsection 1"
            title="Boiler Systems"
            description="Boiler types, ErP efficiency ratings, cascade systems, flue requirements and safety controls for heating installations"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Identify and compare different boiler types and their applications",
              "Understand ErP efficiency ratings and SEDBUK methodology",
              "Design and specify cascade boiler systems with sequencing control",
              "Apply Building Regulations Part J flue requirements correctly",
              "Specify appropriate safety controls and electrical connections",
              "Commission boilers in accordance with Gas Safe and manufacturer requirements",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Boiler Types and Classifications">
            <p>Modern heating systems utilise various boiler types, each suited to specific applications and building requirements. Understanding the characteristics, advantages and limitations of each type is essential for correct specification and installation.</p>
            <p><strong>Primary Boiler Classifications:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Combination (Combi) boilers:</strong> Provide space heating and instantaneous DHW from a single unit</li>
              <li><strong>System boilers:</strong> Heat water for an unvented or vented hot water cylinder, with integral pump and expansion vessel</li>
              <li><strong>Regular (heat-only) boilers:</strong> Require separate pump, expansion vessel and controls, typically with vented cylinders</li>
              <li><strong>Condensing boilers:</strong> High-efficiency units that recover latent heat from flue gases</li>
            </ul>
            <p><strong>Boiler Type Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Combi:</strong> Instantaneous — Small-medium properties, 1-2 bathrooms — 24-42 kW</li>
              <li><strong>System:</strong> Stored (cylinder) — Larger properties, multiple bathrooms — 12-35 kW</li>
              <li><strong>Regular:</strong> Stored (cylinder) — Replacement in existing systems — 12-30 kW</li>
              <li><strong>Commercial:</strong> Various — Large buildings, cascade systems — 50-150+ kW</li>
            </ul>
            <p><strong>Condensing Boiler Operation</strong></p>
            <p>Key principles:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Flue gas cooled below dew point (~55°C)</li>
              <li>• Water vapour condenses releasing latent heat</li>
              <li>• Requires low return temperature (&lt;55°C)</li>
              <li>• Secondary heat exchanger for heat recovery</li>
            </ul>
            <p>Efficiency factors:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Return water temperature critical</li>
              <li>• Weather compensation improves operation</li>
              <li>• Oversized radiators enhance condensing</li>
              <li>• Underfloor heating ideal for condensing</li>
            </ul>
            <p><strong>Building Regulations requirement:</strong> Part L mandates minimum 90% seasonal efficiency (SEDBUK 2009) for new boiler installations, effectively requiring condensing technology in virtually all cases.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Efficiency Ratings and ErP Directive">
            <p>The Energy-related Products (ErP) directive establishes minimum efficiency standards and energy labelling requirements for heating appliances. Understanding these ratings is essential for specifying compliant and efficient heating systems.</p>
            <p><strong>ErP Energy Labels</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>A+++ to G rating scale</li>
              <li>Space heating efficiency</li>
              <li>Water heating efficiency</li>
              <li>Sound power level (dB)</li>
              <li>Annual energy consumption</li>
            </ul>
            <p><strong>SEDBUK Methodology</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Seasonal efficiency calculation</li>
              <li>Full and part load testing</li>
              <li>UK climate conditions</li>
              <li>Standardised test procedures</li>
              <li>2009 and 2005 versions</li>
            </ul>
            <p><strong>Minimum Standards</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Space heaters: 86% minimum</li>
              <li>Combi DHW: 82% minimum</li>
              <li>NOx emissions: &lt;56 mg/kWh</li>
              <li>Smart controls required</li>
              <li>Ecodesign compliance</li>
            </ul>
            <p><strong>ErP Efficiency Classes - Space Heating</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>A+++:</strong> &gt;150% — Heat pumps (GSHP)</li>
              <li><strong>A++:</strong> 125-150% — Heat pumps (ASHP)</li>
              <li><strong>A+:</strong> 98-125% — Condensing + solar thermal</li>
              <li><strong>A:</strong> 90-98% — Condensing boilers</li>
              <li><strong>B-D:</strong> 82-90% — Non-condensing (limited use)</li>
            </ul>
            <p><strong>Weather Compensation Benefits</strong></p>
            <p>Weather compensation adjusts boiler flow temperature based on external conditions. In milder weather, lower flow temperatures (&lt;55°C) maximise condensing operation, improving seasonal efficiency by 5-15%. Modern ErP regulations require temperature controls with weather compensation capability as standard.</p>
            <p><strong>Compliance note:</strong> All boilers sold in the UK must display ErP energy labels. Installers must provide customers with product fiche documentation showing efficiency data and advise on appropriate controls to achieve stated performance.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Cascade Systems and Sequencing Control">
            <p>Cascade boiler systems utilise multiple boilers operating together to meet varying heat demands efficiently. Sequencing control brings boilers online progressively, maintaining high efficiency across the full load range while providing resilience.</p>
            <p><strong>Cascade System Advantages:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Improved efficiency:</strong> Boilers operate closer to optimal load point (70-80% capacity)</li>
              <li><strong>Resilience:</strong> System continues operating if one boiler fails (N+1 redundancy)</li>
              <li><strong>Flexibility:</strong> Scalable capacity to match building demand profiles</li>
              <li><strong>Maintenance:</strong> Individual boilers can be serviced without total system shutdown</li>
              <li><strong>Extended life:</strong> Reduced running hours per unit with lead-lag rotation</li>
            </ul>
            <p><strong>Cascade Control Methods</strong></p>
            <p><strong>Sequencing Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Lead boiler fires on initial demand</li>
              <li>• Lag boilers staged as load increases</li>
              <li>• Time delay between staging (typically 3-5 mins)</li>
              <li>• Reverse sequence on falling demand</li>
              <li>• Hysteresis prevents short cycling</li>
            </ul>
            <p><strong>Lead-Lag Rotation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>• Periodic rotation of lead boiler</li>
              <li>• Options: time-based, run-hours, demand-based</li>
              <li>• Typical rotation: daily or weekly</li>
              <li>• Run-hour equalisation over time</li>
              <li>• Fault condition triggers auto-rotation</li>
            </ul>
            <p><strong>Cascade System Components</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Low-loss header:</strong> Hydraulic separation — Size for total system flow rate, air/dirt separation</li>
              <li><strong>Cascade controller:</strong> Sequencing logic — BMS integration, weather compensation, optimisation</li>
              <li><strong>Primary pumps:</strong> Boiler circuit flow — Individual or common, variable speed recommended</li>
              <li><strong>Non-return valves:</strong> Prevent reverse flow — Spring-loaded type, low resistance design</li>
              <li><strong>Isolation valves:</strong> Maintenance isolation — Full bore, lockable handles</li>
              <li><strong>Common flue:</strong> Shared flue system — Fan-assisted, sized for all boilers firing</li>
            </ul>
            <p><strong>Worked Example: Cascade Sizing</strong></p>
            <p><strong>Scenario:</strong> Office building with 200 kW design heat load. Specify cascade system.</p>
            <p>Design heat load: 200 kW</p>
            <p>Diversity factor: 0.8 (typical office)</p>
            <p>Operating load: 200 × 0.8 = 160 kW</p>
            <p>Option A: 3 × 80 kW boilers (240 kW total)</p>
            <p>- Normal operation: 2 boilers at 80% = 128 kW</p>
            <p>- Peak demand: All 3 boilers = 240 kW capacity</p>
            <p>- N+1 redundancy maintained</p>
            <p>Option B: 4 × 60 kW boilers (240 kW total)</p>
            <p>- Better modulation range</p>
            <p>- Higher capital cost</p>
            <p>- More maintenance items</p>
            <p>Recommendation: Option A - balances efficiency, cost and resilience</p>
            <p><strong>Design principle:</strong> Size cascade systems so that normal operation uses fewer than all boilers, reserving capacity for peak demand and providing redundancy. Typical designs operate at 60-80% of total installed capacity during average conditions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Flue Requirements and Safety Controls">
            <p>Correct flue installation is critical for safe boiler operation. Building Regulations Approved Document J specifies requirements for combustion appliances, while Gas Safe regulations mandate specific safety controls and interlocks.</p>
            <p><strong>Flue Types and Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Room-sealed balanced flue:</strong> Concentric or twin-pipe system drawing air from outside - most common for modern boilers</li>
              <li><strong>Open flue:</strong> Draws combustion air from the room - requires adequate ventilation</li>
              <li><strong>Fan-assisted flue:</strong> Uses fan to overcome longer flue runs</li>
              <li><strong>Vertical balanced flue:</strong> Through-roof installation for internal locations</li>
            </ul>
            <p><strong>Building Regulations Part J - Terminal Positions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Below opening window:</strong> 300mm — 300mm — 300mm</li>
              <li><strong>Above opening window:</strong> 300mm — 300mm — 300mm</li>
              <li><strong>Horizontally from opening:</strong> 300mm — 400mm — 600mm</li>
              <li><strong>Below eaves/gutter:</strong> 200mm — 300mm — 300mm</li>
              <li><strong>From internal corner:</strong> 300mm — 600mm — 600mm</li>
              <li><strong>Above ground level:</strong> 300mm — 300mm — 300mm</li>
            </ul>
            <p><strong>Safety Controls - Mandatory Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Flame supervision device:</strong> Ionisation probe or thermocouple - shuts off gas if flame fails</li>
              <li><strong>Overheat thermostat:</strong> High limit stat (typically 95-100°C) - manual reset required</li>
              <li><strong>Pressure relief valve:</strong> PRV set at 3 bar - discharges to safe location</li>
              <li><strong>Pressure gauge:</strong> Visual indication of system pressure</li>
              <li><strong>Automatic air vent:</strong> Releases air from heat exchanger</li>
              <li><strong>Frost protection:</strong> Prevents freezing damage - integral to most modern boilers</li>
            </ul>
            <p><strong>Electrical Connections (BS 7671)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Permanent supply:</strong> FCU, 3A or 5A fuse — Dedicated circuit recommended</li>
              <li><strong>Isolation:</strong> Accessible double-pole — Within 3m of boiler</li>
              <li><strong>Room thermostat:</strong> Volt-free contacts — Breaks call for heat</li>
              <li><strong>Cylinder stat:</strong> Volt-free contacts — System/regular boilers only</li>
              <li><strong>Programmer:</strong> Mains or low voltage — Time control for CH and DHW</li>
              <li><strong>External sensor:</strong> Manufacturer specific — Weather compensation</li>
            </ul>
            <p><strong>Condensate Drainage Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Minimum 22mm internal diameter pipework</li>
              <li>PVC or ABS plastic (acid resistant)</li>
              <li>Fall of 2.5° minimum (45mm per metre)</li>
              <li>External runs: insulated or traced heating</li>
              <li>Discharge to internal soil stack preferred</li>
              <li>External discharge: above gully trap water level</li>
              <li>Neutralisation kit for sensitive drainage systems</li>
            </ul>
            <p><strong>Gas Safe requirement:</strong> All gas boiler installations must be carried out by a Gas Safe registered engineer. The Benchmark commissioning checklist (or manufacturer equivalent) must be completed, and Building Control notified via a Competent Persons Scheme or direct application.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Domestic Boiler Selection</strong>
            </p>
            <p><strong>Scenario:</strong> 3-bedroom semi-detached house with 2 bathrooms. Select appropriate boiler type and size.</p>
            <p>Property details:</p>
            <p>- 3 bedrooms, 2 bathrooms (family bathroom + en-suite)</p>
            <p>- Heat loss calculation: 12 kW space heating</p>
            <p>- DHW demand: 2 showers potentially simultaneous</p>
            <p>Analysis:</p>
            <p>- Multiple bathrooms = higher DHW demand</p>
            <p>- Combi may struggle with simultaneous demand</p>
            <p>- System boiler with unvented cylinder provides better DHW</p>
            <p>Recommendation:</p>
            <p>Option 1: 35 kW combi (if DHW priority acceptable)</p>
            <p>Option 2: 24 kW system boiler + 180L unvented cylinder</p>
            <p>Selected: System boiler for superior DHW performance</p>
            <p>ErP Rating: A (space) + A (water)</p>
            <p>
              <strong>Example 2: Flue Position Assessment</strong>
            </p>
            <p><strong>Scenario:</strong> 28 kW combi boiler to be installed in kitchen. Assess flue terminal position.</p>
            <p>Proposed location: External wall below kitchen window</p>
            <p>Boiler output: 28 kW (14-70 kW category)</p>
            <p>Distance requirements (Part J):</p>
            <p>- Below opening window: 300mm min ✓</p>
            <p>- Horizontally from opening: 600mm min</p>
            <p>- Above ground level: 300mm min ✓</p>
            <p>Site measurement:</p>
            <p>- Window sill height: 900mm</p>
            <p>- Proposed terminal height: 500mm</p>
            <p>- Vertical clearance: 400mm (300mm req) ✓</p>
            <p>- Horizontal from window edge: 450mm</p>
            <p>Issue: Horizontal clearance 450mm &lt; 600mm required</p>
            <p>Solution: Reposition boiler to achieve 600mm clearance</p>
            <p>or use plume management kit</p>
            <p>
              <strong>Example 3: Cascade Controller Setup</strong>
            </p>
            <p><strong>Scenario:</strong> Configure cascade controller for 3 × 80 kW boilers serving office building.</p>
            <p>System: 3 × 80 kW condensing boilers</p>
            <p>Design flow temp: 70°C, Return: 50°C (ΔT = 20K)</p>
            <p>Cascade controller parameters:</p>
            <p>- Staging setpoint: 80% of current capacity</p>
            <p>- De-staging setpoint: 30% of current capacity</p>
            <p>- Staging delay: 5 minutes</p>
            <p>- De-staging delay: 10 minutes</p>
            <p>- Lead-lag rotation: Weekly (Monday 00:00)</p>
            <p>Weather compensation:</p>
            <p>- Outside temp: 0°C → Flow: 70°C</p>
            <p>- Outside temp: 10°C → Flow: 55°C</p>
            <p>- Outside temp: 15°C → Flow: 45°C</p>
            <p>- Heating curve: 1.2</p>
            <p>Frost protection: Enable below 3°C external</p>
            <p>Optimum start: Enable (learns building response)</p>
            <p>BMS integration: Modbus RTU for monitoring</p>
            <p>
              <strong>Example 4: Condensate Pipe Sizing</strong>
            </p>
            <p><strong>Scenario:</strong> Design condensate drainage for external run to drain.</p>
            <p>Boiler: 30 kW condensing combi</p>
            <p>Route: 2m internal + 3m external to gully</p>
            <p>Internal section (2m):</p>
            <p>- Pipe: 22mm PVC overflow pipe</p>
            <p>- Fall: 2.5° minimum (45mm per metre)</p>
            <p>- Total fall: 2 × 45 = 90mm</p>
            <p>External section (3m):</p>
            <p>- Pipe: 32mm PVC (increased for external)</p>
            <p>- Insulation: 19mm wall foam lagging</p>
            <p>- Trace heating: Self-regulating 10W/m</p>
            <p>- Fall: 3 × 45 = 135mm</p>
            <p>Discharge point:</p>
            <p>- Above gully water level</p>
            <p>- Air gap to prevent back-siphonage</p>
            <p>Complies with manufacturer instructions</p>
            <p>and BS 6798 condensate requirements</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Installation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify gas supply pressure and pipe sizing adequate for boiler input</li>
              <li>Check flue terminal position against Part J requirements before installation</li>
              <li>Ensure condensate drain route is viable with adequate fall</li>
              <li>Confirm electrical supply available with adequate isolation facilities</li>
              <li>Check system is flushed and treated before commissioning</li>
              <li>Complete Benchmark checklist and notify Building Control</li>
            </ul>
            <p>
              <strong>Commissioning Requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Gas tightness test on all new pipework</li>
              <li>Combustion analysis: CO₂, CO, flue temperature</li>
              <li>Gas rate check against data plate</li>
              <li>System pressure test and fill</li>
              <li>Check all safety controls operate correctly</li>
              <li>Set controls and demonstrate operation to user</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Incorrect flue position:</strong> Fails to meet Part J clearances - remedy before commissioning</li>
                <li><strong>Condensate freezing:</strong> External pipe not insulated/traced - causes boiler lockout</li>
                <li><strong>Poor system cleanliness:</strong> Debris damages heat exchanger - flush and filter</li>
                <li><strong>Inadequate isolation:</strong> No accessible double-pole switch - BS 7671 non-compliance</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heating systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Heat pump integration
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section1_1;
