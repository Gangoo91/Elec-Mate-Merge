import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  Lock,
  Zap,
  PoundSterling,
  AlertTriangle,
  Settings,
  Wifi,
  FileCheck2,
  Building2,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Security Systems', href: '/security-systems' },
  { label: 'Access Control Installation', href: '/access-control-installation' },
];

const tocItems = [
  { id: 'system-types', label: 'Types of Access Control' },
  { id: 'door-hardware', label: 'Door Strikes vs Magnetic Locks' },
  { id: 'fail-safe-secure', label: 'Fail-Safe vs Fail-Secure' },
  { id: 'power-supply', label: 'Power Supply Requirements' },
  { id: 'cable-types', label: 'Cable Types & Installation' },
  { id: 'fire-alarm-integration', label: 'Fire Alarm Integration' },
  { id: 'costs', label: 'Installation Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Access control systems range from basic keypad entry (£500–£800 per door) to biometric and video intercom systems (£1,500–£3,000+ per door). System grade should match the security risk level of the premises.',
  'Fail-safe locks (power off = door unlocks) are required on fire escape routes in buildings under BS 5266 and BS EN 50131 principles — fail-secure locks must never be fitted to escape routes without interlock to the fire alarm.',
  'Power supplies for access control must be dedicated, appropriately rated (typically 12V DC or 24V DC), and include battery backup. Insufficient power causes lock release failures and false unlocks.',
  'Cable selection is critical: use screened 2-core cable for lock power, multi-core data cable for keypad/reader wiring, and CAT6 for IP-based readers. All cables must be mechanically protected in accessible areas.',
  'Integration with the fire alarm system is a mandatory safety requirement — on fire signal, fail-safe locks must release and fail-secure locks on escape routes must be interlocked to release via the fire alarm output.',
];

const faqs = [
  {
    question: 'What types of access control are available for UK commercial premises?',
    answer:
      'The main types are keypad entry (PIN code), proximity fob/card readers, smart card systems, biometric readers (fingerprint or facial recognition), and video intercom systems. Keypad systems suit low-security applications; proximity fob systems are the most common for offices and multi-tenant buildings; biometrics suit high-security areas such as server rooms. Video intercoms are standard for residential blocks and commercial reception points. Most modern systems combine multiple credential types.',
  },
  {
    question: 'What is the difference between fail-safe and fail-secure access control?',
    answer:
      'Fail-safe means the lock releases (door opens) when power is lost. Fail-secure means the lock remains locked when power is lost. Fail-safe is mandatory on all fire escape doors — in the event of a fire or power outage, occupants must be able to exit. Fail-secure is used on doors where security is the priority and the door is not on an escape route, such as server rooms or cash storage areas. Fitting a fail-secure lock on a fire escape route is a serious life-safety violation.',
  },
  {
    question: 'What power supply does an access control system need?',
    answer:
      'Most access control systems run on 12V DC or 24V DC. The power supply unit must be sized to power all locks, readers, and the control panel simultaneously, including allowance for simultaneous lock release on multiple doors. A regulated, filtered PSU with battery backup (typically 12Ah minimum for four hours of standby) is required. The PSU must comply with BS EN 60950 and should be housed in a tamper-evident enclosure. Run a dedicated circuit from the distribution board — never share with general power circuits.',
  },
  {
    question: 'What cable do I use for access control wiring?',
    answer:
      'Lock power cables should be 2-core screened cable, typically 1.0mm² or 1.5mm² depending on cable run length and lock current draw. Reader/keypad wiring uses multi-core data cable (typically 6-core or 8-core screened, 0.5mm²). IP-based readers use CAT6 cable with PoE. All cables in accessible areas must be run in conduit or trunking. Screen the cable at one end only (at the control panel) to avoid earth loops. Label all cables at both ends during installation.',
  },
  {
    question: 'Does access control need to integrate with the fire alarm?',
    answer:
      'Yes, in any building where the fire alarm system is installed. Fail-safe locks on escape routes must receive a release signal from the fire alarm — typically via a volt-free relay output from the fire alarm panel. Fail-secure locks on escape routes require the same interlock. The fire alarm integration must be tested as part of commissioning and documented. The interface must not prevent the fire alarm from operating normally and must be tested during annual fire alarm service.',
  },
  {
    question: 'How much does access control installation cost in the UK?',
    answer:
      'Budget approximately £500–£800 per door for a basic keypad or fob system, £800–£1,500 per door for a networked fob/card reader system with management software, and £1,500–£3,000+ per door for biometric or video intercom systems. Costs rise significantly with complex cable runs, concrete drilling, high-security door hardware, and multi-door controllers. A typical SME office with four controlled doors would budget £3,000–£8,000 all-in for a quality networked system.',
  },
  {
    question: 'Do I need certification to install access control in the UK?',
    answer:
      'There is no mandatory licence for access control installation in the UK, but NSI (National Security Inspectorate) or SSAIB (Security Systems and Alarms Inspection Board) approval is expected for commercial contracts and insurance purposes. For systems integrated with fire alarms, the installer must ensure compliance with BS 5839-1 (fire detection) and relevant access control standards. Electricians carrying out the electrical installation must be suitably qualified under BS 7671.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/intruder-alarm-installation',
    title: 'Intruder Alarm Installation',
    description: 'Graded intruder alarm systems — BS EN 50131, wired vs wireless, NSI certification.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/cctv-installation-electrical',
    title: 'CCTV Installation Electrical Requirements',
    description: 'PoE vs local power, CAT6 vs coax, IP ratings, and power consumption calculations.',
    icon: Wifi,
    category: 'Guide',
  },
  {
    href: '/smart-lighting-control',
    title: 'Smart Lighting Control Systems',
    description: 'DALI, KNX, and Lutron systems — scene setting, occupancy sensors, emergency lighting.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote access control jobs in minutes with the Elec-Mate quoting tool.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'The wiring regulations explained — amendments, key requirements, and compliance.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'system-types',
    heading: 'Types of Access Control System',
    content: (
      <>
        <p>
          Access control systems restrict and monitor entry to buildings, floors, and rooms. The
          appropriate system type depends on the security requirement, number of users, and whether
          the installation is residential, commercial, or industrial.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keypad entry (PIN code)</strong> — the simplest and lowest-cost option.
                Users enter a PIN to release the door lock. No credentials to issue or manage.
                Suitable for low-security internal doors (plant rooms, storage), but PINs are
                easily shared and cannot be individually audited. Budget £500–£800 per door
                installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proximity fob/card readers</strong> — the most common access control
                technology in UK commercial buildings. Uses RFID (Radio Frequency Identification)
                fobs or smart cards. Each user has a unique credential that can be individually
                enrolled, suspended, or deleted via management software. Provides full audit trail
                of who entered and when. Standard technology: MIFARE or HID.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Biometric readers</strong> — fingerprint, facial recognition, or iris
                scanning. No credential to lose or share — the user is the credential. Suitable
                for high-security areas (server rooms, laboratories, cash handling). Higher cost
                and requires enrolment of all users. Consider data protection obligations under
                UK GDPR when processing biometric data — biometrics are special category data.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Video intercom systems</strong> — door entry panels with camera and
                two-way audio, releasing the door remotely via an internal monitor or mobile app.
                Standard for residential apartment blocks, GP surgeries, and commercial reception
                points. IP-based video intercoms integrate with CCTV NVR systems and can provide
                door-open event recordings.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Most commercial installations combine credential types — for example, fob reader at the
          main entrance with keypad backup for management, and biometric reader in the server room.
          Multi-door networked controllers allow all doors to be managed from a single software
          interface.
        </p>
      </>
    ),
  },
  {
    id: 'door-hardware',
    heading: 'Door Strikes vs Magnetic Locks',
    content: (
      <>
        <p>
          The choice of lock hardware depends on the door type, frame construction, security
          requirement, and whether the door is on a fire escape route. The two main types are
          electric strikes and electromagnetic (magnetic) locks.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric door strikes</strong> — replace the strike plate in the door
                frame. When energised (or de-energised in fail-safe mode), the strike releases
                to allow the latch to pass. The door and frame appear normal and the mechanical
                lock remains in place. Suitable for most door types. Lower holding force than
                magnetic locks (typically 500–1,000 kg). Can be fail-safe or fail-secure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electromagnetic (magnetic) locks</strong> — a powerful electromagnet
                mounted on the door frame attracts a steel armature plate on the door. Holding
                forces of 280 kg to 600 kg are standard; heavy-duty versions exceed 1,000 kg.
                Inherently fail-safe (power off = door releases). No moving parts — very reliable.
                Requires a door closer to ensure the door re-latches. Most common on fire escape
                doors and high-traffic controlled doors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric mortice locks</strong> — a motorised or solenoid-operated
                mortice lock. Higher security than strikes or magnetic locks. Fail-secure versions
                common. Used on perimeter security doors, secure room entrances, and high-value
                storage. Requires robust door and frame construction. Current draw is higher —
                factor into PSU sizing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Door closers</strong> — a mechanical door closer is required on any
                controlled door to ensure the door returns to the locked position after entry.
                Fire doors require a fire-rated closer (BS EN 1154). Access-controlled fire doors
                must not be held open by the closer — use only electromagnetic hold-open devices
                that release on fire alarm signal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fail-safe-secure',
    heading: 'Fail-Safe vs Fail-Secure — Life Safety Implications',
    content: (
      <>
        <p>
          The fail state of the lock — what happens when power is lost — is a life-safety decision
          that must be made correctly. Getting it wrong can trap occupants in a fire or leave a
          building insecure during a power outage.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fail-safe on escape routes — mandatory</strong> — any door on a designated
                escape route must fail safe (release on power loss). This includes final exit doors,
                stairwell doors, and corridor doors on escape routes. Electromagnetic locks are
                inherently fail-safe. Fail-secure locks must never be fitted to escape routes
                without a fire alarm interlock that forces release on activation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fail-secure on security doors</strong> — appropriate for doors that are
                not on escape routes, where the security risk of an unsecured door during power
                loss outweighs other concerns. Examples: server room access, cash storage, plant
                rooms with no occupancy. Must have battery backup to maintain security during
                power outages.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency break-glass release</strong> — all access-controlled doors must
                have a means of emergency egress without requiring a credential. For escape routes,
                a green break-glass unit or push-to-exit button with direct lock release wiring
                (not through the access control panel) is required. This ensures exit is always
                possible regardless of system status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery backup requirement</strong> — power supply units must include
                battery backup sufficient for a minimum of four hours' standby (BS EN 50131
                guidance for security-graded systems). This ensures the access control system
                continues to operate during mains power outages.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The building's fire risk assessment and fire strategy document should specify the fail
          state for each controlled door. Consult the building's responsible person or fire
          engineer before specifying hardware on escape routes.
        </p>
      </>
    ),
  },
  {
    id: 'power-supply',
    heading: 'Power Supply Requirements',
    content: (
      <>
        <p>
          Access control power supply design is one of the most commonly underspecified elements
          of an installation. An inadequate power supply causes lock release failures, system
          resets, and false unlocks — all of which undermine security and safety.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculate total current demand</strong> — add the rated current draw of
                all locks (typically 300–600 mA per magnetic lock at 12V DC), all readers (50–
                200 mA each), the control panel, and any auxiliary devices. Add 20 per cent
                headroom. A four-door system with magnetic locks may need 3–4A continuous supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — run a dedicated circuit from the distribution
                board for the access control PSU. Never share with general power or lighting
                circuits. Protect with a suitably rated MCB. Label the circuit clearly at the
                board and at the PSU.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery backup</strong> — use a PSU with integral battery backup or a
                separate battery module. Size the battery to maintain full system operation for
                a minimum of four hours on standby (BS EN 50131 Grade 2 and above). Fit a low
                battery indicator and test the battery backup at commissioning and annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop on cable runs</strong> — calculate voltage drop over the
                lock cable runs. A 12V magnetic lock drawing 500 mA over a 30-metre run on
                1.0mm² cable will see approximately 0.5V drop — within tolerance. Longer runs
                or higher current loads may require 1.5mm² or 2.5mm² cable, or a higher supply
                voltage with a local voltage regulator at the lock.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-types',
    heading: 'Cable Types & Installation',
    content: (
      <>
        <p>
          Cable selection and installation quality determine long-term system reliability. Access
          control wiring runs in areas that are difficult to re-cable — getting it right first
          time matters.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lock power cable</strong> — 2-core screened, 1.0mm² or 1.5mm² depending
                on run length and current draw. Screen connected to earth at the PSU end only.
                Where the cable passes through a door frame (for door-mounted hardware), use a
                flexible section with a door loop/hinge loop to prevent wire fatigue from repeated
                door opening.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reader/keypad data cable</strong> — multi-core screened, typically 6-core
                or 8-core 0.5mm² (for Wiegand or RS-485 reader interfaces). Screen at panel end
                only. Keep data cables away from power cables and fluorescent lighting ballasts
                — 50mm minimum separation, or use screened cable throughout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP reader cable (PoE)</strong> — CAT6 (or CAT6A for runs over 70 metres).
                Power over Ethernet (IEEE 802.3af or 802.3at) delivers both power and data over
                a single cable, eliminating the need for a separate power supply to each reader.
                Use a PoE-capable network switch rated for the number of PoE ports required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection</strong> — all cables in accessible areas (below
                2.1 metres from floor level) must be run in conduit or trunking. Metallic conduit
                provides the best protection and acts as additional screening. In ceiling voids
                and risers, use cable tray or basket tray. Label all cables at both ends and at
                every junction point.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-alarm-integration',
    heading: 'Integration with the Fire Alarm System',
    content: (
      <>
        <p>
          In any building with a fire alarm system, integrating the access control with the fire
          alarm is a mandatory safety requirement. The purpose is to ensure that in the event of
          a fire alarm activation, all escape routes are immediately accessible.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm relay output</strong> — the fire alarm panel provides a
                volt-free relay output that changes state on fire alarm activation. This output
                is wired to the access control panel's fire alarm input (or directly to the lock
                PSU's release input). On activation, all fail-safe locks on escape routes
                immediately release. This wiring must be fire-resistant cable (FP200 or
                equivalent) to maintain integrity during a fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fail-secure locks on escape routes</strong> — if a fail-secure lock must
                be used on an escape route (which should be avoided), it must have a direct
                override wired from the fire alarm relay output. The override must release the
                lock regardless of the access control panel's status. This requires careful
                hardware selection — not all fail-secure locks have a direct release input.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electromagnetic hold-open devices</strong> — where fire doors are
                legitimately held open (for ventilation or traffic management), electromagnetic
                hold-open devices compliant with BS EN 1155 must be used. These release
                automatically on fire alarm activation. Standard door stops, wedges, or mechanical
                hold-open devices are not permitted on fire doors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and documentation</strong> — the fire alarm integration must be
                tested during access control commissioning and documented in the O&amp;M manual.
                The integration must also be tested during annual fire alarm service. Provide
                a cause-and-effect matrix showing which fire alarm zones release which access
                control doors.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Coordinate closely with the fire alarm contractor during commissioning. The fire alarm
          system must not be modified to add the access control interface without updating the
          fire alarm installation record and commissioning documentation.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Access Control Installation Costs (2026)',
    content: (
      <>
        <p>
          Access control costs vary significantly with system complexity, door hardware quality,
          cable run lengths, and management software requirements. The figures below are for
          professionally installed systems in the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic keypad system</strong> — £500–£800 per door, including keypad,
                electric strike or magnetic lock, PSU, and installation. No ongoing software cost.
                Suitable for low-security internal doors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Networked fob/card reader system</strong> — £800–£1,500 per door for a
                quality networked system with proximity readers, door controllers, management
                software, and audit trail. Additional doors on the same network cost less as
                infrastructure is shared.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Biometric system</strong> — £1,200–£2,500 per door for fingerprint readers,
                rising to £2,000–£4,000 for facial recognition. Includes enrolment of all users.
                Cloud-managed biometric systems may carry a per-user per-month subscription.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP video intercom</strong> — £1,500–£3,000 per door entry point for a
                quality IP video intercom with mobile app integration and NVR recording. Includes
                door panel, internal monitor or app licence, electric strike, and installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These costs do not include ongoing software licences, managed service contracts, or
          hardware maintenance agreements. Networked systems with cloud management typically carry
          an annual fee of £100–£500 per site. Maintenance contracts for commercial systems are
          typically 10–15 per cent of installation cost per year.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting and Winning Access Control Work',
    content: (
      <>
        <p>
          Access control installation is a growing market as more UK businesses upgrade legacy
          key-based systems to electronic access. Electricians with data cabling and low-voltage
          system skills are well placed to take on this work alongside their electrical contracting
          business.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Access Control Jobs Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build accurate quotes for access control installations. Include lock hardware,
                  PSU, cable, conduit, control panel, software licences, commissioning, and
                  fire alarm integration — all in one professional PDF quote.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Build Relationships with Security Contractors</h4>
                <p className="text-white text-sm leading-relaxed">
                  Many NSI/SSAIB-approved security contractors subcontract the electrical installation
                  work to NICEIC or NAPIT registered electricians. Position your business as the
                  electrical subcontractor of choice for access control, CCTV, and{' '}
                  <SEOInternalLink href="/intruder-alarm-installation">
                    intruder alarm
                  </SEOInternalLink>{' '}
                  work in your area.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your electrical business more efficiently with Elec-Mate"
          description="Quote, invoice, and manage access control and security system jobs alongside your electrical work. AI-powered job management for UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AccessControlInstallationPage() {
  return (
    <GuideTemplate
      title="Access Control Installation UK | Door Entry & Access Systems"
      description="Complete guide to access control installation in the UK. Keypad, fob, biometric and video intercom systems explained. Fail-safe vs fail-secure, power supply requirements, cable types, fire alarm integration, and costs from £500–£3,000 per door."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Security Systems Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Access Control Installation UK:{' '}
          <span className="text-yellow-400">Door Entry & Access Systems</span>
        </>
      }
      heroSubtitle="Everything UK electricians and building managers need to know about access control installation — system types, door hardware, fail-safe vs fail-secure, power supply design, cable requirements, fire alarm integration, and realistic costs for 2026."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Access Control Installation"
      relatedPages={relatedPages}
      ctaHeading="Quote and Manage Security System Installations with Elec-Mate"
      ctaSubheading="Join UK electricians using Elec-Mate to quote, invoice, and manage access control and security system jobs. Professional PDF quotes in minutes. 7-day free trial."
    />
  );
}
