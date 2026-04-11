import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  Settings,
  Shield,
  FileCheck2,
  PoundSterling,
  Activity,
  Cpu,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Industrial Guides', href: '/industrial-electrical-installation' },
  { label: 'Motor Starter Installation', href: '/motor-starters-installation' },
];

const tocItems = [
  { id: 'types-of-starters', label: 'Types of Motor Starters' },
  { id: 'dol-starters', label: 'Direct On-Line (DOL) Starters' },
  { id: 'star-delta-starters', label: 'Star-Delta Starters' },
  { id: 'vfd-drives', label: 'VFD / Inverter Drives' },
  { id: 'wiring-and-control', label: 'Wiring and Control Circuits' },
  { id: 'overload-protection', label: 'Overload Protection' },
  { id: 'forward-reverse', label: 'Forward/Reverse Control' },
  { id: 'applications', label: 'Typical Applications' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'DOL starters are suitable for motors up to 5.5 kW (some up to 7.5 kW) and draw 6–8 times full load current on starting — only acceptable where the supply can handle the inrush.',
  'Star-delta starters reduce starting current to approximately one-third of DOL, making them the standard choice for motors from 7.5 kW to 45 kW in industrial premises.',
  'Variable Frequency Drives (VFDs) provide fully controlled acceleration, speed control, and the lowest starting current — essential for pumps, fans, compressors, and conveyor systems.',
  'All motor circuits require overload protection set to the motor full load current (FLC) — typically a bi-metallic overload relay or electronic motor protection relay.',
  'Control circuits (24 VDC or 110 VAC SELV) must be segregated from power circuits, and all conductors must be labelled in accordance with BS 7671 and the installation drawings.',
  'Forward/reverse contactors must be mechanically and electrically interlocked to prevent simultaneous energisation, which would cause a phase-to-phase short circuit.',
];

const faqs = [
  {
    question: 'What size motor can a DOL starter be used with?',
    answer:
      'In practice, DOL starting is used for motors up to approximately 5.5 kW on a standard 400 V three-phase supply, though some installations allow up to 7.5 kW where the supply impedance is low and the DNO permits the starting current. Above this rating, the starting inrush (typically 6–8 times FLC) causes voltage dips that affect other equipment on the same supply. The network operator or supply authority may impose lower limits — always check before installing DOL above 4 kW.',
  },
  {
    question: 'What is the starting current reduction achieved by a star-delta starter?',
    answer:
      'A star-delta starter reduces starting current to approximately one-third (33%) of the DOL starting current. Starting torque is also reduced to one-third, so star-delta is only suitable for loads that can start unloaded or under light load. The transition from star to delta must occur when the motor has reached approximately 70–80% of its running speed; a timer relay is used to control this transition, typically set between 5 and 15 seconds depending on the motor and load.',
  },
  {
    question: 'When should a VFD be specified instead of a star-delta starter?',
    answer:
      'A VFD should be specified when you need variable speed control (pumps, fans, conveyors), when starting torque must be controlled precisely, when the load cannot tolerate the torque step at star-delta transition, when energy savings from speed reduction are required (the affinity laws mean halving fan speed cuts power consumption by approximately 87.5%), or when the supply is sensitive to starting current inrush. VFDs also provide motor protection functions including overcurrent, overvoltage, and phase loss detection.',
  },
  {
    question: 'What overload protection is required for motor circuits?',
    answer:
      'BS 7671 Regulation 552.1 requires overload protection for motor circuits unless the motor is continuously supervised or the supply authority permits omission. In practice, all motor starters include an overload relay set to the motor full load current (FLC) as stated on the motor nameplate. Bi-metallic overload relays are standard in DOL and star-delta starters. Electronic motor protection relays (MPRs) are used in more critical applications, providing phase loss detection, stall protection, and thermistor inputs for the motor winding temperature sensor.',
  },
  {
    question: 'What cable type and size should be used for motor circuits?',
    answer:
      'Motor circuits typically use multicore armoured cable (SWA) to BS 5467 or BS 6724 for fixed installation, or flexible conduit to the motor terminal box. Cable size is selected based on the motor FLC with a diversity factor of 1.0 (no diversity for motors). The cable must also satisfy volt drop limits (typically 4% under running conditions for motor circuits) and withstand the starting current thermally. Aluminium wire armour provides both mechanical protection and an earth path; a separate earth conductor should be run if the armour continuity cannot be guaranteed.',
  },
  {
    question: 'Do motor starters need to be installed in a specific enclosure?',
    answer:
      'Motor starters must be housed in enclosures with an IP rating appropriate to the environment — IP54 minimum for dusty or damp industrial locations, IP65 or higher for washdown areas. The enclosure must provide mechanical protection, be lockable for safe isolation, and allow safe access for maintenance. All enclosures must be clearly labelled with the motor circuit designation, voltage, and maximum current. Where multiple starters are installed in a panel, busbars and internal wiring must comply with BS EN 61439 (Low-voltage switchgear and controlgear assemblies).',
  },
  {
    question: 'What documentation is required after motor starter installation?',
    answer:
      'At minimum, you must provide: circuit diagrams (power and control), cable schedules, device settings (overload relay setting, timer relay setting for star-delta, VFD parameter list), test and commissioning records, and an Electrical Installation Certificate (EIC) for the new circuit. For VFDs, the parameter list should be recorded and a copy stored both with the panel and in the asset management system. Operation and maintenance instructions for the starter manufacturer should be left with the end user.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/industrial-earthing-systems',
    title: 'Industrial Earthing Systems',
    description:
      'TN-S, TN-C-S, and TT earthing for industrial premises, EMC earthing, and testing.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/plc-electrical-installation',
    title: 'PLC Electrical Installation',
    description: 'Panel design, I/O wiring, earthing for noise immunity, and cable segregation.',
    icon: Cpu,
    category: 'Guide',
  },
  {
    href: '/power-factor-correction',
    title: 'Power Factor Correction',
    description:
      'Capacitor banks, harmonic detuning, and payback calculation for industrial users.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-installation-certificate',
    title: 'Electrical Installation Certificate',
    description:
      'Complete EICs on your phone and export PDF instantly for motor circuit installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'types-of-starters',
    heading: 'Types of Motor Starters',
    content: (
      <>
        <p>
          Motor starters control the starting, stopping, and protection of electric motors. Choosing
          the correct starter type is essential — an undersized or incorrectly specified starter
          damages equipment, trips protection devices, and can cause supply voltage dips that affect
          neighbouring plant. The three principal starter types used in UK industrial installations
          are direct on-line (DOL), star-delta, and variable frequency drives (VFDs). Each has
          distinct characteristics, cost profiles, and application ranges.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>DOL (Direct On-Line)</strong> — simplest and lowest cost. Motor connected
                directly to supply voltage. Starting current 6–8 × FLC. Suitable for motors up to
                approximately 5.5 kW where supply can absorb the inrush.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star-Delta</strong> — motor windings connected in star during starting
                (reduces voltage per winding to 58%), then switched to delta for running. Reduces
                starting current to ~33% of DOL. Suitable for motors 7.5 kW to 45 kW.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>VFD / Inverter Drive</strong> — converts AC to DC then back to variable
                frequency AC. Fully controlled acceleration ramp, speed control, and lowest starting
                current. Suitable for all motor sizes where speed control or soft-start is required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Soft starters (electronic reduced voltage starters) are a fourth option for applications
          where speed control is not required but a smooth torque ramp is needed, particularly for
          conveyors and compressors. They reduce the voltage electronically during starting but run
          at fixed speed.
        </p>
      </>
    ),
  },
  {
    id: 'dol-starters',
    heading: 'Direct On-Line (DOL) Starters',
    content: (
      <>
        <p>
          A DOL starter consists of a main contactor, an overload relay, and a control transformer
          or 24 VDC power supply. On pressing the start button, the control circuit energises the
          contactor coil, closing the main contacts and connecting the motor directly to the
          three-phase supply. The overload relay monitors current continuously; if current exceeds
          the set point for longer than the trip time characteristic, the relay opens its contact in
          the control circuit, de-energising the contactor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main contactor selection</strong> — rated by AC utilisation category. AC-3
                (squirrel cage motors) is standard for DOL applications. The contactor must be rated
                for the motor kW rating and the associated making and breaking duty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overload relay setting</strong> — set to motor nameplate FLC (full load
                current in amps). Allow for Class 10 trip class for standard motors, Class 20 for
                high-inertia loads. The dial on bi-metallic relays is marked in amps; set precisely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Short-circuit protection</strong> — a motor circuit breaker (MCB Type D or
                MCCB) upstream of the contactor provides short-circuit protection. Motor circuit
                breakers combine the MCB and overload relay function in a single device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control circuit</strong> — typically 24 VDC from a PELV power supply, or 110
                VAC SELV from a control transformer. Start/stop pushbuttons, pilot lamps, and
                auxiliary contacts for interlocking wired in the control circuit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'star-delta-starters',
    heading: 'Star-Delta Starters',
    content: (
      <>
        <p>
          Star-delta starting is the most widely used reduced-voltage starting method for motors
          between 7.5 kW and 45 kW in UK industrial premises. The motor must have six terminals
          accessible (both ends of each winding) — motors wound for star-only connection cannot be
          used with star-delta starters.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three contactors required</strong> — main contactor (KM1), star contactor
                (KM3, closed during starting), and delta contactor (KM2, closed during running).
                Mechanical interlock between star and delta contactors is mandatory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timer relay</strong> — an off-delay timer relay (typically 5–15 seconds)
                controls the star-to-delta transition. Setting too short causes excessive current
                spike at transition; setting too long causes the motor to run in star (drawing high
                current at load) before switching to delta.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transition current spike</strong> — the open-circuit transition from star to
                delta causes a current transient that can exceed DOL starting current. Closed
                transition star-delta (with a resistor bank during switching) eliminates this but is
                more complex and expensive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overload relay position</strong> — fitted in the delta circuit (between KM2
                contacts and motor terminals), not in the main line. This means the overload relay
                sees delta current (57.7% of line current). Set the overload relay dial to 58% of
                motor FLC, or use a relay with star-delta compensation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Star-delta starters are not suitable for loads that require significant torque during
          starting (e.g., loaded conveyors, positive displacement pumps) because starting torque is
          reduced to one-third of DOL torque. For high-inertia or high-torque starting requirements,
          specify a VFD or soft starter.
        </p>
      </>
    ),
  },
  {
    id: 'vfd-drives',
    heading: 'VFD / Inverter Drives',
    content: (
      <>
        <p>
          Variable Frequency Drives (VFDs), also called inverter drives or variable speed drives
          (VSDs), are now the preferred solution for motor control in most new industrial
          installations. They convert the incoming 50 Hz AC supply to DC (rectifier stage), then
          synthesise a variable frequency, variable voltage AC output (inverter stage) using
          pulse-width modulation (PWM).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Starting current</strong> — typically 100–150% of motor FLC during
                acceleration, compared to 600–800% for DOL. Acceleration ramp time is adjustable
                (typically 0–60 seconds) to match the load inertia and torque requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy savings</strong> — for centrifugal loads (pumps, fans), reducing
                speed by 20% reduces power consumption by approximately 49% (affinity laws). VFDs
                pay for themselves rapidly in systems that run below full speed for significant
                periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Harmonic distortion</strong> — VFDs generate harmonic currents (primarily
                5th and 7th harmonics) that can cause overheating in transformers and cables, and
                interfere with other equipment. Mitigate with line reactors, DC link reactors, or
                active front-end drives in large installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor cable length</strong> — PWM switching causes voltage reflections on
                long cables. Use screened motor cable and install an output reactor or dV/dt filter
                if cable length exceeds the VFD manufacturer's recommendation (typically 50–100 m
                without filtering).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing the VFD</strong> — the VFD screen (EMC gland) must be bonded to the
                panel earth bar at both ends. The motor cable screen must be bonded at the VFD and
                at the motor terminal box. This is essential for EMC compliance and for protection
                against bearing currents in larger motors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring-and-control',
    heading: 'Wiring and Control Circuits',
    content: (
      <>
        <p>
          Motor control panels are complex electrical assemblies that must comply with both BS 7671
          (wiring of the fixed installation) and BS EN 61439 (the LV switchgear and controlgear
          assembly standard). Control circuit wiring requires particular care to ensure safe
          operation and to facilitate fault-finding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power and control segregation</strong> — run power conductors (400 V, motor
                leads) and control conductors (24 VDC or 110 VAC) in separate cable trays or conduit
                runs, physically separated by at least 50 mm or a metallic barrier. This prevents
                induced noise on control circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conductor identification</strong> — all conductors in the panel must be
                identified at every termination with ferrules marked to match the circuit diagram.
                Use the IEC colour code: brown/black/grey for three-phase, blue for neutral, green
                and yellow for earth. Control circuit conductors commonly use black or grey with
                numbered ferrules.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIN rail layout</strong> — arrange devices logically from top to bottom:
                incoming isolator, MCBs/MCCBs, contactors, overload relays, control power supply,
                control terminal strip. Allow at least 25 mm clearance between device rows and
                provide sufficient cable duct capacity for the conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Terminal blocks</strong> — use DIN rail-mounted terminal blocks for all
                external connections. Label terminal blocks with the circuit diagram reference.
                Provide separate terminal blocks for power (PE, L1, L2, L3, N) and control (common,
                start, stop, run indication, fault indication).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'overload-protection',
    heading: 'Overload Protection Requirements',
    content: (
      <>
        <p>
          BS 7671 Regulation 552.1 requires that motors are protected against overload unless
          overload cannot occur (e.g., the motor is protected by its load characteristic) or where
          overload protection could cause a greater hazard than the overload itself (e.g., a fire
          pump that must run until it fails). In virtually all industrial installations, overload
          relays are required.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bi-metallic overload relays</strong> — the standard solution for DOL and
                star-delta starters. Current through bi-metallic strips heats and deflects them,
                tripping the relay after a time that depends on the degree of overload. Set dial to
                motor nameplate FLC. Always test operation during commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electronic motor protection relays</strong> — microprocessor-based relays
                that measure true RMS current on all three phases. Provide phase loss detection
                (single phasing protection), phase imbalance alarm, motor thermistor input (PTC),
                stall detection, and ground fault detection. Essential for pumps and compressors in
                unmanned locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermistor protection</strong> — motors in arduous duty (high ambient
                temperature, frequent starting) should be fitted with PTC thermistors in the stator
                windings. Connect the thermistor output to the motor protection relay for direct
                winding temperature monitoring independent of current measurement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Resetting</strong> — after an overload trip, investigate and rectify the
                cause before resetting. Never manually force a contactor closed or bypass the
                overload relay. Repeated tripping without investigation leads to motor winding
                failure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'forward-reverse',
    heading: 'Forward/Reverse Control Circuits',
    content: (
      <>
        <p>
          Many industrial applications require motors to run in both directions — lathes, hoists,
          conveyors, and valve actuators being common examples. Forward/reverse control requires two
          contactors wired to swap two of the three supply phases (swapping any two phases reverses
          a three-phase induction motor). The critical safety requirement is that both contactors
          must never be energised simultaneously.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical interlock</strong> — a physical bar or lever mechanism that
                prevents both contactors from closing simultaneously. This is a hard-wired
                mechanical safety measure, not dependent on the control circuit logic. Always use
                mechanically interlocked contactor pairs for forward/reverse.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical interlock</strong> — auxiliary normally-closed (NC) contacts from
                each contactor wired in series with the opposing contactor coil circuit. If the
                forward contactor is energised, its NC auxiliary contact opens the reverse contactor
                circuit, providing a second layer of protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stop before direction change</strong> — the control logic should require the
                motor to be stopped (and ideally allow time to decelerate) before selecting the
                opposite direction. Plugging (reversing a running motor) causes very high current
                and mechanical stress and should be avoided unless specifically designed for.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limit switches</strong> — travel limit switches (position limit switches)
                should be wired to de-energise the relevant contactor when the mechanical limit of
                travel is reached, preventing damage to machinery. Use NC contacts wired in series
                with the contactor coil.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'applications',
    heading: 'Typical Applications by Starter Type',
    content: (
      <>
        <p>
          Correct starter selection depends not only on motor size but also on the load
          characteristics, duty cycle, and whether speed control or soft starting is required. The
          following guidance covers the most common UK industrial applications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DOL starters</strong> — small workshop machinery (bench drills, grinders,
                lathes), small air compressors (up to 4 kW), roller shutter doors, small conveyor
                drives, exhaust fans, and sump pumps where motor size is within DOL limits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Star-delta starters</strong> — medium air compressors (7.5–45 kW), large
                fans started unloaded, centrifugal pumps started against a closed valve, machine
                tools with large spindle motors, and industrial refrigeration compressors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VFD drives</strong> — HVAC supply and extract fans (all sizes), chilled
                water pumps, cooling tower fans, variable-pressure hydraulic systems, conveyor
                systems requiring speed matching, extruder drives, mixers, and centrifuges.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Soft starters</strong> — loaded conveyor belts where VFD speed control is
                not required, large air compressors on fixed-speed systems, applications where
                smooth torque ramp is needed but speed variation is not required, and situations
                where VFD harmonics are a concern on isolated generators.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When specifying motor starters for new installations, document the load type, required
          starting torque, duty cycle (continuous, intermittent, or periodic), and ambient
          temperature. This information is needed to select the correct contactor AC utilisation
          category, overload relay trip class, and VFD derating if applicable.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Motor Starter Commissioning and Documentation',
    content: (
      <>
        <p>
          Motor starter installation and commissioning is typically notifiable work under Part P of
          the Building Regulations for domestic premises, and requires an Electrical Installation
          Certificate (EIC) for all new motor circuits in commercial and industrial premises under
          BS 7671. Thorough commissioning records protect you and your client.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue the EIC On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-installation-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete the Electrical Installation Certificate on your phone during
                  commissioning. Record the overload relay setting, motor FLC, circuit protective
                  conductor size, and test results — then export the PDF before you leave the site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote VFD Upgrades on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When servicing star-delta or DOL starters, calculate the energy savings from a VFD
                  upgrade and quote immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . A VFD upgrade on a 15 kW pump running at 80% speed typically pays back in under
                  two years — an easy sell to a facilities manager.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Motor circuit certification and quoting with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, motor circuit test recording, and instant PDF export. Quote VFD upgrades on the day. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MotorStartersInstallationPage() {
  return (
    <GuideTemplate
      title="Motor Starter Installation UK | DOL, Star-Delta & VFD Guide"
      description="Complete guide to motor starter installation in the UK. DOL, star-delta, and VFD drives explained — wiring, overload protection, forward/reverse control circuits, and BS 7671 compliance for industrial motor installations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Motor Starter Installation UK:{' '}
          <span className="text-yellow-400">DOL, Star-Delta &amp; VFD Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about motor starter installation — DOL starters for small motors, star-delta for medium motors, VFDs for speed control, overload protection, forward/reverse control circuits, and commissioning documentation."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Motor Starter Installation"
      relatedPages={relatedPages}
      ctaHeading="Complete Motor Circuit EICs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site electrical installation certification, test result recording, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
