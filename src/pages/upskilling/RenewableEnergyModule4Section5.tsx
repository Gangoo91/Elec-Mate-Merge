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
    id: 'm4s5-what-is-pei',
    question:
      'Chapter 82 (Prosumer\'s Electrical Installations, NEW in A4:2026) — what defines a PEI, and which installs are PEIs?',
    options: [
      'Only commercial',
      'A PEI is an electrical installation that BOTH consumes electricity (load) AND generates and/or stores electricity (source). The combination makes the installation a &ldquo;prosumer&rdquo; — both producer and consumer. UK examples: any hybrid PV+BESS install; any PV with diverter / EV-charging that\'s controlled by the install logic; any install with multiple sources (PV + wind + generator + battery). Chapter 82 applies to all these',
      'Only off-grid',
      'No installs',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 82 defines PEI as an installation that both consumes and generates / stores. The regulatory term recognises the modern reality: many domestic installs are no longer pure consumers — PV produces, BESS stores, EV charging consumes / can return (V2G), load controllers orchestrate. Reg 826.1 sets the PEI framework: protective measures for persons + property under multiple operating modes (direct feeding, island, etc.). Chapter 82 was added in A4:2026 to fill the regulatory gap that existed when PV / BESS / EV regs were scattered across Section 712, Chapter 57, Section 722.',
  },
  {
    id: 'm4s5-operating-modes',
    question:
      'Reg 824.2 defines PEI operating modes. What are THE THREE modes, and what does Reg 826.1.1.1 require?',
    options: [
      'No modes',
      'THREE operating modes per Reg 824.2: (1) DIRECT FEEDING — PEI receiving energy from the public network (import only); (2) REVERSE FEEDING — PEI exporting energy to the public network; (3) ISLAND MODE — PEI disconnected from the public network, generating its own supply from local sources. Reg 826.1.1.1: the PEI shall be able to operate in any intended operating mode; can change modes at any time and return; protection of persons and property shall be provided in each mode',
      'Customer chooses',
      'No protection',
    ],
    correctIndex: 1,
    explanation:
      'Reg 824.2 defines three PEI operating modes: (a) DIRECT FEEDING — energy flow public network → PEI (import); (b) REVERSE FEEDING — energy flow PEI → public network (export); (c) ISLAND — PEI disconnected from public network. A modern UK hybrid PV+BESS typically supports all three: direct feeding when PV output is low and battery is empty (import from grid); reverse feeding when PV surplus exists (export to grid); island when DNO fails (EPS-protected loads). Reg 826.1.1.1 requires the PEI to support all intended modes with persons + property protection maintained throughout each mode + during transitions. Cert evidence bundle records the supported modes.',
  },
  {
    id: 'm4s5-island-earthing',
    question:
      'Reg 826.1.1.2 — earthing arrangement for PEI island mode. What\'s required?',
    options: [
      'No earthing',
      'Earthing arrangement for island mode shall be connected to a suitable earth electrode complying with Reg 542.2.2. Any connection to the DNO earth means need not be disconnected (the DNO earth can remain in place; the PEI just adds a local electrode for island mode). Any change of system earthing type for island mode shall be reversible — supports return to direct feeding when DNO restored',
      'Use grid earth',
      'Customer choice',
    ],
    correctIndex: 1,
    explanation:
      'Reg 826.1.1.2 — PEI island mode earthing: dedicated earth electrode per Reg 542.2.2 (the standard BS 7671 earth electrode reg) so that the install has a reference earth when disconnected from DNO. The DNO\'s PME earth (typically TN-C-S) does NOT need to be disconnected — it stays in place but is supplemented by the local electrode for island mode. The arrangement must be reversible — when DNO power returns, the install transitions back to direct feeding mode using the DNO earth + local electrode together. Cert evidence bundle records the earth electrode location, resistance to true earth, and the reversibility provision.',
  },
  {
    id: 'm4s5-neutral-switch',
    question:
      'Reg 826.1.1.2.2 — neutral switching for PEI island mode. Why is it needed, and what does the reg require?',
    options: [
      'Not needed',
      'When the PEI transitions to island mode, ALL live conductors (including neutral) shall be disconnected from the DNO supply. To prevent incorrect operation of RCDs during transitions, a neutral switch device is used to connect the neutral and earth of the PEI without overlapping with switching of the DNO neutral. Practical: the hybrid inverter\'s EPS / island-mode contactor handles this; manufacturer specifies the configuration',
      'Customer\'s choice',
      'Same as direct mode',
    ],
    correctIndex: 1,
    explanation:
      'Reg 826.1.1.2.2 prevents RCD misoperation during PEI mode transitions. In direct feeding mode: DNO neutral is the reference (typically TN-C-S — neutral and earth combined at DNO transformer). In island mode: all live conductors (L1/L2/L3/N) disconnected from DNO; the PEI generates its own neutral via the inverter; this neutral must be earth-bonded for safety. Without proper switching, RCDs may misoperate during the transition (seeing apparent imbalances). The neutral switch device handles the make-before-break sequencing: connect local N-E first, then disconnect DNO N. Modern hybrid inverters with EPS (GivEnergy, Sigenergy, Tesla Powerwall, SolarEdge Energy Hub) handle this automatically.',
  },
  {
    id: 'm4s5-multi-source-isolation',
    question:
      'Reg 826.1.1.4 — isolation requirements when PEI has multiple sources. What does it mandate?',
    options: [
      'One main switch',
      'A main switch suitable for isolation (e.g. switch-disconnector) shall be provided for EACH source of supply. A durable warning notice shall be permanently fixed in the vicinity of these main switches in such a position that any person seeking to operate them is alerted to the multiple sources. Critical for safe maintenance: anyone working on the install must understand they need to isolate ALL sources (DNO, PV inverter AC output, BESS, generator, etc.)',
      'No isolation',
      'Customer\'s problem',
    ],
    correctIndex: 1,
    explanation:
      'Reg 826.1.1.4 mandates main switch per source for PEIs with multiple sources. Examples: DNO main isolator (existing); PV inverter AC isolator (per Reg 712.514.102); BESS AC isolator (per Reg 570.6); generator AC isolator (per Reg 551.2.4). Each isolator is a switch-disconnector suitable for full isolation (lockable per BS EN 60947-3). The durable warning notice is critical — it tells maintenance personnel that the install has multiple sources and ALL must be isolated. Cert evidence bundle records each isolator location, the warning notice location and wording.',
  },
  {
    id: 'm4s5-bidirectional-ocpd',
    question:
      'Reg 826.1.2.2 — protective device selection for PEI. What\'s the key requirement different from a normal install?',
    options: [
      'No difference',
      'Selection and erection of overcurrent protective devices shall take account of ALL POSSIBLE DIRECTIONS of current flow and polarity. Connection of a source via switchgear or controlgear assemblies shall comply with Reg 551.7.2 (parallel-operation requirements). Practical: every OCPD in a PEI must be BIDIRECTIONAL (current can flow either way during normal operation); parallel-source OCPDs must follow Reg 551.7 (including 551.7.1(c) bidirectional protective device — also NEW A4:2026)',
      'Only one direction',
      'No regs apply',
    ],
    correctIndex: 1,
    explanation:
      'Reg 826.1.2.2 — PEI bidirectional protection. In a PEI, current can flow either direction at many points: PV → grid (export), grid → load (import), BESS → load (discharge), grid → BESS (charge). OCPDs at these bidirectional points must operate in either direction. Parallels Reg 712.533.101 (DC OCPDs bidirectional for PV) and Reg 570.6.1.1.1 (bidirectional protective devices for BESS). Where source connects via switchgear: Reg 551.7.2 applies — including Reg 551.7.1(c) NEW A4:2026 bidirectional protective device. The cert evidence bundle records the OCPDs\' direction capability + Reg 551.7 compliance for parallel sources.',
  },
  {
    id: 'm4s5-island-mode-trigger',
    question:
      'Reg 826.1.3 — what does the PEI do when the public network goes off?',
    options: [
      'Nothing',
      'When the public network is not energised, prosumers shall operate their private individual PEI in island mode OR automatically disconnect all local power supplies. Either: (a) PEI continues to supply local loads from its own generation + storage (island mode); OR (b) PEI shuts down all local sources (avoids any island operation). The PEI design specifies which option is supported. Reg also notes that PEI control + protective devices may operate more frequently than non-PEI — selection should account for increased duty',
      'Customer manually intervenes',
      'PEI explodes',
    ],
    correctIndex: 1,
    explanation:
      'Reg 826.1.3 — public network outage handling. The PEI design must specify the response: (a) ISLAND MODE — local sources continue supplying local loads; anti-islanding to the DNO required to prevent backfeed; or (b) SHUTDOWN — all local sources disconnect when DNO supply lost; loads receive no power until DNO restored. Most modern UK hybrid PV+BESS systems support EPS island mode (option a) — Section 4.6 covers EPS in depth. The reg also notes that PEI components may switch / operate more frequently than non-PEI components; selection of devices (relays, contactors, OCPDs) should account for increased operational duty cycle.',
  },
  {
    id: 'm4s5-transient-protection',
    question:
      'Reg 826.1.4 — transient overvoltage protection for PEIs. What\'s different from non-PEI?',
    options: [
      'Same as non-PEI',
      'Switching overvoltages in a PEI may be more frequent and perhaps greater than in a non-PEI installation (e.g. due to switching between sources, load shedding, load shifting). Consideration shall be given to the installation of surge protective devices (SPDs) for the protection of the PEI installation and equipment against switching and lightning transients. Practical: PEI installs typically have more SPDs (AC + DC sides, multiple zones) than equivalent non-PEI',
      'No SPDs needed',
      'Customer\'s choice',
    ],
    correctIndex: 1,
    explanation:
      'Reg 826.1.4 — PEI transient overvoltage protection. PEIs experience more switching events than non-PEI installs: PV inverter switching to / from anti-islanding mode; BESS charge / discharge transitions; load-shedding actions; source switching (DNO ↔ island); EV charge start / stop. Each event can produce switching transients. The reg recommends SPDs throughout — typically AC-side SPDs at the consumer unit + DC-side SPDs on the PV side (per Reg 712.534) + DC-side SPDs at the BESS. Cert evidence bundle records the SPD specs + zones. Module 3 Section 5 covers SPD design in depth.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Customer\'s install: 5 kWp PV + 10 kWh BESS + Zappi EV charger. Is this a PEI under Chapter 82?',
    options: [
      'Not a PEI',
      'YES — this is a PEI. The install BOTH consumes electricity (load + EV charging) AND generates / stores electricity (PV generation + BESS storage). The combination triggers Chapter 82 applicability. PEI design pack required: operating modes (direct feeding + EPS island mode); multi-source isolation per Reg 826.1.1.4; bidirectional OCPDs per Reg 826.1.2.2; transient overvoltage protection per Reg 826.1.4. Plus integration with Section 712 (PV) and Chapter 57 (BESS)',
      'Only PV',
      'Customer\'s choice',
    ],
    correctAnswer: 1,
    explanation:
      'PEI = both consumes AND generates / stores. Customer install with PV + BESS + EV charging meets the definition unambiguously. Chapter 82 applies — all of Reg 826.1.1.1-826.1.4 design content required. The cert evidence bundle integrates: MCS MIS 3002 PV design pack (Module 3 content); Chapter 57 BESS design (Module 5 content); Chapter 82 PEI design (this section); Section 722 EV-charging design (Module 6 content); EREC G98 / G99 / G100 paperwork. The unified prosumer design pack is the modern UK install standard from A4:2026 onwards.',
  },
  {
    id: 2,
    question:
      'PEI in island mode — Reg 826.1.1.2.2 requires the neutral conductor to be handled specifically. Why?',
    options: [
      'No reason',
      'In direct feeding mode the DNO supplies the neutral reference (TN-C-S PME typical UK). When PEI goes to island mode, all live conductors including neutral are disconnected from DNO. The PEI must generate its own neutral via the inverter\'s output transformer or output stage; this neutral must be earth-bonded for safety + RCD operation. The neutral switch device makes the connection in the correct sequence — local N-E bonded before DNO N disconnected — to prevent RCD misoperation during transition',
      'Customer\'s choice',
      'No transition',
    ],
    correctAnswer: 1,
    explanation:
      'PEI mode transition handles the neutral specifically because: (1) the neutral is the reference for RCD operation — RCDs measure imbalance between L and N; (2) disconnecting DNO neutral without local N-E bonding leaves the install with no reference — RCDs may misoperate; (3) the PEI inverter\'s output stage provides the local neutral reference + earth bond. The transition sequence: (a) inverter starts up in island mode; (b) neutral switch device connects local N-E; (c) DNO main contactor disconnects all live conductors (including N); (d) PEI now in island mode. Modern hybrid inverters (GivEnergy, Tesla, Sigenergy, SolarEdge Energy Hub) handle this transparently. Cert evidence bundle records the transition sequence.',
  },
  {
    id: 3,
    question:
      'PEI install has DNO supply, PV inverter, BESS, and backup generator. How many main isolators are required per Reg 826.1.1.4?',
    options: [
      'One',
      'Four — main switch suitable for isolation per source. DNO main isolator (existing); PV inverter AC isolator; BESS AC isolator; generator AC isolator. Plus a durable warning notice in the vicinity of the isolators alerting maintenance personnel to the multiple sources. The notice typically lists each source and its location, with the message that ALL sources must be isolated for safe work',
      'No isolation',
      'Customer\'s choice',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 826.1.1.4 requires a main switch suitable for isolation per source. Four-source PEI (DNO + PV + BESS + generator) needs four isolators — though some may be at the same physical location (e.g. PV + BESS in the same combiner; generator separately at the gen-set). The durable warning notice alerts personnel to ALL the sources requiring isolation — typically positioned at the property\'s primary access point (origin / metering position) AND at the consumer unit. Cert evidence bundle records each isolator location, the warning notice content + location, and the as-installed labelling per Reg 712.514.x and the BESS / generator analogues.',
  },
  {
    id: 4,
    question:
      'Reg 826.1.2.2 OCPDs and current direction. Customer\'s install has a 40 A bidirectional MCB between the BESS and the AC bus. Compliant?',
    options: [
      'No',
      'YES — Reg 826.1.2.2 requires OCPDs to take account of all possible directions of current flow + polarity. A bidirectional MCB (BS EN 60898-2 / IEC 60898-3 DC-rated, or AC-rated MCB designed for bidirectional service per manufacturer spec) at the BESS AC interface satisfies the reg. The MCB must operate to trip on overcurrent regardless of which direction the current was flowing. Cert evidence bundle records the MCB manufacturer / model / bidirectional capability statement',
      'Forbidden',
      'Customer\'s issue',
    ],
    correctAnswer: 1,
    explanation:
      'Bidirectional OCPDs at PEI source connections: required per Reg 826.1.2.2 + Reg 551.7.1(c) NEW A4:2026 + Reg 570.6.1.1.1 (BESS bidirectional protective devices). Examples of bidirectional devices: certain DC-rated MCBs (BS EN 60898-2 / IEC 60898-3); fuse-combinations rated bidirectional; specialised bidirectional contactors with overcurrent protection. The manufacturer\'s compatibility statement is the cert evidence. Reg 712.533.101 (PV DC OCPDs bidirectional) parallels this for the DC side; Reg 826.1.2.2 / 551.7.1(c) extends it to the AC side at PEI source connections.',
  },
  {
    id: 5,
    question:
      'Customer\'s PEI has PV + BESS + EPS. Public network goes off in storm. Reg 826.1.3 — what happens?',
    options: [
      'PEI shuts down',
      'PEI transitions to island mode automatically. The hybrid inverter detects DNO loss (V or freq excursion); EPS contactor opens to disconnect DNO; inverter switches from grid-following to grid-forming (generates V and freq for the protected loads); BESS supplies the load. When DNO restored: inverter syncs to DNO; EPS contactor closes; transitions back to direct feeding mode. Reg 826.1.3 OPTION A — island mode operation. The PEI design pack specifies this is the supported mode',
      'Manual intervention required',
      'Nothing happens',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 826.1.3 OPTION A is the standard for modern UK PV+BESS with EPS. Transition sequence on grid loss: (1) hybrid inverter detects DNO V/freq excursion (per BS EN 50549-1 anti-islanding); (2) EPS contactor opens to disconnect DNO; (3) inverter switches mode from grid-following (G98/G99 anti-islanding) to grid-forming (generates V and freq); (4) BESS supplies protected loads; (5) when DNO restored: inverter syncs; EPS contactor recloses; transitions back to direct feeding. Total switchover time: 20-100 ms typical (modern fast EPS). Section 4.6 covers EPS design in depth.',
  },
  {
    id: 6,
    question:
      'Customer\'s PEI experiences more frequent SPD triggering than the previous non-PEI install at the same property. Cause?',
    options: [
      'SPDs faulty',
      'Reg 826.1.4 explicitly notes that switching overvoltages may be more frequent and possibly greater in a PEI vs non-PEI. Causes: PV inverter switching between modes; BESS charge / discharge transitions; load shedding; source switching (DNO ↔ island in EPS-equipped PEIs); EV charge start / stop transients. SPDs operate more frequently — they\'re sacrificial. Resolution: ensure SPDs are correctly specified for PEI duty (higher I_n / Imax ratings); maintain the 5-yearly inspection schedule; replace SPDs after major operation events',
      'Customer\'s fault',
      'Replace inverter',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 826.1.4 acknowledges that PEI installs experience more switching events: PV anti-islanding tests; BESS state transitions; EV plug-in / unplug; source switching. SPDs operate more frequently than in non-PEI installs — they\'re the sacrificial protection. The competent PEI design uses higher-spec SPDs (BS EN 61643-11 Type-2 at minimum; sometimes Type-1 + Type-2 multi-zone). 5-yearly periodic inspection per BS EN 62446-1 includes SPD status verification. Cert evidence bundle records the SPD specs + zones + inspection schedule.',
  },
  {
    id: 7,
    question:
      'Cert evidence bundle for a PEI hybrid PV+BESS install — what documents?',
    options: [
      'Just MCS cert',
      'Integrated prosumer cert evidence bundle: (1) MCS MIS 3002 PV design pack (Module 3); (2) Chapter 57 BESS design + BS EN IEC 62485 compliance (Module 5); (3) Chapter 82 PEI design pack (this section: operating modes, multi-source isolation, bidirectional OCPDs, transient protection); (4) BS EN 62446-1 commissioning records (Module 3 S7); (5) EREC G98 / G99 / G100 paperwork; (6) DNO confirmation; (7) customer handover pack. The PEI design pack is the integration document that ties the per-domain designs into the prosumer architecture',
      'Customer chooses',
      'No documents',
    ],
    correctAnswer: 1,
    explanation:
      'PEI cert evidence bundle is the integrated prosumer documentation. Components: PV design pack (Section 712 / MCS MIS 3002); BESS design pack (Chapter 57 / BS EN IEC 62485); PEI design pack (Chapter 82 — covers operating modes, isolation, bidirectional protection, transient protection, multi-source coordination); commissioning records (BS EN 62446-1); EREC paperwork; DNO confirmation; customer handover. The PEI design pack is the GLUE document that ties everything together — without it, the install is a collection of compliant components without the integrated prosumer view. Module 4.8 covers the commissioning + cert evidence bundle in depth.',
  },
  {
    id: 8,
    question:
      'When did Chapter 82 (PEIs) become mandatory for new installs?',
    options: [
      'Never',
      '15 April 2026 (A4:2026 effective date). A3:2024 is withdrawn 15 October 2026 — until then both A3 and A4 are valid. New install certs issued after 15 April 2026 should comply with A4:2026 including Chapter 82 PEI requirements where applicable. PEI design pack is the new artefact in the cert evidence bundle for any install that meets the PEI definition (consumes + generates / stores)',
      'Customer\'s choice',
      '2030',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 (Amendment 4 to BS 7671:2018) — effective 15 April 2026, with A3 withdrawn 15 October 2026. Chapter 82 is one of three new chapters in A4 (alongside Chapter 57 for BESS and Appendix 17 for energy efficiency). New installs certified after 15 April 2026 should comply with A4 including Chapter 82 PEI design where applicable. Existing installs commissioned under A3 don\'t need to retrospectively comply — but additions / alterations after the effective date should. Cert evidence bundle records the BS 7671 edition / amendment applied; the MCS / EREC paperwork records the same.',
  },
];

const faqs = [
  {
    question: 'What\'s the practical difference Chapter 82 makes vs the pre-A4 regulatory state?',
    answer:
      'Pre-A4: PV regulated by Section 712; BESS regulations were scattered (Section 551 partially, Reg 551.8 deleted in A4 and replaced by Chapter 57); EV charging by Section 722; multi-source isolation handled per source. No unified &ldquo;prosumer&rdquo; framework. A4:2026 adds Chapter 82 — explicit PEI definition + design framework that ties the per-domain regs together. Practical impact: the cert evidence bundle gains a PEI design pack covering operating modes, integrated isolation, bidirectional protection, transient protection. The competent installer designs the install AS a prosumer install — not as PV + BESS bolted together.',
  },
  {
    question: 'Does every PV install need a Chapter 82 PEI design pack?',
    answer:
      'Only installs meeting the PEI definition (consumes + generates / stores). Pure consumption: not a PEI. PV only (no storage, no controllable load like EV / heat pump): arguably not a PEI in the strict sense — Section 712 applies but Chapter 82 is debatable depending on whether the property includes any controlled-load device. PV + BESS: definitely a PEI. PV + EV charging (where charging is PV-controlled): PEI. PV + BESS + EV + heat pump: definitely PEI. The threshold question: does the install have integrated load + generation + storage coordination? Cert evidence bundle records the design decision.',
  },
  {
    question: 'How does Chapter 82 interact with Section 712 (PV) and Chapter 57 (BESS)?',
    answer:
      'Chapter 82 is the INTEGRATION layer; Section 712 and Chapter 57 are the per-domain layers. Section 712 covers the PV install (Module 3 content); Chapter 57 covers the BESS install (Module 5 content). Chapter 82 adds the PEI design content — operating modes, multi-source isolation, bidirectional protection, transient protection — that ties them together. The cert evidence bundle has: Section 712 PV design pack + Chapter 57 BESS design pack + Chapter 82 PEI design pack. All three are required for a hybrid PV+BESS PEI install.',
  },
  {
    question: 'PAS 63100:2024 — how does it relate to Chapter 82?',
    answer:
      'PAS 63100:2024 (&ldquo;Specification for the installation and safe use of battery energy storage systems in electrical installations of dwellings&rdquo;) is the UK-specific BESS install spec. It pre-dates A4:2026 Chapter 82 but covers similar ground for BESS specifically. Chapter 82 is the broader prosumer regulatory framework; PAS 63100 is the BESS install detail. Both apply to hybrid PV+BESS installs. The competent installer references PAS 63100 for BESS install detail (battery placement, ventilation, fire safety) and Chapter 82 for the prosumer integration. Cert evidence bundle records compliance against both. Module 5 covers PAS 63100 in depth.',
  },
  {
    question: 'How does the MCS scheme handle Chapter 82 compliance?',
    answer:
      'MCS MIS 3002 (PV) and the BESS-equivalent MCS standards are updated to include Chapter 82 design pack content for PEI installs. The MCS-certified contractor includes Chapter 82 PEI design alongside the MCS PV design pack. MCS audit from late 2026 onwards will look for the PEI design pack on any install meeting the definition. Cert evidence bundle: MCS PV pack + MCS BESS pack + Chapter 82 PEI pack + EREC paperwork + commissioning records. Missing PEI pack on a post-A4 PEI install = major MCS audit finding.',
  },
  {
    question: 'What does the Chapter 82 PEI design pack look like physically?',
    answer:
      'Typical PEI design pack contents (post-A4:2026): (1) PEI scope statement — what defines this install as a PEI; (2) operating modes table — supported modes per Reg 824.2 with the transition sequences; (3) single-line schematic showing all sources and the multi-source coordination; (4) earthing arrangement per Reg 826.1.1.2 covering both direct feeding and island modes; (5) isolation summary per Reg 826.1.1.4 — every isolator listed with location, manufacturer, model; (6) OCPD bidirectional analysis per Reg 826.1.2.2; (7) transient overvoltage protection design per Reg 826.1.4; (8) emergency response procedure. Typically 5-15 pages for a residential install. Cert evidence bundle includes this alongside the per-domain design packs.',
  },
  {
    question: 'Are there any specific UK installations that don\'t need Chapter 82?',
    answer:
      'Installs that are PURE consumer (no generation, no storage) — most existing UK homes — are NOT PEIs. Installs that ARE PEIs but pre-date A4:2026 effective date (15 April 2026) don\'t retrospectively need PEI design — they comply with the regs in force at commission. EICR-style periodic inspection may flag the lack of PEI design as informational for old installs without requiring rectification. Additions / alterations to existing installs after A4:2026 effective date should comply with Chapter 82 for the new work — and may trigger PEI design pack for the integrated install. Cert evidence bundle records the applicable BS 7671 edition / amendment.',
  },
  {
    question: 'How does Chapter 82 affect the EICR / periodic inspection workflow?',
    answer:
      'EICR-style periodic inspection of a PEI install includes verification of Chapter 82 design implementation: (1) operating modes — does the install support the modes claimed in the design pack? (2) isolators — are all isolators in place, accessible, labelled per Reg 826.1.1.4? (3) bidirectional OCPDs — do the devices match the manufacturer spec? (4) transient protection — are SPDs in place, status indicators healthy? (5) earthing — local electrode in place for island mode? Findings recorded per the EICR coding (C1 immediate danger, C2 potentially dangerous, C3 improvement recommended). Cert evidence bundle records the periodic inspection result; updated PEI design pack reflects any rectifications.',
  },
  {
    question: 'Section 4.6 EPS — how does it relate to Chapter 82 island mode?',
    answer:
      'EPS (Emergency Power Supply) is the FUNCTIONAL implementation of Chapter 82\'s island mode. Reg 824.2 defines island mode as an operating mode; Reg 826.1.3 says PEI shall operate in island mode OR disconnect on grid loss; Reg 826.1.1.2.2 covers the neutral switching during transition; Reg 826.1.1.5 covers the island-mode switching device. The EPS feature in modern hybrid inverters (GivEnergy, Tesla, Sigenergy, SolarEdge Energy Hub) IS the island-mode implementation — the contactor, the inverter\'s grid-forming mode, the protected-load partition. Section 4.6 covers EPS design in depth, building on Chapter 82\'s framework.',
  },
];

export default function RenewableEnergyModule4Section5() {
  const navigate = useNavigate();

  useSEO({
    title:
      "Chapter 82 — Prosumer's Electrical Installations (PEIs) | Renewable Energy 4.5 | Elec-Mate",
    description:
      "Chapter 82 PEIs (NEW A4:2026) — Reg 824.2 operating modes (direct feeding / island); Reg 826.1.1.1-826.1.4 PEI design framework; multi-source isolation; bidirectional OCPDs; transient overvoltage protection; integration with Section 712 (PV) and Chapter 57 (BESS).",
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · BS 7671:2018+A4:2026 · Chapter 82 NEW"
            title="Chapter 82 — Prosumer's Electrical Installations (PEIs)"
            description="The NEW A4:2026 chapter for installs that BOTH consume AND generate / store. Reg 824.2 operating modes (direct feeding / island); Reg 826.1.1.1-826.1.4 PEI design framework; multi-source isolation, bidirectional OCPDs, transient protection; the integration layer above Section 712 (PV) and Chapter 57 (BESS)."
            tone="yellow"
          />

          <TLDR
            points={[
              "Chapter 82 (NEW A4:2026) defines Prosumer's Electrical Installations — installs that BOTH consume AND generate / store electricity. Any hybrid PV+BESS install is a PEI; PV + EV / heat-pump with integrated control is a PEI; PV + multiple sources is a PEI.",
              'Reg 824.1 PEI TYPES: (a) INDIVIDUAL PEI — single end-user installation (typical UK domestic / SME); (b) COLLECTIVE PEI — multiple end-users behind a single connection point (e.g. multi-dwelling block with shared PV/BESS); (c) SHARED PEI — multiple end-users with their own connection points but shared local generation / storage resources.',
              'Reg 824.2 THREE operating modes: DIRECT FEEDING (import from DNO); REVERSE FEEDING (export to DNO); ISLAND MODE (disconnected from DNO, self-supplying). Reg 826.1.1.1: PEI shall support all intended modes with persons + property protection in each mode.',
              'Reg 825 EEMS (Electrical Energy Management System) — supervises load + generation + storage to optimise self-consumption, peak shaving, grid response. EEMS implements the prosumer logic.',
              'Reg 826.1.1.2 earthing: local earth electrode per Reg 542.2.2 for island mode; DNO earth need not be disconnected. Reg 826.1.1.2.2: neutral switch device prevents RCD misoperation during mode transitions. Reg 826.1.1.3: TN/IT vs TT systems handled differently because PV is a low fault-current source in island mode.',
              'Reg 826.1.1.4 multi-source isolation: main switch suitable for isolation PER SOURCE — OR interlocking arrangement preventing parallel operation. Durable warning notice alerts personnel to multiple sources.',
              'Reg 826.1.2.2 OCPDs: selection and erection shall take account of ALL POSSIBLE DIRECTIONS of current flow and polarity — bidirectional throughout the PEI. Parallel sources: Reg 551.7.2 + Reg 551.7.1(c) NEW A4:2026 bidirectional protective device.',
              'Reg 826.2 interaction with public network; 826.3 energy storage; 826.4 demand-response; 826.5 EV as prosumer resource; 826.6 selectivity / coordination; 826.7 verification (including the Reg 643.7.3.1 NOTE 1 fault-loop impedance caveat for inverter sources).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Identify a PEI: an installation that both consumes and generates / stores electricity. Apply Chapter 82 to hybrid PV+BESS, PV+EV, PV+multi-source installs.",
              'Apply Reg 824.2 operating modes (direct feeding / island / transition) and Reg 826.1.1.1 — PEI shall support all intended modes with persons + property protection maintained.',
              'Apply Reg 826.1.1.2 + 826.1.1.2.2 — local earth electrode for island mode, neutral switching to prevent RCD misoperation during transitions.',
              'Apply Reg 826.1.1.4 — main switch per source with durable warning notice. Multi-source isolation discipline.',
              'Apply Reg 826.1.2.2 — bidirectional OCPDs throughout. Connect to Reg 551.7 parallel-operation requirements where sources operate in parallel.',
              'Apply Reg 826.1.3 grid outage handling and Reg 826.1.4 transient overvoltage protection.',
              'Assemble the Chapter 82 PEI design pack as the integration layer above Section 712 (PV) and Chapter 57 (BESS) packs in the cert evidence bundle.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>PEI = consumes + generates / stores. Chapter 82 ties PV (Section 712) + BESS (Chapter 57) + multi-source coordination into one prosumer design.</Pullquote>

          <ContentEyebrow>What is a PEI, and why Chapter 82 was added</ContentEyebrow>

          <ConceptBlock
            title="The PEI definition — consume + generate / store"
            plainEnglish="A PEI is an electrical installation that both consumes electricity (load) AND generates and/or stores electricity (source). The combination makes the installation a &ldquo;prosumer&rdquo; — both producer and consumer. UK 2025-2026: hybrid PV+BESS installs, PV+EV charging with control logic, PV+multi-source installs all meet the definition."
            onSite="Pre-A4:2026, the regulatory framework was scattered: Section 712 for PV; bits of Section 551 + the removed Reg 551.8 for BESS; Section 722 for EV charging. No unified framework for the integrated prosumer install. A4:2026 adds Chapter 82 to fill that gap."
          >
            <p>Which installs are PEIs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Hybrid PV+BESS (any topology)</strong> — clearest example. Consumes (loads) + generates (PV) + stores (BESS)</li>
              <li><strong className="text-white">PV + integrated EV charging</strong> — where the EV charger is PV-controlled (Zappi, Ohme, integrated PV-aware charger). The install consumes (EV + other loads) and generates (PV) with coordination</li>
              <li><strong className="text-white">PV + heat pump with smart-grid coordination</strong> — heat pump with SG-Ready input controlled by PV surplus diverter is a PEI</li>
              <li><strong className="text-white">Off-grid PV + BESS + generator</strong> — multi-source, all generation / storage, no grid. PEI by definition</li>
              <li><strong className="text-white">Commercial multi-source installs</strong> — PV + wind + BESS + generator. Classic PEI scenario</li>
              <li><strong className="text-white">PV ONLY (no storage, no controlled load)</strong> — boundary case. Section 712 applies; Chapter 82 arguably doesn\'t apply in the strictest sense (pure PV → grid + load without coordination logic). In practice, most modern UK PV installs include some coordination — treat as PEI in doubt</li>
              <li><strong className="text-white">Pure consumer (no generation, no storage)</strong> — most existing UK homes. NOT a PEI</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Reg 824.1 PEI types — individual / collective / shared</ContentEyebrow>

          <Pullquote>THREE PEI types: individual, collective, shared. The type sets the protection scope.</Pullquote>

          <ConceptBlock
            title="Reg 824.1 — PEI types"
            plainEnglish="Reg 824.1 (NEW A4:2026) defines three PEI types: (a) INDIVIDUAL — single end-user; (b) COLLECTIVE — multiple end-users behind a single connection point with shared resources; (c) SHARED — multiple end-users with their own connection points but sharing local generation / storage. The type determines who owns / operates the PEI and how protection applies across the boundary."
            onSite="UK 2025-2026: most domestic hybrid PV+BESS installs are INDIVIDUAL PEIs (one household, one connection). COLLECTIVE PEIs are emerging in multi-dwelling blocks with shared rooftop PV + communal BESS feeding the landlord supply that re-distributes to flats. SHARED PEIs are early-stage in the UK (community energy schemes, microgrids) — common in mainland Europe pilot projects."
          >
            <p>The three PEI types:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">(a) Individual PEI</strong> — single end-user installation. One household / business with its own PV / BESS / EV. Single connection to the public network. Vast majority of UK domestic and SME hybrid installs. Section 712, Chapter 57, Chapter 82 all apply at the single-user scope</li>
              <li><strong className="text-white">(b) Collective PEI</strong> — multiple end-users share a single connection point and shared resources. Typical: a multi-dwelling block with shared rooftop PV + landlord-owned communal BESS. Tariffs / metering allocate energy to occupants. Chapter 82 applies at the collective scope; tenant sub-installs are separate consumer units</li>
              <li><strong className="text-white">(c) Shared PEI</strong> — multiple end-users each with their OWN connection points share local generation / storage. Energy is routed between them via an internal network and the public network. Community energy / microgrid pattern. Chapter 82 + DNO collaboration required; emerging in the UK</li>
              <li><strong className="text-white">Practical implication</strong> — the design pack identifies which PEI type, then applies Reg 826 design content at the correct scope. Confusion between types = design pack faults at audit</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 824.1 — PEI types (NEW)"
            clause="A PEI may be: (a) an individual PEI — supplying a single end-user; (b) a collective PEI — supplying multiple end-users via a single connection point to the public distribution network; or (c) a shared PEI — multiple end-users with separate connection points sharing local generation and/or energy storage resources."
            meaning="Reg 824.1 sets the PEI scope taxonomy. The competent installer identifies the PEI type at the design stage — individual (most UK domestic), collective (multi-dwelling shared rooftop), shared (community energy). Each type drives different design choices around metering, isolation per user, fault current contributions, and the boundary of Chapter 82 application. Cert evidence bundle records the PEI type."
          />

          <SectionRule />

          <ContentEyebrow>Reg 824.2 operating modes & Reg 826.1.1.1 PEI support</ContentEyebrow>

          <Pullquote>Direct feeding + reverse feeding + island. PEI must support all intended modes.</Pullquote>

          <ConceptBlock
            title="The THREE PEI operating modes per Reg 824.2"
            plainEnglish="Reg 824.2 defines THREE operating modes: (1) DIRECT FEEDING — PEI receives energy from public network (import); (2) REVERSE FEEDING — PEI sends energy to public network (export); (3) ISLAND MODE — PEI disconnected from public network, self-supplying. Plus transition modes between them. The PEI design specifies which modes are supported and how transitions occur."
            onSite="UK 2025-2026 typical hybrid PV+BESS supports all three: direct feeding when load > generation; reverse feeding when generation > load + battery full (export surplus to DNO); island mode via EPS when DNO is offline. Automatic transitions between these three modes are handled by the hybrid inverter + EEMS (Reg 825). Some installs are direct/reverse only (no EPS — simpler / cheaper)."
          >
            <p>Operating modes in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">(1) DIRECT FEEDING MODE</strong> — PEI receives energy from the public network. Net energy flow: DNO → PEI. Loads are partly or fully supplied by import. Anti-islanding per EREC G98 / G99 (Module 3 Section 6) on the inverter side ensures PEI does not energise a fault-free DNO that has gone open</li>
              <li><strong className="text-white">(2) REVERSE FEEDING MODE</strong> — PEI exports energy to the public network. Net energy flow: PEI → DNO. PV / BESS surplus exported. Anti-islanding still required (the PEI must not continue energising a de-energised DNO). EREC G98 / G99 / G100 export limits apply</li>
              <li><strong className="text-white">(3) ISLAND MODE</strong> — PEI disconnected from public network. Inverter generates V and freq for the protected loads from local sources (PV during day, BESS continuously). EPS (Emergency Power Supply) is the modern implementation. Used for grid outages</li>
              <li><strong className="text-white">TRANSITION MODES</strong> — PEI moving between modes. Direct ↔ reverse: transparent (no contactor action — just flow direction reverses). Direct/reverse ↔ island: requires EPS contactor + inverter mode change + neutral switching (Reg 826.1.1.2.2). May be brief (50-100 ms for modern fast EPS) or scheduled</li>
              <li><strong className="text-white">Reg 826.1.1.1 requirement</strong> — PEI shall operate in any intended mode; can change modes at any time; protection of persons + property in each mode. The design pack specifies the supported modes</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the supported operating modes and the protective measures for each, plus the EEMS configuration (Reg 825) that orchestrates the transitions</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.1 — PEI operating modes"
            clause="The PEI shall be able to operate in any intended operating mode as defined in Regulation 824.2. According to needs, a PEI can change the operating mode at any time and may come back to the initial operating mode also at any time (for instance, from direct feeding mode to island mode and then back to direct feeding mode). Protection of persons and properties shall be provided in each mode and during transitions."
            meaning="Reg 826.1.1.1 sets the PEI operational requirement: support every intended mode + protect persons + property in each mode AND during transitions. The design pack specifies which modes are supported (direct only; direct + reverse; direct + reverse + island via EPS). For UK domestic hybrid PV+BESS with EPS: all three modes is typical. Cert evidence bundle records the mode support and the protective measures per mode + per transition."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Reg 825 — EEMS (Electrical Energy Management System)</ContentEyebrow>

          <Pullquote>EEMS is the brain of the PEI — supervising load, generation, storage, grid interface, EV.</Pullquote>

          <ConceptBlock
            title="Reg 825 — EEMS"
            plainEnglish="An Electrical Energy Management System (EEMS) is the supervisory control layer that orchestrates a PEI&rsquo;s loads, generation sources and storage. EEMS implements the prosumer logic: when to import, when to export, when to charge / discharge the BESS, when to enable EV charging, when to shed load, when to switch to island mode. It is the &lsquo;brain&rsquo; that makes the integrated install a coherent prosumer rather than a collection of independent components."
            onSite="In UK 2025-2026 most hybrid inverter ecosystems include an EEMS — GivEnergy cloud + portal app, Tesla Backup Gateway / app, Sigenergy mySigen, SolarEdge ONE, Huawei FusionSolar, Enphase Enlighten. PAS 63100:2024 and BS HD 60364-8-1 cover EEMS architecture for prosumer / energy-efficient installs. The competent installer specifies the EEMS configuration in the design pack."
          >
            <p>What EEMS typically supervises (per BS HD 60364-8-1 + Chapter 82):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Self-consumption optimisation</strong> — preferentially route PV surplus to loads + BESS rather than export, where economically advantageous</li>
              <li><strong className="text-white">Peak shaving</strong> — discharge BESS during peak grid prices; charge during off-peak</li>
              <li><strong className="text-white">Time-of-use scheduling</strong> — load shifting (heating / EV / appliances) to align with cheap tariff or surplus generation</li>
              <li><strong className="text-white">Demand response</strong> — respond to grid signals (DSR / flex markets) — exposed via Reg 826.4</li>
              <li><strong className="text-white">Export limitation</strong> — enforce EREC G100 export caps where applicable</li>
              <li><strong className="text-white">Mode transitions</strong> — automatic switch to island mode on DNO loss; resync on restoration</li>
              <li><strong className="text-white">Multi-source coordination</strong> — PV + BESS + generator + EV — set priorities, set thresholds</li>
              <li><strong className="text-white">Safety supervision</strong> — monitor for faults; alert; initiate shutdown if necessary</li>
              <li><strong className="text-white">Reporting + visibility</strong> — customer-facing app, EICR-ready event logs</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 825 — EEMS"
            clause="Where used, an Electrical Energy Management System (EEMS) shall supervise the operation of the PEI in all intended operating modes, and shall coordinate generation, storage and load to maintain protection of persons and property. The EEMS architecture and the responsibilities of its components shall be documented and shall comply with the relevant parts of BS HD 60364-8-1 and related standards (e.g. PAS 63100:2024 for domestic BESS)."
            meaning="Reg 825 recognises EEMS as the supervisory layer that makes a multi-source PEI a coherent prosumer install. The competent installer documents the EEMS architecture in the design pack: which device is the EEMS host (typically the hybrid inverter or a separate energy gateway); what it supervises (loads, PV, BESS, EV, transitions); what safety functions it provides; what failure modes it tolerates. Cert evidence bundle records the EEMS configuration + version + the BS HD 60364-8-1 cross-references."
          />

          <SectionRule />

          <ContentEyebrow>Reg 826.1.1.2 / .1.2.2 / .1.2.3 — Earthing for PEI modes</ContentEyebrow>

          <Pullquote>Local earth electrode for island mode. Neutral switch prevents RCD misoperation during transitions.</Pullquote>

          <ConceptBlock
            title="System earthing per operating mode"
            plainEnglish="In direct feeding mode the PEI uses DNO earth (typically TN-C-S PME in UK). In island mode the PEI uses a local earth electrode + locally-generated neutral via the inverter. The transition between modes must handle the neutral and earth switching correctly to maintain RCD operation throughout."
            onSite="Modern hybrid inverters with EPS (GivEnergy, Tesla, Sigenergy, SolarEdge Energy Hub) handle this transparently — the inverter\'s EPS / island-mode contactor + internal neutral-switching device handles the sequencing. The installer\'s job: provide the local earth electrode + verify Reg 826.1.1.2 / .1.2.2 / .1.2.3 compliance in the design pack."
          >
            <p>The three earthing-related regs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 826.1.1.2 (earthing arrangement)</strong> — local earth electrode for island mode per Reg 542.2.2; DNO earth means need not be disconnected; any change of system earthing for island mode shall be reversible</li>
              <li><strong className="text-white">Reg 826.1.1.2.2 (neutral conductor)</strong> — when in island mode, ALL live conductors (including neutral) disconnected from DNO. Neutral switch device connects local N-E without overlapping with switching of DNO neutral — prevents RCD misoperation during transition</li>
              <li><strong className="text-white">Reg 826.1.1.2.3 (transfer switching device)</strong> — for connection to local earthing arrangement (local star point/midpoint or local exposed-conductive-parts), use transfer switching device per Reg 537.1.5</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.1 (a)/(b) + 826.1.1.2 — Earthing per mode"
            clause="826.1.1.1: (a) WHEN CONNECTED to the public network, the earthing arrangement of the PEI shall comply with Chapter 41 and the system type (TN-C-S, TN-S, TT, IT) of the public network at the point of connection. (b) WHEN IN ISLAND MODE, the PEI shall provide its own earthing arrangement complying with Regulation 542.2.2 — typically a local earth electrode. 826.1.1.2: Any connection to the means of earthing derived from the public distribution network need not be disconnected during island mode. Any change of type of system earthing for island mode shall be reversible. 826.1.1.2.2: When in island mode, all live conductors shall be disconnected from the DNO supply. To prevent incorrect operation of RCDs the use of a neutral switch device shall connect the neutral and the earth of the PEI without overlapping with switching of the DNO neutral."
            meaning="Reg 826.1.1.1 (a)/(b) sets the two-mode earthing requirement: (a) in direct/reverse feeding the PEI inherits the DNO earthing system (typically TN-C-S PME for UK domestic); (b) in island mode the PEI sets its own arrangement per Reg 542.2.2 — a local earth electrode + locally-generated neutral. Reg 826.1.1.2 makes the transition reversible (DNO earth stays in place). Reg 826.1.1.2.2 sequences the neutral switching so RCDs do not see spurious imbalances. Modern hybrid inverters with EPS handle this internally; the installer verifies the electrode resistance + the make-before-break sequence + documents in the PEI design pack."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Reg 826.1.1.3 — Selection of protective device (per source, per operating mode)</ContentEyebrow>

          <Pullquote>OCPD selection must consider the MINIMUM earth fault current per source — in island mode the PV inverter is a low-fault-current source.</Pullquote>

          <ConceptBlock
            title="Reg 826.1.1.3 — selection of protective device"
            plainEnglish="Reg 826.1.1.3 sets the principle for selecting the protective device against electric shock: it must operate within the maximum disconnection times required by Chapter 41 + Reg 551.2. The selection must consider the MINIMUM earth fault current value, which depends on the operating mode. In direct/reverse feeding mode the fault current is dominated by the public network contribution. In island mode the fault current comes only from the local power supplies and storage units — and the local sources may be CURRENT-LIMITED (e.g. PV inverter ~1.1-1.5&times; I_n). For TN and IT systems the OCPD must be selected for each source considering its minimum contribution; for TT systems the earth electrode resistance dominates so the operating mode has less practical effect."
            onSite="Modern UK hybrid inverters handle this in three typical ways: (a) the EPS contactor is a 4-pole device that switches the PEI to TT in island mode (local electrode + RCD-based ADS via the RCD already in the consumer unit); (b) the inverter has a higher peak current capability for the milliseconds needed to operate the MCB; (c) a fast-acting electronic protective device built into the inverter handles the fault detection / disconnection itself. The PEI design pack must state which strategy is used + verify it works."
          >
            <p>The Reg 826.1.1.3 dilemma:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">TN system challenge</strong> — TN ADS relies on OCPD opening within the required disconnection time (Chapter 41). MCB magnetic trip needs typically 5-10&times; I_n. PV / BESS inverter in island mode delivers ~1.1-1.5&times; I_n. MCBs do NOT trip — they take seconds (thermal region). Touch voltage may exceed safe limits</li>
              <li><strong className="text-white">IT system challenge</strong> — IT ADS uses an IMD + manual response on first fault. Island PEI is rarely IT — most are derived from TN-C-S DNO supply</li>
              <li><strong className="text-white">TT system in island mode</strong> — RCDs detect earth-fault current via L-N imbalance, not by relying on high fault current. Inverter only needs to deliver enough imbalance to operate the RCD (~30 mA for a domestic RCD). The 4-pole EPS contactor that disconnects DNO N + L conductors lets the PEI operate effectively as TT in island mode</li>
              <li><strong className="text-white">Inverter-side electronic protection</strong> — many modern hybrid inverters (GivEnergy Gen3, Tesla Powerwall 3, SolarEdge Energy Hub) have built-in fault-detection that opens the inverter output within milliseconds of detecting a downstream fault — independent of the OCPD strategy. The PEI design pack records this</li>
              <li><strong className="text-white">PEI design pack content</strong> — system earthing in island mode + fault-current analysis (inverter&rsquo;s island-mode short-circuit contribution) + verification that the protective measures operate within the required times</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.3 — Selection of protective device"
            clause="Operation of the protective device shall be in accordance with the maximum disconnection times as required by Chapter 41 and the requirements of Regulation 551.2. The selection of protective devices against electric shock shall consider the minimum earth fault current value (between one of the line conductors and PE conductor). The minimum earth fault current value may depend on the operating mode. (a) In TN and IT systems, an overcurrent protective device may be used as a protective device giving automatic disconnection in the event of a fault. The system earthing may change depending on the operating mode, the selection of the overcurrent device shall consider each operating mode. (b) In connected mode, the fault current is supplied by the public network, the local power supply and by the local storage units. (c) In island mode, the earth fault current is only supplied by the local power supplies and by the local storage units. The local power supplies may be current sources (e.g. solar PV cells) with a very low earth fault current value. Therefore, in TN and IT systems, OCPDs used for fault protection shall be selected for each source, considering the minimum contribution of each one (island mode). In a TT system, as the earth fault current is limited by the earth electrode resistance, there is no practical interaction of the operating mode."
            meaning="Reg 826.1.1.3 is the practical safety bridge between TN/IT and TT systems for the island-mode reality. In direct/reverse feeding, the DNO transformer dominates the fault current — typical MCB selection works. In island mode, the inverter is the source; PV inverters are essentially current sources contributing ~1.1-1.5&times; I_n on a fault — not enough to operate most MCBs in the magnetic region. The reg solutions: double-setting on the same device; two devices coordinated; or take the worst-condition minimum as the design point. TT installs are less affected because the RCD-based ADS works at the same imbalance threshold regardless of source. Cert evidence bundle records the OCPD selection logic + the per-mode fault current analysis."
          />

          <SectionRule />

          <ContentEyebrow>Reg 826.1.1.4 / .1.1.5 — Multi-source isolation</ContentEyebrow>

          <Pullquote>Main switch PER SOURCE. Warning notice in the vicinity. Reg 512.1.2 island-mode switches.</Pullquote>

          <ConceptBlock
            title="Multi-source isolation discipline"
            plainEnglish="A PEI typically has multiple sources: DNO, PV inverter, BESS, generator. Each source must have its own main switch suitable for isolation. A durable warning notice in the vicinity alerts maintenance personnel to ALL sources requiring isolation."
            onSite="Critical for safe maintenance work. The installer must ensure: (a) each source has its own isolator (per BS EN 60947-3 switch-disconnector); (b) the isolators are physically accessible; (c) the warning notice lists all sources clearly. The cert evidence bundle records each isolator location + the notice content."
          >
            <p>The isolation discipline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">DNO main isolator</strong> — existing on every install. Typically the main switch at the consumer unit or origin</li>
              <li><strong className="text-white">PV inverter AC isolator</strong> — per Reg 712.514.102 (Module 3); BS EN 60947-3 switch-disconnector; accessible without tools</li>
              <li><strong className="text-white">BESS AC isolator</strong> — per Reg 570.6 (Chapter 57); equivalent to PV inverter isolator</li>
              <li><strong className="text-white">Generator AC isolator</strong> — per Reg 551.2.4 (Section 551); typically near the generator</li>
              <li><strong className="text-white">Per Reg 826.1.1.5</strong> — island-mode switching devices comply with Reg 512.1.2; suitable for isolation</li>
              <li><strong className="text-white">Durable warning notice</strong> — fixed in the vicinity of the isolators; alerts personnel that ALL must be isolated for safe work. Typically positioned at: (1) origin of installation; (2) consumer unit / metering point. Notice content lists each source and its isolator location</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.1.4 — Multi-source isolation (with interlock alternative)"
            clause="Where an installation is supplied from more than one source, a main switch suitable for isolation (for example, switch-disconnector) shall be provided for each source of supply. A durable warning notice shall be permanently fixed in the vicinity of these main switches in such a position that any person seeking to operate any of these main switches will be alerted to the presence of the multiple sources. ALTERNATIVELY, where sources are not intended to operate in parallel, an interlocking arrangement preventing parallel operation may be provided (e.g. a transfer switch that can only connect ONE source at a time)."
            meaning="Reg 826.1.1.4 mandates per-source isolation + warning notice — OR an interlocking arrangement that prevents two sources operating in parallel. The interlock alternative applies to changeover-only installs (e.g. DNO ⇆ standby generator with no parallel running, common on commercial premises with a non-parallel-rated genset). For parallel installs (PV + BESS + DNO running together, which is most modern hybrid UK installs), the per-source isolator + warning notice route is the only compliant option. The competent installer chooses the right strategy at design stage and records the choice in the PEI design pack. Cert evidence bundle records each isolator location OR the interlock device + the warning notice wording / location."
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Reg 826.1.2.1 / .1.2.2 / .1.2.3 — Bidirectional protection</ContentEyebrow>

          <Pullquote>Account for ALL directions of current flow. Bidirectional OCPDs throughout the PEI.</Pullquote>

          <ConceptBlock
            title="Bidirectional protection — the PEI safety principle"
            plainEnglish="In a PEI, current flows in either direction at many points: PV → grid (export), grid → load (import), BESS → load (discharge), grid → BESS (charge). Every OCPD must operate to trip on overcurrent regardless of which direction the current was flowing."
            onSite="Bidirectional OCPDs are the cross-cutting requirement: Reg 826.1.2.2 (PEI general); Reg 712.533.101 (PV DC side); Reg 570.6.1.1.1 (BESS); Reg 551.7.1(c) NEW A4:2026 (parallel-source AC interface). The PEI design pack records each OCPD\'s direction capability."
          >
            <p>The bidirectional regs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Reg 826.1.2.1 (overcurrent magnitude)</strong> — overload + short-circuit currents determined at every point of the PEI where a protective device is installed; for all possible configurations and min/max current</li>
              <li><strong className="text-white">Reg 826.1.2.2 (location + direction)</strong> — selection and erection of OCPDs shall take account of ALL POSSIBLE DIRECTIONS of current flow + polarity. Source connection via switchgear: Reg 551.7.2 applies (parallel-operation)</li>
              <li><strong className="text-white">Reg 826.1.2.3 (combined short-circuit protection)</strong> — where combined short-circuit protection used per Reg 434.5.1, coordination shall consider all possible configurations of power supplies</li>
            </ul>
            <p>Practical bidirectional OCPD examples:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">PV DC OCPDs</strong> — gPV fuses per BS EN 60269-6 OR DC-rated MCBs per BS EN 60898-2/IEC 60898-3, bidirectional per Reg 712.533.101 (Module 3 Section 4)</li>
              <li><strong className="text-white">BESS DC OCPDs</strong> — bidirectional per Reg 570.6.1.1.1 (Module 5)</li>
              <li><strong className="text-white">Source-AC OCPDs at the consumer unit</strong> — bidirectional MCBs for PV / BESS / generator AC connections per Reg 551.7.1(c) NEW A4:2026</li>
              <li><strong className="text-white">Combined OCPD coordination</strong> — design pack analysis of fault current contributions from each source under various operating modes</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.1.2.2 — Location and direction of OCPDs"
            clause="Selection and erection of overcurrent protective devices shall take account of all possible directions of current flow and polarity. Connection of a source of supply via switchgear or controlgear assemblies shall comply with Regulation 551.7.2. Overload and short-circuit protection shall be placed at the origin of the circuit."
            meaning="Reg 826.1.2.2 mandates bidirectional OCPDs throughout the PEI. Every device must operate to trip on overcurrent regardless of current direction. For parallel-source connections (PV / BESS / generator paralleling with DNO or with each other), Reg 551.7.2 applies — including Reg 551.7.1(c) NEW A4:2026 bidirectional protective device. Cert evidence bundle records each OCPD\'s bidirectional capability + the cross-references to Reg 551.7 for parallel sources."
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Reg 826.1.3 / .1.4 — Grid outage + transient protection</ContentEyebrow>

          <Pullquote>Grid off = island mode OR shutdown. Transients more frequent in PEI — more SPDs.</Pullquote>

          <ConceptBlock
            title="Grid outage handling per Reg 826.1.3"
            plainEnglish="When the public network is not energised, the PEI shall: (a) operate in island mode (continue supplying local loads from PV / BESS); OR (b) automatically disconnect all local power supplies (shut down — wait for grid restoration). The design pack specifies which option is supported."
            onSite="Modern UK hybrid PV+BESS with EPS supports option (a) — island mode. Older / cost-conscious installs without EPS support option (b) — shutdown. The PEI design pack records the supported behaviour. Customer expectations set accordingly: with EPS, customer continues to have power during grid outages; without EPS, the install goes offline with the grid."
          >
            <p>Reg 826.1.3 considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Option (a) ISLAND MODE</strong> — PEI continues operating with local sources only. Requires: EPS-capable hybrid inverter; island-mode neutral / earth arrangement (Reg 826.1.1.2.2); protected-load partition (Section 4.6 covers in depth)</li>
              <li><strong className="text-white">Option (b) AUTOMATIC SHUTDOWN</strong> — PEI disconnects all local sources on grid loss. PV inverter anti-islanding per EREC G98 / G99 ensures it stops. BESS PCE disconnects. Loads have no supply until grid restored</li>
              <li><strong className="text-white">Control + protective device duty</strong> — Reg 826.1.3 notes that PEI control + protective devices may operate more frequently than non-PEI installs. Selection should account for increased duty cycle (e.g. contactors rated for higher number of operations)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Transient overvoltage protection per Reg 826.1.4"
            plainEnglish="Switching overvoltages may be more frequent and possibly greater in a PEI vs a non-PEI install. Causes: source switching, load shedding, mode transitions, EV charge transients. SPD discipline is more important in a PEI."
            onSite="The PEI design pack records the SPD locations + specs. Typical hybrid PV+BESS PEI: DC SPDs per Reg 712.534 (PV side); BESS DC SPDs; AC SPDs at the consumer unit; possibly AC SPDs at the inverter AC output. 5-yearly inspection includes SPD status verification (most SPDs have a status indicator window)."
          >
            <p>SPD considerations for PEIs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">More frequent operation</strong> — PEI switching events: PV anti-islanding tests; BESS state transitions; EV plug-in / unplug; source switching; load shedding</li>
              <li><strong className="text-white">SPD spec considerations</strong> — higher I_n / Imax ratings; possibly Type-1 + Type-2 multi-zone where direct-strike LPS is not separated</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records SPD locations + specs + the 5-yearly inspection schedule</li>
              <li><strong className="text-white">EICR-style periodic inspection</strong> — verifies SPD status; replaces operated SPDs; records the maintenance</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>Regs 826.2 - 826.7 — interaction, storage, demand-response, EV, selectivity, verification</ContentEyebrow>

          <Pullquote>Chapter 82 doesn&rsquo;t stop at 826.1. Regs 826.2-826.7 cover everything the PEI touches.</Pullquote>

          <ConceptBlock
            title="Reg 826.2 — interaction with the public distribution network"
            plainEnglish="When the PEI is connected to the DNO (direct feeding / reverse feeding modes) it must respect the DNO&rsquo;s technical requirements: voltage / frequency tolerances, power quality, anti-islanding, fault-ride-through. In the UK, ENA EREC G98 (&le;16 A per phase fit-and-notify) and G99 (&gt;16 A apply-and-wait) set the inverter-to-DNO interface; G100 covers export limitation."
            onSite="The DNO accepts the PEI&rsquo;s parallel operation only if the inverter is type-tested to BS EN 50549-1 (LV) or -2 (MV) and the install conforms to G98 / G99. EEMS may enforce G100 export caps. The cert evidence bundle records: inverter type-test certificates; G98 commissioning notification OR G99 application + DNO confirmation; G100 export-limitation device design (where applicable)."
          >
            <p>Reg 826.2 implementation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">EREC G98 (UK)</strong> — generation up to 16 A per phase, fit-and-notify. Module 3 Section 6 covers in depth</li>
              <li><strong className="text-white">EREC G99 (UK)</strong> — generation above 16 A per phase, apply-and-wait. Module 3 Section 6 covers in depth</li>
              <li><strong className="text-white">EREC G100 (UK)</strong> — export limitation device for installs that would otherwise exceed the agreed export capacity. EEMS-implemented</li>
              <li><strong className="text-white">BS EN 50549-1/-2</strong> — generator-to-DNO interface standard. Inverter type-test against this</li>
              <li><strong className="text-white">Power quality</strong> — harmonics, flicker, voltage rise. Inverter compliance + design pack analysis</li>
              <li><strong className="text-white">Fault-ride-through</strong> — required behaviour during DNO voltage dips. Modern inverters handle per BS EN 50549</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 826.3 — energy storage inrush current at mode transitions"
            plainEnglish="Reg 826.3 (NEW A4:2026) is short and specific: consideration shall be given to the INRUSH CURRENT and other capabilities of local energy storage in the design of the system, especially when switching between operating modes. When a BESS is brought online or disconnected during a mode transition, the inrush / step current can be significant; the PEI design must account for this so that protective devices don&rsquo;t nuisance-trip and equipment isn&rsquo;t damaged."
            onSite="Practical: when the EPS contactor closes to bring a hybrid inverter&rsquo;s island mode online, the BESS PCE energises its output stage + the protected-load partition; inrush from inverter output capacitors + transformer magnetisation + downstream load (especially motors / heat pumps / fridges) can spike. Reg 826.3 says the design pack records this analysis. The full Chapter 57 BESS install detail (Reg 570.x — PCE selection, DC earthing, ventilation, fault current) is covered separately in Module 5 of this course."
          >
            <p>Reg 826.3 considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Inrush during mode switch</strong> — switching from direct/reverse feeding into island (or vice versa) means a closing contactor energises load + capacitors + transformer magnetisation. The instantaneous current can be several times the steady-state value</li>
              <li><strong className="text-white">PCE inrush spec</strong> — manufacturer datasheets typically state the inrush curve; the design pack records it</li>
              <li><strong className="text-white">Protective device coordination</strong> — OCPDs at the BESS connection must ride through the inrush without nuisance-tripping; selectivity per Reg 826.6 considers inrush events</li>
              <li><strong className="text-white">Full BESS install detail</strong> — Chapter 57 (Reg 570.x) covers battery selection, PCE, DC earthing, ventilation, fault current. Module 5 of this course covers in depth</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 826.4 — Design for flexibility (load shedding)"
            plainEnglish="Reg 826.4 (NEW A4:2026) is one sentence: where applicable, the electrical installation shall be designed for the operability of load shedding. The cross-reference is BS HD 60364-8-1 (energy efficiency of low-voltage electrical installations). The PEI design specifies which loads are sheddable + the priority sequence; the EEMS executes the shedding when needed."
            onSite="UK 2025-2026 context: smart tariffs (Octopus Agile / Cosy etc.) and DNO flex / DSR services drive automated load-shedding behaviour. EEMS subscribes to grid signals or tariff windows and sheds non-critical loads (EV charging, immersion, secondary heating) while protecting essential loads (emergency lighting, fire alarm, life-support). UK Distribution Code (www.dcode.org.uk) covers the DSO-side requirements."
          >
            <p>Reg 826.4 in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">BS HD 60364-8-1</strong> — referenced standard for the operability framework</li>
              <li><strong className="text-white">Sheddable vs protected loads</strong> — design-stage classification recorded in the PEI design pack</li>
              <li><strong className="text-white">EEMS executes (Reg 825)</strong> — the EEMS is the orchestrator; Reg 826.4 sets the design requirement, Reg 825 sets the supervisory layer</li>
              <li><strong className="text-white">Customer agency</strong> — design includes manual override; customer retains control</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 826.5 — EV charging within the PEI"
            plainEnglish="Electric vehicle charging equipment forming part of the PEI shall comply with Section 722. Where the EV supports bidirectional charging (V2H / V2G), it counts as a source under Chapter 82 and the multi-source isolation + bidirectional OCPD + parallel-operation regs (Reg 551.7) apply. V2X is emerging in UK 2025-2026 (Nissan, BYD, Wallbox Quasar)."
            onSite="Most current UK EV chargers are unidirectional (V1G — load only). They count as a controllable load within the PEI but not as a source. Where bidirectional charging is deployed (V2H/V2G — typically with Wallbox Quasar 2 or similar), the EV + its charger together become a PEI source. The design pack handles the EV per Section 722 + Chapter 82 source rules."
          >
            <p>Reg 826.5 cross-references:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Section 722</strong> — EV charging install regs (Module 6 / 7 of this course will cover in depth)</li>
              <li><strong className="text-white">V1G unidirectional</strong> — EV is a controllable load. EEMS schedules charging</li>
              <li><strong className="text-white">V2H / V2G bidirectional</strong> — EV is a source. Multi-source isolation + bidirectional OCPD + Reg 551.7 + Chapter 82 PEI design pack updates</li>
              <li><strong className="text-white">Diverter integration</strong> — Section 4.3 covered PV-surplus diverters (Eddi, Zappi). When the diverter is the EEMS the design pack records it as such</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 826.6 — selectivity / coordination across multiple sources"
            plainEnglish="Protective devices in a PEI shall be coordinated so that a fault is cleared by the device closest to the fault, with minimum disruption to the rest of the installation. With multiple sources feeding the same fault, the analysis is more complex than for a single-source install — fault contributions from each source must be summed in the relevant configurations."
            onSite="The PEI design pack includes a selectivity / coordination analysis: the prospective fault current at each protection point under various operating modes (direct feeding, reverse feeding, island, plus combinations during transitions); the I&sup2;t coordination between upstream and downstream OCPDs; the discrimination strategy. Modern hybrid installs are typically domestic-scale where the DNO fault contribution dominates, but commercial installs need more rigorous coordination."
          >
            <p>Reg 826.6 considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">Discrimination / selectivity</strong> — upstream OCPDs ride through downstream faults so only the nearest device opens</li>
              <li><strong className="text-white">Reg 434.5.1 (combined short-circuit protection)</strong> — referenced by Reg 826.1.2.3; coordination applies across all possible configurations</li>
              <li><strong className="text-white">Cascading + back-up protection</strong> — where downstream device cannot interrupt the full prospective fault current, upstream device backs it up</li>
              <li><strong className="text-white">Multi-source fault contributions</strong> — DNO + PV inverter + BESS PCE each contribute to a fault. Inverters typically contribute 1.1-1.5 &times; I_n (low); DNO contributes kA (high). Total = DNO + small inverter contributions</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 826.7 — Testing and verification (the ZS-with-inverters caveat)"
            plainEnglish="Reg 826.7 (NEW A4:2026) is short and specific: the validity of test readings taken with a fault loop impedance test instrument may be adversely affected by power converting equipment (such as inverters) within the prosumer&rsquo;s installation. In such cases an alternative method of determining prospective fault current and earth fault loop impedance shall be used. The cross-reference is Reg 643.7.3.1 NOTE 1."
            onSite="The standard handheld fault-loop tester (Megger MFT, Kewtech KT64, Fluke 1664) is calibrated for DNO-fed installs. A hybrid PV / BESS inverter is an active source — its output stage capacitors + control loop interact with the test current pulse, giving readings that may be significantly higher OR lower than the true Z_S. The commissioning record must state which method was used + the inverter state during the test. Module 4 Section 8 covers the on-the-tools workflow."
          >
            <p>Reg 826.7 in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">The caveat</strong> — handheld ZS testers may give invalid readings on PEI installs with active inverters</li>
              <li><strong className="text-white">Safe method 1 — inverter OFF</strong> — disable inverter + open AC isolator + verify zero voltage + test + record</li>
              <li><strong className="text-white">Safe method 2 — manufacturer&rsquo;s test method</strong> — some inverter manufacturers publish a commissioning-mode procedure</li>
              <li><strong className="text-white">Safe method 3 — high-current method</strong> — fully de-energised circuit + specialist test equipment</li>
              <li><strong className="text-white">Cert evidence bundle</strong> — records the ZS reading + the method + the inverter state during the test. Full commissioning workflow lives in Section 4.8</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 826.7 — Testing and verification"
            clause="The validity of test readings taken with a fault loop impedance test instrument may be adversely affected by power converting equipment (such as inverters) within the prosumer&rsquo;s installation. In such cases an alternative method of determining prospective fault current and earth fault loop impedance shall be used. See NOTE 1 of Regulation 643.7.3.1."
            meaning="Reg 826.7 is one focused message: the standard ZS test method on hybrid installs may give invalid readings due to inverter interaction with the test current. Use an alternative method (inverter disabled / manufacturer procedure / high-current method) and record what you did. The full on-the-tools workflow + commissioning detail sits in Module 4 Section 8."
          />

          <SectionRule />

          <ContentEyebrow>The Chapter 82 PEI design pack</ContentEyebrow>

          <Pullquote>PEI design pack is the integration document. Above Section 712 + Chapter 57 + Section 722 packs.</Pullquote>

          <ConceptBlock
            title="Chapter 82 PEI design pack contents"
            plainEnglish="The Chapter 82 PEI design pack is the integration document that ties the per-domain design packs (PV, BESS, EV charging) into the unified prosumer design. It sits in the cert evidence bundle alongside the per-domain packs."
            onSite="Typical residential PEI design pack: 5-15 pages. Commercial / industrial: 15-50+ pages. The MCS-certified contractor produces this as part of the survey-to-design workflow."
          >
            <p>Typical PEI design pack contents:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li><strong className="text-white">1. PEI scope statement</strong> — what defines this install as a PEI (consumes + generates + stores; specific components)</li>
              <li><strong className="text-white">2. Operating modes table</strong> — supported modes per Reg 824.2 (direct feeding / island / etc.); transition sequences; mode-specific behaviour</li>
              <li><strong className="text-white">3. Single-line schematic</strong> — all sources, all loads, all isolators, the coordination logic between sources. The PEI integration diagram</li>
              <li><strong className="text-white">4. Earthing arrangement</strong> — direct feeding mode (DNO earth); island mode (local electrode per Reg 542.2.2); transition behaviour per Reg 826.1.1.2 + .1.2.2</li>
              <li><strong className="text-white">5. Isolation summary</strong> — every isolator listed (DNO / PV / BESS / generator / EV / etc.) per Reg 826.1.1.4; warning notice location + content</li>
              <li><strong className="text-white">6. Bidirectional OCPD analysis</strong> — every OCPD listed with manufacturer / model + bidirectional capability statement per Reg 826.1.2.2; coordination per Reg 826.1.2.3</li>
              <li><strong className="text-white">7. Transient overvoltage protection design</strong> — SPDs per Reg 826.1.4; locations + specs + zones</li>
              <li><strong className="text-white">8. Grid outage response</strong> — Reg 826.1.3 option (a) island OR option (b) shutdown; the specific implementation</li>
              <li><strong className="text-white">9. Cross-references to per-domain packs</strong> — Section 712 PV (Module 3); Chapter 57 BESS (Module 5); Section 722 EV (Module 6 / 7); EREC G98 / G99 / G100; PAS 63100 for BESS</li>
              <li><strong className="text-white">10. Emergency response procedure</strong> — what happens if any source fails; customer/contractor contact info; safety actions</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="UK hybrid PV+BESS+EV install — fully PEI compliant from day one"
            situation="Customer new-build install: 6 kWp PV + 10 kWh GivEnergy BESS (DC-coupled via GivEnergy Gen3 hybrid inverter) + Zappi EV charger + future heat pump compatibility. Commissioned after A4:2026 effective date (15 April 2026)."
            whatToDo="Produce the full PEI cert evidence bundle from day one: (1) MCS MIS 3002 PV design pack (Module 3 content); (2) Chapter 57 BESS design + BS EN IEC 62485 compliance + PAS 63100 (Module 5 content); (3) Section 722 EV-charging design pack (Module 6 content); (4) Chapter 82 PEI design pack — operating modes (direct feeding + EPS island via GivEnergy EPS), multi-source isolation (DNO + PV inverter + BESS + EV charger), bidirectional OCPDs per Reg 826.1.2.2 + 712.533.101 + 570.6.1.1.1 + 551.7.1(c), SPDs per Reg 826.1.4; (5) BS EN 62446-1 commissioning records; (6) EREC G99 application (combined output > 16 A single-phase) with possible G100 export limitation; (7) DNO confirmation; (8) customer handover pack with mode descriptions + emergency response. The cert evidence bundle is the modern UK prosumer install standard."
            whyItMatters="A4:2026 raises the bar for hybrid PV+BESS installs — the unified prosumer design pack is the new MCS audit expectation. The competent contractor produces this from day one rather than retrofitting after audit findings. Cert evidence bundle becomes the customer\'s long-term asset for: ongoing EICR-style inspections; insurance claims; future installer / contractor service; property ownership transfer. The PEI design pack is the integration document that makes the install legible to future inspectors."
          />

          <Scenario
            title="Retrofit BESS to existing PV — Chapter 82 PEI design pack needed"
            situation="Customer has 4-year-old 5 kWp PV install (Solis Mini 4G inverter, A3:2024 commissioned). Adding 10 kWh BESS via AC-coupled retrofit (GivEnergy AC battery) in 2026. The retrofit makes the install a PEI."
            whatToDo="Treat the retrofit as a PEI install from the addition forward. Cert evidence bundle additions: (1) Chapter 57 BESS design pack for the new battery; (2) Chapter 82 PEI design pack — covers the now-PEI install\'s operating modes, isolation, bidirectional protection, transient protection; (3) updated EREC paperwork (likely G99 application due to combined PV + BESS output > 16 A single-phase, or G100 export limitation); (4) updated Reg 712.514.x notices reflecting the additional source; (5) BS EN 62446-1 commissioning for the BESS. The original PV cert evidence bundle (from A3:2024) stays as the historical record; the new PEI design pack is the integration document for the post-retrofit install. Customer informed of the design pack updates."
            whyItMatters="A4:2026 effective date matters for additions / alterations. The original A3 install isn\'t retroactively non-compliant, but the addition triggers A4 compliance for the new work — including Chapter 82 PEI design for the now-PEI install. The competent contractor produces the PEI design pack at the retrofit stage. Cert evidence bundle is updated accordingly."
          />

          <CommonMistake
            title="Treating Chapter 82 as &ldquo;just paperwork&rdquo; — skipping the design discipline"
            whatHappens="An installer treats the Chapter 82 PEI design pack as a paperwork tick-box — fills in a template at commissioning without the integration discipline. The install commissions fine, but inconsistencies surface during operation: contactor sequencing problems during EPS transitions; RCD misoperation on grid restoration; missing isolation in the field. MCS audit / EICR flags the design pack as superficial."
            doInstead="The Chapter 82 PEI design pack is a DESIGN document, not a commissioning artefact. Produce it at the survey-to-design stage: model the operating modes and transitions; specify the isolation per source; analyse bidirectional OCPDs; design the SPD strategy; specify the grid-outage response. The design then drives the install. Commissioning verifies the implementation matches the design. Cert evidence bundle integrates the design pack with the commissioning records as a coherent whole."
          />

          <CommonMistake
            title="Single isolator for multi-source install — Reg 826.1.1.4 violation"
            whatHappens="An installer treats the existing DNO main isolator as sufficient isolation for the whole PEI — including PV, BESS, EV charger. Maintenance work requires isolating each source individually but only the DNO isolator exists; PV continues feeding the install during &ldquo;isolation&rdquo;; BESS continues supplying. Safe work impossible. MCS / EICR audit flags Reg 826.1.1.4 violation."
            doInstead="Per Reg 826.1.1.4: main switch suitable for isolation PER SOURCE. Install: DNO main isolator (existing); PV inverter AC isolator (per Reg 712.514.102); BESS AC isolator (per Reg 570.6); EV charger AC isolator (per Section 722). Plus the durable warning notice in the vicinity alerting personnel to ALL sources. Cert evidence bundle records each isolator location + the warning notice content + position. The competent installer specifies this at design stage and verifies at commissioning."
          />

          <CommonMistake
            title="Missing bidirectional OCPD coordination — fault on retrofit BESS interrupts grid"
            whatHappens="An installer retrofits BESS to existing PV without updating the bidirectional OCPD coordination per Reg 826.1.2.2. Under a specific fault scenario (DNO fault + BESS discharging + PV producing), the fault current contributions from multiple sources overload an upstream OCPD that wasn\'t sized for the combined fault. OCPD operates incorrectly; customer\'s install offline; root cause is the missing bidirectional analysis."
            doInstead="Per Reg 826.1.2.2: account for ALL possible directions of current flow + polarity. The retrofit BESS adds a new source — fault-current contributions must be re-analysed. The competent installer\'s PEI design pack includes the bidirectional OCPD analysis: each OCPD\'s rating + direction capability + coordination per Reg 826.1.2.3 + Reg 434.5.1. Cert evidence bundle records the analysis."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Chapter 82 (NEW A4:2026) defines Prosumer\'s Electrical Installations — installs that BOTH consume AND generate / store electricity. Any hybrid PV+BESS install is a PEI; PV + integrated EV / heat pump / multi-source = PEI.',
              'Reg 824.1 PEI TYPES: (a) individual — single end-user (typical UK domestic); (b) collective — multiple users behind one connection (multi-dwelling shared); (c) shared — multiple users with own connections sharing local resources (community energy).',
              'Reg 824.2 THREE operating modes: DIRECT FEEDING (import from DNO), REVERSE FEEDING (export to DNO), ISLAND MODE (disconnected from DNO). Reg 826.1.1.1: PEI shall support all intended modes + transitions with persons + property protection.',
              'Reg 825 EEMS — supervisory control layer for prosumer logic. Coordinates loads, sources, storage, mode transitions, demand-response. BS HD 60364-8-1 + PAS 63100 references.',
              'Reg 826.1.1.1 (a)/(b): connected-mode earthing inherits DNO system type; island-mode earthing per Reg 542.2.2 (local electrode). Reg 826.1.1.2 transitions reversible. Reg 826.1.1.2.2 neutral switch prevents RCD misoperation.',
              'Reg 826.1.1.3 (NEW): PV / battery inverters are CURRENT-LIMITED sources in island mode — TN ADS may NOT operate. Use TT (RCD-based) or inverter electronic protection. The KEY safety reg for island mode.',
              'Reg 826.1.1.4: main switch PER SOURCE + warning notice, OR interlock preventing parallel operation. Reg 826.1.2.1-826.1.2.3: bidirectional OCPDs throughout; combined short-circuit coordination per Reg 434.5.1.',
              'Reg 826.1.3 grid outage handling (island OR shutdown). Reg 826.1.4 PEI transients more frequent — SPD discipline.',
              'Regs 826.2-826.7: interaction with DNO (G98/G99/G100); energy storage (Chapter 57); demand-response (sheddable vs protected loads); EV charging (Section 722, V2X); selectivity / coordination; verification per mode (with Reg 643.7.3.1 NOTE 1 inverter-active caveat for fault loop tests).',
              'A4:2026 effective 15 April 2026. PEI design pack + cert evidence bundle is the integration document. Existing A3 installs not retroactively non-compliant; additions / alterations after effective date trigger Chapter 82 for the new work.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-4')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Hybrid topologies
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-4-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.6 Hybrid inverter &amp; EPS
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
