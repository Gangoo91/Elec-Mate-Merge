import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Lightbulb,
  Zap,
  ShieldCheck,
  Calculator,
  FileCheck2,
  Wrench,
  Cable,
  ClipboardCheck,
  Gauge,
  Wifi,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Smart Home Lighting Installation', href: '/guides/smart-home-lighting-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'protocols', label: 'DALI, KNX, Zigbee and Z-Wave' },
  { id: 'neutral-wire', label: 'Neutral Wire Requirements' },
  { id: 'lux-levels', label: 'Lux Levels and Scene Setting' },
  { id: 'daylight-presence', label: 'Daylight Harvesting and Presence Detection' },
  { id: 'costs', label: 'System Costs by Budget Level' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Smart home lighting systems range from simple consumer products (Philips Hue, £30 to £80 per point) to professional DALI or KNX systems (£150 to £400+ per point) — the right choice depends on the client\'s requirements for integration, reliability, and control sophistication.',
  'Most smart lighting switches (Lutron, Shelly, Sonoff) require a neutral wire at the switch position — a requirement that is not met in older UK wiring, where switch drops carry only switched live and earth.',
  'DALI (Digital Addressable Lighting Interface) is the professional standard for commercial and high-end residential lighting control — each luminaire has an addressable digital driver and can be individually programmed.',
  'Recommended lux levels for domestic and commercial spaces are specified in CIBSE LG3 (domestic) and BS EN 12464-1 (workplace) — key levels: 300 lux at the working plane in offices, 500 lux for tasks requiring detailed work.',
  'Presence detection (PIR or radar) and daylight harvesting (photocell dimming) are proven energy-saving technologies — correctly specified, they can reduce lighting energy consumption by 40 to 60% compared to manual switching.',
];

