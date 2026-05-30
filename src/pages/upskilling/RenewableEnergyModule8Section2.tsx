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
    id: 'm8s2-max-demand-calc',
    question:
      'How is max demand calculated for a heat pump install per Reg 311.1?',
    options: [
      'Sum every rated input',
      'Sum the rated continuous electrical inputs of each load on the circuit / installation, apply diversity per the design context, and identify the peak coincident demand. For a typical UK 2025-26 domestic ASHP install: compressor continuous input (1.5-4 kW) + immersion backup (3 kW, may not run simultaneously with compressor) + circulation pumps (100-300 W) + controls (50-150 W) + existing site base load. Diversity reflects that some loads do not coincide at peak',
      'Take the largest only',
      'No calc needed',
    ],
    correctIndex: 1,
    explanation:
      'Reg 311.1 max demand calc: sum of rated continuous electrical inputs with applied diversity factor reflecting the design context. For a typical UK 2025-26 domestic ASHP install: (1) compressor continuous input — typically 1.5-4 kW for 5-12 kW thermal output (COP ~3); use manufacturer rated input not the COP-derived theoretical; (2) immersion backup — 3 kW typical; design coincidence rule decides whether to include at full rating (boost cycle could coincide with compressor in some control strategies); (3) circulation pumps — 100-300 W typical; usually coincident with compressor; (4) controls + sensors — 50-150 W; coincident with anything running; (5) existing site base load — cooker / appliances / lighting per existing-load assessment. Apply diversity per IET / OSG guidance + designer judgement. Cert evidence bundle records each load + diversity assumption + the peak coincident max demand.',
  },
  {
    id: 'm8s2-g98-g99',
    question:
      'EREC G98 vs G99 — which applies to a typical 8 kW thermal ASHP on single-phase supply?',
    options: [
      'Always G99 formal',
      'Pure-load heat pump (no co-located generation) at ≤16 A per phase on existing single-phase supply: usually DNO heat pump notification portal (per-phase ≤16 A typical fast-track threshold borrowed from G98). 8 kW thermal ASHP ≈ 2.5-3 kW electrical input continuous (~11-13 A on 230 V) — well within G98 Type A threshold for pure load. G99 only triggered by co-located generation (PV / BESS / V2G) or three-phase installs above 16 A per phase. Always consult the DNO at design stage — local practice varies',
      'Always G98 fast-track',
      'No DNO involvement',
    ],
    correctIndex: 1,
    explanation:
      'EREC G98 covers Type A small-scale generation (single-phase ≤16 A per phase OR three-phase ≤16 A per phase) — fast-track post-installation notification. G99 covers larger installs + generation. For a typical 8 kW thermal ASHP single-phase pure-load install: ~11-13 A running on 230 V; below the 16 A per phase G98 threshold for pure-load notification (many DNOs require notification of significant pure load too, via the Energy Networks Association heat pump notification process). G99 formal triggered by: co-located generation (PV + BESS + V2G); three-phase installs above 16 A per phase; large heat pumps (16+ kW thermal three-phase). UK 2025-26 reality: always consult the local DNO at design stage — some DNOs prefer notification of all heat pump installs regardless of current; some have streamlined heat pump portal forms. Cert evidence bundle records the DNO correspondence + reference number + the regulatory framework used.',
  },
  {
    id: 'm8s2-three-phase-threshold',
    question:
      'At what point does a heat pump install typically move to three-phase?',
    options: [
      'Always single-phase',
      'Single-phase economic limit: ~12-13 kW thermal output (corresponding to ~4-5 kW electrical input continuous, ~17-22 A on 230 V — close to the practical single-phase circuit + supply limits). Above this, three-phase becomes preferred: balanced 6-8 A per phase, smaller cable, less voltage drop, easier supply capacity. Three-phase heat pumps typical for 16+ kW thermal (large detached / agricultural / light commercial / GSHP higher loads)',
      'Always three-phase',
      '50 kW threshold',
    ],
    correctIndex: 1,
    explanation:
      'Single-phase economic limit for heat pumps: ~12-13 kW thermal output (~4-5 kW electrical input continuous, ~17-22 A on 230 V). Beyond this single-phase becomes uneconomic for cable + protective device + supply capacity reasons. Three-phase ASHP / GSHP typically begin at 16 kW thermal (Mitsubishi Ecodan three-phase, Daikin Altherma 3 H HT three-phase 16-19 kW, Vaillant aroTHERM Plus three-phase 18-25 kW). Three-phase advantages: balanced 6-8 A per phase, smaller cable, less voltage drop, easier supply capacity. UK 2025-26 most existing domestic supplies are single-phase only; three-phase ASHP install typically requires DNO upgrade (3-12 months typical lead time, £3-15k cost). Cert evidence bundle records: phase choice rationale + per-phase current + DNO correspondence + reference.',
  },
  {
    id: 'm8s2-dno-lead-times',
    question:
      'Typical UK 2025-26 DNO supply upgrade lead time for single-phase 100 A → three-phase?',
    options: [
      'Same day',
      '3-12 months typical depending on DNO area + complexity. Single-phase upgrade (100 A → 100 A enhanced cable) is faster (4-8 weeks typical). Three-phase upgrade (single-phase to three-phase 100 A) involves: customer application + DNO design + planning + outage scheduling + new cable install + new metering. London + south-east often longer due to capacity pressure. Cost £3-15k typical (free where the DNO determines existing capacity is inadequate for a reasonable demand — varies)',
      '5 years',
      'No upgrade ever',
    ],
    correctIndex: 1,
    explanation:
      'UK 2025-26 DNO supply upgrade lead times vary by area + complexity. Single-phase upgrade (100 A → 100 A enhanced or 80 A → 100 A): 4-8 weeks typical. Single-phase to three-phase upgrade: 3-12 months typical. London + south-east + capacity-constrained areas: longer end. Process: customer application via DNO portal (UK Power Networks, Western Power Distribution / National Grid Electricity Distribution, Northern Powergrid, SP Energy Networks, SSEN, Electricity NW) → DNO design + connection offer → customer accepts → outage scheduling → new cable / fuse / meter install → meter operator visit. Cost: £3-15k typical for three-phase upgrade; free in some cases where DNO determines existing capacity is inadequate for a reasonable demand. Cert evidence bundle records: DNO application date + reference + connection offer + completion date + new supply capacity + new metering details.',
  },
];

