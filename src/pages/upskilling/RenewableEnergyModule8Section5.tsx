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
import { RcdTypeTree } from '@/components/study-centre/diagrams/renewableM8';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm8s5-rcd-types',
    question:
      'What RCD types are recognised by BS 7671 + applicable to heat pump installs?',
    options: [
      'Only Type AC',
      'Type AC (BS EN 61008 — AC fault only, NOT permitted as ADS protection where pulsating DC may occur — heat pumps with VSD electronics produce pulsating DC); Type A (BS EN 62423 — AC + pulsating DC, UK 2025-26 default for heat pumps with simple inverters); Type F (BS EN 62423 — adds high-frequency fault detection, suits some VSD heat pumps); Type B (BS EN 62423 — adds smooth-DC fault detection, required where manufacturer DoC declares smooth-DC > Type A capability)',
      'Type B only',
      'No RCDs',
    ],
    correctIndex: 1,
    explanation:
      'The RCD types defined in BS EN 61008/61009/62423 are: Type AC (BS EN 61008 / BS EN 61009 — AC fault only); Type A (BS EN 62423 — AC + pulsating DC); Type F (BS EN 62423 — adds high-frequency / multi-frequency); Type B (BS EN 62423 — adds smooth DC fault current detection). For heat pump installs: Type AC is NOT permitted as ADS protection because VSD inverter electronics produce pulsating DC fault currents that Type AC fails to detect (Reg 531.3.3 — Type AC permitted only where load contains no DC components). Type A is the UK 2025-26 default for heat pumps with simple inverters. Type F or Type B required where manufacturer DoC declares smooth-DC leakage exceeds Type A capability (typical for advanced VSD compressors). Cert evidence bundle records the chosen RCD type + manufacturer DoC justification.',
  },
  {
    id: 'm8s5-vsd-smooth-dc',
    question:
      'What is "smooth DC fault current" in the context of VSD inverter compressors?',
    options: [
      'Imaginary',
      'Variable-Speed-Drive (VSD) compressors use power electronics (typically IGBT or MOSFET) to rectify AC supply → DC bus → invert DC to variable-frequency AC at the compressor motor. Internal capacitors smooth the DC bus voltage. Insulation fault inside the VSD electronics can leak DC current to earth — Type A / Type AC RCDs cannot detect smooth-DC leakage (they need AC or pulsating DC waveform to operate). Manufacturer DoC declares the expected smooth-DC leakage characteristic',
      'Random',
      'No fault possible',
    ],
    correctIndex: 1,
    explanation:
      'VSD (Variable-Speed-Drive) inverter compressors: heart of the modern heat pump efficiency story. Power electronics (typically IGBT or MOSFET transistors) rectify the incoming AC supply → smooth DC bus voltage → invert that DC into variable-frequency AC at the compressor motor. The variable frequency lets the compressor run at the actual heat demand (not on/off cycling). Internal DC bus capacitors smooth the rectified voltage. Insulation fault scenarios inside the VSD electronics: line-to-earth through the DC bus capacitor can produce SMOOTH DC leakage current to earth (not pulsating, not AC) — and Type A / Type AC RCDs require AC or pulsating DC waveform to trip. Smooth DC saturates the Type A core + prevents tripping → fault not cleared → safety compromised. Manufacturer DoC declares the expected smooth-DC leakage characteristic per the BS EN 61851 / heat pump product standard (in EV context BS EN IEC 62955 specifies the 6 mA smooth-DC detection limit; heat pump manufacturers declare similar). Where smooth-DC exceeds Type A capability, escalate to Type F or Type B RCD.',
  },
  {
    id: 'm8s5-type-b-when',
    question:
      'When does a heat pump install need Type B RCD protection?',
    options: [
      'Always',
      'When manufacturer DoC declares smooth-DC leakage current that exceeds Type A capability. Common in: large commercial heat pumps with sophisticated VSD electronics; ground source heat pumps with more complex power electronics; older heat pump models with less integrated DC-leakage handling. UK 2025-26 typical small-medium domestic ASHP (Vaillant aroTHERM Plus, Mitsubishi Ecodan, Daikin Altherma 3 H, NIBE F2120): manufacturer DoC typically declares Type A acceptable. Always verify per the specific model',
      'Never',
      'Only domestic',
    ],
    correctIndex: 1,
    explanation:
      'Type B RCD requirement depends on the manufacturer DoC + model. UK 2025-26 typical small-medium domestic ASHP (5-12 kW thermal): manufacturer DoC typically declares Type A is acceptable; the VSD electronics include integrated DC-fault management that keeps smooth-DC leakage below Type A threshold. Type B becomes required where: (1) larger commercial / GSHP units with sophisticated VSD; (2) older heat pump models without integrated DC-leakage handling; (3) some specialist applications. Verify per the specific model via manufacturer DoC — read the install manual + electrical specification section. Cost differential: 32 A Type B RCBO ~£150-300 vs Type A ~£40-80; 4-pole equivalents amplify the differential. Cert evidence bundle records: manufacturer DoC declaration + chosen RCD type + rationale. UK 2025-26 mature install practice: check manufacturer DoC every install — don’t assume Type A is universal.',
  },
  {
    id: 'm8s5-type-f',
    question:
      'What is Type F RCD + when does it suit a heat pump install?',
    options: [
      'Same as Type A',
      'Type F (BS EN 62423) is intermediate between Type A and Type B: detects AC + pulsating DC + high-frequency fault currents (up to 1 kHz typical) BUT NOT smooth DC. Suits VSD inverter loads where high-frequency switching creates fault current harmonics that Type A might miss. Some heat pump manufacturers specifically declare Type F or "Type A with high-frequency capability". Less common than Type A or Type B; verify per manufacturer DoC',
      'Not real',
      'Same as Type B',
    ],
    correctIndex: 1,
    explanation:
      'Type F RCD (BS EN 62423) is intermediate between Type A and Type B. Detects: AC fault currents + pulsating DC + high-frequency fault currents (typically up to 1 kHz). Does NOT detect smooth DC fault currents (that needs Type B). Origin: developed for VSD inverter loads where the high-frequency switching of the IGBTs creates fault current harmonics that pure Type A might miss. Some heat pump manufacturers specifically declare "Type F suitable" or "Type A with high-frequency capability" — verify per model. UK 2025-26 install reality: Type F is less common than Type A or Type B in the product market — most installers find a Type A or Type B from the leading manufacturers (Hager, Schneider, Wylex, MK / Honeywell) but Type F products available from specialist suppliers. Cost: typically between Type A and Type B. Cert evidence bundle records: manufacturer DoC declaration + chosen RCD type.',
  },
];

