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
    id: 'm11s6-pscc-multi-source',
    question:
      'What does PSCC at the customer side now include in a multi-source PEI?',
    options: [
      'Just DNO',
      'PSCC (Prospective Short-Circuit Current) at any point in the installation now includes contributions from: (1) DNO supply (the traditional source — limited by transformer + supply cable impedance); (2) PV inverter Isc contribution (limited to ~1.0-1.2× rated AC current by inverter electronics during a fault); (3) BESS inverter Isc contribution (similar limit, but BESS can sustain longer + may provide grid-forming current); (4) Wind / CHP / generator Isc (depends on machine type). Designer assesses total Ipscc + selects OCPD breaking capacity accordingly',
      'Random',
      'No change',
    ],
    correctIndex: 1,
    explanation:
      'PSCC (Prospective Short-Circuit Current) at the customer side in a multi-source PEI now has multiple contributors: (1) DNO supply — limited by the upstream LV transformer impedance + supply cable impedance + service fuse. Typical UK residential 16 kA at origin (sometimes lower); commercial 25-50 kA per supply. (2) PV inverter Isc — inverter electronics limit short-circuit contribution to ~1.0-1.2× rated AC current. For 5 kW inverter ~25 A nominal AC, Isc contribution ~25-30 A. Brief duration before inverter trips on internal protection. (3) BESS inverter Isc — similar electronics-limited Isc to PV; but BESS can sustain longer + grid-forming BESS may provide higher Isc per design. Manufacturer DoC declares. (4) Wind / CHP / generator Isc — depends on machine type. Synchronous generator with conventional excitation can provide several × rated current for fault clearance; permanent-magnet generator electronics-limited. (5) Reg 826.1.2.1 — overload + short-circuit currents shall be determined at every point of the PEI where a protective device is installed for all possible configurations + min + max magnitudes. Reg 826.1.2.3 — coordination of combined short-circuit protection across all power supplies. Cert evidence: per-point Ipscc calculation + OCPD breaking capacity selection.',
  },
  {
    id: 'm11s6-inverter-fault-current',
    question:
      'Why do PV / BESS inverters typically contribute LOWER fault current than the DNO supply?',
    options: [
      'Random',
      'Inverter electronics actively limit output current — IGBT switching, current sense + control loop trips inverter on overcurrent within milliseconds. Typical inverter Isc ~1.0-1.2× rated AC current vs DNO transformer supply which can deliver many × rated. Inverter "drops off" within ~50-100 ms after detecting fault. Engineering implication: fault clearance time matters; OCPD selection still per DNO max PSCC; inverter contribution is small but not zero',
      'Inverters bigger',
      'Same as DNO',
    ],
    correctIndex: 1,
    explanation:
      'PV / BESS inverters typically contribute LOWER fault current than DNO supply because: (1) Inverter electronics use IGBT switching with active current limiting — current sense + control loop monitors output current; on overcurrent (fault) detection, inverter trips internal protection within typically 50-100 ms. (2) Typical inverter Isc contribution = 1.0-1.2× rated AC current. For 5 kW single-phase inverter ~25 A nominal, Isc ~25-30 A briefly. (3) DNO transformer + supply impedance: a 500 kVA LV transformer at 5% impedance can deliver ~17 kA into a fault for cycles to seconds; service fuse / DNO protection clears. (4) Engineering implications: (a) OCPD selection at customer side must still handle DNO max PSCC (e.g. 16 kA at origin) — Reg 434 breaking capacity requirement. (b) Inverter Isc contribution is small + brief — doesn\'t typically change OCPD sizing but adds to disconnection-time calculations. (c) Fault clearance time matters: inverter must drop off fast enough that downstream OCPD coordinates properly. (d) Some grid-forming BESS designs deliberately provide higher fault current to support grid stability — manufacturer DoC declares. (5) Reg 826.1.2.1 PEI overcurrent assessment: include all contributions; min + max current scenarios; per protective device location.',
  },
  {
    id: 'm11s6-disconnection-time',
    question:
      'How do multiple sources affect disconnection time per Reg 411.3.2?',
    options: [
      'No effect',
      'Reg 411.3.2 disconnection times (0.4 s final circuits ≤32 A, 5 s distribution) require fault current to be high enough that OCPD operates within the time. In a multi-source PEI, fault current at a point depends on which sources are operating. Designer assesses fault current under each combination of sources + verifies disconnection time achievable for each. Reg 826.1.1.3 PEI: protective device selection shall consider minimum earth-fault current value. Min source combination = slowest disconnection; design must still meet times',
      'Random',
      'Slower always',
    ],
    correctIndex: 1,
    explanation:
      'Multi-source PEI disconnection-time impact per Reg 411.3.2 + Reg 826.1.1.3: (1) Reg 411.3.2 disconnection times — 0.4 s for final circuits ≤32 A in TN; 5 s for distribution circuits + final circuits >32 A. Requires fault current ≥ I_a (operating current of OCPD) for the time-current characteristic to clear within the limit. (2) Multi-source variability — fault current at a point depends on which sources are operating: DNO only; DNO + PV; DNO + PV + BESS; etc. Minimum source combination = slowest disconnection scenario. (3) Reg 826.1.1.3 PEI — protective device selection shall consider the minimum earth fault current value (between line conductors and PE). Minimum may occur when fewest sources are operating (e.g. night, no PV, BESS depleted, only DNO). (4) Design implication: verify disconnection time achievable for each likely source-combination scenario; not just the maximum-current case. (5) Practical impact: in island mode (Reg 826.1.1.2 — DNO supply disconnected, BESS provides supply), fault current may be substantially lower than grid-connected mode; designer ensures protective device still operates within 0.4 s / 5 s. Reg 826.1.1.5 switching device for island mode + Reg 551.6 changeover. (6) Cert evidence: per-point fault current assessment under each source combination + Reg 411.3.2 + Reg 826.1.1.3 compliance.',
  },
  {
    id: 'm11s6-overcurrent-direction',
    question:
      'Per Reg 826.1.2.2, what does selection of overcurrent protective devices consider in a PEI?',
    options: [
      'Random',
      '"Selection and erection of overcurrent protective devices shall take account of all possible directions of current flow and polarity." Conventional installs assume one-directional current flow (DNO → loads); PEI has bidirectional flow (DNO ↔ loads + sources ↔ loads + sources ↔ DNO). Designer selects OCPDs that operate correctly for current in either direction + at the location\'s expected fault current contribution. Also: connection via switchgear / controlgear shall comply with Reg 551.7.2',
      'Only DNO direction',
      'No bidirectional',
    ],
    correctIndex: 1,
    explanation:
      'Reg 826.1.2.2 location of overcurrent protective devices in PEI — verbatim: selection and erection of overcurrent protective devices shall take account of all possible directions of current flow and polarity. Connection of a source of supply via switchgear or controlgear assemblies shall comply with Regulation 551.7.2. (1) Conventional install — current flows in one direction (DNO → distribution → loads). OCPDs selected for that flow direction; trip on overcurrent from source side. (2) PEI — current flows bidirectionally: DNO ↔ distribution; sources (PV / BESS / wind / CHP) ↔ distribution; sources can export to DNO; sources can supply loads while DNO is the slack. (3) OCPD selection — must operate correctly for current in EITHER direction. Most modern MCBs / RCBOs / MCCBs are bidirectional by design but always verify per manufacturer DoC; some older or specific products are unidirectional. (4) Source connection per Reg 551.7.2 — generating set on supply side of all the protective devices (Reg 551.7.2.1) — generating set / BESS / inverter on supply side of OCPDs, not load side, so OCPDs see fault contributions correctly. (5) Cert evidence bundle: OCPD manufacturer DoCs declaring bidirectional capability + Reg 826.1.2.2 + Reg 551.7.2 compliance + single-line diagram showing source positions vs OCPDs.',
  },
];