const quizQuestions = [
  {
    question:
      '4-bed semi-detached, existing 100 A single-phase supply, proposing 8 kW thermal ASHP. What is the supply assessment?',
    options: [
      'Need three-phase',
      'Existing 100 A single-phase capacity ~23 kW. Heat pump load: 8 kW thermal ≈ 2.5-3 kW electrical input continuous + 3 kW immersion (not coincident with compressor in normal control) + 200 W pumps + existing base load 5-7 kW (cooker + appliances + lighting). Peak with diversity ~10-12 kW — well within 23 kW supply capacity. DNO heat pump notification portal. No supply upgrade required. Typical scope for the dominant UK 2025-26 retrofit pattern',
      'Need 200 A',
      'No load calc',
    ],
    correctAnswer: 1,
    explanation:
      'Standard retrofit scenario. Existing 100 A single-phase = ~23 kW supply capacity. Heat pump load components (per Reg 311.1): (1) compressor 2.5-3 kW continuous; (2) immersion 3 kW (typically NOT coincident with compressor in normal control — boost cycle scheduled outside compressor operation); (3) circulation pumps 200 W coincident; (4) controls 100 W coincident; (5) existing site base load 5-7 kW (assessed via meter reading + customer interview). Peak with diversity: ~10-12 kW max demand — well within 23 kW capacity. DNO heat pump notification portal. No supply upgrade required. Dominant UK 2025-26 retrofit gas-swap pattern fits this profile. Cert evidence bundle records the max demand calc + diversity assumptions + DNO correspondence.',
  },
  {
    question:
      '5-bed detached with proposed 16 kW thermal ASHP + future EV + PV + BESS. Supply design?',
    options: [
      'Single-phase 100 A',
      'Three-phase 100 A required. 16 kW thermal ASHP ≈ 5-6 kW electrical input continuous (8-9 A per phase three-phase) + future 7 kW EV (10 A single-phase or 32 A three-phase if upgraded to 22 kW EV) + PV inverter ~3 kW + BESS 5-6 kW per phase peak discharge. Three-phase load profile: 25-30 A per phase peak; well within 100 A three-phase. Site is Chapter 82 PEI (Prosumer’s Electrical Installation). G99 formal application (co-located generation + larger heat pump)',
      'Two single-phase supplies',
      'Domestic 60 A',
    ],
    correctAnswer: 1,
    explanation:
      '5-bed detached with electrified heat + EV + PV + BESS is a Chapter 82 PEI (Prosumer’s Electrical Installation) site. Three-phase 100 A supply: 16 kW thermal ASHP ≈ 5-6 kW electrical input continuous (8-9 A per phase) + future 7 kW single-phase EV (10 A on L1 say) or 22 kW three-phase EV (32 A per phase) + PV inverter ~3 kW (1-1.5 A per phase generation) + BESS 5-6 kW per phase peak discharge. Peak three-phase load ~25-30 A per phase — well within 100 A three-phase capacity. G99 formal application: co-located generation (PV + BESS) + larger heat pump. Cert evidence bundle: three-phase max demand calc + EREC G99 application + DNO connection agreement + PEI Chapter 82 integration documentation. UK 2025-26 best-practice for new-build / major-refurb with full electrification.',
  },
  {
    question: 'A rural cottage with existing 60 A single-phase supply, 10 kW thermal ASHP proposed. Issue?',
    options: [
      'No issue',
      '60 A single-phase = ~14 kW supply capacity. Heat pump 10 kW thermal ≈ 3-3.5 kW electrical + 3 kW immersion (potentially coincident in boost cycles) + base load 4-6 kW (rural cottage typical) = 10-12 kW peak with diversity — close to / at the 14 kW supply limit. Supply upgrade to 100 A single-phase typically required (4-8 weeks DNO lead time + £1-3k). Alternative: smaller ASHP (7-8 kW thermal) + better insulation + heating-system optimisation',
      'Use 1 kW heat pump',
      'No supply needed',
    ],
    correctAnswer: 1,
    explanation:
      'Rural cottage with 60 A single-phase = ~14 kW supply capacity (older / smaller properties often 60 A). Heat pump 10 kW thermal load + base load = ~10-12 kW peak with diversity — close to / at supply limit; risk of nuisance tripping + voltage drop + supply complaint from DNO. Solutions: (1) upgrade supply to 100 A single-phase (typically 4-8 weeks + £1-3k); (2) downsize heat pump to 7-8 kW thermal + improve building fabric insulation to reduce heat loss; (3) hybrid heat pump with gas / oil backup for cold-peak demand. UK 2025-26 rural reality: existing supply assessment is critical early; many rural properties have older supplies inadequate for full electrification without upgrade. Cert evidence bundle records the assessment + DNO correspondence + the chosen solution.',
  },
  {
    question: 'DNO notification — who is responsible for it on a heat pump install?',
    options: [
      'Customer',
      'The MCS-certified installer company is contractually responsible for the customer-facing DNO interaction; the electrical installer (subcontracted scope) typically prepares the technical notification (load calc + supply assessment + reference + completion date). MCS company submits to the DNO portal. Joint responsibility in practice; clear scope-of-works at quote stage. UK 2025-26 most DNOs have a dedicated heat pump notification portal (e.g. UKPN heatpumpnotification.co.uk)',
      'Random',
      'No notification',
    ],
    correctAnswer: 1,
    explanation:
      'DNO notification responsibility: MCS-certified company is contractually customer-facing; electrical installer prepares the technical notification (load calc + supply assessment + reference + completion date) as a subcontract deliverable. MCS company submits to the DNO portal as part of the customer’s handover pack. Joint responsibility in practice — clear scope-of-works at quote stage avoids customer confusion. UK 2025-26 most DNOs have dedicated heat pump notification portals: UKPN heatpumpnotification.co.uk, NGED National Grid Electricity Distribution similar, Northern Powergrid + SP Energy Networks + SSEN + Electricity NW each have their own forms. Notification typically post-install (DNO heat pump portal — analogous to G98 fast-track) for pure load; pre-install (G99 formal) for co-located generation. Cert evidence bundle records the DNO submission + reference + DNO response + completion confirmation.',
  },
  {
    question: 'Diversity factor for compressor + immersion + circulation pumps — typical assumption?',
    options: [
      'Apply 100% to all',
      'Compressor + circulation pumps + controls: coincident (100%) — they all run together when heat pump is operating. Immersion backup: typically NOT coincident with compressor at design level — control strategy schedules immersion outside compressor running (boost cycles, legionella heat-up). Diversity for immersion: 0% in normal coincident max demand calc; 100% if the control allows simultaneous operation (some installs do; check the control logic). Conservative design assumes 100% if uncertain',
      'No diversity',
      'Always 50%',
    ],
    correctAnswer: 1,
    explanation:
      'Diversity factors for heat pump install max demand calc: (1) compressor + circulation pumps + controls — coincident (100%); they always run together when the heat pump is operating. (2) Immersion backup — design control strategy typically schedules immersion outside compressor running (boost cycles, legionella heat-up at off-peak hours); diversity often 0% in normal max demand calc (immersion does not coincide with compressor). BUT some installs allow simultaneous operation (e.g. boost cycle override during high demand); conservative design assumes 100% if control strategy uncertain. UK 2025-26 mature install practice: confirm the control strategy at design stage; document the diversity assumption in the cert evidence bundle. The IET / OSG guidance gives example diversity factors; designer judgement applies for the specific install context.',
  },
  {
    question: 'Heat-pump-ready supply upgrade — what does it mean for a customer planning a future heat pump?',
    options: [
      'Same as install',
      'Customer commits to heat pump direction; electrical installer upgrades the supply NOW (3-12 months ahead of heat pump install). Single-phase to three-phase upgrade, or 60 A to 100 A single-phase, depending on heat pump target. Includes: customer DNO application, outage scheduling, new metering, new CU + dedicated way reserved for heat pump. Customer pays the upgrade cost upfront; the heat pump install months later proceeds without DNO delay. Useful when DNO lead times threaten the customer’s heating-system timeline',
      'Not possible',
      'Same as solar',
    ],
    correctAnswer: 1,
    explanation:
      'Heat-pump-ready supply upgrade: customer commits to a heat pump direction; electrical installer upgrades the supply now, months before the heat pump install. Typical scenarios: (1) single-phase to three-phase upgrade for a future 16+ kW thermal ASHP; (2) 60 A to 100 A single-phase upgrade for an older rural property. Process: customer DNO application now; outage + new cable + new metering scheduled; new CU with dedicated way reserved for future heat pump (labelled "future heat pump"); cable terminated at junction box at future outdoor unit location (or coiled at CU if heat pump location not yet decided). When the heat pump arrives 3-12 months later, MCS company connects to the pre-installed termination. Useful when DNO lead times would otherwise delay the customer’s heating system. UK 2025-26 emerging electrical service offering. Cert evidence bundle: upgrade scope + the future heat pump model expected + the planned connection.',
  },
];