const quizQuestions = [
  {
    question:
      'A 9 kW thermal Vaillant aroTHERM Plus R290 ASHP. Manufacturer DoC: "RCD Type A acceptable". What do you fit?',
    options: [
      'Type AC',
      '32 A Type A RCBO C-curve per manufacturer DoC. BS EN 61009 + BS EN 62423 Type A covers AC + pulsating DC fault currents. 30 mA additional protection integrated. C-curve handles compressor inrush. Verify Zs ≤ Table 41.3 value + RCD trip-time at 1× IΔn ≤300 ms + at 5× IΔn ≤40 ms. Cert evidence bundle records the Type A + manufacturer DoC reference',
      'Type AC permitted',
      'No RCD',
    ],
    correctAnswer: 1,
    explanation:
      'Manufacturer DoC is authoritative: Vaillant aroTHERM Plus R290 internal VSD electronics include integrated DC-leakage handling that keeps smooth-DC below Type A threshold. Manufacturer declares Type A acceptable. Designer fits 32 A Type A RCBO C-curve (BS EN 61009 + BS EN 62423) — straightforward standard protective device. Verification at commissioning: Zs ≤ Table 41.3 (0.68 Ω at 0.4 s for 32 A C-curve on 230 V TN-C-S); RCD trip-time at IΔn (30 mA): ≤300 ms typical actual ~25 ms; trip-time at 5 × IΔn (150 mA): ≤40 ms typical actual ~15 ms. Cert evidence bundle: Hager AD132 (or equivalent) + manufacturer DoC reference + commissioning test results.',
  },
  {
    question:
      'Older heat pump model — manufacturer DoC declares smooth-DC leakage 12 mA. Which RCD?',
    options: [
      'Type A',
      'Type B required. Type A capability for smooth DC is typically rated at ≤6 mA; 12 mA declared smooth-DC leakage exceeds this. Type B (BS EN 62423) detects AC + pulsating DC + smooth DC + high-frequency. Fit 32 A Type B RCBO C-curve. Cost ~£150-300 vs ~£40-80 for Type A. Cert evidence bundle records the manufacturer DoC declaration of 12 mA + Type B selection rationale',
      'Type AC',
      'No protection',
    ],
    correctAnswer: 1,
    explanation:
      'Type A RCD has a typical smooth-DC tolerance of ≤6 mA before saturation prevents reliable AC-fault detection. Manufacturer DoC declares 12 mA smooth-DC leakage → exceeds Type A tolerance → Type B mandatory. Type B (BS EN 62423) detects all fault waveforms: AC + pulsating DC + smooth DC + high-frequency. Fit 32 A Type B RCBO C-curve. UK 2025-26 typical Type B RCBO products: Hager ADC132 (or equivalent), Schneider Vigi Type B (or equivalent), Wylex BSB1B32-2 — all ~£150-300 list. The cost differential is real but the protective integrity is non-negotiable. Cert evidence bundle: manufacturer DoC declaration + Type B selection rationale + commissioning test results.',
  },
  {
    question:
      'Three-phase 16 kW ASHP, manufacturer Type A acceptable per DoC. RCD architecture?',
    options: [
      'Single-pole Type A',
      '4-pole 32 A Type A RCBO C-curve switching all 3 phases + N together. BS EN 61009 + BS EN 62423 4-pole variant. 30 mA additional protection integrated. Verifies per-phase Zs at outdoor unit + 4-pole switch operation at commissioning. Three-phase RCD trip-time per phase tested individually. Cost: 4-pole Type A ~£200-400; 4-pole Type B ~£600-1,200 (significant amplification of single-phase differential)',
      'Type AC',
      'No 4-pole',
    ],
    correctAnswer: 1,
    explanation:
      'Three-phase heat pump dedicated circuit: 4-pole RCBO switching L1 + L2 + L3 + N together. BS EN 61009 + BS EN 62423 4-pole variant. UK 2025-26 typical: Hager AD432 (or equivalent) 4-pole 32 A Type A RCBO C-curve (~£200-400 list). If manufacturer DoC requires Type B: 4-pole Type B RCBO from Hager / Schneider / similar (~£600-1,200) — significant cost differential vs single-phase Type A vs Type B. Three-phase RCD architecture commissioning: trip-time per phase tested individually (L1 fault, L2 fault, L3 fault each tripping the 4-pole device); per-phase Zs verified at outdoor unit terminals; functional test of compressor across all 3 phases. Cert evidence bundle: 4-pole RCBO product + Type + curve + rating + manufacturer DoC + per-phase test results.',
  },
  {
    question:
      'Type AC RCD on a heat pump install — why never appropriate?',
    options: [
      'Allowed',
      'Reg 531.3.3: Type AC permitted only where load contains no DC components. Heat pump VSD inverter compressor inherently produces pulsating DC (from the rectifier + DC bus) + potentially smooth DC. Type AC RCD fails to detect pulsating or smooth DC fault current → no automatic disconnection on insulation fault → safety not assured. Type A minimum; Type F or B if VSD smooth-DC declared by manufacturer',
      'Best choice',
      'No restriction',
    ],
    correctAnswer: 1,
    explanation:
      'Type AC RCD (BS EN 61008 / BS EN 61009 without Type A enhancement) detects only AC fault currents. Reg 531.3.3: "Only to be used for fixed equipment, where it is known that the load current contains no DC components." Heat pumps fail this test by design: VSD inverter compressor takes AC supply → rectifies to DC bus → inverts to variable-frequency AC at the compressor motor. Insulation fault inside the VSD electronics can produce pulsating DC or smooth DC fault current to earth. Type AC RCD core saturates with DC component → cannot detect AC fault component reliably → ADS not assured. Reg 411.4 ADS not met → install non-compliant. UK 2025-26 mature install practice: Type AC NEVER appropriate for any heat pump install. Type A minimum (UK 2025-26 default per manufacturer DoC); Type F or Type B per manufacturer-declared smooth-DC characteristic.',
  },
  {
    question:
      'RCD coordination — heat pump 30 mA RCBO + upstream main RCD or RCDs on other circuits. Issue?',
    options: [
      'No coordination',
      'Reg 536.4.1.4 RCD discrimination: upstream RCD must NOT trip on a fault that the downstream RCD should clear. Time-delay RCD upstream (typically Type S 100 mA or 300 mA with 40 ms time delay) discriminates from downstream 30 mA instantaneous. Common UK 2025-26 domestic CU: upstream Type S 100 mA RCD on main switch + individual 30 mA RCBOs per circuit. Heat pump 30 mA RCBO discriminates downstream of upstream Type S RCD',
      'Upstream irrelevant',
      'Always trip',
    ],
    correctAnswer: 1,
    explanation:
      'RCD discrimination per Reg 536.4.1.4: upstream RCD must NOT trip on a fault that should be cleared by the downstream RCD. Without discrimination, an insulation fault on the heat pump trips both the heat pump RCBO AND the upstream main RCD — taking out the whole installation (loss of fridge, lighting, alarms, etc.). UK 2025-26 typical domestic CU architecture: (1) main RCD Type S (time-delayed, 40 ms intentional delay) at 100 mA or 300 mA — provides bulk RCD protection + discriminates from downstream instantaneous RCDs; (2) individual 30 mA RCBOs per circuit — instantaneous trip on downstream fault. The Type S delay lets the downstream 30 mA RCBO clear first; main RCD stays in. Heat pump 30 mA RCBO sits at the downstream level. Cert evidence bundle: RCD architecture + discrimination verified by sequential trip-time test (downstream first, upstream after delay).',
  },
  {
    question:
      'How to find the manufacturer DoC smooth-DC declaration for a specific heat pump model?',
    options: [
      'Guess',
      'Manufacturer install manual + electrical specification section + DoC document. Search for: "RCD type", "RCD compatibility", "earth leakage current", "smooth DC", "DC fault current" — terminology varies by manufacturer. Examples: Vaillant aroTHERM Plus R290 install manual electrical-specification section RCD; Mitsubishi Ecodan electrical specification + DoC; Daikin install handbook "electrical connection requirements"; NIBE design manual. If unclear, contact manufacturer technical support. Cert evidence bundle records the declaration + reference',
      'No way to find',
      'Not declared',
    ],
    correctAnswer: 1,
    explanation:
      'Manufacturer DoC + install manual are the authoritative sources. Where to look: (1) Install manual electrical specification section — usually labelled "electrical connection requirements" or "RCD compatibility" or similar. (2) Declaration of Conformity (DoC) document — issued under UKCA / CE marking. (3) Manufacturer technical bulletin specific to RCD compatibility. Terminology varies: "RCD type required", "earth leakage current", "smooth DC fault current", "DC component of leakage current", "RCD compatibility". Examples: Vaillant aroTHERM Plus R290 install manual electrical-specification section explicitly addresses RCD type; Mitsubishi Ecodan electrical spec + DoC; Daikin install handbook "electrical connection requirements" section; NIBE F2120 design manual chapter on electrical install. If declaration unclear or absent: contact manufacturer technical support directly. UK 2025-26 mature install practice: verify the declaration on every install — don’t assume Type A is universal across the product range. Cert evidence bundle records: manufacturer + model + install manual section + DoC reference + RCD type declared.',
  },
];

