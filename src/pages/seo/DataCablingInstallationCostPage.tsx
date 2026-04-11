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
  Network,
  Server,
  Wifi,
  Building2,
  Cable,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Data Cabling Installation Cost', href: '/guides/data-cabling-installation-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Why Structured Data Cabling?' },
  { id: 'per-point-costs', label: 'Cost Per Data Point' },
  { id: 'components', label: 'Structured Cabling Components' },
  { id: 'small-office', label: 'Small Office Costs' },
  { id: 'large-commercial', label: 'Large Commercial Costs' },
  { id: 'wifi-cabling', label: 'WiFi Access Point Cabling' },
  { id: 'fibre-backbone', label: 'Fibre Backbone for Larger Buildings' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Data Cabling' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A single Cat6 data point costs £80 to £150 fully installed and tested, including cable, faceplate, patch panel termination, and certification. Cat6a points cost £100 to £200.',
  'A small office installation (10 to 20 data points) typically costs £1,200 to £3,500 including the comms cabinet, patch panel, and testing. Larger commercial installations (50 to 200+ points) range from £6,000 to £30,000+.',
  'Structured cabling follows a star topology from a central comms cabinet to each data point. Components include horizontal cable runs (Cat6/Cat6a), patch panels, faceplates, comms cabinet, and patch leads.',
  'All data cabling should be tested and certified to the relevant standard — Cat6 to TIA-568-C.2 or ISO 11801. A Fluke or equivalent channel test certifies each link end to end, providing documented proof of performance.',
  'WiFi access point cabling is increasingly common — each AP requires a Cat6 cable run back to the comms cabinet for PoE (Power over Ethernet) connectivity, eliminating the need for separate power supplies.',
];

