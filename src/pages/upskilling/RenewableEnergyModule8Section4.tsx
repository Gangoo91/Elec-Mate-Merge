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
import { HeatPumpCircuitSld } from '@/components/study-centre/diagrams/renewableSld';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm8s4-dedicated-circuit',
    question:
      'Why does industry norm + MCS / MIS 3005-I:2025 install standard put each heat pump on a dedicated final circuit?',
    options: [
      'No reason',
      'Reg 314 division of installation drives fault isolation + safe maintenance + per-circuit verification + EICR clarity. A dedicated circuit means: heat pump fault doesn’t take out cooker / lighting; service engineer can isolate the heat pump independently; protective device + cable matched to the heat pump load; Part 6 verification produces per-circuit EIC. Mirrors M6 / M7 dedicated-circuit-per-EV pattern',
      'Aesthetic',
      'Random rule',
    ],
    correctIndex: 1,
    explanation:
      'Reg 314 division of installation is the underlying BS 7671 framework that drives the dedicated-circuit-per-heat-pump topology. Industry norm + MCS / MIS 3005-I:2025 install standard capture the practice. Benefits: (1) fault isolation — heat pump RCBO trip on insulation fault doesn’t take out cooker / lighting / sockets; (2) safe maintenance — service engineer / refrigerant Cat 1 person can isolate the heat pump electrically without affecting other circuits; (3) protective device + cable matched to the heat pump load with appropriate curve + cross-section; (4) Part 6 verification per Reg 643 produces per-circuit EIC + Schedule of Inspections + Schedule of Test Results; (5) EICR clarity 5-10 years later — clear per-circuit results. Mirrors the M6 / M7 dedicated-circuit-per-EV pattern. Cert evidence bundle records the dedicated circuit + protective device + cable + verification.',
  },
  {
    id: 'm8s4-protective-device-curve',
    question:
      'What protective device curve is suitable for a heat pump compressor inrush?',
    options: [
      'B curve always',
      'C or D curve — compressor start-up inrush 3-8× running current for 100-500 ms. B curve trips at 3-5× rated current → nuisance trip on every start. C curve trips at 5-10× → typically adequate for compressor inrush. D curve 10-20× → for particularly hard-starting compressors / sites with low Zs. Manufacturer install manual specifies the recommended curve',
      'No curve needed',
      'B curve only',
    ],
    correctIndex: 1,
    explanation:
      'Compressor start-up inrush is a classic motor-starting characteristic: 3-8× running current for 100-500 ms while the motor accelerates. B curve protective devices (BS EN 60898 type B) trip at 3-5× rated current within 0.1 s — nuisance trip on every compressor start. C curve (5-10× rated trip) is the typical UK 2025-26 default for heat pump dedicated circuits — handles the inrush without nuisance trip. D curve (10-20× rated trip) for particularly hard-starting compressors / sites with low Zs / large units. Manufacturer install manual specifies recommended curve per model. Verify Zs is within Table 41.3 limits for the chosen curve + protective device rating. Cert evidence bundle records: protective device type + curve + rating + manufacturer-recommended curve + Zs verification.',
  },
  {
    id: 'm8s4-cable-sizing',
    question:
      'Single-phase 32 A heat pump circuit, ~15 m total run (5 m indoor T+E + 10 m outdoor SWA). What cable sizing?',
    options: [
      '1.5 mm² T+E',
      'Per Appendix 4: indoor 6 mm² T+E (Method C clipped direct, 41 A capacity at standard ambient) provides 28% headroom; outdoor 10 mm² 3-core SWA (Method E free in air, ~55 A capacity at standard ambient) — chosen for sustained current carrying capacity + voltage drop margin over the run. Voltage drop calc: 15 m × 32 A × per-mV/A/m → typically &lt;3% (within Reg 525.202 5% limit). Designer applies Ca / Cg correction factors if applicable',
      '95 mm² SWA',
      'No sizing',
    ],
    correctIndex: 1,
    explanation:
      'Cable sizing per Appendix 4. Indoor 6 mm² T+E (twin + earth) Method C clipped direct = ~41 A capacity at standard ambient (single-phase). 32 A circuit on 6 mm² T+E = 78% utilisation; adequate. Outdoor 10 mm² 3-core SWA Method E free in air = ~55 A capacity; chosen for sustained current + voltage drop + thermal margin in outdoor exposure. Voltage drop calc per Reg 525.202 + Appendix 4 Section 6.4: 15 m × 32 A × cable per-mV/A/m. For 6 mm² T+E: ~7.3 mV/A/m → 15 × 32 × 7.3 / 1000 = 3.5 V → 1.5% of 230 V (well within Reg 525.202 5% limit). Designer applies correction factors: Ca (ambient temp), Cg (grouping), Cs (soil thermal resistivity for buried), Ci (insulated). Cert evidence bundle records the Appendix 4 calc + chosen cable + voltage drop result.',
  },
  {
    id: 'm8s4-zs-verification',
    question:
      'Where does the Zs measurement happen on a heat pump circuit?',
    options: [
      'CU only',
      'At the FURTHEST point of the circuit (the outdoor unit terminals). Zs measured = Ze (external impedance from supply transformer to consumer’s main earthing terminal) + R1 (line conductor impedance) + R2 (CPC impedance) along the full cable run. Must be ≤ Table 41.3 value for the protective device type + rating. Account for cable temperature rise correction (Ca factor at operating temp ~70 °C vs measurement at ambient)',
      'Customer measures',
      'No measurement',
    ],
    correctIndex: 1,
    explanation:
      'Zs verification per Reg 411.4 + Reg 643.7 = at the furthest point of the circuit = at the outdoor unit terminals (after the outdoor isolator + cable). Zs measured = Ze (external supply impedance) + R1 (line conductor along cable run) + R2 (CPC along cable run). Must satisfy Reg 411.4 ADS: Zs × Ia ≤ U0 × Cmin, where Ia is the current causing automatic disconnection per Table 41.3 for the device type + curve + rating, U0 is nominal voltage, Cmin is voltage factor (0.95 for AC TN). Practical: for 32 A C-curve RCBO on 230 V TN-C-S: Table 41.3 Zs ≤ 0.68 Ω at 0.4 s disconnection. Cable temperature rise correction (Ca factor): measurement at ambient gives a lower Zs than actual operating Zs at conductor temperature ~70 °C; apply correction or measure at a representative operating temperature. Cert evidence bundle records: Zs at outdoor unit terminals + Ze at supply + R1 + R2 + correction + Table 41.3 limit + margin.',
  },
];

