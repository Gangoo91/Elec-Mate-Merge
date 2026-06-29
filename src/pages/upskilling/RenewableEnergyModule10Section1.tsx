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
import { Chapter82Framework } from '@/components/study-centre/diagrams/renewableM10';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm10s1-pei-definition',
    question:
      'What does Chapter 82 of BS 7671 define as a "Prosumer’s Electrical Installation" (PEI)?',
    options: [
      'An installation with local generation alongside or instead of the DNO supply, acting as producer and consumer',
      'A single-source installation that only generates from PV, with no battery storage or export capability',
      'Any installation rated above a defined commercial-scale threshold of total supply capacity',
      'Only an off-grid installation that has no public distribution network connection at all',
    ],
    correctIndex: 0,
    explanation:
      'BS 7671 Chapter 82 introduces the Prosumer’s Electrical Installation (PEI) framework. A PEI is an electrical installation that combines local generation (PV, BESS, wind, CHP, micro-hydro) with the public DNO supply — the customer is simultaneously a producer (exporting surplus generation) and a consumer (importing when local generation is insufficient). Reg 824.2 defines the operating modes including direct-feeding mode (importing from / exporting to the public network), island mode (disconnected from public, operating on local generation + storage), and the transitions between them. Reg 826.1.1.1: "The PEI shall be able to operate in any intended operating mode as defined in Regulation 824.2... Protection of persons and properties shall be provided in all operating modes." M10 is the chapter where the single-source rules from M2-M9 are integrated under the Chapter 82 umbrella.',
  },
  {
    id: 'm10s1-section-826',
    question:
      'Which BS 7671 regulation requires that protection of persons and properties is maintained across all PEI operating modes?',
    options: [
      'Reg 411.4, which sets the disconnection times for TN system earth-fault protection',
      'Reg 311.1, which deals with the assessment of maximum demand and applied diversity',
      'Reg 826.1.1.1, which requires protection of persons and property in all PEI operating modes',
      'Reg 643.1, which covers the initial verification and the inspection-and-test sequence',
    ],
    correctIndex: 2,
    explanation:
      'Reg 826.1.1.1 is the categorical requirement that protection of persons + property must work across EVERY operating mode the PEI might enter — direct feeding, island, transitions. This is the architectural shift from single-source design: in a single-source install, the protective architecture is designed once for one supply topology; in a PEI, the protective architecture has to work for: (a) DNO + all local sources operating in parallel; (b) DNO + some local sources; (c) DNO alone; (d) local sources alone (island); (e) every transition between these. Reg 826.1.2.1 then requires overcurrent calculation at every PEI protective-device location for ALL configurations + minimum + maximum current magnitudes. The integration challenge of M10 is not "add more sources" — it’s "design for every combination of sources operating together".',
  },
  {
    id: 'm10s1-island-mode-neutral',
    question:
      'In island mode (PEI disconnected from DNO supply), what does Reg 826.1.1.2.2 require for the neutral conductor?',
    options: [
      'Disconnect only the neutral from the DNO and leave all the line conductors connected',
      'Leave the DNO neutral connected at all times during island-mode operation of the PEI',
      'There is no specific requirement for the neutral conductor while operating in island mode',
      'Disconnect all live conductors, then establish a local N-E bond without overlapping DNO switching',
    ],
    correctIndex: 3,
    explanation:
      'Reg 826.1.1.2.2 verbatim: "When in island mode, all live conductors shall be disconnected from the DNO supply. To prevent incorrect operation of RCDs the use of a neutral switch device shall connect the neutral and the earth of the PEI without overlapping with switching of the DNO neutral." The sequence matters: (1) DNO line conductors disconnect; (2) DNO neutral disconnects; (3) local N–E bond establishes (creating a local TN-S architecture for the island). The non-overlap requirement prevents a momentary state where both the DNO N–E bond and the local N–E bond are in circuit — which would short-circuit through the earthing. This is the architectural foundation for ANY island-capable PEI (off-grid, microgrid, resilience) and is the reason grid-forming inverters with island capability need this neutral-handling logic. Covered in detail in §10.6 (grid forming).',
  },
  {
    id: 'm10s1-multi-source-isolation',
    question:
      'Per Reg 826.1.1.4, what isolation arrangement is required when an installation is supplied from more than one source?',
    options: [
      'A single main switch that isolates the whole installation in one operation',
      'A main switch for each source, plus a durable warning notice or a suitable interlock',
      'No dedicated isolation is needed where the local sources auto-disconnect on grid loss',
      'Only the DNO supply needs an isolating switch; the local sources do not require one',
    ],
    correctIndex: 1,
    explanation:
      'Reg 826.1.1.4: "Where an installation is supplied from more than one source, a main switch suitable for isolation (for example, switch-disconnector) shall be provided for each source of supply. A durable warning notice shall be permanently fixed in the vicinity of these main switches in such a position that any person seeking to operate any of these main switches will be warned of the need to operate all such switches to achieve isolation of the installation." In practice on a 4-source PEI (DNO + PV + BESS + V2G EV): four main switches, four notices (or one consolidated notice), trained-person isolation procedure documented. The hazard otherwise: engineer operates the DNO main switch, assumes installation is dead, but PV / BESS / V2G are still feeding the LV side. This is the multi-source equivalent of the Reg 514 safety isolation notice + the PME warning notice — it’s about preventing fatal misunderstanding when working on an apparently-isolated PEI.',
  },
];

