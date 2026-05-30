import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm7s6-fleet-patterns',
    question: 'What are the typical UK 2025-26 fleet EV install patterns?',
    options: [
      'All identical',
      'Five patterns: (1) taxi / private hire (overnight depot + opportunistic public DC fast); (2) van delivery (LCV — overnight depot dominant); (3) corporate fleet (workplace + home charging); (4) HGV (depot + dedicated HV supply for ultra-rapid); (5) bus / coach (depot + scheduled rapid). Each has distinct duty cycles, dwell times, charger types, supply requirements',
      'Only buses',
      'Only taxis',
    ],
    correctIndex: 1,
    explanation:
      'UK 2025-26 fleet EV install patterns: (1) Taxi / private hire — depot overnight charging (typically 7-22 kW Mode 3) + opportunistic public DC fast during shifts. (2) Van delivery (LCV — Light Commercial Vehicle, e.g. Amazon, DPD) — overnight depot charging dominant; 7-22 kW Mode 3 typical; vehicles return at varied times. (3) Corporate fleet — mixed pattern: workplace + home charging via reimbursement schemes; OCPP for cost allocation. (4) HGV — depot + dedicated HV supply for ultra-rapid charging (150-350 kW per bay); emerging UK 2025-26 with the HGV / bus electrification rollout. (5) Bus / coach — depot + scheduled rapid charging between routes; 50-150 kW typical; route-specific scheduling. Each pattern has distinct duty cycle + dwell time + supply requirements + cert evidence bundle structure.',
  },
  {
    id: 'm7s6-sequential-scheduling',
    question: 'Sequential scheduling at a fleet depot — what does it mean?',
    options: [
      'All vehicles charge simultaneously',
      'Vehicles prioritised for charging based on scheduled departure time + current state-of-charge. CPMS coordinates: vehicles departing soonest + lowest SoC get highest charging priority; vehicles with later departure throttle / wait. Within constrained site supply, maximises operational readiness without requiring full simultaneous charging capacity',
      'Random order',
      'First come first served',
    ],
    correctIndex: 1,
    explanation:
      'Sequential scheduling = priority-based charging allocation. CPMS receives from each vehicle: current SoC (state-of-charge from telematics integration) + scheduled departure time + minimum required SoC for next route. Calculates priority score = (departure-soon × low-SoC × required-SoC-shortfall). Allocates charging current via OCPP SetChargingProfile to highest-priority vehicles first; lower-priority vehicles throttle or wait. Result: site supply is fully utilised, but allocated to maximise operational readiness. UK 2025-26 reality: dominant pattern at taxi + delivery + LCV depots where vehicles return at varied times throughout 24h. Cert evidence bundle records the scheduling logic + CPMS integration + telematics data flow.',
  },
  {
    id: 'm7s6-telematics',
    question: 'Telematics integration for fleet EV charging — what data flows?',
    options: [
      'No data',
      'Vehicle telematics reports to fleet management platform: current state-of-charge, vehicle location, scheduled route + departure time, driver assigned, estimated energy needed for next route. Fleet platform → CPMS via API: priority signals for scheduling. CPMS → chargers via OCPP: current allocation per session. Closed loop: vehicle plugged in → telematics reports → CPMS prioritises → charger applies current → vehicle charges → telematics updates SoC',
      'Customer manual entry',
      'Random data',
    ],
    correctIndex: 1,
    explanation:
      'Telematics integration is the operational nervous system of a fleet EV install. Data flow: (1) vehicle telematics (e.g. Geotab, Samsara, Webfleet, Microlise) reports to fleet management platform — current SoC, location, scheduled route, driver, estimated route energy. (2) Fleet platform → CPMS via API (typically OCPI or vendor-specific) — prioritisation signals. (3) CPMS → chargers via OCPP SetChargingProfile — current allocation per session. (4) Vehicle plugged in + charger reports session start via OCPP — closed loop. UK 2025-26 reality: standard at fleet depots; vehicle’s OBD-II port or factory-fitted telematics feeds the chain. Cert evidence bundle records the telematics + fleet platform + CPMS integration architecture.',
  },
  {
    id: 'm7s6-hgv-bus',
    question: 'HGV / bus electrification — what is the install pattern?',
    options: [
      'Same as car',
      'Depot + dedicated HV connection. Ultra-rapid charging (150-350 kW per bay; emerging 1 MW for HGV). Battery sizes 300-600 kWh (HGV) + 200-400 kWh (bus). Charging windows aligned to route schedules (e.g. bus route turnaround 15-30 min between services). Site infrastructure: dedicated substation + transformer (1-2 MVA per cluster) + multi-rapid charging bay. UK 2025-26 emerging — early operator pilots scaling',
      'Single phase domestic',
      'No infrastructure',
    ],
    correctIndex: 1,
    explanation:
      'HGV / bus electrification is UK 2025-26’s emerging fleet category. Battery sizes 5-10× car EVs (HGV ~300-600 kWh; bus ~200-400 kWh). Charging at typical car wallbox rates (7-22 kW) would take 20-60 hours — impractical. Ultra-rapid charging (150-350 kW, emerging 1 MW for HGV) at depot is the answer. Site infrastructure: dedicated HV connection (11 kV) + on-site substation + transformer 1-2 MVA per cluster + LV switchgear + multi-rapid charging bays. Operational pattern: vehicles charge during scheduled depot dwell (e.g. between bus route turnarounds, after delivery shift, overnight). UK 2025-26 early operators: Stagecoach + First Bus (bus); DAF / Renault Trucks / Volvo Trucks (HGV); UK Power Networks Distributed Energy Future programme (HGV grid integration). Cert evidence bundle integrates all the layers — substantial project scope vs car-EV fleet.',
  },
];

