/**
 * Study Centre — shared glossary
 *
 * One glossary, not twenty-two. A term-overlap count across 11 courses found
 * that 21 of 26 core terms appear in five or more of them: BS 7671 in all 11,
 * RCD in 10, Zs in 9. Writing them per course creates that many chances to
 * drift apart, so the definitions live here once and every course links to the
 * same page.
 *
 * `courses` on an entry narrows it to those courses. An entry with no `courses`
 * key is universal and shows everywhere. `where` is the section reference for
 * the course named in `whereCourse` (default MOET), and is hidden when the
 * glossary is rendered for a different course.
 *
 * Regulatory claims here are verified against `bs7671_facets`
 * (BS 7671:2018+A4:2026, GN3, OSG) or a primary source held on disk. Do not add
 * a reg number or a numeric limit from memory.
 */

export type GlossaryEntry = {
  term: string;
  expand?: string;
  def: string;
  /** Section reference within `whereCourse`. */
  where?: string;
  whereCourse?: string;
  /** Restrict to these course keys. Omit for a term every course shares. */
  courses?: string[];
};

export type GlossaryGroup = {
  heading: string;
  blurb: string;
  entries: GlossaryEntry[];
  /** Restrict the whole group to these course keys. Omit for a shared group. */
  courses?: string[];
};

