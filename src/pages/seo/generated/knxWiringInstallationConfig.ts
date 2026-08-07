import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Sources:
//  - BS 7671:2018+A4:2026 — Reg 528.1 (proximity to electrical services), Reg 414.4
//    (protective separation of SELV/PELV), Section 422, Section 715. Quoted from the
//    printed text.
//  - IET On-Site Guide 9th Ed (A4) 7.4.1 "Segregation of Band I and Band II circuits",
//    conditions (a) to (e).
//  - IET Guidance Note 3 9th Ed (A4) 4.8.5 (Band I / Band II segregation in trunking).
//  - KNX Association Basic Course, "KNX TP1 Installation" (Installation_E1212a) — bus
//    voltage, cable, distances, power supply and test figures.
//  - KNX Association support articles — topology (lines per area, repeaters) and ETS
//    licence tiers.
//  - BS EN 50090 / ISO/IEC 14543-3 (the KNX standard itself).

const published = '2026-05-17';
const modified = '2026-08-07';

export const knxWiringInstallationConfig: GeneratedGuideConfig = {
  pagePath: '/guides/knx-wiring-installation-guide-uk',
  title: 'KNX Wiring & Bus Installation Guide for UK Electricians (BS 7671)',
  description:
    'KNX wiring installation guide for UK electricians — TP1 bus limits, J-Y(St)Y cable, line/area/backbone topology, power supply sizing, and BS 7671 Reg 528.1 and 414.4 segregation.',
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
    'KNX is the open standard (BS EN 50090 / ISO/IEC 14543-3) for home and building automation, used for lighting, HVAC, blinds, energy metering and security on UK commercial and high-end residential projects. This guide gives you the TP1 design limits up front, then the cable, the topology, the power supply rules, the BS 7671 segregation requirements, and ETS commissioning.',
  answerBox: {
    question: 'What is KNX wiring?',
    answer:
      'KNX is the open, manufacturer-independent standard (BS EN 50090, ISO/IEC 14543-3) for home and building automation. Instead of switches being wired directly to their loads, every device — switches, sensors, dimmers, blind and heating actuators — connects to a shared two-core bus cable and communicates by sending telegrams. Actuators in the distribution board switch the actual mains loads, so functions can be reprogrammed in software (ETS) without rewiring. On twisted pair (TP1) the bus runs at 9600 bit/s on a 30 V DC SELV supply, with 64 devices and 1000 m of cable per line segment. Certified devices from any manufacturer interoperate on the same bus.',
  },
  keyTakeaways: [
    'TP1 twisted pair is the default UK medium — 9600 bit/s, 30 V DC SELV bus, and every device must see at least 21 V at its terminals.',
    'Per line segment: 64 devices, 1000 m of cable, 350 m maximum from the bus power supply to any device, 700 m maximum between any two devices.',
    'Up to 15 lines form an area and up to 15 areas sit on a backbone — 14,400 devices at 64 per line, and far more once lines are extended with repeaters.',
    'Only standard green KNX TP1 cable (J-Y(St)Y or YCYM 2x2x0.8) guarantees those distances; they are derived from a loop resistance of 75 ohms and a loop capacitance of 100 nF per 1000 m.',
    'The bus is SELV, so BS 7671 Reg 528.1 governs sharing containment with mains and Reg 414.4 governs protective separation. Both apply — 528.1 alone is not the whole answer.',
    'Nothing works until the project is commissioned in ETS: physical addresses, group addresses, parameters and the application program are downloaded into every device.',
    'KNX Partner status comes from an accredited KNX Association course of at least 30 hours, not from a manufacturer. UK commercial specifications routinely ask for it.',
  ],
  sections: [
    {
      id: 'what-is-knx',
      heading: 'What KNX Is — and Why UK Projects Specify It',
      tocLabel: 'What is KNX?',
      blocks: [
        {
          type: 'paragraph',
          text: 'KNX is the international open standard for home and building electronic systems, defined by BS EN 50090 in Europe and ISO/IEC 14543-3 worldwide. It is the convergence of EIB, BatiBUS and EHS into a single manufacturer-independent specification administered by the KNX Association in Brussels. Over 500 member companies produce KNX-certified devices, and any certified device interoperates on the same bus, commissioned through a single tool called ETS.',
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
          text: 'For a UK electrician, KNX sits in the same territory as [DALI lighting control](/guides/dali-lighting-control-wiring-bs-en-62386) and [building management systems](/guides/building-management-systems-electrical) — extra-low-voltage control wiring layered on top of mains power, governed by BS 7671 for segregation and protective separation, and commissioned in software once the wiring is complete.',
        },
      ],
    },
    {
      id: 'design-limits',
      heading: 'TP1 Design Limits — The Numbers You Need on Site',
      tocLabel: 'TP1 design limits',
      blocks: [
        {
          type: 'paragraph',
          text: 'These are the figures that decide whether a KNX design works. They come from the KNX Association Basic Course material and apply to a TP1 twisted-pair line built with standard green KNX bus cable.',
        },
        {
          type: 'list',
          items: [
            'Bus voltage — 30 V DC, generated as a SELV supply by a KNX bus power supply. The SELV network must not be earthed.',
            'Minimum device voltage — 21 V DC. After every device is mounted, check the voltage at the end of each bus cable with a voltmeter; it must be at least 21 V.',
            'Data rate — 9600 bit/s on TP1, carried on the same pair as the DC supply.',
            'Devices per line segment — 64. Up to three line repeaters extend a line to four segments and a maximum of 255 devices.',
            'Maximum cable length of a line segment — 1000 m, counting the main run and every spur.',
            'Maximum distance from bus power supply to any device — 350 m.',
            'Maximum distance between any two bus devices — 700 m.',
            'Power supplies per line — two maximum. The minimum spacing between them is whatever the manufacturer specifies.',
            'Device load — up to 200 mW each unless the data sheet says otherwise, which is why a 640 mA supply is matched to a fully loaded 64-device line.',
            'Termination — none. TP1 is not impedance-matched, so there are no end-of-line resistors. Spurs and tees are permitted; closed rings are not.',
            'Topology — up to 15 lines per area through line couplers, and up to 15 areas on a backbone line through area couplers.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The 1000 m budget is total cable, not point-to-point',
          text: 'Every metre of bus cable on the segment — main run, spurs, drops to devices — counts towards the 1000 m. For long buildings, plan the backbone as KNXnet/IP and break the project into several short lines rather than stretching one line to its limit.',
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
          text: 'The standardised KNX cable is J-Y(St)Y 2x2x0.8 — a green-sheathed, screened twisted-pair instrument cable. YCYM 2x2x0.8 in TP1 design is the equivalent. UK distributors stock it from Hager, Belden, Schneider and ABB, and it is recognised on site by its green sheath.',
        },
        {
          type: 'list',
          items: [
            'Designation — J-Y(St)Y 2x2x0.8: telecommunications cable, PVC insulation, static screen (St), PVC sheath, two pairs at 0.8 mm conductor diameter (approximately 0.5 mm2 CSA).',
            'Conductor colours — red/black for the active bus pair; white/yellow for the spare pair, normally capped off and reserved.',
            'Screen — aluminium/polyester foil with a drain wire. The KNX Association states it is not normally necessary to connect the shield of these cable types at all. Where a specification does call for a shield connection, make it at one point only and never at both ends.',
            'Sheath colour — green. This is the KNX convention rather than a statutory requirement, but it is universally followed and makes the bus identifiable in containment.',
            'Fire performance — not LSZH by default. Specify the halogen-free variant J-H(St)H for escape routes, communal areas and locations covered by BS 7671 Section 422 (precautions where particular risks of fire exist).',
            'Bend radius and pulling tension — take these from the manufacturer data sheet for the specific cable, not from a rule of thumb.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Use KNX TP1 cable — not Cat5e, and never a mains-rated cable',
          text: 'It is tempting to substitute Cat5e or Cat6 on a job that is already pulling structured cabling. The KNX Association is explicit that only standard green KNX TP1 cable guarantees the maximum line length, the maximum distance between two devices and the maximum device count, because those limits are derived from a loop resistance of 75 ohms and a loop capacitance of 100 nF per 1000 m. It is equally explicit that cables intended for heavy-current networks must not be used for TP1. For any other cable, the maximum length in that cable data sheet governs.',
        },
        {
          type: 'paragraph',
          text: 'Only the red/black pair is required for a functioning TP1 bus. The white/yellow pair may be used for an auxiliary, but the safest convention is to cap it and reserve it as a spare.',
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
          text: 'KNX defines four physical media. In practice, UK projects use TP1 for the structured backbone and IP for inter-line and inter-building routing; RF appears in retrofit and where chasing cables is impractical; PL is effectively obsolete for new build.',
        },
        {
          type: 'list',
          items: [
            'TP1 — twisted pair, 9600 bit/s, 30 V DC SELV bus. The default medium for new-build commercial and residential KNX. Power and data share the same pair, and the connection block is polarity-sensitive.',
            'IP — KNXnet/IP, KNX telegrams tunnelled or routed over Ethernet at 10/100 Mbit/s. Used for backbone routing between areas, remote ETS commissioning, BMS integration via gateways, and visualisation servers.',
            'RF — KNX Radio Frequency, FSK on a centre frequency of 868.3 MHz at 16.4 kbit/s, with a physical layer equivalent to Wireless M-Bus S-mode. A 433 MHz variant exists for non-European markets. KNX RF Ready works on 868.3 MHz alone; KNX RF Multi adds three fast and two slow channels, the slow ones suiting battery and energy-harvesting devices.',
            'PL — Powerline, 110 kHz over the mains conductors at 1200 bit/s. Largely deprecated in new build because of interference from third-party loads and the rise of RF and IP as easier retrofit options.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'TP1 is the default — design the project around it',
          text: 'Unless the project is explicitly a retrofit using KNX RF, assume TP1 twisted pair as the structured medium for every line. IP is used between areas and into the BMS, not as a substitute for TP1 on a single line.',
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
          text: 'KNX is hierarchically structured so that a single project can scale from a small flat (one line, twenty devices) to a corporate campus (several areas, thousands of devices) without changing the protocol. The hierarchy is line, then area, then backbone.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Line — the lowest level. A line segment carries 64 devices and is fed by one bus power supply with a choke.',
            'Line repeaters — up to three repeaters per line give four segments and a maximum of 255 devices on one logical line. Fault containment and traffic usually argue for separate lines instead.',
            'Line couplers — a coupler joins a line to the area line above it and filters telegrams between them, so local traffic stays local.',
            'Area — up to 15 lines connected through line couplers to a single area line.',
            'Backbone — up to 15 areas, each joined through an area coupler to the backbone line. The backbone is the project-wide spine, TP1 on small projects and KNXnet/IP on anything larger.',
            'Project scale — at 64 devices per line that is 15 x 15 x 64 = 14,400 addressable devices, and a project using repeatered lines goes well beyond that.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Use an IP backbone for anything multi-floor',
          text: 'For commercial projects beyond a single floor plate, KNXnet/IP as the backbone is the default. It uses the structured Ethernet the project already has, separates the high-traffic spine from the 9600 bit/s TP1 lines, and lets ETS reach every device from any switch port.',
        },
        {
          type: 'paragraph',
          text: "Each device has a unique physical address in the form Area.Line.Device — for example 1.2.34 — and one or more group addresses, the logical channels that link a switch to the actuator driving a luminaire. Physical addresses are set at commissioning; group addresses are the project designer's logical scheme.",
        },
      ],
    },
    {
      id: 'power-supply',
      heading: 'Power Supply Selection and Sizing',
      tocLabel: 'Power supply',
      blocks: [
        {
          type: 'paragraph',
          text: 'Every KNX TP1 line requires its own KNX bus power supply. It is a DIN-rail module that takes a mains input and produces the monitored 30 V DC SELV bus supply through a choke. The choke is what stops the filter and charging capacitors in the supply short-circuiting the 9600 Hz telegrams, which is why data and DC can share one pair.',
        },
        {
          type: 'list',
          items: [
            'Output ratings — 160 mA, 320 mA and 640 mA are the common sizes. Add up the published bus load of every device on the line (up to 200 mW each unless the data sheet says otherwise) and leave headroom: a 640 mA supply is the match for a full 64-device line at 200 mW.',
            'Two supplies maximum per line. A second supply is added where the line needs more current, and the minimum spacing between the two is whatever the manufacturer specifies.',
            'Where more than about 30 devices sit close together, such as on one distribution board, put the supply near that group rather than at the far end of the line.',
            'Short-circuit resistant with integrated voltage and current control, and a buffer with a stored-energy time of 100 ms to ride out brief mains interruptions.',
            'Reset switch — many supplies or their external chokes can drop the connected line to 0 V. Useful during commissioning to force a clean restart.',
            'Diagnostic LEDs — indicate bus fault, overload and reset state, and on some units an external voltage above 30 V applied to the bus side. Keep them visible at the panel for the commissioning engineer.',
            'Mains supply — feed the unit from a clearly labelled circuit on the board serving the area. Do not back-feed it from an essential or UPS supply unless the specification calls for it.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Never use a generic 30 V DC supply',
          text: 'A bench supply or a generic industrial 30 V module will light the LEDs on a KNX device but will not allow it to communicate. The choke in a KNX-certified bus power supply is what makes TP1 work. Only KNX-certified bus power supplies are suitable.',
        },
        {
          type: 'paragraph',
          text: 'For wider containment and resilience patterns see our [building management systems guide](/guides/building-management-systems-electrical) and the [commercial lighting guide](/guides/commercial-lighting-guide).',
        },
      ],
    },
    {
      id: 'topology-rules',
      heading: 'The Wiring Rules That Decide Whether Commissioning Works',
      tocLabel: 'Wiring rules',
      blocks: [
        {
          type: 'paragraph',
          text: 'KNX TP1 is forgiving by industrial protocol standards — no termination resistors, no impedance matching, no master device. What it does have is a short list of hard rules, and breaking them produces installations that pass a continuity test but fail commissioning. That is the worst place for a fault to surface, because it lands on the programme.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'No closed rings. The bus must be a tree — a line with spurs — never a loop. Joining the head of a line back to the tail produces collisions and unpredictable behaviour.',
            'Bus cables from different lines must never be linked together. Test for it by switching off the power supply of the line under test: if the power LED on the line coupler stays lit, there is an inadmissible connection somewhere.',
            'Bus cable ends terminate at a device or at a bus connection block — nowhere else. Connection blocks let a device be removed without interrupting the bus and are mechanically protected against mis-mating.',
            'Polarity: red/black must be consistent across the whole line. Check every device by pressing its programming button — if the programming LED lights, it is connected the right way round. Press again to return it to normal operation.',
            'Keep every device inside the distance limits: 1000 m of cable per segment, 350 m from the supply, 700 m between any two devices.',
            'Line couplers filter telegrams by default. Design the group address scheme so that telegrams which need to cross a line do, and local ones do not. Filter table programming is part of commissioning.',
            'Mark bus cable ends "KNX TP1" or "BUS", and add the area and line. It makes fault-finding and future maintenance far quicker.',
            'Plan out loops at design stage. A large loop area formed by bus cable, mains cable and the equipotential bonding of pipework or metal walls invites lightning-induced overvoltage, and in bad cases makes the installation impossible to program.',
          ],
        },
      ],
    },
    {
      id: 'segregation-528',
      heading: 'Wiring KNX Alongside Mains — BS 7671 Reg 528.1 and Reg 414.4',
      tocLabel: 'BS 7671 segregation',
      blocks: [
        {
          type: 'paragraph',
          text: 'The KNX TP1 bus is a SELV system: a safety-isolated source, safe isolation from other networks, basic insulation to earth, and no earthing of the bus itself. That makes it a Band I (extra-low voltage) circuit in BS 7671 terms, while the mains around it is Band II (low voltage). Two regulations then apply, and both have to be satisfied.',
        },
        {
          type: 'paragraph',
          text: 'Regulation 528.1 (Proximity to electrical services) states that a Band I circuit shall not be contained in the same wiring system as a Band II circuit except where one of the following methods is adopted:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '(a) every cable or conductor is insulated for the highest voltage present;',
            '(b) each conductor of a multicore cable is insulated for the highest voltage present in the cable;',
            '(c) the cables are insulated for their system voltage and installed in a separate compartment of a cable ducting or cable trunking system;',
            '(d) the cables are installed on a cable tray system where physical separation is provided by a partition;',
            '(e) a separate conduit, trunking or ducting system is employed;',
            '(f) for a multicore cable, the cores of the Band I circuit are separated from the cores of the Band II circuit by an earthed metal screen of equivalent current-carrying capacity to that of the largest core of a Band II circuit.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The IET On-Site Guide sets out the same conditions at 7.4.1, lettered (a) to (e), and Guidance Note 3 covers the trunking case at 4.8.5. Standard J-Y(St)Y 2x2x0.8 is not insulated for 230 V, so options (a) and (b) are not open to you with normal KNX cable — which leaves separate containment, a separate trunking compartment, or a partitioned tray.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Reg 528.1 is only half of it — Reg 414.4 also applies',
          text: 'Regulation 528.1 closes with a sentence that is easy to miss: for SELV and PELV systems, the requirements of Regulation 414.4 shall apply. Because the KNX bus is SELV, satisfying one of the 528.1 methods does not on its own discharge the protective separation duty. Reg 414.4.1 requires protective separation from live parts of circuits that are not SELV or PELV, provided by double or reinforced insulation, or by basic insulation plus protective screening for the highest voltage present.',
        },
        {
          type: 'paragraph',
          text: 'Regulation 414.4.2 then lists the arrangements by which protective separation of the wiring system may be achieved:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '(a) SELV and PELV circuit conductors enclosed in a non-metallic sheath or insulating enclosure in addition to basic insulation;',
            '(b) SELV and PELV circuit conductors separated from conductors of circuits at voltages higher than Band I by an earthed metallic sheath or earthed metallic screen;',
            '(c) circuit conductors at voltages higher than Band I may be contained in a multi-conductor cable or other grouping of conductors if the SELV and PELV conductors are insulated for the highest voltage present;',
            '(d) the wiring systems of other circuits are in compliance with Regulation 412.2.4.1;',
            '(e) physical separation.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Default to physical separation',
          text: 'On almost every UK project the cleanest answer is physical separation — a dedicated containment route, or a separate compartment on the same tray system. Running J-Y(St)Y 2x2x0.8 loose in a shared compartment with mains satisfies neither Reg 528.1 nor Reg 414.4, and it will be picked up at M&E sign-off.',
        },
        {
          type: 'paragraph',
          text: 'The same thinking applies inside enclosures and accessories. The KNX Association requires double or reinforced insulation between mains and bus cables in wall boxes, with unsheathed bus cores never in contact with mains cables. Junctions go in separate boxes, or in a common box with a partition giving 8 mm clearance and creepage distances. Where a bus device shares a box or a common cover plate with mains accessories, the bus device manufacturer must explicitly approve that combination, and the mains parts must stay protected against accidental contact even with the cover removed. At the panel, the bus terminations, power supply, line couplers and IP routers sit in a section partitioned from the mains busbar, on separate glands.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Section 528 also covers pipework — but that is 528.3, not 528.1',
          text: 'Section 528 is titled Proximity of wiring systems to other services. Reg 528.1 is the Band I / Band II rule above. Reg 528.2 deals with proximity to communications cables, and Reg 528.3 with non-electrical services — gas, water, steam, heating. If a bus route shares a riser with pipework, that is a 528.3 question, and 528.3.4 requires both that the wiring system is protected against hazards from those services in normal use and that fault protection is afforded in accordance with Section 411.',
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
          text: 'A wired KNX installation does nothing until it is commissioned. Commissioning assigns each device a unique physical address, downloads the application program into each device, and creates the group addresses that link inputs (switches, sensors) to outputs (actuators, dimmers, gateways). This is done in ETS — Engineering Tool Software — produced and licensed by the KNX Association.',
        },
        {
          type: 'paragraph',
          text: 'ETS is Windows-only in practice and licensed in tiers. The KNX Association publishes device limits for each: Demo is capped at five products per project, Lite at 20 devices, Home at 64 products in a single project, and Professional is the unrestricted tier. UK commercial projects use Professional almost without exception.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Create the project — define the building structure (areas, lines, rooms), import device catalogues from the manufacturer ETS databases, and place each physical device in the topology.',
            'Assign physical addresses — each device gets a unique Area.Line.Device address, for example 1.2.34. Press the device programming button; ETS writes the assigned address.',
            'Assign group addresses — create the logical channels ("Kitchen ceiling lights on/off", "AHU 1 setpoint") and link device objects to them.',
            "Configure parameters — set each device's application behaviour: dimming curve, scene memory, timer durations, sensor thresholds, HVAC control values.",
            'Download the application — push the configured program into every device over the bus. ETS handles partial and full downloads.',
            'Test and document — run group address, scene and fault-injection tests, then generate the documentation pack: wiring lists, group address tables and device parameter dumps.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'ETS is an engineering tool, not a configuration wizard',
          text: 'ETS rewards rigorous group address schemes, a structured project tree and disciplined notes. Disorganised projects are unmaintainable by the next engineer, and KNX installations routinely outlive their original installer.',
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
            'Lighting — switching actuators, 1-10 V dimmers, KNX-DALI gateways and RGBW/CCT controllers, with KNX scenes recalling multiple channels in one command.',
            'HVAC — KNX-to-Modbus and KNX-to-BACnet gateways tie KNX setpoints to fan coil units, VRF systems and AHU controllers, with room temperature and CO2 sensors publishing to the bus.',
            'Blinds and shading — KNX shutter and blind actuators with position feedback, combined with weather sensors to react to glare and solar gain.',
            'Energy metering — KNX meters and CT interfaces publish kWh, current and voltage data for ESOS and SECR reporting and for tenant sub-billing.',
            'Visualisation — KNX-to-IP visualisation servers provide touch panel and dashboard interfaces, and give the client a front end that does not depend on a single manufacturer.',
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
          text: 'KNX is one of several protocols a UK electrician meets on building automation. Knowing where each fits — and where they join — turns a wiring exercise into a coherent system.',
        },
        {
          type: 'list',
          items: [
            'KNX and DALI — DALI (BS EN 62386) is a luminaire-level protocol; KNX is a building-level one. The standard UK pattern is a KNX backbone with DALI at the luminaire group, joined by a KNX-DALI gateway. See [our DALI wiring guide](/guides/dali-lighting-control-wiring-bs-en-62386).',
            'KNX and BACnet — BACnet (ISO 16484-5) is the dominant BMS protocol for commercial HVAC. It is object-oriented and supervisory; KNX is decentralised and telegram-driven. They coexist through a KNX-BACnet gateway, with KNX handling room-level interaction and BACnet handling plant.',
            'KNX and Modbus — Modbus RTU (RS-485) and Modbus TCP dominate industrial controls, metering and variable-speed drives. Modbus is master/slave with cyclic polling; KNX is event-driven. A KNX-Modbus gateway typically pulls meter or drive data into KNX for visualisation and scene logic.',
            'KNX and proprietary smart-home ecosystems — systems such as Lutron, Crestron and Control4 are vertically integrated, distributed through dealer networks and commissioned with vendor-specific tools. KNX is a multi-vendor standard, so devices from different manufacturers can be mixed on one project. UK specifications increasingly ask for an open protocol on longevity grounds.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'KNX backbone plus DALI at the luminaire is the UK commercial default',
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
          text: 'The KNX Association certifies both products and people. A device is KNX-certified once it has passed conformance and interoperability testing in an accredited lab. A person becomes a KNX Partner by completing the KNX Basic Course at an accredited training centre and passing the exams, after which they are listed in the KNX Association partner directory.',
        },
        {
          type: 'list',
          items: [
            'KNX Basic Course — a minimum of 30 hours including the theory and practical exams, typically delivered over four or five days. It covers the standard, ETS, commissioning and fault-finding, and it is the route to the KNX Partner badge.',
            'KNX Advanced Course — a further course covering complex projects, IP backbones, KNX Secure and large-project commissioning.',
            'Project consequences — many UK commercial specifications require the commissioning engineer to be a KNX Partner with a current ETS Professional licence. Manufacturers may also condition full warranty support on certified commissioning.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'KNX certification is not a substitute for BS 7671 competence',
          text: 'KNX Partner certification covers the protocol, the bus topology and ETS commissioning. It does not replace BS 7671:2018+A4:2026 competence, JIB grading, or the [usual UK electrical qualifications](/guides/smart-home-lighting-installation) needed to install the mains side. Both are required on a real KNX project.',
        },
      ],
    },
  ],
  howToHeading: 'How to Plan and Install a KNX System on a UK Project',
  howToDescription:
    'The end-to-end sequence from design to handover, anchored to BS EN 50090, ISO/IEC 14543-3 and BS 7671:2018+A4:2026 Regulations 528.1 and 414.4.',
  howToSteps: [
    {
      name: 'Design the topology and choose the media',
      text: 'Plan the line, area and backbone structure. Default to TP1 twisted pair for each line, with KNXnet/IP as the backbone for any multi-floor or multi-area project. Keep each line inside 64 devices, 1000 m of cable, 350 m from the power supply and 700 m between any two devices. Allocate physical addresses on a scheme that matches the building zoning, and reserve spare device capacity on every line.',
    },
    {
      name: 'Specify the cable and the segregation route',
      text: 'Specify standard green KNX TP1 cable — J-Y(St)Y 2x2x0.8, or the halogen-free J-H(St)H where the route demands it. Plan the containment so the bus is physically separated from the mains: a dedicated tray compartment, a partitioned tray, or a separate conduit or trunking system, satisfying BS 7671 Reg 528.1 and the protective separation requirements of Reg 414.4. Leave the cable screen unconnected unless the specification requires otherwise, and never earth the SELV bus itself.',
    },
    {
      name: 'Install the bus power supply and couplers',
      text: 'Mount the bus power supply on the DIN rail of the board serving that area, on a clearly labelled circuit, and position it near any dense cluster of devices. Install line and area couplers per the topology design. Keep a partition between the SELV bus section of the enclosure and the mains side. Terminate bus cables only at devices or at bus connection blocks.',
    },
    {
      name: 'Energise, prove the bus, then address and download in ETS',
      text: 'Energise the line and, once every device is mounted, check the voltage at the end of each bus cable with a voltmeter — it must be at least 21 V. Prove polarity on every device by pressing the programming button and confirming the LED lights. In ETS, assign physical addresses, then download the application program, group addresses and parameters. Work line by line, finishing one before moving to the next.',
    },
    {
      name: 'Configure scenes, gateways and BMS integration',
      text: 'Build the scene logic in ETS — lighting recall, HVAC setpoints, blind positions. Configure KNX-DALI, KNX-Modbus and KNX-BACnet gateways as the specification requires. Push the visualisation to the touch panels and the BMS supervisory layer. Test scene recall, fault injection and edge cases such as out-of-hours operation and the fire alarm interface.',
    },
    {
      name: 'Test, document and hand over the project file',
      text: 'Test every group address, every scene and every gateway integration. Mark the bus cable ends "KNX TP1" or "BUS" with the area and line. Produce the BS 7671 documentation for the mains side and the KNX documentation pack: group address list, device list, wiring schematics and the ETS .knxproj archive. Hand the project file to the client.',
    },
  ],
  faqs: [
    {
      question: 'What are the KNX TP1 cable length and device limits?',
      answer:
        'Per line segment: a maximum of 1000 m of bus cable counting the main run and all spurs, 350 m maximum from the bus power supply to any device, 700 m maximum between any two devices, and 64 devices. Up to three line repeaters extend a line to four segments and a maximum of 255 devices. Those distances assume standard green KNX TP1 cable, because they are derived from its loop resistance of 75 ohms and loop capacitance of 100 nF per 1000 m; for any other cable, the maximum length in that cable data sheet applies instead.',
    },
    {
      question: 'What voltage does the KNX bus run at?',
      answer:
        '30 V DC, generated as a SELV supply by a KNX bus power supply, with the 9600 bit/s telegrams carried on the same pair. Every bus device needs at least 21 V at its terminals to operate safely, so the KNX Association test is to check the voltage at the end of each bus cable with a voltmeter once all devices are mounted and confirm it is at least 21 V. The SELV bus network must not be earthed.',
    },
    {
      question: 'Do I need to be KNX-certified to install a KNX system in the UK?',
      answer:
        'There is no statutory requirement in BS 7671 or the Building Regulations for KNX Partner certification. However, the KNX Association requires the Basic Course for inclusion in its partner directory, manufacturers typically condition full warranty support on certified commissioning, and UK commercial specifications often call for a KNX Partner with a current ETS Professional licence. It is practically required for serious commercial KNX work even though it is not a statutory licence.',
    },
    {
      question: 'Can I use Cat5e or Cat6 cable instead of J-Y(St)Y 2x2x0.8 for KNX?',
      answer:
        'It will function electrically on short runs, because TP1 is undemanding about cable construction, but you lose the published limits. The KNX Association is explicit that only standard green KNX TP1 cable guarantees the maximum line length, the maximum distance between two devices and the maximum device count, because those figures come from its loop resistance of 75 ohms and loop capacitance of 100 nF per 1000 m. For any other cable you must work to the maximum length given in that cable data sheet, and cables intended for heavy-current networks must not be used at all.',
    },
    {
      question: 'How does KNX interact with BS 7671 segregation requirements?',
      answer:
        'The KNX TP1 bus is SELV, so it is a Band I circuit and the mains around it is Band II. Regulation 528.1 says a Band I circuit shall not be contained in the same wiring system as a Band II circuit unless one of six methods is adopted — every cable insulated for the highest voltage present, each conductor of a multicore so insulated, a separate compartment of ducting or trunking, a partition on a cable tray, a separate conduit/trunking/ducting system, or an earthed metal screen between the cores of a multicore. Standard J-Y(St)Y is not insulated for 230 V, so in practice you use separate containment, a separate compartment or a partitioned tray. Regulation 528.1 also states that for SELV and PELV systems the requirements of Regulation 414.4 apply, so protective separation under 414.4 must be satisfied as well.',
    },
    {
      question: 'What is the maximum number of devices on a KNX installation?',
      answer:
        '64 devices per line segment, with up to three line repeaters extending a line to four segments and a maximum of 255 devices. Up to 15 lines connect through line couplers to an area line, and up to 15 areas connect through area couplers to a backbone line. At 64 devices per line that is 15 x 15 x 64 = 14,400 addressable devices, and considerably more once lines are repeatered. In practice, large projects use KNXnet/IP as the backbone rather than TP1, which lifts the bandwidth constraint on the spine.',
    },
    {
      question: 'Can I commission KNX without ETS?',
      answer:
        'No. ETS (Engineering Tool Software) is the only sanctioned commissioning tool, licensed by the KNX Association in tiers — Demo (five products per project), Lite (20 devices), Home (64 products, one project) and Professional. UK commercial projects use Professional. Without ETS no physical or group addresses can be assigned and no application program can be downloaded, so the installation cannot function.',
    },
    {
      question: 'Is KNX suitable for a domestic property?',
      answer:
        'Yes — KNX scales from a single-line installation in a small flat to a multi-area campus. For high-end residential where the client wants integrated lighting, HVAC, blinds and visualisation, it is a strong choice. For modest residential where smart switches and a few scenes are the requirement, a simpler smart-home system is usually more cost-effective. See our [smart home wiring cost guide](/guides/smart-home-wiring-cost) for the trade-off in the residential bracket.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/dali-lighting-control-wiring-bs-en-62386',
      title: 'DALI Lighting Control Wiring (BS EN 62386)',
      description:
        'The luminaire-level lighting protocol that pairs with a KNX backbone via a KNX-DALI gateway — wiring rules, addressing and commissioning.',
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
