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
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm12s3-soh-vs-soc',
    question:
      'What is the difference between State of Charge (SoC) and State of Health (SoH) on a BESS?',
    options: [
      'Identical',
      'SoC = how much energy is in the battery right now as a percentage of CURRENT capacity (0-100%, dynamic, changes minute-by-minute as battery charges / discharges). SoH = how much CAPACITY remains relative to original at install (typically 100% new, drops 0.5-2% per year, 70-80% end-of-warranty threshold). SoC tells you operational state; SoH tells you lifecycle health',
      'SoC is health',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'SoC vs SoH for BESS: (1) State of Charge (SoC) — dynamic operational metric, 0-100%, represents present energy as a fraction of CURRENT capacity. Changes minute-by-minute as the battery charges (SoC rises) or discharges (SoC falls). Reported by BMS via communication interface; visible in customer portal + installer monitoring. (2) State of Health (SoH) — lifecycle metric, typically 100% at install, drops over time due to cycle ageing + calendar ageing. Represents CURRENT capacity vs original-at-install capacity. Typical lithium iron phosphate (LFP) cell degradation: ~0.5-1.5% per year depending on cycling depth + temperature + usage pattern. Most BESS warranties guarantee SoH ≥ 70% or 80% at end-of-warranty (typically 10 years). (3) BMS reports both — SoH calculated by the BMS based on internal coulomb counting + capacity measurement during full cycles. (4) Operational implications — SoC affects energy availability today (if SoC = 20% you have less to discharge); SoH affects energy availability over years (SoH = 80% means the same 10 kWh nominal battery only holds 8 kWh now). (5) Cert evidence bundle baseline — SoH = 100% recorded at commissioning becomes the lifecycle baseline against which periodic condition reporting tracks. (6) Customer education — operating guide explains both terms; portal shows both; alerts on SoH degradation.',
  },
  {
    id: 'm12s3-bms-reporting-scope',
    question:
      'What does a modern BMS continuously monitor + report?',
    options: [
      'Just SoC',
      'Modern BMS reports comprehensively: per-cell voltage (typically tens-hundreds of cells in a residential BESS), per-cell or per-module temperature, pack-level SoC + SoH, DC bus voltage + current, charge / discharge cycle count, fault states (over-voltage, under-voltage, over-temp, over-current, isolation fault), communications health, firmware version, alarm history. The data is logged + accessible via the customer monitoring portal + installer cloud + integrated into cert evidence bundle for periodic review',
      'Random',
      'Only voltage',
    ],
    correctIndex: 1,
    explanation:
      'Modern BMS comprehensive monitoring: (1) Per-cell voltage — typically every cell (LFP residential BESS has 16-32+ cells per module; large commercial may have hundreds). Cell-balance is critical for safe operation + capacity. (2) Per-cell or per-module temperature — thermal management is safety-critical for lithium chemistry. Multiple temperature sensors. (3) Pack-level metrics — SoC, SoH, DC bus voltage, DC bus current, instantaneous power. (4) Cycle counting — charge / discharge cycle accumulator; full-equivalent-cycles vs partial cycles tracked separately; influences SoH calculation. (5) Fault states — over-voltage, under-voltage, over-temperature, over-current, isolation fault (insulation degradation), communication fault, BMS internal fault. (6) Communications — BMS to inverter to cloud / portal; comms health monitored. (7) Firmware version — track for security + capability updates. (8) Alarm history — events logged with timestamp + severity for troubleshooting + warranty claims. (9) Accessibility — manufacturer-installer portal + customer-facing portal (often simplified); installer cloud for fleet monitoring + bulk EICR-equivalent reporting. (10) Cert evidence bundle integration — commissioning baseline (SoH 100% + per-cell voltages all in spec) + ongoing review at EICR cycles.',
  },
  {
    id: 'm12s3-eicr-equivalent',
    question:
      'What is an "EICR-equivalent" for BESS + how does it differ from standard AC EICR?',
    options: [
      'Same as AC EICR',
      'EICR-equivalent for BESS = periodic condition report adapted to the storage technology. Differences: (1) BMS data review — pull SoH trend + per-cell balance + fault history + cycle count from the BMS portal; (2) DC bus IR re-test per manufacturer + Table 64; (3) thermal imaging of connections + cells where possible (Reg 651.4); (4) functional verification of alarms + anti-islanding; (5) firmware check (security + capability); (6) manufacturer warranty review (most BESS have 10-yr SoH warranty); (7) AC-side EICR per standard. Frequency: aligned with AC EICR cycle (5-10 yr typical) + BMS continuous + manufacturer-recommended periodic',
      'No EICR',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'EICR-equivalent for BESS extends standard AC EICR with storage-specific elements: (1) BMS data review (the key BESS-specific input) — extract SoH trend over the period, per-cell voltage balance, fault history, cycle count, thermal events, comms health. The BMS-reported metrics are the lifecycle picture. (2) DC bus IR re-test — per manufacturer + Table 64; trend against commissioning baseline. (3) Thermal imaging — Reg 651.4 photographic + thermographic images can be appended to the report; thermal imager on connections + cells / modules where access permits identifies hot spots + degraded connections. (4) Functional verification — alarms triggered + verified + clearable; anti-islanding self-test per manufacturer; emergency shutdown functional. (5) Firmware check — BMS + inverter firmware up-to-date; security patches applied. (6) Manufacturer warranty review — most BESS have 10-yr warranty with SoH threshold (≥ 70% or 80%); document warranty status + alert customer if approaching. (7) AC-side EICR — standard Chapter 65 + Reg 651-653 review of the AC connections + protective devices. (8) Frequency — Reg 652.1 considers type of installation, equipment, use, maintenance, external influences; typical residential aligned to 5-10 yr cycle + BMS continuous between. (9) Documentation — EICR report + BMS data export + thermal images + manufacturer warranty status + cert evidence bundle updated.',
  },
  {
    id: 'm12s3-bms-data-cert',
    question:
      'How does BMS data integrate into the cert evidence bundle over the BESS lifecycle?',
    options: [
      'It doesn\'t',
      'BMS data integrates at three stages: (1) Commissioning baseline — SoH 100% + per-cell voltages + initial cycle count = 0 + fault history empty + firmware version; recorded in initial cert evidence bundle. (2) Periodic snapshot — at EICR-equivalent (5-10 yr) extract BMS data: current SoH, cycle count, fault history summary, firmware updates applied; compare with baseline + previous periodic. (3) End-of-life / warranty event — extract BMS data + manufacturer warranty claim documentation. The BMS data is the lifecycle audit trail',
      'Only at install',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'BMS data lifecycle integration with cert evidence bundle: (1) Commissioning baseline — at IV (M12.1-12.2), the manufacturer commissioning engineer + electrician extract initial BMS data: SoH = 100%, per-cell voltage balance (within manufacturer spec, typically all cells within 20-50 mV at given SoC), cycle count = 0, fault history empty, firmware version, alarm thresholds. This baseline is the lifecycle reference. (2) Periodic EICR-equivalent — at 5-10 yr cycle (Reg 652.1), extract current BMS data: SoH now (typical 80-90% after 5 yr cycling), per-cell balance (any cells drifting indicates issues), cycle count (cumulative), fault history summary (logged events + clearance), firmware updates applied + current version. Compare with baseline + previous periodic. (3) Warranty / replacement event — if BESS underperforms warranty SoH threshold OR develops persistent fault, extract BMS data for manufacturer claim. (4) End-of-life — when BESS retired (lifecycle 10-20 yr), extract BMS data for recycling documentation + customer record. (5) Customer-facing — simplified customer portal shows current SoC + SoH + yield; full BMS data goes to installer + manufacturer. (6) Documentation flow — every interaction with the BESS feeds the cert evidence bundle; comprehensive lifecycle record supports warranty + safety + customer transparency.',
  },
];

const quizQuestions = [
  {
    question:
      '5-year EICR-equivalent on a 10 kWh BESS. BMS reports SoH = 85%, no faults, 1200 full-equivalent cycles. What is the verifier\'s read?',
    options: [
      'Replace immediately',
      'Healthy at 5 yr. SoH = 85% is within typical LFP degradation curve (0.5-1.5%/yr × 5 yr = 7.5-15% degradation; 85% is mid-range). 1200 cycles in 5 yr = ~240 cycles/yr = ~0.66 cycles/day = reasonable for daily PV-paired self-consumption. No faults = BMS reports clean. Verifier records: SoH baseline → current trend, cycle count, confirm warranty status (most BESS warranties guarantee 70-80% SoH at 10 yr — on track), perform DC bus IR + functional verification + AC EICR. Report as satisfactory continued service',
      'No assessment possible',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'BESS condition assessment at 5 yr: SoH = 85% + no faults + 1200 cycles is a healthy lifecycle position for typical LFP BESS. (1) SoH interpretation: LFP degradation typically 0.5-1.5% per year depending on usage pattern; 5 yr × 1% average = 5% loss; 85% SoH means 15% lost — slightly above average but within normal range. (2) Cycle count interpretation: 1200 cycles / 5 yr = ~240 cycles/yr = ~0.66 cycles/day — typical for daily PV self-consumption (one PV+discharge cycle per day). LFP cells typically rated for 4000-6000 cycles at 100% DoD, so 1200 of 4000+ available = ~30% cycle life used — well within capacity. (3) Fault history clean = good. (4) Verifier actions: extract BMS data + trend chart (SoH from 100% at commissioning to 85% now); confirm cycle count vs manufacturer rated cycles; review alarm history (none); per-cell voltage balance review; DC bus IR re-test per manufacturer; thermal imaging connections + visible cells; AC-side EICR; firmware check; manufacturer warranty status (warranty typically 10 yr, ~70-80% SoH threshold; at 85% with 5 yr remaining at ~1%/yr trajectory = ~80% at 10 yr = meets warranty). (5) Report — satisfactory for continued service; customer informed of expected lifecycle trajectory; next EICR-equivalent in 5 yr.',
  },
  {
    question:
      'BMS reports SoH = 65% at 3-year EICR-equivalent on a 10 kWh BESS. What is the trigger for action?',
    options: [
      'Acceptable',
      'Investigate + warranty claim. 65% SoH at 3 yr is significantly below expected curve (typical 95-97% at 3 yr). Triggers: (1) extract BMS data — review cycle count (excessive cycling? deep DoD on every cycle?), fault history (recurring over-temp? cell imbalance?), per-cell voltage (any cells drifted out of pack?); (2) thermal imaging of cells + connections; (3) manufacturer warranty engagement — most BESS warranties guarantee SoH not below 70-80% within warranty period; 65% at 3 yr is a warranty event; (4) customer informed + manufacturer claim initiated; (5) interim operational decision — may continue limited use or take offline pending replacement',
      'Random',
      'No action',
    ],
    correctAnswer: 1,
    explanation:
      'Premature SoH degradation at 3-year EICR-equivalent: 65% SoH is FAR below expected curve. Expected at 3 yr: 95-97% (typical LFP 1%/yr loss). 65% = 35% loss = ~5x faster than expected. Triggers: (1) BMS data deep-dive — cycle count (excessive cycling indicates usage pattern issue or BMS misreport); fault history (recurring over-temp events accelerate degradation; cell imbalance suggests cell or module failure); per-cell voltage (cells drifting out of pack indicate cell failure); thermal events (over-temp accelerates capacity loss). (2) Physical inspection — thermal imager on cells + connections; visible inspection for swelling / damage / electrolyte leakage on cells where access permits. (3) Manufacturer engagement — warranty event. Most BESS warranties (Tesla Powerwall, GivEnergy, Sonnen, etc) guarantee SoH not below threshold (usually 70-80% at 10 yr); 65% at 3 yr is firmly within warranty + investigation territory. (4) Customer engagement — operating impact (battery now holds 6.5 kWh not 10 kWh); explain warranty position + manufacturer claim process; interim usage decision (may continue limited use with reduced expectations OR take offline pending resolution). (5) Documentation — comprehensive BMS data export + thermal images + verifier report + manufacturer claim correspondence; cert evidence bundle updated. (6) Root cause — installer reviews install conditions (over-temperature exposure, oversized cycling demand) + manufacturer reviews cell batch + BMS calibration. UK 2025-26 reality: warranty claims happen + manufacturer support typically engaged within 1-3 months for resolution.',
  },
  {
    question:
      'What is "cell balancing" + why does it matter for BESS condition reporting?',
    options: [
      'Cosmetic',
      'Cell balancing = the BMS function that equalises voltage across cells in series. As cells charge / discharge, slight differences cause voltage drift; without balancing the highest-voltage cell hits over-voltage cut-off + lowest-voltage cell hits under-voltage cut-off long before pack reaches full SoC range. BMS uses passive (dissipate excess from high cell via resistor) or active (transfer charge between cells) balancing. Imbalanced cells = reduced usable capacity + accelerated degradation of the weak cell + lifecycle reduction. Condition reporting: per-cell voltage review identifies imbalance; growing imbalance = cell or BMS problem',
      'Optional',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Cell balancing fundamentals: (1) Why needed — lithium cells in series have slight manufacturing variation + drift over cycles; without balancing the strongest cell hits its over-voltage cut-off first (and weakest cell hits under-voltage first) — limiting the usable pack capacity to the weakest cell. (2) Passive balancing — most common in residential BESS — high-voltage cell\'s excess charge dissipated through resistor (slow + simple + reliable). (3) Active balancing — higher-end commercial BESS — charge transferred between cells via DC-DC converter (faster + more efficient but more complex + costly). (4) Balance check at commissioning — BMS reports per-cell voltages all within manufacturer spec (typically all cells within 20-50 mV at given SoC). Initial check is structural — bad balance at commissioning indicates manufacturing defect or install fault. (5) Periodic check — at EICR-equivalent (5-10 yr) review per-cell voltage spread; growing spread (e.g. one cell consistently 100+ mV below others) indicates that cell is failing — likely warranty event. (6) Operational impact — imbalanced pack = reduced usable capacity (BMS clamps at the weakest cell\'s limits) + accelerated degradation of the weak cell + cycle life reduction. (7) Documentation — BMS data export includes per-cell voltage table; condition report identifies any anomalies; trending over EICR cycles shows degradation pattern. (8) Cert evidence bundle: commissioning baseline + periodic per-cell voltage records + any manufacturer interventions.',
  },
  {
    question:
      'BESS thermal management — what role does it play in condition reporting?',
    options: [
      'None',
      'Thermal management = the BMS + physical thermal system (heatsinks, vents, fans, sometimes liquid cooling) that keeps cells in optimum temperature range. Cells operated outside ~15-35°C accelerate degradation (cold cells = high internal resistance + capacity loss; hot cells = chemical degradation + safety risk). Condition reporting: (1) review BMS temperature logs for excursions outside range; (2) thermal imaging at EICR-equivalent identifies hot spots in cells / connections; (3) physical inspection of vents / fans / cooling; (4) any over-temp events logged indicate root cause to investigate',
      'Random',
      'Cooling only',
    ],
    correctAnswer: 1,
    explanation:
      'BESS thermal management + condition reporting: (1) Optimal temperature range — typically 15-35°C for cell operation; some chemistries tolerate -10 to 50°C with reduced performance. (2) Cold cell issues — high internal resistance + reduced charge / discharge rate + reduced capacity available + accelerated SEI layer growth = capacity loss. (3) Hot cell issues — chemical degradation accelerates exponentially with temperature; safety risk (thermal runaway at extreme temperatures); fire / explosion risk for damaged cells. (4) Thermal management system — passive (heatsinks + enclosure + spacing for natural convection — typical residential BESS); active (fans for forced air — mid-range residential); liquid cooling (some high-end residential + most commercial). (5) BMS monitoring — multiple temperature sensors logged continuously; thresholds for warning + alarm + shutdown. (6) Condition reporting elements: (a) extract BMS temperature logs over the period — look for excursions (was the BESS ever above 40°C? below 0°C? for how long?); (b) thermal imaging during EICR-equivalent — Reg 651.4 thermographic images appended; identifies hot spots in cell modules + DC busbar connections + AC terminations; (c) physical inspection — vents clear of debris / spider webs; fans rotating freely; liquid cooling levels (if applicable); enclosure ventilation per manufacturer spec; (d) install location review — has the install location heating profile changed (e.g. new boiler installed nearby; loft conversion changes garage thermal envelope)? (7) Documentation — temperature log summary + thermal images + physical inspection notes; cert evidence bundle updated.',
  },
  {
    question:
      'Customer education on BESS condition reporting — what should the installer cover?',
    options: [
      'Nothing',
      'At handover + ongoing: (1) Operating portal access — show the customer-facing portal: SoC, SoH, yield, alerts. (2) Expected lifecycle — SoH degradation curve (~1%/yr typical), warranty terms (10 yr SoH ≥ 70-80%), end-of-life trajectory. (3) Alert response — what alerts mean + when to call installer. (4) Periodic schedule — annual quick check + 5-10 yr EICR-equivalent. (5) Fault response — emergency shutdown location + procedure; never open BESS enclosure; call installer / manufacturer. (6) Records — handover pack + EICR-equivalent reports kept; warranty registration confirmed. Avoiding "silent failure" requires customer knowing what to look for',
      'Only at install',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Customer education + ongoing engagement on BESS: (1) Operating portal — show the customer how to access the manufacturer\'s customer-facing portal (web + mobile app); explain SoC (today\'s charge level), SoH (lifecycle health), yield contribution, alert indicators. Walk through a real-time view + a daily / weekly summary. (2) Expected lifecycle — SoH typically degrades ~1%/yr for LFP; 10-year warranty floor 70-80%; system functional for 15-20 yr typically with reduced capacity in later years. Manage expectations: a 10 kWh nominal BESS at 80% SoH still has 8 kWh available — useful but reduced. (3) Warranty terms — what is + isn\'t covered + the SoH threshold + the cycle count threshold + the claim process; copy of warranty in handover pack. (4) Alert response — common alert types (fault state, comms fail, low SoH warning) + customer action (note alert + call installer for non-emergency; emergency = shutdown procedure if displayed). (5) Periodic schedule — annual customer self-check (portal review, visible inspection of vents, listening for unusual fan noise); 5-10 yr professional EICR-equivalent. (6) Fault response — emergency shutdown location + procedure; categorical "do not open the enclosure" message (lithium fires non-trivial); fault → call installer or manufacturer first. (7) Records — copy of EIC + manufacturer commissioning + warranty registration + future EICR-equivalent reports kept with property documents. (8) Annual touchpoint — installer + manufacturer typically offer annual review + monitoring; signed-up customers get earlier intervention on degradation. (9) §12.7 covers customer education + handover delivery in full.',
  },
  {
    question:
      'How does Reg 651.4 photographic + thermographic image inclusion apply to BESS condition reporting?',
    options: [
      'Cosmetic only',
      'Reg 653.2 NOTE specifies photographic + thermographic images can be appended to the report. For BESS condition reporting this is valuable: (1) baseline photos at commissioning — visible inspection of installation; (2) periodic photos showing condition + any change; (3) thermal images of cells + DC busbar + AC terminations identifying hot spots; (4) physical inspection record where BMS data alone doesn\'t tell the full story (e.g. enclosure damaged, vents blocked, signs of moisture ingress). Images provide audit trail + customer transparency + warranty evidence',
      'Mandatory',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 653.2 NOTE: photographic + thermographic images can be appended to the report. For BESS condition reporting: (1) Baseline photos at commissioning — front + side view of BESS in installed position; close-ups of nameplate + warning labels + isolators; serial numbers + manufacturer DoC references visible; cable routing + termination quality. (2) Periodic photos at EICR-equivalent — same angles as baseline; identifies physical change (damage, soiling, modification, signs of moisture). (3) Thermal images — Reg 651.4: measuring instruments + monitoring methods chosen per BS EN 61557 — thermal imager. Key target areas: cell modules (any hot spots indicate internal cell issue); DC busbar connections (loose / corroded = high resistance = heat); AC terminations; fuse + breaker contact points; cooling system performance. (4) Image storage — digital + paper copies; integrated into cert evidence bundle. (5) Customer-facing — selected images included in customer report for transparency + warranty evidence. (6) Warranty + audit value — images are evidence in warranty claims + dispute resolution + audit trail for future verifiers. (7) Privacy + security — BMS data + photos may include identifying information; handle per GDPR / customer privacy expectations. (8) Integration with BMS data — thermal images + BMS temperature logs together tell a richer story than either alone (e.g. BMS logs no over-temp but thermal image shows hot DC busbar connection — caught only by physical inspection).',
  },
];

const faqs = [
  {
    question: 'How often should a BESS be condition-reported?',
    answer:
      'BMS continuously monitors + reports anomalies. Annual customer self-check (portal review). 5-10 yr professional EICR-equivalent aligned with AC EICR cycle per Reg 652.1 — taking into account type of installation, equipment, use, maintenance, external influences. Most manufacturers also offer paid annual monitoring services; consider with the customer.',
  },
  {
    question: 'What if the manufacturer goes bust + portal access ends?',
    answer:
      'Real risk — UK 2025-26 has seen some BESS manufacturers exit. Mitigations: (1) prefer manufacturers with established support contracts + open data export at install; (2) ensure customer has local BMS access (touchscreen + local network where supported, not cloud-only); (3) document the BMS data export procedure at handover; (4) cert evidence bundle keeps installer-side records independent of manufacturer. For warranty: extended-warranty insurance products emerging in UK market 2025-26.',
  },
  {
    question: 'Can the customer override the BMS for "more capacity"?',
    answer:
      'No. BMS manages safety + lifecycle thresholds; bypassing is unsafe + voids warranty + risks fire. The "more capacity" customer typically means SoH-degraded BESS — the answer is warranty claim or replacement, not bypass. Customer education at handover covers this; operating guide explicit that BMS settings are not user-adjustable.',
  },
  {
    question: 'Does the cell-level data go to the customer portal?',
    answer:
      'Typically a simplified view: SoC + SoH + yield + alerts. Per-cell voltage + temperature detail goes to the installer / manufacturer portal — not the customer-facing portal. The customer education sets the right level of detail; the installer reviews the per-cell detail at EICR-equivalent + on alarm.',
  },
  {
    question: 'How does BESS condition reporting interact with insurance?',
    answer:
      'Some home insurance policies require BESS to be commissioned + maintained per manufacturer + UK BS 7671 compliance. EICR-equivalent reports + cert evidence bundle support the insurance position. Newer policies may include BESS-specific clauses; older policies may not explicitly cover BESS. Customer encouraged to confirm with insurer + share commissioning + condition reports as evidence.',
  },
];

export default function RenewableEnergyModule12Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'BESS health monitoring + condition reporting | Renewable Energy 12.3 | Elec-Mate',
    description:
      'State of Health (SoH) + State of Charge (SoC) reporting via BMS. Capacity-fade monitoring. EICR-equivalent for storage — periodic test framework. Integrating BMS data into the cert evidence bundle. Customer education + handover. Reg 651-653 + BS 7671 applied to storage lifecycle.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-12')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 12
          </button>

          <PageHero
            eyebrow="Module 12 · Section 3 · BS 7671:2018+A4:2026 · Chapter 65 + Reg 651-653 + Chapter 57"
            title="BESS health monitoring + ongoing condition reporting"
            description="The storage lifecycle — State of Health (SoH) + State of Charge (SoC) via BMS, capacity-fade monitoring, EICR-equivalent for storage, integration of BMS data into the cert evidence bundle, customer education + ongoing engagement. BS 7671 Chapter 65 periodic inspection + testing applied to BESS specifics."
            tone="yellow"
          />

          <TLDR
            points={[
              'BMS continuously monitors + reports: per-cell voltage, temperature, pack SoC + SoH, DC bus voltage + current, cycle count, fault states, communications health, firmware version.',
              'SoH = capacity remaining vs original-at-install; ~0.5-1.5%/yr LFP degradation typical; warranty floor typically 70-80% at 10 yr.',
              'SoC = present energy as fraction of CURRENT capacity (dynamic, minute-by-minute).',
              'EICR-equivalent for BESS = standard AC EICR + BMS data review + DC bus IR re-test + thermal imaging + firmware + warranty review + per-cell balance check.',
              'Frequency per Reg 652.1: type of installation + use + maintenance + external influences. Typical 5-10 yr aligned with AC EICR + BMS continuous between.',
              'Reg 653.2 NOTE: photographic + thermographic images can be appended to the report. Thermal imaging identifies hot spots invisible to BMS alone.',
              'Cell balancing keeps cells equal voltage across pack; growing imbalance = cell failure indicator; passive (resistor dissipation) or active (charge transfer) per BMS design.',
              'Thermal management critical — cells outside 15-35°C accelerate degradation. BMS temperature logs + thermal imaging + physical inspection together.',
              'Customer education at handover + annual touchpoint — portal access, expected lifecycle, alert response, periodic schedule, warranty terms.',
              'BMS data integrates with cert evidence bundle at commissioning baseline + periodic snapshots + warranty / end-of-life events.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish SoC (operational) from SoH (lifecycle) on BESS reporting.',
              'Interpret BMS data: per-cell voltage, temperature, cycle count, fault history, comms health.',
              'Conduct EICR-equivalent for BESS combining standard AC EICR with storage-specific elements.',
              'Apply Reg 652.1 frequency logic to BESS periodic inspection cycle.',
              'Integrate BMS data into cert evidence bundle across commissioning + periodic + warranty events.',
              'Use thermal imaging per Reg 653.2 to complement BMS reporting at periodic inspection.',
              'Identify cell-balance issues + thermal management failures + their lifecycle impact.',
              'Educate customer on BESS lifecycle expectations, alerts, periodic schedule, warranty.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The BMS is the BESS\'s self-report. The EICR-equivalent is the audit. Together they catch silent failures before they become customer complaints — or fires.
          </Pullquote>

          <ContentEyebrow>SoC vs SoH + BMS reporting framework</ContentEyebrow>

          <ConceptBlock
            title="BMS continuous monitoring scope"
            plainEnglish="Modern BESS BMS continuously monitors comprehensively: per-cell voltage + temperature, pack SoC + SoH, DC bus voltage + current, cycle count, fault states, comms health, firmware version, alarm history. Data accessible via manufacturer portal (installer + customer views). BMS commissioning at install + ongoing operation = the storage lifecycle picture."
            onSite="BESS BMS replaces the need for many manual checks the electrician would do on a non-BMS system. But the BMS doesn\'t replace periodic EICR-equivalent inspection — physical inspection + thermal imaging + DC bus IR re-test catch issues the BMS doesn\'t see (loose AC terminations, blocked vents, enclosure damage, BMS itself drifting)."
          >
            <p>BMS monitoring elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-cell voltage</strong> —
                every cell in series typically monitored; balance critical for safety
                + capacity
              </li>
              <li>
                <strong className="text-white">Per-cell or
                  per-module temperature</strong> — multiple sensors; safety + lifecycle
                impact
              </li>
              <li>
                <strong className="text-white">Pack-level
                  metrics</strong> — SoC (0-100%), SoH (% of original capacity), DC bus
                voltage + current, instantaneous power
              </li>
              <li>
                <strong className="text-white">Cycle counting</strong>
                — full-equivalent-cycles + partial-cycles tracked; influences SoH
                + warranty
              </li>
              <li>
                <strong className="text-white">Fault states</strong>
                — over-voltage, under-voltage, over-temp, over-current, isolation fault,
                comms fault, BMS internal fault
              </li>
              <li>
                <strong className="text-white">Communications
                  health</strong> — BMS to inverter to cloud / portal; comms loss
                triggered alerts
              </li>
              <li>
                <strong className="text-white">Firmware
                  version</strong> — BMS + inverter firmware tracked; updates applied
                via portal or service visit
              </li>
              <li>
                <strong className="text-white">Alarm history</strong>
                — events logged with timestamp + severity for troubleshooting +
                warranty + audit
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="SoH degradation curve + LFP characteristics"
            plainEnglish="LFP (Lithium Iron Phosphate) is the dominant residential BESS chemistry in UK 2025-26 (Tesla Powerwall 3, GivEnergy, Sonnen, Sonnen, Anker SOLIX, etc). LFP characteristics: lower energy density than NMC but more cycles + better thermal stability + safer. SoH degrades ~0.5-1.5%/yr depending on usage pattern + temperature + DoD."
            onSite={`Customer expectation management at handover: explain typical degradation; 10-yr warranty floor (70-80%); operational impact (10 kWh nominal at 80% SoH = 8 kWh usable). Realistic numbers prevent customer complaints about "my battery doesn't hold as much" later in life.`}
          >
            <p>SoH degradation factors:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Calendar
                  ageing</strong> — degradation over time regardless of usage; ~0.3-0.5%/yr
                baseline for LFP
              </li>
              <li>
                <strong className="text-white">Cycle ageing</strong>
                — degradation per cycle; ~0.02-0.04% per full equivalent cycle for LFP
              </li>
              <li>
                <strong className="text-white">DoD (Depth of
                  Discharge)</strong> — deeper cycles (e.g. 100% DoD daily) accelerate
                ageing more than shallower (e.g. 80% DoD). Most BMS limit DoD to 90-95%
                to extend life
              </li>
              <li>
                <strong className="text-white">Temperature</strong>
                — operating outside 15-35°C accelerates degradation. Cold storage
                also bad — winter performance + lifecycle hit
              </li>
              <li>
                <strong className="text-white">SoC at
                  storage</strong> — storing at very high or very low SoC accelerates
                ageing; BMS typically targets ~50% for long-term storage
              </li>
              <li>
                <strong className="text-white">Usage pattern</strong>
                — daily PV-paired self-consumption (1 cycle/day) is moderate; grid
                arbitrage (2-3 cycles/day) accelerates; emergency-backup-only (1 cycle
                per month) is calendar-ageing-dominated
              </li>
              <li>
                <strong className="text-white">Warranty
                  reality</strong> — most BESS warranties: 10 yr + SoH ≥ 70-80% +
                throughput limit (e.g. ~3-5 MWh per kWh nominal). Whichever comes first
              </li>
              <li>
                <strong className="text-white">End-of-life</strong>
                — at SoH ~60-70% the operational utility diminishes; customer
                replacement decision; recycling per battery regulations
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 652.1 — Frequency of periodic inspection + testing"
            clause="The frequency of periodic inspection and testing of an installation shall be determined having regard to the type of installation and equipment, its use and operation, the frequency and quality of maintenance and the external influences to which it may be subjected. The results and recommendations of previous certificates and condition reports shall also be taken into account."
            meaning="Reg 652.1 is the frequency rule for periodic inspection. For BESS the frequency considerations: (1) Type of installation — residential vs commercial; LFP vs NMC; integrated package vs hybrid system. (2) Equipment use + operation — daily cycling vs emergency backup; depth of cycling; environmental exposure. (3) Maintenance — has the manufacturer monitoring + annual review been engaged? BMS firmware updates applied? Any prior interventions? (4) External influences — temperature range at install location; humidity; dust; vibration; proximity to other equipment. (5) Previous reports — manufacturer commissioning baseline + any prior EICR-equivalents + alarm history. Typical UK 2025-26 BESS EICR-equivalent: 5-10 yr aligned with AC EICR cycle for the property, with BMS continuous between + customer annual touchpoint + manufacturer scheduled monitoring where contracted. Some commercial sites with intensive cycling may warrant 3-5 yr cycles. Cert evidence bundle records the frequency rationale + the EICR-equivalent findings."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>EICR-equivalent for BESS — periodic test framework</ContentEyebrow>

          <Pullquote>
            The BMS is the day-to-day. The periodic EICR-equivalent is the lifecycle audit. Both matter. Neither alone is enough.
          </Pullquote>

          <ConceptBlock
            title="EICR-equivalent for BESS — the periodic framework"
            plainEnglish="EICR-equivalent for BESS extends the standard AC EICR with storage-specific elements: BMS data review (SoH trend, per-cell balance, fault history, cycle count); DC bus IR re-test; thermal imaging; firmware check; manufacturer warranty review; AC-side EICR. Typically 5-10 yr cycle aligned with the property AC EICR."
            onSite="The verifier needs both BS 7671 EICR competency + BESS-specific competency (manufacturer-certified installer training + BMS data interpretation). UK 2025-26: most BESS EICR-equivalents handled by the original installer or manufacturer-affiliated service company; growing market for independent BESS inspection services."
          >
            <p>EICR-equivalent elements for BESS:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">BMS data review</strong>
                — extract: current SoH, cycle count, fault history summary, per-cell
                voltage balance, comms health, firmware version, temperature event
                summary. Compare with baseline + previous periodic
              </li>
              <li>
                <strong className="text-white">DC bus IR
                  re-test</strong> — per manufacturer + Table 64; trend against
                commissioning baseline; investigation triggered if approaching
                threshold or significant drop from baseline
              </li>
              <li>
                <strong className="text-white">Thermal
                  imaging</strong> — Reg 653.2 NOTE: thermographic images appended.
                Target cells / modules + DC busbar + AC terminations + cooling system.
                Identifies hot spots invisible to BMS
              </li>
              <li>
                <strong className="text-white">Physical
                  inspection</strong> — enclosure integrity; vent / fan / cooling
                operation; cable routing intact; warning notices intact; isolators
                functional; mounting + securing
              </li>
              <li>
                <strong className="text-white">Functional
                  verification</strong> — alarms triggered + verified + clearable;
                anti-islanding self-test per Reg 551.7.5; emergency shutdown functional;
                charge / discharge functional via BMS-controlled test
              </li>
              <li>
                <strong className="text-white">Firmware
                  check</strong> — BMS + inverter firmware up-to-date; security patches
                applied; manufacturer-recommended updates installed
              </li>
              <li>
                <strong className="text-white">Manufacturer
                  warranty review</strong> — status (years remaining, throughput vs limit,
                SoH vs threshold); document approach to warranty floor; engage
                manufacturer if anomalies
              </li>
              <li>
                <strong className="text-white">AC-side EICR</strong>
                — standard Chapter 65 + Reg 651-653 review of AC connections,
                protective devices, RCD, loop impedance, ADS, IR, continuity
              </li>
              <li>
                <strong className="text-white">Reporting +
                  cert evidence bundle</strong> — EICR-equivalent report + BMS data
                export + thermal images + manufacturer correspondence; integrated
                into cert evidence bundle; customer copy + installer audit + DNO
                where applicable
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Cell balance + thermal management — the two key indicators"
            plainEnglish="Beyond SoH headline, two BMS data points are the early-warning indicators: (1) per-cell voltage balance — growing spread between cells indicates a cell or BMS issue; (2) temperature log — excursions outside 15-35°C accelerate degradation + indicate environmental or cooling issue. Reviewing both at EICR-equivalent catches lifecycle problems before they become headline degradation."
            onSite="The verifier extracts BMS data + plots the cell-voltage spread + temperature log over the period; identifies trends + outliers. The conversation with manufacturer + customer is led by the data."
          >
            <p>Cell balance + thermal management diagnostics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Cell voltage
                  spread baseline</strong> — at commissioning all cells within
                manufacturer spec (typically 20-50 mV at given SoC). Spread = ~10-20 mV
                typical at install
              </li>
              <li>
                <strong className="text-white">Cell voltage
                  spread trending</strong> — annual review (or at EICR-equivalent)
                shows spread growing over time. Doubling spread = ~normal ageing;
                tripling or specific cell drifting = investigation
              </li>
              <li>
                <strong className="text-white">Cell failure
                  signature</strong> — one cell consistently 50-100+ mV below others +
                self-discharging faster + losing balance after balancer activity =
                cell failure. Manufacturer warranty event
              </li>
              <li>
                <strong className="text-white">Temperature
                  baseline</strong> — at install ambient 15-25°C typical; cell temp
                during operation 20-30°C; manufacturer spec defines acceptable range
              </li>
              <li>
                <strong className="text-white">Temperature
                  excursion trending</strong> — annual review shows over-temp events:
                date + duration + temperature reached + cause. Hot summer afternoons?
                Failed fan? Vents blocked? Install location moved?
              </li>
              <li>
                <strong className="text-white">Cold storage
                  events</strong> — winter -5°C events affect LFP performance + lifecycle.
                Garage installations vulnerable; conditioned-room installations more
                stable
              </li>
              <li>
                <strong className="text-white">Thermal
                  imaging</strong> — cells / modules + DC busbar + AC terminations.
                Hot spot on DC busbar = loose / corroded connection (high resistance =
                I²R heat); hot cell modular = internal cell issue
              </li>
              <li>
                <strong className="text-white">Documentation</strong>
                — per-cell voltage table + temperature log summary + thermal images +
                analysis + manufacturer correspondence
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 653.2 — Photographic + thermographic images in periodic reports"
            clause="A note has also been added pointing out that photographic and/or thermographic images can be appended to the report."
            meaning="Reg 653.2 NOTE explicitly enables photographic + thermographic images as report appendices. For BESS condition reporting this is high-value: (1) Baseline photos at commissioning capture the as-installed state — visible inspection of front + side; close-up of nameplate + serial number + DoC reference; isolator + warning notice + cable routing + termination quality. Reference point for future periodic. (2) Periodic photos capture change — damage, soiling, modification, signs of moisture, mounting integrity. Side-by-side with baseline reveals problems. (3) Thermographic images — Reg 651.4 measuring methods includes thermal imager (BS EN 61557 compliance broader than just the standard MFT). Target areas: cell modules (BMS thermal sensors are internal; thermal image of enclosure surface + module casing identifies hot zones); DC busbar connections (high-resistance connections = I²R heat = thermal hot spot); AC terminations; fuse / breaker contact points; cooling system performance (running fan vs failed fan visibly different). (4) Storage + presentation — digital + paper copies; integrated into cert evidence bundle; selected images for customer report. (5) Warranty + audit value — images are evidence in warranty claims + dispute resolution + future-verifier reference. (6) Privacy + security — BMS data + photos may include identifying information; GDPR-aware handling."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Cert evidence bundle integration + customer engagement</ContentEyebrow>

          <ConceptBlock
            title="BMS data + cert evidence bundle across the BESS lifecycle"
            plainEnglish="BMS data integrates at three stages: (1) commissioning baseline — SoH = 100%, per-cell voltages, initial cycle count, fault history empty, firmware version; (2) periodic EICR-equivalent — current data + trend vs baseline + previous periodic; (3) warranty / end-of-life event — BMS data supports manufacturer claim + lifecycle documentation."
            onSite="The cert evidence bundle becomes the lifecycle dossier — accessible to the customer + installer + manufacturer + future verifiers + insurance + warranty claims. Comprehensive record = simpler resolution when issues arise."
          >
            <p>Lifecycle integration stages:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Commissioning
                  baseline</strong> — IV records: SoH = 100%, per-cell voltage table,
                cycle count = 0, fault history empty, firmware version, alarm
                thresholds + safety limits, manufacturer commissioning record
              </li>
              <li>
                <strong className="text-white">Annual customer
                  touchpoint</strong> — portal review + customer self-check + installer
                summary email; not necessarily BMS data export but visible monitoring
              </li>
              <li>
                <strong className="text-white">EICR-equivalent
                  (5-10 yr)</strong> — comprehensive BMS data extract + DC bus IR
                re-test + thermal imaging + functional verification + warranty review;
                report + cert evidence bundle update
              </li>
              <li>
                <strong className="text-white">Alarm + fault
                  events</strong> — BMS alarm triggers manufacturer + installer alert;
                response documented + integrated into cert evidence bundle
              </li>
              <li>
                <strong className="text-white">Warranty
                  claim</strong> — premature degradation OR fault triggers claim; BMS
                data + EICR-equivalent reports + thermal images + manufacturer
                correspondence all in cert evidence bundle
              </li>
              <li>
                <strong className="text-white">Firmware
                  updates</strong> — BMS + inverter firmware updates logged; security
                + capability + bug-fix tracked
              </li>
              <li>
                <strong className="text-white">End-of-life</strong>
                — BESS retired (15-20 yr typical); BMS final data extract; recycling
                + disposal per battery regulations; cert evidence bundle closed
              </li>
              <li>
                <strong className="text-white">Replacement</strong>
                — new BESS install treated as new commissioning + cert evidence bundle
                opens new lifecycle. Old cert bundle retained for property + audit
                history
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer education + the annual touchpoint"
            plainEnglish="Customer education is critical for BESS — avoiding silent failures requires the customer engaged with the portal, alert response, periodic schedule, warranty terms. At handover + ongoing the installer guides the customer through the lifecycle."
            onSite="UK 2025-26 reality: many BESS owners are not technical; the installer\'s clear simple guidance prevents misunderstanding (e.g. why SoH falls; why winter cycling is reduced). Annual touchpoint maintains the relationship + catches issues early."
          >
            <p>Customer education topics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Portal access</strong>
                — demo + walkthrough at handover; customer logs in successfully + can
                read the views relevant to them
              </li>
              <li>
                <strong className="text-white">SoC vs SoH</strong>
                — operational vs lifecycle in plain English; "today\'s charge" vs
                "battery health"
              </li>
              <li>
                <strong className="text-white">Expected
                  degradation</strong> — ~1%/yr typical; 10-yr warranty floor; SoH 80%
                still useful (10 kWh nominal = 8 kWh usable)
              </li>
              <li>
                <strong className="text-white">Warranty terms</strong>
                — copy in handover pack; SoH threshold + cycle count + throughput
                limit; claim process
              </li>
              <li>
                <strong className="text-white">Alert response</strong>
                — what alerts mean + customer action; emergency shutdown procedure
                visible
              </li>
              <li>
                <strong className="text-white">Periodic
                  schedule</strong> — annual customer self-check + 5-10 yr professional
                EICR-equivalent
              </li>
              <li>
                <strong className="text-white">Operating
                  envelope</strong> — temperature range, vent clearance, do not modify,
                do not open enclosure, fault → call installer
              </li>
              <li>
                <strong className="text-white">Annual
                  touchpoint</strong> — installer or manufacturer-affiliated annual
                review (paid service typically £50-150/yr); maintains relationship +
                catches early issues
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 65 + Reg 651.4 — Periodic inspection + reporting"
            clause="Reg 651.4: Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report. Reg 651.5: The periodic inspection and testing shall be carried out by one or more skilled persons competent in such work."
            meaning="Reg 651.4 + Reg 651.5 set the reporting + competency requirements for periodic inspection. For BESS this means: (1) Reg 651.4 — the EICR-equivalent report records any damage (enclosure, cabling, mounting), deterioration (SoH drop beyond expected curve, cell imbalance growing, thermal events accumulating), defects (BMS fault recurrences, comms losses, firmware not up-to-date), dangerous conditions (over-temp events, isolation degradation, cell swelling). Photographic + thermographic images per Reg 653.2 NOTE complement the textual report. (2) Reg 651.5 — competent skilled person: BS 7671 EICR competency + BESS-specific competency (manufacturer-certified installer or equivalent + BMS data interpretation + Chapter 57 understanding). (3) Customer-facing report — clear summary + technical detail in appendix; recommendations + actions + follow-up timeline. (4) Cert evidence bundle integration — report + BMS data + thermal images + manufacturer correspondence all retained. (5) Frequency — Reg 652.1 considers installation type, use, maintenance, external influences; typical 5-10 yr aligned with AC EICR. (6) Documentation flow — installer → customer + installer audit + manufacturer where applicable + insurance + future verifiers."
          />

          <InlineCheck {...inlineChecks[3]} />

          <DiagramPlaceholder
            caption="BESS lifecycle monitoring + condition reporting diagram. Top: BMS continuous monitoring scope — per-cell voltage + temperature, pack SoC + SoH, DC bus, cycle count, fault states, comms, firmware. Middle: lifecycle stages — commissioning baseline (SoH 100%, cycle 0, balanced, no faults) → daily operation (BMS continuous, portal access) → annual touchpoint (customer self-check, installer summary) → EICR-equivalent every 5-10 yr (full data review + DC bus IR + thermal imaging + functional + warranty + AC EICR) → warranty / replacement / end-of-life. Bottom: cert evidence bundle integration — commissioning + periodic snapshots + alarm events + warranty correspondence + photographic + thermographic images per Reg 653.2 NOTE."
            filename="renewable/m12s3-bess-lifecycle-monitoring.png"
          />

          <SectionRule />

          <Scenario
            title="5-year EICR-equivalent on residential 10 kWh BESS — healthy"
            situation="Mr + Mrs Patel, 4-bed detached, garage-installed 10 kWh GivEnergy LFP BESS commissioned 5 years ago alongside 8 kWp PV. AC EICR due for the property. Original installer engaged for combined AC EICR + BESS EICR-equivalent."
            whatToDo="(1) Pre-visit: download BMS data via installer portal — SoH trend over 5 yr (100% → 88%), cycle count 1450 (~290/yr daily PV self-consumption), fault history (1 comms loss recovered automatically; no other faults), per-cell voltage balance (latest spread 30 mV — slight growth from 15 mV at commissioning), temperature log (no events outside 5-35°C range; couple of summer-day peaks at 33°C — within spec), firmware updates applied 4 times over 5 yr. (2) On-site Reg 642 inspection — visual: enclosure clean + intact; vents clear; isolators functional; warning notices intact; cable routing intact + no damage. (3) DC bus IR re-test — per GivEnergy DoC: 500 V DC test for the 48 V residential bus; result 25 MΩ (vs commissioning 30 MΩ — slight drop within normal); record. (4) Thermal imaging — DC busbar connections cool; AC terminations cool; cell module casing uniform temperature (no hot spots); cooling fan running normally. (5) Functional verification — anti-islanding self-test per Reg 551.7.5; emergency shutdown tested; alarms triggered + clearable. (6) AC-side EICR — standard Chapter 65 review of CU + circuits + RCD + loop impedance + IR + continuity per Reg 651-653. (7) Manufacturer warranty review — GivEnergy warranty 10 yr + SoH ≥ 60% at 10 yr + throughput limit; current SoH 88% at 5 yr + cycle count 1450 vs throughput limit 30 MWh + ~12 MWh used = on track. (8) Report — satisfactory for continued service; trajectory consistent with expected; next EICR-equivalent in 5 yr aligned with next AC EICR; customer informed via plain-English summary + supporting BMS data chart. (9) Cert evidence bundle — updated with current report + BMS data export + thermal images + photos + AC EICR."
            whyItMatters="Healthy 5-yr EICR-equivalent demonstrates the standard discipline. SoH 88% at 5 yr + 1450 cycles + clean fault history + balanced cells + good thermal + tested anti-islanding = system in normal operational state. Cert evidence bundle update gives customer confidence + provides audit trail + supports continued warranty. Customer engagement reinforced: portal access reviewed, alert response refreshed, expectation managed (88% → ~75% by 10 yr per current trajectory). Annual touchpoint scheduled. The discipline of the periodic review prevents silent failures."
          />

          <Scenario
            title="EICR-equivalent identifies premature degradation — warranty claim path"
            situation={`Mr Khan, semi-detached, 2-yr-old 13 kWh BESS in conditioned utility room. Customer reports "battery doesn't last as long as before" via the portal. Installer dispatches EICR-equivalent visit.`}
            whatToDo={`(1) BMS data review (pre-visit + on-site): SoH 76% at 2 yr (vs expected ~98% — significantly premature); cycle count 800 (~400/yr — higher than the typical 300/yr but not extreme); per-cell voltage balance growing — one cell consistently 80 mV below others over the last 6 months; fault history shows 3 over-temp events in summer (cell temp >40°C for ~2 hours each); temperature log shows utility room peaked at 38°C ambient during summer events (utility room had new tumble dryer installed which raised ambient temperature). (2) Reg 642 inspection — find: utility room ambient now higher due to new tumble dryer venting nearby; BESS vents partially obstructed by stored items; one cell module visibly slightly bowed (potential cell failure). (3) DC bus IR re-test — 1000 V DC test (high-voltage commercial BESS bus): result 4 MΩ (vs commissioning 18 MΩ — significant drop). (4) Thermal imaging — hot spot on the bowed cell module (5°C above other modules at idle); DC busbar normal; AC terminations normal. (5) Diagnosis — one cell failing (voltage spread + bowed appearance + hot spot + IR drop); accelerated by ambient temperature exposure (new tumble dryer + obstructed vents); environmental degradation accelerated chemistry decline. (6) Warranty engagement — manufacturer (GivEnergy / Tesla / etc) contacted; warranty likely covers premature SoH below threshold; cell module replacement or whole-unit replacement per manufacturer policy. (7) Customer engagement — explain findings: cell failure + environmental contribution; warranty claim initiated; interim usage decision (continue limited use OR take offline per manufacturer guidance); environmental fix required (relocate tumble dryer ducting + clear BESS vents). (8) Report — current condition unsatisfactory for continued unmodified service; recommendations: warranty claim + environmental fix + 6-month re-inspection. (9) Cert evidence bundle — comprehensive: BMS data export + thermal images + photos + diagnosis + manufacturer correspondence + customer communication trail.`}
            whyItMatters={`Premature degradation EICR-equivalent demonstrates the value of the discipline. BMS-alone monitoring caught the SoH drop but not the environmental cause; on-site inspection + thermal imaging identified the new tumble dryer + obstructed vents + bowed cell. Manufacturer warranty engaged + customer educated + environmental cause addressed + lifecycle protected for the replacement / repaired unit. Cert evidence bundle is the audit trail for warranty + insurance + future-verifier reference. The skilled person's competency + the manufacturer relationship + the BMS data + the physical inspection together resolve.`}
          />

          <CommonMistake
            title="Trusting BMS data alone without physical inspection"
            whatHappens={`Installer relies on the BMS portal showing "all healthy" + skips the physical inspection at EICR-equivalent. Doesn't see the obstructed vents, the new heat source nearby, the loose AC termination (no thermal imaging done), the deteriorating warning notices, the moisture ingress on enclosure seal. BMS catches the symptoms (over-temp events) months later; root cause was inspection-visible from day one.`}
            doInstead={`BMS data + physical inspection + thermal imaging together. Reg 651.4: details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report. The BMS doesn't see the enclosure, the cable routing, the install environment changes, the AC termination integrity, the warning notice condition. Physical inspection + thermal imaging + BMS data review is the complete EICR-equivalent. Reg 653.2 NOTE photographic + thermographic images appended to the report. Don't shortcut the physical visit.`}
          />

          <CommonMistake
            title="Failing to engage manufacturer warranty when degradation is premature"
            whatHappens={`EICR-equivalent identifies SoH = 65% at 3 yr (significantly premature). Installer reports as "some degradation noted" + recommends continued use. Doesn't engage manufacturer warranty. Customer told the battery is degrading + replacement budget needed in a few years. 3 years later customer discovers warranty was applicable + the manufacturer would have replaced at that point — but warranty period now expired.`}
            doInstead={`Premature degradation = warranty engagement opportunity. Most BESS warranties guarantee SoH not below threshold (70-80%) within warranty period (typically 10 yr). SoH 65% at 3 yr is firmly within warranty + investigation territory. The installer's duty: identify the trigger + engage manufacturer + advocate for customer + document the BMS data + thermal images + diagnosis. Cert evidence bundle records the warranty claim correspondence. Manufacturer may replace cell module, replace whole unit, or extend warranty per their policy. Customer outcome is the metric — the discipline of the EICR-equivalent + warranty engagement is the path.`}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BMS continuously monitors comprehensively: per-cell voltage + temperature, pack SoC + SoH, cycle count, fault states, comms, firmware. The day-to-day picture.',
              'SoC = present energy as fraction of CURRENT capacity (dynamic operational). SoH = capacity remaining vs original-at-install (lifecycle).',
              'Typical LFP SoH degradation: ~0.5-1.5%/yr; 10-yr warranty floor typically 70-80%; end-of-life at ~60-70% SoH.',
              'EICR-equivalent for BESS = standard AC EICR + BMS data review + DC bus IR re-test + thermal imaging + firmware + warranty + functional verification.',
              'Frequency per Reg 652.1: type, use, maintenance, external influences. Typical 5-10 yr aligned with AC EICR + BMS continuous + customer annual touchpoint.',
              'Cell balance + temperature management are the two key early-warning indicators beyond headline SoH.',
              'Reg 653.2 NOTE: photographic + thermographic images appended to the report. Reg 651.4: damage, deterioration, defects, dangerous conditions recorded.',
              'Thermal imaging identifies what BMS doesn\'t see: DC busbar hot spots, loose AC terminations, blocked vents, bowed cell modules.',
              'Cert evidence bundle: commissioning baseline + annual touchpoint + EICR-equivalent + warranty events + firmware updates + end-of-life — the lifecycle dossier.',
              'Customer education: portal access, expected degradation, warranty terms, alert response, periodic schedule, emergency shutdown.',
              'Reg 651.5: competent skilled person — BS 7671 EICR + BESS-specific competency + manufacturer training + BMS data interpretation.',
              'Premature degradation = warranty engagement opportunity. Installer\'s duty to identify + advocate + document.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                12.2 IR on DC circuits
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                12.4 PEN faults + open-PEN protection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
