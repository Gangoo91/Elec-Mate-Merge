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
    id: 'm2s7-dc-coupling',
    question:
      'DC-coupled hybrid PV+BESS — what does the energy flow look like?',
    options: [
      'PV to grid, battery to grid, no shared path',
      'PV → hybrid inverter DC bus → battery (via DC-DC stage) OR DC-AC inverter → grid. Energy from PV to battery stays on the DC side (one conversion: DC-DC with MPPT). Energy from PV or battery to grid takes one DC-AC conversion. The hybrid inverter handles both functions in one product',
      'PV bypasses the inverter',
      'Battery only charges from grid',
    ],
    correctIndex: 1,
    explanation:
      'DC-coupled hybrid architecture keeps PV-to-battery energy flow on the DC side. The hybrid inverter has a common DC bus shared between the PV input stage (MPPT-controlled), the battery DC-DC stage (battery management), and the DC-AC inverter stage (grid output). Energy from PV → battery is one DC-DC conversion (typically ~98% efficient). Energy from PV → grid OR battery → grid is one DC-AC conversion (typically ~96–98% efficient). The result: lowest conversion losses on a hybrid system, particularly for PV → battery → later-discharge-to-grid use cases.',
  },
  {
    id: 'm2s7-ac-coupling',
    question:
      'AC-coupled hybrid PV+BESS — what does the energy flow look like?',
    options: [
      'Same as DC-coupled',
      'PV → PV string inverter → AC grid → battery inverter → battery (DC). Energy from PV to battery takes DC-AC-DC conversion (two stages). Energy from battery to grid takes DC-AC conversion (one stage). Two inverters share the AC connection: the PV string inverter and the battery inverter',
      'No inverters needed',
      'Battery has no AC path',
    ],
    correctIndex: 1,
    explanation:
      'AC-coupled hybrid architecture uses two separate inverters: a PV string inverter (PV → AC) and a battery inverter (battery ↔ AC). PV → AC happens via the PV string inverter (one DC-AC conversion). AC → battery happens via the battery inverter (one AC-DC conversion). Net PV → battery is DC-AC-DC — two conversions, accumulating losses (~95% × ~95% = ~90% round-trip including the conversions). The retrofit case where AC-coupled wins: existing PV install with a working string inverter, adding battery later without replacing the PV inverter.',
  },
  {
    id: 'm2s7-conversion-losses',
    question:
      'A 5 kWh charge from PV → battery, compared on DC-coupled vs AC-coupled architectures. Approximate energy actually stored in the battery (each conversion stage ~98% efficient):',
    options: [
      'Both architectures lose 50%',
      'DC-coupled: 5 kWh × 0.98 (DC-DC) = ~4.9 kWh stored. AC-coupled: 5 kWh × 0.96 (DC-AC) × 0.96 (AC-DC) = ~4.6 kWh stored. The DC-coupled advantage is ~6% on every PV-to-battery transfer — a material long-term yield difference',
      'AC-coupled stores more',
      'Both store exactly 5 kWh',
    ],
    correctIndex: 1,
    explanation:
      'The DC-coupled vs AC-coupled conversion arithmetic favours DC-coupled on PV-to-battery transfers. DC-coupled goes through one DC-DC stage (~98% efficient typical). AC-coupled goes through DC-AC (~96%) and then AC-DC (~96%), accumulating to ~92% round-trip on the conversion alone. On a 5 kWh transfer, the difference is ~5–6% of the stored energy. Over a 25-year install at typical battery cycling (1 cycle per day), the cumulative conversion loss difference is meaningful. The retrofit case where AC-coupled is still chosen: existing working PV inverter + adding battery later (where the alternative is replacing the PV inverter with a hybrid).',
  },
  {
    id: 'm2s7-when-dc-coupling-wins',
    question:
      'When does DC-coupled hybrid architecture win the design conversation?',
    options: [
      'Never',
      'On new-build PV+BESS installs (single hybrid inverter, single product, fewest conversions). On planned PV+BESS where the battery is part of the original design. On installs where backup-power capability matters (most hybrid inverters provide a backup port; the same product handles PV, battery, grid and backup loads)',
      'Only off-grid',
      'Only commercial',
    ],
    correctIndex: 1,
    explanation:
      'DC-coupled wins on new-build and planned PV+BESS installs where the battery is in scope from the start. The hybrid inverter is a single product handling all four functions (PV MPPT, battery management, grid synchronisation, backup port). Conversion losses are lowest. Hardware count is lowest. The PV inverter and battery inverter are combined; no second box on the wall. The cert evidence bundle is simpler. Most residential PV+BESS installs in 2026 use DC-coupled hybrid inverters as the default architecture.',
  },
  {
    id: 'm2s7-when-ac-coupling-wins',
    question:
      'When does AC-coupled hybrid architecture win the design conversation?',
    options: [
      'Never',
      'On retrofit installs where existing PV string inverter is working and battery is being added later — the existing PV inverter is kept; a separate battery inverter is added. Also on installs where the battery is sourced separately from the PV system, or where the PV and battery are managed by different ownership entities (e.g. utility-owned battery on customer-owned PV)',
      'Only on new-builds',
      'Only on off-grid',
    ],
    correctIndex: 1,
    explanation:
      'AC-coupled wins on retrofit-battery installs. The existing PV string inverter is working and producing yield; replacing it with a hybrid inverter would be a sunk cost. AC-coupled adds a separate battery inverter to the existing install — the battery connects to the AC grid via its own inverter; the existing PV inverter continues to operate unchanged. The architecture also handles cases where PV and battery are sourced from different manufacturers / suppliers / ownership entities. The conversion-loss penalty (Section 2.5\'s arithmetic) is the cost; the simplicity of not replacing the existing PV inverter is the benefit.',
  },
  {
    id: 'm2s7-chapter-82-pei',
    question:
      'Chapter 82 (Prosumer\'s Electrical Installations, new in A4:2026) treats hybrid PV+BESS as a system. How does it relate to the DC vs AC coupling architectural choice?',
    options: [
      'Chapter 82 prefers DC-coupled',
      'Chapter 82 applies regardless of coupling — both DC-coupled and AC-coupled hybrid installs are PEIs (installations with local production and storage of energy). Chapter 82 requires the system-level design discipline (load management, multi-source fault contribution, protection coordination) on either architecture',
      'Chapter 82 only applies to AC-coupled',
      'Chapter 82 excludes hybrid systems',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 82 PEI framing applies to any installation with local production and/or storage of energy — both DC-coupled and AC-coupled hybrid installs qualify. The chapter requires system-level design discipline: load management coordination, multi-source fault current analysis, protection coordination across sources. The DC vs AC coupling choice is an architectural decision; the Chapter 82 design discipline applies above it. The cert evidence bundle records the PEI design pack regardless of coupling architecture.',
  },
  {
    id: 'm2s7-backup-power',
    question:
      'Many DC-coupled hybrid inverters include a backup port — what does it do?',
    options: [
      'Nothing useful',
      'During a grid outage, the inverter disconnects from the grid (anti-islanding per Section 551 — Module 1 Section 5) but continues to power dedicated backup loads via the backup port, using PV + battery (where available). The customer\'s essential loads (e.g. fridge, lighting, broadband router) stay running during the outage. Configuration limits typically apply — backup port power rating, the number of essential loads, manual or automatic transfer',
      'It charges the battery faster',
      'It bypasses the inverter',
    ],
    correctIndex: 1,
    explanation:
      'The backup port (sometimes called &ldquo;EPS&rdquo; — Emergency Power Supply, or &ldquo;backup output&rdquo;) on a hybrid inverter provides AC supply to dedicated loads during a grid outage. When the grid fails, the inverter performs anti-islanding (disconnects from grid per 551.7.4) but continues to operate the backup port — drawing from PV and battery. The customer\'s essential loads remain powered. The configuration is a separate consumer unit fed from the backup port, with the essential circuits routed via that consumer unit. Typical backup port power rating is 2–5 kW on residential inverters; commercial inverters offer higher backup ratings. The backup capability is a customer-value differentiator and a survey-stage conversation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A new-build customer with 5 kWp PV and 10 kWh BESS planned together. Which coupling architecture is the natural choice?',
    options: [
      'AC-coupled — separate PV and battery inverters',
      'DC-coupled hybrid inverter — single product, fewest conversions, lowest cost overall for PV+BESS in one project. The hybrid inverter handles PV MPPT, battery management, grid synchronisation, and backup port output in one box',
      'No coupling needed',
      'Two batteries',
    ],
    correctAnswer: 1,
    explanation:
      'New-build PV+BESS installed together is the natural DC-coupled hybrid case. One hybrid inverter handles everything. Fewer products on the wall. Lower conversion losses (one DC-DC for PV-to-battery, one DC-AC for output). Simpler cert evidence bundle. Most modern hybrid inverters also include a backup port for grid-outage operation. The architectural alternative (AC-coupled with separate PV inverter + battery inverter) has no advantage in this scenario — more products, more conversions, higher cost, no offsetting benefit.',
  },
  {
    id: 2,
    question:
      'A customer with a 2019-vintage 4 kWp PV install (working SMA string inverter, no battery) wants to add a 10 kWh battery now. The PV inverter has 8+ years of useful life remaining. Best architecture?',
    options: [
      'Replace the existing PV inverter with a hybrid and start over',
      'AC-coupled battery — add a separate battery inverter that connects to the AC grid (alongside the existing PV inverter). The PV inverter continues unchanged; the battery inverter handles battery-to-grid and grid-to-battery flows. Accept the conversion-loss penalty (DC-AC-DC for PV-to-battery transfers) in exchange for keeping the working PV inverter',
      'Disconnect the PV',
      'Add a second PV array',
    ],
    correctAnswer: 1,
    explanation:
      'AC-coupled is the right retrofit-battery choice when the existing PV inverter is working and has useful life remaining. Replacing the PV inverter with a hybrid is a sunk-cost on equipment with 8+ years of life left. The conversion-loss penalty on AC-coupled (~5–6% on PV-to-battery transfers vs DC-coupled) is real but accepted in exchange for keeping the working PV inverter. Over the remaining PV inverter life, the cumulative conversion loss is the cost; the saved cost of NOT replacing the PV inverter is the benefit. Run the numbers; AC-coupled usually wins for retrofit-battery scenarios with &gt; 3–5 years remaining PV inverter life.',
  },
  {
    id: 3,
    question:
      'Calculate the round-trip efficiency for AC-coupled hybrid: PV → battery → later grid export. Each conversion stage ~96% efficient (DC-AC and AC-DC).',
    options: [
      '100% — no losses',
      'PV → AC (96%) → battery (96% AC-DC) → battery storage (~95% round-trip battery efficiency, captured separately) → AC (96% DC-AC) → grid. PV-to-grid round-trip via battery: 0.96 × 0.96 × 0.95 × 0.96 ≈ 0.84 = ~84% effective round-trip. Vs DC-coupled equivalent ~89–91% — the AC-coupled architecture loses ~5–7% on every PV-via-battery cycle',
      '50%',
      '25%',
    ],
    correctAnswer: 1,
    explanation:
      'The round-trip arithmetic: AC-coupled PV → battery → grid is four conversion stages (DC-AC at PV inverter; AC-DC at battery inverter; battery round-trip efficiency on storage; DC-AC at battery inverter for export). 0.96 × 0.96 × 0.95 × 0.96 ≈ 0.84. DC-coupled equivalent: DC-DC at PV stage (~98%) × battery round-trip (~95%) × DC-AC at output (~96%) ≈ 0.89. The ~5% difference is the conversion-loss penalty for AC coupling. Over a 25-year install at typical battery cycling, the cumulative energy loss difference is material — but the retrofit benefit (not replacing the PV inverter) often dominates the decision.',
  },
  {
    id: 4,
    question:
      'A customer wants backup-power capability during grid outages — essential loads (fridge, lighting, broadband, kitchen) supplied from PV+battery during the outage. Which architecture is best matched?',
    options: [
      'AC-coupled with no backup',
      'DC-coupled hybrid with a backup port (EPS / Emergency Power Supply). The backup port output operates independently of the grid — when the grid fails, the inverter disconnects from grid (anti-islanding per Section 551) but continues to power the backup loads from PV and battery. The customer\'s essential loads stay running during the outage',
      'Standalone diesel generator',
      'Manual transfer switch only',
    ],
    correctAnswer: 1,
    explanation:
      'Backup-power capability is the natural strength of DC-coupled hybrid inverters. Most modern hybrid inverters include a backup port that maintains AC output to dedicated essential loads during a grid outage. The customer\'s essential consumer unit (fridge, lighting, broadband router, etc.) is fed from the backup port; the standard consumer unit (general loads) is on the grid-supplied side. During a grid outage, the hybrid inverter disconnects from the grid (anti-islanding) but continues operating the backup port — the customer\'s essential loads remain powered as long as PV + battery have capacity.',
  },
  {
    id: 5,
    question:
      'Chapter 82 (PEI framework) applies to hybrid PV+BESS regardless of coupling architecture. What system-level design discipline does it require?',
    options: [
      'No additional design discipline',
      'Load management coordination (when PV exports, when battery discharges, when EV charges, when heat pump runs — system-level orchestration); multi-source fault current contribution (PV + battery can both contribute to a fault, design must handle the combined fault current); protection coordination across sources (the bidirectional protective device per Reg 551.7.1(c) applied per source)',
      'Just paint the inverter yellow',
      'Manual switching only',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 82 PEI framework requires system-level design discipline above the per-technology chapters. Three key items. Load management — orchestrating when PV exports, battery discharges, EV charges, heat pump operates, to stay within supply constraints and optimise self-consumption. Multi-source fault current contribution — under fault, both PV inverter and battery inverter contribute fault current; the protection must handle the combined contribution. Protection coordination — the bidirectional protective device under Reg 551.7.1(c) applies to each source; the cert evidence bundle records the per-source arrangement.',
  },
  {
    id: 6,
    question:
      'A 6 kWp PV install in 2022 with an AC-coupled 5 kWh battery added in 2024. The customer in 2026 wants to add EV charging and a heat pump. What\'s the architectural conversation now?',
    options: [
      'Just add the new technology',
      'Re-survey under Chapter 82 PEI framework — the full hybrid stack now includes PV (AC-coupled to grid) + battery (AC-coupled, separate inverter) + EV charging + heat pump. Load management, multi-source fault contribution, protection coordination need design-stage attention; possibly the existing AC-coupled architecture stays (simpler retrofit) or possibly migrate to a hybrid inverter (cleaner architecture, but at the cost of replacing the existing PV and battery inverters). Cost-benefit per the specific install',
      'Disconnect everything',
      'Use only one technology at a time',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-technology hybrid installs grown over time often end up with a mix of architectures — AC-coupled PV plus AC-coupled battery plus separately-installed EV plus separately-installed heat pump. Chapter 82 requires the system-level design discipline regardless of how the install grew. The re-survey conversation: does the architecture still make sense, or should the install migrate to a cleaner architecture (e.g. replacing the separate AC-coupled PV and battery inverters with a single hybrid inverter, leaving the EV and heat pump on their own circuits but managed within the Chapter 82 PEI design)? The economics depend on the specific install. The competent installer reads the existing architecture, proposes the right next-step, and documents the design rationale.',
  },
  {
    id: 7,
    question:
      'A customer\'s typical day looks like: PV produces ~25 kWh; household uses ~15 kWh during daylight; battery cycles ~8 kWh per day; remaining 2 kWh exports to grid. Over a year, how do the DC-coupled and AC-coupled architectures compare on energy delivered to household + battery + grid?',
    options: [
      'They\'re identical',
      'DC-coupled delivers ~5–7% more usable energy over the year because PV-to-battery transfers happen at one DC-DC conversion (~98% efficient) rather than the AC-coupled two-conversion path (DC-AC-DC, ~92% on the conversions). Over 25 years and ~3,000 battery cycles per year, the cumulative energy difference is substantial',
      'AC-coupled delivers more',
      'Neither stores energy',
    ],
    correctAnswer: 1,
    explanation:
      'The DC-coupled advantage on the daily PV-to-battery cycle is ~5–7% over the year. On a customer cycling 8 kWh per day through the battery, that\'s ~145 kWh of saved energy per year vs AC-coupled — at typical UK electricity pricing, ~£40–50/year. Over 25 years, ~£1,000–1,500. This is the operational case for DC-coupled on new-build PV+BESS installs. On retrofit-battery cases, the calculation flips because replacing the working PV inverter to migrate to DC-coupled is a sunk cost that exceeds the conversion-loss saving over the remaining PV inverter life.',
  },
  {
    id: 8,
    question:
      'A customer-side question: &ldquo;why is the hybrid inverter so much more expensive than the PV string inverter, when the PV array is the same size?&rdquo;. The right professional explanation:',
    options: [
      'No reason',
      'The hybrid inverter combines PV inverter + battery inverter + battery management + backup port into one product. The premium over a PV-only string inverter (~£100–200 typically) reflects the additional functionality. The cost saved is the separate battery inverter that AC-coupled architecture would require — typically £700–1,500 depending on battery size',
      'Marketing',
      'Tax',
    ],
    correctAnswer: 1,
    explanation:
      'The hybrid inverter premium over PV-only string inverter is real but modest (~£100–200). The product combines PV inverter + battery management + backup port functionality. The architectural saving is the separate battery inverter that AC-coupled requires (typically £700–1,500). On a new-build PV+BESS install, hybrid is materially cheaper than PV-only string inverter + separate battery inverter combined. On a retrofit PV-only install where battery is added later, AC-coupled (existing PV inverter + new battery inverter) is the natural path because the PV inverter is sunk.',
  },
];

const faqs = [
  {
    question:
      'What\'s the typical round-trip efficiency for DC-coupled vs AC-coupled hybrid PV+BESS?',
    answer:
      'DC-coupled PV → battery → grid round-trip: ~89–91% (one DC-DC conversion + battery round-trip + one DC-AC conversion). AC-coupled PV → battery → grid round-trip: ~84% (DC-AC + AC-DC + battery + DC-AC). The 5–7% difference accumulates over the install life — typically £40–50/year on a 10 kWh residential system, ~£1,000–1,500 over 25 years. The retrofit case where AC-coupled is still chosen: keeping the existing working PV inverter rather than replacing it.',
  },
  {
    question:
      'Can I mix DC-coupled and AC-coupled on the same install — e.g. DC-coupled PV+BESS plus AC-coupled second battery?',
    answer:
      'Yes, and it\'s sometimes the right architecture for expansion. A customer with a DC-coupled hybrid inverter + 10 kWh battery wanting to expand to 20 kWh has two paths: replace the existing battery with a 20 kWh unit (if the hybrid inverter supports it — check the manufacturer\'s spec), OR add an AC-coupled second battery via a battery inverter. The AC-coupled second battery accepts the conversion-loss penalty in exchange for not replacing the existing battery. Chapter 82 PEI design discipline applies to the combined install.',
  },
  {
    question:
      'How does the backup port on a hybrid inverter actually work during a grid outage?',
    answer:
      'The backup port is electrically isolated from the grid via an internal transfer switch in the hybrid inverter. During normal operation (grid present), the backup port is fed from the grid (or from PV via the inverter\'s internal AC bus). During a grid outage, the transfer switch disconnects the backup port from the grid (anti-islanding per Section 551 — Module 1 Section 5), and the inverter continues to power the backup port from PV (if daylight) and battery. The transfer typically takes 20–100 ms (essentially seamless from the load\'s perspective). Capacity is limited by the inverter\'s backup port rating (typically 2–5 kW residential, higher on commercial) and the battery\'s remaining capacity.',
  },
  {
    question:
      'Which loads typically go on the backup-port circuit during a grid outage?',
    answer:
      'Essential loads — fridge, freezer, lighting (some), broadband router and modem, boiler controls (for gas/oil-fired heating), security alarm, mobile phone chargers. Non-essential loads — electric oven, electric shower, EV charging, electric immersion heater, electric heating — typically stay on the standard (non-backup) consumer unit because they would deplete the battery rapidly. The split is a customer conversation at survey stage; the cert evidence bundle records the essential-loads consumer unit arrangement.',
  },
  {
    question:
      'How does Chapter 82 PEI design discipline differ between DC-coupled and AC-coupled architectures?',
    answer:
      'Chapter 82 requires the same system-level design discipline regardless of coupling architecture. Load management, multi-source fault current contribution, protection coordination — all apply. The architectural difference doesn\'t change the regulatory requirements; it changes the design details. DC-coupled has fewer physical interconnections (one inverter); AC-coupled has two separate inverter outputs to coordinate. Both end at the same Chapter 82 PEI design pack: documented load management, fault current analysis, protection coordination, cert evidence bundle.',
  },
  {
    question:
      'What happens if PV is producing more than the battery can absorb on a DC-coupled hybrid?',
    answer:
      'The hybrid inverter\'s control logic prioritises by user-configurable settings. Typical priority order: self-consumption first (PV → household loads, on AC side); then battery charging (PV → battery via DC-DC); then export to grid (PV → AC → grid). If PV production exceeds household demand + battery charging headroom, the excess exports to grid. If the battery is full and grid export is limited (G100 export limitation), the inverter throttles PV production by moving off-MPP — accepting a yield loss to stay within limits. The customer\'s tariff structure (time-of-use, SEG rates) drives whether to prioritise self-consumption, battery, or export.',
  },
  {
    question:
      'How does the cert evidence bundle differ for DC-coupled vs AC-coupled hybrid?',
    answer:
      'DC-coupled — single hybrid inverter datasheet (BS EN 62109-1/-2 conformity, MCS Product List eligibility, EREC G98/G99 compliance), per the hybrid inverter\'s combined functions. Single G98/G99 notification per the inverter\'s output rating. AC-coupled — separate PV string inverter datasheet AND separate battery inverter datasheet (both with conformity records). G98/G99 notification covers the aggregate generation capacity (PV inverter + battery inverter\'s export capability). The Chapter 82 PEI design pack is similar in both cases. The cert evidence bundle is slightly more complex for AC-coupled because of the two separate inverter products.',
  },
  {
    question:
      'For a customer planning PV now and battery in 12–18 months, what\'s the right inverter specification today?',
    answer:
      'Specify a hybrid inverter now, even though the battery isn\'t being installed yet. The hybrid inverter handles PV-only operation cleanly today; adding the DC-coupled battery in 12–18 months is a battery-and-cabling job, not an inverter replacement. The £100–200 premium on the hybrid inverter (vs PV-only string inverter) avoids the £700–1,500 cost of a separate battery inverter on AC-coupled retrofit later. The customer\'s 18-month battery plan dictates the inverter choice now; specifying a PV-only string inverter today locks in a more expensive battery install later.',
  },
  {
    question:
      'Are there any cases where AC-coupled is preferred for new-build PV+BESS, not just retrofit?',
    answer:
      'Rare but real. AC-coupled may be preferred where: (1) The customer\'s PV and battery are sourced from different manufacturers / ecosystems with no compatible hybrid inverter option (some battery brands work only with their own battery inverter); (2) Very large PV or battery capacities where individual hybrid inverter products are not yet available — separate large-capacity products in AC-coupled are sometimes the only option; (3) Multi-stakeholder installations where PV and battery are owned by different entities (e.g. customer-owned PV, utility-owned battery for grid services). For mainstream residential PV+BESS, DC-coupled hybrid is the default; the AC-coupled cases are edge-cases not the rule.',
  },
];

export default function RenewableEnergyModule2Section7() {
  const navigate = useNavigate();

  useSEO({
    title:
      'DC vs AC coupling on hybrid PV+BESS | Renewable Energy 2.7 | Elec-Mate',
    description:
      'The architectural choice between DC-coupled hybrid inverter and AC-coupled separate PV inverter + battery inverter — where each wins, the conversion-loss arithmetic, the retrofit vs new-build decisions, and how Chapter 82 PEI design discipline applies to both.',
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
            eyebrow="Module 2 · Section 7 · BS 7671:2018+A4:2026"
            title="DC vs AC coupling on hybrid PV + BESS"
            description="The architectural choice between DC-coupled hybrid inverter and AC-coupled separate PV + battery inverters. Conversion-loss arithmetic, retrofit vs new-build decisions, and Chapter 82 PEI framing."
            tone="yellow"
          />

          <TLDR
            points={[
              'DC-coupled hybrid: PV and battery share a common DC bus inside a single hybrid inverter. One DC-DC conversion for PV-to-battery (~98% efficient); one DC-AC conversion for output to grid (~96–98% efficient). Lowest conversion losses on hybrid systems.',
              'AC-coupled hybrid: separate PV string inverter (PV → AC) and battery inverter (battery ↔ AC). PV-to-battery transfers take DC-AC-DC (two conversions, ~92% on the conversions alone). 5–7% conversion-loss penalty vs DC-coupled.',
              'DC-coupled wins on new-build / planned PV+BESS installs — fewer products, lower losses, simpler architecture, single product handling PV MPPT + battery management + grid sync + backup port.',
              'AC-coupled wins on retrofit-battery installs — existing PV inverter has useful life remaining; replacing it with a hybrid is a sunk cost. The conversion-loss penalty is accepted for the retrofit benefit.',
              'Chapter 82 (PEI framework, new in A4:2026) applies regardless of coupling architecture. The system-level design discipline (load management, multi-source fault contribution, protection coordination) is mandatory on hybrid installs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the architectural difference between DC-coupled hybrid and AC-coupled hybrid PV+BESS systems.',
              'Calculate the conversion-loss arithmetic for both architectures and quantify the long-term yield difference.',
              'Apply the four-question decision framework: new-build or retrofit? PV inverter age and remaining life? Backup-power required? Single-product or multi-product architecture preferred?',
              'Specify the right architecture per install — DC-coupled for new-build PV+BESS; AC-coupled for retrofit-battery on working PV inverters.',
              'Apply Chapter 82 PEI design discipline regardless of coupling architecture — load management, fault current contribution, protection coordination.',
              'Specify backup-port-capable hybrid inverters where the customer values grid-outage operation, and configure the essential-loads consumer unit arrangement.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>DC-coupled for new-build. AC-coupled for retrofit. Both are PEIs under Chapter 82.</Pullquote>

          <ContentEyebrow>The two architectures — and their energy flows</ContentEyebrow>

          <ConceptBlock
            title="DC-coupled hybrid — single product, shared DC bus"
            plainEnglish="DC-coupled hybrid PV+BESS uses a single hybrid inverter with a common internal DC bus shared between PV input, battery storage, and the DC-AC output stage. Energy from PV to battery stays on the DC side; only one DC-AC conversion happens for output to grid."
            onSite="The DC-coupled architecture is the natural choice for new-build PV+BESS or any install where battery is part of the original design. Single product, fewer interconnections, lowest conversion losses, backup port for grid-outage operation."
          >
            <p>DC-coupled energy flows:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV → load</strong> — PV input stage with
                MPPT → common DC bus → DC-AC output → load. One DC-AC conversion
                (~96–98%)
              </li>
              <li>
                <strong className="text-white">PV → battery</strong> — PV input stage
                with MPPT → common DC bus → battery DC-DC stage → battery. One DC-DC
                conversion (~98%) — the lowest-loss path
              </li>
              <li>
                <strong className="text-white">Battery → load</strong> — battery →
                battery DC-DC stage → common DC bus → DC-AC output → load. One DC-AC
                conversion (~96–98%)
              </li>
              <li>
                <strong className="text-white">PV → grid (export)</strong> — PV → DC bus
                → DC-AC → grid. One DC-AC conversion
              </li>
              <li>
                <strong className="text-white">Battery → backup port</strong> — battery
                → DC-AC → backup port (during grid outage). One DC-AC conversion; the
                inverter\'s internal transfer switch isolates the backup port from the
                grid
              </li>
            </ul>
            <p>Round-trip efficiency on PV → battery → later grid export:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>PV-to-DC bus: ~98% (DC-DC with MPPT)</li>
              <li>DC bus to battery: ~98% (battery DC-DC stage)</li>
              <li>Battery round-trip electrochemical efficiency: ~95% (typical LFP)</li>
              <li>Battery to DC bus: ~98% (battery DC-DC stage)</li>
              <li>DC bus to grid: ~96% (DC-AC inverter)</li>
              <li>
                <strong className="text-white">Overall round-trip: ~89–91%</strong> — the
                lowest-loss path for PV-via-battery to grid
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="AC-coupled hybrid — two products, AC interconnection"
            plainEnglish="AC-coupled hybrid PV+BESS uses two separate inverters: a PV string inverter (PV → AC) and a battery inverter (battery ↔ AC). Both share the AC consumer unit. PV-to-battery energy transfers go through DC-AC then AC-DC — two conversions, accumulating losses."
            onSite="The AC-coupled architecture is the natural choice for retrofit-battery installs where an existing PV inverter has useful life remaining. The conversion-loss penalty (~5–7% on PV-to-battery transfers) is accepted in exchange for not replacing the working PV inverter."
          >
            <p>AC-coupled energy flows:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV → load</strong> — PV → PV string
                inverter → AC consumer unit → load. One DC-AC conversion (~96–98%) —
                same as DC-coupled equivalent
              </li>
              <li>
                <strong className="text-white">PV → battery</strong> — PV → PV string
                inverter → AC → battery inverter → battery. DC-AC (~96%) plus AC-DC
                (~96%) = ~92% on the conversions alone. Higher loss than DC-coupled
                equivalent
              </li>
              <li>
                <strong className="text-white">Battery → load</strong> — battery →
                battery inverter → AC consumer unit → load. One DC-AC conversion
                (~96–98%) — same as DC-coupled equivalent
              </li>
              <li>
                <strong className="text-white">PV → grid (export)</strong> — PV → PV
                inverter → AC → grid. One DC-AC conversion
              </li>
              <li>
                <strong className="text-white">Battery → backup port</strong> — typically
                requires a dedicated battery inverter with backup capability. Some
                battery inverters provide a backup port; others do not. Check the
                product spec
              </li>
            </ul>
            <p>Round-trip efficiency on PV → battery → later grid export:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>PV inverter DC-AC: ~96%</li>
              <li>Battery inverter AC-DC: ~96%</li>
              <li>Battery round-trip electrochemical efficiency: ~95% (typical LFP)</li>
              <li>Battery inverter DC-AC: ~96%</li>
              <li>
                <strong className="text-white">Overall round-trip: ~84%</strong> — the
                cost of the additional AC-DC conversion stage
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>When each architecture wins</ContentEyebrow>

          <Pullquote>The architecture follows the install history. New-build = DC. Retrofit-battery = AC.</Pullquote>

          <ConceptBlock
            title="The decision framework — four questions"
            plainEnglish="Four survey-stage questions resolve most coupling architecture decisions: new-build or retrofit? PV inverter age and remaining life? Backup-power required? Single-product or multi-product preference?"
            onSite="DC-coupled is the default for new-build PV+BESS in 2026. AC-coupled remains the right answer for retrofit-battery installs where the existing PV inverter is working and has &gt; 3–5 years of useful life remaining."
          >
            <p>Question 1 — new-build or retrofit?</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">New-build PV+BESS together</strong> —
                DC-coupled hybrid is the natural choice. Single product, fewest
                conversions, lowest hardware cost.
              </li>
              <li>
                <strong className="text-white">Retrofit battery onto existing PV</strong>
                {' '}— AC-coupled is the natural choice if existing PV inverter has
                useful life remaining.
              </li>
            </ul>
            <p>Question 2 — existing PV inverter age and remaining life?</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">&lt; 5 years old, 10+ years remaining</strong>
                {' '}— AC-coupled retrofit (keep the working inverter)
              </li>
              <li>
                <strong className="text-white">5–10 years old, 5–10 years remaining</strong>
                {' '}— consider both; the cost-benefit balances conversion-loss savings
                against PV inverter replacement cost
              </li>
              <li>
                <strong className="text-white">&gt; 10 years old, near end-of-life</strong>
                {' '}— PV inverter replacement is in scope anyway; specify DC-coupled
                hybrid as the replacement
              </li>
            </ul>
            <p>Question 3 — backup-power capability required?</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Yes — backup required</strong> — DC-coupled
                hybrid with backup port is the standard choice. Most modern hybrid
                inverters include this functionality
              </li>
              <li>
                <strong className="text-white">No — backup not required</strong> —
                AC-coupled or DC-coupled both work; decision driven by Question 1 and 2
              </li>
            </ul>
            <p>Question 4 — single-product or multi-product preference?</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Single-product preferred</strong> — DC-coupled
                hybrid (one inverter on the wall, one product to support)
              </li>
              <li>
                <strong className="text-white">Multi-product acceptable</strong> — either
                architecture works
              </li>
              <li>
                <strong className="text-white">Different ownership / vendor for PV vs
                battery</strong> — AC-coupled may be required (e.g. utility-owned
                battery on customer-owned PV)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Chapter 82 PEI framing applies regardless of coupling</ContentEyebrow>

          <Pullquote>Coupling architecture is the engineering. Chapter 82 PEI is the regulatory layer.</Pullquote>

          <ConceptBlock
            title="Chapter 82 PEI design discipline on hybrid installs"
            plainEnglish="A4:2026 introduced Chapter 82 — Prosumer\'s Electrical Installations. Both DC-coupled and AC-coupled hybrid installs are PEIs. Chapter 82 requires system-level design discipline regardless of the coupling architecture chosen."
            onSite="The cert evidence bundle on a hybrid install includes the Chapter 82 PEI design pack — load management, multi-source fault current analysis, protection coordination. Coupling architecture is documented as part of the design pack but is the engineering decision, not the regulatory layer."
          >
            <p>Chapter 82 PEI requirements that apply to both architectures:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Load management coordination</strong> —
                orchestrating PV export, battery charge / discharge, EV charging, heat
                pump operation, household loads. The PEI design specifies the priority
                logic and the override conditions
              </li>
              <li>
                <strong className="text-white">Multi-source fault current contribution</strong>
                {' '}— under a fault, both PV and battery can contribute fault current.
                The protection design handles the combined contribution; the cert
                evidence bundle records the fault current calculation
              </li>
              <li>
                <strong className="text-white">Protection coordination across sources</strong>
                {' '}— the bidirectional protective device under Reg 551.7.1(c) applies
                per source. DC-coupled has fewer protection points (one inverter);
                AC-coupled has two (PV inverter + battery inverter)
              </li>
              <li>
                <strong className="text-white">Anti-islanding coordination</strong> —
                both inverters in an AC-coupled system must disconnect cleanly on grid
                loss. The hybrid inverter in DC-coupled handles this in one product
              </li>
              <li>
                <strong className="text-white">G99 notification</strong> — the aggregate
                generation capacity (PV + battery export capability) drives the EREC
                G98 / G99 threshold determination, regardless of coupling architecture
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 82 — applies to PEIs regardless of coupling"
            clause="Chapter 82 provides additional requirements, measures and recommendations for design, erection and verification of all types of low-voltage electrical installations designated as Prosumer\'s Electrical Installations (PEIs). It applies where local production and/or storage of energy is present in a low-voltage installation — covering both DC-coupled hybrid architectures (single inverter combining PV and battery) and AC-coupled hybrid architectures (separate PV and battery inverters)."
            meaning="Chapter 82 PEI design discipline applies regardless of how PV and battery are coupled. Both architectures must satisfy load management coordination, multi-source fault current analysis, protection coordination, anti-islanding, and the appropriate G98/G99 DNO notification. The coupling architecture is engineering; the Chapter 82 discipline is regulatory."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Backup power — the DC-coupled hybrid value-add</ContentEyebrow>

          <Pullquote>Backup port: essential loads stay running during a grid outage.</Pullquote>

          <ConceptBlock
            title="The backup port — what it does and how to specify it"
            plainEnglish="Most modern DC-coupled hybrid inverters include a backup port (sometimes called EPS — Emergency Power Supply). During a grid outage, the inverter performs anti-islanding (disconnects from grid per Section 551), then continues operating the backup port from PV + battery. Essential loads stay powered."
            onSite="Survey-stage conversation: which loads does the customer want backed up? The essential-loads consumer unit arrangement (typically fridge, lighting, broadband, boiler controls) sits on the backup port; the standard consumer unit (general loads) sits on the grid-supplied side. The transfer between grid and backup operation is automatic and typically 20–100 ms."
          >
            <p>Backup port specifications and configuration:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Backup port rating</strong> — typical
                residential 2–5 kW continuous; commercial 5–20+ kW. The rating limits
                which loads can be powered simultaneously
              </li>
              <li>
                <strong className="text-white">Transfer time</strong> — 20–100 ms typical.
                Sensitive loads (computers, medical devices) may need UPS-grade transfer
                (&lt; 10 ms); discuss with the customer if applicable
              </li>
              <li>
                <strong className="text-white">Essential-loads consumer unit</strong> —
                dedicated consumer unit fed from the backup port. Essential circuits
                (fridge, freezer, lighting some, broadband router, boiler controls,
                security alarm) are routed via this consumer unit. Standard CU handles
                non-essential loads (oven, shower, EV, heat pump, immersion heater)
              </li>
              <li>
                <strong className="text-white">Battery management during outage</strong>
                {' '}— PV continues to supply during daylight (subject to PV generation
                exceeding load); battery discharges during dark or low-PV periods.
                Customer\'s essential-loads runtime depends on battery capacity and
                load profile
              </li>
              <li>
                <strong className="text-white">Black-start capability</strong> — some
                hybrid inverters can start from battery alone (no grid, no PV), enabling
                grid-outage recovery from low-PV / nighttime conditions. Verify
                manufacturer\'s spec
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A 2019 4 kWp PV install + 2024 AC-coupled 10 kWh battery retrofit"
            situation="A customer\'s install history: 4 kWp PV with SMA string inverter installed 2019 (still operating well); 10 kWh battery added in 2024 as AC-coupled via a separate battery inverter (Sonnen or equivalent). Current architecture: AC-coupled hybrid via two separate inverters sharing the consumer unit. The customer in 2026 asks about expanding the battery to 20 kWh and adding EV charging."
            whatToDo="Re-survey under Chapter 82 PEI framework. Three architectural options for the expansion: (1) Add a second 10 kWh battery via the existing battery inverter (if the inverter supports it); simplest path, lowest cost. (2) Replace the existing battery inverter with a higher-capacity unit + 20 kWh battery; cleaner architecture but PV inverter still separate. (3) Replace BOTH inverters with a single 8 kW DC-coupled hybrid inverter + 20 kWh battery + add EV charging; cleanest architecture, lowest losses, but highest up-front cost (PV inverter replacement is a sunk cost). The EV charging is a separate Section 722 design conversation; with the hybrid in option (3) the EV charger can be managed by the inverter\'s load orchestration. Recommend option (1) or (2) on cost; recommend (3) on long-term efficiency and architecture simplicity. The customer\'s decision depends on their priorities."
            whyItMatters="Multi-generation hybrid installs evolve over time. The architectural conversation gets harder as the install grows because each retrofit step locks in some of the architecture. A 2026 re-survey looking at 2024 decisions sometimes reveals that earlier choices weren\'t optimal in hindsight — but reversing them is expensive. The competent installer captures the architectural decision-points in the cert evidence bundle, explaining the reasoning for the chosen architecture at each step."
          />

          <Scenario
            title="A new-build with 8 kWp PV, 15 kWh BESS, EV charger and heat pump all in scope"
            situation="A new-build property with: 8 kWp PV (south + east split, requires dual-MPPT); 15 kWh BESS; 7.4 kW EV charger; 14 kW ASHP. All in scope from day one. The customer wants backup-power capability during grid outages (essential loads on backup port). The customer also wants the install to be funded via SEG, BUS and ECO4 where applicable."
            whatToDo="Specify a DC-coupled hybrid inverter — dual-MPPT (for the south + east strings), 15 kWh battery capacity supported, backup port rated for essential-loads consumer unit, EV chargepoint and heat pump on the standard consumer unit (not backup). The hybrid inverter handles PV MPPT, battery management, grid synchronisation, and backup port output. Chapter 82 PEI design pack: load management orchestration (PV self-consumption priority, then battery charging, then export — with EV charging and heat pump as scheduled loads); multi-source fault analysis covering PV inverter and battery inverter contributions; protection coordination including the bidirectional protective device per Reg 551.7.1(c). Cert evidence bundle: BS 7671 EIC (with the Chapter 82 design records), CPS notification, DNO G99 notification (aggregate generation above the G98 threshold), MCS certificates (MIS 3002 PV, MIS 3003 heat pump, MIS 3008 heat battery), SEG application, BUS application, ECO4 application."
            whyItMatters="A new-build hybrid install in 2026 is the textbook case for DC-coupled architecture. Single hybrid inverter, fewest products, lowest losses, full backup-power capability, simplest cert bundle. The combined Chapter 82 PEI design discipline ties the technologies together as a coherent system. The customer gets the full funding stack; the installer gets the cleanest architecture; the cert evidence bundle survives the install\'s 25+ year operational life."
          />

          <CommonMistake
            title="Specifying AC-coupled for new-build PV+BESS because it&apos;s the cheaper inverter"
            whatHappens="An installer compares the unit prices: AC-coupled PV string inverter (£900) + AC-coupled battery inverter (£1,200) = £2,100. DC-coupled hybrid inverter (£1,800). AC-coupled looks cheaper on the inverter line — but is wrong on total cost and architecture. The DC-coupled hybrid is actually cheaper because it replaces TWO products with one, the install labour is lower, and the conversion-loss saving over the install life adds another ~£1,000–1,500. Specifying AC-coupled for new-build is a false economy."
            doInstead="Compare total install cost AND lifecycle conversion losses, not just inverter unit prices. DC-coupled hybrid is typically cheaper on total system cost for new-build PV+BESS. The £100–200 hybrid inverter premium over PV-only string inverter is far less than the saved separate battery inverter cost. The conversion-loss saving is the ongoing benefit. The PWI common-mistakes pattern: focus on inverter unit cost rather than system economics."
          />

          <CommonMistake
            title="Replacing a working PV inverter with a hybrid to add battery — when AC-coupled would work"
            whatHappens="An installer quotes a battery retrofit on a 3-year-old PV install by replacing the existing PV string inverter with a hybrid inverter (~£1,800) and adding the battery. The existing PV inverter has 10+ years of useful life remaining; replacing it is a £1,800 sunk cost. The customer pays for the &ldquo;cleaner architecture&rdquo; with no offsetting benefit — the conversion-loss saving over 10 years (~£500–700) is far less than the inverter replacement cost."
            doInstead="On retrofit-battery installs, the default architecture is AC-coupled: keep the working PV inverter, add a separate battery inverter (~£700–1,200), accept the conversion-loss penalty. The exception is where the existing PV inverter is near end-of-life (&gt; 10 years old, &lt; 5 years remaining) — in which case the PV inverter replacement is in scope anyway, and the DC-coupled hybrid is the right replacement. Run the numbers on each install; don\'t default to either architecture without checking."
          />

          <CommonMistake
            title="Forgetting Chapter 82 PEI design pack on a hybrid install regardless of architecture"
            whatHappens="An installer completes a DC-coupled hybrid PV+BESS install with full BS 7671 EIC and MCS certificates but no Chapter 82 PEI design pack. The cert evidence bundle is BS 7671-compliant but Chapter 82-non-compliant. MCS audit flags the missing PEI design records as a major finding. Rectification requires retrospectively producing the design pack — recreating the load management logic, fault analysis, protection coordination — which is harder after the install than during."
            doInstead="Chapter 82 PEI design discipline applies to every hybrid install regardless of coupling architecture. The design pack includes load management orchestration, multi-source fault current analysis, protection coordination across sources. Produce the design pack as part of the survey-to-design workflow; record it in the cert evidence bundle alongside the BS 7671 EIC. Chapter 82 is new in A4:2026 but is the regulatory expectation for any hybrid LCT install from 15 October 2026 onwards."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DC-coupled hybrid: single inverter, common DC bus, fewest conversions. Best for new-build PV+BESS or any planned install with battery from day one.',
              'AC-coupled hybrid: separate PV inverter + battery inverter, AC interconnection. Best for retrofit-battery installs where the existing PV inverter has useful life.',
              'Conversion-loss arithmetic favours DC-coupled by ~5–7% on PV-to-battery round-trips. Material over 25 years on installs with regular battery cycling.',
              'Backup-port capability on DC-coupled hybrids enables grid-outage operation of essential loads. The essential-loads consumer unit arrangement is a survey-stage conversation.',
              'Chapter 82 PEI design discipline applies regardless of coupling architecture — load management, multi-source fault contribution, protection coordination.',
              'Four-question decision framework: new-build or retrofit? Existing PV inverter age? Backup required? Single-product preference? Resolves most coupling architecture decisions at survey stage.',
              'Cert evidence bundle records the architectural decision, the conversion-loss reasoning, and the Chapter 82 PEI design pack — durable record for the install\'s 25+ year operational life.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2.6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                PV system architectures
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.8 Reading a PV SLD
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
