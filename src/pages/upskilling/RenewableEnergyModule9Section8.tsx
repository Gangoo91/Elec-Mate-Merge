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
    id: 'm9s8-part-6-scope',
    question:
      'What is the BS 7671 Part 6 verification scope across M9 generating-set technologies?',
    options: [
      'Full Part 6 (Reg 641, 643, 644) applies, with Section 551 adding anti-islanding and RCD tests',
      'Only the DNO commissioning witness is needed; Part 6 testing is skipped for generating sets',
      'Part 6 applies only to PV systems, with wind, hydro and CHP exempt from any inspection',
      'A manufacturer\'s declaration of conformity replaces the Part 6 verification entirely on site',
    ],
    correctIndex: 0,
    explanation:
      'BS 7671 Part 6 = the verification framework that closes every electrical install — inspection (Reg 641), testing (Reg 643), certification (Reg 644). For M9 generating sets: the standard Part 6 sweep applies (continuity, IR, ADS Zs, RCD operating time + I∆n, polarity, EFLI, functional). On top of standard Part 6, Section 551 adds: (1) Reg 551.7.5 anti-islanding test — verify generator disconnects on simulated loss-of-mains; (2) Reg 551.4.2 multi-source RCD effectiveness — test RCD operation with every intended combination of sources running; (3) Reg 551.7.2.1 source-side connection verification (visual + isolation test). The Part 6 + Section 551 dual layer is what differentiates a generator install from a routine new circuit. Cert evidence: EIC with Section 551 supplementary test results referenced or appended.',
  },
  {
    id: 'm9s8-anti-islanding-test',
    question:
      'How is Reg 551.7.5 anti-islanding actually tested at commissioning?',
    options: [
      'An insulation-resistance test on the generator circuit confirms the anti-islanding operation',
      'Measuring earth-fault loop impedance at the inverter verifies the loss-of-mains protection',
      'A DNO-witnessed grid-loss test, or BS EN 50549 equipment with parameters and firmware verified',
      'A visual check that the generator is wired correctly is enough to confirm the protection works',
    ],
    correctIndex: 2,
    explanation:
      'Reg 551.7.5 anti-islanding test routes in UK 2025-26: (1) DNO-witnessed test — used for larger generators (typically >50 kVA or non-standard equipment); DNO engineer attends; simulated loss of mains; verify generator disconnect time meets EREC G99 specification (<2 seconds typical); recorded on DNO witness sheet + cert evidence. (2) Manufacturer pre-certified equipment — BS EN 50549-1 (Type A, ≤16 A per phase, G98 territory) or BS EN 50549-2 (Type B/C/D, G99 territory) type-test certification covers the loss-of-mains protection. Install commissioning verifies: (a) the equipment is BS EN 50549-1/-2 certified per the DoC; (b) parameter settings match DNO requirements; (c) firmware version recorded; (d) simulated grid-loss test where commissioning toolkit supports it. Cert evidence bundle: DoC + BS EN 50549-1/-2 certificate reference + commissioning test record + DNO connection agreement reference (G98 post-install notification OR G99 completion notification).',
  },
  {
    id: 'm9s8-cert-evidence-bundle',
    question:
      'What is the cert evidence bundle structure across M9 LCT installs?',
    options: [
      'Just the EIC and nothing further, since a single certificate covers the whole project',
      'The DNO connection agreement on its own, with no BS 7671 certificate being required',
      'Only the MCS handover pack, which subsumes the EIC and all the DNO documents anyway',
      'A multi-layer bundle: EIC, Section 551 record, DNO notice, MCS pack, DoC, Part P and customer pack',
    ],
    correctIndex: 3,
    explanation:
      'M9 LCT cert evidence bundle is multi-layer because the install spans BS 7671 + DNO + MCS + manufacturer + heat-network (where applicable) + building regs + customer-facing documents. (1) BS 7671 EIC — the legal Part 6 certification, Appendix 6 form per Reg 644.4.201, including circuit schedule + inspection schedule + test results schedule. (2) Section 551 supplementary — anti-islanding test result, multi-source RCD test result, source-side connection verification. (3) DNO documentation — EREC G98 fast-track post-install notification (≤16 A per phase Type A) OR EREC G99 application + DNO design acceptance + completion notification + DNO connection agreement. (4) MCS handover pack — per technology installer standard handover document, customer signature, MCS company company-cert reference, Ofgem reference. (5) Manufacturer documentation — DoC + BS EN 50549-1/-2 type-test cert + parameter settings + firmware version + serial numbers. (6) Building Regulations Part P notification — where the install triggers Part P; competent person scheme notification (NICEIC / NAPIT / ELECSA / Stroma). (7) Heat-network / fuel-system specialist sign-off — Gas Safe (CHP gas), HETAS (biomass), specialist commissioning engineer (heat-network hydraulic + control). (8) Customer pack — install record, controls user guide, maintenance schedule, emergency contact list, warranty documents. The cert evidence bundle is the project deliverable; not just the EIC.',
  },
  {
    id: 'm9s8-functional-testing',
    question:
      'What does Reg 643.10 functional testing cover for M9 generating sets?',
    options: [
      'A continuity and insulation-resistance test of the generator circuit conductors only',
      'That the installation operates as intended — start/stop, sync, loss-of-mains, interlocks, metering',
      'A visual inspection only, confirming the equipment is mounted but never actually operated',
      'A check of the DNO connection paperwork rather than the operation of the installation itself',
    ],
    correctIndex: 1,
    explanation:
      'Reg 643.10 functional testing for M9 generating sets — far more substantive than for a routine new circuit. (a) Start / stop sequence — generator starts on demand, exports to grid, stops on demand, no fault during transition. (b) Synchronisation — generator voltage / frequency / phase matches grid before connection (inverter handles this for inverter-coupled sources; mechanical sync gear for direct-coupled larger generators). (c) Loss-of-mains disconnection — verified per Reg 551.7.5; recorded disconnect time. (d) Protective device coordination — RCD operates correctly with every intended source combination (Reg 551.4.2); OCPD discrimination between source-side + load-side. (e) Controls + safety interlocks — technology-specific (HETAS-witnessed biomass commissioning, CHP enclosure interlocks, wind brake / pitch control, hydro penstock valve closure). (f) Heat-network interface — where applicable, hydraulic + control sign-off. (g) Energy meter — bidirectional metering operates, export reading visible, import-only meter where G100 export limit zero. (h) Export limit — EREC G100 export-limit device tested where applicable. The Reg 643.10 functional test record is a multi-page document, often supplied by the specialist commissioning engineer + reviewed by the electrical installer for inclusion in the cert evidence bundle.',
  },
];

