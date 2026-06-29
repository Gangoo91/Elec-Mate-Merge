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
import { ThreePhaseEvSld } from '@/components/study-centre/diagrams/renewableSld';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm7s2-22kw-power',
    question: 'A 22 kW three-phase Mode 3 wallbox delivers what current per phase?',
    options: ['32 A per phase (√3 × 400 V × 32 A ≈ 22.2 kW)', '16 A per phase', '63 A per phase', '100 A per phase'],
    correctIndex: 0,
    explanation:
      '22 kW three-phase Mode 3 = 32 A per phase at 400 V three-phase (line-to-line). Math: 400 V × 32 A × √3 ≈ 22,168 W ≈ 22 kW. The standard UK commercial AC Mode 3 charger draws 32 A per phase across L1, L2, L3 + N. Same per-phase current as a single-phase 7 kW Mode 3 wallbox, but three phases simultaneously deliver triple the power. Cable + RCBO sizing per phase identical to single-phase Mode 3 (cable ≥ 32 A continuous), but with three live conductors instead of one.',
  },
  {
    id: 'm7s2-4-pole-type-b',
    question: 'What RCD architecture is correct for a three-phase 22 kW Mode 3 wallbox without integrated RDC-PD?',
    options: ['A Type AC single-pole RCD on the incoming line feeding all three phases together', 'A single-pole Type B RCD switching L1 only, leaving L2 and L3 without residual protection', 'A 4-pole Type B RCD per BS EN 62423, or a 4-pole Type A where the wallbox has integrated RDC-PD', 'No RCD at all, relying entirely on the wallbox internal electronics for fault disconnection'],
    correctIndex: 2,
    explanation:
      'Three-phase EV install needs a 4-pole RCD switching all three phases + neutral together. Type B per BS EN 62423 (4-pole variant) covers AC + pulsating DC + smooth DC across all phases. Alternative: 4-pole Type A + wallbox-integrated three-phase RDC-PD (the Reg 722.531.3.101 architecture from M6.3 scales to three-phase). Cost: 4-pole Type B RCBO ~£400-£700 typically; 4-pole Type A ~£100-£150 (with wallbox RDC-PD covering smooth DC). Most UK 2025-26 three-phase wallboxes (Easee Home 22 kW, EO Charging Genius, MyEnergi Zappi 22 kW) include integrated three-phase RDC-PD enabling the Type A architecture.',
  },
  {
    id: 'm7s2-dno-threshold',
    question: 'A single 22 kW three-phase Mode 3 wallbox = 32 A per phase. What is the DNO notification position?',
    options: ['No DNO notification is ever needed for a single wallbox, whatever the per-phase current', 'A full G99 application is always mandatory for any 22 kW wallbox without exception or consultation', 'Notification is needed only if the site exports power to the grid, never for pure import load', 'At 32 A per phase it exceeds the G98 ≤16 A threshold; generation forces G99 — consult the DNO'],
    correctIndex: 3,
    explanation:
      'EREC G98 Type A covers single-phase ≤16 A per phase OR three-phase ≤16 A per phase. A 22 kW three-phase wallbox at 32 A per phase EXCEEDS G98 Type A on the per-phase current threshold. Pure-load chargers (no generation) sometimes still fall under G98 fast-track notification depending on the DNO’s local interpretation — consult the DNO at design stage. Where the site has any co-located generation (BESS / V2G / PV), G99 formal application applies. Cert evidence bundle records the DNO correspondence + reference number + the regulatory framework used (G98 vs G99).',
  },
  {
    id: 'm7s2-per-phase-zs',
    question: 'How is Zs verified at commissioning on a three-phase EV circuit?',
    options: ['Per-phase: measure L1-PE, L2-PE and L3-PE independently at the wallbox, each ≤ the Table 41.3 limit', 'A single combined measurement at the wallbox terminals is sufficient for the whole circuit', 'No Zs measurement is needed on a three-phase EV circuit once the RCD test has passed', 'The customer measures Zs from the vehicle display and reports the figure to the installer'],
    correctIndex: 0,
    explanation:
      'Three-phase Zs verification per Reg 411 = per-phase. Measure L1-PE, L2-PE, L3-PE individually at the wallbox terminals. Use a Type B-capable Zs tester (Megger MFT1731, Fluke 1664 FC) configured for three-phase loop. Each measured Zs must be ≤ Table 41.3 value for the protective device type and rating. Phase imbalance produces different Zs per phase — common UK 2025-26 scenario: L1-PE = 0.45 Ω, L2-PE = 0.51 Ω, L3-PE = 0.48 Ω (all within limit for 32 A Type B B-curve). Cert evidence bundle records all three phase Zs measurements + instrument used.',
  },
];

