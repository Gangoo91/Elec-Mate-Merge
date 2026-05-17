import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026,
// Section 712 Prosumer's installations + new DC provisions), IEC TS 60479-1
// (Effects of current on human beings — DC vs AC), and BS EN 61140
// (Protection against electric shock).

const published = '2026-05-17';
const modified = '2026-05-17';

export const lvdcMicrogridDistributionConfig: GeneratedGuideConfig = {
  pagePath: '/guides/lvdc-dc-microgrid-distribution',
  title:
    'LVDC (Low-Voltage DC) Microgrid Distribution Guide for UK Electricians | Elec-Mate',
  description:
    'A UK electrician\'s guide to Low-Voltage DC (LVDC) microgrid distribution — the 380 V DC data centre bus, the 48 V DC ELV bus for USB-PD/PoE/lighting, native DC sources, DC fault and arc-flash behaviour, DC-rated switchgear and fuses, DC earthing, Type B RCDs, AC/DC hybrid topology and the BS 7671:2018+A4:2026 / BS EN 62109 standards landscape.',
  datePublished: published,
  dateModified: modified,
  readingTime: 16,
  badge: 'DC Distribution',
  badgeIcon: 'Zap',
  breadcrumbLabel: 'LVDC Microgrid Distribution',
  heroPrefix: 'LVDC (Low-Voltage DC)',
  heroHighlight: 'Microgrid Distribution',
  heroSuffix: '— A UK Electrician\'s Guide',
  heroSubtitle:
    'Direct current is the operating language of solar PV, lithium battery storage, EV charger output stages, hyperscale data centres and almost every piece of low-voltage electronics in a UK building. This guide explains how LVDC microgrids actually distribute power, why the rules learned for AC do not transfer directly, and where BS 7671:2018+A4:2026 currently does — and does not — cover the UK electrician working on DC.',
  keyTakeaways: [
    'LVDC splits into two bands: ELV DC \u2264 120 V (BS EN 61140 / BS 7671 Part 4) and LV DC 120 V–1500 V — the same upper limit BS 7671:2018+A4:2026 recognises for LV systems.',
    'The two dominant UK LVDC distribution voltages are 380 V DC (data centres, telecom, EV charger DC link) and 48 V DC (USB-PD, PoE++, native-DC LED lighting, server racks).',
    'DC fault current has no zero crossing, so DC arcs do not self-extinguish — DC-rated switchgear, isolators and fuses are mandatory and not interchangeable with AC equivalents at the same voltage.',
    'DC arc-flash energy is consistently higher than AC at the same prospective fault level, changing PPE, working distance and isolation strategy on the RAMS.',
    'BS 7671:2018+A4:2026 treats DC via Section 712 (prosumer), Section 722 (EV charging) and the Type B RCD provisions only — there is no full DC chapter. A complete LVDC design combines BS 7671 with BS EN 62109, BS EN 61140 and IEC TS 61200-413.',
    'Type B RCDs are the only type capable of detecting smooth DC residual current and are mandatory on every EV charging point without inherent DC fault separation per Section 722 of A4:2026.',
    'Hybrid AC/DC microgrids must be designed so that the DC bus, the inverter, the AC bus and the grid tie-in each have a clearly defined earthing arrangement and isolation strategy.',
  ],
  sections: [
    {
      id: 'why-dc-is-back',
      heading: 'Why DC Is Back, and Why It Matters Now',
      tocLabel: 'Why DC is back',
      blocks: [
        {
          type: 'paragraph',
          text:
            'AC won the original "current wars" because transformers could step voltage up for transmission and back down for distribution, and rotating machinery was the dominant load. What has changed since around 2010 is the source and load mix on a typical UK building. Solar PV, lithium-ion batteries and fuel cells produce DC natively. Wind turbines rectify variable-frequency AC to a DC link before re-inverting. On the load side, LED lighting, laptops, servers, monitors, phone chargers, network switches, access points and variable-speed drives are all DC behind their PSU; EV chargers convert AC back to DC for the vehicle battery.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The conversion penalty',
          text:
            'A watt of solar PV may be converted DC\u2192AC at the inverter, AC\u2192DC inside a server PSU, then DC\u2192DC down to the chip — three stages, each 3–8% loss. LVDC distribution removes the middle two stages on loads that natively want DC.',
        },
        {
          type: 'paragraph',
          text:
            'For a UK electrician this matters because Section 712 (Prosumer), Section 722 (EV charging) and the A4:2026 DC provisions are now first-class parts of the regulations, not afterthoughts. See the [Section 712 prosumer A4:2026 guide](/guides/section-712-prosumer-a4-2026) and the [prosumer low-voltage electrical installation guide](/guides/prosumer-low-voltage-electrical-installation).',
        },
      ],
    },
    {
      id: 'voltage-bands',
      heading: 'LVDC Voltage Bands — ELV vs LV',
      tocLabel: 'Voltage bands',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Before any design decision can be made the voltage band must be settled. UK and IEC DC bands are tighter than most electricians expect because DC at the same nominal voltage as AC presents a higher physiological and arc-energy risk.',
        },
        {
          type: 'list',
          items: [
            'Extra-low voltage DC (ELV DC) — \u2264120 V ripple-free DC under BS EN 61140 and BS 7671 Part 2. The 120 V DC ceiling is the DC equivalent of 50 V AC for ELV — intentionally higher because the threshold for DC-induced ventricular fibrillation is higher (IEC TS 60479-1).',
            'SELV / PELV DC — ELV systems with the additional separation (SELV) or earthing (PELV) requirements of BS 7671 Section 414. A 48 V PoE bus is typically PELV; an isolated 24 V control bus from a SELV transformer is SELV.',
            'Low-voltage DC (LV DC) — 120 V to 1500 V DC. The band BS 7671:2018+A4:2026 treats as LV. The 1500 V DC ceiling matches IEC and BS EN 62109 limits for PV string voltages on commercial systems.',
            'High-voltage DC (HV DC) — above 1500 V DC. Outside BS 7671 scope; HVDC transmission and very large battery installations.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'DC hits harder than the same AC on first contact',
          text:
            'IEC TS 60479-1 shows DC has a higher fibrillation threshold than 50/60 Hz AC at the same body current, but it produces a sustained "let-go" failure — the body cannot reflexively release a DC conductor the way it can sometimes be thrown clear of AC. A 380 V DC string is a more dangerous touch than 230 V AC.',
        },
      ],
    },
    {
      id: '380v-dc-distribution',
      heading: '380 V DC Distribution — the Data Centre and Telecom Bus',
      tocLabel: '380 V DC bus',
      blocks: [
        {
          type: 'paragraph',
          text:
            '380 V DC is the headline LVDC distribution voltage for data centres, hyperscale colocation halls, telecom central offices and the DC link of fast EV chargers. It sits firmly inside the LV DC band. It was chosen for two reasons: it is the natural DC output of a three-phase 400 V AC rectifier (\u221A2 × 230 V ≈ 325 V DC nominal, regulated to 380 V DC), and it is high enough to keep conductor sizes economic for a 100 kW rack row while still working inside standard LV switchgear envelopes.',
        },
        {
          type: 'list',
          items: [
            'Data centre rack distribution — a 380 V DC bus feeds rack PDUs that step down to 48 V DC at the server level, removing two AC/DC conversion stages from the legacy 400 V AC → 240 V AC → server PSU chain.',
            'Telecom central offices — historically 48 V DC for active equipment; 380 V DC is increasingly used on the backbone with 48 V DC distribution to the racks.',
            'EV charger DC link — every rapid and ultra-rapid charger has a 400–800 V DC internal link between rectifier and output, with the output to the vehicle controlled by the vehicle BMS.',
            'Commercial battery storage — most lithium battery cabinets sit on a 350–450 V DC bus paralleled with a hybrid inverter for grid tie-in. See the [battery storage guide](/guides/battery-storage-guide).',
          ],
        },
        {
          type: 'paragraph',
          text:
            'A 380 V DC bus looks superficially like a three-phase AC busbar — until you try to open an AC-rated isolator under load. Without the AC zero crossing every 10 ms, the arc does not extinguish, the contacts weld, and the operator is left holding a live handle.',
        },
      ],
    },
    {
      id: '48v-dc-bus',
      heading: '48 V DC Bus — USB-PD, PoE++, ELV Lighting',
      tocLabel: '48 V DC bus',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If 380 V DC is the trunk, 48 V DC is the branch. The 48 V DC bus has been the telecom standard for a century and now serves as the native voltage for PoE++, USB Power Delivery, native-DC LED lighting and rack-level server distribution.',
        },
        {
          type: 'list',
          items: [
            'PoE++ (IEEE 802.3bt) — up to 90 W per port at 48 V DC over Cat6A, powering access points, IP cameras, video conferencing kit, ELV lighting and small heaters without a final-circuit socket.',
            'USB-PD 3.1 — negotiates voltages from 5 V to 48 V DC and currents to 5 A, delivering up to 240 W per port. The 48 V bus feeding a USB-PD wall plate is the same bus that feeds the PoE switch.',
            'Native-DC LED lighting — drivers eliminated by feeding the LED arrays directly from the 48 V DC bus. See our [PoE lighting guide](/guides/poe-lighting-guide).',
            'Server-rack distribution — 48 V DC at the rack (post-step-down from a 380 V DC trunk) is the dominant standard for modern hyperscale racks.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: '48 V DC sits inside ELV',
          text:
            'A 48 V DC PELV bus is below the 120 V DC ELV ceiling, which materially changes the protective measures available. Section 414 of BS 7671:2018+A4:2026 permits SELV/PELV as a protective measure, removing the need for additional protection by 30 mA RCD in many cases.',
        },
      ],
    },
    {
      id: 'native-dc-sources',
      heading: 'Native-DC Sources — Solar PV, Batteries, Fuel Cells, Wind DC Link',
      tocLabel: 'Native-DC sources',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Every dominant low-carbon generation technology is natively DC at the point of production, which makes LVDC distribution a natural fit.',
        },
        {
          type: 'list',
          items: [
            'Solar PV — each module produces DC; strings run 600–1500 V DC for commercial systems and the array is only converted to AC at the inverter. Running an internal 380 V DC bus parallel to the inverter removes a conversion stage. See [RAMS for solar PV installation](/guides/rams-for-solar-pv-installation) and [Section 712 prosumer A4:2026 guide](/guides/section-712-prosumer-a4-2026).',
            'Lithium battery storage — cells, packs and cabinets are all DC. On a DC-coupled system the battery sits directly on the same DC bus as the PV array. See [battery storage guide](/guides/battery-storage-guide).',
            'Fuel cells — PEM and solid-oxide fuel cells produce DC at single-cell voltages of ~0.7 V, stacked to 48 V DC, 380 V DC or higher. Backup-power fuel cells sit naturally on an existing DC bus.',
            'Wind turbines — small and mid-scale wind use a permanent-magnet generator producing variable-frequency AC, rectified to a DC link, then inverted at the grid tie-in. The DC link is available for direct distribution.',
            'V2H / V2G — vehicle-to-home and vehicle-to-grid treat the parked EV battery as a DC source. See [V2H bidirectional EV charging](/guides/v2h-bidirectional-ev-charging).',
          ],
        },
      ],
    },
    {
      id: 'dc-fault-current',
      heading: 'DC Fault Current — No Zero Crossing, No Mercy',
      tocLabel: 'DC fault current',
      blocks: [
        {
          type: 'paragraph',
          text:
            'AC fault current crosses zero 100 times a second at 50 Hz. Every AC contactor, fuse and circuit breaker takes advantage of this — the arc that forms when contacts part extinguishes at the next current zero. DC has no zero crossing. A DC fault current rises to its steady-state value and stays there. The arc sustains itself until either the contacts separate beyond the arc length at the bus voltage, magnetic blowouts stretch and extinguish the arc, or the fault is interrupted upstream.',
        },
        {
          type: 'list',
          items: [
            'AC-rated switchgear on DC will weld closed on fault — contacts cannot interrupt a sustained DC arc and the device fails to open.',
            'DC-rated switchgear has larger air gaps, magnetic blowouts and multiple series-connected contacts, rated explicitly for a DC voltage and DC interrupting current. A 1000 V DC isolator may be the same size as a 690 V AC isolator and cost three times as much.',
            'DC-rated fuses (gPV for photovoltaic strings, NH-DC for batteries) have higher arc-extinguishing capacity and are explicitly rated for DC voltage. An AC fuse of the same I2t will not safely interrupt a DC fault.',
            'Prospective DC fault current from a battery can be enormous — a 100 kWh lithium pack has internal impedance low enough to deliver 15–30 kA of short-circuit current.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Never use AC-rated switchgear on a DC circuit',
          text:
            'The single most common LVDC site error. An AC-only MCB, isolator or contactor on a DC string is a fire and electrocution hazard regardless of voltage. A DC voltage rating and DC interrupting current must be printed on the device itself — not claimed by a wholesaler.',
        },
      ],
    },
    {
      id: 'dc-arc-flash',
      heading: 'DC Arc Flash — Much Higher Risk Than AC',
      tocLabel: 'DC arc flash',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Arc-flash incident energy on DC is consistently higher than on AC at the same prospective short-circuit current — the arc does not self-extinguish at a current zero, so its duration is bounded only by the upstream protective device clearing time, and the radiated energy scales linearly with that duration. On a 380 V DC battery bus with a 15 kA prospective fault and a 200 ms clearing time, calculated arc-flash energy at 455 mm working distance can comfortably exceed 8 cal/cm². A 400 V AC equivalent typically calculates at 4–5 cal/cm².',
        },
        {
          type: 'list',
          items: [
            'Arc-rated PPE for DC work is selected on the calculated DC incident energy, not the AC equivalent. NFPA 70E DC tables (Annex D.6) are the most accessible source — there is no fully equivalent BS document yet.',
            'Working distance matters more on DC than AC because incident energy falls with the square of distance. A 600 mm working distance instead of 455 mm can reduce calculated energy by 40%.',
            'Live work on a battery DC bus is the exception, not the rule. The RAMS must justify it under EAWR 1989 Regulation 14 and include arc-rated PPE selection, isolation strategy, and a justified working distance.',
            'Upstream protective device clearing time is the single biggest lever on DC arc-flash energy. Fast-acting DC-rated fuses (gPV, NH-DC) reduce calculated energy more than any PPE upgrade.',
          ],
        },
      ],
    },
    {
      id: 'dc-switchgear-and-fuses',
      heading: 'DC-Rated Switchgear and Fuses',
      tocLabel: 'DC switchgear',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A device rated only for AC cannot be used on DC at the same nominal voltage — it is a physical limitation of arc behaviour, not a regulatory preference. LVDC switchgear must carry explicit DC voltage and DC interrupting current ratings on the nameplate.',
        },
        {
          type: 'list',
          items: [
            'DC isolators — typically 1000 V DC or 1500 V DC for PV strings, with multiple poles in series for arc-extinguishing length. ABB OT-DC and Eaton DCM are common UK specifications.',
            'DC MCBs — sold for solar PV and battery systems. Common ratings 1000 V DC, curve C, breaking capacity 10 kA DC (the DC interrupting current, not the AC equivalent).',
            'DC fuses — gPV fuses for PV strings (BS EN 60269-6) and NH-DC fuses for batteries. Both are silver-sand fuses with arc-extinguishing capacity matched to DC voltage. AC NH fuses must never be substituted.',
            'DC contactors — magnetic blowout contactors with permanent magnets adjacent to the contacts to stretch and extinguish the DC arc.',
            'DC connectors — MC4 is the de facto PV string connector at 1500 V DC and 30–50 A. Never disconnect under load — the arc will destroy the connector.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Polarity-correct termination is non-negotiable',
          text:
            'Many DC isolators and fuses are polarised — they must be wired with positive on the supply side or the magnetic blowout will not extinguish the arc. Reversed polarity on a polarised DC device is a fault waiting to happen. Follow the manufacturer arrow marking and DC+/DC\u2212 labels.',
        },
      ],
    },
    {
      id: 'dc-earthing',
      heading: 'Earthing Arrangements for DC',
      tocLabel: 'DC earthing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'UK AC earthing is dominated by TN-S, TN-C-S (PME/PNB) and TT — see the [BS 7671 A4:2026 summary](/guides/bs-7671-a4-2026-summary) for the latest PNB updates. DC earthing is a different exercise: the DC bus has two live conductors and the choice of which to earth, or whether to leave the bus unearthed (IT), changes the fault behaviour fundamentally.',
        },
        {
          type: 'list',
          items: [
            'Mid-point earth — the centre of the DC bus is earthed, so each pole sits at half the bus voltage relative to earth. A 380 V DC mid-point-earthed bus presents \u00b1190 V DC to earth. Dominant for 380 V DC data centre distribution because it limits touch voltage.',
            'Negative-earth — DC\u2212 bonded to earth, DC+ sits at the full bus voltage relative to earth. Common on legacy telecom 48 V DC systems.',
            'Positive-earth — DC+ bonded to earth, DC\u2212 sits at the full bus voltage relative to earth. Rare in modern UK practice; seen on some legacy thin-film PV that required positive-earth for module electrochemistry.',
            'IT (unearthed) DC bus — neither pole bonded. First earth fault does not trip protection but is detected by an insulation monitoring device (IMD). Used on PV strings (BS EN 62109 default) and safety-critical DC systems.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'On a hybrid PV + battery + EV charging installation the DC side of the inverter typically runs as IT with an IMD, while the AC side runs as TN-C-S per Section 712. The two are galvanically separated by the inverter transformer or by reinforced functional separation in transformerless inverters meeting BS EN 62109-2.',
        },
      ],
    },
    {
      id: 'dc-rcds-type-b',
      heading: 'DC RCDs (Type B) — Applicability',
      tocLabel: 'Type B RCDs',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A Type AC RCD only detects sinusoidal AC residual current. Type A additionally detects pulsating DC. Neither detects smooth DC residual current — the kind that flows when an EV charger output stage develops an internal fault to earth, or a solar PV array develops a DC-side insulation fault. Type B is the only RCD type capable of detecting smooth DC residual current down to a defined trip threshold.',
        },
        {
          type: 'list',
          items: [
            'EV charging — Section 722 of BS 7671:2018+A4:2026 requires DC residual current protection at every EV charging point. Either the charger declares inherent DC fault separation (BS EN 61851-1) or a Type B RCD is fitted on the supply side.',
            'Solar PV inverters — most modern transformerless inverters declare DC fault separation per BS EN 62109-2 and do not require a separate Type B upstream. Verify the manufacturer declaration.',
            'Battery storage — DC-coupled systems generally rely on the inverter\'s declared DC fault separation; AC-coupled systems may require Type B on the AC side depending on the inverter declaration.',
            'Generic DC final circuits — where smooth DC residual current is possible on the supply side of an AC-fed circuit, Type B is the only compliant choice. 30 mA Type A will be desensitised by smooth DC and fail on a subsequent AC fault.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Type A RCD blinding',
          text:
            'A Type A RCD exposed to smooth DC above its blinding threshold (typically 6 mA) saturates and no longer trips on a subsequent AC fault. Silent failure mode — appears intact and tests on a standard tester. Section 722 of A4:2026 forbids reliance on Type A where smooth DC is possible.',
        },
      ],
    },
    {
      id: 'hybrid-ac-dc-topology',
      heading: 'AC/DC Hybrid Microgrid Topology',
      tocLabel: 'Hybrid topology',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Few UK projects are pure DC. The dominant topology on commercial PV + battery + EV charging is a hybrid AC/DC microgrid: the AC bus connects to the grid through the supply intake and the DC bus connects the native-DC sources and loads, linked by one or more bidirectional inverters.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'AC bus — existing 400 V three-phase or 230 V single-phase distribution from the DNO supply, protected by BS 7671 main switchgear and tied to the grid through the supply intake.',
            'DC bus — typically 380 V DC or 600–800 V DC depending on inverter rating. Connects PV, battery, fuel cell (if present) and DC loads (rack distribution, EV charger DC link, native-DC lighting).',
            'Bidirectional inverter — converts between the AC and DC bus, handling grid export/import, PV charging the battery, battery discharge to AC loads and prosumer changeover under Section 712.',
            'Grid tie-in — G98 or G99 commissioning per the DNO, with anti-islanding protection so the inverter cannot energise a dead grid.',
            'Loads — sorted between AC bus loads (general final circuits, motors) and DC bus loads (DC EV charger, server racks, native-DC lighting). Choosing which bus each load sits on is the heart of the topology design.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'On a prosumer installation, Section 712 governs the AC-side regulations — main switch, earthing, isolation, labelling. The DC side is governed by BS EN 62109 for the inverter and the manufacturer\'s installation instructions for PV array, battery cabinet and DC switchgear. See [prosumer low-voltage electrical installation guide](/guides/prosumer-low-voltage-electrical-installation) for the integrated walk-through.',
        },
      ],
    },
    {
      id: 'dc-ev-charger-bus',
      heading: 'DC EV Charger Output Bus',
      tocLabel: 'DC EV charger',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A rapid or ultra-rapid EV charger DC output bus is one of the most accessible LVDC circuits the UK electrician will see on commercial work. A CCS-type charger delivers up to 1000 V DC at up to 500 A to the vehicle, depending on the BMS request. The output cable is a heavy two-pole DC cable terminated in a CCS connector with additional pilot, proximity and earth conductors.',
        },
        {
          type: 'list',
          items: [
            'AC input — typically 400 V three-phase, protected by Type B RCD per Section 722 unless the charger declares inherent DC fault separation.',
            'DC link — 400–1000 V DC internal bus between input rectifier and output stage. Not accessible without removing the enclosure.',
            'DC output to vehicle — controlled by the vehicle BMS, current ramped per the CCS protocol. Live only when the vehicle is authenticated and the BMS requests current.',
            'DC isolation — output isolated from the AC supply by a DC-side contactor, DC-rated for maximum output voltage and current.',
            'Earthing — the DC output reference is typically isolated from the AC earth; the vehicle chassis is referenced to the charger output earth via the CCS connector pin.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'On the UK installer side, AC input commissioning and earthing is BS 7671 territory; the DC output specification is the charger manufacturer\'s. Type B RCD or declared DC fault separation is mandatory either way.',
        },
      ],
    },
    {
      id: 'standards-landscape',
      heading: 'The Standards Landscape — BS 7671 vs IEC vs Manufacturer',
      tocLabel: 'Standards landscape',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 is, by deliberate scope, an AC-dominated document. DC is treated in three main places: Section 712 (Solar PV), Section 722 (EV charging) and the A4:2026 provisions on Type B RCDs. There is no full DC chapter. A serious LVDC design must combine BS 7671 with adjacent standards.',
        },
        {
          type: 'list',
          items: [
            'BS 7671:2018+A4:2026 — Section 712 (Prosumer), Section 722 (EV charging), Type B RCD provisions, TN-C-S PNB earthing updates. The AC envelope around the DC system.',
            'BS EN 62109-1/-2 — Safety requirements for power converters used in PV / battery systems, including the DC fault separation declaration that determines whether a Type B RCD is required upstream.',
            'BS EN 61140 — Protection against electric shock; sets the ELV ceilings and SELV/PELV definitions used throughout BS 7671 Part 4.',
            'IEC TS 60479-1 — Effects of current on human beings, including the DC versus AC threshold tables that justify the 120 V DC ELV ceiling.',
            'BS EN 60269-6 — LV fuses for the protection of photovoltaic strings (gPV fuses).',
            'IEC TS 61200-413 — Application of fault protection for direct current systems.',
            'IEEE 802.3bt — PoE++, 90 W per port at 48 V DC nominal.',
            'USB-PD 3.1 — USB Power Delivery, up to 240 W per port at up to 48 V DC.',
            'CCS / CHAdeMO — DC fast charging protocols (IEC 61851-23, SAE J1772 CCS).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'BS 7671 DC gaps — manufacturer instructions are not optional',
          text:
            'Where BS 7671:2018+A4:2026 is silent — DC arc-flash calculation, DC switchgear at non-PV voltages, LVDC distribution in non-prosumer commercial buildings — the manufacturer\'s installation instructions, BS EN 62109 and IEC TS 61200-413 carry the regulatory weight. BS 7671 Regulation 133.1.1 places the duty on the designer to comply with all relevant standards.',
        },
      ],
    },
    {
      id: 'elec-mate-tools',
      heading: 'Working LVDC Jobs With Elec-Mate',
      tocLabel: 'In-app tools',
      blocks: [
        {
          type: 'paragraph',
          text:
            'LVDC projects in the UK in 2026 are still rare enough that most electricians have no settled hand-written paperwork for them. Elec-Mate builds DC support into the same certification tools that already cover AC installations.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Section 712 Prosumer EIC — covers prosumer installations under Section 712 including DC-side declaration fields, inverter declaration of DC fault separation, and Type B RCD selection on the AC side.',
            'Solar PV RAMS — solar-PV-specific Risk Assessment and Method Statements covering DC string isolation, MC4 connector hazards and arc-flash working distance.',
            'EV Charger commissioning — Section 722 commissioning with the Type B RCD vs inherent-DC-fault-separation decision tracked on the certificate.',
            'Battery storage — DC-coupled and AC-coupled installations, with the inverter declaration captured against the BS EN 62109-2 reference.',
            'Calculator suite — DC cable sizing, DC voltage drop, DC fault current and PV string voltage temperature correction.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Included on the Electrician tier',
          text:
            'Section 712 prosumer support, the Solar PV RAMS template, Section 722 EV commissioning and the DC calculator suite are all included on the Elec-Mate Electrician subscription. Battery storage and prosumer workflows are part of the same package — no separate DC add-on.',
        },
      ],
    },
  ],
  howToHeading: 'How to Plan an LVDC Microgrid Job',
  howToDescription:
    'The practical sequence for a UK electrician taking on a hybrid AC/DC microgrid project — from initial site survey to commissioning — anchored to BS 7671:2018+A4:2026, BS EN 62109 and BS EN 61140.',
  howToSteps: [
    {
      name: 'Confirm voltage band and topology',
      text:
        'Decide whether the DC side will be ELV (\u2264120 V DC, e.g. 48 V PoE/PELV) or LV (120–1500 V DC, e.g. 380 V data centre bus or 600–1000 V PV string), and whether the project is pure DC, pure AC or hybrid. The band determines the protective measures available under Section 414 of BS 7671:2018+A4:2026.',
    },
    {
      name: 'Map sources and loads to the bus',
      text:
        'List every native-DC source (PV, battery, fuel cell) and every native-DC load (server racks, EV charger DC link, native-DC lighting). Loads that natively want AC stay on the AC bus; loads that want DC move to the DC bus. The bidirectional inverter handles the boundary.',
    },
    {
      name: 'Select DC-rated switchgear, fuses and isolators',
      text:
        'Specify DC isolators, fuses (gPV for PV strings, NH-DC for batteries), MCBs and contactors with explicit DC voltage and DC interrupting current on the nameplate. Never substitute AC-rated devices at the same nominal voltage. Wire polarised devices with positive on the supply side.',
    },
    {
      name: 'Decide DC earthing arrangement',
      text:
        'Choose mid-point earth, negative-earth, positive-earth or IT (unearthed with IMD). Default to IT with insulation monitoring for PV per BS EN 62109; default to mid-point earth for 380 V DC data centre distribution. Document the choice and fit the IMD or bond.',
    },
    {
      name: 'Specify Type B RCD or declared DC fault separation',
      text:
        'On every EV charging point and any AC-supplied circuit where smooth DC residual current is possible, either fit a Type B RCD upstream or capture the manufacturer\'s declaration of inherent DC fault separation per BS EN 62109-2. Type A is forbidden where smooth DC is possible — it will be blinded.',
    },
    {
      name: 'Commission, certify and brief',
      text:
        'Commission the AC side under Section 712 or Section 722 with the Elec-Mate EIC tool. Capture the inverter DC fault separation declaration, DC switchgear schedule and DC earthing arrangement on the certificate. Brief the operator on DC arc-flash hazards and the DC-specific isolation sequence.',
    },
  ],
  faqs: [
    {
      question: 'Does BS 7671:2018+A4:2026 fully cover LVDC microgrid distribution?',
      answer:
        'Partially. BS 7671 deals with DC primarily through Section 712 (Solar PV / prosumer), Section 722 (EV charging) and the A4:2026 Type B RCD provisions. There is no comprehensive DC chapter. A full LVDC design must combine BS 7671 with BS EN 62109 (inverter safety), BS EN 61140 (protection against electric shock), IEC TS 60479-1 (effects of current on human beings) and IEC TS 61200-413 (DC fault protection). BS 7671 Regulation 133.1.1 requires compliance with all relevant standards, not BS 7671 alone.',
    },
    {
      question: 'Why is 120 V DC the ELV ceiling instead of 50 V like AC?',
      answer:
        'The threshold for ventricular fibrillation in IEC TS 60479-1 is higher for DC than for 50/60 Hz AC at the same body-current level — DC takes more current to trigger the same physiological response. BS EN 61140 and BS 7671 Part 2 reflect this by allowing DC ELV up to 120 V ripple-free, against 50 V for AC. 120 V DC is still dangerous and the "let-go" failure mode means a DC contact sustains even after the AC equivalent would have thrown the casualty clear.',
    },
    {
      question: 'Can I use an AC-rated isolator on a DC circuit if the voltage is lower?',
      answer:
        'No. The arc-extinguishing mechanism in an AC-rated isolator depends on the AC zero crossing. On DC the arc sustains itself, the contacts weld closed and the device fails to open. The isolator must be marked with an explicit DC voltage rating and DC interrupting current rating, not just an AC rating.',
    },
    {
      question: 'When is a Type B RCD required on an EV charger?',
      answer:
        'Section 722 of BS 7671:2018+A4:2026 requires every EV charging point to have DC residual current protection. Either the charger declares inherent DC fault separation per BS EN 62109-2 (Type A or Type AC upstream is then sufficient), or a Type B RCD is fitted on the supply side. Almost every domestic charger sold in the UK in 2026 declares inherent DC fault separation; commercial DC fast chargers may require explicit Type B. Check the manufacturer declaration before designing the protection.',
    },
    {
      question: 'How dangerous is DC arc flash compared to AC?',
      answer:
        'At the same prospective short-circuit current and clearing time, DC arc-flash incident energy is consistently higher because the DC arc does not extinguish at a current zero. Calculated energy on a 380 V DC battery bus can exceed 8 cal/cm² where the equivalent 400 V AC bus calculates at 4–5 cal/cm². Arc-rated PPE selection on a DC bus must be based on DC-specific incident energy (NFPA 70E Annex D.6 is the most accessible reference), not the AC equivalent.',
    },
    {
      question: 'What earthing arrangement should I use on a 380 V DC bus?',
      answer:
        'Mid-point earth is the dominant arrangement for 380 V DC data centre distribution — each pole sits at \u00b1190 V DC to earth, halving the touch voltage compared with an unearthed bus. Solar PV strings typically run IT (unearthed) with an insulation monitoring device per BS EN 62109. Legacy telecom 48 V DC usually runs negative-earth. The choice is a design decision; document it and fit the corresponding bond or IMD.',
    },
    {
      question: 'Does PoE++ count as LVDC distribution?',
      answer:
        'Yes. PoE++ (IEEE 802.3bt) delivers up to 90 W at 48 V DC nominal over Cat6A. The PoE switch is the source, the powered device is the load, and the Cat6A run is the DC distribution between them. Because 48 V DC sits inside the ELV DC ceiling of 120 V, PoE++ is treated as PELV under BS 7671 Section 414 and avoids the additional protection requirements that apply at LV.',
    },
    {
      question: 'How does Elec-Mate help on LVDC certification?',
      answer:
        'The EIC tool covers Section 712 prosumer installations and Section 722 EV charging — the two main entry points for DC certification under BS 7671:2018+A4:2026. The RAMS Generator produces solar-PV-specific safety documentation including DC string isolation, MC4 connector hazards and arc-flash working distance. The calculator suite includes DC cable sizing, DC voltage drop, DC fault current and PV string temperature correction.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/section-712-prosumer-a4-2026',
      title: 'Section 712 Prosumer (A4:2026)',
      description: 'The regulation-by-regulation walk-through of Section 712 of BS 7671:2018+A4:2026 — main switch, earthing, isolation and labelling for prosumer installations.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/prosumer-low-voltage-electrical-installation',
      title: 'Prosumer LV Electrical Installation',
      description: 'How a prosumer installation actually fits together — PV array, battery, inverter, supply intake and the BS 7671 envelope around the DC side.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/battery-storage-guide',
      title: 'Battery Storage Guide',
      description: 'Lithium battery storage design, BMS integration, DC fuse selection and the Section 712 commissioning chain.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/v2h-bidirectional-ev-charging',
      title: 'V2H Bidirectional EV Charging',
      description: 'Vehicle-to-home topology, the DC bus on the vehicle side, and how V2H sits inside the prosumer regulatory framework.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/rams-for-solar-pv-installation',
      title: 'RAMS for Solar PV Installation',
      description: 'Solar-PV-specific Risk Assessment and Method Statement — DC string isolation sequence, MC4 connector hazards, working at height and arc-flash working distance.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671 A4:2026 Summary',
      description: 'The headline changes in the 18th Edition, A4:2026 — AFDD, TN-C-S (PNB), new schedule columns and Type B RCD provisions for DC residual current.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Take LVDC work without guessing',
  ctaSubheading:
    'The Elec-Mate Electrician tier covers Section 712 prosumer commissioning, Section 722 EV charging, solar PV RAMS, battery workflows and the DC calculator suite — built around BS 7671:2018+A4:2026, BS EN 62109 and BS EN 61140. 7-day free trial.',
};
