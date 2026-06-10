import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS EN 50090 (Home and Building Electronic Systems — KNX),
// ISO/IEC 14543-3 (KNX standard), BS 7671:2018+A4:2026 (18th Edition,
// published 15 April 2026) and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-06-10';

export const knxWiringInstallationConfig: GeneratedGuideConfig = {
  pagePath: '/guides/knx-wiring-installation-guide-uk',
  title: 'KNX Wiring & Bus Installation Guide for UK Electricians (BS 7671)',
  description:
    'KNX wiring installation guide for UK electricians — TP1 bus topology, J-Y(St)Y cable selection, line/area/backbone architecture, power supply sizing…',
  datePublished: published,
  dateModified: modified,
  readingTime: 18,
  badge: 'Building Automation',
  badgeIcon: 'Cable',
  breadcrumbLabel: 'KNX Wiring Installation Guide',
  heroPrefix: 'KNX Wiring',
  heroHighlight: 'Installation Guide',
  heroSuffix: 'for UK Electricians',
  heroSubtitle:
    'KNX is the global open standard (BS EN 50090 / ISO/IEC 14543-3) for home and building automation, used across lighting, HVAC, blinds, energy metering and security in UK commercial and high-end residential projects. This guide explains the bus topology, the wiring rules, segregation under BS 7671 Section 528, ETS commissioning, and how KNX compares with DALI, BACnet and Modbus.',
  answerBox: {
    question: 'What is KNX wiring?',
    answer:
      'KNX is the open, manufacturer-independent standard (BS EN 50090, ISO/IEC 14543-3) for home and building automation. Instead of switches being wired directly to their loads, every device — switches, sensors, dimmers, blind and heating actuators — connects to a shared two-core bus cable and communicates by sending telegrams. Actuators in the distribution board switch the actual mains loads, so functions can be reprogrammed in software (ETS) without rewiring. KNX scales from a single flat to a large commercial building, and certified devices from any manufacturer interoperate on the same bus.',
  },
  keyTakeaways: [
    'KNX is a manufacturer-independent open standard (BS EN 50090, ISO/IEC 14543-3) supported by over 500 member companies — devices from any KNX-certified manufacturer interoperate on the same bus.',
    'The primary physical medium in UK installations is TP1 twisted pair — 9600 bit/s, 30V DC nominal bus voltage, decentralised intelligence with no single point of failure.',
    'A line carries up to 64 devices and 1000m of cable; up to 12 lines form an area; up to 15 areas plus a backbone form a full project — over 11,000 devices on a single installation.',
    'KNX bus cable must be segregated from mains under BS 7671:2018+A4:2026 Section 528 — either by physical separation, by partition, or by use of cable to the appropriate insulation rating.',
    'Every KNX project must be commissioned in ETS (Engineering Tool Software) — group addresses, physical addresses, parameters and programme are downloaded into each device before the system functions.',
    'KNX certification (manufacturer-led) is required to be listed as a KNX Partner — uncertified installation may invalidate warranty, M&E acceptance and KNX Association project listing.',
  ],
  sections: [
    {
      id: 'what-is-knx',
      heading: 'What KNX Is — and Why UK Projects Specify It',
      tocLabel: 'What is KNX?',
      blocks: [
        {
          type: 'paragraph',
          text: 'KNX is the international open standard for home and building electronic systems, defined by BS EN 50090 in Europe and ISO/IEC 14543-3 worldwide. It is the convergence of EIB, BatiBUS and EHS into a single manufacturer-independent specification administered by the KNX Association in Brussels. Over 500 companies produce KNX-certified devices, and any certified device interoperates on the same bus, commissioned through a single tool called ETS.',
        },
        {
          type: 'paragraph',
          text: 'In UK projects, KNX is specified on commercial fit-outs, large residential properties, hotels, schools and corporate campuses where lighting, HVAC, shading and energy metering must talk to each other and to a building management system. Unlike a centralised DDC controller, every KNX device contains its own microprocessor and exchanges short telegrams over a common bus. Remove any single device and the rest carries on running.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Decentralised intelligence, single bus',
          text: 'KNX has no central controller. Each device is intelligent in its own right and the bus is the shared medium — fundamentally different from a Modbus master/slave or polled BACnet system. KNX devices speak when they have something to say, not when they are asked.',
        },
        {
          type: 'paragraph',
          text: 'For a UK electrician, KNX sits in the same territory as [DALI lighting control](/guides/dali-lighting-control-wiring-bs-en-62386) and [building management systems](/guides/building-management-systems-electrical) — extra-low-voltage control wiring layered on top of mains power, governed by BS 7671 Section 528 for segregation, and commissioned in software once the wiring is complete.',
        },
      ],
    },
    {
      id: 'bus-media',
      heading: 'KNX Bus Media — TP, IP, RF and PL',
      tocLabel: 'Bus media',
      blocks: [
        {
          type: 'paragraph',
          text: 'KNX defines four physical media. In practice, UK projects use TP1 for the structured backbone and IP for inter-line / inter-building routing; RF appears in retrofit and where chasing cables is impractical; PL is essentially obsolete for new build.',
        },
        {
          type: 'list',
          items: [
            'TP1 — twisted pair, 9600 bit/s, 30V DC nominal bus voltage with a 21V minimum at any device. The default medium for new-build commercial and residential KNX. Power and data on the same pair, polarity-sensitive on the connection block.',
            'IP — KNXnet/IP, KNX telegrams tunnelled or routed over Ethernet/IP at 10/100 Mbit/s. Used for backbone routing between areas, remote ETS commissioning, BMS integration via OPC/REST gateways, and visualisation servers.',
            'RF — KNX Radio Frequency at 868.3 MHz (S-Band) and 433.05 MHz. Two flavours: KNX RF Ready and KNX RF Multi (frequency-hopping, bidirectional). Used for retrofit where pulling new cable is not viable, and for battery-operated devices such as window sensors.',
            'PL — Powerline, 110 kHz over the mains conductors at 1200 bit/s. Largely deprecated in new build because of EMC interference, third-party device noise, and the rise of RF and IP as easier retrofit options.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'TP1 is the default — design the project around it',
          text: 'Unless the project is explicitly a retrofit using KNX RF, every KNX system in this guide assumes TP1 twisted pair as the structured backbone. IP is used between areas and into the BMS, not as a substitute for TP1 on a single line.',
        },
      ],
    },
    {
      id: 'tp1-electrical',
      heading: 'TP1 Bus — The Electrical Layer',
      tocLabel: 'TP1 electrical',
      blocks: [
        {
          type: 'paragraph',
          text: 'TP1 is electrically simple. The bus is a two-wire pair carrying 30V DC supply and 9600 bit/s differential telegrams on the same conductors. A 21V minimum must be maintained at every device terminal. Polarity is enforced by the red/black KNX terminal — reverse polarity will not damage a certified device but will prevent it communicating.',
        },
        {
          type: 'list',
          items: [
            'Nominal bus voltage: 30V DC, supplied from a KNX bus power supply (typically 320 mA or 640 mA output).',
            'Minimum device voltage: 21V DC at the device terminal. Voltage drop along a line must keep every device above this threshold.',
            'Bit rate: 9600 bit/s asynchronous, differential signalling. Adequate for switching, dimming, scene recall, sensor data and HVAC setpoints.',
            'Maximum line length: 1000 m total cable per line segment, including spurs.',
            'Maximum device-to-power-supply distance: 350 m.',
            'Maximum device-to-device distance: 700 m.',
            'Spur / tee topology permitted — KNX TP1 is not impedance-matched and does not require termination resistors.',
            'No ring topology — the bus must be a tree (line with spurs), never a closed loop.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'No rings, ever',
          text: 'A closed loop on KNX TP1 will appear to work intermittently but produces signal collisions and unpredictable device behaviour. Every cable run must terminate at a device or be left as an unterminated spur — never join the head of a line back to the tail.',
        },
        {
          type: 'paragraph',
          text: 'TP1 is class 2 / SELV in BS 7671 terms — extra-low voltage from a safety-isolated source. That classification is what underpins the Section 528 segregation rules covered later in this guide.',
        },
      ],
    },
    {
      id: 'knx-cable',
      heading: 'KNX Cable — J-Y(St)Y 2x2x0.8',
      tocLabel: 'KNX cable',
      blocks: [
        {
          type: 'paragraph',
          text: 'The standardised KNX cable is J-Y(St)Y 2x2x0.8 — a green-sheathed, screened twisted-pair instrument cable. UK distributors stock it from Hager, Belden, Schneider and ABB. It is recognised by its bright green sheath, the de facto colour code for KNX bus cable in UK installations.',
        },
        {
          type: 'list',
          items: [
            'Designation: J-Y(St)Y 2x2x0.8 — telecommunications cable, PVC insulation, static screen (St = static), PVC sheath, two pairs of conductors at 0.8 mm diameter (approx. 0.5 mm² CSA).',
            'Conductor colour code: red/black for the active pair (KNX bus); white/yellow for the spare pair (typically used for auxiliary 24V, additional bus on a separate line, or left unused and trimmed back).',
            'Screen: aluminium-polyester foil with a drain wire. Earthed at one end only — typically at the bus power supply — to avoid earth loops. Never earth the screen at both ends.',
            'Outer sheath colour: green (KNX convention; not statutorily required but universally followed).',
            'Bend radius: minimum 4x cable diameter when installed, 8x when subject to repeated movement.',
            'Fire performance: not LSZH by default. Specify LSZH variant (J-H(St)H) for escape routes, communal areas and Section 422 high-risk locations under BS 7671.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Only the red/black pair is required for a functioning TP1 bus. The white/yellow pair may be used for an auxiliary, but the safest convention is to cap it and reserve it as a spare.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Use KNX-certified bus cable — not Cat5e',
          text: 'It is tempting to substitute Cat5e or Cat6 for KNX, especially on a job that is already pulling structured cabling. KNX will function on Cat5e over short runs, but the impedance characteristics, screen continuity and segregation rating are wrong. KNX Association certification is granted on the basis of J-Y(St)Y compliance.',
        },
      ],
    },
    {
      id: 'topology',
      heading: 'Line, Area and Backbone Architecture',
      tocLabel: 'Topology',
      blocks: [
        {
          type: 'paragraph',
          text: 'KNX is hierarchically structured so that a single project can scale from a small flat (one line, twenty devices) to a corporate campus (multiple areas, thousands of devices) without changing the underlying protocol. The hierarchy is line, area, backbone — and the limits are fixed by the KNX standard, not by manufacturer convention.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Line — the lowest level. Up to 64 devices on a single TP1 segment, fed by one bus power supply (with a choke). 1000 m maximum cable length. If more than 64 devices are required on the same logical line, additional line repeaters or line couplers extend the count.',
            'Line couplers / line repeaters — a line coupler joins two lines and filters telegrams between them. Up to three line repeaters per line allow up to 256 devices on one logical line (4 segments × 64), though performance and fault containment usually argue for separate lines instead.',
            'Area — up to 12 lines connected via line couplers to a single area line. An area carries the inter-line traffic for its 12 child lines.',
            'Backbone — up to 15 areas, each joined via area couplers to the backbone line. The backbone is the project-wide spine, typically implemented on TP1 in small projects and on KNXnet/IP for anything larger.',
            'Project maximum — 15 areas × 12 lines × 64 devices = 11,520 individually addressable devices on a single KNX installation, before line repeaters are even considered.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Use IP backbone for anything multi-floor',
          text: 'For commercial projects beyond a single floor plate, KNXnet/IP as the backbone is the default. It uses the structured Ethernet that the project already has, separates the high-traffic spine from the slower 9600 bit/s TP1 lines, and lets ETS reach every device from any switch port.',
        },
        {
          type: 'paragraph',
          text: "Each device on the project has a unique physical address in the form Area.Line.Device — for example 1.2.34 — and one or more group addresses (the logical channels that link, say, a light switch to the dimming actuator that drives a luminaire). Physical addresses are set at commissioning; group addresses are the project designer's logical scheme.",
        },
      ],
    },
    {
      id: 'power-supply',
      heading: 'Power Supply Selection and Redundancy',
      tocLabel: 'Power supply',
      blocks: [
        {
          type: 'paragraph',
          text: 'Every KNX TP1 line requires a dedicated KNX bus power supply (BPS). The BPS is a DIN-rail module that takes a mains input (230V AC, sometimes 110V) and produces a regulated 30V DC bus output through an integrated 100 mH choke. The choke is what allows data and DC supply to share the pair without the data being short-circuited by the supply.',
        },
        {
          type: 'list',
          items: [
            'Typical output ratings: 160 mA, 320 mA, 640 mA. Sum the bus current draw of every device on the line (each KNX device has a published bus current, typically 4-30 mA) and select a BPS rated at least 25% above that total to allow for telegram transmission peaks.',
            'One BPS per line as a default. A second BPS can be added to the same line via a separate choke for redundancy, provided both BPS units are KNX-certified for parallel operation.',
            'Bus reset button — most BPS units include a reset that briefly removes bus voltage. Useful during commissioning to force devices to reload parameters cleanly.',
            'Diagnostic LEDs — BPS modules indicate bus short, bus overload and reset state. On a commissioned site these should be visible at the panel for the M&E commissioning engineer.',
            'Mains supply — feed the BPS from a clearly labelled circuit on the same distribution board as the area it serves. Do not back-feed a KNX BPS from an essential / UPS supply unless the project specification calls for it explicitly.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Never use a generic 30V DC supply',
          text: 'A bench DC bench supply or generic industrial 30V module will power the LEDs on a KNX device but will not allow communication. The integrated 100 mH choke in a KNX-certified BPS is what makes TP1 work. Only KNX-certified bus power supplies are permitted.',
        },
        {
          type: 'paragraph',
          text: 'For wider redundancy patterns see our [building management systems guide](/guides/building-management-systems-electrical) and the [commercial lighting guide](/guides/commercial-lighting-guide).',
        },
      ],
    },
    {
      id: 'topology-rules',
      heading: 'Topology Rules — What You Can and Cannot Do',
      tocLabel: 'Topology rules',
      blocks: [
        {
          type: 'paragraph',
          text: 'KNX TP1 is forgiving by industrial protocol standards — no termination resistors, no impedance matching, no master device — but it has hard rules. Breaking them produces installations that pass continuity testing but fail commissioning, and that is the worst place for a fault to surface because it adds days to programme.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'No closed rings. The bus must be a tree topology — line with spurs — never a loop. Joining the head of a line back to the tail produces signal collisions.',
            'Maximum line length: 1000 m of cable per line (segment), summed across the main run and all spurs.',
            'Maximum device-to-BPS distance: 350 m. Beyond this the bus voltage drops below the 21V device threshold.',
            'Maximum device-to-device distance: 700 m. Even across two devices on opposite ends of a long line, the differential signal degrades beyond this.',
            'Maximum 64 devices per line segment before adding a line coupler or line repeater.',
            'Line couplers filter telegrams by default — design the group address scheme so that telegrams which need to cross a line do, and telegrams that should stay local do not. Filter table programming is part of commissioning.',
            'KNX bus cable spurs may tee off the main run. Spurs are not impedance-matched — keep them short where possible and within the overall 1000 m line budget.',
            'Polarity: red/black must be consistent across the entire line. A polarity flip at one device terminal is the single most common KNX commissioning fault.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The 1000 m budget is total cable, not point-to-point',
          text: 'Every metre of bus cable on the line — main run, spurs, drops to devices — counts towards the 1000 m budget. For long buildings, plan the structured backbone as KNXnet/IP and break the project into multiple short lines rather than stretching a single line to its limit.',
        },
      ],
    },
    {
      id: 'segregation-528',
      heading: 'Wiring KNX Alongside Mains — Section 528',
      tocLabel: 'Section 528 segregation',
      blocks: [
        {
          type: 'paragraph',
          text: 'KNX TP1 is a SELV circuit derived from a safety-isolated source (the bus power supply). As a SELV circuit installed alongside LV mains, it falls under BS 7671:2018+A4:2026 Section 528 — segregation between circuits at different voltage bands.',
        },
        {
          type: 'paragraph',
          text: 'BS 7671 Reg 528.1 (reflected in GN3 Reg 4.8.5 and OSG Reg 7.4.1) classifies KNX TP1 as a Band I (extra-low voltage) circuit and mains as Band II (low voltage). Band I circuits must not share a wiring enclosure with Band II circuits unless one of the following conditions is satisfied:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Physical separation — the KNX bus cable runs on a separate tray, in a separate conduit, or in a separate compartment of multi-compartment trunking from the LV mains conductors.',
            'Partitioned trunking — a single trunking is permitted provided an internal partition maintains separation between the Band I bus and the Band II conductors (Reg 528.1 / OSG 7.4.1 condition (c)).',
            'Cable rated for highest voltage present — if the bus cable shares trunking or conduit with LV mains without partition, every cable in the enclosure must have insulation rated for the highest voltage present (300/500V minimum, often 600/1000V). Standard J-Y(St)Y 2x2x0.8 is NOT rated for this — a different KNX-rated multicore would be required (OSG 7.4.1 condition (a)).',
            'Earthed metal screen multicore — for a multicore cable containing both Band I and Band II conductors, an earthed metal screen of equivalent current-carrying capacity to the largest Band II circuit conductor separates the bands (OSG 7.4.1 condition (e)). The screen must be earthed and sized to carry prospective fault current.',
            'Mechanical protection at crossings — where KNX bus must cross LV mains (e.g. in a panel), maintain separation or use a sleeve to prevent contact.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Default to physical separation',
          text: 'On almost every UK project the cleanest answer to Section 528 for KNX is physical separation — a dedicated containment route, ideally on the same tray system but a separate compartment. Mixing J-Y(St)Y 2x2x0.8 with mains in a shared compartment is a Section 528 non-conformity and will be flagged at M&E sign-off.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Reg 528.3.4 — fault protection also required on shared routes',
          text: 'Where the KNX bus cable runs in close proximity to mains wiring, BS 7671 Reg 528.3.4(b) requires that fault protection is also afforded in accordance with Section 411 — not just physical separation. Inspectors check protective device selection, disconnection times and earthing arrangements (Section 411) independently of the segregation check (Section 528). Segregation alone does not discharge the fault-protection obligation.',
        },
        {
          type: 'paragraph',
          text: 'At the panel, the same principles apply — KNX bus terminations, the BPS, line couplers and IP routers sit in a dedicated low-voltage section with a partition from the mains busbar, and on separate glands. For wider containment design see our [building management systems electrical guide](/guides/building-management-systems-electrical).',
        },
      ],
    },
    {
      id: 'ets-commissioning',
      heading: 'ETS Commissioning — From Wired Bus to Working System',
      tocLabel: 'ETS commissioning',
      blocks: [
        {
          type: 'paragraph',
          text: 'A wired KNX installation does nothing until it is commissioned. Commissioning assigns each device a unique physical address, downloads the application programme into each device, and creates the group addresses that link inputs (switches, sensors) to outputs (actuators, dimmers, gateways). This is done in ETS — Engineering Tool Software — produced and licensed by the KNX Association.',
        },
        {
          type: 'paragraph',
          text: "ETS is Windows-only in practice, licensed in tiers (Demo, Lite, Home, Professional). UK commercial projects almost always use ETS Professional, with licences bound to the engineer's KNX Association ID and the project file.",
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Create the project — define the building structure (areas, lines, rooms), import device catalogues from the manufacturer ETS database, and place each physical device in the topology.',
            'Assign physical addresses — each device gets a unique Area.Line.Device address (e.g. 1.2.34). Push the device programming button; ETS writes the assigned address.',
            'Assign group addresses — create the logical communication channels (e.g. "Kitchen ceiling lights on/off", "AHU 1 setpoint") and link device objects to them.',
            "Configure parameters — set each device's application-specific behaviour (dimming curve, scene memory, timer durations, sensor thresholds, HVAC PID values).",
            'Download the application — push the configured programme into every device over the bus. ETS handles partial and full downloads.',
            'Test and document — run group address, scene and fault-injection tests, then generate the documentation pack (wiring lists, group address tables, device parameter dumps).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'ETS is a structured engineering tool, not a configuration',
          text: 'ETS rewards rigorous group address schemes, structured project trees, and disciplined notes. Disorganised projects are unmaintainable by the next engineer — and KNX projects routinely outlive their original installer.',
        },
      ],
    },
    {
      id: 'integration',
      heading: 'Lighting, HVAC and Blinds Integration',
      tocLabel: 'Integration',
      blocks: [
        {
          type: 'paragraph',
          text: 'KNX is specified on UK commercial projects because one bus carries lighting, HVAC, shading and energy metering — all addressable from the same wall panel, sensor or BMS gateway.',
        },
        {
          type: 'list',
          items: [
            'Lighting — switching actuators, 1-10V dimmers, KNX-DALI gateways, and RGBW/CCT controllers, with KNX scenes recalling multiple channels in one command.',
            'HVAC — KNX-to-Modbus and KNX-to-BACnet gateways tie KNX setpoints to fan coil units, VRF/VRV systems and AHU controllers, with room temperature and CO2 sensors publishing to the bus.',
            'Blinds and shading — KNX shutter/blind actuators with position feedback, combined with weather sensors to react to glare and overheating.',
            'Energy metering — KNX meters and CT interfaces publish kWh, A and V data for ESOS/SECR reporting and tenant sub-billing.',
            'Visualisation — KNX-to-IP visualisation servers (Gira X1, Jung Smart Visu, Comexio) provide touch panel and dashboard interfaces.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For deeper DALI integration see our [DALI lighting control wiring guide](/guides/dali-lighting-control-wiring-bs-en-62386); for BMS context see [building management systems electrical](/guides/building-management-systems-electrical); for ELV drivers under A4:2026 see [Section 715 ELV lighting](/guides/section-715-elv-lighting-a4-2026).',
        },
      ],
    },
    {
      id: 'knx-vs',
      heading: 'KNX vs DALI, BACnet and Modbus',
      tocLabel: 'KNX vs alternatives',
      blocks: [
        {
          type: 'paragraph',
          text: 'KNX is one of four protocols a UK electrician routinely encounters on building automation. Understanding where each fits — and where they meet — turns a wiring exercise into a coherent system.',
        },
        {
          type: 'list',
          items: [
            'KNX vs DALI — DALI (BS EN 62386) is a luminaire-level protocol; KNX is a building-level protocol. The standard UK pattern is KNX backbone with DALI at the luminaire group, joined by a KNX-DALI gateway. See [our DALI wiring guide](/guides/dali-lighting-control-wiring-bs-en-62386).',
            'KNX vs BACnet — BACnet (ISO 16484-5) is the dominant BMS protocol for commercial HVAC. BACnet is master-driven and object-oriented; KNX is decentralised and telegram-driven. They coexist via a KNX-BACnet gateway, KNX handling room-level interaction and BACnet handling plant supervision.',
            'KNX vs Modbus — Modbus RTU (RS-485) and Modbus TCP dominate industrial controls, metering and VFDs. Modbus is master/slave with cyclic polling; KNX is event-driven. A KNX-Modbus gateway typically pulls meter data or VFD status into KNX for visualisation or scene logic.',
            'KNX vs proprietary smart home (Lutron, Crestron, Control4) — vertically integrated ecosystems with locked dealer networks. KNX is open and multi-vendor, surviving any single manufacturer leaving the market. UK specs increasingly require open protocols for longevity.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'KNX backbone + DALI luminaire is the UK commercial default',
          text: 'For new commercial lighting, the pragmatic pattern is a KNX backbone for switches, sensors and scenes, with DALI-2 drivers in each luminaire group, joined by a KNX-DALI gateway. KNX talks to the BMS, DALI talks to the lamps.',
        },
      ],
    },
    {
      id: 'installer-certification',
      heading: 'KNX Partner Certification — Why It Matters',
      tocLabel: 'Installer certification',
      blocks: [
        {
          type: 'paragraph',
          text: 'The KNX Association certifies both products and people. A device is KNX-certified if it has passed conformance and interoperability testing in an accredited lab. A person becomes a KNX Partner by completing the five-day KNX Basic Course at an accredited training centre and is then listed in the KNX Association partner directory.',
        },
        {
          type: 'list',
          items: [
            'KNX Basic Certification — five-day course covering the standard, ETS, commissioning and fault-finding. Required for the KNX Partner badge.',
            'KNX Advanced — additional course covering complex projects, IP backbones, secure KNX and large project commissioning.',
            'Project consequences — many UK commercial specifications require the commissioning engineer to be a KNX Partner with a current ETS Professional licence. Without certification, manufacturer warranties may be voided and M&E sign-off may be refused.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'KNX certification is not the same as 18th Edition',
          text: 'A KNX Partner certification covers the protocol, the bus topology and ETS commissioning. It does not replace BS 7671:2018+A4:2026 competence, JIB grading, or the [usual UK electrical qualifications](/guides/smart-home-lighting-installation) needed to install the mains side. Both are required on a real KNX project.',
        },
      ],
    },
  ],
  howToHeading: 'How to Plan and Install a KNX System on a UK Project',
  howToDescription:
    'The end-to-end sequence from design to handover, anchored to BS EN 50090, ISO/IEC 14543-3 and BS 7671:2018+A4:2026 Section 528.',
  howToSteps: [
    {
      name: 'Design the topology and choose the media',
      text: 'Plan the line, area and backbone structure for the project. Default to TP1 twisted pair for each line, with KNXnet/IP as the backbone for any multi-floor or multi-area project. Allocate physical addresses on a coherent scheme that matches the building zoning, and reserve spare device counts on every line for future expansion.',
    },
    {
      name: 'Specify the cable and the segregation route',
      text: 'Specify J-Y(St)Y 2x2x0.8 KNX bus cable (LSZH variant where the route demands it). Plan the containment so that the bus cable is physically segregated from LV mains in accordance with BS 7671:2018+A4:2026 Section 528 — dedicated tray compartment, partitioned trunking, or separate conduit. Earth the cable screen at one end only, at the bus power supply.',
    },
    {
      name: 'Install the bus power supply and line couplers',
      text: 'Mount the bus power supply on the DIN rail of the relevant distribution board, with a clearly labelled mains supply circuit. Install line couplers / area couplers per the topology design. Maintain a partition between the SELV bus side of the enclosure and the LV mains side. Test continuity of the bus and confirm 30V DC at every device drop before energising.',
    },
    {
      name: 'Energise, address and download in ETS',
      text: "Energise the line, confirm 30V DC at every device, and confirm device LEDs are active. In ETS, assign physical addresses to each device using the device's programming button, then download the application programme, group addresses and parameters. Work line by line — full commissioning of one line before moving to the next.",
    },
    {
      name: 'Configure scenes, gateways and BMS integration',
      text: 'Build the scene logic in ETS — lighting recall, HVAC setpoints, blind positions. Configure KNX-DALI gateways, KNX-Modbus gateways and KNX-BACnet gateways as the project specifies. Push the resulting visualisation to the touch panels and BMS supervisory layer. Test scene recall, fault-injection, and edge cases (out-of-hours, fire alarm interface).',
    },
    {
      name: 'Test, document and hand over the project file',
      text: 'Test every group address, every scene, and every gateway integration. Produce the BS 7671 documentation for the mains side and the KNX project documentation pack (group address list, device list, wiring schematics, ETS .knxproj archive). Hand over the project file to the client and, where contracted, lodge it with the KNX Association.',
    },
  ],
  faqs: [
    {
      question: 'Do I need to be KNX-certified to install a KNX system in the UK?',
      answer:
        'There is no statutory requirement in BS 7671 or UK building regulations for KNX Partner certification. However, the KNX Association requires it for inclusion in the partner directory, manufacturers typically condition full warranty support on certified commissioning, and UK commercial specs often call for a KNX Partner with a current ETS Professional licence. Certification is practically required for serious commercial KNX work even though it is not a statutory licence.',
    },
    {
      question: 'Can I use Cat5e or Cat6 cable instead of J-Y(St)Y 2x2x0.8 for KNX?',
      answer:
        'It will electrically function on short runs because TP1 is undemanding about cable construction, but it is not KNX-compliant. KNX Association certification, segregation rating, and screen continuity all assume J-Y(St)Y or an equivalent KNX-rated twisted pair. UK commercial projects routinely reject Cat5e substitution at M&E commissioning. Always specify and install the correct KNX bus cable.',
    },
    {
      question: 'How does KNX interact with BS 7671 Section 528 segregation?',
      answer:
        'KNX TP1 is a SELV circuit derived from a safety-isolated source (the KNX bus power supply) and therefore falls under BS 7671:2018+A4:2026 Section 528. The bus cable must be segregated from LV mains either by physical separation (separate tray, separate conduit), by a partitioned multi-compartment trunking, or by using a cable rated for the highest voltage present. Standard J-Y(St)Y 2x2x0.8 is not rated for shared containment with mains without partitioning, so physical separation is the practical default.',
    },
    {
      question: 'What is the maximum number of devices on a KNX installation?',
      answer:
        '64 devices per line segment, 12 lines per area connected through line couplers, and 15 areas plus a backbone connected through area couplers. The arithmetic limit is 15 × 12 × 64 = 11,520 individually addressable devices on a single KNX project. In practice, large projects use IP as the backbone medium rather than TP1, which lifts the practical bandwidth constraint.',
    },
    {
      question: 'Can I commission KNX without ETS?',
      answer:
        'No. ETS (Engineering Tool Software) is the only sanctioned commissioning tool — there is no third-party equivalent. ETS is licensed by the KNX Association in tiers (Demo, Lite, Home, Professional). UK commercial projects use ETS Professional. Without ETS, no group addresses can be assigned, no application can be downloaded, and the installation cannot function.',
    },
    {
      question: 'How does KNX compare to a proprietary smart home system like Lutron or Crestron?',
      answer:
        'KNX is an open, multi-vendor standard published as BS EN 50090 and ISO/IEC 14543-3. Devices from any KNX-certified manufacturer interoperate, the protocol has been deployed since the early 1990s, and projects remain serviceable even if individual manufacturers exit the market. Lutron QS, Crestron and Control4 are vertically integrated ecosystems with stronger first-day user experience but locked dealer networks and proprietary commissioning tools. UK commercial specifications increasingly require open protocols for longevity, and KNX is the dominant open choice in Europe.',
    },
    {
      question: 'Is KNX suitable for a domestic property?',
      answer:
        'Yes — KNX scales from a one-line installation in a small flat to a multi-area corporate campus. For high-end residential where the client wants integrated lighting, HVAC, blinds and visualisation, KNX is a strong choice. For modest residential where smart switches and a few scenes are the requirement, a simpler smart-home system may be more cost-effective. See our [smart home wiring cost guide](/guides/smart-home-wiring-cost) for the trade-off in the residential bracket.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/dali-lighting-control-wiring-bs-en-62386',
      title: 'DALI Lighting Control Wiring (BS EN 62386)',
      description:
        'The lower-tier luminaire-level lighting protocol that pairs with a KNX backbone via a KNX-DALI gateway — wiring rules, addressing and commissioning.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/smart-home-lighting-installation',
      title: 'Smart Home Lighting Installation',
      description:
        'How KNX sits alongside the wider smart-home options for residential lighting — switches, dimmers, scenes and gateways.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/smart-home-wiring-cost',
      title: 'Smart Home Wiring Cost',
      description:
        'Budget envelopes for residential smart wiring including KNX, with cost comparisons against proprietary alternatives.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/building-management-systems-electrical',
      title: 'Building Management Systems — Electrical',
      description:
        'Where KNX fits in the wider BMS picture, alongside BACnet and Modbus, on UK commercial projects.',
      icon: 'Building2',
      category: 'Guide',
    },
    {
      href: '/guides/commercial-lighting-guide',
      title: 'Commercial Lighting Guide',
      description:
        'Commercial lighting design for UK projects — DALI, KNX backbones, daylight harvesting and emergency lighting interfaces.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/section-715-elv-lighting-a4-2026',
      title: 'Section 715 ELV Lighting — A4:2026',
      description:
        'Extra-low-voltage lighting installations under BS 7671:2018+A4:2026 Section 715 — drivers, segregation, and how it interacts with KNX/DALI control.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Plan, install and certify a KNX project with confidence',
  ctaSubheading:
    'Elec-Mate gives UK electricians the certification tools, RAMS templates and BS 7671:2018+A4:2026 calculators they need on KNX and other building-automation projects. 7-day free trial, cancel anytime.',
};
