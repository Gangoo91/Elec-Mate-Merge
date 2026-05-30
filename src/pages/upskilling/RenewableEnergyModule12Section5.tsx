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
    id: 'm12s5-651-vs-641',
    question:
      'What distinguishes periodic inspection + testing (Chapter 65) from initial verification (Chapter 64)?',
    options: [
      'Identical',
      'Chapter 64 Initial Verification = the one-time check done during erection + on completion before being put into service (Reg 641.1). Establishes the install is compliant + safe at the outset. Chapter 65 Periodic Inspection + Testing = ongoing periodic checks throughout the install life. Reg 651.1: where required, periodic inspection + testing of every electrical installation shall be carried out. Different purposes: IV proves compliance at install; periodic confirms continued satisfactory condition for continued service',
      'Random',
      'Same thing',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 64 vs Chapter 65: (1) Chapter 64 — Initial Verification per Reg 641: every installation shall, during erection + on completion before being put into service, be inspected + tested to verify so far as is reasonably practicable that the requirements of BS 7671 have been met. One-time at install (or per major alteration). Output: EIC + Schedule of Inspections + Schedule of Test Results. (2) Chapter 65 — Periodic Inspection + Testing per Reg 651: where required, periodic inspection + testing of every electrical installation shall be carried out in order to determine, so far as is reasonably practicable, whether the installation is in a satisfactory condition for continued service. Ongoing through the install life. Output: Electrical Installation Condition Report (EICR). (3) Frequency — Reg 652.1 determines frequency having regard to type of installation + equipment + use + operation + maintenance + external influences. Typical: 5 yr domestic rented; 10 yr domestic owner-occupied; varies for commercial / industrial. (4) For LCT — Chapter 65 EICR-equivalent extends standard AC EICR with technology-specific elements; covered in this section + §12.3 for BESS-specific. (5) Documentation — IV outputs EIC at install; EICR outputs condition report at each periodic. Cert evidence bundle integrates both across the install lifecycle.',
  },
  {
    id: 'm12s5-frequency-reg-652',
    question:
      'Per Reg 652.1, what factors determine the frequency of periodic inspection + testing?',
    options: [
      'Calendar only',
      'Reg 652.1: the frequency shall be determined having regard to the type of installation + equipment, its use + operation, the frequency + quality of maintenance + the external influences to which it may be subjected. Plus results + recommendations of previous certificates + condition reports. For LCT this means: domestic vs commercial; type of generator / source; outdoor exposure; usage intensity (PV ~daily cycling, EV daily charging); maintenance regime; weather / location; previous EICR findings — all factor in. Not a one-size-fits-all calendar',
      'Random',
      'Fixed at 5 yr',
    ],
    correctIndex: 1,
    explanation:
      'Reg 652.1 frequency determination factors: (1) Type of installation + equipment — domestic vs commercial vs industrial; new vs old supply; LCT type + technology; equipment age + condition. (2) Use + operation — daily cycling (PV self-consumption, EV daily charge) vs occasional (emergency backup, weekend use); peak loading vs gentle; duration (hours per day). (3) Maintenance — frequency + quality of maintenance (manufacturer monitoring contract, annual service visits, customer self-checks); previous interventions + record. (4) External influences — weather (outdoor exposure, temperature extremes, humidity, salt air for coastal); environment (dust, vibration, vermin); adjacent activity (construction, vehicle impact, accidental contact). (5) Previous certificates + condition reports — results + recommendations of prior EICR / IV; any reported defects or near-misses; trends in test values. (6) Typical UK 2025-26 default cycles: domestic rented 5 yr; domestic owner-occupied 10 yr; commercial 5 yr; industrial 3 yr; specific environments (medical, swimming pools) shorter. (7) LCT specifics: standard property cycle aligned + BMS continuous + manufacturer scheduled monitoring + customer annual touchpoint + technology-specific considerations (e.g. outdoor PV inverter may warrant tighter cycle than indoor). Cert evidence bundle records the frequency rationale per install.',
  },
  {
    id: 'm12s5-eicr-coding',
    question:
      'What are EICR classification codes (C1, C2, C3, FI) + how apply to LCT findings?',
    options: [
      'No codes',
      'EICR coding per IET / NICEIC / BS 7671 industry guidance: C1 = Danger present, risk of injury, immediate remedial action required (e.g. exposed live conductor, missing earth on EV charger). C2 = Potentially dangerous, urgent remedial action required (e.g. missing OPDD on outdoor EV, Type AC RCD on LCT circuit). C3 = Improvement recommended (e.g. older RCD lacks Type B for new BESS, no AFDD where current rules now suggest). FI = Further Investigation required (e.g. SoH drop premature, intermittent BMS fault). LCT findings classified per the same framework + reported in the EICR + customer notified',
      'Random',
      'C1 only',
    ],
    correctIndex: 1,
    explanation:
      'EICR classification codes (BS 7671 industry guidance / NICEIC + IET conventions): (1) C1 — Danger present, risk of injury. Immediate remedial action required. Examples on LCT: exposed live conductor at PV combiner box; missing protective conductor on EV charger; failed isolator that doesn\'t actually isolate; thermal damage at BESS DC busbar (visible char or melting); Type AC RCD on EV circuit (under current Reg 531.3.3 + Reg 722.531). (2) C2 — Potentially dangerous, urgent remedial action required. Examples: missing OPDD on outdoor EV charger (per current Reg 722.411.4); cell imbalance + over-temp events accumulating on BESS without intervention; insulation degraded but still functional; loose connection at AC supply to PV inverter (high resistance, heat). (3) C3 — Improvement recommended. Not unsafe but below current standard. Examples: older Type A RCD adequate for current install but not future-proof; no AFDD on circuits where current A4:2026 rules now suggest; PV install pre-2018 Section 712 (still functional but not to current spec). (4) FI — Further Investigation. Issue identified that requires deeper diagnosis. Examples: BMS reporting intermittent fault not yet root-caused; SoH trend anomaly worth investigating; loop impedance reading at upper limit needs verification. (5) Coding applied per finding + reported in EICR; customer informed of action required + timeline; cert evidence bundle updated.',
  },
  {
    id: 'm12s5-pv-eicr-specifics',
    question:
      'PV EICR-equivalent — what items extend the standard AC EICR?',
    options: [
      'No extension',
      'PV-specific EICR items: (1) DC string IR re-test per Section 712 + Table 64 + manufacturer; (2) Reg 712.421.101 IMD verification + self-test; (3) DC isolator + AC isolator integrity per Section 537; (4) module condition (visible damage, hot spots, soiling, vegetation impingement); (5) mounting + earthing of PV array per Section 712; (6) anti-islanding per Reg 551.7.5; (7) inverter functional + firmware + DoC review; (8) yield review against modelled output (early indicator of issues); (9) warning notices per Reg 712.514 intact; (10) thermal imaging of DC + AC connections per Reg 653.2',
      'AC only',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'PV EICR-equivalent extends standard AC EICR: (1) DC string IR re-test — per Section 712 + Table 64 voltage selection + manufacturer DoC; trend against commissioning baseline; weather + module temperature recorded. (2) Reg 712.421.101 IMD — integrated in modern inverter; trigger self-test via manufacturer commissioning interface; record result + any fault history. (3) Isolator integrity — DC isolators (typically 2-pole for + / -) + AC isolator per Section 537; mechanical operation + electrical isolation verified. (4) Module condition — visible inspection: damage (cracks, delamination, frame corrosion, junction-box ingress), hot spots (thermal imaging where access permits), soiling (loss of yield), vegetation impingement (shading + fire risk), bird-droppings + algae. (5) Mounting + earthing — Section 712 requirements; mounting frame intact; module clamps secure; earthing of frame to MET per Reg 712 + Section 411. (6) Anti-islanding — Reg 551.7.5; inverter self-test or DNO-witnessed simulated grid-loss. (7) Inverter functional — generation rate matches modelled output for irradiance; firmware up-to-date; DoC + warranty status. (8) Yield review — portal data over the period; identify any sustained underperformance (could indicate module degradation, inverter issue, soiling, shading). (9) Warning notices — Reg 712.514 PV warning at origin + metering + CU intact. (10) Thermal imaging — DC combiner connections + inverter DC + AC connections + isolator contacts; identify high-resistance points. Cert evidence bundle: EICR report + Schedule of Test Results + thermal images + photographs + yield trend + manufacturer correspondence.',
  },
];

