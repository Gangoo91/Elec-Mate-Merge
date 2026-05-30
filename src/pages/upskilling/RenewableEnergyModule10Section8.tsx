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
    id: 'm10s8-part6-scope',
    question:
      'For a multi-source PEI commissioning, what does Reg 643 Part 6 testing cover that extends beyond a single-source install?',
    options: [
      'Identical',
      'Reg 643 Part 6 standard tests (continuity, insulation resistance, polarity, earth fault loop impedance, RCD operation, functional verification) apply per circuit + per source. Multi-source PEI extends to: (a) test in each practical source configuration where the test result may differ (e.g. earth fault loop impedance measured with DNO active vs with PV+BESS contributing); (b) verification at each isolation point that the per-source isolator achieves true isolation; (c) RCD operation testing in each source combination per Reg 551.4.2.',
      'Just one configuration',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643 Part 6 testing scope on multi-source PEI: (1) Standard per-circuit tests — continuity (Reg 643.2), insulation resistance (Reg 643.3), polarity (Reg 643.4), earth fault loop impedance (Reg 643.7), RCD operation (Reg 643.8), functional verification (Reg 643.10). Applied per circuit + per source-side connection. (2) Multi-source extensions: (a) Source-configuration influence — some tests give different results depending on which sources are active (e.g. earth fault loop impedance may be lower with multiple sources contributing). Test in the configuration declared as default + spot-check in alternate configurations. (b) Per-source isolation verification — each Reg 826.1.1.4 source-side isolator tested to confirm it achieves true isolation (verify zero-energy on its downstream side with the isolator open + other sources potentially active). (c) RCD verification per Reg 551.4.2 — controlled fault induction in each practical source combination + verify the appropriate RCD trips within Reg 415.1 time. (d) Island-mode tests if backup-capable — RCD operation in island via local N-E bond per Reg 826.1.1.2.2; ADS verification in island; protective device operation under reduced fault current. (3) Cert evidence: comprehensive test results per circuit per source configuration, recorded in the EIC + Schedule of Test Results + commissioning record. UK 2025-26 typical 4-source PEI: 30-60 individual test entries.',
  },
  {
    id: 'm10s8-anti-islanding-test',
    question:
      'How is Reg 551.7.5 anti-islanding verified at commissioning for a 4-source PEI?',
    options: [
      'Random',
      'Per-source simulated grid-loss test: (1) operate the DNO main switch OFF or use a controlled DNO-loss simulation device (manufacturer test feature on the inverter, or DNO-witnessed at the supply); (2) verify each grid-following inverter (PV, BESS in grid-following mode, V2G charger) detects loss within ENA G98/G99 specified time + disconnects from its supply; (3) measure disconnection time; (4) verify no continued export at the MET via clamp ammeter; (5) restore DNO + verify each source resynchronises correctly. Repeat per source. Cert evidence records per-source test result + timing.',
      'No test',
      'One test only',
    ],
    correctIndex: 1,
    explanation:
      'Anti-islanding commissioning test detail: (1) Test method options — (a) DNO main-switch operation under controlled conditions (most common UK 2025-26 residential); (b) inverter’s built-in self-test feature (most modern inverters include this in commissioning menu); (c) DNO-witnessed test at the supply with portable loss-of-mains simulation. (2) Per-source verification — each grid-following inverter (PV, BESS in direct-feeding mode, V2G charger) tested separately. Confirm each detects loss + disconnects within ENA G98 (small-scale) or G99 (larger) specified time — typically 200-500ms for RoCoF detection (G99 disallows Vector Shift for type-tested generation, so RoCoF with voltage / frequency monitoring is the required method on the type-tested inverters used in virtually all LCT installs; Vector Shift is legacy / non-type-tested only). (3) Timing measurement — oscilloscope or commissioning recorder captures the transition. Manufacturer test report or commissioning record retains evidence. (4) MET verification — clamp ammeter at supply tail confirms no continued export current after disconnection. Essential evidence that the inverter truly stopped feeding. (5) Restoration — restore DNO supply; verify each grid-following inverter resynchronises within G98/G99 specified window (a fixed reconnection delay of around 60 seconds after supply restoration is typical). PV resumes generation; BESS resumes its scheduled mode; V2G resumes charge / discharge per OCPP. (6) Repeat for each source — PV inverter, BESS inverter, V2G charger tested independently. (7) Cert evidence: per-source anti-islanding test record with method + timing + MET verification + restoration check + signed by commissioning person + (if applicable) DNO witness signature.',
  },
  {
    id: 'm10s8-customer-handover',
    question:
      'What does a comprehensive UK 2025-26 multi-source PEI customer handover pack contain?',
    options: [
      'Just EIC',
      'Comprehensive handover: (a) integrated PEI EIC + per-technology DoCs; (b) multi-source warning notice photograph + isolation procedure document (Reg 826.1.1.4); (c) operating modes summary (direct-feeding default, island if applicable, EMS priority logic); (d) EREC G99 + G100 correspondence; (e) MCS handover packs per technology; (f) EMS architecture diagram + tariff schedule; (g) per-component manuals + emergency contacts; (h) SEG registration steps; (i) maintenance schedule + warranty information; (j) customer acknowledgement signature page. Typical 30-60 pages.',
      'Random',
      'No handover',
    ],
    correctIndex: 1,
    explanation:
      'Comprehensive UK 2025-26 multi-source PEI customer handover pack structure: (1) Cover sheet + index — customer + site + sources + commissioning date + installer details. (2) Integrated PEI EIC — the master BS 7671 EIC referencing per-technology sub-sections. (3) Per-technology DoCs + product manuals — PV inverter, BESS, V2G charger, EMS controller. (4) Multi-source isolation — warning notice photograph + step-by-step isolation procedure + reverse-restoration + emergency contact + lockout/tagout best practice. (5) Operating modes — direct-feeding default behaviour, island mode (if capable) duration + critical loads + load-shedding behaviour, EMS priority logic, tariff schedule. (6) EREC correspondence — G99 connection agreement + G100 commissioning cert if applicable + DNO contact for changes. (7) MCS handover packs — per-technology MCS certs (MIS 3002 PV, etc.) + commissioning per technology + customer’s SEG application steps. (8) EMS configuration — architecture diagram + current schedule + customer-app login + degraded-mode behaviour. (9) Maintenance + warranty — service intervals per component + warranty terms + escalation contacts. (10) SEG registration — step-by-step guide for customer to apply to chosen SEG supplier + smart meter MPAN + MCS cert. (11) Cert evidence summary — list of all evidence + retention guidance + future-engineer attendance briefing. (12) Acknowledgement page — customer signature confirming receipt + understanding + acceptance of operating modes. UK 2025-26 typical: 30-60 page PDF + printed if customer prefers. Walk-through at commissioning (typically 30-60 mins customer-facing time).',
  },
  {
    id: 'm10s8-cert-distribution',
    question:
      'How is the cert evidence bundle distributed at commissioning?',
    options: [
      'One copy',
      'Three distinct copies: (a) Customer copy — handover pack at commissioning (digital PDF + printed if requested); (b) DNO copy — EREC G99 + G100 certificates + connection-relevant subset (closes the G99 application loop); (c) Installer archive — retained per professional standards (typically 6-10 years minimum) for future audit + warranty support + future-upgrade reference. UK 2025-26 typical: digital + cloud-backup; printed copies for customer if requested.',
      'Random',
      'Just installer',
    ],
    correctIndex: 1,
    explanation:
      'Cert evidence bundle distribution: (1) Customer copy — handed over at commissioning meeting. Format: PDF (USB drive, email link, customer cloud folder) + printed if customer requests. Customer retains for: future engineer attendance, insurance, home sale (provides next owner with the install history), warranty claims, SEG registration. Customer briefed on retention + accessibility. (2) DNO copy — specific subset filed with the customer’s DNO. Contents: EREC G99 commissioning cert (closes the G99 application loop), G100 cert if applicable, supporting evidence as DNO requires. Typically submitted via DNO online portal or email. UK 2025-26 DNO portals: UKPN ConnectU+, SSEN Connections, NGED Connections, SPEN Connections, Northern Powergrid Connections. (3) Installer archive — the complete cert evidence bundle retained. Retention: typically 6-10 years minimum per professional standards (NICEIC, NAPIT, ELECSA recommend retention to match insurance + statutory limitation periods). Format: digital cloud archive (Dropbox, Google Drive, OneDrive, dedicated installer cloud platform). (4) Future-engineer access — if installer changes or customer attends with different engineer, the latest cert evidence bundle is the operative document. Customer provides their copy; future engineer reads BEFORE attending. (5) Cert evidence integrity — the bundle must be consistent across all three copies (customer + DNO + installer). Discrepancies = re-issue + update. (6) UK 2025-26 emerging: digital cert evidence platforms (Elec-Mate, NAPIT cert portal, others) providing centralised cert evidence with role-based access for customer + DNO + installer.',
  },
];

