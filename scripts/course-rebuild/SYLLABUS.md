# BMS course — rebuilt syllabus (10 Oct 2026)

Audience: qualified UK electricians moving into building services controls. Voice: a senior
controls engineer teaching a good electrician — practical, UK, plain English, no hype.
Keeps the existing 7 modules / 41 page files (plus new 2.7 and 7.7 = 43) so routes, links and saved progress survive.

Source extracts: `scratchpad/bms/src/*.txt` (grep them; never read a whole file).
RAG-verified BS 7671 facts are listed under GROUNDED FACTS — use these exact positions.

## GROUNDED FACTS (verified 10 Oct against bs7671_facets A4:2026 / Approved Doc L)
- BS 7671:2018+A4:2026 Regulation 528.1: a Band I circuit shall not be contained in the same
  wiring system as a Band II circuit, and neither Band I nor Band II in the same wiring system
  as a circuit exceeding low voltage — **except where specified methods are adopted**, e.g.
  insulating for the highest voltage present, a separate conduit/trunking/ducting system
  (method e), or for a multicore cable an earthed metal screen between Band I and Band II
  cores of current-carrying capacity equivalent to the largest Band II core (method f).
  Teach it as "segregate, or use one of the permitted methods" — never as an absolute ban.
- BS 7671 Section 557 covers auxiliary circuits (control, signalling, measurement). The supply
  for an auxiliary circuit may be dependent or independent of the main circuit according to
  its function (Regulation 557.3.1 context). Verify any other 557 detail with the script.
- Approved Document L Vol 2 (England, 2026 edition): where a heating, air-conditioning or
  combined system has an effective rated output greater than 180 kW, a building automation and
  control system should be installed (para 5.76 onwards; specification paras 5.84–5.85: comply
  with BS EN ISO 16484, continuously monitor, log and analyse energy use, detect efficiency
  losses, interoperate across manufacturers). Wales: 290 kW now, 180 kW from 4 March 2027
  (Welsh ADL Vol 2 2026 edition). Scotland: 290 kW (Scottish non-domestic compliance guide).
  Northern Ireland: NOT verified — do not state a figure.
- EN 15232 has been replaced by **BS EN ISO 52120-1** (BACS efficiency classes A–D; A = high
  energy performance BACS, D = non energy-efficient). Never present EN 15232 as current.
  BS EN ISO 16484 is the BACS series (system/product standards). Both are paywalled: describe
  what they are for, do not quote clauses.
- KNX twisted pair (TP) — verified on knx.org (KNX Association), 10 Oct 2026: the bus is
  powered by a dedicated KNX bus power supply (nominally 30 V DC; about 29 V on the bus);
  bus devices are specified to operate between 21 V and 30 V DC; the bus is SELV; cable is
  0.8 mm solid-core twisted pair; maximum 350 m cable between power supply and any device;
  maximum 1000 m total cable in one line segment. Do NOT state a devices-per-segment limit or
  a reason for any topology rule — neither was confirmed.
- Modbus serial line: RS-485 two-wire is the common physical layer; the official serial line
  guide covers termination, line polarisation (biasing) and daisy-chain topology — grep
  `Modbus-Serial-Line-Spec-Implementation-Guide` for exact requirements.
- Fire and life safety: in UK practice, fire alarm actions (plant shutdown on fire, door
  release, smoke control) are driven by the fire detection and alarm system and its own
  interfaces, not by the BMS. The BMS typically MONITORS fire alarm status and may carry out
  non-life-safety follow-up. Name standards only if verify-standards.py finds them in the RAG
  (BS 5839-1, BS 7273 series are the candidates — check before citing).

- BS 7671 Regulation 444.410 (A4:2026, verified): BS EN 50174-1 and BS EN 50174-2 shall be
  applied for control, signalling and communication circuits within a building. Separation
  distances between power and data/control cabling live in BS EN 50174-2 (paywalled — name it,
  do not quote figures). BS 7671 itself sets NO "300 mm" separation for control cabling.
- Fire priority (design principle, not a figure): a fire signal must take priority over every
  manual and automatic command in plant logic — no hand/override path may run a fan the fire
  strategy has stopped.

## BANNED (the old course and mock taught these — do not repeat)
- "300 mm minimum separation" as a BS 7671 rule (it is not in BS 7671). Any separation figure.
- Voltage band numbers other than BS 7671's (Band I/Band II definitions only via verified
  text); "207–253 V (BS 7671)" or any supply tolerance figure unless verify-standards/RAG finds it.
- RS-485 / Modbus cable-length-per-baud formulas or tables, unless printed in the Modbus serial
  line guide (grep it; quote the meaning, not the words). Timing arithmetic must be worked and
  checked in the notes.
- BACnet "127 devices per MS/TP segment", "6-digit device ID"; KNX "24 V", "700 m"; any device
  count per KNX segment. Belden or other cable part numbers.
- Listing the parts of BS EN ISO 16484 (the old course got them wrong). Name the series only.
- BS EN 16001 (withdrawn). Outdoor CO2 ppm figures. "BS 7273-4 legal requirement" (it is a code
  of practice). "BS 7671 compliance is mandatory" / insurance void claims.
