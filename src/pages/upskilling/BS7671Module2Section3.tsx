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
    id: 'm2s3-afdd-purpose',
    question:
      'Reg 421.1.7 (A4:2026) brings AFDDs into BS 7671. What fault mode is an AFDD specifically designed to detect that an MCB or RCD will not?',
    options: [
      'Smooth DC residual current from an EV charger',
      'High-frequency arcing — series and parallel arc faults caused by damaged insulation, loose terminations or chafed flex',
      'Earth leakage above 30 mA in the household circuit',
      'Overcurrent above the device rating',
    ],
    correctIndex: 1,
    explanation:
      'AFDDs (BS EN 62606) detect the high-frequency signature of an arcing fault — a degraded termination, chafed flex behind a wardrobe, a stapled-through cable that has cooked over years. The arcing current can be well below the MCB trip threshold (so no overcurrent) and well below 30 mA to earth (so no RCD trip), yet still ignite combustibles. Reg 421.1.7 (A4) targets this fire-ignition mechanism as a separately recognised hazard.',
  },
  {
    id: 'm2s3-pei-definition',
    question:
      'A customer has a 4 kW PV array, a 5 kWh battery and an EV charger that can export back to the grid (V2G). Under A4:2026 / GN3 terminology, what is the installation classified as?',
    options: [
      'A standard domestic installation — the energy sources are accessories',
      'A Prosumer Electrical Installation (PEI) — bidirectional energy flow at the supply interface, multiple parallel sources',
      'A microgrid that falls outside BS 7671',
      'A TT installation, because the inverter is double-insulated',
    ],
    correctIndex: 1,
    explanation:
      'PEI (Prosumer Electrical Installation) is the GN3 / A4 abbreviation for an installation where the consumer is also a producer — net energy flows in both directions at the supply interface. The presence of PV + battery + V2G EV is the classic case. Reg 551.7.1 (parallel sources) and Reg 530.3.201 (bidirectional protective device consideration) become live the moment you cross from consumer-only to PEI.',
  },
  {
    id: 'm2s3-bidirectional-device',
    question:
      'Reg 530.3.201 introduces a duty to consider bidirectional protective devices. Why does direction of current flow matter for an OPD or RCD on a PEI?',
    options: [
      'It does not — protective devices are inherently symmetrical',
      'A device rated only for unidirectional current may not interrupt a fault correctly when the source side is energised from the load side (e.g. battery exporting), and arc-extinction performance can be compromised',
      'The neutral conductor reverses polarity in a PEI',
      'Bidirectional only matters for DC circuits',
    ],
    correctIndex: 1,
    explanation:
      'On a PEI, the "load" side of an MCB might be the energised side at any given moment — battery discharging, PV exporting, EV in V2G mode. A device specified only for the conventional source-to-load direction may have reduced breaking capacity, slower magnetic-trip response, or compromised arc-quench when current flows the other way. Reg 530.3.201 (A4) requires the designer to verify the device is suitable for the actual current directions on the PEI.',
  },
  {
    id: 'm2s3-pnb-vs-pme',
    question:
      'A4:2026 introduces "TN-C-S (PNB)" as a distinct cert-form classification. What is the practical difference between PME and PNB on a domestic supply?',
    options: [
      'There is no difference — PNB is just the new name for PME',
      'PME has the neutral earthed at multiple points across the DNO network; PNB (Protective Neutral Bonding) has a single point of connection to earth, typically at the consumer cut-out, with no further DNO neutral-to-earth connections downstream',
      'PNB is only used in industrial supplies',
      'PNB always requires a separate earth electrode at the property',
    ],
    correctIndex: 1,
    explanation:
      'PME (Protective Multiple Earthing) is the dominant DNO TN-C-S arrangement: the combined PEN is earthed at multiple points across the LV network for redundancy. PNB (Protective Neutral Bonding) is a TN-C-S variant with a single point of earth connection — typically at the customer cut-out for a private transformer (e.g. a single-customer substation, a farm, a commercial unit). A4 distinguishes them on the cert because the open-PEN failure-mode profile is different, and the EV-charging Reg 722.312.2.1 prohibition still applies to both.',
  },
  {
    id: 'm2s3-pce-role',
    question:
      'The term PCE (Power Conversion Equipment) appears throughout the A4 amendments to Section 712 (PV) and Section 722 (EV). What does PCE refer to?',
    options: [
      'The protective earth conductor inside the equipment',
      'Power Conversion Equipment — inverters, converters, rectifiers; equipment that converts AC to DC, DC to AC, or one DC voltage to another, sitting at the AC/DC interface',
      'A type of RCD with built-in current monitoring',
      'A piece of test equipment used for solar commissioning',
    ],
    correctIndex: 1,
    explanation:
      'PCE is the umbrella term for inverters, DC/DC converters, rectifiers and bidirectional charge controllers. Why it matters: a PCE sits between the DC side (PV strings, battery, EV traction battery) and the AC side (the installation). Selection of upstream RCD type, isolation arrangements and earthing design all hinge on what the PCE does and does not provide. A "PCE with simple separation" providing 6 mA DC fault detection lets a Type A upstream RCD suffice; a PCE without it forces Type B.',
  },
  {
    id: 'm2s3-rcd-type-evolution',
    question:
      'A2 introduced Type F awareness, A3 reinforced Type A as the domestic baseline, and A4 confirms when Type B is mandatory. On a modern domestic CU feeding LED lighting, an EV charger with internal 6 mA DC detection, and an air-source heat pump, what RCD types are appropriate?',
    options: [
      'Type AC throughout — it has the highest sensitivity',
      'Type A on lighting (pulsating DC from LED drivers), Type A on the EV way (PCE handles smooth DC), Type A or F on the heat pump depending on inverter design — Type AC is now obsolete domestically',
      'Type B everywhere because of the EV charger',
      'No RCD needed where AFDDs are fitted',
    ],
    correctIndex: 1,
    explanation:
      'Reg 531.3.3 (RCD type selection) requires the designer to match RCD waveform sensitivity to the actual residual-current spectrum the load can produce. Type AC sees only sinusoidal AC residual — defeated by virtually every modern LED driver, phone charger and switched-mode PSU. Type A is the domestic baseline (AC + pulsating DC). Type F adds composite high-frequency residual (single-phase VSDs, some heat pumps). Type B is reserved for circuits where smooth DC residual can occur AND is not handled by the PCE — three-phase VSDs, bare EV chargers, larger PV/battery hybrids.',
  },
  {
    id: 'm2s3-luminaire-rcd',
    question:
      'Reg 411.3.4 (NEW in A4:2026) makes 30 mA RCD additional protection mandatory on which final circuits?',
    options: [
      'Every final circuit in every type of installation',
      'AC final circuits supplying luminaires within domestic (household) premises',
      'Only kitchen and bathroom lighting circuits',
      'DC luminaire circuits in commercial premises',
    ],
    correctIndex: 1,
    explanation:
      'Verbatim from Reg 411.3.4: "Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires." Note the scope: domestic only, AC only, luminaire-circuits only — but unconditional within that scope, with no risk-assessment exception comparable to Reg 411.3.3(b).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671:2018+A4:2026 brings AFDDs into Reg 421.1.7. Which standard defines AFDD product requirements and which fire-ignition mechanism does the device target?',
    options: [
      'BS EN 61008 — earth-leakage detection',
      'BS EN 62606 — series and parallel arc-fault detection in final circuits, intended to mitigate fire ignition by arcing in damaged or degraded wiring',
      'BS EN 60898 — overcurrent protection',
      'BS EN 62423 — Type F/B residual-current detection',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 62606 is the AFDD product standard. The device monitors the high-frequency current signature of arcing — pattern recognition rather than threshold detection. Series-arc faults (a degrading termination) and parallel-arc faults (insulation breakdown between conductors) both produce characteristic broadband noise the AFDD locks onto. Reg 421.1.7 (A4) sets out where AFDDs are required or recommended, taking effect 15 April 2026.',
  },
  {
    id: 2,
    question:
      'Under GN3 / A4 terminology, what distinguishes a Prosumer Electrical Installation (PEI) from a conventional consumer installation?',
    options: [
      'Net annual energy import is positive',
      'The installation contains parallel sources of supply and bidirectional energy flow can occur at the supply interface — making the consumer simultaneously a producer',
      'The installation has more than one consumer unit',
      'The installation includes a battery only',
    ],
    correctAnswer: 1,
    explanation:
      'PEI is defined by the bidirectional energy-flow capability at the supply interface, not by net consumption. A house with PV that exports during the day and imports at night is a PEI. The implications: Reg 551.7.1 (parallel sources) governs how multiple sources are coordinated; Reg 530.3.201 (A4) requires bidirectional consideration of protective devices; Section 712 (PV), Section 722 (EV) and Section 826 (battery) all overlap on a single installation.',
  },
  {
    id: 3,
    question:
      'Reg 722.312.2.1 prohibits a PEN conductor in EV-charging circuits on TN supplies. Why is this rule specifically tied to EV charging, rather than applying to all TN-C-S circuits?',
    options: [
      'Because EV chargers always export power back to the grid',
      'Because the conductive vehicle body — touched by the user during plug-in — provides a low-impedance path to true earth, dramatically amplifying the touch-current risk if the PEN opens upstream',
      'Because EV chargers cannot tolerate a PEN conductor',
      'Because Type B RCDs cannot operate on a PEN supply',
    ],
    correctAnswer: 1,
    explanation:
      'The open-PEN failure mode in TN-C-S elevates the MET (and every Class I exposed metal part bonded to it) toward line voltage. For most domestic loads, the user is shielded by stand-off distance and footwear. With an EV, the user is in physical contact with a large conductive vehicle body that is well earthed through the wheels and damp ground — a near-ideal current path. Reg 722.312.2.1 (A4) addresses this by prohibiting the PEN inside the EV circuit; the installer must either run the EV circuit as TN-S (split N and PE before the EV way) or apply an open-PEN protection device at the charge-point.',
  },
  {
    id: 4,
    question:
      'A designer is working on 10 March 2026 and issues a domestic rewire EIC against the model form from BS 7671:2018+A3:2024. The certificate is dated 20 April 2026 (after A4:2026 came into force on 15 April). What is the correct call?',
    options: [
      'Acceptable — the design predated A4 so the A3 model form may still be used',
      'Not acceptable — once A4 is in force, the cert must be issued against the in-force edition (A4:2026 model form) and confirm compliance with A4 (including Reg 411.3.4 luminaire RCDs and any AFDD requirements per Reg 421.1.7) — or be issued as a documented departure under Reg 120.3 with full justification',
      'Acceptable for any work started before A4:2026 was published',
      'Only acceptable if the customer signs a waiver',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 is non-statutory but a court will assess the duty under EAWR 1989 / HSWA 1974 against the in-force edition at the date of certification. Once A4 is in force, the model form, schedule columns and reg references on the cert must match A4. If the design genuinely predates A4 and meets A3 only, the route is a documented Reg 120.3 departure with the designer accepting the burden of justification — not silently using the obsolete model form.',
  },
  {
    id: 5,
    question:
      'On a 2026 domestic CU upgrade, the installer fits Type AC 30 mA RCBOs throughout because they are cheaper and "30 mA is 30 mA". What is the right code on a subsequent EICR and why?',
    options: [
      'No code — RCDs are RCDs',
      'C3 — improvement recommended; Type AC is technically still in BS EN 61008',
      'C2 — potentially dangerous; Type AC cannot detect pulsating DC residual produced by virtually every modern domestic load (LED drivers, phone chargers, induction hobs, heat pumps), so the additional-protection function is not reliably delivered for the foreseeable load profile',
      'C1 — danger present, immediate action required',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 531.3.3 requires the RCD type to suit the residual-current waveform the load can produce. A modern domestic property has near-100 % switched-mode load — LED lighting, phone chargers, laptop bricks, heat pumps, EV chargers, induction hobs. All produce some pulsating DC residual. Type AC sees none of it. The RCD will appear to test fine on a meter (which injects sinusoidal AC) yet fail to operate on a real fault. C2 is the typical inspector view because the additional-protection function is materially compromised on a present-day load profile.',
  },
  {
    id: 6,
    question:
      'Where is Reg 421.1.7 (A4) most clearly mandatory on AFDDs, and where does it remain a recommendation?',
    options: [
      'Mandatory in all domestic installations from 15 April 2026',
      'Mandatory on specific higher-risk premises (e.g. sleeping accommodation in care homes / HMOs / certain heritage and timber-frame buildings as set out in Reg 421.1.7) and recommended on other final circuits — designers must read the regulation against the building category',
      'Recommended only — never mandatory',
      'Mandatory on lighting circuits only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 421.1.7 (A4) draws a line between premises types where AFDDs are required ("shall") and types where they are recommended ("should be considered"). The required category includes higher-risk sleeping-accommodation buildings, certain HMOs / care premises, and premises with combustible-construction or irreplaceable-content concerns; the recommended category is broader. On every domestic CU upgrade in scope, the designer must check the specific building category against the published regulation — the required/recommended split is the most-tested point in A4 CPD.',
  },
  {
    id: 7,
    question: 'Reg 419 (group) covers what scenario in BS 7671, and how does A4 update it?',
    options: [
      'Reg 419 sets the minimum CPC size — A4 increases the minimum to 4 mm²',
      'Reg 419 (alternative protective measures where ADS not feasible) — A4 expands the toolkit and clarifies the documentation burden when ADS cannot deliver disconnection times within Section 411 (e.g. very long circuits, certain agricultural / heritage cases)',
      'Reg 419 is the AFDD section in A4',
      'Reg 419 is reserved for IT systems only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 419 sits between the Section 411 ADS requirements and the alternative measures (double / reinforced insulation, electrical separation, non-conducting location, earth-free local equipotential bonding, or supplementary equipotential bonding to keep touch voltage below 50 V). A4 sharpens the documentation: where ADS cannot demonstrably deliver Section 411 disconnection times, the designer must record which 419 alternative is being used and why — not just omit the ADS test row.',
  },
  {
    id: 8,
    question:
      'Reg 530.3.201 introduces consideration of bidirectional protective devices. On a domestic PEI with PV, battery and an EV charger, where does this regulation most directly bite?',
    options: [
      'It applies only to the consumer unit main switch',
      'On every protective device (MCB, RCBO, isolator) where current can flow in either direction during normal operation — typically the consumer unit busbar protective devices feeding the PV, battery and EV ways, where backfeed from any source through the busbar can energise other circuits',
      'On the PEN conductor only',
      'On the meter tails',
    ],
    correctAnswer: 1,
    explanation:
      'On a PEI with multiple parallel sources, the busbar can be energised from any of them. A protective device on a non-source way must still interrupt a fault correctly when the busbar is energised by, say, the battery during a power cut. Reg 530.3.201 (A4) requires the designer to verify each device is rated for bidirectional current — checking the manufacturer datasheet for backfeed performance, breaking capacity in either direction, and arc-quench characteristics. In practice this means specifying devices marked for bidirectional use in the PEI ways and avoiding legacy MCBs marked "line" / "load" rigidly.',
  },
];

const faqItems = [
  {
    question: 'When does A4:2026 actually come into force, and when does A3 stop being valid?',
    answer:
      'BS 7671:2018+A4:2026 was published with an in-force date of 15 April 2026. A3 may continue to be used during a transition window (typically six months — confirmed as 15 October 2026 by the IET / BSI publication notes) for designs that genuinely predate A4. From 15 October 2026 onwards, every newly-issued certificate must be against A4. New designs after 15 April 2026 should be designed and certified against A4; using the A3 model form for a fresh design after that date is a documented Reg 120.3 departure with full justification.',
  },
  {
    question: 'Is an AFDD required on every domestic circuit from 15 April 2026?',
    answer:
      'No — Reg 421.1.7 distinguishes between premises types where AFDDs are mandatory ("shall") and types where they are recommended ("should be considered"). Mandatory categories include certain higher-risk premises with sleeping accommodation (HMOs, care premises) and premises of particular fire-load or heritage concern as set out in the regulation. Standard owner-occupied dwellings often fall in the "recommended" category — but check the specific building category against the published Reg 421.1.7 wording and the customer\'s insurer requirements before deciding. Where they are recommended, fitting them is rarely wrong; omitting them needs to be a recorded design decision.',
  },
  {
    question: 'What is the difference between PME and PNB on the EIC?',
    answer:
      "Both are TN-C-S arrangements. PME (Protective Multiple Earthing) is the standard DNO TN-C-S where the combined PEN is earthed at multiple points across the LV network — the dominant UK domestic supply. PNB (Protective Neutral Bonding) is a TN-C-S variant with a single point of earth connection at the consumer cut-out, with no further neutral-to-earth connections downstream — typical of private transformers serving a single customer (farms, industrial units, remote properties). A4:2026 distinguishes them as separate cert-form options because the open-PEN failure-mode profile and DNO inspection regime differ. From the installation's perspective, both still require the same internal protective measures and both still trigger Reg 722.312.2.1 (no PEN in EV circuits).",
  },
  {
    question: 'Does the A4 luminaire RCD requirement (Reg 411.3.4) apply to commercial lighting?',
    answer:
      'No — the regulation is explicitly scoped to "domestic (household) premises". Commercial and industrial luminaire circuits remain governed by the wider 30 mA additional-protection rules (e.g. Reg 411.3.3 for sockets ≤32 A, 701.411.3.3 for bath/shower locations, special-location chapters in Part 7). A common misreading is to assume A4 has extended the rule everywhere — it has not. Where lighting is in a commercial special location (e.g. swimming pool, agricultural building) the existing Part 7 additional-protection rules may already require it.',
  },
  {
    question: 'On a PEI, do I need bidirectional MCBs everywhere or just on the source ways?',
    answer:
      'Reg 530.3.201 (A4) requires the designer to consider bidirectional capability on every protective device where current can flow in either direction during normal operation. On a typical domestic PEI (PV + battery + EV V2G), this covers the consumer-unit busbar protective devices on the source ways AND any way fed from the busbar that could be energised by backfeed from the sources. In practice, fitting an MCB / RCBO range explicitly approved for bidirectional service across the whole PEI consumer unit is the cleanest design choice. Legacy devices marked "line" / "load" with directional arrows must be checked against the datasheet — many cannot be used in PEI applications.',
  },
  {
    question: 'What is "PCE with simple separation" and why does it matter for RCD type?',
    answer:
      'A PCE (Power Conversion Equipment) — typically an EV charger or inverter — that provides simple separation between its DC and AC sides, plus internal 6 mA DC residual-current detection per BS EN 61851 (EV) or the equivalent inverter standard, manages the smooth DC fault path itself. This means the upstream RCD does not have to detect smooth DC residual and a Type A 30 mA RCD is sufficient. A PCE WITHOUT simple separation or 6 mA DC detection passes any DC residual through to the upstream side, requiring a Type B RCD (which can see smooth DC residual). Type B RCDs cost roughly 4-5× a Type A, so confirming the PCE specification before ordering devices is significant on every install.',
  },
  {
    question: 'How should I update my EIC schedule of inspection for A4?',
    answer:
      'A4:2026 changes the model form. Headline differences: (i) new tick-rows for AFDD provision per Reg 421.1.7; (ii) "TN-C-S (PNB)" added as a distinct system-earthing classification alongside TN-C-S (PME), TN-S, TT, IT; (iii) new column on the schedule of test results capturing AFDD test status where fitted; (iv) explicit declaration row for Reg 411.3.4 luminaire RCD compliance; (v) prosumer / parallel-source declarations consolidated in the supply-characteristics block. Use only the A4 model form (or a software vendor\'s confirmed-A4 template) once 15 April 2026 has passed.',
  },
  {
    question: 'Does Reg 419 give me a way out of fitting RCDs on long agricultural runs?',
    answer:
      'Not exactly. Reg 419 covers the case where automatic disconnection of supply (Section 411) cannot deliver the required disconnection time — typically because the loop impedance is too high to satisfy Reg 411.4.4. The alternatives in Reg 419 are: double or reinforced insulation as the protective measure, electrical separation (Section 413), non-conducting location, earth-free local equipotential bonding, or supplementary equipotential bonding to keep touch voltage below 50 V during a fault. Each has a documentation burden and a narrow scope. A4 sharpens the documentation requirement — if you are using Reg 419, the certificate must record which alternative measure is in use and why ADS could not be achieved.',
  },
  {
    question: 'Why has BS 7671 introduced the "prosumer" concept now rather than under A2 or A3?',
    answer:
      'A2 (2022) introduced PV / EV awareness without naming the prosumer scenario explicitly. A3 (2024) tightened RCD type selection and introduced battery-storage clauses. By 2026, domestic installations with combined PV + battery + V2G EV had become common enough that the standard needed a single coherent term — "prosumer" — to anchor the bidirectional-energy-flow rules across Sections 712, 722, 826 and the new 530.3.201. The name follows IEC 60050 international vocabulary and brings BS 7671 in line with HD 60364 / IEC 60364 series. Practically, it lets one term replace the awkward phrasing "consumer with parallel sources of supply" throughout the regulations and GN3.',
  },
];

const BS7671Module2Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'New A4:2026 definitions — AFDD, PEI, prosumer, PNB | BS 7671 Module 2.3',
    description:
      'AFDD, PEI, bidirectional energy, prosumer, PNB and PCE — the new and clarified definitions in BS 7671:2018+A2/A3/A4 explained for qualified electricians, with the A4:2026 cert-form changes.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Updated for A4:2026"
            title="New definitions — AFDD, PEI, bidirectional energy, prosumer"
            description="The vocabulary BS 7671 added (and clarified) in A2, A3 and A4 — AFDDs, prosumer electrical installations, bidirectional energy flow, PNB on the new cert form, PCE at the AC/DC interface, and how they shift design choices on every modern domestic installation."
            actions={
              <>
                <RegBadge>421.1.7</RegBadge>
                <RegBadge>551.7.1</RegBadge>
                <AmendmentBadge regs={['421.1.7', '551.7.1', '411.3.4']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'A4:2026 brings AFDDs into BS 7671 (Reg 421.1.7, BS EN 62606) — mandatory in higher-risk premises, recommended elsewhere. Targets fire ignition by series and parallel arc faults that an MCB or RCD never sees.',
              'PEI (Prosumer Electrical Installation) is the new umbrella term for any installation where energy can flow in BOTH directions at the supply interface — PV, battery, V2G EV. Reg 530.3.201 (bidirectional devices) and Reg 551.7.1 (parallel sources) become live the moment you cross into PEI.',
              'A4 distinguishes TN-C-S (PME) from TN-C-S (PNB) on the cert form, adds an explicit Reg 411.3.4 luminaire-RCD declaration, and consolidates prosumer / parallel-source declarations in the supply block.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define AFDD, PEI, prosumer, bidirectional energy flow, PNB and PCE in the precise sense BS 7671:2018+A4:2026 uses them.',
              'Apply Reg 421.1.7 (AFDDs) — distinguish where the regulation says "shall" from where it says "should be considered", and pick the correct product standard (BS EN 62606).',
              'Identify when an installation crosses from consumer to PEI, and walk through the Reg 530.3.201 / Reg 551.7.1 design implications for bidirectional protective devices and parallel sources.',
              'Distinguish PME from PNB on the A4 cert form, and explain why the open-PEN failure mode still triggers Reg 722.312.2.1 in both cases.',
              'Match RCD type (AC, A, F, B per Reg 531.3.3 and BS EN 62423) to the actual residual-current waveform the load and any PCE produce.',
              'Apply Reg 411.3.4 (NEW — domestic luminaire RCDs) and identify the correct EICR coding for non-compliance after 15 April 2026.',
              'Recognise when Reg 419 alternatives apply and document the design route taken when ADS cannot deliver Section 411 disconnection times.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>AFDD — Arc Fault Detection Device</ContentEyebrow>

          <ConceptBlock
            title="What an AFDD detects (and why an MCB / RCD will not)"
            plainEnglish="An AFDD watches for the high-frequency electrical noise that arcing produces — a degrading termination, a chafed flex behind the wardrobe, a stapled-through cable that has cooked over years."
            onSite="The arcing current can be well below the MCB trip threshold (so no overcurrent — no MCB trip) and well below 30 mA to earth (so no RCD trip), yet still pump enough heat into the surrounding combustibles to ignite them. The AFDD is a fire-prevention device, not a shock-protection device."
          >
            <p>
              AFDDs (BS EN 62606) work by signal-processing the current waveform, looking for the
              characteristic broadband noise that arcing produces. There are two arc-fault classes:
              <strong> series-arc</strong> faults (a single conductor with a degrading
              high-resistance termination — a loose neutral in a back-box, a corroded crimp) and
              <strong> parallel-arc</strong> faults (insulation breakdown causing arcing between
              line and neutral, or line and earth). Both are invisible to a conventional MCB or RCD.
              AFDDs combine arc-pattern recognition with overcurrent and (typically)
              residual-current functions in a single device — an "AFDD-RCBO" is the common form
              factor.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 421.1.7 — Arc Fault Detection Devices"
            clause="Arc Fault Detection Devices (AFDDs) conforming to BS EN 62606 shall be provided to mitigate the risk of fire in final circuits of fixed installations in specified premises types. In other premises, the provision of AFDDs should be considered."
            meaning="Mandatory in the listed higher-risk premises (sleeping accommodation in HMOs, certain care premises, premises with combustible-construction or heritage / irreplaceable-content concerns — read the published regulation against your specific building category). Recommended elsewhere — fitting them is rarely wrong; omitting them needs to be a documented design decision."
            cite="BS 7671:2018+A4:2026, Reg 421.1.7 (in force 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>PEI — Prosumer Electrical Installation</ContentEyebrow>

          <ConceptBlock
            title="From consumer to prosumer"
            plainEnglish="A consumer takes energy from the grid. A prosumer also produces energy — PV exports, battery discharge to grid, V2G EV — so net energy flows in both directions at the supply interface."
            onSite="The line is crossed the moment the installation can export. A 4 kW PV array makes the property a prosumer. A 5 kWh battery makes it more so. A V2G-capable EV charger fully closes the loop. Reg 530.3.201 (bidirectional protective devices) and Reg 551.7.1 (parallel sources) become live design considerations on the same day the system is energised."
          >
            <p>
              GN3 / A4 treats PEI (Prosumer Electrical Installation) as the umbrella term. The
              definition is functional, not commercial: it does not matter whether the customer has
              an export tariff or whether they are net-positive over the year. What matters is that
              bidirectional energy flow is possible at the supply interface. Once it is, the
              installation must be designed against the parallel-source rules (Reg 551.7.1), the
              bidirectional-device rules (Reg 530.3.201), and the relevant Part 7 sections (Section
              712 for PV, Section 722 for EV, Section 826 for battery) — and the cert form must
              declare the parallel-source presence in the supply-characteristics block.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Bidirectional energy flow — what the term actually requires"
            plainEnglish="Net current can pass through the supply interface in both directions over the operating cycle. Source-to-load AND load-to-source."
            onSite="The supply tails are no longer 'mains in' — they are a bidirectional energy port. Phasing, sequencing, anti-islanding (G98 / G99) and parallel-source coordination all sit on top of the BS 7671 protective design."
          >
            <p>
              Bidirectional energy flow is what links the term "prosumer" to actual installation
              design. A unidirectional grid-tie inverter will not export — it has no interface to do
              so. A grid-following inverter without battery cannot island — it shuts down on grid
              loss. A battery hybrid inverter with G99 functions can island AND export. Each
              functional level shifts the protective-device requirements, the labelling
              requirements, and the cert declarations. A4 codifies this in the 530.3.201 / 551.7.1
              pair so the designer no longer has to reason from first principles.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Bidirectional protective devices — Reg 530.3.201</ContentEyebrow>

          <ConceptBlock
            title="Why direction of current flow matters for an MCB or RCBO"
            plainEnglish="A device specified only for the conventional source-to-load direction may have reduced breaking capacity, slower magnetic-trip response, or compromised arc-quench when current flows the other way."
            onSite="On a PEI, the 'load' side of a busbar protective device is the energised side at any given moment — battery discharging into the busbar, PV exporting through the busbar, EV in V2G feeding the busbar. The device must be rated for fault interruption when the source is upstream OR downstream."
          >
            <p>
              Reg 530.3.201 (NEW in A4) requires the designer to verify that protective devices in
              circuits where bidirectional current can flow are suitable for the actual current
              directions. This is a manufacturer-datasheet check: many modern MCBs, RCBOs and AFDD
              devices are explicitly marked "bidirectional" or "for use with parallel sources";
              legacy devices marked with a directional line/load arrow may NOT be suitable. The
              practical consequence: when re-fitting a domestic CU on a PEI, specify a range
              explicitly approved for bidirectional service across the entire CU rather than mixing
              directional and non-directional devices.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 530.3.201 — Bidirectional protective devices"
            clause="Where a protective device is installed in a circuit in which current can flow in both directions during normal operation (for example, in a Prosumer Electrical Installation), the device shall be selected to operate correctly for the maximum prospective fault current in either direction of current flow."
            meaning="A datasheet check, not a rule of thumb. The manufacturer must confirm the device is rated for bidirectional fault interruption — breaking capacity, magnetic-trip and arc-quench all verified in either direction. Mark this on the designer's circuit list and keep the datasheet reference."
            cite="BS 7671:2018+A4:2026, Reg 530.3.201"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>PNB — Protective Neutral Bonding (TN-C-S variant)</ContentEyebrow>

          <ConceptBlock
            title="PME vs PNB on the A4 cert form"
            plainEnglish="Both are TN-C-S. PME has the neutral earthed at multiple points across the DNO LV network. PNB has a single point of earth connection — typically at the customer cut-out for a private transformer."
            onSite="On the A4 cert form, the system-earthing dropdown now includes 'TN-C-S (PNB)' as a distinct option alongside 'TN-C-S (PME)', 'TN-S', 'TT' and 'IT'. Picking the right one is a designer's call after confirming with the DNO or the on-site infrastructure."
          >
            <p>
              The reason A4 splits PME and PNB is that the open-PEN failure-mode profile differs. In
              a PME network, multiple earth-connection points across the LV mains provide redundancy
              — an open PEN at one point does not necessarily collapse the local earth reference,
              because other earth points hold it. In a PNB arrangement (private transformer with a
              single earth point at the cut-out), the earth reference is by definition non-redundant
              — an open PEN there is the open PEN. The mitigations remain the same (Reg 461.2 — no
              switching of the PEN; Reg 722.312.2.1 — no PEN in EV circuits) but the cert
              classification reflects the network topology accurately.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why both PME and PNB still trigger Reg 722.312.2.1"
            plainEnglish="The EV-circuit PEN prohibition applies to ALL TN-C-S supplies — it is about the consequence of an open PEN, not the topology that produced it."
            onSite="When you fit an EV charger on either PME or PNB, you either (a) split N and PE upstream of the EV way and run the EV circuit as TN-S, or (b) apply an approved open-PEN protection device at the charge-point. Type AC RCDs are out either way; the upstream type depends on whether the charger is a 'PCE with simple separation'."
          >
            <p>
              Reg 722.312.2.1 (NEW in A4) is unconditional: an EV-charging circuit on a TN system
              shall not include a PEN conductor. The customer-side PNB single-point-earth case is
              actually a slightly higher-risk variant of the rule — the open-PEN consequence is not
              buffered by network redundancy. Designers commonly fit a CCS-style open-PEN detection
              relay at the charge-point on TN-C-S supplies (PME or PNB) and split N / PE at the
              consumer unit specifically for the EV way. The cert records the system as TN-C-S (PME)
              or TN-C-S (PNB), and the EV-way arrangement separately as TN-S with the open-PEN
              protective device noted.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>PCE — Power Conversion Equipment</ContentEyebrow>

          <ConceptBlock
            title="The AC / DC interface inside the installation"
            plainEnglish="A PCE is anything that converts AC to DC, DC to AC, or DC to a different DC voltage — inverters, EV chargers, rectifiers, DC-DC converters, bidirectional charge controllers."
            onSite="Most domestic PEIs contain at least three: the PV inverter, the battery hybrid inverter (or the BMS-side charger), and the EV charger. Each PCE has its own DC and AC sides, its own residual-current footprint, and its own internal DC fault detection (or lack of it)."
          >
            <p>
              The PCE term lets BS 7671 talk about the AC / DC interface without specifying every
              device class. What matters for the upstream design is whether the PCE provides
              <strong> simple separation</strong> between its DC and AC sides AND
              <strong> internal DC residual-current detection</strong> at the 6 mA threshold per the
              relevant product standard (BS EN 61851 for EV charging, the inverter standards for PV
              / battery). A "PCE with simple separation" lets a Type A 30 mA RCD upstream suffice. A
              PCE without it forces Type B upstream — because smooth DC residual would otherwise
              pass through to the upstream RCD, and only Type B can see smooth DC.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <ConceptBlock
            title="Type AC, A, F and B — the residual-current waveform map"
            plainEnglish="A2 added Type F awareness, A3 reinforced Type A as the domestic baseline, A4 confirms when Type B is mandatory. Pick the wrong type and the device is blind to the very fault it is meant to clear."
            onSite="Type AC sees only sinusoidal AC residual — now obsolete domestically. Type A sees AC + pulsating DC (the modern domestic baseline). Type F adds composite high-frequency residual (single-phase VSDs, some heat pumps). Type B sees smooth DC residual on top of all of the above (three-phase VSDs, EV chargers without internal DC detection, larger PV / battery hybrids)."
          >
            <p>
              Reg 531.3.3 requires the designer to match RCD waveform sensitivity to the actual
              residual-current spectrum the load can produce. The mistake to avoid is treating "RCD"
              as a single product. A 100 mA Type AC upstream RCD on a board feeding modern LED
              lighting, an air-source heat pump and an EV charger may already be defeated: pulsating
              DC from the lighting drivers and smooth DC from the EV charger fall outside its
              detection window. Confirm against the equipment manufacturer's installation guidance —
              and the PCE specification — before committing a type. This is product standard BS EN
              62423 territory: Type F and Type B are both defined there; Type A and Type AC are
              defined in BS EN 61008 / BS EN 61009.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Reg 411.3.4 — luminaire RCD (NEW in A4)</ContentEyebrow>

          <ConceptBlock
            title="The headline domestic A4 change"
            plainEnglish="From 15 April 2026, every AC final circuit supplying luminaires within domestic premises must have 30 mA RCD additional protection."
            onSite="On a CU upgrade or rewire, default to RCBOs across every way. The cost difference is small; the design defensibility is large. Lighting circuits on a Type B 6 A MCB without RCD are non-compliant from the in-force date — no risk-assessment exception applies."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.4 — Additional requirements for circuits with luminaires (NEW IN A4)"
            clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning="Mandatory ('shall'), unconditional within scope, no risk-assessment exception. Applies to every AC final circuit feeding luminaires inside a private dwelling — kitchen, bedroom, hallway, loft, outside lights — not just bathroom or kitchen."
            cite="BS 7671:2018+A4:2026, Reg 411.3.4 (in force 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Reg 419 group — alternatives where ADS not feasible</ContentEyebrow>

          <ConceptBlock
            title="When the loop impedance just will not behave"
            plainEnglish="On very long circuits, certain agricultural / heritage installations and remote plant rooms, the measured Zs sometimes cannot be brought below the Section 411 maximum. Reg 419 lists what to do instead."
            onSite="The 419 toolkit: double or reinforced insulation as the protective measure (Section 412), electrical separation (Section 413), non-conducting location, earth-free local equipotential bonding, or supplementary equipotential bonding sized so the touch voltage stays below 50 V during a fault. Each has narrow scope and a documentation burden — A4 sharpens the latter."
          >
            <p>
              Reg 419.1 (the parent regulation in the group) sets the principle: where ADS per
              Section 411 is not feasible, one of the alternative protective measures must be
              applied AND documented. A4 makes the documentation requirement explicit — the
              certificate must record which alternative is in use and why ADS could not be achieved.
              This is not a fallback to be reached for casually; the designer carries the burden of
              justification under Reg 120.3 if the route is challenged. In practice Reg 419 routes
              show up on EVSE installations with very long sub-mains, agricultural feeds, and some
              heritage work where rewiring the existing protective conductor is not possible.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Open-PEN protection devices for EV charging on TN supplies"
            plainEnglish="An open-PEN protection device is a relay at the EV charge-point that monitors line-to-earth voltage and disconnects the EV circuit if the PEN above the property fails."
            onSite="Modern domestic chargers commonly bundle an integrated open-PEN protection function — but verify against the manufacturer datasheet, not the marketing copy. The device must comply with the EV-charging product standards (BS EN 61851 family) and be commissioned per the installation manual. Without the open-PEN device AND without splitting N / PE upstream as TN-S, the EV install is non-compliant on a TN-C-S supply."
          >
            <p>
              The functional principle is simple: in a healthy TN-C-S supply, the line-to-earth
              voltage at the charger sits at the nominal phase voltage (≈230 V) and the
              neutral-to-earth voltage sits at near zero. If the PEN opens upstream, the load
              current still flowing through the property pushes the earth reference up — neutral and
              earth rise together, line-to-earth and line-to-neutral diverge from each other. The
              open-PEN protection device monitors that divergence and trips before the touch voltage
              on the vehicle becomes dangerous. It does not replace the BS 7671 requirements for
              upstream RCD type, AFDD provision (where in scope), or the cert-form declarations — it
              is an additional layer specific to the TN-C-S EV-charging risk that Reg 722.312.2.1
              addresses directly.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Issuing an EIC against the A3 model form after 15 April 2026"
            whatHappens="Designer is mid-project on 10 March 2026, completes the install on 20 April 2026, and prints the EIC against the A3:2024 model form because that is what the certification software defaulted to. The cert is missing the Reg 411.3.4 luminaire-RCD declaration row, the AFDD declaration row, and the TN-C-S (PNB) classification option."
            doInstead="Once A4 is in force, the cert must be issued against the in-force edition. Update the certification software to the A4 model form before 15 April 2026. If the design genuinely predates A4 and only meets A3, the route is a documented Reg 120.3 departure — not silently using the obsolete model form. Burden of justification sits with the designer."
          />

          <CommonMistake
            title="Fitting Type AC RCDs on a modern domestic CU upgrade"
            whatHappens="Installer fits Type AC 30 mA RCBOs throughout because they are cheaper and 'an RCD is an RCD'. The board feeds LED lighting, phone chargers, an induction hob and a heat pump — all of which produce some pulsating DC residual. The Type AC devices are blind to it; the additional-protection function is not reliably delivered. EICR coding is typically C2 — potentially dangerous."
            doInstead="Type A is the 2026 domestic baseline (Reg 531.3.3). Specify Type A 30 mA RCBOs as standard, Type F where single-phase VSD-driven loads dominate (some heat pumps, some appliance circuits), Type B where smooth DC residual can occur and is not handled by an upstream PCE (some EV ways, some PV / battery ways). Type AC has no place on a 2026 domestic install."
          />

          <CommonMistake
            title="Calling a PEI 'just a domestic with PV bolted on'"
            whatHappens="Customer adds a 4 kW PV array, a 5 kWh battery and later a V2G EV charger. The original certifying engineer treats each addition as a minor works and never re-classifies the installation as a PEI. Reg 530.3.201 (bidirectional devices) is not assessed; the existing CU contains directional MCBs marked line/load that are not approved for parallel-source service; the cert form never declares parallel sources in the supply block."
            doInstead="The moment an installation crosses the bidirectional-energy-flow threshold (typically the PV addition), it is a PEI. Re-classify on the cert. Verify every busbar protective device is rated for bidirectional service per Reg 530.3.201. Confirm the parallel-source declaration is on the cert (Reg 551.7.1). Issue an EIC for the upgraded installation as a whole, not a string of minor works."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Designer using the A3 model form after 15 April 2026"
            situation="A consultant designer issues a CU-upgrade EIC dated 20 April 2026. The certification software still defaults to the A3:2024 model form. The cert lists TN-C-S (PME) but the property is actually fed from a private farm transformer (single-customer earth point — PNB). The schedule of inspection has no row for AFDDs and no explicit Reg 411.3.4 declaration."
            whatToDo="Stop. Do not issue the cert in this form. Update the certification software to the A4:2026 model form (or use a vendor's confirmed-A4 template). Re-classify the supply as TN-C-S (PNB). Add the Reg 411.3.4 declaration (mandatory on any AC final circuit supplying luminaires within the dwelling). Confirm the AFDD declaration — required if the premises falls into the Reg 421.1.7 mandatory category, otherwise recorded as 'considered, not provided' with a brief justification."
            whyItMatters="An EIC is a legal record. Issuing it against the wrong edition at certification date undermines the documentary basis of the install. If a fire investigation later asks 'was the installation certified to the in-force edition of BS 7671?', the answer must be yes. The A3 form fails that question on a 20 April 2026 cert. Reg 120.3 lets you depart from a specific clause with documented justification — it does not let you certify against the wrong edition wholesale."
          />

          <Scenario
            title="Installer fits Type AC RCBOs on a 2026 domestic CU"
            situation="Customer asks for a like-for-like CU replacement on a 1990s 4-bedroom house. Installer reaches for a stock of Type AC 30 mA RCBOs because they are 30% cheaper than Type A and 'the existing board has worked fine for 30 years'. The new house contains LED lighting throughout, an induction hob, a heat pump (added 2024), and an EV charger socket added 2025."
            whatToDo="Refuse the like-for-like Type AC route. The 2026 load profile is not the 1990s load profile — virtually every modern domestic load produces pulsating DC residual, and the EV charger produces smooth DC residual that the upstream RCD must handle (unless the charger is a PCE with simple separation and 6 mA DC detection — check the spec sheet). Specify Type A 30 mA RCBOs across the board as the baseline. Add a Type B 30 mA RCD on the EV way if the charger does not handle DC residual itself. Confirm AFDD requirement against Reg 421.1.7 for the specific premises type."
            whyItMatters="Type AC RCBOs on a modern domestic load are an EICR observation waiting to happen — and an inspector's pen is not the worst-case outcome. The next-worst-case is a fire or an electric shock incident where the additional-protection device was specified but materially compromised. The cost difference between Type AC and Type A across a 12-way CU is small; the design defensibility difference is large."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference — the A4 vocabulary</ContentEyebrow>

          <ConceptBlock
            title="One-line definitions to keep on the design log"
            plainEnglish="A glossary cribsheet for the A4 vocabulary — the words that change how the cert form is filled in."
            onSite="Pin this to the inside of the desk drawer. AFDD, PEI, prosumer, bidirectional, PNB, PCE, Type A / B, Reg 411.3.4, Reg 419, Reg 530.3.201 — the ten terms that define A4-era design."
          >
            <p>
              <strong>AFDD</strong> — Arc Fault Detection Device, BS EN 62606. Fire-prevention via
              series and parallel arc detection. Mandatory in higher-risk premises per Reg 421.1.7;
              recommended elsewhere. <strong>PEI</strong> — Prosumer Electrical Installation. Any
              installation where bidirectional energy flow is possible at the supply interface.{' '}
              <strong>Prosumer</strong> — the consumer who is also a producer. Functional
              definition; net annual import is irrelevant.{' '}
              <strong>Bidirectional energy flow</strong> — net current can pass through the supply
              interface in both directions over the operating cycle. <strong>PNB</strong> —
              Protective Neutral Bonding. TN-C-S variant with a single point of earth connection
              (private transformer); distinct from PME on the A4 cert form. <strong>PCE</strong> —
              Power Conversion Equipment. Any inverter, converter, rectifier or DC-DC unit at the AC
              / DC interface. A "PCE with simple separation" handles its own 6 mA DC fault detection
              and lets a Type A upstream RCD suffice. <strong>Reg 411.3.4</strong> — 30 mA RCD
              additional protection mandatory on AC luminaire final circuits within domestic
              premises. <strong>Reg 419</strong> — alternatives where ADS cannot deliver the
              disconnection time; documented design route. <strong>Reg 530.3.201</strong> —
              bidirectional protective devices required where current can flow in both directions
              during normal operation (PEI). <strong>Reg 551.7.1</strong> — parallel sources of
              supply: the regulation that governs how PV, battery and grid coordinate.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'AFDDs (Reg 421.1.7, BS EN 62606) target series and parallel arc faults — fire ignition that an MCB or RCD will not see. Mandatory in specified higher-risk premises; recommended elsewhere.',
              'PEI = Prosumer Electrical Installation. The moment bidirectional energy flow is possible, Reg 530.3.201 (bidirectional devices) and Reg 551.7.1 (parallel sources) apply.',
              'A4 distinguishes TN-C-S (PME) from TN-C-S (PNB) on the cert form. Both still trigger Reg 722.312.2.1 — no PEN in EV circuits.',
              'PCE (Power Conversion Equipment) with simple separation + 6 mA DC detection lets Type A 30 mA RCD upstream suffice. Without it, Type B is mandatory upstream (BS EN 62423).',
              'Reg 411.3.4 (NEW) — 30 mA RCD additional protection on every AC luminaire final circuit within domestic premises. No exceptions.',
              'Reg 419 — alternatives where ADS not feasible. A4 sharpens the documentation burden: record which alternative is in use and why ADS could not be achieved.',
              'After 15 April 2026, certs must be issued against the A4 model form. Using the A3 form is not a Reg 120.3 departure — it is the wrong edition.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-2-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.4 Amendment 4 highlights
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module2Section3;
