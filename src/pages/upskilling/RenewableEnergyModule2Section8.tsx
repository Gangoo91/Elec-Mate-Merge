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
import { ResidentialPvSld } from '@/components/study-centre/diagrams/renewableSld';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm2s8-what-is-sld',
    question:
      'What is a PV single-line diagram (SLD)?',
    options: [
      'A photograph of the install',
      'A schematic representation of the PV system showing every electrical component in single-line form — modules / strings, DC cables, isolators, fuses, inverters, AC cables, protective devices, meter, grid connection. The design artefact that captures the as-designed and as-installed electrical topology',
      'The customer\'s wiring diagram for the house',
      'A 3D model',
    ],
    correctIndex: 1,
    explanation:
      'An SLD (single-line diagram) is a simplified schematic showing the PV electrical system in single-line form (one line representing the actual conductors). Every major electrical component appears: PV modules grouped into strings, combiner boxes, DC isolators, the inverter(s), AC isolators, protective devices (fuses, RCDs, MCBs), the meter, the DNO connection. The SLD is the primary design artefact for the PV install — used at design stage to specify the system, at install stage to verify the as-built matches the design, at handover to the customer / DNO / inspector, and at later EICR for diagnostic reference.',
  },
  {
    id: 'm2s8-sld-purpose',
    question:
      'Who actually reads the SLD?',
    options: [
      'Nobody',
      'The designer at design stage; the installer at install stage; the customer at handover; the DNO during G99 approval; the MCS auditor during scheme audit; the EICR inspector at periodic inspection; the next contractor on any future addition or alteration. Multiple audiences over a 25+ year install life',
      'Only the installer',
      'Only the customer',
    ],
    correctIndex: 1,
    explanation:
      'The SLD has multiple audiences over the install\'s lifetime. The designer drafts it; the installer builds against it; the customer receives it in the handover pack; the DNO references it for G99 approval; the MCS auditor cross-checks the design pack against the SLD; the EICR inspector uses it as a diagnostic baseline; the next contractor needs it before adding to the install. Each audience reads it at different levels of detail — the customer needs the high-level topology; the inspector needs the protection arrangement; the DNO needs the grid-interface detail.',
  },
  {
    id: 'm2s8-sld-symbols',
    question:
      'A PV SLD uses standardised electrical symbols. Which combination of symbols typically appears on a residential PV SLD?',
    options: [
      'Random shapes',
      'Module symbol (typically a rectangle with diagonal slash and small triangles representing cells); string interconnection lines; DC isolator (switch symbol); inverter (rectangle with internal converter symbol); AC isolator; protective devices (fuse, MCB, RCD); meter (M in a circle); DNO connection (triangle or transformer symbol)',
      'Only the inverter shape',
      'Only the modules',
    ],
    correctIndex: 1,
    explanation:
      'PV SLDs use BS EN 60617 / IEC 60617 standardised electrical symbols where applicable, plus some PV-specific conventions. The module symbol (rectangle with diagonal indicating PV cell type), string interconnection (single lines representing the series-connected modules), DC isolator (switch symbol with DC indicator), inverter (rectangle with internal converter / wave-shape), AC isolator (standard switch symbol), protective devices (fuse rectangles, MCB / RCD blocks per BS 7671 conventions), meter (M in circle for utility, separate symbols for generation meter and import meter), DNO connection (triangle or transformer symbol depending on the connection type).',
  },
  {
    id: 'm2s8-protection-on-sld',
    question:
      'How does the SLD communicate the protection arrangement?',
    options: [
      'It doesn\'t',
      'Every protective device appears with its type and rating — fuse ratings, RCD type (A / B / F), MCB curve and rating, surge protective device class. The protection coordination — which device protects which circuit on which fault — is readable from the SLD topology, particularly the per-string fuses per Reg 712.431 (Section 2.3), the RCBO at the consumer unit per Reg 531.3.3 and Reg 551.7.1(d) (Section 2.5)',
      'Only the consumer unit RCD',
      'Only the AC isolator',
    ],
    correctIndex: 1,
    explanation:
      'The protection arrangement is one of the SLD\'s primary outputs. Every protective device appears with its type and rating annotated: per-string gPV fuses (where Reg 712.431 requires them); DC surge protective device at the combiner box; AC isolator at the inverter output; RCBO at the consumer unit (Type A or Type B per the inverter datasheet — Reg 531.3.3); AC surge protective device. The SLD is the audit artefact for the protection coordination — the inspector / auditor reads which device protects which circuit and against which fault.',
  },
  {
    id: 'm2s8-isolation-on-sld',
    question:
      'How does the SLD communicate the isolation arrangement?',
    options: [
      'No isolation shown',
      'Every isolation point appears with its location, accessibility (locked / readily accessible), and the warning notices required. Particularly: DC isolator at the inverter input (or per-string at combiner box on multi-string designs); AC isolator at the inverter output; lockable disconnection per Reg 551.7.6 / DNO requirements; warning notices per the OSG signposting (Module 1 Section 3) — at the incomer and at the roof / array',
      'Just the main switch',
      'Only one isolator',
    ],
    correctIndex: 1,
    explanation:
      'Isolation is the second major protection-and-safety theme on the SLD. Every isolation point appears with location and accessibility. DC isolator at the inverter input (or at the combiner box on multi-string designs) — readily accessible for safe-isolation maintenance. AC isolator at the inverter output — readily accessible for testing the AC side. The lockable disconnection per Reg 551.7.6 (Section 1.5) — typically at a location agreed with the DNO. Warning notices at the incomer and at the roof / array, per OSG signposting (Section 1.3). The cert evidence bundle records the isolation arrangement against the SLD.',
  },
  {
    id: 'm2s8-cert-evidence',
    question:
      'The SLD is part of the cert evidence bundle. What other documents accompany it?',
    options: [
      'Just the cert',
      'BS 7671 EIC (with the Reg 133.1.3 equipment-usage records, the departure register per Reg 120.3 if applicable, the test results); MCS certificates (MIS 3002 for PV); inverter datasheet (BS EN 62109-1/-2 conformity); module datasheet (BS EN 61730 conformity); DNO G98/G99 notification reference; CPS Part P notification reference; survey artefact; customer handover pack; commissioning baseline records (V_oc, I_sc, IR, continuity per BS EN 62446-1)',
      'Only the customer\'s satisfaction survey',
      'Just the inverter manual',
    ],
    correctIndex: 1,
    explanation:
      'The cert evidence bundle for a PV install (Module 1 Section 8) is comprehensive. The SLD is the single most-referenced document because it shows the system topology — but it sits alongside the EIC, the MCS certificates, the equipment datasheets, the DNO and CPS notifications, the survey artefact, the customer handover pack, and the commissioning baseline records. The bundle is retained electronically with off-site backup for the install\'s 25+ year operational life.',
  },
  {
    id: 'm2s8-sld-evolution',
    question:
      'A PV install evolves over time (battery added in year 3, EV charger added in year 5, heat pump added in year 7). What happens to the SLD?',
    options: [
      'The original SLD stays unchanged',
      'The SLD is updated at every install change — battery addition, EV charging addition, heat pump addition. The updated SLD captures the new topology, the additional protective devices, the changed isolation arrangement. The cert evidence bundle accumulates: original PV SLD + updated SLD post-battery + updated SLD post-EV + updated SLD post-heat-pump. Future contractors and inspectors read the SLD evolution as the install\'s design history',
      'A new install file is started',
      'The customer redraws it',
    ],
    correctIndex: 1,
    explanation:
      'The SLD is a living document for the install\'s lifetime. Every change — battery addition, EV addition, heat pump addition, inverter replacement, module replacement — should update the SLD. The updated SLD shows the new topology, the additional protective devices, the changed isolation arrangement. The cert evidence bundle accumulates the SLD versions; future contractors and inspectors read the design history. Chapter 82 PEI re-survey at each major change (Module 1 Section 5 and Section 2.7) drives the SLD update discipline.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A domestic single-string PV install — 12 × 400 W modules → DC isolator → single-MPPT string inverter → AC isolator → consumer unit. What level of SLD detail is appropriate?',
    options: [
      'Just photograph it',
      'Standard PV SLD: module array (showing the 12 modules in series), DC cable to inverter, DC isolator with rating, inverter symbol with model number, AC cable, AC isolator with rating, dedicated RCBO at consumer unit (with Type A/B per inverter datasheet), generation meter (where applicable for SEG), grid connection symbol. Annotated with string V_oc at STC, cold-day V_oc, inverter MPPT range, AC output capacity',
      'Hand-drawn sketch',
      'Just text description',
    ],
    correctAnswer: 1,
    explanation:
      'A residential single-string SLD is the most common pattern. The drawing shows all major components — modules, isolators, inverter, protective devices, meter, grid — at the same level of detail. Cable sizes annotated where they affect the design. Protection ratings annotated. Manufacturer model numbers for the inverter and modules. The SLD is typically produced in CAD (AutoCAD, Visio) or a PV-specific design tool (PVsyst, OpenSolar); hand-drawn sketches are not appropriate for a cert evidence bundle on a funded install.',
  },
  {
    id: 2,
    question:
      'A hybrid PV+BESS install (DC-coupled hybrid inverter). What additional SLD content vs PV-only?',
    options: [
      'Nothing additional',
      'Battery symbol with capacity rating; battery-side cable to the hybrid inverter; battery isolator; backup port output to a separate essential-loads consumer unit (if backup configured); standard consumer unit (general loads) from the grid-side output. Chapter 82 PEI design records reference the SLD',
      'Just add a label',
      'Bigger inverter symbol',
    ],
    correctAnswer: 1,
    explanation:
      'A hybrid PV+BESS SLD shows the additional battery topology. Battery symbol (typically a rectangle with battery markings and capacity in kWh). Battery-side DC cable to the hybrid inverter\'s battery port. Battery isolator (for safe-isolation maintenance). Backup port output (where configured) feeding the essential-loads consumer unit. Standard consumer unit fed from the grid-side output. The Chapter 82 PEI design records (load management priorities, multi-source fault analysis, protection coordination) reference the SLD as the topology artefact.',
  },
  {
    id: 3,
    question:
      'A commercial install: 50 kWp PV across two roof pitches, 100 kWh BESS, 6 × 22 kW EV chargepoints, all on a TN-S supply with separate metering. What SLD complexity is appropriate?',
    options: [
      'Single page is enough',
      'Multi-page SLD covering: (1) PV side — sub-arrays per pitch, combiner boxes, DC isolators, per-string protection per Reg 712.431, inverter input; (2) inverter side — hybrid inverter or commercial PV inverter + battery inverter, internal DC bus / AC bus topology; (3) AC side — distribution board, EV chargepoint circuits, surge protective devices, meter arrangement; (4) DNO interface — main switch, current transformers, DNO meter, G99 protection scheme. Each page detailed for its discipline; cross-references between pages',
      'Just a sketch',
      'Photo of the install',
    ],
    correctAnswer: 1,
    explanation:
      'Commercial-scale PV+BESS+EV installs need multi-page SLDs to capture the system\'s complexity. Each discipline (PV, battery, AC distribution, EV charging, DNO interface) gets its own SLD sheet with appropriate detail. Cross-references between sheets show the connections. The Chapter 82 PEI design pack on a commercial install is substantially more detailed than the residential equivalent — load management, multi-source fault current contribution, protection coordination across multiple sources all documented at sheet-level detail.',
  },
  {
    id: 4,
    question:
      'A G99 application to the DNO requires the SLD as part of the submission. What does the DNO read on the SLD?',
    options: [
      'Just the cover page',
      'The DNO reads: total generation capacity (per inverter, aggregated for the install), the connection point to the public supply, the protection scheme (anti-islanding, prevention of reconnection, isolation per Reg 551.7.4–551.7.6), the metering arrangement, any G100 export-limitation scheme. The DNO\'s G99 approval is conditional on the SLD showing acceptable arrangements',
      'Only the customer\'s name',
      'Module brand only',
    ],
    correctAnswer: 1,
    explanation:
      'The DNO\'s G99 review focuses on the public-supply interface. The SLD must show: aggregated generation capacity (PV + battery export capability); connection point to the public supply; protection scheme satisfying EREC G99 requirements (anti-islanding, prevention of reconnection, isolation); metering arrangement (generation meter, import meter); any G100 export-limitation scheme (where applicable). The DNO\'s approval is conditional on the SLD demonstrating compliant arrangements. Submitting an incomplete or unclear SLD delays the G99 approval; the cleaner the SLD, the faster the approval.',
  },
  {
    id: 5,
    question:
      'An MCS audit examines a sampled job. The SLD is one of the design pack records the auditor reviews. What does the auditor look for?',
    options: [
      'Pretty drawings',
      'Conformance to MIS 3002 (PV) design pack requirements — sub-array organisation per MPPT input, string sizing calculations cross-referenced, per-string protection per Reg 712.431, inverter selection rationale, cold-day V_oc calculation, MPPT range compatibility check, manufacturer-spec heat dissipation arrangement, customer handover documentation. Plus the SLD\'s alignment with the as-installed system',
      'Customer\'s signature only',
      'Inverter colour',
    ],
    correctAnswer: 1,
    explanation:
      'The MCS auditor reviews the SLD as part of the MIS 3002 design pack check. The audit verifies: the SLD shows the install topology and matches the as-installed system; the string sizing calculations (Section 2.3 cold-day V_oc, MPPT compatibility) are cross-referenced to the SLD; the per-string protection (Reg 712.431) is shown where required; the inverter selection rationale is documented; the manufacturer-spec heat dissipation arrangement is captured; the customer handover documentation references the SLD. Major finding: SLD inconsistent with the as-installed system, or design pack records missing.',
  },
  {
    id: 6,
    question:
      'At handover, the customer receives the cert evidence bundle including the SLD. What\'s the right framing for the customer?',
    options: [
      '&ldquo;Here\'s some paperwork&rdquo;',
      'Explain the SLD as the system\'s &ldquo;design map&rdquo; — it shows what was installed, where the safety isolation points are, where the protective devices sit, and forms the diagnostic baseline for any future inspection or fault. Note that any future contractor adding to the install (battery, EV charger, heat pump) will need this SLD to design the addition correctly. Retain electronically and as a paper copy with the conveyancing documents',
      '&ldquo;Throw it away&rdquo;',
      'No explanation needed',
    ],
    correctAnswer: 1,
    explanation:
      'The customer\'s relationship with the SLD lasts the install\'s lifetime. Explain it as the system\'s design map; the safety document for understanding isolation points; the diagnostic baseline for future faults; the design reference for future additions. Encourage electronic retention (cloud storage) and paper retention with conveyancing documents — the SLD becomes part of the property\'s value chain at sale. Customer-side maintenance of the SLD is part of the install\'s long-term value.',
  },
  {
    id: 7,
    question:
      'An EICR inspector at year 5 finds the as-installed system differs from the original SLD (additional combiner box added, different inverter brand, modules moved). What\'s the right inspection finding?',
    options: [
      'Ignore the discrepancy',
      'Flag the discrepancy in the EICR. The original SLD is no longer the truth of the install. Investigate whether the changes were properly documented (updated SLD, MCS Product List for the replacement inverter, Section 712 design checks re-done for the new module / inverter combination). Where documentation is missing, code per GN3\'s "relevant criteria" doctrine — the criteria for the install includes the designer\'s spec, which the change may have departed from',
      'Issue a new EIC',
      'Just check the inverter',
    ],
    correctAnswer: 1,
    explanation:
      'SLD-vs-reality discrepancies are an EICR observation. The inspector\'s job is to verify the install meets the relevant criteria (Module 1 Section 3 — GN3\'s "relevant criteria" doctrine). The original SLD captures the designer\'s spec; departures from that without documentation are departures from the relevant criteria. The inspection finding: investigate the discrepancy; check whether the changes were properly documented and certified; code per the severity (typically C2 for safety-related undocumented changes, C3 for functional changes without safety impact, FI where the inspector cannot determine the impact).',
  },
  {
    id: 8,
    question:
      'A customer in 2031 wants to sell the property. The PV install is now 6 years old. The SLD from the original install is part of the conveyancing documents. Why does this matter?',
    options: [
      'It doesn\'t',
      'Property sale includes the PV install\'s warranty, MCS certificate (which transfers to the new owner), and the SLD / cert evidence bundle as part of the install\'s design history. A complete bundle supports the property value and helps the new owner understand the system. An incomplete bundle reduces buyer confidence and may trigger price negotiation',
      'Just for the seller',
      'Only for tax',
    ],
    correctAnswer: 1,
    explanation:
      'The PV install\'s cert evidence bundle (including the SLD) is part of the property\'s value at sale. A complete bundle (EIC, SLD, MCS certificate, inverter and module datasheets, commissioning baseline, DNO and CPS notifications, customer handover pack) supports the property valuation and helps the new owner understand the install. An incomplete bundle reduces buyer confidence — the buyer may discount the offer to allow for diagnosis costs or future EICR work on a poorly-documented install. The 25+ year SLD discipline pays back at the property sale, not just at install.',
  },
];

