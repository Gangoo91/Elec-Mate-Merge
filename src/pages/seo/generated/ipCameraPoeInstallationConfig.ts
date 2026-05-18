import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// BS EN 62676 (Video surveillance systems), BS EN 50132, IEEE 802.3at/bt (PoE),
// BS EN 50174 (cable installation) and the Surveillance Camera Code of Practice
// (Protection of Freedoms Act 2012).

const published = '2026-05-17';
const modified = '2026-05-18';

export const ipCameraPoeInstallationConfig: GeneratedGuideConfig = {
  pagePath: '/guides/ip-camera-poe-installation-uk',
  title:
    'IP Camera PoE Installation Guide (UK) — CCTV over',
  description:
    'A definitive UK installer guide to IP camera systems powered over Ethernet — PoE class selection under IEEE 802.3at/bt, NVR PoE switch sizing…',
  datePublished: published,
  dateModified: modified,
  readingTime: 18,
  badge: 'CCTV & Security Systems',
  badgeIcon: 'Camera',
  breadcrumbLabel: 'IP Camera PoE Installation UK',
  heroPrefix: 'IP Camera PoE',
  heroHighlight: 'Installation Guide (UK)',
  heroSuffix: '— CCTV over Power-over-Ethernet',
  heroSubtitle:
    'Power-over-Ethernet has become the default carriage for modern IP CCTV — one Cat6 cable carries video, audio, PTZ control, configuration and DC power to each camera, with no need for a local 230 V supply at the camera position. This guide is a practical, regulation-anchored walk-through for UK electricians and integrators: PoE class selection, NVR switch sizing, cable selection and routing, segregation from mains under BS 7671 Section 528 and Section 715, surge protection at exposed outdoor cameras, bonding of metallic housings, GDPR and Surveillance Camera Code of Practice duties, and the cybersecurity hygiene that turns a compliant install into a defensible install.',
  keyTakeaways: [
    'PoE delivers DC power and Ethernet data over the same Cat6/Cat6a twisted-pair cable, governed by IEEE 802.3af (Type 1, up to 15.4 W), 802.3at (Type 2, up to 30 W), and 802.3bt (Type 3, up to 60 W and Type 4, up to 90 W at the PSE port).',
    'Choose PoE class against the worst-case load: a fixed-lens 4MP bullet may sit happily on Type 1; a PTZ dome with heater, wiper and IR illumination almost always needs Type 2 or Type 3, and the NVR switch must be sized accordingly.',
    'CCTV cabling and termination is in scope of BS EN 50174 (information technology cable installation) and BS EN 62676 (video surveillance systems for security applications). BS 7671 Section 528 governs segregation of ELV PoE cabling from LV mains; BS 7671 Section 715 covers ELV lighting and is informative for ELV power.',
    'Outdoor cameras require an IP66 environmental rating (dust-tight and resistant to powerful water jets) at minimum, and an IK10 impact rating for any position reachable by hand. The cable used outdoors must be UV-stable, and any direct-buried run must be a gel-filled outdoor-rated Cat6 in conduit.',
    'Lightning and surge protection is not optional on exposed pole-mounted or rooftop cameras. Fit a Cat6 surge protection device (SPD) at each end of the external run — one at the camera, one at the NVR PoE switch — bonded to the main earthing terminal.',
    'CCTV in the UK is regulated by the Data Protection Act 2018, UK GDPR, and (for relevant authorities) the Surveillance Camera Code of Practice under the Protection of Freedoms Act 2012. Notice signage is mandatory wherever recording takes place, and field of view must not overlook neighbouring property without lawful basis.',
    'Default-password IP cameras are routinely compromised within minutes of internet exposure. A compliant UK install changes every default password, places cameras on a segregated VLAN, and disables UPnP and direct WAN exposure of the NVR.',
  ],
  sections: [
    {
      id: 'why-poe',
      heading: 'Why PoE Has Won the IP CCTV Market',
      tocLabel: 'Why PoE for CCTV',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Twenty years ago, a typical commercial CCTV installation needed two separate cable runs to every camera — a 75-ohm coaxial for the analogue composite video signal and a 230 V mains drop (or, more commonly, a 12 V DC fly-lead from a centralised PSU). Each camera position required either a local fused spur or a long DC run with voltage-drop headaches, and every relocation meant pulling new cable.',
        },
        {
          type: 'paragraph',
          text:
            'Modern IP CCTV collapses both runs into a single Cat6 or Cat6a UTP cable carrying Ethernet data plus DC power under the Power-over-Ethernet (PoE) standards published by the IEEE. The camera draws its working voltage from the same eight-conductor cable that streams its H.265 video back to the Network Video Recorder (NVR). The result is faster installs, no 230 V at exposed external positions, and a single switch that powers and records the entire system.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'PoE is an ELV system — but it still sits inside BS 7671',
          text:
            'A PoE feed sits at 44–57 V DC at the PSE port (the NVR or PoE switch). This is Extra-Low Voltage (ELV) under BS 7671 and is below the threshold for the shock-protection requirements that apply to LV circuits. It is, however, still in scope of BS 7671 Section 528 (segregation) when it shares containment with LV cabling, and the structured cabling is in scope of BS EN 50174.',
        },
      ],
    },
    {
      id: 'poe-classes',
      heading: 'PoE Classes Explained — Type 1, 2, 3 and 4',
      tocLabel: 'PoE class selection',
      blocks: [
        {
          type: 'paragraph',
          text:
            'IEEE 802.3 has now published four generations of PoE, each colloquially named differently. Choosing the wrong class is the single most common reason a CCTV install fails to commission: the camera negotiates an inadequate budget, the IR illuminator dims, the heater never engages, and the system "works fine" in the showroom but goes dark on the first cold night on site.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Type 1 — IEEE 802.3af, 2003. Up to 15.4 W at the PSE port, ~12.95 W guaranteed at the Powered Device (PD). Suitable for fixed-lens bullet cameras, indoor minidomes, simple analytics cameras with no heater.',
            'Type 2 — IEEE 802.3at, 2009, "PoE+". Up to 30 W at the PSE, ~25.5 W at the PD. The everyday workhorse for outdoor bullets and turrets with IR, heaters and microphones. The default class to specify for a UK external install unless you have explicit reason not to.',
            'Type 3 — IEEE 802.3bt, 2018, "PoE++" or "4PPoE" (four-pair PoE). Up to 60 W at the PSE, ~51 W at the PD. Required for most PTZ domes with heater + wiper + extended IR, and for many multi-sensor multi-imager cameras.',
            'Type 4 — IEEE 802.3bt, 2018, "Hi-PoE". Up to 90 W at the PSE, ~71 W at the PD. Reserved for high-performance PTZs, thermal imaging cameras, and multi-sensor 360° devices. The same physical RJ45 connector — but only Cat6a or Cat6 cabling is realistically suitable because of conductor heating at this current.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Always check the camera datasheet for the worst-case power draw — most manufacturers publish a "normal" and a "max" figure, and the max figure includes IR illuminator at full intensity plus heater. Specify the next class above the max, not the next class above the normal. For more on the upper end of the standard, see our [PoE++ Type 4 90 W installation guide](/guides/poe-plus-plus-type-4-90w-installation).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Voltage drop is real — even on PoE',
          text:
            'PoE is rated to a maximum cable run of 100 m of channel length under IEEE 802.3 (which is 90 m of permanent link plus two 5 m patch leads). At the upper power classes (Type 3 and Type 4), conductor heating becomes the limit before voltage drop does. Cat6a 23 AWG copper is strongly preferred for any run above 60 m carrying Type 2 or higher — see our [Cat6 vs Cat6a current rating PoE guide](/guides/cat6-cat6a-current-rating-poe).',
        },
      ],
    },
    {
      id: 'nvr-switch-sizing',
      heading: 'NVR and PoE Switch Sizing',
      tocLabel: 'NVR & switch sizing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'On smaller systems (up to 16 channels), the NVR is a single box with built-in PoE ports — one cable per camera, no separate switch. On larger systems the NVR records but does not power: cameras are fed from a separate managed PoE switch and the NVR sits on the local LAN to pull the streams.',
        },
        {
          type: 'paragraph',
          text:
            'Sizing the PoE budget is the first design step. Add up the worst-case PoE class for every camera, multiply by the rated PD draw, and compare against the switch\'s total PoE budget — not its port count. A 16-port switch labelled "PoE+ capable" might only have a 180 W total budget — fine for sixteen Type 1 cameras but only six Type 2 cameras at full load.',
        },
        {
          type: 'list',
          items: [
            'Channel count — match the NVR to the number of cameras now, plus a 25–50% allowance for future expansion. Licence costs for additional channels can be significant; oversizing is usually cheaper than replacing.',
            'Storage — Total stream bitrate (Mbps) × 86,400 s ÷ 8 = daily GB. A typical 4MP H.265 stream at 4 Mbps generates ~43 GB/day. Multiply by retention days (commonly 28–90 in the UK) and apply a 15% file-system overhead.',
            'PoE budget — sum of worst-case PD watts plus 20% headroom. Do not exceed 80% of the switch\'s rated total PoE budget at any time.',
            'Bandwidth — IP cameras stream continuously to the NVR. A 16-camera 4MP system at 4 Mbps each is 64 Mbps inbound to the NVR — gigabit uplink is mandatory.',
            'RAID — for compliance-grade retention, use RAID 1 (mirror) on small NVRs or RAID 5/6 on larger systems. Single-disk recorders can lose evidence on a single drive failure.',
            'UPS — at minimum, an in-line UPS to ride through brown-outs and graceful-shutdown the NVR. Loss of power mid-write can corrupt the file system.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Managed switches give you VLAN isolation for free',
          text:
            'For any commercial install, specify a managed PoE switch (e.g. with 802.1Q VLAN support) over an unmanaged one. The cost difference is modest and you get per-port PoE class control, VLAN tagging for CCTV/IT separation, and SNMP for remote monitoring. We come back to VLAN segmentation in the cybersecurity section below.',
        },
      ],
    },
    {
      id: 'indoor-vs-outdoor',
      heading: 'Indoor vs Outdoor — IP and IK Ratings',
      tocLabel: 'IP and IK ratings',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Two separate rating systems govern camera body selection in the UK: IP (Ingress Protection, BS EN 60529) and IK (Impact Protection, BS EN 62262). The two are independent — an IP67 camera may have no meaningful impact protection — and both must be specified.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Indoor, low-traffic — IP30 is generally adequate (protected against solid objects > 2.5 mm). No water protection needed. IK04–IK07 for impact in offices, retail and corridors.',
            'Indoor, wet or wash-down — IP65 or IP66 for kitchens, food processing, leisure centres. IK08 minimum for sports halls and changing rooms.',
            'Outdoor, soffit-mounted or under canopy — IP66 (dust-tight, powerful water jets). IK08 if not reachable, IK10 if reachable from ground level (within 2 m).',
            'Outdoor, fully exposed — IP66 minimum, IP67 preferred (temporary submersion). IK10 mandatory for any position reachable from ground level or window sills.',
            'Pole-top, marine or coastal — IP66/IP67 with marine-grade housing (316 stainless or anodised aluminium). Salt-mist resistance to BS EN 60068-2-52 is the industry benchmark.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'IK10 is the highest impact rating in BS EN 62262 — resistance to a 5 kg mass dropped from 400 mm, roughly a determined kick or a heavy thrown object. IK10 is the standard for any camera in a custody suite, school corridor, or external position at ground level.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'IP and IK ratings only hold if the install respects them',
          text:
            'An IP66 dome with a poorly sealed gland or with the manufacturer\'s rubber bung still in the spare cable entry is no longer IP66. Use the supplied gland for every cable entry, blank off unused entries, and orient cable entries downwards or use drip loops. The dome is only as watertight as the worst seal on it.',
        },
      ],
    },
    {
      id: 'cable-selection',
      heading: 'Cable Selection — Cat6, Cat6a and Outdoor-Rated Variants',
      tocLabel: 'Cable selection',
      blocks: [
        {
          type: 'paragraph',
          text:
            'PoE shares a four-pair UTP cable between data and DC power. Cable category, jacket compound and shield matter more than on a non-powered data run, because conductor temperature rises with PoE current and the cable spends years in conditions the indoor data cable was never designed for.',
        },
        {
          type: 'list',
          items: [
            'Cat6 23 AWG U/UTP — the everyday choice for Type 1 and Type 2 PoE indoor runs. Solid-core, eight-conductor, 100 m channel maximum. Adequate for cameras up to ~30 W PD draw.',
            'Cat6a 23 AWG U/FTP or F/FTP — preferred for Type 3 and Type 4 PoE, for runs over 60 m at any class, and wherever EMC immunity is a concern (factories, plant rooms). Lower conductor heating, lower attenuation at 10 GbE.',
            'Outdoor-rated Cat6 (PE jacket, UV-stable) — black polyethylene outer jacket for external aerial or under-eaves runs. UV-stable to at least 10 years of UK weathering. Do not use indoor PVC cable on external runs.',
            'Direct-buried Cat6 (gel-filled) — water-blocking gel between conductors, double jacketed, suitable for buried duct or direct-buried runs to gate-house and perimeter cameras. Always pull through duct rather than direct-bury where practicable.',
            'LSZH (Low Smoke Zero Halogen) Cat6 — mandatory in escape routes, lift shafts, public buildings, hospitals, schools and other locations where smoke emission and acid gas are a life-safety concern.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Solid-core cabling is for fixed permanent links — wall-to-wall, in conduit, in tray. Stranded patch cord is for short flexible jumpers at each end. Do not run stranded cable as a permanent link: it has higher attenuation and will not pass a permanent link test.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'BS EN 50174 — the cable installation standard',
          text:
            'BS EN 50174 governs the planning and installation of information technology cabling, including bend radius, pulling tension, segregation from power, and grounding of screened systems. Treat it as the structured cabling equivalent of BS 7671 — see our [BS EN 50174 data cable installation guide](/guides/bs-en-50174-data-cable-installation) for the full standard breakdown.',
        },
      ],
    },
    {
      id: 'routing-and-segregation',
      heading: 'Routing and Segregation from Mains',
      tocLabel: 'Routing & segregation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'PoE is ELV, but it shares containment and routes with LV mains in almost every commercial building. BS 7671 Section 528 governs the proximity of cables of different voltage bands, and BS EN 50174-2 gives the structured cabling separation distances against power circuits — the two together drive the routing design.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Use a dedicated CCTV containment route — separate tray, trunking or basket — wherever practicable. This simplifies segregation, EMC and future maintenance.',
            'Where CCTV cabling shares containment with LV cables, the LV cables must have insulation rated for the highest voltage present, or there must be physical separation by an earthed metallic partition (BS 7671 528.1).',
            'BS EN 50174-2 separation distances — minimum 50 mm separation between unscreened data cable and LV power, reducing to 0 mm where the data cable is screened and the power cable is in a metal containment system. Crossings should be at 90°.',
            'Conduit and trunking — outdoor runs should be in galvanised steel conduit or UV-stable PVC conduit. Avoid running PoE cable loose externally; it sags, ages, and presents a snagging hazard.',
            'Bend radius — Cat6 minimum installed bend radius is 4× cable diameter (typically 25–30 mm). Tight 90° bends at containment exits will degrade NEXT and Return Loss; use radius pieces.',
            'Cable ties — do not over-tighten. Hook-and-loop ties or loose plastic ties only; a deformed cable jacket means deformed conductor geometry and out-of-spec performance.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'BS 7671 Section 715 covers Extra-Low Voltage Lighting Installations, and its principles are informative for ELV PoE power distribution where the camera is in essence an ELV-powered device on a structured cabling system. Treat the PoE switch as the ELV source and apply Section 715\'s requirements for protection against electric shock by SELV/PELV separation.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not run PoE cables in domestic ring main containment',
          text:
            'On retrofits to existing residential properties, do not push a Cat6 cable into the same containment as the existing 230 V ring final. Even if the proximity is acceptable under Section 528, the act of pulling against existing live cabling is a hazard, and the segregation will be impossible to evidence at certification. Pull a dedicated route.',
        },
      ],
    },
    {
      id: 'lightning-surge',
      heading: 'Lightning and Surge Protection',
      tocLabel: 'Lightning & surge',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Any external cable leaving the equipotential zone of the building is a potential surge entry path. A direct lightning strike on or near an external CCTV camera couples thousands of volts into the Cat6 cable and follows it back to the NVR, the LAN switch, and the rest of the network. The damage bill from a single unprotected camera position can exceed the whole installation cost.',
        },
        {
          type: 'list',
          items: [
            'Fit a Cat6 surge protection device (SPD) at each end of every external run — one at the camera, one at the PoE switch port. Devices are typically pass-through RJ45 modules with a side bonding lead.',
            'Bond the SPD body and the metallic camera housing to the building\'s main earthing terminal (MET) via a dedicated equipotential bonding conductor — 6 mm² minimum, sized to BS 7671 chapter 54.',
            'Bond the camera pole or mast separately if exposed — a metal pole on a rooftop is itself an air termination and should be bonded as part of the structure\'s lightning protection system if one is present.',
            'BS EN 62305 — the UK lightning protection standard. A formal risk assessment under BS EN 62305-2 will determine whether a structural LPS is required; if one is, the CCTV cabling and SPDs must coordinate with it.',
            'Coordinate SPDs across voltage bands — the NVR\'s mains supply should also be protected by a Type 2 SPD on the LV side under BS 7671 chapter 44.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Surge protection is not optional on rooftop cameras',
          text:
            'Insurers increasingly refuse to pay out on CCTV equipment loss where the installer cannot evidence Cat6 SPDs at exposed positions. The cost of SPDs is trivial against the cost of replacing a 32-camera NVR and the network switch beside it.',
        },
      ],
    },
    {
      id: 'bonding',
      heading: 'Bonding of Outdoor Camera Housings',
      tocLabel: 'Camera housing bonding',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An external metallic camera housing is an exposed-conductive-part if it is liable to become live under fault conditions and is accessible. PoE is ELV, but cable jackets can degrade, induced surge can elevate the chassis, and a faulty heater element could couple LV onto the housing. The defensible position is to bond every metallic external housing to the building\'s MET.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Use a dedicated 4 mm² (minimum) green/yellow PVC-insulated bonding conductor from the camera mounting bracket back to the nearest earthed structure or directly to the MET.',
            'Where the camera is on a metal pole, bond the pole at its base to the MET. The camera bracket bonds to the pole, the pole bonds to MET, and the camera shares the equipotential zone.',
            'Use a stainless steel or galvanised crimp ring under a serrated washer; do not rely on paint-piercing alone for an external bond — visual inspection cannot confirm the contact.',
            'Label the bond at the camera end with a "Safety Electrical Connection — Do Not Remove" label to BS 951.',
            'On non-metallic housings (polycarbonate domes), bonding is not required — but the SPD bonding lead at the cable entry remains mandatory.',
          ],
        },
      ],
    },
    {
      id: 'gdpr-and-cop',
      heading: 'GDPR and the Surveillance Camera Code of Practice',
      tocLabel: 'GDPR & CoP',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A CCTV camera that records identifiable individuals is, in UK law, processing personal data. The data protection framework — UK GDPR and the Data Protection Act 2018 — applies in full, and for "relevant authorities" (police, local authorities, certain other public bodies) the Surveillance Camera Code of Practice issued under the Protection of Freedoms Act 2012 also applies.',
        },
        {
          type: 'list',
          items: [
            'Lawful basis — the data controller (usually the building owner or business operator) must identify a lawful basis for the processing. For private commercial premises, legitimate interest is the most common basis; for employee monitoring, more stringent requirements apply.',
            'Necessity and proportionality — the surveillance must be necessary to the purpose. A camera covering an entire neighbour\'s garden to "watch the back path" is unlikely to be proportionate.',
            'Notice signage — clear, prominent signage at every entrance and at the perimeter of the recorded zone. The signage must name the data controller and provide contact information for data subject access requests.',
            'Retention — recordings should be retained no longer than necessary. 28 days is a common default; longer retention requires explicit justification.',
            'Data subject access requests — individuals have a right to a copy of recordings of themselves. A 30-day response window applies under UK GDPR.',
            'Domestic exemption — purely domestic CCTV (your own back garden, no view of anyone else\'s property or the highway) is exempt from UK GDPR. The exemption is narrow and easily lost: a camera that captures a section of pavement or a neighbour\'s garden no longer qualifies.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'The installer\'s role is technical, not legal',
          text:
            'The data controller is responsible for compliance, not the installer. But the installer is expected to advise on field of view, signage, and retention as part of system design — and a system that physically cannot be made compliant (e.g. fixed camera angle overlooking neighbour) is a design failure. Document the advice given.',
        },
      ],
    },
    {
      id: 'field-of-view',
      heading: 'Field of View and Avoiding Overlooking',
      tocLabel: 'Field of view',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS EN 62676-4 sets out four operational requirement (OR) categories for CCTV image quality: Monitor, Detect, Recognise, Identify. The pixels per metre of subject required rises sharply — 25 px/m to detect, 125 px/m to recognise, 250 px/m to identify. Choosing a camera and lens combination that matches the OR is the design task.',
        },
        {
          type: 'list',
          items: [
            'Survey the position first — measure distance to subject, available mounting height, available mounting angles, and the boundary of the property.',
            'Calculate pixels per metre at the furthest point of interest using sensor pixel pitch and lens focal length. Manufacturer field-of-view calculators are usually accurate.',
            'Restrict the field of view to the property boundary wherever possible. Where this is not possible (e.g. a doorbell camera necessarily capturing the pavement), use the camera\'s privacy mask feature to black out neighbouring property.',
            'Document the field of view in the operational requirement document — annotated photographs from the proposed camera position are the practical standard.',
            'Be aware of audio recording — many IP cameras have built-in microphones. Audio recording in public-facing positions is much more legally sensitive than video and should be disabled by default.',
          ],
        },
      ],
    },
    {
      id: 'cybersecurity',
      heading: 'Cybersecurity — Default Passwords, VLANs and Internet Exposure',
      tocLabel: 'Cybersecurity',
      blocks: [
        {
          type: 'paragraph',
          text:
            'IP cameras have historically been one of the most exposed device classes on the internet. Default credentials, unpatched firmware and UPnP-assisted WAN exposure produced the largest botnets in history (notably Mirai), assembled almost entirely from compromised cameras and NVRs. A defensible UK install treats cybersecurity as a first-class design concern.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Change every default password before the camera is connected to any network. Use a unique password per camera, generated by a password manager, stored against the asset register.',
            'Disable UPnP on the customer\'s router. Do not allow the NVR to "automatically" open WAN ports for remote viewing.',
            'Place the CCTV system on its own VLAN with no internet access. Remote viewing should be via the manufacturer\'s authenticated relay service (P2P cloud) or via a customer-managed VPN — never via a direct WAN port forward.',
            'Apply firmware updates at commissioning and as part of the annual service visit. Many manufacturers publish security advisories monthly.',
            'Disable any services not in use — ONVIF, RTSP, FTP, SMB, Telnet. The narrowest attack surface is the safest.',
            'Document the customer\'s administrator credentials in a sealed handover envelope; do not retain customer credentials on installer infrastructure.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Some manufacturers are banned from UK government use',
          text:
            'The UK Government has, since 2022, instructed central government departments to remove cameras manufactured by certain Chinese state-linked suppliers from sensitive sites, citing national security concerns. The list of restricted suppliers has expanded since. Check the latest National Cyber Security Centre and Cabinet Office guidance before specifying equipment for any public-sector or critical national infrastructure site.',
        },
      ],
    },
    {
      id: 'commissioning-testing',
      heading: 'Commissioning and Testing',
      tocLabel: 'Commissioning & testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A correctly installed PoE CCTV system is tested end-to-end before handover: structured cabling as a permanent link to BS EN 50346, PoE delivery verified at each camera, the IP layer via a managed-switch report, the video stream at the NVR with bit-rate and frame-rate logging, and the user experience by walk-through with the client.',
        },
        {
          type: 'list',
          items: [
            'Cable certification — every permanent link tested with a Cat6 / Cat6a certified tester (Fluke DSX or equivalent). Pass / fail report saved to the project file.',
            'PoE handshake — confirm correct PoE class is negotiated at each port via the managed switch interface. Log actual delivered wattage against expected.',
            'IP addressing — fixed IP addresses on the camera VLAN, documented in the handover pack. No DHCP for cameras (lease expiry can drop the NVR).',
            'Stream verification — confirm continuous recording at each camera at the design bitrate and frame rate for 24 hours before handover.',
            'Privacy mask audit — walk through every camera position with the client present and confirm no neighbouring property or restricted area is visible. Sign off in writing.',
            'Surge protection check — verify SPDs are bonded and that the bond is electrically continuous to the MET (test with a low-resistance ohmmeter).',
            'Lighting check — verify IR illumination engages at dusk and that night-time images meet the operational requirement at the furthest point of interest.',
            'Handover pack — as-built schematic, IP address list, default-changed credentials in sealed envelope, GDPR notice template, customer training record, annual service schedule.',
          ],
        },
      ],
    },
    {
      id: 'elec-mate-cctv',
      heading: 'Specifying and Quoting CCTV in the Elec-Mate App',
      tocLabel: 'In-app CCTV tools',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Producing a defensible CCTV quotation — PoE budget, NVR sizing, storage, GDPR notice, cable schedule — is a half-day exercise on a clean sheet of paper. Elec-Mate brings the calculation, the standards references, and the document generation into a single mobile flow that produces a client-ready quotation, a method statement, and a handover pack from a short site survey interview.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'PoE budget calculator — enter the camera schedule, choose class per camera, and the calculator returns the minimum PoE switch budget with 20% headroom.',
            'Storage calculator — bitrate × camera count × retention days = required NVR storage, with RAID overhead applied.',
            'Cable schedule — auto-generates the run list, with category, jacket type, and length, ready for the cable order.',
            'GDPR notice template — fillable PDF compliant with the Information Commissioner\'s Office CCTV code of practice.',
            'Method statement — site-specific RAMS aligned to CDM 2015 covering working at height for external camera positions and segregation from LV mains.',
            'Quotation — labour, materials, contingency, VAT — exported as a branded PDF and ready to send.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Included on the Electrician tier',
          text:
            'The CCTV quotation and PoE design tools are included with the Elec-Mate Electrician subscription alongside the EICR, EIC and Minor Works Certificate tools, and the full BS 7671 calculator suite. 7-day free trial, cancel anytime.',
        },
      ],
    },
  ],
  howToHeading: 'How to Install an IP Camera PoE System (UK)',
  howToDescription:
    'The end-to-end installer workflow from site survey to handover — anchored to IEEE 802.3at/bt, BS EN 62676, BS EN 50174, BS 7671:2018+A4:2026 and UK GDPR.',
  howToSteps: [
    {
      name: 'Carry out the operational requirement survey',
      text:
        'Walk the site with the client. Identify camera positions, distance to subject, mounting heights, available containment routes, and boundary lines. For each position, record the operational requirement (Monitor, Detect, Recognise, Identify) under BS EN 62676-4 and choose a camera and lens combination that meets the required pixels per metre at the furthest point of interest.',
    },
    {
      name: 'Specify PoE class and size the NVR switch',
      text:
        'For each camera, identify the worst-case PoE class (Type 1, Type 2, Type 3 or Type 4 under IEEE 802.3at/bt) from the manufacturer datasheet. Sum the worst-case PD watts and add 20% headroom. Specify a managed PoE switch or NVR whose total PoE budget exceeds the sum, and whose port count matches the camera count plus a future allowance.',
    },
    {
      name: 'Design the cable routes and verify segregation',
      text:
        'Plan dedicated CCTV containment wherever practicable. Where containment is shared with LV mains, apply BS 7671 Section 528 segregation rules and the BS EN 50174-2 separation distances. Specify outdoor-rated, UV-stable Cat6 (or gel-filled for direct burial) on external runs, and LSZH Cat6 in escape routes. Keep all permanent links within 90 m to stay inside the IEEE 802.3 100 m channel.',
    },
    {
      name: 'Install with bonding and surge protection',
      text:
        'Install cameras to manufacturer instruction with the correct IP and IK rating for the position. Bond metallic outdoor housings to the MET via a 4 mm² minimum equipotential bonding conductor. Fit Cat6 SPDs at both ends of every external run and bond the SPD body to the MET. Coordinate with any existing BS EN 62305 lightning protection system on the structure.',
    },
    {
      name: 'Commission with cable certification, PoE verification and stream test',
      text:
        'Certify every permanent link with a Cat6/Cat6a certified tester to BS EN 50346. Verify PoE class negotiation and delivered wattage at each port via the managed switch interface. Confirm continuous 24-hour recording at the design bitrate and frame rate at each camera. Walk through every field of view with the client and apply privacy masks where neighbouring property is captured.',
    },
    {
      name: 'Harden security and complete the handover pack',
      text:
        'Change every default password to a unique manager-managed credential. Place all cameras and the NVR on a segregated VLAN. Disable UPnP, Telnet, FTP and any unused services. Apply current firmware. Produce the handover pack: as-built schematic, IP address list, sealed credentials envelope, GDPR notice template, customer training record, annual service schedule.',
    },
  ],
  faqs: [
    {
      question: 'Do I need to be a registered electrician to install an IP CCTV system in the UK?',
      answer:
        'There is no specific licence to install CCTV in the UK, but if you are installing on commercial premises you will typically need to be a member of a recognised scheme such as the NSI (National Security Inspectorate) or SSAIB (Security Systems and Alarms Inspection Board) to satisfy the customer\'s insurer. If the install involves any 230 V work — for example wiring a fused spur for the NVR — that part is notifiable under Part P in domestic dwellings and must be carried out by a competent person or signed off by Building Control.',
    },
    {
      question: 'How do I choose between PoE, PoE+ and PoE++ for a camera?',
      answer:
        'Read the camera datasheet for the maximum power draw, not the typical. Include the IR illuminator at full power and any heater. Specify the next PoE class above that worst-case figure. As a rule of thumb: indoor fixed-lens cameras with no heater work on Type 1 (15.4 W); outdoor bullets and turrets with IR and heater need Type 2 (30 W); PTZ domes and multi-sensor cameras typically need Type 3 (60 W); thermal and high-performance multi-imager cameras need Type 4 (90 W).',
    },
    {
      question: 'What cable should I use for an outdoor PoE camera run?',
      answer:
        'Outdoor-rated Cat6 with a UV-stable polyethylene black jacket is the everyday standard. For Type 3 or Type 4 PoE, or for any run over 60 m at any class, step up to Cat6a 23 AWG to manage conductor heating. For direct-buried runs to gate-house or perimeter cameras, use gel-filled water-blocked outdoor Cat6 in conduit. Do not use indoor PVC cable on external runs — the jacket will craze under UV within months.',
    },
    {
      question: 'Do I need surge protection on every outdoor camera?',
      answer:
        'Yes, where the cable run leaves the building\'s equipotential zone. Fit a Cat6 surge protection device at the camera end and a second SPD at the PoE switch end of every external run, with the SPD body bonded to the main earthing terminal via a 6 mm² conductor. On exposed rooftop or pole-top positions, this is essential and routinely required by insurers; on low-level under-soffit positions immediately above a bonded gutter, the risk is lower but the cost of fitting an SPD is trivial against the cost of replacing the NVR.',
    },
    {
      question: 'Is a separate VLAN really necessary for CCTV?',
      answer:
        'On any commercial install, yes. CCTV equipment has historically been a primary entry point for network intrusion — default credentials, unpatched firmware and UPnP exposure have produced the largest botnets in history. A managed PoE switch with the CCTV VLAN tagged and routed only to the NVR (no internet access, no LAN access) is the modern minimum. Remote viewing should go via the manufacturer\'s authenticated relay service or a customer-managed VPN, never via a WAN port forward.',
    },
    {
      question: 'How long should I keep CCTV recordings under UK GDPR?',
      answer:
        'No longer than necessary for the purpose. 28 days is a widely used default in UK commercial CCTV; some sectors (financial services, transport, certain critical infrastructure) require 90 days; very few legitimate purposes justify more than 90 days. Long-term retention requires explicit documented justification and a higher level of security around the stored data. Always configure the NVR\'s automatic deletion policy to enforce the retention period; "we keep it until the disk fills up" is not a defensible retention policy.',
    },
    {
      question: 'Can a doorbell camera or front-of-house camera capture the pavement?',
      answer:
        'Practically yes, legally with care. If the camera captures any area beyond the boundary of the property (pavement, road, neighbour\'s garden), the domestic exemption from UK GDPR is lost, and the householder becomes a data controller in their own right. They must put up notice signage, register with the ICO if processing for any purpose outside purely personal use, and respond to data subject access requests. As the installer, advise the client of this in writing during system design and use privacy masks to minimise the captured area.',
    },
    {
      question: 'Does BS 7671 apply to PoE wiring?',
      answer:
        'BS 7671:2018+A4:2026 governs electrical installations in the UK, and although PoE is an ELV system fed from a SELV or PELV source (the PoE switch), it is still in scope where it shares containment with LV cabling — Section 528 segregation rules apply. The structured cabling itself is in scope of BS EN 50174 rather than BS 7671 for its construction, but the 230 V supply to the NVR, the bonding of metallic camera housings, and any LV surge protection at the NVR are all firmly within BS 7671 and should be certified accordingly.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/cctv-installation-electrical',
      title: 'CCTV Installation — The Electrician\'s Guide',
      description: 'The full installer-side guide to specifying, installing and commissioning CCTV systems in the UK — analogue and IP, residential and commercial.',
      icon: 'Camera',
      category: 'Guide',
    },
    {
      href: '/guides/cctv-installation-cost',
      title: 'CCTV Installation Cost',
      description: 'UK pricing benchmarks for residential and commercial CCTV installs — labour, materials, NVR storage and ongoing service.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/poe-plus-plus-type-4-90w-installation',
      title: 'PoE++ Type 4 (90 W) Installation',
      description: 'The upper end of the IEEE 802.3bt standard — Type 4 90 W PoE for thermal imagers, multi-imager cameras and high-performance PTZ domes.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/cat6-cat6a-current-rating-poe',
      title: 'Cat6 vs Cat6a Current Rating (PoE)',
      description: 'Why Cat6a is required for Type 3 and Type 4 PoE — conductor heating, attenuation and bundling derating.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/bs-en-50174-data-cable-installation',
      title: 'BS EN 50174 — Data Cable Installation',
      description: 'The structured cabling installation standard for the UK — bend radius, pulling tension, segregation from power, screening practice.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/security-lighting-cost',
      title: 'Security Lighting Cost',
      description: 'External security lighting that complements CCTV — PIR sensors, dusk-to-dawn, LED floodlight installation and pricing.',
      icon: 'Lightbulb',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Quote and design a defensible CCTV install in minutes',
  ctaSubheading:
    'Elec-Mate produces the PoE budget calculation, the NVR storage calculation, the cable schedule, the GDPR notice template and the client-ready quotation from a short site survey interview. Aligned to IEEE 802.3at/bt, BS EN 62676, BS EN 50174 and BS 7671:2018+A4:2026. 7-day free trial, cancel anytime.',
};
