import { FlashcardData } from './types';

export const commsAndData: FlashcardData[] = [
  // ── Structured Cabling ────────────────────────────────────────────────

  {
    id: 'cd1',
    question:
      'What are the three main subsystems of a structured cabling system as defined in BS EN 50173?',
    answer:
      'The three main subsystems are the backbone (vertical) cabling that connects equipment rooms between floors, the horizontal cabling that runs from the floor distributor to the telecommunications outlet at each workstation, and the campus cabling that interconnects separate buildings on a site. Each subsystem has defined maximum distances and performance requirements to ensure the overall system meets its intended category rating.',
    category: 'Structured Cabling',
    difficulty: 'easy',
  },
  {
    id: 'cd2',
    question:
      'What is the maximum permitted length for a horizontal cable run in a structured cabling system?',
    answer:
      'The maximum horizontal cable run (permanent link) is 90 metres from the patch panel in the communications room to the telecommunications outlet at the workstation. An additional 10 metres is allowed for patch leads and equipment cords at each end, giving a total channel length of 100 metres. Exceeding these distances will degrade signal quality and may cause the link to fail certification testing.',
    category: 'Structured Cabling',
    difficulty: 'easy',
  },
  {
    id: 'cd3',
    question:
      'What is the role of a patch panel in a structured cabling installation and how is it terminated?',
    answer:
      'A patch panel provides a centralised termination point in the communications room where all horizontal cable runs are punched down onto IDC (insulation displacement connection) contacts at the rear. The front of the panel presents RJ45 ports that can be connected to network switches using short patch leads. This arrangement allows flexible reconfiguration of network connections without disturbing the permanent cabling infrastructure.',
    category: 'Structured Cabling',
    difficulty: 'easy',
  },
  {
    id: 'cd4',
    question:
      'What are the frequency ratings and typical applications of Cat5e, Cat6, Cat6a, and Cat7 cabling?',
    answer:
      'Cat5e is rated to 100 MHz and supports Gigabit Ethernet (1000BASE-T) up to 100 metres. Cat6 is rated to 250 MHz and supports 10GBASE-T up to 55 metres. Cat6a is rated to 500 MHz and supports 10GBASE-T over the full 100-metre channel. Cat7 is rated to 600 MHz, uses individually shielded pairs (S/FTP), and is designed for high-performance environments requiring maximum noise immunity. Higher category cables require more careful installation to achieve their rated performance.',
    category: 'Structured Cabling',
    difficulty: 'medium',
  },
  {
    id: 'cd5',
    question:
      'Explain the difference between T568A and T568B wiring standards for RJ45 terminations.',
    answer:
      'T568A and T568B define the pin-to-pair assignments for eight-position modular connectors. The key difference is that pairs 2 and 3 are swapped: T568A assigns the green pair to pins 1-2 and the orange pair to pins 3-6, while T568B assigns the orange pair to pins 1-2 and the green pair to pins 3-6. Both standards deliver identical electrical performance. In the UK, T568B is more commonly used in commercial installations, but the critical rule is to use the same standard consistently throughout an installation.',
    category: 'Structured Cabling',
    difficulty: 'medium',
  },
  {
    id: 'cd6',
    question:
      'What techniques should be followed when terminating an RJ45 connector to ensure a reliable connection?',
    answer:
      'The cable jacket should be stripped back no more than 25 mm and the pairs untwisted as little as possible, ideally no more than 13 mm, to maintain crosstalk performance. Pairs must be arranged in the correct colour order for the chosen T568A or T568B standard and pushed firmly into the connector so all conductors reach the front pins. A quality crimp tool must be used to seat the contacts and strain relief. Each termination should be tested with a cable tester to verify continuity and correct wiring.',
    category: 'Structured Cabling',
    difficulty: 'medium',
  },

  // ── Network Basics ────────────────────────────────────────────────────

  {
    id: 'cd7',
    question:
      'Describe the four main network topologies and state which is most commonly used in modern structured cabling.',
    answer:
      'Bus topology connects all devices on a single shared cable and is simple but vulnerable to a single point of failure. Ring topology passes data in one direction around a loop, with each device acting as a repeater. Mesh topology provides multiple redundant paths between devices, offering high resilience at greater cost. Star topology connects each device to a central switch or hub, and is the standard for modern structured cabling because a single cable fault only affects one device.',
    category: 'Network Basics',
    difficulty: 'easy',
  },
  {
    id: 'cd8',
    question:
      'What are the key differences between 100BASE-TX, 1000BASE-T, and 10GBASE-T Ethernet standards?',
    answer:
      '100BASE-TX (Fast Ethernet) operates at 100 Mbit/s using two pairs of Cat5 or better cable. 1000BASE-T (Gigabit Ethernet) operates at 1 Gbit/s using all four pairs of Cat5e or better cable. 10GBASE-T operates at 10 Gbit/s using all four pairs and requires Cat6a cable for the full 100-metre distance, or Cat6 for up to 55 metres. Each successive standard demands higher cable performance and tighter installation tolerances.',
    category: 'Network Basics',
    difficulty: 'medium',
  },
  {
    id: 'cd9',
    question:
      'What is Power over Ethernet (PoE) and what are the main IEEE standards that define it?',
    answer:
      'Power over Ethernet delivers DC power alongside data over standard structured cabling, eliminating the need for separate power supplies at each device. IEEE 802.3af (PoE, Type 1) provides up to 15.4 W per port, suitable for IP phones and basic cameras. IEEE 802.3at (PoE+, Type 2) provides up to 30 W for pan-tilt-zoom cameras and wireless access points. IEEE 802.3bt (PoE++, Type 3 and 4) provides up to 60 W and 100 W respectively, supporting devices such as video conferencing units and LED lighting.',
    category: 'Network Basics',
    difficulty: 'medium',
  },
  {
    id: 'cd10',
    question:
      'What power budget considerations must an installer account for when designing a PoE network?',
    answer:
      'The installer must ensure the PoE switch or midspan injector has sufficient total power budget to supply all connected devices simultaneously, including headroom for future expansion. Cable resistance causes voltage drop, so longer runs reduce the power available at the device end. Cat6a cable has lower DC resistance than Cat5e and is preferred for high-power PoE installations. Temperature rise in tightly bundled PoE cables must also be considered, and BS 7671 requires current-carrying capacity to be derated when multiple PoE cables share the same containment.',
    category: 'Network Basics',
    difficulty: 'hard',
  },
  {
    id: 'cd11',
    question: 'What is IP telephony and what role does the Session Initiation Protocol (SIP) play?',
    answer:
      'IP telephony transmits voice communications as digital data packets over an IP network instead of using traditional analogue telephone lines. SIP (Session Initiation Protocol) is the signalling protocol used to set up, manage, and terminate voice and video sessions between endpoints. SIP handles call routing, registration of handsets, and feature negotiation, while the actual voice data is typically carried using RTP (Real-time Transport Protocol). IP telephony relies on quality of service (QoS) settings to prioritise voice traffic and prevent latency or jitter.',
    category: 'Network Basics',
    difficulty: 'hard',
  },
  {
    id: 'cd12',
    question:
      'What factors should be considered when planning the placement of Wi-Fi access points in a building?',
    answer:
      'Access point placement must account for building construction materials that attenuate signals, such as reinforced concrete, metal cladding, and foil-backed plasterboard. A site survey should identify coverage gaps and areas of high user density. Access points should be ceiling-mounted where possible for optimal omnidirectional coverage and spaced to provide overlapping cells with 15-20% overlap for seamless roaming. Co-channel interference must be managed by assigning non-overlapping channels, and each access point requires a structured cabling data point and, ideally, PoE power.',
    category: 'Network Basics',
    difficulty: 'hard',
  },

  // ── Fibre Optics ──────────────────────────────────────────────────────

  {
    id: 'cd13',
    question:
      'What is the fundamental difference between single-mode and multimode fibre optic cable?',
    answer:
      'Single-mode fibre has a very small core diameter (typically 9 micrometres) that allows only one mode of light to propagate, enabling very long transmission distances of tens of kilometres with minimal signal loss. Multimode fibre has a larger core (50 or 62.5 micrometres) that allows multiple modes of light to travel simultaneously, which causes modal dispersion and limits distances to typically 300-550 metres depending on the grade. Single-mode is used for long-haul and campus backbone links, while multimode is more common within buildings.',
    category: 'Fibre Optics',
    difficulty: 'easy',
  },
  {
    id: 'cd14',
    question: 'What do the OM designations (OM1 through OM5) indicate for multimode fibre?',
    answer:
      'The OM (Optical Multimode) designations classify multimode fibre by bandwidth performance. OM1 (62.5/125 micrometre) supports Gigabit Ethernet to 275 metres. OM2 (50/125 micrometre) extends Gigabit Ethernet to 550 metres. OM3 (laser-optimised 50/125) supports 10 Gigabit Ethernet to 300 metres. OM4 extends 10 Gigabit Ethernet to 550 metres. OM5 (wideband multimode) is optimised for short-wavelength division multiplexing, supporting 40G and 100G Ethernet over parallel fibre or wavelength multiplexing.',
    category: 'Fibre Optics',
    difficulty: 'medium',
  },
  {
    id: 'cd15',
    question:
      'Describe the main fibre optic connector types (LC, SC, and ST) and state which is most common in new installations.',
    answer:
      'The LC (Lucent Connector) is a small form-factor connector with a 1.25 mm ferrule and push-pull latching mechanism, now the most common in new installations due to its compact size allowing high port density. The SC (Subscriber Connector) has a 2.5 mm ferrule with a push-pull housing and is widely used in older telecoms installations. The ST (Straight Tip) connector uses a 2.5 mm ferrule with a bayonet twist-lock and was once standard but is now largely legacy. LC duplex connectors are the default choice for modern structured cabling systems.',
    category: 'Fibre Optics',
    difficulty: 'medium',
  },
  {
    id: 'cd16',
    question:
      'What is the difference between fusion splicing and mechanical splicing of fibre optic cable?',
    answer:
      'Fusion splicing uses an electric arc to permanently fuse the two fibre ends together, producing a very low loss joint (typically 0.02-0.05 dB) and high reliability. It requires an expensive fusion splicer but delivers the best performance. Mechanical splicing aligns the fibres in a precision sleeve with index-matching gel and holds them in place with a clamp, giving a higher typical loss of 0.1-0.5 dB. Mechanical splices are quicker to install and require less costly equipment, making them suitable for emergency repairs or low-budget installations.',
    category: 'Fibre Optics',
    difficulty: 'hard',
  },

  // ── Testing ───────────────────────────────────────────────────────────

  {
    id: 'cd17',
    question:
      'What is the difference between cable verification, qualification, and certification testing?',
    answer:
      'Verification is a basic test that confirms continuity, correct wiring, and cable length using a simple wiremap tester. Qualification testing checks whether an installed link can support a specific network application such as Gigabit Ethernet but does not test against a formal cabling standard. Certification testing measures the link against the full set of parameters defined in standards such as BS EN 50173, including insertion loss, NEXT, PSNEXT, return loss, and propagation delay, and provides a pass or fail result against the specified category.',
    category: 'Testing',
    difficulty: 'medium',
  },
  {
    id: 'cd18',
    question:
      'What parameters does a cable certification tester (such as a Fluke DSX) measure when certifying a copper structured cabling link?',
    answer:
      'A certification tester measures wiremap (correct pin terminations and absence of shorts, opens, or crossed pairs), cable length, insertion loss (signal attenuation over the link), near-end crosstalk (NEXT) and power-sum NEXT, far-end crosstalk (FEXT) and power-sum ELFEXT, return loss (signal reflected back due to impedance mismatches), and propagation delay and delay skew between pairs. All results are compared against the limits for the declared category (such as Cat6a) and a pass or fail verdict is issued.',
    category: 'Testing',
    difficulty: 'hard',
  },
  {
    id: 'cd19',
    question: 'What is an OTDR and how is it used to test fibre optic cabling?',
    answer:
      'An OTDR (Optical Time-Domain Reflectometer) sends pulses of light down a fibre and measures the backscattered and reflected light over time to produce a trace showing the entire fibre link. The trace reveals the length of the fibre, the loss of each splice and connector, and the location of any faults such as breaks, bends, or poor joints. OTDR testing is essential for certifying fibre backbone links and for fault-finding on installed fibre routes. The tester must be used from both ends of the fibre to obtain accurate bidirectional loss measurements.',
    category: 'Testing',
    difficulty: 'hard',
  },

  // ── Standards ─────────────────────────────────────────────────────────

  {
    id: 'cd20',
    question:
      'What does BS EN 50173 cover and why is it important for structured cabling installations?',
    answer:
      'BS EN 50173 is the European standard for generic cabling systems, specifying the structure, minimum performance requirements, and testing criteria for cabling that supports information technology, telecommunications, and building automation services. It defines channel and permanent link performance classes (such as Class D for Cat5e, Class E for Cat6, Class EA for Cat6a) and ensures that installed cabling will support current and future applications. Compliance with BS EN 50173 is essential for system warranties and for demonstrating that an installation is fit for purpose.',
    category: 'Standards',
    difficulty: 'easy',
  },
  {
    id: 'cd21',
    question:
      'What is BS 6701 and what obligations does it place on telecommunications installers?',
    answer:
      'BS 6701 is the British Standard for the installation, operation, and maintenance of telecommunications equipment and infrastructure. It requires installers to ensure safety, electromagnetic compatibility, and proper connection to the public telecommunications network. The standard covers earthing and bonding of telecoms equipment, separation from hazardous voltages, and protection against lightning surges. Installers working on systems connected to the public network must be registered with a telecoms industry body such as the FCS (Federation of Communication Services) or hold appropriate certification.',
    category: 'Standards',
    difficulty: 'medium',
  },
  {
    id: 'cd22',
    question:
      'What are the minimum separation distances between data cables and power cables as required by BS 7671 and BS EN 50174?',
    answer:
      'BS EN 50174-2 specifies separation distances to prevent electromagnetic interference from power cables degrading data cable performance. For unscreened data cables running parallel to unscreened power cables, a minimum separation of 200 mm is required when using separate containment without dividers. If a metal divider or barrier is used, this can be reduced to 100 mm. Where data cables cross power cables at right angles, no minimum separation is needed. Screened (shielded) data cables such as Cat7 S/FTP allow reduced separation distances due to their inherent noise immunity.',
    category: 'Standards',
    difficulty: 'hard',
  },

  // ── Cable Management ──────────────────────────────────────────────────

  {
    id: 'cd23',
    question:
      'What are the minimum bend radius requirements for structured cabling and why do they matter?',
    answer:
      'For four-pair UTP cable, the minimum bend radius during installation is eight times the cable outer diameter, reducing to four times once installed and under no pulling tension. For fibre optic cable, the minimum bend radius is typically ten times the cable diameter under tension and fifteen times when static, though this varies by fibre type. Exceeding the minimum bend radius can cause increased insertion loss, return loss, and crosstalk in copper cables, or microbending and signal attenuation in fibre, potentially causing the link to fail certification.',
    category: 'Structured Cabling',
    difficulty: 'medium',
  },
  {
    id: 'cd24',
    question:
      'What is a keystone jack and how does it differ from a fixed-port faceplate in a telecommunications outlet?',
    answer:
      'A keystone jack is a modular snap-in connector that terminates individual cables using IDC punch-down contacts and clips into a standard keystone aperture on a faceplate, patch panel, or surface-mount box. A fixed-port faceplate has permanently mounted connectors that cannot be individually replaced. Keystone systems offer greater flexibility because individual jacks can be swapped without replacing the entire faceplate, and the same jack design fits into multiple form factors. They are the standard approach in modern UK structured cabling installations.',
    category: 'Structured Cabling',
    difficulty: 'easy',
  },
  {
    id: 'cd25',
    question:
      'What containment and cable management best practices should be followed in a communications room?',
    answer:
      'All cables should enter the communications room through fire-stopped penetrations and be routed in structured containment such as ladder rack, basket tray, or cable tray above the equipment racks. Patch leads should be managed with horizontal cable managers between patch panels to prevent tangling and maintain airflow. Cables must observe minimum bend radii and not be overtightened in cable ties. Power and data cables must be separated per BS EN 50174. Equipment racks should have adequate ventilation, and all ports and cables should be clearly labelled following a documented scheme to simplify ongoing moves, adds, and changes.',
    category: 'Structured Cabling',
    difficulty: 'hard',
  },
];