const quizQuestions = [
  {
    question:
      'Domestic owner-occupied property with PV + BESS + EV charger. How frequently should the EICR-equivalent be performed?',
    options: [
      'Every year',
      'Per Reg 652.1: typically 10 yr aligned with domestic owner-occupied AC EICR cycle. PLUS continuous BMS monitoring (BESS) + customer annual portal review + manufacturer scheduled monitoring where contracted. The 10 yr provides the comprehensive periodic; the continuous + annual + manufacturer monitoring provides the lifecycle picture between. Special considerations: outdoor LCT + intensive cycling + previous findings may warrant tighter cycle (5-7 yr). Cert evidence bundle records the rationale',
      'Random',
      'Never',
    ],
    correctAnswer: 1,
    explanation:
      'EICR-equivalent frequency for domestic LCT site: (1) Standard owner-occupied cycle — 10 yr per industry convention (or sooner per Reg 652.1 factors). (2) Continuous BMS monitoring — BESS + inverter BMS continuously monitors + alerts; portal accessible to customer + installer. (3) Customer annual touchpoint — portal review + self-check; installer summary email or annual visit (paid service). (4) Manufacturer scheduled monitoring — many BESS + PV manufacturers offer paid annual or quarterly monitoring services; firmware updates applied; remote diagnostics. (5) Specific factors that tighten cycle: outdoor PV / BESS / EV exposure to weather extremes; intensive cycling (commercial-scale residential, e.g. grid arbitrage); previous EICR findings requiring follow-up; warranty approaching threshold; LCT manufacturer service interval requirements. (6) Specific factors that may extend cycle: well-maintained site with manufacturer annual service + clean BMS reporting + customer engaged; minimal external influence exposure. (7) Cert evidence bundle records the chosen frequency rationale at each EICR + reviews at next periodic. (8) UK 2025-26 typical: domestic 10 yr standard with annual + continuous monitoring between; commercial 5 yr; rented 5 yr. (9) The EICR-equivalent is comprehensive (BS 7671 EICR + LCT-specific extensions); the continuous + annual is operational + condition monitoring + early-warning.',
  },
  {
    question:
      'EICR-equivalent finds: (a) PV DC string IR dropped from 30 MΩ at commissioning to 4 MΩ at year-5; (b) PV yield down 8% vs modelled. How classify + report?',
    options: [
      'No issue',
      'C2 (potentially dangerous, urgent remedial action). 4 MΩ approaches Table 64 minimum 1 MΩ threshold + 87% drop from commissioning baseline = significant deterioration. Combined with 8% yield reduction = systemic issue (likely module degradation, junction-box ingress, or DC cable insulation degradation). C2 because: ongoing degradation trajectory + reduces but not eliminates safety margin + warrants intervention before next periodic. Actions: investigate root cause (which string? which modules? thermal imaging?); manufacturer warranty engagement; customer informed; remediation plan; re-test post-remediation',
      'Random',
      'C3 only',
    ],
    correctAnswer: 1,
    explanation:
      'Classification + reporting: (1) Why C2: (a) 87% IR drop from baseline indicates substantial insulation deterioration; (b) 4 MΩ is above Table 64 minimum 1 MΩ but trajectory suggests it will hit threshold within next periodic interval; (c) yield reduction confirms systemic issue beyond simple wear. Urgent investigation + intervention needed; not immediate danger (C1) but not just improvement (C3). (2) Root cause investigation options: thermal imaging of each string + junction boxes (hot spots indicate cell degradation, junction-box failure); module-level IR isolation (which string + which modules contribute); manufacturer engagement (PV module warranty typically 10-25 yr; warranty may cover premature degradation). (3) Likely causes: junction-box humidity ingress over years; cell-level degradation (PEC, micro-cracks); DC cable insulation degradation (UV + thermal); inverter electronics issue. (4) Actions: produce EICR report with C2 classification; customer informed of finding + recommended action timeline (e.g. 1-3 months investigation); manufacturer warranty claim if appropriate; remediation (replace affected modules / junction boxes / cables); post-remediation re-test to verify restoration. (5) Cert evidence bundle: EICR report + BMS / portal data + thermal images + manufacturer correspondence + remediation record + post-remediation test results. (6) Customer education: explain findings + warranty position + remediation cost + expected outcome.',
  },
  {
    question:
      'EV charger EICR-equivalent — what items extend the standard AC EICR?',
    options: [
      'No extension',
      'EV-specific EICR items: (1) Reg 722.411.4 OPDD presence + functional test (where supported) + log review; (2) Reg 722.531 RCD type + RDC-DD verification + functional test; (3) charger physical condition + cable + connector integrity; (4) earthing arrangement verification (PME + OPDD architecture OR TT earth electrode resistance); (5) functional charge test cycle; (6) firmware + CMS / OCPP comms (commercial) verification; (7) warning notices intact; (8) cable management + ingress protection; (9) thermal imaging of AC supply terminations',
      'AC only',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'EV charger EICR-equivalent extends standard AC EICR with EV-specific items: (1) Reg 722.411.4 OPDD — integrated in most modern domestic chargers; trigger self-test where manufacturer-supported + record result; review event log for any prior trips; visual inspection of status indicators. (2) Reg 722.531 RCD + RDC-DD — Type A + RDC-DD typical for modern chargers OR Type B; functional test per BS EN 61557-6; RDC-DD functional per manufacturer. (3) Charger physical condition — enclosure integrity, mounting secure, signs of corrosion / damage / vandalism; cable condition + connector integrity (latch, contacts visible, no signs of arcing); display + LEDs functional. (4) Earthing arrangement — confirm PME + OPDD architecture OR TT earth electrode resistance per Reg 643.7.3 + Reg 411.5.3 trend against commissioning. (5) Functional charge test — connect test load or vehicle; verify charge cycle initiates + completes; emergency stop tested; communication with vehicle handshake verified. (6) Firmware + CMS — installed firmware version + manufacturer updates applied; for commercial chargers OCPP communication to central management system verified + cloud connectivity confirmed. (7) Warning notices — manufacturer warning + isolation labelling intact. (8) Cable management — strain relief; cable holster / dock secure; ingress protection (IP rating) intact. (9) Thermal imaging — AC supply terminations (loose connection = I²R heat = hot spot); contactor + protection device contacts. (10) Customer education refreshed — emergency stop location + procedure; fault response; contacts.',
  },
  {
    question:
      'EICR-equivalent on a heat pump (ASHP outdoor unit + indoor controller). What items?',
    options: [
      'No EICR for heat pump',
      'Heat pump EICR-equivalent: (1) outdoor unit electrical install per Reg 642 + manufacturer (vibration impact on terminations, weatherproofing, frame integrity); (2) Reg 643 testing on dedicated supply circuit (continuity, IR, polarity, loop impedance, RCD operation Type A or Type B per manufacturer); (3) earthing arrangement (TT or PME with appropriate architecture); (4) VSD compressor electronics — manufacturer commissioning re-check + fault history; (5) BMS communications + control wiring integrity; (6) refrigerant + thermal check (specialist refrigerant engineer scope); (7) functional verification; (8) firmware + manufacturer service per schedule',
      'Random',
      'Refrigerant only',
    ],
    correctAnswer: 1,
    explanation:
      'Heat pump EICR-equivalent (M8 covered heat pumps; here we cover the EICR-equivalent for periodic): (1) Outdoor unit electrical install — vibration impact on terminations over time (loose connections common); weatherproofing intact (no signs of moisture ingress at electrical compartment); frame mounting integrity; outdoor unit not impeded by debris / vegetation / new structures. (2) Reg 643 testing on dedicated heat pump supply circuit — continuity (R1+R2, R2); IR at 500 V per Table 64; polarity; loop impedance at the outdoor unit isolator; RCD operation (Type A or Type B per heat pump manufacturer DoC — VSD compressors may produce DC fault leakage warranting Type B); PFC. (3) Earthing arrangement — confirm architecture (TT or PME with appropriate protection); earth electrode resistance trend (TT); protective conductor integrity. (4) VSD compressor electronics — manufacturer commissioning re-check via service interface; fault history review; firmware updates applied; any recurring trip events investigated. (5) BMS + control wiring — communication with central heating control; thermostat / room sensor; weather compensation sensor; wiring integrity + label intact. (6) Refrigerant + thermal check — specialist refrigerant engineer scope (F-gas qualified); not within electrician\'s EICR-equivalent but coordinated visit may include both trades. (7) Functional verification — heat pump starts + reaches setpoint + cycle behaviour normal; defrost cycle + auxiliary heater (where applicable) functional. (8) Firmware + manufacturer service — manufacturer typically recommends annual service visit; document service record + EICR-equivalent findings. (9) Cert evidence bundle update.',
  },
  {
    question:
      'Wind turbine EICR-equivalent — what specialist items?',
    options: [
      'No EICR',
      'Wind turbine EICR-equivalent: (1) mast + turbine structural inspection (specialist competency — typically annual by manufacturer / specialist); (2) electrical install at base + control room — Section 551 + Section 712-equivalent; Reg 643 testing on AC supply circuit; (3) DC interim bus IR (where present); (4) anti-islanding per Reg 551.7.5 + EREC G98 / G99; (5) RCD type + Reg 415.1 verification (VSD turbine electronics may warrant Type B); (6) lightning protection per BS EN 62305 (M11 covered); (7) earthing arrangement + bonding; (8) functional + DNO + grid synchronisation verification',
      'Random',
      'AC only',
    ],
    correctAnswer: 1,
    explanation:
      'Wind turbine EICR-equivalent (M9 covered wind install): (1) Mast + turbine structural — typically specialist competency (rope access / climbing for taller masts; manufacturer service contractor). The BS 7671 electrician\'s scope is the electrical install; the structural / mechanical is the turbine specialist. Coordinated visit common. (2) Electrical install at base + control room — Section 551 generating set framework + Section 712-equivalent (where wind-PV combined sites use Section 712 conventions); Reg 643 testing on AC supply circuit (continuity, IR, polarity, loop impedance, RCD, PFC). (3) DC interim bus — where present (some inverter topologies have DC link between rectifier + grid-tie inverter); IR per Table 64 + manufacturer + outdoor exposure considerations. (4) Anti-islanding per Reg 551.7.5 — turbine inverter self-test or DNO-witnessed simulated grid-loss. (5) EREC G98 / G99 — generation export verified compliant; DNO reference confirmed; export limit adhered to. (6) RCD architecture — VSD turbine electronics may produce DC fault leakage warranting Type B; verify per manufacturer DoC + Reg 415.1. (7) Lightning protection — BS EN 62305 LPS (Lightning Protection System) inspection + bonding verification + SPD condition (Surge Protective Devices may need replacement after lightning events). M11 covered. (8) Earthing + bonding — turbine mast earthing electrode + bonding to extraneous-conductive-parts; resistance verification. (9) Functional + grid sync — turbine running profile + export compliant + DNO data alignment. (10) Cert evidence bundle: EICR-equivalent + manufacturer service + DNO correspondence + EREC G99 sign-off (where applicable).',
  },
  {
    question:
      'Combined site multi-source LCT EICR-equivalent — how is the sequence + coordination handled?',
    options: [
      'Each separately',
      'Coordinated EICR-equivalent for multi-source LCT: (1) plan single visit covering all sources to leverage efficiency + minimise customer disruption; (2) extract BMS + portal data pre-visit for all sources; (3) sequence: AC EICR baseline → per-source extensions (PV, BESS, EV, heat pump) → multi-source Reg 551.4.2 RCD effectiveness + Reg 551.7.5 anti-islanding cross-source; (4) coordinated reporting — single EICR or per-source reports referenced; (5) cert evidence bundle integrates per-source MCS handover packs + manufacturer service records; (6) customer single-touchpoint conversation covering findings + actions',
      'Random',
      'PV only',
    ],
    correctAnswer: 1,
    explanation:
      'Coordinated multi-source LCT EICR-equivalent: (1) Pre-visit preparation — extract BMS + portal data for all sources (BESS SoH + cycle + faults; PV yield + IMD log; EV charger event log + OPDD self-test log; heat pump service record + fault log; firmware versions across the suite). Review against commissioning baseline + previous periodic. (2) Visit planning — coordinate any specialist trades needed (heat pump refrigerant engineer; wind structural specialist; PV roof access); manufacturer service visits aligned where possible. (3) On-site sequence: (a) Reg 642 inspection across all sources + AC install; (b) Reg 643 AC EICR baseline on the property installation; (c) Per-source extensions: PV (DC string IR + IMD + isolator + module + earthing + anti-islanding + yield review); BESS (DC bus IR + BMS data + thermal + functional + anti-islanding); EV (OPDD + RDC-DD + functional + earthing + cable); heat pump (electrical + manufacturer service interface + control + earthing); other LCT per technology. (d) Multi-source extensions: Reg 551.4.2 RCD effectiveness across combinations + Reg 551.7.5 anti-islanding cross-source verification. (4) Reporting — single comprehensive EICR or coordinated per-source reports; classification codes applied per finding; recommendations + timeline. (5) Cert evidence bundle — integrates per-source MCS handover packs + manufacturer service records + this EICR + thermal images + DNO correspondence (where applicable). (6) Customer single-touchpoint conversation — clear summary across all sources + actions required + warranty status + next periodic. (7) Documentation flow — installer audit + customer copy + DNO + manufacturer per relevance.',
  },
];

const faqs = [
  {
    question: 'Is EICR-equivalent legally required for LCT?',
    answer:
      'Reg 651.1 says "where required" — periodic inspection is required where required by statute (Landlord + Tenant for rented; some commercial settings) or by best practice / insurance / warranty. For LCT specifically: typically required by manufacturer warranty (some warranties contingent on annual service or 5-yr EICR-equivalent); insurance terms may require; best practice + customer safety. Cert evidence bundle supports the discipline regardless of legal floor.',
  },
  {
    question: 'Does EICR-equivalent need to be done by the original installer?',
    answer:
      'Not strictly — Reg 651.5 requires a competent skilled person. The original installer has familiarity with the install + may have BMS portal access + warranty relationship. Independent EICR-equivalent providers exist + are growing in UK 2025-26. Cert evidence bundle records the verifier + their competency + manufacturer correspondence.',
  },
  {
    question: 'What if there\'s no commissioning baseline data available?',
    answer:
      'Worst case: the EICR-equivalent treats current state as the new baseline + flags the lack of historical data as a finding. Better: investigate whether the original installer / manufacturer has records (portal data + EIC + commissioning); cert evidence bundle reconstruction. UK 2025-26 reality: some older LCT installs lack proper baseline; the discipline is to capture comprehensive current data + establish baseline going forward.',
  },
  {
    question: 'How does the EICR-equivalent interact with warranty?',
    answer:
      'Manufacturer warranty terms often require periodic inspection / service as a condition of warranty validity. EICR-equivalent satisfies or supports this; record-keeping in cert evidence bundle supports warranty claim if needed. Many manufacturers offer paid annual monitoring that runs alongside the formal EICR-equivalent cycle.',
  },
  {
    question: 'Should EICR codes be customer-facing or technical?',
    answer:
      'Both layers: technical EICR with formal codes (C1, C2, C3, FI) for the records + audit; plain-English customer summary explaining findings + actions in non-technical language. Cert evidence bundle keeps both. UK 2025-26 customer expectation: clear simple language with the technical detail available on request.',
  },
];

export default function RenewableEnergyModule12Section5() {
  const navigate = useNavigate();

  useSEO({
    title: 'EICR cycle + per-technology specifics | Renewable Energy 12.5 | Elec-Mate',
    description:
      'Chapter 65 Periodic Inspection + Testing. Reg 652.1 frequency factors. EICR classification codes (C1, C2, C3, FI). Per-technology EICR-equivalent specifics for PV / BESS / EV / heat pump / wind / CHP / hydro. Coordinated multi-source LCT EICR + cert evidence bundle integration.',
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
            eyebrow="Module 12 · Section 5 · BS 7671:2018+A4:2026 · Chapter 65 + Reg 651-653"
            title="EICR cycle + per-technology specifics"
            description="Chapter 65 Periodic Inspection + Testing. Reg 652.1 frequency factors. EICR classification codes (C1, C2, C3, FI). Per-technology EICR-equivalent specifics across PV / BESS / EV / heat pumps / wind / CHP / hydro. Coordinated multi-source LCT EICR + cert evidence bundle integration."
            tone="yellow"
          />

          <TLDR
            points={[
              'Chapter 64 = Initial Verification (one-time at install / major alteration). Chapter 65 = Periodic Inspection + Testing (ongoing through install life).',
              'Reg 651.1: periodic inspection + testing of every electrical installation shall be carried out (where required) to determine satisfactory condition for continued service.',
              'Reg 652.1 frequency factors: type of installation + equipment, use + operation, maintenance, external influences, previous certificate findings.',
              'Typical cycles: domestic owner-occupied 10 yr; domestic rented 5 yr; commercial 5 yr; industrial 3 yr; environment-specific tighter.',
              'EICR classification codes: C1 (danger present, immediate action); C2 (potentially dangerous, urgent action); C3 (improvement recommended); FI (further investigation).',
              'PV EICR-equivalent extensions: DC IR + IMD + isolators + module condition + mounting + anti-islanding + yield trend + warning notices + thermal imaging.',
              'BESS EICR-equivalent (covered §12.3): BMS data + DC bus IR + thermal + functional + warranty review + AC EICR baseline.',
              'EV EICR-equivalent extensions: OPDD + RDC-DD + earthing + functional charge + firmware + cable + warning notices + thermal imaging of terminations.',
              'Heat pump EICR-equivalent extensions: outdoor unit + VSD electronics + manufacturer service + BMS + control wiring + earthing + functional.',
              'Wind / CHP / hydro EICR-equivalent: technology-specific specialist coordination + Section 551 + anti-islanding + EREC G98 / G99 + lightning protection.',
              'Coordinated multi-source LCT EICR: single visit; pre-visit data extraction; sequence AC baseline + per-source + multi-source extensions; single customer touchpoint.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish Chapter 64 IV from Chapter 65 periodic inspection + testing.',
              'Apply Reg 652.1 frequency factors to LCT installs.',
              'Classify EICR findings per C1 / C2 / C3 / FI codes.',
              'Conduct PV EICR-equivalent with Section 712 extensions.',
              'Conduct EV EICR-equivalent with Section 722 + Reg 722.411.4 extensions.',
              'Conduct heat pump EICR-equivalent integrating manufacturer service + electrical install.',
              'Conduct wind / CHP / hydro EICR-equivalent with Section 551 + specialist coordination.',
              'Coordinate multi-source LCT EICR efficient single-visit + comprehensive reporting.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Initial verification proves it works on day one. The EICR cycle proves it still works on day 1825. Both anchor the install lifecycle.
          </Pullquote>

          <ContentEyebrow>Chapter 65 framework + frequency + EICR codes</ContentEyebrow>

          <ConceptBlock
            title="Chapter 65 + Reg 651-653 periodic framework"
            plainEnglish="Chapter 65 sets out periodic inspection + testing — the ongoing condition check throughout the install life. Reg 651: where required, periodic inspection + testing of every electrical installation shall be carried out to determine satisfactory condition for continued service. Reg 652: frequency. Reg 653: content of the report. For LCT this extends the standard AC EICR with technology-specific items."
            onSite="The EICR-equivalent for LCT is the comprehensive periodic. Continuous BMS monitoring + customer annual touchpoint + manufacturer scheduled monitoring all complement; the EICR-equivalent is the formal periodic event."
          >
            <p>Reg 651-653 family:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 651.1</strong>
                — periodic inspection + testing of every electrical installation
                shall be carried out (where required); purpose: determine satisfactory
                condition for continued service
              </li>
              <li>
                <strong className="text-white">Reg 651.3</strong>
                — periodic inspection + testing shall not cause danger to persons or
                livestock + shall not cause damage to property or equipment even if
                the circuit is defective. Instruments per BS EN 61557
              </li>
              <li>
                <strong className="text-white">Reg 651.4</strong>
                — details of any damage, deterioration, defects or dangerous
                conditions shall be recorded in a report
              </li>
              <li>
                <strong className="text-white">Reg 651.5</strong>
                — periodic inspection + testing shall be carried out by one or more
                skilled persons competent in such work
              </li>
              <li>
                <strong className="text-white">Reg 652.1</strong>
                — frequency determined having regard to type + use + operation +
                maintenance + external influences + previous reports
              </li>
              <li>
                <strong className="text-white">Reg 653.1-653.2</strong>
                — notes for the person producing the report (Appendix 6); guidance
                for the recipient(s); photographic + thermographic images may be
                appended
              </li>
              <li>
                <strong className="text-white">EICR report
                  format</strong> — industry-standard template (NICEIC / IET) with
                circuit-by-circuit Schedule + observations + classifications +
                recommendations
              </li>
              <li>
                <strong className="text-white">For LCT</strong>
                — standard AC EICR + per-technology extensions detailed in this
                section + §12.3 (BESS specific)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EICR classification codes + reporting"
            plainEnglish="EICR findings are classified per industry-standard codes: C1 (immediate danger), C2 (potentially dangerous, urgent action), C3 (improvement recommended), FI (further investigation). Each finding gets a code + a description + a recommendation + timeline. The customer receives the EICR; the installer keeps a copy in cert evidence bundle."
            onSite="Coding is judgement-driven within the framework. Reg 651.4 specifies that damage + deterioration + defects + dangerous conditions are recorded. The skilled person\'s competency includes applying coding consistently + defensibly. For LCT the codes apply across the technology-specific extensions."
          >
            <p>Classification code examples for LCT:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">C1 — Danger
                  present, risk of injury</strong> — examples: exposed live conductor
                at PV combiner box; missing protective conductor on EV charger;
                failed isolator; thermal damage at BESS DC busbar (visible char or
                melt); failed OPDD on outdoor EV (under current Reg 722.411.4)
              </li>
              <li>
                <strong className="text-white">C2 — Potentially
                  dangerous, urgent action</strong> — examples: PV DC string IR
                approaching Table 64 threshold with degrading trend; cell imbalance
                + over-temp events on BESS without intervention; loose AC terminations
                with thermal evidence; Type AC RCD on LCT circuit (per Reg 531.3.3)
              </li>
              <li>
                <strong className="text-white">C3 — Improvement
                  recommended</strong> — examples: older Type A RCD adequate for current
                install but not future-proof; no AFDD where A4:2026 now suggests;
                older PV install pre-2018 Section 712
              </li>
              <li>
                <strong className="text-white">FI — Further
                  Investigation</strong> — examples: BMS reporting intermittent fault not
                yet root-caused; SoH trend anomaly worth investigating; loop impedance
                at upper limit
              </li>
              <li>
                <strong className="text-white">Coding judgement</strong>
                — applied consistently; defensible; documented rationale; cross-referenced
                to relevant regs + manufacturer DoC
              </li>
              <li>
                <strong className="text-white">Reporting flow</strong>
                — EICR document → customer copy + installer audit + insurance / DNO
                where applicable; classification + recommendations + timeline; cert
                evidence bundle updated
              </li>
              <li>
                <strong className="text-white">Customer-facing
                  summary</strong> — plain-English explanation of findings + actions;
                technical detail in appendix; clear communication essential
              </li>
              <li>
                <strong className="text-white">Re-inspection
                  after remediation</strong> — when remediation completed, re-test relevant
                items + update EICR + cert evidence bundle
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 651.5 — Skilled person for periodic inspection"
            clause="The periodic inspection and testing shall be carried out by one or more skilled persons competent in such work."
            meaning="Reg 651.5 places periodic inspection + testing in the hands of skilled persons competent in such work. For LCT EICR-equivalent the competency requirements layer: (1) BS 7671 EICR competency — C&G 2391 Inspection + Testing (or equivalent); 18th Edition + A4:2026 knowledge; experience with periodic inspection across the install scope. (2) LCT-specific competency — manufacturer-certified installer training for the relevant technologies (PV per MCS PV + IET COP; BESS per manufacturer BMS training; EV per IET COP for EV; heat pump per MCS Heat Pump + manufacturer); ability to interpret BMS data + manufacturer DoCs; thermal imaging competency. (3) Multi-trade coordination — wind / CHP / hydro EICR may require specialist trade involvement (turbine structural, CHP engine specialist, hydro civils + turbine); the EICR-equivalent skilled person coordinates + signs the electrical portion + integrates the specialist records into cert evidence bundle. (4) Reporting competency — EICR coding consistent + defensible; plain-English customer communication; cert evidence bundle integrity. UK 2025-26 reality: most LCT EICR-equivalents by the original installer or manufacturer-affiliated service provider; growing independent inspection market."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Per-technology EICR-equivalent specifics</ContentEyebrow>

          <Pullquote>
            One EICR cycle, many technology layers. Standard AC EICR baseline + per-source extensions + multi-source cross-checks + single customer touchpoint.
          </Pullquote>

          <ConceptBlock
            title="PV EICR-equivalent extensions"
            plainEnglish="PV-specific EICR items extend standard AC EICR: DC string IR re-test; Reg 712.421.101 IMD verification; DC + AC isolator integrity; module condition; mounting + earthing per Section 712; anti-islanding per Reg 551.7.5; inverter functional + firmware; yield review against modelled output; warning notices per Reg 712.514 intact; thermal imaging of DC + AC connections."
            onSite="UK 2025-26 typical PV install at 10-yr EICR-equivalent: most installs are healthy with yield within expected curve + IMD functional + isolators good. Common findings: soiling reducing yield; minor cable degradation outdoor; DNO label fading. Most PV EICRs return Satisfactory with C3 improvement notes."
          >
            <p>PV EICR-equivalent items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">DC string IR
                  re-test</strong> — per Section 712 + Table 64 + manufacturer; weather
                + module temp + irradiance recorded; trend vs baseline
              </li>
              <li>
                <strong className="text-white">Reg 712.421.101
                  IMD</strong> — self-test via inverter; event log review; BS EN 61557-8
                compliance maintained
              </li>
              <li>
                <strong className="text-white">DC + AC isolators</strong>
                — Section 537 + mechanical operation + electrical isolation verified;
                weather seal integrity outdoor
              </li>
              <li>
                <strong className="text-white">Module
                  condition</strong> — visible inspection (binoculars / drone for high-roof);
                cracks, delamination, frame corrosion, junction-box ingress, hot spots;
                thermal imaging where access permits
              </li>
              <li>
                <strong className="text-white">Mounting +
                  earthing</strong> — Section 712 frame mounting integrity + earthing
                bonding to MET; check for movement / wind damage / corrosion
              </li>
              <li>
                <strong className="text-white">Anti-islanding</strong>
                — Reg 551.7.5 inverter self-test or DNO-witnessed simulated grid-loss;
                record result
              </li>
              <li>
                <strong className="text-white">Inverter
                  functional + firmware</strong> — generation profile vs irradiance;
                firmware updates applied; manufacturer DoC + warranty status
              </li>
              <li>
                <strong className="text-white">Yield review</strong>
                — portal data over period vs modelled output; sustained
                underperformance indicates degradation / soiling / shading
              </li>
              <li>
                <strong className="text-white">Warning notices
                  per Reg 712.514</strong> — at origin + metering + CU; intact + legible
              </li>
              <li>
                <strong className="text-white">Thermal imaging</strong>
                — DC combiner + inverter DC + AC + isolator contacts; identifies
                high-resistance points
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EV charger EICR-equivalent extensions"
            plainEnglish="EV-specific EICR items: OPDD presence + functional test where supported; Reg 722.531 RCD type + RDC-DD verification; charger physical condition + cable + connector integrity; earthing arrangement verification (PME + OPDD OR TT earth electrode resistance); functional charge test; firmware + CMS / OCPP comms (commercial); warning notices intact; thermal imaging of AC supply terminations."
            onSite="UK 2025-26 EV chargers cycling daily — wear + tear on cable + connector + display. Common findings: cable wear at strain relief; connector contacts showing wear; firmware updates due; OPDD self-test logs to review."
          >
            <p>EV charger EICR-equivalent items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 722.411.4
                  OPDD</strong> — presence verified + manufacturer self-test triggered
                where supported + event log reviewed for prior trips
              </li>
              <li>
                <strong className="text-white">Reg 722.531
                  RCD + RDC-DD</strong> — Type A + RDC-DD or Type B per manufacturer;
                BS EN 61557-6 functional test; RDC-DD function verified per DoC
              </li>
              <li>
                <strong className="text-white">Charger physical
                  condition</strong> — enclosure intact; mounting secure; no corrosion
                / damage / vandalism / vehicle impact
              </li>
              <li>
                <strong className="text-white">Cable +
                  connector integrity</strong> — strain relief + sheath condition + no
                cuts / abrasion; connector latch operates + contacts visible no arcing
                / wear
              </li>
              <li>
                <strong className="text-white">Earthing
                  arrangement</strong> — PME + OPDD architecture or TT earth electrode
                resistance per Reg 643.7.3 + Reg 411.5.3 trend
              </li>
              <li>
                <strong className="text-white">Functional
                  charge test</strong> — test load or vehicle; charge cycle initiates +
                completes; communication with vehicle handshake; emergency stop
                functional
              </li>
              <li>
                <strong className="text-white">Firmware +
                  CMS</strong> — installed version + manufacturer updates applied;
                commercial OCPP communication + cloud connectivity (where applicable)
              </li>
              <li>
                <strong className="text-white">Warning notices</strong>
                — manufacturer warning + isolation labelling intact; ratings + DoC
                reference visible
              </li>
              <li>
                <strong className="text-white">Thermal imaging</strong>
                — AC supply terminations + contactor + protection device contacts;
                identify high-resistance heating
              </li>
              <li>
                <strong className="text-white">Customer
                  education refresh</strong> — emergency stop + fault response + contacts
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 652.1 — Frequency factors"
            clause="The frequency of periodic inspection and testing of an installation shall be determined having regard to the type of installation and equipment, its use and operation, the frequency and quality of maintenance and the external influences to which it may be subjected. The results and recommendations of previous certificates and condition reports shall also be taken into account."
            meaning="Reg 652.1 makes periodic frequency a judgement based on multiple factors — not a fixed calendar interval per code. For LCT the factors are particularly nuanced: (1) Type of installation + equipment — domestic vs commercial; LCT type + age; new vs retrofit. (2) Use + operation — daily cycling (PV + EV) vs occasional; usage intensity; vehicle-to-grid where applicable. (3) Maintenance — manufacturer monitoring contract; annual service; firmware updates; customer self-checks. (4) External influences — outdoor exposure; weather extremes; coastal / industrial / construction environments. (5) Previous reports — findings from prior EICR + IV + interim issues + warranty events. (6) Reasonable defaults — domestic owner-occupied 10 yr + continuous + annual touchpoint; domestic rented 5 yr; commercial 5 yr; specific environments tighter (medical, swimming pools, agricultural, marine). (7) Tightening triggers — outdoor LCT; intensive cycling; previous C2 findings; warranty approaching threshold; manufacturer service interval. (8) Cert evidence bundle records the rationale at each EICR. Frequency is not arbitrary — it\'s defensible against Reg 652.1 factors."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Heat pump + wind + CHP + hydro EICR-equivalent</ContentEyebrow>

          <ConceptBlock
            title="Heat pump EICR-equivalent extensions"
            plainEnglish="Heat pump electrical EICR-equivalent integrates with the manufacturer\'s annual service. Items: outdoor unit electrical install (vibration impact on terminations, weatherproofing); dedicated supply circuit Reg 643 testing; earthing arrangement; VSD compressor electronics + manufacturer service interface; BMS + control wiring; functional verification; firmware. Refrigerant + thermal scope is the F-gas-qualified specialist."
            onSite="UK 2025-26 BUS-funded heat pump installs at 5-7 yr EICR-equivalent: outdoor unit terminations a common finding (vibration loosens over time). Common findings: minor terminations to retorque, outdoor unit insulation deterioration, firmware updates."
          >
            <p>Heat pump EICR-equivalent items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Outdoor unit
                  electrical install</strong> — vibration impact on terminations
                (retorque); weatherproofing seals; frame mounting; surrounding
                clearance (debris, vegetation)
              </li>
              <li>
                <strong className="text-white">Reg 643 testing
                  on dedicated supply circuit</strong> — continuity, IR at 500 V,
                polarity, loop impedance at outdoor unit isolator, RCD per Type per
                manufacturer DoC, PFC
              </li>
              <li>
                <strong className="text-white">Earthing
                  arrangement</strong> — TT or PME with appropriate architecture;
                outdoor LCT good practice per §12.4; earth electrode resistance trend
                where TT
              </li>
              <li>
                <strong className="text-white">VSD compressor
                  electronics</strong> — manufacturer service interface re-check; fault
                history review; recurring trip events investigated
              </li>
              <li>
                <strong className="text-white">BMS + control
                  wiring</strong> — communication with CH control; thermostat +
                weather compensation sensor + cylinder sensor wiring integrity
              </li>
              <li>
                <strong className="text-white">Refrigerant +
                  thermal check</strong> — F-gas qualified specialist scope; coordinate
                visit
              </li>
              <li>
                <strong className="text-white">Functional
                  verification</strong> — heat pump starts + reaches setpoint + cycle
                normal; defrost + auxiliary heater + DHW (where integrated) functional
              </li>
              <li>
                <strong className="text-white">Firmware +
                  manufacturer service</strong> — annual service per manufacturer
                schedule; service record alongside EICR-equivalent in cert evidence
                bundle
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Wind + CHP + hydro EICR-equivalent + specialist coordination"
            plainEnglish="Wind / CHP / hydro EICR-equivalent require specialist coordination beyond the BS 7671 electrician\'s scope. Mast / turbine structural (wind); engine + flue + fuel supply (CHP); civils + intake + pipework (hydro). The electrician\'s scope is the electrical install — but coordination with specialists ensures comprehensive periodic inspection."
            onSite="Lower-volume LCT installs; the electrician\'s scope is the BS 7671 electrical install side; the technology specialist handles the technology-specific periodic. Cert evidence bundle integrates both."
          >
            <p>Specialist coordination per technology:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Wind turbine</strong>
                — mast + turbine structural (climbing / rope access; manufacturer
                service); electrical install at base; DC interim bus where present;
                anti-islanding + EREC; lightning protection per BS EN 62305
              </li>
              <li>
                <strong className="text-white">CHP unit</strong>
                — engine + flue + fuel supply specialist; electrical install (generator
                + grid-tie + parallel operation per Section 551); anti-islanding;
                heat-network interface specialist
              </li>
              <li>
                <strong className="text-white">Micro-hydro</strong>
                — turbine + civils (intake, pipework, tailrace) specialist;
                Environment Agency abstraction licence + monitoring; electrical
                install at turbine + control room; DC interim bus where present
              </li>
              <li>
                <strong className="text-white">Solar thermal</strong>
                — collectors + controllers + circulation pumps; heating engineer
                + electrician on controls + pumps scope
              </li>
              <li>
                <strong className="text-white">Biomass</strong>
                — combustion + flue + fuel feed specialist (HETAS / biomass installer);
                electrical install on controls + auger + ignition + fans + flue extract
              </li>
              <li>
                <strong className="text-white">Section 551
                  framework</strong> — anti-islanding per Reg 551.7.5; supply-side
                connection per Reg 551.7.2.1; multi-source RCD per Reg 551.4.2
              </li>
              <li>
                <strong className="text-white">EREC G98 / G99</strong>
                — generation export compliant; DNO reference; periodic confirmation
              </li>
              <li>
                <strong className="text-white">Coordinated
                  visit</strong> — schedule specialist trades alongside electrician for
                comprehensive periodic; single customer touchpoint; cert evidence
                bundle integrates all
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 651.4 — Recording defects + dangerous conditions"
            clause="Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
            meaning="Reg 651.4 is the categorical reporting requirement for periodic inspection findings. Damage (physical impact, corrosion, weather), deterioration (insulation drift, contact wear, capacity fade), defects (manufacturing or install errors, wrong type / spec), dangerous conditions (open earth, exposed live, failed protection) — all recorded in the report. For LCT periodic findings span: (1) Standard AC findings per Chapter 65; (2) Technology-specific findings per the extensions (PV DC IR drift, BESS SoH anomaly, EV OPDD log, heat pump VSD fault history); (3) Multi-source findings per Reg 551.4.2 + Reg 551.7.5 verification across combinations. The report\'s purpose is twofold: (a) historical record + audit trail; (b) action trigger for the customer + installer + manufacturer + future verifiers. Reg 653.2 NOTE permits photographic + thermographic images appended — supports the narrative + provides evidence. Cert evidence bundle assembles report + supporting data + images + manufacturer correspondence + customer communication. UK 2025-26 best practice: comprehensive recording even where findings are positive (Satisfactory) — establishes the lifecycle reference for the next periodic."
          />

          <InlineCheck {...inlineChecks[3]} />

          <DiagramPlaceholder
            caption="EICR cycle + per-technology EICR-equivalent across LCT. Top: Chapter 65 framework — Reg 651 purpose + Reg 652 frequency factors + Reg 653 reporting + Reg 651.5 skilled person. Middle: classification codes — C1 / C2 / C3 / FI applied per finding. Per-technology extension grid: PV (DC IR + IMD + isolators + module + mounting + anti-islanding + yield + warning notices + thermal); BESS (BMS data + DC bus IR + thermal + functional + warranty + AC EICR — see §12.3); EV (OPDD + RDC-DD + earthing + functional + cable + firmware + thermal); heat pump (outdoor unit + VSD + manufacturer service + control + earthing); wind (structural + electrical + DC bus + anti-islanding + EREC + LPS); CHP (engine + Section 551 + anti-islanding + heat-network); hydro (civils + turbine + DC + anti-islanding). Bottom: coordinated multi-source LCT EICR — single visit, pre-visit data extract, AC baseline + per-source + multi-source extensions, single customer touchpoint, cert evidence bundle integration."
            filename="renewable/m12s5-eicr-per-technology.png"
          />

          <SectionRule />

          <Scenario
            title="10-yr EICR-equivalent on PV + BESS + heat pump + EV home"
            situation="Mr + Mrs Singh, 4-bed detached, 10 years since original PV install + 7 years since BESS retrofit + 5 years since heat pump + EV charger. Property AC EICR due. Original installer engaged for coordinated visit."
            whatToDo="(1) Pre-visit: extract BMS + portal data for all sources — BESS SoH 78% at 7 yr + cycle count 2350 + 2 fault events resolved; PV yield 92% of modelled cumulative (within range); EV charger 8400 cycles + OPDD self-test log clean; heat pump fault log 5 minor faults all resolved (each auto-retry success); firmware versions across the suite reviewed. (2) Visit sequence: Reg 642 inspection across all + AC install (2 hours); Reg 643 AC EICR baseline (1.5 hours); PV extensions (DC IR test on 2 strings + IMD self-test + module visible inspection + thermal imaging + warning notice review + yield review — 1.5 hours); BESS EICR-equivalent (1 hour); EV charger EICR-equivalent (45 min); heat pump electrical EICR-equivalent (1 hour); coordinated F-gas specialist visit for refrigerant check (1 hour). Total ~9 hours. (3) Multi-source extensions: Reg 551.4.2 RCD effectiveness across combinations (PV-only, PV + BESS, PV + BESS + EV, PV + BESS + heat pump) verified + recorded matrix; Reg 551.7.5 anti-islanding cross-source. (4) Findings: PV C3 — yield slight underperformance suggests soiling; recommend professional clean + re-test in 12 mo. BESS C3 — SoH 78% within expected curve but approaching 10-yr warranty review point; engage manufacturer for warranty review. EV C3 — cable strain relief showing wear, recommend replacement at next service. Heat pump Satisfactory — recent service + good operation. (5) AC EICR baseline: Satisfactory; one C3 improvement recommended (older lighting circuit lacks AFDD per A4:2026). (6) Report: comprehensive single EICR document covering all sources + per-source schedules + thermal images + BMS data charts; customer-facing summary + technical detail. (7) Cert evidence bundle: updated with this EICR + BMS data + thermal images + photos + manufacturer correspondence + customer communication. (8) Customer single-touchpoint conversation: clear explanation of findings + actions + warranty position + next periodic in 10 yr + continuous monitoring expectation. Total visit cost ~£1200-1800 inc F-gas specialist."
            whyItMatters="Coordinated 10-yr EICR-equivalent on multi-source LCT site demonstrates the discipline at scale. Single visit + pre-visit data + sequenced testing + coordinated specialist + single customer touchpoint = efficient + comprehensive + customer-friendly. Cert evidence bundle becomes the comprehensive lifecycle dossier. The C3 findings are typical for healthy installs — no immediate danger but a forward-looking improvement programme. Customer engaged + warranty position clarified + next periodic scheduled. The skilled person\'s competency spans BS 7671 + LCT-specific + multi-trade coordination + communication."
          />

          <Scenario
            title="5-yr EICR-equivalent identifies C1 + C2 findings — remediation path"
            situation="Mr Brown, semi-detached, 5 years since combined PV + BESS + EV install. EICR-equivalent finds: (a) outdoor EV charger OPDD shows status fault on inverter display + manufacturer event log shows 6 months of recurring OPDD trip-resets; (b) BESS DC bus IR has dropped from 25 MΩ to 0.8 MΩ (below Table 64 1 MΩ threshold)."
            whatToDo="(1) Classification: (a) EV charger OPDD recurring trips = C2 (potentially dangerous, urgent action); means the OPDD has been intermittently detecting issues that may indicate genuine open-PEN events OR OPDD self-fault. Without proper resolution = customer relying on a protection that may be failing. (b) BESS DC bus IR below threshold = C1 (danger present, immediate remedial action) under Table 64 + Reg 643.3.2; below the 1 MΩ minimum indicates insulation failure + risk of DC fault current. (2) Immediate actions: (a) BESS — isolate immediately; investigate root cause (cell module insulation degradation? DC busbar contamination? Cable damage?); manufacturer engagement; do not re-energise until resolution. (b) EV charger — investigate OPDD trip causes (DNO PEN-fault history in the area? EV charger fault? OPDD self-fault?); consider isolating the charger; manufacturer support engagement. (3) Report: C1 + C2 documented with clear photographic + thermal evidence; recommendations + timeline (BESS C1 = immediate; EV C2 = within days); customer notified in writing. (4) Customer engagement: explain findings + actions + safety; isolate BESS now; EV not currently safe to use without resolution; warranty engagement initiated. (5) Manufacturer engagement: BESS manufacturer warranty claim (DC bus IR collapse is typically a cell or wiring failure - covered); EV manufacturer OPDD diagnostics + potentially replacement. (6) Remediation: BESS cell module replacement or whole-unit replacement per manufacturer + DC bus IR re-verified post-repair; EV OPDD diagnostics + repair or replacement + functional test. (7) Re-inspection: post-remediation re-test relevant items + update EICR + cert evidence bundle. (8) Cert evidence bundle: comprehensive record — pre-remediation findings + photos / thermal / BMS data + manufacturer correspondence + remediation actions + post-remediation re-test + final EICR update."
            whyItMatters="C1 + C2 findings demonstrate the safety-critical value of the periodic discipline. Without the EICR-equivalent visit, the BESS DC bus IR failure could have continued degrading to a fault event; the OPDD intermittent could have masked a genuine open-PEN scenario. The skilled person\'s competency + manufacturer + customer engagement + comprehensive documentation resolve. UK 2025-26 BESS warranty claims for premature DC bus IR collapse + OPDD failures are real + well-handled by reputable manufacturers. Cert evidence bundle as the audit trail supports + protects all parties."
          />

          <CommonMistake
            title="Treating EICR-equivalent as box-ticking + skipping technology-specific extensions"
            whatHappens="Verifier completes standard AC EICR (Reg 643 testing on the circuits + RCD test + visual inspection) + signs off as Satisfactory. Skips PV DC IR re-test + IMD self-test + BESS BMS data extract + EV OPDD functional. The standard AC EICR passes but the technology-specific issues (PV IR drift, BESS cell imbalance, EV OPDD recurring trips) go undetected for another 5-10 yr."
            doInstead="EICR-equivalent for LCT = standard AC EICR + per-technology extensions. The extensions are not optional — they\'re the periodic inspection of the technology-specific protection + monitoring + functional. PV needs Section 712 extensions; BESS needs BMS data + DC bus IR + thermal (covered §12.3); EV needs Section 722 + Reg 722.411.4 OPDD verification; heat pump needs manufacturer service interface + VSD electronics. Cert evidence bundle records each extension + result. Without the extensions the EICR-equivalent is incomplete + the customer is not properly served."
          />

          <CommonMistake
            title="Coding findings inconsistently or defensively"
            whatHappens="Verifier wants to avoid difficult conversation with customer + codes a clear C2 finding as C3 (improvement recommended) to reduce urgency. Or vice versa — codes routine C3 items as C2 to inflate the apparent scope of work. Either approach undermines the EICR coding integrity + risks customer safety or financial harm."
            doInstead="Apply EICR codes per industry guidance + the BS 7671 framework defensibly. C1 = danger present + immediate action; C2 = potentially dangerous + urgent action; C3 = improvement recommended; FI = further investigation. The skilled person\'s judgement is the standard; cross-reference to relevant regs + manufacturer DoC + thermal / BMS data evidence supports the coding. Customer-facing communication explains the code + the rationale + the action + timeline. Cert evidence bundle documents the coding rationale. Defensible coding protects: customer (proper safety information); installer (audit + warranty + insurance); industry (consistent standards)."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Chapter 64 = Initial Verification (one-time at install). Chapter 65 = Periodic Inspection + Testing (ongoing). Different purposes; same Part 6 framework.',
              'Reg 651.1: periodic inspection + testing to determine satisfactory condition for continued service.',
              'Reg 652.1 frequency factors: type + use + maintenance + external influences + previous reports. Not a one-size calendar.',
              'Typical UK 2025-26 cycles: domestic owner-occupied 10 yr; domestic rented 5 yr; commercial 5 yr; industrial 3 yr.',
              'EICR codes: C1 (danger present, immediate), C2 (potentially dangerous, urgent), C3 (improvement recommended), FI (further investigation).',
              'PV EICR-equivalent extensions: DC IR + IMD + isolators + module + mounting + anti-islanding + yield + warning notices + thermal.',
              'BESS EICR-equivalent (§12.3): BMS data + DC bus IR + thermal + functional + warranty + AC EICR baseline.',
              'EV EICR-equivalent extensions: OPDD + RDC-DD + earthing + functional + cable + firmware + thermal imaging of terminations.',
              'Heat pump EICR-equivalent extensions: outdoor unit + VSD electronics + manufacturer service + BMS + control + earthing + functional.',
              'Wind / CHP / hydro EICR-equivalent: specialist coordination (structural / engine / civils) + electrical install + Section 551 + anti-islanding + EREC.',
              'Coordinated multi-source LCT EICR: single visit + pre-visit data + sequenced testing + multi-source extensions + single customer touchpoint.',
              'Reg 651.4: damage + deterioration + defects + dangerous conditions recorded. Reg 653.2 NOTE: photographic + thermographic images appended.',
              'Reg 651.5: competent skilled person. For LCT: BS 7671 EICR + LCT-specific + multi-trade coordination + reporting + communication competency.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                12.4 PEN faults + open-PEN
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-12-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                12.6 MCS handover packs
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
