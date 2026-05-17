import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// IEEE 802.3bt (PoE Type 3 & 4), BS EN 60598 (Luminaires), BS EN 61347
// (Lamp Controlgear) and the IET On-Site Guide for low-voltage installations.

const published = '2026-05-17';
const modified = '2026-05-17';

export const poeLightingVsTraditionalLedConfig: GeneratedGuideConfig = {
  pagePath: '/guides/poe-lighting-vs-traditional-led-wiring',
  title:
    'PoE Lighting vs Traditional Mains LED Wiring — Comparison Guide for UK Electricians | Elec-Mate',
  description:
    'Head-to-head comparison of Power-over-Ethernet (PoE) lighting and traditional mains LED for UK electricians — capex, installation labour, BS 7671 vs Section 715 ELV implications, inspection and testing differences, BMS integration, future-proofing and the use cases where each technology wins.',
  datePublished: published,
  dateModified: modified,
  readingTime: 18,
  badge: 'Commercial Lighting',
  badgeIcon: 'Lightbulb',
  breadcrumbLabel: 'PoE Lighting vs Traditional LED',
  heroPrefix: 'PoE Lighting vs',
  heroHighlight: 'Traditional Mains LED',
  heroSuffix: '— a UK electrician\'s comparison guide',
  heroSubtitle:
    'Power-over-Ethernet lighting and traditional mains LED both deliver low-energy commercial illumination, but they sit in completely different regulatory regimes, demand different skills, and produce very different bills of materials. This guide walks through the technical, regulatory, commercial and operational trade-offs so you can advise a UK client which approach actually fits their building — and quote it correctly.',
  keyTakeaways: [
    'PoE lighting runs each luminaire on a Cat 6/6A data cable carrying both power and control from a centralised IEEE 802.3bt switch. Each fitting is Extra-Low Voltage (ELV) and falls under Section 715 of BS 7671:2018+A4:2026 rather than the full LV chapters.',
    'Traditional mains LED uses 230 V supply to a constant-voltage or constant-current driver inside (or local to) each luminaire. The entire installation is governed by the full body of BS 7671:2018+A4:2026, requiring a standard Electrical Installation Certificate on completion.',
    'PoE luminaires typically run at 5-50 W per port, with PoE++ (Type 4) capped at 90 W at source and around 71 W delivered. This caps the technology at lower-wattage applications and excludes most high-bay industrial and outdoor floodlighting.',
    'On capex, a PoE installation is usually 20-40% more expensive than equivalent mains LED at the point of purchase, but the gap narrows once daylight harvesting, occupancy, BMS integration and small-power outlets are included in scope.',
    'PoE drivers run at around 85% efficiency due to the conversion losses on the data cable; modern mains LED drivers achieve approximately 92%. Over a building lifetime the energy difference is real but usually offset by superior control granularity on the PoE side.',
    'Handover documentation differs: a PoE system needs a BS EN 50173 structured cabling channel certification (typically Cat 6A permanent link test) in addition to the BS 7671 EIC for the upstream supply to the PoE switch cabinet.',
  ],
  sections: [
    {
      id: 'two-technologies',
      heading: 'Two Technologies, Two Regulatory Regimes',
      tocLabel: 'Two technologies',
      blocks: [
        {
          type: 'paragraph',
          text:
            'PoE lighting and traditional mains LED look similar on a finished ceiling. The differences are in the wall behind the ceiling and in the certification documents at handover.',
        },
        {
          type: 'paragraph',
          text:
            'A traditional mains LED installation delivers 230 V AC to every luminaire through standard fixed wiring. Each fitting contains a driver that converts the mains supply to the constant current or constant voltage required by the LED engine. The entire system is a Low Voltage (LV) installation under BS 7671:2018+A4:2026. Circuits sit on dedicated MCBs or RCBOs; testing follows the standard initial verification sequence.',
        },
        {
          type: 'paragraph',
          text:
            'A PoE lighting installation does something fundamentally different. A centralised PoE switch, fed from a mains supply in a comms cabinet, delivers DC power and Ethernet data to each luminaire through a single Cat 6 or Cat 6A patch lead. Each luminaire is an IP-addressable endpoint with its own MAC address, drawing typically between 5 W and 90 W from the switch port. Each circuit is Extra-Low Voltage (ELV), bringing it under Section 715 of BS 7671:2018+A4:2026 rather than the LV chapters.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The headline difference',
          text:
            'Mains LED is electrical work end-to-end. PoE lighting is a structured cabling system that happens to power lights, with electrical work only up to the PoE switch cabinet.',
        },
      ],
    },
    {
      id: 'cost-per-fitting',
      heading: 'Cost per Fitting — Capex and Installation Labour',
      tocLabel: 'Cost per fitting',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Headline capex is the first question every client asks. The honest answer is that PoE is more expensive at the point of purchase, but the comparison is rarely apples-to-apples. The mains LED bill of materials does not always include the controls, daylight sensors, occupancy detection and BMS interface that come built into a PoE specification — and once those are added, the gap narrows.',
        },
        {
          type: 'list',
          items: [
            'Luminaire hardware — a 40 W PoE office panel typically retails for £160-£240 against £80-£140 for an equivalent mains LED panel. PoE carries a premium for the integrated network interface, occupancy sensor and addressable controller.',
            'Cabling — Cat 6A solid core cable is approximately £1.20-£1.80 per metre against £0.90-£1.30 per metre for 1.5 mm² T&E.',
            'Distribution — PoE installations require an IEEE 802.3bt switch with budgeted PoE power, typically £40-£70 per port at 48-port density. Mains LED needs MCBs or RCBOs at around £8-£15 per circuit.',
            'Labour — terminating Cat 6A to TIA-568B is faster than wiring a luminaire box, but commissioning a PoE system (addressing every fitting, mapping to zones, testing the channel) typically adds 15-25% to the install time.',
            'Comms cabinet — PoE introduces a new room or cabinet requirement, with UPS provision, ventilation and fire-rated penetrations. Mains LED reuses the existing distribution board.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'On a typical 50-fitting open-plan office floor, capex pricing in 2026 sits at roughly £18,000-£25,000 for PoE against £12,000-£17,000 for an equivalent mains LED scheme with separate occupancy and daylight controls. The PoE premium reduces to around 5-15% once the mains scheme is brought up to the same control granularity.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Quote the whole system, not the luminaire',
          text:
            'PoE looks expensive when compared to bare mains LED. The honest comparison is PoE against mains LED plus DALI controller plus daylight sensors plus occupancy detection plus BMS interface — at which point the gap is closer than the brochure suggests.',
        },
      ],
    },
    {
      id: 'energy-efficiency',
      heading: 'Energy Efficiency — Where the Watts Actually Go',
      tocLabel: 'Energy efficiency',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Both technologies are far more efficient than fluorescent, halogen or incandescent — but PoE and mains LED do not produce the same lumens per watt at the meter once you include the power conversion chain.',
        },
        {
          type: 'paragraph',
          text:
            'A mains LED driver compliant with BS EN 61347 typically achieves 90-93% efficiency at full load, falling to around 82-88% at 20% dimming. A PoE installation introduces additional conversion losses: the switch power supply (around 92% efficient), the resistive losses in the data cable (typically 5-8 W per 90 m channel at 90 W loads), and the DC-DC step-down at the luminaire (around 95% efficient). Net efficiency at the LED engine is roughly 84-87%.',
        },
        {
          type: 'list',
          items: [
            'On raw conversion efficiency, mains LED wins by 5-8 percentage points at full load.',
            'On part-load efficiency, the gap widens slightly because PoE switches have a fixed standby draw whereas mains drivers idle near-zero when fully off.',
            'On real-world building energy use, PoE often comes out ahead because its native occupancy detection, granular dimming and daylight harvesting cut the hours of operation more aggressively than a comparable mains scheme.',
            'On embodied energy, PoE saves significant copper at the building scale — Cat 6A is far smaller diameter than 1.5 mm² T&E, and there is no per-fitting driver to manufacture.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For Part L compliance under the Building Regulations, both systems can deliver the required lamp efficacy and control. The PoE energy premium at the cable is offset by superior controllability — clients chasing BREEAM Excellent or net-zero operational targets usually find PoE the easier route to evidence reduced operating hours.',
        },
      ],
    },
    {
      id: 'install-time-and-skill',
      heading: 'Installation Time and Required Skills',
      tocLabel: 'Install time and skill',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Installing PoE lighting is not "harder" than mains LED — it is different. Mains LED installation uses the toolkit any qualified UK electrician already holds: 18th Edition (BS 7671:2018+A4:2026), 2391-52 inspection and testing, plus the ECS gold card competence required by most main contractors.',
        },
        {
          type: 'paragraph',
          text:
            'PoE lighting installation pulls in skills traditionally associated with data and structured cabling: TIA-568B termination, BS EN 50173 channel certification, IP addressing fundamentals, and switch configuration. A team that has never terminated Cat 6A to a certified standard will lose money on the first project. Equally, a data installer who has never sized cable for a Section 715 ELV circuit will get the supply side wrong.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mains LED — single trade, single competency set, single certification regime.',
            'PoE lighting — typically a joint scope between electrical (mains supply to comms cabinet) and data (structured cabling, switch commissioning, channel certification).',
            'Hybrid teams — increasingly common: electricians upskilled in data cabling, or data installers competent to install up to ELV under Section 715.',
            'Commissioning — PoE adds a software commissioning phase (zone mapping, occupancy logic, daylight calibration, BMS handshake) that has no equivalent in mains LED.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The skills gap is real',
          text:
            'See our [structured cabling for electricians guide](/guides/structured-cabling-bs-en-50173-electricians) for the BS EN 50173 channel certification testing that a PoE handover requires. It is a different test set from a BS 7671 EIC.',
        },
      ],
    },
    {
      id: 'bs-7671-implications',
      heading: 'BS 7671 Implications — Section 715 ELV vs Full LV',
      tocLabel: 'BS 7671 implications',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The single biggest regulatory difference between PoE and mains LED is the chapter of BS 7671:2018+A4:2026 that governs the installation. This affects how you design the circuits, how you protect them, how you test them, and what document you hand to the client at the end.',
        },
        {
          type: 'paragraph',
          text:
            'Traditional mains LED falls under the full body of BS 7671:2018+A4:2026 — Parts 4 (protection for safety), 5 (selection and erection), 6 (inspection and testing), and the various special location sections where they apply. Circuits sit on MCBs or RCBOs, are subject to RCD protection requirements (including the A4:2026 expansion of RCD scope for luminaires in certain locations), are tested for continuity, insulation resistance, polarity, earth fault loop impedance and RCD operation, and are recorded on a standard Electrical Installation Certificate.',
        },
        {
          type: 'paragraph',
          text:
            'PoE lighting from the switch outwards is Extra-Low Voltage (ELV) and falls under Section 715 of BS 7671:2018+A4:2026 (Extra-Low Voltage Lighting Installations). Section 715 sets out the requirements for SELV or PELV systems used for lighting, including segregation from LV circuits, protection against thermal effects, and the safety isolation requirements for the source. The PoE switch must be a Class II or equivalent isolated source with SELV output, and the LV supply to the switch must be a properly designed and protected LV circuit in its own right.',
        },
        {
          type: 'list',
          items: [
            'Mains LED — Parts 1-7 of BS 7671:2018+A4:2026 apply in full. EIC issued on completion.',
            'PoE supply circuit — LV supply from the distribution board to the PoE switch cabinet is a normal LV circuit, designed and tested per the full Wiring Regulations.',
            'PoE distribution — from the switch ports outward, Section 715 ELV applies. No earthing required at the luminaire, no RCD protection required on the data cables, no disconnection time calculations beyond the source.',
            'Documentation — the LV supply circuit gets an EIC or Minor Works Certificate; the ELV distribution gets a BS EN 50173 channel certification report.',
            'Emergency lighting — central battery or self-contained emergency luminaires installed alongside PoE remain mains LV and follow BS 5266 in full.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Section 715 is not a free pass',
          text:
            'ELV does not mean "no rules". Section 715 still requires correct segregation, mechanical protection, fire performance and source rating. See our [Section 715 ELV lighting guide](/guides/section-715-elv-lighting-a4-2026) for the full A4:2026 requirements.',
        },
      ],
    },
    {
      id: 'inspection-and-testing',
      heading: 'Inspection and Testing — Different Documents at Handover',
      tocLabel: 'Inspection and testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Inspection and testing is where the difference between PoE and mains LED becomes most visible at the handover stage. The client receives different documents from different competent persons, with different test instruments, recorded on different forms.',
        },
        {
          type: 'paragraph',
          text:
            'A traditional mains LED installation is tested per BS 7671:2018+A4:2026 Part 6 using a multifunction tester (MFT). The competent person records continuity of protective conductors (R1 + R2), insulation resistance, polarity, earth fault loop impedance (Zs), RCD operating time and current, and prospective fault current. Results are recorded on the Schedule of Test Results that accompanies the Electrical Installation Certificate, and a periodic EICR will follow at the recommended interval (typically 5 years for commercial premises).',
        },
        {
          type: 'paragraph',
          text:
            'A PoE lighting installation is tested per BS EN 50173 using a structured cabling channel tester (commonly a Fluke DSX or equivalent). The competent person records insertion loss, near-end crosstalk (NEXT), far-end crosstalk (FEXT), return loss, propagation delay and delay skew across each channel. Results are recorded in a per-channel certification report. There is no periodic equivalent to an EICR — the system is monitored continuously by the switch itself, which raises alarms on link failure or under-voltage at the port.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mains LED — MFT test, EIC issued, periodic EICR every 5 years.',
            'PoE lighting — Cat 6A channel certification, per-channel report, no periodic re-test required (continuous self-monitoring).',
            'Hybrid — the LV supply circuit to the PoE switch still needs MFT testing and an EIC entry. The ELV distribution is on the channel certification report.',
            'Emergency lighting — central battery or self-contained emergency luminaires retain their own BS 5266 testing schedule regardless of the lighting technology in use.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For an FM provider, the absence of a periodic EICR-equivalent on PoE distribution is genuinely attractive — provided the structured cabling has been installed and tested correctly in the first place. A poorly certified channel that passes initial commissioning but degrades over time will still cause field failures, and there is no statutory periodic check to catch it.',
        },
      ],
    },
    {
      id: 'flexibility-and-control',
      heading: 'Flexibility and BMS Integration',
      tocLabel: 'Flexibility & BMS',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The strongest commercial argument for PoE is software-defined zoning. In a mains LED installation, zoning is defined by the cable runs — changing which switch controls which row of lights usually requires re-running cables or re-wiring a DALI controller. In a PoE installation, every luminaire is an IP-addressable endpoint, and zoning is a software configuration.',
        },
        {
          type: 'list',
          items: [
            'Daylight harvesting — every PoE luminaire can be its own daylight zone, ramping individually against a built-in lux sensor. Mains LED achieves this with DALI but with coarser granularity.',
            'Occupancy — PoE luminaires typically ship with integrated PIR sensors that report to the network. Mains LED can do this with addressable sensors at additional cost.',
            'Scene control — re-purposing a meeting room or splitting an open-plan zone is a software change on PoE; on mains LED it is usually a DALI recommissioning.',
            'Tunable white — PoE supports per-fitting circadian rhythm tuning without additional driver hardware.',
            'BMS integration — PoE integrates natively with IP-based BMS at fitting-level granularity. Mains LED with DALI integrates through a BACnet or Modbus gateway at zone level only.',
            'API access — most PoE platforms expose REST APIs that allow integration with booking systems, calendar feeds and other building services.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'PoE shines in agile workplaces',
          text:
            'If the building is going to be re-zoned regularly — typical of co-working, modern offices and education — the flexibility savings on PoE compound year on year. See our [commercial lighting guide](/guides/commercial-lighting-guide) for the wider scheme design context, and our [building management systems guide](/guides/building-management-systems-electrical) for the BMS integration picture.',
        },
      ],
    },
    {
      id: 'future-proofing',
      heading: 'Future-Proofing and Resilience',
      tocLabel: 'Future-proofing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'One of the strongest long-term arguments for PoE is that the data cable to every fitting is, by definition, a data cable. That same cable can carry sensors, beacons, asset trackers and IoT devices that have not even been specified yet at the time of installation. A ceiling full of PoE luminaires is also a ceiling full of network drops, and that has commercial value to the client over the building lifetime.',
        },
        {
          type: 'list',
          items: [
            'Sensors — adding a new temperature, CO2 or humidity sensor is a PoE port and a configuration change.',
            'Indoor positioning — bluetooth and UWB beacons can be powered and networked through the same Cat 6A as the lighting.',
            'Future luminaire upgrades — a fitting swap on PoE is a port-level operation; on mains LED it may require driver re-specification.',
            'Cabling lifespan — Cat 6A has a typical economic lifespan of 20-25 years, comparable to fixed mains wiring.',
            'Resilience — a UPS at the comms cabinet covers all connected PoE luminaires automatically. Sized for typical office loads, 30-60 minutes of full lighting is achievable from a single UPS.',
            'On mains LED, essential lighting circuits must be designated, separately wired and either generator-backed or central-battery-backed — cost scales with the number of fittings.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'UPS is not emergency lighting',
          text:
            'A PoE UPS provides operational continuity, not life-safety lighting. BS 5266-compliant emergency luminaires (mains or self-contained, fed from a statutory emergency supply) are still required separately. See our [UPS installation guide](/guides/ups-installation-guide) for the upstream supply considerations.',
        },
      ],
    },
    {
      id: 'where-poe-wins',
      heading: 'Where PoE Wins — The Right Applications',
      tocLabel: 'Where PoE wins',
      blocks: [
        {
          type: 'paragraph',
          text:
            'PoE lighting is not a universal replacement for mains LED. It wins decisively in some applications and loses awkwardly in others, and a good specification depends on matching the technology to the building.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Open-plan office — high luminaire count, low per-fitting wattage (typically 20-40 W), strong demand for granular control and BMS integration, frequent zone changes. PoE wins on flexibility and integration.',
            'Retail — variable scene requirements through the trading day, frequent re-merchandising, integration with footfall counters and asset tracking. PoE wins on software-defined scenes and IoT-readiness.',
            'Education — frequent timetable changes, classrooms re-purposed between subjects, strong demand for daylight harvesting and circadian rhythm tuning for student wellbeing. PoE wins on flexibility and tunable white.',
            'Hotels — guest room scene control, integration with key card systems and room booking, demand for tunable white. PoE wins on integration and per-room flexibility.',
            'Co-working — constant re-zoning of floor plates as tenants come and go, demand for individual user app control. PoE wins on dynamic zoning.',
            'Smart buildings — buildings being specified to BREEAM Excellent or net-zero operational targets where the value of per-fitting sensor data and post-occupancy evaluation justifies the capex premium.',
          ],
        },
      ],
    },
    {
      id: 'where-mains-led-wins',
      heading: 'Where Mains LED Still Wins',
      tocLabel: 'Where mains LED wins',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For all the marketing momentum behind PoE, there are major application categories where traditional mains LED remains the correct choice — mostly high-wattage, harsh-environment, or single-supply applications where the PoE power budget runs out or the comms cabinet model does not fit.',
        },
        {
          type: 'list',
          items: [
            'High-bay industrial — warehouses and manufacturing halls with 100-400 W fittings. PoE power budgets cannot reach these levels even at Type 4.',
            'Outdoor — car parks, building perimeters, sports floodlighting. PoE distance limits (90-100 m from switch to fitting) and ingress protection requirements rule it out.',
            'Heritage and listed buildings — where minimising new cabling is the priority.',
            'Existing premises with no comms cabinet space — adding a PoE cabinet to an old building can be more disruptive than re-using the existing distribution board.',
            'Domestic — where the capex premium is hard to justify and the flexibility benefits are not commercially valuable.',
            'Specialised hazardous environments — Zone 1/Zone 2 areas where the luminaires must be Ex-rated and where PoE platforms do not yet have a meaningful product range.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not over-specify',
          text:
            'PoE makes sense where granular control and BMS integration are commercially valuable. Specifying it for a 200-fitting warehouse because "it is the future" wastes the client\'s money. Match the technology to the application.',
        },
      ],
    },
    {
      id: 'certification-on-handover',
      heading: 'Certification on Handover — What the Client Gets',
      tocLabel: 'Certification on handover',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The certification deliverable at the end of the job is one of the cleanest ways to explain the difference between the two technologies to a client. The paperwork is different, the competent persons are different, and the periodic obligations are different.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mains LED — Electrical Installation Certificate (EIC) per BS 7671:2018+A4:2026, with Schedule of Inspections, Schedule of Test Results, and operations and maintenance information. Periodic EICR every 5 years (commercial) or 10 years (domestic).',
            'PoE lighting — BS EN 50173 channel certification report per channel, plus an EIC or Minor Works Certificate for the LV supply to the PoE switch cabinet. No statutory periodic re-test on the ELV distribution.',
            'Emergency lighting — BS 5266 commissioning certificate, with monthly function tests and annual full-duration tests recorded in the log book, regardless of the underlying lighting technology.',
            'Fire alarm interface — BS 5839-1 documentation for any cause-and-effect with the lighting system, regardless of technology.',
            'Operating manuals — a PoE handover should include the controls platform user guide, IP addressing plan and switch configuration backup. A mains LED handover includes the DALI controller configuration if controls are specified.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For a smart-home or higher-end residential PoE lighting scheme, see our [smart home lighting installation guide](/guides/smart-home-lighting-installation) for the integration and handover sequence at the domestic scale, where the BMS context shifts from FM provider to homeowner-facing control apps.',
        },
      ],
    },
    {
      id: 'choosing-the-technology',
      heading: 'How to Choose for a Specific Project',
      tocLabel: 'How to choose',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The honest answer to "PoE or mains LED?" is "what is the building, what is the budget, what is the client\'s appetite for technology, and what is the lifecycle plan?" The decision tree below is the framework most UK consultants are now using on commercial fit-out projects.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Building type — office, retail, education, hotel, co-working: lean PoE. Industrial, outdoor, hazardous area, heritage: lean mains LED.',
            'Per-fitting wattage — 5-50 W comfortably on PoE; 50-90 W on PoE Type 4; above 90 W mains LED only.',
            'Control requirement — granular per-fitting scene control, daylight harvesting, occupancy: PoE wins. Bulk on/off or simple presence detection: mains LED is sufficient.',
            'BMS integration — required at fitting-level granularity: PoE. Required at zone level only: either technology works.',
            'Future re-zoning — frequent: PoE. Stable layout: either.',
            'Resilience requirement — central UPS for lighting continuity: PoE delivers this naturally. Designated essential lighting circuits: mains LED with central battery.',
            'Capex constraint — tight budget, no controls scope: mains LED. Mid-range budget with full controls scope: PoE often pencils out cheaper than full DALI mains.',
            'Skills available — pure electrical contractor with no data team: mains LED is the safer self-delivery. Hybrid electrical+data team or strong data subcontractor partnership: PoE viable.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Quote both options if the client is genuinely deciding',
          text:
            'On commercial bids where the client has not pre-decided, presenting both a mains LED with controls scheme and a PoE scheme side-by-side wins the conversation. The Elec-Mate quote builder supports both bills of materials and produces side-by-side capex and operating cost comparisons.',
        },
      ],
    },
  ],
  howToHeading: 'How to Decide Between PoE and Mains LED on a UK Project',
  howToDescription:
    'A six-step decision framework for UK electricians specifying lighting on a commercial fit-out, refurbishment or new-build — using BS 7671:2018+A4:2026, IEEE 802.3bt and BS EN 50173 as the regulatory anchors.',
  howToSteps: [
    {
      name: 'Establish the per-fitting wattage and total floor load',
      text:
        'Sum the lighting load by zone. Anything above 90 W per fitting rules out PoE entirely. Between 50-90 W puts you in PoE Type 4 territory with full four-pair power delivery. Below 50 W per fitting is comfortable PoE territory at any switch density.',
    },
    {
      name: 'Map the client\'s controls and integration requirements',
      text:
        'Ask: does the client need per-fitting daylight harvesting, occupancy, scene control or BMS integration? If yes, PoE often pencils out cheaper than mains LED plus DALI plus separate sensors. If the requirement is bulk on/off, mains LED is the simpler and cheaper choice.',
    },
    {
      name: 'Confirm the regulatory pathway',
      text:
        'For mains LED, the full body of BS 7671:2018+A4:2026 applies and the deliverable is an Electrical Installation Certificate. For PoE, Section 715 ELV applies on the distribution and the deliverable is a BS EN 50173 channel certification report plus an EIC for the LV supply to the switch cabinet.',
    },
    {
      name: 'Validate the comms cabinet and data subcontractor capability',
      text:
        'PoE requires a properly ventilated, UPS-backed comms cabinet with PoE switch capacity sized to the total fitting count plus headroom. It also requires a data subcontractor (or in-house team) capable of BS EN 50173 channel certification to TIA-568B. If either is missing, the PoE option carries delivery risk.',
    },
    {
      name: 'Price both options side-by-side if the client has not decided',
      text:
        'Build a mains LED with full controls bill of materials and a PoE bill of materials in parallel. Include cabling, containment, distribution, controls, commissioning labour, and lifecycle operating cost. Present both to the client with a clear recommendation based on the building type and use case.',
    },
    {
      name: 'Plan the commissioning and handover sequence',
      text:
        'For mains LED, plan the BS 7671 initial verification testing and EIC issue. For PoE, plan the BS EN 50173 channel certification, the IP addressing scheme, the controls platform configuration, and the BMS handshake. Allow 15-25% more programme on PoE for software commissioning.',
    },
  ],
  faqs: [
    {
      question: 'Is PoE lighting safer than mains LED?',
      answer:
        'PoE distribution is Extra-Low Voltage (typically 48-57 V DC) and sits under Section 715 of BS 7671:2018+A4:2026, which removes some of the hazards associated with 230 V LV circuits — there is no shock risk at the luminaire and no earth fault implications on the data cabling. The LV supply to the PoE switch cabinet is still a normal LV circuit and remains a shock and fire hazard like any other. PoE is not inherently safer at the building scale; it just moves the LV exposure to a smaller portion of the installation.',
    },
    {
      question: 'Can a JIB-qualified electrician install PoE lighting on their own?',
      answer:
        'Mains supply to the PoE switch cabinet, yes — that is normal LV work under BS 7671:2018+A4:2026. The Cat 6A structured cabling, channel certification and switch commissioning typically require a data installer qualified to TIA-568B and BS EN 50173. A hybrid team or a partnership with a data subcontractor is the most common delivery model.',
    },
    {
      question: 'Does a PoE lighting installation need an EICR?',
      answer:
        'The Extra-Low Voltage distribution from the PoE switch to the luminaires does not have a statutory periodic test equivalent to an EICR — the system is monitored continuously by the switch itself, which raises alarms on link failure or under-voltage at the port. The LV supply circuit feeding the PoE switch cabinet is a standard LV circuit and is subject to the normal EICR cycle (typically 5 years for commercial premises) along with the rest of the building\'s electrical installation.',
    },
    {
      question: 'What is the maximum distance from a PoE switch to a luminaire?',
      answer:
        'BS EN 50173 sets the maximum channel length at 100 metres for Cat 6A, of which up to 90 metres is permanent link and up to 10 metres is patch cords. At PoE Type 4 (90 W source) the practical limit drops slightly due to cable resistive losses, but 90 metres remains the design target. Buildings with floor plates larger than 90 metres from the comms cabinet need either multiple distributed cabinets or telecommunications enclosures (TEs) placed in the ceiling void to extend coverage.',
    },
    {
      question: 'Can PoE lighting be used in domestic properties?',
      answer:
        'Technically yes, and it is occasionally specified in higher-end smart homes where the homeowner wants per-fitting control and is already specifying structured cabling for whole-home AV. In practice the capex premium is rarely justified in domestic settings — a high-end DALI or HomeKit-compatible mains LED scheme delivers most of the same outcomes at lower cost. PoE makes most sense in domestic only when the structured cabling backbone is being installed for other reasons.',
    },
    {
      question: 'How does emergency lighting work alongside PoE?',
      answer:
        'Emergency lighting is a separate regulatory regime under BS 5266 and the Regulatory Reform (Fire Safety) Order, and must be provided regardless of whether the main lighting is PoE or mains LED. Most PoE schemes include separate self-contained emergency luminaires with their own LV mains supply and internal battery installed alongside the PoE fittings.',
    },
    {
      question: 'Does PoE lighting save energy compared to mains LED?',
      answer:
        'On raw conversion efficiency, mains LED is slightly more efficient — typically 90-93% driver efficiency against around 84-87% net efficiency for PoE after switch losses, cable losses and DC-DC conversion at the luminaire. In real-world operation, PoE often comes out ahead because its native occupancy detection, granular dimming and daylight harvesting cut the operating hours more aggressively. The energy story depends more on how the controls are configured than on the underlying technology.',
    },
    {
      question: 'Will I need to update my professional qualifications to work on PoE?',
      answer:
        'Your existing 18th Edition (BS 7671:2018+A4:2026) and 2391 qualifications remain valid for the LV side of any PoE installation. For the structured cabling and channel certification side, the recognised qualifications are BICSI Installer, BS EN 50173 awareness training, and manufacturer-specific certifications on the chosen PoE platform.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/poe-lighting-guide',
      title: 'PoE Lighting Guide',
      description: 'The full overview of Power-over-Ethernet lighting for UK electricians — standards, power classes, switch sizing and BS 7671 Section 715 implications.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/poe-plus-plus-type-4-90w-installation',
      title: 'PoE++ Type 4 (90 W) Installation',
      description: 'Working at the upper end of the IEEE 802.3bt power envelope — cable bundling, thermal management and channel certification at the full Type 4 power level.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/section-715-elv-lighting-a4-2026',
      title: 'Section 715 — ELV Lighting (A4:2026)',
      description: 'The BS 7671:2018+A4:2026 chapter that governs PoE and other ELV lighting distributions — segregation, source rating and protection against thermal effects.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/commercial-lighting-guide',
      title: 'Commercial Lighting Guide',
      description: 'The wider commercial lighting design context — Part L compliance, BREEAM, dimming, controls and the trade-offs between PoE, DALI and standalone schemes.',
      icon: 'Lightbulb',
      category: 'Guide',
    },
    {
      href: '/guides/smart-home-lighting-installation',
      title: 'Smart Home Lighting Installation',
      description: 'PoE, DALI and smart-mains options at the residential scale — handover, app integration and the practical limits of each technology in domestic settings.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/structured-cabling-bs-en-50173-electricians',
      title: 'Structured Cabling (BS EN 50173) for Electricians',
      description: 'The BS EN 50173 channel certification regime that sits behind every PoE lighting handover — test instruments, permanent link vs channel, and per-channel reporting.',
      icon: 'Cable',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Quote both options in minutes, not days',
  ctaSubheading:
    'The Elec-Mate quote builder produces side-by-side bills of materials for PoE and mains LED schemes — capex, controls and commissioning — so you can present a clear recommendation on the same site visit. 7-day free trial, cancel anytime.',
};
