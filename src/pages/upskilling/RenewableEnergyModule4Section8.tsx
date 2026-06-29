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
import { HybridCommissioningSequence } from '@/components/study-centre/diagrams/renewableGapKit';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm4s8-bs-en-62446-parts',
    question:
      'BS EN 62446-1 vs BS EN 62446-2 — what\'s the split, and which applies to hybrid PV+BESS commissioning?',
    options: [
      'They are two names for the same single-part standard',
      'Part 1 covers initial commissioning; Part 2 covers periodic inspection + maintenance',
      'Part 1 covers AC-coupled installs; Part 2 covers DC-coupled installs',
      'Part 1 covers PV; Part 2 covers the BESS, replacing BS EN IEC 62485',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 62446-1:2016+A1:2018 covers PV install commissioning (initial verification at completion); BS EN 62446-2 covers periodic inspection + maintenance through the install life. For hybrid commissioning: Part 1 for the PV side, BS EN IEC 62485 + manufacturer spec for the BESS, and Chapter 82 PEI verification; Part 2 enters at the 5-yearly EICR-style inspection. BS EN 62446 is a multi-part standard. Part 1 (2016+A1:2018) covers initial commissioning of grid-tied PV — design pack contents, electrical tests, schedule of test results, customer handover. Part 2 covers periodic inspection + maintenance through the install life — ~5-yearly checks of cable insulation, connectors, isolation, performance vs commissioning baseline. For hybrid PV+BESS commissioning: BS EN 62446-1 covers PV; BESS uses BS EN IEC 62485 + PAS 63100:2024 (UK BESS spec); Chapter 82 PEI verification is the integrated layer. Cert evidence bundle records compliance against all standards.',
  },
  {
    id: 'm4s8-pas-63100',
    question:
      'PAS 63100:2024 — what is it and how does it relate to hybrid PV+BESS commissioning?',
    options: [
      'A cable specification for BESS DC interconnections',
      'The UK domestic BESS install specification, complementing Chapter 57',
      'A manufacturer warranty scheme specific to lithium batteries',
      'A standard unrelated to BESS commissioning',
    ],
    correctIndex: 1,
    explanation:
      'PAS 63100:2024 ("Specification for the installation and safe use of battery energy storage systems in electrical installations of dwellings") covers BESS placement, ventilation, fire safety, BMS integration, signage, customer handover and maintenance — UK domestic detail that complements the BS EN IEC 62485 series + BS 7671 Chapter 57. PAS 63100:2024 is the UK-specific BESS install spec — published 2024 for UK domestic battery installations. Covers: BESS placement (indoor / outdoor / outbuilding / garage); ventilation (lithium chemistry less critical than lead-acid but still important for thermal management + fire safety); fire safety (separation from escape routes, fire-resistant enclosures, smoke alarms); BMS integration; mandatory signage; customer handover; ~5-yearly maintenance. Complements BS EN IEC 62485 series (multi-part European standard for battery safety) + BS 7671 Chapter 57 (regulatory framework). Most UK BESS install schemes (MCS, manufacturer warranty) reference PAS 63100:2024 as the install spec. Cert evidence bundle records conformance.',
  },
  {
    id: 'm4s8-commissioning-tests',
    question:
      'Hybrid PV+BESS commissioning — what\'s the test sequence?',
    options: [
      'Tests are run in any convenient order on the day',
      'Visual, electrical tests, PV, BESS, inverter functional, EPS, G100, then document',
      'Live tests first, then visual inspection and dead tests afterwards',
      'Only the BESS is commissioned on site; the PV is verified at the factory',
    ],
    correctIndex: 1,
    explanation:
      'Logical sequence: (1) Visual inspection of PV, BESS, inverter, cabling, labels; (2) Electrical tests — continuity, IR, polarity per BS EN 62446-1 plus BESS DC isolator + bonding per Chapter 57; (3) PV commissioning — V_oc, I_sc per string; (4) BESS commissioning — BMS handshake, capacity test; (5) Hybrid inverter functional; (6) EPS test; (7) G100 verification (if applicable); (8) SoTR + cert evidence bundle. Hybrid PV+BESS commissioning logical sequence: (1) Visual inspection — confirm everything matches design pack; (2) Electrical tests — continuity, insulation, polarity per BS EN 62446-1 for PV; bonding + DC isolator per Chapter 57 for BESS; (3) PV-specific commissioning — V_oc + I_sc per string at test conditions; correct to STC; compare to design (~5% tolerance); (4) BESS-specific commissioning — BMS handshake confirmed; battery capacity baseline test (manufacturer spec); first charge cycle observed; (5) Hybrid inverter functional — connect to grid; verify direct feeding mode operates correctly; verify export to grid (if SEG/G98/G99 active); (6) EPS test — simulate grid loss (Module 4.6); verify EPS transition + island mode + protected-load operation; (7) G100 verification testing (if export-limited per Module 4.7); (8) Schedule of Test Results (SoTR) + cert evidence bundle assembly. Modern hybrid inverter apps guide the installer through each step.',
  },
  {
    id: 'm4s8-off-grid-commissioning',
    question:
      'Off-grid PV+BESS commissioning — what\'s different from grid-tied hybrid?',
    options: [
      'It is identical to grid-tied hybrid commissioning in every respect',
      'No grid tests; instead V/freq trip, generator integration and autonomy checks',
      'Off-grid needs MORE anti-islanding testing because there is no grid reference',
      'No commissioning testing is required for an off-grid system',
    ],
    correctIndex: 1,
    explanation:
      'Off-grid has no grid-related tests (no anti-islanding, no EREC, no DNO notification). Off-grid-specific: (1) V/freq trip thresholds per Reg 551.2.3 (verify by simulating overload or low battery); (2) generator integration — auto-start + ATS per Section 4.3; (3) extended-autonomy verification (measure capacity, project to design days); (4) SELV/PELV per Reg 712.414 if applicable; (5) BS EN 62446-1 PV tests still apply. Off-grid commissioning differs from grid-tied hybrid in important ways. SHARED with grid-tied: BS EN 62446-1 PV install tests (continuity, polarity, V_oc/I_sc, IR); BS EN IEC 62485 BESS install tests; visual inspection; SoTR + cert evidence bundle. OFF-GRID-SPECIFIC: V/freq trip thresholds per Reg 551.2.3 (the inverter\'s autonomous V/freq generation must trip safely on excursions like overload, depleted battery); generator integration tests (auto-start, ATS, three-stage charging if applicable); extended-autonomy verification (battery capacity baseline + projected to design days); SELV/PELV verification for small off-grid installs per Reg 712.414. NOT APPLICABLE: anti-islanding (no grid); EREC G98/G99/G100 (no grid); DNO notification.',
  },
  {
    id: 'm4s8-fault-investigation',
    question:
      'Customer\'s hybrid PV+BESS install: BESS isn\'t charging properly. Diagnostic approach?',
    options: [
      'Replace the BESS modules straight away as the likely fault',
      'Work systematically: telemetry, PV, DC bus, BMS, firmware, baseline',
      'Assume it is a customer usage issue and take no action',
      'Re-run only the PV insulation test and leave the BESS alone',
    ],
    correctIndex: 1,
    explanation:
      'Systematic diagnostic: (1) inverter telemetry — BMS handshake, battery V/SoC, charge rate; (2) PV — is it producing, V_oc/I_sc matching design? (3) BESS DC bus — terminal vs inverter-input voltage, drop within spec? (4) BMS — fault codes, cell imbalance, temperature alarms; (5) inverter firmware vs latest; (6) cross-reference the commissioning baseline. Don\'t replace the BESS until root cause is identified. Hybrid PV+BESS fault investigation across PV+BESS interfaces: (1) Telemetry — start with the inverter\'s app; check current state; (2) PV side — verify generation as expected; (3) DC bus — measurements at battery + inverter; (4) BMS — fault codes are the BMS\'s diagnostic output; cell imbalance / temperature / SoC issues; (5) Firmware — check version + release notes for known issues; (6) Cross-reference cert evidence bundle baseline. Common BESS &ldquo;not charging&rdquo; causes: BMS-inverter handshake fault (firmware mismatch); cell imbalance triggering BMS protection; temperature out of charging range; cable issue between inverter and BESS. Replace BESS only after isolating the root cause.',
  },
  {
    id: 'm4s8-cert-evidence-bundle',
    question:
      'Hybrid PV+BESS cert evidence bundle — what documents at customer handover?',
    options: [
      'The MCS certificate alone, which stands in for all other records',
      'PV + BESS design packs, commissioning records, EREC paperwork and handover pack',
      'Only the inverter datasheet and the DNO confirmation letter',
      'No documents beyond a verbal handover to the customer',
    ],
    correctIndex: 1,
    explanation:
      'Comprehensive package: MCS MIS 3002 PV design pack; Chapter 57 BESS design pack + PAS 63100:2024 compliance; Chapter 82 PEI design pack; BS EN 62446-1 commissioning records + SoTR; BESS commissioning per BS EN IEC 62485 + PAS 63100; EREC G98/G99/G100 paperwork + DNO approval; manufacturer datasheets + warranties; and the customer handover pack (operating manual, maintenance schedule, emergency contacts). Hybrid PV+BESS cert evidence bundle is the integrated documentation package — covers PV (Section 712), BESS (Chapter 57), prosumer integration (Chapter 82), commissioning (BS EN 62446-1 + BS EN IEC 62485 + PAS 63100), EREC paperwork, manufacturer evidence. Typical UK domestic bundle: 50-200 pages (depending on install complexity). Customer handover: paper copy of key documents + digital archive (cloud or USB) of the full bundle. The bundle is the customer\'s long-term asset — used for: future MCS audit; periodic EICR-style inspection; fault investigation; insurance claims; property ownership transfer. Cert evidence bundle is the cumulative output of Modules 3 + 4 + 5 (when Module 5 written).',
  },
  {
    id: 'm4s8-fiveyearly-inspection',
    question:
      'Five-yearly EICR-style inspection of a hybrid PV+BESS install — what\'s the scope?',
    options: [
      'A visual check of the modules only, with no testing',
      'BS EN 62446-2 PV inspection plus BESS, EPS, G100 and firmware checks, EICR-coded',
      'Only an EREC re-registration with the DNO',
      'Full replacement of all components regardless of condition',
    ],
    correctIndex: 1,
    explanation:
      'Comprehensive scope: BS EN 62446-2 PV inspection (cable insulation, connectors, isolation, performance vs baseline); BESS condition (capacity test vs baseline, BMS log, fire safety per PAS 63100); EPS / island-mode verification; G100 export-limit verification; firmware version + behaviour review; updated Chapter 82 PEI pack where modified. Findings recorded per BS 7671 EICR coding (C1/C2/C3). Five-yearly EICR-style inspection of hybrid PV+BESS combines multiple standards: BS EN 62446-2 for PV maintenance + inspection (cable insulation degradation, connector condition, isolator function, performance baseline comparison); BS EN IEC 62485 for BESS condition (capacity vs baseline, fire safety, ventilation, BMS log); PAS 63100 for UK-specific BESS maintenance items; Chapter 82 PEI verification (EPS still works, operating modes still supported); BS 7671 EICR for the broader install (RCD tests, insulation tests, isolator tests). Findings coded per BS 7671 EICR (C1/C2/C3). Updated cert evidence bundle reflects the inspection result. 5-yearly is typical UK domestic; commercial may be more frequent (annual / 2-yearly).',
  },
  {
    id: 'm4s8-customer-handover',
    question:
      'Customer handover for a hybrid PV+BESS install — what does the customer receive?',
    options: [
      'Nothing beyond a verbal explanation of how the system works',
      'Cert evidence bundle, information pack, MCS/DNO/EREC docs and warranty registration',
      'Only the manufacturer app login credentials for monitoring',
      'A signed receipt confirming the install, with no supporting documents',
    ],
    correctIndex: 1,
    explanation:
      'The customer receives: the full cert evidence bundle (paper + digital); an information pack (operating manual, mode descriptions, maintenance schedule, EPS behaviour, emergency contacts, app credentials); MCS certificate; DNO confirmation; EREC paperwork; SEG application support; warranty registration; a 5-yearly inspection reminder; and behavioural education. The customer signs receipt of the pack. Customer handover is the final installer responsibility before commissioning is complete. Components: (1) cert evidence bundle (paper + digital); (2) customer information pack with operating manual + EPS behaviour + maintenance schedule + emergency contacts; (3) MCS certificate; (4) DNO confirmation; (5) EREC paperwork; (6) SEG / export-tariff application support; (7) manufacturer warranty registration (online portals); (8) 5-yearly inspection reminder; (9) education on install behaviour — when EPS activates, alarm meanings, &ldquo;something feels wrong&rdquo; escalation. Customer signs receipt of the handover pack. The handover is the start of the install\'s long-term life — customer + cert evidence bundle + installer\'s ongoing service relationship.',
  },
  {
    id: 'm4s8-zs-test-method',
    question:
      'Hybrid PV+BESS install — you need to measure earth fault loop impedance at the consumer unit. Per Reg 643.7.3.1 NOTE 1 + Reg 826.7, what\'s the safe method?',
    options: [
      'Test with the inverter active and record the displayed reading',
      'Disable the inverter (or use the manufacturer test method), then test and record',
      'Skip the loop impedance test on inverter-fed installs entirely',
      'Swap to a different make of tester and read it with everything running',
    ],
    correctIndex: 1,
    explanation:
      'Per Reg 643.7.3.1 NOTE 1 + Reg 826.7, disable the inverter first: set it off via the app, open the AC isolator, verify zero voltage, perform the fault loop impedance test, then record Z_S on the SoTR noting the inverter was disabled, and restore the inverter. The manufacturer test mode or a high-current method are acceptable alternatives — record whichever was used. Reg 643.7.3.1 NOTE 1 + Reg 826.7 are the key new commissioning regs for hybrid installs. Standard fault loop impedance test instruments (Megger MFT, Kewtech KT64, Fluke 1664) are calibrated for DNO-fed installs — the inverter&rsquo;s active electronics interact with the test current pulse and can give readings significantly higher OR lower than the true Z_S. Three safe methods: (a) disable inverter for the test (commonest); (b) follow the manufacturer&rsquo;s test-mode procedure where published; (c) use a high-current loop impedance method on a fully de-energised circuit. Cert evidence bundle records the method used + the inverter state during the test — without this, the SoTR Z_S figure can\'t be trusted at audit.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Commissioning a 6 kWp PV + GivEnergy 10 kWh BESS + Gen3 hybrid install. PV V_oc per string measured 580 V at test conditions (irradiance 600 W/m², cell temp ~35°C); modelled 605 V at the test conditions. Pass or fail?',
    options: [
      'Fail — any deviation from the modelled V_oc means a string fault must be found first',
      'Pass — ~4% deviation is within BS EN 62446-1 tolerance; record it in the SoTR and continue',
      'Fail — the deviation indicates an under-rated inverter that should now be replaced',
      'Pass — but only after re-measuring every module individually to confirm the cause',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62446-1 commissioning tolerance: ±5-10% on V_oc / I_sc per string vs modelled. 580 V vs 605 V = 4% below — within acceptable range. Causes: cell temperature variation; module STC tolerance; measurement uncertainty. SoTR records the measurement with test conditions; future EICR-style inspection compares to this baseline. Where deviation is &gt; 10%, investigate per-module (which one is under-performing?) before completing commissioning. Module 3 Section 7 covers BS EN 62446-1 commissioning in depth.',
  },
  {
    id: 2,
    question:
      'Customer\'s hybrid install\'s BESS shows &ldquo;BMS communication fault&rdquo; in the inverter app after a firmware update. Diagnostic priority?',
    options: [
      'Replace the battery modules, since a communication fault points to failed cells',
      'Replace the data cable between the inverter and the BESS before any other check',
      'Re-run the insulation resistance test on the DC strings, as that is the usual cause',
      'Treat it as firmware compatibility: check versions, power-cycle, then support or roll back',
    ],
    correctAnswer: 3,
    explanation:
      'BMS-inverter handshake fault after firmware update is a common diagnostic case. Investigation: (1) Specific fault code in app — manufacturer documentation maps codes to causes; (2) Firmware version compatibility — GivEnergy / Tesla / Sigenergy require matched inverter + BESS firmware versions; mismatches cause handshake failures; (3) Power-cycle in manufacturer-spec sequence; (4) Manufacturer support — for persistent faults, support engineers can diagnose remotely via cloud telemetry; (5) Firmware rollback (where supported) for known regression. Replace BESS only after exhausting firmware + handshake options. Cert evidence bundle records the firmware versions at commissioning + diagnostic findings.',
  },
  {
    id: 3,
    question:
      'Off-grid PV+BESS commissioning at remote Scottish smallholding. PV 12 kWp + 50 kWh BESS + 8 kVA Pramac diesel generator. What tests are different from grid-tied?',
    options: [
      'No anti-islanding, EREC or DNO; instead V/freq trip (Reg 551.2.3), generator and autonomy',
      'Off-grid needs more grid-protection testing because the inverter holds the network stable',
      'The same tests as grid-tied, plus a mandatory anti-islanding test on the generator output',
      'Only the diesel generator needs testing; the PV and BESS are commissioned as grid-tied',
    ],
    correctAnswer: 0,
    explanation:
      'Off-grid commissioning differs from grid-tied: NO grid means no anti-islanding, no EREC, no DNO. INSTEAD: V/freq trip thresholds per Reg 551.2.3 (inverter\'s autonomous V/freq generation must trip safely on overload, depleted battery, etc.); generator auto-start logic (SoC threshold trigger, ATS operation per Section 4.3); three-stage charging verification; battery capacity baseline vs design autonomy. SHARED with grid-tied: BS EN 62446-1 PV side, BS EN IEC 62485 BESS side, visual inspection + SoTR + cert evidence bundle. Cert evidence bundle reflects off-grid-specific scope (no EREC paperwork but includes Section 551 generating-set compliance + Section 414 SELV/PELV if applicable).',
  },
  {
    id: 4,
    question:
      'BS EN 62446-2 — when does it apply to a hybrid PV+BESS install?',
    options: [
      'At initial commissioning, used in place of BS EN 62446-1 for the PV install',
      'Only when the install is decommissioned and the PV modules are being removed',
      'At periodic inspection through the install\'s life — the 5-yearly EICR-style inspection',
      'Only after a reported fault has occurred, never on a routine planned schedule',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 62446 multi-part: Part 1 (initial commissioning per Module 3 Section 7) + Part 2 (periodic inspection + maintenance through install life). 5-yearly UK domestic inspection scope per BS EN 62446-2: PV cable insulation (megger test to baseline), connector condition (visual + thermal imaging), isolator function (manual test + DC switching capability), performance baseline (V_oc + I_sc vs commissioning record adjusted for module degradation), plus BESS condition per BS EN IEC 62485 + PAS 63100. Findings recorded per BS 7671 EICR coding (C1/C2/C3). The 5-yearly inspection is the cert evidence bundle\'s next refresh point.',
  },
  {
    id: 5,
    question:
      'Customer\'s hybrid install commissioning: PV+BESS+Hybrid Inverter+EPS. After 4 hours of testing, installer realises the EPS test wasn\'t run. Acceptable to skip and document later?',
    options: [
      'Yes — the EPS test can simply be done at the first periodic inspection instead',
      'No — EPS verifies switchover, partition and island-mode RCD; run it before sign-off',
      'Yes — provided the inverter app reports the EPS as configured, a live test is optional',
      'No — but only because the warranty requires it, not for any genuine safety reason',
    ],
    correctAnswer: 1,
    explanation:
      'EPS testing is part of hybrid PV+BESS commissioning per Module 4.6 + Chapter 82 PEI. Skipping it: (1) leaves the customer\'s outage resilience unverified; (2) cert evidence bundle is incomplete; (3) Reg 411 / 712.531.3.5.1 disconnection times under island mode unverified — safety concern; (4) MCS audit failure risk. Solution: run the EPS test (simulate grid loss; measure switchover; verify protected loads; test RCD under island). If commissioning visit time exceeded, schedule a return visit specifically for EPS testing. Cert evidence bundle records the EPS test results — without them, commissioning isn\'t complete. Customer informed of the schedule.',
  },
  {
    id: 6,
    question:
      'Three-yearly EICR-style inspection of a 5-year-old hybrid PV+BESS install. Findings: PV array I_sc 8% below commissioning baseline (modules degraded as expected); BESS capacity 88% of nameplate (expected at year 5); EPS switchover time 250 ms (was 80 ms at commissioning). EPS finding is the concern. Action?',
    options: [
      'Record it as C1 (danger present) and isolate the whole install immediately',
      'Ignore the EPS figure, since the PV and BESS degradation are within expectation',
      'Investigate the 80→250 ms change, inform the customer and code it C3 (degraded)',
      'Replace the entire install, since the EPS timing can no longer be trusted at all',
    ],
    correctAnswer: 2,
    explanation:
      'EPS switchover time degradation is a real-world issue worth investigating at periodic inspection. Causes: (1) firmware updates that changed timing behaviour; (2) BESS response degradation (older Li-ion cells, BMS cell-balancing slower); (3) inverter component degradation (contactors slower to operate; capacitor age affects EPS-stage startup). Code per BS 7671 EICR: typically C3 (improvement recommended) — install still functional but degraded vs commissioning. Customer informed; rectification options explored; cert evidence bundle updated with the finding + actions. The 250 ms is still within acceptable EPS spec for typical loads (most appliances tolerate &lt;500 ms gap) but the trend matters.',
  },
  {
    id: 7,
    question:
      'Hybrid PV+BESS install handover to customer. Customer asks &ldquo;what happens if my hybrid inverter fails?&rdquo;. Best answer?',
    options: [
      'While it is repaired (1-3 weeks) PV, BESS and EPS are offline, so the property runs on grid',
      'The PV continues to generate directly into the loads because it bypasses the inverter',
      'The BESS keeps powering the protected loads indefinitely via the EPS, whatever the inverter does',
      'The grid automatically compensates and the customer notices no change in performance',
    ],
    correctAnswer: 0,
    explanation:
      'Hybrid inverter failure scenario for the customer: (1) PV generation stops; (2) BESS can\'t discharge; (3) EPS doesn\'t work; (4) install effectively offline until repaired. Service path: customer contacts installer (per handover doc) OR manufacturer support direct; warranty claim; parts + install (typical 1-3 weeks); installer commissions replacement. During outage: customer has only DNO grid supply for the loads; no PV; no BESS backup; no EPS. For critical installs, this is a real consideration — Section 4.3 generator backup gives independent resilience. Customer\'s manufacturer warranty record (in cert evidence bundle) is the key to fast warranty service.',
  },
  {
    id: 8,
    question:
      'After Module 4 (this section) and Module 5 (BESS in depth), what does the renewable course look like?',
    options: [
      'The course ends at Module 5, since PV and BESS cover the entire syllabus already',
      'Modules 6 onward simply repeat the earlier PV content at a more advanced level',
      'Only a mock exam remains after Module 5, with no further taught modules at all',
      'Modules 6-12 extend into EV charging, heat pumps, other LCT and integration at scale',
    ],
    correctAnswer: 3,
    explanation:
      'The Renewable Energy Systems course architecture: 12 modules × 8 sections × ~800 LOC each. Modules 1-5 cover PV + BESS foundations. Modules 6-12 extend into other LCT (low-carbon technology) areas: EV charging (Modules 6-7), heat pumps (Module 8), other LCT (Module 9), hybrid LCT + EMS (Module 10), 19th Edition + fault current + lightning (Module 11), commissioning at integration scale (Module 12). Plus the renewable mock exam + ~30 audited diagrams for visual learning. The course builds up from PV through to full prosumer LCT integration — the modern UK electrical contractor\'s comprehensive renewable skill set.',
  },
];

const faqs = [
  {
    question: 'How long does typical UK hybrid PV+BESS commissioning take?',
    answer:
      'UK 2025-2026 hybrid PV+BESS commissioning: typical 4-8 hours on-site for a 5 kWp PV + 10 kWh BESS install. Breakdown: visual inspection + cabling verify (1 hour); electrical tests per BS EN 62446-1 (continuity, IR, polarity, V_oc/I_sc per string) — 1-2 hours; BESS commissioning per BS EN IEC 62485 + manufacturer spec (BMS handshake, first charge cycle observation) — 1-2 hours; hybrid inverter functional + grid connection — 1 hour; EPS testing (simulate grid loss, verify partition + RCD under island) — 30 min; G100 verification (if applicable) — 30 min; SoTR completion + cert evidence bundle assembly — 1 hour. Total ~4-8 hours. Complex commercial / multi-inverter installs may be 1-2 days.',
  },
  {
    question: 'What\'s the difference between PAS 63100:2024 and BS EN IEC 62485?',
    answer:
      'BS EN IEC 62485 is the international / European multi-part standard for battery installations — covers general safety, ventilation, enclosure ratings, thermal management, maintenance for various battery chemistries. PAS 63100:2024 is the UK-specific PAS (Publicly Available Specification) for &ldquo;installation and safe use of battery energy storage systems in electrical installations of dwellings&rdquo; — adds UK-domestic-specific detail on placement (indoor / outdoor / garage / outbuilding), fire safety (separation from escape routes, smoke alarms), signage, customer handover, maintenance. BS EN IEC 62485 is the underlying European standard; PAS 63100:2024 is the UK domestic-specific overlay. Cert evidence bundle records conformance against both.',
  },
  {
    question: 'How does the cert evidence bundle assembly work in practice?',
    answer:
      'During commissioning the installer produces individual documents: SoTR (Schedule of Test Results) for PV per BS EN 62446-1; BESS commissioning record per BS EN IEC 62485 + PAS 63100; EPS test record; G100 verification record; firmware version log. At handover the installer assembles these into the cert evidence bundle alongside: MCS MIS 3002 PV design pack; Chapter 57 BESS design pack; Chapter 82 PEI design pack; install photographs (taken throughout install); MCS certificate; DNO confirmation; EREC paperwork; manufacturer datasheets; warranty registrations; customer information pack. Modern installer workflow: cloud-based document management (e.g. MCS-certified portal) plus paper copy to customer.',
  },
  {
    question: 'What\'s typical UK 2025-2026 SEG export tariff for hybrid PV+BESS?',
    answer:
      'UK SEG (Smart Export Guarantee) replaces the old Feed-in Tariff. Each licensed electricity supplier offers SEG tariffs — customer chooses. UK 2025-2026 typical SEG rates: Octopus Flux ~17-25 p/kWh (variable, time-of-use); Octopus Outgoing fixed ~15 p/kWh; British Gas SEG ~5 p/kWh; EDF Export ~5-10 p/kWh; OVO ~5-15 p/kWh. The hybrid install\'s ability to time-shift export via BESS to peak SEG rates (e.g. Octopus Flux evening rates) significantly improves the economic return. Cert evidence bundle is the supporting documentation for the SEG application.',
  },
  {
    question: 'How does the BESS warranty work in practice?',
    answer:
      'Modern UK BESS warranties: typically 10 years OR 6000 cycles OR ~80% capacity retention, whichever first. GivEnergy: 12 years standard; Tesla Powerwall: 10 years (extended to 13 years 2024+); Sigenergy: 12 years; SolarEdge: 10 years. Warranty registration: at handover, installer registers the BESS with manufacturer (typically via online portal — credentials in customer information pack). Service path: customer contacts installer first for diagnostics; installer engages manufacturer support if needed; warranty claim filed; repair / replacement scheduled. Cert evidence bundle stores warranty docs + registration confirmation.',
  },
  {
    question: 'What happens to the cert evidence bundle when the property is sold?',
    answer:
      'Cert evidence bundle transfers to new owner with the property. The new owner becomes the bundle\'s custodian and the install\'s service contact. New owner can: (1) continue with the original installer\'s ongoing service; (2) engage a different MCS-certified contractor for the next 5-yearly inspection; (3) extend BESS / inverter warranty registrations (subject to manufacturer policy). Property valuation typically reflects the PV+BESS positively (improved EPC + ongoing self-consumption value). Cert evidence bundle is part of the property conveyance documentation.',
  },
  {
    question: 'How does the cert evidence bundle support insurance claims?',
    answer:
      'Customer\'s property insurance covering the install typically requires evidence that the install was professionally designed + commissioned. Cert evidence bundle provides: MCS certification (designed + installed to scheme standard); DNO confirmation (registered + compliant); commissioning records (BS EN 62446-1 + BS EN IEC 62485 + PAS 63100); manufacturer warranty registrations; install photographs (proof of as-installed state); ongoing 5-yearly inspection records. Insurance claim — e.g. lightning damage to inverter, fire incident — references the bundle as the basis. Without the bundle, claim processing is significantly harder.',
  },
  {
    question: 'What about future course modules (5-12) — when are they written?',
    answer:
      'The Renewable Energy Systems course is 12 modules × 8 sections. Modules 1-4 (currently complete) cover: industry/regulatory landscape; Solar PV principles; Solar PV design + installation; Hybrid PV+BESS (this module). Modules 5-12 (planned): Module 5 (BESS deep dive — chemistry, BMS, Chapter 57 in depth, BS EN IEC 62485, PAS 63100, fire safety, sizing); Module 6 (EV charging domestic); Module 7 (EV charging commercial); Module 8 (Heat pumps); Module 9 (Other LCT); Module 10 (Hybrid LCT + EMS); Module 11 (Appendix 17 → 19th Edition Part 8 + fault current + lightning at scale); Module 12 (Testing + commissioning at integration scale). Each module follows the same pedagogy and BS 7671-grounded approach.',
  },
  {
    question: 'How does the Renewable Energy course interact with the BS 7671 18th Edition course?',
    answer:
      'The Renewable Energy course is a SPECIALIST extension above the foundational BS 7671 18th Edition course. The 18th Edition course covers: the BS 7671 framework + all its core chapters (Chapters 41-54); inspection + testing fundamentals; EICR coding. The Renewable course assumes the 18th Edition foundation and adds: Section 712 (PV); Chapter 57 (BESS); Chapter 82 (PEI); Section 551 (generating sets); Section 722 (EV charging — Module 6/7); EREC framework; manufacturer ecosystem (GivEnergy / Tesla / Sigenergy / SolarEdge / Enphase). Customers typically complete 18th Edition first then move to the Renewable specialism.',
  },
];

export default function RenewableEnergyModule4Section8() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Commissioning hybrid & off-grid | Renewable Energy 4.8 | Elec-Mate',
    description:
      'Hybrid PV+BESS commissioning — BS EN 62446-1 PV install + BS EN IEC 62485 BESS + PAS 63100:2024 UK domestic spec + Chapter 82 PEI verification + EPS testing + EREC G100 verification + the integrated cert evidence bundle + 5-yearly EICR-style inspection workflow.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 8 · BS 7671:2018+A4:2026"
            title="Commissioning hybrid & off-grid"
            description="Integrated commissioning workflow — BS EN 62446-1 PV + BS EN IEC 62485 BESS + PAS 63100:2024 UK spec + Chapter 82 PEI verification + EPS testing + EREC G100 verification + cert evidence bundle assembly + 5-yearly EICR-style inspection."
            tone="yellow"
          />

          <TLDR
            points={[
              "Hybrid PV+BESS commissioning integrates multiple standards: BS EN 62446-1:2016+A1:2018 for PV install; BS EN IEC 62485 series for BESS; PAS 63100:2024 for UK domestic BESS specifics; Chapter 82 PEI verification per Section 4.5 + 4.6 content; EREC G100 verification per Section 4.7.",
              "Commissioning sequence: (1) Visual inspection; (2) Electrical tests per BS EN 62446-1 (PV) + Chapter 57 (BESS); (3) PV V_oc / I_sc per string + STC correction; (4) BESS commissioning (BMS handshake, first cycle); (5) Hybrid inverter functional + grid connection; (6) EPS testing (Module 4.6 content); (7) G100 verification (if applicable, Module 4.7); (8) SoTR + cert evidence bundle.",
              "Off-grid commissioning differs: NO anti-islanding (no grid); NO EREC G98/G99/G100; NO DNO notification. Off-grid-specific: V/freq trip per Reg 551.2.3; generator integration (auto-start, ATS, three-stage charging per Section 4.3); extended-autonomy verification; Reg 712.414 SELV/PELV if applicable.",
              "Cert evidence bundle for hybrid: MCS MIS 3002 PV design + Chapter 57 BESS design + Chapter 82 PEI design + BS EN 62446-1 commissioning + BS EN IEC 62485 + PAS 63100 BESS commissioning + EREC paperwork + DNO confirmation + manufacturer datasheets + customer handover pack.",
              "BS EN 62446-2 covers PERIODIC inspection + maintenance (5-yearly EICR-style for UK domestic). Scope: PV cable insulation / connectors / isolators / performance baseline; BESS condition + capacity test; EPS verification; G100 verification; firmware review; updated cert evidence bundle.",
              "Customer handover: cert evidence bundle (paper + digital); customer information pack (operating, EPS behaviour, maintenance, emergency contacts); MCS cert; DNO confirmation; EREC paperwork; SEG application support; warranty registration; 5-yearly inspection reminder; behavioural education.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Plan and execute the hybrid PV+BESS commissioning sequence — integrating BS EN 62446-1 (PV) + BS EN IEC 62485 (BESS) + PAS 63100:2024 (UK domestic) + Chapter 82 PEI verification.",
              "Run the off-grid-specific commissioning sequence — V/freq trip per Reg 551.2.3; generator integration tests per Section 4.3; extended-autonomy verification.",
              "Apply BS EN 62446-2 periodic inspection scope at 5-yearly EICR-style intervals — PV maintenance + BESS condition + EPS verification + G100 verification + firmware review.",
              "Assemble the integrated cert evidence bundle for hybrid PV+BESS installs — combining MCS, Chapter 57, Chapter 82, BS EN 62446-1, BS EN IEC 62485, PAS 63100, EREC paperwork, manufacturer evidence, customer handover.",
              "Execute customer handover for hybrid PV+BESS installs — cert evidence bundle + customer information pack + MCS / DNO / EREC documentation + SEG support + warranty registration + behavioural education.",
              "Run hybrid PV+BESS fault investigation systematically — telemetry, PV side, DC bus, BMS, firmware, cert evidence bundle baseline.",
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Hybrid commissioning integrates BS EN 62446-1 + BS EN IEC 62485 + PAS 63100 + Chapter 82 + EREC + EPS + G100. Off-grid removes the grid-related half.</Pullquote>

          <ContentEyebrow>The integrated commissioning workflow</ContentEyebrow>

          <ConceptBlock
            title="Multiple standards, one workflow"
            plainEnglish="Hybrid PV+BESS commissioning isn\'t a single standard — it integrates multiple. The competent installer follows a logical sequence that covers all relevant standards in one workflow, producing the integrated cert evidence bundle."
            onSite="UK 2025-2026 typical workflow: 4-8 hours on-site for a 5 kWp PV + 10 kWh BESS install. The hybrid inverter\'s commissioning app guides the installer through manufacturer-specific tests; the BS EN 62446-1 PV tests follow the standard methodology; the BESS tests follow BS EN IEC 62485 + PAS 63100; the Chapter 82 PEI verification ties them together."
          >
            <p>The integrated commissioning sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">1. Visual inspection</strong> — confirm everything matches design pack: PV array layout, BESS placement (ventilation, fire safety per PAS 63100:2024), hybrid inverter location, cabling routes, labels per Reg 712.514 + Reg 826.1.1.4 + BESS analogues</li>
              <li><strong className="text-white">2. Electrical tests</strong> — BS EN 62446-1 PV tests (continuity, IR, polarity); BESS DC isolator + bonding per Chapter 57; main supply continuity</li>
              <li><strong className="text-white">3. PV-specific commissioning</strong> — V_oc + I_sc per string at test conditions; correct to STC; compare to design (±5-10% tolerance); record in SoTR per BS EN 62446-1</li>
              <li><strong className="text-white">4. BESS-specific commissioning</strong> — BMS-inverter handshake; first charge cycle observation; capacity baseline test (manufacturer spec); record per BS EN IEC 62485 + PAS 63100:2024</li>
              <li><strong className="text-white">5. Hybrid inverter functional</strong> — connect to grid; verify direct feeding mode; PV → grid export (if SEG / EREC active); grid → BESS charging; BESS → load discharging</li>
              <li><strong className="text-white">6. EPS testing (Module 4.6)</strong> — simulate grid loss (open DNO main isolator); verify EPS contactor opens within manufacturer spec; verify inverter transitions to grid-forming; verify protected-load partition; verify RCD operation under island mode (Reg 411 disconnection time)</li>
              <li><strong className="text-white">7. G100 verification (Module 4.7, if applicable)</strong> — over-export simulation; response time; failure mode; record per EREC G100 spec</li>
              <li><strong className="text-white">8. SoTR + cert evidence bundle</strong> — Schedule of Test Results assembled; cert evidence bundle finalised with all per-domain packs + commissioning records + manufacturer datasheets</li>
            </ul>
          </ConceptBlock>

          <HybridCommissioningSequence caption="A hybrid system is verified in stages — checks, grid sync, functional, then handover." />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>CRITICAL — Reg 643.7.3.1 NOTE 1 + Reg 826.7 fault loop impedance caveat</ContentEyebrow>

          <Pullquote>Inverter-active ZS readings can be INVALID. Disable the inverter for fault loop impedance tests, or use the manufacturer&rsquo;s approved method.</Pullquote>

          <ConceptBlock
            title="Why standard ZS tests can give false readings on hybrid installs"
            plainEnglish="A fault loop impedance tester injects a calibrated current pulse onto the L-PE loop and measures the voltage drop to calculate Z_S. The technique assumes the install is fed by a passive transformer source (the DNO) and that no other source is injecting current onto the loop. A hybrid PV / BESS inverter is an ACTIVE source — its output stage&rsquo;s control loop, the EMI filter capacitors, the islanding-detection logic, and the firmware-level current control all interact with the test current pulse. Result: the displayed Z_S can be significantly higher OR lower than the true value, depending on the inverter&rsquo;s state."
            onSite="The cert evidence bundle must record VALID Z_S readings, not corrupted ones. Three safe approaches: (1) disable / disconnect the inverter for the duration of the ZS test (set inverter to off + open the AC isolator + verify zero voltage at the source connection); (2) use the inverter manufacturer&rsquo;s approved test method (some manufacturers publish specific commissioning procedures with the inverter in a defined &lsquo;test mode&rsquo;); (3) use a high-current loop impedance method on a fully de-energised circuit (preferred where competence + equipment exist). The commissioning record states which method was used + the inverter state during the test."
          >
            <p>What Reg 643.7.3.1 NOTE 1 actually says (paraphrased):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Standard fault loop impedance test methods</strong> may give invalid results where the install is supplied by inverter-based sources (PV / hybrid / BESS / EV V2X)</li>
              <li><strong className="text-white">The NOTE refers</strong> to typical handheld testers (Megger MFT, Kewtech KT64, Fluke 1664) — their default modes are calibrated for DNO-fed installs</li>
              <li><strong className="text-white">Safe practice 1 — inverter OFF</strong> — set inverter to off via manufacturer commissioning app + open the AC isolator + verify with voltage detector. Then perform ZS test. After test, restore the inverter + verify operation. Record this in the commissioning notes</li>
              <li><strong className="text-white">Safe practice 2 — manufacturer&rsquo;s test method</strong> — some inverters (GivEnergy, SolarEdge, Sigenergy) publish specific procedures with inverter in &lsquo;commissioning&rsquo; or &lsquo;maintenance&rsquo; mode. Follow their method when available</li>
              <li><strong className="text-white">Safe practice 3 — high-current method</strong> — fully de-energised circuit + high-current source + voltage measurement. Specialist test equipment + competence required; rare in domestic; common in commercial</li>
              <li><strong className="text-white">Per-mode verification (Reg 826.7)</strong> — direct feeding ZS measured with the install in direct feeding (inverter disabled for the test); island-mode ZS analysis is theoretical (inverter is the source, contribution computed from manufacturer datasheet) since you cannot &lsquo;test&rsquo; the loop against an active inverter source</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the ZS reading + the inverter state during the test + the method used. Failure to record these = potential SoTR audit finding</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.7.3.1 NOTE 1 + Reg 826.7 — Fault loop impedance with inverter sources"
            clause="Reg 643.7.3.1 NOTE 1 (verbatim): &ldquo;The validity of test readings taken with a fault loop impedance test instrument may be adversely affected by power converting equipment, such as inverters.&rdquo; Reg 826.7 (verbatim): &ldquo;The validity of test readings taken with a fault loop impedance test instrument may be adversely affected by power converting equipment (such as inverters) within the prosumer&rsquo;s installation. In such cases an alternative method of determining prospective fault current and earth fault loop impedance shall be used. See NOTE 1 of Regulation 643.7.3.1.&rdquo;"
            meaning="Reg 643.7.3.1 NOTE 1 is the SPECIFIC commissioning caveat that catches most hybrid-installer mistakes. The standard ZS test with the inverter active gives a reading that may bear no relationship to the true fault loop impedance — the inverter&rsquo;s active electronics interfere with the test current. Three safe approaches: disable inverter; use manufacturer method; use high-current method. The competent installer records the method + the inverter state in the SoTR + commissioning record. Reg 826.7 reinforces the same point at the PEI Chapter 82 level. This is one of the most important new-installer-trap regs in A4:2026 for hybrid installs."
          />

          <CommonMistake
            title="Performing ZS test with hybrid inverter active and recording the displayed reading"
            whatHappens="The installer powers up the hybrid inverter (because that&rsquo;s what they did with PV-only installs) and runs the standard fault loop impedance test from the consumer unit. The tester displays a Z_S figure — let&rsquo;s say 0.18 &Omega; — and the installer records this on the SoTR. In reality the inverter&rsquo;s output stage capacitors + control loop have interfered with the test; the true Z_S might be 0.65 &Omega; (excessive — fails Chapter 41 disconnection time). Or it might be 0.10 &Omega; (fine, but not what the meter says). MCS audit or EICR later catches the discrepancy when comparing to design pack expectations or to first-principles calculation from the DNO PSCC figure."
            doInstead="Per Reg 643.7.3.1 NOTE 1: disable / disconnect the inverter for the ZS test. Standard sequence: (1) set inverter to off via commissioning app; (2) open the inverter&rsquo;s AC isolator; (3) verify zero voltage at the source connection with a voltage detector; (4) perform the standard fault loop impedance test from each accessible point; (5) record the Z_S figure + a note &lsquo;inverter disabled during test per Reg 643.7.3.1 NOTE 1&rsquo;; (6) restore the inverter; (7) verify operation. Cert evidence bundle records the method. The competent installer reads the inverter manufacturer&rsquo;s commissioning guide for any specific test-mode procedure before starting."
          />

          <SectionRule />

          <ContentEyebrow>Reg 570.6.3 — BESS ventilation verification at commissioning</ContentEyebrow>

          <Pullquote>Ventilation isn&rsquo;t just a design item — verify it at commissioning per Reg 570.6.3 + PAS 63100.</Pullquote>

          <ConceptBlock
            title="Verifying BESS ventilation + fire safety at commissioning"
            plainEnglish="Reg 570.6.3 (Chapter 57) requires BESS ventilation per the BS EN IEC 62485 series. PAS 63100:2024 covers the UK domestic-specific install requirements (placement, clearances, escape routes, fire detection / suppression). The commissioning step verifies that the as-installed ventilation matches the design + the relevant standards — not just that the BESS powers up."
            onSite="Visual verification at commissioning: BESS location (not in habitable space per PAS 63100); manufacturer-specified clearances respected (typically 200-500 mm above + sides depending on model); escape routes unobstructed; smoke / heat detector installed in the BESS room (PAS 63100 mandates this for most domestic LFP installs); manufacturer-specified ventilation openings clear (not blocked by storage / boxes / insulation). Photos taken + included in the cert evidence bundle."
          >
            <p>BESS ventilation + safety commissioning checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Location compliance</strong> — not in habitable spaces (bedroom / lounge); not in escape route; manufacturer-permitted location (garage / utility / outbuilding / external enclosure for most LFP). PAS 63100 covers this</li>
              <li><strong className="text-white">Clearance verification</strong> — manufacturer-specified clearances respected. Common: 200-500 mm above + sides; nothing combustible within the clearance zone</li>
              <li><strong className="text-white">Ventilation openings</strong> — ventilation grilles + airflow paths clear; not blocked by storage / insulation / debris</li>
              <li><strong className="text-white">Fire detection</strong> — smoke / heat detector in the BESS location, interconnected with the dwelling&rsquo;s main fire alarm where present (PAS 63100 mandate for most domestic LFP)</li>
              <li><strong className="text-white">Signage</strong> — BESS warning signage on the enclosure + on the access door to the room (PAS 63100 + Reg 826.1.1.4 multi-source notice)</li>
              <li><strong className="text-white">Emergency response info</strong> — manufacturer&rsquo;s emergency response document handed over + posted in the BESS location (typical: GivEnergy / Tesla / Sigenergy all publish these)</li>
              <li><strong className="text-white">For vented lead-acid / VRLA</strong> — additional ventilation calculation per BS EN IEC 62485-2 Annex A; explosion-proof fittings; rare in UK domestic but common in some commercial backup applications</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — photos + checklist + cross-reference to BS EN IEC 62485 series + PAS 63100:2024</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.3 + PAS 63100:2024 — BESS ventilation commissioning"
            clause="Reg 570.6.3: Stationary secondary batteries shall be installed and ventilated in accordance with the BS EN IEC 62485 series of standards. PAS 63100:2024 (UK domestic-specific): the as-installed location, clearances, ventilation openings, fire detection arrangement, signage, and emergency-response documentation shall be verified at commissioning and recorded."
            meaning="Ventilation + fire safety is not just a design item — it&rsquo;s a commissioning verification item. The competent installer photographs the as-installed location + clearances + detectors + signage and includes the evidence in the cert bundle alongside the BS EN IEC 62485 + PAS 63100:2024 compliance declaration. Periodic inspection (BS EN 62446-2) revisits these items every 5 years."
          />

          <SectionRule />

          <ContentEyebrow>Off-grid commissioning — differs from grid-tied</ContentEyebrow>

          <Pullquote>No grid = no anti-islanding, no EREC, no DNO. V/freq trip per Reg 551.2.3 + generator integration.</Pullquote>

          <ConceptBlock
            title="Off-grid-specific commissioning content"
            plainEnglish="Off-grid commissioning shares many tests with grid-tied (BS EN 62446-1 PV, BS EN IEC 62485 BESS, visual inspection, SoTR) but DOES NOT include grid-related tests (anti-islanding, EREC, DNO notification). Off-grid ADDS its own specifics: V/freq trip per Reg 551.2.3; generator integration; extended-autonomy verification; SELV/PELV per Reg 712.414 (where applicable)."
            onSite="Off-grid commissioning often happens at remote sites where return visits are expensive. The competent installer plans the test sequence to be thorough first time — including weather-dependent PV tests (sunny day for V_oc / I_sc) and battery-state tests (varying SoC for V/freq trip verification)."
          >
            <p>Off-grid-specific tests:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">V/freq trip per Reg 551.2.3</strong> — inverter generates V/freq autonomously; verify trip behaviour by simulating overload (load exceeding inverter capacity) + low-battery (BESS depleting); verify trip thresholds + restart sequence</li>
              <li><strong className="text-white">Generator auto-start logic (Section 4.3)</strong> — verify trigger SoC threshold (typical 20-30%); verify ATS operation (load transfer from inverter to generator); verify auto-stop SoC threshold (typical 70-90%)</li>
              <li><strong className="text-white">Three-stage charging</strong> — with generator running + BESS accepting charge, verify BULK → ABSORPTION → FLOAT transitions per BMS spec</li>
              <li><strong className="text-white">Extended-autonomy verification</strong> — measure BESS usable capacity (typically by full charge then controlled discharge to BMS cut-off); project to design autonomy days</li>
              <li><strong className="text-white">SELV/PELV per Reg 712.414</strong> — for small off-grid (boats, caravans, sheds at 12V/24V/48V): verify U_oc_max ≤ 120V DC + basic protection where nominal V &gt; 30V DC</li>
              <li><strong className="text-white">BS EN 62446-1 PV tests still apply</strong> — continuity, IR, polarity, V_oc/I_sc per string</li>
              <li><strong className="text-white">BS EN IEC 62485 + PAS 63100 BESS tests still apply</strong> — BMS handshake, first cycle, ventilation, fire safety</li>
              <li><strong className="text-white">NOT APPLICABLE</strong> — anti-islanding (no grid); EREC G98/G99/G100; DNO notification</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>BS EN 62446-2 — periodic inspection + maintenance</ContentEyebrow>

          <Pullquote>5-yearly EICR-style. PV cable + connectors + isolators + performance baseline + BESS condition + EPS + G100 + firmware.</Pullquote>

          <ConceptBlock
            title="The 5-yearly inspection scope"
            plainEnglish="BS EN 62446-2 covers PERIODIC inspection + maintenance through the install\'s life. Typical UK domestic: 5-yearly EICR-style inspection. Scope: PV cable insulation, connectors, isolators, performance baseline; BESS condition + capacity test; EPS / island mode verification; G100 verification; firmware review."
            onSite="The 5-yearly inspection is the cert evidence bundle\'s next refresh point. Findings recorded per BS 7671 EICR coding (C1 immediate danger, C2 potentially dangerous, C3 improvement recommended). Customer informed of any rectifications; updated cert evidence bundle reflects the inspection result."
          >
            <p>5-yearly inspection scope:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">PV cable insulation</strong> — megger test (500V or 1000V per Reg 712.6 + BS EN 62446-1 methodology); compare to commissioning baseline; identify any degradation</li>
              <li><strong className="text-white">PV connectors</strong> — visual inspection (corrosion, water ingress, UV damage); thermal imaging where possible (hot connectors indicate corrosion or loose contact)</li>
              <li><strong className="text-white">DC isolator function</strong> — manual operation; DC switching capability per Reg 712 + BS EN 60947-3 still working; arc-free operation</li>
              <li><strong className="text-white">PV performance baseline</strong> — V_oc + I_sc per string vs commissioning record; adjusted for typical module degradation (~5-10% over 5 years); identify modules with abnormal degradation</li>
              <li><strong className="text-white">BESS condition + capacity test</strong> — discharge test to measure usable capacity; compare to nameplate + manufacturer warranty curve; review BMS log for cell imbalance, temperature alarms, fault codes</li>
              <li><strong className="text-white">BESS fire safety per PAS 63100</strong> — separation from escape routes; smoke alarm function; visual condition of enclosure</li>
              <li><strong className="text-white">EPS / island mode verification</strong> — simulate grid loss; verify EPS contactor + island mode + protected loads (Module 4.6 test sequence)</li>
              <li><strong className="text-white">G100 verification (if applicable)</strong> — over-export simulation; response time; CT cable integrity</li>
              <li><strong className="text-white">Firmware review</strong> — current version vs latest; check release notes for any safety-affecting changes; update if recommended</li>
              <li><strong className="text-white">EICR coding</strong> — C1 (immediate danger); C2 (potentially dangerous); C3 (improvement recommended); FI (further investigation)</li>
              <li><strong className="text-white">Updated cert evidence bundle</strong> — periodic inspection record added; firmware version log updated; manufacturer warranty status verified</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>The integrated cert evidence bundle</ContentEyebrow>

          <Pullquote>10+ documents integrated. The customer\'s long-term asset. Paper + digital archive.</Pullquote>

          <ConceptBlock
            title="Assembling the cert evidence bundle"
            plainEnglish="The cert evidence bundle for a hybrid PV+BESS install integrates 10+ document categories. It\'s the customer\'s long-term asset — referenced for MCS audit, EICR-style inspection, insurance claims, property ownership transfer."
            onSite="Modern installer workflow: cloud-based document management (e.g. installer portal with customer access) plus paper copy delivered at handover. Total size: 50-200 pages depending on install complexity. Customer\'s digital + paper archive."
          >
            <p>Cert evidence bundle components:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">1. MCS MIS 3002 PV design pack</strong> — site survey, yield modelling, schematic, schedule, MPPT calculations, cable sizing, customer information (Module 3)</li>
              <li><strong className="text-white">2. Chapter 57 BESS design pack + PAS 63100:2024 compliance</strong> — battery selection, PCE selection per Reg 570.5.2, placement + ventilation + fire safety per PAS 63100, BMS spec (Module 5 covers in depth)</li>
              <li><strong className="text-white">3. Chapter 82 PEI design pack</strong> — operating modes, multi-source isolation, bidirectional OCPDs, transient protection (Module 4.5)</li>
              <li><strong className="text-white">4. BS EN 62446-1 PV commissioning records + SoTR</strong> — continuity, polarity, V_oc/I_sc per string, IR, functional tests of isolators + protective devices (Module 3.7)</li>
              <li><strong className="text-white">5. BS EN IEC 62485 + PAS 63100 BESS commissioning records</strong> — BMS handshake, first cycle, ventilation verification, fire safety verification, capacity baseline</li>
              <li><strong className="text-white">6. EPS test record (Module 4.6)</strong> — switchover time, protected-load partition verification, RCD under island mode</li>
              <li><strong className="text-white">7. EREC G98/G99/G100 paperwork (Module 4.7)</strong> — applications, DNO approvals, G100 verification testing</li>
              <li><strong className="text-white">8. Manufacturer datasheets + warranty registrations</strong> — PV modules, hybrid inverter, BESS, accessories; warranty status confirmation</li>
              <li><strong className="text-white">9. Install photographs</strong> — DC routing, AC routing, mounting + flashing, modules + frame bonding, BESS placement, isolator placements + labels, all signage</li>
              <li><strong className="text-white">10. Customer information pack</strong> — operating manual, mode descriptions, maintenance schedule, EPS behaviour, emergency contacts, manufacturer app credentials</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <InlineCheck {...inlineChecks[8]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="UK 6 kWp + 10 kWh new-build commissioning — full integrated workflow"
            situation="Customer\'s install completed: 6 kWp south-facing PV, GivEnergy 9.5 kWh LFP BESS, Gen3 5 kW hybrid inverter with EPS, G100 export limit configured at 16 A. Commissioning visit on a sunny May day."
            whatToDo="Integrated commissioning visit (~5 hours total): (1) Visual inspection — modules, BESS placement, hybrid inverter, cabling, labels (~45 min); (2) BS EN 62446-1 PV electrical tests — continuity, IR at 1000V, polarity per string (~1 hour); (3) PV V_oc/I_sc — measure at conditions; correct to STC; record in SoTR; cross-check to design pack (~30 min); (4) BS EN IEC 62485 + PAS 63100 BESS commissioning — BMS handshake via GivEnergy app, first charge cycle, capacity baseline, fire safety + ventilation check (~1 hour); (5) Hybrid inverter functional — connect grid; verify direct feeding mode; PV charges BESS + supplies loads (~30 min); (6) EPS test — open DNO main isolator; measure switchover time (target &lt;100 ms for GivEnergy Gen3); verify protected-load partition; verify RCD under island mode (~30 min); (7) G100 verification — turn off loads; measure net export capped at 16 A; verify response time + failure mode (~20 min); (8) SoTR completion + cert evidence bundle finalisation + customer handover (~30 min). All tests pass; cert evidence bundle handed over with paper + digital copies. EREC G98 fit-and-notify submitted online within 28 days."
            whyItMatters="Integrated commissioning is the modern UK hybrid PV+BESS standard. Single visit, all standards covered, comprehensive cert evidence bundle delivered. The competent commissioning is the customer\'s long-term asset + the MCS audit trail. Module 4 has now built up the regulatory + technical framework for hybrid installs; the commissioning section ties it together."
          />

          <Scenario
            title="Five-yearly EICR-style inspection of a 5-year-old hybrid install"
            situation="Customer\'s install (commissioned May 2026) is due its 5-yearly EICR-style inspection in 2031. Install: 6 kWp PV + GivEnergy 9.5 kWh BESS + Gen3 hybrid + EPS + G100 export limit."
            whatToDo="EICR-style inspection per BS EN 62446-2 + EICR scope: (1) Visual inspection of PV array — modules, mounting, flashings; expect 10-15% module degradation by year 5 (typical); (2) PV cable IR test at 1000V — compare to commissioning record; expect within 10-20% (cable insulation degrades slowly); (3) PV connector inspection — thermal imaging where possible; expect no hot spots; (4) PV V_oc/I_sc per string — adjusted for cell temp; compare to commissioning baseline; identify any abnormal degradation; (5) BESS condition — discharge test to measure capacity; compare to nameplate × manufacturer warranty curve (typical 87-92% capacity at year 5 for LFP); BMS log review; (6) BESS fire safety per PAS 63100 — separation, smoke alarm function, enclosure condition; (7) EPS test — simulate grid loss; measure switchover time vs commissioning baseline; if degraded, investigate; (8) G100 verification — over-export simulation; verify limit still respected; (9) Firmware review — current version vs latest; check release notes; (10) EICR coding — record any C1/C2/C3 findings; updated cert evidence bundle. Customer informed of any rectifications; next inspection due 2036."
            whyItMatters="Five-yearly inspection is the cert evidence bundle\'s refresh point. The competent inspector catches any safety-affecting degradation (RCD failures, connector hot spots, BESS capacity loss, EPS degradation) before they become incidents. Customer\'s install life is the 25-30 year horizon; each 5-yearly inspection extends that horizon. Cert evidence bundle becomes the cumulative install record."
          />

          <CommonMistake
            title="Skipping cert evidence bundle documentation — focusing only on the install"
            whatHappens="An installer focuses on getting the install commissioned and working but skimps on the cert evidence bundle documentation — just delivers MCS cert + verbal handover. Years later, customer needs the documentation for insurance claim / EICR / property sale / fault investigation; documentation is incomplete. Customer dissatisfaction; installer reputation damaged; MCS audit risk."
            doInstead="Cert evidence bundle is the install\'s LONG-TERM ASSET. Produce it during install + commissioning, not as an afterthought. Modern installer workflow: cloud-based document management with templates for each section; paper copy delivered at handover. The cert evidence bundle is what makes the install legible to future inspectors, electricians, insurance, EICR. The 5-yearly inspection extends it. Customer\'s investment in the cert evidence bundle pays back over the 25-30 year install life."
          />

          <CommonMistake
            title="Commissioning EPS without verifying the protected-load partition"
            whatHappens="An installer runs the EPS test by simulating grid loss but doesn\'t actually verify which circuits are protected vs non-protected. After install, customer experiences a real grid outage and discovers their non-protected circuits (e.g. cooker, oven, EV charger) are off as expected — but a circuit they thought was protected (e.g. cooker socket) is actually not. The partition didn\'t match the design pack."
            doInstead="EPS commissioning includes verifying the protected-load partition: with EPS active (open DNO main isolator), walk through each room of the property; check which sockets / lights / appliances have power and which don\'t; cross-reference to the design pack\'s partition list. Identify any mismatches; rectify by rewiring the relevant circuits to the correct side of the EPS partition. Cert evidence bundle records the verified partition + any rectifications. Customer informed of the protected-load list in the handover pack."
          />

          <CommonMistake
            title="Failing to record firmware versions at commissioning — debugging headaches later"
            whatHappens="An installer commissions a hybrid PV+BESS install but doesn\'t record the firmware versions of the hybrid inverter, BESS BMS, and any other software-controlled components. Years later, a behaviour change is reported; investigation can\'t determine what firmware was running when. Diagnostic takes much longer than necessary."
            doInstead="Record firmware versions for ALL software-controlled components at commissioning: hybrid inverter; BESS BMS; G100 export-control device (if separate); EV charger (if PV-aware); EPS contactor (if smart); customer monitoring gateway. Capture via manufacturer app screenshots or written records. Cert evidence bundle has a firmware-version log column. Re-record at each 5-yearly EICR-style inspection. The firmware-version log is the diagnostic asset for future fault investigation."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Hybrid PV+BESS commissioning integrates BS EN 62446-1 (PV) + BS EN IEC 62485 (BESS) + PAS 63100:2024 (UK domestic) + Chapter 82 PEI verification + EREC G100 verification + EPS testing.",
              "8-step commissioning sequence: visual; electrical tests; PV V_oc/I_sc; BESS commissioning; hybrid inverter functional; EPS test; G100 verification (if applicable); SoTR + cert evidence bundle.",
              "Off-grid commissioning differs: NO anti-islanding, NO EREC, NO DNO; INSTEAD V/freq trip per Reg 551.2.3, generator integration (Section 4.3), extended-autonomy verification, Reg 712.414 SELV/PELV if applicable.",
              "BS EN 62446-2 covers PERIODIC inspection + maintenance — 5-yearly EICR-style for UK domestic. Scope: PV cable / connectors / isolators / performance baseline; BESS condition + capacity test; EPS verification; G100 verification; firmware review.",
              "Cert evidence bundle: MCS MIS 3002 PV design + Chapter 57 BESS design + Chapter 82 PEI design + BS EN 62446-1 commissioning + BS EN IEC 62485 + PAS 63100 BESS commissioning + EREC paperwork + manufacturer evidence + customer handover. 50-200 pages typical UK domestic.",
              "Customer handover: cert evidence bundle (paper + digital); customer information pack (operating, EPS behaviour, maintenance, emergency contacts); MCS cert; DNO confirmation; EREC paperwork; SEG application support; warranty registration; 5-yearly inspection reminder; behavioural education.",
              "Fault investigation across PV+BESS interfaces: telemetry → PV side → DC bus → BMS → firmware → cert evidence bundle baseline. Don\'t replace components until root cause identified.",
              "Module 4 complete. Modules 1-4 cover PV + BESS foundations + hybrid integration. Modules 5-12 extend the renewable course into BESS deep dive, EV charging, heat pumps, other LCT, integration at scale, mock exams.",
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-7')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                EREC for hybrid
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 5 · BESS deep dive
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