const faqs = [
  {
    question: 'Does the heat pump have its own internal RCD?',
    answer:
      'Some models include internal RCD-equivalent protection within the VSD electronics (similar pattern to the OPDD-equivalent for EVs). This does NOT replace the BS 7671 supply-side RCD requirement — Reg 415.1.1 30 mA additional protection still applies at the supply circuit. Internal protection is the manufacturer’s additional layer; the BS 7671 RCD is the supply-side regulatory requirement.',
  },
  {
    question: 'Cost differential Type A vs Type B RCBO — UK 2025-26 indicative?',
    answer:
      'Single-pole 32 A: Type A ~£40-80; Type F ~£70-130; Type B ~£150-300. 4-pole 32 A: Type A ~£200-400; Type B ~£600-1,200. Significant differential when scaled to multi-charger or commercial sites. Verify manufacturer DoC before scaling Type B; some installers default to Type B unnecessarily.',
  },
  {
    question: 'Can I use a Type A RCBO + separate Type B RCD downstream?',
    answer:
      'Architecturally possible but uncommon: Type A RCBO provides overcurrent + AC/pulsating DC protection; downstream Type B-equivalent (or Type B RCM monitoring with separate alarm) adds smooth-DC capability. Cost similar to single Type B RCBO. UK 2025-26 mature practice: single Type B RCBO is the cleaner solution where required. Cert evidence bundle records the architecture.',
  },
  {
    question: 'What about Type A with 6 mA RDC-DD (mirroring M6 EV)?',
    answer:
      'EV pattern (M6 / M7): Type A RCBO + RDC-DD detection element per BS EN IEC 62955 specifically designed for EV smooth-DC at 6 mA. Heat pumps don’t have the same regulatory framework — heat pump industry uses Type A / F / B selection per manufacturer DoC + the BS 7671 standard RCD types (BS EN 62423). No equivalent "RDC-DD for heat pumps" product category in UK 2025-26.',
  },
  {
    question: 'EICR finding: Type A on a heat pump where Type B was required?',
    answer:
      'C1 (immediate danger) potentially — depends on whether the smooth-DC leakage is actively present + whether ADS is therefore not assured under fault conditions. Practical: C2 (potential danger) typical, with recommendation to upgrade to Type B. Manufacturer DoC reviewed; existing RCD trip-time tested; recommendation in EICR. Customer informed; upgrade scheduled.',
  },
];

