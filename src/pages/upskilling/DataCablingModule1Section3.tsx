import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
  AmendmentBadge,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m1s3-passive-vs-active-definition',
    question:
      'You are listing kit on a fit-out spec. Which of the following items is PASSIVE infrastructure (designed to last 15-20 years), and which is ACTIVE equipment (designed to be refreshed every 3-5 years)?',
    options: [
      'The patch panel is active and the network switch is passive — the panel does the work of forwarding.',
      'Cable, outlets, splice trays, panels and faceplates are passive; switches, routers, APs and PoE injectors are active.',
      'Everything mounted in a comms cabinet is active equipment on a 3-5 year refresh cycle.',
      'Every item becomes active equipment as soon as PoE is energised across the cabling.',
    ],
    correctIndex: 1,
    explanation:
      "Passive vs active is the most fundamental life-cycle and economic distinction in a structured-cabling job. Passive = no electronics, no firmware, no power — the cabling system itself, the patch panels, the splice trays, the faceplates, the cable basket. Active = anything that runs firmware and consumes power, takes a MAC address, has a software upgrade path, and is refreshed every 3-5 years on the vendor's roadmap. The whole financial argument for structured cabling depends on getting one big passive infrastructure right and letting active equipment churn over it.",
  },
  {
    id: 'datacabling-m1s3-poe-pse-pd-cap',
    question:
      'A wireless-AP vendor data sheet says the AP is "Class 8" and "draws up to 90 W from the port". A junior engineer wants to spec the PSE switch port for "100 W to be safe". What does BS 7671:2018+A4:2026 §716 actually require?',
    options: [
      'Spec the PSE port to deliver a full 100 W to give the Class 8 AP comfortable headroom.',
      'There is no 100 W class: Type 4 caps PSE at 90 W, and §716.523.2.101 caps the cabling at 750 mA per conductor.',
      'PoE imposes no current limits in BS 7671, so the port may be set to any output the switch supports.',
      'BS 7671 §716 caps every PSE port at 60 W, so the 90 W draw is non-compliant and the AP cannot be used.',
    ],
    correctIndex: 1,
    explanation:
      "There is no 100 W PoE class — the highest IEEE 802.3bt class (Type 4 / Class 8) is 90 W PSE / 71.3 W PD. BS 7671 §716.523.2.101 imposes a HARD regulatory ceiling of 750 mA per conductor for ELV DC distribution over balanced cabling, and §716.526.101 imposes 750 mA per contact at the connecting hardware. The active equipment (PSE port) is selected from BS EN IEC 62368-1 / 62368-3 conformant kit — the cabling is the passive infrastructure that must safely conduct that current within the 750 mA ceiling and within the cable's thermal de-rating envelope (TIA TSB-184-A, BS EN 50174-2).",
  },
  {
    id: 'datacabling-m1s3-bonding-passive-screen',
    question:
      'A screened (S/FTP) Cat6A installation is fitted in a building with metallic cable basket. From 15 April 2026, what does BS 7671 §444.5.3.1 require for the screen, the basket and the conductive sheath of the data cables?',
    options: [
      'Nothing — screened data cabling is wholly exempt from the §444 bonding requirements.',
      'The metallic containment, conductive screens and conductive sheaths must all be connected to the equipotential bonding network.',
      'Only the patch panels need to be bonded; the basket and screens are left floating.',
      'Bonding is required only for fibre containment, not for copper-screen data cabling.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 §444.5.3.1 (verbatim from the A4:2026 RAG): "The following parts shall be connected to the equipotential bonding network: (a) metallic containment, conductive screens, conductive sheaths or armouring of data transmission cables or of information and communications technology equipment; (b) functional earthing conductors of antenna systems; (c) conductors of the earthed pole of a DC supply for information and communications technology equipment; (d) functional earthing conductors; (e) protective conductors." This pulls the PASSIVE metallic infrastructure of the data cabling — basket, screens, sheaths — into the equipotential bonding network alongside the active equipment\'s functional earthing.',
  },
  {
    id: 'datacabling-m1s3-demarcation',
    question:
      'A new contractor is taking over maintenance of a building. They ask "where is the demarcation between the cabling system and the network?". What is the cleanest answer?',
    options: [
      'There is no demarcation — the cabling and the network are one inseparable system.',
      'It is the patch-panel port at the FD and the outlet face: passive link between, active kit plugged into either end.',
      'The demarcation is the building front door, where responsibility passes to the occupier.',
      'There is no clean demarcation — the boundary is negotiated bespoke on every single job.',
    ],
    correctIndex: 1,
    explanation:
      "The patch-panel port and the outlet face are the canonical demarcation points between the cabling system (passive, Layer-1) and the network (active, Layer-2 and above). The cabling contractor delivers a tested permanent link from the patch panel port to the outlet face. Whatever is plugged into either end is the network operator's problem. This split is what allows two separate refresh cycles: cabling on a 15-20 year clock, active equipment on a 3-5 year clock. Mix them up and the financial case for structured cabling collapses.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the SINGLE most important reason structured cabling distinguishes between PASSIVE infrastructure and ACTIVE equipment?',
    options: [
      'Their life-cycle economics differ: passive infrastructure lasts 15-20 years while active equipment is refreshed every 3-5 years.',
      'It produces a tidier, more itemised quotation that commercial clients find easier to read and approve.',
      'Active equipment is always more expensive than passive infrastructure, so it must be costed in a separate line.',
      'Only active equipment is subject to regulation, so the passive infrastructure can be ignored for compliance purposes.',
    ],
    correctAnswer: 0,
    explanation:
      "Life-cycle separation is the architectural reason for the passive/active split. Passive infrastructure is installed once during fit-out, when access to walls, ceilings and risers is easy and cheap. Active equipment is replaced multiple times across the same period, when access has become hard and expensive. Designing the building so that the slow-churning bit is the easy-access bit is structured cabling's commercial trick.",
  },
  {
    id: 2,
    question:
      'Which list correctly classifies items as PASSIVE infrastructure (no electronics, no firmware, no power)?',
    options: [
      'Switches, routers, wireless access points and IP phones — the kit at each end of a link.',
      'PoE injectors, media converters and managed PDUs that sit inline on the cabling.',
      'IP cameras, access-control readers and addressable sensors mounted at the work area.',
      'Balanced twisted-pair cable, RJ45 outlets, faceplates, patch panels, fibre splice trays and cassettes, jumpers/patch cords, cable basket/tray and labels.',
    ],
    correctAnswer: 3,
    explanation:
      'Passive items have no power input, no firmware and no MAC address. Cable, outlets, faceplates, patch panels, fibre cassettes, splice trays, jumpers and the containment system are all passive. Anything with electronics that needs power and firmware (switches, APs, PoE injectors, cameras, media converters, IP phones) is active. The boundary is clear — power input + firmware = active, neither = passive.',
  },
  {
    id: 3,
    question:
      'BS 7671:2018+A4:2026 §444.5.3.1 lists five categories of conductive part that MUST be connected to the equipotential bonding network. Which of the following is NOT one of them?',
    options: [
      'Metallic containment, conductive screens, conductive sheaths or armouring of data transmission cables or ICT equipment.',
      'Functional earthing conductors of antenna systems.',
      'Conductors of the earthed pole of a DC supply for ICT equipment.',
      'The carrier-grade Ethernet switch chassis ground stud, when separately earthed via the active power supply.',
    ],
    correctAnswer: 3,
    explanation:
      '§444.5.3.1 lists five passive-infrastructure parts that must join the equipotential bonding network: (a) metallic containment, conductive screens, conductive sheaths or armouring of data transmission cables or ICT equipment; (b) functional earthing conductors of antenna systems; (c) conductors of the earthed pole of a DC supply for ICT equipment; (d) functional earthing conductors; (e) protective conductors. The active switch chassis is connected via its own protective conductor under §543/544 — the §444.5.3.1 list focuses on the passive infrastructure that historically was overlooked.',
  },
  {
    id: 4,
    question:
      'Where is the conventional DEMARCATION between the cabling system (passive) and the network (active)?',
    options: [
      "At the patch-panel port at the floor distributor and the outlet face at the work area — everything between (the permanent link, any consolidation point and the containment) is the cabling contractor's passive infrastructure, and everything plugged into either end is the operator's active equipment.",
      'At the building boundary, where the incoming carrier service enters the comms room.',
      'At the first cable joint or splice inside the wall, where the installed cable meets the patch lead.',
      'There is no fixed demarcation; it is negotiated separately on every project.',
    ],
    correctAnswer: 0,
    explanation:
      'The patch-panel port and the outlet face are the canonical demarcation points. The cabling contractor warrants the link between them — tested, labelled, documented under BS EN 50174-1 / TIA-606-D. The network operator then owns everything plugged in. This split is what enables two separate refresh cycles: cabling on a 15-20 year clock, active equipment on a 3-5 year clock.',
  },
  {
    id: 5,
    question:
      'IEEE 802.3bt Type 4 PoE delivers what maximum power at the PSE port and what maximum at the PD?',
    options: [
      '100 W PSE / 100 W PD — the lossless top class with no channel de-rating.',
      '90 W PSE / 71.3 W PD — channel losses over 100 m account for the difference.',
      '60 W PSE / 51 W PD — the Type 3 four-pair class, often mislabelled Type 4.',
      '15.4 W PSE / 12.95 W PD — the original Type 1 two-pair power level.',
    ],
    correctAnswer: 1,
    explanation:
      "IEEE 802.3bt (4PPoE, 2018) defines four Types: Type 1 (15.4 W / 12.95 W), Type 2 (30 W / 25.5 W), Type 3 (60 W / 51 W) and Type 4 (90 W / 71.3 W). There is no 100 W class. The BS 7671 §716.523.2.101 hard regulatory cap is 750 mA per conductor — independent of the PSE-class number — and §716.526.101 imposes the same 750 mA per contact at the connecting hardware. Specifying '100 W PoE' is a category error.",
  },
  {
    id: 6,
    question:
      'A 24-port switch is replaced with a 48-port switch from the same vendor. Does the cabling need re-pulling?',
    options: [
      'Yes — any switch refresh requires the affected outlets to be re-pulled to the new device.',
      'Yes — re-pulling is needed only when the replacement switch is from a different vendor.',
      'No — the switch is active and the cabling passive: the home runs are already in place, so the new switch simply slots in.',
      'No — but only if the patch panel happens to have spare ports of the correct performance category.',
    ],
    correctAnswer: 2,
    explanation:
      'The cabling is service-independent. The same physical permanent links serve a 24-port switch, a 48-port switch, a chassis-based stack or a fibre-to-the-edge upgrade — provided the cabling specification (Cat6A / Class EA, 90 m permanent link, 100 m channel) was done correctly at first fit. Changing the switch is an ACTIVE-LAYER refresh that the passive infrastructure absorbs without modification.',
  },
  {
    id: 7,
    question:
      'A site has 24 Cat6A cables in a single bundle, all carrying Type 4 PoE++ continuously. Which BS 7671 clause and which non-BS-7671 standard are most directly relevant to the bundle thermal design?',
    options: [
      'BS 7671 §413 (protection by SELV/PELV); ISO/IEC 11801-5 (data-centre generic cabling).',
      'BS 7671 §716.523 (design current and the 750 mA per-conductor cap); ANSI/TIA TSB-184-A for bundle de-rating.',
      'There is no thermal limit on a Cat6A bundle, so no specific clause or de-rating standard applies.',
      'BS 7671 §544 (protective bonding conductors); ANSI/TIA-942-C (data-centre infrastructure).',
    ],
    correctAnswer: 1,
    explanation:
      'Bundle thermal management is the moment the passive cabling becomes a power-distribution system. §716.523.1.101 NOTE 1 makes the link explicit: "Any temperature rise of the data cables due to the load current they carry, or other causes, will increase the attenuation/insertion loss of the cables. Thus the performance of information transmission channels can be degraded." NOTE 2 points to PD CLC/TR 50174-99-1 and BS ISO/IEC 14763-2 for bundle-management guidance. ANSI/TIA TSB-184-A is the matching TIA reference. The 750 mA per-conductor hard cap (§716.523.2.101) applies regardless.',
  },
  {
    id: 8,
    question:
      "A specifier wants to claim that a Cat6A install is 'future-proofed for 25 GBASE-T'. What about the PASSIVE infrastructure must be true for that claim to hold?",
    options: [
      'Nothing about the passive layer matters — the active switch determines whether 25GBASE-T runs.',
      'The cable jacket must be a specific colour and the install must be signed off by a vendor-certified contractor.',
      'The as-built channel must certify as Class EA or better, within bundle de-rating and the 90 m permanent-link limit.',
      'The permanent link merely needs to be under 100 m long; the certified Class is irrelevant to the speed claim.',
    ],
    correctAnswer: 2,
    explanation:
      'The PASSIVE infrastructure delivers a CHANNEL of measured performance. 25GBASE-T (IEEE 802.3bq, 2016) requires Class EA at 100 m, which Cat6A is designed to deliver. The certification process — TIA-1152-A field testing or BS EN 50346 — verifies that the channel as built meets the Class. Bundle de-rating, bonding compliance and 90 m permanent-link discipline are all install-practice constraints that determine whether the certification passes. "Future-proofed" only means anything if it is the certified Class number, not the cable Category number on the box.',
  },
  {
    id: 9,
    question:
      'Why does the §716 / §545 framework in BS 7671:2018+A4:2026 specifically apply to the PASSIVE cabling infrastructure?',
    options: [
      'Because §716 treats PoE-energised cabling as an ELV DC power circuit and §545 covers its functional earthing.',
      'Because the active equipment is entirely unregulated, so BS 7671 must step in and cover the cabling instead.',
      'Because A4:2026 deletes all active-equipment regulation and folds it wholesale into the cabling clauses.',
      'Because the active PSE/PD equipment is regulated by BS 7430, leaving §716/§545 to cover only the cabling.',
    ],
    correctAnswer: 0,
    explanation:
      'Before A4:2026, BS 7671 governed only the LV / ELV power that energised the active equipment. From 15 April 2026, §716 brings the cabling itself inside the wiring regs — recognising that PoE makes the cabling a power-distribution circuit — and §545 distinguishes ICT functional earthing of the metallic infrastructure from protective earthing under §543/544. Both clauses regulate the PASSIVE cabling, complementing the BS EN IEC 62368-1 / 62368-3 regulation of the ACTIVE PSE/PD equipment.',
  },
  {
    id: 10,
    question: 'Which TWO economic outcomes follow directly from a clean passive/active split?',
    options: [
      'Lower headline cabling cost and a faster first-fix install programme.',
      'Cheaper active switches, because they no longer need to drive long cable runs.',
      'Higher achievable rents, because certified cabling is a marketable building feature for tenants.',
      'Refresh cycles are decoupled (cabling 15-20 yr, active 3-5 yr) and contractor scope is decoupled — both cutting total cost of ownership.',
    ],
    correctAnswer: 3,
    explanation:
      'Clean passive/active separation produces two valuable economic outcomes simultaneously: (1) decoupled refresh cycles — the slow-churning passive infrastructure is built once at fit-out when access is cheapest, and the fast-churning active equipment is replaced multiple times without disturbing it; (2) decoupled contractor scope — different specialist trades, different warranties, different test/handover regimes. The discipline that delivers both is the strict definition of demarcation (patch-panel port + outlet face) and the strict separation of certification regimes.',
  },
];

