import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// BS EN 62909 (Battery Storage Systems), MCS 020 (battery storage standard),
// and Engineering Recommendation G98/G99 for grid connection.

const published = '2026-05-17';
const modified = '2026-05-17';

export const section712ProsumerA4Config: GeneratedGuideConfig = {
  pagePath: '/guides/section-712-prosumer-a4-2026',
  title:
    'Section 712 Prosumer\u2019s LV Installations under BS 7671:2018+A4:2026 \u2014 Battery, Solar PV & Microgeneration Changes | Elec-Mate',
  description:
    'Complete guide to Section 712 of BS 7671:2018+A4:2026 \u2014 prosumer\u2019s low-voltage installations, battery energy storage systems, AC vs DC coupling, isolation, earthing for islanded operation, EREC G98/G99 grid connection, DNO notification, solar PV + battery + EV interaction, Loss of Mains protection and prosumer-specific inspection and testing.',
  datePublished: published,
  dateModified: modified,
  readingTime: 18,
  badge: 'BS 7671 A4:2026 \u2014 Section 712',
  badgeIcon: 'BookOpen',
  breadcrumbLabel: 'Section 712 Prosumer (A4:2026)',
  heroPrefix: 'Section 712 \u2014 Prosumer\u2019s LV Installations',
  heroHighlight: 'under A4:2026',
  heroSuffix: '\u2014 Battery, Solar PV & Microgeneration',
  heroSubtitle:
    'BS 7671:2018+A4:2026 substantially expanded Section 712 to deal with the modern household electrical installation that no longer just consumes \u2014 it generates, stores, and exports. This guide covers the prosumer definition, the amended Section 712 regulations, battery energy storage system (BESS) design, AC vs DC coupling, isolation and earthing rules, EREC G98/G99 notification, Loss of Mains protection, and prosumer-specific inspection and testing.',
  keyTakeaways: [
    'A "prosumer" is a consumer who is also a producer \u2014 taking energy from the public supply and exporting back (or storing and re-exporting). Section 712 of BS 7671:2018+A4:2026 governs the LV installation that does both.',
    'A4:2026 expanded Section 712 to address battery energy storage systems (BESS), AC and DC-coupled topologies, islanded operation, and the interaction between solar PV, battery and EV charging.',
    'Battery energy storage systems must comply with the relevant product standards (BS EN 62909 series and the IEC 62933 family) and, for grant-eligible or MCS-certified installations, with MCS 020. The wiring installation itself is governed by Section 712.',
    'AC-coupled batteries connect on the AC side of the consumer unit as a separate microgeneration source; DC-coupled batteries share the PV inverter DC bus. The two have different isolation, earthing and protection implications under Section 712.',
    'Grid-connection of any prosumer source is governed by Engineering Recommendation G98 (up to 16 A per phase, "connect and notify") or G99 (everything larger, "apply and connect"). DNO notification is before energisation for G99, within 28 days for G98.',
    'Section 712.411 covers protection against electric shock, 712.421 covers protection against thermal effects, and 712.531 covers devices for protection against overcurrent and isolation specific to prosumer installations.',
    'Loss of Mains (LoM) protection is mandatory \u2014 the inverter must disconnect from the grid within milliseconds of a supply failure to prevent islanding onto a dead network. Settings are defined by G98/G99 and verified at commissioning.',
    'Prosumer-specific inspection and testing extends beyond the standard schedule \u2014 inverter shutdown tests, DC isolation verification, anti-islanding confirmation and the A4:2026 microgeneration columns on the Schedule of Test Results.',
  ],
  sections: [
    {
      id: 'what-is-prosumer',
      heading: 'What a Prosumer Installation Actually Is',
      tocLabel: 'Prosumer defined',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The term "prosumer" \u2014 producer and consumer combined \u2014 entered the UK Wiring Regulations vocabulary formally with Section 826 of BS 7671 (definitions and energy-related terminology) and was given dedicated technical treatment in Section 712. A prosumer\u2019s installation is a low-voltage electrical installation that both draws energy from the public distribution network and generates, stores or exports energy back. The classic 2026 example is a household with rooftop solar PV, a battery energy storage system, an EV charge point and a smart meter \u2014 all behind one cut-out and one earthing arrangement.',
        },
        {
          type: 'paragraph',
          text:
            'Before A4:2026, the relevant regulations were spread across Section 712 (solar photovoltaic power supply systems), the now-superseded Section 551 (low-voltage generating sets), and a small set of regulations on energy efficiency in Section 818. A4:2026 consolidated and substantially expanded Section 712 to deal with the reality that solar, battery and EV are routinely installed together and interact electrically.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why this matters in 2026',
          text:
            'The Boiler Upgrade Scheme, ECO4 and Smart Export Guarantee tariffs have driven a step-change in UK households fitting batteries and PV together. Domestic battery installs in GB are now in the hundreds of thousands. Section 712 of BS 7671:2018+A4:2026 is the wiring regulation that catches up.',
        },
        {
          type: 'paragraph',
          text:
            'For the broader prosumer concept, see the [prosumer\u2019s low-voltage electrical installation guide](/guides/prosumer-low-voltage-electrical-installation). This page is the deep dive on Section 712 itself.',
        },
      ],
    },
    {
      id: 'a4-2026-changes',
      heading: 'What A4:2026 Changed in Section 712',
      tocLabel: 'A4:2026 changes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Amendment 4, published on 15 April 2026 and in force from that date for new installations, made Section 712 one of the most substantially rewritten parts of the 18th Edition. The previous section dealt principally with solar PV; the amended section deals with the whole prosumer installation \u2014 generation, storage, export, islanded operation and interaction with the public supply.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Scope broadened beyond solar PV to cover any prosumer\u2019s LV installation, including battery energy storage systems, small-scale combined heat and power, and microwind. Section 712 is now the single section for the prosumer\u2019s LV side.',
            'New requirements for battery energy storage systems (BESS), including selection of the inverter/charger, AC vs DC coupling, battery enclosure ventilation, and isolation arrangements specific to the battery DC side.',
            'Expanded isolation requirements \u2014 isolators must be provided on each energy source so that the rest of the installation can be made dead independently. A solar isolator alone is no longer sufficient on a combined PV + battery installation.',
            'Updated earthing arrangements for prosumer installations in TN-C-S systems, with explicit treatment of the case where the installation can operate islanded (disconnected from the public supply) and must establish its own earthing reference.',
            'Cross-reference to Engineering Recommendation G98 and G99 made explicit. The Section 712 regulations now point directly to the ENA documents for grid-connection notification, Loss of Mains protection settings and anti-islanding behaviour.',
            'New labelling and identification regulations \u2014 every prosumer installation must carry warning labels at the origin, at each isolator, and at the meter, identifying the presence of additional sources of supply.',
            'New entries on the Schedule of Test Results columns \u2014 commissioning of a prosumer installation now requires recording the inverter make/model/firmware, the anti-islanding test result, the DC isolation insulation resistance, and the battery isolation verification.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A4:2026 applies to new design from 15 April 2026',
          text:
            'Installations whose design was commenced before 15 April 2026 may still be completed to BS 7671:2018+A3:2024. From 15 April 2026 onwards, any new prosumer installation must comply with the A4:2026 Section 712 requirements. See the [BS 7671 A4:2026 summary](/guides/bs-7671-a4-2026-summary) for the transition rules.',
        },
      ],
    },
    {
      id: 'bess-requirements',
      heading: 'Battery Energy Storage System (BESS) Installation Requirements',
      tocLabel: 'BESS requirements',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A battery energy storage system is an assembly of electrochemical batteries, a battery management system, an inverter/charger, isolation, protection and monitoring \u2014 installed as a single functional unit on the prosumer\u2019s LV installation. The Section 712 requirements sit alongside the product standards (IEC 62933 / BS EN 62909 series) and, for MCS-certified installs, MCS 020.',
        },
        {
          type: 'list',
          items: [
            'Location \u2014 enclosure installed per manufacturer instructions, Building Regulations and BS 7671. Lithium-ion batteries should not be installed in habitable rooms; garage, ventilated loft and external wall-mounted enclosures are typical.',
            'Ventilation \u2014 sufficient natural or mechanical ventilation per manufacturer instructions. Lithium-ion batteries off-gas under thermal runaway and must not be enclosed in airtight cupboards.',
            'Fire separation \u2014 batteries above the manufacturer\u2019s stated energy threshold should be separated from habitable space by a fire-resisting partition, or located externally.',
            'Cable routes \u2014 DC cables between the battery and inverter must be in containment that maintains separation from AC cabling, with mechanical protection where exposed.',
            'Isolation \u2014 means of isolation on both AC and DC sides. The DC isolator must be lockable in the off position and within sight of the battery enclosure.',
            'Protection \u2014 the AC connection must have a dedicated overcurrent device sized for the inverter\u2019s maximum continuous output, with discrimination from the upstream device.',
            'Earthing \u2014 the battery enclosure and exposed conductive parts must be connected to the main earthing terminal per Section 712.411 and Chapter 41.',
            'Labelling \u2014 the consumer unit, meter position and battery enclosure must each carry a warning label per Section 712 and the model labels in Appendix 6.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'MCS 020 sits alongside BS 7671',
          text:
            'MCS 020 is the Microgeneration Certification Scheme standard for battery energy storage installation. It is mandatory for installations that need to claim Smart Export Guarantee or other grant funding through an MCS-certified installer. MCS 020 references BS 7671 for the wiring side \u2014 it does not replace it. See the [battery storage guide](/guides/battery-storage-guide) for the broader scheme picture.',
        },
      ],
    },
    {
      id: 'ac-vs-dc-coupling',
      heading: 'AC-Coupled vs DC-Coupled Battery Topology',
      tocLabel: 'AC vs DC coupling',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A battery can be connected to a solar PV array on the AC side of the PV inverter or on the DC side, sharing the DC bus. The choice has direct consequences for the Section 712 wiring requirements, for isolation, for efficiency and for behaviour on loss of supply.',
        },
        {
          type: 'list',
          items: [
            'AC-coupled \u2014 the battery has its own inverter/charger which connects to the AC consumer unit alongside the solar PV inverter. The battery behaves as a separate microgeneration source. Easiest topology to retrofit onto an existing PV installation. Each inverter has its own DC isolator and its own AC isolator. Double conversion (DC \u2192 AC \u2192 DC \u2192 AC) gives slightly lower round-trip efficiency.',
            'DC-coupled \u2014 the battery shares a single hybrid inverter with the solar PV array on the DC bus. The hybrid inverter performs both PV MPPT and battery charge/discharge in one device. Single AC connection point. Higher round-trip efficiency for self-consumption (one DC \u2194 AC conversion). DC side is more complex \u2014 a single DC isolator may not be sufficient.',
            'Hybrid AC/DC \u2014 some manufacturers offer a hybrid inverter that can also accept an AC input from an existing PV inverter. Used when retrofitting a battery onto an existing PV system but wanting DC-coupled efficiency.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Whichever topology is selected, Section 712.531 requires a dedicated isolator on each energy source \u2014 PV array, battery DC, and the AC connection to the consumer unit. The aim is that any one source can be isolated for maintenance without taking the rest of the installation offline, and that on supply failure the installation can be made completely dead from a single, clearly labelled, accessible location.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Retrofit consideration',
          text:
            'Most existing solar PV installations in the UK are not DC-coupling-ready \u2014 the original string inverter cannot accept a battery on the DC side. Retrofitting almost always means an AC-coupled battery with its own hybrid inverter, or a complete replacement of the PV inverter with a DC-coupled hybrid. Either approach is valid under Section 712; the choice is driven by efficiency targets, budget and roof access.',
        },
      ],
    },
    {
      id: 'isolation-requirements',
      heading: 'Isolation Requirements for Prosumer Installations',
      tocLabel: 'Isolation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 712.531 sets out the isolation requirements for prosumer installations. Because energy can flow from more than one source, the standard single point of isolation at the consumer unit is not sufficient. Each generator and storage device must be capable of being isolated independently, and the whole installation must be capable of being made dead from a clearly identified location.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'DC isolator on the PV array side \u2014 lockable, located adjacent to the inverter, rated for the PV array open-circuit voltage and short-circuit current at the design ambient temperature. Required under Section 712.531 and Appendix 4 derating.',
            'AC isolator on the PV inverter output \u2014 lockable, located adjacent to the inverter, rated for the inverter\u2019s maximum continuous output current.',
            'DC isolator on the battery side \u2014 lockable, located within sight of the battery enclosure, rated for the battery system voltage and the maximum charge/discharge current.',
            'AC isolator on the battery inverter output (AC-coupled topology) \u2014 separate from the PV inverter isolator, with its own dedicated overcurrent device on the consumer unit.',
            'Main switch at the consumer unit \u2014 the primary point of isolation for the public supply, with appropriate warning that other sources of supply exist on the installation.',
            'Single point of isolation for emergency \u2014 the prosumer installation must include a clearly identified, accessible emergency isolation arrangement that disconnects all sources simultaneously. This is typically the inverter\u2019s integrated shutdown function, with a backup AC + DC isolation sequence documented in the user manual handed to the householder.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Multiple sources \u2014 multiple warning labels',
          text:
            'A4:2026 requires warning labels at the consumer unit, at the meter, at each inverter, at each isolator, and at the battery enclosure, identifying the presence of additional sources of supply. The DNO\u2019s service-fuse pull alone will not make the installation dead \u2014 the inverter and battery can continue to energise the customer side. Anyone working on the installation must be able to see, at a glance, that this is a prosumer installation.',
        },
      ],
    },
    {
      id: 'earthing-islanded',
      heading: 'Earthing for Islanded Operation',
      tocLabel: 'Earthing & islanding',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Most UK domestic supplies are TN-C-S (PME, with PNB now a recognised variant under A4:2026). The earthing of a prosumer installation must deal with two scenarios: grid-connected (the supply earth available via the combined neutral-and-earth) and islanded (supply lost, anti-islanding triggered, but the inverter is still energising local loads from the battery).',
        },
        {
          type: 'list',
          items: [
            'Grid-connected operation \u2014 the installation earth is the supply earth via the main earthing terminal. The PV inverter, battery inverter and EV charge point all share this earth.',
            'Islanded operation \u2014 if the inverter is configured to maintain supply to selected loads during a grid outage (often called "backup mode" or "EPS" \u2014 Emergency Power Supply), the inverter must establish its own earth reference for the islanded section. This typically means a neutral-earth bond inside the inverter during island mode, switched in automatically.',
            'Backup load panel \u2014 most inverters with backup capability provide a separate output for the loads that should be supported during an outage. This output is wired to a separate sub-board, with appropriate RCD protection and bonding.',
            'Section 712.411 protection against electric shock \u2014 the prosumer installation must satisfy automatic disconnection of supply (ADS) in both grid-connected and islanded modes. The Zs values measured at commissioning must be valid for the highest-impedance source the loads see \u2014 normally the inverter in island mode.',
            'EV charge point interaction \u2014 a TN-C-S installation feeding an EV charge point requires either a separate earth electrode for the charge point (Section 722) or an open-PEN detection device. The presence of a battery and inverter does not remove this requirement \u2014 see the [cable size for EV charger guide](/guides/cable-size-for-ev-charger).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Inverter without island-mode capability \u2014 do not strand loads',
          text:
            'Many cheaper PV and battery inverters are grid-tied only \u2014 they shut down completely on loss of mains and provide zero output until the grid returns. This is fully compliant with Section 712 and G98/G99. The customer must understand this is not a backup power solution \u2014 only inverters explicitly rated for island/EPS operation will keep the lights on during a power cut.',
        },
      ],
    },
    {
      id: 'g98-g99-grid-connection',
      heading: 'EREC G98/G99 \u2014 Grid Connection Requirements',
      tocLabel: 'G98/G99',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671 governs the prosumer\u2019s side of the meter. The interface with the public distribution network is governed by Engineering Recommendation G98 and G99, issued by the Energy Networks Association (ENA). Any installer commissioning a prosumer installation must engage with one or the other \u2014 they are not optional. Section 712 of BS 7671:2018+A4:2026 cross-references them explicitly.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'G98 \u2014 single-phase generation up to 16 A per phase (~3.68 kW per phase). "Connect and notify" \u2014 commission and energise, then notify the DNO within 28 days. Used for most domestic PV and small battery systems.',
            'G99 \u2014 anything larger (single-phase > 16 A, all three-phase, multiple sources cumulatively > 16 A per phase). "Apply and connect" \u2014 apply to the DNO, receive a connection offer, accept it; only then energise.',
            'Type-tested equipment \u2014 inverters used under G98/G99 must be type-tested and listed on the ENA Type Test Register. Off-register inverters cannot be used.',
            'Loss of Mains protection \u2014 G98/G99 specify the LoM method (ROCOF or vector shift, depending on inverter age and DNO requirement), detection time and auto-reconnect delay.',
            'Anti-islanding test \u2014 commissioning includes proving the LoM function by simulating grid loss. Inverter must disconnect within the specified time and must not reconnect until the grid is stable for the specified delay.',
            'Witness testing \u2014 G99 installations above certain thresholds require DNO witness testing before energisation.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'A multi-source installation may need G99 even if each source is small',
          text:
            'A house with 3.6 kW of solar PV + 5 kW of battery + a 7 kW EV charger that can do V2G (vehicle-to-grid) may exceed the G98 16 A per phase ceiling cumulatively even though each individual source is small. Check the cumulative export capability \u2014 if it exceeds 16 A per phase, the installation falls under G99 and the DNO must be applied to before energisation.',
        },
      ],
    },
    {
      id: 'dno-notification',
      heading: 'DNO Notification Process',
      tocLabel: 'DNO notification',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The DNO owns the local distribution network \u2014 UK Power Networks, Northern Powergrid, SP Energy Networks, SSEN, National Grid Electricity Distribution and Electricity North West cover GB between them. Notification is via the ENA\u2019s Connect Direct service or the DNO\u2019s connections portal.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'G98 \u2014 commission, then submit the G98 document via the ENA Connect Direct portal within 28 days. The form captures property, installer, inverter make/model/firmware, type-test reference, rated output and LoM settings. No prior DNO consent.',
            'G99 \u2014 submit the application before installation. The DNO assesses network capacity and issues a connection offer (which may impose curtailment, witness testing or upgrade contributions). Only after acceptance can the installation be energised.',
            'Witness testing \u2014 where required, the installer arranges a DNO engineer to witness anti-islanding, ROCOF and other functional tests at commissioning. The DNO signs off and issues the connection agreement.',
            'Connection agreement \u2014 once notification is complete (G98) or witness testing is passed (G99), the DNO issues the connection agreement permitting ongoing export.',
            'Notification timeline \u2014 G98 is within 28 days post-commissioning but remains the installer\u2019s responsibility. Failing to notify breaches the Distribution Connection and Use of System Agreement (DCUSA). G99 lead times can be 8\u201312 weeks.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Notification is the installer\u2019s legal obligation, not the customer\u2019s',
          text:
            'It is a common misconception that the householder notifies the DNO. They do not \u2014 the installer does, on behalf of the customer, as part of commissioning. Failing to notify exposes the installer to enforcement, the customer to potential disconnection, and creates a safety hazard for DNO field staff who may believe a property is supply-only.',
        },
      ],
    },
    {
      id: 'pv-battery-ev-interaction',
      heading: 'Solar PV + Battery + EV \u2014 Interaction on One Installation',
      tocLabel: 'PV + battery + EV',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Solar PV on the roof, battery in the garage, EV charge point on the driveway \u2014 the defining domestic install of 2026. Section 712 of BS 7671:2018+A4:2026 explicitly recognises this combination and sets out how the design must handle the interaction.',
        },
        {
          type: 'list',
          items: [
            'Maximum demand \u2014 the design current of the installation must consider the worst-case import (PV down, battery flat, EV charging, household load high) and the worst-case export (PV at peak, battery full and discharging, EV not present, household load low). Both directions must be within the cut-out fuse rating and the meter tails ampacity.',
            'CT clamps and load management \u2014 most modern hybrid inverters include current transformers on the supply tails so the inverter can throttle export to zero if the customer is on an import-only tariff, or modulate battery charge/discharge to follow PV. CT positioning must be on the meter side of all loads, including the EV charge point.',
            'Smart EV charging \u2014 OZEV-grant-eligible EV charge points include smart control under the Electric Vehicles (Smart Charge Points) Regulations 2021. They can defer charging to off-peak or follow PV. See the [smart EV charging guide](/guides/smart-ev-charging) for the regulatory detail.',
            'Diversity \u2014 traditional diversity factors (BS 7671 Appendix 1) do not apply cleanly to a prosumer installation. The designer must assess the realistic concurrent load including the EV charge point at full rated current and the household at design demand, against the import capacity of the supply.',
            'Discrimination \u2014 the protective devices for the PV inverter, battery inverter and EV charge point must discriminate with the main switch, with the cut-out fuse, and with each other. A fault on one circuit must not take the whole installation offline.',
            'EV charger earthing on TN-C-S \u2014 still subject to Section 722 \u2014 PEN-fault detection device or separate earth electrode. The presence of an inverter or battery does not satisfy the Section 722 requirement.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The supply may need upgrading',
          text:
            'A typical UK single-phase supply is fused at 60 A or 80 A. Combined PV + battery + EV + household installations can hit cut-out fuse limits during charging. Assess the cut-out fuse against maximum import demand and apply to the DNO for an upgrade where necessary \u2014 part of the G98/G99 application on G99 installs.',
        },
      ],
    },
    {
      id: 'loss-of-mains',
      heading: 'Disconnection \u2014 Loss of Mains Protection',
      tocLabel: 'Loss of Mains',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Loss of Mains (LoM) protection detects when the public supply has failed and disconnects the inverter from the AC bus to prevent islanding \u2014 the dangerous condition where the inverter continues to energise a section of the network after the DNO has switched it off. Without LoM, a DNO engineer working on a "dead" network could be electrocuted by a prosumer\u2019s inverter still pushing voltage onto the local cable.',
        },
        {
          type: 'list',
          items: [
            'ROCOF (Rate of Change of Frequency) \u2014 the current preferred LoM method per G98/G99. The inverter monitors the rate of change of grid frequency; a step exceeding the configured threshold triggers disconnection within the specified time.',
            'Vector Shift \u2014 older LoM method, retained for legacy equipment but being phased out. More prone to nuisance tripping during grid disturbances.',
            'Active methods \u2014 some inverters use active impedance measurement, injecting a small signal and watching for the network impedance change that occurs when the grid disconnects. Permitted under G99.',
            'Disconnection time \u2014 typically within 500 ms of the loss-of-mains event. The exact figure is specified in G98/G99 and in the inverter\u2019s type-test certificate.',
            'Reconnection delay \u2014 after grid restoration the inverter must wait, typically 60 seconds, with the grid stable, before reconnecting. This prevents rapid re-tripping during unstable conditions.',
            'Commissioning test \u2014 the installer must simulate LoM at commissioning, observe the inverter disconnect within the specified time, and verify the reconnect delay after restoration. The result is recorded on the Schedule of Test Results and on the G98/G99 form.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'LoM is not optional and cannot be defeated',
          text:
            'Some installers, faced with nuisance trips on weak rural networks, have been known to widen the ROCOF settings. This is a serious safety breach \u2014 LoM protects DNO field staff from electrocution. If the inverter is nuisance-tripping, the fault is in the network or the inverter selection, not the LoM settings. Notify the DNO and select a more appropriate inverter.',
        },
      ],
    },
    {
      id: 'inspection-and-testing',
      heading: 'Prosumer Installation \u2014 Inspection & Testing',
      tocLabel: 'I&T procedures',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The standard Schedule of Inspections and Schedule of Test Results (Appendix 6) is the starting point for any prosumer installation, but is not sufficient on its own. A4:2026 added prosumer-specific items, and the EIC / EICR model forms have been updated to capture them.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Pre-commissioning visual inspection \u2014 confirm labels at consumer unit, meter, inverters, isolators and battery enclosure; confirm cable routes, mechanical protection, DC/AC segregation, enclosure ventilation and fire separation.',
            'DC side insulation resistance \u2014 PV array IR to earth, before and after exposure to sunlight, per inverter manufacturer procedure. Battery DC side IR verified per manufacturer guidance; do not megger across the battery itself.',
            'AC side insulation resistance \u2014 inverter disconnected for IR testing of AC final circuits, then reconnected and the AC circuit tested as a complete installation.',
            'Continuity and earth fault loop impedance \u2014 measured at the furthest point of each circuit including the backup load panel. Zs must satisfy Section 712.411 ADS in both grid-connected and island modes.',
            'RCD testing \u2014 each RCD verified to the required disconnection time at 1\u00d7 and 5\u00d7 I\u0394n. Type-A or Type-F as required for inverter-fed circuits with DC components.',
            'Anti-islanding test \u2014 simulate grid loss with the inverter exporting; verify disconnection within the specified time; restore grid; verify the reconnect delay.',
            'Inverter shutdown test \u2014 verify the documented emergency isolation sequence results in zero voltage at the load side within the inverter\u2019s discharge time.',
            'Functional check \u2014 verify the inverter starts, exports, throttles to CT clamp signal, charges/discharges the battery, and (if applicable) enters island mode on simulated grid loss.',
            'Documentation \u2014 issue the EIC with the A4:2026 Section 712 columns completed, the G98 / G99 form, inverter type-test reference, LoM test result, battery user manual, and customer handover pack.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Periodic inspection \u2014 EICR for prosumer installations',
          text:
            'Periodic inspection of a prosumer installation follows the standard EICR cycle (typically 10 years domestic) but the inspector must include the inverter shutdown sequence, the anti-islanding function, the labels, the battery enclosure condition and the DC isolators. An EICR that ignores the generation and storage side is incomplete. Damaged labels, missing DC isolators or non-functional LoM should be coded under Chapter 6 of BS 7671 as appropriate.',
        },
      ],
    },
  ],
  howToHeading: 'How to Design and Commission a Compliant Section 712 Prosumer Installation',
  howToDescription:
    'The end-to-end sequence from initial customer enquiry to DNO notification and customer handover, anchored to BS 7671:2018+A4:2026 Section 712 and Engineering Recommendations G98/G99.',
  howToSteps: [
    {
      name: 'Survey and design the prosumer installation',
      text:
        'Survey the existing installation \u2014 cut-out fuse rating, meter tails ampacity, consumer unit capacity, earthing arrangement (TN-S, TN-C-S/PME or TT), available roof area, battery location and ventilation, EV charge point location. Decide AC-coupled vs DC-coupled topology and calculate maximum demand in both import and export directions per Section 712.',
    },
    {
      name: 'Confirm G98 or G99 and apply if required',
      text:
        'Sum the cumulative export capability of all sources (PV + battery + V2G EV if applicable). If single-phase \u226416 A per phase, the installation is G98 \u2014 proceed to install and notify within 28 days of commissioning. If anything larger, apply to the DNO under G99 and wait for the connection offer before installing.',
    },
    {
      name: 'Specify type-tested equipment and assemble the design pack',
      text:
        'Select inverters, batteries and EV charge point from products on the ENA Type Test Register and listed on the MCS register where MCS certification is in scope. Produce the BS 7671 design including cable sizes, protective devices, isolation, earthing and labelling. Reference Section 712.411, 712.421, 712.531 and Appendix 6 throughout.',
    },
    {
      name: 'Install, label and document',
      text:
        'Install the PV array, battery enclosure, inverter(s), DC and AC isolators, backup load panel and EV charge point. Apply A4:2026 prosumer warning labels at the consumer unit, meter, each isolator, each inverter and the battery enclosure. Keep the installation documentation pack with type-test references, datasheets and commissioning checklists.',
    },
    {
      name: 'Commission and prove the anti-islanding function',
      text:
        'Carry out the full Section 712 prosumer commissioning sequence \u2014 DC and AC insulation resistance, continuity, Zs, RCD operating times, anti-islanding (simulate grid loss and verify inverter disconnection within the G98/G99 time), reconnect delay, and functional checks of import/export/charge/discharge. Record everything on the Schedule of Test Results.',
    },
    {
      name: 'Notify the DNO and hand over to the customer',
      text:
        'Submit the G98 notification within 28 days (or complete G99 witness testing and the connection agreement) via the ENA Connect Direct portal. Issue the Electrical Installation Certificate with A4:2026 prosumer columns completed, the customer user manual including the emergency isolation sequence, and the MCS handover pack if MCS-certified.',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between G98 and G99?',
      answer:
        'G98 covers single-phase generation up to and including 16 A per phase (typically ~3.68 kW per phase) under a "connect and notify" regime \u2014 the installer commissions and energises, then notifies the DNO within 28 days. G99 covers everything larger \u2014 anything above 16 A single-phase, all three-phase generation, and installations where the cumulative export of multiple sources exceeds 16 A per phase. G99 is "apply and connect" \u2014 the DNO must issue a connection offer before energisation, and witness testing may be required.',
    },
    {
      question: 'What is the DNO notification timeline for a domestic battery and solar installation?',
      answer:
        'For G98 installations, notify via the ENA Connect Direct portal within 28 days of commissioning. For G99, the application must be submitted before installation and the DNO connection offer can take 8 to 12 weeks. Witness testing, where required, must be arranged before energisation. Failing to notify is a breach of the Distribution Connection and Use of System Agreement (DCUSA) and is the installer\u2019s legal obligation, not the customer\u2019s.',
    },
    {
      question: 'Does a battery installation need an Electrical Installation Certificate?',
      answer:
        'Yes. Any new electrical installation work in scope of BS 7671 \u2014 including a battery energy storage system \u2014 must be certified. For new circuits and substantial alterations this is an Electrical Installation Certificate (EIC) with the Section 712 prosumer columns completed. The certificate must accompany the G98 or G99 notification and is part of the customer handover pack.',
    },
    {
      question: 'Can I retrofit a battery to an existing solar PV installation?',
      answer:
        'Yes \u2014 this is the most common 2026 install pattern. Almost always the retrofit is AC-coupled: the new battery has its own inverter/charger connected on the AC side of the existing PV inverter, with its own dedicated overcurrent device and isolators. Section 712 of BS 7671:2018+A4:2026 fully covers this configuration. Re-notify the DNO under G98 (or G99 if cumulative export now exceeds the G98 threshold) and re-certify with a new EIC. See the [battery storage guide](/guides/battery-storage-guide).',
    },
    {
      question: 'What is the difference between AC coupling and DC coupling?',
      answer:
        'AC-coupled batteries connect on the AC side of the consumer unit through their own dedicated inverter/charger \u2014 the PV inverter and the battery inverter operate independently. DC-coupled batteries share the DC bus with the PV array through a single hybrid inverter that handles PV MPPT and battery charge/discharge in one device. DC coupling has slightly higher round-trip efficiency; AC coupling is simpler to retrofit because it does not require replacing the existing PV inverter. Section 712 covers both.',
    },
    {
      question: 'How is a defective prosumer installation coded on an EICR?',
      answer:
        'Absence of required isolators or A4:2026 warning labels is typically Code C2 (potentially dangerous) because it creates a hazard for anyone working on the installation. A non-functional Loss of Mains function is Code C1 (danger present) because it creates an immediate risk to DNO field staff during a grid outage. Damaged or inaccessible DC isolators are Code C2. Refer to the [EICR Code C2 guide](/guides/eicr-code-c2) for the broader coding framework.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary',
      description: 'The full summary of the 18th Edition Amendment 4 changes \u2014 AFDDs, TN-C-S (PNB), new schedule columns, model form revisions and the Section 712 prosumer expansion.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/prosumer-low-voltage-electrical-installation',
      title: 'Prosumer\u2019s Low-Voltage Electrical Installation',
      description: 'Companion explainer on the prosumer concept, where it sits in BS 7671 and how it interacts with smart metering, export tariffs and the rest of the regulations.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/battery-storage-guide',
      title: 'Battery Storage Guide',
      description: 'Domestic battery storage from a UK installer\u2019s perspective \u2014 sizing, chemistry, enclosure, ventilation, fire separation, MCS 020 and BS 7671 Section 712.',
      icon: 'CheckCircle2',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-solar-pv-installation',
      title: 'RAMS for Solar PV Installation',
      description: 'CDM 2015-compliant Risk Assessment and Method Statement for a solar PV install \u2014 working at height, DC isolation, manual handling and the safe sequence of work.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/cable-size-for-ev-charger',
      title: 'Cable Size for EV Charger',
      description: 'Sizing the supply cable for a 7 kW or 22 kW EV charge point under BS 7671 Section 722, including the interaction with a prosumer installation and TN-C-S PEN-fault detection.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/smart-ev-charging',
      title: 'Smart EV Charging',
      description: 'The Electric Vehicles (Smart Charge Points) Regulations 2021, OZEV grant eligibility, and how smart EV charging interacts with solar + battery prosumer installations.',
      icon: 'Zap',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Issue a compliant Section 712 prosumer EIC in minutes',
  ctaSubheading:
    'The Elec-Mate EIC tool includes the A4:2026 prosumer columns out of the box \u2014 inverter make/model/firmware, LoM test result, DC isolation IR, battery isolation verification and the full Schedule of Test Results. Issue a fully compliant Section 712 EIC and G98 / G99 notification pack alongside it. 7-day free trial, cancel anytime.',
};