const faqs = [
  {
    question: 'How do I verify the existing supply capacity?',
    answer:
      'Read the cut-out fuse rating at the supply intake — single-phase 60 A / 80 A / 100 A / 125 A typical for UK domestic. Three-phase supplies labelled per phase. If unclear, check with the DNO via their supply enquiry portal (customer’s MPAN / address). For loaded supplies, use a clamp meter at the meter tails over a representative 24h period to capture peak vs nominal. Cert evidence bundle records the cut-out rating + measured peak (if applicable) + max demand calc.',
  },
  {
    question: 'What if the DNO won’t upgrade the supply?',
    answer:
      'Rare — DNOs are obliged to provide reasonable connections under licence conditions. But where capacity is constrained: (1) appeal via the DNO formal complaint process; (2) consider DLM (heat pump throttling) coordinated with EV charger DLM (M7.5 pattern) within existing supply; (3) downsize heat pump + improve building fabric; (4) hybrid system with gas / oil backup; (5) wait for DNO grid reinforcement. UK 2025-26 some areas have capacity pressure (Greater London + south-east); DNOs publishing capacity heatmaps.',
  },
  {
    question: 'EREC G98 / G99 — heat pumps are pure load not generation, so why notification?',
    answer:
      'G98 / G99 originally addressed small-scale generation, but DNOs have extended notification practice to significant pure load (heat pumps, EVs, electric showers) because aggregate load drives grid planning. Most DNOs have dedicated heat pump notification portals separate from G98 / G99 — these capture the load profile + location + timing for grid planning. Always notify even if pure load is technically below G98 threshold. Cert evidence bundle records the notification + reference.',
  },
  {
    question: 'Smart export / tariff implications?',
    answer:
      'A heat pump install without PV / BESS doesn’t change export — pure load. But many customers install heat pump alongside PV + BESS (chapter 82 PEI scenario). Smart Export Guarantee (SEG) tariff applies to PV / BESS export; heat pump operates within self-consumption + grid import. Heat pump tariff offers (Octopus Cosy, Heat Pump variant of Octopus Go) provide cheaper off-peak heat pump electricity windows — operationally relevant but not electrical install scope.',
  },
  {
    question: 'When does the supply assessment happen in the install sequence?',
    answer:
      'At quote stage — first survey visit. MCS-certified company + electrical subcontractor jointly assess the existing supply + cut-out rating + CU capacity + max demand + DNO requirements. Determines: any DNO upgrade required (timeline + cost), supply phase choice for the heat pump, CU change / sub-CU, cable routing. The supply assessment is the single biggest determinant of project timeline + cost. Cert evidence bundle starts here.',
  },
];