export const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    heading: 'Testing and measurement',
    blurb: 'The figures you record on a certificate, and what each one is telling you.',
    entries: [
      {
        term: 'Zs',
        expand: 'Earth fault loop impedance',
        def: 'The total impedance of the earth fault loop, measured at a point in the installation: the supply, the line conductor out to the fault, and the protective conductor back. It decides how much current flows in an earth fault, and therefore whether the protective device disconnects in time.',
        where: '4.5.3',
      },
      {
        term: 'Ze',
        expand: 'External earth fault loop impedance',
        def: 'The part of the loop that lies outside the installation — the supply transformer and the distributor’s network up to the origin. Measured with the installation disconnected, it is the baseline every circuit’s Zs builds on.',
        where: '4.5.3',
      },
      {
        term: 'R1+R2',
        def: 'The measured resistance of a circuit’s line conductor (R1) plus its protective conductor (R2), added together. Used to confirm continuity and, added to Ze, to predict Zs without a live test.',
        where: '4.5.2',
      },
      {
        term: 'Cmin',
        expand: 'Minimum voltage factor',
        def: 'A factor that allows for the supply voltage being lower than nominal when a fault occurs. BS 7671 gives it the value 0.95 for a low voltage supply under the ESQCR, and it sits inside the formula that sets the maximum permitted Zs.',
        where: '4.5.3',
      },
      {
        term: 'IR',
        expand: 'Insulation resistance',
        def: 'The resistance between conductors, and between conductors and earth, measured with a DC test voltage. BS 7671 Table 64 gives the test voltage and minimum value for each circuit type. Falling IR over successive tests matters more than a single reading above the minimum.',
        where: '4.5.1',
      },
      {
        term: 'ΔT',
        expand: 'Temperature differential',
        def: 'In thermography, the temperature difference between a component and a reference. Meaningless on its own — the reference type changes the severity entirely, because the same +18 °C is Priority 3 against ambient but Priority 1 against a similar component under similar load. The severity bands come from the NETA specifications, not from BS 7671 or GN3; GN3 §4.9 covers thermographic equipment as an inspection aid but gives no severity scale.',
        where: '4.2.2',
      },
      {
        term: 'GS38',
        def: 'HSE guidance on electrical test equipment for low voltage systems. Sets what a safe test probe looks like: finger barriers, fused leads, and an exposed metal tip not exceeding 4 mm.',
        where: '1.1.2',
      },
      {
        term: 'CAT III / CAT IV',
        expand: 'Measurement category',
        def: 'The transient overvoltage a test instrument is built to survive at a given point in an installation. CAT III covers distribution-level circuits and switchboards; CAT IV covers the origin of the installation. Using an under-rated instrument is how meters explode.',
        where: '4.3.3',
      },
      {
        term: 'EICR',
        expand: 'Electrical Installation Condition Report',
        def: 'A formal report on the condition of an existing installation, classifying observed defects by severity and recommending a date for the next inspection. Not a certificate for new work.',
        where: '4.5.5',
      },
      {
        term: 'EIC / MEIWC',
        expand:
          'Electrical Installation Certificate / Minor Electrical Installation Works Certificate',
        def: 'Certificates issued for new work. An EIC covers a new installation or a significant addition; a MEIWC covers minor work that does not include a new circuit.',
        where: '4.5.5',
      },
    ],
  },
  {
    heading: 'Protection and earthing',
    blurb: 'The devices and arrangements that make a fault survivable.',
    entries: [
      {
        term: 'CPC',
        expand: 'Circuit protective conductor',
        def: 'The conductor that connects exposed-conductive-parts back to the main earthing terminal, giving fault current a low-impedance path so a protective device can operate.',
        where: '2.4',
      },
      {
        term: 'PEN',
        expand: 'Protective Earthed Neutral',
        def: 'A single supply conductor doing the job of both neutral and protective earth. Separated into N and PE at the service position in a TN-C-S system.',
        where: '3.1.1',
      },
      {
        term: 'PME',
        expand: 'Protective Multiple Earthing',
        def: 'The distributor’s practice of earthing the PEN conductor at multiple points along the network. It is why an open-PEN fault is a hazard worth designing against, particularly on EV charging installations.',
        where: '3.6.5',
      },
      {
        term: 'MET',
        expand: 'Main earthing terminal',
        def: 'The point where the earthing conductor, the circuit protective conductors and the main protective bonding conductors all come together.',
        where: '2.4',
      },
      {
        term: 'RCD / RCBO',
        expand: 'Residual current device / residual current breaker with overcurrent protection',
        def: 'An RCD detects an imbalance between line and neutral current and disconnects. An RCBO combines that with overcurrent protection in one module, so a single circuit can be protected without taking others out with it.',
        where: '2.4',
      },
      {
        term: 'RDC-DD',
        expand: 'Residual direct current detecting device',
        def: 'Detects smooth DC residual current, which can blind an ordinary Type A RCD. BS 7671 lists it separately from the RDC-PD (residual direct current PROTECTIVE device): the RDC-DD detects, the RDC-PD disconnects. For mode 3 EV charging the relevant device is the RDC-DD to BS IEC 62955, cross-referenced from Regulation 722.531.3.101.',
        where: '3.6.5',
      },
      {
        term: 'OPDD',
        expand: 'Open PEN detection device',
        def: 'Disconnects the installation if it detects the voltage excursion characteristic of a broken PEN conductor. One of the accepted ways of dealing with the open-PEN risk on a PME supply feeding an EV charge point.',
        where: '3.6.5',
      },
      {
        term: 'MCB / MCCB',
        expand: 'Miniature / moulded case circuit breaker',
        def: 'Overcurrent protective devices. The MCCB is the larger, higher-rated and usually adjustable relative of the MCB.',
        where: '2.4',
      },
      {
        term: 'AFDD',
        expand: 'Arc fault detection device',
        def: 'Detects the electrical signature of a series or parallel arc — the kind of fault that does not draw enough current to trip an MCB but is perfectly capable of starting a fire.',
        where: '2.4',
      },
      {
        term: 'SPD',
        expand: 'Surge protective device',
        def: 'Limits transient overvoltages from lightning or switching, diverting the surge to earth before it reaches equipment insulation.',
        where: '2.4',
      },
      {
        term: 'SELV / PELV',
        expand: 'Separated extra-low voltage / Protected extra-low voltage',
        def: 'Extra-low voltage systems with defined separation from earth and from higher-voltage circuits. The distinction is whether the system is earthed — SELV is not, PELV is.',
        where: '2.1',
      },
      {
        term: 'Discrimination (selectivity)',
        def: 'Coordinating protective devices so only the one nearest a fault operates, leaving the rest of the installation running. Achieved by time grading, current grading, or both.',
        where: '3.1.6',
      },
    ],
  },
  {
    heading: 'Legislation and guidance',
    blurb: 'What is law, what is a standard, and what is somebody’s good advice.',
    entries: [
      {
        term: 'EAWR',
        expand: 'Electricity at Work Regulations 1989',
        def: 'The statutory duties for electrical safety at work. Reg 4(2) requires systems to be maintained so as to prevent danger; Reg 13 covers precautions for work on equipment made dead; Reg 14 restricts live working; Reg 16 requires competence.',
        where: '1.4.2',
      },
      {
        term: 'HASAWA',
        expand: 'Health and Safety at Work etc. Act 1974',
        def: 'The overarching statute. Section 2 places duties on employers, Section 7 places a duty on every employee to take reasonable care for themselves and others. Section 7 is a duty, not a right to stop work.',
        where: '1.4.1',
      },
      {
        term: 'PUWER',
        expand: 'Provision and Use of Work Equipment Regulations 1998',
        def: 'Requires work equipment to be suitable, maintained, inspected, and used only by people who have been trained. The regulations behind most machinery guarding and inspection regimes.',
        where: '1.4.4',
      },
      {
        term: 'LOLER',
        expand: 'Lifting Operations and Lifting Equipment Regulations 1998',
        def: 'Covers lifting equipment: strength and stability, positioning, marking, and the requirement that every lifting operation is planned by a competent person and appropriately supervised.',
        where: '1.4.5',
      },
      {
        term: 'COSHH',
        expand: 'Control of Substances Hazardous to Health Regulations 2002',
        def: 'Requires assessment and control of exposure to hazardous substances — in maintenance work typically solvents, lubricants, battery electrolyte and dusts.',
        where: '1.3.4',
      },
      {
        term: 'RIDDOR',
        expand: 'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013',
        def: 'Sets which incidents must be reported to the HSE, including specified injuries, over-seven-day absences, and dangerous occurrences such as an electrical short circuit causing a fire.',
        where: '1.3.1',
      },
      {
        term: 'RRO',
        expand: 'Regulatory Reform (Fire Safety) Order 2005',
        def: 'Places a duty on the responsible person to keep fire detection, alarm and emergency lighting systems in efficient working order. It creates the duty but names no test intervals — those come from BS 5839-1 and BS 5266-1.',
        where: '1.6.3',
      },
      {
        term: 'BS 7671',
        def: 'The IET Wiring Regulations. Currently BS 7671:2018+A4:2026. A standard rather than statute, but compliance is the normal way of demonstrating that EAWR duties have been met.',
        where: '1.4.3',
      },
      {
        term: 'GN3',
        expand: 'IET Guidance Note 3: Inspection and Testing',
        def: 'Guidance on how to carry out the inspection and testing that BS 7671 requires. Note that GN3 numbers its own tables independently, so a reference to “Table 6.1” is GN3’s, not BS 7671’s — the insulation resistance values live in BS 7671 Table 64. Citing one number under the other document’s name is a common and confusing error.',
        where: '4.5.5',
      },
      {
        term: 'PTW',
        expand: 'Permit to work',
        def: 'A formal documented record that specified precautions are in place before high-risk work starts. The permit is a control and a communication tool; it is not itself what makes the plant safe.',
        where: '1.1.1',
      },
      {
        term: 'LOTO',
        expand: 'Lock-out / tag-out',
        def: 'Physically locking an isolation so it cannot be reversed while people are working, with a tag identifying who applied it and why. Tags warn; locks prevent. Tags are never a substitute for locks.',
        where: '1.1.3',
      },
    ],
  },
  {
    heading: 'Maintenance and reliability',
    blurb: 'The vocabulary of deciding what to maintain, how often, and why.',
    entries: [
      {
        term: 'PPM',
        expand: 'Planned preventive maintenance',
        def: 'Maintenance carried out to a schedule rather than in response to a failure, with the intention of preventing one.',
        where: '4.1.1',
        courses: ['moet'],
      },
      {
        term: 'RCM',
        expand: 'Reliability-centred maintenance',
        def: 'A method for deciding what maintenance is worth doing, based on what each asset is required to do, how it can fail to do it, and what the consequences of each failure would be.',
        where: '4.7.1',
        courses: ['moet'],
      },
      {
        term: 'P-F interval',
        def: 'On a deterioration curve, the time between the point where a failure first becomes detectable (P) and the point of functional failure (F). It is your window to act, and it sets how often monitoring has to happen — inspect less often than the interval and you will sometimes miss it entirely.',
        where: '4.7.1',
        courses: ['moet'],
      },
      {
        term: 'MTBF',
        expand: 'Mean time between failures',
        def: 'Total operating time divided by the number of failures in that period. A comparative figure, not a prediction: it says nothing about whether failures were evenly spaced or clustered.',
        where: '4.7.3',
      },
      {
        term: 'MTTR',
        expand: 'Mean time to repair',
        def: 'The average time taken to restore an asset to service after a failure. Read alongside MTBF, it is what drives availability.',
        where: '4.7.3',
      },
      {
        term: 'RCA',
        expand: 'Root cause analysis',
        def: 'Working back from a failure to the underlying cause, rather than stopping at the component that broke. The 5 Whys and the fishbone diagram are two of the common structures for doing it.',
        where: '4.6.1',
      },
      {
        term: 'FMEA',
        expand: 'Failure mode and effects analysis',
        def: 'A structured review of how each part of a system could fail, what would follow, and how likely and detectable each failure mode is.',
        where: '4.7.3',
        courses: ['moet'],
      },
      {
        term: 'CMMS',
        expand: 'Computerised maintenance management system',
        def: 'The software that holds the asset register, schedules planned work, raises work orders and stores maintenance history. It is the plant’s memory, and only as good as what people record in it.',
        where: '6.3.5',
        courses: ['moet'],
      },
      {
        term: 'Pareto analysis',
        def: 'Ranking causes by their total impact, largest first, which normally reveals that a few causes account for most of the loss. The ranking changes depending on whether you measure downtime, cost or number of callouts — decide which before you sort.',
        where: '2.6.3',
      },
    ],
  },
  {
    heading: 'Control and instrumentation',
    blurb: 'The systems that measure a process and act on it.',
    entries: [
      {
        term: 'PLC',
        expand: 'Programmable logic controller',
        def: 'An industrial controller that reads inputs, executes a program and writes outputs on a repeating scan cycle. The scan cycle is what explains most of its timing behaviour.',
        where: '5.2.1',
      },
      {
        term: 'HMI',
        expand: 'Human-machine interface',
        def: 'The operator’s screen onto a control system. What it displays is the end of a chain — sensor, transmitter, wiring, input card, scaling — and any stage of that chain can be wrong while the screen looks plausible.',
        where: '5.2.1',
      },
      {
        term: 'SCADA',
        expand: 'Supervisory control and data acquisition',
        def: 'The layer above individual controllers that supervises, logs and reports across a plant or several sites.',
        where: '5.4.5',
      },
      {
        term: 'DCS',
        expand: 'Distributed control system',
        def: 'Integrates control, I/O and operator interfaces across an entire plant as one engineered system, rather than as separate controllers bolted together.',
        where: '5.4.5',
      },
      {
        term: 'PID',
        expand: 'Proportional, integral, derivative',
        def: 'The three terms of the standard control algorithm. Proportional responds to present error, integral to accumulated error, derivative to the rate of change. Tuning belongs to the whole loop, not the controller — change the valve and the tuning is no longer right.',
        where: '5.4.2',
      },
      {
        term: '4-20 mA loop',
        def: 'The dominant analogue signal standard in industry. A live zero of 4 mA means a broken wire reads 0 mA and is distinguishable from a genuine zero measurement.',
        where: '5.1.5',
      },
      {
        term: 'RTD / PT100',
        expand: 'Resistance temperature detector',
        def: 'A temperature sensor whose resistance rises predictably with temperature. A PT100 reads 100 Ω at 0 °C. More stable and linear than a thermocouple, over a narrower range.',
        where: '5.1.3',
      },
      {
        term: 'VSD / VFD',
        expand: 'Variable speed / variable frequency drive',
        def: 'Controls motor speed by varying the frequency and voltage supplied to it. Its DC bus holds a lethal charge after isolation, which is why a drive needs proving discharged and not merely isolated.',
        where: '3.2.4',
      },
      {
        term: 'SIL / PL',
        expand: 'Safety integrity level / performance level',
        def: 'Measures of how much risk reduction a safety function actually delivers. PL is the ISO 13849 scale used on machinery; SIL is the IEC 61508 / 61511 scale more common in process industries.',
        where: '5.3.4',
        courses: ['moet'],
      },
      {
        term: 'MTTFd',
        expand: 'Mean time to dangerous failure',
        def: 'One of the inputs to an ISO 13849 performance level calculation — how long, on average, before a component fails in a way that matters to safety.',
        where: '5.3.4',
        courses: ['moet'],
      },
      {
        term: 'Forced-guided contacts',
        def: 'Relay contacts mechanically linked so normally-open and normally-closed sets can never be closed at the same time. That linkage is what lets a safety relay detect a welded contact.',
        where: '5.3.3',
        courses: ['moet'],
      },
      {
        term: 'Stop categories',
        def: 'From IEC 60204-1. Category 0 removes power immediately. Category 1 brings the machine to a controlled stop and then removes power. Category 2 stops the machine with power still applied.',
        where: '5.3.1',
        courses: ['moet'],
      },
    ],
  },
  {
    heading: 'Qualification and assessment',
    blurb: 'The apprenticeship, the standard, and how you are assessed against it.',
    entries: [
      {
        term: 'MOET',
        expand: 'Maintenance and operations engineering technician',
        def: 'The name this course and the role are still widely known by. The electrical pathway of the original ST0154 standard was retired at the end of 2025 and replaced — this course is written to ST1426.',
        where: 'Course overview',
        courses: ['moet'],
      },
      {
        term: 'ST1426',
        def: 'Engineering maintenance technician – single discipline. The apprenticeship standard this course is written to, at Level 3, with electrical, mechanical, and control and instrumentation options. This course follows the electrical option.',
        where: 'Course overview',
        courses: ['moet'],
      },
      {
        term: 'KSB',
        expand: 'Knowledge, skills and behaviours',
        def: 'The statements in an apprenticeship standard that define what an apprentice must know and be able to do. ST1426 has 73 knowledge, 64 skills and 5 behaviour statements, of which the general and electrical ones apply to this pathway.',
        where: '7.3.4',
        courses: ['moet', 'level2', 'level3'],
      },
      {
        term: 'EPA',
        expand: 'End-point assessment',
        def: 'The independent assessment at the end of the apprenticeship. Confirm the exact format, duration and grading of your own EPA with your training provider or EPAO — it is set by the assessment plan, not by this course.',
        where: '7.5.2',
        courses: ['moet', 'level2', 'level3'],
      },
      {
        term: 'Gateway',
        def: 'The point at which the employer, provider and apprentice agree that the apprentice is ready to take the EPA, and the required evidence is in place.',
        where: '7.5.2',
        courses: ['moet', 'level2', 'level3'],
      },
      {
        term: 'Professional discussion',
        def: 'An EPA component in which an assessor explores your understanding through conversation, usually underpinned by your portfolio. It tests judgement and reasoning rather than recall.',
        where: '7.2.6',
        courses: ['moet', 'level2', 'level3'],
      },
      {
        term: 'AM2',
        def: 'The practical assessment used in the electrotechnical apprenticeship route. Referenced in this course for context — it is not part of the ST1426 EPA.',
        where: '7.1.1',
        courses: ['moet', 'level2', 'level3'],
      },
    ],
  },
  {
    heading: 'Inspection and testing outcomes',
    blurb: 'The codes that decide what happens after an inspection.',
    courses: ['inspection-testing', 'moet', 'level3', 'hnc'],
    entries: [
      {
        term: 'C1',
        expand: 'Danger present',
        def: 'Risk of injury is present and immediate action is required. The dutyholder must be told at once and the danger made safe before you leave, not written up for later.',
        courses: ['inspection-testing', 'moet', 'level3', 'hnc'],
      },
      {
        term: 'C2',
        expand: 'Potentially dangerous',
        def: 'No immediate danger, but the defect could become dangerous — typically if a second thing fails or someone interacts with it. Urgent remedial action is required, and a C2 alone makes a Condition Report unsatisfactory.',
        courses: ['inspection-testing', 'moet', 'level3', 'hnc'],
      },
      {
        term: 'C3',
        expand: 'Improvement recommended',
        def: 'Not dangerous and not a fail. Usually something that met the standard when installed but no longer reflects current practice. A report with only C3 items is still satisfactory.',
        courses: ['inspection-testing', 'moet', 'level3', 'hnc'],
      },
      {
        term: 'FI',
        expand: 'Further investigation',
        def: 'Something was found that could not be resolved within the scope of the inspection and needs looking into. Like a C2, an FI makes the report unsatisfactory — it is not a way of deferring a decision.',
        courses: ['inspection-testing', 'moet', 'level3', 'hnc'],
      },
      {
        term: 'PFC',
        expand: 'Prospective fault current',
        def: 'The highest current that would flow in a short circuit at a given point — the greater of the prospective short-circuit current and the prospective earth fault current. It sets the breaking capacity every protective device at that point must have.',
        courses: ['inspection-testing', 'moet', 'level3', 'hnc'],
      },
    ],
  },
  {
    heading: 'Fire detection and alarm',
    blurb: 'System categories, equipment and the people who respond.',
    courses: ['fire-alarm', 'emergency-lighting'],
    entries: [
      {
        term: 'CIE',
        expand: 'Control and indicating equipment',
        def: 'The panel. It monitors every circuit, decides what an activation means, drives the sounders and indicates where the alarm came from. Everything else on the system reports to it.',
        courses: ['fire-alarm'],
      },
      {
        term: 'MCP',
        expand: 'Manual call point',
        def: 'The break-glass unit. It gives an occupant a way to raise the alarm without waiting for a detector, which is why call point siting is about escape routes rather than fire risk.',
        courses: ['fire-alarm'],
      },
      {
        term: 'L1 / L2 / L3 / L4 / L5',
        expand: 'Life protection categories',
        def: 'BS 5839-1 categories for systems protecting life. L1 covers the whole building; L2 adds detection in defined high-risk areas to an L3; L3 covers escape routes and rooms opening onto them; L4 covers escape routes only; L5 is a bespoke category for a specific risk.',
        courses: ['fire-alarm'],
      },
      {
        term: 'P1 / P2',
        expand: 'Property protection categories',
        def: 'BS 5839-1 categories for systems protecting property rather than life. P1 covers the whole building for earliest possible detection; P2 covers defined areas of higher risk.',
        courses: ['fire-alarm'],
      },
      {
        term: 'VAD',
        expand: 'Visual alarm device',
        def: 'A beacon that signals an alarm where a sounder alone would not be noticed — high-noise areas, or places used by people who are deaf or hard of hearing.',
        courses: ['fire-alarm'],
      },
      {
        term: 'ARC',
        expand: 'Alarm receiving centre',
        def: 'The monitored centre a system signals when it activates, which then arranges a response. Whether a system is connected to one changes what happens at three in the morning.',
        courses: ['fire-alarm'],
      },
      {
        term: 'FRA',
        expand: 'Fire risk assessment',
        def: 'The assessment the responsible person must carry out under the Fire Safety Order. It is what determines the category of system a building needs — the system specification follows the assessment, not the other way round.',
        courses: ['fire-alarm', 'emergency-lighting'],
      },
      {
        term: 'ADB',
        expand: 'Approved Document B',
        def: 'The Building Regulations guidance on fire safety in England. Sets out how a building should be designed for means of escape, compartmentation and fire spread.',
        courses: ['fire-alarm', 'emergency-lighting'],
      },
    ],
  },
  {
    heading: 'Emergency lighting',
    blurb: 'Keeping people able to see their way out when the normal supply fails.',
    courses: ['emergency-lighting'],
    entries: [
      {
        term: 'Maintained / non-maintained',
        def: 'A maintained luminaire is lit all the time, on normal supply and on battery. A non-maintained one only lights when the normal supply fails. Which is appropriate depends on whether the space is occupied in darkness.',
        courses: ['emergency-lighting'],
      },
      {
        term: 'Duration test',
        def: 'Running the luminaire on battery for its full rated duration — typically one or three hours — to prove the battery still holds up. BS 5266-1 pairs a short monthly function test with an annual full-duration test.',
        courses: ['emergency-lighting'],
      },
      {
        term: 'LDT',
        expand: 'Luminaire data / photometric file',
        def: 'The photometric data file for a luminaire, used by lighting design software to calculate how much light actually reaches the floor. Emergency lighting design is a calculation, not a spacing rule of thumb.',
        courses: ['emergency-lighting'],
      },
      {
        term: 'Escape route lighting',
        def: 'The part of an emergency lighting scheme that illuminates the route itself, as distinct from open area (anti-panic) lighting and high-risk task area lighting. Each has its own required illuminance.',
        courses: ['emergency-lighting'],
      },
    ],
  },
  {
    heading: 'EV charging',
    blurb: 'The vocabulary of charge points, and the bodies that fund and connect them.',
    courses: ['ev-charging', 'renewables', 'moet'],
    entries: [
      {
        term: 'EVSE',
        expand: 'Electric vehicle supply equipment',
        def: 'The formal term for the charge point and its associated equipment — everything between the fixed installation and the vehicle connector.',
        courses: ['ev-charging', 'renewables'],
      },
      {
        term: 'Mode 3',
        def: 'Charging using dedicated EVSE with a control pilot, so the vehicle and the charge point negotiate before any power flows. The mode most fixed AC charge points use, and the mode BS IEC 62955 RDC-DDs are written for.',
        courses: ['ev-charging', 'renewables', 'moet'],
      },
      {
        term: 'DLM',
        expand: 'Dynamic load management',
        def: 'Varying charge current in response to the rest of the building load so the supply capacity is not exceeded. What lets several charge points share a supply that could not feed them all at full output.',
        courses: ['ev-charging', 'renewables'],
      },
      {
        term: 'OZEV',
        expand: 'Office for Zero Emission Vehicles',
        def: 'The government office that administers UK charge point grant schemes. Installers generally need to be OZEV-authorised for a customer to claim.',
        courses: ['ev-charging', 'renewables'],
      },
      {
        term: 'DNO',
        expand: 'Distribution Network Operator',
        def: 'The company that owns and operates the local distribution network. They own everything up to and including the cut-out, set the available supply capacity, and must be notified or consulted for significant new load or generation.',
        courses: ['ev-charging', 'renewables', 'moet', 'hnc'],
      },
    ],
  },
  {
    heading: 'Fibre and structured cabling',
    blurb: 'Fibre grades, connectors and the standards that name them.',
    courses: ['fibre-optics', 'data-cabling'],
    entries: [
      {
        term: 'OTDR',
        expand: 'Optical time domain reflectometer',
        def: 'Sends a pulse down a fibre and measures what comes back, building a trace of loss against distance. It locates a break or a bad splice rather than just telling you the link has failed.',
        courses: ['fibre-optics', 'data-cabling'],
      },
      {
        term: 'OM3 / OM4 / OM5',
        def: 'Multimode fibre grades, in increasing bandwidth. OM3 and OM4 are laser-optimised 50/125 µm; OM5 adds wideband capability for short-wave division multiplexing. The grade sets how far a given data rate will reach.',
        courses: ['fibre-optics', 'data-cabling'],
      },
      {
        term: 'OS1 / OS2',
        def: 'Singlemode fibre grades. OS2 has lower loss than OS1 and is the usual choice for outside-plant and longer campus runs. Singlemode carries much further than any multimode grade.',
        courses: ['fibre-optics', 'data-cabling'],
      },
      {
        term: 'UPC / APC',
        expand: 'Ultra / angled physical contact',
        def: 'Connector endface polishes. UPC is polished flat, APC at an 8-degree angle so reflected light escapes the core rather than travelling back up it. APC connectors are green, UPC blue — and the two must never be mated.',
        courses: ['fibre-optics', 'data-cabling'],
      },
      {
        term: 'VFL',
        expand: 'Visual fault locator',
        def: 'A visible red laser injected into the fibre. Light escaping at a break or a tight bend shows as a glow, which finds faults in patch leads and short runs far quicker than an OTDR.',
        courses: ['fibre-optics', 'data-cabling'],
      },
      {
        term: 'NEXT / PSNEXT',
        expand: 'Near-end crosstalk',
        def: 'Signal from one pair coupling into another at the same end of the link. One of the parameters a copper certification test measures, and the one most often failed by untwisting too much pair at a termination.',
        courses: ['data-cabling'],
      },
      {
        term: 'PoE / PSE',
        expand: 'Power over Ethernet / power sourcing equipment',
        def: 'Carrying DC power over the same cable as the data. The PSE is the end supplying it — a switch or a midspan injector. Higher PoE classes put real current through the pairs, which is why bundle size and ambient temperature start to matter.',
        courses: ['data-cabling', 'bms'],
      },
      {
        term: 'TIA-568 / TIA-606',
        def: 'US structured cabling standards widely referenced in UK practice: TIA-568 covers cabling performance and pin assignments, TIA-606 covers administration — labelling, records and identifiers.',
        courses: ['data-cabling', 'fibre-optics'],
      },
    ],
  },
  {
    heading: 'Building services and controls',
    blurb: 'Plant, protocols and the systems that tie a building together.',
    courses: ['bms', 'hnc', 'emergency-lighting'],
    entries: [
      {
        term: 'BMS / BEMS',
        expand: 'Building (energy) management system',
        def: 'The supervisory system that monitors and controls building plant — heating, ventilation, lighting, sometimes metering. It is the layer that turns individual controllers into something a facilities team can actually operate.',
        courses: ['bms', 'hnc'],
      },
      {
        term: 'HVAC',
        expand: 'Heating, ventilation and air conditioning',
        def: 'The plant that conditions a building. Most BMS points exist to measure or control some part of it.',
        courses: ['bms', 'hnc'],
      },
      {
        term: 'AHU',
        expand: 'Air handling unit',
        def: 'The assembly that filters, heats, cools and moves air around a building. Usually the largest single collection of sensors and actuators a BMS talks to.',
        courses: ['bms', 'hnc'],
      },
      {
        term: 'BACnet / MS/TP',
        def: 'An open building-automation protocol. MS/TP is its master-slave/token-passing variant running over RS-485 twisted pair, which is what most field-level BACnet devices use.',
        courses: ['bms', 'hnc'],
      },
      {
        term: 'KNX',
        def: 'An open European standard for building control, commonly used for lighting, blinds and room control. Devices are configured rather than programmed, using a shared tool.',
        courses: ['bms', 'hnc'],
      },
      {
        term: 'DALI',
        expand: 'Digital Addressable Lighting Interface',
        def: 'A lighting control protocol where each luminaire has its own address, so fittings can be grouped and re-grouped in software rather than by rewiring. Also used to poll emergency luminaires for automatic testing.',
        courses: ['bms', 'hnc', 'emergency-lighting'],
      },
      {
        term: 'RS-485',
        def: 'A differential two-wire serial standard used by a great many industrial and building protocols. Robust over long runs, but it is a bus — termination and polarity matter, and one reversed pair can take down a whole segment.',
        courses: ['bms', 'hnc', 'instrumentation'],
      },
      {
        term: 'CIBSE',
        expand: 'Chartered Institution of Building Services Engineers',
        def: 'The professional body for building services. Its Guides and Technical Memoranda are the usual UK design reference for lighting, ventilation and thermal comfort.',
        courses: ['hnc', 'bms'],
      },
    ],
  },
  {
    heading: 'Process instrumentation',
    blurb: 'Measuring a process and getting the signal back to the control system.',
    courses: ['instrumentation', 'moet'],
    entries: [
      {
        term: 'HART',
        expand: 'Highway Addressable Remote Transducer',
        def: 'A digital signal superimposed on a 4-20 mA loop, so a smart transmitter can be configured and interrogated without disturbing the analogue reading the control system is using.',
        courses: ['instrumentation', 'moet'],
      },
      {
        term: 'LRV / URV',
        expand: 'Lower / upper range value',
        def: 'The process values a transmitter maps to 4 mA and 20 mA. Re-ranging means changing these; it is not the same as calibration, which is about whether the instrument reads the truth at all.',
        courses: ['instrumentation', 'moet'],
      },
      {
        term: 'DP',
        expand: 'Differential pressure',
        def: 'The difference between two pressures. Used to infer flow across a restriction, or level in a closed vessel — which is why a DP level transmitter is sensitive to what is sitting in its impulse lines.',
        courses: ['instrumentation', 'moet'],
      },
      {
        term: 'PV / SP / MV',
        expand: 'Process variable / setpoint / manipulated variable',
        def: 'The three quantities a control loop works with: what is measured, what you want it to be, and what the controller moves to get there. Note that PV here means process variable, not photovoltaic.',
        courses: ['instrumentation', 'moet'],
      },
      {
        term: 'NAMUR',
        def: 'A European process-industry user association whose recommendations are widely adopted — NAMUR NE 43 defines the signal levels outside 4-20 mA that a transmitter uses to indicate a fault rather than a reading.',
        courses: ['instrumentation'],
      },
    ],
  },
  {
    heading: 'Renewables and low carbon',
    blurb: 'Generation, storage and the permissions needed to connect them.',
    courses: ['renewables', 'ev-charging', 'moet'],
    entries: [
      {
        term: 'PV',
        expand: 'Photovoltaic',
        def: 'Generation that converts light directly into DC electricity at the cell. In a control or instrumentation context PV means process variable instead — the abbreviation is shared and the context decides.',
        courses: ['renewables', 'moet'],
      },
      {
        term: 'BESS',
        expand: 'Battery energy storage system',
        def: 'Battery storage with its inverter, protection and management system. Introduces stored energy that remains present after the AC supply is isolated, which changes the isolation procedure.',
        courses: ['renewables', 'moet'],
      },
      {
        term: 'G98 / G99',
        def: 'Engineering Recommendations for connecting generation to the distribution network. G98 covers small installations that can be connected and then notified; G99 covers larger ones needing application and agreement before connection.',
        courses: ['renewables', 'ev-charging'],
      },
      {
        term: 'EREC',
        expand: 'Engineering Recommendation',
        def: 'The Energy Networks Association document series that G98, G99 and G100 belong to. They govern how installations interact with the distribution network.',
        courses: ['renewables'],
      },
      {
        term: 'MCS',
        expand: 'Microgeneration Certification Scheme',
        def: 'The UK certification scheme for small-scale renewable technologies and their installers. Certification is normally what makes an installation eligible for support schemes.',
        courses: ['renewables'],
      },
      {
        term: 'LCT',
        expand: 'Low carbon technology',
        def: 'The collective term for heat pumps, PV, battery storage and EV charging — the loads and generators that change a domestic supply from a predictable profile into a variable one.',
        courses: ['renewables', 'ev-charging'],
      },
    ],
  },
  {
    heading: 'Portable appliance testing',
    blurb: 'In-service inspection and testing of electrical equipment.',
    courses: ['pat-testing'],
    entries: [
      {
        term: 'Class I / II / III',
        def: 'Equipment construction classes. Class I relies on an earthed metal enclosure and needs an earth continuity test; Class II is double or reinforced insulated with no protective earth; Class III is supplied at SELV. The class decides which tests apply.',
        courses: ['pat-testing'],
      },
      {
        term: 'HSG107',
        def: 'HSE guidance on maintaining portable electric equipment. It is where the risk-based approach to inspection frequency comes from — there is no legally fixed interval, and HSG107 is explicit that the dutyholder sets it.',
        courses: ['pat-testing'],
      },
      {
        term: 'Formal visual inspection',
        def: 'A documented visual check without instruments. HSG107 treats it as the single most valuable part of the regime — most faults found in in-service equipment are visible before any test is run.',
        courses: ['pat-testing'],
      },
      {
        term: 'Protective conductor current',
        def: 'The current normally flowing in the protective conductor of healthy equipment, measured as an alternative to insulation resistance where a device cannot tolerate a 500 V test. Sometimes still called earth leakage current.',
        courses: ['pat-testing'],
      },
    ],
  },
  {
    heading: 'Smart home and connected buildings',
    blurb: 'The protocols domestic and light-commercial control actually runs on.',
    courses: ['smart-home', 'bms'],
    entries: [
      {
        term: 'Zigbee',
        def: 'A low-power mesh protocol on 2.4 GHz. Devices relay for each other, so mains-powered nodes extend coverage while battery sensors stay asleep. A hub or coordinator is required.',
        courses: ['smart-home', 'bms'],
      },
      {
        term: 'Z-Wave',
        def: 'A low-power mesh protocol on sub-GHz frequencies (868 MHz in the UK). Longer range and less congested than 2.4 GHz, and it does not compete with Wi-Fi, but it needs Z-Wave devices throughout.',
        courses: ['smart-home'],
      },
      {
        term: 'Matter',
        def: 'An application-layer standard intended to let devices from different manufacturers work together over Wi-Fi and Thread. It sits above the radio rather than replacing it.',
        courses: ['smart-home'],
      },
      {
        term: 'Thread',
        def: 'A low-power IPv6 mesh network. Unlike Zigbee and Z-Wave, every node is addressable on the IP network, which is why Matter builds on it.',
        courses: ['smart-home'],
      },
      {
        term: 'Hub / bridge',
        def: 'The device that translates between protocols and out to the internet. It is also the single point of failure in most smart installations — worth saying out loud to a customer before it is installed rather than after.',
        courses: ['smart-home'],
      },
    ],
  },
  {
    heading: 'Energy and efficiency',
    blurb: 'Measuring what a building uses, and justifying what it would cost to change.',
    courses: ['energy-efficiency', 'hnc', 'renewables'],
    entries: [
      {
        term: 'ESOS',
        expand: 'Energy Savings Opportunity Scheme',
        def: 'A mandatory UK energy assessment scheme for large undertakings, run on a four-year cycle. Qualifying organisations must audit their energy use and report compliance.',
        courses: ['energy-efficiency', 'hnc'],
      },
      {
        term: 'NPV',
        expand: 'Net present value',
        def: 'The value today of a project’s future cash flows, discounted for the fact that money later is worth less than money now. It is the figure that decides whether an efficiency measure is worth funding, and it is why simple payback alone rarely wins an argument.',
        courses: ['energy-efficiency', 'hnc'],
      },
      {
        term: 'Simple payback',
        def: 'Capital cost divided by annual saving, in years. Easy to calculate and easy to challenge, because it ignores the cost of capital and anything that happens after payback.',
        courses: ['energy-efficiency', 'hnc'],
      },
      {
        term: 'kWh vs kW',
        def: 'kW is a rate, kWh is a quantity. A 3 kW heater running for four hours uses 12 kWh. Tariffs charge for kWh; supply capacity and maximum demand charges are about kW.',
        courses: ['energy-efficiency', 'renewables', 'hnc'],
      },
      {
        term: 'Maximum demand',
        def: 'The highest average load over a defined interval. It sets supply capacity and, on many commercial tariffs, a standing charge — so shaving a peak can save money without reducing total consumption at all.',
        courses: ['energy-efficiency', 'hnc'],
      },
    ],
  },
  {
    heading: 'Industrial installations',
    blurb: 'Terms that recur across industrial plant and heavy-duty equipment.',
    courses: ['industrial-electrical', 'moet'],
    entries: [
      {
        term: 'IP rating',
        expand: 'Ingress protection',
        def: 'Two digits to BS EN 60529: the first is protection against solids and body parts, the second against water. IP65 is dust-tight and protected against jets; IP66 against heavy seas. The second digit is not a simple scale — IPX7 (immersion) does not imply IPX6 (jetting).',
        courses: ['industrial-electrical', 'moet', 'pat-testing'],
      },
      {
        term: 'Duty type (S1–S10)',
        def: 'IEC 60034-1 classifications for how a motor is loaded over time. S1 is continuous running, S2 short-time, S3 intermittent periodic. A motor sized for S1 and run on frequent starts will overheat even though the nameplate power looks adequate.',
        courses: ['industrial-electrical', 'moet'],
      },
      {
        term: 'Hazardous area zones',
        def: 'Classification of where an explosive atmosphere may be present. Gas: Zone 0 continuously, Zone 1 likely in normal operation, Zone 2 unlikely and short-lived. Dust uses Zones 20, 21 and 22. The zone determines what equipment may be installed.',
        courses: ['industrial-electrical', 'moet'],
      },
      {
        term: 'Enclosure form (Form 1–4)',
        def: 'How far a switchgear assembly separates busbars, functional units and terminals from each other. A higher form allows work on one outgoing way with the rest live, which is the whole point of specifying it.',
        courses: ['industrial-electrical', 'moet'],
      },
    ],
  },
  {
    heading: 'AM2 assessment',
    blurb:
      'The practical end assessment for the electrotechnical route, and the words used around it.',
    courses: ['am2', 'level3'],
    entries: [
      {
        term: 'AM2',
        def: 'The practical assessment taken at the end of the electrotechnical apprenticeship. It is a set of timed, observed tasks — installation, inspection and testing, fault diagnosis and a knowledge test — sat at an approved centre rather than on your own site.',
        courses: ['am2', 'level3'],
      },
      {
        term: 'AM2E / AM2S',
        def: 'Variants of the assessment. AM2E is the experienced-worker route for people qualifying without a full apprenticeship; AM2S is the version aligned to the current apprenticeship standard. Which one applies is set by your route, not by preference.',
        courses: ['am2', 'level3'],
      },
      {
        term: 'NET',
        expand: 'National Electrotechnical Training',
        def: 'The organisation that owns and administers the AM2, sets the specification and approves the assessment centres.',
        courses: ['am2', 'level3'],
      },
      {
        term: 'Composite installation',
        def: 'The build section: installing a defined arrangement of containment, cable and accessories to a drawing, within a time allowance. Marked on workmanship and compliance, not only on whether it works.',
        courses: ['am2'],
      },
      {
        term: 'Fault diagnosis section',
        def: 'A set of deliberately introduced faults to find and rectify against the clock. Marked on method as much as outcome — a fault found by luck scores differently from one found by systematic testing.',
        courses: ['am2'],
      },
      {
        term: 'Safe isolation section',
        def: 'A separately assessed task where the full isolation procedure is observed step by step. Getting the sequence wrong here is one of the most common reasons candidates lose marks on an otherwise sound assessment.',
        courses: ['am2', 'level3'],
      },
      {
        term: 'Gateway (AM2)',
        def: 'The point at which your employer and provider agree you are ready to sit the assessment, with the required qualifications and portfolio evidence in place. Sitting it before you are ready is the expensive mistake.',
        courses: ['am2', 'level3'],
      },
    ],
  },
];