const faqs = [
  {
    question:
      'What software is used to produce PV SLDs?',
    answer:
      'For residential installs, simple-to-mid-complexity SLDs are typically produced in Visio, draw.io, or a PV-design package like OpenSolar (which generates SLDs as part of its design workflow). Commercial installs use AutoCAD or similar CAD packages for the multi-sheet SLDs. PV-specific design tools (PVsyst, HelioScope) generate SLDs as part of the energy modelling output. The choice depends on installer preference and install scale. The cert evidence bundle accepts any clear, complete SLD regardless of the producing software.',
  },
  {
    question:
      'How detailed should the SLD be — is there a standard level?',
    answer:
      'MIS 3002 design pack expectations set the residential PV SLD baseline: every major electrical component shown; cable sizes annotated where they affect the design; protective device ratings annotated; inverter and module model numbers; cold-day V_oc and STC string V_oc captured. Commercial / utility-scale installs use multi-sheet SLDs with substantially more detail (per-sub-array sheets, AC distribution sheets, DNO interface sheets). The IET Code of Practice for Grid-Connected Solar PV Installations is the operational reference for SLD content expectations.',
  },
  {
    question:
      'Does the SLD need to be drawn to scale?',
    answer:
      'No — SLDs are schematic representations, not scale drawings. The objective is electrical clarity, not geometric accuracy. Module arrangements are shown as electrical groupings (strings) rather than physical positions on the roof. A separate physical layout drawing (or photographs) shows the as-installed mechanical arrangement. The two artefacts are complementary: SLD for electrical topology; layout drawing for mechanical / physical arrangement.',
  },
  {
    question:
      'What standard symbols should I use?',
    answer:
      'BS EN 60617 / IEC 60617 is the standardised electrical symbol set used in BS 7671 drawings. Some PV-specific symbols (e.g. the PV module symbol with the diagonal slash) extend the standard set. Most CAD and PV design tools include the standard library pre-loaded. Custom symbols should match the visual conventions of the standard library so the SLD is readable to anyone trained in BS 7671 drawing conventions.',
  },
  {
    question:
      'Should the SLD show the DC string operating voltage or just nominal?',
    answer:
      'Both, where space allows. Best practice: annotate each PV string with its STC V_oc, its cold-day V_oc (the worst-case design value from Section 2.3), and its V_mp range. The inverter MPPT range and absolute maximum DC input are annotated near the inverter symbol. This makes the SLD self-checkable — anyone reading it can verify the string-to-inverter voltage compatibility without going back to the design calculations. Compact SLDs may put the voltages in a separate annotation block; the choice is layout-driven.',
  },
  {
    question:
      'Should I produce a separate SLD for the AC side and DC side?',
    answer:
      'On residential installs, typically one combined SLD covers both. On commercial / multi-string installs, a sheet per side is common — DC side (modules, strings, combiner boxes, DC isolators, inverter inputs) and AC side (inverter outputs, distribution board, EV chargepoint circuits where applicable, meter, DNO connection). The multi-sheet approach makes each sheet readable at the appropriate level of detail without cluttering. Cross-references between sheets show the connections.',
  },
  {
    question:
      'How do I show the protection coordination on the SLD?',
    answer:
      'Each protective device appears with: device type (fuse, MCB, RCD, RCBO, SPD); rating (current, voltage, breaking capacity); discrimination class (where applicable). The SLD topology shows which device protects which circuit. For BS 7671 cert evidence, the SLD plus the Schedule of Inspections plus the Schedule of Test Results (per Appendix 6) together communicate the full protection coordination. Critical items — the bidirectional protective device per Reg 551.7.1(c), the per-string fuses per Reg 712.431, the RCD type per Reg 531.3.3 / Reg 551.7.1(d) — appear with explicit notes confirming the regulatory basis.',
  },
  {
    question:
      'What\'s the difference between an SLD and a wiring diagram?',
    answer:
      'An SLD is a schematic, simplified representation — one line per cable run regardless of the actual conductor count. A wiring diagram shows every individual conductor with its terminations, junction points, colour coding. Wiring diagrams are more detailed but harder to read for system overview. SLDs are easier to read for system topology but don\'t show the per-conductor detail. PV cert evidence typically includes the SLD; the wiring diagram is sometimes included for the inverter connection detail or for complex commercial installs where per-conductor termination matters.',
  },
  {
    question:
      'How does the SLD evolve through the install\'s 25+ year operational life?',
    answer:
      'The SLD is a living document. Every major install change updates the SLD — battery addition, EV charger addition, heat pump addition, inverter replacement, module replacement, layout change. The cert evidence bundle accumulates the SLD versions: original install SLD; updated SLD post each major change. The version history forms the install\'s design audit trail. Future contractors and inspectors read the SLD evolution to understand how the install grew over time. The discipline of updating the SLD at every change is part of the long-term value of the cert evidence bundle.',
  },
];

