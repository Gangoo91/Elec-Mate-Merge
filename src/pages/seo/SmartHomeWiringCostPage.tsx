import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Lightbulb,
  Wifi,
  Cable,
  Home,
  FileCheck2,
  Calculator,
  GraduationCap,
  Wrench,
  Zap,
  Smartphone,
  Network,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Smart Home Wiring Cost', href: '/guides/smart-home-wiring-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Smart Home Wiring Overview' },
  { id: 'cost-breakdown', label: 'Cost Breakdown by System' },
  { id: 'smart-lighting', label: 'Smart Lighting Costs' },
  { id: 'smart-sockets', label: 'Smart Sockets and Switches' },
  { id: 'structured-cabling', label: 'Structured Cabling (Cat6 and WiFi)' },
  { id: 'whole-house-vs-room', label: 'Whole-House vs Room-by-Room' },
  { id: 'part-p-and-regs', label: 'Regulations and Part P' },
  { id: 'for-electricians', label: 'For Electricians: Smart Home Revenue' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Smart home wiring costs in the UK range from £500 for a single-room smart lighting setup to £5,000+ for a whole-house system with structured cabling, smart switches, and centralised control.',
  'Smart lighting is the most popular entry point — replacing standard switches with smart dimmers costs £40 to £80 per switch (supply and fit), with smart LED downlights from approximately £20 to £60 each at trade price.',
  'Structured cabling (Cat6 to every room plus WiFi access points) adds £1,500 to £3,000 to a new build or major renovation, but provides reliable high-speed connectivity throughout the property.',
  'Retrofitting smart wiring into an existing property costs more than installing during a new build or rewire because of the additional cable routing and making good.',
  'Most smart home electrical work is notifiable under Part P if it involves new circuits or modifications to existing circuits — a registered electrician should carry out the work.',
];

