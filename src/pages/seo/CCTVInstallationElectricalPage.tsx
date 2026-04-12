import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Shield,
  Wifi,
  Zap,
  PoundSterling,
  AlertTriangle,
  Settings,
  Lock,
  FileCheck2,
  Building2,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Security Systems', href: '/security-systems' },
  { label: 'CCTV Installation Electrical Requirements', href: '/cctv-installation-electrical' },
];

const tocItems = [
  { id: 'power-supply-options', label: 'Power Supply Options (PoE vs Local)' },
  { id: 'cable-types', label: 'Cable Types (CAT6 vs Coax)' },
  { id: 'power-consumption', label: 'Power Consumption Calculations' },
  { id: 'ip-ratings', label: 'IP Ratings for External Cameras' },
  { id: 'gdpr', label: 'GDPR for Commercial CCTV' },
  { id: 'nvr-dvr-power', label: 'NVR/DVR Power Requirements' },
  { id: 'costs', label: 'Installation Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Power over Ethernet (PoE) is the dominant power method for IP CCTV cameras — a single CAT6 cable carries both data and up to 30W of power (IEEE 802.3at). Local power via a transformer is still used for analogue cameras and for locations where CAT6 cable runs exceed 90 metres.',
  'CAT6 cable is the standard for IP CCTV, supporting both PoE power and 1Gbps data to 100 metres. CAT6A is preferred for runs over 70 metres where headroom matters. Coaxial cable (RG59 or RG6) is used for analogue CCTV and HD-TVI/HD-CVI systems.',
  'Always calculate total power consumption before specifying a PoE switch — a 16-camera system with 25W cameras requires a PoE switch with at least 400W PoE budget, not just 16 PoE ports.',
  'External cameras must carry a minimum IP66 rating for the UK climate. Cameras in exposed coastal or industrial environments should be IP67 or IP68. IP rating alone does not account for vandalism — use IK10-rated housings in public areas.',
  'Commercial CCTV systems processing images of identifiable individuals are subject to UK GDPR. Operators must register with the ICO (unless exempt), display CCTV warning signage, and have a Data Protection Impact Assessment (DPIA) for high-risk deployments.',
];

const faqs = [
  {
    question: 'What is the difference between PoE and local power for CCTV cameras?',
    answer:
      'Power over Ethernet (PoE) delivers electrical power to an IP camera over the same CAT6 cable that carries the video data, using the IEEE 802.3af (15.4W) or IEEE 802.3at (30W) standard. A PoE switch or PoE injector at the NVR end supplies the power. No local power outlet is needed at the camera. Local power means running a separate mains supply to a local power supply unit (PSU) near the camera, which then provides low-voltage DC (typically 12V DC) to the camera. Local power is used for analogue cameras, for locations where cable runs exceed 90 metres (beyond PoE range), or for cameras requiring more than 30W.',
  },
  {
    question: 'How far can CAT6 cable run for a CCTV installation?',
    answer:
      'The IEEE 802.3 standard limits Ethernet (and PoE) to 100 metres of horizontal cable. In practice, for CCTV installations, keep runs to 90 metres maximum to allow for patch cable allowances. For runs between 90 and 150 metres, use a PoE extender or mid-span injector. For runs beyond 150 metres, use fibre optic cable with a media converter at each end, or use analogue technology with coaxial cable (RG6 can carry HDCVI or HDTVI video over 300–500 metres). Always test cable with a cable certifier before signing off.',
  },
  {
    question: 'What IP rating does an outdoor CCTV camera need in the UK?',
    answer:
      'The minimum IP rating for outdoor cameras in the UK is IP66, which provides protection against powerful water jets from any direction. IP67 adds protection against temporary immersion to 1 metre — suitable for cameras in exposed positions where water pooling is possible. IP68 is for continuous immersion and is rarely needed for standard CCTV. For cameras in car parks, high streets, or industrial yards, specify IK10 impact resistance (rated for 20J impact) in addition to IP66 or IP67, to resist vandalism and accidental damage.',
  },
  {
    question: 'Do I need to register with the ICO for commercial CCTV?',
    answer:
      'Under UK GDPR and the Data Protection Act 2018, organisations using CCTV to process personal data (images of identifiable individuals) are data controllers and must comply with data protection law. Most businesses using CCTV must register with the Information Commissioner\'s Office (ICO) as a data controller, unless they qualify for an exemption (e.g., purely domestic use). They must also display clear CCTV warning signs, have a written CCTV policy, restrict access to footage, and retain recordings only as long as necessary (typically 28–31 days for most premises). High-risk uses require a Data Protection Impact Assessment (DPIA).',
  },
  {
    question: 'What power supply does an NVR or DVR need?',
    answer:
      'A Network Video Recorder (NVR) typically consumes 15–60W for the recorder unit itself, plus power for any installed hard drives (5–10W per HDD). A 16-channel NVR with four hard drives may consume 50–80W continuous. DVRs are similar. Power the recorder from a dedicated UPS (Uninterruptible Power Supply) to maintain recording during mains power interruptions — a minimum 30-minute runtime UPS is standard for commercial systems. For a PoE NVR with built-in PoE switch, total consumption including camera power can reach 200–500W — ensure the dedicated circuit is rated accordingly.',
  },
  {
    question: 'How much does CCTV installation cost in the UK?',
    answer:
      'A four-camera domestic IP CCTV system with NVR costs approximately £600–£1,200 installed. An eight-camera commercial system with quality cameras and managed switches costs £1,500–£3,000 installed. Larger commercial systems (16–32 cameras) cost £3,000–£8,000+. Cost drivers include cable run lengths (longer runs require more conduit, trunking, and cable), IP camera resolution and features (4K cameras cost more than 2MP), NVR storage capacity, and external works such as installing cameras on high facades or external poles.',
  },
  {
    question: 'What cable is used for analogue CCTV?',
    answer:
      'Traditional analogue CCTV uses RG59 coaxial cable for standard definition video (up to about 200 metres) and RG6 coaxial for longer runs or HD analogue (HDTVI, HDCVI, AHD) at resolutions up to 4K. Coaxial cable for CCTV is typically supplied as a combined video and power (Siamese) cable with two 18AWG power cores alongside the coax, simplifying installation by running a single cable from PSU to camera. For new installations, IP/PoE systems are generally preferred over analogue due to superior image quality and system flexibility.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/intruder-alarm-installation',
    title: 'Intruder Alarm Installation',
    description: 'BS EN 50131 graded systems, wired vs wireless, PIR placement, ARC monitoring.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/access-control-installation',
    title: 'Access Control Installation',
    description: 'Keypad, fob, biometric, and video intercom systems — installation guide.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/building-management-system',
    title: 'Building Management Systems',
    description: 'BMS integration with security, CCTV, metering, and HVAC.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/data-cabling-installation',
    title: 'Data Cabling Installation',
    description: 'CAT5e, CAT6, CAT6A — testing, patch panels, and structured cabling standards.',
    icon: Wifi,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote CCTV and security system jobs with the Elec-Mate quoting tool.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'power-supply-options',
    heading: 'Power Supply Options: PoE vs Local Power',
    content: (
      <>
        <p>
          The choice of power supply method for CCTV cameras is one of the first design decisions
          in any installation. The right choice depends on camera technology, cable run length,
          and the number of cameras being powered.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power over Ethernet (PoE) — standard for IP cameras</strong> — a single
                CAT6 cable carries both 1Gbps data and up to 30W of power (IEEE 802.3at, also
                called PoE+). A PoE switch or PoE NVR at the recording end supplies the power.
                No power outlet is needed at the camera location. This simplifies installation
                dramatically — one cable, one route, one termination point. PoE budget (total
                watts available across all ports) must be calculated for every PoE switch
                specified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEEE 802.3bt (PoE++) — for high-power cameras</strong> — delivers up to
                90W per port. Required for PTZ cameras with heaters, high-resolution multi-sensor
                cameras, and cameras with integrated IR illuminators drawing more than 30W.
                Requires both the switch and the camera to support 802.3bt — standard 802.3at
                switches cannot supply 802.3bt power even if the port is physically compatible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local power via PSU — for analogue and long runs</strong> — a local mains
                supply feeds a regulated DC PSU (typically 12V DC or 24V AC) near the camera.
                Required for analogue cameras (which have no Ethernet connection), for IP cameras
                beyond the 90-metre PoE range, and for locations where it is more practical to
                provide a local power outlet than to route a long cable back to the NVR. The
                mains socket or fused spur must be installed by a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS for all recording equipment</strong> — the NVR, DVR, and network
                switches must be connected to a UPS. A power interruption without UPS protection
                causes recording gaps and potential HDD corruption. Specify a minimum 30-minute
                runtime UPS for small systems and one hour or more for critical commercial
                applications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-types',
    heading: 'Cable Types: CAT6 vs Coaxial',
    content: (
      <>
        <p>
          Cable selection determines system performance, longevity, and future upgradeability.
          The right cable choice depends on the camera technology and the distance of the run.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT6 — standard for IP CCTV</strong> — supports 1Gbps data and PoE/PoE+
                to 100 metres. Use solid-conductor CAT6 (not stranded) for fixed installations.
                Run in conduit or trunking throughout. External runs must use external-grade
                (UV-stable, gel-filled or double-sheathed) CAT6. Terminate at a patch panel in
                the comms cabinet; avoid direct connections to the NVR wherever possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT6A — for runs over 70 metres</strong> — CAT6A (Augmented Category 6)
                has better noise immunity and is preferred for runs approaching the 90-metre
                practical limit. Also supports 10Gbps, which future-proofs the infrastructure
                for 4K and multi-sensor cameras. CAT6A cable is thicker (7–8mm OD vs 6mm for
                CAT6) — allow for this in conduit sizing (conduit fill must not exceed 40 per
                cent of cross-sectional area).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RG59 coaxial — standard definition analogue</strong> — 75-ohm coaxial
                cable for CVBS analogue CCTV. Maximum effective range approximately 200 metres
                for standard definition video. Typically supplied as Siamese cable with two
                18AWG power cores. Still found in legacy systems but not recommended for new
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RG6 coaxial — HD analogue (HDTVI/HDCVI/AHD)</strong> — supports HD
                analogue video at 1080p, 4MP, and 4K (HDTVI 3.0) over distances of 300–500
                metres. A cost-effective upgrade for existing RG59 infrastructure. RG6 has
                lower signal loss per metre and a larger central conductor than RG59.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All external cable runs must use cable rated for outdoor use. Where cables are buried,
          use armoured cable or install in HDPE duct with draw wire left in situ for future
          re-cabling. Mark all cable routes on as-built drawings.
        </p>
      </>
    ),
  },
  {
    id: 'power-consumption',
    heading: 'Power Consumption Calculations',
    content: (
      <>
        <p>
          Undersizing the PoE switch or power supply is one of the most common errors in CCTV
          installations. Always calculate total power demand before specifying equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Camera power draw</strong> — typical IP cameras draw 5–15W. Cameras
                with IR illuminators draw 10–25W. PTZ cameras draw 15–30W or more. Multi-sensor
                panoramic cameras can draw 30–60W. Always check the manufacturer's maximum power
                draw specification, not the typical draw — the PSU must handle maximum load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PoE switch budget calculation</strong> — multiply the maximum camera power
                draw by the number of cameras. Add 20 per cent headroom. A 16-camera system with
                cameras drawing a maximum of 25W each requires a PoE switch with at least 480W
                total PoE budget (400W + 20%). Many 16-port PoE switches have a PoE budget of
                only 150W or 250W — insufficient for this load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NVR and storage power</strong> — an NVR unit draws 15–40W. Each 3.5-inch
                surveillance-grade HDD draws approximately 6–8W active, 3W standby. A 16-channel
                NVR with four 10TB HDDs draws approximately 60–70W total. For NVRs with built-in
                PoE switches, total consumption can reach 300–500W — a significant load requiring
                a dedicated circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS sizing</strong> — the UPS must power the NVR, all switches, and any
                local camera PSUs for the required runtime. Total the continuous load and divide
                by the UPS's efficiency factor (typically 0.9) to get the required VA rating.
                A 200W load requiring 30-minute runtime needs a UPS of at least 600VA with
                appropriate battery capacity.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for External Cameras',
    content: (
      <>
        <p>
          The Ingress Protection (IP) rating (BS EN 60529) defines a camera's resistance to
          dust and moisture. The correct IP rating ensures cameras survive the UK climate and
          their specific installation environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65</strong> — dust-tight and protected against low-pressure water jets
                from any direction. Minimum for sheltered outdoor locations (under a canopy,
                covered car park). Not suitable for exposed positions where the camera faces
                direct rainfall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP66 — standard for UK outdoor installation</strong> — dust-tight and
                protected against powerful water jets from any direction. Suitable for exposed
                positions on building exteriors, car parks, and general outdoor applications.
                The minimum rating specified for most UK commercial CCTV tender requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP67</strong> — dust-tight and protected against temporary immersion
                to 1 metre for 30 minutes. Suitable for cameras in positions where water
                pooling is possible — ground-level cameras, cameras near drainage points,
                or cameras in areas subject to flooding. Also appropriate for coastal and
                high-rainfall environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IK10 impact resistance</strong> — the IK code (BS EN 62262) rates a
                camera's resistance to mechanical impact, separate from its IP rating. IK10
                is the maximum rating, protecting against a 20J impact (equivalent to a 5kg
                weight dropped from 400mm). Specify IK10 for cameras in public areas, car parks,
                retail premises, and anywhere vandalism is a risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Note that IP and IK ratings apply to the camera housing only. Cable entry points,
          mounting brackets, and junction boxes must also be appropriately rated. Always seal
          cable entry points with waterproof sealant after installation.
        </p>
      </>
    ),
  },
  {
    id: 'gdpr',
    heading: 'GDPR Considerations for Commercial CCTV',
    content: (
      <>
        <p>
          Commercial CCTV systems that capture images of identifiable individuals are subject
          to UK GDPR and the Data Protection Act 2018. Electricians installing CCTV systems
          should be aware of their clients' legal obligations and include relevant documentation
          in the handover pack.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ICO registration</strong> — most organisations using CCTV to process
                personal data must register with the Information Commissioner's Office (ICO)
                as a data controller. Registration costs £40–£2,900 per year depending on
                organisation size. Sole traders and micro-businesses may be exempt.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning signage — mandatory</strong> — CCTV warning signs must be
                displayed at all camera locations, clearly visible before the monitored area
                is entered. Signs must identify who operates the CCTV and provide contact
                details. The ICO publishes recommended sign templates. Position signage at
                entry points to the monitored area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retention periods</strong> — footage should be retained only as long
                as necessary for its purpose. For most premises, 28–31 days is standard. Beyond
                the retention period, footage must be automatically overwritten. Configure NVR
                overwrite settings during commissioning and document the retention period in
                the CCTV policy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Camera field of view</strong> — cameras must not capture areas beyond
                what is necessary for the stated purpose. Cameras pointing at neighbouring
                properties, public highways, or areas where individuals have a reasonable
                expectation of privacy may breach UK GDPR unless there is a clear justification.
                Document the field of view of each camera in the commissioning record.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nvr-dvr-power',
    heading: 'NVR and DVR Power Requirements',
    content: (
      <>
        <p>
          The recording equipment is the most critical component in a CCTV system — it must
          operate reliably 24/7, often for years without interruption. Correct power supply
          design is essential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit and socket</strong> — power the NVR or DVR from a
                dedicated circuit with a clearly labelled outlet. Do not share with other
                equipment that may be switched off or cause voltage fluctuations. For comms
                cabinet installations, use a dedicated 13A socket outlet within the cabinet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS — mandatory for commercial systems</strong> — connect the NVR,
                all PoE switches, and managed network switches to a UPS. A power interruption
                without UPS can corrupt HDD data and lose recordings. Specify a UPS with automatic
                voltage regulation (AVR) to protect against power fluctuations as well as outages.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ventilation</strong> — NVRs and DVRs generate heat from HDDs and
                processing. Ensure adequate ventilation in the equipment cabinet. Do not stack
                NVRs without ventilation space between units. For large multi-NVR installations,
                a rack-mounted cabinet with forced ventilation or air conditioning may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surge protection</strong> — fit a surge protection device (SPD) on the
                mains supply to the CCTV equipment cabinet. Lightning or switching transients on
                the supply can damage NVRs and hard drives. Outdoor camera connections are
                particularly vulnerable — fit PoE surge protectors at the camera end of outdoor
                cable runs in exposed locations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'CCTV Installation Costs (2026)',
    content: (
      <>
        <p>
          CCTV costs depend on camera count, resolution, cable run complexity, and recording
          requirements. The figures below are for professionally installed systems in the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic system (4 cameras)</strong> — £600–£1,200 for a four-camera
                IP system with 2MP cameras, 4-channel PoE NVR, and 1TB HDD. Includes installation,
                commissioning, and mobile app setup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small commercial (8 cameras)</strong> — £1,500–£3,000 for an eight-camera
                system with 4MP or 4K cameras, managed PoE switch, 8-channel NVR, 4TB RAID
                storage, and UPS. External cable containment adds cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium commercial (16–32 cameras)</strong> — £3,000–£10,000+. Includes
                fibre backbone for long runs, multiple PoE switches, 16TB+ NVR storage, and
                remote management. Specification and procurement savings are available at this
                scale.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Per additional camera (incremental)</strong> — £100–£250 per additional
                IP camera once infrastructure is in place, including camera, mounting, cable, and
                configuration. PTZ cameras and specialist cameras (ANPR, thermal) cost significantly
                more.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: CCTV Installation Work',
    content: (
      <>
        <p>
          CCTV installation is a natural extension of data cabling and low-voltage work for
          electricians. The electrical installation elements — power supplies, mains circuits,
          UPS, surge protection, and external cable containment — are directly within an
          electrician's competence.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote CCTV Jobs Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build accurate quotes for CCTV installations. Include CAT6 cable and
                  containment, PoE switch, NVR, UPS, surge protection, mains circuits, and
                  commissioning — all in a professional PDF quote.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Bundle Security System Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  CCTV projects often arise alongside{' '}
                  <SEOInternalLink href="/intruder-alarm-installation">
                    intruder alarm installation
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/access-control-installation">
                    access control wiring
                  </SEOInternalLink>
                  . Positioning your business as a complete security electrical installer
                  increases average job value significantly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage CCTV and security installations with Elec-Mate"
          description="Quote, invoice, and track CCTV and security system jobs alongside your electrical work. Professional PDF quotes and invoices in minutes. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CCTVInstallationElectricalPage() {
  return (
    <GuideTemplate
      title="CCTV Installation Electrical Requirements UK | Camera Wiring Guide"
      description="CCTV installation electrical requirements for the UK. PoE vs local power, CAT6 vs coaxial cable, power consumption calculations, IP ratings for outdoor cameras, GDPR for commercial CCTV, NVR/DVR power requirements, and installation costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Security Systems Guide"
      badgeIcon={Wifi}
      heroTitle={
        <>
          CCTV Installation Electrical Requirements UK:{' '}
          <span className="text-yellow-400">Camera Wiring Guide</span>
        </>
      }
      heroSubtitle="The complete electrical guide to CCTV installation in the UK — PoE vs local power, CAT6 vs coaxial cable, power consumption calculations, IP ratings for external cameras, GDPR obligations, NVR/DVR power supply design, and realistic 2026 costs."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About CCTV Installation Electrical Requirements"
      relatedPages={relatedPages}
      ctaHeading="Quote CCTV and Security Installations with Elec-Mate"
      ctaSubheading="Join UK electricians using Elec-Mate to quote and manage CCTV and security system installations. Professional quotes in minutes. 7-day free trial."
    />
  );
}
