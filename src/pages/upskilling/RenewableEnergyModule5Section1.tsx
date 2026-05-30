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
import { BatteryChemistryComparison } from '@/components/study-centre/diagrams/renewableM5';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm5s1-what-is-bess',
    question:
      'BESS — Battery Energy Storage System. In the UK 2025-2026 domestic context, what is it and what regulatory chapter governs it?',
    options: [
      'Just a battery',
      'A BESS is a stationary secondary battery installation that stores electrical energy for later use — typically charging from PV surplus, off-peak grid tariff, or a generator, and discharging to the loads or back to the grid. UK 2025-2026 domestic BESS is dominated by Li-ion (overwhelmingly LFP chemistry — LiFePO4) in 5-15 kWh packs. The primary regulatory authority is Chapter 57 (Stationary Secondary Batteries) — NEW in BS 7671:2018+A4:2026 — supported by BS EN IEC 62485 series, PAS 63100:2024 for UK domestic installs, and Chapter 82 (PEIs) for the integrated prosumer install.',
      'Only for off-grid',
      'A diesel generator',
    ],
    correctIndex: 1,
    explanation:
      'BESS = Battery Energy Storage System. A stationary, fixed installation that stores electrical energy. The defining contrast with a portable / pluggable battery (laptop, EV, UPS) is the FIXED INSTALLATION nature. Chapter 57 of BS 7671:2018+A4:2026 is the new regulatory home — published April 2026, mandatory for new installs from 15 April 2026. Before A4:2026, BESS regs were scattered across Section 551 + the now-deleted Reg 551.8; A4 consolidates into Chapter 57. UK domestic BESS is overwhelmingly Li-ion / LFP at 5-15 kWh per pack — modular (stackable) is the dominant form factor. Cert evidence bundle records the BESS as a distinct system within the wider install.',
  },
  {
    id: 'm5s1-chapter-57-scope',
    question:
      'Reg 570.1 sets the scope of Chapter 57. Which of these is NOT covered by Chapter 57?',
    options: [
      'Hybrid PV+BESS',
      'A battery wholly within an emergency lighting system conforming to the BS 5266 series — Reg 570.1 explicitly excludes (b)(vi) these from Chapter 57. Also excluded: (i) pluggable UPS per BS EN [IEC] 62040; (ii) central safety power supply systems per BS EN 50171; (iii) fire detection / fire alarm systems per BS 5839 series; (iv) alarm systems per BS EN 50132; (v) machinery per BS EN [IEC] 60204 series. The NOTE clarifies: for EV supply to the fixed installation, refer to Section 722 and Chapter 82',
      'A home BESS retrofit',
      'A 10 kWh LFP pack',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.1 (Chapter 57 scope, NEW A4:2026) covers stationary secondary battery installations as a source of supply for electrical installations. It explicitly DOES NOT apply to batteries (a) incorporated into products covered by product standards; (b) wholly within: (i) pluggable UPS systems (BS EN IEC 62040); (ii) central safety power supply systems (BS EN 50171); (iii) fire detection / fire alarm systems (BS 5839); (iv) alarm systems (BS EN 50132); (v) machinery (BS EN IEC 60204); (vi) emergency lighting (BS 5266). Plus a NOTE: for EV-to-fixed-installation supply, see Section 722 and Chapter 82. So the typical UK domestic hybrid PV+BESS or standalone BESS install IS within Chapter 57; emergency lighting / fire alarm / UPS batteries are NOT.',
  },
  {
    id: 'm5s1-570-5-1-selection',
    question:
      'Reg 570.5.1 lists battery selection criteria. Which factor is MOST often skipped or mis-applied in UK domestic install practice?',
    options: [
      'Customer preference',
      'The combination of (g) charge / discharge profiles + (h) cyclic operation capability — the chemistry\'s C-rate limits and cycle life under the customer\'s actual usage pattern. Installers often spec on nameplate kWh capacity alone, missing that an LFP cell rated at 0.5C can deliver 5 kW from a 10 kWh pack but not 15 kW; or that a battery cycled daily to 90% DoD will last 5-8 years while one cycled to 60% DoD will last 12-15 years. Reg 570.5.1 (a)-(j) requires ALL ten factors to be considered — the design pack should record each',
      'Battery colour',
      'No factors apply',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.5.1 sets ten selection factors: (a) nature of demand; (b) battery voltage; (c) charge time and discharge time; (d) generation profiles of locally connected generators (e.g. solar PV); (e) PCE connection and coupling mode; (f) supplied equipment\'s utilization voltage range; (g) battery charge and discharge profiles; (h) load profiles and cyclic operation capability; (i) suitability for fixed installation; (j) the relevant external influences. The competent designer maps each customer-load characteristic against each criterion. The two most-skipped: (g) the C-rate limits (sustained discharge vs peak) and (h) cyclic operation (DoD discipline drives cycle life). A 10 kWh LFP at 0.5C continuous, daily cycled to 80% DoD, ~6,000-10,000 cycle life — 15-25 years calendar life if the cycling matches the spec. Cert evidence bundle records the design rationale.',
  },
  {
    id: 'm5s1-lfp-vs-nmc',
    question:
      'LFP (LiFePO4) vs NMC (NCM, NMC811) Li-ion chemistry — which dominates UK domestic BESS, and why?',
    options: [
      'NMC dominates',
      'LFP dominates UK domestic BESS overwhelmingly (~95%+ market share 2025-2026). Reasons: (a) thermal-runaway threshold ~270°C vs ~210°C for NMC — safer in the home; (b) longer cycle life ~6,000-10,000 cycles at 80% DoD vs NMC ~2,000-3,000 cycles; (c) no cobalt (lower cost + ethical supply chain); (d) cell-level chemistry stable at full charge. NMC has higher energy density (~250 Wh/kg vs LFP ~160 Wh/kg) — preferred for EVs where weight matters; not material for fixed BESS. UK domestic LFP: GivEnergy, Tesla Powerwall 3, Sigenergy SigenStor, Huawei LUNA, FoxESS, Enphase IQ Battery — all LFP',
      'They\'re the same',
      'Lead-acid dominates',
    ],
    correctIndex: 1,
    explanation:
      'LFP is the UK domestic BESS chemistry of choice. Thermal runaway: LFP ~270°C threshold + slower / less violent vs NMC ~210°C + faster. Cycle life: LFP 6,000-10,000 cycles at 80% DoD typical; NMC 2,000-3,000 cycles at 80% DoD. Cost: LFP is cheaper per kWh (no cobalt) and supply chain is more ethical. Energy density: NMC wins (250 Wh/kg vs LFP 160 Wh/kg) — matters for EVs where weight is critical, doesn\'t matter for a fixed BESS where you put the kit on a wall. UK domestic 2025-2026 brands: GivEnergy (LFP), Tesla Powerwall 3 (LFP — Powerwall 2 was NMC), Sigenergy SigenStor (LFP), Huawei LUNA (LFP), FoxESS (LFP), Enphase IQ Battery (LFP). NMC residential is now rare; lead-acid even rarer (legacy off-grid only).',
  },
  {
    id: 'm5s1-lead-acid-flow',
    question:
      'When does lead-acid (or flow battery) still make sense for a UK BESS install in 2025-2026?',
    options: [
      'Always',
      'Lead-acid (VRLA / AGM / Gel): legacy off-grid (existing system being maintained); very low-cost / very-low-cycling resilience installs where capex matters more than cycle life; specific marine / industrial applications. Flow batteries (vanadium redox): very long-duration storage (8+ hour discharge), commercial/grid-scale only — not domestic. For a NEW UK domestic BESS in 2025-2026, the default is LFP — lead-acid is virtually never the right choice for new domestic install',
      'Lead-acid for everything',
      'Flow batteries for homes',
    ],
    correctIndex: 1,
    explanation:
      'Lead-acid sees use in: (1) legacy off-grid where existing kit is being maintained / replaced like-for-like; (2) extreme-cost-constrained backup where 5-10 year life is acceptable; (3) marine / industrial niche. Cycle life 500-1,500 cycles at 50% DoD — much shorter than LFP. Hydrogen evolution during equalisation requires ventilation per BS EN IEC 62485-2. Flow batteries (vanadium redox flow — VRFB): tank-based electrolyte, very long cycle life (20,000+ cycles), good for 8-12 hour daily discharge. Used at commercial / grid scale (10s of MWh); not viable at domestic scale due to footprint + complexity. For UK domestic 2025-2026 new install: LFP is the default; lead-acid only on legacy reasons; flow not applicable.',
  },
  {
    id: 'm5s1-energy-density',
    question:
      'A customer asks why LFP packs are larger than the equivalent NMC pack would be. What\'s the practical answer?',
    options: [
      'LFP is broken',
      'Energy density: LFP ~160 Wh/kg (~330 Wh/L) vs NMC ~250 Wh/kg (~700 Wh/L). For a 10 kWh pack: LFP ~62 kg / ~30 L; NMC ~40 kg / ~14 L. LFP is roughly 50% heavier and 2&times; the volume of NMC at the same kWh. For a fixed wall-mounted domestic BESS, this is rarely material — the install location accommodates it. For EVs, the energy density gap matters (weight = range). The trade-off LFP takes (lower energy density) for the gains (safety + cycle life + cost) is the right choice for stationary storage',
      'Customer error',
      'They\'re identical',
    ],
    correctIndex: 1,
    explanation:
      'Energy density trade-off: LFP wins safety + cycle life + cost; NMC wins weight + volume. For fixed BESS, the trade-off heavily favours LFP. Typical 10 kWh LFP pack: ~60-80 kg, ~30 L volume, wall-mounted or floor-stacked. Typical 10 kWh NMC pack: ~40-50 kg, ~15-20 L. Customer installation accommodates either; the LFP weight/volume is a non-issue in practice. The competent surveyor explains the trade-off if asked — customers sometimes ask &ldquo;why so big&rdquo;. The answer: safety + cycle life + cost are worth the extra footprint. Cert evidence bundle records the chemistry and the rationale.',
  },
  {
    id: 'm5s1-pluggable-ups-exclusion',
    question:
      'Customer has a server rack with a tower UPS connected via plug-in cord. The UPS contains a sealed Pb-acid battery. Does Chapter 57 apply?',
    options: [
      'Yes — full Chapter 57',
      'No — Reg 570.1 excludes (b)(i) pluggable UPS conforming to the BS EN [IEC] 62040 series. A plug-in tower UPS is a self-contained product within scope of its own product standard, not a stationary battery installation in the Chapter 57 sense. Customer still must comply with the product\'s instructions and any applicable regs for the host installation, but Chapter 57\'s install requirements (570.5.x / 570.6.x) don\'t apply to the UPS battery itself',
      'Customer\'s choice',
      'No regs apply',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.1(b)(i) explicitly excludes pluggable UPS systems conforming to BS EN [IEC] 62040 series. The pluggable UPS is treated as a product, not a Chapter 57 installation. This matters for: tower UPS in server rooms / home offices; small desktop UPS units; mobile/portable backup units. Note: a HARDWIRED / FIXED UPS (data centre rack-style, building-wide UPS rooms) is a different matter — those are stationary, may be in scope depending on configuration. Chapter 82 also clarifies (in 823) that a UPS is not considered part of a PEI because it does not reverse-feed the network or upstream equipment. So: pluggable UPS = excluded from Chapter 57 AND from Chapter 82 PEI scope. Cert evidence bundle for the host install notes the UPS presence but doesn\'t apply Chapter 57 to it.',
  },
  {
    id: 'm5s1-cycle-life-vs-calendar',
    question:
      'Cycle life vs calendar life — what\'s the difference, and why do BOTH matter for sizing an LFP BESS?',
    options: [
      'Same thing',
      'Cycle life: number of full charge/discharge cycles before capacity falls below threshold (typically 80% of original). LFP ~6,000-10,000 cycles at 80% DoD. Calendar life: number of years before capacity falls below threshold REGARDLESS of cycling. LFP ~15-20 years typical. The battery hits whichever limit comes first. Daily-cycled 10 kWh LFP at 80% DoD: 6,000 cycles / 365 cycles/year &asymp; 16 years cycle life. Calendar life ~15-20 years. So cycle and calendar lives are well-matched for daily domestic cycling. For low-cycling installs (weekend cottage, off-grid backup), calendar life is the binding constraint',
      'Customer doesn\'t care',
      'No relationship',
    ],
    correctIndex: 1,
    explanation:
      'Cycle life: how many cycles before capacity degradation. LFP 6,000-10,000 cycles at 80% DoD; NMC 2,000-3,000 cycles at 80% DoD; lead-acid 500-1,500 cycles at 50% DoD. Calendar life: how many years regardless of cycling — LFP ~15-20 years, NMC ~10-12 years, lead-acid ~5-10 years. The actual useful life is the MINIMUM of cycle and calendar lives. Daily-cycled LFP at 80% DoD: 365 &times; 16 years = 5,840 cycles — well within cycle life; calendar life ~15-20 years; useful life ~15-16 years. Cycle-light installs (backup-only, low cycling) are calendar-limited: even with no cycling, LFP degrades at ~2-3% per year. The competent designer models the customer\'s expected cycling against both — cert evidence bundle records the expected life basis.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Customer wants a 10 kWh BESS to pair with their 6 kWp PV. They\'re cost-sensitive and want the best safety profile. Recommend chemistry + brand?',
    options: [
      'NMC for cost',
      'LFP (LiFePO4) — the dominant UK domestic chemistry for safety + cycle life + cost. Brand options: GivEnergy (UK-designed/manufactured, dominant market share, good app + integration), Sigenergy SigenStor (modular, premium-tier), FoxESS (value-tier LFP), Tesla Powerwall 3 (premium-tier LFP — Powerwall 2 was NMC, Powerwall 3 changed to LFP). For cost-conscious customer with 10 kWh need: GivEnergy or FoxESS. Cost range UK 2025-2026: £4,500-£6,500 for 10 kWh LFP installed (battery + PCE if separate, integration, scaffolding, electrics)',
      'Lead-acid for backup',
      'Flow battery',
    ],
    correctAnswer: 1,
    explanation:
      'Recommend LFP — safer (270°C thermal-runaway threshold vs NMC 210°C), longer cycle life (6,000-10,000 cycles vs NMC 2,000-3,000), no cobalt (lower cost + ethical), stable at full charge. Brand selection for 10 kWh LFP UK 2025-2026: GivEnergy Gen3 + 9.5 kWh battery (~£5,000-£6,500 installed), FoxESS H1 + battery (~£4,500-£5,500), Sigenergy SigenStor SP series (~£6,500-£8,500 premium). Tesla Powerwall 3 LFP ~£8,000-£10,000+ — premium pricing. The competent surveyor presents 2-3 options at different price points; customer makes the informed call. Cert evidence bundle records the brand + model + warranty period (typical 10-year manufacturer warranty + retention spec).',
  },
  {
    id: 2,
    question:
      'A customer\'s current installation has a server room with a hardwired data centre UPS containing 50 sealed Pb-acid batteries. Does Chapter 57 apply?',
    options: [
      'No — UPS excluded',
      'YES — a hardwired stationary UPS battery installation IS in Chapter 57 scope. The Reg 570.1(b)(i) exclusion is specifically for PLUGGABLE UPS systems conforming to BS EN [IEC] 62040 series. A fixed / hardwired UPS battery — typical data centre, broadcast facility, hospital UPS room — is a stationary secondary battery installation subject to Chapter 57. Reg 570.5.1 selection criteria; Reg 570.6.x protection / earthing / ventilation / fault current / isolation / location all apply. Plus BS EN IEC 62485 series and any application-specific standards',
      'Customer\'s choice',
      'No regs apply',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.1(b)(i) exclusion is for PLUGGABLE UPS — tower units, desktop units, portable backup. A fixed / hardwired UPS — data centre UPS room with hardwired DC distribution to the racks — IS in Chapter 57 scope. The whole 570.6.x family applies: 570.6.1.1.1 BS EN IEC 62485 conformance; 570.6.1.1.2 terminal voltage always present; 570.6.1.2.1/2 earthing; 570.6.3 ventilation (Pb-acid hydrogen emission significant — full BS EN IEC 62485-2 Annex A calculation); 570.6.4 fault current (battery + PCE contribution); 570.6.5 isolation (Section 462); 570.6.7 hazards (arcing, explosion); 570.6.8.x warning notices. Cert evidence bundle records the full Chapter 57 compliance package.',
  },
  {
    id: 3,
    question:
      'Customer\'s 10 kWh LFP battery shows 92% capacity at year 5. They ask if this is normal or if the battery is faulty.',
    options: [
      'Faulty',
      'Normal — LFP calendar degradation is ~2-3% per year typical; cycle degradation adds ~0.5-1% per 365 cycles at 80% DoD. So 5 years &times; 2-3% = 10-15% calendar; plus ~3-5% cycling = ~13-20% total. 92% remaining capacity at year 5 is within the normal range. Manufacturer warranty typically guarantees 70-80% remaining at year 10 — well on track. Confirm by reading the BMS / app capacity log and comparing to manufacturer\'s SoH spec. Cert evidence bundle includes the commissioning capacity baseline for comparison',
      'Replace immediately',
      'Customer error',
    ],
    correctAnswer: 1,
    explanation:
      'LFP year-5 capacity 92% is within typical degradation. Manufacturer warranties usually guarantee: &ge;70% retention at 10 years OR 6,000-10,000 cycles, whichever comes first. The commissioning baseline (recorded in cert evidence bundle per BS EN IEC 62485 install practice) is the comparator. Diagnostic if NOT within typical: (1) check BMS / app SoH log for the trend; (2) check usage profile (high-DoD daily cycling accelerates degradation); (3) check environmental (high temperature accelerates calendar degradation); (4) compare to manufacturer warranty curve. Replace only if outside warranty curve. Section 5.8 covers long-term operation + replacement timing in depth.',
  },
  {
    id: 4,
    question:
      'A customer\'s installer recommends mixing two different battery brands in series (Battery A + Battery B sharing the same DC bus). Compatibility?',
    options: [
      'Always compatible',
      'NEVER mix chemistries, brands, or even different production batches of the same chemistry in series within a single battery system. The BMS treats the pack as one logical battery; mismatched cells have different internal resistance, voltage curves, and degradation rates — leading to uneven cell-level cycling, accelerated degradation of the weakest cells, and potential safety issues. Reg 570.5.1(a)-(j) requires the battery be selected appropriately; mixing batteries fails the criterion. Parallel installation of separate complete BESS units (each with its own BMS) is sometimes possible if the manufacturer explicitly supports it',
      'OK if same voltage',
      'Customer\'s preference',
    ],
    correctAnswer: 1,
    explanation:
      'Never mix series-connected battery cells / packs / brands. Different chemistries (LFP vs NMC), different production batches (even same chemistry), different ages — all create cell-imbalance issues. The BMS cell-balancing function can compensate for SMALL variations (typical manufacturing tolerance) but not gross mismatches. PARALLEL installation of complete BESS units (each with own BMS) is sometimes valid — e.g. two GivEnergy 9.5 kWh batteries paralleled per manufacturer instructions. But series mixing is always wrong. Cert evidence bundle records the battery configuration; any deviation from manufacturer spec is a major audit finding.',
  },
  {
    id: 5,
    question:
      'Customer wants a BESS for genuine off-grid backup only (PV + grid + occasional backup use; battery cycled ~30 times/year not daily). Sizing implications?',
    options: [
      'Same as daily-cycle',
      'For low-cycling backup use, CALENDAR LIFE becomes the binding constraint, not cycle life. LFP ~15-20 year calendar life; the 6,000-10,000 cycle life is far in excess of 30 cycles/year &times; 15 years = 450 cycles. So size based on: (a) backup duration needed (autonomy hours/days); (b) calendar-life expectations (replace ~year 15); (c) avoid expensive over-spec on cycle life that won\'t be used. May actually favour a smaller, cheaper pack — the customer doesn\'t need the cycle life that a daily-cycled install would',
      'Larger battery',
      'Doesn\'t matter',
    ],
    correctAnswer: 1,
    explanation:
      'Backup-only BESS sizing inverts the priorities vs daily-cycled. Daily-cycled: cycle life binding (size for ~6,000 cycle target = 15+ years). Backup-only: calendar life binding (size for autonomy duration; cycle life vastly exceeds need). Implication: customer can spec a smaller / cheaper pack for the same useful life. UK pricing 2025-2026: 5 kWh LFP £3,500-£4,500 installed vs 10 kWh £4,500-£6,500. The competent surveyor models the customer\'s actual cycling against both cycle and calendar lives; sells the right size, not the largest. Cert evidence bundle records the design rationale + expected cycling.',
  },
  {
    id: 6,
    question:
      'Customer\'s existing 4-year-old PV install uses a Solis Mini 4G inverter. They want to retrofit a BESS. What chemistry / topology / coupling decision is right?',
    options: [
      'DC-coupled hybrid',
      'AC-coupled LFP retrofit. The Solis Mini 4G is NOT a hybrid inverter and won\'t accept a DC battery on its DC side. So retrofit must be AC-coupled: separate battery PCE (e.g. GivEnergy AC battery, Tesla Powerwall 2/3, SolarEdge AC battery, Enphase IQ Battery if Enphase PV) installed on the AC side. LFP chemistry for safety + cycle life. Existing Solis stays in place; new battery has its own PCE + monitoring + EREC paperwork (likely G99 application if combined output &gt; 16 A, or G100 export limit to stay G98). Chapter 82 PEI design applies to the now-PEI install per Section 4.5',
      'Lead-acid retrofit',
      'New hybrid replace inverter',
    ],
    correctAnswer: 1,
    explanation:
      'Retrofit BESS to non-hybrid PV install = AC-coupled. The existing Solis Mini 4G is a PV-only inverter; can\'t accept battery on DC side. AC-coupled BESS options: GivEnergy AC battery (UK ecosystem), Tesla Powerwall 2/3 AC mode, SolarEdge AC battery (if SolarEdge HD-Wave), Enphase IQ Battery (if Enphase microinverter). LFP chemistry standard. New BESS install: battery + PCE + AC isolator + commissioning + EREC paperwork (combined PV+BESS AC output drives G98 / G99 / G100 decision per Section 4.7) + Chapter 82 PEI design per Section 4.5. Cert evidence bundle: original PV cert bundle + new BESS cert bundle + integrated PEI design pack.',
  },
  {
    id: 7,
    question:
      'Reg 570.5.1 lists ten battery selection factors. Which three best capture &ldquo;chemistry-determined&rdquo; selection drivers?',
    options: [
      'None',
      '(a) nature of demand, (g) charge/discharge profiles, (h) load profiles + cyclic operation. Demand nature (high-power-burst vs sustained-discharge vs deep-cycle backup) drives the C-rate spec. Charge/discharge profiles (rates, voltage curves) determine the BMS + PCE compatibility. Load profiles + cyclic operation (daily DoD, expected cycle count) drive the chemistry choice (LFP for high-cycle, NMC for weight-critical, lead-acid for legacy/cost-only). The NOTE specifically calls out chemistry consideration: &ldquo;type of battery might include consideration of battery chemistry and construction, for example cell plate configuration and possibility of evolution of flammable, or harmful, gases&rdquo;',
      'Customer\'s budget only',
      'No factors apply',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.5.1 ten factors: (a) demand; (b) voltage; (c) charge/discharge time; (d) generation profiles; (e) PCE coupling mode; (f) utilization voltage range; (g) charge/discharge profiles; (h) load profiles + cyclic operation; (i) suitability for fixed install; (j) external influences. The chemistry-determined factors are (a) + (g) + (h) — these together encode the customer\'s use case (high-power vs deep-cycle, daily vs occasional) which maps onto the chemistry decision (LFP vs NMC vs lead-acid vs flow). The NOTE makes chemistry explicit. Cert evidence bundle records each factor + the chemistry rationale.',
  },
  {
    id: 8,
    question:
      'When did Chapter 57 (Stationary Secondary Batteries) become a distinct chapter in BS 7671?',
    options: [
      'Always existed',
      '15 April 2026 — Chapter 57 is NEW in BS 7671:2018+A4:2026 (Amendment 4). Before A4:2026, BESS regulations were scattered: parts of Section 551 (generating sets), the now-DELETED Reg 551.8 (which was the placeholder for BESS), and references in Section 712 (PV). A4:2026 consolidates BESS into Chapter 57 — alongside Chapter 82 (PEIs) and Appendix 17 (energy efficiency). New installs from 15 April 2026 onwards should comply with Chapter 57; existing pre-A4 installs are not retrospectively non-compliant',
      '2018',
      '2030',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671:2018+A4:2026 (Amendment 4) effective 15 April 2026 — Chapter 57 introduced as the dedicated BESS chapter. Prior state: Reg 551.8 was a placeholder, BESS content scattered, no coherent framework. A4 brings: Chapter 57 (BESS); Chapter 82 (PEIs); Appendix 17 (energy efficiency). A3:2024 withdrawn 15 October 2026 — both A3 and A4 valid in the interim. New installs after 15 April 2026: Chapter 57 applies. Additions / alterations after 15 April 2026 to existing installs: Chapter 57 applies to the new BESS work even if the existing install is pre-A4. Cert evidence bundle records the BS 7671 edition / amendment applied.',
  },
];

const faqs = [
  {
    question: 'How big is the UK domestic BESS market in 2025-2026?',
    answer:
      'UK domestic BESS installs grew rapidly through 2023-2025 as battery costs fell, energy prices rose, and grant / SEG schemes incentivised adoption. MCS-certified BESS installs running at ~80,000-120,000 per year by 2025; cumulative installed base ~300,000-450,000 UK domestic BESS units. The vast majority are LFP chemistry, 5-15 kWh per pack, paired with existing or new PV. UK manufacturer GivEnergy dominates by volume; Tesla Powerwall + Sigenergy + Huawei LUNA + FoxESS round out the top brands. Commercial / industrial BESS is also growing (V-Charge, Connected Energy, Field, Habitat Energy) but at smaller install counts vs domestic.',
  },
  {
    question: 'Why did BS 7671 get a whole new chapter for BESS?',
    answer:
      'BESS technology and install volumes both grew rapidly through 2020-2025, but the regulatory framework was inconsistent: parts of Section 551 covered batteries generally; Reg 551.8 was a placeholder; PAS 63100:2024 emerged as the UK-specific install spec but had no direct BS 7671 anchor; installer practice varied widely. A4:2026 consolidates: Chapter 57 covers BESS; Chapter 82 covers PEIs (integrated prosumer installs); Appendix 17 covers energy efficiency at building scale. The trio addresses the modern UK install reality where PV + BESS + EV + heat pump are increasingly common. The cert evidence bundle gains the Chapter 57 BESS design pack as a new artefact.',
  },
  {
    question: 'Why is LFP rather than NMC the UK domestic standard?',
    answer:
      'Three reasons: (1) SAFETY — LFP thermal-runaway threshold ~270°C + slower / less violent vs NMC ~210°C + faster. PAS 63100:2024 + Approved Document B (fire safety) increasingly mandate fire-rated locations or significant clearances for NMC home installs that LFP can avoid; (2) CYCLE LIFE — LFP 6,000-10,000 cycles vs NMC 2,000-3,000 — direct lifetime / cost-per-cycle advantage; (3) COST — LFP cheaper per kWh (no cobalt) and ethical supply chain. Energy density is the only place NMC wins — irrelevant for fixed BESS. Tesla switched Powerwall 3 from NMC (Powerwall 2) to LFP partly for these reasons. UK 2025-2026 new domestic install: LFP unless customer has a specific reason otherwise.',
  },
  {
    question: 'What\'s the typical UK domestic BESS install cost in 2025-2026?',
    answer:
      'For a 10 kWh LFP BESS installed alongside / retrofit to existing PV: £4,500-£8,500 typical range, varying by brand + complexity. Cost breakdown: battery + PCE £2,500-£5,500; install labour £800-£1,500; scaffolding (if rooftop access needed) £400-£800; electrical work (CU mod, AC isolator, cabling, commissioning) £500-£1,000; MCS certification + EREC paperwork £200-£500. New-build hybrid PV+BESS together: full 5 kWp PV + 10 kWh BESS ~£12,000-£18,000 turnkey. Cost trend 2020-2025: battery prices fell ~15-20% per year; install labour stable to slowly rising. Cert evidence bundle includes the cost breakdown for customer reference.',
  },
  {
    question: 'How does the BESS warranty work for UK domestic installs?',
    answer:
      'Typical UK 2025-2026 LFP BESS warranty: 10 years OR 6,000-10,000 cycles, whichever comes first; guarantees &ge;70-80% capacity retention at end of warranty period. GivEnergy: 10 years / 6,000 cycles / 70% retention. Tesla Powerwall 3: 10 years unlimited cycles, 70% retention. Sigenergy: 10 years / 6,000 cycles / 70% retention. Some brands offer extended warranties (15-20 years at extra cost). Warranty typically covers manufacturer defects + capacity degradation outside spec; doesn\'t cover misuse, weather damage, install errors. Customer warranty registration is the installer\'s responsibility — record in cert evidence bundle.',
  },
  {
    question: 'Are there UK grants for BESS installs?',
    answer:
      'UK 2025-2026: no direct BESS grants for domestic, but: (1) Smart Export Guarantee (SEG) — small payment for exported electricity, indirectly improves BESS economics; (2) Boiler Upgrade Scheme (BUS) — for heat pumps, but BESS that supports heat pump operation can integrate; (3) ECO4 / Great British Insulation Scheme — for fuel-poor households, may include BESS with PV in specific cases; (4) regional / local council grants (Scotland, Wales) occasional. The economics work best on self-consumption + tariff arbitrage (Octopus Agile / Cosy etc.) — BESS pays back via reduced grid imports rather than direct grant.',
  },
  {
    question: 'What about second-life EV batteries for stationary storage?',
    answer:
      'Second-life is an emerging UK market — EV packs retired at 70-80% capacity (no longer suitable for EV range but fine for stationary storage). Examples: Connected Energy &ldquo;E-STOR&rdquo; (uses retired Renault Kangoo / Nissan Leaf packs); Octopus Energy Group ventures. For DOMESTIC: still niche in 2025-2026 — second-life economics not yet beating new LFP at small scale, and second-life kit comes with non-standard PCE / BMS integration challenges. For COMMERCIAL / GRID-scale (~100 kWh - MWh range): second-life is gaining traction. Module 5 Section 8 covers second-life economics in depth.',
  },
  {
    question: 'How does a customer know which chemistry their BESS is?',
    answer:
      'Read the spec sheet / cert evidence bundle. UK 2025-2026 reality: virtually all new domestic BESS sold is LFP — if it\'s GivEnergy, Tesla Powerwall 3, Sigenergy, Huawei LUNA, FoxESS, Enphase IQ Battery, it\'s LFP. The exceptions are: Tesla Powerwall 2 (NMC, legacy product) — still in service on installs commissioned pre-2024; lead-acid (legacy off-grid maintenance / replacement). The cert evidence bundle records the manufacturer + model + chemistry. Customers can also confirm by checking the manufacturer\'s product page for the model installed.',
  },
  {
    question: 'How is BESS sizing different from PV sizing?',
    answer:
      'PV sized by ROOF AREA + SUN HOURS + DAILY GENERATION TARGET (~1,000 kWh/kWp/year UK midlands). BESS sized by DAILY LOAD + SELF-CONSUMPTION TARGET + CYCLE-LIFE EXPECTATION. Typical UK domestic ratio: 1 kWp PV : 2 kWh BESS for daily-cycled balanced install; 1:1 for high-cycling (EV + heat pump); 1:3+ for backup-heavy installs. Sizing tool: take customer half-hourly smart-meter data, model PV output, simulate battery operation against various sizes, find the knee-point where additional capacity stops materially improving self-consumption. Section 5.6 covers sizing methodology in depth.',
  },
];

export default function RenewableEnergyModule5Section1() {
  const navigate = useNavigate();

  useSEO({
    title: 'BESS fundamentals & chemistry | Renewable Energy 5.1 | Elec-Mate',
    description:
      'BESS in depth — Chapter 57 NEW A4:2026 scope (Reg 570.1); Reg 570.5.1 ten selection factors; LFP vs NMC vs lead-acid vs flow chemistry comparison; UK 2025-2026 brand landscape (GivEnergy / Tesla / Sigenergy / Huawei / FoxESS / Enphase); cycle vs calendar life.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · BS 7671:2018+A4:2026 · Chapter 57 NEW"
            title="BESS fundamentals & chemistry"
            description="The new Chapter 57 (Stationary Secondary Batteries) — Reg 570.1 scope, Reg 570.5.1 ten selection factors. LFP vs NMC vs lead-acid vs flow chemistry comparison; cycle vs calendar life; UK 2025-2026 brand landscape."
            tone="yellow"
          />

          <TLDR
            points={[
              'BESS = Battery Energy Storage System — a STATIONARY (fixed) secondary battery installation. Chapter 57 (NEW BS 7671:2018+A4:2026) is the regulatory home. Effective 15 April 2026.',
              'Reg 570.1 SCOPE — covers stationary secondary battery installs. Exclusions (b)(i)-(vi): pluggable UPS (BS EN IEC 62040), central safety power supply (BS EN 50171), fire alarm (BS 5839), alarm (BS EN 50132), machinery (BS EN IEC 60204), emergency lighting (BS 5266). For EV-to-fixed supply, see Section 722 + Chapter 82.',
              'Reg 570.5.1 — TEN selection factors: (a) demand; (b) voltage; (c) charge/discharge time; (d) generation profiles; (e) PCE coupling mode; (f) utilization voltage range; (g) charge/discharge profiles; (h) load profiles + cyclic operation; (i) suitability for fixed install; (j) external influences. NOTE: chemistry consideration explicit.',
              'UK 2025-2026 domestic BESS is overwhelmingly LFP (LiFePO4) chemistry — safer (thermal-runaway threshold ~270°C vs NMC ~210°C), longer cycle life (~6,000-10,000 cycles vs NMC ~2,000-3,000), cheaper (no cobalt), ethical supply chain.',
              'Cycle life vs calendar life — both matter. LFP cycle life 6,000-10,000 @ 80% DoD; calendar life 15-20 years. Useful life = minimum. Daily-cycled domestic: cycle-bound (~16 years). Backup-only: calendar-bound (~15-20 years).',
              'UK 2025-2026 LFP brands: GivEnergy (UK manufactured, dominant), Tesla Powerwall 3 (Powerwall 2 was NMC), Sigenergy SigenStor, Huawei LUNA, FoxESS, Enphase IQ Battery. NMC residential rare; lead-acid only legacy off-grid.',
              'Never mix series-connected batteries of different chemistries, brands, or batches. Parallel installation of complete BESS units sometimes possible if manufacturer explicitly supports. Cert evidence bundle records configuration.',
              'Chapter 57 supported by: BS EN IEC 62485 series (general / stationary / lithium-ion); PAS 63100:2024 (UK domestic-specific install spec); Chapter 82 (PEI integration where applicable).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 570.1 scope (Chapter 57 NEW A4:2026) — identify which installations are within scope vs the six exclusions (UPS, central safety, fire alarm, alarm, machinery, emergency lighting).',
              'Apply Reg 570.5.1 ten selection factors (a)-(j) to specify a battery for the customer\'s case.',
              'Compare LFP / NMC / lead-acid / flow chemistries on safety, cycle life, energy density, cost — choose LFP as the UK domestic default with rationale.',
              'Calculate expected useful life as min(cycle life, calendar life) for the customer\'s cycling pattern.',
              'Map the UK 2025-2026 brand landscape: GivEnergy, Tesla Powerwall 3, Sigenergy SigenStor, Huawei LUNA, FoxESS, Enphase IQ Battery — recognise typical chemistry, capacity range, and coupling mode for each.',
              'Identify when lead-acid or flow batteries make sense as exceptions; never mix series-connected batteries of different chemistries / brands / batches.',
              'Cross-reference BS EN IEC 62485 series + PAS 63100:2024 as the supporting standards for Chapter 57 install practice.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>Chapter 57 is the new BESS home. LFP is the chemistry. 10 selection factors set the design.</Pullquote>

          <ContentEyebrow>What is a BESS, and why Chapter 57 was added</ContentEyebrow>

          <ConceptBlock
            title="BESS — Battery Energy Storage System"
            plainEnglish="A BESS is a stationary, fixed installation that stores electrical energy for later use. UK 2025-2026 domestic BESS is overwhelmingly Li-ion (LFP chemistry) at 5-15 kWh per pack — wall-mounted or floor-stacked. Pairs with PV (most common), grid (tariff arbitrage), or generator (off-grid)."
            onSite="The defining attribute of a BESS — STATIONARY / FIXED — is what brings it within Chapter 57. A pluggable UPS, a portable power bank, an EV battery — all batteries, but not stationary fixed installations in the Chapter 57 sense."
          >
            <p>What makes a battery a BESS in Chapter 57 terms:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Stationary</strong> — fixed location; wall-mounted, floor-stacked, or in a battery room. Not portable, not pluggable</li>
              <li><strong className="text-white">Secondary</strong> — rechargeable (vs primary / single-use battery). Charges from PV / grid / generator; discharges to loads</li>
              <li><strong className="text-white">Installation</strong> — wired into a fixed electrical installation (not a self-contained product like a pluggable UPS)</li>
              <li><strong className="text-white">Source of supply for the electrical installation</strong> — supplies energy back to the installation\'s loads (or to the grid via PCE)</li>
              <li><strong className="text-white">Typical UK domestic</strong> — 5-15 kWh LFP, modular (stackable), wall-mounted in garage / utility / outbuilding / fire-rated external enclosure</li>
              <li><strong className="text-white">Typical commercial</strong> — 50-500 kWh, often containerised, on the customer\'s curtilage</li>
              <li><strong className="text-white">Typical grid-scale</strong> — multi-MWh containerised; outside the scope of Module 5 (covered in commercial / grid modules)</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.1 — Scope of Chapter 57 (NEW A4:2026)"
            clause="This chapter provides requirements for stationary secondary battery installations as a source of supply for electrical installations. This chapter does not apply to: (a) stationary secondary batteries that are incorporated into products covered by product standards; (b) secondary batteries wholly within the following systems: (i) pluggable uninterruptible power systems conforming to the BS EN [IEC] 62040 series; (ii) central safety power supply systems conforming to BS EN 50171; (iii) fire detection and fire alarm systems conforming to the relevant parts of the BS 5839 series; (iv) alarm systems conforming to the relevant parts of the BS EN 50132 series; (v) machinery conforming to the relevant parts of the BS EN [IEC] 60204 series; (vi) emergency lighting conforming to the relevant parts of the BS 5266 series. NOTE: For the supply of the fixed installation by electric vehicles, refer to Section 722 and Chapter 82."
            meaning="Reg 570.1 defines what Chapter 57 covers and what it doesn&rsquo;t. INCLUDED: stationary secondary battery installs as a supply source — typical UK domestic PV+BESS, off-grid PV+battery, hardwired UPS at scale, commercial BESS. EXCLUDED: pluggable UPS (tower / desktop), central safety power supplies (BS EN 50171), fire alarm / alarm / machinery / emergency lighting batteries — these are covered by their own product / application standards. The NOTE on EV: V2X / vehicle-to-fixed-installation is handled by Section 722 + Chapter 82, not Chapter 57. Cert evidence bundle records which framework applies."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Reg 570.5.1 — the ten selection factors</ContentEyebrow>

          <Pullquote>Reg 570.5.1 sets ten factors (a)-(j). Skip one, and the spec is wrong.</Pullquote>

          <ConceptBlock
            title="Reg 570.5.1 — battery selection criteria"
            plainEnglish="Reg 570.5.1 (Chapter 57 NEW A4:2026) sets out TEN factors that shall be taken into account when selecting battery type and capacity. The competent designer maps each customer-load characteristic against each criterion — the design pack records the rationale."
            onSite="Typical mistake: spec on nameplate kWh alone (factor (a) nature of demand) without considering the C-rate (factor (g) charge/discharge profiles) or cycling pattern (factor (h) load profiles + cyclic operation capability). A 10 kWh LFP at 0.5C can deliver 5 kW continuous — not 15 kW. A pack cycled daily to 90% DoD lasts ~half as long as one cycled to 60% DoD. The selection rationale belongs in the design pack."
          >
            <p>The ten factors (a)-(j) in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">(a) Nature of demand</strong> — what the customer needs the battery for: daily self-consumption shifting; backup duration; peak shaving; grid-services. Different uses drive different chemistry + sizing</li>
              <li><strong className="text-white">(b) Battery voltage</strong> — nominal DC voltage at battery terminals. Typical UK domestic 48V nominal (small / modular systems) or HV battery (high-voltage 200-500V DC for direct hybrid-inverter coupling)</li>
              <li><strong className="text-white">(c) Charge time and discharge time</strong> — how fast must the battery accept charge (PV midday surplus) and deliver discharge (evening peak)? Drives C-rate spec</li>
              <li><strong className="text-white">(d) Generation profiles of locally connected generators (e.g. solar PV)</strong> — PV output curve drives the charge availability; BESS sized to absorb the peak (or accept some curtailment)</li>
              <li><strong className="text-white">(e) PCE connection and coupling mode</strong> — AC-coupled (separate PCE) or DC-coupled (hybrid inverter integrated PCE). Module 4 Section 4 covered this; Reg 570.5.2 governs PCE selection separately</li>
              <li><strong className="text-white">(f) Supplied equipment&rsquo;s utilization voltage range</strong> — the AC system voltage compatibility (UK 230V single-phase / 400V three-phase) and the PCE output range</li>
              <li><strong className="text-white">(g) Battery charge and discharge profiles</strong> — V-curve, current limits, C-rate by SoC. LFP discharge is flat across SoC (~3.2V/cell) — easy for PCE matching; NMC slope is steeper (~3.7V/cell falling to 2.8V)</li>
              <li><strong className="text-white">(h) Load profiles and cyclic operation capability</strong> — daily-cycle vs occasional vs backup-only. Drives DoD discipline + cycle life expectation</li>
              <li><strong className="text-white">(i) Suitability for fixed installation</strong> — mounting, vibration tolerance, IP rating, BS EN IEC 62485 compliance, manufacturer\'s fixed-install spec</li>
              <li><strong className="text-white">(j) Relevant external influences</strong> — temperature range, humidity, altitude, electromagnetic environment. LFP optimal 15-25°C; degraded performance below 0°C and above 40°C</li>
            </ul>
            <p>The NOTE explicitly mentions chemistry: &ldquo;The selection of type of battery might include consideration of battery chemistry and construction, for example cell plate configuration and possibility of evolution of flammable, or harmful, gases.&rdquo; Translation: the chemistry choice (LFP / NMC / lead-acid / flow) is itself part of the selection criteria.</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.5.1 — Selection of battery"
            clause="The battery type and capacity shall be selected taking account of: (a) nature of demand; (b) battery voltage; (c) charge time and discharge time; (d) generation profiles of locally connected generators, such as solar PV; (e) power conversion equipment (PCE) connection and coupling mode; (f) supplied equipment&rsquo;s utilization voltage range; (g) battery charge and discharge profiles; (h) load profiles and cyclic operation capability; (i) suitability for fixed installation and connection to an electrical installation; and (j) the relevant external influences. NOTE: The selection of type of battery might include consideration of battery chemistry and construction, for example cell plate configuration and possibility of evolution of flammable, or harmful, gases."
            meaning="Reg 570.5.1 (Chapter 57 NEW A4:2026) is the master selection framework. The competent designer treats it as a checklist — every install&rsquo;s design pack records each of (a)-(j) for the chosen battery. The NOTE makes chemistry consideration explicit: LFP / NMC / lead-acid / flow is a design decision per the customer&rsquo;s use case + the gas-evolution / safety profile. Cert evidence bundle records the selection rationale. Practical UK 2025-2026 reality: LFP is the default unless a specific factor (legacy / cost-only / specialist) pushes elsewhere."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Chemistry comparison — LFP / NMC / lead-acid / flow</ContentEyebrow>

          <Pullquote>LFP for UK domestic. NMC for EVs. Lead-acid for legacy only. Flow for commercial-scale only.</Pullquote>

          <ConceptBlock
            title="LFP (LiFePO4) — the UK domestic default"
            plainEnglish="LFP (Lithium Iron Phosphate, chemistry symbol LiFePO4) is the dominant UK domestic BESS chemistry in 2025-2026. ~95%+ market share. Chosen for safety + cycle life + cost + ethical supply chain."
            onSite="UK 2025-2026 LFP brands: GivEnergy (UK manufactured), Tesla Powerwall 3 (LFP from Q2 2024), Sigenergy SigenStor, Huawei LUNA 2000, FoxESS, Enphase IQ Battery, BYD Battery Box. Cell-level chemistry is stable at full charge — no NMC-style hot/charged-state risk."
          >
            <p>LFP key characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Thermal-runaway threshold</strong> — ~270°C cell-level; significantly above NMC ~210°C. Runaway is slower + less violent (less oxygen release, lower peak temperature)</li>
              <li><strong className="text-white">Cycle life</strong> — 6,000-10,000 cycles at 80% DoD typical. Some premium cells (newer LFP chemistries) claim 10,000-12,000</li>
              <li><strong className="text-white">Calendar life</strong> — 15-20 years typical; some brands warrant &ge;70% retention at 10 years</li>
              <li><strong className="text-white">Energy density</strong> — ~160 Wh/kg / ~330 Wh/L. Lower than NMC but ample for fixed installs</li>
              <li><strong className="text-white">Cost</strong> — ~£250-£400 per kWh installed UK 2025-2026 (battery only, excluding install labour)</li>
              <li><strong className="text-white">Supply chain</strong> — no cobalt (NMC requires cobalt with ethical / sourcing concerns); iron + phosphate readily available</li>
              <li><strong className="text-white">Discharge curve</strong> — flat ~3.2V/cell across most of SoC range — easy for PCE matching, predictable BMS algorithms</li>
              <li><strong className="text-white">Temperature</strong> — optimal 15-25°C; reduced capacity below 0°C; accelerated degradation above 40°C</li>
              <li><strong className="text-white">UK domestic dominance</strong> — virtually all new domestic BESS installs 2025-2026 are LFP</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="NMC (NCM, NMC811) — high-density Li-ion, EV-dominant"
            plainEnglish="NMC (Lithium Nickel Manganese Cobalt Oxide) and variants (NCA, NMC622, NMC811) is the high-energy-density Li-ion chemistry. Dominates EV batteries; rare in UK domestic stationary BESS in 2025-2026."
            onSite="NMC residential examples: legacy Tesla Powerwall 2 (NMC, products commissioned ~2016-2023); some commercial / industrial BESS where weight matters; certain niche premium products. For new UK domestic 2025-2026: rare — LFP has supplanted it."
          >
            <p>NMC key characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Thermal-runaway threshold</strong> — ~210°C cell-level; lower than LFP; runaway faster + more violent (oxygen release, higher peak temperature). Approved Document B fire-safety implications</li>
              <li><strong className="text-white">Cycle life</strong> — 2,000-3,000 cycles at 80% DoD. Better at shallow DoD (50%): 4,000-6,000 cycles</li>
              <li><strong className="text-white">Calendar life</strong> — 10-12 years typical</li>
              <li><strong className="text-white">Energy density</strong> — ~250 Wh/kg / ~700 Wh/L — the headline advantage. ~2&times; LFP per L</li>
              <li><strong className="text-white">Cost</strong> — historically more expensive than LFP per kWh; cobalt content drives cost + supply-chain risk</li>
              <li><strong className="text-white">Discharge curve</strong> — sloped from ~4.2V/cell (full) to ~2.8V/cell (empty). PCE must accommodate the wider voltage range</li>
              <li><strong className="text-white">EV dominance</strong> — most UK EV batteries are NMC variants (energy density critical for range / weight)</li>
              <li><strong className="text-white">UK domestic decline</strong> — Tesla switched Powerwall 3 (2024+) from NMC to LFP. UK 2025-2026 new domestic NMC installs essentially zero</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Lead-acid (VRLA / AGM / Gel) — legacy chemistry"
            plainEnglish="Lead-acid is the historical battery chemistry. Sealed VRLA (Valve-Regulated Lead-Acid) and variants (AGM, Gel) dominated off-grid until LFP economics improved in the 2020s. Now: legacy systems, very low-cycling backup, niche applications."
            onSite="UK 2025-2026 lead-acid: legacy off-grid being maintained; specific marine / industrial applications; extreme-cost-constrained backup. New domestic install: virtually never chosen. The hydrogen-evolution + ventilation requirements (Reg 570.6.3 + BS EN IEC 62485-2) are non-trivial."
          >
            <p>Lead-acid key characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Cycle life</strong> — 500-1,500 cycles at 50% DoD; LESS than half of LFP. Deep cycling shortens life dramatically</li>
              <li><strong className="text-white">Calendar life</strong> — 5-10 years typical; significantly less than LFP</li>
              <li><strong className="text-white">Cost per kWh</strong> — initially lower than Li-ion historically; with LFP price falls, gap closing or reversed by 2025-2026</li>
              <li><strong className="text-white">Hydrogen evolution</strong> — Pb-acid emits hydrogen during charging (especially equalisation). Ventilation calculation per BS EN IEC 62485-2 Annex A; explosion-proof fittings within hazardous zone</li>
              <li><strong className="text-white">Weight</strong> — ~30-40 Wh/kg — much heavier per kWh than Li-ion</li>
              <li><strong className="text-white">DoD discipline</strong> — limited to 50% DoD for any reasonable cycle life</li>
              <li><strong className="text-white">Use cases 2025-2026</strong> — legacy off-grid maintenance, niche industrial, low-cycling marine. Not for new UK domestic BESS</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Flow batteries (VRFB) — commercial-scale-only"
            plainEnglish="Vanadium Redox Flow Batteries (VRFB) use liquid electrolyte tanks. Long discharge duration (8+ hours), very long cycle life (20,000+ cycles), but large physical footprint. Used at commercial / grid scale; not viable at domestic scale."
            onSite="Not in scope for UK domestic BESS install. Awareness only — a customer asking about flow batteries for their home is not a candidate. Commercial / industrial / grid-scale: emerging market in 2025-2026, brands include Invinity Energy Systems (UK), Redflow (zinc-bromine flow), Largo Inc."
          >
            <p>Flow battery key characteristics (for awareness):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Cycle life</strong> — 20,000+ cycles; effectively unlimited cycling — capacity comes from electrolyte volume, not cell ageing</li>
              <li><strong className="text-white">Footprint</strong> — large tanks of electrolyte; not viable at domestic scale (cellar / garage size minimum for tens of kWh)</li>
              <li><strong className="text-white">Duration</strong> — 8-12 hour discharge ideal; longer durations than Li-ion at the same kWh</li>
              <li><strong className="text-white">Use cases</strong> — grid-scale energy storage; commercial peak-shaving over many hours; industrial backup at sites with space</li>
              <li><strong className="text-white">UK 2025-2026 status</strong> — small but growing commercial market; not a UK domestic product</li>
            </ul>
          </ConceptBlock>

          <BatteryChemistryComparison caption="The home-storage battery chemistries compared — LFP, NMC and lead-acid — on energy density, cycle life, safety and cost. LFP dominates UK home storage." />

          <InlineCheck {...inlineChecks[3]} />

          <InlineCheck {...inlineChecks[4]} />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Cycle life vs calendar life — what limits useful life</ContentEyebrow>

          <Pullquote>Useful life = min(cycle life, calendar life). For UK domestic daily-cycled LFP, both land at ~15 years.</Pullquote>

          <ConceptBlock
            title="Cycle life and calendar life work in tandem"
            plainEnglish="Cycle life = number of full charge/discharge cycles before capacity falls below threshold (typically 80% original). Calendar life = years before capacity falls below threshold REGARDLESS of cycling. The battery hits whichever limit comes first."
            onSite="LFP daily-cycled @ 80% DoD UK domestic: 365 cycles/year × 16 years &asymp; 5,840 cycles. Cycle life 6,000-10,000 — well within. Calendar life 15-20 years. Useful life ~15-16 years. The two land in close agreement for typical daily cycling. For LOW-cycling installs (backup-only, weekend cottage), calendar life is the binding constraint."
          >
            <p>The two-limit life model:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Cycle life</strong> — depends on chemistry + DoD discipline + temperature. LFP @ 80% DoD: 6,000-10,000 cycles. NMC @ 80% DoD: 2,000-3,000. Pb-acid @ 50% DoD: 500-1,500</li>
              <li><strong className="text-white">DoD discipline trade-off</strong> — shallow cycling (50% DoD) doubles or triples cycle life vs deep cycling (90% DoD). LFP at 50% DoD can reach 15,000-20,000 cycles</li>
              <li><strong className="text-white">Calendar life</strong> — degradation in storage even without cycling. LFP ~2-3% per year; ~15-20 years calendar life</li>
              <li><strong className="text-white">Temperature factor</strong> — LFP optimal 15-25°C; sustained &ge;35°C doubles degradation rate; sustained &ge;40°C triples</li>
              <li><strong className="text-white">Useful life</strong> — min(cycle, calendar). Daily-cycled domestic typically cycle-bound (~15 years); backup-only typically calendar-bound (~15-20 years)</li>
              <li><strong className="text-white">Warranty alignment</strong> — UK 2025-2026 manufacturers typically warrant 10 years OR 6,000 cycles, whichever comes first; &ge;70-80% retention</li>
              <li><strong className="text-white">Design implication</strong> — for low-cycling installs, the customer can spec a smaller / cheaper pack; the cycle life is irrelevant</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>UK 2025-2026 brand landscape</ContentEyebrow>

          <Pullquote>GivEnergy + Tesla Powerwall 3 + Sigenergy lead the UK new-install market. All LFP.</Pullquote>

          <ConceptBlock
            title="UK 2025-2026 BESS brand landscape"
            plainEnglish="A small number of brands dominate UK domestic BESS in 2025-2026. All major players have moved to LFP (or are LFP from the start). Brand selection depends on customer ecosystem preference, integration with existing PV, price tier, and installer relationships."
            onSite="The competent surveyor presents 2-3 options at different price tiers (value / mainstream / premium) and explains the trade-offs. Customer makes the informed choice. Cert evidence bundle records the brand + model + chemistry + warranty + manufacturer datasheets."
          >
            <p>UK 2025-2026 domestic BESS brands (LFP, ordered roughly by UK install volume):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">GivEnergy</strong> — UK-designed and -manufactured (Newark, England). Gen3 hybrid inverter + 5/9.5/13.5 kWh LFP battery range. Dominant UK market share. Strong app + integration ecosystem. ~£4,500-£6,500 installed for 10 kWh</li>
              <li><strong className="text-white">Tesla Powerwall 3</strong> — Premium tier; 13.5 kWh LFP (Powerwall 2 was NMC, Powerwall 3 changed Q2 2024); built-in MPPT + EPS; sleek wall-mount; ~£8,000-£10,000+ installed</li>
              <li><strong className="text-white">Sigenergy SigenStor</strong> — Premium-tier modular LFP; SP series with stackable modules; strong telemetry / app; growing UK market share; ~£6,500-£8,500 installed for 10 kWh</li>
              <li><strong className="text-white">Huawei LUNA 2000</strong> — Mainstream LFP; pairs with Huawei SUN2000 hybrid inverter; established global brand; ~£5,500-£7,500 installed</li>
              <li><strong className="text-white">FoxESS</strong> — Value tier LFP; H1 hybrid + battery range; popular among cost-sensitive customers; ~£4,000-£5,500 installed</li>
              <li><strong className="text-white">SolarEdge</strong> — Energy Hub LFP for new-build; AC battery for retrofit; tight integration with SolarEdge HD-Wave / optimiser ecosystem; ~£6,000-£8,500 installed</li>
              <li><strong className="text-white">Enphase IQ Battery</strong> — AC-coupled LFP; pairs with Enphase microinverter PV; IQ Gateway orchestration; ~£6,500-£8,500 installed</li>
              <li><strong className="text-white">BYD Battery Box</strong> — Mainstream LFP; modular; partners with various hybrid inverter brands</li>
              <li><strong className="text-white">Sungrow / Sonnen / Senec</strong> — Niche UK presence; specific feature sets (Sonnen Virtual Power Plant participation, Senec community-energy schemes)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="UK suburban customer — new-build 5 kWp PV + 10 kWh BESS"
            situation="Customer in midlands suburban detached house. Wants new PV + BESS install for daily self-consumption + occasional grid-outage backup. Family of four, daytime occupancy partial (work-from-home + school-age), evening peak load. Budget moderate, prefers UK-supported brand."
            whatToDo="Recommend GivEnergy Gen3 5 kW hybrid inverter + GivEnergy 9.5 kWh LFP battery. Chemistry: LFP per the customer\'s safety + cycle life + cost priorities. Reg 570.5.1 selection rationale: (a) demand — daily self-consumption + occasional backup; (b) voltage — GivEnergy HV LFP (~200V nominal); (c) charge time — 4-6 hours from PV; (d) PV profile — 5 kWp midlands south-facing; (e) DC-coupled hybrid (Module 4.4); (f) UK 230V single-phase; (g) flat LFP discharge curve; (h) daily cycling, ~6,000 cycles design life; (i) wall-mounted indoor garage location; (j) UK indoor 15-25°C nominal. Cost ~£15,000-£17,000 turnkey (PV + BESS + inverter + scaffolding + electrical work + MCS + EREC). Cert evidence bundle: Section 712 PV pack + Chapter 57 BESS pack + Chapter 82 PEI pack."
            whyItMatters="LFP + GivEnergy is the UK 2025-2026 default for moderate-budget new-build customers. UK manufacturing matters for service network + warranty support. Daily cycling + 6,000 cycle target = ~16 year cycle life; calendar life 15-20 years; useful life ~15-16 years. The customer\'s informed decision: pay the LFP premium over hypothetical NMC for safety + cycle life. Cert evidence bundle records the selection rationale."
          />

          <Scenario
            title="Legacy off-grid customer — replacing aged Pb-acid bank"
            situation="Customer with 15-year-old off-grid PV install in rural Wales. Original Pb-acid bank (24 × 2V cells, ~30 kWh nameplate, 50% DoD limit = 15 kWh usable) is at end-of-life — capacity down ~70%, increasing maintenance burden. Considering replacement options."
            whatToDo="Replace with LFP — the chemistry choice is unambiguous in 2025-2026. Options: GivEnergy 13.5 kWh modular LFP, FoxESS H1+battery, Victron-compatible LFP (e.g. Pylontech US series). 80% DoD vs Pb-acid 50% DoD &rarr; 13.5 kWh LFP nameplate &asymp; 10.8 kWh usable vs Pb-acid 30 kWh nameplate 15 kWh usable. So smaller LFP pack matches or exceeds usable capacity. Cost: ~£6,000-£8,000 LFP replacement vs ~£3,000-£4,000 Pb-acid replacement. LFP wins on: cycle life (10&times; longer), maintenance (none vs annual equalisation + electrolyte checks for Pb-acid), safety (no hydrogen evolution requiring ventilation), efficiency (~95% vs ~85% round-trip). Section 551 still applies to the off-grid generating-set arrangement (Module 4 Section 2 + 3); Chapter 57 now applies to the new LFP install."
            whyItMatters="Lead-acid to LFP migration is the dominant UK off-grid story 2025-2026. The economics now favour LFP even with 2&times; upfront cost — 3&times; cycle life + lower maintenance + no hydrogen ventilation make it the rational choice. The competent surveyor explains the long-term cost-of-ownership; customer makes informed choice. Cert evidence bundle records the migration + the design rationale."
          />

          <CommonMistake
            title="Specifying NMC for UK domestic on the basis of higher energy density"
            whatHappens="An installer quotes a 10 kWh NMC pack for a customer who has plenty of wall space, claiming the NMC pack is &ldquo;smaller and lighter&rdquo;. Customer accepts. Three years later, learns from a neighbour&rsquo;s LFP install that LFP is safer + longer-lived + cheaper. Customer feels misled; install&rsquo;s second-hand value lower; warranty period shorter; fire-safety concerns surface during EICR."
            doInstead="LFP is the UK domestic default unless a specific factor pushes elsewhere. Energy density / weight differences are immaterial for a wall-mounted fixed install — the few extra kg of LFP doesn&rsquo;t change anything practical. Where customer asks &ldquo;what about NMC?&rdquo; explain honestly: NMC is for EVs (weight + range matters); LFP for fixed BESS (safety + cycle + cost wins). Most UK domestic installers now refuse to fit NMC for new domestic — the liability / safety case is clear. Cert evidence bundle records the LFP selection rationale per Reg 570.5.1."
          />

          <CommonMistake
            title="Mixing two different brands of LFP in parallel without manufacturer support"
            whatHappens="An installer adds a 5 kWh FoxESS battery alongside an existing 5 kWh GivEnergy battery to give the customer 10 kWh total. Each has its own BMS + PCE — but they share the AC bus. The two systems don&rsquo;t coordinate; one fully charges while the other is empty; both BMSs report fault conditions; customer&rsquo;s app shows confused state. Brand cross-support unavailable."
            doInstead="Never mix brands without explicit manufacturer support. Each BESS ecosystem expects to manage the energy flow holistically — mixing two ecosystems creates uncoordinated behaviour. Right answer: stay within one brand (add a second GivEnergy module to the existing GivEnergy install — explicitly supported) OR replace with a fresh single-brand install at the new capacity. Reg 570.5.1 selection rationale: the battery shall be suitable for the install — mixed-brand parallel fails this. Cert evidence bundle records the single-brand selection."
          />

          <CommonMistake
            title="Series-mixing batteries of different ages within one bank"
            whatHappens="A customer with an existing 4-year-old GivEnergy LFP battery wants to add capacity. Installer adds a new GivEnergy LFP module — but in series with the existing aged module. The BMS sees mismatched cell voltages + degradation rates; the older cells are stressed by the younger ones; capacity is constrained by the weakest cells; both modules&rsquo; lifespans shortened. Eventually triggers BMS fault and pack shutdown."
            doInstead="Never mix battery cells of different ages in series. Manufacturer&rsquo;s spec for modular systems usually requires same-batch or stated tolerance for parallel module additions. For series capacity expansion, the entire bank typically must be replaced together to maintain cell-level matching. Some brands (GivEnergy modular HV, BYD Battery Box) explicitly support parallel module additions across batches; check the manufacturer&rsquo;s documented support before adding modules to an aged bank. Cert evidence bundle records the module batch + age + the parallel/series configuration."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BESS = STATIONARY Battery Energy Storage System. Chapter 57 of BS 7671:2018+A4:2026 is the new regulatory home (effective 15 April 2026). Reg 570.1 sets scope; exclusions are for pluggable UPS, central safety supplies, fire alarm, alarm, machinery, emergency lighting.',
              'Reg 570.5.1 lists TEN battery selection factors (a)-(j): demand, voltage, charge/discharge time, generation profiles, PCE coupling, utilization voltage range, charge/discharge profiles, load profiles + cycling, fixed-install suitability, external influences. NOTE explicitly includes chemistry consideration.',
              'LFP (LiFePO4) is the dominant UK domestic chemistry 2025-2026 (~95%+ market share). Thermal runaway 270°C threshold + slow / less violent. Cycle life 6,000-10,000 at 80% DoD. Calendar life 15-20 years. No cobalt — ethical supply chain.',
              'NMC: high energy density (250 Wh/kg vs LFP 160), but lower cycle life (2-3k vs 6-10k), lower thermal-runaway threshold (210°C vs 270°C), cobalt-dependent. UK domestic 2025-2026 new install: rare. EV dominant.',
              'Lead-acid: legacy only — off-grid maintenance, niche applications. Cycle life 500-1,500 at 50% DoD; calendar life 5-10 years; hydrogen evolution + ventilation per BS EN IEC 62485-2.',
              'Flow batteries (VRFB): commercial / grid-scale only; not viable at UK domestic scale. Awareness for commercial / industrial cases.',
              'Useful life = min(cycle life, calendar life). Daily-cycled UK domestic LFP @ 80% DoD: ~5,840 cycles in 16 years; cycle life 6-10k; calendar 15-20. Both land at ~15-16 years.',
              'UK 2025-2026 LFP brands: GivEnergy (UK-manufactured, dominant), Tesla Powerwall 3 (LFP from Q2 2024), Sigenergy SigenStor, Huawei LUNA 2000, FoxESS, SolarEdge Energy Hub, Enphase IQ Battery, BYD Battery Box. All LFP for new domestic.',
              'Never mix series-connected batteries of different chemistries, brands, or batches. Parallel installation of complete BESS units only with explicit manufacturer support. Cert evidence bundle records configuration.',
              'Chapter 57 supported by: BS EN IEC 62485 series (general / stationary / lithium-ion); PAS 63100:2024 (UK domestic install spec); Chapter 82 (PEI integration where applicable). Cert evidence bundle records compliance against each.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 BMS, balancing, SoC/SoH
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