export default function RenewableEnergyModule8Section5() {
  const navigate = useNavigate();

  useSEO({
    title: 'RCD architecture for VSD inverter compressors | Renewable Energy 8.5 | Elec-Mate',
    description:
      'Heat pump RCD architecture — Type AC / A / F / B per BS EN 62423, smooth-DC fault current from VSD inverter compressors, manufacturer DoC declaration, RCD discrimination, three-phase 4-pole. Reg 415.1.1 + Reg 531.3.3 + Reg 536.4.1.4 framework.',
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
            eyebrow="Module 8 · Section 5 · BS 7671:2018+A4:2026 · Reg 415.1.1 + Reg 531.3.3 + BS EN 62423"
            title="RCD architecture for VSD inverter compressors"
            description="The smooth-DC question reappears. Type AC / A / F / B per BS EN 62423; VSD inverter compressor smooth-DC fault current; manufacturer DoC declaration as the authoritative source; UK 2025-26 typical install patterns; RCD discrimination + three-phase 4-pole architecture."
            tone="yellow"
          />

          <TLDR
            points={[
              'VSD (Variable-Speed-Drive) inverter compressors produce pulsating DC + potentially smooth DC fault current under insulation fault. Type AC RCD cannot detect these — Reg 531.3.3 prohibits Type AC where DC components present.',
              'BS EN 62423 RCD types: Type A (AC + pulsating DC, UK 2025-26 default), Type F (adds high-frequency), Type B (adds smooth DC).',
              'Manufacturer DoC declares the RCD type required for the specific heat pump model. UK 2025-26 typical small-medium domestic ASHP: Type A acceptable per manufacturer DoC.',
              'Type B required where manufacturer DoC declares smooth-DC leakage > Type A capability (typically 6 mA). Common for: large commercial / GSHP units, older models, specialist applications.',
              'Type F intermediate: AC + pulsating DC + high-frequency, NOT smooth DC. Less common in UK product market.',
              '30 mA additional protection per Reg 415.1.1 — integrated into the RCBO. Trip-time verification at 1× IΔn ≤300 ms and at 5× IΔn ≤40 ms.',
              'RCD discrimination per Reg 536.4.1.4 — upstream Type S 100 mA RCD discriminates from downstream 30 mA RCBO via 40 ms time delay.',
              'Three-phase: 4-pole RCBO switching all 3 phases + N. Cost differential vs single-phase amplified for Type B (4-pole Type B ~£600-1,200 vs single-phase Type B ~£150-300).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish RCD Types AC / A / F / B per BS EN 62423 and identify the fault-current waveforms each detects.',
              'Apply Reg 531.3.3 to exclude Type AC from heat pump installs (DC components inherent to VSD inverter).',
              'Verify manufacturer DoC declaration of RCD type required per heat pump model.',
              'Determine when Type B is required (manufacturer-declared smooth-DC leakage > Type A capability ~6 mA).',
              'Apply Reg 415.1.1 30 mA additional protection + Reg 536.4.1.4 RCD discrimination.',
              'Select 4-pole RCD for three-phase heat pump dedicated circuit + recognise cost amplification.',
              'Test RCD trip-time at 1× IΔn (≤300 ms) and 5× IΔn (≤40 ms) per Reg 643.8 + BS EN 61557-6.',
              'Document the RCD architecture + manufacturer DoC + commissioning test results in the cert evidence bundle.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            VSD inverter compressors brought heat pump efficiency to where it is today. They also brought the smooth-DC question back into the install conversation. The RCD type is not a default — it is a per-model design decision.
          </Pullquote>

          <ContentEyebrow>Why the RCD type matters for heat pumps</ContentEyebrow>

          <ConceptBlock
            title="VSD inverter compressors — how the smooth DC arises"
            plainEnglish="Modern heat pumps use Variable-Speed-Drive (VSD) inverter compressors for efficiency. Power electronics rectify the incoming AC supply → smooth DC bus voltage → invert that DC into variable-frequency AC at the compressor motor. The variable frequency lets the compressor match the actual heat demand instead of cycling on/off. Internal DC bus capacitors smooth the rectified voltage."
            onSite="Insulation fault inside the VSD electronics can produce pulsating DC or smooth DC fault current to earth — not AC. RCDs that detect only AC waveforms (Type AC) cannot trip on these fault currents. Type A handles AC + pulsating DC; Type F adds high-frequency; Type B adds smooth DC. Manufacturer DoC declares the specific fault-current characteristic per model."
          >
            <p>VSD compressor electrical architecture:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Rectifier stage</strong> —
                converts incoming 230 V AC (or 400 V three-phase AC) to DC bus voltage
                (~325 V single-phase peak or ~565 V three-phase peak). Uses diode bridge
                or PFC (Power Factor Correction) front-end
              </li>
              <li>
                <strong className="text-white">DC bus capacitors</strong> —
                smooth the rectified voltage. Electrolytic capacitors typically ~2,000 μF
                in domestic heat pumps. Smooth-DC characteristic in steady-state
              </li>
              <li>
                <strong className="text-white">Inverter stage</strong> —
                IGBT or MOSFET power electronics switch the DC bus at high frequency
                (typically 4-16 kHz) to synthesise variable-frequency AC at the
                compressor motor. PWM (Pulse Width Modulation) waveform creates the
                variable-frequency output
              </li>
              <li>
                <strong className="text-white">Compressor motor</strong> —
                permanent magnet or induction motor; runs at the synthesised variable
                frequency. Variable frequency = variable speed = variable heat output
              </li>
              <li>
                <strong className="text-white">Insulation fault to
                  earth</strong> — can occur in any electrical part: rectifier
                bridge fault → pulsating DC leakage; DC bus capacitor fault → smooth DC
                leakage; inverter IGBT fault → high-frequency leakage; motor winding
                fault → AC leakage at variable frequency. Different fault locations
                produce different waveforms
              </li>
              <li>
                <strong className="text-white">RCD detection
                  requirement</strong> — protective RCD must detect whichever waveform
                the manufacturer’s VSD design can produce under credible fault
                conditions
              </li>
              <li>
                <strong className="text-white">Modern integrated
                  protection</strong> — UK 2025-26 typical small-medium domestic ASHP
                includes integrated internal protection that limits the smooth-DC
                fault current to within Type A capability — manufacturer DoC declares
                Type A acceptable
              </li>
              <li>
                <strong className="text-white">Larger units +
                  older models</strong> — may produce smooth-DC fault current exceeding
                Type A capability → Type B required per manufacturer DoC
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="BS EN 62423 RCD types — what each detects"
            plainEnglish="BS EN 62423 defines RCD types by the fault current waveforms they detect. Type AC (legacy BS EN 61008 / 61009) — AC only; Type A — AC + pulsating DC; Type F — AC + pulsating DC + high-frequency; Type B — all of the above + smooth DC. Selection per manufacturer DoC."
            onSite="UK 2025-26 product market reality: Type A is the default; Type B is the premium product (3-5× cost); Type F is the specialist intermediate (limited product range)."
          >
            <p>RCD type capabilities:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Type AC (legacy)</strong> —
                BS EN 61008 / 61009. Detects AC fault current only. Reg 531.3.3:
                "Only to be used for fixed equipment, where it is known that the load
                current contains no DC components." NEVER appropriate for VSD heat pump
              </li>
              <li>
                <strong className="text-white">Type A</strong> — BS EN 62423.
                Detects AC + pulsating DC (half-wave rectified). Tolerates smooth-DC
                leakage up to ~6 mA before saturation. UK 2025-26 default for heat pumps
                where manufacturer declares smooth-DC ≤6 mA
              </li>
              <li>
                <strong className="text-white">Type F</strong> — BS EN 62423.
                Detects AC + pulsating DC + composite waveforms + high-frequency (up to
                ~1 kHz). Develops for VSD inverter loads where high-frequency switching
                creates fault current harmonics. Less common in UK product range
              </li>
              <li>
                <strong className="text-white">Type B</strong> — BS EN 62423.
                Detects AC + pulsating DC + smooth DC + composite + high-frequency.
                Complete fault-current waveform coverage. Required where manufacturer
                DoC declares smooth-DC leakage &gt; Type A capability
              </li>
              <li>
                <strong className="text-white">UK 2025-26 product
                  market</strong> — Type A widely available from all leading
                manufacturers (Hager, Schneider, Wylex, MK / Honeywell). Type B
                available but specialist sourcing. Type F limited product range
              </li>
              <li>
                <strong className="text-white">Cost differential</strong>
                — single-pole 32 A: Type A ~£40-80; Type F ~£70-130; Type B ~£150-300.
                4-pole 32 A: Type A ~£200-400; Type B ~£600-1,200
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — RCD product + Type + curve + rating + manufacturer
                DoC + verification trip-time at 1× and 5× IΔn
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 531.3.3 — RCD type selection based on load DC content"
            clause="The selection of an RCD shall take account of the characteristics of the equipment to be protected. Type AC RCDs shall only be used for fixed equipment where it is known that the load current contains no DC components."
            meaning="Reg 531.3.3 is the categorical regulatory anchor for excluding Type AC RCDs from heat pump installs. Heat pumps with VSD inverter compressors INHERENTLY contain DC components in their load current (rectifier + DC bus + inverter architecture). Type AC RCD therefore cannot be used as ADS protection or as 30 mA additional protection. Type A minimum is the universal answer; Type F or Type B per manufacturer DoC. UK 2025-26 install practice: confirm the manufacturer DoC declaration; select RCD type accordingly; verify trip-time at commissioning per Reg 643.8 + BS EN 61557-6. Cert evidence bundle records: manufacturer DoC + RCD type chosen + rationale + commissioning trip-time results."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Manufacturer DoC + product selection</ContentEyebrow>

          <Pullquote>
            The manufacturer DoC is the authoritative answer to "which RCD type?" — not the installer’s default, not the wholesaler’s stock, not what was fitted on the last job.
          </Pullquote>

          <ConceptBlock
            title="Reading the manufacturer DoC for RCD type"
            plainEnglish={`The heat pump manufacturer’s install manual + DoC declare the RCD type required for the specific model. Terminology varies: "RCD type required", "earth leakage current", "smooth DC fault current", "DC component of leakage current", "RCD compatibility". Verify per every install — don’t assume Type A is universal across the product range.`}
            onSite={`UK 2025-26 examples: Vaillant aroTHERM Plus R290 install manual electrical-specification section — Type A acceptable; Mitsubishi Ecodan electrical spec + DoC — Type A acceptable for standard models, Type B specified for some larger commercial variants; Daikin install handbook "electrical connection requirements" — Type A acceptable per most models; NIBE F2120 design manual — Type A acceptable. If declaration unclear or absent: contact manufacturer technical support.`}
          >
            <p>Manufacturer DoC reading methodology:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Install manual</strong> —
                electrical specification section (typically "Electrical Connection
                Requirements", "RCD Compatibility", "Earth Leakage", or similar
                heading)
              </li>
              <li>
                <strong className="text-white">Declaration of
                  Conformity</strong> — issued under UKCA / CE marking; references
                applicable standards (BS EN 61851, BS EN 62423, etc.) + product test
                results
              </li>
              <li>
                <strong className="text-white">Technical bulletin</strong>
                — some manufacturers issue model-specific bulletins clarifying RCD
                compatibility. Check the manufacturer website / installer portal
              </li>
              <li>
                <strong className="text-white">Terminology to find</strong>
                — "RCD type required", "earth leakage current", "DC component of
                leakage current", "smooth DC fault current", "RCD compatibility",
                "leakage to earth"
              </li>
              <li>
                <strong className="text-white">Type A acceptable</strong>
                — most UK 2025-26 small-medium domestic ASHP. The manufacturer has
                designed internal protection that keeps smooth-DC leakage below the
                Type A threshold (~6 mA)
              </li>
              <li>
                <strong className="text-white">Type B required</strong>
                — manufacturer declares smooth-DC leakage &gt; Type A threshold.
                Typically larger commercial units, older models, or specialist
                applications
              </li>
              <li>
                <strong className="text-white">Type F suitable</strong>
                — manufacturer specifically declares Type F or "Type A with
                high-frequency capability". Less common
              </li>
              <li>
                <strong className="text-white">If unclear or
                  absent</strong> — contact manufacturer technical support; document the
                response in the cert evidence bundle
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — manufacturer + model + install manual section + DoC
                reference + RCD type declared + chosen product
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="RCD discrimination + Reg 536.4.1.4"
            plainEnglish="Reg 536.4.1.4 RCD discrimination: upstream RCD must NOT trip on a fault that the downstream RCD should clear. Without discrimination, an insulation fault on the heat pump trips both the heat pump RCBO AND the upstream main RCD — taking out the whole installation."
            onSite="UK 2025-26 typical domestic CU architecture: main RCD Type S (time-delayed, 40 ms intentional delay) at 100 mA or 300 mA + individual 30 mA RCBOs per circuit. The Type S delay lets the downstream 30 mA RCBO clear first; main RCD stays in. Heat pump 30 mA RCBO sits at the downstream level."
          >
            <p>Discrimination architecture:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Upstream main
                  RCD</strong> — Type S (time-delayed, 40-150 ms intentional delay) at
                100 mA or 300 mA. Provides bulk protection + discriminates from
                downstream instantaneous
              </li>
              <li>
                <strong className="text-white">Downstream
                  RCBO</strong> — heat pump dedicated circuit RCBO at 30 mA. Instantaneous
                trip on downstream fault. Clears before upstream Type S
              </li>
              <li>
                <strong className="text-white">Discrimination
                  verification</strong> — at commissioning, induce a downstream fault
                (test button at the RCBO); verify only the RCBO trips, main RCD stays
                in. Sequential testing
              </li>
              <li>
                <strong className="text-white">Two-tier vs
                  single-tier CU</strong> — some older CUs have only single-tier 30 mA
                RCDs covering whole circuits group. Inferior discrimination; upgrade
                to two-tier architecture during heat pump install is good practice
              </li>
              <li>
                <strong className="text-white">CU change typical
                  scope</strong> — UK 2025-26 retrofit heat pump install often triggers
                CU change to two-tier architecture; cost £400-800 typical (excluding
                Type B if required)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — CU architecture + RCD types + discrimination test
                results + sequence verified
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 415.1.1 — Additional protection: RCD"
            clause="The use of RCDs having a rated residual operating current (IΔn) not exceeding 30 mA and an operating time not exceeding 40 ms at a residual current of 5 IΔn is recognised in alternating-current systems as additional protection in the event of failure of the provision for basic protection and/or the provision for fault protection or carelessness by users."
            meaning="Reg 415.1.1 is the additional-protection RCD requirement. Heat pump dedicated circuits MUST be protected by 30 mA RCD (typically integrated into the RCBO). Operating time at IΔn ≤300 ms (standard); at 5 × IΔn ≤40 ms (fast trip on heavy fault). UK 2025-26 mature install practice: integrated RCBO (residual current operated circuit-breaker with overcurrent protection) at 30 mA is the standard product — combines overcurrent + RCD + Type A/F/B in one unit. Verification at commissioning per Reg 643.8 + BS EN 61557-6: trip-time at IΔn (typical actual 20-50 ms); trip-time at 5 × IΔn (typical actual 10-20 ms). Cert evidence bundle records: RCBO product + IΔn rating + Type + trip-time at 1× and 5× IΔn."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <RcdTypeTree caption="Choosing the RCD type for a heat pump — the manufacturer's DoC first, then by the DC fault current the inverter compressor can produce (Type A for pulsating, Type B or Type A + RDC-DD for smooth DC)." />

          <SectionRule />

          <Scenario
            title="Standard UK 2025-26 domestic ASHP — Type A acceptable per manufacturer DoC"
            situation={`9 kW thermal Vaillant aroTHERM Plus R290. Install manual electrical-specification section states: "RCD Type A is acceptable. Smooth-DC fault current limited by integrated protection to ≤4 mA under credible fault conditions." Existing 12-way CU has spare ways + Type S 100 mA main RCD. Customer’s electrician is experienced with the model.`}
            whatToDo="Fit Hager AD132 (or equivalent) 32 A Type A RCBO C-curve at the dedicated heat pump CU way. 30 mA additional protection integrated. Cable + ADS + Zs per §8.4 worked example. RCD commissioning per Reg 643.8 + BS EN 61557-6: trip-time at IΔn (30 mA) typical actual 25 ms (≤300 ms limit); trip-time at 5 × IΔn (150 mA) typical actual 15 ms (≤40 ms limit). RCD discrimination test: induce downstream fault at the heat pump RCBO test button; verify only the RCBO trips, main Type S 100 mA RCD stays in. Functional test: heat pump powered on, compressor starts smoothly, defrost cycle exercised, immersion functional. Cert evidence bundle: Hager AD132 (or equivalent) product + Vaillant install manual reference + manufacturer electrical-specification declaration + RCD trip-time at 1× and 5× IΔn + discrimination test result + functional test result. EIC delivered to MCS company."
            whyItMatters="Dominant UK 2025-26 install scenario. Manufacturer DoC clear; Type A product widely available; commissioning straightforward. Cert evidence bundle clean. Total RCBO scope: ~£60 + 1 hour labour. Mirrors the M6 EV pattern where most modern wallboxes declare Type A acceptable due to integrated RDC-DD function."
          />

          <Scenario
            title="Older commercial heat pump model — Type B required per manufacturer DoC"
            situation={`Light commercial install: 24 kW thermal three-phase heat pump for a small office building. Manufacturer install manual (older heat pump from a specialist supplier): "RCD Type B required. Smooth-DC fault current may exceed 10 mA under fault conditions due to VSD architecture." Three-phase 100 A per phase supply; new dedicated three-phase CU + heat pump dedicated way.`}
            whatToDo="Fit 4-pole Hager ADC432 (or equivalent) 32 A Type B RCBO C-curve at the dedicated way. 30 mA additional protection integrated. Cost: ~£800 list for the 4-pole Type B (~3-4× a Type A equivalent — significant differential at three-phase). Cable: 6 mm² 5-core SWA + per-phase Zs verification at outdoor unit (each ≤ Table 41.3 ~0.68 Ω for 32 A C-curve 230 V). Phase rotation verified L1→L2→L3 with phase-sequence tester before energising. RCD commissioning: trip-time per phase tested individually (L1 fault, L2 fault, L3 fault each tripping the 4-pole device); at IΔn (30 mA): typical actual 30 ms (≤300 ms); at 5 × IΔn (150 mA): typical actual 18 ms (≤40 ms). Discrimination verified vs upstream Type S RCD. Functional test: three-phase compressor starts; defrost cycle; immersion. Cert evidence bundle: 4-pole Type B RCBO product + manufacturer DoC declaration of 10 mA smooth-DC + Type B rationale + per-phase test results + cost-justification documentation."
            whyItMatters={`Type B install scenario — less common in UK 2025-26 domestic but real in commercial / older models. Cost differential is significant + must be flagged at quote stage (customer / MCS company expectation). The protective integrity is non-negotiable: smooth-DC > Type A capability means Type B is the only compliant choice. Cert evidence bundle is rich with the manufacturer DoC declaration + commissioning test results.`}
          />

          <CommonMistake
            title="Defaulting to Type AC RCD on a heat pump install"
            whatHappens="Installer fits Type AC RCD (cheap, widely stocked) on a heat pump dedicated circuit. Reg 531.3.3 violation. VSD inverter compressor produces pulsating DC under insulation fault → Type AC core saturates → no automatic disconnection → ADS not assured under fault. Install non-compliant; EICR finding C2 or C1 depending on severity; customer’s warranty challenge if anything goes wrong."
            doInstead={`Type AC NEVER appropriate for any heat pump install. Reg 531.3.3: "Only to be used for fixed equipment, where it is known that the load current contains no DC components." VSD inverter compressors inherently contain DC components. Type A minimum (per manufacturer DoC); Type F or Type B if manufacturer declares smooth-DC > Type A capability. Cert evidence bundle records the RCD type + manufacturer DoC justification.`}
          />

          <CommonMistake
            title="Defaulting to Type B on every heat pump install (over-engineering)"
            whatHappens="Installer defaults to Type B RCBO on every heat pump install regardless of manufacturer DoC. Customer pays ~3-5× cost differential vs Type A (single-pole 32 A: ~£150-300 vs ~£40-80; 4-pole 32 A: ~£600-1,200 vs ~£200-400). Over scaled commercial / multi-unit installs, cost adds up significantly. Customer / MCS company queries the cost."
            doInstead="Read the manufacturer DoC. UK 2025-26 most domestic ASHP models declare Type A acceptable (integrated DC-fault management). Type B is the correct answer only where manufacturer declares smooth-DC > Type A capability. Default Type A + verify per model. Cert evidence bundle records the manufacturer DoC + rationale for the chosen RCD type."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'VSD inverter compressors produce pulsating DC + potentially smooth DC fault currents. Type AC RCD cannot detect — Reg 531.3.3 prohibits Type AC on heat pump installs.',
              'BS EN 62423 RCD types: Type A (AC + pulsating DC), Type F (adds high-frequency), Type B (adds smooth DC). Selection per manufacturer DoC.',
              'UK 2025-26 typical small-medium domestic ASHP: Type A acceptable per manufacturer DoC. Integrated DC-fault management keeps smooth-DC ≤6 mA threshold.',
              'Type B required where manufacturer DoC declares smooth-DC leakage > Type A capability (typically older models, larger commercial, GSHP).',
              'Type F intermediate: AC + pulsating DC + high-frequency, NOT smooth DC. Less common in UK product market.',
              'Manufacturer DoC + install manual is the authoritative source. Verify per every install — do not assume Type A is universal.',
              'Reg 415.1.1 30 mA additional protection — integrated into the RCBO. Trip-time at 1× IΔn ≤300 ms; at 5× IΔn ≤40 ms.',
              'Reg 536.4.1.4 RCD discrimination — upstream Type S 100 mA RCD + downstream 30 mA RCBO. Sequential trip verification at commissioning.',
              'Three-phase: 4-pole RCBO switching L1 + L2 + L3 + N. Cost differential amplified for Type B (4-pole Type B ~£600-1,200 vs single-phase ~£150-300).',
              'Cost differential single-pole 32 A: Type A ~£40-80; Type F ~£70-130; Type B ~£150-300. UK 2025-26 indicative.',
              'Cert evidence bundle: RCD product + Type + curve + rating + manufacturer DoC reference + commissioning trip-time at 1× and 5× IΔn + discrimination verified.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Wiring + dedicated circuit + ADS
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.6 Backup immersion + DHW cylinder integration
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
