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
    id: 'm7s5-pei-definition',
    question:
      "A4:2026 introduces a new term — Prosumer's Electrical Installation (PEI). Which definition matches what BS 7671 Section 826 actually means by it?",
    options: [
      'Any installation that includes more than one final circuit',
      'An installation arranged so energy can flow in either direction between the installation and the distributor — the installation can both consume from and export to the supply (or operate islanded)',
      'A commercial installation only — domestic installations are excluded from PEI scope',
      'An installation that is connected to the grid via a smart meter',
    ],
    correctIndex: 1,
    explanation:
      "BS 7671:2018+A4:2026 introduces Section 826 (Part 8) to formalise the Prosumer's Electrical Installation (PEI). The defining feature is BIDIRECTIONAL energy flow — the consumer's installation can both draw from and export to the distributor, and may operate connected, islanded or in parallel. PV-only systems, battery-only, hybrid PV+battery, V2H/V2G EV chargers and small wind / micro-hydro all fall under PEI. GN3 (A4 update) uses the abbreviation PEI throughout.",
  },
  {
    id: 'm7s5-self-consumption',
    question:
      "A homeowner installs a 5 kW PV array with a 10 kWh battery. The battery firmware is configured to charge from PV during the day and discharge to cover the evening household load before any export to the grid. What is BS 7671's term for this operating mode?",
    options: [
      'Anti-islanding mode',
      'Self-consumption mode — energy generated locally is used within the installation in preference to export',
      'G99 export mode',
      'Demand-side response',
    ],
    correctIndex: 1,
    explanation:
      'Self-consumption mode is the PEI operating mode where locally generated energy is preferentially used in the installation rather than exported. It is distinct from demand-side response (DSR), which is load curtailment in response to grid signals or tariff. Section 826 introduces these terms because the protective-device coordination, RCD-type selection and warning-notice requirements differ depending on which modes the installation supports.',
  },
  {
    id: 'm7s5-pen-ev',
    question:
      'A V2G EV charger is being added to a domestic property fed from a TN-C-S (PME) supply. BS 7671 specifically prohibits one of the following in the EV charging circuit. Which?',
    options: [
      'Use of a Type B RCD',
      'Inclusion of a PEN conductor in the EV charging circuit (Reg 722.312.2.1)',
      'Use of a 30 mA RCD as additional protection',
      'Bonding the EV charging chassis to the consumer unit MET',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.312.2.1 (carried into the prosumer space): an EV-charging circuit in a TN system shall NOT include a PEN conductor. A V2G charger amplifies this risk because the vehicle becomes a bidirectional source — an open-PEN with the vehicle exporting drives the touch-current path through the chassis and any simultaneously accessible metal. The fix is either TN-S to the EV (split N and PE before the charger) or one of the alternative measures in Section 722 (open-PEN detection, separate earth electrode).',
  },
  {
    id: 'm7s5-pce-warning-notice',
    question:
      'A4:2026 introduces Reg 570.6.8.203 covering the PCE (Power Conversion Equipment) warning notice. What does the regulation actually require?',
    options: [
      'A label saying "DANGER 230 V" on the inverter enclosure',
      'A durable warning notice at the PCE indicating that BOTH AC and DC sides must be isolated before working on the equipment',
      'A label specifying the export power rating',
      'A label warning of arc-flash energy at the inverter',
    ],
    correctIndex: 1,
    explanation:
      'Reg 570.6.8.203 (new in A4) requires a durable warning notice at the PCE — typically the PV / battery inverter — stating that the equipment has TWO sources of supply (AC from the network and DC from the array or battery), and that both AC AND DC sides must be isolated before working on the equipment. This addresses a category of avoidable incidents where AC isolation alone leaves the DC bus live in daylight or in standby battery operation.',
  },
  {
    id: 'm7s5-rcd-type-b-pv',
    question:
      'You are wiring the AC side of a 4 kW string PV inverter into a domestic consumer unit. The inverter datasheet says it provides "transformerless topology, no internal residual-current monitoring". Which RCD type is required upstream at the consumer unit?',
    options: [
      'Type AC',
      'Type A — sufficient because PV is a low-voltage source',
      'Type B — required where the inverter is transformerless and cannot prevent smooth DC residual on the AC side',
      'No RCD needed — anti-islanding handles all detection internally',
    ],
    correctIndex: 2,
    explanation:
      "A transformerless inverter without internal residual-current monitoring can place smooth DC residual on the AC side under fault. Type AC is blind to all DC, Type A clears AC + pulsating DC only, Type B is required for smooth DC residual. Where the inverter manufacturer's installation manual confirms internal Type B-equivalent RCM (residual-current monitoring), the upstream RCD may be Type A — but this must be explicit in the manual, not assumed. Section 712 (PV-specific) and Section 826 both reinforce this RCD-selection logic for PEI.",
  },
  {
    id: 'm7s5-parallel-sources',
    question:
      'A homeowner installs a battery inverter that runs in parallel with the DNO supply. Reg 551.7.1 (now updated in A4) lists the conditions under which paralleling is permitted. Which of the following is NOT one of the requirements?',
    options: [
      'Provision shall be made to prevent the generating set being connected in parallel with the public supply if it is not in synchronism with that supply',
      'The earthing arrangement of the installation must remain effective when sources are paralleled',
      'The generator output voltage shall be at least 10 % higher than the DNO declared voltage to ensure export priority',
      'Means of isolating the generator from the supply system shall be readily accessible',
    ],
    correctIndex: 2,
    explanation:
      "Reg 551.7.1 (with new sub-clauses (c) and (d) under A4) requires synchronism, an effective earthing arrangement during parallel operation, accessible isolation, and protection coordination across all sources. There is NO requirement for the generator to run at an elevated voltage — quite the opposite, it must remain within the DNO's declared voltage envelope per ESQCR. Over-voltage triggers the inverter's G98 / G99 protection trip and disconnects the parallel source.",
  },
  {
    id: 'm7s5-411-3-4-pei-lighting',
    question:
      'A new build dwelling has rooftop PV, a battery, and the lighting circuits include a mix of mains-powered downlights and PV-fed emergency luminaires that revert to grid in fault. Does Reg 411.3.4 (the A4 luminaire RCD rule) still apply?',
    options: [
      'No — PEI lighting is exempt because it has dual sources',
      'Yes — Reg 411.3.4 applies to AC final circuits supplying luminaires in domestic premises regardless of whether the supply is from grid, PV, battery or a mix; 30 mA RCD additional protection is mandatory',
      'Only if the lighting points are inside a bathroom zone',
      'Only on the PV-fed emergency luminaires, not the mains-powered downlights',
    ],
    correctIndex: 1,
    explanation:
      'Reg 411.3.4 is unconditional within domestic (household) premises and is not relaxed by the presence of a PEI. The AC final circuit supplying luminaires must have 30 mA additional protection regardless of whether the upstream source is grid, PV inverter, battery inverter or a hybrid of all three. The RCD type (A vs B) is determined by the source mix and inverter topology — Type B is often the right call where transformerless inverters feed the lighting bus.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671:2018+A4:2026 Part 8 (Section 826) introduces formal requirements for which class of installation?',
    options: [
      'Highway power supplies and street furniture',
      "Prosumer's Electrical Installations (PEI) — installations capable of bidirectional energy flow with the distributor",
      'Special locations only (bathrooms, pools, saunas)',
      'Commercial installations above 100 kW only',
    ],
    correctAnswer: 1,
    explanation:
      'Part 8 / Section 826 (introduced in A4) defines the PEI: an installation capable of bidirectional energy exchange with the public network and / or capable of islanded operation. This covers PV, battery storage, V2H / V2G EV, small wind and micro-hydro. GN3 (A4 update) uses "PEI" as the standard abbreviation. Cross-references run to Section 712 (PV), Section 551 (parallel sources / generators), Section 419 (where ADS cannot be applied) and Section 514 (identification and warning notices).',
  },
  {
    id: 2,
    question:
      'Which Reg sets the conditions under which a generating set may be connected in parallel with the public supply?',
    options: [
      'Reg 411.3.2 (disconnection times)',
      'Reg 551.7.1 — paralleling requirements (synchronism, earthing, isolation, protection coordination), with new sub-clauses (c) and (d) under A4',
      'Reg 514.1 (identification of conductors)',
      'Reg 722.312.2.1 (EV charging PEN prohibition)',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 551.7.1 governs paralleling. A4 adds clauses (c) and (d) covering modern PEI cases — protection coordination across multiple sources and the need for the earthing arrangement to remain effective during parallel operation. ESQCR 2002 sits behind it as the statutory frame for connection to the public network; the BS 7671 reg is the technical-design route for compliance.',
  },
  {
    id: 3,
    question:
      'A PV inverter is installed in a garage. From 15 April 2026, what must be present at the PCE per Reg 570.6.8.203?',
    options: [
      'A label stating the export power rating only',
      'A durable warning notice indicating that the equipment has more than one source of supply and that BOTH AC and DC must be isolated before work',
      "A QR code linking to the manufacturer's manual",
      'No notice is required if the installation is G98-compliant',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 570.6.8.203 (new in A4) is the PCE warning-notice rule. The notice must be durable, located at the PCE, and warn that the equipment is fed from MORE THAN ONE source — both AC and DC sides must be isolated before working. The reg sits within Section 570 (Power Conversion Equipment) and complements the dual-supply labelling already required at the meter and origin. Missing the PCE notice on a new install is a documented A4 departure on the EIC.',
  },
  {
    id: 4,
    question:
      'In a PEI with a PV array fed by a transformerless string inverter, the AC side is wired to a 30 mA RCD upstream. Which RCD type is required?',
    options: [
      'Type AC — adequate for sinusoidal residual',
      'Type A — adequate because PV is rectified to AC at the inverter',
      "Type B — required where the inverter is transformerless and cannot guarantee absence of smooth DC residual on the AC side, unless the inverter manufacturer's manual confirms internal Type B-equivalent RCM",
      'No RCD — anti-islanding covers detection',
    ],
    correctAnswer: 2,
    explanation:
      "Section 712 (PV) and Section 826 both push to Type B for transformerless string inverters. Smooth DC residual on the AC side will pass straight through Type AC and Type A — they are blind to it. Type B is the design default unless the manufacturer's manual explicitly states internal Type B-equivalent RCM is provided, in which case Type A upstream is acceptable and is documented as the design rationale on the EIC.",
  },
  {
    id: 5,
    question: 'Section 419 covers which scenario in a PEI context?',
    options: [
      'The standard ADS arrangement on TN supplies',
      'Alternative protective measures where ADS by Reg 411 cannot be applied — relevant to PEI islanded operation where conventional fault-loop impedance assumptions break down',
      'Notification to the DNO under G98',
      'The location of the PCE warning notice',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 419.1 covers the alternative protective measures where ADS in accordance with Reg 411 cannot be applied. In a PEI operating islanded (off-grid) the upstream source is the inverter itself, and conventional Ze / Zs values assumed for the grid-connected case do not hold. The designer must verify that fault current is sufficient to operate the protective device under island operation, or apply an alternative measure (e.g. RCD-only ADS, supplementary bonding, double / reinforced insulation). Section 419 was extensively updated in A4 to support PEI design.',
  },
  {
    id: 6,
    question:
      'Section 514 covers identification of conductors and components. What A4 change is most relevant to PEI?',
    options: [
      'Conductor colours have changed to dark blue for neutral',
      'Identification and warning-notice requirements have been extended to cover sources, generators and batteries — Section 514 now treats the PEI as having multiple identifiable sources, each requiring its own warning notice',
      'Cable insulation classes have changed',
      'Section 514 has been removed and replaced with Section 826',
    ],
    correctAnswer: 1,
    explanation:
      'A4 extends Section 514 to give explicit treatment to multi-source identification: the PV inverter, battery PCE and EV charger each require their own warning notice, and the labelling at the origin must indicate the PEI nature of the installation. The conductor colour code itself is unchanged. Section 514 + Reg 570.6.8.203 together cover the labelling regime; Section 826 sits above as the design framework.',
  },
  {
    id: 7,
    question:
      'A PV string is wired with the array on the load side of a 30 mA RCD on the AC main. The installer plans to fit a generator on the same RCD bus to provide back-up power. What does BS 7671 say?',
    options: [
      'Acceptable — the RCD provides additional protection across both sources',
      'NOT acceptable — sources shall not be connected on the load side of an RCD providing additional protection in a way that defeats the disconnection requirement; the design must ensure RCD operation is reliable under all source-mode combinations (Reg 551.7.1, Reg 314)',
      'Acceptable provided the generator is rated below 16 A',
      'Acceptable provided the RCD is Type A',
    ],
    correctAnswer: 1,
    explanation:
      'Putting a source on the load side of an RCD that is providing additional protection breaks the assumption that the upstream conductor is unenergised when the RCD trips — the generator can keep the downstream side live regardless. Reg 551.7.1 requires the design to maintain effective RCD operation across all source-mode combinations, and Reg 314 requires circuits to be arranged to avoid danger. The fix is to feed the generator into a dedicated way, or to use a transfer switch that breaks the source connection before the RCD-protected bus is energised by it.',
  },
  {
    id: 8,
    question:
      'A homeowner asks for a 5 kW PV system with a hybrid inverter and a 10 kWh battery. Which combination of standards must the installer comply with?',
    options: [
      'BS 7671 Part 8 only',
      'BS 7671:2018+A4:2026 (Section 826 PEI, Section 712 PV, Section 551 parallel sources, Section 514 identification, Reg 570.6.8.203 PCE notice) PLUS the relevant ENA Engineering Recommendation (G98 for ≤16 A / phase, otherwise G99) and MCS for the consumer-funding route',
      'G98 only — BS 7671 does not apply to PV',
      'MCS only — BS 7671 is optional for renewable installations',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 is the technical-design standard. ENA EREC G98 (≤16 A per phase) and G99 (above) are the DNO connection standards — statutory under ESQCR. MCS (Microgeneration Certification Scheme) is the route required for consumer-funded SEG / export tariffs. All three apply concurrently; missing any one creates a defect — BS 7671 non-compliance for the wiring, G98 / G99 breach for unauthorised parallel connection, and loss of MCS-funded benefits for the customer.',
  },
];

const faqItems = [
  {
    question: 'Is Section 826 (Part 8) retrospective on PV systems installed before 15 April 2026?',
    answer:
      'No — Section 826 applies to new design and new installations under BS 7671:2018+A4:2026. On an EICR of an older PEI it is a deviation from the current edition: GN3 requires every observation to be coded C1 / C2 / C3 / FI. Most pre-A4 PV installs that are otherwise sound (correct RCD type, valid anti-islanding, proper isolation) score C3 — the missing PCE notice and source-identification labels are improvements rather than dangers. Where the RCD type is wrong (Type AC on a transformerless inverter) or the PEN prohibition is breached on a V2G EV install, that is a C2.',
  },
  {
    question: 'Does the PCE warning notice (Reg 570.6.8.203) replace existing PV labels?',
    answer:
      'No — it adds to them. The dual-supply notice at the meter / origin (already required) tells anyone working on the supply that there are multiple sources. The new PCE notice is at the inverter / converter itself, telling the worker that BOTH AC and DC sides must be isolated before work. Both are durable, both are mandatory, both feature on the A4 EIC schedule of inspection. Missing either is a documented departure under Reg 120.3.',
  },
  {
    question: 'When does Section 419 (alternative protective measures) actually bite for PEI?',
    answer:
      'Most often when the system supports island operation. Grid-connected with the inverter held to the supply, the fault loop impedance is dominated by the DNO Ze and conventional ADS works. Disconnect from grid (a power cut, or deliberate islanding) and the inverter becomes the only source. Inverter fault current is typically 1.0–1.5× rated current for milliseconds before electronic limits kick in — far below what an MCB needs to operate within Table 41.1 times. Reg 419.1 therefore allows alternative measures: 30 mA RCD as the ADS device, double / reinforced insulation, or supplementary bonding. The design has to be explicit about which measure is in force in each operating mode.',
  },
  {
    question: 'Why is Type B RCD often required on the AC side of a PV inverter?',
    answer:
      "Transformerless string inverters do not provide galvanic isolation between the DC array and the AC output. Under array fault, smooth DC residual can appear on the AC side. Type AC is blind to all DC. Type A is blind to smooth DC (it sees AC and pulsating DC only). Type B sees AC, pulsating DC and smooth DC. Where the inverter manufacturer's manual confirms internal Type B-equivalent RCM (residual-current monitoring) is provided, the upstream RCD may be Type A — this is typical of branded hybrid inverters but not guaranteed. Always check the manual; the wrong type is an EICR observation waiting to happen and is not visible without type-specific testing.",
  },
  {
    question: 'Can I parallel a stand-by generator with the PV inverter and the DNO supply?',
    answer:
      "Reg 551.7.1 governs parallel operation. A stand-by generator that runs in parallel with the DNO requires synchronism, protection coordination, accessible isolation, and an effective earthing arrangement during parallel operation. In practice, most domestic stand-by gensets use a transfer switch that disconnects the DNO before the generator energises the installation — this is parallel-via-transfer, not true paralleling, and avoids Reg 551.7.1's synchronism requirements. True paralleling (synchronous, continuous) needs G99 approval and is rarely the right design call for a domestic PEI; a battery PCE is usually a better fit.",
  },
  {
    question: 'What is "demand-side response" and where does it sit in BS 7671?',
    answer:
      'Demand-side response (DSR) is the load-side mirror of self-consumption: the installation curtails or shifts load in response to grid signals (frequency drop, tariff signal, DNO command). BS 7671 Section 826 acknowledges DSR as a PEI operating mode but does not specify the protocols (those are commercial — half-hourly settlement, dynamic tariffs, V2G aggregator contracts). What BS 7671 DOES require is that the design accommodates the load-curtailment device safely: it must not interfere with disconnection times, must not isolate the PEN in TN-C-S, must not break any protective conductor, and must be identifiable on the cert.',
  },
  {
    question: 'Where does the PEI cert form differ from a standard EIC?',
    answer:
      'The A4 EIC has new explicit fields for source / generator / battery: PV system rating, inverter make / model / topology (transformerless or isolated), battery system rating and chemistry, V2G presence, and the RCD type and rating on the AC side of each PCE. The schedule of inspection adds tick-boxes for: PCE warning notice (Reg 570.6.8.203), parallel-sources synchronism and earthing arrangement (Reg 551.7.1), source identification per Section 514, and PEI-specific isolation procedure documented and provided to the user. Old-form certs cannot fully evidence A4 compliance — issuing one against an A4 installation is itself a departure under Reg 120.3.',
  },
  {
    question: 'How does the EV charging PEN prohibition (Reg 722.312.2.1) interact with V2G?',
    answer:
      'V2G turns the EV into a bidirectional source — exactly the case that an open PEN risks most. The reg is unambiguous: a circuit supplying EV charging equipment in a TN system shall NOT include a PEN conductor. With V2G the consequence of an open PEN is amplified because the vehicle can continue to push current onto the network through the broken neutral, raising local earth potential further. The fix is the same as for one-way EV: split N and PE before the EV circuit (TN-S to the charger), or apply one of the alternative measures in Section 722 (open-PEN detection device, separate earth electrode for the EV chassis).',
  },
  {
    question:
      'Does Reg 411.3.4 (the new A4 domestic luminaire RCD rule) apply if the lighting is fed from a PV inverter?',
    answer:
      'Yes — unconditionally. Reg 411.3.4 is scoped to AC final circuits supplying luminaires within domestic (household) premises, regardless of whether the upstream source is grid, PV, battery or a hybrid of all three. 30 mA additional protection is mandatory. The RCD type (A vs B) is then driven by the source mix and inverter topology — Type B is often the correct call where transformerless inverters feed the lighting bus, because smooth DC residual is in scope.',
  },
];

const BS7671Module7Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Prosumer Electrical Installations (Part 8) | BS 7671:2018+A4:2026 | Module 7.5',
    description:
      "How BS 7671:2018+A4:2026 treats Prosumer's Electrical Installations (PEI) — Section 826 scope, PV (Section 712), parallel sources (Reg 551.7.1), the new PCE warning notice (Reg 570.6.8.203), and where Section 419 alternative protective measures apply.",
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
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Updated for A4:2026"
            title="Prosumer electrical installations (Part 8)"
            description="A4:2026 introduces Part 8 / Section 826 — the Prosumer's Electrical Installation (PEI). Bidirectional energy flow, multiple sources, islanded operation. This section covers the design framework, the PV / battery / V2G overlay, parallel-sources rules (Reg 551.7.1), the new PCE warning notice (Reg 570.6.8.203), and where Section 419 alternative protective measures bite."
            actions={
              <>
                <RegBadge>826</RegBadge>
                <RegBadge>551.7.1</RegBadge>
                <RegBadge>419.1</RegBadge>
                <AmendmentBadge regs={['551.7.1', '411.3.4']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              "BS 7671:2018+A4:2026 introduces Part 8 / Section 826 — the Prosumer's Electrical Installation (PEI). PV, battery storage, V2H / V2G EV, small wind and micro-hydro all sit under it.",
              'PEI design layers on top of existing sections: Section 712 (PV), Section 551 (parallel sources / generators), Section 514 (identification), Section 419 (alternative protective measures), Reg 411.3.4 (domestic luminaire RCD).',
              'Headline A4 additions: Reg 570.6.8.203 (PCE warning notice — isolate AC AND DC), updated Reg 551.7.1 (synchronism, earthing, isolation, coordination across sources) and the new explicit cert fields for source / generator / battery on the EIC.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define a Prosumer's Electrical Installation (PEI) per Section 826 and recognise which UK installations fall under Part 8 (PV, battery storage, V2H / V2G EV, micro-hydro, small wind).",
              'Identify the operating modes of a PEI — grid-connected, islanded, parallel — and the BS 7671 terms self-consumption mode, demand-side response (DSR) and Local Electrical Microgrid (LEM).',
              'Apply Reg 551.7.1 (parallel sources) including the new A4 sub-clauses (c) and (d) covering synchronism, earthing during parallel operation, accessible isolation and protection coordination.',
              'Apply the Section 712 PV-specific overlay — DC-side OCPDs, RCD-type selection on the AC side (Type A vs Type B), and the inverter-topology decision.',
              'Apply the new Reg 570.6.8.203 PCE warning notice and the extended Section 514 source-identification rules — and audit a real installation against them.',
              'Recognise where Section 419 alternative protective measures apply to a PEI (typically islanded operation where conventional ADS via OPD cannot be demonstrated) and pick the right measure.',
              'Coordinate the EV-charging PEN prohibition (Reg 722.312.2.1) with V2G design and explain why V2G amplifies the open-PEN risk on TN-C-S.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Part 8 — what it actually is</ContentEyebrow>

          <ConceptBlock
            title="The Prosumer's Electrical Installation (PEI) — Section 826"
            plainEnglish="A PEI is an installation where the consumer is not just consuming. They are also producing, storing, or both — and energy flows in both directions between the installation and the network."
            onSite="GN3 (A4 update) standardises the abbreviation PEI. If the property has rooftop PV, a domestic battery, a hybrid inverter, V2H / V2G EV charging, a small wind turbine or a micro-hydro turbine — it's a PEI and Part 8 / Section 826 applies. There is no power threshold below which the section is exempt; even a 1.6 kW PV array on a single phase falls under it."
          >
            <p>
              Section 826 (Part 8, new in A4) defines the PEI as an installation arranged so energy
              can flow in either direction between the installation and the public supply, and which
              may operate connected, islanded or in parallel. The defining feature is bidirectional
              flow — not the magnitude. Section 826 sits above the existing topical sections
              (Section 712 PV, Section 551 generators / parallel sources, Section 514
              identification, Section 419 alternative measures) and pulls them together as a
              coherent design framework. GN3 (A4 update) uses PEI as the standard abbreviation in
              all worked examples.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>PEI operating modes — the language A4 introduces</ContentEyebrow>

          <ConceptBlock
            title="Self-consumption, DSR and LEM"
            plainEnglish="Self-consumption: locally generated energy is used in the installation rather than exported. Demand-side response: load is curtailed in response to grid signals or tariff. LEM: a Local Electrical Microgrid where multiple sources and loads coordinate locally."
            onSite="A4 introduces these terms because the protective-device coordination and warning-notice requirements differ depending on which modes the installation supports. A self-consumption-only PEI never exports — but still needs the same isolation regime and labelling as one that does, because the inverter is still a source. A DSR-enabled PEI adds load-curtailment devices that must not interfere with ADS or break protective conductors."
          >
            <p>
              Self-consumption mode is the default for most domestic PV + battery installs: the
              battery firmware preferentially charges from PV during the day and discharges to cover
              evening household load before any export to the grid. Demand-side response (DSR) is
              the load-side mirror: the installation reduces or shifts demand in response to grid
              signals, dynamic tariff or DNO command. The Local Electrical Microgrid (LEM) is the
              broader case — multiple sources and loads coordinating locally, with formalised
              control logic. BS 7671 Section 826 acknowledges all three but does not specify the
              communication protocols (those are commercial — settlement, tariff, V2G aggregator
              contracts).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Grid-connected, islanded and parallel"
            plainEnglish="Grid-connected: inverter holds to the supply, anti-islanding kicks in if the supply fails. Islanded: the inverter forms its own grid from the battery, the installation runs without the DNO. Parallel: more than one source is energising the installation at once."
            onSite="The mode the installation is in changes the fault-current model. Grid-connected with the DNO providing PSCC, conventional ADS via OPD works. Disconnect from grid and the inverter becomes the only source — the inverter\'s short-circuit contribution is electronic and limited, so MCBs may not operate within Table 41.1 times. That\'s the trigger for Section 419 alternative protective measures."
          >
            <p>
              Parallel operation is the case where two or more sources energise the installation
              simultaneously — the DNO supply plus a generator, the DNO plus a PV inverter, a hybrid
              inverter operating with the DNO. Reg 551.7.1 governs paralleling and A4 adds new
              sub-clauses (c) and (d) covering protection coordination across all sources and the
              requirement that the earthing arrangement remains effective during parallel operation.
              Most domestic stand-by gensets avoid Reg 551.7.1\'s full burden by using a transfer
              switch (parallel-via-transfer) that disconnects the DNO before the genset energises
              the installation; true paralleling typically needs G99 approval.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Reg 551.7.1 — parallel sources, with A4 additions</ContentEyebrow>

          <ConceptBlock
            title="The four pillars of Reg 551.7.1"
            plainEnglish="Synchronism. Effective earthing during parallel operation. Accessible isolation. Protection coordination across all sources. Miss any one and the parallel connection isn't compliant."
            onSite="The A4 additions — sub-clauses (c) and (d) — codify what was implicit before: the earthing arrangement must remain effective when sources are paralleled (you can't have two MET arrangements competing) and protection must be coordinated so that an upstream device can clear a downstream fault under any source-mode combination."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 551.7.1 — Connection of generating sets to the distributor's network"
            clause="Where a generating set is intended to operate in parallel with a distributor's network, the following requirements apply: (a) provision shall be made to prevent the generating set being connected in parallel with the public supply if it is not in synchronism with that supply; (b) means of isolating the generator from the supply system shall be readily accessible to the distributor at all times; (c) the protection shall be coordinated to ensure correct operation under all source-mode combinations; (d) the earthing arrangement of the installation shall remain effective during parallel operation."
            meaning="Sub-clauses (c) and (d) are the A4 additions and they apply directly to PEI design: the protection scheme must work whether the system is grid-only, grid + PV, grid + battery, grid + PV + battery, or islanded; and the earthing must hold up across all those mode transitions. ENA EREC G98 (≤16 A / phase) and G99 (above) are the DNO connection standards that sit alongside Reg 551.7.1."
            cite="BS 7671:2018+A4:2026, Reg 551.7.1 (in force from 15 April 2026)"
          />

          <SectionRule />

          <ContentEyebrow>The Section 712 PV overlay</ContentEyebrow>

          <ConceptBlock
            title="DC-side requirements and RCD-type selection"
            plainEnglish="PV is a DC source on the array side and an AC source on the inverter output. The DC side has its own overcurrent protection and isolation rules; the AC side gets its RCD type chosen based on the inverter topology."
            onSite="DC-side: each string needs a string fuse (where required by manufacturer or by parallel-string design), a load-break DC isolator at the inverter, and surge protection on long DC runs. AC-side: 30 mA RCD additional protection on the AC main from the inverter, type chosen by inverter topology — Type B for transformerless without internal RCM, Type A where the manual confirms internal Type B-equivalent RCM."
          >
            <p>
              Section 712 (PV-specific overlay) carries forward the existing PV requirements and is
              cross-referenced from Section 826. The DC-side OCPD selection follows the inverter
              manufacturer\'s instructions and the array string design — not all PV strings need
              individual string fusing; many small domestic 1- or 2-string systems do not. Where
              fusing IS required, gPV-rated fuses are used (BS EN 60269-6) — standard gG fuses are
              not adequate for DC. The DC isolator at the inverter must be load-break rated for the
              maximum string voltage (typically 600 V or 1000 V DC) and must be lockable in the OFF
              position for safe maintenance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Type B RCD — when, and when not"
            plainEnglish="Transformerless string inverters can place smooth DC residual on the AC side. Type AC and Type A are blind to it. Type B is required unless the inverter manufacturer's manual confirms internal Type B-equivalent residual-current monitoring (RCM)."
            onSite="The decision tree: (1) Read the inverter installation manual. (2) If it explicitly says internal RCM Type B-equivalent — Type A upstream is acceptable; document the rationale on the EIC. (3) If silent or transformerless without RCM — Type B upstream is mandatory. (4) Type AC is never the right answer for a PV install. Type B costs 4–5× a Type A but it's the wrong place to value-engineer."
          >
            <p>
              Inverters split into two topologies: isolated (with a transformer, galvanic separation
              between DC and AC) and transformerless. Transformerless inverters dominate the modern
              domestic PV market because they\'re cheaper, smaller and more efficient, but the lack
              of galvanic isolation means smooth DC residual can appear on the AC side under array
              fault. Type AC sees only sinusoidal AC residual; Type A adds pulsating DC; Type B adds
              smooth DC. The wrong type is invisible without type-specific testing — a Type AC
              upstream of a transformerless inverter looks fine on a standard ramp test but is
              functionally blind to the very fault it\'s meant to clear.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>EV charging and V2G — the PEN prohibition</ContentEyebrow>

          <ConceptBlock
            title="Reg 722.312.2.1 in a V2G context"
            plainEnglish="No PEN conductor in any EV charging circuit on a TN system. V2G makes the prohibition more important — the EV becomes a bidirectional source, so an open PEN with the vehicle exporting drives the touch-current path through the chassis."
            onSite="Two compliant designs: (1) Split N and PE before the EV circuit — bring TN-S to the charger. (2) Apply one of Section 722's alternative measures — open-PEN detection device (PEN-fault relay) at the charger, or a separate earth electrode for the EV chassis. Whichever route, the EV circuit cannot include a PEN."
          >
            <p>
              Reg 722.312.2.1 prohibits a PEN conductor in any EV-charging circuit on a TN system.
              In a V2H / V2G context, the EV is a bidirectional source — the vehicle exports power
              back to the property and potentially to the network. An open PEN with the vehicle
              exporting is the worst case: the broken neutral elevates local earth potential towards
              line voltage, the conductive vehicle body becomes a touch hazard, and the fault path
              runs through any simultaneously accessible bonded metal. This is why V2G installations
              are subject to additional design scrutiny — the open-PEN detection device or separate
              earth electrode is not optional, and the documentation should demonstrate which
              alternative measure is in force.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Section 419 — alternative protective measures</ContentEyebrow>

          <ConceptBlock
            title="When ADS via Reg 411 cannot be demonstrated"
            plainEnglish="In an islanded PEI the inverter is the only source. Inverter fault current is electronically limited — typically 1.0–1.5× rated current for a few cycles before electronics intervene. That's nowhere near what an MCB needs to operate within Table 41.1 times. Section 419 then applies."
            onSite="The trigger: any operating mode where the upstream source is the inverter rather than the DNO. Off-grid operation, deliberate islanding for resilience, transition periods during grid loss. Reg 419.1 names the alternative measures: 30 mA RCD as the ADS device (the inverter can sustain RCD trip current long enough to operate it), supplementary equipotential bonding to drop touch voltage, double / reinforced insulation per Section 412."
          >
            <p>
              Reg 419.1 was extensively updated in A4 to support PEI design. The conventional Reg
              411 ADS chain — earthing + bonding + OPD + verified Zs — assumes a fault loop that can
              sustain enough current to operate the protective device within the disconnection time.
              In an islanded PEI that assumption fails: the inverter is electronically limited and
              its short-circuit contribution is far below what MCBs expect. The designer has three
              Reg 419 choices: (a) rely on a 30 mA RCD as the disconnection device (the inverter
              will sustain trip current long enough), (b) apply supplementary equipotential bonding
              to keep touch voltage below 50 V even during a fault, or (c) use double / reinforced
              insulation per Section 412 on the load side. Whichever is chosen must be explicit on
              the EIC and the design package.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Section 514 and the new PCE warning notice</ContentEyebrow>

          <ConceptBlock
            title="Identification — multi-source labelling"
            plainEnglish="Section 514 has been extended to give explicit treatment to multi-source identification. Each PCE — PV inverter, battery PCE, EV charger — needs its own warning notice. The labelling at the origin must indicate the PEI nature of the installation."
            onSite="At the origin: dual-supply notice indicating that the installation has more than one source. At the consumer unit: warning of the source(s) feeding it. At each PCE: the new Reg 570.6.8.203 notice — isolate AC AND DC. At the meter position: dual-supply notice. Any roof-mounted equipment: hazard notice for first responders (some authorities now require a marked PV stop-switch at the property entrance)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 570.6.8.203 — Power Conversion Equipment warning notice (NEW IN A4)"
            clause="A durable warning notice shall be fixed at the Power Conversion Equipment (PCE) indicating that the equipment has more than one source of supply, and that all such sources shall be isolated before any work is undertaken on the equipment."
            meaning="Mandatory ('shall') and applies to every PCE in a PEI — PV inverter, battery PCE, hybrid inverter, EV charger with bidirectional capability. The notice must be durable (not a paper sticker) and located AT the equipment so a worker reaches it before the cover. 'All such sources' explicitly covers AC and DC — isolating only the AC main while the DC bus is live in daylight is the failure mode this regulation is closing."
            cite="BS 7671:2018+A4:2026, Reg 570.6.8.203 (in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>
            The A4 EIC — explicit fields for sources, generators and batteries
          </ContentEyebrow>

          <ConceptBlock
            title="What changes on the cert form"
            plainEnglish="Old EIC forms cannot fully evidence A4 PEI compliance. The A4 EIC adds explicit fields for PV system rating, inverter make / model / topology, battery system rating and chemistry, V2G presence, and the RCD type / rating on the AC side of each PCE."
            onSite="On the schedule of inspection there are new tick-boxes for: PCE warning notice (Reg 570.6.8.203) present and durable, parallel-sources synchronism and earthing arrangement (Reg 551.7.1) verified, source identification per Section 514 complete, PEI-specific isolation procedure documented and provided to the user. Issuing an old-form cert against an A4 PEI is itself a departure under Reg 120.3."
          >
            <p>
              The cert form changes do real work: they force the designer to record the topology
              decision (transformerless vs isolated), the RCD-type rationale (Type A vs Type B), the
              parallel-sources arrangement (transfer switch vs true paralleling), and the isolation
              regime (AC-only vs AC + DC). A future inspector reads the cert as the design log — the
              answer to "how did you arrive at the protective device?" is the eight-step record on
              the EIC. Reconstructing it after the fact from photos and memory is rarely defensible,
              particularly if the install has gone wrong.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Treating a PV installation as static"
            whatHappens="Designer treats the PV install as just another circuit on the consumer unit — Type A 30 mA RCD on the AC main, no PCE notice, conventional 30-day periodic check. Three years in, the inverter develops an array fault. The Type A RCD doesn\'t see the smooth DC residual. The fault sustains until the homeowner notices an inverter alarm; meanwhile the touch-current risk on the AC bus has been elevated for weeks. EICR coded C2."
            doInstead="A PEI is not a static install. The RCD type must match the inverter topology — Type B for transformerless without internal RCM, Type A only where the manufacturer\'s manual explicitly confirms internal Type B-equivalent RCM. The PCE warning notice is mandatory under Reg 570.6.8.203 from 15 April 2026. Periodic inspection should include type-specific RCD testing, not just the standard ramp."
          />

          <CommonMistake
            title="Putting a source on the load side of an RCD providing additional protection"
            whatHappens="Installer adds a stand-by genset on the load side of the 30 mA RCD on the AC main, reasoning that the RCD will cover the genset bus too. Reg 551.7.1 plus Reg 314 say no — placing a source downstream of an RCD breaks the assumption that the upstream conductor is unenergised when the RCD trips. The genset can hold the bus live regardless of RCD operation."
            doInstead="Feed the genset into a dedicated way, OR use a transfer switch that breaks the source connection before the RCD-protected bus is energised by it. The principle: every RCD must have a clear, unidirectional fault-current model. Sources on the load side of additional-protection RCDs defeat that model."
          />

          <CommonMistake
            title="Missing the PCE warning notice"
            whatHappens="Inverter is wall-mounted in the garage. Installer fits the dual-supply notice at the meter and consumer unit but forgets the new Reg 570.6.8.203 notice at the PCE itself. Engineer attending a future fault isolates the AC main, opens the inverter cover, finds the DC bus live in daylight at 600 V. Reg 120.3 departure on the cert; the missing notice is a documented failure mode the regulation is specifically trying to prevent."
            doInstead="From 15 April 2026, every PCE in a PEI gets a durable warning notice indicating that the equipment has more than one source and that ALL sources must be isolated before work. The notice goes AT the PCE — not at the consumer unit, not on the cover only — so the worker reaches it before the cover. Treat it as a per-PCE requirement: PV inverter, battery PCE, V2G EV charger each get their own."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Hybrid PV + battery retrofit on a 5-year-old TN-C-S consumer unit"
            situation="Customer wants a 4 kW PV array on the south-facing roof, a 10 kWh lithium-ion battery in the garage, and a hybrid inverter that supports self-consumption mode and limited islanded operation during grid loss. Existing CU: 100 A main switch, Type A 30 mA RCDs on every busbar, 3-year-old metal split-load board. Property is TN-C-S (PME)."
            whatToDo="Design route under A4: (1) PV inverter is transformerless without internal RCM (typical retrofit) — upstream RCD on the AC side must be Type B 30 mA. Don\'t add the PV to the existing Type A bus; fit a dedicated way. (2) Battery PCE on a separate Type B 30 mA way, with G98 notification within 28 days (system is below 16 A / phase). (3) Section 419 covers islanded operation: rely on the inverter\'s integrated 30 mA RCD as the ADS device when off-grid, document on the EIC. (4) PCE warning notices (Reg 570.6.8.203) at the PV inverter AND the battery PCE — durable, AT the equipment. (5) Source identification per Section 514: dual-supply notice at meter, origin notice at CU, PEI nature noted on the EIC schedule of inspection. (6) Cert: A4 EIC form with explicit fields for PV system rating, inverter topology (transformerless), RCD type (Type B) and rationale, battery system rating, isolation procedure documented for the user."
            whyItMatters="The cert (EIC) records compliance with the in-force edition. Issuing an old-form cert against an A4 PEI is a documented departure under Reg 120.3 and the burden of justification falls on the designer. Insurers, mortgage providers, MCS auditors and DNO connection officers all read the cert as the evidence of compliance; gaps surface fast and are expensive to retro-fix. The Type B RCD is the headline cost item — over-spec on Type B isn\'t free, but under-spec on Type A is a documented hazard that doesn\'t show on a standard ramp test."
          />

          <Scenario
            title="V2G EV charger added to a small commercial property — TN-C-S supply"
            situation="Customer is a SME with a fleet of two electric vans. They want to install two 22 kW (32 A / phase) three-phase V2G chargers in the yard, both with bidirectional capability so the vans can support the building\'s self-consumption mode during peak hours. Property: TN-C-S, 100 A three-phase supply, recently fitted distribution board."
            whatToDo="Design route under A4: (1) V2G is a parallel source per Reg 551.7.1 — the vans paralleling with the DNO need synchronism (handled by the charger\'s integrated G99 protection — system is above 16 A / phase so G99 not G98), accessible isolation, protection coordination, effective earthing during parallel operation. Apply for G99 connection BEFORE the install — DNO sign-off can take weeks. (2) Reg 722.312.2.1 prohibits a PEN in the EV circuit on TN — split N and PE before the chargers (TN-S to the chargers) and apply an open-PEN detection device (PEN-fault relay) at each charger position to cover the open-PEN failure mode. V2G amplifies the open-PEN risk because the vans become bidirectional sources. (3) RCD selection: Type B 30 mA on each charger feed (most V2G chargers are transformerless with no internal RCM). (4) PCE warning notices (Reg 570.6.8.203) at each charger — durable, AT the equipment, indicating bidirectional source and AC + DC isolation. (5) Source identification per Section 514. (6) Section 419: islanded operation is unlikely on a commercial site with G99 protection, but document the design assumption. (7) Cert: A4 EIC with explicit V2G presence and RCD-type rationale."
            whyItMatters="V2G amplifies the consequences of every PEI failure mode. The vans are bidirectional sources, so an open-PEN with vehicles exporting is materially more dangerous than the same fault with a one-way PV install. The G99 connection is the statutory frame — installing a parallel source above G98 thresholds without DNO approval is a breach of ESQCR 2002 and exposes the customer to mandatory disconnection. The Reg 551.7.1 paralleling requirements (synchronism, earthing, isolation, coordination) all apply concurrently and the cert has to evidence each one. Reg 722.312.2.1 PEN prohibition is non-negotiable on TN — it\'s the single most-tested point in the EV-charging sections of the assessment, and V2G is the version of the question examiners reach for first."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference — building a PEI design</ContentEyebrow>

          <ConceptBlock
            title="The eight-step PEI design log"
            plainEnglish="A PEI brings together PV / battery sizing, inverter topology, RCD type, parallel-sources rules, alternative protective measures for islanded operation, source identification, PCE warning notices, and the cert entries. Walk it as an explicit design log."
            onSite="(1) Define the modes the system supports — grid-connected only, grid + islanded, parallel via transfer, true parallel. (2) Define the sources — PV, battery, V2G, generator. (3) Pick inverter topology and identify RCD type per source (Type B unless manual confirms internal RCM). (4) Apply Reg 551.7.1 paralleling rules where any source is on simultaneously. (5) Apply Section 419 alternative measures for any islanded mode. (6) Apply Reg 722.312.2.1 PEN prohibition where EV charging is included; design open-PEN detection. (7) Source identification per Section 514 + PCE warning notices per Reg 570.6.8.203. (8) Cert: A4 EIC with all explicit PEI fields, schedule of inspection PEI tick-boxes, and the design log preserved in the records."
          >
            <p>
              The eight-step design log is the answer to a future inspector\'s "how did you arrive
              at this design?" question. For typical UK domestic PEI on TN-C-S: hybrid inverter,
              Type B 30 mA RCD on the AC side, G98 notification, transfer switch for any genset, PCE
              notices at the inverter and battery PCE, source-identification labels at the origin
              and meter. For V2G or commercial: the same logic with G99 instead of G98, open-PEN
              detection on every EV circuit, more rigorous documentation, and a longer design-review
              cycle to align with the DNO and (where applicable) MCS.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Coordination with Reg 411.3.4 and the rest of A4</ContentEyebrow>

          <ConceptBlock
            title="The A4 PEI changes do not relax the rest of A4"
            plainEnglish="Adding a PEI does not relax the existing A4 rules. Reg 411.3.4 (domestic luminaire RCD) still applies. The TN-C-S PEN prohibition on EV circuits still applies. AFDD requirements still apply. The PEI sits on top of the rest of A4, not in place of it."
            onSite="Common error: designer assumes the PEI overlay replaces the standard A4 rules. It doesn\'t. A new dwelling with rooftop PV, a battery and EV charging on TN-C-S still needs: 30 mA RCDs on every socket circuit (411.3.3), 30 mA RCDs on every domestic luminaire circuit (411.3.4), no PEN in the EV circuit (722.312.2.1), AFDDs where required by Section 421, plus all the Section 826 / Reg 570.6.8.203 / Reg 551.7.1 requirements layered on top."
          >
            <p>
              The A4 PEI requirements are additive. The A4 EIC schedule of inspection has new
              PEI-specific tick-boxes added to the existing schedule — none of the original boxes
              are removed. A coherent design treats the PEI overlay as an additional layer of
              compliance over the standard A4 baseline, not a substitute. Where the same physical
              device satisfies multiple regulations (e.g. a single 30 mA Type B RCBO on a domestic
              luminaire circuit fed from the PV bus satisfies Reg 411.3.4 AND the Section 712 RCD
              requirement) record both rationales on the cert — future inspectors get to see both.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Periodic inspection — testing a PEI</ContentEyebrow>

          <ConceptBlock
            title="EICR of a PEI under A4"
            plainEnglish="A periodic inspection of a PEI is more involved than a non-PEI EICR. Standard ADS verification still applies, plus type-specific RCD testing, plus checking the source-mode behaviour (anti-islanding, transfer switch, parallel synchronism) is still functioning, plus auditing the warning-notice regime against Reg 570.6.8.203 and Section 514."
            onSite="The minimum extra steps versus a non-PEI EICR: (1) Type-specific RCD test on every Type B device — the ramp test alone is not sufficient because it does not exercise the smooth-DC residual path. (2) Functional test of anti-islanding — manufacturer\'s test procedure, recorded on the cert. (3) Visual audit of all warning notices — at the origin, meter, consumer unit, each PCE; durability check (the paper sticker that\'s been there 5 years usually fails). (4) Check the isolation procedure documentation is still with the user (this is often missing on resale). (5) Verify the cert in force matches the install — old-form certs against an A4 PEI become a recurring observation."
          >
            <p>
              GN3 (A4 update) extends the periodic inspection regime for PEI: every observation
              still gets a single classification (C1 / C2 / C3 / FI), and "satisfactory" overall is
              not permitted with any C1 or C2 present. Common PEI EICR observations: missing PCE
              warning notice (typically C3 if the install pre-dates A4 and no other defect, C2 if a
              fault is documented to have occurred without notice present); wrong RCD type
              (typically C2 — Type AC or Type A on a transformerless inverter without internal RCM
              is a documented hazard); broken anti-islanding (C1 or C2 depending on whether the
              system is currently grid-connected); incorrect parallel-source arrangement (C2
              minimum). A clean A4 PEI EICR is a long, methodical exercise — budget the time.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              "BS 7671:2018+A4:2026 introduces Part 8 / Section 826 — the Prosumer's Electrical Installation (PEI). PV, battery storage, V2H / V2G EV, micro-hydro and small wind all sit under it; the defining feature is bidirectional energy flow.",
              'Operating modes — self-consumption, demand-side response (DSR), Local Electrical Microgrid (LEM), grid-connected, islanded, parallel — change the protection model. The A4 design framework names them explicitly.',
              'Reg 551.7.1 (parallel sources) — synchronism, accessible isolation, protection coordination across all sources (new (c)), effective earthing during parallel operation (new (d)). G98 (≤16 A / phase) and G99 (above) are the DNO connection standards alongside.',
              'Reg 570.6.8.203 (NEW IN A4) — durable warning notice at every PCE indicating multiple sources of supply and AC + DC isolation. Section 514 extended for source identification.',
              "Section 712 (PV) — Type B 30 mA RCD on the AC side of transformerless inverters without internal RCM; Type A only where the manufacturer's manual confirms internal Type B-equivalent RCM.",
              'Reg 419.1 (alternative protective measures) — bites in islanded operation where conventional ADS via OPD cannot be demonstrated. 30 mA RCD as ADS device, supplementary bonding, or double / reinforced insulation per Section 412.',
              'Reg 722.312.2.1 (EV PEN ban) — no PEN in any EV charging circuit on TN. V2G amplifies the open-PEN risk; design with TN-S to the charger or open-PEN detection.',
              'The A4 EIC has explicit fields for source / generator / battery and new schedule-of-inspection PEI tick-boxes. Issuing an old-form cert against an A4 PEI is a documented departure under Reg 120.3.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-8')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 8 — Reference Materials
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module7Section5;
