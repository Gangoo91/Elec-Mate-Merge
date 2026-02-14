import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Car,
  Shield,
  Zap,
  Cable,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Home,
  Settings,
  FileCheck2,
  Calculator,
  GraduationCap,
  Activity,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'IET Code of Practice EV Charging', href: '/guides/iet-code-of-practice-ev' },
];

const tocItems = [
  { id: 'what-is-cop', label: 'What Is the IET CoP?' },
  { id: 'load-assessment', label: 'Load Assessment' },
  { id: 'earthing-arrangements', label: 'Earthing: PME, TT and O-PEN' },
  { id: 'cable-sizing-ev', label: 'Cable Sizing for EV Chargers' },
  { id: 'smart-charging', label: 'Smart Charging and OCPP' },
  { id: 'protection-devices', label: 'Protection Devices' },
  { id: 'documentation', label: 'Documentation and Certification' },
  { id: 'elec-mate-ev', label: 'EV Installations with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition, 2023) is the primary technical reference for EV charger installations in the UK, supplementing BS 7671.',
  'PME earthing is not permitted for EV charging where the user is outdoors unless additional protective measures (such as O-PEN detection) are installed to disconnect the supply if the PEN conductor is lost.',
  'Load assessment must consider diversity — not all chargers will operate at full power simultaneously. The CoP provides diversity factors for multiple charger installations.',
  'Smart charging is now mandatory for private EV chargepoints installed from 30 June 2022 under the Electric Vehicles (Smart Charge Points) Regulations 2021.',
  'Elec-Mate generates compliant EV charger certificates, calculates cable sizing with voltage drop verification, and includes the specific EV installation checklist from the IET CoP.',
];

const faqs = [
  {
    question: 'What is the IET Code of Practice for EV Charging?',
    answer:
      'The IET Code of Practice for Electric Vehicle Charging Equipment Installation is a technical guidance document published by the Institution of Engineering and Technology. It supplements BS 7671 (the IET Wiring Regulations) by providing specific guidance on the design, installation, and verification of EV charging equipment. The current edition is the 5th Edition (2023). It covers domestic, commercial, and public EV charging installations and addresses topics not fully covered by BS 7671 alone, including earthing requirements specific to outdoor charging, load management, O-PEN protection, and OCPP communication protocols. While the CoP is not a British Standard and not legally mandatory in itself, it is widely regarded as the industry standard and is referenced by competent person schemes and building control.',
  },
  {
    question: 'Can I use PME earthing for an EV charger?',
    answer:
      'PME (Protective Multiple Earthing) earthing presents a specific risk for EV charging because the user is typically standing outdoors, in contact with the ground, while connecting or disconnecting the charging cable. If the PEN (combined protective earth and neutral) conductor in the DNO supply is lost, the exposed metalwork of the charger and the vehicle could rise to a dangerous potential relative to true earth. The IET CoP states that PME earthing must not be used for EV charging equipment where the user could be outdoors unless additional protective measures are implemented. The primary solution is an O-PEN (Open PEN) detection device, which monitors the PEN conductor and disconnects the supply within milliseconds if continuity is lost. Alternative approaches include installing a TT earthing arrangement (a separate earth electrode) for the EV circuit, or using a charger with double insulation (Class II) throughout the charging path.',
  },
  {
    question: 'What is O-PEN protection and when is it required?',
    answer:
      'O-PEN (Open PEN) protection is a device that detects the loss of the PEN conductor in a PME supply and disconnects the EV charging circuit within a defined time (typically under 5 seconds). It is required whenever an EV charger is installed on a PME earthing system where the user could be outdoors — which covers the vast majority of domestic and workplace installations. The O-PEN device monitors the voltage between the neutral and earth. Under normal conditions, this voltage is close to zero. If the PEN conductor is broken, the voltage rises and the O-PEN device trips, isolating the charger. O-PEN devices are available as standalone units (installed in the consumer unit or distribution board) or integrated into the charger itself. Some charger manufacturers include O-PEN detection as a built-in feature.',
  },
  {
    question: 'What cable size do I need for a 7 kW EV charger?',
    answer:
      'A 7 kW single-phase EV charger draws approximately 32 A at 230 V. The minimum cable size depends on the installation method, cable type, cable run length, and any correction factors (grouping, ambient temperature, thermal insulation). For a typical domestic installation using SWA cable clipped to a surface or buried in the ground, 6 mm² copper is commonly used for runs up to approximately 30 metres. For longer runs, 10 mm² may be required to satisfy the voltage drop limit (5% of 230 V = 11.5 V). Always perform a full cable sizing calculation including current-carrying capacity with all applicable correction factors, voltage drop check, and earth fault loop impedance verification. The IET CoP provides specific guidance on cable sizing for EV installations.',
  },
  {
    question: 'What are the smart charging requirements for EV chargepoints?',
    answer:
      'The Electric Vehicles (Smart Charge Points) Regulations 2021, which came into force on 30 June 2022, require all private EV chargepoints sold or installed in the UK to have smart functionality. Smart chargepoints must: be capable of sending and receiving information (connected to a communication network), respond to signals to increase or decrease the rate of charging, have a default off-peak charging setting (not charging between 08:00 and 11:00 on weekdays), allow the user to override the default schedule, maintain a randomised delay function to prevent simultaneous charging spikes on the grid, and meet cybersecurity requirements. These regulations do not apply to public rapid chargers (above 50 kW) or chargepoints that are not connected to the internet. The OCPP (Open Charge Point Protocol) is the industry-standard communication protocol used by most smart chargers to communicate with back-end management systems.',
  },
  {
    question: 'Do I need a separate circuit for an EV charger?',
    answer:
      'Yes. The IET CoP recommends that each EV charger is supplied by a dedicated circuit from the distribution board. This circuit should not supply any other loads. The circuit must be protected by an appropriate MCB or RCBO and a suitable RCD — the type of RCD depends on the charger. Most EV chargers require at least Type A RCD protection (30 mA) to protect against both AC and pulsating DC fault currents. Some chargers with DC fault detection built in may operate with a standard Type A RCD, while others may require a Type B RCD if the charger does not have integrated DC fault detection. Check the manufacturer installation instructions for the specific RCD requirement.',
  },
  {
    question: 'What certification is needed after installing an EV charger?',
    answer:
      'After installing a domestic EV charger, the electrician must issue an Electrical Installation Certificate (EIC) for the new circuit. This is notifiable work under Part P of the Building Regulations (Approved Document P) because it involves adding a new circuit. If the electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA), they can self-certify the work and notify building control electronically. If not registered, the work must be notified to building control separately and may require inspection. The IET CoP also recommends completing the specific EV installation checklist, which covers items unique to EV charging such as O-PEN protection verification, load management settings, and charger commissioning. Elec-Mate includes a dedicated EV charger certificate template with the IET CoP checklist built in.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ev-charger-certificate',
    title: 'EV Charger Certificate',
    description:
      'Digital EV charger installation certificate with IET CoP checklist, O-PEN verification, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for EV charger circuits with automatic correction factors and voltage drop verification to BS 7671.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Practical step-by-step guide to installing domestic and commercial EV chargers in the UK.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements Guide',
    description:
      'TN-C-S, TN-S, and TT earthing systems explained with diagrams and practical guidance for UK electricians.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/building-regulations-electrical',
    title: 'Building Regulations Electrical',
    description:
      'Approved Document P requirements, notifiable work types, and competent person scheme certification.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with structured training modules covering all aspects of BS 7671.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-cop',
    heading: 'What Is the IET Code of Practice for EV Charging?',
    content: (
      <>
        <p>
          The IET Code of Practice for Electric Vehicle Charging Equipment Installation is a
          technical guidance document that supplements{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          with specific requirements for the design, installation, verification, and maintenance of
          EV charging equipment. The current edition is the 5th Edition, published in 2023.
        </p>
        <p>
          The Code of Practice (CoP) exists because EV charging installations present unique
          technical challenges that are not fully addressed by BS 7671 alone. These include outdoor
          earthing risks on PME supplies, the need for load management on multiple charger
          installations, DC fault current protection, communication protocols, and the interaction
          between the vehicle, charger, and electrical installation.
        </p>
        <p>
          While the CoP is not a British Standard and compliance is not a strict legal requirement,
          it is the accepted industry standard. All major competent person schemes (NICEIC, NAPIT,
          ELECSA) expect EV charger installations to follow the CoP. Building control bodies and
          OZEV (the Office for Zero Emission Vehicles, formerly OLEV) grant funding applications
          reference the CoP as the baseline technical standard. An electrician who installs an EV
          charger without following the CoP is leaving themselves exposed to liability if something
          goes wrong.
        </p>
        <p>
          The CoP covers all types of EV charging: domestic single chargepoints, workplace charging
          with multiple units, public charging infrastructure, fleet depot installations, and rapid
          DC charging. It addresses both Mode 3 (AC charging via a dedicated chargepoint) and Mode 4
          (DC rapid charging) installations.
        </p>
      </>
    ),
  },
  {
    id: 'load-assessment',
    heading: 'Load Assessment for EV Charging Installations',
    content: (
      <>
        <p>
          Before installing any EV charger, a thorough load assessment of the existing electrical
          installation is essential. The purpose is to determine whether the existing supply has
          sufficient capacity to support the additional load of the EV charger without exceeding the
          main fuse or supply capacity.
        </p>
        <p>
          A domestic 7 kW charger draws 32 A — which is a significant addition to a typical domestic
          supply protected by a 60 A or 80 A main fuse. If the existing maximum demand (including
          the cooker, shower, heating, and other large loads) is already close to the main fuse
          rating, adding a 32 A EV charger could cause the main fuse to blow during periods of high
          demand.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Load Assessment Checklist</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the main fuse or service cut-out rating</strong> — typically 60 A, 80
                A, or 100 A for domestic supplies. If the main fuse is 60 A and the existing maximum
                demand is 40 A, there is only 20 A of headroom — not enough for a 32 A charger at
                full power.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calculate existing maximum demand</strong> — use the{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand calculator
                </SEOInternalLink>{' '}
                with diversity applied per BS 7671 Appendix 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider load management</strong> — a dynamic load management system can
                reduce the charger output when other loads are running, preventing the total demand
                from exceeding the supply capacity. Many smart chargers support this via CT clamp
                monitoring on the main incoming supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apply diversity for multiple chargers</strong> — the IET CoP provides
                diversity factors for installations with more than one charger. Not all chargers
                will operate at full power simultaneously. Typical diversity allows 1.0 for the
                first charger, 0.8 for the second, and reducing further for additional units.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the existing supply cannot support the EV charger even with load management, the
          options are: request a supply upgrade from the DNO (which can take weeks and cost
          thousands), install a lower-power charger (for example, 3.6 kW at 16 A instead of 7 kW at
          32 A), or install a dedicated three-phase supply if one is available.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-arrangements',
    heading: 'Earthing Arrangements: PME, TT, and O-PEN Protection',
    content: (
      <>
        <p>
          Earthing is the most technically critical aspect of EV charger installation. The IET CoP
          dedicates significant attention to this topic because of the specific risks associated
          with outdoor charging on PME (TN-C-S) supplies.
        </p>
        <p>
          The fundamental problem: in a PME system, the earth and neutral are combined in the supply
          cable (the PEN conductor). If this PEN conductor breaks between the DNO transformer and
          the property, all metalwork connected to the PME earth could rise to mains potential
          relative to true earth. A person standing outdoors on damp ground while touching the
          vehicle or charger could receive a fatal electric shock.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">PME Earthing and EV Charging</h4>
                <p className="text-white text-sm leading-relaxed">
                  PME earthing must not be used for EV charging where the user is outdoors unless
                  O-PEN protection is installed. This applies to the vast majority of domestic and
                  workplace EV charger installations. The IET CoP is clear on this point.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Option 1: O-PEN Device</h4>
            <p className="text-white text-sm leading-relaxed">
              Install an O-PEN detection device that monitors the PEN conductor and disconnects the
              EV charging circuit if continuity is lost. This allows the PME earth to be used for
              the general installation while protecting the EV circuit specifically. Most commonly
              used solution.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Option 2: TT Earth</h4>
            <p className="text-white text-sm leading-relaxed">
              Install a separate earth electrode (TT earthing) for the EV charging circuit. The EV
              circuit uses its own earth rod rather than the PME earth. Requires an RCD for fault
              protection and the earth electrode resistance must be verified. Independent of the
              supply earth.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Option 3: Class II Charger</h4>
            <p className="text-white text-sm leading-relaxed">
              Use a charger and charging cable that are double insulated (Class II) throughout the
              entire charging path, eliminating the need for a protective earth conductor to the
              charger metalwork. Limited availability — most chargers are Class I.
            </p>
          </div>
        </div>
        <p>
          For TN-S earthing systems (where the earth and neutral are separate throughout), the open
          PEN risk does not exist, and the{' '}
          <SEOInternalLink href="/guides/earthing-arrangements">
            earthing arrangement
          </SEOInternalLink>{' '}
          can be used directly for EV charging without additional measures. However, TN-S supplies
          are less common in the UK — most domestic supplies are TN-C-S (PME).
        </p>
        <SEOAppBridge
          title="EV charger certificates with O-PEN verification"
          description="Elec-Mate's EV charger certificate template includes the O-PEN verification checklist from the IET CoP. Confirm the earthing arrangement, document the O-PEN device details, and generate a compliant certificate in minutes."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'cable-sizing-ev',
    heading: 'Cable Sizing for EV Charger Circuits',
    content: (
      <>
        <p>
          Cable sizing for EV charger circuits follows the standard BS 7671 procedure but with
          particular attention to cable run lengths (which are often longer than typical domestic
          circuits) and the continuous nature of the load (EV charging is a continuous duty, not an
          intermittent load).
        </p>
        <p>
          A 7 kW charger draws 32 A continuously. This means the cable must be rated for at least 32
          A with all applicable correction factors applied — grouping, ambient temperature, thermal
          insulation, and installation method. The most common cable type for domestic EV
          installations is 6 mm² SWA (steel wire armoured), which provides mechanical protection for
          buried or surface-mounted runs and has a current rating of 41 A when clipped to a surface
          (Reference Method C).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Typical Cable Sizes for EV Chargers</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7 kW (32 A) single-phase:</strong> 6 mm² 3-core SWA for runs up to
                approximately 30 m. 10 mm² for longer runs where voltage drop exceeds the limit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22 kW (32 A) three-phase:</strong> 6 mm² 5-core SWA for moderate cable runs.
                10 mm² for longer runs. Check the{' '}
                <SEOInternalLink href="/tools/cable-volt-drop-three-phase">
                  three-phase voltage drop
                </SEOInternalLink>{' '}
                calculator for specific lengths.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3.6 kW (16 A) single-phase:</strong> 2.5 mm² cable may be acceptable for
                short runs if the reduced charging speed is sufficient.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Voltage drop is frequently the limiting factor for EV charger cable sizing because of the
          long cable runs involved — the charger is often mounted on the side of a garage or at the
          end of a driveway, 20 to 40 metres from the consumer unit. Use the{' '}
          <SEOInternalLink href="/tools/voltage-drop-calculator">
            voltage drop calculator
          </SEOInternalLink>{' '}
          to verify compliance with the 5% limit (11.5 V on a 230 V single-phase circuit).
        </p>
      </>
    ),
  },
  {
    id: 'smart-charging',
    heading: 'Smart Charging and OCPP',
    content: (
      <>
        <p>
          The Electric Vehicles (Smart Charge Points) Regulations 2021, which came into force on 30
          June 2022, make smart functionality a legal requirement for all private EV chargepoints
          sold or installed in the UK. The regulations apply to domestic and workplace chargers but
          not to public rapid chargers above 50 kW.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Smart Charging Requirements</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-peak default:</strong> chargers must default to not charging between
                08:00 and 11:00 on weekdays, reducing peak demand on the national grid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>User override:</strong> the owner must be able to override the default
                schedule and charge at any time if needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Randomised delay:</strong> a random delay of up to 10 minutes on scheduled
                charging start times to prevent thousands of chargers starting simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cybersecurity:</strong> chargers must meet cybersecurity standards to
                prevent unauthorised access to the charging network.
              </span>
            </li>
          </ul>
        </div>
        <p>
          OCPP (Open Charge Point Protocol) is the industry-standard communication protocol for EV
          chargers. It allows chargers from different manufacturers to communicate with a central
          management system (CMS) for monitoring, billing, load management, and remote diagnostics.
          OCPP 1.6 is the most widely deployed version; OCPP 2.0.1 is the latest, adding features
          such as device management, improved security, and support for ISO 15118
          (vehicle-to-charger communication for plug-and-charge).
        </p>
        <p>
          For commercial installations with multiple chargers, OCPP connectivity is essential for
          load management, usage tracking, and billing. The IET CoP recommends that electricians
          ensure the charger has network connectivity (Wi-Fi, Ethernet, or 4G) and that the OCPP
          back-end system is configured and tested during commissioning.
        </p>
      </>
    ),
  },
  {
    id: 'protection-devices',
    heading: 'Protection Devices for EV Circuits',
    content: (
      <>
        <p>
          EV charger circuits require specific protection devices that may differ from standard
          domestic circuits. The key considerations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB or RCBO:</strong> typically a 32 A Type B or Type C MCB for a 7 kW
                charger. Type C may be needed if the charger has high inrush current on start-up. An
                RCBO (combined MCB + RCD) can provide both overcurrent and residual current
                protection in a single device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD type:</strong> at minimum, a Type A RCD (30 mA) is required to protect
                against AC and pulsating DC fault currents. If the charger does not have built-in DC
                fault detection (6 mA DC residual current device), a Type B RCD may be needed. Check
                the charger manufacturer instructions — most modern chargers include DC fault
                detection and require only a Type A RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surge protection (SPD):</strong> BS 7671 Amendment 2 requires surge
                protection where the consequence of an overvoltage event could result in serious
                injury or significant financial loss. EV chargers with electronic control circuitry
                are susceptible to surge damage. A Type 2 SPD at the consumer unit provides
                effective protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation switch:</strong> a means of isolation should be provided to allow
                the EV circuit to be safely isolated for maintenance. This can be the MCB/RCBO in
                the consumer unit if it is accessible.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The choice between Type A and Type B RCD is one of the most common questions on EV
          installations. Type B RCDs are significantly more expensive (often over £200 compared to
          £30 for a Type A). Most reputable EV charger manufacturers now include a built-in DC
          residual current monitoring device (RCMU) that detects DC fault currents above 6 mA and
          disconnects the supply. When this is present, the installation manual will specify that
          only a Type A RCD is required upstream.
        </p>
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation and Certification',
    content: (
      <>
        <p>
          Installing an EV charger is notifiable work under Part P of the Building Regulations
          (Approved Document P) because it involves adding a new circuit. The following
          documentation is required:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — issued for the new EV
                charging circuit. Must include full test results: continuity, insulation resistance,
                polarity, earth fault loop impedance, prospective fault current, and RCD operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations notification</strong> — if registered with a competent
                person scheme, the electrician self-certifies and notifies building control
                electronically. If not registered, building control must be notified separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IET CoP installation checklist</strong> — the CoP includes a specific
                checklist for EV installations covering items such as earthing arrangement
                verification, O-PEN protection confirmation, load management settings, and charger
                commissioning checks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV grant documentation</strong> — if the installation is funded (or
                part-funded) through an OZEV grant (such as the Workplace Charging Scheme or EV
                Infrastructure Grant), additional documentation may be required for the grant claim.
              </span>
            </li>
          </ul>
        </div>
        <SEOInternalLink href="/guides/building-regulations-electrical">
          See also: Building Regulations Electrical — Approved Document P
        </SEOInternalLink>
      </>
    ),
  },
  {
    id: 'elec-mate-ev',
    heading: 'EV Charger Installations with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate streamlines the entire EV charger installation workflow — from initial load
          assessment through to certificate delivery and invoicing. Here is how the app supports
          each stage:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing and Voltage Drop</h4>
                <p className="text-white text-sm leading-relaxed">
                  Enter the charger power, cable type, and run length. Elec-Mate calculates the
                  minimum cable size with all correction factors applied and verifies voltage drop
                  compliance. Works for both single-phase (7 kW) and three-phase (22 kW) chargers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EV Charger Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Dedicated EV installation certificate template with the IET CoP checklist built
                  in. Covers earthing verification, O-PEN protection details, load management
                  settings, and full test results. Exports as a professional PDF.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EV charger installations faster"
          description="From cable sizing to certificate delivery, Elec-Mate handles the entire EV installation workflow on your phone. IET CoP checklist, O-PEN verification, load assessment, and instant PDF certificates. 7-day free trial."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function IETCodeOfPracticeEVPage() {
  return (
    <GuideTemplate
      title="IET Code of Practice EV Charging | Complete Guide"
      description="Complete guide to the IET Code of Practice for EV Charging Equipment Installation. Covers load assessment, PME earthing and O-PEN protection, cable sizing, smart charging regulations, OCPP, and certification requirements for UK electricians."
      datePublished="2025-04-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Guide"
      badgeIcon={Car}
      heroTitle={
        <>
          IET Code of Practice for EV Charging:{' '}
          <span className="text-yellow-400">The Complete Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Everything you need to know about the IET Code of Practice for Electric Vehicle Charging Equipment Installation. Load assessment, earthing (PME and TT), O-PEN protection, cable sizing, smart charging regulations, OCPP, and documentation requirements."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the IET EV Code of Practice"
      relatedPages={relatedPages}
      ctaHeading="Install EV Chargers with Confidence"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EV charger installations. Cable sizing, IET CoP checklist, O-PEN verification, and instant certificates. 7-day free trial, cancel anytime."
    />
  );
}
