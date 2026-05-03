/**
 * Module 8 · Section 1 · Subsection 2 — Heat Pump Integration
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Principles, system integration, buffer vessels, flow temperatures and hybrid systems for building services
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

const TITLE = 'Heat Pump Integration - HNC Module 8 Section 1.2';
const DESCRIPTION =
  'Master heat pump integration for building services: ASHP/GSHP principles, COP and SCOP calculations, MCS requirements, buffer vessel sizing, low temperature heating systems, hybrid configurations and Part L compliance.';

const quickCheckQuestions = [
  {
    id: 'cop-definition',
    question:
      'A heat pump has a COP of 4.0. If it consumes 3kW of electrical power, what is its heat output?',
    options: ['3kW', '7kW', '12kW', '0.75kW'],
    correctIndex: 2,
    explanation:
      'COP = Heat Output / Electrical Input. Therefore Heat Output = COP x Electrical Input = 4.0 x 3kW = 12kW. This means the heat pump is moving 9kW of free heat from the environment while using 3kW of electricity.',
  },
  {
    id: 'flow-temp-radiators',
    question:
      'What is the recommended maximum flow temperature for heat pump systems with oversized radiators?',
    options: ['75-80degC', '55-65degC', '35-45degC', '20-25degC'],
    correctIndex: 2,
    explanation:
      'Heat pumps operate most efficiently at low flow temperatures of 35-45degC. Radiators must be oversized (typically 2-2.5 times larger) to deliver adequate heat output at these lower temperatures compared to traditional boiler systems running at 70-80degC.',
  },
  {
    id: 'buffer-vessel-purpose',
    question: 'What is the primary purpose of a buffer vessel in a heat pump system?',
    options: [
      'To store domestic hot water',
      'To prevent short cycling and provide system stability',
      'To increase the COP of the heat pump',
      'To reduce electricity consumption',
    ],
    correctIndex: 1,
    explanation:
      'Buffer vessels prevent short cycling by providing thermal mass, ensuring minimum run times are achieved. They also help balance variable heat demand from zone valves and thermostatic radiator valves (TRVs), protecting the compressor and improving system efficiency.',
  },
  {
    id: 'mcs-certification',
    question: 'Why is MCS certification important for heat pump installations in the UK?',
    options: [
      'It is optional but reduces insurance costs',
      'It is required for Building Regulations approval only',
      'It is required for Boiler Upgrade Scheme grants and demonstrates quality',
      'It only applies to commercial installations',
    ],
    correctIndex: 2,
    explanation:
      'MCS (Microgeneration Certification Scheme) certification is mandatory for accessing the Boiler Upgrade Scheme (BUS) grants of up to 7,500 pounds. It ensures installations meet quality standards, proper design methodology is followed, and the system will perform as specified.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does ASHP stand for?',
    options: [
      'Automatic System Heat Processor',
      'Air Source Heat Pump',
      'Auxiliary Solar Heat Panel',
      'Advanced System Heating Plant',
    ],
    correctAnswer: 1,
    explanation:
      'ASHP stands for Air Source Heat Pump. These extract heat from outdoor air, even at temperatures down to -20degC, and transfer it into the building via a refrigerant cycle.',
  },
  {
    id: 2,
    question: 'The COP of a heat pump typically decreases when:',
    options: [
      'The outdoor temperature increases',
      'The flow temperature decreases',
      'The temperature difference between source and sink increases',
      'The system is correctly sized',
    ],
    correctAnswer: 2,
    explanation:
      'COP decreases as the temperature lift (difference between source and delivery temperature) increases. This is why low flow temperatures (35-45degC) are essential for efficient heat pump operation - smaller temperature lift means higher efficiency.',
  },
  {
    id: 3,
    question: 'What is the typical SCOP for a well-designed air source heat pump system in the UK?',
    options: ['1.5-2.0', '2.5-3.5', '5.0-6.0', '7.0-8.0'],
    correctAnswer: 1,
    explanation:
      'SCOP (Seasonal Coefficient of Performance) accounts for performance variation throughout the heating season. A well-designed UK ASHP system typically achieves SCOP of 2.5-3.5, meaning for every 1kWh of electricity, 2.5-3.5kWh of heat is delivered over the year.',
  },
  {
    id: 4,
    question: 'Ground source heat pumps (GSHPs) typically have higher COPs than ASHPs because:',
    options: [
      'They use more electricity',
      'Ground temperatures are more stable and higher in winter',
      'They are always larger systems',
      'They do not require defrost cycles',
    ],
    correctAnswer: 1,
    explanation:
      'Ground temperatures at collector depth (typically 1-2m) remain relatively stable at 8-12degC year-round in the UK. This provides a more consistent and warmer heat source in winter compared to cold air, reducing temperature lift and improving COP.',
  },
  {
    id: 5,
    question: 'What is the minimum recommended buffer vessel size for a 12kW heat pump?',
    options: ['10 litres', '20-30 litres', '50-100 litres', '200+ litres'],
    correctAnswer: 2,
    explanation:
      'The rule of thumb is 10-20 litres per kW of heat pump capacity. For a 12kW unit, this means 120-240 litres, but practical minimum is typically 50-100 litres. Actual sizing depends on the number of zones, TRV coverage, and heat pump modulation range.',
  },
  {
    id: 6,
    question: 'During a defrost cycle, an ASHP:',
    options: [
      'Continues heating normally',
      'Temporarily reverses to remove ice from the outdoor coil',
      'Switches to backup electric heating permanently',
      'Reduces output by 50%',
    ],
    correctAnswer: 1,
    explanation:
      'Defrost cycles temporarily reverse the refrigerant flow, using heat from the building to melt ice on the outdoor evaporator coil. This typically takes 2-10 minutes and occurs when outdoor temperatures are between -7degC and +7degC with high humidity.',
  },
  {
    id: 7,
    question: 'What is the typical electrical supply requirement for a domestic ASHP of 8-12kW?',
    options: [
      'Single-phase 13A',
      'Single-phase 32A or three-phase',
      'Three-phase 63A minimum',
      'Single-phase 16A',
    ],
    correctAnswer: 1,
    explanation:
      'Domestic ASHPs of 8-12kW typically require single-phase 32A supplies or three-phase connections. The electrical demand is approximately 25-35% of heat output due to COP. Larger commercial units (&gt;15kW) usually require three-phase supplies.',
  },
  {
    id: 8,
    question: 'In a hybrid heat pump system, the boiler typically operates when:',
    options: [
      'The heat pump is switched off for maintenance',
      'Outdoor temperatures are very low or high-temperature DHW is needed',
      'The system first starts up each day',
      'Electricity prices are at their lowest',
    ],
    correctAnswer: 1,
    explanation:
      'Hybrid systems use the heat pump as primary when efficient (milder conditions), switching to the boiler when outdoor temperatures drop significantly (reducing heat pump COP) or when high-temperature domestic hot water is required quickly.',
  },
  {
    id: 9,
    question:
      'What is the maximum flow temperature at which most heat pumps can operate efficiently?',
    options: ['35degC', '45-55degC', '65-75degC', '80degC'],
    correctAnswer: 1,
    explanation:
      'Most heat pumps operate efficiently up to 45-55degC flow temperature. Some high-temperature models can reach 65-70degC but with reduced efficiency. For optimal COP, systems should be designed for 35-45degC flow using UFH or oversized radiators.',
  },
  {
    id: 10,
    question: 'Part L of the Building Regulations requires heat pumps to achieve a minimum:',
    options: [
      'COP of 2.0',
      'SCOP of 2.5 (for wet heating systems)',
      'Flow temperature of 55degC',
      'Electrical efficiency of 90%',
    ],
    correctAnswer: 1,
    explanation:
      'Part L 2021 requires heat pumps serving wet central heating systems to achieve minimum SCOP of 2.5. This ensures carbon savings compared to gas boilers and is verified through MCS design methodology during installation.',
  },
  {
    id: 11,
    question: 'What is the primary advantage of a monobloc ASHP over a split system?',
    options: [
      'Higher COP in all conditions',
      'No F-gas qualified installer required for installation',
      'Lower noise levels',
      'Smaller outdoor unit',
    ],
    correctAnswer: 1,
    explanation:
      'Monobloc units contain all refrigerant in the outdoor unit, with only water pipes running to the building. This means installation does not require F-gas certified technicians, simplifying installation and reducing costs compared to split systems.',
  },
  {
    id: 12,
    question: 'Weather compensation in heat pump systems:',
    options: [
      'Increases flow temperature when outdoor temperature rises',
      'Adjusts flow temperature based on outdoor conditions to optimise efficiency',
      'Only operates during defrost cycles',
      'Is optional and rarely used in modern systems',
    ],
    correctAnswer: 1,
    explanation:
      'Weather compensation automatically adjusts the heating flow temperature based on outdoor temperature. As it gets colder outside, flow temperature increases; as it warms up, flow temperature decreases. This optimises efficiency by minimising temperature lift when possible.',
  },
  {
    id: 13,
    question: 'The refrigerant R32 commonly used in modern ASHPs:',
    options: [
      'Has zero global warming potential',
      'Has lower GWP than R410A but is mildly flammable (A2L)',
      'Requires no special handling or certification',
      'Cannot operate below 0degC',
    ],
    correctAnswer: 1,
    explanation:
      "R32 has a GWP of 675 compared to R410A's GWP of 2088, making it more environmentally friendly. However, R32 is classified as A2L (mildly flammable), requiring appropriate handling procedures and F-gas certification for any refrigerant work.",
  },
  {
    id: 14,
    question: 'When sizing radiators for a heat pump system designed for 40degC flow temperature:',
    options: [
      'Use standard radiator sizing from boiler calculations',
      'Radiators should be approximately 2-2.5 times larger than for 75degC systems',
      'Radiators should be 50% smaller to reduce costs',
      'Only panel radiators can be used',
    ],
    correctAnswer: 1,
    explanation:
      'At 40degC flow (vs 75degC for boilers), radiator output is significantly reduced. Radiators must be 2-2.5 times larger (or use higher output types like double-panel plus convector) to achieve the same heat output at lower flow temperatures.',
  },
];

const faqs = [
  {
    question: 'Can a heat pump replace my gas boiler directly?',
    answer:
      'In most cases, heat pumps can replace gas boilers but system modifications are usually required. The key considerations are: radiator sizing (may need upgrading for low-temperature operation), hot water cylinder (heat pumps work best with larger, well-insulated cylinders), electrical supply (typically 32A single-phase or three-phase for larger units), and building fabric (heat pumps perform best in well-insulated properties). A heat loss calculation should be completed first to size the system correctly.',
  },
  {
    question: 'What is the difference between COP and SCOP?',
    answer:
      'COP (Coefficient of Performance) is the instantaneous efficiency measured at specific test conditions - it tells you heat output divided by electrical input at that moment. SCOP (Seasonal Coefficient of Performance) accounts for efficiency variations throughout an entire heating season, including part-load operation, defrost cycles, standby losses, and varying outdoor temperatures. SCOP gives a more realistic picture of annual running costs and is the figure used for Part L compliance and MCS calculations.',
  },
  {
    question: 'Do heat pumps work in cold UK winters?',
    answer:
      'Yes, modern ASHPs operate efficiently down to -20degC outdoor temperature. At very low temperatures, COP decreases (typically from 4.0 at 7degC to 2.5 at -7degC) but the system continues to provide heat. Defrost cycles become more frequent in cold, humid conditions. Ground source heat pumps are less affected by outdoor temperature as ground temperatures remain stable at 8-12degC year-round. Proper system design accounts for peak winter heating demand.',
  },
  {
    question: 'Why do heat pump systems need buffer vessels?',
    answer:
      'Buffer vessels serve several critical functions: preventing short cycling when heating demand is low (protecting the compressor), providing thermal mass during defrost cycles, balancing flow when zone valves close, and allowing the heat pump to run for longer periods at optimal efficiency. Sizing depends on heat pump capacity, system design, and the degree of zoning. Some inverter-driven heat pumps with wide modulation ranges may require smaller or no buffer vessels.',
  },
  {
    question: 'What grants are available for heat pump installations?',
    answer:
      'The Boiler Upgrade Scheme (BUS) provides grants of 7,500 pounds for air source heat pumps and 7,500 pounds for ground source heat pumps in England and Wales. To qualify, the property must have an EPC (with no outstanding loft or cavity wall insulation recommendations for ASHPs), the installer must be MCS certified, and the property must not be a new build. Scotland has separate schemes including Home Energy Scotland grants and loans. Check current availability as schemes are periodically updated.',
  },
  {
    question: 'What electrical work is required for heat pump installation?',
    answer:
      'Electrical requirements include: dedicated circuit from consumer unit (typically 32A single-phase or three-phase for larger units), appropriate MCB/RCBO protection, correct cable sizing for the load and route length, external isolator adjacent to outdoor unit, controls wiring to cylinder and heating system, and potential earthing/bonding requirements. The electrical installation must comply with BS 7671 and Part P of Building Regulations. Some installations may require DNO notification or supply upgrade.',
  },
];

const HNCModule8Section1_2 = () => {
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
            eyebrow="Module 8 · Section 1 · Subsection 2"
            title="Heat Pump Integration"
            description="Principles, system integration, buffer vessels, flow temperatures and hybrid systems for building services"
            tone="purple"
          />

          <ConceptBlock title="Heat Pump Principles - ASHP and GSHP">
            <p>Heat pumps extract low-grade heat from the environment (air, ground, or water) and upgrade it to useful temperatures for space heating and hot water. They operate on the vapour compression refrigerant cycle, the same principle as refrigerators but in reverse - moving heat into the building rather than out of it.</p>
            <p><strong>Air Source Heat Pumps (ASHP)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Extract heat from outdoor air using a fan-assisted evaporator coil</li>
              <li>Operate efficiently down to -20degC (with reduced COP at extremes)</li>
              <li>Require defrost cycles in cold, humid conditions (typically -7degC to +7degC)</li>
              <li>Available as monobloc (all-in-one) or split system configurations</li>
              <li>Typical SCOP range: 2.5-3.5 in UK climate conditions</li>
            </ul>
            <p><strong>Ground Source Heat Pumps (GSHP)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Extract heat from the ground via horizontal trenches or vertical boreholes</li>
              <li>Ground temperature stable at 8-12degC year-round (1-2m depth)</li>
              <li>Higher installation cost but better SCOP (3.0-4.5 typical)</li>
              <li>No defrost cycles required - more consistent performance</li>
              <li>Require significant land area for horizontal collectors or drilling access</li>
            </ul>
            <p><strong>The Refrigerant Cycle</strong></p>
            <p>1. Evaporator (Outdoor)</p>
            <p>Low-pressure liquid refrigerant absorbs heat from air/ground, becoming a gas</p>
            <p>2. Compressor</p>
            <p>Compresses the gas, raising its temperature significantly (this is where electricity is used)</p>
            <p>3. Condenser (Indoor)</p>
            <p>Hot gas releases heat to heating water, condensing back to liquid</p>
            <p>4. Expansion Valve</p>
            <p>Pressure drops rapidly, cooling the refrigerant ready for evaporator</p>
            <p><strong>COP and SCOP Calculations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>COP:</strong> Heat Output (kW) / Electrical Input (kW) — Instantaneous efficiency at test conditions</li>
              <li><strong>SCOP:</strong> Total Heat (kWh) / Total Electricity (kWh) — Seasonal average including all operating modes</li>
              <li><strong>SPF:</strong> Measured annual heat / annual electricity — Actual field performance (varies by installation)</li>
            </ul>
            <p><strong>Example: COP Calculation</strong></p>
            <p>COP = Q<sub>heat</sub> / W<sub>elec</sub></p>
            <p>If a heat pump uses 2.5kW electricity and outputs 10kW heat:</p>
            <p>COP = 10 / 2.5 = 4.0</p>
            <p>This means 7.5kW of "free" environmental heat is added to 2.5kW of electrical energy</p>
            <p><strong>Key principle:</strong> COP decreases as the temperature lift increases. Minimising the difference between source temperature (outdoor/ground) and delivery temperature (flow) maximises efficiency.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="System Integration and Buffer Vessels">
            <p>Successful heat pump integration requires careful system design to match the heat pump's operating characteristics with building heat demand. Unlike boilers that can modulate quickly, heat pumps prefer steady-state operation and are sensitive to short cycling and rapid load changes.</p>
            <p><strong>Buffer Vessel Functions</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Prevent short cycling:</strong> Provides thermal mass for minimum compressor run times (typically 6+ minutes)</li>
              <li><strong>Defrost support:</strong> Supplies heat during defrost cycles when heat pump reverses</li>
              <li><strong>Zone balancing:</strong> Accommodates flow variations when TRVs or zone valves close</li>
              <li><strong>Hydraulic separation:</strong> Decouples heat pump flow from heating circuit flow rates</li>
              <li><strong>Efficiency optimisation:</strong> Allows heat pump to operate at optimal conditions</li>
            </ul>
            <p><strong>Buffer Vessel Sizing Guidelines</strong></p>
            <p>Basic Rule of Thumb</p>
            <p>10-20 litres per kW of heat pump capacity</p>
            <p>12kW ASHP = 120-240 litre buffer</p>
            <p>MCS Minimum Calculation</p>
            <p>V = (Q x t<sub>min</sub>) / (deltaT x 4.18)</p>
            <p>Where t<sub>min</sub> = minimum run time (6 mins)</p>
            <p><strong>Buffer Vessel Configuration Options</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2-pipe buffer:</strong> Standard residential — Simple, cost-effective, good for single-zone</li>
              <li><strong>4-pipe buffer:</strong> Multi-zone systems — Better stratification, separates HP and heating circuits</li>
              <li><strong>Low-loss header:</strong> Variable flow systems — Minimal storage, hydraulic separation only</li>
              <li><strong>No buffer:</strong> Wide-modulating inverter HP — Only if HP can modulate &gt;5:1 and single large zone</li>
            </ul>
            <p><strong>System Hydraulics</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Primary circuit:</strong> Heat pump to buffer - constant flow, pump sized for HP requirements</li>
              <li><strong>Secondary circuit:</strong> Buffer to emitters - variable flow based on demand</li>
              <li><strong>Blending valve:</strong> May be required to achieve specific flow temperatures</li>
              <li><strong>Expansion vessel:</strong> Sized for total system volume including buffer</li>
              <li><strong>Pressure relief:</strong> Set according to system pressure rating (typically 3 bar)</li>
            </ul>
            <p><strong>Critical Design Points</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Never bypass the buffer vessel - this leads to short cycling and compressor damage</li>
              <li>Ensure adequate flow through heat pump at all times (minimum flow switches)</li>
              <li>Automatic air vents essential at high points - air locks affect efficiency</li>
              <li>Glycol antifreeze may reduce heat transfer - adjust sizing accordingly</li>
            </ul>
            <p><strong>MCS requirement:</strong> The MCS Heat Pump Standard (MIS 3005) specifies buffer vessel sizing methodology. Non-compliance can affect warranty and grant eligibility.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Low Temperature Heating and Flow Temperatures">
            <p>Heat pumps achieve optimal efficiency when operating at low flow temperatures, typically 35-45degC compared to 70-80degC for traditional gas boilers. This fundamental difference requires careful consideration of heat emitter selection and building fabric performance.</p>
            <p><strong>Why Low Flow Temperatures Matter</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Reduced temperature lift:</strong> Smaller difference between source and sink = higher COP</li>
              <li><strong>COP improvement:</strong> Each 1degC reduction in flow temperature increases COP by approximately 2-3%</li>
              <li><strong>Part L compliance:</strong> Low-temperature operation essential for meeting SCOP requirements</li>
              <li><strong>System longevity:</strong> Reduced thermal stress on components</li>
            </ul>
            <p><strong>Heat Emitter Options for Low Temperature Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Underfloor heating (UFH):</strong> 30-40degC — Excellent - ideal partner for heat pumps</li>
              <li><strong>Fan convectors:</strong> 35-45degC — Very good - forced air improves output</li>
              <li><strong>Oversized radiators (2-2.5x):</strong> 40-50degC — Good - requires larger radiators</li>
              <li><strong>Standard radiators:</strong> 55-70degC — Poor - significantly reduces COP</li>
            </ul>
            <p><strong>Radiator Output at Different Flow Temperatures</strong></p>
            <p>Radiator output varies with the mean water temperature (MWT) difference from room temperature. At lower flow temperatures, output drops significantly:</p>
            <p>75degC flow</p>
            <p>100% output</p>
            <p>(MWT 60degC)</p>
            <p>55degC flow</p>
            <p>~60% output</p>
            <p>(MWT 45degC)</p>
            <p>45degC flow</p>
            <p>~45% output</p>
            <p>(MWT 37degC)</p>
            <p>35degC flow</p>
            <p>~25% output</p>
            <p>(MWT 30degC)</p>
            <p>Based on Delta T50 rated output and 20degC room temperature</p>
            <p><strong>Weather Compensation Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Principle:</strong> Flow temperature varies automatically with outdoor temperature</li>
              <li><strong>Heating curve:</strong> Defines relationship between outdoor temp and flow temp</li>
              <li><strong>Steeper curves:</strong> For poorly insulated buildings or undersized emitters</li>
              <li><strong>Shallower curves:</strong> For well-insulated buildings with UFH</li>
              <li><strong>Parallel shift:</strong> Adjusts overall level while maintaining curve slope</li>
            </ul>
            <p><strong>Typical Weather Compensation Settings</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>15degC:</strong> 25degC — 30degC</li>
              <li><strong>7degC:</strong> 32degC — 40degC</li>
              <li><strong>0degC:</strong> 38degC — 48degC</li>
              <li><strong>-5degC:</strong> 42degC — 55degC</li>
            </ul>
            <p><strong>Defrost Cycle Management</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>When required:</strong> Typically -7degC to +7degC outdoor with high humidity</li>
              <li><strong>Duration:</strong> 2-10 minutes depending on ice build-up</li>
              <li><strong>Method:</strong> Reverses refrigerant cycle to heat outdoor coil</li>
              <li><strong>Heat source:</strong> Uses building heat (via buffer vessel) during defrost</li>
              <li><strong>Impact:</strong> Reduces effective SCOP by 5-10% during defrost conditions</li>
            </ul>
            <p><strong>Design target:</strong> Aim for maximum flow temperature of 45degC at design outdoor temperature (-3degC typical for UK). This ensures efficient operation across the heating season.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Hybrid Systems, Electrical Requirements and Part L Compliance">
            <p>Hybrid heat pump systems combine a heat pump with a conventional boiler, offering flexibility to optimise efficiency and meet peak demands. Understanding electrical requirements and regulatory compliance is essential for successful installations.</p>
            <p><strong>Hybrid System Operation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Bivalent point:</strong> Outdoor temperature at which boiler supplements heat pump</li>
              <li><strong>Parallel operation:</strong> Both systems run simultaneously during peak demand</li>
              <li><strong>Alternative operation:</strong> Boiler takes over completely when HP efficiency drops</li>
              <li><strong>Cost optimisation:</strong> Controllers can switch based on electricity/gas price</li>
              <li><strong>DHW boost:</strong> Boiler provides rapid hot water recovery when needed</li>
            </ul>
            <p><strong>Hybrid System Control Strategies</strong></p>
            <p><strong>Temperature-Based</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>HP only above bivalent point (e.g., -2degC)</li>
              <li>Boiler assists below bivalent point</li>
              <li>Boiler only below cut-off (e.g., -10degC)</li>
            </ul>
            <p><strong>Cost-Based</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculates running cost at current COP</li>
              <li>Compares with gas cost for same heat output</li>
              <li>Selects cheapest option automatically</li>
            </ul>
            <p><strong>Electrical Supply Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&lt;8kW heat output:</strong> Single-phase 20A — 20A Type C MCB or RCBO</li>
              <li><strong>8-12kW heat output:</strong> Single-phase 32A — 32A Type C MCB or RCBO</li>
              <li><strong>12-16kW heat output:</strong> Single-phase 40A or 3-phase — 40A Type C or TP 16A per phase</li>
              <li><strong>&gt;16kW heat output:</strong> Three-phase supply — TP&N sized to manufacturer spec</li>
            </ul>
            <p><strong>Electrical Installation Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Dedicated circuit:</strong> Heat pump must have its own final circuit from consumer unit</li>
              <li><strong>Cable sizing:</strong> As per BS 7671 Table 4D1A/B/C - consider route length and grouping</li>
              <li><strong>External isolator:</strong> Rotary isolator required adjacent to outdoor unit (within 3m)</li>
              <li><strong>RCD protection:</strong> 30mA RCD required for outdoor units (Regulation 411.3.3)</li>
              <li><strong>Surge protection:</strong> SPD recommended for inverter-driven heat pumps</li>
              <li><strong>Controls wiring:</strong> Low voltage connections to cylinder, room stats, BMS</li>
            </ul>
            <p><strong>DNO Notification Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>G98:</strong> Applies to heat pumps with export capability (rare for heating-only units)</li>
              <li><strong>Supply upgrade:</strong> May be required if existing supply is inadequate</li>
              <li><strong>Load notification:</strong> Some DNOs require notification for loads &gt;13.8kW</li>
              <li><strong>Three-phase upgrade:</strong> Application required if converting from single-phase</li>
            </ul>
            <p><strong>Part L Compliance Requirements (England 2021)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Minimum SCOP:</strong> 2.5 for wet central heating systems</li>
              <li><strong>Design methodology:</strong> MCS Heat Pump Calculator or equivalent required</li>
              <li><strong>Heat loss calculation:</strong> Room-by-room heat loss to BS EN 12831</li>
              <li><strong>Controls:</strong> Weather compensation mandatory for new installations</li>
              <li><strong>Commissioning:</strong> Evidence of proper balancing and performance testing</li>
            </ul>
            <p><strong>MCS Certification Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>MIS 3005:</strong> Heat pump installation standard - mandatory for BUS grants</li>
              <li><strong>Design process:</strong> Heat loss calculation, emitter sizing, heat pump selection</li>
              <li><strong>Documentation:</strong> Design certificate, commissioning checklist, user handover</li>
              <li><strong>Performance estimate:</strong> Annual heat demand, electricity consumption, running costs</li>
              <li><strong>Warranty:</strong> Minimum 2-year installation warranty required</li>
            </ul>
            <p><strong>Common Compliance Issues</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Oversized heat pump for heat loss (reduces efficiency)</li>
              <li>Undersized emitters requiring high flow temperatures</li>
              <li>Missing or incorrect weather compensation setup</li>
              <li>Insufficient buffer vessel capacity</li>
              <li>Inadequate electrical supply or incorrect protection</li>
            </ul>
            <p><strong>Grant eligibility:</strong> Only MCS-certified installations by MCS-registered installers qualify for the Boiler Upgrade Scheme. Ensure all documentation is completed correctly before applying.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: COP and Running Cost Comparison</strong>
            </p>
            <p><strong>Question:</strong> A 10kW ASHP has a COP of 3.5 at 2degC outdoor/40degC flow. Compare running cost with a 90% efficient gas boiler. Electricity = 28p/kWh, Gas = 8p/kWh.</p>
            <p>Heat pump electrical input:</p>
            <p>P<sub>elec</sub> = Heat output / COP = 10kW / 3.5 = <strong>2.86kW</strong></p>
            <p>Heat pump running cost per hour:</p>
            <p>Cost<sub>HP</sub> = 2.86 x 28p = <strong>80p/hour</strong></p>
            <p>Gas boiler input for same heat:</p>
            <p>P<sub>gas</sub> = Heat output / efficiency = 10kW / 0.90 = <strong>11.1kW</strong></p>
            <p>Gas boiler running cost per hour:</p>
            <p>Cost<sub>gas</sub> = 11.1 x 8p = <strong>89p/hour</strong></p>
            <p>Heat pump is 10% cheaper at COP 3.5</p>
            <p>
              <strong>Example 2: Buffer Vessel Sizing</strong>
            </p>
            <p><strong>Question:</strong> Size a buffer vessel for a 12kW ASHP with 6-minute minimum run time and 5K temperature differential.</p>
            <p>Using MCS formula:</p>
            <p>V = (Q x t<sub>min</sub>) / (deltaT x 4.18)</p>
            <p>Where:</p>
            <p>Q = 12kW = 12kJ/s</p>
            <p>t<sub>min</sub> = 6 minutes = 360 seconds</p>
            <p>deltaT = 5K</p>
            <p>4.18 = specific heat capacity of water (kJ/kg.K)</p>
            <p>Calculation:</p>
            <p>V = (12 x 360) / (5 x 4.18)</p>
            <p>V = 4320 / 20.9 = <strong>207 litres</strong></p>
            <p>Select 200-250 litre buffer vessel</p>
            <p>
              <strong>Example 3: Radiator Sizing for Low Temperature</strong>
            </p>
            <p><strong>Question:</strong> A room requires 2kW heat output. An existing radiator is rated at 1.5kW at Delta T50 (75/65/20degC). Is it suitable for 45degC flow?</p>
            <p>Original conditions (Delta T50):</p>
            <p>Flow 75degC, Return 65degC, Room 20degC</p>
            <p>Mean water temp = (75+65)/2 = 70degC</p>
            <p>Delta T = 70 - 20 = 50K</p>
            <p>New conditions (45degC flow, 5K drop):</p>
            <p>Flow 45degC, Return 40degC, Room 20degC</p>
            <p>Mean water temp = (45+40)/2 = 42.5degC</p>
            <p>Delta T = 42.5 - 20 = 22.5K</p>
            <p>Output correction (using n=1.3 exponent):</p>
            <p>Correction factor = (22.5/50)^1.3 = 0.34</p>
            <p>New output = 1.5kW x 0.34 = <strong>0.51kW</strong></p>
            <p>Radiator only provides 0.51kW vs 2kW required</p>
            <p>Need radiator 4x larger (6kW Delta T50 rating)</p>
            <p>
              <strong>Example 4: Electrical Circuit Sizing</strong>
            </p>
            <p><strong>Question:</strong> Size the electrical circuit for a 12kW ASHP with maximum electrical input of 4.2kW at 230V single-phase. Cable run is 25m.</p>
            <p>Maximum current:</p>
            <p>I<sub>max</sub> = P / V = 4200W / 230V = <strong>18.3A</strong></p>
            <p>Starting current consideration:</p>
            <p>Compressor inrush can be 3-5x running current</p>
            <p>Soft start usually limits to 2x = ~37A</p>
            <p>Circuit protection:</p>
            <p>Select 32A Type C MCB (handles starting current)</p>
            <p>Cable sizing (BS 7671 Table 4D1A - clipped direct):</p>
            <p>For 32A protection: 4mm squared = 36A capacity</p>
            <p>Voltage drop check: 4mm squared = 11mV/A/m</p>
            <p>V<sub>drop</sub> = 18.3 x 25 x 0.011 = 5.0V (2.2%)</p>
            <p>4mm squared T&E adequate - meets 5% limit</p>
            <p>
              <strong>Example 5: Hybrid System Bivalent Point</strong>
            </p>
            <p><strong>Question:</strong> Determine when gas backup becomes more economical. HP COP varies with outdoor temperature. Electricity 30p/kWh, Gas 10p/kWh, Boiler 90% efficient.</p>
            <p>Gas cost per kWh heat:</p>
            <p>Cost<sub>gas</sub> = 10p / 0.90 = <strong>11.1p/kWh</strong></p>
            <p>HP cost per kWh heat at various COPs:</p>
            <p>COP 4.0: 30p / 4.0 = 7.5p/kWh (HP cheaper)</p>
            <p>COP 3.0: 30p / 3.0 = 10.0p/kWh (HP cheaper)</p>
            <p>COP 2.7: 30p / 2.7 = 11.1p/kWh (breakeven)</p>
            <p>COP 2.5: 30p / 2.5 = 12.0p/kWh (gas cheaper)</p>
            <p>Breakeven COP:</p>
            <p>COP<sub>break</sub> = Elec price / (Gas price / Boiler eff)</p>
            <p>COP<sub>break</sub> = 30 / (10/0.9) = <strong>2.7</strong></p>
            <p>Switch to gas when outdoor temp causes COP &lt; 2.7</p>
            <p>Typically around -5degC to -7degC for most ASHPs</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential Heat Pump Parameters:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>COP formula:</strong> Heat Output (kW) / Electrical Input (kW)</li>
              <li><strong>Typical ASHP SCOP:</strong> 2.5-3.5 (UK climate)</li>
              <li><strong>Typical GSHP SCOP:</strong> 3.0-4.5</li>
              <li><strong>Optimal flow temp:</strong> 35-45degC for best efficiency</li>
              <li><strong>Part L minimum SCOP:</strong> 2.5 for wet heating systems</li>
            </ul>
            <p>
              <strong>System Design Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat loss calculation to BS EN 12831 (room by room)</li>
              <li>Heat pump sized to 100% of design heat loss (avoid oversizing)</li>
              <li>Emitters sized for 45degC maximum flow temperature</li>
              <li>Buffer vessel sized per MCS methodology</li>
              <li>Hot water cylinder minimum 200 litres with heat pump coil</li>
              <li>Weather compensation configured and tested</li>
              <li>Electrical supply adequate with correct protection</li>
            </ul>
            <p>
              <strong>Commissioning Essentials:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>System flushed and filled with inhibitor</li>
              <li>Pressure tested and leak-free</li>
              <li>Heating circuits balanced</li>
              <li>Weather compensation curve set and verified</li>
              <li>Defrost operation verified</li>
              <li>Controls operation demonstrated to user</li>
              <li>All documentation completed (MCS certificate, user manual)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Oversized heat pump:</strong> Leads to short cycling and reduced efficiency</li>
                <li><strong>Missing buffer:</strong> Compressor damage from short cycling</li>
                <li><strong>High flow temps:</strong> Poor COP from running at 55-65degC</li>
                <li><strong>Small cylinder:</strong> Insufficient recovery time for DHW</li>
                <li><strong>No weather comp:</strong> Fixed flow temperature wastes energy</li>
                <li><strong>Air locks:</strong> Reduce heat output and damage pumps</li>
                <li><strong>Incorrect refrigerant charge:</strong> Affects performance (F-gas work only)</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Boiler systems
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Underfloor heating
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section1_2;