const quizQuestions = [
  {
    question:
      'A 12 kW micro-CHP install completes — what cert evidence bundle does the customer receive?',
    options: [
      'Just an EIC, since a single certificate covers the whole multi-trade micro-CHP project',
      'A G99 acceptance letter on its own, with no BS 7671 certificate being needed at all',
      'EIC, Section 551 record, G99 docs, MIS 3007 handover, DoC, Gas Safe, Part L and customer pack',
      'Only the manufacturer\'s warranty card and the user manual handed over on completion day',
    ],
    correctAnswer: 2,
    explanation:
      'A 12 kW micro-CHP install in UK 2025-26 generates a substantial cert evidence bundle: (1) BS 7671 EIC — for the new dedicated CHP supply circuit + isolation + protective devices + controls wiring. (2) Section 551 supplementary — anti-islanding test record (Reg 551.7.5), multi-source RCD effectiveness (Reg 551.4.2 — if existing PV / BESS on site), source-side connection verification (Reg 551.7.2.1). (3) DNO — EREC G99 formal application (12 kW above the G98 16 A per phase threshold for sustained export) + DNO design acceptance + DNO completion notification. (4) MCS — MIS 3007 micro-CHP installer handover pack + Ofgem reference. (5) Manufacturer — DoC + BS EN 50549-2 certification reference + parameter settings + serial numbers + firmware version. (6) Gas Safe — gas commissioning sign-off (CHP runs on natural gas — Gas Safe engineer scope). (7) Heat-network commissioning — hydraulic balance + flow temperature + thermostatic control + thermal store integration. (8) Building Regs — Part L compliance (improving thermal performance) + Part P notification (electrical work). (9) Customer pack — controls user guide, maintenance schedule (annual CHP service + ~7-year overhaul typical), emergency contact list, warranty docs. The cert evidence bundle is what enables the customer to: (a) claim grants / incentives, (b) prove compliance to insurer / future buyer, (c) call the right specialist for maintenance, (d) demonstrate Section 551 compliance to a periodic inspector.',
  },
  {
    question:
      'Anti-islanding fails the commissioning test — what does the installer do?',
    options: [
      'Commission the system anyway and note the failure down as a deferred remedial item',
      'Reduce the generator output below 16 A so that G98 applies and the test can be skipped',
      'Fit a second RCD on the supply to compensate for the failed anti-islanding device',
      'Stop and do not energise; investigate firmware, parameters or controller, then resolve and retest',
    ],
    correctAnswer: 3,
    explanation:
      'Anti-islanding failure at commissioning = STOP, do not energise the generator. Reg 551.7.5 is the categorical safety regulation preventing the generator continuing to export into a lost DNO supply — the failure scenario it prevents is fatal (DNO engineer touches an apparently-dead conductor that is actually being fed by the customer\'s generator). Diagnosis order: (1) Firmware — most common cause; older BS EN 50549-1/-2 firmware may not detect loss-of-mains within current DNO requirements; update via manufacturer toolkit + retest. (2) Parameter settings — voltage / frequency / ROCOF (rate of change of frequency) / vector-shift detection thresholds; correct per DNO area + EREC G99 specification. (3) Grid strength — very rarely, weak grid defeats certain detection methods (ROCOF / vector-shift); investigate with DNO engineer + consider alternative detection method per BS EN 50549-2. (4) Controller hardware fault — escalate to manufacturer; replace under warranty. Record the fault on the install record. Do NOT commission. Resolve + retest. Cert evidence bundle includes the SUCCESSFUL anti-islanding test result — partial / "promise to retest" is not acceptable.',
  },
  {
    question:
      'Periodic inspection (Reg 651-653 / EICR) on a site with M9 generating sets — what extra scope?',
    options: [
      'Standard EICR scope plus Section 551 re-checks — anti-islanding, source-side, RCD and notices',
      'Exactly the same scope as a normal domestic EICR, with the generating sets simply ignored',
      'Only the generating sets are inspected; the rest of the installation is left out of scope',
      'A reduced scope that omits the RCD testing entirely because multiple sources are present',
    ],
    correctAnswer: 0,
    explanation:
      'Periodic inspection (EICR) on M9 generating-set sites = standard EICR + Section 551 supplementary scope. Standard EICR per Reg 651-653 covers inspection + sample testing of the customer-owned electrical installation. M9 extras: (1) Anti-islanding device — verify parameter settings unchanged + firmware current; inverters / controllers may drift over years; record device serial + firmware + parameter snapshot. (2) Source-side connection (Reg 551.7.2.1) — verify generating set still on supply side of all protective devices; no later modifications that compromise the architecture. (3) Multi-source RCD test (Reg 551.4.2) — test RCD operation with every source combination; particularly important where customer has added sources since original install. (4) Isolators + warning notices — Reg 514 + Section 551 require specific warning notices ("DANGER MULTIPLE SOURCES OF SUPPLY" etc); inspect for presence + legibility; locking-off facility verified. (5) MCS install record review — where the original MCS handover pack is available, cross-reference parameter settings. (6) Manufacturer service records — annual servicing per MIS standard; gaps in service raise inspection flags. (7) Heat-network controls — for CHP / biomass: interlocks + over-temperature trips + boiler-CHP coordination logic. EICR period: 5 years domestic typical, 3-5 years commercial per HSE / Electrical Safety First guidance + IET Wiring Matters; not changed by Section 551 but the inspection takes longer.',
  },
  {
    question:
      'What is the difference between EREC G98 + EREC G99 from a commissioning + handover perspective?',
    options: [
      'Both require pre-install DNO design acceptance and a DNO-witnessed commissioning test on site',
      'G98 is for larger generation and G99 for small Type A units — the reverse of their actual use',
      'G98 is fast-track post-install notification; G99 needs pre-install acceptance and a longer lead time',
      'Both are post-install notifications, with no pre-install DNO engagement required for either route',
    ],
    correctAnswer: 2,
    explanation:
      'EREC G98 vs G99 commissioning + handover: (1) G98 — Type A small-scale (≤16 A per phase per source, ≤50 kW three-phase). Equipment: BS EN 50549-1 certified + on the ENA (Energy Networks Association) Type Test Register. Process: install proceeds without prior DNO engagement; installer notifies DNO within 28 days of commissioning via standard form. No DNO design step, no DNO commissioning witness. Lead time: zero (post-install notification only). Cert evidence: G98 notification form + acknowledgement. (2) G99 — larger generation (Type B 16-50 kW three-phase, Type C 50 kW-1 MW, Type D 1 MW+) OR multi-source sites OR non-standard equipment. Equipment: BS EN 50549-2 certified. Process: pre-installation application to DNO — DNO assesses site impact + network capacity + design acceptance; install only proceeds after DNO acceptance; commissioning may be DNO-witnessed (larger units); completion notification after successful commissioning. Lead time: 6-18 weeks typical for application / acceptance; longer for capacity-constrained networks; significant project planning factor. Cert evidence: G99 application + DNO design acceptance + DNO completion notification + (where applicable) DNO commissioning witness sheet. For M9 sites — most micro-CHP, wind, hydro, commercial CHP installs are G99 territory; only the smallest end (micro-CHP ~1 kWe, micro-wind ~2-3 kW) might fit G98.',
  },
  {
    question:
      'Customer hands over the project; what makes the M9 handover competent vs the install team disappearing?',
    options: [
      'Leave the manuals on site and depart once the system has been energised and is running',
      'Email all the documents to the customer and treat the handover as complete on send',
      'Hand over the EIC only and tell the customer to call the manufacturer for anything else',
      'Walk the controls, demonstrate a full cycle, cover maintenance and warranty, and obtain a signature',
    ],
    correctAnswer: 3,
    explanation:
      'Competent customer handover on an M9 LCT install is a 30-60 minute structured session, not "leave the manuals on the kitchen table". (1) Controls walkthrough — start / stop sequence on the controller; how to read normal-running displays; what error codes mean + what to do; what NOT to touch (parameter settings, safety interlocks). (2) Live demonstration — fire the system through one full cycle: CHP starts + reaches operating temperature + exports + stops cleanly; biomass auger feeds + igniter fires + reaches output; wind / hydro produces under actual conditions if possible. (3) Maintenance schedule — annual service intervals per MIS standard + manufacturer schedule; record sheet kept by customer; whose responsibility (MCS company typically covers first year + 5-year overhauls). (4) Emergency contact list — out-of-hours contact for fuel-system specialist (Gas Safe for CHP gas; HETAS for biomass), MCS installer, manufacturer support. (5) Warranty terms — what is covered + for how long + how to claim; conditions (e.g. annual service must be documented to maintain warranty). (6) Cert evidence bundle delivery — physical pack + digital copies emailed / customer portal; confirm customer has received. (7) DNO + MCS references — the customer needs these for any future works, insurance, sale of property. (8) Grants / incentives — confirm any grant / RHI / BUS / Smart Export Guarantee paperwork submitted by the MCS company; customer knows their reference. (9) Customer signature — handover document signed, project closed. UK 2025-26 reality: a structured handover dramatically reduces nuisance call-outs in year 1 + supports the customer in maintaining warranty + grant compliance.',
  },
  {
    question:
      'A multi-source site has PV + BESS + wind + future hydro. How does the cert evidence bundle grow over time?',
    options: [
      'One bundle is produced at the first install and is never updated as further sources are added',
      'It grows incrementally: each source adds an EIC, a fresh RCD test, a DNO variation and MCS evidence',
      'The whole bundle is discarded and rebuilt from scratch each time another source is added',
      'Each source keeps its own separate standalone bundle that is never consolidated into one pack',
    ],
    correctAnswer: 1,
    explanation:
      'Multi-source M9 + M10-territory PEI (Chapter 82) sites grow their cert evidence bundle incrementally — each new source adds to the cumulative record, AND triggers a fresh Section 551 multi-source verification. (1) Original install — full Section 712 + EIC + EREC notification + MCS handover for that technology. (2) Each subsequent source — EIC for the new circuit + Section 551 multi-source RCD test (Reg 551.4.2 — test RCD operation with EVERY combination of sources, including the new one) + DNO connection agreement variation (G98 / G99 amendment depending on combined export) + MCS standard for the new technology + manufacturer DoC. (3) Anti-islanding (Reg 551.7.5) verified PER SOURCE — each generating set independently disconnects on grid loss. (4) Source-side connection (Reg 551.7.2.1) maintained as new sources added — the supply panel architecture supports the cumulative source list. (5) Warning notices updated — "DANGER MULTIPLE SOURCES" notice list must reflect every source present. (6) Periodic inspection (EICR) — examines the cumulative state of all sources together. The handover deliverable is a single PEI cert evidence bundle that grows over time; not separate bundles per source. This is the practical realisation of Chapter 82 PEI integration covered in M10.',
  },
];

