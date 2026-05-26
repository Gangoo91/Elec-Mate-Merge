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
  DiagramPlaceholder,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm5s5-coupling-factor',
    question:
      'Reg 570.5.1 lists ten battery selection factors (a)–(j). Which one is the explicit hook into topology choice?',
    options: [
      '(a) nature of demand',
      '(d) generation profiles of locally connected generators',
      '(e) power conversion equipment connection and coupling mode',
      '(i) suitability for fixed installation and connection',
    ],
    correctIndex: 2,
    explanation:
      'Reg 570.5.1(e) is "power conversion equipment connection and coupling mode" — the regulation itself requires the designer to pick AC-coupled vs DC-coupled vs hybrid as part of selection. Factor (d) is adjacent (generation profile), and (a), (i) bracket it, but (e) is the topology-naming factor. Cert evidence bundle records which coupling mode was selected and why.',
  },
  {
    id: 'm5s5-pce-isolation',
    question:
      'Reg 570.6.5.201 — what does it require for Power Conversion Equipment (PCE) that is NOT incorporated inside the battery assembly?',
    options: [
      'A 30 mA RCD on the AC port only',
      'A means of isolation for all power ports of the PCE',
      'A warning notice at the consumer unit',
      'A bonding conductor to the battery enclosure',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.5.201 — "To allow maintenance and replacement of PCE not incorporated in a battery assembly, a means of isolation shall be provided for all power ports of the PCE." Where the inverter is a separate box from the battery (typical AC-coupled and many hybrid installs), every port — DC battery side, DC PV side (if hybrid), AC grid side, any backup/EPS port — needs its own means of isolation. Topology drives the count of ports, and therefore the isolation count.',
  },
  {
    id: 'm5s5-battery-as-genset',
    question:
      'Reg 551.7.2.1 classifies a stationary battery as a generating set. What does that mean for where the battery connects relative to protective devices?',
    options: [
      'The battery connects on the load side of all protective devices',
      'The battery connects on the supply side of protective devices, in the same way as a generating set',
      'The battery only needs a single RCD',
      'No overcurrent device is required between the battery and the inverter',
    ],
    correctIndex: 1,
    explanation:
      'Reg 551.7.2.1 — generating sets shall be installed on the supply side of protective devices, and stationary batteries are explicitly considered generating sets. In topology terms this means: the BESS contribution joins the distribution at a point upstream of the final circuit OCPDs. For AC-coupled, that point is the consumer unit busbar via a dedicated way; for DC-coupled / hybrid, the same applies at the inverter’s AC port. Section 5.3 then layers Chapter 57 protective measures on top.',
  },
  {
    id: 'm5s5-pei-config-change',
    question:
      'Chapter 82 (PEI) requires that protective measures continue to operate when the supply configuration changes (e.g. grid → island mode). Why is this a topology question, not just a setting?',
    options: [
      'It is just a setting — the inverter handles it',
      'Because the source of supply moves between grid and battery, and earthing reference, neutral handling and fault level all depend on which source is live — that is set by the topology choice',
      'Because the customer has to switch a manual selector',
      'Because the DNO requires it',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 82 (Prosumer’s Electrical Installation) — in case of change of any energy supply configuration, all protective measures shall continue to be operational or shall be automatically replaced by other protective measures providing an equivalent level of safety. Reg 826.1.1.2.2 specifically addresses neutral conductor handling on the island side — typically a contactor re-bonds N-PE inside the BESS / EPS so that ADS (automatic disconnection of supply) still works against the local source. Section 5.7 covers the commissioning checklist for the topology choice.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer has an existing 4 kWp PV string-inverter system commissioned in 2019. They now want 10 kWh of BESS added. Which topology is the LEAST disruptive retrofit?',
    options: [
      'DC-coupled — replace the existing inverter with a charge controller and feed the battery off the PV DC bus',
      'AC-coupled — add a separate battery inverter on the AC side, leave the PV inverter in place',
      'Hybrid (all-in-one) — replace the PV inverter with a hybrid inverter and add the battery',
      'Off-grid — disconnect from the grid and run on battery alone',
    ],
    correctAnswer: 1,
    explanation:
      'AC-coupled is the standard retrofit move for an existing PV-only site. The PV inverter stays in place; a dedicated battery inverter sits alongside it on the AC busbar; both feed the consumer unit. No DC re-engineering, no need to confirm PV-inverter / battery-inverter handshake compatibility (which the DC-coupled retrofit would force), no roof access. Reg 570.6.5.201 still demands isolation on every power port of the new battery PCE. The hybrid swap (option 3) is possible but rips out a working PV inverter mid-life and may force PV string re-engineering.',
  },
  {
    question:
      'Reg 570.5.1 lists ten battery selection factors. Which two factors most directly constrain the topology decision (DC-coupled vs AC-coupled vs hybrid)?',
    options: [
      '(a) nature of demand and (b) battery voltage',
      '(e) PCE connection and coupling mode, and (d) generation profiles of locally connected generators',
      '(i) suitability for fixed installation, and (j) external influences',
      '(g) charge/discharge profiles, and (h) load profiles + cyclic operation',
    ],
    correctAnswer: 1,
    explanation:
      'Factor (e) — "power conversion equipment connection and coupling mode" — is the explicit topology-naming factor. Factor (d) — "generation profiles of locally connected generators" — pins it down further: if the customer already has a PV inverter on site, that profile pushes the topology to AC-coupled retrofit; greenfield with no PV inverter yet leaves DC-coupled / hybrid open. The other factor pairs matter for sizing and selection but not for the topology choice itself.',
  },
  {
    question:
      'On a hybrid (all-in-one) inverter install, where does Reg 570.6.5.201 require isolation?',
    options: [
      'Only on the AC grid port',
      'Only between the battery and the hybrid inverter',
      'On every power port of the PCE — DC PV, DC battery, AC grid, and any EPS / backup port — provided the PCE is not incorporated inside the battery assembly',
      'Not required because the hybrid inverter is one device',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 570.6.5.201 — "To allow maintenance and replacement of PCE not incorporated in a battery assembly, a means of isolation shall be provided for all power ports of the PCE." A hybrid inverter has four typical ports: DC PV input (MPPTs), DC battery port, AC grid port, AC EPS/backup port. Each needs its own means of isolation. If the battery is a separate floor-stack from the hybrid, the PCE is NOT incorporated in the battery assembly, so the rule bites. Where the BESS unit ships as battery + integral inverter in one sealed cabinet, the manufacturer’s built-in isolation usually satisfies — confirm against the spec sheet.',
  },
  {
    question:
      'A DC-coupled BESS shares the same DC bus as the PV array via a single hybrid charge controller. Which Reg 712.x requirement is changed by the addition of the battery on the same DC bus?',
    options: [
      'Nothing — adding a battery to the PV DC bus has no AC-side regulatory effect',
      'Reg 712.433.104 — the AC supply cable’s overcurrent protective device must be sized against the inverter’s design current, which now reflects both PV generation AND battery discharge — not just PV output',
      'Reg 712.433.103 — the PV array DC cable must be doubled in size',
      'Reg 712.521 — lightning loop minimisation no longer applies',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 712.433.104 — when defining the rated current of the AC-side OCPD, the design current of the inverter shall be taken into account. On a DC-coupled hybrid, the inverter’s AC output current can swing higher than PV-only design — PV + battery discharge can both push power to the AC port simultaneously. The OCPD selection must reflect the COMBINED design current, not just the PV nameplate. Mis-sizing here is a common topology-change defect on retrofits.',
  },
  {
    question:
      'A customer wants single-phase 230 V backup during a grid outage from their existing AC-coupled BESS. Which topology change is required?',
    options: [
      'No change — standard AC-coupled inverters always provide backup',
      'A change to single-port BESS configuration',
      'An EPS (Emergency Power Supply) topology variant — the battery inverter must be the type that disconnects from the DNO supply on outage and then re-energises a dedicated EPS port or a switched sub-board, with neutral handling per Reg 826.1.1.2.2 and anti-islanding per Reg 551.7.5',
      'A second consumer unit',
    ],
    correctAnswer: 2,
    explanation:
      'Standard AC-coupled / grid-tied BESS does NOT provide backup — on grid loss the inverter trips for anti-islanding (Reg 551.7.5). Backup needs an EPS variant: the inverter type that can disconnect from the DNO supply via a contactor, re-establish a local voltage/frequency reference, re-bond the neutral on the island side (Reg 826.1.1.2.2), and re-energise either a dedicated EPS socket or a switched sub-board of essential circuits. This is a topology variant, not a setting. Confirm Reg 570.5.1(e) coupling mode covers EPS; record the EPS scope in the cert evidence bundle.',
  },
  {
    question:
      'On a hybrid install where the battery cabinet houses both the cells AND the inverter (a single sealed BESS unit), how does Reg 570.6.5.201 apply?',
    options: [
      'Every internal port of the sealed cabinet needs an external isolator',
      'The rule does not apply, because PCE incorporated within the battery assembly is excluded from the 570.6.5.201 isolation duty — the manufacturer’s built-in disconnect is taken as compliant; the installer still provides external isolation on the AC connection',
      'A separate DC isolator must be added between cells and inverter',
      'Two RCDs in series on the AC port',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.5.201 applies "to PCE not incorporated in a battery assembly". A sealed BESS unit with PCE inside the cabinet is incorporated PCE — the manufacturer’s integrated isolation arrangement is treated as compliant for the internal ports. The installer’s duty is then on the EXTERNAL connections: an AC isolator on the grid port, and any EPS port, sized for the inverter’s design current per Reg 712.433.104. Cert evidence bundle records the manufacturer model and the external isolation provision.',
  },
];

const faqs = [
  {
    question: 'Is hybrid always better than separate PV inverter + battery inverter?',
    answer:
      'No — context decides. Hybrid wins on new-build (one box, one DC bus, one EPS contactor, lower cost). AC-coupled wins on retrofit to an existing PV site (no roof / DC re-engineering, no PV-inverter replacement mid-life). DC-coupled (separate charge controller, separate inverter) is now rare at UK domestic scale — almost always collapsed into a hybrid box. The deciding factors are Reg 570.5.1(d) generation profile (do you already have a PV inverter on site?) and (e) coupling mode (what does the rest of the design force?).',
  },
  {
    question: 'How do I tell DC-coupled from AC-coupled from a single-line diagram?',
    answer:
      'Follow the connection between the PV array and the battery on the SLD. DC-coupled: PV array → DC bus → charge controller / hybrid inverter → battery on the SAME DC bus. AC-coupled: PV array → PV inverter → AC busbar → separate battery inverter → battery on its OWN DC bus. Hybrid is a special case of DC-coupled where charge controller + inverter live in one cabinet. The PCE port count on the SLD is the giveaway for Reg 570.6.5.201 isolation duty.',
  },
  {
    question: 'Does a single-port or dual-port BESS change the protection picture?',
    answer:
      'Yes. A single-port BESS has one bidirectional connection that handles both charge and discharge — one set of cables, one isolator, one OCPD. A dual-port BESS has a charge port and a discharge port as physically separate connections — two sets, two isolators, two OCPDs. Most UK domestic LFP units are single-port. Dual-port appears on commercial / industrial UPS and some large hybrid installs. Reg 570.6.5.201 ("all power ports") covers either case — the port count on the kit determines the isolator count on the installation.',
  },
  {
    question: 'Where does the EPS / island-mode topology meet Chapter 82?',
    answer:
      'Chapter 82 frames the whole site as a Prosumer’s Electrical Installation (PEI). The battery is treated both as a generator and as a load. On a config change (grid → island), Chapter 82 requires that all protective measures continue to operate or are replaced by equivalent measures. Reg 826.1.1.2.2 specifically addresses neutral conductor handling on the island side — typically a contactor re-bonds N-PE inside the BESS / EPS so that ADS (automatic disconnection of supply) still works against the local source. Section 5.7 covers the commissioning checklist for the topology choice.',
  },
  {
    question: 'BS EN IEC 62485 and PAS 63100:2024 — what is the topology bearing on these?',
    answer:
      'Reg 570.x explicitly hands install-practice detail to BS EN IEC 62485 (general safety of secondary batteries, with sub-parts for stationary and lithium-ion) and PAS 63100:2024 (UK domestic BESS). For topology the bearing is: ventilation provision scales with chemistry × pack size × siting; clearance and segregation between BESS, PCE and other equipment depends on whether they live in one cabinet (hybrid) or separated (AC-coupled). Cert evidence bundle records compliance against the support standards alongside Chapter 57.',
  },
];

export default function RenewableEnergyModule5Section5() {
  const navigate = useNavigate();

  useSEO({
    title: 'BESS topologies & architectures | Renewable Energy 5.5 | Elec-Mate',
    description:
      'DC-coupled vs AC-coupled vs hybrid BESS architectures — Reg 570.5.1(e) coupling mode, Reg 570.6.5.201 PCE isolation duty, Reg 551.7.2.1 battery-as-genset, Chapter 82 PEI configuration changes, EPS / island-mode variants.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · BS 7671:2018+A4:2026 · Chapter 57 + Chapter 82"
            title="BESS topologies & architectures"
            description="DC-coupled, AC-coupled and hybrid — the three families that decide every downstream protection, isolation and commissioning question. Reg 570.5.1(e) names the choice; Reg 570.6.5.201 sizes the isolators; Chapter 82 holds the PEI together when the supply configuration changes."
            tone="yellow"
          />

          <TLDR
            points={[
              'Topology = how the battery, the PCE (Power Conversion Equipment) and any PV array share buses. Three families: DC-coupled (battery + PV share DC bus), AC-coupled (battery + PV each have their own inverter on the AC bus), hybrid (single cabinet collapses charge controller + inverter into one).',
              'Reg 570.5.1(e) — "power conversion equipment connection and coupling mode" — is one of the ten selection factors. The topology choice is a regulatory requirement, not just an engineering preference.',
              'Reg 570.6.5.201 — every power port of the PCE that is not inside the battery assembly needs a means of isolation. Hybrid inverters often have 4 ports (DC PV, DC battery, AC grid, AC EPS) — that is four isolation provisions, not one.',
              'Reg 551.7.2.1 — stationary battery is a generating set; connects on the supply side of protective devices. Topology decides WHERE that supply-side join happens.',
              'Chapter 82 (PEI) — battery acts as both generator and load. Protective measures must continue across supply-config changes (grid → island). Reg 826.1.1.2.2 sets neutral handling in island mode.',
              'Retrofit to an existing PV site → AC-coupled is almost always the answer. Greenfield → hybrid is the UK 2025–2026 default. Pure DC-coupled (separate charge controller + inverter) survives mainly in off-grid and large commercial.',
              'EPS / backup is a topology VARIANT, not a setting. Standard grid-tied BESS trips on outage (Reg 551.7.5 anti-islanding). EPS topology adds a contactor + island-side neutral re-bond + voltage/frequency reference.',
              'Single-port vs dual-port BESS — one bidirectional connection vs separate charge/discharge ports. Port count on the kit drives isolator count on the install per Reg 570.6.5.201.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify DC-coupled, AC-coupled and hybrid topologies from a single-line diagram, naming the shared bus and the PCE port count in each case.',
              'Apply Reg 570.5.1(e) coupling-mode factor and Reg 570.5.1(d) generation-profile factor to pick the right topology for a new-build vs a PV-retrofit scenario.',
              'Apply Reg 570.6.5.201 to count the required means of isolation on a given topology, distinguishing "PCE incorporated within battery assembly" from "PCE not incorporated".',
              'Apply Reg 551.7.2.1 (battery-as-generating-set) to place the BESS contribution upstream of final-circuit OCPDs on each topology.',
              'Map a topology choice to the Chapter 82 PEI requirements — Reg 826.1.1.2.2 neutral handling, Reg 551.7.5 anti-islanding, and the obligation that protective measures persist across config changes.',
              'Distinguish single-port from dual-port BESS units and translate the port count into the installation isolator count.',
              'Decide when an EPS topology variant is needed and what extra hardware it implies (contactor, island-side neutral re-bond, voltage/frequency reference).',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Topology is a regulatory choice — Reg 570.5.1(e) names it. Everything else in Module 5 is downstream of it.
          </Pullquote>

          <ContentEyebrow>The PEI frame — battery, PV, grid and loads as one installation</ContentEyebrow>

          <ConceptBlock
            title="A BESS does not live alone — it lives in a PEI"
            plainEnglish="Chapter 82 of BS 7671:2018+A4:2026 frames any site with on-site generation and/or storage as a Prosumer's Electrical Installation (PEI). Inside the PEI, the battery is treated as both a generator (when discharging) AND a load (when charging). Topology is the layout that holds the PEI together."
            onSite="Before drawing any topology, draw the PEI: what sources feed it (DNO, PV, BESS), what loads consume it (lighting, sockets, EV charger, heat pump), and where the boundaries sit (consumer unit, EPS sub-board, isolation points). Topology is the bus arrangement that turns the PEI diagram into a buildable single-line."
          >
            <p>The PEI viewpoint matters for three reasons:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">The battery is dual-natured</strong> — Chapter 57 NOTE
                explicitly reminds us "a battery can be considered as a generator and as a load".
                The topology must accommodate energy in both directions
              </li>
              <li>
                <strong className="text-white">Protective measures must persist across config
                  changes</strong> — Chapter 82 requires that when the supply configuration
                changes (grid available → grid lost → island mode → grid restored), all
                protective measures continue to operate or are automatically replaced by
                equivalent measures
              </li>
              <li>
                <strong className="text-white">Reg 826.1.1.2.2 — neutral conductor in island
                  mode</strong> — when the BESS is the source (island), the neutral handling
                changes; the topology must include the contactor and re-bond arrangement that
                makes this work
              </li>
              <li>
                <strong className="text-white">Reg 570.5.1(e) coupling mode</strong> — naming
                the topology is a Chapter 57 selection-factor obligation; the cert evidence
                bundle records which mode was chosen and why
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.5.1 — Battery selection factors (the topology hook)"
            clause={`Selection of battery type and capacity shall take account of the following factors:
(a) nature of demand;
(b) battery voltage;
(c) charge time and discharge time;
(d) generation profiles of locally connected generators;
(e) power conversion equipment connection and coupling mode;
(f) supplied equipment's utilization voltage range;
(g) battery charge and discharge profiles;
(h) load profiles and cyclic operation capability;
(i) suitability for fixed installation and connection;
(j) the relevant external influences.`}
            meaning="Reg 570.5.1 is the master battery-selection checklist. Factor (e) — coupling mode — is the explicit topology-naming hook. Factor (d) — locally connected generator profiles — is the topology-constraining hook: if a PV inverter is already on site, that profile pushes the new BESS toward AC-coupled retrofit; if greenfield, hybrid is on the table. Every BESS spec document and cert evidence bundle should walk through (a)–(j) and record the answers. Skip (e), and the topology decision is invisible and unaccountable."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The three families — DC-coupled, AC-coupled, hybrid</ContentEyebrow>

          <Pullquote>
            DC-coupled shares the DC bus. AC-coupled shares the AC bus. Hybrid puts the two together
            in one cabinet.
          </Pullquote>

          <ConceptBlock
            title="DC-coupled topology"
            plainEnglish="In a DC-coupled system, the PV array and the battery share the SAME DC bus through a charge controller (sometimes integrated into the inverter, sometimes separate). A single inverter then converts DC → AC for the loads and the grid. Energy from PV to battery never leaves DC — only one round-trip conversion penalty, not two."
            onSite="DC-coupled with a SEPARATE charge controller is now rare at UK domestic scale; the role has been absorbed into hybrid inverters. Pure DC-coupled survives in: off-grid systems, large commercial PV+BESS, and legacy installs. Recognising it on an SLD: PV array and battery sit on the same DC bus, before the inverter."
          >
            <p>What the DC bus shares:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">One DC bus voltage</strong> — sized by both the
                PV string voltage and the battery nominal voltage; the charge controller
                reconciles them
              </li>
              <li>
                <strong className="text-white">One DC isolator per power port</strong> — Reg
                570.6.5.201 demands isolation on each port; on DC-coupled with separate
                controller + inverter, that means at least 3 isolation provisions (PV DC,
                battery DC, AC out)
              </li>
              <li>
                <strong className="text-white">One round-trip conversion</strong> — PV →
                battery stays DC; only the discharge to loads / grid pays the DC→AC
                conversion (~95–97% efficient at modern hybrid scale)
              </li>
              <li>
                <strong className="text-white">PV array re-engineering may be needed</strong>
                — DC bus voltage must match what both the PV string and the battery want;
                retrofit onto an existing string usually forces a re-stringing exercise
              </li>
              <li>
                <strong className="text-white">Section 712 still applies</strong> to the PV
                side of the DC bus — DC fuse selection (Reg 712.431.101 / .102), array cable
                protection (Reg 712.433.103), lightning loop minimisation (Reg 712.521.102)
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="DC-coupled topology SLD. Left: PV array (3 strings) → DC isolator → MPPT charge controller. Bottom-left: battery pack → DC isolator → same DC bus into controller. Right: controller → single hybrid inverter → AC isolator → consumer unit (DNO supply on the right side). Three isolation symbols at PV DC, battery DC, AC out. Earth bonding shown on PV frame, inverter chassis and CU MET. Annotations: shared DC bus, single AC conversion, Reg 570.6.5.201 isolator count = 3."
            filename="renewable/m5s5-dc-coupled.png"
          />

          <ConceptBlock
            title="AC-coupled topology"
            plainEnglish="In an AC-coupled system, the PV array has its OWN inverter (PV → AC), and the battery has its OWN bidirectional inverter (battery DC ↔ AC). Both connect to the AC busbar — typically at the consumer unit via dedicated ways. Each can be specified, replaced, or expanded independently."
            onSite="AC-coupled is the standard retrofit move on a UK domestic site that already has a PV string-inverter installed (typical post-2010 install). The existing PV inverter stays; a separate battery inverter goes alongside it; no roof access, no PV re-stringing. Recognising it on an SLD: PV array → PV inverter → AC bus; battery → battery inverter → same AC bus, two distinct paths to the consumer unit."
          >
            <p>Why retrofitters reach for AC-coupled:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">No PV-side re-engineering</strong> — the
                existing PV inverter is left in service; no re-stringing, no roof work
              </li>
              <li>
                <strong className="text-white">Independent service and replacement</strong>
                — PV inverter and battery inverter can be replaced separately at end-of-life;
                each is a distinct PCE under Reg 570.6.5.201
              </li>
              <li>
                <strong className="text-white">Two round-trip conversions on PV→battery
                  energy</strong> — DC→AC at the PV inverter, then AC→DC at the battery
                inverter. Round-trip efficiency on cross-charging is therefore lower (~88–
                92%) than DC-coupled (~95–97%) — the price of the retrofit win
              </li>
              <li>
                <strong className="text-white">Two AC OCPDs in the consumer unit</strong> —
                each inverter has its own dedicated way with its own RCBO; Reg 712.433.104
                sizes the PV way against PV-inverter design current, Reg 570.x sizes the
                battery way against battery-inverter design current
              </li>
              <li>
                <strong className="text-white">EPS / backup is harder</strong> — getting both
                inverters to coordinate during island mode is non-trivial; many AC-coupled
                installs simply omit backup, or backup is the battery-inverter’s
                feature alone (PV inverter trips on outage per Reg 551.7.5)
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="AC-coupled topology SLD. Top-left: PV array → DC isolator → PV inverter → AC isolator → consumer unit way 1. Bottom-left: battery → DC isolator → bidirectional battery inverter → AC isolator → consumer unit way 2. Right: consumer unit busbar → henley → DNO supply. Two distinct AC paths meeting at the CU busbar. Four isolation symbols: PV DC, PV AC, battery DC, battery AC. Reg 570.6.5.201 isolator count = 4 (assuming both PCE separate from battery assembly)."
            filename="renewable/m5s5-ac-coupled.png"
          />

          <ConceptBlock
            title="Hybrid (all-in-one) inverter topology"
            plainEnglish="A hybrid inverter collapses the PV charge controller and the bidirectional battery inverter into ONE cabinet, sharing one DC bus internally. From the outside the install looks like a single PCE with multiple ports — MPPTs for the PV strings, a battery port, an AC grid port, and (usually) an EPS / backup port."
            onSite="Hybrid is the UK 2025–2026 default for new-build PV+BESS installs. GivEnergy Gen3, Sigenergy SigenStor, FoxESS, Huawei LUNA — all hybrid by default. Recognising it on an SLD: one PCE box with 4 ports drawn — PV DC in, battery DC in, AC grid out, AC EPS out — instead of two separate boxes."
          >
            <p>The hybrid case — what it adds, what it costs:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">One cabinet, one warranty, one comms
                  surface</strong> — the customer’s app shows PV, battery and grid in
                one place; installer has one piece of kit to commission
              </li>
              <li>
                <strong className="text-white">DC-coupled efficiency on PV→battery</strong>
                — internal DC bus avoids the AC→DC→AC round-trip; round-trip PV→battery
                ~95–97%
              </li>
              <li>
                <strong className="text-white">Four power ports → four isolation provisions
                  per Reg 570.6.5.201</strong> if the battery is a separate floor-stack from
                the hybrid cabinet. If the battery is INCORPORATED inside the same sealed
                assembly (some "all-in-one BESS" SKUs), the rule’s explicit "not
                incorporated" clause means the manufacturer’s internal arrangement is
                taken as compliant and the installer focuses on external isolation only
              </li>
              <li>
                <strong className="text-white">EPS port often built-in</strong> — many
                hybrids include a dedicated EPS / backup port that energises a switched
                sub-board on outage. Reg 826.1.1.2.2 neutral handling is then internal to
                the inverter, with installer responsibility for the EPS sub-board and the
                customer-facing labelling
              </li>
              <li>
                <strong className="text-white">Single point of failure</strong> — the
                trade-off. End-of-life replacement takes the whole site offline; service
                requires the manufacturer’s engineer or a trained installer; spares
                policy matters
              </li>
            </ul>
          </ConceptBlock>

          <DiagramPlaceholder
            caption="Hybrid (all-in-one) topology SLD. Centre: single PCE box with four ports — top: PV DC inputs (3 MPPTs shown); left: battery DC port to floor-stack battery; right: AC grid port to consumer unit; bottom: AC EPS port to switched essential-circuits sub-board. Isolation symbols on each of the four external ports. Annotations: internal DC bus (no external DC connection between PV and battery), Reg 570.6.5.201 isolator count = 4 external, Reg 826.1.1.2.2 neutral re-bond shown inside EPS leg."
            filename="renewable/m5s5-hybrid.png"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.5.201 — Means of isolation for PCE"
            clause="To allow maintenance and replacement of PCE not incorporated in a battery assembly, a means of isolation shall be provided for all power ports of the PCE."
            meaning="The topology determines the port count. DC-coupled with separate charge controller + inverter → 3 ports (PV DC, battery DC, AC out). AC-coupled → 4 ports across the two PCE (PV DC + PV AC + battery DC + battery AC). Hybrid → 4 ports on one PCE (PV DC + battery DC + AC grid + AC EPS). Each port needs its own means of isolation, sized for the worst-case design current at that port. The exception — PCE INCORPORATED in the battery assembly (sealed all-in-one BESS) — relies on the manufacturer’s internal arrangement; the installer’s duty drops to the EXTERNAL ports only. Cert evidence bundle records the port count and the isolator selection for each."
          />

          <InlineCheck {...inlineChecks[1]} />

          <CommonMistake
            title="Quoting DC-coupled retrofit onto an existing PV string-inverter site without checking compatibility"
            whatHappens="Customer has a 4 kWp PV install from 2017 with a Solis string inverter. Installer quotes a DC-coupled BESS retrofit on the basis that DC-coupled is more efficient. The proposal requires the existing PV inverter to be replaced with a hybrid; the PV strings to be re-engineered onto the new hybrid’s MPPT voltage window; and the customer to pay for a perfectly serviceable PV inverter to come out mid-life. Customer pushes back when the quote arrives."
            doInstead="On retrofit to an existing PV site, the default is AC-coupled: leave the working PV inverter in service, add a separate battery inverter on the AC side. No roof work, no re-stringing, no mid-life PV-inverter binning. The efficiency penalty (~5–8% on PV→battery cross-charging) is real but small in absolute kWh terms over a year. Reg 570.5.1(d) generation profile factor and (e) coupling mode factor justify the choice in the cert evidence bundle. Pure DC-coupled retrofit is justified only when the existing PV inverter is at end-of-life anyway."
          />

          <SectionRule />

          <ContentEyebrow>Single-port vs dual-port, and the EPS variant</ContentEyebrow>

          <ConceptBlock
            title="Single-port vs dual-port BESS"
            plainEnglish="A single-port BESS uses one bidirectional electrical connection to handle both charge and discharge. A dual-port BESS has physically separate charge and discharge connections. Almost every UK domestic LFP unit on the market in 2025–2026 is single-port; dual-port appears on commercial / industrial UPS topologies and some large hybrid installs."
            onSite="Port count on the kit drives the installer’s isolator count. Single-port → one DC isolation provision between cells and PCE. Dual-port → two DC isolation provisions, one for the charge path and one for the discharge path. Reg 570.6.5.201 phrasing — “isolation… for all power ports of the PCE” — covers both cases by saying “all power ports”. The cert evidence bundle must list each port and its isolator."
          >
            <p>Why dual-port still exists:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Charge and discharge happen simultaneously</strong>
                — a true online UPS topology keeps the inverter always running off the
                battery while a separate rectifier keeps the battery charged from the
                supply; physically separate ports make this efficient at scale
              </li>
              <li>
                <strong className="text-white">Independent sizing</strong> — the charge port
                can be sized to a slow tariff-window current; the discharge port to peak
                load; each port’s OCPD is sized for ITS worst-case design current
              </li>
              <li>
                <strong className="text-white">Service isolation</strong> — discharge path
                can be isolated for service while the charge path keeps the pack topped up
              </li>
              <li>
                <strong className="text-white">UK domestic relevance</strong> — low. Single-port
                bidirectional inverters now do the job for under 15 kWh installs; dual-port
                appears mainly in commercial / industrial / data-centre topologies
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.2.1 — stationary battery treated as generating set"
            clause="Generating sets shall be installed on the supply side of protective devices. Stationary batteries used for the storage and supply of electrical installations shall be considered as generating sets."
            meaning="The BESS contribution joins the distribution UPSTREAM of the final-circuit OCPDs. On AC-coupled, that join is at the consumer-unit busbar via a dedicated way with its own RCBO. On hybrid, the same applies at the inverter’s AC grid port. The implication for topology: there must be enough busbar capacity at the join point, and the cumulative imported + generated fault contribution must be tolerable by the consumer unit’s installed devices. This is one of the first checks on any retrofit — a 1980s consumer unit may not be a competent destination for an additional source connection."
          />

          <ConceptBlock
            title="EPS / island-mode — the topology variant"
            plainEnglish="A standard grid-tied BESS does not provide backup. On grid loss, the inverter trips for anti-islanding (Reg 551.7.5). To provide power during an outage, you need an EPS (Emergency Power Supply) topology variant — a contactor that disconnects from the DNO supply, an island-side neutral re-bond, and a voltage / frequency reference held by the inverter itself."
            onSite="EPS is a CONFIGURATION CHOICE, not a software setting. It needs hardware: the EPS-capable inverter SKU (not every hybrid is EPS-capable), the changeover contactor (often inside the inverter, sometimes external), the EPS sub-board for the essential circuits, and the warning labels. Customer expectations need managing: most domestic EPS systems energise a switched subset of circuits, not the whole house — the customer’s electric shower, EV charger and heat pump usually stay off in island mode."
          >
            <p>What EPS topology adds on top of the base topology:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">A contactor that disconnects the DNO
                  supply</strong> from the EPS sub-board within milliseconds of outage
                detection — typically internal to the inverter
              </li>
              <li>
                <strong className="text-white">An island-side neutral re-bond</strong> — when
                the BESS is the source, the N-PE bond on the DNO side is lost; the inverter
                re-establishes a bond on the island side so that ADS still operates against
                local fault current (Reg 826.1.1.2.2)
              </li>
              <li>
                <strong className="text-white">A voltage and frequency reference</strong>
                held by the inverter — grid-forming behaviour rather than the grid-following
                behaviour of a normal grid-tied inverter
              </li>
              <li>
                <strong className="text-white">An EPS sub-board / labelled circuits</strong>
                — typically a small consumer unit of "essentials": kitchen sockets, fridge,
                router, lighting on a single floor. High-current loads (shower, EV charger)
                stay on the DNO side and are inert during island mode
              </li>
              <li>
                <strong className="text-white">Reg 551.7.5 anti-islanding remains
                  satisfied</strong> — the island is electrically separated from the DNO by
                the contactor; no current is exported to the public network
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Topology, install practice and the §5.3 protection picture</ContentEyebrow>

          <ConceptBlock
            title="Topology → protection picture map"
            plainEnglish="Every topology lays out the Chapter 57 protective measures differently. The same regs apply — overcurrent, fault, basic protection, isolation, ADS — but WHERE each one lives on the SLD changes with the bus arrangement. Section 5.3 covers the protective measures in depth; this is the map that connects topology choice to where the measures land."
            onSite="When you draw the SLD, draw the protection markers on the same sheet. Each DC port gets its own DC OCPD (fuse / breaker / built-in) and DC isolator. Each AC port gets its OCPD (RCBO type per the inverter manufacturer), its AC isolator, and is bonded to the CU MET. The protection sheet becomes the spine of the cert evidence bundle."
          >
            <p>How each topology lays out the Chapter 57 protective measures:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">DC-coupled (separate controller + inverter)</strong>
                — DC fuses on the PV string side per Section 712 (Reg 712.431.101 /
                712.431.102), DC OCPD on the battery side per Chapter 57, AC OCPD on the
                inverter output. Three OCPD sets in three different regulatory homes — the
                cert evidence bundle has to walk through each
              </li>
              <li>
                <strong className="text-white">AC-coupled</strong> — DC fuses on PV array
                side (Section 712), DC OCPD on battery side (Chapter 57), two AC RCBOs in
                the consumer unit (one per inverter), each sized per Reg 712.433.104 for PV
                and per Reg 570.x for battery. The protection map has more boxes but each
                box is independently traceable
              </li>
              <li>
                <strong className="text-white">Hybrid (all-in-one)</strong> — most internal
                OCPDs are inside the manufacturer&rsquo;s cabinet and are taken as compliant
                per the spec sheet. External duties: PV DC isolator + battery DC isolator +
                AC RCBO on the grid port + AC OCPD on the EPS port. The protection map
                shrinks but the manufacturer&rsquo;s evidence pack grows
              </li>
              <li>
                <strong className="text-white">EPS variant</strong> — adds an island-side
                ADS check (does the inverter&rsquo;s short-circuit contribution operate the
                EPS sub-board&rsquo;s RCBO inside the disconnection time?) and a neutral
                re-bond label. Section 5.7 covers the commissioning evidence for the EPS
                ADS check
              </li>
              <li>
                <strong className="text-white">Basic protection</strong> — Reg 570.6.2.1.201
                bites wherever the touchable d.c. potential difference exceeds 120 V. HV
                LFP packs (200 V+ nominal) need basic protection by insulation or enclosure
                on every connection — including the DC isolator handle, the cable glands,
                the bus bar terminations
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.2.1.201 — Basic protection on battery connections"
            clause="Battery connections shall have basic protection by insulation or enclosures or shall be arranged so that conductive parts having between them a potential difference exceeding 120 volts cannot be inadvertently touched simultaneously."
            meaning="The 120 V threshold is on the d.c. p.d. between conductive parts that could be touched at the same time. UK domestic LFP HV packs (typical 200–400 V nominal) blow through the threshold easily; LV LFP packs (48 V nominal) usually do not. Topology drives which side of the threshold you land on: high-voltage hybrid topologies typically pick a 200–400 V battery nominal voltage to match the inverter&rsquo;s DC bus, putting every DC terminal above the 120 V threshold and into basic-protection territory. Cert evidence bundle records the bus voltage and the basic-protection arrangement on every accessible DC connection."
          />

          <ConceptBlock
            title="DC vs AC routing and segregation"
            plainEnglish="DC and AC cables live different lives. DC carries higher prospective fault energy at lower voltages, and on a BESS install can run hundreds of amps at 48–500 V DC. AC carries familiar 230 V single-phase domestic at much lower steady-state current. The topology decides where the DC stops and the AC starts — and the install practice follows."
            onSite="Short, direct DC runs in conduit / trunking, segregated from AC. DC isolation point clearly labelled and within reach of the kit it isolates. Field practice: dedicated DC interconnect routes, segregated from AC in trunking; short direct runs with properly-rated cable; manufacturer torque setting on every termination."
          >
            <p>Topology decides where the DC lives:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">DC-coupled / hybrid</strong> — DC bus between
                PV array and PCE plus DC bus between battery and PCE. Two DC routes,
                separately isolated
              </li>
              <li>
                <strong className="text-white">AC-coupled</strong> — DC bus between PV array
                and PV inverter; DC bus between battery and battery inverter; PV inverter
                and battery inverter then both speak AC into the consumer unit. Two DC
                routes, separately routed and isolated
              </li>
              <li>
                <strong className="text-white">All-in-one (PCE inside battery
                  assembly)</strong> — only the PV DC and AC sides are external; the
                battery-PCE DC bus is internal to the sealed cabinet
              </li>
              <li>
                <strong className="text-white">Segregation discipline</strong> — DC and AC
                in separate conduits / trunking compartments; common install defect is
                co-routing DC and AC, leading to mutual coupling and ambiguity during fault
                tracing
              </li>
              <li>
                <strong className="text-white">Cable sizing on DC</strong> — string voltage
                and battery nominal voltage both drive current; current drives sizing;
                common install mistake is under-spec’d interconnect cross-section on the
                battery-to-PCE run
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Co-routing DC and AC in the same trunking compartment on a hybrid retrofit"
            whatHappens="Installer rips out the old PV inverter, fits a hybrid, and reuses the original PV inverter’s AC trunking for the new hybrid’s AC grid port. Then runs the new battery DC cables in the same trunking back to the floor-stack BESS in the garage, because it’s the easiest route. EICR three years later flags mutual coupling, ambiguous fault tracing, and labelling that doesn’t match the kit."
            doInstead="Plan DC and AC routes separately on the topology drawing before the install. Use separate trunking compartments or separate conduits. Label every cable at both ends with its function (PV DC, battery DC, AC grid, EPS). Reg 570.6.5.201 isolators sit at each port with clear labels that match the cable labels. Cert evidence bundle records the routing plan and the labelling scheme."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 82 (PEI) — protective measures across supply changes"
            clause="The implementation of the requirements provided shall not impair the safety of the PEI. In case of change of any energy supply configuration (for example, from network supply to local power supplies) all protective measures shall continue to be operational or shall be automatically replaced by other protective measures providing an equivalent level of safety."
            meaning="The chapter forces topology to anticipate the worst supply-config transitions on site: grid → island, island → grid, grid → grid+battery export, etc. Protective measures (ADS, RCD operation, equipotential bonding) must keep working through each transition. For EPS topology this is the regulatory teeth behind the island-side neutral re-bond. For non-EPS topology it is the basis on which Reg 551.7.5 anti-islanding is acceptable — protective measures continue to operate because the inverter has dropped the load, not because backup has appeared. The cert evidence bundle records the configurations considered and the protective behaviour in each."
          />

          <Scenario
            title="UK suburban customer — new-build 5 kWp PV + 10 kWh BESS"
            situation="Customer in midlands suburban detached house, 2024 new build. Wants PV + BESS for self-consumption + occasional outage backup. No existing PV on site. Garage with mains intake plus utility room for kit. Budget moderate, prefers UK-supported brand. Customer is curious about &lsquo;keeping the lights on&rsquo; during outages."
            whatToDo="Hybrid topology with EPS variant. Recommend a GivEnergy Gen3 5 kW hybrid inverter + GivEnergy 9.5 kWh LFP floor-stack battery + dedicated EPS sub-board energising kitchen sockets, fridge, router and ground-floor lighting. Reg 570.5.1 selection rationale: (d) no existing generators → greenfield, (e) coupling mode = hybrid + EPS. Reg 570.6.5.201 isolators: PV DC, battery DC, AC grid, AC EPS — 4 external isolation provisions, since the battery is a separate floor-stack from the hybrid cabinet. Reg 551.7.2.1 places the AC grid port on a dedicated CU way upstream of final circuit OCPDs. Chapter 82 / Reg 826.1.1.2.2 — neutral re-bond handled internally by the GivEnergy hybrid on the EPS side, label the EPS sub-board accordingly. Cert evidence bundle: Section 712 PV pack + Chapter 57 BESS pack + Chapter 82 PEI pack + EPS topology drawing + customer essentials list signed off."
            whyItMatters="The hybrid + EPS combination is the UK 2025–2026 new-build default — single cabinet, internal DC efficiency on PV→battery, integrated backup. Setting customer expectations is critical: explain that the EPS sub-board is a curated subset of circuits, not the whole house, and that the heat pump / EV charger / electric shower will stay off in island mode. Cert evidence bundle records the choice rationale per Reg 570.5.1(d)(e) and the EPS scope per Chapter 82."
          />

          <Scenario
            title="UK retrofit — 4 kWp PV already installed in 2018, customer now wants 10 kWh BESS"
            situation="Customer has a 4 kWp PV install commissioned 2018, Solis 4G string inverter on the garage wall, working fine, 10 years of warranty left. Wants to add 10 kWh BESS for self-consumption + tariff arbitrage on Octopus Flux. No backup requirement — customer is comfortable with grid-tied only."
            whatToDo="AC-coupled topology. Leave the existing Solis PV inverter in service. Add a GivEnergy AC3 5 kW battery inverter alongside it on the garage wall, with a GivEnergy 9.5 kWh LFP battery. Two CU ways in the consumer unit — one for the existing PV inverter (already there), one new for the battery inverter. Reg 570.5.1 selection rationale: (d) existing PV inverter on site → AC-coupled retrofit, (e) coupling mode = AC-coupled, (a) demand = self-consumption + tariff arbitrage. Reg 570.6.5.201 isolators on the new install: battery DC + battery AC = 2 new external isolation provisions (the existing PV side already has its own). Reg 712.433.104 — the existing PV AC OCPD is already sized for the PV inverter; new battery AC OCPD sized for the new inverter’s design current. No EPS — customer accepts grid-tied only behaviour; standard Reg 551.7.5 anti-islanding applies on outage."
            whyItMatters="AC-coupled retrofit is the right answer on this site — no roof work, no PV re-stringing, no mid-life PV inverter binning, no DC re-engineering. The ~5–8% efficiency penalty on PV→battery cross-charging is real but small in absolute kWh terms. Cert evidence bundle records the retrofit rationale and the two-PCE topology; the customer’s app shows two boxes (one PV monitoring, one battery monitoring) instead of one — acceptable trade-off for the no-disruption retrofit."
          />

          <Scenario
            title="Off-grid LFP retrofit — rural Wales, replacing aged lead-acid bank"
            situation="Customer with a 15-year-old off-grid PV install in rural Wales. Original lead-acid bank (24 × 2 V cells, ~30 kWh nameplate, 50% DoD limit = 15 kWh usable) is at end-of-life — capacity down ~70%, increasing maintenance burden, hydrogen evolution still requiring forced ventilation. No grid connection planned; site has a backup diesel generator for winter weeks. Customer wants to switch to LFP without changing the off-grid topology."
            whatToDo="Off-grid DC-coupled topology with separate charge controller + bidirectional inverter (e.g. Victron MultiPlus-II 48/5000 + SmartSolar MPPT 250/100 + Pylontech US5000 LFP modules). Retain the existing PV array; replace the lead-acid bank with 4 × Pylontech US5000 (~19 kWh nameplate, 80% DoD = 15.2 kWh usable — matches existing usable capacity in a smaller cabinet). 48 V LFP nominal stays below the Reg 570.6.2.1.201 120 V threshold — basic protection by enclosure suffices. Reg 570.5.1 selection rationale: (a) demand = off-grid residence + occasional generator support, (b) voltage = 48 V LFP to match existing 48 V bus, (e) coupling mode = DC-coupled separate controller + inverter (legitimate off-grid topology), (j) external influences = rural Wales temp range and the generator on the AC bus. Reg 551.7.2.1 — the LFP is one generating set; the diesel generator is another; both on the supply side, both with their own protective devices and synchronisation arrangements. Reg 570.6.5.201 isolators: PV DC + battery DC + AC out + generator AC in = 4 external isolation provisions. No DNO connection → Reg 551.7.5 anti-islanding does not bite; the system is permanently island."
            whyItMatters="Off-grid is a legitimate topology family that is NOT a special case of grid-tied. DC-coupled with separate controller + inverter is the Victron / Studer / OutBack pattern, still dominant in UK off-grid 2025–2026 because it scales (more PV, more battery, more generator) without ripping out the inverter. LFP makes the topology safer (no hydrogen, basic protection by enclosure at 48 V) and lower-maintenance (no equalisation, no specific gravity checks). Cert evidence bundle records the off-grid framing — Chapter 57 BESS pack + Chapter 82 PEI pack flagged as permanent-island, no grid sync requirement, no G99 application. Customer keeps the same operational pattern they are used to."
          />

          <CommonMistake
            title="Swapping a working PV inverter for a hybrid mid-life because &lsquo;hybrid is more efficient&rsquo;"
            whatHappens="Installer quotes a hybrid topology retrofit on a 6-year-old PV site, justifying the replacement of a perfectly serviceable PV string inverter on the basis of higher round-trip efficiency. Customer pays for a hybrid + battery + DC re-stringing of the existing PV array. The new hybrid’s MPPT voltage window forces the existing PV strings to be split and re-cabled; scaffolding goes up; roof tiles get cracked during the re-strapping; the old PV inverter goes to e-waste with 4 years of warranty remaining. Total cost ~£3,000 higher than AC-coupled retrofit."
            doInstead="On a retrofit with a working PV inverter, the default is AC-coupled. The DC-coupled efficiency advantage on PV→battery is small (~5–8 percentage points) and only applies to the fraction of PV generation that goes to the battery; on a typical UK domestic install ~40% of PV goes to battery, ~60% goes direct to loads or export. Net annual loss from staying AC-coupled: typically £20–£40, dwarfed by the £3,000 cost of switching topology. Reg 570.5.1(d)(e) cert rationale records the choice. The hybrid swap is justified ONLY when the existing PV inverter is at end-of-life anyway, or when EPS / backup is a hard customer requirement that the existing inverter cannot satisfy."
          />

          <ConceptBlock
            title="Three-phase & commercial topology variants"
            plainEnglish="Domestic UK BESS is overwhelmingly single-phase 230 V. Commercial sites — workshops, small offices, agricultural — often have three-phase 400 V supplies, and the topology choices change with them. Three-phase hybrid inverters, three-phase AC-coupled battery inverters, and three-phase EPS variants all exist; sizing and balancing constraints replace the single-phase OCPD picture."
            onSite="On commercial sites, confirm the supply arrangement before drafting the topology. TN-S vs TN-C-S vs TT changes the bonding picture; balanced vs unbalanced three-phase loads change the inverter selection; export limit per phase changes the G99 application. The Reg 570.5.1(b) voltage factor and (e) coupling mode factor both need to be answered in three-phase terms."
          >
            <p>What changes when the topology goes three-phase:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Three-phase hybrid inverters</strong> exist
                (GivEnergy AIO, Sigenergy SigenStor 3-ph, Sungrow SH series). One PCE box,
                three AC phases out, plus the usual PV / battery / EPS ports. Reg 570.6.5.201
                isolator duty still applies per port — but each AC port is now a three-pole
                isolator instead of single-pole + neutral
              </li>
              <li>
                <strong className="text-white">Phase balancing matters</strong> — a 5 kW
                single-phase inverter on a three-phase supply pushes 5 kW down ONE phase and
                imbalances the supply. DNOs apply per-phase G98/G99 thresholds; some require
                three-phase BESS above ~3.68 kW per phase, others tolerate unbalance up to a
                limit. Confirm the DNO position before signing off the topology
              </li>
              <li>
                <strong className="text-white">EPS on three-phase</strong> is harder. Many
                three-phase hybrids EPS only one phase (the inverter&rsquo;s designated
                EPS phase); some EPS all three but at reduced power. Customer expectation
                management: the workshop CNC machine on phase 2 may stay off during island
                mode while the lighting on phase 1 stays on
              </li>
              <li>
                <strong className="text-white">Earthing arrangement</strong> drives Chapter
                82 / Reg 826.1.1.2.2 neutral handling. TN-C-S sites with a PEN need the
                neutral re-bond on the island side of the contactor; TT sites need a TT
                earth electrode arrangement that survives both grid and island mode
              </li>
              <li>
                <strong className="text-white">Section 5.6 sizing</strong> on three-phase
                involves per-phase load profiles and per-phase export limits, not just
                aggregate kWh. The topology decision and the sizing decision interact more
                tightly than they do at domestic single-phase scale
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Topology is one of the ten battery selection factors in Reg 570.5.1 — specifically factor (e) "power conversion equipment connection and coupling mode". Naming it is a regulatory obligation, not just an engineering preference.',
              'Three families: DC-coupled (PV + battery share DC bus, single inverter), AC-coupled (PV + battery each have their own inverter, share AC bus), hybrid (charge controller + bidirectional inverter collapsed into one cabinet).',
              'UK 2025–2026 defaults: new-build → hybrid; retrofit to existing PV site → AC-coupled; off-grid / large commercial → still some pure DC-coupled. Pure DC-coupled with separate controller is rare in UK domestic.',
              'Reg 570.6.5.201 — every power port of the PCE needs a means of isolation, unless the PCE is incorporated within the battery assembly. Hybrid usually = 4 external ports (PV DC, battery DC, AC grid, AC EPS) = 4 isolators.',
              'Reg 551.7.2.1 — stationary battery is treated as a generating set; connects on the supply side of protective devices. The CU busbar at the join point must be competent for the cumulative fault contribution.',
              'Reg 712.433.104 still applies on the AC side wherever a PV inverter is involved — the OCPD must be sized against the inverter’s design current, which on a hybrid reflects PV + battery discharge combined.',
              'EPS / backup is a topology VARIANT, not a setting. Standard grid-tied trips on outage per Reg 551.7.5 anti-islanding. EPS adds a contactor, island-side neutral re-bond (Reg 826.1.1.2.2), voltage/frequency reference, and a labelled essentials sub-board.',
              'Chapter 82 (PEI) holds the topology accountable for protective-measure persistence across config changes (grid → island → grid). Protective measures must continue to operate or be automatically replaced by equivalent measures.',
              'Single-port vs dual-port BESS — port count on the kit drives isolator count on the install. UK domestic is overwhelmingly single-port; dual-port appears in commercial / industrial UPS topologies.',
              'DC and AC routing must be segregated (separate conduit / trunking compartments) and labelled. Common install defect: co-routing of DC and AC, leading to ambiguous fault tracing and mismatched labelling at EICR.',
              'Cert evidence bundle records the topology choice, the Reg 570.5.1 selection rationale (especially (d) and (e)), the port count and isolator selection per Reg 570.6.5.201, and the EPS scope if EPS is in play.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-5-section-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                BS EN IEC 62485 + PAS 63100
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-5-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.6 Sizing & energy modelling
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