const quizQuestions = [
  {
    question: 'A workplace wants three 22 kW three-phase chargers on a three-phase 100 A supply. What is the design constraint?',
    options: ['There is no design constraint; three 22 kW chargers fit comfortably under the 100 A supply', '3 × 32 A = 96 A per phase plus base load over-runs the 100 A supply, so DLM is mandatory', 'A 200 A supply must be installed before three 22 kW chargers can be run from the premises', 'The chargers must be downrated to 7 kW each to fit within the three-phase supply capacity'],
    correctAnswer: 1,
    explanation:
      'Three 22 kW wallboxes = 3 × 32 A per phase = 96 A per phase NOMINAL when all three charge simultaneously. With business base load (5-20 A per phase typical for small business) + supply limit 100 A → over-capacity. Reg 722.311.201 carve-out + DLM is the engineering answer (M6.4 covered DLM principles; M7.5 covers multi-charger DLM). Wallbox configured with shared CT clamp on incoming tails + supply limit (95 A per phase typical with margin) + multi-charger coordination via CPMS / OCPP. Cert evidence bundle records the DLM topology + the per-phase max demand calc.',
  },
  {
    question: 'Three-phase 22 kW Mode 3 wallbox phase rotation matters because:',
    options: ['It does not matter; the wallbox accepts any phase rotation and self-corrects internally', 'The vehicle decides the rotation at plug-in, so the installer need not check it at commissioning', 'Correct L1→L2→L3 rotation is needed; wrong rotation faults the unit, so verify before energising', 'Only the L1 connection matters on a three-phase wallbox; L2 and L3 order is irrelevant'],
    correctAnswer: 2,
    explanation:
      'Three-phase rotation L1 → L2 → L3 (clockwise) is the UK / European standard. Three-phase EV chargers + their connected vehicles’ on-board chargers expect this rotation. Wrong rotation (L1 → L3 → L2) causes the wallbox to detect a fault during pre-charge self-test + display error. Some older units may proceed but reduce to single-phase fall-back. Always verify rotation with phase-sequence tester (most multi-function testers include this) BEFORE first energisation of the wallbox. Cert evidence bundle records the rotation check result.',
  },
  {
    question: 'BS EN IEC 62196-2 Type 2 connector — which pins are active on a three-phase Mode 3 install?',
    options: ['Only the L1 power pin carries current, with L2 and L3 left as spare mechanical pins', 'Only the PE and N pins are active, with the line pins disabled in three-phase mode', 'All seven pins: L1, L2, L3, N, PE, CP and PP — three-phase uses every power pin', 'Only the CP signalling pin is used, with power delivered separately through the body'],
    correctAnswer: 2,
    explanation:
      'Type 2 connector has seven pins designed to support BOTH single-phase and three-phase charging. Three-phase install uses all power pins: L1 + L2 + L3 (each carrying ~32 A) + N (neutral, carrying imbalance current — typically small under balanced 3-phase EV load) + PE. CP (Control Pilot) signals max current via PWM duty cycle; PP (Proximity Pilot) signals cable current rating via resistance coding. Same Type 2 cable handles both single-phase and three-phase use; the wallbox + vehicle negotiate the actual charging mode via CP signalling. Cert evidence bundle records the three-phase mode confirmed at commissioning.',
  },
  {
    question: 'For a three-phase 32 A Mode 3 install, what is the typical cable size on a ~10 m run?',
    options: ['6 mm² 5-core (3L + N + PE) or 6 mm² 4-core SWA with armour CPC, rated 32 A continuous', '1.5 mm² twin-and-earth, the same cable size as a typical domestic lighting final circuit', '2.5 mm² 3-core flex, run direct from the consumer unit to the three-phase wallbox', '25 mm² SWA in every case regardless of run length, for maximum future headroom'],
    correctAnswer: 0,
    explanation:
      '6 mm² 5-core SWA or T+E is the typical UK 2025-26 three-phase 32 A wallbox cable for ~10 m runs. Per-phase current rating same as M6.4 single-phase (32 A continuous, Method C ~41 A). Voltage drop benefit: three-phase VD = (single-phase VD) ÷ √3, so 6 mm² over 10 m at 32 A: ~1.3% three-phase vs ~2.2% single-phase. Long runs (20-30 m) may use 10 mm² for headroom; outdoor sections use SWA. 5-core (3L + N + PE) gives all four functional conductors in one cable; 4-core SWA uses the armour as CPC + provides 3L + N. Cert evidence bundle records the cable calc + voltage drop + per-phase current carrying capacity.',
  },
  {
    question: 'Phase balancing on a three-phase EV site — why does it matter?',
    options: ['It does not matter on any EV site, since the DNO transformer absorbs any imbalance', 'The vehicle on-board charger handles phase balancing automatically during the session', 'Single-phase wallboxes load one phase, so they must be spread across L1/L2/L3 to stay balanced', 'It is only relevant on 22 kW three-phase chargers, never on single-phase wallboxes'],
    correctAnswer: 2,
    explanation:
      'Phase balancing is the engineering discipline of distributing single-phase loads across L1, L2, L3 to keep the three-phase supply balanced. On a mixed site (some 7 kW single-phase + some 22 kW three-phase wallboxes), the single-phase wallboxes must be distributed across all three phases — NOT all wired to L1. Example: 6 single-phase wallboxes = 2 on L1, 2 on L2, 2 on L3. The three-phase wallboxes are inherently balanced. DNO supply integrity, transformer loading, voltage drop, and protective device coordination all benefit from balanced loading. Cert evidence bundle records each charger’s phase assignment + the resulting site balance calculation.',
  },
  {
    question: 'A three-phase wallbox develops a fault on one phase. What’s the protective behaviour?',
    options: ['It simply continues charging on the other two healthy phases with no disconnection', 'The customer keeps charging with no protective action taken by the wallbox or the RCBO', 'The unit overheats from the unbalanced load until the cable insulation eventually fails', 'The 4-pole RCBO disconnects all three phases and N together and the wallbox reports the fault'],
    correctAnswer: 3,
    explanation:
      '4-pole RCBO operates on ALL phases + N together on a fault — design intent. Single-phase fault detection (e.g. L1 earth fault) trips the device; all three phases disconnect; wallbox enters fault state via CP signalling. Vehicle stops drawing. Some wallboxes can fall back to single-phase charging on the remaining healthy phase (manufacturer-specific feature — Tesla Wall Connector and some EO models support this; others don’t). The RCBO clears the fault; wallbox manual reset / OCPP-triggered reset returns service. Cert evidence bundle records the fault-mode response + manufacturer documentation.',
  },
];