export default function RenewableEnergyModule2Section8() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Reading a PV single-line diagram | Renewable Energy 2.8 | Elec-Mate',
    description:
      'The PV single-line diagram (SLD) as the design artefact — what it shows, what symbols mean, how to read protection and isolation, how it serves the designer / installer / customer / DNO / inspector / next contractor over the install\'s 25+ year operational life.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 8 · BS 7671:2018+A4:2026"
            title="Reading a PV single-line diagram"
            description="The PV SLD as the design artefact — what it shows, what symbols mean, how to read protection and isolation, and how it serves multiple audiences over the install\'s 25+ year operational life."
            tone="yellow"
          />

          <TLDR
            points={[
              'A PV SLD (single-line diagram) is the schematic representation of the PV install\'s electrical topology — every major component (modules, strings, isolators, inverter, protective devices, meter, grid) shown in single-line form.',
              'Multiple audiences over the 25+ year install life: designer, installer, customer, DNO (for G99 approval), MCS auditor, EICR inspector, next contractor on future additions. Each reads the SLD at the appropriate level of detail.',
              'BS EN 60617 / IEC 60617 standardised electrical symbols plus PV-specific conventions. CAD or PV design tools (OpenSolar, PVsyst, AutoCAD) produce the SLD; hand-drawn sketches are not appropriate for cert evidence.',
              'Protection and isolation arrangements are the SLD\'s primary outputs — per-string fuses per Reg 712.431, RCBO type per Reg 531.3.3, bidirectional protective device per Reg 551.7.1(c), isolation accessibility per Reg 551.7.6, OSG signposting for warning notices.',
              'Living document — updated at every major install change (battery addition, EV addition, heat pump addition, inverter replacement). The SLD version history is the install\'s design audit trail in the cert evidence bundle.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Produce a complete PV SLD covering modules, strings, DC and AC topology, inverter(s), protective devices, isolators, meters and grid connection.',
              'Read standardised electrical symbols (BS EN 60617 / IEC 60617) and PV-specific conventions on an existing SLD.',
              'Communicate protection and isolation arrangements on the SLD — fuses, RCBOs, surge protective devices, DC and AC isolators, lockable disconnection per DNO requirements.',
              'Match SLD detail level to the audience — residential single-string SLD for domestic; multi-sheet SLD for commercial / hybrid / complex installs.',
              'Maintain the SLD as a living document — update at every major install change to preserve the design audit trail through the install\'s 25+ year life.',
              'Use the SLD as the diagnostic baseline at EICR and the design reference for future additions — connecting Section 712, Section 722, Chapter 57 and Chapter 82 requirements into a single visual artefact.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>The SLD is the system\'s design map. The cert evidence bundle is built around it.</Pullquote>

          <ContentEyebrow>What an SLD is and what it shows</ContentEyebrow>

          <ConceptBlock
            title="The SLD\'s job — communicate electrical topology simply"
            plainEnglish="An SLD is a schematic showing the PV install\'s electrical topology in single-line form. One line represents the actual conductors (single-phase or multi-phase); the focus is on connection topology and protection, not on per-conductor detail."
            onSite="The SLD is the primary design artefact. Designer drafts it; installer builds against it; customer receives it; DNO reviews it; auditor cross-checks it; inspector uses it; next contractor reads it. The discipline of clear, complete SLDs is the discipline of communicating the install across multiple audiences and 25+ years."
          >
            <p>What appears on a typical residential PV SLD:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV modules</strong> — typically shown
                grouped into strings; each string annotated with module count, model,
                STC V_oc and cold-day V_oc
              </li>
              <li>
                <strong className="text-white">DC cabling</strong> — single line per
                string showing the run from modules to combiner box / inverter; cable
                cross-section annotated where it affects the design
              </li>
              <li>
                <strong className="text-white">Combiner box (if used)</strong> — showing
                per-string fuses (where Reg 712.431 requires) and any DC surge protective
                device
              </li>
              <li>
                <strong className="text-white">DC isolator</strong> — at the inverter
                input (or at the combiner box on multi-string designs); annotated with
                rating
              </li>
              <li>
                <strong className="text-white">Inverter</strong> — type (string,
                microinverter, power optimiser + central, hybrid); model number; AC
                output rating; MPPT range and number of MPPTs; BS EN 62109-1/-2
                conformity
              </li>
              <li>
                <strong className="text-white">AC isolator</strong> — at the inverter
                output, readily accessible
              </li>
              <li>
                <strong className="text-white">Protective devices at consumer unit</strong>
                {' '}— RCBO of correct type per Reg 531.3.3 and the inverter datasheet
                (Type A or B); rating per the inverter\'s AC output
              </li>
              <li>
                <strong className="text-white">Generation meter</strong> — where applicable
                for SEG / commercial export metering
              </li>
              <li>
                <strong className="text-white">Grid connection</strong> — the point of
                common coupling with the DNO supply; the import / export metering
                arrangement
              </li>
              <li>
                <strong className="text-white">Warning notices</strong> — at the incomer
                and at the roof / array per OSG signposting (Module 1 Section 3)
              </li>
            </ul>
          </ConceptBlock>

          <ResidentialPvSld caption="A reference residential PV + storage single-line — DNO supply through the meter and consumer unit, feeding the hybrid inverter, EV charger, heat pump and final circuits. This is the drawing you reproduce on the EIC." />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Standard symbols and conventions</ContentEyebrow>

          <Pullquote>BS EN 60617 symbols plus PV conventions. Read once; produce consistently.</Pullquote>

          <ConceptBlock
            title="The symbol library — what each symbol means"
            plainEnglish="BS EN 60617 / IEC 60617 is the standardised electrical symbol set used in BS 7671 drawings. PV-specific symbols extend it for modules, strings, and PV-specific components. Most CAD and PV design tools include the standard library."
            onSite="Read the symbol library once; produce SLDs that match the convention every time. Inspectors, auditors and future contractors all read the same convention — non-standard symbols create ambiguity that wastes time and creates disputes."
          >
            <p>Common PV SLD symbols:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">PV module</strong> — rectangle with
                diagonal slash and small triangles representing cells; sometimes shown as
                multiple rectangles grouped into a string
              </li>
              <li>
                <strong className="text-white">String interconnection</strong> — single
                lines representing the series-connected modules; polarity marked at each
                end (+ and −)
              </li>
              <li>
                <strong className="text-white">DC isolator</strong> — standard switch
                symbol with &ldquo;DC&rdquo; or arrows indicating disconnection of both
                positive and negative poles
              </li>
              <li>
                <strong className="text-white">Inverter</strong> — rectangle with an
                internal symbol indicating DC-AC conversion (often a wave or sine-wave
                shape); annotated with model and rating
              </li>
              <li>
                <strong className="text-white">AC isolator</strong> — standard switch
                symbol with &ldquo;AC&rdquo; or single-pole / three-pole annotation
              </li>
              <li>
                <strong className="text-white">Fuse</strong> — rectangle with diagonal
                line (BS EN 60617); annotated with rating and type (gPV for PV
                application)
              </li>
              <li>
                <strong className="text-white">MCB / RCBO</strong> — standard BS 7671
                consumer unit conventions; annotated with rating and type
              </li>
              <li>
                <strong className="text-white">RCD type</strong> — annotated next to the
                RCD symbol — &ldquo;Type A&rdquo;, &ldquo;Type B&rdquo;, &ldquo;Type
                F&rdquo;
              </li>
              <li>
                <strong className="text-white">Surge protective device (SPD)</strong> —
                rectangle with diagonal arrow; class (Type 1, Type 2, Type 1+2)
                annotated
              </li>
              <li>
                <strong className="text-white">Meter</strong> — &ldquo;M&rdquo; in a
                circle for utility meter; separate symbols for generation meter and
                import meter
              </li>
              <li>
                <strong className="text-white">Battery</strong> — rectangle with battery
                markings; capacity in kWh annotated
              </li>
              <li>
                <strong className="text-white">Grid / DNO connection</strong> — triangle
                or transformer symbol depending on the connection type; annotated with
                supply characteristics (TN-S, TN-C-S, TT)
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Reading protection and isolation on the SLD</ContentEyebrow>

          <Pullquote>Every protective device, every isolation point, every warning notice — visible on the SLD.</Pullquote>

          <ConceptBlock
            title="Protection on the SLD — every device with type and rating"
            plainEnglish="The SLD\'s primary regulatory output is the protection coordination — which device protects which circuit against which fault. Every protective device appears with its type, rating, and the regulatory basis where it\'s a specific requirement."
            onSite="Read the SLD\'s protection topology before reading the test results. The protective devices on the SLD must match the design pack (string sizing calculations, fault current analysis, inverter datasheet requirements). The Schedule of Test Results in the EIC then verifies the as-installed performance."
          >
            <p>Protection items the SLD captures:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-string fuses</strong> (where Reg
                712.431 requires) — gPV fuses to BS EN 60269-6, in MC4-compatible holders
                or DIN-rail combiner box. Rating per the string sizing calculation
                (typically 1.25–1.5 × Isc_max)
              </li>
              <li>
                <strong className="text-white">DC surge protective device</strong> — at
                the combiner box, protecting the DC side against lightning-induced
                transients. Type 1 or Type 1+2 depending on the lightning risk
              </li>
              <li>
                <strong className="text-white">AC isolator</strong> — at the inverter
                output, readily accessible. Annotated rating
              </li>
              <li>
                <strong className="text-white">RCBO at consumer unit</strong> — Type A
                or B per Reg 531.3.3 and inverter datasheet; dedicated inverter circuit
                per Reg 551.7.1(d). Annotated with type and rating
              </li>
              <li>
                <strong className="text-white">AC surge protective device</strong> — at
                the consumer unit, protecting the AC side against transients
              </li>
              <li>
                <strong className="text-white">Bidirectional protective device</strong>
                {' '}— per Reg 551.7.1(c) on grid-tied LCT, annotated with the regulatory
                basis
              </li>
            </ul>
            <p>Isolation items the SLD captures:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">DC isolator</strong> — at the inverter
                input (or combiner box on multi-string); readily accessible for safe-
                isolation. Switching both positive and negative poles
              </li>
              <li>
                <strong className="text-white">AC isolator</strong> — at the inverter
                output; readily accessible
              </li>
              <li>
                <strong className="text-white">Lockable disconnection</strong> — per Reg
                551.7.6 / DNO requirements. Location agreed with DNO; accessible per
                national rules
              </li>
              <li>
                <strong className="text-white">Battery isolator</strong> (on hybrid
                installs) — at the battery interface; readily accessible
              </li>
            </ul>
            <p>Warning and instruction notices the SLD references (per BS 7671 Section 712):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">At the origin of the electrical
                installation</strong> — PV instruction notice indicating the presence of
                a photovoltaic system on the building (per Reg 712 instruction notice
                requirement)
              </li>
              <li>
                <strong className="text-white">At the metering position</strong> — if
                remote from the origin of the electrical installation, the PV instruction
                notice shall also be fixed at the metering position
              </li>
              <li>
                <strong className="text-white">At the consumer unit or distribution board
                supplied by the inverter</strong> — PV instruction notice at the CU / DB
                to which the inverter output is connected
              </li>
              <li>
                <strong className="text-white">At combiner boxes and inverter DC
                isolators</strong> — permanent warning notice about residual energisation
                after isolation. PV arrays and BESS can continue to feed live parts after
                local isolation (multiple interconnections, energy storage); the
                permanent warning informs operatives
              </li>
              <li>
                <strong className="text-white">At the roof / array</strong> — &ldquo;DC
                conductors live during daylight&rdquo; (OSG signposting; durable
                weather-resistant material)
              </li>
              <li>
                <strong className="text-white">At the battery</strong> (on hybrid
                installs) — battery-specific warnings per the manufacturer\'s
                requirements and Chapter 57 / IET CoP for EESS
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>SLD examples — three install patterns</ContentEyebrow>

          <ConceptBlock
            title="Pattern 1 — Residential single-string PV"
            plainEnglish="A 4–6 kWp PV install with a single string of 10–14 modules into a single-MPPT string inverter. The most common UK residential pattern. Single-sheet SLD."
            onSite="The pattern that appears in MIS 3002 design pack examples. One sheet. Single string from modules through DC isolator to inverter; single AC connection from inverter through RCBO to consumer unit. Generation meter where SEG is in scope. DNO connection at the supply intake."
          >
            <p>Pattern 1 SLD content:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>String of 10–14 modules (annotated with module model, count, STC V_oc, cold-day V_oc)</li>
              <li>DC cable to inverter (annotated cross-section)</li>
              <li>DC isolator at inverter input (annotated rating)</li>
              <li>String inverter (model number, AC output rating, MPPT range, BS EN 62109-1/-2 conformity)</li>
              <li>AC isolator at inverter output</li>
              <li>Dedicated RCBO at consumer unit (Type A or B per inverter datasheet, rating per AC output)</li>
              <li>Generation meter (where SEG in scope)</li>
              <li>Customer\'s existing consumer unit and grid connection</li>
              <li>Warning notices at incomer and roof</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pattern 2 — Residential hybrid PV + BESS"
            plainEnglish="A 5–8 kWp PV install with 10–20 kWh BESS into a DC-coupled hybrid inverter. The dominant pattern for new-build hybrid installs in 2026. Single-sheet or two-sheet SLD."
            onSite="The hybrid pattern adds the battery side and the backup port side to the standard SLD. The hybrid inverter handles PV MPPT, battery management, grid synchronisation, and backup port output in one product."
          >
            <p>Pattern 2 SLD content (additional to Pattern 1):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Hybrid inverter (model, PV MPPT inputs, battery input, AC output, backup port)</li>
              <li>Battery (capacity in kWh, chemistry, manufacturer model)</li>
              <li>Battery cable to inverter battery port (annotated cross-section)</li>
              <li>Battery isolator at the battery interface</li>
              <li>Backup port output (where configured) feeding the essential-loads consumer unit</li>
              <li>Standard consumer unit fed from the grid-side output (general loads)</li>
              <li>Chapter 82 PEI design records cross-referenced to the SLD</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pattern 3 — Commercial multi-MPPT PV + BESS + EV"
            plainEnglish="A 50+ kWp commercial PV install with multiple sub-arrays, multi-MPPT inverter or multiple inverters, BESS, EV charging, three-phase supply. Multi-sheet SLD with per-discipline sheets."
            onSite="Commercial-scale installs need multi-sheet SLDs. Each discipline gets its own sheet at appropriate detail. Cross-references between sheets show the connections. The Chapter 82 PEI design pack on a commercial install is substantially more complex than residential — load management, multi-source fault contribution, protection coordination all documented at sheet-level."
          >
            <p>Pattern 3 SLD structure — multi-sheet:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sheet 1 — PV side</strong> — sub-arrays per
                pitch, combiner boxes with per-string protection per Reg 712.431, DC
                isolators, cable runs to inverter inputs
              </li>
              <li>
                <strong className="text-white">Sheet 2 — Inverter side</strong> — multi-
                MPPT inverter or multiple inverters; internal architecture; AC output
                arrangement
              </li>
              <li>
                <strong className="text-white">Sheet 3 — BESS side</strong> — battery
                topology; battery management system; isolation; Chapter 57 / Chapter 82
                requirements
              </li>
              <li>
                <strong className="text-white">Sheet 4 — AC distribution</strong> — main
                AC distribution board; sub-distribution to EV chargepoints; circuit
                ratings and protection
              </li>
              <li>
                <strong className="text-white">Sheet 5 — DNO interface</strong> — main
                switch, current transformers, DNO meter, G99 protection scheme
              </li>
              <li>
                <strong className="text-white">Cross-reference sheet</strong> — overview
                showing how the sheets connect
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>The SLD as a living document — evolution over 25+ years</ContentEyebrow>

          <Pullquote>Every install change updates the SLD. The version history is the install\'s design audit trail.</Pullquote>

          <ConceptBlock
            title="SLD evolution — the discipline of updating at every change"
            plainEnglish="A PV install evolves over 25+ years. Battery added at year 3. EV charger added at year 5. Heat pump added at year 7. Inverter replaced at year 12. Each change updates the SLD; the version history captures the install\'s design lineage."
            onSite="The discipline of updating the SLD at every change is part of the long-term cert evidence bundle\'s value. The cumulative SLD versions tell the install\'s story; future contractors and inspectors read the design history before adding to or maintaining the install."
          >
            <p>Triggers for SLD updates:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Battery addition</strong> — Chapter 57 +
                Chapter 82 design records; SLD updated to show battery topology;
                hybrid inverter or AC-coupled battery inverter on the SLD
              </li>
              <li>
                <strong className="text-white">EV chargepoint addition</strong> — Section
                722 design records; SLD updated to show chargepoint circuit; PEN-fault
                protection arrangement per Reg 722.411.4.1 annotated
              </li>
              <li>
                <strong className="text-white">Heat pump addition</strong> — Section 712
                cross-reference if PV+heat pump coordination matters; load management
                arrangement on the PEI design pack; SLD updated to show heat pump
                circuit
              </li>
              <li>
                <strong className="text-white">Inverter replacement</strong> — new
                inverter datasheet; BS EN 62109-1/-2 conformity verified; RCBO type
                check per new inverter\'s datasheet; SLD updated with new inverter model
                and ratings
              </li>
              <li>
                <strong className="text-white">Module replacement</strong> (whole-string)
                — new module datasheet; new string sizing calculations (cold-day V_oc,
                MPPT range); SLD updated with new module model
              </li>
              <li>
                <strong className="text-white">Layout change</strong> — new physical
                layout drawing; SLD updated if electrical topology changes
              </li>
            </ul>
            <p>The cert evidence bundle accumulates SLD versions:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Original install SLD (with original install\'s EIC, MCS certs, etc.)</li>
              <li>Updated SLD post-each-change (with the change\'s own design records, EIC update, etc.)</li>
              <li>Version index showing the SLD evolution timeline</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <InlineCheck {...inlineChecks[7]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A G99 application held up by an unclear SLD"
            situation="An installer submits a G99 application for a 12 kWp PV + 20 kWh BESS commercial install. The application includes an SLD produced by hand at the survey, lacking the per-string protection annotations, the protection coordination details, and the metering arrangement. The DNO\'s G99 reviewer returns the application with a request for a complete SLD before approval can proceed. The customer\'s install timeline is now blocked by the SLD rework."
            whatToDo="Produce a proper CAD-based SLD covering: all 24 modules organised into 4 strings; per-string fuses per Reg 712.431 with ratings; DC isolators per string; the multi-MPPT inverter with model and MPPT range; AC output arrangement; battery topology; backup port output to essential-loads consumer unit; G99 protection scheme (anti-islanding per 551.7.4, prevention of reconnection per 551.7.5, isolation per 551.7.6); metering arrangement (generation meter, import meter); DNO connection point. Resubmit. The DNO\'s G99 approval typically follows within 2–4 weeks of a complete submission. The lesson: invest in the SLD at design stage to avoid the G99 rework cycle."
            whyItMatters="DNO G99 reviewers see hundreds of applications. Clear, complete SLDs get approved quickly; unclear or incomplete ones get returned for rework. The time cost of producing a proper SLD at design stage is small; the time cost of G99 rework and customer-timeline impact is large. Quality SLDs are the installer\'s differentiator in DNO interactions."
          />

          <Scenario
            title="An EICR at year 5 reveals an undocumented battery addition"
            situation="A PV install completed in 2021 has been operating well. An EICR is requested in 2026 (5-year periodic). The inspector arrives and finds a battery system installed alongside the PV — but the original cert evidence bundle has no record of the battery addition. The original SLD shows only PV; no updated SLD post-battery; no Chapter 82 PEI design records; no battery-side cert evidence."
            whatToDo="Investigate. The battery was added by a separate contractor in 2023 without updating the cert evidence bundle. The 5-year EICR now has to assess: the battery design against current standards (Chapter 57 / Chapter 82 applies — were the design records produced and lost, or never produced?); the protection coordination between PV and battery; the AC-coupled or DC-coupled architecture; the BS EN 62109-1/-2 conformity of any added inverter; the DNO notification status of the battery (was G98/G99 re-submitted with the additional generation capacity?). Issue the EICR with appropriate observations — likely several C2/C3 codes around the documentation gaps. The customer must engage a contractor to produce the missing records and bring the install\'s documentation up to date."
            whyItMatters="Undocumented additions to PV installs are a common EICR finding. The cert evidence bundle discipline (Module 1 Section 8) requires every change to update the SLD and the supporting records. The 2023 contractor who added the battery without updating the bundle created a documentation debt that surfaces at every later inspection. The competent contractor on subsequent additions catches the missing records and either updates them or codes them as observations on the EICR."
          />

          <CommonMistake
            title="Hand-drawing the SLD on a domestic install"
            whatHappens="An installer produces a hand-drawn SLD as the sole design artefact for a residential PV install. The drawing is unclear in places; protection ratings are illegible; the topology between inverter and consumer unit is ambiguous. The MCS audit flags the SLD quality as a major finding. The cert evidence bundle is incomplete in audit terms."
            doInstead="Use a CAD package (AutoCAD, Visio, draw.io) or a PV-specific design tool (OpenSolar, PVsyst) to produce SLDs. The cost of the software is small relative to the value of the cert evidence bundle. Hand-drawn sketches are acceptable for survey-stage scoping but not for the final design artefact. The cert evidence bundle expects professional-quality SLDs."
          />

          <CommonMistake
            title="Omitting the protection ratings on the SLD"
            whatHappens="An installer produces a topology-only SLD showing components and connections but without annotating ratings on the protective devices. The EICR inspector at year 5 cannot verify the protection coordination from the SLD alone; the original design pack is needed to cross-check. The inspector flags the SLD as inadequate for diagnostic reference."
            doInstead="Annotate every protective device with its type and rating. Fuse: rating in A, type (gPV). MCB: rating, curve (B, C, D). RCBO: rating, RCD type (A, B, F). SPD: class (Type 1, Type 2, Type 1+2). The annotations make the SLD self-sufficient for diagnostic reference; the inspector doesn\'t need to dig into the original design pack to verify the protection coordination."
          />

          <CommonMistake
            title="Failing to update the SLD when adding a battery to an existing PV install"
            whatHappens="A contractor retrofits a battery onto a 3-year-old PV install. The work is BS 7671 compliant; the battery functions correctly; the customer is happy. The contractor does NOT update the original PV SLD — they produce a separate battery-side document but don\'t integrate it with the existing cert evidence bundle. Five years later an EICR inspector reads the original SLD and the install doesn\'t match; investigation reveals the gap; multiple EICR observations follow."
            doInstead="Every install change updates the SLD. The retrofit-battery contractor should produce an updated SLD showing the integrated PV + BESS topology — original PV elements + battery + battery inverter (AC-coupled) or hybrid inverter (DC-coupled) + Chapter 82 PEI design records. The updated SLD goes into the cert evidence bundle alongside the original. The next inspector reads the design evolution; the install\'s documentation is consistent."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A PV SLD is the schematic showing the install\'s electrical topology — every major component (modules, strings, isolators, inverter, protective devices, meter, grid) in single-line form.',
              'Multiple audiences over 25+ years: designer, installer, customer, DNO, MCS auditor, EICR inspector, next contractor. Each reads the SLD at the appropriate level of detail.',
              'BS EN 60617 / IEC 60617 standardised symbols plus PV-specific conventions. Produced in CAD or PV design tools; hand-drawn sketches are not appropriate for the cert evidence bundle.',
              'Protection and isolation are the SLD\'s primary regulatory outputs — per-string fuses per Reg 712.431, RCBO type per Reg 531.3.3, bidirectional protective device per Reg 551.7.1(c), isolation per Reg 551.7.6, OSG warning-notice signposting.',
              'Three SLD patterns: residential single-string (single-sheet), residential hybrid PV+BESS (single or two-sheet), commercial multi-MPPT (multi-sheet per discipline).',
              'Living document — updated at every install change (battery, EV, heat pump, inverter replacement). Version history is the install\'s design audit trail.',
              'Cert evidence bundle is built around the SLD — EIC, MCS certs, equipment datasheets, DNO and CPS notifications, survey artefact, customer handover pack all reference the SLD as the system topology artefact.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-7')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2.7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                DC vs AC coupling
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 3: Solar PV — design &amp; installation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
