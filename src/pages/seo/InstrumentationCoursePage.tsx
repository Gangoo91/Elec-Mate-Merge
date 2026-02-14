import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Gauge,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Cpu,
  Activity,
  Radio,
  ShieldCheck,
  Wrench,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Instrumentation Course for Electricians | Process Control Training';
const PAGE_DESCRIPTION =
  'Comprehensive instrumentation training for UK electricians. Process control, sensors, PLCs, SCADA, 4-20mA current loops, calibration techniques, and industrial measurement. 8 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Instrumentation Course', href: '/training/instrumentation-course' },
];

const tocItems = [
  { id: 'why-instrumentation', label: 'Why Instrumentation Training Matters' },
  { id: 'process-control-fundamentals', label: 'Process Control Fundamentals' },
  { id: 'sensors-and-transducers', label: 'Sensors and Transducers' },
  { id: 'current-loops', label: '4-20mA Current Loops' },
  { id: 'plcs-and-scada', label: 'PLCs and SCADA Systems' },
  { id: 'calibration', label: 'Calibration Techniques' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Instrumentation is a high-demand specialism for electricians, particularly in process industries such as oil and gas, water treatment, pharmaceuticals, food manufacturing, and power generation — day rates for instrumentation engineers typically exceed £250.',
  'The 4-20mA analogue current loop remains the backbone of industrial instrumentation, with 4mA representing the zero or minimum process value and 20mA representing the full-scale or maximum value — understanding loop troubleshooting is essential.',
  'PLCs (Programmable Logic Controllers) are the central processing units of modern industrial control systems, receiving inputs from sensors, executing ladder logic or function block programmes, and driving outputs to actuators and indicators.',
  'SCADA (Supervisory Control and Data Acquisition) systems provide centralised monitoring and control of distributed instrumentation across large sites — electricians working in this space must understand communication protocols including Modbus, Profibus, and Ethernet/IP.',
  'Calibration is the process of verifying and adjusting instrument accuracy against known reference standards — Elec-Mate provides interactive calibration procedure walkthroughs covering pressure, temperature, flow, and level instruments.',
];

const faqs = [
  {
    question: 'What qualifications do I need to work in instrumentation?',
    answer:
      'There is no single mandatory qualification for instrumentation work in the UK, but employers and agencies typically expect a Level 3 electrical qualification (NVQ Level 3, C&G 2365, or C&G 2357) as a minimum, plus specific instrumentation training. The CompEx certification is required for instrumentation work in hazardous (explosive atmosphere) environments such as oil rigs, refineries, and chemical plants. Many instrumentation engineers hold an HNC or HND in Electrical and Electronic Engineering or a specialist instrumentation qualification such as the C&G Process Measurement and Control certificate. The 18th Edition qualification (C&G 2382) is expected by most employers. Practical experience is highly valued — many instrumentation engineers start as electricians and move into instrumentation through on-the-job training and short courses.',
  },
  {
    question: 'What is the difference between a 4-20mA loop and a 0-10V signal?',
    answer:
      'Both are analogue signals used to transmit process measurements, but they work differently. A 4-20mA current loop transmits information as a varying current: 4mA represents the zero or minimum process value (for example, 0 degrees C), and 20mA represents the full-scale or maximum value (for example, 100 degrees C). The key advantage is that current is unaffected by cable resistance over long distances — the signal arrives at the same value regardless of cable length. A 0-10V voltage signal transmits information as a varying voltage: 0V equals zero and 10V equals full scale. Voltage signals are susceptible to cable resistance (voltage drop over distance) and electrical noise, making them less suitable for long cable runs or noisy industrial environments. For this reason, 4-20mA loops are the industry standard for process instrumentation, while 0-10V signals are more common in building management systems and HVAC control.',
  },
  {
    question: 'What does a PLC do and why should electricians understand them?',
    answer:
      'A PLC (Programmable Logic Controller) is a ruggedised industrial computer that automates machinery and processes. It continuously scans its input modules (connected to sensors, switches, and transmitters), executes a stored programme (written in ladder logic, function block diagram, or structured text), and updates its output modules (connected to motor starters, valves, indicators, and solenoids). Electricians who work in industrial environments encounter PLCs daily — whether wiring sensor inputs, connecting motor drives to PLC outputs, or troubleshooting a process that has stopped. Understanding PLC input/output wiring, the basics of ladder logic, and how to read PLC diagnostic screens is essential for any electrician working in manufacturing, water treatment, food processing, or building services. You do not need to become a PLC programmer, but you do need to understand how PLCs interface with the electrical systems you install and maintain.',
  },
  {
    question: 'What is SCADA and where is it used?',
    answer:
      'SCADA stands for Supervisory Control and Data Acquisition. It is a system that collects real-time data from sensors and instruments across a site (or multiple sites), displays that data on operator screens, logs it for analysis, and allows operators to control processes remotely. SCADA is used in water treatment works, power stations, oil and gas pipelines, building management, railway signalling, and any large-scale process where centralised monitoring is needed. A typical SCADA system consists of field instruments (sensors, transmitters), remote terminal units (RTUs) or PLCs that collect the data locally, a communication network (often industrial Ethernet, fibre optic, or radio), and a central SCADA server with operator workstations. Electricians working on SCADA systems need to understand signal wiring, communication protocols, and how field devices interface with the control system.',
  },
  {
    question: 'How do I calibrate a pressure transmitter?',
    answer:
      'Calibrating a pressure transmitter involves applying known reference pressures and comparing the transmitter output (typically 4-20mA) against the expected values. The basic procedure is: (1) isolate the transmitter from the process using isolation valves, (2) connect a calibrated pressure source (hand pump or dead-weight tester) to the transmitter, (3) connect a calibrated milliamp meter to the output, (4) apply zero pressure and check the output reads 4.000mA, (5) apply 25%, 50%, 75%, and 100% of the transmitter range and check the corresponding outputs (8mA, 12mA, 16mA, 20mA), (6) adjust the zero and span if readings are outside the acceptable tolerance (typically plus or minus 0.1% of span), (7) repeat the check in descending order to verify there is no hysteresis, and (8) document the as-found and as-left readings on the calibration certificate. Elec-Mate includes interactive calibration walkthroughs that guide you through this process step by step.',
  },
  {
    question: 'What is the earning potential for instrumentation engineers?',
    answer:
      'Instrumentation engineers command premium rates in the UK. Employed instrumentation technicians typically earn £35,000 to £50,000 per annum, with senior engineers and those working offshore earning £55,000 to £75,000. Contract and agency instrumentation engineers working on shutdowns, commissioning, or project work can earn £250 to £400 per day, with offshore rates reaching £400 to £600 per day depending on location and certification requirements. The CompEx certification, which qualifies you to work in hazardous areas, adds a significant premium. Specialising in specific sectors (oil and gas, pharmaceuticals, nuclear) or technologies (PLC programming, SCADA integration, fibre optic communications) can further increase earning potential. The combination of an electrical qualification with instrumentation skills makes you highly versatile and marketable across multiple industries.',
  },
];

const modules = [
  {
    title: 'Introduction to Instrumentation and Process Control',
    description:
      'What instrumentation is, where it is used, the role of the instrumentation engineer, and how instrumentation relates to electrical installation work. Overview of process variables: pressure, temperature, flow, level, and analytical measurements.',
  },
  {
    title: 'Sensors and Transducers',
    description:
      'Types of sensors for each process variable — thermocouples, RTDs, pressure diaphragms, differential pressure cells, ultrasonic level sensors, magnetic flow meters, Coriolis meters, and pH probes. Selection criteria, mounting, and environmental considerations.',
  },
  {
    title: '4-20mA Current Loops and Signal Wiring',
    description:
      'How 4-20mA loops work, two-wire vs four-wire transmitters, loop-powered devices, signal isolation, intrinsic safety barriers, cable selection (instrument cable vs armoured), earthing and screening, and troubleshooting common loop faults.',
  },
  {
    title: 'PLCs: Programmable Logic Controllers',
    description:
      'PLC hardware architecture — CPU, power supply, I/O modules (digital and analogue). Input and output wiring, sourcing vs sinking, analogue scaling, ladder logic fundamentals, and reading PLC diagnostic information for fault finding.',
  },
  {
    title: 'SCADA and Communication Protocols',
    description:
      'SCADA system architecture — field devices, RTUs, communication networks, and central servers. Protocols: Modbus RTU, Modbus TCP, Profibus DP, HART, and Ethernet/IP. Basic network configuration and signal path troubleshooting.',
  },
  {
    title: 'Calibration Principles and Practice',
    description:
      'Why calibration matters, traceability to national standards, calibration certificates, as-found and as-left readings, acceptable tolerances. Hands-on procedures for pressure, temperature, flow, and level transmitters.',
  },
  {
    title: 'Control Theory and Loop Tuning',
    description:
      'Feedback control, PID (Proportional-Integral-Derivative) control, open-loop vs closed-loop systems, set points, process variables, controller output. Basic loop tuning concepts: proportional band, integral time, derivative time.',
  },
  {
    title: 'Safety Instrumented Systems and Hazardous Areas',
    description:
      'Safety Integrity Levels (SIL), safety instrumented functions, emergency shutdown systems, and hazardous area classification (zones 0, 1, 2 for gas; zones 20, 21, 22 for dust). Introduction to CompEx and ATEX/IECEx certification requirements.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any instrumentation question in plain English. Get detailed answers on 4-20mA loops, PLC wiring, SCADA protocols, calibration procedures, and hazardous area requirements.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Step-by-step video explanations of sensor types, loop wiring, PLC I/O connections, and calibration techniques — watch on any device between shifts.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge after every module with scenario-based questions. Identify sensor types, calculate loop currents, interpret PLC ladder logic, and troubleshoot faults.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Track daily progress and stay on course with reminder notifications.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering instrument types, signal standards, PLC instructions, protocol specifications, and calibration procedures. Study during breaks on site.',
  },
  {
    icon: FileCheck2,
    title: 'Mock Exams',
    description:
      'Full-length mock examinations covering all eight modules. Instant marking with detailed explanations for every answer. Track your readiness score over time.',
  },
];

const sections = [
  {
    id: 'why-instrumentation',
    heading: 'Why Instrumentation Training Matters for Electricians',
    content: (
      <>
        <p>
          Instrumentation is one of the highest-paid specialisms available to electricians. Every
          industrial process — from water treatment and food manufacturing to oil refining and
          pharmaceutical production — depends on precise measurement and control of variables such
          as pressure, temperature, flow, and level. The electricians who install, maintain, and
          calibrate these measurement systems are in constant demand.
        </p>
        <p>
          Unlike general electrical installation work governed by{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink>,
          instrumentation work combines electrical skills with process knowledge, control theory,
          and communication protocols. This broader skill set commands premium rates — contract
          instrumentation engineers routinely earn £250 to £400 per day, with offshore and shutdown
          work commanding even higher rates.
        </p>
        <p>
          For electricians already working in{' '}
          <SEOInternalLink href="/training/industrial-electrician">
            industrial environments
          </SEOInternalLink>
          , adding instrumentation skills is a natural career progression. You already understand
          electrical circuits, protective devices, and safe isolation procedures — instrumentation
          builds on that foundation with sensor technology, signal processing, and control systems.
        </p>
        <p>
          The UK water industry alone employs thousands of instrumentation technicians across its
          treatment works and pumping stations. Add to that the petrochemical, pharmaceutical, food
          and beverage, and power generation sectors, and the demand for competent instrumentation
          engineers far outstrips supply.
        </p>
      </>
    ),
  },
  {
    id: 'process-control-fundamentals',
    heading: 'Process Control Fundamentals',
    content: (
      <>
        <p>
          Process control is the discipline of maintaining a process variable (such as temperature,
          pressure, flow, or level) at a desired value — the set point. The basic control loop
          consists of four elements: the sensor (which measures the process variable), the
          controller (which compares the measurement to the set point and calculates a corrective
          action), the final control element (which implements the correction, typically a valve or
          motor drive), and the process itself.
        </p>
        <p>
          In a closed-loop (feedback) control system, the controller continuously receives the
          measured value from the sensor, compares it to the set point, and adjusts the output to
          reduce the error. The most common control algorithm is PID — Proportional, Integral,
          Derivative — which balances speed of response, accuracy, and stability.
        </p>
        <p>
          Understanding these fundamentals is essential for any electrician working with
          instrumentation. When you wire a temperature transmitter to a PLC input and the PLC drives
          a control valve, you are working within a control loop. Knowing how the loop works helps
          you diagnose faults — is the problem with the sensor, the wiring, the controller
          programme, or the final control element?
        </p>
        <SEOAppBridge
          title="Master control theory with interactive simulations"
          description="Struggling with PID tuning or feedback loops? The Elec-Mate AI tutor explains control concepts in plain English with interactive examples. Ask any question about proportional band, integral time, or derivative action."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'sensors-and-transducers',
    heading: 'Sensors and Transducers: Measuring the Process',
    content: (
      <>
        <p>
          A sensor detects a physical quantity (temperature, pressure, flow, level) and a transducer
          converts that detection into a proportional electrical signal. In many modern instruments,
          the sensor and transducer are combined in a single device called a transmitter, which
          outputs a standardised signal — typically 4-20mA — that can be read by a PLC or SCADA
          system.
        </p>
        <p>
          <strong>Temperature sensors</strong> are the most common instruments in process
          industries. Thermocouples generate a small voltage proportional to temperature and are
          used for high-temperature applications (up to 1,800 degrees C). Resistance Temperature
          Detectors (RTDs), typically Pt100 or Pt1000, change resistance with temperature and offer
          better accuracy and stability for mid-range temperatures (minus 200 to 600 degrees C).
        </p>
        <p>
          <strong>Pressure sensors</strong> use diaphragms, strain gauges, or piezoelectric elements
          to convert pressure into an electrical signal. Differential pressure (DP) transmitters
          measure the difference between two pressures and are widely used for flow measurement
          (across an orifice plate) and level measurement (in pressurised vessels).
        </p>
        <p>
          <strong>Flow measurement</strong> encompasses electromagnetic flow meters (for conductive
          liquids), Coriolis meters (for mass flow measurement), ultrasonic meters, vortex meters,
          and orifice plate installations. Selection depends on the fluid type, pipe size, required
          accuracy, and process conditions.
        </p>
        <p>
          <strong>Level measurement</strong> uses techniques including ultrasonic (non-contact),
          radar (guided wave and through-air), hydrostatic pressure, capacitance, and float
          switches. Each technology has strengths and limitations based on the vessel contents,
          temperature, pressure, and whether the vessel is open or closed.
        </p>
      </>
    ),
  },
  {
    id: 'current-loops',
    heading: '4-20mA Current Loops: The Language of Instrumentation',
    content: (
      <>
        <p>
          The 4-20mA current loop is the universal analogue signal standard in industrial
          instrumentation. Understanding how it works is fundamental to every aspect of
          instrumentation work — from wiring and commissioning to fault finding and calibration.
        </p>
        <p>
          In a 4-20mA loop, the transmitter varies the loop current between 4mA (representing the
          zero or minimum process value) and 20mA (representing the full-scale or maximum value).
          For example, a pressure transmitter with a range of 0 to 10 bar would output 4mA at 0 bar
          and 20mA at 10 bar. At 5 bar (50% of range), the output would be 12mA.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Why 4mA and Not 0mA?</h3>
          <p className="text-white text-sm leading-relaxed">
            The live zero at 4mA is a critical design feature. If the loop current drops to 0mA, the
            control system knows there is a fault — a broken wire, a failed transmitter, or a power
            supply problem. If zero were 0mA, there would be no way to distinguish between a genuine
            zero reading and a broken cable. This fail-safe characteristic makes 4-20mA loops
            inherently safer than 0-based signal standards.
          </p>
        </div>
        <p>
          Two-wire transmitters are powered by the loop current itself — they draw their operating
          power from the same pair of wires that carry the signal. Four-wire transmitters have a
          separate power supply and the 4-20mA output is isolated from the power input. Two-wire
          devices are more common because they require less cabling, but four-wire transmitters are
          used where the instrument needs more power than the loop can provide.
        </p>
        <p>
          Loop troubleshooting follows a systematic approach: check the power supply voltage,
          measure the loop current with a calibrated milliamp meter in series, verify the
          transmitter output against a known reference, check for open circuits (broken wires, loose
          terminals), and check for ground faults (insulation breakdown on instrument cable).
          Elec-Mate provides{' '}
          <SEOInternalLink href="/training/electrical-science">
            interactive fault-finding scenarios
          </SEOInternalLink>{' '}
          that walk you through real-world loop troubleshooting.
        </p>
      </>
    ),
  },
  {
    id: 'plcs-and-scada',
    heading: 'PLCs and SCADA: The Control System Brain',
    content: (
      <>
        <p>
          Programmable Logic Controllers (PLCs) are the workhorses of industrial automation. They
          replaced hardwired relay panels in the 1970s and are now found in virtually every
          manufacturing plant, water treatment works, and process installation in the UK.
        </p>
        <p>
          A PLC consists of a power supply module, a CPU (Central Processing Unit), and I/O
          (Input/Output) modules. Digital input modules receive on/off signals from switches,
          pushbuttons, and proximity sensors. Digital output modules drive relays, contactors,
          solenoid valves, and indicator lamps. Analogue input modules receive 4-20mA or 0-10V
          signals from transmitters. Analogue output modules send 4-20mA or 0-10V signals to control
          valves and variable speed drives.
        </p>
        <p>
          As an electrician, your primary interaction with PLCs is at the I/O level — wiring sensors
          to input modules and wiring outputs to final control elements. Understanding the
          difference between sourcing and sinking digital I/O, how analogue signals are scaled in
          the PLC, and how to read the PLC diagnostic LEDs for fault identification is essential
          knowledge.
        </p>
        <p>
          SCADA (Supervisory Control and Data Acquisition) sits above the PLC level, collecting data
          from multiple PLCs and remote terminal units (RTUs) across a site or network of sites.
          SCADA provides operator interface screens, historical data logging, alarm management, and
          remote control capabilities. For electricians working on{' '}
          <SEOInternalLink href="/training/bms-course">building management systems</SEOInternalLink>{' '}
          or industrial control systems, understanding SCADA architecture and communication
          protocols is increasingly important.
        </p>
        <SEOAppBridge
          title="Interactive PLC wiring diagrams and exercises"
          description="Practice wiring sensors to PLC inputs and outputs to actuators with interactive exercises. Understand sourcing vs sinking, analogue scaling, and I/O addressing — all explained by the Elec-Mate AI tutor."
          icon={Cpu}
        />
      </>
    ),
  },
  {
    id: 'calibration',
    heading: 'Calibration: Ensuring Measurement Accuracy',
    content: (
      <>
        <p>
          Calibration is the process of comparing an instrument's reading against a known reference
          standard and adjusting the instrument if necessary to bring it within the required
          accuracy tolerance. Every process instrument — pressure transmitters, temperature sensors,
          flow meters, level transmitters, and analytical instruments — requires periodic
          calibration to maintain measurement accuracy.
        </p>
        <p>
          The calibration process follows a structured procedure: (1) isolate the instrument from
          the process, (2) apply known reference inputs at 0%, 25%, 50%, 75%, and 100% of the
          instrument range, (3) record the instrument output at each point (these are the "as-found"
          readings), (4) if any readings exceed the acceptable tolerance, adjust the instrument zero
          and span, (5) repeat the check and record the corrected readings ("as-left" readings), (6)
          complete the calibration certificate with all readings, reference standard details, and
          traceability information.
        </p>
        <p>
          Calibration traceability means that every reference standard used in a calibration can be
          traced back, through an unbroken chain of comparisons, to a national standard held by the
          National Physical Laboratory (NPL) in the UK. This ensures that measurements made by
          instruments calibrated in different laboratories are comparable and reliable.
        </p>
        <p>
          Common calibration equipment includes: dead-weight testers and hand pumps for pressure,
          dry block calibrators and ice baths for temperature, milliamp sources and meters for
          current loops, and decade resistance boxes for RTD simulation. Elec-Mate provides
          interactive walkthroughs for each calibration type, including calculation of acceptable
          tolerances and documentation templates.
        </p>
        <p>
          In regulated industries such as pharmaceuticals and nuclear, calibration records are
          subject to audit and must demonstrate full traceability. Electricians and instrumentation
          engineers who can demonstrate competence in calibration documentation are highly valued in
          these sectors.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/industrial-electrician',
    title: 'Industrial Electrician Course',
    description:
      'Industrial wiring, motor control, power distribution, and three-phase systems for factory environments.',
    icon: Wrench,
    category: 'Training' as const,
  },
  {
    href: '/training/electrical-science',
    title: 'Electrical Science Course',
    description:
      'The foundational science — Ohms law, AC theory, magnetism, and circuit analysis — that underpins all instrumentation work.',
    icon: Activity,
    category: 'Training' as const,
  },
  {
    href: '/training/bms-course',
    title: 'BMS Course',
    description:
      'Building Management Systems training covering HVAC control, BACnet, Modbus, and system integration.',
    icon: Settings,
    category: 'Training' as const,
  },
  {
    href: '/guides/electrical-specialisations',
    title: 'Electrical Specialisations Guide',
    description:
      'Explore all electrical specialisms — from fire alarm systems to renewable energy and data centres.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The wiring regulations that govern all fixed electrical installations alongside instrumentation wiring.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/training/working-at-height',
    title: 'Working at Height Course',
    description:
      'Essential safety training for instrumentation work on elevated pipe racks, vessels, and columns.',
    icon: ShieldCheck,
    category: 'Training' as const,
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Instrumentation Course for Electricians',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Intermediate',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT14H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function InstrumentationCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-08-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Instrumentation Training"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Instrumentation Course:{' '}
          <span className="text-yellow-400">Process Control for Electricians</span>
        </>
      }
      heroSubtitle="Master industrial instrumentation with comprehensive training in process control, sensors, PLCs, SCADA, 4-20mA current loops, and calibration. 8 modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={16}
      courseDuration="14 hours"
      courseLevel="Intermediate"
      coursePrerequisites="Level 3 electrical qualification or equivalent industrial electrical experience recommended"
      courseModules={8}
      courseCertification="CPD certificate on completion — valid for NICEIC, NAPIT, and ELECSA portfolios"
      courseWhoIsItFor="Qualified electricians looking to specialise in instrumentation and control, industrial electricians expanding into process industries, and apprentices studying for their Level 3 who want to understand industrial measurement"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to specialise in instrumentation?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 8 structured modules, interactive quizzes, video content, and an AI tutor for any instrumentation question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/instrumentation-course"
    />
  );
}
