import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  GraduationCap,
  Cable,
  Wrench,
  Zap,
  Eye,
  Sun,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Security Lighting Cost', href: '/guides/security-lighting-installation-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Security Lighting Overview' },
  { id: 'cost-breakdown', label: 'Cost Breakdown' },
  { id: 'pir-floodlights', label: 'PIR Floodlights' },
  { id: 'dusk-to-dawn', label: 'Dusk-to-Dawn Lights' },
  { id: 'cctv-power', label: 'CCTV Power Supply' },
  { id: 'ip-ratings-and-cable', label: 'IP Ratings and Cable Selection' },
  { id: 'planning-permission', label: 'Planning Permission' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Security Lighting' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Security lighting installation in the UK typically costs between £100 and £600 per light, depending on the type of fitting, cable route, and whether new circuits are required.',
  'PIR (passive infrared) floodlights are the most popular option for domestic security — a 20W LED PIR floodlight costs from approximately £21 to £38 at trade price, with installation labour from £80 to £150 per light.',
  'Dusk-to-dawn lights with integrated photocells provide continuous low-level illumination from sunset to sunrise without manual switching, ideal for driveways, paths, and entrances.',
  'All outdoor security lighting must be IP65 rated or higher, with appropriate RCD protection and cables suitable for the external environment (SWA for buried runs, or UV-resistant conduit for surface runs).',
  'Planning permission is not normally required for domestic security lighting, but consideration must be given to light pollution — lights that cause nuisance to neighbours can result in enforcement action under the Environmental Protection Act 1990.',
];

