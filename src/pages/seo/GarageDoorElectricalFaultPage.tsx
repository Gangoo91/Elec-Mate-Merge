import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Wrench,
  PoundSterling,
  ShieldCheck,
  Zap,
  FileCheck2,
  Radio,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Fault Finding Guides', href: '/guides/fault-finding' },
  { label: 'Garage Door Electrical Fault', href: '/garage-door-electrical-fault' },
];

const tocItems = [
  { id: 'how-it-works', label: 'How Electric Garage Doors Work' },
  { id: 'safe-isolation', label: 'Safety First' },
  { id: 'power-supply', label: 'Power Supply Problems' },
  { id: 'motor-control-board', label: 'Motor Control Board Faults' },
  { id: 'limit-switches', label: 'Limit Switch Issues' },
  { id: 'safety-sensors', label: 'Safety Sensor Faults' },
  { id: 'remote-control', label: 'Remote Control & Keypad Faults' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'repair-costs', label: 'Repair Costs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check the power supply and consumer unit first — a tripped MCB or RCD is the most common and simplest cause of a garage door opener not working.',
  'The motor control board (logic board) is the brain of the garage door opener. Control board faults cause erratic behaviour — the door starts then reverses, stops partway, or will not respond to the remote or wall button.',
  'Safety sensors (photoelectric eyes) prevent the door from closing on an obstruction. Misalignment, dirt, or damage to the sensor wiring are the most common causes of a garage door that will not close but opens normally.',
  'Limit switches tell the opener motor when the door has reached the fully open or fully closed position. Faulty limit switches cause the door to travel past its end points, run continuously, or reverse before fully closing.',
  'Any new wiring to a garage door opener — including a new power socket, lighting circuit, or extension to the consumer unit — is notifiable work under Part P Building Regulations in England and Wales.',
];

const faqs = [
  {
    question: 'Why will my garage door not open or close?',
    answer:
      'Start with the simplest checks: (1) Is the opener plugged in and the socket switched on? (2) Has the MCB or RCD in the consumer unit tripped? (3) Is the manual release cord engaged — if someone has pulled the emergency release, the opener is disconnected from the door mechanism and must be re-engaged before the motor can move the door. If all of these are fine, the fault lies in the opener itself — remote control, safety sensors, control board, or motor.',
  },
  {
    question: 'Why does my garage door open but not close?',
    answer:
      'A door that opens normally but will not close almost always has a safety sensor fault. The photoelectric sensors at the bottom of the door frame detect obstructions in the door path. If one sensor is dirty, misaligned, or has a damaged cable, the opener prevents closing as a safety measure. Clean the sensor lenses, check the alignment (most openers have indicator lights that show when sensors are aligned), and inspect the sensor cables for damage.',
  },
  {
    question: 'Why does my garage door reverse before closing?',
    answer:
      'A door that starts to close then immediately reverses is either detecting an obstruction (real or false positive from misaligned sensors), or the close force setting is too low for the door weight. Check the safety sensor alignment and clean the lenses first. If the sensors are fine, the close force may need adjustment — consult the opener manual. A control board fault can also cause this symptom, particularly if the reversal is erratic rather than consistent.',
  },
  {
    question: 'My garage door remote has stopped working — what should I do?',
    answer:
      'First replace the battery in the remote — this is the cause in approximately 50% of remote failures. If a new battery does not resolve it, try the wall button inside the garage (if the wall button works but the remote does not, the remote has failed or lost its pairing). Re-programme the remote according to the opener manual — most openers have a "learn" button that accepts new remote pairings. If neither the remote nor the wall button works, the fault is in the opener itself.',
  },
  {
    question: 'Is garage door electrical work notifiable under Part P?',
    answer:
      'Any new electrical wiring to a garage — including a new socket for the garage door opener, an additional circuit, or modifications to the consumer unit — is notifiable under Part P of the Building Regulations in England and Wales. If you are simply replacing the garage door opener unit itself (plug-in) without modifying any fixed wiring, this is not notifiable. If an electrician installs a new dedicated circuit or socket for the opener, they must issue an Electrical Installation Certificate.',
  },
  {
    question: 'How much does it cost to repair a garage door opener?',
    answer:
      'Repair costs depend on the component that has failed. Remote control replacement costs £20 to £60. A replacement safety sensor pair costs £30 to £80. A replacement control board costs £60 to £200 depending on the brand and model. If the motor has failed, replacing the entire opener unit is usually more cost-effective than repairing the motor — a new residential opener costs £200 to £500 fitted.',
  },
  {
    question: 'Can I install a garage door opener myself?',
    answer:
      'Installing the mechanical parts of a garage door opener (fitting the rail, connecting to the door, adjusting limit switches) is DIY work. However, if a new electrical socket or circuit is required for the opener, this is notifiable under Part P Building Regulations and should be carried out by a registered electrician. Connecting the opener to an existing socket via a standard plug is not notifiable.',
  },
  {
    question: 'What are the safety requirements for garage door openers in the UK?',
    answer:
      'Garage door openers in the UK must comply with the Machinery Directive and carry CE (or UKCA post-Brexit) marking. They must include: automatic reversal on obstruction detection (typically measured at less than 20N force before reversal), photoelectric safety sensors or contact-sensitive edges, manual release mechanism for power failure, and a maximum unattended run time. Commercial garage doors have additional requirements under the Workplace Health Safety and Welfare Regulations 1992.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/outdoor-socket-fault-finding',
    title: 'Outdoor Socket Fault Finding',
    description: 'RCD protection, weatherproof requirements, IP ratings, circuit faults, earth faults.',
    icon: Zap,
    category: 'Fault Finding',
  },
  {
    href: '/garden-lighting-fault-finding',
    title: 'Garden Lighting Fault Finding',
    description: 'RCD protection, IP ratings, cable damage, transformer faults, and repair costs.',
    icon: Settings,
    category: 'Fault Finding',
  },
  {
    href: '/guides/electrical-safety-check',
    title: 'Electrical Safety Check Guide',
    description: 'When to get an electrical installation checked and what is tested.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'how-it-works',
    heading: 'How Electric Garage Door Openers Work',
    content: (
      <>
        <p>
          An electric garage door opener is an electromechanical system that consists of a mains-powered
          motor unit, a drive mechanism (chain, belt, or screw drive), a control board (logic
          board), safety sensors, remote controls, and a wall-mounted button. Understanding how
          these components interact helps to diagnose faults efficiently.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor unit</strong> — an AC or DC motor (modern openers increasingly use
                DC for softer starts and battery backup compatibility) that drives the trolley along
                the overhead rail. The motor connects to the door via a lift arm. Motor failure is
                relatively uncommon — most faults occur in the control electronics rather than the
                motor itself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control board (logic board)</strong> — the PCB that controls all opener
                functions: receiving remote signals, activating the motor, monitoring limit
                switches, monitoring safety sensors, and controlling lights and accessories. The
                control board is the most common source of complex or erratic faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limit switches</strong> — two switches (or magnetic sensors) that detect
                when the door has reached the fully open and fully closed positions, cutting power
                to the motor. Limit switches can be mechanical (push-to-break type on the rail) or
                electronic (hall-effect sensors detecting a magnet on the trolley).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety sensors</strong> — a pair of photoelectric sensors mounted at the
                bottom of the door frame, one transmitter and one receiver, creating an infrared
                beam across the door opening. If the beam is interrupted during closing, the opener
                reverses the door immediately. UK safety regulations require these sensors on all
                residential garage door openers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power supply</strong> — the opener plugs into a standard 13A socket (BS
                1363) in the garage. The socket must be within reach of the opener unit (typically
                within 1.5 metres). For new installations, a dedicated socket or fused spur is
                recommended to avoid overloading an existing socket circuit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'safe-isolation',
    heading: 'Safety Before Working on Any Electrical Component',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div className="space-y-2 text-white">
              <p className="font-bold text-lg">Isolate before accessing the motor unit or control board</p>
              <p>
                The garage door opener operates at 230V mains voltage. Capacitors inside the unit
                can retain charge after unplugging. Unplug the unit from the socket and wait at
                least 60 seconds before opening the motor unit casing. Do not attempt to access
                the control board or internal wiring while the unit is plugged in.
              </p>
            </div>
          </div>
        </div>
        <p>
          Additionally, the mechanical hazard of the door and spring mechanism must be considered.
          Garage door springs store enormous energy — a broken torsion spring can cause serious
          injury. Do not attempt to adjust, remove, or repair garage door springs. This is
          specialist work for a garage door engineer, not an electrician or DIY homeowner.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before any electrical investigation</strong> — unplug the opener from the
                socket. Engage the manual release to disconnect the motor from the door mechanism,
                preventing unexpected door movement. If the door is overhead and not supported by a
                spring (spring broken), do not leave it in the open position unattended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>For fixed wiring (socket, circuit)</strong> — isolate at the consumer
                unit and prove dead with a voltage indicator before working on the socket or any
                fixed wiring in the garage. Standard safe isolation procedure applies.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'power-supply',
    heading: 'Power Supply Problems',
    content: (
      <>
        <p>
          The simplest cause of a garage door opener not working is a power supply fault. Always
          check these before assuming the opener itself has failed:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the consumer unit</strong> — the garage circuit (often a spur from
                the main ring, or a dedicated radial) may have a tripped MCB or RCD. Reset the
                breaker and observe. If it trips again immediately or when the opener is used,
                there is a fault in the circuit or the opener is drawing excessive current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test the socket</strong> — plug a lamp or phone charger into the garage
                socket to confirm the socket is live. If the socket is dead, the fault is in the
                circuit, not the opener. Check the fused connection unit (if the socket is on a
                fused spur) — the fuse cartridge may have blown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the plug fuse</strong> — if the opener uses a standard BS 1363 plug,
                check the fuse in the plug (typically 3A or 5A). Replace with the correct fuse
                rating as specified in the opener manual. Using a 13A fuse in a low-power device
                means the fuse will not blow when it should.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery backup unit</strong> — some modern openers have a battery backup
                that allows operation during a power cut. If the battery is exhausted and the mains
                power has failed, the opener will not operate. Recharge or replace the backup
                battery and restore the mains supply.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'motor-control-board',
    heading: 'Motor Control Board Faults',
    content: (
      <>
        <p>
          The motor control board (logic board) is the most common source of complex or erratic
          garage door opener faults. Control board failure can be caused by power surges, lightning,
          moisture ingress, or simply component failure with age.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Symptoms of control board failure</strong> — the door starts to open or
                close then unexpectedly reverses; the opener responds to neither the remote nor
                the wall button; the opener activates by itself (phantom operation); the indicator
                light on the opener flashes in a specific pattern (consult the manual for fault
                codes); or the opener works intermittently with no obvious pattern.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surge damage</strong> — a power surge (from lightning, a nearby short
                circuit, or switching of large loads) can damage or destroy the control board
                without any visible signs. Surge-damaged boards often fail partially — some
                functions work while others do not. Installing a surge-protected socket or surge
                protection at the consumer unit protects the opener from future damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control board replacement</strong> — replacement boards are available from
                the opener manufacturer or third-party suppliers for most popular brands (Hormann,
                Garador, Cardale, Chamberlain, LiftMaster). The board must be the correct part
                number for the specific opener model. Fitting an incorrect board can damage the
                motor. Board replacement requires unplugging the unit and carefully transferring
                all wiring connections — photograph the existing connections before disconnecting
                anything.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Factory reset</strong> — before replacing the board, perform a factory
                reset as specified in the opener manual. This clears all stored remote codes and
                returns the opener to default settings. After a reset, remotes must be re-paired
                and limit switches may need re-programming. A reset sometimes resolves erratic
                behaviour caused by corrupted memory rather than hardware failure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'limit-switches',
    heading: 'Limit Switch Issues',
    content: (
      <>
        <p>
          Limit switches tell the opener motor when the door has reached the fully open or fully
          closed position. Incorrect limit settings or failed limit switches cause the door to
          behave unexpectedly at the end of its travel.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Door runs past the closed position</strong> — the close limit is set too
                far. The door hits the floor and the motor continues to run, straining the
                mechanism. Adjust the close limit according to the manufacturer's instructions
                (typically via adjustment screws on the motor unit or via a programming sequence
                on electronic systems).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Door reverses before fully closed</strong> — the close limit is set too
                short, or the obstruction detection sensitivity (close force) is triggering before
                the door fully closes. Adjust the close limit first, then the close force if
                required. Over-sensitive close force adjustment causes the door to reverse on
                contact with the floor seal even when there is no obstruction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Door does not fully open</strong> — the open limit is set too short.
                The trolley stops before the door reaches the fully open position, leaving the
                door partially open and creating a risk of it falling. Adjust the open limit to
                ensure the door opens fully and the opener stops cleanly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical limit switch failure</strong> — on older openers with physical
                push-to-break limit switches on the rail, the switch can fail mechanically,
                preventing it from triggering. The switch actuator can also become misaligned.
                Inspect the switch position on the rail and test continuity of the switch with
                a multimeter after unplugging the unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'safety-sensors',
    heading: 'Safety Sensor Faults',
    content: (
      <>
        <p>
          The photoelectric safety sensors at the bottom of the door frame are a mandatory safety
          feature and a frequent source of door-closing problems. The sensors must have an
          unobstructed line of sight and correct alignment to function properly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Indicator lights</strong> — most openers have LED indicator lights on
                each sensor. Typically: transmitter sensor has a steady amber light; receiver
                sensor has a steady green light when correctly aligned. A flashing or off indicator
                light on the receiver sensor means the beam is interrupted or the sensors are
                misaligned. Both indicators should be steady during normal operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cleaning the lenses</strong> — dirty lenses are a common cause of sensor
                faults. Wipe the sensor lenses gently with a dry cloth. Avoid abrasive cleaners
                that could scratch the lens. In dusty garages (near workshop areas), clean the
                sensor lenses monthly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Realigning the sensors</strong> — sensors are mounted on adjustable
                brackets. Loosen the mounting wing nut, physically align the sensor so it
                points directly at its counterpart across the door frame, then retighten. The
                receiver indicator light should switch from flashing to steady green when alignment
                is correct.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sensor wiring damage</strong> — the thin two-core wires running from the
                sensors to the motor unit are vulnerable to damage from doors catching on them,
                objects crushing them, or repeated flexing. A damaged sensor wire breaks the signal
                circuit and the control board defaults to a "beam interrupted" state, preventing
                closing. Inspect the full length of both sensor wires and replace any damaged
                sections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sunlight interference</strong> — direct sunlight can overwhelm the
                sensor receiver, causing the control board to detect a false obstruction. This
                typically occurs at specific times of day when the sun is at a low angle and
                shines directly into the garage. A shade or visor above the receiver sensor
                resolves this without disabling the safety function.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'remote-control',
    heading: 'Remote Control & Keypad Faults',
    content: (
      <>
        <p>
          Remote control and keypad issues are common and are usually resolved without calling
          an electrician or garage door engineer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace the battery first</strong> — a remote that works intermittently
                or has a reduced range almost certainly has a low battery. Replace with a fresh
                battery of the correct specification (typically CR2032, CR2016, or AA/AAA depending
                on the remote model). A fresh battery should restore full range (typically 10 to
                20 metres for residential openers).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Re-programming the remote</strong> — if the remote has lost its pairing
                with the opener (this can happen after a power surge or control board replacement),
                it must be re-programmed. Locate the "learn" button on the motor unit (usually
                requires opening a cover), press and release it (the indicator light will flash),
                then press the button on the remote you wish to programme. The indicator light
                should flash or change to confirm successful pairing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wireless keypad faults</strong> — an external wireless keypad uses the
                same radio frequency and pairing process as a remote. A keypad that stops working
                should have its battery replaced first, then be re-programmed if the new battery
                does not resolve it. Check the keypad enclosure for water ingress — keypads mounted
                outdoors are vulnerable to moisture damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Radio className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Radio interference</strong> — new wireless devices near the garage (Wi-Fi
                extenders, baby monitors, LED lighting with poor EMC suppression) can interfere
                with the opener's 433MHz or 868MHz radio frequency. Try moving potential
                interference sources away from the garage. If the problem is recent and coincides
                with a new device being installed, this is likely the cause.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          Many garage door opener faults can be diagnosed and resolved by the homeowner. However,
          certain faults require a qualified electrician:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tripping MCB or RCD</strong> — repeated tripping indicates an electrical
                fault in the opener, the supply cable, or the socket. Do not continue resetting.
                An electrician will perform insulation resistance testing and current measurement
                to locate the fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell or visible scorching</strong> — switch off the supply
                immediately. Do not use the opener until an electrician has inspected the motor
                unit and the supply wiring. A burning smell indicates a serious electrical fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>New socket or circuit installation</strong> — if the garage does not have
                a suitable socket near the opener, a new socket must be installed by a registered
                electrician. This is notifiable work under Part P and requires an Electrical
                Installation Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garage wiring inspection</strong> — if the garage has old wiring (rubber
                or cloth-insulated cable), this should be inspected by an electrician before
                connecting new loads. Old wiring may be unsafe and require replacement before the
                garage can be safely used.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'repair-costs',
    heading: 'Garage Door Electrical Fault — Repair Costs 2026',
    content: (
      <>
        <p>
          Repair costs for garage door opener electrical faults vary widely depending on the
          component that has failed. Here are typical UK costs for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remote control replacement</strong> — £20 to £60. OEM remotes from the
                manufacturer cost more than aftermarket alternatives, but OEM remotes are more
                reliable. Compatible remotes are available for most popular brands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety sensor replacement (pair)</strong> — £30 to £80 for the sensors,
                plus £40 to £80 labour if fitted by a garage door engineer. Many homeowners can
                fit replacement sensors themselves using the existing wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control board replacement</strong> — £60 to £200 for the board, plus £60
                to £120 labour for a garage door engineer to fit and programme it. Brand-specific
                boards (Hormann, Garador) tend to cost more than generic replacements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full opener replacement</strong> — £200 to £500 for a residential ceiling-
                mounted opener (belt or chain drive), fully installed and commissioned, including
                new remote controls. Heavy-duty or commercial openers cost significantly more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New dedicated socket in garage</strong> — £150 to £350, including cable
                from consumer unit, socket, weatherproof enclosure if needed, and Electrical
                Installation Certificate. Longer cable runs or complex routes through masonry
                increase cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As a general rule: if the opener is over 10 years old and the control board has failed,
          full replacement of the opener is usually better value than repairing the old unit.
          Modern openers offer smartphone connectivity, improved security codes, and battery backup
          that older units lack.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Garage Electrical Work',
    content: (
      <>
        <p>
          Electricians are frequently called to garages for socket installation, circuit upgrades,
          and to investigate tripping breakers caused by garage door openers. Garages are a common
          location for old or sub-standard wiring — inspect the existing installation carefully
          before connecting new loads.
        </p>
        <p>
          New electrical work in a garage (new circuits, new sockets, consumer unit connections) is
          notifiable under Part P Building Regulations in England and Wales. Electricians registered
          with NICEIC, NAPIT, or ELECSA self-certify the work and issue the relevant certificate.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Certificates Before Leaving Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Elec-Mate Minor Works Certificate app
                  </SEOInternalLink>{' '}
                  or the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate app
                  </SEOInternalLink>{' '}
                  to complete the certificate on site, record test results, and send a PDF to the
                  customer before leaving. No evening admin.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Wiring Upgrades On the Spot</h4>
                <p className="text-white text-sm leading-relaxed">
                  Garages frequently have substandard or aged wiring. When you find a fault,
                  use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce a professional quote for any upgrade work on the spot. Customers who
                  receive a quote while you are present approve work at a significantly higher rate.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete garage electrical certificates on your phone"
          description="Join 430+ UK electricians using Elec-Mate for on-site Minor Works certificates, EICs, and instant quoting. No evening paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GarageDoorElectricalFaultPage() {
  return (
    <GuideTemplate
      title="Garage Door Electrical Fault | Wiring & Motor Faults UK"
      description="Garage door electrical fault finding guide for UK homeowners and electricians. Motor control board faults, limit switch issues, safety sensors, power supply problems, remote control faults, and 2026 repair costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Garage Door Electrical Fault:{' '}
          <span className="text-yellow-400">Wiring & Motor Fault Diagnosis</span>
        </>
      }
      heroSubtitle="Complete electrical fault finding guide for garage door openers — motor control board failure, limit switch issues, safety sensor faults, power supply problems, remote control faults, when to call an electrician, and typical repair costs for 2026."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions — Garage Door Electrical Faults"
      relatedPages={relatedPages}
      ctaHeading="Complete Garage Electrical Certificates On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for Minor Works certificates, EICs, and on-site quoting. No evening paperwork. 7-day free trial, cancel anytime."
    />
  );
}