- US terms and units: lockout/tagout (say lock-off), grounding (earthing), LEED (BREEAM if
  needed), GPM/PSI/CFM/feet, "analog", "optimization", "stabilized".
- GSM/SMS alarm backup as current practice (2G/3G networks are being switched off — say only
  that legacy mobile links may stop working; no dates).
- Any energy-saving percentage or £ figure not printed in a grepped source with its context
  (e.g. "BMS saves 20–30%"). If you want a figure, quote the class concept from ISO 52120-1
  instead, or say "can cut energy use significantly" with no number.
- EN 15232 as the current standard. "Legal penalties" for breaching voluntary standards.
- The BMS as the life-safety path for fire shutdown or door release.
- Invented case-study numbers presented as fact. Scenarios may use plausible site details but
  no statistics.
- US practice presented as UK (NEC, "analog" spelling — UK is "analogue"; "fiber"→"fibre").

## MODULES

### Module 1 — What a BMS is, and the rules around it
1.1 What a building management system is — the three levels (management/automation/field),
    outstations/controllers, supervisor (head end), points; BMS vs BEMS vs BACS terms.
    Video: uXG1y2bOufo (Basic HVAC Controls).
1.2 What a BMS controls and connects to — HVAC, heating, lighting, metering, access, lifts,
    blinds, generators/UPS monitoring; monitor-only vs control. Video: lDeuIQ4VeWk.
1.3 Why buildings have one — comfort, energy, maintenance, compliance; ISO 52120-1 classes as
    the way performance is described. NO invented percentages. Video: yEWT_XmqCtQ.
1.4 Where you will meet them — offices, schools, hospitals, data centres, retail, universities;
    what differs (criticality, hours, hygiene). Videos: vZkA0z9JRgw, xwvkojKiLJM.
1.5 Standards and regulations — Approved Doc L BACS requirement (England 180 kW; Wales; Scotland),
    BS EN ISO 16484, BS EN ISO 52120-1 classes A–D, sub-metering, log book. Sources: England ADL
    2026 + Welsh ADL + Scottish guide + REHVA-euBAC + Danfoss paper. No video.
1.6 The electrician's role and working safely — what electricians do on BMS jobs (panels,
    containment, field wiring, power to plant), competence boundaries with controls engineers,
    safe isolation of control panels (multiple supplies, interposing relays, back-feeds),
    BS 7671 Section 557 and Reg 528.1 at overview level. Sources: RAG facts above.

### Module 2 — Field devices and signals
2.1 Points: digital and analogue, inputs and outputs — DI/DO/AI/AO, volt-free contacts,
    status vs command, fail-safe thinking. Video: n594CkrP6xE (relays, in library).
2.2 Sensors — temperature (NTC thermistor, PT100/PT1000), humidity, CO2, pressure/differential
    pressure, flow, occupancy. Source: BCIA control sensors guide. Videos: w3Hfj2kMrGo,
    SaQBD0NMT04, YG81w0HFXNc (in library).
2.3 Actuators, valves and dampers — two-port/three-port, PICV, valve authority (concept only
    unless BCIA valves guide gives numbers), damper actuators, spring return, 0–10 V/3-point.
    Source: BCIA control valves guide. Videos: nAM5xU_KfzU, -MLGr1_Fw0c.
2.4 Siting sensors and getting true readings — siting rules from BCIA sensors guide, accuracy,
    calibration, common siting faults.
2.5 Controllers and I/O modules — DDC outstations, I/O capacity, universal inputs, power
    supplies, expansion, local displays. Video: uOtdWHMKhnw (PLC basics, in library).
2.6 Control wiring — 0–10 V and 4–20 mA (why current loops resist noise; live zero), screened
    cable and earthing the screen at one end (verify in sources), segregation (Reg 528.1 per
    GROUNDED FACTS), cable types, labelling. Sources: Kuphaldt (4–20 mA chapter, grep
    "4-20 mA"/"live zero"), RAG facts.
2.7 Motor control and the plant interface (NEW) — where the BMS meets the starter panel:
    hand/off/auto selection and what "auto" hands to the BMS, DOL/star-delta starters and VSDs
    as the BMS sees them, run/trip/auto-status points, enable vs speed reference (0–10 V to a
    VSD), interposing relays and why the BMS output never switches the motor directly, fire
    and safety stops wired upstream of the BMS (fire priority, GROUNDED FACTS). Videos:
    bmsVsd, bmsRelays. Sources: BCIA guides, RAG facts on Section 557.

### Module 3 — Controlling heating, ventilation and air conditioning
3.1 The plant a BMS runs — boilers, heat pumps, chillers, AHUs, FCUs, pumps, VAV.
    Videos: KCiv8IAUkh8, 1cvFlBLo4u0, MqM-U8bftCI, onIMNox24NI.