const quizQuestions = [
  {
    question:
      'A site has existing 6 kWp PV (Section 712) + 13 kWh BESS (Chapter 57) + a planned 7 kW EV charger (Section 722) + heat pump (M8 fixed equipment) + future V2G upgrade. What BS 7671 framework integrates all of these?',
    options: [
      'Section 712 alone covers the whole multi-source installation and its protection',
      'Section 722 alone, because the EV charger dominates the design and loading',
      'Chapter 82 (PEI) integrates the per-technology sections via the Reg 826.x family',
      'No integrating framework is needed; each technology is certified entirely separately',
    ],
    correctAnswer: 2,
    explanation:
      'This is exactly the multi-source PEI scenario Chapter 82 was added to cover. Per-technology BS 7671 anchors: Section 712 (PV) + Chapter 57 (BESS) + Section 722 (EV, including V2G when added) + Section 551 (generating set framework which covers PV inverter + BESS inverter + any future generators). The INTEGRATION framework is Chapter 82: Reg 826.1.1.1 requires protection in every operating mode (DNO+PV+BESS+EV, DNO+PV only, BESS+EV island, etc.); Reg 826.1.1.4 multi-source isolation with warning notices; Reg 826.1.2.1 overcurrent calculation at every protective-device point for every configuration; Reg 826.1.2.2 protective devices selected considering ALL possible directions of current flow + polarity; Reg 826.1.4 surge protection because switching between sources creates more transient overvoltage events. EREC G99 covers the DNO connection design; EREC G100 covers DNO export limit if applied. Cert evidence bundle: one EIC referencing all sub-systems + per-technology DoC + Section 826 PEI compliance summary + EREC correspondence.',
  },
  {
    question:
      'A customer wants to add a 5 kW small wind turbine to an existing PV + BESS site. The wind inverter is grid-following. Does Chapter 82 add anything beyond Section 551 + Section 712 + Chapter 57?',
    options: [
      'No — Section 551 alone fully covers adding the wind turbine to the existing site',
      'No — adding a third source has no interaction with the existing PV and BESS design',
      'It varies unpredictably from site to site and so cannot be generalised at all',
      'Yes — it adds all-mode protection, extra isolation, overcurrent recalc and SPD/EMS uplift',
    ],
    correctAnswer: 3,
    explanation:
      'Multi-source sites are NOT the sum of single-source installs. Adding a third source to a PV+BESS site: (1) Reg 826.1.1.1 protective design must work for every combination (PV+BESS+wind, PV+wind, BESS+wind, wind-only, etc.); (2) Reg 826.1.1.4 each source needs its own isolation switch + warning notice update; (3) Reg 826.1.2.1 overcurrent at every protective device point recalculated — the wind contribution adds to fault current at any common busbar; (4) Reg 551.7.1(c) (per A4 redraft) requires suitable protective device for bidirectional energy flow at the source connection; (5) Reg 826.1.4 surge protection: more sources = more switching events = more transient overvoltages, SPD specification may need uplift; (6) EMS / EEMS (requirements in Section 825 / Reg 825.1): the wind inverter has to coexist with PV + BESS scheduling. Cert evidence: existing EIC superseded by integrated PEI EIC referencing all sources + Section 551 generating-set updates + new isolation arrangement + revised RCD architecture + EREC G99 amendment (DNO needs to know there’s a third source).',
  },
  {
    question:
      'Why does Reg 826.1.2.1 require overcurrent calculation at every PEI protective device location for ALL possible configurations + minimum AND maximum current magnitudes?',
    options: [
      'Because island-mode fault current is inverter-limited and far lower than direct-feeding current',
      'There is no real engineering reason; the calculation is a purely administrative formality',
      'It is an optional calculation that designers may skip whenever it is convenient to do so',
      'Because the DNO mandates it for export billing purposes rather than for any safety reason',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 826.1.2.1: "Overload and short-circuit currents shall be determined at every point of the PEI where a protective device is installed: (a) for all possible configurations of each type of PEI; and (b) for situations corresponding to the minimum and maximum current magnitudes." The note explicitly states: "The operating mode influences greatly the overcurrent magnitude. In particular, in island mode, the short-circuit current will [be much lower]." The engineering reality: a 100 A BS EN 60898 type C MCB needs ~500-1000 A to trip in 0.4 s (per Reg 411.3.2). DNO supply gives 6-25 kA prospective — trips instantly. Pure-inverter island mode: inverter current-limits at ~1.1× rated (e.g. 5 kW single-phase inverter limits at ~25 A). A short-circuit downstream in island mode may produce only 25 A — the MCB doesn’t trip in disconnection time, ADS fails, persons at risk. Mitigation: RCDs (still work in island via N-E bond per Reg 826.1.1.2.2), inverter ride-through + automatic disconnection, designed minimum-fault verification at commissioning. Cert evidence: PEI overcurrent study covering all configurations + min/max current magnitudes per protective device.',
  },
  {
    question:
      'On a multi-source PEI, Reg 826.1.1.4 requires a warning notice for multi-source isolation. What does that notice need to say?',
    options: [
      'No specific message is required as long as a notice of some kind is present nearby',
      'Any general text placed near the source switches will satisfy the regulation',
      'It must warn that multiple sources exist and ALL source switches must be operated to isolate',
      'A single word such as "Danger" is sufficient on its own at the main switches',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 826.1.1.4: "A durable warning notice shall be permanently fixed in the vicinity of these main switches in such a position that any person seeking to operate any of these main switches will be warned of the need to operate all such switches to achieve isolation of the installation." BS 7671 doesn’t prescribe verbatim wording but the warning must communicate: (1) the installation has multiple sources; (2) operating any single switch does NOT isolate; (3) all source-side switches must be operated. Practical UK 2025-26 wording at the PEI main consumer unit: "WARNING. Multiple sources of supply. To isolate, switch OFF: (1) DNO main switch at MET; (2) PV DC isolator at inverter; (3) PV AC isolator at inverter; (4) BESS DC isolator; (5) BESS AC isolator; (6) EV charger isolator (if V2G). Failure to isolate ALL sources presents risk of electric shock from energised conductors fed by remaining live sources." This sits alongside the PME warning notice (Reg 514 family). Cert evidence: photograph of installed notice + verification of every switch location in the EIC.',
  },
  {
    question:
      'Reg 826.1.3 says "When the public network is not energized, prosumers shall operate their private individual PEI in island mode or automatically disconnect all local power supplies." What does this enforce?',
    options: [
      'It is an optional recommendation that prosumers are free to ignore in practice',
      'The PEI must enter island mode or disconnect all local sources, never feed a dead grid',
      'It varies and depends purely on the inverter manufacturer’s default settings',
      'There is no requirement; inverters may continue feeding the de-energised network',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 826.1.3: "When the public network is not energized, prosumers shall operate their private individual PEI in island mode or automatically disconnect all local power supplies. As control devices and protective devices may be operated more frequently than in non-PEI, selection of components is recommended to be made according to the increased duty requirements." Two compliant outcomes when DNO supply is lost: (1) Island mode — the PEI continues operating on local sources, but disconnected from DNO per Reg 826.1.1.2.2 (all live conductors disconnect + local N-E bond established). Requires grid-forming inverter (typically BESS) + island-mode switching device per Reg 826.1.1.5. UK 2025-26 examples: Tesla Powerwall Backup Gateway, SolarEdge Backup Interface, GivEnergy Whole Home Backup. (2) Auto-disconnect of all local sources — the Reg 551.7.5 anti-islanding default for all UK 2025-26 grid-following inverters — inverter detects loss of mains and disconnects. Most existing UK PV + BESS sites use option (2); option (1) is the resilience / off-grid path. Cert evidence: declare which mode + verify at commissioning (simulated grid loss).',
  },
  {
    question:
      'Why is Chapter 82 added to BS 7671 instead of just expanding each per-technology section (712, 722, 551, 57)?',
    options: [
      'It was added by mistake and simply duplicates the existing per-technology sections',
      'Because multi-source coexistence is a new design challenge owned by no single section',
      'There is no real reason for it; it could equally well sit inside Section 712 for PV',
      'Only to renumber the existing PV and EV charging regulations into one place',
    ],
    correctAnswer: 1,
    explanation:
      'The architectural distinction: per-technology sections answer "how do I install THIS technology safely?" Chapter 82 answers "how do these technologies coexist + interact + transition between operating modes safely?" These are different design problems and require different framing. Single-source design is a fixed-topology problem; multi-source design is a state-machine problem (every combination of sources operating = a different topology with different protective behaviour). Chapter 82 introduces: Reg 824.2 operating modes; Reg 826.1.1.1 protection in all modes; Reg 826.1.1.2 system earthing including the island-mode N-E bond; Reg 826.1.1.4 multi-source isolation; Reg 826.1.2.1 overcurrent at every point for every configuration; Reg 826.1.4 SPD against switching transients; EEMS recognition (the 826.7 contents recognise an EEMS may be incorporated; requirements are in Section 825 / Reg 825.1); Reg 826.2 interaction with public network (EREC G99 / G100 fits here); collective + shared PEI (defined in the 826.7 contents — apartment blocks, community schemes). UK 2025-26 PEI proliferation (PV+BESS+EV+heat pump common) made this chapter necessary. Cert evidence: per-technology evidence remains relevant but the integrating EIC + PEI compliance summary is the closing document.',
  },
];

const faqs = [
  {
    question: 'How does Chapter 82 relate to Section 551, Section 712, Chapter 57, Section 722?',
    answer:
      'Per-technology sections are the SINGLE-SOURCE anchors: Section 712 (PV), Chapter 57 (BESS), Section 722 (EV / V2G), Section 551 (generating sets generally). Chapter 82 is the MULTI-SOURCE integration framework that sits above them. On a single-source site (just PV, just EV), the per-technology section is enough. On a multi-source PEI (PV + BESS + EV + heat pump), Chapter 82 adds the integration requirements: operating modes, multi-source isolation, overcurrent across configurations, EEMS coordination. The per-technology evidence remains but Chapter 82 is the integrating layer.',
  },
  {
    question: 'What is the difference between direct-feeding mode and island mode?',
    answer:
      'Direct-feeding mode (Reg 824.2): PEI connected to the DNO public network — importing when local generation insufficient, exporting when local generation exceeds local load. This is the default operating mode for a UK 2025-26 grid-connected PV + BESS site. Island mode: PEI disconnected from the DNO public network, operating entirely on its local sources + storage. Requires grid-forming inverter (typically BESS) capable of holding voltage + frequency without grid reference + local N–E bond per Reg 826.1.1.2.2. Most UK PV + BESS sites are NOT island-capable as installed; island mode is a deliberate design choice (resilience, off-grid).',
  },
  {
    question: 'Does every PEI need island-mode capability?',
    answer:
      'No. Reg 826.1.3 requires that on DNO loss the PEI either (a) enters island mode OR (b) disconnects all local sources. Option (b) is the default for most UK 2025-26 grid-following inverters (Reg 551.7.5 anti-islanding). Island capability is a deliberate design choice — resilience for a customer who wants the lights on during a power cut; off-grid for a remote site; microgrid for community resilience schemes. Island capability requires grid-forming inverter + Reg 826.1.1.2.2 N-E switching + island-mode isolation per Reg 826.1.1.5. Cost: £2-5k uplift on hardware + commissioning.',
  },
  {
    question: 'What is the EEMS (Electrical Energy Management System)?',
    answer:
      'EEMS is the BS 7671 Chapter 82 recognition of the role an Energy Management System plays in a PEI. The EEMS coordinates: source priority (use cheapest source first, charge BESS from solar surplus before grid), load priority (heat pump / EV scheduling around tariffs), export limiting (G100), island-mode transition, demand response. The Chapter 82 contents (826.7) recognise that an EEMS may be incorporated into a PEI; the EEMS requirements themselves are given in Section 825 (Reg 825.1). The EEMS itself is implementation: SolarEdge / Tesla / GivEnergy vendor EMS, or third-party (Home Assistant + Sense + Modbus). §10.2 covers EMS in detail.',
  },
  {
    question: 'Is a domestic PV + BESS install a PEI under Chapter 82?',
    answer:
      'Yes — any installation with local generation in addition to / instead of the public supply is a PEI. UK 2025-26 reality: a typical 4 kWp PV + 5 kWh BESS retrofit IS a PEI under Chapter 82 and the integration requirements apply, even if the customer perceives it as "just adding solar". The practical scope: Reg 826.1.1.1 protection in all modes (typically direct-feeding only — not island); Reg 826.1.1.4 multi-source isolation (DNO + PV + BESS = 3 switches + warning notice); Reg 826.1.2.1 overcurrent across configurations; Reg 551.7.5 anti-islanding (already required by Section 551). The cert evidence bundle treats Chapter 82 as the integrating reference.',
  },
];

export default function RenewableEnergyModule10Section1() {
  const navigate = useNavigate();

  useSEO({
    title: 'Hybrid systems landscape + Chapter 82 PEI framework | Renewable Energy 10.1 | Elec-Mate',
    description:
      'BS 7671 Chapter 82 Prosumer’s Electrical Installation (PEI) as the integration framework for multi-source sites. Reg 826.1.1.1 protection in all operating modes, Reg 826.1.1.4 multi-source isolation, Reg 826.1.2.1 overcurrent across configurations. The architectural shift from single-source to multi-source design.',
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
            eyebrow="Module 10 · Section 1 · BS 7671:2018+A4:2026 · Chapter 82 PEI"
            title="Hybrid systems landscape + Chapter 82 PEI framework"
            description="The integration module opener. Where PV + BESS + EV + heat pump + (sometimes) wind / CHP coexist on one site — and BS 7671 Chapter 82 is the framework that integrates the per-technology rules from M2-M9. Reg 826.1.1.1 protection in all operating modes. Reg 826.1.1.4 multi-source isolation. Reg 826.1.2.1 overcurrent across configurations. The architectural shift from single-source to multi-source design."
            tone="yellow"
          />

          <TLDR
            points={[
              'A Prosumer’s Electrical Installation (PEI) per Chapter 82 = an installation with one or more local sources of supply (PV, BESS, wind, CHP, V2G EV, etc.) in addition to or instead of the DNO public network. The customer is producer + consumer.',
              'Reg 826.1.1.1: protection of persons + property shall be provided in all operating modes — direct feeding, island, transitions between them.',
              'Reg 826.1.1.2.2 island-mode neutral: when in island mode, all live conductors disconnect from DNO + local N-E bond established without overlap with DNO neutral switching.',
              'Reg 826.1.1.4 multi-source isolation: one main switch per source + EITHER a durable warning notice that ALL switches must be operated to isolate the installation OR a suitable interlock system.',
              'Reg 826.1.2.1 overcurrent at every PEI point for ALL configurations + min AND max current magnitudes. Island mode short-circuit current is dramatically lower than direct-feeding — protective device design must accommodate both extremes.',
              'Reg 826.1.3: on DNO loss, PEI either operates in island mode OR disconnects all local sources — not "keep feeding the dead grid".',
              'Reg 826 includes EEMS (Electrical Energy Management System) recognition — the integration layer that coordinates sources + loads + tariffs + export limits (§10.2).',
              'Per-technology sections (712 PV, 57 BESS, 722 EV, 551 generators) remain the single-source anchors; Chapter 82 is the integrating layer for multi-source PEI sites.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define a Prosumer’s Electrical Installation (PEI) under Chapter 82 of BS 7671.',
              'Apply Reg 826.1.1.1 — protection of persons + property in all PEI operating modes.',
              'Apply Reg 826.1.1.2.2 island-mode neutral handling: DNO disconnect + local N-E bond without overlap.',
              'Apply Reg 826.1.1.4 multi-source isolation: per-source switch + integrated warning notice or a suitable interlock system.',
              'Apply Reg 826.1.2.1 — overcurrent at every PEI point for every configuration + minimum AND maximum current magnitudes.',
              'Apply Reg 826.1.3 — on DNO loss, island OR disconnect, never both energised in parallel without DNO.',
              'Distinguish direct-feeding mode (Reg 824.2 default) from island mode + the design choice to be island-capable.',
              'Position Chapter 82 as the integrating layer above per-technology sections (712 PV, 57 BESS, 722 EV, 551 generating sets).',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Single-source design is a fixed-topology problem. Multi-source PEI design is a state-machine problem — every combination of sources is a different topology with different protective behaviour. Chapter 82 is the framework for that shift.
          </Pullquote>

          <ContentEyebrow>What a PEI is + why Chapter 82 was added</ContentEyebrow>

          <ConceptBlock
            title="The Prosumer’s Electrical Installation (PEI)"
            plainEnglish="A PEI is an electrical installation that combines local generation (PV, BESS, wind, CHP, V2G EV) with the DNO public supply. The customer simultaneously produces electricity (exports when local generation exceeds local load) and consumes (imports when local generation is insufficient). Chapter 82 of BS 7671 was added to govern the integration of these technologies into a coherent installation."
            onSite="UK 2025-26 reality: most domestic + commercial renewable sites are PEI. A 4 kWp PV + 5 kWh BESS retrofit IS a PEI under Chapter 82. The customer often doesn’t use the word; the installer must. Per-technology sections (712 PV, 57 BESS, 722 EV) cover the single-source rules; Chapter 82 adds the multi-source integration framework."
          >
            <p>What makes a PEI — the Chapter 82 perspective:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">One or more local sources</strong> — PV
                (Section 712), BESS (Chapter 57), wind / CHP / micro-hydro (Section 551),
                V2G EV (Section 722). Two or more = the multi-source PEI scenario this
                module covers
              </li>
              <li>
                <strong className="text-white">DNO connection</strong> —
                public-network interface for import + export. EREC G98 / G99 / G100
                govern this interface. Off-grid PEI has no DNO connection (a separate
                rural / island scenario)
              </li>
              <li>
                <strong className="text-white">Operating modes per Reg
                  824.2</strong> — direct-feeding mode (default, in parallel with
                DNO), island mode (disconnected, operating on local sources), and the
                transitions between them
              </li>
              <li>
                <strong className="text-white">Producer + consumer
                  duality</strong> — the same installation imports during low-generation
                / high-load periods + exports during high-generation / low-load periods.
                Energy flow is bidirectional through the DNO meter
              </li>
              <li>
                <strong className="text-white">EEMS — Electrical
                  Energy Management System</strong> — Reg 826 recognises the EEMS as
                the coordination layer across sources + loads + tariffs + export limits.
                §10.2 covers EMS in detail
              </li>
              <li>
                <strong className="text-white">Interaction with the
                  public network</strong> — Reg 826.2 + EREC G98 / G99 / G100 govern
                the DNO interface. §10.3-10.4 cover SEG + G100 export limit
              </li>
              <li>
                <strong className="text-white">Surge protection</strong>
                — Reg 826.1.4: PEI has more switching events (between sources, load
                shifting, mode transitions) than a non-PEI — SPD specification may
                need uplift
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per-technology DoC + per-technology EIC sections
                + integrating PEI EIC + Chapter 82 compliance summary + EREC
                correspondence + EMS commissioning record
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why Chapter 82 was needed in BS 7671:2018+A4"
            plainEnglish="Per-technology sections (712 PV, 57 BESS, 722 EV, 551 generating sets) cover how to safely install each technology in isolation. They don’t cover what happens when 3-4 of these coexist on one site — the operating-mode complexity, the multi-source isolation challenge, the overcurrent variation between modes, the EEMS coordination. Chapter 82 is the architectural anchor for that integration problem."
            onSite="The proliferation of UK 2025-26 multi-source sites — PV + BESS retrofits, EV adoption, heat pump rollout (BUS grant) — made the integration problem common. Chapter 82 closes the gap between per-technology and whole-installation design. The shift in mindset: from ‘install one technology safely’ to ‘design the multi-source coexistence’."
          >
            <p>What Chapter 82 adds beyond per-technology sections:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Operating-mode
                  recognition (Reg 824.2)</strong> — direct feeding, island,
                transitions. No per-technology section frames the install as a
                state-machine; Chapter 82 does
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.1
                  protection in all modes</strong> — single-source design verifies
                one topology; multi-source PEI must verify every combination
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.2.2 N-E bond
                  switching for island mode</strong> — doesn’t arise in any
                single-source section; categorically a Chapter 82 problem
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.4
                  multi-source isolation</strong> — per-source switches + a warning
                notice or a suitable interlock system. Single-source sections require one main switch
              </li>
              <li>
                <strong className="text-white">Reg 826.1.2.1 overcurrent
                  across configurations</strong> — island mode short-circuit
                current dramatically lower than direct-feeding mode; protective device
                design must accommodate both
              </li>
              <li>
                <strong className="text-white">Reg 826.1.4 SPD against
                  switching transients</strong> — PEI has more transient events
                from mode + source switching
              </li>
              <li>
                <strong className="text-white">EEMS recognition</strong>
                — Reg 826 explicitly includes Electrical Energy Management System
                scope. Per-technology sections don’t cover this coordination layer
              </li>
              <li>
                <strong className="text-white">Collective + shared PEI
                  (Reg 826.7 contents)</strong> — apartment blocks, community schemes,
                shared assets. A category that doesn’t exist in single-source
                sections
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.1 — General protection across operating modes"
            clause="The PEI shall be able to operate in any intended operating mode as defined in Regulation 824.2. According to needs, a PEI can change the operating mode at any time and may come back to the initial operating mode also at any time (for instance, from direct feeding mode to island mode and then back to direct feeding mode). Protection of persons and properties shall be provided in all operating modes."
            meaning="Reg 826.1.1.1 is the foundational requirement of Chapter 82 — protective design must work for every operating mode the PEI is intended to enter. In a single-source install, design verifies one topology. In a multi-source PEI, design must verify: (a) DNO + all local sources in parallel (the most common state in normal operation); (b) DNO + some local sources; (c) DNO alone; (d) island mode (local sources only); (e) every transition. The design effort is multiplied; the cert evidence bundle records each verified configuration. Reg 826.1.2.1 then makes this concrete by requiring overcurrent calculation at every PEI point for every configuration. UK 2025-26 reality: most PEI installs are direct-feeding only (no island capability) — in that case the configurations to verify are the source-combination permutations during normal operation."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Operating modes + island-mode neutral handling</ContentEyebrow>

          <Pullquote>
            Island mode isn’t ‘keep running when the DNO trips’. It’s a deliberately-designed, electrically-isolated operating state with its own earthing, its own neutral bond, its own protective behaviour — and Chapter 82 is the framework that codifies it.
          </Pullquote>

          <ConceptBlock
            title="Direct-feeding mode vs island mode"
            plainEnglish="Reg 824.2 defines the operating modes. Direct-feeding mode: PEI connected to DNO, importing + exporting in parallel. The UK 2025-26 default for almost all grid-connected PV + BESS. Island mode: PEI disconnected from DNO, operating on its local sources. Requires grid-forming inverter + island-mode switching + N-E bond per Reg 826.1.1.2.2. A deliberate design choice, not a default."
            onSite="Most UK 2025-26 PV + BESS sites are direct-feeding ONLY — they shut down on grid loss via Reg 551.7.5 anti-islanding. Island capability is the resilience / off-grid path — £2-5k uplift for backup gateway hardware (Tesla, SolarEdge, GivEnergy) + commissioning + Reg 826 N-E switching verification. Customer-facing: the difference between ‘my solar pays my bills’ vs ‘my solar keeps the lights on during a power cut’."
          >
            <p>Direct-feeding vs island operating-mode characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Direct-feeding mode</strong>
                — PEI in parallel with DNO. DNO sets voltage + frequency. Local
                inverters grid-following (sync to DNO). Local sources export when surplus
                + import from DNO when deficient. UK 2025-26 default
              </li>
              <li>
                <strong className="text-white">Island mode</strong> —
                PEI disconnected from DNO. Grid-forming inverter (typically BESS) sets
                voltage + frequency. Local sources synchronise to the grid-forming
                inverter. Loads served from local generation + storage only
              </li>
              <li>
                <strong className="text-white">Transition direct →
                  island</strong> — triggered by DNO loss or manual switch. Requires:
                detection (loss-of-mains), N-E bond change (Reg 826.1.1.2.2 non-overlap),
                inverter mode change (grid-following → grid-forming), load-shed
                decisions (if local generation insufficient)
              </li>
              <li>
                <strong className="text-white">Transition island →
                  direct</strong> — DNO restored, synchronisation check, N-E bond
                reverts to DNO, inverters resume grid-following. Reg 551.7.5
                anti-islanding still applies as final defence
              </li>
              <li>
                <strong className="text-white">Short-circuit current
                  difference</strong> — direct-feeding: DNO 6-25 kA prospective
                + inverter contribution ~1.1× rated. Island: only inverter
                contribution (a few hundred amps at most). Reg 826.1.2.1 requires
                protective device design for both extremes
              </li>
              <li>
                <strong className="text-white">Earthing</strong> — Reg
                826.1.1.2 + Reg 542.2.2: island mode needs its own earth electrode
                arrangement; DNO earth connection may be retained but the N-E bond
                changes per Reg 826.1.1.2.2
              </li>
              <li>
                <strong className="text-white">UK 2025-26 hardware</strong>
                — island-capable inverter / backup gateway: Tesla Powerwall
                Gateway, SolarEdge Backup Interface, GivEnergy Whole Home Backup,
                Sonnen, Enphase IQ8. Cost uplift £2-5k hardware + commissioning
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — declared operating modes + commissioning test
                of each transition + N-E bond verification per Reg 826.1.1.2.2 +
                island-mode switching device per Reg 826.1.1.5
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Island-mode neutral handling (Reg 826.1.1.2.2)"
            plainEnglish="When the PEI enters island mode, it electrically disconnects from the DNO. The system earthing arrangement must reconfigure: all live conductors (line AND neutral) disconnect from DNO, and a local N-E bond establishes for RCD operation. Crucially, the switching must NOT overlap — the DNO N-E and the local N-E must never be in circuit simultaneously."
            onSite="This is the architectural reason island-capable PEI requires specific hardware (backup gateway). A standard contactor / changeover switch is not enough — the N-E switching sequence has to be controlled to prevent overlap. UK 2025-26 backup gateways implement this internally with controlled sequencing. Verified at commissioning: simulated grid loss + transition test + N-E bond measurement in each state."
          >
            <p>The Reg 826.1.1.2.2 sequence:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Trigger</strong> — loss
                of DNO supply detected (voltage drop, frequency excursion, RoCoF,
                loss-of-mains relay). Backup gateway initiates transition sequence.
                Note: EREC G99 disallows Vector Shift as a loss-of-mains method for
                type-tested generation — RoCoF (with voltage / frequency monitoring)
                is the required method for the type-tested inverters used in virtually
                all LCT installs; Vector Shift survives only on legacy / non-type-tested
                kit
              </li>
              <li>
                <strong className="text-white">Step 1</strong> — DNO
                line conductors disconnect (contactor / switch-disconnector opens)
              </li>
              <li>
                <strong className="text-white">Step 2</strong> — DNO
                neutral disconnects. CRITICAL: at this instant, the PEI has no N-E
                reference — RCDs would not operate correctly + protective measures
                inoperative. Must be brief
              </li>
              <li>
                <strong className="text-white">Step 3</strong> — Local
                N-E bond establishes (local neutral switch closes between PEI neutral
                bar + PE bar / local earth electrode per Reg 826.1.1.2)
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.2.2
                  non-overlap</strong> — step 2 + step 3 must NOT overlap with
                a state where BOTH DNO N-E + local N-E are in circuit (would create
                circulating current through earthing system)
              </li>
              <li>
                <strong className="text-white">Result</strong> — PEI
                operating as a local TN-S island with local N-E bond + local earth
                electrode + grid-forming inverter setting V + f
              </li>
              <li>
                <strong className="text-white">Reverse transition (DNO
                  restored)</strong> — step 1: synchronisation check (PEI inverter
                must match DNO V + f before reconnect); step 2: local N-E bond opens;
                step 3: DNO neutral connects; step 4: DNO line connects
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — backup gateway manufacturer DoC declaring Reg
                826.1.1.2.2 compliance + commissioning test of grid-loss transition
                + N-E bond measurement (continuity + isolation) in each state +
                photo of warning notice
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.2.2 — Neutral conductor in island mode"
            clause="When in island mode, all live conductors shall be disconnected from the DNO supply. To prevent incorrect operation of RCDs the use of a neutral switch device shall connect the neutral and the earth of the PEI without overlapping with switching of the DNO neutral."
            meaning="Reg 826.1.1.2.2 codifies the architectural foundation of any island-capable PEI. The clause has three parts: (1) all live conductors (line + neutral) disconnect from DNO when entering island mode; (2) a local N-E bond establishes to allow RCDs to operate correctly within the island; (3) the switching must NOT overlap — there must never be an instant when both the DNO N-E bond and the local N-E bond are simultaneously in circuit. The non-overlap rule prevents circulating earth current + RCD false-trip + protection inoperative states. UK 2025-26 hardware that implements this: Tesla Powerwall Backup Gateway, SolarEdge Backup Interface, GivEnergy Whole Home Backup, Sonnen, Enphase IQ8 + System Controller. Verification at commissioning: simulated grid-loss test + N-E continuity measurement in direct-feeding state + N-E continuity measurement in island state. Cert evidence bundle records both states explicitly."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Multi-source isolation + overcurrent across configurations</ContentEyebrow>

          <ConceptBlock
            title="Reg 826.1.1.4 multi-source isolation"
            plainEnglish="When an installation is supplied from more than one source, one main switch isn’t enough. Reg 826.1.1.4 requires a main switch suitable for isolation for EACH source of supply, plus EITHER a durable warning notice fixed nearby telling anyone operating any one switch that ALL switches must be operated to achieve isolation OR a suitable interlock system. The hazard otherwise: engineer assumes installation is dead after opening the DNO main switch + dies when contacting a conductor still fed by PV / BESS / V2G."
            onSite="UK 2025-26 typical multi-source isolation on a PV + BESS + EV PEI: DNO main switch at MET + PV AC isolator at inverter + PV DC isolator at inverter + BESS AC isolator + BESS DC isolator + EV charger isolator (if V2G). Six isolation points; warning notice listing them all. Trained-person isolation procedure documented + included in the customer handover pack."
          >
            <p>Multi-source isolation architecture:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">One switch per source</strong>
                — DNO main switch + PV AC + PV DC + BESS AC + BESS DC + V2G EV
                + any other source. Each switch must be suitable for isolation per
                Reg 537.2 + accessible without dismantling enclosures
              </li>
              <li>
                <strong className="text-white">Warning notice</strong>
                — durable, permanently fixed in vicinity of the isolation
                points. Must communicate: multiple sources exist + ALL switches must
                be operated to isolate + electric shock risk if not all operated
              </li>
              <li>
                <strong className="text-white">Notice location</strong>
                — typically at the main consumer unit / PEI distribution board.
                Consolidated notice listing all switches + their locations preferred
                over per-switch notices (clearer to read in emergency)
              </li>
              <li>
                <strong className="text-white">DC isolation</strong>
                — PV DC + BESS DC isolators are separate from AC isolators
                (different switching characteristics + voltage levels). Both AC + DC
                must be operated for full isolation
              </li>
              <li>
                <strong className="text-white">Customer-accessible vs
                  trained-person</strong> — customer should be able to operate
                customer-facing isolators in emergency; trained-person isolation
                procedure (full multi-source isolation) documented for engineer
                attendance
              </li>
              <li>
                <strong className="text-white">Reg 514 family
                  interaction</strong> — the multi-source warning notice sits
                alongside the PME warning notice + the BESS warning notice + the PV
                array warning notice. Cluttered — consolidated notice design
                helps
              </li>
              <li>
                <strong className="text-white">Future-proofing</strong>
                — if customer plans to add EV / V2G / wind later, warning
                notice + isolation procedure must be updated; not a one-time
                install task
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — isolation schematic showing every source +
                switch + warning notice text + photograph of installed notice +
                isolation-procedure document + customer handover acknowledgement
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 826.1.2.1 overcurrent at every PEI point for every configuration"
            plainEnglish="Reg 826.1.2.1 requires overcurrent calculation at every PEI protective device location, for all possible PEI configurations, AND for both minimum + maximum current magnitudes. The reason: operating mode dramatically influences fault-current magnitude. In direct-feeding mode the DNO supplies ~6-25 kA prospective. In island mode only the inverter contributes — limited to ~1.1× rated current. A protective device sized only for direct-feeding mode may fail to clear an island-mode fault."
            onSite="The practical consequence: a 5 kW single-phase inverter in island mode limits fault current to ~25 A. A standard B-curve MCB needs 5× rated current to trip in 0.4 s. A 10 A MCB downstream needs ~50 A fault current — the inverter can’t deliver it. ADS fails. Mitigation: rely on RCDs (still effective in island via N-E bond per Reg 826.1.1.2.2) + inverter ride-through + automatic disconnection if persistent fault. Verified at commissioning by deliberately inducing a downstream fault in island mode + checking RCD operation."
          >
            <p>What Reg 826.1.2.1 requires in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Every protective device
                  point</strong> — main switch, sub-DBs, RCBO at each circuit,
                generator-side breakers. Each location needs overcurrent calculation
              </li>
              <li>
                <strong className="text-white">Every PEI
                  configuration</strong> — DNO+PV+BESS+EV, DNO+PV+BESS, DNO+PV,
                BESS+PV island, BESS-only island, EV V2G + PV island, etc. The
                permutations matter
              </li>
              <li>
                <strong className="text-white">Minimum AND maximum</strong>
                — maximum = direct-feeding with all sources contributing
                (highest PSCC for breaker breaking capacity); minimum = island mode
                with only smallest inverter contributing (lowest fault current for
                disconnection time check)
              </li>
              <li>
                <strong className="text-white">Direct-feeding maximum
                  PSCC</strong> — DNO Ipf (∼6-25 kA UK 2025-26 typical) +
                inverter contribution. Breaker breaking capacity must exceed
              </li>
              <li>
                <strong className="text-white">Island mode minimum
                  fault current</strong> — only inverter contribution (~1.1×
                rated). E.g. 5 kW single-phase → ~25 A max fault. Compare against
                Reg 411 ADS table 41.2/41.4 disconnection requirements
              </li>
              <li>
                <strong className="text-white">RCD effectiveness in
                  island</strong> — Reg 826.1.1.2.2 N-E bond ensures RCD has a
                fault path. Reg 415.1 30 mA still applies. RCD typically the primary
                ADS path in island mode (because overcurrent disconnection may not
                achieve required time)
              </li>
              <li>
                <strong className="text-white">Reg 826.1.2.2 direction +
                  polarity</strong> — protective devices selected considering all
                possible directions of current flow + polarity. Bidirectional flow
                = directional discrimination considerations
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — PEI overcurrent study covering each
                protective-device location × each configuration × min + max
                current magnitudes; commissioning test results per configuration
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.4 — Multi-source isolation"
            clause="Where an installation is supplied from more than one source, a main switch suitable for isolation (for example, switch-disconnector) shall be provided for each source of supply. A durable warning notice shall be permanently fixed in the vicinity of these main switches in such a position that any person seeking to operate any of these main switches will be warned of the need to operate all such switches to achieve isolation of the installation."
            meaning="Reg 826.1.1.4 is the multi-source isolation requirement. The fundamental safety problem: in a single-source install, opening the main switch isolates the installation. In a multi-source PEI, opening any single switch leaves the installation energised from the other sources. Engineer assumption + reality mismatch = fatal hazard. Mitigation: per-source main switch (Reg 537.2 isolation-rated) + EITHER a clearly-visible warning notice listing all switches OR a suitable interlock system + trained-person isolation procedure. UK 2025-26 typical PEI: 4-6 isolation points (DNO + PV AC + PV DC + BESS AC + BESS DC + V2G EV). Cert evidence bundle: isolation schematic + warning notice text + photograph of installed notice + isolation procedure document in customer handover pack. Notice wording must communicate three things: multiple sources exist, ALL switches must be operated, electric shock risk if not all operated."
          />

          <InlineCheck {...inlineChecks[3]} />

          <Chapter82Framework caption="Chapter 82 — the Prosumer's Electrical Installation — and the Reg 826.x family it brings: PEI types and operating modes, multi-source isolation and overcurrent, and the EEMS in Section 825." />

          <SectionRule />

          <Scenario
            title="Domestic PEI — PV + BESS + EV V2G + heat pump retrofit"
            situation="UK 2025-26 typical PEI build-out. Existing semi-detached house, 100 A single-phase service. Customer installs over 18 months: 4 kWp PV (Section 712) + 10 kWh BESS (Chapter 57) + 7 kW EV charger with V2G upgrade (Section 722) + 8 kW ASHP (M8). The final state is a 4-source PEI under Chapter 82."
            whatToDo="Chapter 82 integration framework applies. Per-technology evidence: Section 712 PV EIC + Chapter 57 BESS EIC + Section 722 V2G EV EIC + ASHP electrical install EIC. Chapter 82 integrating layer: (1) Reg 826.1.1.1 protection in all operating modes verified — PEI is direct-feeding only (no backup gateway installed — customer chose not to add island capability); (2) Reg 826.1.1.4 multi-source isolation: DNO + PV AC + PV DC + BESS AC + BESS DC + V2G EV = 6 isolation points + warning notice listing all + isolation procedure in customer handover; (3) Reg 826.1.2.1 overcurrent recalculated at each protective-device location for each configuration — max PSCC at main consumer unit considering DNO + all inverter contributions; (4) Reg 826.1.4 SPD upgrade — PEI switching events trigger SPD specification uplift from Type 2 to Type 1+2 combined; (5) EREC G99 amended for each source addition; (6) Reg 551.7.5 anti-islanding verified at each inverter; (7) EEMS coordination — vendor EMS (e.g. GivEnergy) or third-party (Home Assistant + Modbus) configured to prioritise PV → BESS → EV V2G + manage HP scheduling around ToU tariff. Cert evidence bundle: integrated PEI EIC + per-technology EICs + Chapter 82 compliance summary + EREC G99 correspondence + EMS commissioning record + photographs of warning notices."
            whyItMatters="This is the UK 2025-26 future-state domestic PEI. It is NOT the sum of 4 single-source installs — it is a single Chapter 82 PEI with integrated protective architecture + multi-source isolation + overcurrent across configurations + EMS coordination. Treating each addition as standalone misses the integration challenge. Cert evidence bundle must reflect the integrated design — customer + DNO + next-engineer all need to see the multi-source picture."
          />

          <Scenario
            title="Commercial PEI — light industrial unit with PV + BESS + EV charging fleet"
            situation="Light industrial unit, 200 A three-phase supply. Customer adds: 30 kWp commercial rooftop PV + 50 kWh BESS + 4×22 kW EV chargers (fleet) + 1×50 kW DC fast charger for visitor parking. Total local generation potential 30 kW, total EV charging load up to 138 kW peak. Light industrial process load 40-60 kW typical."
            whatToDo="Larger-scale PEI under Chapter 82 — same framework, multiplied complexity. (1) Reg 826.1.1.1 protection in all configurations: chargers may operate in any combination, PV generation varies, BESS may charge or discharge. (2) Reg 826.1.1.4 multi-source isolation: DNO + PV + BESS + each EV charger string = 6+ isolation points. (3) Reg 826.1.2.1: PSCC at main panel considers DNO + PV + BESS contribution simultaneously (commercial PSCC typically 16-25 kA at LV); island mode unlikely for this site (BESS sized for peak shaving, not full island), but if configured — fault current limited to inverter capability. (4) Reg 826.1.2.2 directional protection: bidirectional flow through main metering + EV V2G capability. (5) EREC G99 formal application — site export potential 20+ kW. (6) EREC G100 export limit may be applied by DNO if local network constrained (§10.4). (7) EMS critical at this scale — OCPP-managed EV charger coordination + PV → BESS → EV priority + tariff arbitrage. Cert evidence: PEI EIC integrating all sources + Chapter 82 compliance summary + EREC G99 reference + G100 evidence if applicable + EMS commissioning + DNO connection agreement."
            whyItMatters="Commercial PEI at this scale = 6-figure project (£200-500k typical). The integration complexity multiplies vs domestic: more sources, more loads, more configurations, more revenue streams (SEG + grid services + EV charging revenue). Chapter 82 is the architectural anchor that keeps the design coherent. EREC G99 + G100 + EMS commissioning are the external-framework integration points. Cert evidence bundle is the document that ties customer + DNO + half-yearly compliance check + insurance + future-engineer attendance into one referenceable artifact."
          />

          <CommonMistake
            title="Treating a multi-source PEI as separate per-technology installs"
            whatHappens="Installer adds PV in year 1 (single-source design + Section 712 EIC), BESS in year 2 (treats as Chapter 57 standalone), V2G EV in year 3 (Section 722 standalone). Each install has its own EIC + warning notice. By year 3 the customer has 3 separate certificates, 3 warning notices in different locations, no integrated isolation procedure, no Reg 826.1.1.1 verification that protective design works in all combinations, no overcurrent recalculation per Reg 826.1.2.1 considering all sources, no EMS coordination, surge protection still Type 2 from year-1 design."
            doInstead="Treat ANY addition to an existing single-source install as transitioning into a multi-source PEI under Chapter 82. Specifically: (1) update the integrating PEI EIC — not a separate per-technology EIC; (2) recalculate overcurrent at every protective-device location per Reg 826.1.2.1; (3) update the multi-source warning notice + isolation procedure per Reg 826.1.1.4; (4) review SPD specification per Reg 826.1.4; (5) verify Reg 551.7.5 anti-islanding at each new inverter + Reg 551.4.2 RCD effectiveness across all source combinations; (6) document EMS coordination + priority logic. Cert evidence bundle: integrated PEI EIC supersedes the previous single-source EIC, references all per-technology DoC, captures the multi-source picture."
          />

          <CommonMistake
            title="Confusing direct-feeding with island mode (and Reg 551.7.5 with Reg 826.1.1.2.2)"
            whatHappens="Installer assumes any PEI with BESS can run in island mode during power cuts. Customer expects the lights to stay on. Reality: the PEI is direct-feeding only — grid-following inverters + Reg 551.7.5 anti-islanding shut down all local sources when DNO is lost. No backup gateway, no Reg 826.1.1.2.2 N-E switching, no grid-forming capability. Customer angry; installer reputation damaged."
            doInstead="Be explicit about operating-mode capability at quote stage. Direct-feeding mode = the UK 2025-26 default, no backup during DNO loss. Island mode capability = deliberate design choice, requires grid-forming inverter / backup gateway (Tesla, SolarEdge, GivEnergy, Sonnen, Enphase), £2-5k uplift, Reg 826.1.1.2.2 N-E switching, Reg 826.1.1.5 island-mode switching device, commissioning verification of transitions. Customer-facing language: ‘your solar will save you money’ (direct-feeding) vs ‘your solar will keep the lights on during a power cut’ (island-capable). Document the chosen mode + customer acknowledgement in the cert evidence bundle. Reg 551.7.5 anti-islanding is the DEFAULT defence in direct-feeding mode; Reg 826.1.1.2.2 is the island-mode architectural foundation — different regs, different design problems."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A Prosumer’s Electrical Installation (PEI) is an installation with one or more local sources of supply in addition to or instead of the DNO public network. Customer is producer + consumer.',
              'BS 7671 Chapter 82 is the integration framework that sits ABOVE per-technology sections (712 PV, 57 BESS, 722 EV, 551 generators). Per-technology = single-source rules; Chapter 82 = multi-source coexistence.',
              'Reg 826.1.1.1: protection of persons + property required in all operating modes per Reg 824.2 — direct-feeding, island, transitions between them.',
              'Reg 826.1.1.2.2 island-mode neutral: all live conductors disconnect from DNO + local N-E bond establishes WITHOUT overlap with DNO neutral switching.',
              'Reg 826.1.1.4 multi-source isolation: per-source main switch + EITHER a durable warning notice in the vicinity warning that ALL switches must be operated to isolate OR a suitable interlock system.',
              'Reg 826.1.2.1: overcurrent calculation at every PEI protective-device point for ALL possible configurations + both minimum AND maximum current magnitudes. Island-mode short-circuit current dramatically lower than direct-feeding.',
              'Reg 826.1.3: on DNO loss, PEI either operates in island mode OR disconnects all local sources — never keep feeding a dead grid.',
              'Reg 826.1.4: SPD specification considers PEI switching transients (between sources, mode transitions) — may need uplift from Type 2 to Type 1+2 combined.',
              'EEMS (Electrical Energy Management System) recognised by Chapter 82 as the coordination layer for sources + loads + tariffs + export limits.',
              'UK 2025-26 reality: most domestic PEI is direct-feeding only; island capability is a deliberate design choice (£2-5k uplift) requiring grid-forming inverter + Reg 826.1.1.2.2 N-E switching hardware.',
              'Cert evidence bundle: integrated PEI EIC + per-technology EICs + Chapter 82 compliance summary + EREC G99 / G100 correspondence + EMS commissioning + photographs of multi-source warning notice + isolation-procedure document.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-10')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 10
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-10-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                10.2 Energy Management Systems (EMS)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