const faqs = [
  {
    question: 'What is DALI lighting control and when should it be specified?',
    answer:
      'DALI (Digital Addressable Lighting Interface) is a digital lighting control protocol defined in IEC 62386. Each DALI-compatible luminaire or driver has an addressable interface that allows it to be individually controlled, dimmed, and grouped by a DALI controller. DALI is the professional standard for commercial and high-end residential lighting control because it provides: individual addressability of each luminaire (no group wiring required), two-way communication (the controller knows the state of each luminaire), programmatic scene and group control, and compatibility with building management systems (BMS) and energy monitoring. DALI should be specified for: commercial offices and retail, large residential properties (5 or more lighting zones), projects requiring energy monitoring or BREEAM compliance, and projects where the lighting design includes complex scenes or dynamic sequences. DALI drivers typically add £15 to £50 per luminaire over a standard 0-10V or mains-dimming driver.',
  },
  {
    question: 'What is the difference between KNX and DALI?',
    answer:
      'KNX is a whole-building automation standard that covers lighting, heating, HVAC, blinds, access control, and security systems — all on a single two-wire bus. DALI is a lighting-specific protocol. In a KNX building, DALI lighting systems are integrated via a KNX-DALI gateway — the KNX system controls the DALI network, which in turn controls individual luminaires. KNX is a higher-complexity, higher-cost solution (KNX training is a specialised qualification) used in commercial buildings and high-end residential projects. DALI alone is simpler and adequate for most lighting control projects. KNX is specified when the client wants whole-building automation — lighting, heating, and HVAC all controlled from a single system and accessible via a single app.',
  },
  {
    question: 'Do smart lighting switches need a neutral wire?',
    answer:
      'Yes, most smart lighting switches require a neutral wire at the switch position. This is because smart switches (Lutron Caseta, Shelly Dimmer, Sonoff ZBMINIL2, and most others) require a small continuous power supply to maintain their WiFi or Zigbee connectivity and to power their internal electronics, even when the light is off. In older UK wiring, the switch drop typically contains only the switched live (and earth) — the neutral is at the luminaire position, not at the switch. This means that installing a smart switch in an existing switch position requires either: (a) running a new 3-core cable from the consumer unit or junction box to the switch position (the preferred solution, but involves additional work), or (b) using a no-neutral smart switch (which uses a small leakage current through the light fitting — this can cause compatibility issues, particularly with LED lamps). Always check the existing wiring before specifying a smart switch type.',
  },
  {
    question: 'What lux levels are recommended for domestic rooms?',
    answer:
      'CIBSE Lighting Guide LG3 provides recommendations for domestic lighting. Key values: entrance hall and stairs — 150 lux; living room (general) — 50 to 150 lux, with task lighting at 300 lux for reading; kitchen (general) — 150 lux, task lighting over worktops — 300 to 500 lux; bathroom — 150 to 200 lux; bedroom (general) — 100 lux, bedside reading — 200 to 300 lux. For commercial workplaces, BS EN 12464-1 specifies: offices (general) — 300 to 500 lux at the working plane; technical drawing areas — 750 lux; examination and treatment rooms — 1,000 lux. Scene-setting systems allow these lux levels to be achieved for task scenarios while dimming to lower levels for ambient or relaxation scenarios.',
  },
  {
    question: 'What is the difference between Zigbee and Z-Wave for smart lighting?',
    answer:
      'Zigbee and Z-Wave are both wireless mesh networking protocols used for smart home devices including lighting. Zigbee (IEEE 802.15.4) operates on the 2.4GHz band, has a large ecosystem of compatible devices from multiple manufacturers (Philips Hue, IKEA, Aqara, Sonoff), and is supported by most smart home hubs (Zigbee2MQTT, Philips Hue Bridge, SmartThings). Z-Wave operates on the 868MHz band in Europe (sub-GHz, meaning better wall penetration than 2.4GHz), is a more strictly controlled protocol (fewer devices, but higher interoperability guarantee), and is used by manufacturers such as Fibaro and Aeotec. For most residential smart lighting projects, Zigbee is the practical choice due to the wider device ecosystem and lower cost. Z-Wave is preferred where wall penetration and reliability are priorities (large homes with thick walls).',
  },
  {
    question: 'How much does smart home lighting installation cost per point?',
    answer:
      'Smart lighting costs vary significantly by system type. Budget consumer systems (Philips Hue, IKEA Tradfri, Tapo): £30 to £80 per point including the smart bulb or fitting, no rewiring required in most cases. These systems are suitable for rental properties or homeowners who want basic colour and dimming control via an app. Mid-range professional systems (Lutron Caseta, Rako, Hamilton KNX-lite): £80 to £150 per point including smart switch, driver or dimmer, and basic scene programming. These systems require neutral wires at switch positions and are suitable for new-build or full renovation projects. High-end systems (DALI with DMX or KNX integration): £150 to £400+ per point, including DALI addressable drivers, scene controllers, presence detectors, daylight sensors, and full commissioning by a lighting control specialist. These systems are specified for high-end residential, commercial offices, and projects with complex lighting design requirements.',
  },
  {
    question: 'What is daylight harvesting and how does it work?',
    answer:
      'Daylight harvesting is a lighting control technique that uses a photocell (light sensor) to measure the natural daylight level in a space and automatically adjusts the artificial lighting to maintain a constant illuminance level. When daylight provides sufficient illumination, the artificial lighting is dimmed or switched off. As daylight decreases (clouds, dusk), the artificial lighting is automatically increased to compensate. The result is a constant lux level at the working plane throughout the day, with reduced energy consumption when daylight is available. Daylight harvesting is most effective in perimeter zones of commercial buildings with south-facing or east/west-facing glazing. CIBSE TM52 and the WELL Building Standard recommend daylight harvesting as part of an energy-efficient lighting design. The photocell sensor must be positioned to measure the daylight contribution at the working plane, not direct sunlight — careful commissioning is required.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for smart lighting circuits, DALI bus wiring, and dimmer feeds.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for smart lighting installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote smart lighting installations with per-point costs, commissioning, and programming.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/outdoor-entertaining-area-electrical',
    title: 'Outdoor Entertaining Area Electrical',
    description: 'Outdoor lighting IP ratings and smart control options for garden entertaining areas.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/guides/house-extension-electrical-cost',
    title: 'House Extension Electrical Cost',
    description: 'Smart lighting wiring considerations for new house extensions.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long lighting circuit runs for DALI bus and 12V SELV circuits.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Smart Home Lighting: Protocols, Costs and Installation',
    content: (
      <>
        <p>
          Smart home lighting has moved from a luxury to a mainstream expectation in new-build and
          renovation projects. The range of available systems — from £30 smart bulbs to £400-per-point
          DALI installations — means that electricians need to understand the options well enough to
          advise clients and specify the right system for the project.
        </p>
        <p>
          The electrician's role varies by system type: consumer smart bulbs require no additional
          wiring; smart switches require neutral wires at switch positions (which often means new
          cables); DALI systems require dedicated bus wiring and addressable drivers at each
          luminaire; KNX installations require specialist commissioning software and trained
          installers.
        </p>
        <p>
          This guide covers the main lighting control protocols (DALI, KNX, Zigbee, Z-Wave), the
          neutral wire requirement for smart switches, recommended lux levels from CIBSE and BS EN
          12464-1, scene setting and presence detection, and costs at different budget levels.
        </p>
      </>
    ),
  },
  {
    id: 'protocols',
    heading: 'Lighting Control Protocols: DALI, KNX, Zigbee and Z-Wave',
    content: (
      <>
        <p>
          Choosing the right protocol is the most important decision in a smart lighting project.
          The key factors are: budget, size of installation, required integration (with heating,
          AV, security), and the client's preferred control interface.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-600/15 border border-blue-600/25 p-5">
            <h3 className="font-bold text-white text-base mb-2">DALI (Professional)</h3>
            <p className="text-white text-sm leading-relaxed">
              Digital addressable protocol. Each luminaire has an addressable DALI driver. Used in
              commercial and high-end residential. Individual control, two-way communication, BREEAM
              compatible. Requires DALI bus wiring (standard 2-core cable). Cost: £150 to £400+
              per point.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-600/15 border border-purple-600/25 p-5">
            <h3 className="font-bold text-white text-base mb-2">KNX (Whole Building)</h3>
            <p className="text-white text-sm leading-relaxed">
              Building automation bus — lighting, heating, blinds, and HVAC on one system. Requires
              specialist KNX-trained installer and commissioning software (ETS). High reliability
              and integration depth. Cost: £200 to £500+ per point for the lighting element.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <Wifi className="w-5 h-5 text-yellow-400 mb-2" />
            <h3 className="font-bold text-white text-base mb-2">Zigbee (Mid-Range)</h3>
            <p className="text-white text-sm leading-relaxed">
              Wireless mesh protocol. Wide device ecosystem. Requires a hub (Philips Hue Bridge,
              Zigbee2MQTT). Good for residential projects. Neutral wire required for most smart
              switches. Cost: £60 to £150 per point.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <Wifi className="w-5 h-5 text-green-400 mb-2" />
            <h3 className="font-bold text-white text-base mb-2">Z-Wave (Reliability Focus)</h3>
            <p className="text-white text-sm leading-relaxed">
              868MHz sub-GHz wireless. Better wall penetration than Zigbee. Strict interoperability
              standard. Smaller device ecosystem. Good for larger homes with thick walls. Cost: £80
              to £180 per point.
            </p>
          </div>
        </div>
        <p>
          DMX (Digital Multiplex) is used in theatrical and entertainment lighting and in high-end
          architectural RGB lighting installations — not a standard choice for residential smart
          lighting but may be encountered in bespoke home cinema or entertainment rooms.
        </p>
      </>
    ),
  },
  {
    id: 'neutral-wire',
    heading: 'Neutral Wire Requirements for Smart Switches',
    content: (
      <>
        <p>
          The neutral wire requirement is the most common practical challenge when retrofitting smart
          switches to an existing installation. Most smart switches need a neutral wire at the switch
          position to power their electronics continuously. In standard UK wiring, the switch drop
          (from the ceiling to the switch) typically contains only:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Old colour code (pre-2004):</strong> Red (switched live) + bare earth — no neutral</span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>New colour code (post-2004):</strong> Brown (switched live) + bare earth — no neutral</span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>3-core switch drop (2-way wiring):</strong> Brown, grey, black + earth — no neutral present unless specifically wired in</span>
            </li>
          </ul>
        </div>
        <p>
          Solutions for the neutral wire problem: (a) run a new 3-core and earth cable from a
          junction box (where the neutral is available) down to the switch position — this is the
          cleanest solution and is required for smart dimmer switches with higher power requirements;
          (b) use a no-neutral smart switch — these devices use a tiny leakage current through the
          load to power themselves. They work with many LED and halogen loads but may cause flicker
          or incomplete dimming with some LED drivers; (c) specify smart bulbs (Zigbee or WiFi) and
          retain the existing switch wiring — the switch remains on permanently and the smart bulbs
          are controlled by app or voice assistant only.
        </p>
        <SEOAppBridge
          title="Design smart lighting circuits and quote accurately"
          description="Elec-Mate's circuit design tools help UK electricians plan smart lighting installations, quote accurately, and produce professional EIC certificates. 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
  {
    id: 'lux-levels',
    heading: 'Recommended Lux Levels and Scene Setting',
    content: (
      <>
        <p>
          Lux level recommendations guide the lighting design and help justify the luminaire count
          and type. Key reference documents are CIBSE LG3 (domestic), CIBSE LG7 (offices), and
          BS EN 12464-1 (workplace lighting):
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Living room (ambient):</strong> 50 to 150 lux</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Living room (reading task):</strong> 300 lux at the reading plane</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Kitchen worktops (task):</strong> 300 to 500 lux</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Office (general):</strong> 300 to 500 lux at desk level (BS EN 12464-1, Table 5.3)</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Home office (task):</strong> 500 lux at desk surface</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Bedroom (general):</strong> 100 lux; bedside reading: 200 to 300 lux</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Bathroom:</strong> 150 to 200 lux general; 300 to 500 lux at vanity mirror</span>
            </li>
          </ul>
        </div>
        <p>
          Scene setting allows multiple pre-programmed lighting states (scenes) to be recalled at
          the touch of a button or via a voice command. A living room might have: "Morning" (300 lux,
          cool white 4000K), "Evening" (150 lux, warm white 2700K), "Cinema" (30 lux, amber), and
          "Reading" (400 lux at the reading chair, warm white). Scene programming is carried out
          during commissioning and is included in the installation cost.
        </p>
      </>
    ),
  },
  {
    id: 'daylight-presence',
    heading: 'Daylight Harvesting and Presence Detection',
    content: (
      <>
        <p>
          Automatic lighting controls significantly reduce energy consumption and improve convenience.
          The two most impactful technologies are presence detection and daylight harvesting:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <ShieldCheck className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Presence Detection</h3>
            <p className="text-white text-sm leading-relaxed">
              PIR (passive infrared) or microwave/radar sensors detect occupancy and switch
              lights on when someone enters a space, off after a preset hold time when they
              leave. PIR is suitable for areas with normal movement; radar (microwave) detects
              minor movements and is preferred for offices and meeting rooms where occupants
              sit still for extended periods. Combined PIR/microwave sensors provide the best
              performance.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <Gauge className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Daylight Harvesting</h3>
            <p className="text-white text-sm leading-relaxed">
              A photocell measures the natural daylight contribution and dims the artificial
              lighting to maintain a constant lux level at the working plane. Most effective
              in perimeter zones with good daylighting. Reduces lighting energy by 20 to 50%
              in spaces with good daylight access. Requires DALI-dimable or 0-10V drivers and
              a DALI or digital lighting controller.
            </p>
          </div>
        </div>
        <p>
          For residential smart lighting, presence detection in hallways, stairways, and bathrooms
          provides convenience and energy saving. DALI presence detectors with built-in daylight
          sensors are available from manufacturers such as Zumtobel, Helvar, and Steinel — they
          communicate directly with the DALI bus without additional wiring.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Smart Lighting System Costs by Budget Level',
    content: (
      <>
        <p>
          Smart lighting costs vary enormously. Here is a guide by budget level for a typical
          residential installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Budget (Philips Hue, IKEA Tradfri, Tapo) — £30 to £80 per point</strong>.
                Smart bulbs or fittings with Zigbee or WiFi connectivity. Hub required (included in
                starter kits). App and voice control. No rewiring needed. Best for rental properties
                and retrofit where rewiring is not feasible. Limited scene programming.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range (Lutron Caseta, Rako, Shelly) — £80 to £150 per point</strong>.
                Smart switches or dimmers requiring neutral wire. Scene control, dimming, and
                scheduling. Integration with Apple Home, Google Home, Alexa. Good for new-build
                and full renovation. Professional commissioning required for scene programming.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-end (DALI, KNX, Control4, Crestron) — £150 to £400+ per point</strong>.
                Addressable DALI drivers, dedicated bus wiring, presence detectors, daylight sensors,
                and full commissioning by a specialist. Best for new-build, high-end residential, and
                commercial projects. Integrates with AV, HVAC, blinds, and security systems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Smart Lighting as a Revenue Stream',
    content: (
      <>
        <p>
          Smart lighting is one of the most accessible routes into higher-value electrical work.
          A competent electrician who understands neutral wire requirements, can programme basic
          scenes on Lutron or Rako systems, and can install DALI bus wiring for commercial projects
          will find growing demand from both residential and commercial clients.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Always Check for Neutral at the Survey</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before specifying smart switches, check whether a neutral wire is present at each
                  switch position. If it is not, price the cost of running new cables as part of the
                  smart lighting quote. Retrofitting without a neutral and then recommending a
                  no-neutral switch that causes flickering is a common problem — avoid it by
                  assessing the wiring at the survey stage.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue an EIC for New Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Where smart lighting installation involves new circuits or new cable runs (not just
                  replacing fittings on existing circuits), an{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  or Minor Works Certificate is required. Part P notification applies where new
                  circuits are added to the installation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Build a Commissioning Service</h4>
                <p className="text-white text-sm leading-relaxed">
                  Scene programming, presence detection calibration, and daylight sensor commissioning
                  are specialist skills that command a day-rate premium over standard electrical
                  work. Building competency in DALI and Lutron commissioning opens access to
                  commercial and high-end residential projects.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify smart lighting installations"
          description="Elec-Mate gives UK electricians professional quoting and on-site EIC certification for smart lighting projects. Price per-point costs, neutral wire remediation, and commissioning time. 7-day free trial."
          icon={Lightbulb}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmartHomeLightingInstallationPage() {
  return (
    <GuideTemplate
      title="Smart Home Lighting Installation UK | DALI, KNX, Zigbee and Z-Wave Guide"
      description="Complete guide to smart home lighting installation in the UK. DALI vs KNX vs Zigbee, neutral wire requirements, lux levels from CIBSE LG3 and BS EN 12464-1, daylight harvesting, presence detection, and costs from £30 to £400+ per point."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Smart Home Lighting Installation:{' '}
          <span className="text-yellow-400">DALI, KNX, Zigbee and Scene Control</span>
        </>
      }
      heroSubtitle="Smart lighting ranges from £30 Philips Hue bulbs to £400-per-point DALI systems. This guide covers the main protocols, neutral wire requirements for smart switches, recommended lux levels, daylight harvesting, presence detection, and costs by budget level."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Smart Home Lighting"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Smart Lighting Installations"
      ctaSubheading="Elec-Mate gives UK electricians professional quoting and on-site EIC certification for smart home lighting projects. 7-day free trial, cancel anytime."
    />
  );
}