export default function RenewableEnergyModule8Section2() {
  const navigate = useNavigate();

  useSEO({
    title: 'Supply assessment + DNO notification | Renewable Energy 8.2 | Elec-Mate',
    description:
      'Heat pump supply assessment — max demand per Reg 311.1, diversity for compressor + immersion + pumps, EREC G98 / G99 + DNO heat pump notification portals, three-phase threshold, supply upgrade lead times, heat-pump-ready upgrade as staged service.',
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
            eyebrow="Module 8 · Section 2 · BS 7671:2018+A4:2026 · Reg 311.1 + Reg 314 + EREC G98 / G99"
            title="Supply assessment + DNO notification"
            description="Max demand per Reg 311.1, diversity considerations across compressor + immersion + circulation pumps + controls, DNO heat pump notification portals (per-phase ≤16 A analogous to G98) vs EREC G99 formal, three-phase threshold (~12-13 kW thermal), DNO heat pump notification portals, supply upgrade lead times + cost, heat-pump-ready supply upgrade as staged service."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 311.1 max demand calc drives the supply assessment. Sum continuous electrical inputs of each load × diversity per design context = peak coincident max demand.',
              'Typical UK domestic ASHP load components: compressor 1.5-4 kW continuous + immersion 3 kW (typically not coincident) + circulation pumps 100-300 W + controls 50-150 W + existing base load 5-7 kW. Peak ~10-12 kW with diversity.',
              '100 A single-phase supply ≈ 23 kW capacity — adequate for most typical UK domestic ASHP retrofit installs. 60 A older supplies (~14 kW) may require upgrade.',
              'EREC G98 = single-phase ≤16 A per phase fast-track post-install notification. G99 = larger / generation / three-phase >16 A per phase. Heat pump pure load usually fits G98 + DNO heat pump portal.',
              'Three-phase threshold for heat pumps: ~12-13 kW thermal (~4-5 kW electrical input). Above this, three-phase becomes economic. Most existing UK domestic is single-phase only — three-phase upgrade typically £3-15k + 3-12 months.',
              'DNO heat pump notification portals: UKPN heatpumpnotification.co.uk + similar for NGED, Northern Powergrid, SP Energy Networks, SSEN, Electricity NW. Notification responsibility joint between MCS company + electrical installer.',
              'Diversity assumptions: compressor + pumps + controls coincident (100%); immersion typically NOT coincident with compressor (control strategy schedules outside compressor running). Conservative if uncertain.',
              'Heat-pump-ready supply upgrade: emerging staged service. Upgrade now (3-12 months ahead) so DNO timeline does not delay the customer’s heating system timeline.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 311.1 max demand calc to a heat pump install: sum loads × diversity × existing base load → peak coincident max demand.',
              'Identify the diversity assumptions appropriate to compressor + immersion + circulation pumps + controls.',
              'Verify existing supply capacity from the cut-out rating + (where loaded) measured peak.',
              'Determine EREC G98 vs G99 vs DNO heat pump notification portal applicable to the install.',
              'Apply the three-phase threshold (~12-13 kW thermal) and recognise when three-phase upgrade is required.',
              'Estimate UK 2025-26 DNO supply upgrade lead times + costs by upgrade type.',
              'Document DNO notification + reference + completion in the cert evidence bundle.',
              'Offer heat-pump-ready supply upgrade as a staged service to manage DNO lead-time risk.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The supply assessment is the single biggest determinant of the project timeline + cost. Done badly at quote stage, it derails everything downstream.
          </Pullquote>

          <ContentEyebrow>Max demand per Reg 311.1 + diversity</ContentEyebrow>

          <ConceptBlock
            title="Max demand calc for a heat pump install"
            plainEnglish="Reg 311.1 max demand assessment: sum of rated continuous electrical inputs of each load × diversity per design context = peak coincident max demand. For a typical UK 2025-26 domestic ASHP: compressor + immersion + circulation pumps + controls + existing site base load."
            onSite="The max demand drives every downstream decision — supply phase + capacity, cable size, protective device curve, DNO involvement. Survey the existing site (cut-out rating + CU capacity + base-load reading) at quote stage; design the heat pump load components per manufacturer datasheet; apply diversity; deliver the peak coincident assessment in the cert evidence bundle."
          >
            <p>Load components + diversity assumptions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Compressor continuous
                  input</strong> — typically 1.5-4 kW for 5-12 kW thermal output (COP ~3).
                Use manufacturer rated input, NOT the COP-derived theoretical (real-world
                COP varies with conditions). Diversity: 100% coincident at peak
              </li>
              <li>
                <strong className="text-white">Compressor start-up
                  inrush</strong> — 3-8× running current for ~100-500 ms; drives
                protective device curve choice (C or D curve) but not max demand calc
              </li>
              <li>
                <strong className="text-white">Immersion backup</strong>
                — 3 kW typical. Control strategy normally schedules immersion OUTSIDE
                compressor running (boost cycles, legionella heat-up, fault fallback).
                Diversity: typically 0% in normal coincident calc; conservative 100% if
                control uncertain
              </li>
              <li>
                <strong className="text-white">Circulation pumps</strong> —
                primary + secondary; 100-300 W combined typical. Diversity: 100%
                coincident with compressor
              </li>
              <li>
                <strong className="text-white">Controls + sensors</strong>
                — thermostat + zone valves + OAT sensor + controller; 50-150 W
                combined. Diversity: 100% coincident
              </li>
              <li>
                <strong className="text-white">Existing site base
                  load</strong> — cooker + appliances + lighting; 5-7 kW typical for a
                4-bed domestic with moderate use. Verify via meter reading + customer
                interview. Diversity: per the existing site’s pattern
              </li>
              <li>
                <strong className="text-white">Future load
                  headroom</strong> — EV charger, PV / BESS export, additional
                electrification. Reserve capacity at the design stage if customer
                planning ahead. UK 2025-26 design horizon typically 5-10 years
              </li>
              <li>
                <strong className="text-white">Peak coincident max
                  demand</strong> — sum × diversity = typical 10-12 kW for a domestic
                ASHP install with no future EV / PV headroom. With future loads
                designed in, can exceed 20 kW — drives three-phase choice
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Existing supply capacity assessment"
            plainEnglish="Read the cut-out fuse rating at the supply intake — single-phase 60 A / 80 A / 100 A / 125 A typical for UK domestic. Three-phase supplies labelled per phase. If unclear, check with the DNO via their supply enquiry portal (using customer’s MPAN / address). For loaded supplies, use a clamp meter at the meter tails over a representative 24h period to capture peak vs nominal."
            onSite="The cut-out rating × voltage = supply capacity (single-phase 100 A × 230 V ≈ 23 kW; three-phase 100 A × 400 V × √3 ≈ 69 kW). Compare to max demand calc + existing base load + heat pump addition. Headroom = supply capacity − peak coincident max demand. Cert evidence bundle records: cut-out rating + measured peak (if loaded) + max demand calc + headroom verification."
          >
            <p>UK domestic supply tiers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Single-phase 60 A</strong>
                — older properties (pre-1970 frequently, some 1970s-80s). ~14 kW
                capacity. Often inadequate for modern heat pump retrofit; upgrade to
                100 A typically required
              </li>
              <li>
                <strong className="text-white">Single-phase 80 A</strong>
                — transitional; common in 1970s-90s installs. ~18 kW capacity. Marginal
                for some heat pump installs; upgrade often advisable for headroom
              </li>
              <li>
                <strong className="text-white">Single-phase 100 A</strong>
                — modern domestic standard (1990s-onwards). ~23 kW capacity. Adequate
                for most UK 2025-26 typical ASHP retrofit + base load with diversity
              </li>
              <li>
                <strong className="text-white">Single-phase 125 A</strong>
                — uncommon larger domestic. ~29 kW capacity. Suits large detached
                with electrified heat + EV (no PV / BESS export)
              </li>
              <li>
                <strong className="text-white">Three-phase 100 A per
                  phase</strong> — typical for properties with three-phase supply.
                ~69 kW capacity. Suits large detached with full electrification + PV +
                BESS + EV three-phase
              </li>
              <li>
                <strong className="text-white">Verification method</strong> —
                read cut-out fuse rating directly; or DNO supply enquiry portal; or
                clamp meter at meter tails over 24h for measured peak (only for loaded
                supplies)
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong>
                — cut-out rating photo + measured peak + max demand calc + headroom
                conclusion
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 311.1 — Max demand"
            clause="For economic and reliable design, the maximum demand of the installation, including current demand, shall be determined."
            meaning="Reg 311.1 mandates max demand determination as the foundation of every install design. For heat pump installs, the determination is the foundation of: supply assessment (existing supply adequate or upgrade required); cable sizing (continuous current carrying capacity per Appendix 4); protective device selection (rated current per the max demand); DNO involvement (notification threshold + upgrade lead time). The diversity factor applied reflects the design context — the IET / On-Site Guide gives example diversity factors for typical load profiles; designer judgement applies for the specific install. Cert evidence bundle records: each load + diversity assumption + total peak coincident max demand + existing supply capacity + headroom conclusion."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>EREC G98 / G99 + DNO heat pump notification</ContentEyebrow>

          <Pullquote>
            G98 + G99 originally addressed small-scale generation. DNOs now use them — plus dedicated heat pump portals — for significant pure load too. Aggregate load drives grid planning.
          </Pullquote>

          <ConceptBlock
            title="EREC G98 vs G99 for heat pump installs"
            plainEnglish="EREC G98 = single-phase ≤16 A per phase OR three-phase ≤16 A per phase — fast-track post-installation notification. EREC G99 = larger installs, generation, V2G, BESS — formal pre-installation application + DNO approval. Heat pumps are pure load (not generation), so the per-phase current is the primary criterion."
            onSite="For typical UK 2025-26 domestic ASHP single-phase pure-load (≤16 A per phase running current): DNO heat pump notification portal sufficient (analogous to G98 fast-track). Three-phase ASHP &gt;16 A per phase OR co-located generation (PV / BESS / V2G) triggers G99 formal application. Always consult the DNO at design stage — local interpretation varies."
          >
            <p>G98 / G99 decision factors for heat pump installs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">G98 Type A scope</strong> —
                single-phase ≤16 A per phase OR three-phase ≤16 A per phase. Fast-track
                post-installation notification (form filled by installer + sent to
                DNO)
              </li>
              <li>
                <strong className="text-white">G99 scope</strong> — anything
                above G98 Type A. Single-phase &gt;16 A, three-phase &gt;16 A per phase,
                any V2G, any export. Formal pre-installation application + DNO approval
                + connection agreement
              </li>
              <li>
                <strong className="text-white">Heat pump pure-load
                  case</strong> — typical single-phase ASHP runs at ~11-18 A; mostly
                within G98 threshold. DNO heat pump
                portal (most DNOs now have dedicated heat pump notification separate from
                G98 / G99)
              </li>
              <li>
                <strong className="text-white">Heat pump + co-located
                  generation case</strong> — heat pump + PV + BESS + V2G = generation
                present = G99 formal regardless of heat pump size. UK 2025-26 typical
                for new-build / major-refurb installs
              </li>
              <li>
                <strong className="text-white">DNO heat pump
                  portals</strong> — UKPN heatpumpnotification.co.uk; NGED / National
                Grid Electricity Distribution heat pump form; Northern Powergrid heat
                pump notification; SP Energy Networks; SSEN; Electricity NW. Each DNO
                has its own portal + form (separate from G98 / G99)
              </li>
              <li>
                <strong className="text-white">Lead times</strong> — G98
                notification: weeks (post-install). G99 formal: 6-18 weeks DNO design +
                offer + acceptance. DNO heat pump portal: typically 2-4 weeks
                acknowledgement
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — DNO submission + reference + acknowledgement +
                response + completion confirmation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Three-phase threshold for heat pump installs"
            plainEnglish="Single-phase heat pump install economic limit: ~12-13 kW thermal output (~4-5 kW electrical input continuous, ~17-22 A on 230 V — close to practical single-phase circuit + supply limits). Above this, three-phase becomes preferred: balanced 6-8 A per phase, smaller cable, less voltage drop, easier supply capacity."
            onSite="Three-phase heat pumps typically begin at 16 kW thermal. UK 2025-26 typical three-phase models: Mitsubishi Ecodan three-phase variant (typical 14-23 kW thermal); Daikin Altherma 3 H HT three-phase (14-19 kW); Vaillant aroTHERM Plus three-phase (12-25 kW); NIBE F2120 three-phase (12-20 kW). Most existing UK domestic supplies are single-phase only — three-phase upgrade typically required."
          >
            <p>Three-phase considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Single-phase economic
                  limit</strong> — ~12-13 kW thermal output (~4-5 kW electrical input
                continuous, ~17-22 A on 230 V running). Cable + protective device + supply
                capacity all push toward three-phase above this
              </li>
              <li>
                <strong className="text-white">Three-phase
                  advantages</strong> — balanced 6-8 A per phase running current; smaller
                cable for the same power; less voltage drop on long runs; easier
                supply capacity; supports larger units (16-30 kW thermal)
              </li>
              <li>
                <strong className="text-white">Three-phase
                  models</strong> — Mitsubishi Ecodan three-phase, Daikin Altherma 3 H HT
                three-phase, Vaillant aroTHERM Plus three-phase, NIBE F2120 three-phase
                + others. Manufacturer DoC confirms phase configuration + per-phase
                current
              </li>
              <li>
                <strong className="text-white">Existing supply
                  reality</strong> — most UK domestic supplies are single-phase only.
                Three-phase upgrade required for three-phase heat pump; typical 3-12
                months DNO lead time + £3-15k cost (UK 2025-26 indicative)
              </li>
              <li>
                <strong className="text-white">Decision point</strong> —
                heat pump 16+ kW thermal forces three-phase. Heat pump 12-16 kW thermal
                + future EV + PV + BESS is a strong case for proactive three-phase
                upgrade (even if not strictly required for heat pump alone)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — phase choice rationale + per-phase current + DNO
                correspondence + reference + upgrade scope + completion
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 314.1 — Division of installation"
            clause="Every installation shall be divided into circuits, as necessary, to avoid danger and minimise inconvenience in the event of a fault, to facilitate safe operation, inspection, testing and maintenance, and to take account of hazards that may arise from the failure of a single circuit such as a lighting circuit."
            meaning="Reg 314.1 frames the dedicated-circuit-per-heat-pump topology (mirroring M6 / M7 EV pattern). At install: dedicated final circuit from CU to outdoor unit via isolator; separate dedicated circuit for the immersion backup; controls wiring on its own low-voltage low-current run. The division supports: fault isolation (heat pump trip doesn’t take out the cooker); safe maintenance (electrician can isolate the heat pump independently); testing (per-circuit Reg 643 verification); inspection (EICR clear per-circuit results). Cert evidence bundle records per-circuit EIC + Schedule of Inspections + Schedule of Test Results."
          />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>DNO supply upgrade — lead times + practice</ContentEyebrow>

          <Pullquote>
            DNO lead times are the silent project killer. A great heat pump quote with a 9-month supply upgrade attached is not the same project as one on adequate existing supply.
          </Pullquote>

          <ConceptBlock
            title="UK 2025-26 DNO supply upgrade lead times + costs"
            plainEnglish="Single-phase upgrades (100 A → 100 A enhanced cable; 60 A or 80 A → 100 A): 4-8 weeks typical. Single-phase to three-phase upgrades: 3-12 months typical. London + south-east + capacity-constrained areas: longer end. Process: customer application → DNO design + connection offer → customer accepts → outage scheduling → new cable / fuse / metering install."
            onSite="UK 2025-26 DNO landscape: UK Power Networks (UKPN — London + south-east + east); National Grid Electricity Distribution (NGED — formerly Western Power Distribution; Midlands + south-west + south Wales); Northern Powergrid (north-east + Yorkshire); SP Energy Networks (north Wales + central Scotland + Merseyside); SSEN (Scottish Hydro Southern + central + south); Electricity NW (north-west)."
          >
            <p>Upgrade tiers + UK 2025-26 indicative timelines / costs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Cut-out fuse rating
                  swap</strong> — 60/80 A → 100 A single-phase (cable + cut-out adequate
                already). 2-4 weeks; £200-500. Quick win where the existing supply cable
                is adequate
              </li>
              <li>
                <strong className="text-white">Single-phase cable
                  upgrade</strong> — existing cable too small for higher capacity.
                Underground cable replacement. 4-8 weeks; £1-3k typical
              </li>
              <li>
                <strong className="text-white">Single-phase to three-phase
                  upgrade</strong> — full new three-phase service: new underground
                cable + new three-phase fuse + new three-phase meter. 3-12 months;
                £3-15k typical
              </li>
              <li>
                <strong className="text-white">Three-phase capacity
                  upgrade</strong> — existing three-phase to higher per-phase capacity
                (e.g. 60 A → 100 A per phase). 6-12 weeks; £1-5k
              </li>
              <li>
                <strong className="text-white">London + south-east
                  reality</strong> — capacity pressure in some areas; UKPN publishing
                capacity heatmaps. Lead times longer end
              </li>
              <li>
                <strong className="text-white">Free upgrades</strong> —
                where the DNO determines existing capacity is inadequate for a
                reasonable demand, upgrade may be free under licence conditions.
                Customer challenges the DNO’s connection offer to invoke this
              </li>
              <li>
                <strong className="text-white">Heat-pump-ready upgrade
                  pattern</strong> — staged service: upgrade the supply now (3-12 months
                ahead of heat pump install) to manage the DNO timeline risk
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — DNO application + reference + connection offer +
                completion confirmation + new supply capacity + new metering details
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Heat-pump-ready supply upgrade as a staged service"
            plainEnglish="Customer commits to heat pump direction. Electrical installer upgrades the supply NOW — 3-12 months ahead of the heat pump install. Customer pays the upgrade cost upfront; the heat pump install months later proceeds without DNO delay."
            onSite="UK 2025-26 emerging electrical service offering. Particularly useful where: DNO lead times are long (London / south-east); customer’s existing supply needs three-phase upgrade for the proposed heat pump; customer wants to stage the project budget (electrical infrastructure now, heat pump later); customer wants to lock in the heat pump direction before MCS company confirms install date."
          >
            <p>Heat-pump-ready upgrade scope:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">DNO application</strong> —
                customer’s own DNO portal submission for supply upgrade.
                Electrical installer assists with the technical content (load calc +
                reason for upgrade)
              </li>
              <li>
                <strong className="text-white">Supply
                  upgrade</strong> — DNO delivers new cable + new fuse + new meter (or
                meter operator follow-up visit) per the connection offer
              </li>
              <li>
                <strong className="text-white">New CU + dedicated
                  way</strong> — electrical installer fits new CU (or replaces existing)
                with dedicated way reserved for future heat pump. Way labelled "future
                heat pump"
              </li>
              <li>
                <strong className="text-white">Cable + isolator</strong>
                — outdoor cable run from CU to future outdoor unit location terminated
                at junction box; isolator installed at outdoor location. Indoor
                termination available for the MCS company’s install day
              </li>
              <li>
                <strong className="text-white">Customer-facing
                  cost</strong> — single quote covering supply upgrade + CU + cable +
                isolator. Typical 2025-26 cost £4-15k for a three-phase upgrade
                pattern; £1-3k for a single-phase upgrade pattern
              </li>
              <li>
                <strong className="text-white">Heat pump install day</strong>
                — MCS company connects to the pre-installed termination; refrigerant
                + hydraulic + commissioning per usual. Electrical scope reduces to
                second-fix + commissioning + EIC
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — Phase 1: supply upgrade EIC + DNO completion
                + isolator location + future heat pump model + planned connection;
                Phase 2: heat pump electrical commissioning EIC linked to the earlier
                upgrade
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Retrofit gas-swap — adequate existing supply, no DNO upgrade"
            situation="4-bed semi-detached. Existing 100 A single-phase supply (modern cut-out, 1990s install). Existing CU 12-way Wylex with 4 spare ways. MCS company quoting 9 kW Vaillant aroTHERM Plus R290 + 200 L unvented cylinder + radiator upgrade. Customer eligible for £7,500 Boiler Upgrade Scheme grant."
            whatToDo="Supply assessment (Reg 311.1): heat pump 9 kW thermal ≈ 3 kW electrical input continuous + 3 kW immersion (non-coincident; control schedules outside compressor) + 200 W pumps + 100 W controls + base load 5-7 kW (cooker + appliances + lighting + customer’s WFH IT setup) = ~9-11 kW peak coincident with diversity. 100 A single-phase capacity ~23 kW. Headroom ample. No DNO upgrade required. UKPN heat pump notification portal (DNO heat pump notification, analogous to G98 per-phase ≤16 A threshold). Dedicated circuit per Reg 314: 32 A Type A RCBO C-curve + 6 mm² T+E indoor + 10 mm² 3-core SWA outdoor + outdoor isolator (BS EN 60947-3). Immersion backup circuit: 16 A Type A RCBO + 30 mA additional protection per Reg 415.1. Customer experience: 1-day electrical scope (no DNO outage, no CU change). Heat pump install: 1-2 days for refrigerant + hydraulic + electrical second-fix + commissioning. Cert evidence bundle: supply assessment + DNO portal reference + per-circuit EIC + Schedule of Inspections + Schedule of Test Results. EIC delivered to MCS company for inclusion in handover pack."
            whyItMatters="This is the dominant UK 2025-26 retrofit pattern (~70% of installs). Supply assessment is straightforward when existing 100 A is adequate. DNO heat pump portal notification is quick (post-install). Project timeline driven by MCS company + customer availability, not by DNO. Cert evidence bundle is the deliverable to the MCS company; their handover pack to the customer includes the EIC + the F-Gas record + the sizing calc + the commissioning report."
          />

          <Scenario
            title="Three-phase upgrade — 5-bed detached + future full electrification"
            situation="5-bed detached. Existing 80 A single-phase supply. Customer + MCS company designing: 16 kW thermal Mitsubishi Ecodan three-phase ASHP + future 7 kW EV charger (futureproofed for 22 kW three-phase EV) + 6 kWp PV + 5 kWh BESS. UKPN area — south-east London. Customer prepared to wait for DNO."
            whatToDo="Supply assessment (Reg 311.1): heat pump 16 kW thermal ≈ 5-6 kW electrical input continuous (per-phase 8-9 A on three-phase) + future EV 22 kW (32 A per phase three-phase) + immersion 3 kW (single-phase, on L1) + base load 6-8 kW + PV / BESS generation contribution. Coincident peak on three-phase 100 A per phase: 25-30 A per phase well within capacity. Existing 80 A single-phase WHOLLY INADEQUATE — three-phase upgrade required. Customer DNO application via UKPN portal (formal three-phase upgrade — not heat pump portal alone). UKPN connection offer (typical 8-16 weeks lead time in this area); customer accepts; outage scheduled; new three-phase service cable + new three-phase fuse + new three-phase meter. Cost ~£5-12k typical (UK 2025-26 indicative; may be reduced if DNO determines existing capacity inadequate). Lead time: 4-9 months. Electrical scope: heat-pump-ready upgrade pattern — supply upgrade NOW, heat pump install on completion of DNO works. New three-phase CU + dedicated way for heat pump + dedicated way for future EV + dedicated way for PV inverter + dedicated way for BESS + spare ways for future expansion. PEI Chapter 82 framework + EREC G99 formal application (co-located generation present). Cert evidence bundle: phased — Phase 1 supply upgrade EIC + DNO completion + new CU; Phase 2 heat pump electrical commissioning EIC; Phase 3 PV + BESS commissioning EICs."
            whyItMatters="Three-phase upgrade is the most disruptive supply assessment scenario but the right design choice for full electrification. UK 2025-26 best-practice: identify the full electrified-load future at quote stage, design for the total, accept the DNO lead time. Heat-pump-ready staging lets the customer manage the budget + the disruption. Cert evidence bundle integrates Section 712 PV + Chapter 57 BESS + heat pump electrical scope + future EV under PEI Chapter 82 — the same integrated pattern as M7.5."
          />

          <CommonMistake
            title="Quoting heat pump install without checking existing supply"
            whatHappens="MCS company quotes heat pump install + customer signs contract. Electrical subcontractor arrives on install day, opens the CU, discovers existing 60 A single-phase supply totally inadequate. Heat pump install halted. Customer waits 6-12 weeks for DNO upgrade. Refrigerant Cat 1 person + heating engineer return visit fees. MCS company loses profit; customer loses trust."
            doInstead="Supply assessment at QUOTE stage. MCS company + electrical subcontractor jointly survey at first visit. Read cut-out rating. Verify existing supply capacity. Run max demand calc per Reg 311.1. Compare to heat pump + future loads. Identify DNO upgrade need at quote — bake into customer expectations + timeline + cost from day one. Cert evidence bundle starts here; quote reflects reality."
          />

          <CommonMistake
            title="Forgetting that immersion + compressor can coincide on some control strategies"
            whatHappens="Designer applies 0% diversity to immersion (assuming non-coincident with compressor) but the customer’s heat pump control allows immersion boost during compressor running for fast DHW recovery. Actual coincident load exceeds design. Nuisance MCB trip on the supply main; intermittent DHW issues; customer frustration."
            doInstead="Check the control strategy at design stage. Many heat pump controllers DO allow immersion boost during compressor running (manufacturer default may permit it; customer-configurable). Conservative design assumes 100% diversity for immersion if uncertain. Or specify the control configuration explicitly in the cert evidence bundle (immersion locked out during compressor running)."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 311.1 max demand calc drives the supply assessment for every heat pump install.',
              'Load components: compressor (1.5-4 kW continuous) + immersion (3 kW, typically non-coincident) + pumps (100-300 W) + controls (50-150 W) + existing base load (5-7 kW).',
              'Diversity assumptions: compressor + pumps + controls 100% coincident; immersion typically 0% (non-coincident) but check control strategy.',
              '100 A single-phase ≈ 23 kW capacity — adequate for most UK 2025-26 typical ASHP retrofit. 60 A older supplies (~14 kW) may require upgrade.',
              'DNO heat pump notification portal (per-phase ≤16 A analogous to G98). EREC G99 formal for co-located generation or larger installs. Most DNOs also have dedicated heat pump notification portals.',
              'Three-phase threshold for heat pumps: ~12-13 kW thermal (~4-5 kW electrical input). Above this, three-phase becomes economic.',
              'DNO upgrade lead times UK 2025-26: cut-out swap 2-4 weeks; single-phase cable 4-8 weeks; single-phase to three-phase 3-12 months; three-phase capacity 6-12 weeks.',
              'UK 2025-26 DNO landscape: UKPN, NGED, Northern Powergrid, SP Energy Networks, SSEN, Electricity NW. Each has its own heat pump notification portal + G98 / G99 process.',
              'Heat-pump-ready supply upgrade: stage the project by upgrading the supply now (3-12 months ahead of heat pump install) to manage DNO lead-time risk.',
              'Reg 314 division of installation drives dedicated-circuit-per-heat-pump topology (mirroring M6 / M7 EV pattern).',
              'Cert evidence bundle: cut-out rating + measured peak + max demand calc + diversity assumptions + headroom + DNO submission + reference + completion.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 2 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-1')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Heat pumps in the UK electrical context
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.3 Outdoor unit siting + thermal/cable protection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