const faqs = [
  {
    question: 'Can a 22 kW three-phase wallbox charge a single-phase EV?',
    answer:
      'Yes — the wallbox detects the vehicle’s on-board charger capability via CP signalling and falls back to single-phase delivery on L1. Charging current limited to single-phase Mode 3 (max ~32 A on L1 = 7.4 kW). UK 2025-26 reality: many EVs ship with 11 kW (3-phase 16 A) or 22 kW (3-phase 32 A) on-board chargers, but cheaper models still have only 7.4 kW single-phase OBC. The wallbox + vehicle negotiate at plug-in; customer just sees the effective charge rate. Cert evidence bundle records the wallbox capability — what the actual charge rate is depends on the vehicle.',
  },
  {
    question: 'UK 2025-26 typical three-phase wallbox brands?',
    answer:
      'Easee Home 22 kW (Norwegian, popular UK), EO Charging Genius, MyEnergi Zappi 22 kW (UK-made, popular for prosumer + PV integration), Tesla Wall Connector Gen 3 22 kW, Wallbox Pulsar Plus / Quasar (Spanish), Andersen A2 (UK-made, premium). Verify each model\'s manufacturer DoC at quote stage; check OPDD + RDC-PD inclusion + BS EN IEC 62196-2:2022 + BS EN 61851-1 + -22 conformity.',
  },
  {
    question: 'Does the 22 kW wallbox always charge at 22 kW?',
    answer:
      'No. Actual charge rate = LOWER of (wallbox capability, cable capability via PP signalling, vehicle on-board charger capability, DLM-allocated current). Many EVs have lower on-board charger limits (7-11 kW). DLM may throttle further. Cable PP rating may limit. Customer experiences the actual rate, often well below the nameplate 22 kW. Cert evidence bundle records the wallbox’s nameplate capability — customer expectations managed via handover.',
  },
  {
    question: 'Why fit 22 kW vs cheaper 7 kW?',
    answer:
      'Future-proofing + customer expectation. 22 kW costs ~£200-£500 more per unit than 7 kW. Real charge rate benefit only matters for EVs with three-phase on-board chargers (Tesla Model S/3/X/Y, certain BMW i-series, certain Audi e-tron, etc.). On a workplace site with mixed EV models, 22 kW wallboxes accommodate the higher-capability vehicles + fall back gracefully on lower. For a single-EV household with a single-phase-OBC car, 7 kW is cheaper and equivalent. Cert evidence bundle records the rationale.',
  },
  {
    question: 'How is the three-phase OPDD different from single-phase OPDD?',
    answer:
      'Single-phase OPDD monitors L1-N and L1-N-PE voltage relationships. Three-phase OPDD monitors all three phases (L1, L2, L3) + N + the L-N-PE relationships across all phases. More sensors, more electronics; same operating principle (detect lost-PEN voltage anomaly + open all phases). Cost: ~30-50% more than single-phase OPDD-equipped wallbox. Reg 722.411.4(c) compliance same as single-phase; manufacturer DoC declares three-phase OPDD function.',
  },
];