const faqs = [
  {
    question: 'How much does it cost to wire a house for smart home?',
    answer:
      'The cost depends on the scope. A basic smart lighting setup for a 3-bedroom house (replacing existing switches with smart switches or dimmers in the main rooms) typically costs £500 to £1,200 including materials and labour. A mid-range setup adding smart sockets, a home hub, and Cat6 cabling to key rooms costs £1,500 to £3,000. A comprehensive whole-house system with Cat6 to every room, ceiling-mounted WiFi access points, smart switches throughout, motorised blinds preparation, and a central hub costs £3,000 to £5,000 or more. New builds are cheaper to wire because cables can be run before plastering — retrofitting adds 30% to 50% to the cabling costs.',
  },
  {
    question: 'Do smart switches need a neutral wire?',
    answer:
      'Most smart switches require a neutral wire at the switch position to power the electronics inside the switch. In UK properties wired before approximately 2000, the neutral is often not present at the switch — only the switched live and earth. Retrofitting a neutral to the switch position involves running an additional cable from the ceiling rose or junction box, which adds cost (typically £30 to £60 per switch position in labour). Some newer smart switches (such as certain Philips Hue and Shelly models) can operate without a neutral wire, but they may have limitations such as minimum load requirements or reduced dimming range. Check the product specification before purchasing.',
  },
  {
    question: 'Is Cat6 cabling worth the cost in a smart home?',
    answer:
      'Yes, for reliability and future-proofing. WiFi is convenient but suffers from interference, congestion, and limited bandwidth in larger properties. Cat6 cabling provides 1Gbps (or 10Gbps over shorter distances) with zero interference, and it does not degrade over time. Cat6 cable costs approximately £0.30 to £0.50 per metre at trade price — the material cost is minimal. The labour for pulling cables through walls and floors is the main expense. Cat6 is used for wired internet connections, WiFi access points (which need a wired backhaul), CCTV cameras, intercom systems, and some smart home hubs. A single Cat6 run from a central patch panel to each room provides a permanent infrastructure that supports future technology upgrades.',
  },
  {
    question: 'Can I install smart home wiring myself?',
    answer:
      'Some smart home products are designed for DIY installation — plug-in smart sockets, smart bulbs that screw into existing fittings, and battery-powered sensors do not require electrical work. However, replacing light switches with smart switches, adding new circuits for structured cabling, installing ceiling-mounted WiFi access points, and running Cat6 cable through walls typically requires electrical work that is notifiable under Part P. A qualified electrician should carry out this work to ensure compliance with BS 7671, correct circuit protection, and proper termination of data cables. The electrician will issue an Electrical Installation Certificate or Minor Works Certificate for the work.',
  },
  {
    question: 'What is the best smart home system for UK homes?',
    answer:
      'There is no single best system — it depends on the homeowner priorities. For lighting, Philips Hue and Lutron Caseta are well-established with reliable dimming. For switches and sockets, Lightwave and Shelly offer UK-format products with good app control. For a whole-house ecosystem, Apple HomeKit, Google Home, and Amazon Alexa provide voice control and automation across multiple brands. The emerging Matter standard (supported by Apple, Google, Amazon, and Samsung) aims to unify smart home devices so they work together regardless of brand. From an electrician perspective, the key consideration is the wiring requirement — some systems need a neutral at the switch, some require a hub, and some need Cat6 backhaul. Clarify the system choice before quoting so you can specify the correct cabling.',
  },
  {
    question: 'How long does smart home wiring take?',
    answer:
      'A single room (replacing 3 to 4 switches with smart switches and adding a WiFi access point) takes approximately half a day. A whole-house smart lighting retrofit (10 to 15 switch positions) takes 2 to 3 days. A comprehensive installation including Cat6 structured cabling to every room, WiFi access points, smart switches throughout, and a centralised patch panel takes 3 to 5 days in a typical 3 to 4-bedroom house. In a new build where cables are run before plastering, the first-fix cabling takes 2 to 3 days, with second-fix (termination, testing, commissioning) taking a further 1 to 2 days.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for dedicated circuits supplying smart home hubs and equipment.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create itemised quotes for smart home installations with your margins built in.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for smart home wiring projects on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/security-lighting-installation-cost',
    title: 'Security Lighting Cost Guide',
    description: 'Security lighting is often integrated with smart home systems for automated control.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/guides/kitchen-rewire-cost',
    title: 'Kitchen Rewire Cost Guide',
    description: 'Kitchen rewires are an ideal time to install smart switches and under-cabinet smart lighting.',
    icon: Zap,
    category: 'Guide',
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
    heading: 'Smart Home Wiring: What It Costs in the UK',
    content: (
      <>
        <p>
          Smart home technology has moved from niche to mainstream. Homeowners want app-controlled
          lighting, voice-activated switches, whole-house WiFi, and automated heating — and they
          need electricians to install the wiring that makes it work reliably.
        </p>
        <p>
          The cost of smart home wiring varies enormously depending on scope. A single room with
          smart switches might cost <strong>£500</strong>. A whole-house system with structured
          Cat6 cabling, ceiling-mounted WiFi access points, smart switches in every room, and a
          centralised hub can exceed <strong>£5,000</strong>.
        </p>
        <p>
          This guide breaks down the costs by system type, explains the difference between
          retrofit and new-build pricing, and covers the regulatory requirements under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671
          </SEOInternalLink>{' '}
          and Part P.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Smart Home Wiring Cost Breakdown (2026 UK Prices)',
    content: (
      <>
        <p>
          The following table shows typical all-in costs (materials and labour) for smart home
          wiring projects in UK residential properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Smart lighting — single room</p>
                <p className="text-white text-sm">3–4 smart switches/dimmers, possibly neutral wire retrofit</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£300 – £600</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Smart lighting — whole house</p>
                <p className="text-white text-sm">10–15 smart switches, possible neutral retrofits, hub</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£1,000 – £2,500</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Cat6 structured cabling — per room</p>
                <p className="text-white text-sm">Double Cat6 outlet, cable to patch panel, termination</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£120 – £200</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Whole-house Cat6 + WiFi APs</p>
                <p className="text-white text-sm">Cat6 to every room, patch panel, 3–4 ceiling WiFi access points</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£1,500 – £3,000</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Comprehensive whole-house smart system</p>
                <p className="text-white text-sm">Cat6, WiFi APs, smart switches, smart sockets, hub, commissioning</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£3,000 – £5,000+</p>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white">WiFi access point (materials only)</p>
                <p className="text-white text-sm">Ceiling-mounted PoE access point (e.g. Ubiquiti, TP-Link)</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£80 – £150</p>
            </div>
          </div>
        </div>
        <p>
          Prices for retrofitting into existing properties are typically 30% to 50% higher than
          new-build first-fix pricing because of the additional labour for cable routing through
          finished walls and ceilings, and the cost of making good after installation.
        </p>
      </>
    ),
  },
  {
    id: 'smart-lighting',
    heading: 'Smart Lighting Costs',
    content: (
      <>
        <p>
          Smart lighting is the most popular smart home upgrade because it is visible, practical,
          and relatively affordable. There are two main approaches:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Smart Switches/Dimmers</h3>
            <p className="text-white text-sm leading-relaxed">
              Replace the existing wall switch with a smart switch or dimmer that connects to WiFi
              or a proprietary hub. The existing light fittings and bulbs remain unchanged. This is
              the preferred approach for electricians because it uses standard wiring and does not
              require the homeowner to buy special bulbs. Trade price for a smart dimmer switch
              ranges from £25 to £60. Installation labour is £30 to £50 per switch, plus £30 to
              £60 per switch if a neutral wire needs retrofitting.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Smart Bulbs/Downlights</h3>
            <p className="text-white text-sm leading-relaxed">
              Smart LED bulbs and downlights connect to WiFi or a hub (such as Philips Hue Bridge)
              and are controlled via an app. They offer colour changing (RGB) and tuneable white
              temperature. Smart fire-rated LED downlights with IP65 rating and RGB+CW capability
              are available from approximately £20 to £60 each at trade price. The existing switch
              stays in place but must be left on permanently. This approach is suitable for feature
              lighting but less practical for general room lighting where wall switch control is
              expected.
            </p>
          </div>
        </div>
        <p>
          For most residential installations, smart switches combined with standard dimmable LED
          downlights provide the best balance of cost, reliability, and usability. The switch works
          as a normal switch for family members who do not use the app, while still enabling smart
          features for those who do.
        </p>
      </>
    ),
  },
  {
    id: 'smart-sockets',
    heading: 'Smart Sockets and Switches',
    content: (
      <>
        <p>
          Smart sockets allow homeowners to control individual outlets via an app or voice assistant.
          They are useful for lamps, heaters (with safety interlocks), Christmas lights, and
          appliances that need scheduling.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plug-in smart sockets</strong> — these plug into an existing socket and
                provide app control for the connected device. No electrical work required. Cost:
                £10 to £25 per unit. Suitable for a DIY approach but they protrude from the wall
                and look bulky.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>In-wall smart sockets</strong> — these replace the existing socket with a
                smart version that sits flush in the standard UK back box. Brands such as
                Lightwave and Den offer double smart sockets in standard UK format. Trade price:
                £40 to £80 per double socket. Installation is a straight swap if the existing
                wiring is sound — approximately 20 to 30 minutes per socket including testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart module behind existing socket</strong> — products such as Shelly 1PM
                fit behind the existing socket faceplate in the back box, adding smart control
                without changing the visible socket. Trade price: £15 to £25 per module. Requires
                a sufficiently deep back box (35mm minimum). Good for retrofit where the homeowner
                wants to keep their existing faceplates.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'structured-cabling',
    heading: 'Structured Cabling: Cat6 and WiFi Access Points',
    content: (
      <>
        <p>
          Structured cabling is the backbone of a reliable smart home. WiFi alone is not sufficient
          for homes with many smart devices, 4K streaming, home offices, and CCTV cameras. A
          properly installed Cat6 network provides the permanent infrastructure that supports
          current and future technology.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cat6 cable</strong> — supports up to 1Gbps over 100 metres (or 10Gbps
                over shorter runs). Cat6 RJ45 data module inserts cost approximately £10.50 each
                at trade price. Cable costs £0.30 to £0.50 per metre. The main cost is labour for
                routing cables through walls, floors, and ceilings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Patch panel</strong> — a central termination point (typically in a utility
                cupboard or under-stairs location) where all Cat6 runs terminate. A 24-port patch
                panel costs £30 to £60. The patch panel connects to a network switch, which
                connects to the router.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wifi className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>WiFi access points</strong> — ceiling-mounted access points (such as
                Ubiquiti UniFi or TP-Link Omada) provide whole-house WiFi coverage. They are
                powered via PoE (Power over Ethernet) from the network switch, so only a Cat6
                cable is needed — no separate power supply. One access point per floor is typical
                for a 3 to 4-bedroom house. Cost: £80 to £150 each plus Cat6 run.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A typical structured cabling installation for a 3-bedroom house includes 8 to 12 Cat6
          runs (two per bedroom, two in the living room, two in the home office, plus WiFi AP
          locations), a 24-port patch panel, a PoE network switch, and 3 ceiling-mounted access
          points. Total materials cost: £400 to £700. Total installed cost including labour:
          £1,500 to £3,000.
        </p>
      </>
    ),
  },
  {
    id: 'whole-house-vs-room',
    heading: 'Whole-House vs Room-by-Room Approach',
    content: (
      <>
        <p>
          Homeowners often ask whether they should wire the entire house at once or start with one
          or two rooms. The answer depends on budget, property type, and whether any major works
          are planned:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Whole-House (Recommended for New Builds / Rewires)</h3>
            <p className="text-white text-sm leading-relaxed">
              Installing structured cabling and smart switch wiring during a new build or full
              rewire is significantly cheaper because cables are run before plastering. First-fix
              cabling adds approximately £1,500 to £2,500 to a standard rewire. The infrastructure
              is future-proof and consistent throughout the property. This is the recommended
              approach whenever major works are already planned.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Room-by-Room (Better for Retrofit)</h3>
            <p className="text-white text-sm leading-relaxed">
              For existing properties where no rewire is planned, a room-by-room approach spreads
              the cost and minimises disruption. Start with the most-used rooms (living room,
              kitchen, master bedroom) and add rooms over time. Each room can be completed in half
              a day. The downside is higher per-room cost (no economies of scale) and potential
              inconsistency between rooms if different products are used.
            </p>
          </div>
        </div>
        <p>
          For electricians, whole-house installations are more profitable per job and provide a
          better client experience. Advise clients undertaking renovations to include smart wiring
          in the scope — the incremental cost is small compared to the overall renovation budget.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-and-regs',
    heading: 'Regulations and Part P',
    content: (
      <>
        <p>
          Smart home wiring work falls under the same regulatory framework as any other domestic
          electrical work in the UK:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — adding new circuits (such as a dedicated
                circuit for a structured cabling rack, or new lighting circuits for smart zones) is
                notifiable work in England and Wales. Like-for-like replacement of switches with
                smart switches on existing circuits may not be notifiable, but adding neutral wires
                or modifying circuits is. A registered electrician can self-certify under their
                competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all electrical work must comply with the
                current edition of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671
                </SEOInternalLink>
                . This includes correct circuit protection, cable sizing, earthing, and RCD
                protection where required. Smart switches and modules must be suitable for the
                circuit they are installed on (correct voltage and current rating).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — an Electrical Installation Certificate (EIC) or
                Minor Works Certificate must be issued for notifiable work. The certificate confirms
                that the installation has been designed, constructed, inspected, and tested in
                accordance with BS 7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Smart Home as a Revenue Stream',
    content: (
      <>
        <p>
          Smart home installations represent a growing and profitable revenue stream for
          electricians. The average smart home project is worth £1,500 to £5,000 — significantly
          more than a standard rewire on a per-day basis. Clients who invest in smart home
          technology tend to be willing to pay for quality workmanship and professional advice.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size dedicated circuits for smart home equipment racks and PoE switches with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Verify voltage drop on longer Cat6 PoE runs.
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
                  Create detailed, itemised quotes for smart home installations with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Smart switches, Cat6 cable runs, access points, patch panels, labour, testing —
                  all priced with your margins. Professional PDF sent to the client on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate after commissioning the smart
                  home system. AI board scanning, voice test entry, and instant PDF export. Issue
                  the certificate to the client on the day of completion.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify smart home installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Price smart home jobs accurately and present professional documentation. 7-day free trial."
          icon={Home}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmartHomeWiringCostPage() {
  return (
    <GuideTemplate
      title="Smart Home Wiring Cost UK 2026 | Installation Pricing"
      description="How much does smart home wiring cost in the UK? From £500 for a single room to £5,000+ for whole-house systems. Smart lighting, Cat6 cabling, WiFi access points, smart switches, and structured cabling costs explained."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Smart Home Wiring Cost:{' '}
          <span className="text-yellow-400">UK Installation Pricing 2026</span>
        </>
      }
      heroSubtitle="How much does smart home wiring cost in the UK? This guide covers smart lighting, Cat6 structured cabling, WiFi access points, smart sockets, and whole-house vs room-by-room pricing from £500 to £5,000+."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Smart Home Wiring Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Smart Home Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. 7-day free trial, cancel anytime."
    />
  );
}