const quizQuestions = [
  {
    question: 'Taxi depot with 30 vehicles + 24h operation. What is the typical charging install pattern?',
    options: [
      'No chargers needed',
      'Depot bay-charging: 30 × 7-22 kW Mode 3 wallboxes (typically 22 kW three-phase given operational urgency). Sequential scheduling via CPMS based on driver shift patterns + vehicle SoC + scheduled departure. Drivers return throughout 24h; CPMS prioritises soonest-departing vehicles. Site supply sized for ~50-70% utilisation (not full 30 × 22 kW). DLM mandatory. OCPP integration with taxi fleet management platform',
      '30 × 350 kW DC fast',
      'Single domestic socket',
    ],
    correctAnswer: 1,
    explanation:
      'Taxi depot install pattern: 30 × 22 kW Mode 3 (three-phase) wallboxes is typical UK 2025-26. Vehicles return at varied times throughout 24h (different driver shifts); sequential scheduling via CPMS allocates charging based on departure-soon + low-SoC priority. Site supply sized for 50-70% utilisation (utilisation factor accounts for the fact that not all 30 vehicles charge simultaneously) = ~440-660 kW (vs full 660 kW nominal); DNO HV connection + transformer common at 30+ vehicle depots. OCPP integration with taxi fleet management platform (e.g. iCabbi, Autocab) provides driver authentication + cost allocation + reporting. Cert evidence bundle: 30 × EIC + BS EN IEC 61439-7 + DNO + transformer + CPMS + fleet integration.',
  },
  {
    question: 'Delivery van depot (LCV — light commercial vehicle) - what’s different from taxi depot?',
    options: [
      'Same as taxi',
      'LCV typically returns to depot at end of working day (single overnight charge window vs taxi 24h pattern). Longer dwell time (8-12 hours overnight); lower per-bay charging rate often acceptable (7-11 kW Mode 3); larger battery vehicles (40-100 kWh per van). Site sized for overnight peak. CPMS allocates by next-day departure schedule',
      'No difference',
      'Need rapid only',
    ],
    correctAnswer: 1,
    explanation:
      'LCV (van) depot differs from taxi: vehicles return at end of work day (single overnight charge window vs taxi 24h pattern); longer dwell time (8-12 hours overnight); lower per-bay rate acceptable (7-11 kW Mode 3 typical); larger battery vehicles (Mercedes eSprinter, Ford E-Transit, Renault Master E-Tech, Volkswagen ID. Buzz Cargo etc. — 40-100 kWh). Site sized for overnight peak (~50-80% of nominal); DLM coordinates within supply; CPMS allocates by next-day departure schedule (vehicles with earliest morning departure get priority). UK 2025-26 typical: Amazon, DPD, Royal Mail, Tesco, Sainsbury’s, Hermes / Evri rolling out at scale. Cert evidence bundle covers fleet-specific operational pattern.',
  },
  {
    question: 'How does fleet CPMS integrate with the customer’s telematics platform?',
    options: [
      'It doesn’t',
      'API integration. Telematics platform (Geotab / Samsara / Webfleet / Microlise) exposes vehicle data via REST API or webhook; CPMS subscribes / polls. Data shared: SoC, location, scheduled route, driver. CPMS uses this for priority scheduling + driver authentication + reporting. Some fleet CPMS (Spirii Fleet, ChargePoint Fleet, Driivz Fleet) include native telematics integration; others require custom integration',
      'Random data',
      'Customer manual entry',
    ],
    correctAnswer: 1,
    explanation:
      'Fleet CPMS ↔ telematics integration is API-based. Telematics platforms (Geotab, Samsara, Webfleet, Microlise) expose vehicle data via REST API or webhook subscriptions. Data: SoC (state-of-charge from the vehicle’s CAN bus via OBD-II adapter), vehicle GPS location, route schedules, driver assignments. CPMS subscribes to this data + uses it for charging priority calculation + driver authentication + reporting. UK 2025-26 reality: native integrations growing (Spirii + Driivz + ChargePoint all advertise fleet-specific integrations with major telematics vendors); custom integrations via OCPI or vendor-specific APIs for niche pairings. Cert evidence bundle records the integration architecture + data flow + authentication credentials (test only).',
  },
  {
    question: 'A fleet depot install’s peak demand — how is it calculated?',
    options: [
      'All chargers × full rate',
      'Utilisation factor analysis. Number of chargers × per-charger rate × utilisation factor (typically 50-70% for sequential scheduling). Example: 30 × 22 kW × 0.6 = 396 kW peak design. Compared to nominal 30 × 22 = 660 kW. Supply sized to peak design, not nominal. Reg 311.1 max demand + Reg 722.311.201 load curtailment carve-out',
      'Same as domestic',
      'Random guess',
    ],
    correctAnswer: 1,
    explanation:
      'Fleet depot peak demand calc = chargers × per-charger rate × utilisation factor. Utilisation factor reflects sequential-scheduling reality: not all vehicles are plugged in + charging at peak simultaneously. UK 2025-26 typical utilisation factors: taxi depot 24h pattern = 0.5-0.6 (50-60%); LCV overnight = 0.6-0.7 (60-70% — more concentrated during overnight window); bus depot = 0.7-0.85 (high — vehicles return on schedule + charge urgently). Site supply sized to peak DESIGN not peak NOMINAL: 30 × 22 kW × 0.6 = 396 kW design (vs 660 kW nominal). DNO supply / transformer / LV switchgear sized accordingly. Reg 311.1 + Reg 722.311.201 enables this in the max demand calc. Cert evidence bundle records utilisation factor + the design peak calc + DLM topology.',
  },
  {
    question: 'OCPP fleet-specific extensions — what do they add?',
    options: [
      'Same as base OCPP',
      'Authentication enhancements (driver RFID + vehicle plug-and-charge); fleet reporting (energy per vehicle, cost allocation per driver, route-specific reporting); priority schedules (departure-time-based); maintenance + diagnostics (fleet-wide health monitoring). Combined with the customer’s telematics integration, deliver end-to-end fleet operations',
      'Slower charging',
      'Custom branding only',
    ],
    correctAnswer: 1,
    explanation:
      'Fleet OCPP extensions: authentication (driver-level RFID + vehicle-level ISO 15118 plug-and-charge); fleet-specific reporting (energy per vehicle, cost allocation per driver, route-specific reporting for ESG / billing); priority schedules driven by departure-time logic; cross-fleet maintenance + diagnostics. CPMS-side: dedicated fleet management modules (Spirii Fleet, Driivz Fleet Manager, ChargePoint Fleet). UK 2025-26 fleet operators standardise on a small handful of CPMS that have mature fleet capability + telematics integration. Cert evidence bundle records the CPMS’s fleet feature set + the customer’s operational scope.',
  },
  {
    question: 'For an HGV depot with 6 × 350 kW chargers, what supply infrastructure is needed?',
    options: [
      'Domestic supply',
      'Major HV grid project: dedicated 11 kV DNO connection + on-site substation + 1-2 MVA transformer + LV switchgear + multi-charger LV assembly per BS EN IEC 61439-7. Peak demand 6 × 350 × utilisation (~0.7) = ~1.5 MW. Project scope: real estate + planning + DNO + civils + electrical. £500k-£1.5m typical; 12-24 month lead time. UK 2025-26 emerging — early operator pilots',
      'Just plug into mains',
      'Wireless',
    ],
    correctAnswer: 1,
    explanation:
      'HGV ultra-rapid depot = major grid infrastructure project. 6 × 350 kW × 0.7 utilisation = ~1.5 MW peak. At 11 kV three-phase HV: ~80 A on HV side; transformer 2 MVA with headroom for future expansion. Site infrastructure: dedicated substation (planning permission + civils ~£100-300k); transformer + LV switchgear (~£100-200k); 6 × 350 kW chargers (~£50-100k each = £300-600k); LV multi-charger assembly per BS EN IEC 61439-7; cabling + containment + canopy + telematics integration + CPMS + fleet management platform. Total project ~£800k-£1.5m + 12-24 month lead time (DNO connection 6-18 months alone). UK 2025-26 reality: emerging — early operator pilots (Tesla Semi pilots, Volvo Trucks + Renault Trucks customer trials, Royal Mail / DPD HGV trials, Stagecoach + First Bus depot electrification). Cert evidence bundle is substantial across all layers.',
  },
];

