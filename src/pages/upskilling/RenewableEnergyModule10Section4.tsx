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
    id: 'm10s4-g100-purpose',
    question:
      'What is EREC G100 and why does it exist?',
    options: [
      'A meter type',
      'EREC G100 is the UK Engineering Recommendation that governs Export Limitation Schemes (ELS) for sites where the DNO’s network cannot accept the full installed generation capacity. The customer installs more generation than the DNO will allow as gross export; an export limitation device curtails the export at a DNO-defined limit (e.g. 0 kW or 3.68 kW or any agreed limit). G100 specifies the device approval, commissioning evidence, and operational requirements. Allows installation of larger systems on constrained networks without forcing a costly DNO reinforcement.',
      'BS 7671 reg',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'EREC G100 (Engineering Recommendation G100 — "Technical Requirements for Customer Export Limiting Schemes") is published by the Energy Networks Association (ENA) and adopted across all UK DNOs. Purpose: many UK 2025-26 LV networks are constrained — they cannot accept additional export from PV / wind / BESS without reinforcement (transformer upgrade, cable upgrade, voltage management). Reinforcement is expensive + slow (6-24 months, £5-100k+). G100 provides an alternative: customer installs more generation than the network can take as gross export, but commits via an ELS to limit actual export to an agreed value. The DNO can therefore approve the connection without reinforcement. UK 2025-26 typical limits: 0 kW (zero export), 3.68 kW (16 A single-phase G98 cap), 11.04 kW (3-phase G98 cap), or any agreed value. G100 covers: device type approval (ENA-listed devices), commissioning evidence (signed certificate from approved person), monitoring + reporting, fail-safe behaviour. The ELS hardware: typically integrated into the inverter (modern hybrid inverters: SolarEdge, Solis, Huawei FusionSolar) or a separate device (Carlo Gavazzi EM340 + relay). Cert evidence: G100 commissioning certificate signed by approved person + included in cert evidence bundle.',
  },
  {
    id: 'm10s4-soft-vs-hard',
    question:
      'What’s the difference between G100 soft limiting and hard limiting?',
    options: [
      'No difference',
      'Soft limiting: the ELS continuously measures export at the point of grid connection and curtails inverter output (via Modbus / CT-clamp control loop) so net export stays at or below the limit. Inverter may run at lower power than its rated capacity. Fast response (typically <5 s). Hard limiting: the ELS measures export and physically disconnects the generator (opens a contactor) when export exceeds the limit; generator can’t run until reset. More conservative, less useful for self-consumption. UK 2025-26 typical: soft limiting dominant; hard limiting only where required by DNO.',
      'Random',
      'Hard always better',
    ],
    correctIndex: 1,
    explanation:
      'G100 distinguishes soft limiting (control-loop curtailment) from hard limiting (disconnection on exceedance). Soft limiting in detail: (1) CT clamp on the supply tail measures bidirectional current at the MET (Main Earthing Terminal) / grid connection point; (2) ELS controller calculates net export = generation − self-consumption; (3) if net export approaches the limit, controller sends a power-curtailment signal to the inverter (via Modbus RTU / TCP or proprietary protocol); (4) inverter reduces output — the excess generation is wasted (clipped) BUT the limit is respected; (5) when local self-consumption rises (e.g. EV starts charging), the curtailment lifts and inverter resumes full output. UK 2025-26 typical response time <5 s; faster on modern hybrid inverters. Use case: customer wants full PV self-consumption + occasional partial export. Hard limiting in detail: (1) CT clamp + controller; (2) if export exceeds limit, ELS opens a contactor that physically disconnects the generator from the LV side; (3) generator stays disconnected until manual / automatic reset. More conservative, prevents brief excursions, but interrupts generation. Used where DNO requires zero tolerance (typically zero-export sites). UK 2025-26 inverter market: most hybrid inverters (SolarEdge StorEdge, Solis S6, Huawei FusionSolar, GivEnergy AIO) integrate soft limiting natively. Carlo Gavazzi EM340 + external contactor is a common retrofit hard-limit solution. Cert evidence: G100 certificate notes soft / hard + the configured limit + the device type + the commissioning test result.',
  },
  {
    id: 'm10s4-g100-vs-g99',
    question:
      'When does G100 apply vs G99?',
    options: [
      'Same thing',
      'G98 (≤16 A per phase): small-scale fast-track, post-installation notification. G99 (>16 A per phase): formal pre-installation application, DNO design + connection offer + approval + commissioning. G100: an EXPORT LIMITATION layer that can be applied to a G99-scale install — customer installs more generation than the DNO will allow as export, but limits export via G100-approved ELS to a lower value the DNO can accept. G100 doesn’t replace G99; it sits alongside as a constraint that enables connection where reinforcement would otherwise be needed.',
      'Random',
      'G100 only',
    ],
    correctIndex: 1,
    explanation:
      'The EREC framework hierarchy: (1) G98 — small-scale single-phase ≤16 A per phase (i.e. ≈3.68 kW single-phase / ≈11.04 kW three-phase Type A) parallel generation. Fast-track post-installation notification. (2) G99 — anything larger or multi-source. Formal pre-installation application: customer / installer submits design → DNO evaluates network capacity → DNO issues connection offer (may require reinforcement) → customer accepts + pays connection cost → install → DNO-witnessed commissioning → G99 completion. Lead time 6-18 weeks typical; cost £500-100k+ depending on reinforcement. (3) G100 — NOT a replacement for G99; sits AS A CONSTRAINT alongside G99. Use case: customer wants to install (say) 10 kWp PV + 10 kW BESS but the DNO’s LV transformer is constrained — reinforcement £30k + 12 months. DNO offers: connect under G99 with G100 export limit of 3.68 kW (or 0 kW); customer accepts; install G100-approved ELS to enforce the limit; commissioning per G100. Customer gets the full installed capacity for self-consumption + storage but limited export. Avoids reinforcement cost + delay. UK 2025-26 reality: G100 increasingly common as DNO networks become more constrained by widespread PV + BESS adoption.',
  },
  {
    id: 'm10s4-commissioning',
    question:
      'Who can commission a G100 export limitation scheme + what is the cert evidence?',
    options: [
      'Anyone',
      'G100 requires commissioning by a person competent + recognised as suitable to commission an ELS. The G100 commissioning certificate signed by that person evidences: (a) the ELS device is from the ENA-listed G100 approved equipment list; (b) the export limit value as agreed with DNO is correctly configured; (c) the soft / hard limit type is correctly set; (d) the commissioning test result (deliberate over-generation → verify curtailment / disconnect within the specified time); (e) any monitoring / fault reporting is operational. Certificate provided to DNO + customer + included in cert evidence bundle.',
      'No specific person',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'G100 commissioning rigour reflects its role in DNO network compliance: (1) Competence — the commissioning person must be competent in: ELS device operation + inverter Modbus / control protocol + CT clamp installation + DNO requirements + commissioning testing. The MCS-certified installer’s electrical scope typically covers this; some DNOs maintain approved-person lists. (2) Cert content — G100 commissioning certificate template: customer name + address + MPAN; DNO + connection reference; generator type + rated capacity + installed capacity; export limit value (kW) as agreed with DNO; ELS device type (from ENA G100 approved list) + serial + firmware version; soft / hard limit configuration; commissioning test result — deliberate over-generation simulation (or actual peak generation event) → measured response time → measured curtailment effectiveness; monitoring + fault reporting verified; signature of commissioning person + date. (3) Distribution — copy to DNO (closes the G99 + G100 application), copy to customer (handover pack), copy in installer’s records (cert evidence bundle for future audit). (4) Ongoing — G100 typically requires a recommissioning / verification at intervals (e.g. annually) or after major equipment change. (5) Failure consequence — if G100 ELS fails to curtail correctly, DNO may revoke the connection agreement + require reinforcement or hard disconnection. Cert evidence bundle is the foundation of the DNO’s assurance.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer in a rural village wants 10 kWp PV + 10 kW BESS. DNO LV network is constrained — voltage rise during summer peak generation already at limit. DNO offers: (a) connect under G99 with G100 limit of 3.68 kW export; (b) full G99 connection requiring £25k transformer upgrade + 9 months. Customer chooses (a).',
    options: [
      'Cannot install',
      'Standard UK 2025-26 G100 scenario. Install proceeds: 10 kWp PV + 10 kW BESS installed; G100 ELS configured at 3.68 kW export limit. EMS prioritises self-consumption + BESS charging; only excess after BESS full reaches the export point; ELS curtails inverter when export approaches 3.68 kW. Customer gets full installed self-consumption + arbitrage value (≈70-80% PV self-consumed via BESS); export income is capped but small relative to avoided import savings. DNO accepts the connection without reinforcement.',
      'No solution',
      'Wait years',
    ],
    correctAnswer: 1,
    explanation:
      'The UK 2025-26 G100 economic case in action: (1) Without G100 — customer faces £25k reinforcement + 9 months delay. Most customers walk away or downsize. (2) With G100 — customer installs full 10 kWp + 10 kW BESS (no DNO reinforcement). Export limited to 3.68 kW. (3) Annual generation ≈10 × 900 = 9,000 kWh. With 10 kW BESS + sensible EMS, self-consumption ≈70-80% (7,000 kWh self-used); export ≈1,500-2,500 kWh annually. G100 limit of 3.68 kW only binds during sunny midday with full BESS + low load — a few hundred hours / year. (4) Economics — avoided import £7,000 × £0.27 = £1,890/year; SEG export £2,000 × £0.15 = £300/year; total £2,190/year. Customer satisfied. (5) Curtailment loss — typically 200-500 kWh/year clipped at the limit (the kWh that would have exported above 3.68 kW). Worth £30-75/year in lost SEG income. Tiny vs the saved reinforcement cost. (6) Cert evidence: PEI EIC + Section 712 + Chapter 57 + Chapter 82 + G99 reference + G100 commissioning certificate + EMS configuration record + DNO acceptance.',
  },
  {
    question:
      'A customer with PV + BESS expands by adding wind + EV V2G. The DNO’s G99 conditions cap export at 3.68 kW via G100. After expansion, the EMS struggles to keep export at 3.68 kW because the V2G EV may discharge during peak generation — multiple sources contributing. How should this be handled?',
    options: [
      'No solution',
      'The G100 ELS must measure NET export at the MET (single CT clamp at the grid tail) and curtail ANY source(s) needed to keep export ≤3.68 kW. Modern multi-source ELS: ELS controller communicates via Modbus / OCPP with PV inverter + BESS inverter + V2G EV charger; curtails the most-easily-curtailable source first (typically V2G > BESS > PV); fallback hard disconnect if soft control fails. EMS + ELS coordination is the integration challenge. May require re-commissioning + DNO re-acceptance.',
      'Random',
      'Disable EMS',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-source G100 ELS architecture: (1) Single measurement point — the G100 limit applies to NET export at the grid connection point. One CT clamp / smart meter reading at the MET. The ELS doesn’t care which source is exporting; only that the aggregate net export at the MET is ≤ the limit. (2) Multi-source curtailment hierarchy — ELS controller has a priority order for curtailment (typically: V2G discharge first → BESS discharge second → PV inverter third). Curtails the highest-priority source until net export at the MET drops below the limit. (3) Integration — ELS controller communicates with each source: Modbus to PV / BESS inverter; OCPP to V2G charger. EMS coordinates above this layer (priority + tariff + customer preferences); ELS enforces the G100 limit regardless. (4) Failure modes — if EMS fails (offline), ELS still works (independent of EMS, has its own measurement + curtailment loop). If ELS fails, DNO connection conditions may be breached; install must have a fail-safe (typically hard disconnect of all sources, or alarm-and-curtail-all). (5) Re-commissioning — adding new sources to a G100 install requires re-commissioning + DNO re-acceptance: new ELS commissioning cert + verification test + DNO sign-off. (6) Cert evidence: integrated PEI EIC with ELS architecture diagram + G100 cert (updated per source addition) + EMS-ELS coordination diagram + commissioning test results per source.',
  },
  {
    question:
      'G100 zero-export sites: when is zero-export the configured limit?',
    options: [
      'Never',
      'Use case: site where the DNO will not accept ANY export from this customer (network too constrained, urban centre, social housing where customer doesn’t own the export rights, or commercial site where the lease prohibits export). Customer installs PV / BESS purely for self-consumption + storage. ELS configured at 0 kW export limit. Any generation surplus to instantaneous load must go into BESS or be curtailed (clipped). Common in dense urban + apartment-block deployments + landlord-owned roof + community generation behind a master meter.',
      'Always',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Zero-export G100 deployment use cases: (1) DNO-constrained urban site — the LV network truly cannot accept ANY export from this customer; reinforcement infeasible or extremely expensive. Customer accepts zero-export connection. (2) Landlord-owned roof / leased commercial — customer occupies the building, landlord owns the roof + the generation; tenant cannot legally export under their MPAN. Configured zero-export prevents disputes. (3) Apartment block community generation — PV array shared across multiple residents behind a master meter; export complications resolved by zero-export to grid + only feeding common areas + apartments behind the master meter. (4) Lease conditions — some commercial leases explicitly prohibit grid export by tenants. (5) Customer choice — customer simply doesn’t want export hassle (SEG admin); configures zero-export. (6) Operational behaviour — ELS at 0 kW: any generation surplus to instantaneous load + BESS charging gets clipped (wasted). EMS prioritises BESS to maximise self-consumption + minimise clipping. (7) Economic impact — lose SEG export income entirely; rely on avoided import. With well-sized BESS, self-consumption ≆80-95%; clipping 5-20% of annual generation. Lost income relative to 3.68 kW G100 limit: minor (most export is below 3.68 kW anyway except sunny midday peak). (8) Cert evidence: ELS configured zero-export + commissioning test verifying curtailment to zero at the MET + DNO acceptance + customer handover acknowledging zero-export operating mode.',
  },
  {
    question:
      'Does BS 7671 cover G100 directly, or is it external?',
    options: [
      'Direct chapter',
      'G100 is an EREC (Engineering Recommendation) published by the ENA and adopted by UK DNOs as a network compliance instrument — not a BS 7671 regulation. BS 7671 covers the customer-side electrical installation safety (Section 712 PV, Chapter 57 BESS, Section 722 EV, Chapter 82 PEI integration); G100 covers the DNO-customer interface for export limiting. The two integrate: the ELS device itself is electrical equipment under BS 7671 scope (Reg 411 / 415 / 530 series for power supply + Reg 528 for comms wiring), but its G100 compliance is verified per ENA G100 commissioning evidence, not BS 7671 verification.',
      'Random',
      'Same scope',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 vs G100 scope boundary: (1) BS 7671 scope — customer-side electrical installation safety. Section 712 PV install + Chapter 57 BESS install + Section 722 EV charger install + Section 551 generating sets + Chapter 82 PEI integration. The ELS device (CT clamp + controller + inverter Modbus link) is electrical equipment within BS 7671 scope for its install + power supply + wiring. (2) G100 scope — DNO-customer interface for export limiting. ENA-published; UK DNOs adopt as connection compliance instrument. Covers ELS device type approval, commissioning evidence, operational requirements, recommissioning, fault reporting. (3) Integration — a G100 install needs both: BS 7671 EIC for the electrical install (including the ELS hardware) + G100 commissioning certificate for the DNO-facing export-limiting compliance. (4) Cert evidence bundle: both certificates included. Customer handover: both delivered. Future engineer: both referenced. (5) Other ENA EREC references in M10 scope: G83 (legacy, replaced by G98), G98 (small-scale fast-track), G99 (larger formal), G100 (export limiting), G83 / G59 historical. (6) Mental model: BS 7671 = inside the customer’s installation; EREC = the customer-DNO interface; SEG = the export commercial layer.',
  },
  {
    question:
      'What’s the typical UK 2025-26 hardware for soft G100 limiting on a SolarEdge PV + StorEdge BESS site?',
    options: [
      'External hardware required',
      'Native: SolarEdge inverters + Energy Meter (CT clamp at MET) + StorEdge controller all natively support G100 soft limiting via the SolarEdge ecosystem. Configure the export limit value in SolarEdge monitoring portal; the inverter + BESS read MET export reading via the Energy Meter + curtail when needed. ENA-listed for G100. UK 2025-26 reality: SolarEdge, Solis, Huawei FusionSolar, GivEnergy AIO, Enphase IQ8 + IQ Combiner all support native soft G100. Older installs may use external Carlo Gavazzi EM340 + controller.',
      'Random',
      'No hardware',
    ],
    correctAnswer: 1,
    explanation:
      'UK 2025-26 G100 hardware landscape: (1) Native vendor support — most modern hybrid inverters integrate soft G100 limiting via the vendor’s own CT-clamp accessory and configuration. Examples: SolarEdge + Energy Meter, Solis + S6 metering, Huawei FusionSolar + Smart Power Sensor, GivEnergy AIO + EM340 / native CT, Enphase IQ8 + IQ Combiner + Envoy. Configure the limit value in the vendor app / portal; vendor commissioning person signs the G100 certificate. (2) External / retrofit — older installs or non-supporting vendors use Carlo Gavazzi EM340 (a popular industrial export-limiting controller with CT clamps + relay outputs + Modbus integration). Sits external to the inverter; talks to inverter via Modbus / proprietary protocol; physically curtails or disconnects. (3) ENA G100 approved list — the ENA maintains a list of G100-compliant devices. Installer chooses from this list; DNO accepts the device. (4) Commissioning — most vendor portals walk through the G100 commissioning steps; certificate generated automatically + signed by commissioning person. (5) Cert evidence: device type + serial + firmware + configuration record + commissioning test result + DNO acceptance + customer handover.',
  },
  {
    question:
      'A customer’s G100 ELS has been working for 2 years. They want to add a 7 kW EV charger (NOT V2G). Does G100 need re-commissioning?',
    options: [
      'Yes always',
      'EV charger as a LOAD (not source) doesn’t add export capacity — it adds local consumption that lifts the curtailment (less excess to limit). Strictly, G100 commissioning is per the GENERATION configuration; adding a load doesn’t change the export limit logic. BUT: DNO may require notification of the new EV charger via G98 / G99 process (load notification, not generation); EMS configuration may benefit from re-tuning; cert evidence bundle should be updated to reflect the new load. UK 2025-26 typical: notify DNO of the EV charger + update EMS + add EV charger note to ELS configuration record. Full G100 recommissioning not required for adding a pure load.',
      'No, never',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'G100 recommissioning triggers — the nuance matters: (1) Adding a GENERATING source (new PV string, new BESS, wind turbine, V2G EV) — G100 recommissioning REQUIRED. New source changes the export curtailment logic; ELS must include the new source in its curtailment hierarchy; DNO re-acceptance needed. (2) Adding a pure LOAD (EV charger non-V2G, heat pump, immersion heater, additional sockets) — G100 recommissioning typically NOT required. The load lifts curtailment (more local consumption → less export pressure on the limit). DNO may require G98 / G99 LOAD notification depending on capacity (heat pumps + EV chargers often need DNO load notification for max demand reasons — Reg 311.1). Cert evidence bundle updated. (3) Changing the export limit value — recommissioning REQUIRED. DNO updates the connection agreement; ELS reconfigured; commissioning verifies the new limit. (4) ELS firmware upgrade — may require recommissioning depending on the change scope. (5) Replacing the ELS device — recommissioning REQUIRED. New ENA-approved device + commissioning evidence. (6) UK 2025-26 typical: keep the G100 commissioning certificate as a living document; annex new equipment additions / changes; full recommissioning only when generation or limit changes. Cert evidence bundle accumulates updates over the life of the install.',
  },
];

const faqs = [
  {
    question: 'Is G100 mandatory for all renewable installs in UK 2025-26?',
    answer:
      'No. G100 applies only where the DNO’s network cannot accept the full installed export capacity AND the customer accepts an export-limited connection in lieu of reinforcement. Many UK 2025-26 sites have adequate network capacity — no G100 needed; standard G98 (small-scale) or G99 (larger) connection without export limitation. G100 is the optional alternative that lets customers install more generation than the DNO would otherwise accept.',
  },
  {
    question: 'Who pays for the G100 ELS device?',
    answer:
      'The customer, as part of the installation cost. UK 2025-26 typical: native vendor ELS (SolarEdge / Solis / GivEnergy / Huawei) adds £100-300 to the install (CT clamp + configuration); external Carlo Gavazzi EM340-based ELS adds £500-1,000 (hardware + commissioning labour). Trivial compared to the DNO reinforcement avoided (£5-100k).',
  },
  {
    question: 'Can G100 limit be changed later if the DNO upgrades the network?',
    answer:
      'Yes. If the DNO reinforces or releases capacity, customer can request a higher G100 limit (or removal entirely → full G99 export). Requires: DNO connection agreement amendment + ELS reconfiguration + G100 recommissioning + new commissioning certificate. UK 2025-26 reality: DNO network capacity is slowly improving in some areas (smart grid investment); customers in constrained areas may see their G100 limits raised over time.',
  },
  {
    question: 'Does G100 affect SEG income?',
    answer:
      'Yes — directly. SEG pays per kWh exported. G100 caps export. Higher generation than the G100 limit gets clipped (wasted) instead of exported — lost SEG income on those kWh. UK 2025-26 typical: G100 at 3.68 kW for a 10 kWp PV install loses 200-500 kWh/year of would-have-exported energy → £30-75/year lost SEG vs £25k saved on reinforcement — trivial tradeoff. Zero-export G100 loses all SEG income; customer relies on self-consumption alone.',
  },
  {
    question: 'How does G100 interact with EMS?',
    answer:
      'The EMS sits above the ELS in the priority hierarchy. EMS handles: source priority, ToU arbitrage, load coordination, customer preferences. ELS handles: G100 export-limit enforcement, independent of EMS. If EMS commands the inverter to export 8 kW but the G100 limit is 3.68 kW, the ELS curtails the inverter to 3.68 kW regardless of EMS intent. ELS = the regulatory floor; EMS = the optimisation layer above. Coordination matters: well-designed EMS reads the G100 limit + plans BESS / load operation to maximise self-consumption + minimise curtailment (avoiding wasted clipped generation).',
  },
];

export default function RenewableEnergyModule10Section4() {
  const navigate = useNavigate();

  useSEO({
    title: 'EREC G100 export limit for UK renewable installs | Renewable Energy 10.4 | Elec-Mate',
    description:
      'EREC G100 Export Limitation Scheme — UK ENA framework allowing larger renewable installs on constrained DNO networks via export limiting. Soft vs hard limiting, ENA-approved devices, commissioning evidence. Why G100 avoids £5-100k DNO reinforcement costs. Integration with EMS + SEG.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-10')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 10
          </button>

          <PageHero
            eyebrow="Module 10 · Section 4 · ENA EREC G100 Export Limitation Schemes"
            title="EREC G100 export limit"
            description="The UK Engineering Recommendation that lets customers install more generation than the DNO’s network can accept as gross export — by limiting actual export to an agreed lower value via an ENA-approved Export Limitation Scheme (ELS). Soft limiting (curtailment via inverter Modbus) vs hard limiting (physical contactor disconnect). UK 2025-26 reality: G100 is the workaround that prevents £5-100k DNO reinforcement costs blocking PV / BESS installs on constrained networks."
            tone="yellow"
          />

          <TLDR
            points={[
              'EREC G100 = ENA-published Engineering Recommendation. UK DNOs use it to allow connections with export limited to an agreed value — instead of forcing customer to pay for network reinforcement.',
              'Use case: customer wants to install (e.g.) 10 kWp PV + 10 kW BESS; DNO network constrained; G100 ELS configured at (e.g.) 3.68 kW or 0 kW export. Customer gets full self-consumption + BESS arbitrage; export capped.',
              'Soft limiting: ELS measures export at MET, curtails inverter output via Modbus / proprietary protocol; inverter runs at reduced power; <5 s response. Dominant UK 2025-26.',
              'Hard limiting: ELS measures export, physically disconnects generator via contactor if export exceeds limit. More conservative; used where DNO requires zero tolerance.',
              'G100 does NOT replace G98 / G99 — it sits as a constraint alongside G99 (or larger-scale G98 cases). The G99 connection agreement references the G100 limit; the G100 commissioning certificate evidences compliance.',
              'ENA G100-approved device list: native vendor ELS (SolarEdge + Energy Meter, Solis S6 + meter, Huawei FusionSolar + Smart Power Sensor, GivEnergy AIO + EM340 / native, Enphase IQ + IQ Combiner); external Carlo Gavazzi EM340 + relay for retrofits.',
              'Multi-source G100: single CT clamp at MET measures NET export; ELS curtails sources in a priority hierarchy (typically V2G > BESS > PV); EMS coordinates above ELS layer.',
              'Cert evidence: G100 commissioning certificate signed by competent person; ELS device type + configuration + commissioning test result; DNO acceptance; recommissioning required for new generation source or limit change.',
              'NOT a BS 7671 regulation — UK DNO compliance instrument under ENA. BS 7671 covers the ELS hardware install (Reg 411 / 415 / 528); G100 covers the DNO-facing limit compliance.',
              'Economic tradeoff: G100 ELS £100-1,000 vs DNO reinforcement £5-100k. Lost SEG income from clipping minor (£30-75/year typical) vs saved reinforcement cost.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define EREC G100 + its UK DNO regulatory role.',
              'Distinguish G98 (small-scale fast-track), G99 (formal large), and G100 (export limit constraint).',
              'Compare soft limiting (Modbus curtailment) vs hard limiting (contactor disconnect).',
              'Identify ENA-approved G100 devices for UK 2025-26 inverters (SolarEdge, Solis, Huawei, GivEnergy, Enphase, Carlo Gavazzi).',
              'Apply multi-source G100: single MET measurement + curtailment priority hierarchy across PV / BESS / V2G.',
              'Apply zero-export G100 use cases: urban-constrained, landlord-owned, apartment blocks, customer choice.',
              'Compose the G100 commissioning certificate + cert evidence bundle contribution.',
              'Articulate the economic case: G100 device cost vs DNO reinforcement avoidance.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            G100 is the UK’s pragmatic answer to a constrained LV network: install more generation than the network will take, but limit what leaves the gate. Customer keeps full self-consumption; DNO keeps the network safe; reinforcement queue stays manageable.
          </Pullquote>

          <ContentEyebrow>What G100 is + the UK 2025-26 economic case</ContentEyebrow>

          <ConceptBlock
            title="EREC G100 — Export Limitation Schemes"
            plainEnglish="EREC G100 is the UK Engineering Recommendation published by the Energy Networks Association (ENA) that governs Export Limitation Schemes (ELS). It allows customers to install more renewable generation than the DNO’s network can accept as gross export — by installing an ENA-approved ELS that physically limits export to an agreed value. Lets the DNO approve the connection without expensive + slow network reinforcement."
            onSite="UK 2025-26 reality: G100 is increasingly common as DNO LV networks reach capacity limits from widespread PV + BESS adoption. Without G100, customers in constrained areas would face £5-100k reinforcement costs + 6-24 month waits. G100 unlocks the install for £100-1,000 ELS device cost + clipped export of 200-500 kWh/year."
          >
            <p>How G100 works + UK 2025-26 deployment:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Origin</strong> — ENA
                Engineering Recommendation G100 + amendments. Adopted across all UK
                DNOs as a network compliance instrument. Not a BS 7671 reg
              </li>
              <li>
                <strong className="text-white">Use case</strong> — DNO
                LV network constrained: voltage rise at peak generation, transformer
                capacity limited, cable capacity limited. Customer wants to install
                more generation than network can take as gross export
              </li>
              <li>
                <strong className="text-white">G100 ELS</strong> —
                Export Limitation Scheme = the hardware + software that measures
                export at the grid connection point + curtails (or disconnects) the
                generator to keep net export ≤ the configured limit
              </li>
              <li>
                <strong className="text-white">Limit values</strong>
                — customer-DNO agreed. Common: 0 kW (zero-export), 3.68 kW
                (G98 single-phase Type A cap), 11.04 kW (G98 three-phase Type A
                cap), or arbitrary value the network can accept
              </li>
              <li>
                <strong className="text-white">Connection flow</strong>
                — customer / installer submits G99 application → DNO
                evaluates + offers connection with G100 limit → customer accepts
                → install ELS + complete G99 install → DNO-witnessed or
                self-certified G100 commissioning → connection live
              </li>
              <li>
                <strong className="text-white">Economic case</strong>
                — G100 ELS £100-1,000 + clipped export 200-500 kWh/year
                (£30-75/year lost SEG) vs DNO reinforcement £5-100k +
                6-24 month delay. Customer no-brainer in constrained network areas
              </li>
              <li>
                <strong className="text-white">UK 2025-26 prevalence</strong>
                — increasingly common. Some DNOs (UKPN, SSEN, NGED) report
                G100 connections growing as default-acceptance offer for constrained
                LV networks. SP Energy Networks similar trajectory
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — G100 commissioning certificate signed by
                competent person + ELS device specification + configuration record
                + commissioning test result + DNO acceptance + integrated PEI EIC
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="G100 in the EREC framework: G98 vs G99 vs G100"
            plainEnglish="G98, G99, G100 are three different ENA Engineering Recommendations covering different aspects of customer-side generation connection to UK DNO networks. G98 = small-scale fast-track. G99 = formal larger-scale. G100 = export limitation constraint. They’re not mutually exclusive: a typical UK 2025-26 PV + BESS install on a constrained network sits under G99 (formal application) WITH G100 (export limit) as the connection condition."
            onSite="Practical UK 2025-26: virtually all PV + BESS installs above the smallest residential start with a G99 application (because BESS as a generating set + multi-source PEI typically takes the install above the G98 fast-track threshold). G100 then enters if the network is constrained. The installer’s pre-quote check: ‘what does the DNO say about this site’s connection options?’ — the DNO’s response determines whether G100 enters scope."
          >
            <p>EREC framework comparison:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">EREC G98</strong> —
                small-scale Type A (≤16 A per phase: ≈3.68 kW single-phase,
                ≈11.04 kW three-phase). Fast-track post-installation
                notification (notify DNO within 28 days of commissioning). Type-tested
                inverter from the ENA-approved list — deemed to meet Reg 551.7
                requirements. UK 2025-26: most small residential PV (up to 4 kWp)
                fits G98 if no BESS
              </li>
              <li>
                <strong className="text-white">EREC G99</strong> —
                anything larger or multi-source. Formal pre-installation application.
                DNO design + connection offer (may include reinforcement requirement
                or G100 limit condition) + customer acceptance + install +
                DNO-witnessed commissioning + G99 completion. Lead time 6-18 weeks
                typical
              </li>
              <li>
                <strong className="text-white">G99 Issue 2 (2025) +
                  storage</strong> — the current version is EREC G99 Issue 2
                (10 March 2025). It adds mandatory requirements for Power
                Generating Modules incorporating electricity storage, in force
                1 March 2026 — so new BESS / hybrid connections must be applied
                for and commissioned against these requirements
              </li>
              <li>
                <strong className="text-white">EREC G100</strong> —
                NOT a connection class; an EXPORT LIMITATION layer. Sits as a
                constraint on a G99 (or larger G98) connection. ELS device +
                commissioning evidence + ENA approval list. Customer installs
                more generation than network accepts as gross export; ELS keeps
                actual export ≤ the limit
              </li>
              <li>
                <strong className="text-white">G99 + G100
                  combination</strong> — the typical UK 2025-26 path for PV +
                BESS installs on constrained networks. G99 application + DNO
                connection offer specifies the G100 limit + ELS requirement +
                commissioning evidence
              </li>
              <li>
                <strong className="text-white">G98 + G100
                  combination</strong> — less common but exists. Small (≤16 A)
                generation in a network so constrained that even 16 A per phase is
                too much. Customer chooses to limit further (e.g. 0 kW)
              </li>
              <li>
                <strong className="text-white">When G98 is enough</strong>
                — single-phase PV ≤3.68 kW + no BESS + no other source +
                unconstrained network. Customer-installer files G98 within 28 days.
                Simplest path
              </li>
              <li>
                <strong className="text-white">When G99 alone is
                  enough</strong> — larger generation (&gt;16 A) but network not
                constrained. G99 formal application + DNO approval without G100
                limit. Full installed export accepted
              </li>
              <li>
                <strong className="text-white">When G99 + G100 needed</strong>
                — larger generation + constrained network. G99 + G100 limit.
                Customer accepts export cap; install proceeds without reinforcement
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="ENA EREC G100 — Engineering Recommendation: Technical Requirements for Customer Export Limiting Schemes (not BS 7671)"
            clause="A Customer Export Limiting Scheme (ELS) compliant with EREC G100 shall measure the net export at the customer’s grid connection point and shall, by means of inverter curtailment (soft limiting) or generator disconnection (hard limiting), prevent net export from exceeding the value agreed with the DNO. The ELS device shall be from the ENA G100 approved equipment list. Commissioning shall be performed by a person competent to commission an ELS, with a signed commissioning certificate provided to the DNO + customer recording: device type + serial + firmware, configured limit value, soft / hard limit setting, commissioning test result (deliberate over-generation or peak generation event verification), monitoring + fault-reporting verification. Recommissioning shall be performed when a new generation source is added, when the limit value is changed, when the ELS device is replaced, or as required by the DNO connection agreement."
            meaning="EREC G100 is the UK DNO compliance instrument for export-limited connections. Not a BS 7671 regulation — sits in the ENA / DNO regulatory layer alongside G98 + G99. Practical scope for the installer: (1) ELS hardware install is a BS 7671 scope item (Reg 411 / 415 / 528 / 530 for power supply + comms wiring) requiring EIC; (2) ELS commissioning + DNO compliance is a G100 scope item requiring the G100 commissioning certificate. Both certificates required in the cert evidence bundle. UK 2025-26 reality: G100 is increasingly important as networks become more constrained. The competent commissioning person is often the MCS-certified installer’s electrical scope team — the BS 7671 + G100 evidence is delivered as an integrated handover pack."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Soft vs hard limiting + multi-source ELS</ContentEyebrow>

          <Pullquote>
            Soft limiting is a control loop that curtails generation; hard limiting is a contactor that disconnects it. The choice has economic + customer-experience implications — the DNO’s tolerance determines which.
          </Pullquote>

          <ConceptBlock
            title="Soft limiting — control-loop curtailment"
            plainEnglish="Soft limiting: the ELS measures export at the MET (Main Earthing Terminal / grid connection point) via a CT clamp, calculates net export, and sends a power-curtailment command to the inverter via Modbus / proprietary protocol. The inverter reduces its output — the excess generation gets clipped (wasted) BUT the limit is respected. When local consumption rises (e.g. EV starts charging), the curtailment lifts. UK 2025-26 dominant approach."
            onSite="Typical response time <5 s on modern hybrid inverters. Curtailment loss: 200-500 kWh/year for a 10 kWp PV install with 3.68 kW G100 limit (a few hundred hours/year of clipping during sunny midday peak). Lost SEG income £30-75/year. Trivial vs DNO reinforcement avoidance."
          >
            <p>Soft limiting architecture + commissioning:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CT clamp</strong> —
                bidirectional current sensor on the main supply tail at MET / consumer
                unit incomer. Measures import + export. Connected to ELS controller
                via twisted-pair signal cable (Reg 528 segregation from LV power)
              </li>
              <li>
                <strong className="text-white">ELS controller</strong>
                — reads CT clamp + calculates net export per measurement cycle
                (typically 100ms-1s). Compares to configured limit. Computes
                curtailment command if export approaching limit
              </li>
              <li>
                <strong className="text-white">Inverter
                  curtailment</strong> — ELS sends power setpoint command via
                Modbus RTU / TCP / proprietary protocol. Inverter reduces output to
                stay below the limit. Most modern hybrid inverters support this
                natively
              </li>
              <li>
                <strong className="text-white">Response time</strong>
                — typical &lt;5 s end-to-end. ENA G100 specifies maximum response
                time per device class. Faster on modern integrated solutions
                (SolarEdge native, Solis S6); slower on external Carlo Gavazzi
                EM340-based retrofits
              </li>
              <li>
                <strong className="text-white">Curtailment
                  hierarchy</strong> — multi-source: ELS curtails in priority
                order. Typical: V2G discharge first → BESS discharge second →
                PV inverter third. EMS coordinates above this layer
              </li>
              <li>
                <strong className="text-white">Loss accounting</strong>
                — clipped kWh = generation that would have exported but
                didn’t. Typically 200-500 kWh/year for 10 kWp PV at 3.68 kW
                limit. Logged by inverter for monitoring + commissioning evidence
              </li>
              <li>
                <strong className="text-white">UK 2025-26 native
                  vendor support</strong> — SolarEdge + Energy Meter, Solis +
                S6 metering, Huawei FusionSolar + Smart Power Sensor, GivEnergy
                AIO + EM340 / native, Enphase IQ + IQ Combiner + Envoy. ENA-listed
              </li>
              <li>
                <strong className="text-white">Commissioning
                  test</strong> — deliberate over-generation simulation (lift
                BESS charge limit, defer load) → verify ELS curtails inverter
                within ENA-specified response time → measure clipped power +
                duration → record on G100 certificate
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Hard limiting + zero-export configurations"
            plainEnglish="Hard limiting: the ELS measures export and physically disconnects the generator via a contactor when export exceeds the limit. More conservative than soft limiting — generator cannot run at all if its operation would exceed the limit. Used where DNO requires zero tolerance (typically zero-export sites). Less useful for partial-export scenarios where soft limiting fits better."
            onSite="UK 2025-26 hard limiting use cases: zero-export sites (urban-constrained, landlord-owned roof, apartment block community generation, customer choice to avoid SEG admin). Hardware: CT clamp + ELS controller + DIN-rail contactor / switch-disconnector on the AC side of the inverter. Reg 537.2 isolation rating. Cert evidence: G100 cert with hard-limit configuration + commissioning verification."
          >
            <p>Hard limiting + zero-export details:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CT clamp + controller</strong>
                — same measurement as soft limiting. Bidirectional CT clamp at
                MET + ELS controller reading
              </li>
              <li>
                <strong className="text-white">Contactor / switch</strong>
                — DIN-rail contactor or switch-disconnector on the AC supply
                from the inverter to the LV switchgear. Coil controlled by ELS
                digital output. Reg 537.2 isolation rated
              </li>
              <li>
                <strong className="text-white">Trigger</strong> — ELS
                detects export &gt; limit → contactor opens → generator
                disconnected. Inverter detects loss of grid → Reg 551.7.5
                anti-islanding shuts down. Generator stays disconnected until reset
              </li>
              <li>
                <strong className="text-white">Reset</strong> — manual
                or automatic, configurable. Automatic reset after a cool-down
                period if conditions normalised (sun behind cloud, load rises);
                manual if DNO requires positive engineer intervention
              </li>
              <li>
                <strong className="text-white">Zero-export use
                  cases</strong> — DNO-constrained urban site (no export
                allowed); landlord-owned roof (tenant cannot export);
                apartment-block community generation behind master meter; customer
                choice to avoid SEG admin
              </li>
              <li>
                <strong className="text-white">Zero-export
                  operational impact</strong> — all surplus generation goes
                into BESS or gets clipped; with BESS, 80-95% self-consumption;
                clipping 5-20% annual. Lose all SEG income; rely entirely on
                avoided import
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.4 + hard
                  limit</strong> — hard-limit contactor counts as one of the
                multi-source isolation switches if it isolates the generator
                source. Document on multi-source isolation diagram
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — G100 certificate with hard-limit configuration + contactor
                type + commissioning test (deliberate over-generation → verify
                contactor opens within response time + isolates generator) +
                reset procedure documented in customer handover
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.5 — Anti-islanding in interaction with G100"
            clause="Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4."
            meaning="The interaction between BS 7671 Reg 551.7.5 anti-islanding and EREC G100 export limiting: anti-islanding is a SAFETY requirement (do not feed a dead grid); G100 is a NETWORK COMPLIANCE requirement (do not exceed an export limit). Both must be in place simultaneously. (1) Reg 551.7.5 ensures the inverter disconnects on DNO loss — the inverter’s built-in loss-of-mains detection (RoCoF + voltage/frequency window; G99 disallows Vector Shift for type-tested generation, so RoCoF is the required method on the type-tested inverters used in virtually all LCT installs, with Vector Shift legacy / non-type-tested only). Verified at install per G98 / G99 commissioning. (2) G100 ELS ensures normal-operation export stays within the agreed limit — separate device (or integrated feature) measuring at MET + curtailing or disconnecting. (3) Hard-limit G100 + anti-islanding integration: when ELS contactor opens (G100 trigger), inverter sees loss of grid + Reg 551.7.5 anti-islanding activates (correctly shuts down generation, not just curtails). Customer experience: brief outage of local generation. (4) Soft-limit G100: inverter remains grid-connected; anti-islanding never engages; curtailment is invisible to the customer. (5) Cert evidence bundle records both: Reg 551.7.5 commissioning result (anti-islanding tested at install) + G100 commissioning certificate (export limit tested at install). Both are separate certificates by separate frameworks; both are required."
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Constrained rural network — 10 kWp PV + BESS with G100 at 3.68 kW"
            situation="Customer in a rural village. 100 A single-phase service. Existing voltage rise during summer afternoons already at the upper LV limit (253 V at peak generation across the local network). DNO offer for customer’s requested 10 kWp PV + 10 kWh BESS: either (a) connect under G99 with G100 ELS limiting export to 3.68 kW; or (b) full G99 connection requiring £25k LV transformer upgrade + 9 months wait. Customer chooses option (a)."
            whatToDo="G99 + G100 connection workflow. (1) Installer submits G99 application detailing PV + BESS + requested G100 limit 3.68 kW. (2) DNO issues connection offer with G100 condition; customer accepts. (3) Install: PV (Section 712) + BESS (Chapter 57) + Chapter 82 PEI multi-source isolation + Reg 551.7.5 anti-islanding per source. (4) G100 ELS: SolarEdge native (Energy Meter + StorEdge controller) ENA-approved — configured at 3.68 kW export limit in SolarEdge monitoring portal. Soft limiting; <5 s response time per SolarEdge product DoC. (5) Commissioning: BS 7671 testing (Reg 643 Part 6); Reg 551.7.5 anti-islanding witnessed (DNO or simulated); G100 commissioning test — deliberate over-generation by maximising PV with BESS full + load disconnected; verify ELS curtails to 3.68 kW within <5 s. G100 commissioning certificate signed + filed with DNO + customer. (6) EMS configured: SolarEdge native EMS handles PV → self-consume → BESS charge → SEG export up to 3.68 kW; clipping beyond. (7) Cert evidence bundle: PEI EIC + Section 712 + Chapter 57 + Chapter 82 + G99 connection agreement + G100 commissioning certificate + EMS configuration + DNO acceptance. Annual generation ≈9,000 kWh; self-consumption ≈70% (6,300 kWh) saving £1,700 import; SEG export ≈1,800 kWh (limited window) earning £270; clipped ≈900 kWh worth £135 lost SEG. Total annual benefit £1,970/year vs £25k reinforcement avoided."
            whyItMatters="This is the canonical UK 2025-26 G100 scenario. Without G100, customer faces £25k + 9 months — most walk away. With G100, the install proceeds + customer’s economic outcome is dominated by self-consumption (£1,700/year) with SEG capped (£270/year) + a small clipping loss (£135/year). The G100 ELS hardware adds £0 incremental (SolarEdge native) to £500 (external retrofit). Cert evidence bundle integrates BS 7671 + EREC G99 + G100 + EMS + SEG correspondence. Repeated thousands of times annually across UK constrained networks."
          />

          <Scenario
            title="Apartment-block community PV — zero-export G100 + master-meter feed"
            situation="A 24-flat apartment block; landlord installs 30 kWp rooftop PV with the intent of feeding common areas (lifts, lighting, communal heating pumps) and offering surplus to tenants via private wire arrangement. The landlord does not have a SEG export agreement (cannot export under their MPAN for the rooftop because the rooftop is communal not landlord-tenanted). DNO offers G99 connection with G100 zero-export limit; surplus must stay behind the master meter."
            whatToDo="Zero-export G100 community generation scenario. (1) Install: 30 kWp PV (Section 712 commercial scope) + 50 kWh BESS (Chapter 57) behind a master meter. PEI under Chapter 82. (2) G100 ELS: hard-limit configuration at 0 kW export. ENA-approved device (Carlo Gavazzi EM340 + DIN contactor as retrofit-friendly option). CT clamp at master meter; contactor on AC side of PV inverter; trips on any export detection. (3) Operational behaviour: PV generates → common-area load consumes → surplus charges BESS → BESS full + still surplus = inverter curtails (soft fallback) or contactor opens (hard); generation resumes when contactor resets. (4) Commissioning: BS 7671 Part 6 + Reg 551.7.5 anti-islanding + G100 zero-export test (deliberately defer common load + verify contactor opens at any export > 0); record cycle time + reset procedure. (5) Tenant private-wire arrangement: separate collective / shared PEI consideration (these PEI types are defined in the Chapter 82 contents, Reg 826.7) if surplus distributed to tenant flats behind the master meter; ESQCR / Ofgem private-wire-supply rules apply (not BS 7671). (6) Cert evidence bundle: commercial PEI EIC + Section 712 + Chapter 57 + Chapter 82 + G99 connection + G100 zero-export certificate + master-meter MPAN documentation + private-wire arrangement reference if applicable. (7) Economic case: landlord saves £6,000-9,000/year on common-area electricity import (self-consumed PV worth £0.25/kWh × ≈30,000 kWh × 80% self-consumption). No SEG income. BESS payback via load-shifting + reducing peak demand."
            whyItMatters="Apartment-block community PV is a growing UK 2025-26 use case as social housing landlords + private build-to-rent operators decarbonise. Zero-export G100 is the typical DNO answer for these sites — dense urban networks have no export capacity to spare. The economic case stands on self-consumption alone. Cert evidence bundle includes the additional collective PEI (Reg 826.7 contents) + private-wire considerations beyond a typical domestic install."
          />

          <CommonMistake
            title="Treating G100 as optional when DNO requires it"
            whatHappens="Installer reads the DNO connection offer condition ‘install ELS to G100 limited 3.68 kW’ and decides to install the system without an ELS, planning to deal with it later. DNO routine audit (or customer complaint about local voltage rise) catches the breach. DNO revokes connection agreement; customer faces disconnection or retrospective ELS install + commissioning + DNO re-acceptance. Reputation damage; legal exposure."
            doInstead="DNO connection conditions are contractual. If the DNO offer includes a G100 limit + ELS requirement, the install MUST include a G100-compliant ELS + commissioning evidence before energising. Practical sequence: G99 application → DNO offer (with any G100 condition) → customer accepts → install BOTH the generation install AND the ELS → commission BOTH BS 7671 (Reg 643) AND G100 (ENA commissioning cert) → file G100 cert with DNO → energise. Cert evidence bundle: G100 cert is REQUIRED for the install to be DNO-compliant. Treat it as part of the install scope from quote stage — budget the ELS hardware + commissioning time."
          />

          <CommonMistake
            title="Misconfiguring G100 limit value vs DNO agreement"
            whatHappens="DNO offer says 3.68 kW; installer configures ELS at 5 kW thinking ‘close enough’. Customer’s export occasionally exceeds 3.68 kW (well below 5 kW configured limit). DNO routine audit catches the discrepancy. Same consequences: revoked connection, retrospective reconfiguration + recommissioning."
            doInstead="The G100 limit must match the DNO agreement EXACTLY. The G99 connection offer specifies the limit; ELS configured at that value; commissioning cert records the value verified. Pre-energisation checklist: read the G99 offer, read the ELS configuration, confirm they match exactly. If customer + DNO later negotiate a higher limit (e.g. network reinforced, customer wants more export), formal process: customer requests amendment → DNO accepts → ELS reconfigured → G100 recommissioning → new cert filed. Cert evidence: G100 commissioning cert + DNO connection agreement reference + matching value."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'EREC G100 = ENA-published Engineering Recommendation for Customer Export Limitation Schemes. UK DNO compliance instrument; not BS 7671.',
              'Use case: customer installs more generation than DNO network can accept as gross export; G100 ELS limits actual export to an agreed value; DNO approves connection without reinforcement.',
              'Soft limiting: ELS measures + curtails inverter via Modbus; inverter runs at reduced power; <5 s response. UK 2025-26 dominant.',
              'Hard limiting: ELS measures + disconnects generator via contactor on exceedance; generator inactive until reset. Used for zero-export or DNO zero-tolerance.',
              'Framework relationships: G98 (small-scale fast-track), G99 (formal larger-scale), G100 (export limit constraint). Typical UK 2025-26: G99 + G100 for PV + BESS on constrained network.',
              'ENA G100 approved device list: SolarEdge + Energy Meter, Solis S6 + meter, Huawei FusionSolar + Smart Power Sensor, GivEnergy AIO + EM340 / native, Enphase IQ + IQ Combiner; external Carlo Gavazzi EM340 + relay.',
              'Multi-source G100: single CT clamp at MET measures NET export; ELS curtails sources in priority hierarchy (V2G > BESS > PV); EMS coordinates above ELS.',
              'Zero-export G100: urban-constrained, landlord-owned, apartment community PV behind master meter, customer choice. Lose all SEG income; rely entirely on self-consumption.',
              'Reg 551.7.5 anti-islanding (BS 7671) + G100 export limit (EREC): both must be in place; different scopes (safety vs network compliance); both verified at commissioning.',
              'Commissioning evidence: G100 certificate signed by competent person, recording device type + serial + firmware, configured limit, soft / hard configuration, commissioning test result, DNO acceptance.',
              'Cert evidence bundle: integrated PEI EIC + Section 712 / Chapter 57 / Chapter 82 + G99 connection agreement + G100 commissioning cert + EMS configuration + DNO acceptance + customer handover.',
              'Economic case: G100 ELS £100-1,000 + clipping losses 200-500 kWh/year (£30-75) vs DNO reinforcement £5-100k + 6-24 month wait. Standard UK 2025-26 tradeoff.',
              'Recommissioning required: new generation source added, limit value changed, ELS device replaced, or per DNO connection agreement. Load addition (EV non-V2G, heat pump) typically does NOT trigger G100 recommissioning.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                10.3 Smart Export Guarantee (SEG)
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                10.5 V2G — Vehicle-to-Grid
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
