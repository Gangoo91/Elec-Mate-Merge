import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Calculator,
  FileCheck2,
  ShieldCheck,
  Lightbulb,
  AlertTriangle,
  Wrench,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Smart Switch vs Smart Bulb', href: '/guides/smart-switch-vs-smart-bulb' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'smart-switches', label: 'Smart Switches: How They Work' },
  { id: 'smart-bulbs', label: 'Smart Bulbs: How They Work' },
  { id: 'neutral-wire', label: 'The Neutral Wire Problem' },
  { id: 'wiring-requirements', label: 'Wiring Requirements and BS 7671' },
  { id: 'comparison', label: 'Which to Choose?' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Smart switches replace the existing wall switch and control the light fitting via the mains wiring — the fitting itself can use any lamp type. Smart switches require a neutral wire at the switch position, which is not present in most UK single-gang switch wiring (which uses a switch-drop cable with no neutral).',
  'Smart bulbs replace the lamp in an existing fitting and contain the wireless radio and control circuitry within the bulb itself. The wall switch must remain permanently on — operating the wall switch cuts power and disconnects the smart bulb from the network.',
  'The absence of a neutral wire at the switch is the fundamental constraint that determines whether a smart switch can be installed without additional wiring. Many UK switches are wired with a two-core cable (switch-drop method) leaving only a switched live and an unswitched live at the switch — no neutral.',
  'BS 7671:2018+A3:2024 requires that all replacement wiring accessories comply with applicable standards. Smart switches must be CE or UKCA marked and installed in accordance with the manufacturer installation instructions.',
  'For professional smart home installations, wiring new build and renovation projects with four-core cable to all switch positions (providing L, N, switched L, and CPC) is best practice — it enables any smart switch technology to be used without rewiring later.',
];

