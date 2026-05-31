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
import { DlmArchitecture } from '@/components/study-centre/diagrams/renewableGapSvg';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm7s5-static-vs-dynamic',
    question: 'Static DLM vs dynamic DLM — what is the difference?',
    options: [
      'Same thing',
      'Static DLM = pre-configured fixed allocation across chargers (e.g. 4 chargers always 25% of supply each). No real-time monitoring. Dynamic DLM = real-time monitoring of site current (CT clamp) + adaptive allocation based on actual demand. Dynamic accommodates other site loads + maximises EV charging within supply headroom. UK 2025-26 default for commercial: dynamic',
      'Static is illegal',
      'Dynamic is illegal',
    ],
    correctIndex: 1,
    explanation:
      'Static DLM = fixed allocation; no real-time monitoring of site total demand. Simpler hardware (no CT clamp), simpler config — but inefficient because EV chargers get a fixed share even when other site loads are low. Dynamic DLM = CT clamp on main incoming tails reads actual site current; CPMS / DLM controller calculates available headroom; allocates dynamically across the EV chargers via OCPP SetChargingProfile + CP PWM. UK 2025-26 commercial reality: dynamic is the dominant pattern because it maximises EV charging within supply headroom. Cert evidence bundle records the DLM type + topology + supply limit + per-charger throttle behaviour.',
  },
  {
    id: 'm7s5-peak-shaving-bess',
    question: 'How does a BESS support peak-shaving for a commercial EV site?',
    options: [
      'It doesn’t',
      'BESS charges during off-peak (e.g. overnight) and discharges during peak EV demand. Site’s grid import limited to supply capacity; BESS supplies the EV peak from stored energy. Reduces DNO supply size required + reduces peak-period tariff exposure + enables more EV charging within constrained supply',
      'Same as static DLM',
      'Only for residential',
    ],
    correctIndex: 1,
    explanation:
      'BESS peak-shaving topology: site has a battery (typically 50-500 kWh for commercial; multi-MWh for hubs) that charges during low-demand periods (overnight, weekends) and discharges during peak EV demand windows. Result: grid import capped at supply capacity; BESS fills the difference; more EV charging within constrained supply. Also exploits tariff arbitrage (charge BESS at off-peak rate, discharge during expensive peak). UK 2025-26 reality: BESS + EV is increasingly common at workplace + fleet depot + public hub sites where supply upgrade cost is prohibitive. Chapter 57 (Module 5) covers BESS install + Chapter 82 (PEI) covers the integration with EV. Cert evidence bundle for the integrated site records both Section 722 + Chapter 57 + Chapter 82.',
  },
  {
    id: 'm7s5-cluster-topology',
    question: 'A charging cluster topology — how is it structured?',
    options: [
      'Random',
      'Hierarchical: site-level DLM controller monitors main supply + coordinates across clusters; cluster-level DLM allocates within a group of chargers (e.g. 4 chargers on shared sub-DB); charger-level DLM applies the allocated profile via CP PWM to vehicles. Each level reports to CPMS via OCPP. Scales to large hubs (hundreds of chargers)',
      'Flat single-layer',
      'No structure',
    ],
    correctIndex: 1,
    explanation:
      'Charging cluster topology = hierarchical DLM. Site-level: master DLM controller monitors main supply (incoming CT clamp) + coordinates across clusters. Cluster-level: a group of chargers (e.g. 4-8 chargers on shared sub-distribution) has its own DLM allocation within the cluster’s share. Charger-level: each charger applies its allocated current to the vehicle via CP PWM. Scales to hundreds of chargers at large hubs. UK 2025-26 reality: OCPP 2.0.1 hierarchical smart-charging messages enable this natively; CPMS coordinates via OCPP. Cert evidence bundle records the hierarchy + per-level supply limits + the resulting per-charger allocation logic.',
  },
  {
    id: 'm7s5-future-proofing',
    question: 'Future-proofing site capacity — what design choices matter?',
    options: [
      'Nothing',
      'Spare capacity in: cable size (oversize for future expansion); CU / sub-DB way count; transformer kVA (size for 1.5-2× current peak); LV switchgear rating; spare conduit / containment routes; spare DNO supply headroom (negotiate at original connection). Cost of headroom at install is significantly less than retro-fitting later',
      'Customer decides later',
      'No future-proofing possible',
    ],
    correctIndex: 1,
    explanation:
      'Future-proofing reduces lifecycle cost. Spare cable cross-section (e.g. 16 mm² where 10 mm² would suffice today); spare CU / sub-DB ways for future chargers; transformer sized 1.5-2× current peak demand; LV switchgear with spare capacity; spare conduit / containment routes; DNO supply with negotiated future-expansion headroom. At install: 10-30% cost uplift typical. At year 5 expansion: avoids transformer replacement (£50-200k), cable re-pull (£20-50k), DNO re-application (months + cost). UK 2025-26 mature commercial EV install practice always considers Y5-Y10 expansion scenarios at quote stage. Cert evidence bundle records the design headroom + expansion capacity.',
  },
];

