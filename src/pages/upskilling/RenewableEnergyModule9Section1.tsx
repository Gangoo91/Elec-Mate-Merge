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
import { Section551Taxonomy } from '@/components/study-centre/diagrams/renewableM9';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm9s1-section-551-power-sources',
    question:
      'Per Reg 551.1.1, which power sources are considered "generating sets" under BS 7671 Section 551?',
    options: [
      'Combustion engines, turbines, electric motors, PV cells, batteries and other suitable sources',
      'Only solar PV cells and grid-tied PV inverters; other technologies fall under separate parts',
      'Only rotating sources such as wind, hydro and gas-turbine generators',
      'Only diesel and gas standby generators rated above 16 A per phase, not renewables',
    ],
    correctIndex: 0,
    explanation:
      'Reg 551.1.1 lists power sources considered as generating sets in BS 7671 Section 551: (a) combustion engines (typical CHP, biomass plants with engine-driven generators); (b) turbines (wind, micro-hydro, gas-turbine CHP); (c) electric motors (pumped storage — rare); (d) photovoltaic cells (PV — covered in M2-M4); (e) batteries (BESS — covered in M5; explicitly classified as generating set per Reg 551.7.2.1, not as load); (f) other suitable sources (fuel cells, emerging technologies). Section 551 is therefore the unifying BS 7671 framework for EVERY non-utility electricity source on the customer side of the meter. M9 covers the categories from this list not already covered in M2-M5: wind, micro-hydro, CHP — plus solar thermal (no electrical generation, but electrical install scope) and biomass (combustion may include generator stage or be heat-only).',
  },
  {
    id: 'm9s1-mcs-coverage',
    question:
      'What MCS Installer Standards cover the M9 technologies?',
    options: [
      'There are no installer standards for these technologies; only manufacturer instructions apply',
      'A single MIS 3002 standard covers every renewable technology across the whole module',
      'A separate MIS 300x standard per technology — 3001 solar thermal, 3003 wind, 3004 biomass, 3007 micro-CHP, 3008 micro-hydro',
      'MCS alone is the standard; the MIS numbers are manufacturer product part numbers, not standards',
    ],
    correctIndex: 2,
    explanation:
      'MCS (Microgeneration Certification Scheme) Installer Standards (MIS) cover the M9 technologies: MIS 3001 = solar thermal heating; MIS 3002 = solar PV; MIS 3003 = small wind (≤50 kW); MIS 3004 = biomass heating (wood / pellet); MIS 3005 = heat pumps (covered in M8); MIS 3006 = ground source heat pumps (older — now consolidated into 3005); MIS 3007 = micro-CHP; MIS 3008 = micro-hydro. Each standard sets sizing methodology + product approval list + installer competence + customer handover documentation. UK Government Boiler Upgrade Scheme grant requires MCS-certified company. For solar thermal: BUS does NOT currently cover solar thermal (heat pump-focused) but the Renewable Heat Premium Payment historically did; verify current UK grants. Cert evidence bundle for each technology includes the relevant MIS handover pack + the BS 7671 electrical install EIC.',
  },
  {
    id: 'm9s1-erec-g99',
    question:
      'Why does most M9 generating-set technology trigger EREC G99 rather than G98?',
    options: [
      'The choice between the two is made arbitrarily by the installer at the design stage',
      'Because these technologies require no DNO involvement at all, unlike grid-tied PV',
      'Because the loss-of-mains test method, not the export level, decides which recommendation applies',
      'Their sustained export exceeds the G98 ≤16 A per phase limit, so the formal G99 application applies',
    ],
    correctIndex: 3,
    explanation:
      'EREC G98 = Type A small-scale generation up to 16 A per phase, fast-track post-installation notification. EREC G99 = larger generation, formal pre-installation application. For M9 technologies: (1) Wind microgeneration — small (≤3 kW) may fit G98; most domestic micro-wind (3-6 kW) and commercial (10+ kW) trigger G99 due to sustained export. (2) Micro-hydro — typically sustained generation 5-30 kW; G99 typical. (3) CHP — micro-CHP domestic (~1 kW electrical) may fit G98; commercial CHP (10-500 kW) firmly G99. (4) Solar thermal — no electrical generation, so no G98/G99 trigger. (5) Biomass — heat-only systems no trigger; biomass with combined-heat-and-power has the engine-generator triggering G98 / G99 per output. UK 2025-26 reality: G99 application is part of the project plan from day one for any sustained-export technology.',
  },
  {
    id: 'm9s1-anti-islanding',
    question:
      'What is "anti-islanding" + why does Reg 551.7.5 apply to all M9 generating sets?',
    options: [
      'A theoretical hazard that does not occur in practice on real UK installations',
      'It stops a generating set feeding a lost public supply, so it applies to anything that can export',
      'An optional manufacturer convenience feature the customer can enable or disable at will',
      'A protection that applies only to large commercial generators above 50 kW, not domestic ones',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.7.5 verbatim from BS 7671: "Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4." Anti-islanding is the categorical safety requirement for any grid-paralleled generator — wind, micro-hydro, CHP, PV, BESS. Without it: DNO grid fault occurs → DNO assumes downstream cables are dead → engineer touches "dead" cable that is actually being fed by the customer\'s generator → fatal electric shock. Anti-islanding protection is typically built into the inverter / generator controller (matches voltage + frequency + loss-of-mains detection). The protection is verified at commissioning via DNO-witnessed test or simulated grid loss. Cert evidence bundle records the anti-islanding device type + commissioning test result.',
  },
];

