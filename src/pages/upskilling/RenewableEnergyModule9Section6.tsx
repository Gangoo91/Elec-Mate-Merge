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
    id: 'm9s6-commercial-chp-scale',
    question: 'Commercial CHP — what scale + UK 2025-26 deployment?',
    options: [
      'The same sub-50 kWe scale as micro-CHP, just sited in commercial rather than domestic buildings',
      'Roughly 10 kWe to 5 MWe, mostly natural gas, common in hospitals, leisure centres and hotels',
      'A niche technology rarely deployed commercially in the UK because the business case never stacks up',
      'Output above 5 MWe only, since smaller plant cannot be economically connected to the grid',
    ],
    correctIndex: 1,
    explanation:
      'Commercial CHP scale: 10 kWe-5 MWe electrical output is the UK 2025-26 commercial range. (1) 10-50 kWe — light commercial, larger residential blocks, smaller hotels / leisure facilities. May still fit MCS MIS 3007 if ≤50 kWe (borderline). (2) 50-500 kWe — mainstream commercial CHP. Hospitals, leisure centres, large hotels, breweries, food processing. (3) 500 kWe - 5 MWe — large commercial / industrial CHP. District heating schemes, large industrial sites, large agricultural / anaerobic digestion sites. Fuel: natural gas dominant (UK gas grid + economic); biogas (anaerobic digestion of organic waste — farms, landfill, sewage works); biofuel / bioliquid (specialist; less common); blended-hydrogen (HyDeploy trials + emerging). Customer types: hospitals (high simultaneous heat + electrical demand 24/7 — strong CHP fit), leisure centres + hotels (pool heating + facility electrical), large commercial buildings (district heating to multiple buildings), industrial process heat (food processing, breweries), agricultural (biogas-CHP at anaerobic digestion sites). UK 2025-26 deployment: substantial existing fleet (several thousand units across UK); new install pipeline focuses on biogas / hydrogen-blend / industrial-decarb projects. CHP value proposition strong where heat + electrical demand are both high + concurrent.',
  },
  {
    id: 'm9s6-erec-g99-commercial',
    question: 'Why does commercial CHP virtually always trigger EREC G99 formal application?',
    options: [
      'Because the gas supply, rather than the electrical output, sets which connection standard applies',
      'It does not — commercial CHP is notified after the event under the fast-track G98 route like small inverters',
      'No grid notification is needed, since on-site generation that displaces import never affects the network',
      'Its output exceeds the G98 16 A per phase threshold, so it needs the formal pre-installation G99 route',
    ],
    correctIndex: 3,
    explanation:
      'Commercial CHP triggers EREC G99 formal application. Reasons: (1) Output threshold — G98 Type A ≤16 A per phase = ~3.7 kWe single-phase OR ~11 kWe three-phase. Commercial CHP at 10 kWe + (most installs much larger) far exceeds. (2) Sustained export — commercial CHP often operates 6,000-8,000 hours / year (vs domestic micro-CHP 3,000-5,000 hours); higher grid impact. (3) Multi-source likely — site may co-locate PV + BESS + CHP; G99 covers aggregate. (4) Grid services revenue — commercial CHP often provides Firm Frequency Response (FFR) + Capacity Market services to National Grid (requires DNO + ESO awareness). G99 process: (a) customer + installer joint application to DNO via portal; (b) DNO design assessment (network capacity check, connection scheme, protection settings, anti-islanding spec); (c) DNO connection offer + price (may include reinforcement costs); (d) customer acceptance + payment where applicable; (e) outage scheduling for connection; (f) install per connection offer; (g) commissioning + DNO-witnessed anti-islanding test (Reg 551.7.5); (h) completion notification to DNO + meter operator visit. UK 2025-26 typical lead time: 12-26 weeks (longer for reinforcement-needed sites). Cost: £5-50k+ for the connection (varies hugely with capacity + site location). Cert evidence bundle: G99 reference + connection offer + DNO-witnessed test result + completion confirmation.',
  },
  {
    id: 'm9s6-biogas-anaerobic-digestion',
    question: 'Biogas-CHP from anaerobic digestion — what is the fuel + customer base?',
    options: [
      'Pure hydrogen produced by electrolysis, supplied mainly to industrial chemical plants',
      'Liquefied natural gas delivered by tanker, used at sites with no mains gas connection',
      'Methane-rich gas from anaerobic digestion of organic waste, burned in an IC engine',
      'Bottled propane blended with air, used only as a backup fuel when the mains gas fails',
    ],
    correctIndex: 2,
    explanation:
      'Biogas-CHP: anaerobic digestion (AD) → biogas → IC engine → generator + heat. Anaerobic digestion: organic waste (agricultural manure + crop residues, sewage sludge, food waste, dedicated energy crops like maize silage) digested by bacteria in oxygen-free environment → produces biogas (50-65% methane + 35-50% CO2 + small amounts of H2S + water vapour). Biogas typically used in two ways: (1) Direct combustion in IC engine driving generator (biogas-CHP); (2) Upgraded to biomethane (CO2 + impurities removed; methane content >95%) → injected to gas grid. UK 2025-26 biogas-CHP customer base: (1) Large farms — cattle + pig + crop waste; cooperative ventures common; typical install 100 kWe - 1 MWe. (2) Water utility sewage works — sewage sludge anaerobic digestion + biogas-CHP; Thames Water, Severn Trent, Anglian Water all have such sites; typical 500 kWe - 5 MWe. (3) Landfill sites — methane capture from decomposing waste + biogas-CHP; Viridor, Biffa, FCC Environment all operate such sites. (4) Food processing + brewing — food waste anaerobic digestion + biogas-CHP at large food sites. (5) Dedicated AD plants — purpose-built; farm-based or community-based. Section 551 applies fully: Reg 551.1.1(a) combustion engine; Reg 551.7.5 anti-islanding; Reg 551.7.2.1 supply-side connection; Reg 551.4.2 RCD multi-source. EREC G99 formal application typical. Cert evidence bundle: same Section 551 framework as natural-gas commercial CHP + biogas fuel handling considerations (Gas Safe / specialist competence for the gas side).',
  },
  {
    id: 'm9s6-grid-services',
    question: 'Commercial CHP grid-services revenue — what does it mean?',
    options: [
      'Beyond export payments, the CHP provides grid-balancing services (Firm Frequency Response, Dynamic Containment, Capacity Market) via an aggregator — a substantial extra revenue stream',
      'It refers to the energy retailer’s standing-charge rebate for sites that generate their own electricity',
      'There is no additional revenue; commercial CHP earns only the per-kWh export tariff like any small generator',
      'It is simply another name for the Smart Export Guarantee, with no separate balancing-services element',
    ],
    correctIndex: 0,
    explanation:
      'Commercial CHP grid-services revenue: substantial additional revenue stream beyond SEG (Smart Export Guarantee for exported energy). National Grid Electricity System Operator (NESO, formerly ESO) procures grid-balancing services from grid-connected generators including CHP: (1) Firm Frequency Response (FFR) — milliseconds-to-seconds frequency control; generator increases / decreases output rapidly to balance grid frequency variations; revenue £10-30k per MWe per year typical. (2) Dynamic Containment / Dynamic Moderation / Dynamic Regulation — newer faster-response frequency products; revenue per MW per hour. (3) Capacity Market — multi-year availability payments for generators committing to be available during system stress; auction-based; revenue £5-20k per MWe per year. (4) Balancing Mechanism — short-term operation adjustments procured by NESO; revenue per dispatched MWh. CHP suitable because: rapid response capability (IC engines start + ramp in seconds); existing grid connection; reliable operation. UK 2025-26 reality: commercial CHP grid-services revenue often 20-40% of total project revenue alongside heat + electrical generation. Aggregator partnership typical — third-party aggregator (e.g. Flexitricity, Limejump, KiWi Power, Open Energi) packages multiple CHPs to bid into NESO services. Requires Section 551 compliance + Reg 551.7.4 voltage/frequency capability + DNO + ESO coordination + sophisticated controls. Cert evidence bundle: aggregator contract + grid-services compliance documentation + Section 551.',
  },
];

