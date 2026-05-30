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
    id: 'm8s8-commissioning-sequence',
    question:
      'What is the heat pump commissioning sequence per BS 7671 Part 6?',
    options: [
      'Switch on',
      'Sequence: (1) Pre-energise visual inspection per Reg 642 — installation correct, polarity, conductor terminations, IP / IK at outdoor; (2) Reg 643 testing per circuit (heat pump + immersion + controls + zone valves) — continuity, IR, polarity, ADS / Zs, RCD trip-time at 1× and 5× IΔn, prospective fault current; (3) Functional test — compressor + immersion + zone valves + thermostats + controls + tariff integration; (4) Schedule of Inspections + Schedule of Test Results + EIC',
      'Random order',
      'Customer tests',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Part 6 commissioning sequence for heat pump install: (1) Pre-energise visual inspection per Reg 642 — installation per design + manufacturer instructions; polarity verified at every accessory; conductor terminations secure; IP / IK ratings at outdoor maintained; cable gland integrity; CPC arrangement (armour-as-CPC or separate). (2) Reg 643 testing per circuit (heat pump dedicated + immersion dedicated + controls dedicated + zone valve dedicated) — Reg 643.2 continuity (R1+R2); Reg 643.3 insulation resistance (≥1 MΩ at 500 V DC); Reg 643.6 polarity; Reg 643.7 ADS (Zs measurement at furthest point of each circuit ≤ Table 41.3); Reg 643.7.3 RCD trip-time at 1× IΔn (≤300 ms) + at 5× IΔn (≤40 ms) per BS EN 61557-6; Reg 643.7.3.201 prospective fault current; Reg 643.8 additional protection verification. (3) Functional test per Reg 643.10 — exercise the system; verify all control + safety functions; legionella cycle scheduled; tariff integration verified. (4) Documentation per Chapter 64 — Schedule of Inspections + Schedule of Test Results + EIC issued. Cert evidence bundle integrates all.',
  },
  {
    id: 'm8s8-test-instruments',
    question:
      'What test instruments does the commissioning electrician need?',
    options: [
      'Just a screwdriver',
      'Multi-function tester compliant with BS EN 61557 (e.g. Megger MFT1731 / MFT1741, Fluke 1664 FC, Kewtech KT64DL, Metrel MI3155). Type B-capable IF heat pump declares Type B per manufacturer DoC. Phase-sequence tester for three-phase install. Thermal imaging camera (optional) for higher-tier EICR. Calibration certificates within manufacturer service interval (typically annual). Cert evidence bundle records each instrument model + serial + calibration date',
      'Customer\'s tools',
      'No instruments',
    ],
    correctIndex: 1,
    explanation:
      'Heat pump commissioning instrument requirements per Reg 643.1 + BS EN 61557: (1) Multi-function tester compliant with BS EN 61557 — UK 2025-26 typical products: Megger MFT1731 (mainstream domestic), Megger MFT1741 (premium), Fluke 1664 FC, Kewtech KT64DL (commercial-grade), Metrel MI3155 (specialist). Capabilities required: continuity (R1+R2), insulation resistance (1000 V DC ranges), loop impedance (Zs), RCD trip-time (1× and 5× IΔn), prospective fault current, low-current Zs (no-trip mode). (2) Type B-capable instrument required if heat pump manufacturer DoC declares Type B RCD needed — most UK 2025-26 multi-function testers support Type B testing on the premium models. (3) Phase-sequence tester for three-phase install — many multi-function testers include this; standalone testers also available (e.g. Megger PSC-100). (4) Thermal imaging camera (FLIR or equivalent) — optional for higher-tier EICR; useful at cylinder + CU + outdoor unit for thermal anomaly detection. (5) Calibration certificates within manufacturer service interval (typically annual for Megger, Fluke, Kewtech). Cert evidence bundle records: instrument model + serial + calibration date per test.',
  },
  {
    id: 'm8s8-eic-content',
    question:
      'What does the heat pump install EIC document?',
    options: [
      'Just signature',
      'Per BS 7671 Appendix 6 model form: (1) Customer + installer details + supply characteristics; (2) Schedule of Inspections covering items inspected (visual + functional); (3) Schedule of Test Results — per-circuit IR + R1+R2 + Zs + RCD trip-time + prospective fault current + functional; (4) Declaration by competent person + signature + date; (5) Recommendations for next inspection (typically 5-year cycle); (6) Notice + warning labels per Reg 514. EIC delivered to MCS company for handover pack',
      'Photograph only',
      'Customer signature',
    ],
    correctIndex: 1,
    explanation:
      'Electrical Installation Certificate (EIC) per BS 7671 Appendix 6 + Chapter 64: (1) Customer details + installer details + property address + supply characteristics (TN-S / TN-C-S / TT; max demand; nominal voltage; nominal frequency; Ze; PFC; prospective fault current at origin). (2) Schedule of Inspections (Reg 642) — comprehensive checklist of items inspected; each ticked or noted as N/A. (3) Schedule of Test Results (Reg 643) — per-circuit table with: circuit ID + description + protective device + cable + R1+R2 + IR + Zs (measured + maximum permitted) + RCD trip-time at IΔn + at 5 × IΔn + prospective fault current + functional. (4) Declaration by competent person (UK Part P competent person scheme — NICEIC, NAPIT, Stroma, ELECSA + others) + signature + date + certificate number. (5) Recommendations: typical 5-year EICR cycle for commercial / 10-year for domestic; specific to heat pump install. (6) Notice + warning labels per Reg 514 — RCD test notice + safety notice + circuit identification. (7) Schedule of Departures (if any departures from BS 7671 made). EIC delivered to the MCS company for inclusion in the customer handover pack alongside F-Gas record + sizing calc + commissioning report.',
  },
  {
    id: 'm8s8-eicr-cycle',
    question:
      'What is the EICR cycle for a domestic heat pump install?',
    options: [
      'Never',
      '10-year cycle typical for domestic (per IET guidance + Electrical Safety Standards in the Private Rented Sector Regs 2020 5-year cycle for landlord-rented domestic); 5-year cycle for commercial. Heat-pump-specific EICR items beyond standard installation EICR: per-circuit RCD trip-time check (heat pump dedicated + immersion + controls + zone valves); Type B RCD verification (if applicable); manufacturer DoC review; weather compensation curve operational verification; legionella cycle verification; control wiring functional',
      '50 years',
      'No cycle',
    ],
    correctIndex: 1,
    explanation:
      'EICR (Electrical Installation Condition Report) cycle: 10-year typical for owner-occupied domestic per IET / OSG guidance; 5-year typical for landlord-rented domestic (Electrical Safety Standards in the Private Rented Sector Regulations 2020); 5-year typical for commercial / public buildings; some operators on 3-year for high-utilisation sites. Heat-pump-specific EICR items beyond standard installation EICR: (1) per-circuit RCD trip-time check (heat pump + immersion + controls + zone valves) — verify trip-time hasn’t degraded; (2) Type B RCD verification (if applicable per manufacturer DoC) — Type B sensitivity testing; (3) manufacturer DoC + install manual review (any updates from manufacturer affecting protection); (4) weather compensation curve operational verification (sensor reading sensible vs known thermometer); (5) legionella cycle verification (sample temperature at cylinder during cycle); (6) control wiring functional (each thermostat + zone valve + immersion + cylinder thermostat exercised); (7) outdoor cable + isolator visual inspection (IP / IK condition, gland integrity, no UV degradation); (8) DHW cylinder over-temp cut-out functional test. Cert evidence bundle for EICR documents the heat pump-specific findings + recommendations + remediation completion if applicable.',
  },
];

