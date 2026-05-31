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
import { KwpSizingTree, InverterArchitectures, Mis3002DesignPack } from '@/components/study-centre/diagrams/renewableM3';
import { MpptEnvelope } from '@/components/study-centre/diagrams/renewablePvSiting';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm3s2-kwp',
    question:
      'A 16-module install using 415 W modules. What is the array nameplate (kWp) and what does it represent?',
    options: [
      '16 W',
      '6.64 kWp — the STC nameplate sum of the modules (16 × 415 W = 6,640 W = 6.64 kWp). Represents the array peak power at Standard Test Conditions. Used for sizing all downstream components: inverter matching, DC cable, AC cable, DNO application',
      '64 kWp',
      '0.66 kWp',
    ],
    correctIndex: 1,
    explanation:
      'kWp = sum of module STC nameplate powers, expressed in kilowatts-peak. 16 × 415 W = 6,640 W = 6.64 kWp. This is the array peak power at STC (1,000 W/m², 25°C cell temperature, AM1.5 spectrum) — the design reference for inverter sizing, cable sizing, DNO application (EREC G98/G99 thresholds), and SEG export contracting. Real-world yield is kWp × annual irradiance × performance ratio (Section 1).',
  },
  {
    id: 'm3s2-module-count',
    question:
      'A customer wants the largest install possible on a 35 m² south-facing roof. Modern 60-cell modules are approximately 1.7 m × 1.1 m (1.87 m² each). Realistic module count after access / safety clearances?',
    options: [
      '35 modules',
      'Approximately 14–16 modules. Theoretical maximum is 18 modules (35 / 1.87), but real roofs need access clearances: 300–500 mm from ridge / eaves / valleys / verges. Realistic packing factor ~80–90% — gives 14–16 modules at 415 W = 5.8–6.6 kWp',
      '50 modules',
      '1 module',
    ],
    correctIndex: 1,
    explanation:
      'Real installs need clearances: 300-500 mm minimum from roof edges (working-at-height access, wind-uplift edge zones), avoiding flashings, vents, soil stacks. Practical packing factor 80-90% — for a 35 m² roof, 14-16 modules. The PWI common-mistake list flags "cramming modules to the edges" as a high-frequency survey error.',
  },
  {
    id: 'm3s2-mppt-voltage-rules',
    question:
      'Inverter MPPT string sizing requires three voltage checks against the inverter datasheet. What are they?',
    options: [
      'Just check V_oc',
      'Three checks: (1) max V_oc_max of the string at coldest expected cell temperature must not exceed the inverter\'s absolute maximum DC input voltage; (2) min V_mp of the string at hottest expected cell temperature must remain above the inverter\'s MPPT range minimum; (3) max V_oc_max must not exceed the inverter\'s MPPT range maximum. Per Reg 712.433.101.1',
      'Customer\'s preference',
      'AC voltage only',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.433.101.1 sets the V_oc_max and U_pc_max determination basis. Three voltage checks against the inverter datasheet: (1) V_oc_max at coldest cell temperature < inverter absolute max DC; (2) V_mp at hottest cell temperature > inverter MPPT min; (3) V_oc_max at coldest cell temperature < inverter MPPT max. Failing (1) destroys the inverter; failing (2) drops off-MPP at hot conditions; failing (3) operates outside MPPT range.',
  },
  {
    id: 'm3s2-conservative-multipliers',
    question:
      'BS 7671 Reg 712.433.101.1 prescribes default conservative multipliers when temperature data is not available. What are they?',
    options: [
      'No multipliers needed',
      'V_oc_max = 1.2 × V_oc_stc and I_sc_max = 1.25 × I_sc_stc are the default multipliers per Reg 712.433.101.1 when manufacturer temperature data and site temperature extremes are not used. Where the module temperature coefficient and site temperature data ARE used, the calculated values take precedence',
      'Multiply by 10',
      'Use STC nameplate exactly',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.433.101.1 prescribes V_oc_max = 1.2 × V_oc_stc and I_sc_max = 1.25 × I_sc_stc as conservative defaults. The 1.2 captures V_oc increase at cold temperature; the 1.25 captures I_sc enhancement at high irradiance and reflective conditions. Where manufacturer temperature coefficient AND site temperature extremes ARE used, the calculated values take precedence.',
  },
  {
    id: 'm3s2-string-protection',
    question:
      'Reg 712.431.101 sets the string-fuse protection condition. What is it, and when is the string fuse required?',
    options: [
      'Always required',
      'Condition: protective devices shall be provided where 1.35 × I_mod_max_ocer < (Ns − 1) × I_sc_max (Ns above 2). When the condition IS MET (LHS less than RHS), string protection IS required. Reg also explicitly states: in a PV array with one or two PV strings in parallel, no overcurrent protective device is required regardless. Typically fuses needed at 3+ parallel strings',
      'Only for >100 kW installs',
      'Never required',
    ],
    correctIndex: 1,
    explanation:
      'Reg 712.431.101: protective devices are required where the condition 1.35 × I_mod_max_ocer < (Ns − 1) × I_sc_max is met (above 2 parallel strings). When LHS < RHS (the parallel reverse-current capacity exceeds the module\'s rated reverse capability), protection is needed. Reg explicitly states one or two parallel strings never need overcurrent protection. At 3+ parallel strings the condition typically becomes met → fuses or DC-MCBs required per Reg 712.432.103 (gPV per BS EN 60269-6, BS EN 60947-3 fuse-combination, or DC-rated MCBs per BS EN 60947-2 / 60898-2 / IEC 60898-3).',
  },
  {
    id: 'm3s2-inverter-ratio',
    question:
      'A 6.6 kWp array is connected to a 5 kW inverter. DC:AC ratio, and is this overload acceptable?',
    options: [
      'Never acceptable',
      'DC:AC ratio = 6.6/5.0 = 1.32. Inverter overloading (1.1–1.4) is common UK practice — saves inverter cost, captures more low-irradiance yield, and the inverter clips only briefly during peak summer noon. Manufacturer datasheets specify the permitted overload ratio (typically 1.3-1.5). Clipping loss typically <2% of annual yield',
      'Ratio 1.32 is too low — need bigger inverter',
      'Need exactly 1:1',
    ],
    correctIndex: 1,
    explanation:
      'Inverter overloading above 1.0 is common UK practice. DC:AC = 1.32 sits in the typical 1.2-1.4 range. The inverter clips power output during peak summer noon, but the array spends most of the year below STC nameplate (temperature derate, cloud, lower irradiance). Annual clipping loss typically below 2% — offset by inverter cost saving and gain in low-irradiance yield (the inverter operates higher proportion of rated capacity, improving efficiency).',
  },
  {
    id: 'm3s2-mis3002',
    question:
      'MCS MIS 3002 specifies the design pack content for solar PV. What are the core deliverables?',
    options: [
      'Just a quote',
      'Site survey (orientation, tilt, shading factor, structural assessment), yield modelling (PVGIS or equivalent), system schematic (single-line diagram), component schedule (modules, inverter, isolators, fuses, cables, mounting), inverter MPPT string sizing calculation, cable sizing calculation, customer information pack, MCS certificate',
      'Customer signature only',
      'No design pack required',
    ],
    correctIndex: 1,
    explanation:
      'MCS MIS 3002 design pack: (1) site survey with orientation, tilt, shading factor, structural assessment; (2) yield modelling output (typically PVGIS); (3) single-line schematic; (4) component schedule; (5) inverter MPPT string sizing per Reg 712.433.101.1; (6) cable sizing per Reg 712.431.101 / 712.431.102; (7) customer information pack; (8) MCS certificate. The audit trail for grant-funded installs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A customer wants 6 kWp on a south-facing roof. Modern 400 W modules are available. How many modules and what\'s a typical inverter MPPT string configuration?',
    options: [
      '6 modules — single string',
      '15 modules (15 × 400 W = 6,000 W = 6.0 kWp). Typical inverter MPPT: 1 string of 15 modules on a single-MPPT 5 kW inverter (DC:AC ratio = 1.2), or 2 parallel strings on a dual-MPPT inverter for shading flexibility. String sizing must satisfy the three voltage rules per Reg 712.433.101.1',
      '100 modules',
      '1 module',
    ],
    correctAnswer: 1,
    explanation:
      'Module count: 6,000 / 400 = 15 modules. Single-string on single-MPPT inverter is simplest, lowest-cost. Dual-MPPT inverters allow two independent strings (often east-west splits or different shading patterns). The three voltage checks must pass for the chosen string size against the inverter datasheet.',
  },
  {
    id: 2,
    question:
      'Inverter datasheet states max DC input voltage = 600 V, MPPT range = 200–550 V. Module V_oc_stc = 41.6 V. Maximum string size at coldest expected cell temperature (-15°C), V_oc temperature coefficient -0.27 %/°C?',
    options: [
      '100 modules',
      'V_oc_max at -15°C = 41.6 × (1 + (0.0027 × 40)) = 41.6 × 1.108 = 46.1 V per module. Max modules = 600 / 46.1 = 13.0 → 13 modules. The conservative default per Reg 712.433.101.1 (1.2 × V_oc_stc = 49.9 V) gives 600/49.9 = 12 modules. Use the lower for the safest install',
      '50 modules',
      '600 modules',
    ],
    correctAnswer: 1,
    explanation:
      'V_oc rises at cold temperature; cold-temperature V_oc is the critical constraint against the inverter max DC. Two calculation paths per Reg 712.433.101.1: (a) manufacturer temperature coefficient and site extreme = 46.1 V at -15°C → 13 modules max; (b) conservative default 1.2 × V_oc_stc = 49.9 V → 12 modules max. Safer answer is the lower of the two.',
  },
  {
    id: 3,
    question:
      'Inverter MPPT range 200-550 V. Module V_mp_stc = 34.0 V. V_mp temperature coefficient -0.40 %/°C. Hottest expected cell temperature 70°C. Minimum string size to stay within MPPT range?',
    options: [
      '1 module',
      'V_mp at 70°C = 34.0 × (1 − (0.004 × 45)) = 34.0 × 0.82 = 27.9 V per module. Minimum modules = 200 / 27.9 = 7.2 → 8 modules. Below 8 modules, the string V_mp at hot conditions drops below the inverter MPPT minimum — inverter operates off-MPP, losing yield',
      '100 modules',
      'No minimum',
    ],
    correctAnswer: 1,
    explanation:
      'V_mp falls at hot temperature; hot-temperature V_mp is the critical constraint against the inverter MPPT minimum. V_mp at 70°C = 34.0 × (1 − 0.004 × 45) = 27.9 V per module. Min modules = 200 / 27.9 = 7.2 → 8 modules minimum. Below 8, the inverter can\'t track the MPP, yield drops.',
  },
  {
    id: 4,
    question:
      'A 7 kWp array on a single 5 kW inverter — DC:AC ratio = 1.4. Customer asks "will I lose yield?".',
    options: [
      'Yes — 40% loss',
      'No material loss — typically <2% annual yield clipped. Inverter overloading 1.2-1.4 is common UK practice. The array rarely produces full STC nameplate (only at 1,000 W/m² at 25°C cell temp). The inverter clips briefly at peak summer noon but operates closer to its rated capacity for more of the year — improving its average efficiency. Manufacturer datasheet specifies the maximum permitted overload ratio',
      'No, but inverter will explode',
      '100% loss',
    ],
    correctAnswer: 1,
    explanation:
      'Inverter overloading 1.2-1.4 is standard UK practice. Saves inverter cost, captures more low-irradiance yield. The inverter clips during peak summer noon but annual clipping loss typically below 2% — offset by cost saving and improved low-irradiance operating point. Manufacturer datasheets specify the maximum permitted overload ratio (1.3-1.5 typical for modern string inverters). Exceeding voids the warranty.',
  },
  {
    id: 5,
    question:
      'An installer proposes 3 parallel strings on a single MPPT input. Module I_mod_max_ocer = 20 A, I_sc_stc = 12.5 A. Does the install need string fuses per Reg 712.431.101?',
    options: [
      'No fuses ever needed',
      'Apply the condition: 1.35 × 20 = 27 A vs (3 − 1) × (1.25 × 12.5) = 31.25 A. Since 27 < 31.25, the condition IS MET — string protection IS required per Reg 712.431.101. Devices per Reg 712.432.103 (gPV fuses per BS EN 60269-6, fuse-combinations per BS EN 60947-3, or DC-rated MCBs per BS EN 60947-2 / 60898-2 / IEC 60898-3). Both polarities protected per Reg 712.432.101. Devices go in the combiner box',
      'No — only 1 string per inverter',
      'Always required',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 712.431.101 condition: protective devices shall be provided where 1.35 × I_mod_max_ocer < (Ns − 1) × I_sc_max. With 3 parallel strings (Ns = 3) and I_sc_max = 1.25 × 12.5 = 15.625 A, right side = 2 × 15.625 = 31.25 A. Left side = 1.35 × 20 = 27 A. 27 < 31.25 — condition MET — protection required. Devices per Reg 712.432.103 (gPV per BS EN 60269-6, BS EN 60947-3 fuse-combination, or DC-rated MCBs per BS EN 60947-2 / 60898-2 / IEC 60898-3). Both polarities protected per Reg 712.432.101.',
  },
  {
    id: 6,
    question:
      'A dual-MPPT inverter has two independent MPPT inputs. An installer puts 8 modules on MPPT-A (south roof) and 6 modules on MPPT-B (west roof). Design consideration?',
    options: [
      'Not possible',
      'Each MPPT string is sized independently against the inverter\'s per-MPPT max V_oc, MPPT range, and per-MPPT max I_sc. Different orientations / shading patterns on each MPPT is exactly the use case — each MPPT tracks its own optimal operating point, eliminating mismatch losses between the two orientations. Particularly useful for east-west splits. The design pack records the per-MPPT sizing calculations',
      'All modules must be identical orientation',
      'Wired in series across both MPPTs',
    ],
    correctAnswer: 1,
    explanation:
      'Dual-MPPT inverters enable two electrically-independent strings, each tracked to its own optimal operating point. Primary use case: multi-orientation arrays (east-west splits, hipped roofs). Each MPPT input has its own voltage range and current rating — sized independently per Reg 712.433.101.1. Multi-MPPT inverters typically have lower per-input current rating (e.g. 12 A / 12 A) than single-MPPT inverters (e.g. 25 A) — module selection must reflect this.',
  },
  {
    id: 7,
    question:
      'The MCS MIS 3002 design pack lists inverter MPPT sizing calculations as a required deliverable. What three calculations must be shown?',
    options: [
      'None',
      '(1) Max string V_oc_max at coldest expected cell temperature, evidenced against the inverter\'s absolute max DC voltage; (2) Min string V_mp at hottest expected cell temperature, evidenced against the inverter\'s MPPT range minimum; (3) Max string V_oc_max at coldest cell temperature, evidenced against the inverter\'s MPPT range maximum. Plus current: max I_sc at hottest cell temperature against the inverter\'s per-MPPT max DC current',
      'Just module names',
      'Profit margin',
    ],
    correctAnswer: 1,
    explanation:
      'MCS MIS 3002 expects explicit MPPT sizing calculations: three voltage checks per Reg 712.433.101.1 plus current checks. The auditor cross-references against the inverter datasheet limits — any string exceeding the limits is a major finding. Both calculation methodologies (manufacturer temperature coefficient + site extremes, or 1.2 / 1.25 conservative defaults) accepted.',
  },
  {
    id: 8,
    question:
      'An installer specifies a 5 kW single-MPPT inverter with rated DC input 25 A. Array uses 400 W modules with I_sc_stc = 12.5 A. How many parallel strings can the MPPT accept?',
    options: [
      '10 strings',
      'Max parallel strings = inverter per-MPPT I_max / (1.25 × I_sc_stc) = 25 / (1.25 × 12.5) = 25 / 15.625 = 1.6 → 1 string maximum (rounded down). 2 parallel strings would push input current at hot conditions above the inverter rating, risking inverter damage. The 1.25 multiplier per Reg 712.433.101.1 is the conservative default for I_sc_max',
      '0 strings',
      'Unlimited',
    ],
    correctAnswer: 1,
    explanation:
      'Per-MPPT current rating sets the parallel-string limit. Inverter per-MPPT max DC current = 25 A; I_sc_max per string = 1.25 × 12.5 = 15.625 A. Max parallel strings = floor(25 / 15.625) = 1. Two parallel strings would push to 31.25 A — above inverter rating, risking damage. The installer either selects a higher-current MPPT or uses a dual-MPPT inverter.',
  },
];

const faqs = [
  {
    question: 'How does the customer\'s budget interact with the kWp sizing?',
    answer:
      'Two design constraints set the kWp ceiling: (1) roof area / orientation — the architecture limit; (2) budget — the financial limit. The competent surveyor presents two or three options — &ldquo;here\'s the maximum your roof can take, here\'s the maximum your budget supports, here\'s our recommended compromise.&rdquo; The customer\'s informed choice sets the kWp; the design follows. SEG export contracts and BUS / Home Energy Scotland grants can shift the financial sweet spot toward larger installs.',
  },
  {
    question: 'What\'s the typical UK domestic install size in 2025-2026?',
    answer:
      'UK domestic PV installs typically range 4-8 kWp, with 5-6 kWp the most common size — fits a typical south-facing roof, sits below the EREC G98 16 A single-phase threshold (~3.68 kW AC), pairs well with 5-10 kWh battery storage. Larger installs (8-12 kWp) often require EREC G99 application or G100 export limitation. UK household consumption (3,000-5,000 kWh/year typical) sets the self-consumption ceiling without battery; battery extends self-consumption to 60-80%.',
  },
  {
    question: 'How does module wattage selection affect the kWp / module count balance?',
    answer:
      'Module wattage has steadily increased — 250 W in 2015, 350 W in 2020, 400-450 W in 2025-2026 for modern N-type / TOPCon / HJT modules. Higher wattage modules reduce the module count for a given kWp, reducing labour cost and mounting complexity. Trade-off: higher-wattage modules are physically larger (typically 1.7 m × 1.1 m for 60-cell, 2.1 m × 1.1 m for 72-cell) — module count on a small roof may be set by physical layout rather than electrical capacity.',
  },
  {
    question: 'When is module-level optimisation the right call?',
    answer:
      'Three criteria typically drive module-level optimisation (microinverters or power optimisers — Section 2.5): (1) shading — partial shading on any module triggers bypass-diode behaviour that drags string yield, recovered by module-level optimisation; (2) multi-orientation arrays where multi-MPPT inverter isn\'t feasible — each module operates at its own MPP; (3) rapid-shutdown regulatory / safety requirements. Cost premium typically £100-£150 per module — justified where yield recovery exceeds cost.',
  },
  {
    question: 'What\'s the workflow for verifying the three voltage rules at design stage?',
    answer:
      'Four inputs needed: (1) module datasheet — V_oc_stc, V_mp_stc, I_sc_stc, I_mp_stc, V_oc / V_mp / P_max temperature coefficients; (2) inverter datasheet — absolute max DC voltage, MPPT range min, MPPT range max, per-MPPT max DC current; (3) site temperature extremes — coldest expected cell temperature (typically -15°C UK), hottest expected cell temperature (typically 70°C UK summer); (4) string topology. Apply the three voltage rules per Reg 712.433.101.1; apply per-MPPT current rule; apply the string-fuse inequality per Reg 712.431.101.',
  },
  {
    question: 'How does the EREC G98 / G99 threshold interact with kWp sizing?',
    answer:
      'EREC G98 (≤16 A single-phase): fit-and-notify within 28 days. Threshold AC: ~3.68 kW single-phase. DNO can object if local network constrained; rarely happens for sub-4 kWp installs. EREC G99 (>16 A): apply-and-wait — DNO assesses network impact, may approve / approve with export limitation / reject. Typical timescale 4-8 weeks. The kWp sizing decision often factors the G98 threshold — keeping below the threshold avoids G99 delay. Larger installs use export limitation per EREC G100.',
  },
  {
    question: 'What does the design pack say about future expansion?',
    answer:
      'Future expansion is a common ask — "will we be able to add more modules later, or add battery storage?". The design pack should record whether the inverter is sized for expansion (e.g. 5 kW inverter on 6 kWp now, 8 kWp future = need bigger inverter), whether AC infrastructure supports battery storage, and whether the DNO arrangement supports future capacity. The honest survey informs the customer; the design captures the trade-offs.',
  },
  {
    question: 'How does the IET CoP for Grid-Connected Solar PV Installations operationalise the sizing requirements?',
    answer:
      'The IET CoP (currently 5th edition) is the operational complement to BS 7671 Section 712. It expands sizing requirements with worked examples, decision charts, design-pack templates. For inverter MPPT sizing, the CoP walks through the three voltage checks with example calculations. For string-fuse selection, the CoP shows the inequality calculation. MCS MIS 3002 design pack often references the IET CoP as the design methodology source. GN3 cross-references the IET CoP for detailed PV inspection-and-test procedures.',
  },
  {
    question: 'What\'s the most common sizing fault flagged in MCS audits?',
    answer:
      'Most common MCS audit findings on PV sizing: (1) missing or inadequate inverter MPPT calculations in the design pack — the three voltage checks not shown explicitly; (2) string-fuse inequality not evidenced where parallel strings present; (3) array kWp not matched to inverter rating sensibly (DC:AC outside manufacturer-permitted range); (4) cable sizing not evidenced against Iz ≥ Isc_max; (5) shading factor in PVGIS not matching survey shade-analysis output. The MCS auditor reads the design pack against BS 7671 Section 712 — gaps are major findings requiring rectification.',
  },
];

export default function RenewableEnergyModule3Section2() {
  const navigate = useNavigate();

  useSEO({
    title:
      'PV system sizing — kWp, modules, inverter matching | Renewable Energy 3.2 | Elec-Mate',
    description:
      'PV sizing — kWp specification, module count, inverter MPPT matching against the three voltage rules per Reg 712.433.101.1, string-fuse inequality per Reg 712.431.101, MCS MIS 3002 design pack content.',
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
            eyebrow="Module 3 · Section 2 · BS 7671:2018+A4:2026"
            title="PV system sizing — kWp, modules, inverter matching"
            description="The sizing engine — kWp specification, module count, inverter MPPT matching against the three voltage rules per Reg 712.433.101.1, string-fuse inequality per Reg 712.431.101, and the MCS MIS 3002 design-pack content."
            tone="yellow"
          />

          <TLDR
            points={[
              'kWp = sum of module STC nameplate powers. Sets inverter sizing, cable sizing, EREC G98 / G99 threshold, SEG export contracting. Module count flows from kWp / module wattage; modern 400-450 W modules typical in 2025-2026.',
              'Inverter MPPT string sizing requires THREE voltage checks per Reg 712.433.101.1: max V_oc_max at coldest cell temp vs inverter absolute max; min V_mp at hottest cell temp vs inverter MPPT min; max V_oc_max at coldest cell temp vs inverter MPPT max.',
              'Reg 712.433.101.1 conservative defaults: V_oc_max = 1.2 × V_oc_stc, I_sc_max = 1.25 × I_sc_stc when manufacturer temperature data and site extremes not used. Where data IS used, calculated values take precedence.',
              'Inverter overloading (DC:AC ratio 1.2-1.4) is standard UK practice — saves inverter cost, captures more low-irradiance yield, clipping loss typically below 2% of annual yield. Manufacturer datasheet specifies permitted overload ratio.',
              'String protection per Reg 712.431.101: required (above 2 parallel strings) where 1.35 × I_mod_max_ocer < (Ns − 1) × I_sc_max — when the condition IS MET. Reg explicitly states 1 or 2 parallel strings never need protection. Device options per Reg 712.432.103: gPV per BS EN 60269-6, BS EN 60947-3 fuse-combination, or DC-rated MCBs per BS EN 60947-2 / 60898-2 / IEC 60898-3. Both polarities protected per Reg 712.432.101. Rating per Reg 712.432: 1.1 × I_sc_max < I_n ≤ I_mod_max_ocer.',
              'MCS MIS 3002 design pack: site survey, yield modelling, single-line schematic, component schedule, MPPT calculations, cable sizing, customer information pack, MCS cert. The audit trail for grant-funded installs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Specify array kWp for a customer\'s site against roof area, budget, EREC threshold, self-consumption profile.',
              'Calculate module count from kWp and module wattage, applying realistic packing factors for access clearances.',
              'Run the three voltage checks per Reg 712.433.101.1 against the inverter datasheet, using both calculation methodologies.',
              'Apply the string-fuse inequality per Reg 712.431.101 and size string fuses per BS EN 60269-6 gPV when required.',
              'Select dual-MPPT vs single-MPPT inverters against array topology (single orientation vs split, shading patterns).',
              'Assemble the MCS MIS 3002 design pack — site survey, modelling, schematic, schedule, calculations, customer pack, cert.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>kWp on the nameplate. Three voltage rules on the inverter. The design pack proves it.</Pullquote>

          <ContentEyebrow>kWp specification — the sizing anchor</ContentEyebrow>

          <ConceptBlock
            title="kWp — what it is, what it sets"
            plainEnglish="kWp = sum of module STC nameplate powers, in kilowatts-peak. The array peak power at Standard Test Conditions (1,000 W/m², 25°C cell temp, AM1.5). The design reference for everything downstream."
            onSite="kWp is the headline number on the customer quote, the MCS cert, the DNO application, the SEG export contract. Real-world yield in kWh is kWp × annual irradiance × performance ratio (Section 1) — the kWp is the input, the kWh/year is the output."
          >
            <p>Where the kWp specification anchors the design:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Inverter sizing</strong> — DC:AC ratio 1.2-1.4 typical UK practice; sets inverter rated AC output</li>
              <li><strong className="text-white">DC cable sizing</strong> — current rating against I_sc_max (Section 4); voltage rating against V_oc_max</li>
              <li><strong className="text-white">AC cable sizing</strong> — current rating against inverter rated AC current (Section 6)</li>
              <li><strong className="text-white">EREC G98 / G99 threshold</strong> — inverter AC current vs 16 A single-phase threshold</li>
              <li><strong className="text-white">DNO export contract</strong> — kWp sets the export capacity; G100 limitation if required</li>
              <li><strong className="text-white">SEG export contracting</strong> — kWp informs the export tariff and meter requirements</li>
              <li><strong className="text-white">MCS cert</strong> — kWp on the cert feeds the EPC and property valuation</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Typical UK domestic install sizes"
            plainEnglish="UK domestic PV typically 4-8 kWp. 5-6 kWp the most common — fits a typical south-facing roof, sits at the EREC G98 threshold, pairs with 5-10 kWh battery."
            onSite="Customer constraints set the kWp: roof area limits the upper bound; budget limits the practical bound; EREC G98 threshold favours staying below ~3.68 kW AC for single-phase; self-consumption profile (3,000-5,000 kWh/year typical) sets the financial sweet spot."
          >
            <p>Sizing decisions by customer profile:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Small UK domestic (low consumption)</strong> — 3-4 kWp. Below EREC G98 threshold; simple G98 fit-and-notify. Pairs with 3-5 kWh battery</li>
              <li><strong className="text-white">Standard UK domestic</strong> — 5-6 kWp. Fits typical south-facing roof; at EREC G98 threshold (~3.68 kW AC); pairs with 5-10 kWh battery</li>
              <li><strong className="text-white">Large UK domestic / EV-owning</strong> — 7-10 kWp. May require EREC G99 application or G100 export limitation. Pairs with 10-15 kWh battery</li>
              <li><strong className="text-white">Commercial / agricultural</strong> — 10-50 kWp. EREC G99 application; often three-phase; SEG tariff negotiated; commercial EMS</li>
            </ul>
          </ConceptBlock>

          <KwpSizingTree
            caption="kWp sizing decision tree — three-branch flowchart from customer site survey output. Branch 1 (roof area): m² available → max module count → max kWp. Branch 2 (budget): customer budget → max kWp at price-per-kWp. Branch 3 (regulatory): EREC G98 threshold → max kWp before G99 application. Final node: chosen kWp = minimum of the three."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Module count and array layout</ContentEyebrow>

          <Pullquote>Packing factor 80-90%. Clearances are non-negotiable.</Pullquote>

          <ConceptBlock
            title="Module count from kWp — and the realistic packing factor"
            plainEnglish="Module count = kWp / module wattage. But the physical fit has its own constraint: clearances around array edges, avoiding flashings / vents, working-at-height access. Realistic packing factor 80-90%."
            onSite="Modern 60-cell modules typically 1.7 m × 1.1 m (1.87 m² each); 72-cell modules typically 2.1 m × 1.1 m (2.31 m² each). Module count is the lower of (kWp / wattage) or (roof area × packing factor / module area)."
          >
            <p>Clearance discipline at survey:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">300-500 mm from roof edges</strong> — ridge, eaves, valleys, verges. Working-at-height access, wind-uplift edge zones (highest pressure in storms), some regional fire-service-access</li>
              <li><strong className="text-white">Avoid flashings, vents, soil stacks</strong> — modules can\'t sit over these; layout must work around them. Survey-stage photographs essential</li>
              <li><strong className="text-white">Avoid roof penetrations</strong> — mounting fixings should go through the rafter, not through tile / slate / felt</li>
              <li><strong className="text-white">Module orientation</strong> — landscape (long edge horizontal) gives lower count on long roofs; portrait (long edge vertical) gives flexible string topology</li>
            </ul>
            <p>
              PWI common-mistakes list flags &ldquo;cramming modules to the edges&rdquo; as
              high-frequency survey error — modules go on, but install is unsafe to
              maintain and wind-uplift edge zones create structural failure risk.
              Survey-stage clearance discipline is non-negotiable.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Module wattage trade-offs — bigger isn\'t always better"
            plainEnglish="Modern modules 300 W (older) to 600 W+ (commercial). Higher wattage reduces count for the same kWp but bigger physically — may not fit the layout."
            onSite="UK domestic 2025-2026 typically 400-450 W N-type or TOPCon modules — good balance of wattage, efficiency, size, cost. Commercial uses 500 W+ for cost-per-kWp where layout permits."
          >
            <p>Module wattage selection:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">300-350 W (older P-type)</strong> — phasing out; lower efficiency means more modules for the same kWp</li>
              <li><strong className="text-white">400-450 W (modern N-type, TOPCon, HJT)</strong> — UK domestic standard 2025-2026</li>
              <li><strong className="text-white">500-600 W (large-format)</strong> — physically larger (72-cell); commercial roofs where layout permits</li>
              <li><strong className="text-white">600+ W (commercial-scale)</strong> — bifacial; commercial ground-mount and large-roof installs</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Inverter MPPT string sizing — the three voltage rules</ContentEyebrow>

          <Pullquote>V_oc cold. V_mp hot. V_oc cold again. Three checks. Reg 712.433.101.1.</Pullquote>

          <ConceptBlock
            title="The three voltage rules for inverter MPPT matching"
            plainEnglish="The inverter datasheet specifies an absolute maximum DC input voltage (NEVER exceed — destroys the inverter), and an MPPT operating range (the inverter can track the MPP within this range). The three rules ensure the string V stays within these limits across the operating temperature range."
            onSite="V_oc (open-circuit voltage) rises at cold; V_mp (max-power voltage) falls at hot. The three rules check both extremes. Per Reg 712.433.101.1."
          >
            <p>The three voltage rules in order:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Rule 1 — absolute max DC at coldest cell temperature</strong>: V_oc_max_string at coldest expected cell temperature must NOT exceed the inverter absolute maximum DC input voltage. Failing this DESTROYS the inverter. UK coldest typical -15°C</li>
              <li><strong className="text-white">Rule 2 — MPPT minimum at hottest cell temperature</strong>: V_mp_string at hottest expected cell temperature must remain ABOVE the inverter MPPT range minimum. Failing this drops the inverter off-MPP — yield loss. UK hottest typical 70°C</li>
              <li><strong className="text-white">Rule 3 — MPPT maximum at coldest cell temperature</strong>: V_oc_max_string at coldest expected cell temperature must NOT exceed the inverter MPPT range maximum. Failing this operates outside MPPT range — yield loss</li>
            </ul>
            <p>
              String size constrained by all three rules — pick the largest size
              that satisfies all three. The design pack shows the calculations.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Calculation methodologies — coefficient + temperature, or conservative default"
            plainEnglish="Reg 712.433.101.1 allows two paths: (a) module temperature coefficient + site temperature extremes — gives calculated V_oc_max and V_mp; (b) conservative default multipliers — 1.2 × V_oc_stc, 1.25 × I_sc_stc. Where both available, use the lower (safer)."
            onSite="Modern module datasheets give V_oc temperature coefficient (typically -0.25 to -0.30 %/°C), V_mp temperature coefficient (typically -0.35 to -0.45 %/°C), P_max temperature coefficient (typically -0.30 to -0.40 %/°C)."
          >
            <p>Worked example — V_oc_max at coldest cell temperature:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Module datasheet: V_oc_stc = 41.6 V; V_oc temperature coefficient = -0.27 %/°C</li>
              <li>Site coldest expected cell temperature: -15°C; delta from STC 25°C = 40°C colder</li>
              <li>Calculated: V_oc_max = 41.6 × (1 + (0.0027 × 40)) = 41.6 × 1.108 = 46.1 V per module</li>
              <li>Conservative default: V_oc_max = 1.2 × 41.6 = 49.9 V per module</li>
              <li>For most-conservative answer use 49.9 V — gives lower max-string-size, safer install</li>
            </ul>
            <p>For a 13-module string at the calculated V_oc_max:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>13 × 46.1 V = 599.3 V — just under inverter 600 V absolute max</li>
              <li>14 × 46.1 V = 645.4 V — exceeds inverter max, would destroy inverter</li>
              <li>Maximum string size: 13 modules</li>
            </ul>
          </ConceptBlock>

          <MpptEnvelope
            caption="Inverter MPPT string sizing diagram — string V plotted against cell temperature for a 13-module string. At coldest -15°C, V_oc_max = 599.3 V (just under inverter 600 V absolute max — Rule 1). At STC 25°C, V_mp = 442 V (within MPPT range 200-550 V). At hottest 70°C, V_mp = 362 V (above MPPT minimum 200 V — Rule 2). The three voltage rules visualised as the string operating envelope inside the inverter MPPT range."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>String-fuse selection — Reg 712.431.101 / 102</ContentEyebrow>

          <Pullquote>1 or 2 strings: no protection. 3+ with condition met: protection required.</Pullquote>

          <ConceptBlock
            title="The Reg 712.431.101 string-protection condition"
            plainEnglish="On a parallel-string array (above 2 strings), a faulted string can draw reverse current from the parallel strings. If the parallel reverse-current capacity (Ns-1) × I_sc_max exceeds the module\'s rated reverse-current capability times the safety factor (1.35 × I_mod_max_ocer), protective devices are required."
            onSite="Reg condition: protective devices shall be provided where 1.35 × I_mod_max_ocer < (Ns − 1) × I_sc_max. When LHS < RHS — condition MET — protection IS required. The reg also explicitly states: in a PV array with one PV string or two PV strings in parallel, no overcurrent protective device is required, regardless of the module / I_sc values. Devices go in the combiner box, sized per Reg 712.432.103 and 712.432."
          >
            <p>Variables explained:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">I_mod_max_ocer</strong> — module rated max reverse over-current (from datasheet). Typical modern modules: 15-25 A</li>
              <li><strong className="text-white">1.35 multiplier</strong> — conservative factor for fault-current variations</li>
              <li><strong className="text-white">Ns</strong> — number of parallel strings on the same combiner / MPPT input</li>
              <li><strong className="text-white">I_sc_max</strong> — string max short-circuit current = 1.25 × I_sc_stc (conservative default per Reg 712.433.101.1)</li>
              <li><strong className="text-white">(Ns − 1)</strong> — number of parallel strings that can push reverse current into a faulted string</li>
            </ul>
            <p>Worked example:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Module I_mod_max_ocer = 20 A; I_sc_stc = 12.5 A; I_sc_max = 1.25 × 12.5 = 15.625 A</li>
              <li>1 string (Ns=1): explicit reg statement — no protection required regardless</li>
              <li>2 strings (Ns=2): explicit reg statement — no protection required regardless</li>
              <li>3 strings (Ns=3): (3-1) × 15.625 = 31.25 A; LHS = 27 A &lt; 31.25 A → condition MET → protection required</li>
              <li>4 strings (Ns=4): 46.875 A; LHS = 27 A &lt; 46.875 A → condition MET → protection required (higher reverse-current potential)</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 712.431.101 — string protection condition"
            clause="In a PV array with Ns strings (above 2 strings) in parallel, protective devices shall be provided to protect each PV string where the following condition is met: 1.35 × Imop_max_ocer < (Ns − 1) × Isc_max. In a PV array with one PV string or two PV strings in parallel, no overcurrent protective device is required. NOTE 1: If the inverter has several independent maximum power point trackers (MPPT) or devices with equivalent characteristics and no reverse current can flow from one input to another input by inverter design, then Ns is the number of strings connected to one individual DC input."
            meaning="Reg 712.431.101 sets the explicit rule: 1 or 2 parallel strings never need overcurrent protective devices, regardless of module / I_sc values. Above 2 parallel strings, the condition 1.35 × I_mod_max_ocer < (Ns-1) × I_sc_max determines whether protection is required — when the condition IS MET (LHS less than RHS), protection IS required. Device options per Reg 712.432.103; sizing per Reg 712.432; both polarities protected per Reg 712.432.101. NOTE 1: on a multi-MPPT inverter where reverse current can\'t flow between MPPT inputs, Ns counts only the strings on each individual MPPT."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Inverter selection — overloading, MPPTs, topology</ContentEyebrow>

          <Pullquote>DC:AC 1.2-1.4 is the UK norm. Dual-MPPT for split orientations.</Pullquote>

          <ConceptBlock
            title="DC:AC ratio (inverter overloading) — and why 1.2-1.4 is the UK norm"
            plainEnglish="Inverter rated AC output is rarely fully utilised — the array rarely produces full STC nameplate. Sizing the inverter at less than array peak (overloading) saves cost and improves low-irradiance operation."
            onSite="UK practice: DC:AC ratio 1.2-1.4. Inverter clips power output to its rated AC during peak summer noon; clipping loss typically below 2% of annual yield. Manufacturer datasheet specifies max permitted overload — exceeding voids warranty."
          >
            <p>Economics of inverter overloading:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">DC:AC = 1.0</strong> — no overload. Inverter sized for full array peak. Often operates below rated capacity, lower conversion efficiency. Highest inverter cost</li>
              <li><strong className="text-white">DC:AC = 1.2-1.4</strong> — UK domestic norm. Inverter slightly undersized vs array peak — clips briefly at peak summer noon. Annual clipping loss typically below 2%. Inverter operates at higher proportion of rated capacity more often, improving average efficiency</li>
              <li><strong className="text-white">DC:AC = 1.5+</strong> — aggressive overloading. Higher clipping loss (5-10% annual), lowest inverter cost. Justified on commercial installs. Manufacturer datasheet must permit</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Single-MPPT vs dual-MPPT vs multi-MPPT inverters"
            plainEnglish="Single-MPPT: one DC input pair, all strings parallel. Dual-MPPT: two independent DC input pairs, each tracking its own MPP. Multi-MPPT (3-6) for larger commercial. Module-level (microinverters / optimisers) for per-module MPPT — Section 2.5."
            onSite="UK domestic typically dual-MPPT — supports east-west splits, hipped roofs, shading flexibility. Single-MPPT acceptable for simple single-orientation arrays. MPPT count drives flexibility and cost."
          >
            <p>MPPT architecture decision:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Single-MPPT</strong> — simplest, cheapest. All strings electrically equivalent (same module, orientation, shading). UK domestic on single south-facing roofs</li>
              <li><strong className="text-white">Dual-MPPT</strong> — UK domestic standard. Two independent strings on different orientations or shading patterns. East-west splits, hipped roofs. Per-MPPT current typically 12-15 A (vs 20-25 A on single-MPPT)</li>
              <li><strong className="text-white">Multi-MPPT (3-6 MPPTs)</strong> — commercial. Larger arrays with multiple orientations / shading zones. Each MPPT independently tracked</li>
              <li><strong className="text-white">Module-level (microinverters / power optimisers)</strong> — per-module MPP tracking. Highest resolution; recovers shading losses; rapid-shutdown capable. Cost premium £100-£150 per module. Section 2.5</li>
            </ul>
          </ConceptBlock>

          <InverterArchitectures
            caption="Inverter MPPT architecture diagram — three side-by-side configurations: (1) single-MPPT with one string of 14 modules; (2) dual-MPPT with one string of 8 modules on MPPT-A (south roof) and 6 modules on MPPT-B (west roof); (3) microinverter system with one microinverter per module, AC trunking back to consumer unit. Annotated with MPPT count, per-input current rating, typical use case."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>MCS MIS 3002 design pack — the deliverable</ContentEyebrow>

          <Pullquote>The design pack is the audit trail. Calculations explicit. Single-line schematic mandatory.</Pullquote>

          <ConceptBlock
            title="MCS MIS 3002 — what the design pack must contain"
            plainEnglish="MCS MIS 3002 specifies the design pack as the deliverable for MCS-funded PV installs. The audit trail showing the install was designed correctly — survey, modelling, schematic, schedule, calculations, customer pack, cert."
            onSite="The MCS auditor reads the design pack against BS 7671 Section 712 and MIS 3002 — gaps are major findings. The honest design pack has the calculations explicit, not hidden."
          >
            <p>The MCS MIS 3002 design pack core content:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Site survey</strong> — site address, orientation, tilt, shading factor (from objective shade analysis per Section 1), structural assessment, roof type and condition, electrical infrastructure</li>
              <li><strong className="text-white">Yield modelling</strong> — PVGIS or equivalent output showing annual and monthly yield in kWh; assumed performance ratio</li>
              <li><strong className="text-white">System schematic</strong> — single-line diagram: modules, strings, combiner, DC isolator, inverter, AC isolator, RCBO / CU connection, metering, DNO connection point</li>
              <li><strong className="text-white">Component schedule</strong> — manufacturer, model, nameplate / rating for modules, inverter, DC isolator, string fuses, DC cable, AC cable, AC isolator, RCBO, mounting</li>
              <li><strong className="text-white">Inverter MPPT calculations</strong> — three voltage checks per Reg 712.433.101.1 explicit, with temperature-coefficient values, site temperature extremes, calculated V_oc_max / V_mp / V_oc_max-vs-MPPT-max</li>
              <li><strong className="text-white">Cable sizing calculations</strong> — DC cable per Iz ≥ I_sc_max (Section 4), with CCC, grouping, ambient temperature, route length. AC cable per inverter rated AC current (Section 6)</li>
              <li><strong className="text-white">String-protection calculations</strong> — Reg 712.431.101 condition check (above 2 strings); if protection required per Reg 712.431.102, devices per Reg 712.432.103 (gPV per BS EN 60269-6 / fuse-combination per BS EN 60947-3 / DC-MCBs per BS EN 60947-2 / 60898-2 / IEC 60898-3); sizing per Reg 712.432 (1.1 × I_sc_max &lt; I_n ≤ I_mod_max_ocer); both polarities per Reg 712.432.101; bidirectional per Reg 712.533.101</li>
              <li><strong className="text-white">Customer information pack</strong> — site-specific operating instructions, maintenance schedule, emergency contacts, warranty details, MCS cert</li>
              <li><strong className="text-white">MCS certificate</strong> — issued after install and commissioning. Feeds the EPC and property valuation</li>
            </ul>
          </ConceptBlock>

          <Mis3002DesignPack
            caption="MCS MIS 3002 design pack content map — three columns. Column 1 (Design): site survey, yield modelling, schematic, schedule, calculations. Column 2 (Install): commissioning records, BS EN 62446-1 test results, photographs, schedule of test results. Column 3 (Customer): customer information pack, MCS cert, warranty pack, EPC update. Audit trail running through all three."
          />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A customer wants 8 kWp on a small south-facing roof — does it fit?"
            situation="Customer\'s south-facing roof is 28 m² total. Wants 8 kWp install for EV charging + battery support. Standard 415 W modules available (1.87 m² each)."
            whatToDo="Module count for 8 kWp: 8,000 / 415 = 19.3 → 20 modules. Roof area for 20 modules at 80-90% packing factor: 20 × 1.87 / 0.85 = 44 m² required. Available 28 m² is well short — won\'t fit. Honest survey: (a) reduce kWp to 5-5.5 kWp (12-14 modules) to fit the 28 m² roof; (b) extend the array to a secondary east or west surface (split arrangement, dual-MPPT inverter); (c) consider larger-format modules (e.g. 500 W) — 16 × 500 W = 8 kWp, but physically larger (2.31 m² each), 16 × 2.31 = 37 m² — still doesn\'t fit. Realistic outcome: 5.5 kWp on the 28 m² roof, or 8 kWp by extending to a second surface."
            whyItMatters="Architectural fit is the binding constraint on many UK domestic installs. The honest survey converts the customer\'s preferred kWp into the realistic option set. The MCS MIS 3002 design pack records the chosen option and the rationale."
          />

          <Scenario
            title="A customer\'s site is shaded — should we use module-level optimisation?"
            situation="Customer\'s south-facing roof has a tree casting morning shade on 2 of 12 proposed modules from 7-9 am summer. Shade-analysis tool shows annual shading factor 0.88 (12% loss) on the affected modules."
            whatToDo="Compare string-level vs module-level. String-level (12 modules series, single MPPT): the 2 shaded modules drag the string — annual yield ~85% of unshaded (15% loss). Module-level (microinverters or power optimisers): each module operates at its own MPP — annual yield ~97% of unshaded (3% loss). Module-level recovers 12 percentage points. Cost: 12 modules × £100 (typical optimiser premium) = £1,200 extra. Yield recovery: 12% × 5,500 kWh/year × 25 years × 12 p/kWh = ~£1,980. Module-level pays back over the install life. Design-pack records the analysis and choice."
            whyItMatters="The objective shade analysis at survey informs the optimisation decision. Without it, the install commissions with string-level architecture, the customer experiences 15% lower yield than modelled, and the optimisation retrofit costs more than installing it day-one."
          />

          <CommonMistake
            title="Sizing the string without checking V_oc at coldest cell temperature"
            whatHappens="An installer sizes a string of 15 modules at 41.6 V_oc_stc = 624 V. Inverter absolute max DC is 600 V. The install works through summer; the first cold winter morning (cell -10°C, V_oc rises ~10%) the string V_oc_max = 686 V — exceeds inverter max. Inverter blows. Warranty void; replacement £1,500+; customer disputes."
            doInstead="Always run Rule 1 against the coldest expected cell temperature for the install location. Modern module datasheets give V_oc temperature coefficient; UK coldest cell temperature -15°C for domestic. Calculate V_oc_max per module, multiply by string size, compare to inverter absolute max DC. Conservative default 1.2 × V_oc_stc is the fallback. Design pack records the calculation; auditor checks it."
          />

          <CommonMistake
            title="Connecting 3+ parallel strings without applying the Reg 712.431.101 fuse inequality"
            whatHappens="An installer connects 3 parallel strings on a single MPPT without checking Reg 712.431.101. The module I_mod_max_ocer (20 A) is exceeded by (Ns-1) × I_sc_max = 2 × 15.625 = 31.25 A. The install commissions normally — but a single faulted string draws reverse current up to 31.25 A through the modules, exceeding the rated 20 A. Module damage; potentially fire (Section 4 covers fire on DC side per Reg 712.421)."
            doInstead="Always apply the Reg 712.431.101 condition at design. Substitute the module I_mod_max_ocer, number of parallel strings, and I_sc_max = 1.25 × I_sc_stc. When LHS < RHS (condition MET), protection required — sized per Reg 712.432 (1.1 × I_sc_max < I_n ≤ I_mod_max_ocer) using devices per Reg 712.432.103 (gPV per BS EN 60269-6 or DC-rated MCBs), both polarities per Reg 712.432.101. Design pack records the calculation."
          />

          <CommonMistake
            title="MCS audit fails because the inverter MPPT calculations weren\'t in the design pack"
            whatHappens="An installer completes a 6 kWp install. The design pack lists components but doesn\'t show inverter MPPT sizing calculations explicitly. MCS audit: major finding — Reg 712.433.101.1 calculations missing. Rectification: retrospectively produce calculations, evidence against as-installed string and inverter, resubmit the design pack."
            doInstead="MCS MIS 3002 design pack expects the inverter MPPT calculations EXPLICIT — three voltage checks per Reg 712.433.101.1 with temperature coefficients, site extremes, and calculated V_oc_max / V_mp. The auditor reads the design pack against BS 7671 Section 712 and MIS 3002 — gaps trigger major findings. Day-one discipline saves the rectification cost."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'kWp = sum of module STC nameplate powers — the design reference for inverter sizing, cable sizing, EREC G98/G99 threshold, SEG export contracting.',
              'UK domestic installs typically 4-8 kWp; 5-6 kWp the most common size at the EREC G98 threshold.',
              'Module count = kWp / module wattage, constrained by realistic packing factor (80-90%) on available roof area. Modern 400-450 W modules typical in 2025-2026.',
              'Inverter MPPT sizing requires THREE voltage checks per Reg 712.433.101.1: V_oc_max cold vs inverter absolute max; V_mp hot vs inverter MPPT min; V_oc_max cold vs inverter MPPT max.',
              'Conservative defaults per Reg 712.433.101.1: V_oc_max = 1.2 × V_oc_stc; I_sc_max = 1.25 × I_sc_stc when manufacturer temperature data and site extremes not used.',
              'Inverter overloading DC:AC = 1.2-1.4 is UK norm — clipping loss typically below 2% of annual yield. Manufacturer datasheet sets permitted ratio.',
              'String-protection per Reg 712.431.101: required (above 2 strings) where condition 1.35 × I_mod_max_ocer < (Ns-1) × I_sc_max IS MET. 1 or 2 strings: explicitly never need protection. Devices per Reg 712.432.103 (gPV per BS EN 60269-6, BS EN 60947-3 fuse-combination, or DC-rated MCBs per BS EN 60947-2 / 60898-2 / IEC 60898-3). Sizing per Reg 712.432: 1.1 × I_sc_max < I_n ≤ I_mod_max_ocer. Both polarities protected per Reg 712.432.101; blocking diodes NOT acceptable per Reg 712.432.102.',
              'MCS MIS 3002 design pack: site survey, yield modelling, schematic, schedule, MPPT calculations, cable sizing, string-fuse inequality check, customer information pack, MCS cert.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Irradiance &amp; shading
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-3-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 Roof safety &amp; mounting
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
