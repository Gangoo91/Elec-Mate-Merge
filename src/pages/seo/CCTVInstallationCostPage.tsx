import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Wrench,
  FileCheck2,
  PoundSterling,
  Camera,
  Home,
  Building2,
  Shield,
  Network,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'CCTV Installation Electrical Cost', href: '/guides/cctv-installation-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'CCTV Electrical Work Overview' },
  { id: 'poe-vs-traditional', label: 'PoE vs Traditional Power' },
  { id: 'cabling-costs', label: 'Cabling Costs' },
  { id: 'power-supply', label: 'DVR/NVR Power and UPS Backup' },
  { id: 'ip-vs-analogue', label: 'IP vs Analogue Systems' },
  { id: 'domestic-costs', label: 'Domestic Installation Costs' },
  { id: 'commercial-costs', label: 'Commercial Installation Costs' },
  { id: 'lighting-cameras', label: 'Lighting for Cameras' },
  { id: 'gdpr', label: 'Data Protection and GDPR' },
  { id: 'for-electricians', label: 'For Electricians: Quoting CCTV Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic CCTV system (2 to 4 cameras) typically costs £300 to £800 for the electrical and cabling work, plus the cost of cameras and recording equipment. Commercial systems (8 to 16 cameras) range from £1,500 to £5,000+ for the electrical installation.',
  'PoE (Power over Ethernet) is the preferred method for modern IP camera installations — a single Cat6 cable carries both data and power to each camera, significantly reducing cabling costs compared to traditional systems requiring separate power and video cables.',
  'SWA (Steel Wire Armoured) cable is required for external cable runs that are buried or exposed to weather. Budget £3 to £6 per metre for SWA plus termination glands and junction boxes.',
  'A UPS (Uninterruptible Power Supply) for the DVR/NVR is strongly recommended — it keeps the recording system running during power cuts, which is precisely when CCTV is most needed. Budget £80 to £250 for a suitable UPS.',
  'GDPR requirements apply to all CCTV systems that capture images of identifiable individuals. Signage, a privacy policy, and data retention limits are legal requirements — electricians should advise customers of these obligations.',
];