const quizQuestions = [
  {
    question:
      'Standard UK 2025-26 domestic ASHP install — commissioning + handover delivery?',
    options: [
      'Same day',
      'Typical: 1-2 days electrical scope (depending on supply assessment + CU change scope). Sequence: pre-energise visual inspection; Reg 643 testing per circuit; functional test of heat pump + immersion + zone valves + controls + tariff integration; Schedule of Inspections + Schedule of Test Results + EIC; customer handover education. EIC delivered to MCS company for inclusion in customer handover pack alongside F-Gas record + sizing calc + commissioning report',
      'No commissioning',
      'Customer tests',
    ],
    correctAnswer: 1,
    explanation:
      'Typical UK 2025-26 domestic ASHP commissioning + handover: 1-2 days electrical scope (1 day for straightforward retrofit on adequate existing supply; 2 days where CU change + supply assessment + extensive cable routing). Commissioning sequence: (1) Pre-energise visual inspection — verify install per design + manufacturer instructions. (2) Reg 643 testing per circuit — heat pump dedicated 32 A circuit + immersion dedicated 16 A circuit + controls dedicated 6 A circuit + zone valve dedicated 6-10 A circuit. Continuity, IR, polarity, Zs, RCD trip-time, prospective fault current per circuit. (3) Functional test — compressor starts, defrost cycle exercised, immersion functional + over-temp cut-out tested, zone valves operate per zone thermostat, controls + app integration verified, tariff integration (if applicable) verified, legionella cycle scheduled. (4) BS 7671 Appendix 6 EIC produced + Schedule of Inspections + Schedule of Test Results. (5) Customer handover education: explain compressor + immersion priority logic + app interface + override scenarios + service contact. EIC delivered to MCS company for inclusion in customer handover pack. Cert evidence bundle complete.',
  },
  {
    question:
      'Three-phase heat pump install — what differs in commissioning?',
    options: [
      'Same',
      'Per-phase Zs verification at outdoor unit (L1-PE, L2-PE, L3-PE each ≤ Table 41.3); phase rotation verified L1→L2→L3 with phase-sequence tester BEFORE energising compressor; 4-pole RCD trip-time tested on each phase individually; functional test of compressor across all 3 phases + defrost cycle; balanced load verification; EREC G99 DNO confirmation if formal application made. Cert evidence bundle per-phase results',
      'Single-phase only',
      'No verification',
    ],
    correctAnswer: 1,
    explanation:
      'Three-phase heat pump commissioning adds per-phase verification: (1) Per-phase Zs at outdoor unit terminals — L1-PE, L2-PE, L3-PE measured separately; each ≤ Table 41.3 limit for the protective device; per-phase imbalance within ~10% expected. (2) Phase rotation verification — phase-sequence tester used BEFORE energising heat pump compressor; L1→L2→L3 confirmed clockwise. Wrong rotation causes compressor fault. (3) 4-pole RCD trip-time tested on EACH phase individually — induce fault on L1, verify trip; reset; L2; reset; L3. Trip-time at 1× IΔn and at 5× IΔn per phase. (4) Functional test — three-phase compressor starts smoothly; defrost cycle exercised; immersion functional (note immersion typically single-phase even on three-phase supply — connected to L1 or balanced across phases at the wiring centre). (5) Balanced load verification at running steady-state — measured per-phase current should be within 10% of average. (6) EREC G99 DNO confirmation if formal application made — submit completion notice to DNO. Cert evidence bundle: per-phase results documented + phase rotation verified + 4-pole RCD trip-time per phase + functional test + DNO completion.',
  },
  {
    question: 'MCS handover pack — what does the electrical EIC contribute?',
    options: [
      'Nothing',
      'EIC is one input to the MCS handover pack. Other inputs from other trades: MCS sizing calc (room-by-room heat loss per BS EN 12831; whole-house SAP / PHPP); product details + DoC + warranty; F-Gas record (REFCOM Cat 1 person + refrigerant type + quantity + leak check); commissioning report (heat pump operational performance + COP at design point + flow temperatures); customer handover documentation. MCS company orchestrates; electrical EIC sits within the pack',
      'Just signature',
      'No contribution',
    ],
    correctAnswer: 1,
    explanation:
      'MCS handover pack incorporates ALL the trades’ deliverables: (1) MCS sizing calc — room-by-room heat loss per BS EN 12831 or equivalent; whole-house heat loss per SAP / PHPP. (2) Product details — heat pump model + serial + manufacturer + DoC + product warranty (typically 5-10 years). (3) F-Gas record — REFCOM Cat 1 person’s name + accreditation number + refrigerant type (R32, R290 etc.) + quantity charged + leak check + commissioning date. (4) Commissioning report — heat pump operational performance + COP at design point + primary flow / return temperatures + DHW reheat time + defrost cycle observation. (5) BS 7671 EIC — electrical install certificate (from the electrical scope — this course’s deliverable). (6) Customer handover documentation — operating instructions + maintenance schedule + service contact + warranty + Boiler Upgrade Scheme grant paperwork. (7) DNO correspondence — supply notification + reference. MCS company orchestrates + issues the pack. BUS grant claim through Ofgem requires the complete pack. Cert evidence bundle for the electrical scope = the EIC + Schedule of Inspections + Schedule of Test Results + commissioning notes + cross-references to the other trades’ deliverables.',
  },
  {
    question:
      'Customer handover education — what should the electrician cover?',
    options: [
      'Nothing',
      '(1) Heat pump priority logic (compressor primary, immersion supplemental); (2) Customer-facing app + indoor controller interface; (3) OAT sensor location + role (don’t obstruct or shade artificially); (4) Outdoor unit clearance + ventilation requirements (don’t enclose); (5) Defrost cycle expected behaviour (water dripping from outdoor unit is normal); (6) Legionella cycle (typically weekly off-peak — runs longer + hotter than normal); (7) Service contact + warranty + emergency isolator location; (8) Tariff integration + cheap-window usage if applicable',
      'Customer DIY',
      'No handover',
    ],
    correctAnswer: 1,
    explanation:
      'Customer handover education at heat pump commissioning. Topics electrician covers (electrical-side; MCS company / heating engineer cover hydraulic + sizing-side separately): (1) Heat pump priority logic — compressor primary, immersion supplemental. Customer should NOT manually set to immersion-only except during heat pump fault. Demonstrate at the controller. (2) Customer-facing app + indoor controller interface — walk through main screens, setpoint change, status / running cost view, error notifications. (3) OAT sensor location + role — point out the sensor on the wall; emphasise not to obstruct or shade artificially (will affect heating). (4) Outdoor unit clearance + ventilation — emphasise the manufacturer clearance must be maintained; don’t enclose the unit; don’t place items against / on it. (5) Defrost cycle — water dripping from outdoor unit is normal during cold weather; not a fault; soakaway / drain handles the volume. (6) Legionella cycle — typically weekly at off-peak (e.g. 02:00 Monday); runs longer + hotter than normal compressor cycle; this is intentional + safety-critical. (7) Service contact + warranty terms + emergency isolator location (outdoor isolator near outdoor unit; CU dedicated way labelled). (8) Tariff integration + cheap-window usage if applicable. Cert evidence bundle: handover documentation provided to customer.',
  },
  {
    question: 'EICR year 5 on a heat pump install — what is checked?',
    options: [
      'Random',
      'Standard BS 7671 EICR scope + heat-pump-specific: per-circuit RCD trip-time degradation check (heat pump dedicated + immersion + controls + zone valves); Type B RCD verification if applicable; outdoor cable + isolator visual condition (UV / IP degradation); cylinder over-temp cut-out functional test; weather compensation curve operational verification (sensor reading vs known thermometer); legionella cycle verification (sample cylinder temperature during cycle); control wiring functional per zone',
      'No EICR',
      'Skip',
    ],
    correctAnswer: 1,
    explanation:
      'Year-5 EICR on a heat pump install. Standard BS 7671 EICR scope (whole installation: CU + circuits + accessories + earthing + bonding + main switch + RCDs + visual + Section 651 inspection items). Heat-pump-specific items added: (1) per-circuit RCD trip-time check — verify trip-time hasn’t degraded over 5 years (typical RCD degradation: trip-time increases slightly with age; significant increase indicates internal contact wear; replace if approaching limits); (2) Type B RCD verification if applicable (Type B sensitivity test — Megger MFT1741 / Fluke 1664 FC support); (3) outdoor cable + isolator visual condition — UV degradation of outer sheath, IP / IK seal integrity, gland tightness, no water ingress; (4) cylinder over-temp cut-out functional test — periodic exercise of the safety device (Reg 554.2.1); (5) weather compensation curve operational verification — read OAT sensor; compare to known thermometer; verify within ±1 °C; check the curve hasn’t been customer-overridden unhelpfully; (6) legionella cycle verification — sample cylinder temperature during a scheduled cycle; verify ≥60 °C reached; (7) control wiring functional per zone — each thermostat call → relay → valve → primary flow → compressor / immersion start sequence verified. Cert evidence bundle for EICR: heat pump items + standard installation items + observations + recommendations + customer informed.',
  },
  {
    question:
      'Heat pump cert evidence bundle structure — what does it integrate?',
    options: [
      'Single page',
      'Structured digital folder: (1) Design — MCS sizing + SAP / PHPP + manufacturer product selection; (2) Supply assessment + DNO correspondence; (3) Electrical install — per-circuit EIC + Schedule of Inspections + Schedule of Test Results + protective device + cable + Zs + RCD trip-time + voltage drop calc; (4) F-Gas record (Cat 1 person scope, cross-referenced); (5) MCS handover pack at top level; (6) Customer handover documentation; (7) Service / EICR schedule. UK 2025-26 mature practice: shared workspace (SharePoint / Confluence / similar)',
      'Paper only',
      'No structure',
    ],
    correctAnswer: 1,
    explanation:
      'Heat pump install cert evidence bundle structure (UK 2025-26 mature practice — shared digital workspace): (1) Design — MCS company’s sizing calc (BS EN 12831 room-by-room + SAP / PHPP whole-house); manufacturer product selection rationale; Boiler Upgrade Scheme grant claim documentation. (2) Supply assessment — Reg 311.1 max demand calc + existing supply capacity + DNO correspondence + reference + completion. (3) Electrical install (this course’s scope) — per-circuit EIC + Schedule of Inspections + Schedule of Test Results + protective device + cable + Zs + RCD trip-time + voltage drop calc + manufacturer DoC references (RCD type, cable armour-as-CPC, etc.). (4) F-Gas record — REFCOM Cat 1 person scope, cross-referenced with the electrical install date sequencing. (5) MCS handover pack at the top level — incorporates the other deliverables + product warranty + commissioning report. (6) Customer handover documentation — operating instructions + service contact + tariff integration education. (7) Service / EICR schedule — typical 10-year cycle for domestic owner-occupied; recommended service intervals from manufacturer; F-Gas leak check schedule (annual for refrigerant >5 tonnes CO2-eq). Shared workspace: SharePoint / Confluence / similar; MCS company owns the workspace; electrical installer + F-Gas Cat 1 person + heating engineer all upload their deliverables.',
  },
];

