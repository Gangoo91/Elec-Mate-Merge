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
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';
import { videos } from '@/data/study-centre/video-library';

const inlineChecks = [
  {
    id: 'm4s7-prosumer-meaning',
    question: "What does 'prosumer' mean in the BS 7671 context (Reg 826 / GN3 'PEIs')?",
    options: [
      'A professional consumer of premium electrical products',
      'A user whose electrical installation BOTH consumes electricity from the grid AND produces / exports electricity to the grid (or to local energy storage) — typically via solar PV, wind, battery storage, or EV vehicle-to-grid',
      'Any installation with three-phase supply',
      'A commercial customer on a half-hourly tariff',
    ],
    correctIndex: 1,
    explanation:
      "Prosumer = producer + consumer. In BS 7671 the term covers any electrical installation where energy can flow in BOTH directions: from the grid into the installation (consumption, traditional) AND from the installation back to the grid or to local storage (production / export). Common examples: domestic solar PV with battery, commercial PV with on-site loads, EV vehicle-to-grid. GN3 abbreviates 'Prosumer's Electrical Installations' as PEIs. The bidirectional energy flow changes the protection design fundamentally.",
  },
  {
    id: 'm4s7-419-conditions',
    question:
      'Reg 419 (new in A4:2026) covers situations where automatic disconnection is NOT FEASIBLE. Which of the following triggers it?',
    options: [
      'Any circuit feeding sensitive electronics',
      'Either (a) electronic equipment with limited short-circuit current is installed, or (b) the required disconnection times cannot be achieved by a protective device — Reg 419.1 lists these specific cases',
      'Only EV charging circuits',
      'Any TT system',
    ],
    correctIndex: 1,
    explanation:
      'Reg 419.1 lists two scenarios where ADS may not be feasible: (a) electronic equipment with limited short-circuit current — typical of inverter-fed circuits where the inverter cannot deliver enough fault current to operate an MCB/RCD in the required time; (b) the required disconnection times cannot be achieved by a protective device — typical of long inverter-fed feeders or grid-form generators with output current limits. The new A4 Reg 419 group provides the alternative protective measures for these cases.',
  },
  {
    id: 'm4s7-419-2-voltage',
    question:
      'Reg 419.2 sets a voltage limit for installations with power electronic converters where ADS is not feasible. What does the source voltage need to be reduced to?',
    options: [
      '230 V AC',
      '50 V AC / 120 V DC ripple-free — i.e. extra-low voltage band I — within a defined time',
      '110 V AC',
      'No voltage limit applies',
    ],
    correctIndex: 1,
    explanation:
      'Reg 419.2: where automatic disconnection is not feasible and Up > 50 V AC / 120 V DC, the output voltage of the source shall be reduced to within band I (≤ 50 V AC or ≤ 120 V DC ripple-free) within a specified time. The principle is the same protective intent as ADS — limit the touch voltage to a level where a fault is no longer dangerous — but achieved by inverter voltage reduction rather than disconnection. This is the alternative-protective-measure route for inverter-fed systems.',
  },
  {
    id: 'm4s7-bidirectional-ocpd',
    question:
      'On the DC side of a PV array, what does BS 7671 require of the overcurrent protective devices?',
    options: [
      'Standard unidirectional MCBs are sufficient',
      'Devices shall be BIDIRECTIONAL — they must provide overcurrent protection for currents flowing in either direction, because PV strings can deliver fault current FROM the panels and battery storage on a hybrid system can deliver fault current TOWARD the panels',
      'Only fuses are permitted',
      'No overcurrent protection is required on DC',
    ],
    correctIndex: 1,
    explanation:
      "BS 7671 / Section 712 requires bidirectional OCPDs on the DC side of PV arrays. The reason: a fault between two PV strings can be fed BOTH from the array (via the parallel string under fault) AND from a battery (in a hybrid system charging from the array). A unidirectional device would clear correctly in one direction but fail in the other. Look for the ↔ symbol or 'bidirectional' marking on the device data sheet. Reg 530.3.201 makes the bidirectional consideration mandatory in equipment selection.",
  },
  {
    id: 'm4s7-pce-rcd-type',
    question:
      "A power conversion equipment (PCE — typically the inverter / charger / rectifier) does NOT provide simple separation between its AC and DC sides, and the manufacturer hasn't stated Type B is unnecessary. What RCD type is required?",
    options: [
      'Type AC',
      'Type A',
      'Type B per BS EN 62423 or BS EN 60947-2 — required because smooth DC residual currents can be produced and would blind a Type A device',
      'No RCD needed',
    ],
    correctIndex: 2,
    explanation:
      "When the PCE provides at least 'simple separation' between AC and DC sides (typically a transformer or galvanic-isolation barrier within the inverter), Type A upstream is sufficient. When it doesn't — common on transformerless inverters used in domestic PV / battery storage — smooth DC residual current can leak from the DC side onto the AC side during a fault. Type A and Type AC RCDs are blinded by smooth DC residual; only Type B reliably trips. The manufacturer's installation manual is the binding spec — read it before specifying.",
  },
  {
    id: 'm4s7-551-7-1d',
    question:
      'Reg 551.7.1 has been redrafted in recent amendments. What does the new indent (d) prohibit?',
    options: [
      'Connecting a generator to the line side of an RCD',
      "Connecting a source (e.g. a generator, inverter, battery) to the LOAD SIDE of an RCD — because energy flow from the source can defeat the RCD's residual-current detection",
      'Three-phase prosumer installations',
      'Any battery storage',
    ],
    correctIndex: 1,
    explanation:
      "Reg 551.7.1(d): a source shall not be connected to the load side of an RCD. The reason is the RCD's detection model — it expects current to flow line-to-load, with imbalance indicating residual current. A source connected on the load side reverses this assumption: energy flows from load-side back through the RCD, and a residual current can be masked by the bidirectional flow. The fix is to install sources on the LINE side of the RCD (typically at a dedicated busbar position upstream of any RCD additional protection).",
  },
  {
    id: 'm4s7-pen-ev',
    question:
      'On a TN-C-S (PME) supply, an EV charging circuit must comply with Reg 722.312.2.1 (A4). What does that regulation prohibit?',
    options: [
      'RCD additional protection',
      'Including a PEN conductor in the EV charging circuit — instead, either provide a TN-S configuration (split N and PE before the EV circuit) or apply alternative protective measures like an open-PEN detection device',
      'Type B RCDs',
      'Earthing of the EV chassis',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.312.2.1 (introduced in A4:2026): a circuit supplying charging equipment for electric vehicles in a TN system shall NOT include a PEN conductor. The high touch-current consequence of an open-PEN failure on an EV (which has a large conductive body the user is touching) led to the prohibition. Either split N and PE before the EV circuit (TN-S configuration to the EV) or use an open-PEN detection device that disconnects the EV on PEN failure. Reg 461.2 already prohibited switching the PEN; Reg 722.312.2.1 goes further for EVs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A standard domestic install has solar PV with battery storage. The battery operates in self-consumption mode (charges from PV, discharges to local load). Why does BS 7671 treat this as a "prosumer" installation?',
    options: [
      'Because it has a battery',
      'Because energy can flow in both directions across the installation boundary — PV exports to the grid when the battery is full, and the battery itself moves energy from / to the AC side',
      'Because solar is renewable',
      'Because it has a smart meter',
    ],
    correctAnswer: 1,
    explanation:
      'Prosumer (PEI in GN3) is defined by bidirectional energy flow across the installation. When PV produces more than the load consumes and the battery is full, surplus exports to the grid — bidirectional flow at the cut-out. When the battery charges from PV during the day and discharges to AC loads in the evening, energy flows internally across the inverter in both directions at different times. Both characteristics trigger the bidirectional protection requirements.',
  },
  {
    id: 2,
    question:
      'The new Reg 419 group in A4:2026 provides alternative protective measures where ADS is not feasible. Which of the following is one of those alternative measures?',
    options: [
      'Increasing the cable size',
      'Reducing the source output voltage to within band I (≤ 50 V AC / 120 V DC) within a specified time — Reg 419.2',
      'Switching to a TT system',
      'Adding more RCDs in series',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 419.2: where Up > 50 V AC / 120 V DC and ADS is not feasible (typically inverter-fed systems with limited short-circuit current), the alternative measure is voltage reduction by the source within a defined time. The protective intent is the same as ADS — touch voltage limited to band I — achieved by the inverter / converter logic rather than disconnection. The specific time limit is set by Section 419 / the relevant product standard for the converter type.',
  },
  {
    id: 3,
    question:
      "A hybrid solar-PV / battery installation has a transformerless inverter with no internal galvanic separation between AC and DC sides. The manufacturer's installation manual is silent on RCD type. What does BS 7671 require?",
    options: [
      'Type AC RCD',
      'Type A RCD',
      "Type B RCD per BS EN 62423 or BS EN 60947-2 — when a PCE doesn't provide simple separation AND the manufacturer doesn't explicitly state that Type B is unnecessary, Type B is mandatory",
      'No RCD requirement',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 covers this scenario explicitly. Where a PCE does not provide at least simple separation between AC and DC sides AND the manufacturer\'s instructions do not state that Type B is unnecessary, the RCD shall be Type B. The risk is smooth DC residual current bleeding from the DC side onto the AC side, which Type A / Type AC cannot detect. Always read the inverter manual; if it explicitly says "Type A is sufficient" you may follow that, otherwise default to Type B.',
  },
  {
    id: 4,
    question:
      'Reg 530.3.201 places a mandatory consideration on equipment selection for prosumer installations. What is it?',
    options: [
      'Cable size',
      'Take account of appropriate use of either a unidirectional protective device or a bidirectional protective device — the directional characteristics of the protection must match the bidirectional energy flow',
      'Cable colour',
      'Operating temperature only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 530.3.201: selection and erection of protective equipment shall take account of appropriate use of either unidirectional or bidirectional devices. In a prosumer installation where energy can flow in both directions, a unidirectional device (typical traditional MCB / fuse) may operate correctly when current flows in the design direction but fail when current flows in the reverse direction. The regulation requires installers to consciously consider the directional characteristic — a mandatory part of equipment selection, not optional.',
  },
  {
    id: 5,
    question:
      'A 7 kW solar PV system is being added to an existing TN-C-S domestic property. The G98 connection certificate has been issued. What is the BS 7671 requirement around the inverter-grid interface?',
    options: [
      'Just connect to the spare way in the consumer unit',
      "The G98 spec defines the grid-interface protection (LoM detection, voltage/frequency limits, anti-islanding). BS 7671 then governs the AC side cable, OCPD coordination, RCD type per the inverter's PCE separation, and ensures the bidirectional energy flow is appropriately protected per Reg 551.7.1",
      "G98 alone is sufficient — BS 7671 doesn't apply",
      'Always Type B RCD upstream',
    ],
    correctAnswer: 1,
    explanation:
      'G98 (single-phase ≤ 16 A per phase) and G99 (above 16 A) are the DNO-side connection standards — they cover the grid-interface requirements: anti-islanding, voltage / frequency / phase windows for connection, loss-of-mains (LoM) detection. They do NOT replace BS 7671 — they sit alongside it. BS 7671 governs the installation-side AC cabling, OCPD coordination, RCD selection per PCE characteristics, the prohibition of source-on-load-side-of-RCD (Reg 551.7.1(d)), and the cert-form recording. Both certificates are issued: G98 by the installer to the DNO; EIC by the installer to the customer.',
  },
  {
    id: 6,
    question:
      'A vehicle-to-home (V2H) EV charger is being installed — the EV battery can power the home during a grid outage. From a BS 7671 perspective, what changes vs a standard charge-only EV install?',
    options: [
      'No difference',
      'The EV is now a SOURCE as well as a load — it flows energy into the home installation. The bidirectional flow triggers Reg 530.3.201 (bidirectional protection consideration), Reg 551.7.1 (parallel-source requirements), and the existing Reg 722.312.2.1 PEN prohibition for EV circuits on TN supplies. The whole installation is now a prosumer (PEI)',
      'Only the cable changes',
      'It becomes exempt from BS 7671',
    ],
    correctAnswer: 1,
    explanation:
      'V2H / V2G transforms the EV from pure load to a generator. The installation becomes a PEI under GN3 / Reg 826. Bidirectional protection is mandatory (Reg 530.3.201). Parallel-source requirements apply (Reg 551.7.1) — including the new prohibition of source-on-load-side-of-RCD. The existing EV-circuit PEN prohibition (Reg 722.312.2.1) still applies. The transition is a meaningful design change — V2H installations need a redesigned consumer unit with a dedicated source-side busbar position upstream of any RCD.',
  },
  {
    id: 7,
    question:
      'Per Reg 570.6.8.203, every PCE (power conversion equipment) requires a specific warning notice. What does it say?',
    options: [
      "'High voltage — keep clear'",
      "'WARNING — Isolate both AC and DC sides before servicing' — because the PCE has live energy on both sides and isolating one does not de-energise the other",
      "'Do not touch'",
      "'For trained personnel only'",
    ],
    correctAnswer: 1,
    explanation:
      "Reg 570.6.8.203 requires every PCE to carry a warning notice: 'WARNING — Isolate both AC and DC sides before servicing' (or words to similar effect). The reason is the PCE's bidirectional nature — isolating only the AC side leaves the DC side (PV strings, battery) live; isolating only the DC side leaves the AC side (grid, loads) live. Maintenance staff must explicitly isolate BOTH. The notice is part of the install spec — fit it during commissioning, check for it on every EICR.",
  },
  {
    id: 8,
    question:
      "A domestic battery storage installation has the battery's PCE connected directly to the consumer unit's main busbar — line side of all the RCBOs. The installer has put a Type AC RCBO on the battery circuit because that's what was in the cabinet. What's wrong?",
    options: [
      'Nothing — Type AC is fine',
      "Two issues. (1) Reg 551.7.1(d): the PCE is on the load side of any RCD that protects it — wrong topology, source must be on line side of any final-circuit RCD (which it appears to be) but the RCBO on the battery's own circuit creates a similar problem. (2) The battery's PCE may not provide simple separation, in which case Type B is required, not Type AC. Always default to Type B unless the manufacturer's manual specifically states otherwise",
      'Only the cable size is wrong',
      'Earthing is the issue',
    ],
    correctAnswer: 1,
    explanation:
      "Two real issues. (1) Topology: Reg 551.7.1(d) bans source on load side of an RCD. A standard domestic CU layout has each circuit's RCBO between the source (battery) and the rest of the installation — meaning the battery is on the line side of the CIRCUIT'S RCD but on the load side of any whole-house RCD. Designers must verify the topology end-to-end. (2) RCD type: Type AC is the wrong default for a battery PCE. Most domestic transformerless inverters require Type B unless the manufacturer states otherwise. Type AC was probably specified by habit; the regulation requires the design to follow the load characteristics, not the cabinet stock.",
  },
];

const faqItems = [
  {
    question: "What's the difference between Reg 419 and 'normal' ADS?",
    answer:
      'Normal ADS (Reg 411) requires the protective device to disconnect the supply within Table 41.1 times when an earth fault occurs — the touch voltage is limited by removing the supply. Reg 419 covers cases where ADS is NOT feasible — typically inverter-fed circuits where the source cannot deliver enough fault current to operate an MCB / RCD in the required time. The alternative is to limit the touch voltage by REDUCING THE SOURCE VOLTAGE within a defined time (Reg 419.2 — to within band I). Same protective intent, different mechanism.',
  },
  {
    question: 'What does "bidirectional" actually mean for a protective device?',
    answer:
      "A unidirectional device assumes current flows from line to load. Its trip mechanism, contact configuration and arc-quenching are all designed for that direction. A bidirectional device works correctly regardless of direction — important on PV DC sides (where fault current can come from the array OR from a paralleled battery), on V2G EV chargers (where the EV can either consume or export), and on parallel grid-tie inverter circuits. Look for the ↔ symbol or explicit 'bidirectional' marking on the data sheet.",
  },
  {
    question: 'Where does the prosumer installation start and the public grid end?',
    answer:
      "Per Reg 826, the prosumer installation extends from the customer's incoming supply boundary (the cut-out / DNO meter position) inward through every cable, board, source and load that's part of their property's electrical network. The grid is the DNO's supply network on the line side of that boundary. The G98 / G99 certificate covers the interface; BS 7671 covers everything inside the boundary. Some exports cross the boundary (to the grid) and some stay inside (to the local battery or to local loads) — both are within scope of the prosumer regulations.",
  },
  {
    question: 'Why does a transformerless inverter need a Type B RCD?',
    answer:
      "A transformerless inverter has no galvanic separation between its DC input (from PV / battery) and its AC output. Smooth DC residual currents can therefore leak from the DC side directly onto the AC side. Type AC and Type A RCDs cannot detect smooth DC — the magnetic core saturates and the toroid loses sensitivity. Type B RCDs use compensation circuitry that handles smooth DC residual reliably. Transformerless inverters are the dominant domestic PV / battery topology because they're more efficient and cheaper than transformer-isolated inverters, but the cost is the Type B RCD requirement.",
  },
  {
    question: 'How does anti-islanding fit with bidirectional protection?',
    answer:
      "Anti-islanding (loss of mains, LoM) is the inverter's grid-interface function — when the grid fails, the inverter disconnects to prevent backfeeding into a dead public network (which would energise repair crews working on the line). G98 / G99 specify the LoM detection algorithms and timing. BS 7671 doesn't duplicate these requirements; it handles the installation-side protection (cable sizing, OCPD coordination, RCD type, etc.). The two work together: the grid-side spec ensures safe disconnection from the grid; BS 7671 ensures safe operation of the installation under normal AND fault conditions.",
  },
  {
    question: 'Can I add a PV system to an existing 17th-edition consumer unit?',
    answer:
      "Sometimes, but the original CU was designed for unidirectional flow only. You need to verify: (1) busbar capacity is sufficient for the PV export current plus normal load; (2) the layout allows the PV to connect on the line side of any whole-house RCD (Reg 551.7.1(d)); (3) the existing RCD type is appropriate for the inverter's PCE characteristics — many older CUs have Type AC RCDs that would need replacement with Type A or Type B. In practice, most 17th-edition CUs need either replacement or significant modification to accommodate prosumer compliance under A4:2026.",
  },
  {
    question: 'Are there cert-form changes for prosumer installs?',
    answer:
      "Yes — A4:2026 model EIC and EICR forms include explicit recording of: source / generator / battery details, bidirectional protection devices used, PCE type and isolation characteristics, RCD type per circuit, the source's connection point relative to RCDs, and the warning notice on PCEs. The schedule of inspection has dedicated items for prosumer-specific checks. The schedule of test results captures bidirectional OCPD verification. All visible on the EIC the installer signs.",
  },
  {
    question: 'What about three-phase prosumer installations?',
    answer:
      'Same principles, more poles. Three-phase PV / battery / EV systems use four-pole bidirectional devices on the AC side; DC side bidirectional OCPDs as for single-phase. The PCE separation question is the same — Type B four-pole RCDs are common on three-phase commercial PV. G99 (rather than G98) is the DNO-side spec. Reg 530.3.201 / 551.7.1 / 419 all apply at the four-pole scale. Practically, the three-phase prosumer installation is a more frequent recipient of the new A4 protective measures because the higher power levels make ADS-not-feasible scenarios more common.',
  },
  {
    question: 'Does the prosumer designation affect EICR coding?',
    answer:
      'Yes. On an EICR of a prosumer installation, the inspector checks for: bidirectional OCPDs on the DC side, correct RCD type relative to PCE separation, source connection topology relative to RCDs (Reg 551.7.1(d)), warning notices on PCE, anti-islanding device certification (G98/G99 cert presence), and the dedicated schedule entries on the cert. Non-compliance with any of these is generally C2 — potentially dangerous because the bidirectional protection cannot be demonstrated. Older prosumer installs (pre-A4) may have grandfathered design features that need explicit documentation as departures.',
  },
];

const BS7671Module4Section7 = () => {
  const navigate = useNavigate();

  useSEO({
    title:
      'Bidirectional Protection Systems (Prosumer Installations) | BS 7671:2018+A4:2026 | Module 4.7',
    description:
      'How BS 7671:2018+A4:2026 protects prosumer (PEI) installations where energy flows in both directions: the new Reg 419 group for cases where ADS is not feasible, bidirectional OCPDs (Reg 530.3.201), parallel-source rules (Reg 551.7.1), the source-on-load-side-of-RCD prohibition, PCE separation and RCD type selection, and the EV charging PEN prohibition (Reg 722.312.2.1).',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 7 · Updated for A4:2026"
            title="Bidirectional protection (prosumer installations)"
            description="How BS 7671:2018+A4:2026 protects installations where energy flows in both directions — solar PV, battery storage, V2H/V2G EV chargers. The new Reg 419 alternative-protective-measures group, bidirectional OCPDs (Reg 530.3.201), parallel-source rules (Reg 551.7.1), the EV charging PEN prohibition (Reg 722.312.2.1), and the PCE / RCD-type coordination."
            actions={
              <>
                <RegBadge>419.1</RegBadge>
                <RegBadge>551.7.1</RegBadge>
                <RegBadge>722.312.2.1</RegBadge>
                <AmendmentBadge regs={['419.1', '551.7.1', '722.312.2.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Prosumer = producer + consumer. An installation where energy flows in BOTH directions across the installation boundary or internally — typically PV, battery storage, V2H / V2G EV. GN3 abbreviates this as PEIs.',
              'A4:2026 introduced a new Reg 419 group for cases where ADS is NOT FEASIBLE — typically inverter-fed circuits with limited short-circuit current. Reg 419.2 reduces the source voltage to band I within a defined time as the alternative protective measure.',
              'Key A4 rule changes: Reg 551.7.1(d) prohibits sources on the load side of an RCD; Reg 722.312.2.1 prohibits PEN conductors in EV charging circuits on TN supplies; Reg 530.3.201 makes bidirectional protection device selection mandatory.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define a prosumer installation (PEI) and identify the bidirectional flow characteristics that trigger the BS 7671 prosumer requirements.',
              'Apply the new A4 Reg 419 group — identify when ADS is not feasible and specify the appropriate alternative protective measure (typically Reg 419.2 voltage reduction).',
              'Select bidirectional OCPDs on DC sides per Reg 530.3.201 and identify where unidirectional devices are unsafe.',
              'Apply Reg 551.7.1 parallel-source rules — including the new (d) prohibition of sources on the load side of an RCD.',
              'Select the correct RCD type for a power conversion equipment (PCE) based on whether it provides simple separation between AC and DC sides — Type A vs Type B trade-off.',
              'Apply the A4 Reg 722.312.2.1 prohibition of PEN conductors in EV charging circuits on TN supplies, and design the alternative TN-S configuration or open-PEN protection.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What is a prosumer installation</ContentEyebrow>

          <ConceptBlock
            title="The bidirectional energy-flow definition"
            plainEnglish="A prosumer installation is one where energy can flow IN to the installation (from the grid, traditional consumption) AND OUT of the installation (to the grid, exporting from local PV / battery / V2G). It can also flow internally between sources and loads at different times of day. The bidirectional flow changes the protection design fundamentally."
            onSite="Look for the giveaways: solar PV inverter, domestic battery storage system (Tesla Powerwall, Enphase, GivEnergy, etc.), bidirectional EV charger (V2H or V2G), local generator that can synchronise to the grid. Any of these makes the installation a PEI under GN3 / Reg 826."
          >
            <p>
              The traditional unidirectional model assumes energy enters at the cut-out, flows
              through the consumer unit's busbars, distributes through circuits to loads, and
              returns via the neutral. Protection design — OCPD time-current curves, RCD imbalance
              detection, busbar coordination — was all built on this assumption. Prosumer
              installations break the assumption: an inverter mounted in the consumer unit can
              deliver fault current TO the busbars; a battery can charge from one circuit and
              discharge to another; an EV can act as a source rather than a load. BS 7671 has been
              progressively updated since A2:2022 to recognise this, with A4:2026 consolidating the
              requirements into the protections covered in this section.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>The new A4 Reg 419 group — when ADS is not feasible</ContentEyebrow>

          <ConceptBlock
            title="When the inverter can't deliver enough fault current to trip the MCB"
            plainEnglish="A standard MCB needs typically 5-10× rated current to operate magnetically within 0.4 s. A grid-tie inverter is typically current-limited at 1.0-1.1× rated output. On a fault, the inverter cannot deliver the multiple-of-rated needed to operate the MCB — ADS is not feasible by the standard route."
            onSite="The new A4 Reg 419 group provides the alternative protective measures for these cases. Reg 419.2 — the most-used route — requires the source's output voltage to be reduced to within band I (≤ 50 V AC / 120 V DC ripple-free) within a specified time. The protective intent is identical to ADS — touch voltage limited to a safe level — but the mechanism is voltage reduction rather than disconnection."
          >
            <p>
              Reg 419.1 lists the trigger conditions: (a) electronic equipment with limited
              short-circuit current is installed (the typical inverter / converter case); or (b) the
              required disconnection times cannot be achieved by a protective device (typical of
              long inverter-fed feeders or grid-form generators). Reg 419.2 then prescribes the
              voltage-reduction alternative for installations with PCEs where Up &gt; 50 V AC / 120
              V DC. Reg 419.3 covers further cases where the source's output voltage cannot be
              reduced — alternative measures via supplementary equipotential bonding, double /
              reinforced insulation or electrical separation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 419.1 — Where ADS not feasible"
            clause="Where automatic disconnection is not feasible in circumstances where: (a) electronic equipment with limited short-circuit current is installed; or (b) the required disconnection times cannot be achieved by a protective device; the provisions of Regulations 419.2 to 419.3 are applicable."
            meaning="The new A4 Reg 419 group is the regulatory home for protection of inverter-fed and converter-fed prosumer circuits where the traditional ADS-via-MCB / RCD model doesn't work. Designers reaching for 'increase MCB sensitivity' or 'shorter cable run' as workarounds should instead apply Reg 419's alternative measures — they're the technically correct route under A4:2026."
            cite="BS 7671:2018+A4:2026, Reg 419.1"
          />

          <InlineCheck {...inlineChecks[1]} />
          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>How an inverter actually limits its fault current</ContentEyebrow>

          <ConceptBlock
            title="The inverter's current-limit is not a safety feature, it's a survival feature"
            plainEnglish="A grid-tie inverter's power electronics are made of IGBTs or MOSFETs that can survive only a fraction of a second of overcurrent before they fail. To protect themselves, inverters limit their output current to typically 1.0-1.1× rated — full stop. They cannot deliver the 5-10× rated current an MCB needs to operate magnetically; they will current-limit even into a dead short on their output."
            onSite="This is why ADS via MCB doesn't work on inverter-fed circuits. The inverter sees the fault, current-limits, and either rides through the limit indefinitely (continuing to feed energy into the fault at rated current) or shuts itself down via firmware. Either way, the MCB is useless. Reg 419 is the regulatory recognition of this physics — alternative protective measures are needed."
          >
            <p>
              The inverter's current-limit behaviour also explains why anti-islanding (loss of
              mains) detection is critical. If the grid disappears and the inverter doesn't shut
              down within ~200 ms, it continues to feed current into a portion of the public network
              that's now isolated from the rest. Repair crews working on what they think is a dead
              line could be working on a live line being fed by the inverter. G98 / G99 mandate the
              LoM detection algorithm and timing; firmware updates to modern inverters typically
              address this. The BS 7671 protection design assumes the LoM detection works — it
              covers the installation-side faults.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url={videos.inverter.url}
            title={videos.inverter.title}
            channel={videos.inverter.channel}
            duration={videos.inverter.duration}
            topic="Watch · What an inverter is doing inside"
            caption="The Engineering Mindset opens up a grid-tie inverter and walks the IGBT bridge, switching logic and current-limit behaviour. That hard 1.0–1.1× rated output limit — built in to keep the power electronics alive — is exactly why an MCB cannot trip on an inverter-fed fault, and why A4:2026 needed the new Reg 419 alternative protective measures."
          />

          <SectionRule />

          <ContentEyebrow>Bidirectional OCPDs — Reg 530.3.201</ContentEyebrow>

          <ConceptBlock
            title="Why direction matters in fault-current interruption"
            plainEnglish="A unidirectional MCB or fuse is designed to interrupt current flowing in one specific direction. Its arc-quenching geometry, contact configuration and reset behaviour are all calibrated for that direction. Reverse the direction, and the device may not interrupt cleanly — contacts can weld, arcs can persist, the device may fail destructively."
            onSite="On a PV array's DC side, fault current can come from the array under fault — the unit between the affected string and the rest of the installation. But it can ALSO come from a paralleled battery on a hybrid system charging from the array — through the SAME device, in the OPPOSITE direction. A unidirectional device clears one but not the other. Reg 530.3.201 mandates considering this in equipment selection."
          >
            <p>
              The bidirectional consideration is now a mandatory part of equipment selection under
              Reg 530.3.201. For PV installations, the practical answer is bidirectional DC fuses
              (gPV fuses to BS EN 60269-6 are bidirectional by design) or bidirectional DC MCBs
              (look for the ↔ symbol or 'bidirectional' marking). For AC sides of parallel-source
              installations, four-pole bidirectional MCBs / MCCBs are widely available. The cost
              premium over unidirectional is usually 20-40% — small relative to the safety
              consequence of getting it wrong.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Parallel sources — Reg 551.7.1</ContentEyebrow>

          <ConceptBlock
            title="The four indents that govern parallel-source installations"
            plainEnglish="Reg 551.7.1 has been redrafted in recent amendments to handle the proliferation of parallel sources in prosumer installations. The four indents (a) to (d) cover the protection requirements for any installation where a generator / inverter / battery operates in parallel with another source, including the public grid."
            onSite="The new (c) indent requires a suitable bidirectional protective device where energy flow can go either way — typically the four-pole MCCB or ATS at the source-to-board interface. The new (d) indent prohibits connecting a source to the LOAD SIDE of an RCD — because the RCD's residual-current detection model assumes line-to-load energy flow, and a source on the load side breaks that assumption."
          >
            <p>
              Practical implementation of (d): the source connects to a dedicated busbar position
              UPSTREAM of any whole-installation RCD. Domestic PV with battery: the AC connection of
              the inverter goes to the line side of the consumer unit's main switch / isolator, NOT
              into one of the RCBO ways downstream. Three-phase commercial PV with battery: the
              inverter AC output goes to a dedicated source-side busbar with its own four-pole
              isolation, upstream of any RCD-protected sub-circuits. Get the topology wrong and the
              RCD additional protection on downstream final circuits is compromised — a real safety
              issue, not a paperwork issue.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>PCE separation and RCD type selection</ContentEyebrow>

          <ConceptBlock
            title="Why the inverter's internal topology drives the upstream RCD type"
            plainEnglish="The inverter is the gateway between the DC side (PV strings, battery cells) and the AC side (consumer unit, grid). If it provides 'simple separation' — typically a transformer or galvanic-isolation barrier between AC and DC — smooth DC residual currents can't leak from DC to AC. Type A upstream is sufficient. If it doesn't — common on transformerless inverters used in domestic PV — smooth DC residual CAN leak through, blinding Type A and requiring Type B."
            onSite="The data sheet is the binding spec. Modern inverter manuals state explicitly: 'Suitable for installation downstream of a Type A RCD (internal DC-fault detection provides separation)' OR 'Type B RCD required upstream'. Read it before specifying. Don't assume — the same model line may have transformer and transformerless variants with different requirements."
          >
            <p>
              The smooth DC residual issue is physics, not regulation. A toroidal-core RCD detects
              imbalance via the magnetic flux in the core; the core's relative permeability
              collapses when DC saturates it, and the AC residual the RCD was looking for is then
              masked. Type A and Type AC have no compensation for this effect. Type B uses
              compensation circuitry — typically a hall-effect sensor or fluxgate sensor parallel to
              the toroidal core — that maintains sensitivity even under DC saturation. The cost is
              4-5× a Type A device, which is why specifying Type B 'just to be safe' across the
              whole installation is overkill — match the type to the load, per Reg 531.3.3.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>The PCE warning notice — Reg 570.6.8.203</ContentEyebrow>

          <ConceptBlock
            title="Why every PCE needs the dual-isolation warning"
            plainEnglish="Standard isolation logic — turn off the supply, prove dead, work safe — assumes one source. A PCE has TWO live sources: AC from the grid and DC from PV / battery. Isolating the AC side leaves the DC side live; isolating the DC side leaves the AC side live. The warning notice forces maintenance staff to isolate BOTH."
            onSite="The notice text is specified by Reg 570.6.8.203: 'WARNING — Isolate both AC and DC sides before servicing' (or words to similar effect). It must be fixed to every PCE — typically a printed label on the side of the inverter or battery PCE housing. Most manufacturers ship the label in the box; if not, source one from a labeller or print on durable laminate. Check for it on every EICR — its absence is at best a code C3 (improvement recommended), at worst a contributory factor in any maintenance-incident investigation."
          >
            <p>
              The dual-isolation requirement also drives the design of the isolation devices
              themselves. Each PCE needs a clearly identified AC isolator AND a clearly identified
              DC isolator (typically a DC switch-disconnector at the PCE itself for PV / battery
              applications). Modern PCEs increasingly include both isolators integrated into the
              unit, with the warning notice pre-fitted by the manufacturer. Older retrofit installs
              may have AC isolation in the consumer unit and DC isolation as a separate roof-space
              switch — both must be identifiable and labelled.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>EV charging PEN prohibition — Reg 722.312.2.1</ContentEyebrow>

          <ConceptBlock
            title="The A4 EV charging rule that's caught a lot of installers out"
            plainEnglish="In a TN system (TN-S, TN-C-S / PME, or TN-C), an EV charging circuit shall NOT include a PEN conductor. The reason is the open-PEN failure mode: if the PEN conductor breaks anywhere upstream of the property, every Class I exposed metal part of the property (including a charging vehicle's body) rises toward line voltage. Touching the vehicle and another bonded item simultaneously becomes the fault path."
            onSite="Two compliant solutions. (1) Provide a TN-S configuration to the EV — split the PEN into separate N and PE before the EV charging circuit, typically at the consumer unit. The EV circuit is then fed by L + N + PE separately. (2) Apply alternative protective measures — the most common is an open-PEN detection device (commercial models like the Eaton ASW or Matt:e systems) that monitors the PEN conductor and disconnects the EV on PEN failure."
          >
            <p>
              Reg 722.312.2.1 (A4:2026): a circuit supplying charging equipment for electric
              vehicles in a TN system shall not include a PEN conductor. The regulation goes further
              than Reg 461.2's general prohibition of switching the PEN — for EV charging
              specifically, the PEN is excluded from the circuit entirely. The implementation in a
              typical UK domestic install (TN-C-S supply) is the open-PEN detection device — a
              dedicated unit installed close to the EV charge point, monitoring voltage between the
              local PEN and a separate earth electrode, triggering disconnection if the difference
              exceeds a defined threshold (typically 50-70 V).
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Connecting an inverter to a load-side busbar"
            whatHappens="Domestic PV install. Installer connects the AC output of the inverter to a spare RCBO way in the consumer unit — line-side of that one circuit, but load-side of the whole-house RCD that sits between the main switch and the busbar. Reg 551.7.1(d) violation: source on load side of RCD. The RCD's residual-current detection is no longer reliable because energy flow can be bidirectional through it."
            doInstead="Connect the inverter's AC output to a dedicated busbar position UPSTREAM of any RCD — typically via a separate line-side isolator near the main switch. For 17th-edition CUs without a clean line-side connection point, this often means CU replacement. Document the source-connection topology on the EIC as part of the prosumer compliance evidence."
          />

          <CommonMistake
            title="Specifying Type AC for a transformerless inverter"
            whatHappens="Installer fits a Type AC 30 mA RCBO on the AC circuit feeding a transformerless solar inverter — 'standard install practice'. The inverter's internal DC fault detection is fine; the inverter itself is fine; but on a real DC residual fault the smooth DC bleeds through to the AC side and saturates the Type AC RCBO's toroid. The RCBO becomes blind to ALL residual currents — including the AC ones it was supposed to detect."
            doInstead="Read the inverter's installation manual. If it states 'Type A is sufficient because internal DC fault detection provides simple separation', use Type A. If it doesn't say that explicitly — or if the model is transformerless and the manual is silent on RCD type — default to Type B. The cost premium is real but the safety consequence of getting it wrong is real-er."
          />

          <CommonMistake
            title="Adding an EV charger on a TN-C-S supply without addressing the PEN"
            whatHappens="Customer requests a 7 kW EV charger. Installer adds a dedicated 32 A circuit from the consumer unit, runs L + N + CPC to the charge point. On the existing TN-C-S supply, the CPC is connected to the consumer unit's MET, which is bonded to the incoming PEN. The EV circuit therefore includes a (effective) PEN conductor — Reg 722.312.2.1 violation."
            doInstead="Two compliant routes. (1) Configure TN-S to the EV: split PEN into separate N and PE at the CU, run L + N + PE separately to the EV, no PEN in the EV circuit. (2) Install an open-PEN detection device (Matt:e, Eaton ASW or similar) that monitors PEN integrity and disconnects the EV on PEN failure. Most modern EV chargers have this built in — check the spec sheet. Document the chosen route on the EIC as the EV-charging Reg 722.312.2.1 compliance evidence."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Solar PV addition to a 17th-edition split-load CU"
            situation="Standard 1990s TN-C-S domestic. Customer is having a 4 kW solar PV array installed. Existing consumer unit is a 17th-edition split-load with a single 30 mA Type AC RCD covering the bottom half (sockets) and a main switch for the top half (lighting / cooker). Inverter is transformerless, manufacturer's manual states 'Type A or higher RCD upstream is required' and lists no Type B requirement."
            whatToDo="Three-step assessment. (1) Source-connection topology: the inverter must connect upstream of the existing 30 mA RCD, not on its load side. The 17th-edition CU's main switch is the only line-side option, but adding the inverter circuit there typically requires a fused isolator and a separate way — the existing CU cannot accommodate this cleanly. Recommendation: replace CU with a modern unit that has a dedicated source-side busbar position. (2) RCD type: manufacturer states Type A is sufficient. Existing Type AC needs replacement with Type A regardless of the PV addition (Reg 531.3.3 — Type AC restricted to no-DC-component fixed equipment). (3) Bidirectional protection: DC-side OCPDs in the inverter / DC combiner must be bidirectional gPV fuses to BS EN 60269-6 — verify on commissioning. Document the design choices on the EIC; the customer cert package should include the G98 connection certificate from the DNO."
            whyItMatters="A 17th-edition CU is rarely capable of hosting an A4-compliant prosumer install without modification. Customers expect the PV install to slot in cheaply; the regulatory reality is often a CU replacement plus the PV. Quoting the install honestly — including the CU upgrade as part of the work — sets the customer expectation correctly and avoids the awkward conversation when building control inspects the install and flags the RCD type or the topology."
          />

          <Scenario
            title="Hybrid PV + battery retrofit on a TN-C-S domestic"
            situation="Customer has a 4 kW solar PV array installed 5 years ago with a transformerless inverter and an existing Type A 30 mA RCD on the AC circuit. They now want to add a 6 kWh battery. The battery's PCE is also transformerless and integrates with the existing inverter via DC coupling."
            whatToDo="Three things to verify. (1) RCD type: Reg 531.3.3 / PCE separation — both inverter and battery PCE are transformerless without simple separation, and the manufacturer's manual is silent on RCD type. Default to Type B 30 mA — replace the existing Type A RCBO with a Type B. (2) Topology: Reg 551.7.1(d) — verify the inverter and battery's combined AC output connects upstream of any whole-installation RCD; if it currently connects load-side of a whole-house RCD, redesign the CU layout. (3) Bidirectional protection: Reg 530.3.201 — the DC side combiners must be bidirectional now that the battery can charge the array as well as discharge from it. Check the existing DC OCPDs and replace if unidirectional. Document all changes on the modified EIC."
            whyItMatters="A retrofit that adds a battery transforms a unidirectional PV install into a bidirectional one. Every protection-design assumption from the original install needs revisiting. Treating the battery as 'just another box' without auditing the protection topology is the most common cause of A4-era prosumer non-compliance — the battery fits and works, but the protection no longer matches the new energy-flow model. Audit; redesign; replace; document."
          />

          <Scenario
            title="Three-phase commercial PEI with V2G EV chargers"
            situation="Light industrial unit on a 100 A TP&N TN-S supply. Existing 50 kW solar PV with battery storage. Adding 4 × 22 kW V2G EV charging points to allow staff vehicles to participate in grid-balancing services. Each V2G charger can operate as both load (charging the EV) and source (V2G export to the grid)."
            whatToDo="The V2G addition turns a moderately-complex prosumer install into a multi-source PEI. Design checklist: (1) source-side busbar architecture — the existing PV busbar takes the EV chargers as well, with a four-pole bidirectional MCCB on each EV circuit (Reg 530.3.201). (2) Reg 551.7.1 compliance — the topology has FIVE sources now (PV inverter, battery PCE, four V2G chargers); each connects upstream of any RCD. (3) PCE separation per charger — V2G chargers typically do not provide simple separation, so Type B 30 mA per EV circuit. (4) Reg 722.312.2.1 — even on a TN-S supply, no PEN issue exists, but the EV circuit must still meet the standard EV-charging rules including 30 mA RCD additional protection. (5) Anti-islanding coordination — G99 spec covers each generator individually, but with multiple inverters / V2G chargers, parallel-operation behaviour needs the DNO's explicit acceptance per the connection agreement."
            whyItMatters="Multi-source PEIs are the leading edge of A4:2026 design work. A clean compliance design prevents anti-islanding faults (where one inverter mistakes another's grid-form output for the public grid), prevents bidirectional protection mistakes, and sets up the cert documentation that a customer with regulator-grade compliance pressures can defend. Industrial / commercial V2G is where most of the BS 7671 prosumer regulations get most-strenuously tested in practice."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference — every prosumer install</ContentEyebrow>

          <ConceptBlock
            title="The five questions to answer before you specify any device"
            plainEnglish="Run this checklist on every PEI design. If you can answer all five with documented sources, the protection design is defensible. If any answer is 'not sure', stop and consult the source data sheet / regulation before continuing."
            onSite="Print this and tape it to the bench. Most A4-era prosumer compliance failures come from skipping one of these five — typically question 3 (RCD type) or question 5 (EV PEN configuration)."
          >
            <p>
              <strong>1. Is it a PEI?</strong> Bidirectional energy flow somewhere — PV, battery,
              V2H/V2G EV. If yes → all of Section 4.7's regulations apply.{' '}
              <strong>2. ADS-feasibility check.</strong> Can the inverter / converter deliver enough
              fault current to operate the planned protective device within the required time? If no
              → apply Reg 419 (typically Reg 419.2 voltage reduction).{' '}
              <strong>3. PCE separation check.</strong> Does the inverter / battery PCE provide
              simple separation between AC and DC? If no AND the manufacturer's manual is silent →
              Type B RCD upstream. If yes OR the manual explicitly states Type A is sufficient →
              Type A. <strong>4. Source-connection topology.</strong> Where does the source connect
              relative to RCDs? Reg 551.7.1(d) — sources must be on the LINE side, not the load
              side, of any RCD. Verify the consumer unit busbar layout supports this.{' '}
              <strong>5. EV-specific (if EV charging is present).</strong> TN supply? Apply Reg
              722.312.2.1 — no PEN in the EV circuit. Configure TN-S to the EV or use open-PEN
              detection. Document the chosen route on the EIC.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Cert-form additions for PEIs in A4:2026"
            plainEnglish="The A4 model EIC and EICR forms have explicit prosumer-related entries that didn't exist in earlier editions. Make sure every install completes them — they're the audit trail that proves the prosumer compliance work was done."
            onSite="Schedule of inspection: source / generator / battery details (manufacturer, model, ratings). Source-connection topology (line-side connection point identified). PCE warning notice present. RCD type per circuit. Bidirectional OCPDs identified. EV charging PEN configuration recorded (TN-S to EV / open-PEN device). Anti-islanding device certified per G98 / G99. The EIC is the customer's evidence that the install meets A4; the inspector's evidence on EICR is the same form's tickboxes 5 / 10 / 25 years later."
          >
            <p>
              The model forms were updated in A4:2026 specifically to capture the bidirectional /
              prosumer information that earlier editions didn't anticipate. Designers should treat
              each entry as a check item — every blank field is a potential C3 / C2 on a future
              EICR. Modern cert-management software (e.g. ElecCert, EasyCert and the compliance
              section of certifying-bodies' platforms) typically have the A4 form templates baked
              in; if your software is older, source the official IET model forms and use them. The
              cert is the only durable record of design choices made during install — invest the
              time to fill it properly.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <SectionRule />

          <ConceptBlock
            title="Future-proofing — what's coming after A4:2026"
            plainEnglish="The bidirectional energy economy is moving faster than the regulations. V2G is now commercially deployed; large-scale battery storage is appearing in domestic and light commercial; the grid is moving from 'one-way distribution' to 'distributed two-way exchange'. The next BS 7671 amendment will likely tighten and expand the prosumer rules further."
            onSite="Designs that comply only with the letter of A4 may be revisited at the next amendment. Designs that follow the SPIRIT of the regulations — bidirectional protection where flow is bidirectional, reading manufacturer manuals, documenting topology choices, designing for the load not the price — will scale forward to whatever comes next. The investment in proper prosumer design pays off across multiple regulatory generations."
          >
            <p>
              Industry signals worth watching: the IET's ongoing work on energy storage and EV
              charging, the BEAMA / IET joint guidance on V2G, ongoing G98 / G99 revisions for
              advanced grid services. Most A4 changes had been signalled in IET guidance years
              before they appeared in the regulations. Following the IET wiring matters / guidance
              notes alongside the regulations gives you 18-24 months' notice on the direction. The
              current IET Code of Practice for Electrical Energy Storage Systems (2nd edition) is
              the practical companion to the BS 7671 prosumer regulations and is updated more
              frequently.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The economics of getting prosumer compliance right"
            plainEnglish="The cost premium for A4-compliant prosumer protection is typically £150-400 per install — Type B RCBO upgrade, bidirectional DC OCPDs, possibly an open-PEN detection device on EV. Against the cost of getting it wrong (CU replacement, PCE replacement, retrofit work, customer-loss-of-trust), the premium is small."
            onSite="Build the prosumer compliance into the original quote. Don't try to absorb it as 'extras' or hide it as line items the customer might question. Customers who understand WHY the protection is more expensive (bidirectional energy, smooth DC residual, open-PEN consequence) accept the cost easily. Customers who get a low quote then see the costs added at install lose trust."
          />

          <KeyTakeaways
            points={[
              'Prosumer installation = bidirectional energy flow. PV, battery storage, V2H / V2G EV chargers all qualify. GN3 abbreviates as PEIs.',
              'A4:2026 introduced Reg 419 group for cases where ADS is not feasible. Reg 419.2 — voltage reduction to band I within a defined time — is the most-used alternative protective measure for inverter-fed circuits.',
              'Bidirectional OCPDs mandatory under Reg 530.3.201 wherever current can flow in either direction — DC side of PV arrays, parallel-source AC interfaces.',
              'Reg 551.7.1(d) prohibits connecting a source to the load side of any RCD — sources must be on the line-side busbar upstream of all RCDs.',
              "PCE separation drives RCD type selection. Transformerless inverter without simple separation = Type B RCD upstream. Read the manufacturer's manual every time.",
              'Reg 722.312.2.1 (A4) prohibits PEN conductors in EV charging circuits on TN supplies. Implement TN-S configuration to the EV or use an open-PEN detection device.',
              "Every PCE needs the dual-isolation warning notice (Reg 570.6.8.203) — 'Isolate both AC and DC sides before servicing'. Check for it on every EICR.",
              'The A4 cert forms have explicit prosumer entries. Complete them on every EIC — they are the audit trail proving the prosumer compliance work was done.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 5 — Selection & erection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module4Section7;