const faqs = [
  {
    question: 'Fleet CPMS vs public CPMS — same product?',
    answer:
      'Often different modules of the same CPMS platform. Driivz, ChargePoint, Spirii, Monta all offer Public + Workplace + Fleet variants. Fleet adds: driver-level + vehicle-level authentication, telematics integration, route-based scheduling, cost allocation per driver / route, fleet-specific reporting (ESG, total cost of ownership, vehicle utilisation). Customer chooses the appropriate variant based on operational scope.',
  },
  {
    question: 'Home-charging reimbursement schemes for fleet drivers — how does it work?',
    answer:
      'Corporate fleet pattern: drivers charge at home + employer reimburses electricity cost. CPMS-mediated: driver’s home wallbox is enrolled in the corporate CPMS (e.g. Octopus EV Salary Sacrifice, Drax Electric Vehicles, Centrica Home Solutions); session data flows from home wallbox via OCPP to corporate CPMS; employer reimburses calculated electricity cost. UK 2025-26 growth pattern: salary-sacrifice EV schemes + home-charging reimbursement is a major UK fleet model. Section 722 + SCP Regulations 2021 + OCPP + corporate reimbursement integration.',
  },
  {
    question: 'Fleet site PV + BESS — common pattern?',
    answer:
      'Increasingly. Carport PV (panels on canopy structures above parking) + BESS + EV charging = integrated prosumer at scale. UK 2025-26 examples: Amazon depot solar carports (Tilbury, others); Royal Mail solar carports (multiple sites); Stagecoach bus depot PV (Inverness, others). Combined Chapter 82 PEI install. Cert evidence bundle integrates Section 712 + Chapter 57 + Section 722 + Chapter 82.',
  },
  {
    question: 'Fleet site upgrade path — what’s the typical Y5 reality?',
    answer:
      'Fleet sites grow rapidly. UK 2025-26 typical: 4-8 chargers at Y0 grows to 20-40 by Y5. Future-proofing at original install (M7.5) makes Y5 expansion incremental rather than disruptive. Without future-proofing: transformer replacement, cable re-pull, DNO re-application all needed. Cert evidence bundle from Y0 informs the Y5 expansion scope.',
  },
  {
    question: 'Telematics + ISO 15118 plug-and-charge — same thing?',
    answer:
      'Different. Telematics = vehicle data reporting (SoC, location, route) flowing from vehicle to fleet platform via OBD-II / factory CAN bus. ISO 15118 plug-and-charge = vehicle credentials negotiated automatically with charger via PLC over CP at plug-in. Both contribute to seamless fleet operation: telematics drives scheduling priority; plug-and-charge eliminates RFID card / app friction. Best combined for fleet UX.',
  },
];