const faqs = [
  {
    question: 'Heat pump dedicated circuit RCD type — Type A or Type B per the EIC?',
    answer:
      'EIC records the actual type fitted. Per manufacturer DoC (§8.5). UK 2025-26 typical small-medium domestic ASHP: Type A acceptable per manufacturer DoC; EIC records Type A 32 A C-curve RCBO. Larger / older / specialist heat pumps: Type B per manufacturer DoC; EIC records Type B. Always verify per the specific model + record manufacturer DoC reference in the cert evidence bundle.',
  },
  {
    question: 'When does the MCS company submit the BUS grant claim?',
    answer:
      'After commissioning + customer handover complete. MCS company submits via Ofgem portal: MCS handover pack + product details + customer details + property address + EPC + grant claim form. Typical 4-8 weeks Ofgem processing + payment to MCS company (or directly to customer depending on scheme variant). EIC must be present in the handover pack — delays the claim if missing.',
  },
  {
    question: 'EICR finding: heat pump on Type AC RCD?',
    answer:
      'C2 (potential danger) at minimum; C1 (immediate danger) if smooth-DC leakage actively present. Reg 531.3.3 violation. Recommendation: replace with Type A minimum (Type B if manufacturer DoC declares smooth-DC > Type A capability). Customer informed; remediation scheduled within 28 days typically (C2 timescale). Cert evidence bundle records the finding + remediation.',
  },
  {
    question: 'Customer claims heating bill higher than expected — what to check?',
    answer:
      'Multiple potential causes: (1) Customer on immersion-only override (most common — explain priority logic + correct); (2) Weather compensation curve incorrectly configured (too steep or too shallow); (3) Heat pump under-sized (MCS sizing review needed); (4) Building heat loss higher than assumed (insulation issue); (5) Tariff change (verify current tariff vs install-time assumption). Sample COP measurement at design point compares actual vs nameplate. Cert evidence bundle records the findings + customer guidance.',
  },
  {
    question: 'Final commissioning checklist before customer handover?',
    answer:
      '(1) Reg 643 testing complete + EIC issued; (2) All RCD trip-times verified within limits; (3) Cylinder over-temp cut-out functional tested per Reg 554.2.1; (4) Heat pump compressor + immersion priority logic verified; (5) Legionella cycle scheduled; (6) OAT sensor reading sensible; (7) All zone valves operate per zone thermostat; (8) Customer-facing app installed + account linked; (9) Tariff integration verified (if applicable); (10) Customer handover documentation provided; (11) Service contact + emergency isolator location communicated; (12) EIC delivered to MCS company.',
  },
];