const quizQuestions = [
  {
    question: 'Workplace site with 6 × 22 kW chargers + three-phase 100 A supply. DLM is mandatory because:',
    options: [
      'Not mandatory',
      '6 × 32 A per phase = 192 A per phase nominal vs 100 A supply. Without DLM: over-supply by ~2×. With DLM (dynamic, CT clamp on tails, supply limit 95 A per phase): EV chargers throttle coordinated to fit; high-priority vehicles get more allocation; total stays within supply capacity. Reg 722.311.201 carve-out enables this in the max demand calc',
      'Aesthetic reasons',
      'Customer requested',
    ],
    correctAnswer: 1,
    explanation:
      'DLM mandatory at 6 × 22 kW on 100 A three-phase supply. Math: 6 × 32 A per phase = 192 A nominal vs 100 A supply per phase. Without DLM: install impossible (over-supply by ~2×). With dynamic DLM (CT clamp + per-charger allocation via OCPP + CP PWM): site-level supply limit configured 90-95 A per phase margin; chargers throttle coordinated; high-priority allocation rules; total stays within supply. Reg 722.311.201 EV-specific carve-out (M6.4) enables this in the regulatory max demand calc. Cert evidence bundle records the DLM topology + supply limit + per-charger fairness logic.',
  },
  {
    question: 'A site has BESS + PV + EV chargers. How does DLM coordinate?',
    options: [
      'Each independently',
      'Hierarchical DLM via OCPP + EMS (Energy Management System): EMS reads PV generation + BESS state-of-charge + EV demand + supply meter. Real-time allocation: prioritise PV self-consumption to EV (free energy); BESS discharges during EV peak if PV insufficient; grid import as last resort within DNO supply limit; BESS charges from PV surplus + off-peak grid. EV chargers receive coordinated profiles via OCPP. Chapter 82 (PEI) regulatory framework integrates all sources',
      'Random allocation',
      'No coordination',
    ],
    correctAnswer: 1,
    explanation:
      'Integrated commercial site = hierarchical DLM under an EMS (Energy Management System). EMS reads: PV generation (instantaneous + forecast); BESS state-of-charge + power capability; EV demand (currently charging + pending sessions); grid supply meter (DNO limit + tariff window). Real-time optimisation: priority 1 = PV → EV (free + zero-export); priority 2 = BESS → EV during peak grid (tariff arbitrage); priority 3 = grid → EV within supply limit; BESS charges from PV surplus + off-peak grid. EV chargers receive allocated current via OCPP SetChargingProfile. UK 2025-26 reality: this integrated topology is the prosumer / commercial sweet spot — Octopus Flux tariff geometry favours this exactly. Chapter 82 (Prosumer’s Electrical Installation) is the BS 7671 regulatory frame. Cert evidence bundle integrates Section 712 (PV) + Chapter 57 (BESS) + Section 722 (EV) + Chapter 82 (PEI).',
  },
  {
    question: 'Static DLM vs dynamic DLM — when would static be acceptable?',
    options: [
      'Always dynamic',
      'Static acceptable where: site’s non-EV loads are stable + predictable (e.g. dedicated EV depot with no other significant loads); the simpler hardware is preferred for reliability / cost; supply headroom is comfortable (>50% spare). Dynamic essential where: site has variable non-EV loads (workplace office + EV); supply is tight; multi-tenant / multi-purpose sites. Cert evidence bundle records the DLM type + rationale',
      'Static is obsolete',
      'Dynamic only for residential',
    ],
    correctAnswer: 1,
    explanation:
      'Static DLM is simpler + cheaper hardware but inefficient. Acceptable use cases: dedicated EV depot with stable predictable non-EV load (e.g. taxi depot office + 20 charging bays); supply with comfortable headroom (>50% spare for EV); operational simplicity prized over efficiency. Dynamic DLM is essential where: site has variable non-EV load (typical commercial / workplace); supply is tight; multi-purpose site. Cert evidence bundle records the choice + rationale. UK 2025-26 reality: dynamic is the dominant pattern in new installs; static survives in niche use cases.',
  },
  {
    question: 'Charging cluster — what is the optimal cluster size?',
    options: [
      '1 charger',
      'Depends on supply topology + DLM granularity. UK 2025-26 typical: 4-8 chargers per cluster (shared sub-DB + DLM allocation within the cluster); cluster aggregates to a site-level master DLM. Larger clusters (12+) increase complexity + reduce per-charger fairness; smaller (1-3) reduce DLM efficiency. Site design balances supply headroom vs operational complexity',
      '1000 chargers',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Cluster sizing is a design balance. 4-8 chargers per cluster is the UK 2025-26 sweet spot — shared sub-DB + DLM coordination internal to the cluster + cluster aggregates to site-level master DLM. Smaller clusters (1-3): reduces DLM efficiency (each charger gets a small fixed share of cluster supply). Larger (12+): increases complexity, reduces per-charger fairness when demand exceeds supply (some chargers get throttled to minimum 6 A while others get full). Design considers: supply topology (where does the sub-DB sit), DLM granularity (how fine-grained the coordination), operational simplicity (smaller clusters easier to fault-find). Cert evidence bundle records cluster topology + sub-DB locations + supply allocation per cluster.',
  },
  {
    question: 'Peak-shaving BESS sizing — what is the typical UK 2025-26 commercial pattern?',
    options: [
      '1 kWh',
      'Sized to cover the difference between peak EV demand and supply capacity, for the peak duration. Example: 6 × 22 kW chargers (132 kW peak EV) on 100 kW supply = 32 kW shortfall; peak window 3 hours = 96 kWh BESS minimum (more typically 150-250 kWh for headroom + cycle life management). Larger hubs: 500 kWh to multi-MWh BESS',
      '1 GWh',
      'Customer guesses',
    ],
    correctAnswer: 1,
    explanation:
      'BESS sizing for peak-shaving = shortfall × peak duration + headroom. Workplace example: 6 × 22 kW chargers (peak EV demand 132 kW) on 100 kW supply = 32 kW shortfall during peak. Peak window 3 hours typical: 32 × 3 = 96 kWh minimum. With cycle-life DoD (80%) + safety margin: 96 / 0.8 + 25% headroom = ~150 kWh BESS. Larger commercial sites: 500 kWh; public hubs with multiple Mode 4 chargers: multi-MWh. BESS technology = LFP (M5 chemistry choice); ~£300-500/kWh installed cost UK 2025-26. ROI typically 4-8 years via supply upgrade avoidance + tariff arbitrage + grid services revenue (frequency response, capacity market). Cert evidence bundle integrates BESS sizing rationale (Chapter 57 install + Section 722 EV demand profile).',
  },
  {
    question: 'Future-proofing for a workplace EV site: what should the design include?',
    options: [
      'Nothing',
      'Spare CU ways for future chargers; oversize cable cross-section by 30-50% for future load growth; transformer sized 1.5-2× current peak; LV switchgear with spare rating; spare conduit / containment routes; DNO supply with negotiated expansion headroom. At install: ~15-25% cost uplift; at Y5-Y10 expansion: avoids £100k+ retrofit cost',
      'Just match current need',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Future-proofing design includes: (1) spare CU / sub-DB ways for additional chargers (typical UK 2025-26 EV growth: 30-50% YoY at workplaces); (2) cable cross-section oversized by 30-50% for future load growth (e.g. 16 mm² instead of 10 mm²); (3) transformer sized 1.5-2× current peak demand; (4) LV switchgear with spare rating; (5) spare conduit / containment routes pulled in at first install (much cheaper than re-pulling); (6) DNO supply with negotiated future-expansion headroom in the connection agreement. At install: ~15-25% cost uplift. At Y5-Y10 expansion: avoids transformer replacement (£50-200k), cable re-pull (£20-50k), DNO re-application (months delay + cost). UK 2025-26 mature install practice always considers expansion scenarios at quote stage. Cert evidence bundle records the design headroom + expansion capacity available.',
  },
];

const faqs = [
  {
    question: 'DLM hardware — where does the CT clamp go?',
    answer:
      'CT (current transformer) clamp on the main incoming tails (after the meter, before the consumer unit / main switchboard). Reads total site current per phase. Wired to the DLM controller (either standalone unit, or built into a master wallbox, or a dedicated module on the CPMS). UK 2025-26 reputable brands all use this pattern. Cert evidence bundle: CT clamp location + orientation + commissioning verification (reading matches the site’s actual draw).',
  },
  {
    question: 'BESS + EV — what’s the regulatory frame?',
    answer:
      'Integrated. Chapter 57 (BESS install — M5) + Section 722 (EV install — M6/M7) + Chapter 82 (Prosumer’s Electrical Installation — PEI integration) all apply. The site combines three regulatory domains; cert evidence bundle integrates all. DNO involvement: G99 typically required for sites with co-located generation (BESS can export in some configurations).',
  },
  {
    question: 'Static vs dynamic DLM — cost difference?',
    answer:
      'Static DLM = simple manufacturer-configured allocation (no CT clamp, no DLM controller). Cost essentially zero. Dynamic DLM = CT clamp (~£50-150 per phase) + DLM controller (built into wallbox or separate unit, ~£200-500 typically) + commissioning labour. Per-site cost: ~£500-1,500 typical for dynamic. ROI: dynamic enables more EV charging within constrained supply; usually pays back via avoided supply upgrade cost.',
  },
  {
    question: 'What happens if DLM controller fails?',
    answer:
      'Modern wallboxes default to a safe fall-back current (typically minimum 6 A per Mode 3 — about 1.4 kW) if DLM communication is lost. Site continues to operate but at reduced charge rate. Fault is reported to CPMS via OCPP for operator action. UK 2025-26 reliability: very rare — CT clamps are passive devices, DLM controllers are robust. Cert evidence bundle records the fall-back behaviour + diagnostic procedure.',
  },
  {
    question: 'Can DLM coordinate across sites (chain of workplaces)?',
    answer:
      'Yes via CPMS. Multi-site DLM = CPMS aggregates state from all sites + can apply policies across them (e.g. corporate-wide peak-shaving, tariff window scheduling, ESG reporting). OCPP per site + CPMS coordinates above. UK 2025-26 reality: large corporate fleets use this pattern. Cert evidence bundle per site records the local DLM + CPMS integration; the corporate operator manages multi-site coordination above.',
  },
];

export default function RenewableEnergyModule7Section5() {
  const navigate = useNavigate();

  useSEO({
    title: 'DLM at scale & charging clusters | Renewable Energy 7.5 | Elec-Mate',
    description:
      'Dynamic Load Management at commercial scale — static vs dynamic DLM, peak-shaving via BESS integration, hierarchical cluster topology, supply headroom calculation, future-proofing site capacity, OCPP smart-charging coordination, Chapter 82 PEI integration.',
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
            eyebrow="Module 7 · Section 5 · BS 7671:2018+A4:2026 · Reg 311.1 + 722.311.201 + Chapter 82"
            title="DLM at scale & charging clusters"
            description="Dynamic Load Management at commercial scale — coordinating multi-charger sites within constrained supply. Static vs dynamic, peak-shaving via BESS, hierarchical cluster topology, future-proofing, Chapter 82 PEI integration."
            tone="yellow"
          />

          <TLDR
            points={[
              'DLM at scale = coordinating multi-charger sites within constrained supply. Reg 722.311.201 enables load curtailment in max demand calc; CPMS + OCPP deliver the coordination.',
              'Static DLM = pre-configured fixed allocation. Simpler hardware. Acceptable where non-EV loads are stable. Dynamic DLM = real-time CT clamp + adaptive allocation. UK 2025-26 dominant.',
              'Charging cluster topology = hierarchical DLM. Site-level (master DLM + CT on main tails) → cluster-level (4-8 chargers on shared sub-DB) → charger-level (CP PWM to vehicle). OCPP 2.0.1 native support.',
              'Peak-shaving BESS sizing = shortfall × peak duration + headroom. Workplace 132 kW peak on 100 kW supply, 3-hour window → ~150 kWh BESS. Larger hubs: 500 kWh to multi-MWh.',
              'Integrated site DLM (PV + BESS + EV) = EMS (Energy Management System) coordinates via OCPP. Priority: PV → EV, then BESS → EV during peak, then grid. Chapter 82 PEI regulatory frame.',
              'Future-proofing: spare CU ways, oversized cable (30-50%), transformer 1.5-2× peak, LV switchgear spare rating, spare conduit, DNO supply expansion headroom. At install: ~15-25% cost uplift.',
              'Cluster sizing: 4-8 chargers per cluster typical. Smaller reduces DLM efficiency; larger increases complexity + reduces per-charger fairness.',
              'Multi-site DLM via CPMS aggregation — corporate-wide peak-shaving, ESG reporting, tariff coordination across sites.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish static DLM (pre-configured fixed allocation) from dynamic DLM (real-time CT clamp + adaptive).',
              'Apply Reg 722.311.201 load curtailment + Reg 311.1 max demand for multi-charger commercial sites.',
              'Design hierarchical cluster topology: site-level master DLM + cluster-level + charger-level.',
              'Size BESS for peak-shaving: shortfall × peak duration + headroom for cycle-life management.',
              'Integrate PV + BESS + EV under Chapter 82 (PEI) via EMS coordination + OCPP smart-charging.',
              'Future-proof site capacity: spare cable, ways, transformer kVA, LV switchgear, conduit, DNO supply.',
              'Choose cluster size (4-8 chargers typical) balancing DLM efficiency + operational complexity.',
              'Apply OCPP 2.0.1 hierarchical smart-charging profiles for multi-cluster coordination.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Single charger DLM is throttling. Cluster DLM is choreography. The CPMS is the conductor.
          </Pullquote>

          <ContentEyebrow>Static vs dynamic DLM</ContentEyebrow>

          <ConceptBlock
            title="Static DLM — fixed allocation, simpler hardware"
            plainEnglish="Static DLM = pre-configured fixed share of supply per charger. No real-time monitoring. Each charger always gets its fixed allocation regardless of actual site demand. Simpler hardware (no CT clamp, no DLM controller); cheaper at install."
            onSite="UK 2025-26 use cases: dedicated EV depot with stable predictable non-EV load (e.g. taxi depot office + 20 charging bays); supply with comfortable headroom (>50% spare for EV); operational simplicity prized. Limitation: inefficient — EV chargers get a fixed share even when other loads are low. Cert evidence bundle records the allocation per charger + the rationale."
          >
            <p>Static DLM characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Fixed allocation</strong> — e.g. 4 chargers
                on a 100 A supply = 25 A each fixed, regardless of other site load
              </li>
              <li>
                <strong className="text-white">No CT clamp</strong> — no real-time
                monitoring of site current
              </li>
              <li>
                <strong className="text-white">Cheap</strong> — manufacturer-configured at
                commissioning; no additional hardware
              </li>
              <li>
                <strong className="text-white">Inefficient</strong> — EV chargers
                throttled even when other loads are low
              </li>
              <li>
                <strong className="text-white">Predictable</strong> — operator knows
                exactly what each charger will deliver under any condition
              </li>
              <li>
                <strong className="text-white">Use cases</strong> — dedicated EV depot,
                stable site, comfortable supply headroom, simplicity prized
              </li>
            </ul>
          </ConceptBlock>

          <DlmArchitecture caption="Dynamic load management shares the supply capacity across chargers so the total never exceeds it." />

          <ConceptBlock
            title="Dynamic DLM — real-time CT clamp + adaptive allocation"
            plainEnglish="Dynamic DLM = CT clamp on main incoming tails reads actual site current per phase; DLM controller (built into a master wallbox, or standalone, or CPMS-managed) calculates available headroom; allocates dynamically across the EV chargers via OCPP SetChargingProfile + CP PWM to vehicles. Real-time response to changing site conditions."
            onSite="UK 2025-26 commercial dominant pattern. Maximises EV charging within supply headroom. Adaptive to: changing non-EV load throughout the day, tariff windows, PV generation, BESS state-of-charge, fleet priorities. Cert evidence bundle records the DLM topology + supply limit + per-charger throttle behaviour + commissioning verification."
          >
            <p>Dynamic DLM characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">CT clamp on main tails</strong> — reads
                actual site current per phase
              </li>
              <li>
                <strong className="text-white">DLM controller</strong> — built into a
                master wallbox (MyEnergi Zappi + libbi extension; Wallbox Pulsar Plus +
                Power Boost; Easee + Equalizer), standalone hardware (EO Hub), or
                CPMS-managed (Driivz, ChargePoint dynamic profiles)
              </li>
              <li>
                <strong className="text-white">Real-time allocation</strong> — calculates
                available headroom (supply limit - non-EV current) every few seconds;
                allocates across chargers; sends via OCPP / proprietary protocol
              </li>
              <li>
                <strong className="text-white">CP PWM
                  application</strong> — chargers apply allocated current via CP PWM duty
                cycle to vehicles; vehicles respond within sub-second
              </li>
              <li>
                <strong className="text-white">Reg 722.311.201
                  basis</strong> — the EV-specific load curtailment carve-out in BS 7671;
                makes the dynamic allocation legal in the max demand calc
              </li>
              <li>
                <strong className="text-white">Cost</strong> — ~£500-1,500 per site
                additional hardware + commissioning. Pays back via avoided supply upgrade
                cost
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — CT clamp
                position + supply limit + DLM allocation logic + commissioning test
                (verified throttle response under simulated load)
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 722.311.201 — load curtailment for EV (extends to multi-charger sites)"
            clause="Load curtailment, including load reduction or disconnection, either automatically or manually, may be taken into account when determining the maximum demand of the installation or part thereof. Applies per-circuit; scales to multi-charger sites via coordinated DLM."
            meaning="Reg 722.311.201 is the EV-specific carve-out that makes dynamic DLM legal in the max demand calc. Maximum demand is determined under Reg 311.1, where diversity may be taken into account as normal practice; Reg 722.311.201 goes further and explicitly permits a controlled load-curtailment scheme (load reduction or disconnection, automatic or manual) to be taken into account when determining the maximum demand of an EV installation. At multi-charger commercial sites, this carve-out is essential: 6 × 32 A per phase = 192 A nominal vs 100 A supply = 92 A shortfall. DLM hardware actively enforces the curtailment in real time. Cert evidence bundle records the DLM topology + supply limit + Reg 722.311.201 reference + per-charger curtailment logic."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Peak-shaving BESS + integrated site EMS</ContentEyebrow>

          <Pullquote>
            BESS turns a constrained DNO supply into an apparent infinite supply. Peak EV demand draws from stored energy; grid sees only the average.
          </Pullquote>

          <ConceptBlock
            title="BESS peak-shaving topology"
            plainEnglish="A commercial site adds a Battery Energy Storage System (BESS — see M5) that charges during low-demand periods and discharges during peak EV demand. Grid import capped at DNO supply capacity; BESS supplies the EV peak from stored energy. Result: more EV charging within constrained supply + tariff arbitrage benefit."
            onSite="UK 2025-26 reality: BESS + EV is increasingly common at workplace + fleet depot + public hub sites where DNO supply upgrade cost is prohibitive (£100k+ + months delay). 100-500 kWh BESS adds £30-150k to project cost but avoids the much larger supply upgrade cost. Operational benefit: tariff arbitrage (Octopus Flux peak / cheap) + capacity market participation + frequency response revenue."
          >
            <p>BESS peak-shaving design:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sizing</strong> — kWh = (peak EV demand
                minus supply) × peak duration + cycle-life headroom. Example workplace: 132
                kW peak EV on 100 kW supply = 32 kW shortfall × 3 hour peak = 96 kWh; with
                80% DoD + headroom = ~150 kWh BESS
              </li>
              <li>
                <strong className="text-white">Charging</strong> — BESS charges during
                off-peak (overnight; tariff cheap window; PV surplus during day if PV
                present)
              </li>
              <li>
                <strong className="text-white">Discharging</strong> — BESS discharges
                during peak EV demand window (typically morning + evening); supplies
                shortfall between supply capacity and EV demand
              </li>
              <li>
                <strong className="text-white">Grid view</strong> — DNO sees grid import
                capped at supply capacity, never peaking. Smoother profile + lower
                connection cost
              </li>
              <li>
                <strong className="text-white">Tariff
                  arbitrage</strong> — charge BESS at off-peak (Octopus Flux 12p; Cosy
                13p; Intelligent Go 7p); discharge during peak EV (avoid Octopus Flux
                33p+ peak). Annual savings ~£10-50k typical at commercial scale
              </li>
              <li>
                <strong className="text-white">Capacity market +
                  frequency response</strong> — BESS can participate in National Grid
                services (capacity market auction; firm frequency response; dynamic
                containment). Additional revenue stream ~£10-30/kW/year
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — Chapter 57
                BESS install + Section 722 EV install + Chapter 82 PEI integration. EMS
                configuration + OCPP smart-charging + BESS dispatch logic
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Integrated site EMS — PV + BESS + EV coordination"
            plainEnglish="An EMS (Energy Management System) coordinates PV generation, BESS state-of-charge, EV demand, and grid supply in real time. Priority logic: PV → EV (free); BESS → EV during peak; grid → EV within supply limit. BESS charges from PV surplus + off-peak grid."
            onSite="UK 2025-26 commercial integrated site = prosumer at scale. Workplace sites with rooftop PV + BESS + EV charging; fleet depots with carport PV + BESS + overnight EV charging; public hubs with overhead PV + BESS + multi-rapid charging. The EMS coordinates all sources + sinks via OCPP for EV + manufacturer protocols for BESS + inverter-level controls for PV. Cert evidence bundle integrates Section 712 (PV) + Chapter 57 (BESS) + Section 722 (EV) + Chapter 82 (PEI)."
          >
            <p>Integrated EMS coordination logic:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Priority 1: PV → EV</strong> — free
                energy; zero-export benefit; self-consumed PV is most valuable. EV
                allocation = PV instantaneous output
              </li>
              <li>
                <strong className="text-white">Priority 2: BESS → EV
                  (peak)</strong> — during peak grid tariff hours, BESS supplies EV; grid
                import minimised. Tariff arbitrage benefit
              </li>
              <li>
                <strong className="text-white">Priority 3: Grid → EV</strong>
                — when PV insufficient + BESS exhausted, grid supplies; within DNO supply
                limit
              </li>
              <li>
                <strong className="text-white">BESS charging
                  source</strong> — PV surplus (zero-export) during day; off-peak grid
                (cheap tariff) overnight
              </li>
              <li>
                <strong className="text-white">EMS hardware</strong> — typically the
                inverter’s manufacturer EMS (MyEnergi Zappi+Libbi, SolarEdge EMS,
                Tesla Powerwall+Wall Connector, Fronius Symo Hybrid + Wallbox) or a
                third-party EMS (Loxone, Modbus-based custom)
              </li>
              <li>
                <strong className="text-white">OCPP integration</strong> — CPMS receives
                EV demand + EMS dispatches via OCPP SetChargingProfile
              </li>
              <li>
                <strong className="text-white">Chapter 82 (PEI)</strong> — regulatory
                framework. All sources + sinks form a Prosumer’s Electrical
                Installation. Reg 826.x covers integration; anti-islanding (Reg 551.7.5)
                + neutral handling in island mode (Reg 826.1.1.2.2)
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — integrated
                section 712 + chapter 57 + section 722 + chapter 82 records
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 82 — Prosumer’s Electrical Installation (PEI integration)"
            clause="Where an electrical installation includes one or more sources (PV, BESS, V2G, generators) in addition to (or instead of) a public supply, the installation is a Prosumer’s Electrical Installation (PEI). Reg 826.x sets requirements for source integration, protection-measure persistence across supply-configuration changes (grid → island), neutral handling, anti-islanding under Reg 551.7.5."
            meaning="Integrated commercial sites with PV + BESS + EV operate as a PEI under Chapter 82. The Section 722 EV install + Section 712 PV install + Chapter 57 BESS install all sit within the PEI; Chapter 82 governs their integration. Key Reg 826.1.1.2.2 — neutral conductor handling in island mode (when BESS supplies the EV during a grid outage). Reg 551.7.5 anti-islanding — generation must not export to a lost public supply. EMS / OCPP coordinates the operational behaviour; the regulations set the protective architecture. Cert evidence bundle integrates all four chapters."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Cluster topology + future-proofing</ContentEyebrow>

          <ConceptBlock
            title="Hierarchical cluster topology"
            plainEnglish="At larger commercial sites (10+ chargers), DLM organises hierarchically. Site-level master DLM (CT on main tails) coordinates across clusters; each cluster (4-8 chargers on shared sub-DB) has its own DLM allocation within the cluster’s share; each charger applies its allocated current via CP PWM to vehicles."
            onSite="UK 2025-26 scale: workplaces with 12-50 chargers; fleet depots with 20-100 chargers; public hubs with 6-24 chargers per site (multi-site networks of hundreds of chargers). The hierarchy makes DLM tractable + fair + extensible. OCPP 2.0.1 hierarchical smart-charging messages natively support this. Cert evidence bundle records the hierarchy per site."
          >
            <p>Cluster hierarchy:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Site level</strong> — master DLM
                controller; CT clamp on main incoming tails; reads total site current per
                phase; coordinates across clusters
              </li>
              <li>
                <strong className="text-white">Cluster level</strong> — 4-8 chargers on
                shared sub-DB; cluster DLM allocates within the cluster’s share of
                site supply
              </li>
              <li>
                <strong className="text-white">Charger level</strong> — each charger
                applies its allocated current to the connected vehicle via CP PWM
              </li>
              <li>
                <strong className="text-white">Priority + fairness
                  logic</strong> — CPMS can override defaults: VIP / fleet
                priority drivers get full allocation; lower-priority sessions throttle
                first; minimum 6 A floor for any active session
              </li>
              <li>
                <strong className="text-white">OCPP 2.0.1
                  hierarchical profiles</strong> — site / cluster / charger profile
                hierarchy; native protocol support; CPMS issues hierarchical SetChargingProfile
                messages
              </li>
              <li>
                <strong className="text-white">Cluster sizing</strong> — 4-8 chargers
                typical sweet spot. Smaller: reduced DLM efficiency. Larger: increased
                complexity + reduced fairness
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> — site map
                + cluster boundaries + sub-DB locations + CT clamp positions + DLM
                allocation logic + commissioning verification per cluster
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Future-proofing site capacity"
            plainEnglish={`UK 2025-26 commercial EV demand growth is 30-50% YoY at typical workplace + fleet sites. Site capacity that’s "just right" at install becomes constrained within 3-5 years. Future-proofing at install adds 15-25% cost but avoids £100k+ retrofit costs at year 5.`}
            onSite="At quote stage, project Y5-Y10 expansion scenarios. Specify cable, ways, transformer, switchgear, conduit, DNO supply with future headroom. Cert evidence bundle records the design headroom + the expansion path documented for the customer."
          >
            <p>Future-proofing checklist:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Cable
                  cross-section</strong> — oversize by 30-50% for future load growth (e.g.
                16 mm² where 10 mm² would suffice today)
              </li>
              <li>
                <strong className="text-white">CU / sub-DB ways</strong>
                — leave 50-100% spare ways for future chargers
              </li>
              <li>
                <strong className="text-white">Transformer kVA</strong> —
                size 1.5-2× current peak demand. UK 2025-26 typical workplace install
                400-630 A LV; future-proof to 800-1,000 A is common
              </li>
              <li>
                <strong className="text-white">LV switchgear</strong> — spare
                rating + spare outgoing ways
              </li>
              <li>
                <strong className="text-white">Conduit + containment</strong>
                — pull spare conduit at first install — much cheaper than re-pulling later
                (avoid trenching + civils for future cables)
              </li>
              <li>
                <strong className="text-white">DNO supply
                  agreement</strong> — negotiate future-expansion headroom in the original
                connection agreement. Pre-paid grid capacity is much cheaper than new
                application later
              </li>
              <li>
                <strong className="text-white">BESS expansion path</strong>
                — modular BESS that can add capacity in chunks (multi-module designs)
              </li>
              <li>
                <strong className="text-white">Cost uplift at
                  install</strong> — ~15-25% typical. Pays back if expansion happens
                within ~5-7 years
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong>
                — design headroom + expansion capacity + Y5-Y10 scenarios documented
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <Pullquote>
            Future-proofing costs 20% at install and saves 200% at year 5. The maths is obvious once the customer has been through one expansion cycle.
          </Pullquote>

          <ConceptBlock
            title="Multi-site DLM via CPMS aggregation"
            plainEnglish="Large operators with multiple commercial sites coordinate DLM at the corporate level via CPMS. Each site has its local DLM (CT clamp + cluster topology); the CPMS aggregates state across sites + can apply corporate-wide policies — tariff window scheduling, ESG reporting, peak-shaving across the portfolio."
            onSite="UK 2025-26 corporate fleet operators (Royal Mail, BT, Amazon, DPD, supermarket chains) operate hundreds of charging sites under a single CPMS. The CPMS lets them run portfolio-level analytics + apply blanket policies (e.g. all sites throttle to 50% during the National Grid Triad peak hours; all sites preferentially use PV self-consumption first). Cert evidence bundle per site records local DLM + CPMS integration; the operator manages multi-site coordination above the site level."
          >
            <p>Multi-site DLM patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-site DLM</strong> — local CT clamp +
                cluster topology. Operates autonomously when CPMS comm lost
              </li>
              <li>
                <strong className="text-white">CPMS aggregation</strong> — corporate
                CPMS reads each site’s state via OCPP; aggregates into portfolio
                dashboards + reports
              </li>
              <li>
                <strong className="text-white">Corporate-wide
                  policies</strong> — applied across all sites via OCPP SetChargingProfile.
                Examples: throttle to 50% during Triad peaks; preferentially PV
                self-consumption; demand-response participation
              </li>
              <li>
                <strong className="text-white">ESG reporting</strong> — portfolio-level
                CO₂ saved, kWh delivered, charge sessions, % PV self-consumed.
                Increasingly required by corporate sustainability reporting (CSRD, TCFD)
              </li>
              <li>
                <strong className="text-white">Demand-response
                  revenue</strong> — large portfolios participate in National Grid demand
                response programmes (Dynamic Containment, Demand Flexibility Service)
                via CPMS-coordinated throttling. £-thousands/site/year revenue
              </li>
              <li>
                <strong className="text-white">Tariff arbitrage at
                  scale</strong> — portfolio-level coordination of off-peak charging
                across multiple supply contracts; smarter than site-level alone
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per site: local DLM + CPMS integration. Corporate:
                multi-site coordination policy + portfolio architecture
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Workplace fleet — 12 × 22 kW + BESS peak-shaving"
            situation="Workplace site with 12 × 22 kW three-phase chargers + existing 200 A three-phase supply + new BESS to enable the install without DNO upgrade. Mixed EV fleet (mostly 11 kW OBC). OCPP via Driivz CPMS."
            whatToDo="Without BESS: 12 × 32 A per phase = 384 A peak nominal vs 200 A supply = un-installable without DNO upgrade. With BESS peak-shaving: 200 A supply limit + BESS supplies the shortfall during peak window. BESS sizing: 132 kW peak EV - 100 kW available (after other site load) = 32 kW shortfall; 3-hour peak = 96 kWh; with 80% DoD + headroom = 150 kWh BESS. Topology: 12 chargers in 3 clusters of 4 (on shared sub-DBs); site-level master DLM (CT on main tails) + cluster DLM + charger-level via OCPP. Driivz CPMS coordinates. PV consideration: site is feasible with future PV addition (carport PV planned Y2-3); EMS will integrate. Section 722 per charger; BS EN IEC 61439-7 for the multi-charger LV assembly; Chapter 57 for BESS install; Chapter 82 for PEI integration. Cert evidence bundle: 12 × EIC + 61439-7 + Chapter 57 BESS pack + Chapter 82 PEI integration + DLM hierarchy + Driivz CPMS integration. Total project ~£150-250k (12 chargers + BESS + sub-DB + DLM + CPMS integration); BESS pays back in ~4-6 years via avoided DNO upgrade + tariff arbitrage."
            whyItMatters="BESS-enabled DLM is the UK 2025-26 workplace install pattern that avoids DNO upgrade. Customer-facing: workplace can offer 12 chargers without grid upgrade. Engineer-facing: integration of Section 712 (future PV) + Chapter 57 (BESS) + Section 722 (EV) + Chapter 82 (PEI) at a single workplace site. Cert evidence bundle is the multi-chapter compliance document."
          />

          <Scenario
            title="Fleet depot — 40 × 22 kW + sequential scheduling"
            situation="Taxi fleet depot with 40 × 22 kW three-phase chargers + dedicated DNO HV connection + on-site transformer 1,000 kVA. Vehicles return to depot at varied times throughout 24h. Sequential charging scheduled by departure times."
            whatToDo="Topology: 40 chargers in 8 clusters of 5 (each cluster on its own sub-DB from the LV switchgear). Site-level master DLM + cluster DLM + charger-level. CPMS = fleet-specific (e.g. ChargePoint Fleet, Driivz Fleet Manager, Spirii Fleet). Telematics integration: each vehicle’s telematics reports state-of-charge + scheduled departure time; CPMS calculates priority + allocates charging accordingly. Sequential charging: 6 hours overnight peak (00:00-06:00) sees full 40 × 22 kW concurrent ramp; off-peak hours see staggered charging. BS EN IEC 61439-7 for the multi-charger LV assembly. Section 722 per charger. Future-proofing: transformer 1,500 kVA sized for 60-80 chargers (50% headroom); spare sub-DB ways; spare conduit for future chargers. Cert evidence bundle: 40 × EIC + 61439-7 + DNO HV connection + transformer + LV switchgear + telematics integration + fleet CPMS configuration + future-proofing documentation. Total project ~£600k-£1.2m. Operational benefit: fleet operator centrally manages 40+ vehicles’ charging via single CPMS dashboard + telematics."
            whyItMatters="Fleet depots are the highest-density commercial EV install pattern in UK 2025-26. Taxi (London, Birmingham, Manchester), delivery (Amazon, DPD, Royal Mail, Tesco), and LCV (corporate fleets) operators are scaling rapidly. The integration of telematics + fleet CPMS + DLM hierarchy is the operational differentiator. Section 6 covers fleet specifics in depth."
          />

          <CommonMistake
            title="Specifying static DLM where dynamic is needed"
            whatHappens="Installer quotes a 6 × 7 kW workplace install with static DLM (each charger always limited to ~14 A from a 100 A supply). Customer’s actual office load varies 20-60 A throughout the day; static DLM doesn’t adapt. When office load is low (e.g. weekends, evenings), the EV chargers should be able to charge faster — but static DLM caps them at 14 A always. Customer complains that the chargers feel slow even when nothing else is drawing."
            doInstead="Dynamic DLM with CT clamp on main tails. Real-time monitoring + adaptive allocation. EV chargers throttle when office load is high; ramp up when office load is low. UK 2025-26 commercial standard pattern. The £500-1,500 additional cost for CT clamp + DLM controller pays back in customer satisfaction + maximises EV charging within supply capacity. Cert evidence bundle records the dynamic DLM topology."
          />

          <CommonMistake
            title="Not future-proofing — site capacity exceeded within 3 years"
            whatHappens="Installer quotes minimum-cost install: 4 × chargers, cable sized to current demand only, transformer sized to current peak, no spare CU ways, no spare conduit. Year 3: customer wants to expand to 12 chargers (UK EV adoption growth + staff retention). The minimum-cost install requires transformer replacement (£100k), cable re-pull (£40k), DNO re-application (months delay). Customer pays 5× the original install’s saving."
            doInstead={`Future-proofing at quote stage: 30-50% cable headroom, transformer 1.5-2× peak, spare CU ways, spare conduit, DNO supply with negotiated expansion headroom. At install: ~15-25% cost uplift. At Y5-Y10 expansion: dramatically reduced retrofit cost. Customer-facing: presented as "we’ve sized this for your 2030 capacity, not your 2026 capacity". Cert evidence bundle records the design headroom + Y5-Y10 expansion scenarios.`}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DLM at scale = coordinating multi-charger sites within constrained supply. Reg 722.311.201 enables load curtailment; CPMS + OCPP deliver the coordination.',
              'Static DLM = pre-configured fixed allocation. Simpler hardware. Acceptable for stable predictable sites. Dynamic DLM = real-time CT clamp + adaptive. UK 2025-26 dominant.',
              'Hierarchical cluster topology: site-level master DLM (CT on main tails) → cluster-level (4-8 chargers) → charger-level (CP PWM). OCPP 2.0.1 native support.',
              'Peak-shaving BESS sizing = shortfall × peak duration + headroom. Workplace 132 kW peak on 100 kW supply, 3h window → ~150 kWh BESS.',
              'Integrated site EMS (PV + BESS + EV) = priority PV → EV → BESS → grid; Chapter 82 PEI regulatory frame; OCPP coordinates the EV side.',
              'BESS revenue streams: tariff arbitrage + capacity market + frequency response. ~£10-50k/yr typical commercial benefit alongside EV-charging enablement.',
              'Future-proofing: spare cable (30-50%), spare CU ways, transformer 1.5-2× peak, spare conduit, DNO supply expansion headroom. ~15-25% cost uplift at install.',
              'Cluster sizing: 4-8 chargers per cluster typical. Smaller reduces DLM efficiency; larger increases complexity + reduces fairness.',
              'Multi-site DLM via CPMS aggregation — corporate peak-shaving + ESG reporting + tariff coordination across sites.',
              'Chapter 82 (PEI) integrates Section 712 + Chapter 57 + Section 722 at sites with PV + BESS + EV. Reg 826.1.1.2.2 neutral handling; Reg 551.7.5 anti-islanding.',
              'Cert evidence bundle integrates Section 712 + Chapter 57 + Section 722 + Chapter 82 + EMS configuration + OCPP smart-charging + DLM hierarchy.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-7-section-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                OCPP & networked charging
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-7-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.6 Fleet charging — depot, scheduling, telematics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