const quizQuestions = [
  {
    question: 'Hospital install — 500 kWe natural gas CHP for combined heat + electrical demand. What scope?',
    options: [
      'A single-trade electrical job that one installer can complete and energise within a few days',
      'A purely mechanical project where the electrical work is limited to a final connection by others',
      'A simple plant swap needing no DNO involvement, since the existing 500 kVA supply already exists',
      'A major multi-trade project spanning CHP, heating, BS 7671, G99 liaison, Gas Safe and aggregator',
    ],
    correctAnswer: 3,
    explanation:
      'Hospital 500 kWe natural gas CHP is a major commercial project. Multi-trade delivery: (1) Commercial CHP specialist (Clarke Energy, Centrica Business Solutions, ENGIE, BHKW etc.) supplies + commissions engine + generator + controls. (2) Heating engineer integrates heat output with hospital LTHW (Low Temperature Hot Water) heating + DHW system; thermal store + heat exchangers; hydraulic balancing. (3) BS 7671 electrical installer scope: dedicated 500 kVA+ three-phase supply infrastructure; CHP electrical output to dedicated supply-side switchboard; Section 551 protective architecture; cable per Appendix 4 (three-phase 500 kWe at 400 V ≈ 720 A per phase — major cable + busbar infrastructure); HV / LV transformer if grid connection at higher voltage. (4) DNO liaison: EREC G99 formal application + connection upgrade typical (existing hospital LV supply may need uprating; HV connection alternative for larger installs); 12-26 month DNO process; £20-100k+ connection cost. (5) Aggregator partnership for grid-services revenue (FFR + Capacity Market + Balancing Mechanism). (6) Gas Safe + commercial gas supply (natural gas pipework + meter upgrade typical). (7) Maintenance contractor (annual service + spare parts; engine overhaul every 30-60,000 operating hours). Total project: £500k - £1.5m + 12-26 months. Electrical scope: £100-300k typical. Cert evidence bundle: Section 551 compliance + Reg 551.7.5 DNO-witnessed test + EREC G99 connection agreement + commercial CHP specialist commissioning + heat-network integration + Gas Safe + aggregator contract + grid-services compliance + BS 7671 EIC.',
  },
  {
    question: 'Reg 551.7.5 anti-islanding for commercial CHP — how is the DNO-witnessed test conducted?',
    options: [
      'The customer carries out the test themselves and emails the result to the DNO for filing',
      'A DNO engineer attends, simulates grid-loss and confirms the CHP disconnects within the limit',
      'It is performed automatically by the inverter at first energisation with no DNO attendance required',
      'The manufacturer’s factory test alone satisfies the requirement, so no on-site witnessing is needed',
    ],
    correctAnswer: 1,
    explanation:
      'DNO-witnessed anti-islanding test for commercial CHP (EREC G99 + Reg 551.7.5): (1) Scheduling — DNO engineer attends commissioning, typically by appointment after install complete + manufacturer commissioning done. Lead time 2-6 weeks typical UK 2025-26. (2) Pre-test verification — DNO engineer verifies CHP connection per the approved G99 connection offer; protection settings per DNO requirements; documentation in order. (3) Simulated grid-loss test — physically open the main supply isolator (or equivalent point per the connection scheme); observe CHP control system response. (4) Anti-islanding response observation — CHP must disconnect electrical output from grid within manufacturer-specified time (typical 200ms-1s per ENA EREC G99 specifications). DNO engineer measures + documents the actual time. (5) Verify no continued export — at the supply meter or via clamp meter; CHP must be electrically disconnected. (6) Restore grid — close main isolator. (7) Reconnect delay observation — CHP waits manufacturer-specified time (typical 1-3 minutes per G99 + relevant standards) before resuming export; ensures grid is stable. (8) DNO sign-off — engineer signs DNO acceptance form documenting test result; documents pass / fail + any conditions. (9) Some DNOs (UKPN, NGED) use third-party testing companies + sign-off based on the testing report. (10) Failed test consequences: connection not energised until remediation + re-test. Cert evidence bundle: DNO-witnessed test sign-off + time measurements + reconnect delay verification + G99 completion confirmation.',
  },
  {
    question: 'Heat-network integration for commercial CHP — what does it mean?',
    options: [
      'There is no heat integration; commercial CHP generates electricity only and the heat is simply vented',
      'The electrician designs and commissions the entire heat distribution system as part of the BS 7671 scope',
      'Tying the CHP heat output into the building heating via buffer store, heat exchanger and boilers',
      'Heat is only used to warm the engine room and plays no part in the building’s heating system',
    ],
    correctAnswer: 2,
    explanation:
      'Heat-network integration is a major part of commercial CHP install — heating engineer specialist scope, not BS 7671 electrician, but the electrical installer integrates the control signals. CHP heat output: typical 60-90 °C primary flow (lower for low-temperature CHP, higher for steam-cycle systems). Integration variants: (1) Buffer thermal store (typical 5,000 - 50,000 L for commercial; 100,000+ L for district heating) smooths CHP output vs demand; allows CHP to run at optimal capacity + bank heat for peak demand. (2) Heat exchanger interface to LTHW (Low Temperature Hot Water) central heating — separates CHP primary loop from building secondary loop; allows different temperature regimes + simpler maintenance. (3) Heat-network feed for district heating (multiple buildings sharing a single CHP) — substantial pipework infrastructure + customer-side substations; UK 2025-26 examples include large university campuses, hospital sites, urban regeneration projects. (4) Coordination with existing gas / oil boilers — CHP as primary; boilers supplement during peak demand OR backup during CHP outage. Electrical installer\'s role on heat-network: control signal wiring between CHP controller + heating-system controller + (often) building management system (BMS); typically Modbus / BACnet / similar field-bus protocols; low-current LV cabling. Cert evidence bundle: heat-network integration commissioning record (heating engineer\'s scope) + control signal wiring (electrical scope) + BMS integration verified.',
  },
  {
    question: 'Hydrogen-blend CHP — UK 2025-26 reality?',
    options: [
      'Predominantly trial scale — 20% blend tested via HyDeploy, but customer-site supply is rarely available',
      'Mainstream, with most new commercial CHP already running on a 20% hydrogen blend from the gas grid',
      'Mandatory from 2025, with all new natural-gas CHP required by law to be 100% hydrogen-capable',
      'Never deployed or tested anywhere in the UK; hydrogen for CHP remains purely a theoretical concept',
    ],
    correctAnswer: 0,
    explanation:
      'Hydrogen-blend CHP UK 2025-26 reality: predominantly trial scale + manufacturer marketing direction. (1) HyDeploy programme — UK industry consortium trial at Keele University (since 2019) + Winlaton near Gateshead (since 2021); 20% hydrogen blend in natural gas supplied to limited number of properties + verified safety + interoperability with existing gas appliances including CHP IC engines + boilers + cookers. Outcomes: 20% blend works safely with existing infrastructure + appliances; supports policy decision on hydrogen-blend rollout. (2) Hydrogen heating village trials — full hydrogen (100%) heating for full villages was proposed at Whitby (Cheshire) + Redcar; both cancelled / scaled back over public concerns + technical difficulties. (3) UK strategic decision on hydrogen for heating — deferred from original 2026 target; now later or possibly no widespread deployment for heating. Hydrogen direction stronger for industrial decarbonisation + transport + electricity grid balancing than for heating. (4) Commercial CHP manufacturers marketing hydrogen-ready capability: Clarke Energy + Centrica Business + ENGIE all offer engines tested for 20% blend; some tested for 100% hydrogen. Customer position: hydrogen-ready is future-proofing value; actual hydrogen supply at customer\'s site unlikely in current planning horizon. Cert evidence bundle documents hydrogen-ready capability + upgrade path + customer expectations.',
  },
  {
    question: 'Multi-source commercial site (PV + BESS + CHP + grid) — Section 551 + Chapter 82 implications?',
    options: [
      'No real implications; each source is wired independently and BS 7671 treats them as unrelated circuits',
      'Full Section 551 plus Chapter 82 prosumer integration, with RCD, anti-islanding and EMS all verified',
      'Only Chapter 82 applies, because the prosumer rules supersede Section 551 once a battery is present',
      'Only Section 551 applies, since Chapter 82 is reserved for utility-scale generation above 5 MWe',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-source commercial site: substantial Section 551 + Chapter 82 PEI (Prosumer\'s Electrical Installation) integration. Reg 826.x family covers PEI requirements. (1) Reg 551.4.2 RCD effectiveness — RCD architecture must remain effective for every intended combination of sources operating. Multi-source commercial site has many combinations (PV-only daytime, PV+BESS evening peak shaving, CHP base-load 24/7, CHP+PV daytime, all-sources peak demand) — each must trigger RCD correctly. Commissioning verification per combination. (2) Reg 551.7.5 anti-islanding — each source (PV inverter, BESS inverter, CHP controller) has its own anti-islanding device. DNO-witnessed test for the commercial site (covers aggregate plus per-source). (3) Reg 551.7.2.1 supply-side connection — each source on supply side of protective devices; typically at a dedicated supply-side switchboard / bus-tie arrangement. (4) Chapter 82 PEI integration — Reg 826.x covers source integration, protection-measure persistence, neutral handling in island mode (Reg 826.1.1.2.2 verbatim verified earlier). (5) EMS (Energy Management System) coordinates sources for site optimisation: PV peak shaving (use PV output to reduce daytime grid import); BESS time-shifting (charge from grid off-peak, discharge during peak); CHP base-load operation + grid-services revenue (FFR + Capacity Market); demand response participation. (6) Substantial controls + protection coordination — typically programmable logic controller (PLC) or building management system (BMS) coordinates sources via Modbus / BACnet field-bus. (7) Cert evidence bundle: Section 551 compliance + Chapter 82 PEI integration + Reg 551.4.2 multi-source RCD verification + per-source Reg 551.7.5 + EMS commissioning + DNO G99 reference. Covered in detail in M10.',
  },
  {
    question: 'Biogas-CHP at a sewage works — what makes it different?',
    options: [
      'Nothing of substance — sewage biogas behaves identically to mains natural gas at the engine',
      'It needs no fuel treatment, but the electrical scope is larger because of the wet environment',
      'Corrosive H2S, water and siloxanes mean fuel pre-treatment, a biogas-rated engine and a permit',
      'The only difference is that a sewage-works CHP exports to the grid rather than being used on site',
    ],
    correctAnswer: 2,
    explanation:
      'Biogas-CHP at sewage works has fuel-quality + permitting considerations beyond natural-gas CHP. (1) Biogas composition: 50-65% methane (combustible) + 35-50% CO2 (inert) + trace H2S (hydrogen sulphide — 50-500 ppm depending on feedstock; very corrosive + toxic at high concentrations) + trace water vapour + siloxanes (volatile silicon compounds from personal care products in sewage — combust into silica deposits damaging engine internals). (2) Fuel pre-treatment required: H2S scrubbing (iron oxide or activated carbon scrubbers); drying (water removal via cooling or adsorbent); siloxane removal (activated carbon specifically targeted). (3) Engine spec — biogas-rated IC engine (modified Otto cycle); higher-grade materials in combustion chamber + valve train to handle residual H2S + corrosion; oil change intervals tighter than natural gas; siloxane impacts engine life (typical 50% of natural-gas CHP engine lifetime — 30-50,000 hours vs 60,000+ hours). (4) Section 551 framework applies identically — Reg 551.1.1(a) combustion engine, Reg 551.7.5 anti-islanding, Reg 551.7.2.1 supply-side, Reg 551.4.2 multi-source RCD. (5) EREC G99 formal application (sewage works CHPs typically 500 kWe - 5 MWe). (6) Heat-network integration — heat output used on-site for anaerobic digester heating (digester operates at 35-40 °C mesophilic OR 50-55 °C thermophilic) + facility heating. (7) Environmental Permit — Industrial Emissions Directive (IED) compliance for emissions monitoring + reporting; Environment Agency permit. (8) UK examples: Thames Water Crossness sewage works (multiple MWe biogas-CHP); Severn Trent Minworth; Anglian Water Cotton Valley; many others. Cert evidence bundle: Section 551 + EREC G99 + Environment Agency permit + biogas-specific fuel handling commissioning + Industrial Emissions Directive compliance.',
  },
];

const faqs = [
  {
    question: 'Why is commercial CHP so different from micro-CHP electrically?',
    answer:
      'Scale + permit. Commercial CHP electrical output 10 kWe-5 MWe (vs micro-CHP ≤50 kWe); three-phase typical; substantial cable + busbar + transformer infrastructure; EREC G99 formal + DNO-witnessed test mandatory; Environment Agency permits (Industrial Emissions Directive for larger); commercial-CHP specialist competence beyond MCS MIS 3007; grid-services revenue via aggregator partnership. BS 7671 Section 551 framework identical but at much larger electrical scale.',
  },
  {
    question: 'What is the Industrial Emissions Directive + Medium Combustion Plant Directive?',
    answer:
      'IED (Industrial Emissions Directive 2010/75/EU, UK retained) + MCPD (Medium Combustion Plant Directive 2015/2193/EU, UK retained). Apply to combustion plants based on thermal input: small (<1 MWth) — Building Regs Part J only; medium (1-50 MWth) — MCPD permit (Environment Agency); large (>50 MWth) — IED permit. Most commercial CHP installs trigger MCPD. Emissions limits (NOx, SO2, particulate matter, CO) + monitoring + reporting. Not BS 7671 — environmental permitting framework; install-relevant for sizing + customer compliance.',
  },
  {
    question: 'EICR cycle for commercial CHP install?',
    answer:
      'BS 7671 EICR: 5-year typical commercial; some operators 3-year for high-utilisation sites. Commercial CHP-specific items: Section 551 compliance verification + Reg 551.7.5 anti-islanding re-test + multi-source RCD coordination + per-circuit per-source RCD trip-time + manufacturer service schedule (typically annual major service + 6-monthly minor) + DNO G99 ongoing compliance + aggregator service compliance + Environment Agency permit compliance. Substantial cert evidence bundle update each EICR cycle.',
  },
  {
    question: 'Aggregator partnership — what does it mean practically?',
    answer:
      'Third-party aggregator (e.g. Flexitricity, Limejump, KiWi Power, Open Energi, EDF Powershift) packages multiple distributed generators (CHP, BESS, demand response loads) to bid into National Grid ESO services (FFR, Dynamic Containment, Capacity Market, Balancing Mechanism). Customer signs contract with aggregator; CHP available for dispatch per contract terms; aggregator coordinates with NESO. Revenue split between customer + aggregator. UK 2025-26 mature aggregator market; substantial commercial-CHP grid-services revenue.',
  },
  {
    question: 'What about BS EN 50549 + ENA EREC G99 versions?',
    answer:
      'BS EN 50549-1:2019 + amendments: power generators connected to LV networks (≤1 kV). BS EN 50549-2:2019 + amendments: power generators connected to MV networks (>1 kV ≤35 kV). ENA EREC G99 references both standards. UK 2025-26 current version: G99 Issue 2 (10 March 2025), which supersedes Issue 1 and its amendments. Manufacturer DoC declares conformity. DNO connection design + protection settings per G99 + BS EN 50549. EREC G98 covers ≤16 A small generators; ≥G99 for everything above. G100 covers export-limited connections (M10).',
  },
];

export default function RenewableEnergyModule9Section6() {
  const navigate = useNavigate();

  useSEO({
    title: 'Commercial CHP + biofuel / biogas / hydrogen variants | Renewable Energy 9.6 | Elec-Mate',
    description:
      'Commercial CHP scale 10 kWe - 5 MWe. Natural gas dominant + biogas (anaerobic digestion) + biofuel + hydrogen-blend variants. BS 7671 Section 551 + Reg 551.7.5 anti-islanding (DNO-witnessed test) + Reg 551.7.2.1 supply-side + EREC G99 formal + Chapter 82 PEI multi-source + grid-services revenue + heat-network integration + Environment Agency permits.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-9')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 9
          </button>

          <PageHero
            eyebrow="Module 9 · Section 6 · BS 7671:2018+A4:2026 · Section 551 + Reg 551.7.5 + EREC G99 + BS EN 50549"
            title="Commercial CHP + biofuel / biogas / hydrogen variants"
            description="Commercial CHP scale 10 kWe - 5 MWe. Natural gas dominant + biogas (anaerobic digestion) + biofuel + hydrogen-blend variants. BS 7671 Section 551 + Reg 551.7.5 anti-islanding (DNO-witnessed test) + Reg 551.7.2.1 supply-side + Reg 551.4.2 multi-source RCD + EREC G99 formal + Chapter 82 PEI integration + grid-services revenue + heat-network integration + Environment Agency permits."
            tone="yellow"
          />

          <TLDR
            points={[
              'Commercial CHP: 10 kWe - 5 MWe electrical output. UK 2025-26 widespread in hospitals, leisure centres, hotels, large commercial, district heating, food processing, breweries, large agricultural sites.',
              'Fuel variants: natural gas dominant; biogas (anaerobic digestion of farm / sewage / food waste); biofuel / bioliquid (specialist); hydrogen-blend (HyDeploy trials + emerging).',
              'EREC G99 formal application mandatory + DNO-witnessed anti-islanding test (Reg 551.7.5). Lead time 12-26 weeks; cost £20-100k+ connection upgrade + £500-800k typical electrical install scope.',
              'Section 551 framework applies fully: Reg 551.1.1(a) combustion engine, Reg 551.7.5 anti-islanding, Reg 551.7.2.1 supply-side, Reg 551.4.2 multi-source RCD effectiveness.',
              'Heat-network integration: buffer thermal store + heat exchanger interface + LTHW central heating + multi-building district heating. Heating engineer specialist scope; electrical installer integrates control signals (Modbus / BACnet / BMS).',
              'Grid-services revenue: FFR, Dynamic Containment, Capacity Market, Balancing Mechanism via aggregator partnership. £10-50k+ per MWe per year additional revenue typical.',
              'Multi-source commercial site (PV + BESS + CHP + grid): Section 551 + Chapter 82 PEI integration; EMS coordinates sources; Reg 551.4.2 verification across combinations.',
              'Environment permits: Medium Combustion Plant Directive (1-50 MWth) typical; Industrial Emissions Directive (>50 MWth). Environment Agency permit + emissions monitoring.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Position commercial CHP scale 10 kWe - 5 MWe + UK 2025-26 deployment landscape.',
              'Distinguish fuel variants: natural gas, biogas (AD), biofuel, hydrogen-blend.',
              'Apply Section 551 framework at commercial scale: Reg 551.1.1 + 551.7.5 + 551.7.2.1 + 551.4.2.',
              'Manage EREC G99 formal application + DNO-witnessed anti-islanding test.',
              'Coordinate heat-network integration with heating engineer scope.',
              'Integrate grid-services revenue via aggregator partnership.',
              'Apply Chapter 82 PEI framework on multi-source commercial sites.',
              'Recognise Environment Agency permits (MCPD + IED) for medium / large combustion plant.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Commercial CHP is a multi-million-pound infrastructure project with electrical install inside. Section 551 + heat-network + grid-services + permits all stack — each layer is mandatory.
          </Pullquote>

          <ContentEyebrow>Commercial CHP scale + fuel variants</ContentEyebrow>

          <ConceptBlock
            title="Commercial CHP scale + UK 2025-26 deployment"
            plainEnglish="Commercial CHP: 10 kWe - 5 MWe electrical output. Different from micro-CHP (≤50 kWe) by scale + electrical infrastructure + permitting + competence. UK 2025-26 substantial existing fleet + ongoing new install pipeline."
            onSite="Customer types where CHP economic case is strongest: hospitals, leisure centres + pools, hotels, large commercial buildings, district heating schemes, food processing, breweries, large agricultural sites. Common factor: high simultaneous heat + electrical demand 24/7 → high CHP utilisation → strong combined-efficiency value."
          >
            <p>Commercial CHP scale tiers:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">10-50 kWe — light
                  commercial</strong> — larger residential blocks, small hotels,
                community buildings. Borderline with MCS MIS 3007 micro-CHP. Three-phase
                typical
              </li>
              <li>
                <strong className="text-white">50-500 kWe —
                  mainstream commercial</strong> — hospitals (~100-500 kWe typical),
                leisure centres (~50-200 kWe), large hotels (~100-300 kWe), breweries,
                food processing
              </li>
              <li>
                <strong className="text-white">500 kWe - 5 MWe —
                  large commercial / industrial</strong> — district heating schemes
                (university campuses, hospital sites, urban regeneration),
                anaerobic digestion sites, sewage works, large industrial process heat
              </li>
              <li>
                <strong className="text-white">UK 2025-26 customer
                  types</strong> — hospitals (24/7 heat + electrical demand; high
                utilisation; resilience value); leisure centres (pool heating constant
                + facility electrical); hotels (heat demand 6-12 months / year + 24/7
                electrical); food processing (process heat + electrical);
                breweries; large agricultural (biogas-CHP)
              </li>
              <li>
                <strong className="text-white">Fleet size</strong>
                — UK 2025-26 several thousand commercial CHPs operational.
                Combined output 1-2 GWe (significant fraction of UK generation
                capacity)
              </li>
              <li>
                <strong className="text-white">New install
                  pipeline</strong> — focus on biogas / hydrogen-blend / industrial
                decarbonisation projects vs natural-gas baseline
              </li>
              <li>
                <strong className="text-white">Project economics</strong>
                — capex £500k-£3M+ per MWe; payback 5-10 years with grid services
                revenue + heat sales; 15-20 year operational life
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — substantial cross-trade record: Section 551 +
                EREC G99 + Environment Agency permit + manufacturer commissioning +
                heat-network integration + grid-services compliance
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Fuel variants: natural gas, biogas, biofuel, hydrogen-blend"
            plainEnglish="Commercial CHP fuel options: natural gas dominant (UK gas grid + economic); biogas from anaerobic digestion (farms, sewage, food waste, landfill); biofuel / bioliquid (specialist applications); hydrogen-blend (trial scale; emerging). Each fuel has specific install + permitting + engine considerations."
            onSite="Most commercial CHP is natural gas. Biogas is the second-largest segment (UK 2025-26 substantial AD-based CHP fleet). Biofuel rare. Hydrogen-blend predominantly trial / future-proofing. Fuel choice drives engine spec + permitting + supply infrastructure."
          >
            <p>Fuel variant details:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Natural gas
                  CHP</strong> — UK dominant. Gas grid supply via meter upgrade
                (typically dedicated commercial meter); Gas Safe install + commissioning;
                engine spec standard. Environment Agency MCPD permit (1-50 MWth)
              </li>
              <li>
                <strong className="text-white">Biogas CHP from
                  anaerobic digestion</strong> — 50-65% methane + 35-50% CO2 + trace
                H2S + water vapour + siloxanes. Pre-treatment (H2S scrubbing + drying +
                siloxane removal) mandatory; engine spec biogas-rated; reduced engine
                life vs natural gas; Environment Agency permit
              </li>
              <li>
                <strong className="text-white">Biogas sources</strong>
                — agricultural (cattle + crop waste); sewage works (sludge digestion);
                food processing (food waste); landfill (methane capture); dedicated
                AD plants
              </li>
              <li>
                <strong className="text-white">Biofuel /
                  bioliquid CHP</strong> — vegetable oil, biodiesel, palm oil-derived
                fuels. Specialist installs; less common UK 2025-26; sustainability
                certification (RED II) requirement
              </li>
              <li>
                <strong className="text-white">Hydrogen-blend
                  CHP</strong> — 20% blend tested in HyDeploy programme. Manufacturer-tested
                + verified safe with existing engines (Clarke Energy, Centrica, ENGIE
                + others have hydrogen-ready engines). Customer\'s gas supply unlikely
                to be hydrogen-blended currently — future-proofing value
              </li>
              <li>
                <strong className="text-white">100% hydrogen
                  CHP</strong> — emerging; some manufacturers have tested engines on
                pure hydrogen; very limited deployment; supply infrastructure
                question
              </li>
              <li>
                <strong className="text-white">Engine spec per
                  fuel</strong> — manufacturer DoC declares fuel compatibility +
                emission limits + service interval per fuel. Fuel switching may
                require engine reconfiguration / replacement parts
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — fuel supply spec + engine fuel compatibility DoC +
                Gas Safe (where applicable) + Environment Agency permit + Industrial
                Emissions / MCPD compliance documentation
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.5 — DNO-witnessed anti-islanding for commercial CHP"
            clause="Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4."
            meaning="Commercial CHP Reg 551.7.5 compliance is verified at commissioning via DNO-witnessed anti-islanding test per EREC G99. DNO engineer attends commissioning (scheduled 2-6 weeks lead time); coordinates with installer + manufacturer commissioner. Test sequence: (1) Verify CHP connection per approved G99 connection offer; protection settings per DNO requirements; documentation in order. (2) Simulated grid-loss — open main supply isolator. (3) Anti-islanding observation — CHP disconnects within manufacturer-specified time (200ms-1s per G99 + BS EN 50549); DNO documents actual time measurement. (4) Verify no continued export at supply meter or via clamp meter. (5) Restore grid — close main isolator. (6) Reconnect delay verification — CHP waits 1-3 min before resuming export. (7) DNO sign-off form documenting result; pass / fail + any conditions. Failed test consequence: connection not energised until remediation + re-test. Cert evidence bundle: DNO-witnessed test sign-off + time measurements + reconnect delay verification + G99 completion confirmation. Substantial commercial-CHP-specific commissioning compared to domestic micro-CHP."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Heat-network, grid-services, multi-source integration</ContentEyebrow>

          <Pullquote>
            The combined-efficiency value of CHP only works if both heat and electricity find use. Heat-network integration + grid-services revenue + multi-source EMS are what make commercial CHP economic.
          </Pullquote>

          <ConceptBlock
            title="Heat-network integration + control signals"
            plainEnglish="CHP heat output (60-90 °C primary flow) integrated with customer\'s heat distribution. Buffer thermal store smooths output vs demand; heat exchanger interface to LTHW; district heating across multiple buildings; coordination with existing boilers. Heating engineer specialist scope; electrical installer integrates the control signals."
            onSite="Typical control signal infrastructure: Modbus / BACnet / similar field-bus protocol between CHP controller + heating controller + building management system (BMS). Low-current LV cabling; dedicated controls way at CU. BS 7671 framework applies to controls cabling."
          >
            <p>Heat-network integration patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Buffer thermal
                  store</strong> — 5,000-50,000 L typical commercial; 100,000+ L for
                district heating. Smooths CHP output vs demand. CHP runs at optimal
                capacity + banks heat for peak demand
              </li>
              <li>
                <strong className="text-white">Heat exchanger
                  interface</strong> — separates CHP primary loop from building
                secondary loop. Different temperature regimes; simpler maintenance
                (CHP primary maintenance doesn\'t require draining building
                heating)
              </li>
              <li>
                <strong className="text-white">LTHW central
                  heating</strong> — Low Temperature Hot Water (typically 70-80 °C
                flow / 50-60 °C return). UK 2025-26 commercial buildings standard
              </li>
              <li>
                <strong className="text-white">District heating</strong>
                — multiple buildings sharing CHP via insulated underground pipework.
                UK 2025-26 examples: university campuses (UCL, Birmingham), hospital
                sites (NHS Trust campus heating), urban regeneration (London
                Olympic Park, Manchester Civic Centre)
              </li>
              <li>
                <strong className="text-white">Boiler
                  coordination</strong> — CHP as primary (base-load); existing gas /
                oil / electric boilers supplement during peak demand OR backup during
                CHP outage. Smart sequencing controls
              </li>
              <li>
                <strong className="text-white">Customer-side
                  substations</strong> — for district heating: each consumer building
                has a substation (heat exchanger + flow + return meters + controls)
                taking heat from network
              </li>
              <li>
                <strong className="text-white">Control signal
                  scope</strong> — CHP controller ↔ heating controller ↔ BMS via
                Modbus / BACnet field-bus. Low-current LV cabling. BS 7671 framework:
                Reg 314 dedicated controls way + Reg 415.1 RCD + Reg 522.2.1 cable
                thermal (cable near hot pipework)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — heat-network commissioning record (heating engineer)
                + control signal wiring (electrical scope) + BMS integration verified
                + customer-side substation electrical commissioning per substation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Grid-services revenue + aggregator partnership"
            plainEnglish="Commercial CHP can provide grid-balancing services to National Grid ESO: Firm Frequency Response, Dynamic Containment, Capacity Market, Balancing Mechanism. Substantial additional revenue (£10-50k+ per MWe per year). Aggregator partnership typical."
            onSite="UK 2025-26 mature aggregator market: Flexitricity, Limejump, KiWi Power, Open Energi, EDF Powershift etc. Aggregator packages multiple distributed generators to bid into NESO services. Customer signs aggregator contract; CHP available for dispatch per contract terms; revenue split."
          >
            <p>Grid-services revenue components:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Smart Export
                  Guarantee (SEG)</strong> — UK Government tariff for renewable /
                low-carbon electricity export. Applies to CHP. Tariff rates vary by
                supplier (4-15p / kWh exported). Covered M10
              </li>
              <li>
                <strong className="text-white">Firm Frequency
                  Response (FFR)</strong> — milliseconds-to-seconds frequency control;
                CHP rapidly increases / decreases output to balance grid frequency.
                Revenue £10-30k per MWe per year typical. NESO procures via auction
              </li>
              <li>
                <strong className="text-white">Dynamic
                  Containment / Dynamic Moderation / Dynamic Regulation</strong>
                — newer faster-response frequency products (post-2020). Revenue per
                MW per hour. Growing market share vs FFR
              </li>
              <li>
                <strong className="text-white">Capacity Market</strong>
                — multi-year availability payments (4-15 years contract typical) for
                generators committing to be available during system stress. Auction-based.
                Revenue £5-20k per MWe per year typical
              </li>
              <li>
                <strong className="text-white">Balancing
                  Mechanism</strong> — short-term operation adjustments procured by
                NESO during real-time grid operation. Revenue per dispatched MWh.
                Suits flexible CHPs
              </li>
              <li>
                <strong className="text-white">Aggregator
                  function</strong> — packages multiple distributed generators (CHPs,
                BESS, demand response loads, EV charging clusters) to bid into NESO
                services. Customer signs aggregator contract; aggregator coordinates
                with NESO; revenue split between customer + aggregator
              </li>
              <li>
                <strong className="text-white">Reg 551.7.4
                  capability</strong> — generator must meet voltage / frequency
                response requirements per ENA EREC G99 + grid-services contract.
                Typically integrated into CHP control electronics + aggregator
                coordination layer
              </li>
              <li>
                <strong className="text-white">UK 2025-26
                  reality</strong> — commercial CHP grid-services revenue often 20-40%
                of total project revenue alongside heat + electrical generation.
                Substantial economic driver
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — aggregator contract + grid-services compliance
                documentation + Section 551 + Reg 551.7.4 capability verification
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.4.2 — Multi-source RCD effectiveness at commercial scale"
            clause="The generating set shall be connected so that any provision within the installation for protection by RCDs in accordance with Chapter 41 remains effective for every intended combination of sources of supply. NOTE: Connection of live parts of the generator with Earth may affect the protective measure."
            meaning="Reg 551.4.2 is a major commissioning challenge on multi-source commercial sites. Modern hospital / leisure / commercial sites often have PV + BESS + CHP + grid simultaneously. Four sources; ~15 combinations of one-or-more-active. RCD architecture must remain effective across every combination. Architecture: (1) per-source RCD on each generator supply (typically 30 mA Type A or B per manufacturer DoC); (2) central RCD architecture (main RCD + per-circuit RCBOs) coordinates with per-source RCDs; (3) Reg 531.3.6 discrimination across the tiers. Commissioning verification: (1) Test each source individually; (2) Test each pair; (3) Test combinations; (4) Induce sample fault under each + verify trip. For commercial scale: detailed test plan + record per combination; substantial Reg 551.4.2 evidence in the cert bundle. Connection of live parts to Earth (per the NOTE) affects RCD operation — earthing system design + verification critical. Cert evidence bundle: RCD architecture diagram + per-combination commissioning test result + Reg 551.4.2 compliance verified."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="NHS hospital — 500 kWe natural gas CHP with grid services + district heating"
            situation="Acute NHS hospital. 24/7 high heat + electrical demand. Existing electric grid supply 500 kVA three-phase; gas supply already adequate. Customer goal: reduce carbon footprint + energy cost + create resilience for critical loads + open grid-services revenue stream. Project: 500 kWe natural gas CHP + integration with existing LTHW heating + DHW + district heating expansion to outpatient buildings."
            whatToDo="Major multi-trade commercial project. (1) Commercial CHP specialist (Clarke Energy / Centrica / ENGIE typical UK 2025-26) supplies + commissions Jenbacher / Caterpillar / MAN engine + generator + controls. (2) Heating engineer integrates CHP heat output with hospital LTHW + DHW + district heating; buffer thermal store 30,000 L; heat exchanger interfaces; balance with existing gas boilers (now supplementary). (3) BS 7671 electrical installer: dedicated supply-side LV switchboard for CHP electrical output; cable infrastructure (500 kWe @ 400 V three-phase = ~720 A per phase — substantial busbar / cable); HV connection alternative considered (transformer + 11 kV connection saves LV cable but adds transformer cost). Section 551 architecture: per-source 800 A protective device + dedicated supply-side connection per Reg 551.7.2.1; Reg 551.4.2 RCD architecture across grid + CHP + (any future PV / BESS). (4) DNO engagement: EREC G99 formal application from project start; DNO design + connection offer + 16-week lead time; connection upgrade modest (existing 500 kVA supply adequate; protection settings + meter upgrade required); DNO-witnessed Reg 551.7.5 anti-islanding test at commissioning. (5) Aggregator partnership: Flexitricity (typical) contract for FFR + Capacity Market participation; aggregator coordinates dispatch; substantial revenue (~£300-500k / year from grid services alone). (6) Environment Agency: MCPD permit (500 kWe @ ~35% electrical efficiency = ~1.4 MWth — within MCPD scope); emissions monitoring + reporting infrastructure. (7) Gas Safe: commercial natural gas supply commissioning; gas pipework + meter upgrade. (8) Maintenance contract: annual major service (~£15-25k) + 6-monthly minor; engine overhaul every 50,000 operating hours (~£50-80k). Cert evidence bundle: full multi-trade record + Section 551 + EREC G99 + DNO-witnessed test + Environment Agency permit + heat-network commissioning + aggregator contract + electrical EIC. Total project: £1.0-1.5M capex; 5-7 year payback (including grid services); 15-20 year operational life. Annual benefit: ~£400-600k (electricity self-generation savings + heat displacement + grid services revenue) - ~£100-150k (fuel + maintenance + permit) = net £300-450k / year."
            whyItMatters="Hospital CHP is the canonical UK 2025-26 commercial CHP use case — high simultaneous heat + electrical demand 24/7, resilience value for critical loads, grid-services revenue compatible with NHS budget cycles, district heating expansion creates wider value. Cert evidence bundle is substantial + integrates BS 7671 electrical with multiple specialist scopes. Project timeline 12-24 months reflects the multi-trade + multi-permit + DNO process complexity."
          />

          <Scenario
            title="Dairy farm AD-CHP — biogas from cattle manure"
            situation="500-cow dairy farm in Yorkshire. Anaerobic digester producing biogas from cattle slurry + crop residues. 200 kWe biogas-CHP to convert biogas to electricity + heat (used to heat AD digester + farmhouse + outbuildings). Farm has existing three-phase 100 A supply (inadequate for export of 200 kWe; supply upgrade or HV connection needed)."
            whatToDo="Multi-trade rural biogas-CHP project. (1) AD specialist constructs digester (concrete tank + agitation + heat exchanger + biogas storage); biogas pre-treatment plant (H2S scrubber + drying + siloxane removal). (2) Commercial biogas-CHP specialist supplies + commissions biogas-rated IC engine (typical brands: 2G Energy, INNIO Jenbacher J-208 biogas variant, Edina). (3) Heating engineer integrates CHP heat output with AD digester heating (35-40 °C mesophilic operation) + farmhouse + outbuildings. (4) BS 7671 electrical installer: dedicated supply-side connection per Reg 551.7.2.1; cable infrastructure (200 kWe @ 400 V three-phase = ~290 A per phase); per-source protective device + Section 551 architecture. (5) DNO upgrade: EREC G99 formal application — substantial export (200 kWe > 100 A supply capacity); HV connection likely (11 kV from nearest substation) with on-site transformer; lead time 20-30 weeks + connection cost £40-100k. DNO-witnessed Reg 551.7.5 test at commissioning. (6) Environment Agency: MCPD permit (200 kWe at ~35% electrical efficiency = ~570 kWth — within MCPD scope); permit covers biogas-specific emissions. (7) Aggregator: smaller-scale grid-services revenue (~£30-60k / year). (8) Maintenance: biogas engine has shorter service interval than natural gas due to H2S + siloxanes — annual major service + quarterly minor; engine overhaul every 30,000-40,000 hours (vs 60,000+ for natural gas). Cert evidence bundle: BS 7671 EIC + Section 551 + Reg 551.7.5 DNO-witnessed + EREC G99 + Environment Agency permit + biogas fuel handling commissioning + AD specialist commissioning + heating engineer integration + aggregator contract. Total project: £600k-£1M capex (AD + CHP + grid + integration); 6-10 year payback (electricity self-generation + heat displacement + Renewable Heat Incentive legacy or current biogas grant + grid services). 20+ year operational life."
            whyItMatters="Biogas-CHP at agricultural / sewage / food waste sites is a major UK 2025-26 commercial CHP segment. Substantial existing fleet (several hundred sites). Section 551 framework + EREC G99 + DNO-witnessed test apply identically to natural-gas CHP + add biogas-specific fuel handling + permit considerations. Cert evidence bundle reflects the multi-trade rural complexity."
          />

          <CommonMistake
            title="Underestimating EREC G99 + DNO-witnessed test timeline"
            whatHappens="Customer / installer assumes commercial CHP can be commissioned + energised on the same timeline as a domestic install. Reality: G99 formal application 12-26 weeks + DNO-witnessed test 2-6 weeks lead time AFTER install ready. Customer expects energisation in 2 months from order; actual 6-10 months. Customer + installer frustrated; CHP unit sits commissioning-ready but not energised."
            doInstead="EREC G99 timeline + DNO-witnessed test from project planning day 1. Submit G99 application as early as possible — typically when site survey complete + CHP specified, before order placement. Run G99 application in parallel with install planning + procurement + civils. DNO-witnessed test scheduled 2-6 weeks ahead of expected commissioning completion. Customer expectation managed: realistic 6-12 month project timeline for commercial CHP. Cert evidence bundle tracks G99 dates + DNO-witnessed test scheduling."
          />

          <CommonMistake
            title="Skipping Reg 551.4.2 multi-source verification on a PV+BESS+CHP commercial site"
            whatHappens="Commercial site adds CHP to existing PV + BESS. Commissioning verifies CHP individually but doesn\'t test fault scenarios under multi-source combinations (PV + BESS + CHP + grid). Months later, real fault occurs with all sources active — RCD response is non-optimal; fault clearance delayed; potential safety concern + customer issue."
            doInstead="Reg 551.4.2 requires RCD effectiveness for EVERY intended combination of sources operating. Multi-source commercial site commissioning sequence: (1) Test each source individually; (2) Test each pair (4 combinations); (3) Test triple combinations (4 combinations); (4) Test all-four-active. Induce sample fault under each + verify appropriate RCD trips + per-source isolation. Substantial cert evidence bundle Reg 551.4.2 record. UK 2025-26 mature commercial-CHP commissioning practice: detailed test plan + sign-off per combination."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Commercial CHP scale 10 kWe - 5 MWe. UK 2025-26 widespread in hospitals, leisure, hotels, large commercial, district heating, food processing, breweries, agriculture.',
              'Fuel variants: natural gas dominant; biogas (AD from farms, sewage, food, landfill); biofuel rare; hydrogen-blend trial scale.',
              'EREC G99 formal application mandatory + DNO-witnessed Reg 551.7.5 anti-islanding test. 12-26 week timeline.',
              'Section 551 framework applies fully: Reg 551.1.1(a) combustion engine, Reg 551.7.5 anti-islanding, Reg 551.7.2.1 supply-side, Reg 551.4.2 multi-source RCD.',
              'BS EN 50549-1 + -2 grid-connection product standards. ENA EREC G99 references both.',
              'Heat-network integration: buffer thermal store + heat exchanger + LTHW + district heating. Heating engineer specialist scope; electrical installer integrates control signals.',
              'Grid-services revenue: FFR, Dynamic Containment / Moderation / Regulation, Capacity Market, Balancing Mechanism via aggregator partnership. £10-50k+ per MWe per year additional revenue.',
              'Aggregator partnership (Flexitricity / Limejump / KiWi Power / Open Energi etc.) packages multiple generators to bid into NESO services.',
              'Multi-source commercial site (PV + BESS + CHP + grid): Section 551 + Chapter 82 PEI integration; substantial Reg 551.4.2 verification across combinations.',
              'Environment permits: MCPD (1-50 MWth) typical; IED (>50 MWth) for large sites. Environment Agency permit + emissions monitoring + reporting.',
              'UK 2025-26 fleet: several thousand commercial CHPs operational (~1-2 GWe). New install pipeline focuses on biogas + hydrogen-blend + industrial decarbonisation.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Micro-CHP (domestic) + Section 551
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                9.7 Micro-hydro + emerging LCT
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