export default function RenewableEnergyModule7Section2() {
  const navigate = useNavigate();

  useSEO({
    title: 'Three-phase 22 kW Mode 3 install | Renewable Energy 7.2 | Elec-Mate',
    description:
      'Three-phase 22 kW Mode 3 EV charging — 32 A per phase, 4-pole Type B RCD architecture, phase balancing, DNO G98/G99, three-phase OPDD, per-phase Zs verification, three-phase Type 2 connector + cable sizing.',
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
            eyebrow="Module 7 · Section 2 · BS 7671:2018+A4:2026 · Section 722 + Reg 722.531.3.101"
            title="Three-phase 22 kW Mode 3 install"
            description="Three-phase Mode 3 EV charging — 32 A per phase, 4-pole Type B RCD architecture, phase balancing across the site, DNO notification under EREC G98 / G99, three-phase OPDD, per-phase Zs verification, three-phase Type 2 connector + cable sizing."
            tone="yellow"
          />

          <TLDR
            points={[
              'Three-phase Mode 3 = 32 A per phase × 3 phases × 400 V × √3 ≈ 22 kW. Triple the power of single-phase Mode 3 at the same per-phase current.',
              'Type 2 connector pinout: L1 + L2 + L3 + N + PE + CP + PP. Three-phase uses all seven pins; single-phase leaves L2 + L3 unconnected (same connector covers both modes).',
              '4-pole RCD architecture: 4-pole Type B (BS EN 62423) per Reg 722.531.3.101, OR 4-pole Type A + wallbox-integrated three-phase RDC-PD. Switches all three phases + N together on fault.',
              'Three-phase OPDD per Reg 722.411.4(c) monitors L-N-PE relationships across all phases. Most UK 2025-26 three-phase wallboxes (Easee, EO, Zappi 22 kW, Tesla, Wallbox) include integrated three-phase OPDD.',
              'Phase rotation matters — L1 → L2 → L3 (UK / European clockwise standard). Wrong rotation = wallbox fault on commissioning. Verify with phase-sequence tester before first energisation.',
              'Cable size: 6 mm² 5-core (3L + N + PE) or 6 mm² 4-core SWA + external CPC for ~10 m runs at 32 A per phase. Three-phase voltage drop = single-phase VD ÷ √3 (cable derating same as single-phase per Appendix 4).',
              'DNO notification: G98 Type A threshold ≤16 A per phase; 22 kW = 32 A per phase exceeds threshold; G98 fast-track or G99 formal application depending on DNO interpretation + co-located generation. G99 always for sites with BESS / V2G / PV.',
              'Phase balancing across a mixed site: distribute single-phase wallboxes across L1 / L2 / L3 to keep the supply balanced. Three-phase wallboxes inherently balanced.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate three-phase Mode 3 power: 32 A × √3 × 400 V ≈ 22 kW; understand the relationship between per-phase current and three-phase power.',
              'Select 4-pole Type B RCD or 4-pole Type A + three-phase RDC-PD per Reg 722.531.3.101; verify wallbox DoC for three-phase RDC-PD integration.',
              'Apply three-phase OPDD per Reg 722.411.4(c); verify manufacturer DoC declares three-phase OPDD function.',
              'Verify phase rotation L1 → L2 → L3 with phase-sequence tester before energising the three-phase wallbox.',
              'Size three-phase cable per Reg 525 + Appendix 4 with per-phase current carrying capacity + three-phase voltage drop formula.',
              'Determine DNO notification (EREC G98 Type A vs G99) based on per-phase current + co-located generation.',
              'Balance phase loading across a mixed-charger site: distribute single-phase wallboxes across L1 / L2 / L3.',
              'Apply IET CoP dedicated final circuit per charger; verify per-phase Zs at commissioning.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Three-phase Mode 3 is single-phase Mode 3 with three of everything. The Section 722 logic doesn’t change; the count of conductors does.
          </Pullquote>

          <ContentEyebrow>Three-phase Mode 3 — power, current, connector</ContentEyebrow>

          <ConceptBlock
            title="Three-phase Mode 3 power arithmetic"
            plainEnglish="A 22 kW three-phase Mode 3 wallbox draws 32 A per phase across L1, L2, L3 + N. At 400 V three-phase line-to-line: 400 V × 32 A × √3 ≈ 22,168 W ≈ 22 kW. Same per-phase current as a single-phase 7 kW Mode 3 wallbox — triple the power because three phases run simultaneously."
            onSite="The wallbox’s nameplate states 22 kW. The actual charge rate = LOWER of (wallbox capability, vehicle on-board charger capability, cable PP rating, DLM-allocated current). Many EVs in UK 2025-26 have lower on-board chargers (7-11 kW); customer experiences the actual rate, not the nameplate. Cert evidence bundle records the wallbox capability + the typical vehicle compatibility."
          >
            <p>Three-phase power math:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-phase current</strong> — 32 A on each of
                L1, L2, L3. Identical to single-phase Mode 3 32 A
              </li>
              <li>
                <strong className="text-white">Three-phase voltage</strong> — 400 V
                line-to-line (UK standard); 230 V phase-to-neutral
              </li>
              <li>
                <strong className="text-white">Power formula</strong> — P = √3 × V_LL × I
                × cos φ. For balanced 32 A across all three phases at unity power factor:
                √3 × 400 × 32 ≈ 22,168 W ≈ 22 kW
              </li>
              <li>
                <strong className="text-white">Neutral current</strong> — under balanced
                load: ~0 A in N. Imbalance produces small N current; designer’s cable
                sizing assumes balanced operation but verifies N capacity for fault scenarios
              </li>
              <li>
                <strong className="text-white">Single-phase fallback</strong> — wallbox +
                vehicle negotiate at plug-in. If the vehicle’s on-board charger is
                single-phase, the wallbox falls back to L1 only (7.4 kW maximum). Some
                wallboxes also support 16 A single-phase fallback (3.7 kW)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Type 2 connector pinout for three-phase"
            plainEnglish="The same Type 2 connector + cable covers both single-phase and three-phase Mode 3 charging. Seven pins: L1, L2, L3, N, PE, CP, PP. Single-phase uses L1 only (L2 + L3 are physically present but unconnected at the wallbox). Three-phase activates all three phase pins simultaneously."
            onSite="Same Type 2 cable in the customer’s vehicle boot works on both wallbox types. PP signalling identifies the cable’s current rating (32 A cable common); CP signalling negotiates the actual charge mode + current. The wallbox + vehicle on-board charger negotiate via CP duty cycle modulation."
          >
            <p>Type 2 connector pin map:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">L1 (Line 1)</strong> — single-phase active;
                three-phase active. Carries up to 32 A in Mode 3
              </li>
              <li>
                <strong className="text-white">L2 (Line 2)</strong> — single-phase NOT
                connected at wallbox; three-phase active. 32 A
              </li>
              <li>
                <strong className="text-white">L3 (Line 3)</strong> — single-phase NOT
                connected at wallbox; three-phase active. 32 A
              </li>
              <li>
                <strong className="text-white">N (Neutral)</strong> — single-phase active
                (carries return current); three-phase active (carries small imbalance
                current under balanced 3-ph operation)
              </li>
              <li>
                <strong className="text-white">PE (Protective Earth)</strong> — always
                active. Wallbox PE per Reg 722.411.4 alternatives (OPDD / TT / TN-S)
              </li>
              <li>
                <strong className="text-white">CP (Control Pilot)</strong> — always active.
                ±12 V PWM signalling per BS EN 61851-1
              </li>
              <li>
                <strong className="text-white">PP (Proximity Pilot)</strong> — always
                active. Resistance-coded cable rating per IEC 61851-1 Annex B
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.531.3.101 + 722.411.4 — applied to three-phase Mode 3"
            clause="Reg 722.531.3.101: RCD architecture for EV circuit — Type B per BS EN 62423 / BS EN 60947-2 OR Type A + RDC-PD per BS EN IEC 62955. For three-phase circuits: 4-pole devices switching all three phases + N together. Reg 722.411.4: PME-on-EV outdoor prohibition + alternatives — applies per-charger regardless of phase count; three-phase wallboxes typically include integrated three-phase OPDD covering route (c)."
            meaning="Section 722 layered regs apply uniformly to three-phase Mode 3 — just with 4-pole devices instead of single-pole. The architecture decision (Type B vs Type A + RDC-PD) is the same as single-phase; cost differential is amplified at four-pole (4-pole Type B RCBO ~£400-£700 vs single-pole ~£150; 4-pole Type A ~£100-£150 with wallbox RDC-PD covering smooth-DC). UK 2025-26 commercial three-phase wallboxes almost universally include integrated three-phase RDC-PD + three-phase OPDD as standard, enabling the 4-pole Type A architecture. Cert evidence bundle records the architecture + manufacturer DoC for three-phase RDC-PD + OPDD."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.421.1.7.201 — AFDD not required for compliant EV circuits"
            clause="AFDDs are not required for circuits supplying EV charging equipment conforming to BS EN 61851 series that incorporate socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2."
            meaning="Reg 722.421.1.7.201 is the AFDD carve-out for EV charging. The general BS 7671 AFDD provisions (Reg 421.1.7) require Arc Fault Detection Devices in certain final-circuit contexts; this Section 722 sub-regulation explicitly disapplies AFDD requirement for EV charging circuits where the equipment is BS EN 61851 series compliant with BS EN IEC 62196-2 connectors. UK 2025-26 reality: virtually all compliant commercial Mode 3 wallboxes (Easee, EO, Wallbox, Zappi, Tesla, Andersen) meet both standards, so AFDDs on the EV circuit are not required. Cert evidence bundle records the manufacturer DoC declaring 61851 + 62196-2 conformity (which is the basis for the AFDD exception)."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Phase rotation, balance and DNO notification</ContentEyebrow>

          <Pullquote>
            Three-phase EV install has three of every conductor — but only one phase rotation. Get the rotation wrong and nothing charges.
          </Pullquote>

          <ConceptBlock
            title="Phase rotation — L1 → L2 → L3 clockwise"
            plainEnglish="UK / European three-phase supplies use clockwise phase rotation: L1 leads L2 by 120°, L2 leads L3 by 120°. Three-phase EV wallboxes + vehicle on-board chargers expect this rotation. Wrong rotation (e.g. L1 → L3 → L2 from cable swap) causes the wallbox’s electronics to detect an anomaly during pre-charge self-test + display a fault."
            onSite={`Verify phase rotation BEFORE first energisation of the three-phase wallbox. Multi-function testers (Megger MFT1731 etc.) include phase rotation indicators — display "L1 L2 L3" or "L1 L3 L2" + colour-coded LED. Wrong rotation = swap two of the three phase cables at the wallbox terminal (NOT at the supply side — Henley block / CU phasing should never be swapped). Cert evidence bundle records the rotation check result.`}
          >
            <p>Phase rotation verification at commissioning:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Tester</strong> — multi-function tester with
                phase-rotation function. Connect to L1, L2, L3 + N at the wallbox terminals
                (before energising the wallbox internal electronics)
              </li>
              <li>
                <strong className="text-white">Display</strong> — "L1 L2 L3" = correct
                clockwise; "L1 L3 L2" = incorrect (swapped). Colour-coded LED or arrows
              </li>
              <li>
                <strong className="text-white">Correction</strong> — swap any two phase
                cables at the wallbox terminals (e.g. swap L2 and L3 at the wallbox). Never
                swap at the supply side — Henley block / CU phasing must remain consistent
              </li>
              <li>
                <strong className="text-white">Re-verify</strong> — after swap, re-test +
                confirm L1 L2 L3 displayed. Record both the initial result + the post-swap
                result if applicable
              </li>
              <li>
                <strong className="text-white">Wallbox self-test</strong> — modern wallboxes
                detect wrong rotation via internal electronics + display error code on first
                energisation. Belt-and-braces with the manual tester check
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — phase
                rotation check result + tester model + date
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Phase balancing across a mixed-charger site"
            plainEnglish="On a site with multiple single-phase + three-phase wallboxes, the engineer balances the single-phase wallboxes across L1 / L2 / L3 to keep the three-phase supply balanced. Wiring all single-phase wallboxes to L1 (lazy installer practice) overloads L1 while L2 + L3 remain underused."
            onSite="At design stage, label each single-phase wallbox’s phase assignment on the schematic. Distribute evenly: 6 single-phase wallboxes = 2 on L1, 2 on L2, 2 on L3. Three-phase wallboxes are inherently balanced (32 A per phase each). Cert evidence bundle includes the phase assignment per charger + the calculated supply imbalance."
          >
            <p>Phase balance design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Single-phase wallbox
                  assignment</strong> — distribute evenly across L1 / L2 / L3. Document
                each assignment on the install schematic
              </li>
              <li>
                <strong className="text-white">Three-phase wallbox</strong> — inherently
                balanced (32 A per phase)
              </li>
              <li>
                <strong className="text-white">DLM coordination</strong> — DLM hardware
                reads per-phase current; if the system detects sustained imbalance, it can
                trigger an alarm + suggest re-balancing
              </li>
              <li>
                <strong className="text-white">Supply integrity</strong> — DNO supplies are
                typically balanced; large imbalance can cause voltage skew, transformer
                stress, neutral current excess. Imbalance limit varies by DNO (typically &lt;20%)
              </li>
              <li>
                <strong className="text-white">Phase rotation
                  consistency</strong> — every single-phase wallbox + three-phase wallbox
                must use the SAME L1 reference. Phase labelling on the site schematic + at
                each CU way + at each wallbox terminal
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — phase
                assignment table per charger + supply balance calculation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="DNO notification thresholds — G98 vs G99"
            plainEnglish="EREC G98 = single-phase ≤16 A per phase OR three-phase ≤16 A per phase. Pure load + below threshold = G98 fast-track (post-install notification). G99 = larger installs, generation, V2G, BESS — formal pre-installation application + DNO approval."
            onSite="Single 22 kW three-phase wallbox at 32 A per phase EXCEEDS G98 per-phase threshold. UK 2025-26 reality: DNO interpretation varies. Some DNOs accept G98 fast-track for pure-load 22 kW; others require G99. Always consult the DNO at design stage; record DNO correspondence + reference number in cert evidence bundle. Multi-charger commercial sites with co-located generation always G99."
          >
            <p>G98 vs G99 decision factors:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">G98 Type A scope</strong> — single-phase ≤16
                A per phase, OR three-phase ≤16 A per phase. Microgeneration / small
                generation focus
              </li>
              <li>
                <strong className="text-white">G99 scope</strong> — anything above G98 Type
                A. Includes single-phase &gt;16 A, three-phase &gt;16 A per phase, any V2G,
                any export
              </li>
              <li>
                <strong className="text-white">EV pure-load case</strong> — a 22 kW
                wallbox at 32 A per phase is above G98 per-phase threshold. Different DNO
                areas interpret differently for pure-load chargers. Some allow G98
                fast-track; others require G99
              </li>
              <li>
                <strong className="text-white">EV + BESS / V2G / PV case</strong> — always
                G99. Generation present triggers G99 regardless of load size
              </li>
              <li>
                <strong className="text-white">Multi-charger
                  commercial</strong> — even pure-load multi-charger commercial sites
                typically G99 due to aggregate capacity. DNO often requires formal
                application for cluster sites
              </li>
              <li>
                <strong className="text-white">Lead time</strong> — G98 notification:
                weeks; G99 formal: 6-18 weeks depending on DNO + connection complexity.
                Plan accordingly
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — DNO
                reference number, application date, approval date (if G99), conditions of
                approval, post-commissioning confirmation to DNO
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase Zs verification in detail"
            plainEnglish="Reg 411 requires Zs ≤ Table 41.3 value for the protective device. On three-phase, this is verified per-phase: L1-PE, L2-PE, L3-PE individually at the wallbox terminals. Phase imbalance, cable impedance asymmetry, supply transformer phase angle errors all produce slightly different Zs values per phase even on the same circuit."
            onSite="UK 2025-26 commissioning practice: use a three-phase-capable multifunction tester (Megger MFT1731, Fluke 1664 FC, Kewtech KT76) configured for three-phase loop. The test method energises each phase-PE loop in turn and measures impedance. Record all three values. Margin: if any phase exceeds 80% of the Table 41.3 value, investigate before sign-off. Cert evidence bundle records the three phase Zs values + the tester model + serial + calibration date."
          >
            <p>Three-phase Zs verification protocol:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 411 limit</strong> — Zs ≤ Table 41.3
                value for protective device type + rating. 32 A Type B B-curve: Zs ≤ 1.37 Ω
                @ 230 V phase-to-N
              </li>
              <li>
                <strong className="text-white">L1-PE</strong> — measured with phase-PE loop
                test at wallbox terminals
              </li>
              <li>
                <strong className="text-white">L2-PE</strong> — measured separately;
                expect within ~10% of L1
              </li>
              <li>
                <strong className="text-white">L3-PE</strong> — measured separately;
                expect within ~10% of L1
              </li>
              <li>
                <strong className="text-white">High-current vs no-trip
                  mode</strong> — high-current method gives true Zs but trips RCD if RCD
                in circuit; no-trip mode preserves RCD but lower accuracy. Most modern
                three-phase testers offer both
              </li>
              <li>
                <strong className="text-white">Phase imbalance
                  effects</strong> — DNO transformer + supply cable asymmetry produces
                small but measurable Zs differences between phases. Symptom of larger
                imbalance: differences &gt;20% between phases — investigate supply
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — all three
                values recorded individually, not averaged. Margin to Table 41.3
                documented per phase
              </li>
            </ul>
          </ConceptBlock>

          <Pullquote>
            Phase rotation, phase balance, per-phase Zs — three checks no domestic install has, every commercial three-phase install needs.
          </Pullquote>

          <ConceptBlock
            title="Phase rotation correction at install"
            plainEnglish="Wrong phase rotation at first energisation = wallbox fault on self-test. The correction is to swap any two phase cables AT THE WALLBOX terminals — never at the supply side. Supply-side swaps cascade incorrect phasing across all downstream circuits."
            onSite="UK 2025-26 install practice: phase rotation is verified BEFORE energising the wallbox electronics — the multi-function tester reads at the wallbox terminals while the wallbox is still de-energised at its internal switch. If wrong, swap two phase conductors at the wallbox internal terminals + re-verify. Document both the initial result + the post-swap result if applicable. Never touch the supply-side phasing — the supply phase rotation is the SITE reference + must remain consistent across all circuits."
          >
            <p>Phase rotation correction protocol:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Verification step</strong> — phase-sequence
                tester at wallbox terminals BEFORE energising wallbox electronics
              </li>
              <li>
                <strong className="text-white">Correct result</strong> — L1 L2 L3
                clockwise. Proceed to wallbox energisation
              </li>
              <li>
                <strong className="text-white">Wrong result</strong> — L1 L3 L2 (or
                similar non-clockwise). Swap any TWO phase conductors at the wallbox
                terminals
              </li>
              <li>
                <strong className="text-white">Never swap at the
                  supply</strong> — supply-side phase reference is the SITE reference.
                Swapping at Henley block / meter tails / CU input cascades incorrect
                phasing across every downstream circuit
              </li>
              <li>
                <strong className="text-white">Re-verify post-swap</strong> — confirm
                clockwise L1 L2 L3. Proceed
              </li>
              <li>
                <strong className="text-white">Update labelling</strong> — if a swap
                happened, update wallbox internal phase labelling to match (L1 = L1 of
                supply, not L1 of cable colour). Avoids future misdiagnosis at EICR
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — phase
                rotation check result + correction (if any) + post-swap re-verification
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 311.1 + Reg 722.311.201 — three-phase max demand with DLM"
            clause="Reg 311.1: For economic and reliable design, max demand shall be determined. Reg 722.311.201: Load curtailment (manual or automatic disconnection) may be taken into account when determining max demand. Applies per-phase on three-phase circuits."
            meaning="Three-phase max demand calc = per-phase. Multi-wallbox sites where simultaneous peak exceeds supply per phase invoke Reg 722.311.201 DLM. Example: 3 × 22 kW wallboxes = 3 × 32 A per phase = 96 A per phase nominal vs 100 A supply per phase. With business base load on top, supply over-capacity → DLM mandatory. DLM hardware reads per-phase current; throttles wallboxes coordinated across the cluster to fit. Cert evidence bundle records the per-phase max demand + DLM topology + Reg 722.311.201 reference."
          />

          <ThreePhaseEvSld caption="A three-phase 22 kW EV charger single-line — 4-pole Type A RCBO with RDC-PD, 5-core SWA, and an integrated OPDD for the open-PEN requirement on a PME supply." />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Workplace install — 4 × 22 kW three-phase chargers"
            situation="Workplace site with three-phase 100 A supply already on site. 4 × 22 kW three-phase wallboxes required. ~30 staff with mixed EV fleet (mostly 11 kW OBC; some 7 kW; a few 22 kW). OZEV Workplace Charging Scheme grant available. OCPP integration via the customer’s existing CPMS."
            whatToDo="Design: 4 dedicated final circuits per IET Code of Practice for EV Charging Equipment Installation, each 32 A per phase 4-pole Type A RCBO + 5-core 6 mm² SWA. Each wallbox includes integrated three-phase OPDD per Reg 722.411.4(c) + three-phase RDC-PD per BS EN IEC 62955 per Reg 722.531.3.101. Multi-charger DLM: shared CT clamp on incoming tails (or per-charger CT depending on CPMS architecture); supply limit 95 A per phase configured; coordinated throttling across the 4 wallboxes. OCPP 1.6 + CPMS integration for fleet authentication + scheduling + usage reporting. DNO: G99 application (multi-charger above G98 threshold + co-located possibility of future BESS). BS EN IEC 61439-7 multi-charger assembly conformity if shared distribution panel. Phase balancing: all 4 wallboxes are three-phase so inherently balanced. Phase rotation verified L1 → L2 → L3 at each wallbox terminal before energisation. Per-phase Zs measured + recorded at each wallbox. Cert evidence bundle: 4 × EIC per wallbox + 61439-7 assembly DoC + DNO G99 reference + OZEV WCS grant claim (£350 × 4 = £1,400) + DLM topology + OCPP integration documentation."
            whyItMatters="This is the typical UK 2025-26 commercial workplace install — 22 kW × 4-8 bays. The three-phase Mode 3 architecture from Section 722 scales cleanly from M6 single-phase. OZEV WCS grants make the economics work for SMEs. OCPP enables the workplace to monetise / cost-allocate / report on usage. Cert evidence bundle is the deliverable that future EICRs + grant audits depend on. Total project cost typical ~£15-25k after grant; payback via staff retention + ESG reporting."
          />

          <Scenario
            title="Rural commercial — single 22 kW wallbox on existing three-phase supply"
            situation="Customer with a rural commercial property (workshop / small business) on existing three-phase 60 A supply (originally for legacy machinery). Wants a single 22 kW three-phase wallbox for their high-mileage business EV. No other large loads coincident with EV charging."
            whatToDo="Site classification: commercial-curtilage (business premises, employer-owned EV). Single-charger install: dedicated final circuit per IET Code of Practice for EV Charging Equipment Installation with 4-pole 32 A Type A RCBO + 5-core 6 mm² SWA. Wallbox: Easee Home 22 kW with integrated three-phase OPDD + three-phase RDC-PD. DNO check: 60 A supply per phase + 32 A wallbox per phase = 92 A worst-case per phase — within supply capacity if no other coincident load. No DLM needed for a single-wallbox install (workshop base load assessed; coincident peak unlikely). G98 / G99: 22 kW exceeds G98 per-phase threshold; consult DNO for fast-track or G99 application — rural DNOs often more flexible on pure-load. Phase rotation verified at commissioning. Per-phase Zs measured. Cert evidence bundle: standard Section 722 single-charger pack scaled to three-phase. Note: SCP Regulations 2021 may still apply (workplace classification). OZEV WCS grant: customer is a registered business → eligible for £350."
            whyItMatters="The rural commercial-curtilage install is a single-charger version of the M7 pattern. Simpler than the multi-charger workplace install — no DLM, no shared assembly, no OCPP integration. Cert evidence bundle is leaner. The customer’s legacy three-phase supply makes this affordable (no DNO connection upgrade required). UK 2025-26 reality: many rural commercial properties have legacy three-phase supplies; the EV install is a natural fit."
          />

          <CommonMistake
            title="Quoting a 22 kW wallbox where the customer’s vehicle only supports 7 kW"
            whatHappens="Installer quotes a £2,500 22 kW three-phase wallbox + three-phase install. Customer’s vehicle has a single-phase 7 kW on-board charger. Customer experiences 7 kW charging despite the 22 kW nameplate. Customer feels mis-sold; reviews + word-of-mouth damage."
            doInstead="Check the customer’s vehicle on-board charger capability at quote stage. If single-phase 7 kW: a 7 kW single-phase wallbox (£800-£1,200) matches their actual experience. Future-proofing for next EV: ask about replacement timeline + whether the next vehicle will have 3-phase OBC. Often customers don’t know; recommend single-phase if uncertain. Cert evidence bundle records the wallbox capability + the customer’s vehicle compatibility note."
          />

          <CommonMistake
            title="Wiring all single-phase wallboxes to L1 on a mixed-charger site"
            whatHappens={`Site has 6 × 7 kW single-phase wallboxes + 2 × 22 kW three-phase wallboxes. Lazy install practice puts all 6 single-phase chargers on L1 because "it was easiest at the CU". L1 carries 6 × 32 A = 192 A nominal vs L2 and L3 at 64 A each (from the three-phase chargers only). Supply imbalance triggers DNO complaint + transformer stress + neutral overcurrent.`}
            doInstead="Phase-balance at design stage. 6 single-phase wallboxes = 2 on L1, 2 on L2, 2 on L3. Each L now carries 2 × 32 A (single-phase) + 2 × 32 A (three-phase) = 128 A per phase nominal — balanced. Document the phase assignment on the schematic + at each CU way + at each wallbox terminal. DLM accommodates the per-phase load. Cert evidence bundle records the assignment + calculated supply balance."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Three-phase Mode 3 = 32 A per phase × √3 × 400 V ≈ 22 kW. Same per-phase current as single-phase Mode 3, triple the power.',
              'Type 2 connector covers both single-phase and three-phase. Seven pins; three-phase uses all; single-phase uses L1 + N + PE + CP + PP.',
              '4-pole RCD architecture per Reg 722.531.3.101: 4-pole Type B (BS EN 62423) OR 4-pole Type A + wallbox-integrated three-phase RDC-PD. Cost differential amplified at 4-pole.',
              'Three-phase OPDD per Reg 722.411.4(c) monitors L-N-PE relationships across all phases. Standard on UK 2025-26 commercial three-phase wallboxes.',
              'Phase rotation L1 → L2 → L3 (clockwise) verified BEFORE first energisation. Wrong rotation = wallbox fault.',
              'Cable: 6 mm² 5-core (3L+N+PE) or 6 mm² 4-core SWA + external CPC for ~10 m runs. Three-phase voltage drop = single-phase ÷ √3.',
              'DNO notification: G98 ≤16 A per phase; G99 above (or with co-located generation). 22 kW (32 A per phase) exceeds G98 per-phase threshold — consult DNO at design stage.',
              'Phase balancing on mixed sites: distribute single-phase wallboxes across L1 / L2 / L3. Three-phase wallboxes inherently balanced.',
              'IET CoP dedicated final circuit per charger — applies uniformly to single-phase and three-phase installs.',
              'Per-phase Zs measured at commissioning: L1-PE, L2-PE, L3-PE individually; each ≤ Table 41.3 value for the protective device.',
              'Cert evidence bundle: 4-pole device selection + manufacturer DoC for three-phase OPDD + RDC-PD + DNO G98/G99 reference + phase rotation check + per-phase Zs + phase assignment table.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-7-section-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Commercial EV landscape & Section 722 scope
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-7-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.3 Mode 4 DC fast charging
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
