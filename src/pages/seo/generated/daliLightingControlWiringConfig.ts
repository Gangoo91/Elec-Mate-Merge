import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS EN 62386 (Digital Addressable Lighting Interface — DALI),
// BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026), BS EN 60598
// (Luminaires) and the IET On-Site Guide.

const published = '2026-05-17';
const modified = '2026-05-17';

export const daliLightingControlWiringConfig: GeneratedGuideConfig = {
  pagePath: '/guides/dali-lighting-control-wiring-bs-en-62386',
  title:
    'DALI Lighting Control Wiring Guide (BS EN 62386) for UK Electricians | Elec-Mate',
  description:
    'A UK electrician guide to DALI lighting control wiring under BS EN 62386 — DALI-1 vs DALI-2 vs D4i, bus topology, 16V DC power, cable selection, Section 528 segregation under BS 7671:2018+A4:2026, commissioning and emergency lighting.',
  datePublished: published,
  dateModified: modified,
  readingTime: 16,
  badge: 'Lighting Control Systems',
  badgeIcon: 'Lightbulb',
  breadcrumbLabel: 'DALI Lighting Control Wiring',
  heroPrefix: 'DALI Lighting Control Wiring Guide',
  heroHighlight: '(BS EN 62386)',
  heroSuffix: 'for UK Electricians',
  heroSubtitle:
    'DALI (Digital Addressable Lighting Interface) is the open international standard for lighting control on UK commercial projects. It replaces analogue 0-10V and proprietary relay switching with a digital two-wire bus that lets each luminaire be individually addressed, grouped, scened and queried. This guide explains BS EN 62386, the differences between DALI-1, DALI-2 and D4i, how to wire the bus correctly under BS 7671:2018+A4:2026 (including Section 528 segregation), commissioning workflow, and how DALI compares with KNX, 0-10V and DMX.',
  keyTakeaways: [
    'DALI is defined by the BS EN 62386 series — Part 101 covers the physical bus, Part 102 covers control gear, Part 103 covers control devices, and Part 2xx covers application extensions such as emergency lighting (Part 202) and colour control (Part 209).',
    'The DALI bus is a polarity-insensitive two-wire bus, nominal 16V DC, up to 250mA. It supports 64 short addresses, 16 groups and 16 scenes per line, with a maximum cable length of 300 metres at 1.5mm² conductor cross-section.',
    'DALI-2 (BS EN 62386 from 2014) introduced certified interoperability between gear and control devices from different manufacturers. D4i extends DALI-2 with intra-luminaire power and data on the same pair for IoT-enabled luminaires.',
    'Under BS 7671:2018+A4:2026 the DALI bus is a Band I (ELV) signalling circuit. Section 528 (segregation of circuits) governs how it may share trunking, conduit and luminaires with the Band II mains supply powering the drivers.',
    'A short circuit on the DALI bus disables the whole line — every luminaire on that bus drops to last-known or fail-safe brightness. Fault isolation and short-circuit-proof bus power supplies are essential.',
    'Commissioning is where DALI delivers value — addressing, grouping, scene programming and sensor binding are done with vendor software (Tridonic masterCONFIGURATOR, Helvar Designer) or vendor-neutral DALI-2 tools.',
  ],
  sections: [
    {
      id: 'what-is-dali',
      heading: 'What DALI Actually Is',
      tocLabel: 'What is DALI?',
      blocks: [
        {
          type: 'paragraph',
          text:
            'DALI stands for Digital Addressable Lighting Interface — the open international standard for digital communication between lighting control gear (drivers, ballasts, emergency converters) and control devices (sensors, push-button panels, scene controllers, BMS). It is published in the BS EN 62386 series and is the dominant protocol for commercial lighting control on UK fit-out, retrofit and new-build projects.',
        },
        {
          type: 'paragraph',
          text:
            'Where 0-10V analogue offers one brightness channel per dimming line, and relay contactors switch only pre-wired groups, a DALI bus addresses up to 64 individual devices per line, commands each independently, queries each for status (lamp failure, energy, hours run), and reorganises groupings in software. For the UK electrician this changes the wiring: permanent live to every driver, plus a two-wire DALI bus to every controllable device. Switching happens in software during commissioning, not in copper at first fix.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'DALI is digital signalling, not power',
          text:
            'The DALI bus carries data at approximately 1200 baud as a Manchester-encoded signal around a 16V DC nominal level. It does not power the luminaire — every driver still needs its own 230V AC mains supply.',
        },
      ],
    },
    {
      id: 'dali-1-vs-dali-2-vs-d4i',
      heading: 'DALI-1 vs DALI-2 vs D4i',
      tocLabel: 'DALI-1 / DALI-2 / D4i',
      blocks: [
        {
          type: 'paragraph',
          text:
            'DALI has evolved through three generations, often mixed within the same building. Knowing which generation you have changes the commissioning tools you need and how the bus is powered.',
        },
        {
          type: 'list',
          items: [
            'DALI-1 (original BS EN 62386, mid-2000s) — defined the bus, the 16V DC physical layer and the 64-address command set. Vendor interoperability was uneven, so commissioning typically required vendor-specific tools.',
            'DALI-2 (BS EN 62386 revisions from 2014, administered by DiiA) — introduced certified interoperability. Gear (Part 102) and control devices (Part 103) carrying the DALI-2 logo are guaranteed to interoperate at protocol level. DALI-2 also formalised the single bus power supply (one PSU per line).',
            'D4i (DALI-2 extension, DiiA certified from 2019) — requires intra-luminaire DALI: the driver can supply bus power, exposes standardised energy and diagnostic data, and accepts IoT sensor nodes plugged directly into the luminaire. D4i is the foundation for connected-luminaire IoT in offices and warehouses.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Specify DALI-2 throughout where possible',
          text:
            'New specifications in 2026 almost universally call for DALI-2 gear, frequently with D4i where future IoT sensors are anticipated. Retrofits often splice into DALI-1 — interoperable in principle but proprietary extensions and older firmware can create commissioning issues. Where mixing, allow contingency for vendor-specific troubleshooting.',
        },
      ],
    },
    {
      id: 'bus-topology',
      heading: 'DALI Bus Topology and Limits',
      tocLabel: 'Bus topology',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The DALI bus is exceptionally permissive about topology. There is no required daisy-chain, no terminating resistor, no trunk-and-spur layout. The standard calls this "free topology" — branches, stars, trees and mixed arrangements are all permitted, provided cumulative cable length and electrical loading stay within limits.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Maximum devices per line — 64 short addresses (0 to 63). A multi-channel driver (e.g. 4-channel RGBW) consumes one address per channel.',
            'Maximum cable length per line — 300 metres at 1.5mm². Smaller cross-sections de-rate to roughly 150m at 0.75mm² and 100m at 0.5mm² due to voltage drop on the bus.',
            'Maximum voltage drop — 2V across the line at maximum load. This is the controlling factor for cable size and length.',
            'Maximum bus supply current — 250mA per line. Typical control gear draws ~2mA from the bus; a fully populated line approaches ~128mA, leaving headroom for control devices and sensors.',
            'Topology — free topology, no terminating resistor required at 1200 baud.',
            'Groups per line — 16 groups (0 to 15). A device may belong to any combination.',
            'Scenes per line — 16 scenes (0 to 15), each storing recalled brightness for every device on the bus.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Plan addresses before you wire',
          text:
            'A common first-fix mistake is to wire more than 64 controllable devices onto a single bus. Multi-channel drivers, emergency converters, sensors and panels all consume addresses. Count the address budget in design — not at commissioning when re-pulling cable is expensive.',
        },
      ],
    },
    {
      id: 'bus-power-supply',
      heading: 'Bus Power Supply',
      tocLabel: 'Bus power supply',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Every DALI line needs a bus power supply — a small DIN-rail or surface unit providing 16V DC nominal and current for the bus. Without it, no signalling occurs, although every driver still receives mains and delivers light at its last-known level.',
        },
        {
          type: 'list',
          items: [
            'Nominal bus voltage — 16V DC (range 9.5V to 22.5V permitted by BS EN 62386-101, but 16V is the design centre).',
            'Maximum bus current — 250mA per line. Specify the PSU to deliver at least the cumulative draw of all devices, plus inrush margin at power-up.',
            'Short-circuit protection — required. DALI-2 PSUs carry this as a certification requirement.',
            'Single PSU per line — DALI-2 mandates exactly one bus PSU per line. Legacy DALI-1 installations with parallel PSUs should be corrected during refurbishment.',
            'D4i in-luminaire PSU — D4i drivers can supply bus power on the same pair within the luminaire boundary, useful for modular ceiling tiles where the driver and sensor share a connector.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Sizing the PSU is not optional',
          text:
            'A common commissioning fault is an under-rated bus PSU. The bus works at first fix and during initial addressing — then drops devices intermittently once all 64 are powered up. Sum the maximum bus current from datasheets and size with at least 20% margin.',
        },
      ],
    },
    {
      id: 'cable-selection',
      heading: 'Cable Selection for the DALI Bus',
      tocLabel: 'Cable selection',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The DALI bus is intentionally tolerant of cable choice — no impedance spec, no shielding or twisted-pair requirement, no polarity. The two conductors are interchangeable: connecting them the wrong way causes no damage and does not stop the bus working. A deliberate decision to make DALI installable by general electricians.',
        },
        {
          type: 'list',
          items: [
            'Typical cable — standard mains cable, most commonly 1.5mm² twin LSZH, or two cores of a 5-core mains cable carrying L, N, CPC and the DALI pair together.',
            'Conductor cross-section vs length — 1.5mm² supports the full 300m line. 0.75mm² supports ~150m. 0.5mm² supports ~100m. The limit is voltage drop, not current rating.',
            'Polarity — polarity-insensitive. The two cores can be terminated either way at every device.',
            'Shielding — not required. On noisy industrial sites alongside motors or VSDs, screened cable can improve immunity but is rarely specified for office or commercial lighting.',
            'Combined mains + DALI cable — using 5-core mains cable for L, N, CPC and the DALI pair is permitted by Section 528 of BS 7671:2018+A4:2026 provided every core carries insulation rated for the highest voltage present.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Standardise on 5-core for clean installation',
          text:
            'On any DALI fit-out larger than a single room, standardising on a 5-core 1.5mm² mains-rated cable between luminaires is the cleanest approach. One cable per drop, no segregation problem inside the cable, every conductor rated for full mains insulation. Mark the DALI cores at every termination.',
        },
      ],
    },
    {
      id: 'section-528-segregation',
      heading: 'Section 528 — Segregation Under BS 7671:2018+A4:2026',
      tocLabel: 'Section 528 segregation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 528 of BS 7671:2018+A4:2026 governs the proximity of wiring systems of different voltage bands. The DALI bus is Band I (ELV); the mains supply to the drivers is Band II. Section 528 sets out when these may share trunking, conduit, multi-core cables and luminaires.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Regulation 528.1 — Band I and Band II circuits may not share a wiring system unless every cable is insulated for the highest voltage present, OR the circuits are separated by an earthed metallic partition, OR each circuit is in its own enclosure.',
            'Multi-core cable approach — using 5-core mains cable where every core is insulated for 230V is the simplest compliance route. The DALI pair shares the cable with mains and CPC, and Section 528.1 is satisfied because every core is mains-insulated.',
            'Shared trunking — DALI in its own LSZH cable can run in trunking with Band II circuits provided the trunking has an earthed metallic divider, OR each circuit is in its own conduit, OR the DALI cable is mains-rated.',
            'Within the luminaire — Section 559 and Section 528 together require the DALI bus terminals and the mains terminals to be separated by appropriate barriers within the gear tray, or that the bus cable carries mains-rated insulation up to the driver.',
            'Emergency lighting cables — where the bus serves Part 202 emergency converters, BS 5266 and BS 8519 may impose fire-rated cable requirements on that segment. Check the project fire engineering brief.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Section 715 ELV lighting interaction',
          text:
            'Where the lighting itself is extra-low voltage (e.g. SELV LED strip on a 24V output), Section 715 of BS 7671:2018+A4:2026 governs the SELV output side. The DALI bus controlling the SELV driver remains a Band I signalling circuit subject to Section 528. See the [Section 715 ELV lighting under A4:2026 guide](/guides/section-715-elv-lighting-a4-2026).',
        },
      ],
    },
    {
      id: 'wiring-practices',
      heading: 'Practical Wiring on Site',
      tocLabel: 'Wiring practices',
      blocks: [
        {
          type: 'paragraph',
          text:
            'First-fix follows a consistent pattern, and doing it the same way every time pays off at commissioning.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Run permanent live, neutral and CPC to every driver from the lighting MCB or RCBO — as you would for an uncontrolled mains-switched luminaire. There is no switched live in a DALI installation.',
            'Run the DALI bus pair (two cores, polarity-insensitive) to every device — every driver, every sensor, every control panel, every emergency converter. Free topology: branch, star or daisy-chain as suits.',
            'Terminate the bus pair at the driver\'s DA / DA terminals (sometimes labelled D+ / D-, but polarity-insensitive). Tighten to the driver\'s specified torque.',
            'Run the DALI bus back to the lighting control panel where the bus PSU sits. Terminate on the PSU output and power up.',
            'For multi-line systems, each line has its own PSU and bus pair. Lines may share trunking but must not share bus cores — each line is a separate two-wire pair with independent address space.',
            'Document the bus topology on the as-installed drawing — every drop, every drive, every sensor. Commissioning relies on knowing which physical luminaire corresponds to which discovered short address.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Permanent live to every driver',
          text:
            'The single most common DALI first-fix mistake is wiring one core as a switched live. Every driver receives permanent mains 24/7. If you wire a switched live from a wall plate, DALI commands cannot wake the driver because it is unpowered. The wall plate is itself a DALI control device on the bus — not a mains switch.',
        },
      ],
    },
    {
      id: 'commissioning',
      heading: 'Commissioning — Addressing, Grouping, Scenes',
      tocLabel: 'Commissioning',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Commissioning is where DALI delivers its value. Out of the box, every driver has the default broadcast address — every luminaire responds identically until commissioning gives each its own identity.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Power up the bus and confirm every driver is alive — broadcast a fade-to-100% command and walk the building. If a luminaire does not respond, it is unpowered, unwired, or faulty.',
            'Run automatic short address assignment from the commissioning tool. The tool assigns addresses 0 to (N-1) to every device. The assignment is random, so identification comes next.',
            'Identify each address against the physical luminaire — by flashing each address in turn and walking the space. Record the mapping on the as-installed drawing.',
            'Assign devices to groups (e.g. Group 0 = perimeter, Group 1 = central, Group 2 = corridor). A device may belong to multiple groups; commands target groups efficiently.',
            'Program scenes (Scene 0 = Meeting, Scene 1 = Presentation, Scene 2 = Cleaning, Scene 15 = Off). Each device stores its own brightness for each scene.',
            'Bind control devices to groups or addresses — push-buttons and PIR sensors get their group and scene mappings here. This is where DALI replaces traditional wired switching entirely in software.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Tridonic masterCONFIGURATOR, Helvar Designer and Lunatone DALI Cockpit are common manufacturer tools. DALI-2 certified components also work with vendor-neutral tools such as DALI Cockpit. A USB-to-DALI interface (£100-£300) connects the laptop to the bus.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Hand the commissioning file to the client',
          text:
            'The commissioning file (a backup of every address, group, scene and binding on the bus) is the most valuable handover document on a DALI project. Save to project records, email a copy to the client, and store a backup off-site.',
        },
      ],
    },
    {
      id: 'emergency-lighting-integration',
      heading: 'Emergency Lighting Integration (BS EN 62386-202)',
      tocLabel: 'Emergency lighting',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS EN 62386-202 defines the DALI command set for self-contained emergency lighting. Under BS 5266, self-contained luminaires must be tested at defined intervals: a short functional test (typically monthly) and a full-rated-duration discharge test (annually). DALI Part 202 automates this.',
        },
        {
          type: 'list',
          items: [
            'Each emergency converter takes a DALI short address on the bus, consuming one address from the 64-address budget.',
            'The commissioning tool or central management system can trigger a functional test on any addressed emergency converter at any time, individually or in groups.',
            'Annual discharge tests can be scheduled outside building occupation hours, with results (pass / fail / battery duration) logged automatically.',
            'Test logs are pushed to the BMS over a BACnet or Modbus gateway, providing a digital audit trail aligned to the BS 5266 logbook requirement.',
            'Failed emergency converters or batteries report themselves over the bus — facilities get an automatic alert rather than waiting for the next walk-test.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'DALI-driven emergency testing is one of the strongest commercial arguments for the protocol on buildings larger than a small office — labour saving on monthly and annual testing repays the system cost within a few maintenance cycles. See the [BS 5266 emergency lighting standard guide](/guides/bs5266-emergency-lighting-standard).',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Emergency cabling still follows BS 5266 / BS 8519',
          text:
            'The DALI bus delivers test commands and collects results, but the emergency luminaire itself is still subject to BS 5266 maintained / non-maintained classification, three-hour duration, and any fire-rated cabling required by the building\'s fire strategy.',
        },
      ],
    },
    {
      id: 'master-slave-broadcast',
      heading: 'Master/Slave Architecture vs Broadcast Mode',
      tocLabel: 'Architecture modes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A DALI line can operate in three architectural modes, which determines commissioning effort and flexibility.',
        },
        {
          type: 'list',
          items: [
            'Broadcast — every device on the bus listens to every command at broadcast level. No addressing, no groups, no scenes. The whole bus dims and switches as one. The factory default, occasionally specified for very simple applications.',
            'Master/slave — a single master control device (a DALI-2 wall panel, sensor or application controller) issues commands to a defined set of addressed slaves. Common for small commercial spaces (meeting rooms, retail bays).',
            'Managed (controller-based) — a central DALI application controller or routing gateway sits on each line and orchestrates groups, scenes, time-of-day schedules and sensor logic, often as a node on a higher-level BACnet / Modbus / KNX network. Typical for whole-building lighting management on office, retail, education and healthcare projects.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'In 2026 the managed architecture is dominant on commercial fit-outs. A line controller sits on each line, runs schedules and scene logic, and connects to the BMS over BACnet/IP. See the [commercial lighting guide](/guides/commercial-lighting-guide) for whole-building integration.',
        },
      ],
    },
    {
      id: 'fault-isolation',
      heading: 'Fault Isolation on the Bus',
      tocLabel: 'Fault isolation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A short circuit on the DALI bus disables the entire line. Every device drops to its configured bus-failure state — typically last-scene, sometimes a fail-safe level. The fault-finding sequence is different from a conventional lighting circuit.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Confirm the bus PSU is delivering 16V DC across the PSU output terminals with the bus disconnected. If the PSU is dead, the line is unpowered.',
            'Reconnect the bus and re-measure. If voltage reads near 0V with the PSU trying to source, there is a short somewhere on the line. The PSU\'s current-limiter is preventing damage but no signalling can occur.',
            'Bisect the bus — disconnect at a known midpoint and measure each half independently. The half that still reads low contains the short.',
            'Repeat the bisection until the short is localised. Common causes: a bus core touching a mains core or CPC inside a driver, a damaged cable at a containment penetration, a failed driver with internally shorted DA terminals.',
            'For repeated bus failures, fit a short-circuit-proof bus PSU (most DALI-2 PSUs are) and surge protection on the bus side of the PSU — particularly on outdoor or industrial sites with heavy switching.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lights still work without bus signalling',
          text:
            'With the bus disabled, every driver still has mains and outputs light at its last-known level. The system has lost control but not power. Failure mode is lit, not dark — a feature, but it can mask a bus fault for days until someone notices the controls have stopped working.',
        },
      ],
    },
    {
      id: 'comparison-with-other-protocols',
      heading: 'DALI vs KNX vs 0-10V Analogue vs DMX',
      tocLabel: 'Comparison',
      blocks: [
        {
          type: 'paragraph',
          text:
            'DALI is not the only lighting control protocol. The most common alternatives are KNX, 0-10V analogue, DMX, and increasingly Power over Ethernet (PoE) lighting.',
        },
        {
          type: 'list',
          items: [
            'DALI vs KNX — KNX is a building-wide bus covering lighting, HVAC, blinds and access. DALI is lighting-only but simpler at the luminaire level and dominant when lighting is the only managed service. Many projects use DALI for lighting and KNX as the building backbone, bridged by DALI/KNX gateways. See the [KNX wiring installation guide](/guides/knx-wiring-installation-guide-uk).',
            'DALI vs 0-10V — 0-10V is a single-channel analogue dimming signal with no addressing, no status reporting, and no software reconfigurability. Cheap and robust for simple zoned dimming. DALI replaces it where individual control, energy reporting, or future reconfigurability matters.',
            'DALI vs DMX — DMX512 is the entertainment industry\'s protocol. Faster (44Hz refresh vs DALI\'s ~1Hz), broadcast-only, channel-based rather than addressed. Dominant on theatres, studios and architectural feature lighting; DALI dominates general commercial.',
            'DALI vs PoE lighting — PoE delivers power and Ethernet data on Cat6 to each luminaire as an IP device. Growing but still a small minority versus DALI. See the [PoE lighting vs traditional LED wiring guide](/guides/poe-lighting-vs-traditional-led-wiring).',
            'DALI vs smart-home wireless — for residential use, Zigbee and Matter often replace DALI because a bus pair to every domestic luminaire is hard to justify. See the [smart home lighting installation guide](/guides/smart-home-lighting-installation).',
          ],
        },
      ],
    },
    {
      id: 'certification-handover',
      heading: 'Certification and Handover',
      tocLabel: 'Certification',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A DALI installation must be certified to BS 7671:2018+A4:2026 like any other. The mains side — permanent live feeds, the bus PSU mains feed, and the lighting MCB/RCBO — is recorded on the EIC or Minor Works Certificate, with test results in the schedule of test results.',
        },
        {
          type: 'list',
          items: [
            'EIC or MW certificate — the mains side of the installation under BS 7671:2018+A4:2026.',
            'DALI commissioning report — a separate document listing every short address, its physical luminaire, programmed groups and scenes, and control device bindings. Not a BS 7671 requirement but contractually expected.',
            'Commissioning backup file — the manufacturer software\'s configuration backup. Save to project records and to the client.',
            'Emergency lighting commissioning — separately recorded under BS 5266, with first test results documented as the logbook baseline.',
            'As-installed drawings — every luminaire numbered with its physical reference and DALI short address. The lookup the client needs every time the system is modified.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'On the Elec-Mate platform, the [EIC tool](/tools/eic-certificate) covers the mains-side certification, and lighting commissioning record templates cover the DALI handover — both produced as PDFs aligned to BS 7671:2018+A4:2026.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Hand over the bus, not just the lights',
          text:
            'A handover that consists only of "the lights work" is incomplete. Include the commissioning backup file, the address-to-luminaire mapping, the group and scene programming, and the emergency lighting test schedule.',
        },
      ],
    },
  ],
  howToHeading: 'How to Install and Commission a DALI Lighting System',
  howToDescription:
    'The end-to-end workflow from first-fix wiring to client handover for a DALI-2 lighting control system on a UK commercial fit-out, aligned to BS EN 62386 and BS 7671:2018+A4:2026.',
  howToSteps: [
    {
      name: 'Plan the bus topology and address budget',
      text:
        'Count every controllable device — drivers (one address per dimmable channel), emergency converters, sensors and control panels. Stay within 64 addresses per line and split into multiple lines if needed. Confirm cable lengths are within 300m at 1.5mm². Mark the topology on the lighting drawing before first fix.',
    },
    {
      name: 'First-fix wiring',
      text:
        'Run permanent live, neutral and CPC to every driver from the lighting MCB or RCBO. Run a two-core polarity-insensitive DALI bus pair to every controllable device. Standardise on a 5-core 1.5mm² mains-rated cable carrying mains and bus together to satisfy Section 528 of BS 7671:2018+A4:2026 in a single cable.',
    },
    {
      name: 'Install the bus power supply',
      text:
        'Mount the DALI bus PSU in the lighting distribution panel or local control panel. Feed from a Band II mains supply. Connect the PSU output to the bus pair returning from the luminaires. Power up and confirm 16V DC on the bus.',
    },
    {
      name: 'Address every device on the bus',
      text:
        'Connect a USB-to-DALI interface to the bus. Open the commissioning software (vendor-specific or DALI-2 vendor-neutral). Run automatic addressing to assign short addresses 0 to N-1. Walk the building flashing each address and record the mapping to physical luminaires on the as-installed drawing.',
    },
    {
      name: 'Configure groups, scenes and control devices',
      text:
        'Assign devices to groups based on the zoning plan. Program scenes (Meeting, Presentation, Cleaning, etc) with the required brightness per device. Bind push-button panels and PIR sensors to the appropriate groups and scenes. Test every control path from operator action to luminaire response.',
    },
    {
      name: 'Commission emergency lighting and hand over',
      text:
        'Run the first BS 5266 functional and discharge tests on Part 202 emergency converters via the DALI bus. Save the commissioning backup file. Produce the EIC under BS 7671:2018+A4:2026, the DALI commissioning report, and the as-installed drawing. Hand all three to the client along with the backup file.',
    },
  ],
  faqs: [
    {
      question: 'Is DALI a UK or an international standard?',
      answer:
        'DALI is international — published as IEC 62386 globally and BS EN 62386 in the UK. It is certified for interoperability by DiiA (Digital Illumination Interface Alliance) for the DALI-2 and D4i tiers. UK electricians work to BS EN 62386 alongside BS 7671:2018+A4:2026, BS EN 60598 and BS 5266.',
    },
    {
      question: 'Does the DALI bus need to be polarity-correct?',
      answer:
        'No. The DALI bus is polarity-insensitive by design — the two cores are interchangeable at every termination. Connecting them the other way round causes no damage and does not stop the bus working. A deliberate design choice that lets general electricians install DALI without specialist data cabling skills.',
    },
    {
      question: 'How long can a DALI bus run be?',
      answer:
        'Maximum total cable length per line is 300 metres at 1.5mm², set by the 2V voltage drop limit at full current draw. Smaller cross-sections reduce roughly linearly — around 150m at 0.75mm² and 100m at 0.5mm². Beyond 300m, split into multiple lines with their own PSUs and bridge them at a router or gateway.',
    },
    {
      question: 'Can I run the DALI bus in the same cable as the mains supply?',
      answer:
        'Yes, provided you comply with Section 528 of BS 7671:2018+A4:2026. The simplest route is a 5-core mains-rated cable (typically 1.5mm² LSZH) where every conductor is insulated for the highest voltage present. The DALI pair shares with L, N and CPC. Section 528.1 is satisfied because every core is mains-insulated.',
    },
    {
      question: 'What happens to the lights if the DALI bus fails?',
      answer:
        'They stay on at their last-known level. The bus carries commands and status, not power. Every driver still has its permanent mains supply, and on loss of signalling each driver holds at its last-received level or transitions to a configured fail-safe. A deliberate fail-lit design — the system loses control but does not plunge the building into darkness.',
    },
    {
      question: 'How many luminaires can I put on a single DALI line?',
      answer:
        'Up to 64 short addresses per line (0 to 63). A single dimmable driver uses one address; a multi-channel driver (e.g. RGBW) uses one per channel. Emergency converters, sensors and control panels also consume addresses. Plan the address budget in design — running out at commissioning usually means pulling additional cable.',
    },
    {
      question: 'Is DALI compatible with KNX or BACnet for whole-building integration?',
      answer:
        'Yes, via gateways. A DALI/KNX gateway translates between a DALI line and a KNX bus; a DALI/BACnet IP gateway puts the DALI configuration onto the BMS network. Common on UK commercial projects where lighting is on DALI but wider building services run on KNX or BACnet. Each gateway has its own commissioning step mapping DALI groups and scenes to KNX or BACnet objects.',
    },
    {
      question: 'How does Elec-Mate help with DALI projects?',
      answer:
        'Elec-Mate covers the BS 7671:2018+A4:2026 certification side — the EIC tool for the mains install, the Minor Works Certificate for smaller modifications, and the EICR tool for periodic inspection. The platform also includes lighting design guidance, BS 5266 emergency lighting calculations and commissioning record templates. The DALI bus commissioning itself is done with the manufacturer\'s software; the certification and handover documentation around it is produced in Elec-Mate.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/knx-wiring-installation-guide-uk',
      title: 'KNX Wiring Installation Guide (UK)',
      description: 'How KNX compares with DALI and how the two integrate via gateways on whole-building installations.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/commercial-lighting-guide',
      title: 'Commercial Lighting Guide',
      description: 'End-to-end design and installation of commercial lighting on UK fit-outs, with DALI control as the dominant choice.',
      icon: 'Lightbulb',
      category: 'Guide',
    },
    {
      href: '/guides/smart-home-lighting-installation',
      title: 'Smart Home Lighting Installation',
      description: 'Wireless and bus-based domestic lighting control — where DALI fits and where Zigbee/Matter take over.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/bs5266-emergency-lighting-standard',
      title: 'BS 5266 Emergency Lighting Standard',
      description: 'The UK code of practice for emergency lighting and how DALI Part 202 automates monthly and annual testing.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/poe-lighting-vs-traditional-led-wiring',
      title: 'PoE Lighting vs Traditional LED Wiring',
      description: 'Power-over-Ethernet lighting as an alternative to DALI on data-centre and high-density office projects.',
      icon: 'Network',
      category: 'Guide',
    },
    {
      href: '/guides/section-715-elv-lighting-a4-2026',
      title: 'Section 715 ELV Lighting under A4:2026',
      description: 'SELV and PELV lighting requirements under BS 7671:2018+A4:2026 and how Section 528 segregation interacts.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Certify your DALI install to BS 7671:2018+A4:2026',
  ctaSubheading:
    'The Elec-Mate platform produces the EIC, EICR, Minor Works Certificate and emergency lighting commissioning documentation that sit alongside a DALI installation — aligned to BS 7671:2018+A4:2026, BS EN 62386 and BS 5266. 7-day free trial, cancel anytime.',
};