const faqs = [
  {
    question: 'How much does CCTV installation cost for a house in the UK in 2026?',
    answer:
      'A typical domestic CCTV installation with 2 to 4 cameras costs £600 to £1,500 total in 2026, covering cameras (£100 to £250 each for quality IP cameras), an NVR or recording device (£150 to £400), cabling and electrical work (£300 to £800), and a monitor or app setup. The electrical and cabling work — running Cat6 cables, installing a dedicated power circuit, and fitting a UPS — is typically £300 to £800 depending on cable run lengths and building access.',
  },
  {
    question: 'Is PoE better than traditional power for CCTV cameras?',
    answer:
      'Yes, for most modern installations. PoE (Power over Ethernet) delivers both data and power through a single Cat6 cable, which halves the cabling work compared with traditional systems that need separate power and video cables. PoE also provides a cleaner, more reliable installation with fewer connection points. The PoE switch or NVR with built-in PoE ports provides centralised power management. The only advantage of traditional power is for very long runs (over 100 metres) where PoE may not deliver sufficient power — in these cases, a local power supply or PoE extender is needed.',
  },
  {
    question: 'Do I need SWA cable for external CCTV cameras?',
    answer:
      'If the cable run to an external camera is buried underground or runs externally along a wall in an exposed location, SWA (Steel Wire Armoured) cable provides mechanical protection. For Cat6 runs to external cameras, external-grade UV-resistant Cat6 cable is available and suitable for surface-mounted runs along walls. For buried runs, Cat6 in a duct or SWA provides protection. Power cables run externally should be SWA or run in suitable conduit. Under BS 7671, cables buried in the ground must be protected against mechanical damage.',
  },
  {
    question: 'How many cameras do I need for a typical house?',
    answer:
      'A typical semi-detached house needs 2 to 4 cameras for comprehensive coverage: one covering the front door and driveway, one covering the rear garden and back door, and optionally one covering a side passage or garage. A detached house may need 4 to 6 cameras to cover all aspects. Focus on entry points and valuable areas rather than trying to cover every angle — two well-positioned cameras are more effective than four poorly positioned ones.',
  },
  {
    question: 'Does CCTV need its own electrical circuit?',
    answer:
      'While there is no specific regulation requiring a dedicated circuit for CCTV, it is strongly recommended. A dedicated circuit ensures the system is not affected by other household loads tripping and provides a clear, labelled circuit at the consumer unit. The circuit should be protected by an RCBO and labelled "CCTV". Under BS 7671 Regulation 411.3.3, RCD protection not exceeding 30 mA is required for socket-outlet circuits not exceeding 32A. A UPS on this circuit ensures continuous recording during power interruptions.',
  },
  {
    question: 'What are the GDPR requirements for domestic CCTV?',
    answer:
      'If your CCTV captures images of people beyond the boundary of your property — for example, the pavement, a shared driveway, or neighbouring properties — you are processing personal data and GDPR applies. You must display clear signage stating that CCTV is in operation and who is responsible. You should have a simple privacy notice explaining why you have CCTV, how long footage is retained, and how individuals can request access to footage of themselves. Footage should be retained for a maximum of 30 days unless there is a specific reason to keep it longer (such as an incident being investigated).',
  },
  {
    question: 'Can an electrician install CCTV or do I need a specialist?',
    answer:
      'An electrician can absolutely install CCTV systems. The core skills — cable routing, termination, power supply installation, and testing — are the same as for any electrical installation. The additional knowledge required is configuring the NVR or recording software, setting up remote viewing on a smartphone app, and basic network configuration. Many camera manufacturers provide straightforward plug-and-play setup. For large commercial systems with integration into access control, alarm systems, and monitoring centres, a specialist CCTV installer may be more appropriate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/guides/data-cabling-installation-cost',
    title: 'Data Cabling Installation Cost',
    description: 'Cat6 cabling costs — the same infrastructure used for PoE CCTV installations.',
    icon: Network,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Adding a dedicated CCTV circuit may require spare ways in the consumer unit.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates for new CCTV power circuits.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote CCTV installations with itemised cameras, cabling, and labour costs.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/solar-panel-installation-electrical-cost',
    title: 'Solar Panel Electrical Cost',
    description: 'Solar PV can offset the power costs of running a CCTV system 24/7.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/three-phase-installation-cost',
    title: '3-Phase Installation Cost',
    description: 'Large commercial CCTV installations may form part of a wider 3-phase project.',
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
    heading: 'CCTV Electrical Work Overview',
    content: (
      <>
        <p>
          CCTV installation is one of the fastest-growing areas of work for UK electricians.
          Homeowners and businesses are investing heavily in security, and the electrical and
          cabling work required for a professional CCTV installation falls squarely within an
          electrician's skill set.
        </p>
        <p>
          This guide focuses on the electrical and cabling costs of CCTV installation — the work
          that an electrician quotes and carries out. This includes running cables to camera
          positions, providing power to the recording equipment, installing UPS backup, and ensuring
          the installation complies with BS 7671.
        </p>
        <p>
          Modern IP camera systems have simplified CCTV installation significantly. With PoE (Power
          over Ethernet), a single Cat6 cable carries both data and power to each camera, reducing
          cabling work by half compared with traditional analogue systems.
        </p>
      </>
    ),
  },
  {
    id: 'poe-vs-traditional',
    heading: 'PoE vs Traditional Power for CCTV',
    content: (
      <>
        <p>
          The choice between PoE and traditional power significantly affects the cabling cost and
          complexity of a CCTV installation.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">PoE (Recommended)</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Single Cat6 cable per camera</li>
              <li>Data and power on the same cable</li>
              <li>Centralised power from PoE switch or NVR</li>
              <li>Cleaner installation, fewer connection points</li>
              <li>Maximum 100m cable run per camera</li>
              <li>Lower cabling cost and labour time</li>
              <li>Easier to add cameras in the future</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Traditional Power</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Separate power cable and video cable per camera</li>
              <li>Coaxial (BNC) or Cat6 for video signal</li>
              <li>12V DC power supply at each camera or centralised PSU</li>
              <li>No distance limitation on power (can use heavier cable)</li>
              <li>More cables, more terminations, more labour</li>
              <li>Suitable for very long runs or legacy systems</li>
              <li>Higher installation cost per camera</li>
            </ul>
          </div>
        </div>
        <p>
          For new installations, PoE is almost always the better choice. The only situations where
          traditional power might be preferred are very long cable runs (over 100 metres, though PoE
          extenders can address this) or integration with existing analogue systems.
        </p>
      </>
    ),
  },
  {
    id: 'cabling-costs',
    heading: 'Cabling Costs',
    content: (
      <>
        <p>
          Cabling is typically the largest part of the electrical installation cost for CCTV. The
          type and length of cable runs, building construction, and access all affect the price.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Cable and Installation Costs</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cat6 cable (internal run)</strong> — £1 to £2 per metre for cable, plus £30
                to £60 per camera for installation labour (routing, clipping, and termination). A
                typical domestic run of 15 to 30 metres per camera costs £45 to £120 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External-grade Cat6</strong> — £1.50 to £3 per metre for UV-resistant
                external Cat6. Required for any runs exposed to weather. Use cable clips or conduit
                for protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA cable (buried external runs)</strong> — £3 to £6 per metre for SWA, plus
                £20 to £40 per termination for glands. Required under BS 7671 when cables are buried
                in the ground. Typical for runs to outbuildings, gate cameras, or perimeter cameras.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Containment</strong> — mini-trunking for internal runs (£1 to £2 per metre),
                external conduit (£2 to £4 per metre), or cable basket in roof voids (£5 to £10 per
                metre). The containment method depends on the route and aesthetic requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall penetrations</strong> — each external camera requires a hole through
                the external wall for the cable. Budget £20 to £40 per penetration including core
                drilling, sealing, and making good.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'power-supply',
    heading: 'DVR/NVR Power Supply and UPS Backup',
    content: (
      <>
        <p>
          The recording device (DVR for analogue systems, NVR for IP camera systems) needs a
          reliable power supply. A UPS is strongly recommended to keep the system recording during
          power interruptions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated power circuit</strong> — a dedicated radial circuit from the
                consumer unit is recommended for the CCTV system. Protected by an RCBO and clearly
                labelled at the board. Under BS 7671 Regulation 411.3.3, RCD protection not
                exceeding 30 mA is required for socket-outlet circuits not exceeding 32A. Circuit
                cost: £100 to £250 depending on cable run length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UPS (Uninterruptible Power Supply)</strong> — keeps the NVR, PoE switch, and
                cameras running during power cuts. A 600VA to 1500VA UPS (£80 to £250) provides 15
                to 60 minutes of backup depending on load. This ensures CCTV continues recording
                during a power cut — which may be a deliberate attempt to disable the system before
                a break-in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PoE switch or NVR with built-in PoE</strong> — a PoE network switch (£50 to
                £200 for 8 to 16 ports) provides centralised power and data to all cameras. Many
                NVRs include built-in PoE ports, simplifying the installation. The PoE switch or NVR
                is connected to the UPS for backup power.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Locate the NVR and PoE switch in a secure, ventilated location — ideally a locked cupboard
          or utility room. If a burglar can easily access and remove the NVR, the CCTV footage is
          lost. Cloud backup to a remote server provides an additional layer of protection.
        </p>
      </>
    ),
  },
  {
    id: 'ip-vs-analogue',
    heading: 'IP vs Analogue CCTV Systems',
    content: (
      <>
        <p>
          The choice between IP and analogue cameras affects the cabling requirements, image
          quality, and total installation cost.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">IP Cameras (Recommended)</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Cat6 cabling (single cable per camera with PoE)</li>
              <li>High resolution (2MP to 8MP typical)</li>
              <li>Remote viewing via smartphone app</li>
              <li>Easy to add cameras — just add more PoE ports</li>
              <li>Digital zoom with useful detail</li>
              <li>AI features (person detection, line crossing)</li>
              <li>Camera cost: £80 to £250+ each</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Analogue (HD-TVI/CVI)</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Coaxial cable + separate power cable</li>
              <li>Good resolution (2MP to 5MP)</li>
              <li>Simpler setup, less network knowledge needed</li>
              <li>Longer cable runs without extenders</li>
              <li>Lower camera cost: £40 to £120 each</li>
              <li>More cables = more installation labour</li>
              <li>Suitable for upgrading existing coaxial runs</li>
            </ul>
          </div>
        </div>
        <p>
          For new installations, IP cameras with PoE are the clear choice. The single-cable
          installation is faster and cheaper to install, the image quality is superior, and the
          smart features (push notifications, person detection, cloud backup) provide a much better
          user experience. Analogue systems still have a role when upgrading existing installations
          with coaxial cable already in place.
        </p>
      </>
    ),
  },
  {
    id: 'domestic-costs',
    heading: 'Domestic CCTV Installation Costs (2 to 4 Cameras)',
    content: (
      <>
        <p>
          A domestic CCTV installation typically involves 2 to 4 cameras covering the front and rear
          of the property, with an NVR located inside the house.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Domestic Cost Breakdown (4-Camera PoE System)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cat6 cabling to 4 camera positions (installed and terminated): £200 to £480
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Wall penetrations (4 cameras): £80 to £160</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Containment (external conduit, internal trunking): £50 to £150</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Dedicated circuit from consumer unit: £100 to £250</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Camera mounting and alignment: £80 to £200</span>
            </li>
            <li className="flex items-start gap-3 pt-2 border-t border-white/10">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical and cabling work total: £510 to £1,240</strong>
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Equipment Costs (Customer Supply or Electrician Markup)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>4 x IP cameras (4MP, PoE, weatherproof): £320 to £1,000</span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>8-channel NVR with built-in PoE and 2TB HDD: £200 to £400</span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>UPS (600VA): £80 to £150</span>
            </li>
            <li className="flex items-start gap-3 pt-2 border-t border-white/10">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total system cost (installed): £1,100 to £2,800</strong>
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'commercial-costs',
    heading: 'Commercial CCTV Installation Costs (8 to 16 Cameras)',
    content: (
      <>
        <p>
          Commercial CCTV installations are larger, more complex, and higher value. They often
          involve longer cable runs, outdoor containment, multiple recording devices, and
          integration with access control and alarm systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Commercial Cost Ranges</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>8-camera system (small retail or office)</strong> — Electrical and cabling
                work: £1,500 to £3,000. Equipment: £1,000 to £2,500. Total installed: £2,500 to
                £5,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>16-camera system (warehouse or large retail)</strong> — Electrical and
                cabling work: £3,000 to £6,000. Equipment: £2,500 to £5,000. Total installed: £5,500
                to £11,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large commercial (32+ cameras, multiple sites)</strong> — Electrical and
                cabling work: £6,000 to £15,000+. Equipment: £5,000 to £15,000+. Total installed:
                £11,000 to £30,000+. Often includes fibre backbone, redundant NVRs, and remote
                monitoring integration.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote CCTV installations professionally"
          description="Elec-Mate's quoting app lets you itemise every camera, cable run, and power component with real trade pricing. Send professional PDF quotes with your branding."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'lighting-cameras',
    heading: 'Lighting for CCTV Cameras',
    content: (
      <>
        <p>
          Good lighting is essential for CCTV image quality. Even cameras with infrared (IR) night
          vision benefit from supplementary lighting — IR provides monochrome images, while white
          light enables colour recording at night, which is far more useful for identification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED floodlights</strong> — £30 to £80 per light (trade). Position to
                illuminate the camera's field of view without shining directly into the lens. A 20W
                to 30W LED floodlight provides excellent coverage for a domestic driveway or garden.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PIR-activated lighting</strong> — motion-activated lights serve dual purpose
                as security deterrent and camera illumination. Most cameras will begin recording
                when the light activates, providing both an alert and colour footage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dusk-to-dawn lighting</strong> — for critical areas such as entrances and
                car parks, continuous low-level lighting ensures colour CCTV footage at all times.
                LED bollard lights and wall-mounted downlights provide ambient illumination without
                excessive glare.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, combining CCTV and external lighting in a single quote provides a more
          complete security solution and increases the job value. Always consider lighting when
          surveying for a CCTV installation.
        </p>
      </>
    ),
  },
  {
    id: 'gdpr',
    heading: 'Data Protection and GDPR Signage',
    content: (
      <>
        <p>
          Any CCTV system that captures images of identifiable individuals is processing personal
          data under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act
          2018. Both domestic and commercial installations have obligations.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Signage</strong> — clearly visible signs must be displayed informing people
                that CCTV is in operation. Signs should include the purpose of the CCTV, contact
                details for the operator, and a reference to the right to access footage. Budget £5
                to £15 per sign — include these in your installation quote.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic exemption</strong> — CCTV used purely for domestic purposes within
                the boundary of your property is exempt from most GDPR requirements. However, if
                your cameras capture images beyond your property boundary (the pavement, a shared
                driveway, neighbouring properties), the full obligations apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial obligations</strong> — businesses must carry out a Data
                Protection Impact Assessment (DPIA), maintain a record of processing activities,
                have a documented retention policy (typically 30 days), and respond to subject
                access requests within one month.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As the electrician, you are not responsible for your customer's GDPR compliance, but
          advising them of these obligations demonstrates professionalism and helps avoid problems
          down the line. Include GDPR signage in your quote as standard.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting CCTV Work',
    content: (
      <>
        <p>
          CCTV installation is an excellent diversification for electricians. The skills are
          transferable, the margins are good, and demand is consistently strong. Here are tips for
          quoting CCTV work effectively:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Supply and Install Complete Systems</h4>
                <p className="text-white text-sm leading-relaxed">
                  Do not just quote the cabling work — supply the complete system including cameras,
                  NVR, UPS, and cabling. Source equipment at trade prices (Hikvision, Dahua, and
                  Uniview offer excellent trade pricing) and mark up appropriately. A complete
                  supply-and-install package is more convenient for the customer and more profitable
                  for you.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Survey and Camera Positioning</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always survey the site before quoting. Walk the perimeter, identify the camera
                  positions, plan the cable routes, and assess the lighting conditions. Use a
                  smartphone to take photos from the proposed camera positions at the correct height
                  — show the customer what each camera will see. This builds confidence and
                  justifies your pricing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Offer Maintenance Plans</h4>
                <p className="text-white text-sm leading-relaxed">
                  CCTV systems benefit from annual maintenance — cleaning lenses, checking cable
                  connections, updating firmware, and verifying recording. Offer an annual
                  maintenance contract at £100 to £200 per year for domestic systems and £200 to
                  £500 for commercial. This provides recurring revenue and keeps you as the
                  customer's trusted security installer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote CCTV and security installations"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting with itemised pricing, professional PDF output, and AI cost engineering. Diversify into CCTV with confidence. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CCTVInstallationCostPage() {
  return (
    <GuideTemplate
      title="CCTV Installation Electrical Cost UK 2026 | Wiring Guide"
      description="How much does CCTV installation cost for the electrical and cabling work in 2026? Complete UK guide covering PoE vs traditional power, Cat6 and SWA cabling, UPS backup, domestic (2-4 camera) and commercial (8-16 camera) costs, and GDPR requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          CCTV Installation Electrical Cost:{' '}
          <span className="text-yellow-400">UK Wiring Guide 2026</span>
        </>
      }
      heroSubtitle="How much does CCTV installation cost for the electrical and cabling work? This guide covers PoE vs traditional power, Cat6 and SWA cabling costs, UPS backup, IP vs analogue systems, domestic and commercial pricing, and GDPR signage requirements."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About CCTV Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote CCTV Installations with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI-powered cost engineering. 7-day free trial, cancel anytime."
    />
  );
}
