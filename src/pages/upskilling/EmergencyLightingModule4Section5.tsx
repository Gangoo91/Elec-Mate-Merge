import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm4-s5-dali',
    question:
      'Modern self-test emergency luminaires typically communicate via DALI Type 1 / DALI-2 with edition 2 emergency commands. What does this protocol enable?',
    options: [
      'Lower power consumption from the luminaire drivers as a side-effect of digital control.',
      'A cheaper installation, because the 2-wire bus replaces all the mains wiring to each fitting.',
      'Per-luminaire addressing and status reporting on the bus, with individual test commands.',
      'Brighter lamp output, because the digital driver runs the LEDs harder than an analogue one.',
    ],
    correctIndex: 2,
    explanation:
      'DALI Type 1 / DALI-2 with edition 2 emergency commands gives per-luminaire addressing and status reporting. Each luminaire has a unique short address (0-63 per channel), so the gateway polls it for battery state, lamp state, last-test result and fault flags, triggers individual or group tests, and reads back results. The gateway aggregates the per-luminaire data into a system-wide view for local display, BMS, or cloud — the foundation for automated test scheduling and exception-based maintenance.',
  },
  {
    id: 'elm4-s5-newschedule',
    question:
      'BS 5266-1:2025 introduces a 5-year photometric verification IN ADDITION to the traditional monthly + annual schedule. What does the photometric check audit?',
    options: [
      'The standby battery voltage at the start and end of the discharge cycle.',
      'Whether the luminaire still delivers the BS EN 1838 illuminance (lux) on the escape route.',
      'The conductor resistance of the emergency final circuits against their installed values.',
      'Whether the housing and diffuser are clean and undamaged on a visual walk-round only.',
    ],
    correctIndex: 1,
    explanation:
      'The 5-year photometric is NEW in 2025. Battery sizing assumes rated lumen output throughout duration, but over years lamp output declines (lumen depreciation), so delivered lux on the floor can fall below the BS EN 1838 minimum (1 lx escape route, higher for open and high-risk areas) even while the duration test still passes — the luminaire is still on. The check measures actual delivered illuminance with a calibrated lux meter at the design points; failure triggers lamp or luminaire replacement regardless of the duration result. It is the outcome verification of BS EN 1838 design lux at end-of-life.',
  },
  {
    id: 'elm4-s5-paper',
    question:
      'A self-test emergency lighting system automatically runs the monthly functional test and annual 3-hour duration test, and uploads results to a cloud monitoring service. Is the paper logbook still required?',
    options: [
      'No — the cloud-held automated test records satisfy the record-keeping requirement on their own.',
      'Yes — the duty-holder must still keep a reviewed, signed logbook as the audit trail.',
      'Only when the monitoring system is offline and cannot upload its own records to the cloud.',
      'Only the fire-alarm system needs a logbook; emergency lighting is covered by the cloud data.',
    ],
    correctIndex: 1,
    explanation:
      "Logbook (paper or electronic) is still required. BS EN 50172:2024 and BS 5266-1:2025 expect the duty-holder to maintain an auditable record of test results, faults, corrective actions and modifications, retained for the operational life of the installation. The automated system provides the data; the logbook is the duty-holder's reviewed, signed audit trail. An auditor or investigator examines the logbook first — test history, fault response, modifications — and only then drills into the underlying data. Without it the audit trail is incomplete even if the system holds everything.",
  },
  {
    id: 'elm4-s5-cyber',
    question:
      "An IP-connected emergency lighting monitoring system sits on the same network as the building's general IT. What cyber-security consideration applies?",
    options: [
      'None — emergency lighting is a building service, so it is outside the scope of cyber risk.',
      'It is a safety-critical asset and needs the same cyber hygiene as any life-safety system.',
      'A risk only where the gateway link is wireless; a wired IP connection carries no exposure.',
      'Cyber security is purely an IT-department matter and does not extend to lighting controllers.',
    ],
    correctIndex: 1,
    explanation:
      'IP-connected life-safety systems are potential cyber targets. BS 5839-1:2025 raised this for fire alarms and the same logic applies by analogy: an attacker could suppress fault notifications, inject false test results, DoS the gateway during a real event, or use it as a foothold to other safety systems. Mitigations: network segmentation (own VLAN), strong authentication on gateway access, regular firmware updates, access-log monitoring and tracking vendor security advisories — treating the controller as a safety-critical asset.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the dominant digital communication protocol for modern emergency lighting self-test luminaires?',
    options: [
      'DALI Type 1 / DALI-2 with edition 2 emergency commands on a 2-wire addressable bus.',
      'KNX, the building-automation bus that carries per-luminaire emergency test commands as standard.',
      'Modbus RTU, polling each luminaire as a register-mapped slave on an RS-485 bus.',
      'Analogue 0-10 V dimming control, with the dim level encoding the luminaire battery state.',
    ],
    correctAnswer: 0,
    explanation:
      'DALI Type 1 / DALI-2 with edition 2 emergency commands is the standard for digital emergency lighting: per-luminaire addressing, status reporting, group test commands and fault flagging, with the gateway polling each luminaire and aggregating a system-wide view. Wireless (BLE, Zigbee, proprietary RF) supplements DALI in retrofits where running a 2-wire bus is impractical, but DALI dominates wired installations.',
  },
  {
    id: 2,
    question:
      'BS 5266-1:2025 introduces a 5-year photometric check in addition to the traditional monthly functional and annual 3-hour duration tests. What does it verify?',
    options: [
      'That the standby battery still holds its rated terminal voltage at the start of the duration test.',
      'That the emergency lighting final circuits still meet their original insulation-resistance values.',
      'That the changeover time on mains failure is still within the 0.5 s required by BS EN 1838.',
      'That the luminaires still deliver the BS EN 1838 illuminance (lux) on the escape route.',
    ],
    correctAnswer: 3,
    explanation:
      'The 5-year photometric check is NEW in 2025. It audits delivered illuminance, not just whether the luminaire is on. Lumen depreciation can mean a luminaire passes duration (it stays on) but delivers less lux on the floor than required; the check measures actual delivered illuminance with a calibrated lux meter at the design points and compares against BS EN 1838 minimums, catching depreciation that duration testing misses.',
  },
  {
    id: 3,
    question:
      'A wireless emergency lighting monitoring system uses BLE (Bluetooth Low Energy) for luminaire-to-gateway communication. What is the typical advantage in retrofit applications?',
    options: [
      'It allows the luminaires to run at lower output and so extend battery autonomy.',
      'It gives higher-resolution lux reporting than a wired DALI bus can carry.',
      'No data bus cable to install — the luminaires talk to the gateway over the air.',
      'It removes the need for a separate mains supply to each luminaire.',
    ],
    correctAnswer: 2,
    explanation:
      'BLE / wireless removes the bus-cable cost in retrofits. Retrofit cost is dominated by installing the luminaires; running a DALI bus afterwards through finished ceilings is expensive, and BLE removes that cost. Trade-offs: range is limited (typically 10-30 m, more with mesh), 2.4 GHz interference / co-existence, a different security model from a wired bus, and a small but real radio battery drain. Suits small-to-medium retrofits; new-build typically uses DALI cabled into the build.',
  },
  {
    id: 4,
    question:
      'What is the role of a Building Management System (BMS) in emergency lighting monitoring?',
    options: [
      'It aggregates emergency lighting status alongside other building systems in one interface.',
      'The BMS drives the emergency luminaires directly, switching each one to battery on mains failure.',
      'The BMS replaces the central battery cabinet, supplying the luminaires from the building UPS.',
      'The BMS performs the monthly and annual tests itself, removing the need for a dedicated gateway.',
    ],
    correctAnswer: 0,
    explanation:
      'BMS = building-wide overlay. The emergency lighting gateway reports status (system OK, faults, test events, battery alarms) to the BMS via a standard protocol (BACnet, Modbus, REST API, MQTT); the BMS surfaces it alongside HVAC, fire alarm and security, sends fault alerts, and can auto-create work orders through the ticketing system. It does NOT replace the dedicated gateway, which runs the system — the BMS provides the operator-facing overlay above it.',
  },
  {
    id: 5,
    question: 'What is the role of automated self-test scheduling in modern emergency lighting?',
    options: [
      'It replaces the annual duration test, so only the automated monthly test is then needed.',
      'It runs all luminaires into a full duration test simultaneously each month to save time.',
      'It substitutes a calculated battery-life estimate for any physical discharge testing.',
      'It runs the monthly and annual tests per-luminaire on a planned, staggered calendar.',
    ],
    correctAnswer: 3,
    explanation:
      'Automated scheduling runs the monthly functional and annual duration tests on each luminaire without operator intervention. The schedule typically staggers duration tests across the building (e.g. 1/12th of luminaires per month) to avoid the whole system being off-duty on battery at once. Results are captured per-luminaire and uploaded to the gateway / BMS / cloud, failures are alarmed in real time, and the duty-holder reviews exception reports rather than running tests manually — substantial labour saving and better test quality, as every test runs on time and is recorded.',
  },
  {
    id: 6,
    question:
      'A duty-holder receives an automated email at 10 PM saying "Luminaire 04-12-08 failed monthly functional test — battery fault". What is the appropriate response?',
    options: [
      'Leave it until the next scheduled periodic inspection, since the system logged the fault itself.',
      'Reset the gateway to clear the alarm, on the basis that a single failed test is usually a glitch.',
      'Log it, raise a work order within the contract response time, and confirm rectified next visit.',
      'Disable the automated email alerts so the duty-holder is not disturbed out of hours.',
    ],
    correctAnswer: 2,
    explanation:
      "Automated detection is half the job; corrective action is the other half. Raise a work order for the contractor to attend within the maintenance-contract response time (typically 24-72 hours for a single-luminaire fault), confirm the fault rectified, and update the logbook. Faults left unresolved drift the system out of compliance — automated detection without prompt rectification is no better than no detection. Log → work order → attend → resolve → update logbook.",
  },
  {
    id: 7,
    question:
      'Why is a paper or electronic logbook still required even with full automated self-test and cloud monitoring?',
    options: [
      'It is the duty-holder\'s curated, reviewed and signed audit trail above the raw data.',
      'A logbook is only required where the system has no cloud monitoring to retain the data.',
      'A logbook is only required for fire-alarm systems, not for emergency lighting.',
      'The logbook is a legacy formality with no role once automated monitoring is in place.',
    ],
    correctAnswer: 0,
    explanation:
      "BS EN 50172:2024 / BS 5266-1:2025 expect the duty-holder to maintain an auditable record of test results, faults, corrective actions and modifications, retained for the operational life of the installation. The automated system provides the data; the logbook is the reviewed, signed record. An auditor or investigator examines the logbook first — test history, fault response, modifications — then drills into the underlying data only if needed. Without it the audit trail is incomplete even if the system holds everything. Both are required.",
  },
  {
    id: 8,
    question:
      'An IP-connected emergency lighting monitoring system sits on the building general LAN. What cyber-security control should be applied first?',
    options: [
      'Disable the building network entirely so the gateway cannot be reached from outside.',
      'Leave the manufacturer default admin password in place so support engineers can always access it.',
      'Treat cyber security as an IT-department matter only, with no controls on the lighting gateway.',
      'Network segmentation — put the gateway on its own VLAN with controlled access from the LAN.',
    ],
    correctAnswer: 3,
    explanation:
      'Network segmentation first — place the gateway on its own VLAN with controlled access from the general LAN (firewall rules, access control lists), combined with strong authentication, regular firmware updates, access-log monitoring and tracking vendor security advisories. The principle: the emergency lighting controller is a safety-critical asset that must not share the threat surface of user laptops and printers. BS 5839-1:2025 raised this for fire alarms; the same logic applies here.',
  },
  {
    id: 9,
    question:
      'A self-test luminaire reports "battery test complete — capacity 75% of rated". What is the duty-holder\'s decision criterion?',
    options: [
      'Replace the battery immediately on any reading below 100% of rated capacity.',
      'Ignore the reading, since the duration test is the only valid measure of battery health.',
      'Compare against the ~80% end-of-life threshold; 75% is below it, so plan replacement.',
      'Increase the lamp output to compensate for the reduced battery capacity.',
    ],
    correctAnswer: 2,
    explanation:
      'The design ageing factor (1.25 for SLA) corresponds to roughly 80% of rated capacity at end of design life. 75% is below that threshold, so the battery has degraded faster than the design assumption: plan replacement in the next maintenance cycle rather than waiting for the annual duration test, and track the trend across monthly tests to confirm. Repeated sub-threshold readings mean replace immediately, as the battery may not deliver full duration in a real event.',
  },
  {
    id: 10,
    question:
      'How does the 2025 5-year photometric check change the maintenance regime relative to the traditional functional + duration cycle?',
    options: [
      'It ADDS a 5-yearly photometric verification on top of the monthly and annual regime.',
      'It replaces the annual duration test, so the regime becomes monthly functional plus 5-yearly photometric.',
      'It is carried out monthly in place of the functional test, using a calibrated lux meter each time.',
      'It changes nothing in practice, because passing the duration test guarantees the design lux level.',
    ],
    correctAnswer: 0,
    explanation:
      'The 5-year photometric check ADDS to the existing regime: monthly functional, annual duration, and (NEW) 5-year photometric using a calibrated lux meter at the design points. It audits delivered illuminance against BS EN 1838 minimums, catching lumen depreciation that duration testing misses. Most luminaires pass at 5 years; aged ones (non-LED lamps or lower-quality drivers) may fail and trigger lamp or luminaire replacement. As at 2026 it is a manual lux-meter verification, though self-test electronics may eventually estimate delivered lux.',
  },
];