const faqs = [
  {
    question: 'How much does it cost to install security lighting?',
    answer:
      'The cost of installing a single security light ranges from £100 to £250 including the fitting and labour. A simple replacement (like-for-like swap of an existing PIR floodlight) costs £80 to £120. A new installation with a cable run from an internal junction box or the consumer unit, mounting the light, and testing costs £150 to £250 per light. Multiple lights on the same circuit reduce the per-light cost — 3 to 4 PIR floodlights on a single circuit typically cost £300 to £600 total. Premium security lighting installations with SWA cable runs, CCTV power feeds, and separate switching cost more — up to £600 per light for complex installations.',
  },
  {
    question: 'What is the best type of security light for a house?',
    answer:
      'For most UK homes, a 20W to 30W LED PIR floodlight provides the best combination of security, energy efficiency, and cost. A 20W LED floodlight produces approximately 1,600 to 2,000 lumens — equivalent to a 150W halogen — and draws very little power. The PIR sensor detects movement within a range of 8 to 12 metres and activates the light for a preset duration (typically adjustable from 10 seconds to 10 minutes). The trade price for a quality 20W LED PIR floodlight is approximately £21 to £38. For continuous lighting (driveways, paths), a dusk-to-dawn light with an integrated photocell is better as it activates automatically at sunset. For maximum security, combine PIR floodlights with CCTV cameras that have built-in infrared illumination.',
  },
  {
    question: 'Do I need an electrician to install a security light?',
    answer:
      'If the security light is being connected to an existing outdoor lighting circuit or replaced like-for-like, the work may not be notifiable under Part P. However, if a new circuit is being run from the consumer unit, or if the light is being installed in a location not previously wired, the work is notifiable under Part P in England and Wales. In all cases, the connection to the mains must be carried out safely and comply with BS 7671. A qualified electrician will ensure correct RCD protection, appropriate cable sizing, weatherproof connections, and compliance with the regulations. An Electrical Installation Certificate or Minor Works Certificate should be issued for new installations.',
  },
  {
    question: 'What IP rating do security lights need?',
    answer:
      'Outdoor security lights should be rated at least IP65. IP65 means the fitting is dust-tight (6) and protected against water jets from any direction (5). This is sufficient for wall-mounted lights under the eaves or on a sheltered wall. For fully exposed locations (top of a pole, open wall with no overhang), IP66 is preferable as it protects against powerful water jets. IP67 (temporary immersion) is required for ground-recessed uplights or lights installed at ground level where standing water is possible. The IP rating is stamped on the product and listed in the specification sheet — always check before purchasing.',
  },
  {
    question: 'Can security lights cause problems with neighbours?',
    answer:
      'Yes. Security lights that shine into neighbouring properties, bedrooms, or public spaces can constitute a statutory nuisance under the Environmental Protection Act 1990. The local authority can serve an abatement notice requiring the light to be adjusted or removed. To avoid problems: position PIR floodlights to cover your property only, angle the light downward rather than outward, use a time delay and sensitivity setting that prevents false triggering, and consider a shield or cowl to restrict the beam spread. Dusk-to-dawn lights should use warm white (3000K) or low-output fittings to minimise light pollution. The Institution of Lighting Professionals publishes guidance on domestic security lighting to avoid nuisance.',
  },
  {
    question: 'Are solar-powered security lights any good?',
    answer:
      'Solar-powered PIR floodlights have improved significantly and are suitable for locations where running a mains cable is impractical or too expensive. A quality solar PIR floodlight with a detachable solar panel costs approximately £74 at trade price and provides 550 to 800 lumens — adequate for a path, side gate, or shed. However, they are less reliable than mains-powered lights: performance depends on sunlight exposure (reduced in winter and in shaded positions), the battery degrades over 2 to 3 years, and the light output is lower than mains LED floodlights. For primary security lighting on the front of a house, mains-powered is recommended. Solar is a good supplementary option for secondary locations.',
  },
  {
    question: 'How many security lights does a house need?',
    answer:
      'A typical 3-bedroom semi-detached house benefits from 2 to 4 security lights: one PIR floodlight covering the front entrance and driveway, one covering the rear garden or patio, and optionally one covering a side passage or garage. A detached property may need 3 to 5 lights for full perimeter coverage. The PIR sensors should be positioned to cover the approach routes to the property — the front path, side gate, and rear garden access. Avoid overlapping sensor zones that cause lights to trigger each other. The total cost for a 3-light domestic security lighting installation is typically £300 to £600 including materials and labour.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for security lighting circuits including SWA external runs.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long cable runs to remote security lights.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/outdoor-socket-installation-cost',
    title: 'Outdoor Socket Cost Guide',
    description: 'Outdoor sockets share similar cable routing and IP rating requirements with security lighting.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Price security lighting installations accurately with itemised professional quotes.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate',
    description:
      'Complete Minor Works Certificates for security lighting installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering all installation types.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Security Lighting Installation: What It Costs in the UK',
    content: (
      <>
        <p>
          Security lighting is one of the most effective and affordable home security measures.
          A well-positioned PIR floodlight deters intruders, illuminates paths and driveways for
          safety, and is visible confirmation that a property is protected. For electricians, it
          is reliable bread-and-butter work with quick turnaround and good margins.
        </p>
        <p>
          A typical security light installation costs <strong>£100 to £600</strong> depending on
          the type of fitting, the cable route, and how many lights are being installed. A simple
          single-light installation is at the lower end; a multi-light perimeter system with SWA
          cable runs is at the higher end.
        </p>
        <p>
          This guide covers the costs, fitting types, IP ratings, cable selection, and regulatory
          considerations for domestic security lighting installations in the UK.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Security Lighting Cost Breakdown (2026 UK Prices)',
    content: (
      <>
        <p>
          The following table shows typical costs for security lighting installation in the UK.
          All prices include materials and labour unless stated otherwise.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Like-for-like replacement</p>
                <p className="text-white text-sm">Replace existing PIR floodlight, reuse existing cable</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£80 – £120</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">New single PIR floodlight</p>
                <p className="text-white text-sm">Cable run from junction box or consumer unit, mounting, testing</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£150 – £250</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">3–4 PIR floodlights on one circuit</p>
                <p className="text-white text-sm">Perimeter lighting, cabled from consumer unit</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£300 – £600</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Dusk-to-dawn path/driveway lights</p>
                <p className="text-white text-sm">2–3 bollard or wall lights with photocell, SWA cable</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£300 – £500</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">CCTV power supply (per camera)</p>
                <p className="text-white text-sm">Fused spur or PoE switch, cable run to camera position</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£80 – £200</p>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white">LED PIR floodlight (materials only)</p>
                <p className="text-white text-sm">10W from £13, 20W from £21, 30W from £30, 50W from £40 trade price</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£13 – £56</p>
            </div>
          </div>
        </div>
        <p>
          Material costs for LED security lighting are low. A 10W LED PIR floodlight costs
          approximately £13 at trade price, a 20W PIR floodlight approximately £21, and a 30W
          PIR floodlight approximately £30. The 50W PIR floodlight (for larger areas) costs
          approximately £56. The majority of the installation cost is labour for cable routing,
          mounting, connection, and testing.
        </p>
      </>
    ),
  },
  {
    id: 'pir-floodlights',
    heading: 'PIR Floodlights',
    content: (
      <>
        <p>
          PIR (passive infrared) floodlights are the standard choice for domestic security
          lighting. The PIR sensor detects heat from moving objects (people, vehicles, animals)
          and activates the floodlight for a preset duration:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detection range</strong> — most domestic PIR sensors detect movement at
                8 to 12 metres. Wall-mounted sensors typically cover a 180-degree arc. Standalone
                PIR sensors with tilt and swivel capability (such as the Guardian IP44 exterior
                sensor, trade price approximately £20) allow precise coverage adjustment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adjustable settings</strong> — quality PIR floodlights have three
                adjustable settings: time delay (how long the light stays on after activation,
                typically 10 seconds to 10 minutes), lux level (the ambient light level below
                which the PIR activates — prevents daytime triggering), and sensitivity (reduces
                false triggers from pets, cats, and wind-blown vegetation).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED output</strong> — LED floodlights provide dramatically more light per
                watt than old halogen fittings. A 20W LED floodlight produces 1,600 to 2,000
                lumens — equivalent to a 150W halogen. A 10W LED (800 to 1,000 lumens) is
                sufficient for a side passage. A 30W to 50W LED (2,400 to 4,000 lumens) covers
                a large driveway or rear garden.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When positioning PIR floodlights, consider the approach routes to the property. The PIR
          sensor should face the direction of approach so that the intruder walks across the
          sensor field (side-on detection is more reliable than head-on). Mount the light at 2 to
          3 metres height for optimal PIR performance and to make the light difficult to tamper
          with.
        </p>
      </>
    ),
  },
  {
    id: 'dusk-to-dawn',
    heading: 'Dusk-to-Dawn Lights',
    content: (
      <>
        <p>
          Dusk-to-dawn lights use an integrated photocell to switch on automatically at sunset and
          off at sunrise. They provide continuous low-level illumination throughout the hours of
          darkness, making them ideal for:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Driveways and Paths</h3>
            <p className="text-white text-sm leading-relaxed">
              Bollard lights or low-level wall lights along a driveway or garden path provide
              safe passage for residents and visitors. The continuous illumination also deters
              opportunistic intruders by eliminating dark hiding spots. LED bollard lights with
              photocells cost £30 to £80 each at trade price. Running costs are minimal — a 5W
              LED bollard running for 12 hours costs approximately 1p per night.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Entrances and Porches</h3>
            <p className="text-white text-sm leading-relaxed">
              A dusk-to-dawn wall light at the front door provides welcoming illumination and
              security. A dusk-to-dawn night light pack (trade price from approximately £15 for
              a 2-pack) provides low-cost ambient lighting for porches and entrance halls. For
              a more substantial fitting, a coach light or lantern with an integrated photocell
              costs £20 to £60 at trade price.
            </p>
          </div>
        </div>
        <p>
          Dusk-to-dawn lights can be combined with PIR floodlights for a layered security
          approach — the dusk-to-dawn lights provide constant low-level illumination while the
          PIR floodlights activate at full brightness on detecting movement.
        </p>
      </>
    ),
  },
  {
    id: 'cctv-power',
    heading: 'CCTV Power Supply',
    content: (
      <>
        <p>
          Security lighting installations often include provision for CCTV cameras. Electricians
          are increasingly asked to install the power and data cabling for CCTV as part of a
          security lighting package:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PoE cameras (recommended)</strong> — Power over Ethernet cameras receive
                both power and data via a single Cat6 cable from an indoor PoE switch or NVR
                (Network Video Recorder). The electrician runs Cat6 from each camera position to
                the NVR location. This is the cleanest approach with minimal external wiring.
                Cost: £80 to £150 per camera position (Cat6 run, termination, weatherproof
                entry point).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains-powered cameras</strong> — some cameras require a separate 12V DC or
                mains power supply. The electrician provides a fused spur or unswitched socket at
                each camera position, plus the manufacturer's power supply. This approach requires
                both a power cable and a data cable (or WiFi) to each camera.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>WiFi cameras</strong> — battery-powered or mains-powered WiFi cameras
                (such as Ring, Arlo, and Eufy) require no data cable. Battery models need no
                electrical work at all. Mains-powered WiFi cameras need a nearby power supply.
                The trade-off is that WiFi cameras are less reliable than wired PoE cameras,
                particularly at the edge of WiFi coverage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ip-ratings-and-cable',
    heading: 'IP Ratings and Cable Selection',
    content: (
      <>
        <p>
          All external security lighting and associated wiring must be suitable for the outdoor
          environment:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65 minimum</strong> — all external light fittings must be rated at least
                IP65 (dust-tight, protected against water jets). IP66 is preferred for fully
                exposed locations. Ground-recessed fittings must be IP67 or IP68.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA cable</strong> — for underground cable runs, SWA (steel wire armoured)
                cable provides mechanical protection. 1.5mm² 3-core SWA is sufficient for most
                lighting circuits. The cable must be buried at a minimum depth of 500mm with
                marker tape above it. SWA costs approximately £2 to £3 per metre at trade price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted cable</strong> — for runs along external walls, use
                UV-resistant conduit or mini trunking, or clip SWA directly to the wall surface.
                Standard PVC twin and earth cable is not suitable for external surface mounting
                because the PVC sheath degrades under UV exposure. If twin and earth must be used
                externally, it should be routed through conduit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — all outdoor lighting circuits must have 30mA RCD
                protection. This can be provided by an RCBO at the consumer unit (recommended for
                independent protection) or by a shared RCD covering the outdoor circuits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning-permission',
    heading: 'Planning Permission and Light Pollution',
    content: (
      <>
        <p>
          Planning permission is not normally required for domestic security lighting. However,
          there are important considerations:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — installing external light fittings on a listed
                building may require listed building consent. This depends on the nature and scale
                of the installation and the significance of the affected part of the building.
                Check with the local planning authority before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas</strong> — external alterations in conservation areas
                may require planning permission. A small, discreet security light is unlikely to
                need permission, but multiple large floodlights may attract attention from the
                planning authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light pollution</strong> — the Environmental Protection Act 1990 classifies
                artificial light as a potential statutory nuisance. Security lights that shine
                directly into neighbouring windows, produce excessive glare on public roads, or
                operate excessively (poorly adjusted PIR sensors triggering constantly) can result
                in complaints and enforcement action. Position lights to illuminate your property
                only, angle downward, and adjust PIR sensitivity to minimise false triggers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Institution of Lighting Professionals (ILP) publishes guidance document GN01
          "Guidance Notes for the Reduction of Obtrusive Light" which provides recommendations
          for domestic lighting installations. Following this guidance demonstrates good practice
          and helps avoid disputes.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Security Lighting',
    content: (
      <>
        <p>
          Security lighting is quick, profitable work that often leads to additional jobs. A
          homeowner requesting a PIR floodlight may also want CCTV preparation, garden lighting,
          an outdoor socket, or a consumer unit upgrade. Always survey the full requirement before
          quoting.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size cables for security lighting circuits with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Check voltage drop on long SWA runs to remote lights.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price security lighting installations with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . PIR floodlights, SWA cable, RCBO, glands, fixings, CCTV preparation, labour,
                  and testing — all itemised with your margins. Send a professional PDF quote from
                  the survey.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Minor Works Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  on site after testing the security lighting circuit. Instant PDF export and
                  digital delivery to the homeowner.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify security lighting installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Price security lighting jobs accurately and deliver professional documentation. 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SecurityLightingCostPage() {
  return (
    <GuideTemplate
      title="Security Lighting Installation Cost UK 2026 | Prices"
      description="How much does security lighting cost to install in the UK? Typical prices from £100 to £600 per light. PIR floodlights, dusk-to-dawn lights, CCTV power, IP ratings, SWA cable, and planning considerations explained."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Security Lighting Installation Cost:{' '}
          <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does security lighting cost to install in the UK? This guide covers typical prices from £100 to £600, PIR floodlights, dusk-to-dawn lights, CCTV power supply, IP ratings, SWA cable routes, and planning permission considerations."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Security Lighting Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Security Lighting Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. 7-day free trial, cancel anytime."
    />
  );
}