const quizQuestions = [
  {
    question:
      'A 32 A single-phase heat pump circuit on 100 A TN-C-S supply. Protective device + cable + verification sequence?',
    options: [
      'No design',
      'Protective device: 32 A Type A RCBO C-curve (BS EN 61009 + BS EN 62423 — Type A covers AC + pulsating DC; C curve handles compressor inrush) + 30 mA additional protection per Reg 415.1. Cable: 6 mm² T+E indoor + 10 mm² 3-core SWA outdoor sized per Appendix 4 + Zs verified at outdoor unit ≤ Table 41.3 value. Reg 643 testing: continuity + IR + ADS + RCD trip-time + functional test. Schedule of Inspections + Schedule of Test Results + EIC',
      'No protection',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Standard 32 A single-phase heat pump dedicated circuit design: Type A RCBO (BS EN 61009 + BS EN 62423) covers AC + pulsating DC fault currents; C-curve handles compressor inrush; rated 32 A matching the heat pump circuit. 30 mA additional protection per Reg 415.1 (RCBO integrates this). Cable indoor 6 mm² T+E Method C; outdoor 10 mm² 3-core SWA Method E free in air. Zs verified at outdoor unit terminals ≤ Table 41.3 value for 32 A C-curve (~0.68 Ω at 0.4 s for 230 V TN-C-S). Reg 643 testing sequence: continuity (R1+R2), insulation resistance (IR ≥1 MΩ at 500 V DC), automatic disconnection (ADS Zs verification), RCD trip-time (≤300 ms at IΔn, ≤40 ms at 5 × IΔn), polarity, functional test of the heat pump + isolator. Cert evidence bundle: EIC + Schedule of Inspections + Schedule of Test Results.',
  },
  {
    question:
      'Three-phase 16 kW thermal ASHP — what changes vs single-phase 7 kW?',
    options: [
      'Same',
      'Three-phase: 4-pole 32 A Type A RCBO C-curve switching all 3 phases + N together; 5-core SWA cable (3L + N + PE); per-phase Zs verification (L1-PE, L2-PE, L3-PE each ≤ Table 41.3); phase rotation verified L1→L2→L3 with phase-sequence tester before energisation; 3-phase functional test of compressor. Per-phase running current 8-9 A vs single-phase 11-18 A — smaller per-phase cable possible but typically 6 mm² 5-core minimum for outdoor SWA',
      'Single-phase same',
      'No change',
    ],
    correctAnswer: 1,
    explanation:
      'Three-phase 16 kW thermal ASHP changes design: 4-pole 32 A Type A RCBO (or 25 A depending on per-phase running current) C-curve switching L1 + L2 + L3 + N together. 5-core SWA cable (3 line + neutral + CPC) — typical 6 mm² 5-core outdoor + 6 mm² T+E indoor (or singles in conduit). Per-phase Zs verification: L1-PE, L2-PE, L3-PE measured independently at outdoor unit terminals; each ≤ Table 41.3 value. Phase rotation verified with phase-sequence tester BEFORE energising (wrong rotation causes compressor fault). 3-phase functional test of compressor; defrost cycle observed. Per-phase running current 8-9 A on three-phase 16 kW unit (vs 11-18 A single-phase 7 kW) — smaller per-phase cable possible but 6 mm² typical minimum for outdoor SWA thermal + mechanical margin. Cert evidence bundle: 4-pole RCBO + 5-core SWA + per-phase Zs + phase rotation + functional test.',
  },
  {
    question:
      'Heat pump start-up inrush — what happens electrically + how to protect?',
    options: [
      'No inrush',
      'Compressor motor draws 3-8× rated running current for 100-500 ms during start (motor acceleration). For an 11 A running current heat pump: inrush 35-90 A peak briefly. B curve protective device trips at 3-5× = nuisance trip. C curve (5-10×) typical default — handles inrush. D curve (10-20×) for hard-starting. Soft-start / VSD inverter compressors reduce inrush significantly; modern inverter-driven heat pumps typically only ~1.5-2× running current inrush',
      'No protection',
      'Always B curve',
    ],
    correctAnswer: 1,
    explanation:
      'Compressor start-up inrush: classic motor-starting characteristic — 3-8× rated running current for 100-500 ms while the motor accelerates + the refrigerant circuit pressurises. Direct-on-line start (no soft-start, no VSD) sees the full 3-8× inrush. B curve protective device (BS EN 60898 type B, 3-5× rated current trip) nuisance-trips on this. C curve (5-10×) is the UK 2025-26 default for heat pump dedicated circuits — handles typical inrush. D curve (10-20×) for hard-starting compressors / commercial / industrial / low-Zs sites. Modern inverter-driven heat pumps (VSD compressors — see §8.5 for RCD architecture implications) significantly reduce inrush: typically 1.5-2× running current ramp over a few seconds rather than instantaneous 3-8× spike. Manufacturer install manual specifies recommended curve per model. Cert evidence bundle records: protective device curve + rating + manufacturer recommendation.',
  },
  {
    question: 'Cable Reg 543 protective conductor selection — armour as CPC or separate?',
    options: [
      'No CPC needed',
      'Armour as CPC permitted per Reg 543 IF: (1) armour cross-section ≥ minimum CPC per Table 54.7 (or adiabatic calc); (2) armour electrically continuous at both ends (gland + earth tag + terminal connection); (3) cable manufacturer DoC confirms armour-as-CPC. Alternative: separate green-yellow CPC conductor in the cable (4-core for single-phase, 5-core for three-phase). Most UK 2025-26 SWA heat pump cables use armour-as-CPC',
      'Bare wire',
      'No earth',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 543 protective conductor selection. Armour as CPC permitted IF: (1) armour cross-section meets the minimum CPC requirement per Table 54.7 (or adiabatic equation S² × t = k² for fault current + duration); (2) armour electrically continuous at both ends — gland + earth tag at outdoor isolator + outdoor unit, terminal-block earth connection at indoor termination + CU; (3) cable manufacturer DoC confirms armour-as-CPC is acceptable for the cross-section + application. For typical 10 mm² 3-core SWA: armour effective cross-section ≈ 70-100 mm² for steel armour — well above the Table 54.7 minimum for protective conductor on 10 mm² circuit. Alternative: cable with separate green-yellow CPC conductor (4-core for single-phase L+N+PE+armour-as-functional-earth-only; 5-core for three-phase). UK 2025-26 mature install practice: most heat pump SWA installs use armour-as-CPC. Cert evidence bundle records: armour vs separate CPC choice + manufacturer DoC + continuity verified at commissioning.',
  },
  {
    question: 'Voltage drop calc for the heat pump dedicated circuit — what is the limit?',
    options: [
      'No limit',
      'Reg 525.202 voltage drop limits: 5% between supply origin + final circuit terminals (for non-lighting circuits). For heat pump: indoor cable + outdoor SWA combined drop calculated per Appendix 4 using cable per-mV/A/m × length × current. Typical 15 m total run at 32 A on 6 mm² + 10 mm² SWA: ~3-4 V drop = 1.3-1.7% — well within 5%. Long runs (>30 m) may require oversize cable; cert evidence bundle records the calc',
      '0.1% only',
      '50% drop',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 525.202 voltage drop limits: 3% from supply origin to final circuit terminals for lighting circuits; 5% for non-lighting (heat pump). Calc per Appendix 4: voltage drop = cable per-mV/A/m × length (m) × current (A) / 1000 = volts. For 6 mm² single-phase cable: ~7.3 mV/A/m. 5 m indoor × 32 A × 7.3 / 1000 = 1.2 V. For 10 mm² SWA: ~4.4 mV/A/m. 10 m outdoor × 32 A × 4.4 / 1000 = 1.4 V. Total drop = 2.6 V at 230 V = 1.1% (within 5% limit). Long runs (>30 m total) may require oversize cable — 10 mm² indoor instead of 6 mm² to keep within voltage drop. Three-phase voltage drop = single-phase drop / √3 (for balanced three-phase load). Cert evidence bundle records: Appendix 4 calc + cable per-mV/A/m used + length + current + total drop + % of nominal voltage + margin to 5% limit.',
  },
  {
    question:
      'ADS verification at outdoor unit — what is the Zs limit for 32 A C-curve RCBO on 230 V TN-C-S?',
    options: [
      '10 Ω',
      'Table 41.3: 32 A Type C protective device + 0.4 s disconnection time → Zs ≤ 0.68 Ω at U0 = 230 V. Cmin factor 0.95 (TN system) applied. Measure Zs at outdoor unit terminals; verify ≤ 0.68 Ω. Practical typical: 0.3-0.5 Ω achieved with 100 A TN-C-S supply + 15 m cable + adequate cross-section',
      '50 Ω',
      'No limit',
    ],
    correctAnswer: 1,
    explanation:
      'ADS verification per Reg 411.4 + Reg 643.7 + Table 41.3. For 32 A C-curve protective device (BS EN 60898) on 230 V TN-C-S with 0.4 s disconnection time: Zs ≤ 0.68 Ω. Calculation behind the table: Zs × Ia ≤ U0 × Cmin, where Ia = 10 × In = 10 × 32 = 320 A for C-curve at 0.4 s, U0 = 230 V, Cmin = 0.95 (TN system) → Zs ≤ 230 × 0.95 / 320 = 0.68 Ω at the maximum manufacturer Ia case; Table 41.3 gives 0.68 Ω for the 32 A Type C row at 0.4 s. Practical Zs at outdoor unit terminals with typical 100 A TN-C-S supply + 15 m cable + 6 mm² indoor + 10 mm² SWA outdoor: 0.3-0.5 Ω typically achieved. Cable temperature rise correction (Ca factor for measurement at ambient vs operating temp ~70 °C) increases effective Zs by ~20% — designer applies correction. Cert evidence bundle records: measured Zs + Ze + R1 + R2 + temperature correction + Table 41.3 limit + margin.',
  },
];

const faqs = [
  {
    question: 'What size RCBO for a typical 9 kW ASHP?',
    answer:
      '32 A typical. Per the worked example: 9 kW thermal ASHP ≈ 3 kW electrical input continuous (COP ~3); single-phase running current ~13 A on 230 V; inrush 3-8× = 40-100 A peak briefly. 32 A C-curve handles the inrush + continuous load with headroom. Verify against manufacturer install manual — some larger units recommend 40 A. Cert evidence bundle: protective device + manufacturer recommendation + verification.',
  },
  {
    question: 'Cable sizing for a 30 m run to a remote outdoor unit?',
    answer:
      'Voltage drop is the limiting factor on long runs. 30 m × 32 A × 7.3 mV/A/m (6 mm²) = 7 V = 3% — within Reg 525.202 5% but tight. Upgrade indoor to 10 mm² T+E or all-SWA route: 30 m × 32 A × 4.4 mV/A/m (10 mm²) = 4.2 V = 1.8%. Better headroom. Cert evidence bundle records the Appendix 4 calc + the chosen cable.',
  },
  {
    question: 'Can the heat pump share a circuit with another load?',
    answer:
      'Industry-norm + MCS / MIS 3005-I:2025 install standard: NO. Dedicated final circuit per heat pump. Reg 314 division of installation supports this for fault isolation + safe maintenance + per-circuit verification. Mirrors the M6 / M7 dedicated-circuit-per-EV pattern. Sharing with other loads invites coincident-load problems + complicates EICR + service isolation.',
  },
  {
    question: 'TN-S vs TN-C-S vs TT — different design?',
    answer:
      'TN-S (separate N + PE): cleanest; Zs depends on supply transformer + service cable. TN-C-S / PME (combined PEN at supply): MOST common UK domestic; PME concern less acute on heat pumps than EVs (heat pump is indoor / outdoor cable not handheld vehicle contact). TT (separate earth electrode): higher Zs typically; RCD additional protection essential. All three TN architectures work for heat pumps — designer verifies Zs at outdoor unit + RCD coordination per the earthing system. Cert evidence bundle records the earthing system + Zs.',
  },
  {
    question: 'Cable in plastic conduit through wall — appropriate?',
    answer:
      'Yes for indoor sections (T+E in 20-25 mm PVC conduit; tight fit + secured + bonded if metallic). Outdoor / through-wall sections: SWA in galvanised steel conduit OR direct SWA gland-sealed entry. Plastic outdoor conduit degrades under UV + lacks mechanical protection. Through-wall penetration: sleeve + fire-stop per Reg 527 + Building Regs Part B regardless of cable type.',
  },
];

export default function RenewableEnergyModule8Section4() {
  const navigate = useNavigate();

  useSEO({
    title: 'Wiring + dedicated circuit + ADS | Renewable Energy 8.4 | Elec-Mate',
    description:
      'Heat pump electrical wiring — dedicated final circuit per Reg 314, cable sizing per Appendix 4, protective device curve selection (C / D) for compressor inrush, Reg 411.4 ADS + Zs verification at outdoor unit, voltage drop per Reg 525.202 + Appendix 4 Section 6.4, three-phase variants.',
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
            eyebrow="Module 8 · Section 4 · BS 7671:2018+A4:2026 · Reg 314 + Reg 411.4 + Reg 525.202 + Reg 543 + Appendix 4"
            title="Wiring + dedicated circuit + ADS"
            description="Heat pump electrical wiring design — dedicated final circuit per Reg 314, protective device + curve selection (C / D) for compressor inrush, cable sizing per Appendix 4 (sustained current + voltage drop), Reg 543 protective conductor selection (armour-as-CPC), Reg 411.4 ADS + Zs verification at outdoor unit, three-phase variants."
            tone="yellow"
          />

          <TLDR
            points={[
              'Dedicated final circuit per heat pump (industry norm + MCS / MIS 3005-I:2025 install standard; underlying BS 7671 framework is Reg 314 division of installation).',
              'Protective device: 32 A Type A RCBO C-curve typical for single-phase (BS EN 61009 + BS EN 62423). C-curve handles compressor inrush 3-8× running current.',
              'Cable indoor: 6 mm² T+E Method C (~41 A capacity); outdoor: 10 mm² 3-core SWA Method E (~55 A); three-phase: 6 mm² 5-core SWA. Sized per Appendix 4 sustained current + voltage drop.',
              'Reg 543 CPC: armour-as-CPC permitted where armour cross-section meets Table 54.7 + electrically continuous + manufacturer DoC confirms.',
              'Reg 411.4 ADS verification: Zs measured at outdoor unit terminals ≤ Table 41.3 value. For 32 A C-curve on 230 V TN-C-S: Zs ≤ 0.68 Ω at 0.4 s.',
              'Reg 525.202 voltage drop ≤5% for non-lighting circuits. Typical 15 m run + 6 mm² + 10 mm² SWA: ~1-2% drop. Long runs (>30 m) may need cable upsize.',
              'Three-phase: 4-pole RCBO + 5-core SWA + per-phase Zs verification + phase rotation verified before energisation.',
              'Modern inverter-driven heat pumps significantly reduce inrush (1.5-2× vs 3-8× for direct-on-line) — but C-curve still typical default for protective device margin.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 314 division of installation: dedicated final circuit per heat pump.',
              'Select protective device type + curve + rating for compressor inrush characteristics.',
              'Size indoor + outdoor cable per Appendix 4 sustained current + voltage drop calc.',
              'Apply Reg 543 CPC selection — armour-as-CPC where appropriate.',
              'Verify Reg 411.4 ADS + Zs at outdoor unit terminals against Table 41.3.',
              'Apply Reg 525.202 voltage drop calc (5% limit) per Appendix 4.',
              'Design the three-phase variant: 4-pole RCBO + 5-core SWA + per-phase Zs + phase rotation.',
              'Document the circuit design in the cert evidence bundle: protective device + cable + Zs + voltage drop + CPC + verification.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Heat pump dedicated circuit design is M6 / M7 EV-pattern applied to a different motor. Same Reg 314 + Reg 411 + Reg 525.202 + Appendix 4 Section 6.4 framework; different load profile.
          </Pullquote>

          <ContentEyebrow>Dedicated circuit + protective device</ContentEyebrow>

          <ConceptBlock
            title="Dedicated final circuit per heat pump"
            plainEnglish="Industry norm + MCS / MIS 3005-I:2025 install standard: each heat pump on a dedicated final circuit. Underlying BS 7671 framework is Reg 314 division of installation. Mirrors the M6 / M7 dedicated-circuit-per-EV pattern."
            onSite="Dedicated circuit means: heat pump fault doesn’t take out cooker / lighting; service isolation independent; protective device + cable matched to heat pump load; per-circuit Part 6 verification + EICR clarity. Sharing the circuit with other loads is incompatible with this pattern + with the per-circuit RCD architecture in §8.5."
          >
            <p>Dedicated-circuit topology rationale:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Fault isolation</strong> —
                heat pump RCBO trip on insulation fault doesn’t cascade to cooker /
                lighting / sockets / other circuits
              </li>
              <li>
                <strong className="text-white">Safe maintenance</strong> —
                service engineer / refrigerant Cat 1 person isolates the heat pump
                electrically via the outdoor isolator + the CU RCBO; other circuits
                unaffected
              </li>
              <li>
                <strong className="text-white">Protective device
                  matching</strong> — RCBO type + curve + rating + RCD architecture
                designed for the heat pump load (compressor inrush + VSD smooth-DC
                considerations §8.5)
              </li>
              <li>
                <strong className="text-white">Cable matching</strong> —
                cable cross-section + thermal rating + voltage drop matched to the
                heat pump continuous + inrush load
              </li>
              <li>
                <strong className="text-white">Part 6
                  verification</strong> — per-circuit IR + Zs + RCD trip-time + ADS
                produces clear per-circuit EIC + Schedule of Test Results. EICR 5-10
                years later equally clear
              </li>
              <li>
                <strong className="text-white">Backup immersion
                  circuit</strong> — typically a SECOND dedicated circuit for the
                immersion (16 A RCBO, separate cable to the cylinder). §8.6 details
              </li>
              <li>
                <strong className="text-white">Controls wiring</strong> —
                low-voltage low-current; can share a controls-circuit way at CU or be
                fed from the heat pump’s integrated control circuit (manufacturer
                topology). §8.7 details
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — dedicated circuit ID + CU way + protective device
                + cable + Zs + verification
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Protective device + curve selection"
            plainEnglish="Standard UK 2025-26 single-phase 7-12 kW thermal ASHP dedicated circuit: 32 A Type A RCBO C-curve (BS EN 61009 + BS EN 62423). C-curve handles compressor start-up inrush (3-8× running current for 100-500 ms). Type A covers AC + pulsating DC fault currents (Type F or B if VSD smooth-DC declared — §8.5)."
            onSite="Manufacturer install manual specifies recommended RCBO rating + curve per model. Direct-on-line compressor start needs C or D curve; modern inverter-driven (VSD) compressors with soft-start reduce inrush significantly. Cert evidence bundle records protective device + curve + rating + manufacturer recommendation."
          >
            <p>Protective device selection:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">RCBO standard</strong> —
                BS EN 61009-1 (residual current operated circuit-breaker with integral
                overcurrent protection) + BS EN 62423 (Type A / F / B)
              </li>
              <li>
                <strong className="text-white">Type A</strong> — AC +
                pulsating DC fault currents. UK 2025-26 default for heat pump where
                manufacturer DoC does NOT declare smooth-DC fault current from VSD
                compressor
              </li>
              <li>
                <strong className="text-white">Type F</strong> — adds high-frequency
                fault current detection (VSD-compatible). UK 2025-26 emerging for VSD
                heat pumps where manufacturer declares
              </li>
              <li>
                <strong className="text-white">Type B</strong> — adds smooth-DC
                fault current detection. Required where VSD compressor declares smooth-DC
                leakage &gt; Type A capability. §8.5 RCD architecture details
              </li>
              <li>
                <strong className="text-white">B curve</strong> — 3-5× rated
                current trip. Not suitable for direct-on-line compressor inrush
              </li>
              <li>
                <strong className="text-white">C curve</strong> — 5-10× rated
                current trip. UK 2025-26 default for heat pump dedicated circuit
              </li>
              <li>
                <strong className="text-white">D curve</strong> — 10-20× rated
                current trip. Hard-starting compressors / low-Zs sites
              </li>
              <li>
                <strong className="text-white">30 mA additional
                  protection</strong> — Reg 415.1 — integrated into the RCBO. Verify
                trip-time at 1 × IΔn ≤300 ms; at 5 × IΔn ≤40 ms
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — RCBO product + type + curve + rating + manufacturer
                DoC + RCD trip-time verification
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 314.1 — Division of installation"
            clause="Every installation shall be divided into circuits, as necessary, to avoid danger and minimise inconvenience in the event of a fault, to facilitate safe operation, inspection, testing and maintenance, and to take account of hazards that may arise from the failure of a single circuit such as a lighting circuit."
            meaning="Reg 314.1 is the underlying BS 7671 framework that supports the industry-norm dedicated-circuit-per-heat-pump topology. The MCS / MIS 3005-I:2025 install standard captures this in detail. At install: dedicated final circuit from CU to outdoor unit via outdoor isolator; separate dedicated circuit for immersion backup; controls wiring on its own low-voltage low-current run. Cert evidence bundle records per-circuit EIC + Schedule of Inspections + Schedule of Test Results. Reg 314.1 division applies equally to heat pumps as to EV charging (M6 / M7) — both are fixed equipment with characteristic load profiles requiring matched protective devices + cable."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Cable sizing + voltage drop</ContentEyebrow>

          <Pullquote>
            Appendix 4 sustained current carrying capacity. Reg 525.202 voltage drop. Two calcs, one cable choice. Long runs and three-phase change the maths.
          </Pullquote>

          <ConceptBlock
            title="Appendix 4 sustained current carrying capacity"
            plainEnglish="Cable cross-section sized so sustained current carrying capacity (per Appendix 4 method + ambient + grouping) exceeds the design current. For typical single-phase 32 A heat pump: indoor 6 mm² T+E Method C (~41 A) + outdoor 10 mm² 3-core SWA Method E (~55 A). Three-phase: 6 mm² 5-core SWA typical."
            onSite="Designer applies correction factors per Appendix 4: Ca (ambient temperature), Cg (grouping), Cs (soil thermal resistivity for buried), Ci (insulated through wall). Outdoor SWA in air at typical UK 2025-26 ambient (25 °C reference; UK summer maximum ~35 °C) uses Ca correction if relevant. Cert evidence bundle records the Appendix 4 calc + chosen method + correction factors."
          >
            <p>Appendix 4 sizing for heat pump circuits:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Indoor T+E Method
                  C</strong> — clipped direct to wall / surface. 6 mm² T+E single-phase
                capacity ~41 A at 30 °C ambient; 10 mm² ~57 A. Typical heat pump 32 A
                circuit fits on 6 mm² with headroom
              </li>
              <li>
                <strong className="text-white">Outdoor SWA Method
                  E</strong> — free in air, not buried, not in conduit. 10 mm² 3-core
                SWA single-phase capacity ~55 A at 30 °C ambient; 6 mm² ~41 A. Typical
                heat pump 32 A on 10 mm² with margin
              </li>
              <li>
                <strong className="text-white">Buried SWA Method
                  D</strong> — direct in ground or in duct. Capacity reduced vs Method E
                (heat dissipation worse). Use for cable in trench from building to remote
                outdoor unit. 10 mm² buried Method D ~50 A
              </li>
              <li>
                <strong className="text-white">Three-phase
                  cable</strong> — 5-core SWA (3L + N + PE). Per-phase capacity per
                Appendix 4. 6 mm² 5-core typical for three-phase 16 kW thermal heat
                pump (8-9 A per phase running)
              </li>
              <li>
                <strong className="text-white">Correction factors</strong>
                — Ca (ambient) per Table 4B1; Cg (grouping) per Table 4C1; Cs (soil)
                per Table 4B2; Ci (insulated cavity) per manufacturer guidance. Apply
                product of all relevant correction factors
              </li>
              <li>
                <strong className="text-white">Adiabatic check</strong>
                — Reg 543.1 protective conductor cross-section: S² × t = k² where S =
                CPC cross-section, t = disconnection time, k = material constant. For
                10 mm² SWA armour acting as CPC: armour cross-section ~70-100 mm² —
                well above the adiabatic minimum
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — Appendix 4 calc page + chosen cable + Method +
                correction factors + capacity vs design current margin
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 525.202 voltage drop calc"
            plainEnglish="Reg 525.202 + Appendix 4 Section 6.4: voltage drop from supply origin to final circuit terminals ≤5% for non-lighting circuits (3% for lighting). Calc per Appendix 4: voltage drop = cable per-mV/A/m × length × current / 1000. For typical 15 m heat pump run: indoor 6 mm² + outdoor 10 mm² SWA ≈ 2.6 V drop at 32 A = 1.1% — well within 5%."
            onSite="Long runs are the limiting case. Beyond ~30 m total, indoor cable may need oversizing (10 mm² T+E instead of 6 mm²) to keep within voltage drop. Three-phase has √3 advantage: voltage drop is 1/√3 of single-phase for the same cable + length + current (balanced load)."
          >
            <p>Voltage drop calc methodology:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 525.202 limit</strong> —
                5% from supply origin to final circuit terminals for non-lighting
                circuits. Heat pump = non-lighting; 5% limit applies
              </li>
              <li>
                <strong className="text-white">Calc formula</strong> —
                voltage drop (V) = cable per-mV/A/m × length (m) × current (A) / 1000
              </li>
              <li>
                <strong className="text-white">Cable per-mV/A/m
                  values</strong> — 6 mm² single-phase ~7.3 mV/A/m; 10 mm² single-phase
                ~4.4 mV/A/m; 6 mm² three-phase ~4.2 mV/A/m; 10 mm² three-phase ~2.5
                mV/A/m. Values per Appendix 4 Tables 4D1-4E5
              </li>
              <li>
                <strong className="text-white">Total drop</strong> —
                sum drops for each cable segment (indoor T+E + outdoor SWA). Compare
                to 5% of nominal voltage (230 V × 5% = 11.5 V for single-phase; 400 V ×
                5% = 20 V for three-phase line-to-line)
              </li>
              <li>
                <strong className="text-white">Typical 15 m
                  result</strong> — 6 mm² indoor (5 m) + 10 mm² SWA outdoor (10 m) at 32
                A single-phase: 1.2 + 1.4 = 2.6 V = 1.1% of 230 V (5% margin)
              </li>
              <li>
                <strong className="text-white">Long run (30 m)
                  result</strong> — if cable is 6 mm² throughout 30 m at 32 A: 7 V = 3%
                (tight to 5%). Upgrade to 10 mm² indoor: 30 × 32 × 4.4 / 1000 = 4.2 V
                = 1.8% (comfortable)
              </li>
              <li>
                <strong className="text-white">Three-phase
                  advantage</strong> — same cable + length + load: voltage drop is
                ÷√3 (~58% of single-phase). Three-phase 6 mm² 5-core SWA + 15 m + 8 A
                per phase: 0.6 V = 0.15% of 400 V line-line
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per-segment drop calc + total drop + % of nominal
                + margin to 5% limit
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.4 — Automatic disconnection of supply (ADS) in TN systems"
            clause="In a TN system, the characteristics of the protective devices (see Regulation 411.4.5) and the circuit impedances shall fulfil the following requirement: Zs × Ia ≤ U0 × Cmin, where Zs is the impedance of the fault loop, Ia is the current causing the automatic operation of the protective device within the time specified in Regulation 411.3.2.2 or 411.3.2.3, U0 is the nominal line-to-earth voltage, and Cmin is the minimum voltage factor."
            meaning="Reg 411.4 sets the fundamental ADS requirement in TN systems. For a heat pump dedicated circuit: Zs measured at outdoor unit terminals (the furthest point of the circuit) must satisfy Zs × Ia ≤ U0 × Cmin. Practical: 32 A C-curve RCBO on 230 V TN-C-S → Table 41.3 gives Zs ≤ 0.68 Ω at 0.4 s. Measurement: at outdoor unit terminals using multifunction tester (Megger MFT1731, Fluke 1664 FC, Kewtech KT64DL or equivalent per BS EN 61557). Apply temperature correction (Ca factor) for measurement at ambient vs cable operating temperature ~70 °C. Cert evidence bundle records: Zs measured + Ze (external supply impedance) + R1 + R2 + correction + Table 41.3 limit + margin."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <HeatPumpCircuitSld caption="A heat-pump dedicated circuit single-line — RCBO, SWA with the armour as CPC, an outdoor isolator and the unit. The RCD is at least Type A because the inverter compressor can produce smooth DC fault current." />

          <SectionRule />

          <Scenario
            title="Single-phase 9 kW ASHP dedicated circuit — typical UK 2025-26 retrofit"
            situation="4-bed semi-detached, 100 A TN-C-S supply, 12-way CU with 4 spare ways. 9 kW thermal Vaillant aroTHERM Plus R290 outdoor unit + 200 L unvented DHW cylinder + radiator system. 15 m total cable run (5 m indoor + 10 m outdoor)."
            whatToDo="Design: dedicated final circuit per Reg 314. Protective device: Hager AD132 (or equivalent) 32 A Type A RCBO C-curve (BS EN 61009 + BS EN 62423). 30 mA additional protection integrated per Reg 415.1. Cable: 6 mm² T+E indoor (Method C clipped direct, ~41 A capacity at 30 °C) + 10 mm² 3-core SWA outdoor (Method E free in air, ~55 A capacity). Armour as CPC per Reg 543 (10 mm² SWA armour ~75 mm² steel — well above Table 54.7 minimum). Voltage drop: 5 × 32 × 7.3 / 1000 + 10 × 32 × 4.4 / 1000 = 1.2 + 1.4 = 2.6 V = 1.1% of 230 V (5% margin). Zs verification at outdoor unit: Ze 0.35 Ω + R1 0.05 + R2 0.05 = 0.45 Ω (~66% of 0.68 Ω limit — comfortable margin). RCD trip-time at 30 mA: 25 ms (within 300 ms / 40 ms limits). Reg 643 commissioning sequence: continuity (R1+R2) → IR (≥1 MΩ at 500 V DC) → polarity → ADS (Zs) → RCD trip-time → functional. Cert evidence bundle: EIC + Schedule of Inspections + Schedule of Test Results + Hager DoC + cable manufacturer DoC (armour-as-CPC) + measurement records."
            whyItMatters="Standard single-phase ASHP dedicated circuit — applies the BS 7671 framework cleanly. Cert evidence bundle deliverable to MCS company for handover pack. Industry-norm cost: ~£600-1,200 electrical-scope labour for circuit + commissioning (excluding CU change if needed). Mirrors the M6 EV pattern + same install discipline."
          />

          <Scenario
            title="Three-phase 16 kW ASHP dedicated circuit"
            situation="5-bed detached, three-phase 100 A per phase supply (recently upgraded — see §8.2 heat-pump-ready pattern), new three-phase CU with dedicated ways reserved for heat pump + future EV + PV + BESS. 16 kW thermal Mitsubishi Ecodan three-phase ASHP."
            whatToDo="Three-phase dedicated circuit. Protective device: 4-pole Hager AD432 (or equivalent) 32 A Type A RCBO C-curve switching L1 + L2 + L3 + N together. 30 mA additional protection integrated. Cable: 6 mm² 5-core SWA outdoor (3L + N + PE; per-phase capacity ~41 A Method E — well above 8-9 A per phase running) + 6 mm² 5-core indoor (Method C ~41 A per phase). Armour as CPC per Reg 543. Voltage drop: 15 m × 9 A per phase × 4.2 mV/A/m (three-phase 6 mm²) = 0.6 V per phase = 0.15% of 400 V line-line — comfortable margin. Per-phase Zs verification at outdoor unit: L1-PE 0.42 Ω, L2-PE 0.45 Ω, L3-PE 0.43 Ω (each well within 0.68 Ω limit; phase imbalance within 8%). Phase rotation verified with phase-sequence tester BEFORE energising — L1 → L2 → L3 confirmed. Functional test: compressor 3-phase starts smoothly; defrost cycle exercised; immersion functional. Cert evidence bundle: 4-pole RCBO + 5-core SWA + per-phase Zs + phase rotation + functional test + PEI Chapter 82 integration with future EV / PV / BESS scopes."
            whyItMatters="Three-phase heat pump dedicated circuit applies the same BS 7671 framework with phase-multiplied verification. Per-phase Zs + phase rotation verification are the three-phase-specific commissioning steps. Cert evidence bundle integrates with the wider PEI Chapter 82 framework (PV + BESS + EV all coordinated on the same three-phase supply). UK 2025-26 new-build best-practice pattern."
          />

          <CommonMistake
            title="Selecting B-curve protective device for direct-on-line compressor"
            whatHappens="Designer specifies 32 A Type A B-curve RCBO. Installation looks fine on test (no compressor running). On first commissioning + customer use, compressor starts → 3-8× running inrush briefly → B-curve trips at 3-5× → nuisance trip. Customer reports recurring trip; installer return visit; protective device replacement to C-curve."
            doInstead="C-curve for direct-on-line compressor (BS EN 60898 C type — 5-10× rated current trip). Inverter-driven (VSD) compressors with soft-start can tolerate B-curve in theory but C-curve is the safer default. Manufacturer install manual specifies recommended curve per model. Cert evidence bundle records the manufacturer recommendation + chosen curve."
          />

          <CommonMistake
            title="Forgetting cable temperature correction for Zs measurement"
            whatHappens="Designer measures Zs at outdoor unit at ambient 15 °C; reads 0.58 Ω; treats as satisfying ≤0.68 Ω limit. Cable operating temperature reaches 70 °C in service → R1 + R2 increases ~20% → effective Zs ~0.70 Ω → exceeds Reg 411.4 limit → ADS not guaranteed within 0.4 s under fault conditions."
            doInstead="Apply cable temperature correction (Ca factor) for Zs measured at ambient. Practical: Zs at operating temperature ≈ Zs measured × 1.20 (for typical PVC cable rated 70 °C operating + measured at ~20 °C). Or measure Zs after the heat pump has been running long enough for the cable to warm. Designer applies the corrected Zs in the cert evidence bundle. Reg 411.4 satisfied at operating temperature, not just ambient."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Dedicated final circuit per heat pump (industry norm + MCS / MIS 3005-I:2025 install standard; Reg 314 division of installation underlying).',
              'Protective device: 32 A Type A RCBO C-curve typical single-phase (BS EN 61009 + BS EN 62423). C-curve handles direct-on-line compressor inrush.',
              'Curve selection: B not suitable for direct-on-line; C standard default; D for hard-starting / low-Zs.',
              'Type A: AC + pulsating DC fault. Type F / Type B for VSD smooth-DC scenarios — §8.5 details.',
              'Indoor cable 6 mm² T+E Method C; outdoor 10 mm² 3-core SWA Method E single-phase; 6 mm² 5-core SWA three-phase.',
              'Reg 543 CPC: armour-as-CPC where cross-section + continuity + manufacturer DoC permit; alternative separate green-yellow CPC.',
              'Reg 411.4 ADS verification: Zs at outdoor unit terminals ≤ Table 41.3 value. 32 A C-curve on 230 V TN-C-S: ≤0.68 Ω at 0.4 s.',
              'Cable temperature correction for Zs measurement at ambient vs operating ~70 °C.',
              'Reg 525.202 voltage drop ≤5% non-lighting. Typical 15 m run: ~1-2% drop. Long runs (>30 m) may need cable upsize.',
              'Three-phase: 4-pole RCBO + 5-core SWA + per-phase Zs verification + phase rotation verified BEFORE energising.',
              'Cert evidence bundle: protective device + cable + Appendix 4 calc + voltage drop + Zs + per-phase results + phase rotation + RCD trip-time + IR + functional.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Outdoor unit siting + thermal/cable protection
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.5 RCD architecture for VSD inverter compressors
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
