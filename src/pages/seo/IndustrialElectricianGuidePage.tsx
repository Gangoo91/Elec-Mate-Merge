import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Factory,
  Zap,
  FileCheck2,
  Calculator,
  GraduationCap,
  PoundSterling,
  ShieldCheck,
  ClipboardCheck,
  Brain,
  HardHat,
  Cable,
  Cpu,
  Wrench,
  Settings,
  Gauge,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career', href: '/guides' },
  { label: 'Industrial Electrician', href: '/guides/industrial-electrician-guide' },
];

const tocItems = [
  { id: 'what-is-industrial-electrician', label: 'What Is an Industrial Electrician?' },
  { id: 'three-phase-systems', label: 'Three-Phase Systems' },
  { id: 'motor-control', label: 'Motor Control and Drives' },
  { id: 'plc-automation', label: 'PLC and Automation' },
  { id: 'maintenance-strategies', label: 'Maintenance Strategies' },
  { id: 'qualifications-needed', label: 'Qualifications and Training' },
  { id: 'factory-environments', label: 'Factory and Plant Environments' },
  { id: 'earnings-career', label: 'Earnings and Career Progression' },
  { id: 'elec-mate-for-industrial', label: 'Elec-Mate for Industrial Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Industrial electricians install, maintain, and repair electrical systems in factories, power stations, water treatment plants, manufacturing facilities, and heavy industrial environments — working with three-phase supplies, high-voltage equipment, motor control centres, and programmable logic controllers.',
  'Three-phase power distribution is fundamental to industrial work — understanding star and delta configurations, phase balancing, power factor correction, and harmonic filtering are essential skills that separate industrial electricians from domestic and commercial practitioners.',
  'PLC (Programmable Logic Controller) programming and industrial automation are increasingly important — modern factories use PLCs, HMIs (Human Machine Interfaces), SCADA systems, and variable speed drives to control machinery, and industrial electricians are expected to understand, commission, and fault-find these systems.',
  'Planned preventive maintenance (PPM) is a core part of industrial work — electricians carry out scheduled inspections, thermal imaging, vibration analysis, and condition monitoring to prevent unplanned downtime that can cost manufacturers thousands of pounds per hour.',
  'Elec-Mate supports industrial electricians with three-phase calculators, cable sizing for large installations, EICR certificates for industrial premises, AI-powered RAMS generation, and training courses covering inspection and testing of industrial systems.',
];

const faqs = [
  {
    question: 'What qualifications do I need to become an industrial electrician?',
    answer:
      'The standard route into industrial electrical work starts with a Level 3 Diploma in Electrical Installation (C&G 2365, 2357, or 5357), followed by the 18th Edition IET Wiring Regulations (C&G 2382-22) and the Inspection and Testing qualification (C&G 2391). For industrial-specific skills, you should add C&G 2396 (Design and Verification), which covers three-phase design and larger installation calculations. Beyond these, industrial employers increasingly expect PLC programming skills — Siemens S7, Allen-Bradley, Mitsubishi, or Schneider platforms are the most common in UK manufacturing. CompEx certification is required for work in explosive atmospheres (petrochemical, pharmaceutical, food processing with dust hazards). For high-voltage work, authorisation training and a formal Authorised Person appointment under the Electricity at Work Regulations 1989 are essential. Many industrial electricians also hold JIB (Joint Industry Board) ECS cards at the Approved Electrician or Technician level, which provide site access on larger industrial projects.',
  },
  {
    question: 'What is the difference between a commercial and an industrial electrician?',
    answer:
      'While there is overlap, the key difference is the type of load and the working environment. Commercial electricians work primarily with lighting, power, fire alarm, and emergency lighting systems in offices, retail, and hospitality premises. Industrial electricians work with machinery, motors, drives, control panels, PLCs, pneumatics, hydraulics, conveyor systems, CNC machines, and process control equipment in factories, plants, and heavy industrial settings. Industrial work involves higher fault levels, larger cable sizes (up to 300mm and above), busbar systems rated at thousands of amps, and high-voltage equipment (typically 11kV for incoming supplies to large industrial sites). The maintenance aspect is more prominent in industrial work — keeping production lines running is the primary objective, and unplanned downtime can cost a manufacturer £5,000 to £50,000 per hour depending on the process. Industrial electricians must also understand mechanical systems, as electrical and mechanical faults are often interconnected in industrial machinery.',
  },
  {
    question: 'How much do industrial electricians earn in the UK?',
    answer:
      'Industrial electrician salaries in the UK vary by region, experience, and specialisation. As a rough guide for 2026: a newly qualified industrial electrician (post-apprenticeship, first industrial role) earns £28,000 to £35,000 per year. An experienced industrial electrician with 5 or more years of industrial experience earns £35,000 to £45,000. A senior industrial electrician or controls engineer with PLC skills and project management experience earns £45,000 to £60,000. Specialists in high-voltage work, CompEx hazardous areas, or advanced automation (robotics, SCADA) can earn £55,000 to £75,000 or more. Shift premiums significantly boost earnings — a 3-shift pattern (mornings, afternoons, nights) can add 25 to 40% to the base salary. Overtime is common in manufacturing, particularly during planned shutdowns and maintenance windows. Contract rates for experienced industrial electricians range from £25 to £40 per hour through agencies, with higher rates for specialised skills.',
  },
  {
    question: 'What does a typical day look like for an industrial electrician?',
    answer:
      'A typical day for an industrial maintenance electrician involves a handover from the previous shift (reviewing any outstanding faults, breakdowns during the night, or planned work for the day), followed by planned preventive maintenance tasks — checking motor currents, inspecting cable routes, testing safety interlocks, verifying emergency stop circuits, and carrying out thermal imaging on distribution boards and motor control centres. Reactive breakdown work is unpredictable — a conveyor motor trips on overload, a PLC communication fault stops a production line, a VSD (Variable Speed Drive) displays a fault code, or a safety light curtain goes into lockout. The industrial electrician must diagnose the fault, repair or replace the component, and get the machine running again as quickly as possible. Documentation is important — recording all work in the CMMS (Computerised Maintenance Management System), updating electrical drawings, and logging spare parts used. Safety is paramount: permit-to-work systems, lockout/tagout procedures, and confined space protocols are part of daily routine.',
  },
  {
    question: 'Do I need CompEx certification for industrial work?',
    answer:
      'CompEx (Competency in Explosive Atmospheres) certification is required for electrical work in hazardous areas where explosive atmospheres may be present. This includes petrochemical plants, oil and gas installations, pharmaceutical manufacturing, food processing facilities (where combustible dusts are present), paint and coatings manufacturing, and chemical plants. CompEx is not required for all industrial work — a factory manufacturing metal components, a car assembly plant, or a warehouse distribution centre would not typically have hazardous area classifications. However, if any part of the facility has a zoned hazardous area (Zone 0, 1, 2 for gas/vapour or Zone 20, 21, 22 for dust), anyone carrying out electrical work in or near those zones must hold the relevant CompEx units. The main CompEx units are Ex01 to Ex04 for gas/vapour atmospheres and Ex11 to Ex14 for dust atmospheres. The certification is valid for 5 years and must be renewed through a refresher course and assessment. CompEx-qualified electricians command higher pay rates due to the specialist knowledge and the hazardous nature of the work.',
  },
  {
    question: 'What PLC systems should I learn for industrial work?',
    answer:
      'The most common PLC platforms in UK manufacturing are Siemens (S7-1200 and S7-1500 series, programmed in TIA Portal), Allen-Bradley / Rockwell Automation (CompactLogix and ControlLogix, programmed in Studio 5000), Mitsubishi (FX and iQ-R series, programmed in GX Works), and Schneider Electric (Modicon M340 and M580, programmed in EcoStruxure Control Expert). Siemens dominates the European market and is the most commonly encountered platform in UK industrial facilities, so starting with Siemens is a sensible choice. However, the programming concepts — ladder logic, function block diagrams, structured text, sequential function charts — are standardised under IEC 61131-3 and transfer across platforms. Many industrial electricians start by learning ladder logic (the most intuitive for electricians as it resembles relay logic diagrams) before moving to structured text and function blocks. Free PLC simulators and online courses are available for most platforms, allowing you to learn programming without physical hardware.',
  },
  {
    question: 'What is the role of an industrial electrician in maintenance shutdowns?',
    answer:
      'Planned maintenance shutdowns (also called outages or turnarounds) are periods when the factory or plant stops production to carry out major maintenance, upgrades, and statutory inspections. For industrial electricians, shutdowns are intense periods of concentrated work. Typical shutdown tasks include EICR periodic inspections of the entire installation (since circuits can be isolated without affecting production), motor overhauls and replacements, switchgear maintenance and testing, cable replacements and new cable installations, distribution board upgrades, PLC and control system upgrades, safety system testing and recertification, and new machinery installations. Shutdowns are carefully planned weeks or months in advance, with detailed schedules, resource plans, and critical path analysis. Industrial electricians working shutdowns often work extended hours (12-hour shifts, 7 days a week) for the duration of the shutdown to minimise downtime. The pay reflects this — shutdown rates are typically 1.5x to 2x normal rates, with additional premiums for nights and weekends.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-electrician-guide',
    title: 'Commercial Electrician Guide',
    description:
      'Complete guide to commercial electrical work — qualifications, typical projects, pricing, and CDM responsibilities.',
    icon: Factory,
    category: 'Guide',
  },
  {
    href: '/guides/three-phase-installation',
    title: 'Three-Phase Installation Guide',
    description:
      'Star and delta configurations, phase balancing, three-phase cable sizing, and protective device selection.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-commercial-premises',
    title: 'EICR for Commercial Premises',
    description:
      'Health and Safety at Work Act obligations, inspection intervals, and employer duties for commercial and industrial EICRs.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/cable-sizing-guide-bs7671',
    title: 'Cable Sizing Guide BS 7671',
    description:
      'Cable selection for three-phase circuits, correction factors, voltage drop, and fault current calculations.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/rams-generator',
    title: 'RAMS Generator',
    description:
      'Generate professional Risk Assessments and Method Statements with AI for industrial projects.',
    icon: HardHat,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-industrial-electrician',
    heading: 'What Is an Industrial Electrician?',
    content: (
      <>
        <p>
          An industrial electrician installs, maintains, fault-finds, and repairs electrical systems
          in heavy industrial environments — factories, manufacturing plants, power stations, water
          treatment works, food processing facilities, chemical plants, steelworks, and large-scale
          production facilities. The work covers everything from high-voltage incoming supplies and
          main switchgear to individual motor control circuits, sensor wiring, and PLC programming.
        </p>
        <p>
          Industrial electrical work is the most technically demanding branch of the electrical
          trade. The installations are larger, the fault levels are higher, the equipment is more
          complex, and the consequences of getting it wrong are more severe. A{' '}
          <SEOInternalLink href="/guides/domestic-electrician-guide">
            domestic electrician
          </SEOInternalLink>
          works with single-phase 230V supplies and 100A maximum demand. An industrial electrician
          may work with three-phase 400V distribution at thousands of amps, 11kV high-voltage
          switchgear, motor control centres with dozens of starters and drives, and control systems
          that coordinate hundreds of machines in a continuous production process.
        </p>
        <p>
          The role combines traditional electrical installation skills with control engineering,
          automation, and mechanical understanding. Modern industrial electricians are expected to
          commission variable speed drives, programme PLCs, configure HMI (Human Machine Interface)
          screens, fault-find communication networks, and interpret P&ID (Piping and Instrumentation
          Diagrams) alongside conventional electrical schematic drawings.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase-systems',
    heading: 'Three-Phase Power Systems in Industry',
    content: (
      <>
        <p>
          Three-phase power is the foundation of industrial electrical distribution. Unlike domestic
          single-phase supplies, industrial facilities use three-phase 400V (and often 11kV or 33kV
          at the incoming supply) to power large motors, heating elements, and{' '}
          <SEOInternalLink href="/guides/cable-sizing-guide-bs7671">cable sizing</SEOInternalLink>{' '}
          for distribution systems that supply entire factory floors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star and delta configurations</strong> — three-phase motors can be connected
                in star (Y) or delta (triangle) configuration. Star connection gives 230V per phase
                (used for starting, reduced current), while delta gives 400V per phase (full running
                power). Star-delta starters switch from star to delta after the motor reaches speed,
                reducing starting current to approximately one-third of direct-on-line starting
                current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phase balancing</strong> — in industrial distribution, loads must be
                balanced across all three phases to minimise neutral current, reduce losses, and
                prevent voltage imbalance that can damage three-phase motors. The industrial
                electrician must measure and adjust phase loading during commissioning and periodic
                maintenance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power factor correction</strong> — industrial motors and transformers draw
                reactive power (kVAr) in addition to real power (kW). A low power factor increases
                current draw and energy costs. Power factor correction capacitor banks are installed
                at the main switchboard or at individual large motors to bring the power factor
                closer to unity, reducing maximum demand charges from the electricity supplier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Harmonic filtering</strong> — variable speed drives and other power
                electronic equipment generate harmonic currents that can cause overheating of
                cables, neutral conductors, and transformers. Active and passive harmonic filters
                are used in industrial installations to reduce total harmonic distortion (THD) to
                acceptable levels.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Understanding three-phase systems is not optional for industrial work — it is the entry
          requirement. Every motor, every distribution board, every cable calculation, and every
          fault diagnosis involves three-phase theory. The{' '}
          <SEOInternalLink href="/guides/three-phase-installation">
            three-phase installation guide
          </SEOInternalLink>{' '}
          covers the practical aspects in more detail.
        </p>
      </>
    ),
  },
  {
    id: 'motor-control',
    heading: 'Motor Control and Variable Speed Drives',
    content: (
      <>
        <p>
          Electric motors are the workhorses of industry — they drive pumps, fans, compressors,
          conveyors, mixers, crushers, and virtually every moving part in a manufacturing process.
          Industrial electricians must understand motor types, starting methods, protection, and
          speed control.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct-on-line (DOL) starters</strong> — the simplest starting method. A
                contactor connects the motor directly to the supply. Used for smaller motors
                (typically up to 7.5kW) where the starting current (6 to 8 times full load current)
                does not cause unacceptable voltage dip on the supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star-delta starters</strong> — the motor starts in star configuration
                (reduced voltage) and switches to delta (full voltage) after a timed period. Reduces
                starting current to approximately one-third of DOL starting current. Common for
                motors from 7.5kW to 75kW in applications where a brief reduction in torque during
                starting is acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Soft starters</strong> — electronic devices that gradually increase the
                voltage applied to the motor during starting, providing smooth acceleration without
                the abrupt star-to-delta transition. Used for pumps, fans, and conveyors where
                smooth starting is important to reduce mechanical stress.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variable speed drives (VSDs)</strong> — also called variable frequency
                drives (VFDs) or inverters. These convert the fixed-frequency 50Hz supply to a
                variable frequency output, allowing precise control of motor speed. VSDs are now the
                standard for most industrial motor applications — they provide energy savings
                (particularly on pumps and fans where speed reduction gives cubic energy savings),
                precise process control, and built-in motor protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Fault-finding motor circuits is a core skill for industrial electricians. Common faults
          include overload trips (check motor current against nameplate rating), earth faults ({' '}
          <SEOInternalLink href="/guides/insulation-resistance-test">
            insulation resistance testing
          </SEOInternalLink>{' '}
          of motor windings), contactor coil failure, thermal overload relay settings, VSD parameter
          errors, and mechanical faults (bearing failure causing increased current draw). The
          ability to diagnose quickly and accurately directly affects production downtime and is
          what separates good industrial electricians from average ones.
        </p>
      </>
    ),
  },
  {
    id: 'plc-automation',
    heading: 'PLC Programming and Industrial Automation',
    content: (
      <>
        <p>
          Programmable Logic Controllers (PLCs) are the brains of modern industrial automation. They
          replaced hardwired relay logic panels decades ago and now control virtually every
          automated process in manufacturing — from simple conveyor sequencing to complex batch
          processing and robotic cells.
        </p>
        <p>
          Industrial electricians are increasingly expected to understand PLC systems at a working
          level. This does not necessarily mean writing complete PLC programmes from scratch (that
          is often the role of a controls engineer or systems integrator), but it does mean being
          able to:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Read ladder logic</strong> — the most common PLC programming language for
                industrial applications. Ladder logic uses contacts, coils, timers, counters, and
                comparison instructions arranged in a format that resembles electrical relay circuit
                diagrams. An industrial electrician must be able to follow the logic to understand
                what conditions cause an output to energise or de-energise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monitor inputs and outputs</strong> — connect to the PLC with a laptop or
                programming terminal and monitor the state of digital and analogue inputs and
                outputs in real time. This is the primary fault-finding technique for PLC-controlled
                systems — if a motor will not start, check whether the PLC output for that motor is
                energised, then trace backwards through the logic to find which input condition is
                not met.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commission VSDs via PLC</strong> — modern variable speed drives are often
                controlled via fieldbus communication (Profinet, EtherNet/IP, Modbus TCP) from the
                PLC rather than hardwired analogue signals. The industrial electrician must
                understand how to set the drive parameters, configure the communication settings,
                and verify the speed and torque references from the PLC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modify simple logic</strong> — make minor programme changes such as
                adjusting timer values, adding interlocks, or modifying alarm conditions. These
                small changes are common during commissioning and optimisation of production
                processes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The PLC platforms most commonly used in UK industry are Siemens (TIA Portal with S7-1200
          and S7-1500 PLCs), Allen-Bradley / Rockwell (Studio 5000 with CompactLogix and
          ControlLogix), Mitsubishi (GX Works), and Schneider Electric (EcoStruxure Control Expert).
          Learning even one platform to a competent level significantly increases your value as an
          industrial electrician.
        </p>
        <SEOAppBridge
          title="Industrial training on Elec-Mate"
          description="Elec-Mate's training courses cover three-phase systems, motor control, inspection and testing of industrial installations, and BS 7671 requirements for industrial premises. Study on your phone between shifts."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'maintenance-strategies',
    heading: 'Industrial Maintenance Strategies',
    content: (
      <>
        <p>
          Industrial electrical maintenance is not just about fixing things when they break. Modern
          manufacturing uses a hierarchy of maintenance strategies to maximise equipment uptime and
          minimise unplanned production losses.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reactive maintenance (breakdown)</strong> — fixing equipment after it fails.
                The most expensive strategy because unplanned downtime disrupts production
                schedules, causes waste, and may require emergency call-outs. Still unavoidable for
                some failures, but should not be the primary maintenance approach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planned preventive maintenance (PPM)</strong> — scheduled inspections and
                servicing at fixed intervals. Examples include checking motor currents quarterly,
                re-torquing busbar connections annually, testing RCDs monthly, and carrying out{' '}
                <SEOInternalLink href="/guides/eicr-for-commercial-premises">
                  periodic EICRs
                </SEOInternalLink>{' '}
                every 3 to 5 years. PPM prevents many failures but can result in unnecessary
                maintenance on equipment that is still in good condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition-based maintenance (CBM)</strong> — monitoring the actual condition
                of equipment and performing maintenance only when indicators show deterioration.
                Techniques include thermal imaging of switchgear and motor connections, vibration
                analysis of motor bearings, insulation resistance trending of motor windings, and
                oil analysis of transformer insulating oil. CBM targets maintenance where it is
                needed, reducing both unplanned failures and unnecessary planned maintenance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Predictive maintenance</strong> — using data analytics and machine learning
                to predict when equipment will fail based on historical patterns and real-time
                sensor data. This is the frontier of industrial maintenance, using IIoT (Industrial
                Internet of Things) sensors, cloud analytics, and AI algorithms to forecast failures
                days or weeks before they occur, allowing maintenance to be scheduled at the most
                convenient time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Industrial electricians working in maintenance roles spend most of their time on PPM and
          CBM activities, supplemented by reactive breakdown response. The ability to interpret
          condition monitoring data — particularly thermal imaging results and insulation resistance
          trends — is a valuable skill that improves with experience.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications-needed',
    heading: 'Qualifications and Training for Industrial Electricians',
    content: (
      <>
        <p>
          The qualification pathway for an industrial electrician builds on the standard electrical
          installation qualifications and adds specialist industrial skills:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Level 3 NVQ/Diploma in Electrical Installation</strong> — the foundation
                qualification. Most industrial electricians complete this through an apprenticeship
                in an industrial environment, which provides hands-on experience with three-phase
                systems, containment, and industrial wiring from the start.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>18th Edition (C&G 2382-22)</strong> — knowledge of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                is essential. Industrial electricians need deeper knowledge of Part 5 (selection and
                erection), Part 4 (protection for safety, particularly motor circuit protection),
                and Part 7 (special installations including high-voltage and explosive atmospheres).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and Testing (C&G 2391)</strong> — essential for carrying out
                periodic inspection of industrial installations. Industrial EICRs are complex and
                require thorough knowledge of testing procedures for three-phase systems, motor
                circuits, and large distribution systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PLC programming courses</strong> — manufacturer-specific training (Siemens
                TIA Portal, Allen-Bradley Studio 5000) or generic IEC 61131-3 programming courses.
                These are not formal City & Guilds qualifications but are highly valued by
                industrial employers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CompEx (if working in hazardous areas)</strong> — Ex01 to Ex04 for
                gas/vapour atmospheres, Ex11 to Ex14 for dust atmospheres. Mandatory for any
                electrical work in ATEX-classified zones. Renewed every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-voltage authorisation</strong> — formal training and appointment as an
                Authorised Person (HV) under the Electricity at Work Regulations 1989 for work on
                high-voltage equipment (typically 11kV). Required for switching operations, cable
                testing, and maintenance on HV switchgear.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Continuous professional development is critical in industrial work. Technology changes
          rapidly — new drive technologies, communication protocols (MQTT, OPC UA), safety systems
          (SIL-rated safety PLCs), and energy management systems all require ongoing learning. The
          best industrial electricians never stop studying.
        </p>
      </>
    ),
  },
  {
    id: 'factory-environments',
    heading: 'Working in Factory and Plant Environments',
    content: (
      <>
        <p>
          Industrial environments present unique challenges and hazards that domestic and commercial
          electricians do not encounter. Understanding and managing these risks is a core competence
          for industrial electricians.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lockout/tagout (LOTO)</strong> — the most critical{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedure
                </SEOInternalLink>{' '}
                in industrial work. Before carrying out any electrical work on machinery, the
                equipment must be isolated, locked out with a personal padlock, and tagged. Multiple
                electricians working on the same machine each apply their own lock. The equipment
                cannot be re-energised until every lock has been removed by its owner. Failure to
                follow LOTO procedures is one of the leading causes of serious electrical injuries
                in industry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permit-to-work systems</strong> — formal written authorisation for high-risk
                activities including working on or near high-voltage equipment, hot work (welding,
                soldering near combustible materials), confined space entry, and working at height.
                The permit specifies the work to be done, the safety precautions, and the authorised
                person responsible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Noise, heat, and environmental hazards</strong> — factories are noisy, often
                hot, and may have chemical, dust, or fume hazards. PPE requirements are more
                extensive than domestic or commercial work — hearing protection, safety glasses,
                fire-retardant clothing (for arc flash protection near HV switchgear), chemical
                resistant gloves, and respiratory protection may all be required depending on the
                area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arc flash hazard</strong> — industrial switchgear operates at fault levels
                that can produce devastating arc flash incidents. Arc flash risk assessments, arc
                flash boundary calculations, and appropriate arc-rated PPE are increasingly required
                for work on industrial switchgear. NFPA 70E and IEEE 1584 provide guidance, and UK
                industry is adopting these standards alongside the Electricity at Work Regulations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989 are
          the primary legislation governing industrial electrical safety. Employers must provide
          safe systems of work, adequate training, and appropriate PPE. Industrial electricians must
          follow these systems — taking shortcuts in an industrial environment can be fatal.
        </p>
        <SEOAppBridge
          title="Generate RAMS for industrial work"
          description="Elec-Mate's AI RAMS Generator creates site-specific Risk Assessments and Method Statements for industrial electrical activities — motor replacements, switchgear maintenance, cable installations, and commissioning. Professional documentation ready for the safety manager."
          icon={HardHat}
        />
      </>
    ),
  },
  {
    id: 'earnings-career',
    heading: 'Earnings and Career Progression',
    content: (
      <>
        <p>
          Industrial electricians are among the highest-paid electricians in the UK, reflecting the
          specialist skills required and the demanding working conditions. Here is a guide to
          earnings and career progression in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Newly qualified (0 to 2 years)</strong> — £28,000 to £35,000 base salary.
                Post-apprenticeship, working under supervision of experienced industrial
                electricians. Learning site-specific systems and building fault-finding skills.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experienced (3 to 7 years)</strong> — £35,000 to £48,000 base salary.
                Working independently on maintenance and installation. Carrying out EICRs,
                commissioning drives, and fault-finding PLC systems. May supervise apprentices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Senior / Controls Engineer (7+ years)</strong> — £45,000 to £65,000 base
                salary. PLC programming, SCADA configuration, project management, system design.
                Leading maintenance teams or managing capital projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist (HV, CompEx, Robotics)</strong> — £55,000 to £75,000+.
                High-voltage authorised persons, CompEx-qualified specialists, and
                robotics/automation engineers command premium salaries. Contract rates of £30 to £45
                per hour are common.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Shift premiums add significantly to base earnings. A continental shift pattern (2 days, 2
          nights, 4 off) typically adds 25% to 33% on top of base salary. Overtime during planned
          shutdowns and busy production periods can add another £5,000 to £15,000 per year.
        </p>
        <p>
          Career progression routes include moving into controls engineering (PLC and automation
          focus), maintenance management (leading teams of electricians and fitters), project
          engineering (managing capital investment projects), or health and safety management. Some
          industrial electricians move into{' '}
          <SEOInternalLink href="/guides/starting-electrical-business">
            self-employment
          </SEOInternalLink>
          , offering specialist services such as PLC programming, thermal imaging, or high-voltage
          testing on a contract basis.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-for-industrial',
    heading: 'Elec-Mate for Industrial Electricians',
    content: (
      <>
        <p>
          Elec-Mate supports industrial electricians with tools designed for the complexity and
          scale of industrial electrical work:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Three-Phase Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cable sizing for three-phase circuits with correction factors, voltage drop
                  calculations for long sub-main runs, maximum demand assessment, prospective fault
                  current calculations, and{' '}
                  <SEOInternalLink href="/guides/three-phase-power-calculator">
                    three-phase power calculations
                  </SEOInternalLink>
                  . All the calculations an industrial electrician needs, right on your phone.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Industrial EICR Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  The EICR module handles multi-board industrial installations with unlimited
                  circuits. Record hundreds of circuit test results across multiple distribution
                  boards and sub-boards. AI board scanner works on industrial distribution boards.
                  Send the completed EICR to the site manager from your phone.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Circuit Designer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the industrial installation — supply details, motor loads, lighting, and
                  special requirements — and the AI produces a compliant design with distribution
                  board schedules, cable sizing, and protective device selection. Ideal for
                  design-and-build industrial projects.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <HardHat className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RAMS Generator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate site-specific RAMS for industrial electrical work — motor replacements,
                  switchgear maintenance, cable pulling, busbar installation, and live working
                  assessments. Professional documentation that satisfies the most demanding safety
                  managers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Training Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Study for the 18th Edition, 2391 Inspection and Testing, and other qualifications
                  on Elec-Mate. 50+ structured courses covering BS 7671, testing procedures, and
                  industrial-specific topics. Learn between shifts on your phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function IndustrialElectricianGuidePage() {
  return (
    <GuideTemplate
      title="Industrial Electrician Guide | Skills & Career UK"
      description="Complete guide to working as an industrial electrician in the UK. Three-phase systems, motor control, PLC programming, variable speed drives, maintenance strategies, qualifications, earnings, and career progression in industrial electrical work."
      datePublished="2025-06-25"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Factory}
      heroTitle={
        <>
          Industrial Electrician Guide:{' '}
          <span className="text-yellow-400">Skills, Career, and Earnings UK</span>
        </>
      }
      heroSubtitle="Three-phase distribution, motor control, PLC programming, variable speed drives, and planned maintenance. What industrial electricians do, the qualifications you need, how much you can earn, and how Elec-Mate supports industrial electrical work."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Industrial Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Industrial Electrical Tools on Your Phone"
      ctaSubheading="Three-phase calculators, multi-board EICRs, AI circuit design, RAMS generation, and training courses. Everything an industrial electrician needs. 7-day free trial."
    />
  );
}
