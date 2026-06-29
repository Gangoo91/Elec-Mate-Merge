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
import { MicroChpFlow } from '@/components/study-centre/diagrams/renewableSld';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm9s5-chp-definition',
    question: 'What is CHP (Combined Heat and Power) + why is it different from heat-only biomass?',
    options: [
      'It generates both electricity and useful heat from one fuel source, so Section 551 and anti-islanding apply — unlike heat-only biomass',
      'It generates only heat, like a condensing boiler, with no electrical output at all',
      'It generates only electricity and dumps its waste heat, so it is outside Section 551',
      'It is a heat-only appliance that simply runs at higher efficiency than a standard boiler',
    ],
    correctIndex: 0,
    explanation:
      'CHP (Combined Heat and Power) is unique among M9 technologies: it generates BOTH electricity AND useful heat from a single fuel source — typically natural gas, with biogas / biofuel / hydrogen variants emerging. The combined efficiency (~80-90%) is the value proposition. Compare: grid electricity ~35-40% efficient at point of generation (centralised power station + transmission losses); separate gas boiler ~85-90% efficient for heat. CHP captures the waste heat from electrical generation + uses it locally — roughly 2× the primary-energy efficiency vs separate grid + boiler. Section 551 framework applies (Reg 551.1.1(a) combustion engines OR (b) turbines depending on architecture). Reg 551.7.5 anti-islanding mandatory — CHP must NOT continue exporting to lost public supply. Reg 551.7.2.1 supply-side connection. Reg 551.4.2 RCD effectiveness across source combinations. Heat-only biomass (§9.4): no electrical generation, no inverter, no export, no Section 551. CHP technologies span: Stirling engine micro-CHP (declining), fuel cell micro-CHP (PEM + SOFC — niche premium), internal combustion micro-CHP (Honda Ecowill global, limited UK), commercial CHP (10 kW - 5 MW IC engines / turbines — covered §9.6).',
  },
  {
    id: 'm9s5-mis-3007',
    question: 'MCS MIS 3007 — what does it cover?',
    options: [
      'Every CHP installation, from 1 kWe domestic units to multi-megawatt utility plant',
      'Only large commercial CHP above 50 kWe, leaving domestic micro-CHP uncovered',
      'Micro-CHP up to 50 kWe — sizing, product approval, installer competence and customer handover; commercial CHP above 50 kWe uses a separate framework',
      'Only the gas safety of CHP, with no electrical or sizing requirements at all',
    ],
    correctIndex: 2,
    explanation:
      'MCS MIS 3007 covers micro-CHP up to 50 kWe (electrical output). Scope: domestic + light-commercial scale; Stirling / fuel cell / IC variants. Requirements: (1) Sizing methodology — match CHP electrical + heat output to site demand (heat-led design typical: size for site heat demand, accept electrical output as by-product); (2) Product on MCS-approved list (BS EN 50465 stationary fuel cell, BS EN 50438 / 50549 grid-connection product standards, BS EN 5xx for IC variants); (3) Installer company MCS-certified for micro-CHP; (4) Customer handover documentation — sizing calc, commissioning record, expected annual electrical + heat output, maintenance schedule. Above 50 kWe = commercial CHP framework (covered §9.6). UK 2025-26 grant landscape: limited current grant for micro-CHP (RHI closed 2022; BUS heat-pump-focused; Smart Export Guarantee tariff applies to electrical export). Cert evidence bundle: MCS MIS 3007 handover pack + BS 7671 EIC + EREC G98 / G99 reference + manufacturer DoC + Section 551 compliance.',
  },
  {
    id: 'm9s5-stirling-vs-fuel-cell',
    question: 'Stirling engine vs fuel cell micro-CHP — what are the differences?',
    options: [
      'Both burn gas internally in a piston engine, differing only in the grade of fuel used',
      'A Stirling engine converts fuel electrochemically while a fuel cell burns it in an open flame',
      'Both are electrochemical devices with no moving parts and an identical maintenance profile',
      'Stirling uses external combustion driving a piston; a fuel cell converts fuel without combustion',
    ],
    correctIndex: 3,
    explanation:
      'Stirling engine micro-CHP: external combustion (gas flame heats sealed gas working fluid) + piston-driven generator (typically free-piston linear generator or kinematic Stirling). Electrical output 1-2 kWe + heat output 5-25 kWth. UK 2025-26 market mostly historic — Whispergen + Baxi Ecogen sold 2010-2015 era; market largely exited; ongoing installs are predominantly replacement / maintenance of existing units. Fuel cell micro-CHP: electrochemical conversion (NOT combustion) — hydrogen-rich fuel (typically natural gas reformed to hydrogen on-board) reacts electrochemically with oxygen at electrolyte → DC electricity + heat. Two technology variants: PEM (Proton Exchange Membrane — lower temperature 60-80 °C, smaller residential units); SOFC (Solid Oxide Fuel Cell — high temperature 600-1000 °C, higher efficiency, niche premium). UK 2025-26: Viessmann Vitovalor PT2 (PEM, sub-1 kWe), BlueGen BG-15 (SOFC, 1.5 kWe). 0.7-1.5 kWe + 1-3 kWth typical. Fuel cell advantages: quieter, longer life, higher electrical efficiency, lower emissions. Disadvantages: high upfront cost, limited service network, smaller heat output. Internal combustion micro-CHP: standard Otto / Diesel cycle engine + generator. Honda Ecowill widespread globally, limited UK presence. From BS 7671 perspective: all three architectures are Section 551 generating sets (Reg 551.1.1(a) combustion engines for Stirling + IC; Reg 551.1.1(f) other suitable sources for fuel cell). Same anti-islanding + supply-side connection requirements.',
  },
  {
    id: 'm9s5-section-551-erec',
    question: 'A 1.5 kWe SOFC fuel cell micro-CHP single-phase grid-tied — what EREC notification?',
    options: [
      'A formal G99 pre-installation application is required because all fuel cells are Type B',
      'About 6.5 A export sits under the G98 ≤16 A threshold, so G98 fast-track applies; Section 551 still in full',
      'No DNO notification is needed at all because the output is consumed on-site first',
      'It needs no electrical notification, only a Gas Safe sign-off for the gas reformer',
    ],
    correctIndex: 1,
    explanation:
      'Small micro-CHP fits EREC G98 fast-track. 1.5 kWe single-phase ≈ 6.5 A continuous export at 230 V — well within the G98 Type A ≤16 A per phase threshold. G98 process: post-installation notification via DNO portal (online form within 28 days of commissioning); DNO acknowledges + records. Simpler + faster than G99 (no formal pre-installation application). UK 2025-26 reality: some DNOs prefer notification of ALL generation regardless of size (via dedicated generation portal); verify with local DNO at design stage. Section 551 + Reg 551.7.5 anti-islanding STILL apply — G98 fast-track notification does NOT exempt from anti-islanding verification at commissioning. Reg 551.7.2.1 supply-side connection STILL applies — fuel cell sits on supply side of all protective devices. Reg 551.4.2 RCD effectiveness STILL applies. EREC G98 is the DNO notification process; Section 551 is the BS 7671 safety framework — both must be satisfied. Cert evidence bundle: DNO G98 notification reference + Section 551 compliance + Reg 551.7.5 commissioning test + MCS MIS 3007 handover + BS 7671 EIC.',
  },
];