export default function RenewableEnergyModule7Section6() {
  const navigate = useNavigate();

  useSEO({
    title: 'Fleet charging — depot, scheduling, telematics | Renewable Energy 7.6 | Elec-Mate',
    description:
      'Fleet EV charging — depot install patterns (taxi, LCV, corporate, HGV, bus), sequential scheduling, telematics integration (Geotab, Samsara, Webfleet, Microlise), CPMS fleet variants, utilisation factor sizing, ultra-rapid for HGV electrification.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 6 · Fleet EV install patterns"
            title="Fleet charging — depot, scheduling, telematics"
            description="Fleet EV charging install patterns — taxi / LCV / corporate / HGV / bus. Depot scheduling, telematics integration, CPMS fleet variants, utilisation factor sizing, ultra-rapid for emerging HGV / bus electrification."
            tone="yellow"
          />

          <TLDR
            points={[
              'UK 2025-26 fleet patterns: taxi / private hire (24h depot + opportunistic public DC); LCV (overnight depot dominant); corporate (mixed workplace + home); HGV (depot + HV ultra-rapid); bus (depot + scheduled rapid).',
              'Sequential scheduling = CPMS prioritises by departure-soon + low-SoC + minimum-SoC-required. Allocates current via OCPP SetChargingProfile + CP PWM to vehicles.',
              'Telematics integration: vehicle SoC + location + route + driver reported to fleet platform; fleet platform → CPMS via API; CPMS → chargers via OCPP. Closed loop.',
              'UK telematics vendors: Geotab, Samsara, Webfleet, Microlise. CPMS fleet variants: Spirii Fleet, Driivz Fleet Manager, ChargePoint Fleet, Monta Fleet.',
              'Utilisation factor sizing — typical 0.5-0.7 for taxi (24h pattern); 0.6-0.7 for LCV overnight; 0.7-0.85 for bus depot (scheduled urgency). Site supply sized to peak DESIGN not peak NOMINAL.',
              'HGV / bus electrification — depot + dedicated HV connection + on-site substation + ultra-rapid chargers (150-350 kW per bay, emerging 1 MW for HGV).',
              'Home-charging reimbursement schemes for corporate fleet drivers: CPMS-mediated; session data via OCPP from home wallbox; employer reimburses electricity. Octopus EV Salary Sacrifice + similar.',
              'Cert evidence bundle: per-charger Section 722 + BS EN IEC 61439-7 multi-charger assembly + DNO + CPMS + fleet management platform + telematics integration.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Classify the fleet pattern: taxi / LCV / corporate / HGV / bus. Apply appropriate install scope.',
              'Apply sequential scheduling logic: CPMS prioritises by departure + SoC + required-SoC.',
              'Integrate telematics platforms (Geotab, Samsara, Webfleet, Microlise) via API with CPMS.',
              'Choose CPMS with fleet feature set: driver-level auth, telematics integration, priority scheduling, fleet reporting.',
              'Calculate peak demand via utilisation factor (0.5-0.85 depending on pattern); size site supply to peak DESIGN not NOMINAL.',
              'Scope HGV / bus depot install: HV connection, on-site substation, ultra-rapid chargers (150-350 kW, emerging 1 MW).',
              'Integrate home-charging reimbursement for corporate fleet drivers via CPMS + OCPP.',
              'Document fleet install in cert evidence bundle: Section 722 + 61439-7 + DNO + CPMS + telematics architecture.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Fleet charging is electrical infrastructure inside an operations problem. The CPMS doesn’t care about vehicles; it cares about routes + drivers + departure times.
          </Pullquote>

          <ContentEyebrow>Five UK 2025-26 fleet patterns</ContentEyebrow>

          <ConceptBlock
            title="Taxi / private hire depot — 24h pattern"
            plainEnglish="Taxi + private hire vehicles return to depot at varied times throughout 24h (different driver shifts; opportunistic returns between fares). Depot install pattern: 7-22 kW Mode 3 wallboxes per bay; sequential scheduling via CPMS; opportunistic public DC fast during shifts for top-ups."
            onSite="UK 2025-26 reality: taxi fleets scaling rapidly (London electric black cab; private hire e.g. Bolt, Uber Eats green deliveries). Depot installs typical 20-50 bays. Site supply sized for utilisation factor 0.5-0.6 (50-60%) — not all 30 vehicles simultaneously at peak."
          >
            <p>Taxi depot characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Duty cycle</strong> — 24h operation with
                varied driver shifts; vehicles return at unpredictable times
              </li>
              <li>
                <strong className="text-white">Charger
                  type</strong> — 22 kW three-phase Mode 3 typical (faster charging given
                operational urgency)
              </li>
              <li>
                <strong className="text-white">Scheduling</strong> — sequential via CPMS;
                departing-soon + low-SoC vehicles get priority
              </li>
              <li>
                <strong className="text-white">Utilisation
                  factor</strong> — 0.5-0.6 typical; varies by depot size + driver shift
                pattern
              </li>
              <li>
                <strong className="text-white">Site sizing</strong> — supply for peak
                DESIGN (chargers × per-bay × utilisation); often 50-70% of NOMINAL
              </li>
              <li>
                <strong className="text-white">CPMS</strong> — fleet variant (Spirii Fleet,
                Driivz Fleet, ChargePoint Fleet) with taxi-specific reporting
              </li>
              <li>
                <strong className="text-white">Telematics</strong> — taxi fleet
                management platform (iCabbi, Autocab, Drive 4 You) integration with CPMS
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="LCV (van delivery) depot — overnight pattern"
            plainEnglish="Light Commercial Vehicles (delivery vans, Amazon / DPD / Royal Mail / etc.) return to depot at end of working day. Single overnight charging window (~8-12 hours dwell). Lower per-bay rate acceptable (7-11 kW Mode 3); larger battery vehicles (40-100 kWh)."
            onSite="UK 2025-26 reality: Amazon (Tilbury, multiple), DPD (>50 sites), Royal Mail (Mount Pleasant + others), Tesco / Sainsbury’s home delivery fleets — all scaling rapidly. Depot installs typical 30-100+ bays. Overnight peak — supply sized for utilisation 0.6-0.7 within overnight window."
          >
            <p>LCV depot characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Duty cycle</strong> — single working shift
                (typically 8-12h); single overnight charging window
              </li>
              <li>
                <strong className="text-white">Charger
                  type</strong> — 7-11 kW Mode 3 typical (sufficient given overnight
                window)
              </li>
              <li>
                <strong className="text-white">Vehicle battery</strong> — 40-100 kWh
                (Mercedes eSprinter, Ford E-Transit, Renault Master E-Tech, Volkswagen
                ID. Buzz Cargo)
              </li>
              <li>
                <strong className="text-white">Scheduling</strong> — next-day morning
                departure schedule drives priority
              </li>
              <li>
                <strong className="text-white">Utilisation
                  factor</strong> — 0.6-0.7 typical within overnight window
              </li>
              <li>
                <strong className="text-white">Site sizing</strong> — overnight peak
                supply; daytime supply much lower (chargers offline)
              </li>
              <li>
                <strong className="text-white">CPMS + telematics</strong> — fleet CPMS +
                LCV telematics integration (Geotab, Samsara) for route + driver assignment
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Corporate fleet — workplace + home pattern"
            plainEnglish="Corporate fleet (employee-driven vehicles for business use) typically charges at workplace + home. Home-charging reimbursement schemes are increasingly common. CPMS-mediated authentication + cost allocation."
            onSite="UK 2025-26 growth pattern: salary-sacrifice EV schemes (Octopus EV, Drax, Centrica) provide corporate fleet to employees; home-charging reimbursement via CPMS integration. Workplace EV charging supplements; OZEV Workplace Charging Scheme grant funding."
          >
            <p>Corporate fleet characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Pattern</strong> — workplace charging
                during working hours + home charging overnight; reimbursement scheme via
                CPMS
              </li>
              <li>
                <strong className="text-white">Workplace install</strong> — Section 722
                + OZEV WCS (covered in M6 + M7.1)
              </li>
              <li>
                <strong className="text-white">Home install</strong> — driver’s home
                wallbox enrolled in corporate CPMS; session data flows via OCPP
              </li>
              <li>
                <strong className="text-white">Reimbursement
                  logic</strong> — CPMS calculates cost per session (kWh × tariff rate);
                employer reimburses driver via payroll or expense
              </li>
              <li>
                <strong className="text-white">Provider
                  brands</strong> — Octopus EV Salary Sacrifice, Drax Electric Vehicles,
                Centrica Home Solutions, Hitachi Capital, Tusker, ALD Automotive
              </li>
              <li>
                <strong className="text-white">Tax efficiency</strong> — salary-sacrifice
                + Benefit-in-Kind rate (low UK 2025-26) makes corporate EV adoption
                economically attractive
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="HGV + bus depot — ultra-rapid pattern"
            plainEnglish="HGV (Heavy Goods Vehicle) and bus electrification is UK 2025-26’s emerging fleet category. Battery sizes 5-10× car EVs (HGV ~300-600 kWh; bus ~200-400 kWh). Ultra-rapid charging (150-350 kW per bay, emerging 1 MW for HGV) at depot during scheduled dwell windows."
            onSite="UK 2025-26 emerging: Tesla Semi pilots; Volvo Trucks + Renault Trucks customer trials; Royal Mail / DPD / Amazon HGV pilots; Stagecoach + First Bus depot electrification; Transport for London bus depot fleet electrification programme. Major grid infrastructure projects (HV connection + substation + transformer)."
          >
            <p>HGV / bus depot characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Battery size</strong> — HGV 300-600 kWh;
                bus 200-400 kWh (vs car 50-100 kWh)
              </li>
              <li>
                <strong className="text-white">Charging rate</strong> — 150-350 kW per
                bay typical; emerging 1 MW for HGV (Megawatt Charging System — MCS
                standard developing)
              </li>
              <li>
                <strong className="text-white">Charging
                  windows</strong> — depot dwell windows (bus route turnaround 15-30
                min; HGV between shifts; overnight overnight)
              </li>
              <li>
                <strong className="text-white">Site supply</strong> — dedicated HV
                connection (11 kV typical) + on-site substation + transformer 1-2 MVA per
                cluster
              </li>
              <li>
                <strong className="text-white">Project scope</strong> — major grid
                infrastructure project; £500k-£1.5m+ per site; 12-24 month lead time
              </li>
              <li>
                <strong className="text-white">UK 2025-26 early
                  operators</strong> — Tesla Semi pilots; Stagecoach + First Bus depot
                electrification; Royal Mail HGV trials; UK Power Networks DEFP
                programme
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — substantial: Section 722 + BS EN IEC 61439-7 + DNO HV
                + substation + transformer + LV switchgear + ultra-rapid chargers + fleet
                CPMS + telematics + route scheduling
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[3]} />

          <RegsCallout
            source="IET Code of Practice for Electric Vehicle Charging Equipment Installation + BS 7671 · Reg 722.531.3.101 (applied per-charger at fleet scale)"
            clause="IET Code of Practice for EV Charging Equipment Installation — each charging point should be supplied by a dedicated final circuit. Reg 722.531.3.101 (BS 7671): each EV circuit requires its own RCD architecture (Type B per BS EN 62423 or Type A + RDC-PD per BS EN IEC 62955) — necessarily applied PER charger, not shared."
            meaning="Dedicated final circuit per charger is the UK industry norm captured in the IET CoP for EV Charging Equipment Installation — not a BS 7671 normative reg. The structural effect is mandatory: BS 7671 Reg 722.531.3.101 specifies per-circuit RCD architecture, which forces a circuit-per-charger topology at any scale (a single shared RCBO across multiple chargers cannot independently meet Reg 722.531.3.101 per charger). At a 30-bay taxi depot or 100-bay LCV depot: 30 or 100 dedicated final circuits, each with its own RCBO / RCD architecture. Multi-charger LV assembly (BS EN IEC 61439-7) houses the dedicated final circuits + protective devices. Common installer error at fleet scale: trying to share a final circuit between bays to save cable / RCBO cost — incompatible with Reg 722.531.3.101 per-circuit RCD architecture. Cert evidence bundle records one EIC per dedicated final circuit + the 61439-7 assembly conformity."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 311.1 + Reg 722.311.201 — fleet utilisation factor + DLM"
            clause="Reg 311.1: For economic and reliable design, the max demand of the installation shall be determined. Reg 722.311.201: Load curtailment, including load reduction or disconnection, either automatically or manually, may be taken into account when determining the maximum demand. At fleet scale, the carve-out enables utilisation-factor sizing instead of nominal-peak sizing."
            meaning="At fleet depots, peak demand calc applies utilisation factor (0.5-0.85 depending on duty cycle) rather than nominal full peak. 30 × 22 kW chargers does NOT mean 660 kW supply required; with sequential scheduling + DLM coordinated via CPMS, 30 × 22 × 0.55 utilisation = ~363 kW peak DESIGN. Reg 722.311.201 explicitly permits this carve-out for EV circuits — without it, fleet installs would be financially prohibitive (DNO supply at full nominal vs design). Cert evidence bundle records: utilisation factor + design peak calc + DLM topology + Reg 722.311.201 + Reg 311.1 references + the sequential scheduling logic supporting the carve-out."
          />

          <SectionRule />

          <ContentEyebrow>Sequential scheduling + telematics integration</ContentEyebrow>

          <Pullquote>
            Sequential scheduling is the difference between a fleet depot that works + a fleet depot that’s constantly short of charged vehicles in the morning.
          </Pullquote>

          <ConceptBlock
            title="Sequential scheduling — CPMS priority logic"
            plainEnglish="CPMS receives data from each plugged-in vehicle (SoC, scheduled departure time, required SoC for route) + calculates a priority score. Highest-priority vehicles (departing soonest with lowest SoC + largest shortfall) get most charging current; lower-priority vehicles throttle or wait. Real-time updates as conditions change."
            onSite="UK 2025-26 fleet CPMS standard feature. The customer-facing benefit: vehicles ready for their assigned route + minimal charging infrastructure cost (supply doesn’t need to handle full simultaneous charging)."
          >
            <p>Priority logic factors:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Departure time</strong> — vehicles
                departing soonest get higher priority
              </li>
              <li>
                <strong className="text-white">Current SoC</strong> — lower SoC vehicles
                get higher priority (more charge needed)
              </li>
              <li>
                <strong className="text-white">Required SoC for
                  route</strong> — vehicles with greater shortfall (current SoC vs
                required) get higher priority
              </li>
              <li>
                <strong className="text-white">Driver / vehicle
                  priority</strong> — operator-defined overrides (VIP customer fleet,
                emergency vehicle, etc.)
              </li>
              <li>
                <strong className="text-white">Real-time
                  updates</strong> — as new vehicles plug in, priorities recalculated;
                allocations updated via OCPP SetChargingProfile
              </li>
              <li>
                <strong className="text-white">Minimum
                  current</strong> — 6 A per Mode 3 minimum (~1.4 kW); CPMS allocates at
                least this to active sessions; vehicles below priority threshold may wait
              </li>
              <li>
                <strong className="text-white">Configuration</strong> — CPMS rule
                engine; operator defines priority weights + thresholds + override rules
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Telematics integration architecture"
            plainEnglish="Vehicle telematics platform reports vehicle data to a fleet management platform; fleet platform shares data with CPMS via API; CPMS uses for scheduling; closed loop. Data flows in seconds; vehicles benefit from real-time scheduling decisions."
            onSite="UK 2025-26 telematics vendors: Geotab (most popular fleet management), Samsara (corporate fleet), Webfleet (Bridgestone-owned), Microlise (logistics-focused). Most have native or partner integrations with major fleet CPMS. Cert evidence bundle records the integration architecture + data flow."
          >
            <p>Telematics ↔ CPMS data flow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Vehicle telematics</strong>
                — OBD-II adapter (aftermarket) or factory-fitted CAN bus integration
                reports: SoC, location (GPS), speed, engine state, driver
              </li>
              <li>
                <strong className="text-white">Fleet management
                  platform</strong> — receives telematics data; manages routes + drivers
                + schedules
              </li>
              <li>
                <strong className="text-white">CPMS
                  integration</strong> — fleet platform exposes vehicle data via REST API
                / webhook; CPMS subscribes / polls
              </li>
              <li>
                <strong className="text-white">Scheduling
                  signals</strong> — CPMS receives priority signals + sends OCPP
                SetChargingProfile to chargers
              </li>
              <li>
                <strong className="text-white">Closed loop</strong> — vehicle plugged in
                → telematics reports SoC + route → CPMS allocates → charger applies
                current → vehicle charges → telematics updates SoC
              </li>
              <li>
                <strong className="text-white">Reporting</strong> — per-vehicle energy
                + cost + route efficiency + driver behaviour all flow back through the
                integration for fleet ops + finance + ESG
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — integration architecture diagram + API endpoint /
                credentials (test) + data flow + authentication / security details
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <Pullquote>
            A fleet depot is 30 dedicated final circuits, one sequential scheduler, and a thousand operational decisions per day.
          </Pullquote>

          <ConceptBlock
            title="Fleet duty-cycle impact on cert evidence bundle structure"
            plainEnglish="Fleet depots produce distinctive operational data trails: per-driver session records, per-vehicle SoC histories, route-energy reports, utilisation factor records. The cert evidence bundle at install captures the design + commissioning; ongoing operational data lives in the CPMS / fleet platform. Both contribute to EICR + insurance + grant reporting + ESG compliance."
            onSite="UK 2025-26 mature fleet operators treat the cert evidence bundle as the install baseline + the CPMS / fleet platform as the operational record. At EICR (typically 5-year interval for commercial), the auditor reviews both the original cert evidence + the operational history (utilisation factor verified against design assumption; site supply not exceeded; sequential scheduling working as designed). Cert evidence bundle therefore documents the operational baseline + the data points to verify against."
          >
            <p>Fleet cert evidence bundle components:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Install-time</strong> — per-charger EIC,
                BS EN IEC 61439-7 multi-charger LV assembly DoC, DNO connection
                agreement, transformer + LV switchgear specs, CPMS commissioning
                results
              </li>
              <li>
                <strong className="text-white">Design baseline</strong> — utilisation
                factor assumed (e.g. 0.55), peak DESIGN demand calc, sequential
                scheduling logic, telematics integration architecture
              </li>
              <li>
                <strong className="text-white">Operational
                  baseline</strong> — typical day-pattern (vehicle returns + plug-in
                profile), expected energy throughput, expected per-vehicle session
                count
              </li>
              <li>
                <strong className="text-white">Verification points</strong>
                — actual utilisation factor vs assumed; actual site supply peak vs
                supply capacity; sequential scheduling working as designed; per-driver
                + per-vehicle reporting flowing
              </li>
              <li>
                <strong className="text-white">EICR readiness</strong> — 5-yearly
                commercial EICR reviews the design + operational records together.
                Operator pre-EICR checklist included in cert evidence bundle
              </li>
              <li>
                <strong className="text-white">ESG + grant reporting</strong>
                — energy delivered, CO₂ saved, % renewable (PV self-consumption + grid
                green tariff), grant compliance for LEVI / OZEV WCS where applicable
              </li>
              <li>
                <strong className="text-white">Multi-party
                  copies</strong> — site operator + installer + CPMS / fleet platform
                operator + telematics vendor + grant administrator (if applicable) all
                retain copies
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Taxi depot — 30 vehicles + 22 kW chargers + sequential scheduling"
            situation="London taxi fleet depot. 30 electric black cabs operate 24h with rotating driver shifts. Vehicles return throughout 24h for crew changes + charging; opportunistic public DC fast during shifts. Want to scale to 30 depot bays."
            whatToDo="Install: 30 × 22 kW three-phase Mode 3 wallboxes; 5 clusters of 6 on shared sub-DBs; dedicated 11 kV DNO connection + transformer 1,000 kVA + LV switchgear; BS EN IEC 61439-7 multi-charger LV assembly. CPMS: Spirii Fleet integrated with iCabbi taxi fleet management platform. Sequential scheduling: priority = vehicles departing within 2 hours + SoC below 50%; lower-priority vehicles throttle or wait. Telematics: aftermarket OBD-II adapters in each vehicle (vehicle-side); iCabbi fleet platform receives + exposes via API to Spirii. DLM hierarchy: site master DLM + cluster DLM + charger CP PWM. Utilisation factor 0.55 (typical 24h taxi pattern); supply sized for 30 × 22 × 0.55 = 363 kW peak design (vs nominal 660 kW); transformer + LV switchgear sized to 500 kW for future expansion. Section 722 per charger + BS EN IEC 61439-7 + EREC G99 + DNO HV connection. Cert evidence bundle: 30 × EIC + 61439-7 + DNO + transformer + LV switchgear + CPMS + iCabbi integration + telematics + sequential scheduling logic. Total project ~£400-600k; payback via reduced taxi shift turnaround (drivers not waiting for charge) + ESG credentials + grant funding (LEVI scheme partial)."
            whyItMatters="London electric black cabs are the highest-profile UK 2025-26 fleet electrification story. ~5,000 LEVC TX electric black cabs operational; growth continuing. Depot installs at this scale demonstrate every M7 layer: Section 722 (per-charger compliance); BS EN IEC 61439-7 (LV multi-charger assembly); DNO HV (transformer + substation); CPMS fleet (sequential scheduling); telematics (route + driver integration); BESS optional (further peak-shaving); future-proofing (transformer kVA + spare LV ways). Cert evidence bundle is the operational + regulatory + grant-funding consolidated record."
          />

          <Scenario
            title="HGV pilot depot — 4 × 350 kW + emerging MCS 1 MW"
            situation="UK haulier piloting electric HGVs. Initial 4 × 350 kW ultra-rapid bays + planned future upgrade to MCS (Megawatt Charging System) 1 MW for next-gen HGV. Vehicles return overnight + during 30-45 min mid-shift dwells."
            whatToDo="Major grid project. DNO HV connection (11 kV) + on-site substation + transformer 1.5 MVA initially (sized for future MCS upgrade) + LV switchgear + 4 × 350 kW chargers (e.g. Alpitronic HYC400; Kempower S350; ABB Terra HP). BS EN IEC 61439-7 LV multi-charger assembly. Section 722 per charger; Mode 4 DC fast (BS EN 61851-23); CCS Combo 2 connector (BS EN IEC 62196-3); some chargers configurable for future NACS HGV adoption. CPMS: ChargePoint Fleet integrated with the haulier’s telematics (Geotab + Microlise). Sequential scheduling: priority = HGV scheduled for next route within 2 hours + SoC needs >50%. Site future-proofed: transformer + LV switchgear oversize 1.5-2× for MCS 1 MW upgrade; spare conduit + spare LV ways. Cert evidence bundle: 4 × EIC + 61439-7 + DNO HV + substation + transformer + LV switchgear + chargers manufacturer DoC + CPMS + telematics + future MCS upgrade path documented. Total project ~£800k-£1.2m + LEVI scheme grant funding partial. 18-24 month lead time."
            whyItMatters="HGV electrification is UK 2025-26’s emerging frontier. Battery sizes (300-600 kWh) + duty cycles (long-distance freight) + business case (TCO over diesel) make ultra-rapid charging the only viable infrastructure pattern. MCS (Megawatt Charging System) — emerging standard for 1+ MW DC charging — is the next generation. Cert evidence bundle for HGV pilot installs is documenting the regulatory framework as the technology matures. UK government LEVI scheme + private capital both backing the HGV electrification rollout."
          />

          <CommonMistake
            title="Sizing fleet depot supply to nominal peak instead of utilisation-factor design"
            whatHappens="Installer quotes for 30 × 22 kW = 660 kW peak NOMINAL supply. DNO quote: massive HV upgrade required (£300k + months). Customer balks at the cost. Project loses momentum."
            doInstead="Utilisation-factor sizing per Reg 311.1 + 722.311.201. 30 × 22 × 0.55 utilisation = 363 kW peak DESIGN; transformer sized to ~500 kW for future expansion. The utilisation factor reflects sequential-scheduling reality + DLM. DNO quote: more affordable. Cert evidence bundle records the utilisation factor + design peak calc + DLM topology + Reg 722.311.201 reference. UK 2025-26 mature fleet install practice always uses utilisation-factor sizing."
          />

          <CommonMistake
            title="Specifying CPMS without fleet variant features"
            whatHappens="Installer quotes a workplace CPMS (e.g. ChargePoint base SKU) for a 30-vehicle fleet depot. Customer expects sequential scheduling + telematics integration + per-driver reporting. The base CPMS doesn’t deliver. Customer pays for upgrade + integration months later."
            doInstead="Confirm CPMS fleet variant at quote stage. Spirii Fleet, Driivz Fleet Manager, ChargePoint Fleet, Monta Fleet — all major CPMS have fleet variants with telematics integration + sequential scheduling + fleet reporting. Customer’s telematics platform (Geotab, Samsara, Webfleet, Microlise) — confirm integration path. Cert evidence bundle records the CPMS fleet variant + telematics integration architecture."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'UK 2025-26 fleet patterns: taxi / private hire (24h depot); LCV (overnight depot); corporate (workplace + home); HGV (depot + HV ultra-rapid); bus (depot + scheduled rapid).',
              'Sequential scheduling: CPMS prioritises by departure-soon + low-SoC + required-SoC-shortfall. OCPP SetChargingProfile + CP PWM to vehicles.',
              'Telematics integration: vehicle reports to fleet platform; fleet platform → CPMS via API; CPMS → chargers via OCPP. Closed loop.',
              'UK 2025-26 vendors: telematics (Geotab, Samsara, Webfleet, Microlise); CPMS fleet (Spirii Fleet, Driivz Fleet, ChargePoint Fleet, Monta Fleet).',
              'Utilisation factor sizing: 0.5-0.6 taxi 24h; 0.6-0.7 LCV overnight; 0.7-0.85 bus scheduled. Site supply sized to peak DESIGN not NOMINAL.',
              'HGV / bus electrification — depot + HV connection + on-site substation + ultra-rapid chargers (150-350 kW; emerging 1 MW MCS for HGV).',
              'Battery sizes: car 50-100 kWh; LCV 40-100 kWh; bus 200-400 kWh; HGV 300-600 kWh. Charging duration scales accordingly.',
              'Home-charging reimbursement schemes: CPMS-mediated; corporate fleet drivers charge at home; employer reimburses via salary or expense; Octopus EV Salary Sacrifice + similar.',
              'Section 722 + BS EN IEC 61439-7 + DNO + CPMS + fleet management + telematics — fleet install integrates 7+ layers vs ~4 for workplace.',
              'Future-proofing essential for fleet sites (30-50% YoY growth typical). Transformer + LV switchgear + cable + ways + conduit + DNO supply all over-sized at install.',
              'Cert evidence bundle structures fleet install across all layers; substantial document; customer + installer + CPMS / fleet platform operator all keep copies.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-7-section-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                DLM at scale & charging clusters
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-7-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.7 CPO regulations & PCAR 2023
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
