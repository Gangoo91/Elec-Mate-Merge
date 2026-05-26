/**
 * Module 4 · Section 5 · Subsection 4 — UPS and Standby Power
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   UPS topologies (offline / line-interactive / online / rotary), battery sizing,
 *   battery technologies (VRLA / lithium-ion), generator coordination sequences and
 *   automatic transfer switch configurations for resilient power architectures.
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

const TITLE = 'UPS and Standby Power - HNC Module 4 Section 5.4';
const DESCRIPTION =
  'Master UPS and standby power systems for building services: UPS types (online/offline/line-interactive), battery sizing, generator coordination and automatic transfer.';

const quickCheckQuestions = [
  {
    id: 'ups-online',
    question: 'What is the main advantage of an online (double-conversion) UPS?',
    options: [
      'Forming, establishing, developing, closing',
      'Depends on system type and capacity',
      'Correct connection of line, neutral, and earth conductors',
      'Zero transfer time - continuous power conditioning',
    ],
    correctIndex: 3,
    explanation:
      'Online UPS continuously converts AC to DC then back to AC, so there is no transfer time when mains fails. The load is always supplied from the inverter, providing constant power conditioning.',
  },
  {
    id: 'battery-ah',
    question:
      'A 10kVA UPS requires 15 minutes autonomy. Battery bank is 192V DC. What Ah capacity is needed (assume 80% efficiency)?',
    options: [
      '81Ah',
      '65Ah',
      '52Ah',
      '98Ah',
    ],
    correctIndex: 0,
    explanation:
      'Energy = 10000VA × 0.25h = 2500VAh. At 80% efficiency: 2500/0.8 = 3125VAh. Ah = 3125VAh/192V = 16.3Ah minimum. Allow 5× for discharge rate: ~81Ah typical.',
  },
  {
    id: 'ats',
    question: 'What does an Automatic Transfer Switch (ATS) do?',
    options: [
      'To continuously reassess risks as conditions change during the work',
      'Switches load between mains and generator automatically',
      'Installation method, ambient temperature, grouping, thermal insulation',
      'A graph showing how electrical demand varies over time',
    ],
    correctIndex: 1,
    explanation:
      'An ATS monitors mains supply and automatically transfers the load to a standby generator when mains fails, then retransfers when mains is restored and stable.',
  },
  {
    id: 'gen-start',
    question: 'What is the typical start-up time for a standby diesel generator?',
    options: [
      '5-15 seconds',
      '5-10 minutes',
      'Instantaneous',
      '1-2 minutes',
    ],
    correctIndex: 0,
    explanation:
      'Modern standby generators with battery start typically achieve full rated power within 10-15 seconds. UPS provides backup during this start-up period.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the purpose of a UPS system?',
    options: [
      'Single fibre cable for one-way or BiDi links',
      'To provide uninterrupted power during mains failures',
      'Record the exact measured value with appropriate units',
      'Non-combustible enclosure (metal or fire-resistant)',
    ],
    correctAnswer: 1,
    explanation:
      'A UPS (Uninterruptible Power Supply) maintains power to critical loads during mains failures, providing seamless transition to battery power and conditioning the supply.',
  },
  {
    id: 2,
    question: 'How does an offline (standby) UPS differ from an online UPS?',
    options: [
      'Heat gains cannot escape, temperatures rise',
      'In each individual DALI driver/ballast',
      'Offline UPS only switches to battery when mains fails',
      'Moves to lower flow, higher head (towards shutoff)',
    ],
    correctAnswer: 2,
    explanation:
      'Offline UPS passes mains power directly to the load during normal operation, only switching to battery/inverter when mains fails. This causes a brief transfer time (typically 5-12ms).',
  },
  {
    id: 3,
    question: 'What is the function of the rectifier in an online UPS?',
    options: [
      'A self-propelled boom lift that can be driven with the platform raised',
      'Overloading, loose connections, or high resistance contacts',
      'Calmly repeating your position without getting drawn into arguments',
      'To convert AC mains to DC for charging batteries and supplying inverter',
    ],
    correctAnswer: 3,
    explanation:
      'The rectifier converts incoming AC to DC, which charges the batteries and supplies the inverter. This decouples the load from mains disturbances.',
  },
  {
    id: 4,
    question: 'What battery technology is most commonly used in modern UPS systems?',
    options: [
      'Lithium-ion or VRLA (Valve Regulated Lead Acid)',
      'Enhanced fire stopping and emergency lighting requirements',
      'Class EN 131 Professional — suitable for trade use',
      'CO2 (carbon dioxide) or dry powder',
    ],
    correctAnswer: 0,
    explanation:
      'VRLA batteries are most common due to low maintenance. Lithium-ion is increasingly used for longer life, lighter weight and faster charging, despite higher initial cost.',
  },
  {
    id: 5,
    question: 'Why is generator synchronisation important before transferring load?',
    options: [
      'On-site in an accessible location near the fire panel or site office',
      'To ensure voltage, frequency and phase match before closing transfer switch',
      'Provide physical separation between workers and live parts, preventing accidental contact',
      'That base plates are on sole boards, the ground is firm, and standards are plumb',
    ],
    correctAnswer: 1,
    explanation:
      'Synchronisation ensures generator output matches utility voltage, frequency and phase angle before the ATS connects the load. This prevents damaging current surges.',
  },
  {
    id: 6,
    question: "What is 'N+1' redundancy in UPS systems?",
    options: [
      'To determine cable sizes and protective device ratings',
      'Achieving net zero greenhouse gas emissions by 2050',
      'One extra UPS module beyond minimum needed for the load',
      'To prevent fire spread through cable penetrations',
    ],
    correctAnswer: 2,
    explanation:
      'N+1 redundancy means having one extra UPS module beyond the N modules needed for the load. If N=2 modules carry the load, N+1 means 3 modules total - one can fail without affecting supply.',
  },
  {
    id: 7,
    question: 'What is the typical autonomy time for UPS in a data centre with generator backup?',
    options: [
      '1-2 minutes',
      '8 hours',
      '1-2 hours',
      '5-15 minutes',
    ],
    correctAnswer: 3,
    explanation:
      'With generator backup, UPS typically provides 5-15 minutes autonomy - enough for generator start-up and stabilisation. Longer autonomy is costly and unnecessary.',
  },
  {
    id: 8,
    question: "What causes 'battery float' operation?",
    options: [
      'Continuous trickle charging to maintain full charge',
      'RF interference and spectrum management',
      'AC residual currents (and some types handle DC components)',
      'Work in special locations or involving new circuits',
    ],
    correctAnswer: 0,
    explanation:
      'Float charging maintains batteries at full charge with a small continuous current to compensate for self-discharge. This keeps batteries ready for immediate use without overcharging.',
  },
  {
    id: 9,
    question: 'What is the function of a bypass in a UPS system?',
    options: [
      'The period of employment plus a reasonable period after (typically 3-6 years)',
      'To allow maintenance and provide alternative power path if UPS fails',
      'Any person who controls the work activity to any extent',
      'Regularly reviewing progress towards your goal and adjusting your approach',
    ],
    correctAnswer: 1,
    explanation:
      'The bypass provides an alternative power path around the UPS for maintenance (maintenance bypass) or automatic transfer if the UPS fails (automatic bypass).',
  },
  {
    id: 10,
    question: "What is 'generator block loading' and why should it be avoided?",
    options: [
      'Explain the underlying theory and regulation references before the practical task',
      'Just fits — but with virtually no headroom for additional cables or future modification',
      'Connecting full load instantly causing frequency/voltage disturbance',
      'Critical path activities with lowest crash cost per day',
    ],
    correctAnswer: 2,
    explanation:
      'Block loading is applying large loads instantly, causing voltage and frequency transients as the generator struggles to respond. Load should be applied in steps to allow recovery between each step.',
  },
];

const faqs = [
  {
    question: 'How do I size a UPS system?',
    answer:
      'Calculate total critical load in VA (or kW with power factor). Add 20-25% margin for future growth and to avoid running at 100% capacity. For kW loads, divide by typical power factor (0.8-0.9) to get VA. Determine required autonomy time and specify battery capacity accordingly.',
  },
  {
    question: 'When is a rotary UPS preferred over static UPS?',
    answer:
      "Rotary UPS uses a flywheel for short-term energy storage. It's preferred for large loads (500kVA+), when long battery life is problematic (temperature extremes), or when high inrush currents are expected. Rotary UPS has lower losses for continuous operation but shorter ride-through time.",
  },
  {
    question: 'How do UPS and generator systems work together?',
    answer:
      'The UPS provides instant backup when mains fails. During UPS autonomy time, the generator starts and stabilises. Once generator output is acceptable, the UPS transfers input to generator supply and recharges batteries. When mains returns and stabilises, load transfers back to mains.',
  },
  {
    question: 'What maintenance do UPS batteries require?',
    answer:
      'VRLA batteries need annual capacity testing, terminal torque checks, and visual inspection for swelling or leakage. Replace batteries every 3-5 years regardless of condition. Monitor float voltage and battery temperature continuously. Lithium-ion batteries require less maintenance but still need regular testing.',
  },
  {
    question: 'What is the difference between kW and kVA ratings for UPS?',
    answer:
      'kVA is apparent power (V × A), kW is real power (V × A × power factor). UPS rated 10kVA at 0.9 power factor delivers maximum 9kW. Always check the kW rating matches your load. Modern UPS often have unity power factor (kVA = kW) but older units typically 0.8-0.9.',
  },
];

const HNCModule4Section5_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 4"
            title="UPS and Standby Power"
            description="Ensuring continuous power supply for critical building systems."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Understand UPS topologies and their applications',
              'Size UPS systems and battery capacity',
              'Design generator-UPS coordination',
              'Specify automatic transfer switch systems',
              'Apply redundancy principles for critical loads',
              'Plan maintenance requirements for standby systems',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'UPS topologies: offline (cheap, slow transfer), line-interactive (mid-range, voltage regulation), online double-conversion (zero transfer, full conditioning) — pick by load criticality.',
              'UPS conform to BS EN 50171 (in addition to BS EN [IEC] 62040 series) per Reg 560.6.12 when used as a recognised safety services source.',
              'Battery autonomy must cover generator start + stabilise + load step — typically 5–10 min for IT loads with a generator behind, 15+ min where no generator exists.',
              'ATS (automatic transfer switch) coordinates DNO ↔ generator transfer; UPS bridges the changeover. Set the ATS retransfer delay to avoid generator hunt.',
              'Redundancy: N+1 for important loads, 2N for critical (data centres, hospitals). Mirror the topology, not just the unit.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 560.6.1"
            clause="The following electrical sources for safety services are recognized: (a) primary batteries; (b) stationary secondary batteries; (c) other generating sets independent of the normal supply; (d) a separate feeder of the supply network that is effectively independent of the normal feeder."
            meaning={
              <>
                When a UPS is part of a safety service (emergency lighting, fire alarm, smoke
                control), it must be a recognised source under Reg 560.6.1 — typically option (b)
                stationary secondary batteries — and per Reg 560.6.12 must conform to BS EN 50171
                in addition to the BS EN [IEC] 62040 series. Standby UPS for general IT/business
                continuity sits outside Chapter 56, but the safety-services compliance check is
                always the designer’s call.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 560.6.1."
          />

          <SectionRule />

          <ConceptBlock title="UPS Types and Topologies">
            <p>
              UPS systems are classified by their topology, which determines transfer time,
              efficiency, and level of power conditioning. Understanding each type enables correct
              specification for different applications.
            </p>
            <p>
              <strong>UPS topology comparison (type / transfer time / efficiency / best for):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Offline (Standby) — 5-12ms — 95-98% — desktop PCs, basic protection</li>
              <li>Line-interactive — 2-4ms — 94-97% — servers, network equipment</li>
              <li>Online (Double-conversion) — 0ms — 90-96% — data centres, critical loads</li>
              <li>Rotary — 0ms — 95-97% — large industrial, motors</li>
            </ul>
            <p>
              <strong>Online UPS operation — in double-conversion mode:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rectifier converts AC mains to DC</li>
              <li>DC charges batteries and feeds inverter</li>
              <li>Inverter converts DC back to clean AC</li>
              <li>Load always receives inverter output</li>
              <li>On mains failure, batteries supply inverter — no interruption</li>
            </ul>
            <p>
              <strong>Application guide:</strong> Use online UPS for critical IT, medical and
              process loads. Line-interactive suits general commercial. Offline only for basic
              desktop protection.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Battery Sizing">
            <p>
              Battery capacity determines UPS autonomy time — how long the system can support the
              load without mains power. Correct sizing balances autonomy requirements against cost
              and space constraints.
            </p>
            <p>
              <strong>Battery sizing steps:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Determine load power (VA and kW)</li>
              <li>Define required autonomy time (minutes)</li>
              <li>Calculate energy required (kWh)</li>
              <li>Apply efficiency factor (typically 80-85%)</li>
              <li>Account for discharge rate (Peukert effect)</li>
              <li>Allow for battery ageing (20% capacity loss)</li>
            </ul>
            <p>
              <strong>Battery technologies (type / life years / cost / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>VRLA-AGM — 3-5 — low — most common, maintenance-free</li>
              <li>VRLA-Gel — 5-8 — medium — better temperature tolerance</li>
              <li>Lithium-ion — 10-15 — high — lighter, longer life, fast charge</li>
              <li>Flooded lead-acid — 15-20 — medium — requires maintenance, ventilation</li>
            </ul>
            <p>
              <strong>Temperature effects on battery life:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Battery life halves for every 10°C above 20°C</li>
              <li>Ideal temperature: 20-25°C</li>
              <li>Maximum: 35°C (with significant derating)</li>
              <li>Air conditioning often required for battery rooms</li>
            </ul>
            <p>
              <strong>Design rule:</strong> Specify battery capacity for end-of-life conditions (80%
              of new capacity) to ensure autonomy throughout service life.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Generator Coordination">
            <p>
              Standby generators provide extended backup beyond UPS battery capacity. Proper
              coordination between UPS and generator ensures seamless power continuity for critical
              loads.
            </p>
            <p>
              <strong>Generator-UPS sequence (time / event / power source):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>0s — mains failure detected — UPS battery</li>
              <li>0-3s — generator start signal — UPS battery</li>
              <li>10-15s — generator at rated speed — UPS battery</li>
              <li>15-20s — generator voltage/frequency stable — UPS battery</li>
              <li>20-30s — ATS transfers to generator — generator</li>
              <li>30s+ — UPS recharges batteries — generator</li>
            </ul>
            <p>
              <strong>Generator sizing for UPS:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Generator kW = UPS kW × 1.25 minimum</li>
              <li>Account for UPS input power factor</li>
              <li>Include battery recharging load</li>
              <li>Size for step load acceptance</li>
            </ul>
            <p>
              <strong>Compatibility requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Generator must accept UPS harmonic distortion</li>
              <li>Voltage regulation: ±10% typical</li>
              <li>Frequency tolerance: ±2Hz</li>
              <li>Synchronisation for parallel operation</li>
            </ul>
            <p>
              <strong>Coordination tip:</strong> Specify generator with electronic governor for
              stable frequency. Older mechanical governors may not meet UPS input requirements.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Automatic Transfer Systems">
            <p>
              Automatic Transfer Switches (ATS) manage the changeover between normal and standby
              power supplies. They are essential for coordinating mains, generator and UPS systems
              in resilient power architectures.
            </p>
            <p>
              <strong>ATS types (type / transfer time / application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Open transition — 100-500ms — standard commercial/industrial</li>
              <li>Closed transition — 0ms (overlap) — critical loads, no break required</li>
              <li>Soft load transfer — progressive — large motor loads</li>
              <li>Static transfer — &lt;4ms — data centres, IT loads</li>
            </ul>
            <p>
              <strong>ATS transfer sequence:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Monitor mains supply continuously</li>
              <li>Detect failure (under-voltage, over-voltage, frequency)</li>
              <li>Time delay (2-10s) to avoid nuisance transfers</li>
              <li>Signal generator to start</li>
              <li>Wait for generator to stabilise</li>
              <li>Transfer load to generator</li>
              <li>Monitor mains for return</li>
              <li>Retransfer after mains stable (adjustable delay)</li>
              <li>Generator cool-down and shutdown</li>
            </ul>
            <p>
              <strong>Closed transition:</strong> Requires synchronisation between sources. Used
              where any break is unacceptable, but more complex and costly.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — UPS sizing:</strong> Size UPS for server room with 30kW IT load
              requiring 15 minutes autonomy.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>IT load: 30kW</li>
              <li>Assume power factor 0.9</li>
              <li>UPS VA = 30kW ÷ 0.9 = 33.3kVA</li>
              <li>Add 20% margin: 33.3 × 1.2 = 40kVA</li>
              <li>
                Specification: <strong>40kVA online UPS</strong> with 15-minute battery autonomy
              </li>
            </ul>
            <p>
              <strong>Example 2 — battery capacity:</strong> Calculate battery Ah for 40kVA UPS, 15
              minutes, 384V DC bus.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Load = 40000VA × 0.9pf = 36kW</li>
              <li>Energy for 15 min = 36kW × 0.25h = 9kWh</li>
              <li>At 85% efficiency: 9 ÷ 0.85 = 10.6kWh</li>
              <li>Ah at 384V = 10600Wh ÷ 384V = 27.6Ah</li>
              <li>Apply 1.25 ageing factor: 27.6 × 1.25 = 34.5Ah</li>
              <li>
                Apply discharge rate factor ×2: <strong>69Ah minimum</strong>
              </li>
            </ul>
            <p>
              <strong>Example 3 — generator sizing:</strong> Size generator for 100kVA UPS with
              battery recharge requirement.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UPS input power = 100kVA at 0.9 input pf</li>
              <li>UPS input = 100 × 0.9 = 90kW</li>
              <li>Add UPS losses (10%): 90 × 1.1 = 99kW</li>
              <li>Add recharge current (10%): 99 × 1.1 = 109kW</li>
              <li>Generator derating (0.8 pf load): 109 ÷ 0.8 = 136kVA</li>
              <li>
                Specification: <strong>150kVA diesel generator</strong> — next standard size with
                margin
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Redundancy configurations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>N:</strong> No redundancy — single UPS for load
              </li>
              <li>
                <strong>N+1:</strong> One extra module — industry standard
              </li>
              <li>
                <strong>2N:</strong> Fully duplicated systems — data centres
              </li>
              <li>
                <strong>2(N+1):</strong> Maximum resilience — Tier 4 facilities
              </li>
            </ul>
            <p>
              <strong>Testing requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Monthly: UPS self-test, generator no-load run</li>
              <li>Quarterly: Generator load test (30 minutes minimum)</li>
              <li>Annual: Full transfer test, battery capacity test</li>
              <li>Document all tests and results</li>
            </ul>
            <p>
              <strong>Typical autonomy:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                With generator: <strong>5-15 minutes</strong>
              </li>
              <li>
                Without generator: <strong>30-60 minutes</strong>
              </li>
              <li>
                Extended: <strong>2-8 hours</strong>
              </li>
              <li>Size for end-of-life capacity</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common design errors"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Undersized generator</strong> — must handle UPS input plus recharge
                </li>
                <li>
                  <strong>No battery room cooling</strong> — shortens battery life dramatically
                </li>
                <li>
                  <strong>Block loading generator</strong> — causes transients and trips
                </li>
                <li>
                  <strong>Insufficient autonomy</strong> — generator needs time to start
                </li>
              </ul>
            }
            doInstead="Size the generator including UPS losses and battery recharge load, condition the battery room to 20-25°C, apply load in steps (or use soft-load transfer), and set UPS autonomy that genuinely covers generator start-and-stabilise time with margin."
          />

          <SectionRule />

          <Scenario
            title="80 kVA UPS + 200 kVA generator on a small data hall"
            situation={
              <>
                A 60 kW IT load in a small server room needs N+1 UPS resilience and full generator
                backup. Critical load 60 kW @ 0.95 PF, mechanical cooling 25 kW (also critical
                during outage), small power 8 kW. Site has a single DNO supply. Battery room can
                hold ~1,000 kg of VRLA cells. You’re sizing UPS, generator and ATS for the design
                review.
              </>
            }
            whatToDo={
              <>
                UPS: online double-conversion, modular 2× 80 kVA in N+1 (one carries full load,
                second is redundant). Battery autonomy: generator typically starts and accepts
                load in 30 s, but allow 5 min for resilience and to ride through brief faults
                without runtime depletion. Generator: critical 85 kW + cooling 25 kW + small
                power 8 kW = 118 kW; add UPS recharge load (≈ 25 % of UPS rating ≈ 40 kW for
                first 30 min) and 25 % engineering margin → 200 kVA prime-rated set. ATS:
                4-pole, mechanically interlocked, with adjustable retransfer delay (typically 5
                min) to stop the generator hunting if the DNO supply is unstable. Spec the UPS to
                BS EN [IEC] 62040 (plus BS EN 50171 if any safety load is hung off it). Battery
                room conditioned to 20–25 °C — VRLA life halves for every 10 °C above 25.
                Step-load test the generator at commissioning. All this lands on the load
                schedule with a clear ATS sequence-of-operation diagram in the O&amp;M.
              </>
            }
            whyItMatters={
              <>
                Most outages aren’t loss of supply — they’re an underspecified ATS that hunts on a
                noisy DNO, or a generator that can’t carry UPS recharge load and trips on
                overload at the worst moment. Coordination is the deliverable, not the kit.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'UPS topology choice: online double-conversion is the default for IT and critical loads; line-interactive for mid-range; offline for non-critical only.',
              'When a UPS supplies a safety service, it must be a recognised source under Reg 560.6.1 and conform to BS EN 50171 (Reg 560.6.12) in addition to BS EN [IEC] 62040.',
              'Battery autonomy = generator start + stabilise + load step + safety margin. 5–10 min typical with a generator; 15+ min stand-alone.',
              'Generator sizing: critical load + cooling + UPS recharge + engineering margin. Don’t forget the recharge load — it’s 20–25 % of UPS rating in the first half hour.',
              'ATS: 4-pole, mechanically interlocked, retransfer delay tuned to prevent hunting on noisy DNO supplies.',
              'Redundancy: N+1 for important, 2N for critical. Mirror the whole topology (UPS + battery + ATS), not just one unit.',
              'Battery room thermal conditioning is non-negotiable — VRLA life halves every 10 °C above 25 °C.',
              'Step-load test the generator at commissioning; thermographic scan the UPS bypass and ATS at handover.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Busbar systems
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Power quality
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section5_4;
