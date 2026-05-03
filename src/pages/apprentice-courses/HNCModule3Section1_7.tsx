/**
 * Module 3 · Section 1 · Subsection 7 — DC Building Services Applications
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   Where the DC theory lands on a real building services job — emergency lighting, fire-alarm
 *   loops, BMS sensor circuits, central battery systems and the 24 V DC controls behind every AHU.
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

const TITLE = 'Building Services Applications - HNC Module 3 Section 1.7';
const DESCRIPTION =
  'Apply DC circuit theory to emergency lighting, fire alarm systems, BMS controls and standby power in building services installations.';

const quickCheckQuestions = [
  {
    id: 'emergency-duration',
    question: 'What is the minimum maintained duration for emergency lighting in most UK premises?',
    options: ['1 hour', '2 hours', '3 hours', '4 hours'],
    correctIndex: 2,
    explanation:
      'BS 5266 specifies 3-hour maintained duration as standard for most premises, allowing safe evacuation and emergency services operations.',
  },
  {
    id: 'fire-alarm-standby',
    question: 'What is the minimum standby battery capacity required for a fire alarm system?',
    options: ['12 hours', '24 hours', '48 hours', '72 hours'],
    correctIndex: 1,
    explanation:
      'BS 5839-1 requires minimum 24 hours standby followed by 30 minutes alarm condition for Category L/P systems.',
  },
  {
    id: 'bms-voltage',
    question: 'What is the standard control voltage for BMS sensors and actuators?',
    options: ['12V DC', '24V DC', '48V DC', '230V AC'],
    correctIndex: 1,
    explanation:
      '24V DC is the industry standard for building management system controls, providing a safe low voltage whilst sufficient for powering sensors and small actuators.',
  },
  {
    id: 'ups-topology',
    question: 'Which UPS topology provides zero transfer time to battery?',
    options: ['Standby (offline)', 'Line-interactive', 'Online double conversion', 'Rotary UPS'],
    correctIndex: 2,
    explanation:
      'Online double conversion UPS continuously powers the load from the inverter, so there is no transfer time when mains fails - the load never sees any interruption.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A self-contained emergency luminaire has a 3.6V NiCd battery rated at 4Ah. What is the stored energy?',
    options: ['1.2Wh', '7.2Wh', '14.4Wh', '43.2Wh'],
    correctAnswer: 2,
    explanation:
      'Energy = Voltage × Capacity = 3.6V × 4Ah = 14.4Wh. This is the total energy available for the emergency duration.',
  },
  {
    id: 2,
    question: 'An emergency luminaire draws 6W. What battery capacity is needed for 3 hours?',
    options: ['2Ah at 6V', '3Ah at 6V', '6Ah at 3V', 'All would work'],
    correctAnswer: 3,
    explanation:
      'Energy required = 6W × 3h = 18Wh. This could be 2Ah×6V=12Wh (not enough), 3Ah×6V=18Wh (minimum), or 6Ah×3V=18Wh. Allow 20% margin.',
  },
  {
    id: 3,
    question:
      'A fire alarm circuit uses 1.5mm² cable for 200m. What is the loop resistance at 20°C?',
    options: ['2.4Ω', '4.8Ω', '9.7Ω', '12.1Ω'],
    correctAnswer: 1,
    explanation:
      'Loop resistance = 2 × length × resistance per metre = 2 × 200m × 12.1mΩ/m = 4.84Ω ≈ 4.8Ω',
  },
  {
    id: 4,
    question: 'What maximum loop resistance is typically permitted on fire alarm circuits?',
    options: ['20Ω', '40Ω', '100Ω', '500Ω'],
    correctAnswer: 1,
    explanation:
      'Most fire alarm panels specify maximum 40Ω loop resistance for reliable device communication and detection.',
  },
  {
    id: 5,
    question:
      'A 24V DC BMS circuit supplies sensors drawing 500mA total. What is the power consumption?',
    options: ['6W', '12W', '24W', '48W'],
    correctAnswer: 1,
    explanation: 'P = V × I = 24V × 0.5A = 12W. This helps size the power supply and cable.',
  },
  {
    id: 6,
    question: 'What voltage drop is typically acceptable on BMS sensor circuits?',
    options: ['1%', '3%', '5%', '10%'],
    correctAnswer: 2,
    explanation:
      'BMS circuits typically allow 5% voltage drop (1.2V on 24V circuits) to ensure sensors and actuators operate reliably at minimum voltage.',
  },
  {
    id: 7,
    question: 'A UPS has 40 × 12V batteries in series. What is the DC bus voltage?',
    options: ['120V DC', '240V DC', '400V DC', '480V DC'],
    correctAnswer: 3,
    explanation: 'Total voltage = Number of batteries × Battery voltage = 40 × 12V = 480V DC',
  },
  {
    id: 8,
    question:
      'Fire alarm standby batteries rated 24V, 7Ah. System quiescent current is 200mA. What is standby time?',
    options: ['12 hours', '24 hours', '35 hours', '48 hours'],
    correctAnswer: 2,
    explanation:
      'Standby time = Capacity / Current = 7Ah / 0.2A = 35 hours. Exceeds the minimum 24-hour requirement.',
  },
  {
    id: 9,
    question: 'Which standard covers emergency lighting design and installation?',
    options: ['BS 7671', 'BS 5266', 'BS 5839', 'BS EN 60947'],
    correctAnswer: 1,
    explanation:
      'BS 5266 covers emergency lighting design, installation, and maintenance. BS 5839 covers fire detection and alarm systems.',
  },
  {
    id: 10,
    question:
      'A generator starting battery is 24V with 500CCA. What circuit protection is typical?',
    options: ['10A fuse', '60A fuse', '100A fuse', 'No protection needed'],
    correctAnswer: 2,
    explanation:
      'Starting circuits need heavy-duty protection due to high inrush currents. 100A-200A fuses are typical for generator starting batteries.',
  },
];

const faqs = [
  {
    question: 'Why do emergency lighting batteries use NiCd rather than lead-acid?',
    answer:
      'Nickel-cadmium (NiCd) batteries offer superior cycle life, better performance at extreme temperatures, longer shelf life when discharged, and more reliable operation after extended standby periods. Although more expensive initially, their 4-5 year typical lifespan and reliable emergency performance make them the standard choice for life safety applications.',
  },
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Maintained luminaires operate continuously on mains power and switch to battery during failure - common in areas requiring constant illumination. Non-maintained luminaires only illuminate during mains failure - suitable for areas with normal lighting. Maintained is required in entertainment venues and areas with dimmed lighting.',
  },
  {
    question: 'How do I calculate fire alarm battery requirements?',
    answer:
      'Calculate total quiescent current (panel + all devices). Multiply by 24 hours minimum standby. Add alarm current (all sounders) × 30 minutes. The battery Ah rating must exceed this total. Always include 25% margin for ageing. Example: 150mA quiescent × 24h = 3.6Ah + 2A alarm × 0.5h = 1Ah = 4.6Ah minimum, use 7Ah batteries.',
  },
  {
    question: 'Why use 24V DC rather than 230V AC for BMS controls?',
    answer:
      '24V DC provides inherent safety (SELV), simpler wiring without special segregation requirements, compatibility with electronic sensors and microprocessor-based controllers, reduced electrical noise, and easier battery backup integration. It also allows use of lower-cost cabling and simplified installation.',
  },
  {
    question: 'What is the difference between online and line-interactive UPS?',
    answer:
      'Online (double conversion) UPS continuously converts AC-DC-AC, providing zero transfer time and complete isolation from mains disturbances - essential for critical IT loads. Line-interactive UPS passes mains through normally with voltage regulation, switching to battery on failure with 2-4ms transfer time - suitable for less critical equipment.',
  },
  {
    question: 'How do generator starting circuits work?',
    answer:
      'A dedicated 12V or 24V DC battery bank powers the starter motor during cranking, drawing very high currents (hundreds of amps) for brief periods. The battery is kept charged by a float charger connected to mains. On mains failure, the generator controller signals the starter circuit. Most systems include multiple start attempts with cooling periods between.',
  },
];

const HNCModule3Section1_7 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 7"
            title="Building Services Applications"
            description="Practical DC circuit applications in emergency lighting, fire alarms, BMS controls and standby power"
            tone="purple"
          />

          <TLDR
            points={[
              'You can size a 24 V DC BMS sensor circuit — work out load current, pick the right pull-up / current-limit resistor, allow for cable voltage drop on long sensor runs.',
              'You can size battery capacity (Ah) for emergency lighting and fire-alarm standby duty using load × duration × derating.',
              'You can apply DC voltage-drop limits on long control wiring runs (often 10 % of nominal) and decide when to step up conductor size.',
              'You can read the DC sections of fire-alarm and emergency-lighting manufacturer cut sheets and translate them to a system design.',
              'You can spot the difference between an analogue 4-20 mA loop, a 0-10 V control signal and a digital 24 V DC volt-free contact — each needs different sizing.',
            ]}
          />

          <RegsCallout
            source="BS 5839-1 — Fire detection and alarm systems for buildings (Code of practice)"
            clause="The standby battery shall have sufficient capacity to maintain the system in the quiescent condition for at least 24 hours, after which it shall be capable of providing the alarm load for at least 30 minutes."
            meaning={
              <>
                The 24 h + 30 min duty cycle is a DC capacity calculation: I_quiescent ×
                24 h + I_alarm × 0.5 h, multiplied by an end-of-life and ambient
                derating factor (often ×1.25). The result is the minimum Ah rating of the
                sealed lead-acid or LiFePO₄ battery in the panel.
              </>
            }
            cite="Source: BS 5839-1 (latest edition) Clause 25."
          />

          <LearningOutcomes
            outcomes={[
              'Calculate emergency lighting battery requirements for 3-hour duration',
              'Size fire alarm standby batteries for 24-hour operation',
              'Analyse loop resistance and voltage drop on detection circuits',
              'Design 24V DC BMS sensor wiring with correct cable sizing',
              'Understand UPS battery bank configurations and DC distribution',
              'Calculate generator starting battery requirements',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="DC circuits underpin life safety: emergency lighting, fire alarms, BMS controls and standby power. Each has its own standard, battery and cable rules."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Emergency lighting:</strong> 3-hour battery backup, self-contained or central
              </li>
              <li>
                <strong>Fire alarms:</strong> 24-hour standby + 30 min alarm condition
              </li>
              <li>
                <strong>BMS controls:</strong> 24V DC sensors, actuators, controllers
              </li>
              <li>
                <strong>Standby power:</strong> UPS, generator starting, DC distribution
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Standards</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 5266:</strong> Emergency lighting design and installation
              </li>
              <li>
                <strong>BS 5839-1:</strong> Fire detection and alarm systems
              </li>
              <li>
                <strong>BS 7671:</strong> Wiring requirements for all systems
              </li>
              <li>
                <strong>BS EN 62040:</strong> UPS system requirements
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Emergency Lighting Systems">
            <p>
              Emergency lighting provides illumination when the normal supply fails, enabling safe
              evacuation and emergency services operations. BS 5266 requires specific battery
              capacities and luminaire performance to ensure life safety.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Battery Technology Comparison</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>NiCd:</strong> 1.2V/cell — 4-5 years typical life — most self-contained units
              </li>
              <li>
                <strong>NiMH:</strong> 1.2V/cell — 3-4 years — higher capacity applications
              </li>
              <li>
                <strong>Lead-acid (VRLA):</strong> 2.0V/cell — 3-5 years — central battery systems
              </li>
              <li>
                <strong>LiFePO4:</strong> 3.2V/cell — 5-8 years — premium/compact units
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Self-Contained Units</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Battery integral to each luminaire</li>
              <li>Typical: 3.6V NiCd, 1.5-4Ah capacity</li>
              <li>Permanent live feed required</li>
              <li>Simple installation, higher maintenance</li>
              <li>BS 5266 minimum 3-hour duration</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Central Battery Systems</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single battery location, distributed luminaires</li>
              <li>Typical: 110V or 220V DC distribution</li>
              <li>Lower ongoing maintenance</li>
              <li>Fire-resistant cables required</li>
              <li>Centralised monitoring capability</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Battery Capacity Calculation</p>
            <p>
              <strong>C = P × t / V × 1.25</strong> — Where C = capacity (Ah), P = power (W), t =
              time (h), V = voltage (V), 1.25 = ageing factor.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Always apply 25% capacity margin to account for battery
              ageing over its service life.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Fire Alarm Systems">
            <p>
              Fire detection and alarm systems require reliable DC power for continuous monitoring.
              BS 5839-1 mandates specific standby battery requirements ensuring operation during
              mains failure.
            </p>
            <p className="text-sm font-medium text-white">BS 5839-1 Battery Requirements</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Category L/P systems:</strong> 24 hours standby + 30 minutes alarm
              </li>
              <li>
                <strong>Category M systems:</strong> 72 hours standby + 15 minutes alarm
              </li>
              <li>
                <strong>Replacement:</strong> When capacity drops below 80% of nominal
              </li>
              <li>
                <strong>Typical battery life:</strong> 4-5 years for VRLA types
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Fire Alarm Circuit Considerations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loop voltage:</strong> 17-28V DC — Panel dependent, check specs
              </li>
              <li>
                <strong>Max loop resistance:</strong> 40Ω — Limits cable length/size
              </li>
              <li>
                <strong>Quiescent current:</strong> 100-300mA — Panel + all devices
              </li>
              <li>
                <strong>Alarm current:</strong> 1-3A — All sounders operating
              </li>
              <li>
                <strong>Cable type:</strong> FP200/MICC — Fire-resistant required
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Loop Resistance Calculation</p>
            <p>
              <strong>R<sub>loop</sub> = 2 × L × r</strong> — Where L = cable length (m), r =
              conductor resistance (Ω/m).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Voltage Drop on Sounder Circuits</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculate worst-case (end device)</li>
              <li>Include all devices operating</li>
              <li>Verify device minimum voltage</li>
              <li>Allow for battery end-of-discharge</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Cable Sizing Steps</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1. Determine total loop current</li>
              <li>2. Calculate required loop length</li>
              <li>3. Check loop resistance vs max</li>
              <li>4. Verify voltage drop acceptable</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Fire alarm circuits must use fire-resistant cable (e.g.,
              FP200) maintaining circuit integrity for minimum 30 minutes in fire conditions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="BMS and Controls">
            <p>
              Building Management Systems use 24V DC control circuits extensively for sensors,
              actuators, and controllers. Understanding DC circuit principles is essential for
              reliable BMS wiring design.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Common BMS DC Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Temperature sensor:</strong> 24V DC — 10-20mA — 4-20mA output signal
              </li>
              <li>
                <strong>CO2 sensor:</strong> 24V DC — 30-50mA — Active sensing element
              </li>
              <li>
                <strong>Valve actuator:</strong> 24V AC/DC — 100-500mA — Higher during operation
              </li>
              <li>
                <strong>Damper actuator:</strong> 24V AC/DC — 200-800mA — Spring-return types higher
              </li>
              <li>
                <strong>Outstation/controller:</strong> 24V DC — 200-500mA — Depends on I/O count
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">24V DC Supply Sizing</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total all device currents</li>
              <li>Add 20% growth capacity</li>
              <li>Consider inrush currents</li>
              <li>Typical PSUs: 2.5A, 5A, 10A</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Cable Selection</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Max 5% voltage drop (1.2V at 24V)</li>
              <li>Screened cable for analogue signals</li>
              <li>Twisted pairs reduce interference</li>
              <li>Segregate from power cables</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Sensor Loop Resistance Calculation</p>
            <p>
              <strong>R<sub>max</sub> = V<sub>drop(max)</sub> / I<sub>loop</sub></strong> — Example:
              1.2V max drop, 50mA loop = 24Ω maximum cable resistance.
            </p>
            <p className="text-sm font-medium text-white">Signal Types</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0-10V DC:</strong> Analogue control signal, voltage referenced to common
              </li>
              <li>
                <strong>4-20mA:</strong> Current loop, immune to voltage drop, 4mA = live zero
              </li>
              <li>
                <strong>Digital I/O:</strong> 24V DC switched signals, typically volt-free contacts
              </li>
              <li>
                <strong>RS-485:</strong> Serial communication, twisted pair, up to 1200m
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use 4-20mA signals for long cable runs - the current
              loop is immune to voltage drop that would affect 0-10V signals.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Standby Power Systems">
            <p>
              Standby power systems rely heavily on DC circuits - from UPS battery banks providing
              uninterrupted power to generator starting batteries and DC distribution for critical
              systems.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">UPS Battery Configurations</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Small UPS:</strong> 12-48V DC — Desktop, small servers
              </li>
              <li>
                <strong>Medium UPS:</strong> 192-240V DC — Server rooms
              </li>
              <li>
                <strong>Large UPS:</strong> 400-480V DC — Data centres
              </li>
              <li>
                <strong>Modular UPS:</strong> Variable — Scalable installations
              </li>
            </ul>
            <p className="text-sm font-medium text-white">UPS Topologies</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standby (offline):</strong> Cheapest, 5-12ms transfer time, basic protection
              </li>
              <li>
                <strong>Line-interactive:</strong> Voltage regulation, 2-4ms transfer, good value
              </li>
              <li>
                <strong>Online double conversion:</strong> Zero transfer, complete isolation, highest protection
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Battery Bank Sizing</p>
            <p>
              <strong>Ah = (P × t) / (V × η × DoD)</strong> — Where η = inverter efficiency (~0.9),
              DoD = depth of discharge (~0.8 for lead-acid).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Generator Starting Batteries</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Typically 12V or 24V systems</li>
              <li>High CCA (Cold Cranking Amps) rating</li>
              <li>Float charging maintains readiness</li>
              <li>Multiple start attempts programmed</li>
              <li>Heating in cold environments</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">DC Distribution</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>48V DC for telecom equipment</li>
              <li>24V DC for control systems</li>
              <li>DC circuit breakers required</li>
              <li>Polarity protection essential</li>
              <li>Fusing sized for battery short-circuit</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Starting Battery Calculation</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>10-50 kVA:</strong> 12V 100Ah — 600-800 CCA
              </li>
              <li>
                <strong>50-200 kVA:</strong> 24V (2×12V) 100Ah — 800-1200 CCA
              </li>
              <li>
                <strong>200-500 kVA:</strong> 24V 150-200Ah — 1200-1500 CCA
              </li>
              <li>
                <strong>&gt;500 kVA:</strong> 24V 200Ah+ — 1500+ CCA
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Safety note:</strong> Large DC battery banks can deliver extremely high fault
              currents. Proper fusing and DC-rated isolation devices are essential.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Emergency Lighting Battery Sizing</p>
            <p>
              <strong>Question:</strong> An emergency luminaire uses a 5W LED lamp with 3.6V NiCd
              battery. Calculate the minimum battery capacity for 3-hour operation.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Energy required = Power × Time = 5W × 3h = <strong>15Wh</strong></li>
              <li>Battery capacity at 3.6V: C = E / V = 15Wh / 3.6V = 4.17Ah</li>
              <li>With 25% ageing factor: C<sub>design</sub> = 4.17 × 1.25 = <strong>5.2Ah minimum</strong></li>
              <li>→ Specify 6Ah battery (next standard size)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: Fire Alarm Battery Calculation</p>
            <p>
              <strong>Question:</strong> A fire alarm system has 180mA quiescent current and 2.5A
              alarm current. Size batteries for 24V system.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standby (24h): E<sub>standby</sub> = 0.18A × 24h = 4.32Ah</li>
              <li>Alarm (30 min): E<sub>alarm</sub> = 2.5A × 0.5h = 1.25Ah</li>
              <li>Total required: E<sub>total</sub> = 4.32 + 1.25 = 5.57Ah</li>
              <li>With 25% margin: C<sub>design</sub> = 5.57 × 1.25 = <strong>6.96Ah</strong></li>
              <li>→ Specify 2 × 12V 7Ah batteries in series</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: BMS Sensor Loop Resistance</p>
            <p>
              <strong>Question:</strong> A 24V DC sensor circuit runs 80m using 0.75mm² cable.
              Current is 40mA. Check voltage drop is within 5%.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable resistance (0.75mm²) = 24.5mΩ/m</li>
              <li>Loop resistance: R = 2 × 80m × 24.5mΩ/m = 3.92Ω</li>
              <li>Voltage drop: V<sub>drop</sub> = I × R = 0.04A × 3.92Ω = <strong>0.157V</strong></li>
              <li>As percentage: (0.157 / 24) × 100 = <strong>0.65%</strong></li>
              <li>✓ Well within 5% limit — 0.75mm² is adequate</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 4: Fire Alarm Loop Resistance Check</p>
            <p>
              <strong>Question:</strong> A fire alarm detection loop uses 1.5mm² cable and is 350m
              long. Will it meet the 40Ω maximum?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable resistance (1.5mm²) = 12.1mΩ/m</li>
              <li>Loop resistance: R = 2 × 350m × 12.1mΩ/m = 8.47Ω</li>
              <li>✓ 8.47Ω is well below 40Ω limit</li>
              <li>Maximum length with 1.5mm² cable: L<sub>max</sub> = 40Ω / (2 × 12.1mΩ/m) = <strong>1653m</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas for Building Services DC</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Battery capacity:</strong> C = (P × t) / V × safety factor
              </li>
              <li>
                <strong>Loop resistance:</strong> R = 2 × L × r (per metre)
              </li>
              <li>
                <strong>Voltage drop:</strong> V<sub>d</sub> = I × R<sub>loop</sub>
              </li>
              <li>
                <strong>Power:</strong> P = V × I (DC circuits)
              </li>
              <li>
                <strong>Energy:</strong> E = V × Ah (Wh) or P × t
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Emergency lighting duration: <strong>3 hours</strong> minimum (BS 5266)</li>
              <li>Fire alarm standby: <strong>24 hours + 30 min</strong> alarm (BS 5839)</li>
              <li>BMS control voltage: <strong>24V DC</strong> standard</li>
              <li>Maximum BMS voltage drop: <strong>5%</strong> (1.2V at 24V)</li>
              <li>Typical fire alarm loop max: <strong>40Ω</strong></li>
              <li>Battery ageing factor: <strong>1.25</strong> (25% margin)</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common building-services DC mistakes"
            whatHappens={
              <>
                Forgetting the loop factor (cable resistance must include both conductors). Ignoring
                battery ageing. Mixing AC/DC actuators without checking specs. Using non
                fire-resistant cable on fire alarm circuits. Undersizing generator starting
                batteries.
              </>
            }
            doInstead={
              <>
                Always ×2 for go and return. Apply a 25% ageing margin. Verify actuator AC/DC
                rating. Use FP200/MICC on detection and sounder circuits. Size starting batteries
                for the high CCA rating per generator class.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Sizing a fire-alarm panel battery for a 4-storey office"
            situation={
              <>
                A new BS 5839-1 Category L2 fire-alarm system has a quiescent panel current
                of 250 mA and a full-alarm current (sounders + beacons + interfaces) of
                2.4 A. The system requires the standard 24 h standby + 30 min alarm
                duty.
              </>
            }
            whatToDo={
              <>
                Compute the energy demand: 0.250 A × 24 h = 6.0 Ah quiescent + 2.4 A
                × 0.5 h = 1.2 Ah alarm = 7.2 Ah total. Apply BS 5839-1 derating (typically
                ×1.25 for end-of-life capacity loss) → 9.0 Ah minimum. Pick the next
                standard capacity above that — typically a pair of 12 V 12 Ah sealed
                lead-acid batteries in series. Document the calculation in the commissioning
                certificate and re-check at every annual service.
              </>
            }
            whyItMatters={
              <>
                A fire-alarm panel that drops out before the 24 h + 30 min duty is up is a
                life-safety failure and a Building Regulations non-compliance. The Ah
                calculation is a direct application of DC circuit theory — current
                × time × derating — and your name is on the cert.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Building services DC systems live at 12 V, 24 V, 48 V (and sometimes 110 V DC for sub-station tripping batteries) — pick the right voltage class for the application.',
              'Battery capacity (Ah) = sum of (current × duration) for every duty cycle, multiplied by an end-of-life derating factor (typically ×1.25).',
              'BS 5839-1: fire-alarm panel battery — 24 h standby + 30 min alarm duty.',
              'BS 5266-1: emergency lighting battery — 1 h or 3 h emergency duration at end-of-life voltage.',
              'BMS sensor circuits typically use 24 V DC two-wire loops — voltage-drop budget is tight on long runs (often 10 % of nominal).',
              '4-20 mA analogue loops are noise-immune and self-checking (0 mA = broken cable) — the working sensor signal in heavy industrial plant rooms.',
              '0-10 V analogue control signals are common on damper actuators, EC fans and lighting drivers — voltage-source, low-current, sensitive to drop on long runs.',
              'DC fault clearance is harder than AC — there is no zero crossing, so DC fuses and breakers are physically larger than AC equivalents at the same rating.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Network Theorems
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Inductance, capacitance and power factor
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section1_7;
