import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// IEEE 802.3bt (PoE Type 3 & 4), BS EN 50173 (Information technology — Generic
// cabling systems), BS EN 50174 (Installation of cabling) and BS EN 60950 / 62368.

const published = '2026-05-17';
const modified = '2026-05-18';

export const poePlusPlusType4Config: GeneratedGuideConfig = {
  pagePath: '/guides/poe-plus-plus-type-4-90w-installation',
  title: 'PoE++ Type 4 (IEEE 802.3bt) 90W Installation Guide for UK',
  description:
    'Practical UK installation guide to Power over Ethernet Type 4 (IEEE 802.3bt) at 90W — power budgeting, cable selection (Cat6 vs Cat6a vs Cat7)…',
  datePublished: published,
  dateModified: modified,
  readingTime: 18,
  badge: 'Structured Cabling & ELV',
  badgeIcon: 'Cable',
  breadcrumbLabel: 'PoE++ Type 4 90W Installation',
  heroPrefix: 'PoE++ Type 4',
  heroHighlight: '(IEEE 802.3bt) 90W',
  heroSuffix: '— Installation Guide for UK Electricians',
  heroSubtitle:
    'Power over Ethernet Type 4 (PoE++) delivers up to 90W from a single Cat6a or better twisted-pair cable, powering lights, cameras, access control, Wi-Fi access points and digital signage without a separate mains spur. This guide explains the IEEE 802.3bt power classes, how 4-pair power delivery works, how to select and de-rate cable, where BS 7671:2018+A4:2026 Section 716 (ELV DC power distribution using balanced IT cables) and Section 715 (extra-low voltage lighting) intersect, and what UK electricians need to know to install PoE Type 4 safely and compliantly.',
  keyTakeaways: [
    'IEEE 802.3bt (PoE Type 3 and Type 4) extends Power over Ethernet to 60W and 90W at the powered device — the most significant change since the original 15.4W 802.3af specification.',
    'Type 4 PoE uses all four twisted pairs (8 conductors) of a Cat6a or better cable, with port voltage of 52–57V DC and powered device input of 41.1–57V DC — firmly within the extra-low voltage (ELV) band of BS 7671.',
    'Cable selection matters: 802.3bt mandates a minimum of Cat5e for 60W, but Cat6a is strongly recommended for Type 4 90W operation to manage conductor heating in bundles and to allow full 100m channel length.',
    'BS EN 50174-2 limits bundle sizes for PoE — large bundles of cables all carrying maximum current can raise core temperatures and degrade insulation and data performance. Bundle size and routing must be planned.',
    'BS 7671:2018+A4:2026 Section 716 (ELV DC power distribution using balanced IT cables) is the primary hook for all PoE installations — cameras, access control, APs, and lighting alike. Section 715 (ELV lighting) is an additional overlay only when PoE powers luminaires. Type 4 PoE at 57V DC is ELV, not SELV-by-default — the designer must declare the system type.',
    'Inspection and testing on PoE is split: structured cabling is tested to BS EN 50173 / BS EN 50346 (permanent link / channel certification), while the PSE supply and any mains tails are tested to BS 7671:2018+A4:2026.',
  ],
  sections: [
    {
      id: 'what-is-poe-type-4',
      heading: 'What PoE++ Type 4 Is, and How We Got Here',
      tocLabel: 'What is PoE Type 4?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Power over Ethernet (PoE) is the family of IEEE standards that allows electrical power to be carried on the same twisted-pair structured cabling that already carries Ethernet data. The standards are ratified by the IEEE 802.3 working group and have evolved through four distinct generations, each one increasing the deliverable power, and each one widening the scope of what an electrician will be asked to install.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'PoE Type 1 — IEEE 802.3af (2003). 15.4W at the power sourcing equipment (PSE), 12.95W at the powered device (PD). Uses two pairs only. Designed for VoIP phones and early wireless access points.',
            'PoE Type 2 (PoE+) — IEEE 802.3at (2009). 30W at the PSE, 25.5W at the PD. Still two-pair, but higher current. Designed for pan-tilt-zoom IP cameras and dual-band Wi-Fi access points.',
            'PoE Type 3 (PoE++ / 4PPoE) — IEEE 802.3bt (2018). 60W at the PSE, 51W at the PD. Uses all four pairs (4PPoE) for the first time. Designed for video conferencing, high-power APs, and modest PoE lighting.',
            'PoE Type 4 (Higher-Power PoE / Hi-PoE) — IEEE 802.3bt (2018). 90W at the PSE, 71.3W at the PD. Four-pair, full-current operation. Designed for laptops, LED luminaires, high-power digital signage and motorised access control.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The leap from Type 2 to Type 4 is large. It triples the deliverable power, doubles the number of conductors carrying current, and roughly doubles the heating effect inside the cable bundle. From an electrician\'s perspective, PoE Type 4 is the point at which Power over Ethernet stops being "just data" and becomes a small DC distribution system that needs proper design.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'PoE++ is the marketing name — IEEE 802.3bt is the standard',
          text: 'You will see equipment marketed as "PoE++", "Hi-PoE", "Ultra PoE", "4PPoE", or "90W PoE". The underlying standard is IEEE 802.3bt. Always check the datasheet for the IEEE class number (Class 8 = 90W Type 4), not just the marketing label.',
        },
      ],
    },
    {
      id: 'pse-vs-pd',
      heading: 'Power Sourcing Equipment vs Powered Device',
      tocLabel: 'PSE vs PD',
      blocks: [
        {
          type: 'paragraph',
          text: 'Every PoE link has two roles. The power sourcing equipment (PSE) provides the DC supply and the data — typically a PoE-enabled network switch, a PoE midspan injector, or in larger systems a dedicated PoE power shelf. The powered device (PD) consumes the supply — a luminaire, camera, access point, intercom, or display. The IEEE 802.3bt standard defines a handshake (the LLDP-based classification protocol) that allows the PSE and PD to negotiate the correct power class before any current is delivered.',
        },
        {
          type: 'list',
          items: [
            'PSE — the source. Switch port outputs 52–57V DC at the cable, with current limited per port to the negotiated class (typically 960 mA for Type 4 across 4 pairs).',
            'PD — the load. Operates over the input range 41.1–57V DC (Type 3/4), allowing for voltage drop across up to 100m of cable.',
            'Classification — the PSE and PD perform a 1.4–10V DC detection step, a classification handshake (Class 0–8), and only then enable full power. This protects the cable from being energised into a non-PoE device.',
            'Endspan vs midspan — an endspan PSE is the switch itself with PoE built in. A midspan injector sits between a non-PoE switch and the PD, injecting power onto unused or shared pairs. For Type 4 a 4PPoE-capable midspan is required.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: "PD input voltage range is wide — don't panic at the meter",
          text: 'A PoE Type 4 PD must operate down to 41.1V DC at its input. If you measure 44V DC at a luminaire 90m from the switch under full load, that is by design — the IEEE 802.3bt voltage drop budget allows for it. Measure at the PSE and the PD; the difference is the cable voltage drop.',
        },
      ],
    },
    {
      id: 'four-pair-power-delivery',
      heading: '4-Pair Power Delivery — Why Type 4 Uses All 8 Conductors',
      tocLabel: '4-pair power delivery',
      blocks: [
        {
          type: 'paragraph',
          text: 'A standard four-pair UTP cable (Cat5e, Cat6, Cat6a, Cat7) contains eight conductors arranged as four twisted pairs. The original 10/100BASE-T Ethernet standard used only two of those pairs for data (pins 1/2 and 3/6). The original PoE Type 1 standard could therefore put power on the unused pairs (Mode B) or share power with the data pairs (Mode A) — but in both cases, only two pairs carried current.',
        },
        {
          type: 'paragraph',
          text: 'With Gigabit Ethernet (1000BASE-T) and faster, all four pairs are used for data simultaneously. PoE Type 3 and Type 4 therefore had to define a way to share DC power on all four pairs while the same pairs still carry differential Ethernet signalling. The result is 4-pair power, often called 4PPoE: the DC supply is split across all four pairs, each carrying roughly a quarter of the total current.',
        },
        {
          type: 'list',
          items: [
            'Type 4 / Class 8 carries 960 mA per pair maximum (approximately 240 mA per conductor) across all four pairs simultaneously.',
            'Splitting the current across four pairs roughly halves the I²R loss compared to a hypothetical two-pair 90W delivery — this is what makes Type 4 thermally feasible on Cat6a.',
            'Both pairs in a balanced pair carry equal and opposite currents from the differential data signal, plus a common-mode DC component. The DC component cancels out at the magnetics in the PHY, so it does not interfere with the data.',
            'The PSE must be a true 4PPoE source; legacy two-pair PSEs cannot deliver Type 4 even if the cable supports it.',
          ],
        },
      ],
    },
    {
      id: 'cable-selection',
      heading: 'Cable Selection — Cat5e, Cat6, Cat6a and Cat7 for PoE Type 4',
      tocLabel: 'Cable selection',
      blocks: [
        {
          type: 'paragraph',
          text: 'IEEE 802.3bt is written conservatively: it states that Type 3 and Type 4 will work over a Class D channel (Cat5e) up to 100m. In practice, UK installers should treat Cat6a as the realistic minimum for Type 4 90W operation, and reserve Cat5e only for the lowest power classes. The reason is heat.',
        },
        {
          type: 'paragraph',
          text: 'Cat5e has a conductor cross-section of typically 24 AWG (0.205 mm²) with a higher DC loop resistance than Cat6a. At 960 mA per pair, the I²R heating per metre is higher, and in a bundle of 24 or 48 cables each carrying near-maximum current, the bundle core temperature rises. A higher cable temperature increases insulation resistance creep, raises conductor resistance further, and reduces signal-to-noise ratio. BS EN 50174-2 includes installation rules to manage this.',
        },
        {
          type: 'list',
          items: [
            'Cat5e — acceptable for Type 1 (15.4W) and Type 2 (30W). Marginal for Type 3 (60W). Not recommended for Type 4 (90W).',
            'Cat6 — acceptable for Type 3 (60W). Workable for Type 4 (90W) on short runs but de-rate aggressively in bundles.',
            'Cat6a — recommended baseline for Type 4 (90W). 23 AWG conductors, lower loop resistance, better thermal performance. Full 100m channel length achievable.',
            'Cat7 / Cat7a / Cat8 — over-specified for most PoE deployments. Used in high-EMI environments or where future 10GBASE-T is also required. Shielded designs help with cross-talk between PoE pairs and adjacent data pairs.',
            'Solid copper, not copper-clad aluminium (CCA) — CCA cable is forbidden by BS EN 50173 for permanent-link installations and is a fire and reliability risk under sustained PoE current.',
            'Minimum conductor CSA — BS 7671 Table 52.3 (referenced via Reg 524.2.3) sets 0.75 mm² as the minimum conductor cross-sectional area for ELV circuits, with a note directing to Section 715 for ELV lighting. Relevant when specifying flexible patch leads or non-standard PoE accessories: ensure conductors meet this minimum.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Reject CCA cable on sight',
          text: 'Copper-clad aluminium cable cannot legally be installed for structured cabling in the UK and is particularly dangerous under PoE Type 4 load. The aluminium core has roughly 60% higher resistance than copper for the same diameter, raising I²R heating, and aluminium terminations can creep at IDC terminations causing intermittent faults and arcing.',
        },
      ],
    },
    {
      id: 'voltage-drop',
      heading: 'Voltage Drop Calculations for PoE',
      tocLabel: 'Voltage drop',
      blocks: [
        {
          type: 'paragraph',
          text: 'PoE voltage drop is calculated differently to BS 7671 mains volt drop because it is a low-voltage DC system with a defined input tolerance at the load. The PSE puts out 52–57V DC; the PD must work down to 41.1V DC. The available voltage drop budget is therefore around 10–16V DC across the cable, which sounds generous until you do the arithmetic on 100m of 23 AWG conductors carrying 960 mA per pair.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Calculate the DC loop resistance — for Cat6a at 23 AWG, approximately 0.083 Ω/m per pair (round-trip). For Cat5e at 24 AWG, approximately 0.094 Ω/m per pair. Manufacturer datasheets are authoritative.',
            'For 4PPoE, four pairs in parallel quarter the effective loop resistance — so on Cat6a, roughly 0.021 Ω/m total for the load current return path.',
            'At 90W output with 53V at the PSE, total current is approximately 1.7A (split across four pairs as 425 mA per pair). Over 100m of Cat6a the voltage drop is approximately 1.7A × (0.021 Ω/m × 100m) = 3.6V DC — well within budget.',
            'On a Cat5e installation at the same length, total voltage drop rises to approximately 4.0V DC — still within budget but with less margin and more thermal stress.',
            'For long runs above 90m, always model the actual cable resistance from the datasheet, and verify the PD continues to operate at minimum input voltage with a worst-case bundle de-rated temperature.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The 100m channel length limit in BS EN 50173 is an Ethernet signalling limit, not a PoE limit. PoE itself could go further on heavy cable, but the data side will fail first. Never exceed 100m end-to-end (patch + permanent link + patch) on a PoE channel. Where greater distances are required, a fibre uplink to an intermediate PSE switch is the correct approach, not a longer copper run.',
        },
        {
          type: 'paragraph',
          text: "When modelling worst-case voltage drop, use the cable manufacturer's maximum DC loop resistance figure (typically quoted at 20°C) and apply a temperature correction factor for the expected bundle core temperature. Copper conductor resistance rises by approximately 0.4% per degree Celsius above 20°C, so a 50°C bundle core temperature adds roughly 12% to the loop resistance — a meaningful effect on a long run near the limit.",
        },
      ],
    },
    {
      id: 'heat-bundle-derating',
      heading: 'Heat Dissipation and Bundle De-Rating',
      tocLabel: 'Heat and bundles',
      blocks: [
        {
          type: 'paragraph',
          text: 'The single biggest installation risk with PoE Type 4 is heat. Every conductor carrying current dissipates I²R heat. A single cable in free air can dissipate this easily. A bundle of 24 cables in a closed plastic trunking, each running near full Type 4 current, behaves more like a small heating element — the inner cables of the bundle cannot lose heat efficiently to the environment, and the bundle core temperature rises.',
        },
        {
          type: 'paragraph',
          text: 'BS EN 50174-2 addresses this directly with bundle size guidance for installations carrying remote powering. The relevant guidance is that bundles of cables carrying high PoE currents should be limited in size, kept loose rather than tightly tied, and routed in containment that allows airflow.',
        },
        {
          type: 'list',
          items: [
            'Bundle size — limit to 24 cables per bundle as a working baseline for Type 4 operation, smaller in poorly ventilated locations.',
            'Cable ties — replace tight cable ties with hook-and-loop straps to allow the bundle to "breathe". Tight ties create hot-spots.',
            'Containment — perforated tray with airflow gaps is preferred over solid trunking. In dado trunking and floor boxes, plan smaller bundles.',
            'Ambient temperature — derate further in plant rooms, ceiling voids above suspended ceilings, and risers where ambient is above 30°C.',
            'Cable jacket rating — verify the cable is rated for the temperature you expect at bundle core, not just at the room ambient.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A hot bundle is a slow fire risk',
          text: "Sustained operation of an undersized bundle above the cable's rated temperature degrades the insulation polymer. Over years, this can lead to insulation breakdown, short-circuit between conductors, and arcing. The fire risk is low but real, especially in plenum and riser locations. Treat bundle planning with the same seriousness you treat grouping factors for mains cables under BS 7671.",
        },
      ],
    },
    {
      id: 'bs7671-applicability',
      heading: 'BS 7671 Section 716 and Section 715 — Applicability to PoE Installations',
      tocLabel: 'BS 7671 Section 716 / 715',
      blocks: [
        {
          type: 'paragraph',
          text: 'BS 7671:2018+A4:2026 (published 15 April 2026) applies to electrical installations including those operating at extra-low voltage (ELV). Type 4 PoE at 52–57V DC sits firmly in the ELV band (BS 7671 defines ELV as not exceeding 50V AC or 120V ripple-free DC, and PoE is well below the DC ceiling). The presence of mains-powered PSE upstream brings PoE within the broader scope of BS 7671 wherever it shares containment with low-voltage circuits or supplies fixed building services.',
        },
        {
          type: 'callout',
          tone: 'info',
          title:
            'Section 716 is the primary BS 7671 hook for PoE — Section 715 is an additional overlay for lighting only',
          text: 'Section 716 of BS 7671:2018+A4:2026 (ELV DC power distribution using balanced IT cables) is the mandatory reference for any PoE installation — cameras, access control, APs, and luminaires alike. Reg 716.1 explicitly names Power over Ethernet systems as in scope and requires PSEs to comply with BS EN IEC 62368-3. Section 715 (Extra-low voltage lighting) is an additional overlay that applies only when PoE is used to power luminaires.',
        },
        {
          type: 'list',
          items: [
            'Section 716 (ELV DC power distribution using balanced IT cables — Reg 716.1) is the primary BS 7671 reference for all PoE installations. It covers design, erection, and verification of telecommunications infrastructure used for both data and ELV DC power feeding, and explicitly includes PoE systems as defined by ISO/IEC/IEEE DIS 8802-3.',
            'Reg 716.521.101 specifies that ICT cables used for DC power distribution shall comply with Category 5, 6, 6A, 7 or 7A as defined in BS EN 50173-1 and the BS EN 50288 series — this is the BS 7671 cable-selection gateway for PoE installations.',
            'Section 715 of BS 7671 (Extra-low voltage lighting installations) applies in addition to Section 716 where PoE is used to power luminaires. Designer must specify the ELV system type (SELV, PELV, FELV) and follow the Section 715 requirements for source isolation, segregation and identification.',
            'Section 528 (Segregation of circuits) applies where PoE cabling shares containment with low-voltage power. Segregation by partition, by separate compartment, or by sufficient mechanical strength is required.',
            'Chapter 44 (Reg 444.4.1 — minimum separation between IT cables and mains power cables) applies to data-cable routing near noisy LV circuits (VFDs, lift motors, transformers). Note: A4:2026 removed the old Section 444 heading; the substance now sits within Chapter 44.',
            "Chapter 41 (Protection against electric shock) is generally satisfied by the ELV nature of the supply, provided source isolation (typically the PSE's SELV/PELV-compliant power supply) is correctly designed and verified.",
            'The PSE itself, and any midspan injectors, are mains-powered LV equipment and fall fully within BS 7671 on the supply side — including circuit protection, isolation, and inspection and testing.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For PoE-powered lighting in particular, see our dedicated [PoE lighting guide](/guides/poe-lighting-guide) and the [Section 715 ELV lighting A4:2026 update](/guides/section-715-elv-lighting-a4-2026) for the latest amendment-specific guidance.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'ELV does not mean "no design"',
          text: 'Engineers sometimes assume that because PoE is ELV, the BS 7671 design effort is the responsibility of someone else. That is incorrect on shared installations. Where PoE cabling and accessories form part of the fixed installation of a building, the designer of the LV installation must declare the boundary, specify segregation, and verify the PSE supply.',
        },
      ],
    },
    {
      id: 'use-cases',
      heading: 'Practical Use Cases — Where Type 4 90W Earns Its Place',
      tocLabel: 'Use cases',
      blocks: [
        {
          type: 'paragraph',
          text: 'Type 4 PoE is not for everything — for a single 9W ceiling pendant it is overkill. It earns its place in installations where centralised low-voltage DC distribution, single-cable convenience, network integration and remote management together justify the slightly higher infrastructure cost.',
        },
        {
          type: 'list',
          items: [
            'LED lighting — open-plan offices, retail, schools and hospital corridors. Each luminaire is a PD; dimming, colour temperature and occupancy control travel on the same cable. See our [PoE lighting guide](/guides/poe-lighting-guide) for design detail and the [commercial lighting guide](/guides/commercial-lighting-guide) for the broader context.',
            'IP cameras — pan-tilt-zoom domes with heaters, large outdoor cameras and 4K thermal imagers that draw 30–60W. Single Cat6a back to the NVR rack replaces a separate 230V spur and 12V DC distribution.',
            'Access control — magnetic locks, electric strikes, door controllers and badge readers. Type 4 PoE supports doors with high-holding-force mag-locks plus card readers from a single cable.',
            'Digital signage — 21" to 32" PoE displays in lift lobbies, reception areas, retail end-caps. Replaces a 230V socket plus a HDMI run with a single PoE cable.',
            'Wi-Fi 6E and Wi-Fi 7 access points — high-throughput APs with multiple radios, USB ports for IoT gateways and integrated BLE beacons routinely draw 35–60W under load, requiring Type 3 or Type 4 PoE.',
            'Intercom / video door entry — apartment block entry panels, IP doorbells and concierge stations.',
            'Smart-home control panels — wall-mounted touch panels in residential and hospitality installations. See our [smart home lighting installation guide](/guides/smart-home-lighting-installation) for the residential side.',
          ],
        },
      ],
    },
    {
      id: 'surge-protection',
      heading: 'Surge Protection on PoE Circuits',
      tocLabel: 'Surge protection',
      blocks: [
        {
          type: 'paragraph',
          text: "PoE circuits are exposed to two surge sources: induced surges on the structured cabling itself (from nearby lightning strikes, switching transients on adjacent LV circuits, or static discharge at outdoor terminations) and surges propagating from the PSE's mains supply. Both must be considered, particularly where cabling leaves the building envelope to feed external cameras, gate intercoms, or car-park lighting.",
        },
        {
          type: 'list',
          items: [
            'Mains side — a Type 2 SPD at the consumer unit or sub-distribution board feeding the PSE protects against external surges, in line with BS 7671:2018+A4:2026 Section 443.',
            'PoE side — dedicated Ethernet/PoE surge protectors (in-line modules with RJ45 in / RJ45 out and an earth lead) protect the structured cabling channel. Required at the building entry point for any cable that goes outside.',
            'Earthing — PoE surge protectors must be bonded to the local earth bar with a low-impedance lead, no longer than necessary and not coiled.',
            'Outdoor cameras and gate equipment — surge protectors at both ends (PSE end and PD end) are good practice. The PD-end SPD protects the camera; the PSE-end SPD protects the switch and the rest of the LAN.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'One direct lightning strike can take out an entire switch',
          text: 'A single unprotected outdoor camera cable, hit by a near-miss lightning strike, can put a transient onto every PoE port of the PSE switch and propagate further into the LAN. The cost of an in-line PoE SPD is trivial compared to a 48-port managed switch.',
        },
      ],
    },
    {
      id: 'inspection-testing',
      heading: 'Inspection and Testing PoE Installations',
      tocLabel: 'Inspection and testing',
      blocks: [
        {
          type: 'paragraph',
          text: 'Testing a PoE installation requires both BS 7671 verification of the LV supply to the PSE and structured-cabling certification of the PoE-carrying channels. These are two distinct exercises with two distinct sets of test equipment.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'BS 7671:2018+A4:2026 inspection and testing of the supply circuit feeding the PSE — continuity, insulation resistance, polarity, earth fault loop impedance, RCD testing (if used), and prospective fault current. Recorded on an EIC or Minor Works Certificate.',
            'Structured-cabling permanent-link or channel certification to BS EN 50173 / BS EN 50346 — wire map, insertion loss, return loss, near-end and far-end crosstalk, propagation delay, delay skew. Recorded on a Fluke / Viavi / TREND test report.',
            'PoE power test — many modern cable certifiers (Fluke DSX, Fluke DSX-8000, Versiv) include a PoE option that simulates a Class 8 Type 4 load and confirms the channel can sustain it without excessive voltage drop or overheating.',
            'Continuity of earthing on shielded cable (Cat6a F/UTP, S/FTP) — verify the screen is continuous and bonded at one end only (typically the rack end) to avoid earth loops.',
            'PD operation verification — power on the PSE, confirm the PD enumerates, confirm it operates at full load over a sustained period (15 minutes minimum), and measure cable temperature at the bundle core if possible.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Many UK contractors split the work: an electrician handles the PSE supply and the BS 7671 certification, and a structured-cabling subcontractor handles the data cable certification. Where one contractor takes both, the documentation pack should include both certificates plus the PoE power test result.',
        },
      ],
    },
    {
      id: 'connectors',
      heading: 'Connector Selection — RJ45 vs LSA-Plus and Why It Matters',
      tocLabel: 'Connectors',
      blocks: [
        {
          type: 'paragraph',
          text: 'PoE Type 4 puts more current through each conductor than any previous PoE generation. That current passes through every termination: the IDC contacts at the patch panel, the RJ45 plug at each end, and the modular jack inside the PD. A poor termination at any of these points is a hot spot — and under Type 4 currents, hot spots can damage the contact, cause intermittent disconnections, and in worst cases arc on disconnect.',
        },
        {
          type: 'list',
          items: [
            'LSA-Plus IDC terminations — Krone-style insulation displacement contacts used on patch panels and wall-outlet modules. Rated for high currents but only if terminated with the correct tool, the correct pair geometry, and untwisted by less than 13mm.',
            'RJ45 connectors — TIA-1096-A and ISO/IEC 60603-7-x compliant connectors are required for IEEE 802.3bt. Look for the "PoE++ compatible" or "802.3bt rated" marking on the connector body.',
            'Disconnect-under-load risk — the 802.3bt standard requires PSEs to detect a PD removal within a fixed timeout and remove power before disconnect. Cheap or out-of-spec PSEs may not implement this correctly, causing arc damage at the RJ45 pins.',
            'Field-terminated plugs — modern keystone-style or tool-less field plugs are acceptable for Type 4 only when they are explicitly rated for 802.3bt. Older "pass-through" RJ45 plugs are often not rated for the contact pressure required.',
            'Plug retention — under outdoor or vibration-prone conditions, use locking RJ45 connectors or shrouded plugs to prevent partial disconnection under load.',
            'BS 7671:2018+A4:2026 Reg 716.2 normatively references two connector acceptance tests that apply specifically to remote-powered twisted-pair cabling: BS EN 60512-99-001 Test 99a (engaging and separating connectors under electrical load) and BS EN 60512-9-3 Test 9c (endurance under electrical load — mechanical operation with electrical load). Only connectors that pass both tests are formally compliant with the BS 7671 Section 716 requirements for PoE installations.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Twist length matters more than ever',
          text: 'BS EN 50174 limits the untwisted length at terminations to 13mm for Cat6a. Under Type 4 current loads, exceeding this not only degrades NEXT and ACR-F (data parameters) but also concentrates current at the termination, raising local heating. Take the time to terminate properly.',
        },
      ],
    },
    {
      id: 'compliance-summary',
      heading: 'Standards and Compliance Quick Reference',
      tocLabel: 'Standards reference',
      blocks: [
        {
          type: 'paragraph',
          text: 'A compliant UK PoE Type 4 installation will reference several overlapping standards. The structured cabling standards govern the physical infrastructure and its certification; the IEEE standard governs the electrical behaviour of PSE and PD; BS 7671 governs the supply and any shared containment; and product standards govern the safety of the PSE and PD as items of equipment.',
        },
        {
          type: 'list',
          items: [
            'IEEE 802.3bt — Power over Ethernet Type 3 and Type 4 (60W and 90W).',
            'BS EN 50173 series — Information technology — Generic cabling systems (the channel and link specifications including Cat5e through Cat8).',
            'BS EN 50174-1 / -2 / -3 — Installation of cabling: specification and quality assurance / inside buildings / outside buildings.',
            'BS EN 50346 — Information technology — Cabling installation — Testing of installed cabling.',
            'BS 7671:2018+A4:2026 — Requirements for Electrical Installations (the 18th Edition Wiring Regulations as amended). Section 716 (ELV DC power distribution using balanced IT cables) is the primary PoE hook; Section 715 (ELV lighting) is an additional overlay when PoE powers luminaires. See our overview at [BS 7671 Amendment 4 (2026)](/guides/bs-7671-amendment-4-2026).',
            'BS EN 60950 / BS EN 62368 — Audio/video, information and communication technology equipment — safety requirements (covers PSE and PD as products).',
            'BS EN 50174-2 — bundle sizing and remote-powering installation rules.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For broader structured cabling context, see our [structured cabling and BS EN 50173 guide for electricians](/guides/structured-cabling-bs-en-50173-electricians) and the dedicated [BS EN 50174 data cable installation guide](/guides/bs-en-50174-data-cable-installation).',
        },
      ],
    },
    {
      id: 'elec-mate-tools',
      heading: 'Designing PoE Installations with Elec-Mate',
      tocLabel: 'In-app tools',
      blocks: [
        {
          type: 'paragraph',
          text: 'PoE Type 4 sits at the intersection of two trades — structured cabling and electrical — and the design effort is usually under-quoted. A 200-luminaire PoE lighting scheme, a 64-camera CCTV install, or a 40-AP enterprise Wi-Fi deployment each involves PSE sizing, bundle planning, voltage-drop modelling, BS 7671 supply design, and a documentation pack that satisfies both BS EN 50346 cable certification and BS 7671 inspection and testing.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'PSE power budget calculator — sum the PD class loads, apply a diversity factor, and size the PSE switch or midspan accordingly.',
            'Cable selection and voltage-drop modelling — Cat5e / Cat6 / Cat6a / Cat7 against run length, target PD class, and worst-case PD input voltage.',
            'Bundle de-rating helper — recommended maximum bundle size against ambient temperature and PoE class mix.',
            'BS 7671 supply circuit design — circuit protection, SPD selection, and EIC generation for the LV supply to the PSE.',
            'Structured-cabling certificate templates — record permanent-link / channel certification results alongside the EIC for a unified handover pack.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Included on the Electrician tier',
          text: 'The PoE design tools sit alongside the BS 7671 calculator suite, the EIC and EICR tools, and the [Minor Works Certificate](/minor-works-certificate) generator. 7-day free trial, cancel anytime.',
        },
      ],
    },
  ],
  howToHeading: 'How to Install a Compliant PoE Type 4 Channel',
  howToDescription:
    'The end-to-end sequence for a UK electrician installing a PoE Type 4 90W link, from cable selection through to handover documentation.',
  howToSteps: [
    {
      name: 'Identify the powered device class and run length',
      text: "Confirm the PD's IEEE 802.3bt class (typically Class 8 for 90W Type 4), measure the channel length end-to-end (patch + permanent link + patch), and confirm the channel will not exceed the 100m IEEE limit.",
    },
    {
      name: 'Select cable and connectors rated for Type 4',
      text: 'Specify Cat6a as the baseline (solid copper, never CCA), with RJ45 plugs and modular jacks marked as 802.3bt-compatible. For outdoor or industrial environments, specify shielded Cat6a F/UTP with appropriate jacket rating.',
    },
    {
      name: 'Plan the bundle and containment for thermal headroom',
      text: 'Limit bundles to 24 cables, use hook-and-loop ties rather than cable ties, prefer perforated tray with airflow, and de-rate further in plant rooms and risers above 30°C ambient.',
    },
    {
      name: 'Design the BS 7671 supply to the PSE',
      text: 'Size the supply circuit to the PSE based on its nameplate rating, install appropriate circuit protection, fit a Type 2 SPD on the supply, and ensure segregation between the data cabling and any shared LV circuits per Section 528.',
    },
    {
      name: 'Terminate cleanly and test to BS EN 50346',
      text: 'Untwist by less than 13mm at every termination, certify each permanent link with a Fluke / Viavi / TREND tester, and run the PoE class test option to confirm the channel sustains Type 4 current.',
    },
    {
      name: 'Energise, verify and document',
      text: 'Power on the PSE, confirm the PD enumerates at the expected class, measure the PD input voltage under load, hand over the BS EN 50346 channel certificate alongside the BS 7671 EIC for the PSE supply circuit.',
    },
  ],
  faqs: [
    {
      question: 'Do you need to be a qualified electrician to install PoE Type 4?',
      answer:
        "The PoE cabling itself is extra-low voltage (52–57V DC) and is not notifiable under Part P of the Building Regulations. However, the PSE's mains supply is a standard LV circuit and is subject to BS 7671:2018+A4:2026 in full — that part of the work requires a qualified, competent electrician. Where PoE is used to power fixed building services such as lighting or access control, the entire scheme should be designed and signed off by someone competent across both BS 7671 and BS EN 50173/50174.",
    },
    {
      question: 'Does BS 7671 apply to PoE cabling?',
      answer:
        'Yes. BS 7671:2018+A4:2026 Section 716 (ELV DC power distribution using balanced IT cables) is the primary reference and applies to all PoE installations — cameras, access control, APs, and lighting. Reg 716.521.101 sets the cable-category requirements (Cat5 through Cat7A), and Reg 716.2 normatively references the connector acceptance tests (BS EN 60512-99-001 Test 99a and BS EN 60512-9-3 Test 9c). Section 715 applies in addition where PoE powers fixed luminaires. Section 528 (segregation) applies where PoE cabling shares containment with low-voltage circuits. The mains supply feeding the PSE falls fully within BS 7671 in all cases.',
    },
    {
      question: 'What is the voltage drop limit on a PoE Type 4 link?',
      answer:
        'IEEE 802.3bt defines the voltage drop limit indirectly: the PSE outputs 52–57V DC at its port, and the PD must operate down to 41.1V DC at its input. The available budget is therefore approximately 10–16V DC across the cable. On a 100m Cat6a Type 4 channel at full load (around 1.7A total split across four pairs), expected voltage drop is approximately 3.6V DC — well within budget. Cat5e and long runs in warm bundles reduce the margin and should be modelled before installation.',
    },
    {
      question: 'Can I use Cat5e for PoE Type 4?',
      answer:
        'IEEE 802.3bt permits it on paper, but it is not recommended in practice. Cat5e has higher loop resistance (24 AWG conductors), which translates to more I²R heating per metre, more cable-bundle warming, and reduced voltage-drop margin at long runs. For Type 4 90W, Cat6a (23 AWG) is the realistic baseline — full 100m runs achievable, better thermal performance in bundles, and headroom for future upgrades.',
    },
    {
      question: 'How many PoE Type 4 cables can I put in one bundle?',
      answer:
        'BS EN 50174-2 does not prescribe a single number; the answer depends on PoE class mix, ambient temperature, containment type and cable jacket rating. A conservative working baseline for Type 4-dominant bundles is 24 cables per bundle, with hook-and-loop ties (not tight cable ties), in perforated tray with airflow, at ambient temperatures below 30°C. Plant rooms, risers and tightly bundled trunking should reduce this further.',
    },
    {
      question: 'Is PoE Type 4 a fire risk?',
      answer:
        'A correctly designed, properly installed PoE Type 4 channel is not a fire risk. The fire-risk scenarios are all installation failures: undersized cables (Cat5e or worse) carrying maximum current, oversized bundles with no airflow, copper-clad aluminium cable, poor terminations creating hot spots, or unprotected outdoor runs taking transient surges. Each of these is addressable through correct cable selection, BS EN 50174 bundle planning, surge protection, and clean terminations. The IEEE 802.3bt standard itself includes safe-disconnect detection to prevent arcing under load.',
    },
    {
      question: 'How does PoE Type 4 differ from PoE+ Type 2 in practice?',
      answer:
        'Three differences matter on site. First, Type 4 uses all four twisted pairs to carry power, where Type 2 used only two — so all eight conductors are live. Second, Type 4 delivers up to 90W where Type 2 delivers 30W — roughly triple the power, and roughly four times the I²R heating per metre at full load. Third, Type 4 requires a 4PPoE-capable PSE and a Cat6a-or-better channel for reliable 100m operation, where Type 2 was happy on Cat5e. Migration from Type 2 to Type 4 is therefore rarely a like-for-like swap.',
    },
    {
      question: 'Do I need separate certificates for the PoE side and the BS 7671 side?',
      answer:
        'Yes — they are different certifications, recorded on different documents. The BS 7671 side (mains supply to the PSE) is recorded on an Electrical Installation Certificate or Minor Works Certificate. The structured cabling side is recorded on a BS EN 50346 channel or permanent-link certificate produced by a cable tester such as a Fluke DSX. The handover pack should include both, and where PoE powers fixed lighting under BS 7671 Section 715, the designer should issue a single design declaration that ties them together.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/poe-lighting-guide',
      title: 'PoE Lighting Guide',
      description:
        'Design and installation of PoE-powered LED lighting for commercial, education and healthcare buildings — power budgeting…',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/section-715-elv-lighting-a4-2026',
      title: 'Section 715 ELV Lighting (A4:2026)',
      description:
        'The BS 7671:2018+A4:2026 update to extra-low voltage lighting installations, source isolation requirements and SELV/PELV declarations.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/structured-cabling-bs-en-50173-electricians',
      title: 'Structured Cabling (BS EN 50173)',
      description:
        'The BS EN 50173 series for UK electricians — channel and link specifications, Cat5e through Cat8, and integration with BS 7671 installations.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/bs-en-50174-data-cable-installation',
      title: 'BS EN 50174 Data Cable Installation',
      description:
        'Installation rules for data cabling inside and outside buildings — segregation, bundle sizing, containment and remote-powering considerations.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/smart-home-lighting-installation',
      title: 'Smart Home Lighting Installation',
      description:
        'Residential smart lighting design, including PoE-powered scenes, KNX, DALI and mesh wireless options for new builds and renovations.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/commercial-lighting-guide',
      title: 'Commercial Lighting Guide',
      description:
        'Commercial lighting design under BS 7671 — load assessment, emergency lighting, controls, and where PoE-powered luminaires fit the brief.',
      icon: 'Building2',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Design PoE Type 4 schemes properly, the first time',
  ctaSubheading:
    'The Elec-Mate Electrician tier includes PoE power-budget tooling, BS 7671 supply-circuit design, structured-cabling certificate templates and the full EIC / Minor Works / EICR generator suite — everything needed to design, install, and document a compliant PoE Type 4 90W installation. 7-day free trial, cancel anytime.',
};