const faqs = [
  {
    question: 'Are patch cords passive or active?',
    answer: (
      <>
        Passive — they are stranded-conductor balanced cables with RJ45 plugs at each end. No
        electronics, no firmware. They are part of the channel performance budget under TIA-568.0-E
        / BS EN 50173-1 (the "10 m cord allowance" inside the 100 m channel rule). However, a patch
        cord differs from the permanent link: patch cords are NOT contractor-certified — they are
        catalogue items selected from the cabling vendor's approved range, replaced when worn. The
        passive/active line runs through the patch cord on the passive side.
      </>
    ),
  },
  {
    question: 'What about a PoE injector — is it passive or active?',
    answer: (
      <>
        Active. A PoE injector takes a non-PoE Ethernet signal and adds DC power to the cable to
        make it PoE — that requires power input, electronics and (often) firmware. It is a PSE in
        the IEEE 802.3bt sense, and it is regulated by BS EN IEC 62368-3 in the same way as the PoE
        port on a managed switch. Some injectors are unmanaged (no firmware, just power
        electronics), but the presence of a power supply makes them active by every definition the
        structured-cabling industry uses.
      </>
    ),
  },
  {
    question: 'Are fibre splice trays and OTDR launch / receive cords passive?',
    answer: (
      <>
        Yes — both are passive. A splice tray houses fusion or mechanical splices in a fibre
        permanent link; the splices themselves are tiny passive joints that introduce a known small
        insertion loss (typically 0.05-0.1 dB per fusion splice). OTDR launch and receive cords are
        passive fibre cables used to characterise the link from the OTDR's perspective. The OTDR
        ITSELF is a test instrument (with optical and electronic guts) — it is diagnostic active
        equipment, but it is not part of the installed network.
      </>
    ),
  },
  {
    question:
      'How does BS 7671 §545 (ICT functional earthing) apply to passive infrastructure specifically?',
    answer: (
      <>
        §545.1.1 (verbatim): "Where the functional equipotential bonding system is not locally
        connected to the protective equipotential bonding system in accordance with Section 444, the
        functional bonding conductors shall be: (a) insulated for the highest voltage expected
        between the functional bonding system and Earth and/or between the functional bonding system
        and simultaneously accessible exposed-conductive-parts; (b) installed separately from the
        protective conductor; (c) connected to the main earthing terminal (MET) only once." The
        cabling's PASSIVE metallic infrastructure (cable screens, sheaths, baskets) is bonded into
        this functional earthing network alongside the active equipment's functional earthing
        conductors. §545.1.2 sets the minimum CSA at 2.5 mm² Cu (with mechanical protection) or 4
        mm² Cu (without). This is a passive-infrastructure regulation — it tells the cabling
        contractor what to do, not the network operator.
      </>
    ),
  },
  {
    question:
      'If I am installing a small office and the client says "skip the patch panel — just terminate the cables straight onto the switch", what is wrong with that?',
    answer: (
      <>
        Three things. (1) It collapses the passive/active demarcation: the cabling no longer
        terminates at a passive face — it terminates at active equipment. There is no
        contractor-warranted permanent link to certify; you cannot test the link to TIA-1152-A / BS
        EN 50346 from active equipment. (2) Switch refresh now requires re-terminating every cable:
        instead of unplugging cords and swapping switches, the new switch needs the same 24/48
        cables stripped, dressed and terminated again — a full cabling-shop visit on every active
        refresh. (3) The cabling becomes vendor-specific: switch ports are not patch panels;
        replacing a switch with a different vendor / form factor means re-terminating again. The
        patch panel is the cheap insurance that keeps the cabling service-independent and the
        demarcation clean.
      </>
    ),
  },
  {
    question: 'Does the passive/active distinction map onto the OSI layers?',
    answer: (
      <>
        Closely, but not exactly. The PASSIVE cabling system delivers Layer 1 — the physical medium.
        ACTIVE equipment operates at Layer 2 (switching, MAC addresses, VLAN tagging, spanning tree)
        and above (Layer 3 routing, Layer 4 transport, application-layer services). The patch panel
        is the physical demarcation between the passive Layer-1 infrastructure and the Layer-2
        active equipment. The exception is fibre splices and connectors — they are passive
        components that are still "Layer 1" but introduce measurable optical performance impacts;
        that is why every splice is logged in the link records under BS EN 50174-1 / TIA-606-D
        administration.
      </>
    ),
  },
];