const quizQuestions = [
  {
    question:
      'A 3-source residential PEI: DNO + 6 kWp PV + 13 kWh BESS. What is the PSCC at the consumer unit, and how is OCPD breaking capacity selected?',
    options: [
      'Random',
      'PSCC at CU = DNO contribution (typical UK residential ~16 kA per DNO statement) + PV inverter contribution (~30 A brief) + BESS inverter contribution (~40-50 A brief, BESS can hold longer). Total Ipscc ~16-17 kA. OCPD breaking capacity per Reg 434.5: select MCB/RCBO with Icn ≥ 16 kA (or higher for safety margin). Inverter contributions don\'t change MCB sizing materially (small vs DNO) but must be assessed per Reg 826.1.2.1 for completeness. Cert evidence: Ipscc per source combination + OCPD specs',
      'Same as DNO',
      'No PSCC',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-source PSCC assessment: (1) DNO contribution — dominant; typically 6-16 kA UK residential (verify per DNO statement / measurement). For commercial 25-50 kA. (2) PV inverter contribution — limited by electronics; for 6 kWp single-phase ~26 A nominal AC, Isc ~26-31 A brief (1.0-1.2× rated). Drops out within ~50-100 ms on inverter internal protection. (3) BESS inverter contribution — similar electronics limit; for 5-7 kW BESS inverter ~30-40 A Isc brief; may hold longer than PV (storage doesn\'t deplete as fast); some grid-forming BESS designs intentionally higher. (4) Total Ipscc at CU ≈ DNO + inverter contributions = ~16-17 kA. Inverter contributions are second-order vs DNO. (5) OCPD breaking capacity per Reg 434.5 — select MCB / RCBO with Icn (rated short-circuit breaking capacity) ≥ Ipscc. Typical UK CU MCBs Icn 6 kA / 10 kA / 16 kA / 25 kA — choose ≥16 kA for typical residential. RCBOs typically same range. (6) Reg 826.1.2.1 — assess per protective device location + per source combination; document. (7) Cert evidence: Ipscc per source combination per protective device location + OCPD specs + manufacturer DoCs.',
  },
  {
    question:
      'What is "supply-side fault current" vs "load-side fault current" in a PEI, and why does direction matter?',
    options: [
      'Random',
      'Supply-side fault: short-circuit on the source side of a protective device (between source + device). Load-side fault: short-circuit on the load side of a protective device (between device + load). In single-source install, fault is always on load side. In PEI, sources on each side of an OCPD mean a fault can be supplied from either direction. OCPD must trip on fault from either direction — bidirectional capability per Reg 826.1.2.2 + Reg 551.7.2.1 source-supply-side placement. Coordination tests both directions',
      'Same direction',
      'No fault',
    ],
    correctAnswer: 1,
    explanation:
      'Supply-side vs load-side fault current in PEI: (1) Conventional single-source: source upstream → OCPD → loads downstream. Fault current flows source → fault location → return path. OCPD operates when current exceeds threshold. Always load-side fault from OCPD perspective. (2) PEI multi-source: sources on each side of OCPD can supply fault from either direction. Example — fault on a sub-circuit between two source-equipped sections; DNO + PV upstream feed fault from one side; BESS downstream feeds fault from other side. (3) OCPD selection — must trip on fault current from EITHER direction. Modern MCBs / RCBOs / MCCBs are bidirectional by design but check manufacturer DoC. Some products specify a "line / load" preferred direction with reduced breaking capacity in reverse. (4) Reg 826.1.2.2 — selection + erection considers all possible directions of current flow + polarity. (5) Reg 551.7.2.1 — generating set on supply side of ALL the protective devices (BESS, PV, wind, CHP all treated as generating sets). This placement rule ensures the source\'s fault contribution path is seen by the OCPDs correctly. (6) Coordination test at commissioning — verify OCPD operation under fault from each direction + each source combination. (7) Cert evidence bundle: bidirectional OCPD DoCs + source placement per Reg 551.7.2.1 + commissioning fault tests.',
  },
  {
    question:
      'Reg 826.1.2.3 covers combined short-circuit protection in PEI. What does it require?',
    options: [
      'Random',
      '"Where combined short-circuit protection is used in the electrical installation in accordance with Regulation 434.5.1, coordination between two or more short-circuit protective devices shall consider all possible configurations of power supplies. This requires that the installation designer considers all possible short-circuit currents through all sources + their combinations." Practical: discrimination between upstream + downstream OCPDs is verified for every source combination, not just one',
      'No coordination',
      'Same as conventional',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 826.1.2.3 covers combined short-circuit protection in PEI: where combined short-circuit protection per Reg 434.5.1 is used (e.g. discrimination / cascading between upstream + downstream OCPDs), coordination must consider ALL possible power-supply configurations. (1) Conventional install — discrimination between MCB upstream + MCB downstream verified for one source (DNO); time-current curves overlap analysed at typical fault levels. (2) PEI — discrimination must hold for every combination of sources operating. Each source combination changes fault current at each point + thus changes which OCPD operates first. (3) Practical implication — designer models per source combination: DNO only, DNO + PV, DNO + PV + BESS, BESS only (island mode), etc. Verify discrimination time / current at each combination. (4) Coordination check — upstream OCPD must NOT trip before downstream OCPD for a downstream fault; otherwise nuisance trips disconnect more than needed. (5) PEI complexity — multi-source + island-mode + grid-forming BESS create many configurations to verify. Software tools support per-configuration analysis. (6) Reg 826.1.2.3 implementation — designer documents per source combination + OCPD coordination verification + cert evidence. (7) Cert evidence bundle: per-configuration coordination report + OCPD time-current curves + manufacturer DoCs + commissioning verification.',
  },
  {
    question:
      'Wind turbine + CHP generator on a multi-source site — how do their fault contributions differ from PV / BESS inverters?',
    options: [
      'Same as PV',
      'Wind + CHP can have either electronics-limited (inverter-coupled / PMG via inverter) OR conventional synchronous generator with field excitation. Synchronous generator can deliver multiple × rated current during fault (sub-transient ~6-8× then transient ~3-4× decaying over cycles) — much higher fault contribution than inverter-coupled sources. Manufacturer DoC declares fault current characteristic. Designer assesses per source; combined Ipscc at customer side may be substantially higher with sync generators',
      'No fault current',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Wind + CHP fault current characteristics depend on generator coupling: (1) Inverter-coupled (typical small wind, modern micro-CHP, PMG / IGBT inverter chain) — electronics limit Isc ~1.0-1.2× rated AC current, same as PV / BESS inverters. (2) Synchronous generator with field excitation (traditional CHP, older wind, larger commercial generation) — fault contribution much higher. Three phases: sub-transient (~6-8× rated current for first ~3-5 cycles); transient (~3-4× rated for ~10-20 cycles); steady-state (depends on excitation system, can be ~1-3× rated until protection clears). (3) Asynchronous (induction) generator — limited sub-transient contribution; quickly drops as field collapses; typically not significant for sustained fault current. (4) Practical impact on Ipscc at customer side — if a synchronous generator is on the customer side, fault current during first cycles can be much higher than DNO + inverter sources combined; OCPD breaking capacity selection must account. (5) Manufacturer DoC — declares fault current characteristic; designer uses for Reg 826.1.2.1 assessment. (6) Cert evidence bundle: per-source fault current characteristic + total Ipscc per location + OCPD selection rationale. (7) Real-world: commercial CHP with synchronous generator is the case where supply-side Ipscc may genuinely exceed DNO; design must account.',
  },
  {
    question:
      'Reg 826.1.1.3 says protective device selection shall consider the minimum earth-fault current. Why is this critical in PEI?',
    options: [
      'Random',
      'Reg 411.3.2 disconnection times require fault current ≥ I_a (OCPD operating current) for the time-current characteristic to clear within 0.4 s / 5 s. In PEI, earth-fault current depends on which sources are operating + their impedance. Minimum scenario (fewest sources, longest impedance path) = lowest fault current = slowest disconnection. If minimum fault current < I_a, OCPD won\'t operate in time — Reg 411.3.2 breach. Designer assesses minimum case + verifies disconnection time still met under all configurations',
      'No effect',
      'Maximum only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 826.1.1.3 minimum earth-fault current in PEI: (1) Reg 411.3.2 disconnection times — 0.4 s final ≤32 A TN; 5 s distribution + larger final. Requires fault current ≥ I_a (OCPD operating current per BS 7671 Appendix 3 time-current curves) for the curve to clear within the time. (2) PEI variability — earth-fault current at a point depends on which sources operate + impedance path back to source. Minimum scenario = fewest sources + longest impedance path. (3) Island mode — BESS only as source; impedance from BESS to fault location can be longer than DNO supply path; fault current potentially much lower; disconnection time risk. (4) If minimum fault current < I_a, OCPD won\'t trip in 0.4 s — Reg 411.3.2 breach; touch voltage on exposed-conductive-parts exceeds safe threshold for too long; shock risk. (5) Designer assessment: model min fault current per source combination + verify disconnection time per Reg 411.3.2. If insufficient, design intervention: additional source bonding to reduce impedance; faster OCPD curve type; supplementary RCD protection (Reg 411.4 + 415.1). (6) Reg 826.1.1.3 verbatim: protective device selection shall consider the minimum earth-fault current value. (7) Cert evidence: per-configuration min fault current calculation + Reg 411.3.2 + Reg 826.1.1.3 compliance + design intervention if required.',
  },
  {
    question:
      'How does fault contribution affect the DNO PSCC declaration at the supply position?',
    options: [
      'No change',
      'DNO PSCC declaration is the prospective short-circuit current at the supply position from the DNO transformer / network. Adding customer-side generation (PV / BESS / wind / CHP) does NOT change the DNO PSCC declaration — DNO scope ends at the supply terminals. However: customer-side OCPD selection must account for customer-side sources too per Reg 826.1.2.1. EREC G99 application for non-Type-A generation includes coordination check; G98 fast-track assumes ≤16 A per phase + inverter-limited contribution',
      'DNO recalculates',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'DNO PSCC declaration + customer-side generation: (1) DNO declaration — prospective short-circuit current at the supply position, calculated from DNO transformer impedance + supply cable length + supply fuse. UK residential typical 16 kA; commercial varies. This is the DNO\'s contribution. (2) Customer-side generation — does NOT alter the DNO declaration (DNO scope ends at the supply terminals). The DNO sees the customer-side fault contribution flowing INTO the DNO supply during a fault on the customer side; if customer-side contribution is significant, DNO connection agreement may include grid protection considerations. (3) Customer-side OCPD selection — must include all customer-side contributions per Reg 826.1.2.1. Total Ipscc at any customer-side point = DNO contribution + customer-side source contributions. Inverter-limited sources add small Ipscc; synchronous generators add larger Ipscc. (4) EREC notification — G98 fast-track ≤16 A per phase + inverter-limited contribution = simple coordination assumed; G99 formal application for larger / synchronous generators includes coordination assessment by DNO. (5) DNO connection offer (G99) may specify customer-side fault current contribution limits or grid protection requirements. (6) Cert evidence bundle: DNO PSCC declaration + customer-side source contributions assessment + total Ipscc per protective device + EREC G98 / G99 reference.',
  },
];

const faqs = [
  {
    question: 'Why is PV inverter fault contribution so much lower than DNO supply?',
    answer:
      'Inverter electronics actively limit output current via IGBT switching + current sense + control loop. Inverter detects overcurrent within milliseconds + trips internal protection. Typical Isc ~1.0-1.2× rated AC current vs DNO transformer + supply which can deliver many × rated current for cycles to seconds. Inverter "drops off" within ~50-100 ms after fault detection.',
  },
  {
    question: 'Does BESS contribute MORE fault current than PV?',
    answer:
      'Similar at the inverter electronics level — limited to ~1.0-1.2× rated. Difference: BESS can sustain its contribution longer than PV (storage doesn\'t deplete as fast as PV current under fault conditions). Some grid-forming BESS designs deliberately provide higher / sustained fault current to support grid stability — manufacturer DoC declares per product.',
  },
  {
    question: 'What\'s the practical impact on OCPD selection?',
    answer:
      'For typical UK residential LCT: DNO PSCC dominates (16 kA at origin); inverter contributions are small (< 100 A combined); OCPD selection drives off DNO PSCC (Icn ≥ 16 kA typical). For commercial sites with synchronous generators (some CHP, traditional wind): generator fault contribution can be material + OCPD breaking capacity selection accounts for it.',
  },
  {
    question: 'Does Reg 826.1.2.1 mean assessing every protective device for every scenario?',
    answer:
      'Effectively yes — for PEI installations the assessment is per protective device location + per source combination + min/max current scenarios. Software tools support this (network analysis + load flow + fault analysis). For a residential 3-source PEI, this is a few-page assessment; commercial multi-source can be more substantial.',
  },
  {
    question: 'What about island mode — how does fault current change?',
    answer:
      'Island mode (BESS-only supply per Chapter 82) typically has much lower fault current than grid-connected mode — BESS inverter is the only source + electronics-limited. Disconnection-time per Reg 411.3.2 risk: if fault current < I_a, OCPD won\'t trip in 0.4 s. Designer assesses + may use supplementary RCD protection (Reg 411.4 + 415.1) or design transition.',
  },
];

export default function RenewableEnergyModule11Section6() {
  const navigate = useNavigate();

  useSEO({
    title: 'Fault contribution from multi-source sites | Renewable Energy 11.6 | Elec-Mate',
    description:
      'Short-circuit + earth-fault contribution from PV / BESS / wind / CHP. Inverter-limited vs synchronous generator. Reg 826.1.2.1 PEI overcurrent assessment for all configurations. Disconnection-time impact. DNO PSCC + customer-side contributions.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-11')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 11
          </button>

          <PageHero
            eyebrow="Module 11 · Section 6 · BS 7671 Reg 826.1.2.1 + Chapter 41 · Multi-source fault contribution"
            title="Fault contribution from multi-source sites"
            description="Short-circuit + earth-fault contribution from PV / BESS / wind / CHP. Inverter-limited vs synchronous generator. Reg 826.1.2.1 PEI overcurrent assessment for all configurations. Disconnection-time per Reg 411.3.2 + Reg 826.1.1.3 minimum fault current. DNO PSCC + customer-side contributions."
            tone="yellow"
          />

          <TLDR
            points={[
              'Pre-PEI: fault current at customer side comes from DNO only. Post-PEI: PV / BESS / wind / CHP all contribute. Designer assesses total Ipscc per protective device location.',
              'Inverter-coupled sources (PV, BESS, modern wind, micro-CHP via inverter) limit Isc to ~1.0-1.2× rated AC current via electronics. Drop out within ~50-100 ms on fault.',
              'Synchronous generators (traditional CHP, older wind, larger commercial) deliver sub-transient ~6-8× rated, transient ~3-4× decaying — much higher contribution.',
              'Reg 826.1.2.1: overload + short-circuit currents shall be determined at every PEI point + for all possible configurations + min/max magnitudes.',
              'Reg 826.1.2.2: OCPD selection considers all possible current flow directions + polarities. Bidirectional capability per manufacturer DoC.',
              'Reg 826.1.2.3: combined short-circuit protection coordination considers all source configurations — discrimination verified per combination.',
              'Reg 826.1.1.3: minimum earth-fault current case — fewest sources + longest impedance path. Must still meet Reg 411.3.2 disconnection times (0.4 s / 5 s).',
              'Island mode (BESS-only supply) is typically the minimum fault current case + highest risk of Reg 411.3.2 breach. Supplementary RCD protection (Reg 411.4 + 415.1) often required.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish inverter-limited vs synchronous generator fault contribution characteristics.',
              'Calculate total Ipscc at any PEI point per Reg 826.1.2.1.',
              'Select OCPD breaking capacity for PEI considering all source contributions.',
              'Apply Reg 826.1.2.2 bidirectional OCPD selection + Reg 551.7.2.1 source-side placement.',
              'Coordinate combined short-circuit protection per Reg 826.1.2.3 across all source configurations.',
              'Apply Reg 826.1.1.3 minimum earth-fault current consideration + Reg 411.3.2 disconnection-time verification.',
              'Identify island-mode fault current implications + design supplementary protection.',
              'Coordinate customer-side fault assessment with DNO PSCC declaration + EREC G98 / G99 process.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            DNO PSCC sets the breaking capacity floor. Inverter + BESS + generator add to it. Synchronous machines change the picture. Per Reg 826.1.2.1, every device, every configuration.
          </Pullquote>

          <ContentEyebrow>Source fault contribution characteristics</ContentEyebrow>

          <ConceptBlock
            title="Inverter-coupled sources — electronics-limited Isc"
            plainEnglish="PV inverters, BESS inverters, modern wind PMG + inverter, micro-CHP via inverter all use IGBT switching with active current limiting. Output current sense + control loop trip inverter on overcurrent within milliseconds. Typical Isc ~1.0-1.2× rated AC current — much lower than DNO transformer supply. Inverter drops out within ~50-100 ms after fault detection."
            onSite="For typical UK residential LCT: PV inverter ~25-30 A Isc; BESS inverter ~30-50 A Isc; total inverter contribution at CU is small (< 100 A) vs DNO 16 kA. Does NOT typically change OCPD breaking capacity selection. Must still be assessed per Reg 826.1.2.1."
          >
            <p>Inverter-coupled source detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Electronics limit</strong>
                — IGBT switching + current sense + control loop. Inverter detects
                overcurrent within microseconds; trips internal protection within
                50-100 ms (varies by manufacturer)
              </li>
              <li>
                <strong className="text-white">Typical Isc</strong>
                — 1.0-1.2× rated AC current. For 5 kW inverter ~25 A nominal AC,
                Isc ~25-30 A brief
              </li>
              <li>
                <strong className="text-white">Duration</strong>
                — brief; inverter drops off within ~50-100 ms. Not sustained fault
                contribution
              </li>
              <li>
                <strong className="text-white">DC side</strong>
                — PV DC string Isc limited by PV cell characteristics (~1.1-1.2×
                STC short-circuit current); BESS DC Isc limited by BESS BMS +
                internal protection. DC SPDs + DC fuses + DC isolators per Section
                712 / Chapter 57
              </li>
              <li>
                <strong className="text-white">Grid-forming
                  inverters</strong> — some BESS + advanced PV inverters in grid-forming
                mode deliberately provide higher fault current to support grid
                stability. Manufacturer DoC declares per product
              </li>
              <li>
                <strong className="text-white">Anti-islanding
                  interaction</strong> — inverter anti-islanding (Reg 551.7.5) detects
                grid loss + disconnects. During a fault, the inverter may interpret
                the disturbance as anti-islanding trigger + disconnect, further
                limiting its fault contribution duration
              </li>
              <li>
                <strong className="text-white">Practical impact</strong>
                — for typical UK residential LCT, inverter contributions sum to
                &lt; 100 A vs DNO 16 kA; OCPD selection drives off DNO PSCC; inverter
                contribution adds to disconnection-time calculation but rarely
                changes OCPD sizing
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — per-inverter Isc from manufacturer DoC + Reg 826.1.2.1 assessment
                per protective device
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Synchronous generators — high fault current contribution"
            plainEnglish="Traditional CHP, older wind, larger commercial generators use synchronous machines with field excitation. During a fault, fault current decays in three phases: sub-transient (first ~3-5 cycles, ~6-8× rated), transient (~10-20 cycles, ~3-4× rated), steady-state (depends on excitation, ~1-3× rated). Much higher contribution than inverter-coupled. OCPD breaking capacity must account."
            onSite="UK 2025-26 typical: synchronous generator CHP (commercial leisure / hospital / industrial sites) can substantially increase Ipscc at customer side. Designer obtains manufacturer DoC + assesses per Reg 826.1.2.1. May need higher Icn breakers + careful coordination with DNO PSCC."
          >
            <p>Synchronous generator fault contribution detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sub-transient (first
                  ~3-5 cycles)</strong> — ~6-8× rated current; very high; driven
                by armature flux + damper winding response. Critical for OCPD
                breaking capacity sizing
              </li>
              <li>
                <strong className="text-white">Transient (~10-20
                  cycles)</strong> — ~3-4× rated; field winding response; field
                excitation begins to react
              </li>
              <li>
                <strong className="text-white">Steady-state</strong>
                — depends on excitation control. Voltage regulator + automatic
                voltage regulator (AVR) response. Typically ~1-3× rated until
                protection clears
              </li>
              <li>
                <strong className="text-white">Asynchronous (induction)
                  generators</strong> — limited sub-transient (~3-5× rated for
                first cycle); field collapses quickly; not significant for
                sustained fault current
              </li>
              <li>
                <strong className="text-white">UK 2025-26 typical
                  scope</strong> — commercial CHP (10-500 kW) with synchronous
                generator; some larger commercial wind; older / traditional designs
              </li>
              <li>
                <strong className="text-white">OCPD impact</strong>
                — Icn (rated short-circuit breaking capacity) must include sync
                generator sub-transient contribution + DNO contribution. Can push
                requirement from typical 16 kA to 25-50 kA or higher
              </li>
              <li>
                <strong className="text-white">Disconnection time</strong>
                — high sustained fault current actually helps Reg 411.3.2 (faster
                trip on time-current curve). Difference from inverter where fast
                drop-off limits OCPD trip-on-source-contribution
              </li>
              <li>
                <strong className="text-white">Manufacturer DoC</strong>
                — declares Xd" (sub-transient reactance), Xd\' (transient), Xd
                (steady-state) — designer uses to calculate per-phase fault current
                + ΔIpscc contribution
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — per-generator fault contribution characteristic + Reg 826.1.2.1
                + Reg 434 breaking capacity + commissioning
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.2.1 — Magnitude of overcurrent in PEI"
            clause="Overload and short-circuit currents shall be determined at every point of the PEI where a protective device is installed: (a) for all possible configurations of each type of PEI; and (b) for situations corresponding to the minimum and maximum current magnitudes. In all cases, compliance with Chapter 43 shall be fulfilled. NOTE 1: The operating mode influences fault current magnitudes."
            meaning="Reg 826.1.2.1 is the categorical PEI overcurrent assessment requirement. For every protective device location in a PEI, the designer must determine overload + short-circuit currents for: (a) all possible source configurations (DNO only, DNO + PV, DNO + PV + BESS, etc.); and (b) minimum + maximum current magnitudes per configuration. Chapter 43 compliance (overload + short-circuit protection per Reg 433 / 434) must be fulfilled across all cases. NOTE acknowledges that operating mode (direct feeding, island mode, etc. per Reg 824.2) influences fault magnitudes. Practical implication: per-protective-device assessment per source combination per min/max scenario. For typical UK residential 3-source PEI (DNO + PV + BESS) this is a 2-4 page document; commercial multi-source is more substantial. Cert evidence bundle: Reg 826.1.2.1 assessment + per-point Ipscc + OCPD selection per Reg 434.5 + Reg 411.3.2 disconnection time per configuration + Chapter 43 compliance. M11 §8 covers the commissioning chain integration."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>OCPD selection + bidirectional flow</ContentEyebrow>

          <Pullquote>
            In a PEI, current doesn\'t know which way it should flow. The OCPD must trip either way. Reg 826.1.2.2 says: design for both directions.
          </Pullquote>

          <ConceptBlock
            title="Reg 826.1.2.2 — bidirectional OCPD selection"
            plainEnglish="In a PEI, current flows in both directions: DNO ↔ distribution ↔ loads + sources contribute either way. OCPDs must operate correctly for current in either direction. Reg 826.1.2.2: selection + erection considers all possible directions of current flow + polarity. Source connection per Reg 551.7.2 (supply side of protective devices)."
            onSite="Most modern MCBs / RCBOs / MCCBs are bidirectional by design — but always check manufacturer DoC. Older or specific products may have a preferred direction with reduced breaking capacity in reverse. Sources placed on supply side per Reg 551.7.2.1 means OCPDs see fault contributions correctly."
          >
            <p>Bidirectional OCPD selection:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Bidirectional capability</strong>
                — most MCBs / RCBOs / MCCBs designed for current flow in either
                direction; manufacturer DoC declares Icn (rated short-circuit
                breaking capacity) symmetric in both directions
              </li>
              <li>
                <strong className="text-white">Unidirectional
                  products</strong> — some older / specific OCPDs have "line / load"
                preferred direction with reduced Icn in reverse. Check manufacturer
                DoC before specifying in PEI
              </li>
              <li>
                <strong className="text-white">Reg 551.7.2.1
                  source placement</strong> — generating set on supply side of
                ALL protective devices (covered in M9 §1, M5 BESS). Ensures OCPDs
                see source\'s fault contribution + downstream fault current path
                correctly
              </li>
              <li>
                <strong className="text-white">Reg 551.7.1
                  prohibition</strong> — source must NOT be connected on load side
                of certain RCDs (the RCD would not see the source\'s fault
                contribution correctly)
              </li>
              <li>
                <strong className="text-white">DC OCPDs</strong>
                — PV DC isolators, BESS DC contactors, etc. DC OCPDs differ from
                AC (no natural zero crossing); manufacturer DoC declares DC waveform
                handling + DC switching capability + DC current rating
              </li>
              <li>
                <strong className="text-white">Time-current curve
                  selection</strong> — Type B (3-5× In trip), Type C (5-10× In),
                Type D (10-20× In) — choice depends on load characteristic (e.g.
                LCT inverters tolerate Type B; motors / transformers may need C/D
                for inrush). Devices for protection against overcurrent are
                selected per Section 533; time-current curves per Appendix 3
              </li>
              <li>
                <strong className="text-white">RCBO vs separate
                  MCB+RCD</strong> — RCBO combines overcurrent + RCD in one device;
                independent operation per pole. PEI installs often use RCBOs for
                per-circuit Type A or Type B (Reg 531.3.3) RCD coverage
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — OCPD manufacturer DoC + Reg 826.1.2.2 bidirectional capability
                + Reg 551.7.2.1 source placement + single-line diagram
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 826.1.2.3 — combined short-circuit protection coordination"
            plainEnglish="Where combined short-circuit protection per Reg 434.5.1 is used (discrimination / cascading between upstream + downstream OCPDs), coordination must consider ALL possible power-supply configurations. PEI complexity means designer models per source combination + verifies discrimination at each."
            onSite="Practical: upstream OCPD must NOT trip before downstream OCPD for a downstream fault; otherwise nuisance trips disconnect more than needed. In PEI, source mix changes fault current at each point — discrimination verified per source combination. Software tools (network analysis + load flow) support."
          >
            <p>Coordination per Reg 826.1.2.3:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Discrimination
                  principle</strong> — upstream OCPD time-current curve clears
                later than downstream OCPD for any fault current the downstream
                might see. Reg 531.3.6 + Appendix 3 time-current curves
              </li>
              <li>
                <strong className="text-white">Source combination
                  effect</strong> — each combination changes fault current at each
                point. PV adds to fault during day; BESS adds during day + night;
                synchronous CHP adds substantially when running
              </li>
              <li>
                <strong className="text-white">Per-combination
                  verification</strong> — designer models: DNO only; DNO + PV;
                DNO + PV + BESS; BESS only (island mode); DNO + PV + BESS + CHP
                (where applicable). Verify discrimination time / current at each
              </li>
              <li>
                <strong className="text-white">Cascade vs full
                  selectivity</strong> — full selectivity (discrimination at all
                fault levels) vs cascade (acceptable upstream trip at high fault
                levels). Designer choice + cert evidence
              </li>
              <li>
                <strong className="text-white">Network analysis
                  tools</strong> — software supports per-source-configuration fault
                analysis + discrimination verification (e.g. AmTech, Trimble, ETAP)
              </li>
              <li>
                <strong className="text-white">Manual approach for
                  simple PEI</strong> — for typical UK residential 3-source PEI,
                manual per-combination check is practical
              </li>
              <li>
                <strong className="text-white">Commissioning
                  verification</strong> — fault simulation at commissioning where
                practical; OCPD operation verified per source combination + as
                close to live conditions as safety allows
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per-configuration coordination report + OCPD
                time-current curves + manufacturer DoCs + commissioning sign-off
                + Reg 826.1.2.3 compliance
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.2.2 — OCPD selection in PEI considers all flow directions"
            clause="Selection and erection of overcurrent protective devices shall take account of all possible directions of current flow and polarity. Connection of a source of supply via switchgear or controlgear assemblies shall comply with Regulation 551.7.2. Overload and short-circuit protection shall be placed at the origin of the circuit."
            meaning="Reg 826.1.2.2 is the categorical PEI bidirectional OCPD rule. Three points: (1) Selection + erection considers ALL possible directions of current flow + polarity — OCPDs must operate correctly for current from either upstream or downstream. (2) Source connection per Reg 551.7.2 — generating sets (PV inverter, BESS, wind, CHP) on supply side of all protective devices (Reg 551.7.2.1). (3) Overload + short-circuit protection at the origin of the circuit — bidirectional protection coverage. Practical implications: (a) Verify OCPD manufacturer DoC declares bidirectional Icn — most modern MCBs / RCBOs / MCCBs are bidirectional but check. (b) Source placement per Reg 551.7.2.1 ensures OCPDs see source\'s fault contribution correctly. (c) Reg 826.1.2.3 combined coordination verified per source configuration. (d) Cert evidence: bidirectional OCPD DoCs + source placement diagram + Reg 826.1.2.2 + Reg 551.7.2.1 compliance. M9 §1 + M5 BESS covered the source-placement rule; M11 §6 covers the OCPD selection implications in the multi-source context."
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Minimum fault current + disconnection time</ContentEyebrow>

          <ConceptBlock
            title="Reg 826.1.1.3 — minimum earth-fault current consideration"
            plainEnglish="Reg 826.1.1.3: protective device selection shall consider the minimum earth-fault current value. Why: Reg 411.3.2 disconnection times require fault current ≥ I_a (OCPD operating current). Minimum source combination = lowest fault current = slowest disconnection. If min fault current < I_a, OCPD won\'t trip in 0.4 s — Reg 411.3.2 breach + shock risk."
            onSite="Island mode (BESS-only supply per Chapter 82) is typically the minimum fault current case + highest risk of Reg 411.3.2 breach. Designer assesses + may use supplementary RCD protection (Reg 411.4 + 415.1) or design intervention."
          >
            <p>Minimum fault current scenarios + interventions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 411.3.2 times</strong>
                — 0.4 s for final circuits ≤32 A in TN (5 s in TT); 5 s for
                distribution circuits + final &gt;32 A. Fault current must ≥ I_a
                for OCPD to clear within time
              </li>
              <li>
                <strong className="text-white">Multi-source min
                  scenario</strong> — fewest sources operating + longest impedance
                path back to active source = lowest fault current. Worst case for
                disconnection time
              </li>
              <li>
                <strong className="text-white">Island mode</strong>
                — BESS-only supply per Reg 826.1.1.1; DNO disconnected; only the
                BESS inverter is the source. Inverter-limited Isc ~30-50 A. Fault
                current at a distant circuit may be &lt; I_a for an MCB → slow trip
                → Reg 411.3.2 breach
              </li>
              <li>
                <strong className="text-white">Daytime night
                  comparison</strong> — day: DNO + PV + BESS all contributing,
                fault current high. Night: DNO only (PV off, BESS may be discharging
                or off depending on state), fault current lower. Both scenarios
                must meet Reg 411.3.2
              </li>
              <li>
                <strong className="text-white">Supplementary RCD
                  (Reg 411.4 + 415.1)</strong> — 30 mA Type A or Type B RCD provides
                additional earth-fault protection independent of fault current
                magnitude. RCD trips on ΔI = 30 mA regardless of source. Mitigates
                low-fault-current disconnection-time risk
              </li>
              <li>
                <strong className="text-white">Faster OCPD curve</strong>
                — Type B MCBs (3-5× In trip) require lower fault current to trip
                than Type C (5-10× In). Where Reg 411.3.2 marginal, Type B may
                achieve required time
              </li>
              <li>
                <strong className="text-white">Cable size
                  intervention</strong> — larger cable CSA reduces impedance, raising
                fault current at the load end. Coordinates with Chapter 81 cable
                upsize design
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per-configuration min fault current calculation
                + Reg 411.3.2 + Reg 826.1.1.3 compliance + design intervention if
                required + commissioning verification
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Island mode fault current — the worst case"
            plainEnglish="Chapter 82 PEI island mode: BESS supplies the installation when DNO is disconnected. Only BESS inverter is the source; fault current is inverter-limited (~30-50 A). For a fault at a distant circuit end, fault current may not reach the I_a threshold for OCPD trip in 0.4 s — Reg 411.3.2 breach risk."
            onSite="Practical: most UK 2025-26 residential PEI designs include island mode capability. The BESS inverter\'s Isc is typically below MCB Type B trip threshold for some circuits. Supplementary RCD (30 mA Type A or B per Reg 411.4 + 415.1) is the typical solution — RCD trips on imbalance regardless of fault current magnitude."
          >
            <p>Island mode protection design pattern:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Island mode trigger</strong>
                — Reg 826.1.3: when public network is not energised, prosumer
                operates PEI in island mode OR automatically disconnects all local
                power supplies. Switching device per Reg 826.1.1.5 + Reg 551.6
                changeover
              </li>
              <li>
                <strong className="text-white">Source in island</strong>
                — BESS inverter (typically); some grid-forming BESS designs;
                manufacturer DoC declares island-mode Isc + duration
              </li>
              <li>
                <strong className="text-white">Fault current
                  challenge</strong> — Isc ~30-50 A. For a 32 A Type B MCB (I_a
                ~3-5× In = 96-160 A for 0.4 s trip), this is below threshold.
                MCB may eventually trip on thermal magnetic but not in 0.4 s
              </li>
              <li>
                <strong className="text-white">Earth-fault path
                  in island</strong> — Reg 826.1.1.2 system earthing for island
                mode shall be connected to a suitable earth electrode per Reg
                542.2.2. Reg 826.1.1.2.2 neutral conductor — all live conductors
                disconnected from DNO in island; neutral switch device for
                connection
              </li>
              <li>
                <strong className="text-white">Supplementary RCD
                  solution</strong> — 30 mA Type A or Type B RCD trips on
                ΔI = 30 mA regardless of fault current magnitude. Independent
                of source Isc. Most reliable Reg 411.3.2 + Reg 415.1 mitigation
                in island mode
              </li>
              <li>
                <strong className="text-white">Earth electrode in
                  island</strong> — Reg 826.1.1.2 + Reg 826.1.1.2.3 transfer
                switching device for connection to local earthing arrangement.
                Coordinated with BS 7671 Chapter 54
              </li>
              <li>
                <strong className="text-white">RCD type for
                  bidirectional inverter sources</strong> — Reg 531.3.3: Type B
                where smooth DC fault current possible (BESS inverter electronics
                may produce smooth DC residual current under certain fault
                conditions). Manufacturer DoC declares
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — island mode design records + fault current
                under island scenario + RCD coverage per Reg 411.4 + 415.1 + 531.3.3
                + commissioning test in island mode
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.3 — Minimum earth fault current in PEI"
            clause="Operation of the protective device shall be in accordance with the maximum disconnection times as required by Chapter 41 and the requirements of Regulation 551.2. The selection of protective devices against electric shock shall consider the minimum earth fault current value (between one of the line conductors and PE conductor). The minimum earth fault current..."
            meaning="Reg 826.1.1.3 codifies the minimum-fault-current consideration for PEI protective devices. Two requirements: (1) Operation per maximum disconnection times of Chapter 41 (Reg 411.3.2 — 0.4 s final ≤32 A TN; 5 s distribution + larger final) + Reg 551.2 (generating set protective device coordination). (2) Protective device selection considers the minimum earth-fault current value (between line conductors + PE). The reg recognises that minimum fault current scenario = fewest sources + longest impedance path = slowest disconnection. Designer must verify Reg 411.3.2 disconnection time achievable across all source configurations + min/max scenarios. For island mode (Reg 826.1.1.1, BESS-only supply), minimum fault current may be insufficient for OCPD trip in 0.4 s; supplementary RCD protection (Reg 411.4 + Reg 415.1, 30 mA Type A or Type B per Reg 531.3.3) is the typical mitigation. Cert evidence bundle: per-configuration min fault current + Reg 411.3.2 + Reg 826.1.1.3 compliance + RCD coverage + commissioning test in each mode."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <Scenario
            title="Typical UK 2025-26 residential 3-source PEI — fault assessment"
            situation="Suburban semi-detached, 6 kWp PV + 13 kWh BESS + DNO 100 A single-phase supply. PEI per Chapter 82. DNO PSCC declaration 16 kA at origin. UK 2025-26."
            whatToDo="Reg 826.1.2.1 multi-source fault assessment: (1) DNO contribution — 16 kA at origin per DNO statement. Per protective device location, fault current calculated based on impedance from origin (cable run + protective device internal impedance + load characteristic). (2) PV inverter contribution — 6 kWp single-phase ~26 A AC rated; Isc ~26-31 A brief; drops out 50-100 ms on fault. (3) BESS inverter contribution — 5 kW continuous + 7 kW peak; Isc ~30-50 A brief; may sustain longer than PV. Manufacturer DoC. (4) Total Ipscc at CU per configuration: DNO only = 16 kA; DNO + PV = 16 kA + 30 A ≈ 16 kA (PV negligible vs DNO); DNO + PV + BESS = 16 kA + 50-80 A ≈ 16 kA (inverter contributions negligible at origin). Island mode BESS only = ~30-50 A — substantially lower. (5) OCPD selection — Icn ≥ 16 kA per Reg 434.5; typical RCBOs 6-16 kA Icn at CU — choose ≥16 kA. Inverter contributions do not change selection at origin. (6) Reg 411.3.2 disconnection time — grid-connected mode: fault current high, OCPD trips within 0.4 s for typical Type B MCB. Island mode: fault current may be < I_a; supplementary 30 mA RCD per Reg 411.4 + 415.1 + 531.3.3 (Type B where smooth DC residual current possible per BESS DoC). (7) Reg 826.1.2.2 bidirectional OCPDs verified per manufacturer DoC. (8) Reg 826.1.2.3 coordination — RCBOs at CU + main switch; discrimination verified per source configuration. (9) Cert evidence bundle: Reg 826.1.2.1 assessment table (per OCPD per configuration) + OCPD selection + RCD coverage + island mode test record + EIC."
            whyItMatters="Typical UK 2025-26 residential PEI pattern. Inverter contributions are small but must be assessed. Island mode is the worst-case fault scenario; supplementary RCD is the standard mitigation. Cert evidence bundle is bounded + clear. EICR scope verifies safety against the install\'s amendment + reviews the PEI assessment for consistency."
          />

          <Scenario
            title="Commercial CHP + PV + BESS — synchronous generator changes the picture"
            situation="Light-industrial site, 100 kVA DNO supply, 100 kWp PV array, 200 kWh BESS, 50 kWe synchronous generator CHP. Chapter 82 PEI. UK 2025-26 commercial."
            whatToDo={`Multi-source fault assessment with synchronous generator: (1) DNO contribution — commercial declaration, typically 25-50 kA at origin per DNO statement + 11 kV transformer + LV supply. (2) PV inverter contribution — 100 kWp three-phase ~145 A AC rated; Isc ~145-175 A brief; drops out on fault. Negligible vs DNO. (3) BESS inverter contribution — similar; ~150-250 A Isc brief; manufacturer DoC. (4) Synchronous CHP generator contribution — 50 kWe three-phase ~72 A rated; sub-transient Xd'' ~0.15 pu → Isc sub-transient ~72 / 0.15 ≈ 480 A first cycles; transient Xd' ~0.20 → ~360 A; steady-state Xd ~0.30 → ~240 A until protection clears. Manufacturer DoC. (5) Total Ipscc at main switchgear when CHP running: DNO 25-50 kA + CHP sub-transient ~480 A = ~25.5-50.5 kA. CHP contribution still small fraction of DNO but material at lower-fault-current locations downstream. (6) Per-protective-device assessment per Reg 826.1.2.1 — calculate Ipscc at each sub-board location per source combination. CHP contribution becomes more significant at points where DNO contribution is reduced by cable impedance. (7) OCPD selection at downstream sub-boards may need higher Icn than expected (sync generator contribution adds during sub-transient). (8) Reg 826.1.2.3 coordination — per source configuration; CHP-on / CHP-off scenarios verified. (9) Island mode — CHP can be the source in island (with BESS supporting); higher sustained fault current than BESS-only; Reg 411.3.2 disconnection time more readily achievable in CHP-island than BESS-only-island. (10) Cert evidence bundle: per-protective-device Reg 826.1.2.1 assessment + sync generator manufacturer DoC + OCPD selection + island-mode test records + EREC G99 reference + EIC. Multi-page document.`}
            whyItMatters="Commercial site with sync generator = different fault profile from inverter-only PEI. Designer accounts for sub-transient + transient + steady-state contributions. OCPD breaking capacity may need elevation at downstream sub-boards. Multi-trade delivery: CHP specialist + designer + electrician + DNO via EREC G99. Cert evidence bundle is comprehensive + insurance-ready."
          />

          <CommonMistake
            title="Ignoring inverter fault contribution in Reg 826.1.2.1 assessment"
            whatHappens={`Designer writes "DNO PSCC = 16 kA; OCPDs sized for 16 kA" without separately assessing PV / BESS contributions. Reg 826.1.2.1 requires assessment per source combination. Inspector / future EICR can't see the multi-source consideration was actually done.`}
            doInstead="Reg 826.1.2.1 categorical requirement: at every PEI point + every source configuration + min/max magnitudes. Even where inverter contributions are negligible vs DNO (typical residential), explicitly document the assessment. Per-point table: DNO contribution; PV contribution; BESS contribution; total. The exercise of doing the assessment confirms the design integrity. Cert evidence bundle includes the table; future EICR / inspector sees the work."
          />

          <CommonMistake
            title="Forgetting island-mode disconnection time"
            whatHappens="PEI installed with island mode capability; designer doesn\'t check Reg 411.3.2 disconnection time under BESS-only supply. Fault on a distant circuit in island mode: fault current ~30 A; Type B 32 A MCB needs ~96-160 A for 0.4 s trip; MCB doesn\'t trip in time; touch voltage on exposed-conductive-parts dangerous for several seconds; shock risk."
            doInstead="Reg 826.1.1.3 + Reg 411.3.2 require disconnection-time verification per source configuration including island mode. If minimum fault current < I_a, supplementary 30 mA Type A or Type B RCD per Reg 411.4 + 415.1 + 531.3.3 provides independent protection. UK 2025-26 typical practice: every PEI circuit has RCBO Type A or Type B coverage as standard; island mode marginal disconnection-time is addressed by RCD on imbalance. Cert evidence: island mode fault current calculation + RCD coverage + commissioning test in island mode."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'PEI multi-source fault contribution: DNO + PV + BESS + wind + CHP. Per Reg 826.1.2.1 every protective device + every source configuration + min/max magnitudes.',
              'Inverter-coupled sources (PV, BESS, modern wind, micro-CHP) limit Isc to ~1.0-1.2× rated AC current via electronics. Drop out within ~50-100 ms.',
              'Synchronous generators (traditional CHP, older wind) deliver sub-transient ~6-8× rated, transient ~3-4×, steady-state ~1-3× — much higher contribution.',
              'Inverter contributions typically small vs DNO at origin; do not usually change OCPD breaking capacity selection. Sync generators may.',
              'Reg 826.1.2.2: OCPDs selected for all flow directions + polarities. Modern MCBs / RCBOs bidirectional by design; verify per manufacturer DoC.',
              'Reg 551.7.2.1: generating sets on supply side of all protective devices — ensures OCPDs see fault contributions correctly.',
              'Reg 826.1.2.3: combined short-circuit protection coordination considers all source configurations. Discrimination verified per combination.',
              'Reg 826.1.1.3 + Reg 411.3.2: minimum earth-fault current scenario must still meet disconnection times (0.4 s / 5 s). Island mode is the typical worst case.',
              'Island mode (BESS-only supply): inverter-limited Isc may be < I_a for OCPD trip. Supplementary 30 mA Type A or Type B RCD per Reg 411.4 + 415.1 + 531.3.3 = standard mitigation.',
              'DNO PSCC declaration unchanged by customer-side generation. Customer-side OCPD selection must include all customer-side contributions.',
              'EREC G98 fast-track ≤16 A per phase + inverter-limited; G99 formal for larger / synchronous + coordination assessment by DNO.',
              'Cert evidence bundle: Reg 826.1.2.1 per-protective-device per-configuration assessment + OCPD selection + commissioning tests + RCD coverage + EIC.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 6 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-5')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                11.5 BS EN 62305-4 + Section 443 SPDs
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-7')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                11.7 Anti-islanding deep — DNO test + LoM
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
