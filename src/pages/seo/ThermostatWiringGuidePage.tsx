import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Thermometer,
  Zap,
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  CheckCircle2,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/guides' },
  { label: 'Thermostat Wiring Guide', href: '/thermostat-wiring-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'heating-system-types', label: 'S-Plan and Y-Plan Systems' },
  { id: 'room-thermostat', label: 'Room Thermostat Wiring' },
  { id: 'cylinder-thermostat', label: 'Cylinder Thermostat Wiring' },
  { id: 'programmer', label: 'Programmer Wiring' },
  { id: 'smart-thermostat', label: 'Smart Thermostat Installation' },
  { id: 'heat-pump', label: 'Heat Pump Thermostat Requirements' },
  { id: 'compatibility', label: 'Compatibility Checking' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'UK central heating systems use either S-Plan (two zone valves — one for heating, one for hot water) or Y-Plan (a single mid-position valve controlling both) wiring configurations. The wiring scheme must be understood before replacing any thermostat or programmer.',
  'Room thermostats switch the heating zone valve or boiler directly. They require a permanent live, a neutral, and a switched live output. Many smart thermostats (including Nest and Hive) also require an earth wire — verify before installation.',
  'Cylinder thermostats for domestic hot water control must be set to 60°C minimum to prevent Legionella bacteria growth. They switch the hot water zone valve in S-Plan systems or the hot water port of a mid-position valve in Y-Plan systems.',
  'Nest Learning Thermostat, Hive Active Heating, and tado° require an earth connection at the thermostat location. Properties with older wiring that do not have an earth at the stat position may require additional wiring.',
  'Heat pump systems (air source and ground source) require OpenTherm-compatible or weather compensation thermostats rather than simple on/off room thermostats, to allow the heat pump to modulate output efficiently.',
];

const faqs = [
  {
    question: 'What is the difference between S-Plan and Y-Plan heating systems?',
    answer:
      'S-Plan systems use two separate motorised zone valves — one for the central heating circuit and one for the domestic hot water cylinder. Each zone is controlled independently. S-Plan is more flexible and is preferred for new installations. Y-Plan systems use a single three-port mid-position motorised valve (Honeywell V4043 or similar) that can direct flow to heating only, hot water only, or both simultaneously. Y-Plan is common in older installations and uses less wiring, but the mid-position valve is more complex to diagnose when faulty.',
  },
  {
    question: 'Does a Nest thermostat need a neutral wire?',
    answer:
      "The Nest Learning Thermostat (3rd generation) and Nest Thermostat E do not require a neutral wire at the thermostat location — they draw a small standby current through the boiler's live circuit to charge their internal battery. However, both Nest thermostats do require an earth connection at the thermostat location. Many older UK properties have a 2-wire (live and switched live) thermostat circuit with no earth at the stat backplate. In this case, additional wiring is required to bring an earth to the thermostat location.",
  },
  {
    question: 'How do I wire a room thermostat to an S-Plan system?',
    answer:
      "In an S-Plan system, the room thermostat is typically wired in series with the heating zone valve. Terminal connections: permanent live (usually from the programmer's heating live output, or from the junction box) to thermostat terminal 1 (or COM). Thermostat switched live output (terminal 3, or the NO contact) connects to the heating zone valve motor terminal. Neutral connects through from the programmer/junction box. The switched live from the thermostat energises the zone valve motor when the thermostat calls for heat.",
  },
  {
    question: 'How do I wire a Hive thermostat?',
    answer:
      "Hive Active Heating uses a receiver unit (wired at the boiler/zone valve) and a wireless thermostat. The receiver requires: permanent live (L), neutral (N), earth (E), switched live to boiler (O or SL), and optionally connections to the boiler's OpenTherm terminals. The wireless thermostat simply requires a location on the wall away from heat sources — it communicates wirelessly with the Hive hub. Installation is significantly simpler than running new thermostat cable, making Hive and similar wireless systems a popular choice for retrofitting smart control in properties with limited access.",
  },
  {
    question: 'What voltage does a room thermostat operate at?',
    answer:
      "UK central heating room thermostats operate at 230V AC mains voltage. The thermostat is a mains-voltage switch in series with the heating circuit. This is different from some European and US heating systems which use 24V or 12V thermostats. Some smart thermostat systems (particularly those designed for use with combi boilers via OpenTherm) may use low-voltage communication protocols between the thermostat and a separate receiver or the boiler's own controller.",
  },
  {
    question: 'Can I replace a programmer and thermostat myself?',
    answer:
      'Replacing a programmer (timeswitch) or room thermostat on an existing circuit is not notifiable work under Building Regulations Part P in England. However, the work must still comply with BS 7671 and must be carried out competently. Incorrect wiring can damage the boiler, zone valves, or motorised valve and may create a safety hazard. If you are not confident in the wiring, or if the existing installation is non-standard, engaging a qualified electrician or heating engineer is strongly recommended. Note that gas connections are covered by Gas Safe regulations and must be carried out by a Gas Safe registered engineer.',
  },
  {
    question: 'Do heat pumps need a different thermostat to a gas boiler?',
    answer:
      'Yes. A simple on/off room thermostat is not ideal for a heat pump because heat pumps operate most efficiently at a steady, modulated output — not on/off cycling. Heat pump manufacturers recommend OpenTherm-compatible thermostats (which communicate modulation signals to the heat pump) or weather compensation controllers (which adjust flow temperature based on outside temperature). Simple on/off thermostats will work with heat pumps but will reduce efficiency significantly. The thermostat manufacturer and heat pump manufacturer documentation should both be consulted before specifying a thermostat for a heat pump installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/immersion-heater-installation',
    title: 'Immersion Heater Installation',
    description:
      'Dedicated 20A circuit, Legionella-safe thermostat settings, and solar diverter compatibility.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Protection Explained',
    description: 'How RCDs work, where they are required, and how to test them.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical inspection requirements and compliance deadlines.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'Electrical Certificate App',
    description: 'Complete electrical certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/led-lighting-upgrade',
    title: 'LED Lighting Upgrade',
    description: 'Replacing fluorescent and halogen lights — energy savings and costs.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Thermostat Wiring: Overview',
    content: (
      <>
        <p>
          UK central heating thermostats operate at mains voltage (230V AC) and act as switches in
          series with the heating circuit. Understanding how they are wired requires understanding
          the heating system type (S-Plan or Y-Plan), the role of the programmer, and the function
          of zone valves or the mid-position valve.
        </p>
        <p>
          The scope of this guide covers room thermostat wiring, cylinder thermostat wiring,
          programmer wiring, and the specific requirements for smart thermostats (Nest, Hive, tado°)
          and heat pump systems. All wiring must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          .
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who can carry out this work</strong> — replacing a thermostat or programmer
                on an existing circuit is not notifiable under Part P in England. However, running
                new wiring, modifying circuits, or installing a completely new control system IS
                notifiable and should be certified. Always test and verify wiring before restoring
                power.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety first</strong> — always isolate both the electrical supply and the
                boiler before working on heating controls. The programmer and junction box will be
                at mains voltage. Use an approved voltage indicator to prove dead before working on
                any terminals.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'heating-system-types',
    heading: 'S-Plan and Y-Plan Heating Systems',
    content: (
      <>
        <p>
          Before replacing any thermostat or programmer, identify whether the heating system uses
          S-Plan or Y-Plan wiring. The junction box wiring, zone valve type, and the number of wires
          at the thermostat position will confirm the system type.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>S-Plan (two zone valves)</strong> — two separate motorised zone valves
                (typically Honeywell V4043 or Drayton MA1 types) control the central heating and hot
                water circuits independently. The programmer sends separate outputs for heating and
                hot water. The room thermostat and cylinder thermostat each call their respective
                zone valve. Both zone valves feed into the same boiler switching circuit via a
                common junction box. S-Plan is standard on new installations and offers the most
                flexible control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Y-Plan (one mid-position valve)</strong> — a single three-port motorised
                valve (typically Honeywell V4073 or Drayton HM2 mid-position type) controls both
                circuits. In mid-position, the valve allows flow to both heating and hot water
                simultaneously. When only hot water is called (cylinder thermostat satisfied, room
                thermostat not calling), the valve moves to the hot water port fully. When only
                heating is called, flow is directed to the heating circuit. Y-Plan uses fewer
                components but the mid-position valve is more complex and the wiring scheme has more
                interactions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The most definitive way to identify the system is to locate the motorised valve(s) on the
          pipework and count them. Two valves = S-Plan. One three-port valve = Y-Plan. Combi boilers
          have no hot water cylinder and no zone valves — the boiler programmer switches the boiler
          directly, and a room thermostat or OpenTherm controller modulates the output.
        </p>
      </>
    ),
  },
  {
    id: 'room-thermostat',
    heading: 'Room Thermostat Wiring',
    content: (
      <>
        <p>
          A room thermostat measures air temperature and switches the heating on or off to maintain
          the set temperature. In S-Plan systems it controls the heating zone valve; in Y-Plan
          systems it provides an input to the mid-position valve's switching logic; for combi
          boilers it switches the boiler directly (or provides an OpenTherm signal).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard room thermostat terminals</strong> — most UK room thermostats
                (Honeywell T6360, Drayton RTS1, Salus RT500) have three terminals: 1 = permanent
                live (COM), 2 = neutral, 3 = switched live (NO — normally open, closes when calling
                for heat). Some thermostats also have a terminal 4 (NC — normally closed) which
                opens when calling for heat and is used in certain wiring schemes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>S-Plan room thermostat wiring</strong> — permanent live from the heating
                programmer output (or junction box) to terminal 1. Neutral to terminal 2. Switched
                live from terminal 3 to the orange/live wire of the heating zone valve motor. When
                the thermostat calls for heat, the zone valve opens, its end switch closes, and the
                boiler fires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Y-Plan room thermostat wiring</strong> — the room thermostat switched live
                feeds terminal 3 (White — call for heat) of the mid-position valve wiring centre or
                junction box. When the stat calls for heat, the valve begins moving toward the
                heating or mid position depending on the hot water demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combi boiler room thermostat</strong> — the switched live from the
                thermostat connects directly to the boiler's heating call terminals (typically
                marked CH or T1/T2 on the wiring diagram inside the boiler casing). No zone valves
                are involved. A permanent live and neutral must also be present to power any
                thermostat that requires mains power for its internal electronics.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cylinder-thermostat',
    heading: 'Cylinder Thermostat Wiring',
    content: (
      <>
        <p>
          The cylinder thermostat monitors water temperature in the hot water cylinder and switches
          the hot water zone valve or mid-position valve when the water temperature falls below the
          set point. It must be strapped to the cylinder at the correct height — typically one third
          of the way up from the bottom, above the immersion heater if fitted.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat setting — minimum 60°C</strong> — the cylinder thermostat must be
                set to a minimum of 60°C to prevent Legionella bacteria growth in stored hot water.
                The HSE recommends 60–65°C for domestic hot water storage. Do not reduce the setting
                below 60°C to save energy — this creates a genuine public health risk. See{' '}
                <SEOInternalLink href="/immersion-heater-installation">
                  immersion heater installation guide
                </SEOInternalLink>{' '}
                for more on Legionella prevention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cylinder thermostat terminals</strong> — standard cylinder thermostats
                (Honeywell L641A, Drayton Thermostat 5) have two or three terminals: COM (permanent
                live), NC (normally closed — connected when water is cold), and NO (normally open —
                connected when satisfied). The NC terminal is the switched live output used to call
                for hot water heating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>S-Plan cylinder thermostat wiring</strong> — permanent live from the hot
                water programmer output to the COM terminal. Switched live from the NC terminal to
                the orange/motor wire of the hot water zone valve. When the cylinder temperature
                falls below set point, the zone valve opens, and once fully open, the boiler fires
                via the end switch circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cylinder positioning</strong> — the thermostat must be in good thermal
                contact with the cylinder. Clean the cylinder surface before strapping, and use the
                insulated strap or clip provided with the thermostat. The sensor must not be
                positioned above the primary coil connection or in an area that receives direct heat
                from the coil rather than the stored water temperature.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'programmer',
    heading: 'Programmer (Timeswitch) Wiring',
    content: (
      <>
        <p>
          The programmer (or timeswitch) controls when the boiler and zone valves are allowed to
          operate. It provides timed live outputs for heating and hot water independently. Replacing
          a programmer requires matching the output terminal configuration to the existing wiring
          scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard programmer terminals</strong> — most UK programmers use numbered
                terminals: N (neutral), L (permanent live), HW ON (hot water timed live output), CH
                ON (central heating timed live output), and sometimes SPARE or a common live
                terminal. The Honeywell ST6400 and Drayton LP241 are widely used examples.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replacing a programmer</strong> — photograph all existing terminal
                connections before disconnecting. Map the wire colours and terminal numbers/labels.
                The replacement programmer must provide the same number of timed outputs (one or
                two, for HW and CH independently). If upgrading from a basic timeswitch to a full
                programmer (with separate HW/CH control), additional wiring to the junction box may
                be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring centre / junction box</strong> — in S-Plan and Y-Plan systems, the
                programmer, thermostats, zone valves, and boiler are typically connected via a
                wiring centre (Honeywell W8735, Drayton Wiring Centre) or a standard junction box.
                The wiring centre provides clearly labelled terminal blocks and significantly
                simplifies fault diagnosis compared to a bare junction box.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smart-thermostat',
    heading: 'Smart Thermostat Installation (Nest, Hive, tado°)',
    content: (
      <>
        <p>
          Smart thermostats replace the conventional room thermostat and often the programmer,
          providing app control, learning algorithms, geo-fencing, and integration with voice
          assistants. The electrical requirements for smart thermostat installation are more
          demanding than for conventional thermostats.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth wire requirement</strong> — Nest (3rd generation and Nest E), Hive,
                and tado° all require an earth connection at the thermostat backplate. Many older UK
                properties run a 2-core cable (live + switched live) to the thermostat position with
                no earth. A new 3-core (or twin and earth) cable must be run to provide the earth
                connection. This is notifiable work if a new circuit is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nest wiring (mains voltage systems)</strong> — Nest connects to: W (switched
                live to heating circuit/zone valve), Rh (permanent live — though Nest can draw this
                from the heating circuit), C (common/neutral, improves operation with smart
                scheduling), and E (earth). The Nest Heat Link (receiver) is wired at the boiler or
                wiring centre, not at the Nest display location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hive Active Heating</strong> — uses a wireless thermostat that communicates
                with a receiver unit wired at the boiler/wiring centre. The wireless design means no
                new cable to the thermostat location is typically needed. The receiver unit requires
                L, N, E, and switched live to the boiler or zone valve. The Hive hub connects to the
                router via Ethernet or Wi-Fi.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compatibility checking</strong> — all major smart thermostat brands provide
                online compatibility checking tools. Before purchasing, input the boiler make/model,
                heating system type (S-Plan, Y-Plan, combi), and existing thermostat details.
                Incompatibilities (particularly with older boilers lacking a common terminal) must
                be resolved before installation.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Important:</strong> Installing a smart thermostat that requires new wiring
              (running a new earth wire or additional circuits) is notifiable work under Building
              Regulations Part P. An Electrical Installation Certificate or Minor Works Certificate
              must be issued on completion.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'heat-pump',
    heading: 'Heat Pump Thermostat Requirements',
    content: (
      <>
        <p>
          Air source and ground source heat pumps require different control strategies to gas
          boilers. A heat pump operates most efficiently at a steady, modulated output with low flow
          temperatures — the opposite of on/off cycling at high temperatures from a conventional
          boiler.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>OpenTherm thermostats</strong> — OpenTherm is a communication protocol that
                allows a thermostat to send modulation requests to the heat pump (or boiler), rather
                than simply switching it on or off. The heat pump can then modulate its compressor
                speed to deliver exactly the heat required. OpenTherm-compatible thermostats
                include: Honeywell Home T6R, Drayton Wiser, and Netatmo. The heat pump must also
                support OpenTherm — check the manufacturer's documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weather compensation</strong> — weather compensation controllers adjust the
                heating circuit flow temperature based on the outdoor air temperature. As outdoor
                temperature falls, flow temperature rises proportionally, maintaining comfort while
                maximising heat pump efficiency (COP). A weather compensation curve (heat curve) is
                typically set during heat pump commissioning. The thermostat provides a room
                temperature correction signal rather than on/off switching.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid simple on/off room thermostats with heat pumps</strong> — a standard
                on/off room thermostat causes the heat pump to cycle on and off frequently, which
                significantly degrades efficiency and increases wear on the compressor. It will
                function but should be avoided where possible. Always follow the heat pump
                manufacturer's thermostat recommendations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'compatibility',
    heading: 'Compatibility Checking',
    content: (
      <>
        <p>
          Before purchasing or installing a thermostat or programmer, verify compatibility with the
          existing boiler, heating system type, and zone valve configuration. Incompatibilities
          cause the most common problems in thermostat installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the boiler manual</strong> — the boiler installation manual (available
                from the manufacturer's website if not on site) contains the wiring diagram and
                lists compatible control configurations. It will specify whether the boiler supports
                OpenTherm, what terminal connections are available, and what the maximum switching
                current is for the thermostat circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Count the wires at the existing thermostat</strong> — 2 wires (live and
                switched live, no neutral, no earth) indicates an older installation that may not be
                compatible with modern smart thermostats without additional wiring. 3 wires (adding
                neutral) is better. 4 wires (live, neutral, switched live, earth) is ideal and
                supports all common smart thermostat types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use the manufacturer's compatibility checker</strong> — Nest, Hive, and
                tado° all provide online compatibility tools. Input the system details before
                purchasing to confirm compatibility and identify any additional wiring requirements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Thermostat & Controls Work',
    content: (
      <>
        <p>
          Thermostat replacement and smart heating control installation is good domestic service
          work — relatively quick, modest parts cost, and high perceived value to clients. Smart
          thermostat installation with new wiring is notifiable and requires certification, making
          it work that requires a registered electrician rather than a DIY job.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to issue a Minor Works Certificate for thermostat replacements involving circuit
                  modifications, or an Electrical Installation Certificate for new control wiring.
                  PDF sent to the client immediately — no paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Typical Costs (2026)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Like-for-like room thermostat replacement (no new wiring): £50–£100 supply and
                  fit. Smart thermostat installation with new earth wire and receiver unit (Nest,
                  Hive, tado°): £150–£300 including parts. Full S-Plan control upgrade (new
                  programmer, new thermostats, new wiring centre): £300–£600. Heat pump thermostat
                  upgrade to OpenTherm: £150–£250.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certify thermostat and heating control installations with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to issue Minor Works Certificates and Electrical Installation Certificates on site. Part P compliant certification with instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ThermostatWiringGuidePage() {
  return (
    <GuideTemplate
      title="Thermostat Wiring Guide UK | Room & Cylinder Thermostat Wiring"
      description="Complete UK thermostat wiring guide. S-Plan and Y-Plan heating systems, room thermostat wiring, cylinder thermostat (60°C minimum for Legionella), programmer wiring, Nest and Hive smart thermostat earth wire requirements, and heat pump OpenTherm compatibility."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Thermostat Wiring Guide UK:{' '}
          <span className="text-yellow-400">Room & Cylinder Thermostat Wiring</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about thermostat wiring in UK heating systems — S-Plan and Y-Plan configurations, room thermostat terminals, cylinder thermostat Legionella settings, programmer wiring, Nest and Hive earth wire requirements, and heat pump thermostat compatibility."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Thermostat Wiring"
      relatedPages={relatedPages}
      ctaHeading="Issue Heating Control Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to issue Minor Works Certificates and Electrical Installation Certificates on site. Instant PDF export, Part P compliant, cancel anytime."
    />
  );
}
