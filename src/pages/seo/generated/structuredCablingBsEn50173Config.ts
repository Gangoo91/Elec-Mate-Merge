import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS EN 50173 (Information technology — Generic cabling systems),
// BS EN 50174 (Cable installation practice), BS 7671:2018+A4:2026 (18th Edition,
// published 15 April 2026), the IET On-Site Guide and TIA-568 (US analogue).

const published = '2026-05-17';
const modified = '2026-05-17';

export const structuredCablingBsEn50173Config: GeneratedGuideConfig = {
  pagePath: '/guides/structured-cabling-bs-en-50173-electricians',
  title:
    'Structured Cabling BS EN 50173 — UK Electrician Guide to Generic Cabling | Elec-Mate',
  description:
    'BS EN 50173 structured cabling explained for UK electricians — the six-part standard, hierarchical CD/BD/FD/TO topology, channel vs permanent link testing, the 100 m rule, Cat6/6a/7/8 categories, fibre versus copper, BS EN 50174 installation practice, and BS 7671 Section 528 segregation for data and power.',
  datePublished: published,
  dateModified: modified,
  readingTime: 18,
  badge: 'Data & Network Cabling',
  badgeIcon: 'Cable',
  breadcrumbLabel: 'Structured Cabling BS EN 50173',
  heroPrefix: 'Structured Cabling',
  heroHighlight: 'BS EN 50173',
  heroSuffix: '— UK Electrician Guide',
  heroSubtitle:
    'Structured cabling sits at the boundary between the electrical and IT trades — and the UK electrician is increasingly expected to deliver both. BS EN 50173 is the European generic cabling standard. This guide covers the six-part standard, the CD/BD/FD/TO hierarchy, the 100 metre channel rule, copper categories from Cat6 through Cat8, fibre choices, certification testing, and how it all sits alongside BS 7671:2018+A4:2026 Section 528 segregation.',
  keyTakeaways: [
    'BS EN 50173 is a six-part European standard for generic cabling systems — 50173-1 sets out the general requirements; parts 2 to 6 cover office, industrial, residential, data centre and distributed building services premises respectively.',
    'The topology is hierarchical: Campus Distributor (CD) feeds Building Distributors (BD), which feed Floor Distributors (FD), which feed Telecommunications Outlets (TO) at the workstation.',
    'The 100 metre channel rule is the most quoted figure in the standard — up to 90 m of fixed horizontal cable plus up to 10 m combined of patch cords, work area cords and equipment cords.',
    'Cable categories define bandwidth: Cat6 (250 MHz, 1 GbE+), Cat6a (500 MHz, 10 GbE to 100 m), Cat7/7a (shielded, 600/1000 MHz), Cat8 (2 GHz, 25/40 GbE to 30 m — data centre only).',
    'Certification is done with a four-pair, two-ended tester (Fluke DSX or Wirexpert equivalent) against the permanent link or channel limits — insertion loss, NEXT, FEXT, return loss and ACR-F are the five core measurements.',
    'BS EN 50173 governs the data cabling itself; BS EN 50174 governs the installation practice; BS 7671 Section 528.1 governs segregation from LV power circuits to prevent interference and disturbance.',
  ],
  sections: [
    {
      id: 'why-electricians',
      heading: 'Why Structured Cabling Sits on the Electrician\'s Tool Belt',
      tocLabel: 'Why electricians do this',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For decades, "data" and "electrical" were separate trades. The electrician ran the power; a cabling subcontractor ran the data. That separation has collapsed. PoE++ (IEEE 802.3bt Type 4) now delivers up to 90 W per port — enough to power LED luminaires, CCTV, access control, IP intercoms, occupancy sensors and digital signage from a single Cat6a cable. The data cable has become a low-voltage power cable, and the trade that runs it has to understand both worlds.',
        },
        {
          type: 'paragraph',
          text:
            'BS EN 50173 is the standard that defines what the cabling system has to look like. Published by CENELEC and adopted in the UK as a British Standard, it has effectively replaced older ISO/IEC 11801 references in most UK specifications. The American analogue is TIA-568 — aligned but not identical. UK projects specify EN 50173, so that is what you certify to.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'BS EN 50173 vs ISO/IEC 11801',
          text:
            'You will see both standards referenced interchangeably in older specifications. ISO/IEC 11801 is the international document; BS EN 50173 is the European harmonisation, adopted in the UK. Performance limits, topology rules and testing requirements line up — testing against BS EN 50173 satisfies an ISO/IEC 11801 specification.',
        },
      ],
    },
    {
      id: 'the-six-part-standard',
      heading: 'The Six Parts of BS EN 50173',
      tocLabel: 'The six parts',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS EN 50173 is not a single document — it is a series. Part 1 sets the general principles; parts 2 to 6 adapt those principles to specific building types.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'BS EN 50173-1 — General requirements. The umbrella document covering topology, channel and permanent link definitions, performance classes and transmission requirements. Every other part inherits from -1.',
            'BS EN 50173-2 — Office premises. The default specification for most commercial CAT A/B office fit-outs.',
            'BS EN 50173-3 — Industrial premises. Adds environmental requirements and introduces M.I.C.E. classification (Mechanical, Ingress, Climatic, Electromagnetic) for cable selection.',
            'BS EN 50173-4 — Homes. Generic cabling for residential premises, covering telephony, broadband, IPTV, home automation and security.',
            'BS EN 50173-5 — Data centres. Adds the Main / Intermediate / Zone Distributor topology and the channel models for 40 GbE and 100 GbE links.',
            'BS EN 50173-6 — Distributed building services. Covers cabling that supports building services rather than IT — lighting, HVAC controls, sensors — and acknowledges PoE-powered converged infrastructure.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'On any given UK project, you work under -1 plus one premises-specific part. A commercial fit-out is -1 + -2. A retrofit warehouse is -1 + -3. A new-build smart house is -1 + -4. A converged office where the lighting runs over the data network is increasingly -1 + -2 + -6.',
        },
      ],
    },
    {
      id: 'hierarchical-topology',
      heading: 'The Hierarchical Topology — CD, BD, FD, TO',
      tocLabel: 'CD/BD/FD/TO topology',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS EN 50173 imposes a strict hierarchical star topology. Cabling fans out from a central distributor through one or more intermediate distributors to individual outlets at the work area. The names are standardised — using them in your design documentation is how you communicate with consultants, FM teams and the next contractor in fifteen years\' time.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Campus Distributor (CD) — the highest-level distributor, serving an entire site. Houses the carrier demarcation point and core network switches.',
            'Building Distributor (BD) — the per-building distributor, fed from the CD by inter-building backbone cabling (almost always fibre). On a single-building site, the CD and BD may be co-located.',
            'Floor Distributor (FD) — the per-floor distributor (also called the Telecommunications Room). Houses the floor patch panel, switch and UPS.',
            'Telecommunications Outlet (TO) — the work area outlet: RJ45 face plate at the desk, ceiling drop for a wireless access point, wall-box for a CCTV camera. The endpoint of the fixed horizontal cabling.',
            'Consolidation Point (CP) — an optional intermediate point between the FD and TO, used in open offices where furniture layouts change.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'The cable segments have their own names: CD to BD is Campus Backbone Cabling (always fibre); BD to FD is Building Backbone Cabling (usually fibre); FD to TO is Horizontal Cabling (almost always copper Cat6a). See our companion guide on [BS EN 50174 data cable installation](/guides/bs-en-50174-data-cable-installation) for the installation practice that accompanies this topology.',
        },
      ],
    },
    {
      id: 'channel-link-permanent-link',
      heading: 'Channel, Link and Permanent Link — The Three Test Models',
      tocLabel: 'Channel vs link',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS EN 50173 defines three ways of looking at a horizontal cable run, depending on what is included between the test points. Test limits differ between models, so selecting the right one is the difference between a certified installation and a rejected one.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Permanent Link — the fixed in-wall portion, from patch panel termination to outlet termination, excluding patch cords. The "installation test" — what the cabling installer is responsible for.',
            'Channel — the full end-to-end path including patch cords at both ends. What the user actually uses; allows more loss than a permanent link because it has more connection points.',
            'Link (basic link) — a legacy term largely superseded by the permanent link model, but still seen on older test reports.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Always test the permanent link as the installer',
          text:
            'Your contractual responsibility ends at the outlet — you do not own the patch cords. Test the permanent link, report against the permanent link limits, and hand over a certified report demonstrating that the fixed portion meets the class limit. The customer can run channel tests later with their own patch cords and switches.',
        },
      ],
    },
    {
      id: 'the-100m-rule',
      heading: 'The 100 Metre Rule — Where It Comes From',
      tocLabel: 'The 100 m rule',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Every electrician who has ever pulled a Cat6 has heard "100 metres" quoted as the maximum length. It is true, but commonly misunderstood. Here is what BS EN 50173 actually says.',
        },
        {
          type: 'list',
          items: [
            'The channel — total end-to-end — must not exceed 100 m.',
            'Within that 100 m, the permanent link (fixed horizontal cable) must not exceed 90 m.',
            'The remaining 10 m is the combined length of all patch cords at both ends.',
            'If the patch cords are longer than 10 m combined, the horizontal cable must be shortened to compensate.',
            'The 100 m figure is for balanced copper at the standard transmission class — it does not apply to fibre (much longer) or to Class II / Cat8 (only 30 m channel).',
          ],
        },
        {
          type: 'paragraph',
          text:
            'In practice, the 90 m horizontal limit is what bites on real jobs. A modern office floor plate, plus a vertical drop to the FD and containment routing around services, can hit 90 m faster than you expect. Plan the FD location so no horizontal run exceeds 70 m as designed — that leaves headroom for routing changes on site.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'PoE and the 100 m rule',
          text:
            'PoE++ Type 4 delivers 90 W at the source and is specified to maintain 71 W at the device end after 100 m of Cat6a — the 100 m channel still works for high-power PoE. See our [PoE++ Type 4 90 W installation guide](/guides/poe-plus-plus-type-4-90w-installation) for the heat dissipation considerations.',
        },
      ],
    },
    {
      id: 'cable-categories',
      heading: 'Cable Categories — Cat6 to Cat8 Explained',
      tocLabel: 'Cable categories',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The "category" of a structured cabling component describes its bandwidth and supported data rates. TIA categories (Cat5e, Cat6, Cat6a, Cat8) and the equivalent EN 50173 "classes" (Class D, E, EA, II) line up by family.',
        },
        {
          type: 'list',
          items: [
            'Cat5e (Class D) — 100 MHz, 1 GbE to 100 m. Legacy. Do not specify for new work.',
            'Cat6 (Class E) — 250 MHz, 1 GbE to 100 m, 10 GbE to 55 m. Limited headroom for the next refresh.',
            'Cat6a (Class EA) — 500 MHz, 10 GbE to 100 m, supports all PoE++ classes up to Type 4 90 W. The current UK default for new office, healthcare and education installations.',
            'Cat7 (Class F) — 600 MHz, individually shielded (S/FTP). Common in European industrial work where EMC matters.',
            'Cat7a (Class FA) — 1000 MHz, S/FTP. Niche — usually replaced by Cat6a + fibre.',
            'Cat8 (Class II) — 2 GHz, S/FTP, supports 25/40 GbE but only to 30 m channel. Data centre top-of-rack only.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'For new-build UK commercial work in 2026, Cat6a U/UTP is the dominant default. It supports 10 GbE, handles 90 W PoE for converged services, and the price differential against Cat6 is small enough that consultants rarely justify the cost saving. See our [Cat6 / Cat6a current rating and PoE](/guides/cat6-cat6a-current-rating-poe) guide for derating and bundle size guidance.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Mixing categories degrades the channel',
          text:
            'A channel is only as good as its weakest component. Cat6a cable on Cat5e jacks gives Cat5e performance and a failed certification. Specify panel, outlet and patch cords to the same category, ideally from the same manufacturer to qualify for the 25-year channel warranty.',
        },
      ],
    },
    {
      id: 'performance-testing',
      heading: 'Performance Testing — The Five Core Measurements',
      tocLabel: 'Performance tests',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A BS EN 50173 certification test report compares measured parameters against the class limit at every frequency sweep point. The five measurements that matter most:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Insertion Loss (IL) — signal lost between transmitter and receiver, in dB. Caused by cable resistance and connector losses; the dominant failure mode on long or undersized cables.',
            'Near-End Crosstalk (NEXT) — signal leaked from one pair into another at the transmitting end. The classic failure when terminations are sloppy or pair-twist is undone too far.',
            'Far-End Crosstalk (FEXT / ACR-F) — crosstalk leaked from one pair into another at the far end. Matters most at higher frequencies.',
            'Return Loss (RL) — signal reflected back by impedance mismatches in cable or connectors. Caused by sharp bends, kinks or untwisted pairs near connectors.',
            'Propagation Delay and Delay Skew — time to traverse the link and the difference between pairs. Matters for 10 GbE and above, which use all four pairs in parallel.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'PASS, PASS*, FAIL, FAIL*',
          text:
            'Testers report four states. PASS is a clean pass with margin. PASS* is within measurement uncertainty — usually acceptable but worth checking. FAIL is a clear fail. FAIL* is a fail within uncertainty — must be investigated. Aim for clean PASS results: asterisks are not the consultant\'s friend.',
        },
      ],
    },
    {
      id: 'fibre-vs-copper',
      heading: 'Fibre vs Copper — When to Use Which',
      tocLabel: 'Fibre vs copper',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS EN 50173 covers both balanced copper and optical fibre. Cost, distance, bandwidth and the device at the far end drive the choice. Clear defaults stop you over-specifying expensive fibre where copper is fine, or under-specifying copper on links that will not work.',
        },
        {
          type: 'list',
          items: [
            'Horizontal (FD to TO, under 90 m) — copper Cat6a default. Fibre to the desk only when PoE is not needed.',
            'Building backbone (BD to FD) — fibre when longer than 50 m or expected to outlive a refresh. OM4/OM5 multimode for short runs; OS2 singlemode for longer and future-proofing.',
            'Campus backbone (CD to BD, between buildings) — fibre always. Copper introduces earth-loop and lightning paths.',
            'PoE-powered devices (cameras, APs, lighting) — copper always. Fibre cannot deliver power.',
            'High-bandwidth server links — Cat8 copper to 30 m, fibre beyond. Most modern data centres are now fibre throughout.',
            'EMC-sensitive environments (broadcast, medical imaging, motor rooms) — fibre where practical, since it is immune to EMI.',
          ],
        },
      ],
    },
    {
      id: 'patch-panel-outlet',
      heading: 'Patch Panels and Outlets — Specifying the Hardware',
      tocLabel: 'Patch panels & outlets',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The cable is only one component of a channel. The patch panel jack at the FD and the outlet jack at the TO set the lower bound on channel performance. Hardware specification matters as much as cable specification.',
        },
        {
          type: 'list',
          items: [
            'Patch panel — 24- or 48-port 1U, keystone jacks of the same category as the cable. Punch-down (IDC) termination is the UK norm.',
            'Keystone outlet — 1-gang or 2-gang faceplate with RJ45 modules. Specify colour, depth (deep boxes for Cat6a S/FTP) and angled modules where furniture clearance matters.',
            'Patch cords — stranded conductor, factory-terminated, sized for the patch field. Specify a colour scheme up front: data, voice, CCTV, AP — this is how the FM team navigates the rack later.',
            'Cable management — horizontal managers between panels; vertical managers between cabinets. Without them, patch fields turn into spaghetti within months.',
            'Cabinets — 800 mm wide for cable management, 1000 mm deep for switches with deep ports. Perforated doors front and rear for airflow.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Source panels, outlets and cables from the same manufacturer (CommScope, Panduit, Excel, Leviton, R&M). A single-vendor channel qualifies for the 25-year manufacturer warranty.',
        },
      ],
    },
    {
      id: 'installation-practice',
      heading: 'Installation Practice — BS EN 50174 Discipline',
      tocLabel: 'Installation practice',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS EN 50173 says what the system has to be; BS EN 50174 says how to install it. You cannot deliver a certified channel without following EN 50174 practice — most certification failures trace back to violations of these rules.',
        },
        {
          type: 'list',
          items: [
            'Bend radius — minimum 4× cable diameter during installation, 8× installed. Tight bends crush pair geometry and destroy NEXT.',
            'Pull tension — maximum 110 N for Cat6a copper. Exceeding this stretches the cable and shifts impedance.',
            'Untwist at termination — no more than 13 mm of pair untwist at any RJ45 termination. The single most common cause of a re-test.',
            'Cable bundling — multiple PoE-loaded cables raise bundle temperature. EN 50174-2 thermal guidance and BS 7671 derating limit bundle sizes (roughly 24 Cat6a cables per bundle for 90 W PoE).',
            'Containment — separate from LV mains is good practice; shared containment needs the BS 7671 Section 528.1 segregation distance (typically 50 mm or a partition).',
            'Cable identification — both ends labelled at time of pulling. TIA-606-C is the cross-trade labelling standard.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'No staples on Cat6a',
          text:
            'Cat6a is far more sensitive to crush than Cat5e or Cat6. Cable staples — even insulated ones — apply enough localised pressure to fail return loss and NEXT. Use wider-bearing cable clips, purpose-made containment, and Velcro ties on patch fields rather than tightly-pulled cable ties.',
        },
      ],
    },
    {
      id: 'labelling',
      heading: 'Labelling and Documentation — TIA-606',
      tocLabel: 'Labelling (TIA-606)',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A structured cabling installation that is not labelled is unfindable. TIA-606-C is the international labelling standard adopted in UK specifications and integrates cleanly with BS EN 50173.',
        },
        {
          type: 'list',
          items: [
            'Every outlet labelled with a unique identifier — typically [FD]-[Panel]-[Port], e.g. "FD1-A-12" identifies port 12 on panel A in floor distributor 1.',
            'Every cable labelled at both ends with the outlet identifier, so it can be traced from rack to outlet without testing.',
            'Patch panels labelled on the front face with port numbers and outlet function or location.',
            'Cabinet labels identifying the FD by reference plus the floor and building.',
            'Cabling records — outlet ID, panel/port, length, category, test pass status and commissioning notes for every link.',
            'As-installed drawings — outlet locations on a floor plan, linked to the outlet ID.',
          ],
        },
      ],
    },
    {
      id: 'certification-testing',
      heading: 'Certification Testing — Fluke, Wirexpert and the Test Report',
      tocLabel: 'Certification testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS EN 50173 performance is verified with a calibrated two-ended certification tester — not a basic verifier. The two dominant UK testers are the Fluke DSX-8000 and the Softing Wirexpert WX4500. Both produce test reports accepted by every UK consultant.',
        },
        {
          type: 'list',
          items: [
            'Calibration — annually by an accredited lab. The calibration certificate is part of the handover pack.',
            'Test reference cords — replace every 1000 tests or when damaged. Worn cords add measurement uncertainty.',
            'Test limit selection — set to BS EN 50173 / ISO/IEC 11801 limits at the cable class (Class EA for Cat6a permanent link, Class II for Cat8).',
            'Save and document — every test, both ends, with the cable ID as the file name. Upload to LinkWare Live or Wirexpert Pro for handover.',
            'Anomalies — investigate every PASS* and FAIL* result. Re-terminate, re-test. A clean handover has no asterisks.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Buy, hire or subcontract',
          text:
            'A Fluke DSX-8000 with fibre modules is around GBP 12,000+. For occasional structured cabling jobs, hiring (around GBP 250/week) or subcontracting certification is more cost-effective. For weekly structured cabling work, the tester pays back inside two years.',
        },
      ],
    },
    {
      id: 'bs7671-segregation',
      heading: 'Crossover with BS 7671 — Section 528 Segregation',
      tocLabel: 'BS 7671 segregation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Structured cabling is an extra-low voltage system but does not exist in isolation from LV power in the same building. BS 7671:2018+A4:2026 Section 528 covers proximity and segregation of wiring systems and applies to data cabling running near mains. Get this wrong and you both create EMC problems and breach the wiring regulations.',
        },
        {
          type: 'list',
          items: [
            'Section 528.1 — circuits of different voltage bands (Band I = ELV; Band II = LV mains) must be physically separated or installed in cables/containment rated for the higher band.',
            'Practical separation — a 50 mm air gap between unsheathed Band I and Band II cables in containment is the common UK rule of thumb. Larger gaps for parallel runs over 35 m, especially near high-current circuits and frequency converters.',
            'Crossings — at right angles, no specific separation distance is required, but EMC best practice favours a small air gap.',
            'Shared containment — permissible only with sheathing to the higher band or a physical partition (metal divider in a basket tray).',
            'Earth bonding — metallic data containment must be bonded to the building earth at intervals; floating containment picks up induced voltages.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Section 715 and ELV lighting',
          text:
            'BS 7671 Section 715 covers ELV Lighting Installations, and PoE-fed lighting falls in scope. The intersection with BS EN 50173 is the converged building. See our [Section 715 ELV lighting under A4:2026](/guides/section-715-elv-lighting-a4-2026) guide for the design constraints.',
        },
      ],
    },
    {
      id: 'common-applications',
      heading: 'Common Applications — IP Cameras, APs, Lighting, Smart Home',
      tocLabel: 'Common applications',
      blocks: [
        {
          type: 'paragraph',
          text:
            'In 2026, the structured cabling an electrician installs rarely carries only "data" in the old sense. It carries power and signal for converged building services:',
        },
        {
          type: 'list',
          items: [
            'IP CCTV — Cat6a horizontal from FD to camera, carrying PoE and video. Outdoor cameras need outdoor-rated cable. See our [IP camera PoE installation guide](/guides/ip-camera-poe-installation-uk).',
            'Wireless Access Points — ceiling-mounted Wi-Fi 6E / 7 APs, fed by Cat6a carrying PoE++. Position drops from a wireless planning survey.',
            'PoE Lighting — converged lighting on Cat6a from a PoE switch in the FD. Specify Cat6a, not Cat6, for continuous PoE++ load.',
            'Access Control and Intercom — IP door entry, badge readers, electric strike releases. One Cat6a cable replaces the legacy 6-core security cable and separate mains feed.',
            'Smart Home — BS EN 50173-4 residential: multiple Cat6a outlets per room plus fibre to the gateway. See our [smart home wiring cost](/guides/smart-home-wiring-cost) guide.',
            'Audio-Visual — networked AV systems with display, microphone and camera on the data network rather than dedicated AV cable.',
          ],
        },
      ],
    },
    {
      id: 'design-checklist',
      heading: 'Design Checklist Before You Quote',
      tocLabel: 'Design checklist',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Most structured cabling rework comes from incomplete design at quoting stage. A site survey covers outlet positions and containment routes but often skips the questions that determine cable category, FD location and test regime. Walking the survey with this checklist saves days on site.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Premises type — which BS EN 50173 part applies (50173-2, -3, -4, -5 or -6)?',
            'Floor distributor location — is the most distant outlet within 90 m walking the actual route, not straight line?',
            'Cable category — almost always Cat6a in 2026.',
            'PoE budget — how many devices, what class, in what bundle size?',
            'Patch field — port count plus 25 percent spare, with cable management and cabinet sized.',
            'Fibre backbone — type (OS2 / OM4 / OM5), number of cores plus spares.',
            'Backbone routing — riser ducts, plenum or external buried duct?',
            'Testing regime — permanent link tests, handover pack, manufacturer warranty registration.',
            'Labelling scheme — outlet naming convention agreed with the consultant before pulling.',
            'Mains segregation — routing avoids LV power circuits at the BS 7671 Section 528 separation distance.',
          ],
        },
      ],
    },
    {
      id: 'elec-mate-cabling',
      heading: 'Where Elec-Mate Helps with Structured Cabling Jobs',
      tocLabel: 'Elec-Mate help',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Structured cabling jobs sit between two trades and two paperwork standards. The data side wants a certification handover pack; the electrical side wants BS 7671 certificates on mains feeders, a RAMS for the install, and a quote the client will sign. Elec-Mate brings both halves into one workflow.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Quoting — Cat6a, panels, outlets, fibre and containment estimates against current UK trade prices, generated from your room schedule.',
            'RAMS — CDM 2015-compliant Risk Assessment and Method Statement covering working at height, manual handling, mains segregation and hot works for cable tray.',
            'BS 7671 compliance — EIC and Minor Works certificate tools document mains-fed PoE switches, UPS and supplies to the FD.',
            'Cabling records — outlet-by-outlet test results, labelling and as-built locations linked to the customer project.',
            'Single handover document combining certification summary, electrical certificate, labelling list and as-built drawings.',
          ],
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Available on the Electrician tier',
          text:
            'Quoting, RAMS and the BS 7671 certificate tools are included on the Elec-Mate Electrician subscription, alongside the full calculator suite. 7-day free trial, cancel anytime.',
        },
      ],
    },
  ],
  howToHeading: 'How to Plan and Certify a BS EN 50173 Structured Cabling Job',
  howToDescription:
    'The end-to-end workflow from initial survey to certified handover — covering category selection, topology design, installation discipline and certification testing under BS EN 50173 and BS EN 50174.',
  howToSteps: [
    {
      name: 'Identify the premises type and select the BS EN 50173 part',
      text:
        'Confirm whether the building is office (-2), industrial (-3), residential (-4), data centre (-5) or distributed building services (-6). The premises type drives cable category, topology constraints and certification test limits.',
    },
    {
      name: 'Lay out the CD / BD / FD / TO topology on the floor plan',
      text:
        'Locate the Floor Distributor so no horizontal cable run exceeds 90 m along the actual containment route. Position the FD in a riser-adjacent room so the BD-to-FD backbone is short. Mark every outlet with a unique identifier from the start.',
    },
    {
      name: 'Specify the cable category and connectivity hardware',
      text:
        'Choose Cat6a U/UTP as the default horizontal cable unless the brief requires shielded (Cat6a F/UTP, Cat7) or higher class (Cat8 in data centres). Source panels, outlets and patch cords from the same manufacturer as the cable for the 25-year warranty.',
    },
    {
      name: 'Install to BS EN 50174 discipline and BS 7671 Section 528',
      text:
        'Pull below the 110 N tension limit, maintain 4× diameter bend radius, untwist no more than 13 mm at terminations, and segregate from Band II mains by the Section 528 distance. Label both ends of every cable as it is pulled.',
    },
    {
      name: 'Certify every permanent link against the class limit',
      text:
        'Use a calibrated Fluke DSX or Wirexpert tester. Select the correct BS EN 50173 class limit (Class EA for Cat6a permanent link, Class II for Cat8). Test every permanent link from both ends. Investigate every PASS* and FAIL* and re-terminate as needed.',
    },
    {
      name: 'Compile the handover pack and register the warranty',
      text:
        'Produce a handover pack with calibration certificate, per-link test reports, summary table, cabling records and as-built drawings. Register the channel with the manufacturer to activate the 25-year warranty.',
    },
  ],
  faqs: [
    {
      question: 'Is BS EN 50173 a legal requirement in the UK?',
      answer:
        'BS EN 50173 is a standard, not a statutory instrument — it does not have the force of law in the way that BS 7671 has via the Electricity at Work Regulations 1989. However, almost every UK consultant specification for new commercial, healthcare, education and industrial buildings calls for cabling to BS EN 50173 (or its predecessor ISO/IEC 11801). It is the de facto baseline for any structured cabling job a UK electrician will quote.',
    },
    {
      question: 'What is the difference between Cat6 and Cat6a in plain terms?',
      answer:
        'Cat6 supports 1 Gigabit Ethernet to 100 m and 10 Gigabit Ethernet only to 55 m. Cat6a supports 10 GbE to the full 100 m, has roughly double the bandwidth (500 MHz vs 250 MHz), and handles continuous PoE++ Type 4 (90 W) loads without overheating. For any new commercial UK installation in 2026, Cat6a is the practical default — the price differential is small enough that consultants rarely specify Cat6 anymore.',
    },
    {
      question: 'Can I run data cable in the same containment as mains?',
      answer:
        'Yes, but only where BS 7671 Section 528.1 is satisfied. The data cable must either be sheathed to the higher voltage band (Band II = LV mains), or a physical partition must separate the two circuits inside the containment (a metal divider in a basket tray, for example). Where the data cable is unsheathed Cat6a U/UTP, the typical UK practice is a 50 mm air gap between data and mains, or separate containment. Crossings at right angles do not have a prescribed separation distance.',
    },
    {
      question: 'Do I really need a Fluke DSX or Wirexpert to certify the cabling?',
      answer:
        'For BS EN 50173 certification, yes. A "verifier" — a basic continuity and wiremap tester — will tell you the cable is connected correctly but cannot measure NEXT, return loss, insertion loss and the other parameters in the standard. A certification tester (Fluke DSX, Wirexpert) sweeps the link across the full frequency range and produces a per-link report that can be handed to a consultant. Renting a tester for a one-off job is around GBP 250 per week; buying one is upwards of GBP 12,000.',
    },
    {
      question: 'What is the difference between a permanent link test and a channel test?',
      answer:
        'A permanent link test measures the fixed in-wall portion of the cabling — from patch panel termination to outlet termination, excluding patch cords. A channel test measures the full end-to-end path including patch cords at both ends. The test limits are different (channels allow more loss because they include more connection points). As the installer, you test the permanent link because that is what you are responsible for; the customer can run channel tests later with their own patch cords.',
    },
    {
      question: 'How many PoE++ Type 4 cables can I bundle together?',
      answer:
        'Continuous 90 W PoE on every cable in a tightly bundled group raises the temperature in the centre of the bundle, which derates the current-carrying capacity. The typical safe bundle size for full-load Type 4 PoE is around 24 Cat6a cables, with margin for hot ceiling voids. Larger bundles need to be split or installed with airflow. See our [Cat6 / Cat6a current rating and PoE](/guides/cat6-cat6a-current-rating-poe) guide for the detailed derating tables.',
    },
    {
      question: 'When should I specify fibre instead of copper?',
      answer:
        'Default to fibre for any backbone — between buildings (campus backbone), between floors when the run is longer than around 50 m, and where the link is expected to outlive a future cabling refresh. Default to copper Cat6a for horizontal cabling to the work area, especially where PoE is needed (fibre cannot deliver power). For data centre top-of-rack to spine links, Cat8 copper works to 30 m but fibre dominates beyond that.',
    },
    {
      question: 'Does Elec-Mate help me quote a structured cabling job?',
      answer:
        'Yes. The quoting tools cover Cat6a materials, patch panels, outlets, fibre cores, containment and labour estimates against current UK trade prices. The RAMS Generator produces a CDM 2015-compliant Risk Assessment and Method Statement for the cable installation, including segregation from mains under BS 7671 Section 528. For any mains supplies to PoE switches and the FD, the EIC and Minor Works certificate tools document the BS 7671 compliance alongside the structured cabling handover.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-en-50174-data-cable-installation',
      title: 'BS EN 50174 — Data Cable Installation Practice',
      description: 'The installation practice companion to BS EN 50173 — bend radius, pull tension, untwist limits, containment and on-site discipline that gets cabling certified.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/poe-plus-plus-type-4-90w-installation',
      title: 'PoE++ Type 4 (90 W) Installation',
      description: 'The high-power PoE standard that drives modern converged building services — heat dissipation, bundle sizing and cable selection.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/cat6-cat6a-current-rating-poe',
      title: 'Cat6 / Cat6a Current Rating for PoE',
      description: 'The derating tables and bundle size guidance for continuous PoE loads on Cat6 and Cat6a cabling, aligned to EN 50174-2 thermal guidance.',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/guides/ip-camera-poe-installation-uk',
      title: 'IP Camera PoE Installation (UK)',
      description: 'Practical PoE camera installation for UK electricians — Cat6a horizontal cabling, outdoor-rated routing and the BS EN 50173 channel rules in a CCTV context.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/section-715-elv-lighting-a4-2026',
      title: 'Section 715 ELV Lighting (A4:2026)',
      description: 'BS 7671 Section 715 covers ELV lighting installations — the regulatory overlap with structured cabling when the data network powers the lights.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/smart-home-wiring-cost',
      title: 'Smart Home Wiring Cost',
      description: 'BS EN 50173-4 in residential practice — the typical material and labour picture for Cat6a outlets, fibre to the gateway and a home FD.',
      icon: 'Home',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Bring data cabling into your electrical quoting workflow',
  ctaSubheading:
    'Quote, plan and certify structured cabling jobs alongside your BS 7671 electrical work in one app. Materials estimates against UK trade prices, CDM 2015-compliant RAMS for the data install, EIC and Minor Works certificates for any mains feeders, and a single handover pack the FM team can actually read. 7-day free trial, cancel anytime.',
};
