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
    id: 'm10s3-seg-definition',
    question:
      'What is the Smart Export Guarantee (SEG) in UK 2025-26?',
    options: [
      'A BS 7671 requirement',
      'SEG is the UK statutory framework (Ofgem-administered, in force since 1 Jan 2020) that requires large licensed electricity suppliers (>150,000 domestic customers) to offer a tariff for exported low-carbon electricity from small-scale (≤50 kW) installations. Replaced the Feed-in Tariff (FiT, closed to new applications 31 Mar 2019). Not a BS 7671 reg — UK statutory + Ofgem framework + commercial supplier offers.',
      'A BS 7671 chapter',
      'EU directive',
    ],
    correctIndex: 1,
    explanation:
      'SEG (Smart Export Guarantee) is the UK Government / Ofgem framework that replaced the Feed-in Tariff (FiT). FiT closed to new applicants on 31 March 2019. SEG came into force on 1 January 2020. Key points: (1) Large licensed suppliers (defined: ≥150,000 domestic customers in GB) must offer at least one SEG tariff — the price they pay per kWh exported. Smaller suppliers may offer SEG voluntarily. (2) Eligible technologies: solar PV, wind, micro-CHP, anaerobic digestion, hydro — up to 5 MW capacity (50 kW for micro-CHP). (3) Eligible installations: MCS-certified for solar / wind / hydro / micro-CHP up to a stated capacity. (4) Mechanism: half-hourly metering required (a smart meter SMETS2 with export MPAN typically); supplier pays per kWh exported. Rates: typically 3-15p/kWh depending on supplier + tariff (Octopus Outgoing Fixed, Octopus Outgoing Agile, EDF Export, E.ON Next Export, Good Energy, OVO). (5) NOT a BS 7671 regulation — it’s UK statutory + Ofgem framework + commercial supplier offers. Cert evidence: MCS certificate + smart meter export MPAN + customer’s SEG tariff with their supplier.',
  },
  {
    id: 'm10s3-mcs-requirement',
    question:
      'Why does SEG eligibility require MCS certification of the install?',
    options: [
      'Bureaucracy',
      'MCS certification is the UK statutory quality + competency proof that the install meets the technology-specific standard (MIS 3001 solar thermal, MIS 3002 PV, MIS 3003 wind, MIS 3007 micro-CHP, MIS 3008 micro-hydro). SEG suppliers require MCS to mitigate fraud + ensure exported electricity is genuinely from a low-carbon source + the install is performant. Customer needs MCS handover pack to register for SEG with their chosen supplier.',
      'No reason',
      'Random',
    ],
    correctIndex: 1,
    explanation:
      'MCS (Microgeneration Certification Scheme) is the UK quality + competency framework for low-carbon energy installs. SEG requires MCS certification because: (1) Eligibility verification — supplier needs proof the install genuinely generates low-carbon electricity at the stated capacity. MCS provides a certificate per install with rated capacity + technology + commissioning date. (2) Fraud mitigation — without MCS, anyone could claim export from non-existent / non-renewable sources. (3) Performance guarantee — MCS sets the technology-specific standard (MIS 3002 PV sizing methodology, equipment approval list, installer competency) that the install must meet to perform as rated. (4) Consumer protection — MCS-certified installs have a complaint mechanism (RECC — Renewable Energy Consumer Code, or HIES). To register for SEG with a supplier (Octopus, EDF, E.ON, Good Energy, OVO, etc.), the customer submits: MCS certificate + smart meter export MPAN + signed application. Without MCS, no SEG. Cert evidence bundle: MCS handover pack delivered to customer alongside the BS 7671 EIC — installer’s responsibility.',
  },
  {
    id: 'm10s3-export-mpan',
    question:
      'What is an export MPAN and why does SEG need one?',
    options: [
      'A type of meter',
      'MPAN = Meter Point Administration Number, the 21-digit identifier for an electricity supply point. UK 2025-26 sites with export typically have a single MPAN with both import + export registers on a SMETS2 smart meter that records half-hourly import + export separately. Some legacy sites have a separate export MPAN. SEG payments are based on the export register — supplier reads export kWh per settlement period + pays per their tariff.',
      'Random',
      'No purpose',
    ],
    correctIndex: 1,
    explanation:
      'MPAN = Meter Point Administration Number, a 21-digit identifier per supply point (often shown as "S 12 345 6789 1234"). Profile Class 1-2 for domestic, 3-4 for non-half-hourly commercial, 0 (full HH) or 1 (sub-HH) for half-hourly settled. UK 2025-26 reality: (1) Single MPAN dual-register — SMETS2 smart meter records both import + export half-hourly; one MPAN; suppliers can read export via DCC (Data Communications Company). Most new installs work this way. (2) Separate export MPAN — legacy arrangement from FiT days; some sites still have a dedicated export MPAN with separate meter. Being phased out as SMETS2 deployment completes. (3) Smart meter requirement — SEG needs half-hourly export readings. SMETS2 (current standard) provides this natively. SMETS1 (older) may need replacement. Customer must have a working smart meter with export reading enabled. (4) DCC = Data Communications Company, the entity that gathers smart meter readings + makes them available to suppliers. SEG suppliers use DCC export readings to calculate payments. Cert evidence: smart meter make + model + serial + MPAN documented in customer handover; export reading verified at commissioning.',
  },
  {
    id: 'm10s3-tariff-comparison',
    question:
      'Why do SEG tariff rates vary so much across suppliers (3p to 15p+ per kWh in UK 2025-26)?',
    options: [
      'Random',
      'Different suppliers value export differently based on: (a) their cost-to-serve (some accept SEG as a customer-acquisition loss-leader, others profit from it); (b) whether the tariff is fixed (e.g. Octopus Outgoing Fixed) or dynamic / wholesale-linked (e.g. Octopus Outgoing Agile — tracks day-ahead wholesale price half-hourly); (c) supplier strategy (tied to import tariff bundle, restricted to existing customers, time-limited promotions). Customer shopping around can 2-3× their export income.',
      'No reason',
      'Mistake',
    ],
    correctIndex: 1,
    explanation:
      'UK 2025-26 SEG tariff variation is real and material to customer economics. Examples (rates may shift): (1) Octopus Outgoing Fixed — ≈15p/kWh, requires Octopus import customer. (2) Octopus Outgoing Agile — tracks day-ahead wholesale half-hourly + Octopus margin; can spike to 30p+ during peak demand, average ≈10-20p/kWh, requires Octopus import customer. (3) EDF Export Variable — ≈3p/kWh, no import restriction. (4) E.ON Next Export Exclusive — ≈16.5p/kWh, E.ON import customer. (5) British Gas Export — ≈15p/kWh, BG import customer. (6) Good Energy SEG — ≈5p/kWh. (7) OVO SEG — ≈4p/kWh. Why variation: (a) Cost-to-serve — administering SEG has overhead; some suppliers absorb to attract import customers (loss-leader), others profit. (b) Tariff type — fixed gives predictable customer income; dynamic / wholesale-linked transfers price risk + reward to customer. (c) Strategic positioning — Octopus competes on SEG to grow market share; British Gas / EDF treat it as a default offering. (d) Bundle restrictions — highest SEG rates often require the customer to be on the same supplier’s import tariff — customer must weigh both rates together. Customer-facing advice: shop around annually; combine import + export when comparing; consider Outgoing Agile if customer can time export to peak demand.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer with 4 kWp PV + 5 kWh BESS asks: "Should I export surplus PV via SEG or store it in BESS for self-consumption?"',
    options: [
      'Always export',
      'Self-consumption is almost always more valuable per kWh in UK 2025-26: avoiding import (saves 25-30p/kWh) vs receiving export (typically 5-15p/kWh on SEG). Optimal: PV → self-consume first; surplus → BESS for evening; BESS full + still surplus → export via SEG. The BESS captures the maximum-value kWh. Only export the kWh that BESS can’t absorb. Vendor / third-party EMS implements this default.',
      'Always store',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'The economic comparison is the foundation of UK 2025-26 BESS sizing + EMS configuration. (1) Self-consumption — every kWh self-consumed avoids paying the import tariff. UK 2025-26 standard variable tariff ≈25-30p/kWh. Avoided import = £0.25-0.30 per kWh saved. (2) Export via SEG — every kWh exported earns the SEG rate. UK 2025-26 typical £0.05-0.15/kWh. (3) Differential = £0.10-0.25/kWh in favour of self-consumption. (4) BESS = the means to time-shift PV generation to match load. Without BESS, PV daytime surplus must either be self-consumed in real time (limited by daytime load) or exported. With BESS, the kWh that would otherwise export gets stored + used later at higher value. (5) Optimal logic (default in vendor EMS): PV → instantaneous self-consume; PV surplus → BESS charge; PV surplus + BESS full → SEG export. (6) Edge case: dynamic export tariff (Octopus Outgoing Agile) during peak demand events can briefly EXCEED import tariff. In those windows, EMS should prefer export over BESS-charging. PredBat + advanced EMS handle this. (7) Customer-facing rule of thumb: ‘the BESS pays for itself by avoiding import; SEG is the cherry on top, not the foundation’.',
  },
  {
    question:
      'A customer adds a 4 kWp PV system without BESS. SEG-only is the export path. Their daytime self-consumption is ~30% (typical for working-from-office household). What’s the SEG-only annual export economics in UK 2025-26?',
    options: [
      'Negligible',
      'Approximate UK 2025-26 numbers: 4 kWp PV generates ≈3,400-3,800 kWh/year (UK average yield 850-950 kWh/kWp/year). 30% self-consumption = ≈1,000-1,150 kWh self-used; 70% exported = ≈2,400-2,650 kWh exported. At Octopus Outgoing Fixed (≈15p/kWh in 2025-26): £360-400/year SEG income. At EDF Export Variable (≈3p/kWh): £70-80/year. Customer choice of supplier is therefore material to the PV payback.',
      'No income',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Practical UK 2025-26 SEG-only PV economics: (1) Annual generation — 4 kWp × 850-950 kWh/kWp/year (UK average yield depends on orientation, shading, latitude). Take 900 kWh/kWp × 4 = 3,600 kWh/year. (2) Self-consumption — working-from-office household (no daytime occupant) typically 25-35% self-consumption from PV-only. Take 30% → 1,080 kWh self-used; 2,520 kWh exported. (3) Avoided import — 1,080 kWh × £0.27/kWh = £292/year saved. (4) SEG income — varies by supplier: £0.03 × 2,520 = £76/year (low end EDF Export); £0.05 × 2,520 = £126 (Good Energy); £0.15 × 2,520 = £378/year (Octopus Outgoing Fixed). (5) Total annual benefit: £292 + £76 = £368 (worst case) to £292 + £378 = £670 (best case Octopus). (6) System cost £5,000-7,000 typical 4 kWp install — simple payback 10-19 years depending on supplier choice. (7) Adding 5 kWh BESS (£3,000-5,000 extra) shifts self-consumption from 30% to ≈70%; reduces export but maximises avoided import (£680/year saved); reduces SEG income (~£120 remaining); total £800/year; reduced payback in years 1-10. (8) Customer-facing advice: shop SEG annually — difference between 3p and 15p is the difference between BESS-makes-sense and PV-only-makes-sense for the export portion.',
  },
  {
    question:
      'Does SEG require BS 7671 compliance of the install?',
    options: [
      'No',
      'SEG itself is a UK statutory framework administered by Ofgem and operated by licensed suppliers — it does not directly cite BS 7671. BUT: SEG requires MCS certification of the install, and MCS Installer Standards (MIS 3002 PV, MIS 3003 wind, MIS 3008 hydro, etc.) require BS 7671 compliance as part of the install standard. So BS 7671 compliance is required indirectly: MCS ← BS 7671 ← cert evidence (EIC). Without BS 7671-compliant install, no MCS certificate; without MCS, no SEG.',
      'Random',
      'Always exempt',
    ],
    correctAnswer: 1,
    explanation:
      'The compliance chain SEG ← MCS ← BS 7671: (1) SEG (Ofgem statutory framework) requires the install to be MCS-certified. (2) MCS Installer Standards (MIS 3002 for PV, MIS 3003 wind, MIS 3008 micro-hydro, MIS 3007 micro-CHP) require the install to comply with all applicable standards including BS 7671. (3) The MCS-certified company must include a BS 7671 EIC in the MCS handover pack — the EIC is the BS 7671 compliance evidence. (4) Without a BS 7671-compliant install: no EIC; without EIC, MCS cert cannot be issued; without MCS cert, customer cannot register for SEG. (5) Per-technology BS 7671 anchors: Section 712 for PV; Section 551 for generating sets (wind, hydro, CHP); Chapter 57 if BESS added; Chapter 82 for the multi-source PEI. (6) The chain in practice: installer does BS 7671 install + issues EIC → MCS company packages EIC into MCS handover pack → customer submits MCS cert + smart meter MPAN to chosen SEG supplier → supplier registers + pays per kWh exported per their tariff. Cert evidence bundle (installer’s responsibility): BS 7671 EIC + per-technology DoC + MCS handover pack contribution.',
  },
  {
    question:
      'A customer installs DC-coupled PV + BESS (hybrid inverter). The MCS rating is 4 kWp PV; the hybrid inverter is 5 kW. The BESS discharges in the evening. Does the BESS discharge count as SEG-eligible export?',
    options: [
      'Yes always',
      'Generally NO: SEG pays for export of GENERATION (PV / wind / hydro / CHP / AD) — not for BESS discharge if the BESS was charged from the grid (round-trip arbitrage). Where the BESS is charged from PV surplus + discharges to the grid later, the supplier rules vary — some accept it as deferred PV export, some do not. UK 2025-26 reality: most suppliers do not specifically distinguish; SMETS2 smart meter reads gross export half-hourly + supplier pays per kWh. Check supplier T&Cs.',
      'No always',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'SEG eligibility rules are tariff- and supplier-specific in UK 2025-26: (1) Strict interpretation: SEG is for export of LOW-CARBON GENERATION (PV / wind / hydro / micro-CHP / AD). BESS round-trip arbitrage (charge from grid at off-peak, discharge to grid at peak) is NOT generation — it’s arbitrage. Suppliers historically distrust this because it would let customers profit from price differentials without generating anything renewable. (2) Practical reality: most UK 2025-26 SMETS2 smart meters can’t distinguish "this kWh came from PV" vs "this kWh came from BESS that was charged from grid". The meter reads gross half-hourly export. Suppliers therefore have a choice: (a) ban BESS export entirely (Octopus historically didn’t pay for export when BESS was discharging if they could detect it via their hardware integration); (b) accept all export but watch for abuse; (c) accept all export as part of the tariff. (3) Tariff-specific: Octopus Outgoing Agile + Tesla Energy Plan + Powerwall = explicit support for BESS-discharge-to-grid during dynamic peak windows (grid services). Octopus Saving Sessions credit BESS discharge. (4) Customer-facing: read supplier T&Cs at sign-up. Some suppliers explicitly support BESS export, some don’t. (5) Best practice: configure EMS for PV-export-priority (self-consume PV, charge BESS from PV surplus only, export PV surplus when BESS full) — this stays well within SEG spirit for all suppliers + maximises export income.',
  },
  {
    question:
      'In UK 2025-26 SEG-only landscape (no FiT), how should a PV installer talk about export economics with a customer?',
    options: [
      'Promise high returns',
      'Honestly: FiT (closed 2019) paid 4-50p/kWh and was the primary economic driver of UK domestic PV for a decade. SEG (2020 onwards) pays 3-15p/kWh and is a secondary economic factor — self-consumption (avoiding 25-30p/kWh import) is the primary economic driver. PV economics now: total annual benefit = avoided import (large) + SEG export (small). Tell customer to: (a) optimise for self-consumption first; (b) shop SEG suppliers annually; (c) consider BESS to shift more PV to self-consumption.',
      'Random',
      'Skip the topic',
    ],
    correctAnswer: 1,
    explanation:
      'UK domestic PV economic story has shifted post-FiT: (1) FiT era (2010-2019) — generous generation + export tariff (4-50p/kWh for the generation portion depending on cohort + technology). Customers signed up + got 20-25 year index-linked income. Primary economic driver. (2) FiT closed to new applicants 31 March 2019. SEG launched 1 January 2020. (3) SEG era (2020-) — export-only tariff at 3-15p/kWh. NOT generous like FiT. Customer benefit is dominated by AVOIDED IMPORT (self-consumption × import tariff). (4) Honest customer conversation: ‘PV is now economic because import electricity is expensive (25-30p/kWh), not because export pays well. Maximise self-consumption + shop SEG annually + consider BESS to shift more PV to self-consumption.’ (5) Numbers customer-facing: 4 kWp PV × 3,600 kWh/year × 50% self-consumption (with BESS) × £0.27/kWh = £486 avoided + 1,800 kWh export × £0.10/kWh (mid-range) = £180 SEG = £666/year total. Payback 8-12 years on PV-only; 10-15 on PV+BESS. (6) Avoid: ‘guaranteed XX% return’, ‘your solar pays for itself in N years’ — customer-facing economic claims must reflect real ranges + current tariffs. Cert evidence + customer documentation should be neutral on economics; quote-stage economic modelling is the right place for the customer-specific numbers.',
  },
  {
    question:
      'A customer doesn’t have a smart meter. What’s the SEG impact?',
    options: [
      'No impact',
      'Major blocker. SEG requires half-hourly export readings, which only SMETS2 smart meters reliably provide. Without smart meter: (a) customer must request installation from their supplier (typically free, scheduled within weeks-months); (b) cannot register for SEG until smart meter operational + export reading enabled. Some suppliers may accept manual quarterly readings + interpolation for legacy meters but this is becoming rare. Smart meter rollout target 100% UK 2024 has slipped; gaps remain.',
      'Random',
      'Skip',
    ],
    correctAnswer: 1,
    explanation:
      'SEG smart meter requirement reality: (1) SMETS2 smart meter — the UK 2025-26 standard; provides half-hourly import + export readings via DCC. Required for SEG with virtually all suppliers. (2) SMETS1 — earlier smart meter generation; some still in use; many being upgraded; export reading may not be reliable; gradual phase-out. (3) Traditional meter (no smart meter) — no half-hourly export reading available; customer cannot register for most SEG tariffs. (4) UK Government smart meter rollout target was originally 100% by end-2020, then extended to end-2024, still incomplete in 2025-26 — ≈85-90% of GB households have a smart meter; ≈10-15% still on traditional or non-functional smart meters. (5) Installer customer-facing advice: at quote stage, confirm whether customer has working SMETS2 smart meter. If not, advise customer to contact their supplier to request one BEFORE the PV install — typical lead time 2-8 weeks. (6) Without smart meter at commissioning, customer can still operate the PV install in self-consumption mode + any inverter export will go to grid but earn nothing until smart meter installed + SEG registered. (7) Some suppliers offer SEG with quarterly manual readings as fallback but this is rare and rates lower. (8) Cert evidence: customer handover pack notes smart meter status + SEG registration steps for customer to take.',
  },
];

const faqs = [
  {
    question: 'Is SEG the same as the old Feed-in Tariff (FiT)?',
    answer:
      'No. FiT (2010-2019) paid for BOTH generation (per kWh generated, regardless of whether self-consumed or exported) AND export (per kWh exported, often deemed at 50% rather than metered). Generous index-linked 20-25 year contracts. FiT closed to new applicants on 31 March 2019. SEG (2020-present) pays for EXPORT ONLY (per kWh metered as exported via smart meter) at lower rates (3-15p/kWh vs FiT generation 4-50p/kWh historically). SEG is a market-based supplier obligation; FiT was a government-subsidised guaranteed tariff. The two cannot be combined.',
  },
  {
    question: 'What technologies are SEG-eligible?',
    answer:
      'Solar PV (up to 5 MW), wind (up to 5 MW), micro-CHP (up to 50 kW), anaerobic digestion (up to 5 MW), hydro (up to 5 MW). Solar thermal: NO — it generates heat, not electricity. Heat pumps: NO — they consume electricity, not generate it. BESS standalone: NO — storage isn’t generation. BESS paired with PV (charge from PV): supplier-dependent (see Q above). Biomass heat: NO — heat, not electricity. Each eligible technology must have appropriate MCS certification (MIS 3002 PV, MIS 3003 wind, MIS 3007 micro-CHP, MIS 3008 micro-hydro).',
  },
  {
    question: 'How does the customer register for SEG?',
    answer:
      'Customer process: (1) installer issues MCS certificate + BS 7671 EIC at commissioning; (2) customer chooses SEG supplier (often shops vs their current import supplier — doesn’t need to be same supplier); (3) customer submits SEG application to chosen supplier with: MCS cert, smart meter MPAN, customer address + bank details; (4) supplier registers customer for their chosen SEG tariff; (5) supplier reads half-hourly export from DCC + pays per kWh per their tariff. Typical timeline: 4-8 weeks from MCS cert to first SEG payment. Customer can switch SEG supplier annually if not bundled with import tariff.',
  },
  {
    question: 'Does the installer have any responsibility after SEG sign-up?',
    answer:
      'Limited but real: (1) ensure the customer has the MCS certificate + EIC + smart meter MPAN as part of handover — the customer needs all three to register; (2) confirm at commissioning that the inverter’s export setting is configured correctly (some hybrid inverters allow export limiting per G100 — §10.4); (3) advise on supplier shopping (this varies year to year). After SEG sign-up, the relationship is between customer + SEG supplier — installer’s ongoing role is product warranty + servicing + future upgrades.',
  },
  {
    question: 'What if the customer’s site exceeds 50 kW or doesn’t qualify for SEG?',
    answer:
      'For sites ≥5 MW PV / wind / hydro / AD or above 50 kW micro-CHP: outside small-scale SEG scope. Larger sites use commercial PPA (Power Purchase Agreement) routes, bilateral contracts with energy traders, or grid services markets. For sites where MCS is not feasible (e.g. self-build, prototype, unapproved technology): outside SEG scope; customer can still export but earns nothing for it (or arrange a bilateral). UK 2025-26: most domestic + light-commercial installs sit comfortably within SEG’s small-scale scope.',
  },
];

export default function RenewableEnergyModule10Section3() {
  const navigate = useNavigate();

  useSEO({
    title: 'Smart Export Guarantee (SEG) for UK renewable systems | Renewable Energy 10.3 | Elec-Mate',
    description:
      'UK Smart Export Guarantee (SEG) framework — Ofgem-administered, replaced FiT 2020. Licensed suppliers (>150k customers) must offer SEG tariff for low-carbon export. Eligibility: MCS certification + smart meter export MPAN. Tariff landscape (Octopus Outgoing Fixed / Agile, EDF Export, E.ON, Good Energy). Self-consumption vs export economics.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-10')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 10
          </button>

          <PageHero
            eyebrow="Module 10 · Section 3 · UK Ofgem statutory framework + commercial supplier tariffs"
            title="Smart Export Guarantee (SEG)"
            description="The UK statutory framework for paid export of low-carbon electricity from small-scale (≤5 MW PV / wind / hydro / AD; ≤50 kW micro-CHP) installations. Ofgem-administered, in force since 1 January 2020. Replaced the Feed-in Tariff (closed 31 March 2019). Eligibility: MCS certification of the install + smart meter with half-hourly export reading. Commercial supplier offers vary widely: Octopus Outgoing Fixed / Agile, EDF Export, E.ON Next Export, Good Energy, OVO, British Gas."
            tone="yellow"
          />

          <TLDR
            points={[
              'SEG = Smart Export Guarantee. UK statutory framework, Ofgem-administered. In force since 1 Jan 2020. Replaced the Feed-in Tariff (FiT, closed to new applicants 31 Mar 2019).',
              'Licensed suppliers with ≥150,000 domestic customers MUST offer at least one SEG tariff. Smaller suppliers may offer voluntarily.',
              'Eligible technologies: PV (up to 5 MW), wind (up to 5 MW), hydro (up to 5 MW), AD (up to 5 MW), micro-CHP (up to 50 kW). Solar thermal NOT eligible (not electricity). BESS standalone NOT eligible (not generation).',
              'Eligibility requires: (a) MCS certification of the install (MIS 3002 PV, MIS 3003 wind, MIS 3007 micro-CHP, MIS 3008 hydro); (b) smart meter with half-hourly export reading (SMETS2 standard).',
              'UK 2025-26 tariff range: 3-15p/kWh + dynamic options (Octopus Outgoing Agile can spike higher during peak demand). Octopus Outgoing Fixed ≈15p/kWh, EDF Export Variable ≈3p/kWh, E.ON Next ≈16.5p, Good Energy ≈5p.',
              'Self-consumption is more valuable per kWh than export in UK 2025-26: avoided import 25-30p/kWh >> SEG export 3-15p/kWh. EMS priority: PV → self-consume → BESS → export.',
              'Compliance chain: SEG ← MCS certificate ← BS 7671 EIC + MCS handover pack. Cert evidence bundle: MCS cert + EIC + smart meter MPAN + customer’s SEG application record.',
              'Customer process: installer hands over MCS cert + EIC + smart meter MPAN → customer chooses SEG supplier + submits application → supplier registers + pays per kWh exported per their tariff.',
              'NOT a BS 7671 reg — UK statutory + Ofgem framework + commercial offers. BS 7671 compliance required INDIRECTLY via the MCS ← BS 7671 chain.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define the SEG framework, its statutory basis, and the year it replaced FiT.',
              'Identify SEG-eligible technologies and the capacity limits per technology.',
              'Apply the eligibility requirements: MCS certification + smart meter export MPAN.',
              'Compare UK 2025-26 SEG tariff offerings across major suppliers.',
              'Explain why self-consumption is typically more valuable per kWh than export in UK 2025-26.',
              'Apply the compliance chain SEG ← MCS ← BS 7671 for cert evidence bundle composition.',
              'Advise a customer on the SEG registration process and the role of supplier shopping.',
              'Honestly frame UK 2025-26 PV economics: avoided import is primary, SEG is secondary.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            FiT made customers feed-in millionaires. SEG makes them feed-in pragmatists. The economics of UK 2025-26 PV are dominated by avoided import — not export earnings. Customer conversations should reflect that.
          </Pullquote>

          <ContentEyebrow>SEG framework + eligibility</ContentEyebrow>

          <ConceptBlock
            title="What SEG is and how it replaced FiT"
            plainEnglish="SEG (Smart Export Guarantee) is the UK statutory framework that obligates large licensed electricity suppliers to offer a tariff for low-carbon electricity exported from small-scale installations. It came into force on 1 January 2020 after the Feed-in Tariff (FiT) closed to new applicants on 31 March 2019. Operated by Ofgem; commercial offers by individual suppliers."
            onSite="UK 2025-26 reality: SEG is the export-revenue mechanism for any new PV / wind / hydro / micro-CHP install. Existing FiT customers (signed up before 31 March 2019) continue on their FiT contracts — those run for 20-25 years from sign-up. New customers from 1 January 2020 onwards: SEG only."
          >
            <p>SEG vs FiT comparison + UK 2025-26 reality:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">FiT (2010-2019)</strong>
                — paid for BOTH generation (per kWh generated, whether
                self-consumed or exported, often deemed at 50% export) AND export
                (per kWh metered as exported). Index-linked 20-25 year contracts.
                Government-subsidised. Generous — 4-50p/kWh generation in early
                cohorts
              </li>
              <li>
                <strong className="text-white">FiT closure</strong>
                — closed to new applicants 31 March 2019. Existing customers
                continue. New customers from 1 January 2020 must use SEG
              </li>
              <li>
                <strong className="text-white">SEG (2020-)</strong>
                — export only (per kWh metered exported, no generation
                payment). Market-based supplier offers (not government-subsidised).
                3-15p/kWh typical range; dynamic options higher during peak demand
              </li>
              <li>
                <strong className="text-white">Statutory basis</strong>
                — Smart Export Guarantee Order 2019 + Energy Act 2008
                amendments. Ofgem administers compliance + publishes guidance
              </li>
              <li>
                <strong className="text-white">Mandatory suppliers</strong>
                — licensed suppliers with ≥150,000 domestic customers in
                GB MUST offer at least one SEG tariff. Smaller suppliers may offer
                voluntarily
              </li>
              <li>
                <strong className="text-white">Tariff structure</strong>
                — each supplier sets its own SEG tariff price + terms.
                Customer can choose any supplier offering SEG — doesn’t need
                to be their import supplier (though bundled offers common)
              </li>
              <li>
                <strong className="text-white">UK 2025-26 customer
                  process</strong> — install with MCS-certified company →
                receive MCS cert + EIC → ensure smart meter with export MPAN
                → choose SEG supplier + apply → receive per-kWh payment
                quarterly / monthly
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — installer’s contribution: MCS cert + BS
                7671 EIC + smart meter MPAN documentation + customer handover
                noting SEG registration steps
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Eligibility: MCS + smart meter + capacity limits"
            plainEnglish="SEG eligibility has three requirements: (1) install must be MCS-certified (with the appropriate MIS standard for the technology); (2) site must have a smart meter capable of half-hourly export readings; (3) installed capacity within scheme limits (5 MW for PV / wind / hydro / AD, 50 kW for micro-CHP). All three must be met before a supplier will register the customer."
            onSite="UK 2025-26 installer pre-quote checklist: (a) does the customer have an MCS-certified company doing the install? — yes for any normal renewable retrofit; (b) does the customer have a SMETS2 smart meter with working export reading? — verify before quoting; (c) is the install within the SEG capacity scope? — yes for domestic + light-commercial."
          >
            <p>Eligibility requirements in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">MCS certification</strong>
                — install certified to the relevant MCS Installer Standard
                (MIS 3002 PV, MIS 3003 wind, MIS 3007 micro-CHP, MIS 3008 hydro,
                AD via MCS dedicated standard). MCS company issues certificate per
                install with capacity + technology + commissioning date
              </li>
              <li>
                <strong className="text-white">BS 7671 EIC</strong>
                — MCS requires BS 7671 compliance; EIC is the proof. Installer
                issues at commissioning. Included in MCS handover pack
              </li>
              <li>
                <strong className="text-white">Smart meter</strong>
                — SMETS2 (current standard) provides half-hourly import +
                export readings via DCC. SMETS1 (older) being phased out. Customer
                must request from their import supplier if not already installed
              </li>
              <li>
                <strong className="text-white">Export MPAN</strong>
                — most UK 2025-26 sites: single MPAN with dual register
                (import + export) on SMETS2 meter. Legacy: separate export MPAN.
                Documented in customer handover
              </li>
              <li>
                <strong className="text-white">Capacity limits</strong>
                — PV / wind / hydro / AD: ≤5 MW. Micro-CHP: ≤50 kW.
                Almost all UK 2025-26 domestic + light-commercial installs sit
                well within
              </li>
              <li>
                <strong className="text-white">Excluded
                  technologies</strong> — solar thermal (not electricity);
                heat pumps (consume, not generate); standalone BESS (storage, not
                generation); biomass heat-only; hydrogen heating (not electricity
                + emerging policy direction)
              </li>
              <li>
                <strong className="text-white">Multi-source PEI</strong>
                — SEG eligibility is per-generator (PV registered separately
                from wind etc.) but the export meter reads aggregate gross export.
                Customer + supplier reconcile based on MCS-stated capacities. PEI
                cert evidence bundle records each generator’s MCS cert
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per-generator MCS cert + BS 7671 EIC (or
                per-technology EIC sections of an integrated PEI EIC) + smart
                meter documentation + customer SEG application record
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="UK statutory · Smart Export Guarantee Order 2019 (Ofgem-administered) — not BS 7671"
            clause="From 1 January 2020, licensed electricity suppliers in Great Britain with ≥150,000 domestic customers must offer at least one Smart Export Guarantee (SEG) tariff to small-scale low-carbon generators (PV / wind / hydro / AD up to 5 MW; micro-CHP up to 50 kW). The tariff must pay per kWh exported, must be greater than zero, and must be settled at least quarterly. The installation must be MCS-certified (or equivalent for non-MCS technologies) and metered with a smart meter providing half-hourly export readings."
            meaning="SEG is a UK statutory + Ofgem-administered framework — not a BS 7671 regulation. It sits in commercial / regulatory space alongside MCS + EREC. The compliance chain matters: SEG eligibility requires MCS certification, which requires BS 7671 compliance (the install must meet all applicable standards including the wiring regulations). The installer’s direct responsibility under BS 7671 is the EIC + Section 712 / Chapter 57 / Section 722 / Section 551 / Chapter 82 compliance; the MCS company packages this into the MCS handover pack; the customer uses the MCS handover pack to register for SEG with their chosen supplier. UK 2025-26 customer-facing reality: SEG is part of the installer’s scope of advice (‘you’ll register for SEG with a supplier; here’s typical UK 2025-26 rates; we recommend shopping around’) but the SEG contract is between customer and supplier, not installer."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Tariff landscape + supplier shopping</ContentEyebrow>

          <Pullquote>
            UK 2025-26 SEG tariffs vary 5× across suppliers. Customers who set-and-forget at 3p/kWh leave £200-400/year on the table they could have earned at 15p/kWh. Supplier shopping is a real customer-value lever.
          </Pullquote>

          <ConceptBlock
            title="UK 2025-26 SEG supplier landscape"
            plainEnglish="UK 2025-26 SEG market has 5-10 active suppliers across the price range 3-15p/kWh + dynamic options. Highest fixed rates typically require the customer to also be on that supplier’s import tariff. Dynamic options (Octopus Outgoing Agile, Tesla Energy Plan) follow wholesale half-hourly + can exceed the fixed alternatives during peak demand events."
            onSite="Practical installer advice: tell customer ‘shop SEG annually; the rate ranges 3-15p/kWh + Agile options; combining import + export with the same supplier often unlocks higher rates’. UK 2025-26 reality: Octopus is the price leader for SEG; British Gas / EDF / E.ON match for their own bundle customers; Good Energy / OVO sit mid-pack."
          >
            <p>UK 2025-26 SEG supplier snapshot (rates indicative — verify current):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Octopus Outgoing
                  Fixed</strong> — ≈15p/kWh, fixed rate, requires Octopus
                import customer
              </li>
              <li>
                <strong className="text-white">Octopus Outgoing
                  Agile</strong> — tracks day-ahead wholesale half-hourly +
                Octopus margin. Can exceed 30p/kWh during peak demand, can drop
                below 5p in off-peak. Average ≈10-20p/kWh. Requires Octopus
                import customer
              </li>
              <li>
                <strong className="text-white">EDF Export
                  Variable</strong> — ≈3p/kWh, no import restriction. Lowest
                fixed rate
              </li>
              <li>
                <strong className="text-white">E.ON Next Export
                  Exclusive</strong> — ≈16.5p/kWh fixed, requires E.ON Next
                import customer
              </li>
              <li>
                <strong className="text-white">British Gas Export</strong>
                — ≈15p/kWh fixed, requires BG import customer
              </li>
              <li>
                <strong className="text-white">Good Energy SEG</strong>
                — ≈5p/kWh fixed, no import restriction
              </li>
              <li>
                <strong className="text-white">OVO SEG</strong> —
                ≈4p/kWh fixed, no import restriction
              </li>
              <li>
                <strong className="text-white">ScottishPower
                  SmartGen</strong> — ≈12p/kWh, requires SP import
              </li>
              <li>
                <strong className="text-white">Bundle restriction
                  pattern</strong> — highest SEG rates require same supplier for
                import. Customer must weigh: ‘is my import tariff competitive on
                this supplier?’. Combined import + export economics matter
              </li>
              <li>
                <strong className="text-white">Dynamic vs fixed</strong>
                — fixed: predictable income, simpler; dynamic (Agile, Tesla
                Energy Plan): higher upside if customer can time export to peak
                demand (BESS discharge during evening peak — EMS handles), more
                price risk
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Self-consumption vs export economics"
            plainEnglish="The dominant economic driver of UK 2025-26 PV is avoided import (25-30p/kWh saved per kWh self-consumed), not SEG export (3-15p/kWh earned per kWh exported). Self-consumption is typically 2-4× more valuable per kWh than export. EMS priority logic reflects this: self-consume PV first, then store in BESS, then export."
            onSite="Customer-facing arithmetic: 4 kWp PV × 3,600 kWh/year × 50% self-consumption (with BESS) = 1,800 kWh self-used × £0.27/kWh avoided = £486/year. Plus 1,800 kWh exported × £0.10/kWh SEG (mid-range) = £180/year. Total £666/year. The avoided-import portion is the larger lever — BESS to shift more PV to self-consumption is the dominant retrofit upgrade."
          >
            <p>Self-consumption vs export economic analysis:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Avoided import value</strong>
                — each kWh self-consumed saves the import tariff rate. UK
                2025-26 standard variable: ≈25-30p/kWh. Most valuable kWh
              </li>
              <li>
                <strong className="text-white">SEG export value</strong>
                — each kWh exported earns the SEG rate. UK 2025-26: 3-15p/kWh
                fixed; dynamic options higher in peak windows
              </li>
              <li>
                <strong className="text-white">Differential</strong>
                — £0.10-0.25/kWh in favour of self-consumption. BESS
                economic case driven by this differential
              </li>
              <li>
                <strong className="text-white">Typical
                  self-consumption %</strong> — PV-only no-BESS: 25-35%
                (working-from-office household) to 50-60% (high daytime
                consumption); PV+BESS: 65-80%
              </li>
              <li>
                <strong className="text-white">BESS payback driver</strong>
                — typical 5-10 kWh BESS retrofit £3,000-5,000. Annual
                arbitrage value: shifted PV (£0.20/kWh × 700 kWh =
                £140-280) + ToU arbitrage (£0.20/kWh × 300 cycles ×
                10 kWh = £600). Total £500-900/year. Payback 5-10 years
              </li>
              <li>
                <strong className="text-white">EMS priority
                  consequence</strong> — default UK 2025-26: PV → self-consume
                first → BESS charge → SEG export. Maximises customer
                economic outcome
              </li>
              <li>
                <strong className="text-white">Edge case: dynamic
                  export tariff</strong> — Octopus Outgoing Agile during peak
                demand event can exceed import tariff briefly. EMS may prefer
                export over BESS-charging in those half-hours. PredBat + advanced
                logic handle this
              </li>
              <li>
                <strong className="text-white">Cert evidence + customer
                  honesty</strong> — economic modelling at quote stage. Cert
                evidence neutral on economics (not the BS 7671 install’s
                scope). Customer handover acknowledges expected operating mode +
                economic logic
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 132.13 + Reg 514 family — documentation + customer handover (SEG eligibility chain)"
            clause="Reg 132.13: The designer shall provide such information as is necessary for the use, operation + maintenance of the installation. Reg 514 family: warning notices, identification labels, diagrams, charts, schedules + similar information shall be provided at the consumer position + included in the customer handover documentation. Reg 132.16: Where appropriate, the design + erection shall facilitate compliance with statutory requirements + regulations issued by the public supply authority."
            meaning="Reg 132.13 + the Reg 514 documentation family are the BS 7671 anchors that support the customer-facing SEG registration chain. SEG is not a BS 7671 reg; but the EIC + MCS handover pack the customer needs for SEG registration ARE BS 7671 deliverables (Reg 132.13 designer-information duty; Reg 514 warning notices + cert evidence). The cert evidence bundle the installer issues at commissioning is the foundation: BS 7671 EIC + MCS cert + smart meter MPAN documentation + customer handover instructions for SEG application. Customer submits this evidence to chosen SEG supplier; supplier registers + pays per kWh exported per their tariff. Without the BS 7671 EIC + MCS cert handover, the customer cannot register for SEG — the install’s commercial value via SEG depends on the cert evidence bundle quality."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Domestic PV-only retrofit — customer chooses SEG supplier"
            situation="UK 2025-26 typical: 4 kWp PV install on a 1990s semi-detached house. No BESS (yet). 3,600 kWh/year expected generation. Family of 4, both adults working away from home, daytime self-consumption ≈30%. MCS-certified company doing the install. Customer’s current import supplier: British Gas (variable rate ≈30p/kWh)."
            whatToDo="Installer scope: (1) BS 7671 install + Section 712 EIC + Reg 826 PEI compliance summary (PV + DNO = single-source PEI under Chapter 82); (2) MCS company issues MIS 3002 PV cert + MCS handover pack containing the EIC; (3) verify customer has working SMETS2 smart meter with export reading enabled (CHECK at quote stage — if not, customer requests from British Gas + lead time 2-8 weeks); (4) configure inverter export per default (no G100 limit unless DNO-imposed); (5) commissioning record + customer handover including SEG registration guidance. Customer SEG choice: (a) British Gas SEG ≈15p/kWh (bundle with existing import) — simplest, decent rate; (b) Octopus Outgoing Fixed 15p — requires Octopus import switch; (c) Octopus Outgoing Agile dynamic 10-20p average — if customer wants upside + price exposure; (d) EDF Export 3p — lowest. Customer chooses British Gas SEG (no switch needed). Expected income: 2,520 kWh exported × £0.15 = £378/year SEG + 1,080 kWh self-consumed × £0.30 avoided = £324/year. Total £702/year. PV cost £6,000 → simple payback 8-9 years. Cert evidence bundle: EIC + MCS cert + smart meter MPAN documentation + customer handover noting SEG steps + commissioning record."
            whyItMatters="UK 2025-26 domestic PV-only retrofit = the simplest SEG case. Single-vendor, single-technology, established supplier landscape, MCS chain straightforward. The installer’s SEG-specific scope is small (advise customer + ensure smart meter + handover pack quality) but the customer-value impact is real — difference between 3p (EDF default) and 15p (Octopus / British Gas / E.ON bundle) is £300/year for this site. Honest customer conversation matters."
          />

          <Scenario
            title="PV + BESS + future EV + heat pump — multi-source PEI SEG strategy"
            situation="Customer with 5 kWp PV + 10 kWh BESS installed year 1. Planning to add 7 kW EV charger year 2 + 8 kW ASHP year 3. End state: 4-source PEI under Chapter 82 with substantial import + export flexibility. Currently on Octopus Energy (Flexible Octopus import tariff, Octopus Outgoing Fixed 15p SEG)."
            whatToDo="Multi-source PEI SEG strategy + EMS optimisation. Year 1 PV+BESS: SEG export ~1,500 kWh/year (BESS captures most surplus); self-consumption ~70% via BESS arbitrage. Income: 1,500 × £0.15 = £225 SEG + 3,500 self-consumed × £0.27 = £945 avoided = £1,170/year. Year 2 EV addition (Section 722): if home charging, opportunity to consume more PV → EV directly (zero-cost ‘fuel’) or schedule EV charging during cheap Octopus Go window. Customer switches to Intelligent Octopus Go (4-7p/kWh EV cheap-rate window) + retains Outgoing Fixed 15p for export. EV charged 95% on cheap-rate, ~2,000 kWh/year EV demand × £0.05 = £100. Year 3 ASHP (M8 fixed equipment): heat pump runs largely off PV during day + cheap-rate at night via EMS scheduling; ~3,000 kWh/year ASHP electricity demand. Total Year 3 site economics: SEG export ≈20% of generation (~1,000 kWh @ 15p = £150); avoided import + cheap-rate optimisation dominant. EMS: SolarEdge native + Home Assistant overlay for dynamic logic + Octopus tariff API. Cert evidence: integrated PEI EIC (supersedes year-1 PV EIC) + MCS certs per addition + smart meter MPAN + Octopus tariff record + EMS architecture diagram + commissioning verification per year’s upgrade."
            whyItMatters="UK 2025-26 multi-source PEI build-out is the dominant retrofit pattern. SEG is one of multiple revenue / saving streams: cheap-rate EV charging via Intelligent Octopus Go is often a larger annual saving than SEG export income. Honest customer conversation: SEG income decreases per kWh PV as BESS captures more self-consumption, but TOTAL site economic outcome improves — because the kWh that doesn’t export is the kWh that avoids the highest-cost import. Cert evidence bundle is the integrating document showing all sources + EMS + tariff strategy across the multi-year build-out."
          />

          <CommonMistake
            title="Telling customers SEG will pay for the PV install"
            whatHappens="Installer at quote stage says ‘your SEG will pay back the PV in 4-5 years’. Customer expects FiT-era generosity. Reality: UK 2025-26 SEG-only economics give 8-15 year payback for PV (longer without BESS). Customer disappointed; complaints; reputation damage."
            doInstead="Honest customer-facing economics. UK 2025-26 PV is economic because IMPORT electricity is expensive (£0.25-0.30/kWh), not because export pays well. Total annual benefit = avoided import (large) + SEG export (small). PV-only typical payback 10-15 years; PV + BESS 8-12 years; PV + BESS + EV with smart tariff strategy 7-10 years. Quote-stage economic modelling should be customer-specific (their consumption profile + tariff + selected SEG supplier) and conservative. Avoid ‘your solar pays for itself in N years’ marketing copy — use realistic ranges + explain the dominant driver is import-cost avoidance."
          />

          <CommonMistake
            title="Forgetting the smart meter dependency"
            whatHappens="Installer commissions a PV install, customer applies for SEG with their supplier, gets rejected because customer has a traditional analogue meter (or non-functional SMETS1). Customer angry that installer didn’t flag this at quote. PV runs in self-consumption-only mode + export goes to grid earning nothing until smart meter installed (often 4-8 weeks lead time)."
            doInstead="Quote-stage smart meter check is essential. Ask customer: ‘do you have a smart meter? Can you see half-hourly export readings on your in-home display or supplier app?’. If not, advise customer to request smart meter from their current import supplier BEFORE the PV install — typical lead time 2-8 weeks. Cert evidence bundle handover notes smart meter status + customer’s SEG application action. If customer is in a smart meter installation slot during the PV install, sequence: PV commissioning → SEG application submitted but pending → smart meter installed → SEG activates. Honest expectation-setting up front avoids the complaint later."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'SEG = Smart Export Guarantee. UK statutory framework, Ofgem-administered. In force since 1 January 2020. Replaced FiT (closed 31 March 2019).',
              'Mandatory for licensed suppliers ≥150,000 domestic customers; voluntary for smaller suppliers.',
              'Eligible technologies: PV / wind / hydro / AD up to 5 MW; micro-CHP up to 50 kW. Excluded: solar thermal, heat pumps, standalone BESS, biomass heat, hydrogen.',
              'Eligibility requirements: MCS certification of the install (MIS standard per technology) + smart meter (SMETS2 typical) with half-hourly export reading + customer SEG application.',
              'Compliance chain: SEG ← MCS certificate ← BS 7671 EIC. SEG is NOT a BS 7671 reg; BS 7671 compliance is required indirectly via the MCS chain.',
              'UK 2025-26 supplier rates 3-15p/kWh fixed + dynamic options (Octopus Outgoing Agile higher in peak demand). Highest rates often require bundled import tariff with same supplier.',
              'Self-consumption (avoided import 25-30p/kWh) typically 2-4× more valuable per kWh than SEG export (3-15p/kWh). EMS priority: PV → self-consume → BESS → SEG export.',
              'UK 2025-26 PV economics dominated by avoided import; SEG is secondary. Honest customer messaging matters. PV-only payback 10-15 years; PV+BESS 8-12; PV+BESS+EV+smart tariff 7-10.',
              'Customer registration: installer hands over MCS cert + EIC + smart meter MPAN → customer applies to chosen SEG supplier → supplier registers + pays per kWh exported per their tariff.',
              'Cert evidence bundle: MCS cert + BS 7671 EIC + smart meter MPAN documentation + customer handover noting SEG registration steps + commissioning record verifying export configuration.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 3 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-2')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                10.2 Energy Management Systems (EMS)
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                10.4 EREC G100 export limit
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