const quizQuestions = [
  {
    question:
      'A rural farm wants 10 kW micro-hydro from a stream + 5 kW small wind + existing solar PV. What BS 7671 + regulatory framework applies?',
    options: [
      'Only Section 712 (PV) applies, since the wind and hydro are too small to regulate',
      'No BS 7671 framework applies to a rural, off-grid-leaning multi-source site',
      'Each source is treated independently under its own MCS standard, with no site-wide framework',
      'Section 551 covers all three sets together, with a single G99 application and the per-technology MCS standards',
    ],
    correctAnswer: 3,
    explanation:
      'Multi-source rural site = full Section 551 + Chapter 82 PEI integration. Reg 551.1.1 lists turbines (wind, hydro) and PV as generating sets — all three are Section 551 sources. Reg 551.4.2: RCD effectiveness must remain for every intended combination of sources (with three sources, this is a real constraint). Reg 551.7 parallel operation requirements: each source must coordinate; Reg 551.7.2.1 each on supply side of protective devices; Reg 551.7.5 anti-islanding on all three. EREC G99 formal application — DNO design accounts for combined export (potentially up to 17 kW total). MCS coverage: MIS 3008 micro-hydro, MIS 3003 wind, MIS 3002 PV. The DNO connection agreement is one document covering the aggregate site. Cert evidence bundle: Section 712 PV install + Chapter 57 BESS (if added later) + Section 551 generator coordination + EREC G99 reference + per-source MCS handover packs.',
  },
  {
    question:
      'Solar thermal does NOT generate electricity. Why is it in a renewable-energy course module for electricians?',
    options: [
      'It has real electrical scope — a controller, circulation pumps, sensors and heating-control interface',
      'It was included by mistake and is not really an electrical install topic for the course',
      'It is here only as general background, with no actual electrical work for the installer to do',
      'Solar thermal does in fact generate electricity via its collectors, which is why it appears here',
    ],
    correctAnswer: 0,
    explanation:
      'Solar thermal install electrical scope: (1) Differential-temperature controller — compares collector sensor temperature vs cylinder sensor; starts circulation pump when collector > cylinder + delta-T threshold; stops when temperature drop or cylinder reaches setpoint. (2) Circulation pump(s) — typically 40-100 W single-phase (smaller pump than CH primary); some systems use solar-direct PV-powered DC pumps (no AC supply needed). (3) Drainback / pressurised system controls — drainback systems use gravity, pressurised systems use expansion vessel + pressure sensor; both have electrical control elements. (4) Freeze protection — antifreeze (glycol mix) common, or controller-managed dump cycle in colder climates. (5) Interface to DHW cylinder + existing heating controls — integrate with heat pump / boiler primary so solar contribution doesn\'t fight other heat sources. BS 7671 applies via Reg 314 dedicated controls way + Reg 411.4 ADS + Reg 415.1 30 mA RCD + Reg 522.2.1 cable thermal protection (cable near hot pipework). MCS MIS 3001 is the heat-pump-equivalent installer standard for solar thermal. Cert evidence bundle records the electrical scope alongside MCS sizing + commissioning.',
  },
  {
    question:
      'Reg 551.7.2.1 says generating set on the supply side of all protective devices + BESS treated as generating set, not load. Why?',
    options: [
      'It is an arbitrary classification with no real electrical-safety significance',
      'There is no technical reason; a battery could equally be wired downstream as a load',
      'A source can back-feed a load-side section a device cannot see, so supply-side keeps protection effective',
      'It is left to the customer to decide whether the battery counts as a source or a load',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 551.7.2.1 codifies a fundamental electrical-architecture rule for generating sets. Energy direction matters: a generating set is a source, not a load. If the source is on the LOAD side of a protective device: (1) fault on the load-side circuit may not be seen by the supply-side protective device (energy flowing from the wrong direction); (2) protective device tripping leaves the source still energising the isolated downstream — bypass or fail-to-disconnect risk; (3) RCD discrimination breaks (Reg 551.4.2 effectiveness compromised). Placing the source on the SUPPLY side of all protective devices ensures: parallel-operation protective devices coordinate with all sources; RCD continues to see all relevant fault current paths; isolation works correctly. BESS as generating set: even though BESS can be both source (discharging) AND load (charging), its electrical architecture connection is per the generating-set rule (supply side, not load side). This applies to all M9 technologies that export: wind, hydro, CHP, BESS, PV. Cert evidence bundle records the source-connection topology vs protective device hierarchy.',
  },
  {
    question:
      'A customer asks "should I install solar thermal for hot water OR a heat pump?" What is the electrician\'s honest answer in UK 2025-26?',
    options: [
      'Always recommend solar thermal, as it heats water more cheaply than any heat pump',
      'They do different jobs — heat pump (heat + DHW + BUS grant) plus PV now dominates; solar thermal is niche',
      'Always recommend a heat pump, as solar thermal has no remaining valid use case anywhere',
      'The two are interchangeable, so the customer can pick either with the same outcome',
    ],
    correctAnswer: 1,
    explanation:
      'Honest customer answer: different functions + different economics in UK 2025-26. Solar thermal: heat-only (no electricity); covers DHW primarily; no UK Government grant currently (BUS is heat pump-focused); economic case weakened over the last decade as PV + heat pump combination became cheaper + more flexible. Heat pump: heat + hot water (via cylinder integration covered in M8.6); BUS grant £7,500 typical 2025-26; primary UK heating-decarbonisation technology. PV: electricity generation; covers DHW indirectly via immersion diverter (Eddi / iBoost — M4 covered this). The UK 2025-26 dominant retrofit path: heat pump (primary heating + DHW) + PV (free electricity + immersion diversion for DHW boost) + future BESS (storage). Solar thermal niche: high DHW demand (large household / B&B / hospitality), no roof space for PV, off-grid / remote properties, customer preference for direct-heat solution. The electrician\'s scope on solar thermal is the controls + circulation pump + interface — discussed in §9.3.',
  },
  {
    question:
      'CHP — Combined Heat and Power — what is unique vs the other M9 technologies?',
    options: [
      'There is no real difference from the other generating technologies in the module',
      'It produces only heat and no electricity, unlike the wind and hydro turbines',
      'It produces only electricity, with the heat being a waste by-product that is simply vented',
      'It makes both electricity and useful heat from one fuel (~80-90% combined), adding heat-network complexity',
    ],
    correctAnswer: 3,
    explanation:
      'CHP (Combined Heat and Power) is unique among M9 technologies: it generates BOTH electricity AND useful heat from a single fuel source. Combined efficiency: typically 80-90% (where the waste heat from electrical generation is captured + used). Compare: grid electricity ~35-40% efficient at point of generation; separate gas boiler ~85-90% efficient. CHP combined is roughly 2× the primary-energy efficiency. Other M9 technologies: electrical-only (wind, micro-hydro) or heat-only (solar thermal, biomass heat-only). Biomass with engine-driven generator IS a form of CHP. Section 551 framework applies — Reg 551.7 parallel operation + Reg 551.7.5 anti-islanding. Heat-network interface adds complexity (hydraulic + control + thermal storage). UK 2025-26 CHP landscape: micro-CHP domestic largely Stirling engine + fuel cell (limited deployment); commercial CHP (10 kW - 5 MW) widespread in hospitals, leisure centres, large commercial; biogas CHP at anaerobic digestion sites; hydrogen-blend CHP emerging. Cert evidence bundle integrates Section 551 + heat-network + fuel-source compliance.',
  },
  {
    question:
      'Hydrogen for heating — what is the UK 2025-26 installer position?',
    options: [
      'Mostly policy direction — limited blend trials, villages scaled back, decision deferred; stay aware only',
      'Mainstream and widely deployed, with most UK homes already heated by hydrogen today',
      'Banned outright across the UK, with no blend or village trials permitted anywhere',
      'Entirely imaginary; no hydrogen heating trial or deployment has ever taken place in the UK',
    ],
    correctAnswer: 0,
    explanation:
      'Hydrogen for heating UK 2025-26 reality: predominantly policy direction + emerging technology, NOT widespread deployment. (1) HyDeploy trials — 20% hydrogen blend in natural gas at limited sites (Keele University, Winlaton). Continues at trial scale. (2) Hydrogen heating village trials — Whitby + Redcar trials cancelled / scaled back over public + technical concerns. (3) UK Government strategic decision on hydrogen for heating deferred (originally targeted 2026; now later or possibly no widespread deployment). (4) Hydrogen-ready boilers + heat pumps — marketed by manufacturers; very limited active hydrogen supply to use them on. (5) Hydrogen for transport + industry — separate policy stream, more momentum. Installer 2025-26 position: aware of direction; understand the technologies; track regulatory decisions; no immediate widespread install obligation. M9 covers hydrogen direction in §9.7 alongside other emerging LCT (fuel cells) — keeps awareness without overstating deployment.',
  },
];

const faqs = [
  {
    question: 'Why is BESS classified as a generating set under Section 551?',
    answer:
      'Reg 551.7.2.1 explicitly treats BESS as a generating set, not a load — because BESS exports energy from its terminals (in discharge mode) similar to PV / wind / CHP. Treating BESS as a generator places it on the supply side of protective devices + ensures parallel-operation protection coordination. Reg 551.4.2 RCD effectiveness depends on this architecture. Covered in detail in M5 (BESS).',
  },
  {
    question: 'How does Section 551 relate to Chapter 82 (PEI)?',
    answer:
      'Chapter 82 = Prosumer\'s Electrical Installation (PEI) — the framework for installations with one or more generators in addition to (or instead of) the public supply. Section 551 is the generating-set-specific safety framework; Chapter 82 is the PEI integration framework that incorporates Section 551 + Section 712 (PV) + Chapter 57 (BESS) + Section 722 (EV) + Section 826 (PEI integration). Multi-source sites (M9 + M10 territory) operate under Chapter 82 with Section 551 as the per-generator anchor.',
  },
  {
    question: 'What is the MCS framework + which standards are relevant to M9?',
    answer:
      'MCS (Microgeneration Certification Scheme) is the UK certification body for low-carbon energy products + installers. MCS Installer Standards (MIS) cover specific technologies: MIS 3001 solar thermal; MIS 3002 solar PV; MIS 3003 micro-wind; MIS 3004 biomass; MIS 3005 heat pumps; MIS 3007 micro-CHP; MIS 3008 micro-hydro. M9 spans MIS 3001 + 3003 + 3004 + 3007 + 3008. Each is the installer competency framework + customer-grant entry point for that technology. UK Government grant (where applicable) requires MCS-certified company.',
  },
  {
    question: 'Is M9 about installing these technologies, or just being aware of them?',
    answer:
      'Installer competency. Each technology has its own MCS standard + specialist install training (typically 1-3 days per technology). The electrician covered in M9 is the BS 7671 electrical install side: dedicated circuits, protective devices, controls wiring, anti-islanding verification, Section 551 compliance. The mechanical / fuel-system / specialist sides are MCS-specific competencies. Multi-trade delivery model mirrors M8 (heat pumps).',
  },
  {
    question: 'Does the customer\'s existing CU need replacing for any M9 technology?',
    answer:
      'Frequently. Generating-set installs typically add: dedicated supply circuit (back-feed protection on the supply side); RCD architecture per Reg 551.4.2 + 415.1; AC isolator for the generator; warning notices per Reg 514. Existing CUs often lack spare ways + Type S main RCD. UK 2025-26 typical: CU change ~£400-800 alongside the technology install. Each technology section covers its specific CU + protective device scope.',
  },
];

export default function RenewableEnergyModule9Section1() {
  const navigate = useNavigate();

  useSEO({
    title: 'The other-LCT landscape + Section 551 framework | Renewable Energy 9.1 | Elec-Mate',
    description:
      'BS 7671 Section 551 as the unifying framework for generating sets — Reg 551.1.1 power-source taxonomy, Reg 551.7 parallel operation, Reg 551.7.5 anti-islanding. The other-LCT landscape: wind, solar thermal, biomass, CHP, micro-hydro, hydrogen. MCS MIS standards per technology + EREC G98 / G99 paths.',
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
            eyebrow="Module 9 · Section 1 · BS 7671:2018+A4:2026 · Section 551 + Reg 551.1.1"
            title="The other-LCT landscape + Section 551 framework"
            description="The technologies beyond solar PV / BESS / EV / heat pumps — wind, solar thermal, biomass, CHP, micro-hydro, hydrogen. BS 7671 Section 551 as the unifying framework for generating sets. Reg 551.1.1 power-source taxonomy, Reg 551.7 parallel operation requirements, Reg 551.7.5 anti-islanding."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 Section 551 is the unifying framework for generating sets — Reg 551.1.1 power sources: combustion engines, turbines, electric motors, PV, batteries, other suitable sources.',
              'M9 covers the technologies in this list NOT already covered in M2-M5: wind (turbines), micro-hydro (turbines), CHP (combustion engines / turbines), plus solar thermal (heat-only with electrical scope) and biomass (heat-only or combined heat-and-power).',
              'BESS treated as generating set per Reg 551.7.2.1 — not a load. Supply-side connection. Reg 551.4.2 RCD effectiveness across source combinations.',
              'Reg 551.7.5 anti-islanding: mandatory for all generating sets that can operate in parallel with the public supply. Verified at commissioning via DNO-witnessed or simulated grid-loss test.',
              'EREC G98 (≤16 A per phase Type A fast-track) vs G99 (larger / formal application). Most M9 technologies trigger G99 due to sustained export.',
              'MCS Installer Standards: MIS 3001 solar thermal, MIS 3003 wind, MIS 3004 biomass, MIS 3007 micro-CHP, MIS 3008 micro-hydro. Each is the installer competency + customer-grant entry point.',
              'UK 2025-26 reality: solar thermal economic case weakened vs heat pump + PV; CHP commercial widespread, micro-CHP domestic limited; micro-hydro rural niche; wind microgen limited; hydrogen mostly policy direction.',
              'Multi-trade delivery: BS 7671 electrical install + MCS technology specialist + fuel / mechanical specialist + customer-facing MCS company. Mirrors M8 (heat pumps) pattern.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 551.1.1 power-source taxonomy: identify which M9 technology sits in which category.',
              'Distinguish electrical-generating sources (wind, hydro, CHP, PV, BESS) from heat-only with electrical scope (solar thermal, biomass).',
              'Apply Reg 551.7 parallel operation requirements + Reg 551.7.5 anti-islanding.',
              'Apply Reg 551.7.2.1 supply-side connection — BESS / generating sets on supply side of protective devices.',
              'Apply Reg 551.4.2 RCD effectiveness across multiple generating sources.',
              'Choose appropriate EREC notification path (G98 vs G99) per technology + export scale.',
              'Identify the MCS Installer Standard (MIS) applicable per technology.',
              'Position M9 in the broader course: M2-M4 (PV) + M5 (BESS) + M6-M7 (EV) + M8 (heat pumps) + M9 (other LCT) + M10 (hybrid integration).',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Section 551 doesn\'t care what fuel the generator runs on or what physical principle drives the turbine — it treats every customer-side electricity source by the same safety rules. That\'s the unifying anchor.
          </Pullquote>

          <ContentEyebrow>Reg 551.1.1 + the M9 technology landscape</ContentEyebrow>

          <ConceptBlock
            title="Reg 551.1.1 power-source taxonomy"
            plainEnglish="BS 7671 Section 551 lists six power-source categories considered as generating sets: (a) combustion engines, (b) turbines, (c) electric motors, (d) photovoltaic cells, (e) batteries, (f) other suitable sources. Every customer-side electricity source falls into one of these categories — and Section 551 sets the safety rules that apply regardless of which."
            onSite="UK 2025-26 reality: most installers will encounter PV (M2-M4) + BESS (M5) most often. M9 covers the rest of the Reg 551.1.1 list — combustion engines (CHP, biomass-with-engine), turbines (wind, hydro, gas-turbine CHP), and adjacent technologies (solar thermal — no electrical generation but has electrical install scope)."
          >
            <p>Reg 551.1.1 categories mapped to technologies:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">(a) Combustion engines</strong> —
                CHP (gas, biogas, biofuel, hydrogen blend); biomass with engine-driven
                generator; emergency diesel generators (back-up). M9 §9.5 (micro-CHP)
                + §9.6 (commercial CHP)
              </li>
              <li>
                <strong className="text-white">(b) Turbines</strong> — wind
                (HAWT / VAWT — M9 §9.2); micro-hydro (Pelton / Francis / Crossflow /
                Archimedes — M9 §9.7); gas turbine CHP at larger commercial scale
              </li>
              <li>
                <strong className="text-white">(c) Electric motors</strong>
                — rare; pumped storage at utility scale. Not typically encountered in
                domestic / light-commercial M9 install scope
              </li>
              <li>
                <strong className="text-white">(d) Photovoltaic
                  cells</strong> — covered in M2-M4. Listed here for completeness;
                Section 551 applies uniformly
              </li>
              <li>
                <strong className="text-white">(e) Batteries</strong>
                — covered in M5. Reg 551.7.2.1 explicitly classifies BESS as a
                generating set (not a load) — placed on the supply side of protective
                devices
              </li>
              <li>
                <strong className="text-white">(f) Other suitable
                  sources</strong> — fuel cells (emerging LCT — M9 §9.7); hydrogen-fed
                generators; future technologies. Section 551 framework future-proofs
                for these via this open category
              </li>
              <li>
                <strong className="text-white">Solar thermal
                  exception</strong> — NOT in Reg 551.1.1 because it doesn\'t generate
                electricity. But it has real electrical install scope (controllers +
                circulation pumps + sensors) — M9 §9.3 covers this
              </li>
              <li>
                <strong className="text-white">Biomass exception</strong>
                — heat-only biomass (most domestic UK 2025-26 biomass) is NOT in Reg
                551.1.1; biomass with engine-driven CHP IS (under (a) combustion
                engines). M9 §9.4 covers both heat-only + CHP-biomass interfaces
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Where M9 sits in the course"
            plainEnglish="M9 fills the gap between the high-volume electrical-install LCT (M2-M8) and the integration / smart-export complexity (M10). Each M9 technology has its own specialist installer competency (MCS MIS standard); the BS 7671 electrical install side is what this module covers."
            onSite="UK 2025-26 reality: most working electricians will encounter heat pumps + PV + EV most often. M9 technologies are lower-volume but real — agricultural / rural / commercial installs often include 1-2 of these. Knowing where Section 551 applies + how the MCS framework overlays prevents the trap of treating each technology as a unique problem."
          >
            <p>M9 in the course structure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">M2-M4 (Solar PV)</strong>
                — Section 712 + PV-specific framework. Section 551 applies as the
                generating-set anchor
              </li>
              <li>
                <strong className="text-white">M5 (BESS)</strong>
                — Chapter 57 + Section 826 PEI. Reg 551.7.2.1 treats BESS as
                generating set
              </li>
              <li>
                <strong className="text-white">M6-M7 (EV)</strong> —
                Section 722 EV-specific. EV is LOAD (not generating set) in this
                course\'s framing; bidirectional V2G covered in M10
              </li>
              <li>
                <strong className="text-white">M8 (heat pumps)</strong>
                — fixed equipment + Part 4-7 general regs. Not a generating set —
                pure load
              </li>
              <li>
                <strong className="text-white">M9 (this module —
                  other LCT)</strong> — wind, solar thermal, biomass, CHP, micro-hydro,
                hydrogen / emerging LCT. Most are Section 551 generating sets; solar
                thermal is the heat-only exception
              </li>
              <li>
                <strong className="text-white">M10 (hybrid + EMS +
                  smart export)</strong> — multi-source integration. SEG, EREC G100
                export limit, V2G, grid forming. Builds on Section 551 + Chapter 82
              </li>
              <li>
                <strong className="text-white">M11 (Chapter 81 +
                  lightning + fault levels)</strong> — A4:2026 Chapter 81 energy
                efficiency + BS EN 62305 lightning protection for PV / wind. Fault
                contribution from multi-source sites
              </li>
              <li>
                <strong className="text-white">M12 (testing +
                  commissioning + handover)</strong> — Part 6 on LCT, IV / IR on DC,
                BESS health, PEN faults, MCS handover packs. Closing module
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.1.1 — Generating set power sources"
            clause="Generating sets with the following power sources are considered: (a) combustion engines; (b) turbines; (c) electric motors; (d) photovoltaic cells; (e) batteries; (f) other suitable sources."
            meaning="Reg 551.1.1 is the foundational scope reg for BS 7671 Section 551. Every customer-side electricity source falls into one of these six categories — and Section 551 sets the safety rules that apply regardless of which fuel / physical principle drives the generation. M9 spans (a) combustion engines (CHP, biomass-with-engine), (b) turbines (wind, hydro, gas turbine CHP), and (f) other (fuel cells, hydrogen, emerging LCT). The categorical scope of Reg 551.1.1 is what makes Section 551 the unifying anchor — wind / hydro / CHP / biomass-CHP all share the same protective architecture requirements, anti-islanding, parallel-operation rules, RCD coordination. Cert evidence bundle per technology records the Reg 551.1.1 category + Section 551 compliance."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Parallel operation, anti-islanding, RCD coordination</ContentEyebrow>

          <Pullquote>
            One technology, one safety framework. Solar thermal aside, every M9 generating set obeys Reg 551.7 + Reg 551.7.5 — anti-islanding is non-negotiable.
          </Pullquote>

          <ConceptBlock
            title="Reg 551.7 parallel operation requirements"
            plainEnglish="Reg 551.7 sets the additional requirements for generating sets operating in parallel with the public supply (DNO grid) or with other on-site sources. Reg 551.7.5 mandates anti-islanding — the generator must NOT continue to export to a lost public supply. Reg 551.7.2.1 places the source on the supply side of protective devices."
            onSite="Every M9 generating-set technology (wind, hydro, CHP — and the BESS + PV from earlier modules) inherits Reg 551.7. The anti-islanding device is typically integrated into the inverter / generator controller; verified at commissioning via DNO-witnessed test or simulated grid-loss. Cert evidence bundle records the anti-islanding device type + commissioning result."
          >
            <p>Reg 551.7 elements applied to M9:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 551.7.1</strong> — bidirectional
                energy flow protective device + prohibition of source connection on
                load side of an RCD under certain conditions
              </li>
              <li>
                <strong className="text-white">Reg 551.7.2.1</strong> —
                generating set on supply side of all protective devices; BESS
                explicitly treated as generating set (not load)
              </li>
              <li>
                <strong className="text-white">Reg 551.7.4</strong> — means of
                automatic switching to disconnect the generating set on loss of
                supply or deviation of voltage / frequency at the supply terminals;
                above 16 A output the protection type, sensitivity and operating
                times must be agreed with the distributor
              </li>
              <li>
                <strong className="text-white">Reg 551.7.5</strong> — anti-islanding
                requirement verbatim: "Means shall be provided to prevent the
                connection of a generating set to the system for distribution of
                electricity to the public in the event of loss of that supply or
                deviation of the voltage or frequency at the supply terminals from
                values required by Regulation 551.7.4."
              </li>
              <li>
                <strong className="text-white">Anti-islanding
                  device</strong> — typically integrated into inverter / generator
                controller. Loss-of-mains (LoM) detection — ROCOF (rate of
                change of frequency) with voltage / frequency protection, or
                active anti-islanding methods. G99 disallows Vector Shift for
                type-tested generation, so RoCoF is the standard required method
                for the type-tested inverters in virtually all LCT installs; VS
                is legacy / non-type-tested sites only
              </li>
              <li>
                <strong className="text-white">Commissioning
                  verification</strong> — at install, anti-islanding tested via DNO-witnessed
                simulated grid-loss OR via manufacturer self-test feature with
                documented procedure
              </li>
              <li>
                <strong className="text-white">EREC G98 / G99
                  framework</strong> — DNO notification for generation. G98 fast-track
                ≤16 A per phase; G99 formal for larger / multi-source. Most M9
                technologies trigger G99 due to sustained export
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — anti-islanding device type + manufacturer DoC +
                commissioning test result + DNO correspondence
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 551.4.2 RCD effectiveness across multiple sources"
            plainEnglish="Reg 551.4.2: the generating set shall be connected so that any RCD protection in the installation remains effective for every intended combination of sources. Multi-source sites (wind + hydro + PV, or BESS + PV + CHP) require careful RCD architecture to ensure each combination triggers RCD protection correctly."
            onSite="The challenge: each generator influences the fault-current pattern. A fault near one generator may not be seen by an RCD if the fault current path doesn\'t cross the RCD\'s sensor. Multi-source sites need: per-source RCD architecture + central RCD coordination + verification across combinations. Reg 551.7.1 prohibits source connection on load side of certain RCDs."
          >
            <p>Multi-source RCD design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-source RCD</strong> —
                each generator has its own RCD on its supply connection. Typical 30 mA
                Type A or Type B per Reg 415.1 + Reg 531.3.3 (RCD type depends on
                generator electronics — VSD wind / hydro / CHP may need Type B per
                manufacturer DoC)
              </li>
              <li>
                <strong className="text-white">Central
                  coordination</strong> — main RCD architecture (Type S 100 mA
                upstream + 30 mA RCBOs per circuit) coordinates with the per-source
                RCDs. Reg 531.3.6 discrimination
              </li>
              <li>
                <strong className="text-white">Reg 551.7.1(d)
                  prohibition</strong> — source must NOT be connected on load side of
                an RCD under certain conditions (the RCD would not see the source\'s
                fault contribution correctly)
              </li>
              <li>
                <strong className="text-white">Verification</strong>
                — at commissioning, induce a fault under each combination of sources
                operating; verify the appropriate RCD trips. Reg 643 testing per
                circuit + Reg 551.4.2 multi-source verification
              </li>
              <li>
                <strong className="text-white">Type B for VSD
                  sources</strong> — wind / hydro / VSD-driven CHP can produce smooth
                DC fault currents (per the §8.5 analysis for heat pump VSD
                compressors). Type B RCD where manufacturer DoC declares smooth-DC
                leakage exceeds Type A capability
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — RCD architecture diagram per multi-source site +
                per-combination commissioning test results + manufacturer DoC per
                source
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.5 — Anti-islanding for generating sets in parallel with public supply"
            clause="Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4. NOTE: For a generating set with an output not exceeding 16 A intended to operate in parallel with a system for distribution of electricity to the public, the requirements are given in BS EN 50549-1. Separately, the ENA Engineering Recommendations — G98 (up to and including 16 A per phase) and G99 (greater than 16 A per phase) — set the DNO notification and connection framework for parallel operation; they are the connection-process route, not a deemed-to-satisfy substitute for Reg 551.7."
            meaning="Reg 551.7.5 is the categorical anti-islanding requirement — non-negotiable for any generating set that may operate in parallel with the public supply. The NOTE confirms that for small (≤16 A) generators, EREC G98 compliance deems Reg 551.7 satisfied. For larger generators (which most M9 technologies are at the export size that matters), G99 formal application is required + the anti-islanding device is verified per the DNO procedure. The detection methods are typically integrated into the inverter / generator controller: ROCOF, voltage / frequency deviation, active loss-of-mains injection. G99 disallows Vector Shift for type-tested generation, so RoCoF (with voltage / frequency protection) is the standard required method for the type-tested inverters used in virtually all LCT installs; Vector Shift is legacy and only on older or non-type-tested sites (e.g. larger sites with bespoke G99 protection relays). Cert evidence bundle records: anti-islanding device + manufacturer DoC + DNO-witnessed or simulated test at commissioning."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>MCS framework + the customer-facing delivery model</ContentEyebrow>

          <ConceptBlock
            title="MCS Installer Standards across M9 technologies"
            plainEnglish="MCS (Microgeneration Certification Scheme) Installer Standards (MIS) set the installer competency + product approval + customer handover requirements per technology. M9 spans five MIS standards covering its core technologies."
            onSite="MCS-certified company is the customer\'s primary contractor. The MCS handover pack unlocks any UK Government grant (where applicable). BS 7671 electrical install scope sits inside the MCS handover pack alongside the technology-specific specialist work."
          >
            <p>MIS standards relevant to M9:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">MIS 3001 — Solar
                  Thermal</strong> — solar collectors + DHW integration. Hydraulic +
                control specialist scope. M9 §9.3
              </li>
              <li>
                <strong className="text-white">MIS 3003 — Small
                  Wind</strong> — wind turbines ≤50 kW. Mast + turbine + electrical
                + planning. M9 §9.2
              </li>
              <li>
                <strong className="text-white">MIS 3004 —
                  Biomass</strong> — wood pellet + log biomass boilers. Combustion
                + flue + control specialist scope. M9 §9.4
              </li>
              <li>
                <strong className="text-white">MIS 3005 — Heat
                  Pumps</strong> — covered in M8. ASHP / GSHP / exhaust-air
              </li>
              <li>
                <strong className="text-white">MIS 3007 —
                  micro-CHP</strong> — micro-CHP ≤50 kW. Combined heat + electrical
                generation. M9 §9.5
              </li>
              <li>
                <strong className="text-white">MIS 3008 —
                  Micro-hydro</strong> — micro-hydro ≤50 kW. Turbine + civils + grid
                connection. M9 §9.7
              </li>
              <li>
                <strong className="text-white">Grant funding</strong>
                — UK 2025-26 Boiler Upgrade Scheme covers heat pumps (M8) primarily;
                limited / no current grants for solar thermal, biomass, wind, hydro,
                CHP for domestic. Verify current scheme rates per technology at quote
                stage
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — MCS handover pack per technology integrates: MCS
                sizing + product details + commissioning report + BS 7671 EIC +
                customer handover documentation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The multi-trade delivery model"
            plainEnglish="Each M9 technology has its own multi-trade delivery model — MCS-certified company orchestrates; technology specialist (turbine erector, biomass installer, CHP commissioner, hydro civils contractor) does the technology-specific work; BS 7671 electrician handles the electrical install scope. Mirrors M8 (heat pumps) pattern."
            onSite="UK 2025-26 reality: the electrical installer rarely does the whole M9 install. The scope is the BS 7671 electrical install side — dedicated supply circuit, AC isolator, RCD architecture, controls wiring, anti-islanding verification, Section 551 compliance + EIC. Customer-facing single quote often from the MCS company who subcontracts the electrical scope."
          >
            <p>Trades per M9 technology:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Wind</strong> — MCS company
                + turbine specialist + mast erector + electrical installer +
                planning consultant
              </li>
              <li>
                <strong className="text-white">Solar thermal</strong> —
                MCS company + heating engineer + plumber + electrical installer
                (controls + pumps scope)
              </li>
              <li>
                <strong className="text-white">Biomass</strong> — MCS
                company + biomass installer + flue specialist (chimney sweep / HETAS
                if domestic) + electrical installer
              </li>
              <li>
                <strong className="text-white">CHP</strong> — MCS company
                + CHP specialist + heating engineer (heat-network interface) +
                electrical installer + gas / fuel specialist
              </li>
              <li>
                <strong className="text-white">Micro-hydro</strong> —
                MCS company + civils contractor (intake + pipework + tailrace) +
                turbine specialist + electrical installer + Environment Agency
                consultant (abstraction licence)
              </li>
              <li>
                <strong className="text-white">Hydrogen / fuel
                  cell</strong> — emerging. Typically R&D + specialist trials. Mainstream
                trade delivery model not yet established
              </li>
              <li>
                <strong className="text-white">Electrical
                  installer scope</strong> — dedicated supply circuit + AC isolator +
                RCD architecture (Reg 551.4.2 + Reg 415.1) + controls wiring + Reg
                551.7.5 anti-islanding verification + Reg 643 testing + EIC
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — BS 7671 EIC delivered to MCS company for inclusion
                in the MCS handover pack
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.2.1 — Generating set on supply side of protective devices"
            clause="The generating set is to be installed on the supply side of all the protective devices for the final circuits of a distribution board, and stationary batteries (Chapter 57) are to be considered a generating set and not a load."
            meaning="Reg 551.7.2.1 is a fundamental electrical-architecture rule that applies across M9 technologies. The generator (wind, hydro, CHP, BESS, PV) is a SOURCE that exports energy into the installation — it must therefore sit on the supply side of all the installation\'s protective devices, not on the load side. This ensures: protective devices coordinate with all sources for fault clearance; RCDs see all relevant fault paths (Reg 551.4.2); isolation works correctly when energy flows in either direction. BESS specifically: even though it both charges (acts as load) and discharges (acts as source), its electrical architecture connection is per the generating-set rule. Cert evidence bundle records the source-connection topology vs protective device hierarchy."
          />

          <InlineCheck {...inlineChecks[1]} />

          <Section551Taxonomy caption="Section 551 covers generating sets — wind and micro-hydro are turbines, CHP and biomass-CHP are combustion engines; solar thermal and heat-only biomass don't generate electricity, so they sit outside 551." />

          <SectionRule />

          <Scenario
            title="Rural property — multi-source renewable: wind + PV + (future) micro-hydro"
            situation="Highland farm. Existing 6 kWp PV install + 13 kWh BESS. Customer wants to add 5 kW small wind turbine on the hillside + future micro-hydro from a stream (estimated 8 kW Pelton turbine pending Environment Agency abstraction licence). Three-phase 100 A supply (already installed for the existing PV + BESS PEI setup). UK 2025-26."
            whatToDo="Design: Section 551 framework applies to all three generating sets per Reg 551.1.1 (PV + BESS + wind + future hydro — turbines + PV + batteries). Reg 551.4.2: RCD architecture must remain effective across every combination of sources operating (PV only, PV + BESS, PV + wind, PV + BESS + wind, all four together when hydro online). Reg 551.7.2.1: each source on supply side of protective devices — central AC supply panel with per-source connection points. Reg 551.7.5 anti-islanding: per-source device (PV inverter, BESS inverter, wind inverter, future hydro inverter) — all must disconnect on grid loss. EREC G99 formal application — DNO design considers combined export potential ~19+ kW. MCS: MIS 3003 wind (~£10-25k cost), future MIS 3008 micro-hydro (~£15-30k cost + civils). Cert evidence bundle: existing PV + BESS records + new Section 551 generating set additions + Reg 551.4.2 multi-source RCD test + Reg 551.7.5 anti-islanding verification per source + EREC G99 reference + each MCS handover pack."
            whyItMatters="UK 2025-26 multi-source rural renewable site = full Section 551 + Chapter 82 PEI integration. Real-world example of why Section 551 is the unifying framework: PV (already installed, Section 712) + BESS (Chapter 57) + wind (this module) + hydro (this module) all share the same Reg 551.7 + Reg 551.7.5 + Reg 551.4.2 framework. The MCS standards differ (MIS 3002 PV, MIS 3008 hydro, MIS 3003 wind) but the BS 7671 protective architecture is consistent. Cert evidence bundle integrates all sources under the Chapter 82 PEI umbrella."
          />

          <Scenario
            title="Commercial CHP at a leisure centre"
            situation="Local authority leisure centre. Existing 100 kVA three-phase supply, gas-boiler central heating, swimming pool with substantial heat demand. Energy assessment proposes 50 kWe / 100 kWth natural gas CHP unit — generates electricity for site self-consumption + waste heat for the pool + space heating."
            whatToDo="Section 551 generating-set framework (combustion engine per Reg 551.1.1(a)). MCS MIS 3007 micro-CHP (50 kWe at upper end of MIS 3007 scope; commercial-CHP licence may apply for larger units). EREC G99 formal application — sustained 50 kWe electrical export potential well above G98 threshold. Reg 551.7.5 anti-islanding mandatory — typical CHP control system includes loss-of-mains detection + automatic disconnect. Reg 551.7.2.1 CHP unit on supply side of LV switchgear; Reg 551.4.2 RCD architecture remains effective with CHP running. Heat-network interface: CHP heat output integrates with pool heat exchangers + LTHW central heating; hydraulic + control complexity. BS 7671 electrical install: dedicated three-phase CHP supply circuit + AC isolator + Type B RCD (CHP electronics may need it per manufacturer DoC) + warning notices per Reg 514. Cert evidence bundle: Section 551 compliance + EREC G99 DNO reference + MCS handover + heat-network commissioning + electrical install EIC. Total project ~£100-200k typical CHP + £30-50k civils + £15-30k electrical."
            whyItMatters="Commercial CHP is a substantial Section 551 deployment in UK 2025-26 — leisure centres, hospitals, large hotels, industrial sites. Combined efficiency 80-90% vs grid + boiler 35% + 85% separately = significant operational + carbon savings. The electrical installer\'s scope is the BS 7671 install side; the CHP specialist commissions the engine + heat-network + EREC G99 sign-off. Multi-trade delivery + Chapter 82 PEI integration."
          />

          <CommonMistake
            title="Treating each M9 technology as a unique problem"
            whatHappens="Electrician approaches a wind install as if it has nothing in common with the customer\'s existing PV. Misses that Reg 551.7.2.1 supply-side connection + Reg 551.4.2 RCD effectiveness apply to BOTH wind and PV identically. Designs separate ad-hoc RCD architecture that fails Reg 551.4.2 multi-source verification when both sources operate simultaneously."
            doInstead="Section 551 is the unifying framework. The Reg 551.7 + Reg 551.7.5 + Reg 551.4.2 + Reg 551.7.2.1 anchors apply regardless of what the generator runs on (sun, wind, water, gas, biofuel). Design the protective architecture once for the multi-source site; verify each combination at commissioning. Each technology has its own MCS handover pack + manufacturer DoC, but the BS 7671 framework is shared. Cert evidence bundle treats Section 551 as the integrating layer."
          />

          <CommonMistake
            title="Forgetting that solar thermal is NOT in Reg 551.1.1"
            whatHappens="Installer assumes solar thermal triggers EREC G98/G99 like PV does. Submits unnecessary DNO notification. Misses that solar thermal has NO electrical generation (no inverter, no export) — only thermal output. Wastes DNO interaction + delays project; customer / MCS company frustrated."
            doInstead="Solar thermal generates HEAT, not electricity — not in Reg 551.1.1, not a generating set. No EREC notification needed. The electrical install scope is the controls + circulation pump + sensors. Reg 314 dedicated controls way + Reg 411.4 ADS + Reg 415.1 30 mA RCD apply (it\'s still an electrical install) but no Section 551 / G98 / G99 framework. MCS MIS 3001 covers the technology-specific install. Cert evidence bundle smaller / simpler than the generating-set technologies."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Section 551 is the unifying framework for generating sets. Reg 551.1.1 power sources: combustion engines, turbines, electric motors, PV, batteries, other.',
              'M9 covers the technologies in Reg 551.1.1 not already covered in M2-M5: wind, micro-hydro, CHP — plus solar thermal (no electrical generation) and biomass (heat-only or CHP variant).',
              'Reg 551.7.5 anti-islanding is mandatory for any generating set in parallel with public supply. Verified at commissioning via DNO-witnessed or simulated grid-loss test.',
              'Reg 551.7.2.1 places generating sets on supply side of all protective devices. BESS explicitly treated as generating set, not load.',
              'Reg 551.4.2 RCD effectiveness must remain across every intended combination of sources operating. Multi-source sites require careful per-source + central RCD coordination.',
              'EREC G98 fast-track ≤16 A per phase generation; G99 formal pre-installation application for larger generators / multi-source. Most M9 technologies trigger G99.',
              'MCS Installer Standards per technology: MIS 3001 solar thermal, MIS 3003 wind, MIS 3004 biomass, MIS 3007 micro-CHP, MIS 3008 micro-hydro. M8 covered MIS 3005 heat pumps.',
              'Multi-trade delivery model: MCS company + technology specialist + BS 7671 electrical installer. Mirrors M8 pattern.',
              'Electrical installer scope: dedicated supply circuit + AC isolator + RCD architecture per Reg 551.4.2 + controls wiring + Reg 551.7.5 anti-islanding verification + Reg 643 Part 6 testing + EIC.',
              'Cert evidence bundle: Section 551 compliance + EREC notification + MCS handover pack + per-source manufacturer DoC + multi-source RCD test results.',
              'Solar thermal exception: not in Reg 551.1.1 (heat-only); but has electrical install scope (controls, pumps, sensors).',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-9')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 9
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                9.2 Wind microgeneration (HAWT / VAWT)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