const faqs = [
  {
    question: 'What is the minimum cert evidence bundle for the simplest M9 install?',
    answer:
      'Even the simplest M9 install (e.g. ~1 kWe domestic micro-CHP Stirling unit at G98 threshold) needs: (1) BS 7671 EIC for the new dedicated circuit; (2) Section 551 supplementary test record (anti-islanding + supply-side connection); (3) EREC G98 post-install notification + DNO acknowledgement; (4) MCS MIS 3007 handover pack; (5) Manufacturer DoC + BS EN 50549-1 certificate reference; (6) Gas Safe gas commissioning sign-off; (7) Building Regs Part P notification; (8) Customer pack. Eight elements minimum. Solar thermal is the only M9 technology with a smaller bundle (no Section 551 / EREC because no electrical generation).',
  },
  {
    question: 'Do all M9 technologies trigger DNO notification?',
    answer:
      'No — solar thermal is the exception. Solar thermal generates HEAT, not electricity; no export to grid; no EREC G98 / G99 trigger. All other M9 technologies (wind, micro-hydro, micro-CHP, commercial CHP, biomass-CHP, fuel cells, hydrogen-fed) generate electricity + therefore trigger EREC G98 (≤16 A per phase Type A) or G99 (larger / formal application). UK 2025-26 reality: most M9 sustained-export technologies are G99 territory; only smallest-end deployments fit G98.',
  },
  {
    question: 'How does Reg 644 certification differ for generating-set vs routine circuit installs?',
    answer:
      'Reg 644 = the certification of the electrical install. The EIC form is the same per Appendix 6 of BS 7671. What differs: (1) Inspection schedule entries for Section 551 specifics (source isolator, supply-side connection, warning notices); (2) Test results schedule entries for the Section 551 supplementary tests (anti-islanding result, multi-source RCD result); (3) Designer / installer / inspector roles may be split across multi-trade delivery (electrical installer signs the EIC; MCS company / specialist commissioning engineer signs separate handover docs); (4) The EIC may reference the cert evidence bundle as a whole rather than try to capture every detail inline. The EIC is the legal artefact; the bundle is the project deliverable.',
  },
  {
    question: 'What goes wrong most at M9 commissioning?',
    answer:
      'Common UK 2025-26 commissioning failures: (1) Anti-islanding firmware out of date — inverter / generator controller firmware doesn\'t meet current EREC G98 / G99 requirements; update before commissioning. (2) Parameter settings wrong for DNO area — DNO-specific voltage / frequency thresholds; check at design + verify at commissioning. (3) Multi-source RCD test fails — RCD operating time exceeds requirement when multiple sources contributing fault current; review RCD type + rating + circuit layout. (4) Warning notices missing — Reg 514 + Section 551 require specific notices; install team forgets the "DANGER MULTIPLE SOURCES" notice. (5) Heat-network interlock fails — CHP / biomass: thermal interlock between source + thermal store doesn\'t engage; review controls wiring + commissioning sequence. (6) MCS handover pack incomplete — install team gathers paperwork as they go; gaps surface at handover. (7) DNO connection agreement reference wrong — wrong scheme cited (G98 vs G99) or DNO reference number missing. Most are pre-empted by a structured commissioning checklist.',
  },
  {
    question: 'Is there a single M9 commissioning checklist?',
    answer:
      'Not officially — but each MCS Installer Standard (MIS 3001 / 3003 / 3004 / 3007 / 3008) includes a commissioning + handover section. The competent UK 2025-26 approach: (1) BS 7671 Part 6 standard sweep (inspection + testing + EIC); (2) Section 551 supplementary tests (anti-islanding + multi-source RCD + supply-side connection); (3) MIS-specific commissioning checklist (per technology); (4) Manufacturer commissioning procedure (from the install manual); (5) DNO commissioning requirements (G98 / G99 specific); (6) Building Regs notification; (7) Customer handover. Most MCS companies develop an internal master checklist combining these — that internal document is what the install team uses on the day. The cert evidence bundle structure (eight layers above) is the universal deliverable framework.',
  },
];

