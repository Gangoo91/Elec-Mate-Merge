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
    id: 'm3s6-551-7-1d',
    question:
      'BS 7671 Reg 551.7.1(d) (NEW in A4:2026) sets a source-connection rule for PV / generation. What does it require?',
    options: [
      'No rule applies',
      'The generating source (PV inverter, BESS inverter) must NOT be connected on the load side of an RCD that protects the rest of the installation. The source-side RCD would see the generator current as residual current under fault conditions and trip — disconnecting the generator from its own protective device. The source needs a dedicated RCBO (RCD + MCB) on its own circuit, NOT downstream of the existing CU RCD',
      'Always use the same RCD',
      'No RCD anywhere',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.7.1(d) was added in A4:2026 to address a real install failure mode: when the PV / BESS inverter is connected on the load side of an existing RCD (typically the CU\'s main RCD or a 30 mA RCD protecting downstream circuits), the inverter\'s contribution to fault current is seen by the RCD as residual current — tripping the RCD and disconnecting the inverter from its own intended protection. The fix: dedicated RCBO for the inverter circuit, NOT downstream of an existing RCD. The cert evidence bundle records the circuit arrangement.',
  },
  {
    id: 'm3s6-rcd-type',
    question:
      'BS 7671 Reg 712.531.3.5.1 specifies the RCD type for the PV AC supply circuit. What\'s the default, and what are the permitted exceptions?',
    options: [
      'Type AC always',
      'Default: Type B RCD per BS EN 62423 or BS EN 60947-2. Three permitted exceptions allow a different type: (a) the inverter provides at least simple separation between AC and DC sides; (b) the installation provides at least simple separation between inverter and RCD by separate transformer windings; (c) the inverter does not require a Type B RCD as stated by the manufacturer. NOTE 1 to the reg cross-refs Reg 531.3.3 (the general rule restricting Type AC to fixed equipment with no DC components in the load current). NOTE 2 recommends installation methods that don\'t require additional RCD protection at all',
      'Type AC only — no Type B',
      'No RCD needed',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.531.3.5.1 is the PV-specific RCD-type rule. Default: Type B RCD per BS EN 62423 or BS EN 60947-2 — handles both AC and DC residual current. Modern transformerless inverters can leak DC residual current onto the AC side under fault conditions; Type AC RCDs are blinded by DC and fail to operate. Three permitted exceptions: (a) inverter provides simple separation between AC and DC; (b) installation provides simple separation by transformer windings between inverter and RCD; (c) inverter manufacturer states a Type B RCD is not required. The reg cross-refs Reg 531.3.3 (general rule restricting Type AC). The cert evidence bundle records the manufacturer evidence supporting any exception.',
  },
  {
    id: 'm3s6-ac-cable',
    question:
      'PV inverter AC output cable sizing per Reg 712.433.104 — what\'s the inverter design current?',
    options: [
      'Same as DC',
      'Per Reg 712.433.104: the inverter design current is either the maximum AC current given by the inverter manufacturer or, if not available, 1.1 times its rated AC current. The OCPD rated current is set against this design current; cable I_z must be ≥ OCPD rated current at installed conditions. Sizing also accounts for voltage drop (typically 1-3% of nominal AC) and BS 7671 Appendix 4 corrections for grouping / ambient / reference method',
      'Customer\'s budget',
      'Half the DC current',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.433.104: the AC supply cable OCPD rated current is defined against the inverter design current = max AC current from manufacturer datasheet OR 1.1 × rated AC current if not specified. For a 5 kW inverter on 230 V AC: rated AC = ~21.7 A; if no max AC stated, design current = 1.1 × 21.7 = ~23.9 A; OCPD typically 25 A. Cable I_z must be ≥ 25 A at installed conditions. Plus voltage-drop check (typically 1-3% of nominal AC). Plus BS 7671 Appendix 4 corrections.',
  },
  {
    id: 'm3s6-spd',
    question:
      'AC-side SPD selection for a typical UK residential PV install. What\'s the standard spec and location?',
    options: [
      'No SPD on AC',
      'Type-2 (Class II) SPD per BS EN 61643-11. Located at the consumer unit (covers the inverter AC circuit and the rest of the CU) OR at the inverter AC output (covers the inverter AC stage specifically). Spec: In = 5-20 kA, Imax = 20-40 kA, Up coordinated with inverter and downstream equipment. Sacrificial — replace after a strike event',
      'High-voltage SPD only',
      'No protection needed',
    ],
    correctIndex: 1,
    explanation:
      'AC-side SPD spec for typical UK residential PV: BS EN 61643-11 Type-2 (Class II). Location options: (a) at the consumer unit — covers the inverter AC circuit and provides surge protection for the rest of the installation; (b) at the inverter AC output — covers the inverter AC stage specifically. Both are valid; (a) is more common in modern CU-based protection schemes; some installs use both for layered protection. Spec: In = 5-20 kA, Imax = 20-40 kA, Up coordinated with the inverter AC input rating and downstream equipment.',
  },
  {
    id: 'm3s6-g98',
    question:
      'EREC G98 (≤16 A single-phase or ≤16 A per phase three-phase) — what\'s the DNO process for connecting a small generating unit?',
    options: [
      'No DNO contact needed',
      'Fit-and-notify: install the unit, then notify the DNO within 28 days of commissioning. The notification includes the G98 form (commissioning details, generator type, capacity, MCS cert reference). DNO can object if local network constraints make the connection problematic — rarely happens for typical sub-4 kWp PV. EREC G98 is part of the Distribution Code; current edition is G98 Issue 1 Amendment 8 (or successor) per the ENA',
      'Wait 5 years for permission',
      'Connect and never inform DNO',
    ],
    correctIndex: 1,
    explanation:
      'EREC G98 governs the connection of small generating units (≤16 A single-phase, ≤16 A per phase three-phase) to the public distribution network. The "fit-and-notify" process: install the unit, then submit the G98 notification to the DNO within 28 days of commissioning. The DNO can object if the local network is constrained, but for typical sub-4 kWp residential PV this rarely happens. The notification includes commissioning details, generator type and capacity, the MCS certificate reference, and the installation address.',
  },
  {
    id: 'm3s6-g99',
    question:
      'EREC G99 (>16 A single-phase) — what\'s the DNO process for connecting a larger generating unit?',
    options: [
      'Same as G98',
      'Apply-and-wait: submit the G99 application to the DNO BEFORE installation. DNO assesses local network impact, may approve / approve with conditions (e.g. export limitation) / reject. Typical assessment timescale: 4-8 weeks. After install and commissioning, the G99 commissioning notification is submitted. EREC G99 is part of the Distribution Code; current edition tracks ENA publication',
      'Wait 100 years',
      'No process exists',
    ],
    correctIndex: 1,
    explanation:
      'EREC G99 governs the connection of larger generating units (>16 A single-phase) to the public distribution network. The "apply-and-wait" process: submit the G99 application to the DNO BEFORE installation. The DNO assesses local network impact (voltage rise, thermal capacity, protection coordination, harmonic injection), and may approve / approve with conditions (often export limitation per G100) / reject. Typical assessment timescale 4-8 weeks. After install and commissioning, the G99 commissioning notification is submitted. The G99 application typically includes the proposed install design, modelling, and the MCS-certified contractor reference.',
  },
  {
    id: 'm3s6-g100',
    question:
      'EREC G100 — export limitation. What is it and when does it apply?',
    options: [
      'Customer\'s choice only',
      'EREC G100 is the export-limitation standard. The PV install\'s AC output capacity exceeds the EREC G98 threshold (>16 A single-phase) but the install is configured to LIMIT export to or below a DNO-approved threshold, keeping the install within the G98 fit-and-notify regime (or within a G99-approved export limit). The export-limitation is implemented by the inverter\'s built-in export control or by a separate export-control device measuring grid-export current and modulating inverter output',
      'No such thing',
      'Customer dies if exceeded',
    ],
    correctIndex: 1,
    explanation:
      'EREC G100 covers export-limited installs — the PV install capacity (kWp) exceeds the EREC G98 16 A single-phase threshold, but the export is limited to or below an approved threshold by the inverter\'s export control or a separate export-control device. Two main use cases: (a) install installer wants to remain under EREC G98 (avoid the G99 application delay) — limit export to ≤ 16 A AC; (b) DNO approved a G99 application with export-limitation condition — the install must limit export to the approved threshold. The export-control device measures grid-export current and modulates inverter output. EREC G100 specifies the requirements for the export-control device and the verification testing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 5 kW PV inverter on a UK single-phase domestic supply. Rated AC current = 5,000 / 230 = ~21.7 A. What\'s the correct AC-side OCPD?',
    options: [
      'No protection',
      'A dedicated RCBO (RCD + MCB) on a dedicated circuit from the consumer unit, sized to coordinate with the inverter AC current and cable I_z. Typical: 25 A RCBO, Type B RCD per Reg 712.531.3.5.1 (BS EN 62423 or BS EN 60947-2) unless one of the three exceptions applies, on 4 mm² or 6 mm² T&E cable depending on route length. NOT downstream of the existing CU main RCD (Reg 551.7.1(d) new in A4:2026)',
      'Always 100 A',
      '1 A fuse',
    ],
    correctAnswer: 1,
    explanation:
      'AC-side OCPD for a 5 kW inverter: dedicated RCBO on a dedicated circuit. 25 A RCBO is typical — accommodates inverter overload to ~110% rated. Type B RCD per Reg 712.531.3.5.1 (BS EN 62423 or BS EN 60947-2) unless one of the three exceptions applies (inverter simple separation, transformer-winding separation, manufacturer declares Type B not required). Cable size 4 mm² (short routes) or 6 mm² (longer routes) sized for I_z ≥ 25 A at installed conditions. Critical: the RCBO goes on the CU bus, NOT downstream of the existing CU main RCD (Reg 551.7.1(d) new in A4:2026). The cert evidence bundle records the design.',
  },
  {
    id: 2,
    question:
      'PV install plan: connect the inverter AC output to a spare way on the consumer unit, downstream of the CU\'s main 30 mA RCD. Is this acceptable in A4:2026?',
    options: [
      'Yes — always acceptable',
      'NOT acceptable per Reg 551.7.1(d) (new in A4:2026). Connecting the inverter on the load side of the CU\'s main RCD creates a problem: under fault conditions, the inverter\'s contribution to fault current is seen by the RCD as residual current — tripping the RCD and disconnecting the inverter from its own protective device. Solution: install a dedicated RCBO on its own way on the CU bus (NOT downstream of the main RCD), or substitute the consumer unit with a split-load design that provides a dedicated source connection',
      'Customer\'s choice',
      'Always required',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 551.7.1(d) (new in A4:2026) prohibits connecting a generating source (PV / BESS inverter) on the load side of an RCD that protects the rest of the installation. The failure mode: under earth fault on the generator side, the inverter\'s contribution to fault current flows through the source-side RCD as residual current, tripping it. The fix: dedicated RCBO on the CU bus (NOT downstream of the main RCD), or split-load CU design providing a dedicated source connection.',
  },
  {
    id: 3,
    question:
      'A customer has a Hager / MK / Wylex CU with a single main 30 mA RCD protecting all 6 ways. PV install proposed. What\'s the design response per A4:2026?',
    options: [
      'Just plug it in',
      'Modify the CU arrangement to provide a dedicated source connection for the PV inverter NOT downstream of the main RCD. Options: (a) substitute the CU for a split-load design (one main RCD on existing ways + dedicated RCBO direct from busbar for PV); (b) substitute the CU for a fully-RCBO design (each circuit has its own RCBO; PV gets its own); (c) install a separate distribution unit / sub-board for the PV connection. The MCS MIS 3002 design pack records the chosen design and the Reg 551.7.1(d) compliance evidence',
      'Ignore A4:2026',
      'No design change needed',
    ],
    correctAnswer: 1,
    explanation:
      'The single-RCD CU is the most common UK domestic CU type pre-A4:2026. After A4:2026, PV connection to this CU triggers Reg 551.7.1(d) — the inverter can\'t be on the load side of the main RCD. Three design options: (a) substitute CU for split-load (cost £150-£300 + installation labour); (b) substitute CU for all-RCBO design (cost £200-£400 + installation labour); (c) install a separate distribution unit / sub-board with a dedicated incoming feed before the main RCD. The MCS MIS 3002 design pack records the chosen approach.',
  },
  {
    id: 4,
    question:
      'A modern transformerless PV inverter datasheet states: "Inverter provides simple separation between AC and DC sides per BS EN 62109-2". Customer asks about RCD type per Reg 712.531.3.5.1.',
    options: [
      'Always Type B',
      'Reg 712.531.3.5.1 exception (a) applies — inverter provides simple separation between AC and DC sides. A Type B RCD is NOT required; a different type may be used per the manufacturer\'s evidence. The cert evidence bundle records the manufacturer datasheet extract as the design justification. This is one of three exceptions (other two: separate transformer windings between inverter and RCD; manufacturer declares Type B RCD not required)',
      'No RCD at all',
      'Type B only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 712.531.3.5.1 default is Type B but allows three exceptions: (a) the inverter itself provides simple separation between AC and DC; (b) separate transformer windings provide separation between inverter and RCD; (c) the inverter manufacturer states a Type B RCD is not required. Where ANY of these apply with manufacturer evidence, a different RCD type may be selected per the manufacturer\'s instructions. The general rule Reg 531.3.3 still applies — Type AC only where the load current is known to contain no DC components.',
  },
  {
    id: 5,
    question:
      'Customer\'s PV install design has 6 kWp on a single-phase 100 A supply. Inverter rated AC = 5 kW (~21.7 A). Above EREC G98 16 A threshold. Options?',
    options: [
      'Just install',
      'Three options: (a) limit the inverter\'s AC output to ≤16 A by inverter configuration or external export-limitation device per EREC G100 — keeps the install under G98 (fit-and-notify); (b) submit EREC G99 application to the DNO before install — wait 4-8 weeks for assessment; (c) reduce the PV kWp to fit within G98 by selecting a smaller inverter (3.68 kW = 16 A AC). The customer\'s preference, install timeline, and DNO acceptance set the choice. The cert evidence bundle records the chosen path and the DNO confirmation',
      'No options',
      'Use 3-phase only',
    ],
    correctAnswer: 1,
    explanation:
      'For a 5 kW inverter (~21.7 A AC) on single-phase, above EREC G98 16 A threshold, three options: (a) export-limitation per EREC G100 — limit inverter AC output to ≤16 A by configuration or external device, keeping the install under G98 fit-and-notify; (b) EREC G99 application — apply to DNO, wait 4-8 weeks for assessment; (c) reduce kWp to fit within G98 by using a 3.68 kW inverter (16 A AC). The customer\'s preference (install speed vs full export capacity), the DNO\'s likely response, and the financial case set the choice. The MCS MIS 3002 design pack records the path.',
  },
  {
    id: 6,
    question:
      'PV install commissioning. The dedicated PV RCBO trips on first inverter start-up. Diagnosis?',
    options: [
      'Install failed',
      'Common causes: (a) wrong RCD type (Type AC fitted where Type B required per Reg 712.531.3.5.1 — DC residual current trips the AC RCD instantly on inverter start); (b) earth fault on the inverter AC side (wiring fault, terminations); (c) RCD trip threshold mismatched to inverter leakage spec. Diagnose: check RCD type vs manufacturer spec; insulation-test the AC cable; check terminations; verify RCD coordination with inverter leakage rating',
      'Always normal',
      'Inverter is broken',
    ],
    correctAnswer: 1,
    explanation:
      'PV RCBO trip on first start-up is most commonly: (a) wrong RCD type for the inverter (Type AC on a transformerless inverter that produces DC residual — Reg 712.531.3.5.1 violation); (b) earth fault in the AC wiring; (c) RCD coordination issue. The diagnosis: read the inverter datasheet for the required RCD type (Type B unless one of the three exceptions applies); verify the installed RCD type matches; insulation-test the AC cable; check terminations. The cert evidence bundle records the RCD type, the design justification, and the commissioning result.',
  },
  {
    id: 7,
    question:
      'EREC G99 application response: DNO approves with export-limitation condition limiting export to 11 kW (single-phase three-phase at 16 A per phase). What does the installer do?',
    options: [
      'Ignore the limit',
      'Implement EREC G100 export limitation. The inverter (or external export-control device) limits exported AC current to ≤16 A per phase, summed to 11 kW max. The limitation is verified at commissioning per EREC G100 test procedure (simulate over-export conditions, confirm the limit holds). The cert evidence bundle records the export limit, the implementation method, the verification test result, and the DNO G99 approval document',
      'Install bigger inverter',
      'No action',
    ],
    correctAnswer: 1,
    explanation:
      'EREC G99 approval with export-limitation condition triggers EREC G100 compliance. The export-control device (inverter built-in or external) limits exported AC current to the DNO-approved threshold. EREC G100 specifies the requirements for the export-control device: (a) measurement accuracy; (b) response time; (c) failure mode (default to limit-active on device failure); (d) verification testing at commissioning. The cert evidence bundle records: export limit, implementation method, EREC G100 verification test result, and DNO G99 approval document.',
  },
  {
    id: 8,
    question:
      'The PWI common-mistakes list flags four high-frequency AC-side faults on UK PV installs in 2025-2026. What are they?',
    options: [
      'None',
      '(1) PV inverter circuit on the load side of the existing CU main RCD (Reg 551.7.1(d) violation, new in A4:2026); (2) Wrong RCD type — Type AC where Type B required per Reg 712.531.3.5.1 (without permitted exception); (3) AC SPD missing or wrong type; (4) EREC G98 / G99 process skipped (no DNO notification). Each is a regulatory / safety concern and a high-frequency MCS audit finding',
      'Customer satisfaction',
      'Module colour',
    ],
    correctAnswer: 1,
    explanation:
      'PWI common-mistakes on UK PV AC side in 2025-2026: (1) Reg 551.7.1(d) violation — PV inverter on load side of CU main RCD (A4:2026 NEW); (2) Wrong RCD type — Type AC where Type B required per Reg 712.531.3.5.1; (3) AC SPD missing / wrong type per BS EN 61643-11; (4) EREC G98 / G99 process skipped — no DNO notification. Each is a regulatory / safety concern and a high-frequency MCS audit finding. The competent installer addresses all four at design stage by reading A4:2026 + Reg 712.531.3.5.1 + BS EN 61643-11 + EREC G98 / G99 / G100.',
  },
];

const faqs = [
  {
    question: 'What\'s the new Reg 551.7.1(d) in A4:2026 — and why was it added?',
    answer:
      'Reg 551.7.1(d) (NEW in A4:2026) prohibits connecting a generating source (PV inverter, BESS inverter, generator) on the LOAD SIDE of an RCD that protects the rest of the installation. The failure mode it addresses: when the generator is downstream of the main RCD, the generator\'s contribution to fault current is seen by the RCD as residual current — tripping the RCD and disconnecting the generator from its own intended protection. Real-world: a fire/safety incident pattern emerged in 2022-2024 with PV / BESS installs on existing single-RCD CUs; A4:2026 codified the fix. The regulation effectively forces split-load or all-RCBO consumer-unit designs for new PV / BESS installs, or a dedicated sub-board / distribution-unit arrangement.',
  },
  {
    question: 'Does Reg 551.7.1(d) apply retroactively to existing PV installs?',
    answer:
      'No — Reg 551.7.1(d) applies to new installs / additions / alterations from A4:2026 effective date (15 April 2026). Existing PV installs comply with the regs in force at their install date; not flagged retroactively. However, EICR-style periodic inspection MAY flag the arrangement as a "Code C2 — Potentially Dangerous" finding where the install is on a single-RCD CU and the inverter circuit is downstream — at the inspector\'s judgement. Customer informed; remediation recommended at next CU upgrade.',
  },
  {
    question: 'How do I tell if an inverter is "transformerless" or "transformer-isolated"?',
    answer:
      'Read the inverter datasheet. Specific terms: "transformerless" (no galvanic isolation, modern UK domestic standard, 96-98% Euro efficiency) vs "transformer-isolated" or "with galvanic isolation" or "with isolation transformer" (transformer between DC and AC stages, slightly lower efficiency, heavier). Most major modern brands (SolarEdge, Enphase, GoodWe, Huawei Solar, Sungrow, Solis, GivEnergy, Tesla Powerwall + PV portfolio) are transformerless. Some older brands and some specialised commercial inverters are transformer-isolated. The datasheet\'s "topology" section is the source of truth.',
  },
  {
    question: 'What\'s the practical implementation of EREC G100 export limitation?',
    answer:
      'EREC G100 export limitation is implemented in one of two ways: (a) inverter built-in export control — the inverter has a current sensor (CT clamp) on the grid connection and modulates its output to limit export below the configured threshold; (b) external export-control device — a separate unit with grid CT measurement and a signal connection to the inverter, instructing the inverter to limit output. Both are valid; (a) is more common on modern brands; (b) is used where the existing inverter doesn\'t support built-in export control. EREC G100 specifies measurement accuracy, response time, failure mode, and verification testing at commissioning.',
  },
  {
    question: 'Does the inverter need its own dedicated AC isolator?',
    answer:
      'BS 7671 Section 712 requires an AC isolator between the inverter and the consumer unit / grid connection. Common implementations: (a) the dedicated RCBO at the CU is the isolator (RCBO has an off / locked position) — most common for residential; (b) a separate AC isolator switch adjacent to the inverter — additional safety / maintenance convenience for installs where the inverter is remote from the CU. Either is acceptable. The isolator must be: rated for the inverter AC current; suitable for AC switching under load; accessible without tools; labelled per Section 8 (the integrated read).',
  },
  {
    question: 'How does the EREC G98 fit-and-notify form work in practice?',
    answer:
      'EREC G98 fit-and-notify: after the PV install is commissioned, the MCS-certified contractor submits the G98 notification to the relevant DNO (the regional licensee — UK Power Networks, Northern Powergrid, National Grid Electricity Distribution, SSE, ScottishPower Energy Networks, etc.). The notification is typically a web form on the DNO\'s portal. Required information: installation address, MPAN (meter point administration number), generator type (PV), capacity (kWp), inverter manufacturer and model, MCS certificate number, commissioning date. DNO confirms receipt within typically 5-10 working days; rarely objects.',
  },
  {
    question: 'What if the customer\'s supply is already heavily loaded — is the PV install still viable?',
    answer:
      'Supply loading is a DNO assessment factor under EREC G99 (and rarely under G98). A heavily-loaded supply (existing EV charger, heat pump, large appliances) may push the supply close to its rated capacity. PV install adds bi-directional flow (export during high irradiance, import during evening / night). DNO may: (a) approve under G98 / G99 with no conditions if local network supports the bi-directional flow; (b) approve with conditions (export limitation, voltage limits); (c) require supply upgrade (more expensive). The DNO application / notification triggers the assessment.',
  },
  {
    question: 'How does the IET CoP for Grid-Connected Solar PV Installations cover the AC side?',
    answer:
      'The IET CoP (5th edition) covers AC-side design in detail: cable sizing, voltage drop, BS 7671 Appendix 4 corrections, RCD type per Reg 712.531.3.5.1 (and the general Reg 531.3.3), isolator selection, SPD per BS EN 61643-11, and EREC G98 / G99 / G100 workflow. A4:2026 update will see the CoP\'s next edition reflect the new Reg 551.7.1(d) requirement. The MCS MIS 3002 design pack typically references the IET CoP as the operational source for AC-side design.',
  },
  {
    question: 'How does TN-C-S (PNB) update in A4:2026 affect the PV AC side?',
    answer:
      'A4:2026 updated the UK PME / TN-C-S terminology to "TN-C-S (PNB)" — Protective Neutral Bonded. The earthing arrangement is unchanged in principle (combined PE+N from the supply, separated in the consumer\'s installation, bonded). For PV: the inverter\'s AC output connects to the CU and integrates with the property\'s TN-C-S (PNB) earthing in the standard way — no special handling vs pre-A4:2026 installs. The cert evidence bundle records the supply earthing type and the integration.',
  },
];

export default function RenewableEnergyModule3Section6() {
  const navigate = useNavigate();

  useSEO({
    title:
      'AC-side design & DNO export sign-off | Renewable Energy 3.6 | Elec-Mate',
    description:
      'PV AC-side design — cable sizing per Reg 712.433.104, Reg 551.7.1(d) new A4:2026 source-connection rule, Reg 712.531.3.5.1 RCD type, AC SPDs per BS EN 61643-11, AC isolators, and the EREC G98 / G99 / G100 DNO application workflow.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · BS 7671:2018+A4:2026"
            title="AC-side design & DNO export sign-off"
            description="The PV AC side — cable sizing per Reg 712.433.104, Reg 551.7.1(d) new A4:2026 source-connection rule, Reg 712.531.3.5.1 RCD type per inverter topology, AC SPDs per BS EN 61643-11, AC isolators, and the EREC G98 / G99 / G100 DNO application workflow."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 551.7.1(d) (NEW in A4:2026) — PV / BESS inverter must NOT be connected on the load side of an RCD protecting the rest of the installation. Forces dedicated RCBO on CU bus (not downstream of main RCD), or split-load / all-RCBO CU, or separate sub-board.',
              'Reg 712.531.3.5.1 — RCD type for the PV AC supply circuit: default Type B per BS EN 62423 or BS EN 60947-2. Three permitted exceptions: (a) inverter provides simple separation between AC and DC; (b) separate transformer windings between inverter and RCD; (c) inverter manufacturer states a Type B RCD is not required. Reg 531.3.3 is the cross-referenced general rule (Type AC only where load current contains no DC components).',
              'AC cable sized for I_z ≥ inverter rated AC output current. Voltage drop typically 1-3% of nominal AC. Coordinate with RCBO / OCPD characteristic (typically 25 A RCBO for a 5 kW inverter).',
              'Inverter AC isolator: dedicated RCBO at CU is typical implementation; separate isolator switch adjacent to inverter for remote-mounted installs. Rated for inverter AC current; suitable for AC switching under load; accessible without tools.',
              'AC SPD per BS EN 61643-11 — Type-2 (Class II) typical UK residential. Located at CU or at inverter AC output. Sacrificial — replace after a strike event.',
              'EREC G98 (≤16 A single-phase): fit-and-notify within 28 days. EREC G99 (>16 A): apply-and-wait; 4-8 weeks DNO assessment. EREC G100: export limitation, used to stay under G98 threshold or to comply with G99 condition.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 551.7.1(d) (new in A4:2026) — design the AC connection so the inverter is NOT on the load side of an existing RCD.',
              'Select RCD type per Reg 712.531.3.5.1 — Type B default per BS EN 62423 or BS EN 60947-2, or a different type where one of the three permitted exceptions applies with manufacturer evidence.',
              'Size AC cable against inverter rated AC current with BS 7671 Appendix 4 corrections; calculate voltage drop and confirm within 1-3% target.',
              'Specify AC SPD per BS EN 61643-11 (Type-2 typical UK residential); coordinate with DC SPDs and any existing LPS.',
              'Apply the EREC G98 fit-and-notify process for installs ≤16 A single-phase; submit notification within 28 days of commissioning.',
              'Run the EREC G99 apply-and-wait process for installs >16 A single-phase; understand DNO assessment criteria, timescales, and possible export-limitation conditions per EREC G100.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Dedicated RCBO. Type B RCD by default. EREC G98 fit-and-notify, G99 apply-and-wait, G100 limits.</Pullquote>

          <ContentEyebrow>Reg 551.7.1(d) — NEW in A4:2026</ContentEyebrow>

          <ConceptBlock
            title="The source-connection rule — why A4:2026 added it"
            plainEnglish="A4:2026 added Reg 551.7.1(d): the generating source (PV inverter, BESS inverter, generator) must NOT be connected on the load side of an RCD that protects the rest of the installation. This addresses a real install failure mode that emerged in 2022-2024."
            onSite="The failure mode: PV inverter connected to a spare way on a single-RCD CU. The CU\'s main 30 mA RCD is upstream of the PV circuit. Under earth fault conditions on the PV side, the inverter\'s contribution to fault current flows through the upstream RCD as residual current — tripping the RCD and disconnecting the inverter from its own intended protection. Combined with the inverter\'s continued operation during the RCD trip, this creates safety hazards documented in fire-safety reports."
          >
            <p>The Reg 551.7.1(d) implementation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Dedicated RCBO on CU bus</strong> — the PV inverter goes on its own RCBO, connected directly to the CU busbar BEFORE the main RCD. Most common A4:2026-compliant arrangement</li>
              <li><strong className="text-white">Split-load CU</strong> — CU is split into two sections, each with its own main RCD; PV connects to one section, the rest of the installation to the other. Slightly older arrangement; valid</li>
              <li><strong className="text-white">All-RCBO CU</strong> — every circuit has its own RCBO; no shared main RCD. PV gets its own RCBO like every other circuit. Modern preferred design</li>
              <li><strong className="text-white">Separate distribution unit / sub-board</strong> — PV connects to a dedicated sub-board with its own incoming feed before the main CU RCD. Used where CU substitution isn\'t practical</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.1(d) — source connection (NEW in A4:2026)"
            clause="The connection of the source to the installation shall not be on the load side of a residual current device (RCD) protecting other parts of the installation. Where required, a dedicated RCD with appropriate characteristics shall be installed for the source connection on its own circuit."
            meaning="Reg 551.7.1(d) is a NEW A4:2026 regulation addressing the source-side RCD failure mode. The fix: dedicated RCBO for the inverter circuit, NOT downstream of an existing protective RCD. For installs on existing single-RCD CUs, this often triggers a CU substitution (split-load or all-RCBO) or a separate sub-board. The cert evidence bundle records the CU arrangement and the Reg 551.7.1(d) compliance evidence."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Reg 712.531.3.5.1 — RCD type for the PV AC supply circuit</ContentEyebrow>

          <Pullquote>Type B default per BS EN 62423 / 60947-2. Three permitted exceptions, manufacturer-evidenced.</Pullquote>

          <ConceptBlock
            title="Why Type B by default — DC residual current"
            plainEnglish="Transformerless PV inverters (modern UK domestic standard) can leak DC residual current onto the AC side under fault conditions. Type AC RCDs are blinded by DC — they don\'t see the DC component and fail to operate. Type B RCDs handle both AC and DC residual current."
            onSite="The default RCD type for a PV AC supply circuit is Type B per Reg 712.531.3.5.1 (BS EN 62423 or BS EN 60947-2). Type B RCDs are more expensive than Type AC (typically £80-£150 vs £20-£40). The three permitted exceptions allow a different RCD type where the inverter design or installation arrangement guarantees DC fault current can\'t reach the RCD."
          >
            <p>The three permitted exceptions in Reg 712.531.3.5.1:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Exception (a) — inverter provides simple separation between AC and DC sides</strong>. The inverter datasheet states this (typically per BS EN 62109-2). Cert evidence bundle records the datasheet extract</li>
              <li><strong className="text-white">Exception (b) — separate transformer windings between inverter and RCD</strong>: the installation includes a transformer with electrically separate windings between the inverter and the RCD, providing simple separation. Galvanically-isolated inverters with internal transformers also satisfy this. Cert evidence records the inverter / installation arrangement</li>
              <li><strong className="text-white">Exception (c) — inverter manufacturer states a Type B RCD is not required</strong>. The manufacturer\'s documented declaration is the evidence. Cert evidence bundle records the declaration</li>
            </ul>
            <p>
              Where ANY of the three exceptions apply with documented manufacturer
              evidence, a different RCD type may be selected per the manufacturer\'s
              instructions. NOTE 1 to the reg cross-refs Reg 531.3.3 (general rule:
              Type AC only where load current contains no DC components). NOTE 2
              recommends installation methods that don\'t require additional RCD
              protection at all (e.g. installs with Class II equipment throughout).
              Without any exception evidence, Type B required.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.531.3.5.1 — Residual Current Devices"
            clause="Where an RCD is used for protection of the PV AC supply circuit, the RCD shall be of Type B according to BS EN 62423 or BS EN 60947-2, unless: (a) the inverter provides at least simple separation between the AC side and the DC side; or (b) the installation provides at least simple separation between the inverter and the RCD by means of separate windings of a transformer; or (c) the inverter does not require a Type B RCD as stated by the manufacturer of the inverter. NOTE 1: In some circumstances other types of RCD may need to be selected taking account of manufacturer\'s instructions. See also Regulation 531.3.3. NOTE 2: Installation methods that do not require additional protection by use of an RCD are recommended."
            meaning="Reg 712.531.3.5.1 default is Type B (BS EN 62423 or BS EN 60947-2) for the PV AC supply circuit. Three exceptions allow a different RCD type where evidenced by inverter / installation arrangement. The cross-referenced general rule (Reg 531.3.3) restricts Type AC to fixed equipment where the load current is known to contain no DC components. Cert evidence bundle records the manufacturer evidence supporting any exception applied."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>AC cable sizing — I_z, voltage drop, OCPD coordination</ContentEyebrow>

          <Pullquote>I_z ≥ inverter rated AC. VD target 1-3%. Coordinate with RCBO characteristic.</Pullquote>

          <ConceptBlock
            title="AC cable sizing workflow per Reg 712.433.104"
            plainEnglish="Reg 712.433.104 defines the inverter design current = max AC current from manufacturer datasheet, OR 1.1 × rated AC current if not specified. The OCPD rated current sits above this design current; cable I_z sits at or above the OCPD rating at installed conditions."
            onSite="For a 5 kW inverter on 230 V AC: rated AC = ~21.7 A; if no max AC stated, design current = 1.1 × 21.7 = ~23.9 A; RCBO 25 A; cable I_z ≥ 25 A at installed conditions; 4 mm² T&E typically sufficient for short routes (under 15 m), 6 mm² for longer routes. The MCS MIS 3002 design pack records the calculation."
          >
            <p>AC cable sizing checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Inverter design current per Reg 712.433.104</strong> — max AC current from manufacturer datasheet OR 1.1 × rated AC if not specified</li>
              <li><strong className="text-white">RCBO rating</strong> — sized at or above inverter design current and below cable I_z. Typical 25 A for 5 kW inverter, 32 A for 7-8 kW</li>
              <li><strong className="text-white">Cable I_z</strong> — at installed conditions per BS 7671 Appendix 4. I_z (installed) = I_z (reference) × C_g × C_a × C_i (grouping × ambient × insulation correction)</li>
              <li><strong className="text-white">Voltage drop</strong> — 2 × L × R × I for single-phase. Target 1-3% of nominal AC (230 V). Cable upsized if VD exceeds limit</li>
              <li><strong className="text-white">Cable type</strong> — standard 6491X or equivalent for AC; T&E for short runs; SWA for outdoor / buried routes</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.433.104 — Protection of PV AC supply cable"
            clause="When defining the rated current of the overcurrent protective device for the AC supply cable, the design current of the inverter shall be taken into account. The inverter design current is either the maximum AC current given by the inverter manufacturer or, if not available, 1.1 times its rated AC current."
            meaning="Reg 712.433.104 defines the AC supply cable OCPD rated current basis. Use the max AC current from the manufacturer datasheet where stated; otherwise 1.1 × rated AC current. The 1.1 multiplier accounts for permitted inverter overload. The MCS MIS 3002 design pack records the calculation; the cert evidence bundle archives the manufacturer datasheet extract."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>AC SPDs per BS EN 61643-11</ContentEyebrow>

          <Pullquote>Type-2 SPD at CU. Sacrificial. Replace after a strike event.</Pullquote>

          <ConceptBlock
            title="AC SPD specification and placement"
            plainEnglish="AC SPD per BS EN 61643-11 protects against induced voltage spikes from nearby lightning strikes. Typical UK residential: Type-2 (Class II) SPD at the consumer unit or at the inverter AC output."
            onSite="The AC SPD is sacrificial — it takes the spike, fails short, and needs replacing after a strike event. Status indicator (window or flag) shows whether the SPD has operated. Routine visual inspection at the 5-yearly customer service."
          >
            <p>AC SPD selection criteria:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Standard reference</strong> — BS EN 61643-11. Type-2 (Class II) for typical UK residential without external LPS. Type-1 + Type-2 multi-zone for installs with external LPS per BS EN 62305</li>
              <li><strong className="text-white">Nominal discharge current In</strong> — 5-20 kA for Type-2 (8/20 µs waveform)</li>
              <li><strong className="text-white">Maximum discharge current Imax</strong> — 20-40 kA for Type-2</li>
              <li><strong className="text-white">Voltage protection level Up</strong> — coordinated with the inverter AC input rating and downstream equipment; typically ≤1.5 kV for 230 V AC installs</li>
              <li><strong className="text-white">Location</strong> — at the consumer unit (covers the inverter AC circuit and the rest of the CU) OR at the inverter AC output (covers the inverter AC stage specifically). Modern installs often have both for layered protection</li>
              <li><strong className="text-white">Indicator</strong> — visual status flag or window; periodic inspection at 5-yearly service</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>EREC G98 / G99 / G100 — the DNO workflow</ContentEyebrow>

          <Pullquote>G98 fit-and-notify ≤16 A. G99 apply-and-wait &gt;16 A. G100 limits export.</Pullquote>

          <ConceptBlock
            title="EREC G98 — fit-and-notify (≤16 A single-phase)"
            plainEnglish="EREC G98 is the simplest connection route. The PV install\'s AC output is ≤16 A single-phase (or ≤16 A per phase three-phase) — install it, then notify the DNO within 28 days of commissioning."
            onSite="EREC G98 covers most UK domestic PV installs up to 3.68 kW AC (16 A × 230 V single-phase). DNO can object if local network is constrained, but for typical sub-4 kWp residential PV this rarely happens. The MCS-certified contractor submits the G98 notification on the relevant DNO\'s portal."
          >
            <p>The G98 fit-and-notify workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Install and commission</strong> — install the PV system per the design pack, commission per BS EN 62446-1 (Section 7)</li>
              <li><strong className="text-white">Notify the DNO</strong> — submit the G98 form on the DNO\'s portal within 28 days of commissioning. The relevant DNO depends on the installation\'s region (UK Power Networks for London / SE England; Northern Powergrid for NE England; etc.)</li>
              <li><strong className="text-white">Information required</strong> — installation address, MPAN, generator type (PV), capacity (kWp), inverter manufacturer and model, MCS cert number, commissioning date</li>
              <li><strong className="text-white">DNO confirmation</strong> — typically within 5-10 working days. Rarely objects for sub-4 kWp installs</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — archives the G98 submission, the DNO confirmation, and the MCS certificate</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EREC G99 — apply-and-wait (>16 A single-phase)"
            plainEnglish="EREC G99 is the larger-generator route. The PV install\'s AC output exceeds 16 A single-phase — submit the application to the DNO BEFORE installation, wait for assessment, install, then commission and submit the G99 commissioning notification."
            onSite="EREC G99 assessment typically takes 4-8 weeks. DNO may approve / approve with conditions (often export limitation per EREC G100) / reject. For commercial-scale installs (>50 kWp) the assessment may take longer and involve additional technical engagement."
          >
            <p>The G99 apply-and-wait workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Application</strong> — submit the G99 application BEFORE install. Includes proposed install design, modelling, inverter datasheet, MCS-certified contractor reference</li>
              <li><strong className="text-white">DNO assessment</strong> — local network capacity, voltage rise, thermal capacity, protection coordination, harmonic injection</li>
              <li><strong className="text-white">DNO response</strong> — approve / approve with conditions / reject. Conditions often include export limitation (per EREC G100), voltage limits, or protection settings</li>
              <li><strong className="text-white">Install and commission</strong> — after DNO approval; per the approved design</li>
              <li><strong className="text-white">G99 commissioning notification</strong> — submit after commissioning per BS EN 62446-1</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — archives the G99 application, DNO approval letter (including any conditions), commissioning notification, MCS cert</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="EREC G100 — export limitation"
            plainEnglish="EREC G100 covers export-limited installs — the PV install kWp exceeds the EREC G98 16 A threshold, but the inverter\'s built-in export control or a separate export-control device limits exported AC current to a DNO-approved threshold."
            onSite="Two main use cases: (a) install kWp would push the install above G98 16 A threshold, but the customer wants to stay under G98 (avoid G99 application delay) — implement G100 limiting export to ≤16 A AC; (b) DNO approved a G99 application with export-limitation condition — install must limit export to the approved threshold."
          >
            <p>The G100 implementation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Inverter built-in export control</strong> — modern inverters typically support: CT clamp on the grid connection, configurable export limit, inverter modulates output to limit export</li>
              <li><strong className="text-white">External export-control device</strong> — separate unit with grid CT and signal to inverter; used where inverter doesn\'t support built-in</li>
              <li><strong className="text-white">G100 specification requirements</strong> — measurement accuracy, response time, failure mode (default to limit-active on device failure)</li>
              <li><strong className="text-white">Verification testing at commissioning</strong> — simulate over-export conditions; confirm limit holds; document test results</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — export limit, implementation method, G100 verification test results, DNO approval (if applicable)</li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="EREC G98 / G99 / G100 decision tree — flowchart starting from the install\'s inverter AC rated current. Branch &le;16 A single-phase → EREC G98 fit-and-notify (28 days). Branch &gt;16 A → EREC G99 apply-and-wait (4-8 weeks assessment). G99 outcome branch → approved / approved with G100 limitation / rejected. G100 used to keep an install under G98 or to comply with G99 condition."
            filename="renewable/m3s6-erec-decision-tree.png"
          />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="Customer\'s existing CU is single-RCD — A4:2026 forces a substitution"
            situation="Customer\'s 2018 Hager 6-way CU has a single main 30 mA RCD protecting all circuits. PV install proposed in late 2026. Reg 551.7.1(d) (new A4:2026) prohibits PV inverter circuit on load side of the main RCD."
            whatToDo="Three options to present to the customer: (a) substitute the CU for a split-load design (£200-£400 + labour); (b) substitute the CU for an all-RCBO design (£300-£500 + labour); (c) install a separate sub-board for the PV with its own incoming feed before the main RCD (£200-£300 + labour). All three are A4:2026 compliant. The financial case: (b) provides best long-term flexibility (every circuit on its own RCBO — easier fault-finding, less nuisance tripping); (a) is the cheapest CU substitution; (c) avoids CU disruption but adds visible enclosure to the install. Customer\'s informed choice; design pack records the chosen option and Reg 551.7.1(d) compliance evidence."
            whyItMatters="A4:2026 effectively forces an upgrade for many UK domestic PV installs after April 2026. The competent installer pre-assesses the CU at survey and presents the cost / options to the customer transparently. PWI common-mistakes flags the &ldquo;PV on existing single-RCD CU&rdquo; arrangement as a future-flagged issue from 2026 onwards."
          />

          <Scenario
            title="6 kWp customer can\'t wait 6 weeks for G99 — implement G100 to stay under G98"
            situation="Customer wants 6 kWp install. Inverter rated AC = ~21.7 A (above EREC G98 16 A threshold). Customer wants install completed in 3 weeks — can\'t wait for G99 4-8 week assessment."
            whatToDo="Implement EREC G100 export limitation. Configure the inverter\'s built-in export control to limit AC export to ≤16 A. The install runs at 6 kWp but exports a maximum 3.68 kW (16 A × 230 V) — excess kWh consumed on-site (charging EV, running heat pump, BESS storage). EREC G98 fit-and-notify applies. After commissioning: (a) verify the export limit holds (simulate over-export, confirm); (b) submit EREC G98 notification within 28 days; (c) update cert evidence bundle with G100 verification results. The customer\'s install completes in 3 weeks; minimal export curtailment in practice (most self-consumed)."
            whyItMatters="EREC G100 export limitation is a pragmatic UK solution to the G99 4-8 week delay. The competent installer presents the option transparently — install time saved vs export ceiling. The cert evidence bundle records the G100 verification testing per EREC G100 specification."
          />

          <CommonMistake
            title="Connecting the PV inverter to a spare way on the existing CU — A4:2026 violation"
            whatHappens="An installer connects the PV inverter to a spare way on the customer\'s existing single-RCD CU in May 2026. The arrangement violates Reg 551.7.1(d) (effective from 15 April 2026). MCS audit flags the violation as a major finding; rectification required (CU substitution or sub-board). Customer dissatisfied; rectification cost £400-£700."
            doInstead="Pre-assess the CU at survey from April 2026 onwards. For installs on single-RCD CUs, present the three options (split-load substitution, all-RCBO substitution, separate sub-board) at the survey stage with transparent costs. The MCS MIS 3002 design pack records the CU arrangement and the Reg 551.7.1(d) compliance evidence at design stage — not as a post-install rectification."
          />

          <CommonMistake
            title="Type AC RCD fitted on a transformerless inverter circuit without exception evidence"
            whatHappens="An installer fits a Type AC RCBO on a transformerless inverter circuit without checking Reg 712.531.3.5.1 exceptions or recording manufacturer evidence. Commissioning succeeds (no fault during test). Months later, an earth fault on the inverter side produces DC residual current that the Type AC RCD doesn\'t see — RCD fails to operate, customer\'s safety potentially compromised. MCS audit flags the RCD type as non-compliant."
            doInstead="Read the inverter datasheet for the required RCD type. Default is Type B (BS EN 62423 or BS EN 60947-2) per Reg 712.531.3.5.1 unless one of the three exceptions applies (inverter simple AC/DC separation, transformer-winding separation between inverter and RCD, or manufacturer states Type B not required). Where an exception applies, the cert evidence bundle records the manufacturer datasheet extract. Without exception evidence, fit Type B."
          />

          <CommonMistake
            title="EREC G98 / G99 process skipped — no DNO notification"
            whatHappens="An installer commissions a PV install and doesn\'t submit the EREC G98 / G99 notification to the DNO. The install operates normally; SEG export tariff may not be applied (the supplier needs the DNO notification confirmation). MCS audit flags the missing DNO notification. Customer\'s tariff and the install\'s formal grid status are compromised."
            doInstead="Always submit the EREC G98 fit-and-notify within 28 days of commissioning (for ≤16 A single-phase installs), or complete the EREC G99 application BEFORE install (for >16 A). The cert evidence bundle archives the DNO submission and confirmation. The MCS-certified contractor\'s process includes the DNO notification as a commissioning-stage item."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 551.7.1(d) (NEW in A4:2026): PV / BESS inverter must NOT be on the load side of an RCD protecting the rest of the installation. Forces dedicated RCBO on CU bus (not downstream of main RCD), or split-load / all-RCBO CU, or separate sub-board.',
              'Reg 712.531.3.5.1 RCD type: default Type B (BS EN 62423 or BS EN 60947-2) for the PV AC supply circuit. Three permitted exceptions allow a different type: (a) inverter provides simple separation between AC and DC; (b) separate transformer windings between inverter and RCD; (c) inverter manufacturer states Type B not required. Cross-refs Reg 531.3.3 (general rule restricting Type AC).',
              'AC cable sized for I_z ≥ inverter rated AC at installed conditions. VD target 1-3% of nominal AC. Coordinated with RCBO / OCPD characteristic (25 A RCBO typical for 5 kW inverter).',
              'AC SPD per BS EN 61643-11 — Type-2 typical UK residential. Located at CU or inverter AC output. Sacrificial — replace after strike event.',
              'EREC G98 (≤16 A single-phase): fit-and-notify within 28 days. Most UK domestic PV (up to ~3.68 kW AC).',
              'EREC G99 (>16 A): apply-and-wait BEFORE install; 4-8 weeks DNO assessment; may approve with G100 export limitation.',
              'EREC G100: export limitation to keep an install under G98 threshold or to comply with G99 condition. Inverter built-in or external device.',
              'PWI common-mistakes 2025-2026: Reg 551.7.1(d) violation, wrong RCD type, missing AC SPD, skipped DNO notification. Each a regulatory / safety concern.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Bonding &amp; lightning
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.7 BS EN 62446-1 testing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