const quizQuestions = [
  {
    question: 'Domestic install: 1 kWe Viessmann Vitovalor fuel cell micro-CHP + existing gas boiler — what scope?',
    options: [
      'A plug-in unit on a standard 13 A socket-outlet needing no dedicated circuit or notification',
      'A gas-only job where the electrician simply connects it to an existing spare socket-outlet',
      'A multi-trade install — dedicated circuit, Reg 551 anti-islanding, supply-side connection, G98 and EIC',
      'An electrical-only job needing no gas-safe engineer, because the fuel cell makes its own hydrogen',
    ],
    correctAnswer: 2,
    explanation:
      'Domestic 1 kWe fuel cell micro-CHP install: multi-trade. (1) MCS-certified company (MIS 3007) holds customer relationship + grant claim. (2) Gas-safe engineer handles fuel cell gas supply (natural gas to fuel cell reformer); separate competence. (3) Heating engineer integrates fuel cell heat output (typical 2 kWth at 60-70 °C) with existing boiler + DHW cylinder + heating circuit. (4) BS 7671 electrician scope: dedicated 16 A single-phase circuit from CU (fuel cell electrical demand: 1 kWe export when running, plus internal control loads 100-200 W when active OR standby); Type A RCBO C-curve; AC isolator at fuel cell unit (BS EN 60947-3); cable per Reg 525.202 voltage drop calc. Reg 551 framework: Reg 551.7.5 anti-islanding integrated in fuel cell inverter (verified at commissioning via simulated grid loss); Reg 551.7.2.1 supply-side connection; Reg 551.4.2 RCD coordination if site has other generation (existing PV typical). EREC G98 fast-track notification (1 kWe = 4 A < 16 A per phase threshold). BS EN 50549-1 + BS EN 50438 grid-connection product standards declared by manufacturer. Cert evidence bundle: BS 7671 EIC + Section 551 compliance + Reg 551.7.5 commissioning test + EREC G98 reference + MCS MIS 3007 handover + Gas Safe commissioning record (separate) + heating engineer integration record. Total project ~£12-18k typical; electrical scope ~£500-700.',
  },
  {
    question: 'Reg 551.7.5 anti-islanding for micro-CHP — how is it verified?',
    options: [
      'An insulation-resistance test on the CHP supply cable confirms the anti-islanding function',
      'A visual check that the inverter is BS EN 50549 labelled is sufficient proof on its own',
      'Measuring the CHP export current with a clamp meter under normal running proves it works',
      'A simulated grid-loss test — confirm it disconnects in time and reconnects after the delay',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 551.7.5 anti-islanding commissioning verification — applies to every Section 551 generating set including micro-CHP. Method: (1) Pre-test verification — confirm anti-islanding device (typically integrated in CHP control electronics) is enabled + configured per manufacturer DoC. (2) Simulated grid-loss test — typically by opening the main supply isolator OR a manufacturer-specified disconnection method. Some manufacturers provide a test feature in the controller (loss-of-mains simulation). (3) Observe anti-islanding response — CHP control system detects voltage / frequency deviation; disconnects CHP electrical output from grid within manufacturer-specified time (typical 200ms-1s per ENA EREC G99 + G98 specifications). (4) Verify CHP STOPS generating (no continued export) — at the meter or via clamp meter. (5) Restore supply — close main isolator. (6) Verify reconnect delay — CHP waits manufacturer-specified time (typically 1-3 minutes) before resuming export; ensures grid is stable + prevents oscillating reconnect. (7) For some DNOs OR larger installs (commercial CHP >50 kWe): DNO-witnessed test mandatory per G99. For micro-CHP <50 kWe + G98 fast-track: customer-side commissioning typically sufficient. Cert evidence bundle records: anti-islanding device type (per manufacturer DoC) + commissioning test method + result + DNO-witnessed if applicable.',
  },
  {
    question: 'Reg 551.7.2.1 supply-side connection — practical install meaning?',
    options: [
      'The output connects on the supply side of all protective devices, before any RCD/RCBO/MCB',
      'The CHP output should connect into a spare way on the load side of the main RCD',
      'The CHP must connect downstream of the final-circuit RCBOs that it is feeding',
      'The CHP can connect to any convenient socket-outlet final circuit in the property',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 551.7.2.1 — generating set on supply side of all protective devices. Practical meaning for micro-CHP install: CHP electrical output cable connects to the installation\'s electrical infrastructure at the CONSUMER UNIT INCOMING busbar OR a dedicated supply-side bus arrangement — BEFORE any RCD / RCBO / MCB protecting load circuits. NOT on the load side of any protective device. Reasons: (1) Fault current contribution from CHP must be visible to protective devices for correct coordination — if CHP is load-side of an RCD, an upstream fault may not see the CHP\'s contribution; (2) RCDs in the installation must remain effective for every combination of sources (Reg 551.4.2) — load-side connection breaks this; (3) Isolation works in both energy directions — CHP isolated correctly when the supply-side switch operates. Implementation: typically a dedicated supply-side terminal or a sub-distribution panel between meter + main CU. Reg 551.7.1 prohibits source connection on load side of certain RCDs (specifically). BESS classification per Reg 551.7.2.1 = generating set (not load) — same rule applies. PV inverter + wind inverter + hydro inverter + CHP + BESS all sit on supply side. Cert evidence bundle records connection topology + protective device hierarchy verification + Reg 551.4.2 multi-source RCD test result.',
  },
  {
    question: 'UK 2025-26 micro-CHP market reality — what should an installer know?',
    options: [
      'It is booming, outselling heat pumps for new residential low-carbon heating installs',
      'It is now the default mass-market choice for most new domestic low-carbon installs',
      'It is niche — Stirling has exited, fuel cells are premium, and heat pump + PV+BESS dominate',
      'It has been withdrawn from the UK market entirely, with no products now available',
    ],
    correctAnswer: 2,
    explanation:
      'UK 2025-26 micro-CHP market is niche + selective. (1) Stirling engine variant largely exited the market 2014-2018: Whispergen wound down; Baxi Ecogen discontinued for new sales (replacements / spares ongoing). Reasons: high upfront cost vs heat pump + PV combination; declining FIT support; reliability concerns; market preference shift. (2) Fuel cell variant ongoing but premium / niche: Viessmann Vitovalor PT2 (~£14-18k installed) + BlueGen BG-15 (~£15-20k installed) — limited UK service network; longer payback. (3) Internal combustion variant: Honda Ecowill widespread in Japan + parts of Europe; limited UK install presence. (4) Market displacement: heat pump dominant for low-carbon heating (M8); PV + BESS dominant for low-carbon electricity (M2-M5). Micro-CHP gets squeezed in the middle. Genuine niche viable use cases: customers with high simultaneous heat + electrical demand (B&B, hospitality, residential care); off-grid properties (no grid to connect heat pump electrical demand to); customers anticipating hydrogen-ready future (some fuel cells are hydrogen-compatible). Honest installer answer: most customers better served by heat pump + PV + BESS combination than micro-CHP. Cert evidence bundle records the customer\'s informed choice + sizing rationale.',
  },
  {
    question: 'Fuel cell hydrogen-ready upgrade path — UK 2025-26 reality?',
    options: [
      'No fuel cell can ever run on hydrogen, so the hydrogen-ready label is pure marketing fiction',
      'Hydrogen-ready fuel cells already run on a mains hydrogen supply right across the UK today',
      'Every gas network has been converted to a 20% hydrogen blend, so all units run on it now',
      'Some are hydrogen-capable via update, but UK hydrogen is mostly policy — be honest on timeline',
    ],
    correctAnswer: 3,
    explanation:
      'Fuel cell hydrogen-ready capability: some current PEM + SOFC fuel cell models are designed for natural gas now, with documented upgrade paths to hydrogen-blend (typical 20% blend per HyDeploy spec) or pure hydrogen via firmware / hardware update. Hydrogen-ready marketing common 2024-2026. UK 2025-26 hydrogen reality: predominantly POLICY DIRECTION + LIMITED TRIALS, NOT widespread deployment. (1) HyDeploy trials at Keele University + Winlaton — 20% hydrogen blend in natural gas at limited sites; continues at trial scale. (2) Hydrogen heating village trials (Whitby, Redcar) cancelled / scaled back over public + technical concerns. (3) Strategic decision on UK hydrogen for heating deferred — originally targeted 2026, now later or possibly no widespread deployment. (4) Customer\'s actual gas supply unlikely to be hydrogen-blended or pure-hydrogen in foreseeable future. Honest customer position: hydrogen-ready capability is future-proofing value; current operation is on natural gas. Don\'t oversell the hydrogen narrative. Cert evidence bundle records the fuel cell\'s hydrogen-ready specification + upgrade path documentation + customer expectations.',
  },
  {
    question: 'Commissioning a fuel cell micro-CHP — what differs from a Stirling engine?',
    options: [
      'Both need identical combustion flue-gas analysis and engine oil checks at commissioning',
      'A fuel cell adds electrochemical warm-up, cell-stack health and reformer commissioning steps',
      'A fuel cell needs only an electrical test, while a Stirling needs no commissioning at all',
      'A Stirling unit needs electrochemical stack commissioning that a fuel cell simply does not',
    ],
    correctAnswer: 1,
    explanation:
      'Fuel cell commissioning differs significantly from combustion-engine CHP due to fundamental architecture: (1) Cell stack warm-up — fuel cell operates at specific temperature (PEM 60-80 °C, SOFC 600-1000 °C). Initial commissioning includes controlled warm-up to operating temperature; can take 1-3 hours for PEM, longer for SOFC. (2) Membrane / cell stack health monitoring — controller reports per-cell voltage + current + state-of-health; commissioning baseline established. (3) Hydrogen reformer commissioning — natural gas is catalytically reformed to hydrogen-rich reformate on-board; reformer temperature + steam ratio + gas composition all monitored at commissioning. (4) Electrochemical operation — no combustion noise (much quieter than IC / Stirling); operating quietly. (5) Electrical commissioning per Section 551 + Reg 551.7.5 + EREC G98 / G99 framework — same as other Section 551 generating sets. Stirling engine commissioning: gas combustion verification (HETAS or gas-safe), flue commissioning (BS EN 15287), engine + generator commissioning per manufacturer procedure (oil-free design, sealed working fluid), shorter start cycle (minutes), engine noise during operation. IC engine commissioning: standard engine commissioning, lubrication, exhaust system, generator. Cert evidence bundle: fuel cell - electrochemical commissioning record + Section 551 EIC; Stirling - gas-safe + HETAS + Section 551 EIC; IC engine - mechanical + electrical commissioning.',
  },
];

const faqs = [
  {
    question: 'Why is BS EN 50549 important for micro-CHP?',
    answer:
      'BS EN 50549-1 + -2: power generators connected to low-voltage / medium-voltage networks. Product standard covering generator-to-grid connection requirements (voltage / frequency limits, anti-islanding, protection settings, communication). Manufacturer DoC declares conformity. Reg 551.7.5 anti-islanding compliance evidenced via BS EN 50549. EREC G99 references BS EN 50549 directly. Replaces older standards like BS EN 50438.',
  },
  {
    question: 'Can micro-CHP integrate with PV + BESS + heat pump on the same site?',
    answer:
      'Yes — Chapter 82 PEI (Prosumer\'s Electrical Installation) framework integrates multiple sources. Reg 826.x family covers. Each source under Section 551; Reg 551.4.2 RCD multi-source effectiveness; per-source anti-islanding; EREC G99 formal application for the aggregate site. UK 2025-26 reality: micro-CHP + PV + BESS combinations rare due to overlapping function (CHP+heat pump both heat; CHP+PV both generate); customer typically picks one approach.',
  },
  {
    question: 'EICR cycle for micro-CHP install?',
    answer:
      'BS 7671 EICR: 10-year owner-occupied domestic; 5-year landlord-rented; 5-year commercial. Micro-CHP EICR items: per-circuit RCD trip-time + Section 551 compliance + Reg 551.7.5 anti-islanding still operational (functional test via simulated grid-loss) + Reg 551.4.2 multi-source RCD if other generation present + manufacturer-specified service schedule (typically annual for fuel cells, 2-yearly for Stirling, oil + filter for IC). MCS MIS 3007 service requirements also apply.',
  },
  {
    question: 'Smart Export Guarantee (SEG) tariff + micro-CHP?',
    answer:
      'SEG = UK Government tariff for renewable / low-carbon electricity export. Applies to PV, wind, hydro, anaerobic digestion, micro-CHP. Tariff rates vary by supplier (Octopus, Bulb (Octopus), OVO, Drax, Good Energy etc.) — typically 4-15p / kWh exported. Customer signs SEG contract with supplier; export metering installed (smart meter typical); supplier pays for exported energy. Doesn\'t apply when CHP consumed on-site (only export). M10 covers SEG in detail.',
  },
  {
    question: 'Reg 551.4.2 RCD effectiveness — practical micro-CHP example?',
    answer:
      'Site with PV + micro-CHP + grid. Three sources can feed the installation simultaneously OR in different combinations. RCD must trip correctly for fault on any circuit regardless of which sources are active. Practical: per-source RCD on each generator (PV, CHP); central RCD architecture (main RCD + per-circuit RCBOs) coordinates with per-source RCDs. Reg 531.3.6 discrimination + Reg 551.4.2 multi-source verification at commissioning (induce fault under each combination; verify trip).',
  },
];

export default function RenewableEnergyModule9Section5() {
  const navigate = useNavigate();

  useSEO({
    title: 'Micro-CHP (domestic) + Section 551 | Renewable Energy 9.5 | Elec-Mate',
    description:
      'Micro-CHP (Combined Heat and Power) for domestic + light-commercial. Stirling engine, fuel cell, internal combustion variants. BS 7671 Section 551 framework deep — Reg 551.1.1 + 551.7.5 anti-islanding + 551.7.2.1 supply-side + 551.4.2 multi-source RCD. MCS MIS 3007 + EREC G98 / G99 + BS EN 50549.',
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
            eyebrow="Module 9 · Section 5 · BS 7671:2018+A4:2026 · Section 551 + Reg 551.7.5 + MCS MIS 3007 + BS EN 50549"
            title="Micro-CHP (domestic) + Section 551 deep"
            description="Micro-CHP (Combined Heat and Power) for domestic + light-commercial — Stirling engine, fuel cell (PEM + SOFC), internal combustion variants. BS 7671 Section 551 framework deep — Reg 551.1.1 power source + Reg 551.7.5 anti-islanding + Reg 551.7.2.1 supply-side connection + Reg 551.4.2 multi-source RCD effectiveness. MCS MIS 3007 + EREC G98 / G99 + BS EN 50549 grid-connection standard."
            tone="yellow"
          />

          <TLDR
            points={[
              'CHP = Combined Heat and Power. Generates BOTH electricity AND useful heat from a single fuel source. Combined efficiency 80-90% (~2× separate grid + boiler).',
              'Section 551 framework applies — Reg 551.1.1(a) combustion engines (Stirling + IC) or (f) other suitable sources (fuel cells). Reg 551.7.5 anti-islanding mandatory.',
              'Micro-CHP scope (this section): ≤50 kWe — domestic + light-commercial. MCS MIS 3007 installer standard. Commercial CHP >50 kWe covered §9.6.',
              'Three technology variants: Stirling engine (market largely exited UK), fuel cell (PEM + SOFC — niche premium), internal combustion (limited UK presence).',
              'Typical micro-CHP: 0.7-2 kWe + 1-25 kWth (heat-led sizing). Single-phase typical. EREC G98 fast-track for ≤16 A; G99 for larger / multi-source.',
              'Reg 551.7.5 anti-islanding verified at commissioning via simulated grid-loss test (manufacturer self-test feature OR open main supply isolator + observe disconnect within manufacturer time spec).',
              'Reg 551.7.2.1 supply-side connection — CHP electrical output sits on supply side of all protective devices; never load-side.',
              'UK 2025-26 market reality: micro-CHP is niche. Heat pump + PV + BESS dominates low-carbon residential. Micro-CHP niche: high simultaneous heat + electrical demand (B&B, hospitality), off-grid, hydrogen-ready future.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define CHP + understand the combined heat + electrical generation value proposition.',
              'Distinguish Stirling engine / fuel cell / IC micro-CHP technology variants + UK 2025-26 market reality.',
              'Apply Section 551 framework deep — Reg 551.1.1 + 551.7.5 + 551.7.2.1 + 551.4.2 — to micro-CHP install.',
              'Verify Reg 551.7.5 anti-islanding at commissioning via simulated grid-loss test.',
              'Apply Reg 551.7.2.1 supply-side connection topology in practice.',
              'Apply MCS MIS 3007 installer framework + BS EN 50549 grid-connection product standard.',
              'Choose EREC G98 vs G99 path per micro-CHP output size.',
              'Recognise UK 2025-26 niche use cases for micro-CHP vs the dominant heat pump + PV alternative.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            CHP is the only Section 551 technology that does heat AND electricity from one fuel. The double duty makes Section 551 + heat-network integration intersect — manage both or fail both.
          </Pullquote>

          <ContentEyebrow>CHP value proposition + technology variants</ContentEyebrow>

          <ConceptBlock
            title="What CHP is + why it matters"
            plainEnglish="CHP (Combined Heat and Power) generates both electricity AND useful heat from a single fuel source. Combined efficiency 80-90% (vs grid electricity ~35-40% + boiler heat ~85% separately) = roughly 2× primary-energy efficiency. The waste heat from electrical generation is captured + used locally for space heating + DHW."
            onSite="UK 2025-26 micro-CHP market is niche but real. Customer use cases: high simultaneous heat + electrical demand (always running heat = always running CHP = high utilisation), off-grid properties (CHP provides electrical generation where no grid; less common than PV + battery), hydrogen-ready future investment."
          >
            <p>CHP value comparison:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Separate grid + gas
                  boiler</strong> — grid electricity ~35-40% efficient at point of
                generation (centralised power station + transmission losses); gas
                boiler ~85-90% efficient for heat. Combined ~50% primary-energy
                efficient overall (depending on demand split)
              </li>
              <li>
                <strong className="text-white">CHP combined</strong>
                — single fuel converts to electricity (~25-30%) + heat (~55-65%) =
                total useful output ~80-90% of fuel input. Roughly 2× primary-energy
                efficiency vs separate
              </li>
              <li>
                <strong className="text-white">Heat-led sizing</strong>
                — typical micro-CHP design: size CHP to match site heat demand;
                electrical output is the by-product. Avoids dumping excess heat (which
                negates the CHP value proposition)
              </li>
              <li>
                <strong className="text-white">Electrical
                  output</strong> — typical micro-CHP 0.7-2 kWe; mostly consumed
                on-site (powering lights / appliances) with small surplus export to
                grid
              </li>
              <li>
                <strong className="text-white">Heat output</strong>
                — typical micro-CHP 1-25 kWth depending on technology. Matches
                domestic central heating + DHW demand
              </li>
              <li>
                <strong className="text-white">Fuel</strong> —
                natural gas dominant; biogas / biofuel / hydrogen variants emerging
              </li>
              <li>
                <strong className="text-white">UK 2025-26 reality</strong>
                — micro-CHP niche; heat pump + PV + BESS dominates residential
                low-carbon. CHP commercial / industrial widespread (covered §9.6)
              </li>
              <li>
                <strong className="text-white">Customer
                  appropriateness</strong> — high simultaneous heat + electrical
                demand sites (B&B, residential care, off-grid properties, hospitality)
              </li>
            </ul>
          </ConceptBlock>

          <MicroChpFlow caption="Micro-CHP makes electricity and useful heat from one fuel input — a grid-parallel generating set." />

          <ConceptBlock
            title="Three micro-CHP technology variants"
            plainEnglish="Three main micro-CHP architectures: Stirling engine (external combustion + piston generator — market largely exited UK), fuel cell (electrochemical — PEM + SOFC variants — niche premium), internal combustion engine (Otto / Diesel cycle + generator — limited UK)."
            onSite="UK 2025-26: fuel cell variant has the most ongoing market presence (Viessmann Vitovalor, BlueGen — premium). Stirling: replacement / spares only. IC: limited UK installs."
          >
            <p>Variant comparison:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Stirling engine
                  micro-CHP</strong> — external combustion (gas flame heats sealed
                working fluid) + piston-driven generator. 1-2 kWe + 5-25 kWth. UK
                market largely exited 2014-2018: Whispergen wound down, Baxi Ecogen
                discontinued. Reg 551.1.1(a) combustion engine
              </li>
              <li>
                <strong className="text-white">Fuel cell
                  micro-CHP — PEM</strong> — Proton Exchange Membrane fuel cell;
                operates 60-80 °C; hydrogen-rich reformate from natural gas reacts
                with oxygen at electrolyte → DC electricity + heat. 0.7-1.5 kWe + 1-3
                kWth typical. UK: Viessmann Vitovalor PT2 (~£14-18k installed).
                Reg 551.1.1(f) other suitable sources
              </li>
              <li>
                <strong className="text-white">Fuel cell
                  micro-CHP — SOFC</strong> — Solid Oxide Fuel Cell; high temperature
                (600-1000 °C); higher efficiency. UK: BlueGen BG-15 1.5 kWe (~£15-20k
                installed). Reg 551.1.1(f)
              </li>
              <li>
                <strong className="text-white">IC micro-CHP</strong>
                — internal combustion engine (Otto / Diesel) + generator. Honda
                Ecowill globally widespread; limited UK presence. 1-3 kWe + 2-8 kWth.
                Reg 551.1.1(a) combustion engine
              </li>
              <li>
                <strong className="text-white">Hydrogen-ready
                  variant</strong> — some fuel cell models documented hydrogen-blend
                or pure-hydrogen upgrade path (firmware / hardware). Marketing
                position; UK hydrogen supply largely unavailable to date
              </li>
              <li>
                <strong className="text-white">Section 551
                  applicability</strong> — all three variants: Reg 551.7.5
                anti-islanding, Reg 551.7.2.1 supply-side, Reg 551.4.2 RCD
              </li>
              <li>
                <strong className="text-white">EREC notification</strong>
                — most micro-CHP at ≤16 A per phase export → G98 fast-track. Larger /
                multi-source / co-located generation → G99 formal
              </li>
              <li>
                <strong className="text-white">MCS competence</strong>
                — MIS 3007 micro-CHP installer standard
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.5 — Anti-islanding for micro-CHP (verified by simulated grid-loss test)"
            clause="Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4. NOTE: For a generating set with an output not exceeding 16 A intended to operate in parallel with a system for distribution of electricity to the public, the requirements are given in BS EN 50549-1. Separately, the ENA Engineering Recommendations — G98 (up to and including 16 A per phase) and G99 (greater than 16 A per phase) — set the DNO notification and connection framework for parallel operation; they are the connection-process route, not a deemed-to-satisfy substitute for Reg 551.7."
            meaning="Reg 551.7.5 applies to every micro-CHP generating set. Anti-islanding device typically integrated in the CHP control electronics (inverter or generator controller); detection methods include ROCOF + voltage / frequency deviation + active anti-islanding methods. Note: G99 disallows Vector Shift for type-tested generation, so RoCoF (with voltage / frequency protection) is the standard required LoM method for the type-tested micro-CHP / inverter units used in virtually all LCT installs; Vector Shift is legacy and only appears on older or non-type-tested sites. Commissioning verification mandatory: simulated grid-loss test (open main supply isolator OR manufacturer self-test feature) → observe CHP disconnect from grid within manufacturer-specified time (typical 200ms-1s per ENA EREC G99 + G98). Verify CHP stops generating (no continued export at meter). Restore supply; verify reconnect delay (typical 1-3 min). The NOTE clarifies that G98 compliance deems Reg 551.7 satisfied for ≤16 A small generators. Cert evidence bundle: anti-islanding device per manufacturer DoC + commissioning test method + result. For commercial CHP >50 kWe + G99: DNO-witnessed test typical (covered §9.6)."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Section 551 framework applied + RCD coordination</ContentEyebrow>

          <Pullquote>
            Anti-islanding, supply-side connection, multi-source RCD. Three Section 551 rules; non-negotiable on every CHP install.
          </Pullquote>

          <ConceptBlock
            title="Reg 551.7.2.1 supply-side connection — practical implementation"
            plainEnglish="CHP electrical output connects to the supply side of all protective devices in the installation — typically at the consumer unit incoming busbar before any RCD / RCBO / MCB. NOT on the load side of any protective device. Ensures correct protective device coordination + RCD effectiveness across source combinations."
            onSite="Practical install: dedicated supply-side terminal at the CU OR a sub-distribution panel between meter + main CU. Some CUs have a dedicated generation incoming way; others require additional supply-side terminal block. Cert evidence bundle documents the connection topology."
          >
            <p>Supply-side connection in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Connection point</strong>
                — CHP electrical output cable terminates at: (a) dedicated
                generation incoming terminal at the CU (some modern CUs have this),
                OR (b) sub-distribution / Henley block between meter + main CU, OR
                (c) supply-side terminal block at the meter tails
              </li>
              <li>
                <strong className="text-white">Protective device
                  hierarchy</strong> — CHP supply enters before main RCD + RCBOs.
                Fault current contribution from CHP visible to all downstream
                protective devices
              </li>
              <li>
                <strong className="text-white">Reg 551.7.1
                  prohibition</strong> — source must NOT be connected on the load
                side of an RCD under certain conditions. Practical: never put CHP
                output downstream of an RCD that protects load circuits
              </li>
              <li>
                <strong className="text-white">AC isolator</strong>
                — between CHP electrical output + supply-side connection point.
                Lockable in OFF position (BS EN 60947-3). For service / maintenance
                isolation
              </li>
              <li>
                <strong className="text-white">Per-source
                  protective device</strong> — typically a dedicated 16 A or 20 A
                Type A RCBO C-curve on the CHP supply line; provides over-current +
                fault protection for the CHP cable. Coordinates with the main RCD
                architecture
              </li>
              <li>
                <strong className="text-white">BESS classification</strong>
                — Reg 551.7.2.1 explicitly: BESS treated as generating set, not load.
                Same supply-side connection topology applies (covered M5 BESS)
              </li>
              <li>
                <strong className="text-white">Multi-source
                  site</strong> — PV + BESS + CHP + grid all coexist on supply side.
                Coordinated protective device hierarchy + Reg 551.4.2 RCD
                effectiveness verification at commissioning
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — connection topology diagram + protective device
                hierarchy + commissioning test result
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 551.4.2 multi-source RCD effectiveness"
            plainEnglish="Reg 551.4.2: any RCD protection in the installation must remain effective for every intended combination of sources operating. Practical: induce fault under each combination at commissioning; verify the appropriate RCD trips. Multi-source CHP install requires this verification."
            onSite="UK 2025-26 multi-source domestic install commonly = PV + BESS + CHP + grid. Four sources. Each combination must trigger RCD correctly. Per-source RCD + central RCD architecture + commissioning test under each combination."
          >
            <p>Multi-source RCD considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-source RCD</strong>
                — each generator has its own RCD on its supply connection. CHP: 30 mA
                Type A typical (or Type B per manufacturer DoC for VSD electronics).
                PV / BESS: 30 mA Type B per manufacturer DoC (modern inverters declare
                Type B per BS EN 62423)
              </li>
              <li>
                <strong className="text-white">Central RCD
                  architecture</strong> — main RCD Type S 100 mA (time-delayed
                upstream) + per-circuit 30 mA RCBOs. Reg 531.3.6 discrimination
              </li>
              <li>
                <strong className="text-white">Combinations to
                  test at commissioning</strong> — induce fault on a sample circuit
                under: grid-only, grid + PV, grid + CHP, grid + BESS, grid + PV + CHP,
                grid + PV + CHP + BESS, etc. Verify appropriate RCD trips for each
              </li>
              <li>
                <strong className="text-white">RCD type
                  selection</strong> — Reg 531.3.3 prohibits Type AC where DC
                components present (CHP with VSD electronics produces pulsating DC).
                Type A minimum; Type F or B per manufacturer DoC
              </li>
              <li>
                <strong className="text-white">Reg 551.7.1(d)
                  prohibition</strong> — source must NOT be connected on load side of
                an RCD under certain conditions. Practical: never put CHP load-side
                of any RCD that would not see the CHP\'s fault contribution
              </li>
              <li>
                <strong className="text-white">Type B for fuel
                  cell + IC variants</strong> — VSD electronics in modern micro-CHP
                produce smooth DC fault current; Type B RCD per manufacturer DoC if
                declared
              </li>
              <li>
                <strong className="text-white">Coordination
                  verification</strong> — sequential trip-time test (downstream RCBO
                trips first; upstream Type S follows after delay only if downstream
                fails)
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — RCD architecture diagram + per-source RCD + central
                RCD + per-combination commissioning test result + Reg 551.4.2
                compliance verified
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.2.1 — Generating set on supply side"
            clause="The generating set is to be installed on the supply side of all the protective devices for the final circuits of a distribution board, and stationary batteries (Chapter 57) are to be considered a generating set and not a load."
            meaning="Reg 551.7.2.1 is the fundamental electrical-architecture rule for Section 551 generating sets — applies to micro-CHP equally with PV, wind, hydro, BESS. CHP electrical output enters the installation on the supply side of all protective devices (at the CU incoming busbar, OR a sub-distribution panel between meter + main CU). NEVER on the load side of any protective device. Reasons: (1) protective devices coordinate correctly with CHP fault contribution; (2) RCDs see all relevant fault paths per Reg 551.4.2; (3) isolation works correctly when energy flows in either direction. BESS explicitly: treated as generating set (not load) per the same rule — covered in M5. Multi-source sites: all generation sources on supply side, coordinated central + per-source protective device architecture. Cert evidence bundle: connection topology diagram + protective device hierarchy + multi-source RCD verification at commissioning."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Domestic Viessmann Vitovalor PT2 fuel cell micro-CHP retrofit"
            situation="4-bed detached. Existing gas combi boiler being supplemented with a fuel cell micro-CHP for primary baseload heat + electricity. Customer is hydrogen-ready / future-proofing motivated; accepts premium upfront cost (£14-18k). Existing PV + BESS already installed (Chapter 82 PEI site). UK 2025-26."
            whatToDo="Multi-trade: MCS company (MIS 3007) + gas-safe engineer (fuel cell gas supply + reformer) + heating engineer (heat output integration with existing boiler + cylinder) + BS 7671 electrician. Electrical scope: (1) Dedicated 16 A single-phase circuit from CU; Type A RCBO C-curve + 30 mA additional protection per Reg 415.1; 2.5 mm² T+E. (2) CHP electrical output to dedicated supply-side terminal at CU (existing PV + BESS already supply-side connected from the M2-M5 install — fuel cell joins the same supply-side bus). (3) AC isolator at CHP unit (BS EN 60947-3 lockable OFF) for service / maintenance. (4) Section 551 compliance: Reg 551.7.5 anti-islanding integrated in fuel cell controller (verify at commissioning via simulated grid-loss test); Reg 551.7.2.1 supply-side connection; Reg 551.4.2 RCD effectiveness verified across PV + BESS + CHP + grid combinations. (5) EREC G98 fast-track notification (1 kWe = ~4 A < 16 A per phase) — though existing PV + BESS site may already be on G99; verify with DNO whether new G99 amendment needed or G98 amendment to existing G99 reference. Multi-trade integration: gas-safe engineer commissions fuel cell gas supply + reformer; heating engineer integrates heat output with existing cylinder + heating; MCS company orchestrates handover. Cert evidence bundle: BS 7671 EIC + Section 551 compliance + Reg 551.4.2 multi-source RCD test + MCS MIS 3007 handover + Gas Safe + heating engineer integration. Total project ~£14-18k; electrical scope ~£500-800. Customer expectation: ~1 kWe electrical generation continuous (typical winter); export to grid via SEG tariff (covered M10); hydrogen-ready future capability documented."
            whyItMatters="Hydrogen-ready fuel cell + multi-source PEI is one of the more sophisticated UK 2025-26 domestic Section 551 + Chapter 82 installs. Customer motivation is future-proofing + sustainability + the value of high simultaneous heat + electrical generation. Cert evidence bundle integrates Section 712 (PV) + Chapter 57 (BESS) + Section 551 (CHP) + Chapter 82 (PEI) coherently. Demonstrates the multi-trade coordination + the BS 7671 electrician\'s scope within the wider install."
          />

          <Scenario
            title="Off-grid Highland cottage — 2 kWe IC engine CHP + BESS"
            situation="Remote Highland cottage with no grid connection. Customer has decided against grid-connection cost (~£40k for 2 km supply extension) + chosen off-grid renewable. Existing PV array (4 kWp) + small wind (~3 kW) + 20 kWh lead-acid BESS. Heating need + winter electrical demand exceeding PV / wind capacity → adding 2 kWe IC engine CHP (LPG-fuelled) as winter / dark-day backup."
            whatToDo="Off-grid Section 551 install — no EREC G98 / G99 (no grid). Section 551 framework still applies (Reg 551.1.1(a) combustion engine; Reg 551.4.2 RCD effectiveness across PV + wind + CHP + BESS combinations). Reg 551.7.5 anti-islanding NOT applicable (no public supply to island against) BUT dump load / over-speed protection per manufacturer design. Electrical scope: dedicated 16 A circuit from off-grid AC supply panel; Type A RCBO C-curve; AC isolator at CHP for service. Heat output integrated with existing DHW cylinder + heating circuit. LPG fuel supply per Gas Safe / LPGA. CHP electrical output integrates with grid-forming inverter architecture (off-grid sites use grid-forming inverters, not grid-following — covered M10). Cert evidence bundle: BS 7671 EIC + Section 551 compliance + off-grid AC supply architecture + Gas Safe LPG commissioning + heating engineer integration + multi-source RCD verification. Total project ~£8-12k; electrical scope ~£400-600."
            whyItMatters="Off-grid sites with diversified renewable + CHP backup are a real UK 2025-26 niche — remote Highland / island properties, agricultural sites, conservation properties. Section 551 framework applies fully but EREC G98 / G99 + grid-tied anti-islanding don\'t (no grid). Cert evidence bundle documents the off-grid architecture + multi-source coordination. Grid-forming inverter detail covered M10."
          />

          <CommonMistake
            title="Connecting CHP load-side of an RCD"
            whatHappens="Lazy install routes CHP electrical output through an existing RCD-protected sub-circuit (treating CHP as just another load). Reg 551.7.2.1 violation. Reg 551.4.2 RCD effectiveness compromised — fault current contribution from CHP may not be seen correctly by the protective devices. Safety + compliance failure. EICR finding C1 / C2 depending on severity."
            doInstead="Reg 551.7.2.1 is non-negotiable: CHP on supply side of ALL protective devices. Install at CU incoming busbar OR dedicated supply-side terminal between meter + main CU. AC isolator + per-source 16 A RCBO on the CHP supply line. NEVER load-side of an RCD. Cert evidence bundle documents the connection topology + protective device hierarchy + Reg 551.4.2 RCD effectiveness test."
          />

          <CommonMistake
            title="Skipping Reg 551.4.2 multi-source RCD test at commissioning"
            whatHappens="Multi-source site (PV + BESS + CHP + grid). Commissioning verifies each source individually but doesn\'t test fault scenarios under the combinations. Months later, real fault occurs with PV + CHP + grid active simultaneously — RCD response is non-optimal; either over-trips (loses too much) or fails to trip cleanly. Customer issue + reputation."
            doInstead="Reg 551.4.2 requires RCD effectiveness for EVERY intended combination of sources operating. Commissioning sequence: (1) Test each source individually (PV-only, BESS-only, CHP-only); (2) Test each pair (PV+CHP, PV+BESS, BESS+CHP, PV+grid, BESS+grid, CHP+grid); (3) Test combinations (PV+BESS+grid, PV+CHP+grid, BESS+CHP+grid, all-active). Induce sample fault under each + verify trip. Cert evidence bundle records per-combination test result + Reg 551.4.2 compliance."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'CHP = Combined Heat and Power. Generates electricity + heat from single fuel. Combined efficiency 80-90% (~2× separate grid + boiler).',
              'Reg 551.1.1(a) combustion engines (Stirling + IC variants) OR Reg 551.1.1(f) other suitable sources (fuel cell variants). All Section 551 generating sets.',
              'Three micro-CHP technology variants: Stirling engine (UK market largely exited), fuel cell (PEM + SOFC — niche premium), internal combustion (limited UK).',
              'Typical micro-CHP: 0.7-2 kWe + 1-25 kWth (heat-led sizing). Single-phase typical. ≤16 A per phase usually fits EREC G98 fast-track.',
              'Reg 551.7.5 anti-islanding mandatory + verified at commissioning via simulated grid-loss test. Anti-islanding device integrated in CHP control.',
              'Reg 551.7.2.1 supply-side connection — CHP at CU incoming busbar OR dedicated supply-side terminal, NEVER load-side of protective devices.',
              'Reg 551.4.2 RCD effectiveness across every combination of sources. Multi-source commissioning tests each combination.',
              'RCD type per manufacturer DoC: Type A typical, Type B if VSD electronics produce smooth DC. Reg 531.3.3 prohibits Type AC where DC components.',
              'MCS MIS 3007 micro-CHP ≤50 kWe installer standard. BS EN 50549-1 + -2 grid-connection product standards.',
              'UK 2025-26 market reality: micro-CHP niche; heat pump + PV + BESS dominates residential low-carbon. Customer niche: high simultaneous heat + electrical demand, off-grid, hydrogen-ready future.',
              'Commercial CHP (>50 kWe) covered §9.6 — biofuel, biogas, hydrogen variants + grid services revenue + heat-network integration.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Biomass interfaces
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                9.6 Commercial CHP + biofuel / biogas / hydrogen
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