const DataCablingModule1Section3 = () => {
  const navigate = useNavigate();

  useSEO(
    'Passive vs Active Hardware | Data Cabling Module 1.3 | Elec-Mate',
    'The passive vs active distinction in structured cabling — passive infrastructure (cable, patch panels, outlets, splices, basket) on a 15-20 year refresh cycle; active equipment (switches, routers, APs, PoE PSE) on a 3-5 year cycle. Demarcation between Layer-1 cabling and Layer-2+ networking, and how BS 7671:2018+A4:2026 §716 / §545 / §444.5.3.1 specifically regulate the passive metallic infrastructure.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3"
            title="Passive vs Active Hardware"
            description="The life-cycle and regulatory split that makes structured cabling pay back. Passive infrastructure (the cabling itself, patch panels, outlets, splices, basket) lives 15-20 years; active equipment (switches, routers, APs, PoE PSE) refreshes every 3-5 years. The patch-panel port and the outlet face are the demarcation between Layer-1 and Layer-2, and BS 7671:2018+A4:2026 §716 / §545 / §444.5.3.1 specifically regulate the passive metallic infrastructure."
            tone="yellow"
          />

          <TLDR
            points={[
              'PASSIVE infrastructure has no power input, no firmware, no MAC address. ACTIVE equipment has all three. The split is binary — cable, patch panels, outlets, splices, basket are passive; switches, routers, APs, PoE injectors, IP phones, cameras are active.',
              'The two have very different life-cycle economics: passive infrastructure is designed for 15-20 years (one fit-out, hard-to-access locations); active equipment is refreshed every 3-5 years on the vendor roadmap. Structured cabling separates them so each can be procured and refreshed on its own clock.',
              'The DEMARCATION between the two is the patch-panel port at the FD and the outlet face at the work area. The cabling contractor warrants the certified permanent link between those two points; the network operator owns everything plugged into either end.',
              'BS 7671:2018+A4:2026 specifically regulates the PASSIVE cabling: §444.5.3.1 brings cable screens, sheaths, basket and ICT functional earthing into the equipotential bonding network; §716 (PoE / ELV DC) treats the cabling as a power-distribution circuit with a 750 mA per-conductor hard cap; §545 governs ICT functional earthing of the metallic infrastructure.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define PASSIVE infrastructure and ACTIVE equipment with the operational test (power input + firmware = active; neither = passive)',
              'List the typical passive items on a structured-cabling job (balanced cable, RJ45 outlets, faceplates, patch panels, fibre splice trays, fibre cassettes, jumpers / patch cords, basket / tray, labels) and the typical active items (switches, routers, APs, PoE injectors, media converters, IP phones, cameras)',
              'Articulate the passive/active life-cycle economics (15-20 years vs 3-5 years) and explain why the financial case for structured cabling depends on the split',
              'Identify the demarcation between cabling and network — patch-panel port at the FD and outlet face at the work area — and use it to scope contractor responsibilities',
              'Apply BS 7671:2018+A4:2026 §444.5.3.1 to the passive metallic infrastructure: cable screens, conductive sheaths, armouring, containment all bond into the equipotential bonding network',
              'Apply BS 7671:2018+A4:2026 §716 to the cabling as a power-distribution circuit (750 mA per-conductor hard cap; 90 W PSE / 71.3 W PD Type 4 limits; bundle thermal de-rating)',
              'Apply BS 7671:2018+A4:2026 §545 to ICT functional earthing of passive metallic infrastructure (2.5 / 4 mm² Cu minimum CSA; MFET concept)',
              'Justify the passive-first procurement discipline (specify and certify cabling as a service-independent system; let active equipment plug in and refresh on its own schedule)',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>What "passive" and "active" actually mean</ContentEyebrow>

          <ConceptBlock
            title="A binary split: power input + firmware = active; neither = passive"
            plainEnglish={`Every item on a structured-cabling site is either passive or active. The test is operational, not philosophical: does it need a power supply and run firmware? If yes, active. If no, passive. The cabling itself, the patch panels, the outlets, the faceplates, the fibre cassettes, the splice trays, the cable basket, the labels — all passive. The switches, the routers, the wireless access points, the PoE injectors, the media converters, the IP phones, the cameras, the access-control readers — all active. There is no third category for generic-cabling work.`}
            onSite={`On a survey, the test is the kettle: would unplugging this device make a fan stop or an LED go out? If yes, it is active. If unplugging is meaningless because there is nothing to unplug — the patch panel does not have a power lead, the outlet does not have a power lead, the fibre splice tray does not have a power lead — it is passive. This sounds trivial, but on a busy site with mixed kit it is the cleanest decision rule there is.`}
          >
            <p>The two sides of the split, in detail:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>PASSIVE infrastructure (no electronics, no firmware, no power).</strong> The
                balanced twisted-pair cable (Cat5e / Cat6 / Cat6A / etc.); the optical fibre cable
                (OM3/OM4/OM5 multimode, OS1/OS2 single-mode); the keystone modules, faceplates and
                floor boxes at the work-area outlet (TO); the patch panels at the FD; the fibre
                splice trays and cassettes; the LC / SC / MTP/MPO connectors; the jumpers and patch
                cords; the labels and labelling rail; the cable basket / tray / ladder /
                containment; the floor / wall / ceiling penetrations and their fire stops; the
                consolidation point (CP) hardware; the multi-user telecommunications outlet assembly
                (MUTOA) housing.
              </li>
              <li>
                <strong>ACTIVE equipment (electronics + firmware + power).</strong> The building's
                core / aggregation / access switches; the routers; the wireless controllers and
                access points; the PoE injectors and midspans; the media converters
                (copper-to-fibre); the patch-cord-mounted PoE splitters; the IP phones; the IP
                cameras; the access-control readers and door controllers; the PDUs and UPSs (which
                are themselves active power-distribution gear); the fibre-distribution terminal that
                contains optical splitters (passive splitters yes — the housing and any active
                monitoring electronics, no).
              </li>
            </ul>
            <p>
              The boundary really is binary. Even items that look hybrid resolve cleanly: a managed
              patch panel with port-monitoring LEDs is active (it has a microcontroller and a power
              feed); a pure passive patch panel is passive. A "powered" cable assembly (e.g. one
              with embedded boost electronics) is active; a plain copper or fibre cable is passive.
              The discipline of the spec is to declare the split for every item and not let "smart"
              features blur it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50173-1 · §3 (Definitions — paraphrased)"
            clause={
              <>
                Generic cabling is the structured telecommunications cabling installed at a customer
                premises that supports a wide range of telecommunications applications without
                modification. It comprises the cables, connectors, accessories and supporting
                infrastructure that form the channel and permanent link, but does NOT include the
                active equipment (transceivers, switches, routers, network appliances) that connects
                to the channel.
              </>
            }
            meaning="The standard explicitly excludes active equipment from the generic-cabling scope. The cabling system stops at the connector face — at the patch-panel port and at the outlet face. Everything plugged into either end is application equipment, governed by its own product standards (IEEE 802.3 family, BS EN IEC 62368-1, etc.)."
            cite="See also ANSI/TIA-568.0-E · §3 (Definitions); ISO/IEC 11801-1 · §3 — same scope-exclusion of active equipment."
          />

          <ContentEyebrow>The life-cycle economics — 15-20 years vs 3-5 years</ContentEyebrow>

          <ConceptBlock
            title="Two refresh clocks, decoupled — that is the architecture's commercial trick"
            plainEnglish={`Passive infrastructure is designed and specified to last 15-20 years. It is installed once during fit-out, when the building is empty and access to walls, ceilings, risers and floor voids is easy. After fit-out, the cable basket is buried above a suspended ceiling and the cables are dressed inside walls — getting at any of it again is expensive and disruptive. Active equipment, by contrast, refreshes every 3-5 years on the vendor's roadmap. New switches are quicker, cheaper, more secure, more energy-efficient. APs upgrade through Wi-Fi generations roughly every 4-5 years. The two refresh cycles are completely independent — and structured cabling is designed to keep them that way.`}
            onSite={`The contractor's job at fit-out is to deliver passive infrastructure that absorbs the active-layer refreshes for the next two decades. Specify a Class with headroom (Class EA / Cat6A is the 2026 default — absorbs 10G, accommodates 25G in shorter runs, supports Type 4 PoE++ thermally). Provision pathway capacity for ~50% growth in cable count. Use generous outlet density (more outlets cost almost nothing at first fit; adding them later is brutal). Document everything to BS EN 50174-1 / TIA-606-D administration. Then walk away — the active-layer churn is not your problem after handover.`}
          >
            <p>The two clocks, in numbers (typical for UK commercial fit-outs):</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Passive infrastructure clock — 15 to 20 years.</strong> Cable lifetime is
                set by insulation degradation, mechanical fatigue at terminations, and eventually by
                performance obsolescence — the moment the building wants a service that the original
                Class cannot deliver at 100 m. A Cat5e install from 2002 is hitting that wall in
                2026 because 10GBASE-T at 100 m is out of scope. A Cat6A install from 2014 is
                comfortably absorbing 10G and Type 4 PoE in 2026. The hardware does not "wear out"
                in 15 years; it gets overtaken by services.
              </li>
              <li>
                <strong>Active equipment clock — 3 to 5 years.</strong> Switch / router / AP refresh
                is driven by vendor end-of-sale and end-of-support, by security-patch lifecycle, by
                energy-efficiency improvements, and by per-port performance gains. A 2018 switch is
                end-of-support around 2025; a 2018 Wi-Fi 5 (802.11ac) AP is superseded by Wi-Fi 6 /
                6E (2020) and Wi-Fi 7 (2024). Refresh is continuous — planning departments budget
                for it as a known operating cost.
              </li>
              <li>
                <strong>Cost-of-access at year zero vs year five.</strong> At fit-out, with the
                building empty, pulling a Cat6A horizontal run costs perhaps £40-£80 per run
                including labour and termination. Adding the same run two years later, with the
                building occupied, ceilings down, furniture moved, weekend access, can cost
                £200-£400. Adding it five years later, with significant churn already, may require a
                partial re-fit. The first-fit cost is the moment to over-spec density — the
                labour-cost differential dwarfs the cable cost.
              </li>
            </ul>
            <p>
              Decoupling the two clocks is the architectural mechanism that delivers the
              service-independence pitch from Section 1: install the passive infrastructure once,
              right, and let the active layer churn over it for fifteen years. This is the same idea
              expressed financially.
            </p>
          </ConceptBlock>

          {/* Two-clock life-cycle diagram — passive vs active */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Two refresh clocks — passive infrastructure (15-20 years) vs active equipment (3-5
              years)
            </h4>
            <svg
              viewBox="0 0 900 600"
              className="w-full h-auto"
              role="img"
              aria-label="Two horizontal life-cycle bars stacked vertically against a shared 0-to-20 year axis. The top bar represents passive infrastructure as a single yellow span across the full twenty-year run, with a label row above and a clarifying caption row below the bar. The bottom bar represents active equipment as four equal cyan refresh-generation segments separated by visible gaps, also with a label row above and caption row below. All labels live in dedicated rows above or below the bars; nothing overlaps a bar boundary or another row. A bordered legend panel at the foot maps each colour to its category and notes the regulating BS 7671 clauses."
            >
              {/* ===== Year axis (top, y 24-78) ===== */}
              <text
                x="80"
                y="40"
                fill="#9CA3AF"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                YEAR 0
              </text>
              <text
                x="820"
                y="40"
                fill="#9CA3AF"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
                textAnchor="end"
              >
                YEAR 20
              </text>
              <line
                x1="80"
                y1="54"
                x2="820"
                y2="54"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              {[0, 5, 10, 15, 20].map((y) => {
                const x = 80 + (y * 740) / 20;
                return (
                  <g key={'tick-' + y}>
                    <line
                      x1={x}
                      y1="48"
                      x2={x}
                      y2="60"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y="74"
                      fill="#CBD5E1"
                      fontSize="10"
                      textAnchor="middle"
                      fontWeight="600"
                      fontFamily="system-ui"
                    >
                      y{y}
                    </text>
                  </g>
                );
              })}

              {/* ===== Passive — label row (y 100-130) ===== */}
              <text
                x="80"
                y="112"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                PASSIVE INFRASTRUCTURE
              </text>
              <text x="80" y="128" fill="#FEF3C7" fontSize="10.5" fontFamily="system-ui">
                cable · patch panels · outlets · splices · cable basket · faceplates
              </text>

              {/* ===== Passive bar (y 142-198) ===== */}
              <rect
                x="80"
                y="142"
                width="740"
                height="56"
                rx="8"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.8"
              />
              <text
                x="450"
                y="167"
                textAnchor="middle"
                fill="#FEF9C3"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ONE INSTALL — 15 to 20 YEAR LIFE
              </text>
              <text
                x="450"
                y="186"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                specified to a Class · certified at handover
              </text>

              {/* ===== Passive — caption row BELOW the bar (y 218-250) ===== */}
              <text x="80" y="228" fill="#CBD5E1" fontSize="10.5" fontFamily="system-ui">
                Class EA / Cat6A typical 2026 default · TIA-1152-A or BS EN 50346 field
                certification at handover.
              </text>
              <text x="80" y="246" fill="#CBD5E1" fontSize="10.5" fontFamily="system-ui">
                BS 7671:2018+A4:2026 — §444.5.3.1 (bonding) · §716 (PoE / ELV DC) · §545 (ICT
                functional earthing).
              </text>

              {/* ===== Active — label row (y 280-310) ===== */}
              <text
                x="80"
                y="292"
                fill="#A5F3FC"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                ACTIVE EQUIPMENT
              </text>
              <text x="80" y="308" fill="#CFFAFE" fontSize="10.5" fontFamily="system-ui">
                switches · routers · APs · PoE injectors · media converters · IP phones / cameras
              </text>

              {/* ===== Active bars — four refresh generations (y 322-378) ===== */}
              {[
                { x0: 80, x1: 265, gen: 'GEN 1', range: 'y0 - y5' },
                { x0: 265, x1: 450, gen: 'GEN 2', range: 'y5 - y10' },
                { x0: 450, x1: 635, gen: 'GEN 3', range: 'y10 - y15' },
                { x0: 635, x1: 820, gen: 'GEN 4', range: 'y15 - y20' },
              ].map((gen, i) => (
                <g key={'gen-' + i}>
                  <rect
                    x={gen.x0 + 6}
                    y="322"
                    width={gen.x1 - gen.x0 - 12}
                    height="56"
                    rx="6"
                    fill="rgba(34,211,238,0.18)"
                    stroke="#22D3EE"
                    strokeWidth="1.5"
                  />
                  <text
                    x={(gen.x0 + gen.x1) / 2}
                    y="346"
                    textAnchor="middle"
                    fill="#CFFAFE"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="system-ui"
                  >
                    {gen.gen}
                  </text>
                  <text
                    x={(gen.x0 + gen.x1) / 2}
                    y="364"
                    textAnchor="middle"
                    fill="#CFFAFE"
                    fontSize="10"
                    fontFamily="system-ui"
                  >
                    {gen.range}
                  </text>
                </g>
              ))}

              {/* ===== Active — caption row BELOW the bars (y 398-432) ===== */}
              <text x="80" y="408" fill="#CBD5E1" fontSize="10.5" fontFamily="system-ui">
                Refreshed every 3-5 years on vendor end-of-support / Wi-Fi-generation cycle (Wi-Fi 5
                → 6 → 6E → 7).
              </text>
              <text x="80" y="426" fill="#CBD5E1" fontSize="10.5" fontFamily="system-ui">
                Regulated as a product under BS EN IEC 62368-1 / 62368-3 + the IEEE 802.3 Ethernet
                family.
              </text>

              {/* ===== Legend panel (y 460-580) ===== */}
              <rect
                x="60"
                y="460"
                width="800"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="80"
                y="484"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Two-column legend body */}
              <rect
                x="80"
                y="498"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.20)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text x="104" y="510" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Passive infrastructure — Layer-1 cabling, no firmware, no power input
              </text>

              <rect
                x="80"
                y="524"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="104" y="536" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Active equipment — Layer-2+ networking kit, firmware + power input
              </text>

              {/* Demarcation footer */}
              <line
                x1="80"
                y1="552"
                x2="840"
                y2="552"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="450"
                y="570"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Demarcation between the two clocks: patch-panel port at the FD and outlet face at
                the work area.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Demarcation — where Layer-1 ends and Layer-2 begins</ContentEyebrow>

          <ConceptBlock
            title="Patch-panel port + outlet face: the two physical demarcation points on every job"
            plainEnglish={`The cabling system terminates at the patch-panel port at the floor distributor (FD) and at the outlet face at the work-area outlet (TO). Everything between those two points — the permanent link, any consolidation point, the supporting containment, the labelling, the bonding — is the cabling contractor's passive infrastructure, certified under BS EN 50173-1 / 50174-1. Everything plugged into either point is the network operator's active equipment. The patch cord is the umbilical that physically connects the two regimes; it is itself passive but it is not part of the certified permanent link.`}
            onSite={`On handover, the cabling contractor delivers a tested permanent link with a TIA-1152-A or BS EN 50346 certificate, an as-built diagram, and a labelled patch panel + outlet pair. The network operator then plugs in the switch on one end and the user device on the other end. Two separate scopes, two separate test regimes, two separate refresh cycles. When something goes wrong, the demarcation tells you whose problem it is: a permanent-link test failure is the cabling contractor's; an active-equipment configuration failure is the network operator's; a patch-cord failure is a consumable that the network operator replaces.`}
          >
            <p>The demarcation in practice — the three physical interfaces:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>FD-side: the patch-panel port.</strong> A passive RJ45 punch-down (or fibre
                LC / SC port) at the back of the patch panel, where the permanent link's horizontal
                cable terminates. The cabling contractor punches it down, tests it, certifies it,
                labels it. The network operator's patch cord plugs into the FRONT of the same port
                to connect to the switch. The label on the front carries the circuit ID matching the
                BS EN 50174-1 / TIA-606-D record.
              </li>
              <li>
                <strong>WA-side: the outlet face.</strong> A passive RJ45 (or fibre) keystone module
                at the work-area outlet (TO). The cabling contractor punches the permanent link's
                other end onto the back, snaps the keystone into the faceplate, labels the front.
                The user's work-area cord plugs into the FRONT to connect the user's device. The
                label on the front again carries the matching circuit ID.
              </li>
              <li>
                <strong>The patch cord — the umbilical.</strong> Stranded, factory-terminated,
                catalogue-purchased patch cord that connects the patch-panel front face to the
                switch port (FD-side) and the outlet front face to the user's device (WA-side).
                Passive but consumable. Replaced when worn. NOT part of the certified permanent
                link; it is the network operator's responsibility.
              </li>
            </ul>
            <p>
              These three interfaces are the entire physical contract between the cabling contractor
              and the network operator. The cabling contractor warrants the permanent link from the
              back of the patch panel to the back of the keystone. The network operator owns
              everything in front, plus the active equipment plus the patch cords. When the
              contracts and the labels match the standards, an inspector or a future contractor can
              walk into the comms room ten years later and immediately understand the system.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Passive vs active — items, life-cycle, governing standard"
            source="BS EN 50173-1 / 50174-1 · BS 7671:2018+A4:2026 · IEEE 802.3 · BS EN IEC 62368-3"
            headers={['Item', 'Passive / Active', 'Typical life', 'Primary governing document']}
            rows={[
              [
                'Balanced twisted-pair cable (Cat5e/6/6A)',
                'Passive',
                '15-20 years',
                'BS EN 50173-1 · BS EN 50288 (cable spec)',
              ],
              [
                'Optical fibre cable (OM3/4/5, OS1a/2)',
                'Passive',
                '20-25 years',
                'BS EN 50173-1 · BS EN 60793 (fibre spec)',
              ],
              [
                'RJ45 keystone outlet + faceplate',
                'Passive',
                '15-20 years',
                'BS EN 50173-1 · BS EN 60603 (connector)',
              ],
              ['Patch panel (24 / 48 / 96 port)', 'Passive', '15-20 years', 'BS EN 50173-1'],
              [
                'Fibre splice tray + cassette',
                'Passive',
                '20-25 years',
                'BS EN 50173-1 · BS EN 50411 (splice closure)',
              ],
              [
                'Patch cord / equipment cord',
                'Passive (consumable)',
                '5-10 years',
                'BS EN 50173-1 §6.4.4 (cord allowance)',
              ],
              [
                'Cable basket / tray / containment',
                'Passive',
                '20-25 years',
                'BS EN 61537 · BS 7671 §521.10.202 (fire collapse)',
              ],
              [
                'Access switch (24/48 port, PoE)',
                'Active',
                '5-7 years',
                'IEEE 802.3 · BS EN IEC 62368-1 · BS EN IEC 62368-3 (PoE)',
              ],
              [
                'Aggregation / core switch',
                'Active',
                '7-10 years',
                'IEEE 802.3 · BS EN IEC 62368-1',
              ],
              [
                'Wireless access point (Wi-Fi 6/6E/7)',
                'Active',
                '4-5 years',
                'IEEE 802.11 · BS EN 301 893',
              ],
              ['PoE injector / midspan', 'Active', '5-7 years', 'IEEE 802.3bt · BS EN IEC 62368-3'],
              [
                'IP phone / IP camera / access reader',
                'Active',
                '5-7 years',
                'IEEE 802.3 · BS EN IEC 62368-1',
              ],
              ['UPS / PDU', 'Active', '5-10 years', 'BS EN IEC 62040 (UPS)'],
            ]}
            notes="Passive items are governed by the cabling-performance standards (BS EN 50173 / 50174) and, from 15 April 2026, by BS 7671:2018+A4:2026 §716 (PoE), §545 (functional earthing) and §444.5.3.1 (bonding). Active items are governed by their respective IEEE / BS EN IEC product standards. The two regimes do not overlap — they meet at the patch-panel port and the outlet face."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            BS 7671 §444.5.3.1 — bonding the passive metallic infrastructure
          </ContentEyebrow>

          <ConceptBlock
            title="The passive cabling's metalwork is part of the equipotential bonding network — alongside the active equipment's earthing"
            plainEnglish={`Historically, "bonding the cabling system" was a quiet contractual handover: the LV electrician bonded their stuff under §544, the cabling contractor bonded their basket / screens / sheaths under BS EN 50310, and the two specifications didn't always meet cleanly. From 15 April 2026, BS 7671 §444.5.3.1 settles the question explicitly. Five categories of conductive part shall be connected to the equipotential bonding network — two of them are passive cabling infrastructure (metallic containment and conductive screens / sheaths / armouring of data cables) and three are functional-earthing related (antenna conductors, the earthed pole of an ICT DC supply, and other functional / protective earthing conductors). The passive cabling is now formally inside the bonding network.`}
            onSite={`On every screened (S/FTP) installation and every metallic-basket installation from 15 April 2026, the contractor's bonding scope explicitly includes: (a) the cable basket / tray / ladder — bonded along its length and at every connection between sections; (b) the cable screens / sheaths / armouring — bonded at the FD via the patch panel earth bar (or equivalent), and at the work-area outlet via the keystone earth lug; (c) any antenna functional earthing conductors; (d) any DC-pole conductors for ICT equipment; (e) the patch panel and equipment rack functional earthing into the MFET (or MET if combined per §545.2). The same MFET is used by the active equipment's functional earthing — that is by design.`}
          >
            <p>
              The five categories listed in §444.5.3.1 — verbatim from the A4:2026 RAG. Each applies
              to passive infrastructure, even though the historical instinct of an LV electrician
              was to think of bonding as an active-equipment problem:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>
                  (a) Metallic containment, conductive screens, conductive sheaths or armouring of
                  data transmission cables or of information and communications technology
                  equipment.
                </strong>{' '}
                The cable basket. The S/FTP screens of every screened cable. The drain wires. Any
                armouring. All of this is passive infrastructure, and from 15 April 2026 all of it
                is explicitly inside the equipotential bonding network.
              </li>
              <li>
                <strong>(b) Functional earthing conductors of antenna systems.</strong> Where a
                building has roof / wall-mounted antenna systems (DAS, GSM repeaters, point-to-point
                microwave), the antenna's functional earthing conductor joins the bonding network
                here. Passive structural metalwork and antenna grounding are bonded together.
              </li>
              <li>
                <strong>
                  (c) Conductors of the earthed pole of a DC supply for information and
                  communications technology equipment.
                </strong>{' '}
                Where a centralised DC supply (e.g. −48 V telecom DC, or PoE-bus DC distribution)
                has an earthed pole, that pole's conductor is bonded into the equipotential network.
                This is critical for stray-current management on multi-equipment ICT sites.
              </li>
              <li>
                <strong>(d) Functional earthing conductors.</strong> Per §545, ICT equipment may
                require functional earthing separately from protective earthing. Those functional
                earthing conductors join the bonding network here. CSAs are governed by §545.1.2 —
                minimum 2.5 mm² Cu with mechanical protection, 4 mm² Cu without.
              </li>
              <li>
                <strong>(e) Protective conductors.</strong> Standard CPCs from §543, included here
                for completeness — the equipotential bonding network is the destination for both
                functional and protective earthing conductors.
              </li>
            </ul>
            <p>
              The mesh size of the bonding network — for areas with high concentrations of ICT
              equipment — is governed by §444.1.3: not exceeding 2 m × 2 m where equipment
              susceptible to electromagnetic environmental interferences is installed. That is a
              passive-infrastructure design parameter — it dictates how the cable basket and bonding
              ring conductors are laid out, before any active equipment is sited.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.5.3.1 (Parts to be connected to the equipotential bonding network — verbatim)"
            clause={
              <>
                The following parts shall be connected to the equipotential bonding network: (a)
                metallic containment, conductive screens, conductive sheaths or armouring of data
                transmission cables or of information and communications technology equipment; (b)
                functional earthing conductors of antenna systems; (c) conductors of the earthed
                pole of a DC supply for information and communications technology equipment; (d)
                functional earthing conductors; (e) protective conductors.
              </>
            }
            meaning="The passive metallic infrastructure of the data cabling — basket, screens, sheaths, armouring — is INSIDE the equipotential bonding network, alongside the functional earthing of the active equipment. This is a hard requirement from 15 April 2026; it formalises a discipline that BS EN 50310 has long required and that competent contractors have been doing in good practice."
            cite={
              <>
                Verified verbatim from <code>bs7671_regulations.full_text</code> · A4:2026 edition.{' '}
                <AmendmentBadge regs={['444.5.3.1']} edition="A4:2026" />
              </>
            }
          />

          <ContentEyebrow>
            BS 7671 §716 + §545 — passive cabling as a power-distribution circuit
          </ContentEyebrow>

          <ConceptBlock
            title="Two new sections that regulate the cabling itself, separately from the active equipment"
            plainEnglish={`§716 (Power over Ethernet / ELV DC distribution over balanced cabling) and §545 (ICT functional earthing) are entirely new in BS 7671:2018+A4:2026, published 15 April 2026. Both are passive-infrastructure regulations: they regulate the cabling itself, not the PSE / PD active equipment that energises it. The PSE and PD are regulated as products under BS EN IEC 62368-1 / 62368-3. BS 7671 takes the passive cabling — historically Layer-1, governed only by BS EN 50173 / 50174 — and recognises that with PoE energised, the cabling is also an ELV DC power-distribution circuit. Conductor current limits, bonding requirements and CSAs follow.`}
            onSite={`On any PoE installation from 15 April 2026, the contractor's design check on the passive cabling becomes: (1) §716.521.101 — is the cable Cat5/6/6A/7/7A/8.1/8.2 (or other BS EN 50173-1 cable)? (2) §716.523.2.101 — does any conductor's design current exceed 750 mA? Calculate from PSE class and worst-case PD load, including DC resistance unbalance. (3) §716.526.101 — does the connecting hardware support 750 mA per contact? (4) §444.5.3.1 — are screens, sheaths, basket bonded to the equipotential bonding network? (5) §545.1.2 — are functional earthing conductors at least 2.5 / 4 mm² Cu? (6) §716.410.3.3 — is SELV or PELV applied? All six checks are on the PASSIVE infrastructure.`}
          >
            <p>The new clauses, by category:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§716.521.101 — Cable category.</strong>{' '}
                <AmendmentBadge regs={['716.521.101']} edition="A4:2026" /> "Information and
                communication technology (ICT) cables used for the distribution of DC power shall
                comply with Category 5, Category 6, Category 6A, Category 7, Category 7A, Category
                8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by reference to the
                specifications given in BS EN 50288 series." The cable selection is a
                passive-infrastructure decision.
              </li>
              <li>
                <strong>§716.523.2.101 — Conductor current limit.</strong>{' '}
                <AmendmentBadge regs={['716.523.2.101']} edition="A4:2026" /> "The load current
                (design current) in any conductor shall not exceed 750 mA." This is the HARD
                regulatory cap. It is independent of PSE class. It applies to the cabling.
              </li>
              <li>
                <strong>§716.526.101 — Connecting hardware.</strong>{' '}
                <AmendmentBadge regs={['716.526.101']} edition="A4:2026" /> The connecting hardware
                (RJ45 jack, plug, patch-panel punch-down) shall support a continuous operating
                current of 750 mA per contact, per BS ISO/IEC 11801-1. Patch panels and outlets are
                PASSIVE infrastructure that have to be selected against this current rating.
              </li>
              <li>
                <strong>§716.410.3.3 — SELV / PELV.</strong>{' '}
                <AmendmentBadge regs={['716.410.3.3']} edition="A4:2026" /> "The protective measure
                extra-low voltage provided by SELV or PELV shall be applied." This applies to the
                cabling-as-circuit.
              </li>
              <li>
                <strong>§545.1.2 — Functional earthing minimum CSA.</strong>{' '}
                <AmendmentBadge regs={['545.1.2']} edition="A4:2026" /> "Except where BS EN 50310
                applies, the following minimum cross-sectional area shall be applied for functional
                earthing conductors and functional bonding conductors: (a) 2.5 mm² copper or 16 mm²
                aluminium, if protection against mechanical damage is provided. (b) 4 mm² copper or
                16 mm² aluminium, if protection against mechanical damage is not provided." This is
                a passive-infrastructure CSA rule.
              </li>
              <li>
                <strong>§545.2 — Main Functional Earthing Terminal (MFET).</strong>{' '}
                <AmendmentBadge regs={['545.2']} edition="A4:2026" /> If multiple functional bonding
                conductors are present, a separate MFET shall be installed for ease of connection.
                The MFET may be combined with the MET. Passive-infrastructure terminal hardware —
                installed by the LV / cabling contractor, used by the active equipment.
              </li>
            </ul>
            <p>
              In every case, the regulation lands on the passive cabling — the cable, the connecting
              hardware, the bonding conductors, the terminal hardware — separately from the active
              equipment which is regulated under its own product standards. From 15 April 2026, the
              passive infrastructure has its own regulatory chapter inside BS 7671. That is a
              meaningful change, and it is a chapter the cabling contractor has to read.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The passive-first procurement discipline</ContentEyebrow>

          <ConceptBlock
            title="Specify the cabling first, certify it as a service-independent system, then let the active layer plug in"
            plainEnglish={`The discipline that follows from the passive/active split is a procurement order. Step 1: specify the cabling (Class, Category, outlet density, pathway capacity, bonding, labelling, environmental envelope of the FD/BD) and let it be tendered as a passive-infrastructure deliverable. Step 2: install and certify it independently of any active-equipment vendor — the certificate is the ARTEFACT that proves the building has a service-independent Layer-1 system. Step 3: separately, procure active equipment to plug into it. The active vendor does not get to influence the cabling spec; the cabling vendor does not get to dictate the active equipment. Each scope can be retendered independently at refresh.`}
            onSite={`The cleanest contractual structure is two separate suppliers: one cabling specialist for the passive system, one network specialist for the active equipment. The cabling specialist hands over a TIA-1152-A / BS EN 50346 certificate plus a BS EN 50174-1 / TIA-606-D administration record. The network specialist hands over an active-equipment configuration document. When something fails, the test results identify which side: the certificate identifies a permanent-link failure as a cabling defect; an active-layer config is identified by switch logs and config dumps. No grey area.`}
          >
            <p>The four practical disciplines that flow from passive-first procurement:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Specify the Class, not the cable.</strong> "Cat6A" is a Category — what you
                bought. "Class EA" is a measured channel performance — what you have. Tender to
                Class EA, certified at handover. The Cat6A cable is a means; the Class EA channel is
                the deliverable. Let the contractor pick the specific cable from approved vendors.
              </li>
              <li>
                <strong>Specify outlet density generously.</strong> First-fit cost of an extra
                outlet is small (£40-£80 per run). Adding the same outlet two years later may cost
                5-10× more. Specify two outlets per workpoint as standard; specify ceiling-mounted
                outlets for AP positions; specify outlets in furniture-spine locations even if not
                occupied at fit-out. The over-spec is paid back the first time a department
                reorganises.
              </li>
              <li>
                <strong>Specify pathway capacity for ~50 % growth.</strong> Cable basket fill is
                governed by BS EN 50174-2 / TIA-569-E recommendations. Spec the basket with
                fill-ratio headroom — adding a basket section later is a brutal exercise in an
                occupied building. The cable basket is passive infrastructure that should outlive
                multiple cable refreshes.
              </li>
              <li>
                <strong>Specify the bonding and labelling explicitly.</strong> BS 7671 §444.5.3.1
                bonding is a passive-infrastructure requirement that the cabling tender owns. BS EN
                50174-1 / TIA-606-D labelling is a passive-infrastructure requirement that the
                cabling tender owns. Both should be testable at handover. Both survive every
                active-equipment refresh.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <CommonMistake
            title="Treating active vendor lock-in as a cabling-spec choice"
            whatHappens={
              <>
                A favoured active-equipment vendor's pre-sales engineer "helps" the customer with
                the cabling spec — recommending their patch panels, their cassettes, their
                connectors, in their colours. The cabling install proceeds against that quasi-vendor
                spec. Five years later, when active equipment is refreshed and the building tries to
                switch vendors to save money, the active-vendor's bespoke fixings turn out to be
                subtly incompatible with the new vendor's kit — port spacing wrong, cassette form
                factor wrong, fibre connector polish wrong. The "saved" money on the active refresh
                is wiped out by partial passive re-fit.
              </>
            }
            doInstead={
              <>
                Specify the passive infrastructure to the GENERIC standards (BS EN 50173-1 /
                50174-1, ANSI/TIA-568.0-E / -1-E / -2-E / -3-E). Use industry-standard Class /
                Category, industry-standard connector types (LC duplex for fibre, RJ45 for copper),
                industry-standard patch-panel and rack form factors. Active vendors plug into THAT —
                not the other way round. The cabling tender explicitly excludes active-vendor
                proprietary fittings. This is what service-independence costs at tender stage; the
                saving comes at every active refresh for the next 15 years.
              </>
            }
          />

          <Scenario
            title="The new tenant wants Wi-Fi 7 APs everywhere — does the existing cabling cope?"
            situation={
              <>
                A 2018 fit-out specified Cat6A horizontal, certified Class EA, with a generous
                ceiling-outlet density (one ceiling outlet per 50 m² of open-plan area). Eight years
                later, the new tenant wants to deploy Wi-Fi 7 APs — and the AP vendor's data sheet
                shows Type 4 PoE++ (90 W class) with 5 GbE / 10 GbE backhaul ports.
              </>
            }
            whatToDo={
              <>
                Open the as-built record. Confirm: (1) Cat6A cabling certified Class EA — yes, so 5
                GbE and 10 GbE are in scope at 100 m. (2) Outlets at ceiling AP locations — yes,
                density is generous. (3) Bonding compliant with §444.5.3.1 — verify on site,
                retrofit if needed. (4) §716 conductor current check — Type 4 PoE worst case is
                around 600 mA per pair (4-pair PoE), well within the 750 mA hard cap, so compliant.
                (5) §716.526.101 connecting hardware rated 750 mA per contact — confirm patch panel
                and outlet hardware. (6) Bundle thermal — check existing bundle sizes against TIA
                TSB-184-A guidance. The PASSIVE infrastructure absorbs the new Wi-Fi 7 requirement
                without re-pulling. The ACTIVE refresh — new APs, new switches with 10 GbE access
                ports — is a separate procurement on the active clock.
              </>
            }
            whyItMatters={
              <>
                This is the entire passive/active argument in one example. The 2018 cabling
                contractor's discipline at first fit (Class EA, generous outlet density, generous
                pathway, compliant bonding) buys the 2026 tenant a Wi-Fi 7 deployment with no
                infrastructure change. The active-layer cost is fully recovered on a 5-7 year
                refresh cycle; the passive infrastructure delivers fifteen-plus years of service
                against one fit-out cost. If the 2018 spec had been Cat5e to save first-fit cost,
                every one of these checks would fail and the building would be re-cabled at extreme
                inconvenience.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'PASSIVE = no power, no firmware (cable, patch panels, outlets, splices, basket, faceplates). ACTIVE = power + firmware (switches, routers, APs, PoE injectors, IP phones, cameras). The split is binary and operational.',
              'Two refresh clocks: PASSIVE infrastructure 15-20 years (one fit-out, hard-to-access locations); ACTIVE equipment 3-5 years (vendor roadmap, end-of-support cycle). The decoupling is the structured-cabling commercial trick.',
              'DEMARCATION = patch-panel port at FD + outlet face at WA. Cabling contractor owns the certified permanent link between them; network operator owns everything plugged into either end.',
              'BS 7671:2018+A4:2026 specifically regulates the PASSIVE cabling infrastructure: §444.5.3.1 (bonding of basket / screens / sheaths), §716 (cabling as ELV DC circuit, 750 mA per-conductor cap, Cat5+ requirement), §545 (ICT functional earthing, 2.5 / 4 mm² Cu min, MFET).',
              'Procurement discipline: specify the Class (not the Category), specify outlet density and pathway capacity for ~50 % growth, specify bonding and labelling explicitly, refuse active-vendor proprietary fittings on the passive spec. Service-independence is a procurement choice as much as an engineering one.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-1-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Topologies
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-1-section-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Network speed and future-proofing
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule1Section3;
