import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  AlertTriangle,
  Wifi,
  PoundSterling,
  Settings,
  FileCheck2,
  Lock,
  Building2,
  ClipboardCheck,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Security Systems', href: '/security-systems' },
  { label: 'Intruder Alarm Installation', href: '/intruder-alarm-installation' },
];

const tocItems = [
  { id: 'graded-systems', label: 'Graded Systems (BS EN 50131)' },
  { id: 'wired-vs-wireless', label: 'Wired vs Wireless' },
  { id: 'pir-placement', label: 'PIR Placement' },
  { id: 'door-window-contacts', label: 'Door & Window Contacts' },
  { id: 'control-panel', label: 'Control Panel Sizing' },
  { id: 'monitoring', label: 'Monitoring Options (ARC)' },
  { id: 'certification', label: 'NSI & SSAIB Certification' },
  { id: 'professional-vs-diy', label: 'Professional vs DIY' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Intruder alarm systems in the UK are classified into Grades 1–4 under BS EN 50131-1, with Grade 1 for domestic low-risk properties and Grade 4 for high-risk commercial sites. Grade determines detector type, control panel capability, and monitoring requirements.',
  'Wired systems are more reliable, harder to jam, and preferred for commercial installations. Wireless systems are faster to install and suit retrofits where cable runs are impractical, but require battery management and are susceptible to RF interference.',
  'PIR (Passive Infrared) detectors must be sited to avoid false alarms from heat sources, draughts, and direct sunlight, while providing full coverage of the room or zone without masking.',
  'NSI or SSAIB certification is required for systems connected to a Police-Unique Reference Number (URN) for police response, and expected by most commercial insurers for alarm discounts.',
  'An Alarm Receiving Centre (ARC) monitors the system 24/7 and can dispatch keyholders or request a police response. ARC monitoring typically costs £150–£400 per year for a residential or small commercial system.',
];

const faqs = [
  {
    question: 'What does BS EN 50131 Grade mean for an intruder alarm?',
    answer:
      'BS EN 50131 is the European standard for intruder and hold-up alarm systems. It defines four security grades based on the expected risk level. Grade 1 is for low-risk domestic properties where an intruder would have limited knowledge of alarm systems. Grade 2 is for domestic and light commercial properties with a moderate risk of attack from someone with general knowledge of alarm systems. Grade 3 is for commercial sites at high risk, where the intruder is expected to have a comprehensive knowledge of alarm systems. Grade 4 is for the highest-risk sites such as banks, jewellers, and critical national infrastructure. The grade determines the detector sensitivity, anti-tamper requirements, power supply specification, and monitoring requirements.',
  },
  {
    question: 'Do I need an NSI or SSAIB-approved installer for my alarm?',
    answer:
      'NSI (National Security Inspectorate) or SSAIB (Security Systems and Alarms Inspection Board) approval is required if you want a Police Unique Reference Number (URN) for police response — police services in the UK will only respond to alarms from systems installed by approved companies. Commercial insurers typically require NSI or SSAIB-approved installation to qualify for alarm-related premium discounts. For a basic domestic system with no police response or insurance requirement, an NSI/SSAIB installer is not mandatory, but is still strongly recommended for quality assurance.',
  },
  {
    question: 'What is the difference between a monitored and unmonitored alarm?',
    answer:
      'An unmonitored (bells-only) alarm sounds a local siren when triggered but does not communicate with any central monitoring station. It relies on neighbours or passers-by to take action. A monitored alarm is connected via telephone line, broadband, or GSM/4G to an Alarm Receiving Centre (ARC) that monitors the system 24/7. When an alarm is triggered, the ARC calls the keyholder list and can request a police response if a URN is held. Monitored systems are required for Grade 2 and above under BS EN 50131 for commercial applications.',
  },
  {
    question: 'Where should PIR detectors be positioned?',
    answer:
      'PIR detectors should be positioned in corners at a height of 2.0–2.4 metres, angled to cover the most likely intruder paths through the room. Avoid positioning PIRs facing windows where direct sunlight can cause false alarms, near air vents or radiators where temperature changes can trigger false activations, or where small pets can enter the detection zone (unless pet-immune detectors are specified). Each PIR should cover the whole of its assigned zone without gaps. Walk-test all detectors after installation to verify coverage.',
  },
  {
    question: 'How large a control panel do I need?',
    answer:
      'Control panel capacity is measured in zones (inputs) and outputs. As a rule of thumb, specify at least 25 per cent more zones than required at installation to allow for future expansion. A typical domestic system with eight detector zones plus tamper monitoring needs a panel with at least 12 zones. Commercial systems should use expandable panels with zone expander modules. Ensure the panel is rated for the BS EN 50131 grade required, as not all panels meet Grade 2 or Grade 3 requirements.',
  },
  {
    question: 'How much does a professionally installed intruder alarm cost in the UK?',
    answer:
      'A domestic bells-only system (6–8 zones, single keypad, external siren) costs approximately £800–£1,500 installed. A Grade 2 system with ARC monitoring connection and GSM communicator costs £1,200–£2,500 for a typical three-bedroom house. Commercial systems are sized per zone — budget £100–£200 per additional zone above the base system. Grade 3 commercial systems with dual-path monitoring, anti-masking detectors, and hold-up buttons cost £3,000–£15,000+ depending on site size.',
  },
  {
    question: 'Can I install my own intruder alarm legally in the UK?',
    answer:
      'Yes — there is no legal requirement to use a professional installer for a domestic intruder alarm in the UK. However, a DIY-installed system cannot obtain a Police URN, and most home insurers will not offer alarm discounts for self-installed systems. For commercial premises, professional installation by an NSI or SSAIB-approved company is expected by insurers and required for police response. If the system is wired by an electrician, the electrical installation must comply with BS 7671.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/access-control-installation',
    title: 'Access Control Installation',
    description: 'Keypad, fob, biometric, and video intercom systems — installation guide.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/cctv-installation-electrical',
    title: 'CCTV Installation Electrical Requirements',
    description: 'PoE vs local power, cable types, IP ratings, and NVR/DVR power requirements.',
    icon: Wifi,
    category: 'Guide',
  },
  {
    href: '/building-management-system',
    title: 'Building Management Systems',
    description: 'BMS integration with security, metering, HVAC, and access control.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote security system jobs accurately with the Elec-Mate quoting tool.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'The wiring regulations — amendments, key requirements, and compliance.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'graded-systems',
    heading: 'Graded Systems Under BS EN 50131',
    content: (
      <>
        <p>
          BS EN 50131 is the UK and European standard for intruder and hold-up alarm systems. It
          replaces the older BS 4737 and defines four security grades based on the anticipated
          risk level and the expected intruder profile. Specifying the correct grade at the design
          stage determines every subsequent component choice.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade 1 — low risk</strong> — domestic properties at low risk of
                burglary. The intruder is assumed to have limited knowledge of alarm systems.
                Basic detectors (single-technology PIR), battery-operated keypads, and local
                siren only. Suitable for holiday homes or outbuildings. No ARC monitoring
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade 2 — low to medium risk</strong> — domestic and light commercial
                properties. The intruder may have general knowledge of alarm systems. Requires
                dual-technology detectors (PIR + microwave or PIR + ultrasonic), anti-tamper
                on all devices, and ARC monitoring (or police response) for full Grade 2
                compliance. The most common grade for UK domestic and SME commercial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade 3 — medium to high risk</strong> — commercial sites at elevated
                risk. The intruder is expected to have comprehensive knowledge of alarm systems,
                including potential use of jamming equipment. Requires anti-masking detectors,
                dual-path communications (e.g., broadband + GSM), faster response times, and
                ARC monitoring. Required by many commercial insurers for high-value premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade 4 — high risk</strong> — banks, jewellers, cash-in-transit depots,
                and critical infrastructure. The intruder is expected to be a specialist using
                advanced attack methods. Requires the highest level of detector performance,
                anti-masking, multi-path encrypted communications, and continuous ARC monitoring
                with rapid response. Specialist design and NSI Gold installation required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The grade should be determined by a formal risk assessment. Most commercial insurers
          specify the minimum grade as a policy condition. For police response, the system must
          meet the requirements of the Police Unique Reference Number (URN) scheme, which
          typically requires Grade 2 minimum with ARC monitoring.
        </p>
      </>
    ),
  },
  {
    id: 'wired-vs-wireless',
    heading: 'Wired vs Wireless Intruder Alarm Systems',
    content: (
      <>
        <p>
          Both wired and wireless systems can achieve BS EN 50131 compliance, but each has
          distinct advantages depending on the installation environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wired systems — preferred for commercial</strong> — all detectors, keypads,
                and sirens are connected to the control panel by dedicated cable. No battery
                management, no RF interference risk, and lower ongoing maintenance cost. Tamper
                detection on cables is straightforward. Preferred for new builds, large commercial
                sites, and any installation where cable runs can be hidden. Install time is
                longer due to cabling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wireless systems — suited to retrofits</strong> — detectors communicate
                with the panel via encrypted radio frequency (RF). No cable runs required, making
                installation in occupied buildings much faster and less disruptive. Requires
                battery management (typically 2–5 year battery life per device). Grade 2 wireless
                systems use frequency-hopping or encrypted protocols to resist jamming. Confirm
                RF signal strength at every device location before commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hybrid systems</strong> — combine wired zones on the main panel with
                wireless expansion zones for areas where cabling is impractical. Common on larger
                commercial sites or where phased installation is planned. The wired zones typically
                cover the most critical areas (perimeter, server rooms) and wireless covers
                secondary zones.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pir-placement',
    heading: 'PIR Detector Placement',
    content: (
      <>
        <p>
          Passive Infrared (PIR) detectors are the most common intruder detection technology in
          UK installations. Correct placement is critical to achieve reliable detection while
          minimising false alarms — the most common cause of alarm fatigue and police URN
          withdrawal.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mounting height</strong> — standard PIRs should be mounted at 2.0–2.4
                metres above floor level in corners, angled to provide coverage across the room.
                Too low and the detector may be defeated by crawling; too high and sensitivity
                decreases. Wide-angle PIRs (360°) can be ceiling-mounted — follow manufacturer
                guidance for optimum height.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid heat sources and draughts</strong> — do not mount PIRs where they
                face south-facing windows (direct sunlight), above radiators or fan heaters, near
                air conditioning vents, or adjacent to boilers. Temperature changes in the PIR's
                field of view trigger false alarms. A 50mm thermal buffer between the detector
                and any heat source is good practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pet-immune detectors</strong> — where pets are present, use pet-immune
                PIRs (also called pet-tolerant). These use a downward-looking lens pattern or
                dual-zone detection logic to ignore animals below a threshold weight (typically
                15–25 kg). Confirm the pet's weight against the detector specification and test
                with the pet present.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Walk-test every detector</strong> — after installation, walk-test every
                PIR to confirm coverage. Enter the detection zone from each direction the manufacturer
                specifies. Use the detector's walk-test LED to confirm activation. Document the
                walk-test results in the commissioning record.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'door-window-contacts',
    heading: 'Door and Window Contacts',
    content: (
      <>
        <p>
          Magnetic door and window contacts are the most reliable form of perimeter detection.
          They trigger immediately when a protected door or window is opened, before any intruder
          enters the detection zone of a PIR — providing earlier warning than volume detectors alone.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted vs flush-mounted</strong> — surface-mounted contacts are
                faster to install and visible (deterrent value). Flush-mounted contacts are hidden
                within the door frame and harder to defeat. High-security applications should
                use flush-mounted contacts with a guard magnet (anti-tamper magnet) to prevent
                defeat by an external magnet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring convention</strong> — contacts are wired in a normally-closed
                (NC) loop. An open circuit (contact separated) triggers the alarm. This convention
                means a cut cable also triggers the alarm — an important anti-defeat measure.
                Each external door and accessible window should have its own dedicated zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Double-pole contacts for metal frames</strong> — on metal door or window
                frames, use non-magnetic contact sets designed for metallic frames. Standard
                magnetic contacts do not work reliably on steel frames due to the magnetic
                shielding effect of the frame material.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shutter contacts and roller shutter detectors</strong> — for commercial
                premises with roller shutters, use dedicated shutter contacts or vibration
                detectors. Shutter contacts sense the position of the shutter; vibration detectors
                sense forced attack on a closed shutter. Dual-technology (contact + vibration)
                gives the most reliable coverage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'control-panel',
    heading: 'Control Panel Sizing',
    content: (
      <>
        <p>
          The control panel is the heart of the intruder alarm system. Sizing it correctly at
          installation avoids expensive upgrades when the site expands or detection requirements
          change.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone capacity</strong> — each detector or contact uses one zone (input).
                Count the total number of detectors, contacts, panic buttons, and auxiliary inputs
                required, then add 25 per cent headroom. A typical office with 20 detectors and
                12 door contacts (32 zones) should be fitted with a 40-zone or greater panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>User codes and access levels</strong> — panels should support multiple
                user codes at different access levels: engineer code (full access), manager code
                (set/unset, zone bypass), user codes (set/unset only). Commercial sites need
                panels supporting 50+ user codes with individual audit trails.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Partitioning</strong> — for multi-tenant or multi-use buildings, choose
                a panel that supports partitioned zones (areas). Each partition can be armed and
                disarmed independently. Essential for offices where different areas have different
                access times — for example, a warehouse that is locked at 6pm while the office
                remains occupied until 9pm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communications module</strong> — for ARC monitoring, the panel requires
                a communicator: IP (broadband), GSM/4G, or dual-path (both). Grade 3 systems
                require dual-path communication. Ensure the selected communicator is compatible
                with your ARC's receiving equipment and protocols (SIA DC-09, Contact ID).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'monitoring',
    heading: 'Monitoring Options — Alarm Receiving Centres (ARC)',
    content: (
      <>
        <p>
          An Alarm Receiving Centre (ARC) is a staffed facility that monitors alarm signals 24/7
          and responds according to a predefined action plan. ARC monitoring transforms a
          bells-only alarm into a system that can summon a response even when the keyholder is
          unavailable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keyholder response</strong> — when an alarm is triggered, the ARC calls
                the keyholder list in sequence until someone confirms they are responding or
                requests a police response. This is the most common monitoring arrangement for
                domestic and small commercial systems. Annual monitoring cost: £150–£400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Police Unique Reference Number (URN)</strong> — for police response,
                the system must hold a URN issued by the local police service. URN conditions
                include NSI or SSAIB-approved installation, Grade 2 minimum, and a limit on
                false alarm activations per year (typically three false alarms result in URN
                withdrawal). Police response is not guaranteed and is subject to availability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keyholding and mobile response</strong> — some ARCs offer a keyholding
                service where the ARC holds a set of keys and can dispatch a mobile security
                officer to attend the premises. Useful for sites where keyholders are not local
                or are frequently unavailable. Additional annual cost: £300–£800.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Video-verified alarms</strong> — higher-tier ARCs offer video verification,
                where the ARC operator reviews CCTV footage when an alarm is triggered to confirm
                whether an intrusion is in progress before requesting police response. Significantly
                reduces false alarm calls and improves police response priority.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'NSI and SSAIB Certification',
    content: (
      <>
        <p>
          NSI (National Security Inspectorate) and SSAIB (Security Systems and Alarms Inspection
          Board) are the two principal third-party certification bodies for the UK security
          industry. Approval by either body signals that the company has been assessed against
          industry standards and is subject to ongoing auditing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NSI Gold</strong> — the highest level of NSI certification, required
                for Grade 3 and Grade 4 installations, for police-URN-eligible systems, and
                for most large commercial contracts. NSI Gold companies are assessed against
                PD 6662 (UK national guide to BS EN 50131) and are subject to unannounced
                audits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NSI Silver / SSAIB-approved</strong> — suitable for Grade 1 and Grade 2
                domestic and light commercial systems. Still requires compliance with BS EN 50131
                and ongoing auditing. Recognised by police services for URN issuance at domestic
                level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance implications</strong> — most commercial insurers require NSI
                or SSAIB-approved installation to apply alarm-related premium discounts. Without
                approved installation, the insurer may refuse claims where an alarm was fitted
                but not to the required standard. Always check the insurer's specific requirements
                before specifying the system.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'professional-vs-diy',
    heading: 'Professional Installation vs DIY',
    content: (
      <>
        <p>
          The UK does not legally require professional installation of a domestic intruder alarm,
          but there are significant practical reasons to use a certified installer for anything
          beyond a basic home system.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Police URN — professional only</strong> — a Police URN for police
                response can only be issued for systems installed by NSI or SSAIB-approved
                companies. A self-installed system, however well-designed, cannot obtain a URN.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance requirements</strong> — domestic insurers vary. Some accept
                self-installed systems for modest premium discounts; most commercial insurers
                require professional installation. Read the policy wording carefully.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIY limitations</strong> — consumer-grade wireless systems (Ring, Ajax,
                DSC) are suitable for basic domestic applications and offer reasonable Grade 1
                equivalent performance. They do not meet Grade 2 or Grade 3 requirements. False
                alarm rates on self-installed systems tend to be higher due to suboptimal detector
                placement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Intruder Alarm Work',
    content: (
      <>
        <p>
          Electricians are well placed to provide the cabling and electrical installation elements
          of intruder alarm systems, particularly for wired Grade 1 and Grade 2 systems.
          Subcontracting relationships with NSI/SSAIB-approved security companies are a common
          and profitable arrangement.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Security System Jobs Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to generate accurate quotes for intruder alarm cabling, conduit installation,
                  PSU wiring, and access control integration. Include materials and labour in
                  a professional PDF quote sent directly from your phone.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Bundle with CCTV and Access Control</h4>
                <p className="text-white text-sm leading-relaxed">
                  Security system projects often involve intruder alarm cabling,{' '}
                  <SEOInternalLink href="/cctv-installation-electrical">
                    CCTV installation
                  </SEOInternalLink>
                  , and{' '}
                  <SEOInternalLink href="/access-control-installation">
                    access control wiring
                  </SEOInternalLink>{' '}
                  on the same site. Offer a bundled electrical installation package to win more
                  of the project value.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage security system jobs with Elec-Mate"
          description="Quote, invoice, and track intruder alarm and security system installations alongside your electrical work. Join UK electricians running their businesses with Elec-Mate. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function IntruderAlarmInstallationPage() {
  return (
    <GuideTemplate
      title="Intruder Alarm Installation UK | Burglar Alarm Wiring Guide"
      description="Intruder alarm installation guide for the UK. BS EN 50131 grades 1–4 explained, wired vs wireless systems, PIR placement, door contacts, control panel sizing, ARC monitoring, NSI/SSAIB certification, and professional vs DIY."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Security Systems Guide"
      badgeIcon={Shield}
      heroTitle={
        <>
          Intruder Alarm Installation UK:{' '}
          <span className="text-yellow-400">Burglar Alarm Wiring Guide</span>
        </>
      }
      heroSubtitle="The complete UK guide to intruder alarm installation — BS EN 50131 grades, wired vs wireless systems, PIR placement, door and window contacts, control panel sizing, ARC monitoring options, and NSI/SSAIB certification requirements."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Intruder Alarm Installation"
      relatedPages={relatedPages}
      ctaHeading="Quote Security System Installations with Elec-Mate"
      ctaSubheading="Join UK electricians using Elec-Mate to quote and manage intruder alarm and security system jobs. Professional PDF quotes in minutes. 7-day free trial."
    />
  );
}