export default function RenewableEnergyModule9Section8() {
  const navigate = useNavigate();

  useSEO({
    title:
      'Commissioning, Part 6 + handover across other LCT | Renewable Energy 9.8 | Elec-Mate',
    description:
      'BS 7671 Part 6 + Section 551 + EREC G98 / G99 + MCS handover + cert evidence bundle structure across the M9 LCT technologies — wind, solar thermal, biomass, CHP, micro-hydro, hydrogen. Reg 643.10 functional testing, Reg 551.7.5 anti-islanding verification, Reg 551.4.2 multi-source RCD, customer handover.',
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
            eyebrow="Module 9 · Section 8 · BS 7671:2018+A4:2026 · Part 6 + Section 551"
            title="Commissioning, Part 6 + handover across other LCT"
            description="The unifying commissioning framework across the M9 LCT technologies. BS 7671 Part 6 standard verification + Section 551 supplementary tests (Reg 551.7.5 anti-islanding, Reg 551.4.2 multi-source RCD, Reg 551.7.2.1 supply-side connection) + EREC G98 / G99 DNO documentation + MCS handover pack per technology + the eight-layer cert evidence bundle that closes the project."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671 Part 6 (Reg 641 inspection + Reg 643 testing + Reg 644 certification) applies to every M9 electrical install. Section 551 ADDS three supplementary tests: anti-islanding (Reg 551.7.5), multi-source RCD effectiveness (Reg 551.4.2), supply-side connection (Reg 551.7.2.1).',
              'Anti-islanding test (Reg 551.7.5) is the central Section 551 safety verification — equipment certified to BS EN 50549-1 (G98 Type A) or BS EN 50549-2 (G99 Type B/C/D), parameter settings verified, simulated grid-loss disconnect time recorded.',
              'EREC G98 = post-install notification (Type A ≤16 A per phase); EREC G99 = pre-install application + DNO acceptance (larger / multi-source). Most M9 sustained-export installs are G99 territory.',
              'Cert evidence bundle is EIGHT layers: (1) BS 7671 EIC; (2) Section 551 supplementary tests; (3) EREC G98 / G99 documentation; (4) MCS handover pack per MIS standard; (5) manufacturer DoC + BS EN 50549-1/-2 cert; (6) Building Regs Part P; (7) heat-network / fuel specialist sign-off; (8) customer pack.',
              'Multi-source sites trigger a fresh Section 551 multi-source RCD test EVERY time a new source is added — cumulative cert evidence bundle grows incrementally as the PEI (Chapter 82) develops over years.',
              'Reg 643.10 functional testing for M9 is substantive — start / stop sequence, synchronisation, loss-of-mains time, protective device coordination, controls + safety interlocks, heat-network interface, energy meter, EREC G100 export limit (where applicable).',
              'Competent customer handover = structured 30-60 minute session covering controls walkthrough + live demonstration + maintenance schedule + emergency contacts + warranty + cert bundle delivery + customer signature. Pre-empts year-1 nuisance calls.',
              'Periodic inspection (EICR) on M9 sites = standard EICR + Section 551 supplementary scope (anti-islanding parameters, multi-source RCD, source-side connection verification, warning notices, MCS service records). Typically 5 years domestic / 3-5 years commercial.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply BS 7671 Part 6 (Reg 641 inspection + Reg 643 testing + Reg 644 certification) to M9 generating-set installs.',
              'Apply Section 551 supplementary tests: anti-islanding (Reg 551.7.5), multi-source RCD effectiveness (Reg 551.4.2), supply-side connection verification (Reg 551.7.2.1).',
              'Verify Reg 551.7.5 anti-islanding via BS EN 50549-1/-2 certified equipment + parameter settings + simulated grid-loss test (or DNO-witnessed where required).',
              'Apply Reg 643.10 functional testing scope: start / stop, synchronisation, disconnection, coordination, controls, heat-network interface, energy meter, export limit.',
              'Identify EREC G98 vs G99 commissioning + handover paths.',
              'Structure the eight-layer cert evidence bundle: EIC + Section 551 supplementary + EREC docs + MCS pack + manufacturer DoC + Building Regs + heat-network / fuel sign-off + customer pack.',
              'Deliver a competent customer handover: controls walkthrough + demonstration + maintenance + emergency contacts + warranty + bundle delivery + signature.',
              'Scope periodic inspection (EICR) for M9 sites — standard EICR plus Section 551 supplementary checks.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The EIC is the legal artefact; the cert evidence bundle is the project deliverable. The two are not the same — and on an M9 install, the gap between them is where the customer\'s grant claim + insurance + next-buyer due diligence + future-installer handover all live.
          </Pullquote>

          <ContentEyebrow>Part 6 + Section 551 commissioning framework</ContentEyebrow>

          <ConceptBlock
            title="BS 7671 Part 6 baseline + Section 551 supplementary"
            plainEnglish="Every electrical install closes with BS 7671 Part 6 verification — inspection (Reg 641), testing (Reg 643), certification (Reg 644). For M9 generating sets, on top of standard Part 6, Section 551 adds three specific tests: anti-islanding (Reg 551.7.5), multi-source RCD effectiveness (Reg 551.4.2), source-side connection verification (Reg 551.7.2.1). Same EIC form, with the Section 551 results appended or referenced."
            onSite="The Reg 643 standard sweep happens regardless of technology: continuity, insulation resistance, ADS Zs measurement, RCD operating time + I∆n, polarity, EFLI, functional. Section 551 supplementary tests follow once the source is energised — anti-islanding first (categorical safety), then multi-source RCD (with every intended source combination), then visual + isolation verification of source-side connection."
          >
            <p>Part 6 + Section 551 verification sequence on a typical M9 install:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Pre-energisation Part 6 (Reg 643.1-643.9)</strong>
                {' '}— continuity of protective conductors, insulation resistance (≥1 MΩ at 500 V
                dc per Reg 643.3 typical low-voltage), polarity, EFLI calculation + measurement
                where applicable, RCD operating time + I∆n (Reg 643.8). Standard for any new circuit
              </li>
              <li>
                <strong className="text-white">Source-side connection visual (Reg 551.7.2.1)</strong>
                {' '}— generator on supply side of all protective devices; isolator at the source
                with locking-off facility; warning notices per Reg 514 ("DANGER MULTIPLE SOURCES OF SUPPLY")
              </li>
              <li>
                <strong className="text-white">Energisation + anti-islanding (Reg 551.7.5)</strong>
                {' '}— source brought online; loss-of-mains protection verified per BS EN 50549-1 (G98 Type A)
                or BS EN 50549-2 (G99 Type B/C/D); simulated grid loss; disconnect time recorded
                (typically &lt;2 seconds for G99)
              </li>
              <li>
                <strong className="text-white">Multi-source RCD effectiveness (Reg 551.4.2)</strong>
                {' '}— RCD tested with every intended combination of sources contributing fault current;
                30 mA RCD providing additional protection per Reg 415.1.1, its effectiveness verified by
                an AC test at the rated residual operating current I∆n (per the A4:2026 redraft — Table 3A
                deleted, a single AC test at I∆n applies regardless of RCD type)
              </li>
              <li>
                <strong className="text-white">Reg 643.10 functional testing</strong>
                {' '}— assembled installation operates as intended: start / stop, sync, controls,
                safety interlocks, heat-network interface (where applicable), energy meter, export limit
              </li>
              <li>
                <strong className="text-white">Reg 644 certification</strong>
                {' '}— EIC issued per Appendix 6 with schedules; Section 551 supplementary test
                results referenced or appended; cert evidence bundle assembled
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            title="Reg 643.10 — Functional testing"
            citation="BS 7671:2018+A4:2026 · Reg 643.10"
            body="Assemblies such as switchgear and controlgear, drives, controls and interlocks shall be subjected to a functional test to verify that they are properly mounted, adjusted and installed in accordance with the relevant requirements of the Regulations. Protective devices shall be subjected to a functional test, where necessary, to verify that they are properly installed and adjusted."
          />

          <RegsCallout
            title="Reg 551.7.5 — Protection against loss of supply"
            citation="BS 7671:2018+A4:2026 · Reg 551.7.5"
            body="Means shall be provided to prevent the connection of a generating set to the system for distribution of electricity to the public in the event of loss of that supply or deviation of the voltage or frequency at the supply terminals from values required by Regulation 551.7.4."
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Anti-islanding verification — the central Section 551 test</ContentEyebrow>

          <ConceptBlock
            title="BS EN 50549-1/-2 + the loss-of-mains route"
            plainEnglish="UK 2025-26 anti-islanding verification almost always relies on BS EN 50549-1 (G98 Type A, ≤16 A per phase) or BS EN 50549-2 (G99 Type B/C/D) type-test certified equipment. The inverter / generator controller has built-in loss-of-mains protection — ROCOF (rate of change of frequency), vector-shift, voltage / frequency thresholds. The installer verifies: equipment is on the ENA Type Test Register, parameter settings match DNO requirements, firmware version recorded, and runs a simulated grid-loss test where the commissioning toolkit supports it."
            onSite="The commissioning toolkit varies by manufacturer. SMA Sunny Boy, Fronius Symo, SolarEdge inverters all support a commissioning loss-of-mains test via their app / web interface. For mechanical generator-based sources (engine-driven CHP, larger micro-hydro), the loss-of-mains protection is typically a separate relay (Reyrolle, ABB, GE) tested via injection set — usually by a specialist relay engineer."
          >
            <p>The verification chain in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Equipment type-test</strong>
                {' '}— BS EN 50549-1 (G98 Type A) or BS EN 50549-2 (G99 Type B/C/D) certified;
                listed on the ENA Type Test Register; DoC supplied; cert reference recorded
              </li>
              <li>
                <strong className="text-white">Parameter settings</strong>
                {' '}— DNO-area specific (Northern Powergrid, UK Power Networks, SSE Distribution,
                Scottish Power, Western Power, Electricity North West, SP Energy Networks); voltage /
                frequency / ROCOF / vector-shift thresholds; record in cert evidence
              </li>
              <li>
                <strong className="text-white">Firmware version</strong>
                {' '}— recorded at commissioning; older firmware may not meet current EREC G98 / G99
                requirements; update via manufacturer toolkit before commissioning if outdated
              </li>
              <li>
                <strong className="text-white">Simulated grid-loss test</strong>
                {' '}— commissioning toolkit triggers a controlled grid disconnect; verify generator
                disconnects within the required time (&lt;2 seconds typical for G99); record the
                measured disconnect time
              </li>
              <li>
                <strong className="text-white">DNO-witnessed alternative</strong>
                {' '}— for larger / non-standard installs, DNO engineer attends + witnesses live
                loss-of-mains test at the point of supply; DNO witness sheet signed + recorded in
                cert evidence bundle
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                {' '}— Section 551 supplementary test record includes: equipment make + model + serial,
                BS EN 50549-1/-2 cert reference, firmware version, parameter settings, simulated
                test result or DNO witness sheet, date + signature
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Anti-islanding fails at commissioning — diagnosis sequence"
            situation="6 kW domestic wind turbine commissioning. Installer triggers the simulated loss-of-mains via the inverter\'s commissioning toolkit. Inverter does NOT disconnect — output continues for &gt;5 seconds. EREC G99 requires &lt;2 seconds. Standard Part 6 tests already complete + passed; only the Section 551 anti-islanding test is failing."
            whatToDo="STOP — do not energise the wind turbine to the grid. Diagnosis sequence: (1) Inverter firmware — check current version vs manufacturer current release; older firmware may not meet current EREC G99 requirements. Update via manufacturer toolkit + retest. (2) Parameter settings — verify DNO-area-specific voltage / frequency / ROCOF / vector-shift thresholds match the DNO requirements; many manufacturers ship with default settings that don\'t match all UK DNO areas. (3) Grid impedance — rare cause; very weak grid (rural end-of-line) can defeat ROCOF / vector-shift detection; if suspected, engage DNO + consider alternative detection method per BS EN 50549-2 (passive loss-of-mains methods sometimes need active method enabled in weak-grid scenarios). (4) Hardware fault — escalate to manufacturer; replace under warranty. Record the failure on the install record. Resolve + retest. EIC NOT issued + project NOT handed over until successful test."
            whyItMatters="Reg 551.7.5 is categorical — no workaround. The hazard is fatal (DNO engineer touches conductor that appears dead but is being fed by the customer\'s wind turbine). UK 2025-26 reality: firmware drift is the most common cause; ~30% of M9 commissioning delays are firmware-related. Build the firmware-check step into the install procedure — verify firmware as part of equipment commissioning, before the actual loss-of-mains test, to catch the issue early. Recording the firmware version in cert evidence is also why this matters: a future periodic inspector can verify the firmware hasn\'t regressed."
          />

          <RegsCallout
            title="Reg 551.4.2 — RCD requirements with multiple sources of supply"
            citation="BS 7671:2018+A4:2026 · Reg 551.4.2"
            body="Where a residual current device is installed in an installation supplied from more than one source, the device shall remain effective for each of the intended combinations of sources operating in parallel or independently."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>The eight-layer cert evidence bundle</ContentEyebrow>

          <ConceptBlock
            title="What gets delivered + why each layer exists"
            plainEnglish="A competent M9 install hands the customer a structured cert evidence bundle covering BS 7671 + DNO + MCS + manufacturer + heat-network (where applicable) + Building Regs + customer-facing documents. Eight layers — each serves a specific stakeholder: the customer, the DNO, the MCS company / Ofgem, the manufacturer, the future periodic inspector, the future buyer / insurer."
            onSite="The bundle is assembled DURING the install + commissioning, not retrofitted afterwards. The install team works to a checklist that pulls each artefact into a shared project folder; the project manager / lead installer is responsible for ensuring all layers are present before handover. Digital + physical delivery is standard UK 2025-26."
          >
            <p>Layer-by-layer:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Layer 1 — BS 7671 EIC</strong>
                {' '}(Reg 644.4.201 + Appendix 6) — legal artefact; circuit schedule, inspection schedule,
                test results schedule. Signed by designer, installer, inspector
              </li>
              <li>
                <strong className="text-white">Layer 2 — Section 551 supplementary tests</strong>
                {' '}— anti-islanding result (Reg 551.7.5), multi-source RCD effectiveness (Reg 551.4.2),
                supply-side connection verification (Reg 551.7.2.1). Either appended to EIC or
                separate record referenced in EIC remarks
              </li>
              <li>
                <strong className="text-white">Layer 3 — EREC documentation</strong>
                {' '}— G98 post-install notification + DNO acknowledgement (Type A) OR G99 application
                + DNO design acceptance + DNO completion notification (larger). The DNO reference
                number is critical for any future works
              </li>
              <li>
                <strong className="text-white">Layer 4 — MCS handover pack</strong>
                {' '}— per MIS standard (MIS 3001 solar thermal, MIS 3003 wind, MIS 3004 biomass,
                MIS 3007 micro-CHP, MIS 3008 micro-hydro); MCS company cert reference; Ofgem
                reference for any grant / RHI / SEG claim
              </li>
              <li>
                <strong className="text-white">Layer 5 — Manufacturer documentation</strong>
                {' '}— DoC, BS EN 50549-1/-2 type-test certificate reference, parameter settings,
                firmware version, serial numbers, warranty terms
              </li>
              <li>
                <strong className="text-white">Layer 6 — Building Regs notification</strong>
                {' '}— Part P (electrical work in dwellings) via competent person scheme (NICEIC,
                NAPIT, ELECSA, Stroma); Part L (thermal — where applicable); Part J (combustion
                appliances — biomass, CHP)
              </li>
              <li>
                <strong className="text-white">Layer 7 — Heat-network / fuel specialist sign-off</strong>
                {' '}— Gas Safe (CHP gas commissioning), HETAS (biomass combustion + flue commissioning),
                specialist commissioning engineer (heat-network hydraulic + controls). Multi-trade
                delivery requires the non-electrical trades to provide their own sign-offs
              </li>
              <li>
                <strong className="text-white">Layer 8 — Customer pack</strong>
                {' '}— controls user guide, maintenance schedule, emergency contact list, warranty
                docs, energy monitoring app credentials (where applicable). The customer-facing
                layer that turns the install into something they can actually live with
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating the EIC as the entire deliverable"
            whatHappens="Install team focuses on the EIC + leaves with a job-done attitude. Customer is left with a single piece of paper. Two years later — customer wants to claim Smart Export Guarantee; needs DNO reference number; doesn\'t have it. Customer\'s house being sold; surveyor asks for MCS handover pack; missing. Customer\'s warranty claim fails because manufacturer parameter settings document missing. The EIC alone is not the project deliverable."
            doInstead="The EIC is layer 1 of an eight-layer cert evidence bundle. Treat the bundle as the project deliverable — assemble during install, not retrofitted; deliver physical + digital at handover; confirm customer receipt + signature. The other seven layers cost almost nothing to gather if collected as you go; they cost a fortune to retrofit two years later when nobody can find the parameter settings + the install engineer has left the company. UK 2025-26 industry best-practice = cert evidence bundle as a standard project deliverable, not an afterthought."
          />

          <CommonMistake
            title="Skipping the customer handover session"
            whatHappens="Install completes Friday afternoon. Install team posts the manuals through the door + leaves. Customer powers up the system Monday — error code on the controller; doesn\'t know what to do; calls the installer; installer dispatches a callout. Multiplied by every M9 install over a year, the installer\'s year-1 nuisance-call load is unmanageable. Customer-satisfaction scores drop. Warranty claims rise because customer mis-operated the system without realising."
            doInstead="Schedule a 30-60 minute structured customer handover at the end of commissioning. Walk through the controls; demonstrate one full cycle; explain maintenance schedule + emergency contacts + warranty terms; deliver the cert evidence bundle physically + digitally; customer signature on the handover document. UK 2025-26 industry data: a structured handover reduces year-1 nuisance call-outs by 60-80%. The 30-60 minutes pays back many times over."
          />

          <RegsCallout
            title="Reg 644.4.201 — Issue of the EIC"
            citation="BS 7671:2018+A4:2026 · Reg 644.4.201"
            body="Upon completion of the verification of a new installation, additions or alterations, an Electrical Installation Certificate (EIC) shall be provided based on the model given in Appendix 6, together with a Schedule of Inspections (or Condition Report Inspection Schedule for an Electrical Installation Condition Report) and a Schedule of Test Results, to the person ordering the work."
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Functional testing scope + customer handover</ContentEyebrow>

          <Scenario
            title="50 kWe / 100 kWth commercial CHP at a leisure centre — handover day"
            situation="Local authority leisure centre. 50 kWe / 100 kWth natural gas CHP install complete + commissioned. EREC G99 application + DNO acceptance + DNO-witnessed loss-of-mains test passed. MCS MIS 3007 handover. Gas Safe gas commissioning sign-off. Heat-network commissioned (hydraulic balance + thermal store + LTHW integration). BS 7671 EIC complete with Section 551 supplementary tests. Today is customer handover."
            whatToDo="Handover session — leisure centre facilities manager + duty engineer + electrical installer + MCS company project manager + CHP specialist commissioning engineer. Run order: (1) Walk the plant room — point out the CHP unit + AC isolator + dedicated supply circuit + warning notices + heat-network connections. (2) Controls walkthrough — leisure centre BMS shows CHP running state + export power + heat output + fuel consumption; demonstrate manual start / stop + remote control via BMS; show error display + what each code means. (3) Live demonstration — start CHP from cold; observe sync to grid; observe heat output ramp up; observe thermal store charging; stop CHP cleanly. (4) Maintenance schedule — quarterly + annual + 5-year overhaul; CHP specialist provides; agreed maintenance contract OR ad-hoc; emergency contact for out-of-hours fault. (5) Warranty terms — 5-year typical on engine + 10-year on heat exchanger; conditions (annual service must be documented). (6) Cert evidence bundle delivery — physical pack + digital via customer portal; eight layers signed off. (7) Grant / Smart Export Guarantee paperwork — MCS company has submitted; customer has reference number. (8) Customer signature on handover document; project closed. Total ~1.5 hours including walk + demo + paperwork."
            whyItMatters="A 50 kWe commercial CHP is a £150-300k investment + delivers 80-90% combined efficiency for 15-20 years. The handover is what enables the customer to operate it safely + claim grant income + maintain warranty + call the right specialist when something goes wrong. UK 2025-26 industry data on commercial CHP: sites with documented handover deliver 95%+ uptime; sites without typically drop below 80% within 3 years. The handover session is a core project deliverable, not optional."
          />

          <Scenario
            title="Periodic inspection (EICR) on a multi-source rural site — 5 years later"
            situation="Highland farm. Original PV + BESS installed 2020. Wind turbine added 2022. Micro-hydro added 2024. UK 2025-26: 5-year periodic inspection due on the original PV + BESS install + concurrent inspection of all added sources. Customer wants single EICR covering the integrated PEI."
            whatToDo="Single EICR covering the whole PEI per Chapter 82. Scope: (1) Standard EICR per Reg 651-653 — inspection + sampling testing of customer-owned installation. (2) Section 551 supplementary checks per source: (a) anti-islanding device parameter verification — pull current parameter settings from each inverter / controller, compare to original cert evidence (firmware version + parameter settings); record any drift. (b) Source-side connection (Reg 551.7.2.1) — verify each source still on supply side of all protective devices; no later modifications compromise architecture. (c) Multi-source RCD test (Reg 551.4.2) — test RCD with every source combination (PV + BESS + wind + hydro, plus subsets). (d) Isolators + warning notices — verify present, legible, locking-off facility works. (e) Cert evidence bundle review — original handover + each subsequent addition. (3) MCS service records review — annual servicing documented per MIS standard; gaps flagged. (4) Manufacturer service records — wind brake test (per MIS 3003 typical 5-year), hydro penstock + abstraction-licence compliance (Environment Agency). (5) Issue EICR with overall classification + per-source defect coding (C1 / C2 / C3 / FI). Where defects found: schedule remedial work + re-inspection. Cumulative cert evidence bundle updated."
            whyItMatters="Multi-source PEI periodic inspection is the M9 + M10 area where Section 551 + Chapter 82 actually get tested 5 years after the install. Common 5-year findings: (a) inverter firmware drifted across multiple updates; (b) parameter settings changed by remote update without record; (c) one source added without updating the multi-source RCD architecture (Reg 551.4.2 effectiveness compromised). The EICR is what catches these + protects the customer from a hazard that has slowly accumulated. UK 2025-26 reality: 5-year EICR on multi-source PEI is a 4-6 hour job + cert evidence bundle review takes another 2-3 hours; price accordingly."
          />

          <RegsCallout
            title="Reg 651 — Periodic inspection and testing"
            citation="BS 7671:2018+A4:2026 · Reg 651"
            body="Where required, periodic inspection and testing of every electrical installation shall be carried out in accordance with Regulations 652 to 657 in order to determine, so far as is reasonably practicable, whether the installation is in a satisfactory condition for continued service."
          />

          <InlineCheck {...inlineChecks[3]} />

          <CommonMistake
            title="Anti-islanding parameter drift discovered at EICR — original installer no longer trading"
            whatHappens="5-year EICR; inverter firmware parameter settings differ from the 2020 original commissioning record. Customer can\'t identify who changed the settings; original installer no longer trading; manufacturer remote-update logs suggest a firmware update + parameter migration occurred 2023. EICR engineer flags as C2 (potentially dangerous — anti-islanding compliance unverified). Customer faces remedial cost; insurance position uncertain."
            doInstead="Pre-empt at install via: (1) Layer 5 cert evidence (manufacturer documentation + parameter settings + firmware version) — comprehensive snapshot at commissioning. (2) Customer pack (Layer 8) — explain that any firmware update changes parameters + customer should request the installer\'s involvement; do not accept remote auto-updates without notification. (3) Annual service review (MCS MIS pattern) — re-verify parameter settings at each service. At EICR — if drift found: re-verify against current EREC G98 / G99 requirements (parameter settings may have changed by manufacturer in response to grid-code updates — drift may be CORRECT, not a fault); document + classify accordingly. UK 2025-26 industry trend: parameter remote-update + drift is increasing as inverters become more cloud-connected; cert evidence bundles need to track this through the lifecycle."
          />

          <SectionRule />

          <ContentEyebrow>Closing the module + onward to M10</ContentEyebrow>

          <Pullquote>
            Section 551 doesn\'t care what fuel the generator runs on. Reg 551.7.5 doesn\'t care whether it\'s an inverter or a synchronous machine. Reg 551.4.2 doesn\'t care how many sources you have. The framework treats every customer-side electricity source by the same safety logic — and the cert evidence bundle is the record that proves it.
          </Pullquote>

          <ConceptBlock
            title="M9 in the broader course architecture"
            plainEnglish="M9 covered the technologies in Reg 551.1.1 not already covered in M2-M5 — wind, micro-hydro, CHP — plus solar thermal (no electrical generation, electrical install scope) and biomass (heat-only or combined-heat-and-power). M10 (Hybrid systems, EMS + smart export) takes the multi-source picture from M9 + integrates it under Chapter 82 PEI + adds Energy Management System + Smart Export Guarantee economics. M11 (A4:2026 Chapter 81 + lightning + fault levels) brings the latest A4:2026 changes into focus. M12 (Testing + commissioning + periodic inspection + handover) is the testing-specific deep dive across all technologies."
            onSite="The progression: M1 grid + LCT landscape → M2-M4 Solar PV (Section 712) → M5 BESS (Chapter 57) → M6-M7 EV (Section 722) → M8 Heat pumps + electrified heat → M9 Other LCT (wind, solar thermal, biomass, CHP, micro-hydro, hydrogen direction) → M10 Hybrid systems + EMS + smart export (Chapter 82 integration) → M11 A4:2026 Chapter 81 + lightning + fault levels → M12 Testing + commissioning + periodic inspection + handover. By end of M12: complete coverage of LCT install + the BS 7671 framework that anchors it all."
          >
            <p>The Section 551 + Chapter 82 progression:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Single-source (Section 712 PV)</strong>
                {' '}— covered in M2-M4. The simplest case; one inverter + EREC G98 typically;
                Section 551 framework applies through Section 712 specifics
              </li>
              <li>
                <strong className="text-white">Single-source with battery (Chapter 57 BESS)</strong>
                {' '}— covered in M5. BESS as a generating set per Reg 551.7.2.1; supply-side
                connection; Section 551 anti-islanding for the BESS inverter
              </li>
              <li>
                <strong className="text-white">Section 551 generating sets</strong>
                {' '}— M9. Wind, micro-hydro, micro-CHP, commercial CHP — all under the unifying
                Section 551 framework. Different fuels + physical principles, same BS 7671 safety
                framework
              </li>
              <li>
                <strong className="text-white">Multi-source PEI (Chapter 82)</strong>
                {' '}— M10. When the installation has multiple generating sets + storage + smart
                controls + selective export, Chapter 82 PEI integration is the framework. Section 551
                remains the per-source anchor; Chapter 82 manages the system-level coordination
              </li>
              <li>
                <strong className="text-white">A4:2026 updates (Chapter 81 + Section 443)</strong>
                {' '}— M11. The 2026 amendment changes: AFDD scope, lightning protection coordination,
                fault level assessment, schedule form updates. Affects all M2-M10 technology
              </li>
              <li>
                <strong className="text-white">Testing + commissioning specialist deep dive</strong>
                {' '}— M12. Brings together Part 6 + Section 551 supplementary + EREC G98 / G99 +
                MCS variants + periodic inspection across every LCT
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            points={[
              'BS 7671 Part 6 (Reg 641 + 643 + 644) is the baseline verification for every M9 install. Section 551 adds anti-islanding (Reg 551.7.5), multi-source RCD (Reg 551.4.2), supply-side connection (Reg 551.7.2.1).',
              'Anti-islanding verified via BS EN 50549-1 (G98 Type A) or BS EN 50549-2 (G99 Type B/C/D) certified equipment + parameter settings + simulated grid-loss test (or DNO-witnessed for larger / non-standard).',
              'Reg 643.10 functional testing for M9 is substantive — start / stop, sync, disconnection, coordination, controls, heat-network interface, energy meter, export limit.',
              'Cert evidence bundle is EIGHT layers: EIC + Section 551 supplementary + EREC docs + MCS pack + manufacturer DoC + Building Regs + heat-network / fuel specialist + customer pack.',
              'EREC G98 = post-install notification ≤16 A per phase Type A. EREC G99 = pre-install application + DNO acceptance Type B/C/D. Most M9 sustained-export installs are G99 territory.',
              'Customer handover = structured 30-60 minute session (controls + demo + maintenance + emergency contacts + warranty + bundle + signature). Reduces year-1 nuisance calls 60-80%.',
              'Periodic inspection (EICR) on M9 sites = standard EICR + Section 551 supplementary checks (anti-islanding parameter drift, multi-source RCD, source-side connection, warning notices).',
              'Multi-source PEI sites grow cumulative cert evidence bundle over years; each new source triggers fresh Section 551 multi-source RCD test + DNO connection agreement variation.',
              'Common commissioning failures: firmware out of date, parameter settings wrong for DNO area, multi-source RCD fails, warning notices missing, heat-network interlock fails, MCS pack incomplete, DNO reference wrong.',
              'M9 closes the BS 7671 other-LCT coverage. Onward: M10 hybrid systems + EMS + smart export (Chapter 82 PEI integration); M11 A4:2026 Chapter 81 + lightning + fault levels; M12 testing + commissioning specialist deep dive.',
              'The EIC is the legal artefact; the eight-layer cert evidence bundle is the project deliverable. The gap between them is where grant claims + insurance + future buyer + future installer all live.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 8 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-9-section-7')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                9.7 Micro-hydro + emerging LCT
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-10')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 10 · Hybrid systems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
