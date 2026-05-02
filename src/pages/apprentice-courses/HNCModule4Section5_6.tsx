/**
 * Module 4 · Section 5 · Subsection 6 — Metering and Monitoring
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   MID-approved fiscal metering, Building Regulations Part L sub-metering for end-use
 *   categories, multi-function power meters, BMS integration via Modbus / BACnet and
 *   energy management system architecture for non-domestic buildings >1000m².
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

const TITLE = 'Metering and Monitoring - HNC Module 4 Section 5.6';
const DESCRIPTION =
  'Master metering and monitoring for building services: fiscal metering, sub-metering for Part L compliance, energy management systems, power monitoring and BMS integration.';

const quickCheckQuestions = [
  {
    id: 'fiscal-meter',
    question: 'What is the primary purpose of fiscal metering?',
    options: [
      'To monitor power quality',
      'For billing and revenue purposes',
      'To control equipment',
      'For load shedding',
    ],
    correctIndex: 1,
    explanation:
      'Fiscal meters are used for billing purposes - they are sealed, calibrated to legal standards and owned/read by the energy supplier for revenue collection.',
  },
  {
    id: 'part-l',
    question: 'What does Building Regulations Part L require regarding sub-metering?',
    options: [
      'Sub-metering is optional',
      'Metering of end-use categories in buildings >1000m²',
      'Only main meters needed',
      'Metering only for residential',
    ],
    correctIndex: 1,
    explanation:
      'Part L requires sub-metering to enable energy consumption to be attributed to end-use categories (lighting, heating, cooling, small power etc.) in buildings over 1000m².',
  },
  {
    id: 'ct-ratio',
    question:
      'A meter uses 200/5A current transformers. What is the multiplying factor for meter readings?',
    options: ['5', '40', '200', '1000'],
    correctIndex: 1,
    explanation:
      'The CT ratio is 200:5 = 40. The meter sees 5A when 200A flows, so readings must be multiplied by 40 (or the meter automatically compensates).',
  },
  {
    id: 'bms-protocol',
    question: 'Which protocol is commonly used for BMS integration with power meters?',
    options: ['HTTP only', 'Modbus or BACnet', 'Bluetooth', 'USB'],
    correctIndex: 1,
    explanation:
      'Modbus (RS-485 or TCP/IP) and BACnet are the most common protocols for integrating power meters with Building Management Systems, allowing automated data collection and control.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the difference between MID and non-MID meters?',
    options: [
      'MID meters are larger',
      'MID meters are approved for fiscal/billing purposes',
      'Non-MID meters are more accurate',
      'There is no difference',
    ],
    correctAnswer: 1,
    explanation:
      'MID (Measuring Instruments Directive) approved meters meet legal requirements for billing and fiscal purposes. Non-MID meters are suitable for monitoring and internal cost allocation but not for billing.',
  },
  {
    id: 2,
    question: 'What end-use categories does Part L typically require to be sub-metered?',
    options: [
      'Only lighting',
      'Heating, cooling, fans, lighting, small power, and other significant loads',
      'Only heating and cooling',
      'Only electrical loads',
    ],
    correctAnswer: 1,
    explanation:
      'Part L requires metering of heating, cooling, auxiliary services (fans, pumps), lighting, small power, and any other significant energy uses to enable energy monitoring and management.',
  },
  {
    id: 3,
    question: 'What is a CT (Current Transformer) used for in metering?',
    options: [
      'To increase voltage',
      'To reduce high currents to measurable levels for meters',
      'To provide backup power',
      'To correct power factor',
    ],
    correctAnswer: 1,
    explanation:
      'CTs reduce high load currents (e.g., 400A) to low values (typically 1A or 5A) that the meter can safely measure. The meter then applies the CT ratio to calculate actual current.',
  },
  {
    id: 4,
    question: 'What is demand monitoring used for?',
    options: [
      'Measuring total energy consumption only',
      'Tracking peak power demand to manage electricity costs and capacity',
      'Monitoring voltage only',
      'Controlling lighting',
    ],
    correctAnswer: 1,
    explanation:
      'Demand monitoring tracks peak power demand (kW or kVA), which is important because maximum demand charges can form a significant part of commercial electricity bills. It also helps identify capacity constraints.',
  },
  {
    id: 5,
    question: 'What data communication standard is commonly used for power meters?',
    options: ['WiFi only', 'Modbus RTU/TCP', 'Analogue signals only', 'No communication available'],
    correctAnswer: 1,
    explanation:
      'Modbus RTU (serial RS-485) and Modbus TCP (Ethernet) are widely used standards for meter communication. They allow meters to send data to energy management systems, BMS and building analytics platforms.',
  },
  {
    id: 6,
    question: 'What is pulse output from a meter typically used for?',
    options: [
      'Providing mains power',
      'Sending consumption data to BMS or external counters',
      'Controlling protective devices',
      'Measuring voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Pulse output provides a digital signal (typically one pulse per kWh) that can be counted by BMS, data loggers or utility systems to record energy consumption without complex communication protocols.',
  },
  {
    id: 7,
    question: 'What is the purpose of power quality monitoring?',
    options: [
      'To measure energy consumption only',
      'To identify voltage disturbances, harmonics and other quality issues',
      'To control equipment',
      'To generate electricity',
    ],
    correctAnswer: 1,
    explanation:
      'Power quality monitors record voltage variations, dips, swells, harmonics, flicker and other disturbances. This data helps diagnose equipment problems, identify disturbance sources and verify supply quality.',
  },
  {
    id: 8,
    question: 'What is automatic meter reading (AMR)?',
    options: [
      'Manual reading of meters',
      'Remote collection of meter data without site visits',
      'Resetting meters automatically',
      'Generating meter reports',
    ],
    correctAnswer: 1,
    explanation:
      'AMR systems collect meter readings remotely via communication networks (GSM, Ethernet, radio). This eliminates manual reading visits, provides more frequent data and enables near real-time monitoring.',
  },
  {
    id: 9,
    question: 'What is the advantage of multi-function power meters over simple kWh meters?',
    options: [
      'Lower cost only',
      'Measure multiple parameters: V, I, kW, kVA, kVAr, PF, harmonics',
      'Simpler installation',
      'No communication needed',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-function meters measure voltage, current, power (real, apparent, reactive), power factor, frequency, harmonics and more. This comprehensive data supports energy management and power quality analysis.',
  },
  {
    id: 10,
    question: 'What is load profiling in energy monitoring?',
    options: [
      'Measuring cable size',
      'Recording energy consumption patterns over time',
      'Determining motor specifications',
      'Designing electrical layouts',
    ],
    correctAnswer: 1,
    explanation:
      'Load profiling records consumption at regular intervals (e.g., half-hourly) to reveal usage patterns, peak demand times and opportunities for load shifting or energy efficiency improvements.',
  },
];

const faqs = [
  {
    question: 'What is the difference between fiscal and check metering?',
    answer:
      "Fiscal meters are used for billing and must meet legal accuracy standards (MID approved). They're typically owned by the energy supplier or installed to their specification. Check meters are for internal monitoring, cost allocation between departments/tenants, or verifying fiscal meter accuracy. They don't need MID approval but should still be accurate.",
  },
  {
    question: 'How many sub-meters are typically needed for Part L compliance?',
    answer:
      'Part L requires metering of each major end-use: lighting, small power/sockets, heating, cooling, ventilation/fans, and any other loads exceeding 10% of total. For large buildings this typically means 5-10+ sub-meters minimum, plus additional meters for tenant billing or detailed analysis.',
  },
  {
    question: 'What CT ratio should I specify for a 400A circuit?',
    answer:
      "For 400A circuits, common CT ratios are 400/5A or 500/5A. 400/5A is more accurate at full load but won't handle overloads. 500/5A gives headroom for load growth. Always specify CTs that can handle the maximum expected current including diversity.",
  },
  {
    question: 'How do I integrate meters with a BMS?',
    answer:
      'Most modern meters offer Modbus RTU (RS-485) or Modbus TCP (Ethernet) communication. Define the required data points (kWh, kW, power factor, etc.), obtain register maps from meter manufacturer, and configure the BMS to poll meter data at appropriate intervals (typically 1-15 minutes for trending).',
  },
  {
    question: 'What is half-hourly (HH) metering and when is it required?',
    answer:
      'Half-hourly metering records consumption in 30-minute intervals, required by settlement regulations for supplies over 100kW (Profile Class 5-8) in the UK. It enables time-of-use tariffs and more accurate billing. Smaller supplies may benefit from voluntary HH metering for better demand management.',
  },
];

const HNCModule4Section5_6 = () => {
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
            eyebrow="Module 4 · Section 5 · Subsection 6"
            title="Metering and Monitoring"
            description="Enabling energy management through comprehensive measurement and analysis."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Understand fiscal metering requirements and standards',
              'Design sub-metering systems for Part L compliance',
              'Specify current transformers and meter installations',
              'Configure energy management and monitoring systems',
              'Integrate meters with BMS using standard protocols',
              'Analyse load profiles and demand patterns',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Fiscal metering: MID-approved (Class 1 or better), DCC-compliant for half-hourly settlement &gt; 100 kVA, sealed by the supplier — your design defines the location, not the meter itself.',
              'Sub-metering for Part L 2021: every end-use (lighting, small power, HVAC) plus tenanted floors. ≥ 90 % of consumption must be sub-metered.',
              'CT-operated meters: x/5 A or x/1 A secondaries. NEVER open-circuit a CT secondary on an energised primary — short the secondary before disconnecting the meter.',
              'BMS integration: Modbus RTU (RS-485) for floor-level meters, Modbus TCP/IP or BACnet/IP for head-end. Tag points clearly in the BMS schedule.',
              'Reg 132.16 binds the metering scope: any addition or alteration must verify that the existing supply, earthing and bonding remain adequate. Don’t bolt a new sub-meter chain onto an undersized incomer.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 132.16"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
            meaning={
              <>
                Sub-metering retrofits are exactly the “additions and alterations” Reg 132.16 was
                written for. Cutting CTs into live busbars or adding meter PSU loads to a
                fully-loaded sub-main without re-checking the assembly’s rating, fault level and
                earthing arrangement is precisely what 132.16 forbids. The HNC designer’s sign-off
                is the gatekeeper — verify before installation, document the check on the
                Variation/Minor Works certificate.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 132.16."
          />

          <SectionRule />

          <ConceptBlock title="Fiscal Metering">
            <p>
              Fiscal metering provides the legal basis for billing electricity consumption. These
              meters must meet stringent accuracy standards and are typically owned or specified by
              the energy supplier.
            </p>
            <p>
              <strong>Fiscal meter requirements (requirement / standard / notes):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Accuracy class — Class B (1%) typical — MID 2014/32/EU</li>
              <li>Certification — MID approved — CE + M marking</li>
              <li>Sealing — tamper-evident — supplier seals meter</li>
              <li>CT accuracy — Class 0.5 or better — must match meter class</li>
              <li>Communication — AMR capability — remote reading</li>
            </ul>
            <p>
              <strong>Supply profile classes in the UK:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Profile 1-4:</strong> Domestic and small business, monthly reading
              </li>
              <li>
                <strong>Profile 5-8:</strong> Medium demand, mandatory half-hourly metering
              </li>
              <li>
                <strong>Profile 00:</strong> Large users &gt;100kW, half-hourly settlement
              </li>
            </ul>
            <p>
              <strong>Design note:</strong> Coordinate meter specification with the energy supplier
              early in the project. They will specify meter type, CT requirements and communication
              needs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Sub-Metering for Part L">
            <p>
              Building Regulations Part L requires energy metering in non-domestic buildings over
              1000m² to enable monitoring and encourage efficient operation. The metering strategy
              should enable energy use to be attributed to different end uses.
            </p>
            <p>
              <strong>Part L end-use categories (category / typical loads / metering approach):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Heating — boilers, heat pumps, electric heating — kWh electricity, heat meters
              </li>
              <li>Cooling — chillers, DX units, VRF — kWh electricity</li>
              <li>Ventilation — AHUs, extract fans, FCUs — kWh electricity</li>
              <li>Lighting — general, emergency, external — kWh electricity per zone</li>
              <li>Small power — socket outlets, IT equipment — kWh electricity</li>
              <li>Other (&gt;10%) — lifts, kitchens, data centres — separate metering required</li>
            </ul>
            <p>
              <strong>Metering strategy principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>90% of estimated energy use should be directly metered</li>
              <li>Enable attribution to each major end-use category</li>
              <li>Allow tenant billing where multiple occupants</li>
              <li>Support automatic meter reading (AMR)</li>
              <li>Enable performance monitoring against design predictions</li>
            </ul>
            <p>
              <strong>BREEAM note:</strong> BREEAM credits require more comprehensive metering.
              Plan metering strategy early to achieve both Part L compliance and BREEAM requirements
              efficiently.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Energy Management Systems">
            <p>
              Energy management systems (EMS) collect, store and analyse metering data to support
              efficient building operation. Modern systems provide real-time dashboards, automated
              reporting and integration with building controls.
            </p>
            <p>
              <strong>EMS functionality (function / description / benefit):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Data collection — automatic meter polling — continuous monitoring</li>
              <li>Load profiling — time-based consumption patterns — identify efficiency opportunities</li>
              <li>Demand monitoring — peak demand tracking — cost management</li>
              <li>Alerting — anomaly detection — early problem identification</li>
              <li>Reporting — automated reports — compliance, management info</li>
              <li>Benchmarking — compare against targets/peers — performance assessment</li>
            </ul>
            <p>
              <strong>Key performance indicators:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>kWh/m² (energy use intensity)</li>
              <li>kW peak demand</li>
              <li>Power factor</li>
              <li>Carbon intensity (kgCO2/m²)</li>
            </ul>
            <p>
              <strong>Typical data intervals:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main meters: 15-30 minute intervals</li>
              <li>Sub-meters: 15-60 minute intervals</li>
              <li>Power quality: 10-minute averages</li>
              <li>Events: Real-time capture</li>
            </ul>
            <p>
              <strong>Data storage:</strong> Plan for 2-3 years minimum data retention. Cloud-based
              systems simplify storage and access; on-premise systems suit security-sensitive
              facilities.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Power Monitoring and BMS Integration">
            <p>
              Modern power meters provide extensive data beyond simple kWh measurement. Integration
              with BMS enables coordinated energy management and automated responses to demand or
              power quality events.
            </p>
            <p>
              <strong>Multi-function meter parameters (parameter / unit / use):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage (per phase) — V — supply quality monitoring</li>
              <li>Current (per phase) — A — load monitoring, balance</li>
              <li>Real power — kW — demand, billing</li>
              <li>Apparent power — kVA — transformer loading</li>
              <li>Reactive power — kVAr — PFC sizing</li>
              <li>Power factor — — efficiency, charges</li>
              <li>THD (V and I) — % — harmonic analysis</li>
              <li>Energy — kWh, kVArh — consumption, billing</li>
            </ul>
            <p>
              <strong>Communication protocols:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Modbus RTU:</strong> RS-485 serial, up to 32 devices, simple
              </li>
              <li>
                <strong>Modbus TCP:</strong> Ethernet, unlimited devices, faster
              </li>
              <li>
                <strong>BACnet IP:</strong> Native BMS protocol, interoperable
              </li>
              <li>
                <strong>M-Bus:</strong> Common for heat/water meters
              </li>
              <li>
                <strong>Pulse output:</strong> Simple kWh counting, 1 pulse/kWh typical
              </li>
            </ul>
            <p>
              <strong>Integration tip:</strong> Define the data points needed before specifying
              meters. Ensure communication capability matches BMS requirements and specify register
              maps early.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — sub-metering strategy:</strong> Design sub-metering for 3000m²
              office building.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Part L requirements for &gt;1000m² building</li>
              <li>Lighting DB (general lighting) — 1 meter</li>
              <li>Small power DB (sockets) — 1 meter</li>
              <li>HVAC panel (heating/cooling) — 1 meter</li>
              <li>Mechanical ventilation — 1 meter</li>
              <li>Server room (if &gt;10% load) — 1 meter</li>
              <li>External lighting — 1 meter</li>
              <li>
                Minimum: <strong>6 sub-meters</strong> plus main fiscal meter
              </li>
            </ul>
            <p>
              <strong>Example 2 — CT selection:</strong> Specify CTs for 800A main switchboard
              meter.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Main incomer rating: 800A</li>
              <li>Maximum expected load: 650A (80% utilisation)</li>
              <li>Primary must exceed max load; allow for overload and future growth</li>
              <li>Standard secondary: 5A (most meters)</li>
              <li>Option 1: 800/5A CT (ratio 160)</li>
              <li>Option 2: 1000/5A CT (ratio 200)</li>
              <li>
                Recommendation: <strong>1000/5A Class 0.5</strong> — allows 25% growth margin
              </li>
            </ul>
            <p>
              <strong>Example 3 — BMS integration:</strong> Integrate 10 power meters with BMS via
              Modbus.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Meters: 10 × multi-function meters</li>
              <li>Protocol: Modbus RTU (RS-485)</li>
              <li>Max 32 devices per RS-485 bus</li>
              <li>Max cable length: 1200m (with termination)</li>
              <li>Baud rate: 9600 or 19200</li>
              <li>
                Data points per meter: 3× voltage, 3× current, 3× power, PF, frequency, kWh, kVArh,
                THD (optional)
              </li>
              <li>Poll interval: 15 seconds typical; total registers: ~200 per meter</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Meter installation best practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Install CTs on correct phases (match voltage connections)</li>
              <li>Ensure CT direction arrow points toward load</li>
              <li>Keep CT secondary circuits short-circuit protected</li>
              <li>Label all CTs with associated meter reference</li>
              <li>Provide local meter indication where practical</li>
            </ul>
            <p>
              <strong>Data management:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Establish naming conventions for meters</li>
              <li>Document CT ratios in maintenance manuals</li>
              <li>Regular data validation checks</li>
              <li>Backup data regularly</li>
              <li>Calibration records for fiscal meters</li>
            </ul>
            <p>
              <strong>Quick reference — meter types:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fiscal:</strong> MID approved, billing
              </li>
              <li>
                <strong>Check:</strong> Internal monitoring
              </li>
              <li>
                <strong>Multi-function:</strong> V, I, P, PF, kWh
              </li>
              <li>
                <strong>Power quality:</strong> THD, events
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common metering errors"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Wrong CT ratio</strong> — readings scaled incorrectly
                </li>
                <li>
                  <strong>Reversed CT</strong> — negative readings or power flow
                </li>
                <li>
                  <strong>Phase mismatch</strong> — V and I on different phases
                </li>
                <li>
                  <strong>Open CT secondary</strong> — dangerous voltage, meter damage
                </li>
              </ul>
            }
            doInstead="Document the correct CT ratio at install and check it programmed in the meter, fit CTs the right way (arrow toward the load), match voltage and current inputs to the same phase, and never open-circuit a CT secondary while the primary is energised — short-circuit it before disconnecting the meter."
          />

          <SectionRule />

          <Scenario
            title="Sub-metering retrofit on a tenanted office — ticking Part L without breaking the supply"
            situation={
              <>
                Existing 1990s 4-storey office, fiscal meter at landlord cut-out, tenants
                separately billed by service charge. Client wants Part L 2021 / BREEAM In-Use
                sub-metering retrofitted: per-floor, per-end-use (lighting, small power, HVAC).
                You’ve been asked to scope and design.
              </>
            }
            whatToDo={
              <>
                Survey first. Read the existing sub-main loadings and confirm the riser
                conductors and the main switchboard busbar rating are not at their limit. Apply
                Reg 132.16 — adding 30 split-core CTs and meter PSUs is a non-trivial alteration:
                each meter PSU draws ~15 W but the CTs require live access for fitting. Strategy:
                shutdown windows per floor, use split-core CTs (no busbar drop-out needed), x/5 A
                secondaries to MID Class 1 meters, Modbus RTU on a daisy-chained RS-485 segment
                up to a floor gateway, then Modbus TCP/IP back to the BMS head-end. 16 mm² spare
                way for meter PSU per board. Document the safe-isolation method statement
                (EAWR Reg 4 territory — see SOUL/EAWR — “prove dead” is mandatory). Issue a Minor
                Works Certificate per board with the Reg 132.16 “addition adequate” verification
                completed and recorded.
              </>
            }
            whyItMatters={
              <>
                Sub-metering looks like “bolt-on tech”. It isn’t. Live busbar work, CT polarity
                errors, undersized PSU circuits and missing 132.16 verification are how this
                turns into a fire or a failed Part L sign-off. The design is half BS 7671, half
                BMS comms.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Fiscal metering is supplier territory — the designer’s job is location, access, AMR readiness and DCC interface.',
              'Sub-metering for Part L 2021: ≥ 90 % of consumption, split by end-use (lighting, small power, HVAC) + by tenant.',
              'MID Class 1 or better for fiscal billing; Class 0.5S for performance monitoring on critical loads.',
              'CT installation safety: short the secondary before disconnecting an energised primary — open CT secondaries develop dangerous voltages.',
              'BMS protocols: Modbus RTU (RS-485) downstream, Modbus TCP/IP or BACnet/IP for head-end — pick one and tag the BMS schedule cleanly.',
              'Document CT ratios, meter ID, channel mapping and BMS tag in the M&amp;V plan — saves weeks of commissioning.',
              'Reg 132.16 is THE retrofit governance regulation — verify supply/earthing/bonding adequacy before adding meter loads.',
              'Each board with new sub-metering carries its own Minor Works Certificate showing the 132.16 verification.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power quality
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Specification and documentation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section5_6;