const faqs = [
  {
    question: 'How much does data cabling cost per point in the UK in 2026?',
    answer:
      'A fully installed and tested Cat6 data point costs £80 to £150 in 2026, depending on cable run length, building construction, and the number of points in the project. Cat6a points (required for 10 Gigabit Ethernet) cost £100 to £200 per point. Volume discounts apply on larger projects — a 50-point installation will cost less per point than a 10-point job because the fixed costs (comms cabinet, patch panel, testing equipment setup) are spread across more points.',
  },
  {
    question: 'What is the difference between Cat6 and Cat6a cabling?',
    answer:
      'Cat6 cabling supports data speeds up to 1 Gbps (1000BASE-T) at distances up to 100 metres, or 10 Gbps (10GBASE-T) at distances up to 55 metres. Cat6a cabling supports 10 Gbps at the full 100-metre distance and has improved shielding against crosstalk and electromagnetic interference. Cat6a cable is thicker and more expensive, and requires Cat6a-rated patch panels and faceplates. For most small to medium office installations, Cat6 is sufficient. Cat6a is recommended for future-proofing, server rooms, and environments with high electromagnetic interference.',
  },
  {
    question: 'Do I need a comms cabinet for data cabling?',
    answer:
      'Yes. All structured data cabling installations should terminate at a central comms cabinet (also called a network cabinet or rack). This houses the patch panel(s), network switch, router, and any other networking equipment. Wall-mounted 6U to 12U cabinets are suitable for small offices with up to 24 points. Larger installations require floor-standing 22U to 42U cabinets. The comms cabinet should be located in a dry, ventilated area with adequate power supply — typically a dedicated circuit with a double socket.',
  },
  {
    question: 'Can an electrician install data cabling?',
    answer:
      "Yes. Data cabling installation is a natural extension of an electrician's skill set — you are already experienced in cable routing, containment, and termination. The key additional skill is correct termination of RJ45 connectors and patch panel modules to the T568A or T568B wiring standard, and testing with a cable certifier. Many electricians offer data cabling as an add-on service and find it a profitable diversification from traditional electrical work.",
  },
  {
    question: 'How long does a data cabling installation take?',
    answer:
      'A small office with 10 to 15 data points typically takes 1 to 2 days for two installers. A medium office with 30 to 50 points takes 3 to 5 days. Large commercial projects with 100+ points can take 1 to 3 weeks. The main time factors are cable routing (particularly in buildings with limited ceiling void access), termination, and testing. First-fix cabling in a new build is significantly faster than retrofitting cables into an existing occupied building.',
  },
  {
    question: 'What is PoE and does it affect data cabling requirements?',
    answer:
      'Power over Ethernet (PoE) delivers electrical power over the same Cat6 cable that carries data, eliminating the need for separate power supplies at each device. PoE is used for WiFi access points, IP cameras, VoIP phones, and access control systems. Standard PoE (IEEE 802.3af) provides up to 15.4W, PoE+ (802.3at) provides up to 30W, and PoE++ (802.3bt) provides up to 90W. For PoE applications, use quality Cat6 cable with solid copper conductors — copper-clad aluminium (CCA) cable is not suitable for PoE as it has higher resistance and can overheat.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/cctv-installation-electrical-cost',
    title: 'CCTV Installation Electrical Cost',
    description: 'Electrical and cabling costs for CCTV installations including PoE and Cat6 runs.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-electrical-installation',
    title: 'Commercial Electrical Installation',
    description: 'Guide to commercial electrical work including containment and distribution.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for data cabling power circuits.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote data cabling projects with itemised per-point pricing and professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/three-phase-installation-cost',
    title: '3-Phase Installation Cost',
    description:
      'Cost guide for 3-phase supply upgrades often needed alongside large data cabling projects.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description:
      'Pricing guide for consumer unit replacements — often needed when adding dedicated circuits.',
    icon: PoundSterling,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Structured Data Cabling?',
    content: (
      <>
        <p>
          Structured data cabling is the backbone of any modern office or commercial building's
          network infrastructure. While WiFi is ubiquitous, every wireless access point needs a
          wired backhaul, and many devices — desktops, printers, VoIP phones, IP cameras, access
          control systems — still perform best on a wired connection.
        </p>
        <p>
          A properly designed and installed structured cabling system provides reliable, high-speed
          connectivity for 15 to 25 years — far outlasting the networking equipment connected to it.
          This makes it one of the best infrastructure investments a business can make, and it is
          increasingly a service that electricians offer alongside traditional electrical work.
        </p>
        <p>
          This guide covers the costs of data cabling installation in the UK in 2026, from single
          data points to full building infrastructure, helping electricians quote these jobs
          accurately and homeowners or business owners understand what they should expect to pay.
        </p>
      </>
    ),
  },
  {
    id: 'per-point-costs',
    heading: 'Cost Per Data Point',
    content: (
      <>
        <p>
          Data cabling is typically quoted on a per-point basis. Each "point" is a single cable run
          from the comms cabinet to a faceplate at the desk or device location, terminated at both
          ends and tested.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Per-Point Pricing (Fully Installed and Tested)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cat6 data point</strong> — £80 to £150 per point. Includes Cat6 U/UTP cable
                (305m box at £80 to £120 trade), single-gang faceplate with Cat6 module, patch panel
                port termination, and channel test certification. Price varies with cable run length
                and building access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cat6a data point</strong> — £100 to £200 per point. Cat6a S/FTP cable is
                thicker and more expensive (305m box at £150 to £250 trade). Requires Cat6a-rated
                modules and patch panel. Recommended for 10 Gigabit Ethernet and future-proofing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Double data point (two cables to one faceplate)</strong> — £140 to £260 per
                position. A dual-port faceplate with two independent cable runs back to the patch
                panel. Common at desk positions where a PC and VoIP phone both need wired
                connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Volume pricing (50+ points)</strong> — £65 to £120 per Cat6 point, £85 to
                £160 per Cat6a point. Larger projects benefit from economies of scale in cable
                purchasing, containment installation, and testing efficiency.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices assume standard cable routing through ceiling voids, walls, and trunking.
          Retrofitting cables into a building with solid walls, no ceiling voids, or limited access
          adds significantly to the per-point cost.
        </p>
      </>
    ),
  },
  {
    id: 'components',
    heading: 'Structured Cabling Components',
    content: (
      <>
        <p>
          A structured cabling installation consists of several key components, each adding to the
          total project cost:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Horizontal cabling</strong> — the Cat6 or Cat6a cable runs from the comms
                cabinet to each data point. Maximum 90 metres for permanent link, 100 metres for
                channel (including patch leads). Cable is sold in 305m boxes — a box typically
                serves 8 to 15 data points depending on run lengths.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Server className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Patch panel</strong> — mounts in the comms cabinet and provides the
                termination point for all horizontal cables. A 24-port Cat6 patch panel costs £30 to
                £60 trade. Cat6a patch panels cost £50 to £100. Choose modular patch panels for
                flexibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Server className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Comms cabinet</strong> — wall-mounted cabinets (6U to 12U) cost £80 to £200.
                Floor-standing cabinets (22U to 42U) cost £250 to £600. The cabinet houses the patch
                panel, network switch, router, and other networking equipment. Include a shelf, fan
                tray, and power distribution unit (PDU).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faceplates and modules</strong> — single or double-gang faceplates with
                snap-in Cat6 modules at each data point. Budget £5 to £12 per faceplate with
                modules. Use colour-coded modules to distinguish data, voice, and WiFi connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Containment</strong> — cable tray, basket, trunking, or conduit to support
                and protect cable runs. Mini-trunking for visible runs in offices costs £1 to £3 per
                metre. Cable basket in ceiling voids costs £5 to £15 per metre. This is often the
                most variable cost element.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Patch leads</strong> — short cables connecting the patch panel to the
                network switch, and from the faceplate to the device. Budget £3 to £8 per patch
                lead. Typically two per data point (one at each end).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'small-office',
    heading: 'Small Office Installation (10 to 20 Points)',
    content: (
      <>
        <p>
          A typical small office data cabling installation serves 5 to 10 desk positions with double
          data points (PC and phone), plus a few single points for printers and WiFi access points.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Small Office Cost Breakdown (15 Points)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Cat6 cabling and termination (15 points): £1,200 to £2,250</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Wall-mounted comms cabinet (9U): £100 to £180</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>24-port patch panel: £35 to £60</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Containment (trunking and cable management): £150 to £400</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Patch leads (30 leads): £90 to £240</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>Testing and certification: £150 to £300</span>
            </li>
            <li className="flex items-start gap-3 pt-2 border-t border-white/10">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total: £1,725 to £3,430</strong>
              </span>
            </li>
          </ul>
        </div>
        <p>
          A small office installation typically takes 1 to 2 days for two installers. This assumes
          reasonable access to ceiling voids or wall cavities for cable routing. Solid-wall
          construction with no ceiling void will add time and cost for surface-mounted containment.
        </p>
      </>
    ),
  },
  {
    id: 'large-commercial',
    heading: 'Large Commercial Installation (50 to 200+ Points)',
    content: (
      <>
        <p>
          Larger commercial installations involve significantly more planning, materials, and
          labour. They often include multiple floors, multiple comms cabinets, fibre backbone links
          between floors, and integration with building management systems.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Large Commercial Cost Ranges</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>50-point installation</strong> — £5,000 to £9,000 total. Single floor, one
                comms cabinet, Cat6 throughout. Includes patch panels, containment, testing, and
                documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>100-point installation</strong> — £9,000 to £18,000 total. May span multiple
                floors with floor-standing comms cabinets on each floor and fibre backbone between
                them. Cat6 or Cat6a depending on requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>200+ point installation</strong> — £18,000 to £35,000+ total. Multiple comms
                rooms, extensive containment systems, fibre backbone, and detailed project
                management. Often includes WiFi access point cabling throughout.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Large commercial projects typically take 1 to 4 weeks depending on point count, building
          complexity, and the number of installers. First-fix cabling during construction is
          significantly more cost-effective than retrofitting into an occupied building.
        </p>
      </>
    ),
  },
  {
    id: 'wifi-cabling',
    heading: 'WiFi Access Point Cabling',
    content: (
      <>
        <p>
          Every professional WiFi installation requires wired backhaul to each access point.
          Consumer mesh systems and WiFi extenders cannot match the performance of properly cabled
          access points, and any business relying on WiFi should invest in structured cabling for
          their APs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AP cable run</strong> — each WiFi access point needs a Cat6 cable from the
                comms cabinet to the AP mounting position (typically ceiling-mounted). Cost: £80 to
                £150 per AP position including cable, termination, and testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PoE power</strong> — modern WiFi access points are powered via PoE (Power
                over Ethernet), receiving both data and power through the same Cat6 cable from a PoE
                network switch. This eliminates the need for a separate power supply at each AP
                position, reducing installation cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coverage planning</strong> — typical coverage is one AP per 50 to 100 m² in
                an office environment, depending on wall construction and user density. A 500 m²
                office might need 6 to 10 access points.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, WiFi AP cabling is an excellent add-on to any office data cabling
          project. The cable runs are identical to standard data points, and the PoE switch in the
          comms cabinet powers all the APs without any additional electrical work at the AP
          positions.
        </p>
      </>
    ),
  },
  {
    id: 'fibre-backbone',
    heading: 'Fibre Backbone for Larger Buildings',
    content: (
      <>
        <p>
          In multi-floor or multi-building installations, fibre optic cable is used as the backbone
          link between comms cabinets. Fibre provides much higher bandwidth than copper over longer
          distances and is immune to electromagnetic interference.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multimode fibre (OM3/OM4)</strong> — £2 to £5 per metre for 4-core cable.
                Suitable for runs up to 300 metres at 10 Gbps. The standard choice for inter-floor
                links within a single building.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-mode fibre (OS2)</strong> — £1.50 to £4 per metre for 4-core cable.
                Required for runs exceeding 300 metres or between separate buildings. Supports
                distances of several kilometres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fibre termination and testing</strong> — fusion splicing and OTDR testing
                requires specialist equipment. Budget £200 to £500 per fibre link (each end
                terminated and tested). Some installers subcontract fibre termination to
                specialists.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fibre patch panels and SFP modules</strong> — fibre patch panels cost £30 to
                £80 each. SFP (Small Form-factor Pluggable) modules for the network switches cost
                £15 to £50 each. Budget one at each end of every fibre link.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A typical inter-floor fibre backbone link (two comms cabinets connected by a 4-core
          multimode fibre run, terminated and tested at both ends) costs £400 to £800. For
          electricians looking to offer complete building infrastructure, fibre skills are a
          valuable addition to your service offering.
        </p>
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          Professional data cabling installations must be tested and certified. Testing verifies
          that every cable run meets the performance requirements of the relevant standard and
          provides documented proof that the installation will support the intended network speeds.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Channel test</strong> — tests the complete link from patch panel to
                faceplate including patch leads. Measures insertion loss, return loss, NEXT
                (near-end crosstalk), FEXT (far-end crosstalk), and propagation delay. A Fluke
                DSX-5000 or equivalent certifier is the industry standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permanent link test</strong> — tests the fixed cabling only (excludes patch
                leads). More commonly used as it tests the installed infrastructure independently of
                the patch leads, which may be replaced over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification report</strong> — each cable run gets an individual pass/fail
                result against the relevant standard (Cat6 = TIA-568-C.2 Class E, Cat6a =
                TIA-568-C.2 Class EA). The full set of test reports is provided to the client as
                proof of compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Testing typically costs £5 to £15 per point when included in the installation project.
          Standalone testing and certification of existing cabling costs £10 to £25 per point as the
          tester must set up at both ends of every link. A cable certifier is a significant
          investment (£5,000 to £15,000 for a Fluke DSX series) but essential for professional data
          cabling work.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Data Cabling',
    content: (
      <>
        <p>
          Data cabling is one of the most profitable add-on services an electrician can offer. The
          skills overlap significantly with electrical installation — cable routing, containment,
          and termination — and the margins are typically better than domestic electrical work. Here
          are tips for quoting data cabling effectively:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Per Point Plus Fixed Costs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Break your quote into a per-point rate (covering cable, termination, faceplate,
                  and testing) plus fixed costs (comms cabinet, patch panel, containment,
                  mobilisation). This makes it easy for the client to understand the cost and to add
                  or remove points during the project.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Survey Before Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always survey the building before providing a fixed-price quote. Check ceiling
                  void access, wall construction, cable route obstacles, and the location for the
                  comms cabinet. A desktop quote based on a floor plan will miss the practical
                  difficulties that determine the real cost.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Invest in a Cable Certifier</h4>
                <p className="text-white text-sm leading-relaxed">
                  A cable certifier (Fluke DSX-5000 or equivalent) is essential for professional
                  data cabling work. It provides documented proof that every link meets the required
                  standard and gives the client confidence in the installation. The certifier pays
                  for itself within a few medium-sized projects.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote data cabling projects professionally"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting with itemised pricing, professional PDF output, and AI cost engineering. Diversify into data cabling with confidence. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DataCablingInstallationCostPage() {
  return (
    <GuideTemplate
      title="Data Cabling Installation Cost UK 2026 | Cat6 Pricing"
      description="How much does data cabling installation cost in the UK in 2026? Complete guide covering Cat6 and Cat6a per-point pricing, comms cabinets, patch panels, WiFi AP cabling, fibre backbone, testing, and costs for small office to large commercial installations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Data Cabling Installation Cost:{' '}
          <span className="text-yellow-400">UK Cat6 Pricing Guide 2026</span>
        </>
      }
      heroSubtitle="How much does data cabling cost per point? This guide covers Cat6 and Cat6a pricing, structured cabling components, comms cabinets, WiFi access point cabling, fibre backbone, and total project costs — from small office installations to large commercial infrastructure."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Data Cabling Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Data Cabling Projects with Professional Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and AI-powered cost engineering. Diversify into data cabling with confidence. 7-day free trial, cancel anytime."
    />
  );
}
