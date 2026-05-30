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
    id: 'm2s3-series-parallel',
    question:
      'A PV string of 12 modern 60-cell modules connected in series, each with V_oc = 41.6 V and I_sc = 12.5 A at STC. What are the string V_oc and string I_sc?',
    options: [
      'String V_oc = 41.6 V, string I_sc = 12.5 × 12 A',
      'Series connection adds voltages, current is shared: string V_oc = 12 × 41.6 V = 499 V, string I_sc = 12.5 A (the same as a single module — current does NOT add in series)',
      'String V_oc = 41.6 V / 12, string I_sc = 12.5 A',
      'Both V and I multiply by 12',
    ],
    correctIndex: 1,
    explanation:
      'Series stacking sums the voltages while the current stays at the single-module value (the same current flows through every module in series). Twelve modules with V_oc 41.6 V each in series produce string V_oc = 499 V at STC. The string I_sc equals the I_sc of any single module — 12.5 A. This is the foundation of string architecture: series for voltage, parallel for current.',
  },
  {
    id: 'm2s3-cold-day-voc',
    question:
      'The same 12-module string (V_oc 41.6 V per module at STC, V_oc temperature coefficient -0.27 %/°C) on a UK winter morning with cell temperature of -5°C. What is the cold-morning string V_oc, and what design check does this drive?',
    options: [
      '499 V — same as STC',
      'At -5°C (30°C below STC reference 25°C), V_oc rises: 12 × 41.6 × (1 + 30 × 0.0027) ≈ 540 V. The design check: 540 V must remain below the inverter\'s absolute maximum DC input voltage (typically 600 V or 1000 V) with margin',
      '300 V',
      '1000 V',
    ],
    correctIndex: 1,
    explanation:
      'Cold-morning V_oc is the most-missed string sizing calculation. V_oc rises with falling temperature (the negative temperature coefficient means cooler = more voltage). For a -0.27 %/°C V_oc coefficient and 30°C below STC reference: V_oc increases by 30 × 0.27% = 8.1%. String V_oc rises from 499 V (STC) to ~540 V (winter morning). This must be below the inverter\'s absolute maximum DC input voltage — typically 600 V for residential inverters, 1000 V for larger systems. Missing this calculation puts the string voltage above the inverter limit on cold sunny mornings and can damage the inverter input stage.',
  },
  {
    id: 'm2s3-712-431-exemption',
    question:
      'BS 7671 Reg 712.431 sets the requirement for PV string overcurrent protective devices. What is the exemption for small arrays?',
    options: [
      'No exemption — every string needs an overcurrent protective device',
      'In a PV array with one PV string or two PV strings in parallel, no overcurrent protective device is required for the strings. The string-protection rules apply only to arrays with more than two strings in parallel',
      'Exemption only for off-grid systems',
      'Exemption only for arrays under 1 kWp',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.431 is explicit on the small-array exemption: arrays with 1 or 2 strings in parallel require no string-level overcurrent protective devices. This reflects the physics — with only 1 or 2 strings, there isn\'t enough back-feed current from the other parallel strings to require per-string protection. The exemption disappears as soon as you have 3+ strings in parallel, where back-feed current from the other strings can exceed a single string\'s rated capacity.',
  },
  {
    id: 'm2s3-712-431-inequality',
    question:
      'In a PV array with more than 2 strings in parallel, Reg 712.431 applies an inequality to determine when string-level protection is required. What is it?',
    options: [
      'V_oc > 600 V',
      'Protective devices shall be provided to protect each PV string where: 1.35 × Imop_max_ocer < (Ns - 1) × Isc_max — i.e. where the scaled maximum operating current is less than the back-feed current from the other (Ns-1) parallel strings',
      'P_max > 10 kW',
      'Number of modules > 24',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.431\'s inequality compares the scaled operating current of a single string against the back-feed current the other parallel strings could push into it under fault. The 1.35 factor is the scaling on the operating current; Ns is the total number of parallel strings; Isc_max is the maximum short-circuit current per string. In practice, for 3 or more parallel strings, the inequality usually holds (1.35 < (Ns-1) for Ns ≥ 3 when Imop ≈ Isc), meaning per-string overcurrent protection is required. Reg 712.433.101.1 defines how Upc_max and Isc_max are calculated.',
  },
  {
    id: 'm2s3-mismatch-losses',
    question:
      'A string of 12 modules — 11 modules from Manufacturer A with V_oc 41.6 V, I_sc 12.5 A, and 1 replacement module from Manufacturer B with V_oc 40.0 V, I_sc 13.3 A (different make, different electrical characteristics). What is the mismatch impact on the string?',
    options: [
      'No impact — modules in series average out',
      'The series string is limited by the weakest module. The 13.3 A I_sc module is limited to carry only 12.5 A (the rest-of-string current), losing 0.8 A of its capacity. The voltage difference also creates a small loss as the operating point shifts. Typical mismatch losses on the order of 2–5% per mixed module',
      'The string voltage doubles',
      'The whole array shuts down',
    ],
    correctIndex: 1,
    explanation:
      'Series strings are current-limited — the weakest module sets the string current. Mismatched modules in the same string operate below their individual MPP, losing the difference as efficiency. The PWI grounding flags &ldquo;mixing different Voc modules in the same string&rdquo; and &ldquo;mixing module orientations in same string&rdquo; as high-frequency installer errors. The fix: never mix module makes/models in a single string; if a module is replaced, replace the whole string OR move the mismatched module to a separate string on a different MPPT input.',
  },
  {
    id: 'm2s3-multi-pitch',
    question:
      'A customer has PV modules across two roof pitches at different orientations (south and east). What is the right architectural decision?',
    options: [
      'Connect all modules into one string',
      'Run the two banks as separate strings, either into an inverter with multiple MPPT inputs (one MPPT per orientation) or into two separate inverters / micro-inverters / power optimisers. Each bank operates at its own MPP without mismatch loss',
      'Tilt all modules to face south',
      'Refuse the install',
    ],
    correctIndex: 1,
    explanation:
      'Modules at different orientations produce different currents (proportional to irradiance) at any moment. Combining them into one string forces the lower-irradiance bank to drag the higher-irradiance bank down — mismatch loss often 10–30%. The two architectural fixes: (1) separate strings into separate MPPT inputs on a multi-MPPT inverter (the typical solution for residential hybrid inverters with 2–3 MPPTs); (2) module-level optimisation via microinverters or power optimisers (where each module operates independently — Section 2.5 covers this in detail).',
  },
  {
    id: 'm2s3-mppt-range',
    question:
      'When sizing a PV string against an inverter, three voltage parameters must align. What are they, and what\'s the design rule for each?',
    options: [
      'Just V_oc',
      'V_oc string at cold-morning minimum cell temperature must be BELOW the inverter\'s absolute maximum DC input voltage (with margin); V_mp string at MPP operating temperature must sit within the inverter\'s MPPT voltage range (between MPPT min and MPPT max); V_mp string at the hottest operating temperature must remain above the inverter\'s MPPT minimum voltage',
      'Only the MPPT maximum matters',
      'Voltage doesn\'t matter, only power',
    ],
    correctIndex: 1,
    explanation:
      'Three voltage rules govern PV string-to-inverter compatibility. (1) Cold-morning V_oc < inverter absolute maximum DC input — protects against over-voltage damage to the inverter input stage. (2) Hot-day V_mp > inverter MPPT minimum — without this, the inverter cannot track the MPP and yield drops. (3) Cool-condition V_mp < inverter MPPT maximum — without this, the inverter is forced to operate the string off-MPP, losing yield. All three calculations are mandatory parts of an MCS MIS 3002 compliant PV design pack.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A residential PV install proposes a single string of 14 modules (V_oc 41.6 V per module at STC, V_oc temperature coefficient -0.27%/°C) into a hybrid inverter with absolute maximum DC input of 600 V. The design minimum cell temperature for the site is -10°C. What is the cold-morning string V_oc and is the design compliant?',
    options: [
      'String V_oc = 582 V at STC, design compliant',
      'STC string V_oc = 14 × 41.6 = 582 V. Cold-morning rise: 35°C below STC × 0.27%/°C = 9.45% increase. Cold-morning V_oc = 582 × 1.0945 ≈ 637 V. This EXCEEDS the inverter\'s 600 V absolute maximum — the string is one module too long; reduce to 13 modules',
      'String V_oc = 200 V, design compliant',
      'String V_oc = 1000 V, design compliant',
    ],
    correctAnswer: 1,
    explanation:
      'STC V_oc = 14 × 41.6 = 582.4 V. Cold-morning V_oc rise = (25 - (-10)) °C × 0.27 %/°C = 35 × 0.27 = 9.45% increase. Cold-morning V_oc = 582.4 × 1.0945 ≈ 637 V. This exceeds the inverter\'s 600 V absolute maximum input — the string would over-voltage the inverter on cold sunny mornings, potentially damaging the input stage. The fix: reduce the string to 13 modules (13 × 41.6 × 1.0945 ≈ 591 V — within the 600 V limit with margin). This is the single most-common UK PV design error.',
  },
  {
    id: 2,
    question:
      'A 6 kWp domestic PV system uses 4 parallel strings of 4 modules each (4 × 4 = 16 modules), each module 380 W. Reg 712.431 applies the inequality 1.35 × Imop_max_ocer < (Ns - 1) × Isc_max. Is per-string overcurrent protection required?',
    options: [
      'No — single string only',
      'Yes — 4 parallel strings > 2 triggers the inequality check. With typical residential module values (Imop_max ≈ 11 A, Isc_max ≈ 12 A, Ns = 4): 1.35 × 11 = 14.85 A vs (4-1) × 12 = 36 A. 14.85 < 36 → inequality met, per-string protection required',
      'Only if string voltage > 1000 V',
      'No protection required at any string count',
    ],
    correctAnswer: 1,
    explanation:
      'Four parallel strings exceeds the two-string exemption, so Reg 712.431 inequality applies. With typical module values the inequality is comfortably met (14.85 < 36), so per-string overcurrent protective devices are required. The practical implementation: per-string fuses in the array combiner box (typically gPV fuses to BS EN 60269-6, rated per the calculation — usually 1.25–1.5× Isc_max). For 1 or 2 string designs, no string-level overcurrent protection is required regardless of the inequality result.',
  },
  {
    id: 3,
    question:
      'A customer with a two-pitch roof (south and east) asks for PV across both. The east-facing bank gets morning sun; the south bank gets midday-to-afternoon sun. What is the right design architecture?',
    options: [
      'Combine all modules into a single string',
      'Two separate strings — south bank as one string, east bank as another. Connect each string to a separate MPPT input on the inverter (most modern residential hybrid inverters have 2 MPPTs). Each string operates independently at its own MPP without dragging the other',
      'Use only the south-facing roof',
      'Mix the strings randomly',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-orientation arrays demand multi-MPPT architecture. Combining modules at different orientations into one string forces mismatch losses — the lower-irradiance bank drags the higher-irradiance bank down. Two-MPPT inverters (the typical residential hybrid configuration in 2026) accept two independent strings, each operating at its own MPP. The east-facing string optimises on its own irradiance profile in the morning; the south-facing string optimises on its midday-afternoon profile. Total yield is meaningfully higher than the single-MPPT alternative.',
  },
  {
    id: 4,
    question:
      'A field-replacement scenario: a module in a 12-module string fails. The same model is no longer available. The available replacement has V_oc 40.0 V (vs the existing 41.6 V) and I_sc 13.3 A (vs the existing 12.5 A). What\'s the right approach?',
    options: [
      'Fit the replacement module in the same string',
      'Don\'t mix in the same string. Options: (a) replace the entire 12-module string with current-generation modules of matched characteristics, (b) move the replacement module to a separate string on a separate MPPT input, or (c) source a true match from the secondary market. Mixing makes/models in one string drives mismatch losses of 2–5% per mixed module',
      'It doesn\'t matter — modules in series are all equivalent',
      'Reverse the polarity of the replacement',
    ],
    correctAnswer: 1,
    explanation:
      'Series strings are current-limited by the weakest cell, and module-to-module mismatch in V_mp / I_mp drives the operating point off-MPP for every mismatched module. The PWI common mistakes list flags "mixing different Voc modules in the same string" explicitly. On a 5–10 year old install where the original module is no longer manufactured, the practical move is usually a whole-string replacement with matched current-generation modules. Where that\'s commercially impractical, the mismatched module goes on a separate MPPT input.',
  },
  {
    id: 5,
    question:
      'A 3-string parallel array commissioning test shows string A produces V_oc 498 V and 12.6 A, string B produces V_oc 497 V and 12.5 A, string C produces V_oc 470 V and 11.5 A at the same moment under similar irradiance. What does this most likely indicate?',
    options: [
      'Normal variation',
      'String C is materially below A and B — most likely cause is a loose connection, a faulty module, a wiring fault dropping voltage, or a partial-shade condition. Investigation: isolate string C, test each module individually for V_oc, check all DC connections at the combiner box, check the MC4 connectors on each module pair',
      'String C is producing more power',
      'The inverter is faulty',
    ],
    correctAnswer: 1,
    explanation:
      'A 28 V V_oc deficit on string C (the equivalent of one missing module of ~28 V V_oc — roughly two-thirds of a typical 41.6 V module V_oc) indicates a partial fault. The PWI grounding flags this exact pattern: significantly lower power generation indicating "possible loose wire connection or a short circuit between solar panels within the array". The investigation discipline: isolate the affected string, test each module individually, check MC4 connections, check combiner box wiring. Don\'t test the string only as a whole — module-level diagnostics catch the fault location.',
  },
  {
    id: 6,
    question:
      'Reg 712.433.101.1 defines how Upc_max (maximum continuous PV circuit voltage) and Isc_max (maximum short-circuit current) are determined. Where do these values feed into the design?',
    options: [
      'Nowhere — they are informational',
      'Upc_max drives the cold-morning V_oc string sizing AND the blocking diode reverse voltage rating (≥ 2 × Upc_max). Isc_max drives the per-string overcurrent protective device sizing (typically 1.25–1.5 × Isc_max) AND the blocking diode rated current (≥ 1.1 × Isc_max)',
      'They define the MCS Product List eligibility only',
      'They apply only to off-grid systems',
    ],
    correctAnswer: 1,
    explanation:
      'Upc_max and Isc_max are the two design-driving parameters at the PV string level. Upc_max feeds the cold-day V_oc calculation (against the inverter\'s absolute maximum), the blocking diode reverse voltage rating, and the insulation system selection. Isc_max feeds the per-string overcurrent protective device sizing, the DC cable thermal rating, and the blocking diode rated current. Both are calculated per Reg 712.433.101.1\'s method (typically involving the module datasheet I_sc and V_oc with temperature and irradiance scaling factors).',
  },
  {
    id: 7,
    question:
      'A small off-grid PV install proposes 2 modules in parallel (rather than series) feeding a 12V battery via a PWM charge controller. Reg 712.431 says no overcurrent protection required for 1 or 2 parallel strings. Is the design compliant?',
    options: [
      'No — parallel-only is non-compliant',
      'Yes on the string-protection point — 2 strings in parallel are exempt from Reg 712.431 overcurrent requirements. Other design checks still apply: cable sizing to handle 2 × I_sc, blocking diode protection if used (with the BS 7671 ≥2×Upc_max / ≥1.1×Isc_max ratings), and the Section 551 / Chapter 82 / Chapter 57 framework if the system grid-ties or battery-couples',
      'Only if the modules are < 100 W',
      'No — overcurrent protection always required',
    ],
    correctAnswer: 1,
    explanation:
      'The 1-or-2-string exemption in Reg 712.431 is explicit. The design is compliant on the string-overcurrent point. Other rules still apply at the install level — cable sizing for the combined parallel current, blocking diodes per BS 7671 712 if used, and the broader generating-set framework under Section 551 if the system parallels with mains. Off-grid systems with stationary batteries also engage Chapter 57. The cert evidence bundle for an off-grid install carries fewer notifications (no DNO G98/G99) but the same BS 7671 design discipline.',
  },
  {
    id: 8,
    question:
      'A PV string commissioning test should record what baseline values for future fault diagnosis?',
    options: [
      'Just the inverter\'s self-test result',
      'String-level V_oc, string-level I_sc (or short-circuit current measured per BS EN 62446-1 methodology), insulation resistance to earth (typically > 1 MΩ), continuity of the protective conductor, and the date/time/irradiance/temperature conditions of the test. Combined with the BS 7671 Section 712 inspection items and the IET CoP for Grid-Connected Solar PV procedures',
      'Just the inverter LED indicators',
      'The customer\'s satisfaction rating',
    ],
    correctAnswer: 1,
    explanation:
      'Baseline test values are the diagnostic gold-standard for future faults. A later EICR can compare current string V_oc / I_sc / IR readings against the commissioning baseline at similar conditions and detect drift, partial faults, or module degradation. The PWI grounding flags "not recording baseline Voc/Isc for comparison" as a common-mistake item. The baseline package: V_oc, I_sc (or measured short-circuit current per BS EN 62446-1), insulation resistance, continuity, and the conditions at test. The IET CoP for Grid-Connected Solar Photovoltaic Installations is the operational reference.',
  },
];

const faqs = [
  {
    question:
      'How do I calculate the cold-morning V_oc for string sizing?',
    answer:
      'Use the module V_oc temperature coefficient (typically -0.25 to -0.35 %/°C, expressed as the V_oc increase with falling temperature) and the design minimum cell temperature for the site. MIS 3002 and the IET CoP for Grid-Connected Solar PV Installations specify the design minimum cell temperature methodology (typically the meteorological minimum overnight temperature, or the lowest typical morning temperature when irradiance is sufficient for the cells to be at ambient). For most UK sites, design minimum cell temperature is in the -5 to -10°C range. The cold-morning V_oc is the STC V_oc × (1 + temperature delta × |coefficient|). This must be below the inverter\'s absolute maximum DC input voltage with margin.',
  },
  {
    question:
      'When does Reg 712.431 require per-string overcurrent protection?',
    answer:
      'Two conditions must hold. (1) More than 2 strings in parallel (1 or 2 strings are explicitly exempt). (2) The inequality 1.35 × Imop_max_ocer < (Ns − 1) × Isc_max holds. In practice, for 3 or more parallel strings with typical residential module values, the inequality usually holds — meaning per-string protection is the standard design. The implementation: per-string fuses in the array combiner box (typically gPV fuses to BS EN 60269-6), rated per the calculation (commonly 1.25–1.5 × Isc_max).',
  },
  {
    question:
      'What is a "combiner box" in PV terminology, and when do I need one?',
    answer:
      'A combiner box is the DC junction enclosure where multiple parallel strings connect to the inverter\'s DC input. It typically houses the per-string fuses (where required by Reg 712.431), the DC isolator, any surge protective devices for DC, and provides the cable-management interface between the multiple string MC4 connectors and the single inverter DC cable. For single-string designs (or two parallel strings under the 712.431 exemption) a combiner box may not be required — the strings can connect directly to the inverter via in-line MC4 connections. Beyond 2 strings, the combiner box becomes essential as the location for per-string protection.',
  },
  {
    question:
      'Why does mixing module orientations within a string cause large losses?',
    answer:
      'Series strings are current-limited — every module in the series carries the same current, set by the weakest. Modules at different orientations receive different irradiance at any moment (a south-facing module receives more midday irradiance than an east-facing module at the same time). Combining them in a series string forces the higher-irradiance modules to operate at the lower-irradiance current — effectively dragging their output down to the weaker module\'s level. The loss can be 10–30% during peak-mismatch periods. The fix is separate strings into separate MPPT inputs, or module-level optimisation.',
  },
  {
    question:
      'What\'s the difference between V_mp and V_oc on a module datasheet — and why do both matter?',
    answer:
      'V_oc is the open-circuit voltage (no current drawn) — the highest voltage the module produces. V_mp is the voltage at maximum power — where the inverter MPPT will operate the module in normal operation. V_oc drives the cold-morning string sizing against the inverter absolute maximum. V_mp drives the hot-day and cool-day MPPT range compatibility check. Both must satisfy the inverter\'s constraints: cold-morning V_oc < inverter Vmax; hot-day V_mp > inverter MPPT min; cool-day V_mp < inverter MPPT max.',
  },
  {
    question:
      'Are PWM and MPPT charge controllers actually different in off-grid PV?',
    answer:
      'Yes — substantially. PWM (Pulse-Width Modulation) controllers connect the array directly to the battery, pulling the array voltage down to the battery voltage during charging. The array operates off-MPP, losing 10–30% potential yield. MPPT (Maximum Power Point Tracking) controllers operate the array at its MPP and step the voltage down to the battery voltage via a DC-DC converter — capturing the full array power. For off-grid systems above a trivial size, MPPT controllers are the standard. Module 2 Section 4 covers the MPPT algorithm in detail.',
  },
  {
    question:
      'How does the IET Code of Practice for Grid-Connected Solar PV Installations relate to string design?',
    answer:
      'The IET CoP is the operational complement to BS 7671 Section 712 — covering string design methodology, commissioning evidence (linked to BS EN 62446-1), inspection and test procedures. For string design specifically, the CoP provides the practical detail on temperature coefficient calculations, MPPT range matching, mismatch loss analysis, and combiner box design that BS 7671 leaves general. The CoP is currently in its 5th edition; revisions track the technology faster than the BS 7671 amendment cycle.',
  },
  {
    question:
      'What records does an MCS PV install need to capture about strings?',
    answer:
      'MIS 3002 design pack includes the string topology calculation: number of strings, modules per string, calculated string V_oc at STC, cold-morning V_oc (with the temperature coefficient and design minimum cell temperature shown), V_mp at MPPT min / max compatibility, per-string overcurrent protective device specification (or evidence of the Reg 712.431 exemption applying), DC cable sizing, and the inverter MPPT compatibility check. The commissioning record includes the as-installed string V_oc, I_sc (per BS EN 62446-1 methodology), insulation resistance and continuity test values, with the test conditions (date, time, irradiance, temperature) recorded.',
  },
  {
    question:
      'Should I use MC4 in-line fuses for per-string protection, or proper DIN-rail fuses in a combiner box?',
    answer:
      'For mounted-on-roof string protection, MC4 in-line fuses (gPV to BS EN 60269-6) are acceptable and common. They sit in the cable run and provide the per-string overcurrent protection required by Reg 712.431. For systems where access for maintenance and inspection matters (commercial / ground-mount / multi-string roof), a proper combiner box with DIN-rail fuse holders is the better choice — fuses are accessible, fault diagnosis is straightforward, and the box also houses the DC isolator and SPDs. The decision often comes down to the install location and the long-term maintenance access plan.',
  },
];

export default function RenewableEnergyModule2Section3() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Strings and arrays | Renewable Energy 2.3 | Elec-Mate',
    description:
      'Series stacking for voltage, parallel addition for current. The BS 7671 Reg 712.431 string-protection rules, cold-morning V_oc calculations, mismatch losses, multi-pitch arrays and the architectural choices that drive PV system yield.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · BS 7671:2018+A4:2026"
            title="Strings and arrays"
            description="Series stacking for voltage, parallel addition for current. The BS 7671 Reg 712.431 string-protection rules, cold-morning V_oc calculations, mismatch losses and the architectural choices that drive PV system yield."
            tone="yellow"
          />

          <TLDR
            points={[
              'Series stacking sums module voltages while sharing current — modules in series produce string V_oc = number of modules × module V_oc, with string I_sc = single-module I_sc.',
              'Parallel stacking sums currents while sharing voltage — parallel strings produce array I_sc = number of strings × string I_sc, with array V_oc = single-string V_oc.',
              'BS 7671 Reg 712.431: 1 or 2 parallel strings are exempt from per-string overcurrent protection. 3+ strings trigger an inequality check (1.35 × Imop_max_ocer < (Ns-1) × Isc_max); when the inequality holds, per-string protection is required.',
              'The cold-morning V_oc calculation is the single most-common UK PV design error. V_oc rises with falling temperature; the cold-morning string V_oc can exceed the inverter\'s absolute maximum DC input voltage if the string is sized only against STC values.',
              'Mismatch losses (different module models in one string, mixed orientations, partial shading) are the silent yield-killer at the string level. Architectural fixes: separate strings into separate MPPT inputs, or module-level optimisation (Section 2.5).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply series and parallel topology rules to calculate string and array V_oc and I_sc from the module datasheet — and recognise where current adds vs where voltage adds.',
              'Run the cold-morning V_oc string sizing check against the inverter absolute maximum DC input voltage, using the module temperature coefficient and the design minimum cell temperature.',
              'Apply Reg 712.431 — recognise the 1-or-2-string exemption, apply the inequality for 3+ strings, and specify per-string overcurrent protective devices where required.',
              'Identify mismatch loss patterns (mixed module models in one string, multi-orientation strings, partial shade) and propose the right architectural fix (multi-MPPT inverter, module-level optimisation).',
              'Capture the commissioning baseline values (string V_oc, I_sc, insulation resistance, continuity, conditions) per BS EN 62446-1 methodology for future fault diagnosis.',
              'Read Upc_max and Isc_max per Reg 712.433.101.1 as the design-driving parameters that feed cold-morning V_oc, string overcurrent sizing, blocking diode ratings and DC cable thermal rating.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Series for voltage. Parallel for current.</Pullquote>

          <ContentEyebrow>String topology — series stacking, parallel addition</ContentEyebrow>

          <ConceptBlock
            title="How modules combine — series and parallel rules"
            plainEnglish="A PV string is modules wired in series. String voltage is the sum of module voltages; string current is the same as a single module. Multiple strings in parallel share the voltage and add the currents."
            onSite="Series for voltage stacking — typical residential string is 8–14 modules at ~600 V system voltage. Parallel for current addition — typical residential array is 1–4 strings into a multi-MPPT inverter. Larger commercial systems push string voltages to 1000 V or 1500 V."
          >
            <p>The two topology rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Series</strong> — modules wired
                positive-to-negative in a chain. Voltages add; the current through the
                chain is the single-module current (the same current flows through every
                module). String V_oc = Number of modules × module V_oc. String I_sc =
                module I_sc.
              </li>
              <li>
                <strong className="text-white">Parallel</strong> — strings (or modules)
                connected positive-to-positive and negative-to-negative. Voltages share
                (all parallel branches at the same voltage); currents add. Array I_sc =
                Number of strings × string I_sc. Array V_oc = string V_oc.
              </li>
            </ul>
            <p>Worked example — a 4.8 kWp domestic system, 12 × 400 W modules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Module V_oc = 41.6 V, I_sc = 12.5 A at STC (modern 60-cell module)</li>
              <li>
                <strong className="text-white">Configuration A:</strong> 1 string of 12
                series — string V_oc = 12 × 41.6 = 499 V, string I_sc = 12.5 A
              </li>
              <li>
                <strong className="text-white">Configuration B:</strong> 2 strings of 6
                parallel — string V_oc = 6 × 41.6 = 250 V, array I_sc = 2 × 12.5 = 25.0 A
              </li>
              <li>
                <strong className="text-white">Configuration C:</strong> 3 strings of 4
                parallel — string V_oc = 4 × 41.6 = 167 V, array I_sc = 3 × 12.5 = 37.5 A
              </li>
            </ul>
            <p>
              The configuration choice is driven by the inverter\'s input voltage and
              MPPT range, the cable size constraints, and the desired roof layout. Higher
              string voltage means lower string current (lower I²R cable losses), but
              demands the inverter accepts the higher voltage and tolerates the cold-day
              V_oc rise. Configuration A is the typical residential pattern for hybrid
              inverters with 400–600 V MPPT ranges.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The cold-morning V_oc calculation — the most-missed design check</ContentEyebrow>

          <Pullquote>The cold-morning V_oc is the most-missed UK PV string sizing calculation.</Pullquote>

          <ConceptBlock
            title="Cold-morning V_oc (Uoc_max) — why it matters and how to calculate it"
            plainEnglish="V_oc rises with falling temperature. On a cold sunny winter morning, string V_oc can exceed the STC value by 10–15%. BS 7671 calls this maximum value Uoc_max and requires it to be considered as the nominal voltage for PV array equipment selection (Reg 712.512.1.1)."
            onSite="Three numbers are needed: module V_oc temperature coefficient (from the datasheet, typically -0.25 to -0.35 %/°C); the site\'s design minimum cell temperature (per MIS 3002 / IET CoP guidance — typically -5 to -10°C in the UK); the STC string V_oc. Where temperature coefficient or minimum site temperature data is not available, BS 7671 prescribes Uoc_max = 1.2 × Uoc_stc as the default conservative multiplier."
          >
            <p>The calculation method:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Step 1</strong> — Module datasheet: read
                V_oc at STC and the V_oc temperature coefficient (typically -0.25 to
                -0.35 %/°C, meaning V_oc decreases at high temperature, increases at low
                temperature)
              </li>
              <li>
                <strong className="text-white">Step 2</strong> — Site design minimum cell
                temperature: typically -5 to -10°C for UK sites, per MIS 3002 / IET CoP
                methodology
              </li>
              <li>
                <strong className="text-white">Step 3</strong> — Temperature delta from
                STC: ΔT = 25°C − T_min (e.g. 25 − (-10) = 35°C)
              </li>
              <li>
                <strong className="text-white">Step 4</strong> — Cold-morning module V_oc
                = V_oc_STC × (1 + ΔT × |coefficient|)
              </li>
              <li>
                <strong className="text-white">Step 5</strong> — Cold-morning string V_oc
                = number of modules × cold-morning module V_oc
              </li>
              <li>
                <strong className="text-white">Step 6</strong> — Compare against inverter
                absolute maximum DC input voltage — leave margin (5–10% headroom is
                typical good practice)
              </li>
            </ul>
            <p>Worked example — a 14-module string with V_oc 41.6 V, coefficient -0.27 %/°C, design minimum cell temp -10°C:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>STC string V_oc = 14 × 41.6 = 582 V</li>
              <li>Temperature delta = 25 − (−10) = 35°C</li>
              <li>Cold-morning V_oc rise = 35 × 0.27% = 9.45%</li>
              <li>Cold-morning string V_oc = 582 × 1.0945 ≈ 637 V</li>
              <li>
                Against an inverter with 600 V absolute maximum DC input — 637 V is
                ABOVE the limit. The string is one module too long. Reduce to 13 modules
                (13 × 41.6 × 1.0945 ≈ 591 V — within the 600 V limit with margin).
              </li>
            </ul>
            <p>
              The opposite end — hot-day V_mp must remain above the inverter\'s MPPT
              minimum voltage. Same calculation method, opposite direction: hot-day cell
              temperature (typically 60–70°C on a UK summer roof), V_mp temperature
              coefficient applied. If hot-day V_mp drops below the inverter MPPT
              minimum, the inverter cannot operate the string at MPP and yield collapses
              during peak production hours.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The conservative defaults — when temperature data isn\'t available"
            plainEnglish="If you don\'t have the module\'s temperature coefficient AND you don\'t have the site\'s minimum temperature data, BS 7671 prescribes default multipliers to size the string conservatively."
            onSite="On a routine UK install with a modern datasheet, you have the temperature coefficient and you know the site minimum cell temperature — use those. The 1.2× / 1.25× defaults are the safety net for designs where data is missing, not the everyday method."
          >
            <p>BS 7671 prescribed defaults (per Reg 712.433.101.1):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Uoc_max default</strong> — where no
                information is available about the expected minimum site temperature OR
                about the PV module\'s V_oc temperature coefficient, Uoc_max shall be
                chosen as 1.2 × Uoc_stc (20% conservative margin)
              </li>
              <li>
                <strong className="text-white">Isc_max default</strong> — where no
                temperature data is available, Isc_max shall be at least 1.25 × Isc_stc
                (25% conservative margin to account for irradiance enhancement and
                temperature effects)
              </li>
            </ul>
            <p>
              These are the fallback multipliers when datasheet information is
              unavailable. On most modern installs the datasheet provides explicit
              temperature coefficients, and the calculated Uoc_max / Isc_max values are
              tighter than the conservative defaults — capturing more headroom for the
              string length while staying compliant.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="PV string cable thermal rating — Iz ≥ Isc_max"
            plainEnglish="The continuous current-carrying capacity Iz of the PV string cable must be greater than or equal to the short-circuit maximum current of the string. Sizing the cable to the I_mp of the string is NOT sufficient — the rule is against Isc_max."
            onSite="The cable selection on a PV string uses Isc_max (not I_mp) as the design current. This is more conservative than ordinary load circuits where I_b is the design current; PV strings are sized to the worst-case short-circuit current the string can produce."
          >
            <p>The cable thermal-rating rule per Reg 712.433.101.1 and Reg 712.433.102:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV string cable</strong> — where overcurrent
                protection is required (per the Reg 712.431.101 inequality), the cable\'s
                continuous current-carrying capacity Iz shall be ≥ Isc_max of the string
              </li>
              <li>
                <strong className="text-white">PV sub-array cable</strong> — Reg
                712.433.102: in arrays with one or two sub-arrays, no overcurrent
                protective device of the sub-array cables is required. The cable\'s Iz
                shall be ≥ Isc_max of the sub-array
              </li>
              <li>
                <strong className="text-white">DC isolator / switching device</strong> —
                selection per Isc_max as design current; voltage rating per Uoc_max as
                nominal voltage
              </li>
            </ul>
            <p>
              The distinction between string protection (Reg 712.431.101) and sub-array
              cable protection (Reg 712.433.102) matters on larger commercial installs
              where multiple strings combine into sub-arrays before reaching the
              inverter. Residential single-string installs don\'t engage the sub-array
              rules; commercial multi-string-per-MPPT installs typically do.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Reg 712.431 — the string-protection logic</ContentEyebrow>

          <Pullquote>One string or two? No overcurrent protection. Three or more? Check the inequality.</Pullquote>

          <ConceptBlock
            title="Reg 712.431 — when per-string overcurrent protection is required"
            plainEnglish="BS 7671 Section 712.431 sets a clear two-stage logic. For 1 or 2 parallel strings, no overcurrent protection required. For 3+ strings, apply the inequality — if it holds, per-string protection is required."
            onSite="Most residential designs are 1–2 strings (exempt). Most commercial / larger residential designs are 3+ strings (inequality usually holds, per-string protection required). The implementation: per-string fuses in the array combiner box, typically gPV fuses to BS EN 60269-6."
          >
            <p>The two-stage logic:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Stage 1 — Small array exemption</strong>:
                arrays with 1 PV string or 2 PV strings in parallel are EXEMPT from
                per-string overcurrent protection. This is explicit in Reg 712.431.
              </li>
              <li>
                <strong className="text-white">Stage 2 — Inequality for 3+ strings</strong>:
                where the array has more than 2 parallel strings, apply the inequality
                1.35 × Imop_max_ocer &lt; (Ns − 1) × Isc_max. Where the inequality is
                met, protective devices shall be provided to protect each PV string.
              </li>
            </ul>
            <p>The inequality\'s rationale:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Left side: 1.35 × Imop_max_ocer</strong>{' '}
                — the scaled maximum operating current of a single string
              </li>
              <li>
                <strong className="text-white">Right side: (Ns − 1) × Isc_max</strong> —
                the back-feed current from the other Ns-1 parallel strings if the
                string under consideration faults
              </li>
              <li>
                Where the back-feed current exceeds the scaled operating current, the
                string\'s cable / connectors could be overstressed without per-string
                protection — so protection is required
              </li>
            </ul>
            <p>
              In practice, for Ns ≥ 3 with typical residential module values (Imop_max ≈
              I_sc_max ≈ 11–12 A), the inequality always holds: 1.35 × Isc_max &lt; 2 ×
              Isc_max. Per-string protection is the default design choice for any array
              with 3+ parallel strings.
            </p>
            <p>Implementation choices for per-string protection:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">gPV fuses</strong> to BS EN 60269-6 in
                MC4-compatible in-line holders or DIN-rail combiner boxes — the standard
                PV-specific fuse type
              </li>
              <li>
                <strong className="text-white">Fuse rating</strong> typically 1.25–1.5 ×
                Isc_max — the exact value per the design pack calculation
              </li>
              <li>
                <strong className="text-white">Combiner box</strong> hosts the per-string
                fuses, the DC isolator, the array surge protective device, and the
                cable-management to the inverter DC input
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.431.101 — PV string protective devices"
            clause="In a PV array with N strings (above 2 strings) in parallel, protective devices shall be provided to protect each PV string where the following condition is met: 1.35 × Imop_max_ocer &lt; (Ns − 1) × Isc_max. In a PV array with one PV string or two PV strings in parallel, no overcurrent protective device is required."
            meaning="Reg 712.431.101 sets the clear two-stage logic. 1 or 2 parallel strings: explicit exemption from string overcurrent protection. 3+ parallel strings: apply the inequality. When the inequality holds — and in practice it nearly always does for 3+ residential strings — per-string overcurrent protective devices are required. Reg 712.431.102 specifies the protective device characteristics. Upc_max and Isc_max are determined per Reg 712.433.101.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.433.101.1 — Upc_max and Isc_max determination"
            clause="Upc_max (maximum continuous PV circuit voltage) and Isc_max (maximum short-circuit current) shall be determined in accordance with Regulation 712.433.101.1. These values feed equipment selection — diode reverse voltage ratings, overcurrent protective device sizing, DC cable thermal rating, and cold-day V_oc string sizing checks."
            meaning="Upc_max and Isc_max are the two design-driving parameters at the PV string level. The methodology for calculating them — typically involving the module datasheet I_sc and V_oc with temperature and irradiance scaling factors — is set out in Reg 712.433.101.1. The cert evidence bundle records the calculated values alongside the design pack."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Mismatch losses — the silent yield-killer</ContentEyebrow>

          <Pullquote>Mismatch is the silent yield-killer at the string level.</Pullquote>

          <ConceptBlock
            title="What drives mismatch losses — and how to design around them"
            plainEnglish="Series strings are current-limited by the weakest module. Anything that makes one module produce less current than the others — different make, different orientation, partial shade — drags the whole string\'s output down to the weakest level."
            onSite="The PWI common-mistakes list flags three mismatch patterns repeatedly: mixing different V_oc modules in same string; mixing module orientations in same array; failing to seal cable entries (which can cause module-level moisture damage and mismatch over years)."
          >
            <p>Three common mismatch patterns and their fixes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Module-model mismatch</strong> — replacing
                a failed module with a different make/model. The mismatched module has
                different V_mp / I_mp / I_sc, dragging the string off-MPP. Fix: replace
                the whole string with matched modules, OR move the mismatched module to
                a separate MPPT input.
              </li>
              <li>
                <strong className="text-white">Orientation mismatch</strong> — modules
                facing different directions in the same string. Each orientation
                produces different irradiance at any moment; the string is dragged to
                the lowest-current orientation. Fix: separate strings for each
                orientation, into separate MPPT inputs.
              </li>
              <li>
                <strong className="text-white">Partial shade mismatch</strong> — shaded
                cells force the bypass diode to engage; the bypassed sub-string
                contributes nothing. Cumulative shade across multiple modules in a
                string can take down most of the string. Fix: redesign the layout to
                eliminate shade; OR use module-level optimisation (microinverters /
                power optimisers — Section 2.5).
              </li>
            </ul>
            <p>
              The PWI grounding flags &ldquo;all solar panels in an array must face in
              the same direction&rdquo; as a design rule explicitly — &ldquo;each cell
              receives the same amount of light, which is important for optimum power
              production&rdquo;. Where this can\'t be achieved (multi-pitch roofs,
              chimney shadows, complex shading), the design moves to multi-MPPT or
              module-level architecture.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A 5 kWp PV install across a south + east two-pitch roof"
            situation="A homeowner with a 5 kWp budget wants PV across a south-facing roof pitch (10 modules fit) and an east-facing pitch (4 modules fit). 14 × 400 W modules total. The available hybrid inverter has 2 MPPT inputs."
            whatToDo="Design two separate strings into the two MPPT inputs. String 1: 10 modules on south pitch into MPPT 1. String 2: 4 modules on east pitch into MPPT 2. Each string operates at its own MPP, optimising for its own irradiance profile across the day. The east string captures the morning peak; the south string captures the midday-to-afternoon peak. Cold-morning V_oc check on each string against the inverter\'s per-MPPT maximum. Per-string overcurrent protection: each string is a single string into its own MPPT — Reg 712.431 exemption applies (1 or 2 strings in parallel — here we have 1 string per MPPT). The cert evidence bundle records the two-string architecture, the cold-day V_oc calculation for each string, and the inverter MPPT compatibility check."
            whyItMatters="Combining all 14 modules into one string at the inverter would force the east-facing modules to drag the south-facing modules to the lower irradiance at any given moment — losing 15–25% of the achievable yield. The two-MPPT architecture costs nothing extra (the inverter has two inputs anyway), and recovers the full yield potential. The customer\'s annual energy production is meaningfully higher than the single-MPPT alternative would have delivered."
          />

          <Scenario
            title="A failed module on a 4-year-old PV install — the replacement problem"
            situation="A homeowner reports a 30% drop in their PV system output. Investigation finds one module in a 12-module string has failed (junction box thermal damage — likely a faulty MC4 inside the box). The original module model is no longer manufactured. Available current-generation modules have similar P_max but different V_oc and I_sc values."
            whatToDo="Three options. (1) Replace the whole 12-module string with current-generation matched modules — clean fix, but expensive (12 modules + labour). (2) Move the new module to a separate string on a separate MPPT input (if the inverter has a free MPPT) — the new module operates at its own MPP, the remaining 11 original modules form a shorter string. The 11-module string V_oc must be re-checked against the inverter MPPT minimum (may drop below the MPPT range if too short). (3) Source a matched module from the secondary market (used / recovered modules of the same model). Quality of secondary-market modules varies; the cert evidence bundle should record the source and the testing done on the replacement. Of the three options, (2) is usually the most cost-effective if the inverter has the MPPT capacity; (1) is the cleanest for long-term warranty. Avoid the &ldquo;just fit a different make in the same string&rdquo; fix — the mismatch losses will damage the customer\'s yield and create EICR observations later."
            whyItMatters="Field replacements are the everyday reality on aged PV installs. The temptation to fit any same-size module is strong; the consequences are measurable yield loss over the remaining install lifetime. The PWI common-mistakes list explicitly flags this pattern: &ldquo;mixing different Voc modules in the same string&rdquo;. The cert evidence bundle protects both the installer and the customer when the diagnostic question comes up later."
          />

          <CommonMistake
            title="Sizing the string against STC V_oc without the cold-morning calculation"
            whatHappens="An installer specifies a 14-module string with STC string V_oc of 582 V against an inverter with 600 V absolute maximum. Looks fine at design time. The system commissions in autumn and works. On a cold (-10°C) sunny February morning, the string V_oc rises to 637 V — exceeding the inverter\'s 600 V absolute maximum. The inverter trips on over-voltage; in worst cases, the over-voltage damages the input stage. The customer pays for an inverter replacement under warranty disputes."
            doInstead="Always apply the cold-morning V_oc check. Module V_oc temperature coefficient × design minimum cell temperature × number of modules in string. Compare against inverter absolute maximum with margin (5–10% headroom). Reduce the string length if needed. MIS 3002 design pack mandates this calculation; the IET CoP for Grid-Connected Solar PV Installations sets the methodology. It is the single most-common UK PV design error and the cause of more inverter failures than any other design omission."
          />

          <CommonMistake
            title="Mixing modules of different makes/models in the same string"
            whatHappens="During a maintenance visit on a 5-year-old install, a failed module is replaced with a different make. The new module has different V_oc, I_sc, V_mp values. The string operates with the new module pulled off-MPP because the rest-of-string current limits it. Annual yield drops by ~3–5% even though all modules appear to work. The customer queries the yield drop after 12 months."
            doInstead="Never mix modules of different makes/models in the same series string. If a replacement is needed and the original model is unavailable: replace the whole string with matched modules, or move the replacement to a separate string on a separate MPPT input. The PWI common-mistakes list is explicit: &ldquo;mixing different Voc modules in the same string&rdquo; is a high-frequency error. The cert evidence bundle records the replacement decision and the matched-string discipline."
          />

          <CommonMistake
            title="Skipping the per-string overcurrent protection on a 3+ string array"
            whatHappens="A 6 kWp install uses 3 parallel strings of 5 modules each into a single-MPPT inverter. The designer applies the &ldquo;no fuses required&rdquo; assumption from 1- and 2-string installs. The array commissions and works. A wiring fault in one string later causes back-feed from the other two strings into the faulted string\'s cable — overstressing the cable and causing a thermal event in the cable routing."
            doInstead="The 1-or-2-string exemption in Reg 712.431 does NOT extend to 3+ strings. For 3 or more parallel strings, apply the inequality 1.35 × Imop_max_ocer &lt; (Ns - 1) × Isc_max. For typical residential module values and Ns = 3, the inequality holds — per-string fuses are required. Implementation: gPV fuses in MC4-compatible holders or a combiner box, rated per the design pack calculation (typically 1.25–1.5 × Isc_max)."
          />

          <SectionRule />

          <ContentEyebrow>Commissioning baseline — recording for future diagnostics</ContentEyebrow>

          <ConceptBlock
            title="Why the commissioning baseline matters — and what to record"
            plainEnglish="A future EICR or fault diagnosis compares current readings against the commissioning baseline. Without a baseline, the inspector or diagnostician has to infer normal operation from first principles. With a baseline, drift, partial faults, or degradation are immediately visible."
            onSite="The commissioning baseline is part of the cert evidence bundle. Record string-level V_oc, I_sc, insulation resistance, continuity, and the conditions at test (date, time, irradiance, temperature). The IET CoP for Grid-Connected Solar PV Installations and BS EN 62446-1 are the methodology references."
          >
            <p>The commissioning baseline records per string:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">String V_oc</strong> — measured at the
                combiner box / inverter input under the test conditions
              </li>
              <li>
                <strong className="text-white">String I_sc</strong> — or short-circuit
                current per BS EN 62446-1 methodology (typically using a clamp meter on the
                shorted string with appropriate safety precautions)
              </li>
              <li>
                <strong className="text-white">Insulation resistance to earth</strong> —
                typically &gt; 1 MΩ, tested at the manufacturer-specified test voltage
                (often 500 V or 1000 V DC depending on system voltage)
              </li>
              <li>
                <strong className="text-white">Continuity</strong> — of the protective
                conductor on the array frame earthing
              </li>
              <li>
                <strong className="text-white">Test conditions</strong> — date, time,
                ambient temperature, cell temperature (calculated or measured), incident
                irradiance (measured with a pyranometer or inferred from nearby
                meteorological data)
              </li>
            </ul>
            <p>
              The future diagnostic value: a 5-year periodic inspection compares the
              current V_oc against the commissioning baseline at similar conditions. A
              significant drop indicates module degradation, cell-level damage, or
              connection resistance. The PWI flags &ldquo;not recording baseline Voc/Isc
              for comparison&rdquo; as a common-mistake item — the install completes but
              the diagnostic toolkit for the future is incomplete.
            </p>
            <p>
              The cert evidence bundle therefore includes both the design-time
              calculations (cold-day V_oc, MPPT compatibility, per-string protection
              sizing) AND the as-installed commissioning readings. The two together form
              the durable record for the install\'s 25+ year operational life.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Series stacking sums module voltages while sharing current. Parallel stacking sums currents while sharing voltage. The configuration choice drives string V_oc, array I_sc, and inverter MPPT compatibility.',
              'Cold-morning V_oc is the most-missed UK PV design check. V_oc rises with falling temperature; string V_oc can exceed the inverter absolute maximum by 8–15% on a cold winter morning. Apply the module temperature coefficient and design minimum cell temperature.',
              'Reg 712.431 sets the string protection rules: 1 or 2 parallel strings exempt, 3+ strings apply the inequality 1.35 × Imop_max_ocer < (Ns − 1) × Isc_max. In practice, 3+ strings always require per-string overcurrent protection.',
              'Reg 712.433.101.1 defines Upc_max and Isc_max — the two design-driving parameters that feed cold-day V_oc, blocking diode ratings (2 × Upc_max, 1.1 × Isc_max), and per-string overcurrent device sizing.',
              'Mismatch losses are the silent yield-killer. Mixed makes/models in one string, mixed orientations, partial shading — each can drive 5–30% string losses. The architectural fixes: multi-MPPT inverter inputs, or module-level optimisation.',
              'Multi-pitch roofs need separate strings into separate MPPT inputs. Combining different orientations into one string drags the higher-irradiance bank down to the lower-irradiance current — typical loss 15–25%.',
              'The commissioning baseline (V_oc, I_sc, insulation resistance, continuity, conditions) is the diagnostic gold standard for future faults. Per BS EN 62446-1 methodology and the IET CoP for Grid-Connected Solar PV Installations.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2.2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Modules — from cells to module
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 MPPT — Maximum Power Point Tracking
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
