import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// BS EN 61439 (Low-voltage switchgear and controlgear assemblies), BS EN 62752
// (In-cable control & protective devices), and the Building Regulations Part P.

const published = '2026-05-17';
const modified = '2026-05-17';

export const smartDistributionBoardIotConfig: GeneratedGuideConfig = {
  pagePath: '/guides/smart-distribution-board-iot-consumer-unit',
  title:
    'Smart Distribution Board / IoT Consumer Unit Installation Guide (UK) | Elec-Mate',
  description:
    'UK installation guide for smart consumer units and IoT distribution boards — per-circuit energy monitoring, remote breaker switching, BS EN 61439 type-tested assembly status, BS 7671 Section 537 isolation implications, AFDD integration, load shedding for EV and heat pump customers, Octopus smart tariff integration, cybersecurity for mains-rated WiFi devices, and Building Regulations Part P notifiable work.',
  datePublished: published,
  dateModified: modified,
  readingTime: 15,
  badge: 'Smart Home Electrical',
  badgeIcon: 'Zap',
  breadcrumbLabel: 'Smart Distribution Board / IoT Consumer Unit',
  heroPrefix: 'Smart Distribution Board /',
  heroHighlight: 'IoT Consumer Unit',
  heroSuffix: 'Installation Guide (UK)',
  heroSubtitle:
    'Smart consumer units have moved from a curiosity to a real product category on UK wholesalers\' shelves. They meter every circuit, expose data to a cloud dashboard, and in some products allow remote breaker switching. They also raise serious BS 7671 questions about isolation, BS EN 61439 type-tested assembly status, cyber security for a mains-rated WiFi device, and Building Regulations Part P notifiable work. This guide covers what is on sale in 2026, how to install one compliantly, and where the technology is going next.',
  keyTakeaways: [
    'A smart consumer unit is a domestic distribution board with integrated per-circuit current measurement, a local controller, and a connection to either a cloud dashboard or a home automation hub via WiFi, Zigbee or LAN.',
    'Replacing a consumer unit is notifiable work under Building Regulations Part P in England and Wales — whether traditional or smart. The smart layer does not change Part P; the act of replacing the CU does.',
    'BS EN 61439 type-tested assembly status applies to the assembly as supplied. Adding third-party measurement modules or aftermarket CT clamps to a non-smart CU can break TTA status and shift liability onto the installer.',
    'Section 537 of BS 7671:2018+A4:2026 requires isolation devices to be capable of being secured against unauthorised reclosure. A cloud command is not a substitute for a physical lock-off.',
    'AFDD requirements in A4:2026 apply regardless of whether the CU is "smart". Smart CUs that integrate AFDD into the RCBO are an aid to compliance, not a workaround.',
    'A mains-rated IoT device on a domestic WiFi network creates a new attack surface — segmented SSID, firmware update policy and vendor disclosure record should be documented at handover.',
    'The strongest commercial case in 2026 is the EV-and-heat-pump household: per-circuit load shedding lets a 60-100 A supply ride coincident loads without the cost of a service upgrade, and unlocks dynamic Octopus tariff savings.',
  ],
  sections: [
    {
      id: 'what-is-smart-cu',
      heading: 'What a Smart Consumer Unit Actually Is',
      tocLabel: 'What it is',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A smart consumer unit, sometimes called an IoT distribution board, is a standard BS EN 61439-3 type-tested domestic distribution board with three additions: per-circuit current measurement, a local intelligence module, and a communications interface. Everything BS 7671 requires of a traditional CU — main switch, RCD or RCBO protection, AFDD where mandated by A4:2026, correct earthing arrangement — still applies. The "smart" layer sits on top, not in place of it.',
        },
        {
          type: 'paragraph',
          text:
            'Measurement is normally done with split-core CT clamps around each outgoing live conductor, terminated at a measurement bus, with data brought back to a DIN-rail controller. The controller is typically a low-power ARM device with local storage and a WiFi, Zigbee or wired LAN radio. Some products go further: smart RCBOs replace conventional electromechanical RCBOs with a microprocessor-controlled trip mechanism that can be commanded open or closed remotely, and some integrate AFDD into the same device. That is where the category diverges from a traditional CU and where the regulatory questions start to bite — particularly around Section 537 isolation, fault discrimination, and TTA status.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'What "smart" does not change',
          text:
            'A smart consumer unit is still a consumer unit. BS 7671:2018+A4:2026 chapters on protection (Chapter 41), isolation and switching (Chapter 46 and Section 537), selection and erection (Part 5) and inspection and testing (Part 6) apply in full.',
        },
      ],
    },
    {
      id: 'feature-set',
      heading: 'The Smart CU Feature Set in 2026',
      tocLabel: 'Feature set',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The feature stack is reasonably consistent across products in 2026. Not every product offers every feature, and the regulatory implications differ:',
        },
        {
          type: 'list',
          items: [
            'Per-circuit CT measurement — split-core CTs on every way, sampling typically at 1 Hz to 1 kHz, exposed as live wattage, daily kWh and historical trend.',
            'Whole-house energy monitoring — a larger CT or integrated bus measurement reconciled against the smart meter.',
            'Cloud dashboard — a vendor web and mobile app showing per-circuit usage, daily and monthly summaries, and (sometimes) cost-per-circuit using a user-entered tariff.',
            'Tariff integration — direct read of the Octopus Energy API, Agile half-hourly pricing, and in some products the broader Energy Smart programme.',
            'Smart RCBOs — RCBOs that can be commanded open or closed remotely via app or third-party hub.',
            'Load shedding logic — rules engine that drops non-essential circuits (immersion, towel rail, second EV charge) when whole-house demand approaches the supply limit.',
            'Peak shaving — automated curtailment of EV and heat pump load during dynamic peak windows.',
            'Local automation — Zigbee or Matter exposure to Home Assistant, Hubitat, SmartThings or Apple Home for cloud-independent rules.',
            'API access — open REST or MQTT for integration with PV monitoring or third-party energy management.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'A useful mental model: a smart CU is a normal CU plus per-circuit telemetry, plus optional remote breaker control, plus optional rule-based automation. Each addition interacts with BS 7671 differently.',
        },
      ],
    },
    {
      id: 'connectivity',
      heading: 'Connectivity — WiFi vs Zigbee vs LAN',
      tocLabel: 'Connectivity',
      blocks: [
        {
          type: 'paragraph',
          text:
            'How a smart CU talks to the outside world is one of the most important practical decisions. The dominant options each have different implications for reliability, cybersecurity and installer responsibility.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'WiFi (most common) — the CU joins the homeowner\'s 2.4 GHz network and communicates with the vendor cloud. Zero extra hardware, simplest commissioning, but exposed to whatever else is on the SSID.',
            'Zigbee or Thread to a hub — the CU joins a local mesh and talks to a vendor hub. Better isolation from general WiFi traffic, but adds a hardware dependency.',
            'Wired LAN — Cat5e/6 to an RJ45 inside or adjacent to the CU. Best reliability and cybersecurity, but requires structured cabling that most retrofits do not have.',
            'LAN-only (no cloud) — a small subset of products that operate purely on the local network. Aimed at integrators; smallest external attack surface.',
            'Power-line communications — minority approach; reliable in newer builds but susceptible to VFD, inverter and LED-driver interference.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A WiFi consumer unit is a mains-rated device on a domestic network',
          text:
            'The same SSID is shared by smart speakers, doorbells, TVs and visitors\' phones. A poorly secured endpoint becomes a lateral-movement target. Recommend a segmented IoT SSID with a strong passphrase, and document it at handover.',
        },
        {
          type: 'paragraph',
          text:
            'For new-build and major refurbishment, specify wired LAN to the meter position where reasonable. For retrofit, WiFi is usually the only practical option — in which case the cybersecurity controls below become important.',
        },
      ],
    },
    {
      id: 'app-cloud-architecture',
      heading: 'App and Cloud Dashboard Architecture',
      tocLabel: 'App and cloud',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The cloud architecture dictates where personal usage data lives, who can see breaker state, and what happens during a vendor outage. The dominant UK pattern is a vendor-operated multi-tenant cloud: telemetry pushes to the vendor, the homeowner\'s app pulls from the same endpoint, and remote breaker commands traverse that round trip.',
        },
        {
          type: 'list',
          items: [
            'Cloud-first — telemetry, automation, app access and breaker commands all rely on the cloud. Convenient, but dashboard and automation are lost during a vendor outage.',
            'Cloud-assisted — automation and breaker commands execute locally; cloud is used only for remote access, archive and firmware updates. Best balance for reliability.',
            'Local-only — no cloud. Telemetry exposed via a local API; suited to integrators rather than end users.',
            'Hybrid — telemetry replicates to cloud for archive, but a local copy on the controller remains queryable during an outage.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'At handover, document where data lives, what happens during a cloud outage, and the vendor\'s data retention policy. If the homeowner has PV-plus-battery and wants per-circuit data for self-consumption analysis, confirm the vendor exposes a usable export or API.',
        },
      ],
    },
    {
      id: 'remote-breaker-switching',
      heading: 'Remote Breaker Switching and Smart RCBOs',
      tocLabel: 'Remote switching',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The single most consequential feature of a true smart CU — and the one with the most BS 7671 implications — is the ability to open and close breakers remotely. Smart RCBOs contain a motor or solenoid that can drive the contacts on command. That command can come from the homeowner\'s app, from an automation rule on the controller, from a third-party home automation system, or from the vendor cloud.',
        },
        {
          type: 'paragraph',
          text:
            'For the installer, the safety implication is the inverse of what most homeowners assume. The homeowner imagines turning the kitchen off from a beach in Spain. The installer must imagine someone, somewhere, turning the kitchen back on while a circuit is being worked on. Section 537 of BS 7671:2018+A4:2026 is unambiguous: isolation devices must be capable of being secured against unauthorised reclosure — and a cloud command is precisely the unauthorised reclosure that Section 537 is concerned with.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Section 537 implications for remote breakers',
          text:
            'When working on a circuit fed from a smart RCBO, the breaker must be physically locked off, not commanded open from the app. Use the product\'s lock-off slot where provided; where not, isolate upstream at the main switch with a lock-off. Live working remains prohibited under Regulation 14 of the Electricity at Work Regulations 1989 except in the narrow circumstances that regulation allows.',
        },
        {
          type: 'paragraph',
          text:
            'A second consideration is fault discrimination. Smart RCBOs have firmware that can be updated, and an update can in principle alter trip characteristics. Record firmware version at commissioning, retain it on the EIC, and treat any vendor-pushed change to trip behaviour as a fault that requires re-verification. See our [consumer unit upgrade guide](/guides/consumer-unit-upgrade) and [BS 7671 A4:2026 AFDD changes](/guides/bs-7671-a4-2026-afdd-changes) for context.',
        },
      ],
    },
    {
      id: 'section-537-isolation',
      heading: 'Section 537 Isolation — Where Smart Meets the Regs',
      tocLabel: 'Section 537',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Section 537 of BS 7671:2018+A4:2026 deals with isolation, switching and control. The text predates smart CUs by decades, but reads on them cleanly when the right questions are asked.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Means of preventing inadvertent reclosure — the device must be capable of being secured against unauthorised reclosure. For a smart RCBO this means a physical lock-off slot, a removable handle, or an upstream lock-off. A software-only "isolation mode" is not a Section 537 means.',
            'Verification of isolation — conductors must be capable of being verified as dead. Smart telemetry showing "0 W" is not a substitute for testing with a GS38-compliant voltage indicator on a known live source.',
            'Visible indication of off-state — for many smart RCBOs the handle position still provides this. Where the handle position is reliable, use it; where it is not, isolate upstream.',
            'Independence from automatic reclosure logic — any automation rule capable of reclosing the breaker must be disabled at commissioning and re-enabled only after work is complete.',
            'Documentation — the EIC should record that Section 537 has been considered for the smart switching elements specifically.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Practical rule for working on a smart CU',
          text:
            'Isolate at the main switch and lock off physically. The granular per-circuit smart isolation is a homeowner convenience feature, not an installer safety feature.',
        },
      ],
    },
    {
      id: 'load-shedding-peak-shaving',
      heading: 'Load Shedding and Peak Shaving',
      tocLabel: 'Load shedding',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The strongest commercial case for a smart CU in 2026 is the household with an EV, a heat pump, an electric shower and a tendency to run them at once. A 60-80 A single-phase supply will trip the main fuse if these loads coincide, even though no one circuit is overloaded. The traditional answer is a DNO service upgrade — months of waiting, several thousand pounds, disruption. The smart CU answer is load shedding: rank the controllable loads (EV charger, heat pump, immersion, towel rail) and curtail the lowest-priority one whenever whole-house current approaches a configured threshold. With a properly tuned rule set the household never trips the cut-out, and the perceived supply size effectively rises. The actual cable, fuse and earthing arrangement are unchanged — but the practical likelihood of nuisance tripping drops dramatically.',
        },
        {
          type: 'list',
          items: [
            'EV charger curtailment — the most common rule. Charging current is reduced (or paused) when whole-house demand exceeds a threshold, and resumed when demand falls.',
            'Heat pump modulation — where the heat pump is OpenADR or Matter-controllable, the CU can request a reduced setpoint or compressor duty during peak windows.',
            'Immersion delay — delayed until off-peak unless cylinder temperature falls below a configured minimum.',
            'Hierarchical rules — cooking and lighting are never shed; heating is shed before EV; EV is shed before storage heaters. The hierarchy goes in the handover pack.',
            'Peak shaving on dynamic tariffs — the same logic driven by tariff price, with optional integration into [smart EV charging](/guides/smart-ev-charging) workflows.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'See our [V2H bidirectional EV charging guide](/guides/v2h-bidirectional-ev-charging) — a smart CU plus V2H plus a dynamic Octopus tariff genuinely changes the economics of a 60-80 A supply.',
        },
      ],
    },
    {
      id: 'octopus-tariff-integration',
      heading: 'Octopus Smart Tariff Integration',
      tocLabel: 'Octopus integration',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Octopus Energy publishes fixed and dynamic tariffs in a structured API, and most credible smart CU vendors integrate directly. Typically a one-time OAuth handshake from the vendor app makes half-hourly Agile prices, Cosy heat-pump windows, and Intelligent Octopus EV slots available to the rules engine.',
        },
        {
          type: 'list',
          items: [
            'Octopus Agile — half-hourly variable pricing. The CU defers EV charging, immersion and dishwasher slots to the cheapest periods.',
            'Octopus Go and Intelligent Octopus — fixed cheap overnight window or smart EV-driven windows. The CU acts as a fallback when the EV charger\'s own scheduling is not granular enough.',
            'Cosy Octopus — heat pump-friendly multi-window tariff. The CU can pre-warm a buffer tank or fabric mass during cheap windows.',
            'Octopus Saving Sessions — discrete flexibility events. The CU opts in and sheds non-essential load for the session window.',
            'Octopus Outgoing — for export-side tariffs paired with PV or V2H, the CU\'s telemetry helps validate export and reconcile against the supplier statement.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Customer benefit, properly framed',
          text:
            'A smart CU on a dynamic Octopus tariff in a typical EV-and-heat-pump household can save several hundred pounds a year against the equivalent flat-rate tariff. Frame the value on the customer\'s actual usage data after a 30-day baseline, not on vendor marketing figures.',
        },
      ],
    },
    {
      id: 'cybersecurity',
      heading: 'Cybersecurity — A Mains-Rated Device on Home WiFi',
      tocLabel: 'Cybersecurity',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A smart CU is a mains-rated, safety-critical device permanently connected to a domestic WiFi network. A compromised smart bulb is a nuisance. A compromised smart CU can in principle open or close breakers — including those feeding life-safety equipment such as carbon monoxide alarms, fridges, medical equipment or heating in cold weather. The Product Security and Telecommunications Infrastructure Act 2022 (PSTI) sets minimum cybersecurity requirements for consumer connectable products sold in the UK. Look for vendors that publish a PSTI statement of compliance, a security disclosure address, and a stated minimum security update support period. Where the vendor will not commit in writing, treat that as a significant risk.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Network segmentation — recommend the CU sits on a dedicated IoT SSID, not the main household SSID. Most consumer routers support this.',
            'Strong passphrase — unique to the IoT SSID and not shared with the homeowner\'s general guest password.',
            'Vendor account hygiene — unique strong password and two-factor authentication where the vendor supports it.',
            'Firmware update policy — automatic updates enabled, but the homeowner should be told that any firmware-pushed change to RCBO trip behaviour requires re-verification.',
            'Disable unused features — open APIs, MQTT brokers and remote administration ports should be off unless actively used.',
            'Handover documentation — record the cybersecurity choices made at commissioning so the next installer or owner can see what was set up and why.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Where remote switching meets cybersecurity',
          text:
            'A product that allows remote closing of breakers from the cloud must be treated as higher-risk than one that only allows remote opening. If the product cannot disable remote-close while retaining remote-open, document the limitation explicitly and discuss it with the homeowner before installation.',
        },
      ],
    },
    {
      id: 'bs-en-61439-tta',
      heading: 'BS EN 61439 Type-Tested Assembly Status',
      tocLabel: 'BS EN 61439 TTA',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS EN 61439 governs low-voltage switchgear and controlgear assemblies, with Part 3 covering distribution boards intended for use by ordinary persons — domestic consumer units. A CU sold in the UK is type-tested as an assembly: the manufacturer has demonstrated the specific combination of enclosure, busbar, main switch, RCDs and RCBOs meets the standard for thermal performance, fault-current withstand and EMC. Certification applies to the assembly as supplied. For a smart CU, the type-tested assembly is the whole thing — enclosure, controller, CTs, smart RCBOs together. That is fine when the installer uses it as the manufacturer intends. Where TTA status comes under pressure:',
        },
        {
          type: 'list',
          items: [
            'Aftermarket smart conversion — adding third-party CT clamps and a controller to an existing non-smart CU. Even if mechanically benign, the thermal and EMC test envelope no longer covers the new state.',
            'Mixed-vendor smart RCBOs — installing a smart RCBO from one manufacturer into another manufacturer\'s smart CU. Physical compatibility may exist but breaks the TTA envelope.',
            'Field modifications — drilling for additional gland plates, swapping the supplied busbar, or routing communication cables in a way the manufacturer did not foresee.',
            'Mounting external comms gateways — alongside the CU may be acceptable; inside it may not be, depending on the manufacturer\'s instructions.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Rule of thumb on TTA',
          text:
            'Buy a smart CU as a complete assembly from a single vendor and install it per the manufacturer\'s instructions. Do not field-convert a non-smart CU with aftermarket parts unless the conversion is explicitly supported by both vendors in writing. See our [consumer unit types guide](/guides/consumer-unit-types) for the broader CU category landscape.',
        },
      ],
    },
    {
      id: 'afdd-integration',
      heading: 'AFDD Integration Under A4:2026',
      tocLabel: 'AFDD integration',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 expanded the situations in which AFDDs are required. Smart CUs interact with this in two useful ways. First, several vendors now ship smart RCBOs that integrate AFDD into the same physical device, so one busbar slot provides overcurrent, residual-current and arc-fault protection plus telemetry — a tidy compliance outcome where A4:2026 mandates AFDD. Second, telemetry can assist diagnosis of nuisance trips. On a conventional CU the only forensic information is "it tripped"; on a smart CU the controller may have a high-resolution snapshot of current and voltage either side of the event, and may distinguish a true arc fault from a switching transient or faulty appliance.',
        },
        {
          type: 'list',
          items: [
            'AFDD-integrated smart RCBOs — preferred where A4:2026 mandates AFDD and the smart CU vendor supports them. Tidy, type-tested, one slot per circuit.',
            'Separate AFDDs in a smart CU — acceptable, but telemetry will not see the AFDD\'s trip state in the same fine-grained way.',
            'Trip log retention — useful evidence for future EICRs. Export and retain as part of the installation records.',
            'Firmware change management — any update altering detection thresholds should be treated as a fault requiring re-verification.',
          ],
        },
      ],
    },
    {
      id: 'uk-brands',
      heading: 'Brands Available in the UK Market',
      tocLabel: 'UK brands',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The category in 2026 spans three rough tiers. We name them by category, not specific product, because the lineup is still moving:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mainstream CU manufacturers with a smart range — the established UK distribution board names have introduced smart variants of their existing lines. These are usually easiest to specify because dumb and smart variants share enclosure geometry.',
            'Energy-monitoring specialists who have moved into protection — companies that started in retrofit CT-clamp energy monitoring have moved into smart RCBOs and full smart CUs. Usually the slickest apps and strongest tariff integration.',
            'Home automation crossover products — products designed primarily for integrators and Home Assistant users. Often LAN-first, open API, strong for households that want full local control with no vendor cloud dependency.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For a domestic customer wanting a smart CU because of an EV-plus-heat-pump supply constraint, a mainstream manufacturer with a smart range is the lowest-risk specification — TTA status is unambiguous, wholesalers supply spares, and any electrician can work on it later.',
        },
      ],
    },
    {
      id: 'notifiable-work-part-p',
      heading: 'Notifiable Work — Part P Still Applies',
      tocLabel: 'Part P',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Replacing a consumer unit is notifiable work in a dwelling in England and Wales under Building Regulations Part P, whether traditional or smart. Notification is via registered competent person scheme (NICEIC, NAPIT, ELECSA, Stroma) or a Building Control notice.',
        },
        {
          type: 'list',
          items: [
            'CU replacement — notifiable. Use the registered competent person route in the normal way.',
            'Adding smart RCBOs to an existing CU — not in itself a CU replacement, but if it materially alters the protective arrangements, treat as a major modification and notify.',
            'Aftermarket retrofit of CT clamps and a controller alongside the CU — generally not Part P notifiable in itself, but any mains-connection work follows normal Part P logic.',
            'Smart EV charger circuits — see [smart EV charging guide](/guides/smart-ev-charging) for the EV-side picture.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Notification covers the work, not the smartness',
          text:
            'The Building Control notification is about the installation of the consumer unit, including its conformity to BS 7671:2018+A4:2026. The smart features are not separately notifiable under Part P, but they should be documented on the EIC under Section 537 isolation, protective devices and AFDD where applicable.',
        },
      ],
    },
    {
      id: 'future-proofing',
      heading: 'Future-Proofing — ISO 15118-20 and FlexiOrb',
      tocLabel: 'Future-proofing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Two trends are likely to drive smart CU specification over the next two to three years. ISO 15118-20 is the next-generation vehicle-to-grid communication standard, extending ISO 15118 to bidirectional energy flow and richer flexibility messaging between EV, charger and grid. FlexiOrb is the National Grid ESO\'s evolving flexibility-signal scheme that lets half-hourly demand-side flexibility signals reach connected devices in the home.',
        },
        {
          type: 'list',
          items: [
            'ISO 15118-20 — vehicle-to-home, vehicle-to-load and vehicle-to-grid scenarios depend on tight coordination between EV charger, CU and household demand. A smart CU is the natural place for that logic.',
            'FlexiOrb integration — smart CUs are well placed to receive and act on flexibility signals from the ESO, shifting heat pump and EV load in response to system stress.',
            'Half-hourly settlement — as half-hourly settlement matures, the value of per-circuit telemetry (to the household and to a flexibility aggregator) increases.',
            'Open standards — Matter and CHIP support is becoming a meaningful differentiator, particularly for households that want vendor-neutral home automation.',
            'PV and battery coordination — see our [smart home wiring cost guide](/guides/smart-home-wiring-cost) for the broader picture of how a smart CU fits into a PV-plus-battery-plus-EV household.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For 2026 installations, specify a smart CU from a vendor that has published a roadmap for ISO 15118-20 and Matter, supports the Octopus API, and commits in writing to a multi-year firmware support period.',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Where Elec-Mate fits in',
          text:
            'Elec-Mate certificate tools (EIC, EICR, Minor Works) include dedicated sections for smart CU documentation — firmware version, Section 537 considerations, AFDD trip log references, cybersecurity handover record — so the smart-side detail does not get lost in the handover pack. Included on the Electrician subscription tier.',
        },
      ],
    },
  ],
  howToHeading: 'How to Install a Smart Consumer Unit Compliantly',
  howToDescription:
    'The compliant path from "the customer asked for a smart CU" to "smart CU installed, notified under Part P, documented on EIC, and handed over with a cybersecurity record" — anchored to BS 7671:2018+A4:2026, BS EN 61439, and the Building Regulations Part P.',
  howToSteps: [
    {
      name: 'Specify the smart CU as a complete assembly from one vendor',
      text:
        'Choose a smart CU where the enclosure, busbar, main switch, RCBOs (or smart RCBOs) and controller are all sold and certified together as a BS EN 61439-3 type-tested assembly. Avoid field-converting a non-smart CU with aftermarket parts. Confirm the vendor publishes a PSTI security disclosure address and a stated minimum firmware support period.',
    },
    {
      name: 'Plan the network and cybersecurity arrangements before fitting',
      text:
        'Decide WiFi, Zigbee/Thread to a hub, or wired LAN. Where WiFi is the only option, ask the homeowner to set up a segmented IoT SSID with a unique passphrase before the installation date. Where wired LAN is feasible, run Cat5e or Cat6 to the CU position as part of first fix.',
    },
    {
      name: 'Notify under Part P and isolate per Section 537',
      text:
        'Notify the work via registered competent person scheme or Building Control. On the day, isolate at the meter tails or service head with a physical lock-off — do not rely on smart isolation features. Prove dead with a GS38-compliant tester against a known live source before and after.',
    },
    {
      name: 'Install the CU and configure AFDD-integrated smart RCBOs where mandated',
      text:
        'Mount and wire the smart CU per the manufacturer\'s instructions. Where BS 7671:2018+A4:2026 mandates AFDD and the smart CU supports AFDD-integrated smart RCBOs, use them. Record firmware version of each smart RCBO and of the controller on commissioning.',
    },
    {
      name: 'Commission cloud, tariff and load-shedding rules with the homeowner',
      text:
        'Walk the homeowner through cloud account setup, two-factor authentication where supported, Octopus tariff linkage, and the load-shedding rule hierarchy. Disable any remote-close breaker feature that is not actively required. Confirm the cybersecurity handover record matches the actual settings.',
    },
    {
      name: 'Issue the EIC and the smart handover pack',
      text:
        'Complete the EIC with Section 537 considerations, AFDD-integrated smart RCBO details, firmware versions, and a reference to the cybersecurity handover record. Hand over the EIC, manufacturer documentation, Octopus linkage details and the load-shedding rule summary as one pack.',
    },
  ],
  faqs: [
    {
      question: 'Is replacing my consumer unit with a smart one still notifiable under Part P?',
      answer:
        'Yes. Building Regulations Part P treats consumer unit replacement as notifiable work in a dwelling in England and Wales regardless of whether the new unit is traditional or smart. Notification goes through the installer\'s registered competent person scheme (NICEIC, NAPIT, ELECSA, Stroma) or via a Building Control notice. The smart functionality does not change the Part P position — the act of replacing the CU is what triggers it.',
    },
    {
      question: 'Does a smart consumer unit affect BS EN 61439 type-tested assembly status?',
      answer:
        'It depends on how it is installed. A complete smart CU sold by a single manufacturer as an assembly retains its BS EN 61439-3 type-tested status when installed per the manufacturer\'s instructions. Field-converting a non-smart CU by adding aftermarket CT clamps and a controller breaks the type-tested envelope, even if the modifications are mechanically benign. Mixed-vendor smart RCBOs in another manufacturer\'s CU also break TTA status. The safe specification is a complete single-vendor assembly.',
    },
    {
      question: 'Can I isolate a circuit using the smart app instead of locking off the breaker?',
      answer:
        'No. Section 537 of BS 7671:2018+A4:2026 requires that isolation devices be capable of being secured against unauthorised reclosure. A cloud command from an app does not meet this requirement — it is precisely the kind of unauthorised reclosure Section 537 is concerned with. When working on a circuit fed from a smart RCBO, lock off physically (using the product\'s lock-off slot where provided, or isolate upstream at the main switch where not) and prove dead with a GS38-compliant tester.',
    },
    {
      question: 'How does a smart CU interact with the new AFDD requirements in A4:2026?',
      answer:
        'BS 7671:2018+A4:2026 expanded the situations where AFDDs are required, and smart CUs interact with this helpfully. Several vendors now offer smart RCBOs with integrated AFDD in a single slot — overcurrent, residual-current and arc-fault protection plus telemetry from one device. The telemetry can also assist forensic analysis of nuisance trips. AFDD detection should be re-verified after any firmware update that may alter detection thresholds.',
    },
    {
      question: 'What is the cybersecurity risk of having a smart consumer unit on my home WiFi?',
      answer:
        'A smart CU is a mains-rated, safety-critical device sharing a network with everything else in the household. A compromised CU could in principle open or close breakers, including those feeding life-safety equipment. Mitigations: place the CU on a segmented IoT SSID with a unique passphrase, enable two-factor authentication on the vendor cloud account, accept automatic firmware updates, disable unused remote-administration features, and choose vendors that publish a PSTI compliance statement and a written firmware support period.',
    },
    {
      question: 'Will a smart CU let me avoid a DNO service upgrade for my EV and heat pump?',
      answer:
        'Often, yes. A typical 60-80 A single-phase supply will trip the main fuse when an EV charger, heat pump and electric shower coincide. A smart CU with load-shedding rules ranks the controllable loads and curtails the lowest-priority one whenever whole-house current approaches the threshold, so the cut-out never trips. This is not the same as a DNO upgrade — the actual cable and fuse are unchanged — but for many households it removes the practical need for one, at a fraction of the cost and lead time.',
    },
    {
      question: 'Does the cloud dashboard work during a vendor outage or internet outage?',
      answer:
        'It depends on the architecture. Cloud-first products rely on the vendor cloud for telemetry, automation and breaker control; during an outage you lose all of those. Cloud-assisted products run automation locally and use cloud only for remote app access and firmware; during an outage, automation and protection still work but you cannot see the dashboard remotely. Local-only products have no cloud dependency at all. Ask the vendor before specification and document the answer in the handover pack.',
    },
    {
      question: 'Can a future firmware update change how my RCBOs trip?',
      answer:
        'In principle, yes — smart RCBOs are firmware-driven and that firmware can be updated. Whether a real risk exists depends on the vendor. Record firmware version at commissioning, retain it on the EIC, and on any subsequent EICR record the new firmware version observed. Treat any vendor-pushed change that materially alters trip behaviour (operating current, trip time, AFDD detection threshold) as a fault that requires re-verification per BS 7671 Part 6.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade Guide',
      description: 'When to upgrade a consumer unit, the BS 7671 considerations, and how smart and traditional units compare on cost, compliance and future-proofing.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-types',
      title: 'Consumer Unit Types',
      description: 'The full UK CU category landscape — split-load, dual RCD, all-RCBO, smart — and how to choose between them for a given installation.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-afdd-changes',
      title: 'BS 7671 A4:2026 AFDD Changes',
      description: 'What A4:2026 changed about AFDD requirements and how smart RCBOs with integrated AFDD can streamline compliance.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/smart-home-wiring-cost',
      title: 'Smart Home Wiring Cost',
      description: 'How smart consumer units fit into a wider smart-home wiring strategy, including PV, battery, EV and heat pump coordination.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/v2h-bidirectional-ev-charging',
      title: 'V2H Bidirectional EV Charging',
      description: 'How a smart CU plus bidirectional EV charging plus a dynamic tariff changes the economics of an EV-plus-heat-pump household.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/smart-ev-charging',
      title: 'Smart EV Charging',
      description: 'Smart EV charging integration with smart CUs, load shedding and dynamic Octopus tariffs for the EV-owning household.',
      icon: 'Zap',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Document your smart CU installations properly',
  ctaSubheading:
    'Elec-Mate certificate tools (EIC, EICR, Minor Works) include dedicated sections for smart consumer unit documentation — firmware versions, Section 537 considerations, AFDD trip log references and cybersecurity handover records — so the smart-side detail makes it into the handover pack. 7-day free trial, cancel anytime.',
};