const EmergencyLightingModule4Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Remote testing and monitoring systems | Emergency Lighting Module 4.5 | Elec-Mate',
    description:
      'DALI Type 1 / DALI-2 emergency, BLE wireless, BMS integration, BS 5266-1:2025 5-year photometric check, automated self-test, cyber security for IP-connected systems.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5"
            title="Remote testing and monitoring systems"
            description="Modern emergency lighting is digitally addressable, automatically self-tested, and remotely monitored. DALI bus to gateway to BMS to cloud to logbook. Less manual labour, better data, exception-based maintenance — provided the system is properly designed, the cyber hygiene is in place, and the duty-holder still keeps a logbook (because automated detection without curated audit trail is incomplete)."
            tone="yellow"
          />

          <TLDR
            points={[
              'DALI Type 1 / DALI-2 with edition 2 emergency commands is the standard digital protocol for self-test emergency luminaires — per-luminaire addressing, status, test commands, fault reporting.',
              'Wireless monitoring (BLE, Zigbee, proprietary RF) suits retrofits where running a 2-wire bus is impractical. Range, interference, and security are the trade-offs.',
              'Building Management System (BMS) integration aggregates emergency lighting status alongside HVAC, fire alarm, security in a unified operator interface — BACnet, Modbus, REST, MQTT.',
              'Automated self-test scheduling runs monthly functional + annual 3-hour duration tests on each luminaire, staggered across the building. Results captured per-luminaire; duty-holder reviews exceptions.',
              'BS 5266-1:2025 NEW: 5-year photometric verification using calibrated lux meter at design points. Audits delivered illuminance vs BS EN 1838 minimums — catches lumen depreciation.',
              'Self-test reports: dates, results, faults, corrective actions, battery condition trends, photometric check outcomes. Captured per-luminaire and aggregated.',
              "Logbook (paper or electronic) is STILL required — automated data is input, logbook is the duty-holder's curated audit trail.",
              'Cyber security for IP-connected systems: network segmentation (own VLAN), strong authentication, firmware updates, log monitoring. Treat the gateway as a safety-critical asset.',
              'Closed-loop maintenance: detection → work order → attend → resolve → logbook update. Detection alone without rectification is no better than no detection.',
              'Touchpoint with BS 5839-1:2025 (fire alarms) cyber clause — same principles applied by analogy to emergency lighting monitoring.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the dominant digital protocols for emergency lighting (DALI Type 1, DALI-2 with edition 2 emergency commands) and explain per-luminaire addressing',
              'Identify wireless monitoring options (BLE, Zigbee, proprietary RF) and their trade-offs vs wired DALI',
              'Specify BMS integration via BACnet, Modbus, REST API, or MQTT and explain the role of the dedicated gateway',
              'Apply automated self-test scheduling — monthly functional, annual duration, staggered across the building, exception-based reporting',
              'Apply the BS 5266-1:2025 NEW 5-year photometric verification — calibrated lux meter, design points, BS EN 1838 minimums',
              'Plan a closed-loop maintenance regime: automated detection, work order, attendance, rectification, logbook update',
              'Maintain a duty-holder logbook (paper or electronic) as the curated audit trail above the automated data',
              'Apply cyber-security controls to IP-connected emergency lighting monitoring — network segmentation, authentication, updates, log monitoring',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>DALI and the digital emergency luminaire</ContentEyebrow>

          <ConceptBlock
            title="From dumb fittings to addressable assets"
            plainEnglish="Older self-contained emergency luminaires were standalone — each fitting tested itself, signalled status via a small LED on the body, and required manual inspection of every fitting to confirm it was working. Modern luminaires are addressable. Each fitting on a DALI bus has a unique address; the gateway can poll it, command tests on it, and read back results. The duty-holder no longer walks the building checking LEDs; they read a dashboard. The dashboard is fed by the gateway; the gateway talks DALI to the luminaires."
            onSite="Modern installations are increasingly digital. Knowing the protocols — DALI is the dominant one — and how the gateway aggregates status is essential for commissioning, fault-finding, and integration."
          >
            <p>The DALI architecture for emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>DALI bus.</strong> Two-wire (polarity-insensitive on most chips) low-voltage
                bus connecting the gateway to up to 64 devices per channel (more with multi-channel
                gateways). Topology is flexible — daisy-chain, star, or hybrid — within voltage-drop
                limits.
              </li>
              <li>
                <strong>Per-luminaire address.</strong> Each fitting on the bus has a short address
                (0-63) assigned during commissioning. The gateway uses the address to direct
                messages — "luminaire 12, run functional test" or "luminaire 47, report battery
                state".
              </li>
              <li>
                <strong>Edition 2 emergency commands.</strong> DALI-2 (the modern revision) added
                specific commands for emergency lighting: start functional test, start duration
                test, report test result, report fault flags (lamp fault, battery fault, charger
                fault, circuit fault). The protocol gives standardised access to all the data the
                luminaire tracks internally.
              </li>
              <li>
                <strong>Gateway / controller.</strong> The device that bridges DALI to higher-level
                protocols. Local display / dashboard. Often connects to BACnet / Modbus / REST API
                upstream for BMS integration. Schedules automated tests; aggregates results.
              </li>
              <li>
                <strong>Per-luminaire data.</strong> Test history, fault flags, battery condition
                trend, last functional test date, last duration test date, last duration test
                result. The gateway maintains the per-luminaire record and serves it to the BMS /
                cloud.
              </li>
            </ul>
            <p>
              The protocol turns each luminaire from a dumb fitting into an addressable asset.
              Status, test, fault — all available digitally without walking the building. The
              maintenance regime becomes data-driven: the gateway tells you which luminaires need
              attention; the contractor attends those specifically rather than a periodic inspection
              sweep of every fitting.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50172:2024 · Test and monitoring requirements"
            clause={
              <>
                Where automatic self-test devices are used, they shall provide records of the test
                results in a format suitable for retention as evidence of the testing performed. The
                test schedule shall include monthly functional verification and annual duration
                verification at the design autonomy. Records shall be available for review by the
                duty-holder and auditors. The use of automatic self-test does not remove the
                requirement for the duty-holder to maintain a logbook of test results, faults, and
                corrective actions.
              </>
            }
            meaning="Three load-bearing points. (1) Records 'in a format suitable for retention' — the data must be persistent and reviewable. (2) 'Monthly functional + annual duration' is the test schedule. (3) 'Does not remove the requirement for the duty-holder to maintain a logbook' — automated systems provide data; the duty-holder still maintains the audit-trail logbook."
          />

          <ConceptBlock
            title="Wireless alternatives — BLE, Zigbee, proprietary RF"
            plainEnglish="Wireless emergency lighting monitoring has emerged for retrofits where running a DALI bus is impractical. Each luminaire has a small radio (BLE, Zigbee, or proprietary RF in the 868 MHz / 2.4 GHz bands) and communicates with a gateway over the air. The functionality is similar to wired DALI — addressing, test commands, status — but delivered without bus cabling."
          >
            <p>Wireless trade-offs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>No bus cable.</strong> The dominant retrofit advantage. Luminaires are
                installed in finished ceilings without running a DALI cable through. Each fitting
                has its mains supply (PH30 fire-resistant) and the radio handles the data.
              </li>
              <li>
                <strong>Range and mesh.</strong> Single-hop range typically 10-30 m line-of-sight.
                Most modern systems use mesh networking — luminaires relay messages to extend range.
                A typical floor with 30 luminaires forms a self-organising mesh covering 1000+ m².
              </li>
              <li>
                <strong>Interference / co-existence.</strong> 2.4 GHz BLE / Zigbee shares spectrum
                with Wi-Fi, Bluetooth devices, microwave ovens. Properly designed systems use
                frequency hopping / channel hopping to mitigate; problems are rare but can occur in
                dense RF environments. 868 MHz proprietary protocols have less competition but are
                vendor-specific.
              </li>
              <li>
                <strong>Security.</strong> Wireless protocols use authenticated and encrypted links
                (BLE LE Secure Connections, Zigbee with link keys). The security model is different
                from wired bus where physical access is required. Network segmentation and gateway
                authentication still required.
              </li>
              <li>
                <strong>Power.</strong> The radio adds a small but non-zero standby current draw
                from the luminaire battery. Modern designs minimise this; the impact on autonomy
                duration is typically negligible but should be considered in battery sizing.
              </li>
              <li>
                <strong>Vendor lock-in.</strong> Proprietary RF protocols mean the luminaires are
                tied to that vendor's gateway. BLE and Zigbee are more open but compatibility is
                still limited in practice. Wired DALI is more vendor-neutral.
              </li>
            </ul>
            <p>
              Wireless suits small-to-medium retrofits and installations where flexibility matters.
              New-build and large installations typically still use wired DALI for cost and
              reliability. The choice is per-project; both are valid for BS EN 50172 compliance.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram: DALI bus → gateway → BMS → reports */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Remote testing data flow — luminaire → gateway → BMS / cloud → reports
            </h4>
            <svg
              viewBox="0 0 880 460"
              className="w-full h-auto"
              role="img"
              aria-label="Data flow from individual self-test luminaires on a DALI bus, through a gateway to BMS and cloud monitoring, producing reports for the duty-holder logbook."
            >
              <text x="440" y="28" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                Self-test → DALI gateway → BMS / cloud → reports → logbook
              </text>

              {/* Luminaires (left) */}
              <g>
                <rect
                  x="40"
                  y="60"
                  width="180"
                  height="280"
                  rx="12"
                  fill="rgba(34,197,94,0.05)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="130"
                  y="84"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Self-test luminaires
                </text>
                <text
                  x="130"
                  y="100"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  DALI Type 1 / DALI-2
                </text>

                {/* 5 luminaires */}
                <rect
                  x="60"
                  y="120"
                  width="140"
                  height="36"
                  rx="6"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text
                  x="130"
                  y="142"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9.5"
                >
                  Lum 1 · addr 1
                </text>
                <rect
                  x="60"
                  y="164"
                  width="140"
                  height="36"
                  rx="6"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text
                  x="130"
                  y="186"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9.5"
                >
                  Lum 2 · addr 2
                </text>
                <rect
                  x="60"
                  y="208"
                  width="140"
                  height="36"
                  rx="6"
                  fill="rgba(239,68,68,0.10)"
                  stroke="#EF4444"
                  strokeWidth="1.2"
                />
                <text
                  x="130"
                  y="230"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9.5"
                >
                  Lum 3 · addr 3 ⚠
                </text>
                <rect
                  x="60"
                  y="252"
                  width="140"
                  height="36"
                  rx="6"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text
                  x="130"
                  y="274"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9.5"
                >
                  Lum 4 · addr 4
                </text>
                <rect
                  x="60"
                  y="296"
                  width="140"
                  height="36"
                  rx="6"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.2"
                />
                <text
                  x="130"
                  y="318"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9.5"
                >
                  Lum N · addr N
                </text>
              </g>

              {/* DALI bus arrow */}
              <line x1="220" y1="200" x2="290" y2="200" stroke="#FBBF24" strokeWidth="2" />
              <polygon points="290,200 282,196 282,204" fill="#FBBF24" />
              <text
                x="255"
                y="190"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                DALI bus
              </text>
              <text x="255" y="216" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                2-wire
              </text>

              {/* Gateway */}
              <rect
                x="300"
                y="160"
                width="160"
                height="80"
                rx="10"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="380"
                y="184"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                DALI gateway
              </text>
              <text x="380" y="202" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Test scheduler
              </text>
              <text x="380" y="216" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Result aggregator
              </text>
              <text x="380" y="230" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Local dashboard
              </text>

              {/* Arrow to BMS */}
              <line x1="460" y1="200" x2="530" y2="200" stroke="#22D3EE" strokeWidth="2" />
              <polygon points="530,200 522,196 522,204" fill="#22D3EE" />
              <text
                x="495"
                y="190"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                BACnet / MQTT
              </text>

              {/* BMS / cloud */}
              <rect
                x="540"
                y="100"
                width="180"
                height="80"
                rx="10"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="630"
                y="124"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                BMS
              </text>
              <text x="630" y="142" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                HVAC + fire + EL + security
              </text>
              <text x="630" y="158" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Operator dashboard
              </text>

              <rect
                x="540"
                y="220"
                width="180"
                height="80"
                rx="10"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="630"
                y="244"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                Cloud monitoring
              </text>
              <text x="630" y="262" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Per-luminaire history
              </text>
              <text x="630" y="278" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Email / SMS alerts
              </text>

              <line
                x1="540"
                y1="200"
                x2="540"
                y2="240"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />

              {/* Reports / logbook */}
              <line
                x1="720"
                y1="160"
                x2="780"
                y2="160"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
              <polygon points="780,160 772,156 772,164" fill="rgba(255,255,255,0.5)" />
              <line
                x1="720"
                y1="260"
                x2="780"
                y2="260"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
              <polygon points="780,260 772,256 772,264" fill="rgba(255,255,255,0.5)" />

              <rect
                x="780"
                y="120"
                width="80"
                height="180"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="820"
                y="180"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Reports
              </text>
              <text x="820" y="200" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Monthly
              </text>
              <text x="820" y="216" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Annual
              </text>
              <text x="820" y="232" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                5-year
              </text>
              <text x="820" y="248" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Faults
              </text>

              {/* Logbook box */}
              <rect
                x="240"
                y="370"
                width="400"
                height="60"
                rx="10"
                fill="rgba(251,191,36,0.06)"
                stroke="#FBBF24"
                strokeWidth="1.4"
                strokeDasharray="6,3"
              />
              <text
                x="440"
                y="394"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Duty-holder logbook (paper or electronic)
              </text>
              <text x="440" y="412" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Reviewed and signed audit trail · retained for operational life of installation · BS
                EN 50172:2024
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Automated self-test scheduling</ContentEyebrow>

          <ConceptBlock
            title="Calendar-driven test runs"
            plainEnglish="Modern self-test gateways run the test schedule automatically. The duty-holder configures the schedule (typically the manufacturer's defaults are sensible: monthly functional test on a specific day, annual duration test on a specific date, staggered across the building); the gateway runs the tests and captures the results. The duty-holder reviews exception reports rather than running every test manually."
          >
            <p>What a typical automated schedule looks like:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Monthly functional test.</strong> Each luminaire is briefly switched to
                emergency mode (battery feed) for a defined interval — typically 10-30 seconds —
                long enough to confirm the lamp lights, the driver functions, and the battery is
                supplying current. Results captured per-luminaire: pass / fail / fault flag.
                Staggered across the day or week to avoid simultaneous emergency operation.
              </li>
              <li>
                <strong>Annual 3-hour duration test.</strong> Each luminaire run on battery for the
                rated autonomy duration (typically 3 hours). This is the load-bearing capacity test
                — the battery delivers full duration at rated output, or it does not. Staggered
                across the building (e.g. 1/12th of the luminaires per month, or all in one month
                with the building accepting the discharge state) to manage the system-wide capacity
                exposure.
              </li>
              <li>
                <strong>Result capture.</strong> Per-luminaire, per-test: timestamp, test type, pass
                / fail, fault flags (lamp / driver / battery / charger / circuit), capacity reading
                (Ah delivered or end-voltage at duration), and any anomaly notes. Stored on the
                gateway and pushed to BMS / cloud / reports.
              </li>
              <li>
                <strong>Exception reporting.</strong> Faults trigger immediate alerts (email, SMS,
                BMS alarm). Pass results accumulate in the historical record. The duty-holder reads
                the daily / weekly fault summary; pass results are confirmed at the periodic review
                rather than examined individually.
              </li>
              <li>
                <strong>5-year photometric (NEW 2025).</strong> The traditional functional +
                duration regime is supplemented by a 5-yearly photometric verification. Most current
                automated systems do not yet automate this — it remains a manual lux-meter
                measurement at design points. Future generations may estimate delivered lux from
                internal LED drive current and lumen depreciation models.
              </li>
            </ul>
            <p>
              Automated scheduling does not remove the duty-holder's responsibility — it changes the
              work pattern. Less manual testing; more reviewing of automated reports and attending
              to exceptions. The labour saving is substantial; the test quality improves (every test
              runs on time, every result captured, no missed inspections).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The 5-year photometric check — what is new in 2025"
            plainEnglish="BS 5266-1:2025 introduces a 5-year photometric verification on top of the existing monthly functional + annual duration tests. The reasoning: a luminaire can pass duration (it stays on for 3 hours) but deliver less lux on the floor than BS EN 1838 requires — because the lamp has aged. Lumen depreciation can drop a fitting from 100 lx initial to 50 lx after 5 years; if the design point on the escape route was 1 lx initial with a 50% depreciation allowance, the floor lux is now below requirement. The photometric check audits delivered lux at design points and catches this."
          >
            <p>The photometric check workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identify design points.</strong> The original BS 5266-1:2025 / BS EN 1838
                design specifies the points on the escape route, open area, and high-risk task areas
                where the design illuminance is to be delivered. The 5-year check measures at the
                same points.
              </li>
              <li>
                <strong>Use a calibrated lux meter.</strong> A professional-grade luminance meter,
                calibrated within the appropriate interval (typically 12-24 months). Photopic V(λ)
                response, cosine-corrected. Position at design height (typically floor level for
                escape route).
              </li>
              <li>
                <strong>Run the system in emergency mode.</strong> Either by simulating mains
                failure or by test command. Allow stabilisation (30 seconds for LED, longer for
                fluorescent legacy).
              </li>
              <li>
                <strong>Take readings.</strong> At each design point, record the lux reading. For
                escape route, BS EN 1838:2024 requires 1 lx across the full width of the route at
                floor level, with edge exclusions (outer 0.5 m on routes &gt; 2 m, outer ¼ width on
                routes ≤ 2 m). For anti-panic open area, typically 0.5 lx average over 90 % of the
                area. For high-risk task areas, 10 % of the maintained value or 15 lx, whichever is
                greater.
              </li>
              <li>
                <strong>Compare and document.</strong> Reading vs requirement. Pass / fail per
                point. Aggregate results. Document on the photometric check report; retain in the
                logbook.
              </li>
              <li>
                <strong>Act on failures.</strong> A failed point indicates the luminaire(s)
                illuminating that point are no longer delivering design lux. Lamp replacement, lamp
                cleaning, or whole-luminaire replacement is the corrective action. Re-test after
                rectification.
              </li>
            </ul>
            <p>
              The 5-year photometric is the OUTCOME verification of the emergency lighting design —
              the audit that the system actually delivers what BS EN 1838 requires after years of
              service. It is a manual exercise as at 2026 but adds substantial assurance over the
              traditional functional + duration regime.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Photometric verification (NEW 5-year check)"
            clause={
              <>
                In addition to the monthly functional and annual duration tests, the emergency
                lighting installation shall be subject to a photometric verification at intervals
                not exceeding 5 years, confirming that the luminaires deliver the design illuminance
                values specified in BS EN 1838 for escape route, open area, and high-risk task
                areas. The verification shall use a calibrated illuminance meter at the design
                points and shall be documented and retained as part of the maintenance record.
              </>
            }
            meaning="Three load-bearing points. (1) 'In addition to' — the 5-year check supplements, does not replace, the existing tests. (2) 'Calibrated illuminance meter at the design points' — the methodology is specified. (3) 'Documented and retained' — the result is part of the audit trail. Together this is the BS 5266-1:2025 outcome verification of the emergency lighting design."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BMS integration and operational dashboards</ContentEyebrow>

          <ConceptBlock
            title="The Building Management System overlay"
            plainEnglish="Modern buildings have a BMS that aggregates the status of HVAC, fire alarm, security, lighting, and other systems into a unified operator interface. Emergency lighting fits into this picture — the dedicated DALI gateway (or wireless gateway, or the central battery cabinet's monitoring port) reports status to the BMS via a standard protocol, and the BMS surfaces emergency lighting alongside everything else. The BMS does not replace the dedicated gateway; it provides the building-wide overlay above it."
          >
            <p>BMS integration components:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Protocol.</strong> Common choices: BACnet/IP (the building automation
                standard), Modbus TCP (common for industrial controllers), REST API or MQTT (modern
                IP-based protocols, common in cloud-integrated systems). The gateway typically
                supports one or more of these; the BMS subscribes.
              </li>
              <li>
                <strong>Data points.</strong> System status (OK / fault / test in progress),
                per-zone summaries (luminaires-in-service, luminaires-faulted), specific alarms
                (battery fault, charger fault, cabinet door open, mains failure), test events (test
                start, test complete, test result).
              </li>
              <li>
                <strong>Operator dashboard.</strong> Status panel showing emergency lighting state,
                fault summary, test history. Drillable for detail. Often co-located with fire alarm
                status in life-safety section of the BMS.
              </li>
              <li>
                <strong>Alarm escalation.</strong> The BMS escalates faults via the building's
                ticketing / work-order system, by email to facilities staff, by SMS for critical
                alarms, by audible signal to a manned monitoring station. Configurable per fault
                priority.
              </li>
              <li>
                <strong>Reports.</strong> The BMS produces aggregated reports: weekly fault summary,
                monthly test results, annual compliance summary. These feed the duty-holder logbook.
              </li>
            </ul>
            <p>
              BMS integration is increasingly standard in commercial and institutional buildings.
              For small standalone installations (single retail unit, small office), a dedicated
              gateway with cloud monitoring is more proportionate. The choice depends on the
              building infrastructure available.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cloud monitoring services"
            plainEnglish="Many gateways now offer cloud monitoring — the gateway pushes per-luminaire data to a vendor-operated cloud service that the duty-holder accesses via web or mobile app. The duty-holder gets a dashboard showing the building's emergency lighting state from anywhere, with alerts pushed to email or SMS. The cloud service provides historical analytics, trend reports, and exception lists."
          >
            <p>Cloud monitoring features:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Per-luminaire dashboard.</strong> Map view (luminaires plotted on floor
                plan), list view (sortable by status / age / fault), detail view (per-luminaire test
                history, battery state trend, fault flags).
              </li>
              <li>
                <strong>Push alerts.</strong> Email / SMS / push notification on fault detection.
                Configurable per fault type and per recipient.
              </li>
              <li>
                <strong>Compliance reports.</strong> Auto-generated monthly / annual / 5-year
                summary reports for inclusion in the logbook. Demonstrates the test schedule was
                run, the results captured, the faults addressed.
              </li>
              <li>
                <strong>Multi-site management.</strong> A property manager with 50 buildings sees
                them all in one dashboard. Cross-site fault patterns become visible (a manufacturing
                defect across multiple sites becomes obvious in the data).
              </li>
              <li>
                <strong>Vendor support integration.</strong> Some cloud services integrate with the
                vendor's spare-parts ordering, technician dispatch, and compliance review services.
                Convenient but increases vendor lock-in.
              </li>
              <li>
                <strong>Cyber security implications.</strong> Cloud connection means data leaves the
                building. Encrypted in transit (HTTPS / TLS), authenticated to the cloud account,
                cloud provider responsible for data security at rest. Adds to the cyber-security
                surface — see the cyber section below.
              </li>
            </ul>
            <p>
              Cloud monitoring suits multi-site portfolios and remote-managed buildings. For
              single-site owner-occupied buildings, local BMS integration may be more appropriate.
              Both achieve the same compliance outcome; the operational fit differs.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Reading the dashboard but not closing the loop on faults"
            whatHappens="A self-test system is installed and integrated with the BMS. The duty-holder gets daily fault emails; some are real, some are nuisance. After a few weeks the duty-holder filters fault emails to a folder and only checks them weekly. A real battery fault is reported on Tuesday; not actioned until Friday. Over the four-day window the affected luminaire's autonomy is degraded; if mains fails on Wednesday or Thursday, the luminaire does not deliver the rated 3 hours. The automated detection worked perfectly; the human response loop failed. Compliance is not just detection — it is detection + timely rectification."
            doInstead="Define a fault response SLA in the maintenance contract. Critical faults (battery fault, multi-luminaire fault, cabinet alarm) responded to within 24-48 hours. Non-critical faults (single lamp fault, communication fault) within 7-14 days. The SLA is enforced by the work-order system; faults that breach the SLA escalate to senior management. Filter nuisance faults at source (configure the gateway to suppress known false positives) rather than ignoring real faults. Update the logbook with action taken and date. The human response loop is what turns automated detection into compliance."
          />

          <CommonMistake
            title="Skipping the 5-year photometric because 'duration tests are passing'"
            whatHappens="An installation has been running for 7 years. Monthly functional and annual duration tests have passed every cycle. The duty-holder skips the BS 5266-1:2025 5-year photometric check because 'the system is passing all tests'. A formal inspection at year 8 measures actual delivered lux on the escape route — most points are ≈ 0.6 lx instead of the design 1 lx. Lumen depreciation has dropped delivered illuminance below BS EN 1838 minimum. The duration tests passed (luminaires stayed on for 3 hours) but the photometric outcome failed. The escape route would be too dim during a real evacuation. Lamps must be replaced or the luminaires upgraded — and the inspection has flagged a compliance failure that goes on the duty-holder's record."
            doInstead="Treat the 5-year photometric as required, not optional. Schedule it in the maintenance plan; budget for a calibrated lux meter (or hire one); allocate the labour. The check itself is a few hours' work for a typical floor and catches lumen depreciation that no other test sees. If the building has many luminaires, sample-based photometric checks may be acceptable — agree with the inspecting authority. The 5-year check is the outcome verification; skipping it leaves a gap in the audit trail."
          />

          <Scenario
            title="A multi-site retail estate — automated monitoring + cloud + BMS"
            situation="A retail chain owns 80 stores across the UK. Each store has 30-50 self-contained emergency luminaires. Historically maintenance was per-site visits every 6 months; the chain wants to move to data-driven exception-based maintenance to reduce labour cost and improve compliance."
            whatToDo="Standardise on DALI Type 1 / DALI-2 self-test luminaires across the estate (or wireless equivalents for older sites where retrofitting DALI is impractical). Each store has a local gateway running automated monthly + annual + 5-year photometric schedules. All gateways report to a vendor-operated cloud monitoring service consolidated in a single multi-site dashboard. Critical faults trigger SMS alerts to the regional facilities manager; non-critical faults are batched into weekly fault summaries. A national maintenance contract dispatches engineers to specific stores based on the cloud data — only stores with confirmed faults are visited, eliminating the routine sweep visits. The cloud service produces auto-generated compliance reports per store per month for the duty-holder logbook. Cyber security: each gateway on its own VLAN at the store, authenticated VPN tunnel to the cloud, no general-LAN exposure. Annual review of vendor security advisories and firmware updates. The transition cost (luminaire upgrade + gateways + initial commissioning) is paid back within 18-24 months by labour saving and improved compliance."
            whyItMatters="Multi-site portfolios are the natural home for automated monitoring + cloud aggregation. Per-site labour is the dominant cost; reducing it via data-driven dispatch is a real saving. Compliance also improves because every test runs on time and every result is captured — no missed inspections. The technology is mature; the operational model is the modern standard for distributed estates."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The logbook — still required, even with full automation</ContentEyebrow>

          <ConceptBlock
            title="Why the duty-holder logbook persists"
            plainEnglish="Modern automated systems capture every test, every fault, every event — far more comprehensively than any manual record. So why is the logbook still required? Because the logbook is the duty-holder's CURATED, REVIEWED, and SIGNED audit trail. It is the record an auditor or post-incident investigator examines first; the underlying data is drilled into only if the logbook indicates the need. Without the logbook the audit trail is incomplete even if the automated data is perfect."
          >
            <p>What the logbook contains:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Test results summary.</strong> Monthly functional pass/fail, annual duration
                pass/fail, 5-year photometric pass/fail. Per zone or per circuit; the underlying
                per-luminaire data is in the automated system.
              </li>
              <li>
                <strong>Fault log.</strong> Date detected, fault type, action taken, date resolved.
                The closed-loop record that matches automated detection to physical resolution.
              </li>
              <li>
                <strong>Modification log.</strong> Adds, removes, moves of luminaires; battery
                replacements; equipment upgrades. With dates, contractor, certificate references.
              </li>
              <li>
                <strong>Inspection records.</strong> Annual third-party inspection results, NICEIC
                or equivalent reports, fire risk assessment outputs.
              </li>
              <li>
                <strong>Drawings reference.</strong> Pointer to as-built drawings, zone plans, cable
                schedules, fire-stopping log — the full hand-over pack.
              </li>
              <li>
                <strong>Duty-holder signature.</strong> Each periodic review (typically monthly or
                quarterly) is signed by the duty-holder confirming review and acknowledgement.
              </li>
            </ul>
            <p>
              The logbook can be paper or electronic. Modern installations increasingly use
              electronic logbooks fed automatically from the cloud monitoring service, with the
              duty-holder counter-signing reviews. Paper logbooks persist in smaller installations
              and where electronic records are not yet trusted. Either is acceptable provided it is
              retained, reviewed, and signed.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cyber security for IP-connected emergency lighting"
            plainEnglish="An IP-connected emergency lighting monitoring system is a potential cyber target. An attacker who compromises the gateway could (a) suppress fault notifications, making the system appear compliant when it is not; (b) inject false test results to defeat compliance audits; (c) DoS the gateway disabling the monitoring function during a real event; (d) use the gateway as a foothold to attack other safety systems on the same network. BS 5839-1:2025 raised these concerns for fire alarms; the same logic applies to emergency lighting monitoring. Treat the controller as a SAFETY-CRITICAL ASSET requiring proper cyber hygiene."
          >
            <p>Cyber security controls for emergency lighting monitoring:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Network segmentation.</strong> Place the emergency lighting gateway on its
                own VLAN, separate from user traffic and IT systems. Firewall rules / ACLs control
                what can reach the gateway. The general LAN cannot directly access the gateway; only
                specific authorised systems (BMS, cloud monitoring) can.
              </li>
              <li>
                <strong>Strong authentication.</strong> Gateway admin access requires non-default
                credentials, ideally multi-factor where supported. Default vendor passwords changed
                at commissioning and recorded securely. Account separation (commissioning admin,
                operational read-only, etc.).
              </li>
              <li>
                <strong>Firmware updates.</strong> Vendor firmware updates applied promptly,
                particularly security patches. Maintain awareness of vendor security advisories.
                Test updates on a staging unit if practical before rolling to production.
              </li>
              <li>
                <strong>Encrypted communications.</strong> Cloud connections use TLS / HTTPS. BMS
                communications use authenticated and (where possible) encrypted protocols. Wireless
                links (BLE, Zigbee) use the protocol's built-in security with strong link keys.
              </li>
              <li>
                <strong>Log monitoring.</strong> Gateway access logs reviewed for unusual activity.
                Failed login attempts, unauthorised configuration changes, unexpected protocol
                traffic. Integration with the building's SIEM where one exists.
              </li>
              <li>
                <strong>Physical security.</strong> Gateway located in a secure area (locked plant
                room, restricted access). Physical access to the device is itself a vector — a
                console port + physical access often defeats network controls.
              </li>
              <li>
                <strong>Vendor due diligence.</strong> Choose vendors with documented security
                practices, vulnerability disclosure programmes, and a track record of timely
                patches. Avoid orphaned products no longer receiving updates.
              </li>
              <li>
                <strong>Incident response plan.</strong> What does the duty-holder do if the gateway
                is suspected compromised? Disconnect from cloud / BMS, fail back to manual
                inspection regime, vendor engagement, forensic preservation if needed.
              </li>
            </ul>
            <p>
              The principle: an IP-connected life-safety system is a safety-critical asset. The same
              cyber hygiene applied to other safety-critical IT (e.g. fire alarm panels per BS
              5839-1:2025 clause 43.4) should be applied to emergency lighting monitoring. Skipping
              cyber controls because "it is just lighting" misunderstands the threat surface.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 / BS EN 50172:2024 + BS 5839-1:2025 cyber-security parallel"
            clause={
              <>
                Where emergency lighting monitoring or control systems are interconnected with
                Internet Protocol (IP) networks or the public internet, appropriate cyber-security
                controls shall be implemented to protect the integrity of the system status, test
                data, and command channels. Controls shall include network segmentation,
                authenticated access, encrypted communications, and management of vendor security
                advisories.
              </>
            }
            meaning="The 2024/2025 emergency lighting standards now address cyber security for IP-connected systems, in parallel with BS 5839-1:2025 §43.4 for fire alarms. The principle is the same — an IP-connected safety system requires proper cyber hygiene. Network segmentation, authentication, encryption, and vendor management are the standard controls."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'DALI Type 1 / DALI-2 with edition 2 emergency commands is the standard digital protocol — per-luminaire addressing, status, test commands, fault flags.',
              'Wireless monitoring (BLE, Zigbee, proprietary RF) suits retrofits where running a 2-wire bus is impractical. Trade-offs in range, interference, security, vendor lock-in.',
              'BMS integration via BACnet, Modbus, REST, or MQTT puts emergency lighting status alongside HVAC, fire alarm, security in a unified operator interface.',
              'Cloud monitoring suits multi-site portfolios — per-luminaire dashboards, push alerts, compliance reports, multi-site management.',
              'Automated self-test scheduling: monthly functional + annual 3-hour duration on every luminaire, staggered, results captured per-luminaire, exceptions reported.',
              'BS 5266-1:2025 NEW: 5-year photometric verification with calibrated lux meter at design points. Audits delivered illuminance vs BS EN 1838 — catches lumen depreciation.',
              "Logbook (paper or electronic) STILL required even with full automation. Automated data is input; logbook is the duty-holder's curated, reviewed, signed audit trail.",
              'Closed-loop maintenance: detection → work order → attendance → resolution → logbook update. Detection alone is half the job.',
              'Cyber security for IP-connected systems: network segmentation, strong authentication, firmware updates, log monitoring. Treat the gateway as a safety-critical asset.',
              'Touchpoint with BS 5839-1:2025 §43.4 thinking — same cyber principles applied by analogy to emergency lighting monitoring.',
              'Modern self-test luminaires reduce manual inspection labour substantially; the duty-holder shifts from running tests to reviewing exception reports.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'What is the difference between DALI Type 1 and DALI-2 for emergency lighting?',
                answer:
                  'DALI Type 1 (the original specification) added emergency-specific commands to the basic DALI lighting protocol — start test, report result, etc. DALI-2 (the modernised version) extends this with edition 2 emergency commands offering more detailed status and finer-grained control. Both are widely used; DALI-2 is preferred for new installations because of better interoperability and richer data.',
              },
              {
                question: 'Can I add wireless monitoring to existing self-contained luminaires?',
                answer:
                  "Sometimes — there are retrofit modules available from some vendors that fit inside the luminaire and add wireless monitoring without changing the luminaire itself. The module typically reads the luminaire's self-test LED state (or the test electronics directly if accessible) and reports via BLE / Zigbee / RF to a gateway. Retrofit suits estates with many existing luminaires that are otherwise serviceable. New installations are typically wireless-from-design or DALI-from-design rather than retrofit modules.",
              },
              {
                question:
                  'How does the 5-year photometric verification fit with automated self-test?',
                answer:
                  'As at 2026, the 5-year photometric is a manual exercise — calibrated lux meter, design points, recorded readings. Some vendors are starting to offer estimated-lux features in their self-test electronics (using internal LED drive current and a depreciation model), but these are not yet a substitute for the formal photometric verification. Future standard revisions may recognise automated photometric estimation if the methodology is suitably calibrated. For now, schedule the manual photometric check at the 5-year interval.',
              },
              {
                question:
                  'What happens if my BMS does not support BACnet — can I still integrate emergency lighting?',
                answer:
                  'Most modern emergency lighting gateways support multiple protocols — BACnet, Modbus, REST, MQTT, sometimes proprietary. If the BMS supports any of these, integration is feasible. If the BMS is older and supports only legacy protocols, a protocol gateway (a device that translates between protocols) may be needed. Worst case, the emergency lighting runs on its own dedicated gateway with its own dashboard, and the duty-holder consults both that and the BMS separately. Compliance is unaffected; operational integration is impaired.',
              },
              {
                question: 'How often should I check the cloud monitoring dashboard?',
                answer:
                  'For configured push alerts (real-time email / SMS on faults), no routine dashboard check is needed for fault detection — the system tells you. The dashboard should be reviewed at the periodic logbook signing (typically monthly or quarterly) to confirm overall system health, check the test history, identify any trends (e.g. multiple luminaires showing degrading battery readings), and update the logbook. For high-criticality installations, daily review is appropriate.',
              },
              {
                question: 'Is wireless emergency lighting acceptable under BS EN 50172:2024?',
                answer:
                  'Yes — BS EN 50172:2024 is technology-neutral on the communication mechanism. The system must meet the functional requirements (testing, monitoring, fault reporting) and the data must be retained and auditable. Wireless meets these as readily as wired, provided the wireless protocol is reliable, secure, and the system architecture is sound. The decision between wireless and wired is operational and economic, not regulatory.',
              },
              {
                question: 'What is the cyber-security risk of cloud monitoring?',
                answer:
                  'Data leaves the building and resides on vendor cloud infrastructure. Risks: vendor cloud breach exposes data; cloud-to-gateway connection is a vector for command injection if not properly authenticated; loss of cloud connectivity disables remote monitoring (but not local self-test). Mitigations: TLS-encrypted connections, authenticated tunnels, cloud provider with documented security practices, alerts on connection loss so the duty-holder is aware of monitoring downtime, fall-back to manual inspection if cloud is unavailable for extended periods.',
              },
              {
                question:
                  "How does the closed-loop maintenance regime change the duty-holder's role?",
                answer:
                  'Less time running tests; more time reviewing exception reports and managing the work-order pipeline. The duty-holder reads the daily fault summary, decides priority, raises work orders, tracks rectification, signs the logbook. The contractor attends faults, resolves, reports back. The duty-holder reviews the closed work orders and updates the logbook. The work pattern is supervisory rather than operational — but the responsibility for compliance is unchanged. Closed-loop discipline (every detected fault → work order → resolved → logged) is what turns automated detection into actual compliance.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Remote testing and monitoring — Module 4.5" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Module 5</div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule4Section5;