const faqs = [
  {
    question: 'Why do smart switches need a neutral wire?',
    answer:
      'A smart switch contains a radio module (Wi-Fi, Zigbee, or Z-Wave), a microcontroller, and a relay — all of which require continuous low-power operation even when the light is switched off. To power this circuitry, the smart switch needs a complete circuit: live and neutral. In standard UK switch wiring using the switch-drop method, the cable to the switch position contains only the unswitched live and the switched live — there is no neutral at the switch. Without a neutral, the only way to power the internal electronics is to pass a small current through the lamp (from live, through the switch circuitry, through the lamp, to neutral at the ceiling rose). This causes problems: LED bulbs are so low-impedance that even a small continuous current can cause them to flicker when switched off. Some smart switch manufacturers design around this limitation with an extremely low quiescent current, but results vary with different lamp types.',
  },
  {
    question: 'Can I install a smart switch without rewiring?',
    answer:
      'It depends on the existing wiring. If the switch is wired using the loop-in method (where the neutral runs through the ceiling rose and the switch-drop cable contains only the switched live and the return to the light), there is no neutral at the switch. Options: (1) Use a smart switch that claims to work without neutral — these pass a small current through the lamp and work with some (not all) LED bulbs. (2) Rewire the switch-drop to add a neutral — running a new three-core and earth cable from the ceiling rose to the switch position. (3) Use smart bulbs instead, avoiding the need for a smart switch entirely. (4) Install a no-neutral smart switch module at the ceiling rose rather than the switch position (where the neutral is available). Options 1 and 4 can be done without rewiring; options 2 and 3 require either rewiring or accepting the limitation of the wall switch remaining permanently on.',
  },
  {
    question: 'Do smart bulbs work with existing dimmer switches?',
    answer:
      'Smart bulbs must not be used with conventional dimmer switches. A smart bulb already contains its own dimming circuitry — applying a leading edge or trailing edge dimmer to the supply feeding the smart bulb will interfere with the bulb\'s driver and cause flickering, buzzing, or premature failure. Smart bulbs must be installed on a standard on/off circuit (no dimming). If the customer wants dimming with smart bulbs, dimming is controlled via the app or smart home hub — the wall switch (if any) must remain permanently on. If dimming via a wall switch is required, install a smart switch (with dimming capability) on a circuit with conventional (non-smart) LED or halogen lamps.',
  },
  {
    question: 'What is the difference between Zigbee, Z-Wave, and Wi-Fi smart switches?',
    answer:
      'Zigbee and Z-Wave are low-power mesh radio protocols designed for home automation. Zigbee operates at 2.4GHz (same band as Wi-Fi and Bluetooth); Z-Wave at 868MHz (UK) — less crowded. Both form a mesh network where each device extends the range of the network. Zigbee is an open standard used by many manufacturers (Philips Hue, IKEA Tradfri, Amazon Echo devices act as Zigbee hubs). Z-Wave is a proprietary standard with strict interoperability certification. Both require a hub (bridge) to connect to the internet and integrate with smart home platforms. Wi-Fi smart switches connect directly to the home Wi-Fi router without a hub — simpler to set up but consume more power, may not work reliably with crowded 2.4GHz networks, and depend on the cloud service of the manufacturer. For professional installations, Zigbee or Z-Wave with a local hub (Home Assistant, SmartThings) is more reliable than Wi-Fi cloud-dependent devices.',
  },
  {
    question: 'Are smart home wiring accessories Part P notifiable?',
    answer:
      'Replacing a like-for-like switch or socket outlet with a smart equivalent is not notifiable under Part P of the Building Regulations in England, provided the work is carried out by a competent person and does not involve new circuits. Replacing a standard switch with a smart switch is equivalent to replacing a switch — it is minor works and does not require Part P notification if carried out by a competent person. However, if additional wiring is required (for example, running a new cable to provide a neutral at the switch position), this constitutes new wiring work and may be notifiable depending on the location of the work and whether it is in a special location (bathroom, kitchen). Always clarify the Part P status with your local authority building control or self-certification scheme if in doubt.',
  },
  {
    question: 'What is the maximum load for a smart switch?',
    answer:
      'Smart switches are rated for a maximum load — typically 250W to 500W for resistive loads (filament lamps, halogen). For LED loads, the rated load is often significantly lower — typically 150–250W — because LED driver switching can cause higher peak currents that stress the relay contacts. Always check the smart switch manufacturer\'s rated load for LED lamps specifically, not just the general wattage rating. Exceeding the rated load causes premature relay contact wear and can cause the relay to stick in the closed position (permanently on). For multi-gang smart switches serving multiple circuits, the rating applies to each individual switch module, not the total.',
  },
  {
    question: 'How should smart lighting be certified on an Electrical Installation Certificate?',
    answer:
      'Smart switches are wiring accessories and their installation is covered by an Electrical Installation Certificate (if new circuits are involved) or a Minor Works Certificate (if only accessories are being changed on existing circuits). The certificate should note the make and model of the smart switch in the description of work. If rewiring was carried out to provide a neutral at the switch position, this must be tested and the test results recorded on the schedule of test results — insulation resistance, continuity of CPC, and earth fault loop impedance at the switch position. The circuit description on the certificate should describe the circuit as a lighting circuit — the smart switch functionality does not change the circuit classification.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for lighting circuits including smart switch rewiring projects.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Minor Works and EIC certificates for smart lighting installation.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/led-vs-fluorescent-commercial-lighting',
    title: 'LED vs Fluorescent Lighting Guide',
    description: 'Compare LED and fluorescent lighting for commercial installations.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to BS 7671:2018+A3:2024 for all installation types.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study lighting circuit inspection and test requirements for C&G 2391.',
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
    heading: 'Smart Switch vs Smart Bulb: Which is Right for the Installation?',
    content: (
      <>
        <p>
          Smart home lighting is one of the most common electrician enquiries from domestic
          customers. The choice between a smart switch and a smart bulb has significant
          practical implications: smart switches require a neutral wire at the switch position
          (often not present in older UK wiring), whilst smart bulbs require the wall switch
          to remain permanently on.
        </p>
        <p>
          Understanding the technical constraints of each approach — and the wiring requirements
          under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          — enables electricians to advise customers correctly and deliver reliable
          smart lighting installations. This guide covers the technical differences, the
          neutral wire problem, and how to decide which approach is appropriate for each
          property.
        </p>
      </>
    ),
  },
  {
    id: 'smart-switches',
    heading: 'Smart Switches: How They Work',
    content: (
      <>
        <p>
          A smart switch replaces the standard wall switch and contains the wireless radio
          and control circuitry within the switch plate itself. The switch controls the mains
          supply to the light fitting — switching the relay on or off either via the wall switch
          button, a wireless command, or an automation routine. The light fitting uses any
          lamp type: standard LED, halogen, or filament.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">Smart Switch Advantages</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• Works with any lamp type — existing LED lamps can be reused</li>
            <li>• Wall switch operates normally — no behaviour change for occupants</li>
            <li>• Dimming available (with compatible dimmer module and LED lamps)</li>
            <li>• Wall switch can be used without internet connection</li>
            <li>• Single point of control — one smart device per circuit</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-1">Smart Switch Limitations</p>
              <ul className="space-y-1 text-white text-sm">
                <li>• Requires neutral wire at switch position — not present in most UK switch-drop wiring</li>
                <li>• More expensive than smart bulbs for single-lamp fittings</li>
                <li>• Electrical competence required for installation</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'smart-bulbs',
    heading: 'Smart Bulbs: How They Work',
    content: (
      <>
        <p>
          A smart bulb replaces the lamp in an existing fitting. The wireless radio, colour
          control circuitry, and LED driver are all integrated within the bulb. The bulb
          connects to Wi-Fi or Zigbee and is controlled via an app, smart speaker, or
          automation system. No changes to the existing wiring are required.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">Smart Bulb Advantages</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• No wiring changes required — plug and play installation</li>
            <li>• Full colour (RGBW) and colour temperature (warm to cool white) available</li>
            <li>• Smooth dimming to 1% built into the bulb</li>
            <li>• Lower cost for small numbers of lamps</li>
            <li>• Easily swapped or upgraded without tools</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-1">Smart Bulb Limitations</p>
              <ul className="space-y-1 text-white text-sm">
                <li>• Wall switch must remain permanently on — disconnect means losing network connection</li>
                <li>• Higher cost per lamp for multi-lamp fittings</li>
                <li>• Not compatible with conventional dimmer switches</li>
                <li>• Guests or children switching the wall switch causes connectivity loss</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'neutral-wire',
    heading: 'The Neutral Wire Problem: UK Switch Wiring',
    content: (
      <>
        <p>
          The fundamental constraint for smart switches in UK properties is the absence of
          a neutral wire at the switch position. In standard UK switch wiring using the
          switch-drop method:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch-drop method (most common in UK domestic):</strong> A two-core
                and earth cable runs from the ceiling rose or junction box to the switch. At
                the switch, there is an unswitched live (from the loop-in point) and a switched
                live (returning to the lamp). There is no neutral conductor at the switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loop-in method (older UK wiring):</strong> The live, neutral, and
                switched live all run through the ceiling rose. The switch is wired with only
                the switched live — again, no neutral at the switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral available (less common):</strong> Some properties have a
                three-core and earth cable to the switch, providing live, neutral, switched
                live, and CPC. This is the ideal configuration for smart switch installation
                and is standard for smart home new builds.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The solution for properties without neutral at the switch position is either to
          run a new cable (three-core and earth from the ceiling rose to the switch), or to
          use smart bulbs (which do not require a smart switch), or to use a no-neutral
          smart switch if it is compatible with the specific LED lamps installed.
        </p>
      </>
    ),
  },
  {
    id: 'wiring-requirements',
    heading: 'Wiring Requirements and BS 7671 Compliance',
    content: (
      <>
        <p>
          Smart switches and smart bulbs are wiring accessories and electrical equipment that
          must comply with BS 7671 and be CE or UKCA marked. Key compliance considerations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth connection:</strong> Smart switches must be earthed via the CPC
                in the switch-drop cable (Regulation 411.4.3). Verify the CPC is correctly
                connected and continuous before installing the smart switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load rating:</strong> Do not exceed the manufacturer's rated load for
                the smart switch — particularly for LED loads, where the rated wattage for LED
                lamps is often lower than for resistive loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification:</strong> If new wiring is added to provide a neutral,
                this constitutes new electrical work. An EIC or Minor Works Certificate must
                be issued for the new wiring.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Issue Minor Works Certificates for smart switch installations"
          description="Elec-Mate's Minor Works Certificate app lets you issue compliant certificates for smart switch wiring on site. Record test results and send PDFs to clients instantly from your phone."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'comparison',
    heading: 'Smart Switch vs Smart Bulb: Which to Choose?',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Choose Smart Switch When:</h3>
            <ul className="space-y-1 text-white text-sm">
              <li>• Property has (or can have) neutral at switch position</li>
              <li>• Customer wants wall switch to operate normally</li>
              <li>• Fitting has multiple lamps (smart switch is cheaper per lamp)</li>
              <li>• Dimming via wall switch is required</li>
              <li>• New build or renovation where neutral cable can be planned in</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Choose Smart Bulbs When:</h3>
            <ul className="space-y-1 text-white text-sm">
              <li>• No neutral at switch position and rewiring is not practical</li>
              <li>• Customer wants colour-changing or colour temperature control</li>
              <li>• Rental property where minimal wiring changes are needed</li>
              <li>• Small number of lamps where per-lamp cost is acceptable</li>
              <li>• Customer is comfortable leaving wall switches permanently on</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Smart Home Lighting as a Revenue Stream',
    content: (
      <>
        <p>
          Smart lighting installation is a growing revenue stream for electricians. Customers
          who ask about smart bulbs often don't realise that a smart switch — installed
          correctly with a neutral wire — provides a much more reliable and user-friendly
          experience. Identifying the need for neutral wire provision and offering to rewire
          the switch position (or run a new cable) adds professional value and increases the
          job value significantly.
        </p>
        <p>
          For new builds and full rewires, always wire four-core to switch positions as
          standard — this future-proofs every switch position for any smart switch
          technology without additional work later.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmartSwitchVsSmartBulbPage() {
  return (
    <GuideTemplate
      title="Smart Switch vs Smart Bulb | Neutral Wire Requirements UK Guide"
      description="Complete guide to smart switches vs smart bulbs for UK electricians. The neutral wire problem in UK switch wiring, BS 7671 compliance, Zigbee vs Z-Wave vs Wi-Fi, and when to choose each solution for domestic smart lighting."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Smart Home Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Smart Switch vs Smart Bulb:{' '}
          <span className="text-yellow-400">Neutral Wire Requirements and When to Use Each</span>
        </>
      }
      heroSubtitle="Smart switches need a neutral wire at the switch position — most UK switch-drop wiring does not have one. Smart bulbs need the wall switch left permanently on. This guide explains the technical constraints, wiring requirements, and how to choose the right smart lighting solution for every property."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Smart Switch vs Smart Bulb"
      relatedPages={relatedPages}
      ctaHeading="Certify Smart Home Lighting Installations"
      ctaSubheading="Elec-Mate's Minor Works and EIC certificate apps cover smart switch wiring projects. Issue professional PDF certificates on site. 7-day free trial, cancel anytime."
    />
  );
}