export default function RenewableEnergyModule8Section8() {
  const navigate = useNavigate();

  useSEO({
    title: 'Commissioning, Part 6 inspection + handover | Renewable Energy 8.8 | Elec-Mate',
    description:
      'Heat pump commissioning sequence per BS 7671 Part 6 — Reg 642 visual inspection, Reg 643 testing per circuit, Type B-capable instruments per BS EN 61557, EIC + Schedule of Inspections + Schedule of Test Results, customer handover education, MCS handover pack integration, EICR cycle.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-8')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 8 · BS 7671:2018+A4:2026 · Part 6 + Chapter 64 + BS EN 61557"
            title="Commissioning, Part 6 inspection + handover"
            description="Heat pump commissioning sequence per BS 7671 Part 6 — Reg 642 visual inspection, Reg 643 testing per dedicated circuit, BS EN 61557 instrument requirements, EIC + Schedule of Inspections + Schedule of Test Results per Chapter 64, MCS handover pack integration, customer handover education, EICR cycle."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 Part 6 commissioning sequence: pre-energise visual inspection (Reg 642); testing per circuit (Reg 643); functional test; Schedule of Inspections + Schedule of Test Results + EIC (Chapter 64).',
              'Reg 643 testing per circuit: continuity (R1+R2), IR (≥1 MΩ at 500 V DC), polarity, ADS / Zs at furthest point ≤ Table 41.3, RCD trip-time at 1× IΔn (≤300 ms) + at 5× IΔn (≤40 ms), prospective fault current.',
              'Multi-function tester per Reg 643.1 + BS EN 61557 (Megger MFT1731 / Fluke 1664 FC / Kewtech KT64DL or equivalent). Type B-capable if heat pump declares Type B per manufacturer DoC. Phase-sequence tester for three-phase.',
              'Per-circuit testing for each dedicated circuit: heat pump (32 A) + immersion (16 A) + controls (6 A) + zone valves (6-10 A). Reg 314 division of installation pattern.',
              'Three-phase commissioning adds: per-phase Zs verification, phase rotation verification BEFORE energising, 4-pole RCD trip-time per phase, balanced load verification.',
              'Cylinder over-temp cut-out functional test per Reg 554.2.1 mandatory. Deliberate overheat with thermostat bypassed in controlled condition.',
              'EIC per BS 7671 Appendix 6: customer + installer + supply characteristics + Schedule of Inspections + Schedule of Test Results + declaration + recommendations.',
              'MCS handover pack integrates: MCS sizing + product details + F-Gas record + commissioning report + EIC + customer handover documentation + DNO correspondence. EICR cycle: 10-year domestic / 5-year commercial.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply BS 7671 Part 6 commissioning sequence: Reg 642 visual + Reg 643 testing + functional + Chapter 64 documentation.',
              'Test per circuit per Reg 643: continuity, IR, polarity, ADS / Zs, RCD trip-time at 1× and 5× IΔn, prospective fault current.',
              'Use Reg 643.1 + BS EN 61557 compliant instruments; verify calibration certificates within service interval.',
              'Conduct per-phase verification + phase rotation check for three-phase install.',
              'Conduct Reg 554.2.1 over-temp cut-out functional test for cylinder immersion.',
              'Produce BS 7671 Appendix 6 EIC + Schedule of Inspections + Schedule of Test Results per Chapter 64.',
              'Deliver customer handover education: priority logic, app, outdoor unit clearance, defrost cycle, legionella cycle, service contact.',
              'Document the electrical scope in the MCS handover pack; understand EICR cycle (10-year domestic / 5-year commercial).',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Commissioning is where M8.1-M8.7 prove themselves. Reg 643 testing per circuit, per phase, per element, per device. Schedule of Test Results is the structured truth that the EICR ten years later relies on.
          </Pullquote>

          <ContentEyebrow>BS 7671 Part 6 commissioning sequence</ContentEyebrow>

          <ConceptBlock
            title="Pre-energise visual inspection per Reg 642"
            plainEnglish="Reg 642 visual inspection BEFORE energising the installation. Verify the install matches the design + manufacturer instructions; conductor terminations secure; polarity correct at every accessory; IP / IK ratings at outdoor maintained; cable gland integrity; CPC arrangement (armour-as-CPC or separate)."
            onSite="Schedule of Inspections per BS 7671 Appendix 6 covers the items inspected. Each item ticked / noted N/A. Photographs at key points (outdoor unit clearance, CU layout, cylinder cupboard, cable routes) recorded in the cert evidence bundle."
          >
            <p>Visual inspection items for heat pump install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Installation per
                  design</strong> — heat pump model + outdoor unit + indoor unit + cylinder
                + CU layout matches the design / quote
              </li>
              <li>
                <strong className="text-white">Manufacturer
                  instructions followed</strong> — outdoor unit clearance per spec;
                vibration isolation pads; cable routing; gland-sealed entries; cylinder
                installation per manufacturer
              </li>
              <li>
                <strong className="text-white">Polarity</strong> — at
                every accessory + outdoor isolator + CU dedicated way. Mismatch
                indicates wiring error
              </li>
              <li>
                <strong className="text-white">Conductor
                  terminations</strong> — secure (correct torque per manufacturer); no
                bare strands outside terminals; no over-insulation under terminal
                clamp
              </li>
              <li>
                <strong className="text-white">CPC arrangement</strong>
                — armour-as-CPC (continuity from outdoor unit through armour to CU
                earth) OR separate green-yellow CPC verified
              </li>
              <li>
                <strong className="text-white">IP / IK at
                  outdoor</strong> — outdoor unit + isolator IP rating maintained; cable
                glands sealed; no water ingress points; no UV-degradation of outer
                sheath
              </li>
              <li>
                <strong className="text-white">Cable thermal
                  protection</strong> — Reg 522.2 compliance verified per route;
                shielding / distance / higher-rated cable / local reinforcement as
                appropriate
              </li>
              <li>
                <strong className="text-white">Warning notices +
                  labelling</strong> — Reg 514 RCD test notice + heat pump circuit
                identification at CU + outdoor isolator labelled
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — Schedule of Inspections + photographs + manufacturer
                install manual reference
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 643 testing per circuit"
            plainEnglish="Reg 643 testing sequence applied to each dedicated circuit: heat pump (32 A) + immersion (16 A) + controls (6 A) + zone valves (6-10 A). Tests: continuity (R1+R2), IR, polarity, ADS / Zs at furthest point, RCD trip-time at 1× IΔn + at 5× IΔn, prospective fault current."
            onSite="Multi-function tester per Reg 643.1 + BS EN 61557. UK 2025-26 typical products: Megger MFT1731 / MFT1741, Fluke 1664 FC, Kewtech KT64DL, Metrel MI3155. Type B-capable instrument if heat pump declares Type B per manufacturer DoC. Calibration certificates within manufacturer service interval (annual)."
          >
            <p>Reg 643 testing sequence per circuit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Continuity (Reg
                  643.2)</strong> — R1+R2 measured end-to-end of the circuit (CU
                terminal to outdoor unit terminal). Typical 32 A heat pump circuit: ~0.15
                Ω for 6 mm² indoor + 10 mm² SWA outdoor + 15 m
              </li>
              <li>
                <strong className="text-white">Insulation resistance
                  (Reg 643.3)</strong> — between line + neutral; line + earth; neutral
                + earth. At 500 V DC. ≥1 MΩ per Table 64 (Reg 643.3.2). Typical actual
                ~500-2000 MΩ for new install
              </li>
              <li>
                <strong className="text-white">Polarity (Reg
                  643.6)</strong> — line + neutral + earth correctly connected; verified
                at outdoor unit terminals + CU dedicated way + outdoor isolator
              </li>
              <li>
                <strong className="text-white">ADS / Zs (Reg
                  643.7)</strong> — measured at outdoor unit terminals (furthest point).
                Typical 32 A C-curve on 230 V TN-C-S: ≤0.68 Ω. Measured ~0.3-0.5 Ω
                typical
              </li>
              <li>
                <strong className="text-white">RCD trip-time (Reg
                  643.7.3 + BS EN 61557-6)</strong> — at IΔn (30 mA): ≤300 ms required;
                typical actual ~25-50 ms. At 5 × IΔn (150 mA): ≤40 ms required;
                typical actual ~10-20 ms. Test at sine-wave for Type A; Type B-capable
                instrument test for Type B
              </li>
              <li>
                <strong className="text-white">Prospective fault
                  current (Reg 643.7.3.201)</strong> — at origin + at relevant points.
                Typical 100 A TN-C-S supply: ~6 kA at origin; ~3 kA at heat pump
                circuit
              </li>
              <li>
                <strong className="text-white">Additional protection
                  verification (Reg 643.8)</strong> — RCD effectiveness for additional
                protection at IΔn
              </li>
              <li>
                <strong className="text-white">Functional test (Reg
                  643.10)</strong> — exercise each circuit; verify operation under
                normal conditions
              </li>
              <li>
                <strong className="text-white">Per-circuit
                  results</strong> — recorded in Schedule of Test Results per BS 7671
                Appendix 6 model form
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.1 + BS EN 61557 — Instruments for testing + verification"
            clause="The verification of the effectiveness of the measures for fault protection by automatic disconnection of supply is effected by measurement of the earth fault loop impedance and verification of the characteristics and/or the effectiveness of the associated protective device. Test instruments shall comply with BS EN 61557."
            meaning="Reg 643.1 mandates instrument compliance with BS EN 61557 series (Electrical safety in low voltage distribution systems — equipment for testing, measuring or monitoring of protective measures). BS EN 61557-1 general requirements; BS EN 61557-6 RCD effectiveness. UK 2025-26 typical compliant instruments: Megger MFT1731 (mainstream domestic), Megger MFT1741 (premium + Type B capability), Fluke 1664 FC, Kewtech KT64DL (commercial-grade), Metrel MI3155 (specialist). Type B testing capability essential where heat pump manufacturer DoC declares Type B RCD requirement. Calibration certificates valid within manufacturer service interval (typically annual). Cert evidence bundle records: instrument model + serial number + calibration date + calibration certificate reference per test."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>EIC + Chapter 64 documentation</ContentEyebrow>

          <Pullquote>
            EIC is the structured truth. Ten years later, the EICR engineer reads the original EIC + Schedule of Test Results + walks the property. Clear initial documentation makes the EICR straightforward.
          </Pullquote>

          <ConceptBlock
            title="BS 7671 Appendix 6 EIC structure"
            plainEnglish="The Electrical Installation Certificate per BS 7671 Appendix 6 model form. Customer + installer details + supply characteristics + Schedule of Inspections + Schedule of Test Results + declaration by competent person + signature + date + certificate number + recommendations for next inspection."
            onSite="UK 2025-26 mature install practice: EIC produced digitally via NICEIC / NAPIT / Stroma certification scheme online portal or via a paid certification software (e.g. ElectricalCertificates.co.uk, Tysoft, Easy Certs). EIC delivered as PDF + entered into the certification scheme database. Hard copy optional per customer / MCS company preference."
          >
            <p>EIC structure elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Customer
                  details</strong> — name + address (property + correspondence if
                different) + contact
              </li>
              <li>
                <strong className="text-white">Installer
                  details</strong> — installer name + company + competent person scheme
                + registration number + signature
              </li>
              <li>
                <strong className="text-white">Supply
                  characteristics</strong> — TN-S / TN-C-S / TT; max demand (kVA or kW);
                nominal voltage; nominal frequency; Ze (external supply impedance);
                prospective fault current at origin
              </li>
              <li>
                <strong className="text-white">Particulars of
                  installation</strong> — domestic / commercial / industrial; new install
                / addition / alteration; main switch; earthing arrangement; protective
                conductor + main earthing terminal + bonding
              </li>
              <li>
                <strong className="text-white">Schedule of
                  Inspections</strong> — comprehensive checklist per Reg 642 / Appendix 6.
                Items ticked / N/A
              </li>
              <li>
                <strong className="text-white">Schedule of Test
                  Results</strong> — per-circuit table: circuit ID + description +
                protective device + cable + R1+R2 + IR + Zs (measured + maximum
                permitted) + RCD trip-time at IΔn + at 5 × IΔn + prospective fault
                current + functional
              </li>
              <li>
                <strong className="text-white">Declaration</strong>
                — competent person’s declaration of compliance with BS 7671 + signature
                + date
              </li>
              <li>
                <strong className="text-white">Recommendations</strong>
                — next inspection (typical 10-year cycle for domestic owner-occupied;
                5-year for landlord-rented; 5-year for commercial)
              </li>
              <li>
                <strong className="text-white">Schedule of
                  Departures</strong> — if any departures from BS 7671 made (none
                expected on standard install)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — EIC + Schedule of Inspections + Schedule of Test
                Results + photographs + instrument records + customer handover docs
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase commissioning additions"
            plainEnglish="Three-phase heat pump install adds verification beyond single-phase: per-phase Zs verification at outdoor unit (L1-PE, L2-PE, L3-PE each ≤ Table 41.3); phase rotation verified BEFORE energising compressor; 4-pole RCD trip-time tested per phase individually; balanced load verification under running conditions; EREC G99 DNO completion notification (if formal application made)."
            onSite="Phase-sequence tester for rotation check (many multi-function testers include this; standalone tester also available). Phase rotation must be L1→L2→L3 clockwise for the heat pump compressor to operate correctly. Wrong rotation causes compressor fault. Verify BEFORE first energise."
          >
            <p>Three-phase commissioning sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Phase rotation
                  verification</strong> — phase-sequence tester at outdoor unit
                terminals BEFORE first energising the heat pump compressor. Confirm
                L1→L2→L3 clockwise. Wrong rotation: swap any two phases at the outdoor
                isolator + re-verify
              </li>
              <li>
                <strong className="text-white">Per-phase Zs</strong>
                — L1-PE, L2-PE, L3-PE measured separately at outdoor unit terminals.
                Each ≤ Table 41.3 for the protective device. Per-phase imbalance
                within ~10% expected (cable + supply transformer + earth-electrode
                tolerance)
              </li>
              <li>
                <strong className="text-white">4-pole RCD trip-time
                  per phase</strong> — induce fault on L1 → verify trip; reset; L2 →
                verify; reset; L3 → verify. Trip-time at 1× IΔn + at 5 × IΔn per
                phase
              </li>
              <li>
                <strong className="text-white">Balanced load
                  verification</strong> — at running steady state with compressor
                running, measure per-phase current. Should be within 10% of average
                across L1, L2, L3
              </li>
              <li>
                <strong className="text-white">Functional test</strong>
                — three-phase compressor starts smoothly; defrost cycle exercised;
                immersion functional (note typically single-phase on L1 from the
                three-phase supply); zone valves operate
              </li>
              <li>
                <strong className="text-white">EREC G99 completion
                  notification</strong> — if formal G99 application made, submit
                completion to DNO. Reference recorded in cert evidence bundle
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per-phase Zs + phase rotation + 4-pole RCD
                trip-time per phase + balanced load + functional test + DNO
                completion
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 64 — Initial verification + certification"
            clause="Initial verification of an electrical installation shall be carried out during erection of the installation, as far as is reasonably practicable, and on completion before the installation is put into service. Verification shall be carried out by competent persons. Where verification is required, the results shall be recorded in a Schedule of Inspections, a Schedule of Test Results and a Certificate."
            meaning="Chapter 64 frames the initial verification + certification requirement. For heat pump installs: verification carried out during erection (continuity testing as the install progresses) + on completion (full Reg 643 testing per circuit). By competent persons: Part P registered electrician under UK competent person scheme (NICEIC, NAPIT, Stroma, ELECSA etc.). Results recorded in Schedule of Inspections + Schedule of Test Results + EIC per BS 7671 Appendix 6 model form. Cert evidence bundle integrates all three documents + cross-references to manufacturer DoCs + instrument calibration certificates + supply DNO correspondence."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Single-phase 9 kW ASHP commissioning + handover (typical UK 2025-26 retrofit)"
            situation="9 kW Vaillant aroTHERM Plus R290. Standard retrofit pattern. Existing 100 A single-phase supply (adequate per §8.2 worked example). Dedicated 32 A circuit + immersion 16 A circuit + controls 6 A circuit + zone valves 6 A circuit. Type A RCBOs per manufacturer DoC. Commissioning day after F-Gas Cat 1 person + heating engineer complete refrigerant + hydraulic install."
            whatToDo="Commissioning sequence: (1) Pre-energise visual inspection — verify install matches design (Vaillant aroTHERM Plus R290 + Telford Tempest 200 L cylinder + Honeywell ST9420C wiring centre + Honeywell V4043 zone valve + Honeywell T6 thermostat); polarity at every accessory; conductor terminations; IP / IK at outdoor; CPC arrangement (armour-as-CPC verified via continuity from outdoor unit body through armour to CU earth); Reg 514 RCD test notice + circuit ID labels at CU. (2) Reg 643 per-circuit testing using Megger MFT1741 (calibration certificate within annual interval). Heat pump 32 A circuit: R1+R2 0.18 Ω, IR L-N 350 MΩ + L-PE 480 MΩ + N-PE 510 MΩ at 500 V DC, polarity correct, Zs at outdoor unit terminals 0.46 Ω (~68% of 0.68 Ω limit for 32 A C-curve on 230 V TN-C-S — comfortable margin), RCD trip-time at IΔn (30 mA) 28 ms, at 5 × IΔn (150 mA) 15 ms. Immersion 16 A: similar tests, all within limits. Controls 6 A + zone valve 6 A: similar tests. (3) Functional test — heat pump compressor starts smoothly; defrost cycle exercised (frost build-up simulated by manufacturer test mode); immersion exercised + thermostat cycles + over-temp cut-out tested (deliberate overheat, thermostat bypassed, cut-out trips at ~85 °C, manual reset, normal operation restored); zone valve operates; Honeywell T6 thermostat exercises wiring centre + zone valve sequence; OAT sensor reading 14 °C vs known thermometer 14.5 °C (within ±1 °C); heat pump priority logic verified (compressor primary, immersion supplemental at high demand); legionella cycle scheduled Monday 02:00 with 60-65 °C setpoint. (4) BS 7671 Appendix 6 EIC produced + Schedule of Inspections + Schedule of Test Results + competent person declaration + 10-year EICR recommendation. (5) Customer handover education: priority logic, app interface, OAT sensor location, outdoor unit clearance, defrost cycle, legionella cycle, service contact + emergency isolator location. EIC + Schedule of Inspections + Schedule of Test Results + handover documentation delivered to MCS company for handover pack. Cert evidence bundle complete."
            whyItMatters="Standard UK 2025-26 retrofit heat pump install — applies the BS 7671 Part 6 + Chapter 64 framework cleanly. Total commissioning + handover time: ~3-4 hours typical (after the install day’s wiring work). EIC + cert evidence bundle is the deliverable that unlocks the BUS grant claim + the customer’s warranty path + the future EICR baseline. Cert evidence bundle is the long-term truth — 5-10 years later the EICR engineer reads the original EIC + walks the property."
          />

          <Scenario
            title="Three-phase 16 kW ASHP commissioning + PEI Chapter 82 integration"
            situation="5-bed detached. 16 kW thermal Mitsubishi Ecodan three-phase ASHP + 300 L Mixergy smart cylinder + 4-zone heating + future 7 kW EV charger (heat-pump-ready) + future 6 kWp PV + future 5 kWh BESS. Three-phase 100 A supply (heat-pump-ready upgrade from §8.2 completed). New three-phase CU with dedicated ways for each scope."
            whatToDo="Three-phase commissioning sequence: (1) Pre-energise visual inspection — installation per design + manufacturer instructions; polarity + CPC + IP / IK + warning notices. (2) Phase rotation verification at outdoor unit — phase-sequence tester confirms L1→L2→L3 clockwise BEFORE energising compressor. (3) Reg 643 per-circuit testing (heat pump 4-pole 32 A + immersion 16 A + controls 6 A + 4 × zone valve circuits). Per-phase Zs at outdoor unit: L1-PE 0.42 Ω + L2-PE 0.45 Ω + L3-PE 0.43 Ω (each well within 0.68 Ω; per-phase imbalance within 7% — acceptable). 4-pole RCD trip-time per phase: fault on L1 trips at 32 ms; L2 at 28 ms; L3 at 30 ms (all ≤300 ms); at 5 × IΔn: L1 17 ms; L2 16 ms; L3 18 ms (all ≤40 ms). (4) Functional test — three-phase compressor starts smoothly; defrost cycle exercised; immersion (connected single-phase to L1) functional + cut-out tested; 4 zone valves exercised per zone thermostat; Mitsubishi MELCloud Wi-Fi adapter + remote controller wired in hallway; Mixergy smart cylinder app integration verified; OAT sensor reading verified vs known thermometer. (5) Heat pump priority logic exercised + verified. (6) EREC G99 DNO completion notification submitted (formal G99 was filed during supply upgrade — completion notice closes the application). (7) BS 7671 Appendix 6 EIC + Schedule of Inspections + Schedule of Test Results — three-phase variant with per-phase data + 4-pole RCBO records. Recommendations: 10-year EICR + PEI Chapter 82 integration with future EV / PV / BESS scopes. (8) Customer handover: full integrated app + MELCloud + Mixergy + future PEI scope education. Cert evidence bundle: per-phase EIC + 4-pole RCBO product + manufacturer DoCs + DNO G99 completion + Mixergy cylinder DoC + Wi-Fi integration verified."
            whyItMatters="Three-phase heat pump install with PEI integration — applies the BS 7671 framework with phase-multiplied verification + integrates into a wider Chapter 82 future-state plan. UK 2025-26 best-practice for new-build / major-refurb. Cert evidence bundle is rich + structured + supports future EV + PV + BESS scope additions. Mirrors §7.5 + §8.6 PEI integration pattern. Total commissioning + handover time: 5-7 hours typical."
          />

          <CommonMistake
            title="Skipping the cylinder over-temp cut-out functional test"
            whatHappens="Installer completes Reg 643 electrical testing + functional test of compressor + immersion under thermostat control + declares commissioning complete. Doesn’t exercise the over-temp cut-out (Reg 554.2.1 mandatory device). Months later, thermostat fails stuck-closed → immersion runs continuously → cylinder reaches dangerous temperature → either pressure relief operates OR scalding at the tap. EICR review reveals the cut-out was never tested at commissioning."
            doInstead="Reg 554.2.1 over-temp thermal cut-out functional test is mandatory at commissioning. Procedure: deliberately bypass the thermostat in controlled condition; allow cylinder to overheat; verify cut-out trips at manufacturer-declared temperature (typically 80-90 °C); reset; restore thermostat; verify normal operation. Cert evidence bundle records the test result + temperature reached + reset procedure documented for customer handover."
          />

          <CommonMistake
            title="Issuing EIC without functional test of customer-facing controls"
            whatHappens="Installer issues EIC after completing Reg 643 testing + heat pump compressor functional test. Customer-facing app + smart thermostat + tariff integration not actually exercised at commissioning. Customer tries to use app on day 1 — doesn’t work; tries thermostat — wiring error; tariff schedule not active. Return visit required; customer dissatisfied; MCS company complaints."
            doInstead="Functional test per Reg 643.10 includes the WHOLE system as installed — not just the protective devices. Exercise: heat pump compressor (start, defrost, stop); immersion + cylinder thermostat + cut-out; zone valves per zone; thermostat / smart thermostat integration; app installation + account link + setpoint change reflected at heat pump; tariff integration verified (if applicable); legionella cycle scheduled. Cert evidence bundle records functional test of EACH element. EIC issued only after complete functional verification."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Part 6 commissioning sequence: pre-energise visual inspection (Reg 642); testing per circuit (Reg 643); functional test (Reg 643.10); Schedule of Inspections + Schedule of Test Results + EIC (Chapter 64).',
              'Reg 643 testing per circuit: continuity (R1+R2), IR (≥1 MΩ at 500 V DC), polarity, ADS / Zs at furthest point ≤ Table 41.3, RCD trip-time at 1× IΔn (≤300 ms) + at 5× IΔn (≤40 ms), prospective fault current.',
              'Multi-function tester per Reg 643.1 + BS EN 61557 (Megger MFT1731 / MFT1741, Fluke 1664 FC, Kewtech KT64DL or equivalent). Type B-capable if manufacturer DoC declares Type B. Calibration annual.',
              'Per-circuit testing for each dedicated circuit: heat pump (32 A) + immersion (16 A) + controls (6 A) + zone valves (6-10 A). Reg 314 division of installation pattern.',
              'Three-phase commissioning adds: phase rotation verified BEFORE energising; per-phase Zs at outdoor unit; 4-pole RCD trip-time per phase; balanced load verification.',
              'Reg 554.2.1 cylinder over-temp cut-out functional test mandatory: deliberate overheat with thermostat bypassed; verify cut-out trips; reset; restore.',
              'EIC per BS 7671 Appendix 6: customer + installer + supply characteristics + Schedule of Inspections + Schedule of Test Results + competent person declaration + signature + date + recommendations.',
              'Customer handover education: priority logic, app, OAT sensor location, outdoor unit clearance, defrost cycle, legionella cycle, service contact, emergency isolator.',
              'MCS handover pack integrates: MCS sizing + product details + F-Gas record + commissioning report + EIC + customer handover documentation + DNO correspondence.',
              'EICR cycle: 10-year typical for owner-occupied domestic; 5-year for landlord-rented (PRS Regs 2020); 5-year for commercial. Heat-pump-specific items: per-circuit RCD trip-time check + Type B verification + cut-out functional test + weather compensation curve + legionella cycle.',
              'Cert evidence bundle structure: design + supply assessment + electrical install + F-Gas + MCS handover + customer documentation + service / EICR schedule. UK 2025-26 mature practice: shared digital workspace.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-7')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Controls + electrical interface
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-8')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module overview <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 8 complete
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
