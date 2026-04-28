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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm5s5-what-is-islanding',
    question:
      'A 4 kW PV inverter is feeding a domestic distribution board. The DNO opens the local LV feeder upstream for emergency repair. What is "islanding" in this scenario?',
    options: [
      'The inverter trips on undervoltage within 0.2 s — that is correct, expected behaviour',
      'The inverter continues to export, energising a portion of the LV network that the DNO has just disconnected — creating an unintended live "island" around the customer\'s installation',
      'The DC string voltage rises above MPPT range and the inverter shuts down',
      "The customer's consumer unit RCD trips because of an earth fault on the dead feeder",
    ],
    correctIndex: 1,
    explanation:
      'Islanding is the unintended condition where an embedded generator (PV, battery, V2G) keeps feeding a section of the distribution network after the upstream supply has been disconnected. The "island" is the local area still energised by the generator. To repair-crews and the DNO, that section is supposed to be dead — islanding makes it live and presents a fatal-shock and equipment-damage risk. Anti-islanding protection is the inverter feature that detects loss-of-mains and disconnects within a defined time window (G98/G99 specify the limits).',
  },
  {
    id: 'm5s5-g98-vs-g99',
    question:
      'A customer is installing a 5.5 kW single-phase PV system on a 100 A single-phase domestic supply. Which Engineering Recommendation governs the connection?',
    options: [
      'G83 — that is the current standard for single-phase microgeneration',
      'G98 — generation up to 16 A per phase, single-phase or three-phase, "fit-and-inform" registration',
      'G99 — anything above 16 A per phase requires a full DNO application before commissioning',
      "BS 7671 alone — DNO standards do not apply on the consumer's side of the cut-out",
    ],
    correctIndex: 1,
    explanation:
      'ENA Engineering Recommendation G98 covers single Type-Tested generators up to and including 16 A per phase (~3.68 kW single-phase, ~11 kW three-phase) and is the "fit-and-inform" route — the installer notifies the DNO within 28 days. G99 covers everything above 16 A per phase or non-Type-Tested products and requires a pre-commissioning DNO application and acceptance. G83 was the predecessor to G98 and has been withdrawn. BS 7671 governs the installation side; G98/G99 governs the grid-interface protection settings and the registration process.',
  },
  {
    id: 'm5s5-lom-detection',
    question:
      'Which of the following is the MOST common loss-of-mains (LoM) detection method built into modern G98/G99 inverters?',
    options: [
      'A physical contactor on the grid side that opens whenever the meter stops registering import',
      'Vector shift / ROCOF combined with voltage and frequency stage protection per BS EN 50549',
      'A 30 mA RCD on the AC output — the RCD trips the moment grid voltage disappears',
      'Manual disconnection by the customer pressing an emergency stop',
    ],
    correctIndex: 1,
    explanation:
      'Modern compliant inverters use a combination of passive and active LoM detection: voltage stage protection (under/over voltage), frequency stage protection (under/over frequency), Rate of Change of Frequency (ROCOF) and Vector Shift. BS EN 50549-1 (single-phase up to 16 A) and BS EN 50549-2 (three-phase) define the protection set-points and trip times. Older "Loss of Mains" methods (G59) used aggressive ROCOF settings that caused nuisance tripping during system disturbances; newer G98/G99 settings use less sensitive ROCOF combined with vector shift to balance security with sensitivity.',
  },
  {
    id: 'm5s5-551-7-1-d',
    question:
      'A4:2026 redrafts Reg 551.7.1 with new indents. What does the new indent (d) prohibit?',
    options: [
      'Connection of a generator to a TT system without a separate earth electrode',
      'Use of a Type AC RCD anywhere on a circuit fed by an inverter',
      'The connection of a source (e.g. PV inverter, battery, V2G) to the LOAD SIDE of an RCD',
      'Parallel operation of two generators on the same busbar',
    ],
    correctIndex: 2,
    explanation:
      "Reg 551.7.1 (A4:2026) has a new indent (d) prohibiting the connection of a source to the load side of an RCD. The reason: the RCD is calibrated for unidirectional current flow (line and neutral measured by the toroidal coil); a source on the load side can produce balanced currents that bypass the RCD's detection envelope or, worse, can re-energise the load side after an upstream RCD trip — defeating the protective measure. New indent (c) requires a suitable protective device where energy flow is bidirectional. These two changes together formalise prosumer / PV / battery / V2G best practice into the body of the regs.",
  },
  {
    id: 'm5s5-bidirectional',
    question:
      'A consumer unit installed in 2018 has Type AC RCDs and standard "load-only" busbar layout. The customer now adds a 6 kWh battery storage system. Which BS 7671 reg drives a re-evaluation of equipment selection?',
    options: [
      'Reg 314.1 — division of the installation',
      'Reg 530.3.201 — equipment selection must consider the direction of energy flow',
      'Reg 411.3.4 — luminaire RCD additional protection',
      'Reg 522.6.204 — protection against mechanical damage',
    ],
    correctIndex: 1,
    explanation:
      'Reg 530.3.201 (introduced into the body of the regs alongside Section 826 prosumer requirements) makes it explicit that equipment selection — protective devices, switchgear, metering — must consider the direction of energy flow. A board originally designed for unidirectional load supply may not be safe when a source is added: RCDs may need re-rating, MCBs may need bidirectional ratings (some MCBs are directional), and the cert needs to record the topology. The trigger for the assessment is the addition of any source — PV, battery, V2G — that turns the installation into a prosumer electrical installation (PEI).',
  },
  {
    id: 'm5s5-v2g-pei',
    question:
      'A customer fits a V2G-capable EV charge point so the EV battery can export to the home and grid. From a BS 7671 / Section 826 perspective, what has the installation become?',
    options: [
      "Still a consumer's installation — the EV is mobile equipment and is excluded from Section 826",
      "A prosumer's electrical installation (PEI) — at least intermittently it has a source connected to the load side of the supply, even though the source (the EV) is mobile",
      'A microgeneration site requiring a G99 application regardless of size',
      'No change — the EV is the load, not a source',
    ],
    correctIndex: 1,
    explanation:
      'V2G turns the EV into an embedded source whenever it is plugged in and exporting. Section 826 (prosumer requirements, expanded in A4:2026) recognises that PEIs include intermittent and bidirectional sources. The installation must therefore meet 551.7 parallel-source rules, 530.3.201 bidirectional consideration, and the G98/G99 connection process — even though the source is physically inside the vehicle. The DNO sees power flowing back out through the meter and must be notified the same way as for a fixed PV array.',
  },
  {
    id: 'm5s5-voltage-rise',
    question:
      'During commissioning of a 4 kW PV inverter, terminal voltage at the inverter AC output is measured at 248 V while exporting at full power. The DNO standard nominal is 230 V +10% / -6%. What is the immediate concern?',
    options: [
      'No concern — 248 V is within the +10% statutory limit (253 V)',
      'Voltage rise from inverter to DNO is approaching the 253 V ceiling. Headroom is small; if the DNO supply ever sits at the upper end of its band the inverter will trip on Stage 1 over-voltage and shed export. Investigate cable size and routing to reduce voltage rise before signing off',
      'The inverter is faulty — terminal voltage should always read 230 V at the inverter',
      'The customer is consuming too much; voltage rise is irrelevant when load is high',
    ],
    correctIndex: 1,
    explanation:
      'A grid-tied inverter raises the local terminal voltage during export — current flowing back through cable impedance produces an IR rise above the DNO supply voltage. BS EN 50160 + the DNO standard nominal hold the customer terminal voltage within 230 V +10% / -6% (i.e. 216 V — 253 V). 248 V leaves only 5 V of headroom; on a day when the DNO supply sits high (winter morning, lightly loaded network), the inverter will repeatedly trip on Stage 1 over-voltage protection and shed export. The fix is design-side: increase AC export cable size to reduce IR rise, or relocate the inverter closer to the cut-out. G99 applications include explicit voltage-rise calculations for exactly this reason.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Why is anti-islanding protection a safety-critical requirement, not just a power-quality nicety?',
    options: [
      "To prevent the inverter exporting too much power and overloading the customer's supply fuse",
      'To protect repair crews working on a "dead" section of network from a hidden energised feeder, prevent voltage/frequency drift outside spec, and stop equipment damage when supplies are restored out-of-phase',
      "To stop the customer's meter spinning backwards",
      'To comply with Building Regulations Part L energy targets',
    ],
    correctAnswer: 1,
    explanation:
      "Anti-islanding has three primary safety drivers: (1) repair-crew protection — the DNO assumes a disconnected feeder is dead, an island energised by an embedded generator turns it back into a fatal-shock hazard; (2) voltage and frequency control — an island's voltage and frequency drift away from grid nominal because they are no longer regulated by the bulk system, damaging connected equipment; (3) re-closure damage — when the DNO restores the feeder, the island is almost certainly out of phase, producing massive transient currents that damage the inverter, customer equipment and the DNO's switchgear.",
  },
  {
    id: 2,
    question:
      'Which document is the binding registration / acceptance route for a 7 kWp single-phase PV install with a 6 kW inverter on a 100 A single-phase service?',
    options: [
      'BS 7671 alone — Section 712 covers all PV requirements',
      'Building Regulations Part P only',
      'ENA G99 — single inverter > 16 A per phase requires DNO application before commissioning, regardless of import-limit settings',
      'No application needed — the customer can self-certify under Microgeneration Certification Scheme (MCS) rules alone',
    ],
    correctAnswer: 2,
    explanation:
      'A 6 kW single-phase inverter draws ~26 A at full export — above the 16 A per phase G98 ceiling. That puts it firmly in G99 territory, which requires a formal application to the DNO and acceptance BEFORE the system is commissioned and energised. MCS certification covers product quality and renewable-energy scheme registration, not network connection. BS 7671 governs the installation side; G99 governs the grid interface and the connection process.',
  },
  {
    id: 3,
    question:
      'A new battery storage system is being added to an existing domestic CU. The CU has a single 30 mA Type AC RCD covering all final circuits. What is the WRONG topology under A4:2026?',
    options: [
      'Battery inverter wired to a dedicated way upstream of the existing RCD',
      'Battery inverter connected to the load side of the existing 30 mA Type AC RCD',
      'Battery inverter wired to its own dedicated RCBO of the correct type',
      'Battery inverter wired into a new PEI distribution board with bidirectional protection',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 551.7.1 (A4:2026 indent (d)) prohibits connecting a source to the load side of an RCD. Connecting the battery inverter on the load side of the existing RCD means: (a) the RCD's coil sees source-driven currents it was never calibrated to interpret, (b) the source can re-energise the load side after a trip, and (c) the Type AC RCD is in any case unsuitable for inverter-driven smooth/pulsating DC residual currents. The correct topology: dedicated RCBO of the correct type (often Type A or Type B per the inverter manufacturer's installation manual), or a dedicated PEI distribution board with bidirectional protection per Reg 530.3.201.",
  },
  {
    id: 4,
    question: 'What is the role of BS 7671 versus G98/G99 in delivering anti-islanding protection?',
    options: [
      'BS 7671 sets the trip times and protection settings; G98/G99 sets the cable sizes',
      'G98/G99 governs the grid-interface protection settings, type-test and registration; BS 7671 governs the installation-side requirements (parallel-source rules per 551.7, bidirectional consideration per 530.3.201, prosumer requirements per Section 826)',
      'They are identical documents — G98 is just BS 7671 Section 712 in another format',
      'G98/G99 only applies to commercial generators above 100 kW',
    ],
    correctAnswer: 1,
    explanation:
      "They are complementary, not duplicate. ENA G98 / G99 are DNO connection standards: they define the grid-interface protection set-points (V/Hz stages, ROCOF, vector shift), the inverter type-test that proves anti-islanding compliance (BS EN 50549), and the registration / acceptance process. BS 7671 handles the customer-side wiring: how the source is connected to the installation, what protective devices are needed, how the prosumer installation is laid out and certified. The inverter manufacturer's G98/G99 type-test certificate is the evidence both you and the DNO rely on.",
  },
  {
    id: 5,
    question: 'Which of the following is a passive LoM (Loss of Mains) detection technique?',
    options: [
      'Vector shift — detects the sudden phase jump in voltage when the local generator stops being held by the bulk grid',
      'Active frequency drift — the inverter intentionally tries to drift the frequency and observes whether the grid resists',
      'Impedance injection — the inverter periodically injects a small disturbance and measures the response',
      'Inter-tripping — a hardwired trip signal from the DNO substation',
    ],
    correctAnswer: 0,
    explanation:
      "Passive techniques observe the grid without disturbing it: under/over voltage stages, under/over frequency stages, vector shift (sudden phase jump), and ROCOF (Rate of Change of Frequency). Active techniques deliberately disturb the inverter's output and observe the grid's response: active frequency drift, impedance injection, Sandia Frequency Shift. Inter-tripping is a network-level method using a hardwired or comms-based signal from a DNO substation — used for larger G99 installs, not standard domestic kit. BS EN 50549 defines the protection set requirements; the inverter manufacturer chooses the algorithm mix.",
  },
  {
    id: 6,
    question:
      'A V2G EV charge point is added to an existing single-phase domestic supply. Which of the following is FALSE?',
    options: [
      'Section 826 prosumer requirements now apply because the EV is a source when exporting',
      'Reg 551.7.1 parallel-source rules apply, including the new (c) and (d) indents',
      'G98 or G99 applies — V2G export above 16 A per phase needs a G99 application',
      "BS 7671 does not apply because the EV is mobile equipment outside the consumer's installation",
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 absolutely applies. The V2G charge point is a fixed part of the installation, the cabling and CU connection are fixed, and the moment the EV exports the installation behaves as a PEI. Section 826 prosumer requirements, Reg 551.7 parallel-source rules, Reg 530.3.201 bidirectional consideration and G98/G99 connection registration all apply. The EV being mobile does not exempt the fixed wiring, the export topology or the protective devices from BS 7671.',
  },
  {
    id: 7,
    question: 'Reg 551.7.1 indent (c) is also new in A4:2026. What does it require?',
    options: [
      'A 30 mA RCD upstream of every PV inverter',
      'A suitable protective device where the direction of energy flow is bidirectional',
      'An emergency-stop button accessible from outside the property',
      'A documented risk assessment by a chartered electrical engineer',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 551.7.1 indent (c) (A4:2026) requires a suitable protective device wherever energy flow is bidirectional. "Suitable" means the device is rated for current flow in both directions and its protection algorithm (overcurrent, residual current, arc fault) remains valid regardless of direction. Together with indent (d) (no source on the load side of an RCD) this formalises into the regs what was previously just inverter-manufacturer best practice. Reg 530.3.201 sits behind both: the broader requirement to consider direction during equipment selection.',
  },
  {
    id: 8,
    question:
      'A G98 inverter loses the grid (DNO opens the upstream feeder). According to BS EN 50549-1, within what order-of-magnitude time must it stop exporting?',
    options: [
      'Within 5 minutes — the inverter logs and reports the event',
      'Within a fraction of a second to a few seconds depending on the detection mode (V/Hz stages typically 0.2 s — 1.5 s; ROCOF / vector shift around 0.5 s; LoM "must trip within" requirements per BS EN 50549-1)',
      'Within 30 minutes — a re-connect timer governs the next attempt',
      'There is no time limit — the inverter simply waits for the grid to come back',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50549-1 (single-phase up to 16 A) sets specific maximum trip times for each protection stage: voltage stages (Stage 1, Stage 2) operate within fractions of a second to a few seconds depending on excursion size; frequency stages similarly; ROCOF and vector shift trip in around 0.5 s. The exact set-points are defined per country and per DNO area — the G98 / G99 documents reference BS EN 50549 settings tables. Reconnection is governed separately: typically a 60-second observation period of stable grid before the inverter is allowed to re-export, to avoid rapid trip-reconnect cycling during disturbances.',
  },
];

const faqItems = [
  {
    question: 'Do I need to worry about anti-islanding for a small 1.5 kW PV system?',
    answer:
      "Yes — every grid-connected inverter must be Type-Tested against G98 (≤16 A per phase) or G99 (above 16 A per phase) and ship with anti-islanding protection per BS EN 50549. The principle is independent of size; the registration route differs (G98 fit-and-inform versus G99 pre-application). What the installer must verify is that (a) the inverter's G98/G99 declaration is on file with the DNO notification, and (b) the installation-side wiring complies with Reg 551.7, Reg 530.3.201 and Section 826.",
  },
  {
    question: 'What is the practical difference between G98 and G99?',
    answer:
      'G98 is the "fit and inform" route for Type-Tested products up to 16 A per phase: the installer commissions the system and notifies the DNO within 28 days using the G98 form. G99 is the "apply and accept" route for everything above 16 A per phase or for non-Type-Tested kit: the installer submits a G99 application with technical data, single-line diagram and protection settings BEFORE commissioning, and waits for DNO acceptance. Both routes require the inverter to comply with BS EN 50549 protection settings.',
  },
  {
    question: 'Why does Reg 551.7.1(d) prohibit connecting a source to the load side of an RCD?',
    answer:
      "Two reasons. First, the RCD's toroidal coil measures the imbalance between line and neutral conductors; a source on the load side can produce currents that flow back through the protected conductors in ways that the RCD was never calibrated to interpret, leaving residual fault paths undetected. Second — and arguably more important — after the RCD trips, the source can re-energise the load side from below the device, defeating the entire purpose of the trip and presenting a live circuit to anyone working on it. The fix: connect every source to its own dedicated protective device, on a topology that respects bidirectional energy flow.",
  },
  {
    question: "Is the inverter's built-in anti-islanding sufficient on its own?",
    answer:
      'For G98 systems the answer is yes provided the inverter ships with a valid G98 type-test certificate against BS EN 50549-1 and the protection settings are not over-ridden during commissioning. For G99 systems the DNO may require additional protection — typically loss-of-mains G59-style relays or inter-tripping — depending on the network impact assessment. The application response from the DNO will state any extra protection required; do not assume "the inverter handles it" until the G99 acceptance letter confirms it.',
  },
  {
    question: 'What is ROCOF and why is it sometimes called a "nuisance tripping" technique?',
    answer:
      'ROCOF = Rate of Change of Frequency — measured in Hz/s. The principle: when the bulk grid is connected, frequency moves slowly (the system inertia is huge); when an island forms, frequency moves quickly because the local generator alone cannot hold it. Older G59 settings used very sensitive ROCOF (0.125 Hz/s) which tripped during ordinary system disturbances such as large generator trips elsewhere on the network. Newer G98/G99 settings use less sensitive ROCOF (0.5 Hz/s or higher) plus vector shift, balancing security against sensitivity. The shift was driven by network operators reporting cascading inverter trips during single-event disturbances, ironically making the network less stable.',
  },
  {
    question: 'How does battery storage anti-islanding differ from PV anti-islanding?',
    answer:
      'Mechanically it is the same — the battery inverter follows the same BS EN 50549 protection set as a PV inverter and ships with a G98 or G99 type-test. The complication is that a battery inverter often has an islanded-mode capability (UPS / EPS — Emergency Power Supply) where, by design, it forms a local island when the grid is lost so the customer can keep running. The product handles this by physically disconnecting from the grid (changeover contactor, ATS) before forming the island; the grid-side terminals see no inverter output during the islanded period. Without that physical separation, the install fails Reg 551.7 and the G98/G99 type-test.',
  },
  {
    question: "Does V2G change the EV charge point's anti-islanding requirement?",
    answer:
      'Yes — the moment the EV can export, the charge point moves from being a load to being a source, and Section 551.7, Reg 530.3.201 and Section 826 all engage. The V2G charge point itself must hold a G98 or G99 type-test (per its export rating) and the installation must respect bidirectional energy flow. Domestic single-phase V2G at 7 kW export = ~30 A — that is above the G98 ceiling, so a G99 application is required. Three-phase V2G at 11 kW = ~16 A per phase — borderline G98/G99 depending on the precise rating; consult the manufacturer and the DNO.',
  },
  {
    question: 'How does Section 826 (prosumer) interact with Section 712 (PV)?',
    answer:
      'Section 712 is the established PV-specific section: DC-side requirements (string voltage, DC isolators, surge protection), AC-side requirements (Reg 712.411 protection against electric shock), labelling. Section 826 (expanded in A4:2026) is the broader prosumer section covering any installation with embedded sources — PV, battery, V2G, CHP, micro-wind. Where the two overlap (a PV install), Section 712 governs the PV-specific elements and Section 826 governs the prosumer-installation-as-a-whole. The cert front sheet now records the system as a PEI (prosumer electrical installation) regardless of which source technology is in use.',
  },
  {
    question: 'What evidence does the inspector look for that anti-islanding is in place?',
    answer:
      "On-site: (1) the inverter's manufacturer declaration / G98 or G99 type-test certificate (BS EN 50549) — usually a paper insert in the inverter box, often photographed and attached to the cert; (2) the commissioning report showing the protection settings as left at the type-tested defaults (any de-rate or override invalidates the type-test); (3) for G99 systems, the DNO acceptance letter listing any extra protection required and confirming it is fitted; (4) on the cert: PEI declared, Section 826 boxes ticked, single-line diagram showing the source(s), protective devices and direction of energy flow.",
  },
];

const BS7671Module5Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Grid Interaction & Anti-Islanding Protection | BS 7671:2018+A4:2026 | Module 5.5',
    description:
      'How BS 7671:2018+A4:2026 and ENA G98/G99 work together on PV, battery storage and V2G — Reg 551.7.1 (new indents (c) and (d)), Reg 530.3.201, Section 826 prosumer requirements, BS EN 50549 LoM detection.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Updated for A4:2026"
            title="Grid interaction and anti-islanding protection"
            description="How embedded sources — PV, battery storage and V2G — must connect, protect and disconnect from the LV network. Reg 551.7.1's new indents (c) and (d), Reg 530.3.201 bidirectional consideration, Section 826 prosumer requirements and how BS 7671 dovetails with ENA G98 / G99."
            actions={
              <>
                <RegBadge>551.7.1</RegBadge>
                <RegBadge>530.3.201</RegBadge>
                <RegBadge>712.411</RegBadge>
                <AmendmentBadge regs={['551.7.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Anti-islanding stops an embedded generator from energising a portion of the LV network that the DNO has just disconnected — protecting repair crews, holding voltage / frequency in spec and preventing out-of-phase reclosure damage.',
              'BS 7671 governs the customer-side topology (Section 551.7 parallel sources, Reg 530.3.201 bidirectional, Section 826 prosumer); ENA G98 / G99 governs the grid-interface protection settings, BS EN 50549 type-test and the registration route.',
              'A4:2026 redrafts Reg 551.7.1 with two new indents — (c) requires a suitable protective device where energy flow is bidirectional, (d) prohibits connection of a source to the load side of an RCD.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define islanding, explain the three safety drivers (repair-crew safety, voltage / frequency control, out-of-phase reclosure damage) and describe the protective response.',
              'Distinguish ENA G98 (≤16 A per phase, fit-and-inform) from G99 (above 16 A per phase, apply-and-accept) and identify which applies for a given inverter rating.',
              'Apply Reg 551.7.1 (parallel sources) — including the new A4:2026 indents (c) bidirectional protection and (d) source-on-load-side-of-RCD prohibition.',
              'Apply Reg 530.3.201 (equipment selection must consider direction of energy flow) when adding a source to an existing unidirectional installation.',
              'Identify common Loss-of-Mains (LoM) detection algorithms — voltage / frequency stages, ROCOF, vector shift — and the BS EN 50549 framework they sit inside.',
              'Treat PV, battery storage and V2G consistently as prosumer installations under Section 826, including the cert-form changes that flow from declaring a PEI.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What is islanding and why does it matter</ContentEyebrow>

          <ConceptBlock
            title="Defining the island"
            plainEnglish="An &lsquo;island&rsquo; is a section of LV network that has been disconnected from the bulk grid but is still being energised by a customer&rsquo;s embedded generator. The grid thinks it is dead. The inverter does not."
            onSite="Picture the DNO opening the local feeder for repair. The PV inverter on a customer&rsquo;s roof carries on exporting because it still sees voltage on its terminals (its own output, returning via the customer&rsquo;s neutral and earthing). That section of cable, the transformer secondary, and any neighbour&rsquo;s installation downstream of the open point are now an unintended live island."
          >
            <p>
              The condition is called &ldquo;loss of mains&rdquo; (LoM) from the inverter&rsquo;s
              point of view and &ldquo;islanding&rdquo; from the network&rsquo;s point of view. Both
              names describe the same event: the embedded source has lost its synchronisation
              reference but has not yet detected that and stopped exporting. Anti-islanding
              protection is the inverter feature that detects LoM within a defined time window (per
              BS EN 50549) and disconnects the inverter from the grid before any of the hazards
              below have time to develop.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <ConceptBlock
            title="The three safety drivers"
            plainEnglish="Anti-islanding is not a power-quality nicety — it is a hard safety requirement with three distinct hazard pathways."
            onSite="(1) Repair-crew shock. The DNO assumes a disconnected feeder is dead and instructs work without local earthing on the assumption. An island re-energises that feeder. (2) Voltage / frequency drift. An island has no bulk-grid governor; voltage and frequency wander away from nominal until customer equipment is damaged. (3) Out-of-phase reclosure. When the DNO closes the upstream switch to restore the feeder, the island is almost certainly out of phase with the bulk grid. The reclosure shorts the two systems together via the inverter, producing transient currents that destroy the inverter, customer equipment and the DNO&rsquo;s switchgear."
          >
            <p>
              Of the three, repair-crew safety is the headline driver. The other two are equipment
              and continuity-of-supply concerns; they motivate the DNO and the inverter
              manufacturer, but it is the prospect of a fatal shock to a network engineer working on
              what he believed to be a dead feeder that gets the regulators moving. Every BS EN
              50549 and G98 / G99 protection setting traces back to that primary risk.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The grid-interface standards — G98 and G99</ContentEyebrow>

          <ConceptBlock
            title="ENA Engineering Recommendation G98 — fit-and-inform"
            plainEnglish="G98 covers single Type-Tested generators up to 16 A per phase — single-phase or three-phase. The installer commissions the system and notifies the DNO within 28 days. No pre-application required."
            onSite="Single-phase 16 A = ~3.68 kW. Three-phase 16 A per phase = ~11 kW. Most domestic PV (3-4 kW), small battery storage (3 kW) and lower-end EV V2G falls inside G98. The notification form (G98 Form A) records the inverter make / model, kW rating, type-test reference (against BS EN 50549-1), commissioning date and installer details. Submit it with the DNO of the local network — Northern Powergrid, UKPN, SP Energy Networks etc — within 28 days."
          >
            <p>
              G98 relies entirely on the inverter being Type-Tested against BS EN 50549-1. The
              type-test verifies the protection settings (voltage, frequency, ROCOF, vector shift),
              the trip times and the reconnection logic. The DNO does not re-verify each
              installation; they trust the type-test certificate that ships with each compliant
              inverter. That is why bypassing or overriding the inverter&rsquo;s default protection
              settings during commissioning is a hard prohibition: it invalidates the type-test and
              removes the basis on which the DNO accepted the connection.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="ENA Engineering Recommendation G99 — apply-and-accept"
            plainEnglish="G99 covers everything above 16 A per phase or any non-Type-Tested generator. The installer applies to the DNO before commissioning, submits technical data and waits for acceptance."
            onSite="A 6 kW single-phase PV inverter (~26 A) is G99. A 7 kW single-phase V2G charge point (~30 A export) is G99. A commercial 50 kW PV array is G99. A site with multiple G98 inverters whose aggregate exceeds 16 A per phase is G99. The G99 application includes a single-line diagram, protection settings table, inverter type-test certificates and commissioning plan. The DNO performs a network-impact assessment and may require additional protection — extra LoM relays, inter-tripping, voltage-rise studies — before accepting the connection."
          >
            <p>
              The G99 acceptance letter is binding: any extra protection it requires must be in
              place before energising. Common requirements for medium-sized G99 installs include an
              external G59-style relay (in addition to the inverter&rsquo;s own protection), an
              external isolator accessible to the DNO, and explicit voltage-rise calculations
              showing the export will not push terminal voltage above the BS EN 50160 +10% statutory
              limit. The cert-form and the customer-handover pack must include a copy of the G99
              acceptance.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>How loss-of-mains is actually detected</ContentEyebrow>

          <ConceptBlock
            title="Passive detection — voltage and frequency stages, vector shift"
            plainEnglish="Passive techniques observe the grid without disturbing it. They look for symptoms of an island — voltage out of band, frequency out of band, sudden phase jumps — and trip when one is seen."
            onSite="Voltage stages: Stage 1 (e.g. ±10%) trips slowly (a few seconds); Stage 2 (e.g. ±15-20%) trips quickly (fractions of a second). Frequency stages: similar two-stage approach around 50 Hz. Vector shift: detects the phase jump that occurs when the grid disappears — the inverter was synchronised to the grid&rsquo;s phase, the moment the grid goes the local load impedance forces an instantaneous phase change in the inverter&rsquo;s output. Typical setting around 6° to 12°."
          >
            <p>
              Passive techniques are reliable when the island&rsquo;s load is significantly
              imbalanced from the inverter&rsquo;s output: voltage and frequency drift away quickly
              and the stages catch them. Their weakness is the &ldquo;balanced island&rdquo; case —
              where the local load happens to match the inverter&rsquo;s output exactly at the
              moment of disconnection. Voltage and frequency might stay briefly close to nominal,
              defeating the passive detector. That is why every BS EN 50549 inverter combines
              passive techniques with at least one active technique.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Active detection — ROCOF and active drift"
            plainEnglish="Active techniques deliberately disturb the inverter&rsquo;s output (just enough that customer equipment cannot tell) and observe whether the grid resists the disturbance. A real grid resists; an island does not."
            onSite="ROCOF (Rate of Change of Frequency) — measured in Hz/s. The bulk grid has huge inertia and frequency moves slowly. An island has tiny inertia and frequency moves quickly. ROCOF setting around 0.5 Hz/s catches an island within around 0.5 s. Active frequency drift — the inverter slowly walks its frequency away from 50 Hz; the bulk grid pulls it back; an island lets it run. Sandia frequency shift is a common implementation."
          >
            <p>
              The trade-off is sensitivity versus security. Sensitive settings catch islands quickly
              but can trip during ordinary network events (a large generator trips elsewhere; the
              bulk system briefly drops in frequency before recovering — a ROCOF-sensitive inverter
              sees that as an island). Cascading inverter trips during single-event disturbances
              were a real problem with G59 settings and motivated the G98 / G99 update to less
              aggressive ROCOF combined with vector shift. The inverter&rsquo;s type-test fixes the
              algorithm mix; field changes are forbidden.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.1 — Parallel-source requirements (redrafted in A4)"
            clause="Section 551.7 has additional requirements for installations where the generating set or sets may operate in parallel with other sources including systems for distribution of electricity to the public. Reg 551.7.1 has been redrafted; an indent (c) has been added which requires a suitable protective device where energy flow is bidirectional. In addition, an indent (d) has been added which prohibits the connection of a source to the load side of an RCD."
            meaning="Two new headline rules. (c) puts the duty on the designer to ensure every protective device on a circuit where the energy can flow either way is rated and selected for that bidirectional flow — not all OCPDs and not all RCDs were designed with that in mind. (d) ends a long-running debate by hard-coding into BS 7671 that you cannot connect a generator, battery or V2G charge point on the load side of an RCD: the source must sit upstream of, or have its own dedicated, protective device."
            cite="BS 7671:2018+A4:2026, Reg 551.7.1 (redrafted; in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>BS 7671 vs G98 / G99 — who governs what</ContentEyebrow>

          <ConceptBlock
            title="The split of responsibilities"
            plainEnglish="ENA G98 / G99 govern the grid-interface — what the inverter does at the boundary with the DNO. BS 7671 governs the installation-side — how the source is wired into the customer&rsquo;s installation, what protective devices feed it and how the cert documents the topology."
            onSite="Inverter type-test against BS EN 50549, voltage / frequency / ROCOF settings, the G98 form or G99 application — DNO territory, ENA recommendations. Cable from inverter to CU, isolator selection, RCD type and rating, MCB / RCBO selection, AFDD if required, labelling, EIC certification — BS 7671 territory, Section 551.7, Reg 530.3.201, Section 712, Section 826."
          >
            <p>
              The two sets of rules are independent in the sense that you can comply with one and
              fail the other. A perfectly G98-compliant inverter, wired with the wrong RCD type and
              connected on the load side of the existing CU&rsquo;s 30 mA RCD, fails BS 7671
              551.7.1(d) even though the inverter itself meets every G98 requirement. Equally, a
              correctly wired BS 7671 install of an inverter that has had its protection settings
              overridden in software fails G98 even though the wiring is perfect. The cert and the
              G98 / G99 form together evidence both halves.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 530.3.201 — equipment selection must consider direction of energy flow"
            plainEnglish="The reg formalises something that used to be installer common-sense: the moment a source is added, every protective device, switchgear item and meter on the affected circuits must be re-checked for bidirectional rating and bidirectional algorithm validity."
            onSite="A 30 mA Type AC RCD on a load-only circuit may be perfectly compliant; the same RCD on a circuit fed by a PV inverter is not — the inverter produces pulsating DC residuals that Type AC cannot detect. A unidirectional MCB rated at the prospective fault current of the consumer&rsquo;s supply may be invalidated when the fault current can also come from a battery downstream. Metering must be bidirectional or import-only with a separate export meter (G98 / G99 specifies)."
          >
            <p>
              The practical consequence: when adding any source to an existing installation, walk
              the affected circuits and re-evaluate every device on them. Often the cleanest
              solution is to fit a dedicated &ldquo;PEI distribution board&rdquo; — a separate CU in
              which all the source(s), the bidirectional protection and the prosumer metering live —
              fed from a dedicated way upstream of the existing main CU. That keeps the existing
              load-only CU unchanged and isolates the bidirectional zone to a single, clearly
              identified piece of equipment with the right protection.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Section 826 — the prosumer installation</ContentEyebrow>

          <ConceptBlock
            title="What is a PEI?"
            plainEnglish="PEI = Prosumer Electrical Installation. Any installation where the user is both a producer and a consumer of electricity — by virtue of an embedded source. PV, battery storage, V2G, micro-CHP and micro-wind all create a PEI."
            onSite="Section 826 (expanded in A4:2026) recognises that a PEI behaves differently from a load-only installation. The cert front sheet now records the system as a PEI; the schedule of inspections has prosumer-specific entries; the single-line diagram must show every source, every protective device and the direction(s) of energy flow. The installer&rsquo;s declaration includes acknowledgement that Section 551.7, Reg 530.3.201, Section 712 (PV-specific) and Section 826 (prosumer-general) all apply."
          >
            <p>
              The headline change in A4:2026 is that PEI now sits in the body of the regs as a
              first-class concept. Pre-A4 you would record PV in Section 712 and ignore the broader
              prosumer angle; A4 forces the broader framing: the installation as a whole is
              bidirectional, multi-source, and certified as such. That ripples through to cable
              management (PV strings, AC export cabling, battery DC), to labelling (every source
              must be identified on its own warning notice), and to the EICR observation codes when
              an existing PEI does not meet the current edition.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Section 712 — PV-specific (still relevant within Section 826)"
            plainEnglish="Section 712 is the PV-specific reference within BS 7671: DC-side requirements (string voltage, DC isolators, surge protection per Reg 712.443.101), AC-side protection (Reg 712.411 — protection against electric shock for the AC PV circuit), labelling and isolation."
            onSite="The relationship is that Section 826 is the prosumer-installation-level umbrella; Section 712 is the PV-specific detail that sits inside that umbrella. A pure PV install: Section 712 + Section 826 + Section 551.7. A pure battery install: Section 826 + Section 551.7 (no Section 712). A V2G install: Section 826 + Section 551.7 + Section 722 (EV charging). The cert must cite each that applies."
          >
            <p>
              Reg 712.411 specifically reaffirms that the AC side of a PV system is subject to the
              general Chapter 41 protection-against-electric-shock requirements — basic protection,
              fault protection, ADS, additional 30 mA RCD protection where required. The DC side has
              its own protection regime (no traditional ADS, since the source is the PV string
              itself; instead surge protection, double / reinforced insulation and physical
              isolation). Confusion between the two regimes is a common source of EICR observations
              on older PV installs.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            Battery storage and V2G — same principles, different applications
          </ContentEyebrow>

          <ConceptBlock
            title="Battery storage anti-islanding"
            plainEnglish="The battery inverter is functionally identical to a PV inverter from a grid-interface point of view: BS EN 50549 type-test, G98 or G99 registration, the same anti-islanding algorithms."
            onSite="The complication is islanded-mode (UPS / EPS / Emergency Power Supply). Many domestic batteries advertise that they can keep the property running during a grid outage; that is, by design, an island. The product handles it by physically disconnecting from the grid before forming the island — typically a built-in changeover contactor (ATS — Automatic Transfer Switch) opens the grid connection, then the inverter starts feeding the property in standalone mode. To the DNO, the grid-side terminals see no inverter output during the island; to the customer, the lights stay on."
          >
            <p>
              The hard requirement: the changeover must be physical (a contactor or motorised
              switch), not software. A software-only attempt to &ldquo;not export during a
              grid-outage&rdquo; fails BS 7671 Reg 551.7 and the G98 / G99 type-test, because there
              is no fail-closed guarantee that the inverter will not back-feed the dead grid. Every
              UK-compliant battery system with EPS capability ships with a built-in ATS or requires
              an external one to be wired during installation. The single-line diagram in the cert
              must show that ATS and the EPS sub-board it feeds.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="V2G EV charging — the EV becomes a source"
            plainEnglish="In V2G mode, the EV battery exports power back through the charge point. The fixed wiring becomes a PEI; the EV is the source. Section 826, Section 551.7 and Section 722 (EV charging) all apply simultaneously."
            onSite="A 7 kW single-phase V2G unit exports up to ~30 A — that is G99 territory. A three-phase 11 kW V2G unit exports ~16 A per phase — borderline G98 / G99 depending on the precise rating and the DNO&rsquo;s area policy. Either way: the fixed wiring is bidirectional, the protection must respect that (Reg 530.3.201), Reg 551.7.1 indents (c) and (d) apply, and Section 722 still requires the EV-side protective measures (Type A or Type B RCD, no PEN in the EV circuit on TN systems, etc)."
          >
            <p>
              The conceptual leap that catches installers out: the EV is mobile equipment, but the
              V2G charge point is fixed wiring, and the moment the EV plugs in and exports the FIXED
              installation behaves as a PEI. The cert must declare PEI; Section 826 applies; the G98
              / G99 registration must be filed for the V2G charge point&rsquo;s export rating.
              Treating it &ldquo;like a normal EV charger&rdquo; misses every one of those
              obligations and produces an installation that may be perfectly safe in charging mode
              but non-compliant the moment it is asked to export.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Voltage rise — the design-side gotcha</ContentEyebrow>

          <ConceptBlock
            title="Why exporting current raises terminal voltage"
            plainEnglish="An inverter that exports power into the grid pushes current back through the cable from the inverter to the cut-out. That current produces an IR voltage drop along the cable — but in the export direction, drop becomes RISE. The terminal voltage at the inverter sits ABOVE the DNO supply voltage by exactly the IR rise."
            onSite="Practical numbers: a 4 kW single-phase inverter exporting at ~17 A through 25 m of 6 mm² T&E (R ≈ 7.3 mΩ/m) gives an IR rise of roughly 3 V — usually fine. The same 17 A through 50 m of undersized 2.5 mm² (R ≈ 18 mΩ/m) gives ~15 V rise — the inverter sees 230 + 15 = 245 V, within trip limits but leaving little headroom. A 6 kW inverter through that same undersized run is over the limit and will repeatedly trip on Stage 1 over-voltage."
          >
            <p>
              The fix is always cable size — Reg 525 and Reg 433 give the load-side numbers; the
              prosumer / export side requires the same voltage-rise check but in reverse. G99
              applications mandate an explicit voltage-rise calculation as part of the technical
              data submitted to the DNO. G98 fit-and-inform leaves the calculation to the
              installer&rsquo;s good practice — but the consequence (repeated nuisance
              trip-and-reconnect cycles, customer complaints, the DNO eventually flagging the site
              for excessive harmonic / voltage-quality contribution) is the installer&rsquo;s to
              deal with after the event.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Connecting a source to the load side of an RCD"
            whatHappens="A PV inverter or battery inverter is wired into a spare way on an existing CU that sits on the load side of a 30 mA Type AC RCD. The RCD is now downstream of a source it was never designed to handle: it sees inverter-driven pulsating DC residuals it cannot detect, and after any trip the source can re-energise the load side from below the device, defeating the protective measure."
            doInstead="Reg 551.7.1(d) (A4:2026) prohibits this directly. Either fit the source on a dedicated way upstream of the load-only RCD (with its own correctly-typed protective device), or — better — fit a dedicated PEI distribution board with bidirectional protection that handles the source and any prosumer-side circuits. The existing load-only CU stays as it was. The single-line diagram must clearly show the topology."
          />

          <CommonMistake
            title="Reusing Type AC RCDs on a circuit that is now fed by an inverter"
            whatHappens="An installer adds a 4 kW PV inverter to an existing CU and tees the AC export into a spare 32 A way protected by the existing Type AC 30 mA RCD. The inverter-driven pulsating DC residual on the AC export is invisible to Type AC. A subsequent earth fault on the AC side fails to trip the RCD; the protective measure is defeated; the inverter keeps exporting into the fault."
            doInstead="Reg 530.3.201 requires re-evaluation of every device when direction of energy flow changes. Replace Type AC with at least Type A on any inverter-fed circuit, and consult the inverter manufacturer&rsquo;s installation manual for the required RCD type — many require Type A with additional 6 mA DC fault detection (often integrated into the inverter), some require Type B."
          />

          <CommonMistake
            title="Treating a software ‘do-not-export-during-outage’ flag as anti-islanding"
            whatHappens="A battery storage system claims islanded-mode capability via a software setting that &lsquo;disables export when grid voltage is lost&rsquo;. There is no physical changeover contactor. During a grid outage the inverter relies entirely on its own software to detect LoM and refuse to export back to the grid. A software fault, a configuration drift or a firmware update can defeat that — leaving an unintended island with no fail-closed guarantee."
            doInstead="EPS / island-mode capability requires a physical changeover (ATS) that disconnects the grid terminals before the inverter forms the island. Confirm the changeover is physical (contactor / motorised switch) and shown on the single-line diagram. If the product has only software islanding, fit it as a non-EPS battery (grid-following only) and accept that the property goes dark during an outage — that is the safe default. Reg 551.7 and the G98 / G99 type-test demand the physical separation, not a software promise."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="3.6 kW PV install on a 17th-edition split-load CU"
            situation="Customer wants to add a 3.6 kW single-phase PV system (G98 territory). The existing CU is a 17th-edition split-load — main switch + 30 mA Type AC RCD on the &lsquo;protected&rsquo; bus, no RCD on the &lsquo;non-protected&rsquo; bus. The proposed topology: tee the inverter AC output into a spare 32 A way on the protected bus, downstream of the 30 mA Type AC RCD."
            whatToDo="Reject the proposed topology. Reg 551.7.1(d) (A4:2026) prohibits connecting the source to the load side of an RCD. Reg 530.3.201 requires the protective device to be suitable for bidirectional flow — Type AC is invalid for an inverter-fed circuit anyway. Correct topology: fit a dedicated PEI distribution board upstream of the existing CU. The PEI board contains a Type A (or Type B per the inverter manual) RCBO for the inverter output, the AC export isolator (G98 requirement), and bidirectional metering. The existing CU keeps its load-only role unchanged. Submit the G98 Form A within 28 days of commissioning."
            whyItMatters="The cert for a non-compliant PEI install is documented evidence of the breach. Insurers, building-control sign-offs and DNO audits all reach for the cert when something goes wrong. A C2 observation on a future EICR is the lighter consequence; if a network engineer is hurt working on what should have been a dead feeder, the topology decisions on the original cert become disclosable evidence in a fatal-accident inquiry."
          />

          <Scenario
            title="V2G EV charge point added to a domestic single-phase supply"
            situation="Customer has a single-phase 100 A supply, an existing 7 kW unidirectional EV charger, and now wants to upgrade to a 7 kW V2G-capable unit so the EV battery can export to the home (and grid). The existing EV-charger circuit: dedicated way at the CU, Type A 30 mA RCBO, no PEN in the EV circuit (TN-S split per Reg 722.312.2.1 / Section 722)."
            whatToDo="Treat the upgrade as a new PEI install, not an EV-charger swap. The fixed wiring becomes a prosumer installation the moment the V2G unit is energised. (1) G99 application — 7 kW single-phase export ~30 A, well above the 16 A G98 ceiling. Submit a G99 application to the local DNO; do not commission until the acceptance letter arrives. (2) Update the cert to declare PEI per Section 826; record the V2G unit as the source. (3) Re-check the existing RCBO under Reg 530.3.201 — Type A is generally acceptable for V2G provided the unit handles smooth DC residual itself (most do, per BS EN 61851), but confirm against the V2G manufacturer&rsquo;s installation manual. (4) Section 551.7.1(c) / (d) — confirm there is no source-on-load-side-of-RCD topology and that the bidirectional protective device is suitable. (5) Single-line diagram must show the V2G unit, the EV as a source, the bidirectional flow direction and the changeover (if any) for islanded-home-supply mode."
            whyItMatters="V2G is the case study where &lsquo;the EV is mobile, so BS 7671 doesn&rsquo;t apply&rsquo; misconception causes the most damage. The fixed wiring absolutely is BS 7671 territory, the moment-of-export is the moment the install is a PEI, and treating the upgrade as a like-for-like EV-charger swap skips the G99 application, the Section 826 declaration, the Reg 551.7.1 review and the cert-front-sheet PEI tick. Each one is an EICR observation in its own right; together they are an unambiguous failure of the duty under EAWR 1989 to take such steps as may be necessary."
          />

          <SectionRule />

          <ContentEyebrow>Designer&rsquo;s quick reference</ContentEyebrow>

          <ConceptBlock
            title="The PEI install checklist"
            plainEnglish="A four-step sanity check for any installation that has a source — PV, battery, V2G — added to or designed into it."
            onSite="(1) G98 or G99? Inverter rating per phase &gt; 16 A or aggregate &gt; 16 A or non-Type-Tested = G99 application before commissioning. Otherwise G98 fit-and-inform within 28 days. (2) Topology — Reg 551.7.1(d): no source on the load side of an RCD. Reg 551.7.1(c): bidirectional protective device. Reg 530.3.201: re-evaluate every device on affected circuits for bidirectional rating and algorithm validity. (3) RCD type per the inverter manufacturer&rsquo;s installation manual — Type AC is essentially never acceptable on an inverter-fed circuit; default to Type A and confirm against the manual. (4) Cert — declare PEI per Section 826; cite Section 712 (if PV) or Section 722 (if EV / V2G) as applicable; attach single-line diagram showing source(s), protection and direction of energy flow."
          >
            <p>
              The four-step is also the EICR check: walking an existing PEI, the inspector looks for
              evidence of each step. Missing G98 / G99 evidence, source-on-load-side topology, wrong
              RCD type, missing PEI declaration on the cert — each is an observation in its own
              right. Most existing PEIs designed pre-A4 will have at least one of these flagged on
              the next periodic inspection; the inspector&rsquo;s code (C2 vs C3) depends on whether
              the issue presents an actual hazard or just a departure from the current edition.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Anti-islanding stops an embedded generator from energising a portion of the LV network that the DNO has just disconnected — a hard safety requirement driven by repair-crew shock risk, voltage / frequency drift and out-of-phase reclosure damage.',
              'ENA G98 covers ≤16 A per phase Type-Tested generators (fit-and-inform within 28 days); G99 covers > 16 A per phase or non-Type-Tested kit (apply-and-accept before commissioning). Both require BS EN 50549 type-test.',
              'Reg 551.7.1 (redrafted in A4:2026): new indent (c) requires a suitable protective device where energy flow is bidirectional; new indent (d) prohibits connection of a source to the load side of an RCD.',
              'Reg 530.3.201 requires equipment selection to consider the direction of energy flow — every protective device on a circuit affected by a source must be re-evaluated for bidirectional rating and algorithm validity.',
              'Section 826 (expanded in A4:2026) recognises PEI (prosumer electrical installation) as a first-class concept covering PV, battery, V2G, micro-CHP and micro-wind. Section 712 (PV-specific) and Section 722 (EV / V2G) sit inside that umbrella.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5-section-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.6 Environmental protection (IP/IK ratings)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module5Section5;