const quizQuestions = [
  {
    question:
      'You commission a new V2G install on an existing PV + BESS PEI. What sequence of tests covers BS 7671 Part 6 + Reg 551.7.5 + Reg 551.4.2 + Reg 826.1.x for the V2G-specific scope?',
    options: [
      'Random sequence',
      'Practical sequence: (1) Reg 643 continuity + IR + polarity + Zs on the V2G supply circuit; (2) Reg 415.1 RCD operation on V2G supply (Type A + integrated RDC-DD per BS EN 61851-1, or Type B); (3) Reg 551.7.5 anti-islanding test on the V2G charger (simulated grid-loss → verify charger disconnect within ENA G99 time); (4) Reg 551.4.2 RCD effectiveness in each new source combination (V2G+DNO, V2G+PV+DNO, V2G+BESS+DNO, V2G+PV+BESS+DNO); (5) Reg 826.1.1.4 V2G isolator + updated warning notice + isolation procedure walkthrough; (6) Reg 826.1.2.1 overcurrent spot-check at MET with V2G discharge contribution; (7) OCPP backend + EMS integration verification; (8) G99 amendment commissioning evidence filed; (9) G100 recommissioning if export-limited.',
      'Just BS 7671',
      'Skip tests',
    ],
    correctAnswer: 1,
    explanation:
      'V2G addition commissioning sequence on existing PV+BESS PEI: (1) Standard Reg 643 Part 6 on V2G supply circuit — continuity (R1+R2), IR (>1 MΩ typical), polarity, earth fault loop impedance Zs (matched against MCB / RCBO disconnection requirements). (2) RCD operation per Reg 415.1 + Reg 722.531.3 — V2G charger supply has Type A RCBO + integrated RDC-DD in Wallbox Quasar 2 per BS EN 61851-1, or Type B if integrated declaration absent. Test trip at 5× IΔn + verify time per Reg 415.1. (3) Reg 551.7.5 anti-islanding — V2G as generating set in discharge. Simulate DNO loss; verify V2G charger detects + disconnects within ENA G99 specified time; measure MET current confirms no continued export. (4) Reg 551.4.2 multi-source RCD effectiveness — induce controlled fault scenario in each NEW source combination introduced by V2G: V2G + DNO; V2G + PV + DNO; V2G + BESS + DNO; V2G + PV + BESS + DNO. Verify appropriate RCD trips per scenario. (5) Reg 826.1.1.4 — V2G charger isolator added to multi-source isolation set + warning notice updated to include V2G + isolation procedure document updated + walkthrough confirms each isolator operates + warning notice in correct location + procedure accurate. (6) Reg 826.1.2.1 overcurrent — spot-check PSCC at MET with V2G discharging at peak (e.g. clamp ammeter during simulated peak event); compare to PEI overcurrent study; verify MCB / RCBO breaking capacity adequate. (7) OCPP + EMS — V2G charger connects to OCPP backend (Octopus Power Pack or equivalent); EMS reads V2G state via OCPP or Modbus; commissioning verifies bidirectional communication + V2G scheduling. (8) G99 amendment — commissioning evidence filed with DNO closing the amendment loop. (9) G100 recommissioning — if site export-limited, ELS curtailment hierarchy updated to include V2G + commissioning test verifies V2G curtailment-first behaviour + new G100 cert filed. Total time: ≈1-2 days for V2G addition commissioning on existing PEI. Cert evidence: per-test result + updated integrated PEI EIC + G99 amendment correspondence + G100 if applicable + OCPP backend record + customer handover update.',
  },
  {
    question:
      'A customer’s multi-source PEI has been operational for 18 months. Customer reports periodic RCD trips that don’t correlate to obvious load events. What troubleshooting approach addresses Reg 551.4.2 + Reg 826.x considerations?',
    options: [
      'Replace RCD',
      'Systematic multi-source investigation: (1) Identify which RCD trips + which circuit. (2) Examine each source’s behaviour at trip times: PV generation profile, BESS charge/discharge, V2G state, EMS scheduling — correlate with trip log timestamps. (3) Check for smooth-DC leakage from bidirectional inverters (Type A RCD saturation possible — Reg 531.3.3); manufacturer DoC verification + clamp meter check for DC residual current. (4) Verify Reg 551.4.2 RCD effectiveness across source combinations — test in each combination + see which triggers spurious trip. (5) Check Reg 826.1.4 SPD operation — surge events from EMS source-switching could cause spurious RCD trip. (6) Check EMS / source-switching schedule for timing patterns matching trip events.',
      'Random',
      'No troubleshooting',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-source PEI RCD trip troubleshooting framework: (1) Pattern identification — review trip log (built into modern RCBO test instruments or via vendor monitoring apps): time-of-day clustering, source-state at trip, weather, load at trip. (2) Correlation with sources — SolarEdge / Tesla / GivEnergy app shows generation + storage state + load. V2G OCPP backend shows charge / discharge. EMS shows scheduling. Correlate trip timestamps to source events. Common patterns: PV ramp-up (clouds clearing) causing brief inverter-output transient; V2G mode-change to discharge introducing residual current spike; BESS state transition; EMS sending a setpoint command. (3) Smooth-DC residual investigation — modern hybrid inverters + V2G chargers can produce smooth DC at fault interface. Type A RCDs saturate at ≈6 mA smooth DC + may fail to trip OR trip spuriously due to saturation effects. Reg 531.3.3 + Reg 722.531.3 RCD type selection. Use a leakage current clamp meter at the supply tail of each source to measure baseline + transient residual current under different operating modes. If smooth DC residual > 6 mA detected: upgrade to Type B RCD or verify integrated RDC-DD per manufacturer DoC. (4) Reg 551.4.2 verification — test RCD operation deliberately in each source combination. Some combinations may have circulating earth current that causes spurious trip. Investigate equipotential bonding + Reg 411.3.2 earth fault path. (5) Reg 826.1.4 SPD — if SPDs operate during source switching, the operation may briefly cause apparent residual current at adjacent RCDs. SPD operation log + correlate with RCD trips. (6) Mitigation — type upgrade (A → B); supplementary equipotential bonding; SPD relocation; firmware update on inverter / EMS to smooth source transitions; addition of Reg 415 30 mA RCBO discrimination if cross-RCBO issue. (7) Cert evidence: troubleshooting record + root-cause analysis + remediation + updated commissioning verification. Future-engineer reference avoids repeated investigation.',
  },
  {
    question:
      'For a residential multi-source PEI, what is the recommended UK 2025-26 maintenance schedule?',
    options: [
      'No maintenance',
      'Recommended: (a) Annual visual + functional inspection — source-side isolators tested, RCDs tested per Reg 415.1 (push button + test instrument), inverter / BESS / V2G operational status verified; (b) Periodic Inspection + Test (PIR/EICR equivalent) at 5 years (residential) or 3 years (commercial); (c) EMS / OCPP backend account + tariff review annually; (d) Cert evidence bundle review at any change (component replacement, EREC amendment, firmware update); (e) Smart meter MPAN + SEG supplier review annually; (f) Per-vendor manufacturer recommended service intervals (e.g. inverter cooling fan + capacitor checks at 5+ years).',
      'Random',
      'Daily checks',
    ],
    correctAnswer: 1,
    explanation:
      'UK 2025-26 multi-source PEI maintenance schedule: (1) Annual customer inspection — visual check at consumer unit: all RCDs test-button trip (customer-runnable), warning notice intact + legible, inverter / BESS / V2G operating per app, no abnormal noise / heat / smell. Customer-runnable; brief recorded in customer notes. (2) Annual functional commissioning check — by competent person: each RCD tested per Reg 415.1 with test instrument (not just button); inverter anti-islanding self-test feature run (most modern inverters include this in commissioning menu); BESS state-of-health check via monitoring app; V2G OCPP backend connection check; EMS configuration verified vs design. Recorded in maintenance log. £100-300/year typical residential. (3) Periodic Inspection + Test (PIR / EICR equivalent) at 5 years — full Reg 643 testing per circuit + integrated PEI considerations + Reg 551.4.2 multi-source RCD verification + Reg 826.x review + cert evidence bundle update. £500-1,500 typical residential. (4) EMS + tariff review annually — customer-facing: SEG supplier comparison; Octopus / British Gas / E.ON / etc. tariff competitive review; EMS firmware update verification. Often customer-self-service. (5) EREC change triggers — any equipment change requires G99 amendment + Chapter 82 re-evaluation + cert evidence update + recommissioning per scope. Not on calendar schedule but on event basis. (6) Component manufacturer schedules — inverter cooling fans + capacitor checks typically at 5-10 years; BESS battery state-of-health monitored continuously by BMS; V2G charger connectors inspected per usage. Per-vendor recommendation. (7) Cert evidence: maintenance log accumulates + included in cert evidence bundle for future engineer / property sale / insurance. UK 2025-26 customer expectation: minimal hands-on maintenance + reliable monitoring app + transparent service intervals.',
  },
  {
    question:
      'A customer sells their property with operational multi-source PEI. What does the new owner need from the cert evidence bundle?',
    options: [
      'Nothing',
      'Comprehensive handover to new owner: (a) integrated PEI EIC + per-technology DoCs (proves BS 7671 compliance at install); (b) multi-source isolation procedure + warning notice (essential safety information); (c) operating modes + EMS architecture (so new owner can operate); (d) EREC G99 + G100 correspondence (DNO connection terms transfer with property); (e) MCS handover packs (proves MCS certification — enables SEG transfer); (f) SEG registration steps + supplier choice info; (g) maintenance log + warranty information; (h) emergency contacts + future-engineer briefing. Property solicitor typically requests during conveyancing.',
      'Random',
      'Just receipts',
    ],
    correctAnswer: 1,
    explanation:
      'Property sale + cert evidence bundle transfer scope: (1) Solicitor conveyancing requirements — buyer’s solicitor typically requests evidence of: BS 7671 compliance (EIC), DNO connection agreement (EREC G99 / G100), MCS certification (for SEG transfer), warranty / lifetime of installed equipment, planning consent if applicable (commercial / large-scale). Standard CON29 + LPE1 forms cover some; specific renewable installation evidence requested separately. (2) BS 7671 evidence — latest integrated PEI EIC. Buyer’s electrician may want to attend pre-sale or post-sale to verify install matches EIC + perform Periodic Inspection (EICR). Vendor provides EIC for review. (3) DNO transfer — EREC G99 + G100 connection agreements transfer with the property + MPAN. New owner contacts DNO to confirm transfer + ensure agreement remains in their name. Without transfer: DNO may consider connection in dispute. (4) MCS transfer — MCS certification is per-install, not per-customer. SEG eligibility transfers with property + MCS cert + smart meter MPAN. New owner re-registers for SEG with their chosen supplier (may switch suppliers; may need to wait for smart meter MPAN ownership transfer to complete). (5) Operating instructions — new owner needs to understand: how to operate the EMS app, how to handle a power cut (island mode), how to isolate in emergency, what to do if a fault occurs, who to call for vendor support. (6) Warranty + maintenance — component warranties typically per-purchaser; check with manufacturer per component whether warranty transfers with property (some yes, some no). Maintenance log shows history. (7) Cert evidence package for sale — vendor provides: complete cert evidence bundle (latest integrated PEI EIC + per-technology + EREC + MCS + EMS + customer handover) + maintenance log + sale-handover supplement noting any changes since original install + buyer’s sign-off acknowledging receipt. UK 2025-26 best practice: multi-source PEI adds value to property sale (BUS-grant heat pump + PV + BESS typical add £5-15k to property value); well-organised cert evidence supports the price.',
  },
  {
    question:
      'What happens to the cert evidence bundle when the installer goes out of business or stops trading?',
    options: [
      'Lost',
      'Customer’s copy is the operative document. Property buyer / next engineer / DNO can read it without installer involvement. Customer should retain digital + (ideally) printed copies, accessible at the property + in cloud backup. UK 2025-26 reality: installer cloud archives may become inaccessible; customer-held copy is the resilience. NICEIC + NAPIT + ELECSA hold copies of registered installers’ cert evidence in some cases. Future engineer can reissue subsequent commissioning records but cannot reconstruct the original installation evidence from scratch.',
      'No impact',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Cert evidence resilience considerations: (1) Customer copy is critical — customer retains digital (USB / cloud / email backup) + printed (physical folder at property). UK 2025-26 best practice: digital cloud backup + handover copy on USB stick + printed binder at consumer unit location for emergency reference. (2) Installer business risk — UK 2025-26 reality: small installer businesses may cease trading (retirement, failure, M&A); their cloud archives may become inaccessible. Customer’s own copy is the resilience. (3) Industry retention — NICEIC, NAPIT, ELECSA, and other UK certification bodies hold copies of their registered installers’ cert evidence for some scope. May provide retrieval service for ex-customer with proof of identity / address. Not comprehensive coverage. (4) Future-engineer reconstruction — if cert evidence is lost completely: a future engineer can perform a fresh Periodic Inspection + Test (PIR / EICR) + issue a current Condition Report; they CANNOT reconstruct the original installation EIC / commissioning evidence. The installation is effectively "as-found" from that point. (5) Insurance + claims — customer’s home insurance + warranty claims rely on cert evidence proving the installation’s compliance. Lost evidence may reduce claim success. (6) Property sale — lost cert evidence reduces sale value or buyer confidence. Vendor may need to fund a fresh inspection + Condition Report to support sale. (7) UK 2025-26 emerging: digital cert evidence platforms with role-based access + cloud-resilient archive (independent of installer’s business continuity) — Elec-Mate, NAPIT cert portal, and similar. Customer + DNO + installer access; backups guaranteed by platform; trade-resilient. Growing adoption. (8) Customer advice at handover: ‘keep this in 2 places. Cloud + USB. Print 1 copy for emergency reference. Treat it like the property deeds.’',
  },
  {
    question:
      'For the M10 closing scenario, what completes a UK 2025-26 multi-source PEI handover to the customer?',
    options: [
      'Just paperwork',
      'Walk-through meeting (~60-90 mins): (a) tour of installation showing each source + isolator + warning notice locations; (b) demonstration of EMS app + tariff schedule + how customer sees / changes settings; (c) walk-through of multi-source isolation procedure with customer; (d) explanation of operating modes (direct-feeding default, island if applicable, what happens during a power cut); (e) review of SEG registration steps + supplier shopping; (f) emergency contact info + future-attendance procedure; (g) handover pack delivery (digital + printed); (h) customer acknowledgement signature + opportunity for questions; (i) follow-up commitment + first-month check-in.',
      'No meeting',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive UK 2025-26 multi-source PEI customer handover meeting: (1) Duration — 60-90 minutes face-to-face at commissioning. Customer + installer; partner / occupants ideally present. (2) Installation tour — walk customer through physical installation: where PV inverter is + DC isolator; where BESS is + AC + DC isolators; where V2G charger is + isolator; where EMS controller is; where backup gateway is (if island-capable); where main consumer unit + DNO main switch is; where warning notice is + verify customer can see + understand. (3) EMS app demonstration — customer logs in (sets password if not done); installer shows: current generation / consumption / BESS state; tariff schedule + how to change ToU windows; load-shedding configuration; alerts + notifications. Customer operates the app supervised once. (4) Multi-source isolation walk-through — customer reads the isolation procedure aloud; installer walks them to each isolator; customer operates one isolator under supervision (then restores); customer understands sequence + verification + emergency steps. (5) Operating modes explanation — ‘your PEI runs in direct-feeding mode by default — generating + exporting / importing in parallel with the DNO. If you have island capability, here’s what happens during a power cut: backup gateway transitions, BESS becomes grid-forming, critical loads remain powered for X hours; non-critical loads shed. Reverse on DNO restoration.’ (6) SEG registration — customer’s steps: choose supplier, submit MCS cert + EIC + MPAN, expected timeline. Installer recommends 2-3 suppliers + tariff comparison. (7) Emergency contacts — installer’s out-of-hours number; vendor support lines per component; DNO emergency 105; gas Emergency 0800 111 999 (if applicable). Print + cloud + on-fridge magnet typical UK 2025-26. (8) Handover pack delivery — digital + printed. Customer signs receipt + acknowledgement. (9) Follow-up — installer commits to first-month check-in (phone/email): ‘how is the system performing? any concerns?’ + 6-month follow-up. (10) Question time — customer asks anything; installer answers honestly. Cert evidence bundle records the handover meeting date + attendees + signed acknowledgement + customer questions raised.',
  },
];

const faqs = [
  {
    question: 'How long does a complete multi-source PEI commissioning take end-to-end?',
    answer:
      'UK 2025-26 typical 4-source PEI (PV + BESS + V2G + heat pump): commissioning labour 2-3 days. Activities: BS 7671 Reg 643 Part 6 per circuit (½ day); Reg 551.7.5 per inverter + Reg 551.4.2 per source combination (½ day); Reg 826.1.1.2.2 N-E switching test if island-capable (1-2 hours); Reg 826.1.1.4 multi-source isolation walkthrough (1 hour); Reg 826.1.2.1 overcurrent spot-checks (½ day); EREC G99 commissioning + G100 if applicable (½ day); EMS commissioning + degraded-mode test (½ day); customer handover meeting (60-90 mins). Cost: £2-5k commissioning portion of total install.',
  },
  {
    question: 'Who is the competent person for a multi-source PEI commissioning?',
    answer:
      'BS 7671 compliance: registered installer (NICEIC, NAPIT, ELECSA, etc.) with multi-source / PEI experience. EREC G99 + G100: ENA-approved commissioning person (typically the MCS-registered installer’s electrical scope team). MCS handover: MCS-certified company. EMS commissioning: vendor-trained for vendor EMS; competent in protocols (Modbus / OCPP) for third-party EMS. UK 2025-26 best practice: single point of accountability — lead installer or MCS company — owns the integrated commissioning + cert evidence bundle.',
  },
  {
    question: 'Can a multi-source PEI commissioning be split across multiple visits?',
    answer:
      'Yes — practical for staged installs. Customer-side: each commissioning visit must result in a complete cert evidence bundle for the install state at that point + customer handover for the operational scope. Final integrated PEI EIC supersedes earlier per-stage EICs. Cert evidence bundle is updated chronologically. UK 2025-26 typical: PV+BESS first visit (BS 7671 + EREC G99 + MCS + SEG + customer handover); EV/V2G later visit (additional EREC G99 amendment + Section 722 + 551 + Chapter 82 update + customer handover supplement).',
  },
  {
    question: 'What testing instruments are needed for a multi-source PEI commissioning?',
    answer:
      'Standard BS 7671 testing kit: multifunction tester (Megger MFT 1741+, Fluke 1664 FC, Kewtech KT63DL or equivalent) covering Reg 643 Part 6 tests (continuity, IR, polarity, EFLI, RCD operation). Plus: clamp ammeter for export measurement at MET (Fluke 376 FC or similar); thermal camera for heat-related fault identification; oscilloscope optional for anti-islanding timing measurement; commissioning app from each vendor (SolarEdge, Tesla, GivEnergy, Enphase) for vendor-specific tests + telemetry capture. Estimated kit cost: £2,000-4,000 for installer.',
  },
  {
    question: 'How should commissioning evidence be photographically documented?',
    answer:
      'UK 2025-26 best practice: cert evidence bundle includes photographs of: (a) multi-source warning notice in place at consumer unit; (b) each source-side isolator labelled correctly; (c) main consumer unit overall view; (d) RCD test result on display of test instrument (each RCD); (e) inverter / BESS / V2G install final views; (f) DC isolators + labelling; (g) Backup Gateway if installed; (h) ELS device for G100 if applicable; (i) commissioning test instrument readings for representative tests. Photographs date-stamped via instrument or smartphone. Integrated into the digital cert evidence bundle.',
  },
];

export default function RenewableEnergyModule10Section8() {
  const navigate = useNavigate();

  useSEO({
    title: 'Commissioning + handover for hybrid PEI | Renewable Energy 10.8 | Elec-Mate',
    description:
      'Closing module 10 section: integrated commissioning + handover for multi-source PEI. Reg 643 Part 6 + Reg 551.7.5 anti-islanding + Reg 551.4.2 multi-source RCD + EREC G99 / G100 + EMS commissioning + customer handover. Cert evidence bundle composition, distribution, retention. Future-engineer attendance preparation. Property sale handover.',
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
            eyebrow="Module 10 · Section 8 · BS 7671:2018+A4:2026 · Reg 643 Part 6 + Chapter 82 closure"
            title="Commissioning + handover for hybrid systems"
            description="The integrating closer of Module 10. Multi-source PEI commissioning sequence: Reg 643 Part 6 testing per circuit + Reg 551.7.5 anti-islanding per source + Reg 551.4.2 multi-source RCD effectiveness + Reg 826.1.1.2.2 N-E switching if island-capable + Reg 826.1.1.4 multi-source isolation + Reg 826.1.2.1 overcurrent + EREC G99 / G100 commissioning + EMS commissioning + customer handover. Cert evidence bundle composition + distribution + retention. The integration of everything Module 10 has covered."
            tone="yellow"
          />

          <TLDR
            points={[
              'Multi-source PEI commissioning is a 2-3 day labour + £2-5k cost activity covering 10+ distinct verification streams across BS 7671 + EREC + MCS + EMS.',
              'Reg 643 Part 6 testing per circuit + per practical source configuration. Standard continuity, IR, polarity, EFLI, RCD, functional verification — extended across sources.',
              'Reg 551.7.5 anti-islanding test per grid-following inverter: simulated grid-loss + timing verification + MET no-export confirmation. Per-source.',
              'Reg 551.4.2 multi-source RCD effectiveness: controlled fault induction in each practical source combination + appropriate RCD trip verification.',
              'Reg 826.1.1.2.2 N-E switching test (if island-capable): simulated grid-loss + transition timing + N-E continuity per state + reverse-restoration.',
              'Reg 826.1.1.4 multi-source isolation walkthrough: each isolator operates + warning notice in place + isolation procedure document accurate.',
              'Reg 826.1.2.1 overcurrent verification: spot-checks of PSCC at protective device locations + comparison to PEI overcurrent study.',
              'EREC G99 commissioning cert (DNO-witnessed or self-certified) + EREC G100 commissioning cert if export-limited.',
              'EMS commissioning: priority logic verification, ToU schedule active, load shedding, degraded-mode (EMS-offline) behaviour confirmed safe.',
              'Customer handover meeting: 60-90 mins face-to-face, installation tour + EMS app demo + isolation walkthrough + operating modes + SEG steps + emergency contacts + handover pack delivery + acknowledgement signature.',
              'Cert evidence bundle: integrated PEI EIC + per-technology DoCs + EREC correspondence + MCS handover + Reg 826 commissioning records + EMS architecture + photographs + customer handover signatures. Typical 30-60 pages.',
              'Distribution: customer copy (handover) + DNO copy (G99/G100 closure) + installer archive (6-10 years). Future engineer reads BEFORE attending.',
              'Resilience: customer-held copy is the operative document if installer ceases trading. Digital cloud + printed binder + USB backup. UK 2025-26 emerging: independent digital cert evidence platforms.',
              'Property sale handover: full cert evidence bundle transfers to new owner; supports BUS / SEG continuity, insurance, conveyancing, future engineer attendance. Multi-source PEI adds property value £5-15k typical.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Plan a complete commissioning sequence for a multi-source PEI covering BS 7671 Part 6 + Reg 551 + Reg 826 + EREC + EMS + customer handover.',
              'Execute Reg 551.7.5 anti-islanding tests per grid-following inverter with timing + MET verification.',
              'Verify Reg 551.4.2 multi-source RCD effectiveness across practical source combinations.',
              'Verify Reg 826.1.1.2.2 N-E switching non-overlap + transition timing for island-capable PEI.',
              'Compose + present the cert evidence bundle: integrated PEI EIC + per-technology DoCs + EREC + MCS + Reg 826 + EMS + photographs.',
              'Conduct a comprehensive customer handover meeting covering installation tour + EMS demo + isolation walkthrough + operating modes + SEG + emergency contacts.',
              'Plan cert evidence bundle distribution + retention + property-sale handover continuity.',
              'Troubleshoot multi-source-specific issues: smooth-DC RCD trips, EMS coordination, multi-source RCD effectiveness, source-state correlations.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Commissioning is not the end of the install. It’s the bridge between ‘what was built’ and ‘what the customer can operate + the next engineer can maintain’. The cert evidence bundle is the bridge itself.
          </Pullquote>

          <ContentEyebrow>The integrated commissioning workflow</ContentEyebrow>

          <ConceptBlock
            title="The 10+ verification streams of a multi-source PEI"
            plainEnglish="Multi-source PEI commissioning is substantial. UK 2025-26 typical 4-source PEI (PV + BESS + V2G + heat pump) requires 10+ distinct verification streams across BS 7671 + Section 551 + Chapter 82 + EREC + MCS + EMS + customer handover. 2-3 day labour. £2-5k commissioning cost portion of the install."
            onSite="The mental model: don’t batch commissioning. Sequence the streams; document each; aggregate into the integrated cert evidence bundle. Customer handover at the end after everything verified. Don’t hand over a half-commissioned PEI; the customer needs to know everything passes."
          >
            <p>Complete commissioning streams + typical sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Stream 1: Reg 643 Part 6
                  per circuit</strong> — continuity, IR, polarity, EFLI, RCD,
                functional verification per circuit + per source-side connection.
                Standard BS 7671 commissioning, extended across the multi-source
                install. Time: ≈1 day for typical 4-source PEI
              </li>
              <li>
                <strong className="text-white">Stream 2: Reg 551.7.5
                  per inverter</strong> — anti-islanding test per grid-following
                inverter. Simulated grid-loss + timing within ENA spec + MET
                no-export verification + restoration check. Per source. Time:
                ½ day
              </li>
              <li>
                <strong className="text-white">Stream 3: Reg 551.4.2
                  per source combination</strong> — multi-source RCD
                effectiveness. Controlled fault induction in each practical
                combination + verify appropriate RCD trips. Time: ½ day
              </li>
              <li>
                <strong className="text-white">Stream 4: Reg
                  826.1.1.2.2 N-E switching</strong> — if island-capable.
                Simulated grid-loss + transition timing + N-E continuity per state
                + reverse transition. Time: 1-2 hours
              </li>
              <li>
                <strong className="text-white">Stream 5: Reg
                  826.1.1.4 multi-source isolation</strong> — isolator
                walkthrough + warning notice verification + isolation procedure
                document accuracy. Time: 1 hour
              </li>
              <li>
                <strong className="text-white">Stream 6: Reg
                  826.1.2.1 overcurrent</strong> — spot-checks of PSCC at
                protective device locations + comparison to overcurrent study.
                Time: ½ day
              </li>
              <li>
                <strong className="text-white">Stream 7: EREC G99
                  commissioning</strong> — cert filed with DNO. DNO-witnessed
                test if required, otherwise self-certified per manufacturer DoC +
                ENA type-test approval. Time: ½ day (more if DNO witness)
              </li>
              <li>
                <strong className="text-white">Stream 8: EREC G100
                  commissioning</strong> — if export-limited. ELS device
                approval verification + soft / hard limit configuration check +
                deliberate over-generation test + curtailment timing measurement
                + cert filed with DNO. Time: ½ day
              </li>
              <li>
                <strong className="text-white">Stream 9: EMS
                  commissioning</strong> — priority logic verification, ToU
                schedule active, load shedding behaviour, degraded-mode
                (EMS-offline) behaviour confirmed safe. Time: ½ day
              </li>
              <li>
                <strong className="text-white">Stream 10: MCS
                  handover</strong> — MCS company collates: MCS cert per
                technology, commissioning per technology, BS 7671 EIC, customer
                handover pack contribution. Time: integrated across other streams
              </li>
              <li>
                <strong className="text-white">Stream 11: Customer
                  handover meeting</strong> — 60-90 mins face-to-face.
                Installation tour + EMS app demo + isolation walkthrough +
                operating modes + SEG steps + emergency contacts + handover pack
                delivery + acknowledgement signature
              </li>
              <li>
                <strong className="text-white">Aggregate cert
                  evidence</strong> — integrated PEI EIC + per-technology DoCs
                + EREC correspondence + MCS handover packs + Reg 826 commissioning
                records + EMS architecture + photographs + customer signatures.
                30-60 pages
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Anti-islanding + RCD multi-source testing methodology"
            plainEnglish="The two most safety-critical multi-source-specific commissioning tests: Reg 551.7.5 anti-islanding (each grid-following inverter must disconnect on DNO loss within ENA spec) + Reg 551.4.2 multi-source RCD effectiveness (RCD architecture works across every practical source combination). Both verified by controlled physical tests + documented with timing + readings."
            onSite="Practical testing kit: multifunction tester for standard Reg 643 + RCD instrument + clamp ammeter for MET export verification + (optional) oscilloscope for anti-islanding timing measurement. Vendor commissioning apps capture inverter self-test results. Photograph each test instrument reading; date-stamp via instrument or smartphone."
          >
            <p>Anti-islanding + multi-source RCD test methodology:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Anti-islanding test
                  setup</strong> — inverter operating in direct-feeding mode +
                clamp ammeter on supply tail at MET + (optional) oscilloscope
                across inverter AC output for timing measurement + commissioning
                record sheet
              </li>
              <li>
                <strong className="text-white">Anti-islanding test
                  execution</strong> — (a) open DNO main switch (controlled
                grid-loss simulation); (b) measure time from DNO open to inverter
                disconnect (typically 200-500ms; note G99 disallows Vector
                Shift for type-tested generation, so RoCoF — with voltage / frequency
                monitoring — is the required loss-of-mains method on the type-tested
                inverters used in virtually all LCT installs, Vector Shift being legacy
                / non-type-tested only); (c) verify MET clamp ammeter shows zero current within
                &lt;2 s; (d) restore DNO + verify inverter resynchronises within
                ENA-specified window (typically a fixed reconnection delay of around
                60s after supply restoration); (e) repeat
                per inverter (PV, BESS, V2G)
              </li>
              <li>
                <strong className="text-white">Anti-islanding
                  evidence</strong> — per-inverter test result with method +
                timing + MET verification + restoration check + signed by
                commissioning person + (if applicable) DNO witness signature.
                Photograph oscilloscope screen / commissioning app result
              </li>
              <li>
                <strong className="text-white">Multi-source RCD test
                  setup</strong> — RCD test instrument (e.g. multifunction
                tester) on each protective device + controlled-source-state
                ability (turn each source on/off independently) + Reg 643.8 RCD
                test settings
              </li>
              <li>
                <strong className="text-white">Multi-source RCD test
                  execution</strong> — enumerate practical source
                combinations: DNO+PV, DNO+PV+BESS, DNO+PV+BESS+V2G, BESS+PV
                island (if applicable), etc. For each combination: (a) configure
                sources to active state; (b) deliberately induce residual current
                via RCD test instrument (or controlled-current path); (c) verify
                appropriate RCD trips within Reg 415.1 specified time; (d) reset +
                continue
              </li>
              <li>
                <strong className="text-white">Multi-source RCD
                  evidence</strong> — per-combination test result with trip
                time + RCD identifier + source combination + signed. Tabulated
                in cert evidence
              </li>
              <li>
                <strong className="text-white">Type B verification</strong>
                — if any source has smooth-DC fault current capability per
                manufacturer DoC, verify RCD type is appropriate (Type B or Type
                A + integrated RDC-DD). Photograph RCD label
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  consolidation</strong> — anti-islanding test record + RCD
                multi-source effectiveness table + photographs + signed
                commissioning record + EREC G99 commissioning evidence including
                the anti-islanding verification
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643 Part 6 (entire) + Reg 643.7.3 RCD verification"
            clause="Verification of the characteristics and/or the effectiveness of the associated protective device shall be made for overcurrent protective devices by visual inspection or other appropriate methods (i.e. short-time or instantaneous tripping setting for circuit-breakers, current rating and type for fuses); and for RCDs, by visual inspection and testing. The effectiveness of automatic disconnection of supply by RCDs shall be verified using suitable test instruments."
            meaning="Reg 643 Part 6 is the BS 7671 testing framework, applied to multi-source PEI with extensions. Reg 643.7.3 specifically addresses RCD verification: visual inspection (correct type, rating, sensitivity per design) + testing (using suitable test instruments — multifunction tester or dedicated RCD test instrument). For multi-source PEI: (1) Standard Reg 643 Part 6 — continuity (Reg 643.2), IR (Reg 643.3), polarity (Reg 643.4), EFLI (Reg 643.7), RCD operation (Reg 643.7.3 + 643.8), functional verification (Reg 643.10) per circuit. (2) Multi-source extensions — RCD verification per Reg 551.4.2 across every practical source combination (the per-source-combination test described above). Anti-islanding verification per Reg 551.7.5 per grid-following inverter (the simulated grid-loss test described above). Multi-source isolation walkthrough per Reg 826.1.1.4. N-E switching test per Reg 826.1.1.2.2 if island-capable. Overcurrent spot-check per Reg 826.1.2.1. (3) Cert evidence — the EIC schedule of test results captures per-circuit per-source-configuration entries; commissioning record captures the verification streams + signatures + photographs. UK 2025-26 typical 4-source PEI: 30-60 individual test entries; 60-100 pages cert evidence bundle including all supporting documentation."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Cert evidence bundle + customer handover</ContentEyebrow>

          <Pullquote>
            The cert evidence bundle is the document that survives the install. Customer holds a copy, DNO holds a subset, installer holds the archive. When something matters — sale, audit, fault, future upgrade — someone reads the bundle. Make it readable.
          </Pullquote>

          <ConceptBlock
            title="Cert evidence bundle structure + content"
            plainEnglish="The integrated cert evidence bundle ties together everything: BS 7671 compliance (EIC + DoCs) + DNO interface (EREC G99 + G100) + technology certification (MCS) + integration design (Reg 826 + EMS) + customer handover signatures. Typical UK 2025-26 4-source PEI bundle: 30-60 pages PDF, structured + indexed, customer + DNO + installer copies."
            onSite="Practical structure: cover sheet + index, integrated PEI EIC, per-technology DoCs, EREC correspondence, MCS handover packs, commissioning records per Reg 826 stream, EMS architecture, photographs, customer handover acknowledgement signatures. Format: digital PDF (primary) + printed if customer requests. Cloud-archived + USB-backed-up + on-property reference copy."
          >
            <p>Cert evidence bundle structure detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">1. Cover sheet +
                  index</strong> — customer + site + sources + commissioning
                date + installer details + sources contact + version control
              </li>
              <li>
                <strong className="text-white">2. Integrated PEI
                  EIC</strong> — the master BS 7671 EIC. References
                per-technology sub-sections; carries Chapter 82 compliance summary;
                schedule of test results
              </li>
              <li>
                <strong className="text-white">3. Per-technology
                  DoCs + product manuals</strong> — PV inverter, BESS, V2G
                charger, EMS controller, backup gateway, ELS device if G100. Each
                with ENA / BS EN / IEC reference
              </li>
              <li>
                <strong className="text-white">4. Multi-source
                  isolation evidence</strong> — isolation schematic + photo
                of installed warning notice + isolation procedure document +
                customer handover acknowledgement
              </li>
              <li>
                <strong className="text-white">5. Operating modes
                  + EMS</strong> — direct-feeding default behaviour + island
                if applicable + EMS architecture diagram + tariff schedule +
                priority logic + degraded-mode behaviour
              </li>
              <li>
                <strong className="text-white">6. EREC
                  correspondence</strong> — G99 application + connection
                offer + acceptance + amendment correspondence + G100 cert if
                applicable + DNO contact information
              </li>
              <li>
                <strong className="text-white">7. MCS handover
                  packs</strong> — per-technology MCS certs (MIS 3002 PV +
                MIS 3005 heat pump + etc.) + commissioning per technology +
                customer’s SEG application guidance
              </li>
              <li>
                <strong className="text-white">8. Reg 826
                  commissioning records</strong> — Reg 551.7.5 anti-islanding
                per source + Reg 551.4.2 multi-source RCD per combination + Reg
                826.1.1.2.2 N-E switching if applicable + Reg 826.1.2.1
                overcurrent spot-checks
              </li>
              <li>
                <strong className="text-white">9. Photographs</strong>
                — warning notice, isolators, main consumer unit, inverter /
                BESS / V2G + their DC isolators, backup gateway, ELS device,
                commissioning test instrument readings for representative tests
              </li>
              <li>
                <strong className="text-white">10. SEG + tariff +
                  smart meter</strong> — SEG registration steps + customer’s
                chosen supplier + smart meter MPAN + commissioning verification
                of export reading
              </li>
              <li>
                <strong className="text-white">11. Maintenance +
                  warranty</strong> — service intervals per component +
                warranty terms + escalation contacts + replacement-after-fault
                process
              </li>
              <li>
                <strong className="text-white">12. Customer handover
                  acknowledgement</strong> — signed by customer confirming
                receipt + understanding + acceptance of operating modes + any
                questions raised
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Customer handover meeting + future-engineer briefing"
            plainEnglish="The customer handover is the final step of commissioning. 60-90 mins face-to-face with the customer at site. Cover: installation tour + EMS app demo + multi-source isolation walkthrough + operating modes + SEG registration + emergency contacts + handover pack delivery + signature. Goal: customer can safely operate + understand + isolate the PEI; future engineer can attend without context-loss."
            onSite="Pace the meeting at the customer’s level: technical customer wants detail; non-technical customer wants confidence. Always: physical walkthrough of isolators + warning notice (don’t skip); EMS app demo with customer driving (not just installer showing); emergency contacts handed over in writing + verbally. Follow-up call at first month + 6 months."
          >
            <p>Customer handover meeting agenda:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">0-10 mins:
                  Installation tour</strong> — walk customer to each
                physical location: PV inverter + DC isolator, BESS + AC + DC
                isolators, V2G charger + isolator, EMS controller, backup
                gateway if installed, main consumer unit + DNO main switch,
                multi-source warning notice. Customer sees + touches everything
              </li>
              <li>
                <strong className="text-white">10-25 mins: EMS app
                  demonstration</strong> — customer logs in (sets password
                if not yet done); installer shows: current generation /
                consumption / BESS state + how to read; tariff schedule + how
                to change ToU windows; load-shedding configuration; alerts +
                notifications. Customer operates the app supervised once
              </li>
              <li>
                <strong className="text-white">25-40 mins:
                  Multi-source isolation walkthrough</strong> — customer
                reads isolation procedure aloud + installer walks them to each
                isolator + customer operates one isolator under supervision
                (then restores). Customer understands sequence + verification +
                emergency steps
              </li>
              <li>
                <strong className="text-white">40-55 mins:
                  Operating modes explanation</strong> — direct-feeding
                default behaviour; island mode (if capable) duration + critical
                loads + load shedding; what happens during a power cut step by
                step; how customer experiences it
              </li>
              <li>
                <strong className="text-white">55-70 mins: SEG +
                  emergency contacts</strong> — customer’s steps to
                register SEG with chosen supplier; smart meter MPAN + MCS cert
                handed over; emergency contacts in writing: installer out-of-hours,
                vendor support per component, DNO emergency 105, gas emergency if
                applicable
              </li>
              <li>
                <strong className="text-white">70-80 mins: Handover
                  pack delivery</strong> — digital (USB / cloud) + printed
                (binder); installer walks customer through index + key sections;
                customer asks any questions; customer signs acknowledgement
              </li>
              <li>
                <strong className="text-white">80-90 mins: Q&A +
                  follow-up commitment</strong> — customer asks anything;
                installer answers honestly; installer commits to first-month
                phone check-in (‘how is the system performing? any
                concerns?’); 6-month follow-up; annual visit option discussed
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — customer handover meeting date + attendees + signed
                acknowledgement + topics covered + customer questions raised +
                follow-up commitment recorded in cert evidence bundle
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Part 6 + Reg 132 design + customer-facing duties"
            clause="The installer / designer’s responsibility extends to: provision of the necessary documentation (Reg 132.13); verification of the installation in accordance with Part 6; and provision of the safety information necessary for the installation to be used safely (Reg 514 family). For a multi-source PEI under Chapter 82, this scope expands to include: Section 826 compliance summary, multi-source isolation procedure, operating-mode documentation, EMS architecture, EREC correspondence, and a customer handover that ensures the customer understands how to operate + isolate + maintain the installation safely."
            meaning="The cert evidence bundle + customer handover are not optional administrative tasks — they are the BS 7671 + Chapter 82 mandate. Reg 132.13 + Reg 514 family establish the documentation + safety-information duties; Chapter 82 + Reg 826 family extend these to multi-source PEI specifics. For a UK 2025-26 multi-source PEI commissioning: (1) Documentation that must be provided — integrated PEI EIC, per-technology DoCs, Reg 826.1.1.4 isolation procedure, warning notice content + location, operating-mode documentation, EREC G99 + G100 if applicable, MCS handover packs per technology, EMS architecture, maintenance + warranty information. (2) Safety information that must be conveyed — multi-source isolation procedure; what to do during a power cut (island behaviour); emergency contacts; isolation in fault; lockout / tagout best practice; future-engineer briefing. (3) Customer handover that must occur — 60-90 mins face-to-face, signed acknowledgement, follow-up commitment. Without this: installer is exposed to liability for incomplete compliance; customer is exposed to safety risk + operational confusion; insurance + property-sale + audit chain breaks down. The cert evidence bundle + handover meeting are the operationalisation of Chapter 82 + Reg 132 + Reg 514 in a multi-source PEI context. UK 2025-26 reality: this is part of professional install practice; budget time + cost accordingly."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Final integrated commissioning — 4-source PEI (PV + BESS + V2G + heat pump) with backup capability"
            situation="The closing scenario for Module 10. UK 2025-26 suburban semi-detached. Final state: 5 kWp PV (Section 712) + 10 kWh BESS (Chapter 57) + 7 kW V2G charger (Section 722 + 551) + 8 kW ASHP (M8 fixed equipment) + Tesla Backup Gateway 2 for island capability + Octopus Intelligent Octopus Go tariff + Octopus Power Pack successor for V2G grid services. Year-4 PEI build-out completed."
            whatToDo="Comprehensive 2-3 day commissioning of the full PEI. Day 1: BS 7671 Reg 643 Part 6 per circuit (continuity, IR, polarity, EFLI, RCD operation, functional verification) on all circuits + Reg 551.7.5 anti-islanding test on PV inverter + BESS inverter + V2G charger (each: simulated DNO loss, timing within ENA G99 spec, MET no-export verification, restoration check; photograph each result). Day 2: Reg 551.4.2 multi-source RCD effectiveness across each practical source combination (DNO+PV, DNO+PV+BESS, DNO+PV+BESS+V2G, BESS+PV island, BESS+V2G island; controlled fault induction; verify appropriate RCD trips within Reg 415.1 time) + Reg 826.1.1.2.2 N-E switching test (simulated grid-loss, transition timing < 500ms, N-E continuity in direct-feeding vs island states, reverse transition, photograph) + Reg 826.1.1.4 multi-source isolation walkthrough (each isolator operates correctly, consolidated warning notice in place + legible, isolation procedure document accurate) + Reg 826.1.2.1 overcurrent spot-checks at MET (clamp ammeter during simulated peak event, comparison to overcurrent study). Day 3: EREC G99 commissioning cert (filed with UKPN, including the V2G amendment correspondence) + EREC G100 commissioning if export-limited (ELS curtailment test, soft / hard limit configuration, certificate filed with DNO) + EMS commissioning (Tesla + SolarEdge + Octopus tariff integration, priority logic verification, ToU schedule active, load-shedding behaviour test, degraded-mode test) + MCS handover collation + customer handover meeting (90 mins face-to-face: installation tour + EMS app demo + multi-source isolation walkthrough + operating modes + SEG registration steps with Octopus Outgoing Fixed + emergency contacts + handover pack delivery + signed acknowledgement). Final cert evidence bundle: integrated PEI EIC + per-technology DoCs (Tesla Powerwall 3 + Tesla Backup Gateway 2 + SolarEdge inverter + Wallbox Quasar 2 + Octopus EMS) + EREC G99 correspondence + G100 cert + MCS MIS 3002 PV + MIS 3005 heat pump handover + Reg 826 commissioning records + EMS architecture + 30+ photographs + customer handover acknowledgement = 60-page PDF. Distribution: customer digital + cloud + printed binder + USB; UKPN G99 closure; installer archive. Total commissioning labour: 2.5 days + 1 day cert prep + 0.5 day customer handover = 4 days. Commissioning cost £4,500. Customer’s integrated PEI: £30-50k total installed value; £5,000-15,000 added property value; annual operational benefit £2,500-3,500."
            whyItMatters="This is the closing canonical scenario of Module 10 — a UK 2025-26 advanced multi-source PEI commissioned end-to-end with full Chapter 82 compliance + future-engineer-readable cert evidence + customer-operatable handover. Captures everything Module 10 has covered: Chapter 82 PEI integration (10.1) + EMS coordination (10.2) + SEG (10.3) + G100 if applicable (10.4) + V2G with OEM warranty (10.5) + grid-forming backup (10.6) + multi-source coordination (10.7) + integrated commissioning + cert evidence + handover (10.8). The installer’s scope at this level is distinct from ‘BS 7671 install’ — it’s ‘multi-source PEI integration + DNO interface + commercial tariffs + EMS + customer handover’. Different commercial model, different competencies, different cert evidence. Module 10 closes Module M10 of the Renewable Energy Systems course; M11 (Chapter 81 + lightning + fault levels) + M12 (testing + commissioning + handover) build on this foundation."
          />

          <CommonMistake
            title="Treating commissioning as a single-day formality"
            whatHappens="Installer budgets 1 day for commissioning of a 4-source PEI + skips through verification streams to meet the timeline. Reg 551.7.5 anti-islanding tested on one inverter not all; Reg 551.4.2 multi-source RCD tested in one combination not all; Reg 826.1.1.2.2 N-E switching not tested at all (assumed working from vendor commissioning); customer handover compressed to 15 mins of paperwork signing. Future engineer attending year 6 finds undocumented multi-source behaviour + spurious RCD trips because effectiveness across combinations wasn’t verified."
            doInstead="Budget commissioning at 2-3 days for a 4-source PEI; £2-5k labour cost; comprehensive verification streams covered with photographic + signed evidence per stream. Customer handover at 60-90 mins face-to-face with installation tour + EMS demo + isolation walkthrough + operating modes + SEG + emergency contacts + signed acknowledgement. Cert evidence bundle 30-60 pages comprehensive. Don’t cut corners — the regulatory + safety + insurance + future-engineer exposure is real. Customer-facing: quote commissioning at the right price; explain why it’s 2-3 days; the customer benefits from comprehensive verification + a future-ready cert evidence bundle."
          />

          <CommonMistake
            title="Skipping the customer-held cert evidence copy"
            whatHappens="Installer files cert evidence in their cloud archive only; gives customer just the EIC paper sheet + 5-minute handover. 18 months later installer ceases trading; cloud archive becomes inaccessible. Customer experiences a fault, attempts to call vendor support; vendor needs the installation reference + commissioning details to provide effective support; customer has nothing to provide. Customer-engaged independent engineer cannot reconstruct the install history; performs fresh PIR / EICR as the only available recourse. Cert evidence ecosystem collapses."
            doInstead="Treat customer-held cert evidence as the primary resilience layer. Hand over comprehensive bundle: digital PDF (USB or cloud link) + printed binder + on-fridge emergency contact card. Customer briefed on retention: ‘keep in 2 places — cloud + USB or printed copy. Treat it like property deeds.’ Cert evidence bundle accessible to future engineer + insurance + property sale + audit without dependence on installer’s business continuity. UK 2025-26 emerging: digital cert evidence platforms (Elec-Mate, NAPIT cert portal) with independent cloud-resilient archive + customer role-based access. Recommend customer enrol if applicable."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Multi-source PEI commissioning = 2-3 days labour + £2-5k cost. 10+ distinct verification streams across BS 7671 + Section 551 + Chapter 82 + EREC + MCS + EMS + customer handover.',
              'Reg 643 Part 6 testing per circuit + per practical source configuration. Standard tests (continuity, IR, polarity, EFLI, RCD operation, functional verification) extended across sources.',
              'Reg 551.7.5 anti-islanding test per grid-following inverter: simulated grid-loss + timing within ENA spec + MET no-export verification + restoration check. Per source.',
              'Reg 551.4.2 multi-source RCD effectiveness: controlled fault induction in each practical source combination + verify appropriate RCD trips within Reg 415.1 time.',
              'Reg 826.1.1.2.2 N-E switching test (if island-capable): simulated grid-loss + transition timing < 500ms + N-E continuity per state + reverse transition. Backup gateway commissioning.',
              'Reg 826.1.1.4 multi-source isolation walkthrough: each isolator operates + consolidated warning notice in place + isolation procedure document accurate.',
              'Reg 826.1.2.1 overcurrent verification: spot-checks of PSCC at protective device locations + comparison to PEI overcurrent study.',
              'EREC G99 commissioning cert (DNO-witnessed or self-certified) + EREC G100 commissioning if export-limited — ELS device approval + soft / hard configuration + commissioning test + cert filed.',
              'EMS commissioning: priority logic + ToU schedule + load shedding + degraded-mode (EMS-offline) verification. Both vendor + third-party EMS where applicable.',
              'Customer handover meeting: 60-90 mins face-to-face. Installation tour + EMS app demo + multi-source isolation walkthrough + operating modes + SEG registration + emergency contacts + handover pack delivery + signed acknowledgement + follow-up commitment.',
              'Cert evidence bundle structure: cover sheet + integrated PEI EIC + per-technology DoCs + multi-source isolation evidence + operating modes / EMS + EREC correspondence + MCS handover packs + Reg 826 commissioning records + photographs + SEG / tariff + maintenance / warranty + customer acknowledgement. 30-60 pages.',
              'Distribution: customer copy (digital + printed + USB; cloud backup) + DNO copy (G99 / G100 closure subset) + installer archive (6-10 years minimum). UK 2025-26 emerging: independent digital cert evidence platforms.',
              'Future-engineer reads cert evidence BEFORE attending. Customer-held copy is operative if installer ceases trading. Property sale transfers complete bundle. Insurance + audit + warranty + conveyancing depends on resilient cert evidence.',
              'Module 10 closes here. Builds foundation for M11 (Chapter 81 + lightning + fault levels) + M12 (full integrated testing + handover) within the Renewable Energy Systems course.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-7')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                10.7 Multi-source coordination
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-10')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 10 complete
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