3.2 Control loops — on/off, deadband/hysteresis, proportional, PI, PID (concepts, no maths
    beyond simple), cascade/sequence control. Sources: Yokogawa PID guides, Kuphaldt.
    Videos: i2x5rOzatbU, ukjXJp0Joyg, vw-bAbjPTd8.
3.3 Time and occupancy — schedules, holidays, optimum start/stop, occupancy override.
    Video: J9U_WvmYtCY.
3.4 Demand-based control and load management — VSDs on fans/pumps, CO2-based ventilation,
    load shedding, demand limiting. Videos: yEPe7RDtkgo (VFD, in library), GTQkPOgqt_M.
3.5 Overrides, frost protection and seasonal change — manual overrides and their risks, frost
    stats, summer/winter changeover, hand/off/auto.
3.6 Plant safety interlocks and shutdowns — hardwired safeties vs software interlocks, fan
    proving, high-limit stats, what must never rely on software. Videos: OghkQFVKmPQ, RwSga-zQy0I.

### Module 4 — Lighting, access, blinds and metering
4.1 Lighting control — switching, 1–10 V, DALI/DALI-2/D4i, emergency lighting monitoring via
    DALI. Sources: DALI Alliance guides.
4.2 Daylight and presence detection — PIR/microwave, absence vs presence, daylight dimming,
    commissioning sensors.
4.3 Access control interfaces — what the BMS sees (door status, alarms) vs what the access
    system and fire alarm do; fail-safe/fail-secure locking (no life-safety via BMS).
4.4 Blinds and shading — motor control, sun tracking, wind sensors, interface methods.
4.5 Metering and sub-metering — why (Approved Doc L sub-metering; energy analysis), pulse,
    M-Bus and Modbus meters, CTs, what electricians install. Replaces the old "combined
    savings" page (which carried invented figures). Sources: England ADL 2026 para 4.19, DESNZ
    heat network metering guidance.

### Module 5 — Networks and protocols
5.1 How BMS devices talk — networks vs field buses, open vs proprietary, IP vs serial.
5.2 BACnet — objects, properties, services (overview), BACnet/IP and MS/TP, device instance
    numbers. Source: BACnet International introduction.
5.3 Modbus RTU and Modbus TCP — master/slave (client/server), registers and function codes at
    overview level, RS-485 wiring: two-wire, daisy chain, termination, biasing, common faults.
    Sources: three Modbus specs.
5.4 KNX, LonWorks, M-Bus and DALI as networks — topology, what each is good at, where you meet
    them. Sources: Echelon LonWorks intro, DALI guides; KNX from GROUNDED FACTS only.
5.5 Gateways and integration — translating between protocols, points lists, what gets lost.
5.6 Network design and cyber security — segmentation, remote access risk, default passwords,
    BACnet/SC, who owns the network. Sources: NPSA BACS security, NCSC OT guidance, BCIA cyber.

### Module 6 — Alarms, data and monitoring
6.1 Alarms — priorities, nuisance alarms, acknowledgement, escalation.
6.2 Trend logging — what to log, intervals, using trends to find faults.
6.3 Graphics and dashboards — what makes a usable front end.
6.4 Energy monitoring and reporting — monitor/log/analyse (ADL 5.84), meter data, spotting
    waste out of hours. No invented savings figures. Video: 8c35zeEv2Aw.
6.5 Fire alarm and life safety interfaces — per GROUNDED FACTS: the fire system acts, the BMS
    monitors; interface relays, cause and effect, testing with the fire alarm engineer.
6.6 Remote access and monitoring — secure remote access, alarm notification, contracts.

### Module 7 — Design, installation, commissioning and handover
7.1 Design documents — points schedules, schematics, control philosophy / description of
    operation. Video: ak51DHAiuWo.
7.2 Control logic — function blocks, Boolean logic, PID blocks, sequences (reading, not writing
    code). Video: _f-zNQKFMAA.
7.3 Addressing and point mapping — naming conventions, addresses, keeping the points list true.
7.4 Controller set-up and software — loading strategies, backups, version control.
7.5 Commissioning — pre-commissioning checks, point-to-point testing, functional testing,
    witness tests, seasonal commissioning. Sources: NHS HTM 2005 validation and verification,
    BCIA delivery framework.
7.6 Handover — O&M manuals, as-fitted drawings, log book (ADL), training, soft landings.
    Source: BCIA delivery framework.
7.7 Fault finding on a BMS (NEW) — a repeatable method: confirm the symptom, read trends and
    alarms, check the point on the front end, then at the controller, then at the field device;
    analogue loop checks (measuring a 4–20 mA loop in series, a 0–10 V signal across the input),
    common faults (failed sensors reading open/short, actuators stuck, overrides left on,
    schedule errors, comms faults: termination, polarity, addressing, duplicate addresses),
    when to call the controls engineer. Safe working throughout (live panels, foreign voltages).
    Sources: Kuphaldt (grep loop testing), Modbus serial guide (grep faults/termination), HTM
    2005 validation volume. Last page of the course: next = the mock exam
    (/study-centre/upskilling/bms-mock-exam, label "Mock exam").
