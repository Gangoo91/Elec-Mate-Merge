/**
 * Module 8 · Section 1 · Subsection 4 — Radiator Systems
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Radiator sizing, pipe sizing, system balancing, TRVs and hydraulic design for two-pipe heating systems
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

const TITLE = 'Radiator Systems - HNC Module 8 Section 1.4';
const DESCRIPTION =
  'Master radiator system design for building services: radiator sizing and heat output calculations, pipe sizing methods, system balancing using lockshield valves, TRV operation, index circuit identification, and pump sizing for two-pipe systems.';

const quickCheckQuestions = [
  {
    id: 'delta-t-correction',
    question:
      'A radiator is rated at 2000W at Delta T 50K. The system operates at flow 70 degrees C, return 50 degrees C with room temperature 20 degrees C. What correction factor applies?',
    options: [
      '1.00 (no correction needed)',
      '1.26 (increased output)',
      '0.63 (significantly reduced)',
      '0.79 (reduced output)',
    ],
    correctIndex: 3,
    explanation:
      'Mean water temperature = (70+50)/2 = 60 degrees C. Delta T = 60 - 20 = 40K. Correction factor for Delta T 40K compared to rated Delta T 50K is approximately 0.79. The radiator will only deliver about 1580W.',
  },
  {
    id: 'pipe-sizing',
    question:
      'What is the primary consideration when sizing pipework for a two-pipe heating system?',
    options: [
      'Matching the pipe colour to the radiator finish for appearance',
      'Using the largest available pipe to guarantee maximum flow',
      'Keeping velocity below 1.5 m/s and pressure drop within pump capacity',
      'Selecting pipe to suit the boiler manufacturer rather than the flow rate',
    ],
    correctIndex: 2,
    explanation:
      'Pipe sizing must balance acceptable water velocity (typically &lt;1.5 m/s to avoid noise) with total system pressure drop that the pump can overcome. Too small causes noise and high pressure drop; too large wastes material and slows response.',
  },
  {
    id: 'index-circuit',
    question: 'What is the index circuit in a heating system?',
    options: [
      'The circuit with the smallest radiator',
      'The circuit with the greatest resistance to flow',
      'The circuit closest to the pump',
      'The circuit serving the living room',
    ],
    correctIndex: 1,
    explanation:
      'The index circuit is the flow path with the highest total resistance (longest run or most restrictive). The pump must be sized to overcome this resistance whilst providing adequate flow to all radiators.',
  },
  {
    id: 'trv-function',
    question: 'How does a thermostatic radiator valve (TRV) regulate room temperature?',
    options: [
      'By switching the boiler on and off directly from the valve head',
      'By sensing the flow water temperature and adjusting the pump speed',
      'By sensing air temperature and modulating flow through the radiator',
      'By measuring the return water temperature and closing the lockshield',
    ],
    correctIndex: 2,
    explanation:
      'TRVs contain a wax or liquid-filled sensor that expands/contracts with room air temperature. As room temperature rises, the valve closes to reduce flow through the radiator, maintaining the set temperature.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A room has a calculated heat loss of 2.4kW. Selecting a radiator rated at Delta T 50K, what minimum output rating should you specify?',
    options: [
      '2.0kW - allow for system efficiency',
      '2.4kW plus 10-15% margin for design safety',
      '2.4kW - match the heat loss exactly',
      '3.6kW - always oversize by 50%',
    ],
    correctAnswer: 1,
    explanation:
      'Best practice is to add a 10-15% margin to the calculated heat loss to account for exposed walls, intermittent heating, and thermal bridging. A 2.4kW room would typically specify 2.6-2.8kW radiator output.',
  },
  {
    id: 2,
    question: 'What is the standard test condition Delta T for radiator output ratings in the UK?',
    options: [
      'Delta T 60K',
      'Delta T 30K',
      'Delta T 50K',
      'Delta T 40K',
    ],
    correctAnswer: 2,
    explanation:
      'UK radiator outputs are rated at Delta T 50K (mean water temperature 75 degrees C minus room temperature 20 degrees C = 55K, but the industry standard uses 50K for calculations). Heat pump systems typically operate at Delta T 30-35K.',
  },
  {
    id: 3,
    question: 'In a two-pipe system, where should TRVs NOT be installed?',
    options: [
      'On the radiator furthest from the boiler',
      'On any radiator in a bedroom',
      'On the largest radiator in the system',
      'In the room containing the room thermostat',
    ],
    correctAnswer: 3,
    explanation:
      'The room containing the main room thermostat should not have a TRV on its radiator. The room stat controls the boiler; if a TRV closed that radiator, the room would cool and the boiler would run continuously trying to satisfy the thermostat.',
  },
  {
    id: 4,
    question:
      'Calculate the water flow rate for a radiator with 3kW output at a 20K temperature drop.',
    options: [
      '0.036 litres/second',
      '0.072 litres/second',
      '0.144 litres/second',
      '0.216 litres/second',
    ],
    correctAnswer: 0,
    explanation:
      'Flow rate = Heat output / (specific heat x temp drop) = 3000 / (4186 x 20) = 0.0358 L/s or approximately 0.036 L/s. This equates to about 2.2 litres per minute or 129 litres per hour.',
  },
  {
    id: 5,
    question:
      'What is the typical maximum recommended water velocity in copper pipework for domestic heating systems?',
    options: [
      '1.0 m/s',
      '1.5 m/s',
      '2.5 m/s',
      '0.5 m/s',
    ],
    correctAnswer: 1,
    explanation:
      'Water velocity should be kept below 1.5 m/s to avoid noise from turbulence and erosion of fittings. Higher velocities also increase pressure drop significantly, requiring larger pumps.',
  },
  {
    id: 6,
    question: 'When balancing a two-pipe heating system, which valve is adjusted?',
    options: [
      'The TRV head',
      'The motorised zone valve',
      'The lockshield valve',
      'The pump speed control',
    ],
    correctAnswer: 2,
    explanation:
      'Lockshield valves are adjusted during commissioning to balance flow rates between radiators. They are set once and locked. TRVs modulate automatically; lockshields provide the base restriction for balanced flow.',
  },
  {
    id: 7,
    question:
      'A heating system has an index circuit pressure drop of 15 kPa. What pump head is required?',
    options: [
      'Exactly 15 kPa - match the index circuit',
      '7-8 kPa - half the index circuit',
      '30-35 kPa - double the index circuit',
      '15-20 kPa - include safety margin',
    ],
    correctAnswer: 3,
    explanation:
      'Pump head should exceed the index circuit resistance by 15-25% to ensure adequate flow at design conditions and account for fouling over time. A 15 kPa index circuit needs approximately 17-19 kPa pump head.',
  },
  {
    id: 8,
    question: 'Why are double panel radiators (Type 22) popular in modern installations?',
    options: [
      'They eliminate the need for a circulating pump',
      'They operate without any water flowing through them',
      'They provide high output from a compact size',
      'They do not require balancing during commissioning',
    ],
    correctAnswer: 2,
    explanation:
      'Type 22 (double panel, double convector) radiators have two water panels and two convector fins, providing up to 100% more output than a Type 11 of the same height and length, ideal where wall space is limited.',
  },
  {
    id: 9,
    question: 'What pressure drop per metre of pipe run is typically used for initial pipe sizing?',
    options: [
      '50 Pa/m',
      '100-200 Pa/m',
      '300-400 Pa/m',
      '500 Pa/m',
    ],
    correctAnswer: 1,
    explanation:
      'Initial pipe sizing typically targets 100-200 Pa/m pressure loss. This provides a balance between pipe cost (smaller is cheaper) and pump energy (lower pressure drop is more efficient). Final sizing considers velocity limits.',
  },
  {
    id: 10,
    question: 'In system balancing, which radiator should reach design temperature first?',
    options: [
      'The radiator closest to the boiler',
      'The largest radiator in the system',
      'All radiators should reach temperature simultaneously',
      'The radiator on the index circuit',
    ],
    correctAnswer: 2,
    explanation:
      'A properly balanced system has all radiators reaching design temperature at the same time. Lockshield valves on near radiators are partially closed to restrict flow, directing more water to distant radiators.',
  },
  {
    id: 11,
    question:
      'What happens to radiator output if flow temperature is reduced from 75 degrees C to 55 degrees C (with room at 20 degrees C)?',
    options: [
      'Output remains the same',
      'Output reduces by approximately 36%',
      'Output increases by 20%',
      'Output reduces by approximately 63%',
    ],
    correctAnswer: 3,
    explanation:
      'Delta T changes from 55K to 35K. Output is proportional to Delta T^1.3 approximately. (35/55)^1.3 = 0.37, so output falls to about 37% of rated value - a 63% reduction. This is why heat pump systems need larger radiators.',
  },
  {
    id: 12,
    question: 'What is the purpose of a bypass valve in a heating system with TRVs?',
    options: [
      'To maintain minimum flow when TRVs close',
      'To increase the flow temperature to all radiators',
      'To allow the room thermostat to control individual radiators',
      'To replace the need for lockshield valves when balancing',
    ],
    correctAnswer: 0,
    explanation:
      'When TRVs close on warm rooms, the pump still runs. Without a bypass, pressure builds up and flow reduces to near zero. A bypass valve allows minimum circulation to protect the pump and boiler heat exchanger.',
  },
];

const faqs = [
  {
    question: 'Why do radiators need to be larger for heat pump systems?',
    answer:
      'Heat pumps operate most efficiently at lower flow temperatures (35-45 degrees C) compared to boilers (60-80 degrees C). Lower Delta T means significantly reduced heat output - a radiator at Delta T 25K delivers only about 40% of its rated output at Delta T 50K. This means radiators typically need to be 2-2.5 times larger for heat pump systems, or underfloor heating may be more appropriate.',
  },
  {
    question: 'How do I determine the index circuit for pump sizing?',
    answer:
      'Calculate the pressure drop for each circuit from pump to furthest radiator and back. Include pipe friction losses (using published data or calculation), fitting losses (typically 30-50% of pipe losses), and component losses (valves, radiator). The circuit with highest total equals the index. The pump must overcome this plus 15-25% margin.',
  },
  {
    question: 'What is the difference between system balancing and commissioning?',
    answer:
      'Commissioning is the complete process of checking, testing and adjusting a heating system including filling, venting, firing the boiler, setting controls, and verifying safety. Balancing is specifically adjusting lockshield valves so that design flow rates and temperatures are achieved at each radiator. Balancing is one part of commissioning.',
  },
  {
    question: 'Can TRVs replace room thermostats?',
    answer:
      'No, TRVs alone cannot control the boiler. Building Regulations require a room thermostat (or programmable thermostat) to switch the boiler. TRVs provide individual room temperature control but need a room stat to cycle the boiler. One radiator should be without a TRV in the room with the thermostat, or use a bypass valve.',
  },
  {
    question: 'What causes radiator noise and how is it prevented?',
    answer:
      'Common causes include: water velocity too high (size pipes correctly, max 1.5 m/s), air in system (proper venting and air separators), pump oversized or on wrong speed (match to system requirement), TRV hunting (use quality TRVs with proportional control), and pipework expansion (allow for thermal movement). Good design and commissioning prevent most noise issues.',
  },
  {
    question: 'How do I calculate the total system flow rate?',
    answer:
      'Sum the flow rates for all radiators: Total flow = Total heat load / (specific heat capacity x temperature drop). For example, a 15kW system with 20K drop needs: 15000 / (4186 x 20) = 0.179 litres/second or 10.7 litres/minute. Add 10% for distribution losses in larger systems.',
  },
];

const HNCModule8Section1_4 = () => {
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
            eyebrow="Module 8 · Section 1 · Subsection 4"
            title="Radiator Systems"
            description="Radiator sizing, pipe sizing, system balancing, TRVs and hydraulic design for two-pipe heating systems"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Calculate radiator heat output with Delta T correction factors",
              "Size pipework for water velocity and pressure drop limits",
              "Identify the index circuit and calculate pump requirements",
              "Understand TRV operation and installation requirements",
              "Apply system balancing procedures using lockshield valves",
              "Design two-pipe heating systems with correct hydraulics",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Radiator Heat Output and Delta T">
            <p>Radiator output depends on the temperature difference between the water inside the radiator and the surrounding room air. This difference is called Delta T (temperature difference). Understanding Delta T is crucial for correctly sizing radiators.</p>
            <p><strong>Understanding Delta T</strong></p>
            <p>Mean Water Temp</p>
            <p>(Flow + Return) / 2</p>
            <p>-</p>
            <p>Subtract</p>
            <p>Room Temp</p>
            <p>Typically 20-21 degrees C</p>
            <p><strong>Delta T = Mean Water Temp - Room Temp</strong></p>
            <p><strong>Standard Test Conditions (BS EN 442):</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Flow temperature: 75 degrees C</li>
              <li>Return temperature: 65 degrees C</li>
              <li>Mean water temperature: (75 + 65) / 2 = 70 degrees C</li>
              <li>Room temperature: 20 degrees C</li>
              <li><strong>Delta T = 70 - 20 = 50K</strong> (standard rating condition)</li>
            </ul>
            <p><strong>Delta T Correction Factors</strong></p>
            <p>When operating at different conditions, apply a correction factor to the rated output:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>50:</strong> 1.00 — Traditional boiler system</li>
              <li><strong>45:</strong> 0.88 — Condensing boiler optimised</li>
              <li><strong>40:</strong> 0.79 — Low temperature system</li>
              <li><strong>35:</strong> 0.67 — Heat pump hybrid</li>
              <li><strong>30:</strong> 0.56 — Air source heat pump</li>
              <li><strong>25:</strong> 0.45 — Ground source heat pump</li>
            </ul>
            <p>Formula: Correction factor = (Delta T / 50)^1.3 approximately</p>
            <p><strong>Worked Example: Radiator Selection</strong></p>
            <p><strong>Given:</strong> Room heat loss = 1800W</p>
            <p>System: Flow 70 degrees C, Return 50 degrees C, Room 21 degrees C</p>
            <p><strong>Step 1:</strong> Calculate Delta T</p>
            <p>Mean water temp = (70 + 50) / 2 = 60 degrees C</p>
            <p>Delta T = 60 - 21 = 39K</p>
            <p><strong>Step 2:</strong> Find correction factor</p>
            <p>Factor for Delta T 39K is approximately 0.76</p>
            <p><strong>Step 3:</strong> Calculate required rated output</p>
            <p>Required = Heat loss / Factor = 1800 / 0.76 = 2368W</p>
            <p><strong>Step 4:</strong> Add design margin (10%)</p>
            <p>Specified output = 2368 x 1.1 = <strong>2605W at Delta T 50K</strong></p>
            <p>Select radiator rated at 2600W or greater</p>
            <p><strong>Radiator Types and Output Comparison:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type 10:</strong> Single panel, no fins — 50%</li>
              <li><strong>Type 11:</strong> Single panel, single convector — 100% (base)</li>
              <li><strong>Type 21:</strong> Double panel, single convector — 150%</li>
              <li><strong>Type 22:</strong> Double panel, double convector — 200%</li>
              <li><strong>Type 33:</strong> Triple panel, triple convector — 280%</li>
            </ul>
            <p><strong>Remember:</strong> Lower flow temperatures (for heat pumps) require significantly larger radiators or alternative emitters like underfloor heating.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Pipe Sizing and Pressure Drop">
            <p>Correct pipe sizing ensures adequate water flow to all radiators without excessive noise or energy consumption. The key factors are water velocity and pressure drop.</p>
            <p><strong>Pipe Sizing Principles</strong></p>
            <p>Velocity Limit</p>
            <p>Maximum 1.5 m/s to avoid noise and erosion</p>
            <p>Lower in bedrooms: 1.0 m/s</p>
            <p>Pressure Drop</p>
            <p>Target 100-200 Pa/m for initial sizing</p>
            <p>Total must be within pump capacity</p>
            <p><strong>Flow Rate Calculation:</strong></p>
            <p><strong>Q = P / (c x Delta T)</strong></p>
            <p>Q = flow rate (kg/s), P = heat (W), c = 4186 J/kg.K, Delta T = temp drop (K)</p>
            <p><strong>Example:</strong> 2kW radiator with 20K temperature drop</p>
            <p>Q = 2000 / (4186 x 20)</p>
            <p>Q = 2000 / 83720 = 0.0239 kg/s</p>
            <p>Q = 0.0239 L/s = 1.43 L/min = <strong>86 L/hour</strong></p>
            <p><strong>Copper Pipe Sizing Guide</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>10mm:</strong> 0.07 L/s (4.2 L/min) — Up to 3kW</li>
              <li><strong>15mm:</strong> 0.18 L/s (11 L/min) — Up to 9kW</li>
              <li><strong>22mm:</strong> 0.45 L/s (27 L/min) — Up to 22kW</li>
              <li><strong>28mm:</strong> 0.75 L/s (45 L/min) — Up to 37kW</li>
              <li><strong>35mm:</strong> 1.24 L/s (74 L/min) — Up to 62kW</li>
            </ul>
            <p>Heat load assumes 20K temperature drop. Reduce for lower Delta T systems.</p>
            <p><strong>Pressure Drop Components:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pipe friction:</strong> Use published tables (Pa/m for flow rate)</li>
              <li><strong>Fittings:</strong> Add 30-50% to straight pipe losses</li>
              <li><strong>Radiator valves:</strong> Typically 1-5 kPa each depending on opening</li>
              <li><strong>TRVs:</strong> 3-10 kPa when fully open</li>
              <li><strong>Boiler/heat source:</strong> Check manufacturer data (typically 10-30 kPa)</li>
            </ul>
            <p><strong>Pressure Drop Worked Example</strong></p>
            <p><strong>Index circuit:</strong> Boiler to furthest radiator</p>
            <p>Flow pipework: 15m of 22mm at 150 Pa/m = 2,250 Pa</p>
            <p>Return pipework: 15m of 22mm at 150 Pa/m = 2,250 Pa</p>
            <p>Fittings allowance (40%): 1,800 Pa</p>
            <p>TRV (fully open): 5,000 Pa</p>
            <p>Lockshield valve: 2,000 Pa</p>
            <p>Radiator: 500 Pa</p>
            <p>Boiler: 15,000 Pa</p>
            <p><strong>Total index circuit: 28,800 Pa = 28.8 kPa</strong></p>
            <p>Pump head required: 28.8 x 1.2 = 34.6 kPa minimum</p>
            <p><strong>Design tip:</strong> Size main distribution pipes generously (lower velocity) to reduce total pressure drop and allow for future additions.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="TRVs and System Control">
            <p>Thermostatic Radiator Valves (TRVs) provide individual room temperature control by automatically adjusting the flow through each radiator based on room air temperature.</p>
            <p><strong>TRV Operating Principle</strong></p>
            <p>1. Temperature Sensing</p>
            <p>Wax or liquid element senses room air temperature</p>
            <p>2. Expansion/Contraction</p>
            <p>Element expands when warm, contracts when cool</p>
            <p><strong>3. Flow Modulation</strong></p>
            <p>Pin movement adjusts valve opening and water flow</p>
            <p><strong>TRV Settings and Temperature Guide:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>* (frost):</strong> 6-8 degrees C — Frost protection only</li>
              <li><strong>1:</strong> 12 degrees C — Unoccupied rooms, storage</li>
              <li><strong>2:</strong> 16 degrees C — Hallways, utility rooms</li>
              <li><strong>3:</strong> 20 degrees C — Living rooms (recommended)</li>
              <li><strong>4:</strong> 24 degrees C — Bathrooms</li>
              <li><strong>5:</strong> 28 degrees C — Maximum - rarely needed</li>
            </ul>
            <p><strong>Critical Installation Rules</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Room with thermostat:</strong> Do NOT fit TRV - radiator must always respond to room stat</li>
              <li><strong>Bypass valve:</strong> Required when all other radiators have TRVs</li>
              <li><strong>Sensor position:</strong> Must sense room air, not radiant heat from radiator</li>
              <li><strong>Minimum one radiator:</strong> Without TRV to ensure minimum system flow</li>
            </ul>
            <p><strong>TRV Types:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Standard wax element:</strong> Most common, reliable, 2-3 degrees C proportional band</li>
              <li><strong>Liquid-filled:</strong> Faster response, more accurate, higher cost</li>
              <li><strong>Remote sensor:</strong> Sensor on capillary tube, placed away from radiator heat</li>
              <li><strong>Programmable electronic:</strong> Time scheduling, remote control, highest accuracy</li>
            </ul>
            <p><strong>Bypass Valve Function</strong></p>
            <p>When TRVs close on satisfied rooms, the pump still runs. Without a path for water, pressure builds and flow stops. A bypass valve:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Opens when differential pressure exceeds setpoint (typically 10-15 kPa)</li>
              <li>Maintains minimum flow through boiler heat exchanger</li>
              <li>Prevents pump damage from dead-heading</li>
              <li>Usually fitted between flow and return near boiler</li>
            </ul>
            <p>Modern boilers may have internal bypass. Check manufacturer guidance.</p>
            <p><strong>Building Regulations:</strong> Part L requires TRVs on all radiators in new installations, except in rooms with a room thermostat.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="System Balancing and Pump Sizing">
            <p><strong>The Index Circuit</strong></p>
            <p>The index circuit is the flow path from pump through the system that has the highest total resistance. This determines the pump head requirement.</p>
            <p><strong>Finding the Index Circuit:</strong></p>
            <p>1. Identify all possible flow paths (pump to each radiator and back)</p>
            <p>2. Calculate pressure drop for each path:</p>
            <p>- Pipe friction (Pa/m x length)</p>
            <p>- Fittings allowance (30-50% of pipe)</p>
            <p>- Valve losses (TRV, lockshield)</p>
            <p>- Heat source (boiler, heat pump)</p>
            <p>3. Path with highest total = index circuit</p>
            <p>Usually the most distant radiator, but not always!</p>
            <p><strong>Pump Sizing</strong></p>
            <p>The pump must provide adequate head to overcome the index circuit resistance whilst delivering the design flow rate.</p>
            <p><strong>Flow Rate Required:</strong></p>
            <p>Q = Total heat / (4186 x Delta T)</p>
            <p>Example: 15kW / (4186 x 20) = 0.18 L/s</p>
            <p><strong>Head Required:</strong></p>
            <p>H = Index circuit drop x 1.15 to 1.25</p>
            <p>Example: 30 kPa x 1.2 = 36 kPa head</p>
            <p><strong>Pump Selection Process:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Plot operating point (flow rate, head) on pump curve</li>
              <li>Point should fall on or slightly below the pump curve</li>
              <li>Select pump where operating point is in efficient range (mid-curve)</li>
              <li>Consider variable speed pumps for energy efficiency</li>
            </ul>
            <p><strong>System Balancing Procedure</strong></p>
            <p>Balancing ensures all radiators reach design temperature simultaneously by adjusting lockshield valve positions.</p>
            <p>Step-by-Step Balancing Method:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Open all lockshield and TRV valves fully</li>
              <li>Turn off all radiators except the index circuit radiator</li>
              <li>Run system until index radiator reaches design temperatures</li>
              <li>Measure flow and return temperatures at index radiator</li>
              <li>Turn on next nearest radiator</li>
              <li>Partially close its lockshield until it reaches same Delta T</li>
              <li>Repeat for each radiator, working towards the pump</li>
              <li>Nearest radiators will have most restricted lockshields</li>
            </ul>
            <p><strong>Target Temperature Drop:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Traditional boiler:</strong> 20K — 18-22K</li>
              <li><strong>Condensing boiler:</strong> 20K — 18-25K (higher = more condensing)</li>
              <li><strong>Heat pump:</strong> 5-7K — 5-10K</li>
            </ul>
            <p><strong>Two-Pipe System Characteristics</strong></p>
            <p>Two-pipe systems have separate flow and return mains, with each radiator receiving water at full flow temperature.</p>
            <p><strong>Advantages:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>All radiators at same flow temperature</li>
              <li>Independent control of each radiator</li>
              <li>Easy to extend or modify</li>
              <li>Consistent heat output throughout</li>
            </ul>
            <p><strong>Considerations:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>More pipework than single-pipe</li>
              <li>Requires proper balancing</li>
              <li>Near radiators tend to over-heat without balance</li>
              <li>Air must be vented from high points</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Complete Radiator System Design</strong>
            </p>
            <p><strong>Brief:</strong> Design heating for a 3-bedroom house with total heat loss 8.5kW. Combi boiler, flow 70 degrees C, return 50 degrees C, room temp 21 degrees C.</p>
            <p><strong>Step 1: System Parameters</strong></p>
            <p>Mean water temp = (70 + 50) / 2 = 60 degrees C</p>
            <p>Delta T = 60 - 21 = 39K</p>
            <p>Correction factor = 0.76</p>
            <p><strong>Step 2: Room Heat Loads and Radiator Sizing</strong></p>
            <p>Living room: 2.5kW / 0.76 x 1.1 = 3.6kW rated</p>
            <p>Kitchen/dining: 1.8kW / 0.76 x 1.1 = 2.6kW rated</p>
            <p>Bedroom 1: 1.5kW / 0.76 x 1.1 = 2.2kW rated</p>
            <p>Bedroom 2: 1.2kW / 0.76 x 1.1 = 1.7kW rated</p>
            <p>Bedroom 3: 1.0kW / 0.76 x 1.1 = 1.4kW rated</p>
            <p>Bathroom: 0.5kW / 0.76 x 1.1 = 0.7kW rated</p>
            <p><strong>Step 3: Flow Rate</strong></p>
            <p>Total system flow = 8500 / (4186 x 20) = 0.102 L/s = 6.1 L/min</p>
            <p><strong>Step 4: Pipe Sizing</strong></p>
            <p>Main flow/return: 22mm (handles 11 L/min at 1.5 m/s)</p>
            <p>Branches to radiators: 15mm (adequate for individual loads)</p>
            <p><strong>Step 5: Index Circuit</strong></p>
            <p>Bedroom 3 (furthest): 18m pipe run + boiler + valves = 35 kPa</p>
            <p>Pump requirement: 35 x 1.2 = 42 kPa head at 6 L/min</p>
            <p>Select pump: e.g. Grundfos 15-50 or similar</p>
            <p>
              <strong>Example 2: Heat Pump Radiator Upsizing</strong>
            </p>
            <p><strong>Question:</strong> An existing radiator rated 2kW at Delta T 50K is to be used with a heat pump at flow 45 degrees C, return 40 degrees C, room 20 degrees C. Will it be adequate for a room heat loss of 1.2kW?</p>
            <p><strong>Calculate actual Delta T:</strong></p>
            <p>Mean water temp = (45 + 40) / 2 = 42.5 degrees C</p>
            <p>Delta T = 42.5 - 20 = 22.5K</p>
            <p><strong>Find correction factor:</strong></p>
            <p>Factor = (22.5 / 50)^1.3 = 0.45^1.3 = 0.36</p>
            <p><strong>Calculate actual output:</strong></p>
            <p>Actual output = 2000 x 0.36 = <strong>720W</strong></p>
            <p><strong>Compare to requirement:</strong></p>
            <p>Required: 1200W, Available: 720W</p>
            <p>Shortfall: 480W - radiator is NOT adequate</p>
            <p><strong>Required rated output:</strong></p>
            <p>Need = 1200 / 0.36 = 3333W at Delta T 50K</p>
            <p>Replace with minimum 3.4kW rated radiator</p>
            <p>
              <strong>Example 3: Balancing Temperature Measurement</strong>
            </p>
            <p><strong>Question:</strong> During balancing, the index radiator has flow 68 degrees C and return 48 degrees C. A nearby radiator shows flow 70 degrees C and return 42 degrees C. What adjustment is needed?</p>
            <p><strong>Index radiator (target):</strong></p>
            <p>Delta T = 68 - 48 = 20K (design condition - correct)</p>
            <p><strong>Nearby radiator (to adjust):</strong></p>
            <p>Delta T = 70 - 42 = 28K (too high - flow too low)</p>
            <p><strong>Analysis:</strong></p>
            <p>Higher Delta T means water is staying longer (lower flow rate)</p>
            <p>This radiator has too much restriction</p>
            <p><strong>Action:</strong></p>
            <p>OPEN the lockshield valve slightly to increase flow</p>
            <p>Recheck until Delta T matches index radiator (20K)</p>
            <p><strong>Note:</strong> If Delta T were lower than index,</p>
            <p>you would CLOSE the lockshield to reduce flow</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Delta T = Mean water temp - Room temp</strong></li>
              <li><strong>Mean water temp = (Flow + Return) / 2</strong></li>
              <li><strong>Flow rate Q = Heat (W) / (4186 x Delta T)</strong></li>
              <li><strong>Corrected output = Rated output x (actual Delta T / 50)^1.3</strong></li>
              <li><strong>Pump head = Index circuit pressure drop x 1.15 to 1.25</strong></li>
            </ul>
            <p>
              <strong>Key Design Principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Always apply Delta T correction when selecting radiators</li>
              <li>Keep water velocity below 1.5 m/s (1.0 m/s in bedrooms)</li>
              <li>Size pump for index circuit plus 15-25% margin</li>
              <li>Include bypass valve when TRVs fitted throughout</li>
              <li>Leave one radiator without TRV in room thermostat location</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Ignoring Delta T correction:</strong> Undersized radiators for low-temp systems</li>
                <li><strong>No system balancing:</strong> Near radiators too hot, far ones too cold</li>
                <li><strong>TRV on thermostat room:</strong> Boiler runs continuously</li>
                <li><strong>Undersized pipes:</strong> Noise, high pressure drop, pump failure</li>
                <li><strong>No bypass:</strong> Pump damage when TRVs close</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Underfloor heating
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section1-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Heating controls
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section1_4;
